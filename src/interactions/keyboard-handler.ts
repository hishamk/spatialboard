import { nanoid } from "nanoid";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { ContentNode, ImageNode, SpatialNode, StickyNoteNode, TextNode, YouTubeNode } from "../engine/types";
import { htmlToBlocks, markdownToBlocks } from "../serialization/blocknote-markdown";
import { svgTextToImageNode, extractSvgMarkup } from "../utils/svg-import";
import { isYouTubeUrl, extractYouTubeVideoId } from "../utils/youtube";

/**
 * Marker string placed inside an HTML comment on copy.
 * HTML comments survive clipboard round-trips in every major browser,
 * unlike hidden spans/elements which get stripped.
 */
const SBD_MARKER = "sbd-clipboard";
const SBD_DATA_PREFIX = "sbd-nodes:";

/** Encode nodes as a base64 JSON string (Unicode-safe). */
export function encodeClipboardNodes(nodes: SpatialNode[]): string {
  const json = JSON.stringify(nodes);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

/** Decode nodes previously encoded with encodeClipboardNodes. */
function decodeClipboardNodes(encoded: string): SpatialNode[] | null {
  try {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/** Extract embedded node data from clipboard HTML (cross-tab paste). */
export function extractEmbeddedNodes(html: string): SpatialNode[] | null {
  // Try data attribute first (survives cross-browser clipboard sanitization)
  const attrMatch = html.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (attrMatch) return decodeClipboardNodes(attrMatch[1]);
  // Fallback: HTML comment (same-browser only, comments get stripped cross-browser)
  const commentMatch = html.match(
    new RegExp(`<!--${SBD_DATA_PREFIX}([A-Za-z0-9+/=]+)-->`),
  );
  if (commentMatch) return decodeClipboardNodes(commentMatch[1]);
  return null;
}

/** Check if the event target is inside an inline editor / input */
function isEditorTarget(el: HTMLElement): boolean {
  return (
    !!el.closest(".bn-editor") ||
    el.isContentEditable ||
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA"
  );
}

/** Recursively extract plain text from BlockNote block array */
function extractBlockText(blocks: unknown[]): string {
  return (
    blocks as Array<{
      content?: Array<{ type: string; text?: string }>;
      children?: unknown[];
    }>
  )
    .map((b) => {
      const inline = (b.content || [])
        .filter((c) => c.type === "text")
        .map((c) => c.text ?? "")
        .join("");
      const children = b.children?.length
        ? "\n" + extractBlockText(b.children)
        : "";
      return inline + children;
    })
    .filter(Boolean)
    .join("\n");
}

/** Build a plain-text representation of copied nodes for the system clipboard */
function nodesToPlainText(nodes: SpatialNode[]): string {
  const parts: string[] = [];
  for (const node of nodes) {
    switch (node.type) {
      case "content": {
        const d = node.data as ContentNode["data"];
        if (d.blocks?.length) parts.push(extractBlockText(d.blocks));
        else if (d.markdown) parts.push(d.markdown);
        break;
      }
      case "image": {
        const d = node.data as ImageNode["data"];
        if (d.src.startsWith("http")) parts.push(d.src);
        else parts.push(d.alt || "[Image]");
        break;
      }
      case "shape": {
        const d = node.data as { label?: string; shape: string };
        if (d.label) parts.push(d.label);
        break;
      }
      case "text": {
        const d = node.data as TextNode["data"];
        if (d.text) parts.push(d.text);
        break;
      }
      case "sticky": {
        const d = node.data as StickyNoteNode["data"];
        if (d.text) parts.push(d.text);
        break;
      }
      case "draw":
        break;
      case "edge": {
        const d = node.data as { label?: string };
        if (d.label) parts.push(d.label);
        break;
      }
    }
  }
  return parts.join("\n\n");
}

/**
 * Write SBD marker (HTML comment) + text fallback to the DataTransfer.
 * The comment survives clipboard round-trips — hidden elements do not.
 */
function writeToClipboard(
  clipboardData: DataTransfer,
  nodes: SpatialNode[],
): string {
  const textFallback = nodesToPlainText(nodes);
  const htmlParts = textFallback
    .split("\n")
    .filter(Boolean)
    .map((l) => `<p>${l}</p>`)
    .join("");
  const encoded = encodeClipboardNodes(nodes);
  // Dual encoding: data attribute survives cross-browser, comment survives same-browser
  clipboardData.setData(
    "text/html",
    `<!--${SBD_MARKER}--><div data-sbd-nodes="${encoded}">${htmlParts || "<p></p>"}</div>`,
  );
  clipboardData.setData("text/plain", textFallback);
  return textFallback;
}

export function setupKeyboardHandler(engine: SpatialEngine, container?: HTMLElement | null): () => void {
  let currentDoc = container?.ownerDocument ?? document;
  let currentWin = currentDoc.defaultView ?? window;
  let lastClientX = currentWin.innerWidth / 2;
  let lastClientY = currentWin.innerHeight / 2;

  /**
   * The exact text/plain string we last wrote to the system clipboard.
   * Used to detect whether a paste comes from us or an external app.
   */
  let lastWrittenText: string | null = null;

  const onPointerMove = (e: PointerEvent) => {
    lastClientX = e.clientX;
    lastClientY = e.clientY;
  };

  // ── Copy event ──────────────────────────────────────────────────
  // Fires after keydown (if not prevented) — writes to system clipboard.
  const onCopy = (e: ClipboardEvent) => {
    if (isEditorTarget(e.target as HTMLElement)) return;
    if (engine.selection.size === 0) return;
    e.preventDefault();
    engine.copySelected();
    lastWrittenText = writeToClipboard(
      e.clipboardData!,
      engine.getClipboardNodes(),
    );
  };

  // ── Cut event ───────────────────────────────────────────────────
  const onCut = (e: ClipboardEvent) => {
    if (isEditorTarget(e.target as HTMLElement)) return;
    if (engine.selection.size === 0) return;
    e.preventDefault();
    engine.copySelected();
    lastWrittenText = writeToClipboard(
      e.clipboardData!,
      engine.getClipboardNodes(),
    );
    engine.deleteSelected();
  };

  /**
   * Stops default insertion and blocks other bubble listeners on the same target
   * (e.g. a second `paste` listener on `document` from a duplicate handler registration).
   */
  const consumePasteEvent = (ev: ClipboardEvent) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
  };

  // ── Paste event ─────────────────────────────────────────────────
  const onPaste = async (e: ClipboardEvent) => {
    if (isEditorTarget(e.target as HTMLElement)) return;

    const { x, y } = engine.screenToCanvas(lastClientX, lastClientY);
    const html = e.clipboardData?.getData("text/html") || "";
    const text = e.clipboardData?.getData("text/plain") || "";

    // 1) Detect our own clipboard — marker comment, data attribute, or text signature
    const isOurs =
      html.includes(SBD_MARKER) ||
      html.includes("data-sbd-nodes=") ||
      (lastWrittenText !== null && text === lastWrittenText);

    if (isOurs) {
      // Same-tab paste: lastWrittenText matches → use internal clipboard
      const isSameTab = lastWrittenText !== null && text === lastWrittenText;
      if (isSameTab && engine.hasClipboard()) {
        consumePasteEvent(e);
        engine.pasteClipboard(x, y);
        return;
      }
      // Cross-tab/window paste: extract embedded node data from HTML
      const embedded = extractEmbeddedNodes(html);
      if (embedded) {
        consumePasteEvent(e);
        engine.setClipboard(embedded);
        engine.pasteClipboard(x, y);
        return;
      }
      // HTML still looks like ours but embedded data failed — avoid falling through
      // to image/HTML paths (would paste twice or paste the wrong representation).
      if (html.includes(SBD_MARKER) || html.includes("data-sbd-nodes=")) {
        consumePasteEvent(e);
        if (engine.hasClipboard()) {
          engine.pasteClipboard(x, y);
        }
        return;
      }
    }

    // 2) Image from system clipboard (screenshot, copied file, etc.)
    const items = e.clipboardData?.items;
    if (items) {
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (!file) continue;
          consumePasteEvent(e);
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            const img = new Image();
            img.onload = () => {
              const pos = engine.screenToCanvas(lastClientX, lastClientY);
              const maxW = 400;
              const maxH = 300;
              const aspect = img.naturalWidth / img.naturalHeight;
              const w = Math.min(img.naturalWidth, maxW);
              const h = Math.min(img.naturalHeight, maxH);
              const finalW = aspect >= 1 ? w : h * aspect;
              const finalH = aspect >= 1 ? w / aspect : h;
              // Prefer the original URL for animated images (GIF, APNG, animated WebP)
              // since the clipboard blob is often a static PNG screenshot
              let src = dataUrl;
              if (html) {
                const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
                if (m && /\.(gif|webp|apng)(\?|#|$)/i.test(m[1])) {
                  src = m[1].replace(/&amp;/g, "&");
                }
              }
              const node: ImageNode = {
                id: nanoid(10),
                type: "image",
                x: pos.x,
                y: pos.y,
                w: finalW,
                h: finalH,
                z: engine.nextZ(),
                data: { src },
              };
              engine.addNode(node);
              engine.select(node.id);
            };
            img.src = dataUrl;
          };
          reader.readAsDataURL(file);
          return;
        }
      }
    }

    // 3) SVG source code pasted as text or HTML
    const svgSource =
      extractSvgMarkup(text) ?? extractSvgMarkup(html);
    if (svgSource) {
      consumePasteEvent(e);
      const pos = engine.screenToCanvas(lastClientX, lastClientY);
      const node = await svgTextToImageNode(
        svgSource,
        pos.x,
        pos.y,
        engine.nextZ(),
      );
      if (node) {
        engine.addNode(node);
        engine.select(node.id);
      }
      return;
    }

    // 3.5) YouTube URL pasted as text
    if (isYouTubeUrl(text)) {
      const videoId = extractYouTubeVideoId(text);
      if (videoId) {
        consumePasteEvent(e);
        const node: YouTubeNode = {
          id: nanoid(10),
          type: "youtube",
          x,
          y,
          w: 560,
          h: 315,
          z: engine.nextZ(),
          data: { videoId, url: text.trim() },
        };
        engine.addNode(node);
        engine.select(node.id);
        return;
      }
    }

    // 4) Rich HTML from external apps (rendered markdown, web pages, etc.)
    //    Strip Chrome's clipboard wrapper to get the actual content.
    const cleanHtml = html
      .replace(/^<meta[^>]*>/i, "")
      .replace(/<!--StartFragment-->|<!--EndFragment-->/g, "")
      .trim();
    if (cleanHtml) {
      try {
        const blocks = htmlToBlocks(cleanHtml);
        if (blocks.length > 0) {
          consumePasteEvent(e);
          const node: ContentNode = {
            id: nanoid(10),
            type: "content",
            x,
            y,
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
        // HTML parsing failed, fall through to plain text
      }
    }

    // 5) Plain text fallback
    if (text.trim()) {
      consumePasteEvent(e);
      const blocks = await markdownToBlocks(text);
      const node: ContentNode = {
        id: nanoid(10),
        type: "content",
        x,
        y,
        w: 300,
        h: "auto",
        z: engine.nextZ(),
        data: { blocks, markdown: text, borderColor: "#1e1e2e" },
      };
      engine.addNode(node);
      engine.select(node.id);
      return;
    }

    // 6) Fall back to internal clipboard
    if (engine.hasClipboard()) {
      consumePasteEvent(e);
      engine.pasteClipboard(x, y);
    }
  };

  // ── Keyboard shortcuts ──────────────────────────────────────────
  const handler = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (isEditorTarget(target)) return;

    // ── Presentation mode ──
    if (engine.presentationMode) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        engine.presentationNext();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        engine.presentationPrev();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        engine.exitPresentation();
        return;
      }
      return; // Swallow other keys during presentation
    }

    const mod = e.ctrlKey || e.metaKey;

    // ── Copy ──
    // Set internal clipboard immediately; do NOT preventDefault so the
    // browser fires the native copy event and our onCopy handler can
    // write to the system clipboard via clipboardData.
    if (mod && e.key === "c") {
      engine.copySelected();
      return;
    }

    // ── Cut ──
    // Same strategy: let the cut event fire for system clipboard write.
    if (mod && e.key === "x") {
      engine.copySelected();
      // Deletion happens in the onCut handler after writing to clipboard
      return;
    }

    // Paste is fully handled by the paste event listener above.

    // Open in-canvas search
    if (mod && e.key.toLowerCase() === "f") {
      e.preventDefault();
      currentDoc.dispatchEvent(new CustomEvent("sb:search-open"));
      return;
    }

    // Duplicate
    if (mod && e.key === "d") {
      e.preventDefault();
      engine.duplicateSelected();
      return;
    }

    // Group / Ungroup
    if (mod && e.key === "g") {
      e.preventDefault();
      if (e.shiftKey) engine.ungroupSelected();
      else engine.groupSelected();
      return;
    }

    // Flip (Shift+H / Shift+V, no Cmd)
    if (e.shiftKey && !mod && e.key === "H") {
      e.preventDefault();
      engine.flipSelectedHorizontal();
      return;
    }
    if (e.shiftKey && !mod && e.key === "V") {
      e.preventDefault();
      engine.flipSelectedVertical();
      return;
    }

    // Z-ordering
    if (mod && e.key === "]") {
      e.preventDefault();
      const ids = Array.from(engine.selection);
      if (e.altKey) engine.bringToFront(ids);
      else engine.bringForward(ids);
      return;
    }
    if (mod && e.key === "[") {
      e.preventDefault();
      const ids = Array.from(engine.selection);
      if (e.altKey) engine.sendToBack(ids);
      else engine.sendBackward(ids);
      return;
    }

    // ── Mode shortcuts — only when NO modifier is held ──
    if (!mod && !e.altKey && !e.shiftKey) {
      if (e.key === "s") { engine.setMode("select"); return; }
      if (e.key === "p") { engine.setMode("hand"); return; }
      if (e.key === "d") { engine.setMode("draw"); return; }
      if (e.key === "g") { engine.setMode("shape"); return; }
      if (e.key === "t") { engine.setMode("text"); return; }
      if (e.key === "b") { engine.setMode("note"); return; }
      if (e.key === "y") { engine.setMode("sticky"); return; }
      if (e.key === "f") { engine.setMode("frame"); return; }
      if (e.key === "c") { engine.setMode("edge"); return; }
      if (e.key === "e") { engine.setMode("erase"); return; }
      if (e.key === "l") {
        engine.toggleLassoSelect();
        return;
      }
      if (e.key === "z") {
        engine.setMode("laser");
        return;
      }
    }

    // Delete
    if (e.key === "Delete" || e.key === "Backspace") {
      engine.deleteSelected();
      return;
    }

    // Undo / Redo
    if (mod && e.key === "z") {
      e.preventDefault();
      if (e.shiftKey) engine.redo();
      else engine.undo();
      return;
    }

    // Select all
    if (mod && e.key === "a") {
      e.preventDefault();
      engine.selectMultiple(engine.getAllNodes().map((n) => n.id));
      return;
    }

    // Escape
    if (e.key === "Escape") {
      // If inside a group, exit it first (re-selects entire group)
      if (engine.activeGroupId) {
        engine.exitGroup();
        return;
      }
      engine.deselectAll();
      engine.setMode("select");
      return;
    }

    // Zoom
    if (mod && (e.key === "=" || e.key === "+")) {
      e.preventDefault();
      engine.zoomIn();
      return;
    }
    if (mod && e.key === "-") {
      e.preventDefault();
      engine.zoomOut();
      return;
    }
    if (mod && e.key === "0") {
      e.preventDefault();
      engine.fitToContent();
      return;
    }
  };

  function registerListeners(doc: Document, win: Window) {
    doc.addEventListener("pointermove", onPointerMove);
    doc.addEventListener("copy", onCopy);
    doc.addEventListener("cut", onCut);
    doc.addEventListener("paste", onPaste);
    win.addEventListener("keydown", handler);
  }

  function unregisterListeners(doc: Document, win: Window) {
    doc.removeEventListener("pointermove", onPointerMove);
    doc.removeEventListener("copy", onCopy);
    doc.removeEventListener("cut", onCut);
    doc.removeEventListener("paste", onPaste);
    win.removeEventListener("keydown", handler);
  }

  registerListeners(currentDoc, currentWin);

  // Poll for ownerDocument changes (pop-out / float windows move the DOM
  // to a new document — our listeners on the old doc/win stop receiving events).
  const pollId = setInterval(() => {
    if (!container) return;
    const newDoc = container.ownerDocument;
    if (newDoc !== currentDoc) {
      unregisterListeners(currentDoc, currentWin);
      currentDoc = newDoc;
      currentWin = newDoc.defaultView ?? window;
      lastClientX = currentWin.innerWidth / 2;
      lastClientY = currentWin.innerHeight / 2;
      registerListeners(currentDoc, currentWin);
    }
  }, 500);

  return () => {
    clearInterval(pollId);
    unregisterListeners(currentDoc, currentWin);
  };
}
