import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import type { MutableRefObject, RefObject } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { SpatialNode, EdgeNode, Mode } from "../../../engine/types";
import {
  getClosestEdgeHit,
  nearestPerimeterPoint,
} from "../../../engine/edge-geometry";
import type { PortPositionResolver } from "../../../engine/edge-geometry";
import { getCursorForMode, LASSO_CURSOR } from "../canvas-helpers";

/**
 * Cursor management + rAF-throttled hover pointer-move extracted from
 * SpatialCanvas.
 *
 * Pure mechanical extraction — the imperative cursor writes (NOT React state),
 * the rAF throttle, the `hoveredNodeIdRef` mirror, and every dependency array
 * are preserved byte-for-byte. Eraser cleanup is deliberately left behind as a
 * tiny separate effect in the component (its refs/setters stay there until a
 * later stage); this hook owns only the cursor-setting + hover-clear half of
 * the original mode effect, plus `hoveredNodeId` / `cursorCanvasPos` /
 * `hoveredNodeIdRef` state and the `boppingNodeIds` derivation.
 */
export function useHoverCursor({
  engine,
  containerRef,
  mode,
  selBounds,
  resolvePortPositions,
  // Kept solely to preserve handlePointerMove's exact useCallback dep array.
  getNodeAABB,
  measuredHeights,
  nodes,
  longPressTimerRef,
  longPressOriginRef,
}: {
  engine: SpatialEngine;
  containerRef: RefObject<HTMLDivElement>;
  mode: Mode;
  selBounds: { x: number; y: number; w: number; h: number } | null;
  resolvePortPositions: PortPositionResolver;
  getNodeAABB: (
    n: SpatialNode,
    h: number,
  ) => { minX: number; minY: number; maxX: number; maxY: number };
  measuredHeights: Record<string, number>;
  nodes: SpatialNode[];
  longPressTimerRef: MutableRefObject<ReturnType<typeof setTimeout> | null>;
  longPressOriginRef: MutableRefObject<{ clientX: number; clientY: number } | null>;
}) {
  // Hover state — tracked centrally for all node types
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [cursorCanvasPos, setCursorCanvasPos] = useState<{ x: number; y: number } | null>(null);
  const hoveredNodeIdRef = useRef<string | null>(null);

  const boppingNodeIds = useMemo(() => {
    const ids = new Set<string>();
    for (const n of nodes) {
      if (n.type !== "edge") continue;
      const edge = n as EdgeNode;
      if (edge.data.animated && edge.data.animatedDirection === "bop") {
        ids.add(edge.data.fromId);
        ids.add(edge.data.toId);
      }
    }
    return ids;
  }, [nodes]);

  // Manage cursor imperatively to avoid re-renders on every pointer move
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.cursor = engine.lassoSelect ? LASSO_CURSOR : getCursorForMode(mode);
    }
    // Clear hover when leaving select/edge mode
    if (mode !== "select" && mode !== "edge") {
      hoveredNodeIdRef.current = null;
      setHoveredNodeId(null);
    }
  }, [mode, engine]);

  const pointerMoveRafRef = useRef<number | null>(null);
  const pointerMovePendingRef = useRef<{ clientX: number; clientY: number } | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Cancel long-press if finger moves more than 8px
      if (longPressTimerRef.current && e.pointerType === "touch" && longPressOriginRef.current) {
        const dx = e.clientX - longPressOriginRef.current.clientX;
        const dy = e.clientY - longPressOriginRef.current.clientY;
        if (Math.sqrt(dx * dx + dy * dy) > 8) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
          longPressOriginRef.current = null;
        }
      }
      if (engine.mode !== "select" && engine.mode !== "edge") return;
      pointerMovePendingRef.current = { clientX: e.clientX, clientY: e.clientY };
      if (pointerMoveRafRef.current !== null) return;
      pointerMoveRafRef.current = requestAnimationFrame(() => {
        pointerMoveRafRef.current = null;
        const container = containerRef.current;
        const pending = pointerMovePendingRef.current;
        if (!container || !pending) return;

        const { x: cx, y: cy } = engine.screenToCanvas(pending.clientX, pending.clientY);

        // In lasso mode, always show lasso cursor
        if (engine.lassoSelect) {
          container.style.cursor = LASSO_CURSOR;
          return;
        }

        // In edge mode, find nearest node by perimeter proximity (not hitTest)
        // so the attachment dot shows reliably even on thin strokes.
        if (engine.mode === "edge") {
          const snapThreshold = 50 / engine.viewport.zoom;
          let bestId: string | null = null;
          let bestDist = snapThreshold;
          for (const n of engine.getAllNodes()) {
            if (n.type === "edge") continue;
            const pp = nearestPerimeterPoint(n, cx, cy, measuredHeights);
            const dist = Math.hypot(pp.x - cx, pp.y - cy);
            if (dist < bestDist) {
              bestDist = dist;
              bestId = n.id;
            }
          }
          if (bestId !== hoveredNodeIdRef.current) {
            hoveredNodeIdRef.current = bestId;
            setHoveredNodeId(bestId);
          }
          setCursorCanvasPos({ x: cx, y: cy });
          return;
        }

        // For multi-selection, show move cursor inside the selection bounding box
        if (
          engine.selection.size >= 2 &&
          selBounds &&
          cx >= selBounds.x &&
          cx <= selBounds.x + selBounds.w &&
          cy >= selBounds.y &&
          cy <= selBounds.y + selBounds.h
        ) {
          container.style.cursor = "move";
          return;
        }

        // Check if hovering over any node
        const hit = engine.hitTest(cx, cy, measuredHeights);
        const newHoveredId = hit ? hit.id : null;
        if (newHoveredId !== hoveredNodeIdRef.current) {
          hoveredNodeIdRef.current = newHoveredId;
          setHoveredNodeId(newHoveredId);
        }
        if (hit) {
          container.style.cursor = "move";
          return;
        }

        if (
          getClosestEdgeHit(
            engine.nodes,
            cx,
            cy,
            engine.viewport.zoom,
            measuredHeights,
            resolvePortPositions
          )
        ) {
          container.style.cursor = "move";
          return;
        }

        container.style.cursor = "default";
      });
    },
    [engine, selBounds, measuredHeights, getNodeAABB, resolvePortPositions]
  );

  return { handlePointerMove, hoveredNodeId, cursorCanvasPos, boppingNodeIds, hoveredNodeIdRef };
}
