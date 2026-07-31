// spatialengine_groups.ts — grouping + nested-group bookkeeping (group / ungroup,
// group queries, drill-down enter/exit, parent-link maintenance) for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import { nanoid } from "nanoid";
import type { SpatialNode } from "./types";
import type { SpatialEngine } from "./SpatialEngine";

/** Set a groupParent entry and keep groupChildren in sync. */
export function linkGroupParent(engine: SpatialEngine, childId: string, parentId: string): void {
  // Remove old parent link if any
  const oldParent = engine.groupParent.get(childId);
  if (oldParent) {
    engine.groupChildren.get(oldParent)?.delete(childId);
  }
  engine.groupParent.set(childId, parentId);
  let children = engine.groupChildren.get(parentId);
  if (!children) {
    children = new Set();
    engine.groupChildren.set(parentId, children);
  }
  children.add(childId);
}

/** Remove a groupParent entry and keep groupChildren in sync. */
export function unlinkGroupParent(engine: SpatialEngine, childId: string): void {
  const parentId = engine.groupParent.get(childId);
  if (parentId) {
    const children = engine.groupChildren.get(parentId);
    if (children) {
      children.delete(childId);
      if (children.size === 0) engine.groupChildren.delete(parentId);
    }
  }
  engine.groupParent.delete(childId);
}

export function groupSelected(engine: SpatialEngine): void {
  if (engine.readOnly) return;
  if (engine.selection.size < 2) return;
  if (engine.activeGroupId) return; // Can't nest groups while inside one
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  const gid = nanoid(10);

  // Collect existing top-level groupIds of selected nodes
  const existingGroups = new Set<string>();
  for (const id of engine.selection) {
    const node = engine.nodes.get(id);
    if (node?.groupId) {
      // Walk up to the outermost group (the one with no parent)
      let topGid = node.groupId;
      while (engine.groupParent.has(topGid)) topGid = engine.groupParent.get(topGid)!;
      existingGroups.add(topGid);
    }
  }

  if (existingGroups.size > 0) {
    // Map existing top-level groups as children of the new parent group
    for (const childGroup of existingGroups) {
      engine.linkGroupParent(childGroup, gid);
    }
    // Only assign groupId on nodes that don't already belong to a group
    for (const id of engine.selection) {
      const node = engine.nodes.get(id);
      if (node && !node.groupId) {
        engine.nodes.set(id, { ...node, groupId: gid });
      }
    }
  } else {
    // Simple case: no existing groups
    for (const id of engine.selection) {
      const node = engine.nodes.get(id);
      if (node) engine.nodes.set(id, { ...node, groupId: gid });
    }
  }

  engine.emit("change");
  engine.emit("history");
}

export function ungroupSelected(engine: SpatialEngine): void {
  if (engine.readOnly) return;
  if (engine.selection.size === 0) return;

  // Find the outermost group(s) of the selection to ungroup
  const groupIds = new Set<string>();
  for (const id of engine.selection) {
    const node = engine.nodes.get(id);
    if (node?.groupId) {
      // Walk up to the outermost group (or stop at activeGroupId's parent scope)
      let topGid = node.groupId;
      while (engine.groupParent.has(topGid)) {
        const parent = engine.groupParent.get(topGid)!;
        if (parent === engine.activeGroupId) break;
        topGid = parent;
      }
      groupIds.add(topGid);
    }
  }
  if (groupIds.size === 0) return;

  // Exit active group if we're ungrouping it
  if (engine.activeGroupId && groupIds.has(engine.activeGroupId)) {
    engine.activeGroupId = null;
    engine.emit('group:exit');
  }

  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);

  for (const gid of groupIds) {
    const parentGid = engine.groupParent.get(gid);

    // Ungroup direct members of this group
    for (const node of engine.nodes.values()) {
      if (node.groupId === gid) {
        if (parentGid) {
          // Promote to parent group
          engine.nodes.set(node.id, { ...node, groupId: parentGid });
        } else {
          // No parent — fully ungroup
          const { groupId: _, ...rest } = node;
          engine.nodes.set(node.id, rest as SpatialNode);
        }
      }
    }

    // Promote child groups of this group to its parent (or make them top-level)
    const childGroupIds = engine.groupChildren.get(gid);
    if (childGroupIds) {
      for (const child of [...childGroupIds]) {
        if (parentGid) {
          engine.linkGroupParent(child, parentGid);
        } else {
          engine.unlinkGroupParent(child);
        }
      }
    }

    // Remove this group from the hierarchy
    engine.unlinkGroupParent(gid);
    engine.groupChildren.delete(gid);
    engine.groupRotations.delete(gid);
  }

  engine.emit("change");
  engine.emit("history");
}

export function selectionHasGroup(engine: SpatialEngine): boolean {
  for (const id of engine.selection) {
    if (engine.nodes.get(id)?.groupId) return true;
  }
  return false;
}

/** Returns the outermost groupId if all selected nodes belong to the same group tree, else undefined. */
export function selectionGroupId(engine: SpatialEngine): string | undefined {
  if (engine.selection.size < 2) return undefined;
  let topGid: string | undefined;
  for (const id of engine.selection) {
    const node = engine.nodes.get(id);
    if (!node?.groupId) return undefined;
    let gid = node.groupId;
    while (engine.groupParent.has(gid)) gid = engine.groupParent.get(gid)!;
    if (!topGid) topGid = gid;
    else if (gid !== topGid) return undefined;
  }
  return topGid;
}

/** True if all selected nodes belong to exactly one group (possibly nested). */
export function selectionIsSingleGroup(engine: SpatialEngine): boolean {
  if (engine.selection.size < 2) return false;
  let topGid: string | undefined;
  for (const id of engine.selection) {
    const node = engine.nodes.get(id);
    if (!node?.groupId) return false;
    // Walk up to outermost group
    let gid = node.groupId;
    while (engine.groupParent.has(gid)) gid = engine.groupParent.get(gid)!;
    if (!topGid) topGid = gid;
    else if (gid !== topGid) return false;
  }
  return true;
}

export function getGroupMembers(engine: SpatialEngine, groupId: string): SpatialNode[] {
  const members: SpatialNode[] = [];
  for (const node of engine.nodes.values()) {
    if (node.groupId === groupId) members.push(node);
  }
  return members;
}

/** Enter a group for drill-down selection of individual children. */
export function enterGroup(engine: SpatialEngine, groupId: string): void {
  if (engine.activeGroupId === groupId) return;
  engine.activeGroupId = groupId;
  engine.emit('group:enter', groupId);
}

/** Fully exit all group levels and deselect. */
export function exitAllGroups(engine: SpatialEngine): void {
  if (!engine.activeGroupId) return;
  engine.activeGroupId = null;
  engine.emit('group:exit');
}

/** Exit the active group — go up one level for nested groups, or exit entirely. */
export function exitGroup(engine: SpatialEngine): void {
  if (!engine.activeGroupId) return;
  const exitingGid = engine.activeGroupId;
  const parentGid = engine.groupParent.get(exitingGid);

  if (parentGid) {
    // Go up one level — enter the parent group
    engine.activeGroupId = parentGid;
    engine.emit('group:enter', parentGid);
  } else {
    // Exit to top level
    engine.activeGroupId = null;
    engine.emit('group:exit');
  }

  // Re-select: pick any member of the exiting group, then expansion handles the rest
  const members = engine.getGroupMembers(exitingGid);
  if (members.length > 0) {
    engine.selection = new Set([members[0].id]);
    engine.expandSelectionToGroups();
    engine.emit("selection");
  }
}

/** Check if a node belongs to the currently active (entered) group or any of its descendants. */
export function isNodeInActiveGroup(engine: SpatialEngine, nodeId: string): boolean {
  if (!engine.activeGroupId) return false;
  const node = engine.nodes.get(nodeId);
  if (!node?.groupId) return false;
  // Walk up from node's group to see if activeGroupId is an ancestor
  let gid: string | undefined = node.groupId;
  while (gid) {
    if (gid === engine.activeGroupId) return true;
    gid = engine.groupParent.get(gid);
  }
  return false;
}

/** Get the outermost group of a node (stopping at activeGroupId boundary). */
export function getNodeOutermostGroup(engine: SpatialEngine, nodeId: string): string | undefined {
  const node = engine.nodes.get(nodeId);
  if (!node?.groupId) return undefined;
  let gid = node.groupId;
  while (true) {
    const parent = engine.groupParent.get(gid);
    if (!parent) break;
    if (engine.activeGroupId && parent === engine.activeGroupId) break;
    gid = parent;
  }
  return gid;
}

/** Get all nodes that are descendants of a group (direct + nested sub-groups). */
export function getAllGroupDescendantNodes(engine: SpatialEngine, groupId: string): SpatialNode[] {
  const allGroupIds = new Set<string>([groupId]);
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
  collectDescendantGroups(groupId);

  const result: SpatialNode[] = [];
  for (const node of engine.nodes.values()) {
    if (node.groupId && allGroupIds.has(node.groupId)) {
      result.push(node);
    }
  }
  return result;
}
