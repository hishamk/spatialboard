# Example 3 — Custom Nodes (data-flow)

Define your own node types and wire them into a live graph.

A node type is a plain object:

```ts
export const numberNodeType: NodeTypeDefinition<NumberData> = {
  type: "df-number",
  component: NumberRenderer,                 // any React component
  ports: [{ id: "out", direction: "output", dataType: "number" }],
  compute: (_inputs, data) => ({ out: data.value }), // pure function
};
```

Custom types are **peers of the built-ins** — spread them into `nodeTypes`:

```tsx
const nodeTypes = [...coreBoardNodes, numberNodeType, multiplyNodeType, gaugeNodeType];
<SpatialBoard engine={engine} nodeTypes={nodeTypes} dataFlowEdgeOverlay="ports+compute" />
```

When any node declares `ports`, `SpatialBoard` runs the **data-flow engine**
automatically: connect an output port to an input port and values propagate.

This example seeds three node types:

| Node | Role | Ports |
|------|------|-------|
| [`Number`](src/nodes/number.tsx) | source (interactive −/+) | out |
| [`Multiply`](src/nodes/multiply.tsx) | compute `a × b` | a, b → product |
| [`Gauge`](src/nodes/gauge.tsx) | sink (bar) | in |

wired as **Width × Height → Area**. Click the −/+ on a Number node and watch the
product and gauge update live — no dependency graph wiring on your side.

No `@blocknote` here — custom nodes are just React + a `compute` function.

## Run it

```bash
# from the spatialboard repo root
npm install
npm run dev --workspace=examples/custom-nodes
```

For the exhaustive version (~40 node types, palette, exemplars, an MCP eval
server), see [`../dev-app`](../dev-app).
