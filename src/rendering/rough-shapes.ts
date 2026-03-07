import rough from "roughjs";

const generator = rough.generator();

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export interface RoughPathData {
  d: string;
  stroke: string;
  strokeWidth: number;
  fill: string | undefined;
  strokeDasharray?: string;
}

export interface RoughShapeOptions {
  stroke: string;
  fill?: string;
  fillStyle?: string;
  roughness: number;
  strokeWidth: number;
  strokeLineDash?: number[];
  seed?: string;
}

function toRoughOpts(options: RoughShapeOptions) {
  return {
    stroke: options.stroke,
    fill: options.fill || "none",
    fillStyle: options.fill ? (options.fillStyle || "hachure") : undefined,
    roughness: options.roughness,
    strokeWidth: options.strokeWidth,
    strokeLineDash: options.strokeLineDash,
    seed: options.seed ? hashCode(options.seed) : undefined,
    fillWeight: options.strokeWidth / 2,
    hachureGap: Math.max(options.strokeWidth * 4, 4),
  };
}

function toPaths(drawable: ReturnType<typeof generator.rectangle>): RoughPathData[] {
  const o = drawable.options;
  const dash = o?.strokeLineDash?.length ? o.strokeLineDash.join(" ") : undefined;
  return generator.toPaths(drawable).map((p) => ({
    d: p.d,
    stroke: p.stroke,
    strokeWidth: p.strokeWidth,
    fill: p.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: p.stroke !== "none" && p.strokeWidth > 0 ? dash : undefined,
  }));
}

/** Compute the border radius for a rounded rect, as a fraction of the shorter side. */
export function roundedRectRadius(w: number, h: number): number {
  return Math.min(w, h) * 0.25;
}

/** Build an SVG path string for a rounded rectangle. */
function roundedRectPath(x: number, y: number, w: number, h: number, r: number): string {
  const cr = Math.min(r, w / 2, h / 2);
  return [
    `M${x + cr},${y}`,
    `L${x + w - cr},${y}`,
    `A${cr},${cr} 0 0 1 ${x + w},${y + cr}`,
    `L${x + w},${y + h - cr}`,
    `A${cr},${cr} 0 0 1 ${x + w - cr},${y + h}`,
    `L${x + cr},${y + h}`,
    `A${cr},${cr} 0 0 1 ${x},${y + h - cr}`,
    `L${x},${y + cr}`,
    `A${cr},${cr} 0 0 1 ${x + cr},${y}`,
    "Z",
  ].join(" ");
}

export function getRoughRectPaths(
  x: number,
  y: number,
  w: number,
  h: number,
  options: RoughShapeOptions,
  rounded?: boolean
): RoughPathData[] {
  if (rounded) {
    const r = roundedRectRadius(w, h);
    return toPaths(generator.path(roundedRectPath(x, y, w, h, r), toRoughOpts(options)));
  }
  return toPaths(generator.rectangle(x, y, w, h, toRoughOpts(options)));
}

export function getRoughEllipsePaths(
  cx: number,
  cy: number,
  w: number,
  h: number,
  options: RoughShapeOptions
): RoughPathData[] {
  return toPaths(generator.ellipse(cx, cy, w, h, toRoughOpts(options)));
}

/** Build an SVG path string for a rounded diamond using quadratic bezier curves at vertices. */
function roundedDiamondPath(x: number, y: number, w: number, h: number, r: number): string {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const T: [number, number] = [cx, y];
  const R: [number, number] = [x + w, cy];
  const B: [number, number] = [cx, y + h];
  const L: [number, number] = [x, cy];

  const edgeLen = Math.hypot(w / 2, h / 2);
  const t = Math.min(r, edgeLen / 2) / edgeLen;

  const lerp = (a: [number, number], b: [number, number], f: number): [number, number] => [
    a[0] + f * (b[0] - a[0]),
    a[1] + f * (b[1] - a[1]),
  ];

  const T_in = lerp(L, T, 1 - t);
  const T_out = lerp(T, R, t);
  const R_in = lerp(T, R, 1 - t);
  const R_out = lerp(R, B, t);
  const B_in = lerp(R, B, 1 - t);
  const B_out = lerp(B, L, t);
  const L_in = lerp(B, L, 1 - t);
  const L_out = lerp(L, T, t);

  return [
    `M${T_out[0]},${T_out[1]}`,
    `L${R_in[0]},${R_in[1]}`,
    `Q${R[0]},${R[1]} ${R_out[0]},${R_out[1]}`,
    `L${B_in[0]},${B_in[1]}`,
    `Q${B[0]},${B[1]} ${B_out[0]},${B_out[1]}`,
    `L${L_in[0]},${L_in[1]}`,
    `Q${L[0]},${L[1]} ${L_out[0]},${L_out[1]}`,
    `L${T_in[0]},${T_in[1]}`,
    `Q${T[0]},${T[1]} ${T_out[0]},${T_out[1]}`,
    "Z",
  ].join(" ");
}

export function getRoughDiamondPaths(
  x: number,
  y: number,
  w: number,
  h: number,
  options: RoughShapeOptions,
  rounded?: boolean,
): RoughPathData[] {
  if (rounded) {
    const r = roundedRectRadius(w, h);
    return toPaths(generator.path(roundedDiamondPath(x, y, w, h, r), toRoughOpts(options)));
  }
  const points: [number, number][] = [
    [x + w / 2, y],
    [x + w, y + h / 2],
    [x + w / 2, y + h],
    [x, y + h / 2],
  ];
  return toPaths(generator.polygon(points, toRoughOpts(options)));
}

export function getRoughLinePaths(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  options: RoughShapeOptions
): RoughPathData[] {
  return toPaths(generator.line(x1, y1, x2, y2, toRoughOpts(options)));
}

export function getRoughArrowPaths(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  options: RoughShapeOptions
): RoughPathData[] {
  const linePaths = getRoughLinePaths(x1, y1, x2, y2, options);

  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLength = Math.max(12, options.strokeWidth * 4);
  const headAngle = Math.PI / 6;

  const ax = x2 - headLength * Math.cos(angle - headAngle);
  const ay = y2 - headLength * Math.sin(angle - headAngle);
  const bx = x2 - headLength * Math.cos(angle + headAngle);
  const by = y2 - headLength * Math.sin(angle + headAngle);

  const head1 = getRoughLinePaths(x2, y2, ax, ay, options);
  const head2 = getRoughLinePaths(x2, y2, bx, by, options);

  return [...linePaths, ...head1, ...head2];
}

/** Get roughjs fill-only paths for an arbitrary polygon (no outline stroke) */
export function getRoughPolygonFillPaths(
  points: [number, number][],
  options: RoughShapeOptions
): RoughPathData[] {
  const opts = {
    ...toRoughOpts(options),
    stroke: "none",
  };
  return toPaths(generator.polygon(points, opts));
}

/** Roughen an arbitrary SVG path string (e.g. a computed edge path). */
export function getRoughPathPaths(
  d: string,
  options: RoughShapeOptions
): RoughPathData[] {
  return toPaths(generator.path(d, toRoughOpts(options)));
}

/** Convert strokeStyle string to roughjs strokeLineDash array */
export function strokeStyleToDash(
  style?: "solid" | "dashed" | "dotted"
): number[] | undefined {
  if (style === "dashed") return [8, 4];
  if (style === "dotted") return [2, 2];
  return undefined;
}
