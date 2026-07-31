// spatialengine_selection.ts — selection (select / toggle / multi / deselect,
// group-aware expansion) + pointer-gesture selection begin/end for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialEngine } from "./SpatialEngine";

/** Expand selection to include all group siblings, walking up the group
 *  hierarchy until the active group (or root) is reached. */
export function expandSelectionToGroups(engine: SpatialEngine): void {
  // For each selected node, walk up to the outermost group (stopping at activeGroupId)
  const targetGroupIds = new Set<string>();
  for (const id of engine.selection) {
    const node = engine.nodes.get(id);
    if (!node?.groupId) continue;
    if (engine.activeGroupId && node.groupId === engine.activeGroupId) continue;

    let gid = node.groupId;
    while (true) {
      const parent = engine.groupParent.get(gid);
      if (!parent) break;
      if (engine.activeGroupId && parent === engine.activeGroupId) break;
      gid = parent;
    }
    targetGroupIds.add(gid);
  }
  if (targetGroupIds.size === 0) return;

  // Collect all descendant groupIds of each target via recursive descent
  const allGroupIds = new Set<string>(targetGroupIds);
  const collectDescendantGroups = (gid: string) => {
    const children = engine.groupChildren.get(gid);
    if (!children) return;
    for (const child of children) {
      if (!allGroupIds.has(child)) {
        allGroupIds.add(child);
        collectDescendantGroups(child);
      }
    }
  };
  for (const gid of targetGroupIds) {
    collectDescendantGroups(gid);
  }

  // Select all nodes in any of these groups
  for (const node of engine.nodes.values()) {
    if (node.groupId && allGroupIds.has(node.groupId)) {
      engine.selection.add(node.id);
    }
  }
}

export function select(engine: SpatialEngine, id: string): void {
  // Emit deselect for previously selected nodes
  for (const prevId of engine.selection) {
    const prevNode = engine.nodes.get(prevId);
    if (prevNode) {
      engine.registry?.get(prevNode.type)?.onDeselect?.(prevNode, engine);
      engine.emit("node:deselect", prevNode);
    }
  }
  engine.selection.clear();
  engine.selection.add(id);
  engine.expandSelectionToGroups();
  // Emit select for newly selected nodes
  for (const selId of engine.selection) {
    const node = engine.nodes.get(selId);
    if (node) {
      engine.registry?.get(node.type)?.onSelect?.(node, engine);
      engine.emit("node:select", node);
    }
  }
  engine.emit("selection");
}

export function toggleSelect(engine: SpatialEngine, id: string): void {
  const node = engine.nodes.get(id);
  if (engine.selection.has(id)) {
    // Remove entire group when toggling off
    if (node?.groupId) {
      for (const n of engine.nodes.values()) {
        if (n.groupId === node.groupId) engine.selection.delete(n.id);
      }
    } else {
      engine.selection.delete(id);
    }
  } else {
    engine.selection.add(id);
    engine.expandSelectionToGroups();
  }
  engine.emit("selection");
}

export function selectMultiple(engine: SpatialEngine, ids: string[]): void {
  engine.selection = new Set(ids);
  engine.expandSelectionToGroups();
  engine.emit("selection");
}

export function deselectAll(engine: SpatialEngine): void {
  if (engine.selection.size === 0 && !engine.activeGroupId) return;
  for (const id of engine.selection) {
    const node = engine.nodes.get(id);
    if (node) {
      engine.registry?.get(node.type)?.onDeselect?.(node, engine);
      engine.emit("node:deselect", node);
    }
  }
  engine.selection.clear();
  if (engine.activeGroupId) {
    engine.activeGroupId = null;
    engine.emit('group:exit');
  }
  engine.emit("selection");
}

/**
 * Mark the start of a pointer gesture over the given nodes. While a
 * gesture is active the engine still mutates and emits per frame
 * (collab sync depends on that); only the canvas's whole-board React
 * mirror pauses. Idempotent: beginning while active replaces the id set.
 */
export function beginNodeGesture(engine: SpatialEngine, ids: Iterable<string>): void {
  engine._gestureIds = new Set(ids);
  engine.emit("gesture:start");
}

/** End the active pointer gesture (no-op when idle). */
export function endNodeGesture(engine: SpatialEngine): void {
  if (engine._gestureIds === null) return;
  engine._gestureIds = null;
  engine.emit("gesture:end");
}
