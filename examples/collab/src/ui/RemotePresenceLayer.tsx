import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  RemoteEdgeCreationPreview,
  RemoteEraserPreview,
  RemoteRectDragPreview,
  RemoteSelectionPreview,
  prefersSafariWebKitViewportWorkaround,
  type SpatialEngine,
} from "spatialboard";
import type { Gesture, RemotePresence } from "../collab/presence";
import { LaserTrail, LiveShape, LiveStroke, RemoteCursor } from "./livePreviews";

function useEngineTick(engine: SpatialEngine, event: "viewport" | "change") {
  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    engine.on(event, bump);
    return () => engine.off(event, bump);
  }, [engine, event]);
}

/** Hide a stroke/shape preview once the node it previews is on this board. */
function committed(engine: SpatialEngine, g: Gesture): boolean {
  const seed = g.kind === "draw" ? g.stroke.seed : g.kind === "shape" ? g.preview.seed : undefined;
  return !!seed && !!engine.getNode(seed);
}

/**
 * Remote cursors and live previews over a board. `<SpatialBoard>` has no
 * overlay slot, so this is an absolutely positioned sibling that follows the
 * engine's viewport. Every Remote*Preview receives the receiving peer's
 * engine: it resolves nodes and measured heights locally.
 */
export function RemotePresenceLayer({
  engine,
  remote,
  tabId,
}: {
  engine: SpatialEngine;
  remote: RemotePresence;
  tabId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ left: 0, top: 0 });
  useEngineTick(engine, "viewport");
  useEngineTick(engine, "change");
  useSyncExternalStore(remote.subscribe, remote.getVersion);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setOrigin((o) => (o.left === r.left && o.top === r.top ? o : { left: r.left, top: r.top }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { x: vx, y: vy, zoom } = engine.viewport;
  const panX = vx + engine.containerOffset.x - origin.left;
  const panY = vy + engine.containerOffset.y - origin.top;

  const svg: ReactNode[] = [];
  const dom: ReactNode[] = [];
  const cursors: ReactNode[] = [];

  for (const [clientID, s] of remote.states()) {
    if (!s?.user) continue;
    const color = s.user.color;
    const label = s.user.tab === tabId ? s.user.peer : `${s.user.peer} · tab ${s.user.tab}`;
    const g = s.gesture ?? remote.lingering(clientID);
    const key = `c${clientID}`;

    if (s.selection?.length) {
      svg.push(<RemoteSelectionPreview key={`${key}-sel`} engine={engine} nodeIds={s.selection} color={color} zoom={zoom} />);
    }
    if (g && !committed(engine, g)) {
      if (g.kind === "draw") svg.push(<LiveStroke key={`${key}-g`} stroke={g.stroke} />);
      else if (g.kind === "shape") svg.push(<LiveShape key={`${key}-g`} preview={g.preview} />);
      else if (g.kind === "laser") svg.push(<LaserTrail key={`${key}-g`} trail={g.trail} color={color} zoom={zoom} />);
      else if (g.kind === "edge") svg.push(<RemoteEdgeCreationPreview key={`${key}-g`} preview={g.preview} engine={engine} zoom={zoom} />);
      else if (g.kind === "eraser") svg.push(<RemoteEraserPreview key={`${key}-g`} eraser={g.preview} engine={engine} zoom={zoom} />);
      // Rect-drag previews are DOM (sticky and note cards), so not in the SVG.
      else if (g.kind === "rectDrag") dom.push(<RemoteRectDragPreview key={`${key}-g`} preview={g.preview} zoom={zoom} />);
    }
    if (s.cursor) {
      cursors.push(
        <RemoteCursor key={`${key}-cur`} x={s.cursor.x * zoom + panX} y={s.cursor.y * zoom + panY} color={color} label={label} />,
      );
    }
  }

  const content = (
    <>
      <svg className="presence-svg">{svg}</svg>
      {dom}
    </>
  );

  // WebKit rasterizes a combined translate+scale layer softly; it gets the
  // split variant.
  const split = prefersSafariWebKitViewportWorkaround();
  return (
    <div ref={ref} className="presence-layer" aria-hidden="true">
      {split ? (
        <div className="presence-vp" style={{ transform: `translate(${panX}px, ${panY}px)` }}>
          <div className="presence-vp" data-sb-remote-vp-inner style={{ transform: `scale(${zoom})` }}>
            {content}
          </div>
        </div>
      ) : (
        <div
          className="presence-vp"
          data-sb-remote-vp-inner
          style={{ transform: `translate(${panX}px, ${panY}px) scale(${zoom})` }}
        >
          {content}
        </div>
      )}
      {cursors}
    </div>
  );
}
