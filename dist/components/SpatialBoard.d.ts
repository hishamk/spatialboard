import { SpatialEngine } from "../engine/SpatialEngine";
import type { DataFlowEdgeOverlay } from "./SVGLayer";
import type { DebugBoardEntry } from "./DebugPanel";
import type { NodeTypeDefinition } from "../nodes/registry";
import type { SpatialBoardTheme } from "./sidebar/ThemeContext";
import { type SpatialBoardDirection, type SpatialBoardLocalization } from "./LocalizationContext";
export interface SpatialBoardProps {
    /** Node type definitions. Defaults to all built-in types. */
    nodeTypes?: NodeTypeDefinition<any>[];
    /** Provide your own engine instance (advanced usage). */
    engine?: SpatialEngine;
    /** Enable keyboard shortcuts. Default: true. */
    keyboardShortcuts?: boolean;
    /** Container style overrides. */
    style?: React.CSSProperties;
    /** Initial SBD data to load. */
    initialData?: string;
    /** Show sidebar (tools + properties). Default: true. */
    toolbar?: boolean;
    /** @deprecated Properties are now part of the sidebar. This prop is ignored. */
    propertiesPanel?: boolean;
    /** Show debug panel. Default: false. */
    debugPanel?: boolean;
    /** Extra board loaders for the debug panel. */
    debugBoards?: DebugBoardEntry[];
    /** Theme overrides for sidebar and properties panel UI. */
    theme?: Partial<SpatialBoardTheme>;
    /** Callback fired when presentation mode is entered or exited. */
    onPresentationChange?: (presenting: boolean) => void;
    /** Base URL for GIF search API proxy (e.g. "/api/v1/gifs"). */
    gifApiBaseUrl?: string;
    /** Layout direction for board chrome (sidebar/panels): ltr, rtl, or auto (uses document direction). */
    direction?: SpatialBoardDirection;
    /** Override UI labels for board chrome. */
    localization?: Partial<SpatialBoardLocalization>;
    /**
     * When data-flow is active (`nodeTypes` with ports): optional captions on port edges.
     * `ports` shows `sourcePort → targetPort`. `ports+compute` adds the target node's last `compute` wall time.
     * Wires themselves are instantaneous — the timer is always for the **downstream** node's `compute`.
     */
    dataFlowEdgeOverlay?: DataFlowEdgeOverlay;
    /** Open the frames/slides panel on mount. Default: false. */
    initialFramesPanelOpen?: boolean;
}
export default function SpatialBoard({ nodeTypes, engine: externalEngine, keyboardShortcuts, style, initialData, toolbar: showSidebar, debugPanel: showDebugPanel, debugBoards, theme, onPresentationChange, gifApiBaseUrl, direction, localization, dataFlowEdgeOverlay, initialFramesPanelOpen, }: SpatialBoardProps): import("react/jsx-runtime").JSX.Element;
