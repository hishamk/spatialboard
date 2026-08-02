// spatialengine_nodes.ts — node CRUD (add / update / delete / query) + the
// history-recording update wrappers for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode, NodeType } from "./types";
import type { SpatialEngine } from "./SpatialEngine";

export function addNode(engine: SpatialEngine, node: SpatialNode, opts?: { skipHistory?: boolean }): void {
  if (engine.readOnly) return;
  // `skipHistory` (host-managed ephemeral nodes — e.g. the workflow loop
  // Start/End frame): the node renders + hit-tests + connects like any node
  // but never enters the undo stack (the host reconciles it from UI scope,
  // and serialize excludes it by type). Undo of a REAL edit still restores a
  // snapshot that includes it, and the host re-reconciles if a snapshot lacks it.
  if (engine._agentActionDepth === 0 && !opts?.skipHistory) {
    engine._historyCoalesceKey = null;
    engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  }
  engine.nodes.set(node.id, node);
  engine.quadTree.insert(node);
  if (node.z < engine._minZ) engine._minZ = node.z;

  // Update adjacency
  if (node.type === "edge") {
    const edge = node as import("./types").EdgeNode;
    const { fromId, toId } = edge.data;
    if (!engine.adjacency.has(fromId)) engine.adjacency.set(fromId, new Set());
    if (!engine.adjacency.has(toId)) engine.adjacency.set(toId, new Set());
    engine.adjacency.get(fromId)!.add(node.id);
    engine.adjacency.get(toId)!.add(node.id);
  }

  // Auto-add to frame if created inside one
  if (node.type !== "edge") {
    engine.updateFrameMembership([node.id]);
  }

  // Lifecycle hooks
  engine.registry?.get(node.type)?.onCreate?.(node, engine);
  engine.emit("node:create", node);

  engine.refreshSearchIfNeeded();
  engine.emit("change");
  engine.emit("history");
}

export function addNodes(engine: SpatialEngine, nodes: SpatialNode[]): void {
  if (engine.readOnly) return;
  if (nodes.length === 0) return;
  if (engine._agentActionDepth === 0) {
    engine._historyCoalesceKey = null;
    engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  }
  for (const node of nodes) {
    engine.nodes.set(node.id, node);
    engine.quadTree.insert(node);

    if (node.type === "edge") {
      const edge = node as import("./types").EdgeNode;
      const { fromId, toId } = edge.data;
      if (!engine.adjacency.has(fromId)) engine.adjacency.set(fromId, new Set());
      if (!engine.adjacency.has(toId)) engine.adjacency.set(toId, new Set());
      engine.adjacency.get(fromId)!.add(node.id);
      engine.adjacency.get(toId)!.add(node.id);
    }
  }
  // Auto-add non-edge nodes to frames if created inside them
  const nonEdgeIds = nodes
    .filter((n) => n.type !== "edge")
    .map((n) => n.id);
  if (nonEdgeIds.length > 0) engine.updateFrameMembership(nonEdgeIds);

  engine.refreshSearchIfNeeded();
  engine.emit("change");
  engine.emit("history");
}

export function updateNode(engine: SpatialEngine, id: string, patch: Partial<SpatialNode>): void {
  if (engine.readOnly) return;
  const existing = engine.nodes.get(id);
  if (!existing) return;

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
  engine.nodes.set(id, updated);

  // Update QuadTree if geometry changed (including rotation — AABB depends on it)
  if (
    existing.x !== updated.x ||
    existing.y !== updated.y ||
    existing.w !== updated.w ||
    existing.h !== updated.h ||
    (existing.rotation ?? 0) !== (updated.rotation ?? 0)
  ) {
    engine.quadTree.remove(existing);
    engine.quadTree.insert(updated);

    // Update edges connected to this node
    engine.updateConnectedEdges(id);
  }

  // Lifecycle: position change (move)
  if (existing.x !== updated.x || existing.y !== updated.y) {
    const dx = updated.x - existing.x;
    const dy = updated.y - existing.y;
    engine.registry?.get(updated.type)?.onMove?.(updated, dx, dy, engine);
    engine.emit("node:move", updated, dx, dy);
  }

  // Lifecycle: dimension change (resize)
  if (existing.w !== updated.w || existing.h !== updated.h) {
    const sx = existing.w !== 0 ? updated.w / existing.w : 1;
    const existingH = existing.h === "auto" ? 0 : (existing.h as number);
    const updatedH = updated.h === "auto" ? 0 : (updated.h as number);
    const sy = existingH !== 0 ? updatedH / existingH : 1;
    engine.emit("node:resize", updated, sx, sy);
  }

  // Lifecycle: rotation change
  if ((existing.rotation ?? 0) !== (updated.rotation ?? 0)) {
    engine.registry?.get(updated.type)?.onRotate?.(updated, updated.rotation ?? 0, engine);
    engine.emit("node:rotate", updated, updated.rotation ?? 0);
  }

  // Lifecycle: data change
  if (patch.data && existing.data !== updated.data) {
    engine.registry?.get(updated.type)?.onDataChange?.(updated, existing.data, updated.data, engine);
    engine.emit("node:data", updated, existing.data, updated.data);
    engine.refreshSearchIfNeeded();
  }

  engine.emit("change");
}

/**
 * Batch update multiple nodes with a single change emit.
 * Use during drag/resize to avoid N re-renders per frame.
 */
export function updateMany(
  engine: SpatialEngine,
  updates: Array<{ id: string; patch: Partial<SpatialNode> }>
): void {
  if (engine.readOnly) return;
  let changed = false;
  let dataChanged = false;
  for (const { id, patch } of updates) {
    const existing = engine.nodes.get(id);
    if (!existing) continue;
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
      dataChanged = true;
    }
    engine.nodes.set(id, updated);

    // Update QuadTree if geometry changed (including rotation — AABB depends on it)
    if (
      existing.x !== updated.x ||
      existing.y !== updated.y ||
      existing.w !== updated.w ||
      existing.h !== updated.h ||
      (existing.rotation ?? 0) !== (updated.rotation ?? 0)
    ) {
      engine.quadTree.remove(existing);
      engine.quadTree.insert(updated);

      // Update connected edges
      engine.updateConnectedEdges(id);
    }

    changed = true;
  }
  if (changed && dataChanged) engine.refreshSearchIfNeeded();
  if (changed) engine.emit("change");
}

export function updateNodeWithHistory(engine: SpatialEngine, id: string, patch: Partial<SpatialNode>): void {
  if (engine.readOnly) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  engine.updateNode(id, patch);
  engine.emit("history");
}

/**
 * Like `updateNodeWithHistory`, but multiple calls with the same `sessionKey` share one undo step
 * (e.g. dragging an inspector slider). Call `endHistoryCoalesce()` when the gesture ends.
 */
export function updateNodeWithHistoryCoalesced(
  engine: SpatialEngine,
  id: string,
  patch: Partial<SpatialNode>,
  sessionKey: string,
): void {
  if (engine.readOnly) return;
  if (engine._collabMode) {
    engine.updateNode(id, patch);
    return;
  }
  if (engine._historyCoalesceKey !== sessionKey) {
    engine.history.pushSnapshot(engine.nodes, engine.groupParent);
    engine._historyCoalesceKey = sessionKey;
    engine.emit("history");
  }
  engine.updateNode(id, patch);
}

/** Update multiple nodes in a single undo step. */
export function batchUpdateWithHistory(engine: SpatialEngine, updates: Array<{ id: string; patch: Partial<SpatialNode> }>): void {
  if (updates.length === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  for (const { id, patch } of updates) {
    engine.updateNode(id, patch);
  }
  engine.emit("history");
}

/**
 * Like `batchUpdateWithHistory`, but shares one undo step with other calls using the same `sessionKey`.
 */
export function batchUpdateWithHistoryCoalesced(
  engine: SpatialEngine,
  updates: Array<{ id: string; patch: Partial<SpatialNode> }>,
  sessionKey: string,
): void {
  if (updates.length === 0) return;
  if (engine._collabMode) {
    for (const { id, patch } of updates) {
      engine.updateNode(id, patch);
    }
    return;
  }
  if (engine._historyCoalesceKey !== sessionKey) {
    engine.history.pushSnapshot(engine.nodes, engine.groupParent);
    engine._historyCoalesceKey = sessionKey;
    engine.emit("history");
  }
  for (const { id, patch } of updates) {
    engine.updateNode(id, patch);
  }
}

export function deleteNode(engine: SpatialEngine, id: string, opts?: { skipHistory?: boolean }): void {
  if (engine.readOnly) return;
  if (!engine.nodes.has(id)) return;
  if (engine.nodes.get(id)?.locked) return;
  engine._historyCoalesceKey = null;
  // `skipHistory`: mirror of addNode — removing an ephemeral host-managed node
  // (loop Start/End frame on scope exit) must not push an undo step.
  if (!opts?.skipHistory) engine.history.pushSnapshot(engine.nodes, engine.groupParent);

  // Remove from QuadTree before deleting from map
  const nodeToRemove = engine.nodes.get(id);
  if (nodeToRemove) {
    engine.registry?.get(nodeToRemove.type)?.onDelete?.(nodeToRemove, engine);
    engine.emit("node:delete", nodeToRemove);
    engine.quadTree.remove(nodeToRemove);
  }

  engine.nodes.delete(id);
  engine.selection.delete(id);
  engine.adjacency.delete(id); // Remove node entries
  engine.pruneNodeResidue(id);
  // Clean up frame children tracking
  engine.frameChildren.delete(id); // If it was a frame
  for (const children of engine.frameChildren.values()) children.delete(id);

  // Cascade: delete edges connected to this node, removing each deleted edge
  // from the surviving endpoint's adjacency set.
  for (const [edgeId, node] of engine.nodes) {
    if (node.type === "edge") {
      const data = node.data as { fromId: string; toId: string };
      if (data.fromId === id || data.toId === id) {
        const edge = engine.nodes.get(edgeId);
        if (edge) engine.quadTree.remove(edge);
        engine.nodes.delete(edgeId);
        engine.selection.delete(edgeId);
        engine.pruneNodeResidue(edgeId);

        // Clean up adjacency from the OTHER node
        const otherId = data.fromId === id ? data.toId : data.fromId;
        engine.adjacency.get(otherId)?.delete(edgeId);
      }
    }
  }
  engine.refreshSearchIfNeeded();
  engine.emit("change");
  engine.emit("selection");
  engine.emit("history");
}

export function getNode(engine: SpatialEngine, id: string): SpatialNode | undefined {
  return engine.nodes.get(id);
}

export function getAllNodes(engine: SpatialEngine): SpatialNode[] {
  return Array.from(engine.nodes.values());
}

/** Returns a read-only iterable of all nodes (no copy). */
export function iterNodes(engine: SpatialEngine): IterableIterator<SpatialNode> {
  return engine.nodes.values();
}

export function getNodesByType(engine: SpatialEngine, type: NodeType): SpatialNode[] {
  const result: SpatialNode[] = [];
  for (const n of engine.nodes.values()) {
    if (n.type === type) result.push(n);
  }
  return result;
}

export function deleteNodes(engine: SpatialEngine, ids: string[]): void {
  if (engine.readOnly) return;
  // Skip protected nodes (user-gesture batch paths, e.g. the eraser tool).
  ids = ids.filter((id) => engine.nodes.get(id)?.deletable !== false);
  if (ids.length === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  const deletedSet = new Set(ids);

  for (const id of ids) {
    const node = engine.nodes.get(id);
    if (!node) continue;
    engine.registry?.get(node.type)?.onDelete?.(node, engine);
    engine.emit("node:delete", node);
    engine.quadTree.remove(node);
    engine.nodes.delete(id);
    engine.pruneNodeResidue(id);
    engine.frameChildren.delete(id);
    for (const children of engine.frameChildren.values()) children.delete(id);
  }

  // Cascade: delete edges referencing deleted nodes
  for (const [edgeId, node] of engine.nodes) {
    if (node.type === "edge") {
      const data = node.data as { fromId: string; toId: string };
      if (deletedSet.has(data.fromId) || deletedSet.has(data.toId)) {
        const edge = engine.nodes.get(edgeId);
        if (edge) engine.quadTree.remove(edge);
        engine.nodes.delete(edgeId);
        engine.pruneNodeResidue(edgeId);
      }
    }
  }
  engine.selection.clear();
  engine.refreshSearchIfNeeded();
  engine.emit("change");
  engine.emit("selection");
  engine.emit("history");
}
