import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { SpatialEngine } from "../engine/SpatialEngine";
import { usePropertyHistorySession } from "./sidebar/PropertyHistoryCoalesceContext";
import type { SpatialNode, Mode, ShapeNode, DrawNode, TextNode, EdgeNode, ImageNode, BlockNoteNode, FrameNode, StickyNoteNode } from "../engine/types";
import type { NodeTypeRegistry } from "../nodes/registry";
import { getFontFamilyCSS, DEFAULT_FONT } from "../fonts";
import FontPicker from "./FontPicker";

const STROKE_COLORS = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6",
];

const FILL_COLORS = [
  null, // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6",
];

const FILL_STYLES: { key: ShapeNode["data"]["fillStyle"]; label: string }[] = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" },
];

const STROKE_STYLES: {
  key: NonNullable<ShapeNode["data"]["strokeStyle"]>;
  label: string;
  dash: string;
}[] = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" },
];

const ROUGHNESS_LEVELS: { value: number; label: string }[] = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" },
];

const WIDTHS = [1, 2.5, 5, 10, 20];

const SHAPE_TYPES: { key: string; label: string }[] = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" },
];

const FONT_SIZES = [14, 20, 28, 36];

const TEXT_ALIGNS: { key: "left" | "center" | "right"; label: string }[] = [
  { key: "left", label: "\u2190" },
  { key: "center", label: "\u2194" },
  { key: "right", label: "\u2192" },
];

const PANEL_WIDTH = 300;

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const labelStyle: React.CSSProperties = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0,
};

const btnBase: React.CSSProperties = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0,
};

type PanelTarget =
  | { kind: "tool" }
  | { kind: "shape"; node: ShapeNode }
  | { kind: "draw"; node: DrawNode }
  | { kind: "text"; node: TextNode }
  | { kind: "edge"; node: EdgeNode }
  | { kind: "image"; node: ImageNode }
  | { kind: "blocknote"; node: BlockNoteNode }
  | { kind: "frame"; node: FrameNode }
  | { kind: "sticky"; node: StickyNoteNode }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { kind: "custom"; node: SpatialNode; PanelComponent: React.ComponentType<any> };

export default function PropertiesPanel({
  engine,
  registry,
}: {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
}) {
  const [mode, setMode] = useState<Mode>(engine.mode);
  const [selection, setSelection] = useState<Set<string>>(engine.selection);
  const [, forceUpdate] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; startLeft: number; startTop: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getDefaultPosition = useCallback(() => {
    const win = panelRef.current?.ownerDocument.defaultView ?? window;
    return { x: win.innerWidth - PANEL_WIDTH - 12, y: 12 };
  }, []);

  const panelPos = position ?? getDefaultPosition();

  useEffect(() => {
    const onMode = () => setMode(engine.mode);
    const onSelection = () => {
      setSelection(new Set(engine.selection));
      forceUpdate((n) => n + 1);
    };
    const onChange = () => forceUpdate((n) => n + 1);
    engine.on("mode", onMode);
    engine.on("selection", onSelection);
    engine.on("change", onChange);
    return () => {
      engine.off("mode", onMode);
      engine.off("selection", onSelection);
      engine.off("change", onChange);
    };
  }, [engine]);

  const handleDragPointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    const left = position ? position.x : getDefaultPosition().x;
    const top = position ? position.y : getDefaultPosition().y;
    dragRef.current = { startX: e.clientX, startY: e.clientY, startLeft: left, startTop: top };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [position, getDefaultPosition]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const win = panelRef.current?.ownerDocument.defaultView ?? window;
      const newX = Math.max(48, Math.min(win.innerWidth - PANEL_WIDTH - 8, dragRef.current.startLeft + dx));
      const newY = Math.max(8, Math.min(win.innerHeight - 100, dragRef.current.startTop + dy));
      setPosition({ x: newX, y: newY });
    };
    const handleUp = () => {
      dragRef.current = null;
      setIsDragging(false);
    };
    const doc = panelRef.current?.ownerDocument ?? document;
    doc.addEventListener("pointermove", handleMove);
    doc.addEventListener("pointerup", handleUp);
    doc.addEventListener("pointercancel", handleUp);
    return () => {
      doc.removeEventListener("pointermove", handleMove);
      doc.removeEventListener("pointerup", handleUp);
      doc.removeEventListener("pointercancel", handleUp);
    };
  }, []);

  const stableSelectionId = useMemo(() => {
    if (selection.size === 1) return Array.from(selection)[0];
    if (mode === "draw" || mode === "shape" || mode === "text" || mode === "edge") {
      return "tool";
    }
    return "none";
  }, [selection, mode]);

  const getCoalesceKey = usePropertyHistorySession(engine, stableSelectionId);

  // Determine what to show/edit
  const target: PanelTarget | null = (() => {
    if (selection.size === 1) {
      const nodeId = Array.from(selection)[0];
      const node = engine.getNode(nodeId);
      if (node?.type === "shape") return { kind: "shape", node: node as ShapeNode };
      if (node?.type === "draw") return { kind: "draw", node: node as DrawNode };
      if (node?.type === "text") return { kind: "text", node: node as TextNode };
      if (node?.type === "edge") return { kind: "edge", node: node as EdgeNode };
      if (node?.type === "image") return { kind: "image", node: node as ImageNode };
      if (node?.type === "blocknote") return { kind: "blocknote", node: node as BlockNoteNode };
      if (node?.type === "frame") return { kind: "frame", node: node as FrameNode };
      if (node?.type === "sticky") return { kind: "sticky", node: node as StickyNoteNode };
      // Check registry for custom node types with a properties panel
      if (node && registry) {
        const def = registry.get(node.type);
        if (def?.propertiesPanel) {
          return { kind: "custom", node, PanelComponent: def.propertiesPanel };
        }
      }
    }
    if (mode === "draw" || mode === "shape" || mode === "text" || mode === "edge") return { kind: "tool" };
    return null;
  })();

  // All hooks must be called unconditionally (before any returns)
  const updateShape = useCallback(
    (patch: Partial<ShapeNode["data"]>) => {
      if (!target || target.kind !== "shape") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...target.node.data, ...patch },
        } as Partial<ShapeNode>,
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  const updateDraw = useCallback(
    (patch: Partial<DrawNode["data"]>) => {
      if (!target || target.kind !== "draw") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...target.node.data, ...patch },
        } as Partial<DrawNode>,
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  const updateText = useCallback(
    (patch: Partial<TextNode["data"]>) => {
      if (!target || target.kind !== "text") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...target.node.data, ...patch },
        } as Partial<TextNode>,
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  const updateEdge = useCallback(
    (patch: Partial<EdgeNode["data"]>) => {
      if (!target || target.kind !== "edge") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...target.node.data, ...patch },
        } as Partial<EdgeNode>,
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  const updateImage = useCallback(
    (patch: Partial<ImageNode["data"]>) => {
      if (!target || target.kind !== "image") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...target.node.data, ...patch },
        } as Partial<ImageNode>,
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  const updateContent = useCallback(
    (patch: Partial<BlockNoteNode["data"]>) => {
      if (!target || target.kind !== "blocknote") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...target.node.data, ...patch },
        } as Partial<BlockNoteNode>,
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  const updateFrame = useCallback(
    (patch: Partial<FrameNode["data"]>) => {
      if (!target || target.kind !== "frame") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...target.node.data, ...patch },
        } as Partial<FrameNode>,
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  const updateSticky = useCallback(
    (patch: Partial<StickyNoteNode["data"]>) => {
      if (!target || target.kind !== "sticky") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...target.node.data, ...patch },
        } as Partial<StickyNoteNode>,
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  const updateCustomData = useCallback(
    (patch: Record<string, unknown>) => {
      if (!target || target.kind !== "custom") return;
      const k = getCoalesceKey();
      engine.updateNodeWithHistoryCoalesced(
        target.node.id,
        {
          data: { ...(target.node.data as Record<string, unknown>), ...patch },
        },
        k,
      );
    },
    [engine, target, getCoalesceKey]
  );

  if (!target) return null;

  // Read current values
  const isCustom = target.kind === "custom";
  const isShape = target.kind === "shape";
  const isDraw = target.kind === "draw";
  const isText = target.kind === "text";
  const isEdge = target.kind === "edge";
  const isImage = target.kind === "image";
  const isContent = target.kind === "blocknote";
  const isFrame = target.kind === "frame";
  const isSticky = target.kind === "sticky";
  const isTool = target.kind === "tool";
  const isShapeMode = isTool && mode === "shape";
  const isTextMode = isTool && mode === "text";

  // Text-specific values
  const fontFamily = isText
    ? target.node.data.fontFamily
    : engine.activeTool.fontFamily ?? DEFAULT_FONT;
  const fontSize = isText
    ? target.node.data.fontSize
    : engine.activeTool.fontSize ?? 20;
  const textAlign = isText
    ? target.node.data.align
    : engine.activeTool.textAlign ?? "left";
  const textColor = isText
    ? target.node.data.color
    : engine.activeTool.color;

  // Draw/Shape values
  const strokeColor = isShape
    ? target.node.data.stroke
    : isDraw
    ? target.node.data.color
    : engine.activeTool.color;

  const fillColor = isShape
    ? target.node.data.fill ?? null
    : isDraw
    ? target.node.data.fill ?? null
    : engine.activeTool.fillColor ?? null;

  const fillStyle = isShape
    ? target.node.data.fillStyle ?? "hachure"
    : isDraw
    ? target.node.data.fillStyle ?? "hachure"
    : engine.activeTool.fillStyle ?? "hachure";

  const strokeStyle = isShape
    ? target.node.data.strokeStyle ?? "solid"
    : isDraw
    ? target.node.data.strokeStyle ?? "solid"
    : engine.activeTool.strokeStyle ?? "solid";

  const strokeWidth = isShape
    ? target.node.data.strokeWidth
    : isDraw
    ? target.node.data.strokeWidth
    : engine.activeTool.width;

  const roughness = isShape
    ? target.node.data.roughness
    : engine.activeTool.roughness ?? 1;

  const opacity = isShape
    ? target.node.data.opacity ?? 1
    : isDraw
    ? target.node.data.opacity ?? 1
    : isText
    ? target.node.data.opacity ?? 1
    : isImage
    ? target.node.data.opacity ?? 1
    : isContent
    ? target.node.data.opacity ?? 1
    : isFrame
    ? target.node.data.opacity ?? 1
    : isSticky
    ? target.node.data.opacity ?? 1
    : engine.activeTool.opacity ?? 1;

  // Fonts used by text nodes in the current board (for FontPicker "In this scene")
  const fontsInScene = (() => {
    const seen = new Set<string>();
    const fonts: string[] = [];
    for (const node of engine.getAllNodes()) {
      if (node.type === "text") {
        const f = (node as TextNode).data.fontFamily;
        if (f && !seen.has(f)) {
          seen.add(f);
          fonts.push(f);
        }
      }
    }
    return fonts;
  })();

  const showDrawShapeProps = !isText && !isTextMode && !isEdge && !isImage && !isContent && !isFrame && !isSticky && !isCustom;
  const showFill = showDrawShapeProps;
  const showStrokeStyle = showDrawShapeProps;
  const showRoughness = isShape || isShapeMode;
  const showTextProps = isText || isTextMode;

  const setStrokeColor = (c: string) => {
    if (isShape) updateShape({ stroke: c });
    else if (isDraw) updateDraw({ color: c });
    else {
      engine.activeTool.color = c;
      forceUpdate((n) => n + 1);
    }
  };

  const setFillColor = (c: string | null) => {
    if (isShape) updateShape({ fill: c ?? undefined });
    else if (isDraw) updateDraw({ fill: c ?? undefined });
    else {
      engine.activeTool.fillColor = c ?? undefined;
      forceUpdate((n) => n + 1);
    }
  };

  const setFillStyle = (s: ShapeNode["data"]["fillStyle"]) => {
    if (isShape) updateShape({ fillStyle: s });
    else if (isDraw) updateDraw({ fillStyle: s });
    else {
      engine.activeTool.fillStyle = s;
      forceUpdate((n) => n + 1);
    }
  };

  const setStrokeStyle = (s: NonNullable<ShapeNode["data"]["strokeStyle"]>) => {
    if (isShape) updateShape({ strokeStyle: s });
    else if (isDraw) updateDraw({ strokeStyle: s });
    else {
      engine.activeTool.strokeStyle = s;
      forceUpdate((n) => n + 1);
    }
  };

  const setStrokeWidth = (w: number) => {
    if (isShape) updateShape({ strokeWidth: w });
    else if (isDraw) updateDraw({ strokeWidth: w });
    else {
      engine.activeTool.width = w;
      forceUpdate((n) => n + 1);
    }
  };

  const setRoughness = (r: number) => {
    if (isShape) updateShape({ roughness: r });
    else {
      engine.activeTool.roughness = r;
      forceUpdate((n) => n + 1);
    }
  };

  const setOpacity = (o: number) => {
    if (isShape) updateShape({ opacity: o });
    else if (isDraw) updateDraw({ opacity: o });
    else if (isText) updateText({ opacity: o });
    else if (isImage) updateImage({ opacity: o });
    else if (isContent) updateContent({ opacity: o });
    else if (isFrame) updateFrame({ opacity: o });
    else if (isSticky) updateSticky({ opacity: o });
    else {
      engine.activeTool.opacity = o;
      forceUpdate((n) => n + 1);
    }
  };

  const setFontFamily = (f: string) => {
    if (isText) updateText({ fontFamily: f });
    else {
      engine.activeTool.fontFamily = f;
      forceUpdate((n) => n + 1);
    }
  };

  const setFontSize = (s: number) => {
    if (isText) updateText({ fontSize: s });
    else {
      engine.activeTool.fontSize = s;
      forceUpdate((n) => n + 1);
    }
  };

  const setTextAlign = (a: "left" | "center" | "right") => {
    if (isText) updateText({ align: a });
    else {
      engine.activeTool.textAlign = a;
      forceUpdate((n) => n + 1);
    }
  };

  const setTextColor = (c: string) => {
    if (isText) updateText({ color: c });
    else {
      engine.activeTool.color = c;
      forceUpdate((n) => n + 1);
    }
  };

  const panelStyle: React.CSSProperties = {
    position: "fixed",
    left: panelPos.x,
    top: panelPos.y,
    width: PANEL_WIDTH,
    background: "#1e1e2e",
    borderRadius: 12,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 99,
    color: "white",
    fontSize: 11,
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
  };

  return (
    <div
      ref={panelRef}
      data-sb-props-panel
      style={panelStyle}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Drag handle */}
      <div
        onPointerDown={handleDragPointerDown}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          margin: "-12px -16px 8px -16px",
          padding: "8px 16px",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
          borderBottom: "1px solid #333",
          color: "#999",
          fontSize: 10,
        }}
      >
        <span style={{ fontWeight: 600, letterSpacing: "0.02em", color: "white" }}>Inspector</span>
      </div>
      {/* Text-specific properties */}
      {showTextProps && (
        <>
          {/* Font family */}
          <div style={rowStyle}>
            <span style={labelStyle}>Font</span>
            <FontPicker
              value={fontFamily}
              onChange={setFontFamily}
              fontsInScene={fontsInScene}
            />
          </div>

          {/* Font size */}
          <div style={rowStyle}>
            <span style={labelStyle}>Size</span>
            {FONT_SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 28,
                  background: fontSize === s ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Text align */}
          <div style={rowStyle}>
            <span style={labelStyle}>Align</span>
            {TEXT_ALIGNS.map((a) => (
              <button
                key={a.key}
                title={a.key}
                onClick={() => setTextAlign(a.key)}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 28,
                  background: textAlign === a.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6,
                }}
              >
                {a.label}
              </button>
            ))}
          </div>

          {/* Text color */}
          <div style={rowStyle}>
            <span style={labelStyle}>Color</span>
            {STROKE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setTextColor(c)}
                style={{
                  ...btnBase,
                  width: 20,
                  height: 20,
                  background: c,
                  border: textColor === c ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>

          {/* Border (only when editing a text node, not in text tool mode) */}
          {isText && (
            <div style={rowStyle}>
              <span style={labelStyle}>Border</span>
              {[null, ...STROKE_COLORS].map((c, i) => (
                <button
                  key={c ?? "none"}
                  onClick={() => updateText({ borderColor: c ?? undefined })}
                  style={{
                    ...btnBase,
                    width: 20,
                    height: 20,
                    background: c ?? "transparent",
                    border:
                      ((target as { node: TextNode }).node.data.borderColor ?? null) === c
                        ? "2px solid white"
                        : `2px solid ${i === 0 ? "#555" : "transparent"}`,
                    borderRadius: "50%",
                    position: "relative" as const,
                    overflow: "hidden" as const,
                  }}
                >
                  {i === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        width: 2,
                        height: 24,
                        background: "#e74c3c",
                        transform: "rotate(45deg)",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Border style (only when border is set on text node) */}
          {isText && (target as { node: TextNode }).node.data.borderColor && (
            <div style={rowStyle}>
              <span style={labelStyle}>Style</span>
              {STROKE_STYLES.map((s) => (
                <button
                  key={s.key}
                  title={s.label}
                  onClick={() => updateText({ borderStyle: s.key })}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 28,
                    background:
                      ((target as { node: TextNode }).node.data.borderStyle ?? "solid") === s.key
                        ? "#3b82f6"
                        : "#2a2a3e",
                    borderRadius: 6,
                  }}
                >
                  <svg width={24} height={12}>
                    <line
                      x1={2} y1={6} x2={22} y2={6}
                      stroke="white" strokeWidth={2}
                      strokeDasharray={s.dash}
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Border width (only when border is set on text node) */}
          {isText && (target as { node: TextNode }).node.data.borderColor && (
            <div style={rowStyle}>
              <span style={labelStyle}>Width</span>
              {WIDTHS.map((w) => (
                <button
                  key={w}
                  title={`${w}px`}
                  onClick={() => updateText({ borderWidth: w })}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 24,
                    background:
                      ((target as { node: TextNode }).node.data.borderWidth ?? 1) === w
                        ? "#3b82f6"
                        : "#2a2a3e",
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: Math.max(w, 1),
                      background: "white",
                      borderRadius: w / 2,
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Draw/Shape properties */}
      {showDrawShapeProps && (
        <>
          {/* Shape type (only in shape mode) */}
          {isShapeMode && (
            <div style={rowStyle}>
              <span style={labelStyle}>Shape</span>
              {SHAPE_TYPES.map((t) => (
                <button
                  key={t.key}
                  title={t.label}
                  onClick={() => {
                    engine.activeTool.shapeType = t.key as "rect" | "ellipse" | "diamond" | "line" | "arrow";
                    forceUpdate((n) => n + 1);
                  }}
                  style={{
                    ...btnBase,
                    width: 28,
                    height: 28,
                    background:
                      (engine.activeTool.shapeType ?? "rect") === t.key
                        ? "#3b82f6"
                        : "#2a2a3e",
                    color: "white",
                    borderRadius: 6,
                  }}
                >
                  <ShapeTypeIcon name={t.key} />
                </button>
              ))}
            </div>
          )}

          {/* Stroke color */}
          <div style={rowStyle}>
            <span style={labelStyle}>Stroke</span>
            {STROKE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setStrokeColor(c)}
                style={{
                  ...btnBase,
                  width: 20,
                  height: 20,
                  background: c,
                  border: strokeColor === c ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>

          {/* Fill color */}
          {showFill && (
            <div style={rowStyle}>
              <span style={labelStyle}>Fill</span>
              {FILL_COLORS.map((c, i) => (
                <button
                  key={c ?? "none"}
                  onClick={() => setFillColor(c)}
                  style={{
                    ...btnBase,
                    width: 20,
                    height: 20,
                    background: c ?? "transparent",
                    border:
                      fillColor === c
                        ? "2px solid white"
                        : `2px solid ${i === 0 ? "#555" : "transparent"}`,
                    borderRadius: "50%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {i === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        width: "140%",
                        height: 2,
                        background: "#e74c3c",
                        transform: "rotate(-45deg)",
                        top: "50%",
                        left: "-20%",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Fill style (only when fill is set) */}
          {showFill && fillColor && (
            <div style={rowStyle}>
              <span style={labelStyle}>Fill pattern</span>
              {FILL_STYLES.map((f) => (
                <button
                  key={f.key}
                  title={f.label}
                  onClick={() => setFillStyle(f.key)}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 28,
                    background: fillStyle === f.key ? "#3b82f6" : "#2a2a3e",
                    color: "white",
                    fontSize: 9,
                    borderRadius: 6,
                  }}
                >
                  <FillIcon style={f.key!} />
                </button>
              ))}
            </div>
          )}

          {/* Stroke style */}
          {showStrokeStyle && (
            <div style={rowStyle}>
              <span style={labelStyle}>Stroke style</span>
              {STROKE_STYLES.map((s) => (
                <button
                  key={s.key}
                  title={s.label}
                  onClick={() => setStrokeStyle(s.key)}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 28,
                    background: strokeStyle === s.key ? "#3b82f6" : "#2a2a3e",
                    borderRadius: 6,
                  }}
                >
                  <svg width={24} height={12}>
                    <line
                      x1={2}
                      y1={6}
                      x2={22}
                      y2={6}
                      stroke="white"
                      strokeWidth={2}
                      strokeDasharray={s.dash}
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Stroke width */}
          <div style={rowStyle}>
            <span style={labelStyle}>Stroke width</span>
            {WIDTHS.map((w) => (
              <button
                key={w}
                title={`${w}px`}
                onClick={() => setStrokeWidth(w)}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 24,
                  background: strokeWidth === w ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: Math.max(w, 1),
                    background: "white",
                    borderRadius: w / 2,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Roughness */}
          {showRoughness && (
            <div style={rowStyle}>
              <span style={labelStyle}>Roughness</span>
              {ROUGHNESS_LEVELS.map((r) => (
                <button
                  key={r.value}
                  title={r.label}
                  onClick={() => setRoughness(r.value)}
                  style={{
                    ...btnBase,
                    height: 28,
                    padding: "0 8px",
                    background: roughness === r.value ? "#3b82f6" : "#2a2a3e",
                    color: "white",
                    fontSize: 9,
                    borderRadius: 6,
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Edge properties */}
      {isEdge && (
        <>
          {/* Edge color */}
          <div style={rowStyle}>
            <span style={labelStyle}>Color</span>
            {STROKE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => updateEdge({ color: c })}
                style={{
                  ...btnBase,
                  width: 20,
                  height: 20,
                  background: c,
                  border:
                    target.node.data.color === c
                      ? "2px solid white"
                      : "2px solid transparent",
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>

          {/* Edge line style */}
          <div style={rowStyle}>
            <span style={labelStyle}>Style</span>
            {STROKE_STYLES.map((s) => (
              <button
                key={s.key}
                title={s.label}
                onClick={() => updateEdge({ style: s.key })}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 28,
                  background:
                    target.node.data.style === s.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                }}
              >
                <svg width={24} height={12}>
                  <line
                    x1={2} y1={6} x2={22} y2={6}
                    stroke="white" strokeWidth={2}
                    strokeDasharray={s.dash}
                  />
                </svg>
              </button>
            ))}
          </div>

          {/* Edge stroke width */}
          <div style={rowStyle}>
            <span style={labelStyle}>Width</span>
            {WIDTHS.map((w) => (
              <button
                key={w}
                title={`${w}px`}
                onClick={() => updateEdge({ strokeWidth: w })}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 24,
                  background:
                    target.node.data.strokeWidth === w ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: Math.max(w, 1),
                    background: "white",
                    borderRadius: w / 2,
                  }}
                />
              </button>
            ))}
          </div>

          {/* Arrow head */}
          <div style={rowStyle}>
            <span style={labelStyle}>Head</span>
            {(["none", "arrow", "filled", "dot"] as const).map((v) => (
              <button
                key={v}
                onClick={() => updateEdge({ arrowHead: v })}
                style={{
                  ...btnBase,
                  height: 28,
                  padding: "0 8px",
                  background:
                    (target.node.data.arrowHead ?? "none") === v
                      ? "#3b82f6"
                      : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6,
                }}
              >
                {v === "none" ? "None" : v === "arrow" ? "\u25B7" : v === "filled" ? "\u25B6" : "\u25CF"}
              </button>
            ))}
          </div>
          {(target.node.data.arrowHead ?? "none") !== "none" && (
            <div style={rowStyle}>
              <span style={labelStyle}>Head size</span>
              <input
                type="range"
                min={4}
                max={40}
                step={1}
                value={target.node.data.arrowHeadSize ?? Math.max(8, target.node.data.strokeWidth * 3)}
                onChange={(e) => updateEdge({ arrowHeadSize: Number(e.target.value) })}
                style={{ flex: 1 }}
              />
              <span style={{ color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }}>
                {target.node.data.arrowHeadSize ?? Math.max(8, target.node.data.strokeWidth * 3)}
              </span>
            </div>
          )}

          {/* Arrow tail */}
          <div style={rowStyle}>
            <span style={labelStyle}>Tail</span>
            {(["none", "arrow", "filled", "dot"] as const).map((v) => (
              <button
                key={v}
                onClick={() => updateEdge({ arrowTail: v })}
                style={{
                  ...btnBase,
                  height: 28,
                  padding: "0 8px",
                  background:
                    (target.node.data.arrowTail ?? "none") === v
                      ? "#3b82f6"
                      : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6,
                }}
              >
                {v === "none" ? "None" : v === "arrow" ? "\u25C1" : v === "filled" ? "\u25C0" : "\u25CF"}
              </button>
            ))}
          </div>
          {(target.node.data.arrowTail ?? "none") !== "none" && (
            <div style={rowStyle}>
              <span style={labelStyle}>Tail size</span>
              <input
                type="range"
                min={4}
                max={40}
                step={1}
                value={target.node.data.arrowTailSize ?? Math.max(8, target.node.data.strokeWidth * 3)}
                onChange={(e) => updateEdge({ arrowTailSize: Number(e.target.value) })}
                style={{ flex: 1 }}
              />
              <span style={{ color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }}>
                {target.node.data.arrowTailSize ?? Math.max(8, target.node.data.strokeWidth * 3)}
              </span>
            </div>
          )}

          {/* Label */}
          <div style={rowStyle}>
            <span style={labelStyle}>Label</span>
            <input
              type="text"
              value={target.node.data.label ?? ""}
              onChange={(e) =>
                updateEdge({ label: e.target.value || undefined })
              }
              placeholder="Edge label..."
              style={{
                flex: 1,
                background: "#2a2a3e",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: 11,
                outline: "none",
              }}
            />
          </div>

          {/* Edge type (path shape) */}
          <div style={rowStyle}>
            <span style={labelStyle}>Path</span>
            {(
              [
                { key: "bezier", label: "Bezier" },
                { key: "straight", label: "Straight" },
                { key: "smoothstep", label: "Smooth" },
                { key: "step", label: "Step" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                title={t.label}
                onClick={() => updateEdge({ edgeType: t.key })}
                style={{
                  ...btnBase,
                  height: 28,
                  padding: "0 8px",
                  background:
                    (target.node.data.edgeType ?? "bezier") === t.key
                      ? "#3b82f6"
                      : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Animated toggle */}
          <div style={rowStyle}>
            <span style={labelStyle}>Animate</span>
            <button
              onClick={() => updateEdge({ animated: !target.node.data.animated })}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 12px",
                background: target.node.data.animated ? "#3b82f6" : "#2a2a3e",
                color: "white",
                fontSize: 11,
                borderRadius: 6,
              }}
            >
              {target.node.data.animated ? "On" : "Off"}
            </button>
          </div>
          {target.node.data.animated && (
            <div style={rowStyle}>
              <span style={labelStyle}>Direction</span>
              {(["forward", "reverse", "both"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => updateEdge({ animatedDirection: v })}
                  style={{
                    ...btnBase,
                    height: 28,
                    padding: "0 8px",
                    background:
                      (target.node.data.animatedDirection ?? "forward") === v
                        ? "#3b82f6"
                        : "#2a2a3e",
                    color: "white",
                    fontSize: 10,
                    borderRadius: 6,
                  }}
                >
                  {v === "forward" ? "\u2192" : v === "reverse" ? "\u2190" : "\u21C6"}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Image properties */}
      {isImage && (
        <>
          {/* Border color */}
          <div style={rowStyle}>
            <span style={labelStyle}>Border</span>
            {[null, ...STROKE_COLORS].map((c, i) => (
              <button
                key={c ?? "none"}
                onClick={() => updateImage({ borderColor: c ?? undefined })}
                style={{
                  ...btnBase,
                  width: 20,
                  height: 20,
                  background: c ?? "transparent",
                  border:
                    (target.node.data.borderColor ?? null) === c
                      ? "2px solid white"
                      : `2px solid ${i === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}
              >
                {i === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      width: "140%",
                      height: 2,
                      background: "#e74c3c",
                      transform: "rotate(-45deg)",
                      top: "50%",
                      left: "-20%",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Border style (only when border is set) */}
          {target.node.data.borderColor && (
            <div style={rowStyle}>
              <span style={labelStyle}>Style</span>
              {STROKE_STYLES.map((s) => (
                <button
                  key={s.key}
                  title={s.label}
                  onClick={() => updateImage({ borderStyle: s.key })}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 28,
                    background:
                      (target.node.data.borderStyle ?? "solid") === s.key
                        ? "#3b82f6"
                        : "#2a2a3e",
                    borderRadius: 6,
                  }}
                >
                  <svg width={24} height={12}>
                    <line
                      x1={2} y1={6} x2={22} y2={6}
                      stroke="white" strokeWidth={2}
                      strokeDasharray={s.dash}
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Border width (only when border is set) */}
          {target.node.data.borderColor && (
            <div style={rowStyle}>
              <span style={labelStyle}>Width</span>
              {WIDTHS.map((w) => (
                <button
                  key={w}
                  title={`${w}px`}
                  onClick={() => updateImage({ borderWidth: w })}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 24,
                    background:
                      (target.node.data.borderWidth ?? 1) === w
                        ? "#3b82f6"
                        : "#2a2a3e",
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: Math.max(w, 1),
                      background: "white",
                      borderRadius: w / 2,
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Content block border */}
      {isContent && (
        <>
          {/* Border color */}
          <div style={rowStyle}>
            <span style={labelStyle}>Border</span>
            {[null, ...STROKE_COLORS].map((c, i) => (
              <button
                key={c ?? "none"}
                onClick={() => updateContent({ borderColor: c ?? undefined })}
                style={{
                  ...btnBase,
                  width: 20,
                  height: 20,
                  background: c ?? "transparent",
                  border:
                    (target.node.data.borderColor ?? null) === c
                      ? "2px solid white"
                      : `2px solid ${i === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}
              >
                {i === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      width: "140%",
                      height: 2,
                      background: "#e74c3c",
                      transform: "rotate(-45deg)",
                      top: "50%",
                      left: "-20%",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Border style (only when border is set) */}
          {target.node.data.borderColor && (
            <div style={rowStyle}>
              <span style={labelStyle}>Style</span>
              {STROKE_STYLES.map((s) => (
                <button
                  key={s.key}
                  title={s.label}
                  onClick={() => updateContent({ borderStyle: s.key })}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 28,
                    background:
                      (target.node.data.borderStyle ?? "solid") === s.key
                        ? "#3b82f6"
                        : "#2a2a3e",
                    borderRadius: 6,
                  }}
                >
                  <svg width={24} height={12}>
                    <line
                      x1={2} y1={6} x2={22} y2={6}
                      stroke="white" strokeWidth={2}
                      strokeDasharray={s.dash}
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}

          {/* Border width (only when border is set) */}
          {target.node.data.borderColor && (
            <div style={rowStyle}>
              <span style={labelStyle}>Width</span>
              {WIDTHS.map((w) => (
                <button
                  key={w}
                  title={`${w}px`}
                  onClick={() => updateContent({ borderWidth: w })}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 24,
                    background:
                      (target.node.data.borderWidth ?? 1) === w
                        ? "#3b82f6"
                        : "#2a2a3e",
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: Math.max(w, 1),
                      background: "white",
                      borderRadius: w / 2,
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Frame properties */}
      {isFrame && (
        <>
          {/* Label */}
          <div style={rowStyle}>
            <span style={labelStyle}>Label</span>
            <input
              type="text"
              value={target.node.data.label ?? ""}
              onChange={(e) => updateFrame({ label: e.target.value || undefined })}
              placeholder="Frame label..."
              style={{
                flex: 1,
                background: "#2a2a3e",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: 11,
                outline: "none",
              }}
            />
          </div>

          {/* Background color */}
          <div style={rowStyle}>
            <span style={labelStyle}>Background</span>
            {[null, ...STROKE_COLORS].map((c, i) => (
              <button
                key={c ?? "none"}
                onClick={() => updateFrame({ backgroundColor: c ? `${c}15` : undefined })}
                style={{
                  ...btnBase,
                  width: 20,
                  height: 20,
                  background: c ?? "transparent",
                  border:
                    (() => {
                      const bg = target.node.data.backgroundColor;
                      const isActive = c === null ? !bg : bg === `${c}15`;
                      return isActive
                        ? "2px solid white"
                        : `2px solid ${i === 0 ? "#555" : "transparent"}`;
                    })(),
                  borderRadius: "50%",
                  position: "relative" as const,
                  overflow: "hidden" as const,
                }}
              >
                {i === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      width: "140%",
                      height: 2,
                      background: "#e74c3c",
                      transform: "rotate(-45deg)",
                      top: "50%",
                      left: "-20%",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Border color */}
          <div style={rowStyle}>
            <span style={labelStyle}>Border</span>
            {STROKE_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => updateFrame({ borderColor: c })}
                style={{
                  ...btnBase,
                  width: 20,
                  height: 20,
                  background: c,
                  border:
                    target.node.data.borderColor === c
                      ? "2px solid white"
                      : "2px solid transparent",
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>

          {/* Border style */}
          <div style={rowStyle}>
              <span style={labelStyle}>Style</span>
              {STROKE_STYLES.map((s) => (
                <button
                  key={s.key}
                  title={s.label}
                  onClick={() => updateFrame({ borderStyle: s.key })}
                  style={{
                    ...btnBase,
                    width: 36,
                    height: 28,
                    background:
                      (target.node.data.borderStyle ?? "dashed") === s.key
                        ? "#3b82f6"
                        : "#2a2a3e",
                    borderRadius: 6,
                  }}
                >
                  <svg width={24} height={12}>
                    <line
                      x1={2} y1={6} x2={22} y2={6}
                      stroke="white" strokeWidth={2}
                      strokeDasharray={s.dash}
                    />
                  </svg>
                </button>
              ))}
            </div>

          {/* Border width */}
          <div style={rowStyle}>
            <span style={labelStyle}>Width</span>
            {WIDTHS.map((w) => (
              <button
                key={w}
                title={`${w}px`}
                onClick={() => updateFrame({ borderWidth: w })}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 24,
                  background:
                    (target.node.data.borderWidth ?? 1) === w
                      ? "#3b82f6"
                      : "#2a2a3e",
                  borderRadius: 6,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: Math.max(w, 1),
                    background: "white",
                    borderRadius: w / 2,
                  }}
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Sticky note properties */}
      {isSticky && (
        <>
          {/* Color */}
          <div style={rowStyle}>
            <span style={labelStyle}>Color</span>
            {[
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5",
            ].map((c) => (
              <button
                key={c}
                onClick={() => updateSticky({ color: c })}
                style={{
                  ...btnBase,
                  width: 20,
                  height: 20,
                  background: c,
                  border:
                    target.node.data.color === c
                      ? "2px solid #1e1e2e"
                      : "2px solid transparent",
                  borderRadius: "50%",
                }}
              />
            ))}
          </div>

          {/* Font size */}
          <div style={rowStyle}>
            <span style={labelStyle}>Size</span>
            {[12, 14, 16, 20, 24].map((s) => (
              <button
                key={s}
                onClick={() => updateSticky({ fontSize: s })}
                style={{
                  ...btnBase,
                  width: 32,
                  height: 24,
                  background:
                    (target.node.data.fontSize ?? 16) === s
                      ? "#3b82f6"
                      : "#2a2a3e",
                  borderRadius: 6,
                  fontSize: 10,
                  color: "white",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Custom node properties panel */}
      {isCustom && (() => {
        const { node, PanelComponent } = target as Extract<PanelTarget, { kind: "custom" }>;
        return <PanelComponent node={node} data={node.data} engine={engine} updateData={updateCustomData} />;
      })()}

      {/* Opacity */}
      {!isEdge && !isCustom && (
        <div style={rowStyle}>
          <span style={labelStyle}>Opacity</span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(opacity * 100)}
            onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
            style={{ flex: 1, accentColor: "#3b82f6" }}
          />
          <span style={{ width: 28, textAlign: "right", fontSize: 10 }}>
            {Math.round(opacity * 100)}
          </span>
        </div>
      )}
    </div>
  );
}

function ShapeTypeIcon({ name, size = 16 }: { name: string; size?: number }) {
  const p = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === "rect" && <rect x="4" y="4" width="16" height="16" rx="2" {...p} />}
      {name === "ellipse" && <ellipse cx="12" cy="12" rx="9" ry="8" {...p} />}
      {name === "diamond" && <path d="M12 3l9 9-9 9-9-9z" {...p} />}
      {name === "line" && <line x1="5" y1="19" x2="19" y2="5" {...p} />}
      {name === "arrow" && (
        <>
          <line x1="5" y1="19" x2="19" y2="5" {...p} />
          <polyline points="12,5 19,5 19,12" {...p} fill="none" />
        </>
      )}
    </svg>
  );
}

function FillIcon({ style }: { style: string }) {
  if (style === "hachure") {
    return (
      <svg width={20} height={16} viewBox="0 0 20 16">
        <line x1={2} y1={14} x2={8} y2={2} stroke="white" strokeWidth={1.5} />
        <line x1={8} y1={14} x2={14} y2={2} stroke="white" strokeWidth={1.5} />
        <line x1={14} y1={14} x2={18} y2={6} stroke="white" strokeWidth={1.5} />
      </svg>
    );
  }
  if (style === "cross-hatch") {
    return (
      <svg width={20} height={16} viewBox="0 0 20 16">
        <line x1={2} y1={14} x2={8} y2={2} stroke="white" strokeWidth={1.2} />
        <line x1={8} y1={14} x2={14} y2={2} stroke="white" strokeWidth={1.2} />
        <line x1={14} y1={14} x2={18} y2={6} stroke="white" strokeWidth={1.2} />
        <line x1={2} y1={2} x2={8} y2={14} stroke="white" strokeWidth={1.2} />
        <line x1={8} y1={2} x2={14} y2={14} stroke="white" strokeWidth={1.2} />
      </svg>
    );
  }
  // solid
  return (
    <svg width={20} height={16} viewBox="0 0 20 16">
      <rect x={2} y={2} width={16} height={12} fill="white" rx={2} />
    </svg>
  );
}
