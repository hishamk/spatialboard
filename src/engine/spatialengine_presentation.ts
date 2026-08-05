// spatialengine_presentation.ts — presentation mode + slide transitions for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.
// `_transitionPan` / `_transitionNone` are exported because the camera shard's
// `_animateOrSnap` reuses them for animated fit/center moves.

import { clamp } from "./viewport";
import type { SpatialNode, FrameNode } from "./types";
import type { SpatialEngine } from "./SpatialEngine";

export function enterPresentation(engine: SpatialEngine): void {
  // Collect all frame nodes with their slide order + position
  const frames: Array<{ id: string; x: number; y: number; order?: number }> = [];
  for (const node of engine.nodes.values()) {
    if (node.type === "frame") {
      const data = node.data as { slideOrder?: number };
      frames.push({ id: node.id, x: node.x, y: node.y, order: data.slideOrder });
    }
  }
  if (frames.length === 0) return;

  // Separate frames with explicit order from auto-ordered ones
  const ordered = frames.filter((f) => f.order != null).sort((a, b) => a.order! - b.order!);
  const auto = frames.filter((f) => f.order == null);

  // Sort auto by reading order: group into rows (Y within 100px), then left-to-right
  const ROW_THRESHOLD = 100;
  auto.sort((a, b) => a.y - b.y);
  const rows: Array<typeof auto> = [];
  for (const f of auto) {
    const lastRow = rows[rows.length - 1];
    if (lastRow && Math.abs(f.y - lastRow[0].y) < ROW_THRESHOLD) {
      lastRow.push(f);
    } else {
      rows.push([f]);
    }
  }
  const autoSorted = rows.flatMap((row) => row.sort((a, b) => a.x - b.x));

  // Explicit-order frames first, then auto-ordered
  const sorted = [...ordered, ...autoSorted];

  engine.presentationSlides = sorted.map((f) => f.id);
  engine.presentationIndex = 0;
  engine.presentationMode = true;
  // Clear selection so no handles are visible during presentation
  if (engine.selection.size > 0) {
    engine.selection.clear();
    engine.emit("selection");
  }
  engine.emit("presentation");
  engine.presentationGoTo(0);
}

export function exitPresentation(engine: SpatialEngine): void {
  if (engine._presentationAnimId != null) {
    cancelAnimationFrame(engine._presentationAnimId);
    engine._presentationAnimId = null;
  }
  engine._transitionOverlay = null;
  engine.presentationMode = false;
  engine.presentationSlides = [];
  engine.presentationIndex = 0;
  engine.emit("presentation");
}

export function presentationNext(engine: SpatialEngine): void {
  if (engine.presentationIndex < engine.presentationSlides.length - 1) {
    engine.presentationGoTo(engine.presentationIndex + 1);
  }
}

export function presentationPrev(engine: SpatialEngine): void {
  if (engine.presentationIndex > 0) {
    engine.presentationGoTo(engine.presentationIndex - 1);
  }
}

export function presentationGoTo(engine: SpatialEngine, index: number): void {
  if (index < 0 || index >= engine.presentationSlides.length) return;
  const frameId = engine.presentationSlides[index];
  const frame = engine.nodes.get(frameId);
  if (!frame) {
    engine.exitPresentation();
    return;
  }
  const prevIndex = engine.presentationIndex;
  engine.presentationIndex = index;
  engine.emit("presentation");

  // Cancel any in-progress animation
  if (engine._presentationAnimId != null) {
    cancelAnimationFrame(engine._presentationAnimId);
    engine._presentationAnimId = null;
  }
  engine._transitionOverlay = null;

  const target = _computeSlideViewport(engine, frame);
  const data = frame.data as FrameNode["data"];
  const transition = data.transition ?? "pan";
  const duration = data.transitionDuration; // undefined = use default per type
  const direction: 1 | -1 = index >= prevIndex ? 1 : -1;

  switch (transition) {
    case "none": _transitionNone(engine, target); break;
    case "fade": _transitionFade(engine, target, duration); break;
    case "dissolve": _transitionDissolve(engine, target, duration); break;
    case "zoom": _transitionZoom(engine, target, duration); break;
    case "fold": _transitionFold(engine, target, duration); break;
    case "cube": _transitionCube(engine, target, duration, direction); break;
    case "pan":
    default: _transitionPan(engine, target, duration); break;
  }
}

/** Pending "beat on the source slide" timers for transition previews. */
const _previewTimers = new WeakMap<SpatialEngine, ReturnType<typeof setTimeout>>();

/**
 * Preview the transition INTO a slide WITHOUT entering presentation mode —
 * the frames panel's "test" button. Snaps to the previous slide's view (when
 * given), holds a short beat so the eye settles, then runs the destination
 * frame's own transition: exactly what the audience will see between the two
 * slides. No-op while a real presentation owns the camera.
 */
export function previewSlideTransition(engine: SpatialEngine, toFrameId: string, fromFrameId?: string): void {
  if (engine.presentationMode) return;
  const to = engine.nodes.get(toFrameId);
  if (!to || to.type !== "frame") return;

  const pending = _previewTimers.get(engine);
  if (pending != null) {
    clearTimeout(pending);
    _previewTimers.delete(engine);
  }
  if (engine._presentationAnimId != null) {
    cancelAnimationFrame(engine._presentationAnimId);
    engine._presentationAnimId = null;
  }
  engine._transitionOverlay = null;
  engine.emit("presentation");

  const target = _computeSlideViewport(engine, to);
  const data = to.data as FrameNode["data"];
  const transition = data.transition ?? "pan";
  const duration = data.transitionDuration;

  const run = () => {
    _previewTimers.delete(engine);
    if (engine.presentationMode) return;
    switch (transition) {
      case "none": _transitionNone(engine, target); break;
      case "fade": _transitionFade(engine, target, duration); break;
      case "dissolve": _transitionDissolve(engine, target, duration); break;
      case "zoom": _transitionZoom(engine, target, duration); break;
      case "fold": _transitionFold(engine, target, duration); break;
      case "cube": _transitionCube(engine, target, duration, 1); break;
      case "pan":
      default: _transitionPan(engine, target, duration); break;
    }
  };

  const from = fromFrameId ? engine.nodes.get(fromFrameId) : undefined;
  if (from && from.type === "frame") {
    _transitionNone(engine, _computeSlideViewport(engine, from));
    _previewTimers.set(engine, setTimeout(run, 260));
  } else {
    run();
  }
}

/**
 * Fit a frame to the screen — the same fit presentation slides use (small
 * padding, centered, clamped zoom) — with a smooth pan. Used by slide
 * navigation OUTSIDE presentation mode (frames panel clicks, the console
 * deck's VCR controls).
 */
export function zoomToFrame(engine: SpatialEngine, frameId: string): void {
  const frame = engine.nodes.get(frameId);
  if (!frame || frame.type !== "frame") return;
  _transitionPan(engine, _computeSlideViewport(engine, frame));
}

function _computeSlideViewport(engine: SpatialEngine, frame: SpatialNode): { x: number; y: number; zoom: number } {
  const fh = engine.resolveHeight(frame);
  const padding = 40;
  const fx = frame.x - padding;
  const fy = frame.y - padding;
  const fw = frame.w + padding * 2;
  const ffh = fh + padding * 2;
  const screenW = engine._containerWidth;
  const screenH = engine._containerHeight;
  const targetZoom = clamp(Math.min(screenW / fw, screenH / ffh), 0.1, 5);
  return {
    x: (screenW - fw * targetZoom) / 2 - fx * targetZoom,
    y: (screenH - ffh * targetZoom) / 2 - fy * targetZoom,
    zoom: targetZoom,
  };
}

/** Pan transition: smooth viewport interpolation (default). */
export function _transitionPan(engine: SpatialEngine, target: { x: number; y: number; zoom: number }, durationMs?: number): void {
  const duration = durationMs ?? 400;
  const startTime = performance.now();
  const from = { ...engine.viewport };
  const animate = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    engine.viewport.x = from.x + (target.x - from.x) * ease;
    engine.viewport.y = from.y + (target.y - from.y) * ease;
    engine.viewport.zoom = from.zoom + (target.zoom - from.zoom) * ease;
    engine.emit("viewport");
    if (t < 1) {
      engine._presentationAnimId = requestAnimationFrame(animate);
    } else {
      engine._presentationAnimId = null;
    }
  };
  engine._presentationAnimId = requestAnimationFrame(animate);
}

/** None transition: instant viewport snap. */
export function _transitionNone(engine: SpatialEngine, target: { x: number; y: number; zoom: number }): void {
  engine.viewport.x = target.x;
  engine.viewport.y = target.y;
  engine.viewport.zoom = target.zoom;
  engine.emit("viewport");
}

/** Fade transition: fade to black, snap viewport, fade from black. */
function _transitionFade(engine: SpatialEngine, target: { x: number; y: number; zoom: number }, durationMs?: number): void {
  const halfDuration = (durationMs ?? 500) / 2;
  const startTime = performance.now();

  const fadeOut = (now: number) => {
    const t = Math.min((now - startTime) / halfDuration, 1);
    engine._transitionOverlay = { type: "fade", phase: "out", progress: t };
    engine.emit("presentation");
    if (t < 1) {
      engine._presentationAnimId = requestAnimationFrame(fadeOut);
    } else {
      // At peak darkness, snap viewport
      engine.viewport.x = target.x;
      engine.viewport.y = target.y;
      engine.viewport.zoom = target.zoom;
      engine.emit("viewport");
      // Phase 2: reveal
      const revealStart = performance.now();
      const fadeIn = (now2: number) => {
        const t2 = Math.min((now2 - revealStart) / halfDuration, 1);
        engine._transitionOverlay = { type: "fade", phase: "in", progress: t2 };
        engine.emit("presentation");
        if (t2 < 1) {
          engine._presentationAnimId = requestAnimationFrame(fadeIn);
        } else {
          engine._transitionOverlay = null;
          engine._presentationAnimId = null;
          engine.emit("presentation");
        }
      };
      engine._presentationAnimId = requestAnimationFrame(fadeIn);
    }
  };
  engine._presentationAnimId = requestAnimationFrame(fadeOut);
}

/** Dissolve transition: quick overlay fade, snap viewport at midpoint. */
function _transitionDissolve(engine: SpatialEngine, target: { x: number; y: number; zoom: number }, durationMs?: number): void {
  const duration = durationMs ?? 400;
  const startTime = performance.now();
  let viewportSnapped = false;

  const animate = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    if (t < 0.5) {
      engine._transitionOverlay = { type: "dissolve", phase: "out", progress: t * 2 };
    } else {
      if (!viewportSnapped) {
        engine.viewport.x = target.x;
        engine.viewport.y = target.y;
        engine.viewport.zoom = target.zoom;
        engine.emit("viewport");
        viewportSnapped = true;
      }
      engine._transitionOverlay = { type: "dissolve", phase: "in", progress: (t - 0.5) * 2 };
    }
    engine.emit("presentation");
    if (t < 1) {
      engine._presentationAnimId = requestAnimationFrame(animate);
    } else {
      engine._transitionOverlay = null;
      engine._presentationAnimId = null;
      engine.emit("presentation");
    }
  };
  engine._presentationAnimId = requestAnimationFrame(animate);
}

/** Zoom transition: zoom out from current, zoom into target. */
function _transitionZoom(engine: SpatialEngine, target: { x: number; y: number; zoom: number }, durationMs?: number): void {
  const duration = durationMs ?? 600;
  const startTime = performance.now();
  const from = { ...engine.viewport };

  // Intermediate "pulled back" state
  const midZoom = Math.max(0.1, Math.min(from.zoom, target.zoom) * 0.35);
  const midX = (from.x + target.x) / 2;
  const midY = (from.y + target.y) / 2;

  const animate = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    if (t < 0.5) {
      const p = t * 2;
      const ease = 1 - Math.pow(1 - p, 3);
      engine.viewport.x = from.x + (midX - from.x) * ease;
      engine.viewport.y = from.y + (midY - from.y) * ease;
      engine.viewport.zoom = from.zoom + (midZoom - from.zoom) * ease;
    } else {
      const p = (t - 0.5) * 2;
      const ease = 1 - Math.pow(1 - p, 3);
      engine.viewport.x = midX + (target.x - midX) * ease;
      engine.viewport.y = midY + (target.y - midY) * ease;
      engine.viewport.zoom = midZoom + (target.zoom - midZoom) * ease;
    }
    engine.emit("viewport");
    if (t < 1) {
      engine._presentationAnimId = requestAnimationFrame(animate);
    } else {
      engine._presentationAnimId = null;
    }
  };
  engine._presentationAnimId = requestAnimationFrame(animate);
}

/** Fold transition: two halves fold shut like a book, snap viewport, unfold to reveal. */
function _transitionFold(engine: SpatialEngine, target: { x: number; y: number; zoom: number }, durationMs?: number): void {
  const duration = durationMs ?? 700;
  const startTime = performance.now();
  let viewportSnapped = false;

  const animate = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    if (t < 0.5) {
      // Fold shut
      engine._transitionOverlay = { type: "fold", phase: "out", progress: t * 2 };
    } else {
      if (!viewportSnapped) {
        engine.viewport.x = target.x;
        engine.viewport.y = target.y;
        engine.viewport.zoom = target.zoom;
        engine.emit("viewport");
        viewportSnapped = true;
      }
      // Unfold open
      engine._transitionOverlay = { type: "fold", phase: "in", progress: (t - 0.5) * 2 };
    }
    engine.emit("presentation");
    if (t < 1) {
      engine._presentationAnimId = requestAnimationFrame(animate);
    } else {
      engine._transitionOverlay = null;
      engine._presentationAnimId = null;
      engine.emit("presentation");
    }
  };
  engine._presentationAnimId = requestAnimationFrame(animate);
}

/** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
function _transitionCube(engine: SpatialEngine, target: { x: number; y: number; zoom: number }, durationMs?: number, direction: 1 | -1 = 1): void {
  const duration = durationMs ?? 1200;
  const startTime = performance.now();
  let viewportSnapped = false;

  const animate = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);

    // Snap viewport at midpoint (face is edge-on / invisible)
    if (t >= 0.5 && !viewportSnapped) {
      engine.viewport.x = target.x;
      engine.viewport.y = target.y;
      engine.viewport.zoom = target.zoom;
      engine.emit("viewport");
      viewportSnapped = true;
    }

    engine._transitionOverlay = {
      type: "cube",
      phase: t < 0.5 ? "out" : "in",
      progress: t < 0.5 ? t * 2 : (t - 0.5) * 2,
      direction,
      t,
    };
    engine.emit("presentation");

    if (t < 1) {
      engine._presentationAnimId = requestAnimationFrame(animate);
    } else {
      engine._transitionOverlay = null;
      engine._presentationAnimId = null;
      engine.emit("presentation");
    }
  };
  engine._presentationAnimId = requestAnimationFrame(animate);
}
