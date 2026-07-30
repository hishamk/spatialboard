import { useEffect, useState, type JSX } from "react";
import type { SpatialNode } from "../../engine/types";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { EraserAwareness } from "../../collab/eraser-awareness";

const TRAIL_LIFETIME = 400;

function resolveH(node: SpatialNode, measuredHeights: Record<string, number>): number {
  if (node.h !== "auto") return node.h as number;
  return measuredHeights[node.id] ?? 100;
}

/**
 * Eraser trail (fading stroke) + semi-transparent overlays on marked node bboxes.
 * Re-renders on rAF so trail fades; timestamps are Date.now() ms (same as local trail / awareness).
 */
export function RemoteEraserPreview({
  eraser,
  engine,
  zoom,
}: {
  eraser: EraserAwareness;
  engine: SpatialEngine;
  zoom: number;
}): JSX.Element | null {
  const [, setTick] = useState(0);

  useEffect(() => {
    const hasTrail = eraser.trail && eraser.trail.length > 0;
    const hasMarks = eraser.markedIds && eraser.markedIds.length > 0;
    if (!hasTrail && !hasMarks) return;

    let raf = 0;
    const loop = () => {
      setTick(performance.now());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [eraser.trail, eraser.markedIds]);

  const now = Date.now();
  const trail = eraser.trail?.filter((p) => now - p[2] < TRAIL_LIFETIME) ?? [];
  const measuredHeights = engine.measuredHeights;

  const sw = 6 / zoom;
  let trailPaths: JSX.Element | null = null;
  if (trail.length > 1) {
    const d: string[] = [`M${trail[0][0]},${trail[0][1]}`];
    if (trail.length === 2) {
      d.push(`L${trail[1][0]},${trail[1][1]}`);
    } else {
      for (let i = 0; i < trail.length - 1; i++) {
        const mx = (trail[i][0] + trail[i + 1][0]) / 2;
        const my = (trail[i][1] + trail[i + 1][1]) / 2;
        d.push(`Q${trail[i][0]},${trail[i][1]},${mx},${my}`);
      }
      const last = trail[trail.length - 1];
      d.push(`L${last[0]},${last[1]}`);
    }
    const pathD = d.join(" ");
    const newestAge = (now - trail[trail.length - 1][2]) / TRAIL_LIFETIME;
    const oldestAge = (now - trail[0][2]) / TRAIL_LIFETIME;
    const headOpacity = Math.max(0, 0.85 * (1 - newestAge));
    const tailOpacity = Math.max(0, 0.85 * (1 - oldestAge));
    const avgOpacity = (headOpacity + tailOpacity) / 2;
    if (avgOpacity > 0) {
      trailPaths = (
        <>
          <path
            d={pathD}
            fill="none"
            stroke="#9ca3af"
            strokeWidth={sw * 3}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={avgOpacity * 0.35}
          />
          <path
            d={pathD}
            fill="none"
            stroke="#d1d5db"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={avgOpacity}
          />
        </>
      );
    }
  }

  const markOverlays: JSX.Element[] = [];
  for (const id of eraser.markedIds ?? []) {
    const n = engine.getNode(id);
    if (!n || n.type === "edge") continue;
    const h = resolveH(n, measuredHeights);
    if (n.w < 1 || h < 1) continue;
    const rot = n.rotation ?? 0;
    const cx = n.x + n.w / 2;
    const cy = n.y + h / 2;
    markOverlays.push(
      <g key={id} transform={rot ? `rotate(${rot}, ${cx}, ${cy})` : undefined}>
        <rect
          x={n.x}
          y={n.y}
          width={n.w}
          height={h}
          fill="rgba(0,0,0,0.2)"
          stroke="rgba(100,100,100,0.35)"
          strokeWidth={1 / zoom}
          rx={4 / zoom}
        />
      </g>,
    );
  }

  if (!trailPaths && markOverlays.length === 0) return null;

  return (
    <g>
      {trailPaths}
      {markOverlays}
    </g>
  );
}
