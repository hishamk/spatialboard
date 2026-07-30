import { useRef, useEffect } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { ShapeNode } from "../../engine/types";
import { getFontFamilyCSS, DEFAULT_FONT } from "../../fonts";
import { contrastingTextColor } from "./canvas-helpers";

/** Inline label editor for ShapeNodes — mirrors the StickyNoteBlock pattern
 *  of committing via a cleanup effect so click-away (which clears editing
 *  state and unmounts this before blur fires) still persists the label. */
export default function ShapeLabelEditor({
  node,
  engine,
  onDone,
}: {
  node: ShapeNode;
  engine: SpatialEngine;
  onDone: () => void;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const latestRef = useRef(node.data.label ?? "");
  const nodeRef = useRef(node);
  nodeRef.current = node;
  // Track initial label so we can push history when editing ends, even if real-time
  // sync has already brought node.data.label up to date.
  const initialLabelRef = useRef(node.data.label ?? "");
  const historyBaselinePushedRef = useRef(false);

  // Commit label when this component unmounts (editing ends).
  useEffect(() => {
    return () => {
      const cur = nodeRef.current;
      const val = latestRef.current.trim();
      if (val !== initialLabelRef.current) {
        const newData = { ...cur.data, label: val || undefined };
        const updates: Partial<ShapeNode> = { data: newData };
        // Auto-grow height
        const ta = taRef.current;
        if (ta && val) {
          const paddingV = 24;
          const nh = cur.h === "auto" ? 100 : (cur.h as number);
          const minH = ta.scrollHeight + paddingV;
          if (minH > nh) updates.h = minH;
        }
        if (historyBaselinePushedRef.current) {
          historyBaselinePushedRef.current = false;
          engine.updateNode(cur.id, updates as Partial<ShapeNode>);
        } else {
          engine.updateNodeWithHistory(cur.id, updates as Partial<ShapeNode>);
        }
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nh = node.h === "auto" ? 100 : (node.h as number);
  const fontSize = node.data.labelFontSize ?? 14;
  const labelColor =
    node.data.fill && node.data.fillStyle === "solid"
      ? contrastingTextColor(node.data.fill)
      : node.data.stroke;

  return (
    <div
      data-node-id={node.id}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        height: nh,
        zIndex: 999998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
        padding: "8px 12px",
        boxSizing: "border-box",
      }}
    >
      <textarea
        ref={taRef}
        autoFocus
        defaultValue={node.data.label ?? ""}
        placeholder=""
        rows={1}
        onBlur={() => onDone()}
        onKeyDown={(e) => {
          if (e.key === "Escape") (e.currentTarget as HTMLTextAreaElement).blur();
          e.stopPropagation();
        }}
        onInput={(e) => {
          const ta = e.currentTarget as HTMLTextAreaElement;
          if (!historyBaselinePushedRef.current) {
            historyBaselinePushedRef.current = true;
            engine.pushHistorySnapshot();
          }
          latestRef.current = ta.value;
          // Sync label text in real-time for collaboration
          const cur = nodeRef.current;
          engine.updateNode(cur.id, {
            data: { ...cur.data, label: ta.value || undefined },
          } as Partial<ShapeNode>);
          // Auto-resize textarea
          ta.style.height = "auto";
          ta.style.height = ta.scrollHeight + "px";
          // Grow shape if needed
          const paddingV = 24;
          const neededH = ta.scrollHeight + paddingV;
          if (neededH > nh) {
            engine.updateNode(node.id, { h: neededH } as Partial<ShapeNode>);
          }
        }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          textAlign: node.data.labelAlign ?? "center",
          fontSize,
          fontFamily: getFontFamilyCSS(node.data.labelFontFamily ?? DEFAULT_FONT),
          color: labelColor,
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          overflow: "hidden",
          width: "100%",
          padding: 0,
          margin: 0,
          lineHeight: 1.3,
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
      />
    </div>
  );
}
