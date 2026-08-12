# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic
Versioning.

## [Unreleased]

## [0.2.0] - 2026-08-11

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

### Performance (browser memory)

- Undo history now uses structural sharing: each snapshot is a shallow map
  copy whose node objects are shared with the live board (safe because the
  engine is uniformly copy-on-write), instead of a full `JSON.stringify` of
  every node per step ×50 steps ×2 stacks. On an image-heavy board this
  shrinks history from potentially hundreds of MB to map-entry overhead, and
  removes a multi-MB stringify from the critical path of every edit.
- Copy/paste/duplicate (and the personal library) clone nodes with a
  reference-preserving deep clone: containers are fresh, strings are shared —
  so any number of pasted copies of an image hold ONE base64 string on the
  heap instead of one per copy.
- The SVG layer renders the virtualized node set when idle too: per-edge
  `<svg>` hosts now mount only for edges that are visible or whose path
  crosses the viewport (the crossing-edge pass already guaranteed
  correctness), instead of every edge on the board.
- Rich-text nodes swap to a lightweight skeleton preview below 35% zoom —
  at overview zooms a wall of notes no longer mounts one full
  BlockNote/ProseMirror editor per visible node; double-click zooms in and
  the real editor mounts.
- The frames/slides panel unmounts when closed (it used to stay mounted
  off-screen holding one rendered SVG thumbnail per frame).
- Rough edge path data is memoized per edge (it was regenerated on every
  pan/zoom frame), text and rich-text blocks share one ResizeObserver per
  document instead of one per node, and the freehand tool builds one point
  snapshot per pointermove instead of two.
- PNG export: the default scale now matches the documented 2× (the code
  hardcoded 4×, quadrupling raster memory — ~192 MB transient for a
  2000×1500 board), the raster is capped at 8192px on the long side (with a
  warning when clamped), the canvas backing store is released eagerly after
  encode, and the embedded-source chunk is assembled as Blob parts instead
  of concatenating full PNG copies in JS heap.
- Dropping a PNG probes for embedded board source in the first 64 KB
  (the chunk sits right after IHDR) instead of reading the whole file twice.
- The GIF picker caps accumulated scroll results and clears them on close.
- The bundled hand font ships as woff2 (index.js ~779 KB, from 817 KB).

### Fixed

- Freehand ink no longer nudges on mouse-up. Three stacked causes, three
  fixes:
  - In-progress pen/airbrush strokes now render as a real `DrawNode` in the
    DOM node layer — the same component and raster context the committed node
    uses — instead of an overlay-SVG preview, so committing cannot change
    pixels by construction (the node enters the engine under the id the
    mounted item already has). Live collab strokes are unaffected: peers
    still receive them over awareness.
  - Viewport transform strings snap their translate to whole CSS pixels at
    render time (`viewport-quantize.ts`); with a fractional pan the
    composited DOM layer and the inline SVG overlays resolved the same
    translate to different device pixels. Engine camera state stays exact —
    the snap is presentation-only (hit-testing offset ≤ half a CSS pixel).
  - `UnifiedDomViewportLayer` hints `will-change: transform` while the
    viewport moves and drops it ~120ms after it settles, forcing the
    compositor to re-rasterize at pan/zoom end. Previously the stale GPU
    texture persisted until the next paint invalidation — typically a stroke
    commit — making the whole board visibly settle at that unrelated moment.
- Selecting an image (or video) no longer insets its content: the selection
  ring was a `border` on a border-box container, which shrank the `inset: 0`
  content by the border width every time. The ring is an `outline` now —
  painted outside, zero layout impact.
- The floating selection pill positions off the full CHROME envelope
  (ink-padded frame + handle hit targets + the rotation stem) instead of the
  raw node box, so it can no longer occlude the rotation knob, corner
  handles, or an edge's endpoint grips — in the above placement and the
  flipped-below one alike.
- Per-id bookkeeping now actually leaves the board with its node: measured
  heights (engine + spatial index), group rotation state of dissolved
  groups, and data-flow generation counters were never pruned on delete and
  grew for the whole session.
- Edge bounding boxes are recomputed on board load. SBD carries no edge
  AABBs, so every loaded edge sat at a zero-rect at the origin in the
  spatial index — breaking edge culling and (during node drags) letting
  long crossing edges vanish until an endpoint was moved.
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

### Added

- Airbrush brush for the draw tool — a seeded grain spray along the pointer
  path (the classic paint-deck spray can). The whole spray is a pure
  function of (points, width, node id): grains never shimmer while drawing,
  the live preview shows exactly what commits, reloads render the identical
  spray, and exports mirror the canvas. A "Brush" row on the draw tool (and
  on existing strokes — points are stored raw, so strokes convert freely)
  switches Pen ↔ Airbrush; the choice participates in per-type style memory.
- Console chrome (`<SpatialBoard chrome="console">`): the whole control
  surface as ONE full-width collapsible bottom panel — TOOLS · SELECTION ·
  VIEW zones — instead of the side rail + floating inspector + floating
  pills. With nothing selected it collapses to a 44px strip (tools + zoom);
  selecting expands it to the full deck: selection-breakdown chips that
  filter the selection by type, quick color swatches, an opacity slider,
  group, and the FULL inspector docked as its own zone — multi-type
  selections switch via a tab strip (Shared + one tab per type), and
  content flows into side-by-side columns so wide screens replace
  scrolling with width. With a creation tool active the properties zone
  shows that TOOL's options instead. Selection ACTIONS live on a floating
  pill above the selection itself (the Canva pattern): group/ungroup,
  duplicate, delete, and stack-order icons — keeping the
  deck pure properties. The view zone carries zoom/fit, VCR-style slide
  controls (prev / n-of-m / next navigating the canvas between frames in
  presentation order, PLAY, and a slides-panel toggle), undo/redo seated
  with the tools, and the minimap DOCKED into the deck's spare space with
  its own show/hide toggle (the floating map yields in console mode).
  Opt-in;
  floating chrome stays the default, and the compact mobile layout and
  read-only viewing keep their own chrome. The basic example now uses it.
- The selection pill offers "Download image" for a single selected image —
  the same action as the context menu (data URIs save directly; remote URLs
  fetch to a blob, with a new-tab fallback for cross-origin sources).
- Selection chrome hides while a selection is being MOVED — frame, resize
  handles, rotation stem, connection anchor points, edge endpoint grips,
  and the floating pill all get out of the way of the drag, then return on
  release. Resize/rotate gestures keep their chrome (it's the thing being
  dragged). Engine API: `beginNodeGesture(ids, kind)` now takes a
  `"move" | "transform"` kind (default `"move"`), exposed as
  `engine.gestureKind`.
- `LIGHT_SB_THEME` — a light chrome preset (white floating panels, soft
  shadows, dark text, accent-tint active controls) alongside the dark
  default; the whole chrome is token-driven, so `theme={LIGHT_SB_THEME}`
  restyles the toolbar, bars, inspector, menus, and panels together. The
  basic example now uses it (including its shell header and About board).

### Changed

- Bottom-bar pills are taller (40px controls, up from 32) with slightly
  rounder corners, matching the compact layout's touch metrics.
- The selection frame is a solid line (was dashed) — the dashes read as a
  marquee/frame border rather than a selection. Applies to the SVG selection
  box and the image/rich-text blocks' own selected borders (the crop-region
  marquee stays dashed by convention).
- The selection frame now contains the node's INK, not just its nominal
  geometry: strokes are centered on the geometry (±width/2) and RoughJS
  sloppiness wobbles further out, so artist/cartoonist shapes and freehand
  strokes seeped outside the box. Selection chrome (single and multi-select)
  now pads by the ink envelope — stroke half-width plus ~3px per roughness
  level — and the resize/rotate handles sit on the padded frame.
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

[Unreleased]: https://github.com/hishamk/spatialboard/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/hishamk/spatialboard/releases/tag/v0.2.0
