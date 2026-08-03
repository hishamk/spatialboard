import { createContext, useContext } from "react";

export interface SpatialBoardTheme {
  /** Toolbar/sidebar background (app chrome) */
  toolbarBg: string;
  /** Panel/toolbar background */
  panelBg: string;
  /** Floating panel box-shadow */
  panelShadow: string;
  /** Floating panel border radius */
  panelBorderRadius: number;
  /** Inactive button / input background */
  controlBg: string;
  /** Active button background */
  controlBgActive: string;
  /** Button border radius */
  controlBorderRadius: number;
  /** Primary text color */
  text: string;
  /** Muted label text */
  textMuted: string;
  /** Selection header text */
  textSecondary: string;
  /** Section header / disabled text */
  textFaint: string;
  /** Empty state text */
  textDisabled: string;
  /** Border color */
  border: string;
  /** Separator / divider color */
  separator: string;
  /** Active color swatch border */
  swatchBorderActive: string;
  /** Error state color */
  error: string;
  /** Native control accent (e.g. slider thumb) */
  accentColor: string;
  /** Font stack for the built-in UI chrome (panels, popovers, menus). */
  uiFontFamily?: string;
}

export const SB_UI_FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export const DEFAULT_SB_THEME: SpatialBoardTheme = {
  toolbarBg: "#1e1e2e",
  panelBg: "#1e1e2e",
  panelShadow: "0 4px 24px rgba(0,0,0,0.4)",
  panelBorderRadius: 12,
  controlBg: "#2a2a3e",
  controlBgActive: "#3b82f6",
  controlBorderRadius: 6,
  text: "white",
  textMuted: "#999",
  textSecondary: "#888",
  textFaint: "#666",
  textDisabled: "#555",
  border: "#333",
  separator: "#444",
  swatchBorderActive: "white",
  error: "#e74c3c",
  accentColor: "#3b82f6",
};

/**
 * Light chrome preset — white floating panels over the canvas, in the spirit
 * of Excalidraw/Canva. Active controls use a soft accent TINT (not the full
 * accent color) so the dark text/glyphs stay readable on them.
 */
export const LIGHT_SB_THEME: SpatialBoardTheme = {
  toolbarBg: "#ffffff",
  panelBg: "#ffffff",
  panelShadow: "0 4px 24px rgba(0,0,0,0.12)",
  panelBorderRadius: 12,
  controlBg: "#f4f4f6",
  controlBgActive: "#dbeafe",
  controlBorderRadius: 6,
  text: "#1e1e2e",
  textMuted: "#6b7280",
  textSecondary: "#6b7280",
  textFaint: "#9ca3af",
  textDisabled: "#c0c4cc",
  border: "#e5e7eb",
  separator: "#e5e7eb",
  swatchBorderActive: "#1e1e2e",
  error: "#dc2626",
  accentColor: "#3b82f6",
};

export const SBThemeContext = createContext<SpatialBoardTheme>(DEFAULT_SB_THEME);

export function useSBTheme(): SpatialBoardTheme {
  return useContext(SBThemeContext);
}
