# SBD v3 — Spatial Block Document format

Normative spec for the SBD serialization format, version 3 (the current format; the earlier product/PoC spec revisions are superseded and removed). This document covers **only the interchange format**. The reference implementation is `src/serialization/sbd-parser.ts` + `sbd-serializer.ts`; the executable examples live in `src/serialization/__tests__/sbd-roundtrip.test.ts`.

## Design goals

- **Markdown-compatible**: an SBD file is valid markdown; stripping the HTML-comment directives yields a readable linear document.
- **LLM/hand-editable**: one directive per node, flat scalar attributes, IDs (not object references) for links, frame-relative child coordinates so "move the frame" is a two-number edit.
- **Diff-stable**: integer-rounded geometry, nodes emitted in document order (moving a node changes attribute values, never file order).
- **Lossy by design**: SBD is an interchange/authoring format, not the storage format (live canvas content is CRDT-backed). Coordinates round to integers; freehand strokes are RDP-simplified; rich-text bodies round-trip through markdown.
- **No silent data loss**: parse problems produce `warnings`, and malformed pieces degrade (absolute coords, empty data) rather than disappearing.

## Document structure

A document is a sequence of **directives** — HTML comments of the form `<!--@tag attr="value" … -->` — each optionally followed by a **body** (the lines up to the next directive).

```markdown
<!--@meta sbd="3" background="dot-grid" originView="0,0,1" -->

<!--@frame id="f1" x="100" y="100" w="400" h="300" z="0" label="Telemetry" -->

<!--@sticky id="s1" x="40" y="60" w="200" h="150" z="1" parent="f1" color="#FEF3C7" -->
Battery check at 06:00.

<!--@node type="analog-clock" id="clock1" x="80" y="90" w="200" h="200" z="3" -->
{
  "timezone": "America/Chicago",
  "label": "Houston"
}

<!--@edge id="e1" from="s1" to="clock1" style="dashed" color="#666" arrowHead="arrow" -->
```

### Directives

| Tag | Node type | Body |
|---|---|---|
| `@meta` | — (document header) | none |
| `@defaults` | — (per-type attribute defaults) | none |
| `@frame` | `frame` | none |
| `@block` | `content` (rich text) | markdown |
| `@text` | `text` | plain text |
| `@sticky` | `sticky` | plain text |
| `@draw` | `draw` (freehand) or `shape` (when `tool="shape"`) | one line of `x,y,pressure` points (freehand only) |
| `@image` | `image` | none |
| `@edge` | `edge` | none |
| `@node` | any registered custom type (generic form) | pretty-printed JSON `data` |
| `@custom` | *(v2 compat, parse-only)* whole node as single-line JSON | none |

### Grammar rules

1. **Directive extent** — a directive starts on a line whose trimmed form begins `<!--@` and runs through the first `-->`. Attributes may span lines:
   ```markdown
   <!--@frame id="f1"
       x="60" y="450"
       w="760" h="310"
       label="Rover Telemetry" -->
   ```
2. **Attributes** — `name="value"` pairs. In values, `"` is escaped as `&quot;` and `-->` as `--&gt;`. Unknown attributes are ignored (forward compatibility).
3. **Bodies** — lines between a directive and the next directive (or EOF). Leading/trailing blank lines are padding, not content. A body line that would read as a directive is escaped with a backslash immediately before `<!--@`; parsers strip exactly one backslash (writers add one, including to already-escaped lines).
4. **Order carries no meaning** — parsers resolve `parent`/`from`/`to` references in a second pass, so any document order is valid. Writers MUST preserve input order (diff stability), not sort.
5. **Warnings, not drops** — a malformed directive (bad JSON, unknown tag, missing `@node type`) yields a warning; salvageable parts are kept (an `@node` with bad JSON keeps its geometry with empty `data`).

### Base attributes (all node directives)

`id` (nanoid; generated if absent), `x`, `y`, `w`, `h` (`"auto"` allowed where the type supports it), `z`, and optional `rotation` (degrees), `locked` (`"true"`), `group`, `parent`.

### `parent` — frame-relative coordinates

A directive with `parent="<frameId>"` positions `x`/`y` **relative to that node's top-left**. Nesting is allowed (a frame may itself have a `parent`); cycles and unknown ids degrade to absolute coordinates plus a warning. Writers emit `parent` for nodes the engine tracks as frame children. Exceptions: `@draw` freehand strokes (geometry lives in absolute point data) and `@edge` (no intrinsic position) never carry `parent`.

### `@node` — the generic/custom form

Base fields as attributes (`type` required), node `data` as a pretty-printed JSON body. This replaces the v2 `@custom` single-line blob for writing; `@custom` remains parseable for old files. Any type — including built-ins — may be expressed with `@node`; the per-type tags are sugar that map tool-specific attributes (`color`, `fontSize`, …) into `data`.

### `@defaults` — authoring convenience

`<!--@defaults type="sticky" color="#BBF7D0" fontSize="18" -->` supplies attribute defaults applied to every later directive of that type that omits them (`type` matches the directive tag, or the `type` attribute for `@node`). Writers don't emit `@defaults`; it exists for hand-written and generated documents.

### `@meta`

`sbd="3"` version-stamps the document (absent ⇒ v2 semantics; v3 parsers accept both). Other fields: `background`, `originView="x,y,zoom"` (plus legacy `canvas_w`/`canvas_h`/`grid`/`snap`, which are vestigial).

## Non-goals (rejected by design)

- **Variables/templating** (`{{mission.start}}`) — breaks WYSIWYG round-trip; belongs in a layer above that generates concrete SBD.
- **Data binding** (`bind=`) — renderer semantics, not format semantics; a custom node type may define such an attribute for itself.
- **Class/theme system** — destroys node-level self-containedness and creates an unsolvable style-attribution inverse problem; `@defaults` covers the duplication concern.
- **YAML bodies** — one structured-body format (JSON) keeps the grammar small; attributes stay flat scalars.

## Compatibility

- v3 parsers read v2 documents unchanged (single-line directives, no `parent`, `@custom` blobs).
- v2 parsers reading v3 documents will: mis-handle multi-line directives (v3 writers keep directives single-line for that reason — multi-line is an *authoring* affordance), ignore `parent` (positions appear frame-relative!), and skip `@node`/`@defaults`. Consumers should upgrade the parser before ingesting v3 files.
