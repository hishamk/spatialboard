import type { SpatialEngine } from "spatialboard";
import type { ButtonData } from "../nodes/button";
import type { SequenceData } from "../nodes/sequence";
import type { HttpFetchData } from "../nodes/http-fetch";
import type { JsonParseData } from "../nodes/json-parse";
import type { DisplayData } from "../nodes/display";
import type { MergeData } from "../nodes/merge";
import type { ConstantData } from "../nodes/constant";
import type { CompareData } from "../nodes/compare";
import type { LEDData } from "../nodes/led";
import type { LoggerData } from "../nodes/logger";
import type { DelayData } from "../nodes/delay";
import type { ConvertData } from "../nodes/convert";

/**
 * SpatialBoard exemplar — `llm-guidance/spatialboard-exemplars/README.md` + `spatialboard-board-layout.md`.
 * "Packet Observatory" — wide layout: isolated left spine, three horizontal lanes with 180px row pitch,
 * merge + merged JSON + convert in a column **below** the lanes (no bbox overlap), logger in its own column.
 */
export function loadApiConstellationBoard(engine: SpatialEngine): void {
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
        edgeType: "smoothstep",
        sourcePort: sp,
        targetPort: tp,
      },
    });
  };

  const accent = "#22d3ee";
  const magenta = "#e879f9";
  const lime = "#a3e635";

  // 20px grid — lane rows end at y=620+100=720 before merge stack
  const rowTop = [260, 440, 620] as const;
  const fetchH = 100;
  const parseH = 80;
  const dispH = 96;

  const frame = { x: 40, y: 40, w: 1920, h: 1200 };
  const spineX = 80;
  const spineW = 140;
  const fetchX = 320;
  const fetchW = 160;
  const parseX = 580;
  const parseW = 120;
  const dispX = 820;
  const dispW = 260;
  /** Merge column: starts under all three lanes */
  const mergeX = 820;
  const mergeW = 140;
  const mergeTop = 760;
  const mergeH = 120;
  const headlineY = mergeTop + mergeH + 40;
  const headlineH = 100;
  const convertY = headlineY + headlineH + 40;
  const convertH = 72;
  const logX = 1320;
  const logW = 300;
  const statusY = 1156;

  engine.addNode({
    id: "ac-frame",
    type: "frame",
    x: frame.x,
    y: frame.y,
    w: frame.w,
    h: frame.h,
    z: z++,
    data: { label: "PACKET OBSERVATORY — open web relay", color: "#0f172a" },
  });

  engine.addNode({
    id: "ac-title",
    type: "text",
    x: 80,
    y: 64,
    w: 700,
    h: "auto",
    z: z++,
    data: {
      text: "PACKET OBSERVATORY",
      fontSize: 36,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#f0fdfa",
      align: "left",
    },
  });

  engine.addNode({
    id: "ac-sub",
    type: "text",
    x: 80,
    y: 116,
    w: 720,
    h: "auto",
    z: z++,
    data: {
      text: "Three GET lanes \u00B7 parse \u00B7 merge below \u2014 Run relay",
      fontSize: 14,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: accent,
      align: "left",
    },
  });

  engine.addNode({
    id: "ac-sticky",
    type: "sticky",
    x: 860,
    y: 56,
    w: 400,
    h: 132,
    z: z++,
    rotation: 0,
    data: {
      text:
        "JSONPlaceholder + DummyJSON.\n" +
        "Run relay \u2192 staggered GETs \u2192 merge \u2192 log.\n" +
        "LED = last hop HTTP 200.",
      color: "#FCE7F3",
      fontSize: 12,
      edgeStyle: "round",
    },
  });

  const btnH = 72;
  const btnY = 300;
  const seqY = btnY + btnH + 52;
  const seqH = 120;
  const dlyY = seqY + seqH + 52;
  const dlyH = 80;

  engine.addNode({
    id: "ac-btn",
    type: "button",
    x: spineX,
    y: btnY,
    w: spineW,
    h: btnH,
    z: z++,
    data: { label: "Run relay", fireCount: 0, accentColor: magenta } satisfies ButtonData,
  });

  engine.addNode({
    id: "ac-seq",
    type: "sequence",
    x: spineX,
    y: seqY,
    w: spineW,
    h: seqH,
    z: z++,
    data: {
      delay: 500,
      lastTrigger: 0,
      currentStep: -1,
      aCount: 0,
      bCount: 0,
      cCount: 0,
      accentColor: accent,
    } satisfies SequenceData,
  });

  engine.addNode({
    id: "ac-log-delay",
    type: "delay",
    x: spineX,
    y: dlyY,
    w: 120,
    h: dlyH,
    z: z++,
    data: {
      delay: 1800,
      lastTrigger: 0,
      fireCount: 0,
      accentColor: "#64748b",
    } satisfies DelayData,
  });

  const parseY = (i: number) => rowTop[i] + Math.round((fetchH - parseH) / 2);
  const dispY = (i: number) => rowTop[i] + Math.round((fetchH - dispH) / 2);

  engine.addNode({
    id: "ac-http-post",
    type: "http-fetch",
    x: fetchX,
    y: rowTop[0],
    w: fetchW,
    h: fetchH,
    z: z++,
    data: {
      url: "https://jsonplaceholder.typicode.com/posts/1",
      method: "GET",
      body: "",
      lastTrigger: 0,
      status: null,
      response: "",
      error: "",
      loading: false,
      accentColor: "#38bdf8",
    } satisfies HttpFetchData,
  });

  engine.addNode({
    id: "ac-http-user",
    type: "http-fetch",
    x: fetchX,
    y: rowTop[1],
    w: fetchW,
    h: fetchH,
    z: z++,
    data: {
      url: "https://jsonplaceholder.typicode.com/users/7",
      method: "GET",
      body: "",
      lastTrigger: 0,
      status: null,
      response: "",
      error: "",
      loading: false,
      accentColor: "#818cf8",
    } satisfies HttpFetchData,
  });

  engine.addNode({
    id: "ac-http-quote",
    type: "http-fetch",
    x: fetchX,
    y: rowTop[2],
    w: fetchW,
    h: fetchH,
    z: z++,
    data: {
      url: "https://dummyjson.com/quotes/1",
      method: "GET",
      body: "",
      lastTrigger: 0,
      status: null,
      response: "",
      error: "",
      loading: false,
      accentColor: "#c084fc",
    } satisfies HttpFetchData,
  });

  const jpSpecs = [
    { id: "ac-jp-post" as const, path: "title" as const, color: "#38bdf8" },
    { id: "ac-jp-user" as const, path: "name" as const, color: "#818cf8" },
    { id: "ac-jp-quote" as const, path: "quote" as const, color: "#c084fc" },
  ];
  for (let i = 0; i < 3; i++) {
    const s = jpSpecs[i];
    engine.addNode({
      id: s.id,
      type: "json-parse",
      x: parseX,
      y: parseY(i),
      w: parseW,
      h: parseH,
      z: z++,
      data: { path: s.path, accentColor: s.color } satisfies JsonParseData,
    });
  }

  engine.addNode({
    id: "ac-d-post",
    type: "display",
    x: dispX,
    y: dispY(0),
    w: dispW,
    h: dispH,
    z: z++,
    data: { label: "Post title", format: "raw", accentColor: "#94a3b8" } satisfies DisplayData,
  });

  engine.addNode({
    id: "ac-d-user",
    type: "display",
    x: dispX,
    y: dispY(1),
    w: dispW,
    h: dispH,
    z: z++,
    data: { label: "User name", format: "raw", accentColor: "#94a3b8" } satisfies DisplayData,
  });

  engine.addNode({
    id: "ac-d-quote",
    type: "display",
    x: dispX,
    y: dispY(2),
    w: dispW,
    h: dispH,
    z: z++,
    data: { label: "Quote", format: "raw", accentColor: "#94a3b8" } satisfies DisplayData,
  });

  engine.addNode({
    id: "ac-merge",
    type: "merge",
    x: mergeX,
    y: mergeTop,
    w: mergeW,
    h: mergeH,
    z: z++,
    data: { accentColor: lime } satisfies MergeData,
  });

  engine.addNode({
    id: "ac-d-headline",
    type: "display",
    x: mergeX,
    y: headlineY,
    w: 420,
    h: headlineH,
    z: z++,
    data: { label: "Merged object (JSON)", format: "json", accentColor: lime } satisfies DisplayData,
  });

  engine.addNode({
    id: "ac-log-str",
    type: "convert",
    x: mergeX,
    y: convertY,
    w: 120,
    h: convertH,
    z: z++,
    data: { target: "string", accentColor: "#64748b" } satisfies ConvertData,
  });

  const logTop = rowTop[0];
  const logH = rowTop[2] + fetchH - logTop;

  engine.addNode({
    id: "ac-lbl-log",
    type: "text",
    x: logX,
    y: logTop - 4,
    w: logW,
    h: "auto",
    z: z++,
    data: {
      text: "Log (string via Convert)",
      fontSize: 11,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#64748b",
      align: "left",
    },
  });

  engine.addNode({
    id: "ac-log",
    type: "logger",
    x: logX,
    y: logTop + 24,
    w: logW,
    h: logH - 24,
    z: z++,
    data: {
      entries: [],
      maxEntries: 12,
      lastTrigger: 0,
      accentColor: "#334155",
    } satisfies LoggerData,
  });

  engine.addNode({
    id: "ac-c-200",
    type: "constant",
    x: spineX,
    y: statusY,
    w: 100,
    h: 56,
    z: z++,
    data: { value: 200, label: "OK", accentColor: "#64748b" } satisfies ConstantData,
  });

  engine.addNode({
    id: "ac-cmp",
    type: "compare",
    x: spineX + 160,
    y: statusY + 2,
    w: 120,
    h: 52,
    z: z++,
    data: { op: "==", accentColor: "#f472b6" } satisfies CompareData,
  });

  engine.addNode({
    id: "ac-led",
    type: "led",
    x: spineX + 160 + 120 + 56,
    y: statusY + 4,
    w: 64,
    h: 48,
    z: z++,
    data: { color: "#22c55e", accentColor: "#22c55e" } satisfies LEDData,
  });

  engine.addNode({
    id: "ac-lbl-led",
    type: "text",
    x: spineX,
    y: statusY + 64,
    w: 360,
    h: "auto",
    z: z++,
    data: {
      text: "LED: last hop HTTP status equals 200",
      fontSize: 11,
      fontFamily: "ui-sans-serif, system-ui, sans-serif",
      color: "#64748b",
      align: "left",
    },
  });

  wire("ac-w-btn-seq", "ac-btn", "ac-seq", "trigger", "trigger", magenta);
  wire("ac-w-sa-h1", "ac-seq", "ac-http-post", "a", "trigger", "#38bdf8");
  wire("ac-w-sb-h2", "ac-seq", "ac-http-user", "b", "trigger", "#818cf8");
  wire("ac-w-sc-h3", "ac-seq", "ac-http-quote", "c", "trigger", "#c084fc");

  wire("ac-w-h1-j1", "ac-http-post", "ac-jp-post", "response", "input", "#38bdf8");
  wire("ac-w-h2-j2", "ac-http-user", "ac-jp-user", "response", "input", "#818cf8");
  wire("ac-w-h3-j3", "ac-http-quote", "ac-jp-quote", "response", "input", "#c084fc");

  wire("ac-w-j1-d1", "ac-jp-post", "ac-d-post", "output", "value", "#38bdf8");
  wire("ac-w-j2-d2", "ac-jp-user", "ac-d-user", "output", "value", "#818cf8");
  wire("ac-w-j3-d3", "ac-jp-quote", "ac-d-quote", "output", "value", "#c084fc");

  wire("ac-w-m-a", "ac-jp-post", "ac-merge", "output", "a", lime);
  wire("ac-w-m-b", "ac-jp-user", "ac-merge", "output", "b", lime);
  wire("ac-w-m-c", "ac-jp-quote", "ac-merge", "output", "c", lime);
  wire("ac-w-m-d", "ac-merge", "ac-d-headline", "out", "value", lime);

  wire("ac-w-h3-st", "ac-http-quote", "ac-cmp", "status", "a", "#c084fc");
  wire("ac-w-200-b", "ac-c-200", "ac-cmp", "value", "b", "#64748b");
  wire("ac-w-cmp-led", "ac-cmp", "ac-led", "result", "value", "#22c55e");

  wire("ac-w-sc-dly", "ac-seq", "ac-log-delay", "c", "trigger", "#c084fc");
  wire("ac-w-dly-log", "ac-log-delay", "ac-log", "out", "trigger", "#64748b");
  wire("ac-w-merge-cv", "ac-merge", "ac-log-str", "out", "input", lime);
  wire("ac-w-cv-log", "ac-log-str", "ac-log", "output", "value", "#64748b");

  engine.fitToContent();
}
