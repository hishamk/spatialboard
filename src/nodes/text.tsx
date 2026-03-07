import type { TextNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import TextNodeBlock from "../components/TextNodeBlock";

export type TextNodeData = TextNode["data"];

function TextNodeRenderer(props: NodeRendererProps<TextNodeData>) {
  const node = props.node as TextNode;
  return (
    <TextNodeBlock
      node={node}
      engine={props.engine}
      editing={props.editing}
      editClickPos={props.editClickPos}
      onStopEdit={() => props.callbacks.onEditEnd?.()}
      onMeasuredHeight={props.callbacks.onMeasuredHeight}
    />
  );
}

export const textNodeType: NodeTypeDefinition<TextNodeData> = {
  type: "text",
  component: TextNodeRenderer,
  handlesOwnLayout: true,
  onResize: (node, sx, _sy) => {
    const data = node.data as TextNodeData;
    return { fontSize: data.fontSize * sx };
  },
  getClipboardText: (node) => {
    const data = node.data as TextNodeData;
    return data.text || null;
  },
};
