import type { SpatialEngine } from "./SpatialEngine";
export interface DragSnapContext {
    staticNodes: Array<{
        x: number;
        y: number;
        w: number;
        h: number;
    }>;
}
export declare function snap(engine: SpatialEngine, x: number, y: number): {
    x: number;
    y: number;
};
export declare function createDragSnapContext(engine: SpatialEngine, allDragIds: Set<string> | string[]): DragSnapContext;
export declare function computeDragSnap(engine: SpatialEngine, origPositions: Array<{
    id: string;
    x: number;
    y: number;
}>, allDragIds: Set<string> | string[], dx: number, dy: number, modKey: boolean, dragSnapContext?: DragSnapContext): {
    finalDx: number;
    finalDy: number;
};
export declare function clearAlignGuides(engine: SpatialEngine): void;
