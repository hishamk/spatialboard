import type { SpatialEngine } from "./SpatialEngine";
export declare function duplicateSelected(engine: SpatialEngine): void;
export declare function copySelected(engine: SpatialEngine): void;
export declare function cutSelected(engine: SpatialEngine): void;
export declare function pasteClipboard(engine: SpatialEngine, canvasX?: number, canvasY?: number): void;
export declare function applyTemplate(engine: SpatialEngine, templateId: string, cx: number, cy: number): void;
