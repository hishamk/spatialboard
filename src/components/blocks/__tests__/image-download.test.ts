import { afterEach, describe, expect, it, vi } from "vitest";
import { safeDownloadFallbackUrl } from "../safe-links";
import { downloadImageNode } from "../../canvas/hooks/useContextMenu";
import type { ImageNode } from "../../../engine/types";

const BASE = "https://board.example/boards/b1";

describe("safeDownloadFallbackUrl", () => {
  it.each([
    ["https://cdn.example/a.png", "https://cdn.example/a.png"],
    ["http://cdn.example/a.png", "http://cdn.example/a.png"],
    ["HTTPS://CDN.EXAMPLE/a.png", "https://cdn.example/a.png"],
    ["blob:https://board.example/0b1c", "blob:https://board.example/0b1c"],
    ["/images/a.png", "https://board.example/images/a.png"],
  ])("keeps %j", (src, expected) => {
    expect(safeDownloadFallbackUrl(src, BASE)).toBe(expected);
  });

  it.each([
    "javascript:alert(1)",
    "JAVASCRIPT:alert(1)",
    "java\tscript:alert(1)",
    " javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "data:image/png;base64,AAAA",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
    "",
    "   ",
    "http://[::1",
    "blob:javascript:alert(1)",
    "blob:null/0b1c",
    "blob:https://other.example/0b1c",
    "blob:data:text/html,x",
  ])("refuses %j", (src) => {
    expect(safeDownloadFallbackUrl(src, BASE)).toBeNull();
  });

  it.each([null, undefined, 42, {}, ["https://cdn.example/a.png"]])("refuses the non-string %j", (src) => {
    expect(safeDownloadFallbackUrl(src, BASE)).toBeNull();
  });
});

function imageNode(src: unknown): ImageNode {
  return { id: "img", type: "image", x: 0, y: 0, w: 10, h: 10, data: { src, alt: "pic" } } as unknown as ImageNode;
}

function stubBrowser(fetchImpl: () => Promise<unknown>) {
  const open = vi.fn();
  const clicks: string[] = [];
  vi.stubGlobal("fetch", vi.fn(fetchImpl));
  vi.stubGlobal("window", { open, location: { href: BASE } });
  vi.stubGlobal("document", {
    createElement: () => {
      const a = { href: "", download: "", click: () => clicks.push(a.href) };
      return a;
    },
    body: { appendChild: () => {}, removeChild: () => {} },
  });
  return { open, clicks };
}

describe("downloadImageNode", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("opens nothing when a javascript: source cannot be fetched", async () => {
    const { open } = stubBrowser(() => Promise.reject(new TypeError("Failed to fetch")));
    await downloadImageNode(imageNode("javascript:alert(document.domain)"));
    expect(open).not.toHaveBeenCalled();
  });

  it("opens nothing for a source that is not a string", async () => {
    const { open } = stubBrowser(() => Promise.reject(new TypeError("Failed to fetch")));
    await downloadImageNode(imageNode({ toString: () => "javascript:alert(1)" }));
    expect(open).not.toHaveBeenCalled();
  });

  it("opens a web image once, without an opener, when fetching it fails", async () => {
    const { open } = stubBrowser(() => Promise.reject(new TypeError("Failed to fetch")));
    await downloadImageNode(imageNode("https://cdn.example/a.png"));
    expect(open).toHaveBeenCalledTimes(1);
    expect(open).toHaveBeenCalledWith("https://cdn.example/a.png", "_blank", "noopener,noreferrer");
  });

  it("downloads a data: image directly and opens no page", async () => {
    const { open, clicks } = stubBrowser(() => Promise.reject(new Error("not called")));
    await downloadImageNode(imageNode("data:image/png;base64,AAAA"));
    expect(clicks).toEqual(["data:image/png;base64,AAAA"]);
    expect(open).not.toHaveBeenCalled();
  });
});
