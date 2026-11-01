import type { Envelope, SimNetwork, TabLink } from "./network";

export const TAB_CHANNEL = "spatialboard-collab-example/v1";

const CHANNELS = new Set(["doc", "awareness", "leave"]);

/** Anything arriving over the channel is checked before it is trusted. */
function isEnvelope(x: unknown): x is Envelope {
  if (!x || typeof x !== "object") return false;
  const e = x as Record<string, unknown>;
  if (e.v !== 1 || typeof e.from !== "string" || !CHANNELS.has(e.channel as string)) return false;
  if (e.to !== undefined && typeof e.to !== "string") return false;
  if (e.channel !== "leave" && !(e.bytes instanceof Uint8Array)) return false;
  if (e.note !== undefined) {
    const n = e.note as Record<string, unknown> | null;
    if (!n || typeof n.label !== "string") return false;
    if (n.writes !== undefined && !Array.isArray(n.writes)) return false;
    if (n.fields !== undefined && !Array.isArray(n.fields)) return false;
  }
  return true;
}

/**
 * Extends the in-page bus to other tabs of this example in the same browser.
 * Every envelope an in-page peer sends is also posted to the channel, and
 * envelopes from the channel reach this page's online peers after the same
 * delay as local traffic.
 */
export class TabBridge implements TabLink {
  private channel: BroadcastChannel | null = null;

  constructor(
    private readonly network: SimNetwork,
    private readonly onMalformed: (raw: unknown) => void,
  ) {}

  get enabled(): boolean {
    return this.channel !== null;
  }

  enable(): void {
    if (this.channel || typeof BroadcastChannel === "undefined") return;
    this.channel = new BroadcastChannel(TAB_CHANNEL);
    this.channel.onmessage = (e: MessageEvent) => {
      if (isEnvelope(e.data)) this.network.receiveFromTab(e.data);
      else this.onMalformed(e.data);
    };
  }

  disable(): void {
    this.channel?.close();
    this.channel = null;
    this.network.dropTabTraffic();
  }

  post(env: Envelope): void {
    this.channel?.postMessage(env);
  }
}
