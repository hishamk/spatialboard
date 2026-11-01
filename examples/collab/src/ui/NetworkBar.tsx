import { useEffect, useRef } from "react";
import { Switch } from "./Switch";

export const LATENCY_MIN_MS = 0;
export const LATENCY_MAX_MS = 2000;
export const LATENCY_STEP_MS = 50;

/** Network controls in the page header: latency, tab sync, reset, experiments. */
export function NetworkBar({
  latencyMs,
  onLatencyChange,
  tabSync,
  onTabSyncChange,
  onReset,
  onInjectMalformedEdge,
}: {
  latencyMs: number;
  onLatencyChange: (ms: number) => void;
  tabSync: boolean;
  onTabSyncChange: (on: boolean) => void;
  onReset: () => void;
  /** Omitted ⇒ the experiment is listed but disabled. */
  onInjectMalformedEdge?: () => void;
}) {
  return (
    <div className="netbar">
      <label className="latency">
        <span>Latency</span>
        <input
          type="range"
          min={LATENCY_MIN_MS}
          max={LATENCY_MAX_MS}
          step={LATENCY_STEP_MS}
          value={latencyMs}
          onChange={(e) => onLatencyChange(Number(e.currentTarget.value))}
          aria-valuetext={`${latencyMs} milliseconds each way`}
        />
        <output>{latencyMs} ms</output>
      </label>

      <Switch
        checked={tabSync}
        onChange={onTabSyncChange}
        label="Sync other tabs"
        title="Also send every message to this example open in other tabs of this browser"
      />

      <button
        type="button"
        className="quiet-btn"
        onClick={onReset}
        title="Start this tab over from the seed. With Sync other tabs on, other tabs merge their state back in."
      >
        Reset
      </button>

      <Experiments onInjectMalformedEdge={onInjectMalformedEdge} />
    </div>
  );
}

function Experiments({ onInjectMalformedEdge }: { onInjectMalformedEdge?: () => void }) {
  const ref = useRef<HTMLDetailsElement>(null);

  // A disclosure that closes on any click outside it, like a menu.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = ref.current;
      if (el?.open && !el.contains(e.target as Node)) el.open = false;
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <details ref={ref} className="menu experiments">
      <summary>Experiments</summary>
      <div className="menu-panel experiments-panel">
        <button
          type="button"
          className="quiet-btn"
          disabled={!onInjectMalformedEdge}
          onClick={() => {
            onInjectMalformedEdge?.();
            if (ref.current) ref.current.open = false;
          }}
        >
          Inject a malformed edge
        </button>
        <p>
          Writes an edge with no endpoints into Peer B's document, the way a faulty peer
          might. Both boards refuse to draw it, and neither deletes it from the document.
        </p>
      </div>
    </details>
  );
}
