import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { SpatialNode, Viewport } from "../engine/types";
import { useSBTheme } from "./sidebar/ThemeContext";
import { useSBI18n } from "./LocalizationContext";

const MAP_W = 168;
const MAP_H = 112;
const FRAME_PAD = 6;
const MAP_INNER_W = MAP_W - FRAME_PAD * 2;
const MAP_INNER_H = MAP_H - FRAME_PAD * 2;

export interface MinimapProps {
  engine: SpatialEngine;
  nodes: SpatialNode[];
  viewport: Viewport;
  containerSize: { w: number; h: number };
  measuredHeights: Record<string, number>;
}

function nodeHeight(n: SpatialNode, measured: Record<string, number>): number {
  return n.h === "auto" ? measured[n.id] ?? 100 : (n.h as number);
}

function computeContentBounds(
  nodes: SpatialNode[],
  measured: Record<string, number>,
  viewport: Viewport,
  cw: number,
  ch: number,
): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const n of nodes) {
    if (n.type === "edge") continue;
    const h = nodeHeight(n, measured);
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x + n.w);
    maxY = Math.max(maxY, n.y + h);
  }

  const z = viewport.zoom;
  const vx0 = (0 - viewport.x) / z;
  const vy0 = (0 - viewport.y) / z;
  const vx1 = (cw - viewport.x) / z;
  const vy1 = (ch - viewport.y) / z;

  if (!Number.isFinite(minX)) {
    return {
      minX: Math.min(vx0, vx1) - 80,
      minY: Math.min(vy0, vy1) - 80,
      maxX: Math.max(vx0, vx1) + 80,
      maxY: Math.max(vy0, vy1) + 80,
    };
  }

  const pad = 48;
  minX -= pad;
  minY -= pad;
  maxX += pad;
  maxY += pad;

  minX = Math.min(minX, vx0, vx1);
  minY = Math.min(minY, vy0, vy1);
  maxX = Math.max(maxX, vx0, vx1);
  maxY = Math.max(maxY, vy0, vy1);

  return { minX, minY, maxX, maxY };
}

export default function Minimap({
  engine,
  nodes,
  viewport,
  containerSize,
  measuredHeights,
}: MinimapProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [presenting, setPresenting] = useState(() => engine.presentationMode);
  const svgRef = useRef<SVGSVGElement>(null);
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const h = () => setPresenting(engine.presentationMode);
    engine.on("presentation", h);
    return () => engine.off("presentation", h);
  }, [engine]);

  const { minX, minY, maxX, maxY, scale, offsetX, offsetY } = useMemo(() => {
    const { w: cw, h: ch } = containerSize;
    if (cw <= 0 || ch <= 0) {
      return { minX: 0, minY: 0, maxX: 1, maxY: 1, scale: 1, offsetX: 0, offsetY: 0 };
    }
    const b = computeContentBounds(nodes, measuredHeights, viewport, cw, ch);
    const contentW = Math.max(b.maxX - b.minX, 1e-6);
    const contentH = Math.max(b.maxY - b.minY, 1e-6);
    const s = Math.min(MAP_INNER_W / contentW, MAP_INNER_H / contentH);
    const drawW = contentW * s;
    const drawH = contentH * s;
    return {
      minX: b.minX,
      minY: b.minY,
      maxX: b.maxX,
      maxY: b.maxY,
      scale: s,
      offsetX: (MAP_INNER_W - drawW) / 2,
      offsetY: (MAP_INNER_H - drawH) / 2,
    };
  }, [nodes, measuredHeights, viewport, containerSize]);

  const centerOnWorld = useCallback(
    (wx: number, wy: number) => {
      const { w: cw, h: ch } = containerSize;
      if (cw <= 0 || ch <= 0) return;
      const z = engine.viewport.zoom;
      const { x: vx, y: vy } = engine.viewport;
      const newX = cw / 2 - wx * z;
      const newY = ch / 2 - wy * z;
      engine.pan(newX - vx, newY - vy);
    },
    [containerSize, engine],
  );

  const clientToInner = useCallback((clientX: number, clientY: number) => {
    const el = svgRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return null;
    const sx = ((clientX - r.left) / r.width) * MAP_W;
    const sy = ((clientY - r.top) / r.height) * MAP_H;
    const ix = sx - FRAME_PAD;
    const iy = sy - FRAME_PAD;
    if (ix < -0.5 || iy < -0.5 || ix > MAP_INNER_W + 0.5 || iy > MAP_INNER_H + 0.5) {
      return null;
    }
    return { ix, iy };
  }, []);

  const innerToWorld = useCallback(
    (ix: number, iy: number) => ({
      wx: minX + (ix - offsetX) / scale,
      wy: minY + (iy - offsetY) / scale,
    }),
    [minX, minY, offsetX, offsetY, scale],
  );

  const applyClient = useCallback(
    (clientX: number, clientY: number) => {
      const inner = clientToInner(clientX, clientY);
      if (!inner) return;
      const { wx, wy } = innerToWorld(inner.ix, inner.iy);
      centerOnWorld(wx, wy);
    },
    [clientToInner, innerToWorld, centerOnWorld],
  );

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      e.stopPropagation();
      if (e.button !== 0) return;
      draggingRef.current = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      applyClient(e.clientX, e.clientY);
    },
    [applyClient],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<SVGSVGElement>) => {
      if (!draggingRef.current) return;
      applyClient(e.clientX, e.clientY);
    },
    [applyClient],
  );

  const onPointerUp = useCallback((e: ReactPointerEvent<SVGSVGElement>) => {
    draggingRef.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }, []);

  if (presenting || containerSize.w <= 0 || containerSize.h <= 0) {
    return null;
  }

  const z = viewport.zoom;
  const cw = containerSize.w;
  const ch = containerSize.h;
  const vx0 = (0 - viewport.x) / z;
  const vy0 = (0 - viewport.y) / z;
  const vx1 = (cw - viewport.x) / z;
  const vy1 = (ch - viewport.y) / z;

  const vpX = offsetX + (vx0 - minX) * scale;
  const vpY = offsetY + (vy0 - minY) * scale;
  const vpW = Math.max(2, (vx1 - vx0) * scale);
  const vpH = Math.max(2, (vy1 - vy0) * scale);

  const nodeRects: ReactNode[] = [];
  for (const n of nodes) {
    if (n.type === "edge") continue;
    const h = nodeHeight(n, measuredHeights);
    const nx = offsetX + (n.x - minX) * scale;
    const ny = offsetY + (n.y - minY) * scale;
    const nw = Math.max(1.5, n.w * scale);
    const nh = Math.max(1.5, h * scale);
    nodeRects.push(
      <rect
        key={n.id}
        x={nx}
        y={ny}
        width={nw}
        height={nh}
        rx={1}
        fill={theme.accentColor}
        fillOpacity={0.45}
        stroke="none"
      />,
    );
  }

  const border = theme.border;
  const mapFill = theme.controlBg;
  const accent = theme.accentColor;

  return (
    <div
      data-sb-minimap
      style={{
        position: "absolute",
        insetInlineEnd: 12,
        bottom: 56,
        width: MAP_W,
        height: MAP_H,
        zIndex: 9998,
        pointerEvents: "auto",
        touchAction: "none",
        borderRadius: theme.controlBorderRadius,
        boxShadow: theme.panelShadow,
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <svg
        ref={svgRef}
        width={MAP_W}
        height={MAP_H}
        role="img"
        aria-label={labels.minimapTitle}
        style={{
          display: "block",
          cursor: dragging ? "grabbing" : "grab",
          borderRadius: theme.controlBorderRadius,
          overflow: "hidden",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <rect x={0} y={0} width={MAP_W} height={MAP_H} fill={mapFill} stroke={border} strokeWidth={1} />
        <g transform={`translate(${FRAME_PAD}, ${FRAME_PAD})`}>
          <rect
            x={0}
            y={0}
            width={MAP_INNER_W}
            height={MAP_INNER_H}
            fill="rgba(255,255,255,0.04)"
            stroke={border}
            strokeOpacity={0.5}
            strokeWidth={0.5}
          />
          {nodeRects}
          <rect
            x={vpX}
            y={vpY}
            width={vpW}
            height={vpH}
            fill={accent}
            fillOpacity={0.12}
            stroke={accent}
            strokeWidth={1.25}
            strokeOpacity={0.95}
            pointerEvents="none"
          />
        </g>
      </svg>
    </div>
  );
}
