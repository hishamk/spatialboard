import type { YouTubeNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { HandlePosition } from "./SVGLayer";
interface YouTubeBlockProps {
    node: YouTubeNode;
    isSelected: boolean;
    engine: SpatialEngine;
    interactive: boolean;
    zoom: number;
    editing?: boolean;
    onResizeHandleDown?: (nodeId: string, handle: HandlePosition, e: React.PointerEvent<HTMLElement>) => void;
    onEditStart?: () => void;
    onEditEnd?: () => void;
}
declare function YouTubeBlock({ node, isSelected, engine, interactive, zoom, editing, onResizeHandleDown, onEditStart, }: YouTubeBlockProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof YouTubeBlock>;
export default _default;
