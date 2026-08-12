import { SpatialBoard, LIGHT_SB_THEME, type SpatialEngine } from "spatialboard";
import "spatialboard/style.css";
import { usePersistentBoard } from "./usePersistentBoard";
import { BoardShell } from "./BoardShell";
import { DemoSwitcher } from "./DemoSwitcher";

/**
 * Video Notes — YouTube nodes on the canvas.
 *
 * The `youtube` node type ships in the default `coreBoardNodes` preset: press
 * Y (or use the toolbar) and paste any YouTube URL to drop a playable embed.
 * This board seeds three classic talks and annotates them the way you would a
 * paper — stickies for the takeaway, ink for emphasis, edges for watch order.
 * Each talk sits in a frame, so Present steps through them as slides.
 */

let z = 1;

function video(engine: SpatialEngine, id: string, videoId: string, x: number, y: number): void {
  engine.addNode({
    id,
    type: "youtube",
    x,
    y,
    w: 480,
    h: 270,
    z: z++,
    data: { videoId, url: `https://www.youtube.com/watch?v=${videoId}` },
  });
}

function ink(
  engine: SpatialEngine,
  id: string,
  pts: Array<[number, number]>,
  opts: { color: string; width: number },
): void {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
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
      tool: "pen",
      points: pts.map(([x, y]) => [x - minX, y - minY, 0.5] as [number, number, number]),
      color: opts.color,
      strokeWidth: opts.width,
      opacity: 1,
    },
  });
}

function seed(engine: SpatialEngine) {
  z = 1;

  // ── Title ────────────────────────────────────────────────────────────
  engine.createText("Video notes", 130, 60, { fontSize: 36 });
  engine.createText("Three talks worth a rewatch — pause, scribble, connect.", 132, 116, {
    fontSize: 16,
    w: 460,
  });
  // Hand-drawn underline beneath the title.
  ink(
    engine,
    "vn-underline",
    [
      [130, 108],
      [190, 104],
      [255, 107],
      [318, 103],
      [362, 106],
    ],
    { color: "#d97706", width: 3 },
  );

  // ── Talk 1 — Inventing on Principle ─────────────────────────────────
  engine.createFrame(120, 190, 560, 500, { label: "01 · Inventing on Principle — Bret Victor, 2012" });
  video(engine, "vn-vid-1", "PUv66718DII", 160, 240);
  engine.createSticky(
    "“Creators need an immediate connection to what they create.”\n\nThe live-coded game demo is the whole argument in one minute.",
    160,
    535,
    { w: 300, color: "#FEF3C7" },
  );

  // ── Talk 2 — The Mother of All Demos ────────────────────────────────
  engine.createFrame(760, 190, 560, 500, { label: "02 · The Mother of All Demos — Doug Engelbart, 1968" });
  video(engine, "vn-vid-2", "yJDv-zdhzMY", 800, 240);
  engine.createSticky(
    "The mouse, hypertext, windows, and collaborative editing — demoed live, in 1968.",
    800,
    535,
    { w: 300, color: "#BBF7D0" },
  );

  // ── Talk 3 — The Art of Code ────────────────────────────────────────
  engine.createFrame(440, 760, 560, 500, { label: "03 · The Art of Code — Dylan Beattie, 2020" });
  video(engine, "vn-vid-3", "6avJHaC3C2U", 480, 810);
  engine.createSticky(
    "Code as a creative medium — quines, poetry, and music. The closer.",
    480,
    1105,
    { w: 300, color: "#BFDBFE" },
  );

  // ── Watch order ─────────────────────────────────────────────────────
  engine.createEdge("vn-vid-1", "vn-vid-2", { style: "dashed", arrowHead: "arrow", label: "then" });
  engine.createEdge("vn-vid-2", "vn-vid-3", { style: "dashed", arrowHead: "arrow", label: "then" });

  // ── Try it yourself ─────────────────────────────────────────────────
  engine.createSticky(
    "Add your own: press Y, then paste any YouTube URL.",
    1400,
    280,
    { w: 230, color: "#FBCFE8" },
  );
}

export default function App() {
  const { engine, saveState, reset } = usePersistentBoard({
    storageKey: "sb-example-video-notes",
    seed,
  });

  return (
    <BoardShell
      title="Video Notes"
      subtitle="youtube nodes · core preset"
      saveState={saveState}
      onReset={reset}
      nav={<DemoSwitcher current="video-notes" />}
    >
      {/* No `nodeTypes` prop — the youtube node ships in coreBoardNodes. */}
      <SpatialBoard engine={engine} theme={LIGHT_SB_THEME} chrome="console" />
    </BoardShell>
  );
}
