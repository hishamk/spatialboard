import type { ContentNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import ContentBlock from "../components/ContentBlock";
import { schema } from "../schema";
import { blocksToMarkdown, markdownToBlocks, htmlToBlocks } from "../serialization/blocknote-markdown";
import { setSbdMarkdownCodec } from "../serialization/markdown-codec";

// Opting into this rich-text node also registers the markdown codec that core
// SBD serialize/parse and clipboard paste use — so those paths carry no
// @blocknote edge unless this node module is loaded.
setSbdMarkdownCodec({ blocksToMarkdown, markdownToBlocks, htmlToBlocks });

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
