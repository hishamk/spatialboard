# Example 1 — Basic Board

The slimmest SpatialBoard: **just `<SpatialBoard />`**.

```tsx
import { SpatialBoard, SpatialEngine } from "spatialboard";
import "spatialboard/style.css";

<SpatialBoard engine={new SpatialEngine()} />
```

With no `nodeTypes` prop, the board ships the default **`coreBoardNodes`** preset —
shapes, sticky notes, text, freehand draw, frames, edges, images, and YouTube
embeds. None of those need the rich-text peers, so **this example installs zero
`@blocknote` / `@mantine` packages** (check its `package.json`).

Rich text is opt-in — see [`../rich-text`](../rich-text). Custom compute nodes —
see [`../custom-nodes`](../custom-nodes).

## Run it

```bash
# from the spatialboard repo root
npm install
npm run dev --workspace=examples/basic
```

## What else it shows

- **Persistence + offline (PWA).** The whole board is serialized to SBD and kept in
  `localStorage` (`engine.toSBD()` / `engine.fromSBD()`); the camera is saved too, so
  a reload lands you exactly where you left off. A tiny service worker caches the
  shell, so it works offline after the first visit. All of that lives in
  [`src/usePersistentBoard.ts`](src/usePersistentBoard.ts) — copy it as-is.
