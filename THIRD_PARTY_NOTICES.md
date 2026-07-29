# Third-Party Notices

SpatialBoard is distributed under the MIT License (`LICENSE`). This document
lists every third-party component involved in using or building it, with its
license, plus provenance notes for interoperability code.

## Runtime dependencies (installed with the package)

| Package | License | Used for |
|---------|---------|----------|
| [`@phosphor-icons/react`](https://github.com/phosphor-icons/react) | MIT | UI iconography |
| [`nanoid`](https://github.com/ai/nanoid) | MIT | Node / group id generation |
| [`perfect-freehand`](https://github.com/steveruizok/perfect-freehand) | MIT | Pressure-aware freehand stroke outlines (`src/rendering/freehand.ts`) |
| [`roughjs`](https://github.com/rough-stuff/rough) | MIT | Hand-drawn style shape rendering (`src/rendering/rough-shapes.ts`) |

## Peer dependencies (provided by the host application)

| Package | License | Used for |
|---------|---------|----------|
| [`react`](https://github.com/facebook/react) / `react-dom` | MIT | Component layer |
| [`@blocknote/core`](https://github.com/TypeCellOS/BlockNote) / `@blocknote/react` / `@blocknote/mantine` | MPL-2.0 | Rich-text content nodes |
| [`@mantine/core`](https://github.com/mantinedev/mantine) / `@mantine/hooks` | MIT | BlockNote's UI layer |

**About the MPL-2.0 (BlockNote):** the Mozilla Public License 2.0 is a
file-level, weak-copyleft license. SpatialBoard consumes the BlockNote
packages unmodified via npm; the MPL's source-availability obligations attach
to the MPL-covered files themselves, not to independent code that links or
bundles alongside them, so combining them with this MIT-licensed library and
proprietary host applications is permitted. If you modify BlockNote source
files, you must make those modified files available under MPL-2.0.

## Development-only dependencies

Build and test tooling — `vite`, `typescript`, `vitest`,
`@vitejs/plugin-react`, `@types/*` — is used to develop and build SpatialBoard
and is **not** part of the distributed package. Each retains its own license
(MIT or Apache-2.0).

## Fonts

One font (Excalifont, SIL OFL-1.1) is bundled; all other offered families are
fetched by the end user's browser from Google Fonts and are not redistributed.
See **[FONTS.md](FONTS.md)** for the full inventory and notices.

## Provenance notes

### Rendering / stroke generation

- **perfect-freehand** — SpatialBoard converts its returned outline points
  into SVG path data.
- **roughjs** — SpatialBoard wraps roughjs generators and maps style options
  to SVG paths.

### Excalidraw ecosystem compatibility

- **Excalidraw** (MIT) is not vendored as a runtime dependency.
- SpatialBoard includes independent interoperability code for:
  - `.excalidrawlib` import/export compatibility
  - Excalidraw library directory consumption
  - Conversion from Excalidraw element schemas to SpatialBoard node schemas
- Compatibility modules live under `src/excalidraw/`.
- The bundled default font, Excalifont, originates from the Excalidraw
  project (OFL-1.1 — see `FONTS.md`).

This compatibility layer is an independent adapter implementation for file
formats and community library interoperability. If future code is directly
adapted from upstream Excalidraw source, explicit attribution must be added
near the adapted code.

### Mermaid import

The Mermaid sketch importer (`src/utils/mermaid.ts`) is a **hand-written
parser** for a subset of Mermaid's diagram syntax. The `mermaid` library is
not a dependency and no Mermaid source code is vendored.
