import { useMemo, useEffect, useRef, useState, lazy, Suspense } from "react";
import { SpatialEngine } from "../engine/SpatialEngine";
import { DataFlowEngine } from "../engine/DataFlowEngine";
import SpatialCanvas from "./canvas/SpatialCanvas";
import type { DataFlowEdgeOverlay } from "./canvas/SVGLayer";
import Sidebar from "./sidebar/Sidebar";
import { ModeCluster } from "./sidebar/ToolStrip";
import MobileToolbar from "./chrome/MobileToolbar";
import { TOOL_STRIP_WIDTH, COMPACT_BREAKPOINT } from "./sidebar/styles";
import type { DebugBoardEntry } from "./overlays/DebugPanel";
import { setupKeyboardHandler } from "../interactions/keyboard-handler";
import { NodeTypeRegistry, nodeTypeHasPorts } from "../nodes/registry";
import { coreBoardNodes } from "../nodes/index";
import type { NodeTypeDefinition } from "../nodes/registry";
import { loadGoogleFonts } from "../fonts";
import { SBThemeContext, DEFAULT_SB_THEME, SB_UI_FONT } from "./sidebar/ThemeContext";
import type { SpatialBoardTheme } from "./sidebar/ThemeContext";
import BottomBar from "./chrome/BottomBar";
import CanvasSearchBar from "./overlays/CanvasSearchBar";
import FramesPanel from "./panels/FramesPanel";
import PresentationOverlay from "./overlays/PresentationOverlay";
import PerformanceOverlay from "./overlays/PerformanceOverlay";
import { spatialPerf } from "../perf/spatial-perf";
import {
  SBLocalizationContext,
  useSBLocalizationValue,
  type SpatialBoardDirection,
  type SpatialBoardLocalization,
} from "./contexts/LocalizationContext";
import { SpatialBoardReadOnlyContext } from "./contexts/SpatialBoardReadOnlyContext";
import type { ToolKey } from "../engine/types";
import type { PortDirection } from "../engine/data-flow-types";

const DebugPanel = lazy(() => import("./overlays/DebugPanel"));

/** Port-drag released on empty canvas (see `onPortConnectEmpty`). */
export type PortConnectEmptyEvent = {
  nodeId: string;
  portId: string;
  direction: PortDirection;
  canvasX: number;
  canvasY: number;
  clientX: number;
  clientY: number;
};

export interface SpatialBoardProps {
  /** Node type definitions. Defaults to all built-in types. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default function SpatialBoard({
  nodeTypes = coreBoardNodes,
  engine: externalEngine,
  keyboardShortcuts = true,
  style,
  initialData,
  toolbar: showSidebar = true,
  tools,
  nodeInspector = true,
  debugPanel: showDebugPanel = false,
  debugBoards,
  theme,
  onPresentationChange,
  gifApiBaseUrl,
  hostActive,
  direction,
  localization,
  dataFlowEdgeOverlay = "off",
  showPortLabels = true,
  onPortConnectEmpty,
  portConnectHold = false,
  initialFramesPanelOpen = false,
  preview: isPreview = false,
  readOnly = false,
  singleFrameId,
  visibleNodeIds,
  overlayNodes,
  bottomBarLeading,
  toolsInBottomBar = false,
}: SpatialBoardProps) {
  const engine = useMemo(
    () => externalEngine ?? new SpatialEngine(),
    [externalEngine],
  );

  const registry = useMemo(() => {
    // Custom catalogs are additive: keep built-ins (sticky, text, …) so toolbar
    // tools like workflow's Note still resolve; host types override by `type`.
    if (nodeTypes === coreBoardNodes) {
      return new NodeTypeRegistry(coreBoardNodes);
    }
    const byType = new Map<string, NodeTypeDefinition>();
    for (const nt of coreBoardNodes) byType.set(nt.type, nt);
    for (const nt of nodeTypes) byType.set(nt.type, nt);
    return new NodeTypeRegistry([...byType.values()]);
  }, [nodeTypes]);

  // Load Google Fonts on mount
  useEffect(() => loadGoogleFonts(), []);

  // Wire registry into engine for lifecycle hooks
  useEffect(() => {
    engine.setRegistry(registry);
  }, [engine, registry]);

  // propagate read-only into the engine. Local mutators
  // (addNode/updateNode/deleteNode/etc.) early-return when this is
  // true; remote-op methods are unaffected so viewers still see
  // live edits from collaborators.
  useEffect(() => {
    engine.setReadOnly(readOnly);
  }, [engine, readOnly]);

  // Register custom container types (nodes with isContainer: true)
  useEffect(() => {
    for (const nt of nodeTypes) {
      if (nt.isContainer) {
        engine.registerContainerType(nt.type);
      }
    }
  }, [engine, nodeTypes]);

  // Load initial data (only once per engine instance — "initial" means first load only)
  const initialDataLoadedRef = useRef(false);
  useEffect(() => {
    if (!initialData || initialDataLoadedRef.current) return;
    initialDataLoadedRef.current = true;
    let cancelled = false;

    if (isPreview || singleFrameId) {
      void (async () => {
        await engine.fromSBD(initialData);
        if (cancelled) return;
        // Double-rAF: first frame lets the container measure, second fits viewport
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (cancelled) return;
            if (singleFrameId) {
              engine.fitToFrame(singleFrameId);
            } else {
              engine.fitToContent();
            }
          });
        });
      })();
    } else {
      void engine.fromSBD(initialData);
    }

    return () => {
      cancelled = true;
    };
  }, [engine, initialData, isPreview, singleFrameId]);

  const boardRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    if (!keyboardShortcuts) return;
    return setupKeyboardHandler(engine, boardRef.current, tools);
  }, [engine, keyboardShortcuts, tools]);

  // Slides/frames are canvas-only chrome (a graph has no slides). When `tools`
  // is provided and omits `frame`, the frames side panel must not MOUNT at all
  // (open=false only slides it off-screen — it can still be revealed). Omitted
  // `tools` ⇒ true ⇒ canvas byte-identical.
  const showSlides = !tools || tools.includes("frame");

  // Data-flow engine — created only when node types have ports
  const dataFlow = useMemo(() => {
    const hasPorts = nodeTypes.some((nt) => nodeTypeHasPorts(nt));
    return hasPorts ? new DataFlowEngine(engine, registry) : null;
  }, [engine, registry, nodeTypes]);

  useEffect(() => {
    if (!dataFlow) return;
    return dataFlow.connect();
  }, [dataFlow]);

  const resolvedTheme = useMemo(
    () => (theme ? { ...DEFAULT_SB_THEME, ...theme } : DEFAULT_SB_THEME),
    [theme],
  );
  const localizationValue = useSBLocalizationValue(direction, localization);

  const [presenting, setPresenting] = useState(false);
  const [framesPanelOpen, setFramesPanelOpen] = useState(initialFramesPanelOpen);
  const [minimapVisible, setMinimapVisible] = useState(!isPreview);
  const [showPerfOverlay, setShowPerfOverlay] = useState(false);

  // Compact (mobile/touch) chrome: measured from the CONTAINER, not the window,
  // so an embedded board in a narrow host panel adapts the same way a phone does.
  const [compact, setCompact] = useState(false);
  const minimapAutoHiddenRef = useRef(false);
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setCompact(w < COMPACT_BREAKPOINT);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Entering compact for the first time: hide the minimap by default — on a
  // phone it collides with the stacked bottom chrome. Re-enable via the ⋯ menu.
  useEffect(() => {
    if (compact && !minimapAutoHiddenRef.current) {
      minimapAutoHiddenRef.current = true;
      setMinimapVisible(false);
    }
  }, [compact]);

  // Only the CANVAS zooms — never the page. The root's `touch-action:
  // pan-x pan-y` (below) blocks browser pinch-zoom on the chrome for
  // spec-compliant browsers; iOS Safari additionally needs its proprietary
  // gesture events cancelled. Canvas pinch is pointer-event based and the
  // canvas is `touch-action: none`, so neither is affected.
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const preventGesture = (e: Event) => e.preventDefault();
    const preventMultiTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    el.addEventListener("gesturestart", preventGesture);
    el.addEventListener("gesturechange", preventGesture);
    el.addEventListener("gestureend", preventGesture);
    el.addEventListener("touchmove", preventMultiTouchMove, { passive: false });
    return () => {
      el.removeEventListener("gesturestart", preventGesture);
      el.removeEventListener("gesturechange", preventGesture);
      el.removeEventListener("gestureend", preventGesture);
      el.removeEventListener("touchmove", preventMultiTouchMove);
    };
  }, []);

  useEffect(() => {
    spatialPerf.setEnabled(isPreview ? false : showPerfOverlay);
  }, [isPreview, showPerfOverlay]);

  useEffect(() => {
    const handlePresentation = () => {
      const isPresenting = engine.presentationMode;
      setPresenting(isPresenting);
      onPresentationChange?.(isPresenting);
    };
    engine.on("presentation", handlePresentation);
    return () => engine.off("presentation", handlePresentation);
  }, [engine, onPresentationChange]);

  // Chrome visibility. Standard chrome hides in preview mode and while
  // presenting; the creation sidebar additionally hides for read-only viewers
  // (they can't add nodes — no point surfacing the affordance); and the side
  // rail yields entirely when the tools are seated in the BottomBar instead.
  // `railVisible` also drives the canvas inset, so the two can never drift.
  const showChrome = !isPreview && !presenting;
  const showSidebarUI = showSidebar && !presenting && !readOnly;
  // Compact chrome replaces both the side rail and the bar-seated tools with
  // the bottom MobileToolbar, regardless of the host's toolsInBottomBar choice.
  const railVisible = showSidebarUI && !toolsInBottomBar && !compact;
  const mobileToolbarVisible = showSidebarUI && !isPreview && compact;

  return (
    <SBLocalizationContext.Provider value={localizationValue}>
    <SBThemeContext.Provider value={resolvedTheme}>
    <SpatialBoardReadOnlyContext.Provider value={readOnly}>
    <div
      ref={boardRef}
      dir={localizationValue.dir}
      // Focusable so keyboard shortcuts can be scoped to the active board
      // (setupKeyboardHandler only reacts when this element holds focus).
      // Pointer-down inside focuses it — unless the target is a text field
      // (node text editing), which must keep its own focus.
      tabIndex={keyboardShortcuts ? 0 : undefined}
      onPointerDownCapture={
        keyboardShortcuts
          ? (e) => {
              const t = e.target as HTMLElement;
              if (t.closest('input, textarea, [contenteditable="true"]')) return;
              const el = boardRef.current;
              if (el && !el.contains(el.ownerDocument.activeElement)) {
                el.focus({ preventScroll: true });
              }
            }
          : undefined
      }
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        outline: "none",
        // Pan (menu/panel scrolling) allowed, browser pinch-zoom + double-tap
        // zoom NOT — board zoom belongs to the canvas alone. Children narrow
        // this further (canvas: none, scrollable menus: pan-y).
        touchAction: "pan-x pan-y",
        fontFamily: resolvedTheme.uiFontFamily ?? SB_UI_FONT,
        ...style,
      }}
    >
      {showSidebarUI && <Sidebar engine={engine} registry={registry} gifApiBaseUrl={gifApiBaseUrl} hostActive={hostActive} tools={tools} nodeInspector={nodeInspector} toolStrip={!toolsInBottomBar && !compact} compact={compact} />}
      {showDebugPanel && <Suspense fallback={null}><DebugPanel engine={engine} extraBoards={debugBoards} /></Suspense>}
      <div
        style={{
          position: "absolute",
          left: railVisible && !localizationValue.isRTL ? TOOL_STRIP_WIDTH : 0,
          top: 0,
          right: railVisible && localizationValue.isRTL ? TOOL_STRIP_WIDTH : 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <SpatialCanvas
          engine={engine}
          registry={registry}
          dataFlow={dataFlow}
          dataFlowEdgeOverlay={dataFlowEdgeOverlay}
          showPortLabels={showPortLabels}
          onPortConnectEmpty={onPortConnectEmpty}
          portConnectHold={portConnectHold}
          minimapVisible={isPreview ? false : minimapVisible}
          minimapBottomOffset={compact ? 128 : undefined}
          singleFrameId={singleFrameId}
          hostVisibleNodeIds={visibleNodeIds ?? null}
          overlayNodes={overlayNodes ?? null}
        />
        {showChrome && <CanvasSearchBar engine={engine} />}
        {/* BottomBar + FramesPanel stay visible in readOnly so
            viewers can launch presentation mode and browse the slides
            list. Edit affordances inside FramesPanel (rename, reorder)
            silently no-op via the engine's readOnly guard. */}
        {showChrome && (
          <BottomBar
            engine={engine}
            tools={tools}
            compact={compact}
            raised={mobileToolbarVisible}
            leadingSlot={compact ? undefined : bottomBarLeading}
            toolsSlot={toolsInBottomBar && !readOnly && !compact ? <ModeCluster engine={engine} tools={tools} registry={registry} /> : undefined}
            framesPanelOpen={framesPanelOpen}
            onToggleFramesPanel={() => setFramesPanelOpen((v) => !v)}
            showMinimap={minimapVisible}
            onToggleMinimap={() => setMinimapVisible((v) => !v)}
            showPerfOverlay={showPerfOverlay}
            onTogglePerfOverlay={() => setShowPerfOverlay((v) => !v)}
          />
        )}
        {showChrome && mobileToolbarVisible && (
          <MobileToolbar
            engine={engine}
            registry={registry}
            tools={tools}
            gifApiBaseUrl={gifApiBaseUrl}
          />
        )}
        {showChrome && showPerfOverlay && <PerformanceOverlay />}
        {showChrome && showSlides && (
          <FramesPanel
            engine={engine}
            open={framesPanelOpen}
            onClose={() => setFramesPanelOpen(false)}
          />
        )}
        {!isPreview && <PresentationOverlay engine={engine} />}
        {readOnly && showChrome && (
          <ReadOnlyPill
            theme={resolvedTheme}
            isRTL={localizationValue.isRTL}
            label={localizationValue.labels.viewOnly ?? "View only"}
          />
        )}
      </div>
    </div>
    </SpatialBoardReadOnlyContext.Provider>
    </SBThemeContext.Provider>
    </SBLocalizationContext.Provider>
  );
}

/**
 * Small "View only" pill so the absence of editing chrome reads as deliberate
 * rather than broken. Sits above the BottomBar so it doesn't crowd the
 * play / slides controls.
 */
function ReadOnlyPill({
  theme,
  isRTL,
  label,
}: {
  theme: SpatialBoardTheme;
  isRTL: boolean;
  label: string;
}) {
  return (
    <div
      data-sb-readonly-pill
      style={{
        position: "absolute",
        top: 12,
        [isRTL ? "left" : "right"]: 12,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.2,
        background: theme.panelBg,
        color: theme.textMuted,
        border: `1px solid ${theme.border}`,
        boxShadow: theme.panelShadow,
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 10,
      }}
    >
      {label}
    </div>
  );
}
