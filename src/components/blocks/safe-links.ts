// safe-links.ts — opening and rendering rich-text links without handing the
// opened page a reference back to the board.
//
// A page opened with `window.open(url, "_blank")` keeps `window.opener` and can
// navigate the board's tab elsewhere. Link hrefs in a rich-text block come
// from whoever edited the board, pasted HTML and imported content, so links
// open through `openLinkSafely` (no opener, no referrer, web and mail links
// only) and render with a fixed `rel`/`target`.
//
// Plain functions only: no React, no editor imports.

const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

export const SAFE_LINK_REL = "noopener noreferrer nofollow";
export const SAFE_LINK_TARGET = "_blank";

/**
 * `href` resolved against `base`, or null unless it is an http, https or
 * mailto URL. The URL parser drops the tabs, newlines and leading control
 * characters used to disguise a scheme (`java\tscript:`), so the protocol
 * checked is the one the browser would follow.
 */
export function safeLinkHref(href: unknown, base: string): string | null {
  if (typeof href !== "string" || href.trim() === "") return null;
  let url: URL;
  try {
    url = new URL(href, base);
  } catch {
    return null;
  }
  return ALLOWED_PROTOCOLS.has(url.protocol) ? url.href : null;
}

/** What opening a link needs from `window`. */
export interface LinkWindow {
  open(url: string, target: string, features: string): unknown;
  location: { href: string };
}

/**
 * Open `href` in a new tab with no opener and no referrer. Returns false, and
 * opens nothing, when the href is refused.
 */
export function openLinkSafely(href: unknown, win: LinkWindow = window): boolean {
  const url = safeLinkHref(href, win.location.href);
  if (!url) return false;
  win.open(url, SAFE_LINK_TARGET, "noopener,noreferrer");
  return true;
}

/** The parts of an editor view the click handler reads. */
export interface ClickView {
  editable: boolean;
  dom: { contains(other: unknown): boolean };
}

type AnchorLike = { getAttribute?(name: string): string | null };

function closestAnchor(target: unknown): AnchorLike | null {
  if (!target || typeof (target as { closest?: unknown }).closest !== "function") return null;
  return (target as { closest(selector: string): AnchorLike | null }).closest("a");
}

/**
 * Click handler for links in an editable view: a primary-button click on an
 * anchor inside the view opens it through `openLinkSafely`. Returns true when
 * it handled the click, including when the href was refused, so no later
 * handler opens the link another way.
 *
 * The href is read as written (`getAttribute`), not through the anchor's
 * resolved `href` property: an empty or missing href resolves to the page's
 * own URL, which would open the board itself in a new tab.
 */
export function handleSafeLinkClick(
  view: ClickView,
  event: { button: number; target: unknown },
  win: LinkWindow = window,
): boolean {
  if (event.button !== 0) return false;
  if (!view.editable) return false;
  const anchor = closestAnchor(event.target);
  if (!anchor || !view.dom.contains(anchor)) return false;
  const href = typeof anchor.getAttribute === "function" ? anchor.getAttribute("href") : null;
  openLinkSafely(href, win);
  return true;
}

/**
 * A link mark's DOM spec (`["a", attrs, 0]`) with `rel` and `target` set to
 * the safe values and any `class` removed, so a stored or pasted
 * `rel="opener"`, `target="_top"` or overlay class never reaches the page.
 * Other specs pass through unchanged.
 */
export function safeLinkDOMSpec<T>(spec: T): T {
  if (!Array.isArray(spec)) return spec;
  const [tag, second] = spec as unknown[];
  const hasAttrs =
    !!second && typeof second === "object" && !Array.isArray(second) && !("nodeType" in second);
  const attrs: Record<string, unknown> = hasAttrs ? { ...(second as Record<string, unknown>) } : {};
  delete attrs.class;
  const children = spec.slice(hasAttrs ? 2 : 1);
  return [tag, { ...attrs, rel: SAFE_LINK_REL, target: SAFE_LINK_TARGET }, ...children] as unknown as T;
}
