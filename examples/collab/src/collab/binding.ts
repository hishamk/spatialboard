import * as Y from "yjs";
import type { SpatialEngine, SpatialNode } from "spatialboard";
import { isValidRecord } from "./validate";

/**
 * Two-way binding between a SpatialEngine and a Y.Doc.
 *
 * Document shape: `doc.getMap("nodes")` holds one nested Y.Map per node,
 * keyed by node id. Its keys are the node's top-level fields; `data` is one
 * JSON value. `undefined` is never stored: the key is deleted instead.
 *
 * Outbound: the engine's `change` event drives every write. Each local edit
 * emits `change` (granular `node:*` events come first in the same burst, but
 * not for every operation: drags, paste, z-order, group and arrange emit only
 * `change`). One microtask later a single `doc.transact(…, localOrigin)`
 * writes what differs, so one burst of edits is one Yjs transaction and one
 * wire message. During a drag the write is scoped to the nodes under the
 * pointer; otherwise it is a diffed sync of the whole board. Undo steps
 * follow user actions, not transactions: a drag, a text edit session or an
 * agent action is one step however many transactions it writes.
 *
 * Inbound: every transaction not made by this binding (a peer's update, an
 * undo/redo, the seed) is applied to the engine with the remote-op methods,
 * which emit no events and record no history. A peer's record is untrusted:
 * one that fails validation is refused (kept off the board, kept in the
 * document). An edge whose endpoint is not on this board waits, hidden, and
 * shows as soon as the endpoint arrives. This binding never deletes a record
 * it did not delete locally.
 *
 * Framework-free: no React in here.
 */

export type NodeRecord = Record<string, unknown> & { id: string };

/** Transaction meta key the binding labels its writes under. */
export const SB_META = "sb";

/** One record a transaction touched. */
export type NodeWrite = { id: string; op: "create" | "update" | "delete"; fields?: string[] };

/** What a local write did, for whoever logs the outgoing update. */
export type WriteMeta = { label: string; writes: NodeWrite[] };

/** What an inbound transaction did to the board. */
export type AppliedResult = {
  added: string[];
  updated: string[];
  deleted: string[];
  refused: string[];
  /** Edges hidden until an endpoint is on the board. */
  waiting: string[];
};

export type Binding = {
  /** Records in the document refused as invalid: the engine's refused edges
   *  plus records that failed this binding's checks. */
  refusedIds(): ReadonlySet<string>;
  /** Edges in the document waiting for an endpoint to be on this board. */
  waitingIds(): ReadonlySet<string>;
  destroy(): void;
};

/** A plain-JSON copy of a node: drops `undefined` fields (and functions). */
export function toRecord(node: SpatialNode): NodeRecord {
  return JSON.parse(JSON.stringify(node)) as NodeRecord;
}

export function recordToYMap(record: NodeRecord): Y.Map<unknown> {
  return new Y.Map<unknown>(Object.entries(record));
}

function sameJSON(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) return false;
  return JSON.stringify(a) === JSON.stringify(b);
}

function isEdgeRecord(rec: unknown): boolean {
  return (rec as { type?: unknown } | undefined)?.type === "edge";
}

function edgeEnds(rec: Record<string, unknown>): [string, string] | null {
  const d = rec.data as { fromId?: unknown; toId?: unknown } | undefined;
  return typeof d?.fromId === "string" && typeof d?.toId === "string" ? [d.fromId, d.toId] : null;
}

/**
 * The patch that turns `existing` into exactly `rec`. `applyRemoteNodeUpdate`
 * merges shallowly and merges `data` into the old data, so a key the peer
 * removed would otherwise linger here: it is sent as `undefined`.
 */
function replacePatch(existing: SpatialNode, rec: NodeRecord): Partial<SpatialNode> {
  const patch: Record<string, unknown> = { ...rec };
  for (const k of Object.keys(existing)) if (!(k in rec)) patch[k] = undefined;
  const oldData = existing.data;
  const newData = rec.data;
  if (oldData && typeof oldData === "object" && newData && typeof newData === "object") {
    const data: Record<string, unknown> = { ...(newData as Record<string, unknown>) };
    for (const k of Object.keys(oldData)) if (!(k in data)) data[k] = undefined;
    patch.data = data;
  }
  return patch as Partial<SpatialNode>;
}

type Batch = {
  /** Whether the batch's first event arrived inside a held step (a gesture,
   *  a text edit, an agent action). Null until the first event. */
  inHold: boolean | null;
  /** Engine event names seen, for the traffic label only. */
  events: string[];
  /** Ids to write when only a gesture moved things. */
  gestureIds: Set<string>;
  full: boolean;
  gestureEnd: boolean;
};

function newBatch(): Batch {
  return { inHold: null, events: [], gestureIds: new Set(), full: false, gestureEnd: false };
}

function countLabel(events: string[]): string {
  const counts = new Map<string, number>();
  for (const e of events) counts.set(e, (counts.get(e) ?? 0) + 1);
  return [...counts].map(([e, n]) => (n > 1 ? `${e} ×${n}` : e)).join(" + ");
}

export function bindEngineToDoc(
  engine: SpatialEngine,
  doc: Y.Doc,
  opts: {
    /** Origin of this binding's own transactions. */
    localOrigin: object;
    /** Undo boundaries: called when a user action ends. */
    stopCapturing?: () => void;
    /** True while a text field on this board has focus (a text edit, or an
     *  inspector field), so the edit session stays one undo step. */
    isEditing?: () => boolean;
    /** Called after each inbound transaction is applied to the engine,
     *  before the doc's `update` event for that transaction fires. */
    onApplied?: (result: AppliedResult) => void;
  },
): Binding {
  const { localOrigin } = opts;
  const nodes = doc.getMap<Y.Map<unknown>>("nodes");
  // Engine node last written or applied, per id. The engine replaces node
  // objects on every update, so identity means "unchanged since last sync".
  const lastSynced = new Map<string, SpatialNode>();
  let applying = false;
  let batch = newBatch();
  let scheduled = false;
  // Records kept off the board: refused as invalid, or edges waiting for an
  // endpoint (see `applyNode`, `settleEdges`).
  const held = new Set<string>();
  const waiting = new Set<string>();

  const track = (id: string) => {
    const n = engine.getNode(id);
    if (n) lastSynced.set(id, n);
    else lastSynced.delete(id);
  };

  const result = (): AppliedResult => ({ added: [], updated: [], deleted: [], refused: [], waiting: [] });

  /**
   * Bring one node record (not an edge) onto the board, or take a deleted
   * record off it. Never trust a peer's record: an incomplete one is held
   * back, and taken off the board if it was there. Edges are settled
   * afterwards by `settleEdges`, so they always find their endpoints.
   */
  const applyNode = (id: string, out: AppliedResult) => {
    const rec = nodes.get(id)?.toJSON() as NodeRecord | undefined;
    if (!rec) {
      held.delete(id);
      waiting.delete(id);
      // Also cascades connected edges off this board; `settleEdges` holds
      // any whose records are still in the document.
      engine.deleteRemoteNode(id);
      out.deleted.push(id);
      return;
    }
    if (isEdgeRecord(rec)) return;
    // A record that was a waiting edge may come back as a node.
    waiting.delete(id);
    const existing = engine.getNode(id);
    if (!isValidRecord(rec, id)) {
      if (existing) engine.deleteRemoteNode(id);
      held.add(id);
      out.refused.push(id);
      return;
    }
    held.delete(id);
    if (existing) {
      engine.applyRemoteNodeUpdate(id, replacePatch(existing, rec));
      out.updated.push(id);
    } else {
      engine.addRemoteNode(rec as unknown as SpatialNode);
      out.added.push(id);
    }
  };

  // Endpoint id → ids of the edge records that point at it, kept in step
  // with the document (local writes included), so a change re-checks only
  // the edges it can affect.
  const edgesAt = new Map<string, Set<string>>();
  const indexedEnds = new Map<string, [string, string]>();
  const reindex = (id: string) => {
    for (const e of indexedEnds.get(id) ?? []) edgesAt.get(e)?.delete(id);
    indexedEnds.delete(id);
    const m = nodes.get(id);
    const ends = m?.get("type") === "edge" ? edgeEnds({ data: m.get("data") }) : null;
    if (!ends) return;
    indexedEnds.set(id, ends);
    for (const e of ends) {
      if (!edgesAt.has(e)) edgesAt.set(e, new Set());
      edgesAt.get(e)!.add(id);
    }
  };

  /** The edges a change to `ids` can affect: the touched edges and every
   *  edge at a touched node. A waiting or refused edge needs nothing else:
   *  it can only change through its own record or through an endpoint's. */
  const affectedEdges = (ids: Iterable<string>): Set<string> => {
    const out = new Set<string>();
    for (const id of ids) {
      if (nodes.get(id)?.get("type") === "edge") out.add(id);
      for (const e of edgesAt.get(id) ?? []) out.add(e);
    }
    return out;
  };

  /**
   * One pass over the edge records, after the nodes. An edge is on the
   * board exactly when its record is valid and both endpoints are nodes on
   * the board. An invalid one is refused. A valid one whose endpoint is not
   * on the board waits: hidden, kept in the document, shown again the moment
   * the endpoint arrives (late delivery, undo, redo). It is never deleted:
   * "not on this board" cannot tell deleted from not received yet. Touched
   * ids are reported, and so is a waiting edge that comes back on.
   */
  const settleEdges = (touched: ReadonlySet<string>, out: AppliedResult) => {
    for (const id of affectedEdges(touched)) {
      const m = nodes.get(id);
      if (m?.get("type") !== "edge") continue;
      const rec = m.toJSON() as NodeRecord;
      const ends = edgeEnds(rec);
      const onBoard = engine.getNode(id);
      const report = touched.has(id);
      const off = (set: Set<string>, list: string[]) => {
        // Also clears an earlier engine refusal, so the id is counted once.
        engine.deleteRemoteNode(id);
        held.delete(id);
        waiting.delete(id);
        set.add(id);
        if (report) list.push(id);
      };

      if (!ends && !onBoard && !held.has(id)) {
        // A new edge without endpoints: the engine refuses it, warns, and
        // lists it in getRefusedRemoteIds().
        waiting.delete(id);
        if (report) {
          engine.addRemoteNode(rec as unknown as SpatialNode);
          out.refused.push(id);
        }
        continue;
      }
      // Includes an existing edge whose data a peer made malformed (the
      // engine would refuse that update silently and keep the stale edge),
      // and an edge whose endpoint is itself or another edge.
      if (!ends || !isValidRecord(rec, id) || ends.includes(id) || ends.some((e) => nodes.get(e)?.get("type") === "edge")) {
        off(held, out.refused);
        continue;
      }
      if (!engine.getNode(ends[0]) || !engine.getNode(ends[1])) {
        off(waiting, out.waiting);
        continue;
      }
      const wasWaiting = waiting.delete(id);
      held.delete(id);
      if (onBoard && report) {
        engine.applyRemoteNodeUpdate(id, replacePatch(onBoard, rec));
        out.updated.push(id);
      } else if (!onBoard) {
        engine.addRemoteNode(rec as unknown as SpatialNode);
        if (report || wasWaiting) out.added.push(id);
      }
    }
  };

  /**
   * Frame membership, derived from geometry by one rule on every peer, for
   * local and remote writes alike: remote ops leave it alone, and a local
   * drag only re-parents the nodes it moved. When a frame (any container
   * type) changed or anything was deleted (it may have been a frame), every
   * node is re-derived; rebuilding more often than needed is harmless.
   */
  const isContainer = (type: unknown) => typeof type === "string" && engine.isContainerType(type);
  const syncFrames = (ids: ReadonlySet<string>, containerBefore = false) => {
    const rebuild = containerBefore || [...ids].some((id) => !nodes.has(id) || isContainer(nodes.get(id)?.get("type")));
    if (rebuild) engine.rebuildFrameChildren();
    else engine.updateFrameMembership([...ids].filter((id) => engine.getNode(id)));
  };

  /** Apply a set of touched ids: nodes first, then the edges they affect. */
  const applyIds = (ids: ReadonlySet<string>): AppliedResult => {
    const out = result();
    // Seen before applying, so a frame a peer turned into another type
    // still counts.
    const containerBefore = [...ids].some((id) => isContainer(engine.getNode(id)?.type));
    for (const id of ids) applyNode(id, out);
    settleEdges(ids, out);
    syncFrames(ids, containerBefore);
    // The touched nodes and the edges settleEdges re-checked now match the
    // document. Only those are snapshotted: an edit not yet flushed
    // elsewhere on the board must still go out.
    for (const id of [...ids, ...affectedEdges(ids)]) track(id);
    return out;
  };

  // ── Startup: collab mode, then the document onto the board ──────────
  engine.setCollabMode(true);
  for (const id of nodes.keys()) reindex(id);
  applying = true;
  try {
    applyIds(new Set(nodes.keys()));
    engine.notifyChange();
  } finally {
    applying = false;
  }

  // ── Outbound ──────────────────────────────────────────────────────────

  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(flush);
  };

  /** Write the engine node's differing fields. */
  const writeNode = (node: SpatialNode): NodeWrite | null => {
    if (lastSynced.get(node.id) === node) return null;
    const rec = toRecord(node);
    const ymap = nodes.get(node.id);
    lastSynced.set(node.id, node);
    if (!ymap) {
      nodes.set(node.id, recordToYMap(rec));
      return { id: node.id, op: "create" };
    }
    // Y.Map.set always creates a new item, even for an equal value. Writing
    // only what differs keeps the wire quiet and keeps undo from reverting
    // fields this peer never touched.
    const fields: string[] = [];
    for (const [k, v] of Object.entries(rec)) {
      if (!sameJSON(ymap.get(k), v)) {
        ymap.set(k, v);
        fields.push(k);
      }
    }
    for (const k of [...ymap.keys()]) {
      if (!(k in rec)) {
        ymap.delete(k);
        fields.push(k);
      }
    }
    return fields.length ? { id: node.id, op: "update", fields } : null;
  };

  const deleteRecord = (id: string): NodeWrite | null => {
    // A record refused here, or an edge waiting for its endpoint, is absent
    // on purpose. Deleting it would delete it for everyone.
    if (engine.getRefusedRemoteIds().has(id) || held.has(id) || waiting.has(id) || !nodes.has(id)) return null;
    nodes.delete(id);
    lastSynced.delete(id);
    return { id, op: "delete" };
  };

  // Undo steps follow actions. A gesture, a text edit session or an agent
  // action holds its step open across all the batches it writes. Whether a
  // batch belongs to a held action is decided by its FIRST event: the last
  // batch of a drag (the final move, applied at pointerup in the same tick
  // that ends the gesture) still belongs to the drag. A batch that started
  // outside any hold first closes whatever step is still open, so the edit
  // after a text session or an agent action starts its own step.
  const holdingStep = () => engine.gestureActive || engine.isInAgentAction || !!opts.isEditing?.();
  let stepOpen = false;

  function flush() {
    scheduled = false;
    const b = batch;
    batch = newBatch();
    if (!b.inHold && stepOpen) {
      opts.stopCapturing?.();
      stepOpen = false;
    }
    const writes: NodeWrite[] = [];
    const push = (w: NodeWrite | null) => w && writes.push(w);

    doc.transact((tr) => {
      if (b.full) {
        // Diffed sync of the whole board: one pointer compare per unchanged
        // node, then delete the records the board no longer has (this is
        // also how cascaded edge deletes, which emit no event, get out).
        for (const node of engine.nodes.values()) push(writeNode(node));
        for (const id of [...nodes.keys()]) if (!engine.getNode(id)) push(deleteRecord(id));
      } else {
        for (const id of b.gestureIds) {
          const node = engine.getNode(id);
          if (node) push(writeNode(node));
        }
      }
      const label = b.gestureEnd
        ? "gesture:end sync"
        : b.events.length
          ? countLabel(b.events)
          : b.full
            ? "change"
            : "gesture (drag)";
      tr.meta.set(SB_META, { label, writes } satisfies WriteMeta);
    }, localOrigin);

    // A gesture can change frame membership without writing anything (a
    // frame resize adopts the nodes it covers when the pointer comes up), so
    // re-derive it by the same rule the other peers use.
    if (b.gestureEnd) engine.rebuildFrameChildren();

    // Still inside the action: keep the step open. Otherwise the action (or
    // the single edit) is complete.
    if (holdingStep()) stepOpen = true;
    else {
      opts.stopCapturing?.();
      stepOpen = false;
    }
  }

  const onChange = () => {
    if (engine.gestureActive) {
      // A drag/resize/rotate emits `change` once per frame. Write the nodes
      // under the pointer and their edges, never the whole board.
      for (const id of engine.gestureIds ?? []) {
        batch.gestureIds.add(id);
        for (const e of engine.getEdgesForNode(id)) batch.gestureIds.add(e.id);
      }
    } else {
      batch.full = true;
    }
  };

  const handlers: Record<string, () => void> = {
    change: onChange,
    "gesture:start": () => opts.stopCapturing?.(),
    "gesture:end": () => {
      batch.full = true;
      batch.gestureEnd = true;
    },
  };
  // Granular events add nothing to what is written; their names only make
  // the traffic panel say which edit produced a message.
  for (const name of ["node:create", "node:delete", "node:move", "node:resize", "node:rotate", "node:data"]) {
    handlers[name] = () => void batch.events.push(name);
  }

  // Every handler is guarded: applying a peer's change calls notifyChange(),
  // which must not echo the change straight back out.
  const subscriptions = Object.entries(handlers).map(([event, fn]) => {
    const guarded = () => {
      if (applying) return;
      if (batch.inHold === null) batch.inHold = holdingStep();
      fn();
      schedule();
    };
    engine.on(event as "change", guarded);
    return () => engine.off(event as "change", guarded);
  });

  // ── Inbound ───────────────────────────────────────────────────────────

  const observer = (events: Array<Y.YEvent<Y.AbstractType<unknown>>>, tr: Y.Transaction) => {
    const ids = new Set<string>();
    for (const ev of events) {
      if (ev.target === nodes) for (const k of (ev as Y.YMapEvent<unknown>).keysChanged) ids.add(k);
      else ids.add(String(ev.path[0]));
    }
    for (const id of ids) reindex(id);
    // This binding's own writes are already on the board. A local delete can
    // still change what the remaining edges point at (an edge to a deleted
    // node now waits), so re-check those. Undo/redo and the seed are not
    // engine writes and flow in below.
    if (tr.origin === localOrigin) {
      settleEdges(new Set([...ids].filter((id) => !nodes.has(id))), result());
      syncFrames(ids);
      return;
    }
    let out: AppliedResult;
    applying = true;
    try {
      out = applyIds(ids);
      engine.notifyChange();
    } finally {
      applying = false;
    }
    opts.onApplied?.(out);
  };
  nodes.observeDeep(observer);

  return {
    refusedIds: () => new Set([...engine.getRefusedRemoteIds(), ...held]),
    waitingIds: () => waiting,
    destroy() {
      for (const off of subscriptions) off();
      nodes.unobserveDeep(observer);
    },
  };
}
