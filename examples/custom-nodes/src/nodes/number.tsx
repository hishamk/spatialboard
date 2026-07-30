import { memo, type CSSProperties, type MouseEvent } from "react";
import type { NodeTypeDefinition, NodeRendererProps, PortDefinition } from "spatialboard";

/**
 * A SOURCE node: holds a number and outputs it. No inputs.
 *
 * The renderer is interactive — the −/+ buttons call `updateData`, which mutates
 * the node (with undo) and re-runs the data-flow graph, so everything downstream
 * updates live. `stopPropagation` keeps the click from starting a node drag.
 */
export interface NumberData {
  label: string;
  value: number;
}

const ports: PortDefinition[] = [
  { id: "out", label: "Value", direction: "output", dataType: "number" },
];

const NumberRenderer = memo(function NumberRenderer(props: NodeRendererProps<NumberData>) {
  const { data, updateData, interactive } = props;
  const step = (delta: number) => (e: MouseEvent) => {
    e.stopPropagation();
    updateData({ value: Math.round((data.value + delta) * 100) / 100 });
  };
  return (
    <div style={card("#38bdf8")}>
      <div style={caption}>{data.label || "Number"}</div>
      <div style={value}>{data.value}</div>
      {interactive && (
        <div style={{ display: "flex", gap: 6 }}>
          <button style={btn} onClick={step(-1)} title="Decrease">−</button>
          <button style={btn} onClick={step(1)} title="Increase">+</button>
        </div>
      )}
    </div>
  );
});

export const numberNodeType: NodeTypeDefinition<NumberData> = {
  type: "df-number",
  component: NumberRenderer,
  ports,
  compute: (_inputs, data) => ({ out: data.value }),
  getClipboardText: (node) => String((node.data as NumberData).value),
};

// ── shared card styling (used by all three example nodes) ──
export function card(accent: string): CSSProperties {
  return {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    background: "#141428",
    border: `2px solid ${accent}`,
    borderRadius: 14,
    color: "#fff",
    fontFamily: "'Inter', system-ui, sans-serif",
  };
}
export const caption: CSSProperties = {
  fontSize: 9,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: "#8b8ba7",
};
export const value: CSSProperties = { fontSize: 30, fontWeight: 800, lineHeight: 1 };
const btn: CSSProperties = {
  width: 30,
  height: 26,
  border: "1px solid #38bdf8",
  borderRadius: 7,
  background: "#1e2a44",
  color: "#e0f2fe",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
  lineHeight: 1,
};
