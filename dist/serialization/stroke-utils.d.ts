/**
 * Stroke point simplification for efficient SBD storage.
 * Uses Ramer-Douglas-Peucker (RDP) to reduce point count while preserving shape.
 */
export type Point3 = [number, number, number];
/**
 * Ramer-Douglas-Peucker simplification.
 * Reduces points by removing those that lie within `tolerance` of the line
 * between their neighbors. Keeps shape fidelity while reducing storage.
 *
 * @param points - Array of [x, y, pressure]
 * @param tolerance - Max perpendicular distance (squared) to keep a point. Use 1–4 for typical strokes.
 */
export declare function simplifyStroke(points: Point3[], toleranceSq?: number): Point3[];
