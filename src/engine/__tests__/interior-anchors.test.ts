import { describe, it, expect } from "vitest";
import type { SpatialNode, EdgeNode } from "../types";
import {
  interiorAnchorPoint,
  canvasPointToInteriorUV,
  computeEdgePath,
  pointToEdgeDistance,
} from "../edge-geometry";

const box = (x: number, y: number, w: number, h: number, rotation?: number): SpatialNode =>
  ({ id: "n1", type: "shape", x, y, w, h, z: 0, rotation, data: { shape: "rect" } }) as SpatialNode;

describe("interior [u,v] edge anchors", () => {
  it("maps uv fractions into the unrotated box", () => {
    const n = box(100, 200, 200, 100);
    expect(interiorAnchorPoint(n, 100, [0, 0])).toEqual({ x: 100, y: 200 });
    expect(interiorAnchorPoint(n, 100, [1, 1])).toEqual({ x: 300, y: 300 });
    expect(interiorAnchorPoint(n, 100, [0.5, 0.5])).toEqual({ x: 200, y: 250 });
    // Out-of-range uv clamps to the box
    expect(interiorAnchorPoint(n, 100, [-1, 2])).toEqual({ x: 100, y: 300 });
  });

  it("rotates with the node around its center", () => {
    const n = box(0, 0, 200, 100, 90);
    // Center is invariant under rotation
    const c = interiorAnchorPoint(n, 100, [0.5, 0.5]);
    expect(c.x).toBeCloseTo(100);
    expect(c.y).toBeCloseTo(50);
    // Top-left corner rotated 90° about (100, 50) → (150, -50)
    const tl = interiorAnchorPoint(n, 100, [0, 0]);
    expect(tl.x).toBeCloseTo(150);
    expect(tl.y).toBeCloseTo(-50);
  });

  it("canvasPointToInteriorUV inverts interiorAnchorPoint (incl. rotation)", () => {
    const n = box(40, 60, 300, 150, 30);
    const uv: [number, number] = [0.7, 0.2];
    const p = interiorAnchorPoint(n, 150, uv);
    const back = canvasPointToInteriorUV(n, 150, p.x, p.y);
    expect(back[0]).toBeCloseTo(uv[0]);
    expect(back[1]).toBeCloseTo(uv[1]);
    // Points outside the node land outside [0,1] (callers gate on this)
    const outside = canvasPointToInteriorUV(n, 150, -500, -500);
    expect(outside[0] < 0 || outside[0] > 1 || outside[1] < 0 || outside[1] > 1).toBe(true);
  });

  it("computeEdgePath lands the endpoint ON the interior anchor", () => {
    const from = { ...box(0, 0, 100, 100), id: "a" } as SpatialNode;
    const to = { ...box(400, 0, 200, 100), id: "b" } as SpatialNode;
    const uv: [number, number] = [0.25, 0.5];
    const want = interiorAnchorPoint(to, 100, uv);
    const path = computeEdgePath(from, to, "bezier", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, uv);
    expect(path.x2).toBeCloseTo(want.x);
    expect(path.y2).toBeCloseTo(want.y);
  });

  it("hit-testing follows the DRAWN curve for free-form anchors (long edges stay clickable)", () => {
    // Free perimeter anchors use RADIAL tangents; a hit-test that re-derives
    // control points from cardinal sides diverges and long edges become
    // unclickable mid-run. Regression: distance at the drawn curve midpoint ≈ 0.
    const from = { ...box(0, 0, 200, 150), id: "a" } as SpatialNode;
    const to = { ...box(3000, 900, 200, 150), id: "b" } as SpatialNode;
    const edge = {
      id: "e", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1,
      data: {
        fromId: "a", toId: "b", style: "solid", color: "#000", strokeWidth: 2,
        edgeType: "bezier", sourceT: 0.30, targetT: 0.85, // radial-tangent anchors
      },
    } as EdgeNode;
    const drawn = computeEdgePath(
      from, to, "bezier", undefined, undefined, undefined, undefined, undefined,
      undefined, undefined, edge.data.sourceT, edge.data.targetT,
    );
    // labelX/labelY is the true curve's t=0.5 point — a click right on the ink.
    const d = pointToEdgeDistance(drawn.labelX, drawn.labelY, from, to, edge);
    expect(d).toBeLessThan(2);
  });

  it("damps backward tangents so free-anchor edges don't fold over themselves", () => {
    const from = { ...box(0, 0, 200, 150), id: "a" } as SpatialNode;
    const to = { ...box(2000, 0, 200, 150), id: "b" } as SpatialNode;
    // Source anchored on the LEFT side (t=0.75) while the target is far RIGHT:
    // the radial exit dir opposes the chord — undamped, the control point
    // shoots ~500px backward and the curve folds over the start dot.
    const folded = computeEdgePath(
      from, to, "bezier", undefined, undefined, undefined, undefined, undefined,
      undefined, undefined, 0.75, 0.75,
    );
    expect(folded.controlPoints!.cx1).toBeGreaterThan(folded.x1 - 100);
    // Facing anchor (t=0.25, right side) keeps its full natural reach.
    const facing = computeEdgePath(
      from, to, "bezier", undefined, undefined, undefined, undefined, undefined,
      undefined, undefined, 0.25, 0.75,
    );
    expect(facing.controlPoints!.cx1).toBeGreaterThan(facing.x1 + 300);
  });

  it("step/smoothstep flip away-facing free-anchor sides so the tail doesn't fold", () => {
    const from = { ...box(0, 0, 200, 150), id: "a" } as SpatialNode;
    const to = { ...box(2000, 0, 200, 150), id: "b" } as SpatialNode;
    for (const type of ["step", "smoothstep"] as const) {
      // Left-side source anchor (t=0.75), target far right: unflipped routing
      // exits LEFT (padding + wrap) before turning — a folded tail.
      const p = computeEdgePath(
        from, to, type, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, 0.75, 0.75,
      );
      expect(p.bounds.x).toBeGreaterThan(p.x1 - 2);
      expect(p.sourceSide).toBe("right");
    }
  });

  it("attachmentGap leaves interior anchors untouched", () => {
    const from = { ...box(0, 0, 100, 100), id: "a" } as SpatialNode;
    const to = { ...box(400, 0, 200, 100), id: "b" } as SpatialNode;
    const uv: [number, number] = [0.5, 0.5];
    const want = interiorAnchorPoint(to, 100, uv);
    const path = computeEdgePath(from, to, "straight", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, uv, 12);
    expect(path.x2).toBeCloseTo(want.x);
    expect(path.y2).toBeCloseTo(want.y);
  });
});
