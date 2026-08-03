import { useState, useEffect, useRef } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { ToolKey } from "../../engine/types";
import { useSBTheme } from "../sidebar/ThemeContext";
import { useSBI18n } from "../contexts/LocalizationContext";
import { MOBILE_TOOLBAR_CLEARANCE } from "../sidebar/styles";

const ZOOM_STEPS = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];

function zoomIn(engine: SpatialEngine) {
  const cur = engine.viewport.zoom;
  const next = ZOOM_STEPS.find((s) => s > cur + 0.001) ?? ZOOM_STEPS[ZOOM_STEPS.length - 1];
  engine.viewport.zoom = next;
  engine.pan(0, 0);
}

function zoomOut(engine: SpatialEngine) {
  const cur = engine.viewport.zoom;
  const next = [...ZOOM_STEPS].reverse().find((s) => s < cur - 0.001) ?? ZOOM_STEPS[0];
  engine.viewport.zoom = next;
  engine.pan(0, 0);
}

const pillBase: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
};

const btn: React.CSSProperties = {
  border: "none",
  background: "transparent",
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

function Icon({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === "minus" && <path d="M5 12h14" {...sp} />}
      {name === "plus" && (
        <>
          <path d="M12 5v14" {...sp} />
          <path d="M5 12h14" {...sp} />
        </>
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
      {name === "fit" && (
        <>
          <path d="M15 3h6v6M9 21H3v-6" {...sp} />
          <path d="M21 3l-7 7M3 21l7-7" {...sp} />
        </>
      )}
      {name === "play" && (
        <path d="M6 4l14 8-14 8z" fill="currentColor" />
      )}
      {name === "slides" && (
        <>
          <rect x="2" y="6" width="20" height="12" rx="1" {...sp} />
          <path d="M6 6V18M18 6V18" {...sp} />
          <path d="M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4" {...sp} />
        </>
      )}
      {name === "gauge" && (
        <>
          <path d="M4 15a8 8 0 1 1 16 0" {...sp} />
          <path d="M12 15l4-4" {...sp} />
          <circle cx="12" cy="15" r="1.5" fill="currentColor" />
        </>
      )}
      {name === "minimap" && (
        <>
          <rect x="3.5" y="3.5" width="17" height="17" rx="2" {...sp} fill="none" />
          <rect
            x="11.5"
            y="6.5"
            width="9"
            height="7"
            rx="1"
            fill="currentColor"
            fillOpacity={0.4}
            stroke="currentColor"
            strokeWidth={1.25}
          />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="11" cy="11" r="6" {...sp} />
          <path d="M16 16l5 5" {...sp} />
        </>
      )}
      {name === "home" && (
        <>
          <path d="M3 12l9-8 9 8" {...sp} fill="none" />
          <path d="M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7" {...sp} fill="none" />
        </>
      )}
      {name === "bookmark" && (
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" {...sp} fill="none" />
      )}
      {name === "bookmark-fill" && (
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
      )}
      {name === "arrange" && (
        <>
          <rect x="3" y="4" width="7" height="6" rx="1" {...sp} />
          <rect x="14" y="4" width="7" height="6" rx="1" {...sp} />
          <rect x="14" y="14" width="7" height="6" rx="1" {...sp} />
          <path d="M6.5 10v5.5H14" {...sp} />
        </>
      )}
      {name === "more" && (
        <>
          <circle cx="5" cy="12" r="1.8" fill="currentColor" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          <circle cx="19" cy="12" r="1.8" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

interface BottomBarProps {
  engine: SpatialEngine;
  /** Toolbar-visibility allowlist (undefined ⇒ all controls). When it omits
   *  `frame` the present + slides-panel controls are hidden (a graph has no
   *  slides); zoom, fit, minimap, and undo/redo always stay. */
  tools?: ToolKey[];
  /** Compact (mobile/narrow-embed) layout: zoom + undo/redo pills and a ⋯
   *  menu holding the rest, stacked above the MobileToolbar tool row. */
  compact?: boolean;
  /** Compact only: true when the MobileToolbar renders below this bar (the
   *  bar raises to clear it). False e.g. for read-only viewers (no tool row). */
  raised?: boolean;
  framesPanelOpen?: boolean;
  onToggleFramesPanel?: () => void;
  showMinimap?: boolean;
  onToggleMinimap?: () => void;
  showPerfOverlay?: boolean;
  onTogglePerfOverlay?: () => void;
  /** Host-supplied control rendered as the FIRST segment of the bar (e.g. the
   *  workflow "Add node" button) so it reads as part of the toolbar rather than a
   *  floating overlay. Styles/behaviour are the host's; the bar just seats it. */
  leadingSlot?: React.ReactNode;
  /** Mode-tool buttons seated as a pill segment right after `leadingSlot`
   *  (SpatialBoard `toolsInBottomBar` — replaces the vertical side rail). */
  toolsSlot?: React.ReactNode;
}

export default function BottomBar({
  engine,
  tools,
  compact = false,
  raised = false,
  framesPanelOpen,
  onToggleFramesPanel,
  showMinimap,
  onToggleMinimap,
  showPerfOverlay,
  onTogglePerfOverlay,
  leadingSlot,
  toolsSlot,
}: BottomBarProps) {
  const theme = useSBTheme();
  const { labels, isRTL } = useSBI18n();
  // Slides/present are canvas-only chrome; hidden when `frame` is not allowed.
  const showSlides = !tools || tools.includes("frame");
  const [zoom, setZoom] = useState(engine.viewport.zoom);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [hasOriginView, setHasOriginView] = useState(() => engine.originView != null);
  const [canArrangeBoard, setCanArrangeBoard] = useState(false);
  const [frameCount, setFrameCount] = useState(
    () => engine.getAllNodes().filter((n) => n.type === "frame").length,
  );
  // Compact ⋯ menu (fit / search / origin / present / slides / minimap / …)
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const doc = menuRef.current?.ownerDocument ?? document;
    const handle = (e: PointerEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        menuBtnRef.current && !menuBtnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    doc.addEventListener("pointerdown", handle, true);
    return () => doc.removeEventListener("pointerdown", handle, true);
  }, [menuOpen]);

  useEffect(() => {
    const handleViewport = () => setZoom(engine.viewport.zoom);
    const handleHistory = () => {
      setCanUndo(engine.canUndo());
      setCanRedo(engine.canRedo());
    };
    const syncBoard = () => {
      setFrameCount(engine.getAllNodes().filter((n) => n.type === "frame").length);
      setHasOriginView(engine.originView != null);
      const arrangeable = engine
        .getAllNodes()
        .filter((n) => n.type !== "edge" && !n.locked).length;
      setCanArrangeBoard(arrangeable >= 2 && !engine.readOnly);
    };
    syncBoard();
    engine.on("viewport", handleViewport);
    engine.on("history", handleHistory);
    engine.on("change", syncBoard);
    engine.on("node:create", syncBoard);
    engine.on("node:delete", syncBoard);
    return () => {
      engine.off("viewport", handleViewport);
      engine.off("history", handleHistory);
      engine.off("change", syncBoard);
      engine.off("node:create", syncBoard);
      engine.off("node:delete", syncBoard);
    };
  }, [engine]);

  const pillBg = theme.panelBg;
  const border = `1px solid ${theme.border}`;
  const pill: React.CSSProperties = {
    ...pillBase,
    borderRadius: theme.panelBorderRadius + 2,
  };
  const sep: React.CSSProperties = {
    width: 1,
    height: 20,
    background: theme.separator,
    flexShrink: 0,
  };

  if (compact) {
    const barBottom = raised
      ? `calc(${MOBILE_TOOLBAR_CLEARANCE}px + env(safe-area-inset-bottom, 0px))`
      : "calc(12px + env(safe-area-inset-bottom, 0px))";
    const menuRow: React.CSSProperties = {
      ...btn,
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
    const closeAnd = (fn: () => void) => () => {
      setMenuOpen(false);
      fn();
    };
    return (
      <>
        {menuOpen && (
          <div
            ref={menuRef}
            data-sb-bar-menu
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              bottom: `calc(${barBottom} + 48px)`,
              [isRTL ? "left" : "right"]: 8,
              width: 232,
              maxWidth: "calc(100% - 16px)",
              maxHeight: "min(55dvh, 430px)",
              overflowY: "auto",
              touchAction: "pan-y",
              overscrollBehavior: "contain",
              background: pillBg,
              border,
              borderRadius: theme.panelBorderRadius,
              boxShadow: theme.panelShadow,
              padding: 6,
              zIndex: 10020,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <button style={menuRow} onClick={closeAnd(() => engine.fitToContent())}>
              <Icon name="fit" /> {labels.fitToContent}
            </button>
            <button
              style={menuRow}
              onClick={closeAnd(() => document.dispatchEvent(new CustomEvent("sb:search-open")))}
            >
              <Icon name="search" /> {labels.canvasSearchOpen}
            </button>
            <button
              style={{ ...menuRow, color: hasOriginView ? theme.accentColor : theme.text }}
              onClick={() => {
                if (hasOriginView) {
                  engine.clearOriginView();
                  setHasOriginView(false);
                } else {
                  engine.setOriginView();
                  setHasOriginView(true);
                }
              }}
            >
              <Icon name={hasOriginView ? "bookmark-fill" : "bookmark"} />
              {hasOriginView ? labels.clearOriginView : labels.saveOriginView}
            </button>
            {hasOriginView && (
              <button style={menuRow} onClick={closeAnd(() => engine.goToOriginView())}>
                <Icon name="home" /> {labels.goToOriginView}
              </button>
            )}
            {showSlides && (
              <button style={menuRow} onClick={closeAnd(() => engine.enterPresentation())}>
                <Icon name="play" /> {labels.presentSlides}
              </button>
            )}
            {showSlides && onToggleFramesPanel && (
              <button
                style={{ ...menuRow, background: framesPanelOpen ? theme.controlBgActive : "transparent" }}
                onClick={closeAnd(onToggleFramesPanel)}
              >
                <Icon name="slides" />
                <span style={{ flex: 1 }}>{labels.toggleSlidesPanel}</span>
                {frameCount > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: theme.accentColor }}>{frameCount}</span>
                )}
              </button>
            )}
            {onToggleMinimap && (
              <button
                style={{ ...menuRow, color: showMinimap ? theme.accentColor : theme.text }}
                onClick={onToggleMinimap}
              >
                <Icon name="minimap" /> {labels.toggleMinimap}
              </button>
            )}
            {canArrangeBoard && (
              <button
                style={menuRow}
                onClick={closeAnd(() =>
                  engine.arrangeAllNodes(engine.measuredHeights, engine.viewport.zoom),
                )}
              >
                <Icon name="arrange" /> {labels.actionArrangeBoard}
              </button>
            )}
            {onTogglePerfOverlay && (
              <button
                style={{ ...menuRow, color: showPerfOverlay ? theme.accentColor : theme.text }}
                onClick={onTogglePerfOverlay}
              >
                <Icon name="gauge" /> {labels.togglePerformanceOverlay}
              </button>
            )}
          </div>
        )}
        <div
          data-sb-bottombar
          style={{
            position: "absolute",
            bottom: barBottom,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 6,
            zIndex: 10000,
            pointerEvents: "auto",
            maxWidth: "calc(100% - 12px)",
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div data-sb-bar-zoom style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
            <button
              title={labels.zoomOut}
              onClick={() => zoomOut(engine)}
              style={{ ...btn, width: 40, height: 40, color: theme.text }}
            >
              <Icon name="minus" />
            </button>
            <div style={sep} />
            <button
              title={labels.resetZoom}
              onClick={() => {
                engine.viewport.zoom = 1;
                engine.pan(0, 0);
              }}
              style={{
                ...btn,
                minWidth: 46,
                height: 40,
                color: theme.text,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
                padding: "0 4px",
              }}
            >
              {Math.round(zoom * 100)}%
            </button>
            <div style={sep} />
            <button
              title={labels.zoomIn}
              onClick={() => zoomIn(engine)}
              style={{ ...btn, width: 40, height: 40, color: theme.text }}
            >
              <Icon name="plus" />
            </button>
          </div>

          <div data-sb-bar-history style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
            <button
              title={labels.undo}
              onClick={() => engine.undo()}
              disabled={!canUndo}
              style={{ ...btn, width: 40, height: 40, color: canUndo ? theme.text : theme.textFaint }}
            >
              <Icon name="undo" />
            </button>
            <div style={sep} />
            <button
              title={labels.redo}
              onClick={() => engine.redo()}
              disabled={!canRedo}
              style={{ ...btn, width: 40, height: 40, color: canRedo ? theme.text : theme.textFaint }}
            >
              <Icon name="redo" />
            </button>
          </div>

          <div data-sb-bar-more style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
            <button
              ref={menuBtnRef}
              title={labels.moreTools}
              aria-label={labels.moreTools}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                ...btn,
                width: 40,
                height: 40,
                color: theme.text,
                background: menuOpen ? theme.controlBgActive : "transparent",
              }}
            >
              <Icon name="more" />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      data-sb-bottombar
      style={{
        position: "absolute",
        bottom: 12,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 8,
        zIndex: 9999,
        pointerEvents: "auto",
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Host leading control (e.g. workflow "Add node") — seated as the first
          segment so it reads as part of the bar. */}
      {leadingSlot}

      {/* Mode tools (toolsInBottomBar) — the side rail's buttons as a pill. */}
      {toolsSlot && (
        <div data-sb-bar-tools style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
          {toolsSlot}
        </div>
      )}

      {/* Zoom controls */}
      <div data-sb-bar-zoom style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
        <button
          title={labels.zoomOut}
          onClick={() => zoomOut(engine)}
          style={{ ...btn, width: 40, height: 40, color: theme.text }}
        >
          <Icon name="minus" />
        </button>
        <div style={sep} />
        <button
          title={labels.resetZoom}
          onClick={() => {
            engine.viewport.zoom = 1;
            engine.pan(0, 0);
          }}
          style={{
            ...btn,
            minWidth: 48,
            height: 40,
            color: theme.text,
            fontSize: 11,
            fontWeight: 600,
            fontFamily: "inherit",
            padding: "0 4px",
          }}
        >
          {Math.round(zoom * 100)}%
        </button>
        <div style={sep} />
        <button
          title={labels.zoomIn}
          onClick={() => zoomIn(engine)}
          style={{ ...btn, width: 40, height: 40, color: theme.text }}
        >
          <Icon name="plus" />
        </button>
      </div>

      {/* Fit to content + Origin view */}
      <div data-sb-bar-nav style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
        <button
          title={labels.fitToContent}
          onClick={() => engine.fitToContent()}
          style={{ ...btn, width: 40, height: 40, color: theme.text }}
        >
          <Icon name="fit" />
        </button>
        <div style={sep} />
        <button
          title={labels.canvasSearchOpen}
          onClick={() => {
            document.dispatchEvent(new CustomEvent("sb:search-open"));
          }}
          style={{
            ...btn,
            width: 32,
            height: 40,
            color: theme.textMuted,
          }}
        >
          <Icon name="search" />
        </button>
        <div style={sep} />
        <button
          title={hasOriginView ? labels.clearOriginView : labels.saveOriginView}
          onClick={() => {
            if (hasOriginView) {
              engine.clearOriginView();
              setHasOriginView(false);
            } else {
              engine.setOriginView();
              setHasOriginView(true);
            }
          }}
          style={{ ...btn, width: 40, height: 40, color: hasOriginView ? theme.accentColor : theme.textFaint }}
        >
          <Icon name={hasOriginView ? "bookmark-fill" : "bookmark"} />
        </button>
        <div style={sep} />
        <button
          title={labels.goToOriginView}
          onClick={() => { if (hasOriginView) engine.goToOriginView(); }}
          disabled={!hasOriginView}
          style={{ ...btn, width: 40, height: 40, color: hasOriginView ? theme.text : theme.textFaint }}
        >
          <Icon name="home" />
        </button>
      </div>

      {/* Present & Slides */}
      <div data-sb-bar-present style={{ ...pill, overflow: "visible", background: pillBg, border, boxShadow: theme.panelShadow }}>
        {showSlides && (
        <button
          title={labels.presentSlides}
          onClick={() => engine.enterPresentation()}
          style={{ ...btn, width: 40, height: 40, color: theme.text }}
        >
          <Icon name="play" />
        </button>
        )}
        {showSlides && onToggleFramesPanel && (
          <>
            <div style={sep} />
            <button
              title={labels.toggleSlidesPanel}
              onClick={onToggleFramesPanel}
              style={{
                ...btn,
                width: 32,
                height: 40,
                color: framesPanelOpen ? theme.text : theme.textMuted,
                position: "relative",
              }}
            >
              <Icon name="slides" />
              {frameCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                    minWidth: 14,
                    height: 14,
                    borderRadius: 7,
                    background: theme.accentColor,
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    lineHeight: "14px",
                    textAlign: "center",
                    padding: "0 3px",
                    pointerEvents: "none",
                  }}
                >
                  {frameCount}
                </span>
              )}
            </button>
          </>
        )}
        {onToggleMinimap && (
          <>
            {showSlides && <div style={sep} />}
            <button
              title={labels.toggleMinimap}
              onClick={onToggleMinimap}
              style={{
                ...btn,
                width: 32,
                height: 40,
                color: showMinimap ? theme.accentColor : theme.textMuted,
              }}
            >
              <Icon name="minimap" />
            </button>
          </>
        )}
        <>
          {(showSlides || onToggleMinimap) && <div style={sep} />}
          <button
            title={labels.actionArrangeBoard}
            disabled={!canArrangeBoard}
            onClick={() =>
              engine.arrangeAllNodes(engine.measuredHeights, engine.viewport.zoom)
            }
            style={{
              ...btn,
              width: 32,
              height: 40,
              color: canArrangeBoard ? theme.textMuted : theme.textFaint,
              cursor: canArrangeBoard ? "pointer" : "default",
            }}
          >
            <Icon name="arrange" />
          </button>
        </>
        {onTogglePerfOverlay && (
          <>
            <div style={sep} />
            <button
              title={labels.togglePerformanceOverlay}
              onClick={onTogglePerfOverlay}
              style={{
                ...btn,
                width: 32,
                height: 40,
                color: showPerfOverlay ? theme.accentColor : theme.textMuted,
              }}
            >
              <Icon name="gauge" />
            </button>
          </>
        )}
      </div>

      {/* Undo / Redo */}
      <div data-sb-bar-history style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
        <button
          title={labels.undo}
          onClick={() => engine.undo()}
          disabled={!canUndo}
          style={{ ...btn, width: 40, height: 40, color: canUndo ? theme.text : theme.textFaint }}
        >
          <Icon name="undo" />
        </button>
        <div style={sep} />
        <button
          title={labels.redo}
          onClick={() => engine.redo()}
          disabled={!canRedo}
          style={{ ...btn, width: 40, height: 40, color: canRedo ? theme.text : theme.textFaint }}
        >
          <Icon name="redo" />
        </button>
      </div>
    </div>
  );
}
