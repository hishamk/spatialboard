import { useState, useSyncExternalStore, type CSSProperties } from "react";
import type { PeerDef } from "../peer";
import type { NodeWrite } from "../collab/binding";
import type { PresenceField } from "../collab/presence";
import type { PeerTotals, TrafficEntry, TrafficStore } from "../traffic/store";

const MAX_IDS = 8;

/** "s-a, e-1 +3" */
function formatIds(ids: readonly string[]): string {
  const shown = ids.slice(0, MAX_IDS).join(", ");
  return ids.length > MAX_IDS ? `${shown} +${ids.length - MAX_IDS}` : shown;
}

/** "s-a{x,y}, n1 (new), e-1 (deleted)" */
function formatWrites(writes: readonly NodeWrite[] | undefined): string {
  if (!writes?.length) return "";
  return formatIds(
    writes.map((w) =>
      w.op === "create" ? `${w.id} (new)` : w.op === "delete" ? `${w.id} (deleted)` : w.fields?.length ? `${w.id}{${w.fields.join(",")}}` : w.id,
    ),
  );
}

/** "cursor, gesture:draw (25 pts)" */
function formatFields(fields: readonly PresenceField[] | undefined): string {
  return (fields ?? []).map((f) => (f.detail ? `${f.field} (${f.detail})` : f.field)).join(", ");
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTime(ms: number): string {
  const d = new Date(ms);
  const p = (n: number, w = 2) => String(n).padStart(w, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
}

const KIND_LABEL: Record<TrafficEntry["kind"], string> = {
  update: "doc update",
  "sync-step-1": "sync step 1",
  "sync-step-2": "sync step 2",
  awareness: "awareness",
  heartbeat: "heartbeat",
  leave: "leave",
  malformed: "malformed",
};

function appliedText(e: TrafficEntry): string {
  const a = e.applied;
  if (!a) return "";
  const parts: string[] = [];
  if (a.added.length) parts.push(`added ${formatIds(a.added)}`);
  if (a.updated.length) parts.push(`updated ${formatIds(a.updated)}`);
  if (a.deleted.length) parts.push(`deleted ${formatIds(a.deleted)}`);
  if (a.refused.length) parts.push(`refused ${formatIds(a.refused)}`);
  if (a.waiting.length) parts.push(`waiting for an endpoint ${formatIds(a.waiting)}`);
  return parts.length ? `applied: ${parts.join(", ")}` : "nothing new";
}

function detail(e: TrafficEntry): string {
  if (e.channel === "presence") return formatFields(e.fields) || e.label;
  const parts: string[] = [];
  if (e.direction === "out") {
    parts.push(e.label);
    const writes = formatWrites(e.writes);
    if (writes) parts.push(writes);
  } else {
    if (e.kind === "sync-step-1") parts.push("state vector");
    else parts.push(appliedText(e));
    if (e.label && e.kind !== "sync-step-1") parts.push(`via ${e.label}`);
  }
  if (e.status !== "sent" && e.status !== "delivered") parts.push(e.status);
  return parts.filter(Boolean).join(" · ");
}

/**
 * Everything that crosses the wire, one column per peer. Document updates and
 * presence can be shown or hidden independently.
 */
export function TrafficPanel({
  peers,
  store,
  open,
  onOpenChange,
}: {
  peers: readonly PeerDef[];
  store: TrafficStore;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [showDoc, setShowDoc] = useState(true);
  const [showPresence, setShowPresence] = useState(true);
  // Paused: the view keeps the rows it had; recording and totals carry on.
  const [frozen, setFrozen] = useState<Map<string, TrafficEntry[]> | null>(null);
  useSyncExternalStore(store.subscribe, store.getVersion);

  const togglePause = () =>
    setFrozen((f) => (f ? null : new Map(peers.map((p) => [p.key, [...store.rowsFor(p.key)]]))));

  return (
    <section className="traffic" aria-label="Network traffic">
      <div className="traffic-head">
        <h2>Traffic</h2>
        {open && (
          <>
            <div className="filters" role="group" aria-label="Show messages">
              <button type="button" className="filter" aria-pressed={showDoc} onClick={() => setShowDoc((v) => !v)}>
                Document
              </button>
              <button
                type="button"
                className="filter"
                aria-pressed={showPresence}
                onClick={() => setShowPresence((v) => !v)}
              >
                Presence
              </button>
            </div>
            <div className="traffic-actions">
              <button type="button" className="text-btn" aria-pressed={!!frozen} onClick={togglePause}>
                {frozen ? "Resume" : "Pause"}
              </button>
              <button
                type="button"
                className="text-btn"
                onClick={() => {
                  store.clear();
                  setFrozen((f) => (f ? new Map() : null));
                }}
              >
                Clear
              </button>
            </div>
          </>
        )}
        <button
          type="button"
          className="text-btn traffic-toggle"
          aria-expanded={open}
          onClick={() => onOpenChange(!open)}
        >
          {open ? "Hide ▾" : "Show traffic ▴"}
        </button>
      </div>

      {open && (
        <div className="traffic-body">
          {peers.map((p) => {
            const rows = frozen?.get(p.key) ?? store.rowsFor(p.key);
            const visible = rows.filter((r) => (r.channel === "doc" ? showDoc : showPresence));
            return (
              <TrafficColumn
                key={p.key}
                peer={p}
                peers={peers}
                totals={store.totalsFor(p.key)}
                rows={visible}
                paused={!!frozen}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

function sum(t: PeerTotals["out"]) {
  return { messages: t.doc.messages + t.presence.messages, bytes: t.doc.bytes + t.presence.bytes };
}

function TrafficColumn({
  peer,
  peers,
  totals,
  rows,
  paused,
}: {
  peer: PeerDef;
  peers: readonly PeerDef[];
  totals: PeerTotals;
  rows: readonly TrafficEntry[];
  paused: boolean;
}) {
  const out = sum(totals.out);
  const inn = sum(totals.in);
  const colorOf = (counterpart: string) => peers.find((p) => p.key === counterpart)?.color;
  return (
    <div className="traffic-col" style={{ "--peer": peer.color } as CSSProperties}>
      <div className="traffic-col-head">
        <span className="peer-name">
          <span className="peer-dot" aria-hidden="true" />
          {peer.name}
        </span>
        {paused && <span className="traffic-paused">paused</span>}
        <span
          className="traffic-totals"
          title={`document out ${totals.out.doc.messages} · ${formatBytes(totals.out.doc.bytes)}, in ${totals.in.doc.messages} · ${formatBytes(totals.in.doc.bytes)}\npresence out ${totals.out.presence.messages} · ${formatBytes(totals.out.presence.bytes)}, in ${totals.in.presence.messages} · ${formatBytes(totals.in.presence.bytes)}`}
        >
          <span>
            out {out.messages} · {formatBytes(out.bytes)}
          </span>
          <span>
            in {inn.messages} · {formatBytes(inn.bytes)}
          </span>
        </span>
      </div>
      <div className="traffic-rows" role="log" aria-label={`${peer.name} messages`}>
        {rows.length === 0 ? (
          <div className="traffic-empty">
            <strong>Nothing has crossed yet.</strong>
            Edit either board. Every message {peer.name} sends or receives is listed here.
          </div>
        ) : (
          [...rows].reverse().map((r) => (
            <div
              key={r.seq}
              className="traffic-row"
              data-channel={r.channel}
              data-direction={r.direction}
              data-status={r.status}
            >
              <span>{formatTime(r.at)}</span>
              <span className="traffic-dir" title={r.direction === "out" ? "sent" : "received"}>
                {r.direction === "out" ? "→" : "←"}
              </span>
              <span style={{ color: colorOf(r.counterpart) }}>{r.counterpart}</span>
              <span>
                {KIND_LABEL[r.kind]}
                {r.count > 1 && <span className="traffic-count"> ×{r.count}</span>}
              </span>
              <span>{formatBytes(r.bytes)}</span>
              <span title={detail(r)}>{detail(r)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
