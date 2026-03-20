/** Same set as `HandlePosition` in SVGLayer — kept local to avoid importing the overlay module. */
export type AspectResizeHandle =
  | "nw"
  | "n"
  | "ne"
  | "e"
  | "se"
  | "s"
  | "sw"
  | "w";

/**
 * Lock width/height to the original aspect ratio for corner resize handles.
 * Edge handles (n/e/s/w) are unchanged — caller should only invoke when Shift is held.
 */
export function applyCornerAspectLock(
  handle: AspectResizeHandle,
  origX: number,
  origY: number,
  origW: number,
  origH: number,
  newX: number,
  newY: number,
  newW: number,
  newH: number,
): { x: number; y: number; w: number; h: number } {
  const isCorner =
    handle === "nw" || handle === "ne" || handle === "sw" || handle === "se";
  if (!isCorner || origW <= 0 || origH <= 0 || newW <= 0 || newH <= 0) {
    return { x: newX, y: newY, w: newW, h: newH };
  }
  const ar = origW / origH;
  let nw = newW;
  let nh = newH;
  if (nw / nh > ar) {
    nw = nh * ar;
  } else {
    nh = nw / ar;
  }
  let nx = newX;
  let ny = newY;
  if (handle === "se") {
    nx = origX;
    ny = origY;
  } else if (handle === "ne") {
    nx = origX;
    ny = origY + origH - nh;
  } else if (handle === "sw") {
    nx = origX + origW - nw;
    ny = origY;
  } else {
    nx = origX + origW - nw;
    ny = origY + origH - nh;
  }
  return { x: nx, y: ny, w: nw, h: nh };
}
