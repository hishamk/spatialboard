# Third-Party Notices

SpatialBoard is built on top of several open-source projects. This document
records notable third-party components and compatibility integrations.

## Rendering / Stroke Generation

- **perfect-freehand** (MIT)
  - Used for pressure-aware freehand stroke outline generation in
    `src/rendering/freehand.ts`.
  - SpatialBoard converts returned outline points into SVG path data.

- **roughjs** (MIT)
  - Used for rough/hand-drawn style shape rendering utilities in
    `src/rendering/rough-shapes.ts`.
  - SpatialBoard wraps roughjs generators and maps style options to SVG paths.

## Excalidraw Ecosystem Compatibility

- **Excalidraw** (MIT) is not vendored as a runtime dependency in SpatialBoard.
- SpatialBoard includes interoperability code for:
  - `.excalidrawlib` import/export compatibility
  - Excalidraw library directory consumption
  - Conversion from Excalidraw element schemas to SpatialBoard node schemas
- Compatibility modules live under `src/excalidraw/`.

This compatibility layer is an independent adapter implementation for file
formats and community library interoperability. If future code is directly
adapted from upstream Excalidraw source, explicit source attribution should be
added near the adapted code.

## License Summary

SpatialBoard is distributed under the MIT License (`LICENSE`).
Third-party dependencies retain their own licenses.
