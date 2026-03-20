import { memo, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export interface ProgressBarData {
  label: string;
  color: string;
  showPercent: boolean;
  accentColor: string;
  /**
   * When set, input `value` is mapped as 0..scaleMax → full bar (e.g. 20 for a d20).
   * When unset: 0–1 = fraction; values above 1 = 0–100 scale (9 → 9%).
   */
  scaleMax?: number;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "Value", direction: "input", dataType: "number", defaultValue: 0 },
];

/** Map wired number input to 0–1 fill. */
function portValueToRatio(raw: number, scaleMax?: number): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return 0;
  if (scaleMax != null && scaleMax > 0) {
    return Math.max(0, Math.min(1, n / scaleMax));
  }
  if (n > 1) {
    return Math.max(0, Math.min(1, n / 100));
  }
  return Math.max(0, Math.min(1, n));
}

// ── Renderer ────────────────────────────────────────────────

const ProgressBarRenderer = memo(function ProgressBarRenderer(
  props: NodeRendererProps<ProgressBarData>,
) {
  const { data, portValues } = props;
  const cd = data as ProgressBarData;
  const rawVal = Number(portValues?.value ?? 0);
  const pct = portValueToRatio(rawVal, cd.scaleMax);
  const pctInt = Math.round(pct * 100);

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
      {/* Outer frame */}
      <svg
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="pbar-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
          <linearGradient id="pbar-fill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={cd.color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={cd.color} stopOpacity={0.6} />
          </linearGradient>
        </defs>
        {/* Background */}
        <rect
          x={2} y={2} width={196} height={56}
          rx={8} ry={8}
          fill="url(#pbar-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Bar track */}
        <rect
          x={10} y={28} width={180} height={18}
          rx={9} ry={9}
          fill="#1a1a2e"
          stroke="#2a2a40"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        {/* Bar fill */}
        {pct > 0 && (
          <rect
            x={10} y={28}
            width={Math.max(18, 180 * pct)}
            height={18}
            rx={9} ry={9}
            fill="url(#pbar-fill)"
          />
        )}
        {/* Fill glow */}
        {pct > 0 && (
          <rect
            x={10} y={28}
            width={Math.max(18, 180 * pct)}
            height={18}
            rx={9} ry={9}
            fill="none"
            stroke={cd.color}
            strokeWidth={1}
            opacity={0.4}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Content overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "6% 8%",
          boxSizing: "border-box",
        }}
      >
        {/* Label row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          height: "40%",
        }}>
          <span style={{
            fontSize: 8, color: "#888", fontWeight: 600,
            letterSpacing: 0.5, textTransform: "uppercase",
          }}>
            {cd.label}
          </span>
          {cd.showPercent && (
            <span style={{
              fontSize: 10, color: cd.color, fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}>
              {pctInt}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ProgressBarPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<ProgressBarData>) {
  const cd = data as ProgressBarData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const labelStyle: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  const onLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateData({ label: e.target.value });
    },
    [updateData],
  );

  const COLORS = [
    { key: "#3b82f6", label: "Blue" },
    { key: "#10b981", label: "Green" },
    { key: "#f59e0b", label: "Amber" },
    { key: "#ef4444", label: "Red" },
    { key: "#8b5cf6", label: "Purple" },
    { key: "#ec4899", label: "Pink" },
    { key: "#06b6d4", label: "Cyan" },
  ];

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={labelStyle}>Label</span>
        <input
          type="text"
          value={cd.label}
          onChange={onLabelChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
      <div style={{ ...row, flexWrap: "wrap" }}>
        <span style={labelStyle}>Color</span>
        {COLORS.map((c) => (
          <button
            key={c.key}
            onClick={() => updateData({ color: c.key })}
            title={c.label}
            style={{
              width: 20, height: 20, borderRadius: "50%",
              background: c.key,
              border: cd.color === c.key ? "2px solid #fff" : "2px solid #3a3a4e",
              cursor: "pointer", padding: 0,
            }}
          />
        ))}
      </div>
      <div style={row}>
        <span style={labelStyle}>Show %</span>
        <button
          onClick={() => updateData({ showPercent: !cd.showPercent })}
          style={{
            padding: "3px 10px",
            background: cd.showPercent ? cd.accentColor : "#2a2a3e",
            border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", fontSize: 10, fontWeight: 600, cursor: "pointer",
          }}
        >
          {cd.showPercent ? "On" : "Off"}
        </button>
      </div>
      <div style={row}>
        <span style={labelStyle} title="Empty: 0–1 = fraction, &gt;1 = 0–100. Set to match source range (e.g. 20 for a die).">
          Max
        </span>
        <input
          type="number"
          min={1}
          step={1}
          placeholder="auto"
          value={cd.scaleMax ?? ""}
          onChange={(e) => {
            const v = e.target.value.trim();
            if (v === "") {
              updateData({ scaleMax: undefined });
              return;
            }
            const num = Number(v);
            updateData({
              scaleMax: Number.isFinite(num) && num > 0 ? num : undefined,
            });
          }}
          style={{
            flex: 1,
            maxWidth: 72,
            background: "#2a2a3e",
            border: "1px solid #3a3a4e",
            borderRadius: 6,
            color: "#fff",
            padding: "4px 8px",
            fontSize: 12,
          }}
        />
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const progressBarNodeType: NodeTypeDefinition<ProgressBarData> = {
  type: "progress-bar",
  component: ProgressBarRenderer,
  propertiesPanel: ProgressBarPropertiesPanel,
  docs: {},
  ports,
  compute: () => ({}),
  getClipboardText: (node) => `Progress: ${(node.data as ProgressBarData).label}`,
};
