import { memo, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface TemplateData {
  template: string;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "any" },
  { id: "b", label: "B", direction: "input", dataType: "any" },
  { id: "result", label: "Result", direction: "output", dataType: "string" },
];

// ── Renderer ────────────────────────────────────────────────

const TemplateRenderer = memo(function TemplateRenderer(
  props: NodeRendererProps<TemplateData>,
) {
  const { data, portValues } = props;
  const cd = data as TemplateData;
  const result = (portValues?.result as string) ?? "";

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
      {/* Document shape with folded corner via SVG */}
      <svg
        viewBox="0 0 120 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="tmpl-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Document body with folded top-right corner */}
        <path
          d="M2,2 L96,2 L118,24 L118,98 L2,98 Z"
          fill="url(#tmpl-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Corner fold triangle */}
        <path
          d="M96,2 L96,24 L118,24"
          fill="none"
          stroke={cd.accentColor}
          strokeWidth={1.5}
          opacity={0.4}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M96,2 L96,24 L118,24 Z"
          fill={cd.accentColor}
          opacity={0.08}
        />
        {/* Template lines decoration */}
        <line x1="14" y1="38" x2="80" y2="38" stroke={cd.accentColor} strokeWidth={0.5} opacity={0.15} vectorEffect="non-scaling-stroke" />
        <line x1="14" y1="48" x2="100" y2="48" stroke={cd.accentColor} strokeWidth={0.5} opacity={0.1} vectorEffect="non-scaling-stroke" />
        <line x1="14" y1="58" x2="70" y2="58" stroke={cd.accentColor} strokeWidth={0.5} opacity={0.08} vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          padding: "10% 12%",
          boxSizing: "border-box",
        }}
      >
        <div style={{
          fontSize: 8, color: "#555", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4,
        }}>
          Template
        </div>
        <div style={{
          fontSize: 9, color: "#555", fontFamily: "monospace", marginBottom: 6,
          wordBreak: "break-all", lineHeight: 1.3,
        }}>
          {cd.template}
        </div>
        <div style={{
          fontSize: 11, color: cd.accentColor, fontWeight: 600,
          background: "rgba(255,255,255,0.04)", borderRadius: 4, padding: "4px 8px",
          wordBreak: "break-all", lineHeight: 1.3,
        }}>
          {result || "\u2014"}
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function TemplatePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<TemplateData>) {
  const cd = data as TemplateData;

  const onTemplateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateData({ template: e.target.value });
    },
    [updateData],
  );

  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <div style={row}>
      <span style={label}>Template</span>
      <input
        type="text"
        value={cd.template}
        onChange={onTemplateChange}
        placeholder="Hello {{a}}, you have {{b}} items"
        style={{
          flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
          borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 11,
          fontFamily: "monospace",
        }}
      />
    </div>
  );
}

// ── Node type definition ────────────────────────────────────

export const templateNodeType: NodeTypeDefinition<TemplateData> = {
  type: "template",
  component: TemplateRenderer,
  propertiesPanel: TemplatePropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: TemplateData) => {
    let result = data.template;
    result = result.replace(/\{\{a\}\}/g, String(inputs.a ?? ""));
    result = result.replace(/\{\{b\}\}/g, String(inputs.b ?? ""));
    return { result };
  },
  getClipboardText: (node) => (node.data as TemplateData).template,
};
