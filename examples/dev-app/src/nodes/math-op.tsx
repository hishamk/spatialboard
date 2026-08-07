import { memo } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export type MathOp =
  | "add" | "subtract" | "multiply" | "divide"
  | "power" | "modulo" | "min" | "max"
  | "abs" | "negate";

export interface MathOpData {
  op: MathOp;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "b", label: "B", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "result", label: "Result", direction: "output", dataType: "number" },
];

// ── Helpers ─────────────────────────────────────────────────

const UNARY_OPS = new Set<MathOp>(["abs", "negate"]);

const OP_INFO: { key: MathOp; symbol: string; label: string }[] = [
  { key: "add", symbol: "+", label: "+" },
  { key: "subtract", symbol: "\u2212", label: "\u2212" },
  { key: "multiply", symbol: "\u00D7", label: "\u00D7" },
  { key: "divide", symbol: "\u00F7", label: "\u00F7" },
  { key: "power", symbol: "^", label: "x\u207F" },
  { key: "modulo", symbol: "%", label: "%" },
  { key: "min", symbol: "\u2227", label: "min" },
  { key: "max", symbol: "\u2228", label: "max" },
  { key: "abs", symbol: "|x|", label: "|x|" },
  { key: "negate", symbol: "\u00B1", label: "\u00B1" },
];

function computeOp(op: MathOp, a: number, b: number): number {
  switch (op) {
    case "add": return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide": return b !== 0 ? a / b : 0;
    case "power": return Math.pow(a, b);
    case "modulo": return b !== 0 ? a % b : 0;
    case "min": return Math.min(a, b);
    case "max": return Math.max(a, b);
    case "abs": return Math.abs(a);
    case "negate": return -a;
  }
}

// ── Renderer ────────────────────────────────────────────────

const MathOpRenderer = memo(function MathOpRenderer(
  props: NodeRendererProps<MathOpData>,
) {
  const { data, portValues } = props;
  const cd = data as MathOpData;
  const result = (portValues?.result as number) ?? 0;
  const info = OP_INFO.find((o) => o.key === cd.op)!;
  const isUnary = UNARY_OPS.has(cd.op);

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
      {/* Hexagon shape via SVG */}
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
          <linearGradient id="math-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Horizontal hexagon */}
        <polygon
          points="25,2 75,2 98,50 75,98 25,98 2,50"
          fill="url(#math-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Inner hexagon accent */}
        <polygon
          points="28,8 72,8 92,50 72,92 28,92 8,50"
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
          padding: "15% 18%",
          boxSizing: "border-box",
        }}
      >
        <div style={{
          fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase",
        }}>
          {isUnary ? "Math (A)" : "Math"}
        </div>
        <div style={{
          fontSize: info.symbol.length > 2 ? 18 : 28,
          fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          textShadow: `0 0 14px ${cd.accentColor}44`,
          margin: "2px 0",
        }}>
          {info.symbol}
        </div>
        <div style={{
          fontSize: 9, color: "#777", textAlign: "center", whiteSpace: "nowrap",
        }}>
          = <span style={{ color: "#ccc", fontWeight: 600 }}>
            {typeof result === "number" && !Number.isInteger(result) ? result.toFixed(2) : result}
          </span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function MathOpPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<MathOpData>) {
  const cd = data as MathOpData;

  const GROUPS: { label: string; ops: MathOp[] }[] = [
    { label: "Arithmetic", ops: ["add", "subtract", "multiply", "divide"] },
    { label: "Advanced", ops: ["power", "modulo", "min", "max"] },
    { label: "Unary", ops: ["abs", "negate"] },
  ];

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      {GROUPS.map((g) => (
        <div key={g.label} style={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
          <span style={{ width: 52, fontSize: 9, color: "#666", flexShrink: 0 }}>{g.label}</span>
          {g.ops.map((opKey) => {
            const info = OP_INFO.find((o) => o.key === opKey)!;
            return (
              <button
                key={opKey}
                onClick={() => updateData({ op: opKey })}
                title={opKey}
                style={{
                  minWidth: 28,
                  height: 24,
                  padding: "0 5px",
                  background: cd.op === opKey ? cd.accentColor : "#2a2a3e",
                  border: "1px solid #3a3a4e",
                  borderRadius: 5,
                  color: "#fff",
                  fontSize: info.label.length > 2 ? 8 : 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {info.label}
              </button>
            );
          })}
        </div>
      ))}
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const mathOpNodeType: NodeTypeDefinition<MathOpData> = {
  type: "math-op",
  docs: {},
  component: MathOpRenderer,
  propertiesPanel: MathOpPropertiesPanel,
  // Body is drawn inset from its box, so anchor ports on the drawn edge.
  portAnchor: { kind: "inset", left: 0.10, right: 0.02 },
  ports,
  compute: (inputs: Record<string, PortValue>, data: MathOpData) => {
    const a = (inputs.a as number) ?? 0;
    const b = (inputs.b as number) ?? 0;
    return { result: computeOp(data.op, a, b) };
  },
  getClipboardText: (node) => {
    const d = node.data as MathOpData;
    const info = OP_INFO.find((o) => o.key === d.op);
    return `Math (${info?.label ?? d.op})`;
  },
};
