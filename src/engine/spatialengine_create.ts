// spatialengine_create.ts — tool activation + convenience node-creation operations
// for SpatialEngine (the agent/programmatic authoring API).
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import { nanoid } from "nanoid";
import type {
  ShapeNode,
  TextNode,
  StickyNoteNode,
  ContentNode,
  FrameNode,
  ImageNode,
  DrawNode,
  EdgeNode,
  Mode,
  EdgeType,
  HandleSide,
} from "./types";
import type { SpatialEngine } from "./SpatialEngine";

export function activateTool(engine: SpatialEngine, config: {
  mode: Mode;
  color?: string;
  width?: number;
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
}): void {
  engine.setMode(config.mode);
  if (config.color !== undefined) engine.activeTool.color = config.color;
  if (config.width !== undefined) engine.activeTool.width = config.width;
  if (config.shapeType !== undefined) engine.activeTool.shapeType = config.shapeType;
  if (config.fillColor !== undefined) engine.activeTool.fillColor = config.fillColor;
  if (config.fillStyle !== undefined) engine.activeTool.fillStyle = config.fillStyle;
  if (config.strokeStyle !== undefined) engine.activeTool.strokeStyle = config.strokeStyle;
  if (config.roughness !== undefined) engine.activeTool.roughness = config.roughness;
  if (config.opacity !== undefined) engine.activeTool.opacity = config.opacity;
  if (config.fontSize !== undefined) engine.activeTool.fontSize = config.fontSize;
  if (config.fontFamily !== undefined) engine.activeTool.fontFamily = config.fontFamily;
  if (config.textAlign !== undefined) engine.activeTool.textAlign = config.textAlign;
  if (config.edgeType !== undefined) engine.activeTool.edgeType = config.edgeType;
  if (config.arrowHead !== undefined) engine.activeTool.arrowHead = config.arrowHead;
  if (config.arrowTail !== undefined) engine.activeTool.arrowTail = config.arrowTail;
  engine.emit("change");
}

export function createShape(
  engine: SpatialEngine,
  shape: "rect" | "ellipse" | "diamond" | "line" | "arrow",
  x: number,
  y: number,
  w: number,
  h: number,
  options?: {
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    fillStyle?: "hachure" | "cross-hatch" | "solid";
    roughness?: number;
    opacity?: number;
    label?: string;
    labelFontSize?: number;
    strokeStyle?: "solid" | "dashed" | "dotted";
    edgeStyle?: "sharp" | "round";
  },
): string {
  const isLinear = shape === "line" || shape === "arrow";
  const data: ShapeNode["data"] = {
    shape,
    stroke: options?.stroke ?? engine.activeTool.color,
    strokeWidth: options?.strokeWidth ?? engine.activeTool.width,
    fill: options?.fill ?? engine.activeTool.fillColor ?? undefined,
    fillStyle: options?.fillStyle ?? engine.activeTool.fillStyle ?? undefined,
    strokeStyle: options?.strokeStyle ?? engine.activeTool.strokeStyle ?? undefined,
    roughness: options?.roughness ?? engine.activeTool.roughness ?? 1,
    opacity: options?.opacity ?? engine.activeTool.opacity ?? 1,
    label: options?.label ?? undefined,
    labelFontSize: options?.labelFontSize ?? undefined,
    edgeStyle: options?.edgeStyle ?? undefined,
  };
  if (isLinear) {
    data.startPoint = [0, 0];
    data.endPoint = [w, h];
  }
  const id = nanoid(10);
  engine.addNode({
    id,
    type: "shape",
    x, y, w, h,
    z: engine.nextZ(),
    data,
  } as ShapeNode);
  return id;
}

export function createText(
  engine: SpatialEngine,
  text: string,
  x: number,
  y: number,
  options?: {
    w?: number;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    align?: "left" | "center" | "right";
    opacity?: number;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: "solid" | "dashed" | "dotted";
  },
): string {
  const id = nanoid(10);
  const w = options?.w ?? 200;
  const h: number = estimateTextBlockHeight(text, options?.fontSize ?? 16, w);
  engine.addNode({
    id,
    type: "text",
    x, y, w, h,
    z: engine.nextZ(),
    data: {
      text,
      fontSize: options?.fontSize ?? 16,
      fontFamily: options?.fontFamily ?? "sans-serif",
      color: options?.color ?? "#1e1e2e",
      align: options?.align ?? "left",
      opacity: options?.opacity ?? 1,
      borderColor: options?.borderColor ?? undefined,
      borderWidth: options?.borderWidth ?? undefined,
      borderStyle: options?.borderStyle ?? undefined,
    },
  } as TextNode);
  return id;
}

/** Estimate text block height from rough line count. */
function estimateTextBlockHeight(text: string, fontSize: number, w: number): number {
  const avgCharWidth = fontSize * 0.6;
  const charsPerLine = Math.max(1, Math.floor(w / avgCharWidth));
  const lines = text.split("\n").reduce((count, paragraph) => {
    return count + Math.max(1, Math.ceil(paragraph.length / charsPerLine));
  }, 0);
  return lines * fontSize * 1.4 + 16;
}

export function createSticky(
  engine: SpatialEngine,
  text: string,
  x: number,
  y: number,
  options?: {
    w?: number;
    h?: number;
    color?: string;
    fontSize?: number;
    opacity?: number;
    edgeStyle?: "sharp" | "round";
  },
): string {
  const id = nanoid(10);
  engine.addNode({
    id,
    type: "sticky",
    x, y,
    w: options?.w ?? 200,
    h: options?.h ?? 150,
    z: engine.nextZ(),
    data: {
      text,
      color: options?.color ?? "#FEF3C7",
      fontSize: options?.fontSize ?? 14,
      opacity: options?.opacity ?? 1,
      edgeStyle: options?.edgeStyle ?? undefined,
    },
  } as StickyNoteNode);
  return id;
}

export function createContentBlock(
  engine: SpatialEngine,
  blocks: unknown[],
  x: number,
  y: number,
  options?: {
    w?: number;
    h?: number | "auto";
    markdown?: string;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: "solid" | "dashed" | "dotted";
    opacity?: number;
    edgeStyle?: "sharp" | "round";
  },
): string {
  const id = nanoid(10);
  engine.addNode({
    id,
    type: "content",
    x, y,
    w: options?.w ?? 300,
    h: options?.h ?? "auto",
    z: engine.nextZ(),
    data: {
      blocks,
      markdown: options?.markdown ?? undefined,
      borderColor: options?.borderColor ?? undefined,
      borderWidth: options?.borderWidth ?? undefined,
      borderStyle: options?.borderStyle ?? undefined,
      opacity: options?.opacity ?? undefined,
      edgeStyle: options?.edgeStyle ?? undefined,
    },
  } as ContentNode);
  return id;
}

export function createFrame(
  engine: SpatialEngine,
  x: number,
  y: number,
  w: number,
  h: number,
  options?: {
    label?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: "solid" | "dashed" | "dotted";
    opacity?: number;
    slideOrder?: number;
    devicePreset?: string;
  },
): string {
  const id = nanoid(10);
  engine.addNode({
    id,
    type: "frame",
    x, y, w, h,
    z: engine.nextZ(),
    data: {
      label: options?.label ?? undefined,
      backgroundColor: options?.backgroundColor ?? undefined,
      borderColor: options?.borderColor ?? undefined,
      borderWidth: options?.borderWidth ?? undefined,
      borderStyle: options?.borderStyle ?? undefined,
      opacity: options?.opacity ?? undefined,
      slideOrder: options?.slideOrder ?? undefined,
      devicePreset: options?.devicePreset ?? undefined,
    },
  } as FrameNode);
  return id;
}

export function createImage(
  engine: SpatialEngine,
  src: string,
  x: number,
  y: number,
  options?: {
    w?: number;
    h?: number;
    alt?: string;
    opacity?: number;
    flipH?: boolean;
    flipV?: boolean;
    borderColor?: string;
    borderWidth?: number;
    borderStyle?: "solid" | "dashed" | "dotted";
  },
): string {
  const id = nanoid(10);
  engine.addNode({
    id,
    type: "image",
    x, y,
    w: options?.w ?? 200,
    h: options?.h ?? 150,
    z: engine.nextZ(),
    data: {
      src,
      alt: options?.alt ?? undefined,
      opacity: options?.opacity ?? 1,
      flipH: options?.flipH ?? undefined,
      flipV: options?.flipV ?? undefined,
      borderColor: options?.borderColor ?? undefined,
      borderWidth: options?.borderWidth ?? undefined,
      borderStyle: options?.borderStyle ?? undefined,
    },
  } as ImageNode);
  return id;
}

export function createDrawStroke(
  engine: SpatialEngine,
  points: Array<[number, number, number?]>,
  options?: {
    color?: string;
    width?: number;
    tool?: "pen" | "pencil" | "highlighter" | "vector";
    opacity?: number;
    fill?: string;
    fillStyle?: "hachure" | "cross-hatch" | "solid";
    strokeStyle?: "solid" | "dashed" | "dotted";
  },
): string {
  if (points.length === 0) throw new Error("createDrawStroke: must provide at least one point");

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [px, py] of points) {
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  }

  const relativePoints = points.map(
    ([px, py, p]) => [px - minX, py - minY, p ?? 0.5] as [number, number, number],
  );

  const id = nanoid(10);
  engine.addNode({
    id,
    type: "draw",
    x: minX,
    y: minY,
    w: Math.max(maxX - minX, 1),
    h: Math.max(maxY - minY, 1),
    z: engine.nextZ(),
    data: {
      tool: options?.tool ?? "pen",
      points: relativePoints,
      color: options?.color ?? engine.activeTool.color,
      strokeWidth: options?.width ?? engine.activeTool.width,
      opacity: options?.opacity ?? engine.activeTool.opacity ?? 1,
      fill: options?.fill ?? undefined,
      fillStyle: options?.fillStyle ?? undefined,
      strokeStyle: options?.strokeStyle ?? undefined,
    },
  } as DrawNode);
  return id;
}

export function createEdge(
  engine: SpatialEngine,
  fromId: string,
  toId: string,
  options?: {
    label?: string;
    color?: string;
    strokeWidth?: number;
    edgeType?: EdgeType;
    arrowHead?: "none" | "arrow" | "filled" | "dot";
    arrowTail?: "none" | "arrow" | "filled" | "dot";
    sourceHandle?: HandleSide;
    targetHandle?: HandleSide;
    style?: "solid" | "dashed" | "dotted";
    animated?: boolean;
    animatedDirection?: "forward" | "reverse" | "both" | "bop";
    sourcePort?: string;
    targetPort?: string;
    roughness?: number;
    attachmentGap?: number;
  },
): string {
  if (!engine.nodes.has(fromId)) throw new Error(`createEdge: source node "${fromId}" not found`);
  if (!engine.nodes.has(toId)) throw new Error(`createEdge: target node "${toId}" not found`);

  const id = nanoid(10);

  // Edges store zero bounds — the renderer derives geometry from fromId/toId
  // at draw time. Matches SpatialCanvas.tsx:3169, templates/index.ts, etc.
  engine.addNode({
    id,
    type: "edge",
    x: 0, y: 0, w: 0, h: 0,
    z: engine.nextZ(),
    data: {
      fromId,
      toId,
      label: options?.label ?? undefined,
      style: options?.style ?? "solid",
      color: options?.color ?? engine.activeTool.color,
      strokeWidth: options?.strokeWidth ?? engine.activeTool.width,
      arrowHead: options?.arrowHead ?? "arrow",
      arrowTail: options?.arrowTail ?? "none",
      edgeType: options?.edgeType ?? engine.activeTool.edgeType ?? "bezier",
      animated: options?.animated ?? undefined,
      animatedDirection: options?.animatedDirection ?? undefined,
      sourceHandle: options?.sourceHandle ?? undefined,
      targetHandle: options?.targetHandle ?? undefined,
      sourcePort: options?.sourcePort ?? undefined,
      targetPort: options?.targetPort ?? undefined,
      roughness: options?.roughness ?? undefined,
      attachmentGap: options?.attachmentGap ?? undefined,
    },
  } as EdgeNode);
  return id;
}
