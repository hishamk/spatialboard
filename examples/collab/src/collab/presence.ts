import type { Awareness } from "y-protocols/awareness";
import type {
  EdgeCreationAwareness,
  EraserAwareness,
  RectDragAwareness,
  SpatialEngine,
} from "spatialboard";

export type DrawProgress = {
  points: Array<[number, number, number]>;
  color: string;
  width: number;
  strokeStyle?: string;
  opacity?: number;
  tool?: "pen" | "airbrush";
  /** The id the committed stroke will have. */
  seed?: string;
};

export type ShapeProgress = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  shapeType: string;
  stroke: string;
  strokeWidth: number;
  opacity?: number;
  roughness?: number;
  fill?: string;
  fillStyle?: string;
  strokeStyle?: string;
  edgeStyle?: string;
  /** The id the committed shape will have. */
  seed?: string;
};

export type Gesture =
  | { kind: "draw"; stroke: DrawProgress }
  | { kind: "shape"; preview: ShapeProgress }
  | { kind: "edge"; preview: EdgeCreationAwareness }
  | { kind: "rectDrag"; preview: RectDragAwareness }
  | { kind: "eraser"; preview: EraserAwareness }
  | { kind: "laser"; trail: Array<[number, number]> };

export type PresenceUser = { name: string; color: string; peer: string; tab: string };

/** One awareness state per client: a single gesture slot is enough. */
export type Presence = {
  user: PresenceUser;
  /** Canvas coordinates. */
  cursor: { x: number; y: number } | null;
  gesture: Gesture | null;
  selection: string[];
};

/** Local presence is sent at most this often (trailing edge). */
export const PRESENCE_THROTTLE_MS = 50;

export type PresenceBinding = {
  /** Track the pointer over the board's container. Returns a detach. */
  attach(container: HTMLElement): () => void;
  destroy(): void;
};

/**
 * Engine gesture events and the pointer, into this peer's awareness state.
 *
 * Each awareness message carries the whole local state, so a long live
 * stroke grows every message. Changes are coalesced and sent at most every
 * 50 ms; a gesture ending and a selection change go out at once.
 */
export function bindPresence(engine: SpatialEngine, awareness: Awareness, user: PresenceUser): PresenceBinding {
  let state: Presence = { user, cursor: null, gesture: null, selection: [] };
  let sent = "";
  let timer: ReturnType<typeof setTimeout> | null = null;

  const send = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    // An unchanged state is not worth a message (the board re-emits
    // `selection` with the same ids, for one).
    const json = JSON.stringify(state);
    if (json === sent) return;
    sent = json;
    awareness.setLocalState(state);
  };
  const update = (patch: Partial<Presence>, now = false) => {
    state = { ...state, ...patch };
    if (now) send();
    else if (!timer) timer = setTimeout(send, PRESENCE_THROTTLE_MS);
  };

  send();

  const listeners = {
    "draw:progress": (stroke: DrawProgress) => update({ gesture: { kind: "draw", stroke } }),
    "shape:progress": (preview: ShapeProgress) => update({ gesture: { kind: "shape", preview } }),
    "edge:progress": (preview: EdgeCreationAwareness) => update({ gesture: { kind: "edge", preview } }),
    "rectDrag:progress": (preview: RectDragAwareness) => update({ gesture: { kind: "rectDrag", preview } }),
    "eraser:progress": (preview: EraserAwareness) => update({ gesture: { kind: "eraser", preview } }),
    "laser:progress": (trail: Array<[number, number]>) => update({ gesture: { kind: "laser", trail } }),
    "draw:end": () => update({ gesture: null }, true),
    "shape:end": () => update({ gesture: null }, true),
    "edge:end": () => update({ gesture: null }, true),
    "rectDrag:end": () => update({ gesture: null }, true),
    "eraser:end": () => update({ gesture: null }, true),
    "laser:end": () => update({ gesture: null }, true),
    selection: () => update({ selection: [...engine.selection] }, true),
  };
  const offs = Object.entries(listeners).map(([event, fn]) => {
    engine.on(event as "change", fn as () => void);
    return () => engine.off(event as "change", fn as () => void);
  });

  return {
    attach(container) {
      const onMove = (e: PointerEvent) => update({ cursor: engine.screenToCanvas(e.clientX, e.clientY) });
      const onLeave = () => update({ cursor: null });
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerleave", onLeave);
      return () => {
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerleave", onLeave);
      };
    },
    destroy() {
      for (const off of offs) off();
      if (timer) clearTimeout(timer);
    },
  };
}

/** One thing that changed in a presence state, e.g. gesture:draw (25 pts). */
export type PresenceField = { field: string; detail?: string };

/** What changed between two presence states. */
export function describePresenceChange(
  prev: Partial<Presence> | null | undefined,
  next: Partial<Presence> | null | undefined,
): PresenceField[] {
  if (!next) return [{ field: "left" }];
  if (!prev) return [{ field: "joined" }];
  const fields: PresenceField[] = [];
  if (JSON.stringify(prev.cursor) !== JSON.stringify(next.cursor)) {
    fields.push({ field: next.cursor ? "cursor" : "cursor gone" });
  }
  if (JSON.stringify(prev.gesture) !== JSON.stringify(next.gesture)) {
    fields.push(describeGesture(next.gesture ?? null, prev.gesture ?? null));
  }
  if (JSON.stringify(prev.selection) !== JSON.stringify(next.selection)) {
    const n = next.selection?.length ?? 0;
    fields.push(n ? { field: "selection", detail: String(n) } : { field: "selection cleared" });
  }
  return fields;
}

function describeGesture(g: Gesture | null, prev: Gesture | null): PresenceField {
  if (!g) return { field: prev ? `gesture:${prev.kind} end` : "gesture end" };
  switch (g.kind) {
    case "draw":
      return { field: "gesture:draw", detail: `${g.stroke.points.length} pts` };
    case "laser":
      return { field: "gesture:laser", detail: `${g.trail.length} pts` };
    case "eraser":
      return { field: "gesture:eraser", detail: `${g.preview.markedIds.length} marked` };
    default:
      return { field: `gesture:${g.kind}` };
  }
}

/** How long a finished stroke or shape preview may wait for its node. */
export const LINGER_MS = 1000;

export type RemotePresence = {
  /** Other clients' states (never this peer's own). */
  states(): Array<[number, Presence]>;
  /** A client's stroke/shape preview that ended less than a second ago. */
  lingering(clientID: number): Gesture | null;
  subscribe(cb: () => void): () => void;
  getVersion(): number;
  destroy(): void;
};

/**
 * The other clients' presence, for rendering. When a client's stroke or
 * shape gesture ends, its last preview is kept for up to a second: the
 * committed node travels on the doc channel, and showing the preview until
 * that node exists avoids a gap (or a doubled, darker flash) when the two
 * messages cross.
 */
export function trackRemotePresence(awareness: Awareness): RemotePresence {
  let version = 0;
  const listeners = new Set<() => void>();
  const lastGesture = new Map<number, Gesture | null>();
  const lingering = new Map<number, { gesture: Gesture; until: number }>();
  const timers = new Set<ReturnType<typeof setTimeout>>();

  const bump = () => {
    version++;
    for (const cb of listeners) cb();
  };

  const onChange = () => {
    const now = Date.now();
    const states = awareness.getStates();
    for (const [id, prev] of lastGesture) {
      const next = (states.get(id) as Presence | undefined)?.gesture ?? null;
      if (prev && (prev.kind === "draw" || prev.kind === "shape") && next?.kind !== prev.kind) {
        lingering.set(id, { gesture: prev, until: now + LINGER_MS });
        const t = setTimeout(() => {
          timers.delete(t);
          const l = lingering.get(id);
          if (l && l.until <= Date.now()) {
            lingering.delete(id);
            bump();
          }
        }, LINGER_MS + 5);
        timers.add(t);
      } else if (next) {
        lingering.delete(id);
      }
    }
    lastGesture.clear();
    for (const [id, s] of states) {
      if (id !== awareness.clientID) lastGesture.set(id, (s as Presence).gesture ?? null);
    }
    bump();
  };
  awareness.on("change", onChange);

  return {
    states: () =>
      [...awareness.getStates()].filter(([id]) => id !== awareness.clientID) as Array<[number, Presence]>,
    lingering: (id) => lingering.get(id)?.gesture ?? null,
    subscribe(cb) {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    getVersion: () => version,
    destroy() {
      awareness.off("change", onChange);
      for (const t of timers) clearTimeout(t);
    },
  };
}
