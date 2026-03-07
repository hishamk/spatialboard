import type { ContentNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import ContentBlock from "../components/ContentBlock";
import { schema } from "../schema";

export type ContentNodeData = ContentNode["data"];

function ContentNodeRenderer(props: NodeRendererProps<ContentNodeData>) {
  const node = props.node as ContentNode;
  return (
    <ContentBlock
      node={node}
      isSelected={props.isSelected}
      multiSelected={props.multiSelected}
      engine={props.engine}
      schema={schema}
      interactive={props.interactive}
      zoom={props.zoom}
      onMeasuredHeight={props.callbacks.onMeasuredHeight}
    />
  );
}

export const contentNodeType: NodeTypeDefinition<ContentNodeData> = {
  type: "content",
  component: ContentNodeRenderer,
  handlesOwnLayout: true,
  getClipboardText: (node) => {
    const data = node.data as ContentNodeData;
    return data.markdown || null;
  },
};
