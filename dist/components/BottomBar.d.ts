import type { SpatialEngine } from "../engine/SpatialEngine";
interface BottomBarProps {
    engine: SpatialEngine;
    framesPanelOpen?: boolean;
    onToggleFramesPanel?: () => void;
    showPerfOverlay?: boolean;
    onTogglePerfOverlay?: () => void;
}
export default function BottomBar({ engine, framesPanelOpen, onToggleFramesPanel, showPerfOverlay, onTogglePerfOverlay, }: BottomBarProps): import("react/jsx-runtime").JSX.Element;
export {};
