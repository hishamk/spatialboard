import type { SpatialNode } from "./types";

/**
 * Undo/redo snapshots use STRUCTURAL SHARING: each snapshot is a shallow
 * `Map` copy whose values are the same node objects as the live board at
 * capture time. This relies on a load-bearing engine invariant:
 *
 *   Committed nodes are copy-on-write — engine code MUST NEVER mutate a
 *   node object in place. Every update goes through
 *   `nodes.set(id, { ...existing, ...patch })` (and a fresh `data` object
 *   when patching data). Violating this silently corrupts undo history.
 *
 * The payoff: a snapshot costs map-entry overhead only (pointers), so image
 * data URIs, stroke point arrays, and rich-text payloads exist ONCE on the
 * heap no matter how deep the history is — previously each step stored a
 * full `JSON.stringify` of the entire board (≈ board size × 50 steps).
 */
interface Snapshot {
  nodes: Map<string, SpatialNode>;
  groupParent?: Map<string, string>;
}

export class History {
  private undoStack: Snapshot[] = [];
  private redoStack: Snapshot[] = [];
  private maxSize = 50;

  private capture(nodes: Map<string, SpatialNode>, groupParent?: Map<string, string>): Snapshot {
    const snap: Snapshot = { nodes: new Map(nodes) };
    if (groupParent && groupParent.size > 0) {
      snap.groupParent = new Map(groupParent);
    }
    return snap;
  }

  /** Restored maps must be FRESH containers — the engine mutates the returned
   * map going forward, and it must never alias a stack entry. */
  private restore(snap: Snapshot): { nodes: Map<string, SpatialNode>; groupParent: Map<string, string> } {
    return {
      nodes: new Map(snap.nodes),
      groupParent: new Map(snap.groupParent ?? []),
    };
  }

  pushSnapshot(nodes: Map<string, SpatialNode>, groupParent?: Map<string, string>): void {
    this.undoStack.push(this.capture(nodes, groupParent));
    if (this.undoStack.length > this.maxSize) this.undoStack.shift();
    this.redoStack = [];
  }

  undo(currentNodes: Map<string, SpatialNode>, currentGroupParent?: Map<string, string>): { nodes: Map<string, SpatialNode>; groupParent: Map<string, string> } | null {
    if (this.undoStack.length === 0) return null;
    this.redoStack.push(this.capture(currentNodes, currentGroupParent));
    return this.restore(this.undoStack.pop()!);
  }

  redo(currentNodes: Map<string, SpatialNode>, currentGroupParent?: Map<string, string>): { nodes: Map<string, SpatialNode>; groupParent: Map<string, string> } | null {
    if (this.redoStack.length === 0) return null;
    this.undoStack.push(this.capture(currentNodes, currentGroupParent));
    return this.restore(this.redoStack.pop()!);
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
