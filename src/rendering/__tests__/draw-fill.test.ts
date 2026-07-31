import { describe, it, expect } from "vitest";
import { computeDrawFillData } from "../draw-fill";

type Pt = [number, number, number];

/** Closed-enough blob: circle sampled densely, last point back at the start. */
function circlePoints(cx: number, cy: number, r: number, n = 40): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a), 0.5]);
  }
  return pts;
}

/** Open arc: semicircle — endpoints far apart, no self-intersection. */
function arcPoints(cx: number, cy: number, r: number, n = 24): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a), 0.5]);
  }
  return pts;
}

/** Densify a polyline so the streamline filter barely displaces the geometry. */
function densify(waypoints: [number, number][], step = 4): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const [x0, y0] = waypoints[i];
    const [x1, y1] = waypoints[i + 1];
    const segments = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / step));
    for (let j = 0; j < segments; j++) {
      const t = j / segments;
      pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, 0.5]);
    }
  }
  const last = waypoints[waypoints.length - 1];
  pts.push([last[0], last[1], 0.5]);
  return pts;
}

describe("computeDrawFillData", () => {
  it("returns null when no fill is set", () => {
    expect(computeDrawFillData(circlePoints(60, 60, 50), undefined, "solid", 4)).toBeNull();
  });

  it("closed blob => solid fill over the whole smooth outline", () => {
    const result = computeDrawFillData(circlePoints(60, 60, 50), "#ff0000", "solid", 4);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("solid");
    if (result!.kind === "solid") {
      expect(result!.d.length).toBeGreaterThan(0);
      expect(result!.fill).toBe("#ff0000");
      expect(result!.regions).toBeUndefined();
    }
  });

  it("closed blob with hachure => rough fill paths", () => {
    const result = computeDrawFillData(circlePoints(60, 60, 50), "#ff0000", "hachure", 4);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("rough");
    if (result!.kind === "rough") {
      expect(result!.paths.length).toBeGreaterThan(0);
    }
  });

  it("open arc with fill set => no fill at all (null)", () => {
    expect(computeDrawFillData(arcPoints(60, 60, 60), "#ff0000", "solid", 4)).toBeNull();
  });

  it("self-intersecting bowtie => enclosed regions", () => {
    const bowtie = densify([
      [0, 0],
      [100, 100],
      [100, 0],
      [0, 100],
    ]);
    const result = computeDrawFillData(bowtie, "#ff0000", "solid", 4);
    expect(result).not.toBeNull();
    expect(result!.kind).toBe("solid");
    if (result!.kind === "solid") {
      expect(result!.d).toBe(""); // geometry carried by regions, not d
      expect(result!.regions).toBeDefined();
      expect(result!.regions!.length).toBeGreaterThan(0);
      for (const r of result!.regions!) {
        expect(r.pathD.length).toBeGreaterThan(0);
      }
    }
  });
});
