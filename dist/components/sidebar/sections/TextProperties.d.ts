import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { TextNode } from "../../../engine/types";
interface TextPropertiesProps {
    engine: SpatialEngine;
    node: TextNode;
    fontsInScene: string[];
}
export default function TextProperties({ engine, node, fontsInScene }: TextPropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
