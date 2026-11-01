import type { NodeWrite } from "../collab/binding";
import type { PresenceField } from "../collab/presence";

/**
 * An in-page network between peers: a broadcast bus with a one-way delay.
 *
 * Every peer is an endpoint. A message goes to every other online endpoint,
 * or to one addressed endpoint. Nothing on the bus holds a document; any peer
 * can answer any other. An offline endpoint neither sends nor receives, and
 * nothing is queued for it: on reconnect the peers exchange state vectors
 * and the CRDT works out what each side is missing.
 */

export type Channel = "doc" | "awareness" | "leave";

export type Envelope = {
  v: 1;
  /** Endpoint id: `${tabId}:A`. */
  from: string;
  /** Omitted = broadcast. */
  to?: string;
  channel: Channel;
  /** A framed y-protocols message (absent for "leave"). */
  bytes?: Uint8Array;
  /** Display-only label for the traffic panel. A real transport would not
   *  carry it. */
  note?: TrafficNote;
};

export type TrafficNote = { label: string; writes?: NodeWrite[]; fields?: PresenceField[] };

export interface Endpoint {
  readonly id: string;
  readonly online: boolean;
  deliver(env: Envelope): void;
}

/** Where a message went: in-page endpoint ids, and whether other tabs got it. */
export type SendResult = { to: string[]; tabs: boolean };

export interface TabLink {
  readonly enabled: boolean;
  post(env: Envelope): void;
}

export function newTabId(): string {
  return Math.floor(Math.random() * 0x10000)
    .toString(16)
    .padStart(4, "0");
}

export class SimNetwork {
  latencyMs: number;
  readonly tabId: string;
  tabs: TabLink | null = null;
  private endpoints = new Map<string, Endpoint>();
  private timers = new Set<ReturnType<typeof setTimeout>>();
  /** Messages in flight per directed link (`from>to`), oldest first. */
  private links = new Map<string, Array<{ at: number; ep: Endpoint; env: Envelope; tabEpoch: number | null }>>();
  /** Bumped when tab sync is switched off: tab traffic already in flight
   *  from before then is dropped on arrival. */
  private tabEpoch = 0;

  constructor(tabId: string, latencyMs: number) {
    this.tabId = tabId;
    this.latencyMs = latencyMs;
  }

  register(ep: Endpoint): void {
    this.endpoints.set(ep.id, ep);
  }

  unregister(id: string): void {
    this.endpoints.delete(id);
  }

  /**
   * Send from an online endpoint. `scope: "tabs"` skips this page's other
   * endpoints (used when tab sync is switched off).
   */
  send(env: Envelope, scope: "all" | "tabs" = "all"): SendResult {
    const sender = this.endpoints.get(env.from);
    if (!sender?.online) return { to: [], tabs: false };
    const to: string[] = [];
    if (scope === "all") {
      for (const ep of this.endpoints.values()) {
        if (ep.id === env.from || !ep.online) continue;
        if (env.to !== undefined && env.to !== ep.id) continue;
        to.push(ep.id);
        this.schedule(ep, env, null);
      }
    }
    const toOtherTab = env.to === undefined || !this.endpoints.has(env.to);
    const tabs = !!this.tabs?.enabled && toOtherTab;
    if (tabs) this.tabs!.post(env);
    return { to, tabs };
  }

  /** A message from another tab: delivered here after the same delay. */
  receiveFromTab(env: Envelope): void {
    for (const ep of this.endpoints.values()) {
      if (!ep.online) continue;
      if (env.to !== undefined && env.to !== ep.id) continue;
      this.schedule(ep, env, this.tabEpoch);
    }
  }

  /** Tab sync switched off: nothing still in flight from other tabs lands. */
  dropTabTraffic(): void {
    this.tabEpoch++;
  }

  /** Cancel everything in flight (reset). */
  dispose(): void {
    for (const t of this.timers) clearTimeout(t);
    this.timers.clear();
    this.links.clear();
    this.endpoints.clear();
  }

  // Messages on one link arrive in the order they were sent, even when the
  // latency drops mid-stream: each link is a queue drained by one timer, so
  // a message never lands before the one sent ahead of it. Whether the
  // recipient is online (and, for another tab's message, whether tab sync is
  // still the same session) is checked on arrival.
  private schedule(ep: Endpoint, env: Envelope, tabEpoch: number | null) {
    const link = `${env.from}>${ep.id}`;
    const queue = this.links.get(link) ?? [];
    this.links.set(link, queue);
    const prev = queue[queue.length - 1];
    queue.push({ at: Math.max(Date.now() + this.latencyMs, prev?.at ?? 0), ep, env, tabEpoch });
    if (queue.length === 1) this.arm(link, queue);
  }

  private arm(link: string, queue: Array<{ at: number; ep: Endpoint; env: Envelope; tabEpoch: number | null }>) {
    const t = setTimeout(() => {
      this.timers.delete(t);
      // Everything that is due lands in this callback, in order; one timer
      // per message would hit the browser's minimum delay on bursts.
      while (queue.length && queue[0].at <= Date.now()) {
        const head = queue.shift()!;
        this.arrive(head.ep, head.env, head.tabEpoch);
      }
      if (queue.length) this.arm(link, queue);
      else this.links.delete(link);
    }, Math.max(0, queue[0].at - Date.now()));
    this.timers.add(t);
  }

  private arrive(ep: Endpoint, env: Envelope, tabEpoch: number | null) {
    if (tabEpoch !== null && tabEpoch !== this.tabEpoch) return;
    if (ep.online && this.endpoints.get(ep.id) === ep) ep.deliver(env);
  }
}

/** "A" for this tab's peers, "tab 3f2a · A" for another tab's. */
export function endpointLabel(endpointId: string, localTabId: string): string {
  const [tab, peer] = endpointId.split(":");
  return tab === localTabId ? peer : `tab ${tab} · ${peer}`;
}
