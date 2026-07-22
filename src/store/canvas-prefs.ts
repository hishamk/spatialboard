/**
 * Local (localhost / browser) persistence for canvas chrome prefs that aren't
 * part of the document: grid snap, smart guides, and grid size.
 */

const STORAGE_KEY = "sb-canvas-prefs";
const GRID_SIZES = new Set([10, 20, 40, 80]);

export interface CanvasPrefs {
  snapToGrid: boolean;
  smartGuides: boolean;
  gridSize: number;
}

export const DEFAULT_CANVAS_PREFS: CanvasPrefs = {
  snapToGrid: false,
  smartGuides: true,
  gridSize: 20,
};

function sanitize(raw: Partial<CanvasPrefs> | null | undefined): CanvasPrefs {
  const gridSize =
    typeof raw?.gridSize === "number" && GRID_SIZES.has(raw.gridSize)
      ? raw.gridSize
      : DEFAULT_CANVAS_PREFS.gridSize;
  return {
    snapToGrid: typeof raw?.snapToGrid === "boolean" ? raw.snapToGrid : DEFAULT_CANVAS_PREFS.snapToGrid,
    smartGuides: typeof raw?.smartGuides === "boolean" ? raw.smartGuides : DEFAULT_CANVAS_PREFS.smartGuides,
    gridSize,
  };
}

export function loadCanvasPrefs(): CanvasPrefs {
  if (typeof localStorage === "undefined") return { ...DEFAULT_CANVAS_PREFS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CANVAS_PREFS };
    return sanitize(JSON.parse(raw) as Partial<CanvasPrefs>);
  } catch {
    return { ...DEFAULT_CANVAS_PREFS };
  }
}

export function saveCanvasPrefs(prefs: CanvasPrefs): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitize(prefs)));
  } catch {
    // Quota / private mode — ignore.
  }
}
