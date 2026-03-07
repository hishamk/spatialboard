import { memo, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface ColorData {
  color: string;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "hex", label: "Hex", direction: "output", dataType: "string" },
  { id: "r", label: "R", direction: "output", dataType: "number" },
  { id: "g", label: "G", direction: "output", dataType: "number" },
  { id: "b", label: "B", direction: "output", dataType: "number" },
];

// ── Helpers ─────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16) || 0,
    g: parseInt(h.substring(2, 4), 16) || 0,
    b: parseInt(h.substring(4, 6), 16) || 0,
  };
}

// ── Renderer ────────────────────────────────────────────────

const ColorRenderer = memo(function ColorRenderer(
  props: NodeRendererProps<ColorData>,
) {
  const { data } = props;
  const cd = data as ColorData;
  const rgb = hexToRgb(cd.color);

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
      {/* Rounded square with color swatch */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="color-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
          {/* Checkerboard pattern for transparency preview */}
          <pattern id="checker" width={10} height={10} patternUnits="userSpaceOnUse">
            <rect width={5} height={5} fill="#333" />
            <rect x={5} y={5} width={5} height={5} fill="#333" />
            <rect x={5} width={5} height={5} fill="#444" />
            <rect y={5} width={5} height={5} fill="#444" />
          </pattern>
        </defs>
        {/* Housing */}
        <rect
          x={2} y={2} width={96} height={96}
          rx={14} ry={14}
          fill="url(#color-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Color swatch */}
        <rect
          x={14} y={14} width={72} height={48}
          rx={8} ry={8}
          fill="url(#checker)"
        />
        <rect
          x={14} y={14} width={72} height={48}
          rx={8} ry={8}
          fill={cd.color}
          stroke={cd.color}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        {/* Highlight */}
        <rect
          x={16} y={16} width={28} height={12}
          rx={4} ry={4}
          fill="#fff"
          opacity={0.15}
        />
      </svg>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "8%",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div style={{
          fontSize: 10, fontWeight: 700, color: cd.color,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          letterSpacing: 0.5,
        }}>
          {cd.color.toUpperCase()}
        </div>
        <div style={{
          fontSize: 7, color: "#555", marginTop: 1,
        }}>
          {rgb.r}, {rgb.g}, {rgb.b}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ColorPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<ColorData>) {
  const cd = data as ColorData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  const onColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateData({ color: e.target.value });
    },
    [updateData],
  );

  const PRESETS = [
    "#ef4444", "#f59e0b", "#10b981", "#3b82f6",
    "#8b5cf6", "#ec4899", "#06b6d4", "#ffffff",
    "#000000", "#6b7280",
  ];

  return (
    <>
      <div style={row}>
        <span style={label}>Color</span>
        <input
          type="color"
          value={cd.color}
          onChange={onColorChange}
          style={{
            width: 32, height: 32, padding: 0, border: "1px solid #3a3a4e",
            borderRadius: 6, cursor: "pointer", background: "transparent",
          }}
        />
        <input
          type="text"
          value={cd.color}
          onChange={onColorChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
            fontFamily: "monospace",
          }}
        />
      </div>
      <div style={{ ...row, flexWrap: "wrap" }}>
        <span style={label}>Presets</span>
        {PRESETS.map((c) => (
          <button
            key={c}
            onClick={() => updateData({ color: c })}
            style={{
              width: 18, height: 18, borderRadius: 4,
              background: c,
              border: cd.color === c ? "2px solid #fff" : "1px solid #3a3a4e",
              cursor: "pointer", padding: 0,
            }}
          />
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const colorNodeType: NodeTypeDefinition<ColorData> = {
  type: "color",
  component: ColorRenderer,
  propertiesPanel: ColorPropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: ColorData) => {
    const rgb = hexToRgb(data.color);
    return { hex: data.color, r: rgb.r, g: rgb.g, b: rgb.b };
  },
  getClipboardText: (node) => `Color ${(node.data as ColorData).color}`,
};
