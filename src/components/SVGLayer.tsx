import { memo, useMemo, useState } from "react";
import type {
  SpatialNode,
  EdgeNode,
  EdgeType,
  Viewport,
  HandleSide,
  Mode,
} from "../engine/types";
import { getStrokePath } from "../rendering/freehand";
import { strokeStyleToDash, getRoughPathPaths, getRoughLinePaths, getRoughRectPaths, getRoughEllipsePaths, getRoughDiamondPaths, getRoughArrowPaths, roundedRectRadius } from "../rendering/rough-shapes";
import type { RoughPathData } from "../rendering/rough-shapes";
import {
  computeEdgePath,
  computeSingleBorderPoint,
  arrowHeadPath,
  filledArrowHeadPath,
  getNodeHandlePositions,
  getPortPosition,
  getPortOuterLocal,
  getPortStubInnerLocal,
  type PortAnchorMode,
  nearestPerimeterPoint,
  PORT_DOT_HIGHLIGHT_RADIUS_PX,
  PORT_EDGE_SNAP_RADIUS_PX,
  PORT_DOT_RADIUS_PX,
} from "../engine/edge-geometry";
import type { NodeTypeRegistry } from "../nodes/registry";
import { resolveNodePorts, nodeTypeHasPorts } from "../nodes/registry";
import type { PortDataType, PortValue } from "../engine/data-flow-types";
import { nodeShowsEdgeComputeOverlay } from "../engine/data-flow-types";
import { getRotatedCursor } from "../interactions/resize-cursors";
import { useSBTheme } from "./sidebar/ThemeContext";

export type HandlePosition = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

/** Optional captions on port edges: port names and/or downstream `compute` wall time. */
export type DataFlowEdgeOverlay = "off" | "ports" | "ports+compute";

function formatComputeMs(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "";
  if (ms < 0.05) return "<0.05 ms";
  if (ms < 10) return `${ms < 1 ? ms.toFixed(2) : ms.toFixed(1)} ms`;
  return `${Math.round(ms)} ms`;
}

/** Non-empty `error` / `err` output on the target node (fetch failures, parse errors, etc.). */
function getDownstreamPortErrorMessage(
  registry: NodeTypeRegistry | undefined,
  toNode: SpatialNode,
  getPortValue?: (nodeId: string, portId: string) => PortValue,
): string | null {
  if (!registry || !getPortValue || !toNode.id) return null;
  const def = registry.get(toNode.type);
  const ports = resolveNodePorts(def, toNode);
  if (!ports) return null;
  for (const p of ports) {
    if (p.direction !== "output") continue;
    if (p.id !== "error" && p.id !== "err") continue;
    const v = getPortValue(toNode.id, p.id);
    const s = v != null && v !== undefined ? String(v).trim() : "";
    if (s) return s.length > 200 ? `${s.slice(0, 197)}\u2026` : s;
  }
  return null;
}

function measureEdgeLabelBox(
  lines: { text: string; primary: boolean }[],
  labelX: number,
  labelY: number,
  z: number,
): { w: number; h: number; x0: number; y0: number } | null {
  if (lines.length === 0) return null;
  const lh = 13 / z;
  const padX = 7 / z;
  const padY = 5 / z;
  const charW = 6 / z;
  const maxChars = Math.max(...lines.map((l) => l.text.length), 1);
  const w = Math.min(maxChars * charW + padX * 2, 280 / z);
  const h = lines.length * lh + padY * 2;
  return {
    w,
    h,
    x0: labelX - w / 2,
    y0: labelY - h / 2,
  };
}

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
    opacity?: number;
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
    fill?: string;
    fillStyle?: "hachure" | "cross-hatch" | "solid";
    strokeStyle?: "solid" | "dashed" | "dotted";
    opacity?: number;
    edgeStyle?: "sharp" | "round";
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
    sourceT?: number;
    sourcePort?: string;
    sourceDirection?: "input" | "output";
    /** Edge style for realistic preview */
    edgeColor?: string;
    edgeStrokeWidth?: number;
    edgeStyle?: "solid" | "dashed" | "dotted";
    edgeType?: EdgeType;
    attachmentGap?: number;
    /** Held after empty-canvas drop while host add-node menu is open. */
    held?: boolean;
    /** Skeleton ghost node at the drop (competitor-style). */
    ghost?: { w: number; h: number; attach: "in" | "out" };
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
  eraserTrail?: Array<[number, number, number]>; // [x, y, Date.now() ms]
  laserTrail?: Array<[number, number, number]>; // [x, y, timestamp]
  mode?: Mode;
  freeFormEdges?: boolean;
  hoveredNodeId?: string | null;
  /** Canvas-space cursor position for edge mode hover dot */
  cursorCanvasPos?: { x: number; y: number } | null;
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
  /** When not `off`, port-connected edges show `sourcePort → targetPort`; `ports+compute` adds target node's last `compute` duration. */
  dataFlowEdgeOverlay?: DataFlowEdgeOverlay;
  /** When false, hide In/Out pills beside port dots. Default true. */
  showPortLabels?: boolean;
  /** From `DataFlowEngine.getLastComputeMs` — used when `dataFlowEdgeOverlay` is `ports+compute`. */
  getLastComputeMs?: (nodeId: string) => number | undefined;
  /** From `DataFlowEngine.getPortValue` — shows (!) on port edges when the target's `error`/`err` output is non-empty. */
  getDataFlowPortValue?: (nodeId: string, portId: string) => PortValue;
  /** Node types that act as containers (frame-like). Used for edge snapping priority. */
  containerTypes?: ReadonlySet<string>;
  /** Alignment guide lines shown during drag. */
  alignGuides?: Array<{
    axis: 'x' | 'y';
    position: number;
    start: number;
    end: number;
  }>;
  /** When set, suppress connection/port affordances for this node (image crop UI must receive pointers). */
  suppressNodeOverlayId?: string | null;
}


const SelectionBox = memo(function SelectionBox({
  node,
  zoom,
  showHandles = true,
  showResizeHandles = true,
  showRotateHandle = true,
  cornerRadius = 0,
  measuredHeights,
  onHandlePointerDown,
  onRotateStart,
}: {
  node: SpatialNode;
  zoom: number;
  showHandles?: boolean;
  /** When false, keep the selection outline but hide resize squares. */
  showResizeHandles?: boolean;
  /** When false, hide the top rotate diamond. */
  showRotateHandle?: boolean;
  /** Matches the node's visual corner radius (canvas units). */
  cornerRadius?: number;
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
  const rx = Math.max(0, Math.min(cornerRadius, node.w / 2, h / 2));

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
        rx={rx}
        ry={rx}
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
      {showHandles && showResizeHandles && !isLocked && handles.map(({ pos, cx: hx, cy: hy }) => (
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
      {showHandles && showRotateHandle && !isLocked && (
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
  dataFlowEdgeOverlay?: DataFlowEdgeOverlay;
  getLastComputeMs?: (nodeId: string) => number | undefined;
  getDataFlowPortValue?: (nodeId: string, portId: string) => PortValue;
  /** Cursor over the wide hit stroke; select uses move (matches nodes), other tools inherit container. */
  interactionMode?: Mode;
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
  dataFlowEdgeOverlay = "off",
  getLastComputeMs,
  getDataFlowPortValue,
  interactionMode,
}: EdgeRendererProps) {
  const edgeType = edge.data.edgeType || "bezier";

  // Compute port positions for port-connected edges
  let sourcePortPos: { x: number; y: number } | undefined;
  let targetPortPos: { x: number; y: number } | undefined;
  if (registry && edge.data.sourcePort) {
    const srcDef = registry.get(fromNode.type);
    const srcPorts = resolveNodePorts(srcDef, fromNode);
    if (srcPorts) {
      sourcePortPos = getPortPosition(fromNode, srcPorts, edge.data.sourcePort, viewport.zoom, measuredHeights, srcDef!.portAnchor ?? "bbox") ?? undefined;
    }
  }
  if (registry && edge.data.targetPort) {
    const tgtDef = registry.get(toNode.type);
    const tgtPorts = resolveNodePorts(tgtDef, toNode);
    if (tgtPorts) {
      targetPortPos = getPortPosition(toNode, tgtPorts, edge.data.targetPort, viewport.zoom, measuredHeights, tgtDef!.portAnchor ?? "bbox") ?? undefined;
    }
  }

  const sw = edge.data.strokeWidth;
  const defaultMarkerSize = Math.max(8, sw * 3);
  const headSize = edge.data.arrowHeadSize ?? defaultMarkerSize;
  const tailSize = edge.data.arrowTailSize ?? defaultMarkerSize;
  const hasHead = !!edge.data.arrowHead && edge.data.arrowHead !== "none";
  const hasTail = !!edge.data.arrowTail && edge.data.arrowTail !== "none";

  // Port-connected heads: tip should kiss the near rim of the port dot (not
  // bury into its center). Pull the path end back by portRadius + headSize so
  // the path stops at the arrow base and the tip lands on the rim.
  let pathTargetPos = targetPortPos;
  let pathSourcePos = sourcePortPos;
  if (targetPortPos && hasHead) {
    const probe = computeEdgePath(
      fromNode, toNode, edgeType, measuredHeights,
      edge.data.sourceHandle, edge.data.targetHandle,
      edge.data.midpointOffset, edge.data.curveOffset,
      sourcePortPos, targetPortPos,
      edge.data.sourceT, edge.data.targetT,
      edge.data.attachmentGap,
    );
    const ux = Math.cos(probe.arrowAngle);
    const uy = Math.sin(probe.arrowAngle);
    const portR = PORT_DOT_RADIUS_PX / viewport.zoom;
    const pull = portR + headSize;
    pathTargetPos = {
      x: targetPortPos.x - ux * pull,
      y: targetPortPos.y - uy * pull,
    };
  }
  if (sourcePortPos && hasTail) {
    const probe = computeEdgePath(
      fromNode, toNode, edgeType, measuredHeights,
      edge.data.sourceHandle, edge.data.targetHandle,
      edge.data.midpointOffset, edge.data.curveOffset,
      sourcePortPos, pathTargetPos ?? targetPortPos,
      edge.data.sourceT, edge.data.targetT,
      edge.data.attachmentGap,
    );
    const ux = Math.cos(probe.tailAngle);
    const uy = Math.sin(probe.tailAngle);
    const portR = PORT_DOT_RADIUS_PX / viewport.zoom;
    const pull = portR + tailSize;
    // tailAngle points back along the path (toward/past source); pull along that
    // direction from the port center to place the tail base outside the dot.
    pathSourcePos = {
      x: sourcePortPos.x - ux * pull,
      y: sourcePortPos.y - uy * pull,
    };
  }

  const pathResult = computeEdgePath(
    fromNode, toNode, edgeType, measuredHeights,
    edge.data.sourceHandle, edge.data.targetHandle,
    edge.data.midpointOffset, edge.data.curveOffset,
    pathSourcePos, pathTargetPos,
    edge.data.sourceT, edge.data.targetT,
    edge.data.attachmentGap,
  );
  const { path, x1, y1, x2, y2, labelX, labelY, arrowAngle, tailAngle, kinkHandle } = pathResult;

  // Arrow tip sits one headSize along the tangent from the (shortened) path end,
  // which is the near rim of the port when pathTargetPos was adjusted above.
  // Non-port edges keep the legacy "centered on endpoint" placement.
  const headCenteredOnTip = !!(targetPortPos && hasHead);
  const headCx = headCenteredOnTip ? x2 + Math.cos(arrowAngle) * (headSize / 2) : x2;
  const headCy = headCenteredOnTip ? y2 + Math.sin(arrowAngle) * (headSize / 2) : y2;
  const tailCenteredOnTip = !!(sourcePortPos && hasTail);
  const tailCx = tailCenteredOnTip ? x1 + Math.cos(tailAngle) * (tailSize / 2) : x1;
  const tailCy = tailCenteredOnTip ? y1 + Math.sin(tailAngle) * (tailSize / 2) : y1;

  const isSelected = selection.has(edge.id);
  const isReconnecting = edgeReconnect?.edgeId === edge.id;
  // Port-wired edges (workflow) don't expose freeform kink / endpoint reconnect
  // chrome. Also hide whenever more than one thing is selected — marquee
  // multiselect was littering the board with midpoint anchors.
  const showEdgeEditHandles =
    isSelected &&
    !isReconnecting &&
    selection.size === 1 &&
    !edge.data.sourcePort &&
    !edge.data.targetPort;
  const dashArray =
    edge.data.style === "dashed"
      ? `${8 * sw},${4 * sw}`
      : edge.data.style === "dotted"
        ? `${2 * sw},${3 * sw}`
        : undefined;
  const isAnimated = edge.data.animated;

  const isEraserMarked = eraserMarkedIds?.has(edge.id);

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
      roughHeadPaths = getRoughPathPaths(arrowHeadPath(headCx, headCy, arrowAngle, headSize), { ...roughOpts, strokeLineDash: undefined });
    }
    if (edge.data.arrowTail === "arrow") {
      roughTailPaths = getRoughPathPaths(arrowHeadPath(tailCx, tailCy, tailAngle, tailSize), { ...roughOpts, strokeLineDash: undefined });
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
      edge.data.animatedDirection === "bop" ? "edge-flow-bop" :
      "edge-flow";
    const dur =
      edge.data.animatedDirection === "both" ? "2s" :
      edge.data.animatedDirection === "bop" ? "3.4s" :
      "1s";
    const timing = edge.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${name} ${dur} ${timing} infinite` };
  }, [isAnimated, edge.data.animatedDirection]);

  const cycleAndFlowStyle = useMemo(
    () => ({
      animation:
        edge.data.animatedDirection === "bop"
          ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite"
          : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite",
    }),
    [edge.data.animatedDirection]
  );

  const eraserStyle = useMemo(
    () => isEraserMarked ? { filter: "saturate(0)" } as const : undefined,
    [isEraserMarked]
  );

  const edgeLabelLines = useMemo(() => {
    const overlay = dataFlowEdgeOverlay ?? "off";
    const user = edge.data.label?.trim();
    const lines: { text: string; primary: boolean }[] = [];
    if (user) lines.push({ text: user, primary: true });
    if (
      overlay !== "off" &&
      nodeShowsEdgeComputeOverlay(toNode) &&
      edge.data.sourcePort &&
      edge.data.targetPort
    ) {
      lines.push({
        text: `${edge.data.sourcePort} \u2192 ${edge.data.targetPort}`,
        primary: !user,
      });
    }
    if (
      overlay === "ports+compute" &&
      nodeShowsEdgeComputeOverlay(toNode) &&
      getLastComputeMs &&
      edge.data.toId
    ) {
      const ms = getLastComputeMs(edge.data.toId);
      if (ms != null && Number.isFinite(ms)) {
        lines.push({ text: `compute ${formatComputeMs(ms)}`, primary: false });
      }
    }
    return lines;
  }, [
    dataFlowEdgeOverlay,
    edge.data.label,
    edge.data.sourcePort,
    edge.data.targetPort,
    edge.data.toId,
    getLastComputeMs,
    toNode,
  ]);

  const downstreamErrorMsg = useMemo(
    () =>
      edge.data.sourcePort && edge.data.targetPort
        ? getDownstreamPortErrorMessage(registry, toNode, getDataFlowPortValue)
        : null,
    [
      registry,
      toNode,
      edge.data.sourcePort,
      edge.data.targetPort,
      getDataFlowPortValue,
    ],
  );

  return (
    <g opacity={isReconnecting ? 0.15 : (isEraserMarked ? 0.25 : undefined)} style={eraserStyle}>
      {/* Invisible wide hit area for easier clicking */}
      <path
        d={path}
        stroke="transparent"
        strokeWidth={Math.max(sw + 16 / viewport.zoom, 20 / viewport.zoom)}
        strokeLinecap="round"
        fill="none"
        style={{
          pointerEvents: "stroke",
          cursor:
            interactionMode === "select" || interactionMode == null
              ? "move"
              : "inherit",
        }}
      />
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
            d={arrowHeadPath(headCx, headCy, arrowAngle, headSize)}
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
          d={filledArrowHeadPath(headCx, headCy, arrowAngle, headSize)}
          fill={edgeColor}
          stroke="none"
        />
      )}
      {edge.data.arrowHead === "dot" && (
        <circle
          cx={headCx} cy={headCy}
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
            d={arrowHeadPath(tailCx, tailCy, tailAngle, tailSize)}
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
          d={filledArrowHeadPath(tailCx, tailCy, tailAngle, tailSize)}
          fill={edgeColor}
          stroke="none"
        />
      )}
      {edge.data.arrowTail === "dot" && (
        <circle
          cx={tailCx} cy={tailCy}
          r={tailSize * 0.25}
          fill={edgeColor}
        />
      )}
      {(() => {
        const z = viewport.zoom;
        const lh = 13 / z;
        const padY = 5 / z;
        const fsMain = 11 / z;
        const fsSub = 10 / z;
        const box = measureEdgeLabelBox(edgeLabelLines, labelX, labelY, z);
        const badgeR = 9 / z;
        const showBadge = Boolean(downstreamErrorMsg);
        const badgeX = box ? box.x0 + box.w + badgeR + 4 / z : labelX + badgeR + 4 / z;
        const badgeY = labelY;
        return (
          <>
            {box && (
              <>
                <rect
                  x={box.x0}
                  y={box.y0}
                  width={box.w}
                  height={box.h}
                  fill="white"
                  rx={4 / z}
                  opacity={0.92}
                />
                {edgeLabelLines.map((line, i) => (
                  <text
                    key={i}
                    x={labelX}
                    y={box.y0 + padY + (i + 0.78) * lh}
                    fill={line.primary ? edgeColor : "#64748b"}
                    fontSize={line.primary ? fsMain : fsSub}
                    textAnchor="middle"
                    style={{ pointerEvents: "none" }}
                  >
                    {line.text}
                  </text>
                ))}
              </>
            )}
            {showBadge && (
              <g style={{ pointerEvents: "auto" }}>
                <title>{downstreamErrorMsg}</title>
                <circle
                  cx={badgeX}
                  cy={badgeY}
                  r={badgeR}
                  fill="#ea580c"
                  stroke="#fff"
                  strokeWidth={1.25 / z}
                />
                <text
                  x={badgeX}
                  y={badgeY + 3.5 / z}
                  fill="#fff"
                  fontSize={11 / z}
                  fontWeight={800}
                  textAnchor="middle"
                  style={{ pointerEvents: "none" }}
                >
                  !
                </text>
              </g>
            )}
          </>
        );
      })()}
      {/* Edge endpoint handles — draggable to reconnect (sole freeform selection only) */}
      {showEdgeEditHandles && (
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
      {showEdgeEditHandles && kinkHandle && (
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
  freeFormEdges,
  hoveredNodeId,
  cursorCanvasPos,
  registry,
  onPortHandleDown,
  cycleNodeIds,
  dataFlowEdgeOverlay = "off",
  showPortLabels = true,
  getLastComputeMs,
  getDataFlowPortValue,
  containerTypes,
  alignGuides,
  suppressNodeOverlayId,
}: SVGLayerProps) {
  const theme = useSBTheme();
  const [hoveredPortKey, setHoveredPortKey] = useState<string | null>(null);
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
              dataFlowEdgeOverlay={dataFlowEdgeOverlay}
              getLastComputeMs={getLastComputeMs}
              getDataFlowPortValue={getDataFlowPortValue}
              interactionMode={mode}
            />
          );
        })}

        {/* Edge mode: hover dot showing where edge would start */}
        {mode === "edge" && !edgePreview && hoveredNodeId && cursorCanvasPos && (() => {
          const hNode = nodeMap.get(hoveredNodeId);
          if (!hNode || hNode.type === "edge") return null;
          const pp = nearestPerimeterPoint(hNode, cursorCanvasPos.x, cursorCanvasPos.y, measuredHeights);
          const r = 4 / viewport.zoom;
          return (
            <circle cx={pp.x} cy={pp.y} r={r} fill="#3b82f6" stroke="white" strokeWidth={1.5 / viewport.zoom} />
          );
        })()}

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
          // For free-form mode: the perimeter snap point on the nearest target
          let nearestTargetPerimeterPt: { x: number; y: number } | null = null;
          // Nodes whose cursor is within 20% expanded bounding box
          const nearbyNodeIds = new Set<string>();
          if (isDragging) {
            let bestDist = Infinity;
            let bestIsFrame = false;
            const snapThreshold = 50 / viewport.zoom;
            for (const n of nodes) {
              if (n.type === "edge" || n.id === dragSourceId) continue;
              // Skip nodes with ports — those use port handles instead
              if (nodeTypeHasPorts(registry?.get(n.type))) continue;
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
            // In free-form mode, compute perimeter snap point on nearest target
            if (freeFormEdges && nearestTargetNodeId) {
              const targetNode = nodeMap.get(nearestTargetNodeId);
              if (targetNode) {
                const pp = nearestPerimeterPoint(targetNode, cursorX, cursorY, measuredHeights);
                nearestTargetPerimeterPt = { x: pp.x, y: pp.y };
              }
            }
          }

          const elements: React.ReactNode[] = [];

          // In free-form mode during drag, show a single snap dot on the nearest target
          if (freeFormEdges && isDragging && nearestTargetPerimeterPt) {
            elements.push(
              <circle
                key="freeform-snap-dot"
                cx={nearestTargetPerimeterPt.x}
                cy={nearestTargetPerimeterPt.y}
                r={5 / viewport.zoom}
                fill="#3b82f6"
                stroke="white"
                strokeWidth={1.5 / viewport.zoom}
              />
            );
          }

          // Render handles (fixed mode: 4 circles; free-form selected: single perimeter dot)
          nodes
            .filter((n) => {
              if (n.type === "edge") return false;
              if (suppressNodeOverlayId && n.id === suppressNodeOverlayId) return false;
              if (nodeTypeHasPorts(registry?.get(n.type))) return false;
              // Free-form edges use perimeter hit-testing; DOM images have no SVG frame — skip fixed anchors.
              if (freeFormEdges && n.type === "image") return false;
              return (selection.size <= 1 && selection.has(n.id)) || (!freeFormEdges && isDragging && (n.id === dragSourceId || nearbyNodeIds.has(n.id)));
            })
            .forEach((node) => {
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

              if (freeFormEdges) {
                // Free-form mode: show 4 small handle dots ON the border (no offset)
                // These serve as click targets for starting edge connections
                if (isInteractive) {
                  elements.push(
                    <g key={`conn-${node.id}`} transform={rotation ? `rotate(${rotation}, ${ncx}, ${ncy})` : undefined}>
                      {handles.map(({ side }) => {
                        const midpoints: Record<HandleSide, [number, number]> = {
                          top:    [node.x + node.w / 2, node.y],
                          bottom: [node.x + node.w / 2, node.y + nh],
                          left:   [node.x, node.y + nh / 2],
                          right:  [node.x + node.w, node.y + nh / 2],
                        };
                        const [mx, my] = midpoints[side];
                        return (
                          <circle
                            key={`ch-${node.id}-${side}`}
                            cx={mx}
                            cy={my}
                            r={handleR}
                            fill="white"
                            stroke="#3b82f6"
                            strokeWidth={1.5 / viewport.zoom}
                            opacity={0.8}
                            style={{ cursor: "crosshair", pointerEvents: "auto" }}
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              onConnectionHandleDown?.(node.id, side, e);
                            }}
                          />
                        );
                      })}
                    </g>
                  );
                }
              } else {
                // Fixed mode: original handle circles offset from the border
                elements.push(
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
              }
            });

          return elements;
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
            const highlightR = PORT_DOT_HIGHLIGHT_RADIUS_PX / viewport.zoom;
            let bestDist = Infinity;
            for (const n of nodes) {
              if (n.type === "edge" || n.id === dragSourceNodeId) continue;
              const def = registry.get(n.type);
              const nPorts = resolveNodePorts(def, n);
              if (!nPorts?.length) continue;
              const portsOfDir = nPorts.filter((p) => p.direction === expectedDir);
              for (const port of portsOfDir) {
                const pos = getPortPosition(
                  n,
                  nPorts,
                  port.id,
                  viewport.zoom,
                  measuredHeights,
                  def!.portAnchor ?? "bbox",
                );
                if (!pos) continue;
                const dist = Math.hypot(pos.x - cursorX, pos.y - cursorY);
                if (dist <= highlightR && dist < bestDist) {
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
              if (suppressNodeOverlayId && n.id === suppressNodeOverlayId) return false;
              const def = registry.get(n.type);
              // Always show ports on nodes that have port definitions
              return nodeTypeHasPorts(def);
            })
            .map((node) => {
              const def = registry.get(node.type)!;
              const ports = resolveNodePorts(def, node)!;
              const nh = node.h === "auto" ? (measuredHeights?.[node.id] ?? 100) : node.h;
              const rotation = node.rotation || 0;
              const ncx = node.x + node.w / 2;
              const ncy = node.y + nh / 2;
              const portR = PORT_DOT_RADIUS_PX / viewport.zoom;
              const portAnchor: PortAnchorMode = def.portAnchor ?? "bbox";

              const inputPorts = ports.filter((p) => p.direction === "input");
              const outputPorts = ports.filter((p) => p.direction === "output");
              // Ports are always interactive (no need to select the node first)
              const isInteractive = !isDragging;

              const renderPort = (port: typeof ports[number], _i: number, _portsOfDir: typeof ports, direction: "input" | "output") => {
                const outer = getPortOuterLocal(
                  node,
                  ports,
                  port.id,
                  viewport.zoom,
                  measuredHeights,
                  portAnchor,
                );
                if (!outer) return null;
                const { px, py } = outer;
                const inner = getPortStubInnerLocal(
                  node,
                  direction,
                  { x: px, y: py },
                  measuredHeights,
                  portAnchor,
                );
                const color = PORT_COLORS[port.dataType] || PORT_COLORS.any;
                const portKey = `${node.id}:${port.id}`;
                const isHovered = !isDragging && isInteractive && hoveredPortKey === portKey;
                const isNearest = nearestPortNodeId === node.id && nearestPortId === port.id;
                const highlightR = isNearest ? 8 / viewport.zoom : isHovered ? portR * 1.35 : portR;
                const labelGap = 2.5 / viewport.zoom;
                const labelX = direction === "input" ? px - portR - labelGap : px + portR + labelGap;
                const plusColor = theme.accentColor || "#14b8a6";
                // Plus glyph sized to the hover disc (screen-ish thickness).
                const plusArm = highlightR * 0.55;
                const plusThick = Math.max(1.25 / viewport.zoom, highlightR * 0.22);

                return (
                  <g
                    key={`port-${node.id}-${port.id}`}
                    onPointerEnter={isInteractive ? () => setHoveredPortKey(portKey) : undefined}
                    onPointerLeave={isInteractive ? () => setHoveredPortKey((k) => (k === portKey ? null : k)) : undefined}
                  >
                    {/* Connection line from port dot to node body */}
                    <line
                      x1={px} y1={py}
                      x2={inner.x} y2={inner.y}
                      stroke={isHovered ? plusColor : color}
                      strokeWidth={(isHovered ? 2.5 : 1.5) / viewport.zoom}
                      opacity={isHovered ? 0.9 : 0.4}
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
                    {/* Larger invisible hit target for easier hover / drag */}
                    <circle
                      cx={px}
                      cy={py}
                      r={Math.max(highlightR, 10 / viewport.zoom)}
                      fill="transparent"
                      style={{
                        cursor: isInteractive ? "crosshair" : "default",
                        pointerEvents: isInteractive ? "auto" : "none",
                      }}
                      onPointerDown={isInteractive ? (e) => {
                        e.stopPropagation();
                        setHoveredPortKey(null);
                        onPortHandleDown?.(node.id, port.id, direction, e);
                      } : undefined}
                    />
                    <circle
                      cx={px}
                      cy={py}
                      r={highlightR}
                      fill={isNearest ? "white" : isHovered ? plusColor : color}
                      stroke={isNearest ? color : isHovered ? plusColor : "#1a1a2e"}
                      strokeWidth={2 / viewport.zoom}
                      style={{ pointerEvents: "none", transition: "r 0.1s, fill 0.1s" }}
                    />
                    {/* gptbots-style + affordance: drag onto empty canvas to add a node */}
                    {isHovered && !isNearest && (
                      <g style={{ pointerEvents: "none" }}>
                        <rect
                          x={px - plusArm}
                          y={py - plusThick / 2}
                          width={plusArm * 2}
                          height={plusThick}
                          rx={plusThick / 2}
                          fill="#fff"
                        />
                        <rect
                          x={px - plusThick / 2}
                          y={py - plusArm}
                          width={plusThick}
                          height={plusArm * 2}
                          rx={plusThick / 2}
                          fill="#fff"
                        />
                      </g>
                    )}
                    {/* Port label pill */}
                    {showPortLabels && (() => {
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
                      const pillFill = isNearest ? color : isHovered ? plusColor : "#1a1a2e";
                      const pillStroke = isNearest ? color : isHovered ? plusColor : "#2a2a40";
                      const textFill = isNearest || isHovered ? "#fff" : "#94a3b8";
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
                            fillOpacity={isNearest || isHovered ? 0.9 : 0.85}
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
          const curX = edgePreview.cursorX;
          const curY = edgePreview.cursorY;
          const color = edgePreview.edgeColor || "#6b7280";
          const sw = edgePreview.edgeStrokeWidth || 1.5;
          const style = edgePreview.edgeStyle || "solid";
          const dashArr = style === "dashed" ? `${8 * sw},${4 * sw}`
            : style === "dotted" ? `${2 * sw},${3 * sw}` : undefined;
          const headSize = Math.max(8, sw * 3);
          const dotR = 4 / viewport.zoom;
          const held = !!edgePreview.held;
          const ghost = edgePreview.ghost;
          const edgeType = edgePreview.edgeType || "bezier";

          const fromDef = registry?.get(edgePreview.fromNode.type);
          const fromPorts = resolveNodePorts(fromDef, edgePreview.fromNode);
          const sourcePortPos =
            edgePreview.sourcePort && fromPorts
              ? getPortPosition(
                edgePreview.fromNode,
                fromPorts,
                edgePreview.sourcePort,
                viewport.zoom,
                measuredHeights,
                fromDef!.portAnchor ?? "bbox",
              ) ?? undefined
              : undefined;
          const sourcePortMeta =
            edgePreview.sourcePort && fromPorts
              ? fromPorts.find((p) => p.id === edgePreview.sourcePort)
              : undefined;

          const portSnapExpectedDir: "input" | "output" | null =
            edgePreview.sourceDirection === "output" ? "input" :
            edgePreview.sourceDirection === "input" ? "output" : null;

          let snapTargetNode: SpatialNode | null = null;
          let snapTargetT: number | undefined;
          let snapTargetPortId: string | null = null;

          // While the add-node menu holds the preview, lock onto the ghost — no port snap.
          if (!held && registry && edgePreview.sourcePort && portSnapExpectedDir && sourcePortMeta) {
            const snapR = PORT_EDGE_SNAP_RADIUS_PX / viewport.zoom;
            let bestDist = Infinity;
            for (const n of nodes) {
              if (n.type === "edge" || n.id === edgePreview.fromNode.id) continue;
              const nDef = registry.get(n.type);
              const nPorts = resolveNodePorts(nDef, n);
              if (!nPorts?.length) continue;
              const portsOfDir = nPorts.filter((p) => p.direction === portSnapExpectedDir);
              for (const port of portsOfDir) {
                if (
                  sourcePortMeta.dataType !== "any" &&
                  port.dataType !== "any" &&
                  sourcePortMeta.dataType !== port.dataType
                ) {
                  continue;
                }
                const pos = getPortPosition(
                  n,
                  nPorts,
                  port.id,
                  viewport.zoom,
                  measuredHeights,
                  nDef!.portAnchor ?? "bbox",
                );
                if (!pos) continue;
                const dist = Math.hypot(pos.x - curX, pos.y - curY);
                if (dist < snapR && dist < bestDist) {
                  bestDist = dist;
                  snapTargetNode = n;
                  snapTargetPortId = port.id;
                }
              }
            }
          }

          if (!held && !snapTargetPortId) {
            const snapThreshold = 50 / viewport.zoom;
            for (const n of nodes) {
              if (n.type === "edge" || n.id === edgePreview.fromNode.id) continue;
              const nh = n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : n.h;
              const padX = n.w * 0.2;
              const padY = nh * 0.2;
              if (curX >= n.x - padX && curX <= n.x + n.w + padX &&
                  curY >= n.y - padY && curY <= n.y + nh + padY) {
                const pp = nearestPerimeterPoint(n, curX, curY, measuredHeights);
                if (Math.hypot(pp.x - curX, pp.y - curY) < snapThreshold) {
                  snapTargetNode = n;
                  snapTargetT = pp.t;
                  break;
                }
              }
            }
          }

          const snapDef = snapTargetNode ? registry?.get(snapTargetNode.type) : undefined;
          const snapPorts = resolveNodePorts(snapDef, snapTargetNode ?? undefined);
          let targetPortPos =
            snapTargetNode && snapTargetPortId && snapPorts
              ? getPortPosition(
                snapTargetNode,
                snapPorts,
                snapTargetPortId,
                viewport.zoom,
                measuredHeights,
                snapDef!.portAnchor ?? "bbox",
              ) ?? undefined
              : undefined;

          const previewSourceT = sourcePortPos ? undefined : edgePreview.sourceT;
          const previewTargetT = targetPortPos ? undefined : snapTargetT;

          // Phantom / skeleton target so free-drag + held previews get the same
          // left/right port tangents as real edges (not a 0×0 point at the cursor).
          let targetNode: SpatialNode | null = snapTargetNode;
          let ghostEl: React.ReactNode = null;
          const attachIn =
            ghost?.attach === "in" ||
            (!ghost && edgePreview.sourceDirection === "output");
          const phantomW = ghost?.w ?? 200;
          const phantomH = ghost?.h ?? 100;

          if (!targetNode && (held || edgePreview.sourcePort)) {
            const gx = attachIn ? curX : curX - phantomW;
            const gy = curY - phantomH / 2;
            targetNode = {
              id: "__preview__",
              type: "shape" as any,
              x: gx,
              y: gy,
              w: phantomW,
              h: phantomH,
              z: 0,
              data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 },
            };
            targetPortPos = {
              x: attachIn ? gx : gx + phantomW,
              y: curY,
            };

            if (held && ghost) {
              const z = viewport.zoom;
              const pad = 14;
              const barH = 8;
              const barGap = 10;
              const portR = PORT_DOT_RADIUS_PX / z;
              ghostEl = (
                <g style={{ pointerEvents: "none" }}>
                  <rect
                    x={gx}
                    y={gy}
                    width={phantomW}
                    height={phantomH}
                    rx={12}
                    ry={12}
                    fill="var(--sb-card, #f4f4f5)"
                    fillOpacity={0.92}
                    stroke="var(--sb-muted-foreground, #94a3b8)"
                    strokeWidth={1.5 / z}
                    strokeDasharray={`${5 / z} ${4 / z}`}
                  />
                  <rect x={gx + pad} y={gy + pad + 4} width={phantomW * 0.45} height={barH} rx={3} fill="var(--sb-muted-foreground, #94a3b8)" opacity={0.28} />
                  <rect x={gx + pad} y={gy + pad + 4 + barH + barGap} width={phantomW * 0.72} height={barH} rx={3} fill="var(--sb-muted-foreground, #94a3b8)" opacity={0.2} />
                  <rect x={gx + pad} y={gy + pad + 4 + (barH + barGap) * 2} width={phantomW * 0.55} height={barH} rx={3} fill="var(--sb-muted-foreground, #94a3b8)" opacity={0.16} />
                  <circle
                    cx={targetPortPos.x}
                    cy={targetPortPos.y}
                    r={portR}
                    fill={color}
                    stroke="var(--sb-card, #fff)"
                    strokeWidth={2 / z}
                  />
                </g>
              );
            }
          }

          if (!targetNode) {
            targetNode = {
              id: "__preview__",
              type: "shape" as any,
              x: curX,
              y: curY,
              w: 0,
              h: 0,
              z: 0,
              data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 },
            };
          }

          // Match real port edges: pull tip back so a filled arrow kisses the port rim.
          let pathTargetPos = targetPortPos;
          if (targetPortPos) {
            const probe = computeEdgePath(
              edgePreview.fromNode,
              targetNode,
              edgeType,
              measuredHeights,
              edgePreview.sourceHandle,
              undefined,
              undefined,
              undefined,
              sourcePortPos,
              targetPortPos,
              previewSourceT,
              previewTargetT,
              edgePreview.attachmentGap,
            );
            const ux = Math.cos(probe.arrowAngle);
            const uy = Math.sin(probe.arrowAngle);
            const portR = PORT_DOT_RADIUS_PX / viewport.zoom;
            const pull = portR + headSize;
            pathTargetPos = {
              x: targetPortPos.x - ux * pull,
              y: targetPortPos.y - uy * pull,
            };
          }

          const previewPath = computeEdgePath(
            edgePreview.fromNode,
            targetNode,
            edgeType,
            measuredHeights,
            edgePreview.sourceHandle,
            undefined,
            undefined,
            undefined,
            sourcePortPos,
            pathTargetPos,
            previewSourceT,
            previewTargetT,
            edgePreview.attachmentGap,
          );

          const showSourceDot = !sourcePortPos;
          const showTargetDot = Boolean(snapTargetNode && !targetPortPos);
          const headCenteredOnTip = !!targetPortPos;
          const headCx = headCenteredOnTip
            ? previewPath.x2 + Math.cos(previewPath.arrowAngle) * (headSize / 2)
            : previewPath.x2;
          const headCy = headCenteredOnTip
            ? previewPath.y2 + Math.sin(previewPath.arrowAngle) * (headSize / 2)
            : previewPath.y2;

          return (
            <g>
              {ghostEl}
              <path
                d={previewPath.path}
                stroke={color}
                strokeWidth={sw}
                strokeDasharray={dashArr}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={filledArrowHeadPath(headCx, headCy, previewPath.arrowAngle, headSize)}
                fill={color}
                stroke="none"
              />
              {showSourceDot && (
                <circle cx={previewPath.x1} cy={previewPath.y1} r={dotR}
                  fill={color} stroke="white" strokeWidth={1.5 / viewport.zoom} />
              )}
              {showTargetDot && (
                <circle cx={previewPath.x2} cy={previewPath.y2} r={dotR}
                  fill={color} stroke="white" strokeWidth={1.5 / viewport.zoom} />
              )}
            </g>
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
        {selection.size === 1 && mode !== "edge" && !edgePreview && !edgeReconnect && svgNodes
          .filter((n) => selection.has(n.id))
          .map((node) => {
            const def = registry?.get(node.type);
            // Node-owned selection chrome lives in the DOM wrapper (z-order safe).
            if (def?.selectionInNode) return null;
            return (
              <SelectionBox
                key={`sel-${node.id}`}
                node={node}
                zoom={viewport.zoom}
                showHandles={selection.size === 1}
                showResizeHandles={def?.resizable !== false}
                showRotateHandle={def?.rotatable !== false}
                cornerRadius={def?.selectionRadius ?? 0}
                measuredHeights={measuredHeights}
                onHandlePointerDown={onResizeHandleDown}
                onRotateStart={onRotateStart}
              />
            );
          })}

        {/* Active stroke being drawn */}
        {activeStroke && activeStroke.points.length > 1 && (() => {
          const isDashed = activeStroke.strokeStyle === "dashed" || activeStroke.strokeStyle === "dotted";
          const strokeOpacity = activeStroke.opacity ?? 1;
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
                opacity={strokeOpacity}
              />
            );
          }
          return (
            <path
              d={getStrokePath(activeStroke.points, {
                size: activeStroke.width,
              })}
              fill={activeStroke.color}
              opacity={strokeOpacity}
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
          const opacity = st.opacity ?? 1;
          const dashArray = strokeStyleToDash(st.strokeStyle);
          const isRounded = st.edgeStyle === "round";

          // For line/arrow, use start/end directly (not min/max)
          const sx = shapePreview.startX;
          const sy = shapePreview.startY;
          const ex = shapePreview.endX;
          const ey = shapePreview.endY;

          // Build rough paths if roughness > 0
          const roughOpts = {
            stroke: st.stroke,
            fill: st.fill,
            fillStyle: st.fillStyle,
            roughness: st.roughness,
            strokeWidth: st.strokeWidth,
            strokeLineDash: dashArray,
            seed: "__preview__",
          };

          let paths: RoughPathData[] | null = null;
          if (st.roughness > 0) {
            switch (type) {
              case "rect":
                paths = getRoughRectPaths(0, 0, w, h, roughOpts, isRounded);
                break;
              case "ellipse":
                paths = getRoughEllipsePaths(w / 2, h / 2, w, h, roughOpts);
                break;
              case "diamond":
                paths = getRoughDiamondPaths(0, 0, w, h, roughOpts, isRounded);
                break;
              case "line":
                paths = getRoughLinePaths(0, ey - sy > 0 ? 0 : h, w, ey - sy > 0 ? h : 0, roughOpts);
                break;
              case "arrow":
                paths = getRoughArrowPaths(0, ey - sy > 0 ? 0 : h, w, ey - sy > 0 ? h : 0, roughOpts);
                break;
            }
          }

          // Rough shapes (roughness > 0)
          if (paths) {
            const tx = (type === "line" || type === "arrow") ? Math.min(sx, ex) : x;
            const ty = (type === "line" || type === "arrow") ? Math.min(sy, ey) : y;
            return (
              <g transform={`translate(${tx}, ${ty})`} opacity={opacity}>
                {paths.map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    stroke={p.stroke}
                    strokeWidth={p.strokeWidth}
                    fill={p.fill}
                    strokeDasharray={p.strokeDasharray}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </g>
            );
          }

          // Clean shapes (roughness === 0)
          const dash = dashArray?.join(",");
          const fill = st.fill || "none";

          if (type === "ellipse") {
            return (
              <ellipse
                cx={x + w / 2}
                cy={y + h / 2}
                rx={w / 2}
                ry={h / 2}
                stroke={st.stroke}
                strokeWidth={st.strokeWidth}
                fill={fill}
                strokeDasharray={dash}
                opacity={opacity}
              />
            );
          }
          if (type === "diamond") {
            return (
              <polygon
                points={`${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`}
                stroke={st.stroke}
                strokeWidth={st.strokeWidth}
                fill={fill}
                strokeDasharray={dash}
                opacity={opacity}
              />
            );
          }
          if (type === "line" || type === "arrow") {
            return (
              <g opacity={opacity}>
                <line
                  x1={sx}
                  y1={sy}
                  x2={ex}
                  y2={ey}
                  stroke={st.stroke}
                  strokeWidth={st.strokeWidth}
                  strokeDasharray={dash}
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
                    />
                  );
                })()}
              </g>
            );
          }
          // Default: rect
          const r = isRounded ? roundedRectRadius(w, h) : 0;
          return (
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={r || undefined}
              ry={r || undefined}
              stroke={st.stroke}
              strokeWidth={st.strokeWidth}
              fill={fill}
              strokeDasharray={dash}
              opacity={opacity}
            />
          );
        })()}

        {/* Eraser trail — smooth continuous stroke with fade */}
        {eraserTrail && eraserTrail.length > 1 && (() => {
          const now = Date.now();
          const LIFETIME = 400; // must match SpatialCanvas TRAIL_LIFETIME (wall-clock ms)
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
