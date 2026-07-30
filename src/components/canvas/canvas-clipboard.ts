import { nanoid } from "nanoid";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type {
  BlockNoteNode,
  ShapeNode,
  EdgeNode,
  ImageNode,
  TextNode,
  StickyNoteNode,
} from "../../engine/types";
import { getSbdMarkdownCodec } from "../../serialization/markdown-codec";
import { encodeClipboardNodes, extractEmbeddedNodes } from "../../interactions/keyboard-handler";

/**
 * Read the system clipboard and paste appropriately.
 * Falls back to the engine's internal clipboard on error or if
 * the clipboard content originated from this board (SBD marker).
 */
export async function pasteFromSystemClipboard(
  engine: SpatialEngine,
  cx: number,
  cy: number,
): Promise<void> {
  try {
    const items = await navigator.clipboard.read();

    // If the HTML contains our marker, it came from the board → internal paste
    let externalHtml: string | null = null;
    for (const item of items) {
      if (item.types.includes("text/html")) {
        const html = await (await item.getType("text/html")).text();
        if (html.includes("sbd-clipboard") || html.includes("data-sbd-nodes=")) {
          // Always prefer embedded data (handles cross-tab and stale clipboard)
          const embedded = extractEmbeddedNodes(html);
          if (embedded) {
            engine.setClipboard(embedded);
            engine.pasteClipboard(cx, cy);
            return;
          }
          // Fallback to internal clipboard (same tab, no embedded data)
          if (engine.hasClipboard()) {
            engine.pasteClipboard(cx, cy);
            return;
          }
        }
        externalHtml = html;
      }
    }

    // External image
    for (const item of items) {
      const imageType = item.types.find((t) => t.startsWith("image/"));
      if (imageType) {
        const blob = await item.getType(imageType);
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
        const img = new Image();
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.src = dataUrl;
        });
        const aspect = img.naturalWidth / img.naturalHeight;
        const w = Math.min(img.naturalWidth, 400);
        const h = Math.min(img.naturalHeight, 300);
        const finalW = aspect >= 1 ? w : h * aspect;
        const finalH = aspect >= 1 ? w / aspect : h;
        // Prefer the original URL for animated images (GIF, APNG, animated WebP)
        // since the clipboard blob is often a static PNG screenshot
        let src = dataUrl;
        if (externalHtml) {
          const m = externalHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
          if (m && /\.(gif|webp|apng)(\?|#|$)/i.test(m[1])) {
            src = m[1].replace(/&amp;/g, "&");
          }
        }
        const node: ImageNode = {
          id: nanoid(10),
          type: "image",
          x: cx,
          y: cy,
          w: finalW,
          h: finalH,
          z: engine.nextZ(),
          data: { src },
        };
        engine.addNode(node);
        engine.select(node.id);
        return;
      }
    }

    const text = await navigator.clipboard.readText();
    // Rich-text paste only applies when the BlockNote node is registered
    // (its module registers this codec); otherwise fall through.
    const codec = getSbdMarkdownCodec();

    // Rich HTML from external app (rendered markdown, web page, etc.)
    if (codec && externalHtml) {
      const cleanHtml = externalHtml
        .replace(/^<meta[^>]*>/i, "")
        .replace(/<!--StartFragment-->|<!--EndFragment-->/g, "")
        .trim();
      try {
        const blocks = codec.htmlToBlocks(cleanHtml);
        if (blocks.length > 0) {
          const node: BlockNoteNode = {
            id: nanoid(10),
            type: "blocknote",
            x: cx,
            y: cy,
            w: 300,
            h: "auto",
            z: engine.nextZ(),
            data: { blocks, markdown: text || "", borderColor: "#1e1e2e" },
          };
          engine.addNode(node);
          engine.select(node.id);
          return;
        }
      } catch {
        // HTML parsing failed, fall through to plain text
      }
    }

    // Plain text fallback → content block
    if (codec && text?.trim()) {
      const blocks = await codec.markdownToBlocks(text);
      const node: BlockNoteNode = {
        id: nanoid(10),
        type: "blocknote",
        x: cx,
        y: cy,
        w: 300,
        h: "auto",
        z: engine.nextZ(),
        data: { blocks, markdown: text, borderColor: "#1e1e2e" },
      };
      engine.addNode(node);
      engine.select(node.id);
      return;
    }
  } catch {
    // Permission denied or API unavailable — fall through
  }

  // Fallback: internal clipboard
  engine.pasteClipboard(cx, cy);
}

/**
 * Write SBD nodes to the system clipboard (async best-effort).
 * Mirrors the format written by the keyboard handler's copy event.
 */
export async function copyToSystemClipboard(
  engine: SpatialEngine,
): Promise<void> {
  const nodes = engine.getClipboardNodes();
  if (nodes.length === 0) return;

  // Build a plain-text fallback from node contents
  const parts: string[] = [];
  for (const node of nodes) {
    if (node.type === "blocknote") {
      const d = node.data as BlockNoteNode["data"];
      if (d.markdown) parts.push(d.markdown);
    } else if (node.type === "text") {
      const d = node.data as TextNode["data"];
      if (d.text) parts.push(d.text);
    } else if (node.type === "image") {
      const d = node.data as ImageNode["data"];
      parts.push(d.src.startsWith("http") ? d.src : (d.alt || "[Image]"));
    } else if (node.type === "shape") {
      const d = node.data as ShapeNode["data"];
      if (d.label) parts.push(d.label);
    } else if (node.type === "sticky") {
      const d = node.data as StickyNoteNode["data"];
      if (d.text) parts.push(d.text);
    } else if (node.type === "edge") {
      const d = node.data as EdgeNode["data"];
      if (d.label) parts.push(d.label);
    }
  }
  const text = parts.join("\n\n");
  const htmlParts = text.split("\n").filter(Boolean).map((l) => `<p>${l}</p>`).join("");
  const encoded = encodeClipboardNodes(nodes);
  const html = `<!--sbd-clipboard--><div data-sbd-nodes="${encoded}">${htmlParts || "<p></p>"}</div>`;

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([text], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" }),
      }),
    ]);
  } catch {
    try { await navigator.clipboard.writeText(text); } catch { /* ignore */ }
  }
}
