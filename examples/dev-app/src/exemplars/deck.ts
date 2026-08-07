import type { SpatialEngine } from "spatialboard";

/**
 * SpatialBoard exemplar.
 * "Trailhead deck" — frames as slides. Four 16:9 frames laid out as a 2x2 grid
 * on the canvas; `slideOrder` fixes the running order and each frame picks its
 * own `transition`, so the slides panel shows the whole vocabulary at once.
 * Hit Present (or `engine.enterPresentation()`) to step through them.
 */

const HAND = "Excalifont";

const W = 960;
const H = 540;
const GAP = 120;

export function loadDeckBoard(engine: SpatialEngine): void {
  engine.deleteNodes(Array.from(engine.nodes.keys()));

  let z = 1;
  const slide = (
    id: string,
    label: string,
    col: number,
    row: number,
    order: number,
    transition: "pan" | "fade" | "dissolve" | "zoom" | "fold" | "cube",
    accent: string,
  ) => {
    const x = col * (W + GAP);
    const y = row * (H + GAP);
    engine.addNode({
      id, type: "frame", x, y, w: W, h: H, z: z++,
      data: {
        label, slideOrder: order, transition,
        backgroundColor: "#ffffff", borderColor: accent, borderWidth: 2, borderStyle: "solid",
      },
    });
    return { x, y };
  };

  const text = (
    id: string, x: number, y: number, w: number, t: string,
    size: number, color: string, align: "left" | "center" = "left",
  ) => {
    engine.addNode({
      id, type: "text", x, y, w, h: "auto", z: z++,
      data: { text: t, fontSize: size, fontFamily: HAND, color, align },
    });
  };

  // ── Slide 1 — title ─────────────────────────────────────────
  const s1 = slide("dk-f1", "1 · Title", 0, 0, 1, "pan", "#2563eb");
  text("dk-t1", s1.x + 90, s1.y + 170, 780, "Trailhead", 92, "#111827");
  text("dk-t1b", s1.x + 96, s1.y + 300, 700, "every trail, mapped by the people who walk it", 30, "#6b7280");
  engine.addNode({
    id: "dk-rule1", type: "draw", x: s1.x + 92, y: s1.y + 276, w: 420, h: 10, z: z++,
    data: {
      tool: "pen",
      points: [[0, 6, 0.5], [110, 2, 0.5], [232, 8, 0.5], [340, 1, 0.5], [420, 6, 0.5]] as Array<[number, number, number]>,
      color: "#2563eb", strokeWidth: 5,
    },
  });

  // ── Slide 2 — the idea, three stickies ──────────────────────
  const s2 = slide("dk-f2", "2 · The idea", 1, 0, 2, "fade", "#7c3aed");
  text("dk-t2", s2.x + 70, s2.y + 60, 700, "Three things people ask us for", 40, "#111827");
  const notes: Array<[string, string, string]> = [
    ["dk-n1", "Offline maps that actually work in a canyon.", "#FEF3C7"],
    ["dk-n2", "Trail conditions from last week, not last year.", "#BBF7D0"],
    ["dk-n3", "One place to keep the photos and the route.", "#BFDBFE"],
  ];
  notes.forEach(([id, t, color], i) => {
    engine.addNode({
      id, type: "sticky", x: s2.x + 70 + i * 290, y: s2.y + 180, w: 250, h: 220, z: z++,
      rotation: [-2, 1.5, -1][i],
      data: { text: t, color },
    });
  });

  // ── Slide 3 — rough bar chart ───────────────────────────────
  const s3 = slide("dk-f3", "3 · Traction", 0, 1, 3, "zoom", "#059669");
  text("dk-t3", s3.x + 70, s3.y + 56, 700, "Signups, first six months", 40, "#111827");
  const bars: Array<[string, number, string]> = [
    ["dk-b1", 70, "Jan"], ["dk-b2", 108, "Feb"], ["dk-b3", 152, "Mar"],
    ["dk-b4", 206, "Apr"], ["dk-b5", 268, "May"], ["dk-b6", 330, "Jun"],
  ];
  bars.forEach(([id, h, label], i) => {
    const bx = s3.x + 96 + i * 132;
    engine.addNode({
      id, type: "shape", x: bx, y: s3.y + 430 - h, w: 92, h, z: z++,
      data: {
        shape: "rect", stroke: "#059669", strokeWidth: 2.5, roughness: 1.6,
        fill: "#a7f3d0", fillStyle: "hachure",
      },
    });
    text(`${id}-l`, bx, s3.y + 442, 92, label, 22, "#6b7280", "center");
  });

  // ── Slide 4 — the ask ───────────────────────────────────────
  const s4 = slide("dk-f4", "4 · The ask", 1, 1, 4, "cube", "#ea580c");
  text("dk-t4", s4.x + 70, s4.y + 130, 820, "We're hiring two guides", 54, "#111827");
  text("dk-t4b", s4.x + 74, s4.y + 240, 760, "…and looking for trailhead partners in the Cascades.", 30, "#6b7280");
  engine.addNode({
    id: "dk-circle", type: "draw", x: s4.x + 60, y: s4.y + 110, w: 640, h: 130, z: z++,
    data: {
      tool: "pen",
      points: [
        [40, 24, 0.5], [220, 4, 0.5], [430, 14, 0.5], [590, 40, 0.5], [636, 78, 0.5], [560, 116, 0.5],
        [330, 128, 0.5], [128, 120, 0.5], [22, 92, 0.5], [8, 52, 0.5], [64, 20, 0.5], [240, 6, 0.5],
      ] as Array<[number, number, number]>,
      color: "#ea580c", strokeWidth: 4,
    },
  });

  engine.fitToContent();
}
