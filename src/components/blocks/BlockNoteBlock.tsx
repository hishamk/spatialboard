import { Component, type ErrorInfo, memo, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import type { BlockNoteNode } from "../../engine/types";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { SBDSchema } from "../../schema";
import { getRotatedCursor } from "../../interactions/resize-cursors";
import { observeResize } from "../../utils/shared-resize-observer";
import { applyCornerAspectLock } from "../../interactions/resize-aspect";

// ---------------------------------------------------------------------------
// Error Boundary – catches ProseMirror/TipTap mount crashes (e.g. the known
// DecorationGroup.locals "localsInner" bug) and falls back to a static
// markdown render so the rest of the canvas remains usable.
// ---------------------------------------------------------------------------

interface EditorErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}
interface EditorErrorBoundaryState {
  hasError: boolean;
}

class EditorErrorBoundary extends Component<EditorErrorBoundaryProps, EditorErrorBoundaryState> {
  state: EditorErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): EditorErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[BlockNoteBlock] Editor mount failed, showing markdown fallback:", error, info);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/** Static markdown fallback rendered when the BlockNote editor fails to mount. */
function MarkdownFallback({ markdown }: { markdown: string }) {
  return (
    <div
      className="sb-markdown-fallback"
      style={{
        padding: "8px 12px",
        fontSize: 14,
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        color: "#374151",
        opacity: 0.85,
      }}
    >
      {markdown || "\u00A0"}
    </div>
  );
}

interface BlockNoteBlockProps {
  node: BlockNoteNode;
  isSelected: boolean;
  multiSelected: boolean;
  engine: SpatialEngine;
  schema: SBDSchema;
  interactive: boolean;
  zoom: number;
  onMeasuredHeight?: (nodeId: string, height: number) => void;
  /** Only true on the machine that just created this block locally. Prevents
   *  remote observers from auto-entering edit mode for a collaborator's new block,
   *  which would cause them to skip incoming Yjs syncs (editing=true guard). */
  autoEdit?: boolean;
}

const CHROME_HEIGHT = 0;

type HandlePos = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";


const HANDLE_ANCHORS: { pos: HandlePos; top: string | number; left: string | number }[] = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 },
];

/** Check if a BlockNote block is an empty paragraph */
function isEmptyParagraph(block: any): boolean {
  if (block.type !== "paragraph") return false;
  if (!block.content || block.content.length === 0) return true;
  return block.content.every(
    (c: any) => c.type === "text" && (!c.text || c.text === "")
  );
}

function BlockNoteBlock({
  node,
  isSelected,
  multiSelected,
  engine,
  schema,
  interactive,
  zoom,
  onMeasuredHeight,
  autoEdit,
}: BlockNoteBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  // Only auto-enter edit mode when the block was created locally (autoEdit=true).
  // Without this guard, remote observers would also auto-enter edit mode when they
  // receive a new empty block via Yjs, causing them to skip all incoming syncs.
  const justCreated = useRef(autoEdit === true);
  const autoFocusRef = useRef(false);
  const isAdjustingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isApplyingRemoteRef = useRef(false);
  /** JSON snapshot of blocks last applied to the editor or pushed to the engine (avoids ref-equality traps with mutable editor.document). */
  const lastSyncedBlocksJsonRef = useRef(JSON.stringify(node.data.blocks ?? []));
  const [editing, setEditing] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  // Store double-click coordinates so we can place the caret at the click position
  const dblClickPosRef = useRef<{ x: number; y: number } | null>(null);

  // Create editor WITHOUT initialContent to avoid ProseMirror DecorationGroup
  // crash (known TipTap bug where certain block structures cause
  // "Cannot read properties of undefined (reading 'localsInner')" during
  // Editor.createView). Blocks are applied after mount via replaceBlocks.
  const editor = useCreateBlockNote({ schema });

  // Ref for the blocks that should be applied after the view mounts
  const pendingBlocksRef = useRef(
    node.data.blocks.length > 0 ? node.data.blocks : null
  );

  // Apply initial blocks after BlockNoteView mounts the ProseMirror view.
  // Uses requestAnimationFrame so ProseMirror decorations are fully initialised.
  // Falls back to TipTap setContent(html) if replaceBlocks hits the decoration bug.
  useEffect(() => {
    const blocks = pendingBlocksRef.current;
    if (!blocks) return;
    pendingBlocksRef.current = null;

    const rafId = requestAnimationFrame(() => {
      // Strategy 1: replaceBlocks (standard BlockNote API)
      try {
        editor.replaceBlocks(editor.document, blocks);
        lastSyncedBlocksJsonRef.current = JSON.stringify(editor.document);
        return;
      } catch {
        // fall through to strategy 2
      }

      // Strategy 2: convert blocks → HTML and use TipTap setContent.
      // This rebuilds the ProseMirror document from scratch, bypassing
      // the DecorationGroup.locals bug that occurs during transactions.
      try {
        const html = editor.blocksToHTMLLossy(blocks);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (editor as any)._tiptapEditor.commands.setContent(html);
        lastSyncedBlocksJsonRef.current = JSON.stringify(editor.document);
        return;
      } catch {
        // fall through to fallback
      }

      // All programmatic approaches failed — show static markdown
      console.warn("[BlockNoteBlock] All block rendering strategies failed, using markdown fallback");
      setUseFallback(true);
    });

    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  // Exit edit mode when deselected or entering multi-selection
  useEffect(() => {
    if (!isSelected || multiSelected) setEditing(false);
  }, [isSelected, multiSelected]);

  // Auto-enter edit mode for newly created empty blocks.
  useEffect(() => {
    if (justCreated.current) {
      justCreated.current = false;
      autoFocusRef.current = true;
      setEditing(true);
    }
  }, [editor]);

  // Focus editor after re-render with editable={true}.
  // This runs after the render where editing=true, so BlockNoteView is editable.
  // Handles both auto-focus (new blocks) and double-click cursor placement.
  useEffect(() => {
    if (!editing) return;
    if (!autoFocusRef.current && !dblClickPosRef.current) return;

    const pos = dblClickPosRef.current;
    dblClickPosRef.current = null;
    autoFocusRef.current = false;

    // Wait a frame so ProseMirror view is fully mounted with editable=true
    const raf = requestAnimationFrame(() => {
      editor.focus();
      if (pos) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const tiptap = (editor as any)._tiptapEditor;
          const view = tiptap.view;
          const resolved = view.posAtCoords({ left: pos.x, top: pos.y });
          if (resolved) {
            tiptap.commands.setTextSelection(resolved.pos);
          }
        } catch {
          // Fallback: cursor stays wherever focus placed it
        }
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [editing, editor]);

  // Sync editor content to engine. Blur + focusout flush final state. While typing we
  // throttle (not debounce) pushes so collaborators see text during continuous input;
  // pure debounce only ran after a pause, which looked like "nothing until they finish".
  // Block reorder still skips when block count drops mid-drag (remove-before-insert).
  const syncToEngine = useCallback(() => {
    if (isAdjustingRef.current || isDraggingRef.current) return;
    const current = engine.getNode(node.id);
    const blocks = editor.document;
    lastSyncedBlocksJsonRef.current = JSON.stringify(blocks);
    engine.updateNode(node.id, {
      data: { ...(current as BlockNoteNode)?.data, blocks },
    });
  }, [editor, engine, node.id]);

  const COLLAB_SYNC_THROTTLE_MS = 100;

  useEffect(() => {
    if (!editor) return;
    let trailingTimer: ReturnType<typeof setTimeout> | null = null;
    let lastThrottleFire = 0;

    const scheduleSync = () => {
      if (isAdjustingRef.current || isDraggingRef.current || isApplyingRemoteRef.current) return;
      const newCount = editor.document.length;
      const current = engine.getNode(node.id) as BlockNoteNode | undefined;
      const prevCount = current?.data?.blocks?.length ?? 0;
      // Block count decreased: likely mid-drag reorder—don't persist, wait for final state
      if (newCount < prevCount) return;

      const now = Date.now();
      const elapsed = now - lastThrottleFire;
      if (elapsed >= COLLAB_SYNC_THROTTLE_MS) {
        lastThrottleFire = now;
        syncToEngine();
        return;
      }
      if (trailingTimer) clearTimeout(trailingTimer);
      trailingTimer = setTimeout(() => {
        trailingTimer = null;
        lastThrottleFire = Date.now();
        syncToEngine();
      }, COLLAB_SYNC_THROTTLE_MS - elapsed);
    };

    const off = editor.onChange(scheduleSync);
    return () => {
      off?.();
      if (trailingTimer) clearTimeout(trailingTimer);
    };
  }, [editor, syncToEngine, engine, node.id]);

  // Sync on blur (when leaving the block)—avoids persisting mid–block-drag states
  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const onFocusOut = (e: FocusEvent) => {
      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return; // focus moved within block
      syncToEngine();
    };
    el.addEventListener("focusout", onFocusOut);
    return () => el.removeEventListener("focusout", onFocusOut);
  }, [syncToEngine]);

  // Sync remote block changes into the editor (collab: another user edited this content block)
  useEffect(() => {
    // Skip if we're editing locally — local changes are handled by syncToEngine
    if (editing) return;
    const incomingBlocks = node.data.blocks;
    if (!Array.isArray(incomingBlocks)) return;
    // BlockNote expects at least one block; empty Yjs payload → one empty paragraph
    const blocksToApply =
      incomingBlocks.length > 0
        ? incomingBlocks
        : [{ type: "paragraph" as const, content: [] as [] }];
    const incoming = JSON.stringify(blocksToApply);
    if (incoming === lastSyncedBlocksJsonRef.current) return;

    isApplyingRemoteRef.current = true;
    try {
      editor.replaceBlocks(editor.document, blocksToApply);
    } catch {
      try {
        const html = editor.blocksToHTMLLossy(blocksToApply);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (editor as any)._tiptapEditor.commands.setContent(html);
      } catch {
        isApplyingRemoteRef.current = false;
        return;
      }
    }
    isApplyingRemoteRef.current = false;
    lastSyncedBlocksJsonRef.current = incoming;
  }, [node.data.blocks, editing, editor]);

  // Report measured height for auto-height blocks (used by selBounds for accurate multi-select box)
  useEffect(() => {
    if (node.h !== "auto" || !onMeasuredHeight) return;
    const el = blockRef.current;
    if (!el) return;
    const report = () => {
      const h = el.offsetHeight;
      if (h > 0) onMeasuredHeight(node.id, h);
    };
    report();
    return observeResize(el, report);
  }, [node.id, node.h, onMeasuredHeight]);

  /**
   * Measure the editor DOM and add/remove trailing empty paragraphs
   * so the editable area fills the block height.
   */
  const adjustTrailingParagraphs = useCallback(() => {
    const currentNode = engine.getNode(node.id) as BlockNoteNode | undefined;
    if (!currentNode || currentNode.h === "auto" || !editor || !blockRef.current)
      return;

    const available = (currentNode.h as number) - CHROME_HEIGHT;
    const editorEl = blockRef.current.querySelector(".bn-editor") as HTMLElement;
    if (!editorEl) return;

    const doc = editor.document;
    if (doc.length === 0) return;

    // Count trailing empty paragraphs (keep at least 1 block total)
    let trailingEmpty = 0;
    for (let i = doc.length - 1; i >= 1; i--) {
      if (isEmptyParagraph(doc[i])) trailingEmpty++;
      else break;
    }

    const scrollH = editorEl.scrollHeight;
    const lineH = doc.length > 0 ? scrollH / doc.length : 36;

    isAdjustingRef.current = true;

    if (scrollH < available) {
      // Add empty paragraphs to fill
      const deficit = available - scrollH;
      const toAdd = Math.max(0, Math.floor(deficit / lineH));
      if (toAdd > 0) {
        const lastBlock = doc[doc.length - 1];
        editor.insertBlocks(
          Array.from({ length: toAdd }, () => ({
            type: "paragraph" as const,
            content: [] as [],
          })),
          lastBlock,
          "after"
        );
      }
    } else if (scrollH > available && trailingEmpty > 0) {
      // Remove trailing empties that overflow
      const excess = scrollH - available;
      const toRemove = Math.min(trailingEmpty, Math.ceil(excess / lineH));
      if (toRemove > 0) {
        const blocks = doc.slice(doc.length - toRemove);
        editor.removeBlocks(blocks);
      }
    }

    // Sync final state to engine
    const latest = engine.getNode(node.id) as BlockNoteNode | undefined;
    if (latest) {
      engine.updateNode(node.id, {
        data: { ...latest.data, blocks: editor.document },
      });
      lastSyncedBlocksJsonRef.current = JSON.stringify(editor.document);
    }

    isAdjustingRef.current = false;
  }, [editor, engine, node.id]);

  // Keep a ref so resize handler always calls latest version
  const adjustRef = useRef(adjustTrailingParagraphs);
  adjustRef.current = adjustTrailingParagraphs;

  // Fill trailing paragraphs on mount (for blocks created with explicit height)
  useEffect(() => {
    if (node.h === "auto") return;
    // Wait for BlockNote to render its DOM
    const timer = setTimeout(() => adjustRef.current(), 60);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drag bar handler — select + start drag
  const handleDragBarPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      // Alt+click: let event bubble to canvas for deep-select cycling
      if (e.altKey) return;

      // If this node is NOT selected but the click falls within a
      // currently-selected node's bounds, let the event bubble so the
      // canvas can handle it (preserves deep-select / Alt+click selection)
      if (!engine.selection.has(node.id) && engine.selection.size > 0) {
        const { x: cx, y: cy } = engine.screenToCanvas(e.clientX, e.clientY);
        for (const selId of engine.selection) {
          const selNode = engine.getNode(selId);
          if (!selNode) continue;
          const sh = selNode.h === "auto" ? 100 : (selNode.h as number);
          if (cx >= selNode.x && cx <= selNode.x + selNode.w && cy >= selNode.y && cy <= selNode.y + sh) {
            return; // Let canvas handle — preserves current selection
          }
        }
      }

      e.stopPropagation();
      e.preventDefault();

      // Capture pointer so pointermove/pointerup always reach document listeners
      // even when the finger moves off the element on touch devices
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      if (e.shiftKey) {
        engine.toggleSelect(node.id);
      } else if (!engine.selection.has(node.id)) {
        engine.select(node.id);
      }

      const startX = e.clientX;
      const startY = e.clientY;
      const draggedIds = Array.from(engine.selection);
      const origPositions = draggedIds.map((id) => {
        const n = engine.getNode(id)!;
        return { id, x: n.x, y: n.y };
      });
      let didMove = false;
      let rafId: number | null = null;
      let lastClientX = startX;
      let lastClientY = startY;
      let lastModKey = false;

      const applyMove = () => {
        rafId = null;
        const dx = (lastClientX - startX) / engine.viewport.zoom;
        const dy = (lastClientY - startY) / engine.viewport.zoom;
        const { finalDx, finalDy } = engine.computeDragSnap(
          origPositions, draggedIds, dx, dy, lastModKey,
        );
        const updates = origPositions.map((orig) => ({
          id: orig.id,
          patch: { x: orig.x + finalDx, y: orig.y + finalDy },
        }));
        engine.updateMany(updates);
      };

      const onMove = (me: PointerEvent) => {
        const dx = (me.clientX - startX) / engine.viewport.zoom;
        const dy = (me.clientY - startY) / engine.viewport.zoom;
        if (!didMove) {
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            didMove = true;
            isDraggingRef.current = true;
            engine.pushHistorySnapshot();
            engine.beginNodeGesture(draggedIds);
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
        isDraggingRef.current = false;
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          applyMove();
        }
        engine.clearAlignGuides();
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
        engine.endNodeGesture();
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [engine, node.id]
  );

  // Rotation handle
  const handleRotatePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      e.stopPropagation();
      e.preventDefault();
      const h =
        node.h === "auto"
          ? (blockRef.current?.getBoundingClientRect().height ?? 60) /
            engine.viewport.zoom
          : (node.h as number);
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
          engine.beginNodeGesture([node.id]);
        }
        const { x: cx, y: cy } = engine.screenToCanvas(me.clientX, me.clientY);
        const currentAngle = Math.atan2(cy - centerY, cx - centerX);
        let rotation =
          initialRotation + (currentAngle - startAngle) * (180 / Math.PI);

        if ((me.shiftKey || engine.snapToGrid) && !(me.metaKey || me.ctrlKey)) {
          rotation = Math.round(rotation / 15) * 15;
        }

        engine.updateNode(node.id, { rotation });
      };
      const onUp = () => {
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
        engine.endNodeGesture();
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [engine, node.id, node.x, node.y, node.w, node.h, node.rotation]
  );

  // Resize handle (supports all 8 directions)
  const handleHandlePointerDown = useCallback(
    (handle: HandlePos, e: React.PointerEvent) => {
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      e.stopPropagation();
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const origX = node.x;
      const origY = node.y;
      const origW = node.w;
      const origH =
        node.h === "auto"
          ? (blockRef.current?.getBoundingClientRect().height ?? 60) /
            engine.viewport.zoom
          : (node.h as number);

      let historyPushed = false;

      const onMove = (me: PointerEvent) => {
        const dx = (me.clientX - startX) / engine.viewport.zoom;
        const dy = (me.clientY - startY) / engine.viewport.zoom;

        if (!historyPushed) {
          historyPushed = true;
          engine.pushHistorySnapshot();
          engine.beginNodeGesture([node.id]);
        }

        let newX = origX;
        let newY = origY;
        let newW = origW;
        let newH = origH;

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

        if (newW < 100) {
          newW = 100;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = origX + origW - 100;
          }
        }
        if (newH < 60) {
          newH = 60;
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = origY + origH - 60;
          }
        }

        if (me.shiftKey) {
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

        engine.updateNode(node.id, { x: newX, y: newY, w: newW, h: newH });
      };
      const onUp = () => {
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
        engine.endNodeGesture();
        requestAnimationFrame(() => adjustRef.current());
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [engine, node.id, node.x, node.y, node.w, node.h]
  );

  // Editor area pointer down — context-aware
  const editorAreaPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Alt+click: let event bubble to canvas for deep-select cycling
      if (e.altKey) return;

      if (editing) {
        // Editing: stop propagation but let BlockNote handle text interaction
        e.stopPropagation();
        return;
      }
      if (isSelected) {
        // Selected but not editing: drag (same as drag bar)
        handleDragBarPointerDown(e);
        return;
      }
      // Not selected: select + start drag in one motion
      handleDragBarPointerDown(e);
    },
    [editing, isSelected, handleDragBarPointerDown, engine, node.id]
  );

  // Double-click to enter edit mode with cursor at click position
  const handleBlockDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      // Already editing — let BlockNote handle double-click (word select, etc.)
      if (editing) return;
      // If grouped — drill down one level at a time (don't edit until innermost group)
      if (node.groupId) {
        const chain: string[] = [];
        let gid: string | undefined = node.groupId;
        while (gid) { chain.push(gid); gid = engine.groupParent.get(gid); }
        if (!engine.activeGroupId) {
          engine.enterGroup(chain[chain.length - 1]);
          engine.select(node.id);
          return;
        }
        const activeIdx = chain.indexOf(engine.activeGroupId);
        if (activeIdx > 0) {
          engine.enterGroup(chain[activeIdx - 1]);
          engine.select(node.id);
          return;
        }
      }
      // Collapse to single selection and enter edit (deselect others / bounding box)
      engine.select(node.id);
      dblClickPosRef.current = { x: e.clientX, y: e.clientY };
      setEditing(true);
    },
    [editing, engine, node.id, node.groupId, editor]
  );

  const showHandles = isSelected && !multiSelected;

  return (
    <div
      ref={blockRef}
      data-node-id={node.id}
      className={interactive ? undefined : "sb-block-inert"}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        zIndex: node.z,
        height: node.h === "auto" ? undefined : node.h,
        minHeight: 20,
        border: node.data.borderColor
          ? `${node.data.borderWidth ?? 1}px ${node.data.borderStyle ?? "solid"} ${node.data.borderColor}`
          : "none",
        boxSizing: node.data.borderColor ? "border-box" : undefined,
        outline: isSelected
          ? `${1.5 / zoom}px solid #3b82f6`
          : "none",
        outlineOffset: node.data.borderColor ? 2 / zoom : 0,
        borderRadius: node.data.edgeStyle === "round" ? 12 : 0,
        background: "transparent",
        boxShadow: "none",
        overflow: "visible",
        pointerEvents: interactive ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
        opacity: node.data.opacity ?? 1,
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
      }}
    >
      {/* Inner wrapper — clips content when block has explicit height */}
      <div
        onDoubleClick={handleBlockDoubleClick}
        style={{
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: node.data.borderColor || isSelected ? 7 : 0,
        }}
      >
        {/* Editor area */}
        <div
          className="sb-editor-wrap"
          onPointerDown={editorAreaPointerDown}
          onKeyDown={editing ? (e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              setEditing(false);
            }
          } : undefined}
          style={!editing ? { cursor: "move", userSelect: "none" } : { cursor: "text", userSelect: "text" }}
        >
          {useFallback ? (
            <MarkdownFallback markdown={node.data.markdown ?? ""} />
          ) : (
            <EditorErrorBoundary fallback={<MarkdownFallback markdown={node.data.markdown ?? ""} />}>
              <BlockNoteView
                editor={editor}
                theme="light"
                editable={interactive && editing}
              />
            </EditorErrorBoundary>
          )}
        </div>
      </div>

      {/* Resize handles — outside inner wrapper so they aren't clipped */}
      {showHandles &&
        HANDLE_ANCHORS.map(({ pos, top, left }) => {
          const size = 8 / zoom;
          return (
            <div
              key={pos}
              onPointerDown={(e) => handleHandlePointerDown(pos, e)}
              style={{
                position: "absolute",
                top,
                left,
                width: size,
                height: size,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / zoom}px solid #3b82f6`,
                cursor: getRotatedCursor(pos, node.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto",
              }}
            />
          );
        })}

      {/* Rotation handle — line + rotate icon above top-center */}
      {showHandles && (() => {
        const rotateGap = 25 / zoom;
        const size = 10 / zoom;
        return (
          <>
            <div
              style={{
                position: "absolute",
                top: -rotateGap,
                left: "50%",
                width: 1.5 / zoom,
                height: rotateGap,
                transform: "translateX(-50%)",
                background: "#3b82f6",
                pointerEvents: "none",
              }}
            />
            <div
              onPointerDown={handleRotatePointerDown}
              style={{
                position: "absolute",
                top: -(rotateGap + size / 2),
                left: "50%",
                width: size,
                height: size,
                transform: "translateX(-50%) rotate(45deg)",
                borderRadius: 1.5 / zoom,
                background: "white",
                border: `${1.5 / zoom}px solid #3b82f6`,
                cursor: "grab",
                zIndex: 10,
                pointerEvents: "auto",
              }}
            />
          </>
        );
      })()}
    </div>
  );
}

export default memo(BlockNoteBlock);
