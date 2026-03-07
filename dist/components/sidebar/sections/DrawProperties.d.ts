import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { DrawNode } from "../../../engine/types";
interface DrawPropertiesProps {
    engine: SpatialEngine;
    node: DrawNode;
}
export default function DrawProperties({ engine, node }: DrawPropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
