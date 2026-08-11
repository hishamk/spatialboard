import { useCallback, useMemo } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../../nodes/registry";
import { resolveNodePorts } from "../../../nodes/registry";
import type { SpatialNode, EdgeNode, Viewport } from "../../../engine/types";
import { computeEdgeEndpoints, getPortPosition } from "../../../engine/edge-geometry";
import type { PortPositionResolver } from "../../../engine/edge-geometry";
import { pointInPolygon } from "../canvas-helpers";
import { SEL_PAD } from "../node-item-context";
import { useSBI18n } from "../../contexts/LocalizationContext";

/**
 * Pure canvas geometry + selection-bounds derivations for SpatialCanvas.
 * Every member is a pure function of engine/registry/viewport/measuredHeights/
 * selection/nodes/activeGroupId (no gesture or editing state).
 */
export function useCanvasGeometry({
  engine,
  registry,
  viewport,
  measuredHeights,
  selection,
  nodes,
  activeGroupId,
}: {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  viewport: Viewport;
  measuredHeights: Record<string, number>;
  selection: Set<string>;
  nodes: SpatialNode[];
  activeGroupId: string | null;
}) {
  const { labels } = useSBI18n();

  const resolvePortPositions = useCallback<PortPositionResolver>(
    (edge, fromNode, toNode) => {
      let sourcePortPos: { x: number; y: number } | undefined;
      let targetPortPos: { x: number; y: number } | undefined;
      if (registry && edge.data.sourcePort) {
        const srcDef = registry.get(fromNode.type);
        const srcPorts = resolveNodePorts(srcDef, fromNode);
        if (srcPorts) {
          sourcePortPos = getPortPosition(fromNode, srcPorts, edge.data.sourcePort, viewport.zoom, measuredHeights, srcDef!.portAnchor ?? "bbox") ?? undefined;
        }
      }
      if (registry && edge.data.targetPort) {
        const tgtDef = registry.get(toNode.type);
        const tgtPorts = resolveNodePorts(tgtDef, toNode);
        if (tgtPorts) {
          targetPortPos = getPortPosition(toNode, tgtPorts, edge.data.targetPort, viewport.zoom, measuredHeights, tgtDef!.portAnchor ?? "bbox") ?? undefined;
        }
      }
      return { sourcePortPos, targetPortPos };
    },
    [registry, viewport.zoom, measuredHeights]
  );

  const handleZoomToNode = useCallback(
    (nodeId: string) => engine.zoomToNode(nodeId),
    [engine, labels]
  );

  // Compute AABB of a node, accounting for rotation (axis-aligned box that fully contains the rotated rect)
  const getNodeAABB = useCallback(
    (n: SpatialNode, h: number) => {
      if (!n.rotation) {
        return { minX: n.x, minY: n.y, maxX: n.x + n.w, maxY: n.y + h };
      }
      const cx = n.x + n.w / 2;
      const cy = n.y + h / 2;
      const θ = (n.rotation * Math.PI) / 180;
      const cos = Math.cos(θ);
      const sin = Math.sin(θ);
      const corners = [
        [n.w / 2, h / 2],
        [-n.w / 2, h / 2],
        [-n.w / 2, -h / 2],
        [n.w / 2, -h / 2],
      ];
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const [rx, ry] of corners) {
        const wx = cx + rx * cos - ry * sin;
        const wy = cy + rx * sin + ry * cos;
        minX = Math.min(minX, wx);
        minY = Math.min(minY, wy);
        maxX = Math.max(maxX, wx);
        maxY = Math.max(maxY, wy);
      }
      return { minX, minY, maxX, maxY };
    },
    []
  );

  // Padding to fully encompass rotated items, borders, shadows, and strokes
  // (SEL_PAD hoisted to module scope for SelectionChromeOverlay)

  // Marquee hit uses proper AABBs (rotation) + tolerance so "a bit on" selects
  const getNodesInMarqueeRect = useCallback(
    (
      rect: { x: number; y: number; w: number; h: number },
      nodeList: SpatialNode[]
    ): SpatialNode[] => {
      return nodeList.filter((n) => {
        if (n.type === "edge") {
          const data = (n as EdgeNode).data;
          const from = engine.getNode(data.fromId);
          const to = engine.getNode(data.toId);
          if (!from || !to) return false;
          // Both endpoints must be inside the marquee
          const { x1, y1, x2, y2 } = computeEdgeEndpoints(from, to, measuredHeights);
          return (
            x1 >= rect.x && x1 <= rect.x + rect.w &&
            y1 >= rect.y && y1 <= rect.y + rect.h &&
            x2 >= rect.x && x2 <= rect.x + rect.w &&
            y2 >= rect.y && y2 <= rect.y + rect.h
          );
        }
        const h =
          n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
        const aabb = getNodeAABB(n, h);
        // Node must be fully contained within the marquee
        return (
          aabb.minX >= rect.x &&
          aabb.maxX <= rect.x + rect.w &&
          aabb.minY >= rect.y &&
          aabb.maxY <= rect.y + rect.h
        );
      });
    },
    [getNodeAABB, measuredHeights]
  );

  const getNodesInLassoPolygon = useCallback(
    (polygon: Array<[number, number]>, nodeList: SpatialNode[]): SpatialNode[] => {
      if (polygon.length < 3) return [];
      return nodeList.filter((n) => {
        if (n.type === "edge") {
          const edge = n as EdgeNode;
          const from = engine.getNode(edge.data.fromId);
          const to = engine.getNode(edge.data.toId);
          if (!from || !to) return false;
          const { x1, y1, x2, y2 } = computeEdgeEndpoints(from, to, measuredHeights);
          return pointInPolygon(x1, y1, polygon) && pointInPolygon(x2, y2, polygon);
        }
        const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
        const cx = n.x + n.w / 2;
        const cy = n.y + h / 2;
        return pointInPolygon(cx, cy, polygon);
      });
    },
    [engine, measuredHeights]
  );

  // Unified bounding box for multi-selection (uses measured heights + rotation)
  const selBounds = useMemo(() => {
    if (selection.size < 2) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const id of selection) {
      const n = nodes.find((nd) => nd.id === id);
      if (!n || n.type === "edge") continue;
      const h =
        n.h === "auto"
          ? (measuredHeights[n.id] ?? 100)
          : (n.h as number);
      const aabb = getNodeAABB(n, h);
      minX = Math.min(minX, aabb.minX);
      minY = Math.min(minY, aabb.minY);
      maxX = Math.max(maxX, aabb.maxX);
      maxY = Math.max(maxY, aabb.maxY);
    }
    if (minX === Infinity) return null;
    return {
      x: minX - SEL_PAD,
      y: minY - SEL_PAD,
      w: maxX - minX + SEL_PAD * 2,
      h: maxY - minY + SEL_PAD * 2,
    };
  }, [selection, nodes, measuredHeights, getNodeAABB]);

  // Bounding box for the active (entered) group — dashed indicator
  const activeGroupBounds = useMemo(() => {
    if (!activeGroupId) return null;
    const members = engine.getAllGroupDescendantNodes(activeGroupId);
    if (members.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of members) {
      if (n.type === "edge") continue;
      const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
      const aabb = getNodeAABB(n, h);
      minX = Math.min(minX, aabb.minX);
      minY = Math.min(minY, aabb.minY);
      maxX = Math.max(maxX, aabb.maxX);
      maxY = Math.max(maxY, aabb.maxY);
    }
    if (minX === Infinity) return null;
    const pad = 8;
    return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
  }, [activeGroupId, nodes, measuredHeights, getNodeAABB, engine]);

  return {
    resolvePortPositions,
    getNodeAABB,
    getNodesInMarqueeRect,
    getNodesInLassoPolygon,
    handleZoomToNode,
    selBounds,
    activeGroupBounds,
  };
}
