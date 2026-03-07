import { createContext, useContext, useCallback } from "react";
import type { SpatialNode } from "../../engine/types";
import type { SpatialEngine } from "../../engine/SpatialEngine";

/**
 * When a type-group section is rendered for multi-selection,
 * this context provides ALL nodes of that type so that property
 * changes can be applied to every selected node, not just the first.
 */
export const MultiNodeContext = createContext<SpatialNode[] | null>(null);

/**
 * Returns an update callback that applies a data patch to ALL selected
 * nodes of the same type (via batchUpdateWithHistory) when in multi-selection,
 * or to the single node otherwise.
 */
export function useBatchUpdate<TData>(
  engine: SpatialEngine,
  node: SpatialNode,
): (patch: Partial<TData>) => void {
  const allNodes = useContext(MultiNodeContext);
  return useCallback(
    (patch: Partial<TData>) => {
      if (allNodes && allNodes.length > 1) {
        const updates = allNodes.map((n) => ({
          id: n.id,
          patch: {
            data: { ...(n.data as Record<string, unknown>), ...(patch as Record<string, unknown>) },
          },
        }));
        engine.batchUpdateWithHistory(updates);
      } else {
        engine.updateNodeWithHistory(node.id, {
          data: { ...(node.data as Record<string, unknown>), ...(patch as Record<string, unknown>) },
        });
      }
    },
    [engine, node, allNodes],
  );
}
