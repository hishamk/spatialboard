import type { SpatialNode, ShapeNode, DrawNode, TextNode } from "../engine/types";
import {
  getRoughRectPaths,
  getRoughEllipsePaths,
  getRoughDiamondPaths,
  getRoughLinePaths,
  getRoughArrowPaths,
  strokeStyleToDash,
  type RoughShapeOptions,
} from "../rendering/rough-shapes";

/**
 * Render an array of SpatialNodes as a compact SVG string
 * suitable for use as an inline thumbnail (e.g. 60×60px).
 */
export function renderPreviewSVG(
  nodes: SpatialNode[],
  size = 60,
): string {
  if (nodes.length === 0) {
    return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"/>`;
  }

  // Compute bounding box
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const n of nodes) {
    const h = n.h === "auto" ? 40 : (n.h as number);
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x + n.w);
    maxY = Math.max(maxY, n.y + h);
  }

  const bw = maxX - minX || 1;
  const bh = maxY - minY || 1;
  const padding = 4;
  const viewBox = `${minX - padding} ${minY - padding} ${bw + padding * 2} ${bh + padding * 2}`;

  const pathsHtml: string[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case "shape":
        pathsHtml.push(renderShapePreview(node as ShapeNode));
        break;
      case "draw":
        pathsHtml.push(renderDrawPreview(node as DrawNode));
        break;
      case "text":
        pathsHtml.push(renderTextPreview(node as TextNode));
        break;
      // frame, sticky, content, edge — skip for thumbnails
    }
  }

  return `<svg width="${size}" height="${size}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${pathsHtml.join("")}</svg>`;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderShapePreview(node: ShapeNode): string {
  const d = node.data;
  const h = node.h === "auto" ? 100 : (node.h as number);

  // Use roughness 0 for faster thumbnail rendering
  const opts: RoughShapeOptions = {
    stroke: d.stroke,
    fill: d.fill,
    fillStyle: d.fillStyle,
    roughness: Math.min(d.roughness, 1), // cap roughness for speed
    strokeWidth: d.strokeWidth,
    strokeLineDash: strokeStyleToDash(d.strokeStyle),
    seed: node.id,
  };

  const x1 = d.startPoint?.[0] ?? 0;
  const y1 = d.startPoint?.[1] ?? h / 2;
  const x2 = d.endPoint?.[0] ?? node.w;
  const y2 = d.endPoint?.[1] ?? h / 2;

  let paths;
  switch (d.shape) {
    case "rect":
      paths = getRoughRectPaths(node.x, node.y, node.w, h, opts, d.edgeStyle === "round");
      break;
    case "ellipse":
      paths = getRoughEllipsePaths(node.x + node.w / 2, node.y + h / 2, node.w, h, opts);
      break;
    case "diamond":
      paths = getRoughDiamondPaths(node.x, node.y, node.w, h, opts, d.edgeStyle === "round");
      break;
    case "line":
      paths = getRoughLinePaths(node.x + x1, node.y + y1, node.x + x2, node.y + y2, opts);
      break;
    case "arrow":
      paths = getRoughArrowPaths(node.x + x1, node.y + y1, node.x + x2, node.y + y2, opts);
      break;
    default:
      return "";
  }

  const opacity = d.opacity ?? 1;
  const g = opacity < 1 ? `<g opacity="${opacity}">` : "<g>";
  const parts = paths.map(
    (p) =>
      `<path d="${esc(p.d)}" fill="${p.fill || "none"}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}"${p.strokeDasharray ? ` stroke-dasharray="${p.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`,
  );
  return `${g}${parts.join("")}</g>`;
}

function renderDrawPreview(node: DrawNode): string {
  const d = node.data;
  if (!d.points.length) return "";

  const pts = d.points
    .map(([px, py]) => `${(node.x + px).toFixed(1)},${(node.y + py).toFixed(1)}`)
    .join(" ");

  const opacity = d.opacity ?? 1;
  const fill = d.tool === "vector" && d.fill ? d.fill : "none";
  return `<polygon points="${pts}" fill="${fill}" stroke="${d.color}" stroke-width="${d.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${opacity < 1 ? ` opacity="${opacity}"` : ""}/>`;
}

function renderTextPreview(node: TextNode): string {
  const d = node.data;
  const fontSize = Math.max(d.fontSize, 8);
  const opacity = d.opacity ?? 1;
  // Render first line of text only for thumbnail
  const firstLine = d.text.split("\n")[0] || "";
  return `<text x="${node.x}" y="${node.y + fontSize}" fill="${d.color}" font-size="${fontSize}" font-family="sans-serif"${opacity < 1 ? ` opacity="${opacity}"` : ""}>${esc(firstLine)}</text>`;
}
