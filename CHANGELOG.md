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

### Added (editable exports)

- Exported PNGs and SVGs now carry the board's SBD source as metadata — the
  draw.io / Excalidraw pattern: anyone can view the file as an image, and
  dropping it back onto a board restores real editable nodes at the drop
  point (fresh ids, edges and groups rewired). PNG embeds an `iTXt` chunk;
  SVG embeds a base64 `<metadata>` element; frame exports carry just that
  frame's subset. On by default (`ExportOptions.embedSource: false` opts
  out); `embedSBDInPNG` / `extractSBDFromPNG` / `embedSBDInSVG` /
  `extractSBDFromSVG` and `engine.insertNodesAt` are exported for hosts
  wiring their own open-file flows.

- "Download image" in the context menu of an image node — saves the source
  to disk with the right extension (data URIs directly, remote URLs fetched
  to a blob; a blocked cross-origin fetch opens the image in a new tab).
- Basic example: an About page (top-bar button) that IS a live spatialboard —
  the wordmark, squiggle, and feature stickies are real nodes on a throwaway
  engine. Drag them, draw over them, or press play to watch the about page as
  slides (each section is a frame). Closing discards the board.

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
- Rough shapes (artist/cartoonist sloppiness) no longer change their strokes
  on mouse-up: the drag preview seeded RoughJS with a fixed placeholder while
  the committed node seeds from its id, so the ink visibly re-randomized the
  moment the shape was created. The node id is now minted at drag start and
  seeds the preview, making the preview and the committed node
  stroke-identical (the seed also rides the collab preview payload so remote
  peers match). Corner sharpness (round/sharp) is now also part of the
  shape tool's remembered defaults and is applied at creation.
- Short draw/shape nodes no longer sit a few pixels below their true
  position: the node's `<svg>` rendered inline, so a node shorter than the
  font strut (a near-flat line/arrow, a hairline stroke) was pushed down to
  the text baseline — visible as a ~3px vertical nudge the moment a flat
  line was committed, and as selection chrome floating slightly above the
  ink. The svg is now `display: block`.
- Freehand strokes survive save/reload pixel-faithfully: serialization ran
  strokes through geometric (RDP) simplification, but the variable-width ink
  is a function of point DENSITY — reloaded strokes came back with thin runs
  and sharp kinks. Serialization now only drops consecutive near-duplicate
  points, which leaves the rendered stroke visually identical.
- Dropped and pasted images no longer vanish on reload: a full-resolution
  photo arrived as a data URI of tens of MB, which silently blew the
  localStorage quota in storage-backed hosts — the board simply stopped
  persisting. Oversized imported raster images are now capped at a 2048px
  long edge and re-encoded as WebP (alpha preserved; animated GIFs pass
  through untouched), typically shrinking a photo 50–100×. The basic
  example also reports "Not saved — device storage is full" instead of a
  silently stuck "Saving…" when a save genuinely fails.
- Styling a node now sets the defaults for the NEXT node of its type (the
  "current item defaults" behavior): change a text node's font, size, color,
  or alignment — or a draw stroke's color/width, a shape's fill, a sticky's
  color, an edge's arrowheads — and every new node of that type is created
  with those values instead of resetting to stock.
- The selection frame (bounds, resize/rotate handles) no longer renders on
  the node being inline-edited — text, sticky, and label editing show only
  the caret; the frame belongs to selection, and returns when editing ends.
- Text nodes the user never typed into don't persist: committing an empty
  brand-new text node deletes it (outside undo history), so stray text-tool
  clicks stop accumulating invisible phantom nodes.
- New text nodes are reliably editable the moment they're created:
  - With the text (or note/sticky) tool active, clicking OVER an existing
    node now reaches the canvas and creates there — sticky notes, content
    cards, and images were swallowing the click to select/drag themselves
    instead, so nothing was created at all.
  - A focus watchdog guards the fresh edit session: one-shot side effects
    of a first selection (inspector mount, font loads) could steal focus —
    and the caret with it — leaving a focused-looking editor that ignored
    typing. Focus AND caret are now re-asserted, and passive blurs in the
    session's first moments reclaim the editor instead of committing.
- Presentation keyboard controls work when entered from the bottom bar:
  entering presentation unmounted the Present button that held focus,
  dropping focus to `<body>` and deafening the board-scoped keyboard handler
  (Esc / arrows) — the board now refocuses itself on enter. The presentation
  overlay also resolves its canvas within its own board's subtree, so cube
  transitions target the right canvas when several boards are mounted.

### Changed

- Canvas settings (grid, grid size, smart guides, free-form edges, paper)
  moved out of the node inspector into a gear popover on the tool rail
  (desktop) and a "Canvas" section in the ⋯ menu (compact layout) — board
  settings no longer crowd every selection. Hosts using the `tools`
  allowlist opt in with the new `"settings"` key.
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
