import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { StickyNoteNode } from "../../../engine/types";
interface StickyPropertiesProps {
    engine: SpatialEngine;
    node: StickyNoteNode;
}
export default function StickyProperties({ engine, node }: StickyPropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
