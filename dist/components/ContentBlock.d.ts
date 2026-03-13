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
    /** Only true on the machine that just created this block locally. Prevents
     *  remote observers from auto-entering edit mode for a collaborator's new block,
     *  which would cause them to skip incoming Yjs syncs (editing=true guard). */
    autoEdit?: boolean;
}
declare function ContentBlock({ node, isSelected, multiSelected, engine, schema, interactive, zoom, onMeasuredHeight, autoEdit, }: ContentBlockProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ContentBlock>;
export default _default;
