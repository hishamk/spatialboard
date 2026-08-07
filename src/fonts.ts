import excalifontUrl from "./assets/fonts/Excalifont-Regular.woff2";
import { FONT_FAMILIES, NON_GOOGLE_FONTS } from "./font-constants";

// Re-export the asset-free font constants/helpers so existing React-layer imports
// of `../fonts` keep working unchanged. The heavy bit — the bundled-woff2 asset
// import above and the DOM loader below — stays here; the headless/engine path
// (e.g. `sbd-parser.ts`) imports directly from `./font-constants` and never pulls
// the .woff2 asset.
export * from "./font-constants";

/**
 * Bundled (non-Google) font families → their in-bundle asset URL + CSS font format.
 * Single source of truth for both the live-canvas @font-face injection below and
 * the export path's font embedding (src/export/canvas-export.ts).
 */
export const BUNDLED_FONT_SOURCES: Record<
  string,
  { url: string; format: "woff2" | "truetype" }
> = {
  Excalifont: { url: excalifontUrl, format: "woff2" },
};

let _fontsLoaded = false;

/** Inject bundled @font-face rules + a Google Fonts <link> for all remote families. Idempotent. */
export function loadGoogleFonts(doc: Document = document): void {
  if (_fontsLoaded) return;
  _fontsLoaded = true;

  // Bundled fonts (base64-inlined into the JS at build time)
  const style = doc.createElement("style");
  style.textContent = Object.entries(BUNDLED_FONT_SOURCES)
    .map(
      ([family, { url, format }]) => `
@font-face {
  font-family: '${family}';
  src: url('${url}') format('${format}');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`,
    )
    .join("");
  doc.head.appendChild(style);

  // Google Fonts
  const families = FONT_FAMILIES
    .filter((f) => !NON_GOOGLE_FONTS.has(f.key))
    .map((f) => "family=" + f.key.replace(/ /g, "+"))
    .join("&");

  const link = doc.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  doc.head.appendChild(link);
}
