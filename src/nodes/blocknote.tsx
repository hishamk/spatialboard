import type { BlockNoteNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import BlockNoteBlock from "../components/blocks/BlockNoteBlock";
import { schema } from "../schema";
import { blocksToMarkdown, markdownToBlocks, htmlToBlocks } from "../serialization/blocknote-markdown";
import { setSbdMarkdownCodec } from "../serialization/markdown-codec";

// Opting into this rich-text node also registers the markdown codec that core
// SBD serialize/parse and clipboard paste use — so those paths carry no
// @blocknote edge unless this node module is loaded.
setSbdMarkdownCodec({ blocksToMarkdown, markdownToBlocks, htmlToBlocks });

export type BlockNoteNodeData = BlockNoteNode["data"];

function BlockNoteNodeRenderer(props: NodeRendererProps<BlockNoteNodeData>) {
  const node = props.node as BlockNoteNode;
  return (
    <BlockNoteBlock
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

export const blocknoteNodeType: NodeTypeDefinition<BlockNoteNodeData> = {
  type: "blocknote",
  component: BlockNoteNodeRenderer,
  handlesOwnLayout: true,
  getClipboardText: (node) => {
    const data = node.data as BlockNoteNodeData;
    return data.markdown || null;
  },
};
