import type { SpatialEngine } from "../engine/SpatialEngine";
import type { ToolKey } from "../engine/types";
interface BottomBarProps {
    engine: SpatialEngine;
    /** Toolbar-visibility allowlist (undefined ⇒ all controls). When it omits
     *  `frame` the present + slides-panel controls are hidden (a graph has no
     *  slides); zoom, fit, minimap, and undo/redo always stay. */
    tools?: ToolKey[];
    framesPanelOpen?: boolean;
    onToggleFramesPanel?: () => void;
    showMinimap?: boolean;
    onToggleMinimap?: () => void;
    showPerfOverlay?: boolean;
    onTogglePerfOverlay?: () => void;
}
export default function BottomBar({ engine, tools, framesPanelOpen, onToggleFramesPanel, showMinimap, onToggleMinimap, showPerfOverlay, onTogglePerfOverlay, }: BottomBarProps): import("react/jsx-runtime").JSX.Element;
export {};
