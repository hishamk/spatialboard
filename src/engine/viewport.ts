import type { Viewport } from "./types";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function screenToCanvas(
  viewport: Viewport,
  sx: number,
  sy: number
): { x: number; y: number } {
  return {
    x: (sx - viewport.x) / viewport.zoom,
    y: (sy - viewport.y) / viewport.zoom,
  };
}

export function canvasToScreen(
  viewport: Viewport,
  cx: number,
  cy: number
): { x: number; y: number } {
  return {
    x: cx * viewport.zoom + viewport.x,
    y: cy * viewport.zoom + viewport.y,
  };
}

export function applyZoom(
  viewport: Viewport,
  delta: number,
  anchorScreenX: number,
  anchorScreenY: number
): Viewport {
  const zoomFactor = delta > 0 ? 0.95 : 1.05;
  const newZoom = clamp(viewport.zoom * zoomFactor, 0.1, 5);
  const canvasPoint = screenToCanvas(viewport, anchorScreenX, anchorScreenY);
  return {
    x: anchorScreenX - canvasPoint.x * newZoom,
    y: anchorScreenY - canvasPoint.y * newZoom,
    zoom: newZoom,
  };
}

export function applyZoomFactor(
  viewport: Viewport,
  factor: number,
  anchorScreenX: number,
  anchorScreenY: number
): Viewport {
  const newZoom = clamp(viewport.zoom * factor, 0.1, 5);
  const canvasPoint = screenToCanvas(viewport, anchorScreenX, anchorScreenY);
  return {
    x: anchorScreenX - canvasPoint.x * newZoom,
    y: anchorScreenY - canvasPoint.y * newZoom,
    zoom: newZoom,
  };
}
