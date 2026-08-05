import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { SpatialEngine } from "../../engine/SpatialEngine";
import type {
  SpatialNode,
  ShapeNode,
  EdgeType,
  HandleSide,
  StrokeStyle,
} from "../../engine/types";
import type { PortDirection } from "../../engine/data-flow-types";
import type { NodeTypeRegistry } from "../../nodes/registry";
import type { DataFlowEngine } from "../../engine/DataFlowEngine";
import type { DataFlowEdgeOverlay } from "./SVGLayer";
import GridBackground from "./GridBackground";
import Minimap from "../overlays/Minimap";
import { getPaperType } from "../paper-types";
import { addPersonalItem } from "../../store/personal-library";
import PersonalLibraryPrompt from "../panels/PersonalLibraryPrompt";
import {
  PropertyHistoryCoalesceContext,
  usePropertyHistorySession,
} from "../sidebar/PropertyHistoryCoalesceContext";
import { prefersSafariWebKitViewportWorkaround } from "../../utils/safari-viewport-raster";
import { quantizeViewportForRender } from "./viewport-quantize";
import { serializeEdgeCreationAwareness } from "../../collab/edge-creation-awareness";
import ContextMenu from "../overlays/ContextMenu";
import { useSBI18n } from "../contexts/LocalizationContext";
import { hostNodeInScope } from "./canvas-helpers";
import type { NodeItemCtx } from "./node-item-context";
import NodeItem from "./NodeItem";
import { TABLE_CELL_W, TABLE_CELL_H } from "../blocks/TableBlock";
import { getRoughRectPaths, getRoughLinePaths } from "../../rendering/rough-shapes";
import ShapeLabelEditor from "./ShapeLabelEditor";
import UnifiedDomViewportLayer from "./UnifiedDomViewportLayer";
import LiveSVGLayerHost from "./LiveSVGLayerHost";
import SelectionChromeOverlay from "./SelectionChromeOverlay";
import { useContainerSize } from "./hooks/useContainerSize";
import { useMeasuredHeights } from "./hooks/useMeasuredHeights";
import { useDataFlow } from "./hooks/useDataFlow";
import { useCanvasDrop } from "./hooks/useCanvasDrop";
import { useSearchHighlights } from "./hooks/useSearchHighlights";
import { useCanvasGeometry } from "./hooks/useCanvasGeometry";
import { useVirtualizedView } from "./hooks/useVirtualizedView";
import { useContextMenu } from "./hooks/useContextMenu";
import { useNodeTransforms } from "./hooks/useNodeTransforms";
import { useHoverCursor } from "./hooks/useHoverCursor";
import { useInlineEditing } from "./hooks/useInlineEditing";
import { useNodeCreation } from "./hooks/useNodeCreation";
import { useEngineMirror } from "./hooks/useEngineMirror";
import { usePointerGestures } from "./hooks/usePointerGestures";
import { useTouchDoubleTap } from "./hooks/useTouchDoubleTap";

// Stable sentinels for the per-edge SVG hosts (no chrome renders there;
// the DOM container already applies the viewport transform).
const EMPTY_SELECTION: Set<string> = new Set();
const IDENTITY_VIEWPORT = { x: 0, y: 0, zoom: 1 };

export default function SpatialCanvas({
  engine,
  registry,
  dataFlow,
  dataFlowEdgeOverlay = "off",
  showPortLabels = true,
  onPortConnectEmpty,
  portConnectHold = false,
  minimapVisible = true,
  minimapBottomOffset,
  minimapEndOffset,
  singleFrameId,
  hostVisibleNodeIds = null,
  overlayNodes = null,
}: {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  dataFlow?: DataFlowEngine | null;
  /** Port edge captions; only applies when `dataFlow` is active. Default `off`. */
  dataFlowEdgeOverlay?: DataFlowEdgeOverlay;
  /** When false, hide In/Out pills beside port dots. Default true. */
  showPortLabels?: boolean;
  /** Port-drag released with no compatible target port under the cursor. */
  onPortConnectEmpty?: (event: {
    nodeId: string;
    portId: string;
    direction: PortDirection;
    canvasX: number;
    canvasY: number;
    clientX: number;
    clientY: number;
  }) => void;
  /** Keep edge preview + skeleton ghost while host add-node menu is open. */
  portConnectHold?: boolean;
  /** When false, the canvas minimap overlay is hidden. Default true. */
  minimapVisible?: boolean;
  /** Raise the minimap above compact bottom chrome (px from bottom edge). */
  minimapBottomOffset?: number;
  minimapEndOffset?: number;
  /** When set, only render this frame and its children. */
  singleFrameId?: string;
  /** Host render scope: when non-null, render ONLY these node ids (+ edges whose
   *  both endpoints are in the set). null = render everything (default). */
  hostVisibleNodeIds?: ReadonlySet<string> | null;
  /** Ephemeral overlay nodes (cards + edges) rendered but NOT in the engine —
   *  merged into the DOM/SVG render lists AFTER the scope filter, so they always
   *  show. Serialize/history never see them (they live only in this prop). */
  overlayNodes?: readonly SpatialNode[] | null;
}) {
  const { labels } = useSBI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useContainerSize(engine, containerRef);
  // Inline-editing slots (six editing-id slots + derived editingNodeId +
  // creation-tracking refs) and their two owning effects (engine crop-request,
  // input-leakage suppression). Setters/refs keep stable identities so the
  // still-in-component handlers + nodeItemCtx consume them unchanged. Declared
  // ahead of useEngineMirror so its selection handler can clear these slots.
  const {
    editingTextId,
    setEditingTextId,
    editingStickyId,
    setEditingStickyId,
    editingFrameLabelId,
    setEditingFrameLabelId,
    editingShapeLabelId,
    setEditingShapeLabelId,
    croppingImageId,
    setCroppingImageId,
    setEditingYouTubeId,
    setEditingTableId,
    editingNodeId,
    editClickRef,
    newlyCreatedTextRef,
    textEditLockRef,
    newlyCreatedBlockNoteIdRef,
  } = useInlineEditing(engine, containerRef);

  // Active group rotation state (during unified rotation drag). Declared ahead
  // of useEngineMirror so its selection handler can clear the ad-hoc rotation.
  const [groupRotation, setGroupRotation] = useState<{
    angle: number;
    cx: number;
    cy: number;
    bounds: { x: number; y: number; w: number; h: number };
  } | null>(null);

  // Engine-mirror sync spine: the React state that mirrors the engine + the
  // master subscription (change/viewport/selection/mode/background/guides/
  // search/gesture/group/lasso) + the native wheel handler. Performance-load-
  // bearing — see the hook for every preserved guard.
  const {
    nodes,
    viewport,
    selection,
    isNodeDragging,
    mode,
    activeGroupId,
    searchState,
    gridActive,
    gridSize,
    boardBackground,
    setViewport,
    setGridActive,
    setSmartGuidesActive,
  } = useEngineMirror(engine, {
    setEditingTextId,
    setEditingStickyId,
    setEditingFrameLabelId,
    setEditingShapeLabelId,
    setCroppingImageId,
    setGroupRotation,
    textEditLockRef,
    containerRef,
  });

  const canvasHistoryStableId = useMemo(() => {
    if (selection.size === 1) return Array.from(selection)[0];
    if (selection.size > 1) return [...selection].sort().join("\0");
    return "canvas-none";
  }, [selection]);

  const getCoalesceKey = usePropertyHistorySession(engine, canvasHistoryStableId);

  // Long-press context menu (touch)
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressOriginRef = useRef<{ clientX: number; clientY: number } | null>(null);


  // Edge creation preview state
  const [edgePreview, setEdgePreview] = useState<{
    fromNode: SpatialNode;
    cursorX: number;
    cursorY: number;
    sourceHandle?: HandleSide;
    /** Perimeter t (number) or interior [u,v] anchor on the source node. */
    sourceT?: number | [number, number];
    /** Port ID on the source node (for port-aware edge creation). */
    sourcePort?: string;
    /** Direction of the source port. */
    sourceDirection?: PortDirection;
    /** Edge style for realistic preview */
    edgeColor?: string;
    edgeStrokeWidth?: number;
    edgeStyle?: StrokeStyle;
    edgeType?: EdgeType;
    attachmentGap?: number;
    /** Held after empty-canvas drop while host add-node menu is open. */
    held?: boolean;
    /** Skeleton ghost node at the drop (competitor-style). */
    ghost?: { w: number; h: number; attach: "in" | "out" };
  } | null>(null);

  const prevEdgePreviewRef = useRef(edgePreview);
  useEffect(() => {
    const had = prevEdgePreviewRef.current;
    prevEdgePreviewRef.current = edgePreview;
    if (edgePreview) {
      engine.notifyEdgeProgress(serializeEdgeCreationAwareness(edgePreview));
    } else if (had) {
      engine.notifyEdgeEnd();
    }
  }, [edgePreview, engine]);

  // Clear held rubber-band + skeleton when the host closes its add-node menu.
  const prevPortConnectHoldRef = useRef(portConnectHold);
  useEffect(() => {
    const was = prevPortConnectHoldRef.current;
    prevPortConnectHoldRef.current = portConnectHold;
    if (was && !portConnectHold) {
      setEdgePreview((prev) => (prev?.held ? null : prev));
    }
  }, [portConnectHold]);


  const [edgeReconnect, setEdgeReconnect] = useState<{
    edgeId: string;
    endpoint: "source" | "target";
    anchorNodeId: string;
    anchorHandle: HandleSide | undefined;
    cursorX: number;
    cursorY: number;
  } | null>(null);

  // Prune measuredHeights when nodes are removed to avoid unbounded growth
  const nodeIds = useMemo(() => new Set(nodes.map((n) => n.id)), [nodes]);

  // Measured heights for auto-height content blocks (for accurate selBounds)
  const { measuredHeights, handleMeasuredHeight, observeElement, unobserveElement } =
    useMeasuredHeights(engine, nodeIds);

  const {
    resolvePortPositions,
    getNodeAABB,
    getNodesInMarqueeRect,
    getNodesInLassoPolygon,
    selBounds,
    activeGroupBounds,
  } = useCanvasGeometry({
    engine,
    registry,
    viewport,
    measuredHeights,
    selection,
    nodes,
    activeGroupId,
  });

  // Viewport culling + virtualization for large boards.
  const { virtualizedView, svgLayerNodes, _singleFrameIds } = useVirtualizedView({
    viewport,
    containerSize,
    nodes,
    selection,
    engine,
    registry,
    measuredHeights,
    edgePreview,
    edgeReconnect,
    isNodeDragging,
    hostVisibleNodeIds,
    singleFrameId,
    overlayNodes,
  });

  // UNIFIED Z-ORDER: every committed edge renders as a per-edge SVG host
  // INSIDE the DOM layer's stacking context at zIndex = edge.z, so nodes and
  // edges share one stack and ordering is steerable from both sides — "bring
  // the circle above the connector" is just a z move (see spatialengine_zorder).
  // The top SVG overlay keeps only live chrome: previews, marquee/lasso,
  // trails, snap guides, port dots, and selection boxes for non-edge nodes.
  //
  // SVGLayer resolves edge geometry from its own node list, so each host also
  // carries the edge's ENDPOINT nodes. They are render-inert there (endpoint
  // shapes are never in the host's selection ⇒ no chrome; hidePortDots keeps
  // the port-circle layer with the full-canvas overlay) — membership only;
  // the host re-reads live nodes each tick. The registry prop is REQUIRED for
  // port-connected edges: without it EdgeRenderer can't resolve port anchors
  // and every edge silently falls back to freeform nearest-side geometry.
  // Ephemeral host-overlay endpoints (not in the engine) resolve from the
  // overlayNodes prop.
  const edgeHosts = useMemo(
    () =>
      svgLayerNodes
        .filter((n) => n.type === "edge")
        .map((edge) => {
          const d = edge.data as { fromId?: string; toId?: string };
          const members: SpatialNode[] = [edge];
          for (const endId of [d.fromId, d.toId]) {
            const end =
              (endId ? engine.getNode(endId) : undefined) ??
              (endId ? overlayNodes?.find((o) => o.id === endId) : undefined);
            if (end) members.push(end);
          }
          const hostSelection = selection.has(edge.id)
            ? new Set([edge.id])
            : EMPTY_SELECTION;
          return { edge, members, hostSelection };
        }),
    [svgLayerNodes, engine, selection, overlayNodes],
  );
  const overlaySvgNodes = useMemo(
    () => svgLayerNodes.filter((n) => n.type !== "edge"),
    [svgLayerNodes],
  );

  // Alt+click deep-select: track which z-layer index we last selected
  const altClickRef = useRef<{ x: number; y: number; index: number }>({
    x: 0,
    y: 0,
    index: -1,
  });


  // Cursor management + rAF-throttled hover pointer-move (imperative cursor,
  // hover state, bopping-edge derivation). Extracted to a hook; the eraser
  // cleanup half of the old mode effect stays below as its own effect.
  const { handlePointerMove, hoveredNodeId, cursorCanvasPos, boppingNodeIds } =
    useHoverCursor({
      engine,
      containerRef,
      mode,
      selBounds,
      resolvePortPositions,
      getNodeAABB,
      measuredHeights,
      nodes,
      longPressTimerRef,
      longPressOriginRef,
    });

  const [personalLibPrompt, setPersonalLibPrompt] = useState<{
    nodes: SpatialNode[];
    groupParent: Map<string, string>;
  } | null>(null);

  // Build context menu sections based on current selection
  const { contextMenu, setContextMenu, buildContextMenuSections, handleContextMenu } = useContextMenu({
    engine,
    labels,
    measuredHeights,
    viewportZoom: viewport.zoom,
    altClickRef,
    setGridActive,
    setSmartGuidesActive,
    setPersonalLibPrompt,
  });
  // Node/text/block creation (createBlockNote, createTextNodeAndEdit, and the
  // double-click dispatcher). Extracted to a hook; the editing setters/refs the
  // moved code writes are threaded through from useInlineEditing.
  const { createBlockNote, createTextNodeAndEdit, handleDoubleClick } = useNodeCreation({
    engine,
    measuredHeights,
    containerRef,
    setEditingTextId,
    setEditingStickyId,
    setEditingFrameLabelId,
    setEditingShapeLabelId,
    editClickRef,
    newlyCreatedTextRef,
    textEditLockRef,
    newlyCreatedBlockNoteIdRef,
  });

  // Host render-scope (loop sub-canvas): hit-testing must respect it so the
  // HIDDEN engine nodes/edges (the scoped-out loop node, its edges, off-scope
  // nodes) don't hijack selection/drag inside the scope. Kept in a ref so the
  // large pointer callback needn't re-create on scope change. null = no filter.
  const hostVisibleRef = useRef(hostVisibleNodeIds);
  hostVisibleRef.current = hostVisibleNodeIds;
  const hitEligible = useCallback((n: SpatialNode): boolean => {
    const ids = hostVisibleRef.current;
    return !ids || hostNodeInScope(n, ids);
  }, []);

  const {
    handlePointerDown,
    selectionRect,
    lassoPoints,
    activeStrokeNode,
    shapePreview,
    textPreview,
    eraserTrail,
    eraserMarkedIds,
    laserTrail,
  } = usePointerGestures({
    engine,
    containerRef,
    mode,
    labels,
    measuredHeights,
    selBounds,
    getNodeAABB,
    getNodesInMarqueeRect,
    getNodesInLassoPolygon,
    resolvePortPositions,
    hitEligible,
    createBlockNote,
    createTextNodeAndEdit,
    contextMenu,
    setContextMenu,
    buildContextMenuSections,
    setEditingStickyId,
    setViewport,
    setEdgePreview,
    setGroupRotation,
    altClickRef,
    longPressTimerRef,
    longPressOriginRef,
  });

  // (Below usePointerGestures because it renders activeStrokeNode — the
  // in-progress freehand stroke that shares this DOM-layer pipeline.)
  const domLayerNodes = useMemo(() => {
    let base =
      virtualizedView?.domNodes ??
      nodes.filter((n) => {
        // Single-frame filter: only render descendants (hide the frame border itself)
        if (_singleFrameIds) {
          if (n.id === singleFrameId) return false; // hide the frame itself
          if (!_singleFrameIds.has(n.id)) return false;
        }
        if (registry) {
          const def = registry.get(n.type);
          return !!def && !def.isSVGOnly;
        }
        return (
          n.type === "blocknote" ||
          n.type === "draw" ||
          n.type === "shape" ||
          n.type === "image" ||
          n.type === "text" ||
          n.type === "frame" ||
          n.type === "sticky"
        );
      });
    // Host render-scope filter (loop sub-canvas). DOM nodes are non-edge, so a
    // plain id-membership test suffices. null = render all (default).
    if (hostVisibleNodeIds) base = base.filter((n) => hostVisibleNodeIds.has(n.id));
    // Append ephemeral overlay CARDS (non-edge) — always rendered (the frame).
    if (overlayNodes && overlayNodes.length) {
      const cards = overlayNodes.filter((n) => n.type !== "edge");
      if (cards.length) base = [...base, ...cards];
    }
    // In-progress freehand stroke — a real DrawNode rendered by this same
    // DOM-layer pipeline as the committed ink will be (one raster context, so
    // the stroke cannot shift on mouse-up). Id-deduped: once the engine
    // mirror delivers the committed node (the frame after pointer-up) the
    // local copy yields, and React keeps the NodeItem instance via the key.
    if (activeStrokeNode && !base.some((n) => n.id === activeStrokeNode.id)) {
      base = [...base, activeStrokeNode];
    }
    if (!croppingImageId || base.some((n) => n.id === croppingImageId)) return base;
    const pinned = nodes.find((n) => n.id === croppingImageId);
    return pinned ? [...base, pinned] : base;
  }, [virtualizedView, nodes, registry, croppingImageId, _singleFrameIds, hostVisibleNodeIds, overlayNodes, activeStrokeNode]);

  // Touch/pen double-taps → synthetic dblclick so text/sticky/label editing,
  // group drill-down, and image crop work on phones and iPads.
  useTouchDoubleTap(containerRef);

  // Node transform / handle interaction handlers (resize, rotate, connect,
  // port-connect, kink, edge-endpoint reconnect, unified multi-selection
  // rotate/resize). Extracted to a hook; every identity + dep array preserved.
  const {
    handleResizeHandleDown,
    handleRotateStart,
    handleConnectionHandleDown,
    findNearestNodeForSide,
    handlePortHandleDown,
    handleKinkHandleDown,
    handleEdgeEndpointDown,
    handleUnifiedRotateDown,
    handleUnifiedResizeDown,
  } = useNodeTransforms({
    engine,
    registry,
    measuredHeights,
    getNodeAABB,
    onPortConnectEmpty,
    portConnectHold,
    containerRef,
    setEdgePreview,
    setEdgeReconnect,
    setGroupRotation,
  });

  // Subscribe to DataFlowEngine changes for port value re-renders
  const { dataFlowVersion, getLastComputeMs, getDataFlowPortValue } = useDataFlow(dataFlow);

  // Double-click is intentionally NOT used to create content blocks in select
  // mode — rapid clicking (select then drag) was triggering false positives.
  // Use the Text tool (T) to create blocks via drag-to-create instead.


  const { handleDragOver, handleDrop } = useCanvasDrop(engine);

  // All viewport transform strings are built from the device-pixel-snapped
  // translate (see viewport-quantize.ts) so the composited DOM layer and the
  // overlay SVGs rasterize on the same grid; `viewport` itself stays exact.
  const renderVp = quantizeViewportForRender(viewport);
  const viewportTransform = `translate(${renderVp.x}px, ${renderVp.y}px) scale(${renderVp.zoom})`;
  const { searchHighlightNodeIds, searchTextRects, activeSearchNodeId } = useSearchHighlights({
    searchState,
    nodes,
    viewport,
    isNodeDragging,
    containerRef,
  });

  // Shared NodeItem inputs. New identity re-renders every NodeItem, so the
  // members are rare-change values only — nothing here may churn per frame
  // during a pointer gesture (node geometry flows through each NodeItem's
  // own engine subscription instead).
  const nodeItemCtx = useMemo<NodeItemCtx>(
    () => ({
      engine,
      registry,
      mode,
      zoom: viewport.zoom,
      selection,
      editingNodeId,
      editingTextId,
      editingStickyId,
      editingFrameLabelId,
      editingShapeLabelId,
      croppingImageId,
      measuredHeights,
      dataFlow,
      dataFlowVersion,
      labels,
      editClickRef,
      textEditLockRef,
      newlyCreatedTextRef,
      newlyCreatedBlockNoteIdRef,
      getCoalesceKey,
      handleMeasuredHeight,
      handleResizeHandleDown,
      observeElement,
      unobserveElement,
      setEditingTextId,
      setEditingStickyId,
      setEditingFrameLabelId,
      setEditingShapeLabelId,
      setCroppingImageId,
      setEditingYouTubeId,
      setEditingTableId,
    }),
    [
      engine,
      registry,
      mode,
      viewport.zoom,
      selection,
      editingNodeId,
      editingTextId,
      editingStickyId,
      editingFrameLabelId,
      editingShapeLabelId,
      croppingImageId,
      measuredHeights,
      dataFlow,
      dataFlowVersion,
      labels,
      getCoalesceKey,
      handleMeasuredHeight,
      handleResizeHandleDown,
      observeElement,
      unobserveElement,
    ],
  );

  return (
    <PropertyHistoryCoalesceContext.Provider value={getCoalesceKey}>
    <div
      ref={containerRef}
      data-sb-canvas
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        touchAction: "none",
        background: getPaperType(boardBackground).canvasBg,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <GridBackground viewport={viewport} gridSize={gridSize} background={boardBackground} gridVisible={gridActive} />

      {/* Unified DOM layer — all node types share one stacking context for correct z-ordering */}
      <UnifiedDomViewportLayer
        safariWebKitWorkaround={prefersSafariWebKitViewportWorkaround()}
        viewport={viewport}
        viewportTransform={viewportTransform}
      >
        {domLayerNodes
          .sort((a, b) => a.z - b.z)
          .map((node) => (
            <NodeItem
              key={node.id}
              id={node.id}
              staticNode={node}
              ephemeral={!engine.getNode(node.id)}
              isEraserMarked={eraserMarkedIds.has(node.id)}
              shouldBop={boppingNodeIds.has(node.id)}
              ctx={nodeItemCtx}
            />
          ))}
        {searchHighlightNodeIds.size > 0 &&
          Array.from(searchHighlightNodeIds).map((id) => {
            const node = engine.getNode(id);
            if (!node || node.type === "edge") return null;
            const h = node.h === "auto" ? (measuredHeights[node.id] ?? 100) : (node.h as number);
            const isActive = activeSearchNodeId === id;
            return (
              <div
                key={`search-highlight-${id}`}
                style={{
                  position: "absolute",
                  left: node.x - 5,
                  top: node.y - 5,
                  width: node.w + 10,
                  height: h + 10,
                  borderRadius: 10,
                  border: `2px solid ${isActive ? "#f59e0b" : "#60a5fa"}`,
                  boxShadow: isActive ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
                  pointerEvents: "none",
                  transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
                  transformOrigin: "center center",
                }}
              />
            );
          })}

        {/* Hover overlay removed — precise hit-testing makes visual hover feedback unnecessary */}

        {/* Shape label editor — separate component so it can use a cleanup effect
            to commit the label even when the selection handler unmounts it before blur fires */}
        {editingShapeLabelId && (() => {
          const labelNode = engine.getNode(editingShapeLabelId);
          if (!labelNode || labelNode.type !== "shape") return null;
          const shapeData = (labelNode as ShapeNode).data;
          const isLinear = shapeData.shape === "line" || shapeData.shape === "arrow";
          if (isLinear) return null;
          return (
            <ShapeLabelEditor
              key={editingShapeLabelId}
              node={labelNode as ShapeNode}
              engine={engine}
              onDone={() => setEditingShapeLabelId(null)}
            />
          );
        })()}

        {/* Committed edges — one SVG host per edge, interleaved with the node
            blocks by zIndex = edge.z (unified z-order). The parent container
            already applies the viewport transform, so these hosts render with
            an identity viewport in raw canvas coordinates (0×0 svg + visible
            overflow, like VectorNodeBlock). A selected edge's host receives
            the selection + endpoint/kink handle callbacks (handle elements
            re-enable pointer events themselves). */}
        {edgeHosts.map(({ edge, members, hostSelection }) => (
          <div
            key={edge.id}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: edge.z,
              pointerEvents: "none",
            }}
          >
            <LiveSVGLayerHost
              engine={engine}
              baseNodes={members}
              viewport={IDENTITY_VIEWPORT}
              selection={hostSelection}
              measuredHeights={measuredHeights}
              activeStroke={null}
              shapePreview={null}
              shapePreviewStyle={null}
              mode={mode}
              freeFormEdges={engine.freeFormEdges}
              containerTypes={engine.containerTypes}
              // Registry gives port-connected edges their port anchors (without
              // it they'd fall back to freeform nearest-side geometry). The
              // port DOTS stay with the full-canvas overlay layer below —
              // drawing them per edge host would stack duplicates.
              registry={registry}
              hidePortDots
              onEdgeEndpointDown={handleEdgeEndpointDown}
              onKinkHandleDown={handleKinkHandleDown}
              hoveredNodeId={hoveredNodeId}
              eraserMarkedIds={eraserMarkedIds.size > 0 ? eraserMarkedIds : undefined}
              cycleNodeIds={dataFlow && dataFlowVersion >= 0 ? dataFlow.cycleNodeIds : undefined}
              dataFlowEdgeOverlay={dataFlow ? dataFlowEdgeOverlay : "off"}
              getLastComputeMs={dataFlow ? getLastComputeMs : undefined}
              getDataFlowPortValue={dataFlow ? getDataFlowPortValue : undefined}
            />
          </div>
        ))}
      </UnifiedDomViewportLayer>

      <LiveSVGLayerHost
        engine={engine}
        baseNodes={overlaySvgNodes}
        viewport={viewport}
        selection={selection}
        measuredHeights={measuredHeights}
        // Local freehand strokes render in the DOM node layer (activeStrokeNode
        // in domLayerNodes); this overlay slot stays for host-driven strokes.
        activeStroke={null}
        shapePreview={shapePreview}
        shapePreviewStyle={
          shapePreview
            ? {
              stroke: engine.mode === "frame" ? "#1e1e2e" : engine.activeTool.color,
              strokeWidth: engine.mode === "frame" ? 1 : engine.activeTool.width,
              roughness: engine.mode === "frame" ? 0 : (engine.activeTool.roughness ?? 1),
              shapeType: engine.mode === "frame" ? "rect" : (engine.activeTool.shapeType || "rect"),
              fill: engine.mode === "frame" ? undefined : engine.activeTool.fillColor,
              fillStyle: engine.mode === "frame" ? undefined : engine.activeTool.fillStyle,
              strokeStyle: engine.mode === "frame" ? undefined : engine.activeTool.strokeStyle,
              opacity: engine.mode === "frame" ? undefined : engine.activeTool.opacity,
              edgeStyle: engine.mode === "frame" ? undefined : engine.activeTool.edgeStyle,
              seed: shapePreview.nodeId,
            }
            : null
        }
        onResizeHandleDown={handleResizeHandleDown}
        onRotateStart={handleRotateStart}
        onConnectionHandleDown={handleConnectionHandleDown}
        onEdgeEndpointDown={handleEdgeEndpointDown}
        onKinkHandleDown={handleKinkHandleDown}
        edgePreview={edgePreview}
        edgeReconnect={edgeReconnect}
        eraserMarkedIds={eraserMarkedIds.size > 0 ? eraserMarkedIds : undefined}
        eraserTrail={eraserTrail.length > 1 ? eraserTrail : undefined}
        laserTrail={laserTrail.length > 1 ? laserTrail : undefined}
        mode={mode}
        freeFormEdges={engine.freeFormEdges}
        hoveredNodeId={hoveredNodeId}
        cursorCanvasPos={cursorCanvasPos}
        registry={registry}
        onPortHandleDown={handlePortHandleDown}
        cycleNodeIds={dataFlow && dataFlowVersion >= 0 ? dataFlow.cycleNodeIds : undefined}
        dataFlowEdgeOverlay={dataFlow ? dataFlowEdgeOverlay : "off"}
        showPortLabels={showPortLabels}
        getLastComputeMs={dataFlow ? getLastComputeMs : undefined}
        getDataFlowPortValue={dataFlow ? getDataFlowPortValue : undefined}
        containerTypes={engine.containerTypes}
        suppressNodeOverlayId={editingNodeId}
      />

      {/* Unified multi-selection bounding box (resize / rotate / connection
          handles). Hidden in readOnly so viewers don't see dead
          affordances — selection itself still works (engine.selection is
          view-state, not doc-state), but the frame chrome with handles is
          for editing only. */}
      <SelectionChromeOverlay
        engine={engine}
        registry={registry}
        viewport={viewport}
        measuredHeights={measuredHeights}
        groupRotation={groupRotation}
        hidden={!!croppingImageId || mode === "edge" || !!edgePreview || !!edgeReconnect}
        getNodeAABB={getNodeAABB}
        onResizeDown={handleUnifiedResizeDown}
        onRotateDown={handleUnifiedRotateDown}
        onConnectionDown={handleConnectionHandleDown}
        findNearestNodeForSide={findNearestNodeForSide}
      />

      {/* Active group indicator — dashed indigo border around the entered group */}
      {activeGroupBounds && (
        <svg
          data-sb-overlay
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <g transform={`translate(${renderVp.x}, ${renderVp.y}) scale(${renderVp.zoom})`}>
            <rect
              x={activeGroupBounds.x}
              y={activeGroupBounds.y}
              width={activeGroupBounds.w}
              height={activeGroupBounds.h}
              fill="none"
              stroke="#6366f1"
              strokeWidth={1.5 / viewport.zoom}
              strokeDasharray={`${5 / viewport.zoom} ${3 / viewport.zoom}`}
              rx={4 / viewport.zoom}
              opacity={0.5}
            />
          </g>
        </svg>
      )}

      {/* Marquee selection preview — screen coords so it tracks cursor and doesn't scale with zoom */}
      {selectionRect && (() => {
        const s1 = engine.canvasToScreen(selectionRect.startX, selectionRect.startY);
        const s2 = engine.canvasToScreen(selectionRect.endX, selectionRect.endY);
        const x = Math.min(s1.x, s2.x);
        const y = Math.min(s1.y, s2.y);
        const w = Math.abs(s2.x - s1.x);
        const h = Math.abs(s2.y - s1.y);
        if (w < 2 && h < 2) return null;
        return (
          <svg
            data-sb-overlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill="rgba(59,130,246,0.08)"
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeDasharray="4"
            />
          </svg>
        );
      })()}

      {/* Lasso selection preview — screen coords polygon */}
      {lassoPoints && lassoPoints.length > 2 && (() => {
        const screenPts = lassoPoints.map(([x, y]) => engine.canvasToScreen(x, y));
        const pointsStr = screenPts.map(p => `${p.x},${p.y}`).join(" ");
        return (
          <svg
            data-sb-overlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <polygon
              points={pointsStr}
              fill="rgba(59,130,246,0.08)"
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeDasharray="4"
            />
          </svg>
        );
      })()}

      {/* Text block drag preview. Table mode renders the REAL thing instead —
          the rough hand-drawn grid, snapped to standard cell size, so the drag
          shows exactly what mouse-up will commit. */}
      {textPreview && (() => {
        const x = Math.min(textPreview.startX, textPreview.endX);
        const y = Math.min(textPreview.startY, textPreview.endY);
        const w = Math.abs(textPreview.endX - textPreview.startX);
        const h = Math.abs(textPreview.endY - textPreview.startY);
        if (w < 2 && h < 2) return null;
        // The preview's look is frozen at gesture start (`kind`) so it stays
        // correct while it lingers past the mouse-up mode switch.
        const previewKind = textPreview.kind ?? mode;
        if (previewKind === "note") {
          // Blocknote drag preview: the committed card is border-only, which
          // reads as a bare outline mid-drag — so draw a white card body
          // under the ink border while drawing.
          return (
            <div
              data-sb-overlay
              style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  transform: `translate(${renderVp.x}px, ${renderVp.y}px) scale(${renderVp.zoom})`,
                  transformOrigin: "0 0",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: w,
                    height: h,
                    border: "1px solid #1e1e2e",
                    boxSizing: "border-box",
                    background: "#fff",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                  }}
                />
              </div>
            </div>
          );
        }
        if (previewKind === "sticky") {
          // Render the REAL thing — a DOM sticky styled exactly like
          // StickyNoteBlock (color, radius, shadow). Tracks the RAW drag rect
          // so it grows naturally from under the cursor; the commit-time size
          // minimums are not previewed (a jump at drag start feels jarring).
          const pw = w;
          const ph = h;
          const fill = engine.activeTool.stickyColor ?? "#FEF3C7";
          return (
            <div
              data-sb-overlay
              style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  transform: `translate(${renderVp.x}px, ${renderVp.y}px) scale(${renderVp.zoom})`,
                  transformOrigin: "0 0",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: pw,
                    height: ph,
                    background: fill,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
                  }}
                />
              </div>
            </div>
          );
        }
        if (previewKind === "table") {
          const cols = Math.max(1, Math.min(12, Math.round(w / TABLE_CELL_W)));
          const rows = Math.max(1, Math.min(50, Math.round(h / TABLE_CELL_H)));
          const tw = cols * TABLE_CELL_W;
          const th = rows * TABLE_CELL_H;
          const opts = {
            stroke: "#1e1e2e",
            strokeWidth: 1.5,
            roughness: engine.activeTool.roughness ?? 1,
          };
          const paths = [
            ...getRoughRectPaths(x, y, tw, th, { ...opts, seed: "sb-table-preview:outer" }),
          ];
          for (let c = 1; c < cols; c++) {
            paths.push(
              ...getRoughLinePaths(x + c * TABLE_CELL_W, y, x + c * TABLE_CELL_W, y + th, {
                ...opts,
                seed: `sb-table-preview:c${c}`,
              }),
            );
          }
          for (let r = 1; r < rows; r++) {
            paths.push(
              ...getRoughLinePaths(x, y + r * TABLE_CELL_H, x + tw, y + r * TABLE_CELL_H, {
                ...opts,
                seed: `sb-table-preview:r${r}`,
              }),
            );
          }
          return (
            <svg
              data-sb-overlay
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            >
              <g transform={`translate(${renderVp.x}, ${renderVp.y}) scale(${renderVp.zoom})`}>
                {paths.map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    stroke={p.stroke}
                    strokeWidth={p.strokeWidth}
                    fill="none"
                    strokeDasharray={p.strokeDasharray}
                    strokeLinecap="round"
                  />
                ))}
              </g>
            </svg>
          );
        }
        return (
          <svg
            data-sb-overlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <g transform={`translate(${renderVp.x}, ${renderVp.y}) scale(${renderVp.zoom})`}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill="rgba(59,130,246,0.06)"
                stroke="#3b82f6"
                strokeWidth={1.5 / viewport.zoom}
                strokeDasharray={`${4 / viewport.zoom}`}
                rx={8 / viewport.zoom}
              />
            </g>
          </svg>
        );
      })()}

      {/* Word-level search highlights (screen-space yellow boxes) */}
      {searchTextRects.length > 0 && (
        <div
          data-sb-overlay
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          {searchTextRects.map((r, i) => (
            <div
              key={`search-text-rect-${i}`}
              style={{
                position: "absolute",
                left: r.x,
                top: r.y,
                width: r.w,
                height: r.h,
                borderRadius: 3,
                background: r.active ? "rgba(250, 204, 21, 0.62)" : "rgba(250, 204, 21, 0.44)",
                boxShadow: r.active ? "0 0 0 1px rgba(202, 138, 4, 0.85)" : "0 0 0 1px rgba(202, 138, 4, 0.45)",
              }}
            />
          ))}
        </div>
      )}

      {minimapVisible && (
        <Minimap
          engine={engine}
          nodes={nodes}
          viewport={viewport}
          containerSize={containerSize}
          measuredHeights={measuredHeights}
          bottomOffset={minimapBottomOffset}
          endOffset={minimapEndOffset}
        />
      )}

      {/* Right-click context menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          sections={contextMenu.sections}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Personal library name prompt */}
      {personalLibPrompt && (
        <PersonalLibraryPrompt
          nodes={personalLibPrompt.nodes}
          onSave={(name) => {
            addPersonalItem(name, personalLibPrompt.nodes, personalLibPrompt.groupParent);
            setPersonalLibPrompt(null);
          }}
          onCancel={() => setPersonalLibPrompt(null)}
        />
      )}
    </div>
    </PropertyHistoryCoalesceContext.Provider>
  );
}
