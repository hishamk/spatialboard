import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export interface DebounceData {
  delay: number;
  lastTrigger: number;
  fireCount: number;
  pending: boolean;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "In", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "out", label: "Out", direction: "output", dataType: "signal" },
];

// ── Renderer ────────────────────────────────────────────────

const DebounceRenderer = memo(function DebounceRenderer(
  props: NodeRendererProps<DebounceData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as DebounceData;
  const triggerVal = (portValues?.trigger as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const delayRef = useRef(cd.delay);
  delayRef.current = cd.delay;
  const fireCountRef = useRef(cd.fireCount);
  fireCountRef.current = cd.fireCount;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    updateDataRef.current({ lastTrigger: triggerVal, pending: true });

    // Clear previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      updateDataRef.current({
        fireCount: fireCountRef.current + 1,
        pending: false,
      });
      timerRef.current = null;
    }, delayRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
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
      {/* Rounded rect with damper visual */}
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="debounce-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={76}
          rx={10} ry={10}
          fill="url(#debounce-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Damped wave decoration */}
        <polyline
          points="15,55 25,30 32,50 37,35 41,48 44,40 46,45 48,43 60,43"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={1.5}
          opacity={0.25}
          vectorEffect="non-scaling-stroke"
        />
        {/* Arrow to clean signal */}
        <path
          d="M64,43 L72,43 M69,39 L73,43 L69,47"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={1}
          opacity={0.25}
          vectorEffect="non-scaling-stroke"
        />
        {/* Clean single pulse */}
        <polyline
          points="76,55 82,55 82,30 88,30 88,55 105,55"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={1.5}
          opacity={0.25}
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
          Debounce
        </div>
        <div style={{
          fontSize: 14, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          marginTop: 4,
          fontVariantNumeric: "tabular-nums",
        }}>
          {cd.delay}ms
        </div>
        <div style={{
          display: "flex", gap: 6, alignItems: "center", marginTop: 4,
        }}>
          {cd.pending && (
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#f59e0b",
              boxShadow: "0 0 6px #f59e0b",
            }} />
          )}
          <span style={{ fontSize: 8, color: "#555", fontWeight: 600 }}>
            {cd.pending ? "waiting..." : cd.fireCount > 0 ? `${"\u00d7"}${cd.fireCount}` : "idle"}
          </span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function DebouncePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<DebounceData>) {
  const cd = data as DebounceData;
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
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Delay</span>
        <input
          type="number"
          min={0}
          step={50}
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
        {[50, 100, 250, 500, 1000].map((n) => (
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

export const debounceNodeType: NodeTypeDefinition<DebounceData> = {
  type: "debounce",
  docs: {},
  component: DebounceRenderer,
  propertiesPanel: DebouncePropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: DebounceData) => ({
    out: data.fireCount,
  }),
  getClipboardText: (node) => `Debounce ${(node.data as DebounceData).delay}ms`,
};
