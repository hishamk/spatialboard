import { memo } from "react";
import type { DrawNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import { isPointInDrawNode } from "../engine/spatial-index";
import SVGNodeBlock from "../components/SVGNodeBlock";

export type DrawNodeData = DrawNode["data"];

const DrawNodeRenderer = memo(function DrawNodeRenderer(
  props: NodeRendererProps<DrawNodeData>,
) {
  return <SVGNodeBlock node={props.node as DrawNode} />;
});

export const drawNodeType: NodeTypeDefinition<DrawNodeData> = {
  type: "draw",
  component: DrawNodeRenderer,
  handlesOwnLayout: true,
  hitTest: (node, cx, cy, zoom) =>
    isPointInDrawNode(node as DrawNode, cx, cy, zoom),
  getHitPadding: (node) => {
    const data = node.data as DrawNodeData;
    return Math.max(20, data.strokeWidth * 4);
  },
  onResize: (node, sx, sy) => {
    const data = node.data as DrawNodeData;
    return {
      points: data.points.map(
        ([x, y, p]) => [x * sx, y * sy, p] as [number, number, number],
      ),
    };
  },
  onFlip: (node, dir) => {
    const data = node.data as DrawNodeData;
    if (dir === "h") {
      return {
        points: data.points.map(
          ([x, y, p]) =>
            [node.w - x, y, p] as [number, number, number],
        ),
      };
    }
    const h = node.h === "auto" ? 0 : (node.h as number);
    return {
      points: data.points.map(
        ([x, y, p]) => [x, h - y, p] as [number, number, number],
      ),
    };
  },
  getClipboardText: () => null,
};
