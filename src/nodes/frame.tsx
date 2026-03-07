import { useCallback } from "react";
import type { FrameNode } from "../engine/types";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";

export type FrameNodeData = FrameNode["data"];

function FrameNodeRenderer(props: NodeRendererProps<FrameNodeData>) {
  const node = props.node as FrameNode;
  const fh = node.h === "auto" ? 100 : (node.h as number);

  const handleLabelBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const val = e.currentTarget.value.trim();
      props.engine.updateNodeWithHistory(node.id, {
        data: { ...node.data, label: val || undefined },
      } as Partial<FrameNode>);
      props.callbacks.onEditEnd?.();
    },
    [node.id, node.data, props.engine, props.callbacks],
  );

  const handleLabelKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === "Escape") {
        e.currentTarget.blur();
      }
      e.stopPropagation();
    },
    [],
  );

  return (
    <div
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        height: fh,
        zIndex: node.z,
        background:
          node.data.backgroundColor || "rgba(0,0,0,0.02)",
        border: `${node.data.borderWidth || 1}px ${node.data.borderStyle || "dashed"} ${node.data.borderColor || "#ccc"}`,
        boxSizing: "border-box",
        borderRadius: 8,
        opacity: node.data.opacity ?? 1,
        pointerEvents: "none",
        overflow: "visible",
        transform: node.rotation
          ? `rotate(${node.rotation}deg)`
          : undefined,
        transformOrigin: "center center",
      }}
    >
      {props.editing ? (
        <input
          autoFocus
          defaultValue={node.data.label ?? ""}
          placeholder="Frame label..."
          onBlur={handleLabelBlur}
          onKeyDown={handleLabelKeyDown}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: -24,
            left: 0,
            fontSize: 12,
            color: node.data.borderColor || "#999",
            fontWeight: 500,
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #3b82f6",
            borderRadius: 4,
            padding: "1px 4px",
            outline: "none",
            pointerEvents: "auto",
            minWidth: 80,
          }}
        />
      ) : node.data.label ? (
        <div
          onDoubleClick={(e) => {
            e.stopPropagation();
            props.engine.select(node.id);
            props.callbacks.onEditStart?.(node.id);
          }}
          style={{
            position: "absolute",
            top: -20,
            left: 4,
            fontSize: 12,
            color: node.data.borderColor || "#999",
            fontWeight: 500,
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "auto",
            cursor: "default",
          }}
        >
          {node.data.label}
        </div>
      ) : null}
    </div>
  );
}

export const frameNodeType: NodeTypeDefinition<FrameNodeData> = {
  type: "frame",
  component: FrameNodeRenderer,
  handlesOwnLayout: true,
  getClipboardText: (node) => {
    const data = node.data as FrameNodeData;
    return data.label || null;
  },
};
