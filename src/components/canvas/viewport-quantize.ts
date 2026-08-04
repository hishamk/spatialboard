import type { Viewport } from "../../engine/types";

/**
 * Snap a viewport's translate to WHOLE CSS pixels for RENDERING.
 *
 * The board paints through two raster contexts that must agree pixel-for-pixel:
 * the CSS-transformed DOM node layer (composited) and the overlay SVG (inline,
 * subpixel-exact). With a fractional pan the compositor and the SVG rasterizer
 * resolve the same translate to different device pixels, so content that moves
 * between the contexts — a freehand/shape preview committing into a node —
 * visibly nudges on mouse-up.
 *
 * Integer CSS pixels, not 1/devicePixelRatio: on a 2x display a half-CSS-pixel
 * translate is device-pixel-aligned on paper, but the compositor still resolves
 * it against the overlay SVG one device pixel apart (measured on Chromium).
 * Whole CSS pixels raster identically in both contexts at every DPR, and a
 * 1-CSS-px pan quantum matches ordinary wheel/drag deltas anyway.
 *
 * Rounding the translate (never the zoom) at every transform-build site keeps
 * both contexts on the same grid. Engine viewport state stays fractional and
 * exact — this is presentation-only, so camera math, hit-testing, and any
 * persisted viewport values are untouched; the render-vs-hit offset is bounded
 * by half a CSS pixel.
 */
export function quantizeViewportForRender(viewport: Viewport): Viewport {
  return {
    x: Math.round(viewport.x),
    y: Math.round(viewport.y),
    zoom: viewport.zoom,
  };
}
