import { memo } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface LogicGateData {
  mode: "and" | "or" | "not" | "xor" | "nand" | "nor";
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "any", defaultValue: false },
  { id: "b", label: "B", direction: "input", dataType: "any", defaultValue: false },
  { id: "result", label: "Out", direction: "output", dataType: "boolean" },
];

// ── Helpers ─────────────────────────────────────────────────

const MODE_LABELS: { key: LogicGateData["mode"]; label: string; symbol: string }[] = [
  { key: "and", label: "AND", symbol: "&" },
  { key: "or", label: "OR", symbol: "|" },
  { key: "not", label: "NOT", symbol: "\u00AC" },
  { key: "xor", label: "XOR", symbol: "\u2295" },
  { key: "nand", label: "NAND", symbol: "\u22BC" },
  { key: "nor", label: "NOR", symbol: "\u22BD" },
];

function evaluate(a: boolean, b: boolean, mode: LogicGateData["mode"]): boolean {
  switch (mode) {
    case "and": return a && b;
    case "or": return a || b;
    case "not": return !a;
    case "xor": return a !== b;
    case "nand": return !(a && b);
    case "nor": return !(a || b);
  }
}

// ── Renderer ────────────────────────────────────────────────

const LogicGateRenderer = memo(function LogicGateRenderer(
  props: NodeRendererProps<LogicGateData>,
) {
  const { data, portValues } = props;
  const cd = data as LogicGateData;
  const a = Boolean(portValues?.a);
  const b = Boolean(portValues?.b);
  const result = evaluate(a, b, cd.mode);
  const info = MODE_LABELS.find((m) => m.key === cd.mode)!;

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
      {/* Shield / D-shape (traditional logic gate) */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="logic-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Shield shape */}
        <path
          d="M4,4 L96,4 L96,50 Q96,96 50,98 Q4,96 4,50 Z"
          fill="url(#logic-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Inner shield */}
        <path
          d="M10,10 L90,10 L90,48 Q90,88 50,90 Q10,88 10,48 Z"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={0.5}
          opacity={0.1}
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
          padding: "12% 15%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Logic
        </div>
        <div style={{
          fontSize: 20, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          letterSpacing: 2,
          margin: "4px 0 2px",
        }}>
          {info.label}
        </div>
        {/* Input/output status */}
        <div style={{
          display: "flex", gap: 6, alignItems: "center", marginTop: 4,
          fontSize: 9, fontWeight: 600,
        }}>
          <span style={{ color: a ? "#10b981" : "#555" }}>A</span>
          {cd.mode !== "not" && (
            <span style={{ color: b ? "#10b981" : "#555" }}>B</span>
          )}
          <span style={{ color: "#444" }}>{"\u2192"}</span>
          <span style={{
            color: result ? "#10b981" : "#ef4444",
            fontWeight: 700,
            fontSize: 10,
          }}>
            {result ? "1" : "0"}
          </span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function LogicGatePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<LogicGateData>) {
  const cd = data as LogicGateData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <div style={row}>
      <span style={label}>Mode</span>
      {MODE_LABELS.map((m) => (
        <button
          key={m.key}
          onClick={() => updateData({ mode: m.key })}
          style={{
            padding: "3px 8px",
            background: cd.mode === m.key ? cd.accentColor : "#2a2a3e",
            border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

// ── Node type definition ────────────────────────────────────

export const logicGateNodeType: NodeTypeDefinition<LogicGateData> = {
  type: "logic-gate",
  component: LogicGateRenderer,
  propertiesPanel: LogicGatePropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: LogicGateData) => {
    const a = Boolean(inputs.a);
    const b = Boolean(inputs.b);
    return { result: evaluate(a, b, data.mode) };
  },
  getClipboardText: (node) => `Logic ${(node.data as LogicGateData).mode.toUpperCase()}`,
};
