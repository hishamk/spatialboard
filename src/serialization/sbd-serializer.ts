import type {
  SpatialNode,
  BlockNoteNode,
  DrawNode,
  ShapeNode,
  EdgeNode,
  ImageNode,
  TextNode,
  StickyNoteNode,
  FrameNode,
} from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
import { dedupeStrokePoints } from "./stroke-utils";
import { getSbdMarkdownCodec } from "./markdown-codec";

/* ---------------------------------------------------------------------------
 * SBD serializer.
 *
 * Properties:
 *  - Nodes emit in INPUT (document) order — moving a node changes two attribute values, not the file order,
 *    so git diffs stay minimal. The parser resolves references in two passes,
 *    so order carries no semantics.
 *  - Frame children carry `parent="<frameId>"` with x/y RELATIVE to the frame
 *    (via `options.parentOf`) — moving a frame is a two-number diff and LLM
 *    edits don't have to recompute child positions. Draw strokes are the
 *    exception (their geometry derives from absolute point data).
 *  - Custom node types emit as readable `<!--@node type="..." ...>` directives
 *    with pretty-printed JSON data bodies.
 *  - All string attribute values escape `"` and `-->`; body lines that would
 *    read as directives are backslash-escaped.
 *  - `@meta` carries `sbd="3"`.
 * ------------------------------------------------------------------------- */

export interface SerializeOptions {
  background?: BoardBackground;
  originView?: { x: number; y: number; zoom: number };
  /** Returns the containing frame id for a node (frame-child relative
   *  coordinates). Omit to serialize every node with absolute coordinates. */
  parentOf?: (nodeId: string) => string | undefined;
}

function encodeAttrValue(v: string): string {
  return v.replace(/"/g, "&quot;").replace(/-->/g, "--&gt;");
}

/** Escape body lines that would otherwise parse as a directive start.
 *  Adds one backslash immediately before `<!--@` (after any leading
 *  whitespace and existing backslash run); the parser strips exactly one. */
function escapeBody(text: string): string {
  return text
    .split("\n")
    .map((l) => l.replace(/^(\s*)(\\*)(<!--@)/, "$1$2\\$3"))
    .join("\n");
}

class AttrList {
  private parts: string[] = [];
  push(name: string, value: string | number | undefined): this {
    // Skipping undefined keeps optional fields out of the file — interpolating
    // would write the literal string "undefined", which round-trips as a real
    // value (a font named "undefined", an align of "undefined", …).
    if (value === undefined || value === null) return this;
    this.parts.push(`${name}="${typeof value === "string" ? encodeAttrValue(value) : value}"`);
    return this;
  }
  pushIf(cond: unknown, name: string, value: () => string | number): this {
    if (cond) this.push(name, value());
    return this;
  }
  toString(): string {
    return this.parts.join(" ");
  }
}

export async function serializeToSBD(nodes: SpatialNode[], options?: SerializeOptions): Promise<string> {
  const lines: string[] = [];
  const byId = new Map(nodes.map((n) => [n.id, n]));

  // Meta
  const metaAttrs = ['sbd="3"'];
  if (options?.background && options.background !== "dot-grid") {
    metaAttrs.push(`background="${options.background}"`);
  }
  if (options?.originView) {
    const v = options.originView;
    metaAttrs.push(`originView="${v.x},${v.y},${v.zoom}"`);
  }
  lines.push(`<!--@meta ${metaAttrs.join(" ")} -->`);
  lines.push("");

  /** Position attrs, relative to the containing frame when one is known.
   *  Draw strokes stay absolute (geometry lives in their point data). */
  const positionOf = (node: SpatialNode): { x: number; y: number; parent?: string } => {
    if (node.type === "draw" || node.type === "edge") return { x: Math.round(node.x), y: Math.round(node.y) };
    const parentId = options?.parentOf?.(node.id);
    if (parentId) {
      const parent = byId.get(parentId);
      if (parent) {
        return { x: Math.round(node.x - parent.x), y: Math.round(node.y - parent.y), parent: parentId };
      }
    }
    return { x: Math.round(node.x), y: Math.round(node.y) };
  };

  const baseAttrs = (node: SpatialNode, includeWH = true): AttrList => {
    const pos = positionOf(node);
    const a = new AttrList();
    a.push("id", node.id).push("x", pos.x).push("y", pos.y);
    if (includeWH) {
      a.push("w", Math.round(node.w));
      a.push("h", node.h === "auto" ? "auto" : Math.round(node.h as number));
    }
    a.push("z", node.z);
    a.pushIf(pos.parent, "parent", () => pos.parent!);
    a.pushIf(node.rotation, "rotation", () => node.rotation!);
    a.pushIf(node.locked, "locked", () => "true");
    a.pushIf(node.groupId, "group", () => node.groupId!);
    return a;
  };

  const KNOWN = new Set(["frame", "blocknote", "draw", "shape", "image", "text", "edge", "sticky"]);

  for (const node of nodes) {
    switch (KNOWN.has(node.type) ? node.type : "@node") {
      case "frame": {
        const n = node as FrameNode;
        const a = baseAttrs(n);
        a.pushIf(n.data.label, "label", () => n.data.label!);
        a.pushIf(n.data.backgroundColor, "backgroundColor", () => n.data.backgroundColor!);
        a.pushIf(n.data.borderColor, "borderColor", () => n.data.borderColor!);
        a.pushIf(n.data.borderWidth != null, "borderWidth", () => n.data.borderWidth!);
        a.pushIf(n.data.borderStyle && n.data.borderStyle !== "solid", "borderStyle", () => n.data.borderStyle!);
        a.pushIf(n.data.opacity !== undefined && n.data.opacity !== 1, "opacity", () => n.data.opacity!);
        a.pushIf(n.data.slideOrder != null, "slideOrder", () => n.data.slideOrder!);
        a.pushIf(n.data.transition && n.data.transition !== "pan", "transition", () => n.data.transition!);
        a.pushIf(n.data.transitionDuration != null, "transitionDuration", () => n.data.transitionDuration!);
        lines.push(`<!--@frame ${a} -->`);
        lines.push("");
        break;
      }

      case "blocknote": {
        const n = node as BlockNoteNode;
        const a = baseAttrs(n);
        a.pushIf(n.data.borderColor, "borderColor", () => n.data.borderColor!);
        a.pushIf(n.data.borderWidth != null, "borderWidth", () => n.data.borderWidth!);
        a.pushIf(n.data.borderStyle && n.data.borderStyle !== "solid", "borderStyle", () => n.data.borderStyle!);
        a.pushIf(n.data.opacity !== undefined && n.data.opacity !== 1, "opacity", () => n.data.opacity!);
        lines.push(`<!--@block ${a} -->`);
        // Prefer the registered rich-text codec; without it (BlockNote not
        // loaded) fall back to the node's last stored markdown — no @blocknote edge.
        let markdown = n.data.markdown ?? "";
        const mdCodec = getSbdMarkdownCodec();
        if (mdCodec && n.data.blocks.length > 0) {
          markdown = await mdCodec.blocksToMarkdown(n.data.blocks);
        }
        lines.push(escapeBody(markdown));
        lines.push("");
        break;
      }

      case "draw": {
        const n = node as DrawNode;
        const a = new AttrList();
        a.push("id", n.id).push("x", Math.round(n.x)).push("y", Math.round(n.y)).push("z", n.z);
        a.push("tool", n.data.tool).push("color", n.data.color).push("width", n.data.strokeWidth);
        a.pushIf(n.data.opacity !== undefined && n.data.opacity !== 1, "opacity", () => n.data.opacity!);
        a.pushIf(n.data.fill, "fill", () => n.data.fill!);
        a.pushIf(n.data.fillStyle && n.data.fillStyle !== "hachure", "fillStyle", () => n.data.fillStyle!);
        a.pushIf(n.rotation, "rotation", () => n.rotation!);
        a.pushIf(n.locked, "locked", () => "true");
        a.pushIf(n.groupId, "group", () => n.groupId!);
        lines.push(`<!--@draw ${a} -->`);
        // Drop only near-duplicate consecutive points — geometric (RDP)
        // simplification changed point DENSITY, which perfect-freehand turns
        // into a visibly different stroke after reload (thin runs, kinks).
        const simplified = dedupeStrokePoints([...n.data.points]);
        lines.push(
          simplified
            .map(([px, py, pressure]) => `${(px + n.x).toFixed(1)},${(py + n.y).toFixed(1)},${pressure.toFixed(2)}`)
            .join(" "),
        );
        lines.push("");
        break;
      }

      case "shape": {
        const n = node as ShapeNode;
        const a = baseAttrs(n);
        a.push("tool", "shape").push("shape", n.data.shape).push("color", n.data.stroke);
        a.push("stroke", n.data.strokeWidth).push("roughness", n.data.roughness);
        a.pushIf(n.data.fill, "fill", () => n.data.fill!);
        a.pushIf(n.data.fillStyle && n.data.fillStyle !== "hachure", "fillStyle", () => n.data.fillStyle!);
        a.pushIf(n.data.strokeStyle && n.data.strokeStyle !== "solid", "strokeStyle", () => n.data.strokeStyle!);
        a.pushIf(n.data.edgeStyle && n.data.edgeStyle !== "sharp", "edgeStyle", () => n.data.edgeStyle!);
        a.pushIf(n.data.opacity !== undefined && n.data.opacity !== 1, "opacity", () => n.data.opacity!);
        a.pushIf(n.data.startPoint, "startPt", () => `${n.data.startPoint![0].toFixed(1)},${n.data.startPoint![1].toFixed(1)}`);
        a.pushIf(n.data.endPoint, "endPt", () => `${n.data.endPoint![0].toFixed(1)},${n.data.endPoint![1].toFixed(1)}`);
        a.pushIf(n.data.label, "label", () => n.data.label!);
        a.pushIf(n.data.labelFontSize, "labelFontSize", () => n.data.labelFontSize!);
        a.pushIf(n.data.labelFontFamily && n.data.labelFontFamily !== "Excalifont", "labelFontFamily", () => n.data.labelFontFamily!);
        a.pushIf(n.data.labelAlign && n.data.labelAlign !== "center", "labelAlign", () => n.data.labelAlign!);
        lines.push(`<!--@draw ${a} -->`);
        lines.push("");
        break;
      }

      case "text": {
        const n = node as TextNode;
        const pos = positionOf(n);
        const a = new AttrList();
        a.push("id", n.id).push("x", pos.x).push("y", pos.y).push("w", Math.round(n.w)).push("z", n.z);
        a.pushIf(pos.parent, "parent", () => pos.parent!);
        a.push("fontSize", n.data.fontSize).push("fontFamily", n.data.fontFamily);
        a.push("color", n.data.color).push("align", n.data.align);
        a.pushIf(n.data.opacity !== undefined && n.data.opacity !== 1, "opacity", () => n.data.opacity!);
        a.pushIf(n.rotation, "rotation", () => n.rotation!);
        a.pushIf(n.locked, "locked", () => "true");
        a.pushIf(n.groupId, "group", () => n.groupId!);
        lines.push(`<!--@text ${a} -->`);
        lines.push(escapeBody(n.data.text));
        lines.push("");
        break;
      }

      case "image": {
        const n = node as ImageNode;
        const a = baseAttrs(n);
        a.push("src", n.data.src);
        a.pushIf(n.data.alt, "alt", () => n.data.alt!);
        a.pushIf(n.data.opacity != null && n.data.opacity !== 1, "opacity", () => n.data.opacity!);
        a.pushIf(n.data.borderColor, "borderColor", () => n.data.borderColor!);
        a.pushIf(n.data.borderWidth != null, "borderWidth", () => n.data.borderWidth!);
        a.pushIf(n.data.borderStyle && n.data.borderStyle !== "solid", "borderStyle", () => n.data.borderStyle!);
        // Non-destructive edits — dropping these silently loses the user's
        // crop/mirror on every save/load round-trip.
        a.pushIf(n.data.crop, "crop", () => {
          const c = n.data.crop!;
          return `${c.x},${c.y},${c.w},${c.h}`;
        });
        a.pushIf(n.data.flipH, "flipH", () => "true");
        a.pushIf(n.data.flipV, "flipV", () => "true");
        lines.push(`<!--@image ${a} -->`);
        lines.push("");
        break;
      }

      case "edge": {
        const n = node as EdgeNode;
        const a = new AttrList();
        a.push("id", n.id).push("from", n.data.fromId).push("to", n.data.toId);
        a.push("style", n.data.style).push("color", n.data.color);
        a.pushIf(n.data.label, "label", () => n.data.label!);
        a.pushIf(n.data.strokeWidth && n.data.strokeWidth !== 1, "strokeWidth", () => n.data.strokeWidth);
        a.pushIf(n.data.arrowHead && n.data.arrowHead !== "none", "arrowHead", () => n.data.arrowHead!);
        a.pushIf(n.data.arrowTail && n.data.arrowTail !== "none", "arrowTail", () => n.data.arrowTail!);
        a.pushIf(n.data.arrowHeadSize, "arrowHeadSize", () => n.data.arrowHeadSize!);
        a.pushIf(n.data.arrowTailSize, "arrowTailSize", () => n.data.arrowTailSize!);
        a.pushIf(n.data.edgeType && n.data.edgeType !== "bezier", "edgeType", () => n.data.edgeType!);
        a.pushIf(n.data.animated, "animated", () => "true");
        a.pushIf(n.data.animatedDirection && n.data.animatedDirection !== "forward", "animatedDirection", () => n.data.animatedDirection!);
        a.pushIf(n.data.sourceHandle, "sourceHandle", () => n.data.sourceHandle!);
        a.pushIf(n.data.targetHandle, "targetHandle", () => n.data.targetHandle!);
        a.pushIf(n.data.sourcePort, "sourcePort", () => n.data.sourcePort!);
        a.pushIf(n.data.targetPort, "targetPort", () => n.data.targetPort!);
        a.pushIf(n.data.sourceT != null, "sourceT", () => n.data.sourceT!);
        a.pushIf(n.data.targetT != null, "targetT", () => n.data.targetT!);
        a.pushIf(n.data.attachmentGap != null && n.data.attachmentGap !== 0, "attachmentGap", () => n.data.attachmentGap!);
        a.pushIf(n.data.roughness != null && n.data.roughness !== 0, "roughness", () => n.data.roughness!);
        a.pushIf(n.data.midpointOffset != null && n.data.midpointOffset !== 0.5, "midpointOffset", () => n.data.midpointOffset!);
        a.pushIf(
          n.data.curveOffset && (n.data.curveOffset[0] !== 0 || n.data.curveOffset[1] !== 0),
          "curveOffset",
          () => `${n.data.curveOffset![0]},${n.data.curveOffset![1]}`,
        );
        a.pushIf(n.locked, "locked", () => "true");
        a.pushIf(n.groupId, "group", () => n.groupId!);
        lines.push(`<!--@edge ${a} -->`);
        lines.push("");
        break;
      }

      case "sticky": {
        const n = node as StickyNoteNode;
        const a = baseAttrs(n);
        a.push("color", n.data.color);
        a.pushIf(n.data.fontSize && n.data.fontSize !== 16, "fontSize", () => n.data.fontSize!);
        a.pushIf(n.data.opacity !== undefined && n.data.opacity !== 1, "opacity", () => n.data.opacity!);
        lines.push(`<!--@sticky ${a} -->`);
        lines.push(escapeBody(n.data.text));
        lines.push("");
        break;
      }

      // Registered custom types: readable directive + pretty JSON data body.
      default: {
        const a = baseAttrs(node);
        const withType = new AttrList().push("type", node.type);
        lines.push(`<!--@node ${withType} ${a} -->`);
        const data = (node as { data?: unknown }).data;
        if (data != null && !(typeof data === "object" && Object.keys(data as object).length === 0)) {
          lines.push(escapeBody(JSON.stringify(data, null, 2)));
        }
        lines.push("");
        break;
      }
    }
  }

  return lines.join("\n");
}
