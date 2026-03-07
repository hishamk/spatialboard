import { memo } from "react";
import type { YouTubeNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { HandlePosition } from "./SVGLayer";
import { getYouTubeEmbedUrl } from "../utils/youtube";

interface YouTubeBlockProps {
  node: YouTubeNode;
  isSelected: boolean;
  engine: SpatialEngine;
  interactive: boolean;
  zoom: number;
  editing?: boolean;
  onResizeHandleDown?: (
    nodeId: string,
    handle: HandlePosition,
    e: React.PointerEvent<HTMLElement>
  ) => void;
  onEditStart?: () => void;
  onEditEnd?: () => void;
}

function YouTubeBlock({
  node,
  isSelected,
  engine,
  interactive,
  zoom,
  editing,
  onResizeHandleDown,
  onEditStart,
}: YouTubeBlockProps) {
  const h = node.h as number;
  const { data } = node;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    if (editing) {
      e.stopPropagation(); // Let iframe handle clicks
      return;
    }
    // Normal selection/drag — handled by SpatialCanvas
  };

  const borderStr = data.borderColor
    ? `${data.borderWidth ?? 1}px ${data.borderStyle ?? "solid"} ${data.borderColor}`
    : "none";

  const handleSize = Math.max(6, 8 / zoom);
  const handles: { key: HandlePosition; x: string; y: string; cursor: string }[] = [
    { key: "nw", x: "0%", y: "0%", cursor: "nwse-resize" },
    { key: "ne", x: "100%", y: "0%", cursor: "nesw-resize" },
    { key: "se", x: "100%", y: "100%", cursor: "nwse-resize" },
    { key: "sw", x: "0%", y: "100%", cursor: "nesw-resize" },
    { key: "n", x: "50%", y: "0%", cursor: "ns-resize" },
    { key: "s", x: "50%", y: "100%", cursor: "ns-resize" },
    { key: "e", x: "100%", y: "50%", cursor: "ew-resize" },
    { key: "w", x: "0%", y: "50%", cursor: "ew-resize" },
  ];

  return (
    <div
      onPointerDown={handlePointerDown}
      onDoubleClick={
        !editing && interactive
          ? (e) => {
              e.stopPropagation();
              onEditStart?.();
            }
          : undefined
      }
      style={{
        position: "absolute",
        left: node.x + node.w / 2,
        top: node.y + h / 2,
        width: node.w,
        height: h,
        marginLeft: -node.w / 2,
        marginTop: -h / 2,
        zIndex: node.z,
        border: isSelected ? "2px dashed #3b82f6" : "none",
        borderRadius: 6,
        overflow: "visible",
        pointerEvents: interactive ? "auto" : "none",
        cursor: editing ? "default" : "move",
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
        transformOrigin: "center center",
        boxSizing: "border-box",
      }}
    >
      {/* Inner container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: 4,
          border: borderStr,
          boxSizing: "border-box",
          opacity: data.opacity ?? 1,
        }}
      >
        <iframe
          src={getYouTubeEmbedUrl(data.videoId)}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
            pointerEvents: editing ? "auto" : "none",
          }}
        />

        {/* Transparent overlay to capture clicks when not editing */}
        {!editing && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              cursor: "move",
            }}
          />
        )}
      </div>

      {/* Resize handles */}
      {isSelected &&
        interactive &&
        !editing &&
        handles.map((hdl) => (
          <div
            key={hdl.key}
            data-handle={hdl.key}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown?.(node.id, hdl.key, e);
            }}
            style={{
              position: "absolute",
              left: hdl.x,
              top: hdl.y,
              width: handleSize,
              height: handleSize,
              marginLeft: -handleSize / 2,
              marginTop: -handleSize / 2,
              background: "#fff",
              border: "1px solid #3b82f6",
              borderRadius: 2,
              cursor: hdl.cursor,
              zIndex: 1,
            }}
          />
        ))}
    </div>
  );
}

export default memo(YouTubeBlock);
