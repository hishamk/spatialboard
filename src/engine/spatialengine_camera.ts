// spatialengine_camera.ts — viewport pan/zoom/fit/origin + coordinate transforms +
// viewport animation for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.
// The `screenToCanvas`/`canvasToScreen` math primitives from ./viewport are imported
// aliased (vp*) because this shard exports engine-level functions of the same names.

import {
  screenToCanvas as vpScreenToCanvas,
  canvasToScreen as vpCanvasToScreen,
  applyZoom,
  applyZoomFactor,
  clamp,
} from "./viewport";
import { _transitionNone, _transitionPan } from "./spatialengine_presentation";
import type { SpatialEngine } from "./SpatialEngine";

export function pan(engine: SpatialEngine, dx: number, dy: number): void {
  engine.viewport.x += dx;
  engine.viewport.y += dy;
  engine.emit("viewport");
}

export function zoomByWheel(engine: SpatialEngine, delta: number, screenX: number, screenY: number): void {
  engine.viewport = applyZoom(
    engine.viewport,
    delta,
    screenX - engine.containerOffset.x,
    screenY - engine.containerOffset.y
  );
  engine.emit("viewport");
}

export function zoomByFactor(engine: SpatialEngine, factor: number, screenX: number, screenY: number): void {
  engine.viewport = applyZoomFactor(
    engine.viewport,
    factor,
    screenX - engine.containerOffset.x,
    screenY - engine.containerOffset.y,
  );
  engine.emit("viewport");
}

export function zoomTo(engine: SpatialEngine, level: number, anchor?: { x: number; y: number }): void {
  const newZoom = clamp(level, 0.1, 5);
  if (anchor) {
    const ax = anchor.x - engine.containerOffset.x;
    const ay = anchor.y - engine.containerOffset.y;
    const canvasPoint = vpScreenToCanvas(engine.viewport, ax, ay);
    engine.viewport = {
      x: ax - canvasPoint.x * newZoom,
      y: ay - canvasPoint.y * newZoom,
      zoom: newZoom,
    };
  } else {
    engine.viewport.zoom = newZoom;
  }
  engine.emit("viewport");
}

export function zoomToNode(engine: SpatialEngine, nodeId: string, targetZoom = 1): void {
  const node = engine.nodes.get(nodeId);
  if (!node) return;
  const h = node.h === "auto" ? 100 : (node.h as number);
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;
  const win = engine.getWindow();
  const screenW = win.innerWidth;
  const screenH = win.innerHeight;
  const newZoom = clamp(targetZoom, 0.2, 5);
  engine.viewport = {
    x: screenW / 2 - cx * newZoom,
    y: screenH / 2 - cy * newZoom,
    zoom: newZoom,
  };
  engine.emit("viewport");
}

export function setContainerSize(engine: SpatialEngine, w: number, h: number): void {
  const oldW = engine._containerWidth;
  const oldH = engine._containerHeight;
  engine._containerWidth = w;
  engine._containerHeight = h;
  // Re-center the current slide when the container resizes during presentation
  if (engine.presentationMode && engine.presentationSlides.length > 0) {
    engine.presentationGoTo(engine.presentationIndex);
  } else if (oldW > 0 && oldH > 0) {
    // Maintain the visual center when the container resizes (e.g. panel split)
    engine.viewport.x += (w - oldW) / 2;
    engine.viewport.y += (h - oldH) / 2;
    engine.emit("viewport");
  }
}

/** The viewport that frames a bounding box (minX..maxY) with padding, or null
 *  when the box is empty. Shared by the instant + animated fit methods. */
function _boundsViewport(
  engine: SpatialEngine,
  minX: number, minY: number, maxX: number, maxY: number, padding: number,
): { x: number; y: number; zoom: number } | null {
  // Reject non-finite or degenerate boxes — a single node with a non-finite
  // dimension (e.g. w="1e400" in a hostile board) would otherwise poison the
  // viewport with NaN/Infinity and break every subsequent transform.
  if (
    !Number.isFinite(minX) || !Number.isFinite(minY) ||
    !Number.isFinite(maxX) || !Number.isFinite(maxY) ||
    maxX < minX || maxY < minY
  ) {
    return null;
  }
  minX -= padding; minY -= padding; maxX += padding; maxY += padding;
  const contentW = maxX - minX;
  const contentH = maxY - minY;
  const screenW = engine._containerWidth;
  const screenH = engine._containerHeight;
  const zoom = clamp(Math.min(screenW / contentW, screenH / contentH), 0.1, 5);
  return {
    x: (screenW - contentW * zoom) / 2 - minX * zoom,
    y: (screenH - contentH * zoom) / 2 - minY * zoom,
    zoom,
  };
}

/** The fit-to-all-content target viewport (null when the board is empty). */
function _contentViewport(engine: SpatialEngine): { x: number; y: number; zoom: number } | null {
  if (engine.nodes.size === 0) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const node of engine.nodes.values()) {
    const h = node.h === "auto" ? 100 : node.h;
    if (node.x < minX) minX = node.x;
    if (node.y < minY) minY = node.y;
    if (node.x + node.w > maxX) maxX = node.x + node.w;
    if (node.y + h > maxY) maxY = node.y + h;
  }
  return _boundsViewport(engine, minX, minY, maxX, maxY, 50);
}

/** The fit-to-subset target viewport (null when no node id is found). Edges
 *  are skipped (no meaningful box). */
function _nodesViewport(engine: SpatialEngine, ids: readonly string[]): { x: number; y: number; zoom: number } | null {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let found = 0;
  for (const id of ids) {
    const node = engine.nodes.get(id);
    if (!node || node.type === "edge") continue;
    const h = node.h === "auto" ? 100 : (node.h as number);
    if (node.x < minX) minX = node.x;
    if (node.y < minY) minY = node.y;
    if (node.x + node.w > maxX) maxX = node.x + node.w;
    if (node.y + h > maxY) maxY = node.y + h;
    found++;
  }
  if (found === 0) return null;
  return _boundsViewport(engine, minX, minY, maxX, maxY, 60);
}

function _prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Move the camera to `target` — animated (reuses the existing ease-out
 *  `_transitionPan` rAF tween) unless reduced-motion is preferred, in which
 *  case snap instantly (`_transitionNone`). */
function _animateOrSnap(engine: SpatialEngine, target: { x: number; y: number; zoom: number }, durationMs?: number): void {
  if (_prefersReducedMotion()) _transitionNone(engine, target);
  else _transitionPan(engine, target, durationMs ?? 380);
}

export function fitToContent(engine: SpatialEngine): void {
  const v = _contentViewport(engine);
  if (!v) return;
  engine.viewport = v;
  engine.emit("viewport");
}

export function fitToContentAnimated(engine: SpatialEngine, opts?: { durationMs?: number }): void {
  const v = _contentViewport(engine);
  if (!v) return;
  _animateOrSnap(engine, v, opts?.durationMs);
}

export function fitToNodes(engine: SpatialEngine, ids: readonly string[]): void {
  const v = _nodesViewport(engine, ids);
  if (!v) return engine.fitToContent();
  engine.viewport = v;
  engine.emit("viewport");
}

export function fitToNodesAnimated(engine: SpatialEngine, ids: readonly string[], opts?: { durationMs?: number }): void {
  const v = _nodesViewport(engine, ids);
  if (!v) return engine.fitToContentAnimated(opts);
  _animateOrSnap(engine, v, opts?.durationMs);
}

/** Animate the camera to an explicit viewport (ease-out pan tween; snaps when
 *  reduced motion is preferred). Generic building block for chrome like the
 *  smart-zoom toggle, which restores a previously saved viewport. */
export function animateViewportTo(
  engine: SpatialEngine,
  target: { x: number; y: number; zoom: number },
  opts?: { durationMs?: number },
): void {
  if (
    !Number.isFinite(target.x) || !Number.isFinite(target.y) ||
    !Number.isFinite(target.zoom) || target.zoom <= 0
  ) {
    return;
  }
  _animateOrSnap(engine, target, opts?.durationMs);
}

export function fitToRectAnimated(
  engine: SpatialEngine,
  minX: number, minY: number, maxX: number, maxY: number,
  opts?: { durationMs?: number; padding?: number },
): void {
  const v = _boundsViewport(engine, minX, minY, maxX, maxY, opts?.padding ?? 60);
  if (!v) return;
  _animateOrSnap(engine, v, opts?.durationMs);
}

export function centerOnRectAnimated(
  engine: SpatialEngine,
  minX: number, minY: number, maxX: number, maxY: number,
  opts?: { zoom?: number; durationMs?: number; padding?: number; offsetX?: number; offsetY?: number },
): void {
  if (
    !Number.isFinite(minX) || !Number.isFinite(minY) ||
    !Number.isFinite(maxX) || !Number.isFinite(maxY) ||
    maxX <= minX || maxY <= minY
  ) {
    return;
  }
  const screenW = engine._containerWidth;
  const screenH = engine._containerHeight;
  const pad = opts?.padding ?? 60;
  const fitZoom = Math.min(screenW / (maxX - minX + pad * 2), screenH / (maxY - minY + pad * 2));
  const zoom = clamp(Math.min(opts?.zoom ?? engine.viewport.zoom, fitZoom), 0.1, 5);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  _animateOrSnap(
    engine,
    {
      x: screenW / 2 + (opts?.offsetX ?? 0) - cx * zoom,
      y: screenH / 2 + (opts?.offsetY ?? 0) - cy * zoom,
      zoom,
    },
    opts?.durationMs,
  );
}

export function fitToFrame(engine: SpatialEngine, frameId: string): void {
  const frame = engine.nodes.get(frameId);
  if (!frame) return engine.fitToContent();

  const fh = frame.h === "auto" ? 100 : (frame.h as number);
  const padding = 20;
  const contentW = frame.w + padding * 2;
  const contentH = fh + padding * 2;
  const screenW = engine._containerWidth;
  const screenH = engine._containerHeight;

  const zoom = clamp(
    Math.min(screenW / contentW, screenH / contentH),
    0.1,
    5
  );
  engine.viewport = {
    x: (screenW - contentW * zoom) / 2 - (frame.x - padding) * zoom,
    y: (screenH - contentH * zoom) / 2 - (frame.y - padding) * zoom,
    zoom,
  };
  engine.emit("viewport");
}

export function setOriginView(engine: SpatialEngine): void {
  engine.originView = { ...engine.viewport };
  engine.emit("background");
}

export function clearOriginView(engine: SpatialEngine): void {
  engine.originView = null;
  engine.emit("background");
}

export function goToOriginView(engine: SpatialEngine): void {
  if (engine.originView) {
    engine.viewport = { ...engine.originView };
    engine.emit("viewport");
  } else {
    engine.fitToContent();
  }
}

export function screenToCanvas(engine: SpatialEngine, sx: number, sy: number): { x: number; y: number } {
  return vpScreenToCanvas(
    engine.viewport,
    sx - engine.containerOffset.x,
    sy - engine.containerOffset.y
  );
}

export function canvasToScreen(engine: SpatialEngine, cx: number, cy: number): { x: number; y: number } {
  return vpCanvasToScreen(engine.viewport, cx, cy);
}

export function animateViewport(
  engine: SpatialEngine,
  target: { x?: number; y?: number; zoom?: number },
  options?: { duration?: number },
): Promise<void> {
  const duration = options?.duration ?? 400;
  const from = { ...engine.viewport };
  const to = {
    x: target.x ?? engine.viewport.x,
    y: target.y ?? engine.viewport.y,
    zoom: target.zoom ?? engine.viewport.zoom,
  };
  // Zero / negative / NaN duration: snap. The tween divides elapsed by
  // duration, and the first rAF timestamp can equal the captured start time,
  // so duration 0 yields 0/0 = NaN and poisons every subsequent transform.
  if (!(duration > 0)) {
    engine.viewport.x = to.x;
    engine.viewport.y = to.y;
    engine.viewport.zoom = to.zoom;
    engine.emit("viewport");
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      engine.viewport.x = from.x + (to.x - from.x) * ease;
      engine.viewport.y = from.y + (to.y - from.y) * ease;
      engine.viewport.zoom = from.zoom + (to.zoom - from.zoom) * ease;
      engine.emit("viewport");
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(animate);
  });
}

export function animatePanTo(engine: SpatialEngine, cx: number, cy: number, duration?: number): Promise<void> {
  const screenW = engine._containerWidth;
  const screenH = engine._containerHeight;
  return engine.animateViewport(
    { x: screenW / 2 - cx * engine.viewport.zoom, y: screenH / 2 - cy * engine.viewport.zoom },
    { duration },
  );
}

export function animateZoomTo(engine: SpatialEngine, level: number, duration?: number): Promise<void> {
  const clamped = clamp(level, 0.1, 5);
  return engine.animateViewport({ zoom: clamped }, { duration });
}

export function animateZoomToNode(engine: SpatialEngine, nodeId: string, duration?: number): Promise<void> {
  const node = engine.nodes.get(nodeId);
  if (!node) return Promise.reject(new Error(`Node "${nodeId}" not found`));
  const h = engine.resolveHeight(node);
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;
  const screenW = engine._containerWidth;
  const screenH = engine._containerHeight;
  const padding = 80;
  const targetZoom = clamp(
    Math.min(
      (screenW - padding * 2) / Math.max(node.w, 1),
      (screenH - padding * 2) / Math.max(h, 1),
    ),
    0.2,
    5,
  );
  return engine.animateViewport({
    x: screenW / 2 - cx * targetZoom,
    y: screenH / 2 - cy * targetZoom,
    zoom: targetZoom,
  }, { duration });
}
