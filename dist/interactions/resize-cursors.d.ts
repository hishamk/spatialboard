/**
 * Rotation-aware resize cursors.
 *
 * CSS only provides 4 resize cursor directions (N-S, E-W, NW-SE, NE-SW).
 * When a node is rotated, the handle positions rotate but the expected drag
 * direction changes relative to screen space. This maps each handle to the
 * correct cursor given the node's rotation angle.
 */
/**
 * Returns the appropriate resize cursor for a handle position,
 * adjusted for the node's rotation angle.
 *
 * Every 45° of rotation shifts the cursor mapping by one step.
 */
export declare function getRotatedCursor(handle: string, rotationDeg: number): string;
