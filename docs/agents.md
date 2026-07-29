# Agents & LLMs

SpatialBoard treats a language model as a first-class user of the board. Three
capabilities make that practical: budgeted state observation, a one-call
authoring API, and a markdown interchange format models can read *and* write.

## Reading the board

```ts
// Structured snapshot — safe for tool results
const state = engine.getAgentState({
  limit: 100,            // node cap (default 200; 0 disables)
  types: ["sticky", "shape"],
  region: { x: 0, y: 0, w: 2000, h: 1500 },
  // nodeIds: [...]      // or an explicit subset
});
// → { mode, viewport, selection, activeTool, nodeCount, returnedCount,
//     truncated, canUndo, canRedo, nodes: [{ id, type, x, y, w, h, text, label, color, … }] }

// Prompt-ready markdown summary (same options)
const md = engine.getAgentStateMarkdown({ limit: 100 });
```

The snapshot is *budgeted by design*: a 5,000-node board can't blow a context
window. `truncated` tells the model to narrow with `region` / `types` /
`limit` and look again. Per-node text is clipped (content markdown to 200
chars) — for full bodies, export SBD.

## Drawing on the board

Every creation call takes coordinates + options and returns the new node id:

```ts
engine.activateTool({ mode: "select", color: "#1e1e2e" });

const frame = engine.createFrame(80, 80, 520, 380, { label: "Plan" });
const s1 = engine.createSticky("Interview users", 120, 140);
const s2 = engine.createSticky("Ship prototype", 120, 320, { color: "#BBF7D0" });
engine.createEdge(s1, s2, { label: "then", arrowHead: "arrow" });
engine.createText("Q3 Roadmap", 120, 90, { fontSize: 24 });
engine.createShape("diamond", 420, 220, 140, 100, { label: "Go?" });
engine.createDrawStroke([[100, 500], [180, 460], [260, 500]], { color: "#e11d48" });
```

Batch a burst into **one undo step** so a human can revert an agent's whole
action at once:

```ts
engine.beginAgentAction();
try {
  // …many create/update calls…
} finally {
  engine.endAgentAction();
}
```

(`beginAgentAction` self-heals with a timeout in case a remote caller crashes
between begin and end.)

## Tool schemas / MCP

`engine.getNodeTypeCatalog()` returns a JSON-safe catalog of every registered
node type — including custom ones and their ports — suitable for generating
tool definitions so an agent knows what it's allowed to create on *this*
board.

## The SBD loop

For whole-board reading and writing, use SBD
([../sbd-spec.md](../sbd-spec.md)) — markdown with HTML-comment directives,
designed to be diff-stable and hand-editable:

```ts
const doc = await engine.toSBD();     // → give to the model
await engine.fromSBD(editedDoc);      // ← apply what it wrote back
```

A practical agent loop:

1. `getAgentStateMarkdown()` for cheap orientation.
2. `toSBD()` when the task needs full content.
3. Model edits or generates SBD (the `@defaults` directive and
   frame-relative `parent` coordinates exist precisely to make generated
   documents short and editable).
4. `fromSBD()` — malformed pieces degrade to warnings, not silent drops.

## Presentation and camera control

Agents can also direct attention: `zoomToNode(id)`, `fitToNodes(ids)`,
`animatePanTo(x, y)` (promise-based), and `enterPresentation()` /
`presentationGoTo(i)` for slide-style walkthroughs of frames.

## Read-only guardrails

`engine.setReadOnly(true)` turns every local mutating method into a no-op
while keeping observation and navigation alive — useful for "the agent may
look but not touch" modes, or for viewer roles in collaborative settings.
