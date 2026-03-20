import { memo, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export interface JsonParseData {
  path: string;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "input", label: "JSON", direction: "input", dataType: "string" },
  { id: "output", label: "Out", direction: "output", dataType: "any" },
  { id: "error", label: "Err", direction: "output", dataType: "string" },
];

// ── Helpers ─────────────────────────────────────────────────

function resolvePath(obj: unknown, path: string): unknown {
  if (!path) return obj;
  const keys = path.split(".");
  let cur: unknown = obj;
  for (const key of keys) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur;
}

function formatPreview(val: unknown): string {
  if (val === undefined) return "\u2014";
  if (val === null) return "null";
  if (typeof val === "string") {
    return val.length > 30 ? '"' + val.slice(0, 27) + '\u2026"' : '"' + val + '"';
  }
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) return `[${val.length} items]`;
  if (typeof val === "object") {
    const keys = Object.keys(val);
    return `{${keys.length} keys}`;
  }
  return String(val);
}

// ── Renderer ────────────────────────────────────────────────

const JsonParseRenderer = memo(function JsonParseRenderer(
  props: NodeRendererProps<JsonParseData>,
) {
  const { data, portValues } = props;
  const cd = data as JsonParseData;
  const rawInput = portValues?.input as string | undefined;

  let parsed: unknown = undefined;
  let error = "";

  if (rawInput != null && rawInput !== "") {
    try {
      parsed = JSON.parse(rawInput);
      if (cd.path) {
        parsed = resolvePath(parsed, cd.path);
      }
    } catch (e) {
      error = (e as Error).message;
    }
  }

  const hasInput = rawInput != null && rawInput !== "";
  const preview = error ? error : formatPreview(parsed);

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
      {/* Background with curly-brace decoration */}
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="json-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={76}
          rx={6} ry={6}
          fill="url(#json-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {/* Left curly brace */}
        <text
          x={10} y={52}
          fontSize={36}
          fill={cd.accentColor}
          opacity={0.08}
          fontFamily="'JetBrains Mono', monospace"
          fontWeight={700}
        >
          {"{"}
        </text>
        {/* Right curly brace */}
        <text
          x={88} y={52}
          fontSize={36}
          fill={cd.accentColor}
          opacity={0.08}
          fontFamily="'JetBrains Mono', monospace"
          fontWeight={700}
        >
          {"}"}
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
          padding: "8% 14%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          JSON Parse
        </div>

        {cd.path && (
          <div style={{
            fontSize: 7, color: cd.accentColor, opacity: 0.7,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            marginTop: 2,
          }}>
            .{cd.path}
          </div>
        )}

        <div style={{
          fontSize: hasInput ? 10 : 9, fontWeight: 700, lineHeight: 1.2,
          marginTop: 4,
          color: error ? "#ef4444" : hasInput ? cd.accentColor : "#333",
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          textAlign: "center",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {hasInput ? preview : "no input"}
        </div>

        {error && (
          <div style={{
            fontSize: 6, color: "#ef4444", marginTop: 2,
            opacity: 0.7,
          }}>
            parse error
          </div>
        )}
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function JsonParsePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<JsonParseData>) {
  const cd = data as JsonParseData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 40, fontSize: 10, color: "#999", flexShrink: 0 };

  const onPathChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => updateData({ path: e.target.value }),
    [updateData],
  );

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Path</span>
        <input
          type="text"
          value={cd.path}
          onChange={onPathChange}
          placeholder="e.g. data.items.0.name"
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }}
        />
      </div>
      <div style={{ fontSize: 9, color: "#555", paddingLeft: 44 }}>
        Dot-path to extract a nested value
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const jsonParseNodeType: NodeTypeDefinition<JsonParseData> = {
  type: "json-parse",
  docs: {},
  component: JsonParseRenderer,
  propertiesPanel: JsonParsePropertiesPanel,
  ports,
  compute: (inputs: Record<string, PortValue>, data: JsonParseData) => {
    const raw = inputs.input;
    if (raw == null || raw === "") return { output: null, error: "" };
    try {
      let parsed: unknown = JSON.parse(String(raw));
      if (data.path) {
        parsed = resolvePath(parsed, data.path);
      }
      return { output: parsed as PortValue, error: "" };
    } catch (e) {
      return { output: null, error: (e as Error).message };
    }
  },
  getClipboardText: (node) => {
    const d = node.data as JsonParseData;
    return d.path ? `JSON Parse (.${d.path})` : "JSON Parse";
  },
};
