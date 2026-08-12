#!/usr/bin/env bash
# Consumer smoke test: pack the library, install the tarball into a fresh
# Vite + React app, and build the README quick start against it — then run
# the headless entry under plain Node with no React installed.
#
# The examples/ apps alias `spatialboard` to ../../src for HMR, so they can
# never catch what this does: exports-map mistakes, broken type paths, a CSS
# entry that doesn't resolve, or docs that reference exports that don't
# exist. Everything here is copied from the shipped docs — if a snippet
# stops compiling, the docs (or the API) broke.
#
# Usage: bash scripts/consumer-smoke.sh   (also: npm run verify:consumer)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> packing"
TARBALL="$(npm pack --silent | tail -1)"   # runs `prepare`, which builds dist/

APP="$(mktemp -d "${TMPDIR:-/tmp}/sb-consumer.XXXXXX")"
trap 'rm -rf "$APP"; rm -f "$ROOT/$TARBALL"' EXIT

echo "==> scaffolding consumer app in $APP"
mkdir -p "$APP/src"

cat > "$APP/package.json" <<'EOF'
{ "name": "consumer-smoke", "private": true, "type": "module" }
EOF

cat > "$APP/index.html" <<'EOF'
<!DOCTYPE html>
<html><head><meta charset="UTF-8" /><title>consumer</title></head>
<body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
EOF

cat > "$APP/tsconfig.json" <<'EOF'
{
  "compilerOptions": {
    "target": "ESNext", "module": "ESNext", "moduleResolution": "bundler",
    "jsx": "react-jsx", "strict": true, "skipLibCheck": true, "types": []
  },
  "include": ["src"]
}
EOF

cat > "$APP/vite.config.ts" <<'EOF'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()] });
EOF

echo '/// <reference types="vite/client" />' > "$APP/src/vite-env.d.ts"

# README quick start, verbatim.
cat > "$APP/src/App.tsx" <<'EOF'
import { SpatialBoard, SpatialEngine } from "spatialboard";
import "spatialboard/style.css";
import { useMemo } from "react";

export default function App() {
  const engine = useMemo(() => new SpatialEngine(), []);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SpatialBoard engine={engine} />
    </div>
  );
}
EOF

cat > "$APP/src/main.tsx" <<'EOF'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
EOF

# The custom-node composition from docs/custom-nodes.md: a typed renderer
# plus the core preset spread.
cat > "$APP/src/custom.tsx" <<'EOF'
import { coreBoardNodes } from "spatialboard";
import type { NodeTypeDefinition, NodeRendererProps } from "spatialboard";

type CounterData = { count: number };

function Counter({ data, updateData }: NodeRendererProps<CounterData>) {
  return <button onClick={() => updateData({ count: data.count + 1 })}>{data.count}</button>;
}

export const counterNodeType: NodeTypeDefinition<CounterData> = {
  type: "counter",
  component: Counter,
};

export const allNodeTypes = [...coreBoardNodes, counterNodeType];
EOF

cd "$APP"
echo "==> installing tarball + peers"
npm install --no-audit --no-fund --silent "$ROOT/$TARBALL" react@^19 react-dom@^19
npm install --no-audit --no-fund --silent -D vite @vitejs/plugin-react typescript "@types/react@^19" "@types/react-dom@^19"

echo "==> typecheck"
npx tsc --noEmit

echo "==> vite build"
npx vite build --logLevel error

echo "==> headless entry under plain Node"
node --input-type=module -e "
import { SpatialEngine } from 'spatialboard/engine';
const e = new SpatialEngine();
const a = e.createSticky('Ship it', 100, 100, { color: '#FEF3C7' });
const b = e.createShape('rect', 400, 80, 220, 120, { label: 'v1.0' });
e.createEdge(a, b, { arrowHead: 'arrow' });
const sbd = await e.toSBD();
if (e.nodes.size !== 3 || !sbd.includes('Ship it')) {
  console.error('headless round-trip mismatch'); process.exit(1);
}
console.log('    nodes:', e.nodes.size, '| sbd bytes:', sbd.length);
"

echo "consumer smoke passed: tarball installs, docs snippets compile, board builds, engine runs headless"
