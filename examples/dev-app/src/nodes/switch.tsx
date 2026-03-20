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

export interface SwitchData {
  channels: 2 | 3 | 4;
  mode: "index" | "match";
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "index", label: "Sel", direction: "input", dataType: "any", defaultValue: 0 },
  { id: "a", label: "A", direction: "input", dataType: "any" },
  { id: "b", label: "B", direction: "input", dataType: "any" },
  { id: "c", label: "C", direction: "input", dataType: "any" },
  { id: "d", label: "D", direction: "input", dataType: "any" },
  { id: "out", label: "Out", direction: "output", dataType: "any" },
];

const CHANNEL_IDS = ["a", "b", "c", "d"];

// ── Helpers ─────────────────────────────────────────────────

function resolveSwitch(
  inputs: Record<string, PortValue>,
  data: SwitchData,
): { selected: number; output: PortValue } {
  const channels = data.channels;
  const sel = inputs.index;

  if (data.mode === "match") {
    // Find first channel whose value equals the selector
    for (let i = 0; i < channels; i++) {
      const chVal = inputs[CHANNEL_IDS[i]];
      // eslint-disable-next-line eqeqeq
      if (chVal != null && sel != null && chVal == sel) {
        return { selected: i, output: chVal };
      }
    }
    return { selected: -1, output: null }; // no match
  }

  // Index mode
  const idx = Math.floor(Number(sel ?? 0));
  const clamped = Math.max(0, Math.min(channels - 1, idx));
  return { selected: clamped, output: inputs[CHANNEL_IDS[clamped]] ?? null };
}

// ── Renderer ────────────────────────────────────────────────

const SwitchRenderer = memo(function SwitchRenderer(
  props: NodeRendererProps<SwitchData>,
) {
  const { data, portValues } = props;
  const cd = data as SwitchData;
  const { selected } = resolveSwitch(portValues ?? {}, cd);
  const selectedLabel = selected >= 0 ? CHANNEL_IDS[selected].toUpperCase() : "\u2014";

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
      {/* Pentagon / arrow shape */}
      <svg
        viewBox="0 0 120 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="switch-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Pentagon pointing right */}
        <polygon
          points="4,4 85,4 116,50 85,96 4,96"
          fill="url(#switch-bg)"
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
          alignItems: "center",
          justifyContent: "center",
          padding: "10% 18% 10% 10%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
            Switch
          </span>
          <span style={{ fontSize: 7, color: cd.accentColor, opacity: 0.6 }}>
            {cd.mode === "match" ? "match" : "idx"}
          </span>
        </div>
        {/* Channel indicators */}
        <div style={{
          display: "flex", gap: 4, margin: "6px 0 4px",
          alignItems: "center",
        }}>
          {CHANNEL_IDS.slice(0, cd.channels).map((ch, i) => (
            <div
              key={ch}
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                background: i === selected ? cd.accentColor : "#2a2a3e",
                border: `1px solid ${i === selected ? cd.accentColor : "#3a3a4e"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 700,
                color: i === selected ? "#fff" : "#555",
                transition: "all 0.1s ease",
              }}
            >
              {ch.toUpperCase()}
            </div>
          ))}
        </div>
        <div style={{
          fontSize: 9, color: selected >= 0 ? cd.accentColor : "#555", fontWeight: 600,
        }}>
          {"\u2192"} {selectedLabel}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function SwitchPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<SwitchData>) {
  const cd = data as SwitchData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Channels</span>
        {([2, 3, 4] as const).map((n) => (
          <button
            key={n}
            onClick={() => updateData({ channels: n })}
            style={{
              padding: "3px 10px",
              background: cd.channels === n ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer",
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <div style={row}>
        <span style={label}>Mode</span>
        {(["index", "match"] as const).map((m) => (
          <button
            key={m}
            onClick={() => updateData({ mode: m })}
            style={{
              padding: "3px 8px",
              background: cd.mode === m ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer",
            }}
          >
            {m === "index" ? "By Index" : "By Match"}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const switchNodeType: NodeTypeDefinition<SwitchData> = {
  type: "switch",
  docs: {},
  component: SwitchRenderer,
  propertiesPanel: SwitchPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: SwitchData) => {
    const { output } = resolveSwitch(inputs, data);
    return { out: output };
  },
  getClipboardText: (node) => `Switch (${(node.data as SwitchData).mode})`,
};
