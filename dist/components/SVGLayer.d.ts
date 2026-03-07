import type { SpatialNode, Viewport, HandleSide, Mode } from "../engine/types";
import type { NodeTypeRegistry } from "../nodes/registry";
export type HandlePosition = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";
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
    onResizeHandleDown?: (nodeId: string, handle: HandlePosition, e: React.PointerEvent<SVGRectElement>) => void;
    onRotateStart?: (nodeId: string, e: React.PointerEvent<SVGCircleElement>) => void;
    onConnectionHandleDown?: (nodeId: string, side: HandleSide, e: React.PointerEvent<SVGCircleElement>) => void;
    edgePreview?: {
        fromNode: SpatialNode;
        cursorX: number;
        cursorY: number;
        sourceHandle?: HandleSide;
        sourcePort?: string;
        sourceDirection?: "input" | "output";
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
    hoveredNodeId?: string | null;
    /** Node type registry — used to render port circles for nodes with ports. */
    registry?: NodeTypeRegistry;
    /** Called when a port handle is pressed (starts port-aware edge creation). */
    onPortHandleDown?: (nodeId: string, portId: string, direction: "input" | "output", e: React.PointerEvent<SVGCircleElement>) => void;
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
/**
 * SVGLayer — now only renders overlays:
 * - Selection boxes for draw/shape nodes (single selection)
 * - Active stroke being drawn (preview)
 * - Shape preview while dragging
 *
 * Node rendering has been moved to SVGNodeBlock in the unified DOM layer.
 */
export default function SVGLayer({ nodes, viewport, selection, measuredHeights, activeStroke, shapePreview, shapePreviewStyle, onResizeHandleDown, onRotateStart, onConnectionHandleDown, onEdgeEndpointDown, onKinkHandleDown, edgePreview, edgeReconnect, eraserMarkedIds, eraserTrail, laserTrail, mode, hoveredNodeId, registry, onPortHandleDown, cycleNodeIds, containerTypes, alignGuides, }: SVGLayerProps): import("react/jsx-runtime").JSX.Element;
export {};
