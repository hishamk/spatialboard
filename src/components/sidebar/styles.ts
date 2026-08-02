import type { StrokeStyle, FillStyle, TextAlign } from "../../engine/types";

export const TOOL_STRIP_WIDTH = 52;
export const PROPERTIES_WIDTH = 300;
export const SIDEBAR_WIDTH = TOOL_STRIP_WIDTH + PROPERTIES_WIDTH;
/** Board container widths below this get the compact (mobile/touch) chrome:
 *  bottom tool row + overflow menus instead of the side rail + full bottom bar. */
export const COMPACT_BREAKPOINT = 640;
/** Space (px, excluding safe-area inset) the compact tool row occupies at the
 *  bottom of the board — the compact BottomBar, overflow menus, and the
 *  inspector bottom sheet all stack above this so the tools stay reachable. */
export const MOBILE_TOOLBAR_CLEARANCE = 70;

export const STROKE_COLORS = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6",
];

export const FILL_COLORS: (string | null)[] = [
  null, // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6",
];

export const FILL_STYLES: { key: FillStyle; label: string }[] = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" },
];

export const STROKE_STYLES: {
  key: StrokeStyle;
  label: string;
  dash: string;
}[] = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" },
];

export const ROUGHNESS_LEVELS: { value: number; label: string }[] = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" },
];

// Tool-specific stroke width presets
// - Draw: expressive freehand steps
// - Shape: tighter structural line steps
// - Edge: slightly narrower for connectors
export const WIDTHS_DRAW = [1, 2, 3, 5, 8, 12];
export const WIDTHS_SHAPE = [1, 2, 3, 4, 6, 8];
export const WIDTHS_EDGE = [1, 2, 3, 4, 6];

// Backward-compatible default for generic width pickers.
export const WIDTHS = WIDTHS_SHAPE;

export const FONT_SIZES = [14, 20, 28, 36];

export const TEXT_ALIGNS: { key: TextAlign; label: string }[] = [
  { key: "left", label: "\u2190" },
  { key: "center", label: "\u2194" },
  { key: "right", label: "\u2192" },
];

export const STICKY_COLORS = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5",
];

export interface ColorPalette {
  name: string;
  colors: string[];
}

export const STROKE_PALETTES: ColorPalette[] = [
  { name: "Standard", colors: STROKE_COLORS },
  { name: "Pastel",   colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth",    colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon",     colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon",   colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono",     colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] },
];

export const FILL_PALETTES: ColorPalette[] = STROKE_PALETTES;

export const STICKY_PALETTES: ColorPalette[] = [
  { name: "Standard", colors: STICKY_COLORS },
  { name: "Bright",   colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth",    colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool",     colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] },
];

// Inspector control metrics reference density variables with the historical
// desktop value as the fallback — desktop renders byte-identical, while the
// mobile sheet sets `--sbp-*` on its container to get thumb-sized controls
// through every shared primitive without threading props.
export const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "var(--sbp-row-gap, 6px)",
};

export const labelStyle: React.CSSProperties = {
  width: "var(--sbp-label-w, 64px)",
  fontSize: "var(--sbp-label-fs, 10px)",
  flexShrink: 0,
};

/** Density overrides the mobile properties sheet sets on its container. */
export const TOUCH_PROPS_VARS = {
  "--sbp-row-gap": "8px",
  "--sbp-label-w": "72px",
  "--sbp-label-fs": "12px",
  "--sbp-swatch": "30px",
  "--sbp-ctl-h": "38px",
  "--sbp-wbtn-w": "40px",
  "--sbp-sbtn-w": "46px",
  "--sbp-sec-fs": "11px",
  "--sbp-sec-pad": "10px 12px",
  "--sbp-sec-content-pad": "10px 12px 12px",
  "--sbp-pill-fs": "12px",
  "--sbp-pill-pad": "9px 14px",
  "--sbp-toggle-pad": "9px 14px",
} as React.CSSProperties;

export const btnBase: React.CSSProperties = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0,
};

export const sectionHeader: React.CSSProperties = {
  fontSize: 9,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  padding: "4px 0 2px",
  marginTop: 4,
};
