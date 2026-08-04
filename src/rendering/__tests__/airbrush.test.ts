import { describe, it, expect } from "vitest";
import { getAirbrushRender, type SprayPoint } from "../airbrush";
import { serializeToSBD } from "../../serialization/sbd-serializer";
import { parseSBD } from "../../serialization/sbd-parser";
import type { DrawNode } from "../../engine/types";

const pts: SprayPoint[] = [
  [0, 0, 0.5],
  [10, 4, 0.6],
  [20, 8, 0.7],
  [30, 12, 0.8],
];

describe("airbrush spray determinism", () => {
  it("same (points, width, seed) → identical spray", () => {
    const a = getAirbrushRender(pts, 3, "node-1")!;
    const b = getAirbrushRender(pts, 3, "node-1")!;
    expect(a.d).toBe(b.d);
  });

  it("different seed → different spray", () => {
    const a = getAirbrushRender(pts, 3, "node-1")!;
    const b = getAirbrushRender(pts, 3, "node-2")!;
    expect(a.d).not.toBe(b.d);
  });

  it("appending points leaves earlier grains untouched (no shimmer while drawing)", () => {
    const before = getAirbrushRender(pts.slice(0, 2), 3, "node-1")!;
    const after = getAirbrushRender(pts, 3, "node-1")!;
    expect(after.d.startsWith(before.d)).toBe(true);
  });

  it("translating all points translates grains exactly (commit re-basing is safe)", () => {
    const abs = getAirbrushRender(pts, 3, "node-1")!;
    const shifted: SprayPoint[] = pts.map(([x, y, p]) => [x + 100, y + 50, p]);
    const rel = getAirbrushRender(shifted, 3, "node-1")!;
    // Parse first dot of each and compare deltas.
    const first = (d: string) => {
      const m = d.match(/^M(-?[\d.]+) (-?[\d.]+)h/);
      return [parseFloat(m![1]), parseFloat(m![2])];
    };
    const [ax, ay] = first(abs.d);
    const [rx, ry] = first(rel.d);
    expect(rx - ax).toBeCloseTo(100, 1);
    expect(ry - ay).toBeCloseTo(50, 1);
  });
});

describe("airbrush SBD round-trip", () => {
  it("persists tool=airbrush", async () => {
    const node = {
      id: "ab1",
      type: "draw",
      x: 0, y: 0, w: 30, h: 12, z: 1,
      data: { tool: "airbrush", points: pts, color: "#1e1e2e", strokeWidth: 3 },
    } as DrawNode;
    const sbd = await serializeToSBD([node]);
    expect(sbd).toContain('tool="airbrush"');
    const { nodes } = await parseSBD(sbd);
    expect((nodes[0] as DrawNode).data.tool).toBe("airbrush");
  });
});
