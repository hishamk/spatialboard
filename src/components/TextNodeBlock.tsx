import { memo, useRef, useEffect, useLayoutEffect, useCallback, useState } from "react";
import type { TextNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import { getFontFamilyCSS } from "../fonts";

function TextNodeBlock({
  node,
  engine,
  editing,
  editClickPos,
  onStopEdit,
  onMeasuredHeight,
}: {
  node: TextNode;
  engine: SpatialEngine;
  editing: boolean;
  editClickPos?: { clientX: number; clientY: number } | null;
  onStopEdit: () => void;
  onMeasuredHeight?: (id: string, h: number) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [localText, setLocalText] = useState(node.data.text);
  const committedRef = useRef(false);
  const latestTextRef = useRef(node.data.text);
  // Debounced sync timer for real-time collab text updates
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const engineRef = useRef(engine);
  engineRef.current = engine;
  const nodeRef = useRef(node);
  nodeRef.current = node;

  // Sync local text when node.data.text changes externally (undo/redo, property changes).
  // Intentionally excludes `editing` from deps so this does NOT run when editing
  // transitions off — that avoids overwriting localText with stale node data
  // (engine change events are deferred via RAF).
  useEffect(() => {
    if (!editing) {
      setLocalText(node.data.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node.data.text]);

  // Focus and place cursor when entering edit mode.
  // useLayoutEffect ensures focus happens synchronously after DOM update,
  // before paint and before the browser fires subsequent events (click)
  // that could steal focus.
  useLayoutEffect(() => {
    if (editing && divRef.current) {
      // Populate the contentEditable with the current text
      divRef.current.innerText = node.data.text;
      divRef.current.focus();

      // Place cursor at click position if available, otherwise at end
      const doc = divRef.current.ownerDocument;
      let placed = false;
      if (editClickPos) {
        const range = doc.caretRangeFromPoint(editClickPos.clientX, editClickPos.clientY);
        if (range && divRef.current.contains(range.startContainer)) {
          const sel = doc.defaultView?.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
          placed = true;
        }
      }
      if (!placed) {
        const range = doc.createRange();
        const sel = doc.defaultView?.getSelection();
        if (divRef.current.childNodes.length > 0) {
          range.selectNodeContents(divRef.current);
          range.collapse(false);
        }
        sel?.removeAllRanges();
        sel?.addRange(range);
      }

      latestTextRef.current = node.data.text;
      committedRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  // Commit text when editing transitions off (cleanup runs when editing changes).
  // This covers the case where the blur handler doesn't fire (e.g., React removes
  // the handler before the browser dispatches blur).
  useEffect(() => {
    if (!editing) return;
    return () => {
      if (committedRef.current) return;
      committedRef.current = true;
      const text = latestTextRef.current;
      const currentNode = engine.getNode(node.id);
      if (currentNode && currentNode.type === "text") {
        const nodeData = (currentNode as TextNode).data;
        if (text !== nodeData.text) {
          engine.updateNodeWithHistory(node.id, {
            data: { ...nodeData, text },
          } as Partial<TextNode>);
        }
      }
    };
  }, [editing, engine, node.id]);

  // Measure height (re-observe when editing toggles since the div element changes)
  useEffect(() => {
    if (!divRef.current || !onMeasuredHeight) return;
    const ro = new ResizeObserver(() => {
      const h = divRef.current?.offsetHeight ?? 0;
      if (h > 0) onMeasuredHeight(node.id, h);
    });
    ro.observe(divRef.current);
    return () => ro.disconnect();
  }, [node.id, onMeasuredHeight, editing]);

  const commitText = useCallback(() => {
    if (committedRef.current) return;
    committedRef.current = true;
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
      syncTimerRef.current = null;
    }
    const text = divRef.current?.innerText ?? "";
    setLocalText(text);
    latestTextRef.current = text;
    if (text !== node.data.text) {
      engine.updateNodeWithHistory(node.id, {
        data: { ...node.data, text },
      } as Partial<TextNode>);
    }
    onStopEdit();
  }, [engine, node, onStopEdit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        commitText();
        // Blur so the contentEditable div doesn't retain focus and block
        // keyboard shortcuts (copy/paste) after editing ends.
        divRef.current?.blur();
      }
      // Stop propagation so keyboard shortcuts don't fire while typing
      e.stopPropagation();
    },
    [commitText]
  );

  const handleBlur = useCallback(() => {
    commitText();
  }, [commitText]);

  const handleInput = useCallback(() => {
    if (divRef.current) {
      const text = divRef.current.innerText;
      setLocalText(text);
      latestTextRef.current = text;
      // Debounced sync for real-time collab
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
      syncTimerRef.current = setTimeout(() => {
        const n = nodeRef.current;
        if (text !== n.data.text) {
          engineRef.current.updateNode(n.id, {
            data: { ...n.data, text },
          } as Partial<TextNode>);
        }
      }, 300);
    }
  }, []);

  const h = node.h === "auto" ? undefined : (node.h as number);
  const opacity = node.data.opacity ?? 1;

  const textStyle: React.CSSProperties = {
    fontFamily: getFontFamilyCSS(node.data.fontFamily),
    fontSize: node.data.fontSize,
    color: node.data.color,
    textAlign: node.data.align,
    opacity,
    lineHeight: 1,
    outline: "none",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    border: node.data.borderColor
      ? `${node.data.borderWidth ?? 1}px ${node.data.borderStyle ?? "solid"} ${node.data.borderColor}`
      : undefined,
    boxSizing: node.data.borderColor ? "border-box" : undefined,
    borderRadius: node.data.borderColor ? 4 : undefined,
    padding: node.data.borderColor ? 6 : undefined,
  };

  return (
    <div
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        height: h,
        zIndex: node.z,
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
        transformOrigin: "center center",
        pointerEvents: editing ? "auto" : "none",
      }}
    >
      {editing ? (
        <div
          ref={divRef}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onInput={handleInput}
          onPointerDown={(e) => e.stopPropagation()}
          style={{ ...textStyle, minHeight: node.data.fontSize, cursor: "text" }}
        />
      ) : (
        <div ref={divRef} style={textStyle}>
          {localText || "\u00A0"}
        </div>
      )}
    </div>
  );
}

export default memo(TextNodeBlock);
