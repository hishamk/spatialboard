# Example 2 — Rich-text Board

The core board **plus** an opt-in BlockNote rich-text node.

```tsx
import { SpatialBoard, SpatialEngine } from "spatialboard";
import { defaultBoardNodes } from "spatialboard/blocknote"; // ← the opt-in
import "spatialboard/style.css";

<SpatialBoard engine={new SpatialEngine()} nodeTypes={defaultBoardNodes} />
```

`defaultBoardNodes` is `coreBoardNodes` **+** the rich-text node. Importing anything
from `spatialboard/blocknote` is what pulls the `@blocknote/*` + `@mantine/*` peers —
the main `spatialboard` entry never does. So this example lists those peers in its
`package.json`, and [`../basic`](../basic) doesn't.

Each rich-text node is a full [BlockNote](https://www.blocknotejs.org/) editor
(headings, lists, checklists, code, inline styles). Double-click one to edit; it
serializes to markdown inside the SBD document, right next to the shapes and stickies.

## Run it

```bash
# from the spatialboard repo root
npm install
npm run dev --workspace=examples/rich-text
```

Persistence + offline work exactly as in [`../basic`](../basic) (shared
`src/usePersistentBoard.ts`). Next: custom compute nodes in
[`../custom-nodes`](../custom-nodes).
