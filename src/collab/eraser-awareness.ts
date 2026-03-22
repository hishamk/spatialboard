/**
 * Live eraser drag for Yjs awareness — trail + IDs marked for deletion (matches local SVGLayer + DOM dim).
 */
export interface EraserAwareness {
  /** Canvas points with Date.now() ms timestamps (wall clock — comparable across peers; not performance.now()). */
  trail?: Array<[number, number, number]>;
  /** Node IDs currently hit by the eraser stroke. */
  markedIds: string[];
}
