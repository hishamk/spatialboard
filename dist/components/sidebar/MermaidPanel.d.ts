import type { SpatialEngine } from "../../engine/SpatialEngine";
export default function MermaidPanel({ engine, open, onClose, triggerRect, }: {
    engine: SpatialEngine;
    open: boolean;
    onClose: () => void;
    triggerRect: DOMRect | null;
}): import("react").ReactPortal | null;
