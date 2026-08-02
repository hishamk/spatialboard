import type { SpatialNode, ShapeNode, DrawNode } from "../../engine/types";

/**
 * Extra padding (canvas units) the selection chrome adds around a node so
 * the VISUAL ink sits inside the box. A node's x/y/w/h describe its nominal
 * geometry, but strokes are centered on it (they radiate ±strokeWidth/2) and
 * RoughJS sloppiness wobbles further out (~2px per roughness level per
 * stroke pass — 3×roughness covers the practical envelope, checked against
 * thick cartoonist strokes).
 */
export function selectionInkPad(node: SpatialNode): number {
  if (node.type === "shape") {
    const d = (node as ShapeNode).data;
    const sw = d.strokeWidth ?? 2;
    const roughness = d.roughness ?? 1;
    return sw / 2 + (roughness > 0 ? 2 + roughness * 3 : 0);
  }
  if (node.type === "draw") {
    // perfect-freehand ink radiates ~strokeWidth/2 from the point path (the
    // node bbox is the CENTERLINE bounds), a bit more under pressure.
    const d = (node as DrawNode).data;
    return (d.strokeWidth ?? 2) / 2 + 2;
  }
  return 0;
}
