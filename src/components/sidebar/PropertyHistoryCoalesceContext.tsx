import { createContext, useCallback, useEffect, useRef } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";

/**
 * Provides a session key so inspector/property tweaks during one pointer gesture
 * collapse to a single undo step (via `updateNodeWithHistoryCoalesced`).
 */
export const PropertyHistoryCoalesceContext = createContext<(() => string) | null>(
  null,
);

/**
 * Stable key per selection (or "tool" / "none"); resets on selection change and pointer release.
 */
export function usePropertyHistorySession(
  engine: SpatialEngine,
  stableSelectionId: string,
): () => string {
  const sessionRef = useRef<string | null>(null);
  const seqRef = useRef(0);
  const getKey = useCallback(() => {
    if (!sessionRef.current) {
      sessionRef.current = `${stableSelectionId}:${++seqRef.current}`;
    }
    return sessionRef.current;
  }, [stableSelectionId]);

  useEffect(() => {
    sessionRef.current = null;
    engine.endHistoryCoalesce();
  }, [stableSelectionId, engine]);

  useEffect(() => {
    const up = () => {
      sessionRef.current = null;
      engine.endHistoryCoalesce();
    };
    const doc = typeof document !== "undefined" ? document : null;
    if (!doc) return;
    doc.addEventListener("pointerup", up);
    doc.addEventListener("pointercancel", up);
    return () => {
      doc.removeEventListener("pointerup", up);
      doc.removeEventListener("pointercancel", up);
    };
  }, [engine]);

  return getKey;
}
