import { describe, it, expect } from "vitest";
import {
  embedSBDInPNG,
  extractSBDFromPNG,
  embedSBDInSVG,
  extractSBDFromSVG,
} from "../embedded-sbd";
import { SpatialEngine } from "../../engine/SpatialEngine";
import { parseSBD } from "../../serialization/sbd-parser";

/** 1×1 transparent PNG. */
const TINY_PNG = Uint8Array.from(
  atob(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  ),
  (c) => c.charCodeAt(0),
);

const SAMPLE_SBD = [
  "<!--@meta sbd=\"3\" background=\"dot-grid\" -->",
  "<!--@sticky id=\"st1\" x=\"0\" y=\"0\" w=\"200\" h=\"120\" z=\"1\" color=\"#FEF3C7\" -->",
  "hello — unicode ✓ 日本語",
  "",
].join("\n");

describe("embedded SBD — PNG", () => {
  it("round-trips the source through an iTXt chunk", () => {
    const embedded = embedSBDInPNG(TINY_PNG, SAMPLE_SBD);
    // Signature + IHDR untouched
    expect([...embedded.subarray(0, 8)]).toEqual([...TINY_PNG.subarray(0, 8)]);
    expect(embedded.length).toBeGreaterThan(TINY_PNG.length);
    expect(extractSBDFromPNG(embedded)).toBe(SAMPLE_SBD);
  });

  it("replaces a previous embed instead of stacking", () => {
    const once = embedSBDInPNG(TINY_PNG, "first");
    const twice = embedSBDInPNG(once, SAMPLE_SBD);
    expect(extractSBDFromPNG(twice)).toBe(SAMPLE_SBD);
    // Only one spatialboard chunk: stripping it again returns the original size
    const third = embedSBDInPNG(twice, "x");
    expect(third.length).toBeLessThan(twice.length + 40); // no accumulation
  });

  it("returns null for a PNG without an embed and passes garbage through", () => {
    expect(extractSBDFromPNG(TINY_PNG)).toBeNull();
    const notPng = new Uint8Array([1, 2, 3, 4]);
    expect(extractSBDFromPNG(notPng)).toBeNull();
    expect(embedSBDInPNG(notPng, "x")).toBe(notPng);
  });
});

describe("embedded SBD — SVG", () => {
  it("round-trips through <metadata>, XML-safely", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>`;
    const nasty = `${SAMPLE_SBD}\n<!-- --> </svg> "quotes" & ampersands`;
    const embedded = embedSBDInSVG(svg, nasty);
    expect(embedded).toContain("</svg>");
    expect(extractSBDFromSVG(embedded)).toBe(nasty);
  });

  it("replaces a previous embed and returns null when absent", () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`;
    const twice = embedSBDInSVG(embedSBDInSVG(svg, "first"), "second");
    expect(extractSBDFromSVG(twice)).toBe("second");
    expect((twice.match(/<metadata/g) || []).length).toBe(1);
    expect(extractSBDFromSVG(svg)).toBeNull();
  });
});

describe("editable export round-trip", () => {
  it("board → SBD → PNG embed → extract → parse restores the nodes", async () => {
    const engine = new SpatialEngine();
    const a = engine.createSticky("editable export", 10, 10, { w: 180 });
    const b = engine.createShape("rect", 300, 10, 120, 80, { stroke: "#111" });
    engine.createEdge(a, b, { arrowHead: "arrow" });

    const sbd = await engine.toSBD();
    const png = embedSBDInPNG(TINY_PNG, sbd);
    const recovered = extractSBDFromPNG(png);
    expect(recovered).toBe(sbd);

    const parsed = await parseSBD(recovered!);
    expect(parsed.nodes.length).toBe(3);
    expect(parsed.nodes.map((n) => n.type).sort()).toEqual(["edge", "shape", "sticky"]);

    // insertNodesAt clones with fresh ids and preserves edge wiring
    const target = new SpatialEngine();
    target.insertNodesAt(parsed.nodes, 500, 500);
    const inserted = target.getAllNodes();
    expect(inserted.length).toBe(3);
    const edge = inserted.find((n) => n.type === "edge")!;
    const ids = new Set(inserted.map((n) => n.id));
    expect(ids.has((edge.data as { fromId: string }).fromId)).toBe(true);
    expect(ids.has((edge.data as { toId: string }).toId)).toBe(true);
    // Fresh ids — no collisions with the source board
    for (const n of inserted) {
      expect(engine.getNode(n.id)).toBeUndefined();
    }
  });
});
