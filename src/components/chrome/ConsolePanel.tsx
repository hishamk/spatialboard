import { useEffect, useRef, useState } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { SpatialNode, ToolKey } from "../../engine/types";
import type { NodeTypeRegistry } from "../../nodes/registry";
import { useSBTheme } from "../sidebar/ThemeContext";
import { useSBI18n } from "../contexts/LocalizationContext";
import { ModeCluster } from "../sidebar/ToolStrip";
import { useMultiSelection } from "../sidebar/useMultiSelection";
import PropertiesContent, { getHeaderLabel } from "../sidebar/PropertiesContent";
import { buildOrderedFrames } from "../panels/FramesPanel";
import { Icon } from "./BottomBar";
import Minimap from "../overlays/Minimap";
import { observeResize } from "../../utils/shared-resize-observer";
import { loadCanvasPrefs, saveCanvasPrefs } from "../../store/canvas-prefs";

/**
 * Console chrome — the whole control surface as one full-width bottom panel
 * (the Amiga-paint-program pattern): TOOLS · SELECTION · VIEW zones instead
 * of a side rail + floating inspector + floating bar. Opt-in via
 * `<SpatialBoard chrome="console">`; floating chrome stays the default.
 *
 * Collapse behavior: with nothing selected the panel sits at 44px (tools +
 * zoom only) and expands when a selection exists. The chevron overrides
 * either way; the override clears whenever the selection state flips, so
 * the next selection auto-expands again. The padlock pins the deck open
 * (persisted via canvas-prefs) — while pinned the auto-collapse never runs
 * and the chevron is hidden; unpinning collapses the deck immediately.
 */
const PANEL_H = 232;
const PANEL_COLLAPSED_H = 52;
export const CONSOLE_PANEL_CLEARANCE = PANEL_H + 12;
export const CONSOLE_COLLAPSED_CLEARANCE = PANEL_COLLAPSED_H + 12;

/** Comfortable control density for the docked inspector — between the
 * desktop inspector and the touch sheet. */
const CONSOLE_PROPS_VARS = {
  "--sbp-row-gap": "8px",
  "--sbp-label-w": "80px",
  "--sbp-label-fs": "11px",
  "--sbp-swatch": "24px",
  "--sbp-ctl-h": "30px",
  "--sbp-wbtn-w": "34px",
  "--sbp-sbtn-w": "38px",
  "--sbp-sec-fs": "10px",
  "--sbp-pill-fs": "12px",
} as React.CSSProperties;

const MONO =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

/** Which data field carries a node's primary color, per built-in type. */
const COLOR_FIELD: Record<string, string> = {
  draw: "color",
  text: "color",
  sticky: "color",
  shape: "stroke",
  edge: "color",
  table: "stroke",
};

const QUICK_SWATCHES = ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b"];

interface ConsolePanelProps {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  tools?: ToolKey[];
  framesPanelOpen?: boolean;
  onToggleFramesPanel?: () => void;
  minimapVisible?: boolean;
  onToggleMinimap?: () => void;
  /** Reports whether the minimap is docked in the deck — the host shows the
   *  floating map whenever it is not. */
  onMinimapDockedChange?: (docked: boolean) => void;
  /** Reports the deck's expanded state (and `false` on unmount) so hosts can
   *  move floating bottom chrome out of the tall deck's way. */
  onExpandedChange?: (expanded: boolean) => void;
}

export default function ConsolePanel({ engine, registry, tools, framesPanelOpen, onToggleFramesPanel, minimapVisible, onToggleMinimap, onMinimapDockedChange, onExpandedChange }: ConsolePanelProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [, setTick] = useState(0);
  const [override, setOverride] = useState<"open" | "closed" | null>(null);
  // Pinned = locked open; survives reloads via canvas-prefs.
  const [pinned, setPinned] = useState(() => loadCanvasPrefs().consolePinned);
  const togglePinned = () => {
    const next = !pinned;
    setPinned(next);
    saveCanvasPrefs({ ...loadCanvasPrefs(), consolePinned: next });
    // Pinning drops any manual collapse; unpinning collapses the deck
    // immediately (even mid-selection — otherwise unlocking looks like a
    // no-op). The override clears on the next selection change, so
    // auto-expand resumes from there.
    setOverride(next ? null : "closed");
  };
  const prevHadSelection = useRef(false);
  // Canvas-container size for the docked minimap (parent of this panel).
  const rootRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;
    const update = () => setContainerSize({ w: parent.clientWidth, h: parent.clientHeight });
    update();
    return observeResize(parent, update);
  }, []);
  // VCR cursor over the ordered frames (outside presentation mode — during
  // presentation all chrome, this deck included, is hidden).
  const [slideIndex, setSlideIndex] = useState(0);
  const { target, commonProps } = useMultiSelection(engine);

  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    engine.on("selection", bump);
    engine.on("change", bump);
    engine.on("history", bump);
    engine.on("viewport", bump);
    engine.on("mode", bump);
    return () => {
      engine.off("selection", bump);
      engine.off("change", bump);
      engine.off("history", bump);
      engine.off("viewport", bump);
      engine.off("mode", bump);
    };
  }, [engine]);

  // A creation tool with no selection is also an editing context — the
  // properties zone shows the TOOL's options (same as the floating
  // inspector's tool mode).
  const toolActive = target.kind === "tool";
  const selectedIds = Array.from(engine.selection);
  const selectedNodes = selectedIds
    .map((id) => engine.getNode(id))
    .filter((n): n is SpatialNode => !!n);
  const hasSelection = selectedNodes.length > 0;

  // Clear the manual override whenever the selection state flips (empties
  // OR appears) so the panel resumes auto behavior: deselect after a manual
  // collapse re-arms auto-expand, and a collapse left while empty (e.g.
  // unlocking the pin) doesn't suppress the next selection's expand.
  useEffect(() => {
    if (prevHadSelection.current !== hasSelection) {
      setOverride(null);
    }
    prevHadSelection.current = hasSelection;
  }, [hasSelection]);

  const expanded = pinned || (override ? override === "open" : hasSelection || toolActive);
  // Report expansion to the host; the cleanup doubles as the unmount signal
  // (presentation mode) so hosts don't hold a stale tall-deck clearance.
  useEffect(() => {
    onExpandedChange?.(expanded);
    return () => onExpandedChange?.(false);
  }, [expanded, onExpandedChange]);
  // Dock the minimap only when the deck has width to spare — on narrow
  // windows the properties zone wins and the map stays floating.
  const mapDocked = expanded && !!minimapVisible && containerSize.w >= 1360;
  useEffect(() => {
    onMinimapDockedChange?.(mapDocked);
  }, [mapDocked, onMinimapDockedChange]);

  // Selection breakdown by node type (for the filter chips).
  const byType = new Map<string, string[]>();
  for (const n of selectedNodes) {
    const list = byType.get(n.type) ?? [];
    list.push(n.id);
    byType.set(n.type, list);
  }

  const typeChipLabel = (type: string, count: number): string => {
    const names: Record<string, [string, string]> = {
      shape: ["shape", "shapes"],
      text: ["text", "text"],
      sticky: ["note", "notes"],
      blocknote: ["card", "cards"],
      edge: ["edge", "edges"],
      draw: ["drawing", "drawings"],
      frame: ["frame", "frames"],
      image: ["image", "images"],
      table: ["table", "tables"],
    };
    const [one, many] = names[type] ?? [type, `${type}s`];
    return `${count} ${count === 1 ? one : many}`;
  };

  const applyColor = (color: string) => {
    const updates = selectedNodes
      .filter((n) => COLOR_FIELD[n.type])
      .map((n) => ({
        id: n.id,
        patch: {
          data: { ...(n.data as Record<string, unknown>), [COLOR_FIELD[n.type]]: color },
        } as Partial<SpatialNode>,
      }));
    if (updates.length) engine.batchUpdateWithHistory(updates);
  };

  const commonOpacity = (() => {
    if (!hasSelection) return 1;
    const values = selectedNodes.map(
      (n) => ((n.data as { opacity?: number })?.opacity ?? 1),
    );
    return values.every((v) => v === values[0]) ? values[0] : null; // null = mixed
  })();

  const applyOpacity = (value: number) => {
    engine.batchUpdateWithHistory(
      selectedNodes.map((n) => ({
        id: n.id,
        patch: {
          data: { ...(n.data as Record<string, unknown>), opacity: value },
        } as Partial<SpatialNode>,
      })),
    );
  };

  const frames = buildOrderedFrames(engine);
  const clampedSlide = frames.length ? Math.min(slideIndex, frames.length - 1) : 0;
  const goToSlide = (i: number) => {
    if (!frames.length) return;
    const next = (i + frames.length) % frames.length;
    setSlideIndex(next);
    engine.zoomToFrame(frames[next].id);
  };
  const zoomPct = Math.round(engine.viewport.zoom * 100);

  const zoneLabel: React.CSSProperties = {
    fontFamily: MONO,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: theme.textMuted,
    whiteSpace: "nowrap",
  };
  const chip = (active: boolean): React.CSSProperties => ({
    border: "none",
    cursor: "pointer",
    borderRadius: 999,
    padding: "5px 12px",
    fontSize: 13,
    fontFamily: "inherit",
    background: active ? theme.accentColor : theme.controlBg,
    color: active ? "#fff" : theme.text,
    whiteSpace: "nowrap",
  });
  const textBtn: React.CSSProperties = {
    border: "none",
    cursor: "pointer",
    background: "transparent",
    color: theme.textMuted,
    fontFamily: MONO,
    fontSize: 12,
    letterSpacing: 1,
    padding: "4px 6px",
    whiteSpace: "nowrap",
  };
  const squareBtn: React.CSSProperties = {
    border: "none",
    cursor: "pointer",
    borderRadius: theme.controlBorderRadius,
    background: theme.controlBg,
    color: theme.text,
    width: 34,
    height: 34,
    fontSize: 15,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div
      ref={rootRef}
      data-sb-console
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: expanded ? PANEL_H : PANEL_COLLAPSED_H,
        transition: "height 0.18s ease",
        background: theme.toolbarBg,
        borderTop: `1px solid ${theme.border}`,
        boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "stretch",
        zIndex: 10000,
        overflow: "visible",
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* TOOLS zone — fixed width when expanded (2 tool rows) so the
          properties zone gets the spare width. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: expanded ? "10px 14px" : "2px 14px",
          justifyContent: expanded ? "flex-start" : "center",
          width: expanded ? 300 : undefined,
          flexShrink: 0,
        }}
      >
        {expanded && <span style={zoneLabel}>{labels.consoleTools}</span>}
        <div style={{ display: "flex", alignItems: "center", flexWrap: expanded ? "wrap" : "nowrap", gap: 2, overflow: "hidden" }}>
          <ModeCluster engine={engine} tools={tools} registry={registry} size={44} />
          {(
            <>
              <div style={{ width: 1, height: 22, background: theme.separator, margin: "0 8px", flexShrink: 0 }} />
              <button
                style={{ ...squareBtn, background: "transparent", color: engine.canUndo() ? theme.text : theme.textDisabled }}
                title={labels.undo}
                disabled={!engine.canUndo()}
                onClick={() => engine.undo()}
              >
                <Icon name="undo" />
              </button>
              <button
                style={{ ...squareBtn, background: "transparent", color: engine.canRedo() ? theme.text : theme.textDisabled }}
                title={labels.redo}
                disabled={!engine.canRedo()}
                onClick={() => engine.redo()}
              >
                <Icon name="redo" />
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ width: 1, background: theme.separator, margin: "10px 0" }} />

      {/* SELECTION zone — chips + essentials */}
      <div
        style={{
          flexGrow: hasSelection ? 0 : 1,
          flexShrink: 0,
          flexBasis: hasSelection ? 260 : 0,
          display: expanded && !toolActive ? "flex" : "none",
          flexDirection: "column",
          gap: 8,
          padding: "10px 14px",
          overflowY: "auto",
        }}
      >
        <span style={zoneLabel}>
          {labels.consoleSelection}
          {hasSelection && (
            <span style={{ color: theme.text, marginInlineStart: 8, letterSpacing: 1 }}>
              {selectedNodes.length} {selectedNodes.length === 1 ? labels.consoleObject : labels.consoleObjects}
            </span>
          )}
        </span>
        {hasSelection ? (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              <button style={chip(byType.size > 1)} onClick={() => { /* current selection */ }}>
                {labels.consoleAll}
              </button>
              {Array.from(byType.entries()).map(([type, ids]) => (
                <button
                  key={type}
                  style={chip(byType.size === 1)}
                  title={labels.consoleFilterHint}
                  onClick={() => engine.selectMultiple(ids)}
                >
                  {typeChipLabel(type, ids.length)}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {QUICK_SWATCHES.map((c) => (
                <button
                  key={c}
                  onClick={() => applyColor(c)}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    border: `1px solid ${theme.border}`,
                    background: c,
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
              <span style={{ ...zoneLabel, letterSpacing: 1 }}>{labels.inspectorOpacity}</span>
              <input
                type="range"
                min={0}
                max={100}
                value={commonOpacity === null ? 100 : Math.round(commonOpacity * 100)}
                onChange={(e) => applyOpacity(Number(e.target.value) / 100)}
                style={{ width: 130, accentColor: theme.accentColor }}
              />
            </div>
          </>
        ) : (
          <span style={{ fontSize: 12, color: theme.textFaint }}>{labels.consoleEmptyHint}</span>
        )}
      </div>

      <div style={{ width: 1, background: theme.separator, margin: "10px 0", display: expanded && (hasSelection || toolActive) ? "block" : "none" }} />

      {/* PROPERTIES zone — the full inspector, docked in the deck with its
          own vertical scroll (no floating popover). */}
      <div
        style={{
          flex: 1,
          minWidth: 240,
          display: expanded && (hasSelection || toolActive) ? "flex" : "none",
          flexDirection: "column",
          gap: 6,
          padding: "10px 14px",
          minHeight: 0,
        }}
      >
        <span style={zoneLabel}>
          {toolActive ? getHeaderLabel(target, labels) : labels.consoleProperties}
        </span>
        {/* Row-wrap flow: each control row is a self-contained unit that
            wraps sideways across the deck's width — rows never split, no
            horizontal scrolling; vertical scroll remains only as a fallback
            for very tall single-type sections. */}
        <div
          data-sb-console-props
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "flex-start",
            alignItems: "flex-start",
            columnGap: 36,
            rowGap: 6,
            overflowY: "auto",
            overflowX: "hidden",
            fontSize: 13,
            paddingInlineEnd: 6,
            overscrollBehavior: "contain",
            ...CONSOLE_PROPS_VARS,
          }}
        >
          <PropertiesContent
            engine={engine}
            registry={registry}
            target={target}
            commonProps={commonProps}
            multiLayout="tabs"
            hideHeader
            hideArrangeControls
          />
        </div>
      </div>

      <div style={{ width: 1, background: theme.separator, margin: "10px 0", display: expanded ? "block" : "none" }} />

      {/* VIEW · SLIDES zone — fixed narrow when expanded (rows wrap) so the
          properties zone wins the spare width. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          width: expanded ? 250 : undefined,
          gap: 8,
          padding: expanded ? "10px 14px" : "2px 14px",
          justifyContent: expanded ? "flex-start" : "center",
          marginInlineStart: expanded ? 0 : "auto",
        }}
      >
        {expanded && (
          <span style={zoneLabel}>
            {labels.consoleView}
            {frames.length > 0 && ` · ${labels.consoleSlides}`}
          </span>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: expanded ? "wrap" : "nowrap" }}>
          <button style={squareBtn} title={labels.zoomOut} onClick={() => engine.zoomOut()}>
            <Icon name="minus" />
          </button>
          <button
            style={{ ...squareBtn, width: "auto", minWidth: 52, background: "transparent", fontFamily: MONO, fontSize: 13 }}
            title={labels.resetZoom}
            onClick={() => { engine.viewport.zoom = 1; engine.pan(0, 0); }}
          >
            {zoomPct}%
          </button>
          <button style={squareBtn} title={labels.zoomIn} onClick={() => engine.zoomIn()}>
            <Icon name="plus" />
          </button>
          <div style={{ width: 1, height: 20, background: theme.separator, margin: "0 2px" }} />
          <button style={squareBtn} title={labels.fitToContent} onClick={() => engine.fitToContent()}>
            <Icon name="fit" />
          </button>
          <button
            style={squareBtn}
            title={labels.canvasSearchOpen}
            onClick={() => document.dispatchEvent(new CustomEvent("sb:search-open"))}
          >
            <Icon name="search" />
          </button>
          <button
            style={{ ...squareBtn, color: engine.originView ? theme.accentColor : theme.text }}
            title={engine.originView ? labels.clearOriginView : labels.saveOriginView}
            onClick={() => (engine.originView ? engine.clearOriginView() : engine.setOriginView())}
          >
            <Icon name={engine.originView ? "bookmark-fill" : "bookmark"} />
          </button>
          <button
            style={{ ...squareBtn, color: engine.originView ? theme.text : theme.textDisabled }}
            title={labels.goToOriginView}
            disabled={!engine.originView}
            onClick={() => { if (engine.originView) engine.goToOriginView(); }}
          >
            <Icon name="home" />
          </button>
          {onToggleMinimap && (
            <button
              style={{ ...squareBtn, background: minimapVisible ? theme.controlBgActive : theme.controlBg }}
              title={labels.toggleMinimap}
              onClick={onToggleMinimap}
            >
              <Icon name="minimap" />
            </button>
          )}
        </div>
        {frames.length > 0 && expanded && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <button style={squareBtn} title={labels.consolePrevSlide} onClick={() => goToSlide(clampedSlide - 1)}>
              <svg width={15} height={15} viewBox="0 0 24 24">
                <path d="M6 5v14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                <path d="M18 6.5v11L9.5 12z" fill="currentColor" />
              </svg>
            </button>
            <span style={{ fontFamily: MONO, fontSize: 13, color: theme.text, minWidth: 52, textAlign: "center" }}>
              {clampedSlide + 1} / {frames.length}
            </span>
            <button style={squareBtn} title={labels.consoleNextSlide} onClick={() => goToSlide(clampedSlide + 1)}>
              <svg width={15} height={15} viewBox="0 0 24 24">
                <path d="M18 5v14" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                <path d="M6 6.5v11L14.5 12z" fill="currentColor" />
              </svg>
            </button>
            <button
              style={{ ...squareBtn, background: theme.accentColor, color: "#fff" }}
              title={labels.presentSlides}
              onClick={() => engine.enterPresentation()}
            >
              <Icon name="play" />
            </button>
            {onToggleFramesPanel && (
              <button
                style={{
                  ...squareBtn,
                  background: framesPanelOpen ? theme.controlBgActive : theme.controlBg,
                }}
                title={labels.toggleSlidesPanel}
                onClick={onToggleFramesPanel}
              >
                <Icon name="slides" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Docked minimap — lives in the deck's spare right space */}
      {mapDocked && (
        <div
          style={{
            position: "relative",
            width: 192,
            flexShrink: 0,
            alignSelf: "center",
            height: 120,
          }}
        >
          <Minimap
            engine={engine}
            nodes={engine.getAllNodes()}
            viewport={engine.viewport}
            containerSize={containerSize}
            measuredHeights={engine.measuredHeights}
            bottomOffset={4}
          />
        </div>
      )}

      {/* Collapse / expand chevron + pin lock (lock keeps the deck open) */}
      <div
        style={{
          display: "flex",
          flexDirection: expanded ? "column" : "row",
          gap: 2,
          alignSelf: expanded ? "flex-start" : "center",
          margin: expanded ? "8px 8px 0 0" : "0 8px 0 0",
          flexShrink: 0,
        }}
      >
        {!pinned && (
          <button
            title={expanded ? labels.consoleCollapse : labels.consoleExpand}
            onClick={() => setOverride(expanded ? "closed" : "open")}
            style={{ ...squareBtn, background: "transparent", color: theme.textMuted }}
          >
            {expanded ? "▾" : "▴"}
          </button>
        )}
        <button
          title={pinned ? labels.consoleUnlock : labels.consoleLock}
          onClick={togglePinned}
          style={{
            ...squareBtn,
            background: "transparent",
            color: pinned ? theme.accentColor : theme.textMuted,
          }}
        >
          <Icon name={pinned ? "lock" : "unlock"} size={15} />
        </button>
      </div>
    </div>
  );
}
