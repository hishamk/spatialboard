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
        blocks: any[];
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
        borderStyle?: "solid" | "dashed" | "dotted";
        /** Non-destructive crop region as fractions (0–1) of the natural image dimensions */
        crop?: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
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
export declare const TRANSITION_DEFAULTS: Record<SlideTransition, number>;
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
export type AnySpatialNode = ContentNode | DrawNode | ShapeNode | EdgeNode | ImageNode | TextNode | FrameNode | StickyNoteNode | YouTubeNode;
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
    edgeType?: EdgeType;
    arrowHead?: "none" | "arrow" | "filled" | "dot";
    arrowTail?: "none" | "arrow" | "filled" | "dot";
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
    region?: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
}
