import type { SpatialEngine } from "spatialboard";

/**
 * SpatialBoard exemplar.
 * "Trailhead — summit day" — the point of this board is the SEAM: a typed
 * compute rig on the left and a hand-drawn route sketch on the right, wired to
 * each other. The readouts pinned to the drawing are driven by edges from the
 * rig, so dragging a constant moves numbers that live inside the sketch.
 *
 * The rig sits LEFT of the sketch deliberately. Data-flow ports put inputs on a
 * node's left edge and outputs on its right, so a rig placed to the right of its
 * readouts would send every seam wire looping backwards across the drawing.
 * Left-to-right keeps the whole board reading in one direction.
 *
 * Rough shapes + freehand ink + stickies (whiteboard) meet constant /
 * expression / math / round / compare / template / LED / progress-bar
 * (data flow), on one canvas, in one z-stack.
 */

const HAND = "Excalifont";

export function loadSummitDayBoard(engine: SpatialEngine): void {
  engine.deleteNodes(Array.from(engine.nodes.keys()));

  let z = 1;

  const ink = (
    id: string,
    points: Array<[number, number]>,
    o: { color: string; width: number; tool?: "pen" | "pencil" | "highlighter"; opacity?: number },
  ) => {
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    engine.addNode({
      id,
      type: "draw",
      x: minX,
      y: minY,
      w: Math.max(Math.max(...xs) - minX, 1),
      h: Math.max(Math.max(...ys) - minY, 1),
      z: z++,
      data: {
        tool: o.tool ?? "pen",
        // Pressure is the THIRD component — a 2-tuple renders as undefined and
        // throws in the freehand path.
        points: points.map(([px, py]) => [px - minX, py - minY, 0.5] as [number, number, number]),
        color: o.color,
        strokeWidth: o.width,
        opacity: o.opacity ?? 1,
      },
    });
  };

  const text = (
    id: string, x: number, y: number, w: number, t: string,
    size: number, color: string, align: "left" | "center" | "right" = "left",
  ) => {
    engine.addNode({
      id, type: "text", x, y, w, h: "auto", z: z++,
      data: { text: t, fontSize: size, fontFamily: HAND, color, align },
    });
  };

  const wire = (id: string, from: string, to: string, sp: string, tp: string, color: string) => {
    engine.addNode({
      id, type: "edge", x: 0, y: 0, w: 0, h: 0, z: z++,
      data: {
        fromId: from, toId: to, style: "solid", color, strokeWidth: 2,
        arrowHead: "filled", edgeType: "bezier", sourcePort: sp, targetPort: tp,
      },
    });
  };

  // ── Title ───────────────────────────────────────────────────
  text("sd-title", 70, 44, 900, "Trailhead — summit day", 46, "#111827");
  ink("sd-rule", [[74, 110], [210, 104], [360, 111], [520, 103], [650, 109]], {
    color: "#f59e0b", width: 5,
  });
  text("sd-sub", 72, 130, 1000, "one canvas: the maths on the left runs into the drawing on the right", 22, "#6b7280");

  // ══════════════════════════════════════════════════════════
  // LEFT — the compute rig
  // ══════════════════════════════════════════════════════════
  text("sd-rig-label", 70, 208, 520, "the day, computed", 24, "#374151");

  // — inputs —
  engine.addNode({
    id: "sd-dist", type: "constant", x: 70, y: 262, w: 130, h: 74, z: z++,
    data: { value: 14, label: "Distance km", accentColor: "#38bdf8" },
  });
  engine.addNode({
    id: "sd-pace", type: "constant", x: 70, y: 366, w: 130, h: 74, z: z++,
    data: { value: 3.2, label: "Pace km/h", accentColor: "#38bdf8" },
  });
  engine.addNode({
    id: "sd-lph", type: "constant", x: 70, y: 512, w: 130, h: 74, z: z++,
    data: { value: 0.7, label: "Litres / hour", accentColor: "#a78bfa" },
  });
  engine.addNode({
    id: "sd-daylight", type: "constant", x: 70, y: 664, w: 130, h: 74, z: z++,
    data: { value: 9, label: "Daylight h", accentColor: "#fbbf24" },
  });

  // — hours on the hill = distance / pace —
  engine.addNode({
    id: "sd-hours", type: "expression", x: 274, y: 296, w: 190, h: 110, z: z++,
    data: { expr: "a / b", error: "", accentColor: "#22d3ee" },
  });
  engine.addNode({
    id: "sd-hours-out", type: "display", x: 534, y: 302, w: 190, h: 84, z: z++,
    data: { label: "Hours on the hill", format: "number", accentColor: "#22d3ee" },
  });

  // — water = hours × litres/hour, rounded for the pack list —
  engine.addNode({
    id: "sd-water", type: "math-op", x: 274, y: 468, w: 150, h: 92, z: z++,
    data: { op: "multiply", accentColor: "#a78bfa" },
  });
  engine.addNode({
    id: "sd-water-bar", type: "progress-bar", x: 480, y: 476, w: 250, h: 78, z: z++,
    data: { label: "Water to carry", color: "#a78bfa", showPercent: false, accentColor: "#a78bfa", scaleMax: 8 },
  });
  engine.addNode({
    id: "sd-water-round", type: "round", x: 790, y: 470, w: 140, h: 88, z: z++,
    data: { mode: "ceil", decimals: 1, accentColor: "#a78bfa" },
  });

  // — verdict: do the hours fit inside the daylight? —
  engine.addNode({
    id: "sd-fits", type: "compare", x: 274, y: 640, w: 150, h: 84, z: z++,
    data: { op: "<", accentColor: "#22c55e" },
  });
  engine.addNode({
    id: "sd-led", type: "led", x: 486, y: 646, w: 72, h: 72, z: z++,
    data: { color: "#22c55e", accentColor: "#22c55e" },
  });
  text("sd-led-label", 576, 664, 300, "fits inside daylight", 19, "#6b7280");

  // — the sentence that lands on the drawing —
  engine.addNode({
    id: "sd-sentence", type: "template", x: 790, y: 268, w: 230, h: 100, z: z++,
    data: { template: "{{a}} h up and back", accentColor: "#f59e0b" },
  });

  text("sd-rig-note", 70, 776, 620, "change any constant — everything downstream recomputes, including the two readouts pinned to the sketch", 19, "#94a3b8");

  // ══════════════════════════════════════════════════════════
  // BOTTOM — the day, packed: a sketched table beside live widgets
  // ══════════════════════════════════════════════════════════
  text("sd-strip-label", 70, 852, 420, "the day, packed", 24, "#374151");

  // The table's grid is drawn by roughjs, so tabular data sits in the same
  // hand-drawn register as the sketch rather than looking like a spreadsheet.
  engine.addNode({
    id: "sd-splits", type: "table", x: 70, y: 900, w: 470, h: 210, z: z++,
    data: {
      rows: [
        ["Leg", "km", "climb", "h"],
        ["Trailhead → col", "8.0", "620 m", "2.5"],
        ["Col → summit", "3.5", "480 m", "1.4"],
        ["Summit → car", "2.5", "—", "0.5"],
      ],
      headerRow: true,
      fontSize: 15,
      fontFamily: HAND,
      stroke: "#475569",
      strokeWidth: 1.5,
      roughness: 1.5,
      colWidths: [2.2, 1, 1.2, 1],
    },
  });

  engine.addNode({
    id: "sd-clock", type: "analog-clock", x: 588, y: 900, w: 150, h: 196, z: z++,
    data: { utcOffset: 1, label: "Dawn start", accentColor: "#f59e0b" },
  });

  engine.addNode({
    id: "sd-turn-timer", type: "timer", x: 774, y: 900, w: 170, h: "auto", z: z++,
    data: { mode: "countdown", targetSeconds: 5400, elapsed: 0, running: true, accentColor: "#dc2626" },
  });
  text("sd-timer-label", 774, 1108, 190, "to turnaround", 17, "#94a3b8", "center");

  engine.addNode({
    id: "sd-pack-card", type: "data-card", x: 990, y: 900, w: 230, h: "auto", z: z++,
    data: {
      title: "On the back",
      fields: [
        { key: "Shell", value: "yes" },
        { key: "Crampons", value: "col up" },
        { key: "Stove", value: "no" },
        { key: "Head torch", value: "yes" },
      ],
      accentColor: "#0ea5e9",
      lastUpdated: Date.now(),
    },
  });

  // ══════════════════════════════════════════════════════════
  // RIGHT — the hand-drawn route
  // ══════════════════════════════════════════════════════════
  text("sd-sketch-label", 1330, 208, 420, "the same day, sketched", 24, "#374151");

  // Elevation profile: one long freehand stroke up to the summit and down.
  ink(
    "sd-profile",
    [
      [1330, 660], [1380, 652], [1430, 644], [1480, 628], [1530, 610], [1580, 594],
      [1630, 566], [1680, 546], [1730, 522], [1770, 488], [1810, 454], [1850, 422],
      [1890, 396], [1930, 382], [1970, 390], [2010, 408], [2050, 434], [2090, 462],
      [2130, 488],
    ],
    { color: "#334155", width: 4 },
  );
  ink("sd-ground", [[1330, 700], [1520, 696], [1710, 701], [1900, 695], [2090, 700], [2140, 697]], {
    color: "#94a3b8", width: 3, tool: "pencil",
  });

  engine.addNode({
    id: "sd-trailhead", type: "shape", x: 1316, y: 648, w: 132, h: 74, z: z++, rotation: -2,
    data: {
      shape: "rect", edgeStyle: "round", stroke: "#2563eb", strokeWidth: 2.5, roughness: 1.6,
      fill: "#bfdbfe", fillStyle: "hachure",
      label: "Trailhead", labelFontSize: 17, labelFontFamily: HAND, labelAlign: "center",
    },
  });
  engine.addNode({
    id: "sd-camp", type: "shape", x: 1706, y: 452, w: 116, h: 92, z: z++, rotation: 1.5,
    data: {
      shape: "ellipse", stroke: "#7c3aed", strokeWidth: 2.5, roughness: 1.8,
      fill: "#ddd6fe", fillStyle: "cross-hatch",
      label: "Col camp", labelFontSize: 16, labelFontFamily: HAND, labelAlign: "center",
    },
  });
  engine.addNode({
    id: "sd-summit", type: "shape", x: 1868, y: 302, w: 128, h: 92, z: z++, rotation: -1,
    data: {
      shape: "diamond", stroke: "#059669", strokeWidth: 2.5, roughness: 1.7,
      fill: "#a7f3d0", fillStyle: "hachure",
      label: "Summit", labelFontSize: 17, labelFontFamily: HAND, labelAlign: "center",
    },
  });

  text("sd-km0", 1336, 738, 90, "0 km", 17, "#94a3b8");
  text("sd-km8", 1712, 738, 90, "8 km", 17, "#94a3b8");
  text("sd-km14", 1900, 738, 90, "14 km", 17, "#94a3b8");

  // Turnaround marker — scribbled red bar across the profile.
  ink(
    "sd-turnaround",
    [[1836, 336], [1842, 386], [1836, 436], [1844, 486], [1836, 534], [1843, 580]],
    { color: "#dc2626", width: 3, tool: "pencil" },
  );
  text("sd-turnaround-label", 1690, 588, 200, "turn back here", 18, "#dc2626");

  engine.addNode({
    id: "sd-note-water", type: "sticky", x: 1330, y: 760, w: 210, h: 150, z: z++, rotation: -2.5,
    data: { text: "Water at the col — filter it. Nothing above the treeline.", color: "#FEF3C7" },
  });
  engine.addNode({
    id: "sd-note-storm", type: "sticky", x: 1566, y: 774, w: 210, h: 150, z: z++, rotation: 2,
    data: { text: "Storms build after 14:00. Be off the ridge by then.", color: "#FECACA" },
  });

  // ══════════════════════════════════════════════════════════
  // THE SEAM — readouts pinned to the drawing, fed by the rig
  // ══════════════════════════════════════════════════════════
  engine.addNode({
    id: "sd-summit-eta", type: "display", x: 1094, y: 288, w: 210, h: 78, z: z++,
    data: { label: "Round trip", format: "raw", accentColor: "#f59e0b" },
  });
  engine.addNode({
    id: "sd-pack-eta", type: "display", x: 1094, y: 470, w: 210, h: 78, z: z++,
    data: { label: "Pack water (L)", format: "number", accentColor: "#a78bfa" },
  });
  // ── Wiring ──────────────────────────────────────────────────
  wire("sd-w1", "sd-dist", "sd-hours", "value", "a", "#38bdf8");
  wire("sd-w2", "sd-pace", "sd-hours", "value", "b", "#38bdf8");
  wire("sd-w3", "sd-hours", "sd-hours-out", "result", "value", "#22d3ee");
  wire("sd-w4", "sd-hours", "sd-water", "result", "a", "#a78bfa");
  wire("sd-w5", "sd-lph", "sd-water", "value", "b", "#a78bfa");
  wire("sd-w6", "sd-water", "sd-water-bar", "result", "value", "#a78bfa");
  wire("sd-w7", "sd-water", "sd-water-round", "result", "value", "#a78bfa");
  wire("sd-w8", "sd-hours", "sd-fits", "result", "a", "#22c55e");
  wire("sd-w9", "sd-daylight", "sd-fits", "value", "b", "#fbbf24");
  wire("sd-w10", "sd-fits", "sd-led", "result", "value", "#22c55e");
  wire("sd-w11", "sd-hours", "sd-sentence", "result", "a", "#f59e0b");
  // …and on into the drawing:
  wire("sd-w12", "sd-sentence", "sd-summit-eta", "result", "value", "#f59e0b");
  wire("sd-w13", "sd-water-round", "sd-pack-eta", "out", "value", "#a78bfa");

  engine.fitToContent();
}
