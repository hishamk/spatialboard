import type { SpatialNode, DrawNode, ShapeNode, FrameNode } from "./types";

/** Bounding-box hit-test tolerance in canvas pixels (divided by zoom at call site). */
const HIT_TOLERANCE = 4;

/** Border hit zone thickness for frame nodes (canvas pixels, divided by zoom). */
const FRAME_BORDER_TOLERANCE = 8;

/**
 * Minimum screen-space pick radius for precise geometry (draw/shape).
 * Keeps thin/cartoon strokes selectable even at tiny stroke widths.
 */
const MIN_PRECISE_HIT_RADIUS_PX = 6;

/** Minimum screen-space pick radius for generic bbox node hits. */
const MIN_BOX_HIT_RADIUS_PX = 6;

/** Minimum screen-space frame border hit zone. */
const MIN_FRAME_BORDER_HIT_PX = 10;

/** Extra frame border hit zone when zoomed out. */
const LOW_ZOOM_FRAME_BORDER_HIT_PX = 14;

/** Height of the frame label area above the frame. */
const FRAME_LABEL_HEIGHT = 24;

/**
 * Transform a canvas point into a node's local (unrotated) coordinate space.
 * If the node has no rotation, returns the point unchanged.
 */
export function toLocal(
  node: SpatialNode,
  canvasX: number,
  canvasY: number,
  h: number
): [number, number] {
  if (!node.rotation) return [canvasX, canvasY];
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;
  const θ = (-node.rotation * Math.PI) / 180;
  const cos = Math.cos(θ);
  const sin = Math.sin(θ);
  const dx = canvasX - cx;
  const dy = canvasY - cy;
  return [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
}

function resolveH(node: SpatialNode, measured?: Record<string, number>): number {
  if (node.h !== "auto") return node.h;
  return measured?.[node.id] ?? 100;
}

/**
 * Shortest distance from a canvas point to the boundary of the node's
 * axis-aligned rectangle in local (unrotated) space. Used to prefer edge
 * picks when a connector passes through a full bounding-box hit target.
 */
export function distancePointToBoxNodeBorder(
  node: SpatialNode,
  canvasX: number,
  canvasY: number,
  measuredHeights?: Record<string, number>
): number {
  const h = resolveH(node, measuredHeights);
  const [lx, ly] = toLocal(node, canvasX, canvasY, h);
  const x0 = node.x;
  const y0 = node.y;
  const w = node.w;
  const hh = h;
  const dx = lx < x0 ? x0 - lx : lx > x0 + w ? lx - (x0 + w) : 0;
  const dy = ly < y0 ? y0 - ly : ly > y0 + hh ? ly - (y0 + hh) : 0;
  if (dx === 0 && dy === 0) {
    return Math.min(lx - x0, x0 + w - lx, ly - y0, y0 + hh - ly);
  }
  return Math.hypot(dx, dy);
}

function zoomSafe(zoom: number): number {
  return Math.max(0.01, zoom);
}

function screenPxToCanvas(px: number, zoom: number): number {
  return px / zoomSafe(zoom);
}

export function hitTest(
  nodes: Map<string, SpatialNode>,
  canvasX: number,
  canvasY: number,
  zoom: number = 1,
  measuredHeights?: Record<string, number>,
  containerTypes?: ReadonlySet<string>
): SpatialNode | null {
  const sorted = Array.from(nodes.values())
    .filter((n) => n.type !== "edge")
    .sort((a, b) => b.z - a.z);

  // Track the first frame hit as fallback — prefer non-frame children over
  // their parent frame so that clicking/connecting on a child inside a frame
  // targets the child, not the frame.
  let frameHit: SpatialNode | null = null;
  // Track the first bounding-box-only hit (content/sticky/text/image).
  // If a precise draw/shape hit is found underneath, prefer it.
  let boxHit: SpatialNode | null = null;

  for (const node of sorted) {
    if (node.type === "draw") {
      if (isPointInDrawNode(node as DrawNode, canvasX, canvasY, zoom))
        return node;
    } else if (node.type === "shape") {
      if (isPointInShapeNode(node, canvasX, canvasY, zoom)) return node;
      // Unfilled shapes with labels: also hit on the label text area
      if (!boxHit && (node as ShapeNode).data.label) {
        const h = node.h === "auto" ? 100 : (node.h as number);
        const [lx, ly] = toLocal(node, canvasX, canvasY, h);
        const lr = estimateLabelRect(node, h);
        if (lr && lx >= lr.lx && lx <= lr.rx && ly >= lr.ly && ly <= lr.ry) {
          boxHit = node;
        }
      }
    } else if (containerTypes && containerTypes.has(node.type)) {
      // Frame nodes: only hit on borders and label
      const h = resolveH(node, measuredHeights);
      if (isPointOnFrameBorder(node, canvasX, canvasY, zoom, h)) {
        if (!frameHit) frameHit = node;
      }
    } else {
      const h = resolveH(node, measuredHeights);
      const tolerance = screenPxToCanvas(Math.max(HIT_TOLERANCE, MIN_BOX_HIT_RADIUS_PX), zoom);
      const [lx, ly] = toLocal(node, canvasX, canvasY, h);
      if (
        lx >= node.x - tolerance &&
        lx <= node.x + node.w + tolerance &&
        ly >= node.y - tolerance &&
        ly <= node.y + h + tolerance
      ) {
        if (!boxHit) {
          // Save but keep looking for a precise draw/shape hit underneath
          boxHit = node;
        }
      }
    }
  }
  return boxHit ?? frameHit;
}

/** Hit test for frame nodes — only borders and label area count as hits. */
function isPointOnFrameBorder(
  node: SpatialNode,
  canvasX: number,
  canvasY: number,
  zoom: number,
  measuredH?: number,
): boolean {
  const h = measuredH ?? (node.h === "auto" ? 100 : (node.h as number));
  const [lx, ly] = toLocal(node, canvasX, canvasY, h);
  const minFrameHitPx = zoom < 0.8 ? LOW_ZOOM_FRAME_BORDER_HIT_PX : MIN_FRAME_BORDER_HIT_PX;
  const tol = screenPxToCanvas(Math.max(FRAME_BORDER_TOLERANCE, minFrameHitPx), zoom);

  // Check label area above the frame
  const frameData = (node as FrameNode).data;
  if (frameData.label) {
    if (
      lx >= node.x &&
      lx <= node.x + node.w &&
      ly >= node.y - FRAME_LABEL_HEIGHT &&
      ly <= node.y
    ) {
      return true;
    }
  }

  // Quick bounding-box reject (with tolerance for borders)
  if (
    lx < node.x - tol || lx > node.x + node.w + tol ||
    ly < node.y - tol || ly > node.y + h + tol
  ) {
    return false;
  }

  // Near any of the 4 edges
  const dLeft = Math.abs(lx - node.x);
  const dRight = Math.abs(lx - (node.x + node.w));
  const dTop = Math.abs(ly - node.y);
  const dBottom = Math.abs(ly - (node.y + h));
  const inXRange = lx >= node.x - tol && lx <= node.x + node.w + tol;
  const inYRange = ly >= node.y - tol && ly <= node.y + h + tol;
  return (
    (inYRange && (dLeft <= tol || dRight <= tol)) ||
    (inXRange && (dTop <= tol || dBottom <= tol))
  );
}

/** Squared distance from point (px,py) to line segment (ax,ay)-(bx,by) */
function sqDistToSegment(
  px: number, py: number,
  ax: number, ay: number,
  bx: number, by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return (px - ax) ** 2 + (py - ay) ** 2;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lenSq));
  const projX = ax + t * dx;
  const projY = ay + t * dy;
  return (px - projX) ** 2 + (py - projY) ** 2;
}

/** Estimate the bounding rect of a shape's label text (centered in the shape).
 *  Returns null if there is no label. Uses rough char-width estimation. */
function estimateLabelRect(
  node: SpatialNode,
  h: number
): { lx: number; ly: number; rx: number; ry: number } | null {
  const shape = (node as ShapeNode).data;
  if (!shape.label) return null;
  const fontSize = shape.labelFontSize ?? 14;
  const lineHeight = fontSize * 1.3;
  const charWidth = fontSize * 0.55; // approximate for Excalifont
  const padX = 12; // horizontal padding from the overlay
  const maxTextW = node.w - padX * 2;
  // Estimate wrapped line count
  const rawLines = shape.label.split("\n");
  let totalLines = 0;
  for (const raw of rawLines) {
    const lineW = raw.length * charWidth;
    totalLines += Math.max(1, Math.ceil(lineW / Math.max(maxTextW, 1)));
  }
  const textH = totalLines * lineHeight;
  const textW = Math.min(maxTextW, Math.max(...rawLines.map((l) => l.length)) * charWidth);
  const cx = node.x + node.w / 2;
  const cy = node.y + h / 2;
  return {
    lx: cx - textW / 2 - 4,
    ly: cy - textH / 2 - 4,
    rx: cx + textW / 2 + 4,
    ry: cy + textH / 2 + 4,
  };
}

/** Precise hit test for shape nodes — checks actual geometry, not just bounding box.
 *  When `interior` is true, the interior of closed shapes (rect/ellipse/diamond)
 *  counts as a hit even when the shape has no fill. */
export function isPointInShapeNode(
  node: SpatialNode,
  canvasX: number,
  canvasY: number,
  zoom: number,
  interior?: boolean
): boolean {
  const h = node.h === "auto" ? 100 : (node.h as number);
  const [lx, ly] = toLocal(node, canvasX, canvasY, h);
  const shape = (node as ShapeNode).data;
  const sw = shape.strokeWidth ?? 2;
  const tol = screenPxToCanvas(Math.max(sw / 2, MIN_PRECISE_HIT_RADIUS_PX), zoom);
  const treatAsFilled = !!shape.fill || !!interior;

  switch (shape.shape) {
    case "rect": {
      if (treatAsFilled) {
        // Inside the rectangle (with tolerance for border)
        return (
          lx >= node.x - tol && lx <= node.x + node.w + tol &&
          ly >= node.y - tol && ly <= node.y + h + tol
        );
      }
      // Stroke only — near any of the 4 edges
      const dLeft = Math.abs(lx - node.x);
      const dRight = Math.abs(lx - (node.x + node.w));
      const dTop = Math.abs(ly - node.y);
      const dBottom = Math.abs(ly - (node.y + h));
      const inXRange = lx >= node.x - tol && lx <= node.x + node.w + tol;
      const inYRange = ly >= node.y - tol && ly <= node.y + h + tol;
      return (
        (inYRange && (dLeft <= tol || dRight <= tol)) ||
        (inXRange && (dTop <= tol || dBottom <= tol))
      );
    }
    case "ellipse": {
      const cx = node.x + node.w / 2;
      const cy = node.y + h / 2;
      const rx = node.w / 2;
      const ry = h / 2;
      if (rx === 0 || ry === 0) return false;
      const nx = (lx - cx) / rx;
      const ny = (ly - cy) / ry;
      const dist = nx * nx + ny * ny; // 1.0 = on the ellipse
      if (treatAsFilled) {
        // Inside ellipse (with tolerance)
        const outer = ((rx + tol) / rx) ** 2;
        return dist <= outer;
      }
      // Stroke only — near the ellipse border
      const tolNorm = tol / Math.min(rx, ry);
      return Math.abs(Math.sqrt(dist) - 1) <= tolNorm;
    }
    case "diamond": {
      const cx = node.x + node.w / 2;
      const cy = node.y + h / 2;
      const halfW = node.w / 2;
      const halfH = h / 2;
      if (halfW === 0 || halfH === 0) return false;
      // Diamond = |dx/halfW| + |dy/halfH| <= 1
      const ndx = Math.abs(lx - cx) / halfW;
      const ndy = Math.abs(ly - cy) / halfH;
      const manhattan = ndx + ndy;
      if (treatAsFilled) {
        const tolNorm = tol / Math.min(halfW, halfH);
        return manhattan <= 1 + tolNorm;
      }
      const tolNorm = tol / Math.min(halfW, halfH);
      return Math.abs(manhattan - 1) <= tolNorm;
    }
    case "line":
    case "arrow": {
      const sp = shape.startPoint ?? [0, 0];
      const ep = shape.endPoint ?? [node.w, h];
      const ax = node.x + sp[0];
      const ay = node.y + sp[1];
      const bx = node.x + ep[0];
      const by = node.y + ep[1];
      return sqDistToSegment(lx, ly, ax, ay, bx, by) <= tol * tol;
    }
    default: {
      // Fallback: bounding box
      return (
        lx >= node.x - tol && lx <= node.x + node.w + tol &&
        ly >= node.y - tol && ly <= node.y + h + tol
      );
    }
  }
}

/** Ray-casting point-in-polygon test for closed draw strokes */
function isPointInPolygon(
  px: number,
  py: number,
  pts: Array<[number, number, number]>
): boolean {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i][0], yi = pts[i][1];
    const xj = pts[j][0], yj = pts[j][1];
    if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/** Precise hit test for draw strokes — checks proximity to actual stroke path */
export function isPointInDrawNode(
  node: DrawNode,
  canvasX: number,
  canvasY: number,
  zoom: number
): boolean {
  const sw = node.data.strokeWidth;
  const tol = screenPxToCanvas(Math.max(sw / 2, MIN_PRECISE_HIT_RADIUS_PX), zoom);
  const tolSq = tol * tol;
  const h = node.h === "auto" ? 100 : (node.h as number);
  const [lx, ly] = toLocal(node, canvasX, canvasY, h);

  // Quick bounding-box reject
  if (
    lx < node.x - tol || lx > node.x + node.w + tol ||
    ly < node.y - tol || ly > node.y + h + tol
  ) {
    return false;
  }

  const pts = node.data.points;
  if (!pts || pts.length === 0) return false;

  // Points are stored relative to node origin — convert click to local space
  const localX = lx - node.x;
  const localY = ly - node.y;

  // Single point — distance check
  if (pts.length === 1) {
    const dx = localX - pts[0][0];
    const dy = localY - pts[0][1];
    return dx * dx + dy * dy <= tolSq;
  }

  // If the draw has a fill, check if the point is inside the polygon
  if (node.data.fill && pts.length >= 3) {
    if (isPointInPolygon(localX, localY, pts)) {
      return true;
    }
  }

  // Check distance to each segment of the stroke polyline
  for (let i = 0; i < pts.length - 1; i++) {
    if (sqDistToSegment(localX, localY, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]) <= tolSq) {
      return true;
    }
  }
  return false;
}

/** Returns all nodes at a point, sorted with precise geometry hits
 *  (draw/shape) before bounding-box-only hits (content/sticky/text/image). */
export function hitTestAll(
  nodes: Map<string, SpatialNode>,
  canvasX: number,
  canvasY: number,
  zoom: number = 1,
  measuredHeights?: Record<string, number>,
  containerTypes?: ReadonlySet<string>
): SpatialNode[] {
  const sorted = Array.from(nodes.values())
    .filter((n) => n.type !== "edge")
    .sort((a, b) => b.z - a.z);

  const preciseHits: SpatialNode[] = [];
  const boxHits: SpatialNode[] = [];
  for (const node of sorted) {
    if (node.type === "draw") {
      if (isPointInDrawNode(node as DrawNode, canvasX, canvasY, zoom))
        preciseHits.push(node);
    } else if (node.type === "shape") {
      if (isPointInShapeNode(node, canvasX, canvasY, zoom)) {
        preciseHits.push(node);
      } else if ((node as ShapeNode).data.label) {
        const h = node.h === "auto" ? 100 : (node.h as number);
        const [lx, ly] = toLocal(node, canvasX, canvasY, h);
        const lr = estimateLabelRect(node, h);
        if (lr && lx >= lr.lx && lx <= lr.rx && ly >= lr.ly && ly <= lr.ry) {
          boxHits.push(node);
        }
      }
    } else if (containerTypes && containerTypes.has(node.type)) {
      // Frame nodes: only hit on borders and label
      const h = resolveH(node, measuredHeights);
      if (isPointOnFrameBorder(node, canvasX, canvasY, zoom, h)) {
        boxHits.push(node);
      }
    } else {
      const h = resolveH(node, measuredHeights);
      const tolerance = screenPxToCanvas(Math.max(HIT_TOLERANCE, MIN_BOX_HIT_RADIUS_PX), zoom);
      const [lx, ly] = toLocal(node, canvasX, canvasY, h);
      if (
        lx >= node.x - tolerance &&
        lx <= node.x + node.w + tolerance &&
        ly >= node.y - tolerance &&
        ly <= node.y + h + tolerance
      ) {
        boxHits.push(node);
      }
    }
  }
  // Precise geometry hits first, then bounding-box hits
  return [...preciseHits, ...boxHits];
}

const GRID_CELL = 250;
const GRID_MIN_NODES = 80;
const GRID_RECT_RATIO = 0.3; // use grid when rect area < 30% of extent

function getNodesInRectGrid(
  nodes: Map<string, SpatialNode>,
  rect: { x: number; y: number; w: number; h: number }
): SpatialNode[] {
  const grid = new Map<string, SpatialNode[]>();
  for (const node of nodes.values()) {
    if (node.type === "edge") continue;
    const h = node.h === "auto" ? 100 : (node.h as number);
    const maxX = node.x + node.w;
    const maxY = node.y + h;
    const cminX = Math.floor(node.x / GRID_CELL);
    const cminY = Math.floor(node.y / GRID_CELL);
    const cmaxX = Math.floor(maxX / GRID_CELL);
    const cmaxY = Math.floor(maxY / GRID_CELL);
    for (let cx = cminX; cx <= cmaxX; cx++) {
      for (let cy = cminY; cy <= cmaxY; cy++) {
        const k = `${cx},${cy}`;
        const list = grid.get(k) ?? [];
        list.push(node);
        grid.set(k, list);
      }
    }
  }
  const cminX = Math.floor(rect.x / GRID_CELL);
  const cminY = Math.floor(rect.y / GRID_CELL);
  const cmaxX = Math.floor((rect.x + rect.w) / GRID_CELL);
  const cmaxY = Math.floor((rect.y + rect.h) / GRID_CELL);
  const seen = new Set<string>();
  const results: SpatialNode[] = [];
  for (let cx = cminX; cx <= cmaxX; cx++) {
    for (let cy = cminY; cy <= cmaxY; cy++) {
      const list = grid.get(`${cx},${cy}`) ?? [];
      for (const node of list) {
        if (seen.has(node.id)) continue;
        seen.add(node.id);
        const h = node.h === "auto" ? 100 : (node.h as number);
        if (
          node.x < rect.x + rect.w &&
          node.x + node.w > rect.x &&
          node.y < rect.y + rect.h &&
          node.y + h > rect.y
        ) {
          results.push(node);
        }
      }
    }
  }
  return results;
}

export function getNodesInRect(
  nodes: Map<string, SpatialNode>,
  rect: { x: number; y: number; w: number; h: number }
): SpatialNode[] {
  const n = nodes.size;
  if (n < GRID_MIN_NODES) {
    return Array.from(nodes.values()).filter((node) => {
      const h = node.h === "auto" ? 100 : node.h;
      return (
        node.x < rect.x + rect.w &&
        node.x + node.w > rect.x &&
        node.y < rect.y + rect.h &&
        node.y + h > rect.y
      );
    });
  }
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const node of nodes.values()) {
    if (node.type === "edge") continue;
    const h = node.h === "auto" ? 100 : (node.h as number);
    minX = Math.min(minX, node.x);
    minY = Math.min(minY, node.y);
    maxX = Math.max(maxX, node.x + node.w);
    maxY = Math.max(maxY, node.y + h);
  }
  if (minX === Infinity) {
    return Array.from(nodes.values()).filter((node) => {
      const h = node.h === "auto" ? 100 : node.h;
      return (
        node.x < rect.x + rect.w &&
        node.x + node.w > rect.x &&
        node.y < rect.y + rect.h &&
        node.y + h > rect.y
      );
    });
  }
  const extentW = maxX - minX || 1;
  const extentH = maxY - minY || 1;
  const rectArea = rect.w * rect.h;
  const extentArea = extentW * extentH;
  if (rectArea < extentArea * GRID_RECT_RATIO) {
    return getNodesInRectGrid(nodes, rect);
  }
  return Array.from(nodes.values()).filter((node) => {
    const h = node.h === "auto" ? 100 : node.h;
    return (
      node.x < rect.x + rect.w &&
      node.x + node.w > rect.x &&
      node.y < rect.y + rect.h &&
      node.y + h > rect.y
    );
  });
}
