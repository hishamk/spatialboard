import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Viewport } from "../../engine/types";
import { UNIFIED_DOM_VIEWPORT_BASE } from "./node-item-context";
import { quantizeViewportForRender } from "./viewport-quantize";

/**
 * While the viewport is moving the compositor transforms this layer's cached
 * texture on the GPU — an approximation it does NOT correct once the motion
 * stops. The stale texture then persists until the next paint invalidation
 * (typically committing a drawn stroke), so the whole board visibly "settles"
 * at that unrelated moment. Toggling `will-change: transform` off shortly
 * after the viewport stops forces the re-raster right at gesture end, where
 * the eye is already tracking motion and a sub-pixel snap is imperceptible.
 */
function useViewportMotionHint(viewport: Viewport): boolean {
  const [moving, setMoving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const first = useRef(true);
  useEffect(() => {
    // Don't treat mount as motion — the initial raster is already correct.
    if (first.current) {
      first.current = false;
      return;
    }
    setMoving(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMoving(false), 120);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [viewport.x, viewport.y, viewport.zoom]);
  return moving;
}

/**
 * WebKit-only: separate pan (`translate3d`) from `scale` so zoomed board content
 * is less likely to be composited from a low-res snapshot. Other engines use one
 * transform, matching previous behavior.
 */
export default function UnifiedDomViewportLayer({
  safariWebKitWorkaround,
  viewport,
  viewportTransform,
  children,
}: {
  safariWebKitWorkaround: boolean;
  viewport: Viewport;
  viewportTransform: string;
  children: ReactNode;
}) {
  const moving = useViewportMotionHint(viewport);
  const willChange = moving ? "transform" : undefined;

  if (safariWebKitWorkaround) {
    // Same device-pixel snap as the single-transform path (which receives an
    // already-quantized `viewportTransform` string from the parent).
    const renderVp = quantizeViewportForRender(viewport);
    return (
      <div
        style={{
          ...UNIFIED_DOM_VIEWPORT_BASE,
          transform: `translate3d(${renderVp.x}px, ${renderVp.y}px, 0)`,
          transformOrigin: "0 0",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          willChange,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${viewport.zoom})`,
            transformOrigin: "0 0",
            pointerEvents: "none",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            willChange,
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        ...UNIFIED_DOM_VIEWPORT_BASE,
        transform: viewportTransform,
        transformOrigin: "0 0",
        willChange,
      }}
    >
      {children}
    </div>
  );
}
