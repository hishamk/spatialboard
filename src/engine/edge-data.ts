// edge-data.ts — the endpoint invariant for edge nodes.
//
// An edge is only meaningful with string `fromId`/`toId` endpoints. Adjacency,
// the delete cascades, hit-testing, z-order and arrange all read them, so the
// engine refuses an edge without them at every entry point (add, update,
// remote apply, JSON restore) and the whole-map walks skip one defensively.
// Empty-string endpoints stay valid: SBD emits them for dangling connectors.

import type { SpatialNode } from "./types";
import type { SpatialEngine } from "./SpatialEngine";

export interface EdgeEndpoints {
  fromId: string;
  toId: string;
}

/** True when `data` carries string `fromId` and `toId` fields. */
export function isEdgeData(data: unknown): data is EdgeEndpoints {
  if (data === null || typeof data !== "object") return false;
  const d = data as { fromId?: unknown; toId?: unknown };
  return typeof d.fromId === "string" && typeof d.toId === "string";
}

/** The endpoints of an edge node, or null for a non-edge or a malformed edge. */
export function edgeEndpoints(node: SpatialNode): EdgeEndpoints | null {
  if (node.type !== "edge") return null;
  return isEdgeData(node.data) ? node.data : null;
}

/** Link an admitted edge into the engine's adjacency index; a no-op for
 *  non-edges and malformed edges. */
export function linkEdgeAdjacency(engine: SpatialEngine, node: SpatialNode): void {
  const ends = edgeEndpoints(node);
  if (!ends) return;
  if (!engine.adjacency.has(ends.fromId)) engine.adjacency.set(ends.fromId, new Set());
  if (!engine.adjacency.has(ends.toId)) engine.adjacency.set(ends.toId, new Set());
  engine.adjacency.get(ends.fromId)!.add(node.id);
  engine.adjacency.get(ends.toId)!.add(node.id);
}

/** Whether a node may enter the engine: any object node, except an edge
 *  without endpoint data. */
export function isAdmissibleNode(node: unknown): node is SpatialNode {
  if (node === null || typeof node !== "object") return false;
  const n = node as { type?: unknown; data?: unknown };
  return n.type !== "edge" || isEdgeData(n.data);
}

/** Merge an update patch into a node the way every update path does: a
 *  shallow node merge, with object `data` patches merged into object data. */
export function mergeNodePatch(existing: SpatialNode, patch: Partial<SpatialNode>): SpatialNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updated: any = { ...existing, ...patch };
  if (
    patch.data &&
    typeof patch.data === "object" &&
    existing.data &&
    typeof existing.data === "object"
  ) {
    updated.data = {
      ...(existing as { data: Record<string, unknown> }).data,
      ...(patch as { data: Record<string, unknown> }).data,
    };
  }
  return updated;
}

/** Report refused nodes once per call. */
export function warnRefusedEdges(where: string, ids: readonly unknown[]): void {
  if (ids.length === 0) return;
  console.warn(
    `[SpatialEngine] ${where}: refused ${ids.length} edge(s) without fromId/toId endpoints:`,
    ids.map((id) => String(id)).join(", "),
  );
}
