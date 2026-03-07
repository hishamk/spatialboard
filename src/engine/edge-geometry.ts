import type { SpatialNode, EdgeNode, EdgeType, HandleSide } from "./types";
import type { PortDefinition } from "./data-flow-types";

function resolveH(node: SpatialNode, measured?: Record<string, number>): number {
  if (node.h !== "auto") return node.h;
  return measured?.[node.id] ?? 100;
}

/**
 * PORT_OFFSET is the distance (in screen pixels) that port circles are rendered
 * outside the node edge.  Divide by zoom to get canvas-space offset.
 */
const PORT_OFFSET_PX = 14;

/**
 * Compute the canvas-space position of a specific port on a node.
 *
 * Returns `null` if the port ID is not found in the port list.
 *
 * @param node       The spatial node
 * @param ports      Port definitions for this node type
 * @param portId     The port ID to locate
 * @param zoom       Current viewport zoom (needed because offset is screen-px based)
 * @param measuredH  Optional measured heights map
 */
export function getPortPosition(
  node: SpatialNode,
  ports: PortDefinition[],
  portId: string,
  zoom: number,
  measuredH?: Record<string, number>,
): { x: number; y: number } | null {
  const port = ports.find((p) => p.id === portId);
  if (!port) return null;

  const nh = resolveH(node, measuredH);
  const portOffset = PORT_OFFSET_PX / zoom;

  const portsOfDir = ports.filter((p) => p.direction === port.direction);
  const idx = portsOfDir.indexOf(port);
  if (idx < 0) return null;

  const py = node.y + (nh / (portsOfDir.length + 1)) * (idx + 1);
  const px =
    port.direction === "input"
      ? node.x - portOffset
      : node.x + node.w + portOffset;

  // Handle node rotation
  if (node.rotation) {
    const cx = node.x + node.w / 2;
    const cy = node.y + nh / 2;
    const rad = (node.rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = px - cx;
    const dy = py - cy;
    return { x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos };
  }

  return { x: px, y: py };
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
function rotatePoint(
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

function borderPoint(
  node: SpatialNode,
  h: number,
  targetX: number,
  targetY: number
): { x: number; y: number } {
  const result = borderPointWithSide(node, h, targetX, targetY);
  return { x: result.x, y: result.y };
}

/**
 * Get the midpoint of a specific side of a node (for handle-based anchoring).
 */
function handlePoint(
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
function sideDirection(side: HandleSide): { dx: number; dy: number } {
  switch (side) {
    case "top": return { dx: 0, dy: -1 };
    case "bottom": return { dx: 0, dy: 1 };
    case "left": return { dx: -1, dy: 0 };
    case "right": return { dx: 1, dy: 0 };
  }
}

// ─── Edge Path Computation ─────────────────────────────────────────────

export interface KinkHandleInfo {
  /** Canvas position of the draggable kink handle */
  x: number;
  y: number;
  /** Axis the kink can be dragged along ("xy" = free 2D for bezier) */
  axis: "x" | "y" | "xy";
  /** Range bounds for clamping during drag (unused for "xy") */
  min: number;
  max: number;
}

export interface EdgePathResult {
  /** SVG path d attribute */
  path: string;
  /** Label position (midpoint of the curve) */
  labelX: number;
  labelY: number;
  /** Source endpoint */
  x1: number;
  y1: number;
  /** Target endpoint */
  x2: number;
  y2: number;
  /** Direction the edge arrives at the target (for arrowhead orientation) */
  arrowAngle: number;
  /** Direction the edge leaves the source (for arrow tail orientation) */
  tailAngle: number;
  /** Which side the edge exits the source node */
  sourceSide: HandleSide;
  /** Which side the edge enters the target node */
  targetSide: HandleSide;
  /** Draggable kink handle info (step/smoothstep only) */
  kinkHandle?: KinkHandleInfo;
  /** Bounding box of the edge */
  bounds: { x: number; y: number; w: number; h: number };
}

/**
 * Compute the full edge path between two nodes.
 *
 * When `sourcePortPos` or `targetPortPos` are provided, the edge endpoints
 * are placed at those exact positions (used for port-connected edges) instead
 * of at the node border / handle midpoint.
 */
export function computeEdgePath(
  fromNode: SpatialNode,
  toNode: SpatialNode,
  edgeType: EdgeType = "bezier",
  measuredHeights?: Record<string, number>,
  sourceHandle?: HandleSide,
  targetHandle?: HandleSide,
  midpointOffset?: number,
  curveOffset?: [number, number],
  sourcePortPos?: { x: number; y: number },
  targetPortPos?: { x: number; y: number }
): EdgePathResult {
  const fh = resolveH(fromNode, measuredHeights);
  const th = resolveH(toNode, measuredHeights);

  const fcx = fromNode.x + fromNode.w / 2;
  const fcy = fromNode.y + fh / 2;
  const tcx = toNode.x + toNode.w / 2;
  const tcy = toNode.y + th / 2;

  // Compute endpoint + side for source
  let x1: number, y1: number, sourceSide: HandleSide;
  if (sourcePortPos) {
    x1 = sourcePortPos.x; y1 = sourcePortPos.y;
    sourceSide = sourceHandle ?? "right";
  } else if (sourceHandle) {
    const p = handlePoint(fromNode, fh, sourceHandle);
    x1 = p.x; y1 = p.y; sourceSide = sourceHandle;
  } else {
    const p = borderPointWithSide(fromNode, fh, tcx, tcy);
    x1 = p.x; y1 = p.y; sourceSide = p.side;
  }

  // Compute endpoint + side for target
  let x2: number, y2: number, targetSide: HandleSide;
  if (targetPortPos) {
    x2 = targetPortPos.x; y2 = targetPortPos.y;
    targetSide = targetHandle ?? "left";
  } else if (targetHandle) {
    const p = handlePoint(toNode, th, targetHandle);
    x2 = p.x; y2 = p.y; targetSide = targetHandle;
  } else {
    const p = borderPointWithSide(toNode, th, fcx, fcy);
    x2 = p.x; y2 = p.y; targetSide = p.side;
  }

  switch (edgeType) {
    case "straight":
      return makeStraightPath(x1, y1, x2, y2, sourceSide, targetSide);
    case "bezier":
      return makeBezierPath(x1, y1, x2, y2, sourceSide, targetSide, curveOffset);
    case "smoothstep":
      return makeSmoothStepPath(x1, y1, x2, y2, sourceSide, targetSide, midpointOffset);
    case "step":
      return makeStepPath(x1, y1, x2, y2, sourceSide, targetSide, midpointOffset);
  }
}

function makeStraightPath(
  x1: number, y1: number, x2: number, y2: number,
  sourceSide: HandleSide, targetSide: HandleSide
): EdgePathResult {
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  const w = Math.abs(x2 - x1);
  const h = Math.abs(y2 - y1);
  return {
    path: `M${x1},${y1} L${x2},${y2}`,
    labelX: (x1 + x2) / 2,
    labelY: (y1 + y2) / 2,
    x1, y1, x2, y2,
    arrowAngle: Math.atan2(y2 - y1, x2 - x1),
    tailAngle: Math.atan2(y1 - y2, x1 - x2),
    sourceSide,
    targetSide,
    bounds: { x: minX, y: minY, w, h },
  };
}

function makeBezierPath(
  x1: number, y1: number, x2: number, y2: number,
  sourceSide: HandleSide, targetSide: HandleSide,
  curveOffset?: [number, number]
): EdgePathResult {
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const offset = Math.min(dist * 0.5, Math.max(50, dist * 0.25));

  const sd = sideDirection(sourceSide);
  const td = sideDirection(targetSide);

  // Apply curveOffset: shift both control points by offset * 4/3
  const curveDx = curveOffset ? curveOffset[0] * (4 / 3) : 0;
  const curveDy = curveOffset ? curveOffset[1] * (4 / 3) : 0;

  const cx1 = x1 + sd.dx * offset + curveDx;
  const cy1 = y1 + sd.dy * offset + curveDy;
  const cx2 = x2 + td.dx * offset + curveDx;
  const cy2 = y2 + td.dy * offset + curveDy;

  // Midpoint of cubic bezier at t=0.5
  const labelX = 0.125 * x1 + 0.375 * cx1 + 0.375 * cx2 + 0.125 * x2;
  const labelY = 0.125 * y1 + 0.375 * cy1 + 0.375 * cy2 + 0.125 * y2;

  // Tangent at t=1 (for arrowhead)
  const arrowAngle = Math.atan2(y2 - cy2, x2 - cx2);
  const tailAngle = Math.atan2(y1 - cy1, x1 - cx1);

  // Kink handle at the visual midpoint (free 2D drag)
  const kinkHandle: KinkHandleInfo = {
    x: labelX, y: labelY,
    axis: "xy", min: 0, max: 0,
  };

  const minX = Math.min(x1, x2, cx1, cx2);
  const minY = Math.min(y1, y2, cy1, cy2);
  const maxX = Math.max(x1, x2, cx1, cx2);
  const maxY = Math.max(y1, y2, cy1, cy2);

  return {
    path: `M${x1},${y1} C${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`,
    labelX, labelY,
    x1, y1, x2, y2,
    arrowAngle,
    tailAngle,
    sourceSide,
    targetSide,
    kinkHandle,
    bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
  };
}

function makeSmoothStepPath(
  x1: number, y1: number, x2: number, y2: number,
  sourceSide: HandleSide, targetSide: HandleSide,
  midpointOffset?: number
): EdgePathResult {
  const borderRadius = 8;
  const padding = 20;
  const { points, kinkHandle } = computeStepPoints(x1, y1, x2, y2, sourceSide, targetSide, padding, midpointOffset);

  // Build path with rounded corners
  const path = buildRoundedPath(points, borderRadius);

  // Label at midpoint of path segments
  const mid = Math.floor(points.length / 2);
  const labelX = (points[mid - 1][0] + points[mid][0]) / 2;
  const labelY = (points[mid - 1][1] + points[mid][1]) / 2;

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  const arrowAngle = Math.atan2(last[1] - prev[1], last[0] - prev[0]);

  const first = points[0];
  const second = points[1];
  const tailAngle = Math.atan2(first[1] - second[1], first[0] - second[0]);

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [px, py] of points) {
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  }

  return {
    path, labelX, labelY,
    x1, y1, x2, y2,
    arrowAngle,
    tailAngle,
    sourceSide,
    targetSide,
    kinkHandle,
    bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
  };
}

function makeStepPath(
  x1: number, y1: number, x2: number, y2: number,
  sourceSide: HandleSide, targetSide: HandleSide,
  midpointOffset?: number
): EdgePathResult {
  const padding = 20;
  const { points, kinkHandle } = computeStepPoints(x1, y1, x2, y2, sourceSide, targetSide, padding, midpointOffset);

  const parts = [`M${points[0][0]},${points[0][1]}`];
  for (let i = 1; i < points.length; i++) {
    parts.push(`L${points[i][0]},${points[i][1]}`);
  }

  const mid = Math.floor(points.length / 2);
  const labelX = (points[mid - 1][0] + points[mid][0]) / 2;
  const labelY = (points[mid - 1][1] + points[mid][1]) / 2;

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  const arrowAngle = Math.atan2(last[1] - prev[1], last[0] - prev[0]);

  const first = points[0];
  const second = points[1];
  const tailAngle = Math.atan2(first[1] - second[1], first[0] - second[0]);

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [px, py] of points) {
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  }

  return {
    path: parts.join(" "),
    labelX, labelY,
    x1, y1, x2, y2,
    arrowAngle,
    tailAngle,
    sourceSide,
    targetSide,
    kinkHandle,
    bounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
  };
}

/**
 * Compute orthogonal waypoints for step/smoothstep edges.
 * Produces a series of points that form an orthogonal path from source to target.
 */
interface StepPointsResult {
  points: [number, number][];
  kinkHandle?: KinkHandleInfo;
}

function computeStepPoints(
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

/**
 * Build an SVG path with rounded corners at each waypoint.
 */
function buildRoundedPath(points: [number, number][], radius: number): string {
  if (points.length < 2) return "";
  if (points.length === 2) return `M${points[0][0]},${points[0][1]} L${points[1][0]},${points[1][1]}`;

  const parts: string[] = [`M${points[0][0]},${points[0][1]}`];

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    // Direction vectors
    const d1x = curr[0] - prev[0];
    const d1y = curr[1] - prev[1];
    const d2x = next[0] - curr[0];
    const d2y = next[1] - curr[1];
    const len1 = Math.hypot(d1x, d1y);
    const len2 = Math.hypot(d2x, d2y);

    if (len1 === 0 || len2 === 0) {
      parts.push(`L${curr[0]},${curr[1]}`);
      continue;
    }

    // Clamp radius to half the shorter segment
    const r = Math.min(radius, len1 / 2, len2 / 2);

    const startX = curr[0] - (d1x / len1) * r;
    const startY = curr[1] - (d1y / len1) * r;
    const endX = curr[0] + (d2x / len2) * r;
    const endY = curr[1] + (d2y / len2) * r;

    parts.push(`L${startX},${startY}`);
    parts.push(`Q${curr[0]},${curr[1]} ${endX},${endY}`);
  }

  const last = points[points.length - 1];
  parts.push(`L${last[0]},${last[1]}`);

  return parts.join(" ");
}

// ─── Bezier sampling for hit testing ────────────────────────────────────

/** Sample a cubic bezier at parameter t. */
function sampleCubicBezier(
  x1: number, y1: number,
  cx1: number, cy1: number,
  cx2: number, cy2: number,
  x2: number, y2: number,
  t: number
): [number, number] {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    mt3 * x1 + 3 * mt2 * t * cx1 + 3 * mt * t2 * cx2 + t3 * x2,
    mt3 * y1 + 3 * mt2 * t * cy1 + 3 * mt * t2 * cy2 + t3 * y2,
  ];
}

/**
 * Minimum distance from a point to a cubic bezier curve, approximated by sampling.
 */
function pointToBezierDistance(
  px: number, py: number,
  x1: number, y1: number,
  cx1: number, cy1: number,
  cx2: number, cy2: number,
  x2: number, y2: number,
  samples: number = 24
): number {
  let minDist = Infinity;
  let prevX = x1, prevY = y1;

  for (let i = 1; i <= samples; i++) {
    const t = i / samples;
    const [sx, sy] = sampleCubicBezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2, t);
    const dist = pointToSegmentDistance(px, py, prevX, prevY, sx, sy);
    if (dist < minDist) minDist = dist;
    prevX = sx;
    prevY = sy;
  }
  return minDist;
}

/**
 * Minimum distance from a point to a polyline path (for step/smoothstep edges).
 */
function pointToPolylineDistance(
  px: number, py: number,
  points: [number, number][]
): number {
  let minDist = Infinity;
  for (let i = 1; i < points.length; i++) {
    const dist = pointToSegmentDistance(px, py, points[i - 1][0], points[i - 1][1], points[i][0], points[i][1]);
    if (dist < minDist) minDist = dist;
  }
  return minDist;
}

/**
 * Compute distance from a point to an edge's path (any edge type).
 */
export function pointToEdgeDistance(
  px: number, py: number,
  fromNode: SpatialNode,
  toNode: SpatialNode,
  edge: EdgeNode,
  measuredHeights?: Record<string, number>,
  sourcePortPos?: { x: number; y: number },
  targetPortPos?: { x: number; y: number }
): number {
  const edgeType = edge.data.edgeType || "bezier";
  const pathResult = computeEdgePath(
    fromNode, toNode, edgeType, measuredHeights,
    edge.data.sourceHandle, edge.data.targetHandle,
    edge.data.midpointOffset, edge.data.curveOffset,
    sourcePortPos, targetPortPos
  );
  const { x1, y1, x2, y2 } = pathResult;

  if (edgeType === "straight") {
    return pointToSegmentDistance(px, py, x1, y1, x2, y2);
  }

  if (edgeType === "bezier") {
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const offset = Math.min(dist * 0.5, Math.max(50, dist * 0.25));
    const sd = sideDirection(pathResult.sourceSide);
    const td = sideDirection(pathResult.targetSide);
    const curveDx = edge.data.curveOffset ? edge.data.curveOffset[0] * (4 / 3) : 0;
    const curveDy = edge.data.curveOffset ? edge.data.curveOffset[1] * (4 / 3) : 0;
    const cx1 = x1 + sd.dx * offset + curveDx;
    const cy1 = y1 + sd.dy * offset + curveDy;
    const cx2 = x2 + td.dx * offset + curveDx;
    const cy2 = y2 + td.dy * offset + curveDy;
    return pointToBezierDistance(px, py, x1, y1, cx1, cy1, cx2, cy2, x2, y2);
  }

  // step / smoothstep — use polyline distance
  const padding = 20;
  const { points } = computeStepPoints(x1, y1, x2, y2, pathResult.sourceSide, pathResult.targetSide, padding, edge.data.midpointOffset);
  return pointToPolylineDistance(px, py, points);
}

// ─── Legacy-compatible exports ─────────────────────────────────────────

/**
 * Compute the two endpoints of an edge line (border intersection on each node).
 */
export function computeEdgeEndpoints(
  fromNode: SpatialNode,
  toNode: SpatialNode,
  measuredHeights?: Record<string, number>
): { x1: number; y1: number; x2: number; y2: number } {
  const fh = resolveH(fromNode, measuredHeights);
  const th = resolveH(toNode, measuredHeights);

  const fcx = fromNode.x + fromNode.w / 2;
  const fcy = fromNode.y + fh / 2;
  const tcx = toNode.x + toNode.w / 2;
  const tcy = toNode.y + th / 2;

  const p1 = borderPoint(fromNode, fh, tcx, tcy);
  const p2 = borderPoint(toNode, th, fcx, fcy);

  return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
}

/**
 * Compute single border-exit point (for edge creation preview: from node border toward cursor).
 */
export function computeSingleBorderPoint(
  node: SpatialNode,
  targetX: number,
  targetY: number,
  measuredHeights?: Record<string, number>
): { x: number; y: number } {
  const h = resolveH(node, measuredHeights);
  return borderPoint(node, h, targetX, targetY);
}

/**
 * Minimum distance from point (px,py) to line segment (x1,y1)–(x2,y2).
 */
export function pointToSegmentDistance(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - x1, py - y1);

  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return Math.hypot(px - projX, py - projY);
}

/**
 * Test whether a line segment intersects a rectangle.
 * Used for marquee-selecting edges.
 */
export function segmentIntersectsRect(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rect: { x: number; y: number; w: number; h: number }
): boolean {
  // If either endpoint is inside the rect, it intersects
  const inside = (px: number, py: number) =>
    px >= rect.x && px <= rect.x + rect.w && py >= rect.y && py <= rect.y + rect.h;
  if (inside(x1, y1) || inside(x2, y2)) return true;

  // Cohen-Sutherland style: test segment against each rect edge
  const edges: [number, number, number, number][] = [
    [rect.x, rect.y, rect.x + rect.w, rect.y], // top
    [rect.x, rect.y + rect.h, rect.x + rect.w, rect.y + rect.h], // bottom
    [rect.x, rect.y, rect.x, rect.y + rect.h], // left
    [rect.x + rect.w, rect.y, rect.x + rect.w, rect.y + rect.h], // right
  ];

  for (const [ex1, ey1, ex2, ey2] of edges) {
    if (segmentsIntersect(x1, y1, x2, y2, ex1, ey1, ex2, ey2)) return true;
  }
  return false;
}

/** Test whether two line segments intersect. */
function segmentsIntersect(
  ax1: number, ay1: number, ax2: number, ay2: number,
  bx1: number, by1: number, bx2: number, by2: number
): boolean {
  const d1x = ax2 - ax1, d1y = ay2 - ay1;
  const d2x = bx2 - bx1, d2y = by2 - by1;
  const cross = d1x * d2y - d1y * d2x;
  if (Math.abs(cross) < 1e-10) return false;

  const dx = bx1 - ax1, dy = by1 - ay1;
  const t = (dx * d2y - dy * d2x) / cross;
  const u = (dx * d1y - dy * d1x) / cross;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

/**
 * Generate SVG path data for an open chevron arrowhead centered on (cx,cy)
 * pointing in the direction given by angle (radians).
 */
export function arrowHeadPath(
  cx: number,
  cy: number,
  angle: number,
  size: number
): string {
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const px = -uy;
  const py = ux;

  const half = size / 2;
  const tipX = cx + ux * half;
  const tipY = cy + uy * half;
  const baseX = cx - ux * half;
  const baseY = cy - uy * half;
  const halfW = size * 0.4;

  // Open polyline — two lines forming a chevron (no fill, stroke only)
  return `M${baseX + px * halfW},${baseY + py * halfW} L${tipX},${tipY} L${baseX - px * halfW},${baseY - py * halfW}`;
}

/**
 * Generate SVG path data for a filled (closed triangle) arrowhead centered on (cx,cy)
 * pointing in the direction given by angle (radians).
 */
export function filledArrowHeadPath(
  cx: number,
  cy: number,
  angle: number,
  size: number
): string {
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const px = -uy;
  const py = ux;

  const half = size / 2;
  const tipX = cx + ux * half;
  const tipY = cy + uy * half;
  const baseX = cx - ux * half;
  const baseY = cy - uy * half;
  const halfW = size * 0.4;

  // Closed triangle path
  return `M${tipX},${tipY} L${baseX + px * halfW},${baseY + py * halfW} L${baseX - px * halfW},${baseY - py * halfW} Z`;
}

/**
 * Legacy arrowhead: compute angle from two points then delegate.
 */
export function arrowHeadPathFromPoints(
  tipX: number,
  tipY: number,
  fromX: number,
  fromY: number,
  size: number
): string {
  const angle = Math.atan2(tipY - fromY, tipX - fromX);
  return arrowHeadPath(tipX, tipY, angle, size);
}

/**
 * Get handle positions for a node (midpoints of four sides).
 * Returns positions in canvas space (accounting for rotation).
 */
export function getNodeHandlePositions(
  node: SpatialNode,
  measuredHeights?: Record<string, number>
): { side: HandleSide; x: number; y: number }[] {
  const h = resolveH(node, measuredHeights);
  const sides: HandleSide[] = ["top", "right", "bottom", "left"];
  return sides.map(side => {
    const p = handlePoint(node, h, side);
    return { side, x: p.x, y: p.y };
  });
}

/**
 * Find the nearest handle side of a node to a given point.
 */
export function nearestHandle(
  node: SpatialNode,
  px: number,
  py: number,
  measuredHeights?: Record<string, number>
): HandleSide {
  const handles = getNodeHandlePositions(node, measuredHeights);
  let best = handles[0];
  let bestDist = Infinity;
  for (const h of handles) {
    const dist = Math.hypot(h.x - px, h.y - py);
    if (dist < bestDist) {
      bestDist = dist;
      best = h;
    }
  }
  return best.side;
}

/** Callback that resolves port positions for an edge (used by hit-testing). */
export type PortPositionResolver = (
  edge: EdgeNode,
  fromNode: SpatialNode,
  toNode: SpatialNode,
) => {
  sourcePortPos?: { x: number; y: number };
  targetPortPos?: { x: number; y: number };
};

/**
 * Hit-test edges: find ALL edges within tolerance of a canvas point.
 */
export function hitTestAllEdges(
  nodes: Map<string, SpatialNode>,
  canvasX: number,
  canvasY: number,
  zoom: number,
  measuredHeights?: Record<string, number>,
  resolvePortPositions?: PortPositionResolver
): SpatialNode[] {
  const tolerance = 8 / zoom;
  const results: SpatialNode[] = [];

  for (const node of nodes.values()) {
    if (node.type !== "edge") continue;
    const edge = node as EdgeNode;
    const from = nodes.get(edge.data.fromId);
    const to = nodes.get(edge.data.toId);
    if (!from || !to) continue;

    const pp = resolvePortPositions?.(edge, from, to);
    const dist = pointToEdgeDistance(canvasX, canvasY, from, to, edge, measuredHeights, pp?.sourcePortPos, pp?.targetPortPos);
    if (dist < tolerance) results.push(node);
  }

  return results;
}

/**
 * Hit-test edges: find the closest edge within tolerance of a canvas point.
 */
export function hitTestEdge(
  nodes: Map<string, SpatialNode>,
  canvasX: number,
  canvasY: number,
  zoom: number,
  measuredHeights?: Record<string, number>,
  resolvePortPositions?: PortPositionResolver
): SpatialNode | null {
  const tolerance = 8 / zoom;
  let closest: SpatialNode | null = null;
  let minDist = tolerance;

  for (const node of nodes.values()) {
    if (node.type !== "edge") continue;
    const edge = node as EdgeNode;
    const from = nodes.get(edge.data.fromId);
    const to = nodes.get(edge.data.toId);
    if (!from || !to) continue;

    const pp = resolvePortPositions?.(edge, from, to);
    const dist = pointToEdgeDistance(canvasX, canvasY, from, to, edge, measuredHeights, pp?.sourcePortPos, pp?.targetPortPos);
    if (dist < minDist) {
      minDist = dist;
      closest = node;
    }
  }

  return closest;
}
