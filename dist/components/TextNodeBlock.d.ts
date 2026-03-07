import type { TextNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
declare function TextNodeBlock({ node, engine, editing, editClickPos, onStopEdit, onMeasuredHeight, }: {
    node: TextNode;
    engine: SpatialEngine;
    editing: boolean;
    editClickPos?: {
        clientX: number;
        clientY: number;
    } | null;
    onStopEdit: () => void;
    onMeasuredHeight?: (id: string, h: number) => void;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof TextNodeBlock>;
export default _default;
