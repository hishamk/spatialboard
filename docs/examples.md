# Examples, simplest to most complex

A guided path from a one-liner to the full playground. The runnable apps live in
[`examples/`](../examples/) — each is a self-contained Vite + React project that
persists to `localStorage` and works offline (PWA), so you can install any of them
to your home screen. All four are hosted live at
[spatialboard.hishamkhalifa.com](https://spatialboard.hishamkhalifa.com), or run
one from the package root:

```bash
npm install
npm run dev             # examples/basic
npm run dev:rich-text   # examples/rich-text
npm run dev:custom      # examples/custom-nodes
npm run dev:app         # examples/dev-app (the kitchen sink)
```

The three tiers differ **only** in their node types — everything else (the
persistence hook, the PWA shell) is shared, copy-paste plumbing.

## 1. Basic board — [`examples/basic`](../examples/basic)

The slim core board. No `nodeTypes` prop needed:

```tsx
import { SpatialBoard, SpatialEngine } from "spatialboard";
import "spatialboard/style.css";

<SpatialBoard engine={new SpatialEngine()} />
```

The default preset is **`coreBoardNodes`**: shapes, sticky notes, text, freehand
draw, frames, edges, images, YouTube. None of them need the rich-text peers, so
this example installs **zero `@blocknote` / `@mantine` packages**. You already get
drawing tools, undo, search, and presentations.

## 2. Rich text — [`examples/rich-text`](../examples/rich-text)

Opt into BlockNote-backed rich-text nodes via the `spatialboard/blocknote` subpath:

```tsx
import { SpatialBoard, SpatialEngine } from "spatialboard";
import { defaultBoardNodes } from "spatialboard/blocknote"; // ← pulls the peers
import "spatialboard/style.css";

<SpatialBoard engine={new SpatialEngine()} nodeTypes={defaultBoardNodes} />
```

`defaultBoardNodes` is `coreBoardNodes` **+** the rich-text node. Importing from
`spatialboard/blocknote` is the only thing that pulls `@blocknote/*` + `@mantine/*`
— the main entry never does, which is why the `basic` example needs none of them.

## 3. Custom nodes + data-flow — [`examples/custom-nodes`](../examples/custom-nodes)

A node type is a plain object — a React `component`, `ports`, and a pure
`compute(inputs, data)`:

```ts
export const numberNodeType: NodeTypeDefinition<NumberData> = {
  type: "df-number",
  component: NumberRenderer,
  ports: [{ id: "out", direction: "output", dataType: "number" }],
  compute: (_inputs, data) => ({ out: data.value }),
};
```

Custom types are peers of the built-ins — spread them into `nodeTypes`. When any
node declares `ports`, `SpatialBoard` runs the **data-flow engine** automatically.
The example wires **Number × Number → Multiply → Gauge**: click −/+ on a Number and
the product and gauge update live. See [custom-nodes.md](custom-nodes.md) and
[data-flow.md](data-flow.md) for the machinery.

## 4. The full playground — [`examples/dev-app`](../examples/dev-app)

The kitchen sink: ~40 custom node types, Mermaid import, Excalidraw library import,
presentations, search, themes, localization, and debug boards.
Run it with `npm run dev:app`. Explore `examples/dev-app/src/App.tsx` for how a real
host wires props, custom nodes, localization, and fonts together.

## Beyond

- **Persistence**: round-trip a board through `toSBD()` / `fromSBD()` — it's just
  markdown-flavoured text ([../sbd-spec.md](../sbd-spec.md)). The shared
  `usePersistentBoard` hook in each example is the whole story.
- **Headless**: import from `spatialboard/engine` to run the engine + SBD + data-flow
  with no React, no CSS, no heavy peers.
- **Agents**: point an LLM at `getAgentStateMarkdown()` and the `create*` API
  ([agents.md](agents.md)).
- **Collaboration**: mirror engine events into your transport and apply remote ops
  (`addRemoteNode` / `applyRemoteNodeUpdate` / `deleteRemoteNode`); render the
  `Remote*Preview` components for live gesture awareness.
