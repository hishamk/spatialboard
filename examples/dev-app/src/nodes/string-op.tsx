import { memo } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";
import { useCallback } from "react";

// ── Data shape ──────────────────────────────────────────────

export type StringMode =
  | "concat" | "split" | "replace" | "contains"
  | "upper" | "lower" | "trim" | "length" | "slice";

export interface StringOpData {
  mode: StringMode;
  separator: string;
  searchFor: string;
  replaceWith: string;
  sliceStart: number;
  sliceEnd: number;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "string" },
  { id: "b", label: "B", direction: "input", dataType: "string" },
  { id: "out", label: "Out", direction: "output", dataType: "any" },
];

// ── Helpers ─────────────────────────────────────────────────

const MODE_INFO: { key: StringMode; label: string; hint: string }[] = [
  { key: "concat", label: "A+B", hint: "Join A and B" },
  { key: "upper", label: "ABC", hint: "Uppercase" },
  { key: "lower", label: "abc", hint: "Lowercase" },
  { key: "trim", label: "Trim", hint: "Remove whitespace" },
  { key: "length", label: "#", hint: "String length" },
  { key: "contains", label: "?", hint: "A contains B" },
  { key: "replace", label: "s/", hint: "Find & replace" },
  { key: "split", label: "[,]", hint: "Split by separator" },
  { key: "slice", label: "[:]", hint: "Substring" },
];

function computeString(mode: StringMode, a: string, b: string, data: StringOpData): PortValue {
  switch (mode) {
    case "concat": return a + b;
    case "upper": return a.toUpperCase();
    case "lower": return a.toLowerCase();
    case "trim": return a.trim();
    case "length": return a.length;
    case "contains": return a.includes(b || data.searchFor);
    case "replace": return a.replaceAll(data.searchFor, data.replaceWith);
    case "split": return a.split(data.separator || ",") as unknown as PortValue;
    case "slice": return a.slice(data.sliceStart, data.sliceEnd || undefined);
  }
}

function formatPreview(val: PortValue): string {
  if (val === null || val === undefined) return "\u2014";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  if (Array.isArray(val)) return `[${val.length}]`;
  const s = String(val);
  return s.length > 20 ? s.slice(0, 19) + "\u2026" : s;
}

// ── Renderer ────────────────────────────────────────────────

const StringOpRenderer = memo(function StringOpRenderer(
  props: NodeRendererProps<StringOpData>,
) {
  const { data, portValues } = props;
  const cd = data as StringOpData;
  const a = String(portValues?.a ?? "");
  const b = String(portValues?.b ?? "");
  const info = MODE_INFO.find((m) => m.key === cd.mode)!;
  const result = computeString(cd.mode, a, b, cd);

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
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="strOp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={76}
          rx={6} ry={6}
          fill="url(#strOp-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Quotation marks decoration */}
        <text
          x={12} y={30}
          fontSize={28}
          fill={cd.accentColor}
          opacity={0.08}
          fontFamily="Georgia, serif"
          fontWeight={700}
        >
          {"\u201C"}
        </text>
        <text
          x={88} y={70}
          fontSize={28}
          fill={cd.accentColor}
          opacity={0.08}
          fontFamily="Georgia, serif"
          fontWeight={700}
        >
          {"\u201D"}
        </text>
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
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
            String
          </span>
          <span style={{
            fontSize: 8, color: cd.accentColor, opacity: 0.7,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {info.label}
          </span>
        </div>
        <div style={{
          fontSize: 10, fontWeight: 700, lineHeight: 1.2,
          marginTop: 4,
          color: cd.accentColor,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          textAlign: "center",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {formatPreview(result)}
        </div>
        <div style={{ fontSize: 7, color: "#444", marginTop: 2 }}>
          {info.hint}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function StringOpPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<StringOpData>) {
  const cd = data as StringOpData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" };
  const label: React.CSSProperties = { width: 48, fontSize: 9, color: "#666", flexShrink: 0 };
  const inputStyle: React.CSSProperties = {
    flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
    borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 11,
    fontFamily: "'JetBrains Mono', monospace",
  };

  const onSep = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    updateData({ separator: e.target.value }), [updateData]);
  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    updateData({ searchFor: e.target.value }), [updateData]);
  const onReplace = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    updateData({ replaceWith: e.target.value }), [updateData]);
  const onStart = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) updateData({ sliceStart: v });
  }, [updateData]);
  const onEnd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value, 10);
    if (!isNaN(v)) updateData({ sliceEnd: v });
  }, [updateData]);

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Mode</span>
        {MODE_INFO.map((m) => (
          <button
            key={m.key}
            onClick={() => updateData({ mode: m.key })}
            title={m.hint}
            style={{
              minWidth: 26, height: 22, padding: "0 4px",
              background: cd.mode === m.key ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 5, color: "#fff", fontSize: 8, fontWeight: 600, cursor: "pointer",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      {cd.mode === "split" && (
        <div style={row}>
          <span style={label}>Sep</span>
          <input type="text" value={cd.separator} onChange={onSep} placeholder="," style={inputStyle} />
        </div>
      )}
      {(cd.mode === "replace" || cd.mode === "contains") && (
        <div style={row}>
          <span style={label}>Find</span>
          <input type="text" value={cd.searchFor} onChange={onSearch} style={inputStyle} />
        </div>
      )}
      {cd.mode === "replace" && (
        <div style={row}>
          <span style={label}>Replace</span>
          <input type="text" value={cd.replaceWith} onChange={onReplace} style={inputStyle} />
        </div>
      )}
      {cd.mode === "slice" && (
        <div style={row}>
          <span style={label}>Range</span>
          <input type="number" value={cd.sliceStart} onChange={onStart} style={{ ...inputStyle, width: 50, flex: "none" }} />
          <span style={{ color: "#555", fontSize: 10 }}>:</span>
          <input type="number" value={cd.sliceEnd} onChange={onEnd} style={{ ...inputStyle, width: 50, flex: "none" }} />
        </div>
      )}
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const stringOpNodeType: NodeTypeDefinition<StringOpData> = {
  type: "string-op",
  docs: {},
  component: StringOpRenderer,
  propertiesPanel: StringOpPropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: StringOpData) => {
    const a = String(inputs.a ?? "");
    const b = String(inputs.b ?? "");
    return { out: computeString(data.mode, a, b, data) };
  },
  getClipboardText: (node) => {
    const d = node.data as StringOpData;
    const info = MODE_INFO.find((m) => m.key === d.mode);
    return `String (${info?.hint ?? d.mode})`;
  },
};
