// spatialboard/engine — the headless engine surface.
//
// NO React, NO CSS, NO @blocknote/@mantine, NO bundled font asset. This entry is
// for non-visual consumers (agents, Node workers, tests, alternate renderers): the
// spatial engine, the node-type MODEL (data-only `NodeTypeDef` — bring your own
// component-less defs), the data-flow engine, and SBD serialize/parse.
//
// The React board, its components, and the rich-text node live on the `.` and
// `./blocknote` entries — importing THIS module pulls none of them.

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
  ToolKey,
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

// ── Node type model (headless half — no React UI types) ──────
export { NodeTypeRegistry, resolveNodePorts, nodeTypeHasPorts } from "./nodes/registry";
export type {
  NodeTypeDef,
  SpatialNodeTypeCatalogEntry,
  SpatialNodeTypeCatalogPort,
} from "./nodes/registry";

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

// ── Font default (asset-free constant) ───────────────────────
export { DEFAULT_FONT } from "./font-constants";
