import { memo } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface ConditionData {
  op: "==" | "!=" | ">" | "<" | ">=" | "<=";
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "any", defaultValue: 0 },
  { id: "b", label: "B", direction: "input", dataType: "any", defaultValue: 0 },
  { id: "then", label: "Then", direction: "output", dataType: "any" },
  { id: "else", label: "Else", direction: "output", dataType: "any" },
];

// ── Helpers ─────────────────────────────────────────────────

const OP_LABELS: { key: ConditionData["op"]; label: string }[] = [
  { key: "==", label: "=" },
  { key: "!=", label: "\u2260" },
  { key: ">", label: ">" },
  { key: "<", label: "<" },
  { key: ">=", label: "\u2265" },
  { key: "<=", label: "\u2264" },
];

function evaluate(a: PortValue, b: PortValue, op: ConditionData["op"]): boolean {
  const na = typeof a === "number" ? a : Number(a);
  const nb = typeof b === "number" ? b : Number(b);
  switch (op) {
    case "==": return a === b || na === nb;
    case "!=": return a !== b && na !== nb;
    case ">":  return na > nb;
    case "<":  return na < nb;
    case ">=": return na >= nb;
    case "<=": return na <= nb;
  }
}

// ── Renderer ────────────────────────────────────────────────

const ConditionRenderer = memo(function ConditionRenderer(
  props: NodeRendererProps<ConditionData>,
) {
  const { data, portValues } = props;
  const cd = data as ConditionData;
  const a = portValues?.a ?? 0;
  const b = portValues?.b ?? 0;
  const result = evaluate(a, b, cd.op);

  const opLabel = OP_LABELS.find((o) => o.key === cd.op)?.label ?? cd.op;

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
      {/* Diamond shape via SVG */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="cond-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <polygon
          points="50,2 98,50 50,98 2,50"
          fill="url(#cond-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Subtle inner diamond */}
        <polygon
          points="50,10 90,50 50,90 10,50"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={0.5}
          opacity={0.12}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content overlaid on diamond */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "22% 12%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          If
        </div>
        <div style={{
          fontSize: 28, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          textShadow: `0 0 14px ${cd.accentColor}44`,
          margin: "2px 0",
        }}>
          {opLabel}
        </div>
        <div style={{
          fontSize: 9, marginTop: 1, textAlign: "center",
          whiteSpace: "nowrap",
        }}>
          <span style={{
            color: result ? "#10b981" : "#ef4444",
            fontWeight: 700,
            fontSize: 10,
            textShadow: result ? "0 0 8px #10b98144" : "0 0 8px #ef444444",
          }}>
            {result ? "TRUE" : "FALSE"}
          </span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ConditionPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<ConditionData>) {
  const cd = data as ConditionData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <div style={row}>
      <span style={label}>Op</span>
      <select
        value={cd.op}
        onChange={(e) => updateData({ op: e.target.value as ConditionData["op"] })}
        style={{
          flex: 1,
          background: "#2a2a3e",
          border: "1px solid #3a3a4e",
          borderRadius: 6,
          color: "#fff",
          padding: "4px 8px",
          fontSize: 12,
        }}
      >
        {OP_LABELS.map((op) => (
          <option key={op.key} value={op.key}>
            {op.label} ({op.key})
          </option>
        ))}
      </select>
    </div>
  );
}

// ── Node type definition ────────────────────────────────────

export const conditionNodeType: NodeTypeDefinition<ConditionData> = {
  type: "condition",
  component: ConditionRenderer,
  propertiesPanel: ConditionPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: ConditionData) => {
    const a = inputs.a ?? 0;
    const b = inputs.b ?? 0;
    const result = evaluate(a, b, data.op);
    return {
      then: result ? a : null,
      else: result ? null : a,
    };
  },
  getClipboardText: () => "Condition",
};
