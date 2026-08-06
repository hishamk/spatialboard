// spatialengine_arrange.ts — flip / auto-arrange / align / distribute operations
// for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialNode, DrawNode, ShapeNode, ImageNode } from "./types";
import { computeSelectionArrangement } from "./arrange-selection";
import type {
  SpatialEngine,
  SelectionAlignMode,
  SelectionDistributeAxis,
} from "./SpatialEngine";

function flipSelected(engine: SpatialEngine, dir: "h" | "v"): void {
  if (engine.selection.size === 0) return;
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);

  for (const id of engine.selection) {
    const node = engine.nodes.get(id);
    if (!node) continue;

    engine.quadTree.remove(node);

    let updatedNode: SpatialNode | null = null;

    // Try registry onFlip first
    const def = engine.registry?.get(node.type);
    if (def?.onFlip) {
      const dataPatch = def.onFlip(node, dir, engine);
      if (dataPatch && Object.keys(dataPatch).length > 0) {
        updatedNode = {
          ...node,
          data: { ...(node.data as Record<string, unknown>), ...dataPatch },
        };
      }
    } else {
      // Legacy fallback for unregistered types
      if (node.type === "draw") {
        const draw = node as DrawNode;
        if (dir === "h") {
          const flipped = draw.data.points.map(
            ([x, y, p]) => [draw.w - x, y, p] as [number, number, number]
          );
          updatedNode = { ...draw, data: { ...draw.data, points: flipped } };
        } else {
          const h = draw.h === "auto" ? 0 : (draw.h as number);
          const flipped = draw.data.points.map(
            ([x, y, p]) => [x, h - y, p] as [number, number, number]
          );
          updatedNode = { ...draw, data: { ...draw.data, points: flipped } };
        }
      } else if (node.type === "shape") {
        const shape = node as ShapeNode;
        if (shape.data.shape === "arrow" || shape.data.shape === "line") {
          if (shape.data.startPoint && shape.data.endPoint) {
            if (dir === "h") {
              const newStart: [number, number] = [shape.w - shape.data.startPoint[0], shape.data.startPoint[1]];
              const newEnd: [number, number] = [shape.w - shape.data.endPoint[0], shape.data.endPoint[1]];
              updatedNode = { ...shape, data: { ...shape.data, startPoint: newStart, endPoint: newEnd } };
            } else {
              const h = shape.h === "auto" ? 0 : (shape.h as number);
              const newStart: [number, number] = [shape.data.startPoint[0], h - shape.data.startPoint[1]];
              const newEnd: [number, number] = [shape.data.endPoint[0], h - shape.data.endPoint[1]];
              updatedNode = { ...shape, data: { ...shape.data, startPoint: newStart, endPoint: newEnd } };
            }
          } else {
            updatedNode = dir === "h"
              ? { ...shape, rotation: -(shape.rotation || 0) + 180 }
              : { ...shape, rotation: -(shape.rotation || 0) };
          }
        }
      } else if (node.type === "image") {
        const img = node as ImageNode;
        updatedNode = dir === "h"
          ? { ...img, data: { ...img.data, flipH: !img.data.flipH } }
          : { ...img, data: { ...img.data, flipV: !img.data.flipV } };
      }
    }

    if (updatedNode) {
      engine.nodes.set(id, updatedNode);
      engine.quadTree.insert(updatedNode);
      engine.emit("node:flip", updatedNode, dir);
    } else {
      engine.quadTree.insert(node);
    }
  }
  engine.emit("change");
  engine.emit("history");
}

export function flipSelectedHorizontal(engine: SpatialEngine): void {
  flipSelected(engine, "h");
}

export function flipSelectedVertical(engine: SpatialEngine): void {
  flipSelected(engine, "v");
}

export function arrangeSelectedNodes(
  engine: SpatialEngine,
  measuredHeights?: Record<string, number>,
  labelLayoutZoom = 1,
): void {
  if (engine.readOnly) return;
  const updates = computeSelectionArrangement(
    engine.getAllNodes(),
    engine.selection,
    measuredHeights ?? engine._measuredHeights,
    engine.gridSize,
    engine.registry,
    labelLayoutZoom,
  );
  if (updates.length === 0) return;
  engine.batchUpdateWithHistory(
    updates.map((u) => ({ id: u.id, patch: { x: u.x, y: u.y } })),
  );
}

export function arrangeAllNodes(
  engine: SpatialEngine,
  measuredHeights?: Record<string, number>,
  labelLayoutZoom = 1,
): void {
  if (engine.readOnly) return;
  const ids = new Set(
    engine.getAllNodes()
      .filter((n) => n.type !== "edge" && !n.locked)
      .map((n) => n.id),
  );
  const updates = computeSelectionArrangement(
    engine.getAllNodes(),
    ids,
    measuredHeights ?? engine._measuredHeights,
    engine.gridSize,
    engine.registry,
    labelLayoutZoom,
  );
  if (updates.length === 0) return;
  engine.batchUpdateWithHistory(
    updates.map((u) => ({ id: u.id, patch: { x: u.x, y: u.y } })),
  );
}

/** A rigid alignment unit: an ungrouped node alone, or a whole group's
 * members moving together. Align/distribute treat each unit as one object —
 * aligning a selection that includes a group must not scatter its members. */
type ArrangeUnit = {
  nodes: SpatialNode[];
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

/** Cluster the current selection into rigid units: nodes sharing an outermost
 * group form one unit; ungrouped nodes (and direct members of the entered
 * group, so drill-down editing still aligns per node) are singletons. */
function selectionUnits(
  engine: SpatialEngine,
  measuredHeights?: Record<string, number>,
): ArrangeUnit[] {
  const hOf = (n: SpatialNode) =>
    n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : (n.h as number);
  const byKey = new Map<string, SpatialNode[]>();
  for (const id of engine.selection) {
    const n = engine.nodes.get(id);
    if (!n || n.type === "edge" || n.locked) continue;
    const gid = engine.getNodeOutermostGroup(n.id);
    const key = gid && gid !== engine.activeGroupId ? `g:${gid}` : `n:${n.id}`;
    const arr = byKey.get(key);
    if (arr) arr.push(n);
    else byKey.set(key, [n]);
  }
  const units: ArrangeUnit[] = [];
  for (const nodes of byKey.values()) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of nodes) {
      const h = hOf(n);
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.w);
      maxY = Math.max(maxY, n.y + h);
    }
    units.push({ nodes, minX, minY, maxX, maxY });
  }
  return units;
}

export function alignSelectedNodes(
  engine: SpatialEngine,
  mode: SelectionAlignMode,
  measuredHeights?: Record<string, number>,
): void {
  const units = selectionUnits(engine, measuredHeights);
  if (units.length < 2) return;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const u of units) {
    minX = Math.min(minX, u.minX);
    minY = Math.min(minY, u.minY);
    maxX = Math.max(maxX, u.maxX);
    maxY = Math.max(maxY, u.maxY);
  }
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  const updates: Array<{ id: string; patch: Partial<SpatialNode> }> = [];
  for (const u of units) {
    let dx = 0;
    let dy = 0;
    switch (mode) {
      case "left":
        dx = minX - u.minX;
        break;
      case "right":
        dx = maxX - u.maxX;
        break;
      case "centerH":
        dx = midX - (u.minX + u.maxX) / 2;
        break;
      case "top":
        dy = minY - u.minY;
        break;
      case "bottom":
        dy = maxY - u.maxY;
        break;
      case "centerV":
        dy = midY - (u.minY + u.maxY) / 2;
        break;
    }
    if (dx === 0 && dy === 0) continue;
    for (const n of u.nodes) {
      updates.push({ id: n.id, patch: { x: n.x + dx, y: n.y + dy } });
    }
  }
  if (updates.length === 0) return;
  engine.batchUpdateWithHistory(updates);
}

export function distributeSelectedNodes(
  engine: SpatialEngine,
  axis: SelectionDistributeAxis,
  measuredHeights?: Record<string, number>,
): void {
  const units = selectionUnits(engine, measuredHeights);
  if (units.length < 2) return;

  const updates: Array<{ id: string; patch: Partial<SpatialNode> }> = [];

  if (axis === "horizontal") {
    const sorted = [...units].sort(
      (a, b) => a.minX - b.minX || a.nodes[0].id.localeCompare(b.nodes[0].id),
    );
    let minL = Infinity;
    let maxR = -Infinity;
    let sumW = 0;
    for (const u of sorted) {
      minL = Math.min(minL, u.minX);
      maxR = Math.max(maxR, u.maxX);
      sumW += u.maxX - u.minX;
    }
    const span = maxR - minL;
    const slack = span - sumW;
    const gap =
      slack >= 0 ? slack / (sorted.length - 1) : 0;
    const startX = slack >= 0 ? minL : minL + (span - sumW) / 2;
    let cur = startX;
    for (const u of sorted) {
      const dx = cur - u.minX;
      cur += (u.maxX - u.minX) + gap;
      if (dx === 0) continue;
      for (const n of u.nodes) {
        updates.push({ id: n.id, patch: { x: n.x + dx } });
      }
    }
  } else {
    const sorted = [...units].sort(
      (a, b) => a.minY - b.minY || a.nodes[0].id.localeCompare(b.nodes[0].id),
    );
    let minT = Infinity;
    let maxB = -Infinity;
    let sumH = 0;
    for (const u of sorted) {
      minT = Math.min(minT, u.minY);
      maxB = Math.max(maxB, u.maxY);
      sumH += u.maxY - u.minY;
    }
    const span = maxB - minT;
    const slack = span - sumH;
    const gap =
      slack >= 0 ? slack / (sorted.length - 1) : 0;
    const startY = slack >= 0 ? minT : minT + (span - sumH) / 2;
    let cur = startY;
    for (const u of sorted) {
      const dy = cur - u.minY;
      cur += (u.maxY - u.minY) + gap;
      if (dy === 0) continue;
      for (const n of u.nodes) {
        updates.push({ id: n.id, patch: { y: n.y + dy } });
      }
    }
  }

  if (updates.length === 0) return;
  engine.batchUpdateWithHistory(updates);
}
