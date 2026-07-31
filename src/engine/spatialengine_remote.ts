// spatialengine_remote.ts — remote collaboration ops (apply peer node
// add/update/delete without emitting events or pushing history) for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode } from "./types";
import type { SpatialEngine } from "./SpatialEngine";

/** Add a remote node without emitting events or pushing history. */
export function addRemoteNode(engine: SpatialEngine, node: SpatialNode): void {
  engine._suppressEvents = true;
  engine.nodes.set(node.id, node);
  engine.quadTree.insert(node);

  // Update adjacency for edges
  if (node.type === "edge") {
    const edge = node as import("./types").EdgeNode;
    const { fromId, toId } = edge.data;
    if (!engine.adjacency.has(fromId)) engine.adjacency.set(fromId, new Set());
    if (!engine.adjacency.has(toId)) engine.adjacency.set(toId, new Set());
    engine.adjacency.get(fromId)!.add(node.id);
    engine.adjacency.get(toId)!.add(node.id);
  }

  // Update z-counters
  if (node.z >= engine.nextZValue) engine.nextZValue = node.z + 1;
  if (node.z < engine._minZ) engine._minZ = node.z;

  engine._suppressEvents = false;
  engine.refreshSearchIfNeeded();
}

/** Delete a remote node without emitting events or pushing history. */
export function deleteRemoteNode(engine: SpatialEngine, id: string): void {
  engine._suppressEvents = true;
  const node = engine.nodes.get(id);
  if (node) {
    engine.quadTree.remove(node);
    engine.nodes.delete(id);
    engine.selection.delete(id);
    engine.adjacency.delete(id);
    engine.frameChildren.delete(id);
    for (const children of engine.frameChildren.values()) children.delete(id);

    // Cascade: delete edges connected to this node
    for (const [edgeId, edgeNode] of engine.nodes) {
      if (edgeNode.type === "edge") {
        const data = edgeNode.data as { fromId: string; toId: string };
        if (data.fromId === id || data.toId === id) {
          const edge = engine.nodes.get(edgeId);
          if (edge) engine.quadTree.remove(edge);
          engine.nodes.delete(edgeId);
          engine.selection.delete(edgeId);
          const otherId = data.fromId === id ? data.toId : data.fromId;
          engine.adjacency.get(otherId)?.delete(edgeId);
        }
      }
    }
  }
  engine._suppressEvents = false;
  engine.refreshSearchIfNeeded();
}

/** Apply a remote node update without emitting events or pushing history. */
export function applyRemoteNodeUpdate(engine: SpatialEngine, id: string, props: Partial<SpatialNode>): void {
  engine._suppressEvents = true;
  const existing = engine.nodes.get(id);
  if (existing) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated: any = { ...existing, ...props };
    if (
      props.data &&
      typeof props.data === "object" &&
      existing.data &&
      typeof existing.data === "object"
    ) {
      updated.data = {
        ...(existing as { data: Record<string, unknown> }).data,
        ...(props as { data: Record<string, unknown> }).data,
      };
    }
    engine.nodes.set(id, updated);

    // Update QuadTree if geometry changed
    if (
      existing.x !== updated.x ||
      existing.y !== updated.y ||
      existing.w !== updated.w ||
      existing.h !== updated.h
    ) {
      engine.quadTree.remove(existing);
      engine.quadTree.insert(updated);
      engine.updateConnectedEdges(id);
    }

    // Update z-counter
    if (updated.z >= engine.nextZValue) engine.nextZValue = updated.z + 1;
    if (props.data) engine.refreshSearchIfNeeded();
  }
  engine._suppressEvents = false;
}
