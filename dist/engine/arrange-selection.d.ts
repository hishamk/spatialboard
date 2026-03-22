import type { SpatialNode } from "./types";
import type { NodeTypeRegistry } from "../nodes/registry";
/** Height for layout (uses measured DOM height when `h === "auto"`). */
export declare function arrangeNodeHeight(n: SpatialNode, measured?: Record<string, number>): number;
/**
 * Compute new top-left positions for a multi-node selection.
 *
 * - Splits the selection into weakly connected components (via edges with both
 *   endpoints selected).
 * - Per component: if edges form a DAG, uses left-to-right layers (longest-path
 *   rank) with two rounds of barycenter ordering to reduce crossings; otherwise a
 *   reading-order sqrt(n) grid.
 * - Extra spacing when port wires exist; then overlap refinement using real edge
 *   geometry + estimated dataflow label badges (`registry` + `labelZoom`).
 * - Packs components left-to-right; preserves the selection's overall top-left
 *   anchor so nothing jumps off-canvas arbitrarily.
 */
export declare function computeSelectionArrangement(allNodes: SpatialNode[], selectedIds: ReadonlySet<string>, measuredHeights?: Record<string, number>, gridSize?: number, registry?: NodeTypeRegistry, labelLayoutZoom?: number): Array<{
    id: string;
    x: number;
    y: number;
}>;
