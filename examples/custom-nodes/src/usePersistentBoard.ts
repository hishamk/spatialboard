import { useEffect, useMemo, useRef, useState } from "react";
import { SpatialEngine } from "spatialboard";

export type SaveState = "loading" | "saving" | "saved";

function readViewport(key: string): { x: number; y: number; zoom: number } | null {
  try {
    const v = JSON.parse(localStorage.getItem(key) || "null");
    if (v && Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.zoom) && v.zoom > 0) {
      return { x: v.x, y: v.y, zoom: v.zoom };
    }
  } catch {
    /* corrupt value — fall through to the default camera */
  }
  return null;
}

/**
 * Wire a SpatialEngine to localStorage — the shared plumbing behind every example
 * in this repo. It:
 *   • restores the board (portable SBD text) + camera on mount,
 *   • seeds a starter board on first run,
 *   • autosaves (debounced) on every change.
 *
 * The whole board is one SBD string under `storageKey` — open DevTools →
 * Application → Local Storage to read it. Nothing here is SpatialBoard-specific
 * beyond `engine.toSBD()` / `engine.fromSBD()`; swap in your own transport freely.
 */
export function usePersistentBoard(opts: {
  storageKey: string;
  seed: (engine: SpatialEngine) => void;
}) {
  const { storageKey, seed } = opts;
  const viewportKey = storageKey + ":viewport";

  // Restore the camera synchronously at creation so the board mounts already
  // positioned where the user left it (no post-load jump).
  const { engine, hadViewport } = useMemo(() => {
    const e = new SpatialEngine();
    const v = readViewport(viewportKey);
    if (v) e.viewport = v;
    return { engine: e, hadViewport: v !== null };
  }, [viewportKey]);

  const [saveState, setSaveState] = useState<SaveState>("loading");
  const saveTimer = useRef<number | null>(null);
  const viewportTimer = useRef<number | null>(null);

  // Restore (or seed) once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          await engine.fromSBD(stored);
        } catch {
          seed(engine);
        }
      } else {
        seed(engine);
      }
      if (cancelled) return;
      if (!hadViewport) {
        // Fit now, and again on the second frame: the engine defaults to a
        // 2000×1500 container until the board's ResizeObserver delivers the
        // real size — which lands later in the first frame, AFTER rAF
        // callbacks — so only a second-frame re-fit is guaranteed to frame
        // the board against the measured container.
        engine.fitToContent();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (!cancelled) engine.fitToContent();
          });
        });
      }
      setSaveState("saved");
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine]);

  // Persist on every board change, debounced.
  useEffect(() => {
    const save = () => {
      setSaveState("saving");
      if (saveTimer.current != null) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(async () => {
        try {
          localStorage.setItem(storageKey, await engine.toSBD());
          setSaveState("saved");
        } catch {
          /* storage full/unavailable — keep the session editable anyway */
        }
      }, 400);
    };
    // Camera saves are ambient — no status flicker while panning/zooming.
    const saveViewport = () => {
      if (viewportTimer.current != null) window.clearTimeout(viewportTimer.current);
      viewportTimer.current = window.setTimeout(() => {
        try {
          const { x, y, zoom } = engine.viewport;
          localStorage.setItem(viewportKey, JSON.stringify({ x, y, zoom }));
        } catch {
          /* storage unavailable — panning still works */
        }
      }, 400);
    };
    engine.on("change", save);
    engine.on("background", save);
    engine.on("viewport", saveViewport);
    return () => {
      engine.off("change", save);
      engine.off("background", save);
      engine.off("viewport", saveViewport);
      if (saveTimer.current != null) window.clearTimeout(saveTimer.current);
      if (viewportTimer.current != null) window.clearTimeout(viewportTimer.current);
    };
  }, [engine, storageKey, viewportKey]);

  const reset = () => {
    if (!window.confirm("Clear this board? This deletes the saved copy on this device.")) return;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(viewportKey);
    window.location.reload();
  };

  return { engine, saveState, reset };
}
