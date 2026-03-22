/**
 * Live rectangle drag preview for frames, text nodes, content blocks (note tool), and sticky notes.
 * Matches SpatialCanvas local overlays (SVGLayer frame rect vs blue dashed text preview).
 */
export type RectDragKind = "frame" | "text" | "note" | "sticky";

export interface RectDragAwareness {
  kind: RectDragKind;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}
