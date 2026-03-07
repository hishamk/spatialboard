import type { SpatialNode } from "../../engine/types";
import type { SpatialEngine } from "../../engine/SpatialEngine";
/**
 * When a type-group section is rendered for multi-selection,
 * this context provides ALL nodes of that type so that property
 * changes can be applied to every selected node, not just the first.
 */
export declare const MultiNodeContext: import("react").Context<SpatialNode[] | null>;
/**
 * Returns an update callback that applies a data patch to ALL selected
 * nodes of the same type (via batchUpdateWithHistory) when in multi-selection,
 * or to the single node otherwise.
 */
export declare function useBatchUpdate<TData>(engine: SpatialEngine, node: SpatialNode): (patch: Partial<TData>) => void;
