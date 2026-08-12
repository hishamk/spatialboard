import { SpatialBoard, type SpatialEngine } from "spatialboard";
// The rich-text node + its peers live behind this subpath. Importing it is what
// pulls @blocknote/@mantine — the main `spatialboard` entry never does.
import { defaultBoardNodes } from "spatialboard/blocknote";
import "spatialboard/style.css";
import { usePersistentBoard } from "./usePersistentBoard";
import { BoardShell } from "./BoardShell";
import { DemoSwitcher } from "./DemoSwitcher";

/**
 * Example 2 — opt-in rich text.
 *
 * `defaultBoardNodes` = the slim `coreBoardNodes` PLUS the BlockNote-backed
 * rich-text node. Passing it as `nodeTypes` adds a full block editor node (the
 * "Rich text" tool). This example's package.json therefore installs the
 * @blocknote/@mantine peers — the `basic` example does not.
 */
function seed(engine: SpatialEngine) {
  engine.createText("Rich-text Board", 120, 80, { fontSize: 30 });

  // A rich-text node is a full BlockNote editor. Double-click to edit; it
  // serializes to markdown inside the SBD document.
  engine.createBlockNote(
    [
      { type: "heading", props: { level: 3 }, content: [{ type: "text", text: "A block editor, on the canvas", styles: {} }], children: [] },
      {
        type: "paragraph",
        props: {},
        content: [
          { type: "text", text: "Headings, ", styles: {} },
          { type: "text", text: "bold", styles: { bold: true } },
          { type: "text", text: ", ", styles: {} },
          { type: "text", text: "italic", styles: { italic: true } },
          { type: "text", text: ", lists, checklists, code — double-click to edit.", styles: {} },
        ],
        children: [],
      },
      { type: "bulletListItem", props: {}, content: [{ type: "text", text: "Opt-in via spatialboard/blocknote", styles: {} }], children: [] },
      { type: "bulletListItem", props: {}, content: [{ type: "text", text: "Round-trips as markdown in SBD", styles: {} }], children: [] },
    ],
    120,
    150,
    {
      w: 360,
      markdown: "### A block editor, on the canvas\n\nHeadings, **bold**, *italic*, lists, checklists, code — double-click to edit.\n\n- Opt-in via spatialboard/blocknote\n- Round-trips as markdown in SBD",
    },
  );

  engine.createSticky(
    "Rich text sits alongside every core node — shapes, stickies, edges.",
    540,
    170,
    { w: 220, color: "#BBF7D0" },
  );
  engine.createShape("rect", 560, 340, 190, 110, { fill: "#FDE68A", fillStyle: "solid", label: "core node" });
}

export default function App() {
  const { engine, saveState, reset } = usePersistentBoard({
    storageKey: "sb-example-rich-text",
    seed,
  });

  return (
    <BoardShell title="Rich-text Board" subtitle="core + BlockNote · spatialboard/blocknote" saveState={saveState} onReset={reset}
      nav={<DemoSwitcher current="rich-text" />}>
      {/* defaultBoardNodes = coreBoardNodes + the rich-text node. */}
      <SpatialBoard engine={engine} nodeTypes={defaultBoardNodes} />
    </BoardShell>
  );
}
