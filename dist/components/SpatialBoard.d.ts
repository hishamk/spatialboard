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
    /**
     * Whether the host surface (e.g. the app panel embedding this board) is the
     * active/frontmost one. Only affects the popped-out inspector: when false it
     * hides so it doesn't float over unrelated content. Defaults to true.
     */
    hostActive?: boolean;
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
    /**
     * Read-only thumbnail mode: no sidebar (when toolbar is false), search bar, bottom bar,
     * frames panel, minimap, performance overlay, or presentation overlay. After `initialData`
     * loads, the viewport is fitted to content. Intended for embedded previews (e.g. file browser).
     */
    preview?: boolean;
    /**
     * Read-only viewer mode. Sets `engine.readOnly = true` so every local
     * doc-mutating method (addNode/updateNode/deleteNode/etc.) is a no-op, and hides
     * the sidebar (creation tool strip) + bottom bar (frames panel toggle, minimap
     * controls) since their affordances would silently fail.
     *
     * Differs from `preview`: `preview` is for thumbnails (auto-fits viewport, hides
     * everything including the search bar). `readOnly` is for viewers who can still
     * pan, zoom, search, and select to inspect the board — they just can't change it.
     *
     * Remote-op methods (`addRemoteNode`, etc.) are NOT guarded — incoming sync from
     * peers still applies, so viewers see live edits from collaborators.
     */
    readOnly?: boolean;
    /**
     * Render only this frame and its children. Hides everything else.
     * Viewport is auto-fitted to the frame. Used for flashcard study mode.
     */
    singleFrameId?: string;
}
export default function SpatialBoard({ nodeTypes, engine: externalEngine, keyboardShortcuts, style, initialData, toolbar: showSidebar, debugPanel: showDebugPanel, debugBoards, theme, onPresentationChange, gifApiBaseUrl, hostActive, direction, localization, dataFlowEdgeOverlay, initialFramesPanelOpen, preview: isPreview, readOnly, singleFrameId, }: SpatialBoardProps): import("react/jsx-runtime").JSX.Element;
