import type { EdgeNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";

export type EdgeNodeData = EdgeNode["data"];

// Edges render in the SVG layer only — this component is a no-op placeholder.
function EdgeNodeRenderer(_props: NodeRendererProps<EdgeNodeData>) {
  return null;
}

export const edgeNodeType: NodeTypeDefinition<EdgeNodeData> = {
  type: "edge",
  component: EdgeNodeRenderer,
  isSVGOnly: true,
  handlesOwnLayout: true,
  getClipboardText: () => null,
};
