import { nanoid } from "nanoid";
import { getSbdMarkdownCodec } from "./markdown-codec";
import { DEFAULT_FONT } from "../font-constants";
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

/* ---------------------------------------------------------------------------
 * SBD parser.
 *
 * Grammar:
 *  - Directives may span multiple lines; a directive runs from a line whose
 *    trimmed form starts with `<!--@` through the first `-->`.
 *  - `parent="<id>"` on a directive makes its x/y RELATIVE to that node
 *    (frame-child serialization). Resolved to absolute after all nodes parse,
 *    so document order never matters. A missing parent degrades to absolute
 *    coordinates plus a warning.
 *  - `<!--@node type="..." ... -->` is the generic/custom-node form: base
 *    fields as attributes, `data` as a pretty-printed JSON body.
 *  - `<!--@defaults type="sticky" color="..." -->` supplies per-type attribute
 *    defaults applied to later directives that omit those attributes.
 *  - Body lines that would read as a directive are escaped with a leading
 *    backslash (`\<!--@`); the parser strips exactly one backslash. Attribute
 *    values escape `-->` as `--&gt;` and `"` as `&quot;`.
 *  - `<!--@meta sbd="3" ... -->` version-stamps the document.
 *  - Problems are collected into `warnings` instead of being silently dropped.
 * ------------------------------------------------------------------------- */

function decodeAttrValue(v: string): string {
  return v.replace(/--&gt;/g, "-->").replace(/&quot;/g, '"');
}

function parseAttributes(text: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    attrs[match[1]] = decodeAttrValue(match[2]);
  }
  return attrs;
}

/** Strip exactly one escaping backslash from body lines that would otherwise
 *  read as a directive start (mirror of the serializer's escapeBody). */
function unescapeBodyLine(line: string): string {
  return line.replace(/^(\s*)(\\+)(<!--@)/, (_m, ws: string, bs: string, tag: string) => ws + bs.slice(1) + tag);
}

function optNumber(raw: string | undefined): number | undefined {
  if (raw == null || raw === "") return undefined;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : undefined;
}

/** parseFloat that clamps to a finite fallback — hostile SBD must never inject
 *  Infinity/NaN geometry (a single non-finite w/h poisons the whole viewport). */
function finiteNum(raw: string | undefined, fallback: number): number {
  if (raw == null || raw === "") return fallback;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}

/** Height field: "auto", a finite non-negative number, or "auto" as the safe default. */
function hField(raw: string | undefined): number | "auto" {
  if (raw === "auto" || !raw) return "auto";
  const n = parseFloat(raw);
  return Number.isFinite(n) ? Math.max(0, n) : "auto";
}

/** JSON.parse for untrusted @node bodies — drops prototype-pollution keys so a
 *  crafted `{"__proto__": …}` can't reach a consumer's unsafe deep-merge. */
function safeJsonParse(text: string): unknown {
  return JSON.parse(text, (key, value) =>
    key === "__proto__" || key === "constructor" ? undefined : value,
  );
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
    /** Format version from `sbd="N"` in @meta, when present. */
    version?: number;
    background?: BoardBackground;
    originView?: { x: number; y: number; zoom: number };
  };
  /** Non-fatal problems encountered while parsing (bad JSON in a custom node,
   *  a `parent` reference to a missing node, …). Never silently dropped. */
  warnings: string[];
}

interface RawDirective {
  tag: string;
  attrs: Record<string, string>;
  /** Content lines between this directive and the next (trailing blanks trimmed). */
  body: string[];
  /** Full raw directive text. */
  raw: string;
  line: number;
}

/** Split the document into directives + their body lines. */
function tokenize(sbd: string): RawDirective[] {
  const lines = sbd.split("\n");
  const directives: RawDirective[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed.startsWith("<!--@")) {
      i++; // stray text outside any directive body — ignored
      continue;
    }

    const startLine = i;
    // Collect directive text through the first `-->` (may span lines).
    const dirLines: string[] = [];
    while (i < lines.length) {
      dirLines.push(lines[i]);
      if (lines[i].includes("-->")) break;
      i++;
    }
    i++; // move past the terminator line

    const dirText = dirLines.join("\n");
    const tagMatch = /^<!--@(\w+)/.exec(dirText.trim());
    if (!tagMatch) continue;
    const tag = tagMatch[1];
    const inner = dirText.slice(dirText.indexOf(tagMatch[0]) + tagMatch[0].length, dirText.lastIndexOf("-->"));

    // Collect the body: lines until the next directive start or EOF.
    const body: string[] = [];
    while (i < lines.length && !lines[i].trim().startsWith("<!--@")) {
      body.push(unescapeBodyLine(lines[i]));
      i++;
    }
    while (body.length > 0 && body[body.length - 1].trim() === "") body.pop();
    // Leading blank lines between directive and content are padding, not body.
    while (body.length > 0 && body[0].trim() === "") body.shift();

    directives.push({ tag, attrs: parseAttributes(inner), body, raw: dirText, line: startLine + 1 });
  }

  return directives;
}

/** Base spatial fields shared by every directive-built node. */
function baseFields(attrs: Record<string, string>, fallbackW: number, fallbackZ: number) {
  return {
    id: attrs.id || nanoid(10),
    x: finiteNum(attrs.x, 0),
    y: finiteNum(attrs.y, 0),
    w: Math.max(0, finiteNum(attrs.w, fallbackW)),
    z: finiteNum(attrs.z, fallbackZ),
    rotation: optNumber(attrs.rotation),
    locked: attrs.locked === "true" || undefined,
    groupId: attrs.group || undefined,
  };
}

export async function parseSBD(sbd: string): Promise<SBDParseResult> {
  const nodes: SpatialNode[] = [];
  const meta: SBDParseResult["meta"] = {};
  const warnings: string[] = [];
  /** childId → parentId for relative-coordinate resolution (pass 2). */
  const pendingParent = new Map<string, string>();
  /** Per-type attribute defaults from @defaults directives. */
  const typeDefaults = new Map<string, Record<string, string>>();

  const directives = tokenize(sbd);

  const applyDefaults = (tag: string, attrs: Record<string, string>): Record<string, string> => {
    const key = tag === "node" ? attrs.type : tag;
    const defaults = key ? typeDefaults.get(key) : undefined;
    return defaults ? { ...defaults, ...attrs } : attrs;
  };

  const recordParent = (attrs: Record<string, string>, id: string) => {
    if (attrs.parent) pendingParent.set(id, attrs.parent);
  };

  for (const d of directives) {
    const attrs = applyDefaults(d.tag, d.attrs);

    switch (d.tag) {
      case "meta": {
        if (attrs.sbd) {
          const v = parseInt(attrs.sbd, 10);
          if (Number.isFinite(v)) meta.version = v;
        }
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
        break;
      }

      case "defaults": {
        const { type, ...rest } = attrs;
        if (type) {
          typeDefaults.set(type, { ...(typeDefaults.get(type) ?? {}), ...rest });
        } else {
          warnings.push(`line ${d.line}: @defaults without type= — ignored`);
        }
        break;
      }

      case "frame": {
        const base = baseFields(attrs, 400, 0);
        nodes.push({
          ...base,
          type: "frame",
          h: hField(attrs.h),
          data: {
            label: attrs.label || undefined,
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
        recordParent(attrs, base.id);
        break;
      }

      case "block": {
        const base = baseFields(attrs, 300, 1);
        const markdown = d.body.join("\n");
        // Convert via the registered rich-text codec; without it (BlockNote not
        // loaded) keep empty blocks + the raw markdown — no @blocknote edge.
        let blocks: unknown[] = [];
        const mdCodec = getSbdMarkdownCodec();
        if (mdCodec && markdown.trim().length > 0) {
          blocks = await mdCodec.markdownToBlocks(markdown);
        }
        nodes.push({
          ...base,
          type: "content",
          h: hField(attrs.h),
          data: {
            blocks,
            markdown,
            borderColor: attrs.borderColor || undefined,
            borderWidth: attrs.borderWidth ? parseFloat(attrs.borderWidth) : undefined,
            borderStyle: (attrs.borderStyle as "solid" | "dashed" | "dotted") || undefined,
            opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
          },
        } as ContentNode);
        recordParent(attrs, base.id);
        break;
      }

      case "draw": {
        if (attrs.tool === "shape") {
          const base = baseFields(attrs, 100, 0);
          nodes.push({
            ...base,
            type: "shape",
            h: hField(attrs.h),
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
              startPoint: attrs.startPt ? (attrs.startPt.split(",").map(Number) as [number, number]) : undefined,
              endPoint: attrs.endPt ? (attrs.endPt.split(",").map(Number) as [number, number]) : undefined,
              label: attrs.label || undefined,
              labelFontSize: attrs.labelFontSize ? parseFloat(attrs.labelFontSize) : undefined,
              labelFontFamily: attrs.labelFontFamily || undefined,
              labelAlign: (attrs.labelAlign as "left" | "center" | "right") || undefined,
            },
          } as ShapeNode);
          recordParent(attrs, base.id);
        } else {
          // Freehand stroke — first body line carries the point data. Points
          // are absolute; x/y/w/h derive from their bounding box (draws never
          // carry parent= — see the serializer).
          const pointLine = d.body.find((l) => l.trim() !== "")?.trim() ?? "";
          const points: Array<[number, number, number]> = pointLine
            ? pointLine
                .split(" ")
                .filter(Boolean)
                .map((p) => {
                  const parts = p.split(",").map(Number);
                  return [parts[0] || 0, parts[1] || 0, parts[2] || 0.5] as [number, number, number];
                })
            : [];

          // Cap hostile strokes: a single line with tens of thousands of points
          // freezes the RDP simplifier on the next serialize. Truncate + warn
          // rather than drop (SBD's "warnings, not drops" contract).
          const MAX_STROKE_POINTS = 20000;
          if (points.length > MAX_STROKE_POINTS) {
            warnings.push(`line ${d.line}: draw stroke has ${points.length} points — truncated to ${MAX_STROKE_POINTS}`);
            points.length = MAX_STROKE_POINTS;
          }

          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
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
          const relativePoints: Array<[number, number, number]> = points.map(([px, py, p]) => [px - minX, py - minY, p]);

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
        }
        break;
      }

      case "image": {
        const base = baseFields(attrs, 200, 0);
        nodes.push({
          ...base,
          type: "image",
          h: Math.max(0, finiteNum(attrs.h, 150)),
          data: {
            src: attrs.src || "",
            alt: attrs.alt,
            opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
            borderColor: attrs.borderColor || undefined,
            borderWidth: attrs.borderWidth ? parseFloat(attrs.borderWidth) : undefined,
            borderStyle: (attrs.borderStyle as "solid" | "dashed" | "dotted") || undefined,
          },
        } as ImageNode);
        recordParent(attrs, base.id);
        break;
      }

      case "edge": {
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
            sourcePort: attrs.sourcePort || undefined,
            targetPort: attrs.targetPort || undefined,
            sourceT: optNumber(attrs.sourceT),
            targetT: optNumber(attrs.targetT),
            attachmentGap: optNumber(attrs.attachmentGap),
            roughness: optNumber(attrs.roughness),
            midpointOffset: optNumber(attrs.midpointOffset),
            curveOffset: attrs.curveOffset ? (attrs.curveOffset.split(",").map(Number) as [number, number]) : undefined,
          },
        } as EdgeNode);
        break;
      }

      case "text": {
        const base = baseFields(attrs, 200, 0);
        nodes.push({
          ...base,
          type: "text",
          h: "auto",
          data: {
            text: d.body.join("\n"),
            fontSize: parseFloat(attrs.fontSize || "20"),
            fontFamily: attrs.fontFamily || DEFAULT_FONT,
            color: attrs.color || "#1e1e2e",
            align: (attrs.align || "left") as "left" | "center" | "right",
            opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
          },
        } as TextNode);
        recordParent(attrs, base.id);
        break;
      }

      case "sticky": {
        const base = baseFields(attrs, 200, 1);
        nodes.push({
          ...base,
          type: "sticky",
          h: Math.max(0, finiteNum(attrs.h, 150)),
          data: {
            text: d.body.join("\n"),
            color: attrs.color || "#FEF3C7",
            fontSize: attrs.fontSize ? parseFloat(attrs.fontSize) : undefined,
            opacity: attrs.opacity ? parseFloat(attrs.opacity) : undefined,
          },
        } as StickyNoteNode);
        recordParent(attrs, base.id);
        break;
      }

      // v3 generic/custom node: base fields as attributes, data as JSON body.
      case "node": {
        if (!attrs.type) {
          warnings.push(`line ${d.line}: @node without type= — skipped`);
          break;
        }
        const base = baseFields(attrs, 200, 1);
        let data: Record<string, unknown> = {};
        const bodyText = d.body.join("\n").trim();
        if (bodyText) {
          try {
            data = (safeJsonParse(bodyText) ?? {}) as Record<string, unknown>;
          } catch (e) {
            warnings.push(`line ${d.line}: @node ${base.id} has invalid JSON data (${(e as Error).message}) — data dropped`);
          }
        }
        nodes.push({
          ...base,
          type: attrs.type,
          h: hField(attrs.h),
          data,
        } as SpatialNode);
        recordParent(attrs, base.id);
        break;
      }

      default:
        warnings.push(`line ${d.line}: unknown directive @${d.tag} — skipped`);
    }
  }

  // Pass 2: resolve parent-relative coordinates to absolute. Handles nested
  // frames in any document order; cycles and missing parents degrade to
  // absolute coordinates with a warning.
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const resolved = new Set<string>();
  const resolving = new Set<string>();
  const resolve = (id: string): void => {
    if (resolved.has(id)) return;
    const parentId = pendingParent.get(id);
    if (!parentId) {
      resolved.add(id);
      return;
    }
    const node = byId.get(id);
    const parent = byId.get(parentId);
    if (!node) return;
    if (!parent) {
      warnings.push(`node ${id}: parent="${parentId}" not found — coordinates treated as absolute`);
      resolved.add(id);
      return;
    }
    if (resolving.has(id)) {
      warnings.push(`node ${id}: parent cycle detected — coordinates treated as absolute`);
      resolved.add(id);
      return;
    }
    resolving.add(id);
    resolve(parentId);
    resolving.delete(id);
    node.x += parent.x;
    node.y += parent.y;
    resolved.add(id);
  };
  for (const id of pendingParent.keys()) resolve(id);

  return { nodes, meta, warnings };
}
