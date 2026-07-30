import { SpatialBoard, type SpatialEngine } from "spatialboard";
import "spatialboard/style.css";
import { usePersistentBoard } from "./usePersistentBoard";
import { BoardShell } from "./BoardShell";

/**
 * Example 1 — the slim core board.
 *
 * `import { SpatialBoard } from "spatialboard"` with NO `nodeTypes` prop renders
 * the default `coreBoardNodes`: shapes, sticky notes, text, freehand draw, frames,
 * edges, images, and YouTube embeds. None of them need the rich-text peers, so
 * this example's package.json installs ZERO @blocknote/@mantine packages.
 *
 * Rich text is opt-in — see the `rich-text` example.
 */
function seed(engine: SpatialEngine) {
  engine.createText("Basic Board", 120, 80, { fontSize: 30 });

  const a = engine.createSticky(
    "The core board: shapes, sticky notes, text, frames, edges, images, freehand draw.",
    120,
    150,
    { w: 250 },
  );
  const b = engine.createSticky(
    "No rich text, no @blocknote — this example installs zero heavy peers.",
    470,
    150,
    { w: 230, color: "#BBF7D0" },
  );
  engine.createEdge(a, b, { arrowHead: "arrow" });

  engine.createFrame(110, 340, 620, 260, { label: "A frame groups slides" });
  engine.createShape("ellipse", 160, 400, 150, 150, { fill: "#FDE68A", fillStyle: "solid" });
  engine.createShape("rect", 360, 410, 200, 130, { fill: "#BFDBFE", fillStyle: "solid" });

  engine.createText("Everything here saves to localStorage as SBD ↓", 130, 630, {
    fontSize: 16,
    w: 420,
  });
}

export default function App() {
  const { engine, saveState, reset } = usePersistentBoard({
    storageKey: "sb-example-basic",
    seed,
  });

  return (
    <BoardShell title="Basic Board" subtitle="core nodes · no @blocknote" saveState={saveState} onReset={reset}>
      {/* No `nodeTypes` prop → the slim default preset (coreBoardNodes). */}
      <SpatialBoard engine={engine} />
    </BoardShell>
  );
}
