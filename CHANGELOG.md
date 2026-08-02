# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic
Versioning.

## [Unreleased]

### Added

- Responsive compact chrome for phones and narrow embeds (board container
  < 640px), replacing the vertical tool rail with a bottom toolbar:
  - `MobileToolbar` — primary tools on the bar, secondary tools + lasso +
    pickers (paper, templates, libraries, Mermaid, GIFs) in a ⋯ overflow menu;
    the ⋯ button mirrors the active overflow tool.
  - Compact `BottomBar` — zoom and undo/redo pills plus a ⋯ menu holding fit,
    search, origin views, present, slides, minimap, arrange, and the
    performance overlay.
  - The node inspector is on-demand: a sliders trigger appears beside the
    compact bar whenever there is a selection or an active drawing tool, and
    the sheet opens only when tapped (nothing auto-opens over the canvas).
    It floats above the tool row so switching tools stays possible, orders
    style controls first (actions after, canvas settings last), and scales
    every shared control primitive to thumb size via `--sbp-*` density
    variables (desktop metrics unchanged).
  - Bottom chrome respects `env(safe-area-inset-bottom)` for standalone
    (PWA) display on notched devices.
- Larger touch targets for canvas affordances on coarse-pointer devices:
  resize/rotate handles, edge endpoint/kink handles, and connection dots now
  carry invisible enlarged hit areas (28px touch / 14px mouse) while keeping
  the drawn 8px visuals.
- Double-tap works on touch and pencil input: browsers stop synthesizing
  `dblclick` once the canvas opts out of native gestures, so double-taps are
  detected at the pointer level and re-dispatched as real `dblclick` events —
  text/sticky/label editing, group drill-down, and image crop now open on
  phones and iPads exactly as they do with a mouse.

### Fixed

- PNG/SVG export fidelity — a full audit against the live canvas renderers:
  - Images: `contain` letterboxing instead of cover-crop (a rotated or
    aspect-mismatched image no longer exports zoomed/cropped), plus crop,
    flipH/flipV, rounded-corner clipping, the 1px default border, and
    opacity no longer dimming the border.
  - Rotated nodes no longer clip at the export edges (content bounds now
    include rotated corners).
  - Frames: dashed default border, `#ccc` default color, 8px corner radius,
    and the label tinted to the border color at weight 500.
  - Text: first-baseline offset corrected (~0.2em), and wrapping now uses
    real font measurement so exported line breaks match the canvas.
  - Sticky notes: rounded-corner style and 1.5 line-height.
  - Content cards: transparent background (canvas parity), default border
    width, and markdown-fallback text metrics.
  - Shapes: `roughness: 0` exports crisp geometry primitives, and solid
    fills behind rough strokes use clean geometry (no wobbling fill edge);
    omitted line/arrow endpoints default to the horizontal center line.
  - Freehand: dashed/dotted strokes export the same smooth curve as canvas.
  - Edges: port-connected edges anchor at the port dots, dash patterns scale
    with stroke width, rough edges render rough, and labels get their white
    pill background.
  - Background: textured papers (Japanese stationery, kraft) and the
    dot-grid overlay now export; PNG rasterization waits for embedded fonts.
- SBD serialization: missing optional fields no longer round-trip as the
  literal string `"undefined"` (which produced a font named "undefined"),
  the parser heals boards already saved that way, and image crop/flip are
  now persisted (they were silently lost on save/load).

### Changed

- The minimap auto-hides when the board first enters the compact layout (it
  can be re-enabled from the compact ⋯ menu) and repositions above the
  compact bottom chrome.
- The canvas search bar and picker panels clamp to the viewport width on
  small screens.

### Removed

- The crude `@media (max-width: 600px)` CSS that force-hid the bottom-bar
  pills, minimap, and frames panel — superseded by the compact chrome.

- Initial open-source project documentation set:
  - `README.md`
  - `LICENSE`
  - `CONTRIBUTING.md`
  - `CODE_OF_CONDUCT.md`
  - `SECURITY.md`
  - `CHANGELOG.md`
- Package metadata for public registry/readability.
- GitHub Actions workflow for `spatialboard` CI.
- Mermaid sketch importer in sidebar:
  - Flowchart parsing/layout (`flowchart`/`graph`, common shapes/edges)
  - Sequence diagram parsing/layout (`sequenceDiagram`, participants/messages/notes)
  - Group support:
    - `subgraph ... end` for flowcharts
    - `box ... end` for sequence diagrams
  - Group containers rendered as normal rectangle `shape` nodes.
- Dev-app mock GIF endpoints for local testing without external API dependency.

## [0.1.0]

### Added

- Initial SpatialBoard release with core engine, built-in nodes, React board
  components, and SBD serialization support.
