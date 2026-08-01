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

/**
 * How far the DRAWN edge path should stop short of its endpoint so the
 * stroke (and its round line-cap) never seeps out from under the marker:
 * - chevron: half the stroke — the cap's front edge stops at the tip;
 * - filled triangle: tucked under the body (clamped so thick strokes stay
 *   covered without opening a gap behind the base);
 * - dot: the radius — the shaft ends at the dot's center, under it.
 */
export function markerPathInset(
  marker: string | undefined,
  size: number,
  strokeWidth: number,
): number {
  switch (marker) {
    case "arrow":
      return strokeWidth / 2;
    case "filled":
      return Math.min(size, Math.max(size * 0.8, strokeWidth * 2.25));
    case "dot":
      return size * 0.25;
    default:
      return 0;
  }
}

/**
 * Pull the drawn path's first/last point inward along the end tangents.
 * Exact for straight/step finals (the last segment is a line into the
 * endpoint); a tight approximation for bezier ends. The true endpoints in
 * the result are untouched — markers and hit-testing keep using them.
 */
export function insetEdgePathEnds(
  result: {
    path: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    arrowAngle: number;
    tailAngle: number;
  },
  startInset: number,
  endInset: number,
): string {
  let p = result.path;
  if (endInset > 0) {
    const ex = result.x2 - Math.cos(result.arrowAngle) * endInset;
    const ey = result.y2 - Math.sin(result.arrowAngle) * endInset;
    p = p.replace(/(-?[\d.]+)[, ](-?[\d.]+)\s*$/, `${ex},${ey}`);
  }
  if (startInset > 0) {
    // tailAngle points OUTWARD past the start — subtract to move into the path.
    const sx = result.x1 - Math.cos(result.tailAngle) * startInset;
    const sy = result.y1 - Math.sin(result.tailAngle) * startInset;
    p = p.replace(/^M(-?[\d.]+)[, ](-?[\d.]+)/, `M${sx},${sy}`);
  }
  return p;
}
