import { describe, it, expect } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import type { SpatialNode } from "../types";

/*
 * Zero / negative duration camera animation must SNAP, not tween. The tween
 * divides elapsed by duration, and the first rAF timestamp can equal the
 * captured start time — duration 0 therefore yields 0/0 = NaN and poisons
 * every subsequent viewport transform. These run without a rAF shim on
 * purpose: if the snap short-circuit regresses, the tween path throws in
 * this environment instead of silently producing NaN.
 */

function allFinite(v: { x: number; y: number; zoom: number }): boolean {
  return Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.zoom);
}

describe("zero-duration viewport animation", () => {
  it("animateViewport with duration 0 snaps synchronously", async () => {
    const engine = new SpatialEngine();
    await engine.animateViewport({ x: 40, y: -25, zoom: 2 }, { duration: 0 });
    expect(engine.viewport).toEqual({ x: 40, y: -25, zoom: 2 });
  });

  it("animatePanTo with duration 0 centers the point exactly", async () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(1000, 800);
    await engine.animatePanTo(300, 200, 0);
    expect(engine.viewport.x).toBe(1000 / 2 - 300 * engine.viewport.zoom);
    expect(engine.viewport.y).toBe(800 / 2 - 200 * engine.viewport.zoom);
    expect(allFinite(engine.viewport)).toBe(true);
  });

  it("negative and NaN durations snap too", async () => {
    const engine = new SpatialEngine();
    await engine.animateViewport({ x: 7, y: 8, zoom: 1.5 }, { duration: -30 });
    expect(engine.viewport).toEqual({ x: 7, y: 8, zoom: 1.5 });
    await engine.animateViewport({ x: 1, y: 2, zoom: 1 }, { duration: Number.NaN });
    expect(engine.viewport).toEqual({ x: 1, y: 2, zoom: 1 });
  });

  it("animateZoomTo with duration 0 snaps and clamps", async () => {
    const engine = new SpatialEngine();
    await engine.animateZoomTo(99, 0);
    expect(engine.viewport.zoom).toBe(5);
  });

  it("fitToContentAnimated with durationMs 0 snaps via the pan transition", () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(1000, 800);
    engine.addNode({
      id: "n1", type: "sticky", x: 0, y: 0, w: 100, h: 100, z: 1, data: {},
    } as SpatialNode);
    engine.fitToContentAnimated({ durationMs: 0 });
    expect(allFinite(engine.viewport)).toBe(true);
    // Content (100×100 + 50 padding each side) framed in 1000×800 → zoom 4.
    expect(engine.viewport.zoom).toBe(4);
  });

  it("animateViewportTo with durationMs 0 snaps", () => {
    const engine = new SpatialEngine();
    engine.animateViewportTo({ x: 11, y: 12, zoom: 0.5 }, { durationMs: 0 });
    expect(engine.viewport).toEqual({ x: 11, y: 12, zoom: 0.5 });
  });
});
