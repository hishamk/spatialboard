import { useState, useMemo, useLayoutEffect } from "react";
import type { SpatialSearchState } from "../../../engine/SpatialEngine";
import type { Viewport, SpatialNode } from "../../../engine/types";

/**
 * Search-highlight overlay logic: the set of node ids to outline, the active
 * match id, and the screen-space word-level highlight rects (recomputed via a
 * text-range scan, skipped while dragging).
 */
export function useSearchHighlights({
  searchState,
  nodes,
  viewport,
  isNodeDragging,
  containerRef,
}: {
  searchState: SpatialSearchState;
  nodes: SpatialNode[];
  viewport: Viewport;
  isNodeDragging: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const [searchTextRects, setSearchTextRects] = useState<
    Array<{ x: number; y: number; w: number; h: number; active: boolean }>
  >([]);

  const activeSearchNodeId =
    searchState.activeIndex >= 0 ? searchState.matches[searchState.activeIndex]?.nodeId ?? null : null;
  const searchHighlightNodeIds = useMemo(() => {
    if (!searchState.query || searchState.matches.length === 0) return new Set<string>();
    const ids = new Set<string>();
    for (const match of searchState.matches) {
      if (match.nodeType !== "edge") ids.add(match.nodeId);
    }
    return ids;
  }, [searchState]);

  useLayoutEffect(() => {
    const root = containerRef.current;
    // Avoid expensive text-range scanning while dragging nodes.
    if (isNodeDragging || !root || !searchState.query || searchState.matches.length === 0) {
      setSearchTextRects((prev) => (prev.length === 0 ? prev : []));
      return;
    }
    const rootRect = root.getBoundingClientRect();
    const queryLower = searchState.query.toLocaleLowerCase();
    const nodeIds = Array.from(new Set(searchState.matches.map((m) => m.nodeId)));
    const nextRects: Array<{ x: number; y: number; w: number; h: number; active: boolean }> = [];
    const MAX_RECTS = 900;

    for (const nodeId of nodeIds) {
      if (nextRects.length >= MAX_RECTS) break;
      const escapedNodeId = nodeId.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      const nodeRoot = root.querySelector(`[data-node-id="${escapedNodeId}"]`) as HTMLElement | null;
      if (!nodeRoot) continue;

      const walker = document.createTreeWalker(
        nodeRoot,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            if (parent.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']")) {
              return NodeFilter.FILTER_REJECT;
            }
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          },
        },
      );

      let current = walker.nextNode();
      while (current && nextRects.length < MAX_RECTS) {
        const textNode = current as Text;
        const text = textNode.nodeValue ?? "";
        const lower = text.toLocaleLowerCase();
        let start = 0;
        while (start <= lower.length - queryLower.length && nextRects.length < MAX_RECTS) {
          const idx = lower.indexOf(queryLower, start);
          if (idx < 0) break;
          const range = document.createRange();
          range.setStart(textNode, idx);
          range.setEnd(textNode, idx + queryLower.length);
          const rectList = range.getClientRects();
          for (const r of rectList) {
            if (r.width <= 0 || r.height <= 0) continue;
            nextRects.push({
              x: r.left - rootRect.left,
              y: r.top - rootRect.top,
              w: r.width,
              h: r.height,
              active: nodeId === activeSearchNodeId,
            });
          }
          start = idx + queryLower.length;
        }
        current = walker.nextNode();
      }
    }

    setSearchTextRects((prev) => {
      if (
        prev.length === nextRects.length &&
        prev.every((r, i) => {
          const n = nextRects[i];
          return r.x === n.x && r.y === n.y && r.w === n.w && r.h === n.h && r.active === n.active;
        })
      ) {
        return prev;
      }
      return nextRects;
    });
  }, [searchState, nodes, viewport, activeSearchNodeId, isNodeDragging]);

  return { searchHighlightNodeIds, searchTextRects, activeSearchNodeId };
}
