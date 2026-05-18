import getStroke from "perfect-freehand";

export interface FreehandOptions {
  size?: number;
  thinning?: number;
  smoothing?: number;
  streamline?: number;
}

export function getStrokePath(
  points: Array<[number, number, number]> | undefined | null,
  options: FreehandOptions = {}
): string {
  if (!Array.isArray(points) || points.length === 0) return "";
  const outlinePoints = getStroke(points, {
    size: options.size || 4,
    thinning: options.thinning ?? 0.5,
    smoothing: options.smoothing ?? 0.5,
    streamline: options.streamline ?? 0.5,
  });
  return getSvgPathFromStroke(outlinePoints);
}

function getSvgPathFromStroke(stroke: number[][]): string {
  if (!stroke.length) return "";

  const d: (string | number)[] = [];
  const [firstX, firstY] = stroke[0];
  d.push("M", firstX, firstY);

  for (let i = 0; i < stroke.length; i++) {
    const [x0, y0] = stroke[i];
    const [x1, y1] = stroke[(i + 1) % stroke.length];
    d.push("Q", x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
  }
  d.push("Z");
  return d.join(" ");
}

/**
 * Replicate perfect-freehand's streamline smoothing (EMA filter) so that
 * fill boundaries track the stroke center line exactly.
 */
export function streamlinePoints(
  points: [number, number][],
  streamline: number = 0.5
): [number, number][] {
  if (points.length < 2) return points;
  const t = 0.15 + (1 - streamline) * 0.85;
  const sm: [number, number][] = [[points[0][0], points[0][1]]];
  for (let i = 1; i < points.length; i++) {
    const prev = sm[i - 1];
    sm.push([
      prev[0] + (points[i][0] - prev[0]) * t,
      prev[1] + (points[i][1] - prev[1]) * t,
    ]);
  }
  return sm;
}

/**
 * Build a smooth closed path through points using quadratic curves.
 * Applies streamline filter so fill tracks the stroke center line.
 */
export function getSmoothClosedPath(
  points: [number, number][],
  streamline: number = 0.5
): string {
  if (points.length < 2) return "";
  const sm = streamlinePoints(points, streamline);
  const n = sm.length;
  const d: (string | number)[] = [];
  d.push("M", sm[0][0], sm[0][1]);
  for (let i = 0; i < n; i++) {
    const [x0, y0] = sm[i];
    const [x1, y1] = sm[(i + 1) % n];
    d.push("Q", x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
  }
  d.push("Z");
  return d.join(" ");
}
