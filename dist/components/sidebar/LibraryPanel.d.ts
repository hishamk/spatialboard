import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { ExcalidrawLibraryItem } from "../../excalidraw/types";
import { type PersonalLibraryItem } from "../../store/personal-library";
/**
 * Place a library item on the canvas.
 * If screenX/screenY are provided, the item is centered at that screen position.
 * Otherwise it's centered at the viewport center.
 */
export declare function placeLibraryItem(engine: SpatialEngine, item: ExcalidrawLibraryItem, screenX?: number, screenY?: number): void;
/** MIME type for drag-and-drop of library items */
export declare const LIBRARY_ITEM_MIME = "application/x-spatialboard-library-item";
/** MIME type for drag-and-drop of personal library items */
export declare const PERSONAL_ITEM_MIME = "application/x-spatialboard-personal-item";
/**
 * Place a personal library item on the canvas.
 */
export declare function placePersonalItem(engine: SpatialEngine, item: PersonalLibraryItem, screenX?: number, screenY?: number): void;
export default function LibraryPanel({ engine, open, onClose, triggerRect, onBrowseDirectory, }: {
    engine: SpatialEngine;
    open: boolean;
    onClose: () => void;
    triggerRect: DOMRect | null;
    onBrowseDirectory: () => void;
}): import("react").ReactPortal | null;
