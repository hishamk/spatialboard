import { memo, useCallback } from "react";
import type { BlockNoteNode } from "../../engine/types";
import type { SpatialEngine } from "../../engine/SpatialEngine";

/** Extract text from a single block (paragraph, heading, etc.) */
function blockToText(block: { content?: Array<{ type?: string; text?: string }> }): string {
  if (!block?.content?.length) return "";
  return block.content
    .filter((c) => c.type === "text")
    .map((c) => c.text ?? "")
    .join("");
}

/** First two lines of content (first two blocks), then count of remaining for skeleton */
function getPreviewLines(
  blocks: BlockNoteNode["data"]["blocks"]
): { lines: string[]; skeletonCount: number } {
  if (!blocks?.length)
    return { lines: [], skeletonCount: 2 };
  const lines = blocks
    .slice(0, 2)
    .map(blockToText)
    .filter((s) => s.length > 0);
  const skeletonCount = Math.max(0, blocks.length - 2);
  return { lines, skeletonCount };
}

interface BlockNoteBlockPlaceholderProps {
  node: BlockNoteNode;
  isSelected: boolean;
  engine: SpatialEngine;
  interactive: boolean;
  zoom: number;
  /** Resolved height (use measuredHeights when auto) so placeholder matches BlockNoteBlock size */
  height: number;
  onZoomToNode: (nodeId: string) => void;
}

/**
 * Lightweight placeholder for content blocks when zoomed out.
 * Avoids mounting BlockNote (ProseMirror, etc.) for nodes that appear small on screen.
 * Double-click zooms to the node so the full BlockNoteBlock can be used.
 */
function BlockNoteBlockPlaceholder({
  node,
  isSelected,
  engine,
  interactive,
  zoom,
  height,
  onZoomToNode,
}: BlockNoteBlockPlaceholderProps) {
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      if (e.altKey) return;
      // Creation tools own clicks over existing nodes — with the text/note/
      // sticky tool active, a click here must reach the CANVAS and create
      // there, not select/drag this node underneath it.
      if (engine.mode !== "select") return;
      if (!engine.selection.has(node.id) && engine.selection.size > 0) {
        const { x: cx, y: cy } = engine.screenToCanvas(e.clientX, e.clientY);
        for (const selId of engine.selection) {
          const selNode = engine.getNode(selId);
          if (!selNode) continue;
          const sh = selNode.h === "auto" ? 100 : (selNode.h as number);
          if (
            cx >= selNode.x &&
            cx <= selNode.x + selNode.w &&
            cy >= selNode.y &&
            cy <= selNode.y + sh
          ) {
            return;
          }
        }
      }

      e.stopPropagation();
      e.preventDefault();

      if (e.shiftKey) {
        engine.toggleSelect(node.id);
      } else if (!engine.selection.has(node.id)) {
        engine.select(node.id);
      }

      const startX = e.clientX;
      const startY = e.clientY;
      const draggedIds = Array.from(engine.selection);
      const origPositions = draggedIds.map((id) => {
        const n = engine.getNode(id)!;
        return { id, x: n.x, y: n.y };
      });
      let didMove = false;
      let rafId: number | null = null;
      let lastClientX = startX;
      let lastClientY = startY;
      let lastModKey = false;

      const applyMove = () => {
        rafId = null;
        const dx = (lastClientX - startX) / engine.viewport.zoom;
        const dy = (lastClientY - startY) / engine.viewport.zoom;
        const shouldSnap = engine.snapToGrid && !lastModKey;
        const updates =
          shouldSnap
            ? (() => {
                const snapped = engine.snap(
                  origPositions[0].x + dx,
                  origPositions[0].y + dy
                );
                const snapDx = snapped.x - origPositions[0].x;
                const snapDy = snapped.y - origPositions[0].y;
                return origPositions.map((orig) => ({
                  id: orig.id,
                  patch: { x: orig.x + snapDx, y: orig.y + snapDy },
                }));
              })()
            : origPositions.map((orig) => ({
                id: orig.id,
                patch: { x: orig.x + dx, y: orig.y + dy },
              }));
        engine.updateMany(updates);
      };

      const onMove = (me: PointerEvent) => {
        const dx = (me.clientX - startX) / engine.viewport.zoom;
        const dy = (me.clientY - startY) / engine.viewport.zoom;
        if (!didMove) {
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            didMove = true;
            engine.pushHistorySnapshot();
            engine.beginNodeGesture(draggedIds);
          } else {
            return;
          }
        }
        lastClientX = me.clientX;
        lastClientY = me.clientY;
        lastModKey = me.metaKey || me.ctrlKey;
        if (rafId === null) {
          rafId = requestAnimationFrame(applyMove);
        }
      };
      const onUp = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          applyMove();
        }
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
        engine.endNodeGesture();
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [engine, node.id]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      engine.select(node.id);
      onZoomToNode(node.id);
    },
    [engine, node.id, onZoomToNode]
  );

  const showBorder = isSelected;
  const { lines, skeletonCount } = getPreviewLines(node.data.blocks);
  const remainingHeight = height - 28 - (lines.length * 18) - 8;
  const skeletonLineCount = Math.min(
    Math.max(skeletonCount, 1, Math.floor(remainingHeight / 14)),
    6
  );

  return (
    <div
      onPointerDown={handlePointerDown}
      onDoubleClick={handleDoubleClick}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        height,
        minHeight: 60,
        zIndex: node.z,
        border: showBorder ? `2px solid #3b82f6` : "1px solid #e2e8f0",
        borderRadius: 8,
        background: "white",
        boxShadow: isSelected ? "none" : "0 1px 2px rgba(0,0,0,0.06)",
        overflow: "hidden",
        pointerEvents: interactive ? "auto" : "none",
        cursor: "move",
        display: "flex",
        flexDirection: "column",
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
      }}
    >
      {/* Drag bar skeleton */}
      <div
        style={{
          height: 20,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            width: 32,
            height: 4,
            borderRadius: 2,
            background: "#e2e8f0",
          }}
        />
      </div>
      {/* First two lines of real content, then skeleton */}
      <div
        style={{
          flex: 1,
          padding: "8px 8px 0",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {lines.map((text, i) => (
          <div
            key={i}
            style={{
              fontSize: 11,
              lineHeight: 1.4,
              color: "#334155",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text.slice(0, 60)}{text.length > 60 ? "…" : ""}
          </div>
        ))}
        {Array.from({ length: skeletonLineCount }).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            style={{
              height: 8,
              borderRadius: 4,
              background: "#e2e8f0",
              width: `${Math.max(40, 100 - (lines.length + i) * 12)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(BlockNoteBlockPlaceholder);
