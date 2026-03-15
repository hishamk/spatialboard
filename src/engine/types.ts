/** Built-in node types. Custom types use arbitrary strings. */
export type BuiltinNodeType = "content" | "draw" | "shape" | "edge" | "image" | "text" | "frame" | "sticky" | "youtube";

/** @deprecated Use `BuiltinNodeType` for built-in types or `string` for extensible usage. */
export type NodeType = BuiltinNodeType;
export type Mode = "select" | "draw" | "shape" | "text" | "note" | "sticky" | "edge" | "erase" | "frame" | "hand" | "laser";

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
  groupId?: string;
  data?: unknown;
}

export interface ContentNode extends SpatialNode {
  type: "content";
  data: {
    // BlockNote's native block array — source of truth while editing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocks: any[];
    // Cached markdown (updated on blur / export)
    markdown?: string;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: "solid" | "dashed" | "dotted";
    opacity?: number;
    edgeStyle?: "sharp" | "round";
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
    fillStyle?: "hachure" | "cross-hatch" | "solid";
    strokeStyle?: "solid" | "dashed" | "dotted";
  };
}

export interface ShapeNode extends SpatialNode {
  type: "shape";
  data: {
    shape: "rect" | "ellipse" | "diamond" | "line" | "arrow";
    fill?: string;
    fillStyle?: "hachure" | "cross-hatch" | "solid";
    stroke: string;
    strokeWidth: number;
    strokeStyle?: "solid" | "dashed" | "dotted";
    roughness: number;
    opacity?: number;
    /** Corner style for rect shapes: "sharp" (default) or "round" */
    edgeStyle?: "sharp" | "round";
    label?: string;
    labelFontSize?: number;
    labelFontFamily?: string;
    labelAlign?: "left" | "center" | "right";
    /** Relative to node (x,y) — only for line/arrow */
    startPoint?: [number, number];
    endPoint?: [number, number];
  };
}

export type EdgeType = "straight" | "bezier" | "smoothstep" | "step";
export type HandleSide = "top" | "right" | "bottom" | "left";

export interface EdgeNode extends SpatialNode {
  type: "edge";
  data: {
    fromId: string;
    toId: string;
    label?: string;
    style: "solid" | "dashed" | "dotted";
    color: string;
    strokeWidth: number;
    arrowHead?: "none" | "arrow" | "filled" | "dot";
    arrowTail?: "none" | "arrow" | "filled" | "dot";
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
    borderStyle?: "solid" | "dashed" | "dotted";
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
    align: "left" | "center" | "right";
    opacity?: number;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: "solid" | "dashed" | "dotted";
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
    borderStyle?: "solid" | "dashed" | "dotted";
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
    edgeStyle?: "sharp" | "round";
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
    borderStyle?: "solid" | "dashed" | "dotted";
  };
}

export type AnySpatialNode =
  | ContentNode
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
  shapeType?: "rect" | "ellipse" | "diamond" | "line" | "arrow";
  fillColor?: string;
  fillStyle?: "hachure" | "cross-hatch" | "solid";
  strokeStyle?: "solid" | "dashed" | "dotted";
  roughness?: number;
  opacity?: number;
  fontSize?: number;
  fontFamily?: string;
  textAlign?: "left" | "center" | "right";
}
