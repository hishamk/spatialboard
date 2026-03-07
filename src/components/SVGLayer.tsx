import { memo, useMemo } from "react";
import type {
  SpatialNode,
  EdgeNode,
  Viewport,
  HandleSide,
  Mode,
} from "../engine/types";
import { getStrokePath } from "../rendering/freehand";
import { strokeStyleToDash, getRoughPathPaths, getRoughLinePaths } from "../rendering/rough-shapes";
import type { RoughPathData } from "../rendering/rough-shapes";
import {
  computeEdgePath,
  computeSingleBorderPoint,
  arrowHeadPath,
  filledArrowHeadPath,
  getNodeHandlePositions,
  getPortPosition,
} from "../engine/edge-geometry";
import type { NodeTypeRegistry } from "../nodes/registry";
import type { PortDataType } from "../engine/data-flow-types";
import { getRotatedCursor } from "../interactions/resize-cursors";

export type HandlePosition = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

const PORT_COLORS: Record<PortDataType, string> = {
  number: "#3b82f6",   // blue
  string: "#10b981",   // green
  boolean: "#f59e0b",  // amber
  object: "#8b5cf6",   // purple
  any: "#6b7280",      // gray
  signal: "#ef4444",   // red
};

interface SVGLayerProps {
  nodes: SpatialNode[];
  viewport: Viewport;
  selection: Set<string>;
  measuredHeights?: Record<string, number>;
  activeStroke: {
    points: Array<[number, number, number]>;
    color: string;
    width: number;
    strokeStyle?: "solid" | "dashed" | "dotted";
  } | null;
  shapePreview: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null;
  shapePreviewStyle: {
    stroke: string;
    strokeWidth: number;
    roughness: number;
    shapeType?: string;
  } | null;
  onResizeHandleDown?: (
    nodeId: string,
    handle: HandlePosition,
    e: React.PointerEvent<SVGRectElement>
  ) => void;
  onRotateStart?: (
    nodeId: string,
    e: React.PointerEvent<SVGCircleElement>
  ) => void;
  onConnectionHandleDown?: (
    nodeId: string,
    side: HandleSide,
    e: React.PointerEvent<SVGCircleElement>
  ) => void;
  edgePreview?: {
    fromNode: SpatialNode;
    cursorX: number;
    cursorY: number;
    sourceHandle?: HandleSide;
    sourcePort?: string;
    sourceDirection?: "input" | "output";
  } | null;
  onEdgeEndpointDown?: (
    edgeId: string,
    endpoint: "source" | "target",
    e: React.PointerEvent<SVGCircleElement>
  ) => void;
  edgeReconnect?: {
    edgeId: string;
    endpoint: "source" | "target";
    anchorNodeId: string;
    anchorHandle?: HandleSide;
    cursorX: number;
    cursorY: number;
  } | null;
  onKinkHandleDown?: (
    edgeId: string,
    axis: "x" | "y" | "xy",
    min: number,
    max: number,
    e: React.PointerEvent<SVGCircleElement>
  ) => void;
  eraserMarkedIds?: Set<string>;
  eraserTrail?: Array<[number, number, number]>; // [x, y, timestamp]
  laserTrail?: Array<[number, number, number]>; // [x, y, timestamp]
  mode?: Mode;
  hoveredNodeId?: string | null;
  /** Node type registry — used to render port circles for nodes with ports. */
  registry?: NodeTypeRegistry;
  /** Called when a port handle is pressed (starts port-aware edge creation). */
  onPortHandleDown?: (
    nodeId: string,
    portId: string,
    direction: "input" | "output",
    e: React.PointerEvent<SVGCircleElement>
  ) => void;
  /** Node IDs that are part of a dependency cycle. */
  cycleNodeIds?: ReadonlySet<string>;
  /** Node types that act as containers (frame-like). Used for edge snapping priority. */
  containerTypes?: ReadonlySet<string>;
  /** Alignment guide lines shown during drag. */
  alignGuides?: Array<{
    axis: 'x' | 'y';
    position: number;
    start: number;
    end: number;
  }>;
}


const SelectionBox = memo(function SelectionBox({
  node,
  zoom,
  showHandles = true,
  measuredHeights,
  onHandlePointerDown,
  onRotateStart,
}: {
  node: SpatialNode;
  zoom: number;
  showHandles?: boolean;
  measuredHeights?: Record<string, number>;
  onHandlePointerDown?: (
    nodeId: string,
    handle: HandlePosition,
    e: React.PointerEvent<SVGRectElement>
  ) => void;
  onRotateStart?: (
    nodeId: string,
    e: React.PointerEvent<SVGCircleElement>
  ) => void;
}) {
  const h = node.h === "auto" ? (measuredHeights?.[node.id] ?? 100) : node.h;
  const rotation = node.rotation || 0;
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;
  const handleSize = 8 / zoom;
  const half = handleSize / 2;
  const rotateGap = 25 / zoom;
  const isLocked = !!node.locked;

  const handles: { pos: HandlePosition; cx: number; cy: number }[] = [
    { pos: "nw", cx: node.x, cy: node.y },
    { pos: "n", cx: node.x + node.w / 2, cy: node.y },
    { pos: "ne", cx: node.x + node.w, cy: node.y },
    { pos: "e", cx: node.x + node.w, cy: node.y + h / 2 },
    { pos: "se", cx: node.x + node.w, cy: node.y + h },
    { pos: "s", cx: node.x + node.w / 2, cy: node.y + h },
    { pos: "sw", cx: node.x, cy: node.y + h },
    { pos: "w", cx: node.x, cy: node.y + h / 2 },
  ];

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {/* Selection border — dotted line */}
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={h}
        fill="none"
        stroke={isLocked ? "#f59e0b" : "#3b82f6"}
        strokeWidth={1.5 / zoom}
        strokeDasharray={`${4 / zoom} ${3 / zoom}`}
      />
      {/* Lock icon */}
      {isLocked && (() => {
        const iconSize = 16 / zoom;
        const ix = node.x + node.w - iconSize - 4 / zoom;
        const iy = node.y - iconSize - 4 / zoom;
        return (
          <g transform={`translate(${ix}, ${iy})`}>
            <rect
              x={0} y={0}
              width={iconSize} height={iconSize}
              rx={3 / zoom}
              fill="#f59e0b"
            />
            <g transform={`scale(${iconSize / 24})`}>
              <rect x="6" y="11" width="12" height="9" rx="1" fill="white" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        );
      })()}
      {/* Resize handles */}
      {showHandles && !isLocked && handles.map(({ pos, cx: hx, cy: hy }) => (
        <rect
          key={pos}
          x={hx - half}
          y={hy - half}
          width={handleSize}
          height={handleSize}
          fill="white"
          stroke="#3b82f6"
          strokeWidth={1.5 / zoom}
          style={{
            cursor: getRotatedCursor(pos, rotation),
            pointerEvents: "auto",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            onHandlePointerDown?.(node.id, pos, e);
          }}
        />
      ))}
      {/* Rotation handle — line from top-center + rotate icon */}
      {showHandles && !isLocked && (
        <>
          <line
            x1={node.x + node.w / 2}
            y1={node.y}
            x2={node.x + node.w / 2}
            y2={node.y - rotateGap}
            stroke="#3b82f6"
            strokeWidth={1.5 / zoom}
          />
          <rect
            x={node.x + node.w / 2 - half}
            y={node.y - rotateGap - half}
            width={handleSize}
            height={handleSize}
            rx={1.5 / zoom}
            transform={`rotate(45, ${node.x + node.w / 2}, ${node.y - rotateGap})`}
            fill="white"
            stroke="#3b82f6"
            strokeWidth={1.5 / zoom}
            style={{ cursor: "grab", pointerEvents: "auto" }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onRotateStart?.(node.id, e as unknown as React.PointerEvent<SVGCircleElement>);
            }}
          />
        </>
      )}
    </g>
  );
});

/* ------------------------------------------------------------------ */
/*  EdgeRenderer — memoized per-edge component to avoid re-creating   */
/*  objects (roughOpts, style) on every parent render.                 */
/* ------------------------------------------------------------------ */

interface EdgeRendererProps {
  edge: EdgeNode;
  fromNode: SpatialNode;
  toNode: SpatialNode;
  viewport: Viewport;
  selection: Set<string>;
  measuredHeights?: Record<string, number>;
  registry?: NodeTypeRegistry;
  onEdgeEndpointDown?: (
    edgeId: string,
    endpoint: "source" | "target",
    e: React.PointerEvent<SVGCircleElement>
  ) => void;
  onKinkHandleDown?: (
    edgeId: string,
    axis: "x" | "y" | "xy",
    min: number,
    max: number,
    e: React.PointerEvent<SVGCircleElement>
  ) => void;
  edgeReconnect?: {
    edgeId: string;
    endpoint: "source" | "target";
    anchorNodeId: string;
    anchorHandle?: HandleSide;
    cursorX: number;
    cursorY: number;
  } | null;
  eraserMarkedIds?: Set<string>;
  cycleNodeIds?: ReadonlySet<string>;
}

const EdgeRenderer = memo(function EdgeRenderer({
  edge,
  fromNode,
  toNode,
  viewport,
  selection,
  measuredHeights,
  registry,
  onEdgeEndpointDown,
  onKinkHandleDown,
  edgeReconnect,
  eraserMarkedIds,
  cycleNodeIds,
}: EdgeRendererProps) {
  const edgeType = edge.data.edgeType || "bezier";

  // Compute port positions for port-connected edges
  let sourcePortPos: { x: number; y: number } | undefined;
  let targetPortPos: { x: number; y: number } | undefined;
  if (registry && edge.data.sourcePort) {
    const srcDef = registry.get(fromNode.type);
    if (srcDef?.ports) {
      sourcePortPos = getPortPosition(fromNode, srcDef.ports, edge.data.sourcePort, viewport.zoom, measuredHeights) ?? undefined;
    }
  }
  if (registry && edge.data.targetPort) {
    const tgtDef = registry.get(toNode.type);
    if (tgtDef?.ports) {
      targetPortPos = getPortPosition(toNode, tgtDef.ports, edge.data.targetPort, viewport.zoom, measuredHeights) ?? undefined;
    }
  }

  const pathResult = computeEdgePath(
    fromNode, toNode, edgeType, measuredHeights,
    edge.data.sourceHandle, edge.data.targetHandle,
    edge.data.midpointOffset, edge.data.curveOffset,
    sourcePortPos, targetPortPos
  );
  const { path, x1, y1, x2, y2, labelX, labelY, arrowAngle, tailAngle, kinkHandle } = pathResult;

  const isSelected = selection.has(edge.id);
  const sw = edge.data.strokeWidth;
  const dashArray =
    edge.data.style === "dashed"
      ? `${8 * sw},${4 * sw}`
      : edge.data.style === "dotted"
        ? `${2 * sw},${3 * sw}`
        : undefined;
  const defaultMarkerSize = Math.max(8, sw * 3);
  const headSize = edge.data.arrowHeadSize ?? defaultMarkerSize;
  const tailSize = edge.data.arrowTailSize ?? defaultMarkerSize;
  const isAnimated = edge.data.animated;

  const isEraserMarked = eraserMarkedIds?.has(edge.id);
  const isReconnecting = edgeReconnect?.edgeId === edge.id;

  // Detect if this edge is part of a dependency cycle
  const isCycleEdge = !!(
    cycleNodeIds &&
    cycleNodeIds.size > 0 &&
    edge.data.sourcePort &&
    edge.data.targetPort &&
    cycleNodeIds.has(edge.data.fromId) &&
    cycleNodeIds.has(edge.data.toId)
  );

  const edgeColor = isCycleEdge ? "#ef4444" : edge.data.color;
  const edgeRoughness = edge.data.roughness ?? 0;

  // Memoize roughOpts to avoid re-creating on every render
  const roughOpts = useMemo(() => {
    if (edgeRoughness <= 0) return null;
    return {
      stroke: edgeColor,
      roughness: edgeRoughness,
      strokeWidth: sw,
      strokeLineDash: edge.data.style === "dashed" ? [8, 4] : edge.data.style === "dotted" ? [2, 2] : undefined,
      seed: edge.id,
    };
  }, [edgeColor, edgeRoughness, sw, edge.data.style, edge.id]);

  // Pre-compute rough paths when roughness > 0
  let roughEdgePaths: RoughPathData[] | null = null;
  let roughHeadPaths: RoughPathData[] | null = null;
  let roughTailPaths: RoughPathData[] | null = null;
  if (roughOpts) {
    roughEdgePaths = getRoughPathPaths(path, roughOpts);
    if (edge.data.arrowHead === "arrow") {
      roughHeadPaths = getRoughPathPaths(arrowHeadPath(x2, y2, arrowAngle, headSize), { ...roughOpts, strokeLineDash: undefined });
    }
    if (edge.data.arrowTail === "arrow") {
      roughTailPaths = getRoughPathPaths(arrowHeadPath(x1, y1, tailAngle, tailSize), { ...roughOpts, strokeLineDash: undefined });
    }
  }

  // Memoize animation style objects
  const cycleAnimStyle = useMemo(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  );

  const animatedStyle = useMemo(() => {
    if (!isAnimated) return undefined;
    const name =
      edge.data.animatedDirection === "reverse" ? "edge-flow-reverse" :
      edge.data.animatedDirection === "both" ? "edge-flow-both" :
      "edge-flow";
    const dur = edge.data.animatedDirection === "both" ? "2s" : "1s";
    return { animation: `${name} ${dur} linear infinite` };
  }, [isAnimated, edge.data.animatedDirection]);

  const cycleAndFlowStyle = useMemo(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite" }),
    []
  );

  const eraserStyle = useMemo(
    () => isEraserMarked ? { filter: "saturate(0)" } as const : undefined,
    [isEraserMarked]
  );

  return (
    <g opacity={isReconnecting ? 0.15 : (isEraserMarked ? 0.25 : undefined)} style={eraserStyle}>
      {/* Cycle edge glow underlay */}
      {isCycleEdge && (
        <path
          d={path}
          stroke="#ef4444"
          strokeWidth={sw + 6 / viewport.zoom}
          strokeLinecap="round"
          fill="none"
          opacity={0.25}
          style={cycleAnimStyle}
        />
      )}
      {isSelected && (
        <path
          d={path}
          stroke="#3b82f6"
          strokeWidth={sw + 6 / viewport.zoom}
          strokeLinecap="round"
          fill="none"
          opacity={0.3}
        />
      )}
      {/* Edge stroke — rough or clean */}
      {roughEdgePaths ? (
        roughEdgePaths.map((rp, i) => (
          <path
            key={i}
            d={rp.d}
            stroke={rp.stroke}
            strokeWidth={rp.strokeWidth}
            strokeDasharray={rp.strokeDasharray}
            strokeLinecap="round"
            fill={rp.fill ?? "none"}
            style={isAnimated ? animatedStyle : undefined}
          />
        ))
      ) : (
        <path
          d={path}
          stroke={edgeColor}
          strokeWidth={sw}
          strokeDasharray={isAnimated ? "12,8" : (isCycleEdge ? `${6 * sw},${4 * sw}` : dashArray)}
          strokeLinecap="round"
          fill="none"
          style={
            isCycleEdge
              ? cycleAndFlowStyle
              : animatedStyle
          }
        />
      )}
      {/* Arrow head — rough or clean */}
      {edge.data.arrowHead === "arrow" && (
        roughHeadPaths ? (
          roughHeadPaths.map((rp, i) => (
            <path
              key={`ah${i}`}
              d={rp.d}
              stroke={rp.stroke}
              strokeWidth={rp.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={rp.fill ?? "none"}
            />
          ))
        ) : (
          <path
            d={arrowHeadPath(x2, y2, arrowAngle, headSize)}
            fill="none"
            stroke={edgeColor}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      )}
      {edge.data.arrowHead === "filled" && (
        <path
          d={filledArrowHeadPath(x2, y2, arrowAngle, headSize)}
          fill={edgeColor}
          stroke="none"
        />
      )}
      {edge.data.arrowHead === "dot" && (
        <circle
          cx={x2} cy={y2}
          r={headSize * 0.25}
          fill={edgeColor}
        />
      )}
      {/* Arrow tail — rough or clean */}
      {edge.data.arrowTail === "arrow" && (
        roughTailPaths ? (
          roughTailPaths.map((rp, i) => (
            <path
              key={`at${i}`}
              d={rp.d}
              stroke={rp.stroke}
              strokeWidth={rp.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={rp.fill ?? "none"}
            />
          ))
        ) : (
          <path
            d={arrowHeadPath(x1, y1, tailAngle, tailSize)}
            fill="none"
            stroke={edgeColor}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      )}
      {edge.data.arrowTail === "filled" && (
        <path
          d={filledArrowHeadPath(x1, y1, tailAngle, tailSize)}
          fill={edgeColor}
          stroke="none"
        />
      )}
      {edge.data.arrowTail === "dot" && (
        <circle
          cx={x1} cy={y1}
          r={tailSize * 0.25}
          fill={edgeColor}
        />
      )}
      {edge.data.label && (
        <>
          <rect
            x={labelX - (edge.data.label.length * 3.5 + 6) / viewport.zoom}
            y={labelY - 8 / viewport.zoom}
            width={(edge.data.label.length * 7 + 12) / viewport.zoom}
            height={16 / viewport.zoom}
            fill="white"
            rx={4 / viewport.zoom}
            opacity={0.9}
          />
          <text
            x={labelX}
            y={labelY + 4 / viewport.zoom}
            fill={edgeColor}
            fontSize={12 / viewport.zoom}
            textAnchor="middle"
            style={{ pointerEvents: "none" }}
          >
            {edge.data.label}
          </text>
        </>
      )}
      {/* Edge endpoint handles — draggable to reconnect */}
      {isSelected && !isReconnecting && (
        <>
          <circle
            cx={x1} cy={y1}
            r={5 / viewport.zoom}
            fill="#3b82f6"
            stroke="white"
            strokeWidth={1.5 / viewport.zoom}
            style={{ cursor: "grab", pointerEvents: "auto" }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onEdgeEndpointDown?.(edge.id, "source", e);
            }}
          />
          <circle
            cx={x2} cy={y2}
            r={5 / viewport.zoom}
            fill="#3b82f6"
            stroke="white"
            strokeWidth={1.5 / viewport.zoom}
            style={{ cursor: "grab", pointerEvents: "auto" }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onEdgeEndpointDown?.(edge.id, "target", e);
            }}
          />
        </>
      )}
      {/* Kink handle — draggable to reposition step/smoothstep bend */}
      {isSelected && !isReconnecting && kinkHandle && (
        <circle
          cx={kinkHandle.x} cy={kinkHandle.y}
          r={5 / viewport.zoom}
          fill="white"
          stroke="#3b82f6"
          strokeWidth={1.5 / viewport.zoom}
          style={{
            cursor: kinkHandle.axis === "xy" ? "move" : kinkHandle.axis === "x" ? "ew-resize" : "ns-resize",
            pointerEvents: "auto",
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            onKinkHandleDown?.(edge.id, kinkHandle.axis, kinkHandle.min, kinkHandle.max, e);
          }}
        />
      )}
    </g>
  );
});

/**
 * SVGLayer — now only renders overlays:
 * - Selection boxes for draw/shape nodes (single selection)
 * - Active stroke being drawn (preview)
 * - Shape preview while dragging
 *
 * Node rendering has been moved to SVGNodeBlock in the unified DOM layer.
 */
export default function SVGLayer({
  nodes,
  viewport,
  selection,
  measuredHeights,
  activeStroke,
  shapePreview,
  shapePreviewStyle,
  onResizeHandleDown,
  onRotateStart,
  onConnectionHandleDown,
  onEdgeEndpointDown,
  onKinkHandleDown,
  edgePreview,
  edgeReconnect,
  eraserMarkedIds,
  eraserTrail,
  laserTrail,
  mode,
  hoveredNodeId,
  registry,
  onPortHandleDown,
  cycleNodeIds,
  containerTypes,
  alignGuides,
}: SVGLayerProps) {
  const svgTransform = `translate(${viewport.x}, ${viewport.y}) scale(${viewport.zoom})`;

  // Nodes that need selection boxes (everything except edges, content, and image
  // which render their own selection UI)
  const svgNodes = nodes.filter(
    (n) => n.type !== "edge" && n.type !== "content" && n.type !== "image"
  );

  // Edge nodes sorted by z + lookup map
  const edgeNodes = nodes
    .filter((n): n is EdgeNode => n.type === "edge")
    .sort((a, b) => a.z - b.z);
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <svg
      data-sb-overlay
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <g transform={svgTransform}>
        {/* Edge connectors */}
        {edgeNodes.map((edge) => {
          const fromNode = nodeMap.get(edge.data.fromId);
          const toNode = nodeMap.get(edge.data.toId);
          if (!fromNode || !toNode) return null;
          return (
            <EdgeRenderer
              key={edge.id}
              edge={edge}
              fromNode={fromNode}
              toNode={toNode}
              viewport={viewport}
              selection={selection}
              measuredHeights={measuredHeights}
              registry={registry}
              onEdgeEndpointDown={onEdgeEndpointDown}
              onKinkHandleDown={onKinkHandleDown}
              edgeReconnect={edgeReconnect}
              eraserMarkedIds={eraserMarkedIds}
              cycleNodeIds={cycleNodeIds}
            />
          );
        })}

        {/* Connection handles — shown on selected nodes, or ALL nodes during edge drag */}
        {/* Nodes with ports use port circles instead (rendered below) */}
        {(() => {
          const isDragging = !!edgePreview || !!edgeReconnect;
          const cursorX = edgePreview?.cursorX ?? edgeReconnect?.cursorX ?? 0;
          const cursorY = edgePreview?.cursorY ?? edgeReconnect?.cursorY ?? 0;
          // Source node to exclude from "nearest target" computation
          const dragSourceId = edgePreview?.fromNode.id ?? edgeReconnect?.anchorNodeId ?? null;

          // Find the nearest handle across all non-source nodes to highlight during drag
          let nearestTargetNodeId: string | null = null;
          let nearestTargetSide: HandleSide | null = null;
          // Nodes whose cursor is within 20% expanded bounding box
          const nearbyNodeIds = new Set<string>();
          if (isDragging) {
            let bestDist = Infinity;
            let bestIsFrame = false;
            const snapThreshold = 50 / viewport.zoom;
            for (const n of nodes) {
              if (n.type === "edge" || n.id === dragSourceId) continue;
              // Skip nodes with ports — those use port handles instead
              if (registry?.get(n.type)?.ports?.length) continue;
              const nh = n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : n.h;
              // Check if cursor is within 20% expanded bounds
              const padX = n.w * 0.2;
              const padY = nh * 0.2;
              if (
                cursorX >= n.x - padX && cursorX <= n.x + n.w + padX &&
                cursorY >= n.y - padY && cursorY <= n.y + nh + padY
              ) {
                nearbyNodeIds.add(n.id);
              }
              const handlePositions = getNodeHandlePositions(n, measuredHeights);
              const isFrame = containerTypes ? containerTypes.has(n.type) : n.type === "frame";
              for (const hp of handlePositions) {
                const dist = Math.hypot(hp.x - cursorX, hp.y - cursorY);
                if (dist >= snapThreshold) continue;
                // Non-frame always beats frame; frame never beats non-frame
                if (isFrame && !bestIsFrame && nearestTargetNodeId) continue;
                if ((!isFrame && bestIsFrame) || dist < bestDist) {
                  bestDist = dist;
                  bestIsFrame = isFrame;
                  nearestTargetNodeId = n.id;
                  nearestTargetSide = hp.side;
                }
              }
            }
          }

          return nodes
            .filter((n) => {
              if (n.type === "edge") return false;
              // Skip nodes with ports — they get port circles instead
              if (registry?.get(n.type)?.ports?.length) return false;
              // Multi-select: don't show individual handles (bounding box handles shown instead)
              return (selection.size <= 1 && selection.has(n.id)) || (isDragging && (n.id === dragSourceId || nearbyNodeIds.has(n.id)));
            })
            .map((node) => {
              const handles = getNodeHandlePositions(node, measuredHeights);
              const handleR = 4 / viewport.zoom;
              const offset = 26 / viewport.zoom;
              const rotation = node.rotation || 0;
              const nh = node.h === "auto" ? (measuredHeights?.[node.id] ?? 100) : node.h;
              const ncx = node.x + node.w / 2;
              const ncy = node.y + nh / 2;
              const isDragSource =
                (edgePreview && edgePreview.fromNode.id === node.id) ||
                (edgeReconnect && edgeReconnect.anchorNodeId === node.id);
              const isInteractive = selection.has(node.id) && !isDragging;
              return (
                <g key={`conn-${node.id}`} transform={rotation ? `rotate(${rotation}, ${ncx}, ${ncy})` : undefined}>
                  {handles.map(({ side }) => {
                    const midpoints: Record<HandleSide, [number, number]> = {
                      top:    [node.x + node.w / 2, node.y],
                      bottom: [node.x + node.w / 2, node.y + nh],
                      left:   [node.x, node.y + nh / 2],
                      right:  [node.x + node.w, node.y + nh / 2],
                    };
                    const [mx, my] = midpoints[side];
                    const sideOffset = side === "top" && selection.has(node.id) ? 42 / viewport.zoom : offset;
                    let ox = mx, oy = my;
                    switch (side) {
                      case "top":    oy = my - sideOffset; break;
                      case "bottom": oy = my + sideOffset; break;
                      case "left":   ox = mx - sideOffset; break;
                      case "right":  ox = mx + sideOffset; break;
                    }
                    // Highlight the nearest target handle during drag
                    const isNearestTarget = isDragging &&
                      nearestTargetNodeId === node.id && nearestTargetSide === side;
                    return (
                      <circle
                        key={`ch-${node.id}-${side}`}
                        cx={ox}
                        cy={oy}
                        r={isNearestTarget ? 5 / viewport.zoom : handleR}
                        fill={isDragSource ? "#3b82f6" : isNearestTarget ? "#3b82f6" : "white"}
                        stroke={isNearestTarget ? "white" : isDragging && !isDragSource ? "#3b82f6" : "#94a3b8"}
                        strokeWidth={1.5 / viewport.zoom}
                        opacity={isNearestTarget ? 1 : isDragging && !isDragSource ? 1 : 0.8}
                        style={{
                          cursor: isInteractive ? "crosshair" : "default",
                          pointerEvents: isInteractive ? "auto" : "none",
                        }}
                        onPointerDown={isInteractive ? (e) => {
                          e.stopPropagation();
                          onConnectionHandleDown?.(node.id, side, e);
                        } : undefined}
                      />
                    );
                  })}
                </g>
              );
            });
        })()}

        {/* Port circles — for nodes with port definitions */}
        {registry && (() => {
          const isDragging = !!edgePreview || !!edgeReconnect;
          const cursorX = edgePreview?.cursorX ?? edgeReconnect?.cursorX ?? 0;
          const cursorY = edgePreview?.cursorY ?? edgeReconnect?.cursorY ?? 0;
          const dragSourceNodeId = edgePreview?.fromNode.id ?? null;
          // Determine expected target direction: if dragging from output, target must be input
          const expectedDir: "input" | "output" | null =
            edgePreview?.sourceDirection === "output" ? "input" :
            edgePreview?.sourceDirection === "input" ? "output" : null;

          // Find the nearest compatible port across all nodes during drag
          let nearestPortNodeId: string | null = null;
          let nearestPortId: string | null = null;
          if (isDragging && expectedDir) {
            let bestDist = 40 / viewport.zoom; // snap threshold
            for (const n of nodes) {
              if (n.type === "edge" || n.id === dragSourceNodeId) continue;
              const def = registry.get(n.type);
              if (!def?.ports?.length) continue;
              const nh = n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : n.h;
              const pOffset = 14 / viewport.zoom;
              const portsOfDir = def.ports.filter((p) => p.direction === expectedDir);
              for (let i = 0; i < portsOfDir.length; i++) {
                const port = portsOfDir[i];
                const py = n.y + (nh / (portsOfDir.length + 1)) * (i + 1);
                const px = port.direction === "input" ? n.x - pOffset : n.x + n.w + pOffset;
                const dist = Math.hypot(px - cursorX, py - cursorY);
                if (dist < bestDist) {
                  bestDist = dist;
                  nearestPortNodeId = n.id;
                  nearestPortId = port.id;
                }
              }
            }
          }

          return nodes
            .filter((n) => {
              if (n.type === "edge") return false;
              const def = registry.get(n.type);
              // Always show ports on nodes that have port definitions
              return !!def?.ports?.length;
            })
            .map((node) => {
              const def = registry.get(node.type)!;
              const ports = def.ports!;
              const nh = node.h === "auto" ? (measuredHeights?.[node.id] ?? 100) : node.h;
              const rotation = node.rotation || 0;
              const ncx = node.x + node.w / 2;
              const ncy = node.y + nh / 2;
              const portR = 6 / viewport.zoom;
              const portOffset = 14 / viewport.zoom; // how far outside the node edge

              const inputPorts = ports.filter((p) => p.direction === "input");
              const outputPorts = ports.filter((p) => p.direction === "output");
              // Ports are always interactive (no need to select the node first)
              const isInteractive = !isDragging;

              const renderPort = (port: typeof ports[number], i: number, portsOfDir: typeof ports, direction: "input" | "output") => {
                const py = node.y + (nh / (portsOfDir.length + 1)) * (i + 1);
                const px = direction === "input" ? node.x - portOffset : node.x + node.w + portOffset;
                const color = PORT_COLORS[port.dataType] || PORT_COLORS.any;
                const isNearest = nearestPortNodeId === node.id && nearestPortId === port.id;
                const highlightR = isNearest ? 8 / viewport.zoom : portR;
                const edgeX = direction === "input" ? node.x : node.x + node.w;
                const labelX = direction === "input" ? px - portR - 4 / viewport.zoom : px + portR + 4 / viewport.zoom;

                return (
                  <g key={`port-${node.id}-${port.id}`}>
                    {/* Connection line from port to node edge */}
                    <line
                      x1={px} y1={py}
                      x2={edgeX} y2={py}
                      stroke={color}
                      strokeWidth={1.5 / viewport.zoom}
                      opacity={0.4}
                      style={{ pointerEvents: "none" }}
                    />
                    {/* Glow ring when highlighted */}
                    {isNearest && (
                      <circle
                        cx={px} cy={py}
                        r={12 / viewport.zoom}
                        fill="none"
                        stroke="white"
                        strokeWidth={1.5 / viewport.zoom}
                        opacity={0.3}
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                    <circle
                      cx={px}
                      cy={py}
                      r={highlightR}
                      fill={isNearest ? "white" : color}
                      stroke={isNearest ? color : "#1a1a2e"}
                      strokeWidth={2 / viewport.zoom}
                      style={{
                        cursor: isInteractive ? "crosshair" : "default",
                        pointerEvents: isInteractive ? "auto" : "none",
                        transition: "r 0.1s, fill 0.1s",
                      }}
                      onPointerDown={isInteractive ? (e) => {
                        e.stopPropagation();
                        onPortHandleDown?.(node.id, port.id, direction, e);
                      } : undefined}
                    />
                    {/* Port label pill */}
                    {(() => {
                      const labelText = port.label || port.id;
                      const fs = 9 / viewport.zoom;
                      const pillPadX = 5 / viewport.zoom;
                      const pillPadY = 2.5 / viewport.zoom;
                      const pillW = (labelText.length * fs * 0.62) + pillPadX * 2;
                      const pillH = fs + pillPadY * 2;
                      const pillX = direction === "input"
                        ? labelX - pillW
                        : labelX;
                      const pillY = py - pillH / 2;
                      const pillR = pillH / 2;
                      const pillFill = isNearest ? color : "#1a1a2e";
                      const pillStroke = isNearest ? color : "#2a2a40";
                      const textFill = isNearest ? "#fff" : "#94a3b8";
                      return (
                        <g style={{ pointerEvents: "none" }}>
                          <rect
                            x={pillX}
                            y={pillY}
                            width={pillW}
                            height={pillH}
                            rx={pillR}
                            ry={pillR}
                            fill={pillFill}
                            fillOpacity={isNearest ? 0.9 : 0.85}
                            stroke={pillStroke}
                            strokeWidth={1 / viewport.zoom}
                          />
                          <text
                            x={direction === "input" ? pillX + pillW / 2 : pillX + pillW / 2}
                            y={py + fs * 0.35}
                            fill={textFill}
                            fontSize={fs}
                            fontWeight={600}
                            fontFamily="'Inter', system-ui, sans-serif"
                            textAnchor="middle"
                            style={{ userSelect: "none" }}
                          >
                            {labelText}
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                );
              };

              const isCycle = cycleNodeIds?.has(node.id);

              return (
                <g key={`ports-${node.id}`} transform={rotation ? `rotate(${rotation}, ${ncx}, ${ncy})` : undefined}>
                  {inputPorts.map((port, i) => renderPort(port, i, inputPorts, "input"))}
                  {outputPorts.map((port, i) => renderPort(port, i, outputPorts, "output"))}
                  {/* Cycle warning badge */}
                  {isCycle && (() => {
                    const badgeR = 10 / viewport.zoom;
                    const bx = node.x + node.w + badgeR * 0.3;
                    const by = node.y - badgeR * 0.3;
                    return (
                      <g style={{ pointerEvents: "none" }}>
                        <circle
                          cx={bx} cy={by}
                          r={badgeR}
                          fill="#ef4444"
                          stroke="#1a1a2e"
                          strokeWidth={2 / viewport.zoom}
                        />
                        <text
                          x={bx}
                          y={by + 4 / viewport.zoom}
                          fill="white"
                          fontSize={12 / viewport.zoom}
                          fontWeight={800}
                          textAnchor="middle"
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          !
                        </text>
                      </g>
                    );
                  })()}
                </g>
              );
            });
        })()}

        {/* Edge creation preview */}
        {edgePreview && (() => {
          // Start the preview line from the port or connection circle position
          let startX: number, startY: number;
          if (edgePreview.sourcePort && registry) {
            // Port-aware: start from the port circle position
            const node = edgePreview.fromNode;
            const def = registry.get(node.type);
            const portPos = def?.ports
              ? getPortPosition(node, def.ports, edgePreview.sourcePort, viewport.zoom, measuredHeights)
              : null;
            if (portPos) {
              startX = portPos.x;
              startY = portPos.y;
            } else {
              const bp = computeSingleBorderPoint(node, edgePreview.cursorX, edgePreview.cursorY, measuredHeights);
              startX = bp.x; startY = bp.y;
            }
          } else if (edgePreview.sourceHandle) {
            const node = edgePreview.fromNode;
            const nh = node.h === "auto" ? (measuredHeights?.[node.id] ?? 100) : node.h;
            const midpoints: Record<HandleSide, [number, number]> = {
              top:    [node.x + node.w / 2, node.y],
              bottom: [node.x + node.w / 2, node.y + nh],
              left:   [node.x, node.y + nh / 2],
              right:  [node.x + node.w, node.y + nh / 2],
            };
            const side = edgePreview.sourceHandle;
            const circleOffset = side === "top" ? 42 / viewport.zoom : 26 / viewport.zoom;
            const [mx, my] = midpoints[side];
            let ox = mx, oy = my;
            switch (side) {
              case "top":    oy = my - circleOffset; break;
              case "bottom": oy = my + circleOffset; break;
              case "left":   ox = mx - circleOffset; break;
              case "right":  ox = mx + circleOffset; break;
            }
            // Apply rotation if the node is rotated
            if (node.rotation) {
              const ncx = node.x + node.w / 2;
              const ncy = node.y + nh / 2;
              const rad = (node.rotation * Math.PI) / 180;
              const cos = Math.cos(rad);
              const sin = Math.sin(rad);
              const dx = ox - ncx;
              const dy = oy - ncy;
              startX = ncx + dx * cos - dy * sin;
              startY = ncy + dx * sin + dy * cos;
            } else {
              startX = ox;
              startY = oy;
            }
          } else {
            const bp = computeSingleBorderPoint(edgePreview.fromNode, edgePreview.cursorX, edgePreview.cursorY, measuredHeights);
            startX = bp.x; startY = bp.y;
          }
          return (
            <line
              x1={startX} y1={startY}
              x2={edgePreview.cursorX} y2={edgePreview.cursorY}
              stroke="#3b82f6"
              strokeWidth={2 / viewport.zoom}
              strokeDasharray={`${4 / viewport.zoom}`}
              strokeLinecap="round"
            />
          );
        })()}

        {/* Edge reconnection preview — dashed line from anchor to cursor */}
        {edgeReconnect && (() => {
          const anchorNode = nodeMap.get(edgeReconnect.anchorNodeId);
          if (!anchorNode) return null;

          let anchorX: number, anchorY: number;
          if (edgeReconnect.anchorHandle) {
            const nh = anchorNode.h === "auto" ? (measuredHeights?.[anchorNode.id] ?? 100) : anchorNode.h;
            const midpoints: Record<HandleSide, [number, number]> = {
              top:    [anchorNode.x + anchorNode.w / 2, anchorNode.y],
              bottom: [anchorNode.x + anchorNode.w / 2, anchorNode.y + nh],
              left:   [anchorNode.x, anchorNode.y + nh / 2],
              right:  [anchorNode.x + anchorNode.w, anchorNode.y + nh / 2],
            };
            const side = edgeReconnect.anchorHandle;
            const circleOffset = side === "top" ? 42 / viewport.zoom : 26 / viewport.zoom;
            const [mx, my] = midpoints[side];
            let ox = mx, oy = my;
            switch (side) {
              case "top":    oy = my - circleOffset; break;
              case "bottom": oy = my + circleOffset; break;
              case "left":   ox = mx - circleOffset; break;
              case "right":  ox = mx + circleOffset; break;
            }
            if (anchorNode.rotation) {
              const ncx = anchorNode.x + anchorNode.w / 2;
              const ncy = anchorNode.y + nh / 2;
              const rad = (anchorNode.rotation * Math.PI) / 180;
              const cos = Math.cos(rad);
              const sin = Math.sin(rad);
              const dx = ox - ncx;
              const dy = oy - ncy;
              anchorX = ncx + dx * cos - dy * sin;
              anchorY = ncy + dx * sin + dy * cos;
            } else {
              anchorX = ox;
              anchorY = oy;
            }
          } else {
            const bp = computeSingleBorderPoint(anchorNode, edgeReconnect.cursorX, edgeReconnect.cursorY, measuredHeights);
            anchorX = bp.x; anchorY = bp.y;
          }
          return (
            <line
              x1={anchorX} y1={anchorY}
              x2={edgeReconnect.cursorX} y2={edgeReconnect.cursorY}
              stroke="#3b82f6"
              strokeWidth={2 / viewport.zoom}
              strokeDasharray={`${4 / viewport.zoom}`}
              strokeLinecap="round"
            />
          );
        })()}

        {/* Selection boxes for SVG nodes (single selection only — multi uses unified bounding box) */}
        {selection.size === 1 && svgNodes
          .filter((n) => selection.has(n.id))
          .map((node) => (
            <SelectionBox
              key={`sel-${node.id}`}
              node={node}
              zoom={viewport.zoom}
              showHandles={selection.size === 1}
              measuredHeights={measuredHeights}
              onHandlePointerDown={onResizeHandleDown}
              onRotateStart={onRotateStart}
            />
          ))}

        {/* Active stroke being drawn */}
        {activeStroke && activeStroke.points.length > 1 && (() => {
          const isDashed = activeStroke.strokeStyle === "dashed" || activeStroke.strokeStyle === "dotted";
          if (isDashed) {
            const pts = activeStroke.points;
            const d: (string | number)[] = ["M", pts[0][0], pts[0][1]];
            for (let i = 1; i < pts.length; i++) {
              const [px, py] = pts[i];
              const [prevX, prevY] = pts[i - 1];
              d.push("Q", prevX, prevY, (prevX + px) / 2, (prevY + py) / 2);
            }
            const last = pts[pts.length - 1];
            d.push("L", last[0], last[1]);
            const dash = strokeStyleToDash(activeStroke.strokeStyle);
            return (
              <path
                d={d.join(" ")}
                fill="none"
                stroke={activeStroke.color}
                strokeWidth={activeStroke.width}
                strokeDasharray={dash?.map(v => v * Math.max(activeStroke.width, 1)).join(" ")}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          }
          return (
            <path
              d={getStrokePath(activeStroke.points, {
                size: activeStroke.width,
              })}
              fill={activeStroke.color}
            />
          );
        })()}

        {/* Shape preview while dragging */}
        {shapePreview && shapePreviewStyle && (() => {
          const x = Math.min(shapePreview.startX, shapePreview.endX);
          const y = Math.min(shapePreview.startY, shapePreview.endY);
          const w = Math.abs(shapePreview.endX - shapePreview.startX);
          const h = Math.abs(shapePreview.endY - shapePreview.startY);
          if (w < 2 && h < 2) return null;
          const st = shapePreviewStyle;
          const type = st.shapeType || "rect";

          if (type === "ellipse") {
            return (
              <ellipse
                cx={x + w / 2}
                cy={y + h / 2}
                rx={w / 2}
                ry={h / 2}
                stroke={st.stroke}
                strokeWidth={st.strokeWidth}
                fill="none"
                strokeDasharray="4"
              />
            );
          }
          if (type === "diamond") {
            return (
              <polygon
                points={`${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`}
                stroke={st.stroke}
                strokeWidth={st.strokeWidth}
                fill="none"
                strokeDasharray="4"
              />
            );
          }
          if (type === "line" || type === "arrow") {
            const sx = shapePreview.startX;
            const sy = shapePreview.startY;
            const ex = shapePreview.endX;
            const ey = shapePreview.endY;
            return (
              <>
                <line
                  x1={sx}
                  y1={sy}
                  x2={ex}
                  y2={ey}
                  stroke={st.stroke}
                  strokeWidth={st.strokeWidth}
                  strokeDasharray="4"
                />
                {type === "arrow" && (() => {
                  const angle = Math.atan2(ey - sy, ex - sx);
                  const headLen = Math.max(12, st.strokeWidth * 4);
                  const headAngle = Math.PI / 6;
                  const ax = ex - headLen * Math.cos(angle - headAngle);
                  const ay = ey - headLen * Math.sin(angle - headAngle);
                  const bx = ex - headLen * Math.cos(angle + headAngle);
                  const by = ey - headLen * Math.sin(angle + headAngle);
                  return (
                    <polyline
                      points={`${ax},${ay} ${ex},${ey} ${bx},${by}`}
                      stroke={st.stroke}
                      strokeWidth={st.strokeWidth}
                      fill="none"
                      strokeDasharray="4"
                    />
                  );
                })()}
              </>
            );
          }
          // Default: rect
          return (
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              stroke={st.stroke}
              strokeWidth={st.strokeWidth}
              fill="none"
              strokeDasharray="4"
            />
          );
        })()}

        {/* Eraser trail — smooth continuous stroke with fade */}
        {eraserTrail && eraserTrail.length > 1 && (() => {
          const now = performance.now();
          const LIFETIME = 400; // must match SpatialCanvas TRAIL_LIFETIME
          const sw = 6 / viewport.zoom;

          // Build one continuous smooth Bézier path
          const d: string[] = [`M${eraserTrail[0][0]},${eraserTrail[0][1]}`];
          if (eraserTrail.length === 2) {
            d.push(`L${eraserTrail[1][0]},${eraserTrail[1][1]}`);
          } else {
            for (let i = 0; i < eraserTrail.length - 1; i++) {
              const mx = (eraserTrail[i][0] + eraserTrail[i + 1][0]) / 2;
              const my = (eraserTrail[i][1] + eraserTrail[i + 1][1]) / 2;
              d.push(`Q${eraserTrail[i][0]},${eraserTrail[i][1]},${mx},${my}`);
            }
            const last = eraserTrail[eraserTrail.length - 1];
            d.push(`L${last[0]},${last[1]}`);
          }
          const pathD = d.join(" ");

          const newestAge = (now - eraserTrail[eraserTrail.length - 1][2]) / LIFETIME;
          const oldestAge = (now - eraserTrail[0][2]) / LIFETIME;
          const headOpacity = Math.max(0, 0.85 * (1 - newestAge));
          const tailOpacity = Math.max(0, 0.85 * (1 - oldestAge));
          const avgOpacity = (headOpacity + tailOpacity) / 2;
          if (avgOpacity <= 0) return null;

          return (
            <>
              {/* Glow layer */}
              <path d={pathD} fill="none"
                stroke="#9ca3af" strokeWidth={sw * 3}
                strokeLinecap="round" strokeLinejoin="round"
                opacity={avgOpacity * 0.35} />
              {/* Core line */}
              <path d={pathD} fill="none"
                stroke="#d1d5db" strokeWidth={sw}
                strokeLinecap="round" strokeLinejoin="round"
                opacity={avgOpacity} />
            </>
          );
        })()}

        {/* Laser pointer trail — smooth continuous stroke with fade */}
        {laserTrail && laserTrail.length > 1 && (() => {
          const now = performance.now();
          const LIFETIME = 1560;
          const sw = 6 / viewport.zoom;

          // Build path with sub-paths separated by NaN break markers
          const d: string[] = [];
          let inPath = false;
          let prevValid = false;
          for (let i = 0; i < laserTrail.length; i++) {
            const pt = laserTrail[i];
            if (isNaN(pt[0])) {
              inPath = false;
              prevValid = false;
              continue;
            }
            if (!inPath) {
              d.push(`M${pt[0]},${pt[1]}`);
              inPath = true;
              prevValid = true;
            } else if (prevValid) {
              const next = i + 1 < laserTrail.length && !isNaN(laserTrail[i + 1][0])
                ? laserTrail[i + 1] : null;
              if (next) {
                const mx = (pt[0] + next[0]) / 2;
                const my = (pt[1] + next[1]) / 2;
                d.push(`Q${pt[0]},${pt[1]},${mx},${my}`);
              } else {
                d.push(`L${pt[0]},${pt[1]}`);
              }
            }
          }
          if (d.length === 0) return null;
          const pathD = d.join(" ");

          // Overall opacity based on newest valid point
          const validPoints = laserTrail.filter(p => !isNaN(p[0]));
          if (validPoints.length === 0) return null;
          const newestAge = (now - validPoints[validPoints.length - 1][2]) / LIFETIME;
          const oldestAge = (now - validPoints[0][2]) / LIFETIME;
          const headOpacity = Math.max(0, 0.85 * (1 - newestAge));
          const tailOpacity = Math.max(0, 0.85 * (1 - oldestAge));
          const avgOpacity = (headOpacity + tailOpacity) / 2;
          if (avgOpacity <= 0) return null;

          return (
            <>
              {/* Glow layer */}
              <path d={pathD} fill="none"
                stroke="#ef4444" strokeWidth={sw * 3}
                strokeLinecap="round" strokeLinejoin="round"
                opacity={avgOpacity * 0.35} />
              {/* Core laser line */}
              <path d={pathD} fill="none"
                stroke="#ff6b6b" strokeWidth={sw}
                strokeLinecap="round" strokeLinejoin="round"
                opacity={avgOpacity} />
            </>
          );
        })()}

        {/* Alignment guides */}
        {alignGuides && alignGuides.length > 0 && alignGuides.map((g, i) => (
          <line
            key={`guide-${i}`}
            x1={g.axis === 'x' ? g.position : g.start}
            y1={g.axis === 'x' ? g.start : g.position}
            x2={g.axis === 'x' ? g.position : g.end}
            y2={g.axis === 'x' ? g.end : g.position}
            stroke="#f472b6"
            strokeWidth={1 / viewport.zoom}
            strokeDasharray={`${3 / viewport.zoom} ${2 / viewport.zoom}`}
            opacity={0.8}
          />
        ))}
      </g>
    </svg>
  );
}
