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

export interface DisplayData {
  label: string;
  format: "raw" | "number" | "json";
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "Value", direction: "input", dataType: "any" },
];

// ── Renderer ────────────────────────────────────────────────

function formatValue(val: PortValue, format: DisplayData["format"]): string {
  if (val === null || val === undefined) return "\u2014";
  if (format === "number" && typeof val === "number") {
    return Number.isInteger(val) ? String(val) : val.toFixed(2);
  }
  if (format === "json") {
    return JSON.stringify(val, null, 2);
  }
  return String(val);
}

const DisplayRenderer = memo(function DisplayRenderer(
  props: NodeRendererProps<DisplayData>,
) {
  const { data, portValues } = props;
  const cd = data as DisplayData;
  const inputVal = portValues?.value ?? null;
  const formatted = formatValue(inputVal, cd.format);
  const hasValue = inputVal !== null && inputVal !== undefined;

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
      {/* Parallelogram / output shape via SVG */}
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
          <linearGradient id="disp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#12121e" />
          </linearGradient>
        </defs>
        {/* Parallelogram */}
        <polygon
          points="14,2 118,2 106,78 2,78"
          fill="url(#disp-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
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
          alignItems: "stretch",
          justifyContent: "flex-start",
          padding: "8% 11% 9%",
          boxSizing: "border-box",
          gap: 3,
          minHeight: 0,
        }}
      >
        <div
          style={{
            fontSize: 7,
            color: "#555",
            letterSpacing: 1.2,
            textTransform: "uppercase",
            flexShrink: 0,
            textAlign: "center",
          }}
        >
          {cd.label || "Display"}
        </div>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            width: "100%",
            overflow: "auto",
            fontSize:
              cd.format === "json" ? 7 : cd.format === "number" ? 11 : 9,
            fontWeight: cd.format === "number" ? 800 : 600,
            color: hasValue ? cd.accentColor : "#444",
            fontFamily: cd.format === "json" ? "'JetBrains Mono', ui-monospace, monospace" : "inherit",
            whiteSpace: cd.format === "json" ? "pre-wrap" : "normal",
            textAlign: "center",
            wordBreak: "break-word",
            lineHeight: 1.25,
            textShadow: hasValue ? `0 0 8px ${cd.accentColor}28` : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {formatted}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

const FORMAT_OPTIONS: { key: DisplayData["format"]; label: string }[] = [
  { key: "raw", label: "Raw" },
  { key: "number", label: "#.##" },
  { key: "json", label: "JSON" },
];

function DisplayPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<DisplayData>) {
  const cd = data as DisplayData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Label</span>
        <input
          type="text"
          value={cd.label}
          onChange={(e) => updateData({ label: e.target.value })}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
      <div style={row}>
        <span style={label}>Format</span>
        {FORMAT_OPTIONS.map((fmt) => (
          <button
            key={fmt.key}
            onClick={() => updateData({ format: fmt.key })}
            style={{
              padding: "4px 10px",
              background: cd.format === fmt.key ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6,
              color: "#fff",
              fontSize: 10,
              cursor: "pointer",
            }}
          >
            {fmt.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const displayNodeType: NodeTypeDefinition<DisplayData> = {
  type: "display",
  docs: {},
  component: DisplayRenderer,
  propertiesPanel: DisplayPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>) => {
    // Display is a sink — it just passes through for rendering
    return { _displayValue: inputs.value ?? null };
  },
  getClipboardText: () => "Display",
};
