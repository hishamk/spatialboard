/**
 * Stroke point simplification for efficient SBD storage.
 * Uses Ramer-Douglas-Peucker (RDP) to reduce point count while preserving shape.
 */

export type Point3 = [number, number, number]; // x, y, pressure

/**
 * Squared perpendicular distance from point p to line segment a-b.
 */
function perpendicularDistance(
  p: Point3,
  a: Point3,
  b: Point3
): number {
  const [px, py] = p;
  const [ax, ay] = a;
  const [bx, by] = b;
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    return (px - ax) ** 2 + (py - ay) ** 2;
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const projX = ax + t * dx;
  const projY = ay + t * dy;
  return (px - projX) ** 2 + (py - projY) ** 2;
}

/**
 * Ramer-Douglas-Peucker simplification.
 * Reduces points by removing those that lie within `tolerance` of the line
 * between their neighbors. Keeps shape fidelity while reducing storage.
 *
 * @param points - Array of [x, y, pressure]
 * @param tolerance - Max perpendicular distance (squared) to keep a point. Use 1–4 for typical strokes.
 */
/**
 * Density-preserving cleanup for serialization: drops only consecutive
 * near-duplicate points (sub-`minDist` steps from high-frequency pointermove).
 *
 * This is deliberately NOT geometric simplification — perfect-freehand's
 * variable-width ink is a function of point density and spacing, so an
 * RDP-thinned stroke re-renders with a different envelope (thin runs, sharp
 * kinks) even when the polyline is geometrically faithful. Deduping keeps the
 * rendered stroke byte-identical for all practical purposes.
 */
export function dedupeStrokePoints(points: Point3[], minDist = 0.25): Point3[] {
  if (points.length <= 2) return points;
  const minDistSq = minDist * minDist;
  const out: Point3[] = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const prev = out[out.length - 1];
    const [px, py] = points[i];
    const dx = px - prev[0];
    const dy = py - prev[1];
    if (dx * dx + dy * dy >= minDistSq) out.push(points[i]);
  }
  out.push(points[points.length - 1]);
  return out;
}

export function simplifyStroke(
  points: Point3[],
  toleranceSq: number = 1
): Point3[] {
  if (points.length <= 2) return points;

  let maxDistSq = 0;
  let maxIndex = 0;

  const first = points[0];
  const last = points[points.length - 1];

  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i], first, last);
    if (d > maxDistSq) {
      maxDistSq = d;
      maxIndex = i;
    }
  }

  if (maxDistSq <= toleranceSq) {
    return [first, last];
  }

  const left = simplifyStroke(points.slice(0, maxIndex + 1), toleranceSq);
  const right = simplifyStroke(points.slice(maxIndex), toleranceSq);

  return [...left.slice(0, -1), ...right];
}
