import type { StickyNoteNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
interface StickyNoteBlockProps {
    node: StickyNoteNode;
    isSelected: boolean;
    engine: SpatialEngine;
    interactive: boolean;
    zoom: number;
    editing: boolean;
    onEditStart: (id: string) => void;
    onEditEnd: () => void;
}
declare function StickyNoteBlock({ node, isSelected, engine, interactive, zoom, editing, onEditStart, onEditEnd, }: StickyNoteBlockProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof StickyNoteBlock>;
export default _default;
