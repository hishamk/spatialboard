import { useEffect, useMemo } from "react";
import { SpatialBoard, LIGHT_SB_THEME, SpatialEngine } from "spatialboard";

/**
 * The about page IS a spatialboard: every headline, squiggle, and feature
 * sticky is a real node on a throwaway engine — drag them, draw over them,
 * hit Present to watch the about page play as slides. Nothing persists;
 * closing the overlay discards the board. The medium is the pitch.
 */

const INK = "#1e1e2e";
const BLUE = "#4a8fd4";

interface Feature {
  title: string;
  body: string;
  color: string;
  tilt: number;
  badge?: boolean;
}

const CREATE: Feature[] = [
  {
    title: "Freehand ink",
    body: "Pressure-sensitive pen strokes with fills, dashes, and an Apple Pencil that just works. Closed strokes can fill themselves.",
    color: "#FEF3C7",
    tilt: -1.2,
  },
  {
    title: "Sketchy shapes",
    body: "Rectangles, ellipses, and diamonds with a hand-drawn wobble — dial the sloppiness from architect to cartoonist, or zero it for crisp lines.",
    color: "#DBEAFE",
    tilt: 0.8,
  },
  {
    title: "Sticky notes & text",
    body: "Quick thoughts in hand lettering, sticky notes in every color — all editable in place on any device. Double-tap this one.",
    color: "#FCE7F3",
    tilt: 0.9,
  },
  {
    title: "Images, properly",
    body: "Crop non-destructively, flip, add borders. Paste from the clipboard or drop files straight onto the canvas.",
    color: "#FFEDD5",
    tilt: -0.7,
  },
];

const STRUCTURE: Feature[] = [
  {
    title: "Connectors",
    body: "Curved, straight, or stepped edges with arrowheads and labels — grab an endpoint and reattach it anywhere on a node's outline.",
    color: "#FCE7F3",
    tilt: 1.1,
  },
  {
    title: "Frames become slides",
    body: "Group work into frames and present the board as a slideshow. These very sections are frames — press the play button below.",
    color: "#EDE9FE",
    tilt: -0.9,
  },
  {
    title: "Find your way",
    body: "Search everything by text and jump to it. A minimap, saved home views, grid snap, and smart alignment guides keep big boards navigable.",
    color: "#D1FAE5",
    tilt: 1.0,
  },
  {
    title: "Seven papers",
    body: "Plain, dot grid, engineering, blueprint, night mode, and textured Japanese stationery and kraft — the texture exports with your board.",
    color: "#FEF3C7",
    tilt: 0.6,
  },
];

const SHIP: Feature[] = [
  {
    title: "Editable exports",
    body: "Save a PNG or SVG and the file carries the whole board inside it. Anyone can view the image; drop it back on a board and keep editing.",
    color: "#D1FAE5",
    tilt: -0.6,
    badge: true,
  },
  {
    title: "Imports",
    body: "Drop in Excalidraw libraries, Mermaid flowcharts and sequence diagrams, SVG files, images, GIFs, and YouTube embeds.",
    color: "#DBEAFE",
    tilt: -0.8,
  },
  {
    title: "Built for touch",
    body: "Pinch to zoom, long-press for the menu, double-tap to edit. On a phone the toolbar reshapes itself — add to home screen and it feels native.",
    color: "#FFEDD5",
    tilt: 0.7,
  },
];

const DEVELOPERS: Feature[] = [
  {
    title: "A real engine",
    body: "The canvas is a thin layer over a headless SpatialEngine: build, query, and mutate boards entirely in code. This page was built that way.",
    color: "#EDE9FE",
    tilt: -1.0,
  },
  {
    title: "Bring your own nodes",
    body: "Register custom React components as first-class node types — with ports and a dataflow engine for live graphs. Theme it, localize it (RTL included), trim the toolbar to taste.",
    color: "#FEF3C7",
    tilt: 0.8,
  },
];

const STICKY_W = 270;
const STICKY_H = 190;
const GAP = 36;
const FRAME_PAD = 44;

/** Lay a feature list into a frame: stickies with a Caveat title floating in
 *  each card's headroom (the sticky body starts below via leading newlines). */
function placeSection(
  engine: SpatialEngine,
  label: string,
  features: Feature[],
  x: number,
  y: number,
  cols: number,
): { w: number; h: number } {
  const rows = Math.ceil(features.length / cols);
  const w = FRAME_PAD * 2 + cols * STICKY_W + (cols - 1) * GAP;
  const h = FRAME_PAD * 2 + 26 + rows * STICKY_H + (rows - 1) * GAP;
  engine.createFrame(x, y, w, h, { label });
  features.forEach((f, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const sx = x + FRAME_PAD + col * (STICKY_W + GAP);
    const sy = y + FRAME_PAD + 26 + row * (STICKY_H + GAP);
    const stickyId = engine.createSticky("\n\n" + f.body, sx, sy, {
      w: STICKY_W,
      h: STICKY_H,
      color: f.color,
      fontSize: 14,
    });
    engine.updateNode(stickyId, { rotation: f.tilt });
    const titleId = engine.createText(f.title, sx + 16, sy + 8, {
      w: STICKY_W - 32,
      fontSize: 26,
      fontFamily: "Caveat",
      color: INK,
    });
    engine.updateNode(titleId, { rotation: f.tilt });
    if (f.badge) {
      engine.createShape("rect", sx + STICKY_W - 76, sy + 14, 56, 24, {
        fill: BLUE,
        fillStyle: "solid",
        stroke: BLUE,
        strokeWidth: 1,
        roughness: 0,
        label: "NEW",
        labelFontSize: 12,
      });
    }
  });
  return { w, h };
}

function seedAboutBoard(engine: SpatialEngine): void {
  // Hero — the wordmark, its underline squiggle, and the pitch
  engine.createText("Spatialboard", 240, -180, {
    w: 620,
    fontSize: 84,
    fontFamily: "Righteous",
    color: INK,
    align: "center",
  });
  // One confident underline pass, sampled from a couple of sine arcs
  const squiggle: Array<[number, number, number?]> = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    squiggle.push([300 + t * 500, 12 + Math.sin(t * Math.PI * 2.2) * 7, 0.6]);
  }
  engine.createDrawStroke(squiggle.map(([px, py, p]) => [px, py - 60, p]), {
    color: BLUE,
    width: 5,
  });
  engine.createText(
    "A hand-drawn spatial canvas for the web — and yes, this about page is a live board.\nDrag the stickies. Draw on it. Press play to watch it as slides. Close it and it never happened.",
    180,
    -30,
    { w: 740, fontSize: 18, align: "center", color: "#3a3a4a" },
  );

  // Sections as frames (presentable as slides, in this order)
  const create = placeSection(engine, "Create", CREATE, 0, 130, 2);
  const structure = placeSection(engine, "Structure & navigate", STRUCTURE, create.w + 80, 130, 2);
  const shipY = 130 + Math.max(create.h, structure.h) + 90;
  const ship = placeSection(engine, "Ship it", SHIP, 0, shipY, 3);
  placeSection(engine, "For developers", DEVELOPERS, ship.w + 80, shipY, 2);

  // A connector doing what connectors do — the two developer stickies
  const engineSticky = engine
    .getAllNodes()
    .find((n) => n.type === "sticky" && (n.data as { text: string }).text.includes("headless SpatialEngine"));
  const customSticky = engine
    .getAllNodes()
    .find((n) => n.type === "sticky" && (n.data as { text: string }).text.includes("first-class node types"));
  if (engineSticky && customSticky) {
    engine.createEdge(engineSticky.id, customSticky.id, {
      label: "extends",
      color: BLUE,
      strokeWidth: 2,
      arrowHead: "arrow",
      edgeType: "bezier",
      sourceHandle: "right",
      targetHandle: "left",
    });
  }

  // Footer
  engine.createText("MIT licensed  ·  boards save as readable .sbd text  ·  github.com/hishamk/spatialboard", 180, shipY + 560, {
    w: 740,
    fontSize: 14,
    align: "center",
    color: "#585868",
  });

  engine.setBoardBackground("dot-grid");
  engine.snapToGrid = true;
}

export function AboutPage({ onClose }: { onClose: () => void }) {
  // A fresh, throwaway engine per open — nothing persists.
  const engine = useMemo(() => {
    const e = new SpatialEngine();
    seedAboutBoard(e);
    return e;
  }, []);

  useEffect(() => {
    // Capture phase — the board's own keyboard handler consumes bubbled
    // Escapes. Presentation keeps its Esc (exits the slideshow); any other
    // Escape closes the overlay — it's a throwaway board, nothing to protect.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (engine.presentationMode) return;
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    // Fit after the container has measured
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => engine.fitToContent()),
    );
    return () => {
      window.removeEventListener("keydown", onKey, true);
      cancelAnimationFrame(raf);
    };
  }, [engine, onClose]);

  return (
    <div
      role="dialog"
      aria-label="About Spatialboard"
      style={{ position: "fixed", inset: 0, zIndex: 100000, background: "#f8f7f4" }}
    >
      <SpatialBoard engine={engine} theme={LIGHT_SB_THEME} />
      <button
        onClick={onClose}
        aria-label="Close"
        title="Back to your board"
        style={{
          position: "absolute",
          top: "calc(12px + env(safe-area-inset-top, 0px))",
          right: 14,
          width: 42,
          height: 42,
          border: `1.5px solid ${INK}`,
          borderRadius: "50%",
          background: "#f8f7f4",
          color: INK,
          fontSize: 19,
          lineHeight: 1,
          cursor: "pointer",
          touchAction: "manipulation",
          zIndex: 100001,
          boxShadow: "2px 3px 0 rgba(30, 30, 46, 0.12)",
        }}
      >
        ×
      </button>
    </div>
  );
}
