import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ImageNode } from "../../../engine/types";
interface ImagePropertiesProps {
    engine: SpatialEngine;
    node: ImageNode;
}
export default function ImageProperties({ engine, node }: ImagePropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
