import type { JSX } from "react";
import type { RectDragAwareness } from "../../collab/rect-drag-awareness";
import { getRoughRectPaths, getRoughLinePaths } from "../../rendering/rough-shapes";
import { TABLE_CELL_W, TABLE_CELL_H } from "../blocks/TableBlock";

/**
 * Remote creation preview in CANVAS SPACE — renders the same "real thing"
 * previews the creator sees locally (SpatialCanvas' textPreview overlay):
 * sticky = colored card with shadow, note = white ink-bordered card, table =
 * seeded rough grid, frame = ink rect, text = blue dashed marquee.
 *
 * Rendered directly inside the host's viewport-tracked wrapper
 * (`data-sb-remote-vp-inner`), so coordinates are raw canvas units and the
 * component supplies its own <svg> where vector output is needed — hosts must
 * NOT wrap it in an <svg> (the sticky/note previews are DOM).
 */
export function RemoteRectDragPreview({
  preview,
  zoom,
}: {
  preview: RectDragAwareness;
  zoom: number;
}): JSX.Element | null {
  const x = Math.min(preview.startX, preview.endX);
  const y = Math.min(preview.startY, preview.endY);
  const w = Math.abs(preview.endX - preview.startX);
  const h = Math.abs(preview.endY - preview.startY);
  if (w < 2 && h < 2) return null;

  const svgStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "visible",
    pointerEvents: "none",
  };

  if (preview.kind === "sticky") {
    // Mirrors StickyNoteBlock / the local drag preview (color, radius, shadow).
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: h,
          background: preview.stickyColor ?? "#FEF3C7",
          borderRadius: 2,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
          pointerEvents: "none",
        }}
      />
    );
  }

  if (preview.kind === "note") {
    // Mirrors the local note preview: white card body under the ink border.
    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: h,
          border: "1px solid #1e1e2e",
          boxSizing: "border-box",
          background: "#fff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          pointerEvents: "none",
        }}
      />
    );
  }

  if (preview.kind === "table") {
    // Same snapped rough grid as the local preview — identical seeds, so the
    // wobble matches what the creator is looking at.
    const cols = Math.max(1, Math.min(12, Math.round(w / TABLE_CELL_W)));
    const rows = Math.max(1, Math.min(50, Math.round(h / TABLE_CELL_H)));
    const tw = cols * TABLE_CELL_W;
    const th = rows * TABLE_CELL_H;
    const opts = { stroke: "#1e1e2e", strokeWidth: 1.5, roughness: preview.roughness ?? 1 };
    const paths = [...getRoughRectPaths(x, y, tw, th, { ...opts, seed: "sb-table-preview:outer" })];
    for (let c = 1; c < cols; c++) {
      paths.push(
        ...getRoughLinePaths(x + c * TABLE_CELL_W, y, x + c * TABLE_CELL_W, y + th, {
          ...opts,
          seed: `sb-table-preview:c${c}`,
        }),
      );
    }
    for (let r = 1; r < rows; r++) {
      paths.push(
        ...getRoughLinePaths(x, y + r * TABLE_CELL_H, x + tw, y + r * TABLE_CELL_H, {
          ...opts,
          seed: `sb-table-preview:r${r}`,
        }),
      );
    }
    return (
      <svg style={svgStyle}>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth}
            fill="none"
            strokeDasharray={p.strokeDasharray}
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }

  if (preview.kind === "frame") {
    return (
      <svg style={svgStyle}>
        <rect x={x} y={y} width={w} height={h} fill="none" stroke="#1e1e2e" strokeWidth={1} />
      </svg>
    );
  }

  // text — matches the local blue drag marquee
  return (
    <svg style={svgStyle}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="rgba(59,130,246,0.06)"
        stroke="#3b82f6"
        strokeWidth={1.5 / zoom}
        strokeDasharray={`${4 / zoom}`}
        rx={8 / zoom}
      />
    </svg>
  );
}
