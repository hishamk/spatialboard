import { useCallback } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { nanoid } from "nanoid";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type {
  SpatialNode,
  HandleSide,
  EdgeNode,
  EdgeType,
  DrawNode,
  ShapeNode,
  TextNode,
  FrameNode,
  StrokeStyle,
} from "../../../engine/types";
import type { PortDirection } from "../../../engine/data-flow-types";
import type { NodeTypeRegistry } from "../../../nodes/registry";
import { resolveNodePorts } from "../../../nodes/registry";
import { applyCornerAspectLock } from "../../../interactions/resize-aspect";
import { getPreset, getAspectRatio } from "../../sidebar/devicePresets";
import {
  nearestHandle,
  getPortPosition,
  PORT_EDGE_SNAP_RADIUS_PX,
  nearestPerimeterPoint,
  nearestInteriorUV,
  INTERIOR_ANCHOR_BAND_PX,
  computeEdgePath,
} from "../../../engine/edge-geometry";
import { isExactEdgeConnectionDuplicate } from "../canvas-helpers";
import { SEL_PAD } from "../node-item-context";
import type { HandlePosition } from "../SVGLayer";

/** Edge-creation preview payload. State lives in SpatialCanvas; the setter is
 *  passed in so these transform handlers can drive the rubber-band preview. */
export type EdgePreviewState = {
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
};

/** Edge-reconnect drag payload. State lives in SpatialCanvas; setter passed in. */
export type EdgeReconnectState = {
  edgeId: string;
  endpoint: "source" | "target";
  anchorNodeId: string;
  anchorHandle: HandleSide | undefined;
  cursorX: number;
  cursorY: number;
};

/** Active group-rotation visual box. State lives in SpatialCanvas; setter passed in. */
export type GroupRotationState = {
  angle: number;
  cx: number;
  cy: number;
  bounds: { x: number; y: number; w: number; h: number };
};

/**
 * The nine transform / handle interaction handlers extracted from SpatialCanvas.
 *
 * Pure mechanical extraction — every handler's body, guard order, ref usage and
 * `useCallback` dependency array is preserved byte-for-byte from the original
 * component so the shared `nodeItemCtx` identity (which lists
 * `handleResizeHandleDown`) and every LiveSVGLayerHost / SelectionChromeOverlay
 * wiring behaves identically. The edge-preview / edge-reconnect / group-rotation
 * state atoms remain declared in SpatialCanvas; only their setters are threaded
 * in here.
 */
export function useNodeTransforms({
  engine,
  registry,
  measuredHeights,
  getNodeAABB,
  onPortConnectEmpty,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  portConnectHold,
  containerRef,
  setEdgePreview,
  setEdgeReconnect,
  setGroupRotation,
}: {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  measuredHeights: Record<string, number>;
  getNodeAABB: (
    n: SpatialNode,
    h: number,
  ) => { minX: number; minY: number; maxX: number; maxY: number };
  onPortConnectEmpty?: (event: {
    nodeId: string;
    portId: string;
    direction: PortDirection;
    canvasX: number;
    canvasY: number;
    clientX: number;
    clientY: number;
  }) => void;
  /** Wired through from SpatialCanvas; the hold-clear effect lives in the
   *  component, not here — kept in the signature so the data dependency the
   *  handlers document (`portConnectHold`) is threaded explicitly. */
  portConnectHold?: boolean;
  containerRef: RefObject<HTMLDivElement>;
  setEdgePreview: Dispatch<SetStateAction<EdgePreviewState | null>>;
  setEdgeReconnect: Dispatch<SetStateAction<EdgeReconnectState | null>>;
  setGroupRotation: Dispatch<SetStateAction<GroupRotationState | null>>;
}) {
  /** Get the ownerDocument of the canvas container (supports pop-out windows). */
  const ownerDoc = () => containerRef.current?.ownerDocument ?? document;

  const handleResizeHandleDown = useCallback(
    (
      nodeId: string,
      handle: HandlePosition,
      e: React.PointerEvent<SVGRectElement | HTMLElement>
    ) => {
      e.preventDefault();
      if (engine.presentationMode) return;
      const node = engine.getNode(nodeId);
      if (!node || node.locked) return;
      if (registry?.get(node.type)?.resizable === false) return;

      const startScreenX = e.clientX;
      const startScreenY = e.clientY;
      const origX = node.x;
      const origY = node.y;
      const origW = node.w;
      const isAutoH = node.h === "auto";
      const origH = isAutoH ? (measuredHeights[nodeId] ?? 100) : (node.h as number);

      // Save original points for proportional scaling of draw nodes
      const origPoints =
        node.type === "draw"
          ? (node as DrawNode).data.points.map(
            (p) => [...p] as [number, number, number]
          )
          : null;

      // Save original endpoints for proportional scaling of line/arrow shapes
      const origStartPoint =
        node.type === "shape" ? (node as ShapeNode).data.startPoint : undefined;
      const origEndPoint =
        node.type === "shape" ? (node as ShapeNode).data.endPoint : undefined;

      // Save original font size for proportional scaling of text nodes
      const origFontSize =
        node.type === "text" ? (node as TextNode).data.fontSize : 0;

      let historyPushed = false;

      const onMove = (me: PointerEvent) => {
        const dx = (me.clientX - startScreenX) / engine.viewport.zoom;
        const dy = (me.clientY - startScreenY) / engine.viewport.zoom;

        if (!historyPushed) {
          historyPushed = true;
          engine.pushHistorySnapshot();
          engine.beginNodeGesture([nodeId], "transform");
        }

        let newX = origX;
        let newY = origY;
        let newW = origW;
        let newH = origH;

        // Adjust bounds based on which handle is being dragged
        if (handle === "nw" || handle === "w" || handle === "sw") {
          newX = origX + dx;
          newW = origW - dx;
        }
        if (handle === "ne" || handle === "e" || handle === "se") {
          newW = origW + dx;
        }
        if (handle === "nw" || handle === "n" || handle === "ne") {
          newY = origY + dy;
          newH = origH - dy;
        }
        if (handle === "sw" || handle === "s" || handle === "se") {
          newH = origH + dy;
        }

        // Snap edges to grid (Cmd/Ctrl bypasses snap)
        if (engine.snapToGrid && !(me.metaKey || me.ctrlKey)) {
          const g = engine.gridSize;
          const snapVal = (v: number) => Math.round(v / g) * g;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = snapVal(newX);
            newW = origX + origW - newX;
          }
          if (handle === "ne" || handle === "e" || handle === "se") {
            newW = snapVal(newX + newW) - newX;
          }
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = snapVal(newY);
            newH = origY + origH - newY;
          }
          if (handle === "sw" || handle === "s" || handle === "se") {
            newH = snapVal(newY + newH) - newY;
          }
        }

        // Enforce minimum size
        const minW = 10;
        const minH = 10;
        if (newW < minW) {
          newW = minW;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = origX + origW - minW;
          }
        }
        if (newH < minH) {
          newH = minH;
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = origY + origH - minH;
          }
        }

        // Shift + corner: lock aspect to size at resize start (⌘/⌃ only affects grid snap above).
        // Frames with a device preset already follow fixed ratio below.
        if (
          me.shiftKey &&
          !(
            node.type === "frame" &&
            (node as FrameNode).data.devicePreset
          )
        ) {
          const locked = applyCornerAspectLock(
            handle,
            origX,
            origY,
            origW,
            origH,
            newX,
            newY,
            newW,
            newH,
          );
          newX = locked.x;
          newY = locked.y;
          newW = locked.w;
          newH = locked.h;
        }

        // Enforce device-preset aspect ratio for frames
        if (node.type === "frame") {
          const presetKey = (node as FrameNode).data.devicePreset;
          if (presetKey) {
            const preset = getPreset(presetKey);
            if (preset) {
              const ratio = getAspectRatio(preset);
              const isCorner = handle === "nw" || handle === "ne" || handle === "sw" || handle === "se";
              const isHorizontal = handle === "e" || handle === "w";

              if (isCorner || isHorizontal) {
                // Width drives height
                const desiredH = Math.round(newW / ratio);
                if (handle === "nw" || handle === "ne") {
                  newY = origY + origH - desiredH;
                }
                newH = desiredH;
              } else {
                // Vertical handles (n/s): height drives width
                const desiredW = Math.round(newH * ratio);
                newW = desiredW;
              }
            }
          }
        }

        const patch: Partial<SpatialNode> = {
          x: newX,
          y: newY,
          w: newW,
          h: isAutoH ? ("auto" as const) : newH,
        };

        // Scale draw node points proportionally
        if (origPoints && node.type === "draw") {
          const scaleX = origW > 0 ? newW / origW : 1;
          const scaleY = origH > 0 ? newH / origH : 1;
          const scaledPoints = origPoints.map(
            ([px, py, p]) =>
              [px * scaleX, py * scaleY, p] as [number, number, number]
          );
          patch.data = { ...(node as DrawNode).data, points: scaledPoints };
        }

        // Scale line/arrow endpoints proportionally
        if (node.type === "shape" && (origStartPoint || origEndPoint)) {
          const scaleX = origW > 0 ? newW / origW : 1;
          const scaleY = origH > 0 ? newH / origH : 1;
          const shapeData = { ...(node as ShapeNode).data };
          if (origStartPoint) {
            shapeData.startPoint = [
              origStartPoint[0] * scaleX,
              origStartPoint[1] * scaleY,
            ];
          }
          if (origEndPoint) {
            shapeData.endPoint = [
              origEndPoint[0] * scaleX,
              origEndPoint[1] * scaleY,
            ];
          }
          patch.data = shapeData;
        }

        // Scale text node font size proportionally (only for corner/vertical handles,
        // not for e/w which just reflow text within a new width)
        if (node.type === "text" && origFontSize > 0 && handle !== "e" && handle !== "w") {
          const scale = (handle === "n" || handle === "s")
            ? (origH > 0 ? newH / origH : 1)
            : (origW > 0 ? newW / origW : 1);
          const newFontSize = Math.max(8, Math.round(origFontSize * scale));
          patch.data = { ...(node as TextNode).data, fontSize: newFontSize };
        }

        engine.updateNode(nodeId, patch);
      };

      const onUp = () => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        // If a frame was resized, sync children (remove outside, add newly inside)
        if (engine.isContainerType(node.type)) {
          engine.syncFrameChildrenAfterResize(nodeId);
        }
        engine.endNodeGesture();
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights, registry]
  );

  // Rotation handler for SVG nodes (draw/shape)
  const handleRotateStart = useCallback(
    (nodeId: string, e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const node = engine.getNode(nodeId);
      if (!node || node.locked) return;
      if (registry?.get(node.type)?.rotatable === false) return;

      const h = node.h === "auto" ? (measuredHeights[nodeId] ?? 100) : (node.h as number);
      const centerX = node.x + node.w / 2;
      const centerY = node.y + h / 2;
      const initialRotation = node.rotation || 0;

      const { x: startCx, y: startCy } = engine.screenToCanvas(
        e.clientX,
        e.clientY
      );
      const startAngle = Math.atan2(startCy - centerY, startCx - centerX);

      let historyPushed = false;

      const onMove = (me: PointerEvent) => {
        if (!historyPushed) {
          historyPushed = true;
          engine.pushHistorySnapshot();
          engine.beginNodeGesture([nodeId], "transform");
        }
        const { x: cx, y: cy } = engine.screenToCanvas(me.clientX, me.clientY);
        const currentAngle = Math.atan2(cy - centerY, cx - centerX);
        let rotation =
          initialRotation + (currentAngle - startAngle) * (180 / Math.PI);

        if ((me.shiftKey || engine.snapToGrid) && !(me.metaKey || me.ctrlKey)) {
          rotation = Math.round(rotation / 15) * 15;
        }

        engine.updateNode(nodeId, { rotation });
      };
      const onUp = () => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        engine.endNodeGesture();
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights, registry]
  );

  // Connection handle handler — drag from a handle to create an edge from any mode
  const handleConnectionHandleDown = useCallback(
    (nodeId: string, side: HandleSide, e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const sourceNode = engine.getNode(nodeId);
      if (!sourceNode) return;

      const { x: startCX, y: startCY } = engine.screenToCanvas(e.clientX, e.clientY);
      const isFreeForm = engine.freeFormEdges;
      const sourceT = isFreeForm ? nearestPerimeterPoint(sourceNode, startCX, startCY, measuredHeights).t : undefined;
      setEdgePreview({
        fromNode: sourceNode, cursorX: startCX, cursorY: startCY,
        sourceHandle: isFreeForm ? undefined : side,
        sourceT,
        edgeColor: engine.activeTool.color,
        edgeStrokeWidth: engine.activeTool.width || 2,
        edgeStyle: (engine.activeTool.strokeStyle as StrokeStyle) || "solid",
        edgeType: engine.activeTool.edgeType,
        attachmentGap: engine.activeTool.attachmentGap,
      });

      const onMove = (me: PointerEvent) => {
        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        setEdgePreview((prev) =>
          prev ? { ...prev, cursorX: x, cursorY: y } : null
        );
      };
      const onUp = (me: PointerEvent) => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        setEdgePreview(null);

        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        let targetNode = engine.hitTest(x, y, measuredHeights);

        // Fallback: find nearest node by perimeter distance.
        // Runs when hitTest missed or hit a frame (prefer children over frame).
        if (!targetNode || targetNode.type === "edge" || engine.isContainerType(targetNode.type)) {
          const snapThreshold = 50 / engine.viewport.zoom;
          let bestDist = Infinity;
          let bestIsFrame = false;
          let bestNode: SpatialNode | null = null;
          for (const n of engine.getAllNodes()) {
            if (n.type === "edge" || n.id === sourceNode.id) continue;
            const isFrame = engine.isContainerType(n.type);
            const pp = nearestPerimeterPoint(n, x, y, measuredHeights);
            const dist = Math.hypot(pp.x - x, pp.y - y);
            if (dist >= snapThreshold) continue;
            if (isFrame && !bestIsFrame && bestNode) continue;
            if ((!isFrame && bestIsFrame) || dist < bestDist) {
              bestDist = dist;
              bestIsFrame = isFrame;
              bestNode = n;
            }
          }
          if (bestNode) targetNode = bestNode;
        }

        if (
          !targetNode ||
          targetNode.type === "edge" ||
          targetNode.id === sourceNode.id
        )
          return;

        // Drops DEEP inside the target (beyond the border band) anchor at that
        // interior [u,v] point; near the border they snap to the perimeter.
        const targetHandle = isFreeForm ? undefined : nearestHandle(targetNode, x, y, measuredHeights);
        let targetT: number | [number, number] | undefined;
        if (isFreeForm) {
          const pp = nearestPerimeterPoint(targetNode, x, y, measuredHeights);
          targetT = pp.t;
          if (Math.hypot(pp.x - x, pp.y - y) > INTERIOR_ANCHOR_BAND_PX / engine.viewport.zoom) {
            const uv = nearestInteriorUV(targetNode, x, y, measuredHeights);
            if (uv[0] > 0 && uv[0] < 1 && uv[1] > 0 && uv[1] < 1) targetT = uv;
          }
        }
        // Allow parallel edges between the same nodes, but block exact duplicates.
        const duplicate = engine.getAllNodes().some((n) => {
          if (n.type !== "edge") return false;
          const ed = (n as EdgeNode).data;
          if (isFreeForm) {
            // Near-match dedupe applies to perimeter Ts only — interior [u,v]
            // drops are deliberate placements, so duplicates are allowed.
            if (typeof targetT !== "number") return false;
            return ed.fromId === sourceNode.id && ed.toId === targetNode.id &&
              typeof ed.sourceT === "number" && typeof ed.targetT === "number" &&
              Math.abs(ed.sourceT - sourceT!) < 0.02 && Math.abs(ed.targetT - targetT) < 0.02;
          }
          return isExactEdgeConnectionDuplicate(ed, {
            fromId: sourceNode.id,
            toId: targetNode.id,
            sourceHandle: side,
            targetHandle: targetHandle!,
          });
        });
        if (duplicate) return;

        const edgeNode: EdgeNode = {
          id: nanoid(10),
          type: "edge",
          x: 0, y: 0, w: 0, h: 0, z: engine.nextZ(),
          data: {
            fromId: sourceNode.id,
            toId: targetNode.id,
            style: (engine.activeTool.strokeStyle as StrokeStyle) || "solid",
            color: engine.activeTool.color,
            strokeWidth: engine.activeTool.width || 2,
            arrowHead: engine.activeTool.arrowHead ?? "arrow",
            arrowTail: engine.activeTool.arrowTail ?? "none",
            edgeType: engine.activeTool.edgeType ?? "bezier",
            roughness: engine.activeTool.roughness ?? 0,
            attachmentGap: engine.activeTool.attachmentGap,
            sourceHandle: isFreeForm ? undefined : side,
            targetHandle,
            sourceT,
            targetT,
          },
        };
        engine.addNode(edgeNode);
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights]
  );

  // Find the nearest selected node for a given side of the multi-selection bounding box
  const findNearestNodeForSide = useCallback(
    (side: HandleSide): string | null => {
      let bestId: string | null = null;
      let bestVal = side === "top" || side === "left" ? Infinity : -Infinity;
      for (const id of engine.selection) {
        const n = engine.getNode(id);
        if (!n || n.type === "edge") continue;
        const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
        let val: number;
        switch (side) {
          case "top": val = n.y; break;
          case "bottom": val = n.y + h; break;
          case "left": val = n.x; break;
          case "right": val = n.x + n.w; break;
        }
        if ((side === "top" || side === "left") ? val < bestVal : val > bestVal) {
          bestVal = val;
          bestId = id;
        }
      }
      return bestId;
    },
    [engine, measuredHeights]
  );

  // Port handle drag — create port-aware edges between nodes with data-flow ports
  const handlePortHandleDown = useCallback(
    (nodeId: string, portId: string, direction: PortDirection, e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const sourceNode = engine.getNode(nodeId);
      if (!sourceNode || !registry) return;

      const sourceDef = registry.get(sourceNode.type);
      const sourcePort = resolveNodePorts(sourceDef, sourceNode)?.find((p) => p.id === portId);
      if (!sourcePort) return;

      // Determine which side the port is on (inputs=left, outputs=right)
      const sourceHandle: HandleSide = direction === "input" ? "left" : "right";

      const { x: startCX, y: startCY } = engine.screenToCanvas(e.clientX, e.clientY);
      // Match the edges `createEdge` writes on drop — not the pen/draw activeTool
      // (defaults are #1e1e2e / width 3, which make the rubber-band look alien).
      setEdgePreview({
        fromNode: sourceNode,
        cursorX: startCX,
        cursorY: startCY,
        sourceHandle,
        sourcePort: portId,
        sourceDirection: direction,
        edgeColor: "#6b7280",
        edgeStrokeWidth: 1.5,
        edgeStyle: "solid",
        edgeType: "bezier",
      });

      const onMove = (me: PointerEvent) => {
        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        setEdgePreview((prev) =>
          prev ? { ...prev, cursorX: x, cursorY: y } : null
        );
      };

      const onUp = (me: PointerEvent) => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);

        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        const expectedDir = direction === "output" ? "input" : "output";
        const portSnapThreshold = PORT_EDGE_SNAP_RADIUS_PX / engine.viewport.zoom;

        // Port-aware target finding: scan ALL nodes with compatible ports
        // and find the nearest port circle to the cursor.
        // This is needed because port circles are offset outside the node bounds,
        // so engine.hitTest() would miss them.
        let bestTargetNode: SpatialNode | null = null;
        let bestTargetPort: { id: string; direction: PortDirection; dataType: string } | null = null;
        let bestDist = Infinity;

        for (const n of engine.getAllNodes()) {
          if (n.type === "edge" || n.id === sourceNode.id) continue;
          const nDef = registry.get(n.type);
          const nPorts = resolveNodePorts(nDef, n);
          if (!nPorts?.length) continue;

          for (const p of nPorts) {
            // Only consider ports in the expected direction
            if (p.direction !== expectedDir) continue;
            // Type compatibility
            if (sourcePort.dataType !== "any" && p.dataType !== "any" && sourcePort.dataType !== p.dataType) continue;

            const pos = getPortPosition(
              n,
              nPorts,
              p.id,
              engine.viewport.zoom,
              engine.measuredHeights,
              nDef!.portAnchor ?? "bbox",
            );
            if (!pos) continue;

            const dist = Math.hypot(pos.x - x, pos.y - y);
            if (dist < portSnapThreshold && dist < bestDist) {
              bestDist = dist;
              bestTargetNode = n;
              bestTargetPort = p;
            }
          }
        }

        if (!bestTargetNode || !bestTargetPort) {
          // Competitor-style: drag from a port onto empty canvas → host can open
          // an add-node menu. Keep the rubber-band + skeleton ghost until the
          // host clears `portConnectHold`. Ignore tiny moves (click without drag).
          const dragged =
            Math.hypot(me.clientX - e.clientX, me.clientY - e.clientY) > 10;
          if (dragged && onPortConnectEmpty) {
            setEdgePreview((prev) =>
              prev
                ? {
                    ...prev,
                    cursorX: x,
                    cursorY: y,
                    held: true,
                    ghost: {
                      w: 200,
                      h: 100,
                      attach: direction === "output" ? "in" : "out",
                    },
                    edgeColor: "#6b7280",
                    edgeStrokeWidth: 1.5,
                    edgeStyle: "solid",
                    edgeType: "bezier",
                  }
                : null,
            );
            onPortConnectEmpty({
              nodeId,
              portId,
              direction,
              canvasX: x,
              canvasY: y,
              clientX: me.clientX,
              clientY: me.clientY,
            });
            return;
          }
          setEdgePreview(null);
          return;
        }

        setEdgePreview(null);

        // Prevent duplicate port connections (one edge per input port)
        const targetPortId = bestTargetPort.id;
        const inputNodeId = direction === "output" ? bestTargetNode.id : sourceNode.id;
        const inputPortId = direction === "output" ? targetPortId : portId;
        const duplicate = engine.getAllNodes().some((n) => {
          if (n.type !== "edge") return false;
          const ed = (n as EdgeNode).data;
          return ed.toId === inputNodeId && ed.targetPort === inputPortId;
        });
        if (duplicate) return;

        // Determine edge direction: always output → input
        const fromId = direction === "output" ? sourceNode.id : bestTargetNode.id;
        const toId = direction === "output" ? bestTargetNode.id : sourceNode.id;
        const fromPort = direction === "output" ? portId : targetPortId;
        const toPort = direction === "output" ? targetPortId : portId;
        const fromHandle: HandleSide = "right";
        const toHandle: HandleSide = "left";

        const edgeNode: EdgeNode = {
          id: nanoid(10),
          type: "edge",
          x: 0, y: 0, w: 0, h: 0, z: engine.nextZ(),
          data: {
            fromId,
            toId,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 1.5,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: fromHandle,
            targetHandle: toHandle,
            sourcePort: fromPort,
            targetPort: toPort,
          },
        };
        engine.addNode(edgeNode);
        engine.select(edgeNode.id);
      };

      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, registry, measuredHeights, onPortConnectEmpty]
  );
  // Kink handle drag — reposition the bend point of step/smoothstep edges
  const handleKinkHandleDown = useCallback(
    (edgeId: string, axis: "x" | "y" | "xy", _min: number, _max: number, e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const edgeNode = engine.getNode(edgeId) as EdgeNode | undefined;
      if (!edgeNode || edgeNode.type !== "edge") return;

      let historyPushed = false;

      const onMove = (me: PointerEvent) => {
        if (!historyPushed) {
          historyPushed = true;
          engine.pushHistorySnapshot();
          engine.beginNodeGesture([edgeId], "transform");
        }
        const canvasPos = engine.screenToCanvas(me.clientX, me.clientY);
        const fresh = engine.getNode(edgeId) as EdgeNode | undefined;
        if (!fresh) return;
        const fromNode = engine.getNode(fresh.data.fromId);
        const toNode = engine.getNode(fresh.data.toId);
        if (!fromNode || !toNode) return;

        if (axis === "xy") {
          // Bezier: compute offset from the natural (no-offset) midpoint.
          // A STRAIGHT edge bends here too — the drag converts it to bezier
          // with the pull applied (grab-the-middle works on every edge).
          const wasStraight = fresh.data.edgeType === "straight";
          const effType = wasStraight ? "bezier" : (fresh.data.edgeType || "bezier");
          const naturalPath = computeEdgePath(
            fromNode, toNode,
            effType,
            measuredHeights,
            fresh.data.sourceHandle, fresh.data.targetHandle,
            undefined, undefined, // no offsets → natural midpoint
            undefined, undefined,
            fresh.data.sourceT, fresh.data.targetT,
            fresh.data.attachmentGap,
          );
          if (!naturalPath.kinkHandle) return;
          const dx = canvasPos.x - naturalPath.kinkHandle.x;
          const dy = canvasPos.y - naturalPath.kinkHandle.y;
          engine.updateNode(edgeId, {
            data: {
              ...fresh.data,
              curveOffset: [dx, dy],
              ...(wasStraight ? { edgeType: "bezier" as const } : {}),
            },
          } as Partial<EdgeNode>);
        } else {
          // Step/smoothstep: single-axis ratio-based offset
          const val = axis === "x" ? canvasPos.x : canvasPos.y;
          const pathResult = computeEdgePath(
            fromNode, toNode,
            fresh.data.edgeType || "bezier",
            measuredHeights,
            fresh.data.sourceHandle, fresh.data.targetHandle,
            0.5, undefined, // default to get range
            undefined, undefined,
            fresh.data.sourceT, fresh.data.targetT,
            fresh.data.attachmentGap,
          );
          if (!pathResult.kinkHandle) return;
          const curMin = pathResult.kinkHandle.min;
          const curMax = pathResult.kinkHandle.max;
          const range = curMax - curMin;
          if (range === 0) return;
          const clamped = Math.max(curMin, Math.min(curMax, val));
          const offset = (clamped - curMin) / range;
          engine.updateNode(edgeId, {
            data: { ...fresh.data, midpointOffset: offset },
          } as Partial<EdgeNode>);
        }
      };

      const onUp = () => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        engine.endNodeGesture();
      };

      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights]
  );

  // Edge endpoint drag — reconnect an existing edge to a different node
  const handleEdgeEndpointDown = useCallback(
    (edgeId: string, endpoint: "source" | "target", e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const edgeNode = engine.getNode(edgeId) as EdgeNode | undefined;
      if (!edgeNode || edgeNode.type !== "edge") return;

      const { fromId, toId, sourceHandle, targetHandle } = edgeNode.data;

      // The anchor is the end NOT being dragged
      const anchorNodeId = endpoint === "source" ? toId : fromId;
      const anchorHandle = endpoint === "source" ? targetHandle : sourceHandle;

      const fromNode = engine.getNode(fromId);
      const toNode = engine.getNode(toId);
      if (!fromNode || !toNode) return;

      // Compute current endpoint position so cursor starts at the right spot
      const pathResult = computeEdgePath(
        fromNode, toNode,
        edgeNode.data.edgeType || "bezier",
        measuredHeights,
        sourceHandle, targetHandle,
        undefined, undefined,
        undefined, undefined,
        edgeNode.data.sourceT, edgeNode.data.targetT,
        edgeNode.data.attachmentGap,
      );
      const startCursor = endpoint === "source"
        ? { x: pathResult.x1, y: pathResult.y1 }
        : { x: pathResult.x2, y: pathResult.y2 };

      setEdgeReconnect({
        edgeId,
        endpoint,
        anchorNodeId,
        anchorHandle,
        cursorX: startCursor.x,
        cursorY: startCursor.y,
      });

      const onMove = (me: PointerEvent) => {
        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        setEdgeReconnect((prev) =>
          prev ? { ...prev, cursorX: x, cursorY: y } : null
        );
      };

      const onUp = (me: PointerEvent) => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        setEdgeReconnect(null);

        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);

        // Find target node by hitTest, with perimeter-distance fallback.
        // Also search when hitting a frame — prefer children over the frame.
        let targetNode = engine.hitTest(x, y, measuredHeights);
        if (!targetNode || targetNode.type === "edge" || engine.isContainerType(targetNode.type)) {
          const snapThreshold = 50 / engine.viewport.zoom;
          let bestDist = Infinity;
          let bestIsFrame = false;
          let bestNode: SpatialNode | null = null;
          for (const n of engine.getAllNodes()) {
            if (n.type === "edge") continue;
            const isFrame = engine.isContainerType(n.type);
            const pp = nearestPerimeterPoint(n, x, y, measuredHeights);
            const dist = Math.hypot(pp.x - x, pp.y - y);
            if (dist >= snapThreshold) continue;
            if (isFrame && !bestIsFrame && bestNode) continue;
            if ((!isFrame && bestIsFrame) || dist < bestDist) {
              bestDist = dist;
              bestIsFrame = isFrame;
              bestNode = n;
            }
          }
          if (bestNode) targetNode = bestNode;
        }

        // Validate: must land on a non-edge node
        if (!targetNode || targetNode.type === "edge") return;

        // Compute new fromId/toId
        const newFromId = endpoint === "source" ? targetNode.id : fromId;
        const newToId = endpoint === "target" ? targetNode.id : toId;

        // Prevent self-loops
        if (newFromId === newToId) return;

        // Dropping on the SAME node repositions the endpoint along it (free:
        // new perimeter T; fixed: nearest handle). Without this, a placed
        // endpoint could never be moved at all — e.g. after a fixed→free
        // round-trip parks it at a cardinal position.
        const originalEndNodeId = endpoint === "source" ? fromId : toId;
        const repositionOnSameNode = targetNode.id === originalEndNodeId;

        // Endpoint drops ALWAYS produce a free anchor — legacy fixed-handle
        // edges (old docs, templates) convert on first touch. Anywhere DEEPER
        // inside the node than the border band anchors at that interior [u,v]
        // point ("point at the thing, not its edge"); near the border it snaps
        // to the perimeter. Same rule as edge creation.
        let newUV: [number, number] | undefined;
        const pp = nearestPerimeterPoint(targetNode, x, y, measuredHeights);
        if (Math.hypot(pp.x - x, pp.y - y) > INTERIOR_ANCHOR_BAND_PX / engine.viewport.zoom) {
          const uv = nearestInteriorUV(targetNode, x, y, measuredHeights);
          if (uv[0] > 0 && uv[0] < 1 && uv[1] > 0 && uv[1] < 1) newUV = uv;
        }
        const newT = newUV ? undefined : pp.t;

        // Reconnecting to a DIFFERENT node: allow parallel edges, but block an
        // exact duplicate. Same-node repositioning keeps the topology, so the
        // check doesn't apply. The moved endpoint's handle clears (free anchor),
        // so the candidate carries only the unmoved endpoint's handle.
        if (!repositionOnSameNode) {
          const candidate = endpoint === "source"
            ? {
              fromId: newFromId,
              toId: newToId,
              sourceHandle: undefined,
              targetHandle: targetHandle,
              sourcePort: edgeNode.data.sourcePort,
              targetPort: edgeNode.data.targetPort,
            }
            : {
              fromId: newFromId,
              toId: newToId,
              sourceHandle,
              targetHandle: undefined,
              sourcePort: edgeNode.data.sourcePort,
              targetPort: edgeNode.data.targetPort,
            };
          const wouldDuplicate = engine.getAllNodes().some((n) => {
            if (n.type !== "edge" || n.id === edgeId) return false;
            return isExactEdgeConnectionDuplicate((n as EdgeNode).data, candidate);
          });
          if (wouldDuplicate) return;
        }

        // Apply with history (Ctrl+Z undoes reconnection)
        const dataPatch: Partial<EdgeNode["data"]> = endpoint === "source"
          ? { fromId: targetNode.id, sourceT: newUV ?? newT, sourceHandle: undefined }
          : { toId: targetNode.id, targetT: newUV ?? newT, targetHandle: undefined };

        engine.updateNodeWithHistory(edgeId, { data: dataPatch } as Partial<EdgeNode>);
      };

      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights]
  );

  // Unified rotation handler for multi-selection
  const handleUnifiedRotateDown = useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (engine.presentationMode) return;

      const selectedNodes = Array.from(engine.selection)
        .map((id) => engine.getNode(id))
        .filter(Boolean) as SpatialNode[];
      if (selectedNodes.length < 2) return;
      if (selectedNodes.some((n) => registry?.get(n.type)?.rotatable === false)) return;

      const isSingleGroup = engine.selectionIsSingleGroup();
      const gid = isSingleGroup ? (engine.selectionGroupId() ?? null) : null;
      const stored = gid ? engine.groupRotations.get(gid) : null;

      // Use stored pivot for groups, otherwise compute from current AABB
      let groupCx: number, groupCy: number;
      if (stored) {
        groupCx = stored.cx;
        groupCy = stored.cy;
      } else {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const n of selectedNodes) {
          const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
          const aabb = getNodeAABB(n, h);
          minX = Math.min(minX, aabb.minX);
          minY = Math.min(minY, aabb.minY);
          maxX = Math.max(maxX, aabb.maxX);
          maxY = Math.max(maxY, aabb.maxY);
        }
        groupCx = (minX + maxX) / 2;
        groupCy = (minY + maxY) / 2;
      }

      const baseAngle = stored?.angle ?? 0;

      // Exclude locked nodes from rotation
      const movableNodes = selectedNodes.filter((n) => !n.locked);
      const initials = movableNodes.map((n) => {
        const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
        return {
          id: n.id,
          cx: n.x + n.w / 2,
          cy: n.y + h / 2,
          w: n.w,
          h,
          rotation: n.rotation || 0,
        };
      });

      // Compute the frozen (unrotated) bounds for the visual box
      const baseRad = (-baseAngle * Math.PI) / 180;
      const baseCos = Math.cos(baseRad);
      const baseSin = Math.sin(baseRad);
      let fMinX = Infinity, fMinY = Infinity, fMaxX = -Infinity, fMaxY = -Infinity;
      for (const init of initials) {
        // Reverse-rotate node center to unrotated space
        const dx = init.cx - groupCx;
        const dy = init.cy - groupCy;
        const ux = groupCx + dx * baseCos - dy * baseSin;
        const uy = groupCy + dx * baseSin + dy * baseCos;
        fMinX = Math.min(fMinX, ux - init.w / 2);
        fMinY = Math.min(fMinY, uy - init.h / 2);
        fMaxX = Math.max(fMaxX, ux + init.w / 2);
        fMaxY = Math.max(fMaxY, uy + init.h / 2);
      }
      const frozenBounds = {
        x: fMinX - SEL_PAD,
        y: fMinY - SEL_PAD,
        w: fMaxX - fMinX + SEL_PAD * 2,
        h: fMaxY - fMinY + SEL_PAD * 2,
      };

      const { x: startCx, y: startCy } = engine.screenToCanvas(e.clientX, e.clientY);
      const startAngle = Math.atan2(startCy - groupCy, startCx - groupCx);

      let historyPushed = false;

      let lastTotalAngle = baseAngle;

      const onMove = (me: PointerEvent) => {
        if (!historyPushed) {
          historyPushed = true;
          engine.pushHistorySnapshot();
          engine.beginNodeGesture(engine.selection, "transform");
        }
        const { x: cx, y: cy } = engine.screenToCanvas(me.clientX, me.clientY);
        const currentAngle = Math.atan2(cy - groupCy, cx - groupCx);
        let angleDelta = (currentAngle - startAngle) * (180 / Math.PI);

        if ((me.shiftKey || engine.snapToGrid) && !(me.metaKey || me.ctrlKey)) {
          angleDelta = Math.round(angleDelta / 15) * 15;
        }

        lastTotalAngle = baseAngle + angleDelta;

        // Update visual rotation of the selection box
        setGroupRotation({ angle: lastTotalAngle, cx: groupCx, cy: groupCy, bounds: frozenBounds });

        const rad = (angleDelta * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        const batch = initials.map((init) => {
          const dx = init.cx - groupCx;
          const dy = init.cy - groupCy;
          const newCx = groupCx + dx * cos - dy * sin;
          const newCy = groupCy + dx * sin + dy * cos;
          return {
            id: init.id,
            patch: {
              x: newCx - init.w / 2,
              y: newCy - init.h / 2,
              // Each node keeps its own spin: delta on top of its initial
              // rotation, not the group's absolute angle.
              rotation: init.rotation + angleDelta,
            },
          };
        });
        engine.updateMany(batch);
      };
      const onUp = () => {
        // Persist rotation to engine for groups (survives re-selection)
        if (gid) {
          engine.groupRotations.set(gid, { angle: lastTotalAngle, cx: groupCx, cy: groupCy });
        }
        // Keep the visual rotation on the selection box (cleared on selection change)
        setGroupRotation({ angle: lastTotalAngle, cx: groupCx, cy: groupCy, bounds: frozenBounds });
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        engine.endNodeGesture();
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights, getNodeAABB, registry]
  );

  // Unified resize handler for multi-selection
  const handleUnifiedResizeDown = useCallback(
    (handle: HandlePosition, e: React.PointerEvent<SVGRectElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (engine.presentationMode) return;

      const selectedNodes = Array.from(engine.selection)
        .map((id) => engine.getNode(id))
        .filter(Boolean) as SpatialNode[];
      if (selectedNodes.length < 2) return;
      if (selectedNodes.some((n) => registry?.get(n.type)?.resizable === false)) return;

      const getH = (n: SpatialNode) =>
        n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);

      // Compute original unified bounding box (use measured heights + rotation)
      let bMinX = Infinity, bMinY = Infinity, bMaxX = -Infinity, bMaxY = -Infinity;
      for (const n of selectedNodes) {
        const h = getH(n);
        const aabb = getNodeAABB(n, h);
        bMinX = Math.min(bMinX, aabb.minX);
        bMinY = Math.min(bMinY, aabb.minY);
        bMaxX = Math.max(bMaxX, aabb.maxX);
        bMaxY = Math.max(bMaxY, aabb.maxY);
      }
      const origBox = { x: bMinX, y: bMinY, w: bMaxX - bMinX, h: bMaxY - bMinY };
      const safeBW = origBox.w || 1;
      const safeBH = origBox.h || 1;

      // Store each node's original state relative to the unified box (exclude locked)
      const movableNodes = selectedNodes.filter((n) => !n.locked);
      const origStates = movableNodes.map((n) => {
        const h = getH(n);
        return {
          id: n.id,
          type: n.type,
          isAutoH: n.h === "auto",
          relX: (n.x - origBox.x) / safeBW,
          relY: (n.y - origBox.y) / safeBH,
          relW: n.w / safeBW,
          relH: h / safeBH,
          origW: n.w,
          origH: h,
          origPoints: n.type === "draw"
            ? (n as DrawNode).data.points.map((p) => [...p] as [number, number, number])
            : null,
          drawData: n.type === "draw" ? { ...(n as DrawNode).data } : null,
          origFontSize: n.type === "text" ? (n as TextNode).data.fontSize : 0,
          textData: n.type === "text" ? { ...(n as TextNode).data } : null,
        };
      });

      const startScreenX = e.clientX;
      const startScreenY = e.clientY;

      let historyPushed = false;

      let rafId: number | null = null;
      let lastClientX = startScreenX;
      let lastClientY = startScreenY;
      let lastModKey = false;
      let lastShiftKey = e.shiftKey;

      const applyResize = () => {
        rafId = null;
        const dx = (lastClientX - startScreenX) / engine.viewport.zoom;
        const dy = (lastClientY - startScreenY) / engine.viewport.zoom;

        if (!historyPushed && (dx !== 0 || dy !== 0)) {
          historyPushed = true;
          engine.pushHistorySnapshot();
          engine.beginNodeGesture(engine.selection, "transform");
        }

        let newX = origBox.x, newY = origBox.y, newW = origBox.w, newH = origBox.h;

        if (handle === "nw" || handle === "w" || handle === "sw") {
          newX = origBox.x + dx;
          newW = origBox.w - dx;
        }
        if (handle === "ne" || handle === "e" || handle === "se") {
          newW = origBox.w + dx;
        }
        if (handle === "nw" || handle === "n" || handle === "ne") {
          newY = origBox.y + dy;
          newH = origBox.h - dy;
        }
        if (handle === "sw" || handle === "s" || handle === "se") {
          newH = origBox.h + dy;
        }

        if (engine.snapToGrid && !lastModKey) {
          const g = engine.gridSize;
          const snapVal = (v: number) => Math.round(v / g) * g;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = snapVal(newX);
            newW = origBox.x + origBox.w - newX;
          }
          if (handle === "ne" || handle === "e" || handle === "se") {
            newW = snapVal(newX + newW) - newX;
          }
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = snapVal(newY);
            newH = origBox.y + origBox.h - newY;
          }
          if (handle === "sw" || handle === "s" || handle === "se") {
            newH = snapVal(newY + newH) - newY;
          }
        }

        if (newW < 20) {
          newW = 20;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = origBox.x + origBox.w - 20;
          }
        }
        if (newH < 20) {
          newH = 20;
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = origBox.y + origBox.h - 20;
          }
        }

        if (lastShiftKey && origBox.w > 0 && origBox.h > 0) {
          const locked = applyCornerAspectLock(
            handle,
            origBox.x,
            origBox.y,
            origBox.w,
            origBox.h,
            newX,
            newY,
            newW,
            newH,
          );
          newX = locked.x;
          newY = locked.y;
          newW = locked.w;
          newH = locked.h;
        }

        const updates = origStates.map((orig) => {
          const nodeNewX = newX + orig.relX * newW;
          const nodeNewY = newY + orig.relY * newH;
          const nodeNewW = orig.relW * newW;
          const nodeNewH = orig.relH * newH;

          const patch: Partial<SpatialNode> = {
            x: nodeNewX,
            y: nodeNewY,
            w: nodeNewW,
            h: orig.isAutoH ? ("auto" as const) : nodeNewH,
          };

          if (orig.origPoints && orig.drawData) {
            const scaleX = orig.origW > 0 ? nodeNewW / orig.origW : 1;
            const scaleY = orig.origH > 0 ? nodeNewH / orig.origH : 1;
            patch.data = {
              ...orig.drawData,
              points: orig.origPoints.map(
                ([px, py, p]) => [px * scaleX, py * scaleY, p] as [number, number, number]
              ),
            };
          }

          // Match single-node text resize: e/w only reflow (no font change); n/s use
          // height scale; corners use width scale (see handleResizeHandleDown).
          if (
            orig.type === "text" &&
            orig.origFontSize > 0 &&
            orig.textData &&
            handle !== "e" &&
            handle !== "w"
          ) {
            const scale =
              handle === "n" || handle === "s"
                ? orig.origH > 0
                  ? nodeNewH / orig.origH
                  : 1
                : orig.origW > 0
                  ? nodeNewW / orig.origW
                  : 1;
            const newFontSize = Math.max(8, Math.round(orig.origFontSize * scale));
            patch.data = { ...orig.textData, fontSize: newFontSize };
          }

          return { id: orig.id, patch };
        });

        engine.updateMany(updates);
      };

      const onMove = (me: PointerEvent) => {
        lastClientX = me.clientX;
        lastClientY = me.clientY;
        lastModKey = me.metaKey || me.ctrlKey;
        lastShiftKey = me.shiftKey;
        if (rafId === null) {
          rafId = requestAnimationFrame(applyResize);
        }
      };

      const onUp = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          applyResize();
        }
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        // If any frames were resized, sync children (remove outside, add newly inside)
        for (const s of selectedNodes) {
          if (engine.isContainerType(s.type)) engine.syncFrameChildrenAfterResize(s.id);
        }
        engine.endNodeGesture();
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights, getNodeAABB, registry]
  );

  return {
    handleResizeHandleDown,
    handleRotateStart,
    handleConnectionHandleDown,
    findNearestNodeForSide,
    handlePortHandleDown,
    handleKinkHandleDown,
    handleEdgeEndpointDown,
    handleUnifiedRotateDown,
    handleUnifiedResizeDown,
  };
}
