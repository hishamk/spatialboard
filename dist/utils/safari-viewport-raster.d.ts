/**
 * Whether to use a split translate/scale DOM path to reduce WebKit blur when zooming.
 *
 * Safari (and all iOS browsers) can rasterize large composited layers at a resolution
 * that looks soft when `translate` and `scale` are combined in one CSS transform on a
 * big subtree — similar in spirit to the HTML canvas case described in
 * https://stackoverflow.com/a/72554948
 *
 * Chromium and Firefox keep the single-transform path.
 */
export declare function prefersSafariWebKitViewportWorkaround(): boolean;
