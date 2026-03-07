import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface SparklineData {
  samples: number[];
  maxSamples: number;
  lastTrigger: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "Value", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "trigger", label: "Sample", direction: "input", dataType: "signal", defaultValue: 0 },
];

// ── Renderer ────────────────────────────────────────────────

const SparklineRenderer = memo(function SparklineRenderer(
  props: NodeRendererProps<SparklineData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as SparklineData;
  const triggerVal = (portValues?.trigger as number) ?? 0;
  const inputVal = Number(portValues?.value ?? 0);

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const samplesRef = useRef(cd.samples);
  samplesRef.current = cd.samples;
  const maxRef = useRef(cd.maxSamples);
  maxRef.current = cd.maxSamples;

  // Sample on trigger
  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    const val = Number(portValues?.value ?? 0);
    const next = [...samplesRef.current, val].slice(-maxRef.current);
    updateDataRef.current({ lastTrigger: triggerVal, samples: next });
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Build SVG path
  const samples = cd.samples;
  const count = samples.length;
  let svgPath = "";
  let fillPath = "";
  let minVal = 0;
  let maxVal = 1;
  let lastVal = inputVal;

  if (count > 0) {
    minVal = Math.min(...samples);
    maxVal = Math.max(...samples);
    lastVal = samples[count - 1];
    if (maxVal === minVal) { maxVal = minVal + 1; }

    const chartW = 176;
    const chartH = 50;
    const points: string[] = [];

    for (let i = 0; i < count; i++) {
      const x = (i / Math.max(1, count - 1)) * chartW + 12;
      const y = chartH - ((samples[i] - minVal) / (maxVal - minVal)) * (chartH - 8) + 8;
      points.push(`${x},${y}`);
    }

    svgPath = `M${points.join(" L")}`;
    // Fill area under the line
    const firstX = 12;
    const lastX = ((count - 1) / Math.max(1, count - 1)) * chartW + 12;
    fillPath = `${svgPath} L${lastX},${chartH + 8} L${firstX},${chartH + 8} Z`;
  }

  const formatted = Number.isInteger(lastVal) ? String(lastVal) : lastVal.toFixed(2);

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
        viewBox="0 0 200 90"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="spark-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
          <linearGradient id="spark-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={cd.accentColor} stopOpacity={0.2} />
            <stop offset="100%" stopColor={cd.accentColor} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {/* Background */}
        <rect
          x={2} y={2} width={196} height={86}
          rx={8} ry={8}
          fill="url(#spark-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Grid lines */}
        <line x1={12} y1={20} x2={188} y2={20} stroke="#222" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
        <line x1={12} y1={35} x2={188} y2={35} stroke="#222" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
        <line x1={12} y1={50} x2={188} y2={50} stroke="#222" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
        {/* Chart area fill */}
        {fillPath && (
          <path d={fillPath} fill="url(#spark-fill)" />
        )}
        {/* Chart line */}
        {svgPath && (
          <path
            d={svgPath}
            fill="none"
            stroke={cd.accentColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
        {/* Latest value dot */}
        {count > 0 && (() => {
          const x = ((count - 1) / Math.max(1, count - 1)) * 176 + 12;
          const y = 50 - ((lastVal - minVal) / (maxVal - minVal)) * 42 + 8;
          return (
            <circle
              cx={x} cy={y} r={3}
              fill={cd.accentColor}
              stroke="#fff"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })()}
      </svg>

      {/* Overlay labels */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "6% 8%",
          boxSizing: "border-box",
          pointerEvents: "none",
        }}
      >
        <span style={{
          fontSize: 7, color: "#555", letterSpacing: 1, textTransform: "uppercase",
        }}>
          {count} samples
        </span>
        <span style={{
          fontSize: 10, color: cd.accentColor, fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
        }}>
          {count > 0 ? formatted : "\u2014"}
        </span>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function SparklinePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<SparklineData>) {
  const cd = data as SparklineData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  const onMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 5) updateData({ maxSamples: v });
    },
    [updateData],
  );

  return (
    <>
      <div style={row}>
        <span style={label}>Max pts</span>
        <input
          type="number"
          min={5}
          max={500}
          value={cd.maxSamples}
          onChange={onMaxChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
      <button
        onClick={() => updateData({ samples: [] })}
        style={{
          padding: "4px 12px",
          background: "#2a2a3e",
          border: "1px solid #3a3a4e",
          borderRadius: 6, color: "#ef4444", fontSize: 10, fontWeight: 600, cursor: "pointer",
        }}
      >
        Clear
      </button>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const sparklineNodeType: NodeTypeDefinition<SparklineData> = {
  type: "sparkline",
  component: SparklineRenderer,
  propertiesPanel: SparklinePropertiesPanel,
  ports,
  compute: () => ({}),
  getClipboardText: (node) => `Sparkline (${(node.data as SparklineData).samples.length} pts)`,
};
