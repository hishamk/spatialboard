import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { ToolKey } from "../../engine/types";
export default function ToolStrip({ engine, gifApiBaseUrl, tools }: {
    engine: SpatialEngine;
    gifApiBaseUrl?: string;
    tools?: ToolKey[];
}): import("react/jsx-runtime").JSX.Element;
/** Compact HORIZONTAL mode cluster for hosts that seat the tools in the
 *  BottomBar instead of the side rail (SpatialBoard `toolsInBottomBar`).
 *  Same MODE_KEYS / icons / active semantics as the rail, rendered as one
 *  row of BottomBar-sized (32px) buttons. The bar provides the pill chrome. */
export declare function ModeCluster({ engine, tools }: {
    engine: SpatialEngine;
    tools?: ToolKey[];
}): import("react/jsx-runtime").JSX.Element;
