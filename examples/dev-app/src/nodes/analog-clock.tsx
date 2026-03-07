import { memo, useState, useEffect } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  SpatialNode,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface AnalogClockData {
  /** UTC offset in hours (e.g., -5 for EST, 0 for UTC, 5.5 for IST) */
  utcOffset: number;
  /** Label shown below the clock face */
  label: string;
  /** Accent color for the second hand and center dot */
  accentColor?: string;
}

// ── Clock face SVG ─────────────────────────────────────────

function ClockFace({
  hours,
  minutes,
  seconds,
  accent,
}: {
  hours: number;
  minutes: number;
  seconds: number;
  accent: string;
}) {
  const cx = 50;
  const cy = 50;

  // Angles (degrees, clockwise from 12 o'clock)
  const secAngle = seconds * 6;
  const minAngle = minutes * 6 + seconds * 0.1;
  const hrAngle = (hours % 12) * 30 + minutes * 0.5;

  return (
    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
      {/* Face background */}
      <circle cx={cx} cy={cy} r={46} fill="#1a1a2e" stroke="#2e2e3e" strokeWidth={2} />

      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const isQuarter = i % 3 === 0;
        const outerR = 42;
        const innerR = isQuarter ? 35 : 38;
        return (
          <line
            key={i}
            x1={cx + Math.sin(angle) * innerR}
            y1={cy - Math.cos(angle) * innerR}
            x2={cx + Math.sin(angle) * outerR}
            y2={cy - Math.cos(angle) * outerR}
            stroke={isQuarter ? "#a0a0b0" : "#555566"}
            strokeWidth={isQuarter ? 2 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* Minute tick marks */}
      {Array.from({ length: 60 }, (_, i) => {
        if (i % 5 === 0) return null;
        const angle = (i * 6 * Math.PI) / 180;
        return (
          <line
            key={`m${i}`}
            x1={cx + Math.sin(angle) * 40}
            y1={cy - Math.cos(angle) * 40}
            x2={cx + Math.sin(angle) * 42}
            y2={cy - Math.cos(angle) * 42}
            stroke="#333344"
            strokeWidth={0.5}
            strokeLinecap="round"
          />
        );
      })}

      {/* Hour hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.sin((hrAngle * Math.PI) / 180) * 24}
        y2={cy - Math.cos((hrAngle * Math.PI) / 180) * 24}
        stroke="#d0d0e0"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.sin((minAngle * Math.PI) / 180) * 34}
        y2={cy - Math.cos((minAngle * Math.PI) / 180) * 34}
        stroke="#d0d0e0"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Second hand */}
      <line
        x1={cx + Math.sin(((secAngle + 180) * Math.PI) / 180) * 8}
        y1={cy - Math.cos(((secAngle + 180) * Math.PI) / 180) * 8}
        x2={cx + Math.sin((secAngle * Math.PI) / 180) * 38}
        y2={cy - Math.cos((secAngle * Math.PI) / 180) * 38}
        stroke={accent}
        strokeWidth={1}
        strokeLinecap="round"
      />

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={2.5} fill={accent} />
    </svg>
  );
}

// ── Renderer ────────────────────────────────────────────────

const AnalogClockRenderer = memo(function AnalogClockRenderer(
  props: NodeRendererProps<AnalogClockData>,
) {
  const { node, data, isSelected } = props;
  const cd = data as AnalogClockData;
  const accent = cd.accentColor || "#ef4444";

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Compute time with offset
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const offsetDate = new Date(utcMs + cd.utcOffset * 3600000);
  const hours = offsetDate.getHours();
  const minutes = offsetDate.getMinutes();
  const seconds = offsetDate.getSeconds();

  // Use min(w, h) for square aspect ratio, let wrapper handle actual dimensions
  const size = Math.min(node.w, typeof node.h === "number" ? node.h : node.w);
  const labelHeight = 28;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#12121e",
        borderRadius: 12,
        border: `2px solid ${isSelected ? accent : "#2a2a3e"}`,
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#e0e0e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: isSelected
          ? `0 0 0 1px ${accent}40, 0 4px 12px rgba(0,0,0,0.3)`
          : "0 2px 8px rgba(0,0,0,0.2)",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      {/* Clock face */}
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          minHeight: 0,
        }}
      >
        <div style={{ width: size - 24, height: size - labelHeight - 24, maxWidth: "100%", maxHeight: "100%" }}>
          <ClockFace hours={hours} minutes={minutes} seconds={seconds} accent={accent} />
        </div>
      </div>

      {/* Label + digital time */}
      <div
        style={{
          height: labelHeight,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "0 8px",
          borderTop: "1px solid #2a2a3e",
          background: "#15152a",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: accent,
            letterSpacing: 0.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {cd.label}
        </span>
        <span
          style={{
            fontSize: 10,
            color: "#666",
            fontVariantNumeric: "tabular-nums",
            flexShrink: 0,
          }}
        >
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

const TIMEZONES = [
  { label: "New York", offset: -5 },
  { label: "Chicago", offset: -6 },
  { label: "Denver", offset: -7 },
  { label: "Los Angeles", offset: -8 },
  { label: "London", offset: 0 },
  { label: "Paris", offset: 1 },
  { label: "Dubai", offset: 4 },
  { label: "Mumbai", offset: 5.5 },
  { label: "Tokyo", offset: 9 },
  { label: "Sydney", offset: 11 },
];

const ACCENT_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899",
];

const panelRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const panelLabel: React.CSSProperties = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0,
};

function ClockPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<AnalogClockData>) {
  const cd = data as AnalogClockData;

  return (
    <>
      {/* Timezone */}
      <div style={panelRow}>
        <span style={panelLabel}>Timezone</span>
        <select
          value={cd.utcOffset}
          onChange={(e) => {
            const tz = TIMEZONES.find((t) => t.offset === Number(e.target.value));
            if (tz) updateData({ utcOffset: tz.offset, label: tz.label });
          }}
          style={{
            flex: 1,
            background: "#2a2a3e",
            color: "#e0e0e0",
            border: "1px solid #3a3a4e",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 11,
            outline: "none",
          }}
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.label} value={tz.offset}>
              {tz.label} (UTC{tz.offset >= 0 ? "+" : ""}{tz.offset})
            </option>
          ))}
        </select>
      </div>

      {/* Label */}
      <div style={panelRow}>
        <span style={panelLabel}>Label</span>
        <input
          type="text"
          value={cd.label}
          onChange={(e) => updateData({ label: e.target.value })}
          style={{
            flex: 1,
            background: "#2a2a3e",
            color: "#e0e0e0",
            border: "1px solid #3a3a4e",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 11,
            outline: "none",
          }}
        />
      </div>

      {/* Accent color */}
      <div style={panelRow}>
        <span style={panelLabel}>Color</span>
        {ACCENT_COLORS.map((c) => (
          <button
            key={c}
            onClick={() => updateData({ accentColor: c })}
            style={{
              width: 20,
              height: 20,
              background: c,
              border: cd.accentColor === c
                ? "2px solid white"
                : "2px solid transparent",
              borderRadius: "50%",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const analogClockNodeType: NodeTypeDefinition<AnalogClockData> = {
  type: "analog-clock",
  component: AnalogClockRenderer,
  propertiesPanel: ClockPropertiesPanel,

  getClipboardText: (node: SpatialNode) => {
    const d = node.data as AnalogClockData;
    return `${d.label} (UTC${d.utcOffset >= 0 ? "+" : ""}${d.utcOffset})`;
  },
};
