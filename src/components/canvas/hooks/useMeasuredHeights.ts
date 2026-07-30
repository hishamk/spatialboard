import { useState, useCallback, useRef, useEffect } from "react";
import { SpatialEngine } from "../../../engine/SpatialEngine";

/**
 * Owns the measured-height map for auto-height content blocks (used for accurate
 * selection bounds and edge geometry). Provides a shared ResizeObserver so each
 * RegistryNodeWrapper observes through one observer instead of allocating its own,
 * and prunes stale entries when their nodes are removed.
 *
 * `nodeIds` is the current set of live node ids; passing it in lets the prune
 * effect run without the hook needing to know about the node list itself.
 */
export function useMeasuredHeights(engine: SpatialEngine, nodeIds: ReadonlySet<string>) {
  // Measured heights for auto-height content blocks (for accurate selBounds)
  const [measuredHeights, setMeasuredHeights] = useState<Record<string, number>>({});
  const handleMeasuredHeight = useCallback((nodeId: string, height: number) => {
    setMeasuredHeights((prev) =>
      prev[nodeId] === height ? prev : { ...prev, [nodeId]: height }
    );
    engine.updateMeasuredHeight(nodeId, height);
  }, [engine]);

  // Shared ResizeObserver for all RegistryNodeWrapper auto-height nodes.
  // Instead of each wrapper creating its own ResizeObserver, we share one.
  const sharedObserverRef = useRef<ResizeObserver | null>(null);
  const observerCallbacksRef = useRef<Map<Element, (entry: ResizeObserverEntry) => void>>(new Map());

  function getSharedObserver() {
    if (!sharedObserverRef.current) {
      sharedObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          observerCallbacksRef.current.get(entry.target)?.(entry);
        }
      });
    }
    return sharedObserverRef.current;
  }

  const observeElement = useCallback((el: Element, callback: (entry: ResizeObserverEntry) => void) => {
    observerCallbacksRef.current.set(el, callback);
    getSharedObserver().observe(el);
  }, []);

  const unobserveElement = useCallback((el: Element) => {
    observerCallbacksRef.current.delete(el);
    sharedObserverRef.current?.unobserve(el);
  }, []);

  // Clean up the shared observer on unmount
  useEffect(() => {
    return () => {
      sharedObserverRef.current?.disconnect();
      sharedObserverRef.current = null;
      observerCallbacksRef.current.clear();
    };
  }, []);

  // Prune measuredHeights when nodes are removed to avoid unbounded growth
  useEffect(() => {
    setMeasuredHeights((prev) => {
      let changed = false;
      const next: Record<string, number> = {};
      for (const [id, h] of Object.entries(prev)) {
        if (nodeIds.has(id)) {
          next[id] = h;
        } else {
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [nodeIds]);

  return { measuredHeights, handleMeasuredHeight, observeElement, unobserveElement };
}
