import { useEffect } from "react";
import type { RefObject } from "react";

/** Two taps within this window/radius count as a double-tap. */
const DOUBLE_TAP_MS = 350;
const DOUBLE_TAP_SLOP = 30;
/** A press is a "tap" only if it stays put and lifts quickly. */
const TAP_MAX_MS = 300;
const TAP_MOVE_SLOP = 12;

/**
 * Touch/pen input never reliably emits `dblclick` once the canvas opts out of
 * browser gestures (`touch-action: none`), which made every double-click entry
 * point — text/sticky/label editing, group drill-down, image crop — unreachable
 * on phones and iPads. This hook detects double-taps at the pointer level and
 * dispatches a REAL bubbling `dblclick` MouseEvent at the tap point, so the
 * canvas-level `onDoubleClick` AND every block's own handler fire unchanged.
 */
export function useTouchDoubleTap(containerRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let activePointer: number | null = null;
    let downX = 0;
    let downY = 0;
    let downTime = 0;
    let moved = false;
    let lastTapTime = 0;
    let lastTapX = 0;
    let lastTapY = 0;

    const isTouchLike = (e: PointerEvent) =>
      // Synthetic pointerups (pinch abort, long-press cancel) carry an empty
      // pointerType — they must never register as taps.
      e.pointerType === "touch" || e.pointerType === "pen";

    const onDown = (e: PointerEvent) => {
      if (!isTouchLike(e) || !e.isPrimary) return;
      activePointer = e.pointerId;
      downX = e.clientX;
      downY = e.clientY;
      downTime = performance.now();
      moved = false;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== activePointer) return;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > TAP_MOVE_SLOP) {
        moved = true;
      }
    };

    const onCancel = (e: PointerEvent) => {
      if (e.pointerId === activePointer) activePointer = null;
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointer || !isTouchLike(e)) return;
      activePointer = null;
      const now = performance.now();
      if (moved || now - downTime > TAP_MAX_MS) {
        lastTapTime = 0;
        return;
      }
      const isDouble =
        now - lastTapTime < DOUBLE_TAP_MS &&
        Math.hypot(e.clientX - lastTapX, e.clientY - lastTapY) < DOUBLE_TAP_SLOP;
      if (!isDouble) {
        lastTapTime = now;
        lastTapX = e.clientX;
        lastTapY = e.clientY;
        return;
      }
      lastTapTime = 0;

      const doc = el.ownerDocument;
      const target = doc.elementFromPoint(e.clientX, e.clientY) ?? el;
      // Already inside a live editor — let native touch text handling own it.
      if (target.closest('input, textarea, [contenteditable="true"]')) return;
      target.dispatchEvent(
        new MouseEvent("dblclick", {
          bubbles: true,
          cancelable: true,
          view: doc.defaultView,
          detail: 2,
          clientX: e.clientX,
          clientY: e.clientY,
        }),
      );
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
    };
  }, [containerRef]);
}
