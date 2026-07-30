// Guards against markup injection when node data is interpolated into SVG
// STRINGS that are later mounted via dangerouslySetInnerHTML (library
// thumbnails, src/excalidraw/preview-renderer.ts) or written to an exported
// `.svg` file (src/export/canvas-export.ts).
//
// Node data can originate from UNTRUSTED sources — imported `.excalidrawlib`
// files, loaded SBD documents, restored localStorage, collaboration peers — so
// a crafted color like `#000"><script>…</script>` must never reach the markup
// verbatim. Live in-app rendering goes through React, which escapes these
// automatically; these helpers exist only for the raw-string sinks.
//
// Valid colors pass through unchanged; anything else falls back to a safe
// value. None of the allowlist patterns contain `"`, `<`, `>`, or `&`, so a
// match can never break out of a double-quoted attribute.

const HEX = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const FUNC = /^(?:rgb|rgba|hsl|hsla)\(\s*[-0-9.,%\s/]+\)$/i;
const NAMED = /^[a-zA-Z]{1,32}$/; // CSS named colors + none/transparent/currentColor

/** Return `value` if it is a syntactically valid CSS color, else `fallback`. */
export function safeColor(value: unknown, fallback = "none"): string {
  if (typeof value !== "string") return fallback;
  const v = value.trim();
  if (HEX.test(v) || FUNC.test(v) || NAMED.test(v)) return v;
  return fallback;
}

/** Coerce a possibly-untrusted numeric attribute to a finite number. */
export function safeNum(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : parseFloat(String(value));
  return Number.isFinite(n) ? n : fallback;
}
