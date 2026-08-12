# Data flow

SpatialBoard's optional data-flow layer turns a board into a live node graph:
node types declare typed **ports**, edges become **wires**, and a reactive
`DataFlowEngine` recomputes downstream nodes when upstream values change.
Types without ports are unaffected — a plain whiteboard never pays for this.

## Declaring ports and compute

```tsx
import type { NodeTypeDefinition, NodeRendererProps } from "spatialboard";

type MathData = { op: "add" | "mul" };

export const mathNodeType: NodeTypeDefinition<MathData> = {
  type: "math",
  component: MathCard,
  resizable: false,
  ports: [
    { id: "a", label: "a", direction: "input", dataType: "number", defaultValue: 0 },
    { id: "b", label: "b", direction: "input", dataType: "number", defaultValue: 0 },
    { id: "out", label: "result", direction: "output", dataType: "number" },
  ],
  compute: (inputs, data) => ({
    out: data.op === "add"
      ? (Number(inputs.a) || 0) + (Number(inputs.b) || 0)
      : (Number(inputs.a) || 0) * (Number(inputs.b) || 0),
  }),
};
```

- `PortDefinition`: `id`, `direction` (`"input" | "output"`), `dataType`
  (`"number" | "string" | "boolean" | "object" | "any" | "signal"`), optional
  `label`, `defaultValue`, and `sideT` (0–1 vertical placement for branching
  cards whose outputs should hug labeled rows).
- `compute(inputs, data)` is a pure function from input-port values (keyed by
  port id) and the node's `data` to output-port values. It may return a
  `Promise` — async computes are awaited and their duration is tracked.
- **Dynamic ports**: `ports` may be a resolver `(node) => PortDefinition[]`
  for types whose port set depends on the instance's `data` (e.g. an N-way
  branch that grows one output per configured branch). Port consumers read
  through `resolveNodePorts(def, node)`; use `nodeTypeHasPorts(def)` to test
  participation.

Renderers receive live values via the `portValues` prop, so a card can show
its current inputs/outputs.

## Running the graph

**Inside `<SpatialBoard>` this is automatic**: when any type in `nodeTypes`
declares ports, the component creates and connects a `DataFlowEngine` for you
— declaring `ports` + `compute` is all a custom node needs. Construct one
yourself only for headless or host-driven use:

```ts
import { DataFlowEngine, NodeTypeRegistry } from "spatialboard";

const registry = new NodeTypeRegistry();
[...coreBoardNodes, mathNodeType].forEach((t) => registry.register(t));
engine.setRegistry(registry);

const flow = new DataFlowEngine(engine, registry);
const disconnect = flow.connect();   // subscribes to engine changes

flow.onChange(() => {
  console.log(flow.getOutputs(nodeId));   // { out: 42 }
});

// Reading values
flow.getPortValue(nodeId, "out");
flow.getInputs(nodeId);       // resolved from connected edges (or defaults)
flow.getAllPortValues(nodeId);
flow.getLastComputeMs(nodeId); // profiling
flow.markDirty(nodeId);        // force recompute (e.g. after external I/O)

// Teardown
disconnect();
flow.dispose();
```

Wires are ordinary edge nodes whose `data` carries `sourcePort` /
`targetPort` — create them like any edge:

```ts
engine.createEdge(constantId, mathId, { sourcePort: "out", targetPort: "a" });
```

## Cycles

The graph is evaluated as a DAG. Nodes participating in a cycle are excluded
from evaluation and reported via `flow.cycleNodeIds` (a `ReadonlySet<string>`)
so the UI can badge them; everything outside the cycle keeps computing.

## Signals

The `"signal"` data type models pulse-style triggers rather than continuous
values (see `interval.tsx` in the dev app for a source that emits on a
timer and re-marks itself dirty).

## Edge overlays

Two opt-ins surface live values on the canvas:

- Board-level: `<SpatialBoard dataFlowEdgeOverlay="ports" | "ports+compute">`
  plus `showPortLabels` for port names on the cards.
- Node-level: a **target** node's `data.showEdgeComputeOverlay: true` allows
  incoming edges to badge `a → b` port pairs (and compute values in
  `"ports+compute"` mode). Default off; a custom `edge.data.label` always
  renders regardless.

## A complete small pipeline

`examples/dev-app/src/nodes/` wires exactly this shape: **constant** (number
source) → **map-remap** (range mapping) → **gate** (boolean pass-through) →
**logger** (sink that prints inputs), with **interval** as a signal source.
Run `npm run dev` and open the data-flow demo board to see values propagate
live — then copy whichever node is closest to what you need.
