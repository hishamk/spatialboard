export const TOOL_STRIP_WIDTH = 48;
export const PROPERTIES_WIDTH = 270;
export const SIDEBAR_WIDTH = TOOL_STRIP_WIDTH + PROPERTIES_WIDTH;

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

export const FILL_STYLES: { key: "hachure" | "cross-hatch" | "solid"; label: string }[] = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" },
];

export const STROKE_STYLES: {
  key: "solid" | "dashed" | "dotted";
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

export const WIDTHS = [1, 2.5, 5, 10, 20];

export const FONT_SIZES = [14, 20, 28, 36];

export const TEXT_ALIGNS: { key: "left" | "center" | "right"; label: string }[] = [
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

export const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

export const labelStyle: React.CSSProperties = {
  width: 52,
  fontSize: 10,
  flexShrink: 0,
};

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
