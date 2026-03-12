import type { Viewport } from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
/**
 * Renders the canvas background (paper texture) and an optional dot-grid
 * overlay. The grid is always the same standard dot pattern regardless of
 * paper type — it has nothing to do with the paper look.
 */
export default function GridBackground({ viewport, gridSize, background, gridVisible, }: {
    viewport: Viewport;
    gridSize?: number;
    background?: BoardBackground;
    gridVisible?: boolean;
}): import("react/jsx-runtime").JSX.Element;
