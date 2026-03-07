import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface DelayData {
  delay: number;
  lastTrigger: number;
  fireCount: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "In", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "out", label: "Out", direction: "output", dataType: "signal" },
];

// ── Renderer ────────────────────────────────────────────────

const DelayRenderer = memo(function DelayRenderer(
  props: NodeRendererProps<DelayData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as DelayData;
  const triggerVal = (portValues?.trigger as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const delayRef = useRef(cd.delay);
  delayRef.current = cd.delay;
  const fireCountRef = useRef(cd.fireCount);
  fireCountRef.current = cd.fireCount;

  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    updateDataRef.current({ lastTrigger: triggerVal });

    const timer = setTimeout(() => {
      updateDataRef.current({ fireCount: fireCountRef.current + 1 });
    }, delayRef.current);

    return () => clearTimeout(timer);
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
      {/* Rounded rect */}
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="delay-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={76}
          rx={10} ry={10}
          fill="url(#delay-bg)"
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
          padding: "10%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Delay
        </div>
        {/* Hourglass icon */}
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" style={{ margin: "3px 0" }}>
          <path
            d="M6 2h12v6l-4 4 4 4v6H6v-6l4-4-4-4z"
            stroke={cd.accentColor}
            strokeWidth={2}
            strokeLinejoin="round"
            fill={cd.accentColor}
            fillOpacity={0.15}
          />
          <path d="M10 12h4" stroke={cd.accentColor} strokeWidth={1.5} strokeLinecap="round" opacity={0.5} />
        </svg>
        <div style={{
          fontSize: 12, fontWeight: 700, color: cd.accentColor, lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}>
          {cd.delay}ms
        </div>
        {cd.fireCount > 0 && (
          <div style={{ fontSize: 8, color: "#555", marginTop: 2 }}>
            {"\u00d7"}{cd.fireCount}
          </div>
        )}
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function DelayPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<DelayData>) {
  const cd = data as DelayData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  const onDelayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 0) updateData({ delay: v });
    },
    [updateData],
  );

  return (
    <>
      <div style={row}>
        <span style={label}>Delay</span>
        <input
          type="number"
          min={0}
          step={100}
          value={cd.delay}
          onChange={onDelayChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
        <span style={{ fontSize: 10, color: "#666" }}>ms</span>
      </div>
      <div style={{ ...row, flexWrap: "wrap" }}>
        <span style={label}>Presets</span>
        {[100, 250, 500, 1000, 2000].map((n) => (
          <button
            key={n}
            onClick={() => updateData({ delay: n })}
            style={{
              padding: "3px 6px",
              background: cd.delay === n ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
            }}
          >
            {n >= 1000 ? `${n / 1000}s` : `${n}`}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const delayNodeType: NodeTypeDefinition<DelayData> = {
  type: "delay",
  component: DelayRenderer,
  propertiesPanel: DelayPropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: DelayData) => ({
    out: data.fireCount,
  }),
  getClipboardText: (node) => `Delay ${(node.data as DelayData).delay}ms`,
};
