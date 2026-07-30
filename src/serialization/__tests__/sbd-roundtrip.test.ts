import { describe, it, expect } from "vitest";
import { parseSBD } from "../sbd-parser";
import { serializeToSBD } from "../sbd-serializer";
import type { SpatialNode, StickyNoteNode, ShapeNode, EdgeNode, FrameNode, TextNode } from "../../engine/types";

/* Content (@block) nodes are deliberately absent here: their markdown body
 * codec goes through BlockNote, which needs more than a bare Node runtime.
 * Everything else round-trips through the pure SBD codec under test. */

const sticky = (id: string, x: number, y: number, text: string, extra: Partial<StickyNoteNode> = {}): StickyNoteNode =>
  ({
    id, type: "sticky", x, y, w: 200, h: 150, z: 1,
    data: { text, color: "#FEF3C7" },
    ...extra,
  }) as StickyNoteNode;

const frame = (id: string, x: number, y: number, w = 400, h = 300): FrameNode =>
  ({ id, type: "frame", x, y, w, h, z: 0, data: { label: `Frame ${id}` } }) as FrameNode;

describe("SBD grammar", () => {
  it("parses multi-line directives", async () => {
    const doc = [
      '<!--@meta sbd="3" -->',
      "<!--@sticky id=\"s1\"",
      '    x="100"',
      '    y="200"',
      '    w="180" h="120" z="2"',
      '    color="#FDE68A" -->',
      "hello from a multi-line directive",
    ].join("\n");
    const { nodes, meta, warnings } = await parseSBD(doc);
    expect(warnings).toEqual([]);
    expect(meta.version).toBe(3);
    expect(nodes).toHaveLength(1);
    const n = nodes[0] as StickyNoteNode;
    expect([n.x, n.y, n.w, n.h, n.z]).toEqual([100, 200, 180, 120, 2]);
    expect(n.data.text).toBe("hello from a multi-line directive");
    expect(n.data.color).toBe("#FDE68A");
  });

  it("documents without a version stamp (and with unknown meta attrs) parse", async () => {
    const doc = [
      '<!--@meta canvas_w="2000" canvas_h="1500" grid="20" snap="false" -->',
      '<!--@sticky id="s1" x="10" y="20" w="200" h="150" z="1" color="#FEF3C7" -->',
      "plain sticky",
    ].join("\n");
    const { nodes, meta, warnings } = await parseSBD(doc);
    expect(warnings).toEqual([]);
    expect(meta.version).toBeUndefined();
    expect(nodes).toHaveLength(1);
    expect(nodes[0].type).toBe("sticky");
  });

  it("degrades hostile input to warnings, never crashes (robustness contract)", async () => {
    // Non-finite geometry must be clamped, not poison the viewport.
    const inf = await parseSBD('<!--@sticky id="s1" x="1e400" y="0" w="Infinity" h="NaN" color="#FEF3C7" -->\nx');
    expect(inf.nodes).toHaveLength(1);
    expect(Number.isFinite(inf.nodes[0].x)).toBe(true);
    expect(Number.isFinite(inf.nodes[0].w)).toBe(true);
    expect(inf.nodes[0].w).toBeGreaterThanOrEqual(0);
    expect(inf.nodes[0].h === "auto" || Number.isFinite(inf.nodes[0].h)).toBe(true);

    // An oversized stroke is truncated with a warning, not dropped.
    const pts = Array.from({ length: 60000 }, (_, i) => `${i},${i},0.5`).join(" ");
    const big = await parseSBD(`<!--@draw id="d1" tool="pen" color="#000" width="2" -->\n${pts}`);
    const draw = big.nodes.find((n) => n.type === "draw")!;
    expect((draw.data as { points: unknown[] }).points.length).toBeLessThanOrEqual(20000);
    expect(big.warnings.some((w) => /truncated/.test(w))).toBe(true);
  });

  it("strips prototype-pollution keys from @node JSON bodies", async () => {
    const doc = [
      '<!--@node type="widget" id="n1" x="0" y="0" w="100" h="100" z="1" -->',
      '{ "__proto__": { "polluted": true }, "constructor": { "bad": 1 }, "keep": 42 }',
    ].join("\n");
    const { nodes } = await parseSBD(doc);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined(); // Object.prototype clean
    const data = nodes[0].data as Record<string, unknown>;
    expect(data.keep).toBe(42);
    expect(Object.prototype.hasOwnProperty.call(data, "__proto__")).toBe(false);
  });

  it("resolves parent-relative coordinates regardless of document order", async () => {
    const doc = [
      '<!--@meta sbd="3" -->',
      // child BEFORE its parent frame
      '<!--@sticky id="child" x="20" y="30" w="100" h="80" z="1" parent="f1" color="#FEF3C7" -->',
      "inside",
      '<!--@frame id="f1" x="500" y="600" w="400" h="300" z="0" parent="f0" -->',
      '<!--@frame id="f0" x="1000" y="2000" w="900" h="900" z="0" -->',
    ].join("\n");
    const { nodes, warnings } = await parseSBD(doc);
    expect(warnings).toEqual([]);
    const child = nodes.find((n) => n.id === "child")!;
    const f1 = nodes.find((n) => n.id === "f1")!;
    // f1 resolves against f0 first, child against resolved f1
    expect([f1.x, f1.y]).toEqual([1500, 2600]);
    expect([child.x, child.y]).toEqual([1520, 2630]);
  });

  it("degrades to absolute coordinates + warning when parent is missing", async () => {
    const doc = [
      '<!--@meta sbd="3" -->',
      '<!--@sticky id="orphan" x="20" y="30" w="100" h="80" z="1" parent="ghost" color="#FEF3C7" -->',
      "orphan",
    ].join("\n");
    const { nodes, warnings } = await parseSBD(doc);
    expect(nodes[0].x).toBe(20);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatch(/ghost/);
  });

  it("@node parses base attrs + JSON data body; bad JSON warns instead of dropping the node", async () => {
    const doc = [
      '<!--@meta sbd="3" -->',
      '<!--@node type="analog-clock" id="c1" x="10" y="20" w="200" h="200" z="3" -->',
      "{",
      '  "timezone": "America/Chicago",',
      '  "label": "Houston"',
      "}",
      '<!--@node type="gauge" id="g1" x="1" y="2" w="50" h="50" z="1" -->',
      "{not json}",
    ].join("\n");
    const { nodes, warnings } = await parseSBD(doc);
    expect(nodes).toHaveLength(2);
    const clock = nodes.find((n) => n.id === "c1")!;
    expect(clock.type).toBe("analog-clock");
    expect((clock.data as { timezone: string }).timezone).toBe("America/Chicago");
    const gauge = nodes.find((n) => n.id === "g1")!;
    expect(gauge.data).toEqual({});
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatch(/g1.*invalid JSON/);
  });

  it("@defaults fills missing attributes for later directives of that type", async () => {
    const doc = [
      '<!--@meta sbd="3" -->',
      '<!--@defaults type="sticky" color="#BBF7D0" fontSize="18" -->',
      '<!--@sticky id="a" x="0" y="0" w="200" h="150" z="1" -->',
      "uses defaults",
      '<!--@sticky id="b" x="0" y="200" w="200" h="150" z="1" color="#FECACA" -->',
      "overrides color",
    ].join("\n");
    const { nodes } = await parseSBD(doc);
    const a = nodes.find((n) => n.id === "a") as StickyNoteNode;
    const b = nodes.find((n) => n.id === "b") as StickyNoteNode;
    expect(a.data.color).toBe("#BBF7D0");
    expect(a.data.fontSize).toBe(18);
    expect(b.data.color).toBe("#FECACA");
    expect(b.data.fontSize).toBe(18);
  });

  it("collects warnings for unknown directives instead of failing", async () => {
    const { nodes, warnings } = await parseSBD('<!--@wibble id="x" -->');
    expect(nodes).toEqual([]);
    expect(warnings[0]).toMatch(/@wibble/);
  });
});

describe("SBD escaping", () => {
  it("round-trips sticky text containing directive-lookalike lines", async () => {
    const evil = 'first line\n<!--@sticky id="fake" -->\n  <!--@indented -->\n\\<!--@already-escaped -->';
    const s0 = await serializeToSBD([sticky("s1", 0, 0, evil)]);
    const { nodes, warnings } = await parseSBD(s0);
    expect(warnings).toEqual([]);
    expect(nodes).toHaveLength(1);
    expect((nodes[0] as StickyNoteNode).data.text).toBe(evil);
  });

  it("round-trips attribute values containing quotes and arrow terminators", async () => {
    const shape: ShapeNode = {
      id: "sh1", type: "shape", x: 0, y: 0, w: 100, h: 80, z: 1,
      data: { shape: "rect", stroke: "#000", strokeWidth: 2, roughness: 0, label: 'say "hi" --> then stop' },
    } as ShapeNode;
    const s0 = await serializeToSBD([shape]);
    const { nodes, warnings } = await parseSBD(s0);
    expect(warnings).toEqual([]);
    expect((nodes[0] as ShapeNode).data.label).toBe('say "hi" --> then stop');
  });
});

describe("SBD serialization", () => {
  it("emits nodes in input order (diff stability) with an sbd=3 stamp", async () => {
    const ns: SpatialNode[] = [sticky("z-last", 0, 0, "one"), frame("a-frame", 10, 10), sticky("m-mid", 5, 5, "two")];
    const out = await serializeToSBD(ns);
    expect(out).toContain('sbd="3"');
    const order = ["z-last", "a-frame", "m-mid"].map((id) => out.indexOf(`id="${id}"`));
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("serializes frame children with parent-relative coordinates via parentOf", async () => {
    const f = frame("f1", 1000, 2000);
    const child = sticky("c1", 1040, 2060, "in frame");
    const out = await serializeToSBD([f, child], { parentOf: (id) => (id === "c1" ? "f1" : undefined) });
    expect(out).toMatch(/id="c1" x="40" y="60"[^>]*parent="f1"/);
    // and back
    const { nodes } = await parseSBD(out);
    const c = nodes.find((n) => n.id === "c1")!;
    expect([c.x, c.y]).toEqual([1040, 2060]);
  });

  it("emits custom node types as @node with pretty JSON data", async () => {
    const custom = {
      id: "clock1", type: "analog-clock", x: 80, y: 90, w: 200, h: 200, z: 3,
      data: { timezone: "America/Chicago", label: "Houston" },
    } as unknown as SpatialNode;
    const out = await serializeToSBD([custom]);
    expect(out).toContain('<!--@node type="analog-clock" id="clock1"');
    expect(out).toContain('  "timezone": "America/Chicago"');
    const { nodes, warnings } = await parseSBD(out);
    expect(warnings).toEqual([]);
    expect(nodes[0].type).toBe("analog-clock");
    expect((nodes[0].data as { label: string }).label).toBe("Houston");
  });

  it("is idempotent after one normalization pass (serialize∘parse fixed point)", async () => {
    const ns: SpatialNode[] = [
      frame("f1", 100, 100),
      sticky("s1", 140, 160, "hello\nworld"),
      {
        id: "t1", type: "text", x: 600, y: 50, w: 200, h: "auto", z: 2,
        data: { text: "note --> arrow", fontSize: 20, fontFamily: "Excalifont", color: "#111", align: "left" },
      } as TextNode,
      {
        id: "d1", type: "draw", x: 300, y: 300, w: 50, h: 40, z: 0,
        data: { tool: "pen", color: "#e11", strokeWidth: 2, points: [[0, 0, 0.5], [25.3, 18.7, 0.5], [50, 40, 0.5]] },
      } as DrawNodeLoose,
      {
        id: "e1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 0,
        data: { fromId: "s1", toId: "t1", style: "dashed", color: "#666", strokeWidth: 2, arrowHead: "arrow" },
      } as EdgeNode,
      {
        id: "w1", type: "wf-agent", x: 700, y: 700, w: 260, h: "auto", z: 4,
        data: { label: "Agent", model: "default" },
      } as unknown as SpatialNode,
    ];
    const parentOf = (id: string) => (id === "s1" ? "f1" : undefined);
    const s0 = await serializeToSBD(ns, { parentOf });
    const p1 = await parseSBD(s0);
    expect(p1.warnings).toEqual([]);
    const s1 = await serializeToSBD(p1.nodes);
    const p2 = await parseSBD(s1);
    const s2 = await serializeToSBD(p2.nodes);
    expect(s2).toBe(s1);
  });
});

// draw node literal needs a loose type (points tuple inference)
type DrawNodeLoose = SpatialNode & { data: { tool: string; color: string; strokeWidth: number; points: number[][] } };
