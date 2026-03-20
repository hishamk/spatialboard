# SpatialBoard dev-app MCP

stdio MCP server that drives `examples/dev-app` in headless Chromium (Playwright). Exposes `window.__engine` (`SpatialEngine`) to `spatialboard_eval`.

## Tool order for agents

1. **`spatialboard_list_node_types`** — **Call first.** Returns all node `type` strings (built-in + custom), data-flow **ports**, and optional **doc** copy for dev-app custom nodes. Layout-only docs (`spatialboard-board-layout.md`) do not enumerate these.
2. **`spatialboard_eval`** — mutate the board using `engine` (after you know valid `type` / port ids).
3. **`spatialboard_screenshot`** — after `engine.fitToContent()` if the script changed geometry.

## Setup

1. Run the Vite app: `cd spatialboard/examples/dev-app && npm run dev`
2. Once: `cd spatialboard/examples/dev-app/mcp && npx playwright install chromium`
3. Optional: `SPATIALBOARD_DEV_URL` (default `http://localhost:5173`)

## Layout guidance for agents

See **`llm-guidance/spatialboard-board-layout.md`** — spacing, columns, mind maps, loader exemplars.

Canonical boards live in **`llm-guidance/spatialboard-exemplars/`** (`README.md` indexes the four TypeScript loaders).

**Important:** after your eval script loads or edits nodes, call **`engine.fitToContent()`** before `spatialboard_screenshot` so pan/zoom match the new content (the React canvas listens for engine viewport events).

The dev-app sets **`window.__nodeTypeDocs`** (inspector help for custom nodes); `spatialboard_list_node_types` merges that into each entry as `docTitle` / `docBody`.

## Exemplar loaders (TypeScript)

Resolved by Vite as **`@spatialboard-exemplars`** (see `examples/dev-app/vite.config.ts`).

| Loader | Export |
|--------|--------|
| Packet Observatory | `loadApiConstellationBoard` |
| Half adder | `loadHalfAdderBoard` |
| Layout exemplar | `loadLayoutExemplarBoard` |
| Mission Control | `loadMissionControlBoard` |

Example eval:

```js
const { loadLayoutExemplarBoard } = await import("@spatialboard-exemplars");
loadLayoutExemplarBoard(engine);
return { ok: true, nodes: engine.nodes.size };
```

