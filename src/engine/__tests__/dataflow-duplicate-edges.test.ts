import { describe, it, expect } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import { DataFlowEngine } from "../DataFlowEngine";
import { NodeTypeRegistry } from "../../nodes/registry";
import type { NodeTypeDefinition } from "../../nodes/registry";
import type { SpatialNode, EdgeNode } from "../types";

/*
 * Duplicate port wires between the same pair of nodes must not read as a
 * cycle. The topo sort dedupes adjacency into a Set, so its in-degree count
 * has to be per unique pair too — counted per edge, a twin wire leaves the
 * target's in-degree stuck above zero and the node lands in cycleNodeIds
 * with its compute silently never running.
 */

const NUM: NodeTypeDefinition = {
  type: "t-num",
  ports: [{ id: "out", direction: "output", dataType: "number" }],
  compute: () => ({ out: 5 }),
};

const SUM: NodeTypeDefinition = {
  type: "t-sum",
  ports: [
    { id: "a", direction: "input", dataType: "number" },
    { id: "sum", direction: "output", dataType: "number" },
  ],
  compute: (inputs) => ({ sum: Number(inputs.a ?? 0) + 1 }),
};

function cardNode(id: string, type: string, x = 0): SpatialNode {
  return { id, type, x, y: 0, w: 120, h: 60, z: 1, data: {} } as SpatialNode;
}

function rawPortEdge(id: string, fromId: string, toId: string): EdgeNode {
  return {
    id,
    type: "edge",
    x: 0, y: 0, w: 0, h: 0,
    z: 10,
    data: { fromId, toId, sourcePort: "out", targetPort: "a" },
  } as EdgeNode;
}

/** The flush runs on a microtask; async output application may chain one
 *  more. A macrotask hop drains them all. */
function drain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function setup() {
  const engine = new SpatialEngine();
  const registry = new NodeTypeRegistry([NUM, SUM]);
  const flow = new DataFlowEngine(engine, registry);
  const disconnect = flow.connect();
  engine.addNode(cardNode("a", "t-num"));
  engine.addNode(cardNode("s", "t-sum", 300));
  return { engine, flow, disconnect };
}

describe("DataFlowEngine duplicate port wires", () => {
  it("computes through a duplicated wire instead of reporting a false cycle", async () => {
    const { engine, flow } = setup();
    // Bypass createEdge's dedupe with raw nodes — boards serialized before
    // the dedupe existed can contain exact twins, and the sort must still
    // handle them.
    engine.addNode(rawPortEdge("e1", "a", "s"));
    engine.addNode(rawPortEdge("e2", "a", "s"));
    await drain();

    expect(flow.cycleNodeIds.size).toBe(0);
    expect(flow.getOutputs("s")).toEqual({ sum: 6 });
  });

  it("createEdge returns the existing id for an exact duplicate port wire", async () => {
    const { engine, flow } = setup();
    const first = engine.createEdge("a", "s", { sourcePort: "out", targetPort: "a" });
    const second = engine.createEdge("a", "s", { sourcePort: "out", targetPort: "a" });

    expect(second).toBe(first);
    expect(engine.getAllEdges()).toHaveLength(1);
    await drain();
    expect(flow.getOutputs("s")).toEqual({ sum: 6 });
  });

  it("still creates a second wire when a port differs", () => {
    const { engine } = setup();
    const first = engine.createEdge("a", "s", { sourcePort: "out", targetPort: "a" });
    const second = engine.createEdge("s", "a", { sourcePort: "sum", targetPort: "a" });
    expect(second).not.toBe(first);
    expect(engine.getAllEdges()).toHaveLength(2);
  });

  it("still creates a second freeform edge between the same nodes", () => {
    const { engine } = setup();
    const first = engine.createEdge("a", "s");
    const second = engine.createEdge("a", "s");
    expect(second).not.toBe(first);
    expect(engine.getAllEdges()).toHaveLength(2);
  });

  it("still detects a real cycle", async () => {
    const { engine, flow } = setup();
    engine.addNode(rawPortEdge("e1", "a", "s"));
    // The source type has no input port, so the loop closes between two sums.
    engine.addNode(cardNode("s2", "t-sum", 600));
    engine.addNode({
      id: "e2", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 11,
      data: { fromId: "s", toId: "s2", sourcePort: "sum", targetPort: "a" },
    } as EdgeNode);
    engine.addNode({
      id: "e3", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 12,
      data: { fromId: "s2", toId: "s", sourcePort: "sum", targetPort: "a" },
    } as EdgeNode);
    await drain();

    expect(flow.cycleNodeIds.has("s")).toBe(true);
    expect(flow.cycleNodeIds.has("s2")).toBe(true);
    // The acyclic source stays computable.
    expect(flow.getOutputs("a")).toEqual({ out: 5 });
  });
});
