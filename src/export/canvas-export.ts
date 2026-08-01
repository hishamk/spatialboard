import type { SpatialEngine } from "../engine/SpatialEngine";
import type {
  SpatialNode,
  BlockNoteNode,
  DrawNode,
  ShapeNode,
  EdgeNode,
  ImageNode,
  TextNode,
  FrameNode,
  StickyNoteNode,
  YouTubeNode,
  StrokeStyle,
  TextAlign,
} from "../engine/types";
import { getYouTubeThumbnailUrl } from "../utils/youtube";
import { getStrokePath } from "../rendering/freehand";
import { computeDrawFillData } from "../rendering/draw-fill";
import {
  getRoughRectPaths,
  getRoughEllipsePaths,
  getRoughDiamondPaths,
  getRoughLinePaths,
  getRoughArrowPaths,
  strokeStyleToDash,
  type RoughShapeOptions,
  type RoughPathData,
} from "../rendering/rough-shapes";
import {
  computeEdgePath,
  arrowHeadPath,
  filledArrowHeadPath,
  markerPathInset,
  insetEdgePathEnds,
} from "../engine/edge-geometry";
import { getPaperType } from "../components/paper-types";
import { contrastingTextColor } from "../components/blocks/VectorNodeBlock";
import {
  getFontFamilyCSS,
  DEFAULT_FONT,
  SYSTEM_FONTS,
  BUNDLED_FONT_SOURCES,
} from "../fonts";
import { safeColor } from "../rendering/svg-safe";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExportOptions {
  format: "png" | "svg";
  background?: boolean; // default true
  padding?: number; // canvas-unit padding (default 40; 0 for frame exports)
  scale?: number; // PNG resolution multiplier (default 2)
  /** Export only this frame: nodes inside it + edges fully within, cropped to the frame rect. */
  frameId?: string;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * Build the export SVG string (board-wide, or frame-scoped when
 * `options.frameId` is set). Returns null when there is nothing to export.
 * Internal module export (used by exportBoard + tests) — not part of the
 * package barrel.
 */
export async function buildBoardSVG(
  engine: SpatialEngine,
  options: ExportOptions,
): Promise<{ svg: string; width: number; height: number } | null> {
  const mH = engine.measuredHeights;

  let nodes: SpatialNode[];
  let bounds: { x: number; y: number; w: number; h: number };
  let pad: number;
  if (options.frameId) {
    const collected = collectFrameNodes(engine, options.frameId);
    if (!collected) return null;
    nodes = collected;
    // Frame exports crop to the frame's own rect (no content-driven bounds)
    const frame = collected[0] as FrameNode;
    bounds = { x: frame.x, y: frame.y, w: frame.w, h: engine.resolveHeight(frame) };
    pad = options.padding ?? 0;
  } else {
    nodes = engine.getAllNodes();
    if (nodes.length === 0) return null;
    bounds = computeContentBounds(nodes, mH, engine);
    pad = options.padding ?? 40;
  }

  const bg = options.background !== false;
  const embedImages = options.format === "png";

  const svgW = bounds.w + pad * 2;
  const svgH = bounds.h + pad * 2;
  const ox = bounds.x - pad; // origin offset x
  const oy = bounds.y - pad; // origin offset y

  const elements = await buildElements(nodes, engine, mH, ox, oy, embedImages);

  // Embed fonts so text renders faithfully in standalone SVGs and in the
  // isolated <img> document used for PNG rasterization (no access to page fonts).
  const fontCSS = await buildEmbeddedFontCSS(collectFontKeys(nodes));

  const bgColor = bg ? getPaperType(engine.boardBackground).canvasBg : "transparent";
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">`,
    fontCSS ? `<defs><style>${fontCSS}</style></defs>` : "",
    `<rect width="${svgW}" height="${svgH}" fill="${safeColor(bgColor)}"/>`,
    ...elements,
    `</svg>`,
  ].join("\n");

  return { svg, width: svgW, height: svgH };
}

export async function exportBoard(
  engine: SpatialEngine,
  options: ExportOptions,
): Promise<void> {
  const built = await buildBoardSVG(engine, options);
  if (!built) return;

  const baseName = options.frameId
    ? frameExportBaseName(engine, options.frameId)
    : "board";

  if (options.format === "svg") {
    downloadBlob(new Blob([built.svg], { type: "image/svg+xml" }), `${baseName}.svg`);
  } else {
    const scale = options.scale ?? 4;
    const blob = await svgToPng(built.svg, built.width, built.height, scale);
    downloadBlob(blob, `${baseName}.png`);
  }
}

/** Filename stem for a frame export: slugified frame label, else "frame". */
function frameExportBaseName(engine: SpatialEngine, frameId: string): string {
  const frame = engine.getNode(frameId);
  const label = frame && frame.type === "frame" ? (frame as FrameNode).data.label : undefined;
  const slug = label
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "frame";
}

// ---------------------------------------------------------------------------
// Bounding box
// ---------------------------------------------------------------------------

function computeContentBounds(
  nodes: SpatialNode[],
  mH: Record<string, number>,
  engine: SpatialEngine,
): { x: number; y: number; w: number; h: number } {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const n of nodes) {
    if (n.type === "edge") continue; // edges are derived from node positions
    const h = engine.resolveHeight(n);
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x + n.w);
    maxY = Math.max(maxY, n.y + h);
  }

  // Include edge path bounds
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  for (const n of nodes) {
    if (n.type !== "edge") continue;
    const edge = n as EdgeNode;
    const from = nodeMap.get(edge.data.fromId);
    const to = nodeMap.get(edge.data.toId);
    if (!from || !to) continue;
    const result = computeEdgePath(
      from, to,
      edge.data.edgeType,
      mH,
      edge.data.sourceHandle,
      edge.data.targetHandle,
      edge.data.midpointOffset,
      edge.data.curveOffset,
      undefined, undefined,
      edge.data.sourceT,
      edge.data.targetT,
      edge.data.attachmentGap,
    );
    minX = Math.min(minX, result.bounds.x);
    minY = Math.min(minY, result.bounds.y);
    maxX = Math.max(maxX, result.bounds.x + result.bounds.w);
    maxY = Math.max(maxY, result.bounds.y + result.bounds.h);
  }

  if (!isFinite(minX)) return { x: 0, y: 0, w: 100, h: 100 };
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

// ---------------------------------------------------------------------------
// SVG element builders
// ---------------------------------------------------------------------------

async function buildElements(
  nodes: SpatialNode[],
  engine: SpatialEngine,
  mH: Record<string, number>,
  ox: number,
  oy: number,
  embedImages: boolean,
): Promise<string[]> {
  // Edge endpoint geometry resolves against the FULL graph, not just the
  // rendered set — a frame-scoped export includes edges whose far endpoint
  // lies outside the frame (the viewBox clips them), and routing them needs
  // that endpoint node.
  const nodeMap = new Map<string, SpatialNode>();
  for (const n of engine.getAllNodes()) nodeMap.set(n.id, n);
  for (const n of nodes) nodeMap.set(n.id, n);
  // Canvas layering rule: ONE unified z-order — nodes and edges share the
  // same stack (committed edges render inside the DOM layer at zIndex = z).
  const sorted = [...nodes].sort((a, b) => a.z - b.z);
  const elements: string[] = [];

  for (const n of sorted) {
    const x = n.x - ox;
    const y = n.y - oy;
    const h = engine.resolveHeight(n);

    switch (n.type) {
      case "frame":
        elements.push(renderFrameNode(n as FrameNode, x, y, h));
        break;
      case "blocknote":
        elements.push(renderContentNode(n as BlockNoteNode, x, y, n.w, h));
        break;
      case "draw":
        elements.push(renderDrawNode(n as DrawNode, ox, oy));
        break;
      case "shape":
        elements.push(renderShapeNode(n as ShapeNode, x, y, n.w, h));
        break;
      case "text":
        elements.push(renderTextNode(n as TextNode, x, y, n.w, h));
        break;
      case "sticky":
        elements.push(renderStickyNode(n as StickyNoteNode, x, y, n.w, h));
        break;
      case "image":
        elements.push(await renderImageNode(n as ImageNode, x, y, n.w, h, embedImages));
        break;
      case "youtube":
        elements.push(await renderYouTubeNode(n as YouTubeNode, x, y, n.w, h, embedImages));
        break;
      case "edge": {
        const edge = n as EdgeNode;
        const from = nodeMap.get(edge.data.fromId);
        const to = nodeMap.get(edge.data.toId);
        if (from && to) {
          elements.push(renderEdgeNode(edge, from, to, mH, ox, oy));
        }
        break;
      }
    }
  }

  return elements;
}

// ---------------------------------------------------------------------------
// Node renderers
// ---------------------------------------------------------------------------

function wrapG(
  inner: string,
  x: number,
  y: number,
  w: number,
  h: number,
  rotation?: number,
  opacity?: number,
): string {
  const attrs: string[] = [];
  if (rotation) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    attrs.push(`transform="rotate(${rotation}, ${cx}, ${cy})"`);
  }
  if (opacity !== undefined && opacity !== 1) {
    attrs.push(`opacity="${opacity}"`);
  }
  return `<g ${attrs.join(" ")}>${inner}</g>`;
}

function renderFrameNode(node: FrameNode, x: number, y: number, h: number): string {
  const d = node.data;
  const bgFill = d.backgroundColor || "rgba(0,0,0,0.02)";
  const borderColor = d.borderColor || "#d1d5db";
  const borderW = d.borderWidth ?? 1;
  const dashArray = borderDashArray(d.borderStyle, borderW);
  const label = d.label ? escapeXml(d.label) : "";

  let inner =
    `<rect x="${x}" y="${y}" width="${node.w}" height="${h}" rx="4" ` +
    `fill="${safeColor(bgFill)}" stroke="${safeColor(borderColor)}" stroke-width="${borderW}"` +
    (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
    `/>`;

  if (label) {
    inner +=
      `<text x="${x + 8}" y="${y - 6}" font-size="12" fill="#6b7280" ` +
      `font-family="sans-serif">${label}</text>`;
  }

  return wrapG(inner, x, y, node.w, h, node.rotation, d.opacity);
}

function renderContentNode(
  node: BlockNoteNode,
  x: number,
  y: number,
  w: number,
  h: number,
): string {
  const d = node.data;
  const text = d.markdown?.trim() || "";
  const borderColor = d.borderColor;
  const borderW = d.borderWidth ?? 0;
  const dashArray = borderDashArray(d.borderStyle, borderW);

  let inner = "";

  // Background & border
  if (borderColor && borderW > 0) {
    inner +=
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ` +
      `fill="white" stroke="${safeColor(borderColor)}" stroke-width="${borderW}"` +
      (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
      `/>`;
  } else {
    inner += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="white"/>`;
  }

  // Text content
  if (text) {
    inner += textBlock(text, x + 12, y + 20, w - 24, 14, 1.6, "#374151", "left", "sans-serif");
  }

  return wrapG(inner, x, y, w, h, node.rotation, d.opacity);
}

function renderDrawNode(node: DrawNode, ox: number, oy: number): string {
  const d = node.data;
  // Points are stored relative to node (x,y)
  const absolutePoints: Array<[number, number, number]> = d.points.map(
    ([px, py, p]) => [px + node.x - ox, py + node.y - oy, p],
  );

  if (absolutePoints.length === 0) return "";

  // Vector tool: clean polygon rendering (no perfect-freehand)
  if (d.tool === "vector") {
    return renderVectorPath(absolutePoints, d, node, ox, oy);
  }

  const dashArray = strokeStyleToDash(d.strokeStyle);

  let inner = "";

  // Fill — same computation as the canvas renderer (DrawBlock): closed-enough
  // strokes fill the whole smooth outline; open strokes fill only
  // self-intersection loops; an open non-intersecting stroke gets NO fill.
  // Geometry is node-relative (as on canvas), so wrap in a translate group.
  const fillData = computeDrawFillData(d.points, d.fill, d.fillStyle, d.strokeWidth);
  if (fillData) {
    let fillMarkup = "";
    if (fillData.kind === "solid") {
      if (fillData.regions) {
        for (const r of fillData.regions) {
          fillMarkup += `<path d="${r.pathD}" fill="${safeColor(fillData.fill)}" stroke="none"/>`;
        }
      } else {
        fillMarkup += `<path d="${fillData.d}" fill="${safeColor(fillData.fill)}" stroke="none"/>`;
      }
    } else {
      for (const p of fillData.paths) {
        fillMarkup +=
          `<path d="${p.d}" stroke="${safeColor(p.stroke)}" stroke-width="${p.strokeWidth}" ` +
          `fill="${safeColor(p.fill)}" stroke-linecap="round" stroke-linejoin="round"/>`;
      }
    }
    inner += `<g transform="translate(${node.x - ox}, ${node.y - oy})">${fillMarkup}</g>`;
  }

  // Stroke
  if (dashArray) {
    // Center-line stroke for dashed/dotted
    const centerPath = absolutePoints
      .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
      .join(" ");
    const da = dashArray.map((v) => v * Math.max(d.strokeWidth, 1)).join(" ");
    inner +=
      `<path d="${centerPath}" fill="none" stroke="${safeColor(d.color)}" ` +
      `stroke-width="${d.strokeWidth}" stroke-dasharray="${da}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    // Filled outline (solid stroke)
    const pathD = getStrokePath(absolutePoints, { size: d.strokeWidth });
    if (pathD) {
      inner += `<path d="${pathD}" fill="${safeColor(d.color)}" stroke="none"/>`;
    }
  }

  // Rotation + opacity: wrapG's rotate origin must be in the SAME offset
  // coordinate space as the path data (node.x - ox), or rotated nodes pivot
  // around a point (ox, oy) away and land outside the viewBox.
  const h = node.h === "auto" ? 0 : (node.h as number);
  return wrapG(inner, node.x - ox, node.y - oy, node.w, h, node.rotation, d.opacity);
}

function renderVectorPath(
  absolutePoints: Array<[number, number, number]>,
  d: DrawNode["data"],
  node: DrawNode,
  ox: number,
  oy: number,
): string {
  const pathD = absolutePoints
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`)
    .join(" ") + " Z";

  const dashArray = strokeStyleToDash(d.strokeStyle);
  const dash = dashArray
    ? ` stroke-dasharray="${dashArray.map((v) => v * Math.max(d.strokeWidth, 1)).join(" ")}"`
    : "";

  const inner =
    `<path d="${pathD}" fill="${safeColor(d.fill)}" stroke="${safeColor(d.color)}" ` +
    `stroke-width="${d.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${dash}/>`;

  const h = node.h === "auto" ? 0 : (node.h as number);
  // Rotate origin must be in the offset SVG space the path uses (see above).
  return wrapG(inner, node.x - ox, node.y - oy, node.w, h, node.rotation, d.opacity);
}

function renderShapeNode(
  node: ShapeNode,
  x: number,
  y: number,
  w: number,
  h: number,
): string {
  const d = node.data;
  const opts: RoughShapeOptions = {
    stroke: d.stroke,
    fill: d.fill,
    fillStyle: d.fillStyle,
    roughness: d.roughness,
    strokeWidth: d.strokeWidth,
    strokeLineDash: strokeStyleToDash(d.strokeStyle),
    seed: node.id,
  };

  let paths: RoughPathData[];
  const isRounded = d.edgeStyle === "round";
  switch (d.shape) {
    case "rect":
      paths = getRoughRectPaths(x, y, w, h, opts, isRounded);
      break;
    case "ellipse":
      paths = getRoughEllipsePaths(x + w / 2, y + h / 2, w, h, opts);
      break;
    case "diamond":
      paths = getRoughDiamondPaths(x, y, w, h, opts, isRounded);
      break;
    case "line": {
      const sp = d.startPoint ?? [0, 0];
      const ep = d.endPoint ?? [w, h];
      paths = getRoughLinePaths(x + sp[0], y + sp[1], x + ep[0], y + ep[1], opts);
      break;
    }
    case "arrow": {
      const sp = d.startPoint ?? [0, 0];
      const ep = d.endPoint ?? [w, h];
      paths = getRoughArrowPaths(x + sp[0], y + sp[1], x + ep[0], y + ep[1], opts);
      break;
    }
    default:
      paths = getRoughRectPaths(x, y, w, h, opts);
  }

  const inner = paths
    .map(
      (p) =>
        `<path d="${p.d}" ` +
        `fill="${safeColor(p.fill)}" ` +
        `stroke="${safeColor(p.stroke)}" stroke-width="${p.strokeWidth}"` +
        (p.strokeDasharray ? ` stroke-dasharray="${p.strokeDasharray}"` : "") +
        `/>`,
    )
    .join("\n");

  // Label — mirrors ShapeBlock's static label: vertically centered flex box with
  // 4px/8px padding, line-height 1.3, contrasting text on solid fills, hidden
  // for line/arrow shapes. On canvas the label div sits OUTSIDE the
  // opacity-carrying <g>, so node opacity does not dim it — replicate that.
  const isLinear = d.shape === "line" || d.shape === "arrow";
  let labelMarkup = "";
  if (!isLinear && d.label) {
    const labelFontSize = d.labelFontSize ?? 14;
    const labelAlign = d.labelAlign ?? "center";
    const labelColor =
      d.fill && d.fillStyle === "solid" ? contrastingTextColor(d.fill) : d.stroke;
    const labelFontCSS = getFontFamilyCSS(d.labelFontFamily ?? DEFAULT_FONT);
    const padX = 8;
    const lineHeight = 1.3;
    const maxW = w - padX * 2;
    const lines = wrapText(d.label, maxW, labelFontSize);
    const blockH = lines.length * labelFontSize * lineHeight;
    // First-line baseline ≈ centered block top + one font-size (approx. ascent)
    const ty = y + (h - blockH) / 2 + labelFontSize;
    const tx =
      labelAlign === "center" ? x + w / 2 : labelAlign === "right" ? x + w - padX : x + padX;
    labelMarkup = textBlock(
      d.label,
      tx,
      ty,
      maxW,
      labelFontSize,
      lineHeight,
      labelColor,
      labelAlign,
      labelFontCSS,
    );
  }

  if (!labelMarkup) return wrapG(inner, x, y, w, h, node.rotation, d.opacity);
  return wrapG(
    wrapG(inner, x, y, w, h, undefined, d.opacity) + labelMarkup,
    x,
    y,
    w,
    h,
    node.rotation,
  );
}

function renderTextNode(node: TextNode, x: number, y: number, w: number, resolvedH: number): string {
  const d = node.data;
  // Use engine-resolved height (accounts for word-wrap measurement);
  // fall back to line-count estimate if not yet measured
  const h = resolvedH || d.text.split("\n").length * d.fontSize * 1.0;
  const fontCSS = getFontFamilyCSS(d.fontFamily);
  // Match DOM: borderWidth defaults to 1 when borderColor is set
  const hasBorder = !!d.borderColor;
  const pad = hasBorder ? 6 : 0;

  let inner = "";

  // Border
  if (hasBorder) {
    const borderW = d.borderWidth ?? 1;
    const dashArray = borderDashArray(d.borderStyle, borderW);
    inner +=
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ` +
      `fill="none" stroke="${safeColor(d.borderColor)}" stroke-width="${borderW}"` +
      (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
      `/>`;
  }

  // Text inset by padding; line-height 1.0 matches DOM rendering
  const tx = d.align === "center" ? x + w / 2 : d.align === "right" ? x + w - pad : x + pad;
  inner += textBlock(
    d.text,
    tx,
    y + pad + d.fontSize,
    w - pad * 2,
    d.fontSize,
    1.0,
    d.color,
    d.align,
    fontCSS,
  );
  return wrapG(inner, x, y, w, h, node.rotation, d.opacity);
}

function renderStickyNode(
  node: StickyNoteNode,
  x: number,
  y: number,
  w: number,
  h: number,
): string {
  const d = node.data;
  const fontSize = d.fontSize ?? 16;
  const inner =
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${safeColor(d.color)}"/>` +
    // Stickies always render in the default font on canvas (StickyNoteBlock)
    textBlock(d.text, x + 12, y + 12 + fontSize, w - 24, fontSize, 1.4, "#1e1e2e", "left", getFontFamilyCSS(DEFAULT_FONT));
  return wrapG(inner, x, y, w, h, node.rotation, d.opacity);
}

async function renderImageNode(
  node: ImageNode,
  x: number,
  y: number,
  w: number,
  h: number,
  embedImage: boolean,
): Promise<string> {
  const d = node.data;
  let href = d.src;

  if (embedImage && href && !href.startsWith("data:")) {
    try {
      href = await fetchImageAsDataUri(href);
    } catch {
      // Fallback to original URL
    }
  }

  const borderColor = d.borderColor;
  const borderW = d.borderWidth ?? 0;
  const dashArray = borderDashArray(d.borderStyle, borderW);

  let inner = `<image href="${escapeXml(href)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/>`;

  if (borderColor && borderW > 0) {
    inner +=
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" ` +
      `fill="none" stroke="${safeColor(borderColor)}" stroke-width="${borderW}"` +
      (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
      `/>`;
  }

  return wrapG(inner, x, y, w, h, node.rotation, d.opacity);
}

async function renderYouTubeNode(
  node: YouTubeNode,
  x: number,
  y: number,
  w: number,
  h: number,
  embedImage: boolean,
): Promise<string> {
  const d = node.data;
  let href = getYouTubeThumbnailUrl(d.videoId);

  if (embedImage) {
    try {
      href = await fetchImageAsDataUri(href);
    } catch {
      // Fallback: render a placeholder rectangle
    }
  }

  // Dark background + thumbnail
  let inner =
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#1a1a1a"/>` +
    `<image href="${escapeXml(href)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/>`;

  // Play button overlay (triangle in circle)
  const cx = x + w / 2;
  const cy = y + h / 2;
  const r = Math.min(w, h) * 0.12;
  inner +=
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(0,0,0,0.6)"/>` +
    `<path d="${playTriangle(cx, cy, r * 0.5)}" fill="white"/>`;

  return wrapG(inner, x, y, w, h, node.rotation, d.opacity);
}

function playTriangle(cx: number, cy: number, size: number): string {
  // Equilateral-ish play triangle, slightly offset right for visual centering
  const offset = size * 0.15;
  const x1 = cx - size * 0.7 + offset;
  const y1 = cy - size;
  const x2 = cx + size + offset;
  const y2 = cy;
  const x3 = x1;
  const y3 = cy + size;
  return `M${x1},${y1} L${x2},${y2} L${x3},${y3} Z`;
}

function renderEdgeNode(
  edge: EdgeNode,
  from: SpatialNode,
  to: SpatialNode,
  mH: Record<string, number>,
  ox: number,
  oy: number,
): string {
  const d = edge.data;
  const result = computeEdgePath(
    from, to,
    d.edgeType,
    mH,
    d.sourceHandle,
    d.targetHandle,
    d.midpointOffset,
    d.curveOffset,
    undefined, undefined,
    d.sourceT,
    d.targetT,
    d.attachmentGap,
  );

  // Offset the path
  const translate = `translate(${-ox}, ${-oy})`;

  const dashArray = d.style === "dashed" ? "8 4" : d.style === "dotted" ? "2 3" : undefined;
  const sw = d.strokeWidth;

  const headSize = d.arrowHeadSize ?? Math.max(8, sw * 3);
  const tailSize = d.arrowTailSize ?? Math.max(8, sw * 3);
  // Canvas parity: the drawn path stops short of the endpoints so the stroke's
  // round cap never seeps out from under a marker (markers stay tip-anchored
  // at the true endpoints).
  const headInset = d.arrowHead && d.arrowHead !== "none" ? markerPathInset(d.arrowHead, headSize, sw) : 0;
  const tailInset = d.arrowTail && d.arrowTail !== "none" ? markerPathInset(d.arrowTail, tailSize, sw) : 0;
  const drawnPath = headInset > 0 || tailInset > 0 ? insetEdgePathEnds(result, tailInset, headInset) : result.path;

  let inner =
    `<path d="${drawnPath}" fill="none" stroke="${safeColor(d.color)}" stroke-width="${sw}"` +
    (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
    ` stroke-linecap="round" stroke-linejoin="round"/>`;

  if (d.arrowHead && d.arrowHead !== "none") {
    if (d.arrowHead === "arrow") {
      inner +=
        `<path d="${arrowHeadPath(result.x2, result.y2, result.arrowAngle, headSize)}" ` +
        `fill="none" stroke="${safeColor(d.color)}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (d.arrowHead === "filled") {
      inner +=
        `<path d="${filledArrowHeadPath(result.x2, result.y2, result.arrowAngle, headSize)}" ` +
        `fill="${safeColor(d.color)}" stroke="none"/>`;
    } else if (d.arrowHead === "dot") {
      // Canvas parity: r = headSize * 0.25, center pulled back by r so the
      // dot rim (not its middle) touches the border.
      const r = headSize * 0.25;
      const dcx = result.x2 - Math.cos(result.arrowAngle) * r;
      const dcy = result.y2 - Math.sin(result.arrowAngle) * r;
      inner += `<circle cx="${dcx}" cy="${dcy}" r="${r}" fill="${safeColor(d.color)}"/>`;
    }
  }

  if (d.arrowTail && d.arrowTail !== "none") {
    if (d.arrowTail === "arrow") {
      inner +=
        `<path d="${arrowHeadPath(result.x1, result.y1, result.tailAngle, tailSize)}" ` +
        `fill="none" stroke="${safeColor(d.color)}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else if (d.arrowTail === "filled") {
      inner +=
        `<path d="${filledArrowHeadPath(result.x1, result.y1, result.tailAngle, tailSize)}" ` +
        `fill="${safeColor(d.color)}" stroke="none"/>`;
    } else if (d.arrowTail === "dot") {
      const r = tailSize * 0.25;
      const dcx = result.x1 - Math.cos(result.tailAngle) * r;
      const dcy = result.y1 - Math.sin(result.tailAngle) * r;
      inner += `<circle cx="${dcx}" cy="${dcy}" r="${r}" fill="${safeColor(d.color)}"/>`;
    }
  }

  // Edge label
  if (d.label) {
    inner +=
      `<text x="${result.labelX}" y="${result.labelY}" ` +
      `font-size="12" fill="${safeColor(d.color)}" text-anchor="middle" ` +
      `dominant-baseline="central" font-family="sans-serif">${escapeXml(d.label)}</text>`;
  }

  return `<g transform="${translate}">${inner}</g>`;
}

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

function textBlock(
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  lineHeight: number,
  fill: string,
  align: TextAlign,
  fontFamily: string,
): string {
  if (!text) return "";

  const anchor = align === "center" ? "middle" : align === "right" ? "end" : "start";
  const lines = wrapText(text, maxWidth, fontSize);
  const dy = fontSize * lineHeight;

  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="${x}" dy="${i === 0 ? 0 : dy}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return (
    `<text x="${x}" y="${y}" font-size="${fontSize}" fill="${safeColor(fill)}" ` +
    `font-family="${escapeXml(fontFamily)}" text-anchor="${anchor}">${tspans}</text>`
  );
}

/** Simple word-wrapping: split on whitespace, accumulate lines that fit maxWidth. */
function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
  const charWidth = fontSize * 0.55; // rough average character width
  const charsPerLine = Math.max(1, Math.floor(maxWidth / charWidth));
  const result: string[] = [];

  for (const paragraph of text.split("\n")) {
    if (!paragraph.trim()) {
      result.push("");
      continue;
    }
    const words = paragraph.split(/\s+/);
    let currentLine = "";
    for (const word of words) {
      const test = currentLine ? currentLine + " " + word : word;
      if (test.length > charsPerLine && currentLine) {
        result.push(currentLine);
        currentLine = word;
      } else {
        currentLine = test;
      }
    }
    if (currentLine) result.push(currentLine);
  }

  return result;
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function borderDashArray(
  style?: StrokeStyle,
  width?: number,
): string | undefined {
  const w = width ?? 1;
  if (style === "dashed") return `${8 * w} ${4 * w}`;
  if (style === "dotted") return `${2 * w} ${2 * w}`;
  return undefined;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function fetchImageAsDataUri(src: string): Promise<string> {
  const resp = await fetch(src);
  const blob = await resp.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function svgToPng(
  svgString: string,
  width: number,
  height: number,
  scale: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load SVG as image"));
    };

    img.src = url;
  });
}

// ---------------------------------------------------------------------------
// Font embedding (for SVG data-URLs which can't load external fonts)
// ---------------------------------------------------------------------------

const fontRuleCache = new Map<string, string>();
const MAX_FONT_CACHE = 12;

/**
 * Collect unique font keys used by rendered text: text nodes (their own family),
 * stickies (always the default font — StickyNoteBlock), and shape labels
 * (labelFontFamily ?? default — ShapeBlock; line/arrow shapes render no label).
 */
function collectFontKeys(nodes: SpatialNode[]): string[] {
  const keys = new Set<string>();
  const add = (key: string | undefined) => {
    if (key && !SYSTEM_FONTS.has(key)) keys.add(key);
  };
  for (const n of nodes) {
    if (n.type === "text") {
      add((n as TextNode).data.fontFamily);
    } else if (n.type === "sticky") {
      add(DEFAULT_FONT);
    } else if (n.type === "shape") {
      const d = (n as ShapeNode).data;
      const isLinear = d.shape === "line" || d.shape === "arrow";
      if (d.label && !isLinear) add(d.labelFontFamily ?? DEFAULT_FONT);
    }
  }
  return [...keys];
}

/** Fetch a font and return it as a base64 data URI. Uses arrayBuffer + btoa
 *  (rather than FileReader) so it also works outside a full DOM environment. */
async function fetchFontAsDataUri(url: string, mime: string): Promise<string> {
  const resp = await fetch(url);
  const bytes = new Uint8Array(await resp.arrayBuffer());
  let binary = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return `data:${mime};base64,${btoa(binary)}`;
}

/** Build @font-face CSS with base64-embedded font data for all requested fonts. */
async function buildEmbeddedFontCSS(fontKeys: string[]): Promise<string> {
  if (fontKeys.length === 0) return "";

  const rules: string[] = [];
  for (const key of fontKeys) {
    if (fontRuleCache.has(key)) {
      rules.push(fontRuleCache.get(key)!);
      continue;
    }
    try {
      let rule: string;
      const bundled = BUNDLED_FONT_SOURCES[key];
      if (bundled) {
        const dataUri = await fetchFontAsDataUri(
          bundled.url,
          bundled.format === "truetype" ? "font/ttf" : "font/woff2",
        );
        rule = `@font-face { font-family: '${key}'; src: url('${dataUri}') format('${bundled.format}'); }`;
      } else {
        // Google Font — the css2 response contains one @font-face block PER
        // UNICODE SUBSET (cyrillic, greek, latin-ext, latin, …). Grabbing the
        // first woff2 used to land on a non-latin subset, so latin glyphs fell
        // back to a system font. Parse every block, keep its unicode-range,
        // and embed the latin-covering subsets (all blocks if none matched).
        const cssResp = await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(key)}&display=swap`,
        );
        const css = await cssResp.text();
        const blocks: Array<{ url: string; range?: string }> = [];
        for (const m of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
          const body = m[1];
          const url = body.match(/url\((https:\/\/[^)]+\.woff2)\)/)?.[1];
          if (!url) continue;
          const range = body.match(/unicode-range:\s*([^;]+);/)?.[1]?.trim();
          blocks.push({ url, range });
        }
        if (blocks.length === 0) continue;
        // Latin basic starts at U+0000/U+0020; latin-ext at U+0100.
        const latin = blocks.filter(
          (b) => !b.range || /U\+00/i.test(b.range) || /U\+01[0-9A-F]{2}/i.test(b.range),
        );
        const chosen = latin.length > 0 ? latin : blocks;
        const parts: string[] = [];
        for (const b of chosen) {
          const dataUri = await fetchFontAsDataUri(b.url, "font/woff2");
          parts.push(
            `@font-face { font-family: '${key}'; src: url('${dataUri}') format('woff2');` +
              (b.range ? ` unicode-range: ${b.range};` : "") +
              ` }`,
          );
        }
        rule = parts.join("\n");
      }
      // LRU eviction — drop oldest entry when cache is full
      if (fontRuleCache.size >= MAX_FONT_CACHE) {
        const oldest = fontRuleCache.keys().next().value;
        if (oldest !== undefined) fontRuleCache.delete(oldest);
      }
      fontRuleCache.set(key, rule);
      rules.push(rule);
    } catch {
      // Skip if font can't be fetched
    }
  }
  return rules.join("\n");
}

// ---------------------------------------------------------------------------
// Frame thumbnail rendering (used by FramesPanel)
// ---------------------------------------------------------------------------

/**
 * Collect the nodes a frame-scoped render should show. The frame comes first,
 * followed by: spatial overlap via the QuadTree + formal frame children
 * (belt-and-suspenders so auto-height nodes that haven't been re-indexed in
 * the QuadTree still appear) + edges where BOTH endpoints are in the set.
 * Returns null when `frameId` doesn't resolve to a frame node.
 */
function collectFrameNodes(
  engine: SpatialEngine,
  frameId: string,
): SpatialNode[] | null {
  const frame = engine.getNode(frameId);
  if (!frame || frame.type !== "frame") return null;

  const fH = engine.resolveHeight(frame);
  const allNodes: SpatialNode[] = [frame];
  const nodeIdSet = new Set<string>([frameId]);

  const addNode = (n: SpatialNode) => {
    if (nodeIdSet.has(n.id) || n.type === "edge") return;
    nodeIdSet.add(n.id);
    allNodes.push(n);
  };

  // 1. Every node whose AABB intersects the frame rect — a direct scan rather
  // than the QuadTree (whose entries can be stale for auto-height nodes), so
  // partially-overlapping nodes are always included. The SVG viewBox clips
  // them to the frame, matching what the canvas shows inside the frame.
  for (const n of engine.getAllNodes()) {
    if (n.type === "edge") continue;
    const nh = engine.resolveHeight(n);
    if (n.x < frame.x + frame.w && n.x + n.w > frame.x && n.y < frame.y + fH && n.y + nh > frame.y) {
      addNode(n);
    }
  }

  // 2. Formal frame children (always included even if the AABB test misses them)
  for (const n of engine.getFrameChildren(frameId)) {
    addNode(n);
  }

  // 3. Edges with at least one endpoint in the visible set — a connector
  // running out of the frame is visible inside it on canvas, so it exports
  // too (clipped at the frame boundary by the viewBox). Edges whose both
  // endpoints are outside are skipped even if their path crosses the frame.
  for (const n of engine.getAllNodes()) {
    if (n.type === "edge") {
      const edge = n as EdgeNode;
      if (nodeIdSet.has(edge.data.fromId) || nodeIdSet.has(edge.data.toId)) {
        allNodes.push(n);
      }
    }
  }

  return allNodes;
}

/**
 * Render a single frame and its children to an SVG data-URL string.
 * Images use their original URLs (no embedding) so this is synchronous-safe.
 */
export async function renderFrameToSVG(
  engine: SpatialEngine,
  frameId: string,
): Promise<string> {
  const allNodes = collectFrameNodes(engine, frameId);
  if (!allNodes) return "";
  const frame = allNodes[0] as FrameNode;

  const fH = engine.resolveHeight(frame);
  const pad = 0;
  const svgW = frame.w + pad * 2;
  const svgH = fH + pad * 2;
  const ox = frame.x - pad;
  const oy = frame.y - pad;

  const mH = engine.measuredHeights;
  // embedImages=true so the SVG data-URL can render images
  // (browsers block external fetches inside <img> / data-URL SVGs)
  const elements = await buildElements(allNodes, engine, mH, ox, oy, true);

  // Embed fonts so they render in the sandboxed SVG data-URL
  const fontKeys = collectFontKeys(allNodes);
  const fontCSS = await buildEmbeddedFontCSS(fontKeys);

  const bgColor = getPaperType(engine.boardBackground).canvasBg;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">`,
    fontCSS ? `<defs><style>${fontCSS}</style></defs>` : "",
    `<rect width="${svgW}" height="${svgH}" fill="${safeColor(bgColor)}"/>`,
    ...elements,
    `</svg>`,
  ].join("\n");

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
