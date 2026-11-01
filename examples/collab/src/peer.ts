import * as Y from "yjs";
import { Awareness, removeAwarenessStates } from "y-protocols/awareness";
import { SpatialEngine } from "spatialboard";
import { buildSeedUpdate } from "./seed";
import { bindEngineToDoc, recordToYMap, SB_META, type AppliedResult, type NodeWrite, type WriteMeta } from "./collab/binding";
import { bindUndo } from "./collab/undo";
import {
  asPresence,
  bindPresence,
  describePresenceChange,
  trackRemotePresence,
  type Presence,
  type PresenceField,
  type RemotePresence,
} from "./collab/presence";
import {
  applyAwarenessMessage,
  applySyncMessage,
  encodeAwareness,
  encodeSyncStep1,
  encodeUpdate,
  peekKind,
  readAwarenessEntries,
} from "./collab/protocol";
import { endpointLabel, type Envelope, type SendResult, type SimNetwork, type TrafficNote } from "./net/network";
import type { TrafficKind, TrafficStore } from "./traffic/store";

export type PeerKey = "A" | "B";

export type PeerDef = {
  key: PeerKey;
  name: string;
  /** Identity color: pane header, cursor label, selection outline. */
  color: string;
};

export const PEERS: readonly PeerDef[] = [
  { key: "A", name: "Peer A", color: "#c2410c" },
  { key: "B", name: "Peer B", color: "#1d4ed8" },
];

/** Origin of the seed transaction: applied, never sent, never undoable. */
export const SEED = Symbol("seed");

export type PeerStats = { doc: number; board: number; refused: number; waiting: number; undo: number; redo: number };

export type Peer = PeerDef & {
  endpointId: string;
  engine: SpatialEngine;
  doc: Y.Doc;
  awareness: Awareness;
  /** Other clients' presence, ready to render. */
  remote: RemotePresence;
  readonly online: boolean;
  setOnline(online: boolean): void;
  /** Tab sync switched on: introduce this peer to the other tabs. */
  announceToTabs(): void;
  /** Tab sync about to switch off: say goodbye to the other tabs. */
  leaveTabs(): void;
  /** Tab sync switched off: forget the presence of other tabs' clients. */
  forgetOtherTabs(): void;
  /** Track the pointer over the board's container. Returns a detach. */
  attachPointer(container: HTMLElement): () => void;
  /** Write an edge with no endpoints, the way a faulty peer would. */
  injectMalformedEdge(): void;
  stats(): PeerStats;
  subscribe(cb: () => void): () => void;
  getVersion(): number;
  destroy(): void;
};

function describeTargets(res: SendResult, tabId: string): string {
  const names = res.to.map((id) => endpointLabel(id, tabId));
  if (res.tabs) names.push("tabs");
  if (names.length === 0) return "nobody online";
  return names.length === 1 ? names[0] : `all (${names.length})`;
}

function appliedToWrites(a: AppliedResult | null): NodeWrite[] {
  if (!a) return [];
  return [
    ...a.added.map((id) => ({ id, op: "create" as const })),
    ...a.updated.map((id) => ({ id, op: "update" as const })),
    ...a.deleted.map((id) => ({ id, op: "delete" as const })),
    ...a.refused.map((id) => ({ id, op: "create" as const })),
    ...a.waiting.map((id) => ({ id, op: "create" as const })),
  ];
}

/**
 * One peer: an engine, a Y.Doc, an Awareness and an endpoint on the network,
 * created in plain TypeScript (not inside a React effect) so nothing is bound
 * twice when components re-render or remount.
 */
export function createPeer(
  def: PeerDef,
  network: SimNetwork,
  traffic: TrafficStore,
): Peer {
  const tabId = network.tabId;
  const endpointId = `${tabId}:${def.key}`;
  const localOrigin = { peer: def.key };
  // Origin of everything applied from the wire, so it is never echoed back.
  const transport = { transport: def.key };
  const injected = { experiment: def.key };

  const doc = new Y.Doc();
  const nodes = doc.getMap<Y.Map<unknown>>("nodes");
  Y.applyUpdate(doc, buildSeedUpdate(), SEED);

  const engine = new SpatialEngine();
  const undo = bindUndo(engine, doc, localOrigin);
  // Filled by the binding as each non-local transaction reaches the board,
  // before the doc's `update` event for it: the traffic rows read it.
  let lastApplied: AppliedResult | null = null;
  // The board's container, once mounted: a focused text field inside it
  // means a text edit (or an inspector field) is in progress.
  let container: HTMLElement | null = null;
  const isEditing = () => {
    const el = container?.ownerDocument.activeElement as HTMLElement | null | undefined;
    if (!el || !container?.contains(el)) return false;
    return el.isContentEditable || el.tagName === "INPUT" || el.tagName === "TEXTAREA";
  };
  const binding = bindEngineToDoc(engine, doc, {
    localOrigin,
    stopCapturing: () => undo.manager.stopCapturing(),
    isEditing,
    onApplied: (result) => {
      lastApplied = result;
    },
  });

  const awareness = new Awareness(doc);
  const presence = bindPresence(engine, awareness, {
    name: def.name,
    color: def.color,
    peer: def.key,
    tab: tabId,
  });
  const remote = trackRemotePresence(awareness);

  let online = false;
  // Awareness client ids learned from each remote endpoint, for leave notices.
  const clientsByEndpoint = new Map<string, Set<number>>();

  let version = 0;
  const listeners = new Set<() => void>();
  const bump = () => {
    version++;
    for (const cb of listeners) cb();
  };
  engine.on("change", bump);
  engine.on("history", bump);

  // ── Sending ───────────────────────────────────────────────────────────

  const send = (
    env: Omit<Envelope, "v" | "from">,
    kind: TrafficKind,
    scope: "all" | "tabs" = "all",
  ): void => {
    const bytes = env.bytes?.length ?? 0;
    const channel = env.channel === "doc" ? "doc" : "presence";
    const label = env.note?.label ?? "";
    if (!online) {
      // Offline edits stay in the local doc; the reconnect handshake carries
      // them. Presence made offline is simply not sent.
      if (env.channel === "doc") {
        traffic.log({
          peer: def.key, direction: "out", channel, kind, counterpart: "nobody (offline)",
          bytes, label, writes: env.note?.writes, status: "local only (offline)",
        });
      }
      return;
    }
    const res = network.send({ v: 1, from: endpointId, ...env }, scope);
    traffic.log({
      peer: def.key, direction: "out", channel, kind,
      counterpart: env.to ? endpointLabel(env.to, tabId) : describeTargets(res, tabId),
      bytes, label, writes: env.note?.writes, fields: env.note?.fields, status: "sent",
    });
  };

  const sendStep1 = (to?: string, scope: "all" | "tabs" = "all") =>
    send({ to, channel: "doc", bytes: encodeSyncStep1(doc), note: { label: "state vector" } }, "sync-step-1", scope);

  let lastSentPresence: Presence | null = null;
  const sendAwareness = (to?: string, scope: "all" | "tabs" = "all", heartbeat = false) => {
    const state = asPresence(awareness.getLocalState());
    const fields: PresenceField[] = heartbeat ? [{ field: "heartbeat" }] : describePresenceChange(lastSentPresence, state);
    if (online) lastSentPresence = state;
    send(
      {
        to,
        channel: "awareness",
        bytes: encodeAwareness(awareness, [awareness.clientID]),
        note: { label: fields.map((f) => f.field).join(", ") || "state", fields },
      },
      heartbeat ? "heartbeat" : "awareness",
      scope,
    );
  };

  doc.on("update", (update: Uint8Array, origin: unknown, _doc: Y.Doc, tr: Y.Transaction) => {
    bump();
    if (origin === transport || origin === SEED) return;
    // The binding labels its own writes; an undo/redo or the experiment came
    // through the binding's inbound path just before this event.
    const note: TrafficNote =
      origin === localOrigin
        ? (tr.meta.get(SB_META) as WriteMeta)
        : {
            label:
              origin === injected ? "experiment: malformed edge" : undo.manager.undoing ? "undo" : "redo",
            writes: appliedToWrites(lastApplied),
          };
    send({ channel: "doc", bytes: encodeUpdate(update), note }, "update");
  });

  // `change` fires only when the local state really changed; a heartbeat
  // renews the clock with an identical state and fires `update` alone.
  let localChanged = false;
  let quiet = false;
  awareness.on("change", (_: unknown, origin: unknown) => {
    if (origin === "local") localChanged = true;
    bump();
  });
  awareness.on("update", (_: unknown, origin: unknown) => {
    if (origin !== "local") return;
    const heartbeat = !localChanged;
    localChanged = false;
    if (!quiet) sendAwareness(undefined, "all", heartbeat);
  });

  /**
   * Advance this client's awareness clock without sending anything. A peer
   * that dropped this client's state on a leave keeps the old clock and
   * ignores a state with the same clock, so presence re-sent after a
   * reconnect must carry a newer one.
   */
  const renewPresence = () => {
    quiet = true;
    awareness.setLocalState({ ...(awareness.getLocalState() ?? {}) });
    quiet = false;
  };

  // ── Receiving ─────────────────────────────────────────────────────────

  const logIn = (env: Envelope, kind: TrafficKind, extra: { label?: string; applied?: AppliedResult; fields?: PresenceField[] } = {}) => {
    traffic.log({
      peer: def.key,
      direction: "in",
      channel: env.channel === "doc" ? "doc" : "presence",
      kind,
      counterpart: endpointLabel(env.from, tabId),
      bytes: env.bytes?.length ?? 0,
      label: extra.label ?? env.note?.label ?? "",
      applied: extra.applied,
      fields: extra.fields,
      status: "delivered",
    });
  };

  const dropped = (env: Envelope) =>
    traffic.log({
      peer: def.key, direction: "in", channel: env.channel === "doc" ? "doc" : "presence", kind: "malformed",
      counterpart: endpointLabel(String(env.from), tabId), bytes: env.bytes?.length ?? 0,
      label: "could not decode", status: "dropped (malformed)",
    });

  const receiveDoc = (env: Envelope) => {
    const kind = peekKind(env.bytes!);
    if (kind === "sync-step-1") {
      const reply = applySyncMessage(env.bytes!, doc, transport)!;
      logIn(env, kind, { label: "state vector" });
      send({ to: env.from, channel: "doc", bytes: reply, note: { label: "missing updates" } }, "sync-step-2");
      // A broadcast step 1 is a peer (re)joining: ask for what it has that
      // this peer lacks, and show it who is here.
      if (env.to === undefined) {
        sendStep1(env.from);
        renewPresence();
        sendAwareness(env.from);
      }
      return;
    }
    lastApplied = null;
    applySyncMessage(env.bytes!, doc, transport);
    const applied = lastApplied ?? { added: [], updated: [], deleted: [], refused: [], waiting: [] };
    logIn(env, kind === "sync-step-2" ? "sync-step-2" : "update", { applied });
  };

  const receiveAwareness = (env: Envelope) => {
    const entries = readAwarenessEntries(env.bytes!);
    const known = clientsByEndpoint.get(env.from) ?? new Set<number>();
    clientsByEndpoint.set(env.from, known);
    const fields: PresenceField[] = [];
    for (const { clientID, state } of entries) {
      if (clientID === awareness.clientID) continue;
      const prev = asPresence(awareness.getStates().get(clientID)) ?? undefined;
      fields.push(...describePresenceChange(prev, asPresence(state)));
      if (state) known.add(clientID);
      else known.delete(clientID);
    }
    applyAwarenessMessage(env.bytes!, awareness, transport);
    const heartbeat = fields.length === 0;
    logIn(env, heartbeat ? "heartbeat" : "awareness", {
      label: heartbeat ? "heartbeat" : fields.map((f) => f.field).join(", "),
      fields: heartbeat ? [{ field: "heartbeat" }] : fields,
    });
  };

  const forgetEndpoint = (endpoint: string) => {
    const ids = clientsByEndpoint.get(endpoint);
    clientsByEndpoint.delete(endpoint);
    if (ids?.size) removeAwarenessStates(awareness, [...ids], transport);
  };

  const endpoint = {
    id: endpointId,
    get online() {
      return online;
    },
    deliver(env: Envelope) {
      try {
        if (env.channel === "doc") receiveDoc(env);
        else if (env.channel === "awareness") receiveAwareness(env);
        else {
          forgetEndpoint(env.from);
          logIn(env, "leave", { label: "left" });
        }
      } catch {
        dropped(env);
      }
    },
  };
  network.register(endpoint);

  const announce = (scope: "all" | "tabs") => {
    sendStep1(undefined, scope);
    sendAwareness(undefined, scope);
  };

  return {
    ...def,
    endpointId,
    engine,
    doc,
    awareness,
    remote,
    get online() {
      return online;
    },
    setOnline(next) {
      if (next === online) return;
      if (next) {
        renewPresence();
        online = true;
        announce("all");
      } else {
        send({ channel: "leave", note: { label: "going offline" } }, "leave");
        online = false;
        for (const id of [...clientsByEndpoint.keys()]) forgetEndpoint(id);
      }
      bump();
    },
    announceToTabs() {
      if (!online) return;
      renewPresence();
      announce("tabs");
    },
    leaveTabs() {
      if (online) send({ channel: "leave", note: { label: "tab sync off" } }, "leave", "tabs");
    },
    forgetOtherTabs() {
      for (const id of [...clientsByEndpoint.keys()]) if (!id.startsWith(`${tabId}:`)) forgetEndpoint(id);
    },
    attachPointer(el) {
      container = el;
      const detach = presence.attach(el);
      return () => {
        detach();
        if (container === el) container = null;
      };
    },
    injectMalformedEdge() {
      const id = `bad-${Math.random().toString(36).slice(2, 7)}`;
      doc.transact(() => {
        nodes.set(
          id,
          recordToYMap({ id, type: "edge", x: 0, y: 0, w: 0, h: 0, z: 0, data: { style: "solid", color: "#1e1e2e", strokeWidth: 2 } }),
        );
      }, injected);
    },
    stats: () => ({
      doc: nodes.size,
      board: engine.nodes.size,
      refused: binding.refusedIds().size,
      waiting: binding.waitingIds().size,
      undo: undo.manager.undoStack.length,
      redo: undo.manager.redoStack.length,
    }),
    subscribe(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getVersion: () => version,
    destroy() {
      online = false;
      network.unregister(endpointId);
      engine.off("change", bump);
      engine.off("history", bump);
      presence.destroy();
      remote.destroy();
      binding.destroy();
      undo.destroy();
      awareness.destroy();
      doc.destroy();
    },
  };
}
