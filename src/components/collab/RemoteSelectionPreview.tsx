import { useEffect, useState, type JSX } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";

/**
 * Colored selection outlines for a REMOTE peer's selected nodes — rendered in
 * canvas space (the host applies the viewport transform, same contract as the
 * other Remote*Preview components). Subscribes to the engine so outlines track
 * node motion/resize while the peer holds the selection.
 */
export function RemoteSelectionPreview({
  engine,
  nodeIds,
  color,
  zoom,
}: {
  engine: SpatialEngine;
  nodeIds: string[];
  color: string;
  zoom: number;
}): JSX.Element | null {
  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    engine.on("change", bump);
    return () => engine.off("change", bump);
  }, [engine]);

  if (!nodeIds.length) return null;
  const sw = 1.5 / zoom;
  const pad = 2 / zoom;

  return (
    <>
      {nodeIds.map((id) => {
        const n = engine.getNode(id);
        // Edges have no meaningful bbox outline; skip them (and gone nodes).
        if (!n || n.type === "edge") return null;
        const h = engine.resolveHeight(n);
        const cx = n.x + n.w / 2;
        const cy = n.y + h / 2;
        return (
          <g
            key={id}
            transform={n.rotation ? `rotate(${n.rotation}, ${cx}, ${cy})` : undefined}
          >
            <rect
              x={n.x - pad}
              y={n.y - pad}
              width={n.w + pad * 2}
              height={h + pad * 2}
              fill="none"
              stroke={color}
              strokeWidth={sw}
              rx={4 / zoom}
              opacity={0.9}
            />
          </g>
        );
      })}
    </>
  );
}
