import excalifontUrl from "../assets/fonts/Excalifont-Regular.woff2";
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
} from "../engine/edge-geometry";
import { getPaperType } from "../components/paper-types";
import { getFontFamilyCSS } from "../fonts";
import { safeColor } from "../rendering/svg-safe";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExportOptions {
  format: "png" | "svg";
  background?: boolean; // default true
  padding?: number; // canvas-unit padding (default 40)
  scale?: number; // PNG resolution multiplier (default 2)
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

export async function exportBoard(
  engine: SpatialEngine,
  options: ExportOptions,
): Promise<void> {
  const nodes = engine.getAllNodes();
  if (nodes.length === 0) return;

  const mH = engine.measuredHeights;
  const bounds = computeContentBounds(nodes, mH, engine);
  const pad = options.padding ?? 40;
  const bg = options.background !== false;
  const embedImages = options.format === "png";

  const svgW = bounds.w + pad * 2;
  const svgH = bounds.h + pad * 2;
  const ox = bounds.x - pad; // origin offset x
  const oy = bounds.y - pad; // origin offset y

  const elements = await buildElements(nodes, engine, mH, ox, oy, embedImages);

  const bgColor = bg ? getPaperType(engine.boardBackground).canvasBg : "transparent";
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">`,
    `<rect width="${svgW}" height="${svgH}" fill="${safeColor(bgColor)}"/>`,
    ...elements,
    `</svg>`,
  ].join("\n");

  if (options.format === "svg") {
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), "board.svg");
  } else {
    const scale = options.scale ?? 4;
    const blob = await svgToPng(svg, svgW, svgH, scale);
    downloadBlob(blob, "board.png");
  }
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
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
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
    return renderVectorPath(absolutePoints, d, node);
  }

  const dashArray = strokeStyleToDash(d.strokeStyle);

  let inner = "";

  // Fill (if path is closed enough)
  if (d.fill) {
    const pts: [number, number][] = absolutePoints.map(([px, py]) => [px, py]);
    if (pts.length > 2) {
      const fillPath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
      inner += `<path d="${fillPath}" fill="${safeColor(d.fill)}" fill-opacity="0.4" stroke="none"/>`;
    }
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

  return d.opacity !== undefined && d.opacity !== 1
    ? `<g opacity="${d.opacity}">${inner}</g>`
    : inner;
}

function renderVectorPath(
  absolutePoints: Array<[number, number, number]>,
  d: DrawNode["data"],
  node: DrawNode,
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
  return wrapG(inner, node.x, node.y, node.w, h, node.rotation, d.opacity);
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

  return wrapG(inner, x, y, w, h, node.rotation, d.opacity);
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
    textBlock(d.text, x + 12, y + 12 + fontSize, w - 24, fontSize, 1.4, "#1e1e2e", "left", "sans-serif");
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

  let inner =
    `<path d="${result.path}" fill="none" stroke="${safeColor(d.color)}" stroke-width="${sw}"` +
    (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
    ` stroke-linecap="round" stroke-linejoin="round"/>`;

  // Arrow heads
  const headSize = d.arrowHeadSize ?? Math.max(8, sw * 3);
  const tailSize = d.arrowTailSize ?? Math.max(8, sw * 3);

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
      const r = headSize / 3;
      inner += `<circle cx="${result.x2}" cy="${result.y2}" r="${r}" fill="${safeColor(d.color)}"/>`;
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
      const r = tailSize / 3;
      inner += `<circle cx="${result.x1}" cy="${result.y1}" r="${r}" fill="${safeColor(d.color)}"/>`;
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

const SYSTEM_FONTS = new Set(["sans-serif", "serif", "monospace"]);
const fontRuleCache = new Map<string, string>();
const MAX_FONT_CACHE = 12;

/** Collect unique font keys used by text nodes. */
function collectFontKeys(nodes: SpatialNode[]): string[] {
  const keys = new Set<string>();
  for (const n of nodes) {
    if (n.type === "text") {
      const key = (n as TextNode).data.fontFamily;
      if (key && !SYSTEM_FONTS.has(key)) keys.add(key);
    }
  }
  return [...keys];
}

/** Build @font-face CSS with base64-embedded woff2 data for all requested fonts. */
async function buildEmbeddedFontCSS(fontKeys: string[]): Promise<string> {
  if (fontKeys.length === 0) return "";

  const rules: string[] = [];
  for (const key of fontKeys) {
    if (fontRuleCache.has(key)) {
      rules.push(fontRuleCache.get(key)!);
      continue;
    }
    try {
      let dataUri: string;
      if (key === "Excalifont") {
        dataUri = await fetchImageAsDataUri(excalifontUrl);
      } else {
        // Google Font — fetch CSS to find woff2 URL
        const cssResp = await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(key)}&display=swap`,
        );
        const css = await cssResp.text();
        const urlMatch = css.match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!urlMatch) continue;
        dataUri = await fetchImageAsDataUri(urlMatch[1]);
      }
      const rule =
        `@font-face { font-family: '${key}'; src: url('${dataUri}') format('woff2'); }`;
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
 * Render a single frame and its children to an SVG data-URL string.
 * Images use their original URLs (no embedding) so this is synchronous-safe.
 */
export async function renderFrameToSVG(
  engine: SpatialEngine,
  frameId: string,
): Promise<string> {
  const frame = engine.getNode(frameId);
  if (!frame || frame.type !== "frame") return "";

  const fH = engine.resolveHeight(frame);
  const pad = 0;
  const svgW = frame.w + pad * 2;
  const svgH = fH + pad * 2;
  const ox = frame.x - pad;
  const oy = frame.y - pad;

  // Collect visible nodes: spatial overlap + formal frame children (belt-and-suspenders
  // so auto-height nodes that haven't been re-indexed in the QuadTree still appear)
  const allNodes: SpatialNode[] = [frame];
  const nodeIdSet = new Set<string>([frameId]);

  const addNode = (n: SpatialNode) => {
    if (nodeIdSet.has(n.id) || n.type === "edge") return;
    nodeIdSet.add(n.id);
    allNodes.push(n);
  };

  // 1. Spatial overlap via QuadTree
  for (const n of engine.getNodesInRect({ x: frame.x, y: frame.y, w: frame.w, h: fH })) {
    addNode(n);
  }

  // 2. Formal frame children (always included even if QuadTree misses them)
  for (const n of engine.getFrameChildren(frameId)) {
    addNode(n);
  }

  // 3. Edges where both endpoints are in the visible set
  for (const n of engine.getAllNodes()) {
    if (n.type === "edge") {
      const edge = n as EdgeNode;
      if (nodeIdSet.has(edge.data.fromId) && nodeIdSet.has(edge.data.toId)) {
        allNodes.push(n);
      }
    }
  }

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
