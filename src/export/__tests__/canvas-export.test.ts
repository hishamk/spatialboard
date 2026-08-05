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

  it("interleaves edges with nodes by z (unified stack)", async () => {
    const engine = new SpatialEngine();
    engine.addNode(shape("a", 0, 0, 5, "#aa0000"));
    engine.addNode(shape("b", 200, 0, 4, "#aa0000"));
    engine.addNode(edge("e1", "a", "b", 0, "#0000ee")); // lower z than both shapes

    const out = await buildBoardSVG(engine, { format: "svg" });
    expect(out).not.toBeNull();
    const svg = out!.svg;
    const firstShapeIdx = svg.indexOf('"#aa0000"');
    const edgeIdx = svg.indexOf('"#0000ee"');
    expect(firstShapeIdx).toBeGreaterThan(-1);
    expect(edgeIdx).toBeGreaterThan(-1);
    // Unified z-order: the z=0 edge paints BELOW the z=4/5 shapes.
    expect(edgeIdx).toBeLessThan(firstShapeIdx);
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

  it("paints one unified z-order (send-to-back edge under nodes, newest edge on top)", async () => {
    const engine = new SpatialEngine();
    const a = engine.createShape("rect", 0, 0, 100, 80, { stroke: "#111111" });
    const b = engine.createShape("rect", 300, 0, 100, 80, { stroke: "#111111" });
    const under = engine.createEdge(a, b, { color: "#00bbbb" });
    const over = engine.createEdge(a, b, { color: "#bb00bb" });
    engine.sendToBack([under]);
    const svg = (await buildBoardSVG(engine, { format: "svg" }))!.svg;
    const shapeIdx = svg.indexOf("#111111");
    const lastShapeIdx = svg.lastIndexOf("#111111");
    expect(svg.indexOf("#00bbbb")).toBeLessThan(shapeIdx);      // demoted edge under all nodes
    expect(svg.indexOf("#bb00bb")).toBeGreaterThan(lastShapeIdx); // default edge above all nodes
  });

  it("renders table nodes: rough grid, bold header, cell text, embedded font", async () => {
    const engine = new SpatialEngine();
    engine.addNode({
      id: "tbl1",
      type: "table",
      x: 0,
      y: 0,
      w: 330,
      h: "auto",
      z: 1,
      data: {
        rows: [
          ["Name", "Qty"],
          ["Apples", "3"],
          ["Pears", "7"],
        ],
        headerRow: true,
        roughness: 1,
      },
    } as never);

    const out = await buildBoardSVG(engine, { format: "svg" });
    expect(out).not.toBeNull();
    const svg = out!.svg;
    // Cell text present
    expect(svg).toContain("Apples");
    expect(svg).toContain("Qty");
    // Header row renders bold
    expect(svg).toContain('<g font-weight="700">');
    // Hand-drawn grid: rough path strokes in the default ink
    expect(svg).toContain('stroke="#1e1e2e"');
    expect(svg).toContain('stroke-linecap="round"');
    // Table text embeds the default font, same as sticky
    expect(svg).toContain("@font-face");
  });

  it("rotates draw nodes around an offset-space origin (rotated library items stay in view)", async () => {
    const engine = new SpatialEngine();
    // Vector node far from the origin so ox is large — the historical bug
    // rotated around canvas-space coords, flinging the node out of the viewBox.
    engine.addNode({
      id: "rotv", type: "draw", x: 900, y: 700, w: 100, h: 80, z: 1,
      data: {
        tool: "vector", color: "#0aa", strokeWidth: 2, fill: "#a0a",
        points: [[0, 0, 0.5], [100, 0, 0.5], [100, 80, 0.5], [0, 80, 0.5]],
      },
      rotation: 45,
    } as never);
    const out = await buildBoardSVG(engine, { format: "svg" });
    const svg = out!.svg;
    // Bounds are rotation-aware: a 100×80 node at 45° spans (100+80)/√2 ≈
    // 127.28 per axis, so with pad 40 the offset-space center sits at
    // 40 + 127.28/2 ≈ 103.64 — and the whole rotated node stays in view.
    expect(svg).toMatch(/rotate\(45, 103\.6\d+, 103\.6\d+\)/);
    expect(svg).not.toContain("rotate(45, 950, 740)"); // the canvas-space (broken) origin
    // viewBox includes the rotated corners (127.28 + 2×40 padding per axis)
    expect(out!.width).toBeCloseTo(207.28, 1);
    expect(out!.height).toBeCloseTo(207.28, 1);
  });
});
