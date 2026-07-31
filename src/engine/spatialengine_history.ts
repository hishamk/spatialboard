// spatialengine_history.ts — engine-level undo/redo + snapshot/coalesce control
// for SpatialEngine. (The `History` class in ./history.ts owns the snapshot stack;
// only these engine-facing methods live here.)
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { SpatialEngine } from "./SpatialEngine";

/** End a coalesced inspector/gesture history session (see `updateNodeWithHistoryCoalesced`). */
export function endHistoryCoalesce(engine: SpatialEngine): void {
  engine._historyCoalesceKey = null;
}

export function pushHistorySnapshot(engine: SpatialEngine): void {
  engine._historyCoalesceKey = null;
  engine.history.pushSnapshot(engine.nodes, engine.groupParent);
  engine.emit("history");
}

export function undo(engine: SpatialEngine): void {
  if (engine.readOnly) return;
  const restored = engine.history.undo(engine.nodes, engine.groupParent);
  if (restored) {
    engine._historyCoalesceKey = null;
    engine.nodes = restored.nodes;
    engine.groupParent = restored.groupParent;
    engine.rebuildGroupChildren();
    engine.rebuildQuadTree();
    engine.rebuildFrameChildren();
    engine.selection.clear();
    engine.refreshSearchIfNeeded();
    engine.emit("change");
    engine.emit("selection");
    engine.emit("history");
  }
}

export function redo(engine: SpatialEngine): void {
  if (engine.readOnly) return;
  const restored = engine.history.redo(engine.nodes, engine.groupParent);
  if (restored) {
    engine._historyCoalesceKey = null;
    engine.nodes = restored.nodes;
    engine.groupParent = restored.groupParent;
    engine.rebuildGroupChildren();
    engine.rebuildQuadTree();
    engine.rebuildFrameChildren();
    engine.selection.clear();
    engine.refreshSearchIfNeeded();
    engine.emit("change");
    engine.emit("selection");
    engine.emit("history");
  }
}

export function canUndo(engine: SpatialEngine): boolean {
  return engine.history.canUndo();
}

export function canRedo(engine: SpatialEngine): boolean {
  return engine.history.canRedo();
}
