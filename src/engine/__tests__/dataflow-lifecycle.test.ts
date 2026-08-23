import { describe, it, expect } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import { DataFlowEngine } from "../DataFlowEngine";
import { NodeTypeRegistry } from "../../nodes/registry";
import type { NodeTypeDefinition } from "../../nodes/registry";
import type { SpatialNode, EdgeNode } from "../types";
import type { PortValue } from "../data-flow-types";

/*
 * Lifecycle edges of the data-flow engine: deleting an upstream node must
 * flush its dependents (deleteNode cascades edges away without events, so the
 * delete handler's downstream marking is the only signal there is); a
 * recreated node reusing a deleted node's id must not accept the dead
 * instance's late async result; one throwing compute must not cost the rest
 * of the flush its recompute (nor surface as an unhandled rejection); and
 * dispose() must sever the engine even when the host never called the
 * connect() cleanup.
 */

const NUM: NodeTypeDefinition = {
  type: "t-num",
  ports: [{ id: "out", direction: "output", dataType: "number" }],
  compute: (_inputs, data) => ({ out: (data as { value?: number }).value ?? 5 }),
};

const SUM: NodeTypeDefinition = {
  type: "t-sum",
  ports: [
    { id: "a", direction: "input", dataType: "number" },
    { id: "sum", direction: "output", dataType: "number" },
  ],
  compute: (inputs) => ({ sum: Number(inputs.a ?? 0) + 1 }),
};

function cardNode(id: string, type: string, x = 0, data: Record<string, unknown> = {}): SpatialNode {
  return { id, type, x, y: 0, w: 120, h: 60, z: 1, data } as SpatialNode;
}

function portEdge(id: string, fromId: string, toId: string, targetPort = "a"): EdgeNode {
  return {
    id,
    type: "edge",
    x: 0, y: 0, w: 0, h: 0,
    z: 10,
    data: { fromId, toId, sourcePort: "out", targetPort },
  } as EdgeNode;
}

/** The flush runs on a microtask; async output application may chain one
 *  more. A macrotask hop drains them all. */
function drain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("upstream delete flushes dependents", () => {
  it("deleteNode of a source recomputes downstream without another event", async () => {
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([NUM, SUM]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("a", "t-num", 0, { value: 50 }));
    engine.addNode(cardNode("s", "t-sum", 300));
    engine.addNode(portEdge("e1", "a", "s"));
    await drain();
    expect(flow.getOutputs("s")).toEqual({ sum: 51 });

    engine.deleteNode("a");
    await drain();
    // The input edge is gone, so the sum falls back to its default input —
    // not the stale 51 computed from the deleted source.
    expect(flow.getOutputs("s")).toEqual({ sum: 1 });
  });

  it("deleteNodes (bulk) recomputes survivors downstream of the batch", async () => {
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([NUM, SUM]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("a", "t-num", 0, { value: 50 }));
    engine.addNode(cardNode("b", "t-num", 0, { value: 70 }));
    engine.addNode(cardNode("s", "t-sum", 300));
    engine.addNode(portEdge("e1", "a", "s"));
    await drain();
    expect(flow.getOutputs("s")).toEqual({ sum: 51 });

    engine.deleteNodes(["a", "b"]);
    await drain();
    expect(flow.getOutputs("s")).toEqual({ sum: 1 });
  });
});

describe("generation guard across id reuse", () => {
  it("a deleted node's late async result does not land on its recreated id", async () => {
    // Both instances compute ASYNC so both mint a generation — the dead
    // instance's counter used to be deleted with the node, letting the
    // recreated node re-mint the same number and the stale promise match it.
    const resolvers: Array<(v: Record<string, PortValue>) => void> = [];
    const ASYNC_NUM: NodeTypeDefinition = {
      type: "t-async",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () =>
        new Promise<Record<string, PortValue>>((resolve) => {
          resolvers.push(resolve);
        }),
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([ASYNC_NUM]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();

    engine.addNode(cardNode("x", "t-async"));
    await drain();
    expect(resolvers.length).toBe(1);

    // Delete the instance while its compute is in flight, then recreate the
    // SAME id (serialized boards carry deterministic ids).
    engine.deleteNode("x");
    engine.addNode(cardNode("x", "t-async"));
    await drain();
    expect(resolvers.length).toBe(2);

    // The recreated node's own run lands...
    resolvers[1]({ out: 99 });
    await drain();
    expect(flow.getPortValue("x", "out")).toBe(99);

    // ...and the dead instance's late resolution is discarded, not applied
    // over it.
    resolvers[0]({ out: 51 });
    await drain();
    expect(flow.getPortValue("x", "out")).toBe(99);
  });
});

describe("throwing computes", () => {
  it("a sync throw parks the error and the rest of the flush still runs", async () => {
    const BOOM: NodeTypeDefinition = {
      type: "t-boom",
      ports: [
        { id: "a", direction: "input", dataType: "number" },
        { id: "out", direction: "output", dataType: "number" },
      ],
      compute: (inputs, data) => {
        if ((data as { bomb?: boolean }).bomb) throw new Error("boom");
        return { out: Number(inputs.a ?? 0) };
      },
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([NUM, BOOM, SUM]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("a", "t-num", 0, { value: 50 }));
    // Wire the thrower FIRST so it precedes its healthy sibling in the
    // adjacency walk — the sibling's recompute is exactly what an escaping
    // throw used to destroy.
    engine.addNode(cardNode("b", "t-boom", 300, { bomb: true }));
    engine.addNode(cardNode("s", "t-sum", 300));
    engine.addNode(portEdge("e1", "a", "b"));
    engine.addNode(portEdge("e2", "a", "s"));
    await drain();

    expect(flow.getOutputs("s")).toEqual({ sum: 51 });
    expect(flow.getComputeError("b")).toBeInstanceOf(Error);
    expect((flow.getComputeError("b") as Error).message).toBe("boom");

    // Defusing the node clears the parked error on its next successful run.
    engine.updateNode("b", { data: { bomb: false } });
    await drain();
    expect(flow.getComputeError("b")).toBeUndefined();
    expect(flow.getOutputs("b")).toEqual({ out: 50 });
  });

  it("a throwing property getter in the outputs parks like a throwing compute", async () => {
    // The change check reads output properties, so a hostile plain-object
    // payload can throw from inside applyOutputs — same failure class as a
    // throwing compute, and it must not cost the rest of the flush either.
    const HOSTILE: NodeTypeDefinition = {
      type: "t-hostile",
      ports: [{ id: "out", direction: "output", dataType: "object" }],
      compute: () => ({
        out: Object.defineProperty({}, "boom", {
          enumerable: true,
          get() {
            throw new Error("getter boom");
          },
        }) as Record<string, never>,
      }),
    };
    let ticks = 0;
    const TICK: NodeTypeDefinition = {
      type: "t-tick",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () => ({ out: ++ticks }),
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([HOSTILE, TICK]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("h", "t-hostile"));
    engine.addNode(cardNode("n", "t-tick", 300));
    await drain();
    // First run stores the object against null without reading properties —
    // the getter fires on the SECOND run, when the change check compares the
    // stored payload against the fresh one.
    expect(flow.getComputeError("h")).toBeUndefined();
    expect(ticks).toBe(1);

    flow.markDirty("h");
    flow.markDirty("n");
    await drain();
    expect((flow.getComputeError("h") as Error).message).toBe("getter boom");
    // The sibling genuinely RE-RAN after the hostile node failed — a value
    // that merely stayed put would pass even if the flush had aborted.
    expect(ticks).toBe(2);
    expect(flow.getOutputs("n")).toEqual({ out: 2 });
  });

  it("an async rejection parks instead of surfacing as an unhandled rejection", async () => {
    const rejections: unknown[] = [];
    const onUnhandled = (reason: unknown) => rejections.push(reason);
    process.on("unhandledRejection", onUnhandled);
    try {
      const REJECT: NodeTypeDefinition = {
        type: "t-reject",
        ports: [{ id: "out", direction: "output", dataType: "number" }],
        compute: () => Promise.reject(new Error("async boom")),
      };
      const engine = new SpatialEngine();
      const registry = new NodeTypeRegistry([REJECT]);
      const flow = new DataFlowEngine(engine, registry);
      flow.connect();
      engine.addNode(cardNode("r", "t-reject"));
      await drain();
      await drain();

      expect(rejections).toEqual([]);
      expect(flow.getComputeError("r")).toBeInstanceOf(Error);
      expect((flow.getComputeError("r") as Error).message).toBe("async boom");
    } finally {
      process.off("unhandledRejection", onUnhandled);
    }
  });

  it("a sync run supersedes an in-flight async run — its landing neither overwrites values nor clears the newer error", async () => {
    // The compute flips shape run to run: async first (held), then sync.
    let release: ((v: Record<string, PortValue>) => void) | null = null;
    let run = 0;
    const FLIP: NodeTypeDefinition = {
      type: "t-flip",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: (_inputs, data) => {
        run++;
        if (run === 1) {
          return new Promise<Record<string, PortValue>>((resolve) => {
            release = resolve;
          });
        }
        if ((data as { bomb?: boolean }).bomb) throw new Error("newer boom");
        return { out: 200 };
      },
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([FLIP]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("f", "t-flip"));
    await drain(); // run 1 in flight

    engine.updateNode("f", { data: {} }); // run 2, sync success
    await drain();
    expect(flow.getPortValue("f", "out")).toBe(200);

    release!({ out: 51 }); // the superseded run lands late
    await drain();
    expect(flow.getPortValue("f", "out")).toBe(200);

    // Same shape, but run 2 THROWS: the old landing must not erase the
    // newer parked error either.
    release = null;
    run = 0;
    const engine2 = new SpatialEngine();
    const flow2 = new DataFlowEngine(engine2, new NodeTypeRegistry([FLIP]));
    flow2.connect();
    engine2.addNode(cardNode("f", "t-flip"));
    await drain(); // run 1 in flight
    engine2.updateNode("f", { data: { bomb: true } }); // run 2 throws
    await drain();
    expect((flow2.getComputeError("f") as Error).message).toBe("newer boom");

    release!({ out: 51 });
    await drain();
    expect((flow2.getComputeError("f") as Error).message).toBe("newer boom");
    expect(flow2.getPortValue("f", "out")).toBeNull();
  });

  it("a compute that throws undefined still reads as a parked error", async () => {
    const UNDEF: NodeTypeDefinition = {
      type: "t-undef",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () => {
        // eslint-disable-next-line no-throw-literal
        throw undefined;
      },
    };
    const engine = new SpatialEngine();
    const flow = new DataFlowEngine(engine, new NodeTypeRegistry([UNDEF]));
    flow.connect();
    engine.addNode(cardNode("u", "t-undef"));
    await drain();

    expect(flow.getComputeError("u")).toBeInstanceOf(Error);
  });

  it("re-parking the identical error object does not re-notify", async () => {
    const SINGLETON = new Error("cached boom");
    const CACHED: NodeTypeDefinition = {
      type: "t-cached",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () => {
        throw SINGLETON;
      },
    };
    const engine = new SpatialEngine();
    const flow = new DataFlowEngine(engine, new NodeTypeRegistry([CACHED]));
    flow.connect();
    engine.addNode(cardNode("c", "t-cached"));
    await drain();

    let notified = 0;
    flow.onChange(() => notified++);
    flow.markDirty("c");
    await drain();
    flow.markDirty("c");
    await drain();
    // The error state never transitioned after the first park, so the
    // re-runs must stay silent — hosts render per notification.
    expect(notified).toBe(0);
    expect(flow.getComputeError("c")).toBe(SINGLETON);
  });

  it("an error transition notifies change listeners", async () => {
    const BOOM: NodeTypeDefinition = {
      type: "t-boom",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: (_inputs, data) => {
        if ((data as { bomb?: boolean }).bomb) throw new Error("boom");
        return { out: 1 };
      },
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([BOOM]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("b", "t-boom", 0, { bomb: false }));
    await drain();

    let notified = 0;
    flow.onChange(() => notified++);
    engine.updateNode("b", { data: { bomb: true } });
    await drain();
    // The outputs did not change (last good values kept) — the notification
    // is for the parked error itself, so hosts can render it.
    expect(notified).toBeGreaterThan(0);
    expect(flow.getComputeError("b")).toBeInstanceOf(Error);
  });
});

describe("dispose severs the engine", () => {
  it("stops recomputing even when the host never called the connect cleanup", async () => {
    let calls = 0;
    const COUNTER: NodeTypeDefinition = {
      type: "t-counter",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () => ({ out: ++calls }),
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([COUNTER]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect(); // cleanup intentionally dropped
    engine.addNode(cardNode("c1", "t-counter"));
    await drain();
    expect(calls).toBe(1);

    flow.dispose();
    engine.addNode(cardNode("c2", "t-counter"));
    await drain();
    expect(calls).toBe(1);
    expect(flow.getPortValue("c2", "out")).toBeNull();
  });

  it("a dispose + connect revival never accepts a pre-dispose in-flight result", async () => {
    // dispose() must BUMP the counters, not clear them: cleared, a revival's
    // first async run re-mints the number the dead promise still holds.
    const resolvers: Array<(v: Record<string, PortValue>) => void> = [];
    const HANG: NodeTypeDefinition = {
      type: "t-hang",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () =>
        new Promise<Record<string, PortValue>>((resolve) => {
          resolvers.push(resolve);
        }),
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([HANG]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("x", "t-hang"));
    await drain();
    expect(resolvers.length).toBe(1);

    flow.dispose();
    flow.connect(); // revival re-runs everything, minting a NEW generation
    await drain();
    expect(resolvers.length).toBe(2);

    resolvers[0]({ out: 51 }); // the dead instance's landing
    await drain();
    expect(flow.getPortValue("x", "out")).toBeNull();

    resolvers[1]({ out: 99 }); // the revival's own landing still works
    await drain();
    expect(flow.getPortValue("x", "out")).toBe(99);
  });

  it("markDirty after dispose does not recompute", async () => {
    let calls = 0;
    const COUNTER: NodeTypeDefinition = {
      type: "t-counter",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () => ({ out: ++calls }),
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([COUNTER]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("c1", "t-counter"));
    await drain();
    expect(calls).toBe(1);

    flow.dispose();
    flow.markDirty("c1"); // a host that kept the reference
    await drain();
    expect(calls).toBe(1);
  });

  it("a compute disposing the engine mid-flush stops the rest of the flush", async () => {
    let downstreamRuns = 0;
    let flow: DataFlowEngine;
    const KILLER: NodeTypeDefinition = {
      type: "t-killer",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () => {
        flow.dispose();
        return { out: 1 };
      },
    };
    const LATER: NodeTypeDefinition = {
      type: "t-later",
      ports: [
        { id: "a", direction: "input", dataType: "number" },
        { id: "out", direction: "output", dataType: "number" },
      ],
      compute: (inputs) => {
        downstreamRuns++;
        return { out: Number(inputs.a ?? 0) };
      },
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([KILLER, LATER]);
    flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("k", "t-killer"));
    engine.addNode(cardNode("l", "t-later", 300));
    engine.addNode(portEdge("e1", "k", "l"));
    await drain();

    expect(downstreamRuns).toBe(0);
    expect(flow.getPortValue("l", "out")).toBeNull();
  });

  it("an async result resolving after dispose does not resurrect values", async () => {
    let release: ((v: Record<string, PortValue>) => void) | null = null;
    const HANG: NodeTypeDefinition = {
      type: "t-hang",
      ports: [{ id: "out", direction: "output", dataType: "number" }],
      compute: () =>
        new Promise<Record<string, PortValue>>((resolve) => {
          release = resolve;
        }),
    };
    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([HANG]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();
    engine.addNode(cardNode("x", "t-hang"));
    await drain();
    expect(release).not.toBeNull();

    flow.dispose();
    release!({ out: 42 });
    await drain();
    expect(flow.getPortValue("x", "out")).toBeNull();
  });
});
