import { useCallback } from "react";
import type { BlockNoteNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import BlockNoteBlock from "../components/blocks/BlockNoteBlock";
import BlockNoteBlockPlaceholder from "../components/blocks/BlockNoteBlockPlaceholder";
import { schema } from "../schema";
import { blocksToMarkdown, markdownToBlocks, htmlToBlocks } from "../serialization/blocknote-markdown";
import { setSbdMarkdownCodec } from "../serialization/markdown-codec";

// Opting into this rich-text node also registers the markdown codec that core
// SBD serialize/parse and clipboard paste use — so those paths carry no
// @blocknote edge unless this node module is loaded.
setSbdMarkdownCodec({ blocksToMarkdown, markdownToBlocks, htmlToBlocks });

export type BlockNoteNodeData = BlockNoteNode["data"];

/**
 * Below this zoom, rich text is unreadably small anyway — render the light
 * skeleton preview instead of mounting a full BlockNote/ProseMirror editor
 * per node (each editor is a complete ProseMirror document + view, the
 * heaviest per-node structure on the board). Double-click on the preview
 * zooms to the node, where the full editor mounts.
 */
const PLACEHOLDER_MAX_ZOOM = 0.35;

function BlockNoteNodeRenderer(props: NodeRendererProps<BlockNoteNodeData>) {
  const node = props.node as BlockNoteNode;
  const { engine } = props;
  const handleZoomToNode = useCallback(
    (nodeId: string) => engine.zoomToNode(nodeId),
    [engine],
  );
  if (props.zoom < PLACEHOLDER_MAX_ZOOM && !props.editing) {
    return (
      <BlockNoteBlockPlaceholder
        node={node}
        isSelected={props.isSelected}
        engine={engine}
        interactive={props.interactive}
        zoom={props.zoom}
        height={engine.resolveHeight(node)}
        onZoomToNode={handleZoomToNode}
      />
    );
  }
  return (
    <BlockNoteBlock
      node={node}
      isSelected={props.isSelected}
      multiSelected={props.multiSelected}
      engine={engine}
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
