import { describe, it, expect } from "vitest";
import { safeColor, safeNum } from "../svg-safe";
import { renderPreviewSVG } from "../../excalidraw/preview-renderer";
import type { ShapeNode, TextNode, DrawNode } from "../../engine/types";

describe("safeColor", () => {
  it("passes through valid colors unchanged", () => {
    for (const c of ["#fff", "#FEF3C7", "#12345678", "rgb(1,2,3)", "rgba(0,0,0,0.5)", "hsl(120 50% 50%)", "red", "transparent", "currentColor", "none"]) {
      expect(safeColor(c)).toBe(c);
    }
  });

  it("rejects anything containing markup-breaking characters", () => {
    const attacks = [
      '#000"><script>alert(1)</script>',
      '#000" onload="alert(1)',
      "red;behavior:url(x)",
      "</style><img src=x onerror=alert(1)>",
      "url(javascript:alert(1))",
    ];
    for (const a of attacks) {
      const out = safeColor(a);
      expect(out).toBe("none");
      expect(out).not.toMatch(/[<>"&]/);
    }
  });

  it("falls back for non-strings and honors a custom fallback", () => {
    expect(safeColor(undefined)).toBe("none");
    expect(safeColor(42 as unknown)).toBe("none");
    expect(safeColor("<bad>", "#000")).toBe("#000");
  });
});

describe("safeNum", () => {
  it("coerces finite numbers and rejects the rest", () => {
    expect(safeNum(5)).toBe(5);
    expect(safeNum("5")).toBe(5);
    expect(safeNum(Infinity, -1)).toBe(-1);
    expect(safeNum(NaN, -1)).toBe(-1);
    expect(safeNum('1" onload="x', -1)).toBe(1); // parseFloat stops at the quote
    expect(safeNum("evil", -1)).toBe(-1);
  });
});

describe("renderPreviewSVG never emits attacker markup", () => {
  const attack = '#000"><script>alert(1)</script>';

  it("neutralizes a malicious shape stroke/fill", () => {
    const node: ShapeNode = {
      id: "s1", type: "shape", x: 0, y: 0, w: 40, h: 40, z: 1,
      data: { shape: "rect", stroke: attack, fill: attack, strokeWidth: 2, roughness: 1, opacity: 1 },
    } as ShapeNode;
    const svg = renderPreviewSVG([node]);
    expect(svg).not.toContain("<script>");
    expect(svg).not.toContain("onerror");
  });

  it("neutralizes a malicious text color", () => {
    const node: TextNode = {
      id: "t1", type: "text", x: 0, y: 0, w: 100, h: 20, z: 1,
      data: { text: "hi", color: attack, fontSize: 12, fontFamily: "sans-serif", align: "left", opacity: 1 },
    } as TextNode;
    const svg = renderPreviewSVG([node]);
    expect(svg).not.toContain("<script>");
  });

  it("neutralizes a malicious draw-stroke color", () => {
    const node: DrawNode = {
      id: "d1", type: "draw", x: 0, y: 0, w: 40, h: 40, z: 1,
      data: { tool: "pen", points: [[0, 0, 0.5], [10, 10, 0.5]], color: attack, strokeWidth: 2, opacity: 1 },
    } as DrawNode;
    const svg = renderPreviewSVG([node]);
    expect(svg).not.toContain("<script>");
  });
});
