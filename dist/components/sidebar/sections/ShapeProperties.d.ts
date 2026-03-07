import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ShapeNode } from "../../../engine/types";
interface ShapePropertiesProps {
    engine: SpatialEngine;
    node: ShapeNode;
    fontsInScene: string[];
}
export default function ShapeProperties({ engine, node, fontsInScene }: ShapePropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
