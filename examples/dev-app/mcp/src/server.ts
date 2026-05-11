#!/usr/bin/env node
/**
 * stdio MCP server: drives the spatialboard dev-app in Chromium via Playwright.
 * The dev-app exposes `window.__engine` (SpatialEngine) after mount — see App.tsx.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { chromium, type Browser, type Page } from "playwright";
import { z } from "zod";

const DEFAULT_URL = "http://localhost:5173";

let browser: Browser | null = null;
let page: Page | null = null;

function targetUrl(override?: string): string {
  return override ?? process.env.SPATIALBOARD_DEV_URL ?? DEFAULT_URL;
}

interface EngineHandle {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

async function ensurePage(): Promise<Page> {
  if (!browser) {
    browser = await chromium.launch({ headless: true });
  }
  if (!page) {
    page = await browser.newPage();
    await page.goto(targetUrl(), {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    });
  }
  return page;
}

/** Call an engine method with structured-clone arguments and return the result. */
async function engineCall<T>(method: string, ...args: unknown[]): Promise<T> {
  const p = await ensurePage();
  return p.evaluate(({ method, args }) => {
    const engine = (window as unknown as EngineHandle).__engine;
    if (!engine) throw new Error("window.__engine is not set — is the dev server running?");
    const fn = engine[method] as (...a: unknown[]) => unknown;
    if (typeof fn !== "function") throw new Error(`engine.${method} is not a function — rebuild spatialboard`);
    const result = fn.apply(engine, args);
    return result instanceof Promise ? result : Promise.resolve(result);
  }, { method, args });
}

function ok(text: string) {
  return { content: [{ type: "text" as const, text }] };
}

function jsonOk(data: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
}

async function closeBrowser(): Promise<void> {
  await page?.close().catch(() => {});
  page = null;
  await browser?.close().catch(() => {});
  browser = null;
}

const mcp = new McpServer(
  { name: "spatialboard-dev-app-mcp", version: "0.2.0" },
  {
    instructions: [
      "Automates the spatialboard examples/dev-app in a headless browser.",
      "1) Run the Vite dev server: cd spatialboard/examples/dev-app && npm run dev",
      "2) Once: cd spatialboard/examples/dev-app/mcp && npx playwright install chromium",
      "3) Optional: SPATIALBOARD_DEV_URL (default http://localhost:5173)",
      "Use typed tools (spatialboard_create_shape, spatialboard_create_text, etc.) for structured creation.",
      "Use spatialboard_eval only for ad-hoc automation — prefer typed tools for common operations.",
      "After loading or building nodes, call spatialboard_fit_to_content to sync the viewport before screenshots.",
    ].join("\n"),
  },
);

mcp.registerTool(
  "spatialboard_navigate",
  {
    description:
      "Load a URL in the MCP browser tab (reuses one tab). Use to refresh or open a different dev URL.",
    inputSchema: {
      url: z
        .string()
        .optional()
        .describe("Full URL; defaults to SPATIALBOARD_DEV_URL or http://localhost:5173"),
      waitUntil: z
        .enum(["load", "domcontentloaded", "networkidle"])
        .optional()
        .describe("Playwright waitUntil option"),
    },
  },
  async ({ url, waitUntil }) => {
    const p = await ensurePage();
    const u = targetUrl(url);
    await p.goto(u, {
      waitUntil: waitUntil ?? "domcontentloaded",
      timeout: 90_000,
    });
    return {
      content: [{ type: "text", text: `OK: navigated to ${u}` }],
    };
  },
);

mcp.registerTool(
  "spatialboard_list_node_types",
  {
    description:
      "Return every registered SpatialBoard node type for this dev-app: `type` string, data-flow ports, flags, and optional doc title/body (custom nodes). **Call this first** before spatialboard_eval when creating or editing nodes — layout-only guidance does not enumerate custom data-flow types.",
    inputSchema: {},
  },
  async () => {
    const p = await ensurePage();
    const payload = await p.evaluate(() => {
      const w = window as unknown as {
        __engine?: { getNodeTypeCatalog?: () => Array<Record<string, unknown>> };
        __nodeTypeDocs?: Record<string, { title?: string; body?: string }>;
      };
      const engine = w.__engine;
      if (engine == null) {
        return {
          error:
            "window.__engine is not set — wait for React mount (see dev-app App.tsx).",
        };
      }
      if (typeof engine.getNodeTypeCatalog !== "function") {
        return {
          error:
            "engine.getNodeTypeCatalog is missing — upgrade the spatialboard package / rebuild.",
        };
      }
      const catalog = engine.getNodeTypeCatalog();
      const docs = w.__nodeTypeDocs ?? {};
      const types = catalog.map((e) => {
        const key =
          (e.docsLocalizationKey as string) ?? (e.type as string);
        const d = docs[key] ?? docs[e.type as string];
        return {
          ...e,
          docTitle: d?.title,
          docBody: d?.body,
        };
      });
      return {
        types,
        count: types.length,
        hint: "Use `type` in engine.addNode({ type, ... }). Wire data-flow with edges where edge.data.sourcePort / targetPort match port `id`s.",
      };
    });
    const text = JSON.stringify(payload, null, 2);
    return { content: [{ type: "text", text }] };
  },
);

mcp.registerTool(
  "spatialboard_status",
  {
    description: "Report current page URL and whether window.__engine is available.",
    inputSchema: {},
  },
  async () => {
    const p = await ensurePage();
    const url = p.url();
    const hasEngine = await p.evaluate(
      () => !!(window as unknown as { __engine?: unknown }).__engine,
    );
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ url, hasEngine }, null, 2),
        },
      ],
    };
  },
);

mcp.registerTool(
  "spatialboard_eval",
  {
    description:
      "Run async JavaScript in the page with SpatialEngine in scope as `engine`. Only for trusted dev automation.",
    inputSchema: {
      script: z
        .string()
        .describe(
          "Body of an async arrow function: you may use `await`. Has access to `engine` (SpatialEngine). Example: return { n: engine.nodes.size };",
        ),
    },
  },
  async ({ script }) => {
    const p = await ensurePage();
    const result: unknown = await p.evaluate(
      async (src: string) => {
        const engine = (window as unknown as { __engine?: unknown }).__engine;
        if (engine == null) {
          throw new Error(
            "window.__engine is not set — wait for React mount or check dev-app App.tsx",
          );
        }
        const fn = new Function(
          "engine",
          `"use strict"; return (async () => { ${src} })();`,
        );
        return await fn(engine);
      },
      script,
    );
    const text =
      typeof result === "string"
        ? result
        : JSON.stringify(result, (_k, v) => (typeof v === "bigint" ? v.toString() : v), 2);
    return { content: [{ type: "text", text }] };
  },
);

mcp.registerTool(
  "spatialboard_screenshot",
  {
    description: "Capture a PNG of the viewport or full scrollable page.",
    inputSchema: {
      fullPage: z
        .boolean()
        .optional()
        .describe("If true, capture the full scrollable page"),
    },
  },
  async ({ fullPage }) => {
    const p = await ensurePage();
    const png = await p.screenshot({
      type: "png",
      fullPage: fullPage ?? false,
    });
    const b64 = png.toString("base64");
    return {
      content: [
        { type: "text", text: "PNG screenshot (base64 below)." },
        {
          type: "image",
          data: b64,
          mimeType: "image/png",
        },
      ],
    };
  },
);

mcp.registerTool(
  "spatialboard_close_browser",
  {
    description: "Close the Playwright browser (next tool call will launch again).",
    inputSchema: {},
  },
  async () => {
    await closeBrowser();
    return { content: [{ type: "text", text: "Browser closed." }] };
  },
);

// ── Agent API typed tools ─────────────────────────────────────

const stateOptionsSchema = {
  limit: z.number().optional().describe("Max nodes returned (default 200, 0 = no cap)."),
  nodeIds: z.array(z.string()).optional().describe("Restrict to these node ids."),
  types: z.array(z.string()).optional().describe("Restrict to these node types (shape, text, sticky, …)."),
  regionX: z.number().optional().describe("Region filter: top-left X (canvas coords)."),
  regionY: z.number().optional().describe("Region filter: top-left Y."),
  regionW: z.number().optional().describe("Region filter: width."),
  regionH: z.number().optional().describe("Region filter: height."),
};

function buildStateOptions(p: {
  limit?: number;
  nodeIds?: string[];
  types?: string[];
  regionX?: number;
  regionY?: number;
  regionW?: number;
  regionH?: number;
}): Record<string, unknown> {
  const opts: Record<string, unknown> = {};
  if (p.limit !== undefined) opts.limit = p.limit;
  if (p.nodeIds) opts.nodeIds = p.nodeIds;
  if (p.types) opts.types = p.types;
  if (
    p.regionX !== undefined && p.regionY !== undefined &&
    p.regionW !== undefined && p.regionH !== undefined
  ) {
    opts.region = { x: p.regionX, y: p.regionY, w: p.regionW, h: p.regionH };
  }
  return opts;
}

mcp.registerTool(
  "spatialboard_get_state",
  {
    description:
      "Return a structured snapshot of the canvas (nodes, viewport, selection, mode)." +
      " Defaults to first 200 nodes — pass `limit`/`types`/`nodeIds`/region to narrow." +
      " Response includes `nodeCount`, `returnedCount`, and `truncated` so callers can paginate." +
      " Use spatialboard_get_state_markdown for a human-readable LLM-friendly summary.",
    inputSchema: stateOptionsSchema,
  },
  async (params) => {
    const state = await engineCall("getAgentState", buildStateOptions(params));
    return jsonOk(state);
  },
);

mcp.registerTool(
  "spatialboard_get_state_markdown",
  {
    description:
      "Return a human-readable markdown summary of the current canvas, optimized for LLM consumption." +
      " Includes per-type node counts, positions, labels, and viewport info." +
      " Honors the same `limit`/`types`/`nodeIds`/region filters as spatialboard_get_state.",
    inputSchema: stateOptionsSchema,
  },
  async (params) => {
    const md = await engineCall<string>("getAgentStateMarkdown", buildStateOptions(params));
    return ok(md);
  },
);

mcp.registerTool(
  "spatialboard_begin_action",
  {
    description:
      "Begin a grouped agent action. All subsequent create/update/delete calls share one undo step." +
      " Call spatialboard_end_action to close the group. Idempotent — nested calls are safe.",
    inputSchema: {},
  },
  async () => {
    await engineCall("beginAgentAction");
    return ok("Agent action group started.");
  },
);

mcp.registerTool(
  "spatialboard_end_action",
  {
    description: "End a grouped agent action started with spatialboard_begin_action.",
    inputSchema: {},
  },
  async () => {
    await engineCall("endAgentAction");
    return ok("Agent action group ended.");
  },
);

mcp.registerTool(
  "spatialboard_activate_tool",
  {
    description: "Set mode and active tool in a single call.",
    inputSchema: {
      mode: z
        .string()
        .describe("Tool mode: select, draw, shape, text, note, sticky, edge, erase, frame, hand, laser"),
      color: z.string().optional().describe("Stroke/primary color (hex)"),
      width: z.number().optional().describe("Stroke width in canvas units"),
      shapeType: z.string().optional().describe("Shape subtype: rect, ellipse, diamond, line, arrow"),
      fillColor: z.string().optional().describe("Fill color (hex)"),
      strokeStyle: z.string().optional().describe("Solid, dashed, or dotted"),
      roughness: z.number().optional().describe("Roughness (0=architect, 1=artist, 2=cartoonist)"),
      opacity: z.number().optional().describe("Opacity 0–1"),
      fontSize: z.number().optional().describe("Font size for text tools"),
      edgeType: z.string().optional().describe("Edge type: straight, bezier, smoothstep, step"),
      arrowHead: z.string().optional().describe("Arrow head style: none, arrow, filled, dot"),
      arrowTail: z.string().optional().describe("Arrow tail style: none, arrow, filled, dot"),
    },
  },
  async (params) => {
    const config: Record<string, unknown> = { mode: params.mode };
    if (params.color !== undefined) config.color = params.color;
    if (params.width !== undefined) config.width = params.width;
    if (params.shapeType !== undefined) config.shapeType = params.shapeType;
    if (params.fillColor !== undefined) config.fillColor = params.fillColor;
    if (params.strokeStyle !== undefined) config.strokeStyle = params.strokeStyle;
    if (params.roughness !== undefined) config.roughness = params.roughness;
    if (params.opacity !== undefined) config.opacity = params.opacity;
    if (params.fontSize !== undefined) config.fontSize = params.fontSize;
    if (params.edgeType !== undefined) config.edgeType = params.edgeType;
    if (params.arrowHead !== undefined) config.arrowHead = params.arrowHead;
    if (params.arrowTail !== undefined) config.arrowTail = params.arrowTail;
    await engineCall("activateTool", config);
    return ok(`Tool activated: ${params.mode}`);
  },
);

mcp.registerTool(
  "spatialboard_create_shape",
  {
    description: "Create a shape node (rect, ellipse, diamond, line, arrow). Returns the node id.",
    inputSchema: {
      shape: z.enum(["rect", "ellipse", "diamond", "line", "arrow"]).describe("Shape type"),
      x: z.number(),
      y: z.number(),
      w: z.number(),
      h: z.number(),
      stroke: z.string().optional().describe("Stroke color (hex)"),
      strokeWidth: z.number().optional().describe("Stroke width"),
      fill: z.string().optional().describe("Fill color (hex)"),
      fillStyle: z.string().optional().describe("Fill style: hachure, cross-hatch, solid"),
      roughness: z.number().optional().describe("Roughness 0–2"),
      opacity: z.number().optional().describe("Opacity 0–1"),
      label: z.string().optional().describe("Text label"),
      strokeStyle: z.string().optional().describe("solid, dashed, dotted"),
    },
  },
  async (params) => {
    const { shape, x, y, w, h, ...options } = params;
    const id = await engineCall<string>("createShape", shape, x, y, w, h, options);
    return ok(`Created ${shape} at (${x}, ${y}) ${w}×${h}, id=${id}`);
  },
);

mcp.registerTool(
  "spatialboard_create_text",
  {
    description: "Create a text node. Returns the node id.",
    inputSchema: {
      text: z.string(),
      x: z.number(),
      y: z.number(),
      w: z.number().optional().describe("Width (default 200)"),
      fontSize: z.number().optional(),
      color: z.string().optional().describe("Text color (hex)"),
      align: z.string().optional().describe("left, center, right"),
    },
  },
  async (params) => {
    const { text, x, y, ...options } = params;
    const id = await engineCall<string>("createText", text, x, y, options);
    return ok(`Created text node "${text.slice(0, 40)}" at (${x}, ${y}), id=${id}`);
  },
);

mcp.registerTool(
  "spatialboard_create_sticky",
  {
    description: "Create a sticky note. Returns the node id.",
    inputSchema: {
      text: z.string(),
      x: z.number(),
      y: z.number(),
      w: z.number().optional().describe("Width (default 200)"),
      h: z.number().optional().describe("Height (default 150)"),
      color: z.string().optional().describe("Background color (hex, default #FEF3C7)"),
    },
  },
  async (params) => {
    const { text, x, y, ...options } = params;
    const id = await engineCall<string>("createSticky", text, x, y, options);
    return ok(`Created sticky note "${text.slice(0, 40)}" at (${x}, ${y}), id=${id}`);
  },
);

mcp.registerTool(
  "spatialboard_create_frame",
  {
    description: "Create a frame node. Returns the node id.",
    inputSchema: {
      x: z.number(),
      y: z.number(),
      w: z.number(),
      h: z.number(),
      label: z.string().optional(),
      backgroundColor: z.string().optional().describe("Background color (hex)"),
      borderColor: z.string().optional().describe("Border color (hex)"),
      slideOrder: z.number().optional().describe("Slide order for presentation mode"),
    },
  },
  async (params) => {
    const { x, y, w, h, ...options } = params;
    const id = await engineCall<string>("createFrame", x, y, w, h, options);
    return ok(`Created frame at (${x}, ${y}) ${w}×${h}, id=${id}`);
  },
);

mcp.registerTool(
  "spatialboard_create_image",
  {
    description: "Create an image node from a URL. Returns the node id.",
    inputSchema: {
      src: z.string().describe("Image URL or data URL"),
      x: z.number(),
      y: z.number(),
      w: z.number().optional().describe("Width (default 200)"),
      h: z.number().optional().describe("Height (default 150)"),
      alt: z.string().optional().describe("Alt text"),
    },
  },
  async (params) => {
    const { src, x, y, ...options } = params;
    const id = await engineCall<string>("createImage", src, x, y, options);
    return ok(`Created image at (${x}, ${y}), id=${id}`);
  },
);

mcp.registerTool(
  "spatialboard_create_draw_stroke",
  {
    description:
      "Create a freehand draw stroke from an array of [x, y, pressure] points." +
      " Points are in canvas coordinates; the bounding box is computed automatically.",
    inputSchema: {
      points: z.array(z.array(z.number())).describe("Array of [x, y, pressure?] tuples"),
      color: z.string().optional().describe("Stroke color (hex)"),
      width: z.number().optional().describe("Stroke width"),
      tool: z.string().optional().describe("pen, pencil, highlighter, vector"),
    },
  },
  async (params) => {
    const { points, ...options } = params;
    // Normalize tuples: [x, y] or [x, y, p] → [number, number, number?]
    const typedPoints = points.map(
      (p: number[]) => [p[0], p[1], p.length > 2 ? p[2] : undefined] as [number, number, number | undefined],
    );
    const id = await engineCall<string>("createDrawStroke", typedPoints, options);
    return ok(`Created draw stroke with ${points.length} points, id=${id}`);
  },
);

mcp.registerTool(
  "spatialboard_create_edge",
  {
    description: "Create an edge connecting two nodes. Returns the node id.",
    inputSchema: {
      fromId: z.string(),
      toId: z.string(),
      label: z.string().optional(),
      color: z.string().optional().describe("Edge color (hex)"),
      strokeWidth: z.number().optional(),
      edgeType: z.string().optional().describe("straight, bezier, smoothstep, step"),
      arrowHead: z.string().optional().describe("none, arrow, filled, dot"),
      arrowTail: z.string().optional().describe("none, arrow, filled, dot"),
      sourceHandle: z.string().optional().describe("top, right, bottom, left"),
      targetHandle: z.string().optional().describe("top, right, bottom, left"),
    },
  },
  async (params) => {
    const { fromId, toId, ...options } = params;
    const id = await engineCall<string>("createEdge", fromId, toId, options);
    return ok(`Created edge ${fromId.slice(0, 8)} → ${toId.slice(0, 8)}, id=${id}`);
  },
);

mcp.registerTool(
  "spatialboard_fit_to_content",
  {
    description: "Pan and zoom to fit all nodes on the canvas. Useful before taking a screenshot.",
    inputSchema: {},
  },
  async () => {
    await engineCall("fitToContent");
    return ok("Viewport fitted to content.");
  },
);

mcp.registerTool(
  "spatialboard_zoom_to_node",
  {
    description: "Pan and zoom to center on a specific node by id.",
    inputSchema: {
      nodeId: z.string(),
    },
  },
  async ({ nodeId }) => {
    await engineCall("zoomToNode", nodeId);
    return ok(`Zoomed to node ${nodeId.slice(0, 8)}`);
  },
);

mcp.registerTool(
  "spatialboard_animate_viewport",
  {
    description:
      "Smoothly animate the viewport to a target position/zoom." +
      " Returns after the animation completes. Omit x/y/zoom to keep current value.",
    inputSchema: {
      x: z.number().optional(),
      y: z.number().optional(),
      zoom: z.number().optional(),
      duration: z.number().optional().describe("Animation duration in ms (default 400)"),
    },
  },
  async (params) => {
    const { duration, ...target } = params;
    const opts = duration !== undefined ? { duration } : undefined;
    await engineCall("animateViewport", target, opts);
    return ok("Viewport animation complete.");
  },
);

mcp.registerTool(
  "spatialboard_animate_pan_to",
  {
    description:
      "Smoothly pan so the canvas coordinate (cx, cy) is centered in the viewport." +
      " Returns after the animation completes.",
    inputSchema: {
      cx: z.number(),
      cy: z.number(),
      duration: z.number().optional().describe("Animation duration in ms (default 400)"),
    },
  },
  async ({ cx, cy, duration }) => {
    await engineCall("animatePanTo", cx, cy, duration ?? undefined);
    return ok(`Animated pan to (${cx}, ${cy}).`);
  },
);

mcp.registerTool(
  "spatialboard_undo",
  {
    description: "Undo the last action. Returns confirmation.",
    inputSchema: {},
  },
  async () => {
    await engineCall("undo");
    return ok("Undo applied.");
  },
);

mcp.registerTool(
  "spatialboard_redo",
  {
    description: "Redo the last undone action. Returns confirmation.",
    inputSchema: {},
  },
  async () => {
    await engineCall("redo");
    return ok("Redo applied.");
  },
);

mcp.registerTool(
  "spatialboard_select",
  {
    description: "Select a node by id. Deselects all others first.",
    inputSchema: {
      nodeId: z.string(),
    },
  },
  async ({ nodeId }) => {
    await engineCall("select", nodeId);
    return ok(`Selected ${nodeId.slice(0, 8)}`);
  },
);

mcp.registerTool(
  "spatialboard_deselect_all",
  {
    description: "Deselect all nodes.",
    inputSchema: {},
  },
  async () => {
    await engineCall("deselectAll");
    return ok("Deselected all.");
  },
);

mcp.registerTool(
  "spatialboard_delete_node",
  {
    description: "Delete a node by id. Also cascades to connected edges.",
    inputSchema: {
      nodeId: z.string(),
    },
  },
  async ({ nodeId }) => {
    await engineCall("deleteNode", nodeId);
    return ok(`Deleted ${nodeId.slice(0, 8)}`);
  },
);

mcp.registerTool(
  "spatialboard_set_mode",
  {
    description:
      "Set the canvas interaction mode. Note: for tool+color+width config, prefer spatialboard_activate_tool.",
    inputSchema: {
      mode: z
        .string()
        .describe("Mode: select, draw, shape, text, note, sticky, edge, erase, frame, hand, laser"),
    },
  },
  async ({ mode }) => {
    await engineCall("setMode", mode);
    return ok(`Mode set to ${mode}`);
  },
);

process.on("SIGINT", () => void closeBrowser());
process.on("SIGTERM", () => void closeBrowser());

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await mcp.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
