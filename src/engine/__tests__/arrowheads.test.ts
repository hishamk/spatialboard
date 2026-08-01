import { describe, expect, it } from "vitest";
import { arrowHeadPath, filledArrowHeadPath } from "../edge-geometry";

/** Parse "Mx,y Lx,y …" into [x, y] pairs. */
function points(d: string): Array<[number, number]> {
  return [...d.matchAll(/[ML]([-\d.]+),([-\d.]+)/g)].map((m) => [
    parseFloat(m[1]),
    parseFloat(m[2]),
  ]);
}

describe("arrowhead geometry is tip-anchored", () => {
  it("chevron tip sits exactly on the anchor; everything else trails behind", () => {
    // Pointing straight right (angle 0) at anchor (100, 50)
    const pts = points(arrowHeadPath(100, 50, 0, 12));
    // The middle point of the chevron polyline is the tip
    expect(pts[1]).toEqual([100, 50]);
    // Both wings sit strictly BEHIND the tip along the travel direction
    expect(pts[0][0]).toBeLessThan(100);
    expect(pts[2][0]).toBeLessThan(100);
    // No point extends past the anchor
    for (const [x] of pts) expect(x).toBeLessThanOrEqual(100);
  });

  it("filled triangle tip sits exactly on the anchor", () => {
    const pts = points(filledArrowHeadPath(100, 50, 0, 12));
    expect(pts[0]).toEqual([100, 50]); // first point of the triangle is the tip
    for (const [x] of pts) expect(x).toBeLessThanOrEqual(100);
  });

  it("holds for arbitrary angles (pointing up-left)", () => {
    const angle = (Math.PI * 3) / 4; // travel direction: up-left
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);
    const pts = points(filledArrowHeadPath(0, 0, angle, 10));
    expect(pts[0]).toEqual([0, 0]);
    // Every other point projects NEGATIVELY onto the travel direction
    for (const [x, y] of pts.slice(1)) {
      expect(x * ux + y * uy).toBeLessThan(0);
    }
  });
});
