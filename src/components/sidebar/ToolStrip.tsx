import { useState, useEffect, useRef, useCallback } from "react";
import { useFitSidePopoverPosition } from "../../hooks/useFitSidePopoverPosition";
import { createPortal } from "react-dom";
import type { SpatialEngine, BoardBackground } from "../../engine/SpatialEngine";
import type { Mode } from "../../engine/types";
import { TOOL_STRIP_WIDTH } from "./styles";
import { useSBTheme } from "./ThemeContext";
import { PAPER_TYPES, type PaperGroup } from "../paper-types";
import { TEMPLATES } from "../../templates";
import { screenToCanvas } from "../../engine/viewport";
import LibraryPanel from "./LibraryPanel";
import LibraryDirectory from "./LibraryDirectory";
import GifSearchPanel from "./GifSearchPanel";
import MermaidPanel from "./MermaidPanel";
import { useSBI18n } from "../LocalizationContext";

const MODE_KEYS: { key: Mode; shortcut: string; num: string }[] = [
  { key: "select", shortcut: "S", num: "" },
  { key: "hand", shortcut: "P", num: "" },
  { key: "draw", shortcut: "D", num: "" },
  { key: "shape", shortcut: "G", num: "" },
  { key: "text", shortcut: "T", num: "" },
  { key: "note", shortcut: "B", num: "" },
  { key: "sticky", shortcut: "Y", num: "" },
  { key: "frame", shortcut: "F", num: "" },
  { key: "edge", shortcut: "C", num: "" },
  { key: "erase", shortcut: "E", num: "" },
  { key: "laser", shortcut: "Z", num: "" },
];

const btnBase: React.CSSProperties = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
};

const sp = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ToolIcon({ name, size = 18, textGlyph = "T" }: { name: string; size?: number; textGlyph?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === "select" && (
        <path d="M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z" fill="currentColor" />
      )}
      {name === "draw" && (
        <>
          <path d="M17 3l4 4L7.5 20.5 2 22l1.5-5.5z" {...sp} />
          <path d="M15 5l4 4" {...sp} />
        </>
      )}
      {name === "shape" && (
        <rect x="4" y="4" width="16" height="16" rx="2" {...sp} />
      )}
      {name === "text" && (
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="currentColor"
          stroke="none"
        >
          {textGlyph}
        </text>
      )}
      {name === "note" && (
        <>
          <path d="M4 3h16v14l-4 4H4z" {...sp} />
          <path d="M16 17v4l4-4z" fill="currentColor" opacity={0.4} />
        </>
      )}
      {name === "sticky" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="1" fill="currentColor" opacity={0.15} {...sp} />
          <line x1="7" y1="9" x2="17" y2="9" {...sp} opacity={0.5} />
          <line x1="7" y1="13" x2="14" y2="13" {...sp} opacity={0.5} />
        </>
      )}
      {name === "frame" && (
        <rect x="3" y="3" width="18" height="18" rx="2" {...sp} strokeDasharray="4,2" />
      )}
      {name === "hand" && (
        <>
          <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12" {...sp} />
          <path d="M11 5.5v-2a1.5 1.5 0 0 1 3 0V12" {...sp} />
          <path d="M14 5.5a1.5 1.5 0 0 1 3 0V12" {...sp} />
          <path d="M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0" {...sp} />
        </>
      )}
      {name === "edge" && (
        <>
          <circle cx="5" cy="5" r="2.5" {...sp} fill="currentColor" opacity={0.3} />
          <circle cx="19" cy="19" r="2.5" {...sp} fill="currentColor" opacity={0.3} />
          <line x1="7" y1="7" x2="17" y2="17" {...sp} />
          <polyline points="14,17 17,17 17,14" {...sp} fill="none" />
        </>
      )}
      {name === "erase" && (
        <>
          <path d="M20 20H9L3 14l9.5-9.5 8 8L16 17" {...sp} />
          <path d="M12.5 4.5l8 8" {...sp} />
        </>
      )}
      {name === "laser" && (
        <circle cx="12" cy="12" r="4" fill="currentColor" opacity={0.9} />
      )}
      {name === "lasso" && (
        <path d="M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z" {...sp} strokeDasharray="3,2" />
      )}
      {name === "undo" && (
        <>
          <path d="M4 9h11a4 4 0 0 1 0 8h-4" {...sp} fill="none" />
          <polyline points="8,5 4,9 8,13" {...sp} fill="none" />
        </>
      )}
      {name === "redo" && (
        <>
          <path d="M20 9H9a4 4 0 0 0 0 8h4" {...sp} fill="none" />
          <polyline points="16,5 20,9 16,13" {...sp} fill="none" />
        </>
      )}
      {name === "print" && (
        <>
          <path d="M6 9V3h12v6" {...sp} />
          <path d="M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2" {...sp} />
          <rect x="6" y="14" width="12" height="7" rx="1" {...sp} />
        </>
      )}
      {name === "fit" && (
        <>
          <path d="M15 3h6v6M9 21H3v-6" {...sp} />
          <path d="M21 3l-7 7M3 21l7-7" {...sp} />
        </>
      )}
      {name === "paper" && (
        <>
          <rect x="4" y="2" width="16" height="20" rx="1" {...sp} />
          <line x1="8" y1="7" x2="16" y2="7" {...sp} opacity={0.4} />
          <line x1="8" y1="11" x2="16" y2="11" {...sp} opacity={0.4} />
          <line x1="8" y1="15" x2="13" y2="15" {...sp} opacity={0.4} />
        </>
      )}
      {name === "template" && (
        <>
          <rect x="3" y="3" width="8" height="8" rx="1" {...sp} />
          <rect x="13" y="3" width="8" height="8" rx="1" {...sp} />
          <rect x="3" y="13" width="8" height="8" rx="1" {...sp} />
          <rect x="13" y="13" width="8" height="8" rx="1" {...sp} />
        </>
      )}
      {name === "library" && (
        <>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" {...sp} />
          <path d="M8 7h6" {...sp} opacity={0.5} />
          <path d="M8 11h4" {...sp} opacity={0.5} />
        </>
      )}
      {name === "gif" && (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" {...sp} />
          <text x="12" y="14.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" stroke="none">GIF</text>
        </>
      )}
      {name === "mermaid" && (
        <>
          <rect x="3" y="4" width="18" height="14" rx="2" {...sp} />
          <path d="M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13" {...sp} />
          <circle cx="6" cy="8" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="10.7" cy="9" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="14.9" cy="9.5" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="18" cy="13" r="1.1" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

function PaperPicker({
  engine,
  background,
}: {
  engine: SpatialEngine;
  background: BoardBackground;
}) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [open, setOpen] = useState(false);
  const groupLabels: Record<PaperGroup, string> = {
    light: labels.paperGroupLight,
    dark: labels.paperGroupDark,
    textured: labels.paperGroupTextured,
  };
  const paperLabelByKey: Record<string, string> = {
    "plain-white": labels.paperWhite,
    "dot-grid": labels.paperCream,
    engineering: labels.paperWarm,
    blueprint: labels.paperBlueprint,
    "dark-grid": labels.paperNight,
    "japanese-stationery": labels.paperJapaneseStationery,
    kraft: labels.paperKraftPaper,
  };

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useFitSidePopoverPosition(open, triggerRef, popoverRef, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handle);
    return () => document.removeEventListener("pointerdown", handle);
  }, [open]);

  // Active swatch color for the trigger button
  const activePaper = PAPER_TYPES.find((p) => p.key === background) ?? PAPER_TYPES[1];

  const popoverContent = open && triggerRef.current
    ? (() => {
        const rect = triggerRef.current.getBoundingClientRect();
        return createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              left: rect.right + 8,
              top: rect.top,
              background: theme.panelBg,
              border: `1px solid ${theme.border}`,
              borderRadius: theme.panelBorderRadius,
              padding: 8,
              zIndex: 99999,
              boxShadow: theme.panelShadow,
              width: 180,
              maxHeight: 400,
              overflowY: "auto",
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {(["light", "dark", "textured"] as PaperGroup[]).map((group) => {
              const items = PAPER_TYPES.filter((p) => p.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group} style={{ marginBottom: 6 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: theme.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      padding: "4px 6px 2px",
                    }}
                  >
                    {groupLabels[group]}
                  </div>
                  {items.map((paper) => (
                    <button
                      key={paper.key}
                      onClick={() => {
                        engine.setBoardBackground(paper.key);
                        setOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                        padding: "5px 6px",
                        border: "none",
                        borderRadius: theme.controlBorderRadius,
                        background: background === paper.key ? theme.controlBgActive : "transparent",
                        color: theme.text,
                        cursor: "pointer",
                        fontSize: 12,
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 3,
                          background: paper.swatchColor,
                          border: `1.5px solid ${theme.border}`,
                          flexShrink: 0,
                        }}
                      />
                      {paperLabelByKey[paper.key] ?? paper.label}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>,
          document.body
        );
      })()
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        title={labels.paperType}
        onClick={() => setOpen((v) => !v)}
        style={{
          ...btnBase,
          width: 40,
          height: 40,
          borderRadius: theme.controlBorderRadius,
          background: open ? theme.controlBgActive : "transparent",
          color: theme.text,
          position: "relative",
        }}
      >
        <ToolIcon name="paper" />
        <span
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: activePaper.swatchColor,
            border: `1px solid ${theme.border}`,
          }}
        />
      </button>
      {popoverContent}
    </>
  );
}

function TemplatePicker({ engine }: { engine: SpatialEngine }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useFitSidePopoverPosition(open, triggerRef, popoverRef, []);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handle);
    return () => document.removeEventListener("pointerdown", handle);
  }, [open]);

  const popoverContent =
    open && triggerRef.current
      ? (() => {
          const rect = triggerRef.current.getBoundingClientRect();
          return createPortal(
            <div
              ref={popoverRef}
              style={{
                position: "fixed",
                left: rect.right + 8,
                top: rect.top,
                background: theme.panelBg,
                border: `1px solid ${theme.border}`,
                borderRadius: 8,
                padding: 8,
                zIndex: 99999,
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                width: 180,
              }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: theme.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "4px 6px 2px",
                }}
              >
                {labels.templatesTitle}
              </div>
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    // Insert at viewport center
                    const win = typeof window !== "undefined" ? window : undefined;
                    if (!win) return;
                    const cx = win.innerWidth / 2;
                    const cy = win.innerHeight / 2;
                    const pt = screenToCanvas(engine.viewport, cx, cy);
                    engine.applyTemplate(t.id, pt.x, pt.y);
                    setOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "6px 6px",
                    border: "none",
                    borderRadius: theme.controlBorderRadius,
                    background: "transparent",
                    color: theme.text,
                    cursor: "pointer",
                    fontSize: 12,
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = theme.controlBgActive;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>,
            document.body
          );
        })()
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        title={labels.templatesTitle}
        onClick={() => setOpen((v) => !v)}
        style={{
          ...btnBase,
          width: 40,
          height: 40,
          borderRadius: theme.controlBorderRadius,
          background: open ? theme.controlBgActive : "transparent",
          color: theme.text,
        }}
      >
        <ToolIcon name="template" />
      </button>
      {popoverContent}
    </>
  );
}

function LibraryPicker({ engine }: { engine: SpatialEngine }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [open, setOpen] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const handleOpen = useCallback(() => {
    setOpen((v) => {
      if (!v && triggerRef.current) {
        setTriggerRect(triggerRef.current.getBoundingClientRect());
      }
      return !v;
    });
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  const handleBrowseDirectory = useCallback(() => {
    setDirectoryOpen(true);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        title={labels.librariesTitle}
        onClick={handleOpen}
        style={{
          ...btnBase,
          width: 40,
          height: 40,
          borderRadius: theme.controlBorderRadius,
          background: open ? theme.controlBgActive : "transparent",
          color: theme.text,
        }}
      >
        <ToolIcon name="library" />
      </button>
      <LibraryPanel
        engine={engine}
        open={open}
        onClose={handleClose}
        triggerRect={triggerRect}
        onBrowseDirectory={handleBrowseDirectory}
      />
      {directoryOpen && (
        <LibraryDirectory
          onClose={() => setDirectoryOpen(false)}
          onInstalled={() => {
            // Force re-render of the panel
            setOpen(false);
            setTimeout(() => {
              if (triggerRef.current) {
                setTriggerRect(triggerRef.current.getBoundingClientRect());
              }
              setOpen(true);
            }, 100);
          }}
        />
      )}
    </>
  );
}

function GifPicker({ engine, baseUrl }: { engine: SpatialEngine; baseUrl: string }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const handleOpen = useCallback(() => {
    setOpen((v) => {
      if (!v && triggerRef.current) {
        setTriggerRect(triggerRef.current.getBoundingClientRect());
      }
      return !v;
    });
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        ref={triggerRef}
        title={labels.gifSearchTitle}
        onClick={handleOpen}
        style={{
          ...btnBase,
          width: 40,
          height: 40,
          borderRadius: theme.controlBorderRadius,
          background: open ? theme.controlBgActive : "transparent",
          color: theme.text,
        }}
      >
        <ToolIcon name="gif" />
      </button>
      <GifSearchPanel
        engine={engine}
        open={open}
        onClose={handleClose}
        triggerRect={triggerRect}
        baseUrl={baseUrl}
      />
    </>
  );
}

function MermaidPicker({ engine }: { engine: SpatialEngine }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);

  const handleOpen = useCallback(() => {
    setOpen((v) => {
      if (!v && triggerRef.current) {
        setTriggerRect(triggerRef.current.getBoundingClientRect());
      }
      return !v;
    });
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        ref={triggerRef}
        title={labels.mermaidSketchTitle}
        onClick={handleOpen}
        style={{
          ...btnBase,
          width: 40,
          height: 40,
          borderRadius: theme.controlBorderRadius,
          background: open ? theme.controlBgActive : "transparent",
          color: theme.text,
        }}
      >
        <ToolIcon name="mermaid" />
      </button>
      <MermaidPanel
        engine={engine}
        open={open}
        onClose={handleClose}
        triggerRect={triggerRect}
      />
    </>
  );
}

export default function ToolStrip({ engine, gifApiBaseUrl }: { engine: SpatialEngine; gifApiBaseUrl?: string }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [mode, setMode] = useState<Mode>(engine.mode);
  const [background, setBackground] = useState<BoardBackground>(engine.boardBackground);
  const [lassoActive, setLassoActive] = useState(engine.lassoSelect);

  useEffect(() => {
    const handleMode = () => setMode(engine.mode);
    const handleBackground = () => setBackground(engine.boardBackground);
    const handleLasso = () => setLassoActive(engine.lassoSelect);
    engine.on("mode", handleMode);
    engine.on("background", handleBackground);
    engine.on("lassoToggle", handleLasso);
    return () => {
      engine.off("mode", handleMode);
      engine.off("background", handleBackground);
      engine.off("lassoToggle", handleLasso);
    };
  }, [engine]);

  const modes = MODE_KEYS.map((m) => ({
    ...m,
    label:
      m.key === "select" ? labels.toolSelect :
      m.key === "hand" ? labels.toolHand :
      m.key === "draw" ? labels.toolDraw :
      m.key === "shape" ? labels.toolShape :
      m.key === "text" ? labels.toolText :
      m.key === "note" ? labels.toolNote :
      m.key === "sticky" ? labels.toolSticky :
      m.key === "frame" ? labels.toolFrame :
      m.key === "erase" ? labels.toolEraser :
      labels.toolLaser,
  }));

  return (
    <div
      data-sb-toolbar
      style={{
        width: TOOL_STRIP_WIDTH,
        height: "100%",
        flexShrink: 0,
        background: theme.toolbarBg,
        borderRight: `1px solid ${theme.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 0",
        gap: 4,
      }}
    >
      {/* Mode buttons */}
      {modes.map((m) => {
        // When lasso is active, don't highlight the select button
        const isActive = mode === m.key && !(m.key === "select" && lassoActive);
        return (
        <button
          key={m.key}
          title={`${m.label} (${m.shortcut}${m.num ? ` / ${m.num}` : ""})`}
          onClick={() => {
            if (lassoActive) {
              engine.toggleLassoSelect();
              setLassoActive(false);
            }
            engine.setMode(m.key);
          }}
          style={{
            ...btnBase,
            width: 40,
            height: 40,
            borderRadius: theme.controlBorderRadius,
            background: isActive ? theme.controlBgActive : "transparent",
            color: theme.text,
            position: "relative",
          }}
        >
          <ToolIcon name={m.key} textGlyph={labels.toolTextGlyph} />
          <span
            style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              fontSize: 8,
              lineHeight: 1,
              color: theme.textMuted,
              fontWeight: 500,
              pointerEvents: "none",
            }}
          >
            {m.num || m.shortcut}
          </span>
        </button>
        );
      })}

      <div style={{ width: 28, height: 1, background: theme.separator, margin: "8px 0" }} />

      {/* Lasso select toggle */}
      <button
        title={`${labels.toolLassoSelect} (L)`}
        onClick={() => {
          if (lassoActive) {
            // Turning lasso off — go back to normal select
            engine.toggleLassoSelect();
            setLassoActive(false);
          } else {
            // Turning lasso on — switch to select mode first
            engine.setMode("select");
            if (!engine.lassoSelect) engine.toggleLassoSelect();
            setLassoActive(true);
          }
        }}
        style={{
          ...btnBase,
          width: 40,
          height: 40,
          borderRadius: theme.controlBorderRadius,
          background: lassoActive ? theme.controlBgActive : "transparent",
          color: theme.text,
          position: "relative",
        }}
      >
        <ToolIcon name="lasso" />
        <span
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            fontSize: 8,
            lineHeight: 1,
            color: theme.textMuted,
            fontWeight: 500,
            pointerEvents: "none",
          }}
        >
          L
        </span>
      </button>

      <div style={{ width: 28, height: 1, background: theme.separator, margin: "8px 0" }} />

      {/* Board background picker */}
      <PaperPicker engine={engine} background={background} />

      {/* Template picker */}
      <TemplatePicker engine={engine} />

      {/* Library picker */}
      <LibraryPicker engine={engine} />

      {/* Mermaid sketch importer */}
      <MermaidPicker engine={engine} />

      {/* GIF search */}
      {gifApiBaseUrl && <GifPicker engine={engine} baseUrl={gifApiBaseUrl} />}
    </div>
  );
}
