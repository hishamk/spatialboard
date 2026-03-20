import { memo, useRef, useEffect } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export interface LoggerData {
  entries: string[];
  maxEntries: number;
  lastTrigger: number;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "Value", direction: "input", dataType: "any" },
  { id: "trigger", label: "Log", direction: "input", dataType: "signal", defaultValue: 0 },
];

// ── Renderer ────────────────────────────────────────────────

const LoggerRenderer = memo(function LoggerRenderer(
  props: NodeRendererProps<LoggerData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as LoggerData;
  const triggerVal = (portValues?.trigger as number) ?? 0;
  const inputVal = portValues?.value;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const entriesRef = useRef(cd.entries);
  entriesRef.current = cd.entries;
  const maxRef = useRef(cd.maxEntries);
  maxRef.current = cd.maxEntries;

  const scrollRef = useRef<HTMLDivElement>(null);

  // Log on trigger
  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    const val = inputVal !== null && inputVal !== undefined ? String(inputVal) : "\u2014";
    const ts = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const entry = `[${ts}] ${val}`;
    const next = [...entriesRef.current, entry].slice(-maxRef.current);
    updateDataRef.current({ lastTrigger: triggerVal, entries: next });
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [cd.entries.length]);

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
      {/* Terminal / console shape */}
      <svg
        viewBox="0 0 120 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="log-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0a18" />
            <stop offset="100%" stopColor="#0e0e1e" />
          </linearGradient>
        </defs>
        {/* Console rect */}
        <rect
          x={2} y={2} width={116} height={96}
          rx={6} ry={6}
          fill="url(#log-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Title bar */}
        <rect
          x={2} y={2} width={116} height={18}
          rx={6} ry={6}
          fill={cd.accentColor}
          fillOpacity={0.12}
        />
        {/* Cover bottom corners of title bar */}
        <rect x={2} y={14} width={116} height={6} fill={cd.accentColor} fillOpacity={0.12} />
        <rect x={2} y={20} width={116} height={1} fill={cd.accentColor} fillOpacity={0.2} />
        {/* Dots */}
        <circle cx={12} cy={11} r={2.5} fill="#ef4444" opacity={0.6} />
        <circle cx={20} cy={11} r={2.5} fill="#f59e0b" opacity={0.6} />
        <circle cx={28} cy={11} r={2.5} fill="#10b981" opacity={0.6} />
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "4px 8px",
          height: "18%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          boxSizing: "border-box",
        }}>
          <span style={{
            fontSize: 8, color: "#666", letterSpacing: 1, textTransform: "uppercase", fontWeight: 600,
          }}>
            Log ({cd.entries.length})
          </span>
        </div>

        {/* Log entries */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "4px 8px 6px",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 9,
            lineHeight: 1.5,
            color: "#7dd3fc",
            pointerEvents: "auto",
          }}
        >
          {cd.entries.length === 0 ? (
            <div style={{ color: "#333", fontStyle: "italic" }}>
              waiting for input...
            </div>
          ) : (
            cd.entries.map((entry, i) => (
              <div key={i} style={{
                color: i === cd.entries.length - 1 ? cd.accentColor : "#556",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {entry}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function LoggerPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<LoggerData>) {
  const cd = data as LoggerData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Max</span>
        <input
          type="number"
          min={5}
          max={200}
          value={cd.maxEntries}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10);
            if (!isNaN(v) && v >= 1) updateData({ maxEntries: v });
          }}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
        <span style={{ fontSize: 10, color: "#666" }}>entries</span>
      </div>
      <button
        onClick={() => updateData({ entries: [] })}
        style={{
          padding: "4px 12px",
          background: "#2a2a3e",
          border: "1px solid #3a3a4e",
          borderRadius: 6, color: "#ef4444", fontSize: 10, fontWeight: 600, cursor: "pointer",
        }}
      >
        Clear Log
      </button>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const loggerNodeType: NodeTypeDefinition<LoggerData> = {
  type: "logger",
  docs: {},
  component: LoggerRenderer,
  propertiesPanel: LoggerPropertiesPanel,
  ports,
  compute: () => ({}),
  getClipboardText: () => "Logger",
};
