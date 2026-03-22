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
    if (initialData && !initialDataLoadedRef.current) {
      initialDataLoadedRef.current = true;
      engine.fromSBD(initialData);
    }
  }, [engine, initialData]);

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
  const [framesPanelOpen, setFramesPanelOpen] = useState(false);
  const [minimapVisible, setMinimapVisible] = useState(true);
  const [showPerfOverlay, setShowPerfOverlay] = useState(false);

  useEffect(() => {
    spatialPerf.setEnabled(showPerfOverlay);
  }, [showPerfOverlay]);

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
      {showSidebar && !presenting && <Sidebar engine={engine} registry={registry} gifApiBaseUrl={gifApiBaseUrl} />}
      {showDebugPanel && <Suspense fallback={null}><DebugPanel engine={engine} extraBoards={debugBoards} /></Suspense>}
      <div
        style={{
          position: "absolute",
          left: showSidebar && !presenting && !localizationValue.isRTL ? TOOL_STRIP_WIDTH : 0,
          top: 0,
          right: showSidebar && !presenting && localizationValue.isRTL ? TOOL_STRIP_WIDTH : 0,
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
          minimapVisible={minimapVisible}
        />
        {!presenting && <CanvasSearchBar engine={engine} />}
        {!presenting && (
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
        {!presenting && showPerfOverlay && <PerformanceOverlay />}
        {!presenting && (
          <FramesPanel
            engine={engine}
            open={framesPanelOpen}
            onClose={() => setFramesPanelOpen(false)}
          />
        )}
        <PresentationOverlay engine={engine} />
      </div>
    </div>
    </SBThemeContext.Provider>
    </SBLocalizationContext.Provider>
  );
}
