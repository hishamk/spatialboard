import { nanoid } from "nanoid";
import { DEFAULT_FONT } from "../fonts";
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
import { markdownToBlocks } from "./blocknote-markdown";

function parseAttributes(line: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(line)) !== null) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function optNumber(raw: string | undefined): number | undefined {
  if (raw == null || raw === "") return undefined;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : undefined;
}

/** Backward-compat aliases for old background values. */
const BG_ALIASES: Record<string, BoardBackground> = {
  "default": "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  "isometric": "plain-white",
};

export interface SBDParseResult {
  nodes: SpatialNode[];
  meta: {
    background?: BoardBackground;
    originView?: { x: number; y: number; zoom: number };
  };
}

export async function parseSBD(sbd: string): Promise<SBDParseResult> {
  const nodes: SpatialNode[] = [];
  const meta: SBDParseResult["meta"] = {};
  const lines = sbd.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (line.startsWith("<!--@meta")) {
      const attrs = parseAttributes(line);
      if (attrs.background) {
        const bg = BG_ALIASES[attrs.background] ?? attrs.background;
        meta.background = bg as BoardBackground;
      }
      if (attrs.originView) {
        const parts = attrs.originView.split(",").map(Number);
        if (parts.length === 3 && parts.every((n) => !isNaN(n))) {
          meta.originView = { x: parts[0], y: parts[1], zoom: parts[2] };
        }
      }
      i++;
      continue;
    }

    if (line.startsWith("<!--@frame")) {
      const attrs = parseAttributes(line);
      i++;
      // Skip blank lines
      while (i < lines.length && lines[i].trim() === "") i++;

      nodes.push({
        id: attrs.id || nanoid(10),
        type: "frame",
        x: parseFloat(attrs.x || "0"),
        y: parseFloat(attrs.y || "0"),
        w: parseFloat(attrs.w || "400"),
        h: attrs.h === "auto" || !attrs.h ? "auto" : parseFloat(attrs.h),
        z: parseInt(attrs.z || "0"),
        rotation: attrs.rotation ? parseFloat(attrs.rotation) : undefined,
        locked: attrs.locked === "true" || undefined,
        groupId: attrs.group || undefined,
        data: {
          label: attrs.label?.replace(/&quot;/g, '"') || undefined,
          backgroundColor: attrs.backgroundColor || undefined,
          borderColor: attrs.borderColor || undefined,
          borderWidth: attrs.borderWidth ? parseFloat(attrs.borderWidth) : undefined,
          borderStyle: (attrs.borderStyle as "solid" | "dashed" | "dotted") || undefined,
          opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
          slideOrder: attrs.slideOrder ? parseInt(attrs.slideOrder, 10) : undefined,
          transition: attrs.transition || undefined,
          transitionDuration: attrs.transitionDuration ? parseInt(attrs.transitionDuration, 10) : undefined,
        },
      } as FrameNode);
      continue;
    }

    if (line.startsWith("<!--@block")) {
      const attrs = parseAttributes(line);
      i++;
      // Collect markdown content until next directive or EOF
      const contentLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith("<!--@")) {
        contentLines.push(lines[i]);
        i++;
      }
      // Trim trailing blank lines
      while (
        contentLines.length > 0 &&
        contentLines[contentLines.length - 1].trim() === ""
      ) {
        contentLines.pop();
      }

      const markdown = contentLines.join("\n");
      const blocks =
        markdown.trim().length > 0 ? await markdownToBlocks(markdown) : [];

      nodes.push({
        id: attrs.id || nanoid(10),
        type: "content",
        x: parseFloat(attrs.x || "0"),
        y: parseFloat(attrs.y || "0"),
        w: parseFloat(attrs.w || "300"),
        h: attrs.h === "auto" || !attrs.h ? "auto" : parseFloat(attrs.h),
        z: parseInt(attrs.z || "1"),
        rotation: attrs.rotation ? parseFloat(attrs.rotation) : undefined,
        locked: attrs.locked === "true" || undefined,
        groupId: attrs.group || undefined,
        data: {
          blocks,
          markdown,
          borderColor: attrs.borderColor || undefined,
          borderWidth: attrs.borderWidth ? parseFloat(attrs.borderWidth) : undefined,
          borderStyle: (attrs.borderStyle as "solid" | "dashed" | "dotted") || undefined,
          opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
        },
      } as ContentNode);
      continue;
    }

    if (line.startsWith("<!--@draw")) {
      const attrs = parseAttributes(line);
      i++;

      if (attrs.tool === "shape") {
        // ShapeNode
        nodes.push({
          id: attrs.id || nanoid(10),
          type: "shape",
          x: parseFloat(attrs.x || "0"),
          y: parseFloat(attrs.y || "0"),
          w: parseFloat(attrs.w || "100"),
          h:
            attrs.h === "auto" || !attrs.h
              ? "auto"
              : parseFloat(attrs.h),
          z: parseInt(attrs.z || "0"),
          rotation: attrs.rotation ? parseFloat(attrs.rotation) : undefined,
          locked: attrs.locked === "true" || undefined,
          groupId: attrs.group || undefined,
          data: {
            shape: (attrs.shape || "rect") as ShapeNode["data"]["shape"],
            stroke: attrs.color || "#1e1e2e",
            fill: attrs.fill || undefined,
            fillStyle: (attrs.fillStyle || undefined) as ShapeNode["data"]["fillStyle"],
            strokeWidth: parseFloat(attrs.stroke || "2"),
            strokeStyle: (attrs.strokeStyle || undefined) as ShapeNode["data"]["strokeStyle"],
            edgeStyle: (attrs.edgeStyle as "sharp" | "round") || undefined,
            roughness: parseFloat(attrs.roughness || "1"),
            opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
            startPoint: attrs.startPt ? attrs.startPt.split(",").map(Number) as [number, number] : undefined,
            endPoint: attrs.endPt ? attrs.endPt.split(",").map(Number) as [number, number] : undefined,
            label: attrs.label?.replace(/&quot;/g, '"') || undefined,
            labelFontSize: attrs.labelFontSize ? parseFloat(attrs.labelFontSize) : undefined,
            labelFontFamily: attrs.labelFontFamily || undefined,
            labelAlign: (attrs.labelAlign as "left" | "center" | "right") || undefined,
          },
        } as ShapeNode);
        // Skip blank lines
        while (i < lines.length && lines[i].trim() === "") i++;
      } else {
        // DrawNode — next line has point data
        let pointLine = "";
        if (i < lines.length && !lines[i].trim().startsWith("<!--@")) {
          pointLine = lines[i].trim();
          i++;
        }

        const points: Array<[number, number, number]> = pointLine
          ? pointLine
              .split(" ")
              .filter(Boolean)
              .map((p) => {
                const parts = p.split(",").map(Number);
                return [
                  parts[0] || 0,
                  parts[1] || 0,
                  parts[2] || 0.5,
                ] as [number, number, number];
              })
          : [];

        // Calculate bounding box
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
          minX = parseFloat(attrs.x || "0");
          minY = parseFloat(attrs.y || "0");
          maxX = minX;
          maxY = minY;
        }

        // Convert absolute points to relative (subtract bounding box origin)
        const relativePoints: Array<[number, number, number]> = points.map(
          ([px, py, p]) => [px - minX, py - minY, p]
        );

        nodes.push({
          id: attrs.id || nanoid(10),
          type: "draw",
          x: minX,
          y: minY,
          w: maxX - minX,
          h: maxY - minY,
          z: parseInt(attrs.z || "0"),
          rotation: attrs.rotation ? parseFloat(attrs.rotation) : undefined,
          locked: attrs.locked === "true" || undefined,
          groupId: attrs.group || undefined,
          data: {
            tool: (attrs.tool || "pen") as DrawNode["data"]["tool"],
            points: relativePoints,
            color: attrs.color || "#1e1e2e",
            strokeWidth: parseFloat(attrs.width || "2"),
            opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
            fill: attrs.fill || undefined,
            fillStyle: (attrs.fillStyle || undefined) as DrawNode["data"]["fillStyle"],
          },
        } as DrawNode);

        // Skip blank lines
        while (i < lines.length && lines[i].trim() === "") i++;
      }
      continue;
    }

    if (line.startsWith("<!--@image")) {
      const attrs = parseAttributes(line);
      i++;
      nodes.push({
        id: attrs.id || nanoid(10),
        type: "image",
        x: parseFloat(attrs.x || "0"),
        y: parseFloat(attrs.y || "0"),
        w: parseFloat(attrs.w || "200"),
        h: parseFloat(attrs.h || "150"),
        z: parseInt(attrs.z || "0"),
        rotation: attrs.rotation ? parseFloat(attrs.rotation) : undefined,
        locked: attrs.locked === "true" || undefined,
        groupId: attrs.group || undefined,
        data: {
          src: attrs.src || "",
          alt: attrs.alt,
          opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
          borderColor: attrs.borderColor || undefined,
          borderWidth: attrs.borderWidth ? parseFloat(attrs.borderWidth) : undefined,
          borderStyle: (attrs.borderStyle as "solid" | "dashed" | "dotted") || undefined,
        },
      } as ImageNode);
      continue;
    }

    if (line.startsWith("<!--@edge")) {
      const attrs = parseAttributes(line);
      i++;

      nodes.push({
        id: attrs.id || nanoid(10),
        type: "edge",
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        z: 0,
        locked: attrs.locked === "true" || undefined,
        groupId: attrs.group || undefined,
        data: {
          fromId: attrs.from || "",
          toId: attrs.to || "",
          label: attrs.label,
          style: (attrs.style || "solid") as EdgeNode["data"]["style"],
          color: attrs.color || "#666",
          strokeWidth: attrs.strokeWidth ? parseFloat(attrs.strokeWidth) : 1,
          arrowHead: (attrs.arrowHead as EdgeNode["data"]["arrowHead"]) || undefined,
          arrowTail: (attrs.arrowTail as EdgeNode["data"]["arrowTail"]) || undefined,
          arrowHeadSize: attrs.arrowHeadSize ? parseFloat(attrs.arrowHeadSize) : undefined,
          arrowTailSize: attrs.arrowTailSize ? parseFloat(attrs.arrowTailSize) : undefined,
          edgeType: (attrs.edgeType as EdgeNode["data"]["edgeType"]) || undefined,
          animated: attrs.animated === "true" || undefined,
          animatedDirection: (attrs.animatedDirection as EdgeNode["data"]["animatedDirection"]) || undefined,
          sourceHandle: (attrs.sourceHandle as EdgeNode["data"]["sourceHandle"]) || undefined,
          targetHandle: (attrs.targetHandle as EdgeNode["data"]["targetHandle"]) || undefined,
          sourcePort: attrs.sourcePort?.replace(/&quot;/g, '"') || undefined,
          targetPort: attrs.targetPort?.replace(/&quot;/g, '"') || undefined,
          sourceT: optNumber(attrs.sourceT),
          targetT: optNumber(attrs.targetT),
          attachmentGap: optNumber(attrs.attachmentGap),
          roughness: optNumber(attrs.roughness),
          midpointOffset: optNumber(attrs.midpointOffset),
          curveOffset: attrs.curveOffset ? attrs.curveOffset.split(",").map(Number) as [number, number] : undefined,
        },
      } as EdgeNode);

      // Skip blank lines
      while (i < lines.length && lines[i].trim() === "") i++;
      continue;
    }

    if (line.startsWith("<!--@text")) {
      const attrs = parseAttributes(line);
      i++;
      // Collect text content until next directive or EOF
      const contentLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith("<!--@")) {
        contentLines.push(lines[i]);
        i++;
      }
      // Trim trailing blank lines
      while (
        contentLines.length > 0 &&
        contentLines[contentLines.length - 1].trim() === ""
      ) {
        contentLines.pop();
      }

      nodes.push({
        id: attrs.id || nanoid(10),
        type: "text",
        x: parseFloat(attrs.x || "0"),
        y: parseFloat(attrs.y || "0"),
        w: parseFloat(attrs.w || "200"),
        h: "auto",
        z: parseInt(attrs.z || "0"),
        rotation: attrs.rotation ? parseFloat(attrs.rotation) : undefined,
        locked: attrs.locked === "true" || undefined,
        groupId: attrs.group || undefined,
        data: {
          text: contentLines.join("\n"),
          fontSize: parseFloat(attrs.fontSize || "20"),
          fontFamily: attrs.fontFamily || DEFAULT_FONT,
          color: attrs.color || "#1e1e2e",
          align: (attrs.align || "left") as "left" | "center" | "right",
          opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
        },
      } as TextNode);
      continue;
    }

    if (line.startsWith("<!--@sticky")) {
      const attrs = parseAttributes(line);
      i++;
      const contentLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith("<!--@")) {
        contentLines.push(lines[i]);
        i++;
      }
      while (
        contentLines.length > 0 &&
        contentLines[contentLines.length - 1].trim() === ""
      ) {
        contentLines.pop();
      }

      nodes.push({
        id: attrs.id || nanoid(10),
        type: "sticky",
        x: parseFloat(attrs.x || "0"),
        y: parseFloat(attrs.y || "0"),
        w: parseFloat(attrs.w || "200"),
        h: parseFloat(attrs.h || "150"),
        z: parseInt(attrs.z || "1"),
        rotation: attrs.rotation ? parseFloat(attrs.rotation) : undefined,
        locked: attrs.locked === "true" || undefined,
        groupId: attrs.group || undefined,
        data: {
          text: contentLines.join("\n"),
          color: attrs.color || "#FEF3C7",
          fontSize: attrs.fontSize ? parseFloat(attrs.fontSize) : undefined,
          opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
        },
      } as StickyNoteNode);
      continue;
    }

    i++;
  }

  return { nodes, meta };
}
