/**
 * The strip between the two panes. It stands for the network: it shows the
 * one-way latency, and the line breaks while either peer is offline.
 */
export function Wire({ latencyMs, connected }: { latencyMs: number; connected: boolean }) {
  return (
    <div
      className="wire"
      data-state={connected ? "live" : "broken"}
      role="img"
      aria-label={
        connected
          ? `Network: ${latencyMs} milliseconds each way`
          : "Network: a peer is offline, nothing crosses"
      }
    >
      <span className="wire-label" aria-hidden="true">
        <span className="wire-arrow wire-arrow-right">→</span>
        <span className="wire-arrow wire-arrow-down">↓</span>
        {connected ? (
          <>
            <strong>{latencyMs}</strong>
            <span>ms</span>
          </>
        ) : (
          <strong>offline</strong>
        )}
        <span className="wire-arrow wire-arrow-left">←</span>
        <span className="wire-arrow wire-arrow-up">↑</span>
      </span>
    </div>
  );
}
