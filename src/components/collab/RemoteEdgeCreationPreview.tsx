import type { JSX } from "react";
import type { SpatialNode } from "../../engine/types";
import type { PortDirection } from "../../engine/data-flow-types";
import {
  arrowHeadPath,
  markerPathInset,
  insetEdgePathEnds,
  computeEdgePath,
  getPortPosition,
  nearestPerimeterPoint,
  nearestInteriorUV,
  INTERIOR_ANCHOR_BAND_PX,
  PORT_EDGE_SNAP_RADIUS_PX,
} from "../../engine/edge-geometry";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import { resolveNodePorts } from "../../nodes/registry";
import type { EdgeCreationAwareness } from "../../collab/edge-creation-awareness";

/**
 * Renders the same edge-creation preview as SVGLayer (snap, ports, path, arrowhead, dots).
 * Consumes awareness payload + live engine nodes/registry/measured heights.
 */
export function RemoteEdgeCreationPreview({
  preview,
  engine,
  zoom,
}: {
  preview: EdgeCreationAwareness;
  engine: SpatialEngine;
  zoom: number;
}): JSX.Element | null {
  const fromNode = engine.getNode(preview.fromNodeId);
  if (!fromNode) return null;

  const registry = engine.getRegistry();
  const nodes = engine.getAllNodes();
  const measuredHeights = engine.measuredHeights;

  const curX = preview.cursorX;
  const curY = preview.cursorY;
  const color = preview.edgeColor || "#3b82f6";
  const sw = preview.edgeStrokeWidth || 2;
  const style = preview.edgeStyle || "solid";
  const dashArr =
    style === "dashed" ? `${8 * sw},${4 * sw}` : style === "dotted" ? `${2 * sw},${3 * sw}` : undefined;
  const headSize = Math.max(8, sw * 3);
  const dotR = 4 / zoom;

  const edgePreview = {
    fromNode,
    cursorX: curX,
    cursorY: curY,
    sourceHandle: preview.sourceHandle,
    sourceT: preview.sourceT,
    sourcePort: preview.sourcePort,
    sourceDirection: preview.sourceDirection,
    edgeType: preview.edgeType,
    attachmentGap: preview.attachmentGap,
  };

  const fromDef = registry?.get(edgePreview.fromNode.type);
  const fromPorts = resolveNodePorts(fromDef, edgePreview.fromNode);
  const sourcePortPos =
    edgePreview.sourcePort && fromPorts
      ? getPortPosition(
          edgePreview.fromNode,
          fromPorts,
          edgePreview.sourcePort,
          zoom,
          measuredHeights,
          fromDef!.portAnchor ?? "bbox",
        ) ?? undefined
      : undefined;
  const sourcePortMeta =
    edgePreview.sourcePort && fromPorts
      ? fromPorts.find((p) => p.id === edgePreview.sourcePort)
      : undefined;

  const portSnapExpectedDir: PortDirection | null =
    edgePreview.sourceDirection === "output"
      ? "input"
      : edgePreview.sourceDirection === "input"
        ? "output"
        : null;

  let snapTargetNode: SpatialNode | null = null;
  let snapTargetT: number | undefined;
  let snapTargetPortId: string | null = null;

  if (registry && edgePreview.sourcePort && portSnapExpectedDir && sourcePortMeta) {
    const snapR = PORT_EDGE_SNAP_RADIUS_PX / zoom;
    let bestDist = Infinity;
    for (const n of nodes) {
      if (n.type === "edge" || n.id === edgePreview.fromNode.id) continue;
      const nDef = registry.get(n.type);
      const nPorts = resolveNodePorts(nDef, n);
      if (!nPorts?.length) continue;
      const portsOfDir = nPorts.filter((p) => p.direction === portSnapExpectedDir);
      for (const port of portsOfDir) {
        if (
          sourcePortMeta.dataType !== "any" &&
          port.dataType !== "any" &&
          sourcePortMeta.dataType !== port.dataType
        ) {
          continue;
        }
        const pos = getPortPosition(n, nPorts, port.id, zoom, measuredHeights, nDef!.portAnchor ?? "bbox");
        if (!pos) continue;
        const dist = Math.hypot(pos.x - curX, pos.y - curY);
        if (dist < snapR && dist < bestDist) {
          bestDist = dist;
          snapTargetNode = n;
          snapTargetPortId = port.id;
        }
      }
    }
  }

  if (!snapTargetPortId) {
    const snapThreshold = 50 / zoom;
    for (const n of nodes) {
      if (n.type === "edge" || n.id === edgePreview.fromNode.id) continue;
      const nh = n.h === "auto" ? (measuredHeights?.[n.id] ?? 100) : n.h;
      const padX = n.w * 0.2;
      const padY = nh * 0.2;
      if (
        curX >= n.x - padX &&
        curX <= n.x + n.w + padX &&
        curY >= n.y - padY &&
        curY <= n.y + nh + padY
      ) {
        const pp = nearestPerimeterPoint(n, curX, curY, measuredHeights);
        const borderDist = Math.hypot(pp.x - curX, pp.y - curY);
        // Deep inside → the local peer's drop anchors interior; keep the remote
        // preview glued to their cursor too (mirrors SVGLayer's gate).
        if (borderDist > INTERIOR_ANCHOR_BAND_PX / zoom) {
          const uv = nearestInteriorUV(n, curX, curY, measuredHeights);
          if (uv[0] > 0 && uv[0] < 1 && uv[1] > 0 && uv[1] < 1) break;
        }
        if (borderDist < snapThreshold) {
          snapTargetNode = n;
          snapTargetT = pp.t;
          break;
        }
      }
    }
  }

  const snapDef = snapTargetNode ? registry?.get(snapTargetNode.type) : undefined;
  const snapPorts = resolveNodePorts(snapDef, snapTargetNode ?? undefined);
  const targetPortPos =
    snapTargetNode && snapTargetPortId && snapPorts
      ? getPortPosition(
          snapTargetNode,
          snapPorts,
          snapTargetPortId,
          zoom,
          measuredHeights,
          snapDef!.portAnchor ?? "bbox",
        ) ?? undefined
      : undefined;

  const previewSourceT = sourcePortPos ? undefined : edgePreview.sourceT;
  const previewTargetT = targetPortPos ? undefined : snapTargetT;

  let previewPath;
  if (snapTargetNode) {
    previewPath = computeEdgePath(
      edgePreview.fromNode,
      snapTargetNode,
      edgePreview.edgeType || "bezier",
      measuredHeights,
      edgePreview.sourceHandle,
      undefined,
      undefined,
      undefined,
      sourcePortPos,
      targetPortPos,
      previewSourceT,
      previewTargetT,
      edgePreview.attachmentGap,
    );
  } else {
    const virtualTarget: SpatialNode = {
      id: "__preview__",
      type: "shape",
      x: curX,
      y: curY,
      w: 0,
      h: 0,
      z: 0,
      data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 },
    };
    previewPath = computeEdgePath(
      edgePreview.fromNode,
      virtualTarget,
      edgePreview.edgeType || "bezier",
      measuredHeights,
      edgePreview.sourceHandle,
      undefined,
      undefined,
      undefined,
      sourcePortPos,
      undefined,
      previewSourceT,
      undefined,
      edgePreview.attachmentGap,
    );
  }

  const showSourceDot = !sourcePortPos;
  const showTargetDot = Boolean(snapTargetNode && !targetPortPos);

  return (
    <g>
      <path
        d={insetEdgePathEnds(previewPath, 0, markerPathInset("arrow", headSize, sw))}
        stroke={color}
        strokeWidth={sw}
        strokeDasharray={dashArr}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={arrowHeadPath(previewPath.x2, previewPath.y2, previewPath.arrowAngle, headSize)}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showSourceDot && (
        <circle
          cx={previewPath.x1}
          cy={previewPath.y1}
          r={dotR}
          fill={color}
          stroke="white"
          strokeWidth={1.5 / zoom}
        />
      )}
      {showTargetDot && (
        <circle
          cx={previewPath.x2}
          cy={previewPath.y2}
          r={dotR}
          fill={color}
          stroke="white"
          strokeWidth={1.5 / zoom}
        />
      )}
    </g>
  );
}
