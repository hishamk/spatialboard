import type { BoardBackground } from "../engine/SpatialEngine";

export type PaperGroup = "light" | "dark" | "textured";

export interface PaperTypeConfig {
  key: BoardBackground;
  label: string;
  group: PaperGroup;
  canvasBg: string;
  swatchColor: string;
  hasGrid: boolean;
}

export const PAPER_TYPES: PaperTypeConfig[] = [
  // Light
  { key: "plain-white",        label: "Plain White",         group: "light",    canvasBg: "#ffffff", swatchColor: "#ffffff", hasGrid: false },
  { key: "dot-grid",           label: "Dot Grid",            group: "light",    canvasBg: "#f8f7f5", swatchColor: "#f8f7f5", hasGrid: true },
  { key: "graph-paper",        label: "Graph Paper",         group: "light",    canvasBg: "#ffffff", swatchColor: "#e8f0fe", hasGrid: true },
  { key: "college-ruled",      label: "College Ruled",       group: "light",    canvasBg: "#ffffff", swatchColor: "#f0f4ff", hasGrid: true },
  { key: "engineering",        label: "Engineering Pad",     group: "light",    canvasBg: "#fdf6e3", swatchColor: "#fdf6e3", hasGrid: true },
  { key: "isometric",          label: "Isometric",           group: "light",    canvasBg: "#ffffff", swatchColor: "#f5f5f5", hasGrid: true },
  // Dark
  { key: "blueprint",          label: "Blueprint",           group: "dark",     canvasBg: "#1e3a5f", swatchColor: "#1e3a5f", hasGrid: true },
  { key: "dark-grid",          label: "Dark Grid",           group: "dark",     canvasBg: "#1a1a2e", swatchColor: "#1a1a2e", hasGrid: true },
  // Textured
  { key: "japanese-stationery", label: "Japanese Stationery", group: "textured", canvasBg: "#f5f0e8", swatchColor: "#f5f0e8", hasGrid: true },
  { key: "kraft",              label: "Kraft Paper",          group: "textured", canvasBg: "#d4b896", swatchColor: "#d4b896", hasGrid: false },
];

export function getPaperType(key: BoardBackground): PaperTypeConfig {
  return PAPER_TYPES.find((p) => p.key === key) ?? PAPER_TYPES[1]; // fallback to dot-grid
}
