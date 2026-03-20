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

export interface OnceData {
  fired: boolean;
  lastTrigger: number;
  lastReset: number;
  fireCount: number;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "In", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "reset", label: "Reset", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "out", label: "Out", direction: "output", dataType: "signal" },
];

// ── Renderer ────────────────────────────────────────────────

const OnceRenderer = memo(function OnceRenderer(
  props: NodeRendererProps<OnceData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as OnceData;
  const triggerVal = (portValues?.trigger as number) ?? 0;
  const resetVal = (portValues?.reset as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const firedRef = useRef(cd.fired);
  firedRef.current = cd.fired;
  const fireCountRef = useRef(cd.fireCount);
  fireCountRef.current = cd.fireCount;

  // Trigger — only fires once
  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    if (firedRef.current) {
      updateDataRef.current({ lastTrigger: triggerVal });
      return;
    }
    updateDataRef.current({
      lastTrigger: triggerVal,
      fired: true,
      fireCount: fireCountRef.current + 1,
    });
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset
  useEffect(() => {
    if (resetVal <= 0 || resetVal === cd.lastReset) return;
    updateDataRef.current({ lastReset: resetVal, fired: false });
  }, [resetVal]); // eslint-disable-line react-hooks/exhaustive-deps

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
      {/* Simple rect with "1" emphasis */}
      <svg
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="once-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={cd.fired ? "#2e1e1e" : "#1e1e38"} />
            <stop offset="100%" stopColor={cd.fired ? "#281414" : "#141428"} />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={96} height={76}
          rx={8} ry={8}
          fill="url(#once-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Big "1" watermark */}
        <text
          x={50} y={58}
          textAnchor="middle"
          fontSize={48}
          fontWeight={900}
          fill={cd.accentColor}
          opacity={cd.fired ? 0.06 : 0.08}
          fontFamily="'Inter', system-ui, sans-serif"
        >
          1
        </text>
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
          padding: "10% 12%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Once
        </div>
        <div style={{
          fontSize: 18, fontWeight: 900, lineHeight: 1,
          marginTop: 4,
          color: cd.fired ? "#555" : cd.accentColor,
        }}>
          {cd.fired ? "DONE" : "READY"}
        </div>
        {cd.fired && (
          <div style={{ fontSize: 8, color: "#ef4444", marginTop: 3, fontWeight: 600 }}>
            blocked
          </div>
        )}
      </div>
    </div>
  );
});

function OncePropertiesPanel(props: NodePropertiesPanelProps<OnceData>) {
  return (
    <>
      <ShowEdgeComputeOverlayField {...props} />
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const onceNodeType: NodeTypeDefinition<OnceData> = {
  type: "once",
  docs: {},
  component: OnceRenderer,
  propertiesPanel: OncePropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: OnceData) => ({
    out: data.fireCount,
  }),
  getClipboardText: () => "Once",
};
