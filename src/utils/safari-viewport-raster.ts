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
export function prefersSafariWebKitViewportWorkaround(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isIOSDevice = /iPhone|iPad|iPod/i.test(ua);

  // Desktop/Android Chromium — leave the unified transform path unchanged.
  if (/Chrome|Chromium|EdgA?|OPR|Brave/i.test(ua) && !isIOSDevice) {
    return false;
  }
  if (/Firefox/i.test(ua)) return false;

  // Every iOS browser uses WebKit for layout/paint.
  if (isIOSDevice) return true;

  // Desktop Safari: Safari token without Chromium.
  return /Safari/i.test(ua) && !/Chrome|Chromium|Edg/i.test(ua);
}
