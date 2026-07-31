import { describe, expect, it } from "vitest";
import { convertExcalidrawElements } from "../converter";
import type { ExcalidrawElement } from "../types";
import type { DrawNode } from "../../engine/types";

/** Minimal linear element factory. */
function line(overrides: Partial<ExcalidrawElement>): ExcalidrawElement {
  return {
    id: "el1",
    type: "line",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    angle: 0,
    strokeColor: "#e03131",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    ...overrides,
  } as ExcalidrawElement;
}

/** Closed diamond loop (seam-duplicated last point) — sparse control points. */
const CLOSED_PTS: Array<[number, number]> = [
  [0, 50],
  [50, 0],
  [100, 50],
  [50, 100],
  [0, 50],
];

/** Max turning angle (deg) between consecutive segments of a polyline. */
function maxTurnAngle(pts: Array<[number, number, number]>): number {
  let max = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const a = [pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]];
    const b = [pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]];
    const la = Math.hypot(a[0], a[1]);
    const lb = Math.hypot(b[0], b[1]);
    if (la < 1e-9 || lb < 1e-9) continue;
    const cos = Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / (la * lb)));
    max = Math.max(max, (Math.acos(cos) * 180) / Math.PI);
  }
  return max;
}

describe("rounded linear element conversion", () => {
  it("resamples a rounded filled loop into a smooth closed vector node", () => {
    const { nodes } = convertExcalidrawElements([
      line({
        points: CLOSED_PTS,
        roundness: { type: 2 },
        backgroundColor: "#ffc9c9",
      }),
    ]);
    expect(nodes).toHaveLength(1);
    const d = nodes[0] as DrawNode;
    expect(d.type).toBe("draw");
    expect(d.data.tool).toBe("vector");
    expect(d.data.fill).toBe("#ffc9c9");
    // Densely resampled — far more points than the 5 controls…
    expect(d.data.points.length).toBeGreaterThan(30);
    // …and smooth: the control polygon turns 90° per vertex, the spline must not.
    expect(maxTurnAngle(d.data.points)).toBeLessThan(30);
    // Seam stays closed.
    const first = d.data.points[0];
    const last = d.data.points[d.data.points.length - 1];
    expect(Math.hypot(last[0] - first[0], last[1] - first[1])).toBeLessThan(1e-6);
  });

  it("keeps sharp (non-rounded) filled polygons verbatim", () => {
    const { nodes } = convertExcalidrawElements([
      line({ points: CLOSED_PTS, roundness: null, backgroundColor: "#ffc9c9" }),
    ]);
    expect(nodes).toHaveLength(1);
    const d = nodes[0] as DrawNode;
    expect(d.data.tool).toBe("vector");
    expect(d.data.points).toHaveLength(CLOSED_PTS.length);
  });

  it("converts an open rounded unfilled line to a smooth pen stroke (no Z-close chord)", () => {
    const { nodes } = convertExcalidrawElements([
      line({
        points: [
          [0, 0],
          [50, 40],
          [100, 0],
          [150, 40],
        ],
        roundness: { type: 2 },
      }),
    ]);
    expect(nodes).toHaveLength(1);
    const d = nodes[0] as DrawNode;
    expect(d.data.tool).toBe("pen");
    expect(d.data.fill).toBeUndefined();
    expect(d.data.points.length).toBeGreaterThan(12);
  });

  it("still decomposes sharp unfilled polylines into grouped segments", () => {
    const { nodes } = convertExcalidrawElements([
      line({
        points: [
          [0, 0],
          [50, 40],
          [100, 0],
          [150, 40],
        ],
        roundness: null,
      }),
    ]);
    expect(nodes).toHaveLength(3);
    expect(nodes.every((n) => n.type === "shape")).toBe(true);
  });
});
