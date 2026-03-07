import type { SpatialEngine } from "../engine/SpatialEngine";
interface FramesPanelProps {
    engine: SpatialEngine;
    open: boolean;
    onClose: () => void;
}
export default function FramesPanel({ engine, open, onClose }: FramesPanelProps): import("react/jsx-runtime").JSX.Element;
export {};
