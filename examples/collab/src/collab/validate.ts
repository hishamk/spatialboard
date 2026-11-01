import type { EdgeType, HandleSide } from "spatialboard";

/**
 * Checks for records that arrive from peers.
 *
 * The engine guards only edge endpoints. This checks a record's shape and
 * the values this example has seen crash or freeze a renderer: a sticky
 * whose `text` is an object, an unknown edge type or handle, a fill style the
 * renderer looks up by name, a shape big enough to stall hachure filling. It
 * covers the node types this example's toolbar creates plus the seed's;
 * anything else is refused. It is not a guarantee against every hostile
 * value: a host exposed to untrusted peers should validate per type and
 * guard its rendering too.
 */

type Check = (v: unknown) => boolean;

const str: Check = (v) => typeof v === "string";
const num: Check = (v) => typeof v === "number" && Number.isFinite(v);
const opt =
  (c: Check): Check =>
  (v) =>
    v === undefined || c(v);
// A Set, never an object lookup: "constructor" or "__proto__" must not pass.
const oneOf = (...values: string[]): Check => {
  const allowed = new Set(values);
  return (v) => typeof v === "string" && allowed.has(v);
};
const point: Check = (v) => Array.isArray(v) && v.length >= 2 && v.length <= 3 && v.every(num);
const points: Check = (v) => Array.isArray(v) && v.every(point);
const cell: Check = (v) => str(v) || (!!v && typeof v === "object" && str((v as { text?: unknown }).text));
const rows: Check = (v) => Array.isArray(v) && v.every((r) => Array.isArray(r) && r.every(cell));

const EDGE_TYPES: EdgeType[] = ["straight", "bezier", "smoothstep", "step"];
const HANDLES: HandleSide[] = ["top", "right", "bottom", "left"];
const handle = oneOf(...HANDLES);

/** Keys several node types share. */
const COMMON: Record<string, Check> = {
  color: str, fill: str, stroke: str, strokeStyle: str, edgeStyle: str,
  fontFamily: str, align: str, label: str, labelFontFamily: str, labelAlign: str,
  backgroundColor: str, borderColor: str, borderStyle: str, textColor: str,
  fontSize: num, strokeWidth: num, opacity: num, roughness: num, labelFontSize: num, borderWidth: num,
  fillStyle: oneOf("hachure", "cross-hatch", "solid"),
};

/** Per node type, the `data` fields its renderer reads, and their shapes. */
const DATA: Record<string, Record<string, Check>> = {
  sticky: { text: str },
  text: { text: str },
  shape: { shape: oneOf("rect", "ellipse", "diamond", "line", "arrow"), startPoint: point, endPoint: point },
  draw: { points },
  // Endpoints are checked by the binding, against the board.
  edge: { edgeType: oneOf(...EDGE_TYPES), sourceHandle: handle, targetHandle: handle },
  frame: {},
  table: { rows },
  image: { src: str },
  youtube: { videoId: str },
};

// Positions and sizes are bounded only to keep the maths finite. A sketchy
// (hachure or cross-hatch) fill is the exception: it costs time with its
// size. A 1e5-unit filled shape draws in tens of milliseconds, a 1e6-unit
// one takes over a second, a 1e7-unit one freezes the page. So a sketchy
// filled record is capped at 1e5, which takes many resizes at the lowest
// zoom to reach.
const LIMIT = 1e7;
const SKETCH_FILL_LIMIT = 1e5;
const coord = (v: unknown) => num(v) && Math.abs(v as number) <= LIMIT;
const size = (v: unknown) => num(v) && (v as number) >= 0 && (v as number) <= LIMIT;

/**
 * Whether a peer's record can safely reach the engine and the renderer.
 * A `data` field is checked only when present (the renderers default the
 * ones a record leaves out, as they do for a node made locally). An edge's
 * `strokeWidth` is the exception: its renderer reads it with no default.
 */
export function isValidRecord(rec: Record<string, unknown>, id: string): boolean {
  const type = rec.type as string;
  if (rec.id !== id || typeof type !== "string" || !Object.hasOwn(DATA, type)) return false;
  if (!coord(rec.x) || !coord(rec.y) || !size(rec.w) || !(size(rec.h) || rec.h === "auto")) return false;
  if (!coord(rec.z) || !opt(num)(rec.rotation)) return false;
  const data = rec.data as Record<string, unknown> | undefined;
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  const checks = { ...COMMON, ...DATA[type] };
  if (!Object.entries(checks).every(([k, check]) => opt(check)(data[k]))) return false;
  if (type === "edge" && !num(data.strokeWidth)) return false;
  const sketchFill = !!data.fill && data.fillStyle !== "solid" && data.roughness !== 0;
  const h = rec.h === "auto" ? 0 : (rec.h as number);
  return !sketchFill || ((rec.w as number) <= SKETCH_FILL_LIMIT && h <= SKETCH_FILL_LIMIT);
}
