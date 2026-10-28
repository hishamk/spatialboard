// group-fan.ts — the engine side of picking a member out of a fanned group.

import type { SpatialEngine } from "../../engine/SpatialEngine";

export type FanPositions = ReadonlyMap<string, { x: number; y: number }>;

/**
 * Raise `pickId` above every other member of a fanned group, as one undo step.
 *
 * While fanned, the members sit at transient ring positions written without
 * history. The undo step snapshots the whole graph, so the members are put
 * back at `originals` around it and then returned to the ring, all in one
 * synchronous block: undoing the raise restores the home layout, never the
 * ring. The caller then tweens the members home.
 */
export function raiseFanPick(engine: SpatialEngine, originals: FanPositions, pickId: string): void {
  let maxZ = -Infinity;
  const ring = new Map<string, { x: number; y: number }>();
  for (const id of originals.keys()) {
    const n = engine.getNode(id);
    if (!n) continue;
    maxZ = Math.max(maxZ, n.z);
    ring.set(id, { x: n.x, y: n.y });
  }
  engine.updateMany(Array.from(originals, ([id, p]) => ({ id, patch: p })));
  engine.updateNodeWithHistory(pickId, { z: maxZ + 1 });
  engine.updateMany(Array.from(ring, ([id, p]) => ({ id, patch: p })));
}
