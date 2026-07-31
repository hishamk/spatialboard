import type { SpatialNode, DrawNode, HandleSide } from "./types";
import { resolveH, rotatePoint, dominantSide } from "./edge-geometry_shared";

// ---------------------------------------------------------------------------
// Free-form edge connections: parametric perimeter position
// ---------------------------------------------------------------------------

/**
 * Convert a parametric t ∈ [0, 1) to a canvas-space point on the node's border.
 * t=0 is top-center, going clockwise: t≈0.25 is right-center, t=0.5 is bottom-center,
 * t≈0.75 is left-center.
 *
 * Also returns the nearest HandleSide for bezier tangent direction.
 */
export function perimeterPoint(
  node: SpatialNode,
  h: number,
  t: number,
): { x: number; y: number; side: HandleSide } {
  // Normalize t to [0, 1)
  t = ((t % 1) + 1) % 1;

  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;

  // Draw nodes: t maps linearly along the stroke polyline
  if (node.type === "draw") {
    const pts = (node as DrawNode).data.points;
    if (pts && pts.length >= 2) {
      // Compute cumulative lengths
      const cumLen = [0];
      for (let i = 1; i < pts.length; i++) {
        cumLen.push(cumLen[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      }
      const totalLen = cumLen[cumLen.length - 1];
      if (totalLen > 0) {
        const targetLen = t * totalLen;
        // Find the segment
        let seg = 0;
        for (let i = 1; i < cumLen.length; i++) {
          if (cumLen[i] >= targetLen) { seg = i - 1; break; }
          if (i === cumLen.length - 1) seg = i - 1;
        }
        const segLen = cumLen[seg + 1] - cumLen[seg];
        const f = segLen > 0 ? (targetLen - cumLen[seg]) / segLen : 0;
        let px = node.x + pts[seg][0] + (pts[seg + 1][0] - pts[seg][0]) * f;
        let py = node.y + pts[seg][1] + (pts[seg + 1][1] - pts[seg][1]) * f;
        // Push outward from center by half the stroke width so the arrow tip
        // touches the visible outer edge of the stroke, not the centerline.
        const radius = Math.max(0.5, ((node as DrawNode).data.strokeWidth ?? 1) / 2);
        const dx = px - cx, dy = py - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > 0) {
          px += (dx / dist) * radius;
          py += (dy / dist) * radius;
        }
        const side = dominantSide(px - cx, py - cy, node.w / 2, h / 2);

        if (node.rotation) {
          const θ = (node.rotation * Math.PI) / 180;
          const [rx, ry] = rotatePoint(px, py, cx, cy, θ);
          return { x: rx, y: ry, side };
        }
        return { x: px, y: py, side };
      }
    }
    // Fallback to bounding box for empty/single-point draws
  }

  const shape = node.type === "shape" ? (node.data as { shape?: string })?.shape : undefined;

  let px: number, py: number;
  let side: HandleSide;

  if (shape === "ellipse") {
    // t maps to angle: t=0 → top (angle = -π/2), clockwise
    const angle = t * 2 * Math.PI - Math.PI / 2;
    const a = node.w / 2;
    const b = h / 2;
    px = cx + a * Math.cos(angle);
    py = cy + b * Math.sin(angle);
    side = dominantSide(px - cx, py - cy, a, b);
  } else if (shape === "diamond") {
    // Diamond with vertices at midpoints of sides: top, right, bottom, left
    // Each edge is 0.25 of the perimeter
    const topX = cx, topY = node.y;
    const rightX = node.x + node.w, rightY = cy;
    const bottomX = cx, bottomY = node.y + h;
    const leftX = node.x, leftY = cy;

    if (t < 0.25) {
      // Top → Right
      const f = t / 0.25;
      px = topX + (rightX - topX) * f;
      py = topY + (rightY - topY) * f;
      side = t < 0.125 ? "top" : "right";
    } else if (t < 0.5) {
      // Right → Bottom
      const f = (t - 0.25) / 0.25;
      px = rightX + (bottomX - rightX) * f;
      py = rightY + (bottomY - rightY) * f;
      side = t < 0.375 ? "right" : "bottom";
    } else if (t < 0.75) {
      // Bottom → Left
      const f = (t - 0.5) / 0.25;
      px = bottomX + (leftX - bottomX) * f;
      py = bottomY + (leftY - bottomY) * f;
      side = t < 0.625 ? "bottom" : "left";
    } else {
      // Left → Top
      const f = (t - 0.75) / 0.25;
      px = leftX + (topX - leftX) * f;
      py = leftY + (topY - leftY) * f;
      side = t < 0.875 ? "left" : "top";
    }
  } else {
    // Rectangle (default for all other shapes including content, text, frame, draw, etc.)
    // Perimeter: top → right → bottom → left, proportional to side lengths
    const w = node.w;
    const perim = 2 * (w + h);
    // Distance from top-center going clockwise
    let d = t * perim;

    const halfTop = w / 2;
    if (d < halfTop) {
      // Top edge, right half (top-center → top-right)
      px = cx + d;
      py = node.y;
      side = "top";
    } else if (d < halfTop + h) {
      // Right edge (top-right → bottom-right)
      d -= halfTop;
      px = node.x + w;
      py = node.y + d;
      side = "right";
    } else if (d < halfTop + h + w) {
      // Bottom edge (bottom-right → bottom-left)
      d -= halfTop + h;
      px = node.x + w - d;
      py = node.y + h;
      side = "bottom";
    } else if (d < halfTop + h + w + h) {
      // Left edge (bottom-left → top-left)
      d -= halfTop + h + w;
      px = node.x;
      py = node.y + h - d;
      side = "left";
    } else {
      // Top edge, left half (top-left → top-center)
      d -= halfTop + h + w + h;
      px = node.x + d;
      py = node.y;
      side = "top";
    }
  }

  // Handle rotation
  if (node.rotation) {
    const θ = (node.rotation * Math.PI) / 180;
    const [rx, ry] = rotatePoint(px, py, cx, cy, θ);
    return { x: rx, y: ry, side };
  }

  return { x: px, y: py, side };
}

/**
 * Inverse of perimeterPoint: given a canvas-space point near the node,
 * return the t ∈ [0, 1) for the closest point on the node's border.
 */
export function canvasPointToPerimeterT(
  node: SpatialNode,
  h: number,
  px: number,
  py: number,
): number {
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;

  // Un-rotate point into node's local space
  let lx = px, ly = py;
  if (node.rotation) {
    const θ = (-node.rotation * Math.PI) / 180;
    [lx, ly] = rotatePoint(px, py, cx, cy, θ);
  }

  // Draw nodes: find nearest stroke point and compute t along polyline
  if (node.type === "draw") {
    const pts = (node as DrawNode).data.points;
    if (pts && pts.length >= 2) {
      // Compute cumulative lengths
      const cumLen = [0];
      for (let i = 1; i < pts.length; i++) {
        cumLen.push(cumLen[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      }
      const totalLen = cumLen[cumLen.length - 1];
      if (totalLen > 0) {
        // Find nearest point on polyline (in node-local coords)
        const qlx = lx - node.x;
        const qly = ly - node.y;
        let bestDist = Infinity;
        let bestLen = 0;
        for (let i = 0; i < pts.length - 1; i++) {
          const ax = pts[i][0], ay = pts[i][1];
          const bx = pts[i + 1][0], by = pts[i + 1][1];
          const dx = bx - ax, dy = by - ay;
          const lenSq = dx * dx + dy * dy;
          const f = lenSq === 0 ? 0 : Math.max(0, Math.min(1, ((qlx - ax) * dx + (qly - ay) * dy) / lenSq));
          const projX = ax + f * dx;
          const projY = ay + f * dy;
          const dist = Math.hypot(qlx - projX, qly - projY);
          if (dist < bestDist) {
            bestDist = dist;
            bestLen = cumLen[i] + f * (cumLen[i + 1] - cumLen[i]);
          }
        }
        return bestLen / totalLen;
      }
    }
    // Fallback to bounding box
  }

  const shape = node.type === "shape" ? (node.data as { shape?: string })?.shape : undefined;

  if (shape === "ellipse") {
    const angle = Math.atan2(ly - cy, lx - cx);
    // Convert angle to t: angle=-π/2 → t=0, going clockwise
    let t = (angle + Math.PI / 2) / (2 * Math.PI);
    return ((t % 1) + 1) % 1;
  }

  if (shape === "diamond") {
    // Project onto diamond edges and find closest
    const topX = cx, topY = node.y;
    const rightX = node.x + node.w, rightY = cy;
    const bottomX = cx, bottomY = node.y + h;
    const leftX = node.x, leftY = cy;

    const edges: { ax: number; ay: number; bx: number; by: number; tStart: number }[] = [
      { ax: topX, ay: topY, bx: rightX, by: rightY, tStart: 0 },
      { ax: rightX, ay: rightY, bx: bottomX, by: bottomY, tStart: 0.25 },
      { ax: bottomX, ay: bottomY, bx: leftX, by: leftY, tStart: 0.5 },
      { ax: leftX, ay: leftY, bx: topX, by: topY, tStart: 0.75 },
    ];

    let bestT = 0;
    let bestDist = Infinity;
    for (const edge of edges) {
      const dx = edge.bx - edge.ax;
      const dy = edge.by - edge.ay;
      const lenSq = dx * dx + dy * dy;
      const f = lenSq === 0 ? 0 : Math.max(0, Math.min(1, ((lx - edge.ax) * dx + (ly - edge.ay) * dy) / lenSq));
      const projX = edge.ax + f * dx;
      const projY = edge.ay + f * dy;
      const dist = Math.hypot(lx - projX, ly - projY);
      if (dist < bestDist) {
        bestDist = dist;
        bestT = edge.tStart + f * 0.25;
      }
    }
    return ((bestT % 1) + 1) % 1;
  }

  // Rectangle: project onto edges and find closest
  const w = node.w;
  const x0 = node.x, y0 = node.y;
  const perim = 2 * (w + h);
  const halfTop = w / 2;

  // Define edges with their perimeter start distance
  const rectEdges: { ax: number; ay: number; bx: number; by: number; dStart: number; len: number }[] = [
    // Top edge right half: top-center → top-right
    { ax: cx, ay: y0, bx: x0 + w, by: y0, dStart: 0, len: halfTop },
    // Right edge: top-right → bottom-right
    { ax: x0 + w, ay: y0, bx: x0 + w, by: y0 + h, dStart: halfTop, len: h },
    // Bottom edge: bottom-right → bottom-left
    { ax: x0 + w, ay: y0 + h, bx: x0, by: y0 + h, dStart: halfTop + h, len: w },
    // Left edge: bottom-left → top-left
    { ax: x0, ay: y0 + h, bx: x0, by: y0, dStart: halfTop + h + w, len: h },
    // Top edge left half: top-left → top-center
    { ax: x0, ay: y0, bx: cx, by: y0, dStart: halfTop + h + w + h, len: halfTop },
  ];

  let bestT = 0;
  let bestDist = Infinity;
  for (const edge of rectEdges) {
    const dx = edge.bx - edge.ax;
    const dy = edge.by - edge.ay;
    const lenSq = dx * dx + dy * dy;
    const f = lenSq === 0 ? 0 : Math.max(0, Math.min(1, ((lx - edge.ax) * dx + (ly - edge.ay) * dy) / lenSq));
    const projX = edge.ax + f * dx;
    const projY = edge.ay + f * dy;
    const dist = Math.hypot(lx - projX, ly - projY);
    if (dist < bestDist) {
      bestDist = dist;
      bestT = (edge.dStart + f * edge.len) / perim;
    }
  }
  return ((bestT % 1) + 1) % 1;
}

/**
 * Higher-level wrapper: given a canvas point near a node, compute
 * the nearest perimeter point and its t value.
 */
export function nearestPerimeterPoint(
  node: SpatialNode,
  px: number,
  py: number,
  measuredHeights?: Record<string, number>,
): { t: number; x: number; y: number } {
  const h = resolveH(node, measuredHeights);
  const t = canvasPointToPerimeterT(node, h, px, py);
  const p = perimeterPoint(node, h, t);
  return { t, x: p.x, y: p.y };
}
