import type { ReactNode } from "react";
import type { BoardBackground } from "../engine/SpatialEngine";

/**
 * A paper renderer returns only static background content — texture filters
 * and the rects that use them. No grid, no viewport-dependent values.
 *
 * The grid is a separate, uniform dot-grid overlay rendered by GridBackground
 * regardless of which paper type is active.
 */
export interface RendererResult {
  /** SVG filter definitions (e.g. feTurbulence). Never depend on the viewport. */
  staticDefs?: ReactNode;
  /** Background rects that apply the filters above. Never depend on the viewport. */
  staticLayers?: ReactNode[];
}

// ── Japanese Stationery ──────────────────────────────────────

function japaneseStationery(): RendererResult {
  return {
    staticDefs: (
      <filter id="paper-texture" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves={4} seed={12} stitchTiles="stitch" result="noise" />
        <feColorMatrix in="noise" type="saturate" values="0" result="bump" />
        <feDiffuseLighting in="bump" lightingColor="#f7f4ee" surfaceScale="1.2" diffuseConstant="1" result="lit">
          <feDistantLight azimuth="225" elevation="50" />
        </feDiffuseLighting>
        <feComposite in="lit" in2="bump" operator="in" result="lit-masked" />
        <feFlood floodColor="#f5f0e8" result="base" />
        <feBlend in="base" in2="lit-masked" mode="overlay" result="paper" />
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves={3} seed={7} stitchTiles="stitch" result="grain" />
        <feColorMatrix in="grain" type="saturate" values="0" result="grain-gray" />
        <feComponentTransfer in="grain-gray" result="grain-subtle">
          <feFuncR type="linear" slope="0.06" intercept="0.47" />
          <feFuncG type="linear" slope="0.06" intercept="0.47" />
          <feFuncB type="linear" slope="0.06" intercept="0.47" />
        </feComponentTransfer>
        <feBlend in="paper" in2="grain-subtle" mode="overlay" result="paper-final" />
      </filter>
    ),
    staticLayers: [
      <rect key="texture" width="100%" height="100%" fill="#f5f0e8" filter="url(#paper-texture)" />,
    ],
  };
}

// ── Kraft Paper ──────────────────────────────────────────────

function kraft(): RendererResult {
  return {
    staticDefs: (
      <filter id="kraft-texture" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={5} seed={42} stitchTiles="stitch" result="noise" />
        <feColorMatrix in="noise" type="saturate" values="0" result="bump" />
        <feDiffuseLighting in="bump" lightingColor="#e0c9a6" surfaceScale="1.4" diffuseConstant="0.95" result="lit">
          <feDistantLight azimuth="200" elevation="50" />
        </feDiffuseLighting>
        <feComposite in="lit" in2="bump" operator="in" result="lit-masked" />
        <feFlood floodColor="#d4b896" result="base" />
        <feBlend in="base" in2="lit-masked" mode="overlay" result="kraft" />
        <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves={2} seed={99} stitchTiles="stitch" result="fiber" />
        <feColorMatrix in="fiber" type="saturate" values="0" result="fiber-gray" />
        <feComponentTransfer in="fiber-gray" result="fiber-subtle">
          <feFuncR type="linear" slope="0.06" intercept="0.47" />
          <feFuncG type="linear" slope="0.06" intercept="0.47" />
          <feFuncB type="linear" slope="0.06" intercept="0.47" />
        </feComponentTransfer>
        <feBlend in="kraft" in2="fiber-subtle" mode="overlay" result="kraft-final" />
      </filter>
    ),
    staticLayers: [
      <rect key="texture" width="100%" height="100%" fill="#d4b896" filter="url(#kraft-texture)" />,
    ],
  };
}

// ── Dispatch ─────────────────────────────────────────────────

const RENDERERS: Partial<Record<BoardBackground, () => RendererResult>> = {
  "japanese-stationery": japaneseStationery,
  "kraft": kraft,
};

export function getBackgroundRenderer(bg: BoardBackground): RendererResult {
  return RENDERERS[bg]?.() ?? {};
}
