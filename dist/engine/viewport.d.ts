import type { Viewport } from "./types";
export declare function clamp(value: number, min: number, max: number): number;
export declare function screenToCanvas(viewport: Viewport, sx: number, sy: number): {
    x: number;
    y: number;
};
export declare function canvasToScreen(viewport: Viewport, cx: number, cy: number): {
    x: number;
    y: number;
};
export declare function applyZoom(viewport: Viewport, delta: number, anchorScreenX: number, anchorScreenY: number): Viewport;
export declare function applyZoomFactor(viewport: Viewport, factor: number, anchorScreenX: number, anchorScreenY: number): Viewport;
