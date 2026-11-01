import type { NodeWrite } from "../collab/binding";
import type { PresenceField } from "../collab/presence";

/**
 * The traffic log behind the panel: one ring buffer per in-page peer,
 * coalescing bursts (a 3-second drag is one row ×120, not 120 rows), plus
 * running totals that Clear does not reset.
 */

export type Direction = "out" | "in";
/** `presence` covers awareness and leave notices. */
export type TrafficChannel = "doc" | "presence";
export type TrafficKind =
  | "update"
  | "sync-step-1"
  | "sync-step-2"
  | "awareness"
  | "heartbeat"
  | "leave"
  | "malformed";
export type TrafficStatus = "sent" | "delivered" | "local only (offline)" | "dropped (malformed)";

export type Applied = { added: string[]; updated: string[]; deleted: string[]; refused: string[]; waiting: string[] };

export type TrafficEntry = {
  seq: number;
  /** Time of the first message in the row. */
  at: number;
  /** Time of the latest message folded into the row. */
  last: number;
  peer: string;
  direction: Direction;
  channel: TrafficChannel;
  kind: TrafficKind;
  /** "B", "all (2)", "tab 3f2a · A", "nobody online". */
  counterpart: string;
  /** Framed message bytes, summed over the row. */
  bytes: number;
  /** Stable part of the description; rows coalesce on it. */
  label: string;
  /** Records an outgoing update wrote. */
  writes?: NodeWrite[];
  /** What an incoming update did to the board. */
  applied?: Applied;
  /** Awareness: what changed in the latest message. */
  fields?: PresenceField[];
  status: TrafficStatus;
  count: number;
};

export type TrafficInput = Omit<TrafficEntry, "seq" | "at" | "last" | "count">;

type Tally = { messages: number; bytes: number };
export type PeerTotals = Record<Direction, Record<TrafficChannel, Tally>>;

export const MAX_ROWS = 300;
export const COALESCE_MS = 1000;
const LOOK_BACK = 6;

function emptyTotals(): PeerTotals {
  const t = (): Record<TrafficChannel, Tally> => ({ doc: { messages: 0, bytes: 0 }, presence: { messages: 0, bytes: 0 } });
  return { out: t(), in: t() };
}

function union(a: string[] | undefined, b: string[] | undefined): string[] | undefined {
  if (!a) return b;
  if (!b) return a;
  return [...new Set([...a, ...b])];
}

/** Writes kept per row; the panel shows the first few anyway. */
const MAX_WRITES = 64;

/** Writes of both rows, one per id, with their fields merged. */
function mergeWrites(a: NodeWrite[] | undefined, b: NodeWrite[] | undefined): NodeWrite[] | undefined {
  if (!a) return b;
  if (!b) return a;
  if (a.length >= MAX_WRITES) return a;
  const byId = new Map<string, NodeWrite>();
  for (const w of [...a, ...b]) {
    const prev = byId.get(w.id);
    const fields = prev?.fields || w.fields ? [...new Set([...(prev?.fields ?? []), ...(w.fields ?? [])])] : undefined;
    byId.set(w.id, { id: w.id, op: w.op === "update" && prev ? prev.op : w.op, fields });
  }
  return [...byId.values()].slice(0, MAX_WRITES);
}

export class TrafficStore {
  private rows = new Map<string, TrafficEntry[]>();
  private totals = new Map<string, PeerTotals>();
  private seq = 0;
  private version = 0;
  private listeners = new Set<() => void>();
  private frame = 0;

  log(input: TrafficInput): void {
    const now = Date.now();
    const rows = this.rows.get(input.peer) ?? [];
    this.rows.set(input.peer, rows);

    const totals = this.totals.get(input.peer) ?? emptyTotals();
    this.totals.set(input.peer, totals);
    totals[input.direction][input.channel].messages++;
    totals[input.direction][input.channel].bytes += input.bytes;

    // Bursts interleave (a drag sends doc updates and cursor moves in turn),
    // so look a few rows back for the row this message continues. A merged
    // row moves to the end: it is the latest activity.
    let at = -1;
    for (let i = rows.length - 1; i >= Math.max(0, rows.length - LOOK_BACK); i--) {
      const r = rows[i];
      if (now - r.last >= COALESCE_MS) break;
      if (
        r.direction === input.direction &&
        r.channel === input.channel &&
        r.kind === input.kind &&
        r.label === input.label &&
        r.counterpart === input.counterpart &&
        r.status === input.status
      ) {
        at = i;
        break;
      }
    }
    if (at >= 0) {
      const prev = rows[at];
      rows.splice(at, 1);
      rows.push({
        ...prev,
        last: now,
        count: prev.count + 1,
        bytes: prev.bytes + input.bytes,
        writes: mergeWrites(prev.writes, input.writes),
        fields: input.fields ?? prev.fields,
        applied: input.applied && prev.applied
          ? {
              added: union(prev.applied.added, input.applied.added)!,
              updated: union(prev.applied.updated, input.applied.updated)!,
              deleted: union(prev.applied.deleted, input.applied.deleted)!,
              refused: union(prev.applied.refused, input.applied.refused)!,
              waiting: union(prev.applied.waiting, input.applied.waiting)!,
            }
          : input.applied ?? prev.applied,
      });
    } else {
      rows.push({ ...input, seq: ++this.seq, at: now, last: now, count: 1 });
      if (rows.length > MAX_ROWS) rows.splice(0, rows.length - MAX_ROWS);
    }
    this.changed();
  }

  rowsFor(peer: string): readonly TrafficEntry[] {
    return this.rows.get(peer) ?? [];
  }

  totalsFor(peer: string): PeerTotals {
    return this.totals.get(peer) ?? emptyTotals();
  }

  /** Empties the rows. Totals keep counting. */
  clear(): void {
    this.rows.clear();
    this.changed();
  }

  subscribe = (cb: () => void): (() => void) => {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  };

  getVersion = (): number => this.version;

  // Views re-render at most once per animation frame, however busy the wire.
  private changed() {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.version++;
      for (const cb of this.listeners) cb();
    });
  }
}
