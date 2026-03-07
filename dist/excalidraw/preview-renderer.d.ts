import type { SpatialNode } from "../engine/types";
/**
 * Render an array of SpatialNodes as a compact SVG string
 * suitable for use as an inline thumbnail (e.g. 60×60px).
 */
export declare function renderPreviewSVG(nodes: SpatialNode[], size?: number): string;
