import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface DateTimeData {
  currentTime: number;
  lastTrigger: number;
  autoRefresh: boolean;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "Refresh", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "timestamp", label: "Unix", direction: "output", dataType: "number" },
  { id: "date", label: "Date", direction: "output", dataType: "string" },
  { id: "time", label: "Time", direction: "output", dataType: "string" },
  { id: "hour", label: "Hour", direction: "output", dataType: "number" },
  { id: "minute", label: "Min", direction: "output", dataType: "number" },
  { id: "second", label: "Sec", direction: "output", dataType: "number" },
];

// ── Renderer ────────────────────────────────────────────────

const DateTimeRenderer = memo(function DateTimeRenderer(
  props: NodeRendererProps<DateTimeData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as DateTimeData;
  const triggerVal = (portValues?.trigger as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;

  // Trigger refresh
  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    updateDataRef.current({ lastTrigger: triggerVal, currentTime: Date.now() });
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-refresh every second
  useEffect(() => {
    if (!cd.autoRefresh) return;
    const timer = setInterval(() => {
      updateDataRef.current({ currentTime: Date.now() });
    }, 1000);
    return () => clearInterval(timer);
  }, [cd.autoRefresh]);

  // Initialize
  useEffect(() => {
    if (cd.currentTime === 0) {
      updateDataRef.current({ currentTime: Date.now() });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const d = new Date(cd.currentTime || Date.now());
  const timeStr = d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

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
      {/* Rounded rect with clock decoration */}
      <svg
        viewBox="0 0 140 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="dt-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={136} height={96}
          rx={10} ry={10}
          fill="url(#dt-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Small clock icon */}
        <circle cx={22} cy={22} r={10} fill="none" stroke={cd.accentColor} strokeWidth={1} opacity={0.15} vectorEffect="non-scaling-stroke" />
        <line x1={22} y1={22} x2={22} y2={16} stroke={cd.accentColor} strokeWidth={1} opacity={0.15} vectorEffect="non-scaling-stroke" />
        <line x1={22} y1={22} x2={26} y2={24} stroke={cd.accentColor} strokeWidth={1} opacity={0.15} vectorEffect="non-scaling-stroke" />
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
          padding: "10% 10%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Date / Time
        </div>
        <div style={{
          fontSize: 16, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          marginTop: 4,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontVariantNumeric: "tabular-nums",
        }}>
          {timeStr}
        </div>
        <div style={{
          fontSize: 9, color: "#666", marginTop: 3,
        }}>
          {dateStr}
        </div>
        {cd.autoRefresh && (
          <div style={{
            display: "flex", alignItems: "center", gap: 3, marginTop: 3,
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#10b981", boxShadow: "0 0 4px #10b981",
            }} />
            <span style={{ fontSize: 7, color: "#555" }}>live</span>
          </div>
        )}
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function DateTimePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<DateTimeData>) {
  const cd = data as DateTimeData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  const handleRefresh = useCallback(() => {
    updateData({ currentTime: Date.now() });
  }, [updateData]);

  return (
    <>
      <div style={row}>
        <span style={label}>Auto</span>
        <button
          onClick={() => updateData({ autoRefresh: !cd.autoRefresh })}
          style={{
            padding: "3px 10px",
            background: cd.autoRefresh ? cd.accentColor : "#2a2a3e",
            border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer",
          }}
        >
          {cd.autoRefresh ? "Live" : "Manual"}
        </button>
      </div>
      <button
        onClick={handleRefresh}
        style={{
          padding: "4px 12px",
          background: "#2a2a3e",
          border: "1px solid #3a3a4e",
          borderRadius: 6, color: "#888", fontSize: 10, fontWeight: 600, cursor: "pointer",
        }}
      >
        Refresh Now
      </button>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const dateTimeNodeType: NodeTypeDefinition<DateTimeData> = {
  type: "date-time",
  component: DateTimeRenderer,
  propertiesPanel: DateTimePropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: DateTimeData) => {
    const d = new Date(data.currentTime || Date.now());
    return {
      timestamp: data.currentTime,
      date: d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      time: d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: d.getSeconds(),
    };
  },
  getClipboardText: () => "Date/Time",
};
