import { SpatialEngine } from "../engine/SpatialEngine";
import type { DataFlowEdgeOverlay } from "./SVGLayer";
import type { DebugBoardEntry } from "./DebugPanel";
import type { NodeTypeDefinition } from "../nodes/registry";
import type { SpatialBoardTheme } from "./sidebar/ThemeContext";
import { type SpatialBoardDirection, type SpatialBoardLocalization } from "./LocalizationContext";
/** Port-drag released on empty canvas (see `onPortConnectEmpty`). */
export type PortConnectEmptyEvent = {
    nodeId: string;
    portId: string;
    direction: "input" | "output";
    canvasX: number;
    canvasY: number;
    clientX: number;
    clientY: number;
};
import type { ToolKey } from "../engine/types";
export interface SpatialBoardProps {
    /** Node type definitions. Defaults to all built-in types. */
    /**
     * Node type catalog for this board. Default: spatialboard built-ins.
     * When a host passes a custom list (e.g. workflow `wf-*` kinds), it is
     * **merged** with the built-ins — host entries override the same `type` —
     * so toolbar tools that still create built-ins (`sticky` / Note, text, …)
     * keep resolving. Passing the default alone is unchanged.
     */
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
    /**
     * Allowlist of which toolbar tools render. Omitted (default) ⇒ every tool
     * renders ⇒ the canvas item type is byte-identical. When provided, only the
     * listed `ToolKey`s show in the ToolStrip (creation modes + lasso + the
     * content pickers), and the BottomBar's present/slides controls are hidden
     * unless `frame` is listed. Used by the workflow Flow tab to surface only
     * `['select', 'hand', 'sticky']`. Mirrors the additive dynamic-ports
     * precedent: widen the lib, keep the canvas path on the defaults.
     */
    tools?: ToolKey[];
    /**
     * Whether the built-in floating node inspector (`FloatingProperties`) renders.
     * Default: true (canvas unchanged). A host that provides its own docked
     * inspector (the workflow Flow tab) passes `false` to retire the floating
     * overlay so there is exactly one inspector.
     */
    nodeInspector?: boolean;
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
    /**
     * When false, hide the In/Out (etc.) label pills next to port dots.
     * Dots stay interactive. Default true.
     */
    showPortLabels?: boolean;
    /**
     * Fired when a port-drag is released on empty canvas (no compatible port
     * under the cursor). Hosts can open an "add node" picker and wire the new
     * node to the source port — competitor-style port→menu gesture.
     */
    onPortConnectEmpty?: (event: PortConnectEmptyEvent) => void;
    /**
     * Keep the rubber-band edge + skeleton ghost visible while the host's
     * add-node menu is open (set true after `onPortConnectEmpty`, false on close).
     */
    portConnectHold?: boolean;
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
    /**
     * Host-supplied render scope: when non-null, render ONLY the nodes whose id is
     * in this set (and only edges whose BOTH endpoints are in the set). `null`/
     * omitted = today's behavior (render everything). Purely a render filter — the
     * engine still owns the full graph (serialize is unaffected). Used by the
     * workflow Loop node's nested sub-canvas (scope into a loop's body). Composable
     * with (independent of) `singleFrameId`.
     */
    visibleNodeIds?: ReadonlySet<string> | null;
    /**
     * Host-supplied EPHEMERAL overlay nodes rendered ON TOP of the engine's graph
     * (cards + edges) but NEVER added to the engine — so serialize/history/undo are
     * completely unaffected. Rendered through the SAME card/port/edge pipeline
     * (SVGLayer resolves endpoints from the render list, not the engine). Used by
     * the workflow Loop node's scoped mini-flow (synthetic Start/End frame cards).
     * The host owns their lifecycle; they carry no persistence.
     */
    overlayNodes?: readonly import("../engine/types").SpatialNode[] | null;
    /** Host control seated as the FIRST segment of the BottomBar (e.g. the workflow
     *  "Add node" button), so it reads as part of the toolbar. */
    bottomBarLeading?: React.ReactNode;
    /** Seat the mode tools (per `tools` allowlist) in the BottomBar as a pill
     *  segment INSTEAD of the vertical side rail — the rail is not rendered.
     *  Keyboard shortcuts and the floating inspector are unaffected. Default
     *  false (canvas byte-identical). */
    toolsInBottomBar?: boolean;
}
export default function SpatialBoard({ nodeTypes, engine: externalEngine, keyboardShortcuts, style, initialData, toolbar: showSidebar, tools, nodeInspector, debugPanel: showDebugPanel, debugBoards, theme, onPresentationChange, gifApiBaseUrl, hostActive, direction, localization, dataFlowEdgeOverlay, showPortLabels, onPortConnectEmpty, portConnectHold, initialFramesPanelOpen, preview: isPreview, readOnly, singleFrameId, visibleNodeIds, overlayNodes, bottomBarLeading, toolsInBottomBar, }: SpatialBoardProps): import("react/jsx-runtime").JSX.Element;
