import { useState, useEffect, useRef, useCallback } from "react";
import type { SpatialEngine, BoardBackground } from "../../engine/SpatialEngine";
import type { Mode, ToolKey } from "../../engine/types";
import type { NodeTypeRegistry } from "../../nodes/registry";
import { TOOLS, modeAvailable } from "../../tools";
import { MOBILE_TOOLBAR_CLEARANCE, TOUCH_PROPS_VARS } from "../sidebar/styles";
import { ToolIcon } from "../sidebar/ToolStrip";
import CanvasSettings from "../sidebar/CanvasSettings";
import { useSBTheme } from "../sidebar/ThemeContext";
import { useSBI18n } from "../contexts/LocalizationContext";
import { PAPER_TYPES, type PaperGroup } from "../paper-types";
import { TEMPLATES } from "../../templates/index";
import { screenToCanvas } from "../../engine/viewport";
import LibraryPanel from "../sidebar/LibraryPanel";
import LibraryDirectory from "../sidebar/LibraryDirectory";
import GifSearchPanel from "../sidebar/GifSearchPanel";
import MermaidPanel from "../sidebar/MermaidPanel";

/** Tools seated directly on the bar; everything else lives in the ⋯ menu. */
const PRIMARY_KEYS: Mode[] = ["select", "hand", "draw", "shape", "text", "sticky"];

const btnBase: React.CSSProperties = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  background: "transparent",
  touchAction: "manipulation",
};

function MoreIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="1.8" fill="currentColor" />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      <circle cx="19" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 120ms ease" }}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Excalidraw-style bottom toolbar for compact (phone / narrow-embed) layouts.
 * A centered pill of primary creation tools + a ⋯ overflow menu holding the
 * secondary tools, lasso, and the board pickers (paper, templates, library,
 * mermaid, GIFs). Rendered by SpatialBoard INSTEAD of the vertical side rail
 * when the container is narrower than COMPACT_BREAKPOINT.
 */
export default function MobileToolbar({
  engine,
  registry,
  tools,
  gifApiBaseUrl,
}: {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  tools?: ToolKey[];
  gifApiBaseUrl?: string;
}) {
  const theme = useSBTheme();
  const { labels, isRTL } = useSBI18n();
  const show = (key: ToolKey) => (!tools || tools.includes(key)) && modeAvailable(key, registry);

  const [mode, setMode] = useState<Mode>(engine.mode);
  const [lassoActive, setLassoActive] = useState(engine.lassoSelect);
  const [background, setBackground] = useState<BoardBackground>(engine.boardBackground);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<"paper" | "template" | "settings" | null>(null);
  const [panel, setPanel] = useState<"library" | "mermaid" | "gif" | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMode = () => setMode(engine.mode);
    const handleLasso = () => setLassoActive(engine.lassoSelect);
    const handleBackground = () => setBackground(engine.boardBackground);
    engine.on("mode", handleMode);
    engine.on("lassoToggle", handleLasso);
    engine.on("background", handleBackground);
    return () => {
      engine.off("mode", handleMode);
      engine.off("lassoToggle", handleLasso);
      engine.off("background", handleBackground);
    };
  }, [engine]);

  // Close the menu on outside pointer-down (capture — canvas stops propagation).
  useEffect(() => {
    if (!menuOpen) return;
    const doc = menuRef.current?.ownerDocument ?? document;
    const handle = (e: PointerEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        moreBtnRef.current && !moreBtnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
        setExpanded(null);
      }
    };
    doc.addEventListener("pointerdown", handle, true);
    return () => doc.removeEventListener("pointerdown", handle, true);
  }, [menuOpen]);

  const activateMode = useCallback(
    (m: Mode) => {
      if (lassoActive) {
        engine.toggleLassoSelect();
        setLassoActive(false);
      }
      engine.setMode(m);
    },
    [engine, lassoActive],
  );

  const openPanel = useCallback((which: "library" | "mermaid" | "gif") => {
    if (moreBtnRef.current) setAnchorRect(moreBtnRef.current.getBoundingClientRect());
    setMenuOpen(false);
    setExpanded(null);
    setPanel(which);
  }, []);

  const allTools = TOOLS.filter((t) => show(t.mode)).map((t) => ({ ...t, label: labels[t.labelKey] as string }));
  const primary = allTools.filter((t) => PRIMARY_KEYS.includes(t.mode));
  const overflowTools = allTools.filter((t) => !PRIMARY_KEYS.includes(t.mode));

  const anyPicker =
    show("paper") || show("template") || show("library") || show("mermaid") || (!!gifApiBaseUrl && show("gif"));
  // The ⋯ button mirrors the active overflow tool so the current mode is
  // always visible on the bar (Excalidraw does the same on mobile).
  const activeOverflowTool = overflowTools.find((t) => t.mode === mode);
  const hasOverflow = overflowTools.length > 0 || show("lasso") || anyPicker;

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
  const activePaper = PAPER_TYPES.find((p) => p.key === background) ?? PAPER_TYPES[1];

  const toolBtn = (active: boolean): React.CSSProperties => ({
    ...btnBase,
    width: 44,
    height: 44,
    borderRadius: theme.controlBorderRadius,
    background: active ? theme.controlBgActive : "transparent",
    color: theme.text,
    flexShrink: 0,
  });

  const menuRow: React.CSSProperties = {
    ...btnBase,
    width: "100%",
    minHeight: 44,
    justifyContent: "flex-start",
    gap: 12,
    padding: "0 12px",
    borderRadius: theme.controlBorderRadius,
    color: theme.text,
    fontSize: 13,
    fontFamily: "inherit",
    textAlign: "start",
  };

  const sectionHeader: React.CSSProperties = {
    fontSize: 10,
    fontWeight: 600,
    color: theme.textMuted,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "8px 12px 2px",
    userSelect: "none",
  };

  return (
    <>
      {/* ⋯ overflow menu — sits above the bar, start/end-aligned per direction */}
      {menuOpen && (
        <div
          ref={menuRef}
          data-sb-mobile-menu
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: `calc(${MOBILE_TOOLBAR_CLEARANCE}px + env(safe-area-inset-bottom, 0px))`,
            [isRTL ? "left" : "right"]: 8,
            width: 252,
            maxWidth: "calc(100% - 16px)",
            maxHeight: "min(55dvh, 430px)",
            overflowY: "auto",
            touchAction: "pan-y",
            background: theme.panelBg,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.panelBorderRadius,
            boxShadow: theme.panelShadow,
            padding: 6,
            zIndex: 10020,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overscrollBehavior: "contain",
          }}
        >
          {overflowTools.map((t) => {
            const isActive = mode === t.mode && !(t.mode === "select" && lassoActive);
            return (
              <button
                key={t.mode}
                style={{ ...menuRow, background: isActive ? theme.controlBgActive : "transparent" }}
                onClick={() => {
                  activateMode(t.mode);
                  setMenuOpen(false);
                  setExpanded(null);
                }}
              >
                <ToolIcon name={t.mode} textGlyph={labels.toolTextGlyph} />
                {t.label}
              </button>
            );
          })}
          {show("lasso") && (
            <button
              style={{ ...menuRow, background: lassoActive ? theme.controlBgActive : "transparent" }}
              onClick={() => {
                if (lassoActive) {
                  engine.toggleLassoSelect();
                  setLassoActive(false);
                } else {
                  engine.setMode("select");
                  if (!engine.lassoSelect) engine.toggleLassoSelect();
                  setLassoActive(true);
                }
                setMenuOpen(false);
                setExpanded(null);
              }}
            >
              <ToolIcon name="lasso" />
              {labels.toolLassoSelect}
            </button>
          )}

          {anyPicker && (overflowTools.length > 0 || show("lasso")) && (
            <div style={{ height: 1, background: theme.separator, margin: "4px 8px" }} />
          )}

          {/* Paper — inline accordion (no nested popovers on a phone) */}
          {show("paper") && (
            <>
              <button
                style={menuRow}
                onClick={() => setExpanded((v) => (v === "paper" ? null : "paper"))}
              >
                <ToolIcon name="paper" />
                <span style={{ flex: 1 }}>{labels.paperType}</span>
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: activePaper.swatchColor,
                    border: `1px solid ${theme.border}`,
                    flexShrink: 0,
                  }}
                />
                <Chevron open={expanded === "paper"} />
              </button>
              {expanded === "paper" &&
                (["light", "dark", "textured"] as PaperGroup[]).map((group) => {
                  const items = PAPER_TYPES.filter((p) => p.group === group);
                  if (items.length === 0) return null;
                  return (
                    <div key={group}>
                      <div style={sectionHeader}>{groupLabels[group]}</div>
                      {items.map((paper) => (
                        <button
                          key={paper.key}
                          style={{
                            ...menuRow,
                            minHeight: 40,
                            background: background === paper.key ? theme.controlBgActive : "transparent",
                          }}
                          onClick={() => engine.setBoardBackground(paper.key)}
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
            </>
          )}

          {/* Templates — inline accordion */}
          {show("template") && (
            <>
              <button
                style={menuRow}
                onClick={() => setExpanded((v) => (v === "template" ? null : "template"))}
              >
                <ToolIcon name="template" />
                <span style={{ flex: 1 }}>{labels.templatesTitle}</span>
                <Chevron open={expanded === "template"} />
              </button>
              {expanded === "template" &&
                TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    style={{ ...menuRow, minHeight: 40 }}
                    onClick={() => {
                      const doc = menuRef.current?.ownerDocument;
                      const win = doc?.defaultView ?? window;
                      const pt = screenToCanvas(engine.viewport, win.innerWidth / 2, win.innerHeight / 2);
                      engine.applyTemplate(t.id, pt.x, pt.y);
                      setMenuOpen(false);
                      setExpanded(null);
                    }}
                  >
                    {t.label}
                  </button>
                ))}
            </>
          )}

          {show("library") && (
            <button style={menuRow} onClick={() => openPanel("library")}>
              <ToolIcon name="library" />
              {labels.librariesTitle}
            </button>
          )}
          {show("mermaid") && (
            <button style={menuRow} onClick={() => openPanel("mermaid")}>
              <ToolIcon name="mermaid" />
              {labels.mermaidSketchTitle}
            </button>
          )}
          {gifApiBaseUrl && show("gif") && (
            <button style={menuRow} onClick={() => openPanel("gif")}>
              <ToolIcon name="gif" />
              {labels.gifSearchTitle}
            </button>
          )}

          {/* Canvas settings — inline accordion at touch density */}
          {show("settings") && (
            <>
              <button
                style={menuRow}
                onClick={() => {
                  setExpanded((v) => {
                    const next = v === "settings" ? null : "settings";
                    if (next) {
                      // The settings sit at the menu's end — bring them on-screen
                      requestAnimationFrame(() => {
                        menuRef.current?.scrollTo({ top: menuRef.current.scrollHeight, behavior: "smooth" });
                      });
                    }
                    return next;
                  });
                }}
              >
                <ToolIcon name="settings" />
                <span style={{ flex: 1 }}>{labels.inspectorCanvas}</span>
                <Chevron open={expanded === "settings"} />
              </button>
              {expanded === "settings" && (
                <div style={{ padding: "4px 12px 10px", ...TOUCH_PROPS_VARS }}>
                  <CanvasSettings engine={engine} />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* The bar itself */}
      <div
        data-sb-mobile-toolbar
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          bottom: "calc(10px + env(safe-area-inset-bottom, 0px))",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 4,
          maxWidth: "calc(100% - 12px)",
          overflowX: "auto",
          background: theme.panelBg,
          border: `1px solid ${theme.border}`,
          borderRadius: theme.panelBorderRadius,
          boxShadow: theme.panelShadow,
          zIndex: 10000,
        }}
      >
        {primary.map((t) => {
          const isActive = mode === t.mode && !(t.mode === "select" && lassoActive);
          return (
            <button
              key={t.mode}
              title={t.label}
              aria-label={t.label}
              style={toolBtn(isActive)}
              onClick={() => activateMode(t.mode)}
            >
              <ToolIcon name={t.mode} size={20} textGlyph={labels.toolTextGlyph} />
            </button>
          );
        })}
        {hasOverflow && (
          <button
            ref={moreBtnRef}
            title={labels.moreTools ?? "More"}
            aria-label={labels.moreTools ?? "More"}
            style={toolBtn(menuOpen || !!activeOverflowTool || lassoActive)}
            onClick={() => {
              setMenuOpen((v) => !v);
              setExpanded(null);
            }}
          >
            {activeOverflowTool ? (
              <ToolIcon name={activeOverflowTool.mode} size={20} textGlyph={labels.toolTextGlyph} />
            ) : lassoActive ? (
              <ToolIcon name="lasso" size={20} />
            ) : (
              <MoreIcon />
            )}
          </button>
        )}
      </div>

      {/* Picker panels — anchored to the ⋯ button; the fitter clamps on-screen */}
      {show("library") && (
        <LibraryPanel
          engine={engine}
          open={panel === "library"}
          onClose={() => setPanel(null)}
          triggerRect={anchorRect}
          onBrowseDirectory={() => setDirectoryOpen(true)}
        />
      )}
      {directoryOpen && (
        <LibraryDirectory
          onClose={() => setDirectoryOpen(false)}
          onInstalled={() => {
            setPanel(null);
            setTimeout(() => setPanel("library"), 100);
          }}
        />
      )}
      {show("mermaid") && (
        <MermaidPanel
          engine={engine}
          open={panel === "mermaid"}
          onClose={() => setPanel(null)}
          triggerRect={anchorRect}
        />
      )}
      {gifApiBaseUrl && show("gif") && (
        <GifSearchPanel
          engine={engine}
          open={panel === "gif"}
          onClose={() => setPanel(null)}
          triggerRect={anchorRect}
          baseUrl={gifApiBaseUrl}
        />
      )}
    </>
  );
}
