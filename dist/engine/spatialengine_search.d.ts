import type { SpatialEngine, SpatialSearchState } from "./SpatialEngine";
export declare function getSearchState(engine: SpatialEngine): SpatialSearchState;
export declare function setSearchQuery(engine: SpatialEngine, query: string): void;
export declare function clearSearch(engine: SpatialEngine): void;
export declare function setSearchActiveIndex(engine: SpatialEngine, index: number): void;
export declare function searchNext(engine: SpatialEngine): void;
export declare function searchPrev(engine: SpatialEngine): void;
export declare function focusSearchResult(engine: SpatialEngine, index: number, options?: {
    select?: boolean;
    center?: boolean;
    minZoom?: number;
}): void;
export declare function focusActiveSearchResult(engine: SpatialEngine, options?: {
    select?: boolean;
    center?: boolean;
    minZoom?: number;
}): void;
export declare function refreshSearchIfNeeded(engine: SpatialEngine): void;
