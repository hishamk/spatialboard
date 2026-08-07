# SpatialBoard Architecture

A guided walk through the code — from `App()` to a rendered, interactive board — with pointers to the exact places where each piece of work happens. File references are `path` (`symbol`, line); symbols are the durable anchor, line numbers are a snapshot.

## The 30-second picture

SpatialBoard is **an engine with a React face**. All board state — nodes, viewport, selection, history — lives in `SpatialEngine`, a plain TypeScript class with no React dependency. React *mirrors* the engine through a small set of subscriptions and renders it as ONE unified z-stack — content blocks and per-edge SVG hosts interleaved by z inside the DOM layer — plus a top SVG overlay for live chrome (previews, guides, selection). Everything else — tools, panels, persistence, collab, data-flow — talks to the engine, never to React state.

```
host app ──> <SpatialBoard>  (composition root: engine + registry + providers + layout)
                  │
                  ▼
            SpatialEngine  (state machine: nodes / viewport / selection / history / events)
              ▲    │ emits "change" | "viewport" | "selection" | "gesture:*" | …
   commands   │    ▼
 (tools, UI) │  React mirror  (useEngineMirror + per-node useSyncExternalStore)
                   │
                   ▼
   DOM layer (blocks + edges, one z-stack)  +  SVG overlay (chrome)
```

## Package entries

Three build entries, declared in `package.json` (`exports`):

| Import | Source | Contents |
|---|---|---|
| `spatialboard` | `src/index.ts` | Full React board (slim: no rich-text editor) |
| `spatialboard/blocknote` | `src/blocknote.ts` | Opt-in BlockNote rich-text node type + editor UI |
| `spatialboard/engine` | `src/engine.ts` | Headless engine only — no React, no DOM rendering |

The default board registers `coreBoardNodes` (`src/nodes/index.ts:44`); hosts that want rich-text notes append the `blocknote` node type from the subpath, keeping the heavy editor out of every other bundle.

## 1. From `App()` to the board

`src/App.tsx` is the dev harness, and it shows the two ways to assemble a board:

- **Raw composition** (what `App()` does): `const engine = useMemo(() => new SpatialEngine(), [])` (`App.tsx:11`), then wire `<Sidebar engine={…}>` and `<SpatialCanvas engine={…}>` by hand and call `setupKeyboardHandler(engine)` yourself (`App.tsx:20`).
- **The product path**: render `<SpatialBoard>` (`src/components/SpatialBoard.tsx`), which does all of that assembly for you. Library consumers and the `examples/` apps use this.

### `SpatialBoard` — the composition root (`src/components/SpatialBoard.tsx`)

Reading top to bottom, the component:

1. **Owns or adopts the engine** — `externalEngine ?? new SpatialEngine()` (`SpatialBoard.tsx:237`). Passing your own engine is how a host embeds the board inside a larger system (collab drivers, external persistence).
2. **Builds the node-type registry** from the `nodeTypes` prop (`SpatialBoard.tsx:245`, defaulting to `coreBoardNodes`) and hands it to the engine for lifecycle hooks: `engine.setRegistry(registry)` (`SpatialBoard.tsx:258`).
3. **Loads initial content** via `engine.fromSBD(initialData)` (`SpatialBoard.tsx:287`).
4. **Creates the data-flow engine only if any registered type declares ports** — `new DataFlowEngine(engine, registry)` (`SpatialBoard.tsx:327`), then `dataFlow.connect()` subscribes it to engine events.
5. **Mounts the providers**: theme (`SBThemeContext`, `SpatialBoard.tsx:448`), localization, and read-only context.
6. **Installs keyboard shortcuts** scoped to the focused board: `setupKeyboardHandler(engine, boardRef.current, tools)` (`SpatialBoard.tsx:315`).
7. **Renders the layout**: `<Sidebar>` (tool rail + inspector, `SpatialBoard.tsx:483`), `<SpatialCanvas>` (the board itself, `SpatialBoard.tsx:495`), `<BottomBar>` (`SpatialBoard.tsx:524`), `<PresentationOverlay>` (`SpatialBoard.tsx:572`).

## 2. The engine (`src/engine/`)

`SpatialEngine` (`src/engine/SpatialEngine.ts:190`) is the single source of truth. Its core state is declared as fields near the top of the class: the node map, viewport, `selection: Set<string>`, mode, a `QuadTree` spatial index, `frameChildren`/`groupParent` structural indices, and a `History` instance (`src/engine/history.ts`).

**Events.** The engine is an emitter over a typed `EventMap` (`SpatialEngine.ts:121`): `"change"`, `"viewport"`, `"selection"`, `"mode"`, `"gesture:start"`/`"gesture:end"`, `"presentation"`, and friends, dispatched via `emit()` (`SpatialEngine.ts:461`). Every mutation funnels through `notifyChange()` (`SpatialEngine.ts:1383`). This event surface is the *only* contract the React layer depends on.

**Domain shards.** The class itself is a facade: state fields plus thin one-line delegators. The actual logic lives in `spatialengine_<domain>.ts` shard modules, each exporting `engine`-first functions (e.g. `zoomTo(engine, level)` in `spatialengine_camera.ts`, delegated by the class method of the same name):

| Shard | Owns |
|---|---|
| `spatialengine_nodes` | node CRUD + history-coalesced updates |
| `spatialengine_selection` | select/toggle/marquee + pointer-gesture bracketing |
| `spatialengine_groups` | grouping, nested groups, group navigation |
| `spatialengine_frames` | frame/container membership tracking |
| `spatialengine_edges` | edge lookup + reconnection on node moves |
| `spatialengine_history` | undo/redo wrappers over `History` |
| `spatialengine_camera` | pan/zoom/fit, screen↔canvas transforms |
| `spatialengine_create` | typed creators (`createShape`, `createSticky`, `createEdge`, …) |
| `spatialengine_zorder` | bring/send ordering among *overlapping* nodes |
| `spatialengine_serialization` | `toSBD`/`fromSBD`, `toJSON`/`fromJSON` |
| `spatialengine_remote` | collab apply: `addRemoteNode`/`applyRemoteNodeUpdate`/`deleteRemoteNode` |
| `spatialengine_clipboard`, `spatialengine_search`, `spatialengine_snapping`, `spatialengine_arrange`, `spatialengine_presentation`, `spatialengine_agent` | clipboard, board search, drag snapping, auto-arrange, slides mode, agent-action batching |

**Geometry.** Hit-testing lives in `src/engine/spatial-index.ts` (`hitTest`, line 86; `hitTestAll`, line 405) backed by `src/engine/QuadTree.ts`. Edge mathematics is its own module family behind the `src/engine/edge-geometry.ts` barrel: `edge-geometry_path.ts` (`computeEdgePath` — routing, kinks, rounded corners), `_port.ts` (data-flow port anchors), `_hittest.ts`, `_arrowheads.ts`, `_perimeter.ts` (anchor resolution).

**Edge anchoring is free-form.** An edge's `sourceT`/`targetT` (`engine/types.ts:133`) is `number | [number, number]`: a bare number is a parametric position along the node perimeter (clockwise from top-center), while a `[u, v]` tuple anchors at an *interior* point of the node. `engine.freeFormEdges` (`SpatialEngine.ts:222`, default `true`) selects this model; setting it `false` is the escape hatch back to fixed border-dot anchors, and it also decides whether selected nodes render connection dots as affordances.

## 3. The React mirror (`src/components/canvas/`)

`SpatialCanvas` (`src/components/canvas/SpatialCanvas.tsx`) is a thin orchestrator: it declares shared state, calls a stack of hooks from `canvas/hooks/`, assembles a context object, and returns the layer JSX. The interesting machinery is in the hooks:

**The sync spine — `useEngineMirror`** (`canvas/hooks/useEngineMirror.ts:21`). Subscribes to `"change"`/`"viewport"`/`"selection"`/`"mode"` (`useEngineMirror.ts:148`) and mirrors engine state into React. Its critical trick: while a pointer gesture is active it *refuses* to re-render the whole board — `if (engine.gestureActive) return` (`useEngineMirror.ts:69`) — and commits one batch at `gesture:end`.

**Granular per-node subscriptions — `NodeItem`** (`canvas/NodeItem.tsx`). During that frozen gesture the dragged nodes still move, because each node subscribes to the engine itself: `useSyncExternalStore(subscribe, () => engine.getNode(id))` (`NodeItem.tsx:40`). Only the nodes whose data changed re-render, at engine-event granularity, not React-tree granularity. `LiveSVGLayerHost` and `SelectionChromeOverlay` use the same pattern for overlays. This split — frozen parent + live leaves — is the board's core rendering performance model.

**Virtualization — `useVirtualizedView`** culls nodes outside the viewport before they reach either render layer.

## 4. The two render layers

Inside `SpatialCanvas`'s return:

- **`GridBackground`** (`SpatialCanvas.tsx:610`) — paper/grid, a single memoized SVG.
- **DOM layer — `UnifiedDomViewportLayer`** (`SpatialCanvas.tsx:613`) — one `transform: translate(…) scale(…)` container holding a `NodeItem` per visible node (`SpatialCanvas.tsx:621`). Each `NodeItem` renders its type's registered React `component` (sticky, image, table, YouTube, rich-text, custom nodes) from `src/components/blocks/`. Draw strokes and shapes render here too, as positioned per-node SVGs (`blocks/VectorNodeBlock.tsx`) so they participate in DOM z-ordering with content blocks. **In-progress freehand strokes also render here**: the draw gesture builds a real `DrawNode` (held in React state, outside the engine until pointer-up) and appends it to the DOM layer's node list, so the live stroke and the committed node are the same component in the same raster context — committing cannot move the ink by construction (`usePointerGestures.ts` draw branch, `domLayerNodes` in `SpatialCanvas.tsx`).
- **Edges — per-edge SVG hosts inside the DOM layer** (`SpatialCanvas.tsx:298`, the `edgeHosts` map; rendered at `:684`): every committed edge renders as its own chrome-less `SVGLayer` instance at `zIndex = edge.z`, so nodes and edges share ONE z-order — "bring the circle above the connector" is just a z move, steerable from either side (`spatialengine_zorder.ts`; edge overlap tests use the routed path bounds).
- **SVG overlay — `LiveSVGLayerHost` → `SVGLayer`** (`canvas/SVGLayer.tsx`): the full-canvas top layer for live chrome — in-progress previews (edge drags, marquee, lasso, eraser trail), snap guides, port dots, and selection boxes.
- **`SelectionChromeOverlay`** (`SpatialCanvas.tsx:781`) — selection rectangles and resize/rotate handles, live during gestures.

A node type declares its rendering route: types marked `isSVGOnly` (edges) render through the per-edge SVG hosts rather than as DOM blocks.

**Raster alignment across the layers.** The DOM layer (a CSS-transformed composited layer) and the SVG overlays (inline, subpixel-exact) are two rasterizers that must agree pixel-for-pixel wherever their content overlaps — selection frames hugging ink, grid dots under blocks, anything that migrates from a preview to a committed node. Two mechanisms keep them on the same grid: every viewport transform string is built from a translate snapped to whole CSS pixels (`canvas/viewport-quantize.ts` — engine viewport state stays fractional and exact; the snap is render-only), and `UnifiedDomViewportLayer` toggles `will-change: transform` while the viewport is moving so the compositor re-rasterizes the layer right when a pan/zoom ends rather than deferring to the next paint invalidation (which would make the whole board visibly settle at an unrelated moment, e.g. committing a stroke). Anything that must be pixel-stable across a preview→commit boundary should render in ONE context — the freehand pipeline above is the model.

## 5. Input: tools, pointers, keyboard

**One table drives every tool surface.** `src/tools.ts` defines `TOOLS` (`tools.ts:26`) — mode key, shortcut, label key, and the node type a tool creates. The toolbar (`sidebar/ToolStrip.tsx`), the BottomBar mode pills, and the keyboard handler all read it; `modeAvailable(key, registry)` (`tools.ts:49`) hides tools whose node type isn't registered (a slim board simply has no rich-text tool).

**Pointer pipeline.** `usePointerGestures` (`canvas/hooks/usePointerGestures.ts`) owns `handlePointerDown`, the dispatcher that turns a pointer event plus current mode into the right gesture: pan, marquee/lasso select, node drag (bracketed by `engine.beginNodeGesture`/`endNodeGesture`, which drive the frozen-parent model), edge creation, draw, erase. Resize/rotate/port/kink handle gestures live in `useNodeTransforms`; hover cursors are set imperatively (rAF-throttled, never via React state) in `useHoverCursor`.

**Keyboard.** `setupKeyboardHandler` (`src/interactions/keyboard-handler.ts:162`) binds shortcuts scoped to the focused board; single-key tool activation is looked up straight from the `TOOLS` table (`keyboard-handler.ts:528`).

## 6. Node types: the registry (`src/nodes/`)

A node type is **behavior + optional React UI**:

- `NodeTypeDef` (`nodes/registry.ts:57`) — headless behavior: defaults, geometry policy, lifecycle hooks, optional `ports` and `compute` for data-flow.
- `NodeTypeReactUI` (`nodes/registry.ts:214`) — the `component` rendered by `NodeItem`, plus optional inspector panel.
- `defineReactNode` (`nodes/registry.ts:226`) joins the two; `NodeTypeRegistry` (`nodes/registry.ts:345`) is the lookup the engine and canvas share.

`coreBoardNodes` (`nodes/index.ts:44`) is the default set: draw, shape, edge, image, text, frame, sticky, YouTube, and table. The table type is the largest of them — `nodes/table.tsx` for behavior, `blocks/TableBlock.tsx` for the renderer, and `sidebar/sections/TableProperties.tsx` for its inspector. A table cell is `string | { text, …style overrides }`, and every consumer (block, inspector, export, search, clipboard) reads and writes it through the accessors in `engine/table-cells.ts` so the union stays in one place. The rich-text type ships only via `spatialboard/blocknote`. Custom types are just more entries in the `nodeTypes` prop — the `examples/custom-nodes` app builds a Number → Multiply → Gauge pipeline this way.

## 7. Data flow (`src/engine/DataFlowEngine.ts`)

When any registered type has ports, `DataFlowEngine` (`DataFlowEngine.ts:18`) runs a reactive evaluation graph over the board: edges between ports are data dependencies. `connect()` (line 170) subscribes to engine changes; `markDirty()` (line 164) schedules a microtask flush; `flush()` (line 397) topologically sorts dirty nodes (`topoSort`, line 280 — cycle-aware), then `executeNode()` (line 415) runs each node's `compute` (sync or async, with stale-async cancellation via per-node generation counters). UI reads values through `useDataFlow` (`canvas/hooks/useDataFlow.ts`) and port dots/overlays in `SVGLayer`.

## 8. Persistence: SBD

The board's document format is **SBD**, produced and parsed in `src/serialization/`: `serializeToSBD` (`sbd-serializer.ts:75`) and `parseSBD` (`sbd-parser.ts:209`). The engine-level entry points are `toSBD`/`fromSBD` (`spatialengine_serialization.ts:11/26`). All four are **async** — they return promises, because rich-text nodes round-trip their bodies through a markdown codec. Undo history uses cheaper in-memory JSON snapshots (`toJSON`/`fromJSON`, same shard) — SBD is for storage and interchange.

**The codec seam.** Core serialization carries no dependency edge on `@blocknote`, so a whiteboard-only or headless consumer never pulls it. `serialization/markdown-codec.ts` declares an injectable `SbdMarkdownCodec`; the rich-text node module registers the real implementation on import (`setSbdMarkdownCodec`), and when it is absent content nodes fall back to their stored `markdown` on serialize and to empty blocks on parse. This is what keeps the slim entry slim.

## 9. Collaboration surface (`src/collab/`, `src/components/collab/`)

The engine is transport-agnostic; a host brings its own sync (CRDT, websocket, anything) and uses two seams:

- **Document changes**: apply inbound remote ops via `spatialengine_remote.ts` (`addRemoteNode`/`applyRemoteNodeUpdate`/`deleteRemoteNode`, lines 10/67/34 — each sets `engine._suppressEvents` around the mutation so `emit()` early-returns and the local echo is swallowed), and set `engine.setCollabMode(true)` (`SpatialEngine.ts:357`).
- **What collab mode actually does**: it clears the existing history stack and makes the two *coalesced* update paths (`spatialengine_nodes.ts:217` and `:249`) skip their snapshot push. It is not a blanket history kill-switch — the other `pushSnapshot` sites (add, group, z-order, paste, arrange) and `undo`/`redo` are gated only on `readOnly`, so local undo still works on those. A host that wants true shared undo semantics has to enforce them itself.
- **Presence**: serializable awareness payloads describe a peer's in-flight gesture — `src/collab/edge-creation-awareness.ts` (the only one with a serializer; the other two are type-only), `rect-drag-awareness.ts`, `eraser-awareness.ts` — and `components/collab/Remote*Preview.tsx` renders another peer's drag the way the local board would. Note the split: `RemoteEdgeCreationPreview` mirrors `SVGLayer` and expects an SVG context, while `RemoteRectDragPreview` supplies its own `<svg>` where it needs one because the sticky/note previews are DOM — hosts must not wrap it. `RemoteSelectionPreview` is a fourth component with no awareness module behind it; it takes plain `nodeIds` plus a color. All four are host-rendered into `data-sb-remote-vp-inner`, not mounted by `SpatialCanvas`.

## 10. Interop

- **Excalidraw import** (`src/excalidraw/`): `convertLibraryItem`/`convertExcalidrawElements` (`converter.ts`) map Excalidraw elements to native nodes — including resampling rounded lines through a Catmull-Rom spline so curve-based art stays smooth. `library-store.ts` installs `.excalidrawlib` files; `preview-renderer.ts` draws panel thumbnails from the converted nodes.
- **Mermaid sketch** (`src/utils/mermaid.ts`, lazy-loaded from `components/sidebar/MermaidPanel.tsx:61`): `buildMermaidSketchNodes` (line 942) dispatches on the source — `sequenceDiagram` goes to `parseMermaidSequence` (line 340) and emits participant/message/note nodes, anything else goes to `parseMermaidFlowchart` and emits shape+edge nodes, plus group background boxes for `subgraph … end`.
- **Export** (`src/export/canvas-export.ts`): `exportBoard` (line 137) writes PNG or SVG, either the whole board or a single frame (`frameId`). By default it also embeds the board's SBD source in the output — PNG `iTXt` chunks, SVG `<metadata>` — via `src/export/embedded-sbd.ts`, so an exported image round-trips back into an editable board.

## Directory map

```
src/
  index.ts           package entry — full React board (slim, no rich text)
  blocknote.ts       package entry — opt-in BlockNote node + defaultBoardNodes
  engine.ts          package entry — headless engine, no React/DOM
  engine/            SpatialEngine + spatialengine_* shards, edge-geometry_*,
                     DataFlowEngine, QuadTree, spatial-index, history, types,
                     table-cells, viewport
  components/
    SpatialBoard.tsx composition root (public <SpatialBoard>)
    canvas/          SpatialCanvas orchestrator + hooks/ (mirror, gestures,
                     transforms, virtualization…) + SVGLayer + NodeItem
    blocks/          per-node-type renderers (sticky, image, table, vector,
                     rich-text…)
    sidebar/         tool rail, floating inspector, pickers, theme context,
                     library panel + directory, controls/, sections/ (per-type
                     inspectors)
    panels/          properties, frames, font picker
    overlays/        context menu, minimap, presentation, search bar, debug/perf
    chrome/          Toolbar, MobileToolbar, BottomBar, SelectionActionBar,
                     ConsolePanel, GroupFanFab
    collab/          Remote*Preview components
    contexts/        localization, read-only
    transitions/     GL slide transitions
  nodes/             registry + coreBoardNodes presets (+ blocknote via subpath)
  collab/            awareness payload types (one serializer, in
                     edge-creation-awareness)
  serialization/     SBD parser/serializer + markdown-codec seam, stroke-utils
  interactions/      keyboard handler, resize aspect/cursors
  excalidraw/        importer, library store, preview renderer
  export/            canvas export + embedded-sbd (SBD round-trip in PNG/SVG)
  rendering/         freehand/rough/svg-safe primitives
  utils/             mermaid, klipy (GIF), image/svg import, youtube, DOM helpers
  store/             client-only prefs (canvas-prefs, personal-library)
  templates/         built-in board templates
  perf/              perf snapshot feeding the performance overlay
  styles/            index.css
  assets/            bundled handwriting fonts
  tools.ts           the TOOLS table (single source for toolbar/keyboard/gating)
  schema.ts          BlockNote schema · fonts.ts / font-constants.ts  font setup
  __tests__/         headless-engine test; per-domain __tests__/ live beside
                     engine/, serialization/, export/, excalidraw/, rendering/,
                     components/canvas/
```

**Where to start reading:** `SpatialBoard.tsx` top-to-bottom, then `useEngineMirror.ts` (the sync model in ~150 lines), then `SpatialEngine.ts`'s field declarations. Those three files are the mental model; everything else is a domain hanging off them.
