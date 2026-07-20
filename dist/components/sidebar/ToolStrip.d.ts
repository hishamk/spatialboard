import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { ToolKey } from "../../engine/types";
export default function ToolStrip({ engine, gifApiBaseUrl, tools }: {
    engine: SpatialEngine;
    gifApiBaseUrl?: string;
    tools?: ToolKey[];
}): import("react/jsx-runtime").JSX.Element;
