import { describe, expect, it } from "vitest";
import { SpatialEngine } from "../SpatialEngine";

function board() {
  const engine = new SpatialEngine();
  const a = engine.createShape("rect", 0, 0, 100, 80);
  const b = engine.createShape("rect", 300, 0, 100, 80);
  const edge = engine.createEdge(a, b);
  return { engine, a, b, edge };
}

const z = (engine: SpatialEngine, id: string) => engine.getNode(id)!.z;

describe("unified z-order (nodes + edges share one stack)", () => {
  it("a new edge starts above its endpoints; send-to-back puts it under everything", () => {
    const { engine, a, b, edge } = board();
    expect(z(engine, edge)).toBeGreaterThan(z(engine, a));
    expect(z(engine, edge)).toBeGreaterThan(z(engine, b));

    engine.sendToBack([edge]);
    expect(z(engine, edge)).toBeLessThan(z(engine, a));
    expect(z(engine, edge)).toBeLessThan(z(engine, b));

    engine.bringToFront([edge]);
    expect(z(engine, edge)).toBeGreaterThan(z(engine, a));
  });

  it("edge relative steps use the routed path bounds (zero stored bounds)", () => {
    const { engine, a, edge } = board();
    // The edge's path overlaps its endpoint shapes — send-backward steps it
    // below the nearest overlapping stack member.
    const before = z(engine, edge);
    const bId = engine.getAllNodes().find((n) => n.type === "shape" && n.x === 300)!.id;
    engine.sendBackward([edge]);
    // One step: below the NEAREST overlapping neighbor (the higher-z endpoint).
    expect(z(engine, edge)).toBeLessThan(before);
    expect(z(engine, edge)).toBeLessThan(z(engine, bId));
    // A second step continues below the other endpoint.
    engine.sendBackward([edge]);
    expect(z(engine, edge)).toBeLessThan(z(engine, a));
  });

  it("node-side reordering steps over an edge (symmetric control)", () => {
    const { engine, a, edge } = board();
    engine.sendToBack([edge]); // edge at the very back
    engine.sendToBack([a]);    // shape now below the edge
    expect(z(engine, a)).toBeLessThan(z(engine, edge));

    // Bring the SHAPE forward — it must step over the edge.
    engine.bringForward([a]);
    expect(z(engine, a)).toBeGreaterThan(z(engine, edge));
  });

  it("different overlap orders coexist (edge above one shape, below another)", () => {
    const engine = new SpatialEngine();
    const a = engine.createShape("rect", 0, 0, 100, 80);
    const b = engine.createShape("rect", 300, 0, 100, 80);
    // A blocker sitting mid-path, plus the edge
    const blocker = engine.createShape("ellipse", 150, 0, 80, 80);
    const edge = engine.createEdge(a, b);

    // edge above blocker (creation order) — now put blocker above the edge
    engine.bringToFront([blocker]);
    expect(z(engine, blocker)).toBeGreaterThan(z(engine, edge));
    // …while the edge stays above its endpoint shapes: mixed orders, one stack.
    expect(z(engine, edge)).toBeGreaterThan(z(engine, a));
    expect(z(engine, edge)).toBeGreaterThan(z(engine, b));
  });

  it("non-overlapping nodes are not disturbed by relative steps", () => {
    const { engine, a, edge } = board();
    const far = engine.createShape("rect", 5000, 5000, 50, 50);
    const farZ = z(engine, far);
    engine.sendBackward([edge]);
    engine.bringForward([a]);
    expect(z(engine, far)).toBe(farZ);
  });
});
