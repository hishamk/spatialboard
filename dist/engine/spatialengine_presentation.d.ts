import type { SpatialEngine } from "./SpatialEngine";
export declare function enterPresentation(engine: SpatialEngine): void;
export declare function exitPresentation(engine: SpatialEngine): void;
export declare function presentationNext(engine: SpatialEngine): void;
export declare function presentationPrev(engine: SpatialEngine): void;
export declare function presentationGoTo(engine: SpatialEngine, index: number): void;
/** Pan transition: smooth viewport interpolation (default). */
export declare function _transitionPan(engine: SpatialEngine, target: {
    x: number;
    y: number;
    zoom: number;
}, durationMs?: number): void;
/** None transition: instant viewport snap. */
export declare function _transitionNone(engine: SpatialEngine, target: {
    x: number;
    y: number;
    zoom: number;
}): void;
