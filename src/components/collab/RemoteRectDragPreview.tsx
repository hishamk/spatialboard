import type { JSX } from "react";
import type { RectDragAwareness } from "../../collab/rect-drag-awareness";

/**
 * Canvas-space rect: frame uses SVGLayer frame style; text/note/sticky use the blue drag preview.
 */
export function RemoteRectDragPreview({
  preview,
  zoom,
}: {
  preview: RectDragAwareness;
  zoom: number;
}): JSX.Element | null {
  const x = Math.min(preview.startX, preview.endX);
  const y = Math.min(preview.startY, preview.endY);
  const w = Math.abs(preview.endX - preview.startX);
  const h = Math.abs(preview.endY - preview.startY);
  if (w < 2 && h < 2) return null;

  if (preview.kind === "frame") {
    return (
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        stroke="#1e1e2e"
        strokeWidth={1}
      />
    );
  }

  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill="rgba(59,130,246,0.06)"
      stroke="#3b82f6"
      strokeWidth={1.5 / zoom}
      strokeDasharray={`${4 / zoom}`}
      rx={8 / zoom}
    />
  );
}
