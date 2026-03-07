import { nanoid } from "nanoid";
import type { ExcalidrawElement, ExcalidrawLibraryItem } from "./types";
import type {
  SpatialNode,
  ShapeNode,
  DrawNode,
  TextNode,
  FrameNode,
} from "../engine/types";

// ============================================================================
// Property mapping helpers
// ============================================================================

function mapOpacity(v: number): number | undefined {
  const o = Math.round(v) / 100;
  return o < 1 ? o : undefined;
}

function mapAngle(radians: number): number | undefined {
  if (!radians) return undefined;
  return radians * (180 / Math.PI);
}

function mapFill(bg: string): string | undefined {
  if (!bg || bg === "transparent") return undefined;
  return bg;
}

function mapFillStyle(
  style: string,
): "hachure" | "cross-hatch" | "solid" | undefined {
  if (style === "solid") return "solid";
  if (style === "cross-hatch") return "cross-hatch";
  if (style === "hachure") return "hachure";
  return undefined;
}

function mapStrokeStyle(
  style: string,
): "solid" | "dashed" | "dotted" | undefined {
  if (style === "dashed") return "dashed";
  if (style === "dotted") return "dotted";
  return undefined; // "solid" is default
}

function mapFontFamily(ff: number | undefined): string {
  switch (ff) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}

function mapTextAlign(
  align: string | undefined,
): "left" | "center" | "right" {
  if (align === "right") return "right";
  if (align === "center") return "center";
  return "left";
}

function mapEdgeStyle(
  el: ExcalidrawElement,
): "round" | undefined {
  // V2: roundness property (any type value means rounded)
  if (el.roundness) return "round";
  // V1: strokeSharpness property
  if (el.strokeSharpness === "round") return "round";
  return undefined;
}

// ============================================================================
// Element converters
// ============================================================================

function convertShape(
  el: ExcalidrawElement,
  shapeType: "rect" | "ellipse" | "diamond",
): ShapeNode {
  return {
    id: nanoid(10),
    type: "shape",
    x: el.x,
    y: el.y,
    w: el.width,
    h: el.height,
    z: 0,
    rotation: mapAngle(el.angle),
    locked: el.locked || undefined,
    data: {
      shape: shapeType,
      stroke: el.strokeColor || "#1e1e2e",
      fill: mapFill(el.backgroundColor),
      fillStyle: mapFillStyle(el.fillStyle),
      strokeWidth: el.strokeWidth || 2,
      strokeStyle: mapStrokeStyle(el.strokeStyle),
      roughness: Math.min(el.roughness ?? 1, 2),
      opacity: mapOpacity(el.opacity ?? 100),
      edgeStyle: shapeType === "rect" || shapeType === "diamond" ? mapEdgeStyle(el) : undefined,
    },
  } as ShapeNode;
}

function convertLinearElement(
  el: ExcalidrawElement,
  isArrow: boolean,
): SpatialNode[] {
  const pts = el.points ?? [[0, 0]];
  if (pts.length < 2) return [];

  const baseProps = {
    stroke: el.strokeColor || "#1e1e2e",
    fill: undefined as string | undefined,
    fillStyle: undefined as ShapeNode["data"]["fillStyle"],
    strokeWidth: el.strokeWidth || 2,
    strokeStyle: mapStrokeStyle(el.strokeStyle),
    roughness: Math.min(el.roughness ?? 1, 2),
    opacity: mapOpacity(el.opacity ?? 100),
  };

  // 2-point: single shape node
  if (pts.length === 2) {
    const [p0, p1] = pts;
    const minX = Math.min(p0[0], p1[0]);
    const minY = Math.min(p0[1], p1[1]);
    const maxX = Math.max(p0[0], p1[0]);
    const maxY = Math.max(p0[1], p1[1]);
    const w = Math.max(maxX - minX, 1);
    const h = Math.max(maxY - minY, 1);
    return [
      {
        id: nanoid(10),
        type: "shape",
        x: el.x + minX,
        y: el.y + minY,
        w,
        h,
        z: 0,
        rotation: mapAngle(el.angle),
        locked: el.locked || undefined,
        data: {
          ...baseProps,
          shape: isArrow ? "arrow" : "line",
          startPoint: [p0[0] - minX, p0[1] - minY] as [number, number],
          endPoint: [p1[0] - minX, p1[1] - minY] as [number, number],
        },
      } as ShapeNode,
    ];
  }

  // 3+ points with fill: convert as a single DrawNode to preserve the filled polygon.
  // Complex icons/logos in Excalidraw libraries use multi-point filled lines to trace
  // SVG-like paths — decomposing them into 2-point segments would lose the fill.
  const hasFill = el.backgroundColor && el.backgroundColor !== "transparent";
  if (hasFill) {
    const filled = convertFilledPolygon(el);
    if (filled) return [filled];
  }

  // 3+ points without fill: decompose into grouped segments
  const groupId = nanoid(10);
  const nodes: SpatialNode[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const minX = Math.min(p0[0], p1[0]);
    const minY = Math.min(p0[1], p1[1]);
    const maxX = Math.max(p0[0], p1[0]);
    const maxY = Math.max(p0[1], p1[1]);
    const w = Math.max(maxX - minX, 1);
    const h = Math.max(maxY - minY, 1);
    const isLast = i === pts.length - 2;
    nodes.push({
      id: nanoid(10),
      type: "shape",
      x: el.x + minX,
      y: el.y + minY,
      w,
      h,
      z: 0,
      rotation: mapAngle(el.angle),
      locked: el.locked || undefined,
      groupId,
      data: {
        ...baseProps,
        shape: isArrow && isLast ? "arrow" : "line",
        startPoint: [p0[0] - minX, p0[1] - minY] as [number, number],
        endPoint: [p1[0] - minX, p1[1] - minY] as [number, number],
      },
    } as ShapeNode);
  }
  return nodes;
}

/** Convert a multi-point filled line/arrow into a single DrawNode. */
function convertFilledPolygon(el: ExcalidrawElement): DrawNode | null {
  const pts = el.points ?? [];
  if (pts.length < 3) return null;

  // Compute bounding box
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const [px, py] of pts) {
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  }
  if (!isFinite(minX)) return null;

  // Make points relative to bounding box origin, add uniform pressure
  const relPoints: Array<[number, number, number]> = pts.map(([px, py]) => [
    px - minX,
    py - minY,
    0.5,
  ]);

  return {
    id: nanoid(10),
    type: "draw",
    x: el.x + minX,
    y: el.y + minY,
    w: Math.max(maxX - minX, 1),
    h: Math.max(maxY - minY, 1),
    z: 0,
    rotation: mapAngle(el.angle),
    locked: el.locked || undefined,
    data: {
      tool: "vector" as const,
      points: relPoints,
      color: el.strokeColor || "#1e1e2e",
      strokeWidth: el.strokeWidth || 2,
      opacity: mapOpacity(el.opacity ?? 100),
      fill: mapFill(el.backgroundColor),
      fillStyle: mapFillStyle(el.fillStyle),
    },
  } as DrawNode;
}

function convertFreedraw(el: ExcalidrawElement): DrawNode | null {
  const pts = el.points;
  if (!pts || pts.length === 0) return null;

  const pressures = el.pressures;
  const sim = el.simulatePressure !== false;

  const points: Array<[number, number, number]> = pts.map((p, i) => {
    const pressure =
      !sim && pressures && i < pressures.length ? pressures[i] : 0.5;
    return [p[0], p[1], pressure];
  });

  // Compute bounding box from points
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const [px, py] of points) {
    if (px < minX) minX = px;
    if (py < minY) minY = py;
    if (px > maxX) maxX = px;
    if (py > maxY) maxY = py;
  }
  if (!isFinite(minX)) {
    minX = 0;
    minY = 0;
    maxX = 0;
    maxY = 0;
  }

  // Make points relative to bounding box origin
  const relPoints: Array<[number, number, number]> = points.map(
    ([px, py, pr]) => [px - minX, py - minY, pr],
  );

  return {
    id: nanoid(10),
    type: "draw",
    x: el.x + minX,
    y: el.y + minY,
    w: Math.max(maxX - minX, 1),
    h: Math.max(maxY - minY, 1),
    z: 0,
    rotation: mapAngle(el.angle),
    locked: el.locked || undefined,
    data: {
      tool: "pen" as const,
      points: relPoints,
      color: el.strokeColor || "#1e1e2e",
      strokeWidth: el.strokeWidth || 2,
      opacity: mapOpacity(el.opacity ?? 100),
    },
  } as DrawNode;
}

function convertText(el: ExcalidrawElement): TextNode {
  // Prefer originalText (unwrapped) over text (which may contain Excalidraw's
  // auto-wrap line breaks). Add width padding to account for font metric
  // differences between Excalidraw's fonts and ours.
  return {
    id: nanoid(10),
    type: "text",
    x: el.x,
    y: el.y,
    w: Math.ceil((el.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: mapAngle(el.angle),
    locked: el.locked || undefined,
    data: {
      text: el.originalText || el.text || "",
      fontSize: el.fontSize || 20,
      fontFamily: mapFontFamily(el.fontFamily),
      color: el.strokeColor || "#1e1e2e",
      align: mapTextAlign(el.textAlign),
      opacity: mapOpacity(el.opacity ?? 100),
    },
  } as TextNode;
}

function convertFrame(el: ExcalidrawElement): FrameNode {
  return {
    id: nanoid(10),
    type: "frame",
    x: el.x,
    y: el.y,
    w: el.width || 400,
    h: el.height || 300,
    z: 0,
    rotation: mapAngle(el.angle),
    locked: el.locked || undefined,
    data: {
      label: el.name || undefined,
    },
  } as FrameNode;
}

// ============================================================================
// Main conversion entry point
// ============================================================================

export interface ConvertResult {
  nodes: SpatialNode[];
  groupParent: Map<string, string>;
}

/**
 * Convert an Excalidraw library item's elements into SpatialNode[].
 * Handles text binding (containerId → label on parent shape),
 * multi-point line decomposition, and group hierarchy.
 * All positions are normalized so the bounding box starts at (0,0).
 */
export function convertLibraryItem(item: ExcalidrawLibraryItem): ConvertResult {
  return convertExcalidrawElements(item.elements);
}

export function convertExcalidrawElements(
  elements: ExcalidrawElement[],
): ConvertResult {
  const nodes: SpatialNode[] = [];
  const excIdToSpatialId = new Map<string, string>();
  const groupParent = new Map<string, string>();

  // Collect bound text elements (containerId → text element)
  const boundTexts = new Map<string, ExcalidrawElement>();
  for (const el of elements) {
    if (el.isDeleted) continue;
    if (el.type === "text" && el.containerId) {
      boundTexts.set(el.containerId, el);
    }
  }

  // Pass 1: Convert non-text elements (or standalone text)
  for (const el of elements) {
    if (el.isDeleted) continue;

    // Skip bound text — will be merged in pass 2
    if (el.type === "text" && el.containerId) continue;

    let converted: SpatialNode[] = [];

    switch (el.type) {
      case "rectangle":
        converted = [convertShape(el, "rect")];
        break;
      case "ellipse":
        converted = [convertShape(el, "ellipse")];
        break;
      case "diamond":
        converted = [convertShape(el, "diamond")];
        break;
      case "arrow":
        converted = convertLinearElement(el, true);
        break;
      case "line":
        converted = convertLinearElement(el, false);
        break;
      case "freedraw": {
        const fd = convertFreedraw(el);
        if (fd) converted = [fd];
        break;
      }
      case "text":
        converted = [convertText(el)];
        break;
      case "frame":
      case "magicframe":
        converted = [convertFrame(el)];
        break;
      case "image":
        // Skip images — .excalidrawlib files don't include binary data
        continue;
      default:
        continue;
    }

    // Map excalidraw ID → first spatial node ID (for text binding)
    if (converted.length > 0) {
      excIdToSpatialId.set(el.id, converted[0].id);
    }

    nodes.push(...converted);
  }

  // Pass 2: Merge bound text into parent shapes as labels
  for (const [containerId, textEl] of boundTexts) {
    const spatialId = excIdToSpatialId.get(containerId);
    if (!spatialId) continue;
    const parent = nodes.find((n) => n.id === spatialId);
    if (!parent || parent.type !== "shape") continue;

    const data = (parent as ShapeNode).data;
    data.label = textEl.originalText || textEl.text || "";
    data.labelFontSize = textEl.fontSize || 20;
    data.labelFontFamily = mapFontFamily(textEl.fontFamily);
    data.labelAlign = mapTextAlign(textEl.textAlign);
  }

  // Pass 3: Resolve Excalidraw groupIds → spatialboard groupId + groupParent
  resolveGroups(elements, nodes, excIdToSpatialId, groupParent);

  // Normalize positions to (0, 0) origin
  normalizePositions(nodes);

  return { nodes, groupParent };
}

// ============================================================================
// Grouping
// ============================================================================

function resolveGroups(
  elements: ExcalidrawElement[],
  nodes: SpatialNode[],
  excIdToSpatialId: Map<string, string>,
  groupParent: Map<string, string>,
): void {
  // Build a map of excalidraw element ID → its groupIds array
  // Excalidraw groupIds: ["innermost", ..., "outermost"]
  const groupHierarchy = new Map<string, string>(); // childGroup → parentGroup

  for (const el of elements) {
    if (el.isDeleted || !el.groupIds?.length) continue;

    // Record parent relationships
    for (let i = 0; i < el.groupIds.length - 1; i++) {
      const child = el.groupIds[i];
      const parent = el.groupIds[i + 1];
      if (!groupHierarchy.has(child)) {
        groupHierarchy.set(child, parent);
      }
    }

    // Assign innermost group to the spatial node
    const spatialId = excIdToSpatialId.get(el.id);
    if (spatialId) {
      const node = nodes.find((n) => n.id === spatialId);
      if (node) {
        node.groupId = el.groupIds[0];
      }
    }
  }

  // Copy hierarchy into groupParent
  for (const [child, parent] of groupHierarchy) {
    groupParent.set(child, parent);
  }
}

// ============================================================================
// Position normalization
// ============================================================================

function normalizePositions(nodes: SpatialNode[]): void {
  if (nodes.length === 0) return;

  let minX = Infinity;
  let minY = Infinity;
  for (const n of nodes) {
    if (n.x < minX) minX = n.x;
    if (n.y < minY) minY = n.y;
  }

  if (!isFinite(minX)) return;

  for (const n of nodes) {
    n.x -= minX;
    n.y -= minY;
  }
}
