import type { SpatialNode, EdgeNode, EdgeType, HandleSide } from "./types";
import type { PortDefinition } from "./data-flow-types";
/**
 * Port anchor sits this many **screen pixels** outside the node box (÷ zoom → canvas).
 * Keep small so ports hug the node; wire hit-testing still uses the same anchor as rendering.
 */
export declare const PORT_ANCHOR_OUTSIDE_PX = 7;
/** Screen-space snap radius when releasing a drag to connect to a port. */
export declare const PORT_EDGE_SNAP_RADIUS_PX = 52;
/**
 * Screen-space radius from port center to show drag-target highlight only when the cursor
 * is on the port dot (rendered ~6px radius + stroke in SVGLayer).
 */
export declare const PORT_DOT_HIGHLIGHT_RADIUS_PX = 8;
/** Rendered port-dot radius in screen pixels (SVGLayer circle). */
export declare const PORT_DOT_RADIUS_PX = 6;
/**
 * Canvas coordinates for a point in the node's unrotated AABB space
 * (same convention as stacked port placement).
 */
export declare function nodeLocalPointToCanvas(node: SpatialNode, localX: number, localY: number, measuredH?: Record<string, number>): {
    x: number;
    y: number;
};
/** How port dots attach to the node rect. */
export type PortAnchorMode = "bbox" | "inscribed-circle";
/**
 * Unrotated canvas coordinates for the port connector dot (same frame as `node.x` / `node.y`).
 * Matches the SVG port layer when the parent `<g>` uses `rotate(..., ncx, ncy)`.
 */
export declare function getPortOuterLocal(node: SpatialNode, ports: PortDefinition[], portId: string, zoom: number, measuredH?: Record<string, number>, portAnchor?: PortAnchorMode): {
    px: number;
    py: number;
    direction: "input" | "output";
} | null;
/**
 * Inner end of the port stub (on the node body) in unrotated coordinates.
 * For `inscribed-circle`, the point lies on the rim toward the outer dot.
 */
export declare function getPortStubInnerLocal(node: SpatialNode, direction: "input" | "output", outerLocal: {
    x: number;
    y: number;
}, measuredH?: Record<string, number>, portAnchor?: PortAnchorMode): {
    x: number;
    y: number;
};
/**
 * Compute the canvas-space position of a specific port on a node.
 * Returns `null` if the port ID is not found in the port list.
 */
export declare function getPortPosition(node: SpatialNode, ports: PortDefinition[], portId: string, zoom: number, measuredH?: Record<string, number>, portAnchor?: PortAnchorMode): {
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
}, sourceT?: number, targetT?: number, attachmentGap?: number): EdgePathResult;
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
 * Canvas-space pick radius for an edge, aligned with SVGLayer's invisible hit stroke:
 * stroke width max(sw + 16/zoom, 20/zoom) → half-width in canvas units.
 */
export declare function edgePickTolerance(edge: EdgeNode, zoom: number): number;
export type ClosestEdgeHit = {
    node: SpatialNode;
    distance: number;
};
/**
 * Closest edge whose path lies within per-edge pick tolerance of the point.
 */
export declare function getClosestEdgeHit(nodes: Map<string, SpatialNode>, canvasX: number, canvasY: number, zoom: number, measuredHeights?: Record<string, number>, resolvePortPositions?: PortPositionResolver): ClosestEdgeHit | null;
/**
 * Hit-test edges: find ALL edges within tolerance of a canvas point.
 */
export declare function hitTestAllEdges(nodes: Map<string, SpatialNode>, canvasX: number, canvasY: number, zoom: number, measuredHeights?: Record<string, number>, resolvePortPositions?: PortPositionResolver): SpatialNode[];
/**
 * Hit-test edges: find the closest edge within tolerance of a canvas point.
 */
export declare function hitTestEdge(nodes: Map<string, SpatialNode>, canvasX: number, canvasY: number, zoom: number, measuredHeights?: Record<string, number>, resolvePortPositions?: PortPositionResolver): SpatialNode | null;
/**
 * Convert a parametric t ∈ [0, 1) to a canvas-space point on the node's border.
 * t=0 is top-center, going clockwise: t≈0.25 is right-center, t=0.5 is bottom-center,
 * t≈0.75 is left-center.
 *
 * Also returns the nearest HandleSide for bezier tangent direction.
 */
export declare function perimeterPoint(node: SpatialNode, h: number, t: number): {
    x: number;
    y: number;
    side: HandleSide;
};
/**
 * Inverse of perimeterPoint: given a canvas-space point near the node,
 * return the t ∈ [0, 1) for the closest point on the node's border.
 */
export declare function canvasPointToPerimeterT(node: SpatialNode, h: number, px: number, py: number): number;
/**
 * Higher-level wrapper: given a canvas point near a node, compute
 * the nearest perimeter point and its t value.
 */
export declare function nearestPerimeterPoint(node: SpatialNode, px: number, py: number, measuredHeights?: Record<string, number>): {
    t: number;
    x: number;
    y: number;
};
