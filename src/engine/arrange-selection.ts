import type { SpatialNode, EdgeNode } from "./types";
import type { NodeTypeRegistry } from "../nodes/registry";
import { resolveNodePorts } from "../nodes/registry";
import { nodeShowsEdgeComputeOverlay } from "./data-flow-types";
import {
  computeEdgePath,
  getPortPosition,
  PORT_ANCHOR_OUTSIDE_PX,
} from "./edge-geometry";

/** Height for layout (uses measured DOM height when `h === "auto"`). */
export function arrangeNodeHeight(
  n: SpatialNode,
  measured?: Record<string, number>,
): number {
  if (n.h === "auto") return measured?.[n.id] ?? 100;
  return n.h as number;
}

interface InternalEdge {
  from: string;
  to: string;
}

interface BBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

function isDAG(nodeIds: string[], edges: InternalEdge[]): boolean {
  const ids = new Set(nodeIds);
  const indeg = new Map<string, number>();
  const adj = new Map<string, string[]>();
  for (const id of nodeIds) {
    indeg.set(id, 0);
    adj.set(id, []);
  }
  for (const { from, to } of edges) {
    if (!ids.has(from) || !ids.has(to)) continue;
    adj.get(from)!.push(to);
    indeg.set(to, (indeg.get(to) ?? 0) + 1);
  }
  const q = nodeIds.filter((id) => (indeg.get(id) ?? 0) === 0);
  let seen = 0;
  while (q.length) {
    const u = q.pop()!;
    seen++;
    for (const v of adj.get(u) ?? []) {
      const nv = (indeg.get(v) ?? 0) - 1;
      indeg.set(v, nv);
      if (nv === 0) q.push(v);
    }
  }
  return seen === nodeIds.length;
}

function weaklyConnectedComponents(
  nodeIds: string[],
  edges: InternalEdge[],
): string[][] {
  const ids = new Set(nodeIds);
  const adj = new Map<string, Set<string>>();
  for (const id of nodeIds) adj.set(id, new Set());
  for (const { from, to } of edges) {
    if (ids.has(from) && ids.has(to)) {
      adj.get(from)!.add(to);
      adj.get(to)!.add(from);
    }
  }
  const visited = new Set<string>();
  const comps: string[][] = [];
  for (const start of [...nodeIds].sort()) {
    if (visited.has(start)) continue;
    const stack = [start];
    visited.add(start);
    const comp: string[] = [];
    while (stack.length) {
      const u = stack.pop()!;
      comp.push(u);
      for (const v of adj.get(u) ?? []) {
        if (!visited.has(v)) {
          visited.add(v);
          stack.push(v);
        }
      }
    }
    comps.push(comp);
  }
  return comps;
}

function collectInternalEdgeNodes(
  allNodes: SpatialNode[],
  arrangeableIds: Set<string>,
): EdgeNode[] {
  const out: EdgeNode[] = [];
  for (const n of allNodes) {
    if (n.type !== "edge") continue;
    const e = n as EdgeNode;
    const { fromId, toId } = e.data;
    if (arrangeableIds.has(fromId) && arrangeableIds.has(toId)) {
      out.push(e);
    }
  }
  return out;
}

function internalEdgesFromWires(wires: EdgeNode[]): InternalEdge[] {
  return wires.map((w) => ({
    from: w.data.fromId,
    to: w.data.toId,
  }));
}

function gridLayoutPositions(
  members: SpatialNode[],
  measured: Record<string, number> | undefined,
  gapX: number,
  gapY: number,
): Map<string, { x: number; y: number }> {
  const sorted = [...members].sort((a, b) =>
    a.y === b.y ? a.x - b.x : a.y - b.y,
  );
  const n = sorted.length;
  if (n === 0) return new Map();
  const cols = Math.max(1, Math.ceil(Math.sqrt(n)));
  const maxW = Math.max(1, ...sorted.map((x) => x.w));
  const maxH = Math.max(
    1,
    ...sorted.map((x) => arrangeNodeHeight(x, measured)),
  );
  const cellW = maxW + gapX;
  const cellH = maxH + gapY;
  const pos = new Map<string, { x: number; y: number }>();
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    pos.set(sorted[i].id, { x: col * cellW, y: row * cellH });
  }
  return pos;
}

function longestPathLayers(
  nodeIds: string[],
  edges: InternalEdge[],
): Map<string, number> {
  const layer = new Map<string, number>();
  for (const id of nodeIds) layer.set(id, 0);
  const iters = Math.max(nodeIds.length, edges.length) + 2;
  for (let i = 0; i < iters; i++) {
    for (const { from, to } of edges) {
      layer.set(to, Math.max(layer.get(to)!, layer.get(from)! + 1));
    }
  }
  return layer;
}

function orderLayerByBarycenter(
  layer: string[],
  neighborLayer: string[],
  edges: InternalEdge[],
  mode: "backward" | "forward",
): string[] {
  if (neighborLayer.length === 0) return [...layer];
  const index = new Map(neighborLayer.map((id, i) => [id, i]));
  const scored = layer.map((id) => {
    let sum = 0;
    let cnt = 0;
    for (const { from, to } of edges) {
      if (mode === "backward") {
        if (to === id && index.has(from)) {
          sum += index.get(from)!;
          cnt++;
        }
      } else if (from === id && index.has(to)) {
        sum += index.get(to)!;
        cnt++;
      }
    }
    return { id, score: cnt > 0 ? sum / cnt : 1e9 };
  });
  scored.sort((a, b) => a.score - b.score || a.id.localeCompare(b.id));
  return scored.map((s) => s.id);
}

function layeredLayoutPositions(
  members: SpatialNode[],
  internalEdges: InternalEdge[],
  measured: Record<string, number> | undefined,
  gapX: number,
  gapY: number,
): Map<string, { x: number; y: number }> {
  const ids = members.map((m) => m.id);
  const idSet = new Set(ids);
  const edges = internalEdges.filter(
    (e) => idSet.has(e.from) && idSet.has(e.to),
  );
  const layerMap = longestPathLayers(ids, edges);
  const maxL = Math.max(0, ...ids.map((id) => layerMap.get(id) ?? 0));
  const layers: string[][] = [];
  for (let L = 0; L <= maxL; L++) layers[L] = [];
  for (const id of ids) {
    const L = layerMap.get(id) ?? 0;
    layers[L].push(id);
  }
  const nodeById = new Map(members.map((n) => [n.id, n]));
  for (let L = 0; L <= maxL; L++) {
    layers[L].sort((a, b) => {
      const na = nodeById.get(a)!;
      const nb = nodeById.get(b)!;
      return na.y - nb.y || na.x - nb.x;
    });
  }
  for (let iter = 0; iter < 2; iter++) {
    for (let L = 1; L <= maxL; L++) {
      layers[L] = orderLayerByBarycenter(
        layers[L],
        layers[L - 1],
        edges,
        "backward",
      );
    }
    for (let L = maxL - 1; L >= 0; L--) {
      layers[L] = orderLayerByBarycenter(
        layers[L],
        layers[L + 1],
        edges,
        "forward",
      );
    }
  }
  const pos = new Map<string, { x: number; y: number }>();
  let xCursor = 0;
  for (let L = 0; L <= maxL; L++) {
    const row = layers[L];
    const maxWi = Math.max(1, ...row.map((id) => nodeById.get(id)!.w));
    let yCursor = 0;
    for (const id of row) {
      const node = nodeById.get(id)!;
      pos.set(id, { x: xCursor, y: yCursor });
      yCursor += arrangeNodeHeight(node, measured) + gapY;
    }
    xCursor += maxWi + gapX;
  }
  return pos;
}

function bboxOf(
  positions: Map<string, { x: number; y: number }>,
  members: SpatialNode[],
  measured: Record<string, number> | undefined,
): { minX: number; minY: number; maxX: number; maxY: number } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const nodeById = new Map(members.map((n) => [n.id, n]));
  for (const [id, p] of positions) {
    const n = nodeById.get(id);
    if (!n) continue;
    const h = arrangeNodeHeight(n, measured);
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x + n.w);
    maxY = Math.max(maxY, p.y + h);
  }
  if (!Number.isFinite(minX)) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }
  return { minX, minY, maxX, maxY };
}

function normalizePositions(
  positions: Map<string, { x: number; y: number }>,
  members: SpatialNode[],
  measured: Record<string, number> | undefined,
): Map<string, { x: number; y: number }> {
  const b = bboxOf(positions, members, measured);
  const dx = -b.minX;
  const dy = -b.minY;
  const next = new Map<string, { x: number; y: number }>();
  for (const [id, p] of positions) {
    next.set(id, { x: p.x + dx, y: p.y + dy });
  }
  return next;
}

/** Smallest axis-aligned move to separate box A from B (push A away from B). */
function mtvMoveAOutOfB(a: BBox, b: BBox): { dx: number; dy: number } | null {
  const acx = a.x + a.w / 2;
  const acy = a.y + a.h / 2;
  const bcx = b.x + b.w / 2;
  const bcy = b.y + b.h / 2;
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
  if (ox <= 0 || oy <= 0) return null;
  if (ox < oy) {
    return acx < bcx ? { dx: -ox, dy: 0 } : { dx: ox, dy: 0 };
  }
  return acy < bcy ? { dx: 0, dy: -oy } : { dx: 0, dy: oy };
}

function nodeBBoxAt(
  n: SpatialNode,
  pos: { x: number; y: number },
  measured: Record<string, number> | undefined,
): BBox {
  return {
    x: pos.x,
    y: pos.y,
    w: n.w,
    h: arrangeNodeHeight(n, measured),
  };
}

/** Wider box so port dots / labels outside the node rect are separated too. */
function nodeBBoxAtLayout(
  n: SpatialNode,
  pos: { x: number; y: number },
  measured: Record<string, number> | undefined,
  registry: NodeTypeRegistry | undefined,
  zoom: number,
): BBox {
  const h = arrangeNodeHeight(n, measured);
  let padL = 0;
  let padR = 0;
  const def = registry?.get(n.type);
  const ports = resolveNodePorts(def, n);
  if (ports?.length) {
    const pad = (PORT_ANCHOR_OUTSIDE_PX + 12) / Math.max(0.35, zoom);
    if (ports.some((p) => p.direction === "input")) padL = pad;
    if (ports.some((p) => p.direction === "output")) padR = pad;
  }
  return {
    x: pos.x - padL,
    y: pos.y,
    w: n.w + padL + padR,
    h,
  };
}

/** Push nodes whose centers sit on top of each other (common in pasted graphs). */
function unwrapCoincidentNodes(
  positions: Map<string, { x: number; y: number }>,
  members: SpatialNode[],
  measured: Record<string, number> | undefined,
  zoom: number,
): void {
  const minCenter = 14 + 10 / Math.max(0.35, zoom);
  for (let round = 0; round < 40; round++) {
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const a = members[i];
        const b = members[j];
        const pa = positions.get(a.id)!;
        const pb = positions.get(b.id)!;
        const ha = arrangeNodeHeight(a, measured);
        const hb = arrangeNodeHeight(b, measured);
        const cax = pa.x + a.w / 2;
        const cay = pa.y + ha / 2;
        const cbx = pb.x + b.w / 2;
        const cby = pb.y + hb / 2;
        let dx = cax - cbx;
        let dy = cay - cby;
        let d = Math.hypot(dx, dy);
        if (d >= minCenter) continue;
        if (d < 1e-4) {
          const ang = (i * 2.17 + j * 3.91 + round * 0.37) % (Math.PI * 2);
          dx = Math.cos(ang);
          dy = Math.sin(ang);
          d = 0;
        } else {
          dx /= d;
          dy /= d;
        }
        const push = (minCenter - d) * 0.62 + 6 / Math.max(0.35, zoom);
        pa.x += dx * push;
        pa.y += dy * push;
        pb.x -= dx * push;
        pb.y -= dy * push;
      }
    }
  }
}

/** Offset badge center perpendicular to the chord between node centers (reduces stacked labels on merged wires). */
function labelStaggerOffset(
  fromN: SpatialNode,
  toN: SpatialNode,
  measured: Record<string, number> | undefined,
  staggerIdx: number,
  zoom: number,
): { dx: number; dy: number } {
  const hf = arrangeNodeHeight(fromN, measured);
  const ht = arrangeNodeHeight(toN, measured);
  const fcx = fromN.x + fromN.w / 2;
  const fcy = fromN.y + hf / 2;
  const tcx = toN.x + toN.w / 2;
  const tcy = toN.y + ht / 2;
  let ex = tcx - fcx;
  let ey = tcy - fcy;
  let len = Math.hypot(ex, ey);
  if (len < 1e-4) {
    ex = 1;
    ey = 0;
    len = 1;
  }
  const nx = -ey / len;
  const ny = ex / len;
  const band = Math.floor(staggerIdx / 2) + 1;
  const sign = staggerIdx % 2 === 0 ? 1 : -1;
  const mag =
    sign * (18 / Math.max(0.35, zoom)) * Math.min(3, band) * (1 + band * 0.12);
  return { dx: nx * mag, dy: ny * mag };
}

function measureLabelLinesBox(
  lines: { text: string }[],
  labelX: number,
  labelY: number,
  zoom: number,
  /** Extra horizontal pad on the right (e.g. (!) badge) in canvas units at zoom 1. */
  extraWRight = 0,
): BBox {
  const lh = 13 / zoom;
  const padX = 7 / zoom;
  const padY = 5 / zoom;
  const charW = 6 / zoom;
  const maxChars = Math.max(...lines.map((l) => l.text.length), 1);
  const w =
    Math.min(maxChars * charW + padX * 2, 280 / zoom) + extraWRight;
  const h = lines.length * lh + padY * 2;
  return {
    x: labelX - w / 2,
    y: labelY - h / 2,
    w,
    h,
  };
}

function estimateWireLabelBBox(
  fromN: SpatialNode,
  toN: SpatialNode,
  edge: EdgeNode,
  registry: NodeTypeRegistry | undefined,
  measured: Record<string, number> | undefined,
  zoom: number,
): BBox | null {
  const d = edge.data;

  const path = computeEdgePath(
    fromN,
    toN,
    d.edgeType ?? "bezier",
    measured,
    d.sourceHandle,
    d.targetHandle,
    d.midpointOffset,
    d.curveOffset,
    (() => {
      if (!d.sourcePort || !registry) return undefined;
      const def = registry.get(fromN.type);
      const ports = resolveNodePorts(def, fromN);
      if (!ports) return undefined;
      return getPortPosition(
          fromN,
          ports,
          d.sourcePort,
          zoom,
          measured,
          def!.portAnchor ?? "bbox",
        ) ?? undefined;
    })(),
    (() => {
      if (!d.targetPort || !registry) return undefined;
      const def = registry.get(toN.type);
      const ports = resolveNodePorts(def, toN);
      if (!ports) return undefined;
      return getPortPosition(
          toN,
          ports,
          d.targetPort,
          zoom,
          measured,
          def!.portAnchor ?? "bbox",
        ) ?? undefined;
    })(),
    d.sourceT,
    d.targetT,
    d.attachmentGap,
  );

  const lx = path.labelX;
  const ly = path.labelY;

  if (d.sourcePort && d.targetPort) {
    const user = d.label?.trim();
    if (!nodeShowsEdgeComputeOverlay(toN)) {
      if (!user) return null;
      return measureLabelLinesBox([{ text: user }], lx, ly, zoom, 0);
    }
    const lines: { text: string }[] = [];
    if (user) lines.push({ text: user });
    lines.push({
      text: `${d.sourcePort} \u2192 ${d.targetPort}`,
    });
    // Reserve height for compute line when target opts in (matches worst case in SVGLayer).
    lines.push({ text: "compute 999 ms" });
    const badgePad = 9 / zoom;
    return measureLabelLinesBox(
      lines,
      lx,
      ly,
      zoom,
      badgePad * 2 + 6 / zoom,
    );
  }

  const user = d.label?.trim();
  if (!user) return null;
  return measureLabelLinesBox(
    [{ text: user }],
    lx,
    ly,
    zoom,
    0,
  );
}

/** Nudge rect for label–label separation only (on-canvas badges stay at true midpoint). */
function bboxWithLabelStagger(
  rect: BBox,
  fromN: SpatialNode,
  toN: SpatialNode,
  measured: Record<string, number> | undefined,
  staggerIdx: number,
  zoom: number,
): BBox {
  const o = labelStaggerOffset(fromN, toN, measured, staggerIdx, zoom);
  return { ...rect, x: rect.x + o.dx, y: rect.y + o.dy };
}

function clampVec(v: { x: number; y: number }, max: number): void {
  const len = Math.hypot(v.x, v.y);
  if (len > max && len > 1e-9) {
    const s = max / len;
    v.x *= s;
    v.y *= s;
  }
}

/**
 * Iteratively push nodes apart so bounding boxes and estimated wire label badges
 * overlap less (node-node, label-node, label-label).
 */
function sortWiresStable(wires: EdgeNode[]): EdgeNode[] {
  return [...wires].sort(
    (a, b) =>
      a.data.fromId.localeCompare(b.data.fromId) ||
      a.data.toId.localeCompare(b.data.toId) ||
      a.id.localeCompare(b.id),
  );
}

function refineLayoutOverlap(
  positions: Map<string, { x: number; y: number }>,
  members: SpatialNode[],
  wires: EdgeNode[],
  registry: NodeTypeRegistry | undefined,
  measured: Record<string, number> | undefined,
  zoom: number,
): void {
  if (members.length < 2) return;

  const byId = new Map(members.map((m) => [m.id, m]));
  const memberIds = new Set(members.map((m) => m.id));
  const iterations = 78;
  const accumAdd = (id: string, dx: number, dy: number, map: Map<string, { x: number; y: number }>) => {
    const o = map.get(id) ?? { x: 0, y: 0 };
    o.x += dx;
    o.y += dy;
    map.set(id, o);
  };

  const zEff = Math.max(0.35, zoom);

  for (let iter = 0; iter < iterations; iter++) {
    const acc = new Map<string, { x: number; y: number }>();
    const damp = 0.36 + iter * 0.009;
    const maxStep = 34;

    const placed = (id: string): SpatialNode => {
      const n0 = byId.get(id)!;
      const p = positions.get(id)!;
      return { ...n0, x: p.x, y: p.y };
    };

    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const a = members[i];
        const b = members[j];
        const boxA = nodeBBoxAtLayout(
          a,
          positions.get(a.id)!,
          measured,
          registry,
          zEff,
        );
        const boxB = nodeBBoxAtLayout(
          b,
          positions.get(b.id)!,
          measured,
          registry,
          zEff,
        );
        const sep = mtvMoveAOutOfB(boxA, boxB);
        if (!sep) continue;
        const boost = 1.08 + (iter < 24 ? 0.12 : 0);
        const hx = sep.dx * 0.5 * boost;
        const hy = sep.dy * 0.5 * boost;
        accumAdd(a.id, hx, hy, acc);
        accumAdd(b.id, -hx, -hy, acc);
      }
    }

    const labelInfos: Array<{
      rect: BBox;
      fromId: string;
      toId: string;
      idx: number;
    }> = [];

    const sortedWires = sortWiresStable(wires);
    let li = 0;
    for (const edge of sortedWires) {
      const { fromId, toId } = edge.data;
      if (!memberIds.has(fromId) || !memberIds.has(toId)) continue;
      const rect = estimateWireLabelBBox(
        placed(fromId),
        placed(toId),
        edge,
        registry,
        measured,
        zoom,
      );
      if (rect) labelInfos.push({ rect, fromId, toId, idx: li++ });
    }

    for (const { rect, fromId, toId } of labelInfos) {
      for (const n of members) {
        const nb = nodeBBoxAtLayout(
          n,
          positions.get(n.id)!,
          measured,
          registry,
          zEff,
        );
        const mtv = mtvMoveAOutOfB(rect, nb);
        if (!mtv) continue;
        const k = n.id === fromId || n.id === toId ? 0.58 : 0.44;
        accumAdd(fromId, mtv.dx * k, mtv.dy * k, acc);
        accumAdd(toId, mtv.dx * k, mtv.dy * k, acc);
        if (n.id !== fromId && n.id !== toId) {
          accumAdd(n.id, -mtv.dx * k * 0.9, -mtv.dy * k * 0.9, acc);
        }
      }
    }

    for (let i = 0; i < labelInfos.length; i++) {
      for (let j = i + 1; j < labelInfos.length; j++) {
        const A = labelInfos[i];
        const B = labelInfos[j];
        const ra = bboxWithLabelStagger(
          A.rect,
          placed(A.fromId),
          placed(A.toId),
          measured,
          A.idx * 2,
          zoom,
        );
        const rb = bboxWithLabelStagger(
          B.rect,
          placed(B.fromId),
          placed(B.toId),
          measured,
          B.idx * 2 + 1,
          zoom,
        );
        let sep = mtvMoveAOutOfB(ra, rb);
        if (!sep) {
          const acx = ra.x + ra.w / 2;
          const acy = ra.y + ra.h / 2;
          const bcx = rb.x + rb.w / 2;
          const bcy = rb.y + rb.h / 2;
          let dx = acx - bcx;
          let dy = acy - bcy;
          let len = Math.hypot(dx, dy);
          if (len < 1e-4) {
            const ang = (i * 1.7 + j * 2.3 + iter * 0.11) % (Math.PI * 2);
            dx = Math.cos(ang);
            dy = Math.sin(ang);
            len = 1;
          } else {
            dx /= len;
            dy /= len;
          }
          sep = { dx: dx * 14, dy: dy * 14 };
        }
        const k = 0.5 + (iter < 30 ? 0.12 : 0);
        const sx = sep.dx * k;
        const sy = sep.dy * k;
        accumAdd(A.fromId, sx, sy, acc);
        accumAdd(A.toId, sx, sy, acc);
        accumAdd(B.fromId, -sx, -sy, acc);
        accumAdd(B.toId, -sx, -sy, acc);
      }
    }

    for (const [id, d] of acc) {
      const v = { x: d.x * damp, y: d.y * damp };
      clampVec(v, maxStep);
      const p = positions.get(id);
      if (p) {
        p.x += v.x;
        p.y += v.y;
      }
    }

    if (iter === 20 || iter === 45) {
      unwrapCoincidentNodes(positions, members, measured, zoom);
    }
  }
}

/**
 * Compute new top-left positions for a multi-node selection.
 *
 * - Splits the selection into weakly connected components (via edges with both
 *   endpoints selected).
 * - Per component: if edges form a DAG, uses left-to-right layers (longest-path
 *   rank) with two rounds of barycenter ordering to reduce crossings; otherwise a
 *   reading-order sqrt(n) grid.
 * - Extra spacing when port wires exist; then overlap refinement using real edge
 *   geometry + estimated dataflow label badges (`registry` + `labelZoom`).
 * - Packs components left-to-right; preserves the selection's overall top-left
 *   anchor so nothing jumps off-canvas arbitrarily.
 */
export function computeSelectionArrangement(
  allNodes: SpatialNode[],
  selectedIds: ReadonlySet<string>,
  measuredHeights?: Record<string, number>,
  gridSize?: number,
  registry?: NodeTypeRegistry,
  labelLayoutZoom = 1,
): Array<{ id: string; x: number; y: number }> {
  const baseGapX = Math.max(24, gridSize ?? 32);
  const baseGapY = Math.max(16, Math.round((gridSize ?? 32) * 0.5));
  const compGap = Math.max(32, baseGapX);

  const byId = new Map(allNodes.map((n) => [n.id, n]));
  const arrangeable = [...selectedIds]
    .map((id) => byId.get(id))
    .filter(
      (n): n is SpatialNode =>
        !!n && n.type !== "edge" && !n.locked,
    );

  if (arrangeable.length < 2) return [];

  const arrangeableIds = new Set(arrangeable.map((n) => n.id));
  const internalWires = collectInternalEdgeNodes(allNodes, arrangeableIds);
  const internalEdges = internalEdgesFromWires(internalWires);

  const comps = weaklyConnectedComponents(
    arrangeable.map((n) => n.id),
    internalEdges,
  );

  comps.sort((a, b) => {
    const minXA = Math.min(...a.map((id) => byId.get(id)?.x ?? 0));
    const minXB = Math.min(...b.map((id) => byId.get(id)?.x ?? 0));
    return minXA - minXB;
  });

  const merged = new Map<string, { x: number; y: number }>();
  let cursorX = 0;

  for (const compIds of comps) {
    const members = compIds
      .map((id) => byId.get(id))
      .filter((n): n is SpatialNode => !!n);
    const compSet = new Set(compIds);
    const subWires = internalWires.filter(
      (w) => compSet.has(w.data.fromId) && compSet.has(w.data.toId),
    );
    const subEdges = internalEdges.filter(
      (e) => compSet.has(e.from) && compSet.has(e.to),
    );

    const hasPortWires = subWires.some(
      (w) => w.data.sourcePort && w.data.targetPort,
    );
    const gapMul = hasPortWires ? 1.72 : 1.18;
    const gapX = baseGapX * gapMul;
    const gapY = baseGapY * gapMul;

    let local: Map<string, { x: number; y: number }>;
    if (subEdges.length === 0 || !isDAG(compIds, subEdges)) {
      local = gridLayoutPositions(members, measuredHeights, gapX, gapY);
    } else {
      local = layeredLayoutPositions(
        members,
        subEdges,
        measuredHeights,
        gapX,
        gapY,
      );
    }

    unwrapCoincidentNodes(
      local,
      members,
      measuredHeights,
      Math.max(0.25, labelLayoutZoom),
    );

    refineLayoutOverlap(
      local,
      members,
      subWires,
      registry,
      measuredHeights,
      Math.max(0.25, labelLayoutZoom),
    );

    local = normalizePositions(local, members, measuredHeights);
    const b = bboxOf(local, members, measuredHeights);

    for (const [id, p] of local) {
      merged.set(id, { x: p.x + cursorX, y: p.y });
    }
    cursorX += b.maxX - b.minX + compGap;
  }

  const origMinX = Math.min(...arrangeable.map((n) => n.x));
  const origMinY = Math.min(...arrangeable.map((n) => n.y));
  const newB = bboxOf(merged, arrangeable, measuredHeights);
  const dx = origMinX - newB.minX;
  const dy = origMinY - newB.minY;

  const updates: Array<{ id: string; x: number; y: number }> = [];
  for (const n of arrangeable) {
    const p = merged.get(n.id);
    if (!p) continue;
    updates.push({ id: n.id, x: p.x + dx, y: p.y + dy });
  }
  return updates;
}
