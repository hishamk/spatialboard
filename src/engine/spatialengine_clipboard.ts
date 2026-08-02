// spatialengine_clipboard.ts — duplicate / copy / cut / paste / template operations
// for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import { nanoid } from "nanoid";
import type { SpatialNode } from "./types";
import { TEMPLATES } from "../templates/index";
import { screenToCanvas } from "./viewport";
import type { SpatialEngine } from "./SpatialEngine";

export function duplicateSelected(engine: SpatialEngine): void {
  if (engine.readOnly) return;
  if (engine.selection.size === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  const offset = 20;
  const idMap = new Map<string, string>();
  const newNodes: SpatialNode[] = [];
  for (const id of engine.selection) {
    const orig = engine.nodes.get(id);
    if (!orig) continue;
    const newId = nanoid();
    idMap.set(orig.id, newId);
    newNodes.push({
      ...JSON.parse(JSON.stringify(orig)),
      id: newId,
      x: orig.x + offset,
      y: orig.y + offset,
      z: engine.nextZValue++,
      locked: undefined,
    });
  }
  // Remap edge references
  for (const node of newNodes) {
    if (node.type === "edge" && node.data) {
      const data = node.data as { fromId: string; toId: string };
      if (idMap.has(data.fromId)) data.fromId = idMap.get(data.fromId)!;
      if (idMap.has(data.toId)) data.toId = idMap.get(data.toId)!;
    }
  }
  // Remap groupId references and groupParent hierarchy
  const groupIdMap = new Map<string, string>();
  for (const node of newNodes) {
    if (node.groupId) {
      if (!groupIdMap.has(node.groupId)) groupIdMap.set(node.groupId, nanoid(10));
      node.groupId = groupIdMap.get(node.groupId)!;
    }
  }
  // Remap groupParent for duplicated groups
  for (const [oldChild, oldParent] of engine.groupParent) {
    if (groupIdMap.has(oldChild) && groupIdMap.has(oldParent)) {
      engine.linkGroupParent(groupIdMap.get(oldChild)!, groupIdMap.get(oldParent)!);
    }
  }

  engine.addNodes(newNodes); // Uses built-in addNodes which handles QuadTree

  engine.selection = new Set(newNodes.map((n) => n.id));
  engine.emit("change");
  engine.emit("selection");
  engine.emit("history");
}

export function copySelected(engine: SpatialEngine): void {
  if (engine.selection.size === 0) return;
  // Protected nodes (deletable === false) are singletons by intent — excluding
  // them from the clipboard prevents paste from minting an undeletable copy.
  // An all-protected selection copies nothing (and keeps the prior clipboard).
  const copyable = Array.from(engine.selection).filter(
    (id) => engine.nodes.get(id)?.deletable !== false,
  );
  if (copyable.length === 0) return;
  engine.clipboard = copyable.map((id) => {
    const node = engine.nodes.get(id)!;
    return JSON.parse(JSON.stringify(node));
  });
  engine.pasteCount = 0;
}

export function cutSelected(engine: SpatialEngine): void {
  engine.copySelected();
  engine.deleteSelected();
}

export function pasteClipboard(engine: SpatialEngine, canvasX?: number, canvasY?: number): void {
  if (engine.readOnly) return;
  if (engine.clipboard.length === 0) return;
  engine.pasteCount++;

  // Compute bounding box center of clipboard items
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const orig of engine.clipboard) {
    const h = orig.h === "auto" ? 100 : (orig.h as number);
    if (orig.x < minX) minX = orig.x;
    if (orig.y < minY) minY = orig.y;
    if (orig.x + orig.w > maxX) maxX = orig.x + orig.w;
    if (orig.y + h > maxY) maxY = orig.y + h;
  }
  const clipCenterX = (minX + maxX) / 2;
  const clipCenterY = (minY + maxY) / 2;

  // Target center: explicit position, or viewport center
  let targetX: number, targetY: number;
  if (canvasX !== undefined && canvasY !== undefined) {
    targetX = canvasX;
    targetY = canvasY;
  } else {
    // Viewport center in canvas space
    const win = engine.getWindow();
    const screenCX = win.innerWidth / 2;
    const screenCY = win.innerHeight / 2;
    const center = screenToCanvas(engine.viewport, screenCX, screenCY);
    targetX = center.x;
    targetY = center.y;
  }

  // Cascading offset for repeated pastes
  const cascade = engine.pasteCount * 20;
  const dx = targetX - clipCenterX + cascade;
  const dy = targetY - clipCenterY + cascade;

  const idMap = new Map<string, string>();
  const newNodes: SpatialNode[] = engine.clipboard.map((orig) => {
    const newId = nanoid();
    idMap.set(orig.id, newId);
    const copied = structuredClone(orig) as SpatialNode;
    return {
      ...copied,
      id: newId,
      x: orig.x + dx,
      y: orig.y + dy,
      z: engine.nextZValue++,
      locked: undefined,
    };
  });
  // Remap edge references
  for (const node of newNodes) {
    if (node.type === "edge" && node.data) {
      const data = node.data as { fromId: string; toId: string };
      if (idMap.has(data.fromId)) data.fromId = idMap.get(data.fromId)!;
      if (idMap.has(data.toId)) data.toId = idMap.get(data.toId)!;
    }
  }
  // Remap groupId references and groupParent hierarchy
  const groupIdMap = new Map<string, string>();
  for (const node of newNodes) {
    if (node.groupId) {
      if (!groupIdMap.has(node.groupId)) groupIdMap.set(node.groupId, nanoid(10));
      node.groupId = groupIdMap.get(node.groupId)!;
    }
  }
  for (const [oldChild, oldParent] of engine.groupParent) {
    if (groupIdMap.has(oldChild) && groupIdMap.has(oldParent)) {
      engine.linkGroupParent(groupIdMap.get(oldChild)!, groupIdMap.get(oldParent)!);
    }
  }
  engine.addNodes(newNodes);
  engine.selectMultiple(newNodes.map((n) => n.id));
}

export function applyTemplate(engine: SpatialEngine, templateId: string, cx: number, cy: number): void {
  const template = TEMPLATES.find((t) => t.id === templateId);
  if (!template) return;
  insertNodesAt(engine, template.nodes, cx, cy);
}

/**
 * Insert a CLONE of `nodes` centered at (cx, cy): fresh ids with edge
 * endpoints and group ids remapped, z-order appended on top, selection set to
 * the inserted nodes. Shared by templates and editable-export drops (PNG/SVG
 * files carrying embedded board source).
 */
export function insertNodesAt(engine: SpatialEngine, nodes: SpatialNode[], cx: number, cy: number): void {
  if (nodes.length === 0) return;

  const cloned: SpatialNode[] = structuredClone(nodes);
  const idMap = new Map<string, string>();

  // Remap all node IDs
  for (const node of cloned) {
    const newId = nanoid(10);
    idMap.set(node.id, newId);
    node.id = newId;
  }

  // Remap edge fromId/toId references
  for (const node of cloned) {
    if (node.type === "edge" && node.data) {
      const data = node.data as { fromId: string; toId: string };
      if (idMap.has(data.fromId)) data.fromId = idMap.get(data.fromId)!;
      if (idMap.has(data.toId)) data.toId = idMap.get(data.toId)!;
    }
    // Remap groupId if present
    if (node.groupId && idMap.has(node.groupId)) {
      node.groupId = idMap.get(node.groupId)!;
    }
  }

  // Compute bounding box center of non-edge nodes
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of cloned) {
    if (n.type === "edge") continue;
    const h = n.h === "auto" ? 100 : (n.h as number);
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x + n.w);
    maxY = Math.max(maxY, n.y + h);
  }

  // Offset to center at (cx, cy)
  const dx = cx - (minX + maxX) / 2;
  const dy = cy - (minY + maxY) / 2;
  for (const n of cloned) {
    if (n.type !== "edge") {
      n.x += dx;
      n.y += dy;
    }
    n.z = engine.nextZValue++;
  }

  engine.addNodes(cloned);
  engine.selectMultiple(cloned.map((n) => n.id));
}
