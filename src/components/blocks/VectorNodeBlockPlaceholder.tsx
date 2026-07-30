import { memo } from "react";
import type { DrawNode, ShapeNode } from "../../engine/types";

/**
 * Lightweight placeholder for draw/shape nodes when zoomed out.
 * Renders a simple rect instead of full SVG path / rough.js output.
 */
function VectorNodeBlockPlaceholder({
  node,
}: {
  node: DrawNode | ShapeNode;
}) {
  const h = node.h === "auto" ? (node.type === "draw" ? 0 : 100) : (node.h as number);
  const effH = node.type === "draw" && h === 0 ? 24 : h;
  const pad = node.type === "draw"
    ? ((node as DrawNode).data.strokeWidth * 4)
    : ((node as ShapeNode).data.strokeWidth * 2);

  return (
    <div
      style={{
        position: "absolute",
        left: node.x - pad,
        top: node.y - pad,
        width: node.w + pad * 2,
        height: effH + pad * 2,
        zIndex: node.z,
        pointerEvents: "none",
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
        transformOrigin: "center center",
        border: `1px solid ${node.type === "draw" ? (node as DrawNode).data.color : (node as ShapeNode).data.stroke}`,
        borderRadius: 4,
        opacity: 0.6,
      }}
    />
  );
}

export default memo(VectorNodeBlockPlaceholder);
