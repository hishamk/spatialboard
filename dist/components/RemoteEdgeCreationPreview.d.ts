import type { JSX } from "react";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { EdgeCreationAwareness } from "../collab/edge-creation-awareness";
/**
 * Renders the same edge-creation preview as SVGLayer (snap, ports, path, arrowhead, dots).
 * Consumes awareness payload + live engine nodes/registry/measured heights.
 */
export declare function RemoteEdgeCreationPreview({ preview, engine, zoom, }: {
    preview: EdgeCreationAwareness;
    engine: SpatialEngine;
    zoom: number;
}): JSX.Element | null;
