import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { SpatialBoard, LIGHT_SB_THEME, type ToolKey } from "spatialboard";
import type { Peer } from "../peer";
import { RemotePresenceLayer } from "./RemotePresenceLayer";
import { Switch } from "./Switch";

// The canvas already sits beside the tool rail; reserve the strip the
// bottom chrome covers so the first fit frames the board above it. Under the
// board's compact breakpoint the chrome stacks two rows high. With the full
// chrome, a right margin nudges the seed's left column (the things to drag)
// further from the inspector, which opens along the right edge.
const COMPACT_WIDTH = 640;
function fitOptions(boardWidth: number) {
  const compact = boardWidth > 0 && boardWidth < COMPACT_WIDTH;
  return {
    padding: 40,
    maxZoom: 1,
    insets: compact ? { bottom: 116 } : { bottom: 52, right: 72 },
  };
}

// Every tool except `frame` and `note`. Leaving `frame` out is how the board
// hides the present and slides controls, which a half-width pane has no room
// for; existing frames still render and move. `note` creates a rich-text
// block, which this example neither registers nor validates.
const TOOLS: ToolKey[] = [
  "select", "hand", "draw", "shape", "text", "sticky", "table", "edge", "erase", "laser",
  "lasso", "paper", "template", "library", "mermaid", "gif", "settings",
];

export function PeerPane({
  peer,
  tabId,
  onOnlineChange,
}: {
  peer: Peer;
  tabId: string;
  onOnlineChange: (online: boolean) => void;
}) {
  const { engine } = peer;
  useSyncExternalStore(peer.subscribe, peer.getVersion);
  const stats = peer.stats();
  const online = peer.online;

  // Frame the seeded board once the canvas has its real size. The engine
  // starts from a default container size until the board's ResizeObserver
  // reports, which lands after the first animation frame, so fit again on
  // the second frame.
  const boardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fit = () => engine.fitToContent(fitOptions(boardRef.current?.clientWidth ?? 0));
    let raf = 0;
    fit();
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(fit);
    });
    return () => cancelAnimationFrame(raf);
  }, [engine]);

  useEffect(() => {
    const el = boardRef.current;
    return el ? peer.attachPointer(el) : undefined;
  }, [peer]);

  return (
    <section
      className="pane"
      aria-label={peer.name}
      data-online={online}
      style={{ "--peer": peer.color } as CSSProperties}
    >
      <header className="pane-head">
        <span className="peer-name">
          <span className="peer-dot" aria-hidden="true" />
          {peer.name}
        </span>
        <Switch
          checked={online}
          onChange={onOnlineChange}
          label={online ? "Online" : "Offline"}
          title={online ? `Take ${peer.name} offline` : `Bring ${peer.name} back online`}
        />
        <span
          className="peer-stats"
          title="Records in the shared document · nodes on this board · records refused as invalid · edges waiting for an endpoint (shown when there are any) · this peer's undo and redo steps"
        >
          doc <b>{stats.doc}</b> · board <b>{stats.board}</b> · refused <b>{stats.refused}</b> ·{" "}
          {stats.waiting > 0 && (
            <>
              waiting <b>{stats.waiting}</b> ·{" "}
            </>
          )}
          undo{" "}
          <b>{stats.undo}</b>/redo <b>{stats.redo}</b>
        </span>
      </header>
      <div className="pane-board" ref={boardRef}>
        <SpatialBoard engine={engine} theme={LIGHT_SB_THEME} chrome="floating" tools={TOOLS} />
        <RemotePresenceLayer engine={engine} remote={peer.remote} tabId={tabId} />
      </div>
    </section>
  );
}
