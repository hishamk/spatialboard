// spatialengine_edges.ts — data-flow edge helpers (adjacency lookups + connected
// edge path recomputation) for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode } from "./types";
import { computeEdgePath } from "./edge-geometry";
import type { SpatialEngine } from "./SpatialEngine";

/** Get all edge nodes connected to a given node. */
export function getEdgesForNode(engine: SpatialEngine, nodeId: string): SpatialNode[] {
  const edgeIds = engine.adjacency.get(nodeId);
  if (!edgeIds) return [];
  const result: SpatialNode[] = [];
  for (const eid of edgeIds) {
    const n = engine.nodes.get(eid);
    if (n && n.type === "edge") result.push(n);
  }
  return result;
}

/** Get all edge nodes in the board. */
export function getAllEdges(engine: SpatialEngine): SpatialNode[] {
  const result: SpatialNode[] = [];
  for (const n of engine.nodes.values()) {
    if (n.type === "edge") result.push(n);
  }
  return result;
}

export function updateConnectedEdges(engine: SpatialEngine, nodeId: string): void {
  const edgeIds = engine.adjacency.get(nodeId);
  if (!edgeIds) return;

  for (const edgeId of edgeIds) {
    const edge = engine.nodes.get(edgeId);
    if (!edge || edge.type !== "edge") continue;

    const edgeNode = edge as import("./types").EdgeNode;
    const fromNode = engine.nodes.get(edgeNode.data.fromId);
    const toNode = engine.nodes.get(edgeNode.data.toId);

    if (fromNode && toNode) {
      const pathResult = computeEdgePath(
        fromNode,
        toNode,
        edgeNode.data.edgeType,
        undefined,
        edgeNode.data.sourceHandle,
        edgeNode.data.targetHandle,
        edgeNode.data.midpointOffset,
        edgeNode.data.curveOffset,
        undefined,
        undefined,
        edgeNode.data.sourceT,
        edgeNode.data.targetT,
        edgeNode.data.attachmentGap,
      );

      const newEdge = { ...edgeNode, ...pathResult.bounds };
      engine.nodes.set(edgeId, newEdge);
      engine.quadTree.remove(edgeNode);
      engine.quadTree.insert(newEdge);
    }
  }
}
