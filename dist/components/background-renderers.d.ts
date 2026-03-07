import type { ReactNode } from "react";
import type { BoardBackground } from "../engine/SpatialEngine";
export interface RendererResult {
    defs: ReactNode;
    layers: ReactNode[];
}
interface RendererInput {
    scaledGrid: number;
    patternX: number;
    patternY: number;
}
export declare function getBackgroundRenderer(bg: BoardBackground): (input: RendererInput) => RendererResult;
export {};
