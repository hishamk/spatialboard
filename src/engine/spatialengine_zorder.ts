// spatialengine_zorder.ts — z-order reordering (bring to front / forward,
// send to back / backward) for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.
//
// The z-order is UNIFIED: nodes and edges share one stack, and the canvas
// renders committed edges inside the DOM layer's stacking context at
// zIndex = z — so "bring the circle above the connector" and "tuck the
// connector under the squiggle" are both just z moves, steerable from either
// side. Edges store zero bounds (geometry derives from their endpoints at
// draw time), so overlap tests use their routed path bounds instead.

import type { EdgeNode, SpatialNode } from "./types";
import type { SpatialEngine } from "./SpatialEngine";
import { computeEdgePath } from "./edge-geometry";

type Bounds = { x: number; y: number; w: number; h: number };

/** Render bounds: node AABB, or the routed path bounds for an edge. */
function renderBounds(engine: SpatialEngine, n: SpatialNode): Bounds | null {
  if (n.type === "edge") {
    const edge = n as EdgeNode;
    const from = engine.nodes.get(edge.data.fromId);
    const to = engine.nodes.get(edge.data.toId);
    if (!from || !to) return null;
    const b = computeEdgePath(
      from, to,
      edge.data.edgeType,
      engine.measuredHeights,
      edge.data.sourceHandle,
      edge.data.targetHandle,
      edge.data.midpointOffset,
      edge.data.curveOffset,
      undefined, undefined,
      edge.data.sourceT,
      edge.data.targetT,
      edge.data.attachmentGap,
    ).bounds;
    // A straight axis-aligned edge has zero-thickness path bounds — pad by the
    // stroke so the overlap test still sees it.
    const pad = Math.max(edge.data.strokeWidth ?? 2, 2) / 2;
    return { x: b.x - pad, y: b.y - pad, w: b.w + pad * 2, h: b.h + pad * 2 };
  }
  return { x: n.x, y: n.y, w: n.w, h: engine.resolveHeight(n) };
}

function boundsOverlap(a: Bounds, b: Bounds): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
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

/** Overlapping neighbors on the requested side of `node` in the unified stack. */
function stepCandidates(
  engine: SpatialEngine,
  node: SpatialNode,
  cmp: (otherZ: number, nodeZ: number) => boolean,
): SpatialNode[] {
  const nb = renderBounds(engine, node);
  if (!nb) return [];
  const candidates: SpatialNode[] = [];
  for (const n of engine.nodes.values()) {
    if (n.id === node.id || !cmp(n.z, node.z)) continue;
    const ob = renderBounds(engine, n);
    if (ob && boundsOverlap(nb, ob)) candidates.push(n);
  }
  return candidates;
}

export function bringForward(engine: SpatialEngine, ids: string[]): void {
  if (ids.length === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);

  for (const id of ids) {
    const node = engine.nodes.get(id);
    if (!node || node.locked) continue;
    const candidates = stepCandidates(engine, node, (oz, nz) => oz >= nz);
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
    const candidates = stepCandidates(engine, node, (oz, nz) => oz <= nz);
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
