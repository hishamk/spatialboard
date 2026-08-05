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
  TableNode,
  StrokeStyle,
  TextAlign,
} from "../engine/types";
import { getYouTubeThumbnailUrl } from "../utils/youtube";
import { tableCellText, tableCellStyle } from "../engine/table-cells";
import { getStrokePath } from "../rendering/freehand";
import { computeDrawFillData } from "../rendering/draw-fill";
import { getAirbrushRender } from "../rendering/airbrush";
import {
  getRoughRectPaths,
  getRoughEllipsePaths,
  getRoughDiamondPaths,
  getRoughLinePaths,
  getRoughArrowPaths,
  getRoughPathPaths,
  strokeStyleToDash,
  roundedRectRadius,
  type RoughShapeOptions,
  type RoughPathData,
} from "../rendering/rough-shapes";
import {
  computeEdgePath,
  arrowHeadPath,
  filledArrowHeadPath,
  markerPathInset,
  insetEdgePathEnds,
  getPortPosition,
  PORT_DOT_RADIUS_PX,
} from "../engine/edge-geometry";
import { resolveNodePorts, type NodeTypeRegistry } from "../nodes/registry";
import { serializeToSBD } from "../serialization/sbd-serializer";
import { embedSBDInPNGParts, embedSBDInSVG } from "./embedded-sbd";
import { getPaperType } from "../components/paper-types";
import { contrastingTextColor, cleanRoundedDiamondPath } from "../components/blocks/VectorNodeBlock";
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
  /**
   * Embed the board's SBD source in the exported file (PNG `iTXt` chunk /
   * SVG `<metadata>`) so dropping the image back onto a board restores
   * editable nodes — the draw.io / Excalidraw "editable export" pattern.
   * Default true.
   */
  embedSource?: boolean;
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

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">`,
    fontCSS ? `<defs><style>${fontCSS}</style></defs>` : "",
    bg
      ? exportBackgroundMarkup(engine, svgW, svgH, ox, oy)
      : `<rect width="${svgW}" height="${svgH}" fill="transparent"/>`,
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

  // Editable export: carry the SBD source inside the image file so the export
  // doubles as the document (frame exports embed only the frame's subset).
  let sourceSBD: string | null = null;
  if (options.embedSource !== false) {
    if (options.frameId) {
      const frameNodes = collectFrameNodes(engine, options.frameId);
      sourceSBD = frameNodes
        ? await serializeToSBD(frameNodes, { background: engine.boardBackground })
        : null;
    } else {
      sourceSBD = await engine.toSBD();
    }
  }

  if (options.format === "svg") {
    const svg = sourceSBD ? embedSBDInSVG(built.svg, sourceSBD) : built.svg;
    downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `${baseName}.svg`);
  } else {
    // Default 2× (the documented contract). The old hardcoded 4× quadrupled
    // the raster: a 2000×1500 board allocated a ~192 MB transient canvas.
    let scale = options.scale ?? 2;
    // Hard cap on the rasterized dimensions — huge boards at high explicit
    // scales otherwise allocate canvases that OOM mobile tabs.
    const MAX_RASTER_DIM = 8192;
    const maxSide = Math.max(built.width, built.height);
    if (maxSide * scale > MAX_RASTER_DIM) {
      const clamped = MAX_RASTER_DIM / maxSide;
      console.warn(
        `[spatialboard] export scale ${scale} clamped to ${clamped.toFixed(2)} ` +
        `(raster capped at ${MAX_RASTER_DIM}px on the long side)`,
      );
      scale = clamped;
    }
    const blob = await svgToPng(built.svg, built.width, built.height, scale);
    if (sourceSBD) {
      // Blob-part assembly: the PNG bytes are never re-concatenated in JS
      // heap — the Blob copies the parts once into non-heap storage.
      const parts = embedSBDInPNGParts(new Uint8Array(await blob.arrayBuffer()), sourceSBD);
      downloadBlob(
        parts ? new Blob(parts as BlobPart[], { type: "image/png" }) : blob,
        `${baseName}.png`,
      );
    } else {
      downloadBlob(blob, `${baseName}.png`);
    }
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
// Background (paper texture + dot grid) — canvas parity with GridBackground /
// background-renderers, as SVG strings.
// ---------------------------------------------------------------------------

/** String ports of the textured-paper filters (background-renderers.tsx). */
const TEXTURE_FILTERS: Partial<Record<string, { defs: string; fill: string; filterId: string }>> = {
  "japanese-stationery": {
    filterId: "paper-texture",
    fill: "#f5f0e8",
    defs:
      `<filter id="paper-texture" x="-20%" y="-20%" width="140%" height="140%">` +
      `<feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" seed="12" stitchTiles="stitch" result="noise"/>` +
      `<feColorMatrix in="noise" type="saturate" values="0" result="bump"/>` +
      `<feDiffuseLighting in="bump" lighting-color="#f7f4ee" surfaceScale="1.2" diffuseConstant="1" result="lit">` +
      `<feDistantLight azimuth="225" elevation="50"/>` +
      `</feDiffuseLighting>` +
      `<feComposite in="lit" in2="bump" operator="in" result="lit-masked"/>` +
      `<feFlood flood-color="#f5f0e8" result="base"/>` +
      `<feBlend in="base" in2="lit-masked" mode="overlay" result="paper"/>` +
      `<feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" seed="7" stitchTiles="stitch" result="grain"/>` +
      `<feColorMatrix in="grain" type="saturate" values="0" result="grain-gray"/>` +
      `<feComponentTransfer in="grain-gray" result="grain-subtle">` +
      `<feFuncR type="linear" slope="0.06" intercept="0.47"/>` +
      `<feFuncG type="linear" slope="0.06" intercept="0.47"/>` +
      `<feFuncB type="linear" slope="0.06" intercept="0.47"/>` +
      `</feComponentTransfer>` +
      `<feBlend in="paper" in2="grain-subtle" mode="overlay" result="paper-final"/>` +
      `</filter>`,
  },
  kraft: {
    filterId: "kraft-texture",
    fill: "#d4b896",
    defs:
      `<filter id="kraft-texture" x="-20%" y="-20%" width="140%" height="140%">` +
      `<feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="42" stitchTiles="stitch" result="noise"/>` +
      `<feColorMatrix in="noise" type="saturate" values="0" result="bump"/>` +
      `<feDiffuseLighting in="bump" lighting-color="#e0c9a6" surfaceScale="1.4" diffuseConstant="0.95" result="lit">` +
      `<feDistantLight azimuth="200" elevation="50"/>` +
      `</feDiffuseLighting>` +
      `<feComposite in="lit" in2="bump" operator="in" result="lit-masked"/>` +
      `<feFlood flood-color="#d4b896" result="base"/>` +
      `<feBlend in="base" in2="lit-masked" mode="overlay" result="kraft"/>` +
      `<feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="99" stitchTiles="stitch" result="fiber"/>` +
      `<feColorMatrix in="fiber" type="saturate" values="0" result="fiber-gray"/>` +
      `<feComponentTransfer in="fiber-gray" result="fiber-subtle">` +
      `<feFuncR type="linear" slope="0.06" intercept="0.47"/>` +
      `<feFuncG type="linear" slope="0.06" intercept="0.47"/>` +
      `<feFuncB type="linear" slope="0.06" intercept="0.47"/>` +
      `</feComponentTransfer>` +
      `<feBlend in="kraft" in2="fiber-subtle" mode="overlay" result="kraft-final"/>` +
      `</filter>`,
  },
};

/**
 * Background markup for the export: flat paper color, plus the texture layer
 * for textured papers, plus the dot-grid overlay when snap-to-grid is on —
 * what the user actually sees behind their content on canvas.
 * `ox`/`oy` anchor the grid to canvas coordinates (dots stay put relative to
 * content, exactly as on the live board).
 */
function exportBackgroundMarkup(
  engine: SpatialEngine,
  svgW: number,
  svgH: number,
  ox: number,
  oy: number,
): string {
  const paper = getPaperType(engine.boardBackground);
  const texture = TEXTURE_FILTERS[engine.boardBackground];

  let out = "";
  if (texture) out += `<defs>${texture.defs}</defs>`;
  out += `<rect width="${svgW}" height="${svgH}" fill="${safeColor(paper.canvasBg)}"/>`;
  if (texture) {
    out += `<rect width="${svgW}" height="${svgH}" fill="${texture.fill}" filter="url(#${texture.filterId})"/>`;
  }

  if (engine.snapToGrid) {
    const grid = engine.gridSize || 20;
    const dotColor = paper.group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
    // Pattern anchored to canvas-space multiples of the grid step
    const px = ((-ox % grid) + grid) % grid;
    const py = ((-oy % grid) + grid) % grid;
    out +=
      `<defs><pattern id="sb-export-grid" x="${px}" y="${py}" width="${grid}" height="${grid}" patternUnits="userSpaceOnUse">` +
      `<circle cx="${grid / 2}" cy="${grid / 2}" r="1.5" fill="${dotColor}"/>` +
      `</pattern></defs>` +
      `<rect width="${svgW}" height="${svgH}" fill="url(#sb-export-grid)"/>`;
  }

  return out;
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
    if (n.rotation) {
      // Rotated nodes: include the ROTATED corners, not the unrotated AABB —
      // otherwise the overhang clips at the export edges.
      const cx = n.x + n.w / 2;
      const cy = n.y + h / 2;
      const rad = (n.rotation * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      for (const [px, py] of [
        [n.x, n.y],
        [n.x + n.w, n.y],
        [n.x, n.y + h],
        [n.x + n.w, n.y + h],
      ] as const) {
        const dx = px - cx;
        const dy = py - cy;
        const rx = cx + dx * cos - dy * sin;
        const ry = cy + dx * sin + dy * cos;
        minX = Math.min(minX, rx);
        minY = Math.min(minY, ry);
        maxX = Math.max(maxX, rx);
        maxY = Math.max(maxY, ry);
      }
    } else {
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.w);
      maxY = Math.max(maxY, n.y + h);
    }
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
  // Exact-z ties paint edges ABOVE nodes (edge hosts come later in the DOM).
  const sorted = [...nodes].sort(
    (a, b) => a.z - b.z || (a.type === "edge" ? 1 : 0) - (b.type === "edge" ? 1 : 0),
  );
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
      case "table":
        elements.push(renderTableNode(n as TableNode, x, y, n.w));
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
          elements.push(renderEdgeNode(edge, from, to, mH, ox, oy, engine.getRegistry()));
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
  // Canvas parity (frame.tsx): defaults are a DASHED 1px #ccc border with
  // 8px corner radius; the label tints to the border color at weight 500.
  const bgFill = d.backgroundColor || "rgba(0,0,0,0.02)";
  const borderColor = d.borderColor || "#ccc";
  const borderW = d.borderWidth || 1;
  const dashArray = borderDashArray(d.borderStyle ?? "dashed", borderW);
  const label = d.label ? escapeXml(d.label) : "";

  let inner =
    `<rect x="${x}" y="${y}" width="${node.w}" height="${h}" rx="8" ` +
    `fill="${safeColor(bgFill)}" stroke="${safeColor(borderColor)}" stroke-width="${borderW}"` +
    (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
    `/>`;

  if (label) {
    inner +=
      `<text x="${x + 4}" y="${y - 9}" font-size="12" font-weight="500" ` +
      `fill="${safeColor(d.borderColor || "#999")}" ` +
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
  // Canvas parity: BlockNoteBlock defaults borderWidth to 1 when a color is set
  const borderW = d.borderWidth ?? 1;
  const dashArray = borderDashArray(d.borderStyle, borderW);

  let inner = "";

  // Border only — the canvas block's background is TRANSPARENT (the board
  // shows through); a solid white card here diverged on any non-white paper.
  if (borderColor && borderW > 0) {
    inner +=
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ` +
      `fill="none" stroke="${safeColor(borderColor)}" stroke-width="${borderW}"` +
      (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
      `/>`;
  }

  // Text content — 8px top pad + 0.85 opacity mirror the markdown fallback
  if (text) {
    inner += textBlock(text, x + 12, y + 8, w - 24, 14, 1.6, "#374151", "left", "sans-serif", 0.85);
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

  // Airbrush: same seeded grain spray as the canvas renderer (DrawBlock) —
  // seed is the node id, offsets are point-relative, so absolute-vs-relative
  // point spaces render identical grain patterns.
  if (d.tool === "airbrush") {
    const spray = getAirbrushRender(absolutePoints, d.strokeWidth, node.id);
    if (!spray) return "";
    const inner =
      `<path d="${spray.d}" fill="none" stroke="${safeColor(d.color)}" ` +
      `stroke-width="${spray.dotStrokeWidth}" stroke-opacity="${spray.strokeOpacity}" stroke-linecap="round"/>`;
    const hh = node.h === "auto" ? 0 : (node.h as number);
    return wrapG(inner, node.x - ox, node.y - oy, node.w, hh, node.rotation, d.opacity);
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
    // Center-line stroke for dashed/dotted — same smooth quadratic curve as
    // DrawBlock.centerLinePath (a straight polyline renders angular and
    // shifts the dash spacing).
    let centerPath = "";
    if (absolutePoints.length >= 2) {
      const first = absolutePoints[0];
      const parts: string[] = [`M ${first[0]} ${first[1]}`];
      for (let i = 1; i < absolutePoints.length; i++) {
        const [px, py] = absolutePoints[i];
        const [prevX, prevY] = absolutePoints[i - 1];
        parts.push(`Q ${prevX} ${prevY} ${(prevX + px) / 2} ${(prevY + py) / 2}`);
      }
      const last = absolutePoints[absolutePoints.length - 1];
      parts.push(`L ${last[0]} ${last[1]}`);
      centerPath = parts.join(" ");
    } else {
      centerPath = absolutePoints
        .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
        .join(" ");
    }
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
  const isRounded = d.edgeStyle === "round";
  // Canvas parity (ShapeBlock): omitted line/arrow endpoints default to a
  // horizontal center line, not the box diagonal.
  const sx = x + (d.startPoint?.[0] ?? 0);
  const sy = y + (d.startPoint?.[1] ?? h / 2);
  const ex = x + (d.endPoint?.[0] ?? w);
  const ey = y + (d.endPoint?.[1] ?? h / 2);

  let inner: string;
  if (d.roughness === 0) {
    // Canvas parity: roughness 0 renders crisp geometry primitives
    // (ShapeBlock's CleanShape), not RoughJS paths.
    inner = cleanShapeMarkup(d, x, y, w, h, sx, sy, ex, ey);
  } else {
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
      case "line":
        paths = getRoughLinePaths(sx, sy, ex, ey, opts);
        break;
      case "arrow":
        paths = getRoughArrowPaths(sx, sy, ex, ey, opts);
        break;
      default:
        paths = getRoughRectPaths(x, y, w, h, opts);
    }

    // Canvas parity: solid fill + roughness uses CLEAN fill geometry behind
    // the rough stroke (RoughJS's own solid-fill path wobbles independently
    // of the outline and misaligns at the boundary).
    const solidFillBehind = !!d.fill && d.fillStyle === "solid" && d.roughness > 0;
    const fillBehind = solidFillBehind
      ? cleanShapeFillMarkup(d.shape, x, y, w, h, d.fill!, isRounded)
      : "";

    inner =
      fillBehind +
      paths
        .filter((p) => !(solidFillBehind && p.fill && p.fill !== "none"))
        .map(
          (p) =>
            `<path d="${p.d}" ` +
            `fill="${safeColor(p.fill)}" ` +
            `stroke="${safeColor(p.stroke)}" stroke-width="${p.strokeWidth}"` +
            (p.strokeDasharray ? ` stroke-dasharray="${p.strokeDasharray}"` : "") +
            `/>`,
        )
        .join("\n");
  }

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
    const lines = wrapText(d.label, maxW, labelFontSize, labelFontCSS);
    const blockH = lines.length * labelFontSize * lineHeight;
    // textBlock takes the block TOP; center the block within the shape
    const ty = y + (h - blockH) / 2;
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

/** Crisp geometry for roughness-0 shapes — mirrors ShapeBlock's CleanShape. */
function cleanShapeMarkup(
  d: ShapeNode["data"],
  x: number,
  y: number,
  w: number,
  h: number,
  sx: number,
  sy: number,
  ex: number,
  ey: number,
): string {
  const stroke = safeColor(d.stroke);
  const fill = safeColor(d.fill);
  const sw = d.strokeWidth;
  const dash = strokeStyleToDash(d.strokeStyle)?.join(",");
  const dashAttr = dash ? ` stroke-dasharray="${dash}"` : "";
  const rounded = d.edgeStyle === "round";

  switch (d.shape) {
    case "rect": {
      // Thin unfilled rects render as center lines (legacy Mermaid self-loop
      // helper segments) — same rule as CleanShape.
      const hasFill = !!d.fill && d.fill !== "none";
      const isThinH = h <= Math.max(sw * 2, 4);
      const isThinW = w <= Math.max(sw * 2, 4);
      if (!hasFill && (isThinH || isThinW)) {
        if (isThinH && w >= h) {
          return `<line x1="${x}" y1="${y + h / 2}" x2="${x + w}" y2="${y + h / 2}" stroke="${stroke}" stroke-width="${Math.max(sw, h)}"${dashAttr}/>`;
        }
        return `<line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${stroke}" stroke-width="${Math.max(sw, w)}"${dashAttr}/>`;
      }
      const r = rounded ? roundedRectRadius(w, h) : 0;
      return (
        `<rect x="${x}" y="${y}" width="${w}" height="${h}"` +
        (r ? ` rx="${r}" ry="${r}"` : "") +
        ` stroke="${stroke}" fill="${fill}" stroke-width="${sw}"${dashAttr}/>`
      );
    }
    case "ellipse":
      return `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w / 2}" ry="${h / 2}" stroke="${stroke}" fill="${fill}" stroke-width="${sw}"${dashAttr}/>`;
    case "diamond":
      if (rounded) {
        return `<g transform="translate(${x}, ${y})"><path d="${cleanRoundedDiamondPath(w, h)}" stroke="${stroke}" fill="${fill}" stroke-width="${sw}"${dashAttr}/></g>`;
      }
      return `<polygon points="${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}" stroke="${stroke}" fill="${fill}" stroke-width="${sw}"${dashAttr}/>`;
    case "line":
      return `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${stroke}" stroke-width="${sw}"${dashAttr}/>`;
    case "arrow": {
      const angle = Math.atan2(ey - sy, ex - sx);
      const headLen = Math.max(12, sw * 4);
      const headAngle = Math.PI / 6;
      const ax = ex - headLen * Math.cos(angle - headAngle);
      const ay = ey - headLen * Math.sin(angle - headAngle);
      const bx = ex - headLen * Math.cos(angle + headAngle);
      const by = ey - headLen * Math.sin(angle + headAngle);
      return (
        `<line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="${stroke}" stroke-width="${sw}"${dashAttr}/>` +
        `<polyline points="${ax},${ay} ${ex},${ey} ${bx},${by}" stroke="${stroke}" stroke-width="${sw}" fill="none"/>`
      );
    }
    default:
      return "";
  }
}

/** Clean solid-fill geometry behind rough strokes — mirrors CleanShapeFill. */
function cleanShapeFillMarkup(
  shape: ShapeNode["data"]["shape"],
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  rounded: boolean,
): string {
  switch (shape) {
    case "rect": {
      const r = rounded ? roundedRectRadius(w, h) : 0;
      return (
        `<rect x="${x}" y="${y}" width="${w}" height="${h}"` +
        (r ? ` rx="${r}" ry="${r}"` : "") +
        ` fill="${safeColor(fill)}" stroke="none"/>`
      );
    }
    case "ellipse":
      return `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${safeColor(fill)}" stroke="none"/>`;
    case "diamond":
      if (rounded) {
        return `<g transform="translate(${x}, ${y})"><path d="${cleanRoundedDiamondPath(w, h)}" fill="${safeColor(fill)}" stroke="none"/></g>`;
      }
      return `<polygon points="${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}" fill="${safeColor(fill)}" stroke="none"/>`;
    default:
      return "";
  }
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
    y + pad,
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
  // Canvas parity: StickyNoteBlock uses borderRadius 12 for "round" edges,
  // 2 otherwise, and line-height 1.5.
  const rx = d.edgeStyle === "round" ? 12 : 2;
  const inner =
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${safeColor(d.color)}"/>` +
    // Stickies always render in the default font on canvas (StickyNoteBlock)
    textBlock(d.text, x + 12, y + 12, w - 24, fontSize, 1.5, "#1e1e2e", "left", getFontFamilyCSS(DEFAULT_FONT));
  return wrapG(inner, x, y, w, h, node.rotation, d.opacity);
}

function roughPathsToSVG(paths: RoughPathData[]): string {
  return paths
    .map(
      (p) =>
        `<path d="${p.d}" stroke="${safeColor(p.stroke)}" stroke-width="${p.strokeWidth}" ` +
        `fill="${p.fill && p.fill !== "none" ? safeColor(p.fill) : "none"}"` +
        (p.strokeDasharray ? ` stroke-dasharray="${p.strokeDasharray}"` : "") +
        ` stroke-linecap="round"/>`,
    )
    .join("");
}

function renderTableNode(node: TableNode, x: number, y: number, w: number): string {
  const d = node.data;
  const rows = d.rows?.length ? d.rows : [[""]];
  let cols = 1;
  for (const r of rows) if (r.length > cols) cols = r.length;
  const headerRow = d.headerRow !== false;
  const fontSize = d.fontSize ?? 14;
  const align = d.align ?? "left";
  const textColor = d.textColor ?? "#1e1e2e";
  const stroke = d.stroke ?? "#1e1e2e";
  const strokeWidth = d.strokeWidth ?? 1.5;
  const roughness = d.roughness ?? 1;
  const fontCSS = getFontFamilyCSS(d.fontFamily ?? DEFAULT_FONT);

  // Canvas parity (TableBlock): padding "8px 10px", line-height 1.45,
  // column x boundaries from colWidths weights, min row height 40.
  const padX = 10;
  const padY = 8;
  const lineH = fontSize * 1.45;
  const minRowH = 40;
  const weights = Array.from({ length: cols }, (_, i) => {
    const v = d.colWidths?.[i];
    return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : 1;
  });
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const colXs = [0];
  let acc = 0;
  for (const wt of weights) {
    acc += (wt / totalWeight) * w;
    colXs.push(acc);
  }
  colXs[colXs.length - 1] = w;

  const cellFontCSS = (cell: (typeof rows)[number][number]) => {
    const ff = tableCellStyle(cell).fontFamily;
    return ff ? getFontFamilyCSS(ff) : fontCSS;
  };
  const rowHeights = rows.map((row) => {
    let rowH = minRowH;
    for (let c = 0; c < cols; c++) {
      const text = tableCellText(row[c]);
      if (!text) continue;
      const cellSize = tableCellStyle(row[c]).fontSize ?? fontSize;
      const textW = colXs[c + 1] - colXs[c] - padX * 2;
      const lines = wrapText(text, textW, cellSize, cellFontCSS(row[c])).length;
      rowH = Math.max(rowH, Math.round(lines * cellSize * 1.45) + padY * 2);
    }
    return rowH;
  });
  const totalH = rowHeights.reduce((a, b) => a + b, 0);

  // Hand-drawn grid — SAME seeds as TableBlock so the export squiggles are
  // identical to the canvas.
  const opts = { stroke, strokeWidth, roughness };
  const rough: RoughPathData[] = [
    ...getRoughRectPaths(x, y, w, totalH, { ...opts, seed: `${node.id}:outer` }),
  ];
  for (let c = 1; c < cols; c++) {
    rough.push(
      ...getRoughLinePaths(x + colXs[c], y, x + colXs[c], y + totalH, { ...opts, seed: `${node.id}:c${c}` }),
    );
  }
  let boundaryY = y;
  for (let r = 0; r < rows.length - 1; r++) {
    boundaryY += rowHeights[r];
    rough.push(
      ...getRoughLinePaths(x, boundaryY, x + w, boundaryY, { ...opts, seed: `${node.id}:r${r + 1}` }),
    );
  }

  const texts: string[] = [];
  let rowY = y;
  rows.forEach((row, r) => {
    const rowH = rowHeights[r];
    const isHeader = headerRow && r === 0;
    for (let c = 0; c < cols; c++) {
      const text = tableCellText(row[c]);
      if (!text) continue;
      const cs = tableCellStyle(row[c]);
      const cellAlign = cs.align ?? align;
      const cellSize = cs.fontSize ?? fontSize;
      const textW = colXs[c + 1] - colXs[c] - padX * 2;
      const tx =
        cellAlign === "center"
          ? x + (colXs[c] + colXs[c + 1]) / 2
          : cellAlign === "right"
            ? x + colXs[c + 1] - padX
            : x + colXs[c] + padX;
      const cell = textBlock(
        text, tx, rowY + padY, textW, cellSize, 1.45,
        cs.color ?? textColor, cellAlign, cellFontCSS(row[c]),
      );
      texts.push(isHeader ? `<g font-weight="700">${cell}</g>` : cell);
    }
    rowY += rowH;
  });

  const inner = roughPathsToSVG(rough) + texts.join("");
  return wrapG(inner, x, y, w, totalH, node.rotation, d.opacity);
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

  // Canvas parity: ImageBlock defaults borderWidth to 1 when a color is set
  const borderColor = d.borderColor;
  const borderW = d.borderWidth ?? (borderColor ? 1 : 0);
  const dashArray = borderDashArray(d.borderStyle, borderW);
  const opacity = d.opacity ?? 1;

  // `meet` = objectFit: contain — matches ImageBlock's DOM rendering. `slice`
  // cover-crops, which zooms/clips any image whose aspect differs from its box.
  let imageEl: string;
  const crop = d.crop;
  if (crop && crop.w > 0 && crop.h > 0) {
    // Non-destructive crop (object-view-box on canvas): show only the crop
    // region of the source, contained in the node box. A nested <svg> whose
    // viewBox is the crop rect in natural-pixel coordinates reproduces it.
    const dims = await getImageNaturalSize(href);
    if (dims) {
      const vb = `${crop.x * dims.w} ${crop.y * dims.h} ${crop.w * dims.w} ${crop.h * dims.h}`;
      imageEl =
        `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vb}" preserveAspectRatio="xMidYMid meet">` +
        `<image href="${escapeXml(href)}" x="0" y="0" width="${dims.w}" height="${dims.h}"/>` +
        `</svg>`;
    } else {
      imageEl = `<image href="${escapeXml(href)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`;
    }
  } else {
    imageEl = `<image href="${escapeXml(href)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`;
  }

  // flipH/flipV mirror about the box center (canvas: transform scaleX/Y(-1))
  if (d.flipH || d.flipV) {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const sx = d.flipH ? -1 : 1;
    const sy = d.flipV ? -1 : 1;
    imageEl = `<g transform="translate(${cx}, ${cy}) scale(${sx}, ${sy}) translate(${-cx}, ${-cy})">${imageEl}</g>`;
  }

  // 4px rounded clip (canvas: inner container overflow hidden + borderRadius 4).
  // Opacity applies to the IMAGE only — the canvas border renders full-strength.
  const clipId = `imgclip-${node.id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  let inner =
    `<clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/></clipPath>` +
    `<g clip-path="url(#${clipId})"${opacity < 1 ? ` opacity="${opacity}"` : ""}>${imageEl}</g>`;

  if (borderColor && borderW > 0) {
    inner +=
      `<rect x="${x + borderW / 2}" y="${y + borderW / 2}" width="${w - borderW}" height="${h - borderW}" rx="4" ` +
      `fill="none" stroke="${safeColor(borderColor)}" stroke-width="${borderW}"` +
      (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
      `/>`;
  }

  return wrapG(inner, x, y, w, h, node.rotation, undefined);
}

/** Natural pixel size of an image (for crop viewBox math). Null on failure. */
function getImageNaturalSize(href: string): Promise<{ w: number; h: number } | null> {
  if (typeof Image === "undefined") return Promise.resolve(null);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve(img.naturalWidth > 0 ? { w: img.naturalWidth, h: img.naturalHeight } : null);
    img.onerror = () => resolve(null);
    img.src = href;
  });
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

  // Dark background + thumbnail. `meet` letterboxes on the dark rect like the
  // embedded player does on canvas (a cover-crop would zoom the thumbnail).
  // Thumbnail clipped to the same 4px radius as the canvas container.
  const ytClipId = `ytclip-${node.id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  let inner =
    `<clipPath id="${ytClipId}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/></clipPath>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#1a1a1a"/>` +
    `<g clip-path="url(#${ytClipId})"><image href="${escapeXml(href)}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/></g>`;

  // Border (canvas: inner container border, width ?? 1 when a color is set)
  if (d.borderColor) {
    const ytBorderW = d.borderWidth ?? 1;
    const ytDash = borderDashArray(d.borderStyle, ytBorderW);
    inner +=
      `<rect x="${x + ytBorderW / 2}" y="${y + ytBorderW / 2}" width="${w - ytBorderW}" height="${h - ytBorderW}" rx="4" ` +
      `fill="none" stroke="${safeColor(d.borderColor)}" stroke-width="${ytBorderW}"` +
      (ytDash ? ` stroke-dasharray="${ytDash}"` : "") +
      `/>`;
  }

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
  registry?: NodeTypeRegistry,
): string {
  const d = edge.data;
  const sw = d.strokeWidth;
  const headSize = d.arrowHeadSize ?? Math.max(8, sw * 3);
  const tailSize = d.arrowTailSize ?? Math.max(8, sw * 3);
  const hasHead = !!d.arrowHead && d.arrowHead !== "none";
  const hasTail = !!d.arrowTail && d.arrowTail !== "none";

  // Port-connected edges anchor at the port DOT, not the node border —
  // mirror SVGLayer's resolution (export renders in canvas units: zoom = 1).
  let sourcePortPos: { x: number; y: number } | undefined;
  let targetPortPos: { x: number; y: number } | undefined;
  if (registry && d.sourcePort) {
    const srcDef = registry.get(from.type);
    const srcPorts = resolveNodePorts(srcDef, from);
    if (srcPorts) {
      sourcePortPos =
        getPortPosition(from, srcPorts, d.sourcePort, 1, mH, srcDef!.portAnchor ?? "bbox") ?? undefined;
    }
  }
  if (registry && d.targetPort) {
    const tgtDef = registry.get(to.type);
    const tgtPorts = resolveNodePorts(tgtDef, to);
    if (tgtPorts) {
      targetPortPos =
        getPortPosition(to, tgtPorts, d.targetPort, 1, mH, tgtDef!.portAnchor ?? "bbox") ?? undefined;
    }
  }

  // Canvas parity: pull marker-carrying path ends back to the port rim so the
  // arrow tip kisses the dot instead of burying into its center.
  let pathTargetPos = targetPortPos;
  let pathSourcePos = sourcePortPos;
  if (targetPortPos && hasHead) {
    const probe = computeEdgePath(
      from, to, d.edgeType, mH,
      d.sourceHandle, d.targetHandle,
      d.midpointOffset, d.curveOffset,
      sourcePortPos, targetPortPos,
      d.sourceT, d.targetT,
      d.attachmentGap,
    );
    const pull = PORT_DOT_RADIUS_PX + headSize;
    pathTargetPos = {
      x: targetPortPos.x - Math.cos(probe.arrowAngle) * pull,
      y: targetPortPos.y - Math.sin(probe.arrowAngle) * pull,
    };
  }
  if (sourcePortPos && hasTail) {
    const probe = computeEdgePath(
      from, to, d.edgeType, mH,
      d.sourceHandle, d.targetHandle,
      d.midpointOffset, d.curveOffset,
      sourcePortPos, pathTargetPos ?? targetPortPos,
      d.sourceT, d.targetT,
      d.attachmentGap,
    );
    const pull = PORT_DOT_RADIUS_PX + tailSize;
    pathSourcePos = {
      x: sourcePortPos.x - Math.cos(probe.tailAngle) * pull,
      y: sourcePortPos.y - Math.sin(probe.tailAngle) * pull,
    };
  }

  const result = computeEdgePath(
    from, to,
    d.edgeType,
    mH,
    d.sourceHandle,
    d.targetHandle,
    d.midpointOffset,
    d.curveOffset,
    pathSourcePos, pathTargetPos,
    d.sourceT,
    d.targetT,
    d.attachmentGap,
  );

  // Offset the path
  const translate = `translate(${-ox}, ${-oy})`;

  // Canvas parity: dash pattern scales with stroke width
  const dashArray =
    d.style === "dashed" ? `${8 * sw} ${4 * sw}` : d.style === "dotted" ? `${2 * sw} ${3 * sw}` : undefined;

  // Canvas parity: the drawn path stops short of the endpoints so the stroke's
  // round cap never seeps out from under a marker (markers stay tip-anchored
  // at the true endpoints) — suppressed for port-rim anchored ends, which are
  // already pulled back past the marker.
  const headAtPortRim = !!targetPortPos && hasHead;
  const tailAtPortRim = !!sourcePortPos && hasTail;
  const headInset = hasHead && !headAtPortRim ? markerPathInset(d.arrowHead!, headSize, sw) : 0;
  const tailInset = hasTail && !tailAtPortRim ? markerPathInset(d.arrowTail!, tailSize, sw) : 0;
  const drawnPath = headInset > 0 || tailInset > 0 ? insetEdgePathEnds(result, tailInset, headInset) : result.path;

  let inner: string;
  if ((d.roughness ?? 0) > 0) {
    // Canvas parity: rough (hand-drawn) edges render RoughJS multi-strokes
    const roughOpts = {
      stroke: d.color,
      roughness: d.roughness!,
      strokeWidth: sw,
      strokeLineDash:
        d.style === "dashed" ? [8, 4] : d.style === "dotted" ? [2, 2] : undefined,
      seed: edge.id,
    };
    inner = getRoughPathPaths(drawnPath, roughOpts)
      .map(
        (p) =>
          `<path d="${p.d}" fill="${safeColor(p.fill)}" stroke="${safeColor(p.stroke)}" ` +
          `stroke-width="${p.strokeWidth}"` +
          (p.strokeDasharray ? ` stroke-dasharray="${p.strokeDasharray}"` : "") +
          ` stroke-linecap="round" stroke-linejoin="round"/>`,
      )
      .join("");
  } else {
    inner =
      `<path d="${drawnPath}" fill="none" stroke="${safeColor(d.color)}" stroke-width="${sw}"` +
      (dashArray ? ` stroke-dasharray="${dashArray}"` : "") +
      ` stroke-linecap="round" stroke-linejoin="round"/>`;
  }

  if (d.arrowHead && d.arrowHead !== "none") {
    if (d.arrowHead === "arrow") {
      const headPath = arrowHeadPath(result.x2, result.y2, result.arrowAngle, headSize);
      if ((d.roughness ?? 0) > 0) {
        // Canvas parity: rough chevron head (dash never applies to markers)
        inner += getRoughPathPaths(headPath, {
          stroke: d.color,
          roughness: d.roughness!,
          strokeWidth: sw,
          seed: edge.id,
        })
          .map((p) => `<path d="${p.d}" fill="none" stroke="${safeColor(p.stroke)}" stroke-width="${p.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`)
          .join("");
      } else {
        inner +=
          `<path d="${headPath}" ` +
          `fill="none" stroke="${safeColor(d.color)}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
      }
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
      const tailPath = arrowHeadPath(result.x1, result.y1, result.tailAngle, tailSize);
      if ((d.roughness ?? 0) > 0) {
        inner += getRoughPathPaths(tailPath, {
          stroke: d.color,
          roughness: d.roughness!,
          strokeWidth: sw,
          seed: edge.id,
        })
          .map((p) => `<path d="${p.d}" fill="none" stroke="${safeColor(p.stroke)}" stroke-width="${p.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`)
          .join("");
      } else {
        inner +=
          `<path d="${tailPath}" ` +
          `fill="none" stroke="${safeColor(d.color)}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
      }
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

  // Edge label — white rounded pill behind the text (canvas parity:
  // measureEdgeLabelBox at zoom 1, fsMain 11, lh 13, pad 7×5).
  if (d.label) {
    const lh = 13;
    const padX = 7;
    const padY = 5;
    const charW = 6;
    const boxW = Math.min(d.label.length * charW + padX * 2, 280);
    const boxH = lh + padY * 2;
    const x0 = result.labelX - boxW / 2;
    const y0 = result.labelY - boxH / 2;
    inner +=
      `<rect x="${x0}" y="${y0}" width="${boxW}" height="${boxH}" rx="4" fill="white" opacity="0.92"/>` +
      `<text x="${result.labelX}" y="${y0 + padY + 0.78 * lh}" ` +
      `font-size="11" fill="${safeColor(d.color)}" text-anchor="middle" ` +
      `font-family="sans-serif">${escapeXml(d.label)}</text>`;
  }

  return `<g transform="${translate}">${inner}</g>`;
}

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

function textBlock(
  text: string,
  x: number,
  topY: number,
  maxWidth: number,
  fontSize: number,
  lineHeight: number,
  fill: string,
  align: TextAlign,
  fontFamily: string,
  fillOpacity?: number,
): string {
  if (!text) return "";

  const anchor = align === "center" ? "middle" : align === "right" ? "end" : "start";
  const lines = wrapText(text, maxWidth, fontSize, fontFamily);
  const dy = fontSize * lineHeight;
  // First baseline = half-leading + ascent (~0.8em) below the block top,
  // matching CSS line-height layout — a full 1.0em offset drew every exported
  // line ~0.2em lower than the canvas.
  const firstBaseline = topY + ((lineHeight - 1) / 2 + 0.8) * fontSize;

  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="${x}" dy="${i === 0 ? 0 : dy}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return (
    `<text x="${x}" y="${firstBaseline}" font-size="${fontSize}" fill="${safeColor(fill)}" ` +
    (fillOpacity !== undefined ? `fill-opacity="${fillOpacity}" ` : "") +
    `font-family="${escapeXml(fontFamily)}" text-anchor="${anchor}">${tspans}</text>`
  );
}

let measureCtx: CanvasRenderingContext2D | null | undefined;

/** Text width in px measured with the REAL font (canvas 2D), so exported
 *  wrapping matches the DOM's word-wrap. 0.55em heuristic without a DOM. */
function measureTextWidth(s: string, fontSize: number, fontFamily: string): number {
  if (measureCtx === undefined) {
    measureCtx =
      typeof document !== "undefined"
        ? document.createElement("canvas").getContext("2d")
        : null;
  }
  if (measureCtx) {
    measureCtx.font = `${fontSize}px ${fontFamily}`;
    const m = measureCtx.measureText(s);
    if (m.width > 0) return m.width;
  }
  return s.length * fontSize * 0.55;
}

/** Word-wrap with real font measurement (DOM parity); words wider than the
 *  box break mid-word like the canvas blocks' `word-break: break-word`. */
function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily = "sans-serif",
): string[] {
  const result: string[] = [];

  const breakLongWord = (word: string): string[] => {
    if (measureTextWidth(word, fontSize, fontFamily) <= maxWidth) return [word];
    const parts: string[] = [];
    let chunk = "";
    for (const ch of word) {
      if (chunk && measureTextWidth(chunk + ch, fontSize, fontFamily) > maxWidth) {
        parts.push(chunk);
        chunk = ch;
      } else {
        chunk += ch;
      }
    }
    if (chunk) parts.push(chunk);
    return parts;
  };

  for (const paragraph of text.split("\n")) {
    if (!paragraph.trim()) {
      result.push("");
      continue;
    }
    const words = paragraph.split(/\s+/).flatMap(breakLongWord);
    let currentLine = "";
    for (const word of words) {
      const test = currentLine ? currentLine + " " + word : word;
      if (currentLine && measureTextWidth(test, fontSize, fontFamily) > maxWidth) {
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
      // decode() waits for embedded @font-face data-URIs to be ready — without
      // it a cold-cache first export can rasterize in a fallback font.
      const drawWhenReady =
        typeof img.decode === "function" ? img.decode().catch(() => undefined) : Promise.resolve();
      void drawWhenReady.then(() => {
        const canvas = document.createElement("canvas");
        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, width, height);
        URL.revokeObjectURL(url);
        canvas.toBlob((blob) => {
          // Release the raster backing store eagerly — Safari in particular
          // retains canvas memory until GC otherwise.
          canvas.width = 0;
          canvas.height = 0;
          if (blob) resolve(blob);
          else reject(new Error("Canvas toBlob failed"));
        }, "image/png");
      });
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
    } else if (n.type === "table") {
      const d = (n as TableNode).data;
      add(d.fontFamily ?? DEFAULT_FONT);
      for (const row of d.rows ?? []) {
        for (const cell of row) {
          const ff = tableCellStyle(cell).fontFamily;
          if (ff) add(ff);
        }
      }
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

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}">`,
    fontCSS ? `<defs><style>${fontCSS}</style></defs>` : "",
    exportBackgroundMarkup(engine, svgW, svgH, ox, oy),
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
