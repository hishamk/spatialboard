# SpatialBoard

**An embeddable spatial canvas engine for React** — whiteboard, node-graph
editor, presentation surface, and LLM-readable board format in one
TypeScript library.

SpatialBoard is built around a framework-agnostic `SpatialEngine` with a thin
React shell on top. You get an infinite canvas with hand-drawn aesthetics out
of the box, and a registry API that lets you turn that canvas into whatever
your product needs: a diagramming tool, a visual programming environment, a
slide deck, or a board that AI agents can read and write.

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

## What you can build with it

**A whiteboard.** Pressure-aware freehand ink (perfect-freehand), rough
hand-drawn shapes (roughjs), sticky notes, rich-text blocks (BlockNote),
images, text, and frames — with snapping, smart alignment guides, grouping,
multi-select arrange/align/distribute, infinite pan/zoom, undo history, and a
minimap. Excalidraw `.excalidrawlib` libraries import directly, and a built-in
Mermaid importer turns flowcharts and sequence diagrams into editable nodes.

**A node-based tool.** Define your own node types with typed input/output
ports and a pure `compute` function; the reactive `DataFlowEngine` propagates
values through the wired graph, detects cycles, and can badge live values on
edges. This is the foundation for visual programming, pipelines, and
dashboards. See [docs/data-flow.md](docs/data-flow.md).

**A presentation.** Frames double as slides: order them explicitly or let
reading order decide, then step through with animated transitions (pan, fade,
dissolve, zoom, fold, 3D cube). One method call — `engine.enterPresentation()`.

**A collaborative canvas.** The engine exposes remote-op methods
(`addRemoteNode`, `applyRemoteNodeUpdate`, `deleteRemoteNode`) and broadcasts
gesture awareness (live stroke, shape, drag, eraser, and laser previews) so
you can wire it to any transport or CRDT. Storage is deliberately not
SpatialBoard's business — serialize with `toSBD()`/`toJSON()` and persist
however you like.

**An AI-native surface.** `getAgentState()` returns a structured, budgeted
snapshot for LLM context (`getAgentStateMarkdown()` for prompts); a
programmatic creation API (`createShape`, `createSticky`, `createEdge`, …)
plus `beginAgentAction()` batching lets agents draw; and the whole board
round-trips through **SBD** — a markdown-compatible format that models can
both read and write. See [docs/agents.md](docs/agents.md) and
[sbd-spec.md](sbd-spec.md).

## Install

```bash
npm install spatialboard
```

Peer dependencies (your app provides these): `react` `^18`, `react-dom` `^18`,
`@blocknote/core` `^0.46`, `@blocknote/react` `^0.46`, `@blocknote/mantine`
`^0.46`, `@mantine/core` `^8`, `@mantine/hooks` `^8`.

## Custom nodes in one glance

Everything on the canvas is a node type — the built-ins use the same API you
do. A custom type is a React component plus a definition object:

```tsx
import type { NodeTypeDefinition, NodeRendererProps } from "spatialboard";

type CounterData = { count: number };

function Counter({ data, updateData }: NodeRendererProps<CounterData>) {
  return (
    <button onClick={() => updateData({ count: data.count + 1 })}>
      Clicked {data.count} times
    </button>
  );
}

export const counterNodeType: NodeTypeDefinition<CounterData> = {
  type: "counter",
  component: Counter,
};

// <SpatialBoard nodeTypes={[...builtinNodeTypes, counterNodeType]} />
```

Definitions can also declare container behavior, custom hit-testing, a
properties panel, lifecycle hooks (`onCreate`, `onResize`, `onFlip`, …), and
data-flow ports with a `compute` function. The full tour:
[docs/custom-nodes.md](docs/custom-nodes.md).

## The SBD format

Boards serialize to **SBD** — a markdown document with HTML-comment
directives. It is diff-stable, hand-editable, and LLM-friendly:

```markdown
<!--@meta sbd="3" background="dot-grid" -->

<!--@frame id="f1" x="100" y="100" w="400" h="300" label="Plan" -->

<!--@sticky id="s1" x="40" y="60" w="200" h="150" parent="f1" color="#FEF3C7" -->
Battery check at 06:00.

<!--@edge id="e1" from="s1" to="f1" style="dashed" -->
```

Round-trip with `await engine.toSBD()` / `await engine.fromSBD(text)`. The
lower-level functions are `serializeToSBD(nodes)` and `parseSBD(text)` (which
returns `{ nodes, meta, warnings }`). Spec in [sbd-spec.md](sbd-spec.md).

## How it compares

Excalidraw and tldraw are excellent, mature projects — if you need a pure
whiteboard with a huge ecosystem, or a polished commercial canvas SDK, use
them. SpatialBoard's niche is combining the whiteboard with typed data flow,
built-in presentations, and an agent-first API, under a plain MIT license:

| | SpatialBoard | Excalidraw | tldraw |
|---|---|---|---|
| **License** | MIT | MIT | tldraw license — production needs a license key; free hobby tier keeps the watermark, paid removes it |
| **Custom nodes** | First-class: plain React component + declarative definition (typed `data`, panels, lifecycle hooks) | Not a public extension point of the core package | First-class (`ShapeUtil` classes) |
| **Typed ports + reactive data flow** | Built in (`ports` + `compute`, cycle detection, live edge values) | — | Build your own on shapes |
| **Presentations** | Built in: frames → slides with animated transitions (incl. 3D cube/fold) | Frames + laser pointer (slides are an Excalidraw+ feature) | Build your own |
| **Rich text** | BlockNote block-editor nodes | Plain text elements | Rich-text shapes |
| **Interchange format** | SBD — markdown-compatible, diff-stable, LLM-writable — plus JSON | JSON (`.excalidraw`) | JSON (`.tldr`) |
| **Agent / LLM API** | Built in: budgeted state snapshots, markdown summaries, node-type catalog, one-call create API | Text-to-diagram in Excalidraw+ | Official agent templates / experimental AI tooling |
| **Rendering** | React DOM + SVG layers | Canvas2D | React DOM/SVG |
| **Collaboration** | Transport-agnostic primitives (remote ops + gesture awareness) — bring your own CRDT/sync | excalidraw-room; E2E rooms on excalidraw.com | tldraw sync (hosted or self-hosted) |
| **Excalidraw interop** | Imports `.excalidrawlib` libraries | Native | — |

(License and feature notes as of mid-2026 — verify against each project's
current docs before making decisions based on them.)

## Documentation

| Guide | What's inside |
|-------|---------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | The code-flow map: from `App()` to the engine to the render layers, with exact code references |
| [docs/getting-started.md](docs/getting-started.md) | Install, first board, engine lifecycle, persistence, key props |
| [docs/design-philosophy.md](docs/design-philosophy.md) | Why the engine lives outside React, the performance model, the layering |
| [docs/custom-nodes.md](docs/custom-nodes.md) | The `NodeTypeDefinition` API end to end, with a worked example |
| [docs/data-flow.md](docs/data-flow.md) | Ports, `compute`, the reactive `DataFlowEngine`, cycles, edge overlays |
| [docs/agents.md](docs/agents.md) | LLM/agent integration: state snapshots, programmatic drawing, SBD loops |
| [docs/examples.md](docs/examples.md) | Guided path through `examples/`, simplest to most complex |
| [sbd-spec.md](sbd-spec.md) | The normative SBD format specification |

## Examples

Four runnable apps — three focused tiers plus the kitchen sink. All are
self-contained, persist to localStorage, and work offline (PWA):

- **`examples/basic`** — the slim core board (`<SpatialBoard />`), no rich text and
  **zero `@blocknote` peers**.
- **`examples/rich-text`** — opt-in BlockNote nodes via `spatialboard/blocknote`.
- **`examples/custom-nodes`** — three custom node types wired as a live data-flow
  graph (Number × Number → Multiply → Gauge).
- **`examples/dev-app`** — the development playground: every feature, ~40 custom
  node types, and an MCP eval server.

From the package root:

```bash
npm install
npm run dev            # examples/basic
npm run dev:rich-text  # examples/rich-text
npm run dev:custom     # examples/custom-nodes
npm run dev:app        # examples/dev-app
```

[docs/examples.md](docs/examples.md) walks them from the one-liner up to the full
playground.

## Optional integrations

- **GIF picker** — pass `gifApiBaseUrl` and SpatialBoard renders a GIF search
  UI against your endpoint (Klipy-compatible response shape; see
  `src/utils/klipy.ts`).
- **Theming** — override sidebar/panel tokens via the `theme` prop; RTL and
  localization via `direction` and `localization`.
- **Read-only + preview modes** — `readOnly` keeps pan/zoom/select alive while
  guarding all mutations; `preview` renders a static board.

## Development

```bash
npm install
npm run dev        # examples/basic (or dev:rich-text / dev:custom / dev:app)
npm run typecheck
npm run test
npm run build      # dist/ (generated; not committed)
```

## Contributing, security, licenses

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).
Security reports: [SECURITY.md](SECURITY.md).

SpatialBoard is [MIT licensed](LICENSE). Third-party components and their
licenses are inventoried in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); bundled and runtime fonts
in [FONTS.md](FONTS.md).
