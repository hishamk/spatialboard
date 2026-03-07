import { memo } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface LEDData {
  color: string;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "In", direction: "input", dataType: "any", defaultValue: false },
];

// ── Renderer ────────────────────────────────────────────────

const LED_COLORS = [
  { key: "#ef4444", label: "Red" },
  { key: "#10b981", label: "Green" },
  { key: "#3b82f6", label: "Blue" },
  { key: "#f59e0b", label: "Amber" },
  { key: "#8b5cf6", label: "Purple" },
  { key: "#ec4899", label: "Pink" },
  { key: "#06b6d4", label: "Cyan" },
  { key: "#fff", label: "White" },
];

const LEDRenderer = memo(function LEDRenderer(
  props: NodeRendererProps<LEDData>,
) {
  const { data, portValues } = props;
  const cd = data as LEDData;
  const on = Boolean(portValues?.value);
  const ledColor = cd.color;

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
      {/* Circle shape */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id="led-glow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor={ledColor} stopOpacity={on ? 0.8 : 0.05} />
            <stop offset="60%" stopColor={ledColor} stopOpacity={on ? 0.3 : 0.02} />
            <stop offset="100%" stopColor={ledColor} stopOpacity={0} />
          </radialGradient>
          <radialGradient id="led-body" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor={on ? ledColor : "#333"} stopOpacity={on ? 1 : 0.6} />
            <stop offset="100%" stopColor={on ? ledColor : "#222"} stopOpacity={on ? 0.7 : 0.4} />
          </radialGradient>
        </defs>
        {/* Outer glow when on */}
        {on && (
          <circle
            cx={50} cy={50} r={48}
            fill="url(#led-glow)"
          />
        )}
        {/* LED housing */}
        <circle
          cx={50} cy={50} r={36}
          fill="#1a1a2e"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* LED dome */}
        <circle
          cx={50} cy={50} r={28}
          fill="url(#led-body)"
          stroke={on ? ledColor : "#444"}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
          style={{
            filter: on ? `drop-shadow(0 0 8px ${ledColor})` : "none",
          }}
        />
        {/* Highlight */}
        <ellipse
          cx={42} cy={42} rx={8} ry={6}
          fill="#fff"
          opacity={on ? 0.35 : 0.05}
          transform="rotate(-30 42 42)"
        />
      </svg>

      {/* Label */}
      <div
        style={{
          position: "absolute",
          bottom: "4%",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 7,
          color: on ? ledColor : "#555",
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: "uppercase",
          textShadow: on ? `0 0 6px ${ledColor}44` : "none",
        }}
      >
        {on ? "ON" : "OFF"}
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function LEDPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<LEDData>) {
  const cd = data as LEDData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <div style={row}>
      <span style={label}>Color</span>
      {LED_COLORS.map((c) => (
        <button
          key={c.key}
          onClick={() => updateData({ color: c.key })}
          title={c.label}
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: c.key,
            border: cd.color === c.key ? "2px solid #fff" : "2px solid #3a3a4e",
            cursor: "pointer",
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}

// ── Node type definition ────────────────────────────────────

export const ledNodeType: NodeTypeDefinition<LEDData> = {
  type: "led",
  component: LEDRenderer,
  propertiesPanel: LEDPropertiesPanel,
  ports,
  compute: () => ({}),
  getClipboardText: () => "LED",
};
