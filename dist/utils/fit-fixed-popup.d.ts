/** Viewport size; prefers Visual Viewport API when available. */
export declare function getViewportSize(win: Window): {
    vw: number;
    vh: number;
};
/**
 * Context menu / point popup: anchor is the intended top-left (e.g. cursor).
 * Prefers opening down and to the right; flips up or left when there is not enough room.
 */
export declare function fitAnchorPopupPosition(anchorX: number, anchorY: number, width: number, height: number, win: Window, margin?: number): {
    left: number;
    top: number;
};
/**
 * Toolbar strip popover: opens to the right of the trigger by default; flips to the left
 * if needed. Vertically aligns with trigger top, then shifts up so the panel stays on-screen.
 */
export declare function fitSidePopoverPosition(trigger: Pick<DOMRect, "left" | "right" | "top" | "bottom">, panelWidth: number, panelHeight: number, win: Window, options?: {
    gap?: number;
    margin?: number;
}): {
    left: number;
    top: number;
};
