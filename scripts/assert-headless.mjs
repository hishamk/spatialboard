// Headless-engine contract guard.
//
// Walks the ACTUAL built import graph of `dist/engine.js` (the `spatialboard/engine`
// subpath) and asserts none of the reachable chunks pull React, @blocknote/*,
// @mantine/*, or the bundled font asset. Run after `npm run build`
// (`npm run verify:headless`). Exits non-zero on any violation.

import { readFileSync, existsSync } from "node:fs";
import { dirname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const ENTRY = "engine.js";

// Forbidden import specifiers (as they appear in emitted ESM) + the font asset.
const FORBIDDEN = [
  /from\s*"react"/,
  /from\s*"react-dom"/,
  /from\s*"react\/jsx-runtime"/,
  /from\s*"@blocknote\//,
  /from\s*"@mantine\//,
  /Excalifont-Regular/,
  /\.woff2/,
];

// Collect every relative import/export specifier a chunk references.
function specifiers(code) {
  const out = [];
  const re = /(?:from|import)\s*"(\.[^"]+)"/g;
  let m;
  while ((m = re.exec(code)) !== null) out.push(m[1]);
  return out;
}

const visited = new Set();
const violations = [];
const stack = [ENTRY];

while (stack.length) {
  const rel = stack.pop();
  const abs = normalize(join(dist, rel));
  if (visited.has(abs)) continue;
  visited.add(abs);
  if (!existsSync(abs)) {
    violations.push(`${rel}: MISSING (dangling import) — did you build first?`);
    continue;
  }
  const code = readFileSync(abs, "utf8");
  for (const pat of FORBIDDEN) {
    if (pat.test(code)) violations.push(`${relative(dist, abs)}: matches forbidden ${pat}`);
  }
  for (const spec of specifiers(code)) {
    stack.push(normalize(join(dirname(rel), spec)));
  }
}

const reached = [...visited].map((p) => relative(dist, p)).sort();
console.log(`spatialboard/engine graph (${reached.length} files):`);
for (const r of reached) console.log("  ", r);

if (violations.length) {
  console.error("\n✗ headless contract VIOLATED:");
  for (const v of violations) console.error("  ", v);
  process.exit(1);
}
console.log("\n✓ headless: no react / @blocknote / @mantine / *.woff2 in the engine graph");
