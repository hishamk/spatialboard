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

export interface MapRemapData {
  inMin: number;
  inMax: number;
  outMin: number;
  outMax: number;
  clamp: boolean;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "In", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "out", label: "Out", direction: "output", dataType: "number" },
];

// ── Helpers ─────────────────────────────────────────────────

function remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number, clamp: boolean): number {
  if (inMax === inMin) return outMin;
  let t = (value - inMin) / (inMax - inMin);
  if (clamp) t = Math.max(0, Math.min(1, t));
  return outMin + t * (outMax - outMin);
}

// ── Renderer ────────────────────────────────────────────────

const MapRemapRenderer = memo(function MapRemapRenderer(
  props: NodeRendererProps<MapRemapData>,
) {
  const { data, portValues } = props;
  const cd = data as MapRemapData;
  const inputVal = Number(portValues?.value ?? 0);
  const outputVal = remap(inputVal, cd.inMin, cd.inMax, cd.outMin, cd.outMax, cd.clamp);
  const formatted = Number.isInteger(outputVal) ? String(outputVal) : outputVal.toFixed(2);

  // Normalized position for the indicator (0-1)
  const t = cd.inMax !== cd.inMin
    ? Math.max(0, Math.min(1, (inputVal - cd.inMin) / (cd.inMax - cd.inMin)))
    : 0;

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
      {/* Bowtie / hourglass horizontal shape */}
      <svg
        viewBox="0 0 140 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="map-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Two converging trapezoids forming a remap shape */}
        <polygon
          points="4,4 56,28 56,52 4,76"
          fill="url(#map-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          points="84,28 136,4 136,76 84,52"
          fill="url(#map-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Center connection */}
        <rect
          x={56} y={28} width={28} height={24}
          fill="url(#map-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Arrow in center */}
        <path
          d="M62 40 L78 40 M74 35 L78 40 L74 45"
          stroke={cd.accentColor}
          strokeWidth={1.5}
          fill="none"
          opacity={0.6}
          vectorEffect="non-scaling-stroke"
        />
        {/* Input level indicator */}
        <line
          x1={8} y1={8 + t * 64} x2={52} y2={30 + t * 20}
          stroke={cd.accentColor}
          strokeWidth={1}
          opacity={0.3}
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
          padding: "8% 10%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Map
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 4, marginTop: 2,
          fontSize: 8, color: "#666",
        }}>
          <span>{cd.inMin}{"\u2013"}{cd.inMax}</span>
          <span style={{ color: cd.accentColor }}>{"\u2192"}</span>
          <span>{cd.outMin}{"\u2013"}{cd.outMax}</span>
        </div>
        <div style={{
          fontSize: 14, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          marginTop: 4,
          fontVariantNumeric: "tabular-nums",
        }}>
          {formatted}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function MapRemapPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<MapRemapData>) {
  const cd = data as MapRemapData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };
  const inputStyle: React.CSSProperties = {
    flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
    borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
    minWidth: 0,
  };

  const onNum = useCallback(
    (field: keyof MapRemapData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      if (!isNaN(v)) updateData({ [field]: v });
    },
    [updateData],
  );

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>In range</span>
        <input type="number" value={cd.inMin} onChange={onNum("inMin")} style={inputStyle} />
        <span style={{ fontSize: 10, color: "#666" }}>{"\u2013"}</span>
        <input type="number" value={cd.inMax} onChange={onNum("inMax")} style={inputStyle} />
      </div>
      <div style={row}>
        <span style={label}>Out range</span>
        <input type="number" value={cd.outMin} onChange={onNum("outMin")} style={inputStyle} />
        <span style={{ fontSize: 10, color: "#666" }}>{"\u2013"}</span>
        <input type="number" value={cd.outMax} onChange={onNum("outMax")} style={inputStyle} />
      </div>
      <div style={row}>
        <span style={label}>Clamp</span>
        <button
          onClick={() => updateData({ clamp: !cd.clamp })}
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

export const mapRemapNodeType: NodeTypeDefinition<MapRemapData> = {
  type: "map-remap",
  docs: {},
  component: MapRemapRenderer,
  propertiesPanel: MapRemapPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: MapRemapData) => {
    const value = Number(inputs.value ?? 0);
    return { out: remap(value, data.inMin, data.inMax, data.outMin, data.outMax, data.clamp) };
  },
  getClipboardText: (node) => {
    const d = node.data as MapRemapData;
    return `Map ${d.inMin}-${d.inMax} \u2192 ${d.outMin}-${d.outMax}`;
  },
};
