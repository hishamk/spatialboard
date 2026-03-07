import type { YouTubeNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import YouTubeBlock from "../components/YouTubeBlock";

type YouTubeNodeData = YouTubeNode["data"];

function YouTubeNodeRenderer(props: NodeRendererProps<YouTubeNodeData>) {
  const node = props.node as YouTubeNode;
  return (
    <YouTubeBlock
      node={node}
      isSelected={props.isSelected}
      engine={props.engine}
      interactive={props.interactive}
      zoom={props.zoom}
      editing={props.editing}
      onResizeHandleDown={props.callbacks.onResizeHandleDown}
      onEditStart={() => props.callbacks.onEditStart?.(node.id)}
      onEditEnd={() => props.callbacks.onEditEnd?.()}
    />
  );
}

export const youtubeNodeType: NodeTypeDefinition<YouTubeNodeData> = {
  type: "youtube",
  component: YouTubeNodeRenderer,
  handlesOwnLayout: true,
  getClipboardText: (node) => {
    const data = node.data as YouTubeNodeData;
    return data.url || null;
  },
};
