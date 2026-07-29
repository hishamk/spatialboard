# Examples, simplest to most complex

A guided path. Each step builds on the previous one; the code for steps 3–4
lives in [`examples/`](../examples/).

## 1. Minimal board (copy-paste)

A complete single-file app — Vite + React, nothing else:

```tsx
// src/App.tsx
import { SpatialBoard, SpatialEngine, builtinNodeTypes } from "spatialboard";
import "spatialboard/style.css";
import { useMemo } from "react";

export default function App() {
  const engine = useMemo(() => {
    const e = new SpatialEngine();
    const a = e.createSticky("Hello", 120, 120);
    const b = e.createSticky("SpatialBoard", 380, 220, { color: "#BBF7D0" });
    e.createEdge(a, b, { arrowHead: "arrow" });
    return e;
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SpatialBoard engine={engine} nodeTypes={builtinNodeTypes} />
    </div>
  );
}
```

Install `spatialboard` plus the peer dependencies listed in
[getting-started.md](getting-started.md), render `<App />`, done. You have
drawing tools, shapes, rich text, frames, undo, search, and presentations.

## 2. Pocket Board: responsive + offline + persistent (`examples/simple`)

A complete ~150-line app showing the three things every real integration
needs — run it with `npm run dev:simple` from the package root:

- **Responsive**: full-viewport flex layout with safe-area insets; works on
  phones and installs to the home screen (web manifest, `display:
  standalone`).
- **Offline / PWA**: a ~60-line dependency-free service worker
  (`public/sw.js`) caches the app shell and assets cache-first — after one
  online visit the whole app works in airplane mode.
- **Persistence**: every board change is serialized to SBD (debounced) into
  `localStorage` and the camera position is saved alongside it — both are
  restored on launch, with a save-state indicator and reset.

Read `src/App.tsx` top to bottom — it is the template for a minimal
production integration.

## 3. Your first custom node

Work through [custom-nodes.md](custom-nodes.md): the counter node is ~20
lines, the status-card example adds a properties panel and lifecycle hooks.
Register with `nodeTypes={[...builtinNodeTypes, yourType]}` and create
instances with `engine.addNode(...)`.

## 4. Data-flow nodes (real code in the repo)

[`examples/dev-app/src/nodes/`](../examples/dev-app/src/nodes/) contains five
small, readable custom node types that together form a working pipeline:

| File | Node | Demonstrates |
|------|------|--------------|
| `constant.tsx` | Number source | Static `ports`, output values, a properties panel |
| `interval.tsx` | Timer source | The `"signal"` data type, self-marking dirty |
| `map-remap.tsx` | Range mapper | Pure `compute` over numeric inputs |
| `gate.tsx` | Boolean gate | Conditional pass-through |
| `logger.tsx` | Sink | Consuming `portValues` in a renderer |

Wire them: constant → map-remap → gate → logger, with interval pulsing the
gate. [data-flow.md](data-flow.md) explains the machinery underneath.

## 5. The full playground: `examples/dev-app`

The kitchen sink — every built-in node type, the data-flow nodes above,
Mermaid import, Excalidraw library import, presentations, search, themes,
localization, and debug boards. From the package root:

```bash
npm install
npm run dev
```

Explore `examples/dev-app/src/App.tsx` for how a real host wires props,
custom nodes, localization, and fonts together.

## 6. Beyond

- **Persistence**: round-trip the playground through `toSBD()` and read the
  output — it's just markdown ([../sbd-spec.md](../sbd-spec.md)).
- **Agents**: point an LLM at `getAgentStateMarkdown()` and the `create*` API
  ([agents.md](agents.md)).
- **Collaboration**: mirror engine events into your transport and apply
  remote ops (`addRemoteNode` / `applyRemoteNodeUpdate` /
  `deleteRemoteNode`); render the `Remote*Preview` components for live
  gesture awareness.
