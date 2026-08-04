import { useCallback, useSyncExternalStore } from "react";
import type { Viewport, SpatialNode, HandleSide } from "../../engine/types";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import { nodeTypeHasPorts } from "../../nodes/registry";
import type { HandlePosition } from "./SVGLayer";
import { getRotatedCursor } from "../../interactions/resize-cursors";
import { handleHitSizePx } from "./pointer-coarse";
import { SEL_PAD } from "./node-item-context";
import { selectionInkPad } from "./selection-pad";

/* ------------------------------------------------------------------ */
/*  SelectionChromeOverlay — multi-select bounding box + handles.      */
/*  Subscribes to the engine directly so it tracks node geometry per   */
/*  frame during pointer gestures while the parent canvas is frozen.   */
/* ------------------------------------------------------------------ */

const SelectionChromeOverlay = function SelectionChromeOverlay({
  engine,
  registry,
  viewport,
  measuredHeights,
  groupRotation,
  hidden,
  getNodeAABB,
  onResizeDown,
  onRotateDown,
  onConnectionDown,
  findNearestNodeForSide,
}: {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  viewport: Viewport;
  measuredHeights: Record<string, number>;
  groupRotation: { angle: number; cx: number; cy: number; bounds: { x: number; y: number; w: number; h: number } } | null;
  hidden: boolean;
  getNodeAABB: (n: SpatialNode, h: number) => { minX: number; minY: number; maxX: number; maxY: number };
  onResizeDown: (handle: HandlePosition, e: React.PointerEvent<SVGRectElement>) => void;
  onRotateDown: (e: React.PointerEvent<SVGElement>) => void;
  onConnectionDown: (nodeId: string, side: HandleSide, e: React.PointerEvent<SVGCircleElement>) => void;
  findNearestNodeForSide: (side: HandleSide) => string | null;
}) {
  const subscribe = useCallback(
    (cb: () => void) => {
      engine.on("change", cb);
      engine.on("selection", cb);
      // Gesture boundaries flip the move-hides-chrome state below even
      // when no change event has fired yet (drag start / end).
      engine.on("gesture:start", cb);
      engine.on("gesture:end", cb);
      return () => {
        engine.off("change", cb);
        engine.off("selection", cb);
        engine.off("gesture:start", cb);
        engine.off("gesture:end", cb);
      };
    },
    [engine],
  );
  // Live tick: node moves/resizes and selection changes re-render only
  // this overlay, not the whole canvas.
  useSyncExternalStore(subscribe, () => engine.overlayTick);

  if (hidden || engine.readOnly) return null;
  // Move drags hide the bounding box — it would just chase the nodes.
  // Transform gestures (resize/rotate) keep it: it's being used.
  if (engine.gestureKind === "move") return null;
  const selection = engine.selection;
  if (selection.size < 2) return null;

  // Live multi-selection bounds (the parent's memoized selBounds freezes
  // during gestures; single-selection chrome renders inside SVGLayer).
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const id of selection) {
    const n = engine.getNode(id);
    if (!n || n.type === "edge") continue;
    const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
    const aabb = getNodeAABB(n, h);
    // Ink envelope (centered strokes + RoughJS wobble) — uniform pre-rotation
    // padding grows the rotated AABB by exactly `pad` per axis.
    const pad = selectionInkPad(n);
    minX = Math.min(minX, aabb.minX - pad);
    minY = Math.min(minY, aabb.minY - pad);
    maxX = Math.max(maxX, aabb.maxX + pad);
    maxY = Math.max(maxY, aabb.maxY + pad);
  }
  if (minX === Infinity) return null;
  const selBounds = {
    x: minX - SEL_PAD,
    y: minY - SEL_PAD,
    w: maxX - minX + SEL_PAD * 2,
    h: maxY - minY + SEL_PAD * 2,
  };

  // Check for persisted group rotation
  const singleGroupId = engine.selectionGroupId();
  const storedRot = singleGroupId ? engine.groupRotations.get(singleGroupId) : undefined;

  // During rotation drag use frozen bounds; for persisted group rotation
  // compute unrotated bounds; otherwise use live selBounds
  let b: { x: number; y: number; w: number; h: number };
  let rotAngle: number;
  let rotCx: number;
  let rotCy: number;

  if (groupRotation) {
    b = groupRotation.bounds;
    rotAngle = groupRotation.angle;
    rotCx = groupRotation.cx;
    rotCy = groupRotation.cy;
  } else if (storedRot && storedRot.angle !== 0) {
    // Reverse-rotate node centers to compute unrotated bounding box
    const rad = (-storedRot.angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    let fMinX = Infinity, fMinY = Infinity, fMaxX = -Infinity, fMaxY = -Infinity;
    for (const id of engine.selection) {
      const n = engine.getNode(id);
      if (!n || n.type === "edge") continue;
      const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
      const ncx = n.x + n.w / 2;
      const ncy = n.y + h / 2;
      const dx = ncx - storedRot.cx;
      const dy = ncy - storedRot.cy;
      const ux = storedRot.cx + dx * cos - dy * sin;
      const uy = storedRot.cy + dx * sin + dy * cos;
      fMinX = Math.min(fMinX, ux - n.w / 2);
      fMinY = Math.min(fMinY, uy - h / 2);
      fMaxX = Math.max(fMaxX, ux + n.w / 2);
      fMaxY = Math.max(fMaxY, uy + h / 2);
    }
    b = {
      x: fMinX - SEL_PAD,
      y: fMinY - SEL_PAD,
      w: fMaxX - fMinX + SEL_PAD * 2,
      h: fMaxY - fMinY + SEL_PAD * 2,
    };
    rotAngle = storedRot.angle;
    rotCx = storedRot.cx;
    rotCy = storedRot.cy;
  } else {
    b = selBounds;
    rotAngle = 0;
    rotCx = 0;
    rotCy = 0;
  }

  const handleSize = 8 / viewport.zoom;
  const half = handleSize / 2;
  // Touch targets exceed the drawn 8px squares — invisible hit shapes carry
  // the pointer events; the visible ones are inert.
  const hitSize = handleHitSizePx() / viewport.zoom;
  const hitHalf = hitSize / 2;
  const selectionAllowsResize = Array.from(engine.selection).every((id) => {
    const n = engine.getNode(id);
    if (!n || n.type === "edge") return true;
    return registry?.get(n.type)?.resizable !== false;
  });
  const selectionAllowsRotate = Array.from(engine.selection).every((id) => {
    const n = engine.getNode(id);
    if (!n || n.type === "edge") return true;
    return registry?.get(n.type)?.rotatable !== false;
  });
  const handles: { pos: HandlePosition; cx: number; cy: number }[] = [
    { pos: "nw", cx: b.x, cy: b.y },
    { pos: "n", cx: b.x + b.w / 2, cy: b.y },
    { pos: "ne", cx: b.x + b.w, cy: b.y },
    { pos: "e", cx: b.x + b.w, cy: b.y + b.h / 2 },
    { pos: "se", cx: b.x + b.w, cy: b.y + b.h },
    { pos: "s", cx: b.x + b.w / 2, cy: b.y + b.h },
    { pos: "sw", cx: b.x, cy: b.y + b.h },
    { pos: "w", cx: b.x, cy: b.y + b.h / 2 },
  ];
  const rotateTransform = rotAngle !== 0
    ? ` rotate(${rotAngle}, ${rotCx}, ${rotCy})`
    : "";
  return (
    <svg
      data-sb-overlay
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <g transform={`translate(${viewport.x}, ${viewport.y}) scale(${viewport.zoom})`}>
        <g transform={rotateTransform}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={1.5 / viewport.zoom}
          />
          {rotAngle === 0 && selectionAllowsResize && handles.map(({ pos, cx, cy }) => (
            <rect
              key={pos}
              x={cx - half}
              y={cy - half}
              width={handleSize}
              height={handleSize}
              fill="white"
              stroke="#3b82f6"
              strokeWidth={1.5 / viewport.zoom}
              style={{ pointerEvents: "none" }}
            />
          ))}
          {/* Enlarged invisible touch targets (midpoints first — corners win overlaps) */}
          {rotAngle === 0 && selectionAllowsResize &&
            [...handles.filter((hd) => hd.pos.length === 1), ...handles.filter((hd) => hd.pos.length === 2)].map(
              ({ pos, cx, cy }) => (
                <rect
                  key={`hit-${pos}`}
                  x={cx - hitHalf}
                  y={cy - hitHalf}
                  width={hitSize}
                  height={hitSize}
                  fill="transparent"
                  style={{ cursor: getRotatedCursor(pos, rotAngle), pointerEvents: "auto" }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    onResizeDown(pos, e);
                  }}
                />
              ),
            )}
          {/* Rotation handle */}
          {selectionAllowsRotate && (() => {
            const rotateGap = 25 / viewport.zoom;
            const topCx = b.x + b.w / 2;
            const topCy = b.y;
            return (
              <>
                <line
                  x1={topCx}
                  y1={topCy}
                  x2={topCx}
                  y2={topCy - rotateGap}
                  stroke="#3b82f6"
                  strokeWidth={1.5 / viewport.zoom}
                  style={{ pointerEvents: "none" }}
                />
                {(() => {
                  const rotateSize = 8 / viewport.zoom;
                  const rotateHalf = rotateSize / 2;
                  return (
                    <>
                      <rect
                        x={topCx - rotateHalf}
                        y={topCy - rotateGap - rotateHalf}
                        width={rotateSize}
                        height={rotateSize}
                        rx={1.5 / viewport.zoom}
                        transform={`rotate(45, ${topCx}, ${topCy - rotateGap})`}
                        fill="white"
                        stroke="#3b82f6"
                        strokeWidth={1.5 / viewport.zoom}
                        style={{ pointerEvents: "none" }}
                      />
                      <circle
                        cx={topCx}
                        cy={topCy - rotateGap}
                        r={hitHalf}
                        fill="transparent"
                        style={{ cursor: "grab", pointerEvents: "auto" }}
                        onPointerDown={(e) => onRotateDown(e)}
                      />
                    </>
                  );
                })()}
              </>
            );
          })()}
          {/* Connection handles on bounding box — freeform edge starts.
              Skip when the selection includes port-wired nodes (workflow
              etc.): those boards connect via ports, not bbox anchors. */}
          {(() => {
            const hasPortNode = Array.from(engine.selection).some((id) => {
              const n = engine.getNode(id);
              if (!n || n.type === "edge") return false;
              return nodeTypeHasPorts(registry?.get(n.type));
            });
            if (hasPortNode) return null;

            const connOffset = 26 / viewport.zoom;
            const connTopOffset = 42 / viewport.zoom; // extra clearance past rotation handle
            const connR = 4 / viewport.zoom;
            const sides: { side: HandleSide; cx: number; cy: number }[] = [
              { side: "top", cx: b.x + b.w / 2, cy: b.y - connTopOffset },
              { side: "right", cx: b.x + b.w + connOffset, cy: b.y + b.h / 2 },
              { side: "bottom", cx: b.x + b.w / 2, cy: b.y + b.h + connOffset },
              { side: "left", cx: b.x - connOffset, cy: b.y + b.h / 2 },
            ];
            return sides.map(({ side, cx, cy }) => (
              <g key={`conn-${side}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={connR}
                  fill="white"
                  stroke="#94a3b8"
                  strokeWidth={1.5 / viewport.zoom}
                  opacity={0.8}
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={hitHalf}
                  fill="transparent"
                  style={{ cursor: "crosshair", pointerEvents: "auto" }}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    const nodeId = findNearestNodeForSide(side);
                    if (nodeId) {
                      onConnectionDown(nodeId, side, e as unknown as React.PointerEvent<SVGCircleElement>);
                    }
                  }}
                />
              </g>
            ));
          })()}
        </g>
      </g>
    </svg>
  );
};

export default SelectionChromeOverlay;
