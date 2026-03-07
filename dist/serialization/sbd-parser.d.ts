import type { SpatialNode } from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
export interface SBDParseResult {
    nodes: SpatialNode[];
    meta: {
        background?: BoardBackground;
        originView?: {
            x: number;
            y: number;
            zoom: number;
        };
    };
}
export declare function parseSBD(sbd: string): Promise<SBDParseResult>;
