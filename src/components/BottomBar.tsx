import { useState, useEffect } from "react";
import type { SpatialEngine } from "../engine/SpatialEngine";
import { useSBTheme } from "./sidebar/ThemeContext";

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
    </svg>
  );
}

interface BottomBarProps {
  engine: SpatialEngine;
  framesPanelOpen?: boolean;
  onToggleFramesPanel?: () => void;
}

export default function BottomBar({ engine, framesPanelOpen, onToggleFramesPanel }: BottomBarProps) {
  const theme = useSBTheme();
  const [zoom, setZoom] = useState(engine.viewport.zoom);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [hasOriginView, setHasOriginView] = useState(() => engine.originView != null);
  const [frameCount, setFrameCount] = useState(
    () => engine.getAllNodes().filter((n) => n.type === "frame").length,
  );

  useEffect(() => {
    const handleViewport = () => setZoom(engine.viewport.zoom);
    const handleHistory = () => {
      setCanUndo(engine.canUndo());
      setCanRedo(engine.canRedo());
    };
    const syncFrameCount = () => {
      setFrameCount(engine.getAllNodes().filter((n) => n.type === "frame").length);
      setHasOriginView(engine.originView != null);
    };
    engine.on("viewport", handleViewport);
    engine.on("history", handleHistory);
    engine.on("change", syncFrameCount);
    engine.on("node:create", syncFrameCount);
    engine.on("node:delete", syncFrameCount);
    return () => {
      engine.off("viewport", handleViewport);
      engine.off("history", handleHistory);
      engine.off("change", syncFrameCount);
      engine.off("node:create", syncFrameCount);
      engine.off("node:delete", syncFrameCount);
    };
  }, [engine]);

  const pillBg = theme.panelBg;
  const border = `1px solid ${theme.border}`;
  const pill: React.CSSProperties = {
    ...pillBase,
    borderRadius: theme.panelBorderRadius,
  };
  const sep: React.CSSProperties = {
    width: 1,
    height: 20,
    background: theme.separator,
    flexShrink: 0,
  };

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
      {/* Zoom controls */}
      <div style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
        <button
          title="Zoom out"
          onClick={() => zoomOut(engine)}
          style={{ ...btn, width: 32, height: 32, color: theme.text }}
        >
          <Icon name="minus" />
        </button>
        <div style={sep} />
        <button
          title="Reset zoom to 100%"
          onClick={() => {
            engine.viewport.zoom = 1;
            engine.pan(0, 0);
          }}
          style={{
            ...btn,
            minWidth: 48,
            height: 32,
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
          title="Zoom in"
          onClick={() => zoomIn(engine)}
          style={{ ...btn, width: 32, height: 32, color: theme.text }}
        >
          <Icon name="plus" />
        </button>
      </div>

      {/* Fit to content + Origin view */}
      <div style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
        <button
          title="Fit to content (Ctrl+0)"
          onClick={() => engine.fitToContent()}
          style={{ ...btn, width: 32, height: 32, color: theme.text }}
        >
          <Icon name="fit" />
        </button>
        <div style={sep} />
        <button
          title={hasOriginView ? "Clear saved view" : "Save current view as origin"}
          onClick={() => {
            if (hasOriginView) {
              engine.clearOriginView();
              setHasOriginView(false);
            } else {
              engine.setOriginView();
              setHasOriginView(true);
            }
          }}
          style={{ ...btn, width: 32, height: 32, color: hasOriginView ? theme.accentColor : theme.textFaint }}
        >
          <Icon name={hasOriginView ? "bookmark-fill" : "bookmark"} />
        </button>
        <div style={sep} />
        <button
          title="Go to saved view"
          onClick={() => { if (hasOriginView) engine.goToOriginView(); }}
          disabled={!hasOriginView}
          style={{ ...btn, width: 32, height: 32, color: hasOriginView ? theme.text : theme.textFaint }}
        >
          <Icon name="home" />
        </button>
      </div>

      {/* Present & Slides */}
      <div style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
        <button
          title="Present (frames as slides)"
          onClick={() => engine.enterPresentation()}
          style={{ ...btn, width: 32, height: 32, color: theme.text }}
        >
          <Icon name="play" />
        </button>
        {onToggleFramesPanel && (
          <>
            <div style={sep} />
            <button
              title="Toggle slides panel"
              onClick={onToggleFramesPanel}
              style={{
                ...btn,
                width: 32,
                height: 32,
                color: framesPanelOpen ? theme.text : theme.textMuted,
                position: "relative",
              }}
            >
              <Icon name="slides" />
              {frameCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    fontSize: 8,
                    lineHeight: 1,
                    fontWeight: 700,
                    color: theme.textMuted,
                    pointerEvents: "none",
                  }}
                >
                  {frameCount}
                </span>
              )}
            </button>
          </>
        )}
      </div>

      {/* Undo / Redo */}
      <div style={{ ...pill, background: pillBg, border, boxShadow: theme.panelShadow }}>
        <button
          title="Undo (Ctrl+Z)"
          onClick={() => engine.undo()}
          disabled={!canUndo}
          style={{ ...btn, width: 32, height: 32, color: canUndo ? theme.text : theme.textFaint }}
        >
          <Icon name="undo" />
        </button>
        <div style={sep} />
        <button
          title="Redo (Ctrl+Shift+Z)"
          onClick={() => engine.redo()}
          disabled={!canRedo}
          style={{ ...btn, width: 32, height: 32, color: canRedo ? theme.text : theme.textFaint }}
        >
          <Icon name="redo" />
        </button>
      </div>
    </div>
  );
}
