import type { SpatialEngine } from "../../engine/SpatialEngine";
/**
 * Provides a session key so inspector/property tweaks during one pointer gesture
 * collapse to a single undo step (via `updateNodeWithHistoryCoalesced`).
 */
export declare const PropertyHistoryCoalesceContext: import("react").Context<(() => string) | null>;
/**
 * Stable key per selection (or "tool" / "none"); resets on selection change and pointer release.
 */
export declare function usePropertyHistorySession(engine: SpatialEngine, stableSelectionId: string): () => string;
