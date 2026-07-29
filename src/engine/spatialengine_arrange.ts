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

export function alignSelectedNodes(
  engine: SpatialEngine,
  mode: SelectionAlignMode,
  measuredHeights?: Record<string, number>,
): void {
  const nodes: SpatialNode[] = [];
  for (const id of engine.selection) {
    const n = engine.nodes.get(id);
    if (!n || n.type === "edge" || n.locked) continue;
    nodes.push(n);
  }
  if (nodes.length < 2) return;

  const hOf = (n: SpatialNode) =>
    n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : (n.h as number);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const n of nodes) {
    const h = hOf(n);
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x + n.w);
    maxY = Math.max(maxY, n.y + h);
  }
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  const updates: Array<{ id: string; patch: Partial<SpatialNode> }> = [];
  for (const n of nodes) {
    const h = hOf(n);
    let nx = n.x;
    let ny = n.y;
    switch (mode) {
      case "left":
        nx = minX;
        break;
      case "right":
        nx = maxX - n.w;
        break;
      case "centerH":
        nx = midX - n.w / 2;
        break;
      case "top":
        ny = minY;
        break;
      case "bottom":
        ny = maxY - h;
        break;
      case "centerV":
        ny = midY - h / 2;
        break;
    }
    if (nx !== n.x || ny !== n.y) {
      updates.push({ id: n.id, patch: { x: nx, y: ny } });
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
  const nodes: SpatialNode[] = [];
  for (const id of engine.selection) {
    const n = engine.nodes.get(id);
    if (!n || n.type === "edge" || n.locked) continue;
    nodes.push(n);
  }
  if (nodes.length < 2) return;

  const hOf = (n: SpatialNode) =>
    n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : (n.h as number);

  const updates: Array<{ id: string; patch: Partial<SpatialNode> }> = [];

  if (axis === "horizontal") {
    const sorted = [...nodes].sort((a, b) => a.x - b.x || a.id.localeCompare(b.id));
    let minL = Infinity;
    let maxR = -Infinity;
    let sumW = 0;
    for (const n of sorted) {
      minL = Math.min(minL, n.x);
      maxR = Math.max(maxR, n.x + n.w);
      sumW += n.w;
    }
    const span = maxR - minL;
    const slack = span - sumW;
    const gap =
      slack >= 0 ? slack / (sorted.length - 1) : 0;
    const startX = slack >= 0 ? minL : minL + (span - sumW) / 2;
    let cur = startX;
    for (const n of sorted) {
      const nx = cur;
      cur += n.w + gap;
      if (nx !== n.x) updates.push({ id: n.id, patch: { x: nx } });
    }
  } else {
    const sorted = [...nodes].sort(
      (a, b) => a.y - b.y || a.id.localeCompare(b.id),
    );
    let minT = Infinity;
    let maxB = -Infinity;
    let sumH = 0;
    for (const n of sorted) {
      const h = hOf(n);
      minT = Math.min(minT, n.y);
      maxB = Math.max(maxB, n.y + h);
      sumH += h;
    }
    const span = maxB - minT;
    const slack = span - sumH;
    const gap =
      slack >= 0 ? slack / (sorted.length - 1) : 0;
    const startY = slack >= 0 ? minT : minT + (span - sumH) / 2;
    let cur = startY;
    for (const n of sorted) {
      const h = hOf(n);
      const ny = cur;
      cur += h + gap;
      if (ny !== n.y) updates.push({ id: n.id, patch: { y: ny } });
    }
  }

  if (updates.length === 0) return;
  engine.batchUpdateWithHistory(updates);
}
