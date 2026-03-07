import type { SpatialEngine } from "../../engine/SpatialEngine";
import { type KlipyItem } from "../../utils/klipy";
/** MIME type for drag-and-drop of GIF items */
export declare const GIF_ITEM_MIME = "application/x-spatialboard-gif-item";
declare function placeGif(engine: SpatialEngine, item: KlipyItem, screenX?: number, screenY?: number): void;
export { placeGif };
export default function GifSearchPanel({ engine, open, onClose, triggerRect, baseUrl, }: {
    engine: SpatialEngine;
    open: boolean;
    onClose: () => void;
    triggerRect: DOMRect | null;
    baseUrl: string;
}): import("react").ReactPortal | null;
