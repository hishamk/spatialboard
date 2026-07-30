import { useState, useEffect } from "react";
import type { RefObject } from "react";
import { SpatialEngine } from "../../../engine/SpatialEngine";

/**
 * Tracks the canvas container size (for viewport culling) and keeps the engine's
 * container element, size, and offset in sync. Sets up a ResizeObserver plus
 * window scroll/resize + visualViewport listeners so the container offset stays
 * accurate through page scroll / browser zoom.
 */
export function useContainerSize(
  engine: SpatialEngine,
  containerRef: RefObject<HTMLDivElement>,
) {
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Track container size for viewport culling + update container offset for coordinate conversion
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    engine.setContainer(el);
    const updateOffset = () => {
      const rect = el.getBoundingClientRect();
      engine.containerOffset = { x: rect.left, y: rect.top };
    };
    updateOffset();
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? { width: 0, height: 0 };
      setContainerSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
      engine.setContainerSize(width, height);
      updateOffset();
    });
    ro.observe(el);
    // Scroll/resize move getBoundingClientRect without always firing ResizeObserver
    // (e.g. page scroll, browser zoom). Keeps collab cursor overlay aligned with the canvas.
    const onScrollOrResize = () => updateOffset();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener("resize", onScrollOrResize);
      vv.addEventListener("scroll", onScrollOrResize);
    }
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
      if (vv) {
        vv.removeEventListener("resize", onScrollOrResize);
        vv.removeEventListener("scroll", onScrollOrResize);
      }
    };
  }, [engine]);

  return containerSize;
}
