import { describe, it, expect } from "vitest";
import {
  SpatialEngine,
  NodeTypeRegistry,
  DataFlowEngine,
  parseSBD,
  serializeToSBD,
  resolveNodePorts,
  nodeTypeHasPorts,
  portKey,
  DEFAULT_FONT,
  type NodeTypeDef,
  type SpatialNode,
} from "../engine";

/*
 * Exercises the `spatialboard/engine` entry (`src/engine.ts`) as a HEADLESS
 * consumer would: no React board, no components, no CSS. Proves the engine +
 * SBD + data-only node model are usable on their own. The matching static guard
 * (`scripts/assert-headless.mjs`, `npm run verify:headless`) asserts the BUILT
 * engine chunk pulls no react/@blocknote/@mantine/*.woff2.
 */
describe("spatialboard/engine (headless surface)", () => {
  it("exposes the engine + serialization API", () => {
    expect(typeof SpatialEngine).toBe("function");
    expect(typeof NodeTypeRegistry).toBe("function");
    expect(typeof DataFlowEngine).toBe("function");
    expect(typeof parseSBD).toBe("function");
    expect(typeof serializeToSBD).toBe("function");
    expect(typeof portKey).toBe("function");
    expect(DEFAULT_FONT).toBe("Excalifont");
  });

  it("constructs an engine and round-trips SBD with no React/DOM board", async () => {
    const engine = new SpatialEngine();
    const doc = [
      '<!--@meta sbd="3" -->',
      '<!--@sticky id="s1" x="10" y="20" w="180" h="120" z="1" color="#FDE68A" -->',
      "headless hello",
    ].join("\n");
    const { nodes, warnings } = await parseSBD(doc);
    expect(warnings).toEqual([]);
    for (const n of nodes) engine.addNode(n as SpatialNode);
    expect(engine.getAllNodes()).toHaveLength(1);

    const out = await serializeToSBD(engine.getAllNodes());
    expect(out).toContain("headless hello");
    const reparsed = await parseSBD(out);
    expect(reparsed.nodes).toHaveLength(1);
  });

  it("registers a component-less NodeTypeDef and resolves its ports + compute", async () => {
    const adder: NodeTypeDef = {
      type: "headless-adder",
      ports: [
        { id: "a", direction: "input", dataType: "number" },
        { id: "b", direction: "input", dataType: "number" },
        { id: "sum", direction: "output", dataType: "number" },
      ],
      compute: (inputs) => ({
        sum: Number(inputs.a ?? 0) + Number(inputs.b ?? 0),
      }),
    };

    const registry = new NodeTypeRegistry([adder]);
    expect(registry.has("headless-adder")).toBe(true);
    expect(nodeTypeHasPorts(adder)).toBe(true);

    const node = {
      id: "n1", type: "headless-adder", x: 0, y: 0, w: 100, h: 60, z: 1, data: {},
    } as unknown as SpatialNode;
    const ports = resolveNodePorts(adder, node);
    expect((ports ?? []).map((p) => p.id).sort()).toEqual(["a", "b", "sum"]);

    // A data-only node type computes without any component.
    const result = await adder.compute!({ a: 2, b: 3 }, {});
    expect(result).toEqual({ sum: 5 });
  });
});
