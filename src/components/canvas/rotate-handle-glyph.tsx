/**
 * Circular-arrow rotate glyph shared by every selection chrome that shows a
 * rotation handle: the SVG chromes (SelectionBox, SelectionChromeOverlay) and
 * the DOM block chromes (BlockNoteBlock, ImageBlock).
 *
 * Authored in a 20×20 box centered at (10,10): a 270° arc of radius 7 with
 * the gap at bottom-right and a filled arrowhead tangent to the clockwise
 * end. The white under-strokes keep the glyph legible over node content —
 * the same job the old diamond's white fill did.
 */

const GLYPH_BOX = 20;
const ARC = "M 3.94 13.5 A 7 7 0 1 1 13.5 16.06";
const ARROW = "M 9.6 18.31 L 12.3 13.98 L 14.7 18.14 Z";

export function RotateGlyphPaths({ color = "#3b82f6" }: { color?: string }) {
  return (
    <>
      <path d={ARC} fill="none" stroke="white" strokeWidth={4.4} strokeLinecap="round" />
      <path d={ARROW} fill="white" stroke="white" strokeWidth={2.4} strokeLinejoin="round" />
      <path d={ARC} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <path d={ARROW} fill={color} />
    </>
  );
}

/** SVG-chrome variant: renders at (cx, cy) in canvas units, pixel-stable across zoom. */
export function RotateHandleGlyph({
  cx,
  cy,
  zoom,
  sizePx = 16,
  color,
}: {
  cx: number;
  cy: number;
  zoom: number;
  sizePx?: number;
  color?: string;
}) {
  const s = sizePx / zoom;
  return (
    <g
      transform={`translate(${cx - s / 2}, ${cy - s / 2}) scale(${s / GLYPH_BOX})`}
      style={{ pointerEvents: "none" }}
    >
      <RotateGlyphPaths color={color} />
    </g>
  );
}

/** DOM-chrome variant: a standalone <svg>; pass size in the caller's CSS units. */
export function RotateHandleIcon({ size, color }: { size: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${GLYPH_BOX} ${GLYPH_BOX}`}
      style={{ display: "block", pointerEvents: "none" }}
    >
      <RotateGlyphPaths color={color} />
    </svg>
  );
}
