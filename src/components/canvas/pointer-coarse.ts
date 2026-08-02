let cached: boolean | null = null;

/**
 * True on touch-first devices (phones/tablets — CSS `pointer: coarse`).
 * Used to widen the invisible hit areas around small visual affordances
 * (resize/rotate/connection handles) without growing what's drawn.
 */
export function hasCoarsePointer(): boolean {
  if (cached === null) {
    cached =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(pointer: coarse)").matches;
  }
  return cached;
}

/** Screen-px side/diameter of a handle's touch target. Divide by zoom for canvas units. */
export function handleHitSizePx(): number {
  return hasCoarsePointer() ? 28 : 14;
}
