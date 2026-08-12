# SpatialBoard dev-app

Full-featured playground: custom node types, **exemplar layouts**, and the draggable palette.

## Run

```bash
# from the repo root
npm install
npm run dev:app
```

Or from this directory: `npm run dev`.

## Exemplar boards (Debug panel)

The app opens on the **Summit day** board. The **Debug** strip at the bottom
loads the others — **Packet Observatory**, **Half adder**, **Layout
exemplar**, **Mission Control**, **Whiteboard**, **Deck**, **Summit day** —
and `?board=<slug>` deep-links any of them (the label, kebab-cased:
`?board=mission-control`, `?board=half-adder`, …).

- **TypeScript layouts** are listed in `src/exemplar-debug-boards.ts` and implemented under `src/exemplars/`.
