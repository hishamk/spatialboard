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

export interface VariableData {
  label: string;
  storedValue: PortValue;
  defaultValue: PortValue;
  lastSet: number;
  lastReset: number;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "value", label: "Value", direction: "input", dataType: "any" },
  { id: "set", label: "Set", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "reset", label: "Reset", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "out", label: "Out", direction: "output", dataType: "any" },
];

// ── Helpers ─────────────────────────────────────────────────

function formatStored(val: PortValue): string {
  if (val === null || val === undefined) return "\u2014";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return Number.isInteger(val) ? String(val) : val.toFixed(2);
  if (typeof val === "string") return val.length > 16 ? '"' + val.slice(0, 13) + '\u2026"' : '"' + val + '"';
  if (typeof val === "object") return JSON.stringify(val).slice(0, 16) + "\u2026";
  return String(val);
}

// ── Renderer ────────────────────────────────────────────────

const VariableRenderer = memo(function VariableRenderer(
  props: NodeRendererProps<VariableData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as VariableData;
  const setVal = (portValues?.set as number) ?? 0;
  const resetVal = (portValues?.reset as number) ?? 0;
  const inputValue = portValues?.value ?? null;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const inputRef = useRef(inputValue);
  inputRef.current = inputValue;
  const defaultRef = useRef(cd.defaultValue);
  defaultRef.current = cd.defaultValue;

  // Handle set signal
  useEffect(() => {
    if (setVal <= 0 || setVal === cd.lastSet) return;
    updateDataRef.current({
      lastSet: setVal,
      storedValue: inputRef.current,
    });
  }, [setVal]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle reset signal
  useEffect(() => {
    if (resetVal <= 0 || resetVal === cd.lastReset) return;
    updateDataRef.current({
      lastReset: resetVal,
      storedValue: defaultRef.current,
    });
  }, [resetVal]); // eslint-disable-line react-hooks/exhaustive-deps

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
        viewBox="0 0 110 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="var-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Rounded box with tab (like a file tab / container) */}
        <path
          d="M6,2 L40,2 L46,10 L104,10 Q108,10 108,14 L108,74 Q108,78 104,78 L6,78 Q2,78 2,74 L2,6 Q2,2 6,2 Z"
          fill="url(#var-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* "x=" decoration */}
        <text
          x={80} y={68}
          fontSize={24}
          fill={cd.accentColor}
          opacity={0.06}
          fontFamily="'JetBrains Mono', monospace"
          fontWeight={700}
        >
          x=
        </text>
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "4% 8% 8%",
          boxSizing: "border-box",
        }}
      >
        {/* Tab label */}
        <div style={{
          fontSize: 7, color: cd.accentColor, fontWeight: 700,
          letterSpacing: 0.5, textTransform: "uppercase",
          marginBottom: 4,
          paddingLeft: 4,
        }}>
          {cd.label || "var"}
        </div>
        {/* Stored value */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            fontSize: 14, fontWeight: 800, color: cd.accentColor,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineHeight: 1,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {formatStored(cd.storedValue)}
          </div>
          <div style={{
            fontSize: 7, color: "#444", marginTop: 4,
          }}>
            {cd.storedValue === cd.defaultValue ? "default" : "set"}
          </div>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function VariablePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<VariableData>) {
  const cd = data as VariableData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 52, fontSize: 10, color: "#999", flexShrink: 0 };

  const onLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => updateData({ label: e.target.value }),
    [updateData],
  );

  const onDefaultChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      // Try to parse as number first
      const n = Number(v);
      if (v !== "" && !isNaN(n)) {
        updateData({ defaultValue: n });
      } else if (v === "true") {
        updateData({ defaultValue: true });
      } else if (v === "false") {
        updateData({ defaultValue: false });
      } else {
        updateData({ defaultValue: v });
      }
    },
    [updateData],
  );

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Label</span>
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
      <div style={row}>
        <span style={label}>Default</span>
        <input
          type="text"
          value={String(cd.defaultValue ?? "")}
          onChange={onDefaultChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        />
      </div>
      <div style={row}>
        <span style={label} />
        <button
          onClick={() => updateData({ storedValue: cd.defaultValue })}
          style={{
            padding: "3px 8px",
            background: "#2a2a3e",
            border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
          }}
        >
          Reset to Default
        </button>
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const variableNodeType: NodeTypeDefinition<VariableData> = {
  type: "variable",
  docs: {},
  component: VariableRenderer,
  propertiesPanel: VariablePropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: VariableData) => ({
    out: data.storedValue,
  }),
  getClipboardText: (node) => {
    const d = node.data as VariableData;
    return `${d.label}: ${formatStored(d.storedValue)}`;
  },
};
