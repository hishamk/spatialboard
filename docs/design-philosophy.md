# Design philosophy

The decisions below are the load-bearing ones. If you extend SpatialBoard,
work *with* them.

## The engine lives outside React

All board state — nodes, viewport, selection, groups, history, mode — lives in
one plain-TypeScript `SpatialEngine` instance. React renders it; it never owns
it. The engine is an event emitter (`engine.on("change" | "viewport" |
"selection" | …)`) and every mutation goes through an engine method.

Why: canvas interaction is high-frequency (pointermove during a drag can fire
hundreds of times per second) and tree-wide React re-renders can't keep up on
large boards. With the state outside React, components subscribe to exactly
the granularity they need — monotonic *tick* counters exposed by the engine
(`changeTick`, `overlayTick`, …) plug into `useSyncExternalStore` so overlays
re-render only when their tick moves.

The sharpest expression of this is **gesture freezing**: when a pointer
gesture starts (`gesture:start`), whole-board React syncs are suppressed and
per-node subscriptions drive rendering; `gesture:end` triggers the single
commit render. Dragging one node on a 1,000-node board re-renders one node.

Spatial queries (hit-testing, viewport culling, guide candidates) go through a
QuadTree rather than scanning the node map.

## Everything is a node type

The built-in types — content, draw, shape, edge, image, text, frame, sticky —
are registered through the **same** `NodeTypeDefinition` API that embedders
use. There is no privileged internal path: if the API isn't good enough for a
custom node, it isn't good enough for a built-in, and it gets fixed at the
definition layer. Definitions bundle rendering, hit-testing, selection
chrome, properties panels, lifecycle hooks, and (optionally) data-flow ports.

The engine itself stays type-agnostic: it stores `SpatialNode` records
(`id`, `type`, `x/y/w/h/z`, `rotation`, `locked`, `groupId`, and an opaque
`data` payload) and consults the registry only where a type's behavior
matters (hit-testing, containers, flipping, min-sizes).

## Optional layers, pay-for-what-you-use

Capabilities are layered so a plain whiteboard never pays for them:

- **Data flow** activates only for node types that declare `ports`; the
  `DataFlowEngine` is a separate object you instantiate and `connect()`.
- **Presentation** derives slides from frames at `enterPresentation()` time —
  there is no standing slide model.
- **Search, minimap, panels** are UI-level features over engine queries.
- **Collaboration** is a seam, not a stack: the engine applies remote ops and
  broadcasts local gesture awareness, and stays completely ignorant of
  transports, documents, and merge semantics. Bring your own CRDT.

## Two serializations with different contracts

- **`toJSON()` / `fromJSON()`** — the runtime snapshot. Faithful, fast,
  internal.
- **SBD** (`serializeToSBD` / `parseSBD`) — the *interchange* format: a
  markdown document with HTML-comment directives, designed to be
  hand-editable, diff-stable (integer geometry, document-order emission), and
  lossy *by design* (freehand strokes simplify, rich text round-trips through
  markdown). Parse problems degrade to warnings, never silent drops. The
  normative spec is [../sbd-spec.md](../sbd-spec.md).

The split is deliberate: one format optimizes for the machine that made it,
the other for humans, diffs, and language models.

## Agents are first-class users

The engine assumes a language model may be on the other side of the API:

- `getAgentState()` returns a *budgeted* snapshot (node cap, region/type/id
  filters) so a large board can't blow a context window;
  `getAgentStateMarkdown()` formats it for prompts.
- The `create*` methods and `activateTool()` provide one-call authoring with
  sensible defaults; `beginAgentAction()`/`endAgentAction()` batch a burst of
  operations into a single undo step (with a timeout guard for crashed
  callers).
- `getNodeTypeCatalog()` emits a JSON-safe description of every registered
  node type — ports included — suitable for tool schemas.
- SBD is the exchange currency: models read boards as markdown and write
  valid boards back.

## The host owns the chrome

SpatialBoard renders its own sidebar, panels, and overlays, but policy belongs
to the embedder: `readOnly` guards every local mutation while keeping
pan/zoom/select/search alive (and deliberately does *not* guard remote ops —
a viewer must still see live edits); theming is token-based (`theme` prop);
localization and RTL come through `localization`/`direction`; and features
like the GIF picker activate only when the host supplies an endpoint.
