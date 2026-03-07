import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ContentNode } from "../../../engine/types";
interface ContentPropertiesProps {
    engine: SpatialEngine;
    node: ContentNode;
}
export default function ContentProperties({ engine, node }: ContentPropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
