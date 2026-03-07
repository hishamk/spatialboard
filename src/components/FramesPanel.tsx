import React, { useState, useEffect, useRef, useCallback } from "react";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { FrameNode, SlideTransition } from "../engine/types";
import { TRANSITION_DEFAULTS } from "../engine/types";
import { renderFrameToSVG } from "../export/canvas-export";
import { useSBTheme } from "./sidebar/ThemeContext";

const PANEL_WIDTH = 240;
const CARD_GAP = 6;

interface FrameEntry {
  id: string;
  label: string;
  order: number;
  slideOrder?: number;
  borderColor?: string;
  transition?: SlideTransition;
  transitionDuration?: number;
}

function buildOrderedFrames(engine: SpatialEngine): FrameEntry[] {
  const allNodes = engine.getAllNodes();
  const frames = allNodes.filter((n) => n.type === "frame") as FrameNode[];
  if (frames.length === 0) return [];

  const withPos = frames.map((f) => ({
    id: f.id,
    x: f.x,
    y: f.y,
    slideOrder: f.data.slideOrder,
    label: f.data.label || "",
    borderColor: f.data.borderColor,
    transition: f.data.transition,
    transitionDuration: f.data.transitionDuration,
  }));

  // Same ordering logic as enterPresentation()
  const ordered = withPos.filter((f) => f.slideOrder != null).sort((a, b) => a.slideOrder! - b.slideOrder!);
  const auto = withPos.filter((f) => f.slideOrder == null);

  const ROW_THRESHOLD = 100;
  auto.sort((a, b) => a.y - b.y);
  const rows: Array<typeof auto> = [];
  for (const f of auto) {
    const lastRow = rows[rows.length - 1];
    if (lastRow && Math.abs(f.y - lastRow[0].y) < ROW_THRESHOLD) {
      lastRow.push(f);
    } else {
      rows.push([f]);
    }
  }
  const autoSorted = rows.flatMap((row) => row.sort((a, b) => a.x - b.x));
  const sorted = [...ordered, ...autoSorted];

  return sorted.map((f, i) => ({
    id: f.id,
    label: f.label || `Frame ${i + 1}`,
    order: i + 1,
    slideOrder: f.slideOrder,
    borderColor: f.borderColor,
    transition: f.transition,
    transitionDuration: f.transitionDuration,
  }));
}

// ── Icons ─────────────────────────────────────────────────────────

const sp = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CloseIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" {...sp} />
    </svg>
  );
}

// ── Thumbnail ─────────────────────────────────────────────────────

function useThumbnail(engine: SpatialEngine, frameId: string, tick: number) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    renderFrameToSVG(engine, frameId).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => { cancelled = true; };
    // tick forces re-render when engine content changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, frameId, tick]);

  return src;
}

function FrameThumb({ engine, frameId, tick }: { engine: SpatialEngine; frameId: string; tick: number }) {
  const src = useThumbnail(engine, frameId, tick);

  if (!src) {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: "16/10",
          background: "rgba(128,128,128,0.06)",
          borderRadius: "4px 4px 0 0",
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt=""
      draggable={false}
      style={{
        width: "100%",
        display: "block",
        borderRadius: "4px 4px 0 0",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Transition picker between slides ──────────────────────────────

const TRANSITIONS: { key: SlideTransition; label: string }[] = [
  { key: "pan", label: "Pan" },
  { key: "fade", label: "Fade" },
  { key: "dissolve", label: "Dissolve" },
  { key: "zoom", label: "Zoom" },
  { key: "fold", label: "Fold" },
  { key: "cube", label: "Cube" },
  { key: "none", label: "Cut" },
];

function TransitionIcon({ type, size = 12 }: { type: SlideTransition; size?: number }) {
  const p = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      {type === "pan" && (
        <path d="M3 8h10M10 5l3 3-3 3" {...p} />
      )}
      {type === "fade" && (
        <>
          <rect x="2" y="3" width="5" height="10" rx="1" {...p} opacity={0.4} />
          <rect x="9" y="3" width="5" height="10" rx="1" {...p} />
        </>
      )}
      {type === "dissolve" && (
        <>
          <rect x="2" y="3" width="5" height="10" rx="1" {...p} strokeDasharray="2,1" />
          <rect x="9" y="3" width="5" height="10" rx="1" {...p} />
        </>
      )}
      {type === "zoom" && (
        <>
          <circle cx="8" cy="8" r="3" {...p} />
          <path d="M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2" {...p} />
        </>
      )}
      {type === "fold" && (
        <>
          <path d="M2 3v10l6-5z" {...p} />
          <path d="M14 3v10l-6-5z" {...p} />
        </>
      )}
      {type === "cube" && (
        <>
          <path d="M3 4h7v8H3z" {...p} />
          <path d="M10 4l3-2v8l-3 2" {...p} />
          <path d="M3 4l3-2h7l-3 2" {...p} />
        </>
      )}
      {type === "none" && (
        <path d="M4 4l8 8M12 4l-8 8" {...p} />
      )}
    </svg>
  );
}

const DURATION_PRESETS = [200, 300, 400, 500, 600, 800, 1000, 1500, 2000];

function TransitionPicker({
  value,
  durationMs,
  onChange,
  onDurationChange,
  theme,
}: {
  value: SlideTransition;
  durationMs?: number;
  onChange: (t: SlideTransition) => void;
  onDurationChange: (ms: number | undefined) => void;
  theme: ReturnType<typeof useSBTheme>;
}) {
  const [typeOpen, setTypeOpen] = useState(false);
  const [durOpen, setDurOpen] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);
  const durRef = useRef<HTMLDivElement>(null);
  const showDuration = value !== "none";
  const effectiveDuration = durationMs ?? TRANSITION_DEFAULTS[value];

  useEffect(() => {
    if (!typeOpen && !durOpen) return;
    const handler = (e: MouseEvent) => {
      if (typeOpen && typeRef.current && !typeRef.current.contains(e.target as Node)) setTypeOpen(false);
      if (durOpen && durRef.current && !durRef.current.contains(e.target as Node)) setDurOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [typeOpen, durOpen]);

  const pillStyle: React.CSSProperties = {
    border: `1px solid ${theme.border}`,
    background: theme.panelBg,
    borderRadius: 10,
    height: 20,
    padding: "0 6px",
    display: "flex",
    alignItems: "center",
    gap: 3,
    cursor: "pointer",
    color: theme.textMuted,
    fontSize: 9,
    position: "relative",
    zIndex: 1,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 22,
        flexShrink: 0,
        position: "relative",
        gap: 4,
        zIndex: typeOpen || durOpen ? 50 : undefined,
      }}
    >
      {/* Line through the middle */}
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: theme.border }} />

      {/* Transition type pill */}
      <div ref={typeRef} style={{ position: "relative", zIndex: 1 }}>
        <button onClick={() => { setTypeOpen((o) => !o); setDurOpen(false); }} style={pillStyle}>
          <TransitionIcon type={value} />
          <span>{TRANSITIONS.find((t) => t.key === value)?.label ?? "Pan"}</span>
          <span style={{ fontSize: 7 }}>{typeOpen ? "\u25B2" : "\u25BC"}</span>
        </button>

        {typeOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 2,
              background: theme.panelBg,
              border: `1px solid ${theme.border}`,
              borderRadius: 6,
              padding: 3,
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              minWidth: 100,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            }}
          >
            {TRANSITIONS.map((t) => (
              <button
                key={t.key}
                onClick={() => {
                  onChange(t.key);
                  setTypeOpen(false);
                }}
                style={{
                  border: "none",
                  background: t.key === value ? theme.controlBgActive : "transparent",
                  color: theme.text,
                  borderRadius: 4,
                  padding: "4px 8px",
                  fontSize: 10,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  width: "100%",
                }}
              >
                <TransitionIcon type={t.key} />
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Duration pill */}
      {showDuration && (
        <div ref={durRef} style={{ position: "relative", zIndex: 1 }}>
          <button onClick={() => { setDurOpen((o) => !o); setTypeOpen(false); }} style={pillStyle}>
            <span>{effectiveDuration}ms</span>
            <span style={{ fontSize: 7 }}>{durOpen ? "\u25B2" : "\u25BC"}</span>
          </button>

          {durOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: 2,
                background: theme.panelBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 6,
                padding: 3,
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minWidth: 64,
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}
            >
              {DURATION_PRESETS.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    onDurationChange(d === TRANSITION_DEFAULTS[value] ? undefined : d);
                    setDurOpen(false);
                  }}
                  style={{
                    border: "none",
                    background: d === effectiveDuration ? theme.controlBgActive : "transparent",
                    color: theme.text,
                    borderRadius: 4,
                    padding: "4px 8px",
                    fontSize: 10,
                    cursor: "pointer",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {d}ms{d === TRANSITION_DEFAULTS[value] ? " \u2022" : ""}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Panel ─────────────────────────────────────────────────────────

interface FramesPanelProps {
  engine: SpatialEngine;
  open: boolean;
  onClose: () => void;
}

export default function FramesPanel({ engine, open, onClose }: FramesPanelProps) {
  const theme = useSBTheme();
  const [frames, setFrames] = useState<FrameEntry[]>(() => buildOrderedFrames(engine));
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(engine.selection));
  // Tick counter bumped when thumbnails need refreshing
  const [thumbTick, setThumbTick] = useState(0);

  // Drag state — refs for document-level listeners
  const dragIndexRef = useRef<number | null>(null);
  const dropIndexRef = useRef<number | null>(null);
  const dragStartYRef = useRef(0);
  const framesRef = useRef(frames);
  framesRef.current = frames;
  const isReorderingRef = useRef(false);
  // Suppress transitions for one render cycle after drop to avoid "double shuffle"
  const suppressTransitionRef = useRef(false);

  // React state for rendering during drag
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const cardHeightsRef = useRef<number[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // Sync frames from engine (skipped during reorder)
  const syncFrames = useCallback(() => {
    if (isReorderingRef.current) return;
    const built = buildOrderedFrames(engine);
    setFrames(built);
  }, [engine]);

  const syncSelection = useCallback(() => {
    setSelectedIds(new Set(engine.selection));
  }, [engine]);

  // Debounced thumbnail refresh
  const thumbTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bumpThumbnails = useCallback(() => {
    if (thumbTimerRef.current) clearTimeout(thumbTimerRef.current);
    thumbTimerRef.current = setTimeout(() => setThumbTick((t) => t + 1), 500);
  }, []);

  useEffect(() => {
    syncFrames();
    syncSelection();

    // Bump thumbnails after a short delay so auto-height nodes
    // have time to be measured by ResizeObserver before the first render
    const initialTimer = setTimeout(() => setThumbTick((t) => t + 1), 200);

    const handleChange = () => {
      syncFrames();
      bumpThumbnails();
    };

    engine.on("change", handleChange);
    engine.on("node:create", handleChange);
    engine.on("node:delete", handleChange);
    engine.on("node:data", handleChange);
    engine.on("selection", syncSelection);
    engine.on("history", handleChange);

    return () => {
      clearTimeout(initialTimer);
      engine.off("change", handleChange);
      engine.off("node:create", handleChange);
      engine.off("node:delete", handleChange);
      engine.off("node:data", handleChange);
      engine.off("selection", syncSelection);
      engine.off("history", handleChange);
      if (thumbTimerRef.current) clearTimeout(thumbTimerRef.current);
    };
  }, [engine, syncFrames, syncSelection, bumpThumbnails]);

  // Measure card heights after render
  useEffect(() => {
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll("[data-frame-card]");
    cardHeightsRef.current = Array.from(cards).map((el) => (el as HTMLElement).offsetHeight + CARD_GAP);
  }, [frames]);

  // Double-click: select frame on canvas and zoom to it
  const handleFrameDoubleClick = useCallback(
    (frameId: string) => {
      engine.select(frameId);
      engine.zoomToNode(frameId, 0.8);
    },
    [engine],
  );

  // ── Document-level drag listeners ─────────────────────────────

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      dragStartYRef.current = e.clientY;
      dragIndexRef.current = index;
      dropIndexRef.current = index;
      setDragIndex(index);
      setDropIndex(index);
      setDragOffset(0);
    },
    [],
  );

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (dragIndexRef.current === null) return;
      const dy = e.clientY - dragStartYRef.current;
      setDragOffset(dy);

      const heights = cardHeightsRef.current;
      const startIdx = dragIndexRef.current;
      let newDrop = startIdx;

      if (dy > 0) {
        let acc = 0;
        for (let i = startIdx + 1; i < framesRef.current.length; i++) {
          acc += heights[i] || 0;
          if (dy > acc - (heights[i] || 0) / 2) newDrop = i;
          else break;
        }
      } else if (dy < 0) {
        let acc = 0;
        for (let i = startIdx - 1; i >= 0; i--) {
          acc -= heights[i] || 0;
          if (dy < acc + (heights[i] || 0) / 2) newDrop = i;
          else break;
        }
      }

      dropIndexRef.current = newDrop;
      setDropIndex(newDrop);
    };

    const handleUp = () => {
      const di = dragIndexRef.current;
      const drp = dropIndexRef.current;

      if (di !== null && drp !== null && di !== drp) {
        // Prevent syncFrames from running during batch update
        isReorderingRef.current = true;

        const reordered = [...framesRef.current];
        const [moved] = reordered.splice(di, 1);
        reordered.splice(drp, 0, moved);

        // Batch: one history snapshot, then update all
        let first = true;
        for (let i = 0; i < reordered.length; i++) {
          const frame = reordered[i];
          const node = engine.getNode(frame.id) as FrameNode | undefined;
          if (!node) continue;
          if (first) {
            engine.updateNodeWithHistory(frame.id, {
              data: { ...node.data, slideOrder: i + 1 },
            });
            first = false;
          } else {
            engine.updateNode(frame.id, {
              data: { ...node.data, slideOrder: i + 1 },
            });
          }
        }

        isReorderingRef.current = false;

        // Suppress transitions so the reordered list snaps into place
        suppressTransitionRef.current = true;

        // Now sync to pick up final state
        setFrames(buildOrderedFrames(engine));
        setThumbTick((t) => t + 1);
      }

      dragIndexRef.current = null;
      dropIndexRef.current = null;
      setDragIndex(null);
      setDropIndex(null);
      setDragOffset(0);

      // Re-enable transitions after the browser has painted the snapped state
      if (suppressTransitionRef.current) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            suppressTransitionRef.current = false;
          });
        });
      }
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    document.addEventListener("pointercancel", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("pointercancel", handleUp);
    };
  }, [engine]);

  return (
    <div
      data-sb-frames-panel
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: PANEL_WIDTH,
        background: theme.panelBg,
        borderLeft: `1px solid ${theme.border}`,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: open ? "translateX(0)" : `translateX(${PANEL_WIDTH}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: open ? "auto" : "none",
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          borderBottom: `1px solid ${theme.border}`,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 600, color: theme.text, letterSpacing: "0.02em" }}>
          Slides ({frames.length})
        </span>
        <button
          title="Close slides panel"
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: theme.textMuted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: 4,
            padding: 0,
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Frame list */}
      <div
        ref={listRef}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: CARD_GAP,
        }}
      >
        {frames.length === 0 && (
          <div style={{ padding: "20px 8px", textAlign: "center", color: theme.textMuted, fontSize: 11 }}>
            No frames yet. Use the Frame tool (F) to create slides.
          </div>
        )}

        {frames.map((frame, index) => {
          const isSelected = selectedIds.has(frame.id);
          const isDragging = dragIndex === index;

          // Compute visual translate for drag animation
          let translateY = 0;
          if (isDragging) {
            translateY = dragOffset;
          } else if (dragIndex !== null && dropIndex !== null) {
            const heights = cardHeightsRef.current;
            if (dragIndex < dropIndex) {
              if (index > dragIndex && index <= dropIndex) {
                translateY = -(heights[dragIndex] || 0);
              }
            } else if (dragIndex > dropIndex) {
              if (index >= dropIndex && index < dragIndex) {
                translateY = heights[dragIndex] || 0;
              }
            }
          }

          const handleTransitionChange = (t: SlideTransition) => {
            engine.updateNodeWithHistory(frame.id, {
              data: { transition: t === "pan" ? undefined : t, transitionDuration: undefined },
            } as Partial<FrameNode>);
          };

          const handleDurationChange = (ms: number | undefined) => {
            engine.updateNodeWithHistory(frame.id, {
              data: { transitionDuration: ms },
            } as Partial<FrameNode>);
          };

          return (
            <React.Fragment key={frame.id}>
              {/* Transition picker between slides (and above first slide) */}
              {dragIndex === null && (
                <TransitionPicker
                  value={frame.transition ?? "pan"}
                  durationMs={frame.transitionDuration}
                  onChange={handleTransitionChange}
                  onDurationChange={handleDurationChange}
                  theme={theme}
                />
              )}
              <div
                data-frame-card
                onPointerDown={(e) => handlePointerDown(e, index)}
                onDoubleClick={() => handleFrameDoubleClick(frame.id)}
                style={{
                  borderRadius: 6,
                  border: isSelected
                    ? `2px solid ${frame.borderColor || theme.text}`
                    : `1px solid ${theme.border}`,
                  background: isSelected ? theme.controlBgActive : "transparent",
                  cursor: isDragging ? "grabbing" : "grab",
                  userSelect: "none",
                  touchAction: "none",
                  transition: (isDragging || suppressTransitionRef.current) ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                  transform: `translateY(${translateY}px)`,
                  zIndex: isDragging ? 10 : 1,
                  opacity: isDragging ? 0.92 : 1,
                  boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <FrameThumb engine={engine} frameId={frame.id} tick={thumbTick} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
