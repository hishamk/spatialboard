import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface ThrottleData {
  interval: number;
  lastTrigger: number;
  fireCount: number;
  blocked: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "In", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "out", label: "Out", direction: "output", dataType: "signal" },
];

// ── Renderer ────────────────────────────────────────────────

const ThrottleRenderer = memo(function ThrottleRenderer(
  props: NodeRendererProps<ThrottleData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as ThrottleData;
  const triggerVal = (portValues?.trigger as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const intervalRef = useRef(cd.interval);
  intervalRef.current = cd.interval;
  const fireCountRef = useRef(cd.fireCount);
  fireCountRef.current = cd.fireCount;
  const blockedRef = useRef(cd.blocked);
  blockedRef.current = cd.blocked;
  const lastFireTimeRef = useRef(0);

  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    const now = Date.now();
    const elapsed = now - lastFireTimeRef.current;

    if (elapsed >= intervalRef.current) {
      // Allow through
      lastFireTimeRef.current = now;
      updateDataRef.current({
        lastTrigger: triggerVal,
        fireCount: fireCountRef.current + 1,
      });
    } else {
      // Block
      updateDataRef.current({
        lastTrigger: triggerVal,
        blocked: blockedRef.current + 1,
      });
    }
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <linearGradient id="throttle-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={76}
          rx={10} ry={10}
          fill="url(#throttle-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Rate-limit bars decoration */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={16 + i * 20} y={55}
            width={10} height={12}
            rx={2} ry={2}
            fill={cd.accentColor}
            opacity={i < 3 ? 0.15 : 0.05}
          />
        ))}
        {/* Horizontal limit line */}
        <line
          x1={12} y1={55} x2={108} y2={55}
          stroke={cd.accentColor}
          strokeWidth={1}
          opacity={0.15}
          strokeDasharray="3 3"
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
          padding: "8% 10% 22%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Throttle
        </div>
        <div style={{
          fontSize: 14, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          marginTop: 4,
          fontVariantNumeric: "tabular-nums",
        }}>
          {cd.interval}ms
        </div>
        <div style={{
          display: "flex", gap: 8, alignItems: "center", marginTop: 4,
          fontSize: 8,
        }}>
          <span style={{ color: "#10b981", fontWeight: 600 }}>
            {"\u2713"}{cd.fireCount}
          </span>
          <span style={{ color: "#ef4444", fontWeight: 600 }}>
            {"\u2717"}{cd.blocked}
          </span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ThrottlePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<ThrottleData>) {
  const cd = data as ThrottleData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 52, fontSize: 10, color: "#999", flexShrink: 0 };

  const onIntervalChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 0) updateData({ interval: v });
    },
    [updateData],
  );

  return (
    <>
      <div style={row}>
        <span style={label}>Interval</span>
        <input
          type="number"
          min={0}
          step={50}
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
        {[50, 100, 250, 500, 1000].map((n) => (
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
        <span style={label}>Stats</span>
        <button
          onClick={() => updateData({ fireCount: 0, blocked: 0 })}
          style={{
            padding: "3px 8px",
            background: "#2a2a3e",
            border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
          }}
        >
          Reset Counters
        </button>
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const throttleNodeType: NodeTypeDefinition<ThrottleData> = {
  type: "throttle",
  component: ThrottleRenderer,
  propertiesPanel: ThrottlePropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: ThrottleData) => ({
    out: data.fireCount,
  }),
  getClipboardText: (node) => `Throttle ${(node.data as ThrottleData).interval}ms`,
};
