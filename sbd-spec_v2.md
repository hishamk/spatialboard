# Spatial Block Document (SBD) Editor — PoC Spec

## Overview

Build a proof-of-concept **Spatial Block Document Editor** — a hybrid between a freeform whiteboard (like Excalidraw) and a rich block-based document editor (like Notion/BlockNote). The core idea: **everything is a block on an infinite canvas**. Text, drawings, shapes, connections — all are spatial nodes the user can place, move, and connect freely.

This is a Vite + React + TypeScript app. No backend. All state is in-memory with export to a custom markdown-based format called **SBD (Spatial Block Document)**.

---

## Design Philosophy

- **One document type for all thinking styles.** Structured thinkers can snap blocks to grids. Spatial/ADHD thinkers can scatter freely and organize later.
- **Don't glue two full apps together.** We are NOT embedding BlockNote inside Excalidraw or vice versa. We build a single canvas engine that uses **BlockNote as the rich text editor** inside content blocks and **roughjs/perfect-freehand** for drawing. BlockNote is used as-is (it's an editor component, not a document layout system), while the canvas/spatial layer is custom-built.
- **Single state, single event system.** One viewport, one undo stack, one selection model, one serialization format.
- **LLM-native format.** The serialization format is markdown with HTML comment metadata — readable by humans and trivially mutable by AI agents.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  React UI Layer                             │
│  ├── <SpatialCanvas />  (main component)    │
│  ├── <Toolbar />        (mode + tools)      │
│  ├── <Minimap />        (navigation)        │
│  └── <PropertyPanel />  (selected node)     │
├─────────────────────────────────────────────┤
│  SpatialEngine (core, framework-agnostic)   │
│  ├── Viewport   (pan, zoom, coordinates)    │
│  ├── NodeStore  (CRUD, spatial index)       │
│  ├── Selection  (single, multi, lasso)      │
│  ├── History    (undo/redo stack)           │
│  ├── Mode FSM   (select/draw/text/shape)   │
│  └── Serializer (SBD markdown ↔ state)     │
├─────────────────────────────────────────────┤
│  Rendering                                  │
│  ├── SVG layer  (draws, shapes, edges)      │
│  └── DOM layer  (content blocks via         │
│       BlockNote editors)                     │
├─────────────────────────────────────────────┤
│  Low-level Dependencies                     │
│  ├── @blocknote/* (rich block editor with   │
│  │    slash menu, custom blocks, drag       │
│  │    handles — the full Notion-like UX)    │
│  ├── roughjs (hand-drawn aesthetic)         │
│  ├── perfect-freehand (pen strokes)         │
│  └── nanoid (block IDs)                     │
└─────────────────────────────────────────────┘
```

---

## Data Model

### SpatialNode (base interface)

Every item on the canvas is a `SpatialNode`:

```typescript
interface SpatialNode {
  id: string;             // nanoid, e.g. "b_x7kQ9mPa"
  type: NodeType;
  x: number;              // canvas coordinates (not screen)
  y: number;
  w: number;              // width in canvas units
  h: number | "auto";     // "auto" = derive from content
  z: number;              // z-index / layer order
  rotation?: number;      // degrees, default 0
  locked?: boolean;       // prevent move/edit
  groupId?: string;       // for grouping nodes
}

type NodeType = "content" | "draw" | "shape" | "edge" | "image";
```

### ContentNode

A rich text block powered by BlockNote. Internally, BlockNote uses its own JSON block structure. For SBD serialization, we convert to/from markdown. But the live editing state is BlockNote's native format.

```typescript
interface ContentNode extends SpatialNode {
  type: "content";
  data: {
    // BlockNote's native block array — this is the source of truth while editing.
    // On SBD export, this gets serialized to markdown.
    // On SBD import, markdown gets parsed into BlockNote blocks.
    blocks: any[];        // BlockNoteEditor.document (array of BlockNote Block objects)
    markdown?: string;    // cached markdown (updated on blur / export)
  };
}
```

**Rendering:** Each content block on the canvas is a full `BlockNoteView` editor instance. This gives us:
- **Slash menu** (`/` commands) — users can type `/` inside any block to insert headings, lists, code blocks, images, tables, and custom block types
- **Drag handles** — BlockNote's built-in block drag handles for reordering blocks *within* a content node
- **Custom block types** — we can register custom block schemas (see Custom Blocks section below)
- **Inline formatting toolbar** — bold, italic, links, etc.
- **Block-level type switching** — turn any block into a heading, quote, list, etc.

When a content node is not focused, we can optionally render a lightweight static preview for performance. But for the PoC, it's fine to keep all BlockNote editors mounted — BlockNote is efficient enough for ~20 content nodes.

### Custom Block Types (BlockNote Schema)

BlockNote supports custom block types via its schema system. This is critical for host applications — you can define domain-specific blocks that appear in the slash menu alongside the defaults.

```typescript
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

// Example: a callout block
const CalloutBlock = {
  // ... block spec definition per BlockNote docs
};

// Example: an AI prompt block
const AIPromptBlock = {
  // ... block spec definition
};

// Create a custom schema that includes defaults + custom blocks
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,      // paragraph, heading, list, code, image, table, etc.
    callout: CalloutBlock,     // custom
    aiPrompt: AIPromptBlock,   // custom
  },
});
```

For the PoC, use BlockNote's default schema. The custom block extension point should exist in the architecture but doesn't need custom blocks implemented yet.

The key design decision: **each content node on the canvas is an independent BlockNote editor with its own document**. They share the same schema (so the same slash menu and block types are available everywhere), but their content is independent. This means:

- A user can have a "notes" block with paragraphs and lists
- Next to it, a "code" block that's mostly code blocks
- Next to that, a "table" block with structured data
- All created naturally via the same `/` slash menu

Each BlockNote editor instance is created with:

```typescript
const editor = useCreateBlockNote({
  schema,                    // shared custom schema
  initialContent: node.data.blocks.length > 0 ? node.data.blocks : undefined,
});
```

### DrawNode

A freehand drawing stroke.

```typescript
interface DrawNode extends SpatialNode {
  type: "draw";
  data: {
    tool: "pen" | "pencil" | "highlighter" | "eraser";
    // Array of {x, y, pressure} points — fed into perfect-freehand
    points: Array<[number, number, number]>;
    color: string;
    strokeWidth: number;
    opacity?: number;      // 0-1, used for highlighter
  };
}
```

**Rendering:** Use the `perfect-freehand` library to convert points into an SVG path outline. Render as `<path>` inside the SVG layer. On save, simplify the points array.

### ShapeNode

Geometric primitives with optional hand-drawn/rough aesthetic.

```typescript
interface ShapeNode extends SpatialNode {
  type: "shape";
  data: {
    shape: "rect" | "ellipse" | "diamond" | "line" | "arrow";
    fill?: string;
    stroke: string;
    strokeWidth: number;
    roughness: number;     // 0 = clean vector, 1+ = hand-drawn (roughjs)
    label?: string;        // optional text label inside the shape
  };
}
```

**Rendering:** Use `roughjs` when `roughness > 0`, plain SVG otherwise.

### EdgeNode

A connection/arrow between two other nodes.

```typescript
interface EdgeNode extends SpatialNode {
  type: "edge";
  data: {
    fromId: string;        // source node ID
    toId: string;          // target node ID
    label?: string;
    style: "solid" | "dashed" | "dotted";
    color: string;
    strokeWidth: number;
    arrowHead?: "none" | "arrow" | "dot";  // at target end
    arrowTail?: "none" | "arrow" | "dot";  // at source end
  };
}
```

**Rendering:** Calculate anchor points on the bounding boxes of the connected nodes. Draw a path (straight line or simple curve) between them. Recalculate on node move. Edges don't have meaningful x/y of their own — their position is derived from connected nodes.

---

## SBD Markdown Format (Serialization)

The file format is **valid markdown** with spatial metadata in HTML comments. Stripping the comments yields a readable linear document.

### Example Document

```markdown
<!--@meta canvas_w="2000" canvas_h="1500" grid="20" snap="true" -->

<!--@block id="b_x7kQ9mPa" x="120" y="80" w="400" h="auto" z="1" -->
# Project Overview

This is the main idea. We're building a spatial document editor
that works for everyone.

<!--@block id="b_k3mNp2Qw" x="600" y="80" w="350" h="auto" z="1" -->
## Key Features

- Freeform canvas layout
- Rich text blocks
- Freehand drawing
- AI agent compatible

<!--@block id="b_r9tYu4Wx" x="120" y="400" w="400" h="auto" z="2" -->
> **Note:** This block has a higher z-index and floats above others.

<!--@draw id="d_p5sLm8Nv" x="300" y="300" z="0" tool="pen" color="#e74c3c" width="2" -->
M 0 0 C 12 45 67 89 120 34 C 145 12 200 78 230 56

<!--@draw id="d_w2xKj6Rb" x="0" y="0" z="0" tool="shape" shape="rect" color="#3498db" fill="none" stroke="2" x1="580" y1="60" x2="970" y2="300" -->

<!--@edge id="e_q8vHn1Yt" from="b_x7kQ9mPa" to="b_k3mNp2Qw" label="supports" style="dashed" color="#666" -->
```

### Parsing Rules

1. Split the document on `<!--@block ...-->` directives.
2. Each directive creates a ContentNode. The markdown content between this directive and the next directive (or EOF) is the block's markdown content.
3. `<!--@draw ...-->` directives create DrawNode or ShapeNode entries. If `tool="shape"`, it's a ShapeNode. Otherwise it's a DrawNode, and the content line after the directive is the SVG path data.
4. `<!--@edge ...-->` directives create EdgeNode entries.
5. `<!--@meta ...-->` sets canvas-level configuration.
6. All attributes are parsed as key="value" pairs from the HTML comment.

### Serialization Rules

1. Write `<!--@meta ...-->` first.
2. For each ContentNode, write `<!--@block ...-->` with spatial attributes, then serialize the BlockNote blocks to markdown using `blocksToMarkdownLossy()` from `@blocknote/core`, then a blank line.
3. For each DrawNode, write `<!--@draw ...-->` with attributes, then the SVG path data on the next line (for pen/pencil/highlighter tools).
4. For each ShapeNode, write `<!--@draw ...-->` with `tool="shape"` and shape-specific attributes.
5. For each EdgeNode, write `<!--@edge ...-->`.
6. Order: content blocks first (sorted by z then y then x), then draws, then edges.

### BlockNote ↔ Markdown Conversion

BlockNote provides built-in conversion utilities:

```typescript
import { Block } from "@blocknote/core";

// BlockNote blocks → markdown (for SBD export)
// Uses the editor instance's blocksToMarkdownLossy() method
const markdown = await editor.blocksToMarkdownLossy(editor.document);

// Markdown → BlockNote blocks (for SBD import)
const blocks = await editor.tryParseMarkdownToBlocks(markdownString);
```

**Important:** `blocksToMarkdownLossy()` is "lossy" because some BlockNote-specific features (like block colors, custom block types with special props) may not survive the markdown roundtrip. For the PoC this is fine. For production, you could store the BlockNote JSON alongside the markdown as a parallel representation, or use a custom serializer for custom block types.

The conversion wrapper:

```typescript
// src/serialization/blocknote-markdown.ts
// This file wraps BlockNote's conversion utilities for use by the SBD serializer.
// It needs a temporary editor instance for conversion (BlockNote requires an editor context).

import { BlockNoteEditor } from "@blocknote/core";
import { schema } from "../schema";

// Create a headless editor just for serialization (no DOM needed)
const serializerEditor = BlockNoteEditor.create({ schema });

export async function blocksToMarkdown(blocks: any[]): Promise<string> {
  return await serializerEditor.blocksToMarkdownLossy(blocks);
}

export async function markdownToBlocks(markdown: string): Promise<any[]> {
  return await serializerEditor.tryParseMarkdownToBlocks(markdown);
}
```

---

## SpatialEngine API

The core engine is a plain TypeScript class with no React dependency. The React layer subscribes to changes.

```typescript
class SpatialEngine {
  // --- State ---
  nodes: Map<string, SpatialNode>;
  viewport: { x: number; y: number; zoom: number };
  selection: Set<string>;
  mode: "select" | "draw" | "shape" | "text" | "edge";
  activeTool: { tool: string; color: string; width: number } | null;

  // --- Viewport ---
  pan(dx: number, dy: number): void;
  zoomTo(level: number, anchor?: { x: number; y: number }): void;
  zoomIn(): void;     // step zoom
  zoomOut(): void;
  fitToContent(): void;
  screenToCanvas(screenX: number, screenY: number): { x: number; y: number };
  canvasToScreen(canvasX: number, canvasY: number): { x: number; y: number };

  // --- Node CRUD ---
  addNode(node: SpatialNode): void;
  updateNode(id: string, patch: Partial<SpatialNode>): void;
  deleteNode(id: string): void;
  getNode(id: string): SpatialNode | undefined;
  getAllNodes(): SpatialNode[];
  getNodesByType(type: NodeType): SpatialNode[];

  // --- Spatial Queries ---
  hitTest(canvasX: number, canvasY: number): SpatialNode | null;
  getNodesInRect(rect: { x: number; y: number; w: number; h: number }): SpatialNode[];

  // --- Selection ---
  select(id: string): void;
  selectMultiple(ids: string[]): void;
  deselectAll(): void;
  deleteSelected(): void;

  // --- History ---
  undo(): void;
  redo(): void;
  canUndo(): boolean;
  canRedo(): boolean;

  // --- Serialization ---
  toSBD(): string;                      // export to SBD markdown
  fromSBD(sbd: string): void;           // import from SBD markdown
  toJSON(): object;                     // export raw state
  fromJSON(json: object): void;         // import raw state

  // --- Event Emitter ---
  on(event: string, callback: Function): void;
  off(event: string, callback: Function): void;
  // Events: "change", "viewport", "selection", "mode", "history"

  // --- Agent Mutation API ---
  applyMutation(mutation: AgentMutation): void;
  applyMutations(mutations: AgentMutation[]): void;
}
```

### Agent Mutation Types

```typescript
type AgentMutation =
  | { action: "add_block"; id: string; x: number; y: number; w?: number; content: string }
      // `content` is markdown — will be parsed into BlockNote blocks via tryParseMarkdownToBlocks()
  | { action: "update_block"; id: string; content: string }
      // `content` is markdown — replaces the block's content by parsing to BlockNote blocks
  | { action: "move_block"; id: string; x: number; y: number }
  | { action: "resize_block"; id: string; w: number; h?: number }
  | { action: "delete_block"; id: string }
  | { action: "add_draw"; id: string; tool: string; points?: number[][]; shape?: string;
      x: number; y: number; color?: string; strokeWidth?: number }
  | { action: "delete_draw"; id: string }
  | { action: "add_edge"; id: string; from: string; to: string;
      label?: string; style?: string; color?: string }
  | { action: "delete_edge"; id: string }
  | { action: "auto_arrange"; strategy?: "grid" | "cluster" | "tree" };
```

**Note on agent content mutations:** Agents send markdown in the `content` field (since markdown is LLM-native). The engine converts it to BlockNote blocks using `tryParseMarkdownToBlocks()` before storing. This means agents don't need to know about BlockNote's internal JSON format — they just write markdown, and the engine handles the conversion. This is the key to "LLM-native" document editing: an agent can surgically update one block's content by sending a simple markdown string, without touching any other block on the canvas.
```

---

## React Components

### Component Tree

```
<App>
  <SpatialCanvas engine={engine}>
    <SVGLayer />           ← draws, shapes, edges, selection rect
    <BlocksLayer />        ← content nodes as positioned DOM elements
    <InteractionLayer />   ← invisible overlay capturing pointer events
  </SpatialCanvas>
  <Toolbar />              ← top or left sidebar: mode, tools, colors
  <Minimap />              ← bottom-right corner thumbnail
  <PropertyPanel />        ← right sidebar: selected node properties
  <DebugPanel />           ← bottom: SBD output, JSON state (dev only)
</App>
```

### SpatialCanvas

The main canvas component. Manages the three rendering layers and event delegation.

```tsx
function SpatialCanvas({ engine }: { engine: SpatialEngine }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState(engine.viewport);
  const [nodes, setNodes] = useState(engine.getAllNodes());
  const [selection, setSelection] = useState(engine.selection);
  const [mode, setMode] = useState(engine.mode);

  // Subscribe to engine changes
  useEffect(() => {
    const handleChange = () => setNodes([...engine.getAllNodes()]);
    const handleViewport = () => setViewport({ ...engine.viewport });
    const handleSelection = () => setSelection(new Set(engine.selection));
    const handleMode = () => setMode(engine.mode);

    engine.on("change", handleChange);
    engine.on("viewport", handleViewport);
    engine.on("selection", handleSelection);
    engine.on("mode", handleMode);

    return () => {
      engine.off("change", handleChange);
      engine.off("viewport", handleViewport);
      engine.off("selection", handleSelection);
      engine.off("mode", handleMode);
    };
  }, [engine]);

  const viewportTransform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`;

  return (
    <div
      ref={canvasRef}
      className="spatial-canvas"
      style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}
      onWheel={handleWheel}       // zoom
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Background: grid pattern */}
      <GridBackground viewport={viewport} />

      {/* Layer 1: SVG for draws, shapes, edges */}
      <svg
        style={{
          position: "absolute", inset: 0,
          transform: viewportTransform, transformOrigin: "0 0",
          pointerEvents: "none",
        }}
      >
        {nodes.filter(n => n.type === "draw" || n.type === "shape").map(renderDrawNode)}
        {nodes.filter(n => n.type === "edge").map(renderEdgeNode)}
        {/* Selection rectangle if lasso-selecting */}
        {selectionRect && <rect ... />}
      </svg>

      {/* Layer 2: DOM for content blocks (BlockNote editors) */}
      <div
        style={{
          position: "absolute", inset: 0,
          transform: viewportTransform, transformOrigin: "0 0",
        }}
      >
        {nodes.filter(n => n.type === "content").map(node => (
          <ContentBlock
            key={node.id}
            node={node}
            isSelected={selection.has(node.id)}
            isEditing={editingBlockId === node.id}
            engine={engine}
            schema={schema}
          />
        ))}
      </div>
    </div>
  );
}
```

### ContentBlock

A draggable, resizable container that renders a BlockNote editor. Each instance is a full-featured block editor with slash menu, formatting, and custom block support.

```tsx
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

function ContentBlock({ node, isSelected, isEditing, engine, schema }) {
  // Each content block gets its own BlockNote editor instance
  const editor = useCreateBlockNote({
    schema,
    initialContent: node.data.blocks.length > 0 ? node.data.blocks : undefined,
  });

  // Sync editor changes back to engine
  useEffect(() => {
    if (!editor) return;
    const onChange = () => {
      engine.updateNode(node.id, {
        data: { ...node.data, blocks: editor.document },
      });
    };
    editor.onEditorContentChange(onChange);
  }, [editor]);

  return (
    <div
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        minHeight: 60,
        border: isSelected ? "2px solid #3b82f6" : "1px solid #e2e8f0",
        borderRadius: 8,
        background: "white",
        cursor: isEditing ? "default" : "grab",
        boxShadow: isSelected ? "0 0 0 2px rgba(59,130,246,0.3)" : "0 1px 3px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
      onPointerDown={(e) => {
        if (!isEditing) {
          e.stopPropagation();
          engine.select(node.id);
          // Start drag logic
        }
      }}
      onDoubleClick={() => engine.setEditing(node.id)}
    >
      {/* 
        The BlockNote editor is always mounted, but we control whether 
        it's interactive based on isEditing. When not editing, we overlay
        a transparent div to capture clicks for dragging/selection.
      */}
      <div style={{ padding: "4px 0" }}>
        <BlockNoteView
          editor={editor}
          theme="light"
          editable={isEditing}
        />
      </div>

      {/* Click shield when not editing — allows dragging the block */}
      {!isEditing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            cursor: "grab",
          }}
        />
      )}

      {/* Resize handle */}
      {isSelected && (
        <div className="resize-handle" onPointerDown={startResize} />
      )}
    </div>
  );
}
```

**Key behavior:**
- **Single click** on a content block → selects it (blue border), can drag to move
- **Double click** → enters edit mode, the click shield is removed, BlockNote becomes interactive
- **Type `/`** inside an editing block → BlockNote's slash menu appears with all available block types
- **Click outside** or **Escape** → exits edit mode, block becomes draggable again
- **Drag handle** (BlockNote's built-in) → reorders blocks *within* this content node
- **Canvas drag** (our drag) → moves the entire content node on the canvas

### Shared Schema Setup

Create the schema once at the app level and pass it to all ContentBlock instances:

```tsx
// src/schema.ts
import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";

// For the PoC, use defaults. Custom blocks can be added here later.
export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
    // dataTable: DataTableBlock,
  },
});

// Export the type for use throughout the app
export type SBDSchema = typeof schema;
```

```tsx
// In App.tsx
import { schema } from "./schema";

function App() {
  return (
    <SpatialCanvas engine={engine} schema={schema} />
  );
}
```

---

## Interaction Model / Mode State Machine

```
                    ┌──────────┐
           ┌───────│  SELECT   │───────┐
           │       └──────────┘       │
     press T          │   │         press D
           │     click on  click on     │
           │     block     canvas       │
           ▼       │         │          ▼
      ┌──────────┐ │         │   ┌──────────┐
      │   TEXT    │◄┘         └──►│   DRAW   │
      │ (editing) │              │ (freehand)│
      └──────────┘              └──────────┘
           │                         │
       blur / Esc              release pointer
           │                         │
           └──────────►◄─────────────┘
                  SELECT
```

### Mode Behaviors

| Mode | Pointer Down on Canvas | Pointer Down on Block | Pointer Drag | Double Click Block |
|------|----------------------|---------------------|-------------|-------------------|
| **Select** | Start lasso selection | Select block, start drag | Pan canvas (middle/right) or drag block/lasso | Enter Text mode |
| **Text** | Create new block at pointer, enter editing | Focus that block's editor | N/A (editor handles) | N/A |
| **Draw** | Start new stroke | Start new stroke (over block) | Continue stroke, capture points | N/A |
| **Shape** | Place shape at pointer | N/A | Drag to set shape size | N/A |
| **Edge** | N/A | Start edge from this block | Rubber-band line to cursor | N/A |

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `V` or `1` | Select mode |
| `T` or `2` | Text mode |
| `D` or `3` | Draw mode (pen) |
| `S` or `4` | Shape mode |
| `E` or `5` | Edge/connector mode |
| `Delete` / `Backspace` | Delete selected nodes (when not editing text) |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+A` | Select all |
| `Escape` | Deselect / exit current mode → select |
| `Space` (hold) | Temporary hand tool (pan) |
| `Ctrl +` / `Ctrl -` | Zoom in/out |
| `Ctrl 0` | Fit to content |

---

## Viewport & Coordinate System

- **Canvas coordinates** are the "world space" — blocks are positioned in canvas coords.
- **Screen coordinates** are pixel positions on the user's screen.
- The **viewport** defines the transform: `screen = (canvas * zoom) + offset`.

```typescript
// Convert screen point to canvas point
screenToCanvas(sx: number, sy: number) {
  return {
    x: (sx - this.viewport.x) / this.viewport.zoom,
    y: (sy - this.viewport.y) / this.viewport.zoom,
  };
}

// Convert canvas point to screen point
canvasToScreen(cx: number, cy: number) {
  return {
    x: cx * this.viewport.zoom + this.viewport.x,
    y: cy * this.viewport.zoom + this.viewport.y,
  };
}
```

**Zoom:** Use wheel events. Zoom toward the pointer position (not center).

```typescript
handleWheel(e: WheelEvent) {
  e.preventDefault();
  const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
  const newZoom = clamp(this.viewport.zoom * zoomFactor, 0.1, 5);

  // Zoom toward pointer
  const mouseCanvas = this.screenToCanvas(e.clientX, e.clientY);
  this.viewport.zoom = newZoom;
  this.viewport.x = e.clientX - mouseCanvas.x * newZoom;
  this.viewport.y = e.clientY - mouseCanvas.y * newZoom;
}
```

**Pan:** Middle mouse button drag, or Space + left drag, or two-finger trackpad.

---

## Drawing Implementation

### Freehand Strokes (perfect-freehand)

```typescript
import getStroke from "perfect-freehand";

function renderFreehandStroke(points: number[][], options: object): string {
  const outlinePoints = getStroke(points, {
    size: options.strokeWidth || 4,
    thinning: 0.5,
    smoothing: 0.5,
    streamline: 0.5,
    ...options,
  });

  // Convert outline points to SVG path
  return getSvgPathFromStroke(outlinePoints);
}

function getSvgPathFromStroke(stroke: number[][]): string {
  if (!stroke.length) return "";
  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );
  d.push("Z");
  return d.join(" ");
}
```

### Shapes (roughjs)

```typescript
import rough from "roughjs/bundled/rough.esm.js";

function renderRoughShape(svgElement: SVGSVGElement, node: ShapeNode) {
  const rc = rough.svg(svgElement);

  switch (node.data.shape) {
    case "rect":
      return rc.rectangle(node.x, node.y, node.w, node.h, {
        stroke: node.data.stroke,
        fill: node.data.fill,
        roughness: node.data.roughness,
        strokeWidth: node.data.strokeWidth,
      });
    case "ellipse":
      return rc.ellipse(
        node.x + node.w / 2, node.y + node.h / 2,
        node.w, node.h,
        { /* same options */ }
      );
    // ... diamond, line, arrow
  }
}
```

---

## File Structure

```
sbd-editor/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx                    # Entry point
│   ├── App.tsx                     # Root component
│   ├── schema.ts                   # BlockNote schema (shared across all editors)
│   │
│   ├── engine/
│   │   ├── SpatialEngine.ts        # Core engine class
│   │   ├── types.ts                # All TypeScript interfaces
│   │   ├── viewport.ts             # Pan/zoom math
│   │   ├── history.ts              # Undo/redo stack
│   │   └── spatial-index.ts        # Hit testing, rect queries
│   │
│   ├── serialization/
│   │   ├── sbd-parser.ts           # SBD markdown → SpatialNode[]
│   │   ├── sbd-serializer.ts       # SpatialNode[] → SBD markdown
│   │   └── blocknote-markdown.ts   # BlockNote blocks ↔ markdown conversion
│   │                                # (uses @blocknote/core's built-in
│   │                                #  blocksToMarkdownLossy / markdownToBlocks)
│   │
│   ├── components/
│   │   ├── SpatialCanvas.tsx        # Main canvas container
│   │   ├── SVGLayer.tsx             # Draws, shapes, edges
│   │   ├── BlocksLayer.tsx          # Content blocks
│   │   ├── ContentBlock.tsx         # Single content block (wraps BlockNoteView)
│   │   ├── GridBackground.tsx       # Canvas grid
│   │   ├── Toolbar.tsx              # Mode/tool selection
│   │   ├── Minimap.tsx              # Canvas overview
│   │   ├── PropertyPanel.tsx        # Node properties editor
│   │   └── DebugPanel.tsx           # SBD output viewer
│   │
│   ├── rendering/
│   │   ├── freehand.ts             # perfect-freehand helpers
│   │   ├── rough-shapes.ts         # roughjs shape rendering
│   │   └── edge-routing.ts         # Edge path calculation
│   │
│   ├── interactions/
│   │   ├── pointer-handler.ts      # Unified pointer event handling
│   │   ├── keyboard-handler.ts     # Keyboard shortcut handling
│   │   └── drag-handler.ts         # Block dragging + resize
│   │
│   └── styles/
│       └── index.css               # Minimal CSS + BlockNote style overrides
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "@blocknote/core": "^0.22",
    "@blocknote/react": "^0.22",
    "@blocknote/mantine": "^0.22",
    "@mantine/core": "^7",
    "roughjs": "^4.6",
    "perfect-freehand": "^1.2",
    "nanoid": "^5"
  },
  "devDependencies": {
    "vite": "^5",
    "@vitejs/plugin-react": "^4",
    "typescript": "^5",
    "@types/react": "^18",
    "@types/react-dom": "^18"
  }
}
```

**IMPORTANT:** We use BlockNote (https://www.blocknotejs.org/) as the rich text editor inside content blocks — NOT raw TipTap. BlockNote provides slash menus, drag handles, custom block types, and the full Notion-like editing UX. Each content block on the canvas is a full BlockNote editor instance.

Do NOT use Tailwind. Use plain CSS or inline styles to keep the PoC focused.

---

## PoC Scope — What to Build

### Must Have (PoC v0.1)

1. **Canvas with pan & zoom** — wheel to zoom, middle-click or space+drag to pan. Grid background that scales with zoom.
2. **Content blocks** — double-click canvas to create. Renders as editable TipTap editors. Drag to move. Resize handle on bottom-right corner.
3. **Freehand drawing** — pen tool that captures pointer events and renders via perfect-freehand. Multiple strokes. Color/size picker in toolbar.
4. **Basic shapes** — at minimum: rectangle and ellipse. Drag to size. Use roughjs for hand-drawn look.
5. **Selection** — click to select. Click empty canvas to deselect. Delete key to remove. Multi-select with Shift+click.
6. **Mode switching** — toolbar buttons and keyboard shortcuts (V=select, T=text, D=draw, S=shape).
7. **Undo/redo** — Ctrl+Z / Ctrl+Shift+Z. Works across all node types.
8. **SBD export** — button that generates the SBD markdown and shows it in a debug panel or copies to clipboard.
9. **SBD import** — paste SBD markdown to load a document.

### Nice to Have (if time allows)

10. **Edges/connectors** — click two blocks to connect them with an arrow.
11. **Minimap** — small thumbnail of the full canvas in the corner.
12. **Auto-arrange** — button that snaps blocks to a grid layout.
13. **roughjs toggle** — switch between hand-drawn and clean vector shapes.
14. **Lasso selection** — drag in select mode to select multiple nodes.
15. **Block z-ordering** — bring to front / send to back.

### Out of Scope for PoC

- Collaboration / multiplayer
- Mobile / touch optimization
- Agent mutation API (design is in the spec but not wired up)
- Image blocks
- File save/load to disk
- Block grouping
- Snap-to-grid / smart guides
- Comments / annotations
- Keyboard navigation between blocks

---

## Implementation Order

Build in this exact order. Each step should produce something testable.

### Step 1: Scaffolding (15 min)
- Vite + React + TypeScript project
- Install all dependencies
- Basic App.tsx with a full-viewport div
- Verify it runs

### Step 2: Engine Core (1-2 hrs)
- `types.ts` — all interfaces
- `SpatialEngine.ts` — node store (Map), viewport state, mode state, event emitter
- `viewport.ts` — pan, zoom, screenToCanvas, canvasToScreen
- `history.ts` — undo/redo with snapshot-based approach (simple for PoC: store full state snapshots)
- Unit-testable with no React

### Step 3: Canvas + Viewport (1 hr)
- `SpatialCanvas.tsx` — full-viewport div with wheel zoom and pan
- `GridBackground.tsx` — dot or line grid that transforms with viewport
- Verify: can pan around and zoom in/out smoothly

### Step 4: Content Blocks with BlockNote (1-2 hrs)
- `schema.ts` — shared BlockNote schema (start with `defaultBlockSpecs`, extensible)
- `ContentBlock.tsx` — positioned div wrapping a `BlockNoteView` editor instance
- Each block gets its own `useCreateBlockNote()` with the shared schema
- Click shield overlay when not editing (for drag/select behavior)
- Double-click canvas → create new content block at that position with empty content
- Double-click existing block → enter edit mode (remove click shield, BlockNote becomes interactive)
- Type `/` inside an editing block → BlockNote slash menu appears with all block types
- Click outside or Escape → exit edit mode
- Drag blocks to move them
- `blocknote-markdown.ts` — wrapper around BlockNote's `blocksToMarkdownLossy()` and `markdownToBlocks()` for SBD serialization
- Verify: can create multiple blocks, use slash menu to add headings/lists/code/tables, drag blocks around

### Step 5: Drawing (1-2 hrs)
- `freehand.ts` — perfect-freehand integration
- `SVGLayer.tsx` — renders all draw nodes
- Draw mode: capture pointer events, accumulate points, render stroke
- On pointer up, finalize the DrawNode and add to engine
- Verify: can draw freehand strokes with pressure sensitivity

### Step 6: Shapes (1 hr)
- `rough-shapes.ts` — roughjs integration
- Shape mode: pointer down sets origin, drag sets size, pointer up finalizes
- Support rect and ellipse
- Verify: can draw rough rectangles and ellipses

### Step 7: Selection & Deletion (1 hr)
- Click node to select (blue border/highlight)
- Click empty canvas to deselect
- Delete/Backspace removes selected nodes
- Shift+click for multi-select
- Verify: can select and delete any node type

### Step 8: Toolbar & Mode Switching (30 min)
- `Toolbar.tsx` — buttons for Select, Text, Draw, Shape modes
- Color picker (simple preset swatches)
- Stroke width selector
- Active mode indicator
- Keyboard shortcuts

### Step 9: Undo/Redo (30 min)
- Wire up history to all mutations
- Ctrl+Z / Ctrl+Shift+Z
- Verify: creating, moving, editing, deleting all undo correctly

### Step 10: SBD Serialization (1-2 hrs)
- `sbd-serializer.ts` — converts engine state to SBD markdown string
- `sbd-parser.ts` — parses SBD markdown string back to engine state
- `DebugPanel.tsx` — shows live SBD output at bottom of screen
- Export button (copy to clipboard)
- Import button (paste from clipboard)
- Verify: export → clear → import roundtrips correctly

---

## Visual Design Guidelines for the PoC

Keep it minimal but not ugly. Think: clean, slightly warm, like a real tool.

- **Background:** Light warm gray `#f8f7f5` with a subtle dot grid (dots: `#e0ddd8`)
- **Content blocks:** White `#ffffff` with `1px solid #e2e8f0` border, `border-radius: 8px`, subtle shadow `0 1px 3px rgba(0,0,0,0.08)`
- **Selected state:** Blue border `#3b82f6`, outer glow `0 0 0 2px rgba(59,130,246,0.2)`
- **Toolbar:** Left sidebar, `48px` wide, dark background `#1e1e2e`, icon buttons with tooltip on hover
- **Drawing strokes:** Default color `#1e1e2e`, smooth anti-aliased SVG paths
- **Shapes:** roughjs with `roughness: 1` by default for the hand-drawn look
- **Font in blocks:** System font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Cursor changes:** `grab` on blocks in select mode, `crosshair` in draw/shape mode, `text` in text mode

---

## Key Technical Notes

1. **BlockNote editors are moderately expensive.** Each `useCreateBlockNote()` creates a full ProseMirror editor instance under the hood. For the PoC with ~20 blocks, this is fine — keep all editors mounted. For production (100+ blocks), you'd want to virtualize: only mount BlockNote editors for blocks visible in the viewport, and render others as static HTML. BlockNote's `blocksToHTMLLossy()` can generate a static preview.

2. **BlockNote CSS.** Import `@blocknote/mantine/style.css` at the app level. You may need to scope or override some styles so BlockNote's UI (slash menu popups, formatting toolbar) doesn't conflict with the canvas. The slash menu and formatting toolbar are rendered via portals, so they'll appear above the canvas layers automatically — but test z-index.

2. **SVG vs Canvas for drawing.** Use SVG for the PoC. It's easier to debug and integrate with React. Canvas would be better for performance at 1000+ strokes, but that's not a PoC concern.

3. **Event handling priority.** The pointer event flow: InteractionLayer catches everything → based on mode and hit test, delegates to the right handler. Content blocks use `stopPropagation` when in edit mode to prevent canvas interactions. **Critical: BlockNote has its own drag handles** for reordering blocks *within* a content node. These must work when in edit mode but not interfere with dragging the whole content node on the canvas. The click shield pattern (transparent overlay when not editing) handles this cleanly — BlockNote only receives events when the block is in edit mode.

4. **Zoom performance.** Apply the viewport transform via CSS `transform` on the layers, not by recalculating positions. This means the browser's compositor handles zoom, which is fast.

5. **History implementation.** For the PoC, use simple full-state snapshots (JSON clone of all nodes). This is O(n) memory but trivially correct. A production version would use command-based undo with inverse operations.

6. **Don't over-engineer.** This is a PoC. Hardcode defaults. Skip edge cases. No configuration files. No theme system. No plugin architecture. Get the core interaction loop working and looking good.
