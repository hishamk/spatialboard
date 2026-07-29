# SpatialBoard dev-app

Full-featured playground: custom node types, **exemplar layouts**, and the draggable palette.

## Run

```bash
cd spatialboard/examples/dev-app
npm install
npm run dev
```

From repo root you can also use `cd spatialboard && npm run dev` (workspace script).

## Exemplar boards (Debug panel)

Open the **Debug** strip at the bottom → expand → use the colored buttons (**Packet Observatory**, **Half adder**, **Layout exemplar**, **Mission Control**).

- **TypeScript layouts** are listed in `src/exemplar-debug-boards.ts` and implemented under `src/exemplars/`.

Layout guidance: `llm-guidance/spatialboard-board-layout.md`.

## MCP

See `mcp/README.md`.
