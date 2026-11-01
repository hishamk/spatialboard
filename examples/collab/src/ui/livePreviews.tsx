import {
  getStrokePath,
  getRoughArrowPaths,
  getRoughDiamondPaths,
  getRoughEllipsePaths,
  getRoughLinePaths,
  getRoughRectPaths,
  roundedRectRadius,
  strokeStyleToDash,
  type RoughPathData,
} from "spatialboard";
import type { DrawProgress, ShapeProgress } from "../collab/presence";

/*
 * Renderers for the three live gestures the library has events for but no
 * Remote*Preview component: freehand strokes, shape drags and the laser.
 * All draw in canvas units inside the viewport-tracked SVG.
 */

type StrokeStyle = "solid" | "dashed" | "dotted";

/** A peer's stroke in progress, drawn the way the board draws its own. */
export function LiveStroke({ stroke }: { stroke: DrawProgress }) {
  const pts = stroke.points;
  if (pts.length === 0) return null;
  const opacity = stroke.opacity ?? 1;
  const style = stroke.strokeStyle as StrokeStyle | undefined;
  if (style === "dashed" || style === "dotted") {
    const d: Array<string | number> = ["M", pts[0][0], pts[0][1]];
    for (let i = 1; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      d.push("Q", x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
    }
    const last = pts[pts.length - 1];
    d.push("L", last[0], last[1]);
    const dash = strokeStyleToDash(style)?.map((v) => v * Math.max(stroke.width, 1)).join(" ");
    return (
      <path
        d={d.join(" ")}
        fill="none"
        stroke={stroke.color}
        strokeWidth={stroke.width}
        strokeDasharray={dash}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
      />
    );
  }
  return <path d={getStrokePath(pts, { size: stroke.width })} fill={stroke.color} opacity={opacity} />;
}

/**
 * A peer's shape drag. The rough paths are seeded with the future node id,
 * so the preview has exactly the strokes the committed shape will have.
 */
export function LiveShape({ preview: p }: { preview: ShapeProgress }) {
  const x = Math.min(p.startX, p.endX);
  const y = Math.min(p.startY, p.endY);
  const w = Math.abs(p.endX - p.startX);
  const h = Math.abs(p.endY - p.startY);
  if (w < 2 && h < 2) return null;
  const type = p.shapeType || "rect";
  const linear = type === "line" || type === "arrow";
  const down = p.endY - p.startY > 0;
  const rounded = p.edgeStyle === "round";
  const dash = strokeStyleToDash(p.strokeStyle as StrokeStyle | undefined);
  const roughness = p.roughness ?? 1;

  if (roughness > 0) {
    const opts = {
      stroke: p.stroke,
      fill: p.fill,
      fillStyle: p.fillStyle,
      roughness,
      strokeWidth: p.strokeWidth,
      strokeLineDash: dash,
      seed: p.seed ?? "preview",
    };
    let paths: RoughPathData[] = [];
    if (type === "rect") paths = getRoughRectPaths(0, 0, w, h, opts, rounded);
    else if (type === "ellipse") paths = getRoughEllipsePaths(w / 2, h / 2, w, h, opts);
    else if (type === "diamond") paths = getRoughDiamondPaths(0, 0, w, h, opts, rounded);
    else if (type === "line") paths = getRoughLinePaths(0, down ? 0 : h, w, down ? h : 0, opts);
    else if (type === "arrow") paths = getRoughArrowPaths(0, down ? 0 : h, w, down ? h : 0, opts);
    const tx = linear ? Math.min(p.startX, p.endX) : x;
    const ty = linear ? Math.min(p.startY, p.endY) : y;
    return (
      <g transform={`translate(${tx}, ${ty})`} opacity={p.opacity ?? 1}>
        {paths.map((path, i) => (
          <path
            key={i}
            d={path.d}
            stroke={path.stroke}
            strokeWidth={path.strokeWidth}
            fill={path.fill}
            strokeDasharray={path.strokeDasharray}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </g>
    );
  }

  const common = {
    stroke: p.stroke,
    strokeWidth: p.strokeWidth,
    fill: p.fill || "none",
    strokeDasharray: dash?.join(","),
    opacity: p.opacity ?? 1,
  };
  if (type === "ellipse") return <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} {...common} />;
  if (type === "diamond") {
    return <polygon points={`${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`} {...common} />;
  }
  if (linear) return <line x1={p.startX} y1={p.startY} x2={p.endX} y2={p.endY} {...common} fill={undefined} />;
  return <rect x={x} y={y} width={w} height={h} rx={rounded ? roundedRectRadius(w, h) : 0} {...common} />;
}

/** A peer's laser pointer: a short trail in their color, fading at the tail. */
export function LaserTrail({ trail, color, zoom }: { trail: Array<[number, number]>; color: string; zoom: number }) {
  if (trail.length < 2) return null;
  const tail = trail.slice(-40);
  const segments = [];
  for (let i = 1; i < tail.length; i++) {
    const t = i / (tail.length - 1);
    segments.push(
      <line
        key={i}
        x1={tail[i - 1][0]}
        y1={tail[i - 1][1]}
        x2={tail[i][0]}
        y2={tail[i][1]}
        stroke={color}
        strokeWidth={(1.5 + 3 * t) / zoom}
        strokeLinecap="round"
        opacity={0.15 + 0.75 * t}
      />,
    );
  }
  const [hx, hy] = tail[tail.length - 1];
  return (
    <g>
      {segments}
      <circle cx={hx} cy={hy} r={5 / zoom} fill={color} opacity={0.9} />
    </g>
  );
}

/** A peer's pointer, in screen space so it stays the same size at any zoom. */
export function RemoteCursor({ x, y, color, label }: { x: number; y: number; color: string; label: string }) {
  return (
    <div className="remote-cursor" style={{ transform: `translate(${x}px, ${y}px)` }}>
      <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden="true">
        <path d="M1 1 L1 15 L5 11.5 L8 17 L10.2 16 L7.4 10.4 L12.5 10.4 Z" fill={color} stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span className="remote-cursor-label" style={{ background: color }}>
        {label}
      </span>
    </div>
  );
}
