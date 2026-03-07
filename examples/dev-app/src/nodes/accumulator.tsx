import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface AccumulatorData {
  total: number;
  count: number;
  lastTrigger: number;
  lastReset: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "Value", direction: "input", dataType: "number", defaultValue: 1 },
  { id: "trigger", label: "Add", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "reset", label: "Reset", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "total", label: "Total", direction: "output", dataType: "number" },
  { id: "count", label: "Count", direction: "output", dataType: "number" },
];

// ── Renderer ────────────────────────────────────────────────

const AccumulatorRenderer = memo(function AccumulatorRenderer(
  props: NodeRendererProps<AccumulatorData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as AccumulatorData;
  const triggerVal = (portValues?.trigger as number) ?? 0;
  const resetVal = (portValues?.reset as number) ?? 0;
  const inputVal = (portValues?.value as number) ?? 1;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const totalRef = useRef(cd.total);
  totalRef.current = cd.total;
  const countRef = useRef(cd.count);
  countRef.current = cd.count;

  // Handle add trigger
  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    const v = typeof inputVal === "number" ? inputVal : Number(inputVal) || 0;
    updateDataRef.current({
      lastTrigger: triggerVal,
      total: totalRef.current + v,
      count: countRef.current + 1,
    });
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle reset trigger
  useEffect(() => {
    if (resetVal <= 0 || resetVal === cd.lastReset) return;
    updateDataRef.current({
      lastReset: resetVal,
      total: 0,
      count: 0,
    });
  }, [resetVal]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatted = Number.isInteger(cd.total) ? String(cd.total) : cd.total.toFixed(2);

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
      {/* Cylinder shape */}
      <svg
        viewBox="0 0 100 120"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="acc-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Cylinder body */}
        <rect x={4} y={16} width={92} height={88} fill="url(#acc-bg)" stroke={cd.accentColor} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        {/* Top ellipse */}
        <ellipse cx={50} cy={16} rx={46} ry={14} fill="url(#acc-bg)" stroke={cd.accentColor} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        {/* Bottom ellipse */}
        <ellipse cx={50} cy={104} rx={46} ry={14} fill="url(#acc-bg)" stroke={cd.accentColor} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        {/* Fill level */}
        {cd.count > 0 && (
          <rect
            x={6} y={104 - Math.min(86, cd.count * 8)}
            width={88}
            height={Math.min(86, cd.count * 8)}
            fill={cd.accentColor}
            opacity={0.12}
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
          padding: "18% 12%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Accumulator
        </div>
        <div style={{
          fontSize: 22, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          marginTop: 4,
          textShadow: `0 0 10px ${cd.accentColor}33`,
          fontVariantNumeric: "tabular-nums",
        }}>
          {formatted}
        </div>
        <div style={{ fontSize: 8, color: "#555", marginTop: 4 }}>
          {cd.count} additions
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function AccumulatorPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<AccumulatorData>) {
  const cd = data as AccumulatorData;

  const handleReset = useCallback(() => {
    updateData({ total: 0, count: 0 });
  }, [updateData]);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ width: 48, fontSize: 10, color: "#999", flexShrink: 0 }}>Total</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: cd.accentColor }}>
          {Number.isInteger(cd.total) ? cd.total : cd.total.toFixed(2)}
        </span>
        <span style={{ fontSize: 10, color: "#666", marginLeft: "auto" }}>
          ({cd.count} adds)
        </span>
      </div>
      <button
        onClick={handleReset}
        style={{
          padding: "4px 12px",
          background: "#2a2a3e",
          border: "1px solid #3a3a4e",
          borderRadius: 6, color: "#ef4444", fontSize: 10, fontWeight: 600, cursor: "pointer",
        }}
      >
        Reset to 0
      </button>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const accumulatorNodeType: NodeTypeDefinition<AccumulatorData> = {
  type: "accumulator",
  component: AccumulatorRenderer,
  propertiesPanel: AccumulatorPropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: AccumulatorData) => ({
    total: data.total,
    count: data.count,
  }),
  getClipboardText: (node) => `Accumulator: ${(node.data as AccumulatorData).total}`,
};
