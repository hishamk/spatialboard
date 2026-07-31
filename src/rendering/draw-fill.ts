// Shared fill computation for freehand draw nodes. This is the single source of
// truth for how a draw stroke's `fill` paints: the canvas renderer (DrawBlock in
// components/blocks/VectorNodeBlock.tsx) and the SVG exporter
// (src/export/canvas-export.ts) both call `computeDrawFillData` so exported
// boards paint exactly like the live canvas.

import { getSmoothClosedPath, streamlinePoints } from "./freehand";
import { getEnclosedRegionsFromPath, type EnclosedRegion } from "./polygon-fill";
import { getRoughPolygonFillPaths, type RoughPathData } from "./rough-shapes";

export type DrawFillData =
  | {
      kind: "solid";
      /** Smooth closed path (closed-enough strokes); "" when `regions` carries the geometry. */
      d: string;
      fill: string;
      /** Set for OPEN strokes: only self-intersection loops are filled. */
      regions?: EnclosedRegion[];
    }
  | { kind: "rough"; paths: RoughPathData[]; regions?: EnclosedRegion[] };

/**
 * Build fill data for a freehand draw stroke.
 *
 * - Closed-enough path (end gap small relative to stroke width and path length):
 *   fill the whole smooth outline — solid path or rough (hachure/cross-hatch) paths.
 * - Open path: fill only regions enclosed by self-intersections (loops); an open
 *   non-self-intersecting stroke gets NO fill at all (returns null).
 *
 * `points` are the node-RELATIVE stroke points ([x, y, pressure]); the returned
 * geometry is in the same coordinate space. The same streamline filter as
 * perfect-freehand is applied so fill boundaries track the stroke center line.
 */
export function computeDrawFillData(
  points: Array<[number, number, number]> | undefined,
  fill: string | undefined,
  fillStyle: string | undefined,
  strokeWidth: number,
): DrawFillData | null {
  if (!fill || !points || points.length < 3) return null;
  const raw = points.map((p) => [p[0], p[1]] as [number, number]);

  // Apply the same streamline filter as perfect-freehand so fill
  // boundaries track the stroke center line for both code paths.
  const pts = streamlinePoints(raw);

  // Check if path is "closed enough" for fill purposes.
  const first = pts[0];
  const last = pts[pts.length - 1];
  const endGap = Math.hypot(first[0] - last[0], first[1] - last[1]);
  let pathLen = 0;
  for (let i = 1; i < pts.length; i++) {
    pathLen += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  }
  const isClosed =
    pathLen >= 1 &&
    endGap <= Math.max(strokeWidth * 4, 20) &&
    endGap <= pathLen * 0.1;

  const style = fillStyle || "solid";

  if (isClosed) {
    // getSmoothClosedPath already applies streamline internally,
    // but since pts are already smoothed, pass streamline=0 to skip double-smoothing.
    const d = getSmoothClosedPath(pts, 0);

    if (style === "solid") {
      return { kind: "solid" as const, d, fill };
    }
    const roughPaths = getRoughPolygonFillPaths(pts, {
      stroke: "none",
      fill,
      fillStyle: style,
      roughness: 1,
      strokeWidth,
    });
    return { kind: "rough" as const, paths: roughPaths };
  }

  // Open path: fill only enclosed regions from self-intersections.
  // pts are already streamline-smoothed, so regions follow the stroke.
  const regions = getEnclosedRegionsFromPath(pts);
  if (regions.length === 0) return null;

  if (style === "solid") {
    return {
      kind: "solid" as const,
      d: "",
      fill,
      regions,
    };
  }
  const allRoughPaths: RoughPathData[] = [];
  for (const { points: regionPoints } of regions) {
    if (regionPoints.length >= 3) {
      allRoughPaths.push(
        ...getRoughPolygonFillPaths(regionPoints, {
          stroke: "none",
          fill,
          fillStyle: style,
          roughness: 1,
          strokeWidth,
        }),
      );
    }
  }
  return { kind: "rough" as const, paths: allRoughPaths, regions };
}
