import type { SpatialNode } from "./types";
interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}
export declare class QuadTree {
    private static readonly MAX_OBJECTS;
    private static readonly MAX_LEVELS;
    private level;
    private bounds;
    private objects;
    private nodes;
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    private heightMap;
    constructor(bounds: Rect, level?: number, heightMap?: Map<string, number>);
    /** Resolve the effective height for a node (uses measured height for auto-height nodes) */
    private resolveH;
    /** Store a measured height for an auto-height node */
    setMeasuredHeight(nodeId: string, height: number): void;
    clear(): void;
    private split;
    private getIndex;
    insert(node: SpatialNode, h?: number): void;
    remove(node: SpatialNode): boolean;
    retrieve(returnObjects: SpatialNode[], rect: Rect): SpatialNode[];
}
export {};
