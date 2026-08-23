import { describe, it, expect } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import type { SpatialNode } from "../types";

/*
 * setContainerSize input hygiene. A host feeding an unvalidated measurement
 * (NaN/Infinity from a detached rect, 0×0 from a hidden container) used to
 * flow straight into the maintain-center shift — viewport.x += (w - oldW)/2 —
 * poisoning the live viewport, and overwrote the stored size that later fit
 * math reads. Junk measurements are now ignored wholesale; the next real one
 * recovers everything, and a parked fit keeps waiting.
 */

function addBox(engine: SpatialEngine, id: string, x: number, y: number, w: number, h: number) {
  engine.addNode({ id, type: "sticky", x, y, w, h, z: 1, data: {} } as SpatialNode);
}

describe("setContainerSize input hygiene", () => {
  it.each([
    [NaN, NaN],
    [Infinity, 800],
    [800, -600],
    [0, 0],
  ])("ignores a junk measurement (%s × %s)", (w, h) => {
    const engine = new SpatialEngine();
    engine.setContainerSize(800, 600);
    engine.pan(37, -13);
    const before = { ...engine.viewport };

    engine.setContainerSize(w, h);
    expect(engine.viewport).toEqual(before);
    expect(engine._containerWidth).toBe(800);
    expect(engine._containerHeight).toBe(600);
  });

  it("coerces numeric strings — an untyped host's measurement still lands", () => {
    // The old arithmetic accepted "1000" implicitly; a non-coercing guard
    // would silently park every fit forever for such hosts.
    const engine = new SpatialEngine();
    engine.setContainer({} as HTMLElement);
    addBox(engine, "n1", 0, 0, 400, 400);
    engine.fitToContent({ padding: 0 });

    engine.setContainerSize("1000" as unknown as number, "800" as unknown as number);
    expect(engine.viewport.zoom).toBe(2);
    expect(engine._containerWidth).toBe(1000);

    engine.setContainerSize("12px" as unknown as number, "800" as unknown as number);
    expect(engine._containerWidth).toBe(1000); // junk string still rejected
  });

  it("keeps a parked fit waiting through junk and applies it on the real measurement", () => {
    const engine = new SpatialEngine();
    engine.setContainer({} as HTMLElement);
    addBox(engine, "n1", 0, 0, 400, 400);
    const before = { ...engine.viewport };
    engine.fitToContent({ padding: 0 });
    expect(engine.viewport).toEqual(before); // parked, not applied

    engine.setContainerSize(NaN, NaN);
    expect(engine.viewport).toEqual(before); // still parked, nothing poisoned

    engine.setContainerSize(1000, 800);
    expect(engine.viewport.zoom).toBe(2);
    expect(engine.viewport.x).toBe((1000 - 800) / 2);
  });

  it("a hide (0×0) and re-show at the same size no longer shifts the viewport", () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(800, 600);
    engine.pan(37, -13);
    const before = { ...engine.viewport };

    engine.setContainerSize(0, 0); // hidden container measures 0×0
    engine.setContainerSize(800, 600); // re-shown at the same size
    expect(engine.viewport).toEqual(before);
  });

  it("a real resize still maintains the visual center", () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(800, 600);
    const before = { ...engine.viewport };

    engine.setContainerSize(1000, 600);
    expect(engine.viewport.x).toBe(before.x + 100); // (1000 - 800) / 2
    expect(engine.viewport.y).toBe(before.y);
  });
});
