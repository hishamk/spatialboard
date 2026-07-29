import { useEffect, useMemo, useRef, useState } from "react";
import { SpatialBoard, SpatialEngine, builtinNodeTypes } from "spatialboard";
import "spatialboard/style.css";

/** Everything you draw is serialized to SBD and kept in localStorage. */
const STORAGE_KEY = "spatialboard-pocket-board";
const SAVE_DEBOUNCE_MS = 400;

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
  const engine = useMemo(() => new SpatialEngine(), []);
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const timer = useRef<number | null>(null);

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
      engine.fitToContent();
      setSaveState("saved");
    })();
    return () => {
      cancelled = true;
    };
  }, [engine]);

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
    engine.on("change", save);
    engine.on("background", save);
    return () => {
      engine.off("change", save);
      engine.off("background", save);
      if (timer.current != null) window.clearTimeout(timer.current);
    };
  }, [engine]);

  const reset = () => {
    if (!window.confirm("Clear this board? This deletes the saved copy on this device.")) return;
    localStorage.removeItem(STORAGE_KEY);
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
