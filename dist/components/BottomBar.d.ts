import type { SpatialEngine } from "../engine/SpatialEngine";
interface BottomBarProps {
    engine: SpatialEngine;
    framesPanelOpen?: boolean;
    onToggleFramesPanel?: () => void;
    showMinimap?: boolean;
    onToggleMinimap?: () => void;
    showPerfOverlay?: boolean;
    onTogglePerfOverlay?: () => void;
}
export default function BottomBar({ engine, framesPanelOpen, onToggleFramesPanel, showMinimap, onToggleMinimap, showPerfOverlay, onTogglePerfOverlay, }: BottomBarProps): import("react/jsx-runtime").JSX.Element;
export {};
