import { useState, useRef, useCallback, useEffect } from "react";
import type { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { nanoid } from "nanoid";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type {
  SpatialNode,
  DrawNode,
  ShapeNode,
  EdgeNode,
  FrameNode,
  StickyNoteNode,
  Mode,
  Viewport,
  StrokeStyle,
} from "../../../engine/types";
import type { PortPositionResolver } from "../../../engine/edge-geometry";
import {
  getClosestEdgeHit,
  hitTestAllEdges,
  nearestHandle,
  nearestPerimeterPoint,
  nearestInteriorUV,
  INTERIOR_ANCHOR_BAND_PX,
} from "../../../engine/edge-geometry";
import { distancePointToBoxNodeBorder } from "../../../engine/spatial-index";
import { TABLE_CELL_W, TABLE_CELL_H } from "../../blocks/TableBlock";
import {
  getCursorForMode,
  pinchMetrics,
  LASSO_CURSOR,
  isExactEdgeConnectionDuplicate,
} from "../canvas-helpers";
import type { ContextMenuSection } from "../../overlays/ContextMenu";
import type { SpatialBoardLocalization } from "../../contexts/LocalizationContext";
import type { EdgePreviewState, GroupRotationState } from "./useNodeTransforms";

/**
 * The pointer-gesture core extracted from SpatialCanvas — `handlePointerDown`
 * (the full mode-dispatch: pinch/two-finger, long-press, middle/space pan, then
 * every engine.mode branch: select/marquee/lasso/node-drag, text, note, sticky,
 * draw, shape, edge, frame, erase, laser, hand) plus the gesture-only ephemeral
 * state it owns (marquee/lasso/stroke/shape/text previews + eraser/laser trails)
 * and the notify/awareness effects that read ONLY that state.
 *
 * Performance-load-bearing: the per-node gesture subscriptions
 * (`beginNodeGesture`/`endNodeGesture`) and the rAF batching in the
 * drag/marquee/lasso paths keep large-board drags at frame rate. State that is ALSO
 * read by another hook or by chrome outside these previews stays declared in
 * SpatialCanvas and is threaded in (`setEdgePreview`, `setGroupRotation`,
 * `setViewport`, `altClickRef`, `longPress*Ref`, the context-menu handles, the
 * geometry helpers, the node/text creators, `setEditingStickyId`, `hitEligible`).
 */
export function usePointerGestures({
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
}: {
  engine: SpatialEngine;
  containerRef: RefObject<HTMLDivElement>;
  mode: Mode;
  labels: SpatialBoardLocalization;
  measuredHeights: Record<string, number>;
  selBounds: { x: number; y: number; w: number; h: number } | null;
  getNodeAABB: (
    n: SpatialNode,
    h: number,
  ) => { minX: number; minY: number; maxX: number; maxY: number };
  getNodesInMarqueeRect: (
    rect: { x: number; y: number; w: number; h: number },
    nodeList: SpatialNode[],
  ) => SpatialNode[];
  getNodesInLassoPolygon: (
    polygon: Array<[number, number]>,
    nodeList: SpatialNode[],
  ) => SpatialNode[];
  resolvePortPositions: PortPositionResolver;
  hitEligible: (n: SpatialNode) => boolean;
  createBlockNote: (x: number, y: number, w: number, h?: number | "auto") => void;
  createTextNodeAndEdit: (x: number, y: number, w: number) => void;
  contextMenu: { x: number; y: number; sections: ContextMenuSection[] } | null;
  setContextMenu: Dispatch<
    SetStateAction<{ x: number; y: number; sections: ContextMenuSection[] } | null>
  >;
  buildContextMenuSections: (
    screenX: number,
    screenY: number,
    altKey: boolean,
  ) => ContextMenuSection[];
  setEditingStickyId: Dispatch<SetStateAction<string | null>>;
  setViewport: Dispatch<SetStateAction<Viewport>>;
  setEdgePreview: Dispatch<SetStateAction<EdgePreviewState | null>>;
  setGroupRotation: Dispatch<SetStateAction<GroupRotationState | null>>;
  altClickRef: MutableRefObject<{ x: number; y: number; index: number }>;
  longPressTimerRef: MutableRefObject<ReturnType<typeof setTimeout> | null>;
  longPressOriginRef: MutableRefObject<{ clientX: number; clientY: number } | null>;
}) {
  /** Get the ownerDocument of the canvas container (supports pop-out windows). */
  const ownerDoc = () => containerRef.current?.ownerDocument ?? document;

  // Space-to-pan: track whether Space is held for temporary hand mode
  const spaceHeldRef = useRef(false);
  const spacePanActiveRef = useRef(false);

  // Multi-touch / pinch-to-zoom tracking
  const activeTouchesRef = useRef(new Map<number, { x: number; y: number }>());
  const isPinchingRef = useRef(false);
  const activePenRef = useRef(false);

  const emitCanvasInteraction = useCallback((active: boolean) => {
    ownerDoc().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active } }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && !e.repeat && !spaceHeldRef.current) {
        // Don't intercept Space if user is typing in an input/textarea/contentEditable
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
        spaceHeldRef.current = true;
        const container = containerRef.current;
        if (container) container.style.cursor = "grab";
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") {
        spaceHeldRef.current = false;
        spacePanActiveRef.current = false;
        const container = containerRef.current;
        if (container) container.style.cursor = engine.lassoSelect ? LASSO_CURSOR : getCursorForMode(engine.mode);
      }
    };
    // Use window to catch Space even when focus is not on the canvas
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Global cleanup for multi-touch pointers (handles pointerup/pointercancel outside React synthetic events)
  useEffect(() => {
    const cleanup = (e: PointerEvent) => {
      activeTouchesRef.current.delete(e.pointerId);
      if (e.pointerType === "pen") activePenRef.current = false;
      if (activeTouchesRef.current.size === 0) {
        emitCanvasInteraction(false);
      }
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
        longPressOriginRef.current = null;
      }
    };
    const doc = ownerDoc();
    doc.addEventListener("pointerup", cleanup);
    doc.addEventListener("pointercancel", cleanup);
    return () => {
      doc.removeEventListener("pointerup", cleanup);
      doc.removeEventListener("pointercancel", cleanup);
    };
  }, [emitCanvasInteraction]);

  // Drawing state — the in-progress freehand stroke is a REAL DrawNode
  // rendered by the same DOM-layer pipeline as committed ink (one raster
  // context, so the stroke cannot shift on mouse-up). It stays OUT of the
  // engine until pointer-up: history, serialization, and the collab doc never
  // see it; peers get the live stroke via notifyDrawProgress (awareness).
  const [activeStrokeNode, setActiveStrokeNode] = useState<DrawNode | null>(null);

  // Shape preview state
  const [shapePreview, setShapePreview] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    /** Future node id, minted at drag start — seeds the rough preview so the
     * committed node renders the exact same strokes (RoughJS seeds by id). */
    nodeId?: string;
  } | null>(null);

  const prevFrameRectDragRef = useRef(shapePreview);
  useEffect(() => {
    if (engine.mode !== "frame") {
      if (prevFrameRectDragRef.current) {
        engine.notifyRectDragEnd();
      }
      prevFrameRectDragRef.current = null;
      return;
    }
    const prev = prevFrameRectDragRef.current;
    prevFrameRectDragRef.current = shapePreview;
    if (shapePreview) {
      engine.notifyRectDragProgress({
        kind: "frame",
        startX: shapePreview.startX,
        startY: shapePreview.startY,
        endX: shapePreview.endX,
        endY: shapePreview.endY,
      });
    } else if (prev) {
      engine.notifyRectDragEnd();
    }
  }, [shapePreview, engine.mode, engine]);

  // Marquee selection state
  const [selectionRect, setSelectionRect] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [lassoPoints, setLassoPoints] = useState<Array<[number, number]> | null>(null);

  // Text block preview state (drag-to-create). `kind` freezes which preview
  // look to render (sticky/table render the real thing) so a lingering
  // preview stays correct after the tool flips back to select on mouse-up.
  const [textPreview, setTextPreview] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    kind?: "sticky" | "table" | "note";
  } | null>(null);

  const prevTextRectDragRef = useRef(textPreview);
  useEffect(() => {
    const prev = prevTextRectDragRef.current;
    const activeKind =
      engine.mode === "text"
        ? ("text" as const)
        : engine.mode === "note"
          ? ("note" as const)
          : engine.mode === "sticky"
            ? ("sticky" as const)
            : engine.mode === "table"
              ? ("table" as const)
              : null;

    if (!activeKind) {
      if (prev && !textPreview) {
        engine.notifyRectDragEnd();
      }
      prevTextRectDragRef.current = textPreview;
      return;
    }

    prevTextRectDragRef.current = textPreview;

    if (textPreview) {
      // Prefer the preview's FROZEN kind (set at gesture start) so the remote
      // look can't flip if the mode changes mid-linger; carry the creator's
      // styling so peers render the real thing, not a placeholder outline.
      const kind = textPreview.kind ?? activeKind;
      engine.notifyRectDragProgress({
        kind,
        startX: textPreview.startX,
        startY: textPreview.startY,
        endX: textPreview.endX,
        endY: textPreview.endY,
        ...(kind === "sticky" ? { stickyColor: engine.activeTool.stickyColor ?? "#FEF3C7" } : {}),
        ...(kind === "table" ? { roughness: engine.activeTool.roughness ?? 1 } : {}),
      });
    } else if (prev) {
      engine.notifyRectDragEnd();
    }
  }, [textPreview, engine.mode, engine]);

  // Eraser tool state — tracks elements marked for deletion during drag
  const [eraserMarkedIds, setEraserMarkedIds] = useState<Set<string>>(new Set());
  const eraserMarkedRef = useRef<Set<string>>(new Set());
  // Trail points: [x, y, timestamp] — timestamp used for time-based fade
  const [eraserTrail, setEraserTrail] = useState<Array<[number, number, number]>>([]);

  const eraserTrailRef = useRef<Array<[number, number, number]>>([]);
  const eraserFadeRafRef = useRef<number | null>(null);
  const eraserCollabThrottleRef = useRef(0);
  const emitEraserCollab = useCallback(
    (force = false) => {
      if (engine.mode !== "erase") return;
      const t = performance.now();
      if (!force && t - eraserCollabThrottleRef.current < 48) return;
      eraserCollabThrottleRef.current = t;
      const tr = eraserTrailRef.current;
      engine.notifyEraserProgress({
        trail: tr.length > 0 ? [...tr] : undefined,
        markedIds: Array.from(eraserMarkedRef.current),
      });
    },
    [engine],
  );

  // Laser pointer state — purely visual trail that fades out
  const [laserTrail, setLaserTrail] = useState<Array<[number, number, number]>>([]);
  const laserTrailRef = useRef<Array<[number, number, number]>>([]);
  const laserFadeRafRef = useRef<number | null>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Track all active pointers for multi-touch detection
      activeTouchesRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (e.pointerType === "pen") activePenRef.current = true;
      // Don't hide inspector for right-click context menu open on desktop.
      if (e.button !== 2) {
        emitCanvasInteraction(true);
      }

      // Right-click: the contextmenu handler owns this press. Without this
      // gate the press falls through to the select-mode branch, deselecting
      // and starting a marquee — so the menu could never target a selected
      // node/edge.
      if (e.button === 2) return;

      // Two-finger gesture: second touch OR any touch while Apple Pencil is active
      const isSecondTouch =
        e.pointerType === "touch" &&
        (activeTouchesRef.current.size >= 2 || activePenRef.current);

      if (isSecondTouch) {
        isPinchingRef.current = true;

        // Cancel any pending long-press
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
          longPressOriginRef.current = null;
        }

        // Snapshot both pointer positions NOW — the synthetic pointerup below
        // fires synchronously (dispatchEvent is sync), which would trigger the
        // global cleanup and delete the first pointer from activeTouchesRef.
        // Using a local map for pinch tracking avoids that race.
        const pinchMap = new Map(activeTouchesRef.current);

        // Abort in-flight single-pointer drag by synthetic pointerup for the first pointer
        const firstId = [...activeTouchesRef.current.keys()].find((id) => id !== e.pointerId);
        if (firstId !== undefined) {
          ownerDoc().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: firstId,
              bubbles: true,
              clientX: e.clientX,
              clientY: e.clientY,
            })
          );
        }

        // Re-populate from snapshot so both pointers are present for calculation
        const entries = [...pinchMap.values()];
        let prev = pinchMetrics(entries[0], entries[1] ?? entries[0]);

        const onPinchMove = (me: PointerEvent) => {
          if (!pinchMap.has(me.pointerId)) return;
          pinchMap.set(me.pointerId, { x: me.clientX, y: me.clientY });
          const vals = [...pinchMap.values()];
          if (vals.length < 2) return;
          const curr = pinchMetrics(vals[0], vals[1]);
          engine.pan(curr.mx - prev.mx, curr.my - prev.my);
          if (prev.dist > 1) {
            const factor = Math.min(Math.max(curr.dist / prev.dist, 0.9), 1.1);
            engine.zoomByFactor(factor, curr.mx, curr.my);
          }
          prev = curr;
        };

        const onPinchEnd = (me: PointerEvent) => {
          activeTouchesRef.current.delete(me.pointerId);
          pinchMap.delete(me.pointerId);
          if (me.pointerType === "pen") activePenRef.current = false;
          if (pinchMap.size < 2 && !activePenRef.current) {
            isPinchingRef.current = false;
            ownerDoc().removeEventListener("pointermove", onPinchMove);
            ownerDoc().removeEventListener("pointerup", onPinchEnd);
            ownerDoc().removeEventListener("pointercancel", onPinchEnd);
          }
        };

        ownerDoc().addEventListener("pointermove", onPinchMove);
        ownerDoc().addEventListener("pointerup", onPinchEnd);
        ownerDoc().addEventListener("pointercancel", onPinchEnd);
        return; // Skip all mode logic
      }

      if (isPinchingRef.current) return; // pinch still active, ignore new pointers

      // In presentation mode, only allow panning (middle mouse / space+click)
      if (engine.presentationMode) {
        if (e.button === 1 || (e.button === 0 && spaceHeldRef.current)) {
          // fall through to pan logic below
        } else {
          return;
        }
      }

      // Close context menu on any click
      if (contextMenu) {
        setContextMenu(null);
      }

      // Long-press context menu for touch
      if (e.pointerType === "touch") {
        const touchClientX = e.clientX;
        const touchClientY = e.clientY;
        const touchPointerId = e.pointerId;
        longPressOriginRef.current = { clientX: touchClientX, clientY: touchClientY };
        longPressTimerRef.current = setTimeout(() => {
          longPressTimerRef.current = null;
          if (!longPressOriginRef.current) return;
          if (isPinchingRef.current) return;
          const sections = buildContextMenuSections(touchClientX, touchClientY, false);
          setContextMenu({ x: touchClientX, y: touchClientY, sections });
          // Cancel ongoing drag via synthetic pointerup
          ownerDoc().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: touchPointerId,
              bubbles: true,
              clientX: touchClientX,
              clientY: touchClientY,
            })
          );
          longPressOriginRef.current = null;
        }, 500);
      }

      // Middle mouse button OR Space+left-click → pan (any mode)
      if (e.button === 1 || (e.button === 0 && spaceHeldRef.current)) {
        e.preventDefault();
        spacePanActiveRef.current = true;
        const vpStartX = engine.viewport.x;
        const vpStartY = engine.viewport.y;
        const startX = e.clientX;
        const startY = e.clientY;

        const container = containerRef.current;
        if (container) container.style.cursor = "grabbing";

        const onMove = (me: PointerEvent) => {
          engine.viewport.x = vpStartX + (me.clientX - startX);
          engine.viewport.y = vpStartY + (me.clientY - startY);
          setViewport({ ...engine.viewport });
        };
        const onUp = () => {
          spacePanActiveRef.current = false;
          if (container) container.style.cursor = spaceHeldRef.current ? "grab" : (engine.lassoSelect ? LASSO_CURSOR : "");
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
        return;
      }

      const { x: cx, y: cy } = engine.screenToCanvas(e.clientX, e.clientY);

      // If touching a node, cancel long-press immediately — dragging a node should
      // never be interrupted by the context-menu timer. Long-press is only for empty canvas.
      if (e.pointerType === "touch" && longPressTimerRef.current) {
        const touchHit = engine.hitTest(cx, cy, measuredHeights);
        if (touchHit) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
          longPressOriginRef.current = null;
        }
      }

      if (engine.mode === "select") {
        // Right-click selection is handled by handleContextMenu — skip here
        if (e.button !== 0) return;

        // Alt+click: cycle through overlapping nodes at this position
        if (e.altKey) {
          const allHits = engine.hitTestAll(cx, cy, measuredHeights).filter(hitEligible);
          if (allHits.length > 0) {
            // Check if clicking near the same spot as last Alt+click
            const prev = altClickRef.current;
            const dist = Math.abs(cx - prev.x) + Math.abs(cy - prev.y);
            let nextIndex = 0;
            if (dist < 5) {
              // Same spot — advance to next node in the z-stack
              nextIndex = (prev.index + 1) % allHits.length;
            }
            altClickRef.current = { x: cx, y: cy, index: nextIndex };
            engine.select(allHits[nextIndex].id);
          }
          return;
        }

        // Check if click is inside multi-selection bounding box (enables
        // dragging from empty areas within the selection). Single-selection
        // drag is handled by the rotation-aware hit test below.
        // When lasso is active, skip hit testing so lasso works over nodes/groups.
        let insideSelectionBox = false;
        if (!engine.lassoSelect && engine.selection.size >= 2 && selBounds) {
          if (
            cx >= selBounds.x &&
            cx <= selBounds.x + selBounds.w &&
            cy >= selBounds.y &&
            cy <= selBounds.y + selBounds.h
          ) {
            insideSelectionBox = true;
          }
        }

        // Check individual selected nodes (for shift-click toggle) or any node
        // Uses rotation-aware hitTestAll so clicks in empty AABB corners
        // of rotated nodes don't count as hits.
        let hit: SpatialNode | null = null;
        if (!engine.lassoSelect) {
          const allHits = engine.hitTestAll(cx, cy, measuredHeights).filter(hitEligible);
          hit = allHits.find((n) => engine.selection.has(n.id) && !engine.isContainerType(n.type)) ?? allHits.find((n) => !engine.isContainerType(n.type)) ?? allHits[0] ?? null;
          // Edge picking runs even inside a multi-selection bounding box —
          // node clicks re-target there, so edge clicks must too; otherwise
          // every edge crossing the box is silently unclickable until the
          // selection is cleared ("sometimes edges won't select").
          const edgePick = getClosestEdgeHit(
            engine.nodes,
            cx,
            cy,
            engine.viewport.zoom,
            measuredHeights,
            resolvePortPositions
          );
          // Ignore edges that aren't in the render scope (both endpoints must be
          // visible) so the hidden loop's edges can't be picked in scope.
          if (edgePick && hitEligible(edgePick.node)) {
            if (!hit) {
              hit = edgePick.node;
            } else if (edgePick.node.z > hit.z) {
              // Unified z-order: the edge paints ABOVE the hit node here, so
              // it is what the user sees under the cursor — it wins the pick.
              // (Alt+click still cycles to what lies underneath.)
              hit = edgePick.node;
            } else if (
              hit.type !== "draw" &&
              hit.type !== "shape" &&
              !engine.isContainerType(hit.type) &&
              edgePick.distance <
                distancePointToBoxNodeBorder(hit, cx, cy, measuredHeights)
            ) {
              hit = edgePick.node;
            }
          }
        }
        if (hit || insideSelectionBox) {
          if (hit) {
            // If inside a group and clicking a node NOT in that group hierarchy → exit
            if (engine.activeGroupId && !engine.isNodeInActiveGroup(hit.id)) {
              engine.exitAllGroups();
            }
            if (e.shiftKey) {
              engine.toggleSelect(hit.id);
            } else if (!engine.selection.has(hit.id)) {
              engine.select(hit.id);
            }
          }
          // Start drag of selected nodes (rAF-throttled + batched for perf)
          // Filter out locked nodes — they stay put while unlocked ones move
          const draggedIds = Array.from(engine.selection).filter(
            (id) => !engine.getNode(id)?.locked
          );
          if (draggedIds.length === 0) return;
          const startX = e.clientX;
          const startY = e.clientY;
          // Include all descendants (recursive) of any frame being dragged
          const frameChildIds = new Set<string>();
          const draggingFrames = new Set<string>();
          for (const id of draggedIds) {
            const n = engine.getNode(id);
            if (n && engine.isContainerType(n.type)) {
              draggingFrames.add(id);
              for (const descId of engine.getFrameDescendantIds(id)) {
                if (!engine.selection.has(descId)) {
                  frameChildIds.add(descId);
                }
              }
            }
          }
          const allDragIds = [...draggedIds, ...frameChildIds];
          const origPositions = allDragIds.map((id) => {
            const n = engine.getNode(id)!;
            return { id, x: n.x, y: n.y };
          });

          // Capture group rotation pivot so we can keep it in sync during drag
          const dragGroupId = engine.selectionGroupId();
          const dragGroupRot = dragGroupId ? engine.groupRotations.get(dragGroupId) : null;
          const origRotCx = dragGroupRot?.cx;
          const origRotCy = dragGroupRot?.cy;
          // Clear active rotation visual; storedRot render path recalculates
          // bounds from live node positions so the box follows the drag
          setGroupRotation(null);

          let didMove = false;
          let rafId: number | null = null;
          let lastClientX = startX;
          let lastClientY = startY;
          let lastModKey = false;

          const allDragIdSet = new Set(allDragIds);
          const dragSnapContext = engine.createDragSnapContext(allDragIdSet);

          const applyMove = () => {
            rafId = null;
            const dx = (lastClientX - startX) / engine.viewport.zoom;
            const dy = (lastClientY - startY) / engine.viewport.zoom;
            const { finalDx, finalDy } = engine.computeDragSnap(
              origPositions, allDragIdSet, dx, dy, lastModKey, dragSnapContext,
            );
            const updates = origPositions.map((orig) => ({
              id: orig.id,
              patch: { x: orig.x + finalDx, y: orig.y + finalDy },
            }));
            engine.updateMany(updates);
            // Keep group rotation pivot in sync with the moved nodes
            if (dragGroupRot && dragGroupId) {
              engine.groupRotations.set(dragGroupId, {
                angle: dragGroupRot.angle,
                cx: origRotCx! + finalDx,
                cy: origRotCy! + finalDy,
              });
            }
          };

          const onMove = (me: PointerEvent) => {
            const dx = (me.clientX - startX) / engine.viewport.zoom;
            const dy = (me.clientY - startY) / engine.viewport.zoom;
            if (!didMove) {
              if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                didMove = true;
                engine.pushHistorySnapshot();
                // gesture:start flips isNodeDragging + pauses the whole-board
                // React mirror; per-node subscriptions render the drag.
                engine.beginNodeGesture(allDragIdSet);
              } else {
                return;
              }
            }
            lastClientX = me.clientX;
            lastClientY = me.clientY;
            lastModKey = me.metaKey || me.ctrlKey;
            if (rafId === null) {
              rafId = requestAnimationFrame(applyMove);
            }
          };
          const onUp = () => {
            if (rafId !== null) {
              cancelAnimationFrame(rafId);
              applyMove();
            }
            engine.clearAlignGuides();
            ownerDoc().removeEventListener("pointermove", onMove);
            ownerDoc().removeEventListener("pointerup", onUp);
            // Update frame membership for nodes that were independently dragged
            // (not as descendants of a dragged frame). This handles:
            // - "move object into frame" → adopt
            // - "move object out of frame" → remove
            // - "move frame into another frame" → nest
            // Frame descendants skip this since they maintain their relative positions.
            if (didMove) {
              const movedIndependentIds = draggedIds.filter(
                (id) => !frameChildIds.has(id)
              );
              if (movedIndependentIds.length > 0) {
                engine.updateFrameMembership(movedIndependentIds);
              }
            }
            // After final mutations so the gesture:end commit captures them.
            engine.endNodeGesture();
          };
          ownerDoc().addEventListener("pointermove", onMove);
          ownerDoc().addEventListener("pointerup", onUp);
        } else {
          // Clicking empty canvas while inside a group → exit group
          if (engine.activeGroupId) {
            engine.exitGroup();
            return;
          }
          // Start marquee or lasso selection
          if (!e.shiftKey) engine.deselectAll();
          const prevSelection = new Set(engine.selection);

          if (engine.lassoSelect) {
            // --- Lasso freeform selection ---
            const lasso: Array<[number, number]> = [[cx, cy]];
            setLassoPoints([...lasso]);

            let lassoRafId: number | null = null;
            let lassoFrameSkip = 0;
            const applyLassoHits = (force = false) => {
              lassoRafId = null;
              const doHitTest = force || lassoFrameSkip % 2 === 0;
              lassoFrameSkip++;
              if (doHitTest && lasso.length >= 3) {
                const hits = getNodesInLassoPolygon(lasso, engine.getAllNodes());
                const hitIds = hits.map((n) => n.id);
                const newIds = e.shiftKey
                  ? [...new Set([...prevSelection, ...hitIds])]
                  : hitIds;
                if (
                  newIds.length !== engine.selection.size ||
                  newIds.some((id) => !engine.selection.has(id))
                ) {
                  engine.selectMultiple(newIds);
                }
              }
              setLassoPoints([...lasso]);
            };

            const onMove = (me: PointerEvent) => {
              const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
              lasso.push([x, y]);
              if (lassoRafId === null) {
                lassoRafId = requestAnimationFrame(() => applyLassoHits(false));
              }
            };
            const onUp = () => {
              if (lassoRafId !== null) cancelAnimationFrame(lassoRafId);
              applyLassoHits(true);
              ownerDoc().removeEventListener("pointermove", onMove);
              ownerDoc().removeEventListener("pointerup", onUp);
              setLassoPoints(null);
              // Exit lasso mode after selection completes
              engine.toggleLassoSelect();
            };
            ownerDoc().addEventListener("pointermove", onMove);
            ownerDoc().addEventListener("pointerup", onUp);
          } else {
            // --- Rectangle marquee selection ---
            const marquee = { startX: cx, startY: cy, endX: cx, endY: cy };
            setSelectionRect(marquee);

            let marqueeRafId: number | null = null;
            let marqueeFrameSkip = 0;
            const applyMarqueeHits = (_useAccurate = false, forceHitTest = false) => {
              marqueeRafId = null;
              const rx = Math.min(marquee.startX, marquee.endX);
              const ry = Math.min(marquee.startY, marquee.endY);
              const rw = Math.abs(marquee.endX - marquee.startX);
              const rh = Math.abs(marquee.endY - marquee.startY);
              const doHitTest =
                forceHitTest || _useAccurate || marqueeFrameSkip % 2 === 0;
              marqueeFrameSkip++;
              if (doHitTest) {
                const hits = getNodesInMarqueeRect(
                  { x: rx, y: ry, w: rw, h: rh },
                  engine.getAllNodes().filter(hitEligible)
                );
                const hitIds = hits.map((n) => n.id);
                const newIds = e.shiftKey
                  ? [...new Set([...prevSelection, ...hitIds])]
                  : hitIds;
                if (
                  newIds.length !== engine.selection.size ||
                  newIds.some((id) => !engine.selection.has(id))
                ) {
                  engine.selectMultiple(newIds);
                }
              }
              setSelectionRect({ ...marquee });
            };

            const onMove = (me: PointerEvent) => {
              const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
              marquee.endX = x;
              marquee.endY = y;

              if (marqueeRafId === null) {
                marqueeRafId = requestAnimationFrame(() => applyMarqueeHits(false));
              }
            };
            const onUp = () => {
              if (marqueeRafId !== null) {
                cancelAnimationFrame(marqueeRafId);
              }
              applyMarqueeHits(true);
              ownerDoc().removeEventListener("pointermove", onMove);
              ownerDoc().removeEventListener("pointerup", onUp);
              setSelectionRect(null);
            };
            ownerDoc().addEventListener("pointermove", onMove);
            ownerDoc().addEventListener("pointerup", onUp);
          }
        }
      } else if (engine.mode === "text") {
        engine.deselectAll();
        const startCx = cx;
        const startCy = cy;
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
        };
        let dragged = false;
        setTextPreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          const dx = Math.abs(preview.endX - preview.startX);
          const dy = Math.abs(preview.endY - preview.startY);
          if (dx > 10 || dy > 10) dragged = true;
          setTextPreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          setTextPreview(null);

          const w = dragged ? Math.max(Math.abs(preview.endX - preview.startX), 60) : 300;
          const x = dragged ? Math.min(preview.startX, preview.endX) : startCx;
          const y = dragged ? Math.min(preview.startY, preview.endY) : startCy;

          // Create the node immediately so collaboration sync works from the start
          createTextNodeAndEdit(x, y, w);
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "note") {
        engine.deselectAll();
        const startCx = cx;
        const startCy = cy;
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
          kind: "note" as const,
        };
        let dragged = false;
        setTextPreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          const dx = Math.abs(preview.endX - preview.startX);
          const dy = Math.abs(preview.endY - preview.startY);
          if (dx > 10 || dy > 10) dragged = true;
          setTextPreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);

          const w = dragged ? Math.max(Math.abs(preview.endX - preview.startX), 100) : 300;
          const h = dragged ? Math.max(Math.abs(preview.endY - preview.startY), 40) : "auto" as const;
          const x = dragged ? Math.min(preview.startX, preview.endX) : startCx;
          const y = dragged ? Math.min(preview.startY, preview.endY) : startCy;

          createBlockNote(x, y, w, h);
          engine.setMode("select");
          // Hold the preview until the real card has painted (see sticky).
          requestAnimationFrame(() => requestAnimationFrame(() => {
            setTextPreview(null);
          }));
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "sticky") {
        engine.deselectAll();
        const startCx = cx;
        const startCy = cy;
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
          kind: "sticky" as const,
        };
        let dragged = false;
        setTextPreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          if (Math.abs(preview.endX - preview.startX) > 10) dragged = true;
          setTextPreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);

          const w = dragged ? Math.max(Math.abs(preview.endX - preview.startX), 100) : 200;
          const x = dragged ? Math.min(preview.startX, preview.endX) : startCx;
          const y = dragged ? Math.min(preview.startY, preview.endY) : startCy;

          const id = nanoid(10);
          const stickyH = dragged ? Math.max(Math.abs(preview.endY - preview.startY), 100) : 150;
          engine.addNode({
            id,
            type: "sticky",
            x,
            y,
            w,
            h: stickyH,
            z: engine.nextZ(),
            data: {
              text: "",
              // Remembered tool defaults (last styled sticky) win over stock
              color: engine.activeTool.stickyColor ?? "#FEF3C7",
              fontSize: engine.activeTool.stickyFontSize,
            },
          } as StickyNoteNode);
          engine.select(id);
          setEditingStickyId(id);
          engine.setMode("select");
          // Keep the preview up until the real node has painted underneath —
          // clearing immediately leaves an empty frame (visible blink). The
          // preview matches the final rendering (its look is frozen via
          // `kind`), so nothing shifts at the swap.
          requestAnimationFrame(() => requestAnimationFrame(() => {
            setTextPreview(null);
          }));
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "table") {
        engine.deselectAll();
        const startCx = cx;
        const startCy = cy;
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
          kind: "table" as const,
        };
        let dragged = false;
        setTextPreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          if (Math.abs(preview.endX - preview.startX) > 10 || Math.abs(preview.endY - preview.startY) > 10) dragged = true;
          setTextPreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);

          // Drag lays out cells at the standard size — the dragged rect decides
          // how many rows/columns; a plain click drops the tool's default grid.
          const dragW = Math.abs(preview.endX - preview.startX);
          const dragH = Math.abs(preview.endY - preview.startY);
          const cols = dragged
            ? Math.max(1, Math.min(12, Math.round(dragW / TABLE_CELL_W)))
            : Math.max(1, Math.min(12, Math.round(engine.activeTool.tableCols ?? 3)));
          const rows = dragged
            ? Math.max(1, Math.min(50, Math.round(dragH / TABLE_CELL_H)))
            : Math.max(1, Math.min(50, Math.round(engine.activeTool.tableRows ?? 3)));
          const x = dragged ? Math.min(preview.startX, preview.endX) : startCx;
          const y = dragged ? Math.min(preview.startY, preview.endY) : startCy;

          const id = engine.createTable(
            Array.from({ length: rows }, () => Array.from({ length: cols }, () => "")),
            x,
            y,
            { w: cols * TABLE_CELL_W, roughness: engine.activeTool.roughness },
          );
          engine.select(id);
          engine.setMode("select");
          // Hold the preview until the real table has painted (see sticky).
          requestAnimationFrame(() => requestAnimationFrame(() => {
            setTextPreview(null);
          }));
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "draw") {
        const pressure = e.pressure || 0.5;
        const stroke = {
          points: [[cx, cy, pressure]] as Array<[number, number, number]>,
          color: engine.activeTool.color,
          width: engine.activeTool.width,
          strokeStyle: engine.activeTool.strokeStyle as StrokeStyle | undefined,
          opacity: engine.activeTool.opacity,
          // Brush variant + future node id: the airbrush spray is seeded by
          // the node id, so the id is minted at gesture start and the live
          // stroke renders the exact grains the committed node will have.
          tool: (engine.activeTool.tool === "airbrush" ? "airbrush" : "pen") as "pen" | "airbrush",
          seed: nanoid(10),
        };
        // Minted once: the committed node keeps the z the live stroke drew at.
        const z = engine.nextZ();
        const fill = engine.activeTool.fillColor || undefined;
        const fillStyle = engine.activeTool.fillStyle || undefined;
        // The live stroke and the committed node come from ONE builder, so
        // pointer-up cannot change what's on screen by construction.
        const buildNode = (): DrawNode => {
          let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity;
          for (const [px, py] of stroke.points) {
            if (px < minX) minX = px;
            if (py < minY) minY = py;
            if (px > maxX) maxX = px;
            if (py > maxY) maxY = py;
          }
          return {
            id: stroke.seed,
            type: "draw",
            x: minX,
            y: minY,
            w: maxX - minX,
            h: maxY - minY,
            z,
            data: {
              tool: stroke.tool,
              // Points stored relative to bounding box origin
              points: stroke.points.map(
                ([px, py, p]) =>
                  [px - minX, py - minY, p] as [number, number, number]
              ),
              color: stroke.color,
              strokeWidth: stroke.width,
              opacity: stroke.opacity,
              fill,
              fillStyle,
              strokeStyle: stroke.strokeStyle || undefined,
            },
          } as DrawNode;
        };
        engine.notifyDrawProgress(stroke);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          const p = me.pressure || 0.5;
          stroke.points.push([x, y, p]);
          setActiveStrokeNode(buildNode());
          // Fresh snapshot for the awareness channel (consumers hold the ref).
          engine.notifyDrawProgress({ ...stroke, points: [...stroke.points] });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);

          if (stroke.points.length < 2) {
            engine.notifyDrawEnd();
            setActiveStrokeNode(null);
            return;
          }

          // Committing is a no-op on screen: the engine node enters under the
          // SAME id the DOM-layer NodeItem is already mounted with, so React
          // keeps the instance and the pixels don't change. The local copy is
          // id-deduped out once the engine mirror delivers the node (next
          // frame), then cleared here — guarded so a fast follow-up stroke is
          // never clobbered.
          const node = buildNode();
          engine.addNode(node);
          requestAnimationFrame(() => {
            setActiveStrokeNode((cur) => (cur?.id === node.id ? null : cur));
            // End the collab live-stroke one frame later so peers keep the
            // awareness overlay until the doc write reaches them (their
            // holdover logic bridges any remaining gap).
            requestAnimationFrame(() => {
              engine.notifyDrawEnd();
            });
          });
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "shape") {
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
          nodeId: nanoid(10),
        };
        setShapePreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          setShapePreview({ ...preview });
          // Match SVGLayer `shapePreviewStyle` so remote peers see the same preview.
          engine.notifyShapeProgress({
            ...preview,
            shapeType: engine.activeTool.shapeType || "rect",
            stroke: engine.activeTool.color,
            strokeWidth: engine.activeTool.width,
            roughness: engine.activeTool.roughness ?? 1,
            fill: engine.activeTool.fillColor,
            fillStyle: engine.activeTool.fillStyle,
            strokeStyle: engine.activeTool.strokeStyle,
            opacity: engine.activeTool.opacity ?? 1,
            edgeStyle: engine.activeTool.edgeStyle,
            seed: preview.nodeId,
          });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);

          const shapeType = engine.activeTool.shapeType || "rect";
          const isLinear = shapeType === "line" || shapeType === "arrow";

          const x = Math.min(preview.startX, preview.endX);
          let y = Math.min(preview.startY, preview.endY);
          const w = Math.abs(preview.endX - preview.startX);
          const rawH = Math.abs(preview.endY - preview.startY);
          let h: number;
          if (isLinear) {
            // Ensure bounding box is tall enough for the stroke to be visible/selectable
            const minH = engine.activeTool.width * 2;
            h = Math.max(rawH, minH);
            if (rawH < minH) {
              // Center the line within the padded box
              y -= (minH - rawH) / 2;
            }
          } else {
            h = rawH;
          }

          if (w < 5 && (isLinear ? w < 5 && Math.abs(preview.endY - preview.startY) < 5 : h < 5)) {
            engine.notifyShapeEnd();
            setShapePreview(null);
            return;
          }

          // For line/arrow, compute relative start/end points
          const lineData: Pick<ShapeNode["data"], "startPoint" | "endPoint"> = {};
          if (isLinear) {
            lineData.startPoint = [
              preview.startX - x,
              preview.startY - y,
            ];
            lineData.endPoint = [
              preview.endX - x,
              preview.endY - y,
            ];
          }

          // Reuse the id the rough preview was seeded with — the committed
          // node then renders stroke-identical to what the drag showed.
          const nodeId = preview.nodeId;
          engine.addNode({
            id: nodeId,
            type: "shape",
            x,
            y,
            w,
            h,
            z: engine.nextZ(),
            data: {
              shape: shapeType,
              stroke: engine.activeTool.color,
              fill: engine.activeTool.fillColor || undefined,
              fillStyle: engine.activeTool.fillStyle,
              strokeWidth: engine.activeTool.width,
              strokeStyle: engine.activeTool.strokeStyle,
              edgeStyle: engine.activeTool.edgeStyle,
              roughness: engine.activeTool.roughness ?? 1,
              opacity: engine.activeTool.opacity ?? 1,
              ...lineData,
            },
          } as ShapeNode);
          requestAnimationFrame(() => {
            setShapePreview(null);
            requestAnimationFrame(() => {
              engine.notifyShapeEnd();
            });
          });
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "edge") {
        // Edge creation: drag from source node to target node
        const sourceNode = engine.hitTest(cx, cy, measuredHeights);
        if (!sourceNode || sourceNode.type === "edge") return;

        const isFreeForm = engine.freeFormEdges;
        // Source anchor honors the press point: deep inside the node (beyond
        // the border band) → interior [u,v] anchor right there; near the
        // border → classic perimeter attach. Symmetric with the drop end.
        let edgeSourceT: number | [number, number] | undefined;
        if (isFreeForm) {
          const spp = nearestPerimeterPoint(sourceNode, cx, cy, measuredHeights);
          edgeSourceT = spp.t;
          if (Math.hypot(spp.x - cx, spp.y - cy) > INTERIOR_ANCHOR_BAND_PX / engine.viewport.zoom) {
            const uv = nearestInteriorUV(sourceNode, cx, cy, measuredHeights);
            if (uv[0] > 0 && uv[0] < 1 && uv[1] > 0 && uv[1] < 1) edgeSourceT = uv;
          }
        }
        setEdgePreview({
          fromNode: sourceNode, cursorX: cx, cursorY: cy, sourceT: edgeSourceT,
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

          // Fallback: find the nearest node by perimeter distance, then handle midpoints.
          if (!targetNode || targetNode.type === "edge" || engine.isContainerType(targetNode.type)) {
            const snapThreshold = 50 / engine.viewport.zoom;
            let bestDist = Infinity;
            let bestIsFrame = false;
            let bestNode: SpatialNode | null = null;
            for (const n of engine.getAllNodes()) {
              if (n.type === "edge" || n.id === sourceNode.id) continue;
              const isFrame = engine.isContainerType(n.type);
              // Check perimeter distance (catches free-form snap points)
              const pp = nearestPerimeterPoint(n, x, y, measuredHeights);
              const perimDist = Math.hypot(pp.x - x, pp.y - y);
              if (perimDist < snapThreshold) {
                if (isFrame && !bestIsFrame && bestNode) continue;
                if ((!isFrame && bestIsFrame) || perimDist < bestDist) {
                  bestDist = perimDist;
                  bestIsFrame = isFrame;
                  bestNode = n;
                }
              }
            }
            if (bestNode) targetNode = bestNode;
          }

          // Must land on a different, non-edge node
          if (
            !targetNode ||
            targetNode.type === "edge" ||
            targetNode.id === sourceNode.id
          )
            return;

          // Determine which handles/t-values the edge connects to. A drop DEEP
          // inside the target (beyond the border band) anchors at that interior
          // [u,v] point — the arrow lands exactly where you let go; near the
          // border it snaps to the perimeter as before.
          const sourceHandle = isFreeForm ? undefined : nearestHandle(sourceNode, cx, cy, measuredHeights);
          const targetHandle = isFreeForm ? undefined : nearestHandle(targetNode, x, y, measuredHeights);
          let edgeTargetT: number | [number, number] | undefined;
          if (isFreeForm) {
            const pp = nearestPerimeterPoint(targetNode, x, y, measuredHeights);
            edgeTargetT = pp.t;
            if (Math.hypot(pp.x - x, pp.y - y) > INTERIOR_ANCHOR_BAND_PX / engine.viewport.zoom) {
              const uv = nearestInteriorUV(targetNode, x, y, measuredHeights);
              if (uv[0] > 0 && uv[0] < 1 && uv[1] > 0 && uv[1] < 1) edgeTargetT = uv;
            }
          }

          // Allow parallel edges between the same nodes, but block exact duplicates.
          const duplicate = engine.getAllNodes().some((n) => {
            if (n.type !== "edge") return false;
            const ed = (n as EdgeNode).data;
            if (isFreeForm) {
              // Near-match dedupe applies to perimeter Ts only — interior [u,v]
              // anchors are deliberate placements, so duplicates are allowed.
              if (typeof edgeSourceT !== "number" || typeof edgeTargetT !== "number") return false;
              return ed.fromId === sourceNode.id && ed.toId === targetNode.id &&
                typeof ed.sourceT === "number" && typeof ed.targetT === "number" &&
                Math.abs(ed.sourceT - edgeSourceT) < 0.02 && Math.abs(ed.targetT - edgeTargetT) < 0.02;
            }
            return isExactEdgeConnectionDuplicate(ed, {
              fromId: sourceNode.id,
              toId: targetNode.id,
              sourceHandle: sourceHandle!,
              targetHandle: targetHandle!,
            });
          });
          if (duplicate) return;

          const edgeNode: EdgeNode = {
            id: nanoid(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: engine.nextZ(),
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
              sourceHandle,
              targetHandle,
              sourceT: edgeSourceT,
              targetT: edgeTargetT,
            },
          };
          engine.addNode(edgeNode);
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "frame") {
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
        };
        setShapePreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          setShapePreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);

          const x = Math.min(preview.startX, preview.endX);
          const y = Math.min(preview.startY, preview.endY);
          const w = Math.abs(preview.endX - preview.startX);
          const h = Math.abs(preview.endY - preview.startY);

          if (w < 20 || h < 20) {
            setShapePreview(null);
            return;
          }

          const id = nanoid(10);
          engine.addNode({
            id,
            type: "frame",
            x,
            y,
            w,
            h,
            z: engine.nextZ(),
            data: {
              label: labels.typeFrame,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed",
            },
          } as FrameNode);
          // Adopt existing nodes that fall inside the newly drawn frame
          engine.adoptNodesIntoNewFrame(id);
          setShapePreview(null);
          engine.select(id);
          engine.setMode("select");
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "erase") {
        if (e.button !== 0) return;

        // Helper: mark all elements at a canvas point
        const markAt = (px: number, py: number) => {
          const hits = engine.hitTestAll(px, py, measuredHeights);
          const edgeHits = hitTestAllEdges(
            engine.nodes,
            px,
            py,
            engine.viewport.zoom,
            measuredHeights,
            resolvePortPositions
          );
          let changed = false;
          for (const h of [...hits, ...edgeHits]) {
            if (!eraserMarkedRef.current.has(h.id)) {
              eraserMarkedRef.current.add(h.id);
              changed = true;
            }
          }
          if (changed) {
            setEraserMarkedIds(new Set(eraserMarkedRef.current));
          }
        };

        const TRAIL_LIFETIME = 400; // ms — how long trail points live (Date.now() timestamps for remote parity)

        // Initialize trail and marks
        eraserMarkedRef.current = new Set();
        const now = Date.now();
        eraserTrailRef.current = [[cx, cy, now]];
        setEraserTrail([[cx, cy, now]]);
        markAt(cx, cy);
        emitEraserCollab(true);

        let lastCx = cx;
        let lastCy = cy;

        // Continuous fade loop — trims old trail points every frame
        const fadeLoop = () => {
          const t = Date.now();
          const before = eraserTrailRef.current.length;
          eraserTrailRef.current = eraserTrailRef.current.filter(
            (p) => t - p[2] < TRAIL_LIFETIME
          );
          if (eraserTrailRef.current.length !== before) {
            setEraserTrail([...eraserTrailRef.current]);
          }
          emitEraserCollab();
          eraserFadeRafRef.current = requestAnimationFrame(fadeLoop);
        };
        eraserFadeRafRef.current = requestAnimationFrame(fadeLoop);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          lastCx = x;
          lastCy = y;
          const t = Date.now();
          eraserTrailRef.current.push([lastCx, lastCy, t]);
          setEraserTrail([...eraserTrailRef.current]);
          markAt(lastCx, lastCy);
          emitEraserCollab(true);
        };

        const clearState = () => {
          if (eraserFadeRafRef.current !== null) {
            cancelAnimationFrame(eraserFadeRafRef.current);
            eraserFadeRafRef.current = null;
          }
          engine.notifyEraserEnd();
          eraserMarkedRef.current = new Set();
          setEraserMarkedIds(new Set());
          eraserTrailRef.current = [];
          setEraserTrail([]);
        };

        const onUp = () => {
          cleanup();
          const ids = Array.from(eraserMarkedRef.current);
          emitEraserCollab(true);
          clearState();
          if (ids.length > 0) {
            engine.deleteNodes(ids);
          }
        };

        const onKeyDown = (ke: KeyboardEvent) => {
          if (ke.key === "Escape") {
            cleanup();
            emitEraserCollab(true);
            clearState();
          }
        };

        const cleanup = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          ownerDoc().removeEventListener("keydown", onKeyDown);
        };

        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
        ownerDoc().addEventListener("keydown", onKeyDown);
      } else if (engine.mode === "laser") {
        if (e.button !== 0) return;
        const TRAIL_LIFETIME = 1560;

        // Cancel any existing fade loop (will be restarted below with merged trail)
        if (laserFadeRafRef.current !== null) {
          cancelAnimationFrame(laserFadeRafRef.current);
          laserFadeRafRef.current = null;
        }

        const now = performance.now();
        // Insert a NaN break marker so the renderer starts a new sub-path
        if (laserTrailRef.current.length > 0) {
          laserTrailRef.current.push([NaN, NaN, now]);
        }
        laserTrailRef.current.push([cx, cy, now]);
        setLaserTrail([...laserTrailRef.current]);
        engine.notifyLaserProgress([[cx, cy]]);

        // Broadcast throttle — awareness updates are expensive, limit to ~60ms
        let lastBroadcast = now;

        // Continuous fade loop — trims expired points every frame
        const fadeLoop = () => {
          const t = performance.now();
          const before = laserTrailRef.current.length;
          laserTrailRef.current = laserTrailRef.current.filter(
            (p) => t - p[2] < TRAIL_LIFETIME
          );
          if (laserTrailRef.current.length !== before || laserTrailRef.current.length > 0) {
            setLaserTrail([...laserTrailRef.current]);
          }
          // Broadcast periodically as points expire (so remote sees trail shrinking)
          if (t - lastBroadcast >= 60) {
            lastBroadcast = t;
            if (laserTrailRef.current.length > 0) {
              engine.notifyLaserProgress(
                laserTrailRef.current.map((p) => [p[0], p[1]] as [number, number])
              );
            }
          }
          if (laserTrailRef.current.length > 0) {
            laserFadeRafRef.current = requestAnimationFrame(fadeLoop);
          } else {
            laserFadeRafRef.current = null;
            setLaserTrail([]);
            engine.notifyLaserEnd();
          }
        };
        laserFadeRafRef.current = requestAnimationFrame(fadeLoop);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          const t = performance.now();
          laserTrailRef.current.push([x, y, t]);
          setLaserTrail([...laserTrailRef.current]);
          engine.notifyLaserProgress(
            laserTrailRef.current.map((p) => [p[0], p[1]] as [number, number])
          );
        };

        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          // fadeLoop continues running until all points expire naturally
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "hand") {
        if (e.button !== 0) return;
        e.preventDefault();
        const vpStartX = engine.viewport.x;
        const vpStartY = engine.viewport.y;
        const startX = e.clientX;
        const startY = e.clientY;

        // Switch to grabbing cursor while dragging
        const container = containerRef.current;
        if (container) container.style.cursor = "grabbing";

        const onMove = (me: PointerEvent) => {
          engine.viewport.x = vpStartX + (me.clientX - startX);
          engine.viewport.y = vpStartY + (me.clientY - startY);
          setViewport({ ...engine.viewport });
        };
        const onUp = () => {
          if (container) container.style.cursor = engine.lassoSelect ? LASSO_CURSOR : getCursorForMode(engine.mode);
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      }
    },
    [
      engine,
      createBlockNote,
      createTextNodeAndEdit,
      contextMenu,
      buildContextMenuSections,
      selBounds,
      measuredHeights,
      getNodeAABB,
      getNodesInMarqueeRect,
      emitCanvasInteraction,
    ]
  );

  // Clear eraser state when leaving erase mode (companion to the cursor +
  // hover-clear half that lives in useHoverCursor).
  useEffect(() => {
    if (mode !== "erase") {
      if (eraserFadeRafRef.current !== null) {
        cancelAnimationFrame(eraserFadeRafRef.current);
        eraserFadeRafRef.current = null;
      }
      eraserMarkedRef.current = new Set();
      setEraserMarkedIds(new Set());
      eraserTrailRef.current = [];
      setEraserTrail([]);
      engine.notifyEraserEnd();
    }
  }, [mode, engine]);

  return {
    handlePointerDown,
    selectionRect,
    lassoPoints,
    activeStrokeNode,
    shapePreview,
    textPreview,
    eraserTrail,
    eraserMarkedIds,
    laserTrail,
  };
}
