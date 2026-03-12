import type { ReactNode } from "react";
import type { BoardBackground } from "../engine/SpatialEngine";
/**
 * A paper renderer returns only static background content — texture filters
 * and the rects that use them. No grid, no viewport-dependent values.
 *
 * The grid is a separate, uniform dot-grid overlay rendered by GridBackground
 * regardless of which paper type is active.
 */
export interface RendererResult {
    /** SVG filter definitions (e.g. feTurbulence). Never depend on the viewport. */
    staticDefs?: ReactNode;
    /** Background rects that apply the filters above. Never depend on the viewport. */
    staticLayers?: ReactNode[];
}
export declare function getBackgroundRenderer(bg: BoardBackground): RendererResult;
