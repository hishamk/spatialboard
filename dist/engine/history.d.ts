import type { SpatialNode } from "./types";
export declare class History {
    private undoStack;
    private redoStack;
    private maxSize;
    pushSnapshot(nodes: Map<string, SpatialNode>, groupParent?: Map<string, string>): void;
    undo(currentNodes: Map<string, SpatialNode>, currentGroupParent?: Map<string, string>): {
        nodes: Map<string, SpatialNode>;
        groupParent: Map<string, string>;
    } | null;
    redo(currentNodes: Map<string, SpatialNode>, currentGroupParent?: Map<string, string>): {
        nodes: Map<string, SpatialNode>;
        groupParent: Map<string, string>;
    } | null;
    clear(): void;
    canUndo(): boolean;
    canRedo(): boolean;
}
