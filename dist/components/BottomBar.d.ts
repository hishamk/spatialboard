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
    /** Host-supplied control rendered as the FIRST segment of the bar (e.g. the
     *  workflow "Add node" button) so it reads as part of the toolbar rather than a
     *  floating overlay. Styles/behaviour are the host's; the bar just seats it. */
    leadingSlot?: React.ReactNode;
}
export default function BottomBar({ engine, tools, framesPanelOpen, onToggleFramesPanel, showMinimap, onToggleMinimap, showPerfOverlay, onTogglePerfOverlay, leadingSlot, }: BottomBarProps): import("react/jsx-runtime").JSX.Element;
export {};
