import type { SpatialEngine } from "../engine/SpatialEngine";
interface BottomBarProps {
    engine: SpatialEngine;
    framesPanelOpen?: boolean;
    onToggleFramesPanel?: () => void;
}
export default function BottomBar({ engine, framesPanelOpen, onToggleFramesPanel }: BottomBarProps): import("react/jsx-runtime").JSX.Element;
export {};
