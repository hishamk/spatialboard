import * as Y from "yjs";
import type { SpatialEngine } from "spatialboard";

export type UndoBinding = {
  manager: Y.UndoManager;
  destroy(): void;
};

/**
 * Undo that only ever reverts this peer's own edits.
 *
 * The manager tracks transactions with the binding's local origin and nothing
 * else, so a peer's changes and the seed are never on the stack. Undoing
 * produces an ordinary Yjs transaction: it reaches this board through the
 * binding's inbound path and the other peers as a normal update.
 *
 * Undo puts back what this peer changed, even where a peer has since
 * written the same field; fields only the other peer touched are left
 * alone, and undoing a delete brings the node back as it was when deleted.
 * That is `ignoreRemoteMapChanges`. Without it Yjs skips any key a peer
 * wrote after this peer's change, and for a node this peer deleted while a
 * peer was editing it, that drops the key from the restored record
 * entirely: a sticky would come back without its `data`.
 *
 * Step boundaries are explicit (`stopCapturing`, called by the binding when
 * a user action ends), so a long drag with pauses is still one step.
 */
export function bindUndo(engine: SpatialEngine, doc: Y.Doc, localOrigin: object): UndoBinding {
  const manager = new Y.UndoManager(doc.getMap("nodes"), {
    trackedOrigins: new Set([localOrigin]),
    captureTimeout: Number.MAX_SAFE_INTEGER,
    ignoreRemoteMapChanges: true,
  });

  // The board's undo/redo buttons and Cmd/Ctrl+Z call these while collab
  // mode is on. The buttons refresh after every call: an undo with nothing
  // left to change pops its item without a `stack-item-popped`.
  const refresh = () => engine.notifyHistoryChange();
  engine.setCollabUndoHandler({
    undo: () => {
      manager.undo();
      refresh();
    },
    redo: () => {
      manager.redo();
      refresh();
    },
    canUndo: () => manager.canUndo(),
    canRedo: () => manager.canRedo(),
  });

  // Pops happen only inside undo()/redo() above, which refresh already.
  manager.on("stack-item-added", refresh);
  manager.on("stack-cleared", refresh);

  return {
    manager,
    destroy() {
      engine.setCollabUndoHandler(null);
      manager.destroy();
    },
  };
}
