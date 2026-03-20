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

export interface LerpData {
  clamp: boolean;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "b", label: "B", direction: "input", dataType: "number", defaultValue: 1 },
  { id: "t", label: "T", direction: "input", dataType: "number", defaultValue: 0.5 },
  { id: "result", label: "Result", direction: "output", dataType: "number" },
];

// ── Renderer ────────────────────────────────────────────────

const LerpRenderer = memo(function LerpRenderer(
  props: NodeRendererProps<LerpData>,
) {
  const { data, portValues } = props;
  const cd = data as LerpData;
  const a = Number(portValues?.a ?? 0);
  const b = Number(portValues?.b ?? 1);
  let t = Number(portValues?.t ?? 0.5);
  if (cd.clamp) t = Math.max(0, Math.min(1, t));
  const result = a + (b - a) * t;
  const tDisplay = t.toFixed(2);
  const resultDisplay = Number.isInteger(result) ? String(result) : result.toFixed(2);

  // Visual gradient position (clamped 0-1 for display)
  const gradT = Math.max(0, Math.min(1, t));

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
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="lerp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
          <linearGradient id="lerp-bar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={cd.accentColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={cd.accentColor} stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={76}
          rx={6} ry={6}
          fill="url(#lerp-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Gradient bar */}
        <rect
          x={12} y={56} width={96} height={6}
          rx={3} ry={3}
          fill="url(#lerp-bar)"
        />
        {/* Indicator dot */}
        <circle
          cx={12 + 96 * gradT} cy={59}
          r={4}
          fill={cd.accentColor}
          stroke="#fff"
          strokeWidth={1}
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
          justifyContent: "flex-start",
          padding: "8% 12% 22%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Lerp
        </div>
        <div style={{
          fontSize: 16, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          marginTop: 4,
          fontVariantNumeric: "tabular-nums",
        }}>
          {resultDisplay}
        </div>
        <div style={{
          display: "flex", gap: 6, marginTop: 4,
          fontSize: 8, color: "#555",
        }}>
          <span>{a}</span>
          <span style={{ color: cd.accentColor, fontWeight: 600 }}>t={tDisplay}</span>
          <span>{b}</span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function LerpPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<LerpData>) {
  const cd = data as LerpData;

  const onClampToggle = useCallback(
    () => updateData({ clamp: !cd.clamp }),
    [cd.clamp, updateData],
  );

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ width: 48, fontSize: 10, color: "#999", flexShrink: 0 }}>Clamp T</span>
        <button
          onClick={onClampToggle}
          style={{
            padding: "3px 10px",
            background: cd.clamp ? cd.accentColor : "#2a2a3e",
            border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer",
          }}
        >
          {cd.clamp ? "On" : "Off"}
        </button>
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const lerpNodeType: NodeTypeDefinition<LerpData> = {
  type: "lerp",
  docs: {},
  component: LerpRenderer,
  propertiesPanel: LerpPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: LerpData) => {
    const a = Number(inputs.a ?? 0);
    const b = Number(inputs.b ?? 1);
    let t = Number(inputs.t ?? 0.5);
    if (data.clamp) t = Math.max(0, Math.min(1, t));
    return { result: a + (b - a) * t };
  },
  getClipboardText: () => "Lerp",
};
