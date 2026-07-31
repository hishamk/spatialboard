// SpatialEngine.ts — core engine: state, events, node CRUD, selection, grouping,
// frames, z-order, history, collab/remote ops, serialization.
//
// Domain operations are sharded into spatialengine_<domain>.ts modules
// (slicing axis: engine domain; the class methods here are thin delegators):
//   spatialengine_search.ts        board text search
//   spatialengine_presentation.ts  presentation mode + slide transitions
//   spatialengine_snapping.ts      grid snap + smart guides
//   spatialengine_camera.ts        viewport pan/zoom/fit/animate + transforms
//   spatialengine_arrange.ts       flip / arrange / align / distribute
//   spatialengine_clipboard.ts     duplicate / copy / cut / paste / templates
//   spatialengine_create.ts        tool activation + node factories
//   spatialengine_agent.ts         agent/LLM state observation
//   spatialengine_nodes.ts         node CRUD + history-recording update wrappers
//   spatialengine_edges.ts         data-flow edge helpers
//   spatialengine_frames.ts        frame/container membership tracking
//   spatialengine_groups.ts        grouping + nested-group bookkeeping
//   spatialengine_selection.ts     selection + pointer-gesture selection
//   spatialengine_history.ts       engine-level undo/redo + snapshot control
// Fields and methods marked @internal are shard plumbing, not public API.

import type {
  SpatialNode,
  EdgeNode,
  Viewport,
  Mode,
  ActiveTool,
  NodeType,
  HandleSide,
  EdgeType,
  AgentCanvasState,
  AgentStateOptions,
  StrokeStyle,
  FillStyle,
  TextAlign,
  StrokeSharpness,
  ArrowMarker,
  ShapeType,
} from "./types";
import { History } from "./history";
import { hitTest, hitTestAll } from "./spatial-index";
import { QuadTree } from "./QuadTree";
import { screenToCanvas, canvasToScreen } from "./viewport";
import { serializeToSBD } from "../serialization/sbd-serializer";
import { parseSBD } from "../serialization/sbd-parser";
import type {
  NodeTypeRegistry,
  SpatialNodeTypeCatalogEntry,
} from "../nodes/registry";
import { spatialPerf } from "../perf/spatial-perf";
import { loadCanvasPrefs, saveCanvasPrefs } from "../store/canvas-prefs";
import type { EdgeCreationAwareness } from "../collab/edge-creation-awareness";
import type { RectDragAwareness } from "../collab/rect-drag-awareness";
import type { EraserAwareness } from "../collab/eraser-awareness";
import * as AgentOps from "./spatialengine_agent";
import * as CameraOps from "./spatialengine_camera";
import * as CreateOps from "./spatialengine_create";
import * as ClipboardOps from "./spatialengine_clipboard";
import * as SearchOps from "./spatialengine_search";
import * as PresentOps from "./spatialengine_presentation";
import * as SnapOps from "./spatialengine_snapping";
import type { DragSnapContext } from "./spatialengine_snapping";
import * as ArrangeOps from "./spatialengine_arrange";
import * as NodeOps from "./spatialengine_nodes";
import * as EdgeOps from "./spatialengine_edges";
import * as FrameOps from "./spatialengine_frames";
import * as SelectionOps from "./spatialengine_selection";
import * as GroupOps from "./spatialengine_groups";
import * as HistoryOps from "./spatialengine_history";

export type BoardBackground =
  | "plain-white"
  | "dot-grid"
  | "engineering"
  | "blueprint"
  | "dark-grid"
  | "japanese-stationery"
  | "kraft";

/** Multi-select contextual alignment relative to the union of selected node bounds. */
export type SelectionAlignMode =
  | "left"
  | "centerH"
  | "right"
  | "top"
  | "centerV"
  | "bottom";

/** Equal spacing between consecutive items along an axis (sorted by position). */
export type SelectionDistributeAxis = "horizontal" | "vertical";

export interface AlignGuide {
  axis: 'x' | 'y';
  position: number;
  start: number;
  end: number;
}


export type SpatialSearchField = "text" | "label" | "content";

export interface SpatialSearchMatch {
  nodeId: string;
  nodeType: string;
  field: SpatialSearchField;
  text: string;
  matchCount: number;
}

export interface SpatialSearchState {
  query: string;
  matches: SpatialSearchMatch[];
  activeIndex: number;
}

type EventMap = {
  change: () => void;
  viewport: () => void;
  selection: () => void;
  search: () => void;
  mode: () => void;
  history: () => void;
  background: () => void;
  guides: () => void;
  lassoToggle: () => void;
  /** A pointer-driven node gesture (drag/resize/rotate) started/ended.
   *  While active, the canvas suppresses whole-board React syncs and lets
   *  per-node subscriptions drive rendering; `gesture:end` triggers the
   *  single commit render. */
  "gesture:start": () => void;
  "gesture:end": () => void;
  // Granular node lifecycle events
  'node:create': (node: SpatialNode) => void;
  'node:delete': (node: SpatialNode) => void;
  'node:move': (node: SpatialNode, dx: number, dy: number) => void;
  'node:resize': (node: SpatialNode, sx: number, sy: number) => void;
  'node:rotate': (node: SpatialNode, angle: number) => void;
  'node:flip': (node: SpatialNode, dir: 'h' | 'v') => void;
  'node:select': (node: SpatialNode) => void;
  'node:deselect': (node: SpatialNode) => void;
  'node:data': (node: SpatialNode, oldData: unknown, newData: unknown) => void;
  'draw:progress': (stroke: {
    points: Array<[number, number, number]>;
    color: string;
    width: number;
    strokeStyle?: string;
    opacity?: number;
  }) => void;
  'draw:end': () => void;
  'shape:progress': (preview: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    shapeType: string;
    stroke: string;
    strokeWidth: number;
    opacity?: number;
    roughness?: number;
    fill?: string;
    fillStyle?: FillStyle;
    strokeStyle?: StrokeStyle;
    edgeStyle?: StrokeSharpness;
  }) => void;
  'shape:end': () => void;
  'edge:progress': (preview: EdgeCreationAwareness) => void;
  'edge:end': () => void;
  'rectDrag:progress': (preview: RectDragAwareness) => void;
  'rectDrag:end': () => void;
  'eraser:progress': (preview: EraserAwareness) => void;
  'eraser:end': () => void;
  'laser:progress': (trail: Array<[number, number]>) => void;
  'laser:end': () => void;
  'group:enter': (groupId: string) => void;
  'group:exit': () => void;
  presentation: () => void;
  'image:cropRequest': (nodeId: string) => void;
};

export class SpatialEngine {
  nodes: Map<string, SpatialNode> = new Map();
  viewport: Viewport = { x: 0, y: 0, zoom: 1 };
  selection: Set<string> = new Set();
  activeGroupId: string | null = null;
  groupRotations = new Map<string, { angle: number; cx: number; cy: number }>();
  /** Maps child groupId → parent groupId for nested groups. */
  groupParent = new Map<string, string>();
  /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
  /** @internal */ groupChildren = new Map<string, Set<string>>();
  mode: Mode = "select";
  activeTool: ActiveTool = {
    tool: "pen",
    color: "#1e1e2e",
    width: 3,
    shapeType: "rect",
    strokeStyle: "solid",
    roughness: 1,
    opacity: 1,
  };
  containerOffset = { x: 0, y: 0 };
  /** DOM element that hosts the canvas — used to derive the correct window in pop-out scenarios. */
  private _container: HTMLElement | null = null;
  snapToGrid = false;
  smartGuides = true;
  lassoSelect = false;
  freeFormEdges = true;
  /**
   * When true, every local doc-mutating method on this engine is a
   * no-op (addNode, updateNode, deleteNode, …). View state — viewport,
   * selection, search, measured heights, mode — keeps responding so
   * the user can still pan, zoom, and select to inspect.
   *
   * Remote-op methods (`addRemoteNode`, `applyRemoteNodeUpdate`,
   * `deleteRemoteNode`) are NOT guarded — incoming sync from peers
   * must still apply, otherwise a viewer wouldn't see live edits.
   *
   * Driven externally via `setReadOnly` (typically by the host's
   * collab perm signal). The host should also hide creation chrome
   * (sidebar, bottom bar) so guarded ops don't fail visibly.
   */
  readOnly = false;
  presentationMode = false;
  presentationSlides: string[] = [];
  presentationIndex = 0;
  /** @internal */ _presentationAnimId: number | null = null;
  /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
  /** @internal */ _transitionOverlay: {
    type: "fade" | "dissolve" | "fold" | "cube";
    phase: "out" | "in";
    progress: number;
    /** Cube direction: 1 = next (rotate left), -1 = prev (rotate right). */
    direction?: 1 | -1;
    /** Overall 0–1 timeline for cube (drives zoom-out → rotate → zoom-in). */
    t?: number;
  } | null = null;
  get transitionOverlay() { return this._transitionOverlay; }
  gridSize = 20;
  boardBackground: BoardBackground = "dot-grid";
  /** Saved "origin" viewport position restored on next load. */
  originView: Viewport | null = null;
  /** Current alignment guides (set during drag). */
  alignGuides: AlignGuide[] = [];
  /** Container dimensions for viewport bounds computation. */
  /** @internal */ _containerWidth = 2000;
  /** @internal */ _containerHeight = 1500;

  /** @internal */ history = new History();
  /** When set, `updateNodeWithHistoryCoalesced` reuses one undo step until `endHistoryCoalesce()`. */
  /** @internal */ _historyCoalesceKey: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners: { [K in keyof EventMap]?: Set<(...args: any[]) => void> } = {};
  private _suppressEvents = false;
  /** @internal */ _collabMode = false;
  /** When > 0, `addNode`/`addNodes` skip their own history snapshot push
   *  so a single `beginAgentAction()` snapshot covers multiple operations. */
  /** @internal */ _agentActionDepth = 0;
  /** Auto-reset timer for `beginAgentAction()` when no matching `endAgentAction()`
   *  arrives in time (cross-process MCP callers can crash between begin/end). */
  private _agentActionTimer: ReturnType<typeof setTimeout> | null = null;
  /** Max ms between begin/end before depth is force-reset to 0. */
  private static readonly AGENT_ACTION_TIMEOUT_MS = 60_000;
  /** @internal */ clipboard: SpatialNode[] = [];
  /** @internal */ pasteCount = 0;
  /** Node ids captured by the active pointer gesture; null when idle. */
  /** @internal */ _gestureIds: ReadonlySet<string> | null = null;
  /** Monotonic counters bumped whenever the matching event reaches listeners.
   *  Used as `useSyncExternalStore` snapshots by canvas overlays. */
  private _changeTick = 0;
  private _selectionTick = 0;
  private _guidesTick = 0;
  /** @internal */ nextZValue = 1;
  /** @internal */ _minZ = 0;
  /** @internal */ quadTree = new QuadTree({ x: -100000, y: -100000, w: 200000, h: 200000 });
  /** @internal */ adjacency = new Map<string, Set<string>>();
  /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
  /** @internal */ frameChildren = new Map<string, Set<string>>();
  /** Node types that act as containers (frame-like behavior). "frame" is always included. */
  /** @internal */ _containerTypes = new Set<string>(["frame"]);
  /** @internal */ registry?: NodeTypeRegistry;
  /** Measured heights for auto-height nodes (canvas-coordinate units). */
  /** @internal */ _measuredHeights: Record<string, number> = {};
  /** @internal */ _search: SpatialSearchState = {
    query: "",
    matches: [],
    activeIndex: -1,
  };

  constructor() {
    const prefs = loadCanvasPrefs();
    this.snapToGrid = prefs.snapToGrid;
    this.smartGuides = prefs.smartGuides;
    this.gridSize = prefs.gridSize;
  }

  private persistCanvasPrefs(): void {
    saveCanvasPrefs({
      snapToGrid: this.snapToGrid,
      smartGuides: this.smartGuides,
      gridSize: this.gridSize,
    });
  }

  /** Set the node type registry for lifecycle hooks. */
  setRegistry(registry: NodeTypeRegistry): void {
    this.registry = registry;
  }

  /** Registry used by the canvas (remote edge preview, hooks). */
  getRegistry(): NodeTypeRegistry | undefined {
    return this.registry;
  }

  /**
   * All registered node types (built-in + custom from `SpatialBoard` `nodeTypes`).
   * Empty until `setRegistry` runs (after mount). Intended for agents / MCP discovery.
   */
  getNodeTypeCatalog(): SpatialNodeTypeCatalogEntry[] {
    return this.registry?.toCatalog() ?? [];
  }

  /** Enable collaborative mode. Disables local snapshot history. */
  setCollabMode(enabled: boolean): void {
    this._collabMode = enabled;
    this._historyCoalesceKey = null;
    if (enabled) this.history.clear();
  }

  /** Whether the engine is in collaborative mode. */
  get isCollabMode(): boolean {
    return this._collabMode;
  }

  /** Toggle read-only mode. See `readOnly` field for semantics. */
  setReadOnly(value: boolean): void {
    this.readOnly = value;
  }

  /** Register a node type as a container (frame-like behavior). */
  registerContainerType(type: string): void {
    this._containerTypes.add(type);
  }

  /** Check whether a node type behaves as a container. */
  isContainerType(type: string): boolean {
    return this._containerTypes.has(type);
  }

  /** The set of container type strings (read-only). */
  get containerTypes(): ReadonlySet<string> {
    return this._containerTypes;
  }

  /** Update the measured height for an auto-height node. */
  setMeasuredHeight(nodeId: string, height: number): void {
    this._measuredHeights[nodeId] = height;
  }

  /** Get the resolved height for a node (measured or explicit). */
  resolveHeight(node: SpatialNode): number {
    if (node.h !== "auto") return node.h as number;
    return this._measuredHeights[node.id] ?? 100;
  }

  /** Get all measured heights (for canvas rendering). */
  get measuredHeights(): Record<string, number> {
    return this._measuredHeights;
  }

  // --- Edge helpers (data-flow) ---

  /** Get all edge nodes connected to a given node. */
  getEdgesForNode(nodeId: string): SpatialNode[] {
    return EdgeOps.getEdgesForNode(this, nodeId);
  }

  /** Get all edge nodes in the board. */
  getAllEdges(): SpatialNode[] {
    return EdgeOps.getAllEdges(this);
  }

  /** Set the container element (used by SpatialCanvas on mount). */
  setContainer(el: HTMLElement | null): void {
    this._container = el;
  }

  /** Get the window object for the container (supports pop-out windows). */
  /** @internal */
  getWindow(): Window {
    return this._container?.ownerDocument.defaultView ?? window;
  }

  // --- Event Emitter ---

  on<K extends keyof EventMap>(event: K, cb: EventMap[K]): void {
    if (!this.listeners[event]) this.listeners[event] = new Set();
    this.listeners[event]!.add(cb as (...args: unknown[]) => void);
  }

  off<K extends keyof EventMap>(event: K, cb: EventMap[K]): void {
    this.listeners[event]?.delete(cb as (...args: unknown[]) => void);
  }

  /** @internal — shard modules call this; not part of the public API. */
  emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): void {
    if (this._suppressEvents) return;
    if (event === "change") this._changeTick++;
    else if (event === "selection") this._selectionTick++;
    else if (event === "guides") this._guidesTick++;
    this.listeners[event]?.forEach((cb) => (cb as (...a: unknown[]) => void)(...args));
  }

  // --- Pointer gestures (drag / resize / rotate) ---

  /** True while a pointer-driven node gesture is active. */
  get gestureActive(): boolean {
    return this._gestureIds !== null;
  }

  /** Node ids captured by the active gesture; null when idle. */
  get gestureIds(): ReadonlySet<string> | null {
    return this._gestureIds;
  }

  /** Monotonic tick bumped on every `change` reaching listeners. */
  get changeTick(): number {
    return this._changeTick;
  }

  /** Monotonic tick covering `change` + `selection` + `guides`. */
  get overlayTick(): number {
    return this._changeTick + this._selectionTick + this._guidesTick;
  }

  /**
   * Mark the start of a pointer gesture over the given nodes. While a
   * gesture is active the engine still mutates and emits per frame
   * (collab sync depends on that); only the canvas's whole-board React
   * mirror pauses. Idempotent: beginning while active replaces the id set.
   */
  beginNodeGesture(ids: Iterable<string>): void {
    SelectionOps.beginNodeGesture(this, ids);
  }

  /** End the active pointer gesture (no-op when idle). */
  endNodeGesture(): void {
    SelectionOps.endNodeGesture(this);
  }

  /** Request entering image crop mode (handled by the canvas component). */
  requestImageCrop(nodeId: string): void {
    this.emit("image:cropRequest", nodeId);
  }

  // --- Search ---

  // Implementation: ./spatialengine_search.ts

  getSearchState(): SpatialSearchState {
    return SearchOps.getSearchState(this);
  }

  setSearchQuery(query: string): void {
    SearchOps.setSearchQuery(this, query);
  }

  clearSearch(): void {
    SearchOps.clearSearch(this);
  }

  setSearchActiveIndex(index: number): void {
    SearchOps.setSearchActiveIndex(this, index);
  }

  searchNext(): void {
    SearchOps.searchNext(this);
  }

  searchPrev(): void {
    SearchOps.searchPrev(this);
  }

  focusSearchResult(index: number, options?: { select?: boolean; center?: boolean; minZoom?: number }): void {
    SearchOps.focusSearchResult(this, index, options);
  }

  focusActiveSearchResult(options?: { select?: boolean; center?: boolean; minZoom?: number }): void {
    SearchOps.focusActiveSearchResult(this, options);
  }

  /** @internal — re-runs the active query after node mutations. */
  refreshSearchIfNeeded(): void {
    SearchOps.refreshSearchIfNeeded(this);
  }

  // --- Grid Snapping ---

  toggleSnapToGrid(): void {
    this.snapToGrid = !this.snapToGrid;
    this.persistCanvasPrefs();
    this.emit("guides");
  }

  toggleFreeFormEdges(): void {
    this.freeFormEdges = !this.freeFormEdges;
    this.emit("change");
  }

  toggleSmartGuides(): void {
    this.smartGuides = !this.smartGuides;
    this.persistCanvasPrefs();
    this.emit("guides");
  }

  setGridSize(size: number): void {
    const next = Math.max(1, Math.round(size));
    if (this.gridSize === next) return;
    this.gridSize = next;
    this.persistCanvasPrefs();
    this.emit("guides");
  }

  toggleLassoSelect(): void {
    this.lassoSelect = !this.lassoSelect;
    this.emit("lassoToggle");
  }

  // ── Presentation mode ─────────────────────────────────────────
  // Implementation: ./spatialengine_presentation.ts

  enterPresentation(): void {
    PresentOps.enterPresentation(this);
  }

  exitPresentation(): void {
    PresentOps.exitPresentation(this);
  }

  presentationNext(): void {
    PresentOps.presentationNext(this);
  }

  presentationPrev(): void {
    PresentOps.presentationPrev(this);
  }

  presentationGoTo(index: number): void {
    PresentOps.presentationGoTo(this, index);
  }

  // ── Grid snap + smart guides ─────────────────────────────────
  // Implementation: ./spatialengine_snapping.ts (setContainerSize: ./spatialengine_camera.ts)

  snap(x: number, y: number): { x: number; y: number } {
    return SnapOps.snap(this, x, y);
  }

  /** Update the container dimensions (called from canvas resize observer). */
  setContainerSize(w: number, h: number): void {
    CameraOps.setContainerSize(this, w, h);
  }

  /**
   * Precompute static guide candidates for a drag gesture.
   * Reuse this context across pointermove frames to reduce QuadTree work.
   */
  createDragSnapContext(allDragIds: Set<string> | string[]): DragSnapContext {
    return SnapOps.createDragSnapContext(this, allDragIds);
  }

  /**
   * Compute smart guide alignment + grid snap for a drag operation.
   * Sets `this.alignGuides` and emits `guides` event.
   * Returns the adjusted delta to apply.
   */
  computeDragSnap(
    origPositions: Array<{ id: string; x: number; y: number }>,
    allDragIds: Set<string> | string[],
    dx: number,
    dy: number,
    modKey: boolean,
    dragSnapContext?: DragSnapContext,
  ): { finalDx: number; finalDy: number } {
    return SnapOps.computeDragSnap(this, origPositions, allDragIds, dx, dy, modKey, dragSnapContext);
  }

  /** Clear alignment guides (call on drag end). */
  clearAlignGuides(): void {
    SnapOps.clearAlignGuides(this);
  }

  // --- Board Background ---

  setBoardBackground(bg: BoardBackground): void {
    if (this.readOnly) return;
    if (this.boardBackground === bg) return;
    this.boardBackground = bg;
    this.emit("background");
  }

  // --- Viewport ---
  // Implementation: ./spatialengine_camera.ts

  pan(dx: number, dy: number): void {
    CameraOps.pan(this, dx, dy);
  }

  zoomByWheel(delta: number, screenX: number, screenY: number): void {
    CameraOps.zoomByWheel(this, delta, screenX, screenY);
  }

  zoomByFactor(factor: number, screenX: number, screenY: number): void {
    CameraOps.zoomByFactor(this, factor, screenX, screenY);
  }

  zoomTo(level: number, anchor?: { x: number; y: number }): void {
    CameraOps.zoomTo(this, level, anchor);
  }

  zoomIn(): void {
    this.zoomTo(this.viewport.zoom * 1.2);
  }

  zoomOut(): void {
    this.zoomTo(this.viewport.zoom / 1.2);
  }

  /** Zoom and pan to center a node for editing (e.g. after double-click on placeholder) */
  zoomToNode(nodeId: string, targetZoom = 1): void {
    CameraOps.zoomToNode(this, nodeId, targetZoom);
  }

  fitToContent(): void {
    CameraOps.fitToContent(this);
  }

  /** Animated fit-to-all-content (zoom-out) — reuses the ease-out camera tween.
   *  Additive; the instant fitToContent is unchanged for other callers. */
  fitToContentAnimated(opts?: { durationMs?: number }): void {
    CameraOps.fitToContentAnimated(this, opts);
  }

  /**
   * Fit the viewport to a SUBSET of nodes (their union AABB), ignoring the rest.
   * Additive helper for host render-scope views (e.g. the workflow Loop node's
   * nested sub-canvas — frame the loop + its body). Falls back to fitToContent
   * when the subset is empty/unknown. Edge nodes are skipped (no meaningful box).
   */
  fitToNodes(ids: readonly string[]): void {
    CameraOps.fitToNodes(this, ids);
  }

  /** Animated fit-to-subset (zoom-in) — reuses the ease-out camera tween.
   *  Additive; the instant fitToNodes is unchanged for other callers. */
  fitToNodesAnimated(ids: readonly string[], opts?: { durationMs?: number }): void {
    CameraOps.fitToNodesAnimated(this, ids, opts);
  }

  /** Animated fit to an arbitrary canvas-space rectangle (frame ephemeral overlay
   *  content the engine doesn't own — e.g. the Loop mini-flow's synthetic Start/End
   *  cards + body). Additive; reuses the same ease-out camera tween. */
  fitToRectAnimated(
    minX: number, minY: number, maxX: number, maxY: number,
    opts?: { durationMs?: number; padding?: number },
  ): void {
    CameraOps.fitToRectAnimated(this, minX, minY, maxX, maxY, opts);
  }

  /**
   * Animated CENTER-on-rect at a chosen zoom — unlike fitToRectAnimated the
   * zoom is NOT derived from the rect's size (a camera that follows running
   * nodes wants one consistent focus level, not a per-card fit seesaw).
   * `zoom` defaults to the current zoom; it is capped so the rect (+`padding`)
   * always fully fits. `offsetX`/`offsetY` shift the effective screen center
   * in px — for host overlays that cover an edge of the container (e.g. a
   * docked inspector), so "centered" means the VISIBLE area. Additive; reuses
   * the ease-out camera tween (reduced-motion snaps).
   */
  centerOnRectAnimated(
    minX: number, minY: number, maxX: number, maxY: number,
    opts?: { zoom?: number; durationMs?: number; padding?: number; offsetX?: number; offsetY?: number },
  ): void {
    CameraOps.centerOnRectAnimated(this, minX, minY, maxX, maxY, opts);
  }

  /**
   * Fit viewport to a single frame node, ignoring everything else.
   * Used by single-frame rendering (e.g. flashcard study mode).
   */
  fitToFrame(frameId: string): void {
    CameraOps.fitToFrame(this, frameId);
  }

  /** Save the current viewport as the origin view (restored on next load). */
  setOriginView(): void {
    CameraOps.setOriginView(this);
  }

  /** Clear the saved origin view. */
  clearOriginView(): void {
    CameraOps.clearOriginView(this);
  }

  /** Jump to the saved origin view, or fit-to-content if none is saved. */
  goToOriginView(): void {
    CameraOps.goToOriginView(this);
  }

  screenToCanvas(sx: number, sy: number): { x: number; y: number } {
    return CameraOps.screenToCanvas(this, sx, sy);
  }

  canvasToScreen(cx: number, cy: number): { x: number; y: number } {
    return CameraOps.canvasToScreen(this, cx, cy);
  }

  // --- Node CRUD ---

  addNode(node: SpatialNode, opts?: { skipHistory?: boolean }): void {
    NodeOps.addNode(this, node, opts);
  }

  addNodes(nodes: SpatialNode[]): void {
    NodeOps.addNodes(this, nodes);
  }

  updateNode(id: string, patch: Partial<SpatialNode>): void {
    NodeOps.updateNode(this, id, patch);
  }

  /**
   * Batch update multiple nodes with a single change emit.
   * Use during drag/resize to avoid N re-renders per frame.
   */
  updateMany(
    updates: Array<{ id: string; patch: Partial<SpatialNode> }>
  ): void {
    NodeOps.updateMany(this, updates);
  }

  /** @internal */ updateConnectedEdges(nodeId: string): void {
    EdgeOps.updateConnectedEdges(this, nodeId);
  }

  updateNodeWithHistory(id: string, patch: Partial<SpatialNode>): void {
    NodeOps.updateNodeWithHistory(this, id, patch);
  }

  /**
   * Like `updateNodeWithHistory`, but multiple calls with the same `sessionKey` share one undo step
   * (e.g. dragging an inspector slider). Call `endHistoryCoalesce()` when the gesture ends.
   */
  updateNodeWithHistoryCoalesced(
    id: string,
    patch: Partial<SpatialNode>,
    sessionKey: string,
  ): void {
    NodeOps.updateNodeWithHistoryCoalesced(this, id, patch, sessionKey);
  }

  /** Update multiple nodes in a single undo step. */
  batchUpdateWithHistory(updates: Array<{ id: string; patch: Partial<SpatialNode> }>): void {
    NodeOps.batchUpdateWithHistory(this, updates);
  }

  /**
   * Like `batchUpdateWithHistory`, but shares one undo step with other calls using the same `sessionKey`.
   */
  batchUpdateWithHistoryCoalesced(
    updates: Array<{ id: string; patch: Partial<SpatialNode> }>,
    sessionKey: string,
  ): void {
    NodeOps.batchUpdateWithHistoryCoalesced(this, updates, sessionKey);
  }

  deleteNode(id: string, opts?: { skipHistory?: boolean }): void {
    NodeOps.deleteNode(this, id, opts);
  }

  getNode(id: string): SpatialNode | undefined {
    return NodeOps.getNode(this, id);
  }

  getAllNodes(): SpatialNode[] {
    return NodeOps.getAllNodes(this);
  }

  /** Returns a read-only iterable of all nodes (no copy). */
  iterNodes(): IterableIterator<SpatialNode> {
    return NodeOps.iterNodes(this);
  }

  getNodesByType(type: NodeType): SpatialNode[] {
    return NodeOps.getNodesByType(this, type);
  }

  /** Returns all non-edge nodes fully contained within a frame's bounds (including nested frames). */
  getNodesInsideFrame(frameId: string): SpatialNode[] {
    return FrameOps.getNodesInsideFrame(this, frameId);
  }

  /** Returns tracked frame children (nodes explicitly added to the frame). */
  getFrameChildren(frameId: string): SpatialNode[] {
    return FrameOps.getFrameChildren(this, frameId);
  }

  /** Returns IDs of all descendants of a frame (children, grandchildren, etc.). */
  getFrameDescendantIds(frameId: string): Set<string> {
    return FrameOps.getFrameDescendantIds(this, frameId);
  }

  /** Rebuild frameChildren from spatial containment. Called on load/undo/redo.
   *  Each node is assigned only to its smallest containing frame. */
  rebuildFrameChildren(): void {
    FrameOps.rebuildFrameChildren(this);
  }

  /** After nodes are moved, update which frames they belong to.
   *  Each node is assigned only to its smallest containing frame.
   *  Frames can be nested inside other frames (but not inside themselves or their descendants). */
  updateFrameMembership(nodeIds: string[]): void {
    FrameOps.updateFrameMembership(this, nodeIds);
  }

  /** Sync frame children after resize: remove nodes no longer inside, add newly contained nodes. */
  syncFrameChildrenAfterResize(frameId: string): void {
    FrameOps.syncFrameChildrenAfterResize(this, frameId);
  }

  /** Adopt all existing nodes that are spatially inside a newly created frame. */
  adoptNodesIntoNewFrame(frameId: string): void {
    FrameOps.adoptNodesIntoNewFrame(this, frameId);
  }

  nextZ(): number {
    return this.nextZValue++;
  }

  setNextZ(z: number): void {
    this.nextZValue = z;
  }

  // --- Z-ordering ---

  bringToFront(ids: string[]): void {
    if (ids.length === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    for (const id of ids) {
      const node = this.nodes.get(id);
      if (node && !node.locked) this.nodes.set(id, { ...node, z: this.nextZValue++ });
    }
    this.emit("change");
    this.emit("history");
  }

  sendToBack(ids: string[]): void {
    if (ids.length === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    for (let i = ids.length - 1; i >= 0; i--) {
      const node = this.nodes.get(ids[i]);
      if (node && !node.locked) this.nodes.set(ids[i], { ...node, z: --this._minZ });
    }
    this.emit("change");
    this.emit("history");
  }

  /** AABB overlap test between two nodes. */
  private _nodesOverlap(a: SpatialNode, b: SpatialNode): boolean {
    const ah = this.resolveHeight(a);
    const bh = this.resolveHeight(b);
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + bh && a.y + ah > b.y;
  }

  bringForward(ids: string[]): void {
    if (ids.length === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);

    for (const id of ids) {
      const node = this.nodes.get(id);
      if (!node || node.locked) continue;
      // Find overlapping nodes with higher z (same rendering layer)
      const isEdge = node.type === "edge";
      const candidates: SpatialNode[] = [];
      for (const n of this.nodes.values()) {
        if (
          n.id !== id &&
          (isEdge ? n.type === "edge" : n.type !== "edge") &&
          n.z >= node.z &&
          this._nodesOverlap(node, n)
        ) {
          candidates.push(n);
        }
      }
      if (candidates.length === 0) continue;
      // Pick the one with the lowest z among those above (nearest overlapping neighbor)
      candidates.sort((a, b) => a.z - b.z);
      const target = candidates[0];
      const targetNode = this.nodes.get(target.id)!;
      const curZ = node.z, tgtZ = targetNode.z;
      if (curZ === tgtZ) {
        this.nodes.set(id, { ...node, z: tgtZ + 1 });
      } else {
        this.nodes.set(id, { ...node, z: tgtZ });
        this.nodes.set(target.id, { ...targetNode, z: curZ });
      }
    }

    this.emit("change");
    this.emit("history");
  }

  sendBackward(ids: string[]): void {
    if (ids.length === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);

    for (const id of ids) {
      const node = this.nodes.get(id);
      if (!node || node.locked) continue;
      // Find overlapping nodes with lower z (same rendering layer)
      const isEdge = node.type === "edge";
      const candidates: SpatialNode[] = [];
      for (const n of this.nodes.values()) {
        if (
          n.id !== id &&
          (isEdge ? n.type === "edge" : n.type !== "edge") &&
          n.z <= node.z &&
          this._nodesOverlap(node, n)
        ) {
          candidates.push(n);
        }
      }
      if (candidates.length === 0) continue;
      // Pick the one with the highest z among those below (nearest overlapping neighbor)
      candidates.sort((a, b) => b.z - a.z);
      const target = candidates[0];
      const targetNode = this.nodes.get(target.id)!;
      const curZ = node.z, tgtZ = targetNode.z;
      if (curZ === tgtZ) {
        this.nodes.set(id, { ...node, z: tgtZ - 1 });
      } else {
        this.nodes.set(id, { ...node, z: tgtZ });
        this.nodes.set(target.id, { ...targetNode, z: curZ });
      }
    }

    this.emit("change");
    this.emit("history");
  }

  /** Update the QuadTree bounds for an auto-height node when its measured height changes. */
  updateMeasuredHeight(nodeId: string, height: number): void {
    const node = this.nodes.get(nodeId);
    if (!node || node.h !== "auto") return;
    this._measuredHeights[nodeId] = height;
    this.quadTree.remove(node);
    this.quadTree.insert(node, height);
  }

  // --- Spatial Queries ---

  hitTest(cx: number, cy: number, measuredHeights?: Record<string, number>): SpatialNode | null {
    const shouldProfile = spatialPerf.isEnabled();
    const t0 = shouldProfile ? performance.now() : 0;
    // Narrow phase with QuadTree
    const tolerance = 50; // generous internal search bounds
    const candidates = this.quadTree.retrieve([], {
      x: cx - tolerance,
      y: cy - tolerance,
      w: tolerance * 2,
      h: tolerance * 2,
    });

    const candidateMap = new Map<string, SpatialNode>();
    for (const node of candidates) candidateMap.set(node.id, node);

    const result = hitTest(candidateMap, cx, cy, this.viewport.zoom, measuredHeights, this._containerTypes);
    if (shouldProfile) spatialPerf.recordHitTest(performance.now() - t0);
    return result;
  }

  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(cx: number, cy: number, measuredHeights?: Record<string, number>): SpatialNode[] {
    const shouldProfile = spatialPerf.isEnabled();
    const t0 = shouldProfile ? performance.now() : 0;
    const tolerance = 50;
    const candidates = this.quadTree.retrieve([], {
      x: cx - tolerance,
      y: cy - tolerance,
      w: tolerance * 2,
      h: tolerance * 2,
    });

    const candidateMap = new Map<string, SpatialNode>();
    for (const node of candidates) candidateMap.set(node.id, node);

    const result = hitTestAll(candidateMap, cx, cy, this.viewport.zoom, measuredHeights, this._containerTypes);
    if (shouldProfile) spatialPerf.recordHitTest(performance.now() - t0);
    return result;
  }

  getNodesInRect(rect: {
    x: number;
    y: number;
    w: number;
    h: number;
  }): SpatialNode[] {
    return this.quadTree.retrieve([], rect);
  }

  // --- Selection ---

  /** Expand selection to include all group siblings, walking up the group
   *  hierarchy until the active group (or root) is reached. */
  /** @internal */ expandSelectionToGroups(): void {
    SelectionOps.expandSelectionToGroups(this);
  }

  select(id: string): void {
    SelectionOps.select(this, id);
  }

  toggleSelect(id: string): void {
    SelectionOps.toggleSelect(this, id);
  }

  selectMultiple(ids: string[]): void {
    SelectionOps.selectMultiple(this, ids);
  }

  deselectAll(): void {
    SelectionOps.deselectAll(this);
  }

  deleteSelected(): void {
    if (this.readOnly) return;
    if (this.selection.size === 0) return;
    // Filter out locked + non-deletable nodes (deletable === false = protected
    // from user-gesture deletion; see SpatialNode.deletable).
    const toDelete = new Set(
      Array.from(this.selection).filter((id) => {
        const n = this.nodes.get(id);
        return n && !n.locked && n.deletable !== false;
      })
    );
    if (toDelete.size === 0) return;
    // If deleting all members of the active group, exit it
    if (this.activeGroupId) {
      const remaining = this.getGroupMembers(this.activeGroupId)
        .filter(n => !toDelete.has(n.id));
      if (remaining.length === 0) {
        this.activeGroupId = null;
        this.emit('group:exit');
      }
    }
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const deletedIds = toDelete;

    for (const id of toDelete) {
      const node = this.nodes.get(id);
      if (!node) continue;
      this.registry?.get(node.type)?.onDelete?.(node, this);
      this.emit("node:delete", node);
      this.quadTree.remove(node);
      this.nodes.delete(id);
    }

    // Cascade: delete edges referencing deleted nodes
    for (const [edgeId, node] of this.nodes) {
      if (node.type === "edge") {
        const data = node.data as { fromId: string; toId: string };
        if (deletedIds.has(data.fromId) || deletedIds.has(data.toId)) {
          const edge = this.nodes.get(edgeId);
          if (edge) this.quadTree.remove(edge);
          this.nodes.delete(edgeId);
        }
      }
    }
    // Clean up empty groups from groupParent
    this.cleanupEmptyGroups();
    for (const id of toDelete) this.selection.delete(id);
    this.refreshSearchIfNeeded();
    this.emit("change");
    this.emit("selection");
    this.emit("history");
  }

  /** Remove groupParent entries for groups that no longer have any members. */
  private cleanupEmptyGroups(): void {
    const usedGroupIds = new Set<string>();
    for (const node of this.nodes.values()) {
      if (node.groupId) usedGroupIds.add(node.groupId);
    }
    // Remove child entries that no longer have any nodes
    for (const [child] of this.groupParent) {
      if (!usedGroupIds.has(child)) {
        this.unlinkGroupParent(child);
      }
    }
  }

  /** Set a groupParent entry and keep groupChildren in sync. */
  /** @internal */
  linkGroupParent(childId: string, parentId: string): void {
    GroupOps.linkGroupParent(this, childId, parentId);
  }

  /** Remove a groupParent entry and keep groupChildren in sync. */
  /** @internal */ unlinkGroupParent(childId: string): void {
    GroupOps.unlinkGroupParent(this, childId);
  }

  /** Rebuild the groupChildren reverse index from groupParent. */
  /** @internal */ rebuildGroupChildren(): void {
    this.groupChildren.clear();
    for (const [child, parent] of this.groupParent) {
      let children = this.groupChildren.get(parent);
      if (!children) {
        children = new Set();
        this.groupChildren.set(parent, children);
      }
      children.add(child);
    }
  }

  deleteNodes(ids: string[]): void {
    NodeOps.deleteNodes(this, ids);
  }

  // ── Flip / arrange / align / distribute ─────────────────────
  // Implementation: ./spatialengine_arrange.ts

  flipSelectedHorizontal(): void {
    ArrangeOps.flipSelectedHorizontal(this);
  }

  flipSelectedVertical(): void {
    ArrangeOps.flipSelectedVertical(this);
  }

  /**
   * Re-layout selected nodes in one undo step: layered left-to-right flow when
   * selected edges form a DAG (with barycenter crossing reduction), otherwise a
   * tidy reading-order grid; then overlap refinement for nodes and estimated
   * wire labels. Skips edges and locked nodes.
   */
  arrangeSelectedNodes(
    measuredHeights?: Record<string, number>,
    labelLayoutZoom = 1,
  ): void {
    ArrangeOps.arrangeSelectedNodes(this, measuredHeights, labelLayoutZoom);
  }

  /**
   * Same algorithm as `arrangeSelectedNodes`, but over every unlocked non-edge
   * node on the board (no selection required). Bottom-bar “arrange board” entry.
   */
  arrangeAllNodes(
    measuredHeights?: Record<string, number>,
    labelLayoutZoom = 1,
  ): void {
    ArrangeOps.arrangeAllNodes(this, measuredHeights, labelLayoutZoom);
  }

  /** Axis alignment for multi-select (union bbox reference). Skips edges and locked nodes. */
  alignSelectedNodes(
    mode: SelectionAlignMode,
    measuredHeights?: Record<string, number>,
  ): void {
    ArrangeOps.alignSelectedNodes(this, mode, measuredHeights);
  }

  /**
   * Even spacing between adjacent items along `axis` (sort by min edge on that axis).
   * Gaps are never negative: if the union bbox is narrower than the sum of sizes,
   * uses zero gap and centers the packed strip on the original bbox so nothing overlaps.
   * Skips edges and locked nodes.
   */
  distributeSelectedNodes(
    axis: SelectionDistributeAxis,
    measuredHeights?: Record<string, number>,
  ): void {
    ArrangeOps.distributeSelectedNodes(this, axis, measuredHeights);
  }

  // --- Grouping ---

  groupSelected(): void {
    GroupOps.groupSelected(this);
  }

  ungroupSelected(): void {
    GroupOps.ungroupSelected(this);
  }

  selectionHasGroup(): boolean {
    return GroupOps.selectionHasGroup(this);
  }

  /** Returns the outermost groupId if all selected nodes belong to the same group tree, else undefined. */
  selectionGroupId(): string | undefined {
    return GroupOps.selectionGroupId(this);
  }

  /** True if all selected nodes belong to exactly one group (possibly nested). */
  selectionIsSingleGroup(): boolean {
    return GroupOps.selectionIsSingleGroup(this);
  }

  getGroupMembers(groupId: string): SpatialNode[] {
    return GroupOps.getGroupMembers(this, groupId);
  }

  /** Enter a group for drill-down selection of individual children. */
  enterGroup(groupId: string): void {
    GroupOps.enterGroup(this, groupId);
  }

  /** Fully exit all group levels and deselect. */
  exitAllGroups(): void {
    GroupOps.exitAllGroups(this);
  }

  /** Exit the active group — go up one level for nested groups, or exit entirely. */
  exitGroup(): void {
    GroupOps.exitGroup(this);
  }

  /** Check if a node belongs to the currently active (entered) group or any of its descendants. */
  isNodeInActiveGroup(nodeId: string): boolean {
    return GroupOps.isNodeInActiveGroup(this, nodeId);
  }

  /** Get the outermost group of a node (stopping at activeGroupId boundary). */
  getNodeOutermostGroup(nodeId: string): string | undefined {
    return GroupOps.getNodeOutermostGroup(this, nodeId);
  }

  /** Get all nodes that are descendants of a group (direct + nested sub-groups). */
  getAllGroupDescendantNodes(groupId: string): SpatialNode[] {
    return GroupOps.getAllGroupDescendantNodes(this, groupId);
  }

  // ── Duplicate / clipboard / templates ───────────────────────
  // Implementation: ./spatialengine_clipboard.ts

  duplicateSelected(): void {
    ClipboardOps.duplicateSelected(this);
  }

  copySelected(): void {
    ClipboardOps.copySelected(this);
  }

  cutSelected(): void {
    ClipboardOps.cutSelected(this);
  }

  /**
   * Paste clipboard contents centered at a canvas position.
   * If no position given, uses viewport center.
   */
  pasteClipboard(canvasX?: number, canvasY?: number): void {
    ClipboardOps.pasteClipboard(this, canvasX, canvasY);
  }

  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(templateId: string, cx: number, cy: number): void {
    ClipboardOps.applyTemplate(this, templateId, cx, cy);
  }

  hasClipboard(): boolean {
    return this.clipboard.length > 0;
  }

  getClipboardNodes(): SpatialNode[] {
    return this.clipboard.map((n) => structuredClone(n));
  }

  setClipboard(nodes: SpatialNode[]): void {
    this.clipboard = nodes.map((n) => structuredClone(n));
    this.pasteCount = 0;
  }

  // --- Mode ---

  setMode(mode: Mode): void {
    if (this.mode === mode) return;
    this.mode = mode;
    if (this.selection.size > 0) {
      this.selection.clear();
      this.emit("selection");
    }
    this.emit("mode");
  }

  // --- History ---

  /** End a coalesced inspector/gesture history session (see `updateNodeWithHistoryCoalesced`). */
  endHistoryCoalesce(): void {
    HistoryOps.endHistoryCoalesce(this);
  }

  pushHistorySnapshot(): void {
    HistoryOps.pushHistorySnapshot(this);
  }

  /*private*/ rebuildQuadTree(): void {
    this.quadTree.clear();
    this.adjacency.clear();
    let minZ = 0;
    let maxZ = 0;
    for (const node of this.nodes.values()) {
      this.quadTree.insert(node);
      if (node.z < minZ) minZ = node.z;
      if (node.z > maxZ) maxZ = node.z;
      if (node.type === "edge") {
        const edge = node as import("./types").EdgeNode;
        const { fromId, toId } = edge.data;
        if (!this.adjacency.has(fromId)) this.adjacency.set(fromId, new Set());
        if (!this.adjacency.has(toId)) this.adjacency.set(toId, new Set());
        this.adjacency.get(fromId)!.add(node.id);
        this.adjacency.get(toId)!.add(node.id);
      }
    }
    this._minZ = minZ;
    this.nextZValue = maxZ + 1;
  }

  undo(): void {
    HistoryOps.undo(this);
  }

  redo(): void {
    HistoryOps.redo(this);
  }

  canUndo(): boolean {
    return HistoryOps.canUndo(this);
  }

  canRedo(): boolean {
    return HistoryOps.canRedo(this);
  }

  // --- Remote Collaboration ---

  /** Add a remote node without emitting events or pushing history. */
  addRemoteNode(node: SpatialNode): void {
    this._suppressEvents = true;
    this.nodes.set(node.id, node);
    this.quadTree.insert(node);

    // Update adjacency for edges
    if (node.type === "edge") {
      const edge = node as import("./types").EdgeNode;
      const { fromId, toId } = edge.data;
      if (!this.adjacency.has(fromId)) this.adjacency.set(fromId, new Set());
      if (!this.adjacency.has(toId)) this.adjacency.set(toId, new Set());
      this.adjacency.get(fromId)!.add(node.id);
      this.adjacency.get(toId)!.add(node.id);
    }

    // Update z-counters
    if (node.z >= this.nextZValue) this.nextZValue = node.z + 1;
    if (node.z < this._minZ) this._minZ = node.z;

    this._suppressEvents = false;
    this.refreshSearchIfNeeded();
  }

  /** Delete a remote node without emitting events or pushing history. */
  deleteRemoteNode(id: string): void {
    this._suppressEvents = true;
    const node = this.nodes.get(id);
    if (node) {
      this.quadTree.remove(node);
      this.nodes.delete(id);
      this.selection.delete(id);
      this.adjacency.delete(id);
      this.frameChildren.delete(id);
      for (const children of this.frameChildren.values()) children.delete(id);

      // Cascade: delete edges connected to this node
      for (const [edgeId, edgeNode] of this.nodes) {
        if (edgeNode.type === "edge") {
          const data = edgeNode.data as { fromId: string; toId: string };
          if (data.fromId === id || data.toId === id) {
            const edge = this.nodes.get(edgeId);
            if (edge) this.quadTree.remove(edge);
            this.nodes.delete(edgeId);
            this.selection.delete(edgeId);
            const otherId = data.fromId === id ? data.toId : data.fromId;
            this.adjacency.get(otherId)?.delete(edgeId);
          }
        }
      }
    }
    this._suppressEvents = false;
    this.refreshSearchIfNeeded();
  }

  /** Apply a remote node update without emitting events or pushing history. */
  applyRemoteNodeUpdate(id: string, props: Partial<SpatialNode>): void {
    this._suppressEvents = true;
    const existing = this.nodes.get(id);
    if (existing) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updated: any = { ...existing, ...props };
      if (
        props.data &&
        typeof props.data === "object" &&
        existing.data &&
        typeof existing.data === "object"
      ) {
        updated.data = {
          ...(existing as { data: Record<string, unknown> }).data,
          ...(props as { data: Record<string, unknown> }).data,
        };
      }
      this.nodes.set(id, updated);

      // Update QuadTree if geometry changed
      if (
        existing.x !== updated.x ||
        existing.y !== updated.y ||
        existing.w !== updated.w ||
        existing.h !== updated.h
      ) {
        this.quadTree.remove(existing);
        this.quadTree.insert(updated);
        this.updateConnectedEdges(id);
      }

      // Update z-counter
      if (updated.z >= this.nextZValue) this.nextZValue = updated.z + 1;
      if (props.data) this.refreshSearchIfNeeded();
    }
    this._suppressEvents = false;
  }

  /** Trigger a re-render without pushing history. Used after remote updates. */
  notifyChange(): void {
    this._changeTick++;
    this.listeners["change"]?.forEach((cb) => (cb as () => void)());
  }

  /** Emit draw progress for collab live stroke preview. */
  notifyDrawProgress(stroke: {
    points: Array<[number, number, number]>;
    color: string;
    width: number;
    strokeStyle?: string;
    opacity?: number;
  }): void {
    this.emit("draw:progress", stroke);
  }

  /** Emit draw end when a stroke is completed or cancelled. */
  notifyDrawEnd(): void {
    this.emit("draw:end");
  }

  /** Emit shape progress for collab live shape preview. */
  notifyShapeProgress(preview: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    shapeType: string;
    stroke: string;
    strokeWidth: number;
    opacity?: number;
    roughness?: number;
    fill?: string;
    fillStyle?: FillStyle;
    strokeStyle?: StrokeStyle;
    edgeStyle?: StrokeSharpness;
  }): void {
    this.emit("shape:progress", preview);
  }

  /** Emit shape end when shape creation is completed or cancelled. */
  notifyShapeEnd(): void {
    this.emit("shape:end");
  }

  /** Emit edge creation drag progress for collab preview. */
  notifyEdgeProgress(preview: EdgeCreationAwareness): void {
    this.emit("edge:progress", preview);
  }

  /** Emit when edge creation drag ends (commit or cancel). */
  notifyEdgeEnd(): void {
    this.emit("edge:end");
  }

  /** Frame / text / note / sticky rectangle drag preview for collab. */
  notifyRectDragProgress(preview: RectDragAwareness): void {
    this.emit("rectDrag:progress", preview);
  }

  notifyRectDragEnd(): void {
    this.emit("rectDrag:end");
  }

  /** Eraser drag trail + marked node IDs for collab preview. */
  notifyEraserProgress(preview: EraserAwareness): void {
    this.emit("eraser:progress", preview);
  }

  notifyEraserEnd(): void {
    this.emit("eraser:end");
  }

  /** Emit laser pointer progress for collab trail preview. */
  notifyLaserProgress(trail: Array<[number, number]>): void {
    this.emit("laser:progress", trail);
  }

  /** Emit laser pointer end when trail has fully faded. */
  notifyLaserEnd(): void {
    this.emit("laser:end");
  }

  // --- Serialization ---

  async toSBD(): Promise<string> {
    // Reverse frameChildren → childId → frameId so children serialize with
    // parent-relative coordinates (SBD v3). fromSBD resolves them back to
    // absolute and rebuildFrameChildren re-derives membership geometrically.
    const parentByChild = new Map<string, string>();
    for (const [frameId, children] of this.frameChildren) {
      for (const childId of children) parentByChild.set(childId, frameId);
    }
    return serializeToSBD(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? undefined,
      parentOf: (nodeId) => parentByChild.get(nodeId),
    });
  }

  async fromSBD(sbd: string): Promise<void> {
    this.history.clear();
    this.nodes.clear();
    this.groupParent.clear();
    this.groupChildren.clear();
    const { nodes: parsed, meta } = await parseSBD(sbd);
    if (meta.background) {
      this.boardBackground = meta.background;
      this.emit("background");
    }
    if (meta.originView) {
      this.originView = meta.originView;
    } else {
      this.originView = null;
    }
    let maxZ = 0;
    let minZ = 0;
    for (const node of parsed) {
      this.nodes.set(node.id, node);
      if (node.z > maxZ) maxZ = node.z;
      if (node.z < minZ) minZ = node.z;
    }
    this.rebuildQuadTree();
    this.rebuildFrameChildren();
    this.nextZValue = maxZ + 1;
    this._minZ = minZ;
    this.selection.clear();
    this.refreshSearchIfNeeded();
    // Apply origin view if saved, otherwise fit-to-content
    this.goToOriginView();
    this.emit("change");
    this.emit("selection");
    this.emit("history");
  }

  toJSON(): object {
    const result: Record<string, unknown> = {
      nodes: Array.from(this.nodes.entries()),
      viewport: this.viewport,
    };
    if (this.groupParent.size > 0) {
      result.groupParent = Array.from(this.groupParent.entries());
    }
    return result;
  }

  /** Build a groupParent map from untrusted entries, dropping any edge that
   *  would introduce a cycle. The group-walk loops (selection expansion, etc.)
   *  follow parent links unbounded, so a cyclic chain from a crafted board JSON
   *  would hang the tab; sanitizing at ingress protects every walk at once. */
  private static sanitizeGroupParent(entries: [string, string][]): Map<string, string> {
    const map = new Map<string, string>();
    for (const [child, parent] of entries) {
      if (child === parent) continue;
      let cur: string | undefined = parent;
      let steps = 0;
      let cyclic = false;
      while (cur !== undefined && steps++ <= entries.length) {
        if (cur === child) { cyclic = true; break; }
        cur = map.get(cur);
      }
      if (!cyclic) map.set(child, parent);
    }
    return map;
  }

  fromJSON(json: { nodes: [string, SpatialNode][]; viewport?: Viewport; groupParent?: [string, string][] }): void {
    this.history.clear();
    this.nodes = new Map(json.nodes);
    this.groupParent = SpatialEngine.sanitizeGroupParent(json.groupParent ?? []);
    this.rebuildGroupChildren();
    this.rebuildQuadTree();
    this.rebuildFrameChildren();
    if (json.viewport) this.viewport = json.viewport;
    this.selection.clear();
    this.refreshSearchIfNeeded();
    this.emit("change");
    this.emit("viewport");
    this.emit("selection");
    this.emit("history");
  }

  // ═══════════════════════════════════════════════════════════════
  //  Agent API
  // ═══════════════════════════════════════════════════════════════

  // ── History grouping ─────────────────────────────────────────

  /** Begin a grouped agent action. All subsequent `addNode`/`addNodes` calls
   *  share one undo snapshot until `endAgentAction()` is called.
   *  Calling this while already inside a group is a no-op (idempotent).
   *
   *  Safety: if `endAgentAction()` is not called within `AGENT_ACTION_TIMEOUT_MS`
   *  (default 60s), the depth is force-reset to 0 so a crashed MCP client can't
   *  permanently disable per-op undo snapshots. In-process JS callers should
   *  prefer `runAgentAction(fn)` which handles begin/end via try/finally. */
  beginAgentAction(): void {
    if (this._agentActionDepth === 0) {
      this._historyCoalesceKey = null;
      this.history.pushSnapshot(this.nodes, this.groupParent);
      this.emit("history");
    }
    this._agentActionDepth++;
    if (this._agentActionTimer) clearTimeout(this._agentActionTimer);
    this._agentActionTimer = setTimeout(() => {
      console.warn(
        `[SpatialEngine] Agent action timed out after ${SpatialEngine.AGENT_ACTION_TIMEOUT_MS}ms — force-resetting depth (was ${this._agentActionDepth}).`,
      );
      this._agentActionDepth = 0;
      this._agentActionTimer = null;
    }, SpatialEngine.AGENT_ACTION_TIMEOUT_MS);
  }

  /** End a grouped agent action. The undo snapshot pushed by `beginAgentAction()`
   *  now covers all intermediate mutations. */
  endAgentAction(): void {
    if (this._agentActionDepth > 0) {
      this._agentActionDepth--;
    }
    if (this._agentActionDepth === 0 && this._agentActionTimer) {
      clearTimeout(this._agentActionTimer);
      this._agentActionTimer = null;
    }
  }

  /** Run a callback inside a `begin/end` agent action with try/finally semantics.
   *  Use this from in-process JS callers (the dev-app demo, tests, etc.) so a
   *  thrown exception can never leak `_agentActionDepth`. Supports sync + async. */
  runAgentAction<T>(fn: () => T | Promise<T>): T | Promise<T> {
    this.beginAgentAction();
    try {
      const result = fn();
      if (result && typeof (result as { then?: unknown }).then === "function") {
        return (result as Promise<T>).finally(() => this.endAgentAction());
      }
      this.endAgentAction();
      return result;
    } catch (err) {
      this.endAgentAction();
      throw err;
    }
  }

  /** Whether the engine is inside a `beginAgentAction()` / `endAgentAction()` block. */
  get isInAgentAction(): boolean {
    return this._agentActionDepth > 0;
  }

  // ── Mode + tool bundling / convenience creation ─────────────
  // Implementation: ./spatialengine_create.ts

  /** Set mode and active tool in a single call — reduces agent round-trips. */
  activateTool(config: {
    mode: Mode;
    color?: string;
    width?: number;
    shapeType?: ShapeType;
    fillColor?: string;
    fillStyle?: FillStyle;
    strokeStyle?: StrokeStyle;
    roughness?: number;
    opacity?: number;
    fontSize?: number;
    fontFamily?: string;
    textAlign?: TextAlign;
    edgeType?: EdgeType;
    arrowHead?: ArrowMarker;
    arrowTail?: ArrowMarker;
  }): void {
    CreateOps.activateTool(this, config);
  }

  /** Create a shape node (rect, ellipse, diamond, line, arrow).
   *  Returns the new node id. */
  createShape(
    shape: ShapeType,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: {
      stroke?: string;
      strokeWidth?: number;
      fill?: string;
      fillStyle?: FillStyle;
      roughness?: number;
      opacity?: number;
      label?: string;
      labelFontSize?: number;
      strokeStyle?: StrokeStyle;
      edgeStyle?: StrokeSharpness;
    },
  ): string {
    return CreateOps.createShape(this, shape, x, y, w, h, options);
  }

  /** Create a text node. Returns the new node id. */
  createText(
    text: string,
    x: number,
    y: number,
    options?: {
      w?: number;
      fontSize?: number;
      fontFamily?: string;
      color?: string;
      align?: TextAlign;
      opacity?: number;
      borderColor?: string;
      borderWidth?: number;
      borderStyle?: StrokeStyle;
    },
  ): string {
    return CreateOps.createText(this, text, x, y, options);
  }

  /** Create a sticky note. Returns the new node id. */
  createSticky(
    text: string,
    x: number,
    y: number,
    options?: {
      w?: number;
      h?: number;
      color?: string;
      fontSize?: number;
      opacity?: number;
      edgeStyle?: StrokeSharpness;
    },
  ): string {
    return CreateOps.createSticky(this, text, x, y, options);
  }

  /** Create a rich-content block (BlockNote). Returns the new node id. */
  createBlockNote(
    blocks: unknown[],
    x: number,
    y: number,
    options?: {
      w?: number;
      h?: number | "auto";
      markdown?: string;
      borderColor?: string;
      borderWidth?: number;
      borderStyle?: StrokeStyle;
      opacity?: number;
      edgeStyle?: StrokeSharpness;
    },
  ): string {
    return CreateOps.createBlockNote(this, blocks, x, y, options);
  }

  /** Create a frame node. Returns the new node id. */
  createFrame(
    x: number,
    y: number,
    w: number,
    h: number,
    options?: {
      label?: string;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      borderStyle?: StrokeStyle;
      opacity?: number;
      slideOrder?: number;
      devicePreset?: string;
    },
  ): string {
    return CreateOps.createFrame(this, x, y, w, h, options);
  }

  /** Create an image node. Returns the new node id. */
  createImage(
    src: string,
    x: number,
    y: number,
    options?: {
      w?: number;
      h?: number;
      alt?: string;
      opacity?: number;
      flipH?: boolean;
      flipV?: boolean;
      borderColor?: string;
      borderWidth?: number;
      borderStyle?: StrokeStyle;
    },
  ): string {
    return CreateOps.createImage(this, src, x, y, options);
  }

  /** Create a draw stroke (freehand drawing). Returns the new node id.
   *  Points are in canvas coordinates; they are normalized relative to the
   *  computed bounding box internally. */
  createDrawStroke(
    points: Array<[number, number, number?]>,
    options?: {
      color?: string;
      width?: number;
      tool?: "pen" | "pencil" | "highlighter" | "vector";
      opacity?: number;
      fill?: string;
      fillStyle?: FillStyle;
      strokeStyle?: StrokeStyle;
    },
  ): string {
    return CreateOps.createDrawStroke(this, points, options);
  }

  /** Create an edge connecting two nodes. Returns the new node id. */
  createEdge(
    fromId: string,
    toId: string,
    options?: {
      label?: string;
      color?: string;
      strokeWidth?: number;
      edgeType?: EdgeType;
      arrowHead?: ArrowMarker;
      arrowTail?: ArrowMarker;
      sourceHandle?: HandleSide;
      targetHandle?: HandleSide;
      style?: StrokeStyle;
      animated?: boolean;
      animatedDirection?: "forward" | "reverse" | "both" | "bop";
      sourcePort?: string;
      targetPort?: string;
      roughness?: number;
      attachmentGap?: number;
    },
  ): string {
    return CreateOps.createEdge(this, fromId, toId, options);
  }


  // ── State observation ───────────────────────────────────────
  // Implementation: ./spatialengine_agent.ts

  /** Full structured snapshot of the engine for agent/LLM consumption.
   *
   *  Defaults to a 200-node cap to keep LLM context manageable on large boards.
   *  Pass `limit: 0` to disable the cap (caller takes responsibility for size).
   *  Use `nodeIds` / `types` / `region` to narrow before truncation. */
  getAgentState(options?: AgentStateOptions): AgentCanvasState {
    return AgentOps.getAgentState(this, options);
  }

  /** Human-readable markdown summary of the current canvas, optimized for LLM prompts. */
  getAgentStateMarkdown(options?: AgentStateOptions): string {
    return AgentOps.getAgentStateMarkdown(this, options);
  }

  // ── Viewport animation ──────────────────────────────────────
  // Implementation: ./spatialengine_camera.ts

  /** Smoothly animate the viewport to a target position/zoom.
   *  Returns a Promise that resolves when the animation completes. */
  animateViewport(
    target: { x?: number; y?: number; zoom?: number },
    options?: { duration?: number },
  ): Promise<void> {
    return CameraOps.animateViewport(this, target, options);
  }

  /** Smoothly pan so the canvas point (cx, cy) is centered.
   *  Returns a Promise that resolves when the animation completes. */
  animatePanTo(cx: number, cy: number, duration?: number): Promise<void> {
    return CameraOps.animatePanTo(this, cx, cy, duration);
  }

  /** Smoothly zoom to a level. Returns a Promise that resolves when done. */
  animateZoomTo(level: number, duration?: number): Promise<void> {
    return CameraOps.animateZoomTo(this, level, duration);
  }

  /** Smoothly zoom and center on a specific node, sized to fit with padding.
   *  Returns a Promise that resolves when the animation completes. */
  animateZoomToNode(nodeId: string, duration?: number): Promise<void> {
    return CameraOps.animateZoomToNode(this, nodeId, duration);
  }
}
