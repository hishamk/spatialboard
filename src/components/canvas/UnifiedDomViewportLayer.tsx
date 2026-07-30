import type { ReactNode } from "react";
import type { Viewport } from "../../engine/types";
import { UNIFIED_DOM_VIEWPORT_BASE } from "./node-item-context";

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
  if (safariWebKitWorkaround) {
    return (
      <div
        style={{
          ...UNIFIED_DOM_VIEWPORT_BASE,
          transform: `translate3d(${viewport.x}px, ${viewport.y}px, 0)`,
          transformOrigin: "0 0",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
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
      }}
    >
      {children}
    </div>
  );
}
