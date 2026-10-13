import { describe, it, expect } from "vitest";
import {
  SpatialEngine,
  NodeTypeRegistry,
  DataFlowEngine,
  type NodeTypeDef,
  type SpatialNode,
} from "../engine";

/*
 * Recompute-path robustness for the data-flow engine, exercised headlessly
 * (no React board). Two hazards a per-node resolver introduces on recompute:
 * a resolver that throws, and a resolver that narrows a node's output ports
 * while the node stays alive.
 */

/** Let the engine's queued microtask flush (and any async compute landings)
 *  run before asserting. */
const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

/** A plain data-only spatial node, mirroring the host's node shape. */
function makeNode(id: string, type: string, data: Record<string, unknown>): SpatialNode {
  return { id, type, x: 0, y: 0, w: 100, h: 60, z: 1, data } as unknown as SpatialNode;
}

describe("DataFlowEngine recompute robustness", () => {
  it("parks a throwing ports resolver and keeps flushing the rest of the topo order", async () => {
    // `boom` resolves its ports through host code that throws once its data
    // says to; `tail` sits downstream of it and drives its own output from its
    // data, so a recompute is observable independently of boom.
    const boom: NodeTypeDef<Record<string, unknown>> = {
      type: "boom",
      ports: (node) => {
        if ((node.data as Record<string, unknown>).explode) {
          throw new Error("ports resolver blew up");
        }
        return [{ id: "out", direction: "output", dataType: "number" }];
      },
      compute: () => ({ out: 1 }),
    };
    const tail: NodeTypeDef<Record<string, unknown>> = {
      type: "tail",
      ports: [
        { id: "in", direction: "input", dataType: "number" },
        { id: "out", direction: "output", dataType: "number" },
      ],
      compute: (_inputs, data) => ({ out: Number(data.tag ?? 0) }),
    };

    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([boom, tail]);
    engine.addNode(makeNode("boom", "boom", { explode: false }));
    engine.addNode(makeNode("tail", "tail", { tag: 1 }));
    // The edge only forces the topo order boom < tail — tail reads its data,
    // not this input.
    engine.createEdge("boom", "tail", { sourcePort: "out", targetPort: "in" });

    const dfe = new DataFlowEngine(engine, registry);
    dfe.connect();
    await settle();

    // Baseline: both nodes computed, no parked error.
    expect(dfe.getPortValue("tail", "out")).toBe(1);
    expect(dfe.getComputeError("boom")).toBeUndefined();

    // Make boom's resolver throw, and give tail a reason to recompute.
    engine.updateNode("boom", { data: { explode: true } });
    engine.updateNode("tail", { data: { tag: 2 } });
    await settle();

    // The throw is parked for boom, and tail — later in the topo order — still
    // recomputed instead of being abandoned by an escaped throw.
    expect(dfe.getComputeError("boom")).toBeInstanceOf(Error);
    expect(dfe.getPortValue("tail", "out")).toBe(2);
  });

  it("drops the value of an output port a live node stops emitting", async () => {
    // `narrow` emits `keep` always and `out` only while its data is wide;
    // `reader` reads `narrow.out` over an edge that outlives the port.
    const narrow: NodeTypeDef<Record<string, unknown>> = {
      type: "narrow",
      ports: (node) => {
        const wide = (node.data as Record<string, unknown>).wide;
        const ports = [
          { id: "keep", direction: "output" as const, dataType: "number" as const },
        ];
        if (wide) {
          ports.push({ id: "out", direction: "output" as const, dataType: "number" as const });
        }
        return ports;
      },
      compute: (_inputs, data) =>
        data.wide ? { keep: 10, out: 20 } : { keep: 10 },
    };
    const reader: NodeTypeDef<Record<string, unknown>> = {
      type: "reader",
      ports: [
        { id: "in", direction: "input", dataType: "number" },
        { id: "echo", direction: "output", dataType: "number" },
      ],
      compute: (inputs) => ({ echo: inputs.in }),
    };

    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([narrow, reader]);
    engine.addNode(makeNode("narrow", "narrow", { wide: true }));
    engine.addNode(makeNode("reader", "reader", {}));
    engine.createEdge("narrow", "reader", { sourcePort: "out", targetPort: "in" });

    const dfe = new DataFlowEngine(engine, registry);
    dfe.connect();
    await settle();

    // Baseline: both ports carry values and the reader sees `out`.
    expect(dfe.getPortValue("narrow", "keep")).toBe(10);
    expect(dfe.getPortValue("narrow", "out")).toBe(20);
    expect(dfe.getPortValue("reader", "echo")).toBe(20);

    // Narrow the node: the resolver stops emitting `out`, the node stays alive.
    engine.updateNode("narrow", { data: { wide: false } });
    await settle();

    // The dropped port reads null (its stale value is gone), the surviving
    // port is untouched, and the downstream edge re-propagated to null.
    expect(dfe.getPortValue("narrow", "out")).toBeNull();
    expect(dfe.getPortValue("narrow", "keep")).toBe(10);
    expect(dfe.getPortValue("reader", "echo")).toBeNull();
  });
});
