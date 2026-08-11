import { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { SpatialBoard, SpatialEngine } from "spatialboard";
import { defaultBoardNodes } from "spatialboard/blocknote";
import { dataCardNodeType, type DataCardData } from "./nodes/data-card";
import { timerNodeType, type TimerData } from "./nodes/timer";
import { analogClockNodeType, type AnalogClockData } from "./nodes/analog-clock";
import { spinningCubeNodeType, type SpinningCubeData } from "./nodes/spinning-cube";
import { constantNodeType, type ConstantData } from "./nodes/constant";
import { mathOpNodeType, type MathOpData } from "./nodes/math-op";
import { templateNodeType, type TemplateData } from "./nodes/template";
import { displayNodeType, type DisplayData } from "./nodes/display";
import { conditionNodeType, type ConditionData } from "./nodes/condition";
import { randomNodeType, type RandomData } from "./nodes/random";
import { buttonNodeType, type ButtonData } from "./nodes/button";
import { loopNodeType, type LoopData } from "./nodes/loop";
import { startNodeType, type StartData } from "./nodes/start";
import { gateNodeType, type GateData } from "./nodes/gate";
import { delayNodeType, type DelayData } from "./nodes/delay";
import { accumulatorNodeType, type AccumulatorData } from "./nodes/accumulator";
import { logicGateNodeType, type LogicGateData } from "./nodes/logic-gate";
import { loggerNodeType, type LoggerData } from "./nodes/logger";
import { toggleNodeType, type ToggleData } from "./nodes/toggle";
import { switchNodeType, type SwitchData } from "./nodes/switch";
import { mapRemapNodeType, type MapRemapData } from "./nodes/map-remap";
import { intervalNodeType, type IntervalData } from "./nodes/interval";
import { ledNodeType, type LEDData } from "./nodes/led";
import { clampNodeType, type ClampData } from "./nodes/clamp";
import { roundNodeType, type RoundData } from "./nodes/round";
import { progressBarNodeType, type ProgressBarData } from "./nodes/progress-bar";
import { sparklineNodeType, type SparklineData } from "./nodes/sparkline";
import { colorNodeType, type ColorData } from "./nodes/color";
import { debounceNodeType, type DebounceData } from "./nodes/debounce";
import { sequenceNodeType, type SequenceData } from "./nodes/sequence";
import { onceNodeType, type OnceData } from "./nodes/once";
import { dateTimeNodeType, type DateTimeData } from "./nodes/date-time";
import { mergeNodeType, type MergeData } from "./nodes/merge";
import { httpFetchNodeType, type HttpFetchData } from "./nodes/http-fetch";
import { jsonParseNodeType, type JsonParseData } from "./nodes/json-parse";
import { stringOpNodeType, type StringOpData } from "./nodes/string-op";
import { expressionNodeType, type ExpressionData } from "./nodes/expression";
import { compareNodeType, type CompareData } from "./nodes/compare";
import { lerpNodeType, type LerpData } from "./nodes/lerp";
import { throttleNodeType, type ThrottleData } from "./nodes/throttle";
import { convertNodeType, type ConvertData } from "./nodes/convert";
import { variableNodeType, type VariableData } from "./nodes/variable";
import { exemplarDebugBoards } from "./exemplar-debug-boards";
import { loadSummitDayBoard } from "./exemplars";
import { DEV_CUSTOM_NODE_DOCS } from "./localization/custom-node-docs";
import { nanoid } from "nanoid";

const nodeTypes = [
  ...defaultBoardNodes,
  dataCardNodeType, timerNodeType, analogClockNodeType, spinningCubeNodeType,
  constantNodeType, mathOpNodeType, templateNodeType, displayNodeType,
  conditionNodeType, randomNodeType, buttonNodeType, loopNodeType, startNodeType,
  gateNodeType, delayNodeType, accumulatorNodeType, logicGateNodeType, loggerNodeType,
  toggleNodeType, switchNodeType, mapRemapNodeType, intervalNodeType, ledNodeType,
  clampNodeType, roundNodeType, progressBarNodeType, sparklineNodeType, colorNodeType,
  debounceNodeType, sequenceNodeType, onceNodeType, dateTimeNodeType, mergeNodeType,
  httpFetchNodeType, jsonParseNodeType,
  stringOpNodeType, expressionNodeType, compareNodeType, lerpNodeType,
  throttleNodeType, convertNodeType, variableNodeType,
];

// ── Helper: viewport center ─────────────────────────────────

function viewportCenter(engine: SpatialEngine) {
  const vp = engine.viewport;
  return {
    cx: -vp.x / vp.zoom + (window.innerWidth / 2) / vp.zoom,
    cy: -vp.y / vp.zoom + (window.innerHeight / 2) / vp.zoom,
    z: engine.nodes.size + 1,
  };
}

export default function App() {
  const engine = useMemo(() => new SpatialEngine(), []);
  const boardLocalization = useMemo(
    () => ({ customNodeDocs: DEV_CUSTOM_NODE_DOCS }),
    [],
  );

  useEffect(() => {
    const w = window as unknown as Record<string, unknown>;
    w.__engine = engine;
    /** MCP `spatialboard_list_node_types` merges `docTitle` / `docBody` from these keys. */
    w.__nodeTypeDocs = DEV_CUSTOM_NODE_DOCS;
  }, [engine]);

  // The dev-app has no persistence — start on the Summit day board instead of
  // an empty canvas. (The loader clears the board first, so it's idempotent
  // under StrictMode's double-invoked effects.) The loader's fitToContent()
  // runs against the engine's default 2000×1500 container — the ResizeObserver
  // delivers the real size later in the first frame, AFTER rAF callbacks — so
  // re-fit on the second frame.
  useEffect(() => {
    loadSummitDayBoard(engine);
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => engine.fitToContent());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [engine]);

  // ── Agent demo ──────────────────────────────────────────────

  const CURSOR_SPEED = 280; // pixels per second for tweened cursor movement

  const agentCursorRef = useRef<HTMLDivElement | null>(null);
  const agentRunningRef = useRef(false);
  const cursorPosRef = useRef({ x: 0, y: 0 });

  const agentMoveCursor = useCallback((screenX: number, screenY: number): number => {
    let el = agentCursorRef.current;
    if (!el) {
      el = document.createElement("div");
      el.style.cssText = "position:fixed;width:20px;height:20px;border-radius:50%;background:#ef4444;border:2px solid #fff;box-shadow:0 0 12px rgba(239,68,68,0.6),0 0 0 4px rgba(239,68,68,0.2);pointer-events:none;z-index:99999;transform:translate(-50%,-50%);";
      document.body.appendChild(el);
      agentCursorRef.current = el;
      // First placement: no transition
      el.style.left = screenX + "px";
      el.style.top = screenY + "px";
      cursorPosRef.current = { x: screenX, y: screenY };
      return 0;
    }

    const dx = screenX - cursorPosRef.current.x;
    const dy = screenY - cursorPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const duration = Math.max(100, Math.round((dist / CURSOR_SPEED) * 1000));

    el.style.transition = `left ${duration}ms ease-out, top ${duration}ms ease-out`;
    el.style.left = screenX + "px";
    el.style.top = screenY + "px";
    cursorPosRef.current = { x: screenX, y: screenY };

    return duration;
  }, []);

  const agentShowCursor = useCallback((visible: boolean) => {
    if (agentCursorRef.current) {
      agentCursorRef.current.style.display = visible ? "block" : "none";
    }
  }, []);

  const agentRemoveCursor = useCallback(() => {
    agentCursorRef.current?.remove();
    agentCursorRef.current = null;
  }, []);

  /** Convert canvas coords to screen coords using the engine viewport + container. */
  const agentCanvasToScreen = useCallback((cx: number, cy: number): { x: number; y: number } => {
    const vp = engine.viewport;
    const cont = engine.containerOffset;
    return {
      x: cx * vp.zoom + vp.x + cont.x,
      y: cy * vp.zoom + vp.y + cont.y,
    };
  }, [engine]);

  /** Tween cursor to a canvas position, wait for it to arrive, then pause. */
  const agentPointAt = useCallback(async (cx: number, cy: number, label?: string) => {
    const screen = agentCanvasToScreen(cx, cy);
    const duration = agentMoveCursor(screen.x, screen.y);
    agentShowCursor(true);
    if (label) {
      const statusEl = document.getElementById("agent-status");
      if (statusEl) statusEl.textContent = label;
    }
    // Wait for tweened cursor to finish moving + brief settle pause
    await new Promise(r => setTimeout(r, duration + 180));
  }, [agentCanvasToScreen, agentMoveCursor, agentShowCursor]);

  const agentDemo = useCallback(async () => {
    if (agentRunningRef.current) return;
    agentRunningRef.current = true;

    // Add a floating status bar
    const statusBar = document.createElement("div");
    statusBar.id = "agent-status";
    statusBar.style.cssText = "position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:8px 20px;border-radius:8px;font:14px/1.4 monospace;z-index:99998;box-shadow:0 4px 20px rgba(0,0,0,0.5);border:1px solid #333;white-space:nowrap;pointer-events:none;";
    statusBar.textContent = "Agent starting…";
    document.body.appendChild(statusBar);

    try {
      // Clear board
      engine.setMode("select");
      engine.deselectAll();
      for (const n of engine.getAllNodes()) engine.deleteNode(n.id);
      await agentPointAt(100, 50, "Clearing the board...");

      // ── Step 1: Draw a big rounded rect (background frame) ──
      await engine.animatePanTo(300, 225, 300);
      await agentPointAt(80, 80, "Drawing a frame...");
      const frameId = engine.createFrame(50, 30, 500, 390, {
        label: "Agent Demo", backgroundColor: "#1e1e3015", borderColor: "#6366f1",
      });

      // ── Step 2: Draw a shape (rect) ──
      await agentPointAt(160, 140, "Creating a shape node...");
      const shapeId1 = engine.createShape("rect", 90, 90, 140, 80, {
        fill: "#3b82f6", label: "Hello Agent", stroke: "#1e40af",
      });

      // ── Step 3: Draw another shape ──
      await agentPointAt(380, 140, "Creating another shape...");
      const shapeId2 = engine.createShape("rect", 320, 90, 140, 80, {
        fill: "#10b981", label: "Draw Stuff", stroke: "#047857",
      });

      // ── Step 4: Draw a diamond in the middle ──
      await agentPointAt(270, 280, "Adding a decision diamond...");
      const diamondId = engine.createShape("diamond", 200, 220, 140, 130, {
        fill: "#f59e0b", label: "More?", stroke: "#d97706",
      });

      // ── Step 5: Draw a freehand stroke (under the diamond) ──
      await agentPointAt(270, 360, "Drawing a freehand underline...");
      const pts: Array<[number, number, number?]> = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        pts.push([180 + t * 180, 360 + Math.sin(t * Math.PI * 2) * 8, 0.5]);
      }
      engine.createDrawStroke(pts, { color: "#ef4444", width: 4 });

      // ── Step 6: Add a sticky note ──
      await engine.animatePanTo(480, 360, 300);
      await agentPointAt(500, 200, "Adding a sticky reminder...");
      engine.createSticky("This was drawn\nby an AI agent!", 440, 300, {
        color: "#FEF3C7", w: 150, h: 90,
      });

      // ── Step 7: Connect the shapes with edges ──
      await engine.animatePanTo(240, 140, 300);
      await agentPointAt(230, 130, "Connecting nodes...");
      engine.createEdge(shapeId1, diamondId, {
        color: "#6366f1", arrowHead: "filled", label: "start",
      });

      await agentPointAt(360, 140, "Connecting more nodes...");
      engine.createEdge(shapeId2, diamondId, {
        color: "#6366f1", arrowHead: "filled", label: "end",
      });

      // ── Step 8: Pan to fit everything ──
      await agentPointAt(300, 260, "Zooming out to show everything...");
      
      // Transition cursor away
      agentShowCursor(false);
      statusBar.textContent = "Agent demo complete";
      await engine.animateViewport({ zoom: 0.7 }, { duration: 600 });
      await new Promise(r => setTimeout(r, 1000));
      await engine.fitToContent();
    } finally {
      statusBar.textContent = "Done";
      setTimeout(() => {
        agentRemoveCursor();
        statusBar.remove();
        agentRunningRef.current = false;
      }, 2000);
    }
  }, [engine, agentPointAt, agentShowCursor, agentRemoveCursor, agentCanvasToScreen]);

  const debugBoards = useMemo(() => exemplarDebugBoards, []);

  // ── Add-node callbacks ──────────────────────────────────────

  const addDataCard = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "data-card", x: cx - 110, y: cy - 80, w: 220, h: "auto", z,
      data: {
        title: "Server Status",
        fields: [
          { key: "CPU", value: `${Math.floor(Math.random() * 100)}%` },
          { key: "Memory", value: `${Math.floor(Math.random() * 32)}GB / 32GB` },
          { key: "Uptime", value: `${Math.floor(Math.random() * 365)}d` },
          { key: "Region", value: "us-east-1" },
        ],
        accentColor: "#6366f1", lastUpdated: Date.now(),
      } satisfies DataCardData,
    });
  }, [engine]);

  const addClock = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    const zones = [
      { label: "New York", offset: -5 }, { label: "London", offset: 0 },
      { label: "Tokyo", offset: 9 }, { label: "Sydney", offset: 11 },
    ];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    engine.addNode({
      id: nanoid(10), type: "analog-clock", x: cx - 85, y: cy - 95, w: 170, h: 190, z,
      data: { utcOffset: zone.offset, label: zone.label, accentColor: "#ef4444" } satisfies AnalogClockData,
    });
  }, [engine]);

  const addTimer = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    const mode: TimerData["mode"] = Math.random() > 0.5 ? "countdown" : "stopwatch";
    engine.addNode({
      id: nanoid(10), type: "timer", x: cx - 85, y: cy - 100, w: 170, h: "auto", z,
      data: {
        mode, targetSeconds: mode === "countdown" ? [60, 120, 300][Math.floor(Math.random() * 3)] : 0,
        elapsed: 0, running: false, accentColor: mode === "countdown" ? "#10b981" : "#3b82f6",
      } satisfies TimerData,
    });
  }, [engine]);

  const addCube = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    const palettes: SpinningCubeData["palette"][] = ["neon", "pastel", "sunset", "mono"];
    engine.addNode({
      id: nanoid(10), type: "spinning-cube", x: cx - 90, y: cy - 100, w: 180, h: 200, z,
      data: { speed: 1, palette: palettes[Math.floor(Math.random() * palettes.length)], strokeWidth: 2.5, spinning: true } satisfies SpinningCubeData,
    });
  }, [engine]);

  const addConstant = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "constant", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { value: Math.floor(Math.random() * 100), label: "Constant", accentColor: "#3b82f6" } satisfies ConstantData,
    });
  }, [engine]);

  const addMathOp = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "math-op", x: cx - 65, y: cy - 55, w: 130, h: 110, z,
      data: { op: "add", accentColor: "#f59e0b" } satisfies MathOpData,
    });
  }, [engine]);

  const addTemplate = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "template", x: cx - 90, y: cy - 60, w: 180, h: 120, z,
      data: { template: "{{a}} + {{b}} = result", accentColor: "#10b981" } satisfies TemplateData,
    });
  }, [engine]);

  const addDisplay = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "display", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { label: "Output", format: "number", accentColor: "#8b5cf6" } satisfies DisplayData,
    });
  }, [engine]);

  const addCondition = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "condition", x: cx - 70, y: cy - 60, w: 140, h: 120, z,
      data: { op: "==", accentColor: "#f97316" } satisfies ConditionData,
    });
  }, [engine]);

  const addRandom = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "random", x: cx - 75, y: cy - 100, w: 150, h: 200, z,
      data: { min: 0, max: 100, decimals: 0, value: Math.floor(Math.random() * 100), lastTrigger: 0, accentColor: "#06b6d4" } satisfies RandomData,
    });
  }, [engine]);

  const addButton = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "button", x: cx - 65, y: cy - 50, w: 130, h: 100, z,
      data: { label: "Fire", fireCount: 0, accentColor: "#ec4899" } satisfies ButtonData,
    });
  }, [engine]);

  const addLoop = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "loop", x: cx - 300, y: cy - 200, w: 600, h: 400, z,
      data: { count: 5, delay: 200, currentIndex: 0, running: false, lastTrigger: 0, tick: 0, doneCount: 0, accentColor: "#14b8a6" } satisfies LoopData,
    });
  }, [engine]);

  const addStart = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "start", x: cx - 55, y: cy - 20, w: 110, h: 40, z,
      data: { fireCount: 0, accentColor: "#ef4444" } satisfies StartData,
    });
  }, [engine]);

  const addGate = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "gate", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { accentColor: "#22d3ee" } satisfies GateData,
    });
  }, [engine]);

  const addDelay = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "delay", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { delay: 500, lastTrigger: 0, fireCount: 0, accentColor: "#a78bfa" } satisfies DelayData,
    });
  }, [engine]);

  const addAccumulator = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "accumulator", x: cx - 60, y: cy - 70, w: 120, h: 140, z,
      data: { total: 0, count: 0, lastTrigger: 0, lastReset: 0, accentColor: "#34d399" } satisfies AccumulatorData,
    });
  }, [engine]);

  const addLogicGate = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "logic-gate", x: cx - 55, y: cy - 55, w: 110, h: 110, z,
      data: { mode: "and", accentColor: "#fb923c" } satisfies LogicGateData,
    });
  }, [engine]);

  const addLogger = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "logger", x: cx - 100, y: cy - 70, w: 200, h: 140, z,
      data: { entries: [], maxEntries: 50, lastTrigger: 0, accentColor: "#38bdf8" } satisfies LoggerData,
    });
  }, [engine]);

  const addToggle = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "toggle", x: cx - 65, y: cy - 40, w: 130, h: 80, z,
      data: { state: false, lastTrigger: 0, lastReset: 0, accentColor: "#f472b6" } satisfies ToggleData,
    });
  }, [engine]);

  const addSwitch = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "switch", x: cx - 65, y: cy - 55, w: 130, h: 110, z,
      data: { channels: 3, mode: "index", accentColor: "#c084fc" } satisfies SwitchData,
    });
  }, [engine]);

  const addMapRemap = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "map-remap", x: cx - 75, y: cy - 45, w: 150, h: 90, z,
      data: { inMin: 0, inMax: 255, outMin: 0, outMax: 1, clamp: true, accentColor: "#2dd4bf" } satisfies MapRemapData,
    });
  }, [engine]);

  const addInterval = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "interval", x: cx - 75, y: cy - 45, w: 150, h: 90, z,
      data: { interval: 1000, running: false, tickCount: 0, lastStart: 0, lastStop: 0, accentColor: "#fbbf24" } satisfies IntervalData,
    });
  }, [engine]);

  const addLED = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "led", x: cx - 40, y: cy - 40, w: 80, h: 80, z,
      data: { color: "#10b981", accentColor: "#6b7280" } satisfies LEDData,
    });
  }, [engine]);

  const addClamp = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "clamp", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { min: 0, max: 100, accentColor: "#f472b6" } satisfies ClampData,
    });
  }, [engine]);

  const addRound = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "round", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { mode: "round", decimals: 0, accentColor: "#a3e635" } satisfies RoundData,
    });
  }, [engine]);

  const addProgressBar = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "progress-bar", x: cx - 110, y: cy - 30, w: 220, h: 60, z,
      data: { label: "Progress", color: "#3b82f6", showPercent: true, accentColor: "#6b7280" } satisfies ProgressBarData,
    });
  }, [engine]);

  const addSparkline = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "sparkline", x: cx - 110, y: cy - 50, w: 220, h: 100, z,
      data: { samples: [], maxSamples: 50, lastTrigger: 0, accentColor: "#06b6d4" } satisfies SparklineData,
    });
  }, [engine]);

  const addColor = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
    engine.addNode({
      id: nanoid(10), type: "color", x: cx - 45, y: cy - 50, w: 90, h: 100, z,
      data: { color: colors[Math.floor(Math.random() * colors.length)], accentColor: "#6b7280" } satisfies ColorData,
    });
  }, [engine]);

  const addDebounce = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "debounce", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { delay: 300, lastTrigger: 0, fireCount: 0, pending: false, accentColor: "#e879f9" } satisfies DebounceData,
    });
  }, [engine]);

  const addSequence = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "sequence", x: cx - 65, y: cy - 55, w: 130, h: 110, z,
      data: { delay: 500, lastTrigger: 0, currentStep: -1, aCount: 0, bCount: 0, cCount: 0, accentColor: "#fb7185" } satisfies SequenceData,
    });
  }, [engine]);

  const addOnce = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "once", x: cx - 55, y: cy - 45, w: 110, h: 90, z,
      data: { fired: false, lastTrigger: 0, lastReset: 0, fireCount: 0, accentColor: "#facc15" } satisfies OnceData,
    });
  }, [engine]);

  const addDateTime = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "date-time", x: cx - 75, y: cy - 55, w: 150, h: 110, z,
      data: { currentTime: Date.now(), lastTrigger: 0, autoRefresh: true, accentColor: "#60a5fa" } satisfies DateTimeData,
    });
  }, [engine]);

  const addMerge = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "merge", x: cx - 55, y: cy - 65, w: 110, h: 130, z,
      data: { accentColor: "#4ade80" } satisfies MergeData,
    });
  }, [engine]);

  const addHttpFetch = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "http-fetch", x: cx - 80, y: cy - 55, w: 160, h: 110, z,
      data: { url: "", method: "GET", body: "", lastTrigger: 0, status: null, response: "", error: "", loading: false, accentColor: "#38bdf8" } satisfies HttpFetchData,
    });
  }, [engine]);

  const addJsonParse = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "json-parse", x: cx - 60, y: cy - 45, w: 120, h: 90, z,
      data: { path: "", accentColor: "#a78bfa" } satisfies JsonParseData,
    });
  }, [engine]);

  const addStringOp = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "string-op", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { mode: "concat", separator: ",", searchFor: "", replaceWith: "", sliceStart: 0, sliceEnd: 0, accentColor: "#34d399" } satisfies StringOpData,
    });
  }, [engine]);

  const addExpression = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "expression", x: cx - 75, y: cy - 50, w: 150, h: 100, z,
      data: { expr: "a + b", error: "", accentColor: "#c084fc" } satisfies ExpressionData,
    });
  }, [engine]);

  const addCompare = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "compare", x: cx - 55, y: cy - 45, w: 110, h: 90, z,
      data: { op: "==", accentColor: "#fb923c" } satisfies CompareData,
    });
  }, [engine]);

  const addLerp = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "lerp", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { clamp: true, accentColor: "#22d3ee" } satisfies LerpData,
    });
  }, [engine]);

  const addThrottle = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "throttle", x: cx - 65, y: cy - 45, w: 130, h: 90, z,
      data: { interval: 250, lastTrigger: 0, fireCount: 0, blocked: 0, accentColor: "#f472b6" } satisfies ThrottleData,
    });
  }, [engine]);

  const addConvert = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "convert", x: cx - 55, y: cy - 45, w: 110, h: 90, z,
      data: { target: "number", accentColor: "#818cf8" } satisfies ConvertData,
    });
  }, [engine]);

  const addVariable = useCallback(() => {
    const { cx, cy, z } = viewportCenter(engine);
    engine.addNode({
      id: nanoid(10), type: "variable", x: cx - 60, y: cy - 45, w: 120, h: 90, z,
      data: { label: "x", storedValue: 0, defaultValue: 0, lastSet: 0, lastReset: 0, accentColor: "#fbbf24" } satisfies VariableData,
    });
  }, [engine]);

  // ── Palette groups (reorganized) ────────────────────────────

  type PaletteItem = { name: string; icon: React.ReactNode; color: string; onClick: () => void };

  const paletteGroups = useMemo(
    () => [
      {
        label: "Sources",
        items: [
          { name: "Constant", color: "#3b82f6", icon: <Ic d="M4 6h16M4 18h16M10 12h4" />, onClick: addConstant },
          { name: "Random", color: "#06b6d4", icon: <Ic d="M3 3h18v18H3zM8 8h.01M16 16h.01M12 12h.01" />, onClick: addRandom },
          { name: "Color", color: "#f59e0b", icon: <Ic d="M12 3a9 9 0 100 18 9 9 0 000-18z" />, onClick: addColor },
          { name: "Date/Time", color: "#818cf8", icon: <Ic d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 3" />, onClick: addDateTime },
          { name: "Button", color: "#ec4899", icon: <Ic d="M4 8h16a4 4 0 010 8H4a4 4 0 010-8z" />, onClick: addButton },
          { name: "Start", color: "#ef4444", icon: <Ic d="M6 3l14 9-14 9z" />, onClick: addStart },
          { name: "Interval", color: "#fbbf24", icon: <Ic d="M2 17l4 0 2-10 4 10 2-10 4 10 4 0" />, onClick: addInterval },
          { name: "Variable", color: "#fbbf24", icon: <Ic d="M4 6a4 4 0 014-2h8a4 4 0 014 4v12a4 4 0 01-4 4H4V10h8" />, onClick: addVariable },
        ] as PaletteItem[],
      },
      {
        label: "Math",
        items: [
          { name: "Math", color: "#f59e0b", icon: <Ic d="M12 5v14M5 12h14" sw={2.5} />, onClick: addMathOp },
          { name: "Clamp", color: "#f472b6", icon: <Ic d="M6 4v16M18 4v16M6 12h12" />, onClick: addClamp },
          { name: "Round", color: "#a3e635", icon: <Ic d="M4 20h16M4 20c0-8 4-16 8-16s8 8 8 16" />, onClick: addRound },
          { name: "Map", color: "#2dd4bf", icon: <Ic d="M4 20L20 4M4 20h6M4 14v6M20 4h-6M20 10V4" />, onClick: addMapRemap },
          { name: "Lerp", color: "#22d3ee", icon: <Ic d="M4 18L20 6M4 18h3M20 6h-3" />, onClick: addLerp },
          { name: "Accumulate", color: "#34d399", icon: <Ic d="M12 3c4.4 0 8 1.34 8 3v12c0 1.66-3.6 3-8 3s-8-1.34-8-3V6c0-1.66 3.6-3 8-3z" />, onClick: addAccumulator },
          { name: "Expression", color: "#c084fc", icon: <IcText text="f(x)" />, onClick: addExpression },
        ] as PaletteItem[],
      },
      {
        label: "Logic",
        items: [
          { name: "Condition", color: "#f97316", icon: <Ic d="M12 3l9 9-9 9-9-9z" />, onClick: addCondition },
          { name: "Compare", color: "#fb923c", icon: <Ic d="M8 8l8 8M8 16l8-8" sw={2.5} />, onClick: addCompare },
          { name: "Logic Gate", color: "#fb923c", icon: <Ic d="M4 4h8c5 0 9 4 9 8s-4 8-9 8H4z" />, onClick: addLogicGate },
          { name: "Gate", color: "#22d3ee", icon: <Ic d="M2 12h7M15 12h7M10 5h4v14h-4z" />, onClick: addGate },
          { name: "Switch", color: "#c084fc", icon: <Ic d="M4 12h6M14 6h6M14 12h6M14 18h6M10 12l4-6M10 12h4M10 12l4 6" />, onClick: addSwitch },
          { name: "Merge", color: "#4ade80", icon: <Ic d="M6 4v16M18 12H6M18 6l-6 6 6 6" />, onClick: addMerge },
        ] as PaletteItem[],
      },
      {
        label: "Text & Data",
        items: [
          { name: "String", color: "#34d399", icon: <IcText text={"\u201CAa\u201D"} />, onClick: addStringOp },
          { name: "Template", color: "#10b981", icon: <Ic d="M14 3v4a1 1 0 001 1h4M5 8V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2v-1M2 15h7M5 12l-3 3 3 3" />, onClick: addTemplate },
          { name: "JSON Parse", color: "#a78bfa", icon: <Ic d="M8 3H6a2 2 0 00-2 2v2M8 21H6a2 2 0 01-2-2v-2M16 3h2a2 2 0 012 2v2M16 21h2a2 2 0 002-2v-2M9 14h6" />, onClick: addJsonParse },
          { name: "Convert", color: "#818cf8", icon: <Ic d="M4 12h16M14 6l6 6-6 6" />, onClick: addConvert },
          { name: "Display", color: "#8b5cf6", icon: <Ic d="M2 3h20v14H2zM8 21h8M12 17v4" />, onClick: addDisplay },
        ] as PaletteItem[],
      },
      {
        label: "Timing",
        items: [
          { name: "Delay", color: "#a78bfa", icon: <Ic d="M6 2h12v6l-4 4 4 4v6H6v-6l4-4-4-4z" />, onClick: addDelay },
          { name: "Debounce", color: "#e879f9", icon: <Ic d="M4 12h4M8 12c2-6 4-6 6 0s4 6 6 0" />, onClick: addDebounce },
          { name: "Throttle", color: "#f472b6", icon: <Ic d="M4 12h16M4 6h10M4 18h6" />, onClick: addThrottle },
          { name: "Sequence", color: "#fb7185", icon: <Ic d="M4 18h4v-4h4v-4h4v-4h4v-4" />, onClick: addSequence },
          { name: "Once", color: "#facc15", icon: <IcOnce />, onClick: addOnce },
          { name: "Toggle", color: "#f472b6", icon: <Ic d="M2 8h20v8H2zM16 12a3 3 0 100-0" />, onClick: addToggle },
          { name: "Loop", color: "#14b8a6", icon: <Ic d="M17 2l4 4-4 4M3 11v-1a4 4 0 014-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 01-4 4H3" />, onClick: addLoop },
        ] as PaletteItem[],
      },
      {
        label: "Network",
        items: [
          { name: "HTTP Fetch", color: "#38bdf8", icon: <Ic d="M12 3a9 9 0 100 18 9 9 0 000-18zM12 3c-2.2 0-4 4-4 9s1.8 9 4 9 4-4 4-9-1.8-9-4-9M3 12h18" />, onClick: addHttpFetch },
        ] as PaletteItem[],
      },
      {
        label: "Visual",
        items: [
          { name: "LED", color: "#10b981", icon: <Ic d="M12 6a6 6 0 100 12 6 6 0 000-12z" />, onClick: addLED },
          { name: "Progress", color: "#3b82f6", icon: <Ic d="M2 8h20v8H2zM3 9h12v6H3z" />, onClick: addProgressBar },
          { name: "Sparkline", color: "#06b6d4", icon: <Ic d="M3 18l4-6 4 3 4-7 6-4" />, onClick: addSparkline },
          { name: "Logger", color: "#38bdf8", icon: <Ic d="M3 3h18v18H3zM7 8h4M7 12h6M7 16h3" />, onClick: addLogger },
        ] as PaletteItem[],
      },
      {
        label: "Widgets",
        items: [
          { name: "Clock", color: "#ef4444", icon: <Ic d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2" />, onClick: addClock },
          { name: "Timer", color: "#10b981", icon: <Ic d="M12 5a8 8 0 100 16 8 8 0 000-16zM12 9v4l2 2M5 3l2 2M19 3l-2 2M12 3v2" />, onClick: addTimer },
          { name: "Data Card", color: "#6366f1", icon: <Ic d="M3 3h18v18H3zM7 8h10M7 12h6M7 16h8" />, onClick: addDataCard },
          { name: "3D Cube", color: "#d946ef", icon: <Ic d="M12 2l10 6v8l-10 6L2 16V8zM12 22V10M2 8l10 6 10-6" />, onClick: addCube },
        ] as PaletteItem[],
      },
      {
        label: "Agent",
        items: [
          {
            name: "Run Demo",
            color: "#ef4444",
            icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={10}/><path d="M12 6v6l4 2"/></svg>,
            onClick: agentDemo,
          },
        ] as PaletteItem[],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [engine, agentDemo],
  );

  // ── Palette state ───────────────────────────────────────────

  const [paletteOpen, setPaletteOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null);

  const handleDragStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const el = e.currentTarget.closest("[data-palette-root]") as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragStartRef.current = { startX: e.clientX, startY: e.clientY, originX: rect.left, originY: rect.top };
    const onMove = (ev: PointerEvent) => {
      if (!dragStartRef.current) return;
      setDragPos({
        x: dragStartRef.current.originX + (ev.clientX - dragStartRef.current.startX),
        y: dragStartRef.current.originY + (ev.clientY - dragStartRef.current.startY),
      });
    };
    const onUp = () => {
      dragStartRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, []);

  const paletteStyle: React.CSSProperties = dragPos
    ? { position: "fixed", left: dragPos.x, top: dragPos.y, zIndex: 9999 }
    : { position: "fixed", bottom: 12, left: "50%", transform: "translateX(-50%)", zIndex: 9999 };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SpatialBoard
        engine={engine}
        nodeTypes={nodeTypes}
        debugPanel
        debugBoards={debugBoards}
        gifApiBaseUrl="/mock-gifs"
        localization={boardLocalization}
        dataFlowEdgeOverlay="ports+compute"
      />

      {/* ── Horizontal draggable palette ── */}
      <div data-palette-root style={{ ...paletteStyle, pointerEvents: "none", fontFamily: "'Inter', system-ui, sans-serif", maxWidth: "90vw" }}>
        {paletteOpen ? (
          <div style={{
            background: "#111119", border: "1px solid #2a2a40", borderRadius: 14,
            overflow: "hidden", pointerEvents: "auto", display: "flex", flexDirection: "column",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}>
            {/* Top bar: drag handle + tabs + close */}
            <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid #1e1e30", background: "#0d0d17" }}>
              {/* Drag handle */}
              <div onPointerDown={handleDragStart} style={{ padding: "8px 6px 8px 10px", cursor: "grab", color: "#444", flexShrink: 0, display: "flex", alignItems: "center" }} title="Drag to move">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
                  <circle cx={6} cy={6} r={2} /><circle cx={14} cy={6} r={2} />
                  <circle cx={6} cy={12} r={2} /><circle cx={14} cy={12} r={2} />
                  <circle cx={6} cy={18} r={2} /><circle cx={14} cy={18} r={2} />
                </svg>
              </div>
              {/* Category tabs */}
              <div style={{ display: "flex", flex: 1, overflowX: "auto", scrollbarWidth: "none" }}>
                {paletteGroups.map((g, i) => (
                  <button key={g.label} onClick={() => setActiveTab(i)} style={{
                    padding: "7px 10px", background: "transparent", border: "none",
                    borderBottom: i === activeTab ? "2px solid #6366f1" : "2px solid transparent",
                    color: i === activeTab ? "#ccc" : "#555", fontSize: 10, fontWeight: 600,
                    letterSpacing: 0.3, cursor: "pointer", whiteSpace: "nowrap",
                    fontFamily: "'Inter', system-ui, sans-serif", transition: "color 0.15s",
                  }}>
                    {g.label}
                  </button>
                ))}
              </div>
              {/* Close */}
              <button onClick={() => setPaletteOpen(false)} style={{
                width: 28, height: 28, background: "transparent", border: "none", color: "#555",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, margin: "0 4px",
              }} title="Close palette">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                  <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Node cards (horizontal scroll) */}
            <div style={{ display: "flex", gap: 4, padding: "8px 10px", overflowX: "auto", scrollbarWidth: "none" }}>
              {paletteGroups[activeTab]?.items.map((item) => (
                <button key={item.name} onClick={item.onClick} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  padding: "6px 8px", background: "#16161f", border: "1px solid #222233",
                  borderRadius: 8, color: "#888", cursor: "pointer", minWidth: 60, flexShrink: 0,
                  transition: "all 0.12s", fontFamily: "'Inter', system-ui, sans-serif",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${item.color}15`; e.currentTarget.style.borderColor = `${item.color}40`; e.currentTarget.style.color = item.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#16161f"; e.currentTarget.style.borderColor = "#222233"; e.currentTarget.style.color = "#888"; }}
                >
                  <span style={{ width: 28, height: 28, borderRadius: 6, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: 9, fontWeight: 500, whiteSpace: "nowrap" }}>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button onClick={() => setPaletteOpen(true)} style={{
            background: "#111119", border: "1px solid #2a2a40", borderRadius: 10, color: "#666",
            cursor: "pointer", padding: "6px 16px", fontSize: 10, fontWeight: 600, letterSpacing: 1,
            textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: 6,
            pointerEvents: "auto", fontFamily: "'Inter', system-ui, sans-serif",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }} title="Open node palette">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M12 5v14" /><path d="M5 12h14" />
            </svg>
            Nodes
          </button>
        )}
      </div>
    </div>
  );
}

// ── Tiny icon helpers ─────────────────────────────────────────

function Ic({ d, sw }: { d: string; sw?: number }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw ?? 2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function IcText({ text }: { text: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <text x={3} y={17} fontSize={14} fontFamily="Georgia, serif" fontStyle="italic" fill="currentColor">{text}</text>
    </svg>
  );
}

function IcOnce() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx={12} cy={12} r={9} />
      <text x={12} y={16} textAnchor="middle" fontSize={12} fill="currentColor" stroke="none" fontWeight="bold">1</text>
    </svg>
  );
}
