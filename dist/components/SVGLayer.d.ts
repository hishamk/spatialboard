import type { SpatialNode, EdgeType, Viewport, HandleSide, Mode } from "../engine/types";
import type { NodeTypeRegistry } from "../nodes/registry";
import type { PortValue } from "../engine/data-flow-types";
export type HandlePosition = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";
/** Optional captions on port edges: port names and/or downstream `compute` wall time. */
export type DataFlowEdgeOverlay = "off" | "ports" | "ports+compute";
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
    onResizeHandleDown?: (nodeId: string, handle: HandlePosition, e: React.PointerEvent<SVGRectElement>) => void;
    onRotateStart?: (nodeId: string, e: React.PointerEvent<SVGCircleElement>) => void;
    onConnectionHandleDown?: (nodeId: string, side: HandleSide, e: React.PointerEvent<SVGCircleElement>) => void;
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
        ghost?: {
            w: number;
            h: number;
            attach: "in" | "out";
        };
    } | null;
    onEdgeEndpointDown?: (edgeId: string, endpoint: "source" | "target", e: React.PointerEvent<SVGCircleElement>) => void;
    edgeReconnect?: {
        edgeId: string;
        endpoint: "source" | "target";
        anchorNodeId: string;
        anchorHandle?: HandleSide;
        cursorX: number;
        cursorY: number;
    } | null;
    onKinkHandleDown?: (edgeId: string, axis: "x" | "y" | "xy", min: number, max: number, e: React.PointerEvent<SVGCircleElement>) => void;
    eraserMarkedIds?: Set<string>;
    eraserTrail?: Array<[number, number, number]>;
    laserTrail?: Array<[number, number, number]>;
    mode?: Mode;
    freeFormEdges?: boolean;
    hoveredNodeId?: string | null;
    /** Canvas-space cursor position for edge mode hover dot */
    cursorCanvasPos?: {
        x: number;
        y: number;
    } | null;
    /** Node type registry — used to render port circles for nodes with ports. */
    registry?: NodeTypeRegistry;
    /** Called when a port handle is pressed (starts port-aware edge creation). */
    onPortHandleDown?: (nodeId: string, portId: string, direction: "input" | "output", e: React.PointerEvent<SVGCircleElement>) => void;
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
/**
 * SVGLayer — now only renders overlays:
 * - Selection boxes for draw/shape nodes (single selection)
 * - Active stroke being drawn (preview)
 * - Shape preview while dragging
 *
 * Node rendering has been moved to SVGNodeBlock in the unified DOM layer.
 */
export default function SVGLayer({ nodes, viewport, selection, measuredHeights, activeStroke, shapePreview, shapePreviewStyle, onResizeHandleDown, onRotateStart, onConnectionHandleDown, onEdgeEndpointDown, onKinkHandleDown, edgePreview, edgeReconnect, eraserMarkedIds, eraserTrail, laserTrail, mode, freeFormEdges, hoveredNodeId, cursorCanvasPos, registry, onPortHandleDown, cycleNodeIds, dataFlowEdgeOverlay, showPortLabels, getLastComputeMs, getDataFlowPortValue, containerTypes, alignGuides, suppressNodeOverlayId, }: SVGLayerProps): import("react/jsx-runtime").JSX.Element;
export {};
