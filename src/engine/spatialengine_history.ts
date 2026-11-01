// spatialengine_history.ts — engine-level undo/redo + snapshot/coalesce control
// for SpatialEngine. (The `History` class in ./history.ts owns the snapshot stack;
// only these engine-facing methods live here.)
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type { CollabUndoHandler, SpatialEngine } from "./SpatialEngine";

/** The host handler, when collab mode is on, the board is editable and one
 *  is set. A read-only board offers no undo, so its buttons stay disabled. */
function collabHandler(engine: SpatialEngine): CollabUndoHandler | null {
  return engine._collabMode && !engine.readOnly ? engine._collabUndoHandler : null;
}

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
  const handler = collabHandler(engine);
  if (handler) {
    handler.undo();
    return;
  }
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
    engine.emit("graph:replaced");
    engine.emit("change");
    engine.emit("selection");
    engine.emit("history");
  }
}

export function redo(engine: SpatialEngine): void {
  if (engine.readOnly) return;
  const handler = collabHandler(engine);
  if (handler) {
    handler.redo();
    return;
  }
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
    engine.emit("graph:replaced");
    engine.emit("change");
    engine.emit("selection");
    engine.emit("history");
  }
}

export function canUndo(engine: SpatialEngine): boolean {
  const handler = collabHandler(engine);
  if (handler) return handler.canUndo();
  return engine.history.canUndo();
}

export function canRedo(engine: SpatialEngine): boolean {
  const handler = collabHandler(engine);
  if (handler) return handler.canRedo();
  return engine.history.canRedo();
}
