import { describe, expect, it } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import type { SpatialNode } from "../types";
import { raiseFanPick } from "../../components/chrome/group-fan";

/*
 * In collaborative mode the host owns undo: local whole-graph snapshots would
 * restore a board state from before a peer's edits, and the host's sync would
 * then push that stale state to everyone. So while collab mode is on no
 * operation records an undo step, undo/redo do nothing, and leaving collab
 * mode brings local history back.
 */

function board() {
  const engine = new SpatialEngine();
  const a = engine.createShape("rect", 0, 0, 100, 80);
  const b = engine.createShape("rect", 300, 0, 100, 80);
  const c = engine.createShape("rect", 0, 300, 100, 80);
  const edge = engine.createEdge(a, b);
  return { engine, a, b, c, edge };
}

function shape(id: string, x: number, y: number): SpatialNode {
  return { id, type: "shape", x, y, w: 50, h: 50, z: 1, data: { shapeType: "rect" } } as unknown as SpatialNode;
}

type Ids = ReturnType<typeof board>;

/** Every operation that records an undo step outside collab mode. */
const OPS: Array<[string, (engine: SpatialEngine, ids: Ids) => void]> = [
  ["addNode", (e) => e.addNode(shape("n1", 500, 500))],
  ["addNodes", (e) => e.addNodes([shape("n2", 600, 600), shape("n3", 700, 700)])],
  ["updateNodeWithHistory", (e, { a }) => e.updateNodeWithHistory(a, { x: 40 })],
  ["updateNodeWithHistoryCoalesced", (e, { a }) => e.updateNodeWithHistoryCoalesced(a, { x: 41 }, "k")],
  ["batchUpdateWithHistory", (e, { a, b }) => e.batchUpdateWithHistory([{ id: a, patch: { y: 5 } }, { id: b, patch: { y: 6 } }])],
  ["batchUpdateWithHistoryCoalesced", (e, { a }) => e.batchUpdateWithHistoryCoalesced([{ id: a, patch: { y: 7 } }], "k2")],
  ["deleteNode", (e, { c }) => e.deleteNode(c)],
  ["deleteNodes", (e, { c }) => e.deleteNodes([c])],
  ["deleteSelected", (e, { c }) => { e.selectMultiple([c]); e.deleteSelected(); }],
  ["groupSelected", (e, { a, b }) => { e.selectMultiple([a, b]); e.groupSelected(); }],
  ["ungroupSelected", (e, { a, b }) => {
    e.setCollabMode(false);
    e.selectMultiple([a, b]);
    e.groupSelected();
    e.setCollabMode(true);
    e.selectMultiple([a, b]);
    e.ungroupSelected();
  }],
  ["pushHistorySnapshot", (e) => e.pushHistorySnapshot()],
  ["beginAgentAction", (e) => { e.beginAgentAction(); e.addNode(shape("n4", 800, 800)); e.endAgentAction(); }],
  ["bringToFront", (e, { a }) => e.bringToFront([a])],
  ["sendToBack", (e, { a }) => e.sendToBack([a])],
  ["bringForward", (e, { a }) => e.bringForward([a])],
  ["sendBackward", (e, { b }) => e.sendBackward([b])],
  ["flipSelectedHorizontal", (e, { a }) => { e.selectMultiple([a]); e.flipSelectedHorizontal(); }],
  ["duplicateSelected", (e, { a }) => { e.selectMultiple([a]); e.duplicateSelected(); }],
  ["arrangeSelectedNodes", (e, { a, b, c }) => { e.selectMultiple([a, b, c]); e.arrangeSelectedNodes(); }],
  ["pasteClipboard", (e, { a }) => { e.selectMultiple([a]); e.copySelected(); e.pasteClipboard(900, 900); }],
];

function snapshot(engine: SpatialEngine) {
  return JSON.stringify(engine.toJSON());
}

describe("collab mode records no local undo steps", () => {
  it.each(OPS)("%s leaves nothing to undo and undo changes nothing", (_name, op) => {
    const ids = board();
    const { engine } = ids;
    engine.setCollabMode(true);
    op(engine, ids);
    expect(engine.canUndo()).toBe(false);
    expect(engine.canRedo()).toBe(false);

    const before = snapshot(engine);
    let replaced = 0;
    engine.on("graph:replaced", () => replaced++);
    engine.undo();
    engine.redo();
    expect(replaced).toBe(0);
    expect(snapshot(engine)).toBe(before);
  });

  it("an unbalanced agent action in collab mode leaves no snapshot behind", () => {
    const { engine } = board();
    engine.setCollabMode(true);
    engine.beginAgentAction();
    engine.addNode(shape("n5", 10, 10));
    engine.setCollabMode(false);
    expect(engine.canUndo()).toBe(false);
    engine.endAgentAction();
  });

  it("loading a board in collab mode does not bring history back", async () => {
    const { engine } = board();
    const json = engine.toJSON() as Parameters<SpatialEngine["fromJSON"]>[0];
    engine.setCollabMode(true);
    engine.fromJSON(json);
    engine.addNode(shape("n6", 10, 10));
    expect(engine.canUndo()).toBe(false);
    await engine.fromSBD(await engine.toSBD());
    engine.updateNodeWithHistory("n6", { x: 20 });
    expect(engine.canUndo()).toBe(false);
  });
});

describe("leaving collab mode restores local history", () => {
  it("off -> on -> off: undo works again", () => {
    const { engine, a } = board();
    engine.updateNodeWithHistory(a, { x: 10 });
    expect(engine.canUndo()).toBe(true);

    engine.setCollabMode(true);
    expect(engine.canUndo()).toBe(false);
    engine.updateNodeWithHistory(a, { x: 20 });
    expect(engine.canUndo()).toBe(false);

    engine.setCollabMode(false);
    engine.updateNodeWithHistory(a, { x: 30 });
    expect(engine.canUndo()).toBe(true);
    engine.undo();
    expect(engine.getNode(a)!.x).toBe(20);
    expect(engine.canRedo()).toBe(true);
    engine.redo();
    expect(engine.getNode(a)!.x).toBe(30);
  });
});

describe("fan-out pick", () => {
  /** Three grouped members at home, moved onto a ring the way the fan does it
   *  (history-free updateMany). */
  function fanned() {
    const engine = new SpatialEngine();
    const ids = [
      engine.createShape("rect", 0, 0, 100, 80),
      engine.createShape("rect", 20, 10, 100, 80),
      engine.createShape("rect", 40, 20, 100, 80),
    ];
    engine.selectMultiple(ids);
    engine.groupSelected();
    const home = new Map(ids.map((id) => [id, { x: engine.getNode(id)!.x, y: engine.getNode(id)!.y }]));
    const zBefore = new Map(ids.map((id) => [id, engine.getNode(id)!.z]));
    const ring = new Map(ids.map((id, i) => [id, { x: 400 + 200 * Math.cos(i * 2.1), y: 400 + 200 * Math.sin(i * 2.1) }]));
    return { engine, ids, home, zBefore, ring };
  }

  const toPatches = (m: Map<string, { x: number; y: number }>) =>
    Array.from(m, ([id, p]) => ({ id, patch: p }));

  it("undo returns the members home with the pick's z restored; redo re-raises", () => {
    const { engine, ids, home, zBefore, ring } = fanned();
    engine.updateMany(toPatches(ring));
    const pick = ids[0];
    raiseFanPick(engine, home, pick);
    // The members are back on the ring after the raise.
    for (const [id, p] of ring) expect(engine.getNode(id)).toMatchObject(p);
    const maxOthers = Math.max(...ids.filter((id) => id !== pick).map((id) => engine.getNode(id)!.z));
    expect(engine.getNode(pick)!.z).toBeGreaterThan(maxOthers);
    const raisedZ = engine.getNode(pick)!.z;
    // The fan tweens the members home.
    engine.updateMany(toPatches(home));

    engine.undo();
    for (const [id, p] of home) expect(engine.getNode(id)).toMatchObject(p);
    for (const [id, z] of zBefore) expect(engine.getNode(id)!.z).toBe(z);

    engine.redo();
    expect(engine.getNode(pick)!.z).toBe(raisedZ);
    for (const [id, p] of home) expect(engine.getNode(id)).toMatchObject(p);
  });

  it("in collab mode the raise applies and records no undo step", () => {
    const { engine, ids, home, ring } = fanned();
    engine.setCollabMode(true);
    engine.updateMany(toPatches(ring));
    const pick = ids[1];
    raiseFanPick(engine, home, pick);
    const maxOthers = Math.max(...ids.filter((id) => id !== pick).map((id) => engine.getNode(id)!.z));
    expect(engine.getNode(pick)!.z).toBeGreaterThan(maxOthers);
    for (const [id, p] of ring) expect(engine.getNode(id)).toMatchObject(p);
    expect(engine.canUndo()).toBe(false);
  });
});
