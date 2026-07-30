import { memo } from "react";
import type { NodeTypeDefinition, NodeRendererProps, PortDefinition } from "spatialboard";
import { card, caption } from "./number";

/**
 * A SINK node: one number input, rendered as a filling bar. No output port and
 * no `compute` — it only displays `portValues.in` (the value arriving on its
 * input edge), which the data-flow engine resolves for it.
 */
export interface GaugeData {
  label: string;
  max: number;
}

const ports: PortDefinition[] = [
  { id: "in", label: "Value", direction: "input", dataType: "number", defaultValue: 0 },
];

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);

const GaugeRenderer = memo(function GaugeRenderer(props: NodeRendererProps<GaugeData>) {
  const { data, portValues } = props;
  const v = num(portValues?.in);
  const max = data.max || 100;
  const pct = Math.max(0, Math.min(1, v / max));
  return (
    <div style={{ ...card("#34d399"), justifyContent: "center", gap: 8, padding: "0 14px" }}>
      <div style={caption}>{data.label || "Gauge"}</div>
      <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{v}</div>
      <div style={{ width: "100%", height: 10, background: "#0b1220", borderRadius: 6, overflow: "hidden" }}>
        <div
          style={{
            width: `${pct * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #34d399, #10b981)",
            transition: "width 120ms ease-out",
          }}
        />
      </div>
      <div style={{ fontSize: 9, color: "#8b8ba7" }}>0 – {max}</div>
    </div>
  );
});

export const gaugeNodeType: NodeTypeDefinition<GaugeData> = {
  type: "df-gauge",
  component: GaugeRenderer,
  ports,
  getClipboardText: (node) => String((node.data as GaugeData).label ?? "gauge"),
};
