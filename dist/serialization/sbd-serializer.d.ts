import type { SpatialNode } from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
export interface SerializeOptions {
    background?: BoardBackground;
    originView?: {
        x: number;
        y: number;
        zoom: number;
    };
    /** Returns the containing frame id for a node (frame-child relative
     *  coordinates). Omit to serialize every node with absolute coordinates. */
    parentOf?: (nodeId: string) => string | undefined;
}
export declare function serializeToSBD(nodes: SpatialNode[], options?: SerializeOptions): Promise<string>;
