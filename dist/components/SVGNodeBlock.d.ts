import type { DrawNode, ShapeNode } from "../engine/types";
/**
 * Renders an individual draw or shape node as a positioned <svg> element
 * in the DOM layer, so it can share z-index stacking with content blocks.
 */
declare function SVGNodeBlock({ node, editingLabel }: {
    node: DrawNode | ShapeNode;
    editingLabel?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof SVGNodeBlock>;
export default _default;
