import type { ImageNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { HandlePosition } from "./SVGLayer";
interface ImageBlockProps {
    node: ImageNode;
    isSelected: boolean;
    engine: SpatialEngine;
    interactive: boolean;
    zoom: number;
    onResizeHandleDown?: (nodeId: string, handle: HandlePosition, e: React.PointerEvent<HTMLElement>) => void;
    cropping?: boolean;
    onCropStart?: () => void;
    onCropEnd?: () => void;
}
declare function ImageBlock({ node, isSelected, engine, interactive, zoom, onResizeHandleDown, cropping, onCropStart, onCropEnd, }: ImageBlockProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ImageBlock>;
export default _default;
