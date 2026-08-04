import { describe, it, expect } from "vitest";
import { quantizeViewportForRender } from "../viewport-quantize";

describe("quantizeViewportForRender", () => {
  it("rounds translate to whole CSS pixels", () => {
    const v = quantizeViewportForRender({ x: -726.547, y: -1184.156, zoom: 1.36 });
    expect(v).toEqual({ x: -727, y: -1184, zoom: 1.36 });
  });

  it("rounds half-pixel translates away (compositor vs SVG raster mismatch at any DPR)", () => {
    const v = quantizeViewportForRender({ x: 128.5, y: -133.5, zoom: 1 });
    expect(v).toEqual({ x: 129, y: -133, zoom: 1 });
  });

  it("never touches zoom", () => {
    expect(quantizeViewportForRender({ x: 0.1, y: 0.1, zoom: 3.379 }).zoom).toBe(3.379);
  });

  it("passes integer translates through unchanged", () => {
    const v = quantizeViewportForRender({ x: -5, y: 12, zoom: 0.5 });
    expect(v).toEqual({ x: -5, y: 12, zoom: 0.5 });
  });
});
