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

/** Collect unhandled rejections raised while `body` runs and settles. */
async function captureUnhandled(body: () => Promise<void>): Promise<unknown[]> {
  const seen: unknown[] = [];
  const onUnhandled = (reason: unknown) => seen.push(reason);
  process.on("unhandledRejection", onUnhandled);
  try {
    await body();
    await settle();
    await settle();
  } finally {
    process.off("unhandledRejection", onUnhandled);
  }
  return seen;
}

const OUT: PortDefinition[] = [{ id: "out", direction: "output", dataType: "number" }];
const AB: PortDefinition[] = [
  { id: "a", direction: "output", dataType: "number" },
  { id: "b", direction: "output", dataType: "number" },
];

describe("DataFlowEngine liveness after host code", () => {
  it("writes nothing for a node whose sync compute deletes it", async () => {
    const engine = new SpatialEngine();
    const selfDelete: NodeTypeDef<Record<string, unknown>> = {
      type: "self-delete",
      ports: OUT,
      compute: () => {
        engine.deleteNode("a");
        return { out: 1 };
      },
    };
    engine.addNode(makeNode("a", "self-delete", {}));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([selfDelete]));
    dfe.connect();
    await settle();

    expect(engine.nodes.has("a")).toBe(false);
    expect(dfe.getPortValue("a", "out")).toBeNull();
    expect(dfe.getLastComputeMs("a")).toBeUndefined();
    expect(dfe.getComputeError("a")).toBeUndefined();
  });

  it("writes nothing into an engine its sync compute disposes", async () => {
    const engine = new SpatialEngine();
    let dfe!: DataFlowEngine;
    let disposals = 0;
    const disposer: NodeTypeDef<Record<string, unknown>> = {
      type: "disposer",
      ports: OUT,
      compute: () => {
        if (disposals++ === 0) dfe.dispose();
        return { out: 1 };
      },
    };
    engine.addNode(makeNode("a", "disposer", {}));
    dfe = new DataFlowEngine(engine, new NodeTypeRegistry([disposer]));
    dfe.connect();
    await settle();

    expect(dfe.getPortValue("a", "out")).toBeNull();
    expect(dfe.getLastComputeMs("a")).toBeUndefined();

    // Reconnecting starts clean: the pre-dispose run left nothing behind, and
    // the value only appears once the new life recomputes it.
    dfe.connect();
    expect(dfe.getPortValue("a", "out")).toBeNull();
    await settle();
    expect(dfe.getPortValue("a", "out")).toBe(1);
  });

  it("writes nothing into an engine a compute disposes and reconnects", async () => {
    const engine = new SpatialEngine();
    let dfe!: DataFlowEngine;
    let runs = 0;
    const reviver: NodeTypeDef<Record<string, unknown>> = {
      type: "reviver",
      ports: OUT,
      compute: () => {
        runs++;
        if (runs === 1) {
          dfe.dispose();
          dfe.connect();
          return { out: 1 };
        }
        // The revived engine's own run fails, so any value left on the port
        // can only have come from the run that began before the dispose.
        throw new Error("revived run failed");
      },
    };
    engine.addNode(makeNode("a", "reviver", {}));
    dfe = new DataFlowEngine(engine, new NodeTypeRegistry([reviver]));
    dfe.connect();
    await settle();

    expect(runs).toBe(2);
    expect(dfe.getComputeError("a")).toBeInstanceOf(Error);
    expect(dfe.getPortValue("a", "out")).toBeNull();
  });

  it("writes nothing for a node whose async compute deletes it before returning", async () => {
    const engine = new SpatialEngine();
    const selfDelete: NodeTypeDef<Record<string, unknown>> = {
      type: "self-delete-async",
      ports: OUT,
      compute: () => {
        engine.deleteNode("a");
        return Promise.resolve({ out: 1 });
      },
    };
    engine.addNode(makeNode("a", "self-delete-async", {}));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([selfDelete]));
    dfe.connect();
    await settle();
    await settle();

    expect(dfe.getPortValue("a", "out")).toBeNull();
    expect(dfe.getLastComputeMs("a")).toBeUndefined();
  });

  it("writes nothing into an engine its async compute disposes before returning", async () => {
    const engine = new SpatialEngine();
    let dfe!: DataFlowEngine;
    const disposer: NodeTypeDef<Record<string, unknown>> = {
      type: "disposer-async",
      ports: OUT,
      compute: () => {
        dfe.dispose();
        return Promise.resolve({ out: 1 });
      },
    };
    engine.addNode(makeNode("a", "disposer-async", {}));
    dfe = new DataFlowEngine(engine, new NodeTypeRegistry([disposer]));
    dfe.connect();
    await settle();
    await settle();

    expect(dfe.getPortValue("a", "out")).toBeNull();
    expect(dfe.getLastComputeMs("a")).toBeUndefined();
  });

  it("parks nothing for a deleted node whose abandoned promise rejects, and the rejection stays handled", async () => {
    const engine = new SpatialEngine();
    let dfe!: DataFlowEngine;
    const unhandled = await captureUnhandled(async () => {
      const selfDelete: NodeTypeDef<Record<string, unknown>> = {
        type: "self-delete-reject",
        ports: OUT,
        compute: () => {
          engine.deleteNode("a");
          return Promise.reject(new Error("rejected after delete"));
        },
      };
      engine.addNode(makeNode("a", "self-delete-reject", {}));
      dfe = new DataFlowEngine(engine, new NodeTypeRegistry([selfDelete]));
      dfe.connect();
      await settle();
    });

    expect(unhandled).toEqual([]);
    expect(dfe.getComputeError("a")).toBeUndefined();
    expect(dfe.getPortValue("a", "out")).toBeNull();
  });

  it("parks nothing for a ports resolver that deletes its own node and throws", async () => {
    const engine = new SpatialEngine();
    const resolverDelete: NodeTypeDef<Record<string, unknown>> = {
      type: "resolver-delete-throw",
      ports: (node) => {
        if (engine.nodes.has(node.id)) engine.deleteNode(node.id);
        throw new Error("resolver threw after delete");
      },
      compute: () => ({ out: 1 }),
    };
    engine.addNode(makeNode("a", "resolver-delete-throw", {}));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([resolverDelete]));
    dfe.connect();
    await settle();

    expect(engine.nodes.has("a")).toBe(false);
    expect(dfe.getComputeError("a")).toBeUndefined();
  });

  it("skips compute for a node its ports resolver deletes", async () => {
    const engine = new SpatialEngine();
    let computes = 0;
    const resolverDelete: NodeTypeDef<Record<string, unknown>> = {
      type: "resolver-delete",
      ports: (node) => {
        if (engine.nodes.has(node.id)) engine.deleteNode(node.id);
        return OUT;
      },
      compute: () => {
        computes++;
        return { out: 1 };
      },
    };
    engine.addNode(makeNode("a", "resolver-delete", {}));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([resolverDelete]));
    dfe.connect();
    await settle();

    expect(computes).toBe(0);
    expect(dfe.getPortValue("a", "out")).toBeNull();
    expect(dfe.getLastComputeMs("a")).toBeUndefined();
  });

  it("keeps no value for a node an output getter deletes mid-write", async () => {
    const engine = new SpatialEngine();
    const getterDelete = (id: string): NodeTypeDef<Record<string, unknown>> => ({
      type: `getter-delete-${id}`,
      ports: OUT,
      compute: () => {
        const outputs = {
          get out() {
            if (engine.nodes.has(id)) engine.deleteNode(id);
            return 5;
          },
        };
        return id === "s" ? outputs : Promise.resolve(outputs);
      },
    });
    engine.addNode(makeNode("s", "getter-delete-s", {}));
    engine.addNode(makeNode("p", "getter-delete-p", {}));
    const dfe = new DataFlowEngine(
      engine,
      new NodeTypeRegistry([getterDelete("s"), getterDelete("p")]),
    );
    dfe.connect();
    await settle();
    await settle();

    expect(engine.nodes.has("s")).toBe(false);
    expect(engine.nodes.has("p")).toBe(false);
    expect(dfe.getPortValue("s", "out")).toBeNull();
    expect(dfe.getPortValue("p", "out")).toBeNull();
    expect(dfe.getLastComputeMs("s")).toBeUndefined();
    expect(dfe.getLastComputeMs("p")).toBeUndefined();
  });

  it("keeps no value for a node a getter deletes before a later getter throws", async () => {
    // Port `a` is written before port `b`'s getter throws, so the write has to
    // be undone on the throwing path too, sync and async alike.
    const engine = new SpatialEngine();
    const twoPort = (id: string, async: boolean): NodeTypeDef<Record<string, unknown>> => ({
      type: `two-port-${id}`,
      ports: AB,
      compute: () => {
        const outputs = {
          get a() {
            if (engine.nodes.has(id)) engine.deleteNode(id);
            return 1;
          },
          get b(): number {
            throw new Error("b getter");
          },
        };
        return async ? Promise.resolve(outputs) : outputs;
      },
    });
    engine.addNode(makeNode("s", "two-port-s", {}));
    engine.addNode(makeNode("p", "two-port-p", {}));
    const dfe = new DataFlowEngine(
      engine,
      new NodeTypeRegistry([twoPort("s", false), twoPort("p", true)]),
    );
    dfe.connect();
    await settle();
    await settle();

    for (const id of ["s", "p"]) {
      expect(engine.nodes.has(id)).toBe(false);
      expect(dfe.getPortValue(id, "a")).toBeNull();
      expect(dfe.getComputeError(id)).toBeUndefined();
      expect(dfe.getLastComputeMs(id)).toBeUndefined();
    }
  });

  it("keeps no value in an engine a getter disposes before a later getter throws", async () => {
    const engine = new SpatialEngine();
    let dfe!: DataFlowEngine;
    const disposer: NodeTypeDef<Record<string, unknown>> = {
      type: "two-port-disposer",
      ports: AB,
      compute: () => ({
        get a() {
          dfe.dispose();
          return 1;
        },
        get b(): number {
          throw new Error("b getter");
        },
      }),
    };
    engine.addNode(makeNode("n", "two-port-disposer", {}));
    dfe = new DataFlowEngine(engine, new NodeTypeRegistry([disposer]));
    dfe.connect();
    await settle();

    expect(dfe.getPortValue("n", "a")).toBeNull();
  });

  it("keeps a getter's dispose-and-reconnect from carrying a value into the next life", async () => {
    const engine = new SpatialEngine();
    let dfe!: DataFlowEngine;
    let runs = 0;
    const reviver: NodeTypeDef<Record<string, unknown>> = {
      type: "two-port-reviver",
      ports: AB,
      compute: () => {
        runs++;
        if (runs > 1) throw new Error("revived run failed");
        return {
          get a() {
            dfe.dispose();
            dfe.connect();
            return 1;
          },
          get b(): number {
            throw new Error("b getter");
          },
        };
      },
    };
    engine.addNode(makeNode("n", "two-port-reviver", {}));
    dfe = new DataFlowEngine(engine, new NodeTypeRegistry([reviver]));
    dfe.connect();
    await settle();

    expect(runs).toBe(2);
    expect(dfe.getComputeError("n")).toBeInstanceOf(Error);
    expect(dfe.getPortValue("n", "a")).toBeNull();
  });

  it("keeps the outputs of a compute that updates its own node", async () => {
    // Moving the node replaces its object without re-marking it dirty, so the
    // value can only come from the run that did the update.
    const engine = new SpatialEngine();
    let runs = 0;
    const mover: NodeTypeDef<Record<string, unknown>> = {
      type: "mover",
      ports: OUT,
      compute: () => {
        runs++;
        engine.updateNode("a", { x: 50 });
        return { out: 7 };
      },
    };
    engine.addNode(makeNode("a", "mover", {}));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([mover]));
    dfe.connect();
    await settle();

    expect(runs).toBe(1);
    expect(dfe.getPortValue("a", "out")).toBe(7);
  });
});

describe("DataFlowEngine malformed edge data", () => {
  /** head → mid → tail, where mid passes its input through and tail doubles
   *  it. mid's input defaults to 100 when nothing feeds it. */
  function chain(headCompute: NodeTypeDef<Record<string, unknown>>["compute"]) {
    const head: NodeTypeDef<Record<string, unknown>> = {
      type: "head",
      ports: OUT,
      compute: headCompute,
    };
    const mid: NodeTypeDef<Record<string, unknown>> = {
      type: "mid",
      ports: [
        { id: "in", direction: "input", dataType: "number", defaultValue: 100 },
        { id: "out", direction: "output", dataType: "number" },
      ],
      compute: (inputs) => ({ out: inputs.in }),
    };
    const tail: NodeTypeDef<Record<string, unknown>> = {
      type: "tail",
      ports: [
        { id: "in", direction: "input", dataType: "number" },
        { id: "out", direction: "output", dataType: "number" },
      ],
      compute: (inputs) => ({ out: Number(inputs.in) * 2 }),
    };
    const engine = new SpatialEngine();
    engine.addNode(makeNode("head", "head", { v: 1 }));
    engine.addNode(makeNode("mid", "mid", {}));
    engine.addNode(makeNode("tail", "tail", {}));
    const feed = engine.createEdge("head", "mid", { sourcePort: "out", targetPort: "in" });
    engine.createEdge("mid", "tail", { sourcePort: "out", targetPort: "in" });
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([head, mid, tail]));
    return { engine, dfe, feed };
  }

  it.each([
    ["undefined", undefined],
    ["null", null],
  ])("treats an edge whose data is %s as no edge during a recompute", async (_label, bad) => {
    const { engine, dfe, feed } = chain((_inputs, data) => ({ out: Number(data.v) }));
    const unhandled = await captureUnhandled(async () => {
      dfe.connect();
      await settle();
      expect(dfe.getPortValue("tail", "out")).toBe(2);

      engine.updateNode(feed, { data: bad } as unknown as Partial<SpatialNode>);
      engine.updateNode("head", { data: { v: 3 } });
      engine.updateNode("mid", { data: { tick: 1 } });
      await settle();
    });

    expect(unhandled).toEqual([]);
    // mid lost its feed, so it reads its input default and tail follows.
    expect(dfe.getPortValue("head", "out")).toBe(3);
    expect(dfe.getComputeError("mid")).toBeUndefined();
    expect(dfe.getPortValue("mid", "out")).toBe(100);
    expect(dfe.getPortValue("tail", "out")).toBe(200);
  });

  it("keeps port reads, async landings, and edge deletes quiet around a malformed edge", async () => {
    const { engine, dfe, feed } = chain((_inputs, data) =>
      Promise.resolve({ out: Number(data.v) }),
    );
    const unhandled = await captureUnhandled(async () => {
      dfe.connect();
      await settle();
      await settle();
      expect(dfe.getPortValue("tail", "out")).toBe(2);

      engine.updateNode(feed, { data: undefined } as unknown as Partial<SpatialNode>);
      expect(dfe.getAllPortValues("mid")).toEqual({ in: 100, out: 1 });

      // head's async landing walks head's edges, the malformed one included.
      engine.updateNode("head", { data: { v: 5 } });
      await settle();
      await settle();
      expect(dfe.getPortValue("head", "out")).toBe(5);

      expect(() => engine.deleteNode(feed)).not.toThrow();
      expect(engine.nodes.has(feed)).toBe(false);
      await settle();
    });

    expect(unhandled).toEqual([]);
    expect(dfe.getComputeError("head")).toBeUndefined();
    expect(dfe.getComputeError("mid")).toBeUndefined();
  });

  it("ignores a data-less edge that a failed add leaves on the board", async () => {
    const { engine, dfe } = chain((_inputs, data) => ({ out: Number(data.v) }));
    const unhandled = await captureUnhandled(async () => {
      dfe.connect();
      await settle();

      // addNode stores the edge before rejecting its missing data, so the
      // edge stays in the node map; the create event itself never fires.
      const bare = { id: "bare", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1 } as unknown as SpatialNode;
      expect(() => engine.addNode(bare)).toThrow();
      expect(engine.nodes.has("bare")).toBe(true);
      // A host replaying the event by hand reaches the engine's create handler.
      expect(() => engine.emit("node:create", bare)).not.toThrow();

      engine.updateNode("head", { data: { v: 4 } });
      await settle();
    });

    expect(unhandled).toEqual([]);
    expect(dfe.getPortValue("tail", "out")).toBe(8);
  });
});

describe("DataFlowEngine node data isolation from host callbacks", () => {
  it("keeps a resolver's in-place writes out of the board and its undo history", async () => {
    const engine = new SpatialEngine();
    const scribbler: NodeTypeDef<Record<string, unknown>> = {
      type: "scribbler",
      ports: (node) => {
        (node.data as Record<string, unknown>).touched = true;
        (node as { x: number }).x = 999;
        return OUT;
      },
      compute: (_inputs, data) => ({ out: Number(data.v) }),
    };
    engine.addNode(makeNode("a", "scribbler", { v: 1 }));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([scribbler]));
    dfe.connect();
    await settle();

    expect(dfe.getPortValue("a", "out")).toBe(1);
    expect(engine.nodes.get("a")!.data).toEqual({ v: 1 });
    expect(engine.nodes.get("a")!.x).toBe(0);

    engine.updateNodeWithHistory("a", { data: { v: 2 } });
    await settle();
    expect(engine.nodes.get("a")!.data).toEqual({ v: 2 });

    engine.undo();
    await settle();
    expect(engine.nodes.get("a")!.data).toEqual({ v: 1 });
    expect(dfe.getPortValue("a", "out")).toBe(1);

    engine.redo();
    await settle();
    expect(engine.nodes.get("a")!.data).toEqual({ v: 2 });
  });

  it("keeps a compute's in-place writes out of the board", async () => {
    const engine = new SpatialEngine();
    const scribbler: NodeTypeDef<Record<string, unknown>> = {
      type: "compute-scribbler",
      ports: OUT,
      compute: (_inputs, data) => {
        data.touched = true;
        return { out: Number(data.v) };
      },
    };
    engine.addNode(makeNode("a", "compute-scribbler", { v: 3 }));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([scribbler]));
    dfe.connect();
    await settle();

    expect(dfe.getPortValue("a", "out")).toBe(3);
    expect(engine.nodes.get("a")!.data).toEqual({ v: 3 });
  });

  it("hands a ports resolver a shallow copy of the node and its data", () => {
    const seen: SpatialNode[] = [];
    const def: NodeTypeDef<unknown> = {
      type: "probe",
      ports: (node) => {
        seen.push(node);
        return OUT;
      },
    };

    const objectNode = makeNode("o", "probe", { v: 1, nested: { k: 1 } });
    resolveNodePorts(def, objectNode);
    expect(seen[0]).not.toBe(objectNode);
    expect(seen[0].data).not.toBe(objectNode.data);
    expect(seen[0].data).toEqual(objectNode.data);
    // Shallow: nested objects stay shared.
    expect((seen[0].data as { nested: unknown }).nested).toBe(
      (objectNode.data as { nested: unknown }).nested,
    );

    const list = [1, 2, 3];
    const arrayNode = { ...makeNode("l", "probe", {}), data: list } as SpatialNode;
    resolveNodePorts(def, arrayNode);
    expect(Array.isArray(seen[1].data)).toBe(true);
    expect(seen[1].data).not.toBe(list);
    expect(seen[1].data).toEqual(list);

    for (const value of [null, undefined, 42, "text"]) {
      const before = seen.length;
      resolveNodePorts(def, { ...makeNode("p", "probe", {}), data: value } as SpatialNode);
      expect(seen[before].data).toBe(value);
    }

    class Payload {
      v = 1;
    }
    const instance = new Payload();
    const before = seen.length;
    resolveNodePorts(def, { ...makeNode("c", "probe", {}), data: instance } as SpatialNode);
    expect(seen[before].data).toBe(instance);

    // The static-array form is returned verbatim, with no copy involved.
    const staticDef: NodeTypeDef<unknown> = { type: "static", ports: OUT };
    expect(resolveNodePorts(staticDef, objectNode)).toBe(OUT);
  });
});

describe("DataFlowEngine async runs around host code", () => {
  /** A promise the test settles by hand. */
  function deferred() {
    let resolve!: (v: Record<string, unknown>) => void;
    let reject!: (e: unknown) => void;
    const promise = new Promise<Record<string, unknown>>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }

  it("retires an in-flight async run when a newer run's resolver throws", async () => {
    const engine = new SpatialEngine();
    const pending: ReturnType<typeof deferred>[] = [];
    const slow: NodeTypeDef<Record<string, unknown>> = {
      type: "slow",
      ports: (node) => {
        if ((node.data as Record<string, unknown>).explode) {
          throw new Error("ports resolver blew up");
        }
        return OUT;
      },
      compute: () => {
        const d = deferred();
        pending.push(d);
        return d.promise as Promise<Record<string, never>>;
      },
    };
    engine.addNode(makeNode("n", "slow", { v: 1 }));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([slow]));
    dfe.connect();
    await settle();
    pending[0].resolve({ out: 1 });
    await settle();
    expect(dfe.getPortValue("n", "out")).toBe(1);

    // A second run goes in flight, then a third stops at its resolver.
    engine.updateNode("n", { data: { v: 2 } });
    await settle();
    expect(pending).toHaveLength(2);
    engine.updateNode("n", { data: { explode: true } });
    await settle();
    expect(dfe.getComputeError("n")).toBeInstanceOf(Error);

    // The superseded run lands late: it neither writes nor clears the error.
    pending[1].resolve({ out: 2 });
    await settle();
    expect(dfe.getComputeError("n")).toBeInstanceOf(Error);
    expect(dfe.getPortValue("n", "out")).toBe(1);
  });

  it("parks no error for a node removed without an event before its run rejects", async () => {
    const engine = new SpatialEngine();
    const pending: ReturnType<typeof deferred>[] = [];
    const slow: NodeTypeDef<Record<string, unknown>> = {
      type: "slow-reject",
      ports: OUT,
      compute: () => {
        const d = deferred();
        pending.push(d);
        return d.promise as Promise<Record<string, never>>;
      },
    };
    engine.addNode(makeNode("n", "slow-reject", {}));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([slow]));
    dfe.connect();
    await settle();
    expect(pending).toHaveLength(1);

    engine.deleteRemoteNode("n");
    pending[0].reject(new Error("late rejection"));
    await settle();

    expect(engine.nodes.has("n")).toBe(false);
    expect(dfe.getComputeError("n")).toBeUndefined();
  });

  it("parks a promise whose then throws and keeps flushing the rest of the topo order", async () => {
    const engine = new SpatialEngine();
    const unhandled = await captureUnhandled(async () => {
      const odd: NodeTypeDef<Record<string, unknown>> = {
        type: "odd-promise",
        ports: OUT,
        compute: () => {
          const p = Promise.resolve({ out: 1 });
          Object.defineProperty(p, "then", {
            value: () => {
              throw new Error("then threw");
            },
          });
          return p;
        },
      };
      const tail: NodeTypeDef<Record<string, unknown>> = {
        type: "tail",
        ports: [
          { id: "in", direction: "input", dataType: "number" },
          { id: "out", direction: "output", dataType: "number" },
        ],
        compute: (_inputs, data) => ({ out: Number(data.tag ?? 0) }),
      };
      engine.addNode(makeNode("odd", "odd-promise", {}));
      engine.addNode(makeNode("tail", "tail", { tag: 1 }));
      engine.createEdge("odd", "tail", { sourcePort: "out", targetPort: "in" });
      const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([odd, tail]));
      dfe.connect();
      await settle();

      expect(dfe.getComputeError("odd")).toBeInstanceOf(Error);
      expect(dfe.getPortValue("tail", "out")).toBe(1);
    });
    expect(unhandled).toEqual([]);
  });

  it("keeps a throwing then on an abandoned promise inside the flush", async () => {
    const engine = new SpatialEngine();
    const gone: NodeTypeDef<Record<string, unknown>> = {
      type: "gone-odd",
      ports: OUT,
      compute: () => {
        engine.deleteNode("gone");
        const p = Promise.resolve({ out: 1 });
        Object.defineProperty(p, "then", {
          value: () => {
            throw new Error("then threw");
          },
        });
        return p;
      },
    };
    const tail: NodeTypeDef<Record<string, unknown>> = {
      type: "tail",
      ports: OUT,
      compute: (_inputs, data) => ({ out: Number(data.tag ?? 0) }),
    };
    engine.addNode(makeNode("gone", "gone-odd", {}));
    engine.addNode(makeNode("tail", "tail", { tag: 3 }));
    const dfe = new DataFlowEngine(engine, new NodeTypeRegistry([gone, tail]));
    dfe.connect();
    await settle();

    expect(engine.nodes.has("gone")).toBe(false);
    expect(dfe.getComputeError("gone")).toBeUndefined();
    expect(dfe.getPortValue("tail", "out")).toBe(3);
  });
});
