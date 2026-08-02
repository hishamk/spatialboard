/**
 * Deep clone for JSON-shaped node payloads that copies CONTAINERS but shares
 * PRIMITIVES. JS strings are immutable, so returning them as-is is always
 * safe — and it is the whole point: serializing clones
 * (`structuredClone` / `JSON.parse(JSON.stringify(...))`) materialize a fresh
 * copy of every string, which for image nodes means duplicating multi-hundred-KB
 * base64 data URIs on every copy/paste/duplicate. With this clone, all copies
 * of an image node share ONE base64 string on the heap, while fresh containers
 * at every level keep later mutation of the clone safe.
 *
 * Handles the value shapes that occur in `SpatialNode` (plain objects, arrays,
 * primitives) — node data is JSON-shaped by contract (it round-trips through
 * SBD serialization).
 */
export function deepCloneNode<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) {
    return value.map((item) => deepCloneNode(item)) as unknown as T;
  }
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(value as Record<string, unknown>)) {
    out[key] = deepCloneNode((value as Record<string, unknown>)[key]);
  }
  return out as T;
}
