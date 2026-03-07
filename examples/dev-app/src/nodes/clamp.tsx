import { memo, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface ClampData {
  min: number;
  max: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "In", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "out", label: "Out", direction: "output", dataType: "number" },
];

// ── Renderer ────────────────────────────────────────────────

const ClampRenderer = memo(function ClampRenderer(
  props: NodeRendererProps<ClampData>,
) {
  const { data, portValues } = props;
  const cd = data as ClampData;
  const inputVal = Number(portValues?.value ?? 0);
  const clamped = Math.max(cd.min, Math.min(cd.max, inputVal));
  const isClamped = inputVal !== clamped;
  const formatted = Number.isInteger(clamped) ? String(clamped) : clamped.toFixed(2);

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
      {/* Bracket / clamp shape */}
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="clamp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Main body */}
        <rect
          x={2} y={2} width={116} height={76}
          rx={6} ry={6}
          fill="url(#clamp-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Left bracket */}
        <path
          d="M16,12 L8,12 L8,68 L16,68"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.5}
          vectorEffect="non-scaling-stroke"
        />
        {/* Right bracket */}
        <path
          d="M104,12 L112,12 L112,68 L104,68"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={0.5}
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
          padding: "8% 16%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Clamp
        </div>
        <div style={{
          fontSize: 16, fontWeight: 800, lineHeight: 1,
          marginTop: 4,
          color: isClamped ? "#ef4444" : cd.accentColor,
          fontVariantNumeric: "tabular-nums",
        }}>
          {formatted}
        </div>
        <div style={{
          fontSize: 8, color: "#555", marginTop: 4,
          display: "flex", gap: 4, alignItems: "center",
        }}>
          <span>{cd.min}</span>
          <span style={{ color: "#333" }}>{"\u2264"}</span>
          <span style={{ color: isClamped ? "#ef4444" : "#888", fontWeight: 600 }}>x</span>
          <span style={{ color: "#333" }}>{"\u2264"}</span>
          <span>{cd.max}</span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ClampPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<ClampData>) {
  const cd = data as ClampData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 40, fontSize: 10, color: "#999", flexShrink: 0 };
  const inputStyle: React.CSSProperties = {
    flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
    borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
  };

  const onNum = useCallback(
    (field: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      if (!isNaN(v)) updateData({ [field]: v });
    },
    [updateData],
  );

  return (
    <>
      <div style={row}>
        <span style={label}>Min</span>
        <input type="number" value={cd.min} onChange={onNum("min")} style={inputStyle} />
      </div>
      <div style={row}>
        <span style={label}>Max</span>
        <input type="number" value={cd.max} onChange={onNum("max")} style={inputStyle} />
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const clampNodeType: NodeTypeDefinition<ClampData> = {
  type: "clamp",
  component: ClampRenderer,
  propertiesPanel: ClampPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: ClampData) => {
    const value = Number(inputs.value ?? 0);
    return { out: Math.max(data.min, Math.min(data.max, value)) };
  },
  getClipboardText: (node) => {
    const d = node.data as ClampData;
    return `Clamp [${d.min}, ${d.max}]`;
  },
};
