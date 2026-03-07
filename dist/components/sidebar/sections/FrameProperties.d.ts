import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { FrameNode } from "../../../engine/types";
interface FramePropertiesProps {
    engine: SpatialEngine;
    node: FrameNode;
}
export default function FrameProperties({ engine, node }: FramePropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
