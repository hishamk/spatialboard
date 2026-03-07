import excalifontUrl from "./assets/fonts/Excalifont-Regular.woff2";

/**
 * Font families for text nodes.
 * System fonts use their generic name; Google Fonts use the family name.
 * Rendering uses getFontFamilyCSS() to produce the CSS font-family value.
 */
export interface FontOption {
  key: string;
  label: string;
  category?: "system" | "sans" | "serif" | "mono" | "display" | "hand";
}

export const DEFAULT_FONT = "Excalifont";

export const FONT_FAMILIES: FontOption[] = [
  // Bundled — hand-drawn default
  { key: "Excalifont", label: "Excalifont", category: "hand" },
  // System
  { key: "sans-serif", label: "Sans (system)", category: "system" },
  { key: "serif", label: "Serif (system)", category: "system" },
  { key: "monospace", label: "Mono (system)", category: "system" },
  // Google — Professional
  { key: "Inter", label: "Inter", category: "sans" },
  { key: "Roboto", label: "Roboto", category: "sans" },
  { key: "Open Sans", label: "Open Sans", category: "sans" },
  { key: "Lora", label: "Lora", category: "serif" },
  { key: "Playfair Display", label: "Playfair Display", category: "serif" },
  { key: "Merriweather", label: "Merriweather", category: "serif" },
  // Google — Mono
  { key: "JetBrains Mono", label: "JetBrains Mono", category: "mono" },
  { key: "Fira Code", label: "Fira Code", category: "mono" },
  { key: "Source Code Pro", label: "Source Code Pro", category: "mono" },
  // Google — Handwritten / Casual
  { key: "Caveat", label: "Caveat", category: "hand" },
  { key: "Shadows Into Light", label: "Shadows Into Light", category: "hand" },
  { key: "Dancing Script", label: "Dancing Script", category: "hand" },
  { key: "Amatic SC", label: "Amatic SC", category: "hand" },
  // Google — Display / Funky
  { key: "Pacifico", label: "Pacifico", category: "display" },
  { key: "Lobster", label: "Lobster", category: "display" },
  { key: "Permanent Marker", label: "Permanent Marker", category: "display" },
  { key: "Bangers", label: "Bangers", category: "display" },
  { key: "Righteous", label: "Righteous", category: "display" },
  { key: "Satisfy", label: "Satisfy", category: "display" },
  { key: "Kaushan Script", label: "Kaushan Script", category: "display" },
  { key: "Fredericka the Great", label: "Fredericka the Great", category: "display" },
  { key: "Comfortaa", label: "Comfortaa", category: "display" },
];

const SYSTEM_FONTS = new Set(["sans-serif", "serif", "monospace"]);
const BUNDLED_FONTS = new Set(["Excalifont"]);
const NON_GOOGLE_FONTS = new Set([...SYSTEM_FONTS, ...BUNDLED_FONTS]);

/** Icon for font category (like reference: H, A, </>, pencil) */
export function getFontIcon(category?: FontOption["category"]): string {
  switch (category) {
    case "serif":
    case "display":
      return "H"; // heading-style
    case "mono":
      return "</>"; // code
    case "hand":
      return "\u270F"; // ✏ pencil
    default:
      return "A"; // general
  }
}

/** Returns the CSS font-family value for a stored font key */
export function getFontFamilyCSS(key: string): string {
  if (SYSTEM_FONTS.has(key)) return key;
  return `'${key}', sans-serif`;
}

let _fontsLoaded = false;

/** Inject bundled @font-face rules + a Google Fonts <link> for all remote families. Idempotent. */
export function loadGoogleFonts(doc: Document = document): void {
  if (_fontsLoaded) return;
  _fontsLoaded = true;

  // Bundled Excalifont
  const style = doc.createElement("style");
  style.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${excalifontUrl}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`;
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
