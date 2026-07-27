import type { SpatialNode } from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
export interface SBDParseResult {
    nodes: SpatialNode[];
    meta: {
        /** Format version from `sbd="N"` in @meta; 2 when absent. */
        version?: number;
        background?: BoardBackground;
        originView?: {
            x: number;
            y: number;
            zoom: number;
        };
    };
    /** Non-fatal problems encountered while parsing (bad JSON in a custom node,
     *  a `parent` reference to a missing node, …). Never silently dropped. */
    warnings: string[];
}
export declare function parseSBD(sbd: string): Promise<SBDParseResult>;
