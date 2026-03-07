import type { SpatialNode, DrawNode } from "./types";
/**
 * Transform a canvas point into a node's local (unrotated) coordinate space.
 * If the node has no rotation, returns the point unchanged.
 */
export declare function toLocal(node: SpatialNode, canvasX: number, canvasY: number, h: number): [number, number];
export declare function hitTest(nodes: Map<string, SpatialNode>, canvasX: number, canvasY: number, zoom?: number, measuredHeights?: Record<string, number>, containerTypes?: ReadonlySet<string>): SpatialNode | null;
/** Precise hit test for shape nodes — checks actual geometry, not just bounding box.
 *  When `interior` is true, the interior of closed shapes (rect/ellipse/diamond)
 *  counts as a hit even when the shape has no fill. */
export declare function isPointInShapeNode(node: SpatialNode, canvasX: number, canvasY: number, zoom: number, interior?: boolean): boolean;
/** Precise hit test for draw strokes — checks proximity to actual stroke path */
export declare function isPointInDrawNode(node: DrawNode, canvasX: number, canvasY: number, zoom: number): boolean;
/** Returns all nodes at a point, sorted with precise geometry hits
 *  (draw/shape) before bounding-box-only hits (content/sticky/text/image). */
export declare function hitTestAll(nodes: Map<string, SpatialNode>, canvasX: number, canvasY: number, zoom?: number, measuredHeights?: Record<string, number>, containerTypes?: ReadonlySet<string>): SpatialNode[];
export declare function getNodesInRect(nodes: Map<string, SpatialNode>, rect: {
    x: number;
    y: number;
    w: number;
    h: number;
}): SpatialNode[];
