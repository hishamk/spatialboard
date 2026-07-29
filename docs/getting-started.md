# Getting started

## Install

```bash
npm install spatialboard
```

SpatialBoard expects these peer dependencies in your app:

```bash
npm install react@^18 react-dom@^18 \
  @blocknote/core@^0.46 @blocknote/react@^0.46 @blocknote/mantine@^0.46 \
  @mantine/core@^8 @mantine/hooks@^8
```

## First board

```tsx
import { SpatialBoard, SpatialEngine, builtinNodeTypes } from "spatialboard";
import "spatialboard/style.css";
import { useMemo } from "react";

export default function App() {
  const engine = useMemo(() => new SpatialEngine(), []);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SpatialBoard engine={engine} nodeTypes={builtinNodeTypes} />
    </div>
  );
}
```

Create the engine once and keep it stable across renders (a `useMemo`, a ref,
or module scope). If you omit the `engine` prop, `SpatialBoard` creates an
internal one — fine for demos, but you'll usually want the reference for
everything below.

## Driving the engine

The engine is the API; the component just renders it.

```ts
// Create content programmatically
const a = engine.createSticky("Ship it", 100, 100, { color: "#FEF3C7" });
const b = engine.createShape("rect", 400, 80, 220, 120, { label: "v1.0" });
engine.createEdge(a, b, { arrowHead: "arrow" });

// Camera
engine.fitToContent();
engine.zoomToNode(b, 1.2);
await engine.animatePanTo(500, 300);

// Selection + arrangement
engine.selectMultiple([a, b]);
engine.alignSelectedNodes("top");

// Undo / redo
engine.undo();
engine.redo();
```

Subscribe to engine events when your UI needs to react:

```ts
const onChange = () => console.log("nodes changed:", engine.nodes.size);
engine.on("change", onChange);
// later: engine.off("change", onChange)
```

Events include `change`, `selection`, `viewport`, `history`, `presentation`,
`search`, granular `node:create` / `node:delete` / `node:move` / …, and
gesture lifecycle (`gesture:start` / `gesture:end`).

## Persistence

Two options, different contracts:

```ts
// SBD — markdown interchange (human/LLM-editable, diff-stable, lossy by design)
const sbd = await engine.toSBD();
await engine.fromSBD(sbd);

// JSON — runtime snapshot (faithful)
const snapshot = engine.toJSON();
engine.fromJSON(snapshot as any);
```

You can also mount a board with initial content:

```tsx
<SpatialBoard engine={engine} initialData={sbdString} />
```

See [../sbd-spec.md](../sbd-spec.md) for the format.

## Commonly used props

| Prop | What it does |
|------|--------------|
| `nodeTypes` | Node type definitions to register (start from `builtinNodeTypes`) |
| `engine` | Your `SpatialEngine` instance |
| `initialData` | SBD string loaded on mount |
| `toolbar`, `propertiesPanel`, `nodeInspector` | Toggle built-in chrome |
| `tools` | Restrict which tools the toolbar offers |
| `readOnly` | Guard all local mutations; pan/zoom/select stay alive |
| `preview` | Static, non-interactive rendering |
| `theme` | Partial `SpatialBoardTheme` token overrides |
| `direction`, `localization` | RTL + string overrides |
| `keyboardShortcuts` | Built-in keymap (see `setupKeyboardHandler` for custom hosts) |
| `gifApiBaseUrl` | Enables the GIF picker against your endpoint |
| `dataFlowEdgeOverlay`, `showPortLabels` | Data-flow UI (see [data-flow.md](data-flow.md)) |
| `singleFrameId`, `visibleNodeIds` | Render a scoped subset of the board |

## Presentations

```ts
engine.enterPresentation();  // frames become slides
engine.presentationNext();
engine.presentationPrev();
engine.exitPresentation();
```

Frame `data` controls ordering (`slideOrder`) and per-slide `transition`
(`pan` | `none` | `fade` | `dissolve` | `zoom` | `fold` | `cube`) with
`transitionDuration`.

## Next steps

- Add your own node types: [custom-nodes.md](custom-nodes.md)
- Wire nodes together with ports: [data-flow.md](data-flow.md)
- Let an LLM read and draw on the board: [agents.md](agents.md)
- Run the full playground: [examples.md](examples.md)
