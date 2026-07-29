// spatialengine_snapping.ts — grid snap + smart-guide computation for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialEngine, AlignGuide } from "./SpatialEngine";

export interface DragSnapContext {
  staticNodes: Array<{ x: number; y: number; w: number; h: number }>;
}

/** Compute alignment guides between a drag bounding box and static nodes. */
function computeAlignGuidesInternal(
  dragBox: { x: number; y: number; w: number; h: number },
  staticNodes: Array<{ x: number; y: number; w: number; h: number }>,
  threshold: number,
): { guides: AlignGuide[]; snapDx: number; snapDy: number } {
  const dLeft = dragBox.x, dCx = dragBox.x + dragBox.w / 2, dRight = dragBox.x + dragBox.w;
  const dTop = dragBox.y, dCy = dragBox.y + dragBox.h / 2, dBottom = dragBox.y + dragBox.h;
  const dragXEdges = [dLeft, dCx, dRight];
  const dragYEdges = [dTop, dCy, dBottom];

  let bestSnapDx = Infinity;
  let bestSnapDy = Infinity;
  const rawGuides: AlignGuide[] = [];

  for (const sn of staticNodes) {
    const sLeft = sn.x, sCx = sn.x + sn.w / 2, sRight = sn.x + sn.w;
    const sTop = sn.y, sCy = sn.y + sn.h / 2, sBottom = sn.y + sn.h;
    const staticXEdges = [sLeft, sCx, sRight];
    const staticYEdges = [sTop, sCy, sBottom];

    for (const dv of dragXEdges) {
      for (const sv of staticXEdges) {
        const diff = sv - dv;
        if (Math.abs(diff) <= threshold) {
          if (Math.abs(diff) < Math.abs(bestSnapDx)) bestSnapDx = diff;
          rawGuides.push({
            axis: 'x',
            position: sv,
            start: Math.min(dragBox.y, dragBox.y + dragBox.h, sn.y, sn.y + sn.h),
            end: Math.max(dragBox.y, dragBox.y + dragBox.h, sn.y, sn.y + sn.h),
          });
        }
      }
    }

    for (const dv of dragYEdges) {
      for (const sv of staticYEdges) {
        const diff = sv - dv;
        if (Math.abs(diff) <= threshold) {
          if (Math.abs(diff) < Math.abs(bestSnapDy)) bestSnapDy = diff;
          rawGuides.push({
            axis: 'y',
            position: sv,
            start: Math.min(dragBox.x, dragBox.x + dragBox.w, sn.x, sn.x + sn.w),
            end: Math.max(dragBox.x, dragBox.x + dragBox.w, sn.x, sn.x + sn.w),
          });
        }
      }
    }
  }

  const merged = new Map<string, AlignGuide>();
  for (const g of rawGuides) {
    const key = `${g.axis}:${g.position.toFixed(1)}`;
    const existing = merged.get(key);
    if (existing) {
      existing.start = Math.min(existing.start, g.start);
      existing.end = Math.max(existing.end, g.end);
    } else {
      merged.set(key, { ...g });
    }
  }

  return {
    guides: Array.from(merged.values()),
    snapDx: Math.abs(bestSnapDx) <= threshold ? bestSnapDx : 0,
    snapDy: Math.abs(bestSnapDy) <= threshold ? bestSnapDy : 0,
  };
}

export function snap(engine: SpatialEngine, x: number, y: number): { x: number; y: number } {
  if (!engine.snapToGrid) return { x, y };
  return {
    x: Math.round(x / engine.gridSize) * engine.gridSize,
    y: Math.round(y / engine.gridSize) * engine.gridSize,
  };
}

export function createDragSnapContext(engine: SpatialEngine, allDragIds: Set<string> | string[]): DragSnapContext {
  const dragIdSet = allDragIds instanceof Set ? allDragIds : new Set(allDragIds);
  const vx = -engine.viewport.x / engine.viewport.zoom;
  const vy = -engine.viewport.y / engine.viewport.zoom;
  const vw = engine._containerWidth / engine.viewport.zoom;
  const vh = engine._containerHeight / engine.viewport.zoom;
  const staticNodes: Array<{ x: number; y: number; w: number; h: number }> = [];
  const candidates = engine.quadTree.retrieve([], { x: vx, y: vy, w: vw, h: vh });
  for (const n of candidates) {
    if (n.type === "edge" || dragIdSet.has(n.id)) continue;
    const nh = engine.resolveHeight(n);
    staticNodes.push({ x: n.x, y: n.y, w: n.w, h: nh });
  }
  return { staticNodes };
}

export function computeDragSnap(
  engine: SpatialEngine,
  origPositions: Array<{ id: string; x: number; y: number }>,
  allDragIds: Set<string> | string[],
  dx: number,
  dy: number,
  modKey: boolean,
  dragSnapContext?: DragSnapContext,
): { finalDx: number; finalDy: number } {
  const shouldGridSnap = engine.snapToGrid && !modKey;
  const shouldSmartGuide = engine.smartGuides && !modKey;

  let finalDx = dx;
  let finalDy = dy;
  let newGuides: AlignGuide[] = [];
  const dragIdSet = allDragIds instanceof Set ? allDragIds : new Set(allDragIds);

  if (shouldSmartGuide) {
    // Compute bounding box of dragged selection at proposed position
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const orig of origPositions) {
      const n = engine.getNode(orig.id);
      if (!n) continue;
      const nx = orig.x + dx;
      const ny = orig.y + dy;
      const nh = engine.resolveHeight(n);
      minX = Math.min(minX, nx);
      minY = Math.min(minY, ny);
      maxX = Math.max(maxX, nx + n.w);
      maxY = Math.max(maxY, ny + nh);
    }
    const dragBox = { x: minX, y: minY, w: maxX - minX, h: maxY - minY };

    const staticNodes = dragSnapContext?.staticNodes ?? engine.createDragSnapContext(dragIdSet).staticNodes;

    const result = computeAlignGuidesInternal(dragBox, staticNodes, 5);
    newGuides = result.guides;

    if (shouldGridSnap) {
      // Both active: use whichever is closer per axis
      const proposedX = origPositions[0].x + dx;
      const proposedY = origPositions[0].y + dy;
      const gridSnapped = engine.snap(proposedX, proposedY);
      const gridDx = gridSnapped.x - proposedX;
      const gridDy = gridSnapped.y - proposedY;

      const useGuideX = result.snapDx !== 0 && Math.abs(result.snapDx) <= Math.abs(gridDx);
      const useGuideY = result.snapDy !== 0 && Math.abs(result.snapDy) <= Math.abs(gridDy);

      finalDx = dx + (useGuideX ? result.snapDx : gridDx);
      finalDy = dy + (useGuideY ? result.snapDy : gridDy);
      if (!useGuideX) newGuides = newGuides.filter(g => g.axis !== 'x');
      if (!useGuideY) newGuides = newGuides.filter(g => g.axis !== 'y');
    } else {
      finalDx = dx + result.snapDx;
      finalDy = dy + result.snapDy;
    }
  } else if (shouldGridSnap) {
    const snapped = engine.snap(origPositions[0].x + dx, origPositions[0].y + dy);
    finalDx = snapped.x - origPositions[0].x;
    finalDy = snapped.y - origPositions[0].y;
  }

  engine.alignGuides = newGuides;
  engine.emit("guides");
  return { finalDx, finalDy };
}

export function clearAlignGuides(engine: SpatialEngine): void {
  if (engine.alignGuides.length === 0) return;
  engine.alignGuides = [];
  engine.emit("guides");
}
