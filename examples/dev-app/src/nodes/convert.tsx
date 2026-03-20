import { memo } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export type ConvertTarget = "number" | "string" | "boolean" | "json";

export interface ConvertData {
  target: ConvertTarget;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "input", label: "In", direction: "input", dataType: "any" },
  { id: "output", label: "Out", direction: "output", dataType: "any" },
  { id: "error", label: "Err", direction: "output", dataType: "string" },
];

// ── Helpers ─────────────────────────────────────────────────

const TARGET_INFO: { key: ConvertTarget; label: string; symbol: string; color: string }[] = [
  { key: "number", label: "Number", symbol: "#", color: "#3b82f6" },
  { key: "string", label: "String", symbol: "Aa", color: "#10b981" },
  { key: "boolean", label: "Boolean", symbol: "?!", color: "#f59e0b" },
  { key: "json", label: "JSON", symbol: "{}", color: "#8b5cf6" },
];

function convert(value: PortValue, target: ConvertTarget): { output: PortValue; error: string } {
  try {
    switch (target) {
      case "number": {
        if (value === null || value === undefined) return { output: 0, error: "" };
        if (typeof value === "boolean") return { output: value ? 1 : 0, error: "" };
        const n = Number(value);
        if (isNaN(n)) return { output: null, error: "NaN" };
        return { output: n, error: "" };
      }
      case "string": {
        if (value === null || value === undefined) return { output: "", error: "" };
        if (typeof value === "object") return { output: JSON.stringify(value), error: "" };
        return { output: String(value), error: "" };
      }
      case "boolean": {
        if (value === null || value === undefined) return { output: false, error: "" };
        if (typeof value === "string") return { output: value !== "" && value !== "0" && value !== "false", error: "" };
        return { output: Boolean(value), error: "" };
      }
      case "json": {
        if (typeof value === "string") {
          const parsed = JSON.parse(value);
          return { output: parsed as PortValue, error: "" };
        }
        return { output: JSON.stringify(value) as PortValue, error: "" };
      }
    }
  } catch (e) {
    return { output: null, error: (e as Error).message };
  }
}

function preview(val: PortValue): string {
  if (val === null || val === undefined) return "\u2014";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return Number.isInteger(val) ? String(val) : val.toFixed(2);
  const s = String(val);
  return s.length > 18 ? s.slice(0, 17) + "\u2026" : s;
}

// ── Renderer ────────────────────────────────────────────────

const ConvertRenderer = memo(function ConvertRenderer(
  props: NodeRendererProps<ConvertData>,
) {
  const { data, portValues } = props;
  const cd = data as ConvertData;
  const input = portValues?.input ?? null;
  const info = TARGET_INFO.find((t) => t.key === cd.target)!;
  const { output, error } = convert(input, cd.target);

  const inputType = input === null ? "null" : typeof input;

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
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="conv-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={96} height={76}
          rx={6} ry={6}
          fill="url(#conv-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Arrow decoration showing conversion */}
        <path
          d="M30,40 L70,40 M64,34 L70,40 L64,46"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={1.5}
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
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
            Convert
          </span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 4, marginTop: 3,
        }}>
          <span style={{ fontSize: 8, color: "#555" }}>{inputType}</span>
          <span style={{ fontSize: 10, color: "#333" }}>{"\u2192"}</span>
          <span style={{ fontSize: 10, color: info.color, fontWeight: 700 }}>{info.symbol}</span>
        </div>
        {error ? (
          <span style={{ fontSize: 8, color: "#ef4444", marginTop: 3, fontWeight: 600 }}>
            {error.length > 20 ? error.slice(0, 19) + "\u2026" : error}
          </span>
        ) : (
          <span style={{
            fontSize: 10, fontWeight: 700, color: cd.accentColor,
            marginTop: 3,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {preview(output)}
          </span>
        )}
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ConvertPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<ConvertData>) {
  const cd = data as ConvertData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>To</span>
        {TARGET_INFO.map((t) => (
          <button
            key={t.key}
            onClick={() => updateData({ target: t.key })}
            style={{
              padding: "3px 8px",
              background: cd.target === t.key ? t.color : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const convertNodeType: NodeTypeDefinition<ConvertData> = {
  type: "convert",
  docs: {},
  component: ConvertRenderer,
  propertiesPanel: ConvertPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: ConvertData) => {
    const { output, error } = convert(inputs.input ?? null, data.target);
    return { output, error };
  },
  getClipboardText: (node) => `Convert to ${(node.data as ConvertData).target}`,
};
