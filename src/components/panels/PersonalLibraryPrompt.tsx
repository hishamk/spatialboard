import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import type { SpatialNode } from "../../engine/types";
import { renderPreviewSVG } from "../../excalidraw/preview-renderer";

interface PersonalLibraryPromptProps {
  nodes: SpatialNode[];
  onSave: (name: string) => void;
  onCancel: () => void;
}

export default function PersonalLibraryPrompt({
  nodes,
  onSave,
  onCancel,
}: PersonalLibraryPromptProps) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const preview = useMemo(() => renderPreviewSVG(nodes, 56), [nodes]);

  const handleSubmit = useCallback(() => {
    onSave(name.trim() || "Untitled");
  }, [name, onSave]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    },
    [handleSubmit, onCancel],
  );

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onCancel();
      }
    },
    [onCancel],
  );

  return createPortal(
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={panelRef}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          background: "#1e1e2e",
          borderRadius: 8,
          border: "1px solid #333",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          padding: 16,
          width: 280,
          color: "#e0e0e0",
          fontSize: 13,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Add to Personal Library
        </div>

        {/* Preview */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
            padding: 8,
            background: "rgba(255,255,255,0.05)",
            borderRadius: 6,
            border: "1px solid #333",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: preview }} />
        </div>

        {/* Name input */}
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Item name"
          style={{
            width: "100%",
            padding: "6px 8px",
            border: "1px solid #333",
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            color: "#e0e0e0",
            fontSize: 13,
            outline: "none",
            boxSizing: "border-box",
            marginBottom: 12,
          }}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "5px 12px",
              border: "1px solid #333",
              borderRadius: 4,
              background: "transparent",
              color: "#e0e0e0",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "5px 12px",
              border: "none",
              borderRadius: 4,
              background: "#6366f1",
              color: "#fff",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
