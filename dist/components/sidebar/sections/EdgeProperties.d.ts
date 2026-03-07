import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { EdgeNode } from "../../../engine/types";
interface EdgePropertiesProps {
    engine: SpatialEngine;
    node: EdgeNode;
}
export default function EdgeProperties({ engine, node }: EdgePropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
