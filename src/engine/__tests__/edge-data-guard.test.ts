import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import { DataFlowEngine } from "../DataFlowEngine";
import { NodeTypeRegistry } from "../../nodes/registry";
import type { NodeTypeDefinition } from "../../nodes/registry";
import type { EdgeNode, SpatialNode } from "../types";

/*
 * An edge is only meaningful with string `fromId`/`toId` endpoints, and the
 * engine's whole-map walks (adjacency rebuild, the delete cascades, z-order
 * and arrange) read them unguarded. Every entry point therefore refuses an
 * edge without endpoint data, and the whole-map walks skip one if it ever
 * reaches the map another way. After each refusal the board must keep
 * working: deletes, undo/redo, hit-testing, z-order and arrange.
 */

function board() {
  const engine = new SpatialEngine();
  const a = engine.createShape("rect", 0, 0, 100, 80);
  const b = engine.createShape("rect", 300, 0, 100, 80);
  const edge = engine.createEdge(a, b);
  return { engine, a, b, edge };
}

function bareEdge(id: string, data: unknown): SpatialNode {
  return { id, type: "edge", x: 0, y: 0, w: 0, h: 0, z: 50, data } as unknown as SpatialNode;
}

const BAD_DATA: Array<[string, unknown]> = [
  ["undefined", undefined],
  ["null", null],
  ["a number", 42],
  ["a string", "a->b"],
  ["missing toId", { fromId: "x" }],
  ["numeric ids", { fromId: 1, toId: 2 }],
];

/** Update patches merge object data into the existing endpoints, so a
 *  partial `{ fromId }` patch is a valid re-point, not a bad edge. */
const BAD_PATCH_DATA = BAD_DATA.filter(([label]) => label !== "missing toId");

/** Everything that walks the whole node map must still run. */
function exerciseBoard(engine: SpatialEngine, a: string, b: string) {
  const c = engine.createShape("rect", 600, 0, 100, 80);
  const d = engine.createShape("rect", 900, 0, 100, 80);
  const e2 = engine.createEdge(a, c);
  expect(() => engine.hitTest(200, 40)).not.toThrow();
  expect(() => engine.hitTestAll(200, 40)).not.toThrow();
  expect(() => engine.bringToFront([e2])).not.toThrow();
  expect(() => engine.sendToBack([e2])).not.toThrow();
  expect(() => engine.bringForward([a])).not.toThrow();
  expect(() => engine.sendBackward([a])).not.toThrow();
  engine.selectMultiple(engine.getAllNodes().map((n) => n.id));
  expect(() => engine.arrangeSelectedNodes()).not.toThrow();
  expect(() => engine.rebuildQuadTree()).not.toThrow();
  expect(() => engine.deleteNode(c)).not.toThrow();
  expect(engine.getNode(e2)).toBeUndefined();
  expect(() => engine.deleteNodes([d])).not.toThrow();
  engine.selectMultiple([b]);
  expect(() => engine.deleteSelected()).not.toThrow();
  expect(() => engine.undo()).not.toThrow();
  expect(() => engine.redo()).not.toThrow();
  expect(() => engine.undo()).not.toThrow();
  expect(() => engine.deleteRemoteNode(a)).not.toThrow();
}

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => {
  warn.mockRestore();
});

describe("addNode / addNodes / addRemoteNode refuse an edge without endpoints", () => {
  it.each(BAD_DATA)("addNode refuses data = %s (no history, no events)", (_label, data) => {
    const { engine, a, b } = board();
    const events: string[] = [];
    engine.on("node:create", () => events.push("node:create"));
    engine.on("change", () => events.push("change"));
    engine.history.clear();
    engine.addNode(bareEdge("bad", data));
    expect(engine.getNode("bad")).toBeUndefined();
    expect(engine.canUndo()).toBe(false);
    expect(events).toEqual([]);
    expect(warn).toHaveBeenCalledTimes(1);
    exerciseBoard(engine, a, b);
  });

  it("addNodes drops only the bad edge", () => {
    const { engine, a, b } = board();
    const good = { id: "s1", type: "shape", x: 0, y: 200, w: 50, h: 50, z: 9, data: { shapeType: "rect" } } as unknown as SpatialNode;
    engine.addNodes([good, bareEdge("bad1", undefined), bareEdge("bad2", { fromId: a })]);
    expect(engine.getNode("s1")).toBeDefined();
    expect(engine.getNode("bad1")).toBeUndefined();
    expect(engine.getNode("bad2")).toBeUndefined();
    expect(warn).toHaveBeenCalledTimes(1);
    exerciseBoard(engine, a, b);
  });

  it.each(BAD_DATA)("addRemoteNode refuses data = %s", (_label, data) => {
    const { engine, a, b } = board();
    engine.addRemoteNode(bareEdge("bad", data));
    expect(engine.getNode("bad")).toBeUndefined();
    exerciseBoard(engine, a, b);
  });

  it("valid edges with empty-string endpoints and self-loops are admitted", () => {
    const { engine, a } = board();
    engine.addNode(bareEdge("empty", { fromId: "", toId: "" }));
    engine.addNode(bareEdge("loop", { fromId: a, toId: a }));
    engine.addRemoteNode(bareEdge("remote-empty", { fromId: "", toId: "" }));
    expect(engine.getNode("empty")).toBeDefined();
    expect(engine.getNode("loop")).toBeDefined();
    expect(engine.getNode("remote-empty")).toBeDefined();
    expect(warn).not.toHaveBeenCalled();
    expect(() => engine.deleteNode(a)).not.toThrow();
    expect(engine.getNode("loop")).toBeUndefined();
  });
});

describe("updates that would leave an edge without endpoints are refused", () => {
  it.each(BAD_PATCH_DATA)("updateNode(edge, { data: %s }) keeps the previous data", (_label, data) => {
    const { engine, a, b, edge } = board();
    const before = engine.getNode(edge)!.data;
    engine.updateNode(edge, { data } as Partial<SpatialNode>);
    expect(engine.getNode(edge)!.data).toEqual(before);
    exerciseBoard(engine, a, b);
  });

  it("a type: 'edge' patch on a shape is refused", () => {
    const { engine, a, b } = board();
    const s = engine.createShape("rect", 0, 300, 50, 50);
    engine.updateNode(s, { type: "edge" } as Partial<SpatialNode>);
    expect(engine.getNode(s)!.type).toBe("shape");
    exerciseBoard(engine, a, b);
  });

  it("updateNodeWithHistory and batchUpdateWithHistory refuse the bad patch", () => {
    const { engine, a, b, edge } = board();
    const before = engine.getNode(edge)!.data;
    engine.updateNodeWithHistory(edge, { data: undefined } as Partial<SpatialNode>);
    engine.batchUpdateWithHistory([{ id: edge, patch: { data: null } as Partial<SpatialNode> }]);
    expect(engine.getNode(edge)!.data).toEqual(before);
    exerciseBoard(engine, a, b);
  });

  it("updateMany applies the good entries of a mixed batch", () => {
    const { engine, a, b, edge } = board();
    const before = engine.getNode(edge)!.data;
    engine.updateMany([
      { id: a, patch: { x: 10 } },
      { id: edge, patch: { data: undefined } as Partial<SpatialNode> },
      { id: b, patch: { x: 310 } },
    ]);
    expect(engine.getNode(a)!.x).toBe(10);
    expect(engine.getNode(b)!.x).toBe(310);
    expect(engine.getNode(edge)!.data).toEqual(before);
    exerciseBoard(engine, a, b);
  });

  it.each(BAD_PATCH_DATA)("applyRemoteNodeUpdate(edge, { data: %s }) keeps the previous data", (_label, data) => {
    const { engine, a, b, edge } = board();
    const before = engine.getNode(edge)!.data;
    engine.applyRemoteNodeUpdate(edge, { data } as Partial<SpatialNode>);
    expect(engine.getNode(edge)!.data).toEqual(before);
    exerciseBoard(engine, a, b);
  });

  it("a partial data patch merges into the existing endpoints", () => {
    const { engine, edge } = board();
    engine.updateNode(edge, { data: { label: "hi" } } as Partial<SpatialNode>);
    const data = engine.getNode(edge)!.data as EdgeNode["data"];
    expect(data.label).toBe("hi");
    expect(typeof data.fromId).toBe("string");
    expect(warn).not.toHaveBeenCalled();
  });
});

describe("fromJSON drops malformed entries at ingress", () => {
  it("drops data-less edges and keeps the rest", () => {
    const { engine } = board();
    const json = engine.toJSON() as { nodes: [string, SpatialNode][] };
    const nodes = [...json.nodes];
    nodes.push(["bad1", bareEdge("bad1", undefined)]);
    nodes.push(["bad2", bareEdge("bad2", { fromId: "x", toId: 7 })]);
    const target = new SpatialEngine();
    target.fromJSON({ nodes });
    expect(target.getNode("bad1")).toBeUndefined();
    expect(target.getNode("bad2")).toBeUndefined();
    expect(target.getAllNodes()).toHaveLength(3);
    const [a, b] = target.getAllNodes().filter((n) => n.type === "shape").map((n) => n.id);
    exerciseBoard(target, a, b);
  });

  it("tolerates holes and non-entry values in the node list", () => {
    const { engine } = board();
    const json = engine.toJSON() as { nodes: [string, SpatialNode][] };
    // eslint-disable-next-line no-sparse-arrays
    const nodes = [...json.nodes, , null, "junk", ["only-key"], ["k", null]] as unknown as [string, SpatialNode][];
    const target = new SpatialEngine();
    expect(() => target.fromJSON({ nodes })).not.toThrow();
    expect(target.getAllNodes()).toHaveLength(3);
  });
});

describe("whole-map readers skip an edge that bypassed the entry points", () => {
  const readers: Array<[string, (engine: SpatialEngine, a: string) => void]> = [
    ["rebuildQuadTree", (engine) => engine.rebuildQuadTree()],
    ["deleteNode", (engine, a) => engine.deleteNode(a)],
    ["deleteNodes", (engine, a) => engine.deleteNodes([a])],
    ["deleteSelected", (engine, a) => { engine.selectMultiple([a]); engine.deleteSelected(); }],
    ["deleteRemoteNode", (engine, a) => engine.deleteRemoteNode(a)],
  ];
  it.each(readers)("%s survives a data-less edge planted in the map", (_name, run) => {
    const { engine, a, edge } = board();
    engine.nodes.set("planted", bareEdge("planted", undefined));
    expect(() => run(engine, a)).not.toThrow();
    if (_name !== "rebuildQuadTree") expect(engine.getNode(edge)).toBeUndefined();
    expect(() => engine.undo()).not.toThrow();
  });
});

describe("a refused edge never stays selected", () => {
  const shape = (id: string, x: number) =>
    ({ id, type: "shape", x, y: 0, w: 50, h: 50, z: 1, data: { shapeType: "rect" } }) as unknown as SpatialNode;
  /** What a drag does with the selection before it moves anything. */
  const dragOrigins = (engine: SpatialEngine) =>
    [...engine.selection].map((id) => {
      const n = engine.getNode(id)!;
      return { id, x: n.x, y: n.y };
    });

  it("insertNodesAt selects only the admitted nodes", () => {
    const engine = new SpatialEngine();
    engine.insertNodesAt([shape("a", 0), shape("b", 100), bareEdge("bad", undefined)], 300, 300);
    expect(engine.selection.size).toBe(2);
    for (const id of engine.selection) expect(engine.getNode(id)).toBeDefined();
    expect(() => dragOrigins(engine)).not.toThrow();
  });

  it("pasteClipboard selects only the admitted nodes", () => {
    const engine = new SpatialEngine();
    engine.clipboard = [shape("a", 0), bareEdge("bad", { fromId: "a" })];
    engine.pasteClipboard(200, 200);
    expect(engine.selection.size).toBe(1);
    expect(() => dragOrigins(engine)).not.toThrow();
  });

  it("selectMultiple ignores ids that are not on the board", () => {
    const { engine, a } = board();
    engine.selectMultiple([a, "missing"]);
    expect([...engine.selection]).toEqual([a]);
  });
});

describe("data flow treats a refused edge as absent", () => {
  const NUM: NodeTypeDefinition = {
    type: "t-num",
    ports: [{ id: "out", direction: "output", dataType: "number" }],
    compute: () => ({ out: 5 }),
  };
  const INC: NodeTypeDefinition = {
    type: "t-inc",
    ports: [
      { id: "a", direction: "input", dataType: "number" },
      { id: "sum", direction: "output", dataType: "number" },
    ],
    compute: (inputs) => ({ sum: Number(inputs.a ?? 0) + 1 }),
  };
  const drain = () => new Promise((r) => setTimeout(r, 0));
  const card = (id: string, type: string) =>
    ({ id, type, x: 0, y: 0, w: 120, h: 60, z: 1, data: {} }) as unknown as SpatialNode;

  it("refused add and refused update leave the flow unchanged", async () => {
    const engine = new SpatialEngine();
    const flow = new DataFlowEngine(engine, new NodeTypeRegistry([NUM, INC]));
    flow.connect();
    engine.addNode(card("n", "t-num"));
    engine.addNode(card("i", "t-inc"));
    engine.addNode(bareEdge("e", { fromId: "n", toId: "i", sourcePort: "out", targetPort: "a" }));
    await drain();
    expect(flow.getPortValue("i", "sum")).toBe(6);

    engine.addNode(bareEdge("bad", undefined));
    engine.updateNode("e", { data: undefined } as Partial<SpatialNode>);
    await drain();
    expect(engine.getNode("bad")).toBeUndefined();
    expect(flow.getPortValue("i", "sum")).toBe(6);
    expect(flow.getComputeError("i")).toBeUndefined();
    expect(() => engine.deleteNode("n")).not.toThrow();
    await drain();
    expect(flow.getPortValue("i", "sum")).toBe(1);
    flow.dispose();
  });
});
