import type { Viewport } from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
import { getPaperType } from "./paper-types";
import { getBackgroundRenderer } from "./background-renderers";

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
  const scaledGrid = gridSize * viewport.zoom;
  const patternX = viewport.x % scaledGrid;
  const patternY = viewport.y % scaledGrid;

  const paper = getPaperType(background);
  const render = getBackgroundRenderer(background);
  const { defs, layers } = render({ scaledGrid, patternX, patternY });

  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>{defs}</defs>
      <rect width="100%" height="100%" fill={paper.canvasBg} />
      {gridVisible && layers}
    </svg>
  );
}
