import type { DrawNode, ShapeNode } from "../engine/types";
/**
 * Lightweight placeholder for draw/shape nodes when zoomed out.
 * Renders a simple rect instead of full SVG path / rough.js output.
 */
declare function SVGNodeBlockPlaceholder({ node, }: {
    node: DrawNode | ShapeNode;
}): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof SVGNodeBlockPlaceholder>;
export default _default;
