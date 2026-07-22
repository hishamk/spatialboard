import type { SpatialNode, Viewport, Mode, ActiveTool, NodeType, HandleSide, EdgeType, AgentCanvasState, AgentStateOptions } from "./types";
import type { NodeTypeRegistry, SpatialNodeTypeCatalogEntry } from "../nodes/registry";
import type { EdgeCreationAwareness } from "../collab/edge-creation-awareness";
import type { RectDragAwareness } from "../collab/rect-drag-awareness";
import type { EraserAwareness } from "../collab/eraser-awareness";
export type BoardBackground = "plain-white" | "dot-grid" | "engineering" | "blueprint" | "dark-grid" | "japanese-stationery" | "kraft";
/** Multi-select contextual alignment relative to the union of selected node bounds. */
export type SelectionAlignMode = "left" | "centerH" | "right" | "top" | "centerV" | "bottom";
/** Equal spacing between consecutive items along an axis (sorted by position). */
export type SelectionDistributeAxis = "horizontal" | "vertical";
export interface AlignGuide {
    axis: 'x' | 'y';
    position: number;
    start: number;
    end: number;
}
interface DragSnapContext {
    staticNodes: Array<{
        x: number;
        y: number;
        w: number;
        h: number;
    }>;
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
export declare class SpatialEngine {
    nodes: Map<string, SpatialNode>;
    viewport: Viewport;
    selection: Set<string>;
    activeGroupId: string | null;
    groupRotations: Map<string, {
        angle: number;
        cx: number;
        cy: number;
    }>;
    /** Maps child groupId → parent groupId for nested groups. */
    groupParent: Map<string, string>;
    /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
    private groupChildren;
    mode: Mode;
    activeTool: ActiveTool;
    containerOffset: {
        x: number;
        y: number;
    };
    /** DOM element that hosts the canvas — used to derive the correct window in pop-out scenarios. */
    private _container;
    snapToGrid: boolean;
    smartGuides: boolean;
    lassoSelect: boolean;
    freeFormEdges: boolean;
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
    readOnly: boolean;
    presentationMode: boolean;
    presentationSlides: string[];
    presentationIndex: number;
    private _presentationAnimId;
    /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
    private _transitionOverlay;
    get transitionOverlay(): {
        type: "fade" | "dissolve" | "fold" | "cube";
        phase: "out" | "in";
        progress: number;
        /** Cube direction: 1 = next (rotate left), -1 = prev (rotate right). */
        direction?: 1 | -1;
        /** Overall 0–1 timeline for cube (drives zoom-out → rotate → zoom-in). */
        t?: number;
    } | null;
    gridSize: number;
    boardBackground: BoardBackground;
    /** Saved "origin" viewport position restored on next load. */
    originView: Viewport | null;
    /** Current alignment guides (set during drag). */
    alignGuides: AlignGuide[];
    /** Container dimensions for viewport bounds computation. */
    private _containerWidth;
    private _containerHeight;
    private history;
    /** When set, `updateNodeWithHistoryCoalesced` reuses one undo step until `endHistoryCoalesce()`. */
    private _historyCoalesceKey;
    private listeners;
    private _suppressEvents;
    private _collabMode;
    /** When > 0, `addNode`/`addNodes` skip their own history snapshot push
     *  so a single `beginAgentAction()` snapshot covers multiple operations. */
    private _agentActionDepth;
    /** Auto-reset timer for `beginAgentAction()` when no matching `endAgentAction()`
     *  arrives in time (cross-process MCP callers can crash between begin/end). */
    private _agentActionTimer;
    /** Max ms between begin/end before depth is force-reset to 0. */
    private static readonly AGENT_ACTION_TIMEOUT_MS;
    private clipboard;
    private pasteCount;
    private nextZValue;
    private _minZ;
    private quadTree;
    private adjacency;
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    private frameChildren;
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    private _containerTypes;
    private registry?;
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    private _measuredHeights;
    private _search;
    constructor();
    private persistCanvasPrefs;
    /** Set the node type registry for lifecycle hooks. */
    setRegistry(registry: NodeTypeRegistry): void;
    /** Registry used by the canvas (remote edge preview, hooks). */
    getRegistry(): NodeTypeRegistry | undefined;
    /**
     * All registered node types (built-in + custom from `SpatialBoard` `nodeTypes`).
     * Empty until `setRegistry` runs (after mount). Intended for agents / MCP discovery.
     */
    getNodeTypeCatalog(): SpatialNodeTypeCatalogEntry[];
    /** Enable collaborative mode. Disables local snapshot history. */
    setCollabMode(enabled: boolean): void;
    /** Whether the engine is in collaborative mode. */
    get isCollabMode(): boolean;
    /** Toggle read-only mode. See `readOnly` field for semantics. */
    setReadOnly(value: boolean): void;
    /** Register a node type as a container (frame-like behavior). */
    registerContainerType(type: string): void;
    /** Check whether a node type behaves as a container. */
    isContainerType(type: string): boolean;
    /** The set of container type strings (read-only). */
    get containerTypes(): ReadonlySet<string>;
    /** Update the measured height for an auto-height node. */
    setMeasuredHeight(nodeId: string, height: number): void;
    /** Get the resolved height for a node (measured or explicit). */
    resolveHeight(node: SpatialNode): number;
    /** Get all measured heights (for canvas rendering). */
    get measuredHeights(): Record<string, number>;
    /** Get all edge nodes connected to a given node. */
    getEdgesForNode(nodeId: string): SpatialNode[];
    /** Get all edge nodes in the board. */
    getAllEdges(): SpatialNode[];
    /** Set the container element (used by SpatialCanvas on mount). */
    setContainer(el: HTMLElement | null): void;
    /** Get the window object for the container (supports pop-out windows). */
    private getWindow;
    on<K extends keyof EventMap>(event: K, cb: EventMap[K]): void;
    off<K extends keyof EventMap>(event: K, cb: EventMap[K]): void;
    private emit;
    /** Request entering image crop mode (handled by the canvas component). */
    requestImageCrop(nodeId: string): void;
    getSearchState(): SpatialSearchState;
    setSearchQuery(query: string): void;
    clearSearch(): void;
    setSearchActiveIndex(index: number): void;
    searchNext(): void;
    searchPrev(): void;
    focusSearchResult(index: number, options?: {
        select?: boolean;
        center?: boolean;
        minZoom?: number;
    }): void;
    focusActiveSearchResult(options?: {
        select?: boolean;
        center?: boolean;
        minZoom?: number;
    }): void;
    private refreshSearchIfNeeded;
    private computeSearchMatches;
    private getNodeSearchCandidates;
    private extractBlockText;
    private countOccurrences;
    toggleSnapToGrid(): void;
    toggleFreeFormEdges(): void;
    toggleSmartGuides(): void;
    setGridSize(size: number): void;
    toggleLassoSelect(): void;
    enterPresentation(): void;
    exitPresentation(): void;
    presentationNext(): void;
    presentationPrev(): void;
    presentationGoTo(index: number): void;
    private _computeSlideViewport;
    /** Pan transition: smooth viewport interpolation (default). */
    private _transitionPan;
    /** None transition: instant viewport snap. */
    private _transitionNone;
    /** Fade transition: fade to black, snap viewport, fade from black. */
    private _transitionFade;
    /** Dissolve transition: quick overlay fade, snap viewport at midpoint. */
    private _transitionDissolve;
    /** Zoom transition: zoom out from current, zoom into target. */
    private _transitionZoom;
    /** Fold transition: two halves fold shut like a book, snap viewport, unfold to reveal. */
    private _transitionFold;
    /** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
    private _transitionCube;
    snap(x: number, y: number): {
        x: number;
        y: number;
    };
    /** Update the container dimensions (called from canvas resize observer). */
    setContainerSize(w: number, h: number): void;
    /**
     * Precompute static guide candidates for a drag gesture.
     * Reuse this context across pointermove frames to reduce QuadTree work.
     */
    createDragSnapContext(allDragIds: Set<string> | string[]): DragSnapContext;
    /**
     * Compute smart guide alignment + grid snap for a drag operation.
     * Sets `this.alignGuides` and emits `guides` event.
     * Returns the adjusted delta to apply.
     */
    computeDragSnap(origPositions: Array<{
        id: string;
        x: number;
        y: number;
    }>, allDragIds: Set<string> | string[], dx: number, dy: number, modKey: boolean, dragSnapContext?: DragSnapContext): {
        finalDx: number;
        finalDy: number;
    };
    /** Clear alignment guides (call on drag end). */
    clearAlignGuides(): void;
    setBoardBackground(bg: BoardBackground): void;
    pan(dx: number, dy: number): void;
    zoomByWheel(delta: number, screenX: number, screenY: number): void;
    zoomByFactor(factor: number, screenX: number, screenY: number): void;
    zoomTo(level: number, anchor?: {
        x: number;
        y: number;
    }): void;
    zoomIn(): void;
    zoomOut(): void;
    /** Zoom and pan to center a node for editing (e.g. after double-click on placeholder) */
    zoomToNode(nodeId: string, targetZoom?: number): void;
    fitToContent(): void;
    /**
     * Fit viewport to a single frame node, ignoring everything else.
     * Used by single-frame rendering (e.g. flashcard study mode).
     */
    fitToFrame(frameId: string): void;
    /** Save the current viewport as the origin view (restored on next load). */
    setOriginView(): void;
    /** Clear the saved origin view. */
    clearOriginView(): void;
    /** Jump to the saved origin view, or fit-to-content if none is saved. */
    goToOriginView(): void;
    screenToCanvas(sx: number, sy: number): {
        x: number;
        y: number;
    };
    canvasToScreen(cx: number, cy: number): {
        x: number;
        y: number;
    };
    addNode(node: SpatialNode): void;
    addNodes(nodes: SpatialNode[]): void;
    updateNode(id: string, patch: Partial<SpatialNode>): void;
    /**
     * Batch update multiple nodes with a single change emit.
     * Use during drag/resize to avoid N re-renders per frame.
     */
    updateMany(updates: Array<{
        id: string;
        patch: Partial<SpatialNode>;
    }>): void;
    private updateConnectedEdges;
    updateNodeWithHistory(id: string, patch: Partial<SpatialNode>): void;
    /**
     * Like `updateNodeWithHistory`, but multiple calls with the same `sessionKey` share one undo step
     * (e.g. dragging an inspector slider). Call `endHistoryCoalesce()` when the gesture ends.
     */
    updateNodeWithHistoryCoalesced(id: string, patch: Partial<SpatialNode>, sessionKey: string): void;
    /** Update multiple nodes in a single undo step. */
    batchUpdateWithHistory(updates: Array<{
        id: string;
        patch: Partial<SpatialNode>;
    }>): void;
    /**
     * Like `batchUpdateWithHistory`, but shares one undo step with other calls using the same `sessionKey`.
     */
    batchUpdateWithHistoryCoalesced(updates: Array<{
        id: string;
        patch: Partial<SpatialNode>;
    }>, sessionKey: string): void;
    deleteNode(id: string): void;
    getNode(id: string): SpatialNode | undefined;
    getAllNodes(): SpatialNode[];
    /** Returns a read-only iterable of all nodes (no copy). */
    iterNodes(): IterableIterator<SpatialNode>;
    getNodesByType(type: NodeType): SpatialNode[];
    /** Returns all non-edge nodes fully contained within a frame's bounds (including nested frames). */
    getNodesInsideFrame(frameId: string): SpatialNode[];
    /** Returns tracked frame children (nodes explicitly added to the frame). */
    getFrameChildren(frameId: string): SpatialNode[];
    /** Returns IDs of all descendants of a frame (children, grandchildren, etc.). */
    getFrameDescendantIds(frameId: string): Set<string>;
    /** Rebuild frameChildren from spatial containment. Called on load/undo/redo.
     *  Each node is assigned only to its smallest containing frame. */
    rebuildFrameChildren(): void;
    /** After nodes are moved, update which frames they belong to.
     *  Each node is assigned only to its smallest containing frame.
     *  Frames can be nested inside other frames (but not inside themselves or their descendants). */
    updateFrameMembership(nodeIds: string[]): void;
    /** Sync frame children after resize: remove nodes no longer inside, add newly contained nodes. */
    syncFrameChildrenAfterResize(frameId: string): void;
    /** Adopt all existing nodes that are spatially inside a newly created frame. */
    adoptNodesIntoNewFrame(frameId: string): void;
    nextZ(): number;
    setNextZ(z: number): void;
    bringToFront(ids: string[]): void;
    sendToBack(ids: string[]): void;
    /** AABB overlap test between two nodes. */
    private _nodesOverlap;
    bringForward(ids: string[]): void;
    sendBackward(ids: string[]): void;
    /** Update the QuadTree bounds for an auto-height node when its measured height changes. */
    updateMeasuredHeight(nodeId: string, height: number): void;
    hitTest(cx: number, cy: number, measuredHeights?: Record<string, number>): SpatialNode | null;
    /** Returns all nodes at a point, sorted highest-z first */
    hitTestAll(cx: number, cy: number, measuredHeights?: Record<string, number>): SpatialNode[];
    getNodesInRect(rect: {
        x: number;
        y: number;
        w: number;
        h: number;
    }): SpatialNode[];
    /** Expand selection to include all group siblings, walking up the group
     *  hierarchy until the active group (or root) is reached. */
    private expandSelectionToGroups;
    select(id: string): void;
    toggleSelect(id: string): void;
    selectMultiple(ids: string[]): void;
    deselectAll(): void;
    deleteSelected(): void;
    /** Remove groupParent entries for groups that no longer have any members. */
    private cleanupEmptyGroups;
    /** Set a groupParent entry and keep groupChildren in sync. */
    private linkGroupParent;
    /** Remove a groupParent entry and keep groupChildren in sync. */
    private unlinkGroupParent;
    /** Rebuild the groupChildren reverse index from groupParent. */
    private rebuildGroupChildren;
    deleteNodes(ids: string[]): void;
    private flipSelected;
    flipSelectedHorizontal(): void;
    flipSelectedVertical(): void;
    /**
     * Re-layout selected nodes in one undo step: layered left-to-right flow when
     * selected edges form a DAG (with barycenter crossing reduction), otherwise a
     * tidy reading-order grid; then overlap refinement for nodes and estimated
     * wire labels. Skips edges and locked nodes.
     */
    arrangeSelectedNodes(measuredHeights?: Record<string, number>, labelLayoutZoom?: number): void;
    /**
     * Same algorithm as `arrangeSelectedNodes`, but over every unlocked non-edge
     * node on the board (no selection required). Bottom-bar “arrange board” entry.
     */
    arrangeAllNodes(measuredHeights?: Record<string, number>, labelLayoutZoom?: number): void;
    /** Axis alignment for multi-select (union bbox reference). Skips edges and locked nodes. */
    alignSelectedNodes(mode: SelectionAlignMode, measuredHeights?: Record<string, number>): void;
    /**
     * Even spacing between adjacent items along `axis` (sort by min edge on that axis).
     * Gaps are never negative: if the union bbox is narrower than the sum of sizes,
     * uses zero gap and centers the packed strip on the original bbox so nothing overlaps.
     * Skips edges and locked nodes.
     */
    distributeSelectedNodes(axis: SelectionDistributeAxis, measuredHeights?: Record<string, number>): void;
    groupSelected(): void;
    ungroupSelected(): void;
    selectionHasGroup(): boolean;
    /** Returns the outermost groupId if all selected nodes belong to the same group tree, else undefined. */
    selectionGroupId(): string | undefined;
    /** True if all selected nodes belong to exactly one group (possibly nested). */
    selectionIsSingleGroup(): boolean;
    getGroupMembers(groupId: string): SpatialNode[];
    /** Enter a group for drill-down selection of individual children. */
    enterGroup(groupId: string): void;
    /** Fully exit all group levels and deselect. */
    exitAllGroups(): void;
    /** Exit the active group — go up one level for nested groups, or exit entirely. */
    exitGroup(): void;
    /** Check if a node belongs to the currently active (entered) group or any of its descendants. */
    isNodeInActiveGroup(nodeId: string): boolean;
    /** Get the outermost group of a node (stopping at activeGroupId boundary). */
    getNodeOutermostGroup(nodeId: string): string | undefined;
    /** Get all nodes that are descendants of a group (direct + nested sub-groups). */
    getAllGroupDescendantNodes(groupId: string): SpatialNode[];
    duplicateSelected(): void;
    copySelected(): void;
    cutSelected(): void;
    /**
     * Paste clipboard contents centered at a canvas position.
     * If no position given, uses viewport center.
     */
    pasteClipboard(canvasX?: number, canvasY?: number): void;
    /**
     * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
     */
    applyTemplate(templateId: string, cx: number, cy: number): void;
    hasClipboard(): boolean;
    getClipboardNodes(): SpatialNode[];
    setClipboard(nodes: SpatialNode[]): void;
    setMode(mode: Mode): void;
    /** End a coalesced inspector/gesture history session (see `updateNodeWithHistoryCoalesced`). */
    endHistoryCoalesce(): void;
    pushHistorySnapshot(): void;
    rebuildQuadTree(): void;
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    /** Add a remote node without emitting events or pushing history. */
    addRemoteNode(node: SpatialNode): void;
    /** Delete a remote node without emitting events or pushing history. */
    deleteRemoteNode(id: string): void;
    /** Apply a remote node update without emitting events or pushing history. */
    applyRemoteNodeUpdate(id: string, props: Partial<SpatialNode>): void;
    /** Trigger a re-render without pushing history. Used after remote updates. */
    notifyChange(): void;
    /** Emit draw progress for collab live stroke preview. */
    notifyDrawProgress(stroke: {
        points: Array<[number, number, number]>;
        color: string;
        width: number;
        strokeStyle?: string;
        opacity?: number;
    }): void;
    /** Emit draw end when a stroke is completed or cancelled. */
    notifyDrawEnd(): void;
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
    }): void;
    /** Emit shape end when shape creation is completed or cancelled. */
    notifyShapeEnd(): void;
    /** Emit edge creation drag progress for collab preview. */
    notifyEdgeProgress(preview: EdgeCreationAwareness): void;
    /** Emit when edge creation drag ends (commit or cancel). */
    notifyEdgeEnd(): void;
    /** Frame / text / note / sticky rectangle drag preview for collab. */
    notifyRectDragProgress(preview: RectDragAwareness): void;
    notifyRectDragEnd(): void;
    /** Eraser drag trail + marked node IDs for collab preview. */
    notifyEraserProgress(preview: EraserAwareness): void;
    notifyEraserEnd(): void;
    /** Emit laser pointer progress for collab trail preview. */
    notifyLaserProgress(trail: Array<[number, number]>): void;
    /** Emit laser pointer end when trail has fully faded. */
    notifyLaserEnd(): void;
    toSBD(): Promise<string>;
    fromSBD(sbd: string): Promise<void>;
    toJSON(): object;
    fromJSON(json: {
        nodes: [string, SpatialNode][];
        viewport?: Viewport;
        groupParent?: [string, string][];
    }): void;
    /** Begin a grouped agent action. All subsequent `addNode`/`addNodes` calls
     *  share one undo snapshot until `endAgentAction()` is called.
     *  Calling this while already inside a group is a no-op (idempotent).
     *
     *  Safety: if `endAgentAction()` is not called within `AGENT_ACTION_TIMEOUT_MS`
     *  (default 60s), the depth is force-reset to 0 so a crashed MCP client can't
     *  permanently disable per-op undo snapshots. In-process JS callers should
     *  prefer `runAgentAction(fn)` which handles begin/end via try/finally. */
    beginAgentAction(): void;
    /** End a grouped agent action. The undo snapshot pushed by `beginAgentAction()`
     *  now covers all intermediate mutations. */
    endAgentAction(): void;
    /** Run a callback inside a `begin/end` agent action with try/finally semantics.
     *  Use this from in-process JS callers (the dev-app demo, tests, etc.) so a
     *  thrown exception can never leak `_agentActionDepth`. Supports sync + async. */
    runAgentAction<T>(fn: () => T | Promise<T>): T | Promise<T>;
    /** Whether the engine is inside a `beginAgentAction()` / `endAgentAction()` block. */
    get isInAgentAction(): boolean;
    /** Set mode and active tool in a single call — reduces agent round-trips. */
    activateTool(config: {
        mode: Mode;
        color?: string;
        width?: number;
        shapeType?: "rect" | "ellipse" | "diamond" | "line" | "arrow";
        fillColor?: string;
        fillStyle?: "hachure" | "cross-hatch" | "solid";
        strokeStyle?: "solid" | "dashed" | "dotted";
        roughness?: number;
        opacity?: number;
        fontSize?: number;
        fontFamily?: string;
        textAlign?: "left" | "center" | "right";
        edgeType?: EdgeType;
        arrowHead?: "none" | "arrow" | "filled" | "dot";
        arrowTail?: "none" | "arrow" | "filled" | "dot";
    }): void;
    /** Create a shape node (rect, ellipse, diamond, line, arrow).
     *  Returns the new node id. */
    createShape(shape: "rect" | "ellipse" | "diamond" | "line" | "arrow", x: number, y: number, w: number, h: number, options?: {
        stroke?: string;
        strokeWidth?: number;
        fill?: string;
        fillStyle?: "hachure" | "cross-hatch" | "solid";
        roughness?: number;
        opacity?: number;
        label?: string;
        labelFontSize?: number;
        strokeStyle?: "solid" | "dashed" | "dotted";
        edgeStyle?: "sharp" | "round";
    }): string;
    /** Create a text node. Returns the new node id. */
    createText(text: string, x: number, y: number, options?: {
        w?: number;
        fontSize?: number;
        fontFamily?: string;
        color?: string;
        align?: "left" | "center" | "right";
        opacity?: number;
        borderColor?: string;
        borderWidth?: number;
        borderStyle?: "solid" | "dashed" | "dotted";
    }): string;
    /** Estimate text block height from rough line count. */
    private estimateTextBlockHeight;
    /** Create a sticky note. Returns the new node id. */
    createSticky(text: string, x: number, y: number, options?: {
        w?: number;
        h?: number;
        color?: string;
        fontSize?: number;
        opacity?: number;
        edgeStyle?: "sharp" | "round";
    }): string;
    /** Create a rich-content block (BlockNote). Returns the new node id. */
    createContentBlock(blocks: unknown[], x: number, y: number, options?: {
        w?: number;
        h?: number | "auto";
        markdown?: string;
        borderColor?: string;
        borderWidth?: number;
        borderStyle?: "solid" | "dashed" | "dotted";
        opacity?: number;
        edgeStyle?: "sharp" | "round";
    }): string;
    /** Create a frame node. Returns the new node id. */
    createFrame(x: number, y: number, w: number, h: number, options?: {
        label?: string;
        backgroundColor?: string;
        borderColor?: string;
        borderWidth?: number;
        borderStyle?: "solid" | "dashed" | "dotted";
        opacity?: number;
        slideOrder?: number;
        devicePreset?: string;
    }): string;
    /** Create an image node. Returns the new node id. */
    createImage(src: string, x: number, y: number, options?: {
        w?: number;
        h?: number;
        alt?: string;
        opacity?: number;
        flipH?: boolean;
        flipV?: boolean;
        borderColor?: string;
        borderWidth?: number;
        borderStyle?: "solid" | "dashed" | "dotted";
    }): string;
    /** Create a draw stroke (freehand drawing). Returns the new node id.
     *  Points are in canvas coordinates; they are normalized relative to the
     *  computed bounding box internally. */
    createDrawStroke(points: Array<[number, number, number?]>, options?: {
        color?: string;
        width?: number;
        tool?: "pen" | "pencil" | "highlighter" | "vector";
        opacity?: number;
        fill?: string;
        fillStyle?: "hachure" | "cross-hatch" | "solid";
        strokeStyle?: "solid" | "dashed" | "dotted";
    }): string;
    /** Create an edge connecting two nodes. Returns the new node id. */
    createEdge(fromId: string, toId: string, options?: {
        label?: string;
        color?: string;
        strokeWidth?: number;
        edgeType?: EdgeType;
        arrowHead?: "none" | "arrow" | "filled" | "dot";
        arrowTail?: "none" | "arrow" | "filled" | "dot";
        sourceHandle?: HandleSide;
        targetHandle?: HandleSide;
        style?: "solid" | "dashed" | "dotted";
        animated?: boolean;
        animatedDirection?: "forward" | "reverse" | "both" | "bop";
        sourcePort?: string;
        targetPort?: string;
        roughness?: number;
        attachmentGap?: number;
    }): string;
    /** Full structured snapshot of the engine for agent/LLM consumption.
     *
     *  Defaults to a 200-node cap to keep LLM context manageable on large boards.
     *  Pass `limit: 0` to disable the cap (caller takes responsibility for size).
     *  Use `nodeIds` / `types` / `region` to narrow before truncation. */
    getAgentState(options?: AgentStateOptions): AgentCanvasState;
    /** Human-readable markdown summary of the current canvas, optimized for LLM prompts. */
    getAgentStateMarkdown(options?: AgentStateOptions): string;
    /** Smoothly animate the viewport to a target position/zoom.
     *  Returns a Promise that resolves when the animation completes. */
    animateViewport(target: {
        x?: number;
        y?: number;
        zoom?: number;
    }, options?: {
        duration?: number;
    }): Promise<void>;
    /** Smoothly pan so the canvas point (cx, cy) is centered.
     *  Returns a Promise that resolves when the animation completes. */
    animatePanTo(cx: number, cy: number, duration?: number): Promise<void>;
    /** Smoothly zoom to a level. Returns a Promise that resolves when done. */
    animateZoomTo(level: number, duration?: number): Promise<void>;
    /** Smoothly zoom and center on a specific node, sized to fit with padding.
     *  Returns a Promise that resolves when the animation completes. */
    animateZoomToNode(nodeId: string, duration?: number): Promise<void>;
}
export {};
