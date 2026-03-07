import { memo, useState } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  SpatialNode,
  SpatialEngine,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface DataCardData {
  title: string;
  fields: Array<{ key: string; value: string }>;
  accentColor?: string;
  lastUpdated?: number;
}

// ── Renderer ────────────────────────────────────────────────

const DataCardRenderer = memo(function DataCardRenderer(
  props: NodeRendererProps<DataCardData>,
) {
  const { node, data, isSelected, editing, zoom, callbacks } = props;
  const cardData = data as DataCardData;
  const accent = cardData.accentColor || "#6366f1";
  const [hoveredField, setHoveredField] = useState<number | null>(null);

  return (
    <div
      style={{
        width: node.w,
        height: node.h === "auto" ? undefined : node.h,
        background: "#1e1e2e",
        borderRadius: 8,
        border: `2px solid ${isSelected ? accent : "#2e2e3e"}`,
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#e0e0e0",
        display: "flex",
        flexDirection: "column",
        boxShadow: isSelected
          ? `0 0 0 1px ${accent}40, 0 4px 12px rgba(0,0,0,0.3)`
          : "0 2px 8px rgba(0,0,0,0.2)",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "10px 14px",
          background: accent,
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.3,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 14 }}>&#9632;</span>
        {cardData.title}
      </div>

      {/* Fields */}
      <div style={{ flex: 1, padding: "6px 0" }}>
        {cardData.fields.map((field, i) => (
          <div
            key={i}
            onPointerEnter={() => setHoveredField(i)}
            onPointerLeave={() => setHoveredField(null)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 14px",
              fontSize: 12,
              background:
                hoveredField === i ? "#2a2a3a" : "transparent",
              transition: "background 0.1s",
            }}
          >
            <span style={{ color: "#888", flexShrink: 0 }}>
              {field.key}
            </span>
            <span
              style={{
                color: "#e0e0e0",
                fontWeight: 500,
                textAlign: "right",
                marginLeft: 12,
              }}
            >
              {field.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      {cardData.lastUpdated && (
        <div
          style={{
            padding: "6px 14px",
            fontSize: 10,
            color: "#555",
            borderTop: "1px solid #2e2e3e",
          }}
        >
          Updated {new Date(cardData.lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
});

// ── Node type definition ────────────────────────────────────

export const dataCardNodeType: NodeTypeDefinition<DataCardData> = {
  type: "data-card",
  component: DataCardRenderer,

  onCreate: (node: SpatialNode, engine: SpatialEngine) => {
    console.log("[data-card] created:", node.id);
  },

  onMove: (node: SpatialNode, dx: number, dy: number) => {
    console.log("[data-card] moved:", node.id, `(${dx}, ${dy})`);
  },

  onDelete: (node: SpatialNode) => {
    console.log("[data-card] deleted:", node.id);
  },

  onSelect: (node: SpatialNode) => {
    console.log("[data-card] selected:", node.id);
  },

  onDeselect: (node: SpatialNode) => {
    console.log("[data-card] deselected:", node.id);
  },

  onDataChange: (node: SpatialNode, oldData: DataCardData, newData: DataCardData) => {
    console.log("[data-card] data changed:", node.id, { oldData, newData });
  },

  getClipboardText: (node: SpatialNode) => {
    const data = node.data as DataCardData;
    const lines = data.fields.map((f) => `${f.key}: ${f.value}`);
    return `${data.title}\n${lines.join("\n")}`;
  },
};
