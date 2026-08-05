import { useState, useEffect, useRef, useCallback } from "react";
import { useFitSidePopoverPosition } from "./useFitSidePopoverPosition";
import { createPortal } from "react-dom";
import type { SpatialEngine, BoardBackground } from "../../engine/SpatialEngine";
import type { Mode, ToolKey } from "../../engine/types";
import type { NodeTypeRegistry } from "../../nodes/registry";
import { TOOLS, modeAvailable } from "../../tools";
import { TOOL_STRIP_WIDTH } from "./styles";
import { useSBTheme, SB_UI_FONT } from "./ThemeContext";
import { PAPER_TYPES, type PaperGroup } from "../paper-types";
import { TEMPLATES } from "../../templates/index";
import { screenToCanvas } from "../../engine/viewport";
import LibraryPanel from "./LibraryPanel";
import LibraryDirectory from "./LibraryDirectory";
import GifSearchPanel from "./GifSearchPanel";
import MermaidPanel from "./MermaidPanel";
import CanvasSettings from "./CanvasSettings";
import { useSBI18n } from "../contexts/LocalizationContext";

const btnBase: React.CSSProperties = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  touchAction: "manipulation",
};

const sp = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ToolIcon({ name, size = 18, textGlyph = "T" }: { name: string; size?: number; textGlyph?: string }) {
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
          <rect x="4" y="3" width="16" height="18" rx="2" {...sp} fill="none" />
          <line x1="7.5" y1="8" x2="16.5" y2="8" {...sp} strokeWidth={2.2} />
          <line x1="7.5" y1="12.5" x2="16.5" y2="12.5" {...sp} opacity={0.55} />
          <line x1="7.5" y1="16.5" x2="13" y2="16.5" {...sp} opacity={0.55} />
        </>
      )}
      {name === "sticky" && (
        <>
          <path
            d="M4 4h16v9.5L13.5 20H4z"
            fill="currentColor"
            fillOpacity={0.15}
            {...sp}
          />
          <path d="M13.5 20v-6.5H20" {...sp} fill="none" />
        </>
      )}
      {name === "table" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="1.5" {...sp} />
          <line x1="3" y1="9" x2="21" y2="9" {...sp} />
          <line x1="9.5" y1="4" x2="9.5" y2="20" {...sp} opacity={0.6} />
          <line x1="15.5" y1="4" x2="15.5" y2="20" {...sp} opacity={0.6} />
          <line x1="3" y1="14.5" x2="21" y2="14.5" {...sp} opacity={0.6} />
        </>
      )}
      {name === "frame" && (
        <>
          {/* Artboard with its title label — mirrors how a frame renders on
              canvas (name above the rect), unmistakable for image/video. */}
          <line x1="3.5" y1="4" x2="10" y2="4" {...sp} strokeWidth={2} />
          <rect x="3" y="7.5" width="18" height="13.5" rx="1.5" {...sp} fill="none" />
        </>
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
          <path
            d="m7 20.5-4.3-4.3c-1-1-1-2.5 0-3.4l8.6-8.6c1-1 2.5-1 3.4 0l5.1 5.1c1 1 1 2.5 0 3.4l-7.8 7.8"
            {...sp}
            fill="none"
          />
          <path d="M21.5 20.5H7" {...sp} />
          <path d="m5.3 10.4 8.8 8.8" {...sp} />
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
      {name === "settings" && (
        <>
          <circle cx="12" cy="12" r="3.2" {...sp} />
          <path
            d="M12 2.8l1.2 2.6a6.8 6.8 0 0 1 2.4 1l2.8-.8 1.6 2.8-2 2a6.9 6.9 0 0 1 0 2.7l2 2-1.6 2.8-2.8-.8a6.8 6.8 0 0 1-2.4 1L12 21.2l-1.2-2.6a6.8 6.8 0 0 1-2.4-1l-2.8.8L4 15.6l2-2a6.9 6.9 0 0 1 0-2.7l-2-2 1.6-2.8 2.8.8a6.8 6.8 0 0 1 2.4-1z"
            {...sp}
          />
        </>
      )}
    </svg>
  );
}

/** Gear popover with the board-level canvas settings (grid, guides, free
 *  edges, paper) — moved out of the node inspector, where board settings
 *  crowded every selection. */
function SettingsPicker({ engine }: { engine: SpatialEngine }) {
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
                borderRadius: theme.panelBorderRadius,
                padding: 12,
                zIndex: 99999,
                boxShadow: theme.panelShadow,
                width: 248,
                maxWidth: "calc(100vw - 16px)",
                maxHeight: "min(480px, calc(100dvh - 16px))",
                overflowY: "auto",
                color: theme.text,
                fontSize: 11,
                fontFamily: theme.uiFontFamily ?? SB_UI_FONT,
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
                  paddingBottom: 8,
                }}
              >
                {labels.inspectorCanvas}
              </div>
              <CanvasSettings engine={engine} />
            </div>,
            document.body
          );
        })()
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        title={labels.inspectorCanvas}
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
        <ToolIcon name="settings" />
      </button>
      {popoverContent}
    </>
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
              fontFamily: theme.uiFontFamily ?? SB_UI_FONT,
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
                fontFamily: theme.uiFontFamily ?? SB_UI_FONT,
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

export default function ToolStrip({ engine, gifApiBaseUrl, tools, registry }: { engine: SpatialEngine; gifApiBaseUrl?: string; tools?: ToolKey[]; registry?: NodeTypeRegistry }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  // Toolbar visibility: the host `tools` allowlist (undefined ⇒ all) AND, for
  // node-creating tools, whether that node type is registered.
  const show = (key: ToolKey) => (!tools || tools.includes(key)) && modeAvailable(key, registry);
  const anyPicker = show("paper") || show("template") || show("library") || show("mermaid") || (!!gifApiBaseUrl && show("gif")) || show("settings");
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

  const modes = TOOLS.filter((t) => show(t.mode)).map((t) => ({
    ...t,
    label: labels[t.labelKey],
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
        const isActive = mode === m.mode && !(m.mode === "select" && lassoActive);
        return (
        <button
          key={m.mode}
          title={`${m.label} (${m.shortcut.toUpperCase()})`}
          onClick={() => {
            if (lassoActive) {
              engine.toggleLassoSelect();
              setLassoActive(false);
            }
            engine.setMode(m.mode);
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
          <ToolIcon name={m.mode} textGlyph={labels.toolTextGlyph} />
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
            {m.shortcut.toUpperCase()}
          </span>
        </button>
        );
      })}

      {show("lasso") && (
      <>
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
      </>
      )}

      {anyPicker && (
        <div style={{ width: 28, height: 1, background: theme.separator, margin: "8px 0" }} />
      )}

      {/* Board background picker */}
      {show("paper") && <PaperPicker engine={engine} background={background} />}

      {/* Template picker */}
      {show("template") && <TemplatePicker engine={engine} />}

      {/* Library picker */}
      {show("library") && <LibraryPicker engine={engine} />}

      {/* Mermaid sketch importer */}
      {show("mermaid") && <MermaidPicker engine={engine} />}

      {/* GIF search */}
      {gifApiBaseUrl && show("gif") && <GifPicker engine={engine} baseUrl={gifApiBaseUrl} />}

      {/* Canvas settings (grid, guides, free edges, paper) */}
      {show("settings") && <SettingsPicker engine={engine} />}
    </div>
  );
}

/** Compact HORIZONTAL mode cluster for hosts that seat the tools in the
 *  BottomBar instead of the side rail (SpatialBoard `toolsInBottomBar`).
 *  Same MODE_KEYS / icons / active semantics as the rail, rendered as one
 *  row of BottomBar-sized (32px) buttons. The bar provides the pill chrome. */
export function ModeCluster({ engine, tools, registry, size = 32 }: { engine: SpatialEngine; tools?: ToolKey[]; registry?: NodeTypeRegistry; size?: number }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const show = (key: ToolKey) => (!tools || tools.includes(key)) && modeAvailable(key, registry);
  const [mode, setMode] = useState<Mode>(engine.mode);
  const [lassoActive, setLassoActive] = useState(engine.lassoSelect);

  useEffect(() => {
    const handleMode = () => setMode(engine.mode);
    const handleLasso = () => setLassoActive(engine.lassoSelect);
    engine.on("mode", handleMode);
    engine.on("lassoToggle", handleLasso);
    return () => {
      engine.off("mode", handleMode);
      engine.off("lassoToggle", handleLasso);
    };
  }, [engine]);

  const modes = TOOLS.filter((t) => show(t.mode)).map((t) => ({
    ...t,
    label: labels[t.labelKey],
  }));

  return (
    <>
      {modes.map((m) => {
        const isActive = mode === m.mode && !(m.mode === "select" && lassoActive);
        return (
          <button
            key={m.mode}
            title={`${m.label} (${m.shortcut.toUpperCase()})`}
            onClick={() => {
              if (lassoActive) {
                engine.toggleLassoSelect();
                setLassoActive(false);
              }
              engine.setMode(m.mode);
            }}
            style={{
              ...btnBase,
              width: size,
              height: size,
              borderRadius: theme.controlBorderRadius,
              background: isActive ? theme.controlBgActive : "transparent",
              color: theme.text,
              position: "relative",
            }}
          >
            {/* No shortcut letter badge here — at bar size it reads cramped;
                the tooltip carries the shortcut, like the bar's other buttons. */}
            <ToolIcon name={m.mode} size={Math.round(size / 2)} textGlyph={labels.toolTextGlyph} />
          </button>
        );
      })}
    </>
  );
}
