import * as Y from "yjs";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import * as syncProtocol from "y-protocols/sync";
import * as awarenessProtocol from "y-protocols/awareness";

/**
 * Wire framing, byte for byte the way y-websocket frames it: a varuint
 * message type, then the y-protocols payload. Byte sizes in the traffic panel
 * are the length of these framed messages.
 */
export const MESSAGE_SYNC = 0;
export const MESSAGE_AWARENESS = 1;

export type MessageKind = "sync-step-1" | "sync-step-2" | "update" | "awareness";

export function encodeSyncStep1(doc: Y.Doc): Uint8Array {
  const e = encoding.createEncoder();
  encoding.writeVarUint(e, MESSAGE_SYNC);
  syncProtocol.writeSyncStep1(e, doc);
  return encoding.toUint8Array(e);
}

export function encodeUpdate(update: Uint8Array): Uint8Array {
  const e = encoding.createEncoder();
  encoding.writeVarUint(e, MESSAGE_SYNC);
  syncProtocol.writeUpdate(e, update);
  return encoding.toUint8Array(e);
}

export function encodeAwareness(awareness: awarenessProtocol.Awareness, clients: number[]): Uint8Array {
  const e = encoding.createEncoder();
  encoding.writeVarUint(e, MESSAGE_AWARENESS);
  encoding.writeVarUint8Array(e, awarenessProtocol.encodeAwarenessUpdate(awareness, clients));
  return encoding.toUint8Array(e);
}

/** Read the message type without applying anything. Throws on garbage. */
export function peekKind(bytes: Uint8Array): MessageKind {
  const d = decoding.createDecoder(bytes);
  const type = decoding.readVarUint(d);
  if (type === MESSAGE_AWARENESS) return "awareness";
  if (type !== MESSAGE_SYNC) throw new Error(`unknown message type ${type}`);
  const sub = decoding.readVarUint(d);
  if (sub === syncProtocol.messageYjsSyncStep1) return "sync-step-1";
  if (sub === syncProtocol.messageYjsSyncStep2) return "sync-step-2";
  if (sub === syncProtocol.messageYjsUpdate) return "update";
  throw new Error(`unknown sync message ${sub}`);
}

/**
 * Apply a framed sync message to `doc` with `origin`. A step 1 (the sender's
 * state vector) produces the step 2 reply carrying everything the sender
 * lacks; step 2 and update messages apply and produce no reply.
 */
export function applySyncMessage(bytes: Uint8Array, doc: Y.Doc, origin: unknown): Uint8Array | null {
  const d = decoding.createDecoder(bytes);
  decoding.readVarUint(d); // MESSAGE_SYNC
  const reply = encoding.createEncoder();
  encoding.writeVarUint(reply, MESSAGE_SYNC);
  const type = syncProtocol.readSyncMessage(d, reply, doc, origin);
  return type === syncProtocol.messageYjsSyncStep1 ? encoding.toUint8Array(reply) : null;
}

export type AwarenessEntry = { clientID: number; clock: number; state: Record<string, unknown> | null };

/** Decode the client entries of a framed awareness message (for labelling). */
export function readAwarenessEntries(bytes: Uint8Array): AwarenessEntry[] {
  const d = decoding.createDecoder(bytes);
  decoding.readVarUint(d); // MESSAGE_AWARENESS
  const inner = decoding.createDecoder(decoding.readVarUint8Array(d));
  const n = decoding.readVarUint(inner);
  const out: AwarenessEntry[] = [];
  for (let i = 0; i < n; i++) {
    const clientID = decoding.readVarUint(inner);
    const clock = decoding.readVarUint(inner);
    out.push({ clientID, clock, state: JSON.parse(decoding.readVarString(inner)) });
  }
  return out;
}

/** Apply a framed awareness message to `awareness` with `origin`. */
export function applyAwarenessMessage(
  bytes: Uint8Array,
  awareness: awarenessProtocol.Awareness,
  origin: unknown,
): void {
  const d = decoding.createDecoder(bytes);
  decoding.readVarUint(d); // MESSAGE_AWARENESS
  awarenessProtocol.applyAwarenessUpdate(awareness, decoding.readVarUint8Array(d), origin);
}
