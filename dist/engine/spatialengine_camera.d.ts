import type { SpatialEngine } from "./SpatialEngine";
export declare function pan(engine: SpatialEngine, dx: number, dy: number): void;
export declare function zoomByWheel(engine: SpatialEngine, delta: number, screenX: number, screenY: number): void;
export declare function zoomByFactor(engine: SpatialEngine, factor: number, screenX: number, screenY: number): void;
export declare function zoomTo(engine: SpatialEngine, level: number, anchor?: {
    x: number;
    y: number;
}): void;
export declare function zoomToNode(engine: SpatialEngine, nodeId: string, targetZoom?: number): void;
export declare function setContainerSize(engine: SpatialEngine, w: number, h: number): void;
export declare function fitToContent(engine: SpatialEngine): void;
export declare function fitToContentAnimated(engine: SpatialEngine, opts?: {
    durationMs?: number;
}): void;
export declare function fitToNodes(engine: SpatialEngine, ids: readonly string[]): void;
export declare function fitToNodesAnimated(engine: SpatialEngine, ids: readonly string[], opts?: {
    durationMs?: number;
}): void;
export declare function fitToRectAnimated(engine: SpatialEngine, minX: number, minY: number, maxX: number, maxY: number, opts?: {
    durationMs?: number;
    padding?: number;
}): void;
export declare function centerOnRectAnimated(engine: SpatialEngine, minX: number, minY: number, maxX: number, maxY: number, opts?: {
    zoom?: number;
    durationMs?: number;
    padding?: number;
    offsetX?: number;
    offsetY?: number;
}): void;
export declare function fitToFrame(engine: SpatialEngine, frameId: string): void;
export declare function setOriginView(engine: SpatialEngine): void;
export declare function clearOriginView(engine: SpatialEngine): void;
export declare function goToOriginView(engine: SpatialEngine): void;
export declare function screenToCanvas(engine: SpatialEngine, sx: number, sy: number): {
    x: number;
    y: number;
};
export declare function canvasToScreen(engine: SpatialEngine, cx: number, cy: number): {
    x: number;
    y: number;
};
export declare function animateViewport(engine: SpatialEngine, target: {
    x?: number;
    y?: number;
    zoom?: number;
}, options?: {
    duration?: number;
}): Promise<void>;
export declare function animatePanTo(engine: SpatialEngine, cx: number, cy: number, duration?: number): Promise<void>;
export declare function animateZoomTo(engine: SpatialEngine, level: number, duration?: number): Promise<void>;
export declare function animateZoomToNode(engine: SpatialEngine, nodeId: string, duration?: number): Promise<void>;
