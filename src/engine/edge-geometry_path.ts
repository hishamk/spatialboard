import type { SpatialNode, DrawNode, HandleSide, EdgeType } from "./types";
import {
  resolveH,
  rotatePoint,
  dominantSide,
  shapeBorderPointWithSide,
  handlePoint,
  sideDirection,
  computeStepPoints,
} from "./edge-geometry_shared";
import { perimeterPoint, interiorAnchorPoint } from "./edge-geometry_perimeter";

/**
 * Draw-node anchor for explicit side handles.
 * Uses the nearest point on the actual stroke path to the selected handle midpoint,
 * then pushes outward by half the stroke width.
 */
function drawHandlePoint(
  node: DrawNode,
  h: number,
  side: HandleSide,
): { x: number; y: number } {
  const points = node.data.points;
  if (!points || points.length === 0) {
    return handlePoint(node, h, side);
  }

  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;
  const dir = sideDirection(side);
  const targetMidX = side === "left" || side === "right" ? node.x + (side === "right" ? node.w : 0) : node.x + node.w / 2;
  const targetMidY = side === "top" || side === "bottom" ? node.y + (side === "bottom" ? h : 0) : node.y + h / 2;

  const nearestPointOnSegment = (
    px: number,
    py: number,
    ax: number,
    ay: number,
    bx: number,
    by: number,
  ): [number, number] => {
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return [ax, ay];
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
    return [ax + t * dx, ay + t * dy];
  };

  let bestX = node.x + points[0][0];
  let bestY = node.y + points[0][1];
  let bestDistSq = (bestX - targetMidX) ** 2 + (bestY - targetMidY) ** 2;

  if (points.length === 1) {
    bestX = node.x + points[0][0];
    bestY = node.y + points[0][1];
  } else {
    for (let i = 0; i < points.length - 1; i++) {
      const ax = node.x + points[i][0];
      const ay = node.y + points[i][1];
      const bx = node.x + points[i + 1][0];
      const by = node.y + points[i + 1][1];
      const [nx, ny] = nearestPointOnSegment(targetMidX, targetMidY, ax, ay, bx, by);
      const distSq = (nx - targetMidX) ** 2 + (ny - targetMidY) ** 2;
      if (distSq < bestDistSq) {
        bestDistSq = distSq;
        bestX = nx;
        bestY = ny;
      }
    }
  }

  const radius = Math.max(0.5, (node.data.strokeWidth ?? 1) / 2);
  let anchorX = bestX + dir.dx * radius;
  let anchorY = bestY + dir.dy * radius;

  if (node.rotation) {
    const θ = (node.rotation * Math.PI) / 180;
    [anchorX, anchorY] = rotatePoint(anchorX, anchorY, cx, cy, θ) as [number, number];
  }

  return { x: anchorX, y: anchorY };
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
  /** Cubic control points (bezier only) — hit-testing MUST use these rather
   *  than re-deriving from sides: the renderer picks tangents (radial for
   *  free/port/interior anchors, cardinal for handles) that a re-derivation
   *  can't reproduce, and a diverged hit-curve makes edges unclickable. */
  controlPoints?: { cx1: number; cy1: number; cx2: number; cy2: number };
  /** Bounding box of the edge */
  bounds: { x: number; y: number; w: number; h: number };
}

/**
 * Returns true for shapes whose perimeter is non-rectangular (ellipse, diamond).
 * These shapes use the actual radial direction as the bezier tangent instead of
 * a snapped cardinal direction, so curves flow naturally out of the drawn shape.
 */
function isRadialShape(node: SpatialNode): boolean {
  if (node.type !== "shape") return false;
  const shape = (node.data as { shape?: string })?.shape;
  return shape === "ellipse" || shape === "diamond";
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
  targetPortPos?: { x: number; y: number },
  sourceT?: number | [number, number],
  targetT?: number | [number, number],
  attachmentGap?: number,
): EdgePathResult {
  const fh = resolveH(fromNode, measuredHeights);
  const th = resolveH(toNode, measuredHeights);

  const fcx = fromNode.x + fromNode.w / 2;
  const fcy = fromNode.y + fh / 2;
  const tcx = toNode.x + toNode.w / 2;
  const tcy = toNode.y + th / 2;

  // Compute endpoint + side for source
  let x1: number, y1: number, sourceSide: HandleSide;
  let sourceExitDir: { dx: number; dy: number } | undefined;
  // Free/interior/radial-shape tangents get fold-damping in makeBezierPath —
  // when the radial dir points AWAY from the other endpoint the curve would
  // shoot out backward and fold over itself. Port tangents keep their full
  // reach (the generous loop on a back-edge is the intended look there).
  let dampSourceCurl = false;
  let dampTargetCurl = false;
  if (sourcePortPos) {
    x1 = sourcePortPos.x; y1 = sourcePortPos.y;
    const sdx = x1 - fcx;
    const sdy = y1 - fcy;
    const sLen = Math.hypot(sdx, sdy);
    if (sLen > 1e-6) {
      sourceExitDir = { dx: sdx / sLen, dy: sdy / sLen };
    }
    sourceSide = dominantSide(sdx, sdy, fromNode.w / 2, fh / 2);
  } else if (Array.isArray(sourceT)) {
    // Interior anchor — the endpoint sits INSIDE the node at uv fractions.
    const p = interiorAnchorPoint(fromNode, fh, sourceT);
    x1 = p.x; y1 = p.y;
    const sdx = x1 - fcx;
    const sdy = y1 - fcy;
    sourceSide = dominantSide(sdx, sdy, fromNode.w / 2, fh / 2);
    const len = Math.hypot(sdx, sdy);
    if (len > 1e-6) sourceExitDir = { dx: sdx / len, dy: sdy / len };
    dampSourceCurl = true;
  } else if (sourceT !== undefined) {
    const p = perimeterPoint(fromNode, fh, sourceT);
    x1 = p.x; y1 = p.y; sourceSide = p.side;
    // Use radial exit direction for smooth bezier tangents
    const len = Math.hypot(x1 - fcx, y1 - fcy);
    if (len > 0) sourceExitDir = { dx: (x1 - fcx) / len, dy: (y1 - fcy) / len };
    dampSourceCurl = true;
  } else if (sourceHandle) {
    const p =
      fromNode.type === "draw"
        ? drawHandlePoint(fromNode as DrawNode, fh, sourceHandle)
        : handlePoint(fromNode, fh, sourceHandle);
    x1 = p.x; y1 = p.y; sourceSide = sourceHandle;
  } else {
    const p = shapeBorderPointWithSide(fromNode, fh, tcx, tcy);
    x1 = p.x; y1 = p.y; sourceSide = p.side;
    // For curved shapes, use the actual radial direction as the bezier exit tangent
    // so the curve flows naturally outward rather than snapping to a cardinal axis.
    if (isRadialShape(fromNode)) {
      const len = Math.hypot(tcx - fcx, tcy - fcy);
      if (len > 0) sourceExitDir = { dx: (tcx - fcx) / len, dy: (tcy - fcy) / len };
      dampSourceCurl = true;
    }
  }

  // Compute endpoint + side for target
  let x2: number, y2: number, targetSide: HandleSide;
  let targetEntryDir: { dx: number; dy: number } | undefined;
  if (targetPortPos) {
    x2 = targetPortPos.x; y2 = targetPortPos.y;
    const tdx = x2 - tcx;
    const tdy = y2 - tcy;
    const tLen = Math.hypot(tdx, tdy);
    if (tLen > 1e-6) {
      targetEntryDir = { dx: tdx / tLen, dy: tdy / tLen };
    }
    targetSide = dominantSide(tdx, tdy, toNode.w / 2, th / 2);
  } else if (Array.isArray(targetT)) {
    // Interior anchor — the endpoint sits INSIDE the node at uv fractions.
    const p = interiorAnchorPoint(toNode, th, targetT);
    x2 = p.x; y2 = p.y;
    const tdx = x2 - tcx;
    const tdy = y2 - tcy;
    targetSide = dominantSide(tdx, tdy, toNode.w / 2, th / 2);
    const len = Math.hypot(tdx, tdy);
    if (len > 1e-6) targetEntryDir = { dx: tdx / len, dy: tdy / len };
    dampTargetCurl = true;
  } else if (targetT !== undefined) {
    const p = perimeterPoint(toNode, th, targetT);
    x2 = p.x; y2 = p.y; targetSide = p.side;
    // Use radial entry direction for smooth bezier tangents
    const len = Math.hypot(x2 - tcx, y2 - tcy);
    if (len > 0) targetEntryDir = { dx: (x2 - tcx) / len, dy: (y2 - tcy) / len };
    dampTargetCurl = true;
  } else if (targetHandle) {
    const p =
      toNode.type === "draw"
        ? drawHandlePoint(toNode as DrawNode, th, targetHandle)
        : handlePoint(toNode, th, targetHandle);
    x2 = p.x; y2 = p.y; targetSide = targetHandle;
  } else {
    const p = shapeBorderPointWithSide(toNode, th, fcx, fcy);
    x2 = p.x; y2 = p.y; targetSide = p.side;
    // Entry tangent points inward toward the target center (opposite to exit)
    if (isRadialShape(toNode)) {
      const len = Math.hypot(fcx - tcx, fcy - tcy);
      if (len > 0) targetEntryDir = { dx: (fcx - tcx) / len, dy: (fcy - tcy) / len };
      dampTargetCurl = true;
    }
  }

  // Apply attachment gap — pull endpoints away from node borders. Interior
  // anchors are exempt: the whole point is the tip landing ON the uv spot.
  if (attachmentGap && attachmentGap > 0) {
    // Source: push outward from source node center
    if (!Array.isArray(sourceT)) {
      const sLen = Math.hypot(x1 - fcx, y1 - fcy);
      if (sLen > 0) {
        x1 += ((x1 - fcx) / sLen) * attachmentGap;
        y1 += ((y1 - fcy) / sLen) * attachmentGap;
      }
    }
    // Target: push outward from target node center
    if (!Array.isArray(targetT)) {
      const tLen = Math.hypot(x2 - tcx, y2 - tcy);
      if (tLen > 0) {
        x2 += ((x2 - tcx) / tLen) * attachmentGap;
        y2 += ((y2 - tcy) / tLen) * attachmentGap;
      }
    }
  }

  // Step/smoothstep route BY SIDE. A free/interior anchor whose dominant side
  // faces away from the other endpoint would exit backward and fold the tail —
  // flip the routing side to the chord-facing one (ports keep their sides).
  if (edgeType === "step" || edgeType === "smoothstep") {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dampSourceCurl) {
      const sdir = sideDirection(sourceSide);
      if (sdir.dx * dx + sdir.dy * dy < 0) {
        sourceSide = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "bottom" : "top");
      }
    }
    if (dampTargetCurl) {
      const tdir = sideDirection(targetSide);
      if (tdir.dx * -dx + tdir.dy * -dy < 0) {
        targetSide = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "left" : "right") : (dy > 0 ? "top" : "bottom");
      }
    }
  }

  switch (edgeType) {
    case "straight":
      return makeStraightPath(x1, y1, x2, y2, sourceSide, targetSide);
    case "bezier":
      return makeBezierPath(x1, y1, x2, y2, sourceSide, targetSide, curveOffset, sourceExitDir, targetEntryDir, dampSourceCurl, dampTargetCurl);
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
    // Midpoint handle: dragging it bends the line — the kink drag handler
    // converts the edge to bezier with the pull applied as curveOffset.
    kinkHandle: {
      x: (x1 + x2) / 2, y: (y1 + y2) / 2,
      axis: "xy", min: 0, max: 0,
    },
    bounds: { x: minX, y: minY, w, h },
  };
}

function makeBezierPath(
  x1: number, y1: number, x2: number, y2: number,
  sourceSide: HandleSide, targetSide: HandleSide,
  curveOffset?: [number, number],
  sourceExitDir?: { dx: number; dy: number },
  targetEntryDir?: { dx: number; dy: number },
  dampSourceCurl?: boolean,
  dampTargetCurl?: boolean,
): EdgePathResult {
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const offset = Math.min(dist * 0.5, Math.max(50, dist * 0.25));

  const sd = sourceExitDir ?? sideDirection(sourceSide);
  const td = targetEntryDir ?? sideDirection(targetSide);

  // Fold-damping (free/interior/radial anchors): when a tangent points AWAY
  // from the chord toward the other endpoint, its full control reach makes the
  // curve shoot out backward and fold over itself. Shrink the reach smoothly
  // with how much the tangent opposes the chord (floor keeps a small curl).
  let sOffset = offset;
  let tOffset = offset;
  if (dist > 1e-6 && (dampSourceCurl || dampTargetCurl)) {
    const ux = (x2 - x1) / dist;
    const uy = (y2 - y1) / dist;
    if (dampSourceCurl && sourceExitDir) {
      const dot = sd.dx * ux + sd.dy * uy; // 1 = exits toward target
      if (dot < 0) sOffset = offset * Math.max(0.15, 1 + dot);
    }
    if (dampTargetCurl && targetEntryDir) {
      const dot = -(td.dx * ux + td.dy * uy); // 1 = arrives along the chord
      if (dot < 0) tOffset = offset * Math.max(0.15, 1 + dot);
    }
  }

  // Apply curveOffset: shift both control points by offset * 4/3
  const curveDx = curveOffset ? curveOffset[0] * (4 / 3) : 0;
  const curveDy = curveOffset ? curveOffset[1] * (4 / 3) : 0;

  const cx1 = x1 + sd.dx * sOffset + curveDx;
  const cy1 = y1 + sd.dy * sOffset + curveDy;
  const cx2 = x2 + td.dx * tOffset + curveDx;
  const cy2 = y2 + td.dy * tOffset + curveDy;

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
    controlPoints: { cx1, cy1, cx2, cy2 },
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
