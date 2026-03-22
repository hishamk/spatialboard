import type { SpatialEngine } from "../engine/SpatialEngine";
import type { SpatialNode, Viewport } from "../engine/types";
export interface MinimapProps {
    engine: SpatialEngine;
    nodes: SpatialNode[];
    viewport: Viewport;
    containerSize: {
        w: number;
        h: number;
    };
    measuredHeights: Record<string, number>;
}
export default function Minimap({ engine, nodes, viewport, containerSize, measuredHeights, }: MinimapProps): import("react/jsx-runtime").JSX.Element | null;
