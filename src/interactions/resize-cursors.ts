/**
 * Rotation-aware resize cursors.
 *
 * CSS only provides 4 resize cursor directions (N-S, E-W, NW-SE, NE-SW).
 * When a node is rotated, the handle positions rotate but the expected drag
 * direction changes relative to screen space. This maps each handle to the
 * correct cursor given the node's rotation angle.
 */

// The 8 handle directions in clockwise order, starting at north
const DIRECTIONS = ["n", "ne", "e", "se", "s", "sw", "w", "nw"] as const;

// The cursor for each direction at 0° rotation
const CURSORS: Record<string, string> = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize",
};

/**
 * Returns the appropriate resize cursor for a handle position,
 * adjusted for the node's rotation angle.
 *
 * Every 45° of rotation shifts the cursor mapping by one step.
 */
export function getRotatedCursor(handle: string, rotationDeg: number): string {
  const idx = DIRECTIONS.indexOf(handle as typeof DIRECTIONS[number]);
  if (idx === -1) return "default";

  // Normalize to 0-360 and compute how many 45° steps to shift
  const normalized = ((rotationDeg % 360) + 360) % 360;
  const steps = Math.round(normalized / 45) % 8;

  // Shift the index forward by the rotation steps
  const rotatedIdx = (idx + steps) % 8;
  return CURSORS[DIRECTIONS[rotatedIdx]];
}
