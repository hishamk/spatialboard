import { memo, useCallback, useState } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface ButtonData {
  label: string;
  fireCount: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "Trigger", direction: "output", dataType: "signal" },
];

// ── Renderer ────────────────────────────────────────────────

const ButtonRenderer = memo(function ButtonRenderer(
  props: NodeRendererProps<ButtonData>,
) {
  const { data, updateData } = props;
  const cd = data as ButtonData;
  const [flash, setFlash] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      updateData({ fireCount: cd.fireCount + 1 });
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    },
    [updateData, cd.fireCount],
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#fff",
      }}
    >
      {/* Rounded rectangle with thick border — "terminal" flowchart style */}
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="btn-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={76}
          rx={16} ry={16}
          fill="url(#btn-bg)"
          stroke={cd.accentColor}
          strokeWidth={flash ? 3 : 2}
          vectorEffect="non-scaling-stroke"
        />
        {flash && (
          <rect
            x={6} y={6} width={108} height={68}
            rx={12} ry={12}
            fill="none"
            stroke={cd.accentColor}
            strokeWidth={1}
            opacity={0.3}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "10%",
          boxSizing: "border-box",
        }}
      >
        <div style={{
          fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          Trigger
        </div>

        {/* The actual button */}
        <button
          onClick={handleClick}
          style={{
            padding: "7px 20px",
            background: flash
              ? "#fff"
              : `linear-gradient(135deg, ${cd.accentColor}, ${cd.accentColor}cc)`,
            border: "none",
            borderRadius: 8,
            color: flash ? cd.accentColor : "#fff",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: 0.5,
            boxShadow: flash
              ? `0 0 20px ${cd.accentColor}`
              : `0 2px 8px ${cd.accentColor}44`,
            pointerEvents: "auto",
            transition: "all 0.15s ease",
            transform: flash ? "scale(0.95)" : "scale(1)",
          }}
        >
          {cd.label || "Fire"}
        </button>

        <div style={{ fontSize: 8, color: "#444" }}>
          {cd.fireCount > 0 ? `\u00d7${cd.fireCount}` : ""}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ButtonPropertiesPanel({
  data,
  updateData,
}: NodePropertiesPanelProps<ButtonData>) {
  const cd = data as ButtonData;
  const row: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4,
  };
  const label: React.CSSProperties = {
    width: 48,
    fontSize: 10,
    color: "#999",
    flexShrink: 0,
  };

  return (
    <div style={row}>
      <span style={label}>Label</span>
      <input
        type="text"
        value={cd.label}
        onChange={(e) => updateData({ label: e.target.value })}
        style={{
          flex: 1,
          background: "#2a2a3e",
          border: "1px solid #3a3a4e",
          borderRadius: 6,
          color: "#fff",
          padding: "4px 8px",
          fontSize: 12,
        }}
      />
    </div>
  );
}

// ── Node type definition ────────────────────────────────────

export const buttonNodeType: NodeTypeDefinition<ButtonData> = {
  type: "button",
  component: ButtonRenderer,
  propertiesPanel: ButtonPropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: ButtonData) => ({
    trigger: data.fireCount,
  }),
  getClipboardText: (node) => (node.data as ButtonData).label || "Button",
};
