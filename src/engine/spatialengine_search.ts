// spatialengine_search.ts — board text-search operations for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode } from "./types";
import type {
  SpatialEngine,
  SpatialSearchField,
  SpatialSearchMatch,
  SpatialSearchState,
} from "./SpatialEngine";

export function getSearchState(engine: SpatialEngine): SpatialSearchState {
  return {
    query: engine._search.query,
    matches: engine._search.matches.map((m) => ({ ...m })),
    activeIndex: engine._search.activeIndex,
  };
}

export function setSearchQuery(engine: SpatialEngine, query: string): void {
  const normalized = query.trim();
  if (normalized.length === 0) {
    engine._search = { query: "", matches: [], activeIndex: -1 };
    engine.emit("search");
    return;
  }
  const matches = computeSearchMatches(engine, normalized);
  engine._search = {
    query: normalized,
    matches,
    activeIndex: matches.length > 0 ? 0 : -1,
  };
  engine.emit("search");
}

export function clearSearch(engine: SpatialEngine): void {
  if (!engine._search.query && engine._search.matches.length === 0 && engine._search.activeIndex === -1) return;
  engine._search = { query: "", matches: [], activeIndex: -1 };
  engine.emit("search");
}

export function setSearchActiveIndex(engine: SpatialEngine, index: number): void {
  if (engine._search.matches.length === 0) {
    if (engine._search.activeIndex !== -1) {
      engine._search = { ...engine._search, activeIndex: -1 };
      engine.emit("search");
    }
    return;
  }
  const clamped = Math.max(0, Math.min(engine._search.matches.length - 1, index));
  if (clamped === engine._search.activeIndex) return;
  engine._search = { ...engine._search, activeIndex: clamped };
  engine.emit("search");
}

export function searchNext(engine: SpatialEngine): void {
  const total = engine._search.matches.length;
  if (total === 0) return;
  const next = engine._search.activeIndex < 0 ? 0 : (engine._search.activeIndex + 1) % total;
  engine.setSearchActiveIndex(next);
}

export function searchPrev(engine: SpatialEngine): void {
  const total = engine._search.matches.length;
  if (total === 0) return;
  const prev = engine._search.activeIndex < 0 ? 0 : (engine._search.activeIndex - 1 + total) % total;
  engine.setSearchActiveIndex(prev);
}

export function focusSearchResult(
  engine: SpatialEngine,
  index: number,
  options?: { select?: boolean; center?: boolean; minZoom?: number },
): void {
  if (engine._search.matches.length === 0) return;
  const clamped = Math.max(0, Math.min(engine._search.matches.length - 1, index));
  const match = engine._search.matches[clamped];
  if (!engine.nodes.has(match.nodeId)) return;
  engine.setSearchActiveIndex(clamped);
  if (options?.select !== false) engine.select(match.nodeId);
  if (options?.center !== false) {
    const minZoom = options?.minZoom ?? 0.9;
    engine.zoomToNode(match.nodeId, Math.max(engine.viewport.zoom, minZoom));
  }
}

export function focusActiveSearchResult(
  engine: SpatialEngine,
  options?: { select?: boolean; center?: boolean; minZoom?: number },
): void {
  if (engine._search.activeIndex < 0) return;
  engine.focusSearchResult(engine._search.activeIndex, options);
}

export function refreshSearchIfNeeded(engine: SpatialEngine): void {
  if (!engine._search.query) return;
  const previousActiveNodeId =
    engine._search.activeIndex >= 0 ? engine._search.matches[engine._search.activeIndex]?.nodeId : undefined;
  const matches = computeSearchMatches(engine, engine._search.query);
  let activeIndex = -1;
  if (matches.length > 0) {
    if (previousActiveNodeId) {
      const sameNodeIndex = matches.findIndex((m) => m.nodeId === previousActiveNodeId);
      activeIndex = sameNodeIndex >= 0 ? sameNodeIndex : 0;
    } else {
      activeIndex = 0;
    }
  }
  engine._search = {
    query: engine._search.query,
    matches,
    activeIndex,
  };
  engine.emit("search");
}

function computeSearchMatches(engine: SpatialEngine, query: string): SpatialSearchMatch[] {
  const q = query.toLocaleLowerCase();
  const matches: SpatialSearchMatch[] = [];
  const sortedNodes = Array.from(engine.nodes.values()).sort((a, b) => a.z - b.z);
  for (const node of sortedNodes) {
    const candidates = getNodeSearchCandidates(node);
    for (const candidate of candidates) {
      const count = countOccurrences(candidate.text.toLocaleLowerCase(), q);
      if (count > 0) {
        matches.push({
          nodeId: node.id,
          nodeType: node.type,
          field: candidate.field,
          text: candidate.text,
          matchCount: count,
        });
      }
    }
  }
  return matches;
}

function getNodeSearchCandidates(node: SpatialNode): Array<{ field: SpatialSearchField; text: string }> {
  if (!node.data || typeof node.data !== "object") return [];
  const data = node.data as Record<string, unknown>;
  const out: Array<{ field: SpatialSearchField; text: string }> = [];
  const push = (field: SpatialSearchField, value: unknown) => {
    if (typeof value !== "string") return;
    const trimmed = value.trim();
    if (!trimmed) return;
    out.push({ field, text: trimmed });
  };

  switch (node.type) {
    case "text":
    case "sticky":
      push("text", data.text);
      break;
    case "shape":
    case "edge":
    case "frame":
      push("label", data.label);
      break;
    case "content": {
      const blockText = extractBlockText(data.blocks);
      push("content", blockText);
      push("content", data.markdown);
      break;
    }
    default:
      break;
  }
  return out;
}

function extractBlockText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  const walk = (items: unknown[]): string => {
    return items
      .map((item) => {
        if (!item || typeof item !== "object") return "";
        const b = item as { content?: Array<{ type?: string; text?: string }>; children?: unknown[] };
        const inline = Array.isArray(b.content)
          ? b.content
              .filter((c) => c && typeof c === "object" && (c.type ?? "text") === "text")
              .map((c) => (typeof c.text === "string" ? c.text : ""))
              .join("")
          : "";
        const children = Array.isArray(b.children) && b.children.length > 0 ? walk(b.children) : "";
        return children ? `${inline}\n${children}` : inline;
      })
      .filter(Boolean)
      .join("\n");
  };
  return walk(blocks);
}

function countOccurrences(haystackLower: string, needleLower: string): number {
  if (!needleLower) return 0;
  let idx = 0;
  let count = 0;
  while (idx <= haystackLower.length - needleLower.length) {
    const found = haystackLower.indexOf(needleLower, idx);
    if (found < 0) break;
    count += 1;
    idx = found + needleLower.length;
  }
  return count;
}
