<p align="center">
  <img src="https://raw.githubusercontent.com/hishamk/spatialboard/main/docs/assets/logo.svg" alt="SpatialBoard" width="420" />
</p>

<h3 align="center">
  Build infinite canvas apps in React — whiteboards, node graphs, and slide decks.
</h3>

<p align="center">
  <strong><a href="https://spatialboard.hishamkhalifa.com">Try it ↗</a></strong>
</p>

<p align="center">
  <a href="docs/getting-started.md">Getting started</a> ·
  <a href="docs/custom-nodes.md">Custom nodes</a> ·
  <a href="docs/data-flow.md">Data flow</a> ·
  <a href="docs/agents.md">Agents &amp; LLMs</a> ·
  <a href="sbd-spec.md">SBD format</a> ·
  <a href="docs/examples.md">Examples</a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license" /></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178c6.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-18%20%7C%2019-149eca.svg" alt="React 18 and 19" />
</p>

<img src="https://raw.githubusercontent.com/hishamk/spatialboard/main/docs/assets/hero.png" alt="A SpatialBoard canvas showing a mission-control board: live analog clock nodes, telemetry data cards, a stopwatch and countdown, sticky notes, a 3D wireframe, and a flow timeline with a progress bar." />

<p align="center">
  <sub>
    The Mission Control board from the <a href="docs/examples.md">examples</a> —
    <a href="https://spatialboard.hishamkhalifa.com/dev-app/">open it live</a>
    and load it from the debug panel. The clocks, telemetry cards, timers, and
    3D wireframe are custom nodes built with the same public API as the
    built-in stickies, frames, text, and connectors.
  </sub>
</p>

SpatialBoard is a whiteboard, node-graph editor, presentation surface, and
LLM-readable board format in one MIT-licensed TypeScript library. All board
state lives in a `SpatialEngine`, with a React shell on top: you get an
infinite canvas with hand-drawn aesthetics out of the box, and a registry API
that turns that canvas into whatever your product needs — a diagramming tool,
a visual programming environment, a slide deck, or a board that AI agents can
read and write.

## Feature highlights

- **Whiteboarding, complete** — pressure-aware freehand ink, rough hand-drawn
  shapes, sticky notes, rich text, images, and frames, with snapping, smart
  alignment guides, grouping, align/distribute, infinite pan/zoom, undo
  history, and a minimap.
- **Custom nodes are the core API** — everything on the canvas is a node
  type: a React component plus a declarative definition. The built-ins use
  the same public API you do.
- **Typed data flow** — nodes declare input/output ports and a pure
  `compute` function; the reactive `DataFlowEngine` propagates values through
  the wired graph, detects cycles, and badges live values on edges.
- **Presentations built in** — frames double as slides, stepped through with
  animated transitions (pan, fade, dissolve, zoom, fold, 3D cube). One call:
  `engine.enterPresentation()`.
- **Collaboration-ready** — transport-agnostic remote ops and live gesture
  awareness; wire it to any sync layer or CRDT. Storage stays your business.
- **AI-native** — budgeted board snapshots for LLM context, a programmatic
  drawing API, and SBD: a markdown-compatible board format that models both
  read and write.
- **Headless entry** — `spatialboard/engine` imports without React or CSS, so
  the engine runs in tests, scripts, and agent tooling.
- **Interop** — imports Excalidraw `.excalidrawlib` shape libraries, and a
  built-in Mermaid importer turns flowcharts and sequence diagrams into
  editable nodes.

## Quick start

```bash
npm install spatialboard
```

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

`react` / `react-dom` (`^18 || ^19`) are the only required peer
dependencies. Three entry points let you take exactly as much as you need:

| Entry | What you get |
|-------|--------------|
| `spatialboard` | The board component, the engine, and the built-in node types |
| `spatialboard/blocknote` | Opt-in rich-text nodes (adds the BlockNote `^0.46` + Mantine `^8` peers) |
| `spatialboard/engine` | The headless engine — no React, no CSS |

[docs/getting-started.md](docs/getting-started.md) covers the engine
lifecycle, persistence, and the key props.

## What you can build

**A whiteboard.** Freehand ink (perfect-freehand), rough hand-drawn shapes
(roughjs), sticky notes, rich-text blocks (BlockNote), images, text, and
frames — everything in the feature list above, working together out of the
box.

<img src="https://raw.githubusercontent.com/hishamk/spatialboard/main/docs/assets/whiteboard.png" alt="A hand-drawn kickoff whiteboard: a rough rectangle, ellipse and diamond with hachure and cross-hatch fills wired by sketchy arrows, a dashed loop-back labelled not yet, a red circled annotation, three rotated photos, a yellow highlighter swipe under handwritten text, a pencil squiggle, and two tilted sticky notes." />

<p align="center">
  <sub>
    Rough shapes with hachure fills, sketchy edges, pen / pencil /
    highlighter ink, rotated images, and stickies — all built-in node types,
    all in the hand-drawn register.
  </sub>
</p>

**A node-based tool.** Define your own node types with typed input/output
ports and a pure `compute` function; the reactive `DataFlowEngine` propagates
values through the wired graph. This is the foundation for visual
programming, pipelines, and dashboards. See
[docs/data-flow.md](docs/data-flow.md).

<img src="https://raw.githubusercontent.com/hishamk/spatialboard/main/docs/assets/dataflow.png" alt="A one-bit half adder built from custom nodes: two toggle inputs wired into XOR and AND gates, whose outputs drive Sum and Carry displays. Input A is on, so the XOR gate shows 1 and the Sum display reads true." />

<p align="center">
  <sub>
    A one-bit half adder. Flipping a toggle propagates through the wired
    graph — the gates recompute and the Sum and Carry displays update — with
    no host code in the loop.
  </sub>
</p>

**A presentation.** Frames double as slides: order them explicitly or let
reading order decide, then step through with animated transitions. One method
call — `engine.enterPresentation()`.

<img src="https://raw.githubusercontent.com/hishamk/spatialboard/main/docs/assets/slides.png" alt="Four slide frames laid out as a grid on the canvas — a title slide, a sticky-note slide, a rough bar chart, and a closing slide — with the slides panel open on the right listing the same four as an ordered deck, each with its own transition and duration." />

<p align="center">
  <sub>
    The same four frames are both a canvas layout and an ordered deck. The
    slides panel picks the transition per slide — pan, fade, zoom, cube —
    and Present runs them.
  </sub>
</p>

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

Four runnable apps — three focused tiers plus the kitchen sink, all hosted
live at
[spatialboard.hishamkhalifa.com](https://spatialboard.hishamkhalifa.com). All
are self-contained, persist to localStorage, and work offline (PWA):

- **`examples/basic`**
  ([live](https://spatialboard.hishamkhalifa.com/basic/)) — the slim core
  board (`<SpatialBoard />`), no rich text and **zero `@blocknote` peers**.
- **`examples/rich-text`**
  ([live](https://spatialboard.hishamkhalifa.com/rich-text/)) — opt-in
  BlockNote nodes via `spatialboard/blocknote`.
- **`examples/custom-nodes`**
  ([live](https://spatialboard.hishamkhalifa.com/custom-nodes/)) — three
  custom node types wired as a live data-flow graph
  (Number × Number → Multiply → Gauge).
- **`examples/dev-app`**
  ([live](https://spatialboard.hishamkhalifa.com/dev-app/)) — the development
  playground: every feature and ~40 custom node types. Every board pictured
  above ships here — Whiteboard, Half adder, Deck, and Mission Control all
  load from the debug panel.

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

## Roadmap

Near-term directions rather than commitments — if one of these matters to
you, open an issue and it will move up:

- **MCP server** — expose a live board to agents over the Model Context
  Protocol, so LLM tooling can read, draw on, and rearrange a canvas through
  the same engine API the examples use. The SBD format and
  `getAgentStateMarkdown()` already cover the read/write loop; MCP makes it a
  standard plug.
- **Collaboration example** — a worked example wiring the engine's remote ops
  and gesture awareness to a real CRDT transport, end to end.

## Development

```bash
npm install
npm run dev        # examples/basic (or dev:rich-text / dev:custom / dev:app)
npm run typecheck
npm run test
npm run build      # dist/ (generated; not committed)
```

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). Security
reports go through [SECURITY.md](SECURITY.md).

## License

SpatialBoard is [MIT licensed](LICENSE) — development and production, no
license keys, no watermarks. Third-party components and their licenses are
inventoried in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); bundled and
runtime fonts in [FONTS.md](FONTS.md).
