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
