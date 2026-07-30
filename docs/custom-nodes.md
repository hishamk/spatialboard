# Custom nodes

Everything on a SpatialBoard canvas is a node type, and custom types use the
exact API the built-ins use: a `NodeTypeDefinition` — a React renderer plus
declarative behavior — registered via the `nodeTypes` prop.

## The minimum viable node

```tsx
import type { NodeTypeDefinition, NodeRendererProps } from "spatialboard";

type CounterData = { count: number };

function Counter({ data, isSelected, updateData }: NodeRendererProps<CounterData>) {
  return (
    <div style={{ padding: 12, outline: isSelected ? "2px solid dodgerblue" : undefined }}>
      <button onClick={() => updateData({ count: data.count + 1 })}>
        Clicked {data.count} times
      </button>
    </div>
  );
}

export const counterNodeType: NodeTypeDefinition<CounterData> = {
  type: "counter",
  component: Counter,
};
```

```tsx
<SpatialBoard
  engine={engine}
  nodeTypes={[...builtinNodeTypes, counterNodeType]}
/>
```

Leave `handlesOwnLayout` unset and the canvas wrapper positions and sizes your
component automatically — your renderer only draws the node's *content*.

Create instances programmatically:

```ts
engine.addNode({
  id: crypto.randomUUID().slice(0, 10),
  type: "counter",
  x: 200, y: 160, w: 220, h: 80,
  z: engine.nextZ(),
  data: { count: 0 },
} as any);
```

## What your renderer receives

`NodeRendererProps<TData>`:

| Prop | Meaning |
|------|---------|
| `node` | The full `SpatialNode` record (geometry, z, rotation, …) |
| `data` | The typed `data` payload |
| `updateData(patch)` | Patch `data` **with undo history** — your main write path |
| `isSelected`, `multiSelected` | Selection state for chrome decisions |
| `editing`, `editClickPos` | Inline-edit mode (double-click) + initiating pointer |
| `interactive` | False in preview/export renders — skip handlers |
| `zoom` | Current viewport zoom (LOD decisions) |
| `engine` | The engine, for advanced interactions |
| `callbacks` | `onMeasuredHeight` (auto-height), `onResizeHandleDown`, `onEditStart/End` |
| `portValues` | Live port values when the type declares ports |

## Definition options tour

All fields besides `type` and `component` are optional:

- **Layout & rendering** — `isSVGOnly` (render in the SVG layer, like edges),
  `handlesOwnLayout` (opt out of automatic positioning; built-ins do this),
  `isContainer` (frame-like: children move with it, hit-testing prefers
  children, membership is tracked).
- **Interaction** — `resizable` / `rotatable` (default true; disable for
  fixed cards), `hitTest(node, x, y, zoom)` for non-rectangular targets,
  `getHitPadding(node)` for stroke-width tolerance,
  `getClipboardText(node)` for copy-as-text.
- **Selection chrome** — `selectionRadius` (rounded outline that hugs your
  card), `selectionInNode` (node draws its own ring, respecting z-order —
  typical with `resizable: false`).
- **Properties panel** — `propertiesPanel` receives
  `{ node, data, engine, updateData }` and renders in the sidebar when the
  node is selected. `docs: { id }` adds an in-inspector help entry, with copy
  supplied through the `localization` prop.
- **Lifecycle hooks** — `onCreate`, `onDelete`, `onMove`, `onResize` (return
  a data patch to scale internal geometry), `onRotate`, `onFlip` (return the
  flipped data), `onSelect` / `onDeselect`, `onDataChange`. Each receives the
  engine, so a hook can create edges, move siblings, etc.
- **Data flow** — `ports` (static array or `(node) => PortDefinition[]`
  resolver for per-instance port sets), `compute(inputs, data)` for reactive
  evaluation, `portAnchor` for round nodes. Covered in
  [data-flow.md](data-flow.md).

## A worked example: a "status card" with a panel and hooks

```tsx
type StatusData = { title: string; status: "todo" | "doing" | "done" };

const COLORS = { todo: "#fca5a5", doing: "#fcd34d", done: "#86efac" };

function StatusCard({ data, updateData, editing }: NodeRendererProps<StatusData>) {
  return (
    <div style={{ background: COLORS[data.status], borderRadius: 10, padding: 12, height: "100%" }}>
      {editing ? (
        <input
          autoFocus
          defaultValue={data.title}
          onBlur={(e) => updateData({ title: e.target.value })}
        />
      ) : (
        <strong>{data.title}</strong>
      )}
    </div>
  );
}

function StatusPanel({ data, updateData }: NodePropertiesPanelProps<StatusData>) {
  return (
    <select value={data.status} onChange={(e) => updateData({ status: e.target.value as StatusData["status"] })}>
      <option>todo</option><option>doing</option><option>done</option>
    </select>
  );
}

export const statusNodeType: NodeTypeDefinition<StatusData> = {
  type: "status-card",
  component: StatusCard,
  propertiesPanel: StatusPanel,
  resizable: true,
  rotatable: false,
  selectionRadius: 10,
  getClipboardText: (n) => (n.data as StatusData).title,
  onCreate: (n, engine) => {
    // e.g. auto-connect to the nearest frame, seed defaults, telemetry…
  },
};
```

## Ground rules

- **Write through `updateData` / engine methods only.** Mutating `node` or
  `data` in place bypasses history, events, and collaboration.
- **Respect `interactive`.** Export and preview renders pass
  `interactive={false}` — skip pointer handlers and hover chrome.
- **Report auto-heights.** If your content sizes itself, call
  `callbacks.onMeasuredHeight(node.id, px)` so hit-testing and fit-to-content
  stay correct with `h: "auto"`.
- **Keep `data` JSON-serializable.** It round-trips through JSON, SBD
  (`@node` directives carry `data` as a JSON body), and collaboration
  transports.

## Real examples to copy

Among the ~40 node types in the dev playground, five are minimal data-flow
templates you can lift directly: `examples/dev-app/src/nodes/` —
`constant.tsx`, `interval.tsx`, `gate.tsx`, `logger.tsx`, `map-remap.tsx`. The
graded walkthrough is in
[examples.md](examples.md).
