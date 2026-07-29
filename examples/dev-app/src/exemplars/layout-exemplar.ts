import type { SpatialEngine } from "spatialboard";
import type { ConstantData } from "../nodes/constant";
import type { MathOpData } from "../nodes/math-op";
import type { DisplayData } from "../nodes/display";

/**
 * SpatialBoard exemplar — `llm-guidance/spatialboard-exemplars/README.md` + `spatialboard-board-layout.md`.
 * Minimal “pretty” L→R dataflow: generous column gaps, frame, title band separated from circuit.
 */
export function loadLayoutExemplarBoard(engine: SpatialEngine): void {
  engine.deleteNodes(Array.from(engine.nodes.keys()));
  let z = 1;

  const wire = (
    id: string,
    from: string,
    to: string,
    sp: string,
    tp: string,
    color: string,
  ) => {
    engine.addNode({
      id,
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: z++,
      data: {
        fromId: from,
        toId: to,
        style: "solid",
        color,
        strokeWidth: 2,
        arrowHead: "filled",
        edgeType: "bezier",
        sourcePort: sp,
        targetPort: tp,
      },
    });
  };

  // Outer frame — inset 40 from world origin feel
  engine.addNode({
    id: "le-frame",
    type: "frame",
    x: 40,
    y: 40,
    w: 1040,
    h: 460,
    z: z++,
    data: { label: "Layout exemplar — copy these gaps", color: "#0f172a" },
  });

  engine.addNode({
    id: "le-title",
    type: "text",
    x: 80,
    y: 72,
    w: 880,
    h: "auto",
    z: z++,
    data: {
      text: "Spacing reference: 20px grid \u2022 \u226540px between peers \u2022 \u2265120px between pipeline columns",
      fontSize: 22,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#e2e8f0",
      align: "left",
    },
  });

  engine.addNode({
    id: "le-sub",
    type: "text",
    x: 80,
    y: 128,
    w: 920,
    h: "auto",
    z: z++,
    data: {
      text: "Constant (7) \u2192 add \u2192 Display  —  column centers ~x=170 / 460 / 760",
      fontSize: 13,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#94a3b8",
      align: "left",
    },
  });

  // Column 1: two constants stacked with 48px vertical gap between bbox bottoms
  engine.addNode({
    id: "le-c7",
    type: "constant",
    x: 120,
    y: 220,
    w: 100,
    h: 80,
    z: z++,
    data: { value: 7, label: "A", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "le-c3",
    type: "constant",
    x: 120,
    y: 360,
    w: 100,
    h: 80,
    z: z++,
    data: { value: 3, label: "B", accentColor: "#6366f1" } satisfies ConstantData,
  });

  // Column 2: math op centered in lane (460 = middle of 400–520 lane)
  engine.addNode({
    id: "le-add",
    type: "math-op",
    x: 400,
    y: 260,
    w: 120,
    h: 100,
    z: z++,
    data: { op: "add", accentColor: "#f59e0b" } satisfies MathOpData,
  });

  // Column 3: display — 160px gap from math right edge (520) to display left (680)
  engine.addNode({
    id: "le-out",
    type: "display",
    x: 680,
    y: 270,
    w: 160,
    h: 80,
    z: z++,
    data: { label: "A + B", format: "number", accentColor: "#22c55e" } satisfies DisplayData,
  });

  wire("le-w7", "le-c7", "le-add", "value", "a", "#3b82f6");
  wire("le-w3", "le-c3", "le-add", "value", "b", "#6366f1");
  wire("le-wd", "le-add", "le-out", "result", "value", "#f59e0b");

  engine.fitToContent();
}
