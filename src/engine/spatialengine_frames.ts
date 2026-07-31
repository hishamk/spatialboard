// spatialengine_frames.ts — frame/container membership tracking (which nodes live
// inside which frame, including nested frames) for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode } from "./types";
import type { SpatialEngine } from "./SpatialEngine";

/** Returns all non-edge nodes fully contained within a frame's bounds (including nested frames). */
export function getNodesInsideFrame(engine: SpatialEngine, frameId: string): SpatialNode[] {
  const frame = engine.nodes.get(frameId);
  if (!frame || !engine._containerTypes.has(frame.type)) return [];
  const fh = engine.resolveHeight(frame);
  const results: SpatialNode[] = [];
  for (const node of engine.nodes.values()) {
    if (node.id === frameId || node.type === "edge") continue;
    const nh = engine.resolveHeight(node);
    if (
      node.x >= frame.x &&
      node.y >= frame.y &&
      node.x + node.w <= frame.x + frame.w &&
      node.y + nh <= frame.y + fh
    ) {
      results.push(node);
    }
  }
  return results;
}

/** Returns tracked frame children (nodes explicitly added to the frame). */
export function getFrameChildren(engine: SpatialEngine, frameId: string): SpatialNode[] {
  const childIds = engine.frameChildren.get(frameId);
  if (!childIds) return [];
  const results: SpatialNode[] = [];
  for (const id of childIds) {
    const node = engine.nodes.get(id);
    if (node) results.push(node);
  }
  return results;
}

/** Returns IDs of all descendants of a frame (children, grandchildren, etc.). */
export function getFrameDescendantIds(engine: SpatialEngine, frameId: string): Set<string> {
  const result = new Set<string>();
  const visit = (fid: string) => {
    const childIds = engine.frameChildren.get(fid);
    if (!childIds) return;
    for (const id of childIds) {
      if (result.has(id)) continue; // prevent infinite loops
      result.add(id);
      // If this child is also a frame, recurse into it
      const node = engine.nodes.get(id);
      if (node && engine._containerTypes.has(node.type)) visit(id);
    }
  };
  visit(frameId);
  return result;
}

/** Rebuild frameChildren from spatial containment. Called on load/undo/redo.
 *  Each node is assigned only to its smallest containing frame. */
export function rebuildFrameChildren(engine: SpatialEngine): void {
  engine.frameChildren.clear();

  // Collect all frames sorted by area (smallest first)
  const frames: { node: SpatialNode; area: number }[] = [];
  for (const node of engine.nodes.values()) {
    if (!engine._containerTypes.has(node.type)) continue;
    const fh = engine.resolveHeight(node);
    frames.push({ node, area: node.w * fh });
  }
  frames.sort((a, b) => a.area - b.area);

  // Track which nodes are already assigned to a frame
  const assigned = new Set<string>();

  // Process smallest frames first — their children won't be claimed by larger frames
  for (const { node: frame } of frames) {
    const inside = engine.getNodesInsideFrame(frame.id);
    const directChildren = inside.filter((n) => !assigned.has(n.id));
    if (directChildren.length > 0) {
      const set = new Set<string>();
      for (const child of directChildren) {
        set.add(child.id);
        assigned.add(child.id);
      }
      engine.frameChildren.set(frame.id, set);
    }
  }
}

/** After nodes are moved, update which frames they belong to.
 *  Each node is assigned only to its smallest containing frame.
 *  Frames can be nested inside other frames (but not inside themselves or their descendants). */
export function updateFrameMembership(engine: SpatialEngine, nodeIds: string[]): void {
  if (engine.readOnly) return;
  for (const nodeId of nodeIds) {
    const node = engine.nodes.get(nodeId);
    if (!node || node.type === "edge") continue;
    const nh = engine.resolveHeight(node);

    // Remove from any frame it's no longer inside
    for (const [frameId, children] of engine.frameChildren) {
      if (!children.has(nodeId)) continue;
      const frame = engine.nodes.get(frameId);
      if (!frame) { children.delete(nodeId); continue; }
      const fh = engine.resolveHeight(frame);
      const inside =
        node.x >= frame.x &&
        node.y >= frame.y &&
        node.x + node.w <= frame.x + frame.w &&
        node.y + nh <= frame.y + fh;
      if (!inside) children.delete(nodeId);
    }

    // For frames, collect their descendants to prevent circular nesting
    let descendantIds: Set<string> | undefined;
    if (engine._containerTypes.has(node.type)) {
      descendantIds = engine.getFrameDescendantIds(nodeId);
    }

    // Find the smallest containing frame via QuadTree spatial query
    let bestFrame: SpatialNode | null = null;
    let bestArea = Infinity;
    const frameCandidates = engine.quadTree.retrieve([], { x: node.x, y: node.y, w: node.w, h: nh });
    for (const frame of frameCandidates) {
      if (!engine._containerTypes.has(frame.type) || frame.id === nodeId) continue;
      // Prevent circular nesting: don't nest a frame inside its own descendant
      if (descendantIds?.has(frame.id)) continue;
      const fh = engine.resolveHeight(frame);
      const inside =
        node.x >= frame.x &&
        node.y >= frame.y &&
        node.x + node.w <= frame.x + frame.w &&
        node.y + nh <= frame.y + fh;
      if (inside) {
        const area = frame.w * fh;
        if (area < bestArea) {
          bestArea = area;
          bestFrame = frame;
        }
      }
    }

    // Remove from all frames first, then add only to the smallest
    for (const [, children] of engine.frameChildren) {
      children.delete(nodeId);
    }
    if (bestFrame) {
      if (!engine.frameChildren.has(bestFrame.id)) engine.frameChildren.set(bestFrame.id, new Set());
      engine.frameChildren.get(bestFrame.id)!.add(nodeId);
    }
  }
}

/** Sync frame children after resize: remove nodes no longer inside, add newly contained nodes. */
export function syncFrameChildrenAfterResize(engine: SpatialEngine, frameId: string): void {
  const frame = engine.nodes.get(frameId);
  if (!frame || !engine._containerTypes.has(frame.type)) return;
  // Rebuild from spatial containment for this frame
  const inside = engine.getNodesInsideFrame(frameId);
  if (inside.length > 0) {
    engine.frameChildren.set(frameId, new Set(inside.map((n) => n.id)));
  } else {
    engine.frameChildren.delete(frameId);
  }
}

/** Adopt all existing nodes that are spatially inside a newly created frame. */
export function adoptNodesIntoNewFrame(engine: SpatialEngine, frameId: string): void {
  const children = engine.getNodesInsideFrame(frameId);
  if (children.length > 0) {
    const set = new Set<string>();
    for (const child of children) set.add(child.id);
    engine.frameChildren.set(frameId, set);
  }
}
