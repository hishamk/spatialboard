import type { SpatialEngine } from "spatialboard";
import type { ConstantData } from "../nodes/constant";
import type { MathOpData } from "../nodes/math-op";
import type { TemplateData } from "../nodes/template";
import type { DisplayData } from "../nodes/display";
import type { ConditionData } from "../nodes/condition";
import type { RandomData } from "../nodes/random";
import type { ButtonData } from "../nodes/button";
import type { LoopData } from "../nodes/loop";
import type { StartData } from "../nodes/start";
import type { RoundData } from "../nodes/round";
import type { CompareData } from "../nodes/compare";
import type { LogicGateData } from "../nodes/logic-gate";
import type { LEDData } from "../nodes/led";
import type { StringOpData } from "../nodes/string-op";
import type { ConvertData } from "../nodes/convert";
import type { ExpressionData } from "../nodes/expression";
import type { LerpData } from "../nodes/lerp";
import type { ProgressBarData } from "../nodes/progress-bar";
import type { ThrottleData } from "../nodes/throttle";
import type { DebounceData } from "../nodes/debounce";
import type { OnceData } from "../nodes/once";
import type { SequenceData } from "../nodes/sequence";
import type { DelayData } from "../nodes/delay";
import type { LoggerData } from "../nodes/logger";
import type { AccumulatorData } from "../nodes/accumulator";
import type { ToggleData } from "../nodes/toggle";
import type { GateData } from "../nodes/gate";
import type { VariableData } from "../nodes/variable";
import type { DateTimeData } from "../nodes/date-time";
import type { ColorData } from "../nodes/color";
import type { MergeData } from "../nodes/merge";
import type { JsonParseData } from "../nodes/json-parse";
import type { HttpFetchData } from "../nodes/http-fetch";
import type { MapRemapData } from "../nodes/map-remap";
import type { ClampData } from "../nodes/clamp";
import type { SwitchData } from "../nodes/switch";
import type { IntervalData } from "../nodes/interval";
import type { SparklineData } from "../nodes/sparkline";
import type { AnalogClockData } from "../nodes/analog-clock";
import type { TimerData } from "../nodes/timer";
import type { DataCardData } from "../nodes/data-card";
import type { SpinningCubeData } from "../nodes/spinning-cube";

/**
 * Populates an engine with a comprehensive "Logic Playground" demo board.
 * Showcases ALL custom node types with interconnected, meaningful examples.
 */
export function loadLogicPlaygroundBoard(engine: SpatialEngine): void {
  engine.deleteNodes(Array.from(engine.nodes.keys()));

  let z = 1;

  // ── Edge helper ──────────────────────────────────────────────
  const wire = (
    id: string, from: string, to: string,
    sp: string, tp: string, color: string,
  ) => {
    engine.addNode({
      id, type: "edge", x: 0, y: 0, w: 0, h: 0, z: z++,
      data: {
        fromId: from, toId: to, style: "solid", color, strokeWidth: 2,
        arrowHead: "filled", edgeType: "bezier",
        sourcePort: sp, targetPort: tp,
      },
    });
  };

  // ══════════════════════════════════════════════════════════════
  // TITLE
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "title", type: "text",
    x: 60, y: 30, w: 800, h: "auto", z: z++,
    data: {
      text: "LOGIC PLAYGROUND",
      fontSize: 48, fontFamily: "sans-serif", color: "#e0e0e0", align: "left",
    },
  });

  engine.addNode({
    id: "subtitle", type: "text",
    x: 60, y: 90, w: 900, h: "auto", z: z++,
    data: {
      text: "42 node types \u2022 Reactive data-flow \u2022 Signal triggers \u2022 Math, logic, strings, state, timing & more",
      fontSize: 16, fontFamily: "sans-serif", color: "#6366f1", align: "left",
    },
  });

  // ══════════════════════════════════════════════════════════════
  // SECTION 1: Arithmetic & Rounding
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-arith", type: "frame",
    x: 60, y: 140, w: 900, h: 380, z: z++,
    data: { label: "Arithmetic & Rounding", color: "#1e2a3e" },
  });

  engine.addNode({
    id: "label-arith", type: "text",
    x: 250, y: 170, w: 600, h: "auto", z: z++,
    data: {
      text: "(A + B) \u00D7 C \u2192 Round \u2192 Display  |  Abs(\u20137.5) \u2192 Display",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  // Constants
  engine.addNode({
    id: "c-a", type: "constant",
    x: 110, y: 210, w: 90, h: 80, z: z++,
    data: { value: 42, label: "A", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-b", type: "constant",
    x: 110, y: 320, w: 90, h: 80, z: z++,
    data: { value: 18, label: "B", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "m-add", type: "math-op",
    x: 290, y: 230, w: 110, h: 100, z: z++,
    data: { op: "add", accentColor: "#f59e0b" } satisfies MathOpData,
  });

  engine.addNode({
    id: "c-c", type: "constant",
    x: 300, y: 360, w: 90, h: 80, z: z++,
    data: { value: 2, label: "C", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "m-mul", type: "math-op",
    x: 470, y: 250, w: 110, h: 100, z: z++,
    data: { op: "multiply", accentColor: "#f59e0b" } satisfies MathOpData,
  });

  engine.addNode({
    id: "rnd-1", type: "round",
    x: 640, y: 265, w: 100, h: 80, z: z++,
    data: { mode: "round", decimals: 0, accentColor: "#8b5cf6" } satisfies RoundData,
  });

  engine.addNode({
    id: "d-result", type: "display",
    x: 800, y: 260, w: 120, h: 80, z: z++,
    data: { label: "Result", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Abs mini-chain
  engine.addNode({
    id: "c-d", type: "constant",
    x: 480, y: 380, w: 90, h: 80, z: z++,
    data: { value: -7.5, label: "D", accentColor: "#ef4444" } satisfies ConstantData,
  });

  engine.addNode({
    id: "m-abs", type: "math-op",
    x: 640, y: 380, w: 100, h: 80, z: z++,
    data: { op: "abs", accentColor: "#f59e0b" } satisfies MathOpData,
  });

  engine.addNode({
    id: "d-abs", type: "display",
    x: 800, y: 380, w: 120, h: 80, z: z++,
    data: { label: "|D|", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Wires
  wire("w-a-add", "c-a", "m-add", "value", "a", "#3b82f6");
  wire("w-b-add", "c-b", "m-add", "value", "b", "#3b82f6");
  wire("w-add-mul", "m-add", "m-mul", "result", "a", "#f59e0b");
  wire("w-c-mul", "c-c", "m-mul", "value", "b", "#3b82f6");
  wire("w-mul-rnd", "m-mul", "rnd-1", "result", "value", "#f59e0b");
  wire("w-rnd-d", "rnd-1", "d-result", "out", "value", "#8b5cf6");
  wire("w-d-abs", "c-d", "m-abs", "value", "a", "#ef4444");
  wire("w-abs-d", "m-abs", "d-abs", "result", "value", "#f59e0b");

  // ══════════════════════════════════════════════════════════════
  // SECTION 2: Logic & Range Check
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-logic", type: "frame",
    x: 1020, y: 140, w: 780, h: 380, z: z++,
    data: { label: "Logic & Range Check", color: "#3b1e1e" },
  });

  engine.addNode({
    id: "label-logic", type: "text",
    x: 1200, y: 170, w: 500, h: "auto", z: z++,
    data: {
      text: "Is Score \u2265 60 AND \u2264 100? \u2192 Compare \u2192 Logic Gate \u2192 Condition",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  engine.addNode({
    id: "c-score", type: "constant",
    x: 1060, y: 240, w: 90, h: 70, z: z++,
    data: { value: 85, label: "Score", accentColor: "#22c55e" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-low", type: "constant",
    x: 1060, y: 330, w: 90, h: 70, z: z++,
    data: { value: 60, label: "Low", accentColor: "#ef4444" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-high", type: "constant",
    x: 1060, y: 420, w: 90, h: 70, z: z++,
    data: { value: 100, label: "High", accentColor: "#ef4444" } satisfies ConstantData,
  });

  // Score >= Low?
  engine.addNode({
    id: "cmp-ge", type: "compare",
    x: 1220, y: 250, w: 100, h: 90, z: z++,
    data: { op: ">=", accentColor: "#f97316" } satisfies CompareData,
  });

  // Score <= High?
  engine.addNode({
    id: "cmp-le", type: "compare",
    x: 1220, y: 380, w: 100, h: 90, z: z++,
    data: { op: "<=", accentColor: "#f97316" } satisfies CompareData,
  });

  // LED indicators
  engine.addNode({
    id: "led-ge", type: "led",
    x: 1370, y: 265, w: 55, h: 55, z: z++,
    data: { color: "#22c55e", accentColor: "#22c55e" } satisfies LEDData,
  });

  engine.addNode({
    id: "led-le", type: "led",
    x: 1370, y: 400, w: 55, h: 55, z: z++,
    data: { color: "#22c55e", accentColor: "#22c55e" } satisfies LEDData,
  });

  // AND gate
  engine.addNode({
    id: "lg-and", type: "logic-gate",
    x: 1460, y: 310, w: 100, h: 90, z: z++,
    data: { mode: "and", accentColor: "#a855f7" } satisfies LogicGateData,
  });

  // Condition: result > 0?
  engine.addNode({
    id: "c-zero", type: "constant",
    x: 1460, y: 420, w: 80, h: 60, z: z++,
    data: { value: 0, label: "0", accentColor: "#666" } satisfies ConstantData,
  });

  engine.addNode({
    id: "cond-range", type: "condition",
    x: 1590, y: 290, w: 120, h: 110, z: z++,
    data: { op: ">", accentColor: "#f97316" } satisfies ConditionData,
  });

  engine.addNode({
    id: "d-pass", type: "display",
    x: 1740, y: 260, w: 100, h: 70, z: z++,
    data: { label: "Pass", format: "raw", accentColor: "#22c55e" } satisfies DisplayData,
  });

  engine.addNode({
    id: "d-fail", type: "display",
    x: 1740, y: 380, w: 100, h: 70, z: z++,
    data: { label: "Fail", format: "raw", accentColor: "#ef4444" } satisfies DisplayData,
  });

  // Wires
  wire("w-sc-ge-a", "c-score", "cmp-ge", "value", "a", "#22c55e");
  wire("w-lo-ge-b", "c-low", "cmp-ge", "value", "b", "#ef4444");
  wire("w-sc-le-a", "c-score", "cmp-le", "value", "a", "#22c55e");
  wire("w-hi-le-b", "c-high", "cmp-le", "value", "b", "#ef4444");
  wire("w-ge-led", "cmp-ge", "led-ge", "result", "value", "#f97316");
  wire("w-le-led", "cmp-le", "led-le", "result", "value", "#f97316");
  wire("w-ge-and-a", "cmp-ge", "lg-and", "result", "a", "#f97316");
  wire("w-le-and-b", "cmp-le", "lg-and", "result", "b", "#f97316");
  wire("w-and-cond", "lg-and", "cond-range", "result", "a", "#a855f7");
  wire("w-zero-cond", "c-zero", "cond-range", "value", "b", "#666");
  wire("w-cond-pass", "cond-range", "d-pass", "then", "value", "#22c55e");
  wire("w-cond-fail", "cond-range", "d-fail", "else", "value", "#ef4444");

  // ══════════════════════════════════════════════════════════════
  // SECTION 3: String Processing
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-str", type: "frame",
    x: 60, y: 560, w: 800, h: 360, z: z++,
    data: { label: "String Processing", color: "#1e3a2e" },
  });

  engine.addNode({
    id: "label-str", type: "text",
    x: 220, y: 590, w: 550, h: "auto", z: z++,
    data: {
      text: "Template \u2192 String Ops (upper, length) \u2022 Convert number \u2192 string",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  // Row 1: number → template → upper → display
  engine.addNode({
    id: "c-year", type: "constant",
    x: 100, y: 640, w: 90, h: 70, z: z++,
    data: { value: 2026, label: "Year", accentColor: "#10b981" } satisfies ConstantData,
  });

  engine.addNode({
    id: "tmpl-hello", type: "template",
    x: 250, y: 630, w: 150, h: 90, z: z++,
    data: { template: "Hello {{a}}!", accentColor: "#10b981" } satisfies TemplateData,
  });

  engine.addNode({
    id: "sop-upper", type: "string-op",
    x: 460, y: 635, w: 120, h: 80, z: z++,
    data: {
      mode: "upper", separator: ",", searchFor: "", replaceWith: "",
      sliceStart: 0, sliceEnd: 0, accentColor: "#10b981",
    } satisfies StringOpData,
  });

  engine.addNode({
    id: "d-upper", type: "display",
    x: 640, y: 635, w: 120, h: 75, z: z++,
    data: { label: "Upper", format: "raw", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Row 2: number → template → length → display
  engine.addNode({
    id: "c-msgs", type: "constant",
    x: 100, y: 750, w: 90, h: 70, z: z++,
    data: { value: 5, label: "Msgs", accentColor: "#10b981" } satisfies ConstantData,
  });

  engine.addNode({
    id: "tmpl-msgs", type: "template",
    x: 250, y: 740, w: 150, h: 90, z: z++,
    data: { template: "{{a}} new messages", accentColor: "#10b981" } satisfies TemplateData,
  });

  engine.addNode({
    id: "sop-len", type: "string-op",
    x: 460, y: 745, w: 120, h: 80, z: z++,
    data: {
      mode: "length", separator: ",", searchFor: "", replaceWith: "",
      sliceStart: 0, sliceEnd: 0, accentColor: "#10b981",
    } satisfies StringOpData,
  });

  engine.addNode({
    id: "d-len", type: "display",
    x: 640, y: 745, w: 120, h: 75, z: z++,
    data: { label: "Length", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Row 3: number → convert(to string) → display
  engine.addNode({
    id: "c-pi", type: "constant",
    x: 250, y: 850, w: 90, h: 70, z: z++,
    data: { value: 3.14159, label: "\u03C0", accentColor: "#a855f7" } satisfies ConstantData,
  });

  engine.addNode({
    id: "conv-str", type: "convert",
    x: 420, y: 845, w: 100, h: 80, z: z++,
    data: { target: "string", accentColor: "#06b6d4" } satisfies ConvertData,
  });

  engine.addNode({
    id: "d-conv", type: "display",
    x: 590, y: 845, w: 120, h: 75, z: z++,
    data: { label: "As String", format: "raw", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Wires
  wire("w-yr-tmpl", "c-year", "tmpl-hello", "value", "a", "#10b981");
  wire("w-tmpl-up", "tmpl-hello", "sop-upper", "result", "a", "#10b981");
  wire("w-up-d", "sop-upper", "d-upper", "out", "value", "#10b981");
  wire("w-ms-tmpl", "c-msgs", "tmpl-msgs", "value", "a", "#10b981");
  wire("w-tmpl-len", "tmpl-msgs", "sop-len", "result", "a", "#10b981");
  wire("w-len-d", "sop-len", "d-len", "out", "value", "#10b981");
  wire("w-pi-conv", "c-pi", "conv-str", "value", "input", "#a855f7");
  wire("w-conv-d", "conv-str", "d-conv", "output", "value", "#06b6d4");

  // ══════════════════════════════════════════════════════════════
  // SECTION 4: Expression & Interpolation
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-expr", type: "frame",
    x: 920, y: 560, w: 880, h: 360, z: z++,
    data: { label: "Expression & Interpolation", color: "#2e1e3a" },
  });

  engine.addNode({
    id: "label-expr", type: "text",
    x: 1100, y: 590, w: 600, h: "auto", z: z++,
    data: {
      text: "Pythagorean: \u221A(a\u00B2+b\u00B2) \u2022 Lerp(0\u2192100, t=0.75) \u2192 Progress",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  // Expression: sqrt(a*a + b*b)
  engine.addNode({
    id: "c-ex", type: "constant",
    x: 960, y: 640, w: 80, h: 65, z: z++,
    data: { value: 3, label: "X", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-ey", type: "constant",
    x: 960, y: 725, w: 80, h: 65, z: z++,
    data: { value: 4, label: "Y", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "expr-pyth", type: "expression",
    x: 1120, y: 650, w: 150, h: 100, z: z++,
    data: { expr: "sqrt(a*a + b*b)", error: "", accentColor: "#e879f9" } satisfies ExpressionData,
  });

  engine.addNode({
    id: "d-hyp", type: "display",
    x: 1340, y: 665, w: 120, h: 75, z: z++,
    data: { label: "Hypotenuse", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Lerp: 0 → 100, t = 0.75 → 75
  engine.addNode({
    id: "c-lo", type: "constant",
    x: 960, y: 820, w: 80, h: 60, z: z++,
    data: { value: 0, label: "Lo", accentColor: "#06b6d4" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-hi", type: "constant",
    x: 1080, y: 820, w: 80, h: 60, z: z++,
    data: { value: 100, label: "Hi", accentColor: "#06b6d4" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-t", type: "constant",
    x: 1200, y: 820, w: 80, h: 60, z: z++,
    data: { value: 0.75, label: "T", accentColor: "#06b6d4" } satisfies ConstantData,
  });

  engine.addNode({
    id: "lerp-1", type: "lerp",
    x: 1340, y: 810, w: 120, h: 90, z: z++,
    data: { clamp: true, accentColor: "#06b6d4" } satisfies LerpData,
  });

  engine.addNode({
    id: "d-lerp", type: "display",
    x: 1530, y: 800, w: 110, h: 65, z: z++,
    data: { label: "Lerp", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  engine.addNode({
    id: "pb-lerp", type: "progress-bar",
    x: 1530, y: 875, w: 180, h: 40, z: z++,
    data: { label: "Progress", color: "#06b6d4", showPercent: true, accentColor: "#06b6d4" } satisfies ProgressBarData,
  });

  // Wires
  wire("w-ex-expr", "c-ex", "expr-pyth", "value", "a", "#3b82f6");
  wire("w-ey-expr", "c-ey", "expr-pyth", "value", "b", "#3b82f6");
  wire("w-expr-d", "expr-pyth", "d-hyp", "result", "value", "#e879f9");
  wire("w-lo-lerp", "c-lo", "lerp-1", "value", "a", "#06b6d4");
  wire("w-hi-lerp", "c-hi", "lerp-1", "value", "b", "#06b6d4");
  wire("w-t-lerp", "c-t", "lerp-1", "value", "t", "#06b6d4");
  wire("w-lerp-d", "lerp-1", "d-lerp", "result", "value", "#06b6d4");
  wire("w-lerp-pb", "lerp-1", "pb-lerp", "result", "value", "#06b6d4");

  // ══════════════════════════════════════════════════════════════
  // SECTION 5: Signal Flow & Timing
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-sig", type: "frame",
    x: 60, y: 960, w: 900, h: 400, z: z++,
    data: { label: "Signal Flow & Timing", color: "#1e1e3e" },
  });

  engine.addNode({
    id: "label-sig", type: "text",
    x: 220, y: 990, w: 650, h: "auto", z: z++,
    data: {
      text: "One button \u2192 Throttle, Debounce, Once, Sequence, Delay \u2192 LEDs & Logger",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  // Button
  engine.addNode({
    id: "btn-sig", type: "button",
    x: 100, y: 1100, w: 110, h: 85, z: z++,
    data: { label: "Fire!", fireCount: 0, accentColor: "#ec4899" } satisfies ButtonData,
  });

  // Throttle → LED
  engine.addNode({
    id: "thr-1", type: "throttle",
    x: 280, y: 1030, w: 110, h: 80, z: z++,
    data: { interval: 250, lastTrigger: 0, fireCount: 0, blocked: 0, accentColor: "#f59e0b" } satisfies ThrottleData,
  });

  engine.addNode({
    id: "led-thr", type: "led",
    x: 430, y: 1040, w: 50, h: 50, z: z++,
    data: { color: "#f59e0b", accentColor: "#f59e0b" } satisfies LEDData,
  });

  // Debounce → LED
  engine.addNode({
    id: "deb-1", type: "debounce",
    x: 280, y: 1120, w: 110, h: 80, z: z++,
    data: { delay: 500, lastTrigger: 0, fireCount: 0, pending: false, accentColor: "#3b82f6" } satisfies DebounceData,
  });

  engine.addNode({
    id: "led-deb", type: "led",
    x: 430, y: 1130, w: 50, h: 50, z: z++,
    data: { color: "#3b82f6", accentColor: "#3b82f6" } satisfies LEDData,
  });

  // Once → LED
  engine.addNode({
    id: "once-1", type: "once",
    x: 280, y: 1210, w: 110, h: 80, z: z++,
    data: { fired: false, lastTrigger: 0, lastReset: 0, fireCount: 0, accentColor: "#22c55e" } satisfies OnceData,
  });

  engine.addNode({
    id: "led-once", type: "led",
    x: 430, y: 1220, w: 50, h: 50, z: z++,
    data: { color: "#22c55e", accentColor: "#22c55e" } satisfies LEDData,
  });

  // Delay → Logger
  engine.addNode({
    id: "dly-1", type: "delay",
    x: 280, y: 1300, w: 100, h: 70, z: z++,
    data: { delay: 300, lastTrigger: 0, fireCount: 0, accentColor: "#14b8a6" } satisfies DelayData,
  });

  engine.addNode({
    id: "log-1", type: "logger",
    x: 430, y: 1280, w: 130, h: 100, z: z++,
    data: { entries: [], maxEntries: 10, lastTrigger: 0, accentColor: "#14b8a6" } satisfies LoggerData,
  });

  // Sequence → 3 LEDs
  engine.addNode({
    id: "seq-1", type: "sequence",
    x: 600, y: 1060, w: 120, h: 100, z: z++,
    data: {
      delay: 150, lastTrigger: 0, currentStep: 0,
      aCount: 0, bCount: 0, cCount: 0, accentColor: "#a855f7",
    } satisfies SequenceData,
  });

  engine.addNode({
    id: "led-sa", type: "led",
    x: 780, y: 1040, w: 50, h: 50, z: z++,
    data: { color: "#ef4444", accentColor: "#ef4444" } satisfies LEDData,
  });

  engine.addNode({
    id: "led-sb", type: "led",
    x: 780, y: 1110, w: 50, h: 50, z: z++,
    data: { color: "#f59e0b", accentColor: "#f59e0b" } satisfies LEDData,
  });

  engine.addNode({
    id: "led-sc", type: "led",
    x: 780, y: 1180, w: 50, h: 50, z: z++,
    data: { color: "#22c55e", accentColor: "#22c55e" } satisfies LEDData,
  });

  // Wires
  wire("w-btn-thr", "btn-sig", "thr-1", "trigger", "trigger", "#ec4899");
  wire("w-thr-led", "thr-1", "led-thr", "out", "value", "#f59e0b");
  wire("w-btn-deb", "btn-sig", "deb-1", "trigger", "trigger", "#ec4899");
  wire("w-deb-led", "deb-1", "led-deb", "out", "value", "#3b82f6");
  wire("w-btn-once", "btn-sig", "once-1", "trigger", "trigger", "#ec4899");
  wire("w-once-led", "once-1", "led-once", "out", "value", "#22c55e");
  wire("w-btn-dly", "btn-sig", "dly-1", "trigger", "trigger", "#ec4899");
  wire("w-dly-log", "dly-1", "log-1", "out", "trigger", "#14b8a6");
  wire("w-btn-seq", "btn-sig", "seq-1", "trigger", "trigger", "#ec4899");
  wire("w-seq-a", "seq-1", "led-sa", "a", "value", "#ef4444");
  wire("w-seq-b", "seq-1", "led-sb", "b", "value", "#f59e0b");
  wire("w-seq-c", "seq-1", "led-sc", "c", "value", "#22c55e");

  // ══════════════════════════════════════════════════════════════
  // SECTION 6: State Management
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-state", type: "frame",
    x: 1020, y: 960, w: 780, h: 400, z: z++,
    data: { label: "State Management", color: "#1e2e1e" },
  });

  engine.addNode({
    id: "label-state", type: "text",
    x: 1200, y: 990, w: 500, h: "auto", z: z++,
    data: {
      text: "Accumulator, Toggle + Gate, Variable \u2014 click button to update state",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  // Shared button
  engine.addNode({
    id: "btn-state", type: "button",
    x: 1060, y: 1130, w: 110, h: 85, z: z++,
    data: { label: "Trigger", fireCount: 0, accentColor: "#14b8a6" } satisfies ButtonData,
  });

  // Accumulator: +5 each press
  engine.addNode({
    id: "c-5", type: "constant",
    x: 1220, y: 1030, w: 80, h: 60, z: z++,
    data: { value: 5, label: "+5", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "acc-1", type: "accumulator",
    x: 1360, y: 1020, w: 110, h: 110, z: z++,
    data: { total: 0, count: 0, lastTrigger: 0, lastReset: 0, accentColor: "#f59e0b" } satisfies AccumulatorData,
  });

  engine.addNode({
    id: "d-total", type: "display",
    x: 1540, y: 1030, w: 110, h: 65, z: z++,
    data: { label: "Total", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Toggle → Gate → Display
  engine.addNode({
    id: "tog-1", type: "toggle",
    x: 1220, y: 1140, w: 100, h: 75, z: z++,
    data: { state: false, lastTrigger: 0, lastReset: 0, accentColor: "#f97316" } satisfies ToggleData,
  });

  engine.addNode({
    id: "c-42", type: "constant",
    x: 1220, y: 1240, w: 80, h: 60, z: z++,
    data: { value: 42, label: "42", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "gate-1", type: "gate",
    x: 1380, y: 1160, w: 100, h: 85, z: z++,
    data: { accentColor: "#f97316" } satisfies GateData,
  });

  engine.addNode({
    id: "d-gated", type: "display",
    x: 1540, y: 1160, w: 110, h: 65, z: z++,
    data: { label: "Gated", format: "raw", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Variable: store 99
  engine.addNode({
    id: "c-99", type: "constant",
    x: 1220, y: 1310, w: 80, h: 60, z: z++,
    data: { value: 99, label: "99", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "var-1", type: "variable",
    x: 1380, y: 1280, w: 110, h: 90, z: z++,
    data: {
      label: "myVar", storedValue: 0, defaultValue: 0,
      lastSet: 0, lastReset: 0, accentColor: "#e879f9",
    } satisfies VariableData,
  });

  engine.addNode({
    id: "d-var", type: "display",
    x: 1540, y: 1290, w: 110, h: 65, z: z++,
    data: { label: "Stored", format: "raw", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Wires
  wire("w-btn-acc", "btn-state", "acc-1", "trigger", "trigger", "#14b8a6");
  wire("w-5-acc", "c-5", "acc-1", "value", "value", "#3b82f6");
  wire("w-acc-d", "acc-1", "d-total", "total", "value", "#f59e0b");
  wire("w-btn-tog", "btn-state", "tog-1", "trigger", "trigger", "#14b8a6");
  wire("w-tog-gate", "tog-1", "gate-1", "state", "enable", "#f97316");
  wire("w-42-gate", "c-42", "gate-1", "value", "value", "#3b82f6");
  wire("w-gate-d", "gate-1", "d-gated", "out", "value", "#f97316");
  wire("w-99-var", "c-99", "var-1", "value", "value", "#3b82f6");
  wire("w-btn-var", "btn-state", "var-1", "trigger", "set", "#14b8a6");
  wire("w-var-d", "var-1", "d-var", "out", "value", "#e879f9");

  // ══════════════════════════════════════════════════════════════
  // SECTION 7: Data Pipeline
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-data", type: "frame",
    x: 60, y: 1400, w: 800, h: 380, z: z++,
    data: { label: "Data Pipeline", color: "#2e2a1e" },
  });

  engine.addNode({
    id: "label-data", type: "text",
    x: 220, y: 1430, w: 550, h: "auto", z: z++,
    data: {
      text: "Date/Time + Color \u2192 Merge \u2022 Template \u2192 JSON Parse \u2022 HTTP Fetch",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  // Date + Color → Merge → Display
  engine.addNode({
    id: "dt-1", type: "date-time",
    x: 100, y: 1480, w: 130, h: 100, z: z++,
    data: { currentTime: Date.now(), lastTrigger: 0, autoRefresh: true, accentColor: "#f59e0b" } satisfies DateTimeData,
  });

  engine.addNode({
    id: "col-1", type: "color",
    x: 100, y: 1600, w: 90, h: 90, z: z++,
    data: { color: "#6366f1", accentColor: "#6366f1" } satisfies ColorData,
  });

  engine.addNode({
    id: "mrg-1", type: "merge",
    x: 310, y: 1520, w: 110, h: 110, z: z++,
    data: { accentColor: "#f59e0b" } satisfies MergeData,
  });

  engine.addNode({
    id: "d-merge", type: "display",
    x: 490, y: 1540, w: 120, h: 75, z: z++,
    data: { label: "Merged", format: "json", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Template → JSON Parse
  engine.addNode({
    id: "c-cnt", type: "constant",
    x: 100, y: 1720, w: 80, h: 60, z: z++,
    data: { value: 42, label: "N", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "tmpl-json", type: "template",
    x: 260, y: 1700, w: 170, h: 80, z: z++,
    data: { template: '{"count":{{a}},"ok":true}', accentColor: "#10b981" } satisfies TemplateData,
  });

  engine.addNode({
    id: "jp-1", type: "json-parse",
    x: 490, y: 1700, w: 120, h: 80, z: z++,
    data: { path: "count", accentColor: "#06b6d4" } satisfies JsonParseData,
  });

  engine.addNode({
    id: "d-jp", type: "display",
    x: 670, y: 1705, w: 110, h: 65, z: z++,
    data: { label: "Parsed", format: "raw", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // HTTP Fetch
  engine.addNode({
    id: "btn-fetch", type: "button",
    x: 490, y: 1480, w: 100, h: 70, z: z++,
    data: { label: "Fetch", fireCount: 0, accentColor: "#ef4444" } satisfies ButtonData,
  });

  engine.addNode({
    id: "http-1", type: "http-fetch",
    x: 640, y: 1470, w: 140, h: 100, z: z++,
    data: {
      url: "https://jsonplaceholder.typicode.com/todos/1",
      method: "GET", body: "", lastTrigger: 0, status: null,
      response: "", error: "", loading: false, accentColor: "#ef4444",
    } satisfies HttpFetchData,
  });

  // Wires
  wire("w-dt-mrg", "dt-1", "mrg-1", "date", "a", "#f59e0b");
  wire("w-col-mrg", "col-1", "mrg-1", "hex", "b", "#6366f1");
  wire("w-mrg-d", "mrg-1", "d-merge", "out", "value", "#f59e0b");
  wire("w-cnt-tmpl", "c-cnt", "tmpl-json", "value", "a", "#3b82f6");
  wire("w-tmpl-jp", "tmpl-json", "jp-1", "result", "input", "#10b981");
  wire("w-jp-d", "jp-1", "d-jp", "output", "value", "#06b6d4");
  wire("w-btn-http", "btn-fetch", "http-1", "trigger", "trigger", "#ef4444");

  // ══════════════════════════════════════════════════════════════
  // SECTION 8: Math Transforms & Routing
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-math", type: "frame",
    x: 920, y: 1400, w: 880, h: 380, z: z++,
    data: { label: "Math Transforms & Routing", color: "#1e2e3a" },
  });

  engine.addNode({
    id: "label-math", type: "text",
    x: 1100, y: 1430, w: 600, h: "auto", z: z++,
    data: {
      text: "Map Remap \u2192 Clamp \u2192 Progress \u2022 Switch selects between inputs",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  // Map-Remap → Clamp → Display + Progress
  engine.addNode({
    id: "c-val", type: "constant",
    x: 960, y: 1500, w: 80, h: 60, z: z++,
    data: { value: 75, label: "Val", accentColor: "#3b82f6" } satisfies ConstantData,
  });

  engine.addNode({
    id: "mrm-1", type: "map-remap",
    x: 1100, y: 1490, w: 120, h: 80, z: z++,
    data: { inMin: 0, inMax: 100, outMin: 0, outMax: 255, clamp: true, accentColor: "#06b6d4" } satisfies MapRemapData,
  });

  engine.addNode({
    id: "clm-1", type: "clamp",
    x: 1280, y: 1495, w: 100, h: 70, z: z++,
    data: { min: 0, max: 200, accentColor: "#f59e0b" } satisfies ClampData,
  });

  engine.addNode({
    id: "d-remap", type: "display",
    x: 1440, y: 1490, w: 110, h: 65, z: z++,
    data: { label: "Clamped", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  engine.addNode({
    id: "pb-remap", type: "progress-bar",
    x: 1440, y: 1565, w: 180, h: 35, z: z++,
    data: { label: "0\u2013200", color: "#06b6d4", showPercent: true, accentColor: "#06b6d4" } satisfies ProgressBarData,
  });

  // Switch: selector picks from 3 constants
  engine.addNode({
    id: "c-sel", type: "constant",
    x: 960, y: 1630, w: 80, h: 60, z: z++,
    data: { value: 1, label: "Sel", accentColor: "#a855f7" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-sw-a", type: "constant",
    x: 1100, y: 1620, w: 80, h: 55, z: z++,
    data: { value: 10, label: "A", accentColor: "#22c55e" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-sw-b", type: "constant",
    x: 1100, y: 1685, w: 80, h: 55, z: z++,
    data: { value: 20, label: "B", accentColor: "#22c55e" } satisfies ConstantData,
  });

  engine.addNode({
    id: "c-sw-c", type: "constant",
    x: 1100, y: 1750, w: 80, h: 55, z: z++,
    data: { value: 30, label: "C", accentColor: "#22c55e" } satisfies ConstantData,
  });

  engine.addNode({
    id: "sw-1", type: "switch",
    x: 1280, y: 1630, w: 120, h: 130, z: z++,
    data: { channels: 3, mode: "index", accentColor: "#a855f7" } satisfies SwitchData,
  });

  engine.addNode({
    id: "d-sw", type: "display",
    x: 1470, y: 1665, w: 110, h: 65, z: z++,
    data: { label: "Selected", format: "raw", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Wires
  wire("w-val-mrm", "c-val", "mrm-1", "value", "value", "#3b82f6");
  wire("w-mrm-clm", "mrm-1", "clm-1", "out", "value", "#06b6d4");
  wire("w-clm-d", "clm-1", "d-remap", "out", "value", "#f59e0b");
  wire("w-clm-pb", "clm-1", "pb-remap", "out", "value", "#f59e0b");
  wire("w-sel-sw", "c-sel", "sw-1", "value", "index", "#a855f7");
  wire("w-swa-sw", "c-sw-a", "sw-1", "value", "a", "#22c55e");
  wire("w-swb-sw", "c-sw-b", "sw-1", "value", "b", "#22c55e");
  wire("w-swc-sw", "c-sw-c", "sw-1", "value", "c", "#22c55e");
  wire("w-sw-d", "sw-1", "d-sw", "out", "value", "#a855f7");

  // ══════════════════════════════════════════════════════════════
  // SECTION 9: Loop Container
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "label-loop", type: "text",
    x: 60, y: 1820, w: 600, h: "auto", z: z++,
    data: {
      text: "Loop Container \u2014 Click \u201CRun Loop\u201D to trigger 5 iterations with 500ms delay",
      fontSize: 14, fontFamily: "sans-serif", color: "#14b8a6", align: "left",
    },
  });

  engine.addNode({
    id: "loop-1", type: "loop",
    x: 60, y: 1860, w: 600, h: 300, z: z++,
    data: {
      count: 5, delay: 500, currentIndex: 0, running: false,
      lastTrigger: 0, tick: 0, doneCount: 0, accentColor: "#14b8a6",
    } satisfies LoopData,
  });

  engine.addNode({
    id: "start-lp", type: "start",
    x: 110, y: 1950, w: 100, h: 40, z: z++,
    data: { fireCount: 0, accentColor: "#ef4444" } satisfies StartData,
  });

  engine.addNode({
    id: "rand-lp", type: "random",
    x: 300, y: 1900, w: 120, h: 160, z: z++,
    data: { min: 1, max: 100, decimals: 0, value: 0, lastTrigger: 0, accentColor: "#06b6d4" } satisfies RandomData,
  });

  engine.addNode({
    id: "d-rolled", type: "display",
    x: 490, y: 1940, w: 120, h: 75, z: z++,
    data: { label: "Rolled", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
  });

  // Button to trigger loop
  engine.addNode({
    id: "btn-loop", type: "button",
    x: 720, y: 1950, w: 110, h: 85, z: z++,
    data: { label: "Run Loop", fireCount: 0, accentColor: "#14b8a6" } satisfies ButtonData,
  });

  // Loop outputs
  engine.addNode({
    id: "d-iter", type: "display",
    x: 720, y: 2070, w: 110, h: 65, z: z++,
    data: { label: "Iteration", format: "number", accentColor: "#14b8a6" } satisfies DisplayData,
  });

  engine.addNode({
    id: "d-done", type: "display",
    x: 860, y: 2070, w: 110, h: 65, z: z++,
    data: { label: "Done", format: "number", accentColor: "#22c55e" } satisfies DisplayData,
  });

  // Wires
  wire("w-start-rand", "start-lp", "rand-lp", "trigger", "trigger", "#ef4444");
  wire("w-rand-dlp", "rand-lp", "d-rolled", "value", "value", "#06b6d4");
  wire("w-btn-loop", "btn-loop", "loop-1", "trigger", "trigger", "#14b8a6");
  wire("w-loop-iter", "loop-1", "d-iter", "index", "value", "#14b8a6");
  wire("w-loop-done", "loop-1", "d-done", "done", "value", "#22c55e");

  // ══════════════════════════════════════════════════════════════
  // SECTION 10: Dashboard & Widgets
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-dash", type: "frame",
    x: 820, y: 1830, w: 980, h: 360, z: z++,
    data: { label: "Dashboard & Widgets", color: "#2e1e2e" },
  });

  engine.addNode({
    id: "label-dash", type: "text",
    x: 1000, y: 1860, w: 700, h: "auto", z: z++,
    data: {
      text: "Interval \u2192 Random \u2192 Sparkline \u2022 Clock, Timer, Data Card, Spinning Cube",
      fontSize: 12, fontFamily: "sans-serif", color: "#888", align: "left",
    },
  });

  // Interval → Random → Sparkline
  engine.addNode({
    id: "intv-1", type: "interval",
    x: 860, y: 1920, w: 110, h: 90, z: z++,
    data: {
      interval: 1000, running: true, tickCount: 0,
      lastStart: 0, lastStop: 0, accentColor: "#f97316",
    } satisfies IntervalData,
  });

  engine.addNode({
    id: "rand-dash", type: "random",
    x: 1020, y: 1900, w: 110, h: 140, z: z++,
    data: { min: 0, max: 100, decimals: 0, value: 50, lastTrigger: 0, accentColor: "#06b6d4" } satisfies RandomData,
  });

  engine.addNode({
    id: "spark-1", type: "sparkline",
    x: 1190, y: 1910, w: 180, h: 90, z: z++,
    data: {
      samples: [45, 62, 38, 71, 55, 83, 29, 67, 44, 58],
      maxSamples: 30, lastTrigger: 0, accentColor: "#22c55e",
    } satisfies SparklineData,
  });

  // Standalone widgets
  engine.addNode({
    id: "clock-1", type: "analog-clock",
    x: 860, y: 2040, w: 130, h: 130, z: z++,
    data: { utcOffset: 0, label: "UTC" } satisfies AnalogClockData,
  });

  engine.addNode({
    id: "timer-1", type: "timer",
    x: 1020, y: 2060, w: 140, h: 90, z: z++,
    data: {
      mode: "countdown", targetSeconds: 300, elapsed: 0,
      running: false,
    } satisfies TimerData,
  });

  engine.addNode({
    id: "dcard-1", type: "data-card",
    x: 1400, y: 1910, w: 180, h: 130, z: z++,
    data: {
      title: "System Status",
      fields: [
        { key: "CPU", value: "45%" },
        { key: "Memory", value: "2.1 GB" },
        { key: "Uptime", value: "3d 14h" },
      ],
    } satisfies DataCardData,
  });

  engine.addNode({
    id: "cube-1", type: "spinning-cube",
    x: 1420, y: 2060, w: 140, h: 130, z: z++,
    data: { speed: 1, palette: "neon", strokeWidth: 2, spinning: true } satisfies SpinningCubeData,
  });

  // Wires
  wire("w-intv-rand", "intv-1", "rand-dash", "tick", "trigger", "#f97316");
  wire("w-rand-spark", "rand-dash", "spark-1", "value", "value", "#06b6d4");
  wire("w-intv-spark", "intv-1", "spark-1", "tick", "trigger", "#f97316");

  // ══════════════════════════════════════════════════════════════
  // STICKY TIPS
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "sticky-1", type: "sticky",
    x: 1860, y: 140, w: 200, h: 130, z: z++, rotation: 2,
    data: {
      text: "Click any Constant node and edit its value in the Properties Panel to see reactive updates flow through the graph!",
      color: "#BFDBFE",
    },
  });

  engine.addNode({
    id: "sticky-2", type: "sticky",
    x: 1860, y: 300, w: 200, h: 110, z: z++, rotation: -1,
    data: {
      text: "Signal ports (red) trigger actions. Data ports (blue/green) carry values continuously.",
      color: "#FEF3C7",
    },
  });

  engine.addNode({
    id: "sticky-3", type: "sticky",
    x: 1860, y: 440, w: 200, h: 100, z: z++, rotation: 3,
    data: {
      text: "The Loop node is a container \u2014 drag nodes inside it. Start fires each iteration!",
      color: "#BBF7D0",
    },
  });

  engine.addNode({
    id: "sticky-4", type: "sticky",
    x: 1860, y: 570, w: 200, h: 110, z: z++, rotation: -2,
    data: {
      text: "42 node types! Math, logic, strings, timing, state, data, routing, visualization, and more.",
      color: "#E9D5FF",
    },
  });
}
