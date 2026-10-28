import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { FileDownloadButton, getFormattingToolbarItems } from "@blocknote/react";
import {
  handleSafeLinkClick,
  openLinkSafely,
  safeLinkDOMSpec,
  safeLinkHref,
  SAFE_LINK_REL,
  SAFE_LINK_TARGET,
  type LinkWindow,
} from "../safe-links";
import { safeLinksExtension } from "../blocknote-safe-links";
import { FILE_DOWNLOAD_ITEM_KEY, withSafeFileDownload } from "../SafeBlockNoteToolbars";

const BASE = "https://board.example/boards/b1";

function fakeWindow() {
  const opened: Array<[string, string, string]> = [];
  const win: LinkWindow = {
    open: (url, target, features) => {
      opened.push([url, target, features]);
      return null;
    },
    location: { href: BASE },
  };
  return { win, opened };
}

describe("safeLinkHref", () => {
  it("keeps web and mail links, resolved against the base", () => {
    expect(safeLinkHref("https://example.com/a?b=1#c", BASE)).toBe("https://example.com/a?b=1#c");
    expect(safeLinkHref("http://example.com", BASE)).toBe("http://example.com/");
    expect(safeLinkHref("HTTPS://EXAMPLE.COM/x", BASE)).toBe("https://example.com/x");
    expect(safeLinkHref("mailto:someone@example.com", BASE)).toBe("mailto:someone@example.com");
    expect(safeLinkHref("  https://example.com/pad  ", BASE)).toBe("https://example.com/pad");
    expect(safeLinkHref("/other/page", BASE)).toBe("https://board.example/other/page");
    expect(safeLinkHref("//cdn.example/x", BASE)).toBe("https://cdn.example/x");
  });

  it.each([
    "javascript:alert(1)",
    "JAVASCRIPT:alert(1)",
    "java\tscript:alert(1)",
    "java\nscript:alert(1)",
    "\u0001javascript:alert(1)",
    " javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
    "file:///etc/passwd",
    "intent://x#Intent;end",
    "tel:+100",
    "blob:https://board.example/uuid",
    "",
    "   ",
    "http://[::1",
  ])("refuses %j", (href) => {
    expect(safeLinkHref(href, BASE)).toBeNull();
  });

  it("refuses non-strings", () => {
    for (const value of [undefined, null, 42, {}, ["https://example.com"]]) {
      expect(safeLinkHref(value, BASE)).toBeNull();
    }
  });
});

describe("openLinkSafely", () => {
  it("opens with no opener and no referrer, and refuses other schemes", () => {
    const { win, opened } = fakeWindow();
    expect(openLinkSafely("https://example.com/x", win)).toBe(true);
    expect(openLinkSafely("javascript:alert(1)", win)).toBe(false);
    expect(opened).toEqual([["https://example.com/x", "_blank", "noopener,noreferrer"]]);
  });
});

describe("handleSafeLinkClick", () => {
  const inside = new Set<unknown>();
  /** An anchor as the DOM exposes it: `href` resolved against the page,
   *  `getAttribute("href")` as written. */
  const anchor = (written: string | null, resolved = written ?? BASE) => ({
    href: resolved === "" ? BASE : resolved,
    getAttribute: (name: string) => (name === "href" ? written : null),
  });
  const targetIn = (a: unknown) => ({ closest: (sel: string) => (sel === "a" ? a : null) });
  const view = (editable = true) => ({ editable, dom: { contains: (o: unknown) => inside.has(o) } });
  const a1 = anchor("https://example.com/inside");
  const aScript = anchor("javascript:alert(1)");
  const aOutside = anchor("https://example.com/outside");
  inside.add(a1);
  inside.add(aScript);

  it("ignores clicks it should not handle", () => {
    const { win, opened } = fakeWindow();
    const click = (v: ReturnType<typeof view>, e: { button: number; target: unknown }) => handleSafeLinkClick(v, e, win);
    expect(click(view(), { button: 1, target: targetIn(a1) })).toBe(false);
    expect(click(view(), { button: 2, target: targetIn(a1) })).toBe(false);
    expect(click(view(false), { button: 0, target: targetIn(a1) })).toBe(false);
    expect(click(view(), { button: 0, target: targetIn(aOutside) })).toBe(false);
    expect(click(view(), { button: 0, target: targetIn(null) })).toBe(false);
    expect(click(view(), { button: 0, target: null })).toBe(false);
    expect(click(view(), { button: 0, target: { nodeType: 3 } })).toBe(false);
    expect(opened).toEqual([]);
  });

  it("opens nothing for an empty or missing href, which the DOM resolves to the page itself", () => {
    const { win, opened } = fakeWindow();
    const empty = anchor("", BASE);
    const missing = anchor(null, BASE);
    inside.add(empty);
    inside.add(missing);
    expect(handleSafeLinkClick(view(), { button: 0, target: targetIn(empty) }, win)).toBe(true);
    expect(handleSafeLinkClick(view(), { button: 0, target: targetIn(missing) }, win)).toBe(true);
    expect(opened).toEqual([]);
  });

  it("opens a primary click safely and claims a refused href", () => {
    const { win, opened } = fakeWindow();
    expect(handleSafeLinkClick(view(), { button: 0, target: targetIn(a1) }, win)).toBe(true);
    expect(handleSafeLinkClick(view(), { button: 0, target: targetIn(aScript) }, win)).toBe(true);
    expect(opened).toEqual([["https://example.com/inside", "_blank", "noopener,noreferrer"]]);
  });
});

describe("safeLinkDOMSpec", () => {
  it("forces rel and target and drops class", () => {
    const spec = ["a", { href: "https://evil.example/", rel: "opener", target: "_top", class: "fixed inset-0" }, 0];
    expect(safeLinkDOMSpec(spec)).toEqual([
      "a",
      { href: "https://evil.example/", rel: SAFE_LINK_REL, target: SAFE_LINK_TARGET },
      0,
    ]);
    expect(safeLinkDOMSpec(["a", 0])).toEqual(["a", { rel: SAFE_LINK_REL, target: SAFE_LINK_TARGET }, 0]);
    expect(safeLinkDOMSpec("text")).toBe("text");
  });
});

describe("the rich-text block editor", () => {
  type AnyPlugin = { key: string; props: Record<string, unknown> };
  function editorPlugins(extensions: unknown[]) {
    const editor = BlockNoteEditor.create({ extensions } as Parameters<typeof BlockNoteEditor.create>[0]);
    const tiptap = (editor as unknown as { _tiptapEditor: { extensionManager: { plugins: AnyPlugin[] } } })._tiptapEditor;
    return { editor, plugins: tiptap.extensionManager.plugins };
  }

  it("handles a link click before the built-in Link handler, opening one page with no opener", () => {
    const { plugins } = editorPlugins([safeLinksExtension()]);
    const keys = plugins.map((p) => p.key);
    const safe = keys.findIndex((k) => k.startsWith("safeLinkClick$"));
    const upstream = keys.findIndex((k) => k.startsWith("handleClickLink$"));
    expect(upstream).toBeGreaterThanOrEqual(0);
    expect(safe).toBeGreaterThanOrEqual(0);
    expect(safe).toBeLessThan(upstream);

    // ProseMirror calls handleClick in plugin order and stops at the first
    // handler that returns true.
    const opened: unknown[][] = [];
    const realOpen = globalThis.window;
    const anchor = { href: "https://example.com/", getAttribute: () => "https://example.com/" };
    const view = { editable: true, dom: { contains: (o: unknown) => o === anchor } };
    const event = { button: 0, target: { closest: () => anchor } };
    (globalThis as { window?: unknown }).window = {
      open: (...args: unknown[]) => { opened.push(args); return null; },
      location: { href: BASE },
    };
    try {
      for (const p of plugins) {
        const handle = p.props.handleClick as ((v: unknown, pos: number, e: unknown) => boolean) | undefined;
        if (handle && handle(view, 0, event)) break;
      }
    } finally {
      (globalThis as { window?: unknown }).window = realOpen;
    }
    expect(opened).toEqual([["https://example.com/", "_blank", "noopener,noreferrer"]]);
  });

  it("renders link marks through a mark view that forces rel and target", () => {
    const { editor, plugins } = editorPlugins([safeLinksExtension()]);
    const render = plugins.find((p) => p.key.startsWith("safeLinkRender$"));
    const markViews = render?.props.markViews as Record<string, unknown> | undefined;
    expect(typeof markViews?.link).toBe("function");

    // The built-in Link renders stored attributes as given; the mark view
    // runs that output through safeLinkDOMSpec.
    const schema = editor.pmSchema;
    const stored = schema.markFromJSON({
      type: "link",
      attrs: { href: "https://evil.example/", rel: "opener", target: "_top", class: "fixed inset-0" },
    });
    const raw = schema.marks.link.spec.toDOM!(stored, true) as [string, Record<string, string>, number];
    expect(raw[1].rel).toBe("opener");
    const safe = safeLinkDOMSpec(raw);
    expect(safe[1]).toMatchObject({ href: "https://evil.example/", rel: SAFE_LINK_REL, target: SAFE_LINK_TARGET });
    expect("class" in safe[1]).toBe(false);
  });
});

describe("formatting toolbar download swap", () => {
  it("replaces exactly the default download button, by key", () => {
    const items = getFormattingToolbarItems();
    const downloads = items.filter((i) => i.type === FileDownloadButton);
    expect(downloads).toHaveLength(1);
    expect(downloads[0].key).toBe(FILE_DOWNLOAD_ITEM_KEY);
    const SafeButton = () => null;
    const swapped = withSafeFileDownload(items, createElement(SafeButton, { key: FILE_DOWNLOAD_ITEM_KEY }));
    expect(swapped).toHaveLength(items.length);
    expect(swapped.filter((i) => i.type === FileDownloadButton)).toHaveLength(0);
    expect(swapped.filter((i) => i.type === SafeButton)).toHaveLength(1);
    expect(swapped.map((i) => i.key)).toEqual(items.map((i) => i.key));
  });
});
