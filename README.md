# SpatialBoard

A React + TypeScript spatial canvas and node-board library for building whiteboards, visual editors, and graph-style interfaces.

SpatialBoard ships with:

- A high-performance `SpatialEngine`
- Built-in node types (content, draw, shape, edge, image, text, frame, sticky)
- Extensible custom node APIs
- Optional data-flow engine for node ports
- SBD serialization/parsing utilities
- Presentation mode, frames, and themed sidebar UI

## Installation

```bash
npm install spatialboard
```

or

```bash
yarn add spatialboard
```

## Peer Dependencies

SpatialBoard expects these peer dependencies in your app:

- `react` `^18`
- `react-dom` `^18`
- `@blocknote/core` `^0.46`
- `@blocknote/react` `^0.46`
- `@blocknote/mantine` `^0.46`
- `@mantine/core` `^8`
- `@mantine/hooks` `^8`

## Quick Start

```tsx
import { SpatialBoard, SpatialEngine, builtinNodeTypes } from "spatialboard";
import "spatialboard/style.css";

export default function App() {
  const engine = new SpatialEngine();

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SpatialBoard
        engine={engine}
        nodeTypes={builtinNodeTypes}
      />
    </div>
  );
}
```

## Core Concepts

- `SpatialEngine`: state, history, selection, viewport, and node graph operations.
- `SpatialBoard`: full React UI wrapper around the engine.
- `NodeTypeDefinition`: declare custom renderers, ports, and properties panels.
- `DataFlowEngine`: optional reactive graph evaluation for nodes with ports.

## Provenance & Compatibility

SpatialBoard includes compatibility adapters for selected ecosystem formats
(notably Excalidraw library files and directory interoperability), while keeping
its runtime/editor implementation independent.

For dependency and interoperability provenance details, see
`THIRD_PARTY_NOTICES.md`.

## Custom Nodes

You can extend built-ins by appending your own node definitions:

```tsx
import { SpatialBoard, builtinNodeTypes } from "spatialboard";
import { myCustomNodeType } from "./my-custom-node";

const nodeTypes = [...builtinNodeTypes, myCustomNodeType];

export function MyBoard() {
  return <SpatialBoard nodeTypes={nodeTypes} />;
}
```

## GIF Search (Optional)

SpatialBoard includes a GIF picker UI when `gifApiBaseUrl` is provided:

```tsx
<SpatialBoard gifApiBaseUrl="/api/v1/gifs" />
```

Expected endpoints:

- `GET /search?q=<query>&page=<n>&per_page=<n>`
- `GET /trending?page=<n>&per_page=<n>`

The responses should follow the Klipy-compatible shape used by `src/utils/klipy.ts`.

## Public API (Selected Exports)

- `SpatialBoard`
- `SpatialEngine`
- `NodeTypeRegistry`
- `builtinNodeTypes`
- `DataFlowEngine`
- `serializeToSBD`
- `parseSBD`
- `markdownToBlocks`
- `getStrokePath`

See `src/index.ts` for the complete export surface.

## Styling

Import default styles once:

```ts
import "spatialboard/style.css";
```

Use `theme` prop on `SpatialBoard` to override sidebar/properties panel tokens.

## SBD Format

SpatialBoard uses the SBD format for board persistence and interchange.

- `sbd-spec.md`
- `sbd-spec_v2.md`

## Development

From `spatialboard/`:

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build
npm run preview
```

The development app lives in `examples/dev-app`.

## Contributing

Contributions are welcome. Please read `CONTRIBUTING.md` first.

## Security

If you discover a security issue, please follow `SECURITY.md`.

## Third-Party Notices

See `THIRD_PARTY_NOTICES.md` for dependency and interoperability provenance
notes (including roughjs, perfect-freehand, and Excalidraw compatibility).

## License

MIT - see `LICENSE`.
