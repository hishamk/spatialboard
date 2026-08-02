import { useState, useEffect } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { SpatialSearchState, BoardBackground } from "../../../engine/SpatialEngine";
import type { Viewport, SpatialNode, Mode } from "../../../engine/types";
import { getCursorForMode, LASSO_CURSOR } from "../canvas-helpers";
import type { GroupRotationState } from "./useNodeTransforms";

/**
 * The engine-mirror sync spine — the React state that mirrors the engine plus
 * the master subscription that keeps it in sync. Pure mechanical extraction
 * from SpatialCanvas: every guard, dependency array, and effect body is
 * preserved byte-for-byte. This code is performance-load-bearing (the
 * `handleChange` gesture gate, the `handleGuides` bail-if-unchanged, the
 * gesture force-end safety net) — nothing here may change behaviour.
 *
 * The editing-slot setters + `textEditLockRef` live in `useInlineEditing`, and
 * `setGroupRotation`'s state lives in the orchestrator; both are threaded in so
 * `handleSelection` can clear them on selection change exactly as before.
 */
export function useEngineMirror(
  engine: SpatialEngine,
  {
    setEditingTextId,
    setEditingStickyId,
    setEditingFrameLabelId,
    setEditingShapeLabelId,
    setCroppingImageId,
    setGroupRotation,
    textEditLockRef,
    containerRef,
  }: {
    setEditingTextId: Dispatch<SetStateAction<string | null>>;
    setEditingStickyId: Dispatch<SetStateAction<string | null>>;
    setEditingFrameLabelId: Dispatch<SetStateAction<string | null>>;
    setEditingShapeLabelId: Dispatch<SetStateAction<string | null>>;
    setCroppingImageId: Dispatch<SetStateAction<string | null>>;
    setGroupRotation: Dispatch<SetStateAction<GroupRotationState | null>>;
    textEditLockRef: React.MutableRefObject<{ id: string; until: number } | null>;
    containerRef: RefObject<HTMLDivElement>;
  },
) {
  const [viewport, setViewport] = useState<Viewport>({ ...engine.viewport });
  const [nodes, setNodes] = useState<SpatialNode[]>(engine.getAllNodes());
  const [selection, setSelection] = useState<Set<string>>(
    new Set(engine.selection)
  );
  const [isNodeDragging, setIsNodeDragging] = useState(false);
  const [mode, setMode] = useState<Mode>(engine.mode);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(engine.activeGroupId);
  const [searchState, setSearchState] = useState<SpatialSearchState>(() => engine.getSearchState());
  const [gridActive, setGridActive] = useState(engine.snapToGrid);
  const [gridSize, setGridSize] = useState(engine.gridSize);
  const [smartGuidesActive, setSmartGuidesActive] = useState(engine.smartGuides);
  // Alignment guides render via LiveSVGLayerHost's own engine subscription —
  // holding them in parent state would re-render the whole canvas per frame
  // during snap-enabled drags.
  const [boardBackground, setBoardBackground] = useState<BoardBackground>(engine.boardBackground);

  // Subscribe to engine events
  useEffect(() => {
    let changeRafId: number | null = null;
    const handleChange = () => {
      // While a pointer gesture is active the whole-board mirror pauses:
      // NodeItem / LiveSVGLayerHost / SelectionChromeOverlay subscribe to
      // the engine directly and keep the moving pieces rendering. The
      // engine itself still mutates + emits per frame (collab sync relies
      // on that); gesture:end below commits the mirror once.
      if (engine.gestureActive) return;
      if (changeRafId !== null) return;
      changeRafId = requestAnimationFrame(() => {
        changeRafId = null;
        if (engine.gestureActive) return; // gesture began after scheduling
        setNodes(engine.getAllNodes());
      });
    };
    // Safety net: if a gesture loop dies without calling endNodeGesture
    // (pointercancel, error), force-end after the loop's own pointerup
    // handlers had their chance — otherwise the board would stay frozen.
    const forceEndGesture = () => {
      setTimeout(() => engine.endNodeGesture(), 0);
    };
    const gestureWindow = () =>
      containerRef.current?.ownerDocument.defaultView ?? window;
    const handleGestureStart = () => {
      setIsNodeDragging(true);
      const win = gestureWindow();
      win.addEventListener("pointerup", forceEndGesture, { capture: true });
      win.addEventListener("pointercancel", forceEndGesture, { capture: true });
    };
    const handleGestureEnd = () => {
      const win = gestureWindow();
      win.removeEventListener("pointerup", forceEndGesture, { capture: true });
      win.removeEventListener("pointercancel", forceEndGesture, { capture: true });
      setIsNodeDragging(false);
      setNodes(engine.getAllNodes());
    };
    let viewportRafId: number | null = null;
    const handleViewport = () => {
      if (viewportRafId !== null) return;
      viewportRafId = requestAnimationFrame(() => {
        viewportRafId = null;
        setViewport({ ...engine.viewport });
      });
    };
    const handleSelection = () => {
      setSelection((prev) => {
        const next = new Set(engine.selection);
        if (prev.size !== next.size || [...prev].some((id) => !next.has(id))) {
          // Clear text/frame-label editing when selection changes to a different node.
          // For newly-created text nodes, keep edit mode briefly to survive pointer/selection churn
          // until the contentEditable mounts and focus settles.
          setEditingTextId((cur) => {
            if (!cur || next.has(cur)) return cur;
            const lock = textEditLockRef.current;
            if (lock && lock.id === cur && performance.now() < lock.until) return cur;
            return null;
          });
          setEditingFrameLabelId((cur) => (cur && !next.has(cur) ? null : cur));
          setEditingStickyId((cur) => (cur && !next.has(cur) ? null : cur));
          setEditingShapeLabelId((cur) => (cur && !next.has(cur) ? null : cur));
          setCroppingImageId((cur) => (cur && !next.has(cur) ? null : cur));
          // Clear ad-hoc rotation when selection changes;
          // persisted group rotation is restored from engine.groupRotations
          setGroupRotation(null);
          return next;
        }
        return prev;
      });
    };
    const handleMode = () => {
      setMode(engine.mode);
      // Clear selection when entering edge mode to hide bounding boxes
      if (engine.mode === "edge") engine.deselectAll();
    };
    const handleBackground = () => setBoardBackground(engine.boardBackground);
    const handleGuides = () => {
      // Align guides are drawn by LiveSVGLayerHost (live engine read); only
      // the grid/smart-guide settings mirror into React state here. These
      // setters bail out when unchanged, so per-frame guide emits during
      // snap drags don't re-render the canvas.
      setGridActive(engine.snapToGrid);
      setGridSize(engine.gridSize);
      setSmartGuidesActive(engine.smartGuides);
    };
    const handleSearch = () => setSearchState(engine.getSearchState());

    engine.on("change", handleChange);
    engine.on("viewport", handleViewport);
    engine.on("selection", handleSelection);
    engine.on("mode", handleMode);
    engine.on("background", handleBackground);
    engine.on("guides", handleGuides);
    engine.on("search", handleSearch);
    engine.on("gesture:start", handleGestureStart);
    engine.on("gesture:end", handleGestureEnd);

    const onGroupEnter = (groupId: string) => setActiveGroupId(groupId);
    const onGroupExit = () => setActiveGroupId(null);
    const onLassoToggle = () => {
      const container = containerRef.current;
      if (container) {
        container.style.cursor = engine.lassoSelect ? LASSO_CURSOR : getCursorForMode(engine.mode);
      }
    };
    engine.on("group:enter", onGroupEnter);
    engine.on("group:exit", onGroupExit);
    engine.on("lassoToggle", onLassoToggle);

    return () => {
      if (changeRafId !== null) cancelAnimationFrame(changeRafId);
      if (viewportRafId !== null) cancelAnimationFrame(viewportRafId);
      engine.off("change", handleChange);
      engine.off("viewport", handleViewport);
      engine.off("selection", handleSelection);
      engine.off("mode", handleMode);
      engine.off("background", handleBackground);
      engine.off("guides", handleGuides);
      engine.off("search", handleSearch);
      engine.off("gesture:start", handleGestureStart);
      engine.off("gesture:end", handleGestureEnd);
      const win = gestureWindow();
      win.removeEventListener("pointerup", forceEndGesture, { capture: true });
      win.removeEventListener("pointercancel", forceEndGesture, { capture: true });
      engine.off("group:enter", onGroupEnter);
      engine.off("group:exit", onGroupExit);
      engine.off("lassoToggle", onLassoToggle);
    };
  }, [engine]);

  // Native wheel handler (passive: false for preventDefault)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      // Let scrollable editor areas handle their own vertical scroll
      if (!e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        const editorWrap = target.closest(".sb-editor-wrap") as HTMLElement | null;
        if (editorWrap && editorWrap.scrollHeight > editorWrap.clientHeight) {
          const atTop = editorWrap.scrollTop <= 0 && e.deltaY < 0;
          const atBottom =
            editorWrap.scrollTop + editorWrap.clientHeight >=
            editorWrap.scrollHeight && e.deltaY > 0;
          if (!atTop && !atBottom) return; // let editor scroll naturally
        }
      }

      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        engine.zoomByWheel(e.deltaY, e.clientX, e.clientY);
      } else {
        engine.pan(-e.deltaX, -e.deltaY);
      }
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [engine]);

  return {
    nodes,
    viewport,
    selection,
    isNodeDragging,
    mode,
    activeGroupId,
    searchState,
    gridActive,
    gridSize,
    smartGuidesActive,
    boardBackground,
    setViewport,
    setGridActive,
    setSmartGuidesActive,
  };
}
