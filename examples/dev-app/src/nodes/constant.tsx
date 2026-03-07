import { memo, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface ConstantData {
  value: number;
  label: string;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "Value", direction: "output", dataType: "number" },
];

// ── Renderer ────────────────────────────────────────────────

const ConstantRenderer = memo(function ConstantRenderer(
  props: NodeRendererProps<ConstantData>,
) {
  const { data, portValues } = props;
  const cd = data as ConstantData;
  const outputVal = portValues?.value ?? cd.value;

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
      {/* Circle shape via SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <radialGradient id="const-bg" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#222244" />
            <stop offset="100%" stopColor="#141428" />
          </radialGradient>
        </defs>
        <circle
          cx={50} cy={50} r={47}
          fill="url(#const-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Subtle inner ring */}
        <circle
          cx={50} cy={50} r={40}
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={0.5}
          opacity={0.1}
          vectorEffect="non-scaling-stroke"
        />
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
          padding: "20%",
          boxSizing: "border-box",
        }}
      >
        <div style={{
          fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          {cd.label || "Const"}
        </div>
        <div style={{
          fontSize: 20, fontWeight: 800, color: cd.accentColor, lineHeight: 1, marginTop: 2,
          textShadow: `0 0 10px ${cd.accentColor}33`,
        }}>
          {typeof outputVal === "number" ? outputVal : String(outputVal)}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ConstantPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<ConstantData>) {
  const cd = data as ConstantData;

  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      if (!isNaN(v)) updateData({ value: v });
    },
    [updateData],
  );

  const onLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateData({ label: e.target.value });
    },
    [updateData],
  );

  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <>
      <div style={row}>
        <span style={label}>Value</span>
        <input
          type="number"
          value={cd.value}
          onChange={onValueChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
      <div style={row}>
        <span style={label}>Label</span>
        <input
          type="text"
          value={cd.label}
          onChange={onLabelChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const constantNodeType: NodeTypeDefinition<ConstantData> = {
  type: "constant",
  component: ConstantRenderer,
  propertiesPanel: ConstantPropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: ConstantData) => ({
    value: data.value,
  }),
  getClipboardText: (node) => String((node.data as ConstantData).value),
};
