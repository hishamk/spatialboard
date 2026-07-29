import type { SpatialEngine, SelectionAlignMode, SelectionDistributeAxis } from "./SpatialEngine";
export declare function flipSelectedHorizontal(engine: SpatialEngine): void;
export declare function flipSelectedVertical(engine: SpatialEngine): void;
export declare function arrangeSelectedNodes(engine: SpatialEngine, measuredHeights?: Record<string, number>, labelLayoutZoom?: number): void;
export declare function arrangeAllNodes(engine: SpatialEngine, measuredHeights?: Record<string, number>, labelLayoutZoom?: number): void;
export declare function alignSelectedNodes(engine: SpatialEngine, mode: SelectionAlignMode, measuredHeights?: Record<string, number>): void;
export declare function distributeSelectedNodes(engine: SpatialEngine, axis: SelectionDistributeAxis, measuredHeights?: Record<string, number>): void;
