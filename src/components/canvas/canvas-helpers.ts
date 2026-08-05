import type { Mode, SpatialNode, EdgeNode, HandleSide } from "../../engine/types";

/** Return black or white depending on which contrasts better with `hex`. */
export function contrastingTextColor(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) || 0;
  const g = parseInt(c.substring(2, 4), 16) || 0;
  const b = parseInt(c.substring(4, 6), 16) || 0;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? "#1e1e2e" : "#ffffff";
}

/** Ray-casting point-in-polygon test. */
export function pointInPolygon(px: number, py: number, polygon: Array<[number, number]>): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * Host render-scope membership (loop sub-canvas filter). A non-edge node is in
 * scope iff its id is in the set; an EDGE node is in scope iff BOTH its endpoints
 * are — so a boundary edge to a scoped-out node is hidden without dangling.
 */
export function hostNodeInScope(n: SpatialNode, ids: ReadonlySet<string>): boolean {
  if (n.type === "edge") {
    const d = (n.data ?? {}) as { fromId?: string; toId?: string };
    return !!d.fromId && !!d.toId && ids.has(d.fromId) && ids.has(d.toId);
  }
  return ids.has(n.id);
}

export function isExactEdgeConnectionDuplicate(
  data: EdgeNode["data"],
  candidate: {
    fromId: string;
    toId: string;
    sourceHandle?: HandleSide;
    targetHandle?: HandleSide;
    sourcePort?: string;
    targetPort?: string;
  },
): boolean {
  return (
    data.fromId === candidate.fromId &&
    data.toId === candidate.toId &&
    (data.sourceHandle ?? null) === (candidate.sourceHandle ?? null) &&
    (data.targetHandle ?? null) === (candidate.targetHandle ?? null) &&
    (data.sourcePort ?? null) === (candidate.sourcePort ?? null) &&
    (data.targetPort ?? null) === (candidate.targetPort ?? null)
  );
}

export function getCursorForMode(mode: Mode): string {
  switch (mode) {
    case "select":
      return "default";
    case "text":
      return "text";
    case "note":
      return "text";
    case "sticky":
      return "crosshair";
    case "table":
      return "crosshair";
    case "draw":
      return "crosshair";
    case "shape":
      return "crosshair";
    case "edge":
      return "crosshair";
    case "frame":
      return "crosshair";
    case "erase": {
      const size = 20;
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><circle cx='${size / 2}' cy='${size / 2}' r='${size / 2 - 1}' fill='none' stroke='%239ca3af' stroke-width='1.5'/></svg>`;
      return `url("data:image/svg+xml,${svg}") ${size / 2} ${size / 2}, crosshair`;
    }
    case "laser": {
      const size = 16;
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><circle cx='${size / 2}' cy='${size / 2}' r='3' fill='%23ef4444'/><circle cx='${size / 2}' cy='${size / 2}' r='${size / 2 - 1}' fill='none' stroke='%23ef4444' stroke-width='1' opacity='0.4'/></svg>`;
      return `url("data:image/svg+xml,${svg}") ${size / 2} ${size / 2}, crosshair`;
    }
    case "hand":
      return "grab";
    default:
      return "default";
  }
}

// Lasso cursor — a small lasso loop icon
export function pinchMetrics(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return { dist: Math.sqrt(dx * dx + dy * dy), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
}

export const LASSO_CURSOR = (() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>`;
  return `url("data:image/svg+xml,${svg}") 12 3, crosshair`;
})();
