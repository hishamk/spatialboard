export interface FreehandOptions {
    size?: number;
    thinning?: number;
    smoothing?: number;
    streamline?: number;
}
export declare function getStrokePath(points: Array<[number, number, number]> | undefined | null, options?: FreehandOptions): string;
/**
 * Replicate perfect-freehand's streamline smoothing (EMA filter) so that
 * fill boundaries track the stroke center line exactly.
 */
export declare function streamlinePoints(points: [number, number][], streamline?: number): [number, number][];
/**
 * Build a smooth closed path through points using quadratic curves.
 * Applies streamline filter so fill tracks the stroke center line.
 */
export declare function getSmoothClosedPath(points: [number, number][], streamline?: number): string;
