import type { SpatialEngine } from "spatialboard";

/**
 * SpatialBoard exemplar.
 * "Trailhead kickoff" — the hand-drawn whiteboard surface: rough shapes with
 * hachure fills, freehand ink (pen / pencil / highlighter), arrows both as
 * standalone shapes and as node-to-node edges, rotated images, and stickies.
 * Every image is an inline SVG data URI so the board stays self-contained.
 */

const HAND = "Excalifont";

/** Inline SVG "photo" cards — no network, no bundled binaries, no licences. */
function photo(kind: "ridge" | "dawn" | "pines"): string {
  const art = {
    ridge: `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#e0f2fe"/></linearGradient></defs>
      <rect width="320" height="240" fill="url(#g)"/>
      <path d="M0 190 L70 118 L124 165 L186 96 L250 158 L320 112 L320 240 L0 240 Z" fill="#0f766e" opacity=".9"/>
      <path d="M0 214 L86 160 L152 200 L232 150 L320 196 L320 240 L0 240 Z" fill="#134e4a"/>`,
    dawn: `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fdba74"/><stop offset="1" stop-color="#fef3c7"/></linearGradient></defs>
      <rect width="320" height="240" fill="url(#g)"/>
      <circle cx="196" cy="106" r="42" fill="#fb923c"/>
      <path d="M0 200 L96 142 L168 186 L246 140 L320 184 L320 240 L0 240 Z" fill="#9a3412" opacity=".85"/>`,
    pines: `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#bbf7d0"/><stop offset="1" stop-color="#ecfdf5"/></linearGradient></defs>
      <rect width="320" height="240" fill="url(#g)"/>
      <g fill="#15803d">
        <path d="M74 200 L104 116 L134 200 Z"/><path d="M146 200 L184 84 L222 200 Z"/><path d="M232 200 L262 126 L292 200 Z"/>
      </g>
      <rect y="198" width="320" height="42" fill="#166534"/>`,
  }[kind];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">${art}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function loadWhiteboardBoard(engine: SpatialEngine): void {
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
        points: points.map(([px, py]) => [px - minX, py - minY, 0.5] as [number, number, number]),
        color: o.color,
        strokeWidth: o.width,
        opacity: o.opacity ?? 1,
      },
    });
  };

  // ── Title, underlined by hand ───────────────────────────────
  engine.addNode({
    id: "wb-title",
    type: "text",
    x: 80,
    y: 60,
    w: 620,
    h: "auto",
    z: z++,
    data: { text: "Trailhead — kickoff sketch", fontSize: 44, fontFamily: HAND, color: "#1f2937", align: "left" },
  });
  ink("wb-underline", [[84, 122], [180, 116], [300, 121], [430, 114], [548, 120], [612, 115]], {
    color: "#f59e0b",
    width: 4,
  });

  engine.addNode({
    id: "wb-sub",
    type: "text",
    x: 80,
    y: 140,
    w: 560,
    h: "auto",
    z: z++,
    data: { text: "everything below is drawn with the built-in tools", fontSize: 20, fontFamily: HAND, color: "#6b7280", align: "left" },
  });

  // ── Flow: three rough shapes wired with hand-drawn edges ────
  engine.addNode({
    id: "wb-s1",
    type: "shape",
    x: 90,
    y: 250,
    w: 230,
    h: 130,
    z: z++,
    rotation: -2,
    data: {
      shape: "rect", edgeStyle: "round", stroke: "#2563eb", strokeWidth: 2.5, roughness: 1.6,
      fill: "#93c5fd", fillStyle: "hachure",
      label: "Discover", labelFontSize: 22, labelFontFamily: HAND, labelAlign: "center",
    },
  });
  engine.addNode({
    id: "wb-s2",
    type: "shape",
    x: 420,
    y: 232,
    w: 210,
    h: 210,
    z: z++,
    rotation: 1.5,
    data: {
      shape: "ellipse", stroke: "#7c3aed", strokeWidth: 2.5, roughness: 1.8,
      fill: "#ddd6fe", fillStyle: "cross-hatch",
      label: "Sketch", labelFontSize: 22, labelFontFamily: HAND, labelAlign: "center",
    },
  });
  engine.addNode({
    id: "wb-s3",
    type: "shape",
    x: 740,
    y: 246,
    w: 220,
    h: 150,
    z: z++,
    rotation: -1,
    data: {
      shape: "diamond", stroke: "#059669", strokeWidth: 2.5, roughness: 1.7,
      fill: "#a7f3d0", fillStyle: "hachure",
      label: "Ship?", labelFontSize: 22, labelFontFamily: HAND, labelAlign: "center",
    },
  });

  engine.addNode({
    id: "wb-e1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: z++,
    data: { fromId: "wb-s1", toId: "wb-s2", style: "solid", color: "#475569", strokeWidth: 2.5, arrowHead: "arrow", edgeType: "straight", roughness: 2 },
  });
  engine.addNode({
    id: "wb-e2", type: "edge", x: 0, y: 0, w: 0, h: 0, z: z++,
    data: { fromId: "wb-s2", toId: "wb-s3", style: "solid", color: "#475569", strokeWidth: 2.5, arrowHead: "arrow", edgeType: "straight", roughness: 2 },
  });
  // Loop back — "nope, iterate"
  engine.addNode({
    id: "wb-e3", type: "edge", x: 0, y: 0, w: 0, h: 0, z: z++,
    data: {
      fromId: "wb-s3", toId: "wb-s1", label: "not yet", style: "dashed", color: "#dc2626",
      strokeWidth: 2, arrowHead: "arrow", edgeType: "bezier", roughness: 2, curveOffset: [0, 150] as [number, number],
    },
  });

  // ── Standalone arrow shape + a circled emphasis in ink ──────
  engine.addNode({
    id: "wb-arrow",
    type: "shape",
    x: 1010,
    y: 250,
    w: 150,
    h: 90,
    z: z++,
    data: {
      shape: "arrow", stroke: "#ea580c", strokeWidth: 3, roughness: 1.8,
      startPoint: [0, 0] as [number, number], endPoint: [150, 90] as [number, number],
    },
  });
  ink(
    "wb-circle",
    [[1150, 386], [1226, 358], [1300, 372], [1330, 424], [1296, 470], [1214, 480], [1152, 452], [1142, 402], [1176, 368], [1246, 356]],
    { color: "#dc2626", width: 3 },
  );
  engine.addNode({
    id: "wb-circled",
    type: "text",
    x: 1168,
    y: 396,
    w: 190,
    h: "auto",
    z: z++,
    data: { text: "demo day!", fontSize: 26, fontFamily: HAND, color: "#dc2626", align: "left" },
  });
  engine.addNode({
    id: "wb-arrowlabel",
    type: "text",
    x: 998,
    y: 208,
    w: 240,
    h: "auto",
    z: z++,
    data: { text: "ship it by", fontSize: 20, fontFamily: HAND, color: "#ea580c", align: "left" },
  });

  // ── Moodboard: rotated images, pinned crooked ───────────────
  const shots: Array<[string, "ridge" | "dawn" | "pines", number, number]> = [
    ["wb-img1", "ridge", 110, 560],
    ["wb-img2", "dawn", 350, 590],
    ["wb-img3", "pines", 596, 566],
  ];
  shots.forEach(([id, kind, x, y], i) => {
    engine.addNode({
      id, type: "image", x, y, w: 220, h: 165, z: z++,
      rotation: [-5, 3.5, -2.5][i],
      data: { src: photo(kind), alt: kind, borderColor: "#ffffff", borderWidth: 8 },
    });
  });
  engine.addNode({
    id: "wb-mood",
    type: "text",
    x: 110,
    y: 508,
    w: 420,
    h: "auto",
    z: z++,
    data: { text: "moodboard — pull images straight in", fontSize: 22, fontFamily: HAND, color: "#374151", align: "left" },
  });

  // ── Highlighter swipe under a note, pencil scribble ─────────
  ink("wb-highlight", [[880, 566], [1010, 562], [1140, 568], [1268, 563]], {
    color: "#fde047", width: 26, tool: "highlighter", opacity: 0.55,
  });
  engine.addNode({
    id: "wb-note",
    type: "text",
    x: 872,
    y: 548,
    w: 440,
    h: "auto",
    z: z++,
    data: { text: "pressure-aware ink, real highlighter", fontSize: 24, fontFamily: HAND, color: "#1f2937", align: "left" },
  });
  ink(
    "wb-scribble",
    [[884, 636], [934, 612], [982, 650], [1032, 610], [1080, 652], [1128, 612], [1176, 650], [1224, 616], [1268, 646]],
    { color: "#0891b2", width: 3, tool: "pencil" },
  );

  // ── Hand-drawn arrow sweeping the moodboard toward the notes ─
  engine.addNode({
    id: "wb-arrow2",
    type: "shape",
    x: 300,
    y: 764,
    w: 520,
    h: 54,
    z: z++,
    data: {
      shape: "arrow", stroke: "#7c3aed", strokeWidth: 3, roughness: 2,
      startPoint: [0, 54] as [number, number], endPoint: [520, 0] as [number, number],
    },
  });
  engine.addNode({
    id: "wb-caption",
    type: "text",
    x: 116,
    y: 772,
    w: 200,
    h: "auto",
    z: z++,
    data: { text: "next steps", fontSize: 20, fontFamily: HAND, color: "#7c3aed", align: "left" },
  });

  // ── Stickies, tilted ────────────────────────────────────────
  engine.addNode({
    id: "wb-note1", type: "sticky", x: 884, y: 700, w: 200, h: 130, z: z++, rotation: -3,
    data: { text: "Frames double as slides — present straight from the board.", color: "#FEF3C7" },
  });
  engine.addNode({
    id: "wb-note2", type: "sticky", x: 1110, y: 716, w: 200, h: 130, z: z++, rotation: 2.5,
    data: { text: "Every shape here is a node type you could have written.", color: "#BBF7D0" },
  });

  engine.fitToContent();
}
