import { describe, it, expect } from "vitest";
import { sameNodeTypeDefs } from "../registry";
import type { NodeTypeDefinition } from "../registry";

/*
 * The board pins `nodeTypes` to a stable identity while its contents are
 * unchanged (SpatialBoard.useStableNodeTypes). This equality is the pivot:
 * a fresh spread of stable defs must compare equal — otherwise every host
 * render rebuilds the registry, reconnects the data-flow engine, and
 * recomputes the whole graph (which can loop into a hang when a compute
 * publishes into host state).
 */

const A: NodeTypeDefinition = { type: "a" };
const B: NodeTypeDefinition = { type: "b" };

describe("sameNodeTypeDefs", () => {
  it("a fresh spread of the same defs is equal", () => {
    const list = [A, B];
    expect(sameNodeTypeDefs(list, [...list])).toBe(true);
    expect(sameNodeTypeDefs(list, [A, B])).toBe(true);
  });

  it("identity is per entry, not per type string", () => {
    expect(sameNodeTypeDefs([A, B], [A, { type: "b" }])).toBe(false);
  });

  it("order and length matter", () => {
    expect(sameNodeTypeDefs([A, B], [B, A])).toBe(false);
    expect(sameNodeTypeDefs([A, B], [A])).toBe(false);
    expect(sameNodeTypeDefs([], [])).toBe(true);
  });
});
