import { describe, it, expect, beforeAll, vi } from "vitest";
import {
  SpatialEngine,
  type DrawNode,
  type EdgeNode,
  type FrameNode,
  type ShapeNode,
  type StickyNoteNode,
} from "../../engine";
import { buildBoardSVG } from "../canvas-export";

/*
 * Pure string assertions against the export SVG, built with a HEADLESS
 * SpatialEngine (no DOM) — same construction style as
 * src/__tests__/headless-engine.test.ts. Only the "svg" format is exercised
 * (PNG rasterization needs a real browser canvas).
 *
 * Font embedding note: `buildEmbeddedFontCSS` fetches font bytes. In the test
 * environment `fetch` is stubbed to return dummy bytes, which is enough for
 * the exporter to emit a real @font-face rule — asserting both the rule and
 * the `font-family` attributes driven by `collectFontKeys`.
 */

function sticky(id: string, x: number, y: number, z = 1): StickyNoteNode {
  return {
    id,
    type: "sticky",
    x,
    y,
    w: 160,
    h: 120,
    z,
    data: { text: "hello", color: "#FDE68A" },
  };
}

function shape(id: string, x: number, y: number, z: number, stroke: string): ShapeNode {
  return {
    id,
    type: "shape",
    x,
    y,
    w: 100,
    h: 100,
    z,
    data: { shape: "rect", stroke, strokeWidth: 2, roughness: 1 },
  };
}

function edge(id: string, fromId: string, toId: string, z: number, color: string): EdgeNode {
  return {
    id,
    type: "edge",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z,
    data: { fromId, toId, style: "solid", color, strokeWidth: 2 },
  };
}

beforeAll(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      arrayBuffer: async () => new Uint8Array([0x77, 0x4f, 0x46, 0x32]).buffer,
      text: async () => "",
    })),
  );
});

describe("buildBoardSVG", () => {
  it("returns null for an empty board", async () => {
    const engine = new SpatialEngine();
    expect(await buildBoardSVG(engine, { format: "svg" })).toBeNull();
  });

  it("embeds the default font when a sticky exists", async () => {
    const engine = new SpatialEngine();
    engine.addNode(sticky("s1", 10, 10));

    const out = await buildBoardSVG(engine, { format: "svg" });
    expect(out).not.toBeNull();
    // @font-face rule for the bundled default font (Excalifont), injected in <defs>
    expect(out!.svg).toContain("<defs><style>");
    expect(out!.svg).toContain("@font-face");
    expect(out!.svg).toContain("font-family: 'Excalifont'");
    // Sticky text renders in the default font, not generic sans-serif
    // (font-family attribute value is XML-escaped by the exporter)
    expect(out!.svg).toContain("&#39;Excalifont&#39;, sans-serif");
  });

  it("renders every edge above every non-edge node regardless of z", async () => {
    const engine = new SpatialEngine();
    engine.addNode(shape("a", 0, 0, 5, "#aa0000"));
    engine.addNode(shape("b", 200, 0, 4, "#aa0000"));
    engine.addNode(edge("e1", "a", "b", 0, "#0000ee")); // lower z than both shapes

    const out = await buildBoardSVG(engine, { format: "svg" });
    expect(out).not.toBeNull();
    const svg = out!.svg;
    const lastShapeIdx = svg.lastIndexOf('"#aa0000"');
    const edgeIdx = svg.indexOf('"#0000ee"');
    expect(lastShapeIdx).toBeGreaterThan(-1);
    expect(edgeIdx).toBeGreaterThan(-1);
    // Edge markup must come after ALL shape markup (canvas: DOM layer under SVG layer)
    expect(edgeIdx).toBeGreaterThan(lastShapeIdx);
  });

  it("open draw path with fill set gets NO fill; closed loop gets fill", async () => {
    const arc: Array<[number, number, number]> = [];
    for (let i = 0; i <= 24; i++) {
      const a = (i / 24) * Math.PI;
      arc.push([60 + 60 * Math.cos(a), 60 + 60 * Math.sin(a), 0.5]);
    }
    const loop: Array<[number, number, number]> = [];
    for (let i = 0; i <= 40; i++) {
      const a = (i / 40) * Math.PI * 2;
      loop.push([60 + 50 * Math.cos(a), 60 + 50 * Math.sin(a), 0.5]);
    }
    const drawNode = (id: string, x: number, points: Array<[number, number, number]>): DrawNode => ({
      id,
      type: "draw",
      x,
      y: 0,
      w: 130,
      h: 130,
      z: 1,
      data: {
        tool: "pen",
        points,
        color: "#123123",
        strokeWidth: 4,
        fill: "#00ff00",
        fillStyle: "solid",
      },
    });

    const openEngine = new SpatialEngine();
    openEngine.addNode(drawNode("d-open", 0, arc));
    const openOut = await buildBoardSVG(openEngine, { format: "svg" });
    expect(openOut).not.toBeNull();
    expect(openOut!.svg).not.toContain('fill="#00ff00"'); // open, no loop => no fill
    expect(openOut!.svg).toContain('fill="#123123"'); // stroke outline still painted

    const closedEngine = new SpatialEngine();
    closedEngine.addNode(drawNode("d-closed", 0, loop));
    const closedOut = await buildBoardSVG(closedEngine, { format: "svg" });
    expect(closedOut).not.toBeNull();
    expect(closedOut!.svg).toContain('fill="#00ff00"'); // closed => solid fill
  });

  it("frameId scopes the export to the frame rect and its contents", async () => {
    const engine = new SpatialEngine();
    const frame: FrameNode = {
      id: "f1",
      type: "frame",
      x: 0,
      y: 0,
      w: 400,
      h: 300,
      z: 0,
      data: { label: "Hero Frame" },
    };
    engine.addNode(frame);
    engine.addNode(shape("in1", 50, 50, 1, "#111111"));
    engine.addNode(shape("in2", 250, 50, 2, "#222222"));
    engine.addNode(shape("out1", 1000, 1000, 3, "#ee00ee"));
    engine.addNode(edge("e-in", "in1", "in2", 1, "#00aa00")); // both endpoints inside
    engine.addNode(edge("e-out", "in1", "out1", 1, "#dd0044")); // one endpoint outside

    const out = await buildBoardSVG(engine, { format: "svg", frameId: "f1" });
    expect(out).not.toBeNull();
    // Cropped to the frame's own rect, padding defaults to 0 for frame exports
    expect(out!.width).toBe(400);
    expect(out!.height).toBe(300);
    const svg = out!.svg;
    expect(svg).toContain('"#111111"');
    expect(svg).toContain('"#222222"');
    expect(svg).toContain('"#00aa00"'); // fully-inside edge kept
    expect(svg).not.toContain('"#ee00ee"'); // node outside the frame excluded
    expect(svg).toContain('"#dd0044"'); // edge with one endpoint inside is included (clipped by the viewBox)

    // Board-wide export still includes everything
    const boardOut = await buildBoardSVG(engine, { format: "svg" });
    expect(boardOut!.svg).toContain('"#ee00ee"');

    // Unknown / non-frame ids export nothing
    expect(await buildBoardSVG(engine, { format: "svg", frameId: "in1" })).toBeNull();
    expect(await buildBoardSVG(engine, { format: "svg", frameId: "nope" })).toBeNull();
  });
});
