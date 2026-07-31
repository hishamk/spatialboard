# SpatialBoard Architecture

A guided walk through the code — from `App()` to a rendered, interactive board — with pointers to the exact places where each piece of work happens. File references are `path` (`symbol`, line); symbols are the durable anchor, line numbers are a snapshot.

## The 30-second picture

SpatialBoard is **an engine with a React face**. All board state — nodes, viewport, selection, history — lives in `SpatialEngine`, a plain TypeScript class with no React dependency. React *mirrors* the engine through a small set of subscriptions and renders it in two layers: a DOM layer for content blocks and an SVG layer for vector work (edges, draw strokes, selection chrome). Everything else — tools, panels, persistence, collab, data-flow — talks to the engine, never to React state.

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
       DOM layer (blocks)  +  SVG layer (edges, draw, chrome)
```

## Package entries

Three build entries, declared in `package.json` (`exports`):

| Import | Source | Contents |
|---|---|---|
| `spatialboard` | `src/index.ts` | Full React board (slim: no rich-text editor) |
| `spatialboard/blocknote` | `src/blocknote.ts` | Opt-in BlockNote rich-text node type + editor UI |
| `spatialboard/engine` | `src/engine.ts` | Headless engine only — no React, no DOM rendering |

The default board registers `coreBoardNodes` (`src/nodes/index.ts:42`); hosts that want rich-text notes append the `blocknote` node type from the subpath, keeping the heavy editor out of every other bundle.

## 1. From `App()` to the board

`src/App.tsx` is the dev harness, and it shows the two ways to assemble a board:

- **Raw composition** (what `App()` does): `const engine = useMemo(() => new SpatialEngine(), [])` (`App.tsx:11`), then wire `<Sidebar engine={…}>` and `<SpatialCanvas engine={…}>` by hand and call `setupKeyboardHandler(engine)` yourself (`App.tsx:20`).
- **The product path**: render `<SpatialBoard>` (`src/components/SpatialBoard.tsx`), which does all of that assembly for you. Library consumers and the `examples/` apps use this.

### `SpatialBoard` — the composition root (`src/components/SpatialBoard.tsx`)

Reading top to bottom, the component:

1. **Owns or adopts the engine** — `externalEngine ?? new SpatialEngine()` (`SpatialBoard.tsx:212`). Passing your own engine is how a host embeds the board inside a larger system (collab drivers, external persistence).
2. **Builds the node-type registry** from the `nodeTypes` prop (`SpatialBoard.tsx:217`) and hands it to the engine for lifecycle hooks: `engine.setRegistry(registry)` (`SpatialBoard.tsx:234`).
3. **Loads initial content** via `engine.fromSBD(initialData)` (`SpatialBoard.tsx:263`).
4. **Creates the data-flow engine only if any registered type declares ports** — `new DataFlowEngine(engine, registry)` (`SpatialBoard.tsx:303`), then `dataFlow.connect()` subscribes it to engine events.
5. **Mounts the providers**: theme (`SBThemeContext`, `SpatialBoard.tsx:338`), localization, and read-only context.
6. **Installs keyboard shortcuts** scoped to the focused board: `setupKeyboardHandler(engine, boardRef.current, tools)` (`SpatialBoard.tsx:291`).
7. **Renders the layout**: `<Sidebar>` (tool rail + inspector, `SpatialBoard.tsx:371`), `<SpatialCanvas>` (the board itself, `SpatialBoard.tsx:383`), `<BottomBar>` (`SpatialBoard.tsx:402`), `<PresentationOverlay>` (`SpatialBoard.tsx:423`).

## 2. The engine (`src/engine/`)

`SpatialEngine` (`src/engine/SpatialEngine.ts:184`) is the single source of truth. Its core state is declared as fields near the top of the class: the node map, viewport, `selection: Set<string>`, mode, a `QuadTree` spatial index, `frameChildren`/`groupParent` structural indices, and a `History` instance (`src/engine/history.ts`).

**Events.** The engine is an emitter over a typed `EventMap` (`SpatialEngine.ts:120`): `"change"`, `"viewport"`, `"selection"`, `"mode"`, `"gesture:start"`/`"gesture:end"`, `"presentation"`, and friends, dispatched via `emit()` (`SpatialEngine.ts:406`). Every mutation funnels through `notifyChange()` (`SpatialEngine.ts:1278`). This event surface is the *only* contract the React layer depends on.

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

**Geometry.** Hit-testing lives in `src/engine/spatial-index.ts` (`hitTest`, line 86; `hitTestAll`, line 405) backed by `src/engine/QuadTree.ts`. Edge mathematics is its own module family behind the `src/engine/edge-geometry.ts` barrel: `edge-geometry_path.ts` (`computeEdgePath` — routing, kinks, rounded corners), `_port.ts` (port anchors), `_hittest.ts`, `_arrowheads.ts`, `_perimeter.ts` (parametric perimeter positions — the `sourceT` in edge data).

## 3. The React mirror (`src/components/canvas/`)

`SpatialCanvas` (`src/components/canvas/SpatialCanvas.tsx`) is a thin orchestrator: it declares shared state, calls a stack of hooks from `canvas/hooks/`, assembles a context object, and returns the layer JSX. The interesting machinery is in the hooks:

**The sync spine — `useEngineMirror`** (`canvas/hooks/useEngineMirror.ts:21`). Subscribes to `"change"`/`"viewport"`/`"selection"`/`"mode"` (`useEngineMirror.ts:148`) and mirrors engine state into React. Its critical trick: while a pointer gesture is active it *refuses* to re-render the whole board — `if (engine.gestureActive) return` (`useEngineMirror.ts:69`) — and commits one batch at `gesture:end`.

**Granular per-node subscriptions — `NodeItem`** (`canvas/NodeItem.tsx`). During that frozen gesture the dragged nodes still move, because each node subscribes to the engine itself: `useSyncExternalStore(subscribe, () => engine.getNode(id))` (`NodeItem.tsx:40`). Only the nodes whose data changed re-render, at engine-event granularity, not React-tree granularity. `LiveSVGLayerHost` and `SelectionChromeOverlay` use the same pattern for overlays. This split — frozen parent + live leaves — is the board's core rendering performance model.

**Virtualization — `useVirtualizedView`** culls nodes outside the viewport before they reach either render layer.

## 4. The two render layers

Inside `SpatialCanvas`'s return:

- **`GridBackground`** (`SpatialCanvas.tsx:545`) — paper/grid, a single memoized SVG.
- **DOM layer — `UnifiedDomViewportLayer`** (`SpatialCanvas.tsx:548`) — one `transform: translate(…) scale(…)` container holding a `NodeItem` per visible node (`SpatialCanvas.tsx:556`). Each `NodeItem` renders its type's registered React `component` (sticky, image, YouTube, rich-text, custom nodes) from `src/components/blocks/`. Draw strokes and shapes render here too, as positioned per-node SVGs (`blocks/VectorNodeBlock.tsx`) so they participate in DOM z-ordering with content blocks.
- **SVG layer — `LiveSVGLayerHost` → `SVGLayer`** (`SpatialCanvas.tsx:614`, `canvas/SVGLayer.tsx`) — the full-canvas vector overlay: edges with arrowheads and ports, in-progress previews (edge drags, marquee, lasso, eraser trail), snap guides.
- **`SelectionChromeOverlay`** (`SpatialCanvas.tsx:667`) — selection rectangles and resize/rotate handles, live during gestures.

A node type declares which world it lives in: types marked `isSVGOnly` (edges) render exclusively in the SVG layer.

## 5. Input: tools, pointers, keyboard

**One table drives every tool surface.** `src/tools.ts` defines `TOOLS` (`tools.ts:26`) — mode key, shortcut, label key, and the node type a tool creates. The toolbar (`sidebar/ToolStrip.tsx`), the BottomBar mode pills, and the keyboard handler all read it; `modeAvailable(key, registry)` (`tools.ts:48`) hides tools whose node type isn't registered (a slim board simply has no rich-text tool).

**Pointer pipeline.** `usePointerGestures` (`canvas/hooks/usePointerGestures.ts`) owns `handlePointerDown`, the dispatcher that turns a pointer event plus current mode into the right gesture: pan, marquee/lasso select, node drag (bracketed by `engine.beginNodeGesture`/`endNodeGesture`, which drive the frozen-parent model), edge creation, draw, erase. Resize/rotate/port/kink handle gestures live in `useNodeTransforms`; hover cursors are set imperatively (rAF-throttled, never via React state) in `useHoverCursor`.

**Keyboard.** `setupKeyboardHandler` (`src/interactions/keyboard-handler.ts:152`) binds shortcuts scoped to the focused board; single-key tool activation is looked up straight from the `TOOLS` table (`keyboard-handler.ts:516`).

## 6. Node types: the registry (`src/nodes/`)

A node type is **behavior + optional React UI**:

- `NodeTypeDef` (`nodes/registry.ts:57`) — headless behavior: defaults, geometry policy, lifecycle hooks, optional `ports` and `compute` for data-flow.
- `NodeTypeReactUI` (`nodes/registry.ts:214`) — the `component` rendered by `NodeItem`, plus optional inspector panel.
- `defineReactNode` (`nodes/registry.ts:226`) joins the two; `NodeTypeRegistry` (`nodes/registry.ts:344`) is the lookup the engine and canvas share.

`coreBoardNodes` (`nodes/index.ts:42`) is the default set (text, sticky, shape, draw, image, frame, edge, YouTube…). The rich-text type ships only via `spatialboard/blocknote`. Custom types are just more entries in the `nodeTypes` prop — the `examples/custom-nodes` app builds a Number → Multiply → Gauge pipeline this way.

## 7. Data flow (`src/engine/DataFlowEngine.ts`)

When any registered type has ports, `DataFlowEngine` (`DataFlowEngine.ts:18`) runs a reactive evaluation graph over the board: edges between ports are data dependencies. `connect()` (line 170) subscribes to engine changes; `markDirty()` (line 164) schedules a microtask flush; `flush()` (line 393) topologically sorts dirty nodes (`topoSort`, line 276 — cycle-aware), then `executeNode()` (line 411) runs each node's `compute` (sync or async, with stale-async cancellation via per-node generation counters). UI reads values through `useDataFlow` (`canvas/hooks/useDataFlow.ts`) and port dots/overlays in `SVGLayer`.

## 8. Persistence: SBD

The board's document format is **SBD**, produced and parsed in `src/serialization/`: `serializeToSBD` (`sbd-serializer.ts:71`) and `parseSBD` (`sbd-parser.ts:182`). The engine-level entry points are `toSBD`/`fromSBD` (`spatialengine_serialization.ts:11/26`). Undo history uses cheaper in-memory JSON snapshots (`toJSON`/`fromJSON`, same shard) — SBD is for storage and interchange.

## 9. Collaboration surface (`src/collab/`, `src/components/collab/`)

The engine is transport-agnostic; a host brings its own sync (CRDT, websocket, anything) and uses two seams:

- **Document changes**: apply inbound remote ops via `spatialengine_remote.ts` (`addRemoteNode`/`applyRemoteNodeUpdate`/`deleteRemoteNode` — they suppress local event echo), and set `engine.setCollabMode(true)` (`SpatialEngine.ts` — disables local snapshot history, since a shared doc needs shared undo semantics).
- **Presence**: serializable awareness payloads describe a peer's in-flight gesture — `src/collab/edge-creation-awareness.ts`, `rect-drag-awareness.ts`, `eraser-awareness.ts` — and the matching `components/collab/Remote*Preview.tsx` components render another peer's drag exactly as the local SVG layer would.

## 10. Interop

- **Excalidraw import** (`src/excalidraw/`): `convertLibraryItem`/`convertExcalidrawElements` (`converter.ts`) map Excalidraw elements to native nodes — including resampling rounded lines through a Catmull-Rom spline so curve-based art stays smooth. `library-store.ts` installs `.excalidrawlib` files; `preview-renderer.ts` draws panel thumbnails from the converted nodes.
- **Mermaid sketch** (`src/utils/mermaid.ts`, lazy-loaded from `sidebar/MermaidPanel.tsx:61`): parses flowchart source into shape+edge nodes.
- **Export** (`src/export/canvas-export.ts`): PNG/SVG snapshots of the board.

## Directory map

```
src/
  engine/            SpatialEngine + spatialengine_* shards, edge-geometry_*,
                     DataFlowEngine, QuadTree, spatial-index, history, types
  components/
    SpatialBoard.tsx composition root (public <SpatialBoard>)
    canvas/          SpatialCanvas orchestrator + hooks/ (mirror, gestures,
                     transforms, virtualization…) + SVGLayer + NodeItem
    blocks/          per-node-type renderers (sticky, image, vector, rich-text…)
    sidebar/         tool rail, floating inspector, pickers, theme context
    panels/          properties/frames/font/library panels
    overlays/        context menu, minimap, presentation, debug/perf
    chrome/          Toolbar, BottomBar
    collab/          Remote*Preview components
    contexts/        localization, read-only
    transitions/     GL slide transitions
  nodes/             registry + coreBoardNodes presets (+ blocknote via subpath)
  collab/            awareness payload types + serializers
  serialization/     SBD parser/serializer
  interactions/      keyboard handler
  excalidraw/        importer, library store, preview renderer
  export/            canvas export
  rendering/         freehand/rough/svg-safe primitives
  tools.ts           the TOOLS table (single source for toolbar/keyboard/gating)
```

**Where to start reading:** `SpatialBoard.tsx` top-to-bottom, then `useEngineMirror.ts` (the sync model in ~150 lines), then `SpatialEngine.ts`'s field declarations. Those three files are the mental model; everything else is a domain hanging off them.
