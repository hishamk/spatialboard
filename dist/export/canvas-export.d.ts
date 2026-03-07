import type { SpatialEngine } from "../engine/SpatialEngine";
export interface ExportOptions {
    format: "png" | "svg";
    background?: boolean;
    padding?: number;
    scale?: number;
}
export declare function exportBoard(engine: SpatialEngine, options: ExportOptions): Promise<void>;
/**
 * Render a single frame and its children to an SVG data-URL string.
 * Images use their original URLs (no embedding) so this is synchronous-safe.
 */
export declare function renderFrameToSVG(engine: SpatialEngine, frameId: string): Promise<string>;
