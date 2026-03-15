import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import { useSBTheme } from "./ThemeContext";
import { buildMermaidSketchNodes } from "../../utils/mermaid";

const STARTER = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;

export default function MermaidPanel({
  engine,
  open,
  onClose,
  triggerRect,
}: {
  engine: SpatialEngine;
  open: boolean;
  onClose: () => void;
  triggerRect: DOMRect | null;
}) {
  const theme = useSBTheme();
  const panelRef = useRef<HTMLDivElement>(null);
  const [source, setSource] = useState(STARTER);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("pointerdown", handle);
    return () => document.removeEventListener("pointerdown", handle);
  }, [open, onClose]);

  const exampleHint = useMemo(
    () => `Supported: flowchart/graph (TB/BT/LR/RL) and sequenceDiagram. Flowchart nodes: A[Text], A{Decision}, A((Start)). Edges: A-->B, A -- label --> B.`,
    [],
  );

  const onInsert = useCallback(() => {
    try {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const pt = engine.screenToCanvas(cx, cy);
      const { nodes, shapeNodeIds } = buildMermaidSketchNodes(source, pt.x, pt.y, () => engine.nextZ());
      if (nodes.length === 0) {
        throw new Error("No nodes were parsed.");
      }
      engine.addNodes(nodes);
      if (shapeNodeIds.length > 0) {
        engine.selectMultiple(shapeNodeIds);
      }
      setError(null);
      setSuccess(`Inserted ${shapeNodeIds.length} nodes and ${nodes.length - shapeNodeIds.length} edges.`);
    } catch (e) {
      setSuccess(null);
      setError(e instanceof Error ? e.message : "Failed to parse Mermaid graph.");
    }
  }, [engine, source]);

  if (!open || !triggerRect) return null;

  return createPortal(
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        left: triggerRect.right + 8,
        top: triggerRect.top,
        background: theme.panelBg,
        border: `1px solid ${theme.border}`,
        borderRadius: theme.panelBorderRadius,
        boxShadow: theme.panelShadow,
        width: 340,
        maxHeight: `calc(100vh - ${triggerRect.top + 20}px)`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        zIndex: 99999,
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div style={{ padding: "10px 12px 8px", borderBottom: `1px solid ${theme.border}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>Mermaid Sketch</div>
        <div style={{ marginTop: 4, fontSize: 10, color: theme.textMuted, lineHeight: 1.45 }}>{exampleHint}</div>
      </div>

      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: 180,
            resize: "vertical",
            padding: "8px 10px",
            borderRadius: theme.controlBorderRadius,
            border: `1px solid ${theme.border}`,
            background: theme.controlBg,
            color: theme.text,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 11,
            lineHeight: 1.4,
            boxSizing: "border-box",
          }}
        />

        {error && (
          <div style={{ fontSize: 10, color: "#ef4444" }}>{error}</div>
        )}
        {success && (
          <div style={{ fontSize: 10, color: "#16a34a" }}>{success}</div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
          <button
            onClick={() => setSource(STARTER)}
            style={{
              border: `1px solid ${theme.border}`,
              background: "transparent",
              color: theme.text,
              borderRadius: theme.controlBorderRadius,
              padding: "6px 10px",
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            Reset Example
          </button>
          <button
            onClick={onInsert}
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.controlBgActive,
              color: theme.text,
              borderRadius: theme.controlBorderRadius,
              padding: "6px 10px",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Insert Diagram
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

