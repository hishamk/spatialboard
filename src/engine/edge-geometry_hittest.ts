import type { SpatialNode, EdgeNode } from "./types";
import { spatialPerf } from "../perf/spatial-perf";
import {
  resolveH,
  sideDirection,
  shapeBorderPointWithSide,
  computeStepPoints,
} from "./edge-geometry_shared";
import { computeEdgePath } from "./edge-geometry_path";
import type { PortPositionResolver } from "./edge-geometry_port";

function borderPoint(
  node: SpatialNode,
  h: number,
  targetX: number,
  targetY: number
): { x: number; y: number } {
  const result = shapeBorderPointWithSide(node, h, targetX, targetY);
  return { x: result.x, y: result.y };
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
  samples: number = 40
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
    sourcePortPos, targetPortPos,
    edge.data.sourceT, edge.data.targetT,
    edge.data.attachmentGap,
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
 * Canvas-space pick radius for an edge, aligned with SVGLayer's invisible hit stroke:
 * stroke width max(sw + 16/zoom, 20/zoom) → half-width in canvas units.
 */
export function edgePickTolerance(edge: EdgeNode, zoom: number): number {
  const z = Math.max(0.01, zoom);
  const sw = edge.data.strokeWidth ?? 2;
  return Math.max(sw / 2 + 8 / z, 10 / z);
}

export type ClosestEdgeHit = { node: SpatialNode; distance: number };

/**
 * Closest edge whose path lies within per-edge pick tolerance of the point.
 */
export function getClosestEdgeHit(
  nodes: Map<string, SpatialNode>,
  canvasX: number,
  canvasY: number,
  zoom: number,
  measuredHeights?: Record<string, number>,
  resolvePortPositions?: PortPositionResolver
): ClosestEdgeHit | null {
  const shouldProfile = spatialPerf.isEnabled();
  const t0 = shouldProfile ? performance.now() : 0;
  let closest: ClosestEdgeHit | null = null;

  for (const node of nodes.values()) {
    if (node.type !== "edge") continue;
    const edge = node as EdgeNode;
    const from = nodes.get(edge.data.fromId);
    const to = nodes.get(edge.data.toId);
    if (!from || !to) continue;

    const pp = resolvePortPositions?.(edge, from, to);
    const dist = pointToEdgeDistance(canvasX, canvasY, from, to, edge, measuredHeights, pp?.sourcePortPos, pp?.targetPortPos);
    const tol = edgePickTolerance(edge, zoom);
    if (dist < tol && (!closest || dist < closest.distance)) {
      closest = { node, distance: dist };
    }
  }

  if (shouldProfile) spatialPerf.recordEdgeHit(performance.now() - t0);
  return closest;
}

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
  const shouldProfile = spatialPerf.isEnabled();
  const t0 = shouldProfile ? performance.now() : 0;
  const results: SpatialNode[] = [];

  for (const node of nodes.values()) {
    if (node.type !== "edge") continue;
    const edge = node as EdgeNode;
    const from = nodes.get(edge.data.fromId);
    const to = nodes.get(edge.data.toId);
    if (!from || !to) continue;

    const pp = resolvePortPositions?.(edge, from, to);
    const dist = pointToEdgeDistance(canvasX, canvasY, from, to, edge, measuredHeights, pp?.sourcePortPos, pp?.targetPortPos);
    if (dist < edgePickTolerance(edge, zoom)) results.push(node);
  }

  if (shouldProfile) spatialPerf.recordEdgeHit(performance.now() - t0);
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
  return getClosestEdgeHit(nodes, canvasX, canvasY, zoom, measuredHeights, resolvePortPositions)?.node ?? null;
}
