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

async function closeBrowser(): Promise<void> {
  await page?.close().catch(() => {});
  page = null;
  await browser?.close().catch(() => {});
  browser = null;
}

const mcp = new McpServer(
  { name: "spatialboard-dev-app-mcp", version: "0.1.0" },
  {
    instructions: [
      "Automates the spatialboard examples/dev-app in a headless browser.",
      "1) Run the Vite dev server: cd spatialboard/examples/dev-app && npm run dev",
      "2) Once: cd spatialboard/examples/dev-app/mcp && npx playwright install chromium",
      "3) Optional: SPATIALBOARD_DEV_URL (default http://localhost:5173)",
      "Use spatialboard_eval with async script body; `engine` is window.__engine (SpatialEngine).",
      "After loading or building nodes, call engine.fitToContent() so the viewport syncs before screenshots.",
      "Example script: return { count: engine.nodes.size };",
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
