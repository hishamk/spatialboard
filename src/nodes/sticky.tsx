import type { StickyNoteNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import StickyNoteBlock from "../components/blocks/StickyNoteBlock";

export type StickyNodeData = StickyNoteNode["data"];

function StickyNodeRenderer(props: NodeRendererProps<StickyNodeData>) {
  const node = props.node as StickyNoteNode;
  return (
    <StickyNoteBlock
      node={node}
      isSelected={props.isSelected}
      engine={props.engine}
      interactive={props.interactive}
      zoom={props.zoom}
      editing={props.editing}
      onEditStart={(id) => props.callbacks.onEditStart?.(id)}
      onEditEnd={() => props.callbacks.onEditEnd?.()}
    />
  );
}

export const stickyNodeType: NodeTypeDefinition<StickyNodeData> = {
  type: "sticky",
  component: StickyNodeRenderer,
  handlesOwnLayout: true,
  getClipboardText: (node) => {
    const data = node.data as StickyNodeData;
    return data.text || null;
  },
};
