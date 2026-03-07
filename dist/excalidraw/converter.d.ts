import type { ExcalidrawElement, ExcalidrawLibraryItem } from "./types";
import type { SpatialNode } from "../engine/types";
export interface ConvertResult {
    nodes: SpatialNode[];
    groupParent: Map<string, string>;
}
/**
 * Convert an Excalidraw library item's elements into SpatialNode[].
 * Handles text binding (containerId → label on parent shape),
 * multi-point line decomposition, and group hierarchy.
 * All positions are normalized so the bounding box starts at (0,0).
 */
export declare function convertLibraryItem(item: ExcalidrawLibraryItem): ConvertResult;
export declare function convertExcalidrawElements(elements: ExcalidrawElement[]): ConvertResult;
