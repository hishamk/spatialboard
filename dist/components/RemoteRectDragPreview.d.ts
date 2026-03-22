import type { JSX } from "react";
import type { RectDragAwareness } from "../collab/rect-drag-awareness";
/**
 * Canvas-space rect: frame uses SVGLayer frame style; text/note/sticky use the blue drag preview.
 */
export declare function RemoteRectDragPreview({ preview, zoom, }: {
    preview: RectDragAwareness;
    zoom: number;
}): JSX.Element | null;
