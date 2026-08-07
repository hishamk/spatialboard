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

export interface GateData {
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "Value", direction: "input", dataType: "any" },
  { id: "enable", label: "Open", direction: "input", dataType: "boolean", defaultValue: false },
  { id: "out", label: "Out", direction: "output", dataType: "any" },
];

// ── Renderer ────────────────────────────────────────────────

const GateRenderer = memo(function GateRenderer(
  props: NodeRendererProps<GateData>,
) {
  const { data, portValues } = props;
  const cd = data as GateData;
  const enable = Boolean(portValues?.enable);
  const value = portValues?.value ?? null;
  const hasValue = value !== null && value !== undefined;

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
      {/* Trapezoid shape (gate/valve) */}
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="gate-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={enable ? "#1a2e1a" : "#1e1e38"} />
            <stop offset="100%" stopColor={enable ? "#142814" : "#141428"} />
          </linearGradient>
        </defs>
        <polygon
          points="15,2 105,2 118,78 2,78"
          fill="url(#gate-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {enable && (
          <polygon
            points="18,6 102,6 114,74 6,74"
            fill="none"
            stroke={cd.accentColor}
            strokeWidth={0.5}
            opacity={0.2}
            vectorEffect="non-scaling-stroke"
          />
        )}
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
          padding: "10% 14%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Gate
        </div>
        {/* Gate icon */}
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ margin: "4px 0" }}>
          {enable ? (
            <>
              {/* Open gate */}
              <path d="M2 12h8" stroke={cd.accentColor} strokeWidth={2.5} strokeLinecap="round" />
              <path d="M14 12h8" stroke={cd.accentColor} strokeWidth={2.5} strokeLinecap="round" />
              <rect x={10} y={6} width={4} height={12} rx={1} fill={cd.accentColor} opacity={0.3} />
              <rect x={10} y={3} width={4} height={4} rx={1} fill={cd.accentColor} opacity={0.7} />
            </>
          ) : (
            <>
              {/* Closed gate */}
              <path d="M2 12h8" stroke="#444" strokeWidth={2.5} strokeLinecap="round" />
              <path d="M14 12h8" stroke="#444" strokeWidth={2.5} strokeLinecap="round" opacity={0.3} />
              <rect x={10} y={6} width={4} height={12} rx={1} fill="#ef4444" opacity={0.5} />
            </>
          )}
        </svg>
        <div style={{
          fontSize: 9,
          color: enable ? "#10b981" : "#ef4444",
          fontWeight: 700,
          textShadow: enable ? "0 0 6px #10b98144" : "0 0 6px #ef444444",
        }}>
          {enable ? (hasValue ? "OPEN" : "OPEN") : "CLOSED"}
        </div>
      </div>
    </div>
  );
});

function GatePropertiesPanel(props: NodePropertiesPanelProps<GateData>) {
  return (
    <>
      <ShowEdgeComputeOverlayField {...props} />
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const gateNodeType: NodeTypeDefinition<GateData> = {
  type: "gate",
  docs: {},
  component: GateRenderer,
  propertiesPanel: GatePropertiesPanel,
  // Body is drawn inset from its box, so anchor ports on the drawn edge.
  portAnchor: { kind: "inset", left: 0.071, right: 0.071 },
  ports,
  compute: (inputs: Record<string, PortValue>) => {
    const enable = Boolean(inputs.enable);
    return { out: enable ? (inputs.value ?? null) : null };
  },
  getClipboardText: () => "Gate",
};
