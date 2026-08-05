/**
 * Live rectangle drag preview for frames, text nodes, content blocks (note tool),
 * sticky notes, and tables.
 * Matches SpatialCanvas local overlays (SVGLayer frame rect vs blue dashed text preview).
 */
export type RectDragKind = "frame" | "text" | "note" | "sticky" | "table";

export interface RectDragAwareness {
  kind: RectDragKind;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
