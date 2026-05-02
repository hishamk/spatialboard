import { useMemo, useEffect, useRef, useState, lazy, Suspense } from "react";
import { SpatialEngine } from "../engine/SpatialEngine";
import { DataFlowEngine } from "../engine/DataFlowEngine";
import SpatialCanvas from "./SpatialCanvas";
import type { DataFlowEdgeOverlay } from "./SVGLayer";
import Sidebar from "./sidebar/Sidebar";
import { TOOL_STRIP_WIDTH } from "./sidebar/styles";
import type { DebugBoardEntry } from "./DebugPanel";
const DebugPanel = lazy(() => import("./DebugPanel"));
import { setupKeyboardHandler } from "../interactions/keyboard-handler";
import { schema } from "../schema";
import { NodeTypeRegistry } from "../nodes/registry";
import { builtinNodeTypes } from "../nodes";
import type { NodeTypeDefinition } from "../nodes/registry";
import { loadGoogleFonts } from "../fonts";
import { SBThemeContext, DEFAULT_SB_THEME } from "./sidebar/ThemeContext";
import type { SpatialBoardTheme } from "./sidebar/ThemeContext";
import BottomBar from "./BottomBar";
import CanvasSearchBar from "./CanvasSearchBar";
import FramesPanel from "./FramesPanel";
import PresentationOverlay from "./PresentationOverlay";
import PerformanceOverlay from "./PerformanceOverlay";
import { spatialPerf } from "../perf/spatial-perf";
import {
  SBLocalizationContext,
  useSBLocalizationValue,
  type SpatialBoardDirection,
  type SpatialBoardLocalization,
} from "./LocalizationContext";
import { SpatialBoardReadOnlyContext } from "./SpatialBoardReadOnlyContext";

export interface SpatialBoardProps {
  /** Node type definitions. Defaults to all built-in types. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default function SpatialBoard({
  nodeTypes = builtinNodeTypes,
  engine: externalEngine,
  keyboardShortcuts = true,
  style,
  initialData,
  toolbar: showSidebar = true,
  debugPanel: showDebugPanel = false,
  debugBoards,
  theme,
  onPresentationChange,
  gifApiBaseUrl,
  direction,
  localization,
  dataFlowEdgeOverlay = "off",
  initialFramesPanelOpen = false,
  preview: isPreview = false,
  readOnly = false,
  singleFrameId,
}: SpatialBoardProps) {
  const engine = useMemo(
    () => externalEngine ?? new SpatialEngine(),
    [externalEngine],
  );

  const registry = useMemo(() => new NodeTypeRegistry(nodeTypes), [nodeTypes]);

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
    return setupKeyboardHandler(engine, boardRef.current);
  }, [engine, keyboardShortcuts]);

  // Data-flow engine — created only when node types have ports
  const dataFlow = useMemo(() => {
    const hasPorts = nodeTypes.some((nt) => nt.ports?.length);
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

  return (
    <SBLocalizationContext.Provider value={localizationValue}>
    <SBThemeContext.Provider value={resolvedTheme}>
    <SpatialBoardReadOnlyContext.Provider value={readOnly}>
    <div
      ref={boardRef}
      dir={localizationValue.dir}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        ...style,
      }}
    >
      {/* sidebar (creation tool strip) hidden in readOnly: viewers
          can't add nodes anyway, no point in surfacing the affordance. */}
      {showSidebar && !presenting && !readOnly && <Sidebar engine={engine} registry={registry} gifApiBaseUrl={gifApiBaseUrl} />}
      {showDebugPanel && <Suspense fallback={null}><DebugPanel engine={engine} extraBoards={debugBoards} /></Suspense>}
      <div
        style={{
          position: "absolute",
          left: showSidebar && !presenting && !readOnly && !localizationValue.isRTL ? TOOL_STRIP_WIDTH : 0,
          top: 0,
          right: showSidebar && !presenting && !readOnly && localizationValue.isRTL ? TOOL_STRIP_WIDTH : 0,
          bottom: 0,
          overflow: "hidden",
        }}
      >
        <SpatialCanvas
          engine={engine}
          schema={schema}
          registry={registry}
          dataFlow={dataFlow}
          dataFlowEdgeOverlay={dataFlowEdgeOverlay}
          minimapVisible={isPreview ? false : minimapVisible}
          singleFrameId={singleFrameId}
        />
        {!isPreview && !presenting && <CanvasSearchBar engine={engine} />}
        {/* BottomBar + FramesPanel stay visible in readOnly so
            viewers can launch presentation mode and browse the slides
            list. Edit affordances inside FramesPanel (rename, reorder)
            silently no-op via the engine's readOnly guard. */}
        {!isPreview && !presenting && (
          <BottomBar
            engine={engine}
            framesPanelOpen={framesPanelOpen}
            onToggleFramesPanel={() => setFramesPanelOpen((v) => !v)}
            showMinimap={minimapVisible}
            onToggleMinimap={() => setMinimapVisible((v) => !v)}
            showPerfOverlay={showPerfOverlay}
            onTogglePerfOverlay={() => setShowPerfOverlay((v) => !v)}
          />
        )}
        {!isPreview && !presenting && showPerfOverlay && <PerformanceOverlay />}
        {!isPreview && !presenting && (
          <FramesPanel
            engine={engine}
            open={framesPanelOpen}
            onClose={() => setFramesPanelOpen(false)}
          />
        )}
        {!isPreview && <PresentationOverlay engine={engine} />}
        {/* small "View only" pill so the absence of editing
            chrome is obviously by design rather than broken. Sits above
            the BottomBar so it doesn't crowd the play / slides controls. */}
        {readOnly && !presenting && !isPreview && (
          <div
            data-sb-readonly-pill
            style={{
              position: "absolute",
              top: 12,
              [localizationValue.isRTL ? "left" : "right"]: 12,
              padding: "4px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 500,
              lineHeight: 1.2,
              background: resolvedTheme.panelBg,
              color: resolvedTheme.textMuted,
              border: `1px solid ${resolvedTheme.border}`,
              boxShadow: resolvedTheme.panelShadow,
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 10,
            }}
          >
            {localizationValue.labels.viewOnly ?? "View only"}
          </div>
        )}
      </div>
    </div>
    </SpatialBoardReadOnlyContext.Provider>
    </SBThemeContext.Provider>
    </SBLocalizationContext.Provider>
  );
}
