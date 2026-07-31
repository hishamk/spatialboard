import type { SpatialNode, DrawNode, HandleSide } from "./types";
import type { KinkHandleInfo } from "./edge-geometry_path";

export function resolveH(node: SpatialNode, measured?: Record<string, number>): number {
  if (node.h !== "auto") return node.h;
  return measured?.[node.id] ?? 100;
}

/**
 * Intersect a ray from (cx,cy) toward (tx,ty) with the axis-aligned rect
 * [rx, ry, rx+rw, ry+rh].  Returns the border intersection point and the
 * side it hit.
 */
function rectBorderIntersect(
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  cx: number,
  cy: number,
  tx: number,
  ty: number
): { x: number; y: number; side: HandleSide } {
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy, side: "right" };

  let tMin = Infinity;
  let bestX = cx;
  let bestY = cy;
  let bestSide: HandleSide = "right";

  // Right edge
  if (dx !== 0) {
    const t = (rx + rw - cx) / dx;
    if (t > 0 && t < tMin) {
      const iy = cy + t * dy;
      if (iy >= ry && iy <= ry + rh) {
        tMin = t;
        bestX = rx + rw;
        bestY = iy;
        bestSide = "right";
      }
    }
  }
  // Left edge
  if (dx !== 0) {
    const t = (rx - cx) / dx;
    if (t > 0 && t < tMin) {
      const iy = cy + t * dy;
      if (iy >= ry && iy <= ry + rh) {
        tMin = t;
        bestX = rx;
        bestY = iy;
        bestSide = "left";
      }
    }
  }
  // Bottom edge
  if (dy !== 0) {
    const t = (ry + rh - cy) / dy;
    if (t > 0 && t < tMin) {
      const ix = cx + t * dx;
      if (ix >= rx && ix <= rx + rw) {
        tMin = t;
        bestX = ix;
        bestY = ry + rh;
        bestSide = "bottom";
      }
    }
  }
  // Top edge
  if (dy !== 0) {
    const t = (ry - cy) / dy;
    if (t > 0 && t < tMin) {
      const ix = cx + t * dx;
      if (ix >= rx && ix <= rx + rw) {
        tMin = t;
        bestX = ix;
        bestY = ry;
        bestSide = "top";
      }
    }
  }

  return { x: bestX, y: bestY, side: bestSide };
}

/**
 * Rotate point (px,py) around (cx,cy) by angle θ (radians).
 */
export function rotatePoint(
  px: number,
  py: number,
  cx: number,
  cy: number,
  θ: number
): [number, number] {
  const cos = Math.cos(θ);
  const sin = Math.sin(θ);
  const dx = px - cx;
  const dy = py - cy;
  return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
}

/**
 * Compute where the center-to-center line exits a node's rectangular border.
 * Returns the intersection point and which side was hit.
 */
function borderPointWithSide(
  node: SpatialNode,
  h: number,
  targetX: number,
  targetY: number
): { x: number; y: number; side: HandleSide } {
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;

  if (!node.rotation) {
    return rectBorderIntersect(node.x, node.y, node.w, h, cx, cy, targetX, targetY);
  }

  // Rotate target into node's local (unrotated) space
  const θ = (-node.rotation * Math.PI) / 180;
  const [ltx, lty] = rotatePoint(targetX, targetY, cx, cy, θ);
  const local = rectBorderIntersect(node.x, node.y, node.w, h, cx, cy, ltx, lty);

  // Rotate result back to canvas space
  const [wx, wy] = rotatePoint(local.x, local.y, cx, cy, -θ);
  return { x: wx, y: wy, side: local.side };
}

/**
 * Which of the four sides is most in the direction (dx, dy), normalised by
 * the node's half-extents (a, b) so that the aspect ratio is respected.
 */
export function dominantSide(dx: number, dy: number, a: number, b: number): HandleSide {
  if (Math.abs(dx) / a >= Math.abs(dy) / b) {
    return dx >= 0 ? "right" : "left";
  }
  return dy >= 0 ? "bottom" : "top";
}

/**
 * Ellipse perimeter intersection: finds the point on the ellipse
 * (cx ± a, cy ± b semi-axes) along the ray from center toward (targetX, targetY).
 */
function ellipseBorderPointWithSide(
  node: SpatialNode,
  h: number,
  targetX: number,
  targetY: number
): { x: number; y: number; side: HandleSide } {
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;
  const a = node.w / 2;
  const b = h / 2;

  // Work in local (unrotated) space
  const θ = node.rotation ? (-node.rotation * Math.PI) / 180 : 0;
  const [tx, ty] = node.rotation
    ? rotatePoint(targetX, targetY, cx, cy, θ)
    : [targetX, targetY];

  const dx = tx - cx;
  const dy = ty - cy;

  if (dx === 0 && dy === 0) {
    return { x: cx + a, y: cy, side: "right" };
  }

  // Parametric: point on ellipse at t along (dx, dy) satisfies
  //   (t·dx / a)² + (t·dy / b)² = 1  →  t = 1 / √((dx/a)² + (dy/b)²)
  const t = 1 / Math.sqrt((dx / a) ** 2 + (dy / b) ** 2);
  let px = cx + dx * t;
  let py = cy + dy * t;

  const side = dominantSide(dx, dy, a, b);

  if (node.rotation) {
    [px, py] = rotatePoint(px, py, cx, cy, -θ) as [number, number];
  }

  return { x: px, y: py, side };
}

/**
 * Diamond perimeter intersection: finds the point on the diamond
 * (rhombus with vertices at the midpoints of the bounding box sides)
 * along the ray from center toward (targetX, targetY).
 *
 * The diamond satisfies |x−cx|/a + |y−cy|/b = 1.
 * For a ray (cx + t·dx, cy + t·dy):
 *   t · (|dx|/a + |dy|/b) = 1  →  t = 1 / (|dx|/a + |dy|/b)
 */
function diamondBorderPointWithSide(
  node: SpatialNode,
  h: number,
  targetX: number,
  targetY: number
): { x: number; y: number; side: HandleSide } {
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;
  const a = node.w / 2;
  const b = h / 2;

  const θ = node.rotation ? (-node.rotation * Math.PI) / 180 : 0;
  const [tx, ty] = node.rotation
    ? rotatePoint(targetX, targetY, cx, cy, θ)
    : [targetX, targetY];

  const dx = tx - cx;
  const dy = ty - cy;

  if (dx === 0 && dy === 0) {
    return { x: cx + a, y: cy, side: "right" };
  }

  const t = 1 / (Math.abs(dx) / a + Math.abs(dy) / b);
  let px = cx + dx * t;
  let py = cy + dy * t;

  const side = dominantSide(dx, dy, a, b);

  if (node.rotation) {
    [px, py] = rotatePoint(px, py, cx, cy, -θ) as [number, number];
  }

  return { x: px, y: py, side };
}

/**
 * Draw-node anchor: project toward target and pick the furthest sampled stroke point
 * in that direction, then push out by half the stroke width.
 */
function drawBorderPointWithSide(
  node: DrawNode,
  h: number,
  targetX: number,
  targetY: number,
): { x: number; y: number; side: HandleSide } {
  const points = node.data.points;
  if (!points || points.length === 0) {
    return borderPointWithSide(node, h, targetX, targetY);
  }

  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;

  // Work in node's unrotated space for robust direction + projection.
  const θ = node.rotation ? (-node.rotation * Math.PI) / 180 : 0;
  const [tx, ty] = node.rotation
    ? rotatePoint(targetX, targetY, cx, cy, θ)
    : [targetX, targetY];

  const dirX = tx - cx;
  const dirY = ty - cy;
  const dirLen = Math.hypot(dirX, dirY);
  if (dirLen === 0) {
    return borderPointWithSide(node, h, targetX, targetY);
  }
  const ux = dirX / dirLen;
  const uy = dirY / dirLen;

  let bestX = node.x + points[0][0];
  let bestY = node.y + points[0][1];
  let bestProj = (bestX - cx) * ux + (bestY - cy) * uy;
  for (let i = 1; i < points.length; i++) {
    const px = node.x + points[i][0];
    const py = node.y + points[i][1];
    const proj = (px - cx) * ux + (py - cy) * uy;
    if (proj > bestProj) {
      bestProj = proj;
      bestX = px;
      bestY = py;
    }
  }

  const radius = Math.max(0.5, (node.data.strokeWidth ?? 1) / 2);
  let anchorX = bestX + ux * radius;
  let anchorY = bestY + uy * radius;
  const side = dominantSide(dirX, dirY, node.w / 2, h / 2);

  if (node.rotation) {
    [anchorX, anchorY] = rotatePoint(anchorX, anchorY, cx, cy, -θ) as [number, number];
  }

  return { x: anchorX, y: anchorY, side };
}

/**
 * Shape-aware border intersection: dispatches to the appropriate
 * perimeter function based on the node's actual shape.
 */
export function shapeBorderPointWithSide(
  node: SpatialNode,
  h: number,
  targetX: number,
  targetY: number
): { x: number; y: number; side: HandleSide } {
  if (node.type === "draw") {
    return drawBorderPointWithSide(node as DrawNode, h, targetX, targetY);
  }
  if (node.type === "shape") {
    const shape = (node.data as { shape?: string })?.shape;
    if (shape === "ellipse") return ellipseBorderPointWithSide(node, h, targetX, targetY);
    if (shape === "diamond") return diamondBorderPointWithSide(node, h, targetX, targetY);
  }
  return borderPointWithSide(node, h, targetX, targetY);
}

/**
 * Get the midpoint of a specific side of a node (for handle-based anchoring).
 */
export function handlePoint(
  node: SpatialNode,
  h: number,
  side: HandleSide
): { x: number; y: number } {
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;

  let px: number, py: number;
  switch (side) {
    case "top": px = cx; py = node.y; break;
    case "bottom": px = cx; py = node.y + h; break;
    case "left": px = node.x; py = cy; break;
    case "right": px = node.x + node.w; py = cy; break;
  }

  if (!node.rotation) return { x: px, y: py };

  const θ = (node.rotation * Math.PI) / 180;
  const [wx, wy] = rotatePoint(px, py, cx, cy, θ);
  return { x: wx, y: wy };
}

/** Direction vector for a handle side (outward from node). */
export function sideDirection(side: HandleSide): { dx: number; dy: number } {
  switch (side) {
    case "top": return { dx: 0, dy: -1 };
    case "bottom": return { dx: 0, dy: 1 };
    case "left": return { dx: -1, dy: 0 };
    case "right": return { dx: 1, dy: 0 };
  }
}

/**
 * Compute orthogonal waypoints for step/smoothstep edges.
 * Produces a series of points that form an orthogonal path from source to target.
 */
interface StepPointsResult {
  points: [number, number][];
  kinkHandle?: KinkHandleInfo;
}

export function computeStepPoints(
  x1: number, y1: number, x2: number, y2: number,
  sourceSide: HandleSide, targetSide: HandleSide,
  padding: number,
  midpointOffset?: number
): StepPointsResult {
  const sd = sideDirection(sourceSide);
  const td = sideDirection(targetSide);

  // Step out from source and target by padding
  const sx = x1 + sd.dx * padding;
  const sy = y1 + sd.dy * padding;
  const tx = x2 + td.dx * padding;
  const ty = y2 + td.dy * padding;

  const isSourceH = sourceSide === "left" || sourceSide === "right";
  const isTargetH = targetSide === "left" || targetSide === "right";

  const points: [number, number][] = [[x1, y1], [sx, sy]];
  const offset = midpointOffset ?? 0.5;
  let kinkHandle: KinkHandleInfo | undefined;

  if (isSourceH && isTargetH) {
    // Both horizontal: kink is a vertical line at midX, draggable along X
    const midX = sx + (tx - sx) * offset;
    points.push([midX, sy], [midX, ty]);
    const minX = Math.min(sx, tx);
    const maxX = Math.max(sx, tx);
    kinkHandle = { x: midX, y: (sy + ty) / 2, axis: "x", min: minX, max: maxX };
  } else if (!isSourceH && !isTargetH) {
    // Both vertical: kink is a horizontal line at midY, draggable along Y
    const midY = sy + (ty - sy) * offset;
    points.push([sx, midY], [tx, midY]);
    const minY = Math.min(sy, ty);
    const maxY = Math.max(sy, ty);
    kinkHandle = { x: (sx + tx) / 2, y: midY, axis: "y", min: minY, max: maxY };
  } else if (isSourceH && !isTargetH) {
    // Source horizontal, target vertical — single corner, no adjustable kink
    points.push([tx, sy]);
  } else {
    // Source vertical, target horizontal — single corner, no adjustable kink
    points.push([sx, ty]);
  }

  points.push([tx, ty], [x2, y2]);
  return { points, kinkHandle };
}
