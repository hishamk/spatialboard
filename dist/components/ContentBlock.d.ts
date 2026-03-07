import "@blocknote/mantine/style.css";
import type { ContentNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { SBDSchema } from "../schema";
interface ContentBlockProps {
    node: ContentNode;
    isSelected: boolean;
    multiSelected: boolean;
    engine: SpatialEngine;
    schema: SBDSchema;
    interactive: boolean;
    zoom: number;
    onMeasuredHeight?: (nodeId: string, height: number) => void;
}
declare function ContentBlock({ node, isSelected, multiSelected, engine, schema, interactive, zoom, onMeasuredHeight, }: ContentBlockProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ContentBlock>;
export default _default;
