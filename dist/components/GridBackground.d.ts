import type { Viewport } from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
export default function GridBackground({ viewport, gridSize, background, gridVisible, }: {
    viewport: Viewport;
    gridSize?: number;
    background?: BoardBackground;
    gridVisible?: boolean;
}): import("react/jsx-runtime").JSX.Element;
