// ── Core engine ──────────────────────────────────────────────
export { SpatialEngine } from "./engine/SpatialEngine";
export type {
  BoardBackground,
  SelectionAlignMode,
  SelectionDistributeAxis,
  SpatialSearchField,
  SpatialSearchMatch,
  SpatialSearchState,
} from "./engine/SpatialEngine";
export type {
  SpatialNode,
  Viewport,
  ActiveTool,
  Mode,
  BuiltinNodeType,
  NodeType,
  ContentNode,
  DrawNode,
  ShapeNode,
  EdgeNode,
  ImageNode,
  TextNode,
  FrameNode,
  StickyNoteNode,
  AnySpatialNode,
  EdgeType,
  HandleSide,
  AgentCanvasState,
  AgentStateOptions,
} from "./engine/types";

// ── Node type registry ───────────────────────────────────────
export { NodeTypeRegistry, resolveNodePorts, nodeTypeHasPorts } from "./nodes/registry";
export type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodeCallbacks,
  NodePropertiesPanelProps,
  SpatialNodeTypeCatalogEntry,
  SpatialNodeTypeCatalogPort,
} from "./nodes/registry";

// ── Built-in node types (individually for tree-shaking) ──────
export { contentNodeType } from "./nodes/content";
export { drawNodeType } from "./nodes/draw";
export { shapeNodeType } from "./nodes/shape";
export { edgeNodeType } from "./nodes/edge";
export { imageNodeType } from "./nodes/image";
export { textNodeType } from "./nodes/text";
export { frameNodeType } from "./nodes/frame";
export { stickyNodeType } from "./nodes/sticky";
export { builtinNodeTypes } from "./nodes";

// ── React components ─────────────────────────────────────────
export { default as SpatialBoard } from "./components/SpatialBoard";
export type { SpatialBoardProps } from "./components/SpatialBoard";
export { default as SpatialCanvas } from "./components/SpatialCanvas";
export type { DataFlowEdgeOverlay } from "./components/SVGLayer";
export { default as Sidebar } from "./components/sidebar/Sidebar";
export { SIDEBAR_WIDTH } from "./components/sidebar/styles";
/** @deprecated Use Sidebar instead. Toolbar is now part of the Sidebar. */
export { default as Toolbar } from "./components/Toolbar";
/** @deprecated Properties are now integrated into the Sidebar. */
export { default as PropertiesPanel } from "./components/PropertiesPanel";
export type { DebugBoardEntry } from "./components/DebugPanel";
export type { SpatialBoardTheme } from "./components/sidebar/ThemeContext";
export { DEFAULT_SB_THEME, useSBTheme } from "./components/sidebar/ThemeContext";
// read-only context for node renderers and host UI.
export {
  SpatialBoardReadOnlyContext,
  useSpatialBoardReadOnly,
} from "./components/SpatialBoardReadOnlyContext";
export type {
  SpatialBoardDirection,
  SpatialBoardLocalization,
  CustomNodeDocEntry,
} from "./components/LocalizationContext";
export {
  DEFAULT_LOCALIZATION as DEFAULT_SB_LOCALIZATION,
  useSBI18n,
} from "./components/LocalizationContext";
export { DEFAULT_FONT } from "./fonts";
export { PAPER_TYPES, getPaperType } from "./components/paper-types";
export type { PaperTypeConfig, PaperGroup } from "./components/paper-types";

// ── Data-flow engine ────────────────────────────────────────
export { DataFlowEngine } from "./engine/DataFlowEngine";
export type {
  PortDefinition,
  PortDataType,
  PortValue,
  PortKey,
  DataflowEdgeComputeOverlayFlag,
} from "./engine/data-flow-types";
export { portKey, nodeShowsEdgeComputeOverlay } from "./engine/data-flow-types";
export type { PortAnchorMode } from "./engine/edge-geometry";

// ── Serialization ────────────────────────────────────────────
export { serializeToSBD } from "./serialization/sbd-serializer";
export type { SerializeOptions } from "./serialization/sbd-serializer";
export { parseSBD } from "./serialization/sbd-parser";
export type { SBDParseResult } from "./serialization/sbd-parser";
export { markdownToBlocks } from "./serialization/blocknote-markdown";

// ── Utilities ────────────────────────────────────────────────
export { setupKeyboardHandler } from "./interactions/keyboard-handler";
export { getStrokePath } from "./rendering/freehand";
export {
  strokeStyleToDash,
  getRoughRectPaths,
  getRoughEllipsePaths,
  getRoughDiamondPaths,
  getRoughLinePaths,
  getRoughArrowPaths,
  roundedRectRadius,
} from "./rendering/rough-shapes";
export type { RoughPathData } from "./rendering/rough-shapes";
export { prefersSafariWebKitViewportWorkaround } from "./utils/safari-viewport-raster";

export type { EdgeCreationAwareness } from "./collab/edge-creation-awareness";
export { serializeEdgeCreationAwareness } from "./collab/edge-creation-awareness";
export type { RectDragAwareness, RectDragKind } from "./collab/rect-drag-awareness";
export type { EraserAwareness } from "./collab/eraser-awareness";
export { RemoteEdgeCreationPreview } from "./components/RemoteEdgeCreationPreview";
export { RemoteRectDragPreview } from "./components/RemoteRectDragPreview";
export { RemoteEraserPreview } from "./components/RemoteEraserPreview";

// ── Styles (consumers import as: import 'spatialboard/style.css') ──
import "./styles/index.css";
