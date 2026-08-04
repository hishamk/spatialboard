/**
 * Airbrush rendering — a seeded spray of grain dots along the pointer path
 * (the classic Deluxe Paint / Brilliance spray can, in SVG).
 *
 * Determinism contract (the rough-shapes seed lesson): the whole spray is a
 * pure function of (points, strokeWidth, seed). Per-dot offsets derive from a
 * PRNG seeded by (seed, point index) — NOT from the point coordinates — so:
 *  - earlier dots never shimmer while the stroke is still being drawn
 *    (appending points leaves existing indices' patterns untouched);
 *  - the commit's re-basing of points to the node bbox changes nothing
 *    (offsets are relative to each point);
 *  - reloads render the identical spray (the seed is the node id).
 *
 * Output is ONE path: each dot is a zero-length `M x y h .01` subpath drawn
 * with round line caps, so a thousand grains cost a single DOM element.
 */
export type SprayPoint = [number, number, number]; // x, y, pressure

const DOTS_PER_POINT = 12;

function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface AirbrushRender {
  /** Single multi-subpath `d` — one `M x y h .01` per grain dot. */
  d: string;
  /** Stroke width that renders each dot at grain size (round caps). */
  dotStrokeWidth: number;
  /** Per-dot alpha — overlapping grains build density. */
  strokeOpacity: number;
  /** Spray radius (also the sensible hit-area half-width). */
  radius: number;
}

export function getAirbrushRender(
  points: SprayPoint[] | undefined | null,
  strokeWidth: number,
  seed: string,
): AirbrushRender | null {
  if (!Array.isArray(points) || points.length === 0) return null;
  const size = Math.max(1, strokeWidth);
  const radius = size * 2.2;
  const seedHash = hashString(seed);
  const parts: string[] = [];
  for (let i = 0; i < points.length; i++) {
    const [x, y, pressure] = points[i];
    const rand = mulberry32((seedHash + Math.imul(i + 1, 0x9e3779b9)) >>> 0);
    const pr = radius * (0.55 + (pressure || 0.5));
    for (let j = 0; j < DOTS_PER_POINT; j++) {
      const angle = rand() * Math.PI * 2;
      // Bias grains toward the center for the soft airbrush falloff.
      const r = pr * Math.pow(rand(), 1.4);
      const dx = Math.cos(angle) * r;
      const dy = Math.sin(angle) * r;
      parts.push(`M${(x + dx).toFixed(2)} ${(y + dy).toFixed(2)}h.01`);
    }
  }
  return {
    d: parts.join(""),
    dotStrokeWidth: Math.max(1.4, size * 0.45),
    strokeOpacity: 0.55,
    radius,
  };
}
