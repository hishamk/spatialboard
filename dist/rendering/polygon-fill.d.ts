export interface EnclosedRegion {
    pathD: string;
    points: [number, number][];
}
/**
 * Find enclosed regions created by self-intersections of an open polyline.
 * Directly detects where the path crosses itself and extracts the loops,
 * avoiding the need to close the path with an artificial chord.
 */
export declare function getEnclosedRegionsFromPath(points: [number, number][]): EnclosedRegion[];
