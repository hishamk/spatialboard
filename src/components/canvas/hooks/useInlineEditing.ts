import { useState, useRef, useEffect } from "react";
import type { RefObject } from "react";
import { flushSync } from "react-dom";
import type { SpatialEngine } from "../../../engine/SpatialEngine";

/**
 * Inline-editing slots for the canvas — the six mutually-exclusive "which node
 * is being edited" ids (text / sticky / frame-label / shape-label / image-crop /
 * youtube), their derived `editingNodeId`, the creation-tracking refs, and the
 * two effects that own them: the engine crop-request listener (sidebar → crop
 * mode) and the capture-phase input-leakage suppressor active while a canvas
 * text node is being edited.
 *
 * Pure mechanical extraction from SpatialCanvas — every setter/ref identity,
 * effect body, and dependency array is preserved byte-for-byte. The returned
 * setters/refs are the SAME stable identities the rest of the component +
 * `nodeItemCtx` consume, so no downstream dependency array changes.
 */
export function useInlineEditing(
  engine: SpatialEngine,
  containerRef: RefObject<HTMLDivElement>,
) {
  /** Get the ownerDocument of the canvas container (supports pop-out windows). */
  const ownerDoc = () => containerRef.current?.ownerDocument ?? document;

  // Text node inline editing state
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const editClickRef = useRef<{ clientX: number; clientY: number } | null>(null);

  // Frame label inline editing state
  const [editingFrameLabelId, setEditingFrameLabelId] = useState<string | null>(null);

  // Sticky note inline editing state
  const [editingStickyId, setEditingStickyId] = useState<string | null>(null);

  // Shape/draw label inline editing state
  const [editingShapeLabelId, setEditingShapeLabelId] = useState<string | null>(null);

  // Image crop mode state
  const [croppingImageId, setCroppingImageId] = useState<string | null>(null);
  const [editingYouTubeId, setEditingYouTubeId] = useState<string | null>(null);

  // Listen for crop-start requests from the sidebar via engine event
  useEffect(() => {
    const handler = (nodeId: string) => {
      flushSync(() => setCroppingImageId(nodeId));
    };
    engine.on("image:cropRequest", handler);
    return () => engine.off("image:cropRequest", handler);
  }, [engine]);

  const editingNodeId = editingTextId || editingStickyId || editingFrameLabelId || editingShapeLabelId || croppingImageId || editingYouTubeId;

  // Track newly-created text nodes so we can delete them if the user commits empty text
  const newlyCreatedTextRef = useRef<string | null>(null);

  // A text node created by a tool click that the user never typed into does
  // NOT persist — otherwise every stray click leaves an invisible empty node.
  // Runs when the edit session for the tracked node ends (the block's commit
  // effects have already written the final text by then). skipHistory keeps
  // the phantom out of undo — undoing lands back before the creation.
  const prevEditingTextIdRef = useRef<string | null>(null);
  useEffect(() => {
    const prev = prevEditingTextIdRef.current;
    prevEditingTextIdRef.current = editingTextId;
    if (!prev || prev === editingTextId) return;
    if (newlyCreatedTextRef.current !== prev) return;
    newlyCreatedTextRef.current = null;
    const n = engine.getNode(prev);
    if (n && n.type === "text" && !(n.data as { text: string }).text.trim()) {
      engine.deleteNode(prev, { skipHistory: true });
    }
  }, [editingTextId, engine]);
  // Guard newly created text editing against immediate selection churn.
  const textEditLockRef = useRef<{ id: string; until: number } | null>(null);
  // Track the last content block created locally so only the creator auto-enters edit mode
  const newlyCreatedBlockNoteIdRef = useRef<string | null>(null);

  // While editing canvas text, suppress input leakage to sibling editors
  // (e.g. BlockNote/TipTap) that may retain global key/beforeinput handlers.
  useEffect(() => {
    if (!editingTextId) return;

    const doc = ownerDoc();

    const getCanvasEditable = (root: HTMLElement) =>
      root.querySelector(
        `[data-node-id="${editingTextId}"] [contenteditable="true"]`
      ) as HTMLElement | null;

    const isEditableEl = (el: Element | null): el is HTMLElement => {
      if (!el || !(el instanceof HTMLElement)) return false;
      return (
        el.isContentEditable ||
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement
      );
    };

    const shouldBlockKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return false;
      if (e.key.length === 1) return true; // printable characters
      return (
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "Enter" ||
        e.key === "Tab" ||
        e.key === " "
      );
    };

    const shouldBlockBeforeInput = (e: InputEvent) => {
      if (e.inputType.startsWith("insert")) return true;
      if (e.inputType.startsWith("delete")) return true;
      return false;
    };

    const blockAndRefocus = (e: Event) => {
      const root = containerRef.current;
      if (!root) return;
      const target = e.target as Node | null;
      if (target && root.contains(target)) return;

      e.preventDefault();
      e.stopPropagation();
      if ("stopImmediatePropagation" in e && typeof e.stopImmediatePropagation === "function") {
        e.stopImmediatePropagation();
      }

      const editable = getCanvasEditable(root);
      if (editable) editable.focus();
    };

    const onKeyDownCapture = (e: KeyboardEvent) => {
      if (!shouldBlockKey(e)) return;
      blockAndRefocus(e);
    };

    const onBeforeInputCapture = (e: InputEvent) => {
      if (!shouldBlockBeforeInput(e)) return;
      blockAndRefocus(e);
    };

    const onFocusInCapture = (e: FocusEvent) => {
      const root = containerRef.current;
      if (!root) return;
      const target = e.target as Element | null;
      if (!target || root.contains(target)) return;
      if (!isEditableEl(target)) return;

      const editable = getCanvasEditable(root);
      // Defer so we don't fight browser focus updates in the same tick.
      requestAnimationFrame(() => {
        try {
          (target as HTMLElement).blur();
        } catch {
          // ignore
        }
        if (editable) editable.focus();
      });
    };

    doc.addEventListener("keydown", onKeyDownCapture, true);
    doc.addEventListener("beforeinput", onBeforeInputCapture as EventListener, true);
    doc.addEventListener("focusin", onFocusInCapture, true);

    return () => {
      doc.removeEventListener("keydown", onKeyDownCapture, true);
      doc.removeEventListener("beforeinput", onBeforeInputCapture as EventListener, true);
      doc.removeEventListener("focusin", onFocusInCapture, true);
    };
  }, [editingTextId]);

  return {
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
    editingYouTubeId,
    setEditingYouTubeId,
    editingNodeId,
    editClickRef,
    newlyCreatedTextRef,
    textEditLockRef,
    newlyCreatedBlockNoteIdRef,
  };
}
