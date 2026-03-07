import type { SpatialNode } from "./types";

interface Snapshot {
  nodes: [string, SpatialNode][];
  groupParent?: [string, string][];
}

export class History {
  private undoStack: string[] = [];
  private redoStack: string[] = [];
  private maxSize = 50;

  pushSnapshot(nodes: Map<string, SpatialNode>, groupParent?: Map<string, string>): void {
    const snap: Snapshot = { nodes: Array.from(nodes.entries()) };
    if (groupParent && groupParent.size > 0) {
      snap.groupParent = Array.from(groupParent.entries());
    }
    const snapshot = JSON.stringify(snap);
    this.undoStack.push(snapshot);
    if (this.undoStack.length > this.maxSize) this.undoStack.shift();
    this.redoStack = [];
  }

  undo(currentNodes: Map<string, SpatialNode>, currentGroupParent?: Map<string, string>): { nodes: Map<string, SpatialNode>; groupParent: Map<string, string> } | null {
    if (this.undoStack.length === 0) return null;
    const snap: Snapshot = { nodes: Array.from(currentNodes.entries()) };
    if (currentGroupParent && currentGroupParent.size > 0) {
      snap.groupParent = Array.from(currentGroupParent.entries());
    }
    this.redoStack.push(JSON.stringify(snap));
    const prev: Snapshot = JSON.parse(this.undoStack.pop()!);
    return {
      nodes: new Map(prev.nodes),
      groupParent: new Map(prev.groupParent ?? []),
    };
  }

  redo(currentNodes: Map<string, SpatialNode>, currentGroupParent?: Map<string, string>): { nodes: Map<string, SpatialNode>; groupParent: Map<string, string> } | null {
    if (this.redoStack.length === 0) return null;
    const snap: Snapshot = { nodes: Array.from(currentNodes.entries()) };
    if (currentGroupParent && currentGroupParent.size > 0) {
      snap.groupParent = Array.from(currentGroupParent.entries());
    }
    this.undoStack.push(JSON.stringify(snap));
    const next: Snapshot = JSON.parse(this.redoStack.pop()!);
    return {
      nodes: new Map(next.nodes),
      groupParent: new Map(next.groupParent ?? []),
    };
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}
