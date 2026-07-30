import { memo } from "react";
import type { NodeTypeDefinition, NodeRendererProps, PortDefinition } from "spatialboard";
import { card, caption } from "./number";

/**
 * A COMPUTE node: two number inputs → their product.
 *
 * `compute(inputs)` is a pure function the data-flow engine calls whenever an
 * input changes. `props.portValues` holds the currently resolved port values
 * (inputs + outputs) so the renderer can show them.
 */
export interface MultiplyData {
  label: string;
}

const ports: PortDefinition[] = [
  { id: "a", label: "A", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "b", label: "B", direction: "input", dataType: "number", defaultValue: 0 },
  { id: "product", label: "A × B", direction: "output", dataType: "number" },
];

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);

const MultiplyRenderer = memo(function MultiplyRenderer(props: NodeRendererProps<MultiplyData>) {
  const { data, portValues } = props;
  const a = num(portValues?.a);
  const b = num(portValues?.b);
  const product = num(portValues?.product);
  return (
    <div style={card("#a78bfa")}>
      <div style={caption}>{data.label || "Multiply"}</div>
      <div style={{ fontSize: 15, color: "#c4b5fd" }}>
        {a} × {b}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{product}</div>
    </div>
  );
});

export const multiplyNodeType: NodeTypeDefinition<MultiplyData> = {
  type: "df-multiply",
  component: MultiplyRenderer,
  ports,
  compute: (inputs) => ({ product: num(inputs.a) * num(inputs.b) }),
  getClipboardText: () => "×",
};
