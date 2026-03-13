import { memo, useCallback, useEffect, useRef } from "react";
import type { StickyNoteNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import { getFontFamilyCSS, DEFAULT_FONT } from "../fonts";

interface StickyNoteBlockProps {
  node: StickyNoteNode;
  isSelected: boolean;
  engine: SpatialEngine;
  interactive: boolean;
  zoom: number;
  editing: boolean;
  onEditStart: (id: string) => void;
  onEditEnd: () => void;
}

const MIN_HEIGHT = 100;

function StickyNoteBlock({
  node,
  isSelected,
  engine,
  interactive,
  zoom,
  editing,
  onEditStart,
  onEditEnd,
}: StickyNoteBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  // Track latest text so we can commit even after the DOM element unmounts
  const latestTextRef = useRef("");
  // Store double-click coordinates so we can place the caret at the click position
  const dblClickPosRef = useRef<{ x: number; y: number } | null>(null);
  // Debounced sync timer for real-time collab text updates
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Keep fresh references for the cleanup effect
  const nodeRef = useRef(node);
  nodeRef.current = node;
  const engineRef = useRef(engine);
  engineRef.current = engine;

  // Sync text into the contentEditable div when entering edit mode
  useEffect(() => {
    if (editing && textRef.current) {
      const el = textRef.current;
      el.innerText = node.data.text || "";
      latestTextRef.current = node.data.text || "";
      el.focus();

      const doc = el.ownerDocument;
      const sel = doc.defaultView?.getSelection();
      const pos = dblClickPosRef.current;
      dblClickPosRef.current = null;

      let placed = false;
      if (pos && sel && doc.caretRangeFromPoint) {
        const range = doc.caretRangeFromPoint(pos.x, pos.y);
        if (range && el.contains(range.startContainer)) {
          sel.removeAllRanges();
          sel.addRange(range);
          placed = true;
        }
      }

      // Fallback: place cursor at end
      if (!placed && sel) {
        const range = doc.createRange();
        if (el.childNodes.length > 0) {
          range.selectNodeContents(el);
          range.collapse(false);
        }
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
    // Only run when editing changes, not when node.data.text changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  // Commit text when editing ends (handles click-away where blur may not fire
  // because the contentEditable unmounts before the blur event)
  useEffect(() => {
    if (!editing) return;
    return () => {
      const n = nodeRef.current;
      const newText = latestTextRef.current;
      if (newText !== n.data.text) {
        engineRef.current.updateNodeWithHistory(n.id, {
          data: { ...n.data, text: newText },
        } as Partial<StickyNoteNode>);
      }
    };
  }, [editing]);

  // Only sync the ref from the DOM — the cleanup effect handles the actual save
  const commitText = useCallback(() => {
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
      syncTimerRef.current = null;
    }
    if (textRef.current) {
      latestTextRef.current = textRef.current.innerText;
    }
    onEditEnd();
  }, [onEditEnd]);

  // Pointer down handler — select + start drag (same pattern as ContentBlock)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
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
            return; // Let canvas handle
          }
        }
      }

      e.stopPropagation();

      if (editing) return; // Let contentEditable handle interactions

      if (e.shiftKey) {
        engine.toggleSelect(node.id);
      } else if (!engine.selection.has(node.id)) {
        engine.select(node.id);
      }

      // Start drag
      const startX = e.clientX;
      const startY = e.clientY;
      const draggedIds = Array.from(engine.selection);
      const origPositions: { id: string; x: number; y: number }[] = [];
      for (const id of draggedIds) {
        const n = engine.getNode(id);
        if (n) origPositions.push({ id, x: n.x, y: n.y });
      }
      if (origPositions.length === 0) return;
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
            engine.pushHistorySnapshot();
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
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [engine, node.id, editing]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!interactive) return;
      e.stopPropagation();
      // If grouped — drill down one level at a time
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
      if (!editing) {
        dblClickPosRef.current = { x: e.clientX, y: e.clientY };
        engine.select(node.id);
        onEditStart(node.id);
      }
    },
    [interactive, editing, engine, node.id, node.groupId, onEditStart]
  );

  const fontSize = node.data.fontSize ?? 16;
  const h = node.h === "auto" ? MIN_HEIGHT : (node.h as number);

  return (
    <div
      ref={blockRef}
      data-node-id={node.id}
      className={interactive ? undefined : "sb-block-inert"}
      onPointerDown={interactive ? handlePointerDown : undefined}
      onDoubleClick={handleDoubleClick}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        height: h,
        zIndex: node.z,
        background: node.data.color,
        borderRadius: node.data.edgeStyle === "round" ? 12 : 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        opacity: node.data.opacity ?? 1,
        pointerEvents: interactive ? "auto" : "none",
        outline: "none",
        overflow: "hidden",
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          padding: 12,
          height: "100%",
          overflow: "auto",
          cursor: editing ? "text" : "move",
          userSelect: editing ? "text" : "none",
        }}
      >
        {editing ? (
          <div
            ref={textRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={commitText}
            onInput={() => {
              if (textRef.current) {
                latestTextRef.current = textRef.current.innerText;
                // Sync immediately for real-time collab
                if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
                syncTimerRef.current = setTimeout(() => {
                  const n = nodeRef.current;
                  const text = latestTextRef.current;
                  if (text !== n.data.text) {
                    engineRef.current.updateNode(n.id, {
                      data: { ...n.data, text },
                    } as Partial<StickyNoteNode>);
                  }
                }, 0);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                commitText();
              }
              e.stopPropagation();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              fontSize,
              fontFamily: getFontFamilyCSS(DEFAULT_FONT),
              lineHeight: 1.5,
              color: "#1e1e2e",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              outline: "none",
              minHeight: "100%",
            }}
          />
        ) : (
          <div
            style={{
              fontSize,
              fontFamily: getFontFamilyCSS(DEFAULT_FONT),
              lineHeight: 1.5,
              color: "#1e1e2e",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {node.data.text || ""}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(StickyNoteBlock);
