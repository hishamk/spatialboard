import { memo } from "react";
import type { ShapeNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import { isPointInShapeNode } from "../engine/spatial-index";
import SVGNodeBlock from "../components/SVGNodeBlock";
import SVGNodeBlockPlaceholder from "../components/SVGNodeBlockPlaceholder";

export type ShapeNodeData = ShapeNode["data"];

const ShapeNodeRenderer = memo(function ShapeNodeRenderer(
  props: NodeRendererProps<ShapeNodeData>,
) {
  const node = props.node as ShapeNode;
  const sh = node.h === "auto" ? 100 : (node.h as number);
  const screenW = node.w * props.zoom;
  const screenH = sh * props.zoom;
  const useShapePlaceholder = Math.min(screenW, screenH) < 2;

  if (useShapePlaceholder) {
    return <SVGNodeBlockPlaceholder node={node} />;
  }
  return <SVGNodeBlock node={node} editingLabel={props.editing} />;
});

export const shapeNodeType: NodeTypeDefinition<ShapeNodeData> = {
  type: "shape",
  component: ShapeNodeRenderer,
  handlesOwnLayout: true,
  hitTest: (node, cx, cy, zoom) => isPointInShapeNode(node, cx, cy, zoom),
  onResize: (node, sx, sy) => {
    const data = node.data as ShapeNodeData;
    const patch: Partial<ShapeNodeData> = {};
    if (data.startPoint) {
      patch.startPoint = [data.startPoint[0] * sx, data.startPoint[1] * sy];
    }
    if (data.endPoint) {
      patch.endPoint = [data.endPoint[0] * sx, data.endPoint[1] * sy];
    }
    return Object.keys(patch).length > 0 ? patch : null;
  },
  onFlip: (node, dir) => {
    const data = node.data as ShapeNodeData;
    if (data.shape !== "arrow" && data.shape !== "line") {
      return {};
    }
    if (dir === "h") {
      if (data.startPoint && data.endPoint) {
        return {
          startPoint: [node.w - data.startPoint[0], data.startPoint[1]] as [number, number],
          endPoint: [node.w - data.endPoint[0], data.endPoint[1]] as [number, number],
        };
      }
      return {};
    }
    const h = node.h === "auto" ? 0 : (node.h as number);
    if (data.startPoint && data.endPoint) {
      return {
        startPoint: [data.startPoint[0], h - data.startPoint[1]] as [number, number],
        endPoint: [data.endPoint[0], h - data.endPoint[1]] as [number, number],
      };
    }
    return {};
  },
  getClipboardText: (node) => {
    const data = node.data as ShapeNodeData;
    return data.label || null;
  },
};
