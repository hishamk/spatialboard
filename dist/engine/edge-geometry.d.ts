import type { SpatialNode, EdgeNode, EdgeType, HandleSide } from "./types";
import type { PortDefinition } from "./data-flow-types";
/**
 * Compute the canvas-space position of a specific port on a node.
 *
 * Returns `null` if the port ID is not found in the port list.
 *
 * @param node       The spatial node
 * @param ports      Port definitions for this node type
 * @param portId     The port ID to locate
 * @param zoom       Current viewport zoom (needed because offset is screen-px based)
 * @param measuredH  Optional measured heights map
 */
export declare function getPortPosition(node: SpatialNode, ports: PortDefinition[], portId: string, zoom: number, measuredH?: Record<string, number>): {
    x: number;
    y: number;
} | null;
export interface KinkHandleInfo {
    /** Canvas position of the draggable kink handle */
    x: number;
    y: number;
    /** Axis the kink can be dragged along ("xy" = free 2D for bezier) */
    axis: "x" | "y" | "xy";
    /** Range bounds for clamping during drag (unused for "xy") */
    min: number;
    max: number;
}
export interface EdgePathResult {
    /** SVG path d attribute */
    path: string;
    /** Label position (midpoint of the curve) */
    labelX: number;
    labelY: number;
    /** Source endpoint */
    x1: number;
    y1: number;
    /** Target endpoint */
    x2: number;
    y2: number;
    /** Direction the edge arrives at the target (for arrowhead orientation) */
    arrowAngle: number;
    /** Direction the edge leaves the source (for arrow tail orientation) */
    tailAngle: number;
    /** Which side the edge exits the source node */
    sourceSide: HandleSide;
    /** Which side the edge enters the target node */
    targetSide: HandleSide;
    /** Draggable kink handle info (step/smoothstep only) */
    kinkHandle?: KinkHandleInfo;
    /** Bounding box of the edge */
    bounds: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}
/**
 * Compute the full edge path between two nodes.
 *
 * When `sourcePortPos` or `targetPortPos` are provided, the edge endpoints
 * are placed at those exact positions (used for port-connected edges) instead
 * of at the node border / handle midpoint.
 */
export declare function computeEdgePath(fromNode: SpatialNode, toNode: SpatialNode, edgeType?: EdgeType, measuredHeights?: Record<string, number>, sourceHandle?: HandleSide, targetHandle?: HandleSide, midpointOffset?: number, curveOffset?: [number, number], sourcePortPos?: {
    x: number;
    y: number;
}, targetPortPos?: {
    x: number;
    y: number;
}): EdgePathResult;
/**
 * Compute distance from a point to an edge's path (any edge type).
 */
export declare function pointToEdgeDistance(px: number, py: number, fromNode: SpatialNode, toNode: SpatialNode, edge: EdgeNode, measuredHeights?: Record<string, number>, sourcePortPos?: {
    x: number;
    y: number;
}, targetPortPos?: {
    x: number;
    y: number;
}): number;
/**
 * Compute the two endpoints of an edge line (border intersection on each node).
 */
export declare function computeEdgeEndpoints(fromNode: SpatialNode, toNode: SpatialNode, measuredHeights?: Record<string, number>): {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
/**
 * Compute single border-exit point (for edge creation preview: from node border toward cursor).
 */
export declare function computeSingleBorderPoint(node: SpatialNode, targetX: number, targetY: number, measuredHeights?: Record<string, number>): {
    x: number;
    y: number;
};
/**
 * Minimum distance from point (px,py) to line segment (x1,y1)–(x2,y2).
 */
export declare function pointToSegmentDistance(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number;
/**
 * Test whether a line segment intersects a rectangle.
 * Used for marquee-selecting edges.
 */
export declare function segmentIntersectsRect(x1: number, y1: number, x2: number, y2: number, rect: {
    x: number;
    y: number;
    w: number;
    h: number;
}): boolean;
/**
 * Generate SVG path data for an open chevron arrowhead centered on (cx,cy)
 * pointing in the direction given by angle (radians).
 */
export declare function arrowHeadPath(cx: number, cy: number, angle: number, size: number): string;
/**
 * Generate SVG path data for a filled (closed triangle) arrowhead centered on (cx,cy)
 * pointing in the direction given by angle (radians).
 */
export declare function filledArrowHeadPath(cx: number, cy: number, angle: number, size: number): string;
/**
 * Legacy arrowhead: compute angle from two points then delegate.
 */
export declare function arrowHeadPathFromPoints(tipX: number, tipY: number, fromX: number, fromY: number, size: number): string;
/**
 * Get handle positions for a node (midpoints of four sides).
 * Returns positions in canvas space (accounting for rotation).
 */
export declare function getNodeHandlePositions(node: SpatialNode, measuredHeights?: Record<string, number>): {
    side: HandleSide;
    x: number;
    y: number;
}[];
/**
 * Find the nearest handle side of a node to a given point.
 */
export declare function nearestHandle(node: SpatialNode, px: number, py: number, measuredHeights?: Record<string, number>): HandleSide;
/** Callback that resolves port positions for an edge (used by hit-testing). */
export type PortPositionResolver = (edge: EdgeNode, fromNode: SpatialNode, toNode: SpatialNode) => {
    sourcePortPos?: {
        x: number;
        y: number;
    };
    targetPortPos?: {
        x: number;
        y: number;
    };
};
/**
 * Hit-test edges: find ALL edges within tolerance of a canvas point.
 */
export declare function hitTestAllEdges(nodes: Map<string, SpatialNode>, canvasX: number, canvasY: number, zoom: number, measuredHeights?: Record<string, number>, resolvePortPositions?: PortPositionResolver): SpatialNode[];
/**
 * Hit-test edges: find the closest edge within tolerance of a canvas point.
 */
export declare function hitTestEdge(nodes: Map<string, SpatialNode>, canvasX: number, canvasY: number, zoom: number, measuredHeights?: Record<string, number>, resolvePortPositions?: PortPositionResolver): SpatialNode | null;
