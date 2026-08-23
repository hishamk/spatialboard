// spatialengine_serialization.ts — board (de)serialization: SBD (v3) round-trip
// + the internal JSON snapshot/restore for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode, Viewport } from "./types";
import { serializeToSBD } from "../serialization/sbd-serializer";
import { parseSBD } from "../serialization/sbd-parser";
import type { SpatialEngine } from "./SpatialEngine";

export async function toSBD(engine: SpatialEngine): Promise<string> {
  // Reverse frameChildren → childId → frameId so children serialize with
  // parent-relative coordinates (SBD v3). fromSBD resolves them back to
  // absolute and rebuildFrameChildren re-derives membership geometrically.
  const parentByChild = new Map<string, string>();
  for (const [frameId, children] of engine.frameChildren) {
    for (const childId of children) parentByChild.set(childId, frameId);
  }
  return serializeToSBD(engine.getAllNodes(), {
    background: engine.boardBackground,
    originView: engine.originView ?? undefined,
    parentOf: (nodeId) => parentByChild.get(nodeId),
  });
}

export async function fromSBD(engine: SpatialEngine, sbd: string): Promise<void> {
  engine.history.clear();
  engine.nodes.clear();
  engine.groupParent.clear();
  engine.groupChildren.clear();
  const { nodes: parsed, meta } = await parseSBD(sbd);
  if (meta.background) {
    engine.boardBackground = meta.background;
    engine.emit("background");
  }
  if (meta.originView) {
    engine.originView = meta.originView;
  } else {
    engine.originView = null;
  }
  let maxZ = 0;
  let minZ = 0;
  for (const node of parsed) {
    engine.nodes.set(node.id, node);
    if (node.z > maxZ) maxZ = node.z;
    if (node.z < minZ) minZ = node.z;
  }
  engine.rebuildQuadTree();
  // SBD carries no edge AABBs (derived data) — recompute so culling works
  // from the first frame instead of every edge sitting at a zero-rect origin.
  engine.syncAllEdgeBounds();
  engine.rebuildFrameChildren();
  engine.nextZValue = maxZ + 1;
  engine._minZ = minZ;
  engine.selection.clear();
  engine.refreshSearchIfNeeded();
  // Apply origin view if saved, otherwise fit-to-content
  engine.goToOriginView();
  engine.emit("graph:replaced");
  engine.emit("change");
  engine.emit("selection");
  engine.emit("history");
}

export function toJSON(engine: SpatialEngine): object {
  const result: Record<string, unknown> = {
    nodes: Array.from(engine.nodes.entries()),
    viewport: engine.viewport,
  };
  if (engine.groupParent.size > 0) {
    result.groupParent = Array.from(engine.groupParent.entries());
  }
  return result;
}

/** Build a groupParent map from untrusted entries, dropping any edge that
 *  would introduce a cycle. The group-walk loops (selection expansion, etc.)
 *  follow parent links unbounded, so a cyclic chain from a crafted board JSON
 *  would hang the tab; sanitizing at ingress protects every walk at once. */
function sanitizeGroupParent(entries: [string, string][]): Map<string, string> {
  const map = new Map<string, string>();
  for (const [child, parent] of entries) {
    if (child === parent) continue;
    let cur: string | undefined = parent;
    let steps = 0;
    let cyclic = false;
    while (cur !== undefined && steps++ <= entries.length) {
      if (cur === child) { cyclic = true; break; }
      cur = map.get(cur);
    }
    if (!cyclic) map.set(child, parent);
  }
  return map;
}

export function fromJSON(
  engine: SpatialEngine,
  json: { nodes: [string, SpatialNode][]; viewport?: Viewport; groupParent?: [string, string][] },
): void {
  engine.history.clear();
  engine.nodes = new Map(json.nodes);
  engine.groupParent = sanitizeGroupParent(json.groupParent ?? []);
  engine.rebuildGroupChildren();
  engine.rebuildQuadTree();
  engine.syncAllEdgeBounds();
  engine.rebuildFrameChildren();
  if (json.viewport) engine.viewport = json.viewport;
  engine.selection.clear();
  engine.refreshSearchIfNeeded();
  engine.emit("graph:replaced");
  engine.emit("change");
  engine.emit("viewport");
  engine.emit("selection");
  engine.emit("history");
}
