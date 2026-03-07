import type { ReactNode } from "react";
import type { BoardBackground } from "../engine/SpatialEngine";

export interface RendererResult {
  defs: ReactNode;
  layers: ReactNode[];
}

interface RendererInput {
  scaledGrid: number;
  patternX: number;
  patternY: number;
}

// ── Plain White ──────────────────────────────────────────────

function plainWhite(_input: RendererInput): RendererResult {
  return { defs: null, layers: [] };
}

// ── Dot Grid ─────────────────────────────────────────────────

function dotGrid({ scaledGrid, patternX, patternY }: RendererInput): RendererResult {
  return {
    defs: (
      <pattern
        id="grid-pattern"
        x={patternX}
        y={patternY}
        width={scaledGrid}
        height={scaledGrid}
        patternUnits="userSpaceOnUse"
      >
        <circle cx={scaledGrid / 2} cy={scaledGrid / 2} r={1.5} fill="#e0ddd8" />
      </pattern>
    ),
    layers: [<rect key="dots" width="100%" height="100%" fill="url(#grid-pattern)" />],
  };
}

// ── Graph Paper ──────────────────────────────────────────────

function graphPaper({ scaledGrid, patternX, patternY }: RendererInput): RendererResult {
  const majorGrid = scaledGrid * 5;
  const majorX = patternX % majorGrid;
  const majorY = patternY % majorGrid;

  return {
    defs: (
      <>
        <pattern
          id="grid-minor"
          x={patternX}
          y={patternY}
          width={scaledGrid}
          height={scaledGrid}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0} y1={scaledGrid} x2={scaledGrid} y2={scaledGrid} stroke="rgba(100,149,237,0.2)" strokeWidth={0.5} />
          <line x1={scaledGrid} y1={0} x2={scaledGrid} y2={scaledGrid} stroke="rgba(100,149,237,0.2)" strokeWidth={0.5} />
        </pattern>
        <pattern
          id="grid-major"
          x={majorX}
          y={majorY}
          width={majorGrid}
          height={majorGrid}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0} y1={majorGrid} x2={majorGrid} y2={majorGrid} stroke="rgba(100,149,237,0.45)" strokeWidth={1} />
          <line x1={majorGrid} y1={0} x2={majorGrid} y2={majorGrid} stroke="rgba(100,149,237,0.45)" strokeWidth={1} />
        </pattern>
      </>
    ),
    layers: [
      <rect key="minor" width="100%" height="100%" fill="url(#grid-minor)" />,
      <rect key="major" width="100%" height="100%" fill="url(#grid-major)" />,
    ],
  };
}

// ── College Ruled ────────────────────────────────────────────

function collegeRuled({ scaledGrid, patternX, patternY }: RendererInput): RendererResult {
  // Horizontal lines spaced at scaledGrid
  const marginX = patternX + scaledGrid * 4; // red margin line ~4 grid units from left

  return {
    defs: (
      <pattern
        id="grid-pattern"
        x={patternX}
        y={patternY}
        width={scaledGrid}
        height={scaledGrid}
        patternUnits="userSpaceOnUse"
      >
        <line x1={0} y1={scaledGrid} x2={scaledGrid} y2={scaledGrid} stroke="rgba(100,149,237,0.3)" strokeWidth={0.75} />
      </pattern>
    ),
    layers: [
      <rect key="lines" width="100%" height="100%" fill="url(#grid-pattern)" />,
      <line key="margin" x1={marginX} y1={0} x2={marginX} y2="100%" stroke="rgba(220,80,80,0.35)" strokeWidth={1.5} />,
    ],
  };
}

// ── Engineering Pad ──────────────────────────────────────────

function engineering({ scaledGrid, patternX, patternY }: RendererInput): RendererResult {
  const majorGrid = scaledGrid * 5;
  const majorX = patternX % majorGrid;
  const majorY = patternY % majorGrid;

  return {
    defs: (
      <>
        <pattern
          id="grid-minor"
          x={patternX}
          y={patternY}
          width={scaledGrid}
          height={scaledGrid}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0} y1={scaledGrid} x2={scaledGrid} y2={scaledGrid} stroke="rgba(76,140,70,0.2)" strokeWidth={0.5} />
          <line x1={scaledGrid} y1={0} x2={scaledGrid} y2={scaledGrid} stroke="rgba(76,140,70,0.2)" strokeWidth={0.5} />
        </pattern>
        <pattern
          id="grid-major"
          x={majorX}
          y={majorY}
          width={majorGrid}
          height={majorGrid}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0} y1={majorGrid} x2={majorGrid} y2={majorGrid} stroke="rgba(76,140,70,0.45)" strokeWidth={1} />
          <line x1={majorGrid} y1={0} x2={majorGrid} y2={majorGrid} stroke="rgba(76,140,70,0.45)" strokeWidth={1} />
        </pattern>
      </>
    ),
    layers: [
      <rect key="minor" width="100%" height="100%" fill="url(#grid-minor)" />,
      <rect key="major" width="100%" height="100%" fill="url(#grid-major)" />,
    ],
  };
}

// ── Isometric ────────────────────────────────────────────────

function isometric({ scaledGrid, patternX, patternY }: RendererInput): RendererResult {
  // 60-degree triangle grid
  const h = scaledGrid * Math.sqrt(3);
  const w = scaledGrid * 2;

  return {
    defs: (
      <pattern
        id="grid-pattern"
        x={patternX % w}
        y={patternY % h}
        width={w}
        height={h}
        patternUnits="userSpaceOnUse"
      >
        {/* Horizontal line at bottom */}
        <line x1={0} y1={h} x2={w} y2={h} stroke="rgba(160,160,180,0.25)" strokeWidth={0.5} />
        {/* Line going from bottom-left to top-center */}
        <line x1={0} y1={h} x2={scaledGrid} y2={0} stroke="rgba(160,160,180,0.25)" strokeWidth={0.5} />
        {/* Line going from bottom-right to top-center */}
        <line x1={w} y1={h} x2={scaledGrid} y2={0} stroke="rgba(160,160,180,0.25)" strokeWidth={0.5} />
      </pattern>
    ),
    layers: [<rect key="iso" width="100%" height="100%" fill="url(#grid-pattern)" />],
  };
}

// ── Blueprint ────────────────────────────────────────────────

function blueprint({ scaledGrid, patternX, patternY }: RendererInput): RendererResult {
  return {
    defs: (
      <pattern
        id="grid-pattern"
        x={patternX}
        y={patternY}
        width={scaledGrid}
        height={scaledGrid}
        patternUnits="userSpaceOnUse"
      >
        <line x1={0} y1={0} x2={scaledGrid} y2={0} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
        <line x1={0} y1={0} x2={0} y2={scaledGrid} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
      </pattern>
    ),
    layers: [<rect key="grid" width="100%" height="100%" fill="url(#grid-pattern)" />],
  };
}

// ── Dark Grid ────────────────────────────────────────────────

function darkGrid({ scaledGrid, patternX, patternY }: RendererInput): RendererResult {
  const majorGrid = scaledGrid * 5;
  const majorX = patternX % majorGrid;
  const majorY = patternY % majorGrid;

  return {
    defs: (
      <>
        <pattern
          id="grid-minor"
          x={patternX}
          y={patternY}
          width={scaledGrid}
          height={scaledGrid}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0} y1={scaledGrid} x2={scaledGrid} y2={scaledGrid} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
          <line x1={scaledGrid} y1={0} x2={scaledGrid} y2={scaledGrid} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
        </pattern>
        <pattern
          id="grid-major"
          x={majorX}
          y={majorY}
          width={majorGrid}
          height={majorGrid}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0} y1={majorGrid} x2={majorGrid} y2={majorGrid} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
          <line x1={majorGrid} y1={0} x2={majorGrid} y2={majorGrid} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
        </pattern>
      </>
    ),
    layers: [
      <rect key="minor" width="100%" height="100%" fill="url(#grid-minor)" />,
      <rect key="major" width="100%" height="100%" fill="url(#grid-major)" />,
    ],
  };
}

// ── Japanese Stationery ──────────────────────────────────────

function japaneseStationery({ scaledGrid, patternX, patternY }: RendererInput): RendererResult {
  return {
    defs: (
      <>
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
        <pattern
          id="grid-pattern"
          x={patternX}
          y={patternY}
          width={scaledGrid}
          height={scaledGrid}
          patternUnits="userSpaceOnUse"
        >
          <line x1={0} y1={scaledGrid} x2={scaledGrid} y2={scaledGrid} stroke="rgba(160,140,110,0.35)" strokeWidth={1} />
        </pattern>
      </>
    ),
    layers: [
      <rect key="texture" width="100%" height="100%" fill="#f5f0e8" filter="url(#paper-texture)" />,
      <rect key="lines" width="100%" height="100%" fill="url(#grid-pattern)" />,
      <line key="margin" x1={patternX + scaledGrid * 2} y1={0} x2={patternX + scaledGrid * 2} y2="100%" stroke="rgba(190,60,60,0.28)" strokeWidth={1.5} />,
    ],
  };
}

// ── Kraft Paper ──────────────────────────────────────────────

function kraft(_input: RendererInput): RendererResult {
  return {
    defs: (
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
    layers: [
      <rect key="texture" width="100%" height="100%" fill="#d4b896" filter="url(#kraft-texture)" />,
    ],
  };
}

// ── Dispatch ─────────────────────────────────────────────────

const RENDERERS: Record<BoardBackground, (input: RendererInput) => RendererResult> = {
  "plain-white": plainWhite,
  "dot-grid": dotGrid,
  "graph-paper": graphPaper,
  "college-ruled": collegeRuled,
  "engineering": engineering,
  "isometric": isometric,
  "blueprint": blueprint,
  "dark-grid": darkGrid,
  "japanese-stationery": japaneseStationery,
  "kraft": kraft,
};

export function getBackgroundRenderer(bg: BoardBackground): (input: RendererInput) => RendererResult {
  return RENDERERS[bg] ?? RENDERERS["dot-grid"];
}
