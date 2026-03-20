import { useLayoutEffect, type RefObject } from "react";
import { fitSidePopoverPosition } from "../utils/fit-fixed-popup";

/**
 * Positions a fixed popover beside a toolbar trigger; re-runs when the panel resizes.
 * Reads a fresh trigger rect on each pass so scroll/layout updates stay correct.
 */
export function useFitSidePopoverPosition(
  active: boolean,
  triggerRef: RefObject<HTMLElement | null>,
  panelRef: RefObject<HTMLElement | null>,
  extraDeps: readonly unknown[] = [],
): void {
  useLayoutEffect(() => {
    if (!active) return;
    const el = panelRef.current;
    if (!el) return;
    const win = el.ownerDocument.defaultView ?? window;
    const apply = () => {
      const trigger = triggerRef.current?.getBoundingClientRect();
      if (!trigger) return;
      const r = el.getBoundingClientRect();
      const p = fitSidePopoverPosition(trigger, r.width, r.height, win);
      el.style.left = `${p.left}px`;
      el.style.top = `${p.top}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- callers pass meaningful extraDeps
  }, [active, triggerRef, panelRef, ...extraDeps]);
}

/** Same as {@link useFitSidePopoverPosition} but uses a frozen `DOMRect` (e.g. from state at open time). */
export function useFitSidePopoverPositionFromRect(
  active: boolean,
  triggerRect: DOMRect | null,
  panelRef: RefObject<HTMLElement | null>,
  extraDeps: readonly unknown[] = [],
): void {
  useLayoutEffect(() => {
    if (!active || !triggerRect) return;
    const el = panelRef.current;
    if (!el) return;
    const win = el.ownerDocument.defaultView ?? window;
    const apply = () => {
      const r = el.getBoundingClientRect();
      const p = fitSidePopoverPosition(triggerRect, r.width, r.height, win);
      el.style.left = `${p.left}px`;
      el.style.top = `${p.top}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, triggerRect, panelRef, ...extraDeps]);
}
