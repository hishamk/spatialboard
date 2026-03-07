export interface RoughPathData {
    d: string;
    stroke: string;
    strokeWidth: number;
    fill: string | undefined;
    strokeDasharray?: string;
}
export interface RoughShapeOptions {
    stroke: string;
    fill?: string;
    fillStyle?: string;
    roughness: number;
    strokeWidth: number;
    strokeLineDash?: number[];
    seed?: string;
}
/** Compute the border radius for a rounded rect, as a fraction of the shorter side. */
export declare function roundedRectRadius(w: number, h: number): number;
export declare function getRoughRectPaths(x: number, y: number, w: number, h: number, options: RoughShapeOptions, rounded?: boolean): RoughPathData[];
export declare function getRoughEllipsePaths(cx: number, cy: number, w: number, h: number, options: RoughShapeOptions): RoughPathData[];
export declare function getRoughDiamondPaths(x: number, y: number, w: number, h: number, options: RoughShapeOptions, rounded?: boolean): RoughPathData[];
export declare function getRoughLinePaths(x1: number, y1: number, x2: number, y2: number, options: RoughShapeOptions): RoughPathData[];
export declare function getRoughArrowPaths(x1: number, y1: number, x2: number, y2: number, options: RoughShapeOptions): RoughPathData[];
/** Get roughjs fill-only paths for an arbitrary polygon (no outline stroke) */
export declare function getRoughPolygonFillPaths(points: [number, number][], options: RoughShapeOptions): RoughPathData[];
/** Roughen an arbitrary SVG path string (e.g. a computed edge path). */
export declare function getRoughPathPaths(d: string, options: RoughShapeOptions): RoughPathData[];
/** Convert strokeStyle string to roughjs strokeLineDash array */
export declare function strokeStyleToDash(style?: "solid" | "dashed" | "dotted"): number[] | undefined;
