import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface IntervalData {
  interval: number;
  running: boolean;
  tickCount: number;
  lastStart: number;
  lastStop: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "start", label: "Start", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "stop", label: "Stop", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "tick", label: "Tick", direction: "output", dataType: "signal" },
];

// ── Renderer ────────────────────────────────────────────────

const IntervalRenderer = memo(function IntervalRenderer(
  props: NodeRendererProps<IntervalData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as IntervalData;
  const startVal = (portValues?.start as number) ?? 0;
  const stopVal = (portValues?.stop as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const intervalRef = useRef(cd.interval);
  intervalRef.current = cd.interval;
  const tickCountRef = useRef(cd.tickCount);
  tickCountRef.current = cd.tickCount;
  const runningRef = useRef(cd.running);
  runningRef.current = cd.running;

  // Start signal
  useEffect(() => {
    if (startVal <= 0 || startVal === cd.lastStart) return;
    updateDataRef.current({ lastStart: startVal, running: true });
  }, [startVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Stop signal
  useEffect(() => {
    if (stopVal <= 0 || stopVal === cd.lastStop) return;
    updateDataRef.current({ lastStop: stopVal, running: false });
  }, [stopVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Run interval
  useEffect(() => {
    if (!cd.running) return;
    const timer = setInterval(() => {
      updateDataRef.current({ tickCount: tickCountRef.current + 1 });
    }, intervalRef.current);
    return () => clearInterval(timer);
  }, [cd.running, cd.interval]);

  // Pulse animation phase
  const phase = cd.running ? (cd.tickCount % 2 === 0 ? 1 : 0.5) : 0;

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
      {/* Rounded rect with pulse wave */}
      <svg
        viewBox="0 0 140 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="interval-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={cd.running ? "#1a1e2e" : "#1e1e38"} />
            <stop offset="100%" stopColor={cd.running ? "#141828" : "#141428"} />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={136} height={76}
          rx={10} ry={10}
          fill="url(#interval-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Pulse wave decoration */}
        <polyline
          points="10,55 25,55 28,25 35,25 38,55 53,55 56,25 63,25 66,55 81,55 84,25 91,25 94,55 109,55 112,25 119,25 122,55 130,55"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={1.5}
          opacity={cd.running ? 0.25 : 0.08}
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
          Interval
        </div>
        <div style={{
          fontSize: 16, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          marginTop: 4,
          fontVariantNumeric: "tabular-nums",
          opacity: cd.running ? (phase > 0.5 ? 1 : 0.6) : 0.5,
        }}>
          {cd.interval >= 1000 ? `${cd.interval / 1000}s` : `${cd.interval}ms`}
        </div>
        <div style={{
          display: "flex", gap: 6, alignItems: "center", marginTop: 4,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: cd.running ? "#10b981" : "#555",
            boxShadow: cd.running ? "0 0 6px #10b981" : "none",
          }} />
          <span style={{
            fontSize: 8, color: cd.running ? "#10b981" : "#555", fontWeight: 600,
          }}>
            {cd.running ? `\u00d7${cd.tickCount}` : "STOPPED"}
          </span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function IntervalPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<IntervalData>) {
  const cd = data as IntervalData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  const onIntervalChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 10) updateData({ interval: v });
    },
    [updateData],
  );

  return (
    <>
      <div style={row}>
        <span style={label}>Period</span>
        <input
          type="number"
          min={10}
          step={100}
          value={cd.interval}
          onChange={onIntervalChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
        <span style={{ fontSize: 10, color: "#666" }}>ms</span>
      </div>
      <div style={{ ...row, flexWrap: "wrap" }}>
        <span style={label}>Presets</span>
        {[100, 250, 500, 1000, 2000, 5000].map((n) => (
          <button
            key={n}
            onClick={() => updateData({ interval: n })}
            style={{
              padding: "3px 6px",
              background: cd.interval === n ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
            }}
          >
            {n >= 1000 ? `${n / 1000}s` : `${n}`}
          </button>
        ))}
      </div>
      <div style={row}>
        <button
          onClick={() => updateData({ running: !cd.running })}
          style={{
            padding: "4px 12px",
            background: cd.running ? "#ef4444" : "#10b981",
            border: "none",
            borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer",
          }}
        >
          {cd.running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => updateData({ tickCount: 0 })}
          style={{
            padding: "4px 12px",
            background: "#2a2a3e",
            border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#888", fontSize: 10, fontWeight: 600, cursor: "pointer",
          }}
        >
          Reset Count
        </button>
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const intervalNodeType: NodeTypeDefinition<IntervalData> = {
  type: "interval",
  component: IntervalRenderer,
  propertiesPanel: IntervalPropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: IntervalData) => ({
    tick: data.tickCount,
  }),
  getClipboardText: (node) => `Interval ${(node.data as IntervalData).interval}ms`,
};
