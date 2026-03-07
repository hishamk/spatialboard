import type { SpatialNode } from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
export interface SerializeOptions {
    background?: BoardBackground;
    originView?: {
        x: number;
        y: number;
        zoom: number;
    };
}
export declare function serializeToSBD(nodes: SpatialNode[], options?: SerializeOptions): Promise<string>;
