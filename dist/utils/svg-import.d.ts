import type { SpatialEngine } from "../engine/SpatialEngine";
import type { ImageNode } from "../engine/types";
/** Extract the <svg>…</svg> from a string, if present. */
export declare function extractSvgMarkup(text: string): string | null;
/** Convert SVG markup to a data: URL. */
export declare function svgToDataUrl(svg: string): string;
/**
 * Parse SVG markup, determine its intrinsic dimensions, and create an ImageNode.
 * Returns a Promise that resolves with the created node, or null if parsing fails.
 */
export declare function svgTextToImageNode(svg: string, x: number, y: number, z: number): Promise<ImageNode | null>;
/**
 * Place an SVG string onto the canvas as an ImageNode.
 * Resolves the SVG dimensions and adds the node.
 */
export declare function placeSvgOnCanvas(engine: SpatialEngine, svg: string, screenX: number, screenY: number): Promise<void>;
