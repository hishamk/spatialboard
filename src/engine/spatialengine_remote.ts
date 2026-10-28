// spatialengine_remote.ts — remote collaboration ops (apply peer node
// add/update/delete without emitting events or pushing history) for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode } from "./types";
import type { SpatialEngine } from "./SpatialEngine";
import { edgeEndpoints, isAdmissibleNode, linkEdgeAdjacency, mergeNodePatch, warnRefusedEdges } from "./edge-data";

/** Add a remote node without emitting events or pushing history. */
export function addRemoteNode(engine: SpatialEngine, node: SpatialNode): void {
  // A peer's record is untrusted: an edge without endpoints would break every
  // later delete and undo on this board, so it never enters the engine. Its id
  // is remembered so a host syncing the board back to the shared document can
  // leave that record alone instead of deleting it as "gone locally".
  if (!isAdmissibleNode(node)) {
    const id = (node as { id?: unknown } | null)?.id;
    if (typeof id === "string") {
      if (!engine._refusedRemoteIds.has(id)) warnRefusedEdges("addRemoteNode", [id]);
      engine._refusedRemoteIds.add(id);
    } else {
      warnRefusedEdges("addRemoteNode", [id]);
    }
    return;
  }
  engine._refusedRemoteIds.delete(node.id);
  engine._suppressEvents = true;
  engine.nodes.set(node.id, node);
  engine.quadTree.insert(node);

  // Update adjacency for edges
  linkEdgeAdjacency(engine, node);

  // Update z-counters
  if (node.z >= engine.nextZValue) engine.nextZValue = node.z + 1;
  if (node.z < engine._minZ) engine._minZ = node.z;

  engine._suppressEvents = false;
  engine.refreshSearchIfNeeded();
}

/** Delete a remote node without emitting events or pushing history. */
export function deleteRemoteNode(engine: SpatialEngine, id: string): void {
  engine._refusedRemoteIds.delete(id);
  engine._suppressEvents = true;
  const node = engine.nodes.get(id);
  if (node) {
    engine.quadTree.remove(node);
    engine.nodes.delete(id);
    engine.selection.delete(id);
    engine.adjacency.delete(id);
    engine.pruneNodeResidue(id);
    engine.frameChildren.delete(id);
    for (const children of engine.frameChildren.values()) children.delete(id);

    // Cascade: delete edges connected to this node
    for (const [edgeId, edgeNode] of engine.nodes) {
      const data = edgeEndpoints(edgeNode);
      if (data) {
        if (data.fromId === id || data.toId === id) {
          const edge = engine.nodes.get(edgeId);
          if (edge) engine.quadTree.remove(edge);
          engine.nodes.delete(edgeId);
          engine.selection.delete(edgeId);
          engine.pruneNodeResidue(edgeId);
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
  const existing = engine.nodes.get(id);
  if (!existing) return;
  const updated = mergeNodePatch(existing, props);
  if (!isAdmissibleNode(updated)) {
    warnRefusedEdges("applyRemoteNodeUpdate", [id]);
    return;
  }
  engine._suppressEvents = true;
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
  engine._suppressEvents = false;
}
