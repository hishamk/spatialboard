import { useRef, useState, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import { flushSync } from "react-dom";
import { nanoid } from "nanoid";
import { SpatialEngine } from "../engine/SpatialEngine";
import type { AlignGuide } from "../engine/SpatialEngine";
import type {
  Viewport,
  SpatialNode,
  Mode,
  ContentNode,
  DrawNode,
  ShapeNode,
  EdgeNode,
  ImageNode,
  TextNode,
  FrameNode,
  StickyNoteNode,
  HandleSide,
} from "../engine/types";
import type { BoardBackground } from "../engine/SpatialEngine";
import type { SBDSchema } from "../schema";
import type { NodeTypeRegistry, NodeCallbacks } from "../nodes/registry";
import type { DataFlowEngine } from "../engine/DataFlowEngine";
import type { HandlePosition } from "./SVGLayer";
import GridBackground from "./GridBackground";
import { getPaperType } from "./paper-types";
import { install as installExcalidrawLib, getItems as getLibraryItems } from "../excalidraw/library-store";
import type { ExcalidrawLibFileRaw } from "../excalidraw/types";
import { placeLibraryItem, placePersonalItem, LIBRARY_ITEM_MIME, PERSONAL_ITEM_MIME } from "./sidebar/LibraryPanel";
import { GIF_ITEM_MIME, placeGif } from "./sidebar/GifSearchPanel";
import { addPersonalItem, getPersonalItems } from "../store/personal-library";
import PersonalLibraryPrompt from "./PersonalLibraryPrompt";
import { extractSvgMarkup, placeSvgOnCanvas } from "../utils/svg-import";
import ContentBlock from "./ContentBlock";
import SVGNodeBlock from "./SVGNodeBlock";
import ImageBlock from "./ImageBlock";
import TextNodeBlock from "./TextNodeBlock";
import StickyNoteBlock from "./StickyNoteBlock";
import SVGLayer from "./SVGLayer";
import ContextMenu from "./ContextMenu";
import type { ContextMenuSection } from "./ContextMenu";
import { htmlToBlocks, markdownToBlocks } from "../serialization/blocknote-markdown";
import { getRotatedCursor } from "../interactions/resize-cursors";
import { encodeClipboardNodes, extractEmbeddedNodes } from "../interactions/keyboard-handler";
import { getFontFamilyCSS, DEFAULT_FONT } from "../fonts";
import {
  hitTestEdge,
  hitTestAllEdges,
  computeEdgeEndpoints,
  segmentIntersectsRect,
  nearestHandle,
  getNodeHandlePositions,
  computeEdgePath,
  getPortPosition,
} from "../engine/edge-geometry";
import type { PortPositionResolver } from "../engine/edge-geometry";
import { isPointInShapeNode } from "../engine/spatial-index";
import { exportBoard } from "../export/canvas-export";
import { getPreset, getAspectRatio } from "./sidebar/devicePresets";

/** Return black or white depending on which contrasts better with `hex`. */
function contrastingTextColor(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) || 0;
  const g = parseInt(c.substring(2, 4), 16) || 0;
  const b = parseInt(c.substring(4, 6), 16) || 0;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? "#1e1e2e" : "#ffffff";
}

/** Ray-casting point-in-polygon test. */
function pointInPolygon(px: number, py: number, polygon: Array<[number, number]>): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * Read the system clipboard and paste appropriately.
 * Falls back to the engine's internal clipboard on error or if
 * the clipboard content originated from this board (SBD marker).
 */
async function pasteFromSystemClipboard(
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

    // Rich HTML from external app (rendered markdown, web page, etc.)
    if (externalHtml) {
      const cleanHtml = externalHtml
        .replace(/^<meta[^>]*>/i, "")
        .replace(/<!--StartFragment-->|<!--EndFragment-->/g, "")
        .trim();
      try {
        const blocks = htmlToBlocks(cleanHtml);
        if (blocks.length > 0) {
          const node: ContentNode = {
            id: nanoid(10),
            type: "content",
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
    if (text?.trim()) {
      const blocks = await markdownToBlocks(text);
      const node: ContentNode = {
        id: nanoid(10),
        type: "content",
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
async function copyToSystemClipboard(
  engine: SpatialEngine,
): Promise<void> {
  const nodes = engine.getClipboardNodes();
  if (nodes.length === 0) return;

  // Build a plain-text fallback from node contents
  const parts: string[] = [];
  for (const node of nodes) {
    if (node.type === "content") {
      const d = node.data as ContentNode["data"];
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

function getCursorForMode(mode: Mode): string {
  switch (mode) {
    case "select":
      return "default";
    case "text":
      return "text";
    case "note":
      return "text";
    case "sticky":
      return "crosshair";
    case "draw":
      return "crosshair";
    case "shape":
      return "crosshair";
    case "edge":
      return "crosshair";
    case "frame":
      return "crosshair";
    case "erase": {
      const size = 20;
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><circle cx='${size / 2}' cy='${size / 2}' r='${size / 2 - 1}' fill='none' stroke='%239ca3af' stroke-width='1.5'/></svg>`;
      return `url("data:image/svg+xml,${svg}") ${size / 2} ${size / 2}, crosshair`;
    }
    case "laser": {
      const size = 16;
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><circle cx='${size / 2}' cy='${size / 2}' r='3' fill='%23ef4444'/><circle cx='${size / 2}' cy='${size / 2}' r='${size / 2 - 1}' fill='none' stroke='%23ef4444' stroke-width='1' opacity='0.4'/></svg>`;
      return `url("data:image/svg+xml,${svg}") ${size / 2} ${size / 2}, crosshair`;
    }
    case "hand":
      return "grab";
    default:
      return "default";
  }
}

// Lasso cursor — a small lasso loop icon
function pinchMetrics(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return { dist: Math.sqrt(dx * dx + dy * dy), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
}

const LASSO_CURSOR = (() => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>`;
  return `url("data:image/svg+xml,${svg}") 12 3, crosshair`;
})();

/**
 * Wrapper for registry-rendered nodes.
 * Handles absolute positioning and auto-height measurement via ResizeObserver.
 */
function RegistryNodeWrapper({
  node,
  isInteractive,
  measuredH,
  onMeasuredHeight,
  observeElement,
  unobserveElement,
  isContainer,
  children,
}: {
  node: SpatialNode;
  isInteractive: boolean;
  measuredH: number | undefined;
  onMeasuredHeight: (nodeId: string, height: number) => void;
  observeElement: (el: Element, callback: (entry: ResizeObserverEntry) => void) => void;
  unobserveElement: (el: Element) => void;
  isContainer?: boolean;
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.h !== "auto") return;
    const el = wrapRef.current;
    if (!el) return;
    // Initial measurement
    const h = el.offsetHeight;
    if (h > 0) onMeasuredHeight(node.id, h);
    // Subscribe to shared ResizeObserver
    observeElement(el, () => {
      const measured = el.offsetHeight;
      if (measured > 0) onMeasuredHeight(node.id, measured);
    });
    return () => unobserveElement(el);
  }, [node.id, node.h, onMeasuredHeight, observeElement, unobserveElement]);

  const h = node.h === "auto" ? (measuredH ?? "auto") : node.h;

  const wrapperStyle = useMemo<React.CSSProperties>(() => ({
    position: "absolute",
    left: node.x,
    top: node.y,
    width: node.w,
    height: h,
    zIndex: node.z,
    pointerEvents: isContainer ? "none" : isInteractive ? "auto" : "none",
    transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
    transformOrigin: "center center",
  }), [node.x, node.y, node.w, h, node.z, node.rotation, isContainer, isInteractive]);

  return (
    <div
      ref={wrapRef}
      data-node-id={node.id}
      className={isInteractive ? undefined : "sb-block-inert"}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
}

/** Inline label editor for ShapeNodes — mirrors the StickyNoteBlock pattern
 *  of committing via a cleanup effect so click-away (which clears editing
 *  state and unmounts this before blur fires) still persists the label. */
function ShapeLabelEditor({
  node,
  engine,
  onDone,
}: {
  node: ShapeNode;
  engine: SpatialEngine;
  onDone: () => void;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const latestRef = useRef(node.data.label ?? "");
  const nodeRef = useRef(node);
  nodeRef.current = node;
  // Track initial label so we can push history when editing ends, even if real-time
  // sync has already brought node.data.label up to date.
  const initialLabelRef = useRef(node.data.label ?? "");

  // Commit label when this component unmounts (editing ends).
  useEffect(() => {
    return () => {
      const cur = nodeRef.current;
      const val = latestRef.current.trim();
      if (val !== initialLabelRef.current) {
        const newData = { ...cur.data, label: val || undefined };
        const updates: Partial<ShapeNode> = { data: newData };
        // Auto-grow height
        const ta = taRef.current;
        if (ta && val) {
          const paddingV = 24;
          const nh = cur.h === "auto" ? 100 : (cur.h as number);
          const minH = ta.scrollHeight + paddingV;
          if (minH > nh) updates.h = minH;
        }
        engine.updateNodeWithHistory(cur.id, updates as Partial<ShapeNode>);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nh = node.h === "auto" ? 100 : (node.h as number);
  const fontSize = node.data.labelFontSize ?? 14;
  const labelColor =
    node.data.fill && node.data.fillStyle === "solid"
      ? contrastingTextColor(node.data.fill)
      : node.data.stroke;

  return (
    <div
      data-node-id={node.id}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        height: nh,
        zIndex: 999998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
        padding: "8px 12px",
        boxSizing: "border-box",
      }}
    >
      <textarea
        ref={taRef}
        autoFocus
        defaultValue={node.data.label ?? ""}
        placeholder=""
        rows={1}
        onBlur={() => onDone()}
        onKeyDown={(e) => {
          if (e.key === "Escape") (e.currentTarget as HTMLTextAreaElement).blur();
          e.stopPropagation();
        }}
        onInput={(e) => {
          const ta = e.currentTarget as HTMLTextAreaElement;
          latestRef.current = ta.value;
          // Sync label text in real-time for collaboration
          const cur = nodeRef.current;
          engine.updateNode(cur.id, {
            data: { ...cur.data, label: ta.value || undefined },
          } as Partial<ShapeNode>);
          // Auto-resize textarea
          ta.style.height = "auto";
          ta.style.height = ta.scrollHeight + "px";
          // Grow shape if needed
          const paddingV = 24;
          const neededH = ta.scrollHeight + paddingV;
          if (neededH > nh) {
            engine.updateNode(node.id, { h: neededH } as Partial<ShapeNode>);
          }
        }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          textAlign: node.data.labelAlign ?? "center",
          fontSize,
          fontFamily: getFontFamilyCSS(node.data.labelFontFamily ?? DEFAULT_FONT),
          color: labelColor,
          background: "transparent",
          border: "none",
          outline: "none",
          resize: "none",
          overflow: "hidden",
          width: "100%",
          padding: 0,
          margin: 0,
          lineHeight: 1.3,
          wordBreak: "break-word",
          whiteSpace: "pre-wrap",
        }}
      />
    </div>
  );
}

export default function SpatialCanvas({
  engine,
  schema,
  registry,
  dataFlow,
}: {
  engine: SpatialEngine;
  schema: SBDSchema;
  registry?: NodeTypeRegistry;
  dataFlow?: DataFlowEngine | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  /** Get the ownerDocument of the canvas container (supports pop-out windows). */
  const ownerDoc = () => containerRef.current?.ownerDocument ?? document;
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [viewport, setViewport] = useState<Viewport>({ ...engine.viewport });
  const [nodes, setNodes] = useState<SpatialNode[]>(engine.getAllNodes());
  const [selection, setSelection] = useState<Set<string>>(
    new Set(engine.selection)
  );
  const [mode, setMode] = useState<Mode>(engine.mode);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(engine.activeGroupId);
  const [gridActive, setGridActive] = useState(engine.snapToGrid);
  const [gridSize, setGridSize] = useState(engine.gridSize);
  const [smartGuidesActive, setSmartGuidesActive] = useState(engine.smartGuides);
  const [alignGuides, setAlignGuides] = useState<AlignGuide[]>([]);
  const [boardBackground, setBoardBackground] = useState<BoardBackground>(engine.boardBackground);

  // Space-to-pan: track whether Space is held for temporary hand mode
  const spaceHeldRef = useRef(false);
  const spacePanActiveRef = useRef(false);

  // Multi-touch / pinch-to-zoom tracking
  const activeTouchesRef = useRef(new Map<number, { x: number; y: number }>());
  const isPinchingRef = useRef(false);
  const activePenRef = useRef(false);

  // Long-press context menu (touch)
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressOriginRef = useRef<{ clientX: number; clientY: number } | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && !e.repeat && !spaceHeldRef.current) {
        // Don't intercept Space if user is typing in an input/textarea/contentEditable
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
        spaceHeldRef.current = true;
        const container = containerRef.current;
        if (container) container.style.cursor = "grab";
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") {
        spaceHeldRef.current = false;
        spacePanActiveRef.current = false;
        const container = containerRef.current;
        if (container) container.style.cursor = engine.lassoSelect ? LASSO_CURSOR : getCursorForMode(engine.mode);
      }
    };
    // Use window to catch Space even when focus is not on the canvas
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  // Global cleanup for multi-touch pointers (handles pointerup/pointercancel outside React synthetic events)
  useEffect(() => {
    const cleanup = (e: PointerEvent) => {
      activeTouchesRef.current.delete(e.pointerId);
      if (e.pointerType === "pen") activePenRef.current = false;
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
        longPressOriginRef.current = null;
      }
    };
    const doc = ownerDoc();
    doc.addEventListener("pointerup", cleanup);
    doc.addEventListener("pointercancel", cleanup);
    return () => {
      doc.removeEventListener("pointerup", cleanup);
      doc.removeEventListener("pointercancel", cleanup);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Drawing state
  const [activeStroke, setActiveStroke] = useState<{
    points: Array<[number, number, number]>;
    color: string;
    width: number;
    strokeStyle?: "solid" | "dashed" | "dotted";
  } | null>(null);

  // Shape preview state
  const [shapePreview, setShapePreview] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  // Edge creation preview state
  const [edgePreview, setEdgePreview] = useState<{
    fromNode: SpatialNode;
    cursorX: number;
    cursorY: number;
    sourceHandle?: HandleSide;
    /** Port ID on the source node (for port-aware edge creation). */
    sourcePort?: string;
    /** Direction of the source port. */
    sourceDirection?: "input" | "output";
  } | null>(null);

  const [edgeReconnect, setEdgeReconnect] = useState<{
    edgeId: string;
    endpoint: "source" | "target";
    anchorNodeId: string;
    anchorHandle: HandleSide | undefined;
    cursorX: number;
    cursorY: number;
  } | null>(null);

  // Track container size for viewport culling + update container offset for coordinate conversion
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    engine.setContainer(el);
    const updateOffset = () => {
      const rect = el.getBoundingClientRect();
      engine.containerOffset = { x: rect.left, y: rect.top };
    };
    updateOffset();
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect ?? { width: 0, height: 0 };
      setContainerSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
      engine.setContainerSize(width, height);
      updateOffset();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [engine]);

  // Measured heights for auto-height content blocks (for accurate selBounds)
  const [measuredHeights, setMeasuredHeights] = useState<Record<string, number>>({});
  const handleMeasuredHeight = useCallback((nodeId: string, height: number) => {
    setMeasuredHeights((prev) =>
      prev[nodeId] === height ? prev : { ...prev, [nodeId]: height }
    );
    engine.updateMeasuredHeight(nodeId, height);
  }, [engine]);

  // Shared ResizeObserver for all RegistryNodeWrapper auto-height nodes.
  // Instead of each wrapper creating its own ResizeObserver, we share one.
  const sharedObserverRef = useRef<ResizeObserver | null>(null);
  const observerCallbacksRef = useRef<Map<Element, (entry: ResizeObserverEntry) => void>>(new Map());

  function getSharedObserver() {
    if (!sharedObserverRef.current) {
      sharedObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          observerCallbacksRef.current.get(entry.target)?.(entry);
        }
      });
    }
    return sharedObserverRef.current;
  }

  const observeElement = useCallback((el: Element, callback: (entry: ResizeObserverEntry) => void) => {
    observerCallbacksRef.current.set(el, callback);
    getSharedObserver().observe(el);
  }, []);

  const unobserveElement = useCallback((el: Element) => {
    observerCallbacksRef.current.delete(el);
    sharedObserverRef.current?.unobserve(el);
  }, []);

  // Clean up the shared observer on unmount
  useEffect(() => {
    return () => {
      sharedObserverRef.current?.disconnect();
      sharedObserverRef.current = null;
      observerCallbacksRef.current.clear();
    };
  }, []);

  // Prune measuredHeights when nodes are removed to avoid unbounded growth
  const nodeIds = useMemo(() => new Set(nodes.map((n) => n.id)), [nodes]);
  useEffect(() => {
    setMeasuredHeights((prev) => {
      let changed = false;
      const next: Record<string, number> = {};
      for (const [id, h] of Object.entries(prev)) {
        if (nodeIds.has(id)) {
          next[id] = h;
        } else {
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [nodeIds]);

  // Port position resolver for edge hit-testing (so clicks land on port-connected edges)
  const resolvePortPositions = useCallback<PortPositionResolver>(
    (edge, fromNode, toNode) => {
      let sourcePortPos: { x: number; y: number } | undefined;
      let targetPortPos: { x: number; y: number } | undefined;
      if (registry && edge.data.sourcePort) {
        const srcDef = registry.get(fromNode.type);
        if (srcDef?.ports) {
          sourcePortPos = getPortPosition(fromNode, srcDef.ports, edge.data.sourcePort, viewport.zoom, measuredHeights) ?? undefined;
        }
      }
      if (registry && edge.data.targetPort) {
        const tgtDef = registry.get(toNode.type);
        if (tgtDef?.ports) {
          targetPortPos = getPortPosition(toNode, tgtDef.ports, edge.data.targetPort, viewport.zoom, measuredHeights) ?? undefined;
        }
      }
      return { sourcePortPos, targetPortPos };
    },
    [registry, viewport.zoom, measuredHeights]
  );

  const handleZoomToNode = useCallback(
    (nodeId: string) => engine.zoomToNode(nodeId),
    [engine]
  );

  // Compute AABB of a node, accounting for rotation (axis-aligned box that fully contains the rotated rect)
  const getNodeAABB = useCallback(
    (n: SpatialNode, h: number) => {
      if (!n.rotation) {
        return { minX: n.x, minY: n.y, maxX: n.x + n.w, maxY: n.y + h };
      }
      const cx = n.x + n.w / 2;
      const cy = n.y + h / 2;
      const θ = (n.rotation * Math.PI) / 180;
      const cos = Math.cos(θ);
      const sin = Math.sin(θ);
      const corners = [
        [n.w / 2, h / 2],
        [-n.w / 2, h / 2],
        [-n.w / 2, -h / 2],
        [n.w / 2, -h / 2],
      ];
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (const [rx, ry] of corners) {
        const wx = cx + rx * cos - ry * sin;
        const wy = cy + rx * sin + ry * cos;
        minX = Math.min(minX, wx);
        minY = Math.min(minY, wy);
        maxX = Math.max(maxX, wx);
        maxY = Math.max(maxY, wy);
      }
      return { minX, minY, maxX, maxY };
    },
    []
  );

  // Padding to fully encompass rotated items, borders, shadows, and strokes
  const SEL_PAD = 8;

  // Marquee hit uses proper AABBs (rotation) + tolerance so "a bit on" selects
  const getNodesInMarqueeRect = useCallback(
    (
      rect: { x: number; y: number; w: number; h: number },
      nodeList: SpatialNode[]
    ): SpatialNode[] => {
      return nodeList.filter((n) => {
        if (n.type === "edge") {
          const data = (n as EdgeNode).data;
          const from = engine.getNode(data.fromId);
          const to = engine.getNode(data.toId);
          if (!from || !to) return false;
          // Both endpoints must be inside the marquee
          const { x1, y1, x2, y2 } = computeEdgeEndpoints(from, to, measuredHeights);
          return (
            x1 >= rect.x && x1 <= rect.x + rect.w &&
            y1 >= rect.y && y1 <= rect.y + rect.h &&
            x2 >= rect.x && x2 <= rect.x + rect.w &&
            y2 >= rect.y && y2 <= rect.y + rect.h
          );
        }
        const h =
          n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
        const aabb = getNodeAABB(n, h);
        // Node must be fully contained within the marquee
        return (
          aabb.minX >= rect.x &&
          aabb.maxX <= rect.x + rect.w &&
          aabb.minY >= rect.y &&
          aabb.maxY <= rect.y + rect.h
        );
      });
    },
    [getNodeAABB, measuredHeights]
  );

  const getNodesInLassoPolygon = useCallback(
    (polygon: Array<[number, number]>, nodeList: SpatialNode[]): SpatialNode[] => {
      if (polygon.length < 3) return [];
      return nodeList.filter((n) => {
        if (n.type === "edge") {
          const edge = n as EdgeNode;
          const from = engine.getNode(edge.data.fromId);
          const to = engine.getNode(edge.data.toId);
          if (!from || !to) return false;
          const { x1, y1, x2, y2 } = computeEdgeEndpoints(from, to, measuredHeights);
          return pointInPolygon(x1, y1, polygon) && pointInPolygon(x2, y2, polygon);
        }
        const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
        const cx = n.x + n.w / 2;
        const cy = n.y + h / 2;
        return pointInPolygon(cx, cy, polygon);
      });
    },
    [engine, measuredHeights]
  );

  // Unified bounding box for multi-selection (uses measured heights + rotation)
  const selBounds = useMemo(() => {
    if (selection.size < 2) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const id of selection) {
      const n = nodes.find((nd) => nd.id === id);
      if (!n || n.type === "edge") continue;
      const h =
        n.h === "auto"
          ? (measuredHeights[n.id] ?? 100)
          : (n.h as number);
      const aabb = getNodeAABB(n, h);
      minX = Math.min(minX, aabb.minX);
      minY = Math.min(minY, aabb.minY);
      maxX = Math.max(maxX, aabb.maxX);
      maxY = Math.max(maxY, aabb.maxY);
    }
    if (minX === Infinity) return null;
    return {
      x: minX - SEL_PAD,
      y: minY - SEL_PAD,
      w: maxX - minX + SEL_PAD * 2,
      h: maxY - minY + SEL_PAD * 2,
    };
  }, [selection, nodes, measuredHeights, getNodeAABB]);

  // Bounding box for the active (entered) group — dashed indicator
  const activeGroupBounds = useMemo(() => {
    if (!activeGroupId) return null;
    const members = engine.getAllGroupDescendantNodes(activeGroupId);
    if (members.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of members) {
      if (n.type === "edge") continue;
      const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
      const aabb = getNodeAABB(n, h);
      minX = Math.min(minX, aabb.minX);
      minY = Math.min(minY, aabb.minY);
      maxX = Math.max(maxX, aabb.maxX);
      maxY = Math.max(maxY, aabb.maxY);
    }
    if (minX === Infinity) return null;
    const pad = 8;
    return { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
  }, [activeGroupId, nodes, measuredHeights, getNodeAABB, engine]);

  // Viewport culling: only render nodes in (or near) the visible area to reduce DOM when zooming/panning
  const visibleNodes = useMemo(() => {
    const renderable = nodes.filter(
      (n) => {
        if (registry) {
          const def = registry.get(n.type);
          return def && !def.isSVGOnly;
        }
        return (
          n.type === "content" ||
          n.type === "draw" ||
          n.type === "shape" ||
          n.type === "image" ||
          n.type === "text" ||
          n.type === "frame" ||
          n.type === "sticky"
        );
      }
    );
    const threshold =
      viewport.zoom < 0.5 ? 15 : viewport.zoom < 1 ? 25 : 30;
    if (
      containerSize.w <= 0 ||
      containerSize.h <= 0 ||
      renderable.length < threshold
    )
      return null;

    const { zoom, x: vx, y: vy } = viewport;
    const buffer = 500; // px in canvas coords
    const rect = {
      x: -vx / zoom - buffer,
      y: -vy / zoom - buffer,
      w: containerSize.w / zoom + buffer * 2,
      h: containerSize.h / zoom + buffer * 2,
    };

    // Use QuadTree for O(log N) query
    const inViewNodes = engine.getNodesInRect(rect);

    // Resolve latest references from the engine Map (QuadTree holds stale refs after data-only updates)
    const visibleMap = new Map<string, SpatialNode>();
    for (const n of inViewNodes) {
      const latest = engine.getNode(n.id);
      if (latest) visibleMap.set(n.id, latest);
    }
    // Add selected nodes (to ensure they are rendered even if off-screen)
    for (const id of selection) {
      const node = engine.getNode(id);
      if (node) visibleMap.set(node.id, node);
    }
    // Edge nodes have x:0,y:0,w:0,h:0 so spatial queries miss them.
    // Include any edge whose endpoint is visible OR whose line crosses the viewport.
    // Also add endpoint nodes so SVGLayer can resolve fromNode/toNode.
    for (const n of nodes) {
      if (n.type !== "edge") continue;
      if (visibleMap.has(n.id)) continue;
      const data = (n as EdgeNode).data;
      const from = engine.getNode(data.fromId);
      const to = engine.getNode(data.toId);
      if (!from || !to) continue;
      let include = visibleMap.has(data.fromId) || visibleMap.has(data.toId);
      if (!include) {
        const { x1, y1, x2, y2 } = computeEdgeEndpoints(from, to, measuredHeights);
        include = segmentIntersectsRect(x1, y1, x2, y2, rect);
      }
      if (include) {
        visibleMap.set(n.id, n);
        // Ensure both endpoint nodes are present so SVGLayer can render the edge
        if (!visibleMap.has(from.id)) visibleMap.set(from.id, from);
        if (!visibleMap.has(to.id)) visibleMap.set(to.id, to);
      }
    }

    return Array.from(visibleMap.values());
  }, [viewport, containerSize, nodes, selection, engine]); // 'nodes' triggers update

  // SVG layer nodes: filtered from the optimized visible set
  const svgLayerNodes = useMemo(() => {
    const source = visibleNodes || nodes;

    // Filter just by type (edges always included if in source, along with svg types)
    // Note: If using visibleNodes (QuadTree), it already contains spatially relevant edges
    return source;
  }, [nodes, visibleNodes]);

  // Subscribe to engine events
  useEffect(() => {
    let changeRafId: number | null = null;
    const handleChange = () => {
      if (changeRafId !== null) return;
      changeRafId = requestAnimationFrame(() => {
        changeRafId = null;
        setNodes([...engine.getAllNodes()]);
      });
    };
    let viewportRafId: number | null = null;
    const handleViewport = () => {
      if (viewportRafId !== null) return;
      viewportRafId = requestAnimationFrame(() => {
        viewportRafId = null;
        setViewport({ ...engine.viewport });
      });
    };
    const handleSelection = () => {
      setSelection((prev) => {
        const next = new Set(engine.selection);
        if (prev.size !== next.size || [...prev].some((id) => !next.has(id))) {
          // Clear text/frame-label editing when selection changes to a different node
          setEditingTextId((cur) => (cur && !next.has(cur) ? null : cur));
          setEditingFrameLabelId((cur) => (cur && !next.has(cur) ? null : cur));
          setEditingStickyId((cur) => (cur && !next.has(cur) ? null : cur));
          setEditingShapeLabelId((cur) => (cur && !next.has(cur) ? null : cur));
          setCroppingImageId((cur) => (cur && !next.has(cur) ? null : cur));
          // Clear ad-hoc rotation when selection changes;
          // persisted group rotation is restored from engine.groupRotations
          setGroupRotation(null);
          return next;
        }
        return prev;
      });
    };
    const handleMode = () => {
      setMode(engine.mode);
      // Reset "first created" flag when entering text mode
      if (engine.mode === "text") textCreatedOnceRef.current = false;
    };
    const handleBackground = () => setBoardBackground(engine.boardBackground);
    const handleGuides = () => {
      setAlignGuides([...engine.alignGuides]);
      setGridActive(engine.snapToGrid);
      setGridSize(engine.gridSize);
      setSmartGuidesActive(engine.smartGuides);
    };

    engine.on("change", handleChange);
    engine.on("viewport", handleViewport);
    engine.on("selection", handleSelection);
    engine.on("mode", handleMode);
    engine.on("background", handleBackground);
    engine.on("guides", handleGuides);

    const onGroupEnter = (groupId: string) => setActiveGroupId(groupId);
    const onGroupExit = () => setActiveGroupId(null);
    const onLassoToggle = () => {
      const container = containerRef.current;
      if (container) {
        container.style.cursor = engine.lassoSelect ? LASSO_CURSOR : getCursorForMode(engine.mode);
      }
    };
    engine.on("group:enter", onGroupEnter);
    engine.on("group:exit", onGroupExit);
    engine.on("lassoToggle", onLassoToggle);

    return () => {
      if (changeRafId !== null) cancelAnimationFrame(changeRafId);
      if (viewportRafId !== null) cancelAnimationFrame(viewportRafId);
      engine.off("change", handleChange);
      engine.off("viewport", handleViewport);
      engine.off("selection", handleSelection);
      engine.off("mode", handleMode);
      engine.off("background", handleBackground);
      engine.off("guides", handleGuides);
      engine.off("group:enter", onGroupEnter);
      engine.off("group:exit", onGroupExit);
      engine.off("lassoToggle", onLassoToggle);
    };
  }, [engine]);

  // Native wheel handler (passive: false for preventDefault)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      // Let scrollable editor areas handle their own vertical scroll
      if (!e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        const editorWrap = target.closest(".sb-editor-wrap") as HTMLElement | null;
        if (editorWrap && editorWrap.scrollHeight > editorWrap.clientHeight) {
          const atTop = editorWrap.scrollTop <= 0 && e.deltaY < 0;
          const atBottom =
            editorWrap.scrollTop + editorWrap.clientHeight >=
            editorWrap.scrollHeight && e.deltaY > 0;
          if (!atTop && !atBottom) return; // let editor scroll naturally
        }
      }

      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        engine.zoomByWheel(e.deltaY, e.clientX, e.clientY);
      } else {
        engine.pan(-e.deltaX, -e.deltaY);
      }
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [engine]);

  // Marquee selection state
  const [selectionRect, setSelectionRect] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [lassoPoints, setLassoPoints] = useState<Array<[number, number]> | null>(null);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    sections: ContextMenuSection[];
  } | null>(null);

  // Active group rotation state (during unified rotation drag)
  const [groupRotation, setGroupRotation] = useState<{
    angle: number;
    cx: number;
    cy: number;
    bounds: { x: number; y: number; w: number; h: number };
  } | null>(null);

  // Alt+click deep-select: track which z-layer index we last selected
  const altClickRef = useRef<{ x: number; y: number; index: number }>({
    x: 0,
    y: 0,
    index: -1,
  });

  // Text block preview state (drag-to-create)
  const [textPreview, setTextPreview] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  // Hover state — tracked centrally for all node types
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const hoveredNodeIdRef = useRef<string | null>(null);

  // Text node inline editing state
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const editClickRef = useRef<{ clientX: number; clientY: number } | null>(null);

  // Frame label inline editing state
  const [editingFrameLabelId, setEditingFrameLabelId] = useState<string | null>(null);

  // Sticky note inline editing state
  const [editingStickyId, setEditingStickyId] = useState<string | null>(null);

  // Shape/draw label inline editing state
  const [editingShapeLabelId, setEditingShapeLabelId] = useState<string | null>(null);

  // Image crop mode state
  const [croppingImageId, setCroppingImageId] = useState<string | null>(null);
  const [editingYouTubeId, setEditingYouTubeId] = useState<string | null>(null);

  // Listen for crop-start requests from the sidebar via engine event
  useEffect(() => {
    const handler = (nodeId: string) => {
      flushSync(() => setCroppingImageId(nodeId));
    };
    engine.on("image:cropRequest", handler);
    return () => engine.off("image:cropRequest", handler);
  }, [engine]);

  const editingNodeId = editingTextId || editingStickyId || editingFrameLabelId || editingShapeLabelId || croppingImageId || editingYouTubeId;

  // Track newly-created text nodes so we can delete them if the user commits empty text
  const newlyCreatedTextRef = useRef<string | null>(null);
  // Track the last content block created locally so only the creator auto-enters edit mode
  const newlyCreatedContentIdRef = useRef<string | null>(null);

  // Eraser tool state — tracks elements marked for deletion during drag
  const [eraserMarkedIds, setEraserMarkedIds] = useState<Set<string>>(new Set());
  const eraserMarkedRef = useRef<Set<string>>(new Set());
  // Trail points: [x, y, timestamp] — timestamp used for time-based fade
  const [eraserTrail, setEraserTrail] = useState<Array<[number, number, number]>>([]);
  const [personalLibPrompt, setPersonalLibPrompt] = useState<{
    nodes: SpatialNode[];
    groupParent: Map<string, string>;
  } | null>(null);
  const eraserTrailRef = useRef<Array<[number, number, number]>>([]);
  const eraserFadeRafRef = useRef<number | null>(null);

  // Laser pointer state — purely visual trail that fades out
  const [laserTrail, setLaserTrail] = useState<Array<[number, number, number]>>([]);
  const laserTrailRef = useRef<Array<[number, number, number]>>([]);
  const laserFadeRafRef = useRef<number | null>(null);

  // After a text node is created in text mode, require double-click for the next one
  const textCreatedOnceRef = useRef(false);

  const createContentBlock = useCallback(
    (x: number, y: number, w: number, h: number | "auto" = "auto") => {
      const id = nanoid(10);
      // Set ref BEFORE addNode so it's in place when ContentBlock first renders
      newlyCreatedContentIdRef.current = id;
      engine.addNode({
        id,
        type: "content",
        x,
        y,
        w,
        h,
        z: engine.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" },
      });
    },
    [engine]
  );

  // Build context menu sections based on current selection
  const buildContextMenuSections = useCallback(
    (screenX: number, screenY: number, altKey: boolean): ContextMenuSection[] => {
      const { x: cx, y: cy } = engine.screenToCanvas(screenX, screenY);

      // Alt+right-click: cycle through overlapping nodes (same as Alt+click)
      if (altKey) {
        const allHits = engine.hitTestAll(cx, cy, measuredHeights);
        if (allHits.length > 0) {
          const prev = altClickRef.current;
          const dist = Math.abs(cx - prev.x) + Math.abs(cy - prev.y);
          let nextIndex = 0;
          if (dist < 5) {
            nextIndex = (prev.index + 1) % allHits.length;
          }
          altClickRef.current = { x: cx, y: cy, index: nextIndex };
          engine.select(allHits[nextIndex].id);
        } else {
          engine.deselectAll();
        }
      } else {
        // Check if right-click is within any already-selected node's bounds
        let clickedSelected = false;
        for (const id of engine.selection) {
          const n = engine.getNode(id);
          if (!n) continue;
          const h = n.h === "auto" ? 100 : (n.h as number);
          if (cx >= n.x && cx <= n.x + n.w && cy >= n.y && cy <= n.y + h) {
            clickedSelected = true;
            break;
          }
        }

        // Also check if inside the multi-selection bounding box
        if (!clickedSelected && engine.selection.size >= 2) {
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (const id of engine.selection) {
            const n = engine.getNode(id);
            if (!n || n.type === "edge") continue;
            const h = n.h === "auto" ? 100 : (n.h as number);
            minX = Math.min(minX, n.x);
            minY = Math.min(minY, n.y);
            maxX = Math.max(maxX, n.x + n.w);
            maxY = Math.max(maxY, n.y + h);
          }
          if (
            minX !== Infinity &&
            cx >= minX && cx <= maxX &&
            cy >= minY && cy <= maxY
          ) {
            clickedSelected = true;
          }
        }

        // Only change selection if right-click is outside selected nodes AND outside selection box
        if (!clickedSelected) {
          const hit = engine.hitTest(cx, cy, measuredHeights);
          if (hit) {
            engine.select(hit.id);
          } else {
            engine.deselectAll();
          }
        }
      }

      const selIds = Array.from(engine.selection);
      const hasSel = selIds.length > 0;

      const sections: ContextMenuSection[] = [];

      // Clipboard section
      sections.push({
        items: [
          {
            label: "Cut",
            shortcut: "Mod+X",
            disabled: !hasSel,
            action: () => {
              engine.cutSelected();
              copyToSystemClipboard(engine);
            },
          },
          {
            label: "Copy",
            shortcut: "Mod+C",
            disabled: !hasSel,
            action: () => {
              engine.copySelected();
              copyToSystemClipboard(engine);
            },
          },
          {
            label: "Paste",
            shortcut: "Mod+V",
            disabled: false,
            action: () => {
              pasteFromSystemClipboard(engine, cx, cy);
            },
          },
        ],
      });

      // Duplicate section
      sections.push({
        items: [
          {
            label: "Duplicate",
            shortcut: "Mod+D",
            disabled: !hasSel,
            action: () => engine.duplicateSelected(),
          },
        ],
      });

      // Add to Personal Library
      if (hasSel) {
        sections.push({
          items: [
            {
              label: "Add to Personal Library",
              action: () => {
                const selectedNodes = selIds
                  .map((id) => engine.getNode(id))
                  .filter((n): n is SpatialNode => !!n)
                  .map((n) => structuredClone(n));
                const groupIds = new Set(
                  selectedNodes.map((n) => n.groupId).filter(Boolean) as string[],
                );
                const relevantGroupParent = new Map<string, string>();
                for (const [child, parent] of engine.groupParent) {
                  if (groupIds.has(child)) relevantGroupParent.set(child, parent);
                }
                setPersonalLibPrompt({
                  nodes: selectedNodes,
                  groupParent: relevantGroupParent,
                });
              },
            },
          ],
        });
      }

      // Grouping section
      if (selIds.length >= 2 || (hasSel && engine.selectionHasGroup())) {
        const items: ContextMenuSection["items"] = [];
        if (selIds.length >= 2) {
          items.push({
            label: "Group selection",
            shortcut: "Mod+G",
            action: () => engine.groupSelected(),
          });
        }
        if (engine.selectionHasGroup()) {
          items.push({
            label: "Ungroup selection",
            shortcut: "Mod+Shift+G",
            action: () => engine.ungroupSelected(),
          });
        }
        sections.push({ items });
      }

      // Flip section (draw/shape nodes)
      if (hasSel) {
        const allFlippable = selIds.every((id) => {
          const n = engine.getNode(id);
          return n && (n.type === "draw" || n.type === "shape");
        });
        if (allFlippable) {
          sections.push({
            items: [
              {
                label: "Flip horizontal",
                shortcut: "Shift+H",
                action: () => engine.flipSelectedHorizontal(),
              },
              {
                label: "Flip vertical",
                shortcut: "Shift+V",
                action: () => engine.flipSelectedVertical(),
              },
            ],
          });
        }
      }

      // Z-ordering section
      if (hasSel) {
        sections.push({
          items: [
            {
              label: "Bring forward",
              shortcut: "Mod+]",
              action: () => engine.bringForward(selIds),
            },
            {
              label: "Send backward",
              shortcut: "Mod+[",
              action: () => engine.sendBackward(selIds),
            },
            {
              label: "Bring to front",
              shortcut: "Mod+Alt+]",
              action: () => engine.bringToFront(selIds),
            },
            {
              label: "Send to back",
              shortcut: "Mod+Alt+[",
              action: () => engine.sendToBack(selIds),
            },
          ],
        });
      }

      // Lock / Unlock section
      if (hasSel) {
        const anyLocked = selIds.some((id) => engine.getNode(id)?.locked);
        const anyUnlocked = selIds.some((id) => !engine.getNode(id)?.locked);
        const items: ContextMenuSection["items"] = [];
        if (anyUnlocked) {
          items.push({
            label: "Lock",
            action: () => {
              for (const id of selIds) engine.updateNode(id, { locked: true });
            },
          });
        }
        if (anyLocked) {
          items.push({
            label: "Unlock",
            action: () => {
              for (const id of selIds) engine.updateNode(id, { locked: undefined });
            },
          });
        }
        sections.push({ items });
      }

      // Delete section
      if (hasSel) {
        sections.push({
          items: [
            {
              label: "Delete",
              shortcut: "Delete",
              danger: true,
              action: () => engine.deleteSelected(),
            },
          ],
        });
      }

      // Grid section
      const gridSizes = [10, 20, 40, 80];
      sections.push({
        items: [
          {
            label: "Toggle Grid",
            checked: engine.snapToGrid,
            action: () => {
              engine.toggleSnapToGrid();
              setGridActive(engine.snapToGrid);
            },
          },
          {
            label: "Smart Guides",
            checked: engine.smartGuides,
            action: () => {
              engine.toggleSmartGuides();
              setSmartGuidesActive(engine.smartGuides);
            },
          },
          ...gridSizes.map((size) => ({
            label: `${size}px`,
            checked: engine.gridSize === size,
            action: () => {
              engine.setGridSize(size);
            },
          })),
        ],
      });

      // Export section (always shown)
      sections.push({
        items: [
          {
            label: "Export as PNG",
            action: () => exportBoard(engine, { format: "png" }),
          },
          {
            label: "Export as SVG",
            action: () => exportBoard(engine, { format: "svg" }),
          },
        ],
      });

      return sections;
    },
    [engine]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (engine.presentationMode) return;
      const sections = buildContextMenuSections(e.clientX, e.clientY, e.altKey);
      setContextMenu({ x: e.clientX, y: e.clientY, sections });
    },
    [engine, buildContextMenuSections]
  );

  // Create a TextNode in the engine and immediately enter editing mode.
  // Used by both the text tool and double-click-on-canvas flows.
  const createTextNodeAndEdit = useCallback(
    (x: number, y: number, w: number) => {
      const id = nanoid(10);
      engine.addNode({
        id,
        type: "text",
        x,
        y,
        w,
        h: "auto",
        z: engine.nextZ(),
        data: {
          text: "",
          fontSize: engine.activeTool.fontSize ?? 20,
          fontFamily: engine.activeTool.fontFamily ?? DEFAULT_FONT,
          color: engine.activeTool.color,
          align: engine.activeTool.textAlign ?? "left",
          opacity: engine.activeTool.opacity,
        },
      } as TextNode);
      engine.select(id);
      newlyCreatedTextRef.current = id;
      setEditingTextId(id);
    },
    [engine]
  );

  // Double-click on draw/shape: collapse to single selection; text: enter edit mode
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (engine.presentationMode) return;
      // Double-click in text mode: allow creating a new text node after the first
      if (engine.mode === "text" && textCreatedOnceRef.current) {
        textCreatedOnceRef.current = false;
        if (containerRef.current) containerRef.current.style.cursor = "text";
        engine.deselectAll();
        const { x: cx, y: cy } = engine.screenToCanvas(e.clientX, e.clientY);
        createTextNodeAndEdit(cx, cy, 300);
        return;
      }
      if (engine.mode !== "select") return;
      const { x: cx, y: cy } = engine.screenToCanvas(e.clientX, e.clientY);
      const allHits = engine.hitTestAll(cx, cy, measuredHeights);
      const hit = allHits.find((n) => !engine.isContainerType(n.type)) ?? allHits[0] ?? null;

      // Double-click a grouped node → drill down one level at a time
      if (hit?.groupId) {
        // Build chain from innermost to outermost group
        const chain: string[] = [];
        let gid: string | undefined = hit.groupId;
        while (gid) {
          chain.push(gid);
          gid = engine.groupParent.get(gid);
        }
        // chain = [innermost, ..., outermost]

        if (!engine.activeGroupId) {
          // Not in any group — enter the outermost
          engine.enterGroup(chain[chain.length - 1]);
          engine.select(hit.id);
          return;
        }

        const activeIdx = chain.indexOf(engine.activeGroupId);
        if (activeIdx > 0) {
          // Currently in an ancestor group — enter one level deeper
          engine.enterGroup(chain[activeIdx - 1]);
          engine.select(hit.id);
          return;
        }
        // activeIdx === 0 means we're in the node's direct group → fall through to edit mode
        // activeIdx === -1 means node is not in active group hierarchy — shouldn't normally happen
      }

      // Inside the group (or ungrouped node): proceed with edit-mode logic
      if (hit && hit.type === "text") {
        engine.select(hit.id);
        editClickRef.current = { clientX: e.clientX, clientY: e.clientY };
        setEditingTextId(hit.id);
        return;
      }
      if (hit && hit.type === "sticky") {
        engine.select(hit.id);
        setEditingStickyId(hit.id);
        return;
      }
      if (hit && hit.type === "frame") {
        engine.select(hit.id);
        setEditingFrameLabelId(hit.id);
        return;
      }
      if (hit && hit.type === "shape") {
        const shapeData = (hit as ShapeNode).data;
        const isLinear = shapeData.shape === "line" || shapeData.shape === "arrow";
        engine.select(hit.id);
        if (!isLinear) setEditingShapeLabelId(hit.id);
        return;
      }
      if (hit && hit.type === "draw") {
        engine.select(hit.id);
        return;
      }

      // Double-click inside an unfilled shape → enter label editing
      // (normal hit test only hits the stroke; here we check the interior)
      if (!hit || hit.type === "draw") {
        const allNodes = engine.getAllNodes();
        const interiorShape = allNodes
          .filter((n): n is ShapeNode => n.type === "shape")
          .sort((a, b) => b.z - a.z)
          .find((n) => {
            const isLinear = n.data.shape === "line" || n.data.shape === "arrow";
            return !isLinear && isPointInShapeNode(n, cx, cy, engine.viewport.zoom, true);
          });
        if (interiorShape) {
          engine.select(interiorShape.id);
          setEditingShapeLabelId(interiorShape.id);
          return;
        }
      }

      // Double-click empty canvas in select mode → create text node and enter edit mode
      if (!hit) {
        engine.deselectAll();
        createTextNodeAndEdit(cx, cy, 300);
      }
    },
    [engine, measuredHeights, createTextNodeAndEdit]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Track all active pointers for multi-touch detection
      activeTouchesRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (e.pointerType === "pen") activePenRef.current = true;

      // Two-finger gesture: second touch OR any touch while Apple Pencil is active
      const isSecondTouch =
        e.pointerType === "touch" &&
        (activeTouchesRef.current.size >= 2 || activePenRef.current);

      if (isSecondTouch) {
        isPinchingRef.current = true;

        // Cancel any pending long-press
        if (longPressTimerRef.current) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
          longPressOriginRef.current = null;
        }

        // Snapshot both pointer positions NOW — the synthetic pointerup below
        // fires synchronously (dispatchEvent is sync), which would trigger the
        // global cleanup and delete the first pointer from activeTouchesRef.
        // Using a local map for pinch tracking avoids that race.
        const pinchMap = new Map(activeTouchesRef.current);

        // Abort in-flight single-pointer drag by synthetic pointerup for the first pointer
        const firstId = [...activeTouchesRef.current.keys()].find((id) => id !== e.pointerId);
        if (firstId !== undefined) {
          ownerDoc().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: firstId,
              bubbles: true,
              clientX: e.clientX,
              clientY: e.clientY,
            })
          );
        }

        // Re-populate from snapshot so both pointers are present for calculation
        const entries = [...pinchMap.values()];
        let prev = pinchMetrics(entries[0], entries[1] ?? entries[0]);

        const onPinchMove = (me: PointerEvent) => {
          if (!pinchMap.has(me.pointerId)) return;
          pinchMap.set(me.pointerId, { x: me.clientX, y: me.clientY });
          const vals = [...pinchMap.values()];
          if (vals.length < 2) return;
          const curr = pinchMetrics(vals[0], vals[1]);
          engine.pan(curr.mx - prev.mx, curr.my - prev.my);
          if (prev.dist > 1) {
            const factor = Math.min(Math.max(curr.dist / prev.dist, 0.9), 1.1);
            engine.zoomByFactor(factor, curr.mx, curr.my);
          }
          prev = curr;
        };

        const onPinchEnd = (me: PointerEvent) => {
          activeTouchesRef.current.delete(me.pointerId);
          pinchMap.delete(me.pointerId);
          if (me.pointerType === "pen") activePenRef.current = false;
          if (pinchMap.size < 2 && !activePenRef.current) {
            isPinchingRef.current = false;
            ownerDoc().removeEventListener("pointermove", onPinchMove);
            ownerDoc().removeEventListener("pointerup", onPinchEnd);
            ownerDoc().removeEventListener("pointercancel", onPinchEnd);
          }
        };

        ownerDoc().addEventListener("pointermove", onPinchMove);
        ownerDoc().addEventListener("pointerup", onPinchEnd);
        ownerDoc().addEventListener("pointercancel", onPinchEnd);
        return; // Skip all mode logic
      }

      if (isPinchingRef.current) return; // pinch still active, ignore new pointers

      // In presentation mode, only allow panning (middle mouse / space+click)
      if (engine.presentationMode) {
        if (e.button === 1 || (e.button === 0 && spaceHeldRef.current)) {
          // fall through to pan logic below
        } else {
          return;
        }
      }

      // Close context menu on any click
      if (contextMenu) {
        setContextMenu(null);
      }

      // Long-press context menu for touch
      if (e.pointerType === "touch") {
        const touchClientX = e.clientX;
        const touchClientY = e.clientY;
        const touchPointerId = e.pointerId;
        longPressOriginRef.current = { clientX: touchClientX, clientY: touchClientY };
        longPressTimerRef.current = setTimeout(() => {
          longPressTimerRef.current = null;
          if (!longPressOriginRef.current) return;
          if (isPinchingRef.current) return;
          const sections = buildContextMenuSections(touchClientX, touchClientY, false);
          setContextMenu({ x: touchClientX, y: touchClientY, sections });
          // Cancel ongoing drag via synthetic pointerup
          ownerDoc().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: touchPointerId,
              bubbles: true,
              clientX: touchClientX,
              clientY: touchClientY,
            })
          );
          longPressOriginRef.current = null;
        }, 500);
      }

      // Middle mouse button OR Space+left-click → pan (any mode)
      if (e.button === 1 || (e.button === 0 && spaceHeldRef.current)) {
        e.preventDefault();
        spacePanActiveRef.current = true;
        const vpStartX = engine.viewport.x;
        const vpStartY = engine.viewport.y;
        const startX = e.clientX;
        const startY = e.clientY;

        const container = containerRef.current;
        if (container) container.style.cursor = "grabbing";

        const onMove = (me: PointerEvent) => {
          engine.viewport.x = vpStartX + (me.clientX - startX);
          engine.viewport.y = vpStartY + (me.clientY - startY);
          setViewport({ ...engine.viewport });
        };
        const onUp = () => {
          spacePanActiveRef.current = false;
          if (container) container.style.cursor = spaceHeldRef.current ? "grab" : (engine.lassoSelect ? LASSO_CURSOR : "");
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
        return;
      }

      const { x: cx, y: cy } = engine.screenToCanvas(e.clientX, e.clientY);

      // If touching a node, cancel long-press immediately — dragging a node should
      // never be interrupted by the context-menu timer. Long-press is only for empty canvas.
      if (e.pointerType === "touch" && longPressTimerRef.current) {
        const touchHit = engine.hitTest(cx, cy, measuredHeights);
        if (touchHit) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
          longPressOriginRef.current = null;
        }
      }

      if (engine.mode === "select") {
        // Right-click selection is handled by handleContextMenu — skip here
        if (e.button !== 0) return;

        // Alt+click: cycle through overlapping nodes at this position
        if (e.altKey) {
          const allHits = engine.hitTestAll(cx, cy, measuredHeights);
          if (allHits.length > 0) {
            // Check if clicking near the same spot as last Alt+click
            const prev = altClickRef.current;
            const dist = Math.abs(cx - prev.x) + Math.abs(cy - prev.y);
            let nextIndex = 0;
            if (dist < 5) {
              // Same spot — advance to next node in the z-stack
              nextIndex = (prev.index + 1) % allHits.length;
            }
            altClickRef.current = { x: cx, y: cy, index: nextIndex };
            engine.select(allHits[nextIndex].id);
          }
          return;
        }

        // Check if click is inside multi-selection bounding box (enables
        // dragging from empty areas within the selection). Single-selection
        // drag is handled by the rotation-aware hit test below.
        // When lasso is active, skip hit testing so lasso works over nodes/groups.
        let insideSelectionBox = false;
        if (!engine.lassoSelect && engine.selection.size >= 2 && selBounds) {
          if (
            cx >= selBounds.x &&
            cx <= selBounds.x + selBounds.w &&
            cy >= selBounds.y &&
            cy <= selBounds.y + selBounds.h
          ) {
            insideSelectionBox = true;
          }
        }

        // Check individual selected nodes (for shift-click toggle) or any node
        // Uses rotation-aware hitTestAll so clicks in empty AABB corners
        // of rotated nodes don't count as hits.
        let hit: SpatialNode | null = null;
        if (!engine.lassoSelect) {
          const allHits = engine.hitTestAll(cx, cy, measuredHeights);
          hit = allHits.find((n) => engine.selection.has(n.id) && !engine.isContainerType(n.type)) ?? allHits.find((n) => !engine.isContainerType(n.type)) ?? allHits[0] ?? null;
          // Fall back to edge hit testing if no node was hit
          if (!hit && !insideSelectionBox) {
            hit = hitTestEdge(engine.nodes, cx, cy, engine.viewport.zoom, measuredHeights, resolvePortPositions);
          }
        }
        if (hit || insideSelectionBox) {
          if (hit) {
            // If inside a group and clicking a node NOT in that group hierarchy → exit
            if (engine.activeGroupId && !engine.isNodeInActiveGroup(hit.id)) {
              engine.exitAllGroups();
            }
            if (e.shiftKey) {
              engine.toggleSelect(hit.id);
            } else if (!engine.selection.has(hit.id)) {
              engine.select(hit.id);
            }
          }
          // Start drag of selected nodes (rAF-throttled + batched for perf)
          // Filter out locked nodes — they stay put while unlocked ones move
          const draggedIds = Array.from(engine.selection).filter(
            (id) => !engine.getNode(id)?.locked
          );
          if (draggedIds.length === 0) return;
          const startX = e.clientX;
          const startY = e.clientY;
          // Include all descendants (recursive) of any frame being dragged
          const frameChildIds = new Set<string>();
          const draggingFrames = new Set<string>();
          for (const id of draggedIds) {
            const n = engine.getNode(id);
            if (n && engine.isContainerType(n.type)) {
              draggingFrames.add(id);
              for (const descId of engine.getFrameDescendantIds(id)) {
                if (!engine.selection.has(descId)) {
                  frameChildIds.add(descId);
                }
              }
            }
          }
          const allDragIds = [...draggedIds, ...frameChildIds];
          const origPositions = allDragIds.map((id) => {
            const n = engine.getNode(id)!;
            return { id, x: n.x, y: n.y };
          });

          // Capture group rotation pivot so we can keep it in sync during drag
          const dragGroupId = engine.selectionGroupId();
          const dragGroupRot = dragGroupId ? engine.groupRotations.get(dragGroupId) : null;
          const origRotCx = dragGroupRot?.cx;
          const origRotCy = dragGroupRot?.cy;
          // Clear active rotation visual; storedRot render path recalculates
          // bounds from live node positions so the box follows the drag
          setGroupRotation(null);

          let didMove = false;
          let rafId: number | null = null;
          let lastClientX = startX;
          let lastClientY = startY;
          let lastModKey = false;

          const allDragIdSet = new Set(allDragIds);

          const applyMove = () => {
            rafId = null;
            const dx = (lastClientX - startX) / engine.viewport.zoom;
            const dy = (lastClientY - startY) / engine.viewport.zoom;
            const { finalDx, finalDy } = engine.computeDragSnap(
              origPositions, allDragIdSet, dx, dy, lastModKey,
            );
            const updates = origPositions.map((orig) => ({
              id: orig.id,
              patch: { x: orig.x + finalDx, y: orig.y + finalDy },
            }));
            engine.updateMany(updates);
            // Keep group rotation pivot in sync with the moved nodes
            if (dragGroupRot && dragGroupId) {
              engine.groupRotations.set(dragGroupId, {
                angle: dragGroupRot.angle,
                cx: origRotCx! + finalDx,
                cy: origRotCy! + finalDy,
              });
            }
          };

          const onMove = (me: PointerEvent) => {
            const dx = (me.clientX - startX) / engine.viewport.zoom;
            const dy = (me.clientY - startY) / engine.viewport.zoom;
            if (!didMove) {
              if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
                didMove = true;
                engine.pushHistorySnapshot();
              } else {
                return;
              }
            }
            lastClientX = me.clientX;
            lastClientY = me.clientY;
            lastModKey = me.metaKey || me.ctrlKey;
            if (rafId === null) {
              rafId = requestAnimationFrame(applyMove);
            }
          };
          const onUp = () => {
            if (rafId !== null) {
              cancelAnimationFrame(rafId);
              applyMove();
            }
            engine.clearAlignGuides();
            ownerDoc().removeEventListener("pointermove", onMove);
            ownerDoc().removeEventListener("pointerup", onUp);
            // Update frame membership for nodes that were independently dragged
            // (not as descendants of a dragged frame). This handles:
            // - "move object into frame" → adopt
            // - "move object out of frame" → remove
            // - "move frame into another frame" → nest
            // Frame descendants skip this since they maintain their relative positions.
            if (didMove) {
              const movedIndependentIds = draggedIds.filter(
                (id) => !frameChildIds.has(id)
              );
              if (movedIndependentIds.length > 0) {
                engine.updateFrameMembership(movedIndependentIds);
              }
            }
          };
          ownerDoc().addEventListener("pointermove", onMove);
          ownerDoc().addEventListener("pointerup", onUp);
        } else {
          // Clicking empty canvas while inside a group → exit group
          if (engine.activeGroupId) {
            engine.exitGroup();
            return;
          }
          // Start marquee or lasso selection
          if (!e.shiftKey) engine.deselectAll();
          const prevSelection = new Set(engine.selection);

          if (engine.lassoSelect) {
            // --- Lasso freeform selection ---
            const lasso: Array<[number, number]> = [[cx, cy]];
            setLassoPoints([...lasso]);

            let lassoRafId: number | null = null;
            let lassoFrameSkip = 0;
            const applyLassoHits = (force = false) => {
              lassoRafId = null;
              const doHitTest = force || lassoFrameSkip % 2 === 0;
              lassoFrameSkip++;
              if (doHitTest && lasso.length >= 3) {
                const hits = getNodesInLassoPolygon(lasso, engine.getAllNodes());
                const hitIds = hits.map((n) => n.id);
                const newIds = e.shiftKey
                  ? [...new Set([...prevSelection, ...hitIds])]
                  : hitIds;
                if (
                  newIds.length !== engine.selection.size ||
                  newIds.some((id) => !engine.selection.has(id))
                ) {
                  engine.selectMultiple(newIds);
                }
              }
              setLassoPoints([...lasso]);
            };

            const onMove = (me: PointerEvent) => {
              const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
              lasso.push([x, y]);
              if (lassoRafId === null) {
                lassoRafId = requestAnimationFrame(() => applyLassoHits(false));
              }
            };
            const onUp = () => {
              if (lassoRafId !== null) cancelAnimationFrame(lassoRafId);
              applyLassoHits(true);
              ownerDoc().removeEventListener("pointermove", onMove);
              ownerDoc().removeEventListener("pointerup", onUp);
              setLassoPoints(null);
              // Exit lasso mode after selection completes
              engine.toggleLassoSelect();
            };
            ownerDoc().addEventListener("pointermove", onMove);
            ownerDoc().addEventListener("pointerup", onUp);
          } else {
            // --- Rectangle marquee selection ---
            const marquee = { startX: cx, startY: cy, endX: cx, endY: cy };
            setSelectionRect(marquee);

            let marqueeRafId: number | null = null;
            let marqueeFrameSkip = 0;
            const applyMarqueeHits = (_useAccurate = false, forceHitTest = false) => {
              marqueeRafId = null;
              const rx = Math.min(marquee.startX, marquee.endX);
              const ry = Math.min(marquee.startY, marquee.endY);
              const rw = Math.abs(marquee.endX - marquee.startX);
              const rh = Math.abs(marquee.endY - marquee.startY);
              const doHitTest =
                forceHitTest || _useAccurate || marqueeFrameSkip % 2 === 0;
              marqueeFrameSkip++;
              if (doHitTest) {
                const hits = getNodesInMarqueeRect(
                  { x: rx, y: ry, w: rw, h: rh },
                  engine.getAllNodes()
                );
                const hitIds = hits.map((n) => n.id);
                const newIds = e.shiftKey
                  ? [...new Set([...prevSelection, ...hitIds])]
                  : hitIds;
                if (
                  newIds.length !== engine.selection.size ||
                  newIds.some((id) => !engine.selection.has(id))
                ) {
                  engine.selectMultiple(newIds);
                }
              }
              setSelectionRect({ ...marquee });
            };

            const onMove = (me: PointerEvent) => {
              const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
              marquee.endX = x;
              marquee.endY = y;

              if (marqueeRafId === null) {
                marqueeRafId = requestAnimationFrame(() => applyMarqueeHits(false));
              }
            };
            const onUp = () => {
              if (marqueeRafId !== null) {
                cancelAnimationFrame(marqueeRafId);
              }
              applyMarqueeHits(true);
              ownerDoc().removeEventListener("pointermove", onMove);
              ownerDoc().removeEventListener("pointerup", onUp);
              setSelectionRect(null);
            };
            ownerDoc().addEventListener("pointermove", onMove);
            ownerDoc().addEventListener("pointerup", onUp);
          }
        }
      } else if (engine.mode === "text") {
        // After the first text node, require double-click for the next one
        if (textCreatedOnceRef.current) return;
        engine.deselectAll();
        const startCx = cx;
        const startCy = cy;
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
        };
        let dragged = false;
        setTextPreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          const dx = Math.abs(preview.endX - preview.startX);
          const dy = Math.abs(preview.endY - preview.startY);
          if (dx > 10 || dy > 10) dragged = true;
          setTextPreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          setTextPreview(null);

          const w = dragged ? Math.max(Math.abs(preview.endX - preview.startX), 60) : 300;
          const x = dragged ? Math.min(preview.startX, preview.endX) : startCx;
          const y = dragged ? Math.min(preview.startY, preview.endY) : startCy;

          // Create the node immediately so collaboration sync works from the start
          createTextNodeAndEdit(x, y, w);
          textCreatedOnceRef.current = true;
          if (containerRef.current) containerRef.current.style.cursor = "crosshair";
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "note") {
        engine.deselectAll();
        const startCx = cx;
        const startCy = cy;
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
        };
        let dragged = false;
        setTextPreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          const dx = Math.abs(preview.endX - preview.startX);
          const dy = Math.abs(preview.endY - preview.startY);
          if (dx > 10 || dy > 10) dragged = true;
          setTextPreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          setTextPreview(null);

          const w = dragged ? Math.max(Math.abs(preview.endX - preview.startX), 100) : 300;
          const h = dragged ? Math.max(Math.abs(preview.endY - preview.startY), 40) : "auto" as const;
          const x = dragged ? Math.min(preview.startX, preview.endX) : startCx;
          const y = dragged ? Math.min(preview.startY, preview.endY) : startCy;

          createContentBlock(x, y, w, h);
          engine.setMode("select");
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "sticky") {
        engine.deselectAll();
        const startCx = cx;
        const startCy = cy;
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
        };
        let dragged = false;
        setTextPreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          if (Math.abs(preview.endX - preview.startX) > 10) dragged = true;
          setTextPreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          setTextPreview(null);

          const w = dragged ? Math.max(Math.abs(preview.endX - preview.startX), 100) : 200;
          const x = dragged ? Math.min(preview.startX, preview.endX) : startCx;
          const y = dragged ? Math.min(preview.startY, preview.endY) : startCy;

          const id = nanoid(10);
          const stickyH = dragged ? Math.max(Math.abs(preview.endY - preview.startY), 100) : 150;
          engine.addNode({
            id,
            type: "sticky",
            x,
            y,
            w,
            h: stickyH,
            z: engine.nextZ(),
            data: { text: "", color: "#FEF3C7" },
          } as StickyNoteNode);
          engine.select(id);
          setEditingStickyId(id);
          engine.setMode("select");
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "draw") {
        const pressure = e.pressure || 0.5;
        const stroke = {
          points: [[cx, cy, pressure]] as Array<[number, number, number]>,
          color: engine.activeTool.color,
          width: engine.activeTool.width,
          strokeStyle: engine.activeTool.strokeStyle as "solid" | "dashed" | "dotted" | undefined,
        };
        setActiveStroke(stroke);
        engine.notifyDrawProgress(stroke);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          const p = me.pressure || 0.5;
          stroke.points.push([x, y, p]);
          setActiveStroke({ ...stroke, points: [...stroke.points] });
          engine.notifyDrawProgress({ ...stroke, points: [...stroke.points] });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          engine.notifyDrawEnd();

          if (stroke.points.length < 2) {
            setActiveStroke(null);
            return;
          }

          let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity;
          for (const [px, py] of stroke.points) {
            if (px < minX) minX = px;
            if (py < minY) minY = py;
            if (px > maxX) maxX = px;
            if (py > maxY) maxY = py;
          }

          // Store points relative to bounding box origin
          const relativePoints = stroke.points.map(
            ([px, py, p]) =>
              [px - minX, py - minY, p] as [number, number, number]
          );

          engine.addNode({
            id: nanoid(10),
            type: "draw",
            x: minX,
            y: minY,
            w: maxX - minX,
            h: maxY - minY,
            z: engine.nextZ(),
            data: {
              tool: "pen" as const,
              points: relativePoints,
              color: stroke.color,
              strokeWidth: stroke.width,
              opacity: engine.activeTool.opacity,
              fill: engine.activeTool.fillColor || undefined,
              fillStyle: engine.activeTool.fillStyle || undefined,
              strokeStyle: engine.activeTool.strokeStyle || undefined,
            },
          } as DrawNode);
          // Defer clearing the active stroke preview to the same animation frame
          // as the engine's RAF-based setNodes(). This ensures React batches both
          // updates into a single render, preventing a 1-frame flicker where
          // neither the preview nor the committed DrawNode is visible.
          requestAnimationFrame(() => setActiveStroke(null));
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "shape") {
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
        };
        setShapePreview(preview);
        const shapeInfo = {
          shapeType: engine.activeTool.shapeType || "rect",
          stroke: engine.activeTool.color,
          strokeWidth: engine.activeTool.width,
        };

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          setShapePreview({ ...preview });
          engine.notifyShapeProgress({ ...preview, ...shapeInfo });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          engine.notifyShapeEnd();

          const shapeType = engine.activeTool.shapeType || "rect";
          const isLinear = shapeType === "line" || shapeType === "arrow";

          const x = Math.min(preview.startX, preview.endX);
          let y = Math.min(preview.startY, preview.endY);
          const w = Math.abs(preview.endX - preview.startX);
          const rawH = Math.abs(preview.endY - preview.startY);
          let h: number;
          if (isLinear) {
            // Ensure bounding box is tall enough for the stroke to be visible/selectable
            const minH = engine.activeTool.width * 2;
            h = Math.max(rawH, minH);
            if (rawH < minH) {
              // Center the line within the padded box
              y -= (minH - rawH) / 2;
            }
          } else {
            h = rawH;
          }

          if (w < 5 && (isLinear ? w < 5 && Math.abs(preview.endY - preview.startY) < 5 : h < 5)) {
            setShapePreview(null);
            return;
          }

          // For line/arrow, compute relative start/end points
          const lineData: Pick<ShapeNode["data"], "startPoint" | "endPoint"> = {};
          if (isLinear) {
            lineData.startPoint = [
              preview.startX - x,
              preview.startY - y,
            ];
            lineData.endPoint = [
              preview.endX - x,
              preview.endY - y,
            ];
          }

          const nodeId = nanoid(10);
          engine.addNode({
            id: nodeId,
            type: "shape",
            x,
            y,
            w,
            h,
            z: engine.nextZ(),
            data: {
              shape: shapeType,
              stroke: engine.activeTool.color,
              fill: engine.activeTool.fillColor || undefined,
              fillStyle: engine.activeTool.fillStyle,
              strokeWidth: engine.activeTool.width,
              strokeStyle: engine.activeTool.strokeStyle,
              roughness: engine.activeTool.roughness ?? 1,
              opacity: engine.activeTool.opacity ?? 1,
              ...lineData,
            },
          } as ShapeNode);
          setShapePreview(null);
          engine.setMode("select");
          engine.select(nodeId);
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "edge") {
        // Edge creation: drag from source node to target node
        const sourceNode = engine.hitTest(cx, cy, measuredHeights);
        if (!sourceNode || sourceNode.type === "edge") return;

        setEdgePreview({ fromNode: sourceNode, cursorX: cx, cursorY: cy });

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          setEdgePreview((prev) =>
            prev ? { ...prev, cursorX: x, cursorY: y } : null
          );
        };
        const onUp = (me: PointerEvent) => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          setEdgePreview(null);

          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          let targetNode = engine.hitTest(x, y, measuredHeights);

          // Fallback: find the nearest node by handle midpoint distance.
          if (!targetNode || targetNode.type === "edge" || engine.isContainerType(targetNode.type)) {
            const snapThreshold = 50 / engine.viewport.zoom;
            let bestDist = Infinity;
            let bestIsFrame = false;
            let bestNode: SpatialNode | null = null;
            for (const n of engine.getAllNodes()) {
              if (n.type === "edge" || n.id === sourceNode.id) continue;
              const isFrame = engine.isContainerType(n.type);
              const handlePositions = getNodeHandlePositions(n, measuredHeights);
              for (const hp of handlePositions) {
                const dist = Math.hypot(hp.x - x, hp.y - y);
                if (dist >= snapThreshold) continue;
                if (isFrame && !bestIsFrame && bestNode) continue;
                if ((!isFrame && bestIsFrame) || dist < bestDist) {
                  bestDist = dist;
                  bestIsFrame = isFrame;
                  bestNode = n;
                }
              }
            }
            if (bestNode) targetNode = bestNode;
          }

          // Must land on a different, non-edge node
          if (
            !targetNode ||
            targetNode.type === "edge" ||
            targetNode.id === sourceNode.id
          )
            return;

          // Don't create duplicate edges between the same pair
          const exists = engine.getAllNodes().some(
            (n) =>
              n.type === "edge" &&
              (((n as EdgeNode).data.fromId === sourceNode.id &&
                (n as EdgeNode).data.toId === targetNode.id) ||
                ((n as EdgeNode).data.fromId === targetNode.id &&
                  (n as EdgeNode).data.toId === sourceNode.id))
          );
          if (exists) return;

          // Determine which handles the edge connects to
          const sourceHandle = nearestHandle(sourceNode, cx, cy, measuredHeights);
          const targetHandle = nearestHandle(targetNode, x, y, measuredHeights);

          const edgeNode: EdgeNode = {
            id: nanoid(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: engine.nextZ(),
            data: {
              fromId: sourceNode.id,
              toId: targetNode.id,
              style: "solid",
              color: engine.activeTool.color,
              strokeWidth: 2,
              arrowHead: "arrow",
              arrowTail: "none",
              edgeType: "bezier",
              sourceHandle,
              targetHandle,
            },
          };
          engine.addNode(edgeNode);
          engine.select(edgeNode.id);
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "frame") {
        const preview = {
          startX: cx,
          startY: cy,
          endX: cx,
          endY: cy,
        };
        setShapePreview(preview);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          preview.endX = x;
          preview.endY = y;
          setShapePreview({ ...preview });
        };
        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);

          const x = Math.min(preview.startX, preview.endX);
          const y = Math.min(preview.startY, preview.endY);
          const w = Math.abs(preview.endX - preview.startX);
          const h = Math.abs(preview.endY - preview.startY);

          if (w < 20 || h < 20) {
            setShapePreview(null);
            return;
          }

          const id = nanoid(10);
          engine.addNode({
            id,
            type: "frame",
            x,
            y,
            w,
            h,
            z: engine.nextZ(),
            data: {
              label: "Frame",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed",
            },
          } as FrameNode);
          // Adopt existing nodes that fall inside the newly drawn frame
          engine.adoptNodesIntoNewFrame(id);
          setShapePreview(null);
          engine.select(id);
          engine.setMode("select");
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "erase") {
        if (e.button !== 0) return;

        // Helper: mark all elements at a canvas point
        const markAt = (px: number, py: number) => {
          const hits = engine.hitTestAll(px, py, measuredHeights);
          const edgeHits = hitTestAllEdges(
            engine.nodes,
            px,
            py,
            engine.viewport.zoom,
            measuredHeights,
            resolvePortPositions
          );
          let changed = false;
          for (const h of [...hits, ...edgeHits]) {
            if (!eraserMarkedRef.current.has(h.id)) {
              eraserMarkedRef.current.add(h.id);
              changed = true;
            }
          }
          if (changed) {
            setEraserMarkedIds(new Set(eraserMarkedRef.current));
          }
        };

        const TRAIL_LIFETIME = 400; // ms — how long trail points live

        // Initialize trail and marks
        eraserMarkedRef.current = new Set();
        const now = performance.now();
        eraserTrailRef.current = [[cx, cy, now]];
        setEraserTrail([[cx, cy, now]]);
        markAt(cx, cy);

        let lastCx = cx;
        let lastCy = cy;

        // Continuous fade loop — trims old trail points every frame
        const fadeLoop = () => {
          const t = performance.now();
          const before = eraserTrailRef.current.length;
          eraserTrailRef.current = eraserTrailRef.current.filter(
            (p) => t - p[2] < TRAIL_LIFETIME
          );
          if (eraserTrailRef.current.length !== before) {
            setEraserTrail([...eraserTrailRef.current]);
          }
          eraserFadeRafRef.current = requestAnimationFrame(fadeLoop);
        };
        eraserFadeRafRef.current = requestAnimationFrame(fadeLoop);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          lastCx = x;
          lastCy = y;
          const t = performance.now();
          eraserTrailRef.current.push([lastCx, lastCy, t]);
          setEraserTrail([...eraserTrailRef.current]);
          markAt(lastCx, lastCy);
        };

        const clearState = () => {
          if (eraserFadeRafRef.current !== null) {
            cancelAnimationFrame(eraserFadeRafRef.current);
            eraserFadeRafRef.current = null;
          }
          eraserMarkedRef.current = new Set();
          setEraserMarkedIds(new Set());
          eraserTrailRef.current = [];
          setEraserTrail([]);
        };

        const onUp = () => {
          cleanup();
          const ids = Array.from(eraserMarkedRef.current);
          clearState();
          if (ids.length > 0) {
            engine.deleteNodes(ids);
          }
        };

        const onKeyDown = (ke: KeyboardEvent) => {
          if (ke.key === "Escape") {
            cleanup();
            clearState();
          }
        };

        const cleanup = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          ownerDoc().removeEventListener("keydown", onKeyDown);
        };

        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
        ownerDoc().addEventListener("keydown", onKeyDown);
      } else if (engine.mode === "laser") {
        if (e.button !== 0) return;
        const TRAIL_LIFETIME = 1560;

        // Cancel any existing fade loop (will be restarted below with merged trail)
        if (laserFadeRafRef.current !== null) {
          cancelAnimationFrame(laserFadeRafRef.current);
          laserFadeRafRef.current = null;
        }

        const now = performance.now();
        // Insert a NaN break marker so the renderer starts a new sub-path
        if (laserTrailRef.current.length > 0) {
          laserTrailRef.current.push([NaN, NaN, now]);
        }
        laserTrailRef.current.push([cx, cy, now]);
        setLaserTrail([...laserTrailRef.current]);
        engine.notifyLaserProgress([[cx, cy]]);

        // Broadcast throttle — awareness updates are expensive, limit to ~60ms
        let lastBroadcast = now;

        // Continuous fade loop — trims expired points every frame
        const fadeLoop = () => {
          const t = performance.now();
          const before = laserTrailRef.current.length;
          laserTrailRef.current = laserTrailRef.current.filter(
            (p) => t - p[2] < TRAIL_LIFETIME
          );
          if (laserTrailRef.current.length !== before || laserTrailRef.current.length > 0) {
            setLaserTrail([...laserTrailRef.current]);
          }
          // Broadcast periodically as points expire (so remote sees trail shrinking)
          if (t - lastBroadcast >= 60) {
            lastBroadcast = t;
            if (laserTrailRef.current.length > 0) {
              engine.notifyLaserProgress(
                laserTrailRef.current.map((p) => [p[0], p[1]] as [number, number])
              );
            }
          }
          if (laserTrailRef.current.length > 0) {
            laserFadeRafRef.current = requestAnimationFrame(fadeLoop);
          } else {
            laserFadeRafRef.current = null;
            setLaserTrail([]);
            engine.notifyLaserEnd();
          }
        };
        laserFadeRafRef.current = requestAnimationFrame(fadeLoop);

        const onMove = (me: PointerEvent) => {
          const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
          const t = performance.now();
          laserTrailRef.current.push([x, y, t]);
          setLaserTrail([...laserTrailRef.current]);
          engine.notifyLaserProgress(
            laserTrailRef.current.map((p) => [p[0], p[1]] as [number, number])
          );
        };

        const onUp = () => {
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
          // fadeLoop continues running until all points expire naturally
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      } else if (engine.mode === "hand") {
        if (e.button !== 0) return;
        e.preventDefault();
        const vpStartX = engine.viewport.x;
        const vpStartY = engine.viewport.y;
        const startX = e.clientX;
        const startY = e.clientY;

        // Switch to grabbing cursor while dragging
        const container = containerRef.current;
        if (container) container.style.cursor = "grabbing";

        const onMove = (me: PointerEvent) => {
          engine.viewport.x = vpStartX + (me.clientX - startX);
          engine.viewport.y = vpStartY + (me.clientY - startY);
          setViewport({ ...engine.viewport });
        };
        const onUp = () => {
          if (container) container.style.cursor = engine.lassoSelect ? LASSO_CURSOR : getCursorForMode(engine.mode);
          ownerDoc().removeEventListener("pointermove", onMove);
          ownerDoc().removeEventListener("pointerup", onUp);
        };
        ownerDoc().addEventListener("pointermove", onMove);
        ownerDoc().addEventListener("pointerup", onUp);
      }
    },
    [
      engine,
      createContentBlock,
      createTextNodeAndEdit,
      contextMenu,
      buildContextMenuSections,
      selBounds,
      measuredHeights,
      getNodeAABB,
      getNodesInMarqueeRect,
    ]
  );

  const handleResizeHandleDown = useCallback(
    (
      nodeId: string,
      handle: HandlePosition,
      e: React.PointerEvent<SVGRectElement | HTMLElement>
    ) => {
      e.preventDefault();
      if (engine.presentationMode) return;
      const node = engine.getNode(nodeId);
      if (!node || node.locked) return;

      const startScreenX = e.clientX;
      const startScreenY = e.clientY;
      const origX = node.x;
      const origY = node.y;
      const origW = node.w;
      const isAutoH = node.h === "auto";
      const origH = isAutoH ? (measuredHeights[nodeId] ?? 100) : (node.h as number);

      // Save original points for proportional scaling of draw nodes
      const origPoints =
        node.type === "draw"
          ? (node as DrawNode).data.points.map(
            (p) => [...p] as [number, number, number]
          )
          : null;

      // Save original endpoints for proportional scaling of line/arrow shapes
      const origStartPoint =
        node.type === "shape" ? (node as ShapeNode).data.startPoint : undefined;
      const origEndPoint =
        node.type === "shape" ? (node as ShapeNode).data.endPoint : undefined;

      // Save original font size for proportional scaling of text nodes
      const origFontSize =
        node.type === "text" ? (node as TextNode).data.fontSize : 0;

      engine.pushHistorySnapshot();

      const onMove = (me: PointerEvent) => {
        const dx = (me.clientX - startScreenX) / engine.viewport.zoom;
        const dy = (me.clientY - startScreenY) / engine.viewport.zoom;

        let newX = origX;
        let newY = origY;
        let newW = origW;
        let newH = origH;

        // Adjust bounds based on which handle is being dragged
        if (handle === "nw" || handle === "w" || handle === "sw") {
          newX = origX + dx;
          newW = origW - dx;
        }
        if (handle === "ne" || handle === "e" || handle === "se") {
          newW = origW + dx;
        }
        if (handle === "nw" || handle === "n" || handle === "ne") {
          newY = origY + dy;
          newH = origH - dy;
        }
        if (handle === "sw" || handle === "s" || handle === "se") {
          newH = origH + dy;
        }

        // Snap edges to grid (Cmd/Ctrl bypasses snap)
        if (engine.snapToGrid && !(me.metaKey || me.ctrlKey)) {
          const g = engine.gridSize;
          const snapVal = (v: number) => Math.round(v / g) * g;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = snapVal(newX);
            newW = origX + origW - newX;
          }
          if (handle === "ne" || handle === "e" || handle === "se") {
            newW = snapVal(newX + newW) - newX;
          }
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = snapVal(newY);
            newH = origY + origH - newY;
          }
          if (handle === "sw" || handle === "s" || handle === "se") {
            newH = snapVal(newY + newH) - newY;
          }
        }

        // Enforce minimum size
        const minSize = 10;
        if (newW < minSize) {
          newW = minSize;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = origX + origW - minSize;
          }
        }
        if (newH < minSize) {
          newH = minSize;
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = origY + origH - minSize;
          }
        }

        // Enforce device-preset aspect ratio for frames
        if (node.type === "frame") {
          const presetKey = (node as FrameNode).data.devicePreset;
          if (presetKey) {
            const preset = getPreset(presetKey);
            if (preset) {
              const ratio = getAspectRatio(preset);
              const isCorner = handle === "nw" || handle === "ne" || handle === "sw" || handle === "se";
              const isHorizontal = handle === "e" || handle === "w";

              if (isCorner || isHorizontal) {
                // Width drives height
                const desiredH = Math.round(newW / ratio);
                if (handle === "nw" || handle === "ne") {
                  newY = origY + origH - desiredH;
                }
                newH = desiredH;
              } else {
                // Vertical handles (n/s): height drives width
                const desiredW = Math.round(newH * ratio);
                newW = desiredW;
              }
            }
          }
        }

        const patch: Partial<SpatialNode> = {
          x: newX,
          y: newY,
          w: newW,
          h: isAutoH ? ("auto" as const) : newH,
        };

        // Scale draw node points proportionally
        if (origPoints && node.type === "draw") {
          const scaleX = origW > 0 ? newW / origW : 1;
          const scaleY = origH > 0 ? newH / origH : 1;
          const scaledPoints = origPoints.map(
            ([px, py, p]) =>
              [px * scaleX, py * scaleY, p] as [number, number, number]
          );
          patch.data = { ...(node as DrawNode).data, points: scaledPoints };
        }

        // Scale line/arrow endpoints proportionally
        if (node.type === "shape" && (origStartPoint || origEndPoint)) {
          const scaleX = origW > 0 ? newW / origW : 1;
          const scaleY = origH > 0 ? newH / origH : 1;
          const shapeData = { ...(node as ShapeNode).data };
          if (origStartPoint) {
            shapeData.startPoint = [
              origStartPoint[0] * scaleX,
              origStartPoint[1] * scaleY,
            ];
          }
          if (origEndPoint) {
            shapeData.endPoint = [
              origEndPoint[0] * scaleX,
              origEndPoint[1] * scaleY,
            ];
          }
          patch.data = shapeData;
        }

        // Scale text node font size proportionally (only for corner/vertical handles,
        // not for e/w which just reflow text within a new width)
        if (node.type === "text" && origFontSize > 0 && handle !== "e" && handle !== "w") {
          const scale = (handle === "n" || handle === "s")
            ? (origH > 0 ? newH / origH : 1)
            : (origW > 0 ? newW / origW : 1);
          const newFontSize = Math.max(8, Math.round(origFontSize * scale));
          patch.data = { ...(node as TextNode).data, fontSize: newFontSize };
        }

        engine.updateNode(nodeId, patch);
      };

      const onUp = () => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        // If a frame was resized, sync children (remove outside, add newly inside)
        if (engine.isContainerType(node.type)) {
          engine.syncFrameChildrenAfterResize(nodeId);
        }
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights]
  );

  // Rotation handler for SVG nodes (draw/shape)
  const handleRotateStart = useCallback(
    (nodeId: string, e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const node = engine.getNode(nodeId);
      if (!node || node.locked) return;

      const h = node.h === "auto" ? (measuredHeights[nodeId] ?? 100) : (node.h as number);
      const centerX = node.x + node.w / 2;
      const centerY = node.y + h / 2;
      const initialRotation = node.rotation || 0;

      const { x: startCx, y: startCy } = engine.screenToCanvas(
        e.clientX,
        e.clientY
      );
      const startAngle = Math.atan2(startCy - centerY, startCx - centerX);

      engine.pushHistorySnapshot();

      const onMove = (me: PointerEvent) => {
        const { x: cx, y: cy } = engine.screenToCanvas(me.clientX, me.clientY);
        const currentAngle = Math.atan2(cy - centerY, cx - centerX);
        let rotation =
          initialRotation + (currentAngle - startAngle) * (180 / Math.PI);

        if ((me.shiftKey || engine.snapToGrid) && !(me.metaKey || me.ctrlKey)) {
          rotation = Math.round(rotation / 15) * 15;
        }

        engine.updateNode(nodeId, { rotation });
      };
      const onUp = () => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights]
  );

  // Connection handle handler — drag from a handle to create an edge from any mode
  const handleConnectionHandleDown = useCallback(
    (nodeId: string, side: HandleSide, e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const sourceNode = engine.getNode(nodeId);
      if (!sourceNode) return;

      const { x: startCX, y: startCY } = engine.screenToCanvas(e.clientX, e.clientY);
      setEdgePreview({ fromNode: sourceNode, cursorX: startCX, cursorY: startCY, sourceHandle: side });

      const onMove = (me: PointerEvent) => {
        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        setEdgePreview((prev) =>
          prev ? { ...prev, cursorX: x, cursorY: y } : null
        );
      };
      const onUp = (me: PointerEvent) => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        setEdgePreview(null);

        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        let targetNode = engine.hitTest(x, y, measuredHeights);

        // Fallback: find nearest node by handle midpoint distance.
        // Runs when hitTest missed or hit a frame (prefer children over frame).
        if (!targetNode || targetNode.type === "edge" || engine.isContainerType(targetNode.type)) {
          const snapThreshold = 50 / engine.viewport.zoom;
          let bestDist = Infinity;
          let bestIsFrame = false;
          let bestNode: SpatialNode | null = null;
          for (const n of engine.getAllNodes()) {
            if (n.type === "edge" || n.id === sourceNode.id) continue;
            const isFrame = engine.isContainerType(n.type);
            const handlePositions = getNodeHandlePositions(n, measuredHeights);
            for (const hp of handlePositions) {
              const dist = Math.hypot(hp.x - x, hp.y - y);
              if (dist >= snapThreshold) continue;
              if (isFrame && !bestIsFrame && bestNode) continue;
              if ((!isFrame && bestIsFrame) || dist < bestDist) {
                bestDist = dist;
                bestIsFrame = isFrame;
                bestNode = n;
              }
            }
          }
          if (bestNode) targetNode = bestNode;
        }

        if (
          !targetNode ||
          targetNode.type === "edge" ||
          targetNode.id === sourceNode.id
        )
          return;

        // Prevent duplicate edges between the same pair
        const exists = engine.getAllNodes().some(
          (n) =>
            n.type === "edge" &&
            (((n as EdgeNode).data.fromId === sourceNode.id &&
              (n as EdgeNode).data.toId === targetNode.id) ||
              ((n as EdgeNode).data.fromId === targetNode.id &&
                (n as EdgeNode).data.toId === sourceNode.id))
        );
        if (exists) return;

        const targetHandle = nearestHandle(targetNode, x, y, measuredHeights);

        const edgeNode: EdgeNode = {
          id: nanoid(10),
          type: "edge",
          x: 0, y: 0, w: 0, h: 0, z: engine.nextZ(),
          data: {
            fromId: sourceNode.id,
            toId: targetNode.id,
            style: "solid",
            color: engine.activeTool.color,
            strokeWidth: 2,
            arrowHead: "arrow",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: side,
            targetHandle,
          },
        };
        engine.addNode(edgeNode);
        engine.select(edgeNode.id);
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights]
  );

  // Find the nearest selected node for a given side of the multi-selection bounding box
  const findNearestNodeForSide = useCallback(
    (side: HandleSide): string | null => {
      let bestId: string | null = null;
      let bestVal = side === "top" || side === "left" ? Infinity : -Infinity;
      for (const id of engine.selection) {
        const n = engine.getNode(id);
        if (!n || n.type === "edge") continue;
        const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
        let val: number;
        switch (side) {
          case "top": val = n.y; break;
          case "bottom": val = n.y + h; break;
          case "left": val = n.x; break;
          case "right": val = n.x + n.w; break;
        }
        if ((side === "top" || side === "left") ? val < bestVal : val > bestVal) {
          bestVal = val;
          bestId = id;
        }
      }
      return bestId;
    },
    [engine, measuredHeights]
  );

  // Port handle drag — create port-aware edges between nodes with data-flow ports
  const handlePortHandleDown = useCallback(
    (nodeId: string, portId: string, direction: "input" | "output", e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const sourceNode = engine.getNode(nodeId);
      if (!sourceNode || !registry) return;

      const sourceDef = registry.get(sourceNode.type);
      const sourcePort = sourceDef?.ports?.find((p) => p.id === portId);
      if (!sourcePort) return;

      // Determine which side the port is on (inputs=left, outputs=right)
      const sourceHandle: HandleSide = direction === "input" ? "left" : "right";

      const { x: startCX, y: startCY } = engine.screenToCanvas(e.clientX, e.clientY);
      setEdgePreview({
        fromNode: sourceNode,
        cursorX: startCX,
        cursorY: startCY,
        sourceHandle,
        sourcePort: portId,
        sourceDirection: direction,
      });

      const onMove = (me: PointerEvent) => {
        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        setEdgePreview((prev) =>
          prev ? { ...prev, cursorX: x, cursorY: y } : null
        );
      };

      const onUp = (me: PointerEvent) => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        setEdgePreview(null);

        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        const expectedDir = direction === "output" ? "input" : "output";
        const portSnapThreshold = 40 / engine.viewport.zoom;

        // Port-aware target finding: scan ALL nodes with compatible ports
        // and find the nearest port circle to the cursor.
        // This is needed because port circles are offset outside the node bounds,
        // so engine.hitTest() would miss them.
        let bestTargetNode: SpatialNode | null = null;
        let bestTargetPort: { id: string; direction: "input" | "output"; dataType: string } | null = null;
        let bestDist = Infinity;

        for (const n of engine.getAllNodes()) {
          if (n.type === "edge" || n.id === sourceNode.id) continue;
          const nDef = registry.get(n.type);
          if (!nDef?.ports?.length) continue;

          const nh = n.h === "auto" ? (engine.measuredHeights[n.id] ?? 100) : n.h as number;

          for (const p of nDef.ports) {
            // Only consider ports in the expected direction
            if (p.direction !== expectedDir) continue;
            // Type compatibility
            if (sourcePort.dataType !== "any" && p.dataType !== "any" && sourcePort.dataType !== p.dataType) continue;

            // Compute port position (must match SVGLayer rendering)
            const portsOfDir = nDef.ports.filter((pp) => pp.direction === p.direction);
            const idx = portsOfDir.indexOf(p);
            const portOffset = 14 / engine.viewport.zoom;
            const py = n.y + (nh / (portsOfDir.length + 1)) * (idx + 1);
            const px = p.direction === "input"
              ? n.x - portOffset
              : n.x + n.w + portOffset;

            const dist = Math.hypot(px - x, py - y);
            if (dist < portSnapThreshold && dist < bestDist) {
              bestDist = dist;
              bestTargetNode = n;
              bestTargetPort = p;
            }
          }
        }

        if (!bestTargetNode || !bestTargetPort) return;

        // Prevent duplicate port connections (one edge per input port)
        const targetPortId = bestTargetPort.id;
        const inputNodeId = direction === "output" ? bestTargetNode.id : sourceNode.id;
        const inputPortId = direction === "output" ? targetPortId : portId;
        const duplicate = engine.getAllNodes().some((n) => {
          if (n.type !== "edge") return false;
          const ed = (n as EdgeNode).data;
          return ed.toId === inputNodeId && ed.targetPort === inputPortId;
        });
        if (duplicate) return;

        // Determine edge direction: always output → input
        const fromId = direction === "output" ? sourceNode.id : bestTargetNode.id;
        const toId = direction === "output" ? bestTargetNode.id : sourceNode.id;
        const fromPort = direction === "output" ? portId : targetPortId;
        const toPort = direction === "output" ? targetPortId : portId;
        const fromHandle: HandleSide = "right";
        const toHandle: HandleSide = "left";

        const edgeNode: EdgeNode = {
          id: nanoid(10),
          type: "edge",
          x: 0, y: 0, w: 0, h: 0, z: engine.nextZ(),
          data: {
            fromId,
            toId,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: fromHandle,
            targetHandle: toHandle,
            sourcePort: fromPort,
            targetPort: toPort,
          },
        };
        engine.addNode(edgeNode);
        engine.select(edgeNode.id);
      };

      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, registry, measuredHeights]
  );

  // Subscribe to DataFlowEngine changes for port value re-renders
  const [dataFlowVersion, setDataFlowVersion] = useState(0);
  useEffect(() => {
    if (!dataFlow) return;
    return dataFlow.onChange(() => setDataFlowVersion((v) => v + 1));
  }, [dataFlow]);

  // Kink handle drag — reposition the bend point of step/smoothstep edges
  const handleKinkHandleDown = useCallback(
    (edgeId: string, axis: "x" | "y" | "xy", _min: number, _max: number, e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const edgeNode = engine.getNode(edgeId) as EdgeNode | undefined;
      if (!edgeNode || edgeNode.type !== "edge") return;

      engine.pushHistorySnapshot();

      const onMove = (me: PointerEvent) => {
        const canvasPos = engine.screenToCanvas(me.clientX, me.clientY);
        const fresh = engine.getNode(edgeId) as EdgeNode | undefined;
        if (!fresh) return;
        const fromNode = engine.getNode(fresh.data.fromId);
        const toNode = engine.getNode(fresh.data.toId);
        if (!fromNode || !toNode) return;

        if (axis === "xy") {
          // Bezier: compute offset from the natural (no-offset) midpoint
          const naturalPath = computeEdgePath(
            fromNode, toNode,
            fresh.data.edgeType || "bezier",
            measuredHeights,
            fresh.data.sourceHandle, fresh.data.targetHandle,
            undefined, undefined // no offsets → natural midpoint
          );
          if (!naturalPath.kinkHandle) return;
          const dx = canvasPos.x - naturalPath.kinkHandle.x;
          const dy = canvasPos.y - naturalPath.kinkHandle.y;
          engine.updateNode(edgeId, {
            data: { ...fresh.data, curveOffset: [dx, dy] },
          } as Partial<EdgeNode>);
        } else {
          // Step/smoothstep: single-axis ratio-based offset
          const val = axis === "x" ? canvasPos.x : canvasPos.y;
          const pathResult = computeEdgePath(
            fromNode, toNode,
            fresh.data.edgeType || "bezier",
            measuredHeights,
            fresh.data.sourceHandle, fresh.data.targetHandle,
            0.5 // default to get range
          );
          if (!pathResult.kinkHandle) return;
          const curMin = pathResult.kinkHandle.min;
          const curMax = pathResult.kinkHandle.max;
          const range = curMax - curMin;
          if (range === 0) return;
          const clamped = Math.max(curMin, Math.min(curMax, val));
          const offset = (clamped - curMin) / range;
          engine.updateNode(edgeId, {
            data: { ...fresh.data, midpointOffset: offset },
          } as Partial<EdgeNode>);
        }
      };

      const onUp = () => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
      };

      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights]
  );

  // Edge endpoint drag — reconnect an existing edge to a different node
  const handleEdgeEndpointDown = useCallback(
    (edgeId: string, endpoint: "source" | "target", e: React.PointerEvent<SVGCircleElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const edgeNode = engine.getNode(edgeId) as EdgeNode | undefined;
      if (!edgeNode || edgeNode.type !== "edge") return;

      const { fromId, toId, sourceHandle, targetHandle } = edgeNode.data;

      // The anchor is the end NOT being dragged
      const anchorNodeId = endpoint === "source" ? toId : fromId;
      const anchorHandle = endpoint === "source" ? targetHandle : sourceHandle;

      const fromNode = engine.getNode(fromId);
      const toNode = engine.getNode(toId);
      if (!fromNode || !toNode) return;

      // Compute current endpoint position so cursor starts at the right spot
      const pathResult = computeEdgePath(
        fromNode, toNode,
        edgeNode.data.edgeType || "bezier",
        measuredHeights,
        sourceHandle, targetHandle
      );
      const startCursor = endpoint === "source"
        ? { x: pathResult.x1, y: pathResult.y1 }
        : { x: pathResult.x2, y: pathResult.y2 };

      setEdgeReconnect({
        edgeId,
        endpoint,
        anchorNodeId,
        anchorHandle,
        cursorX: startCursor.x,
        cursorY: startCursor.y,
      });

      const onMove = (me: PointerEvent) => {
        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);
        setEdgeReconnect((prev) =>
          prev ? { ...prev, cursorX: x, cursorY: y } : null
        );
      };

      const onUp = (me: PointerEvent) => {
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        setEdgeReconnect(null);

        const { x, y } = engine.screenToCanvas(me.clientX, me.clientY);

        // Find target node by hitTest, with handle-midpoint fallback.
        // Also search when hitting a frame — prefer children over the frame.
        let targetNode = engine.hitTest(x, y, measuredHeights);
        if (!targetNode || targetNode.type === "edge" || engine.isContainerType(targetNode.type)) {
          const snapThreshold = 50 / engine.viewport.zoom;
          let bestDist = Infinity;
          let bestIsFrame = false;
          let bestNode: SpatialNode | null = null;
          for (const n of engine.getAllNodes()) {
            if (n.type === "edge") continue;
            const isFrame = engine.isContainerType(n.type);
            const handlePositions = getNodeHandlePositions(n, measuredHeights);
            for (const hp of handlePositions) {
              const dist = Math.hypot(hp.x - x, hp.y - y);
              if (dist >= snapThreshold) continue;
              if (isFrame && !bestIsFrame && bestNode) continue;
              if ((!isFrame && bestIsFrame) || dist < bestDist) {
                bestDist = dist;
                bestIsFrame = isFrame;
                bestNode = n;
              }
            }
          }
          if (bestNode) targetNode = bestNode;
        }

        // Validate: must land on a non-edge node
        if (!targetNode || targetNode.type === "edge") return;

        // Compute new fromId/toId
        const newFromId = endpoint === "source" ? targetNode.id : fromId;
        const newToId = endpoint === "target" ? targetNode.id : toId;

        // Prevent self-loops
        if (newFromId === newToId) return;

        // No-op if dropped on the same node it was on
        const originalEndNodeId = endpoint === "source" ? fromId : toId;
        if (targetNode.id === originalEndNodeId) return;

        // Prevent duplicate edges (exclude current edge from check)
        const wouldDuplicate = engine.getAllNodes().some((n) => {
          if (n.type !== "edge" || n.id === edgeId) return false;
          const d = (n as EdgeNode).data;
          return (
            (d.fromId === newFromId && d.toId === newToId) ||
            (d.fromId === newToId && d.toId === newFromId)
          );
        });
        if (wouldDuplicate) return;

        // Compute new handle for the reconnected endpoint
        const newHandle = nearestHandle(targetNode, x, y, measuredHeights);

        // Apply with history (Ctrl+Z undoes reconnection)
        const dataPatch: Partial<EdgeNode["data"]> = endpoint === "source"
          ? { fromId: targetNode.id, sourceHandle: newHandle }
          : { toId: targetNode.id, targetHandle: newHandle };

        engine.updateNodeWithHistory(edgeId, { data: dataPatch } as Partial<EdgeNode>);
      };

      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights]
  );

  // Unified rotation handler for multi-selection
  const handleUnifiedRotateDown = useCallback(
    (e: React.PointerEvent<SVGElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (engine.presentationMode) return;

      const selectedNodes = Array.from(engine.selection)
        .map((id) => engine.getNode(id))
        .filter(Boolean) as SpatialNode[];
      if (selectedNodes.length < 2) return;

      const isSingleGroup = engine.selectionIsSingleGroup();
      const gid = isSingleGroup ? (engine.selectionGroupId() ?? null) : null;
      const stored = gid ? engine.groupRotations.get(gid) : null;

      // Use stored pivot for groups, otherwise compute from current AABB
      let groupCx: number, groupCy: number;
      if (stored) {
        groupCx = stored.cx;
        groupCy = stored.cy;
      } else {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const n of selectedNodes) {
          const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
          const aabb = getNodeAABB(n, h);
          minX = Math.min(minX, aabb.minX);
          minY = Math.min(minY, aabb.minY);
          maxX = Math.max(maxX, aabb.maxX);
          maxY = Math.max(maxY, aabb.maxY);
        }
        groupCx = (minX + maxX) / 2;
        groupCy = (minY + maxY) / 2;
      }

      const baseAngle = stored?.angle ?? 0;

      // Exclude locked nodes from rotation
      const movableNodes = selectedNodes.filter((n) => !n.locked);
      const initials = movableNodes.map((n) => {
        const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
        return {
          id: n.id,
          cx: n.x + n.w / 2,
          cy: n.y + h / 2,
          w: n.w,
          h,
          rotation: n.rotation || 0,
        };
      });

      // Compute the frozen (unrotated) bounds for the visual box
      const baseRad = (-baseAngle * Math.PI) / 180;
      const baseCos = Math.cos(baseRad);
      const baseSin = Math.sin(baseRad);
      let fMinX = Infinity, fMinY = Infinity, fMaxX = -Infinity, fMaxY = -Infinity;
      for (const init of initials) {
        // Reverse-rotate node center to unrotated space
        const dx = init.cx - groupCx;
        const dy = init.cy - groupCy;
        const ux = groupCx + dx * baseCos - dy * baseSin;
        const uy = groupCy + dx * baseSin + dy * baseCos;
        fMinX = Math.min(fMinX, ux - init.w / 2);
        fMinY = Math.min(fMinY, uy - init.h / 2);
        fMaxX = Math.max(fMaxX, ux + init.w / 2);
        fMaxY = Math.max(fMaxY, uy + init.h / 2);
      }
      const frozenBounds = {
        x: fMinX - SEL_PAD,
        y: fMinY - SEL_PAD,
        w: fMaxX - fMinX + SEL_PAD * 2,
        h: fMaxY - fMinY + SEL_PAD * 2,
      };

      const { x: startCx, y: startCy } = engine.screenToCanvas(e.clientX, e.clientY);
      const startAngle = Math.atan2(startCy - groupCy, startCx - groupCx);

      engine.pushHistorySnapshot();

      let lastTotalAngle = baseAngle;

      const onMove = (me: PointerEvent) => {
        const { x: cx, y: cy } = engine.screenToCanvas(me.clientX, me.clientY);
        const currentAngle = Math.atan2(cy - groupCy, cx - groupCx);
        let angleDelta = (currentAngle - startAngle) * (180 / Math.PI);

        if ((me.shiftKey || engine.snapToGrid) && !(me.metaKey || me.ctrlKey)) {
          angleDelta = Math.round(angleDelta / 15) * 15;
        }

        lastTotalAngle = baseAngle + angleDelta;

        // Update visual rotation of the selection box
        setGroupRotation({ angle: lastTotalAngle, cx: groupCx, cy: groupCy, bounds: frozenBounds });

        const rad = (angleDelta * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        const batch = initials.map((init) => {
          const dx = init.cx - groupCx;
          const dy = init.cy - groupCy;
          const newCx = groupCx + dx * cos - dy * sin;
          const newCy = groupCy + dx * sin + dy * cos;
          return {
            id: init.id,
            patch: {
              x: newCx - init.w / 2,
              y: newCy - init.h / 2,
              rotation: lastTotalAngle,
            },
          };
        });
        engine.updateMany(batch);
      };
      const onUp = () => {
        // Persist rotation to engine for groups (survives re-selection)
        if (gid) {
          engine.groupRotations.set(gid, { angle: lastTotalAngle, cx: groupCx, cy: groupCy });
        }
        // Keep the visual rotation on the selection box (cleared on selection change)
        setGroupRotation({ angle: lastTotalAngle, cx: groupCx, cy: groupCy, bounds: frozenBounds });
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights, getNodeAABB]
  );

  // Unified resize handler for multi-selection
  const handleUnifiedResizeDown = useCallback(
    (handle: HandlePosition, e: React.PointerEvent<SVGRectElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (engine.presentationMode) return;

      const selectedNodes = Array.from(engine.selection)
        .map((id) => engine.getNode(id))
        .filter(Boolean) as SpatialNode[];
      if (selectedNodes.length < 2) return;

      const getH = (n: SpatialNode) =>
        n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);

      // Compute original unified bounding box (use measured heights + rotation)
      let bMinX = Infinity, bMinY = Infinity, bMaxX = -Infinity, bMaxY = -Infinity;
      for (const n of selectedNodes) {
        const h = getH(n);
        const aabb = getNodeAABB(n, h);
        bMinX = Math.min(bMinX, aabb.minX);
        bMinY = Math.min(bMinY, aabb.minY);
        bMaxX = Math.max(bMaxX, aabb.maxX);
        bMaxY = Math.max(bMaxY, aabb.maxY);
      }
      const origBox = { x: bMinX, y: bMinY, w: bMaxX - bMinX, h: bMaxY - bMinY };
      const safeBW = origBox.w || 1;
      const safeBH = origBox.h || 1;

      // Store each node's original state relative to the unified box (exclude locked)
      const movableNodes = selectedNodes.filter((n) => !n.locked);
      const origStates = movableNodes.map((n) => {
        const h = getH(n);
        return {
          id: n.id,
          type: n.type,
          isAutoH: n.h === "auto",
          relX: (n.x - origBox.x) / safeBW,
          relY: (n.y - origBox.y) / safeBH,
          relW: n.w / safeBW,
          relH: h / safeBH,
          origW: n.w,
          origH: h,
          origPoints: n.type === "draw"
            ? (n as DrawNode).data.points.map((p) => [...p] as [number, number, number])
            : null,
          drawData: n.type === "draw" ? { ...(n as DrawNode).data } : null,
        };
      });

      const startScreenX = e.clientX;
      const startScreenY = e.clientY;
      engine.pushHistorySnapshot();

      let rafId: number | null = null;
      let lastClientX = startScreenX;
      let lastClientY = startScreenY;
      let lastModKey = false;

      const applyResize = () => {
        rafId = null;
        const dx = (lastClientX - startScreenX) / engine.viewport.zoom;
        const dy = (lastClientY - startScreenY) / engine.viewport.zoom;

        let newX = origBox.x, newY = origBox.y, newW = origBox.w, newH = origBox.h;

        if (handle === "nw" || handle === "w" || handle === "sw") {
          newX = origBox.x + dx;
          newW = origBox.w - dx;
        }
        if (handle === "ne" || handle === "e" || handle === "se") {
          newW = origBox.w + dx;
        }
        if (handle === "nw" || handle === "n" || handle === "ne") {
          newY = origBox.y + dy;
          newH = origBox.h - dy;
        }
        if (handle === "sw" || handle === "s" || handle === "se") {
          newH = origBox.h + dy;
        }

        if (engine.snapToGrid && !lastModKey) {
          const g = engine.gridSize;
          const snapVal = (v: number) => Math.round(v / g) * g;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = snapVal(newX);
            newW = origBox.x + origBox.w - newX;
          }
          if (handle === "ne" || handle === "e" || handle === "se") {
            newW = snapVal(newX + newW) - newX;
          }
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = snapVal(newY);
            newH = origBox.y + origBox.h - newY;
          }
          if (handle === "sw" || handle === "s" || handle === "se") {
            newH = snapVal(newY + newH) - newY;
          }
        }

        if (newW < 20) {
          newW = 20;
          if (handle === "nw" || handle === "w" || handle === "sw") {
            newX = origBox.x + origBox.w - 20;
          }
        }
        if (newH < 20) {
          newH = 20;
          if (handle === "nw" || handle === "n" || handle === "ne") {
            newY = origBox.y + origBox.h - 20;
          }
        }

        const updates = origStates.map((orig) => {
          const nodeNewX = newX + orig.relX * newW;
          const nodeNewY = newY + orig.relY * newH;
          const nodeNewW = orig.relW * newW;
          const nodeNewH = orig.relH * newH;

          const patch: Partial<SpatialNode> = {
            x: nodeNewX,
            y: nodeNewY,
            w: nodeNewW,
            h: orig.isAutoH ? ("auto" as const) : nodeNewH,
          };

          if (orig.origPoints && orig.drawData) {
            const scaleX = orig.origW > 0 ? nodeNewW / orig.origW : 1;
            const scaleY = orig.origH > 0 ? nodeNewH / orig.origH : 1;
            patch.data = {
              ...orig.drawData,
              points: orig.origPoints.map(
                ([px, py, p]) => [px * scaleX, py * scaleY, p] as [number, number, number]
              ),
            };
          }

          return { id: orig.id, patch };
        });

        engine.updateMany(updates);
      };

      const onMove = (me: PointerEvent) => {
        lastClientX = me.clientX;
        lastClientY = me.clientY;
        lastModKey = me.metaKey || me.ctrlKey;
        if (rafId === null) {
          rafId = requestAnimationFrame(applyResize);
        }
      };

      const onUp = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          applyResize();
        }
        ownerDoc().removeEventListener("pointermove", onMove);
        ownerDoc().removeEventListener("pointerup", onUp);
        // If any frames were resized, sync children (remove outside, add newly inside)
        for (const s of selectedNodes) {
          if (engine.isContainerType(s.type)) engine.syncFrameChildrenAfterResize(s.id);
        }
      };
      ownerDoc().addEventListener("pointermove", onMove);
      ownerDoc().addEventListener("pointerup", onUp);
    },
    [engine, measuredHeights, getNodeAABB]
  );

  // Double-click is intentionally NOT used to create content blocks in select
  // mode — rapid clicking (select then drag) was triggering false positives.
  // Use the Text tool (T) to create blocks via drag-to-create instead.

  // Manage cursor imperatively to avoid re-renders on every pointer move
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.cursor = engine.lassoSelect ? LASSO_CURSOR : getCursorForMode(mode);
    }
    // Clear hover when leaving select/edge mode
    if (mode !== "select" && mode !== "edge") {
      hoveredNodeIdRef.current = null;
      setHoveredNodeId(null);
    }
    // Clear eraser state when leaving erase mode
    if (mode !== "erase") {
      if (eraserFadeRafRef.current !== null) {
        cancelAnimationFrame(eraserFadeRafRef.current);
        eraserFadeRafRef.current = null;
      }
      eraserMarkedRef.current = new Set();
      setEraserMarkedIds(new Set());
      eraserTrailRef.current = [];
      setEraserTrail([]);
    }
  }, [mode]);

  const pointerMoveRafRef = useRef<number | null>(null);
  const pointerMovePendingRef = useRef<{ clientX: number; clientY: number } | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      // Cancel long-press if finger moves more than 8px
      if (longPressTimerRef.current && e.pointerType === "touch" && longPressOriginRef.current) {
        const dx = e.clientX - longPressOriginRef.current.clientX;
        const dy = e.clientY - longPressOriginRef.current.clientY;
        if (Math.sqrt(dx * dx + dy * dy) > 8) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
          longPressOriginRef.current = null;
        }
      }
      if (engine.mode !== "select" && engine.mode !== "edge") return;
      pointerMovePendingRef.current = { clientX: e.clientX, clientY: e.clientY };
      if (pointerMoveRafRef.current !== null) return;
      pointerMoveRafRef.current = requestAnimationFrame(() => {
        pointerMoveRafRef.current = null;
        const container = containerRef.current;
        const pending = pointerMovePendingRef.current;
        if (!container || !pending) return;

        const { x: cx, y: cy } = engine.screenToCanvas(pending.clientX, pending.clientY);

        // In lasso mode, always show lasso cursor
        if (engine.lassoSelect) {
          container.style.cursor = LASSO_CURSOR;
          return;
        }

        // In edge mode, just track hover for connection handles
        if (engine.mode === "edge") {
          const hit = engine.hitTest(cx, cy, measuredHeights);
          const newHoveredId = (hit && hit.type !== "edge") ? hit.id : null;
          if (newHoveredId !== hoveredNodeIdRef.current) {
            hoveredNodeIdRef.current = newHoveredId;
            setHoveredNodeId(newHoveredId);
          }
          return;
        }

        // For multi-selection, show move cursor inside the selection bounding box
        if (
          engine.selection.size >= 2 &&
          selBounds &&
          cx >= selBounds.x &&
          cx <= selBounds.x + selBounds.w &&
          cy >= selBounds.y &&
          cy <= selBounds.y + selBounds.h
        ) {
          container.style.cursor = "move";
          return;
        }

        // Check if hovering over any node
        const hit = engine.hitTest(cx, cy, measuredHeights);
        const newHoveredId = hit ? hit.id : null;
        if (newHoveredId !== hoveredNodeIdRef.current) {
          hoveredNodeIdRef.current = newHoveredId;
          setHoveredNodeId(newHoveredId);
        }
        if (hit) {
          container.style.cursor = "move";
          return;
        }

        container.style.cursor = "default";
      });
    },
    [engine, selBounds, measuredHeights, getNodeAABB]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (
      e.dataTransfer.types.includes("Files") ||
      e.dataTransfer.types.includes(LIBRARY_ITEM_MIME) ||
      e.dataTransfer.types.includes(PERSONAL_ITEM_MIME) ||
      e.dataTransfer.types.includes(GIF_ITEM_MIME)
    ) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (engine.presentationMode) return;

      // Handle GIF item drag-and-drop
      const gifData = e.dataTransfer.getData(GIF_ITEM_MIME);
      if (gifData) {
        try {
          const item = JSON.parse(gifData);
          placeGif(engine, item, e.clientX, e.clientY);
        } catch (err) {
          console.error("Failed to place GIF:", err);
        }
        return;
      }

      // Handle personal library item drag-and-drop
      const personalData = e.dataTransfer.getData(PERSONAL_ITEM_MIME);
      if (personalData) {
        try {
          const { itemId } = JSON.parse(personalData) as { itemId: string };
          const items = getPersonalItems();
          const item = items.find((i) => i.id === itemId);
          if (item) {
            placePersonalItem(engine, item, e.clientX, e.clientY);
          }
        } catch (err) {
          console.error("Failed to place personal library item:", err);
        }
        return;
      }

      // Handle library item drag-and-drop from the library panel
      const libItemData = e.dataTransfer.getData(LIBRARY_ITEM_MIME);
      if (libItemData) {
        try {
          const { libraryId, itemId } = JSON.parse(libItemData) as {
            libraryId: string;
            itemId: string;
          };
          const items = getLibraryItems(libraryId);
          const item = items.find((i) => i.id === itemId);
          if (item) {
            placeLibraryItem(engine, item, e.clientX, e.clientY);
          }
        } catch (err) {
          console.error("Failed to place library item:", err);
        }
        return;
      }

      const file = e.dataTransfer.files[0];
      if (!file) return;

      // Handle .excalidrawlib file drops
      if (file.name.endsWith(".excalidrawlib") || file.name.endsWith(".excalidrawlib.json")) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const lib = JSON.parse(reader.result as string) as ExcalidrawLibFileRaw;
            if (lib.type === "excalidrawlib") {
              const name = file.name.replace(/\.excalidrawlib(\.json)?$/, "");
              installExcalidrawLib(lib, { name });
            }
          } catch (err) {
            console.error("Failed to import library:", err);
          }
        };
        reader.readAsText(file);
        return;
      }

      // Handle SVG files — read as text to preserve viewBox dimensions
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result as string;
          const svg = extractSvgMarkup(text);
          if (svg) {
            placeSvgOnCanvas(engine, svg, e.clientX, e.clientY);
          }
        };
        reader.readAsText(file);
        return;
      }

      if (!file.type.startsWith("image/")) return;
      const { x, y } = engine.screenToCanvas(e.clientX, e.clientY);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const img = new Image();
        img.onload = () => {
          const w = Math.min(img.naturalWidth, 400);
          const h = Math.min(img.naturalHeight, 300);
          const aspect = img.naturalWidth / img.naturalHeight;
          const finalW = aspect >= 1 ? w : h * aspect;
          const finalH = aspect >= 1 ? w / aspect : h;
          engine.addNode({
            id: nanoid(10),
            type: "image",
            x,
            y,
            w: finalW,
            h: finalH,
            z: engine.nextZ(),
            data: { src: dataUrl },
          } as ImageNode);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    [engine]
  );

  const viewportTransform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`;

  return (
    <div
      ref={containerRef}
      data-sb-canvas
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        touchAction: "none",
        background: getPaperType(boardBackground).canvasBg,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <GridBackground viewport={viewport} gridSize={gridSize} background={boardBackground} gridVisible={gridActive} />

      {/* Unified DOM layer — all node types share one stacking context for correct z-ordering */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: viewportTransform,
          transformOrigin: "0 0",
          pointerEvents: "none",
        }}
      >
        {(visibleNodes || nodes)
          .filter((n) => {
            if (registry) {
              const def = registry.get(n.type);
              return def && !def.isSVGOnly;
            }
            return (
              n.type === "content" ||
              n.type === "draw" ||
              n.type === "shape" ||
              n.type === "image" ||
              n.type === "text" ||
              n.type === "frame" ||
              n.type === "sticky"
            );
          })
          .sort((a, b) => a.z - b.z)
          .map((node) => {
            const isEraserMarked = eraserMarkedIds.has(node.id);
            let el: React.ReactNode;

            if (registry) {
              const def = registry.get(node.type);
              if (def) {
                const Component = def.component;
                const isSelected = selection.has(node.id);
                const isInteractive = mode === "select" || mode === "text" || mode === "note" || mode === "sticky";
                const componentEl = (
                  <Component
                    key={def.handlesOwnLayout ? node.id : undefined}
                    node={node}
                    data={node.data}
                    isSelected={isSelected}
                    multiSelected={
                      selection.size > 1 &&
                      isSelected &&
                      !engine.selectionIsSingleGroup()
                    }
                    engine={engine}
                    interactive={isInteractive}
                    zoom={viewport.zoom}
                    editing={editingNodeId === node.id}
                    editClickPos={editingNodeId === node.id ? editClickRef.current : null}
                    callbacks={{
                      onMeasuredHeight: handleMeasuredHeight,
                      onResizeHandleDown: handleResizeHandleDown as NodeCallbacks["onResizeHandleDown"],
                      onEditStart: (id: string) => {
                        const n = engine.getNode(id);
                        if (!n) return;
                        if (n.type === "text") setEditingTextId(id);
                        else if (n.type === "sticky") setEditingStickyId(id);
                        else if (n.type === "frame") setEditingFrameLabelId(id);
                        else if (n.type === "shape") setEditingShapeLabelId(id);
                        else if (n.type === "image") setCroppingImageId(id);
                        else if (n.type === "youtube") setEditingYouTubeId(id);
                      },
                      onEditEnd: () => {
                        setEditingTextId(null);
                        setEditingStickyId(null);
                        setEditingFrameLabelId(null);
                        setEditingShapeLabelId(null);
                        setCroppingImageId(null);
                        setEditingYouTubeId(null);
                      },
                    }}
                    portValues={dataFlow && def.ports?.length && dataFlowVersion >= 0 ? dataFlow.getAllPortValues(node.id) : undefined}
                    updateData={(patch: Record<string, unknown>) => {
                      engine.updateNodeWithHistory(node.id, {
                        data: { ...(node.data as Record<string, unknown>), ...patch },
                      });
                    }}
                  />
                );
                // Built-in types handle their own layout; custom nodes get a positioning wrapper
                if (def.handlesOwnLayout) {
                  el = componentEl;
                } else {
                  el = (
                    <RegistryNodeWrapper
                      key={node.id}
                      node={node}
                      isInteractive={isInteractive}
                      measuredH={measuredHeights[node.id]}
                      onMeasuredHeight={handleMeasuredHeight}
                      observeElement={observeElement}
                      unobserveElement={unobserveElement}
                      isContainer={def.isContainer}
                    >
                      {componentEl}
                    </RegistryNodeWrapper>
                  );
                }
              }
            } else {
              // Legacy fallback: hardcoded type switch
              if (node.type === "content") {
                const cNode = node as ContentNode;
                el = (
                  <ContentBlock
                    key={node.id}
                    node={cNode}
                    isSelected={selection.has(node.id)}
                    multiSelected={
                      selection.size > 1 &&
                      selection.has(node.id) &&
                      !engine.selectionIsSingleGroup()
                    }
                    engine={engine}
                    schema={schema}
                    interactive={mode === "select" || mode === "text" || mode === "note"}
                    zoom={viewport.zoom}
                    onMeasuredHeight={handleMeasuredHeight}
                    autoEdit={newlyCreatedContentIdRef.current === cNode.id}
                  />
                );
              } else if (node.type === "text") {
                el = (
                  <TextNodeBlock
                    key={node.id}
                    node={node as TextNode}
                    engine={engine}
                    editing={editingTextId === node.id}
                    editClickPos={editingTextId === node.id ? editClickRef.current : null}
                    onStopEdit={() => {
                      if (newlyCreatedTextRef.current === node.id) {
                        newlyCreatedTextRef.current = null;
                        const textNode = engine.getNode(node.id) as TextNode | undefined;
                        if (!textNode || !textNode.data.text.trim()) {
                          engine.deleteNode(node.id);
                          setEditingTextId(null);
                          return;
                        }
                        engine.pushHistorySnapshot();
                      }
                      setEditingTextId(null);
                    }}
                    onMeasuredHeight={handleMeasuredHeight}
                  />
                );
              } else if (node.type === "image") {
                el = (
                  <ImageBlock
                    key={node.id}
                    node={node as ImageNode}
                    isSelected={selection.has(node.id)}
                    engine={engine}
                    interactive={mode === "select"}
                    zoom={viewport.zoom}
                    onResizeHandleDown={handleResizeHandleDown}
                    cropping={croppingImageId === node.id}
                    onCropStart={() => setCroppingImageId(node.id)}
                    onCropEnd={() => setCroppingImageId(null)}
                  />
                );
              } else if (node.type === "sticky") {
                el = (
                  <StickyNoteBlock
                    key={node.id}
                    node={node as StickyNoteNode}
                    isSelected={selection.has(node.id)}
                    engine={engine}
                    interactive={mode === "select" || mode === "sticky"}
                    zoom={viewport.zoom}
                    editing={editingStickyId === node.id}
                    onEditStart={setEditingStickyId}
                    onEditEnd={() => setEditingStickyId(null)}
                  />
                );
              } else if (node.type === "frame") {
                const frameNode = node as FrameNode;
                const fh = frameNode.h === "auto" ? 100 : (frameNode.h as number);
                el = (
                  <div
                    key={node.id}
                    style={{
                      position: "absolute",
                      left: frameNode.x,
                      top: frameNode.y,
                      width: frameNode.w,
                      height: fh,
                      zIndex: frameNode.z,
                      background: frameNode.data.backgroundColor || "rgba(0,0,0,0.02)",
                      border: `${frameNode.data.borderWidth || 1}px ${frameNode.data.borderStyle || "dashed"} ${frameNode.data.borderColor || "#ccc"}`,
                      boxSizing: "border-box",
                      borderRadius: 8,
                      opacity: frameNode.data.opacity ?? 1,
                      pointerEvents: "none",
                      overflow: "visible",
                      transform: frameNode.rotation ? `rotate(${frameNode.rotation}deg)` : undefined,
                      transformOrigin: "center center",
                    }}
                  >
                    {editingFrameLabelId === node.id ? (
                      <input
                        autoFocus
                        defaultValue={frameNode.data.label ?? ""}
                        placeholder="Frame label..."
                        onBlur={(e) => {
                          const val = e.currentTarget.value.trim();
                          engine.updateNodeWithHistory(node.id, {
                            data: { ...frameNode.data, label: val || undefined },
                          } as Partial<FrameNode>);
                          setEditingFrameLabelId(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === "Escape") {
                            e.currentTarget.blur();
                          }
                          e.stopPropagation();
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        style={{
                          position: "absolute",
                          top: -24,
                          left: 0,
                          fontSize: 12,
                          color: frameNode.data.borderColor || "#999",
                          fontWeight: 500,
                          background: "rgba(255,255,255,0.95)",
                          border: "1px solid #3b82f6",
                          borderRadius: 4,
                          padding: "1px 4px",
                          outline: "none",
                          pointerEvents: "auto",
                          minWidth: 80,
                        }}
                      />
                    ) : frameNode.data.label ? (
                      <div
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          engine.select(node.id);
                          setEditingFrameLabelId(node.id);
                        }}
                        style={{
                          position: "absolute",
                          top: -20,
                          left: 4,
                          fontSize: 12,
                          color: frameNode.data.borderColor || "#999",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          userSelect: "none",
                          pointerEvents: "auto",
                          cursor: "default",
                        }}
                      >
                        {frameNode.data.label}
                      </div>
                    ) : null}
                  </div>
                );
              } else {
                const svgNode = node as DrawNode | ShapeNode;
                if (svgNode.type === "draw") {
                  el = <SVGNodeBlock key={node.id} node={svgNode} />;
                } else {
                  el = <SVGNodeBlock key={node.id} node={svgNode} editingLabel={editingShapeLabelId === node.id} />;
                }
              }
            }

            if (isEraserMarked) {
              return (
                <div key={node.id} style={{ opacity: 0.25, filter: "saturate(0)" }}>
                  {el}
                </div>
              );
            }
            return el;
          })}

        {/* Hover overlay removed — precise hit-testing makes visual hover feedback unnecessary */}

        {/* Shape label editor — separate component so it can use a cleanup effect
            to commit the label even when the selection handler unmounts it before blur fires */}
        {editingShapeLabelId && (() => {
          const labelNode = engine.getNode(editingShapeLabelId);
          if (!labelNode || labelNode.type !== "shape") return null;
          const shapeData = (labelNode as ShapeNode).data;
          const isLinear = shapeData.shape === "line" || shapeData.shape === "arrow";
          if (isLinear) return null;
          return (
            <ShapeLabelEditor
              key={editingShapeLabelId}
              node={labelNode as ShapeNode}
              engine={engine}
              onDone={() => setEditingShapeLabelId(null)}
            />
          );
        })()}

      </div>

      <SVGLayer
        nodes={svgLayerNodes}
        viewport={viewport}
        selection={selection}
        measuredHeights={measuredHeights}
        activeStroke={activeStroke}
        shapePreview={shapePreview}
        shapePreviewStyle={
          shapePreview
            ? {
              stroke: engine.mode === "frame" ? "#1e1e2e" : engine.activeTool.color,
              strokeWidth: engine.mode === "frame" ? 1 : engine.activeTool.width,
              roughness: engine.mode === "frame" ? 0 : (engine.activeTool.roughness ?? 1),
              shapeType: engine.mode === "frame" ? "rect" : (engine.activeTool.shapeType || "rect"),
            }
            : null
        }
        onResizeHandleDown={handleResizeHandleDown}
        onRotateStart={handleRotateStart}
        onConnectionHandleDown={handleConnectionHandleDown}
        onEdgeEndpointDown={handleEdgeEndpointDown}
        onKinkHandleDown={handleKinkHandleDown}
        edgePreview={edgePreview}
        edgeReconnect={edgeReconnect}
        eraserMarkedIds={eraserMarkedIds.size > 0 ? eraserMarkedIds : undefined}
        eraserTrail={eraserTrail.length > 1 ? eraserTrail : undefined}
        laserTrail={laserTrail.length > 1 ? laserTrail : undefined}
        mode={mode}
        hoveredNodeId={hoveredNodeId}
        registry={registry}
        onPortHandleDown={handlePortHandleDown}
        cycleNodeIds={dataFlow && dataFlowVersion >= 0 ? dataFlow.cycleNodeIds : undefined}
        containerTypes={engine.containerTypes}
        alignGuides={alignGuides}
      />

      {/* Unified multi-selection bounding box */}
      {selBounds && (() => {
        // Check for persisted group rotation
        const singleGroupId = engine.selectionGroupId();
        const storedRot = singleGroupId ? engine.groupRotations.get(singleGroupId) : undefined;

        // During rotation drag use frozen bounds; for persisted group rotation
        // compute unrotated bounds; otherwise use live selBounds
        let b: { x: number; y: number; w: number; h: number };
        let rotAngle: number;
        let rotCx: number;
        let rotCy: number;

        if (groupRotation) {
          b = groupRotation.bounds;
          rotAngle = groupRotation.angle;
          rotCx = groupRotation.cx;
          rotCy = groupRotation.cy;
        } else if (storedRot && storedRot.angle !== 0) {
          // Reverse-rotate node centers to compute unrotated bounding box
          const rad = (-storedRot.angle * Math.PI) / 180;
          const cos = Math.cos(rad);
          const sin = Math.sin(rad);
          let fMinX = Infinity, fMinY = Infinity, fMaxX = -Infinity, fMaxY = -Infinity;
          for (const id of engine.selection) {
            const n = engine.getNode(id);
            if (!n || n.type === "edge") continue;
            const h = n.h === "auto" ? (measuredHeights[n.id] ?? 100) : (n.h as number);
            const ncx = n.x + n.w / 2;
            const ncy = n.y + h / 2;
            const dx = ncx - storedRot.cx;
            const dy = ncy - storedRot.cy;
            const ux = storedRot.cx + dx * cos - dy * sin;
            const uy = storedRot.cy + dx * sin + dy * cos;
            fMinX = Math.min(fMinX, ux - n.w / 2);
            fMinY = Math.min(fMinY, uy - h / 2);
            fMaxX = Math.max(fMaxX, ux + n.w / 2);
            fMaxY = Math.max(fMaxY, uy + h / 2);
          }
          b = {
            x: fMinX - SEL_PAD,
            y: fMinY - SEL_PAD,
            w: fMaxX - fMinX + SEL_PAD * 2,
            h: fMaxY - fMinY + SEL_PAD * 2,
          };
          rotAngle = storedRot.angle;
          rotCx = storedRot.cx;
          rotCy = storedRot.cy;
        } else {
          b = selBounds;
          rotAngle = 0;
          rotCx = 0;
          rotCy = 0;
        }

        const handleSize = 8 / viewport.zoom;
        const half = handleSize / 2;
        const handles: { pos: HandlePosition; cx: number; cy: number }[] = [
          { pos: "nw", cx: b.x, cy: b.y },
          { pos: "n", cx: b.x + b.w / 2, cy: b.y },
          { pos: "ne", cx: b.x + b.w, cy: b.y },
          { pos: "e", cx: b.x + b.w, cy: b.y + b.h / 2 },
          { pos: "se", cx: b.x + b.w, cy: b.y + b.h },
          { pos: "s", cx: b.x + b.w / 2, cy: b.y + b.h },
          { pos: "sw", cx: b.x, cy: b.y + b.h },
          { pos: "w", cx: b.x, cy: b.y + b.h / 2 },
        ];
        const rotateTransform = rotAngle !== 0
          ? ` rotate(${rotAngle}, ${rotCx}, ${rotCy})`
          : "";
        return (
          <svg
            data-sb-overlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <g transform={`translate(${viewport.x}, ${viewport.y}) scale(${viewport.zoom})`}>
              <g transform={rotateTransform}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth={1.5 / viewport.zoom}
                />
                {rotAngle === 0 && handles.map(({ pos, cx, cy }) => (
                  <rect
                    key={pos}
                    x={cx - half}
                    y={cy - half}
                    width={handleSize}
                    height={handleSize}
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth={1.5 / viewport.zoom}
                    style={{ cursor: getRotatedCursor(pos, rotAngle), pointerEvents: "auto" }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      handleUnifiedResizeDown(pos, e);
                    }}
                  />
                ))}
                {/* Rotation handle */}
                {(() => {
                  const rotateGap = 25 / viewport.zoom;
                  const topCx = b.x + b.w / 2;
                  const topCy = b.y;
                  return (
                    <>
                      <line
                        x1={topCx}
                        y1={topCy}
                        x2={topCx}
                        y2={topCy - rotateGap}
                        stroke="#3b82f6"
                        strokeWidth={1.5 / viewport.zoom}
                        style={{ pointerEvents: "none" }}
                      />
                      {(() => {
                        const rotateSize = 8 / viewport.zoom;
                        const rotateHalf = rotateSize / 2;
                        return (
                          <rect
                            x={topCx - rotateHalf}
                            y={topCy - rotateGap - rotateHalf}
                            width={rotateSize}
                            height={rotateSize}
                            rx={1.5 / viewport.zoom}
                            transform={`rotate(45, ${topCx}, ${topCy - rotateGap})`}
                            fill="white"
                            stroke="#3b82f6"
                            strokeWidth={1.5 / viewport.zoom}
                            style={{ cursor: "grab", pointerEvents: "auto" }}
                            onPointerDown={(e) => handleUnifiedRotateDown(e)}
                          />
                        );
                      })()}
                    </>
                  );
                })()}
                {/* Connection handles on bounding box */}
                {(() => {
                  const connOffset = 26 / viewport.zoom;
                  const connTopOffset = 42 / viewport.zoom; // extra clearance past rotation handle
                  const connR = 4 / viewport.zoom;
                  const sides: { side: HandleSide; cx: number; cy: number }[] = [
                    { side: "top", cx: b.x + b.w / 2, cy: b.y - connTopOffset },
                    { side: "right", cx: b.x + b.w + connOffset, cy: b.y + b.h / 2 },
                    { side: "bottom", cx: b.x + b.w / 2, cy: b.y + b.h + connOffset },
                    { side: "left", cx: b.x - connOffset, cy: b.y + b.h / 2 },
                  ];
                  return sides.map(({ side, cx, cy }) => (
                    <circle
                      key={`conn-${side}`}
                      cx={cx}
                      cy={cy}
                      r={connR}
                      fill="white"
                      stroke="#94a3b8"
                      strokeWidth={1.5 / viewport.zoom}
                      opacity={0.8}
                      style={{ cursor: "crosshair", pointerEvents: "auto" }}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        const nodeId = findNearestNodeForSide(side);
                        if (nodeId) {
                          handleConnectionHandleDown(nodeId, side, e as unknown as React.PointerEvent<SVGCircleElement>);
                        }
                      }}
                    />
                  ));
                })()}
              </g>
            </g>
          </svg>
        );
      })()}

      {/* Active group indicator — dashed indigo border around the entered group */}
      {activeGroupBounds && (
        <svg
          data-sb-overlay
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <g transform={`translate(${viewport.x}, ${viewport.y}) scale(${viewport.zoom})`}>
            <rect
              x={activeGroupBounds.x}
              y={activeGroupBounds.y}
              width={activeGroupBounds.w}
              height={activeGroupBounds.h}
              fill="none"
              stroke="#6366f1"
              strokeWidth={1.5 / viewport.zoom}
              strokeDasharray={`${5 / viewport.zoom} ${3 / viewport.zoom}`}
              rx={4 / viewport.zoom}
              opacity={0.5}
            />
          </g>
        </svg>
      )}

      {/* Marquee selection preview — screen coords so it tracks cursor and doesn't scale with zoom */}
      {selectionRect && (() => {
        const s1 = engine.canvasToScreen(selectionRect.startX, selectionRect.startY);
        const s2 = engine.canvasToScreen(selectionRect.endX, selectionRect.endY);
        const x = Math.min(s1.x, s2.x);
        const y = Math.min(s1.y, s2.y);
        const w = Math.abs(s2.x - s1.x);
        const h = Math.abs(s2.y - s1.y);
        if (w < 2 && h < 2) return null;
        return (
          <svg
            data-sb-overlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill="rgba(59,130,246,0.08)"
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeDasharray="4"
            />
          </svg>
        );
      })()}

      {/* Lasso selection preview — screen coords polygon */}
      {lassoPoints && lassoPoints.length > 2 && (() => {
        const screenPts = lassoPoints.map(([x, y]) => engine.canvasToScreen(x, y));
        const pointsStr = screenPts.map(p => `${p.x},${p.y}`).join(" ");
        return (
          <svg
            data-sb-overlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <polygon
              points={pointsStr}
              fill="rgba(59,130,246,0.08)"
              stroke="#3b82f6"
              strokeWidth={1.5}
              strokeDasharray="4"
            />
          </svg>
        );
      })()}

      {/* Text block drag preview */}
      {textPreview && (() => {
        const x = Math.min(textPreview.startX, textPreview.endX);
        const y = Math.min(textPreview.startY, textPreview.endY);
        const w = Math.abs(textPreview.endX - textPreview.startX);
        const h = Math.abs(textPreview.endY - textPreview.startY);
        if (w < 2 && h < 2) return null;
        return (
          <svg
            data-sb-overlay
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <g transform={`translate(${viewport.x}, ${viewport.y}) scale(${viewport.zoom})`}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                fill="rgba(59,130,246,0.06)"
                stroke="#3b82f6"
                strokeWidth={1.5 / viewport.zoom}
                strokeDasharray={`${4 / viewport.zoom}`}
                rx={8 / viewport.zoom}
              />
            </g>
          </svg>
        );
      })()}

      {/* Right-click context menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          sections={contextMenu.sections}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Personal library name prompt */}
      {personalLibPrompt && (
        <PersonalLibraryPrompt
          nodes={personalLibPrompt.nodes}
          onSave={(name) => {
            addPersonalItem(name, personalLibPrompt.nodes, personalLibPrompt.groupParent);
            setPersonalLibPrompt(null);
          }}
          onCancel={() => setPersonalLibPrompt(null)}
        />
      )}
    </div>
  );
}
