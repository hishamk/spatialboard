import { useEffect, useMemo, useRef } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../../nodes/registry";
import type { SpatialNode, EdgeNode, Viewport } from "../../../engine/types";
import { computeEdgePath } from "../../../engine/edge-geometry";
import { spatialPerf } from "../../../perf/spatial-perf";
import { hostNodeInScope } from "../canvas-helpers";

/**
 * Viewport culling / virtualization for large boards, extracted from SpatialCanvas.
 * Owns the QuadTree-backed `virtualizedView` memo plus the SVG-layer node
 * derivations and the perf-record + throttled-debug effects. Behaviour and every
 * dep array are preserved byte-for-byte; this memo is performance-load-bearing.
 */
export function useVirtualizedView({
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
}: {
  viewport: Viewport;
  containerSize: { w: number; h: number };
  nodes: SpatialNode[];
  selection: Set<string>;
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  measuredHeights: Record<string, number>;
  edgePreview: { cursorX: number; cursorY: number } | null;
  edgeReconnect: { cursorX: number; cursorY: number } | null;
  isNodeDragging: boolean;
  hostVisibleNodeIds: ReadonlySet<string> | null;
  singleFrameId?: string;
  overlayNodes: readonly SpatialNode[] | null;
}) {
  const virtualizedView = useMemo(() => {
    const t0 = performance.now();
    if (
      containerSize.w <= 0 ||
      containerSize.h <= 0
    )
      return null;

    const { zoom, x: vx, y: vy } = viewport;
    // Screen-space culling buffer (converted to canvas units) to prevent
    // high-zoom over-inclusion and low-zoom pop-in.
    const BUFFER_SCREEN_PX = 280;
    const buffer = Math.min(500, BUFFER_SCREEN_PX / Math.max(zoom, 0.1));
    const rect = {
      x: -vx / zoom - buffer,
      y: -vy / zoom - buffer,
      w: containerSize.w / zoom + buffer * 2,
      h: containerSize.h / zoom + buffer * 2,
    };

    // Use QuadTree for O(log N) query
    const inViewNodes = engine.getNodesInRect(rect);

    // Resolve latest references from the engine map (QuadTree can hold stale refs after data-only updates).
    const visibleMap = new Map<string, SpatialNode>();
    const visibleNodeIds = new Set<string>();
    const domVisibleNodeIds = new Set<string>();
    const visibleEdgeIds = new Set<string>();
    let seedVisibleNodes = 0;
    let nodesAddedByAdjacency = 0;
    let nodesAddedByEdgeEndpoints = 0;
    let edgesAddedByAdjacency = 0;
    let edgesAddedByCrossing = 0;
    const pushNode = (id: string, includeInDom = false) => {
      const latest = engine.getNode(id);
      if (!latest) return;
      const alreadyVisible = visibleMap.has(latest.id);
      visibleMap.set(latest.id, latest);
      if (latest.type === "edge") visibleEdgeIds.add(latest.id);
      else {
        if (!alreadyVisible) visibleNodeIds.add(latest.id);
        if (includeInDom) domVisibleNodeIds.add(latest.id);
      }
    };

    for (const n of inViewNodes) {
      const before = domVisibleNodeIds.size;
      pushNode(n.id, true);
      if (domVisibleNodeIds.size > before) seedVisibleNodes += 1;
    }

    // Keep selected nodes/edges visible even if off-screen.
    for (const id of selection) {
      pushNode(id, true);
    }

    // If connecting/reconnecting edges, keep nearby potential targets visible.
    const liveCursor = edgeReconnect
      ? { x: edgeReconnect.cursorX, y: edgeReconnect.cursorY }
      : edgePreview
        ? { x: edgePreview.cursorX, y: edgePreview.cursorY }
        : null;
    if (liveCursor) {
      const snapRadius = 200 / Math.max(0.2, viewport.zoom);
      const nearby = engine.getNodesInRect({
        x: liveCursor.x - snapRadius,
        y: liveCursor.y - snapRadius,
        w: snapRadius * 2,
        h: snapRadius * 2,
      });
      for (const n of nearby) {
        if (n.type !== "edge") pushNode(n.id, true);
      }
    }

    // Include connected edges for initially visible nodes via adjacency (fast path).
    // IMPORTANT: iterate a snapshot so adding endpoint nodes below does not
    // recursively expand through the whole connected component.
    const adjacencySeedNodeIds = Array.from(domVisibleNodeIds);
    for (const nodeId of adjacencySeedNodeIds) {
      const connectedEdges = engine.getEdgesForNode(nodeId);
      for (const edge of connectedEdges) {
        const edgeData = (edge as EdgeNode).data;
        const wasEdgeVisible = visibleEdgeIds.has(edge.id);
        visibleMap.set(edge.id, edge);
        visibleEdgeIds.add(edge.id);
        if (!wasEdgeVisible) edgesAddedByAdjacency += 1;
        const beforeFrom = visibleNodeIds.size;
        pushNode(edgeData.fromId, false);
        if (visibleNodeIds.size > beforeFrom) nodesAddedByAdjacency += 1;
        const beforeTo = visibleNodeIds.size;
        pushNode(edgeData.toId, false);
        if (visibleNodeIds.size > beforeTo) nodesAddedByAdjacency += 1;
      }
    }

    // Fallback: include long crossing edges whose endpoints are both off-screen.
    // During active node drag, skip this expensive pass to prioritize interaction FPS.
    if (!isNodeDragging) {
      for (const n of nodes) {
        if (n.type !== "edge") continue;
        if (visibleEdgeIds.has(n.id)) continue;
        const data = (n as EdgeNode).data;
        const from = engine.getNode(data.fromId);
        const to = engine.getNode(data.toId);
        if (!from || !to) continue;
        let include = domVisibleNodeIds.has(data.fromId) || domVisibleNodeIds.has(data.toId);
        if (!include) {
          // Use actual path bounds (bezier/step/smoothstep aware) instead of a
          // straight-line endpoint check, so curved edges do not disappear at high zoom.
          const path = computeEdgePath(
            from,
            to,
            data.edgeType || "bezier",
            measuredHeights,
            data.sourceHandle,
            data.targetHandle,
            data.midpointOffset,
            data.curveOffset,
            undefined, undefined,
            data.sourceT,
            data.targetT,
            data.attachmentGap,
          );
          include =
            path.bounds.x < rect.x + rect.w &&
            path.bounds.x + path.bounds.w > rect.x &&
            path.bounds.y < rect.y + rect.h &&
            path.bounds.y + path.bounds.h > rect.y;
        }
        if (include) {
          visibleMap.set(n.id, n);
          visibleEdgeIds.add(n.id);
          edgesAddedByCrossing += 1;
          // Ensure both endpoints are present for edge rendering.
          const beforeFrom = visibleNodeIds.size;
          pushNode(from.id, false);
          if (visibleNodeIds.size > beforeFrom) nodesAddedByEdgeEndpoints += 1;
          const beforeTo = visibleNodeIds.size;
          pushNode(to.id, false);
          if (visibleNodeIds.size > beforeTo) nodesAddedByEdgeEndpoints += 1;
        }
      }
    }

    const source = Array.from(visibleMap.values());
    const domNodes = source.filter((n) => {
      if (n.type === "edge") return false;
      if (!domVisibleNodeIds.has(n.id)) return false;
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

    return {
      domNodes,
      svgNodes: source,
      visibleNodeCount: domVisibleNodeIds.size,
      visibleEdgeCount: visibleEdgeIds.size,
      seedVisibleNodes,
      nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency,
      edgesAddedByCrossing,
      cullingMs: performance.now() - t0,
    };
  }, [viewport, containerSize, nodes, selection, engine, registry, measuredHeights, edgePreview, edgeReconnect, isNodeDragging]);

  // Keep edges fully reliable by default; while actively dragging nodes, use
  // virtualized SVG set for smoother interaction on very large boards.
  // When singleFrameId is set, pre-compute visible node IDs for SVG layer filtering
  const _singleFrameIds = useMemo(() => {
    if (!singleFrameId) return null;
    const ids = new Set<string>();
    ids.add(singleFrameId);
    const descendants = engine.getFrameDescendantIds(singleFrameId);
    for (const id of descendants) ids.add(id);
    return ids;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleFrameId, engine, nodes]);

  const svgLayerNodesRaw = isNodeDragging ? (virtualizedView?.svgNodes ?? nodes) : nodes;
  // Apply single-frame filter to SVG layer too
  const svgLayerNodesFramed = _singleFrameIds
    ? svgLayerNodesRaw.filter(n => _singleFrameIds.has(n.id))
    : svgLayerNodesRaw;
  // Host render-scope filter (loop sub-canvas): a non-edge node renders iff it is
  // in the scope; an EDGE renders iff BOTH endpoints are in the scope (so a
  // boundary edge to a hidden node is naturally hidden). null = render all.
  const svgLayerNodesScoped = hostVisibleNodeIds
    ? svgLayerNodesFramed.filter((n) => hostNodeInScope(n, hostVisibleNodeIds))
    : svgLayerNodesFramed;
  // Ephemeral overlay nodes (cards + edges) are appended UNCONDITIONALLY (they
  // bypass the scope filter — they ARE the frame). SVGLayer resolves edge/port
  // endpoints from this merged list (nodeMap), so a synthetic edge to a real body
  // node renders natively even though the synthetic node isn't in the engine.
  const svgLayerNodes = overlayNodes && overlayNodes.length
    ? [...svgLayerNodesScoped, ...overlayNodes]
    : svgLayerNodesScoped;

  useEffect(() => {
    if (!spatialPerf.isEnabled()) return;
    const totalEdges = nodes.reduce((acc, n) => acc + (n.type === "edge" ? 1 : 0), 0);
    const totalNonEdges = nodes.length - totalEdges;
    spatialPerf.recordCulling(virtualizedView?.cullingMs ?? 0);
    spatialPerf.setVisibilityCounts({
      visibleNodes: virtualizedView?.visibleNodeCount ?? totalNonEdges,
      totalNodes: totalNonEdges,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: totalEdges,
      totalEdges,
      virtualizationActive: !!virtualizedView,
      seedVisibleNodes: virtualizedView?.seedVisibleNodes ?? totalNonEdges,
      nodesAddedByAdjacency: virtualizedView?.nodesAddedByAdjacency ?? 0,
      nodesAddedByEdgeEndpoints: virtualizedView?.nodesAddedByEdgeEndpoints ?? 0,
      edgesAddedByAdjacency: virtualizedView?.edgesAddedByAdjacency ?? 0,
      edgesAddedByCrossing: virtualizedView?.edgesAddedByCrossing ?? 0,
    });
  }, [nodes, virtualizedView]);

  const perfDebugLogRef = useRef(0);
  useEffect(() => {
    if (!spatialPerf.isEnabled()) return;
    if (!virtualizedView) return;
    const now = performance.now();
    if (now - perfDebugLogRef.current < 1000) return;
    perfDebugLogRef.current = now;
    const totalEdges = nodes.reduce((acc, n) => acc + (n.type === "edge" ? 1 : 0), 0);
    const totalNonEdges = nodes.length - totalEdges;
    // Throttled debug output to diagnose culling/virtualization decisions.
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: virtualizedView.visibleNodeCount,
      totalNodes: totalNonEdges,
      visibleEdges: virtualizedView.visibleEdgeCount,
      totalEdges,
      seedVisibleNodes: virtualizedView.seedVisibleNodes,
      nodesAddedByAdjacency: virtualizedView.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: virtualizedView.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: virtualizedView.edgesAddedByAdjacency,
      edgesAddedByCrossing: virtualizedView.edgesAddedByCrossing,
      cullingMs: virtualizedView.cullingMs,
    });
  }, [nodes, virtualizedView, viewport]);

  return { virtualizedView, svgLayerNodes, _singleFrameIds };
}
