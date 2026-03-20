/** Same set as `HandlePosition` in SVGLayer — kept local to avoid importing the overlay module. */
export type AspectResizeHandle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";
/**
 * Lock width/height to the original aspect ratio for corner resize handles.
 * Edge handles (n/e/s/w) are unchanged — caller should only invoke when Shift is held.
 */
export declare function applyCornerAspectLock(handle: AspectResizeHandle, origX: number, origY: number, origW: number, origH: number, newX: number, newY: number, newW: number, newH: number): {
    x: number;
    y: number;
    w: number;
    h: number;
};
