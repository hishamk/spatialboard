import type { BoardBackground } from "../engine/SpatialEngine";
export type PaperGroup = "light" | "dark" | "textured";
export interface PaperTypeConfig {
    key: BoardBackground;
    label: string;
    group: PaperGroup;
    canvasBg: string;
    swatchColor: string;
}
export declare const PAPER_TYPES: PaperTypeConfig[];
export declare function getPaperType(key: BoardBackground): PaperTypeConfig;
