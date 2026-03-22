import { type RefObject } from "react";
/**
 * Positions a fixed popover beside a toolbar trigger; re-runs when the panel resizes.
 * Reads a fresh trigger rect on each pass so scroll/layout updates stay correct.
 */
export declare function useFitSidePopoverPosition(active: boolean, triggerRef: RefObject<HTMLElement | null>, panelRef: RefObject<HTMLElement | null>, extraDeps?: readonly unknown[]): void;
/** Same as {@link useFitSidePopoverPosition} but uses a frozen `DOMRect` (e.g. from state at open time). */
export declare function useFitSidePopoverPositionFromRect(active: boolean, triggerRect: DOMRect | null, panelRef: RefObject<HTMLElement | null>, extraDeps?: readonly unknown[]): void;
