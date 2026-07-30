import { useState, useEffect } from "react";
import type { SpatialEngine, BoardBackground } from "../../engine/SpatialEngine";
import type { Mode } from "../../engine/types";

const MODES: { key: Mode; label: string; shortcut: string }[] = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" },
];

const btnBase: React.CSSProperties = {
  border: "none",
  borderRadius: 6,
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

function ToolIcon({ name, size = 18 }: { name: string; size?: number }) {
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
        <>
          <path d="M7 4h10" {...sp} />
          <path d="M12 4v16" {...sp} />
        </>
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
      {name === "erase" && (
        <>
          <path d="M20 20H9L3 14l9.5-9.5 8 8L16 17" {...sp} />
          <path d="M12.5 4.5l8 8" {...sp} />
        </>
      )}
      {name === "rect" && (
        <rect x="4" y="4" width="16" height="16" rx="2" {...sp} />
      )}
      {name === "ellipse" && (
        <ellipse cx="12" cy="12" rx="9" ry="8" {...sp} />
      )}
      {name === "diamond" && (
        <path d="M12 3l9 9-9 9-9-9z" {...sp} />
      )}
      {name === "line" && (
        <line x1="5" y1="19" x2="19" y2="5" {...sp} />
      )}
      {name === "arrow" && (
        <>
          <line x1="5" y1="19" x2="19" y2="5" {...sp} />
          <polyline points="12,5 19,5 19,12" {...sp} fill="none" />
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
    </svg>
  );
}

export default function Toolbar({ engine }: { engine: SpatialEngine }) {
  const [mode, setMode] = useState<Mode>(engine.mode);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [background, setBackground] = useState<BoardBackground>(engine.boardBackground);

  useEffect(() => {
    const handleMode = () => setMode(engine.mode);
    const handleHistory = () => {
      setCanUndo(engine.canUndo());
      setCanRedo(engine.canRedo());
    };
    const handleBackground = () => setBackground(engine.boardBackground);
    engine.on("mode", handleMode);
    engine.on("history", handleHistory);
    engine.on("background", handleBackground);
    return () => {
      engine.off("mode", handleMode);
      engine.off("history", handleHistory);
      engine.off("background", handleBackground);
    };
  }, [engine]);

  return (
    <div
      data-sb-toolbar
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 48,
        background: "#1e1e2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 0",
        gap: 4,
        zIndex: 100,
      }}
    >
      {/* Mode buttons */}
      {MODES.map((m) => (
        <button
          key={m.key}
          title={`${m.label} (${m.shortcut})`}
          onClick={() => engine.setMode(m.key)}
          style={{
            ...btnBase,
            width: 36,
            height: 36,
            background: mode === m.key ? "#3b82f6" : "transparent",
            color: "white",
          }}
        >
          <ToolIcon name={m.key} />
        </button>
      ))}

      <div
        style={{
          width: 28,
          height: 1,
          background: "#444",
          margin: "8px 0",
        }}
      />

      {/* Board background */}
      {(
        [
          { key: "dot-grid" as const, color: "#f8f7f5", label: "Dot Grid" },
          { key: "blueprint" as const, color: "#1e3a5f", label: "Blueprint" },
          { key: "japanese-stationery" as const, color: "#f5f0e8", label: "Japanese Stationery" },
        ] as const
      ).map((bg) => (
        <button
          key={bg.key}
          title={bg.label}
          onClick={() => engine.setBoardBackground(bg.key)}
          style={{
            ...btnBase,
            width: 20,
            height: 20,
            background: bg.color,
            border:
              background === bg.key
                ? "2px solid white"
                : "2px solid transparent",
            borderRadius: 4,
            boxShadow:
              bg.key === "japanese-stationery"
                ? "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(160,140,110,0.15)"
                : undefined,
          }}
        />
      ))}

      <div style={{ flex: 1 }} />

      {/* Print visible area */}
      <button
        title="Print (landscape)"
        onClick={() => {
          const saved = { ...engine.viewport };
          engine.fitToContent();
          requestAnimationFrame(() => {
            window.print();
            engine.viewport.x = saved.x;
            engine.viewport.y = saved.y;
            engine.viewport.zoom = saved.zoom;
            engine.pan(0, 0);
          });
        }}
        style={{
          ...btnBase,
          width: 36,
          height: 36,
          background: "transparent",
          color: "white",
        }}
      >
        <ToolIcon name="print" />
      </button>

      <div
        style={{
          width: 28,
          height: 1,
          background: "#444",
          margin: "4px 0",
        }}
      />

      {/* Undo/Redo */}
      <button
        title="Undo (Ctrl+Z)"
        onClick={() => engine.undo()}
        disabled={!canUndo}
        style={{
          ...btnBase,
          width: 36,
          height: 36,
          background: "transparent",
          color: canUndo ? "white" : "#666",
        }}
      >
        <ToolIcon name="undo" />
      </button>
      <button
        title="Redo (Ctrl+Shift+Z)"
        onClick={() => engine.redo()}
        disabled={!canRedo}
        style={{
          ...btnBase,
          width: 36,
          height: 36,
          background: "transparent",
          color: canRedo ? "white" : "#666",
        }}
      >
        <ToolIcon name="redo" />
      </button>

      <div
        style={{
          width: 28,
          height: 1,
          background: "#444",
          margin: "4px 0",
        }}
      />

      {/* Fit to content / reset zoom */}
      <button
        title="Fit to content (Ctrl+0)"
        onClick={() => engine.fitToContent()}
        style={{
          ...btnBase,
          width: 36,
          height: 36,
          background: "transparent",
          color: "white",
        }}
      >
        <ToolIcon name="fit" />
      </button>

    </div>
  );
}
