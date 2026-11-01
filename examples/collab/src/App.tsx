import { useEffect, useRef, useState } from "react";
import "spatialboard/style.css";
import { PEERS, createPeer, type Peer, type PeerKey } from "./peer";
import { DemoSwitcher } from "./DemoSwitcher";
import { SimNetwork, newTabId } from "./net/network";
import { TabBridge } from "./net/tabBridge";
import { TrafficStore } from "./traffic/store";
import { NetworkBar } from "./ui/NetworkBar";
import { PeerPane } from "./ui/PeerPane";
import { TrafficPanel } from "./ui/TrafficPanel";
import { TryThis } from "./ui/TryThis";
import { Wire } from "./ui/Wire";

/**
 * Collaboration: two peers on one page, each with its own board, Y.Doc and
 * awareness, joined by a simulated network. Nothing is saved; a reload
 * starts from the seed (and, with tab sync on, merges back what other open
 * tabs hold).
 */

const DEFAULT_LATENCY_MS = 150;
const WIDE_QUERY = "(min-width: 900px)";
/** One id per page load: tells this tab's peers from other tabs' peers. */
const TAB_ID = newTabId();

type Session = {
  generation: number;
  network: SimNetwork;
  bridge: TabBridge;
  traffic: TrafficStore;
  peers: Peer[];
};

function newSession(generation: number, latencyMs: number, tabSync: boolean): Session {
  const network = new SimNetwork(TAB_ID, latencyMs);
  const traffic = new TrafficStore();
  const peers = PEERS.map((def) => createPeer(def, network, traffic));
  const bridge = new TabBridge(network, () => {
    for (const p of peers) {
      traffic.log({
        peer: p.key, direction: "in", channel: "doc", kind: "malformed", counterpart: "another tab",
        bytes: 0, label: "not an envelope", status: "dropped (malformed)",
      });
    }
  });
  network.tabs = bridge;
  if (tabSync) bridge.enable();
  // One after the other: A announces to nobody, then B's announcement
  // starts the handshake with A.
  for (const p of peers) p.setOnline(true);
  return { generation, network, bridge, traffic, peers };
}

function disposeSession(s: Session) {
  for (const p of s.peers) p.leaveTabs();
  s.bridge.disable();
  s.network.dispose();
  for (const p of s.peers) p.destroy();
}

export default function App() {
  const [latencyMs, setLatencyMs] = useState(DEFAULT_LATENCY_MS);
  const [tabSync, setTabSync] = useState(false);
  const [session, setSession] = useState(() => newSession(0, DEFAULT_LATENCY_MS, false));
  const [online, setOnline] = useState<Record<PeerKey, boolean>>({ A: true, B: true });
  // Open by default where there is room for it; on narrow screens the
  // boards get the height first.
  const [trafficOpen, setTrafficOpen] = useState(() => window.matchMedia(WIDE_QUERY).matches);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  // Closing the tab with tab sync on: tell the other tabs right away rather
  // than leaving them to time the presence out.
  useEffect(() => {
    const onHide = () => {
      for (const p of sessionRef.current.peers) p.leaveTabs();
    };
    window.addEventListener("pagehide", onHide);
    return () => window.removeEventListener("pagehide", onHide);
  }, []);

  const changeLatency = (ms: number) => {
    setLatencyMs(ms);
    session.network.latencyMs = ms;
  };

  const changeTabSync = (on: boolean) => {
    setTabSync(on);
    if (on) {
      session.bridge.enable();
      for (const p of session.peers) p.announceToTabs();
    } else {
      for (const p of session.peers) p.leaveTabs();
      session.bridge.disable();
      for (const p of session.peers) p.forgetOtherTabs();
    }
  };

  const changeOnline = (peer: Peer, value: boolean) => {
    peer.setOnline(value);
    setOnline((o) => ({ ...o, [peer.key]: value }));
  };

  const reset = () => {
    disposeSession(session);
    setSession(newSession(session.generation + 1, latencyMs, tabSync));
    setOnline({ A: true, B: true });
  };

  const [a, b] = session.peers;

  return (
    <div className="app">
      <header className="topbar">
        <div className="title">
          <h1>Collaboration</h1>
          <p>two peers · Yjs · simulated network</p>
        </div>
        <NetworkBar
          latencyMs={latencyMs}
          onLatencyChange={changeLatency}
          tabSync={tabSync}
          onTabSyncChange={changeTabSync}
          onReset={reset}
          onInjectMalformedEdge={() => b.injectMalformedEdge()}
        />
        <div className="topbar-end">
          <TryThis />
          <DemoSwitcher current="collab" />
        </div>
      </header>

      <main className="peers">
        <PeerPane key={`A-${session.generation}`} peer={a} tabId={TAB_ID} onOnlineChange={(v) => changeOnline(a, v)} />
        <Wire latencyMs={latencyMs} connected={online.A && online.B} />
        <PeerPane key={`B-${session.generation}`} peer={b} tabId={TAB_ID} onOnlineChange={(v) => changeOnline(b, v)} />
      </main>

      <TrafficPanel
        key={session.generation}
        peers={PEERS}
        store={session.traffic}
        open={trafficOpen}
        onOpenChange={setTrafficOpen}
      />
    </div>
  );
}
