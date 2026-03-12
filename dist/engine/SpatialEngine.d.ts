import type { SpatialNode, Viewport, Mode, ActiveTool, NodeType } from "./types";
import type { NodeTypeRegistry } from "../nodes/registry";
export type BoardBackground = "plain-white" | "dot-grid" | "engineering" | "blueprint" | "dark-grid" | "japanese-stationery" | "kraft";
export interface AlignGuide {
    axis: 'x' | 'y';
    position: number;
    start: number;
    end: number;
}
type EventMap = {
    change: () => void;
    viewport: () => void;
    selection: () => void;
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
    }) => void;
    'shape:end': () => void;
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
    private listeners;
    private _suppressEvents;
    private _collabMode;
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
    /** Set the node type registry for lifecycle hooks. */
    setRegistry(registry: NodeTypeRegistry): void;
    /** Enable collaborative mode. Disables local snapshot history. */
    setCollabMode(enabled: boolean): void;
    /** Whether the engine is in collaborative mode. */
    get isCollabMode(): boolean;
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
    toggleSnapToGrid(): void;
    toggleSmartGuides(): void;
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
     * Compute smart guide alignment + grid snap for a drag operation.
     * Sets `this.alignGuides` and emits `guides` event.
     * Returns the adjusted delta to apply.
     */
    computeDragSnap(origPositions: Array<{
        id: string;
        x: number;
        y: number;
    }>, allDragIds: Set<string> | string[], dx: number, dy: number, modKey: boolean): {
        finalDx: number;
        finalDy: number;
    };
    /** Clear alignment guides (call on drag end). */
    clearAlignGuides(): void;
    setBoardBackground(bg: BoardBackground): void;
    pan(dx: number, dy: number): void;
    zoomByWheel(delta: number, screenX: number, screenY: number): void;
    zoomTo(level: number, anchor?: {
        x: number;
        y: number;
    }): void;
    zoomIn(): void;
    zoomOut(): void;
    /** Zoom and pan to center a node for editing (e.g. after double-click on placeholder) */
    zoomToNode(nodeId: string, targetZoom?: number): void;
    fitToContent(): void;
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
    /** Update multiple nodes in a single undo step. */
    batchUpdateWithHistory(updates: Array<{
        id: string;
        patch: Partial<SpatialNode>;
    }>): void;
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
    }): void;
    /** Emit shape end when shape creation is completed or cancelled. */
    notifyShapeEnd(): void;
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
}
export {};
