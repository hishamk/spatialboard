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
export declare const DEFAULT_FONT = "Excalifont";
export declare const FONT_FAMILIES: FontOption[];
/** Icon for font category (like reference: H, A, </>, pencil) */
export declare function getFontIcon(category?: FontOption["category"]): string;
/** Returns the CSS font-family value for a stored font key */
export declare function getFontFamilyCSS(key: string): string;
/** Inject bundled @font-face rules + a Google Fonts <link> for all remote families. Idempotent. */
export declare function loadGoogleFonts(doc?: Document): void;
