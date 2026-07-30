import { SpatialBoard, coreBoardNodes, type SpatialEngine } from "spatialboard";
import "spatialboard/style.css";
import { usePersistentBoard } from "./usePersistentBoard";
import { BoardShell } from "./BoardShell";
import { numberNodeType } from "./nodes/number";
import { multiplyNodeType } from "./nodes/multiply";
import { gaugeNodeType } from "./nodes/gauge";

/**
 * Example 3 — custom nodes + data-flow.
 *
 * A node type is a plain object: an `id`/`type`, a React `component`, `ports`, and
 * a pure `compute(inputs, data)`. Custom types are peers of the built-ins — just
 * spread them into `nodeTypes`. When any node declares ports, `SpatialBoard` runs
 * the data-flow engine automatically: connect an output port to an input port and
 * values propagate.
 */
const nodeTypes = [...coreBoardNodes, numberNodeType, multiplyNodeType, gaugeNodeType];

function seed(engine: SpatialEngine) {
  engine.createText("Custom nodes → live data-flow", 90, 40, { fontSize: 26, w: 560 });
  engine.createText(
    "Two Number sources feed a Multiply node; its product drives the Gauge. Click −/+ on a Number and watch it flow downstream.",
    90,
    92,
    { fontSize: 14, w: 640 },
  );

  // Custom-typed nodes are added like any node — `type` matches the def above.
  engine.addNode({ id: "num-w", type: "df-number", x: 110, y: 190, w: 130, h: 150, z: engine.nextZ(), data: { label: "Width", value: 6 } });
  engine.addNode({ id: "num-h", type: "df-number", x: 110, y: 380, w: 130, h: 150, z: engine.nextZ(), data: { label: "Height", value: 4 } });
  engine.addNode({ id: "mul", type: "df-multiply", x: 350, y: 285, w: 150, h: 140, z: engine.nextZ(), data: { label: "Area" } });
  engine.addNode({ id: "gauge", type: "df-gauge", x: 590, y: 285, w: 180, h: 140, z: engine.nextZ(), data: { label: "Area", max: 80 } });

  // Wire output ports → input ports. The engine resolves values along each edge.
  engine.createEdge("num-w", "mul", { sourcePort: "out", targetPort: "a", arrowHead: "filled", edgeType: "bezier" });
  engine.createEdge("num-h", "mul", { sourcePort: "out", targetPort: "b", arrowHead: "filled", edgeType: "bezier" });
  engine.createEdge("mul", "gauge", { sourcePort: "product", targetPort: "in", arrowHead: "filled", edgeType: "bezier" });
}

export default function App() {
  const { engine, saveState, reset } = usePersistentBoard({
    storageKey: "sb-example-custom-nodes",
    seed,
  });

  return (
    <BoardShell title="Custom Nodes" subtitle="data-flow · ports + compute" saveState={saveState} onReset={reset}>
      <SpatialBoard engine={engine} nodeTypes={nodeTypes} dataFlowEdgeOverlay="ports+compute" />
    </BoardShell>
  );
}
