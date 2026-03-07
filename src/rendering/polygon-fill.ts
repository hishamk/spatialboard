/** Ring format: [[x,y], [x,y], ...] */
type Ring = [number, number][];

/**
 * Compute intersection point of segments p1→p2 and p3→p4.
 * Returns null if segments don't intersect (parallel or non-overlapping).
 */
function segmentIntersection(
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  p4: [number, number]
): [number, number] | null {
  const dx1 = p2[0] - p1[0],
    dy1 = p2[1] - p1[1];
  const dx2 = p4[0] - p3[0],
    dy2 = p4[1] - p3[1];
  const denom = dx1 * dy2 - dy1 * dx2;
  if (Math.abs(denom) < 1e-10) return null;
  const t = ((p3[0] - p1[0]) * dy2 - (p3[1] - p1[1]) * dx2) / denom;
  const u = ((p3[0] - p1[0]) * dy1 - (p3[1] - p1[1]) * dx1) / denom;
  if (t <= 0 || t >= 1 || u <= 0 || u >= 1) return null;
  return [p1[0] + t * dx1, p1[1] + t * dy1];
}

function ringToPathD(ring: Ring): string {
  if (ring.length < 2) return "";
  let d = `M ${ring[0][0]},${ring[0][1]}`;
  for (let i = 1; i < ring.length; i++) {
    d += ` L ${ring[i][0]},${ring[i][1]}`;
  }
  return d + " Z";
}

/** Shoelace formula for polygon area */
function ringArea(ring: Ring): number {
  let area = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    area += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]);
  }
  return Math.abs(area) / 2;
}

export interface EnclosedRegion {
  pathD: string;
  points: [number, number][];
}

/**
 * Find enclosed regions created by self-intersections of an open polyline.
 * Directly detects where the path crosses itself and extracts the loops,
 * avoiding the need to close the path with an artificial chord.
 */
export function getEnclosedRegionsFromPath(
  points: [number, number][]
): EnclosedRegion[] {
  if (points.length < 4) return [];

  const n = points.length;
  const regions: EnclosedRegion[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 2; j < n - 1; j++) {
      const ix = segmentIntersection(
        points[i],
        points[i + 1],
        points[j],
        points[j + 1]
      );
      if (!ix) continue;

      // The loop: intersection point → points[i+1..j] → close back
      const loop: Ring = [ix];
      for (let k = i + 1; k <= j; k++) {
        loop.push(points[k]);
      }

      // Skip tiny loops (noisy input artifacts)
      if (ringArea(loop) < 100) continue;

      regions.push({
        pathD: ringToPathD(loop),
        points: loop.map((p) => [p[0], p[1]] as [number, number]),
      });
    }
  }

  if (regions.length === 0) return [];

  // Filter tiny regions relative to the largest
  const areas = regions.map((r) => ringArea(r.points));
  const maxArea = Math.max(...areas);
  const minArea = maxArea * 0.05;

  return regions.filter((_, i) => areas[i] >= minArea);
}
