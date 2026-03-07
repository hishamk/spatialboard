// ============================================================================
// Excalidraw file format types
// ============================================================================

/** Any Excalidraw element as it appears in .excalidraw / .excalidrawlib JSON. */
export interface ExcalidrawElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: string;
  strokeWidth: number;
  strokeStyle: string;
  roughness: number;
  opacity: number;
  groupIds: string[];
  boundElements?: Array<{ id: string; type: string }> | null;
  roundness?: { type: number } | null;
  /** V1 property — replaced by `roundness` in V2 */
  strokeSharpness?: "sharp" | "round";
  locked?: boolean;
  isDeleted?: boolean;

  // Linear elements (arrow, line)
  points?: Array<[number, number]>;
  startArrowhead?: string | null;
  endArrowhead?: string | null;

  // Text
  text?: string;
  fontSize?: number;
  fontFamily?: number;
  textAlign?: string;
  verticalAlign?: string;
  containerId?: string | null;
  originalText?: string;
  lineHeight?: number;

  // Freedraw
  pressures?: number[];
  simulatePressure?: boolean;

  // Image
  fileId?: string;

  // Frame
  name?: string;

  // Misc
  seed?: number;
}

/** A single library item containing one or more elements. */
export interface ExcalidrawLibraryItem {
  id: string;
  name: string;
  status: string;
  created: number;
  elements: ExcalidrawElement[];
}

/** Top-level .excalidrawlib file format (v2). */
export interface ExcalidrawLibFile {
  type: "excalidrawlib";
  version: number;
  source?: string;
  libraryItems: ExcalidrawLibraryItem[];
}

/**
 * Raw .excalidrawlib JSON before normalization.
 * V1 uses `library: ExcalidrawElement[][]`, V2 uses `libraryItems: ExcalidrawLibraryItem[]`.
 */
export interface ExcalidrawLibFileRaw {
  type: "excalidrawlib";
  version: number;
  source?: string;
  library?: ExcalidrawElement[][];
  libraryItems?: ExcalidrawLibraryItem[];
}

/** Entry in the community directory index (libraries.json). */
export interface ExcalidrawDirectoryEntry {
  id: string;
  name: string;
  description: string;
  authors: Array<{ name: string; url?: string; github?: string }>;
  source: string;
  preview?: string;
  created: string;
  updated: string;
  version?: number;
  itemNames?: string[];
}
