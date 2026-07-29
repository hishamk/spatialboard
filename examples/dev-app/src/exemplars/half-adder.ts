import type { SpatialEngine } from "spatialboard";
import type { ToggleData } from "../nodes/toggle";
import type { ButtonData } from "../nodes/button";
import type { LogicGateData } from "../nodes/logic-gate";
import type { DisplayData } from "../nodes/display";

/**
 * SpatialBoard exemplar — `llm-guidance/spatialboard-exemplars/README.md` + `spatialboard-board-layout.md`.
 * Interactive half adder: Sum = A ⊕ B, Carry = A · B — 20px grid, title vs side panel clearance, pipeline columns.
 */
export function loadHalfAdderBoard(engine: SpatialEngine): void {
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

  engine.addNode({
    id: "ha-frame",
    type: "frame",
    x: 40,
    y: 40,
    w: 1160,
    h: 540,
    z: z++,
    data: { label: "Half adder (1-bit)", color: "#1a1f2e" },
  });

  // Title band: keep width ≤520 so truth table at x=680 does not overlap (80+520=600, gap 80)
  engine.addNode({
    id: "ha-title",
    type: "text",
    x: 80,
    y: 72,
    w: 500,
    h: "auto",
    z: z++,
    data: {
      text: "Half adder",
      fontSize: 36,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#fbbf24",
      align: "left",
    },
  });

  engine.addNode({
    id: "ha-sub",
    type: "text",
    x: 80,
    y: 132,
    w: 560,
    h: "auto",
    z: z++,
    data: {
      text: "Sum = A \u2295 B   \u2022   Carry = A \u00B7 B",
      fontSize: 14,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#94a3b8",
      align: "left",
    },
  });

  engine.addNode({
    id: "ha-hint",
    type: "text",
    x: 80,
    y: 176,
    w: 560,
    h: "auto",
    z: z++,
    data: {
      text: "Use Toggle A / Toggle B to change bits.",
      fontSize: 12,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#64748b",
      align: "left",
    },
  });

  engine.addNode({
    id: "ha-truth-cap",
    type: "text",
    x: 680,
    y: 72,
    w: 260,
    h: "auto",
    z: z++,
    data: {
      text: "Truth table",
      fontSize: 10,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#64748b",
      align: "left",
    },
  });

  engine.addNode({
    id: "ha-truth",
    type: "text",
    x: 680,
    y: 96,
    w: 260,
    h: "auto",
    z: z++,
    data: {
      text:
        "A B | Sum Car\n" +
        "0 0 |  0    0\n" +
        "0 1 |  1    0\n" +
        "1 0 |  1    0\n" +
        "1 1 |  0    1",
      fontSize: 12,
      fontFamily: "ui-monospace, Menlo, monospace",
      color: "#94a3b8",
      align: "left",
    },
  });

  // Input columns: 140px horizontal gap between A and B stacks (240→380)
  engine.addNode({
    id: "ha-lbl-a",
    type: "text",
    x: 120,
    y: 240,
    w: 120,
    h: "auto",
    z: z++,
    data: {
      text: "Input A",
      fontSize: 11,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#64748b",
      align: "center",
    },
  });

  engine.addNode({
    id: "ha-btn-a",
    type: "button",
    x: 120,
    y: 280,
    w: 120,
    h: 64,
    z: z++,
    data: { label: "Toggle A", fireCount: 0, accentColor: "#3b82f6" } satisfies ButtonData,
  });

  engine.addNode({
    id: "ha-tog-a",
    type: "toggle",
    x: 120,
    y: 380,
    w: 110,
    h: 78,
    z: z++,
    data: {
      state: false,
      lastTrigger: 0,
      lastReset: 0,
      accentColor: "#3b82f6",
    } satisfies ToggleData,
  });

  engine.addNode({
    id: "ha-lbl-b",
    type: "text",
    x: 360,
    y: 240,
    w: 120,
    h: "auto",
    z: z++,
    data: {
      text: "Input B",
      fontSize: 11,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#64748b",
      align: "center",
    },
  });

  engine.addNode({
    id: "ha-btn-b",
    type: "button",
    x: 360,
    y: 280,
    w: 120,
    h: 64,
    z: z++,
    data: { label: "Toggle B", fireCount: 0, accentColor: "#8b5cf6" } satisfies ButtonData,
  });

  engine.addNode({
    id: "ha-tog-b",
    type: "toggle",
    x: 360,
    y: 380,
    w: 110,
    h: 78,
    z: z++,
    data: {
      state: false,
      lastTrigger: 0,
      lastReset: 0,
      accentColor: "#8b5cf6",
    } satisfies ToggleData,
  });

  // Gates: lane x=600 (≥110px after toggles right edge 470)
  engine.addNode({
    id: "ha-lbl-xor",
    type: "text",
    x: 600,
    y: 250,
    w: 110,
    h: "auto",
    z: z++,
    data: {
      text: "XOR",
      fontSize: 10,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#64748b",
      align: "center",
    },
  });

  engine.addNode({
    id: "ha-xor",
    type: "logic-gate",
    x: 600,
    y: 280,
    w: 110,
    h: 100,
    z: z++,
    data: { mode: "xor", accentColor: "#22c55e" } satisfies LogicGateData,
  });

  engine.addNode({
    id: "ha-lbl-and",
    type: "text",
    x: 600,
    y: 390,
    w: 110,
    h: "auto",
    z: z++,
    data: {
      text: "AND",
      fontSize: 10,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#64748b",
      align: "center",
    },
  });

  engine.addNode({
    id: "ha-and",
    type: "logic-gate",
    x: 600,
    y: 420,
    w: 110,
    h: 100,
    z: z++,
    data: { mode: "and", accentColor: "#f97316" } satisfies LogicGateData,
  });

  // Outputs: x=820 (gap after gates)
  engine.addNode({
    id: "ha-d-sum",
    type: "display",
    x: 820,
    y: 290,
    w: 140,
    h: 80,
    z: z++,
    data: { label: "Sum (A\u2295B)", format: "raw", accentColor: "#22c55e" } satisfies DisplayData,
  });

  engine.addNode({
    id: "ha-d-carry",
    type: "display",
    x: 820,
    y: 430,
    w: 140,
    h: 80,
    z: z++,
    data: { label: "Carry (A\u00B7B)", format: "raw", accentColor: "#f97316" } satisfies DisplayData,
  });

  wire("ha-w-btna", "ha-btn-a", "ha-tog-a", "trigger", "trigger", "#3b82f6");
  wire("ha-w-btnb", "ha-btn-b", "ha-tog-b", "trigger", "trigger", "#8b5cf6");

  wire("ha-w-a-xor", "ha-tog-a", "ha-xor", "state", "a", "#3b82f6");
  wire("ha-w-b-xor", "ha-tog-b", "ha-xor", "state", "b", "#8b5cf6");
  wire("ha-w-a-and", "ha-tog-a", "ha-and", "state", "a", "#3b82f6");
  wire("ha-w-b-and", "ha-tog-b", "ha-and", "state", "b", "#8b5cf6");

  wire("ha-w-sum", "ha-xor", "ha-d-sum", "result", "value", "#22c55e");
  wire("ha-w-carry", "ha-and", "ha-d-carry", "result", "value", "#f97316");

  engine.fitToContent();
}
