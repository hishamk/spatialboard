import type { SpatialNode, EdgeNode, HandleSide } from "./types";
import type { PortDefinition, PortDirection } from "./data-flow-types";
import { resolveH, handlePoint } from "./edge-geometry_shared";

/**
 * Port anchor sits this many **screen pixels** outside the node box (÷ zoom → canvas).
 * Keep small so ports hug the node; wire hit-testing still uses the same anchor as rendering.
 */
export const PORT_ANCHOR_OUTSIDE_PX = 7;

/** Screen-space snap radius when releasing a drag to connect to a port. */
export const PORT_EDGE_SNAP_RADIUS_PX = 52;

/**
 * Screen-space radius from port center to show drag-target highlight only when the cursor
 * is on the port dot (rendered ~6px radius + stroke in SVGLayer).
 */
export const PORT_DOT_HIGHLIGHT_RADIUS_PX = 8;

/** Rendered port-dot radius in screen pixels (SVGLayer circle). */
export const PORT_DOT_RADIUS_PX = 6;

/**
 * Horizontal inset in canvas units for an `inset` anchor, clamped so a bad
 * fraction can never push a port past the node's centre line.
 */
function portInsetPx(
  node: SpatialNode,
  anchor: { kind: "inset"; left?: number; right?: number },
  direction: PortDirection,
): number {
  const frac = direction === "input" ? (anchor.left ?? 0) : (anchor.right ?? 0);
  return Math.max(0, Math.min(0.5, frac)) * node.w;
}

/**
 * Canvas coordinates for a point in the node's unrotated AABB space
 * (same convention as stacked port placement).
 */
export function nodeLocalPointToCanvas(
  node: SpatialNode,
  localX: number,
  localY: number,
  measuredH?: Record<string, number>,
): { x: number; y: number } {
  const nh = resolveH(node, measuredH);
  if (!node.rotation) return { x: localX, y: localY };
  const cx = node.x + node.w / 2;
  const cy = node.y + nh / 2;
  const rad = (node.rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const dx = localX - cx;
  const dy = localY - cy;
  return { x: cx + dx * cos - dy * sin, y: cy + dx * sin + dy * cos };
}

/**
 * How port dots attach to the node rect.
 *
 * `bbox` (default) anchors on the node's bounding box. `inscribed-circle`
 * anchors on the circle inscribed in `min(w, h)`. The `inset` form anchors a
 * fraction of the node width in from each side — for bodies drawn inset from
 * their box (parallelograms, hexagons, diamonds), whose ports would otherwise
 * float in the gap between the box edge and the drawn shape.
 *
 * A single fraction per side is exact for a body whose edge is vertical at the
 * port row, and a close approximation for a slanted one; the residual is a
 * fraction of the slant, well under the port dot's own radius at usable zooms.
 */
export type PortAnchorMode =
  | "bbox"
  | "inscribed-circle"
  | { kind: "inset"; left?: number; right?: number };

/**
 * Unrotated canvas coordinates for the port connector dot (same frame as `node.x` / `node.y`).
 * Matches the SVG port layer when the parent `<g>` uses `rotate(..., ncx, ncy)`.
 */
export function getPortOuterLocal(
  node: SpatialNode,
  ports: PortDefinition[],
  portId: string,
  zoom: number,
  measuredH?: Record<string, number>,
  portAnchor: PortAnchorMode = "bbox",
): { px: number; py: number; direction: PortDirection } | null {
  const port = ports.find((p) => p.id === portId);
  if (!port) return null;

  const nh = resolveH(node, measuredH);
  const portOffset = PORT_ANCHOR_OUTSIDE_PX / zoom;

  const portsOfDir = ports.filter((p) => p.direction === port.direction);
  const idx = portsOfDir.indexOf(port);
  if (idx < 0) return null;

  const py =
    typeof port.sideT === "number" && Number.isFinite(port.sideT)
      ? node.y + nh * Math.min(1, Math.max(0, port.sideT))
      : node.y + (nh / (portsOfDir.length + 1)) * (idx + 1);
  let px: number;
  if (portAnchor === "inscribed-circle") {
    const r = Math.min(node.w, nh) / 2;
    const cx = node.x + node.w / 2;
    px =
      port.direction === "input"
        ? cx - r - portOffset
        : cx + r + portOffset;
  } else if (typeof portAnchor === "object" && portAnchor.kind === "inset") {
    const inset = portInsetPx(node, portAnchor, port.direction);
    px =
      port.direction === "input"
        ? node.x + inset - portOffset
        : node.x + node.w - inset + portOffset;
  } else {
    px =
      port.direction === "input"
        ? node.x - portOffset
        : node.x + node.w + portOffset;
  }

  return { px, py, direction: port.direction };
}

/**
 * Inner end of the port stub (on the node body) in unrotated coordinates.
 * For `inscribed-circle`, the point lies on the rim toward the outer dot.
 */
export function getPortStubInnerLocal(
  node: SpatialNode,
  direction: PortDirection,
  outerLocal: { x: number; y: number },
  measuredH?: Record<string, number>,
  portAnchor: PortAnchorMode = "bbox",
): { x: number; y: number } {
  const nh = resolveH(node, measuredH);
  if (portAnchor === "bbox") {
    return direction === "input"
      ? { x: node.x, y: outerLocal.y }
      : { x: node.x + node.w, y: outerLocal.y };
  }
  if (typeof portAnchor === "object" && portAnchor.kind === "inset") {
    const inset = portInsetPx(node, portAnchor, direction);
    return direction === "input"
      ? { x: node.x + inset, y: outerLocal.y }
      : { x: node.x + node.w - inset, y: outerLocal.y };
  }
  const r = Math.min(node.w, nh) / 2;
  const cx = node.x + node.w / 2;
  const cy = node.y + nh / 2;
  let dx = outerLocal.x - cx;
  let dy = outerLocal.y - cy;
  let len = Math.hypot(dx, dy);
  if (len < 1e-6) {
    dx = direction === "input" ? -1 : 1;
    dy = 0;
    len = 1;
  }
  return { x: cx + (dx / len) * r, y: cy + (dy / len) * r };
}

/**
 * Compute the canvas-space position of a specific port on a node.
 * Returns `null` if the port ID is not found in the port list.
 */
export function getPortPosition(
  node: SpatialNode,
  ports: PortDefinition[],
  portId: string,
  zoom: number,
  measuredH?: Record<string, number>,
  portAnchor: PortAnchorMode = "bbox",
): { x: number; y: number } | null {
  const outer = getPortOuterLocal(
    node,
    ports,
    portId,
    zoom,
    measuredH,
    portAnchor,
  );
  if (!outer) return null;
  return nodeLocalPointToCanvas(node, outer.px, outer.py, measuredH);
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
