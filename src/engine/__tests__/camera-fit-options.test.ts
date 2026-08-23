import { describe, it, expect } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import type { SpatialNode } from "../types";

/*
 * Fit options (padding / insets / maxZoom) and pre-measure parking. Insets
 * are screen pixels reserved for host chrome; a fit requested while a
 * container element is attached but unmeasured must apply on the first real
 * measurement instead of framing the 2000×1500 stand-in size. Headless
 * engines (no container attached) keep fitting immediately.
 */

function addBox(engine: SpatialEngine, id: string, x: number, y: number, w: number, h: number) {
  engine.addNode({ id, type: "sticky", x, y, w, h, z: 1, data: {} } as SpatialNode);
}

describe("fit options", () => {
  it("centers content in the region left over by insets", () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(1000, 800);
    addBox(engine, "n1", 0, 0, 400, 400);
    engine.fitToContent({ padding: 0, insets: { left: 200 } });
    // Available region: x 200..1000 (800 wide) × 800 tall → zoom 2, content
    // fills it exactly → lands at screen x = 200.
    expect(engine.viewport.zoom).toBe(2);
    expect(engine.viewport.x).toBe(200);
    expect(engine.viewport.y).toBe(0);
  });

  it("maxZoom caps the framing zoom", () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(1000, 800);
    addBox(engine, "n1", 0, 0, 400, 400);
    engine.fitToContent({ padding: 0, insets: { left: 200 }, maxZoom: 1 });
    expect(engine.viewport.zoom).toBe(1);
    // Content (400px at zoom 1) centered in the 800×800 available region.
    expect(engine.viewport.x).toBe(200 + (800 - 400) / 2);
    expect(engine.viewport.y).toBe((800 - 400) / 2);
  });

  it("ignores insets that consume the whole container", () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(1000, 800);
    addBox(engine, "n1", 0, 0, 400, 400);
    engine.fitToContent({ padding: 0, insets: { left: 600, right: 600 } });
    expect(engine.viewport.zoom).toBe(2);
    expect(engine.viewport.x).toBe(100);
  });

  it("fitToNodes frames the subset with the same options", () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(1000, 800);
    addBox(engine, "n1", 0, 0, 400, 400);
    addBox(engine, "far", 5000, 5000, 100, 100);
    engine.fitToNodes(["n1"], { padding: 0, maxZoom: 2 });
    expect(engine.viewport.zoom).toBe(2);
    expect(engine.viewport.x).toBe((1000 - 800) / 2);
  });

  it("defaults preserve the previous framing behavior", () => {
    const engine = new SpatialEngine();
    engine.setContainerSize(1000, 800);
    addBox(engine, "n1", 0, 0, 100, 100);
    engine.fitToContent();
    // 100×100 content + 50 padding each side = 200×200 → zoom 4.
    expect(engine.viewport.zoom).toBe(4);
  });
});

describe("pre-measure fit parking", () => {
  it("parks a fit issued before the first measurement and applies it after", () => {
    const engine = new SpatialEngine();
    engine.setContainer({} as HTMLElement);
    addBox(engine, "n1", 0, 0, 400, 400);
    const before = { ...engine.viewport };
    engine.fitToContent({ padding: 0 });
    // Nothing applied yet — the container has not measured.
    expect(engine.viewport).toEqual(before);

    engine.setContainerSize(1000, 800);
    expect(engine.viewport.zoom).toBe(2);
    expect(engine.viewport.x).toBe((1000 - 800) / 2);
  });

  it("the latest parked request wins", () => {
    const engine = new SpatialEngine();
    engine.setContainer({} as HTMLElement);
    addBox(engine, "n1", 0, 0, 400, 400);
    addBox(engine, "n2", 3600, 0, 400, 400);
    engine.fitToNodes(["n2"], { padding: 0 });
    engine.fitToContent({ padding: 0 });
    engine.setContainerSize(1000, 800);
    // The content fit (both boxes: 4000 wide → zoom 0.25) applied, not the
    // n2 subset fit (zoom 2).
    expect(engine.viewport.zoom).toBe(0.25);
  });

  it("a parked animated fit applies instantly at first measure", () => {
    const engine = new SpatialEngine();
    engine.setContainer({} as HTMLElement);
    addBox(engine, "n1", 0, 0, 400, 400);
    engine.fitToContentAnimated({ durationMs: 400, padding: 0 });
    engine.setContainerSize(1000, 800);
    // Applied synchronously (no tween from a never-seen viewport).
    expect(engine.viewport.zoom).toBe(2);
  });

  it("fits apply immediately once measured", () => {
    const engine = new SpatialEngine();
    engine.setContainer({} as HTMLElement);
    engine.setContainerSize(1000, 800);
    addBox(engine, "n1", 0, 0, 400, 400);
    engine.fitToContent({ padding: 0 });
    expect(engine.viewport.zoom).toBe(2);
  });

  it("headless engines (no container) fit immediately against the defaults", () => {
    const engine = new SpatialEngine();
    addBox(engine, "n1", 0, 0, 400, 400);
    engine.fitToContent({ padding: 0 });
    // Default 2000×1500 stand-in: zoom = min(2000/400, 1500/400) → 3.75.
    expect(engine.viewport.zoom).toBe(3.75);
  });
});
