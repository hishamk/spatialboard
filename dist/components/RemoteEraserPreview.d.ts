import { type JSX } from "react";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { EraserAwareness } from "../collab/eraser-awareness";
/**
 * Eraser trail (fading stroke) + semi-transparent overlays on marked node bboxes.
 * Re-renders on rAF so trail fades; timestamps are Date.now() ms (same as local trail / awareness).
 */
export declare function RemoteEraserPreview({ eraser, engine, zoom, }: {
    eraser: EraserAwareness;
    engine: SpatialEngine;
    zoom: number;
}): JSX.Element | null;
