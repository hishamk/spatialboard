import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { SpatialNode } from "../../../engine/types";
interface CustomNodePropertiesProps {
    engine: SpatialEngine;
    node: SpatialNode;
    PanelComponent: React.ComponentType<any>;
}
export default function CustomNodeProperties({ engine, node, PanelComponent }: CustomNodePropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
