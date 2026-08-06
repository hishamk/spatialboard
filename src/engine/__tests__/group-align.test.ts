import { describe, it, expect, beforeEach } from "vitest";
import { SpatialEngine } from "../SpatialEngine";
import type { SpatialNode } from "../types";

/*
 * Align/distribute must treat a GROUP as one rigid unit: aligning a selection
 * that includes a group translates the whole group to the target, preserving
 * every member's relative offset — it must never scatter members
 * individually. Inside an entered group, members go back to aligning per
 * node (that's what drill-down editing is for).
 */

function box(id: string, x: number, y: number, w = 100, h = 50): SpatialNode {
  return { id, type: "sticky", x, y, w, h, z: 1, data: {} } as SpatialNode;
}

describe("group-aware align/distribute", () => {
  let engine: SpatialEngine;

  beforeEach(() => {
    engine = new SpatialEngine();
    // A group of two stacked photos-on-a-backdrop…
    engine.addNode(box("back", 0, 0, 400, 400));
    engine.addNode(box("p1", 50, 40, 100, 100));
    engine.addNode(box("p2", 250, 260, 100, 100));
    engine.selectMultiple(["back", "p1", "p2"]);
    engine.groupSelected();
    // …plus a loose node far to the right.
    engine.addNode(box("loose", 900, 150, 60, 60));
  });

  it("aligns a group as one unit, preserving member offsets", () => {
    engine.selectMultiple(["back", "p1", "p2", "loose"]);
    engine.expandSelectionToGroups();
    engine.alignSelectedNodes("top");
    const back = engine.getNode("back")!;
    const p1 = engine.getNode("p1")!;
    const p2 = engine.getNode("p2")!;
    // Group AABB top was 0 = selection top → group unchanged.
    expect(back.y).toBe(0);
    expect(p1.y).toBe(40);
    expect(p2.y).toBe(260);
    // Loose node snapped to the shared top.
    expect(engine.getNode("loose")!.y).toBe(0);
  });

  it("centers the group rigidly instead of centering each member", () => {
    engine.selectMultiple(["back", "p1", "p2", "loose"]);
    engine.expandSelectionToGroups();
    engine.alignSelectedNodes("centerH");
    const back = engine.getNode("back")!;
    const p1 = engine.getNode("p1")!;
    const p2 = engine.getNode("p2")!;
    // Selection spans x 0..960, mid 480. Group (0..400) centers → dx = 280.
    expect(back.x).toBe(280);
    // Members moved by the SAME delta — offsets preserved, not stacked.
    expect(p1.x).toBe(330);
    expect(p2.x).toBe(530);
    expect(engine.getNode("loose")!.x).toBe(450);
  });

  it("no-ops when the selection is a single group", () => {
    engine.selectMultiple(["back", "p1", "p2"]);
    engine.expandSelectionToGroups();
    engine.alignSelectedNodes("centerH");
    expect(engine.getNode("back")!.x).toBe(0);
    expect(engine.getNode("p1")!.x).toBe(50);
    expect(engine.getNode("p2")!.x).toBe(250);
  });

  it("aligns members individually inside an entered group", () => {
    const gid = engine.getNode("back")!.groupId!;
    engine.enterGroup(gid);
    engine.selectMultiple(["p1", "p2"]);
    engine.alignSelectedNodes("left");
    expect(engine.getNode("p1")!.x).toBe(50);
    expect(engine.getNode("p2")!.x).toBe(50);
  });

  it("distributes groups as units", () => {
    engine.addNode(box("mid", 500, 0, 100, 100));
    engine.selectMultiple(["back", "p1", "p2", "mid", "loose"]);
    engine.expandSelectionToGroups();
    engine.distributeSelectedNodes("horizontal");
    // Units: group (0..400), mid (500..600), loose (900..960).
    // Span 960, widths 400+100+60=560 → gap = 200.
    expect(engine.getNode("back")!.x).toBe(0);
    expect(engine.getNode("mid")!.x).toBe(600);
    expect(engine.getNode("loose")!.x).toBe(900);
    // Group members untouched (group itself did not move).
    expect(engine.getNode("p1")!.x).toBe(50);
  });
});
