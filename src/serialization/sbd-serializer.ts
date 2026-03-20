import type {
  SpatialNode,
  ContentNode,
  DrawNode,
  ShapeNode,
  EdgeNode,
  ImageNode,
  TextNode,
  StickyNoteNode,
  FrameNode,
} from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
import { blocksToMarkdown } from "./blocknote-markdown";
import { simplifyStroke } from "./stroke-utils";

export interface SerializeOptions {
  background?: BoardBackground;
  originView?: { x: number; y: number; zoom: number };
}

export async function serializeToSBD(nodes: SpatialNode[], options?: SerializeOptions): Promise<string> {
  const lines: string[] = [];

  // Meta
  const metaAttrs = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (options?.background && options.background !== "dot-grid") {
    metaAttrs.push(`background="${options.background}"`);
  }
  if (options?.originView) {
    const v = options.originView;
    metaAttrs.push(`originView="${v.x},${v.y},${v.zoom}"`);
  }
  lines.push(`<!--@meta ${metaAttrs.join(" ")} -->`);
  lines.push("");

  // Frame nodes (serialized first so they exist before children on load)
  const frameNodes = nodes
    .filter((n): n is FrameNode => n.type === "frame")
    .sort((a, b) => a.z - b.z || a.y - b.y || a.x - b.x);

  for (const node of frameNodes) {
    const h = node.h === "auto" ? "auto" : Math.round(node.h as number);
    const attrs: string[] = [
      `id="${node.id}"`,
      `x="${Math.round(node.x)}"`,
      `y="${Math.round(node.y)}"`,
      `w="${Math.round(node.w)}"`,
      `h="${h}"`,
      `z="${node.z}"`,
    ];
    if (node.data.label) attrs.push(`label="${node.data.label.replace(/"/g, "&quot;")}"`);
    if (node.data.backgroundColor) attrs.push(`backgroundColor="${node.data.backgroundColor}"`);
    if (node.data.borderColor) attrs.push(`borderColor="${node.data.borderColor}"`);
    if (node.data.borderWidth != null) attrs.push(`borderWidth="${node.data.borderWidth}"`);
    if (node.data.borderStyle && node.data.borderStyle !== "solid") attrs.push(`borderStyle="${node.data.borderStyle}"`);
    if (node.data.opacity !== undefined && node.data.opacity !== 1) attrs.push(`opacity="${node.data.opacity}"`);
    if (node.data.slideOrder != null) attrs.push(`slideOrder="${node.data.slideOrder}"`);
    if (node.data.transition && node.data.transition !== "pan") attrs.push(`transition="${node.data.transition}"`);
    if (node.data.transitionDuration != null) attrs.push(`transitionDuration="${node.data.transitionDuration}"`);
    if (node.rotation) attrs.push(`rotation="${node.rotation}"`);
    if (node.locked) attrs.push(`locked="true"`);
    if (node.groupId) attrs.push(`group="${node.groupId}"`);
    lines.push(`<!--@frame ${attrs.join(" ")} -->`);
    lines.push("");
  }

  // Content blocks: sorted by z, then y, then x
  const contentNodes = nodes
    .filter((n): n is ContentNode => n.type === "content")
    .sort((a, b) => a.z - b.z || a.y - b.y || a.x - b.x);

  for (const node of contentNodes) {
    const attrs = [
      `id="${node.id}"`,
      `x="${Math.round(node.x)}"`,
      `y="${Math.round(node.y)}"`,
      `w="${Math.round(node.w)}"`,
      `h="${node.h}"`,
      `z="${node.z}"`,
    ];
    if (node.rotation) attrs.push(`rotation="${node.rotation}"`);
    if (node.locked) attrs.push(`locked="true"`);
    if (node.groupId) attrs.push(`group="${node.groupId}"`);
    if (node.data.borderColor) attrs.push(`borderColor="${node.data.borderColor}"`);
    if (node.data.borderWidth != null) attrs.push(`borderWidth="${node.data.borderWidth}"`);
    if (node.data.borderStyle && node.data.borderStyle !== "solid") attrs.push(`borderStyle="${node.data.borderStyle}"`);
    if (node.data.opacity !== undefined && node.data.opacity !== 1) attrs.push(`opacity="${node.data.opacity}"`);
    lines.push(`<!--@block ${attrs.join(" ")} -->`);
    const markdown =
      node.data.blocks.length > 0
        ? await blocksToMarkdown(node.data.blocks)
        : "";
    lines.push(markdown);
    lines.push("");
  }

  // Draw nodes
  const drawNodes = nodes.filter((n): n is DrawNode => n.type === "draw");
  for (const node of drawNodes) {
    const attrs = [
      `id="${node.id}"`,
      `x="${Math.round(node.x)}"`,
      `y="${Math.round(node.y)}"`,
      `z="${node.z}"`,
      `tool="${node.data.tool}"`,
      `color="${node.data.color}"`,
      `width="${node.data.strokeWidth}"`,
    ];
    if (node.data.opacity !== undefined && node.data.opacity !== 1) {
      attrs.push(`opacity="${node.data.opacity}"`);
    }
    if (node.data.fill) {
      attrs.push(`fill="${node.data.fill}"`);
    }
    if (node.data.fillStyle && node.data.fillStyle !== "hachure") {
      attrs.push(`fillStyle="${node.data.fillStyle}"`);
    }
    if (node.rotation) attrs.push(`rotation="${node.rotation}"`);
    if (node.locked) attrs.push(`locked="true"`);
    if (node.groupId) attrs.push(`group="${node.groupId}"`);
    lines.push(`<!--@draw ${attrs.join(" ")} -->`);
    // Simplify points (RDP) before serializing to reduce SBD size
    const simplified = simplifyStroke([...node.data.points], 1);
    const pointData = simplified
      .map(
        ([px, py, pressure]) =>
          `${(px + node.x).toFixed(1)},${(py + node.y).toFixed(1)},${pressure.toFixed(2)}`
      )
      .join(" ");
    lines.push(pointData);
    lines.push("");
  }

  // Shape nodes
  const shapeNodes = nodes.filter((n): n is ShapeNode => n.type === "shape");
  for (const node of shapeNodes) {
    const h = node.h === "auto" ? "auto" : Math.round(node.h as number);
    const attrs: string[] = [
      `id="${node.id}"`,
      `x="${Math.round(node.x)}"`,
      `y="${Math.round(node.y)}"`,
      `w="${Math.round(node.w)}"`,
      `h="${h}"`,
      `z="${node.z}"`,
      `tool="shape"`,
      `shape="${node.data.shape}"`,
      `color="${node.data.stroke}"`,
      `stroke="${node.data.strokeWidth}"`,
      `roughness="${node.data.roughness}"`,
    ];
    if (node.data.fill) {
      attrs.push(`fill="${node.data.fill}"`);
    }
    if (node.data.fillStyle && node.data.fillStyle !== "hachure") {
      attrs.push(`fillStyle="${node.data.fillStyle}"`);
    }
    if (node.data.strokeStyle && node.data.strokeStyle !== "solid") {
      attrs.push(`strokeStyle="${node.data.strokeStyle}"`);
    }
    if (node.data.edgeStyle && node.data.edgeStyle !== "sharp") {
      attrs.push(`edgeStyle="${node.data.edgeStyle}"`);
    }
    if (node.data.opacity !== undefined && node.data.opacity !== 1) {
      attrs.push(`opacity="${node.data.opacity}"`);
    }
    if (node.data.startPoint) {
      attrs.push(`startPt="${node.data.startPoint[0].toFixed(1)},${node.data.startPoint[1].toFixed(1)}"`);
    }
    if (node.data.endPoint) {
      attrs.push(`endPt="${node.data.endPoint[0].toFixed(1)},${node.data.endPoint[1].toFixed(1)}"`);
    }
    if (node.data.label) attrs.push(`label="${node.data.label.replace(/"/g, "&quot;")}"`);
    if (node.data.labelFontSize) attrs.push(`labelFontSize="${node.data.labelFontSize}"`);
    if (node.data.labelFontFamily && node.data.labelFontFamily !== "Excalifont")
      attrs.push(`labelFontFamily="${node.data.labelFontFamily}"`);
    if (node.data.labelAlign && node.data.labelAlign !== "center")
      attrs.push(`labelAlign="${node.data.labelAlign}"`);
    if (node.rotation) attrs.push(`rotation="${node.rotation}"`);
    if (node.locked) attrs.push(`locked="true"`);
    if (node.groupId) attrs.push(`group="${node.groupId}"`);
    lines.push(`<!--@draw ${attrs.join(" ")} -->`);
    lines.push("");
  }

  // Text nodes
  const textNodes = nodes.filter((n): n is TextNode => n.type === "text");
  for (const node of textNodes) {
    const attrs: string[] = [
      `id="${node.id}"`,
      `x="${Math.round(node.x)}"`,
      `y="${Math.round(node.y)}"`,
      `w="${Math.round(node.w)}"`,
      `z="${node.z}"`,
      `fontSize="${node.data.fontSize}"`,
      `fontFamily="${node.data.fontFamily}"`,
      `color="${node.data.color}"`,
      `align="${node.data.align}"`,
    ];
    if (node.data.opacity !== undefined && node.data.opacity !== 1) {
      attrs.push(`opacity="${node.data.opacity}"`);
    }
    if (node.rotation) attrs.push(`rotation="${node.rotation}"`);
    if (node.locked) attrs.push(`locked="true"`);
    if (node.groupId) attrs.push(`group="${node.groupId}"`);
    lines.push(`<!--@text ${attrs.join(" ")} -->`);
    lines.push(node.data.text);
    lines.push("");
  }

  // Image nodes
  const imageNodes = nodes.filter((n): n is ImageNode => n.type === "image");
  for (const node of imageNodes) {
    const attrs = [
      `id="${node.id}"`,
      `x="${Math.round(node.x)}"`,
      `y="${Math.round(node.y)}"`,
      `w="${Math.round(node.w)}"`,
      `h="${Math.round(node.h as number)}"`,
      `z="${node.z}"`,
      `src="${node.data.src.replace(/"/g, "&quot;")}"`,
    ];
    if (node.rotation) attrs.push(`rotation="${node.rotation}"`);
    if (node.locked) attrs.push(`locked="true"`);
    if (node.groupId) attrs.push(`group="${node.groupId}"`);
    if (node.data.alt) attrs.push(`alt="${node.data.alt.replace(/"/g, "&quot;")}"`);
    if (node.data.opacity != null && node.data.opacity !== 1) attrs.push(`opacity="${node.data.opacity}"`);
    if (node.data.borderColor) attrs.push(`borderColor="${node.data.borderColor}"`);
    if (node.data.borderWidth != null) attrs.push(`borderWidth="${node.data.borderWidth}"`);
    if (node.data.borderStyle && node.data.borderStyle !== "solid") attrs.push(`borderStyle="${node.data.borderStyle}"`);
    lines.push(`<!--@image ${attrs.join(" ")} -->`);
    lines.push("");
  }

  // Edge nodes
  const edgeNodes = nodes.filter((n): n is EdgeNode => n.type === "edge");
  for (const node of edgeNodes) {
    const attrs: string[] = [
      `id="${node.id}"`,
      `from="${node.data.fromId}"`,
      `to="${node.data.toId}"`,
      `style="${node.data.style}"`,
      `color="${node.data.color}"`,
    ];
    if (node.data.label) {
      attrs.push(`label="${node.data.label}"`);
    }
    if (node.data.strokeWidth && node.data.strokeWidth !== 1) {
      attrs.push(`strokeWidth="${node.data.strokeWidth}"`);
    }
    if (node.data.arrowHead && node.data.arrowHead !== "none") {
      attrs.push(`arrowHead="${node.data.arrowHead}"`);
    }
    if (node.data.arrowTail && node.data.arrowTail !== "none") {
      attrs.push(`arrowTail="${node.data.arrowTail}"`);
    }
    if (node.data.arrowHeadSize) {
      attrs.push(`arrowHeadSize="${node.data.arrowHeadSize}"`);
    }
    if (node.data.arrowTailSize) {
      attrs.push(`arrowTailSize="${node.data.arrowTailSize}"`);
    }
    if (node.data.edgeType && node.data.edgeType !== "bezier") {
      attrs.push(`edgeType="${node.data.edgeType}"`);
    }
    if (node.data.animated) {
      attrs.push(`animated="true"`);
    }
    if (node.data.animatedDirection && node.data.animatedDirection !== "forward") {
      attrs.push(`animatedDirection="${node.data.animatedDirection}"`);
    }
    if (node.data.sourceHandle) {
      attrs.push(`sourceHandle="${node.data.sourceHandle}"`);
    }
    if (node.data.targetHandle) {
      attrs.push(`targetHandle="${node.data.targetHandle}"`);
    }
    if (node.data.sourcePort) {
      attrs.push(`sourcePort="${node.data.sourcePort.replace(/"/g, "&quot;")}"`);
    }
    if (node.data.targetPort) {
      attrs.push(`targetPort="${node.data.targetPort.replace(/"/g, "&quot;")}"`);
    }
    if (node.data.sourceT != null) {
      attrs.push(`sourceT="${node.data.sourceT}"`);
    }
    if (node.data.targetT != null) {
      attrs.push(`targetT="${node.data.targetT}"`);
    }
    if (node.data.attachmentGap != null && node.data.attachmentGap !== 0) {
      attrs.push(`attachmentGap="${node.data.attachmentGap}"`);
    }
    if (node.data.roughness != null && node.data.roughness !== 0) {
      attrs.push(`roughness="${node.data.roughness}"`);
    }
    if (node.data.midpointOffset != null && node.data.midpointOffset !== 0.5) {
      attrs.push(`midpointOffset="${node.data.midpointOffset}"`);
    }
    if (node.data.curveOffset && (node.data.curveOffset[0] !== 0 || node.data.curveOffset[1] !== 0)) {
      attrs.push(`curveOffset="${node.data.curveOffset[0]},${node.data.curveOffset[1]}"`);
    }
    if (node.locked) attrs.push(`locked="true"`);
    if (node.groupId) attrs.push(`group="${node.groupId}"`);
    lines.push(`<!--@edge ${attrs.join(" ")} -->`);
    lines.push("");
  }

  // Sticky note nodes
  const stickyNodes = nodes.filter((n): n is StickyNoteNode => n.type === "sticky");
  for (const node of stickyNodes) {
    const attrs: string[] = [
      `id="${node.id}"`,
      `x="${Math.round(node.x)}"`,
      `y="${Math.round(node.y)}"`,
      `w="${Math.round(node.w)}"`,
      `h="${node.h}"`,
      `z="${node.z}"`,
      `color="${node.data.color}"`,
    ];
    if (node.data.fontSize && node.data.fontSize !== 16) {
      attrs.push(`fontSize="${node.data.fontSize}"`);
    }
    if (node.data.opacity !== undefined && node.data.opacity !== 1) {
      attrs.push(`opacity="${node.data.opacity}"`);
    }
    if (node.rotation) attrs.push(`rotation="${node.rotation}"`);
    if (node.locked) attrs.push(`locked="true"`);
    if (node.groupId) attrs.push(`group="${node.groupId}"`);
    lines.push(`<!--@sticky ${attrs.join(" ")} -->`);
    lines.push(node.data.text);
    lines.push("");
  }

  return lines.join("\n");
}
