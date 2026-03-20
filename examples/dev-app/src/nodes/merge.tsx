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

export interface MergeData {
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "any" },
  { id: "b", label: "B", direction: "input", dataType: "any" },
  { id: "c", label: "C", direction: "input", dataType: "any" },
  { id: "d", label: "D", direction: "input", dataType: "any" },
  { id: "out", label: "Out", direction: "output", dataType: "object" },
];

// ── Helpers ─────────────────────────────────────────────────

function formatVal(val: PortValue): string {
  if (val === null || val === undefined) return "\u2014";
  if (typeof val === "object") return "{...}";
  const s = String(val);
  return s.length > 8 ? s.slice(0, 7) + "\u2026" : s;
}

// ── Renderer ────────────────────────────────────────────────

const MergeRenderer = memo(function MergeRenderer(
  props: NodeRendererProps<MergeData>,
) {
  const { data, portValues } = props;
  const cd = data as MergeData;
  const a = portValues?.a ?? null;
  const b = portValues?.b ?? null;
  const c = portValues?.c ?? null;
  const d = portValues?.d ?? null;
  const hasAny = a !== null || b !== null || c !== null || d !== null;

  const entries = [
    { key: "a", val: a },
    { key: "b", val: b },
    { key: "c", val: c },
    { key: "d", val: d },
  ].filter(e => e.val !== null && e.val !== undefined);

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
      {/* Funnel / converging shape */}
      <svg
        viewBox="0 0 100 120"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="merge-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Funnel shape: wide top, narrow bottom right */}
        <path
          d="M4,4 L96,4 L96,40 Q96,60 70,80 L60,88 Q50,96 50,116 L4,116 L4,80 Q4,60 30,40 Z"
          fill="url(#merge-bg)"
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
          justifyContent: "flex-start",
          padding: "8% 14%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Merge
        </div>
        {/* Key-value list */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 2,
          marginTop: 6, width: "100%",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontSize: 8,
        }}>
          {hasAny ? entries.map((e) => (
            <div key={e.key} style={{
              display: "flex", justifyContent: "space-between",
              color: "#666",
            }}>
              <span style={{ color: cd.accentColor, fontWeight: 600 }}>{e.key}</span>
              <span>{formatVal(e.val as PortValue)}</span>
            </div>
          )) : (
            <div style={{ color: "#333", fontStyle: "italic", textAlign: "center", fontSize: 8 }}>
              no inputs
            </div>
          )}
        </div>
        {/* Output indicator */}
        <div style={{
          marginTop: "auto",
          fontSize: 8, color: "#444",
          paddingBottom: "4%",
        }}>
          {"{"}
          {entries.map(e => e.key).join(", ")}
          {"}"}
        </div>
      </div>
    </div>
  );
});

function MergePropertiesPanel(props: NodePropertiesPanelProps<MergeData>) {
  return (
    <>
      <ShowEdgeComputeOverlayField {...props} />
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const mergeNodeType: NodeTypeDefinition<MergeData> = {
  type: "merge",
  component: MergeRenderer,
  docs: {},
  propertiesPanel: MergePropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>) => {
    const obj: Record<string, PortValue> = {};
    for (const key of ["a", "b", "c", "d"]) {
      const val = inputs[key];
      if (val !== null && val !== undefined) {
        obj[key] = val;
      }
    }
    return { out: obj };
  },
  getClipboardText: () => "Merge",
};
