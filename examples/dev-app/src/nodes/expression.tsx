import { memo, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface ExpressionData {
  expr: string;
  error: string;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "any", defaultValue: 0 },
  { id: "b", label: "B", direction: "input", dataType: "any", defaultValue: 0 },
  { id: "c", label: "C", direction: "input", dataType: "any", defaultValue: 0 },
  { id: "result", label: "Result", direction: "output", dataType: "any" },
  { id: "error", label: "Err", direction: "output", dataType: "string" },
];

// ── Helpers ─────────────────────────────────────────────────

function safeEval(expr: string, a: unknown, b: unknown, c: unknown): { result: PortValue; error: string } {
  if (!expr.trim()) return { result: null, error: "" };
  try {
    // Provide Math functions and constants in scope
    const fn = new Function(
      "a", "b", "c",
      "abs", "floor", "ceil", "round", "sqrt", "pow", "min", "max",
      "sin", "cos", "tan", "log", "exp", "PI", "E",
      `"use strict"; return (${expr});`,
    );
    const result = fn(
      a, b, c,
      Math.abs, Math.floor, Math.ceil, Math.round, Math.sqrt, Math.pow, Math.min, Math.max,
      Math.sin, Math.cos, Math.tan, Math.log, Math.exp, Math.PI, Math.E,
    );
    return { result: result as PortValue, error: "" };
  } catch (e) {
    return { result: null, error: (e as Error).message };
  }
}

function formatResult(val: PortValue): string {
  if (val === null || val === undefined) return "\u2014";
  if (typeof val === "number") {
    if (!Number.isFinite(val)) return String(val);
    return Number.isInteger(val) ? String(val) : val.toFixed(4);
  }
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "string") return val.length > 20 ? val.slice(0, 19) + "\u2026" : val;
  return JSON.stringify(val).slice(0, 20);
}

// ── Renderer ────────────────────────────────────────────────

const ExpressionRenderer = memo(function ExpressionRenderer(
  props: NodeRendererProps<ExpressionData>,
) {
  const { data, portValues } = props;
  const cd = data as ExpressionData;
  const a = portValues?.a ?? 0;
  const b = portValues?.b ?? 0;
  const c = portValues?.c ?? 0;
  const { result, error } = safeEval(cd.expr, a, b, c);

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
        viewBox="0 0 140 90"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="expr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={136} height={86}
          rx={6} ry={6}
          fill="url(#expr-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* f(x) decoration */}
        <text
          x={110} y={24}
          fontSize={16}
          fill={cd.accentColor}
          opacity={0.08}
          fontFamily="Georgia, serif"
          fontStyle="italic"
        >
          f(x)
        </text>
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "6% 8%",
          boxSizing: "border-box",
          gap: 2,
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Expression
        </div>
        {/* Expression text */}
        <div style={{
          fontSize: 9, color: cd.accentColor,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          opacity: cd.expr ? 1 : 0.4,
          marginTop: 2,
        }}>
          {cd.expr || "a + b"}
        </div>
        {/* Result or error */}
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          {error ? (
            <span style={{ fontSize: 8, color: "#ef4444", fontWeight: 600 }}>
              {error.length > 30 ? error.slice(0, 29) + "\u2026" : error}
            </span>
          ) : (
            <>
              <span style={{ fontSize: 8, color: "#555" }}>=</span>
              <span style={{
                fontSize: 12, fontWeight: 800, color: cd.accentColor,
                fontVariantNumeric: "tabular-nums",
              }}>
                {formatResult(result)}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ExpressionPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<ExpressionData>) {
  const cd = data as ExpressionData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 40, fontSize: 10, color: "#999", flexShrink: 0 };

  const onExprChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => updateData({ expr: e.target.value }),
    [updateData],
  );

  const PRESETS = [
    { label: "a + b", expr: "a + b" },
    { label: "a * 2", expr: "a * 2" },
    { label: "sqrt(a)", expr: "sqrt(a)" },
    { label: "a > b", expr: "a > b" },
    { label: "min(a,b)", expr: "min(a, b)" },
  ];

  return (
    <>
      <div style={row}>
        <span style={label}>Expr</span>
        <input
          type="text"
          value={cd.expr}
          onChange={onExprChange}
          placeholder="a + b * c"
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}
        />
      </div>
      <div style={{ fontSize: 8, color: "#555", paddingLeft: 44 }}>
        Inputs: a, b, c. Math: abs, floor, ceil, round, sqrt, pow, min, max, sin, cos, PI
      </div>
      <div style={{ ...row, flexWrap: "wrap", paddingLeft: 44 }}>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => updateData({ expr: p.expr })}
            style={{
              padding: "2px 6px",
              background: cd.expr === p.expr ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 4, color: "#fff", fontSize: 8, cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const expressionNodeType: NodeTypeDefinition<ExpressionData> = {
  type: "expression",
  component: ExpressionRenderer,
  propertiesPanel: ExpressionPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: ExpressionData) => {
    const { result, error } = safeEval(data.expr, inputs.a ?? 0, inputs.b ?? 0, inputs.c ?? 0);
    return { result, error };
  },
  getClipboardText: (node) => {
    const d = node.data as ExpressionData;
    return `Expr: ${d.expr || "(empty)"}`;
  },
};
