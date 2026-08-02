import { describe, it, expect } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import { deepCloneNode } from "../deep-clone";
import type { ImageNode, SpatialNode, TextNode } from "../types";

/*
 * Guards the memory posture of the engine:
 *  - undo history uses STRUCTURAL SHARING (node objects + their strings are
 *    shared between snapshots and the live board, never re-serialized);
 *  - clipboard/duplicate/paste share strings (one base64 per image on the
 *    heap) while detaching containers;
 *  - per-id bookkeeping (measured heights, group rotations) is pruned when
 *    nodes leave the board instead of accumulating for the session.
 */

const FAKE_SRC = "data:image/webp;base64," + "A".repeat(2048);

function makeImage(id: string): ImageNode {
  return {
    id,
    type: "image",
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    z: 1,
    data: { src: FAKE_SRC, alt: "img" },
  } as ImageNode;
}

function makeText(id: string): TextNode {
  return {
    id,
    type: "text",
    x: 0,
    y: 0,
    w: 200,
    h: "auto",
    z: 1,
    data: { text: "hello", fontSize: 16 },
  } as TextNode;
}

describe("history structural sharing", () => {
  it("undo restores the exact pre-edit node with reference-equal strings", () => {
    const engine = new SpatialEngine();
    const img = makeImage("img1");
    engine.addNode(img);

    const original = engine.getNode("img1")!;
    const originalSrc = (original as ImageNode).data.src;

    engine.updateNodeWithHistory("img1", { x: 10 });
    engine.updateNodeWithHistory("img1", { x: 20 });
    engine.updateNodeWithHistory("img1", { x: 30 });

    engine.undo();
    expect((engine.getNode("img1") as ImageNode).x).toBe(20);
    // The string was never re-serialized: still the same heap string.
    expect(Object.is((engine.getNode("img1") as ImageNode).data.src, originalSrc)).toBe(true);

    engine.undo();
    engine.undo();
    const restored = engine.getNode("img1") as ImageNode;
    expect(restored.x).toBe(0);
    expect(restored.data).toEqual(img.data);
  });

  it("undo → edit → undo → redo round-trips", () => {
    const engine = new SpatialEngine();
    engine.addNode(makeText("t1"));
    engine.updateNodeWithHistory("t1", { x: 50 });
    engine.undo();
    expect(engine.getNode("t1")!.x).toBe(0);
    engine.updateNodeWithHistory("t1", { x: 99 });
    engine.undo();
    expect(engine.getNode("t1")!.x).toBe(0);
    engine.redo();
    expect(engine.getNode("t1")!.x).toBe(99);
  });

  it("snapshots are immune to later edits (no aliasing of the live map)", () => {
    const engine = new SpatialEngine();
    engine.addNode(makeText("t1"));
    engine.updateNodeWithHistory("t1", { x: 10 });
    // A second, deeper edit after the snapshot must not leak into it.
    engine.updateNodeWithHistory("t1", { data: { text: "changed" } });
    engine.undo();
    expect((engine.getNode("t1") as TextNode).data.text).toBe("hello");
    engine.undo();
    expect(engine.getNode("t1")!.x).toBe(0);
  });

  it("deleted nodes come back intact through undo", () => {
    const engine = new SpatialEngine();
    engine.addNode(makeImage("img1"));
    const src = (engine.getNode("img1") as ImageNode).data.src;
    engine.deleteNode("img1");
    expect(engine.getNode("img1")).toBeUndefined();
    engine.undo();
    const back = engine.getNode("img1") as ImageNode;
    expect(back).toBeDefined();
    expect(Object.is(back.data.src, src)).toBe(true);
  });
});

describe("deepCloneNode string sharing", () => {
  it("shares strings, detaches containers", () => {
    const node = makeImage("img1");
    const clone = deepCloneNode(node);
    expect(clone).not.toBe(node);
    expect(clone.data).not.toBe(node.data);
    expect(Object.is(clone.data.src, node.data.src)).toBe(true);
    expect(clone).toEqual(node);
  });

  it("clones nested arrays freshly", () => {
    const node = {
      id: "d1",
      type: "draw",
      x: 0, y: 0, w: 10, h: 10, z: 1,
      data: { tool: "pen", points: [[1, 2, 0.5], [3, 4, 0.5]], color: "#000", strokeWidth: 2 },
    } as unknown as SpatialNode;
    const clone = deepCloneNode(node) as typeof node & { data: { points: number[][] } };
    const orig = node as typeof node & { data: { points: number[][] } };
    expect(clone.data.points).not.toBe(orig.data.points);
    expect(clone.data.points[0]).not.toBe(orig.data.points[0]);
    expect(clone.data.points).toEqual(orig.data.points);
  });

  it("paste shares the image base64 with the clipboard copy", () => {
    const engine = new SpatialEngine();
    engine.addNode(makeImage("img1"));
    const liveSrc = (engine.getNode("img1") as ImageNode).data.src;
    engine.select("img1");
    engine.copySelected();
    engine.pasteClipboard(500, 500);
    const pasted = engine
      .getAllNodes()
      .find((n) => n.type === "image" && n.id !== "img1") as ImageNode;
    expect(pasted).toBeDefined();
    expect(Object.is(pasted.data.src, liveSrc)).toBe(true);
    expect(pasted.data).not.toBe((engine.getNode("img1") as ImageNode).data);
  });
});

describe("per-id residue pruning", () => {
  it("drops measured heights (engine + quadtree) when a node is deleted", () => {
    const engine = new SpatialEngine();
    engine.addNode(makeText("t1"));
    engine.setMeasuredHeight("t1", 240);
    engine.updateMeasuredHeight("t1", 240);
    expect(engine.measuredHeights["t1"]).toBe(240);
    engine.deleteNode("t1");
    expect(engine.measuredHeights["t1"]).toBeUndefined();
  });

  it("drops measured heights for ids absent after a full rebuild (undo across delete)", () => {
    const engine = new SpatialEngine();
    engine.addNode(makeText("t1"));
    engine.setMeasuredHeight("t1", 240);
    engine.addNode(makeText("t2"));
    engine.setMeasuredHeight("t2", 120);
    engine.deleteNode("t2");
    expect(engine.measuredHeights["t2"]).toBeUndefined();
    expect(engine.measuredHeights["t1"]).toBe(240);
  });

  it("sweeps groupRotations when a group dissolves via member deletion", () => {
    const engine = new SpatialEngine();
    const a = makeText("a");
    const b = makeText("b");
    engine.addNode(a);
    engine.addNode(b);
    engine.selectMultiple(["a", "b"]);
    engine.groupSelected();
    const gid = engine.getNode("a")!.groupId!;
    expect(gid).toBeTruthy();
    engine.groupRotations.set(gid, { angle: 45, cx: 0, cy: 0 });
    engine.selectMultiple(["a", "b"]);
    engine.deleteSelected();
    expect(engine.groupRotations.has(gid)).toBe(false);
  });
});
