import { nanoid } from "nanoid";
import type {
  SpatialNode,
  DrawNode,
  ShapeNode,
  Viewport,
  Mode,
  ActiveTool,
  NodeType,
  ImageNode,
  FrameNode,
} from "./types";
import { TEMPLATES } from "../templates";
import { History } from "./history";
import { hitTest, hitTestAll } from "./spatial-index";
import { QuadTree } from "./QuadTree";
import {
  screenToCanvas,
  canvasToScreen,
  applyZoom,
  applyZoomFactor,
  clamp,
} from "./viewport";
import { serializeToSBD } from "../serialization/sbd-serializer";
import { parseSBD } from "../serialization/sbd-parser";
import { computeEdgePath } from "./edge-geometry";
import type {
  NodeTypeRegistry,
  SpatialNodeTypeCatalogEntry,
} from "../nodes/registry";
import { spatialPerf } from "../perf/spatial-perf";
import { computeSelectionArrangement } from "./arrange-selection";
import type { EdgeCreationAwareness } from "../collab/edge-creation-awareness";
import type { RectDragAwareness } from "../collab/rect-drag-awareness";
import type { EraserAwareness } from "../collab/eraser-awareness";

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

interface DragSnapContext {
  staticNodes: Array<{ x: number; y: number; w: number; h: number }>;
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
    fillStyle?: "hachure" | "cross-hatch" | "solid";
    strokeStyle?: "solid" | "dashed" | "dotted";
    edgeStyle?: "sharp" | "round";
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

/** Compute alignment guides between a drag bounding box and static nodes. */
function computeAlignGuidesInternal(
  dragBox: { x: number; y: number; w: number; h: number },
  staticNodes: Array<{ x: number; y: number; w: number; h: number }>,
  threshold: number,
): { guides: AlignGuide[]; snapDx: number; snapDy: number } {
  const dLeft = dragBox.x, dCx = dragBox.x + dragBox.w / 2, dRight = dragBox.x + dragBox.w;
  const dTop = dragBox.y, dCy = dragBox.y + dragBox.h / 2, dBottom = dragBox.y + dragBox.h;
  const dragXEdges = [dLeft, dCx, dRight];
  const dragYEdges = [dTop, dCy, dBottom];

  let bestSnapDx = Infinity;
  let bestSnapDy = Infinity;
  const rawGuides: AlignGuide[] = [];

  for (const sn of staticNodes) {
    const sLeft = sn.x, sCx = sn.x + sn.w / 2, sRight = sn.x + sn.w;
    const sTop = sn.y, sCy = sn.y + sn.h / 2, sBottom = sn.y + sn.h;
    const staticXEdges = [sLeft, sCx, sRight];
    const staticYEdges = [sTop, sCy, sBottom];

    for (const dv of dragXEdges) {
      for (const sv of staticXEdges) {
        const diff = sv - dv;
        if (Math.abs(diff) <= threshold) {
          if (Math.abs(diff) < Math.abs(bestSnapDx)) bestSnapDx = diff;
          rawGuides.push({
            axis: 'x',
            position: sv,
            start: Math.min(dragBox.y, dragBox.y + dragBox.h, sn.y, sn.y + sn.h),
            end: Math.max(dragBox.y, dragBox.y + dragBox.h, sn.y, sn.y + sn.h),
          });
        }
      }
    }

    for (const dv of dragYEdges) {
      for (const sv of staticYEdges) {
        const diff = sv - dv;
        if (Math.abs(diff) <= threshold) {
          if (Math.abs(diff) < Math.abs(bestSnapDy)) bestSnapDy = diff;
          rawGuides.push({
            axis: 'y',
            position: sv,
            start: Math.min(dragBox.x, dragBox.x + dragBox.w, sn.x, sn.x + sn.w),
            end: Math.max(dragBox.x, dragBox.x + dragBox.w, sn.x, sn.x + sn.w),
          });
        }
      }
    }
  }

  const merged = new Map<string, AlignGuide>();
  for (const g of rawGuides) {
    const key = `${g.axis}:${g.position.toFixed(1)}`;
    const existing = merged.get(key);
    if (existing) {
      existing.start = Math.min(existing.start, g.start);
      existing.end = Math.max(existing.end, g.end);
    } else {
      merged.set(key, { ...g });
    }
  }

  return {
    guides: Array.from(merged.values()),
    snapDx: Math.abs(bestSnapDx) <= threshold ? bestSnapDx : 0,
    snapDy: Math.abs(bestSnapDy) <= threshold ? bestSnapDy : 0,
  };
}

export class SpatialEngine {
  nodes: Map<string, SpatialNode> = new Map();
  viewport: Viewport = { x: 0, y: 0, zoom: 1 };
  selection: Set<string> = new Set();
  activeGroupId: string | null = null;
  groupRotations = new Map<string, { angle: number; cx: number; cy: number }>();
  /** Maps child groupId → parent groupId for nested groups. */
  groupParent = new Map<string, string>();
  /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
  private groupChildren = new Map<string, Set<string>>();
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
  presentationMode = false;
  presentationSlides: string[] = [];
  presentationIndex = 0;
  private _presentationAnimId: number | null = null;
  /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
  private _transitionOverlay: {
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
  private _containerWidth = 2000;
  private _containerHeight = 1500;

  private history = new History();
  /** When set, `updateNodeWithHistoryCoalesced` reuses one undo step until `endHistoryCoalesce()`. */
  private _historyCoalesceKey: string | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners: { [K in keyof EventMap]?: Set<(...args: any[]) => void> } = {};
  private _suppressEvents = false;
  private _collabMode = false;
  private clipboard: SpatialNode[] = [];
  private pasteCount = 0;
  private nextZValue = 1;
  private _minZ = 0;
  private quadTree = new QuadTree({ x: -100000, y: -100000, w: 200000, h: 200000 });
  private adjacency = new Map<string, Set<string>>();
  /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
  private frameChildren = new Map<string, Set<string>>();
  /** Node types that act as containers (frame-like behavior). "frame" is always included. */
  private _containerTypes = new Set<string>(["frame"]);
  private registry?: NodeTypeRegistry;
  /** Measured heights for auto-height nodes (canvas-coordinate units). */
  private _measuredHeights: Record<string, number> = {};
  private _search: SpatialSearchState = {
    query: "",
    matches: [],
    activeIndex: -1,
  };

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
    const edgeIds = this.adjacency.get(nodeId);
    if (!edgeIds) return [];
    const result: SpatialNode[] = [];
    for (const eid of edgeIds) {
      const n = this.nodes.get(eid);
      if (n && n.type === "edge") result.push(n);
    }
    return result;
  }

  /** Get all edge nodes in the board. */
  getAllEdges(): SpatialNode[] {
    const result: SpatialNode[] = [];
    for (const n of this.nodes.values()) {
      if (n.type === "edge") result.push(n);
    }
    return result;
  }

  /** Set the container element (used by SpatialCanvas on mount). */
  setContainer(el: HTMLElement | null): void {
    this._container = el;
  }

  /** Get the window object for the container (supports pop-out windows). */
  private getWindow(): Window {
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

  private emit<K extends keyof EventMap>(event: K, ...args: Parameters<EventMap[K]>): void {
    if (this._suppressEvents) return;
    this.listeners[event]?.forEach((cb) => (cb as (...a: unknown[]) => void)(...args));
  }

  /** Request entering image crop mode (handled by the canvas component). */
  requestImageCrop(nodeId: string): void {
    this.emit("image:cropRequest", nodeId);
  }

  // --- Search ---

  getSearchState(): SpatialSearchState {
    return {
      query: this._search.query,
      matches: this._search.matches.map((m) => ({ ...m })),
      activeIndex: this._search.activeIndex,
    };
  }

  setSearchQuery(query: string): void {
    const normalized = query.trim();
    if (normalized.length === 0) {
      this._search = { query: "", matches: [], activeIndex: -1 };
      this.emit("search");
      return;
    }
    const matches = this.computeSearchMatches(normalized);
    this._search = {
      query: normalized,
      matches,
      activeIndex: matches.length > 0 ? 0 : -1,
    };
    this.emit("search");
  }

  clearSearch(): void {
    if (!this._search.query && this._search.matches.length === 0 && this._search.activeIndex === -1) return;
    this._search = { query: "", matches: [], activeIndex: -1 };
    this.emit("search");
  }

  setSearchActiveIndex(index: number): void {
    if (this._search.matches.length === 0) {
      if (this._search.activeIndex !== -1) {
        this._search = { ...this._search, activeIndex: -1 };
        this.emit("search");
      }
      return;
    }
    const clamped = Math.max(0, Math.min(this._search.matches.length - 1, index));
    if (clamped === this._search.activeIndex) return;
    this._search = { ...this._search, activeIndex: clamped };
    this.emit("search");
  }

  searchNext(): void {
    const total = this._search.matches.length;
    if (total === 0) return;
    const next = this._search.activeIndex < 0 ? 0 : (this._search.activeIndex + 1) % total;
    this.setSearchActiveIndex(next);
  }

  searchPrev(): void {
    const total = this._search.matches.length;
    if (total === 0) return;
    const prev = this._search.activeIndex < 0 ? 0 : (this._search.activeIndex - 1 + total) % total;
    this.setSearchActiveIndex(prev);
  }

  focusSearchResult(index: number, options?: { select?: boolean; center?: boolean; minZoom?: number }): void {
    if (this._search.matches.length === 0) return;
    const clamped = Math.max(0, Math.min(this._search.matches.length - 1, index));
    const match = this._search.matches[clamped];
    if (!this.nodes.has(match.nodeId)) return;
    this.setSearchActiveIndex(clamped);
    if (options?.select !== false) this.select(match.nodeId);
    if (options?.center !== false) {
      const minZoom = options?.minZoom ?? 0.9;
      this.zoomToNode(match.nodeId, Math.max(this.viewport.zoom, minZoom));
    }
  }

  focusActiveSearchResult(options?: { select?: boolean; center?: boolean; minZoom?: number }): void {
    if (this._search.activeIndex < 0) return;
    this.focusSearchResult(this._search.activeIndex, options);
  }

  private refreshSearchIfNeeded(): void {
    if (!this._search.query) return;
    const previousActiveNodeId =
      this._search.activeIndex >= 0 ? this._search.matches[this._search.activeIndex]?.nodeId : undefined;
    const matches = this.computeSearchMatches(this._search.query);
    let activeIndex = -1;
    if (matches.length > 0) {
      if (previousActiveNodeId) {
        const sameNodeIndex = matches.findIndex((m) => m.nodeId === previousActiveNodeId);
        activeIndex = sameNodeIndex >= 0 ? sameNodeIndex : 0;
      } else {
        activeIndex = 0;
      }
    }
    this._search = {
      query: this._search.query,
      matches,
      activeIndex,
    };
    this.emit("search");
  }

  private computeSearchMatches(query: string): SpatialSearchMatch[] {
    const q = query.toLocaleLowerCase();
    const matches: SpatialSearchMatch[] = [];
    const sortedNodes = Array.from(this.nodes.values()).sort((a, b) => a.z - b.z);
    for (const node of sortedNodes) {
      const candidates = this.getNodeSearchCandidates(node);
      for (const candidate of candidates) {
        const count = this.countOccurrences(candidate.text.toLocaleLowerCase(), q);
        if (count > 0) {
          matches.push({
            nodeId: node.id,
            nodeType: node.type,
            field: candidate.field,
            text: candidate.text,
            matchCount: count,
          });
        }
      }
    }
    return matches;
  }

  private getNodeSearchCandidates(node: SpatialNode): Array<{ field: SpatialSearchField; text: string }> {
    if (!node.data || typeof node.data !== "object") return [];
    const data = node.data as Record<string, unknown>;
    const out: Array<{ field: SpatialSearchField; text: string }> = [];
    const push = (field: SpatialSearchField, value: unknown) => {
      if (typeof value !== "string") return;
      const trimmed = value.trim();
      if (!trimmed) return;
      out.push({ field, text: trimmed });
    };

    switch (node.type) {
      case "text":
      case "sticky":
        push("text", data.text);
        break;
      case "shape":
      case "edge":
      case "frame":
        push("label", data.label);
        break;
      case "content": {
        const blockText = this.extractBlockText(data.blocks);
        push("content", blockText);
        push("content", data.markdown);
        break;
      }
      default:
        break;
    }
    return out;
  }

  private extractBlockText(blocks: unknown): string {
    if (!Array.isArray(blocks)) return "";
    const walk = (items: unknown[]): string => {
      return items
        .map((item) => {
          if (!item || typeof item !== "object") return "";
          const b = item as { content?: Array<{ type?: string; text?: string }>; children?: unknown[] };
          const inline = Array.isArray(b.content)
            ? b.content
                .filter((c) => c && typeof c === "object" && (c.type ?? "text") === "text")
                .map((c) => (typeof c.text === "string" ? c.text : ""))
                .join("")
            : "";
          const children = Array.isArray(b.children) && b.children.length > 0 ? walk(b.children) : "";
          return children ? `${inline}\n${children}` : inline;
        })
        .filter(Boolean)
        .join("\n");
    };
    return walk(blocks);
  }

  private countOccurrences(haystackLower: string, needleLower: string): number {
    if (!needleLower) return 0;
    let idx = 0;
    let count = 0;
    while (idx <= haystackLower.length - needleLower.length) {
      const found = haystackLower.indexOf(needleLower, idx);
      if (found < 0) break;
      count += 1;
      idx = found + needleLower.length;
    }
    return count;
  }

  // --- Grid Snapping ---

  toggleSnapToGrid(): void {
    this.snapToGrid = !this.snapToGrid;
    this.emit("guides");
  }

  toggleFreeFormEdges(): void {
    this.freeFormEdges = !this.freeFormEdges;
    this.emit("change");
  }

  toggleSmartGuides(): void {
    this.smartGuides = !this.smartGuides;
    this.emit("guides");
  }

  setGridSize(size: number): void {
    const next = Math.max(1, Math.round(size));
    if (this.gridSize === next) return;
    this.gridSize = next;
    this.emit("guides");
  }

  toggleLassoSelect(): void {
    this.lassoSelect = !this.lassoSelect;
    this.emit("lassoToggle");
  }

  // ── Presentation mode ─────────────────────────────────────────

  enterPresentation(): void {
    // Collect all frame nodes with their slide order + position
    const frames: Array<{ id: string; x: number; y: number; order?: number }> = [];
    for (const node of this.nodes.values()) {
      if (node.type === "frame") {
        const data = node.data as { slideOrder?: number };
        frames.push({ id: node.id, x: node.x, y: node.y, order: data.slideOrder });
      }
    }
    if (frames.length === 0) return;

    // Separate frames with explicit order from auto-ordered ones
    const ordered = frames.filter((f) => f.order != null).sort((a, b) => a.order! - b.order!);
    const auto = frames.filter((f) => f.order == null);

    // Sort auto by reading order: group into rows (Y within 100px), then left-to-right
    const ROW_THRESHOLD = 100;
    auto.sort((a, b) => a.y - b.y);
    const rows: Array<typeof auto> = [];
    for (const f of auto) {
      const lastRow = rows[rows.length - 1];
      if (lastRow && Math.abs(f.y - lastRow[0].y) < ROW_THRESHOLD) {
        lastRow.push(f);
      } else {
        rows.push([f]);
      }
    }
    const autoSorted = rows.flatMap((row) => row.sort((a, b) => a.x - b.x));

    // Explicit-order frames first, then auto-ordered
    const sorted = [...ordered, ...autoSorted];

    this.presentationSlides = sorted.map((f) => f.id);
    this.presentationIndex = 0;
    this.presentationMode = true;
    // Clear selection so no handles are visible during presentation
    if (this.selection.size > 0) {
      this.selection.clear();
      this.emit("selection");
    }
    this.emit("presentation");
    this.presentationGoTo(0);
  }

  exitPresentation(): void {
    if (this._presentationAnimId != null) {
      cancelAnimationFrame(this._presentationAnimId);
      this._presentationAnimId = null;
    }
    this._transitionOverlay = null;
    this.presentationMode = false;
    this.presentationSlides = [];
    this.presentationIndex = 0;
    this.emit("presentation");
  }

  presentationNext(): void {
    if (this.presentationIndex < this.presentationSlides.length - 1) {
      this.presentationGoTo(this.presentationIndex + 1);
    }
  }

  presentationPrev(): void {
    if (this.presentationIndex > 0) {
      this.presentationGoTo(this.presentationIndex - 1);
    }
  }

  presentationGoTo(index: number): void {
    if (index < 0 || index >= this.presentationSlides.length) return;
    const frameId = this.presentationSlides[index];
    const frame = this.nodes.get(frameId);
    if (!frame) {
      this.exitPresentation();
      return;
    }
    const prevIndex = this.presentationIndex;
    this.presentationIndex = index;
    this.emit("presentation");

    // Cancel any in-progress animation
    if (this._presentationAnimId != null) {
      cancelAnimationFrame(this._presentationAnimId);
      this._presentationAnimId = null;
    }
    this._transitionOverlay = null;

    const target = this._computeSlideViewport(frame);
    const data = frame.data as FrameNode["data"];
    const transition = data.transition ?? "pan";
    const duration = data.transitionDuration; // undefined = use default per type
    const direction: 1 | -1 = index >= prevIndex ? 1 : -1;

    switch (transition) {
      case "none": this._transitionNone(target); break;
      case "fade": this._transitionFade(target, duration); break;
      case "dissolve": this._transitionDissolve(target, duration); break;
      case "zoom": this._transitionZoom(target, duration); break;
      case "fold": this._transitionFold(target, duration); break;
      case "cube": this._transitionCube(target, duration, direction); break;
      case "pan":
      default: this._transitionPan(target, duration); break;
    }
  }

  private _computeSlideViewport(frame: SpatialNode): { x: number; y: number; zoom: number } {
    const fh = this.resolveHeight(frame);
    const padding = 40;
    const fx = frame.x - padding;
    const fy = frame.y - padding;
    const fw = frame.w + padding * 2;
    const ffh = fh + padding * 2;
    const screenW = this._containerWidth;
    const screenH = this._containerHeight;
    const targetZoom = clamp(Math.min(screenW / fw, screenH / ffh), 0.1, 5);
    return {
      x: (screenW - fw * targetZoom) / 2 - fx * targetZoom,
      y: (screenH - ffh * targetZoom) / 2 - fy * targetZoom,
      zoom: targetZoom,
    };
  }

  /** Pan transition: smooth viewport interpolation (default). */
  private _transitionPan(target: { x: number; y: number; zoom: number }, durationMs?: number): void {
    const duration = durationMs ?? 400;
    const startTime = performance.now();
    const from = { ...this.viewport };
    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      this.viewport.x = from.x + (target.x - from.x) * ease;
      this.viewport.y = from.y + (target.y - from.y) * ease;
      this.viewport.zoom = from.zoom + (target.zoom - from.zoom) * ease;
      this.emit("viewport");
      if (t < 1) {
        this._presentationAnimId = requestAnimationFrame(animate);
      } else {
        this._presentationAnimId = null;
      }
    };
    this._presentationAnimId = requestAnimationFrame(animate);
  }

  /** None transition: instant viewport snap. */
  private _transitionNone(target: { x: number; y: number; zoom: number }): void {
    this.viewport.x = target.x;
    this.viewport.y = target.y;
    this.viewport.zoom = target.zoom;
    this.emit("viewport");
  }

  /** Fade transition: fade to black, snap viewport, fade from black. */
  private _transitionFade(target: { x: number; y: number; zoom: number }, durationMs?: number): void {
    const halfDuration = (durationMs ?? 500) / 2;
    const startTime = performance.now();

    const fadeOut = (now: number) => {
      const t = Math.min((now - startTime) / halfDuration, 1);
      this._transitionOverlay = { type: "fade", phase: "out", progress: t };
      this.emit("presentation");
      if (t < 1) {
        this._presentationAnimId = requestAnimationFrame(fadeOut);
      } else {
        // At peak darkness, snap viewport
        this.viewport.x = target.x;
        this.viewport.y = target.y;
        this.viewport.zoom = target.zoom;
        this.emit("viewport");
        // Phase 2: reveal
        const revealStart = performance.now();
        const fadeIn = (now2: number) => {
          const t2 = Math.min((now2 - revealStart) / halfDuration, 1);
          this._transitionOverlay = { type: "fade", phase: "in", progress: t2 };
          this.emit("presentation");
          if (t2 < 1) {
            this._presentationAnimId = requestAnimationFrame(fadeIn);
          } else {
            this._transitionOverlay = null;
            this._presentationAnimId = null;
            this.emit("presentation");
          }
        };
        this._presentationAnimId = requestAnimationFrame(fadeIn);
      }
    };
    this._presentationAnimId = requestAnimationFrame(fadeOut);
  }

  /** Dissolve transition: quick overlay fade, snap viewport at midpoint. */
  private _transitionDissolve(target: { x: number; y: number; zoom: number }, durationMs?: number): void {
    const duration = durationMs ?? 400;
    const startTime = performance.now();
    let viewportSnapped = false;

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      if (t < 0.5) {
        this._transitionOverlay = { type: "dissolve", phase: "out", progress: t * 2 };
      } else {
        if (!viewportSnapped) {
          this.viewport.x = target.x;
          this.viewport.y = target.y;
          this.viewport.zoom = target.zoom;
          this.emit("viewport");
          viewportSnapped = true;
        }
        this._transitionOverlay = { type: "dissolve", phase: "in", progress: (t - 0.5) * 2 };
      }
      this.emit("presentation");
      if (t < 1) {
        this._presentationAnimId = requestAnimationFrame(animate);
      } else {
        this._transitionOverlay = null;
        this._presentationAnimId = null;
        this.emit("presentation");
      }
    };
    this._presentationAnimId = requestAnimationFrame(animate);
  }

  /** Zoom transition: zoom out from current, zoom into target. */
  private _transitionZoom(target: { x: number; y: number; zoom: number }, durationMs?: number): void {
    const duration = durationMs ?? 600;
    const startTime = performance.now();
    const from = { ...this.viewport };

    // Intermediate "pulled back" state
    const midZoom = Math.max(0.1, Math.min(from.zoom, target.zoom) * 0.35);
    const midX = (from.x + target.x) / 2;
    const midY = (from.y + target.y) / 2;

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      if (t < 0.5) {
        const p = t * 2;
        const ease = 1 - Math.pow(1 - p, 3);
        this.viewport.x = from.x + (midX - from.x) * ease;
        this.viewport.y = from.y + (midY - from.y) * ease;
        this.viewport.zoom = from.zoom + (midZoom - from.zoom) * ease;
      } else {
        const p = (t - 0.5) * 2;
        const ease = 1 - Math.pow(1 - p, 3);
        this.viewport.x = midX + (target.x - midX) * ease;
        this.viewport.y = midY + (target.y - midY) * ease;
        this.viewport.zoom = midZoom + (target.zoom - midZoom) * ease;
      }
      this.emit("viewport");
      if (t < 1) {
        this._presentationAnimId = requestAnimationFrame(animate);
      } else {
        this._presentationAnimId = null;
      }
    };
    this._presentationAnimId = requestAnimationFrame(animate);
  }

  /** Fold transition: two halves fold shut like a book, snap viewport, unfold to reveal. */
  private _transitionFold(target: { x: number; y: number; zoom: number }, durationMs?: number): void {
    const duration = durationMs ?? 700;
    const startTime = performance.now();
    let viewportSnapped = false;

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      if (t < 0.5) {
        // Fold shut
        this._transitionOverlay = { type: "fold", phase: "out", progress: t * 2 };
      } else {
        if (!viewportSnapped) {
          this.viewport.x = target.x;
          this.viewport.y = target.y;
          this.viewport.zoom = target.zoom;
          this.emit("viewport");
          viewportSnapped = true;
        }
        // Unfold open
        this._transitionOverlay = { type: "fold", phase: "in", progress: (t - 0.5) * 2 };
      }
      this.emit("presentation");
      if (t < 1) {
        this._presentationAnimId = requestAnimationFrame(animate);
      } else {
        this._transitionOverlay = null;
        this._presentationAnimId = null;
        this.emit("presentation");
      }
    };
    this._presentationAnimId = requestAnimationFrame(animate);
  }

  /** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
  private _transitionCube(target: { x: number; y: number; zoom: number }, durationMs?: number, direction: 1 | -1 = 1): void {
    const duration = durationMs ?? 1200;
    const startTime = performance.now();
    let viewportSnapped = false;

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);

      // Snap viewport at midpoint (face is edge-on / invisible)
      if (t >= 0.5 && !viewportSnapped) {
        this.viewport.x = target.x;
        this.viewport.y = target.y;
        this.viewport.zoom = target.zoom;
        this.emit("viewport");
        viewportSnapped = true;
      }

      this._transitionOverlay = {
        type: "cube",
        phase: t < 0.5 ? "out" : "in",
        progress: t < 0.5 ? t * 2 : (t - 0.5) * 2,
        direction,
        t,
      };
      this.emit("presentation");

      if (t < 1) {
        this._presentationAnimId = requestAnimationFrame(animate);
      } else {
        this._transitionOverlay = null;
        this._presentationAnimId = null;
        this.emit("presentation");
      }
    };
    this._presentationAnimId = requestAnimationFrame(animate);
  }

  snap(x: number, y: number): { x: number; y: number } {
    if (!this.snapToGrid) return { x, y };
    return {
      x: Math.round(x / this.gridSize) * this.gridSize,
      y: Math.round(y / this.gridSize) * this.gridSize,
    };
  }

  /** Update the container dimensions (called from canvas resize observer). */
  setContainerSize(w: number, h: number): void {
    const oldW = this._containerWidth;
    const oldH = this._containerHeight;
    this._containerWidth = w;
    this._containerHeight = h;
    // Re-center the current slide when the container resizes during presentation
    if (this.presentationMode && this.presentationSlides.length > 0) {
      this.presentationGoTo(this.presentationIndex);
    } else if (oldW > 0 && oldH > 0) {
      // Maintain the visual center when the container resizes (e.g. panel split)
      this.viewport.x += (w - oldW) / 2;
      this.viewport.y += (h - oldH) / 2;
      this.emit("viewport");
    }
  }

  /**
   * Precompute static guide candidates for a drag gesture.
   * Reuse this context across pointermove frames to reduce QuadTree work.
   */
  createDragSnapContext(allDragIds: Set<string> | string[]): DragSnapContext {
    const dragIdSet = allDragIds instanceof Set ? allDragIds : new Set(allDragIds);
    const vx = -this.viewport.x / this.viewport.zoom;
    const vy = -this.viewport.y / this.viewport.zoom;
    const vw = this._containerWidth / this.viewport.zoom;
    const vh = this._containerHeight / this.viewport.zoom;
    const staticNodes: Array<{ x: number; y: number; w: number; h: number }> = [];
    const candidates = this.quadTree.retrieve([], { x: vx, y: vy, w: vw, h: vh });
    for (const n of candidates) {
      if (n.type === "edge" || dragIdSet.has(n.id)) continue;
      const nh = this.resolveHeight(n);
      staticNodes.push({ x: n.x, y: n.y, w: n.w, h: nh });
    }
    return { staticNodes };
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
    const shouldGridSnap = this.snapToGrid && !modKey;
    const shouldSmartGuide = this.smartGuides && !modKey;

    let finalDx = dx;
    let finalDy = dy;
    let newGuides: AlignGuide[] = [];
    const dragIdSet = allDragIds instanceof Set ? allDragIds : new Set(allDragIds);

    if (shouldSmartGuide) {
      // Compute bounding box of dragged selection at proposed position
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const orig of origPositions) {
        const n = this.getNode(orig.id);
        if (!n) continue;
        const nx = orig.x + dx;
        const ny = orig.y + dy;
        const nh = this.resolveHeight(n);
        minX = Math.min(minX, nx);
        minY = Math.min(minY, ny);
        maxX = Math.max(maxX, nx + n.w);
        maxY = Math.max(maxY, ny + nh);
      }
      const dragBox = { x: minX, y: minY, w: maxX - minX, h: maxY - minY };

      const staticNodes = dragSnapContext?.staticNodes ?? this.createDragSnapContext(dragIdSet).staticNodes;

      const result = computeAlignGuidesInternal(dragBox, staticNodes, 5);
      newGuides = result.guides;

      if (shouldGridSnap) {
        // Both active: use whichever is closer per axis
        const proposedX = origPositions[0].x + dx;
        const proposedY = origPositions[0].y + dy;
        const gridSnapped = this.snap(proposedX, proposedY);
        const gridDx = gridSnapped.x - proposedX;
        const gridDy = gridSnapped.y - proposedY;

        const useGuideX = result.snapDx !== 0 && Math.abs(result.snapDx) <= Math.abs(gridDx);
        const useGuideY = result.snapDy !== 0 && Math.abs(result.snapDy) <= Math.abs(gridDy);

        finalDx = dx + (useGuideX ? result.snapDx : gridDx);
        finalDy = dy + (useGuideY ? result.snapDy : gridDy);
        if (!useGuideX) newGuides = newGuides.filter(g => g.axis !== 'x');
        if (!useGuideY) newGuides = newGuides.filter(g => g.axis !== 'y');
      } else {
        finalDx = dx + result.snapDx;
        finalDy = dy + result.snapDy;
      }
    } else if (shouldGridSnap) {
      const snapped = this.snap(origPositions[0].x + dx, origPositions[0].y + dy);
      finalDx = snapped.x - origPositions[0].x;
      finalDy = snapped.y - origPositions[0].y;
    }

    this.alignGuides = newGuides;
    this.emit("guides");
    return { finalDx, finalDy };
  }

  /** Clear alignment guides (call on drag end). */
  clearAlignGuides(): void {
    if (this.alignGuides.length === 0) return;
    this.alignGuides = [];
    this.emit("guides");
  }

  // --- Board Background ---

  setBoardBackground(bg: BoardBackground): void {
    if (this.boardBackground === bg) return;
    this.boardBackground = bg;
    this.emit("background");
  }

  // --- Viewport ---

  pan(dx: number, dy: number): void {
    this.viewport.x += dx;
    this.viewport.y += dy;
    this.emit("viewport");
  }

  zoomByWheel(delta: number, screenX: number, screenY: number): void {
    this.viewport = applyZoom(
      this.viewport,
      delta,
      screenX - this.containerOffset.x,
      screenY - this.containerOffset.y
    );
    this.emit("viewport");
  }

  zoomByFactor(factor: number, screenX: number, screenY: number): void {
    this.viewport = applyZoomFactor(
      this.viewport,
      factor,
      screenX - this.containerOffset.x,
      screenY - this.containerOffset.y,
    );
    this.emit("viewport");
  }

  zoomTo(level: number, anchor?: { x: number; y: number }): void {
    const newZoom = clamp(level, 0.1, 5);
    if (anchor) {
      const ax = anchor.x - this.containerOffset.x;
      const ay = anchor.y - this.containerOffset.y;
      const canvasPoint = screenToCanvas(this.viewport, ax, ay);
      this.viewport = {
        x: ax - canvasPoint.x * newZoom,
        y: ay - canvasPoint.y * newZoom,
        zoom: newZoom,
      };
    } else {
      this.viewport.zoom = newZoom;
    }
    this.emit("viewport");
  }

  zoomIn(): void {
    this.zoomTo(this.viewport.zoom * 1.2);
  }

  zoomOut(): void {
    this.zoomTo(this.viewport.zoom / 1.2);
  }

  /** Zoom and pan to center a node for editing (e.g. after double-click on placeholder) */
  zoomToNode(nodeId: string, targetZoom = 1): void {
    const node = this.nodes.get(nodeId);
    if (!node) return;
    const h = node.h === "auto" ? 100 : (node.h as number);
    const cx = node.x + node.w / 2;
    const cy = node.y + h / 2;
    const win = this.getWindow();
    const screenW = win.innerWidth;
    const screenH = win.innerHeight;
    const newZoom = clamp(targetZoom, 0.2, 5);
    this.viewport = {
      x: screenW / 2 - cx * newZoom,
      y: screenH / 2 - cy * newZoom,
      zoom: newZoom,
    };
    this.emit("viewport");
  }

  fitToContent(): void {
    if (this.nodes.size === 0) return;

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (const node of this.nodes.values()) {
      const h = node.h === "auto" ? 100 : node.h;
      if (node.x < minX) minX = node.x;
      if (node.y < minY) minY = node.y;
      if (node.x + node.w > maxX) maxX = node.x + node.w;
      if (node.y + h > maxY) maxY = node.y + h;
    }

    const padding = 50;
    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;

    const contentW = maxX - minX;
    const contentH = maxY - minY;
    const screenW = this._containerWidth;
    const screenH = this._containerHeight;

    const zoom = clamp(
      Math.min(screenW / contentW, screenH / contentH),
      0.1,
      5
    );
    this.viewport = {
      x: (screenW - contentW * zoom) / 2 - minX * zoom,
      y: (screenH - contentH * zoom) / 2 - minY * zoom,
      zoom,
    };
    this.emit("viewport");
  }

  /** Save the current viewport as the origin view (restored on next load). */
  setOriginView(): void {
    this.originView = { ...this.viewport };
    this.emit("background");
  }

  /** Clear the saved origin view. */
  clearOriginView(): void {
    this.originView = null;
    this.emit("background");
  }

  /** Jump to the saved origin view, or fit-to-content if none is saved. */
  goToOriginView(): void {
    if (this.originView) {
      this.viewport = { ...this.originView };
      this.emit("viewport");
    } else {
      this.fitToContent();
    }
  }

  screenToCanvas(sx: number, sy: number): { x: number; y: number } {
    return screenToCanvas(
      this.viewport,
      sx - this.containerOffset.x,
      sy - this.containerOffset.y
    );
  }

  canvasToScreen(cx: number, cy: number): { x: number; y: number } {
    return canvasToScreen(this.viewport, cx, cy);
  }

  // --- Node CRUD ---

  addNode(node: SpatialNode): void {
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    this.nodes.set(node.id, node);
    this.quadTree.insert(node);
    if (node.z < this._minZ) this._minZ = node.z;

    // Update adjacency
    if (node.type === "edge") {
      const edge = node as import("./types").EdgeNode;
      const { fromId, toId } = edge.data;
      if (!this.adjacency.has(fromId)) this.adjacency.set(fromId, new Set());
      if (!this.adjacency.has(toId)) this.adjacency.set(toId, new Set());
      this.adjacency.get(fromId)!.add(node.id);
      this.adjacency.get(toId)!.add(node.id);
    }

    // Auto-add to frame if created inside one
    if (node.type !== "edge") {
      this.updateFrameMembership([node.id]);
    }

    // Lifecycle hooks
    this.registry?.get(node.type)?.onCreate?.(node, this);
    this.emit("node:create", node);

    this.refreshSearchIfNeeded();
    this.emit("change");
    this.emit("history");
  }

  addNodes(nodes: SpatialNode[]): void {
    if (nodes.length === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    for (const node of nodes) {
      this.nodes.set(node.id, node);
      this.quadTree.insert(node);

      if (node.type === "edge") {
        const edge = node as import("./types").EdgeNode;
        const { fromId, toId } = edge.data;
        if (!this.adjacency.has(fromId)) this.adjacency.set(fromId, new Set());
        if (!this.adjacency.has(toId)) this.adjacency.set(toId, new Set());
        this.adjacency.get(fromId)!.add(node.id);
        this.adjacency.get(toId)!.add(node.id);
      }
    }
    // Auto-add non-edge nodes to frames if created inside them
    const nonEdgeIds = nodes
      .filter((n) => n.type !== "edge")
      .map((n) => n.id);
    if (nonEdgeIds.length > 0) this.updateFrameMembership(nonEdgeIds);

    this.refreshSearchIfNeeded();
    this.emit("change");
    this.emit("history");
  }

  updateNode(id: string, patch: Partial<SpatialNode>): void {
    const existing = this.nodes.get(id);
    if (!existing) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updated: any = { ...existing, ...patch };
    if (
      patch.data &&
      typeof patch.data === "object" &&
      existing.data &&
      typeof existing.data === "object"
    ) {
      updated.data = {
        ...(existing as { data: Record<string, unknown> }).data,
        ...(patch as { data: Record<string, unknown> }).data,
      };
    }
    this.nodes.set(id, updated);

    // Update QuadTree if geometry changed (including rotation — AABB depends on it)
    if (
      existing.x !== updated.x ||
      existing.y !== updated.y ||
      existing.w !== updated.w ||
      existing.h !== updated.h ||
      (existing.rotation ?? 0) !== (updated.rotation ?? 0)
    ) {
      this.quadTree.remove(existing);
      this.quadTree.insert(updated);

      // Update edges connected to this node
      this.updateConnectedEdges(id);
    }

    // Lifecycle: position change (move)
    if (existing.x !== updated.x || existing.y !== updated.y) {
      const dx = updated.x - existing.x;
      const dy = updated.y - existing.y;
      this.registry?.get(updated.type)?.onMove?.(updated, dx, dy, this);
      this.emit("node:move", updated, dx, dy);
    }

    // Lifecycle: dimension change (resize)
    if (existing.w !== updated.w || existing.h !== updated.h) {
      const sx = existing.w !== 0 ? updated.w / existing.w : 1;
      const existingH = existing.h === "auto" ? 0 : (existing.h as number);
      const updatedH = updated.h === "auto" ? 0 : (updated.h as number);
      const sy = existingH !== 0 ? updatedH / existingH : 1;
      this.emit("node:resize", updated, sx, sy);
    }

    // Lifecycle: rotation change
    if ((existing.rotation ?? 0) !== (updated.rotation ?? 0)) {
      this.registry?.get(updated.type)?.onRotate?.(updated, updated.rotation ?? 0, this);
      this.emit("node:rotate", updated, updated.rotation ?? 0);
    }

    // Lifecycle: data change
    if (patch.data && existing.data !== updated.data) {
      this.registry?.get(updated.type)?.onDataChange?.(updated, existing.data, updated.data, this);
      this.emit("node:data", updated, existing.data, updated.data);
      this.refreshSearchIfNeeded();
    }

    this.emit("change");
  }

  /**
   * Batch update multiple nodes with a single change emit.
   * Use during drag/resize to avoid N re-renders per frame.
   */
  updateMany(
    updates: Array<{ id: string; patch: Partial<SpatialNode> }>
  ): void {
    let changed = false;
    let dataChanged = false;
    for (const { id, patch } of updates) {
      const existing = this.nodes.get(id);
      if (!existing) continue;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updated: any = { ...existing, ...patch };
      if (
        patch.data &&
        typeof patch.data === "object" &&
        existing.data &&
        typeof existing.data === "object"
      ) {
        updated.data = {
          ...(existing as { data: Record<string, unknown> }).data,
          ...(patch as { data: Record<string, unknown> }).data,
        };
        dataChanged = true;
      }
      this.nodes.set(id, updated);

      // Update QuadTree if geometry changed (including rotation — AABB depends on it)
      if (
        existing.x !== updated.x ||
        existing.y !== updated.y ||
        existing.w !== updated.w ||
        existing.h !== updated.h ||
        (existing.rotation ?? 0) !== (updated.rotation ?? 0)
      ) {
        this.quadTree.remove(existing);
        this.quadTree.insert(updated);

        // Update connected edges
        this.updateConnectedEdges(id);
      }

      changed = true;
    }
    if (changed && dataChanged) this.refreshSearchIfNeeded();
    if (changed) this.emit("change");
  }

  private updateConnectedEdges(nodeId: string): void {
    const edgeIds = this.adjacency.get(nodeId);
    if (!edgeIds) return;

    for (const edgeId of edgeIds) {
      const edge = this.nodes.get(edgeId);
      if (!edge || edge.type !== "edge") continue;

      const edgeNode = edge as import("./types").EdgeNode;
      const fromNode = this.nodes.get(edgeNode.data.fromId);
      const toNode = this.nodes.get(edgeNode.data.toId);

      if (fromNode && toNode) {
        const pathResult = computeEdgePath(
          fromNode,
          toNode,
          edgeNode.data.edgeType,
          undefined,
          edgeNode.data.sourceHandle,
          edgeNode.data.targetHandle,
          edgeNode.data.midpointOffset,
          edgeNode.data.curveOffset,
          undefined,
          undefined,
          edgeNode.data.sourceT,
          edgeNode.data.targetT,
          edgeNode.data.attachmentGap,
        );

        const newEdge = { ...edgeNode, ...pathResult.bounds };
        this.nodes.set(edgeId, newEdge);
        this.quadTree.remove(edgeNode);
        this.quadTree.insert(newEdge);
      }
    }
  }

  updateNodeWithHistory(id: string, patch: Partial<SpatialNode>): void {
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    this.updateNode(id, patch);
    this.emit("history");
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
    if (this._collabMode) {
      this.updateNode(id, patch);
      return;
    }
    if (this._historyCoalesceKey !== sessionKey) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      this._historyCoalesceKey = sessionKey;
      this.emit("history");
    }
    this.updateNode(id, patch);
  }

  /** Update multiple nodes in a single undo step. */
  batchUpdateWithHistory(updates: Array<{ id: string; patch: Partial<SpatialNode> }>): void {
    if (updates.length === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    for (const { id, patch } of updates) {
      this.updateNode(id, patch);
    }
    this.emit("history");
  }

  /**
   * Like `batchUpdateWithHistory`, but shares one undo step with other calls using the same `sessionKey`.
   */
  batchUpdateWithHistoryCoalesced(
    updates: Array<{ id: string; patch: Partial<SpatialNode> }>,
    sessionKey: string,
  ): void {
    if (updates.length === 0) return;
    if (this._collabMode) {
      for (const { id, patch } of updates) {
        this.updateNode(id, patch);
      }
      return;
    }
    if (this._historyCoalesceKey !== sessionKey) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      this._historyCoalesceKey = sessionKey;
      this.emit("history");
    }
    for (const { id, patch } of updates) {
      this.updateNode(id, patch);
    }
  }

  deleteNode(id: string): void {
    if (!this.nodes.has(id)) return;
    if (this.nodes.get(id)?.locked) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);

    // Remove from QuadTree before deleting from map
    const nodeToRemove = this.nodes.get(id);
    if (nodeToRemove) {
      this.registry?.get(nodeToRemove.type)?.onDelete?.(nodeToRemove, this);
      this.emit("node:delete", nodeToRemove);
      this.quadTree.remove(nodeToRemove);
    }

    this.nodes.delete(id);
    this.selection.delete(id);
    this.adjacency.delete(id); // Remove node entries
    // Clean up frame children tracking
    this.frameChildren.delete(id); // If it was a frame
    for (const children of this.frameChildren.values()) children.delete(id);

    // Cascade: delete edges connected to this node, removing each deleted edge
    // from the surviving endpoint's adjacency set.
    for (const [edgeId, node] of this.nodes) {
      if (node.type === "edge") {
        const data = node.data as { fromId: string; toId: string };
        if (data.fromId === id || data.toId === id) {
          const edge = this.nodes.get(edgeId);
          if (edge) this.quadTree.remove(edge);
          this.nodes.delete(edgeId);
          this.selection.delete(edgeId);

          // Clean up adjacency from the OTHER node
          const otherId = data.fromId === id ? data.toId : data.fromId;
          this.adjacency.get(otherId)?.delete(edgeId);
        }
      }
    }
    this.refreshSearchIfNeeded();
    this.emit("change");
    this.emit("selection");
    this.emit("history");
  }

  getNode(id: string): SpatialNode | undefined {
    return this.nodes.get(id);
  }

  getAllNodes(): SpatialNode[] {
    return Array.from(this.nodes.values());
  }

  /** Returns a read-only iterable of all nodes (no copy). */
  iterNodes(): IterableIterator<SpatialNode> {
    return this.nodes.values();
  }

  getNodesByType(type: NodeType): SpatialNode[] {
    const result: SpatialNode[] = [];
    for (const n of this.nodes.values()) {
      if (n.type === type) result.push(n);
    }
    return result;
  }

  /** Returns all non-edge nodes fully contained within a frame's bounds (including nested frames). */
  getNodesInsideFrame(frameId: string): SpatialNode[] {
    const frame = this.nodes.get(frameId);
    if (!frame || !this._containerTypes.has(frame.type)) return [];
    const fh = this.resolveHeight(frame);
    const results: SpatialNode[] = [];
    for (const node of this.nodes.values()) {
      if (node.id === frameId || node.type === "edge") continue;
      const nh = this.resolveHeight(node);
      if (
        node.x >= frame.x &&
        node.y >= frame.y &&
        node.x + node.w <= frame.x + frame.w &&
        node.y + nh <= frame.y + fh
      ) {
        results.push(node);
      }
    }
    return results;
  }

  /** Returns tracked frame children (nodes explicitly added to the frame). */
  getFrameChildren(frameId: string): SpatialNode[] {
    const childIds = this.frameChildren.get(frameId);
    if (!childIds) return [];
    const results: SpatialNode[] = [];
    for (const id of childIds) {
      const node = this.nodes.get(id);
      if (node) results.push(node);
    }
    return results;
  }

  /** Returns IDs of all descendants of a frame (children, grandchildren, etc.). */
  getFrameDescendantIds(frameId: string): Set<string> {
    const result = new Set<string>();
    const visit = (fid: string) => {
      const childIds = this.frameChildren.get(fid);
      if (!childIds) return;
      for (const id of childIds) {
        if (result.has(id)) continue; // prevent infinite loops
        result.add(id);
        // If this child is also a frame, recurse into it
        const node = this.nodes.get(id);
        if (node && this._containerTypes.has(node.type)) visit(id);
      }
    };
    visit(frameId);
    return result;
  }

  /** Rebuild frameChildren from spatial containment. Called on load/undo/redo.
   *  Each node is assigned only to its smallest containing frame. */
  rebuildFrameChildren(): void {
    this.frameChildren.clear();

    // Collect all frames sorted by area (smallest first)
    const frames: { node: SpatialNode; area: number }[] = [];
    for (const node of this.nodes.values()) {
      if (!this._containerTypes.has(node.type)) continue;
      const fh = this.resolveHeight(node);
      frames.push({ node, area: node.w * fh });
    }
    frames.sort((a, b) => a.area - b.area);

    // Track which nodes are already assigned to a frame
    const assigned = new Set<string>();

    // Process smallest frames first — their children won't be claimed by larger frames
    for (const { node: frame } of frames) {
      const inside = this.getNodesInsideFrame(frame.id);
      const directChildren = inside.filter((n) => !assigned.has(n.id));
      if (directChildren.length > 0) {
        const set = new Set<string>();
        for (const child of directChildren) {
          set.add(child.id);
          assigned.add(child.id);
        }
        this.frameChildren.set(frame.id, set);
      }
    }
  }

  /** After nodes are moved, update which frames they belong to.
   *  Each node is assigned only to its smallest containing frame.
   *  Frames can be nested inside other frames (but not inside themselves or their descendants). */
  updateFrameMembership(nodeIds: string[]): void {
    for (const nodeId of nodeIds) {
      const node = this.nodes.get(nodeId);
      if (!node || node.type === "edge") continue;
      const nh = this.resolveHeight(node);

      // Remove from any frame it's no longer inside
      for (const [frameId, children] of this.frameChildren) {
        if (!children.has(nodeId)) continue;
        const frame = this.nodes.get(frameId);
        if (!frame) { children.delete(nodeId); continue; }
        const fh = this.resolveHeight(frame);
        const inside =
          node.x >= frame.x &&
          node.y >= frame.y &&
          node.x + node.w <= frame.x + frame.w &&
          node.y + nh <= frame.y + fh;
        if (!inside) children.delete(nodeId);
      }

      // For frames, collect their descendants to prevent circular nesting
      let descendantIds: Set<string> | undefined;
      if (this._containerTypes.has(node.type)) {
        descendantIds = this.getFrameDescendantIds(nodeId);
      }

      // Find the smallest containing frame via QuadTree spatial query
      let bestFrame: SpatialNode | null = null;
      let bestArea = Infinity;
      const frameCandidates = this.quadTree.retrieve([], { x: node.x, y: node.y, w: node.w, h: nh });
      for (const frame of frameCandidates) {
        if (!this._containerTypes.has(frame.type) || frame.id === nodeId) continue;
        // Prevent circular nesting: don't nest a frame inside its own descendant
        if (descendantIds?.has(frame.id)) continue;
        const fh = this.resolveHeight(frame);
        const inside =
          node.x >= frame.x &&
          node.y >= frame.y &&
          node.x + node.w <= frame.x + frame.w &&
          node.y + nh <= frame.y + fh;
        if (inside) {
          const area = frame.w * fh;
          if (area < bestArea) {
            bestArea = area;
            bestFrame = frame;
          }
        }
      }

      // Remove from all frames first, then add only to the smallest
      for (const [, children] of this.frameChildren) {
        children.delete(nodeId);
      }
      if (bestFrame) {
        if (!this.frameChildren.has(bestFrame.id)) this.frameChildren.set(bestFrame.id, new Set());
        this.frameChildren.get(bestFrame.id)!.add(nodeId);
      }
    }
  }

  /** Sync frame children after resize: remove nodes no longer inside, add newly contained nodes. */
  syncFrameChildrenAfterResize(frameId: string): void {
    const frame = this.nodes.get(frameId);
    if (!frame || !this._containerTypes.has(frame.type)) return;
    // Rebuild from spatial containment for this frame
    const inside = this.getNodesInsideFrame(frameId);
    if (inside.length > 0) {
      this.frameChildren.set(frameId, new Set(inside.map((n) => n.id)));
    } else {
      this.frameChildren.delete(frameId);
    }
  }

  /** Adopt all existing nodes that are spatially inside a newly created frame. */
  adoptNodesIntoNewFrame(frameId: string): void {
    const children = this.getNodesInsideFrame(frameId);
    if (children.length > 0) {
      const set = new Set<string>();
      for (const child of children) set.add(child.id);
      this.frameChildren.set(frameId, set);
    }
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
  private expandSelectionToGroups(): void {
    // For each selected node, walk up to the outermost group (stopping at activeGroupId)
    const targetGroupIds = new Set<string>();
    for (const id of this.selection) {
      const node = this.nodes.get(id);
      if (!node?.groupId) continue;
      if (this.activeGroupId && node.groupId === this.activeGroupId) continue;

      let gid = node.groupId;
      while (true) {
        const parent = this.groupParent.get(gid);
        if (!parent) break;
        if (this.activeGroupId && parent === this.activeGroupId) break;
        gid = parent;
      }
      targetGroupIds.add(gid);
    }
    if (targetGroupIds.size === 0) return;

    // Collect all descendant groupIds of each target via recursive descent
    const allGroupIds = new Set<string>(targetGroupIds);
    const collectDescendantGroups = (gid: string) => {
      const children = this.groupChildren.get(gid);
      if (!children) return;
      for (const child of children) {
        if (!allGroupIds.has(child)) {
          allGroupIds.add(child);
          collectDescendantGroups(child);
        }
      }
    };
    for (const gid of targetGroupIds) {
      collectDescendantGroups(gid);
    }

    // Select all nodes in any of these groups
    for (const node of this.nodes.values()) {
      if (node.groupId && allGroupIds.has(node.groupId)) {
        this.selection.add(node.id);
      }
    }
  }

  select(id: string): void {
    // Emit deselect for previously selected nodes
    for (const prevId of this.selection) {
      const prevNode = this.nodes.get(prevId);
      if (prevNode) {
        this.registry?.get(prevNode.type)?.onDeselect?.(prevNode, this);
        this.emit("node:deselect", prevNode);
      }
    }
    this.selection.clear();
    this.selection.add(id);
    this.expandSelectionToGroups();
    // Emit select for newly selected nodes
    for (const selId of this.selection) {
      const node = this.nodes.get(selId);
      if (node) {
        this.registry?.get(node.type)?.onSelect?.(node, this);
        this.emit("node:select", node);
      }
    }
    this.emit("selection");
  }

  toggleSelect(id: string): void {
    const node = this.nodes.get(id);
    if (this.selection.has(id)) {
      // Remove entire group when toggling off
      if (node?.groupId) {
        for (const n of this.nodes.values()) {
          if (n.groupId === node.groupId) this.selection.delete(n.id);
        }
      } else {
        this.selection.delete(id);
      }
    } else {
      this.selection.add(id);
      this.expandSelectionToGroups();
    }
    this.emit("selection");
  }

  selectMultiple(ids: string[]): void {
    this.selection = new Set(ids);
    this.expandSelectionToGroups();
    this.emit("selection");
  }

  deselectAll(): void {
    if (this.selection.size === 0 && !this.activeGroupId) return;
    for (const id of this.selection) {
      const node = this.nodes.get(id);
      if (node) {
        this.registry?.get(node.type)?.onDeselect?.(node, this);
        this.emit("node:deselect", node);
      }
    }
    this.selection.clear();
    if (this.activeGroupId) {
      this.activeGroupId = null;
      this.emit('group:exit');
    }
    this.emit("selection");
  }

  deleteSelected(): void {
    if (this.selection.size === 0) return;
    // Filter out locked nodes
    const toDelete = new Set(
      Array.from(this.selection).filter((id) => !this.nodes.get(id)?.locked)
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
  private linkGroupParent(childId: string, parentId: string): void {
    // Remove old parent link if any
    const oldParent = this.groupParent.get(childId);
    if (oldParent) {
      this.groupChildren.get(oldParent)?.delete(childId);
    }
    this.groupParent.set(childId, parentId);
    let children = this.groupChildren.get(parentId);
    if (!children) {
      children = new Set();
      this.groupChildren.set(parentId, children);
    }
    children.add(childId);
  }

  /** Remove a groupParent entry and keep groupChildren in sync. */
  private unlinkGroupParent(childId: string): void {
    const parentId = this.groupParent.get(childId);
    if (parentId) {
      const children = this.groupChildren.get(parentId);
      if (children) {
        children.delete(childId);
        if (children.size === 0) this.groupChildren.delete(parentId);
      }
    }
    this.groupParent.delete(childId);
  }

  /** Rebuild the groupChildren reverse index from groupParent. */
  private rebuildGroupChildren(): void {
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
    if (ids.length === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const deletedSet = new Set(ids);

    for (const id of ids) {
      const node = this.nodes.get(id);
      if (!node) continue;
      this.registry?.get(node.type)?.onDelete?.(node, this);
      this.emit("node:delete", node);
      this.quadTree.remove(node);
      this.nodes.delete(id);
      this.frameChildren.delete(id);
      for (const children of this.frameChildren.values()) children.delete(id);
    }

    // Cascade: delete edges referencing deleted nodes
    for (const [edgeId, node] of this.nodes) {
      if (node.type === "edge") {
        const data = node.data as { fromId: string; toId: string };
        if (deletedSet.has(data.fromId) || deletedSet.has(data.toId)) {
          const edge = this.nodes.get(edgeId);
          if (edge) this.quadTree.remove(edge);
          this.nodes.delete(edgeId);
        }
      }
    }
    this.selection.clear();
    this.refreshSearchIfNeeded();
    this.emit("change");
    this.emit("selection");
    this.emit("history");
  }

  // --- Flip ---

  private flipSelected(dir: "h" | "v"): void {
    if (this.selection.size === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);

    for (const id of this.selection) {
      const node = this.nodes.get(id);
      if (!node) continue;

      this.quadTree.remove(node);

      let updatedNode: SpatialNode | null = null;

      // Try registry onFlip first
      const def = this.registry?.get(node.type);
      if (def?.onFlip) {
        const dataPatch = def.onFlip(node, dir, this);
        if (dataPatch && Object.keys(dataPatch).length > 0) {
          updatedNode = {
            ...node,
            data: { ...(node.data as Record<string, unknown>), ...dataPatch },
          };
        }
      } else {
        // Legacy fallback for unregistered types
        if (node.type === "draw") {
          const draw = node as DrawNode;
          if (dir === "h") {
            const flipped = draw.data.points.map(
              ([x, y, p]) => [draw.w - x, y, p] as [number, number, number]
            );
            updatedNode = { ...draw, data: { ...draw.data, points: flipped } };
          } else {
            const h = draw.h === "auto" ? 0 : (draw.h as number);
            const flipped = draw.data.points.map(
              ([x, y, p]) => [x, h - y, p] as [number, number, number]
            );
            updatedNode = { ...draw, data: { ...draw.data, points: flipped } };
          }
        } else if (node.type === "shape") {
          const shape = node as ShapeNode;
          if (shape.data.shape === "arrow" || shape.data.shape === "line") {
            if (shape.data.startPoint && shape.data.endPoint) {
              if (dir === "h") {
                const newStart: [number, number] = [shape.w - shape.data.startPoint[0], shape.data.startPoint[1]];
                const newEnd: [number, number] = [shape.w - shape.data.endPoint[0], shape.data.endPoint[1]];
                updatedNode = { ...shape, data: { ...shape.data, startPoint: newStart, endPoint: newEnd } };
              } else {
                const h = shape.h === "auto" ? 0 : (shape.h as number);
                const newStart: [number, number] = [shape.data.startPoint[0], h - shape.data.startPoint[1]];
                const newEnd: [number, number] = [shape.data.endPoint[0], h - shape.data.endPoint[1]];
                updatedNode = { ...shape, data: { ...shape.data, startPoint: newStart, endPoint: newEnd } };
              }
            } else {
              updatedNode = dir === "h"
                ? { ...shape, rotation: -(shape.rotation || 0) + 180 }
                : { ...shape, rotation: -(shape.rotation || 0) };
            }
          }
        } else if (node.type === "image") {
          const img = node as ImageNode;
          updatedNode = dir === "h"
            ? { ...img, data: { ...img.data, flipH: !img.data.flipH } }
            : { ...img, data: { ...img.data, flipV: !img.data.flipV } };
        }
      }

      if (updatedNode) {
        this.nodes.set(id, updatedNode);
        this.quadTree.insert(updatedNode);
        this.emit("node:flip", updatedNode, dir);
      } else {
        this.quadTree.insert(node);
      }
    }
    this.emit("change");
    this.emit("history");
  }

  flipSelectedHorizontal(): void {
    this.flipSelected("h");
  }

  flipSelectedVertical(): void {
    this.flipSelected("v");
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
    const updates = computeSelectionArrangement(
      this.getAllNodes(),
      this.selection,
      measuredHeights,
      this.gridSize,
      this.registry,
      labelLayoutZoom,
    );
    if (updates.length === 0) return;
    this.batchUpdateWithHistory(
      updates.map((u) => ({ id: u.id, patch: { x: u.x, y: u.y } })),
    );
  }

  /** Axis alignment for multi-select (union bbox reference). Skips edges and locked nodes. */
  alignSelectedNodes(
    mode: SelectionAlignMode,
    measuredHeights?: Record<string, number>,
  ): void {
    const nodes: SpatialNode[] = [];
    for (const id of this.selection) {
      const n = this.nodes.get(id);
      if (!n || n.type === "edge" || n.locked) continue;
      nodes.push(n);
    }
    if (nodes.length < 2) return;

    const hOf = (n: SpatialNode) =>
      n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : (n.h as number);

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const n of nodes) {
      const h = hOf(n);
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.w);
      maxY = Math.max(maxY, n.y + h);
    }
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    const updates: Array<{ id: string; patch: Partial<SpatialNode> }> = [];
    for (const n of nodes) {
      const h = hOf(n);
      let nx = n.x;
      let ny = n.y;
      switch (mode) {
        case "left":
          nx = minX;
          break;
        case "right":
          nx = maxX - n.w;
          break;
        case "centerH":
          nx = midX - n.w / 2;
          break;
        case "top":
          ny = minY;
          break;
        case "bottom":
          ny = maxY - h;
          break;
        case "centerV":
          ny = midY - h / 2;
          break;
      }
      if (nx !== n.x || ny !== n.y) {
        updates.push({ id: n.id, patch: { x: nx, y: ny } });
      }
    }
    if (updates.length === 0) return;
    this.batchUpdateWithHistory(updates);
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
    const nodes: SpatialNode[] = [];
    for (const id of this.selection) {
      const n = this.nodes.get(id);
      if (!n || n.type === "edge" || n.locked) continue;
      nodes.push(n);
    }
    if (nodes.length < 2) return;

    const hOf = (n: SpatialNode) =>
      n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : (n.h as number);

    const updates: Array<{ id: string; patch: Partial<SpatialNode> }> = [];

    if (axis === "horizontal") {
      const sorted = [...nodes].sort((a, b) => a.x - b.x || a.id.localeCompare(b.id));
      let minL = Infinity;
      let maxR = -Infinity;
      let sumW = 0;
      for (const n of sorted) {
        minL = Math.min(minL, n.x);
        maxR = Math.max(maxR, n.x + n.w);
        sumW += n.w;
      }
      const span = maxR - minL;
      const slack = span - sumW;
      const gap =
        slack >= 0 ? slack / (sorted.length - 1) : 0;
      const startX = slack >= 0 ? minL : minL + (span - sumW) / 2;
      let cur = startX;
      for (const n of sorted) {
        const nx = cur;
        cur += n.w + gap;
        if (nx !== n.x) updates.push({ id: n.id, patch: { x: nx } });
      }
    } else {
      const sorted = [...nodes].sort(
        (a, b) => a.y - b.y || a.id.localeCompare(b.id),
      );
      let minT = Infinity;
      let maxB = -Infinity;
      let sumH = 0;
      for (const n of sorted) {
        const h = hOf(n);
        minT = Math.min(minT, n.y);
        maxB = Math.max(maxB, n.y + h);
        sumH += h;
      }
      const span = maxB - minT;
      const slack = span - sumH;
      const gap =
        slack >= 0 ? slack / (sorted.length - 1) : 0;
      const startY = slack >= 0 ? minT : minT + (span - sumH) / 2;
      let cur = startY;
      for (const n of sorted) {
        const h = hOf(n);
        const ny = cur;
        cur += h + gap;
        if (ny !== n.y) updates.push({ id: n.id, patch: { y: ny } });
      }
    }

    if (updates.length === 0) return;
    this.batchUpdateWithHistory(updates);
  }

  // --- Grouping ---

  groupSelected(): void {
    if (this.selection.size < 2) return;
    if (this.activeGroupId) return; // Can't nest groups while inside one
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const gid = nanoid(10);

    // Collect existing top-level groupIds of selected nodes
    const existingGroups = new Set<string>();
    for (const id of this.selection) {
      const node = this.nodes.get(id);
      if (node?.groupId) {
        // Walk up to the outermost group (the one with no parent)
        let topGid = node.groupId;
        while (this.groupParent.has(topGid)) topGid = this.groupParent.get(topGid)!;
        existingGroups.add(topGid);
      }
    }

    if (existingGroups.size > 0) {
      // Map existing top-level groups as children of the new parent group
      for (const childGroup of existingGroups) {
        this.linkGroupParent(childGroup, gid);
      }
      // Only assign groupId on nodes that don't already belong to a group
      for (const id of this.selection) {
        const node = this.nodes.get(id);
        if (node && !node.groupId) {
          this.nodes.set(id, { ...node, groupId: gid });
        }
      }
    } else {
      // Simple case: no existing groups
      for (const id of this.selection) {
        const node = this.nodes.get(id);
        if (node) this.nodes.set(id, { ...node, groupId: gid });
      }
    }

    this.emit("change");
    this.emit("history");
  }

  ungroupSelected(): void {
    if (this.selection.size === 0) return;

    // Find the outermost group(s) of the selection to ungroup
    const groupIds = new Set<string>();
    for (const id of this.selection) {
      const node = this.nodes.get(id);
      if (node?.groupId) {
        // Walk up to the outermost group (or stop at activeGroupId's parent scope)
        let topGid = node.groupId;
        while (this.groupParent.has(topGid)) {
          const parent = this.groupParent.get(topGid)!;
          if (parent === this.activeGroupId) break;
          topGid = parent;
        }
        groupIds.add(topGid);
      }
    }
    if (groupIds.size === 0) return;

    // Exit active group if we're ungrouping it
    if (this.activeGroupId && groupIds.has(this.activeGroupId)) {
      this.activeGroupId = null;
      this.emit('group:exit');
    }

    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);

    for (const gid of groupIds) {
      const parentGid = this.groupParent.get(gid);

      // Ungroup direct members of this group
      for (const node of this.nodes.values()) {
        if (node.groupId === gid) {
          if (parentGid) {
            // Promote to parent group
            this.nodes.set(node.id, { ...node, groupId: parentGid });
          } else {
            // No parent — fully ungroup
            const { groupId: _, ...rest } = node;
            this.nodes.set(node.id, rest as SpatialNode);
          }
        }
      }

      // Promote child groups of this group to its parent (or make them top-level)
      const childGroupIds = this.groupChildren.get(gid);
      if (childGroupIds) {
        for (const child of [...childGroupIds]) {
          if (parentGid) {
            this.linkGroupParent(child, parentGid);
          } else {
            this.unlinkGroupParent(child);
          }
        }
      }

      // Remove this group from the hierarchy
      this.unlinkGroupParent(gid);
      this.groupChildren.delete(gid);
      this.groupRotations.delete(gid);
    }

    this.emit("change");
    this.emit("history");
  }

  selectionHasGroup(): boolean {
    for (const id of this.selection) {
      if (this.nodes.get(id)?.groupId) return true;
    }
    return false;
  }

  /** Returns the outermost groupId if all selected nodes belong to the same group tree, else undefined. */
  selectionGroupId(): string | undefined {
    if (this.selection.size < 2) return undefined;
    let topGid: string | undefined;
    for (const id of this.selection) {
      const node = this.nodes.get(id);
      if (!node?.groupId) return undefined;
      let gid = node.groupId;
      while (this.groupParent.has(gid)) gid = this.groupParent.get(gid)!;
      if (!topGid) topGid = gid;
      else if (gid !== topGid) return undefined;
    }
    return topGid;
  }

  /** True if all selected nodes belong to exactly one group (possibly nested). */
  selectionIsSingleGroup(): boolean {
    if (this.selection.size < 2) return false;
    let topGid: string | undefined;
    for (const id of this.selection) {
      const node = this.nodes.get(id);
      if (!node?.groupId) return false;
      // Walk up to outermost group
      let gid = node.groupId;
      while (this.groupParent.has(gid)) gid = this.groupParent.get(gid)!;
      if (!topGid) topGid = gid;
      else if (gid !== topGid) return false;
    }
    return true;
  }

  getGroupMembers(groupId: string): SpatialNode[] {
    const members: SpatialNode[] = [];
    for (const node of this.nodes.values()) {
      if (node.groupId === groupId) members.push(node);
    }
    return members;
  }

  /** Enter a group for drill-down selection of individual children. */
  enterGroup(groupId: string): void {
    if (this.activeGroupId === groupId) return;
    this.activeGroupId = groupId;
    this.emit('group:enter', groupId);
  }

  /** Fully exit all group levels and deselect. */
  exitAllGroups(): void {
    if (!this.activeGroupId) return;
    this.activeGroupId = null;
    this.emit('group:exit');
  }

  /** Exit the active group — go up one level for nested groups, or exit entirely. */
  exitGroup(): void {
    if (!this.activeGroupId) return;
    const exitingGid = this.activeGroupId;
    const parentGid = this.groupParent.get(exitingGid);

    if (parentGid) {
      // Go up one level — enter the parent group
      this.activeGroupId = parentGid;
      this.emit('group:enter', parentGid);
    } else {
      // Exit to top level
      this.activeGroupId = null;
      this.emit('group:exit');
    }

    // Re-select: pick any member of the exiting group, then expansion handles the rest
    const members = this.getGroupMembers(exitingGid);
    if (members.length > 0) {
      this.selection = new Set([members[0].id]);
      this.expandSelectionToGroups();
      this.emit("selection");
    }
  }

  /** Check if a node belongs to the currently active (entered) group or any of its descendants. */
  isNodeInActiveGroup(nodeId: string): boolean {
    if (!this.activeGroupId) return false;
    const node = this.nodes.get(nodeId);
    if (!node?.groupId) return false;
    // Walk up from node's group to see if activeGroupId is an ancestor
    let gid: string | undefined = node.groupId;
    while (gid) {
      if (gid === this.activeGroupId) return true;
      gid = this.groupParent.get(gid);
    }
    return false;
  }

  /** Get the outermost group of a node (stopping at activeGroupId boundary). */
  getNodeOutermostGroup(nodeId: string): string | undefined {
    const node = this.nodes.get(nodeId);
    if (!node?.groupId) return undefined;
    let gid = node.groupId;
    while (true) {
      const parent = this.groupParent.get(gid);
      if (!parent) break;
      if (this.activeGroupId && parent === this.activeGroupId) break;
      gid = parent;
    }
    return gid;
  }

  /** Get all nodes that are descendants of a group (direct + nested sub-groups). */
  getAllGroupDescendantNodes(groupId: string): SpatialNode[] {
    const allGroupIds = new Set<string>([groupId]);
    const collectDescendantGroups = (gid: string) => {
      const children = this.groupChildren.get(gid);
      if (!children) return;
      for (const child of children) {
        if (!allGroupIds.has(child)) {
          allGroupIds.add(child);
          collectDescendantGroups(child);
        }
      }
    };
    collectDescendantGroups(groupId);

    const result: SpatialNode[] = [];
    for (const node of this.nodes.values()) {
      if (node.groupId && allGroupIds.has(node.groupId)) {
        result.push(node);
      }
    }
    return result;
  }

  duplicateSelected(): void {
    if (this.selection.size === 0) return;
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const offset = 20;
    const idMap = new Map<string, string>();
    const newNodes: SpatialNode[] = [];
    for (const id of this.selection) {
      const orig = this.nodes.get(id);
      if (!orig) continue;
      const newId = nanoid();
      idMap.set(orig.id, newId);
      newNodes.push({
        ...JSON.parse(JSON.stringify(orig)),
        id: newId,
        x: orig.x + offset,
        y: orig.y + offset,
        z: this.nextZValue++,
        locked: undefined,
      });
    }
    // Remap edge references
    for (const node of newNodes) {
      if (node.type === "edge" && node.data) {
        const data = node.data as { fromId: string; toId: string };
        if (idMap.has(data.fromId)) data.fromId = idMap.get(data.fromId)!;
        if (idMap.has(data.toId)) data.toId = idMap.get(data.toId)!;
      }
    }
    // Remap groupId references and groupParent hierarchy
    const groupIdMap = new Map<string, string>();
    for (const node of newNodes) {
      if (node.groupId) {
        if (!groupIdMap.has(node.groupId)) groupIdMap.set(node.groupId, nanoid(10));
        node.groupId = groupIdMap.get(node.groupId)!;
      }
    }
    // Remap groupParent for duplicated groups
    for (const [oldChild, oldParent] of this.groupParent) {
      if (groupIdMap.has(oldChild) && groupIdMap.has(oldParent)) {
        this.linkGroupParent(groupIdMap.get(oldChild)!, groupIdMap.get(oldParent)!);
      }
    }

    this.addNodes(newNodes); // Uses built-in addNodes which handles QuadTree

    this.selection = new Set(newNodes.map((n) => n.id));
    this.emit("change");
    this.emit("selection");
    this.emit("history");
  }

  // --- Mode ---

  // --- Clipboard ---

  copySelected(): void {
    if (this.selection.size === 0) return;
    this.clipboard = Array.from(this.selection).map((id) => {
      const node = this.nodes.get(id)!;
      return JSON.parse(JSON.stringify(node));
    });
    this.pasteCount = 0;
  }

  cutSelected(): void {
    this.copySelected();
    this.deleteSelected();
  }

  /**
   * Paste clipboard contents centered at a canvas position.
   * If no position given, uses viewport center.
   */
  pasteClipboard(canvasX?: number, canvasY?: number): void {
    if (this.clipboard.length === 0) return;
    this.pasteCount++;

    // Compute bounding box center of clipboard items
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const orig of this.clipboard) {
      const h = orig.h === "auto" ? 100 : (orig.h as number);
      if (orig.x < minX) minX = orig.x;
      if (orig.y < minY) minY = orig.y;
      if (orig.x + orig.w > maxX) maxX = orig.x + orig.w;
      if (orig.y + h > maxY) maxY = orig.y + h;
    }
    const clipCenterX = (minX + maxX) / 2;
    const clipCenterY = (minY + maxY) / 2;

    // Target center: explicit position, or viewport center
    let targetX: number, targetY: number;
    if (canvasX !== undefined && canvasY !== undefined) {
      targetX = canvasX;
      targetY = canvasY;
    } else {
      // Viewport center in canvas space
      const win = this.getWindow();
      const screenCX = win.innerWidth / 2;
      const screenCY = win.innerHeight / 2;
      const center = screenToCanvas(this.viewport, screenCX, screenCY);
      targetX = center.x;
      targetY = center.y;
    }

    // Cascading offset for repeated pastes
    const cascade = this.pasteCount * 20;
    const dx = targetX - clipCenterX + cascade;
    const dy = targetY - clipCenterY + cascade;

    const idMap = new Map<string, string>();
    const newNodes: SpatialNode[] = this.clipboard.map((orig) => {
      const newId = nanoid();
      idMap.set(orig.id, newId);
      const copied = structuredClone(orig) as SpatialNode;
      return {
        ...copied,
        id: newId,
        x: orig.x + dx,
        y: orig.y + dy,
        z: this.nextZValue++,
        locked: undefined,
      };
    });
    // Remap edge references
    for (const node of newNodes) {
      if (node.type === "edge" && node.data) {
        const data = node.data as { fromId: string; toId: string };
        if (idMap.has(data.fromId)) data.fromId = idMap.get(data.fromId)!;
        if (idMap.has(data.toId)) data.toId = idMap.get(data.toId)!;
      }
    }
    // Remap groupId references and groupParent hierarchy
    const groupIdMap = new Map<string, string>();
    for (const node of newNodes) {
      if (node.groupId) {
        if (!groupIdMap.has(node.groupId)) groupIdMap.set(node.groupId, nanoid(10));
        node.groupId = groupIdMap.get(node.groupId)!;
      }
    }
    for (const [oldChild, oldParent] of this.groupParent) {
      if (groupIdMap.has(oldChild) && groupIdMap.has(oldParent)) {
        this.linkGroupParent(groupIdMap.get(oldChild)!, groupIdMap.get(oldParent)!);
      }
    }
    this.addNodes(newNodes);
    this.selectMultiple(newNodes.map((n) => n.id));
  }

  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(templateId: string, cx: number, cy: number): void {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    const cloned: SpatialNode[] = structuredClone(template.nodes);
    const idMap = new Map<string, string>();

    // Remap all node IDs
    for (const node of cloned) {
      const newId = nanoid(10);
      idMap.set(node.id, newId);
      node.id = newId;
    }

    // Remap edge fromId/toId references
    for (const node of cloned) {
      if (node.type === "edge" && node.data) {
        const data = node.data as { fromId: string; toId: string };
        if (idMap.has(data.fromId)) data.fromId = idMap.get(data.fromId)!;
        if (idMap.has(data.toId)) data.toId = idMap.get(data.toId)!;
      }
      // Remap groupId if present
      if (node.groupId && idMap.has(node.groupId)) {
        node.groupId = idMap.get(node.groupId)!;
      }
    }

    // Compute bounding box center of non-edge nodes
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of cloned) {
      if (n.type === "edge") continue;
      const h = n.h === "auto" ? 100 : (n.h as number);
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + n.w);
      maxY = Math.max(maxY, n.y + h);
    }

    // Offset to center at (cx, cy)
    const dx = cx - (minX + maxX) / 2;
    const dy = cy - (minY + maxY) / 2;
    for (const n of cloned) {
      if (n.type !== "edge") {
        n.x += dx;
        n.y += dy;
      }
      n.z = this.nextZValue++;
    }

    this.addNodes(cloned);
    this.selectMultiple(cloned.map((n) => n.id));
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
    this._historyCoalesceKey = null;
  }

  pushHistorySnapshot(): void {
    this._historyCoalesceKey = null;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    this.emit("history");
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
    const restored = this.history.undo(this.nodes, this.groupParent);
    if (restored) {
      this._historyCoalesceKey = null;
      this.nodes = restored.nodes;
      this.groupParent = restored.groupParent;
      this.rebuildGroupChildren();
      this.rebuildQuadTree();
      this.rebuildFrameChildren();
      this.selection.clear();
      this.refreshSearchIfNeeded();
      this.emit("change");
      this.emit("selection");
      this.emit("history");
    }
  }

  redo(): void {
    const restored = this.history.redo(this.nodes, this.groupParent);
    if (restored) {
      this._historyCoalesceKey = null;
      this.nodes = restored.nodes;
      this.groupParent = restored.groupParent;
      this.rebuildGroupChildren();
      this.rebuildQuadTree();
      this.rebuildFrameChildren();
      this.selection.clear();
      this.refreshSearchIfNeeded();
      this.emit("change");
      this.emit("selection");
      this.emit("history");
    }
  }

  canUndo(): boolean {
    return this.history.canUndo();
  }

  canRedo(): boolean {
    return this.history.canRedo();
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
    fillStyle?: "hachure" | "cross-hatch" | "solid";
    strokeStyle?: "solid" | "dashed" | "dotted";
    edgeStyle?: "sharp" | "round";
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
    return serializeToSBD(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? undefined,
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

  fromJSON(json: { nodes: [string, SpatialNode][]; viewport?: Viewport; groupParent?: [string, string][] }): void {
    this.history.clear();
    this.nodes = new Map(json.nodes);
    this.groupParent = new Map(json.groupParent ?? []);
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
}
