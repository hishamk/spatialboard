// spatialengine_zorder.ts — z-order reordering (bring to front / forward,
// send to back / backward) for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode } from "./types";
import type { SpatialEngine } from "./SpatialEngine";

/** AABB overlap test between two nodes. */
function nodesOverlap(engine: SpatialEngine, a: SpatialNode, b: SpatialNode): boolean {
  const ah = engine.resolveHeight(a);
  const bh = engine.resolveHeight(b);
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + bh && a.y + ah > b.y;
}

export function bringToFront(engine: SpatialEngine, ids: string[]): void {
  if (ids.length === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  for (const id of ids) {
    const node = engine.nodes.get(id);
    if (node && !node.locked) engine.nodes.set(id, { ...node, z: engine.nextZValue++ });
  }
  engine.emit("change");
  engine.emit("history");
}

export function sendToBack(engine: SpatialEngine, ids: string[]): void {
  if (ids.length === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  for (let i = ids.length - 1; i >= 0; i--) {
    const node = engine.nodes.get(ids[i]);
    if (node && !node.locked) engine.nodes.set(ids[i], { ...node, z: --engine._minZ });
  }
  engine.emit("change");
  engine.emit("history");
}

export function bringForward(engine: SpatialEngine, ids: string[]): void {
  if (ids.length === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);

  for (const id of ids) {
    const node = engine.nodes.get(id);
    if (!node || node.locked) continue;
    // Find overlapping nodes with higher z (same rendering layer)
    const isEdge = node.type === "edge";
    const candidates: SpatialNode[] = [];
    for (const n of engine.nodes.values()) {
      if (
        n.id !== id &&
        (isEdge ? n.type === "edge" : n.type !== "edge") &&
        n.z >= node.z &&
        nodesOverlap(engine, node, n)
      ) {
        candidates.push(n);
      }
    }
    if (candidates.length === 0) continue;
    // Pick the one with the lowest z among those above (nearest overlapping neighbor)
    candidates.sort((a, b) => a.z - b.z);
    const target = candidates[0];
    const targetNode = engine.nodes.get(target.id)!;
    const curZ = node.z, tgtZ = targetNode.z;
    if (curZ === tgtZ) {
      engine.nodes.set(id, { ...node, z: tgtZ + 1 });
    } else {
      engine.nodes.set(id, { ...node, z: tgtZ });
      engine.nodes.set(target.id, { ...targetNode, z: curZ });
    }
  }

  engine.emit("change");
  engine.emit("history");
}

export function sendBackward(engine: SpatialEngine, ids: string[]): void {
  if (ids.length === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);

  for (const id of ids) {
    const node = engine.nodes.get(id);
    if (!node || node.locked) continue;
    // Find overlapping nodes with lower z (same rendering layer)
    const isEdge = node.type === "edge";
    const candidates: SpatialNode[] = [];
    for (const n of engine.nodes.values()) {
      if (
        n.id !== id &&
        (isEdge ? n.type === "edge" : n.type !== "edge") &&
        n.z <= node.z &&
        nodesOverlap(engine, node, n)
      ) {
        candidates.push(n);
      }
    }
    if (candidates.length === 0) continue;
    // Pick the one with the highest z among those below (nearest overlapping neighbor)
    candidates.sort((a, b) => b.z - a.z);
    const target = candidates[0];
    const targetNode = engine.nodes.get(target.id)!;
    const curZ = node.z, tgtZ = targetNode.z;
    if (curZ === tgtZ) {
      engine.nodes.set(id, { ...node, z: tgtZ - 1 });
    } else {
      engine.nodes.set(id, { ...node, z: tgtZ });
      engine.nodes.set(target.id, { ...targetNode, z: curZ });
    }
  }

  engine.emit("change");
  engine.emit("history");
}
