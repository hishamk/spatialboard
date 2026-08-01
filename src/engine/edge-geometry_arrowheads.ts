/**
 * Generate SVG path data for an open chevron arrowhead centered on (cx,cy)
 * pointing in the direction given by angle (radians).
 */
export function arrowHeadPath(
  cx: number,
  cy: number,
  angle: number,
  size: number
): string {
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const px = -uy;
  const py = ux;

  // TIP-ANCHORED: (cx, cy) IS the tip — callers pass the path endpoint (the
  // node border point), so the arrow touches the border it points at instead
  // of piercing it. The base trails `size` behind along the travel direction.
  const tipX = cx;
  const tipY = cy;
  const baseX = cx - ux * size;
  const baseY = cy - uy * size;
  const halfW = size * 0.4;

  // Open polyline — two lines forming a chevron (no fill, stroke only)
  return `M${baseX + px * halfW},${baseY + py * halfW} L${tipX},${tipY} L${baseX - px * halfW},${baseY - py * halfW}`;
}

/**
 * Generate SVG path data for a filled (closed triangle) arrowhead centered on (cx,cy)
 * pointing in the direction given by angle (radians).
 */
export function filledArrowHeadPath(
  cx: number,
  cy: number,
  angle: number,
  size: number
): string {
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const px = -uy;
  const py = ux;

  // TIP-ANCHORED: (cx, cy) IS the tip (see arrowHeadPath) — the triangle's
  // base trails `size` behind along the travel direction.
  const tipX = cx;
  const tipY = cy;
  const baseX = cx - ux * size;
  const baseY = cy - uy * size;
  const halfW = size * 0.4;

  // Closed triangle path
  return `M${tipX},${tipY} L${baseX + px * halfW},${baseY + py * halfW} L${baseX - px * halfW},${baseY - py * halfW} Z`;
}

/**
 * Legacy arrowhead: compute angle from two points then delegate.
 */
export function arrowHeadPathFromPoints(
  tipX: number,
  tipY: number,
  fromX: number,
  fromY: number,
  size: number
): string {
  const angle = Math.atan2(tipY - fromY, tipX - fromX);
  return arrowHeadPath(tipX, tipY, angle, size);
}
