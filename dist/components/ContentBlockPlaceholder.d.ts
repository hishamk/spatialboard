import type { ContentNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
interface ContentBlockPlaceholderProps {
    node: ContentNode;
    isSelected: boolean;
    engine: SpatialEngine;
    interactive: boolean;
    zoom: number;
    /** Resolved height (use measuredHeights when auto) so placeholder matches ContentBlock size */
    height: number;
    onZoomToNode: (nodeId: string) => void;
}
/**
 * Lightweight placeholder for content blocks when zoomed out.
 * Avoids mounting BlockNote (ProseMirror, etc.) for nodes that appear small on screen.
 * Double-click zooms to the node so the full ContentBlock can be used.
 */
declare function ContentBlockPlaceholder({ node, isSelected, engine, interactive, zoom, height, onZoomToNode, }: ContentBlockPlaceholderProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ContentBlockPlaceholder>;
export default _default;
