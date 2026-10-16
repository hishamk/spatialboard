import { describe, it, expect } from "vitest";
import {
  SpatialEngine,
  NodeTypeRegistry,
  DataFlowEngine,
  resolveNodePorts,
  type NodeTypeDef,
  type PortDefinition,
  type SpatialNode,
} from "../engine";

/*
 * Recompute-path robustness for the data-flow engine, exercised headlessly
 * (no React board). Hazards a per-node resolver introduces on recompute: a
 * resolver that throws, one that narrows a node's output ports while the node
 * stays alive, one that returns a non-array, one that does not answer the same
 * way twice, and one that returns a malformed port entry.
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

  it("treats a resolver returning null as an empty port set and drops stale outputs", async () => {
    // `src` emits `out` while on; once off, its resolver returns null instead
    // of an empty array. `reader` reads `src.out` over an edge that outlives
    // the port.
    const src: NodeTypeDef<Record<string, unknown>> = {
      type: "src",
      ports: (node) =>
        (node.data as Record<string, unknown>).on
          ? [{ id: "out", direction: "output", dataType: "number" }]
          : (null as unknown as PortDefinition[]),
      compute: () => ({ out: 5 }),
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
    const registry = new NodeTypeRegistry([src, reader]);
    engine.addNode(makeNode("src", "src", { on: true }));
    engine.addNode(makeNode("reader", "reader", {}));
    engine.createEdge("src", "reader", { sourcePort: "out", targetPort: "in" });

    const dfe = new DataFlowEngine(engine, registry);
    dfe.connect();
    await settle();

    expect(dfe.getPortValue("src", "out")).toBe(5);
    expect(dfe.getPortValue("reader", "echo")).toBe(5);

    engine.updateNode("src", { data: { on: false } });
    await settle();

    // A null port set behaves like an empty one: the stale value is gone and
    // the downstream edge re-propagated to null.
    expect(dfe.getPortValue("src", "out")).toBeNull();
    expect(dfe.getPortValue("reader", "echo")).toBeNull();
    expect(dfe.getComputeError("src")).toBeUndefined();
  });

  it("resolves a non-array resolver result to an empty port set", () => {
    const node = makeNode("n", "dyn", {});
    const resolverReturning = (value: unknown): NodeTypeDef<unknown> => ({
      type: "dyn",
      ports: () => value as PortDefinition[],
    });

    expect(resolveNodePorts(resolverReturning(null), node)).toEqual([]);
    expect(resolveNodePorts(resolverReturning(undefined), node)).toEqual([]);
    expect(resolveNodePorts(resolverReturning({ id: "out" }), node)).toEqual([]);
    expect(resolveNodePorts(resolverReturning("out"), node)).toEqual([]);

    const resolved: PortDefinition[] = [
      { id: "out", direction: "output", dataType: "number" },
    ];
    expect(resolveNodePorts(resolverReturning(resolved), node)).toBe(resolved);

    const staticPorts: PortDefinition[] = [
      { id: "in", direction: "input", dataType: "number" },
    ];
    expect(resolveNodePorts({ type: "fixed", ports: staticPorts }, node)).toBe(staticPorts);

    expect(resolveNodePorts({ type: "plain" }, node)).toBeUndefined();
  });

  it("resolves a node's ports once per recompute so a flaky resolver cannot escape the flush", async () => {
    // Once armed, `flaky` throws on any second resolve within the same
    // synchronous turn; the counter resets on the next microtask. `tail` sits
    // downstream and drives its output from its own data.
    let callsThisTurn = 0;
    let maxCallsPerTurn = 0;
    const flaky: NodeTypeDef<Record<string, unknown>> = {
      type: "flaky",
      ports: (node) => {
        if ((node.data as Record<string, unknown>).armed) {
          callsThisTurn += 1;
          maxCallsPerTurn = Math.max(maxCallsPerTurn, callsThisTurn);
          if (callsThisTurn === 1) {
            queueMicrotask(() => {
              callsThisTurn = 0;
            });
          } else {
            throw new Error("resolver answered differently the second time");
          }
        }
        return [
          { id: "in", direction: "input", dataType: "number", defaultValue: 3 },
          { id: "out", direction: "output", dataType: "number" },
        ];
      },
      compute: (inputs, data) => ({ out: Number(inputs.in) + Number(data.add ?? 0) }),
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
    const registry = new NodeTypeRegistry([flaky, tail]);
    engine.addNode(makeNode("flaky", "flaky", { armed: false, add: 0 }));
    engine.addNode(makeNode("tail", "tail", { tag: 1 }));
    engine.createEdge("flaky", "tail", { sourcePort: "out", targetPort: "in" });

    const dfe = new DataFlowEngine(engine, registry);
    dfe.connect();
    await settle();

    expect(dfe.getPortValue("flaky", "out")).toBe(3);
    expect(dfe.getPortValue("tail", "out")).toBe(1);

    engine.updateNode("flaky", { data: { armed: true, add: 1 } });
    engine.updateNode("tail", { data: { tag: 2 } });
    await settle();

    // The node computed against its default input, nothing parked, the
    // resolver ran once, and `tail` later in the topo order still recomputed.
    expect(dfe.getComputeError("flaky")).toBeUndefined();
    expect(dfe.getPortValue("flaky", "out")).toBe(4);
    expect(maxCallsPerTurn).toBe(1);
    expect(dfe.getPortValue("tail", "out")).toBe(2);
  });

  it("parks a malformed port entry and keeps flushing the rest of the topo order", async () => {
    // `broken` returns a port list with a null entry once its data says to.
    const broken: NodeTypeDef<Record<string, unknown>> = {
      type: "broken",
      ports: (node) =>
        (node.data as Record<string, unknown>).malformed
          ? ([null] as unknown as PortDefinition[])
          : [{ id: "out", direction: "output", dataType: "number" }],
      compute: () => ({ out: 7 }),
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
    const registry = new NodeTypeRegistry([broken, tail]);
    engine.addNode(makeNode("broken", "broken", { malformed: false }));
    engine.addNode(makeNode("tail", "tail", { tag: 1 }));
    engine.createEdge("broken", "tail", { sourcePort: "out", targetPort: "in" });

    const dfe = new DataFlowEngine(engine, registry);
    dfe.connect();
    await settle();

    expect(dfe.getPortValue("broken", "out")).toBe(7);
    expect(dfe.getComputeError("broken")).toBeUndefined();

    engine.updateNode("broken", { data: { malformed: true } });
    engine.updateNode("tail", { data: { tag: 2 } });
    await settle();

    // The failure parks for `broken`, which keeps its last good output, and
    // `tail` still recomputed.
    expect(dfe.getComputeError("broken")).toBeInstanceOf(Error);
    expect(dfe.getPortValue("broken", "out")).toBe(7);
    expect(dfe.getPortValue("tail", "out")).toBe(2);
  });

  it("keeps getInputs answering for a well-formed node on its own", async () => {
    const sum: NodeTypeDef<Record<string, unknown>> = {
      type: "sum",
      ports: () => [
        { id: "a", direction: "input", dataType: "number", defaultValue: 1 },
        { id: "b", direction: "input", dataType: "number", defaultValue: 2 },
        { id: "out", direction: "output", dataType: "number" },
      ],
      compute: (inputs) => ({ out: Number(inputs.a) + Number(inputs.b) }),
    };
    const src: NodeTypeDef<Record<string, unknown>> = {
      type: "src",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () => ({ out: 10 }),
    };

    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([sum, src]);
    engine.addNode(makeNode("src", "src", {}));
    engine.addNode(makeNode("sum", "sum", {}));
    engine.createEdge("src", "sum", { sourcePort: "out", targetPort: "a" });

    const dfe = new DataFlowEngine(engine, registry);
    dfe.connect();
    await settle();

    expect(dfe.getInputs("sum")).toEqual({ a: 10, b: 2 });
    expect(dfe.getInputs("missing")).toEqual({});
  });
});
