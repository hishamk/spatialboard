import { useRef, useEffect, useMemo } from "react";
import type { SpatialNode } from "../../engine/types";

/**
 * Wrapper for registry-rendered nodes.
 * Handles absolute positioning and auto-height measurement via ResizeObserver.
 */
export default function RegistryNodeWrapper({
  node,
  isInteractive,
  isSelected,
  selectionInNode,
  selectionRadius,
  zoom,
  measuredH,
  onMeasuredHeight,
  observeElement,
  unobserveElement,
  isContainer,
  children,
}: {
  node: SpatialNode;
  isInteractive: boolean;
  isSelected?: boolean;
  selectionInNode?: boolean;
  selectionRadius?: number;
  zoom: number;
  measuredH: number | undefined;
  onMeasuredHeight: (nodeId: string, height: number) => void;
  observeElement: (el: Element, callback: (entry: ResizeObserverEntry) => void) => void;
  unobserveElement: (el: Element) => void;
  isContainer?: boolean;
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.h !== "auto") return;
    const el = wrapRef.current;
    if (!el) return;
    // Initial measurement
    const h = el.offsetHeight;
    if (h > 0) onMeasuredHeight(node.id, h);
    // Subscribe to shared ResizeObserver
    observeElement(el, () => {
      const measured = el.offsetHeight;
      if (measured > 0) onMeasuredHeight(node.id, measured);
    });
    return () => unobserveElement(el);
  }, [node.id, node.h, onMeasuredHeight, observeElement, unobserveElement]);

  const h = node.h === "auto" ? (measuredH ?? "auto") : node.h;

  const wrapperStyle = useMemo<React.CSSProperties>(() => ({
    position: "absolute",
    left: node.x,
    top: node.y,
    width: node.w,
    height: h,
    zIndex: node.z,
    pointerEvents: isContainer ? "none" : isInteractive ? "auto" : "none",
    transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
    transformOrigin: "center center",
  }), [node.x, node.y, node.w, h, node.z, node.rotation, isContainer, isInteractive]);

  const ringRadius = Math.max(0, selectionRadius ?? 0);
  // Keep stroke roughly screen-constant inside the zoomed viewport layer.
  const ringWidth = 1.5 / zoom;

  return (
    <div
      ref={wrapRef}
      data-node-id={node.id}
      className={isInteractive ? undefined : "sb-block-inert"}
      style={wrapperStyle}
    >
      {children}
      {selectionInNode && isSelected && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: ringRadius,
            border: `${ringWidth}px dashed #3b82f6`,
            boxSizing: "border-box",
            pointerEvents: "none",
            // Above this node's content; sibling nodes still stack by their zIndex.
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
}
