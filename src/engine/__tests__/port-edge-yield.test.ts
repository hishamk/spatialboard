import { describe, it, expect } from "vitest";
import { portEdgeYieldsToNode } from "../edge-geometry_hittest";
import type { SpatialNode, EdgeNode } from "../types";

/*
 * Port wires yield the pointer to the solid cards they cross — the card's
 * interactive content is what the user is aiming at — while freeform edges
 * (annotation arrows) keep their full hit priority. The geometric predicate
 * here mirrors the DOM half, where a port wire's invisible hit stroke is
 * pointer-inert so card DOM beneath it receives events directly.
 */

const notContainer = () => false;
const isContainer = () => true;

function portEdge(): EdgeNode {
  return {
    id: "e1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 9,
    data: { fromId: "a", toId: "b", sourcePort: "out", targetPort: "in" },
  } as EdgeNode;
}

function freeformEdge(): EdgeNode {
  return {
    id: "e2", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 9,
    data: { fromId: "a", toId: "b" },
  } as EdgeNode;
}

function card(type = "sticky", rotation?: number): SpatialNode {
  return { id: "n1", type, x: 0, y: 0, w: 100, h: 20, z: 1, rotation, data: {} } as SpatialNode;
}

describe("portEdgeYieldsToNode", () => {
  it("yields to a solid card when the point is inside it", () => {
    expect(portEdgeYieldsToNode(portEdge(), card(), 50, 10, notContainer)).toBe(true);
  });

  it("does not yield outside the card (tolerance band stays edge territory)", () => {
    expect(portEdgeYieldsToNode(portEdge(), card(), 50, 25, notContainer)).toBe(false);
    expect(portEdgeYieldsToNode(portEdge(), card(), -3, 10, notContainer)).toBe(false);
  });

  it("freeform edges never yield", () => {
    expect(portEdgeYieldsToNode(freeformEdge(), card(), 50, 10, notContainer)).toBe(false);
  });

  it("ink, shape geometry, and containers never claim the yield", () => {
    expect(portEdgeYieldsToNode(portEdge(), card("draw"), 50, 10, notContainer)).toBe(false);
    expect(portEdgeYieldsToNode(portEdge(), card("shape"), 50, 10, notContainer)).toBe(false);
    expect(portEdgeYieldsToNode(portEdge(), card("frame"), 50, 10, isContainer)).toBe(false);
    expect(portEdgeYieldsToNode(portEdge(), null, 50, 10, notContainer)).toBe(false);
  });

  it("containment is rotation-aware", () => {
    // 100×20 card rotated 90° around its center (50, 10): it now occupies
    // roughly x 40..60, y -40..60.
    const rotated = card("sticky", 90);
    expect(portEdgeYieldsToNode(portEdge(), rotated, 50, 40, notContainer)).toBe(true);
    // Inside the unrotated AABB but outside the rotated rect.
    expect(portEdgeYieldsToNode(portEdge(), rotated, 80, 10, notContainer)).toBe(false);
  });
});
