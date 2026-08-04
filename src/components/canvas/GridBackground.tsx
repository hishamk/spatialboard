import { memo } from "react";
import type { CSSProperties } from "react";
import type { Viewport } from "../../engine/types";
import type { BoardBackground } from "../../engine/SpatialEngine";
import { getPaperType } from "../paper-types";
import { getBackgroundRenderer } from "./background-renderers";
import { quantizeViewportForRender } from "./viewport-quantize";

const SVG_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

// Promotes the static texture SVG to its own GPU compositor layer so the
// browser never repaints it during pan/zoom.
const STATIC_SVG_STYLE: CSSProperties = {
  ...SVG_STYLE,
  willChange: "transform",
};

/**
 * Static paper background — memoized on `background` so it never re-renders
 * during pan/zoom. Only re-renders when the user changes the paper type.
 */
const StaticBackground = memo(function StaticBackground({
  background,
}: {
  background: BoardBackground;
}) {
  const paper = getPaperType(background);
  const { staticDefs, staticLayers } = getBackgroundRenderer(background);

  return (
    <svg style={STATIC_SVG_STYLE}>
      {staticDefs && <defs>{staticDefs}</defs>}
      <rect width="100%" height="100%" fill={paper.canvasBg} />
      {staticLayers}
    </svg>
  );
});

/**
 * Renders the canvas background (paper texture) and an optional dot-grid
 * overlay. The grid is always the same standard dot pattern regardless of
 * paper type — it has nothing to do with the paper look.
 */
export default function GridBackground({
  viewport,
  gridSize = 20,
  background = "dot-grid",
  gridVisible = true,
}: {
  viewport: Viewport;
  gridSize?: number;
  background?: BoardBackground;
  gridVisible?: boolean;
}) {
  // Snapped translate keeps grid dots on the same device-pixel grid as the
  // content layers (see viewport-quantize.ts).
  const renderVp = quantizeViewportForRender(viewport);
  const scaledGrid = gridSize * renderVp.zoom;
  const patternX = renderVp.x % scaledGrid;
  const patternY = renderVp.y % scaledGrid;

  const paper = getPaperType(background);
  const dotColor = paper.group === "dark"
    ? "rgba(255,255,255,0.2)"
    : "rgba(0,0,0,0.15)";

  return (
    <>
      {/* Paper background — static, never repaints on pan/zoom */}
      <StaticBackground background={background} />

      {/* Dot-grid overlay — same for all paper types */}
      {gridVisible && (
        <svg style={SVG_STYLE}>
          <defs>
            <pattern
              id="grid-dots"
              x={patternX}
              y={patternY}
              width={scaledGrid}
              height={scaledGrid}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={scaledGrid / 2} cy={scaledGrid / 2} r={1.5} fill={dotColor} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dots)" />
        </svg>
      )}
    </>
  );
}
