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

export type CompareOp = "==" | "!=" | "<" | ">" | "<=" | ">=" | "contains" | "startsWith" | "endsWith";

export interface CompareData {
  op: CompareOp;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "any" },
  { id: "b", label: "B", direction: "input", dataType: "any" },
  { id: "result", label: "Result", direction: "output", dataType: "boolean" },
];

// ── Helpers ─────────────────────────────────────────────────

const OP_INFO: { key: CompareOp; label: string; group: "cmp" | "str" }[] = [
  { key: "==", label: "=", group: "cmp" },
  { key: "!=", label: "\u2260", group: "cmp" },
  { key: "<", label: "<", group: "cmp" },
  { key: ">", label: ">", group: "cmp" },
  { key: "<=", label: "\u2264", group: "cmp" },
  { key: ">=", label: "\u2265", group: "cmp" },
  { key: "contains", label: "\u2283", group: "str" },
  { key: "startsWith", label: "A..", group: "str" },
  { key: "endsWith", label: "..A", group: "str" },
];

function evaluate(op: CompareOp, a: PortValue, b: PortValue): boolean {
  switch (op) {
    // eslint-disable-next-line eqeqeq
    case "==": return a == b;
    // eslint-disable-next-line eqeqeq
    case "!=": return a != b;
    case "<": return Number(a) < Number(b);
    case ">": return Number(a) > Number(b);
    case "<=": return Number(a) <= Number(b);
    case ">=": return Number(a) >= Number(b);
    case "contains": return String(a).includes(String(b));
    case "startsWith": return String(a).startsWith(String(b));
    case "endsWith": return String(a).endsWith(String(b));
  }
}

// ── Renderer ────────────────────────────────────────────────

const CompareRenderer = memo(function CompareRenderer(
  props: NodeRendererProps<CompareData>,
) {
  const { data, portValues } = props;
  const cd = data as CompareData;
  const a = portValues?.a ?? null;
  const b = portValues?.b ?? null;
  const result = evaluate(cd.op, a, b);
  const info = OP_INFO.find((o) => o.key === cd.op)!;

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
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="cmp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Scale / balance shape */}
        <rect
          x={2} y={2} width={96} height={76}
          rx={6} ry={6}
          fill="url(#cmp-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Balance beam decoration */}
        <line x1={20} y1={62} x2={80} y2={62}
          stroke={cd.accentColor} strokeWidth={1} opacity={0.1} vectorEffect="non-scaling-stroke" />
        <line x1={50} y1={62} x2={50} y2={52}
          stroke={cd.accentColor} strokeWidth={1} opacity={0.1} vectorEffect="non-scaling-stroke" />
        <polygon points="46,52 54,52 50,48"
          fill={cd.accentColor} opacity={0.08} />
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
          padding: "8% 12%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Compare
        </div>
        <div style={{
          fontSize: 22, fontWeight: 800, color: cd.accentColor, lineHeight: 1,
          margin: "3px 0",
          textShadow: `0 0 10px ${cd.accentColor}44`,
        }}>
          {info.label}
        </div>
        {/* Result indicator */}
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          marginTop: 2,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: result ? "#10b981" : "#ef4444",
            boxShadow: result ? "0 0 6px #10b981" : "0 0 6px #ef4444",
          }} />
          <span style={{
            fontSize: 9, fontWeight: 700,
            color: result ? "#10b981" : "#ef4444",
          }}>
            {result ? "TRUE" : "FALSE"}
          </span>
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function ComparePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<CompareData>) {
  const cd = data as CompareData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" };
  const label: React.CSSProperties = { width: 48, fontSize: 9, color: "#666", flexShrink: 0 };

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Compare</span>
        {OP_INFO.filter(o => o.group === "cmp").map((o) => (
          <button
            key={o.key}
            onClick={() => updateData({ op: o.key })}
            title={o.key}
            style={{
              minWidth: 26, height: 24, padding: "0 5px",
              background: cd.op === o.key ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 5, color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div style={row}>
        <span style={label}>String</span>
        {OP_INFO.filter(o => o.group === "str").map((o) => (
          <button
            key={o.key}
            onClick={() => updateData({ op: o.key })}
            title={o.key}
            style={{
              minWidth: 26, height: 24, padding: "0 5px",
              background: cd.op === o.key ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 5, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const compareNodeType: NodeTypeDefinition<CompareData> = {
  type: "compare",
  docs: {},
  component: CompareRenderer,
  propertiesPanel: ComparePropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: CompareData) => ({
    result: evaluate(data.op, inputs.a ?? null, inputs.b ?? null),
  }),
  getClipboardText: (node) => `Compare (${(node.data as CompareData).op})`,
};
