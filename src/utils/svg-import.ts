import { nanoid } from "nanoid";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { ImageNode } from "../engine/types";

/** Extract the <svg>…</svg> from a string, if present. */
export function extractSvgMarkup(text: string): string | null {
  const trimmed = text.trim();
  // Quick check before running regex
  if (!trimmed.includes("<svg")) return null;
  const m = trimmed.match(/<svg[\s\S]*?<\/svg>/i);
  return m ? m[0] : null;
}

/** Convert SVG markup to a data: URL. */
export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Parse SVG markup, determine its intrinsic dimensions, and create an ImageNode.
 * Returns a Promise that resolves with the created node, or null if parsing fails.
 */
export function svgTextToImageNode(
  svg: string,
  x: number,
  y: number,
  z: number,
): Promise<ImageNode | null> {
  return new Promise((resolve) => {
    const dataUrl = svgToDataUrl(svg);
    const img = new Image();
    img.onload = () => {
      const maxW = 400;
      const maxH = 400;
      let w = img.naturalWidth || 200;
      let h = img.naturalHeight || 200;
      // SVGs without explicit width/height report 0 or very small values —
      // fall back to viewBox dimensions parsed from the markup.
      if (w <= 1 || h <= 1) {
        const vb = svg.match(/viewBox=["']([^"']+)["']/i);
        if (vb) {
          const parts = vb[1].trim().split(/[\s,]+/).map(Number);
          if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
            w = parts[2];
            h = parts[3];
          }
        }
      }
      // Scale down if too large
      if (w > maxW || h > maxH) {
        const scale = Math.min(maxW / w, maxH / h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }
      resolve({
        id: nanoid(10),
        type: "image",
        x,
        y,
        w,
        h,
        z,
        data: { src: dataUrl },
      } as ImageNode);
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

/**
 * Place an SVG string onto the canvas as an ImageNode.
 * Resolves the SVG dimensions and adds the node.
 */
export async function placeSvgOnCanvas(
  engine: SpatialEngine,
  svg: string,
  screenX: number,
  screenY: number,
): Promise<void> {
  const { x, y } = engine.screenToCanvas(screenX, screenY);
  const node = await svgTextToImageNode(svg, x, y, engine.nextZ());
  if (node) {
    engine.addNode(node);
    engine.select(node.id);
  }
}
