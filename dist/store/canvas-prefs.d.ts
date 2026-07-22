/**
 * Local (localhost / browser) persistence for canvas chrome prefs that aren't
 * part of the document: grid snap, smart guides, and grid size.
 */
export interface CanvasPrefs {
    snapToGrid: boolean;
    smartGuides: boolean;
    gridSize: number;
}
export declare const DEFAULT_CANVAS_PREFS: CanvasPrefs;
export declare function loadCanvasPrefs(): CanvasPrefs;
export declare function saveCanvasPrefs(prefs: CanvasPrefs): void;
