import { memo, useRef, useEffect } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export interface ToggleData {
  state: boolean;
  lastTrigger: number;
  lastReset: number;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "Toggle", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "reset", label: "Reset", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "state", label: "State", direction: "output", dataType: "boolean" },
];

// ── Renderer ────────────────────────────────────────────────

const ToggleRenderer = memo(function ToggleRenderer(
  props: NodeRendererProps<ToggleData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as ToggleData;
  const triggerVal = (portValues?.trigger as number) ?? 0;
  const resetVal = (portValues?.reset as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const stateRef = useRef(cd.state);
  stateRef.current = cd.state;

  // Toggle on trigger
  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    updateDataRef.current({ lastTrigger: triggerVal, state: !stateRef.current });
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset
  useEffect(() => {
    if (resetVal <= 0 || resetVal === cd.lastReset) return;
    updateDataRef.current({ lastReset: resetVal, state: false });
  }, [resetVal]); // eslint-disable-line react-hooks/exhaustive-deps

  const on = cd.state;
  const trackW = 60; // percentage
  const knobX = on ? 68 : 32;

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
      {/* Rounded capsule shape */}
      <svg
        viewBox="0 0 120 70"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="toggle-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={on ? "#1a2e1a" : "#1e1e38"} />
            <stop offset="100%" stopColor={on ? "#142814" : "#141428"} />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={66}
          rx={33} ry={33}
          fill="url(#toggle-bg)"
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
          padding: "8% 12%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Toggle
        </div>
        {/* Switch track */}
        <svg width="100%" height={20} viewBox="0 0 100 20" style={{ margin: "4px 0", maxWidth: 70 }}>
          <rect
            x={(100 - trackW) / 2} y={2} width={trackW} height={16}
            rx={8} ry={8}
            fill={on ? cd.accentColor : "#333"}
            fillOpacity={on ? 0.3 : 0.5}
            stroke={on ? cd.accentColor : "#444"}
            strokeWidth={1}
          />
          <circle
            cx={knobX} cy={10} r={7}
            fill={on ? cd.accentColor : "#666"}
            stroke={on ? "#fff" : "#444"}
            strokeWidth={1}
            style={{ transition: "cx 0.15s ease" }}
          />
        </svg>
        <div style={{
          fontSize: 10,
          fontWeight: 700,
          color: on ? "#10b981" : "#ef4444",
          textShadow: on ? "0 0 6px #10b98144" : "0 0 6px #ef444444",
        }}>
          {on ? "ON" : "OFF"}
        </div>
      </div>
    </div>
  );
});

function TogglePropertiesPanel(props: NodePropertiesPanelProps<ToggleData>) {
  return (
    <>
      <ShowEdgeComputeOverlayField {...props} />
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const toggleNodeType: NodeTypeDefinition<ToggleData> = {
  type: "toggle",
  docs: {},
  component: ToggleRenderer,
  propertiesPanel: TogglePropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: ToggleData) => ({
    state: data.state,
  }),
  getClipboardText: (node) => `Toggle: ${(node.data as ToggleData).state ? "ON" : "OFF"}`,
};
