import { describe, it, expect } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import { DataFlowEngine } from "../DataFlowEngine";
import { NodeTypeRegistry } from "../../nodes/registry";
import type { NodeTypeDefinition } from "../../nodes/registry";
import type { PortValue } from "../data-flow-types";
import type { SpatialNode, EdgeNode } from "../types";

/*
 * Arrays are first-class port values (matrices, vectors, token lists), and
 * the output change check is DEEP: a freshly built but structurally equal
 * payload must not mark the downstream dirty — with the old shallow key
 * compare, every recompute of a matrix-producing node re-ran its entire
 * downstream for nothing.
 */

function drain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("array port values", () => {
  it("PortValue admits arrays directly", () => {
    const matrix: PortValue = [
      [1, 2],
      [3, 4],
    ];
    const tokens: PortValue = ["a", "b", "c"];
    expect(Array.isArray(matrix)).toBe(true);
    expect(Array.isArray(tokens)).toBe(true);
  });

  it("flows a matrix through a wire and deep-compares outputs", async () => {
    let sinkRuns = 0;
    const SRC: NodeTypeDefinition = {
      type: "t-mat",
      ports: [{ id: "m", direction: "output", dataType: "object" }],
      // A FRESH array each run — structurally identical until data.k changes.
      compute: (_inputs, data) => ({
        m: [[1, (data as { k?: number }).k ?? 0], [3, 4]],
      }),
    };
    const SINK: NodeTypeDefinition = {
      type: "t-sink",
      ports: [
        { id: "in", direction: "input", dataType: "object" },
        { id: "seen", direction: "output", dataType: "object" },
      ],
      compute: (inputs) => {
        sinkRuns++;
        return { seen: inputs.in };
      },
    };

    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([SRC, SINK]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();

    engine.addNode({ id: "src", type: "t-mat", x: 0, y: 0, w: 100, h: 60, z: 1, data: { k: 2 } } as SpatialNode);
    engine.addNode({ id: "snk", type: "t-sink", x: 300, y: 0, w: 100, h: 60, z: 2, data: {} } as SpatialNode);
    engine.addNode({
      id: "e1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 3,
      data: { fromId: "src", toId: "snk", sourcePort: "m", targetPort: "in" },
    } as EdgeNode);
    await drain();

    expect(flow.getOutputs("snk").seen).toEqual([[1, 2], [3, 4]]);
    const runsAfterSetup = sinkRuns;
    expect(runsAfterSetup).toBeGreaterThan(0);

    // Recompute the source with unchanged data: a fresh-but-equal matrix
    // must NOT re-run the sink.
    flow.markDirty("src");
    await drain();
    expect(sinkRuns).toBe(runsAfterSetup);

    // A genuinely different matrix re-runs it.
    engine.updateNode("src", { data: { k: 9 } });
    await drain();
    expect(sinkRuns).toBe(runsAfterSetup + 1);
    expect(flow.getOutputs("snk").seen).toEqual([[1, 9], [3, 4]]);
  });

  it("treats NaN outputs as unchanged (no recompute churn)", async () => {
    let sinkRuns = 0;
    const SRC: NodeTypeDefinition = {
      type: "t-nan",
      ports: [{ id: "v", direction: "output", dataType: "number" }],
      compute: () => ({ v: Number.NaN }),
    };
    const SINK: NodeTypeDefinition = {
      type: "t-nan-sink",
      ports: [
        { id: "in", direction: "input", dataType: "number" },
        { id: "out", direction: "output", dataType: "number" },
      ],
      compute: (inputs) => {
        sinkRuns++;
        return { out: inputs.in };
      },
    };

    const engine = new SpatialEngine();
    const registry = new NodeTypeRegistry([SRC, SINK]);
    const flow = new DataFlowEngine(engine, registry);
    flow.connect();

    engine.addNode({ id: "src", type: "t-nan", x: 0, y: 0, w: 100, h: 60, z: 1, data: {} } as SpatialNode);
    engine.addNode({ id: "snk", type: "t-nan-sink", x: 300, y: 0, w: 100, h: 60, z: 2, data: {} } as SpatialNode);
    engine.addNode({
      id: "e1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 3,
      data: { fromId: "src", toId: "snk", sourcePort: "v", targetPort: "in" },
    } as EdgeNode);
    await drain();
    const runsAfterSetup = sinkRuns;

    flow.markDirty("src");
    await drain();
    expect(sinkRuns).toBe(runsAfterSetup);
  });
});
