import { memo, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export interface RoundData {
  mode: "round" | "floor" | "ceil";
  decimals: number;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "In", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "out", label: "Out", direction: "output", dataType: "number" },
];

// ── Helpers ─────────────────────────────────────────────────

const MODE_INFO: { key: RoundData["mode"]; label: string; symbol: string }[] = [
  { key: "round", label: "Round", symbol: "\u2248" },
  { key: "floor", label: "Floor", symbol: "\u230A" },
  { key: "ceil", label: "Ceil", symbol: "\u2308" },
];

function applyRound(value: number, mode: RoundData["mode"], decimals: number): number {
  const factor = Math.pow(10, decimals);
  switch (mode) {
    case "round": return Math.round(value * factor) / factor;
    case "floor": return Math.floor(value * factor) / factor;
    case "ceil": return Math.ceil(value * factor) / factor;
  }
}

// ── Renderer ────────────────────────────────────────────────

const RoundRenderer = memo(function RoundRenderer(
  props: NodeRendererProps<RoundData>,
) {
  const { data, portValues } = props;
  const cd = data as RoundData;
  const inputVal = Number(portValues?.value ?? 0);
  const result = applyRound(inputVal, cd.mode, cd.decimals);
  const info = MODE_INFO.find((m) => m.key === cd.mode)!;
  const formatted = cd.decimals > 0 ? result.toFixed(cd.decimals) : String(result);

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
      {/* Rounded rectangle with emphasized corners */}
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="round-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={76}
          rx={18} ry={18}
          fill="url(#round-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Decorative inner rounded rect */}
        <rect
          x={10} y={10} width={100} height={60}
          rx={12} ry={12}
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
          padding: "8% 12%",
          boxSizing: "border-box",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <span style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
            {info.label}
          </span>
          <span style={{ fontSize: 12, color: cd.accentColor, opacity: 0.6 }}>
            {info.symbol}
          </span>
        </div>
        <div style={{
          fontSize: 16, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          marginTop: 4,
          fontVariantNumeric: "tabular-nums",
        }}>
          {formatted}
        </div>
        {cd.decimals > 0 && (
          <div style={{ fontSize: 8, color: "#555", marginTop: 3 }}>
            {cd.decimals} decimal{cd.decimals !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function RoundPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<RoundData>) {
  const cd = data as RoundData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  const onDecimalsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 0 && v <= 10) updateData({ decimals: v });
    },
    [updateData],
  );

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Mode</span>
        {MODE_INFO.map((m) => (
          <button
            key={m.key}
            onClick={() => updateData({ mode: m.key })}
            style={{
              padding: "3px 8px",
              background: cd.mode === m.key ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div style={row}>
        <span style={label}>Decimals</span>
        <input
          type="number"
          min={0}
          max={10}
          value={cd.decimals}
          onChange={onDecimalsChange}
          style={{
            width: 60, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const roundNodeType: NodeTypeDefinition<RoundData> = {
  type: "round",
  docs: {},
  component: RoundRenderer,
  propertiesPanel: RoundPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: RoundData) => {
    const value = Number(inputs.value ?? 0);
    return { out: applyRound(value, data.mode, data.decimals) };
  },
  getClipboardText: (node) => `Round (${(node.data as RoundData).mode})`,
};
