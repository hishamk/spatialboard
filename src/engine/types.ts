/** Built-in node types. Custom types use arbitrary strings. */
export type BuiltinNodeType = "blocknote" | "draw" | "shape" | "edge" | "image" | "text" | "frame" | "sticky" | "youtube";

/** @deprecated Use `BuiltinNodeType` for built-in types or `string` for extensible usage. */
export type NodeType = BuiltinNodeType;
export type Mode = "select" | "draw" | "shape" | "text" | "note" | "sticky" | "edge" | "erase" | "frame" | "hand" | "laser";

/**
 * A toolbar-visibility key for the `tools` allowlist prop on `<SpatialBoard>`.
 * Covers every creation Mode plus the non-Mode ToolStrip affordances (the
 * `lasso` toggle + the paper/template/library/mermaid/gif content pickers).
 * When the `tools` prop is omitted the toolbar renders everything (the default,
 * so the canvas item type is byte-identical); when provided, only the listed
 * keys render. `frame` additionally gates the BottomBar's present/slides
 * controls. This is an allowlist of what the HOST wants surfaced — the engine
 * itself is unchanged.
 */
export type ToolKey = Mode | "lasso" | "paper" | "template" | "library" | "mermaid" | "gif" | "settings";

export interface SpatialNode {
  id: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number | "auto";
  z: number;
  rotation?: number;
  locked?: boolean;
  /** false = user-gesture deletion is blocked (Delete key / context menu / cut /
   *  eraser), while the node stays movable and editable — unlike `locked`, which
   *  freezes it entirely. Programmatic `deleteNode(id)` still works, so hosts
   *  can manage protected nodes themselves (e.g. workflow Start/End). */
  deletable?: boolean;
  groupId?: string;
  data?: unknown;
}

export interface BlockNoteNode extends SpatialNode {
  type: "blocknote";
  data: {
    // BlockNote's native block array — source of truth while editing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocks: any[];
    // Cached markdown (updated on blur / export)
    markdown?: string;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: StrokeStyle;
    opacity?: number;
    edgeStyle?: StrokeSharpness;
  };
}

export interface DrawNode extends SpatialNode {
  type: "draw";
  data: {
    tool: "pen" | "pencil" | "highlighter" | "eraser" | "vector";
    points: Array<[number, number, number]>;
    color: string;
    strokeWidth: number;
    opacity?: number;
    fill?: string;
    fillStyle?: FillStyle;
    strokeStyle?: StrokeStyle;
  };
}

export interface ShapeNode extends SpatialNode {
  type: "shape";
  data: {
    shape: ShapeType;
    fill?: string;
    fillStyle?: FillStyle;
    stroke: string;
    strokeWidth: number;
    strokeStyle?: StrokeStyle;
    roughness: number;
    opacity?: number;
    /** Corner style for rect shapes: "sharp" (default) or "round" */
    edgeStyle?: StrokeSharpness;
    label?: string;
    labelFontSize?: number;
    labelFontFamily?: string;
    labelAlign?: TextAlign;
    /** Relative to node (x,y) — only for line/arrow */
    startPoint?: [number, number];
    endPoint?: [number, number];
  };
}

export type StrokeStyle = "solid" | "dashed" | "dotted";
export type EdgeType = "straight" | "bezier" | "smoothstep" | "step";
export type HandleSide = "top" | "right" | "bottom" | "left";
export type FillStyle = "hachure" | "cross-hatch" | "solid";
export type TextAlign = "left" | "center" | "right";
export type StrokeSharpness = "sharp" | "round";
export type ArrowMarker = "none" | "arrow" | "filled" | "dot";
export type ShapeType = "rect" | "ellipse" | "diamond" | "line" | "arrow";

export interface EdgeNode extends SpatialNode {
  type: "edge";
  data: {
    fromId: string;
    toId: string;
    label?: string;
    style: StrokeStyle;
    color: string;
    strokeWidth: number;
    arrowHead?: ArrowMarker;
    arrowTail?: ArrowMarker;
    arrowHeadSize?: number;
    arrowTailSize?: number;
    edgeType?: EdgeType;
    animated?: boolean;
    animatedDirection?: "forward" | "reverse" | "both" | "bop";
    sourceHandle?: HandleSide;
    targetHandle?: HandleSide;
    /** Port ID on the source node (for data-flow edges). */
    sourcePort?: string;
    /** Port ID on the target node (for data-flow edges). */
    targetPort?: string;
    /** 0–1 ratio controlling the kink position in step/smoothstep edges (default 0.5) */
    midpointOffset?: number;
    /** [dx, dy] offset from the natural bezier midpoint (canvas units) */
    curveOffset?: [number, number];
    /** 0 = architect (clean), 1 = artist, 2 = cartoonist (hand-drawn via RoughJS) */
    roughness?: number;
    /** Parametric position [0,1) along source node perimeter (clockwise from top-center).
     *  When set, overrides sourceHandle for free-form edge connections. */
    sourceT?: number;
    /** Parametric position [0,1) along target node perimeter (clockwise from top-center).
     *  When set, overrides targetHandle for free-form edge connections. */
    targetT?: number;
    /** Gap (in canvas units) between arrow tip and node border. Default 0. */
    attachmentGap?: number;
  };
}

export interface ImageNode extends SpatialNode {
  type: "image";
  data: {
    /** Data URL (e.g. from paste) or HTTP(S) URL */
    src: string;
    alt?: string;
    flipH?: boolean;
    flipV?: boolean;
    opacity?: number;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: StrokeStyle;
    /** Non-destructive crop region as fractions (0–1) of the natural image dimensions */
    crop?: { x: number; y: number; w: number; h: number };
  };
}

export interface TextNode extends SpatialNode {
  type: "text";
  data: {
    text: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    align: TextAlign;
    opacity?: number;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: StrokeStyle;
  };
}

export type SlideTransition = "pan" | "fade" | "dissolve" | "zoom" | "none" | "fold" | "cube";

/** Default duration (ms) per transition type. */
export const TRANSITION_DEFAULTS: Record<SlideTransition, number> = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0,
};

export interface FrameNode extends SpatialNode {
  type: "frame";
  data: {
    label?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: StrokeStyle;
    opacity?: number;
    /** Explicit slide order for presentation mode. Lower numbers come first. */
    slideOrder?: number;
    /** Device preset key for fixed aspect ratio (e.g. "iphone-14-pro-max"). */
    devicePreset?: string;
    /** Transition animation used when navigating TO this slide. Default: "pan". */
    transition?: SlideTransition;
    /** Transition duration in ms. Each transition type has its own default if omitted. */
    transitionDuration?: number;
  };
}

export interface StickyNoteNode extends SpatialNode {
  type: "sticky";
  data: {
    text: string;
    color: string;
    fontSize?: number;
    opacity?: number;
    edgeStyle?: StrokeSharpness;
  };
}

export interface YouTubeNode extends SpatialNode {
  type: "youtube";
  data: {
    videoId: string;
    url: string;
    opacity?: number;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: StrokeStyle;
  };
}

export type AnySpatialNode =
  | BlockNoteNode
  | DrawNode
  | ShapeNode
  | EdgeNode
  | ImageNode
  | TextNode
  | FrameNode
  | StickyNoteNode
  | YouTubeNode;

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

export interface ActiveTool {
  tool: string;
  color: string;
  width: number;
  shapeType?: ShapeType;
  fillColor?: string;
  fillStyle?: FillStyle;
  strokeStyle?: StrokeStyle;
  /** Corner sharpness for shape creation (rect/diamond rounding). */
  edgeStyle?: StrokeSharpness;
  roughness?: number;
  opacity?: number;
  fontSize?: number;
  fontFamily?: string;
  textAlign?: TextAlign;
  // Sticky tool settings
  stickyColor?: string;
  stickyFontSize?: number;
  // Edge tool settings
  edgeType?: EdgeType;
  arrowHead?: ArrowMarker;
  arrowTail?: ArrowMarker;
  attachmentGap?: number;
}

/**
 * JSON-safe snapshot of the engine state, optimized for agent/LLM consumption.
 * Every field is plain data — no Maps, Sets, or class instances.
 */
export interface AgentCanvasState {
  mode: Mode;
  viewport: Viewport;
  selection: string[];
  activeTool: ActiveTool;
  /** Total nodes on the canvas (regardless of `nodes[]` truncation). */
  nodeCount: number;
  /** Number of nodes returned in `nodes[]` after limit + filters. */
  returnedCount: number;
  /** True if `nodes[]` was truncated by `limit` (more nodes exist than returned). */
  truncated: boolean;
  canUndo: boolean;
  canRedo: boolean;
  nodes: Array<{
    id: string;
    type: string;
    x: number;
    y: number;
    w: number;
    h: number | "auto";
    rotation?: number;
    locked?: boolean;
    groupId?: string;
    /** Extracted text content (text blocks, sticky notes, shape labels). */
    text?: string;
    /** Shape / edge / frame label. */
    label?: string;
    /** Primary color (stroke / fill / color). */
    color?: string;
  }>;
}

/** Filters/pagination for `SpatialEngine.getAgentState()`. */
export interface AgentStateOptions {
  /** Maximum nodes to return. Default 200. */
  limit?: number;
  /** Restrict to specific node ids. */
  nodeIds?: string[];
  /** Restrict to specific node types. */
  types?: NodeType[];
  /** Restrict to nodes overlapping this canvas-coordinate rect. */
  region?: { x: number; y: number; w: number; h: number };
}

