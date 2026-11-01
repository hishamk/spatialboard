# Examples, simplest to most complex

A guided path from a one-liner to the full playground. The runnable apps live in
[`examples/`](../examples/) — each is a self-contained Vite + React project. All but
the collaboration example persist to `localStorage` and work offline (PWA), so you
can install them to your home screen. All six are hosted live at
[spatialboard.hishamkhalifa.com](https://spatialboard.hishamkhalifa.com), or run
one from the package root:

```bash
npm install
npm run dev             # examples/basic
npm run dev:rich-text   # examples/rich-text
npm run dev:custom      # examples/custom-nodes
npm run dev:video       # examples/video-notes
npm run dev:collab      # examples/collab
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

## 4. Video notes — [`examples/video-notes`](../examples/video-notes)

The `youtube` node ships in `coreBoardNodes`: press Y and paste a YouTube URL. The
board pins three talks and annotates them with ink, stickies and watch-order
edges, each talk in a frame so Present steps through them as slides.

## 5. Collaboration (Yjs) — [`examples/collab`](../examples/collab)

Two peers side by side, each with its own engine, `Y.Doc` and y-protocols
`Awareness`, joined by a simulated network
([live](https://spatialboard.hishamkhalifa.com/collab/)). The core of the binding:

```ts
engine.setCollabMode(true);

// Undo: only this peer's writes, with explicit step boundaries.
const undo = new Y.UndoManager(nodes, {
  trackedOrigins: new Set([localOrigin]),
  captureTimeout: Number.MAX_SAFE_INTEGER, // steps end only on stopCapturing()
  ignoreRemoteMapChanges: true, // undoing a delete restores the whole node
});

// Out: every local edit ends in `change`. One microtask later, one
// transaction writes only what differs between the board and the document
// (just the dragged nodes while a gesture is active; everything on gesture:end).
let queued = false;
const flushSoon = () => {
  if (applying || queued) return;
  queued = true;
  queueMicrotask(() => {
    queued = false;
    doc.transact(() => writeDiffs(engine, nodes), localOrigin);
    // One action, one step. The example also holds the step open through a
    // text edit or an agent action, deciding per batch at its first event.
    if (!engine.gestureActive) undo.stopCapturing();
  });
};
engine.on("change", flushSoon);
engine.on("gesture:end", flushSoon);

// In: everything not written by this binding (peers, undo, the seed).
nodes.observeDeep((events, tr) => {
  const ids = changedNodeIds(events);
  // Frame membership comes from geometry, by one rule for every write: remote
  // ops leave it alone, and a local drag only re-parents what it moved.
  // rebuildFrameChildren() when a frame changed or anything was deleted,
  // otherwise updateFrameMembership(ids).
  if (tr.origin === localOrigin) return syncFrames(ids); // already on the board
  applying = true; // the engine's own `change` handler returns while this is set
  for (const id of ids) {
    const rec = nodes.get(id)?.toJSON();
    if (rec?.type === "edge") continue; // edges wait for their endpoints, below
    if (!rec) engine.deleteRemoteNode(id);
    else if (!isValid(rec)) refuse(id); // never trust a peer's record
    else if (engine.getNode(id)) engine.applyRemoteNodeUpdate(id, replacePatch(engine.getNode(id), rec));
    else engine.addRemoteNode(rec);
  }
  // One pass over the edges: shown when both endpoints are on the board,
  // otherwise hidden and kept (never deleted) until they are.
  settleEdges();
  syncFrames(ids);
  engine.notifyChange();
  applying = false;
});

// The board's own undo buttons and shortcuts drive the manager.
const refresh = () => engine.notifyHistoryChange();
engine.setCollabUndoHandler({
  undo: () => { undo.undo(); refresh(); },
  redo: () => { undo.redo(); refresh(); },
  canUndo: () => undo.canUndo(), canRedo: () => undo.canRedo(),
});
undo.on("stack-item-added", refresh);
```

Take a peer offline, edit both boards and bring it back: the two exchange state
vectors and merge. The traffic panel shows every message as it crosses.
[`examples/collab/README.md`](../examples/collab/README.md) has the full event →
Yjs mapping, the undo step rules, record validation, the presence wiring and
the pitfalls. This example keeps nothing
between visits.

## 6. The full playground — [`examples/dev-app`](../examples/dev-app)

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
- **Collaboration**: see [section 5](#5-collaboration-yjs--examplescollab) for a
  worked Yjs host. The same pattern fits any transport: on `change`, sync what
  differs out; apply peers' changes with the remote ops (`addRemoteNode` /
  `applyRemoteNodeUpdate` / `deleteRemoteNode`), and render the `Remote*Preview`
  components for live gestures.
