import type { ImageNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import ImageBlock from "../components/ImageBlock";

export type ImageNodeData = ImageNode["data"];

function ImageNodeRenderer(props: NodeRendererProps<ImageNodeData>) {
  const node = props.node as ImageNode;
  return (
    <ImageBlock
      node={node}
      isSelected={props.isSelected}
      engine={props.engine}
      interactive={props.interactive}
      zoom={props.zoom}
      onResizeHandleDown={props.callbacks.onResizeHandleDown}
      cropping={props.editing}
      onCropStart={() => props.callbacks.onEditStart?.(node.id)}
      onCropEnd={() => props.callbacks.onEditEnd?.()}
    />
  );
}

export const imageNodeType: NodeTypeDefinition<ImageNodeData> = {
  type: "image",
  component: ImageNodeRenderer,
  handlesOwnLayout: true,
  onFlip: (node, dir) => {
    const data = node.data as ImageNodeData;
    if (dir === "h") {
      return { flipH: !data.flipH };
    }
    return { flipV: !data.flipV };
  },
  getClipboardText: (node) => {
    const data = node.data as ImageNodeData;
    return data.src || null;
  },
};
