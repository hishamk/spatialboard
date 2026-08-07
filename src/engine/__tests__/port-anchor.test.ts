import { describe, it, expect } from "vitest";
import {
  getPortOuterLocal,
  getPortStubInnerLocal,
  PORT_ANCHOR_OUTSIDE_PX,
  type PortAnchorMode,
} from "../edge-geometry_port";
import type { SpatialNode } from "../types";
import type { PortDefinition } from "../data-flow-types";

/*
 * Port anchoring for node bodies that are NOT their bounding box.
 *
 * Custom node types routinely draw a parallelogram, hexagon or diamond inset
 * from their box. Anchored on the box, their ports float in the gap between the
 * box edge and the drawn shape — visible as a dot hanging off the side of the
 * node with the wire ending in mid-air. The `inset` anchor pulls the anchor in
 * by a fraction of the node width so the dot hugs the drawn edge instead.
 */

const node: SpatialNode = { id: "n", type: "display", x: 100, y: 200, w: 120, h: 80, z: 1, data: {} };
const ports: PortDefinition[] = [
  { id: "in", label: "In", direction: "input", dataType: "any" },
  { id: "out", label: "Out", direction: "output", dataType: "any" },
];
const ZOOM = 1;

function outer(portId: string, anchor: PortAnchorMode) {
  const r = getPortOuterLocal(node, ports, portId, ZOOM, undefined, anchor);
  if (!r) throw new Error(`no port ${portId}`);
  return r;
}

describe("port anchoring", () => {
  it("bbox anchors sit outside the node box", () => {
    expect(outer("in", "bbox").px).toBe(node.x - PORT_ANCHOR_OUTSIDE_PX);
    expect(outer("out", "bbox").px).toBe(node.x + node.w + PORT_ANCHOR_OUTSIDE_PX);
  });

  it("inset pulls each side in by its fraction of the node width", () => {
    const anchor: PortAnchorMode = { kind: "inset", left: 0.1, right: 0.25 };
    // left: 120 * 0.1 = 12 in from the box edge, then the usual 7px outside it
    expect(outer("in", anchor).px).toBe(node.x + 12 - PORT_ANCHOR_OUTSIDE_PX);
    // right: 120 * 0.25 = 30 in from the right edge
    expect(outer("out", anchor).px).toBe(node.x + node.w - 30 + PORT_ANCHOR_OUTSIDE_PX);
  });

  it("an omitted side falls back to the box edge", () => {
    const anchor: PortAnchorMode = { kind: "inset", left: 0.1 };
    expect(outer("out", anchor).px).toBe(node.x + node.w + PORT_ANCHOR_OUTSIDE_PX);
  });

  it("clamps a bad fraction so a port can never cross the centre line", () => {
    const anchor: PortAnchorMode = { kind: "inset", left: 5, right: -3 };
    // 5 clamps to 0.5 → the centre, not past it
    expect(outer("in", anchor).px).toBe(node.x + node.w / 2 - PORT_ANCHOR_OUTSIDE_PX);
    // negative clamps to 0 → the box edge
    expect(outer("out", anchor).px).toBe(node.x + node.w + PORT_ANCHOR_OUTSIDE_PX);
  });

  it("the stub lands on the drawn edge, not the box edge", () => {
    const anchor: PortAnchorMode = { kind: "inset", left: 0.1, right: 0.1 };
    const o = outer("in", anchor);
    const stub = getPortStubInnerLocal(node, "input", { x: o.px, y: o.py }, undefined, anchor);
    expect(stub.x).toBe(node.x + 12);
    expect(stub.y).toBe(o.py);
  });

  it("leaves vertical placement alone — inset is horizontal only", () => {
    const boxed = outer("in", "bbox");
    const inset = outer("in", { kind: "inset", left: 0.2 });
    expect(inset.py).toBe(boxed.py);
  });
});
