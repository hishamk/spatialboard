import type { BoardBackground } from "../engine/SpatialEngine";

export type PaperGroup = "light" | "dark" | "textured";

export interface PaperTypeConfig {
  key: BoardBackground;
  label: string;
  group: PaperGroup;
  canvasBg: string;
  swatchColor: string;
}

export const PAPER_TYPES: PaperTypeConfig[] = [
  // Light
  { key: "plain-white",         label: "White",               group: "light",    canvasBg: "#ffffff", swatchColor: "#ffffff" },
  { key: "dot-grid",            label: "Cream",               group: "light",    canvasBg: "#f8f7f5", swatchColor: "#f8f7f5" },
  { key: "engineering",         label: "Warm",                group: "light",    canvasBg: "#fdf6e3", swatchColor: "#fdf6e3" },
  // Dark
  { key: "blueprint",           label: "Blueprint",           group: "dark",     canvasBg: "#1e3a5f", swatchColor: "#1e3a5f" },
  { key: "dark-grid",           label: "Night",               group: "dark",     canvasBg: "#1a1a2e", swatchColor: "#1a1a2e" },
  // Textured
  { key: "japanese-stationery", label: "Japanese Stationery", group: "textured", canvasBg: "#f5f0e8", swatchColor: "#f5f0e8" },
  { key: "kraft",               label: "Kraft Paper",         group: "textured", canvasBg: "#d4b896", swatchColor: "#d4b896" },
];

export function getPaperType(key: BoardBackground): PaperTypeConfig {
  return PAPER_TYPES.find((p) => p.key === key) ?? PAPER_TYPES[1]; // fallback to cream
}
