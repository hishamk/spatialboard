import { useEffect, useMemo, useRef, useState } from "react";
import { SpatialBoard, SpatialEngine, builtinNodeTypes } from "spatialboard";
import "spatialboard/style.css";

/** Everything you draw is serialized to SBD and kept in localStorage. */
const STORAGE_KEY = "spatialboard-pocket-board";
/** The camera (viewport x/y/zoom) is kept separately so it survives reloads. */
const VIEWPORT_KEY = "spatialboard-pocket-viewport";
const SAVE_DEBOUNCE_MS = 400;

function readSavedViewport(): { x: number; y: number; zoom: number } | null {
  try {
    const raw = localStorage.getItem(VIEWPORT_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as { x?: unknown; y?: unknown; zoom?: unknown };
    if (
      typeof v.x === "number" && Number.isFinite(v.x) &&
      typeof v.y === "number" && Number.isFinite(v.y) &&
      typeof v.zoom === "number" && Number.isFinite(v.zoom) && v.zoom > 0
    ) {
      return { x: v.x, y: v.y, zoom: v.zoom };
    }
  } catch {
    /* corrupt value — fall through to default camera */
  }
  return null;
}

function seedStarterBoard(engine: SpatialEngine) {
  engine.createText("Pocket Board", 120, 80, { fontSize: 30 });
  const a = engine.createSticky(
    "Works offline — try airplane mode after one visit ✈️",
    120,
    150,
    { w: 230 },
  );
  const b = engine.createSticky(
    "Everything you draw is saved on this device.",
    420,
    300,
    { w: 220, color: "#BBF7D0" },
  );
  engine.createEdge(a, b, { arrowHead: "arrow" });
}

type SaveState = "loading" | "saving" | "saved";

export default function App() {
  // Restore the camera synchronously at creation so the board mounts already
  // positioned where the user left it (no post-load jump).
  const { engine, hadSavedViewport } = useMemo(() => {
    const e = new SpatialEngine();
    const saved = readSavedViewport();
    if (saved) e.viewport = saved;
    return { engine: e, hadSavedViewport: saved !== null };
  }, []);
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const timer = useRef<number | null>(null);
  const viewportTimer = useRef<number | null>(null);

  // Restore (or seed) once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          await engine.fromSBD(stored);
        } catch {
          seedStarterBoard(engine);
        }
      } else {
        seedStarterBoard(engine);
      }
      if (cancelled) return;
      if (!hadSavedViewport) engine.fitToContent();
      setSaveState("saved");
    })();
    return () => {
      cancelled = true;
    };
  }, [engine, hadSavedViewport]);

  // Persist on every board change, debounced.
  useEffect(() => {
    const save = () => {
      setSaveState("saving");
      if (timer.current != null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(async () => {
        try {
          localStorage.setItem(STORAGE_KEY, await engine.toSBD());
          setSaveState("saved");
        } catch {
          // Storage full or unavailable — keep the session editable anyway.
        }
      }, SAVE_DEBOUNCE_MS);
    };
    // Camera saves are ambient — no status flicker while panning/zooming.
    const saveViewport = () => {
      if (viewportTimer.current != null) window.clearTimeout(viewportTimer.current);
      viewportTimer.current = window.setTimeout(() => {
        try {
          const { x, y, zoom } = engine.viewport;
          localStorage.setItem(VIEWPORT_KEY, JSON.stringify({ x, y, zoom }));
        } catch {
          /* storage unavailable — panning still works */
        }
      }, SAVE_DEBOUNCE_MS);
    };
    engine.on("change", save);
    engine.on("background", save);
    engine.on("viewport", saveViewport);
    return () => {
      engine.off("change", save);
      engine.off("background", save);
      engine.off("viewport", saveViewport);
      if (timer.current != null) window.clearTimeout(timer.current);
      if (viewportTimer.current != null) window.clearTimeout(viewportTimer.current);
    };
  }, [engine]);

  const reset = () => {
    if (!window.confirm("Clear this board? This deletes the saved copy on this device.")) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(VIEWPORT_KEY);
    window.location.reload();
  };

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 12px",
          paddingTop: "calc(8px + env(safe-area-inset-top))",
          background: "#1e1e2e",
          color: "#f8f7f4",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          flexWrap: "wrap",
        }}
      >
        <strong>Pocket Board</strong>
        <span style={{ opacity: 0.7, flex: 1, minWidth: 120 }}>
          {saveState === "loading"
            ? "Loading…"
            : saveState === "saving"
              ? "Saving…"
              : "Saved on this device"}
        </span>
        <button
          onClick={reset}
          style={{
            background: "transparent",
            color: "inherit",
            border: "1px solid rgba(248,247,244,0.4)",
            borderRadius: 6,
            padding: "4px 10px",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          Reset
        </button>
      </header>
      <div style={{ flex: 1, minHeight: 0 }}>
        <SpatialBoard engine={engine} nodeTypes={builtinNodeTypes} />
      </div>
    </div>
  );
}
