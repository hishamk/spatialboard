import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { SpatialNode } from "../../engine/types";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import SVGLayer from "./SVGLayer";

/* ------------------------------------------------------------------ */
/*  LiveSVGLayerHost — renders SVGLayer from live engine state.        */
/*  The parent supplies MEMBERSHIP (which nodes render, frozen during  */
/*  gestures); the node objects are re-read from the engine per tick   */
/*  because updateNode/updateMany replace them immutably per frame.    */
/*  SVGLayer's memoized children (EdgeRenderer, shape blocks) then     */
/*  bail for everything the gesture didn't touch.                      */
/* ------------------------------------------------------------------ */

const LiveSVGLayerHost = function LiveSVGLayerHost({
  engine,
  baseNodes,
  ...rest
}: Omit<React.ComponentProps<typeof SVGLayer>, "nodes" | "alignGuides"> & {
  engine: SpatialEngine;
  baseNodes: SpatialNode[];
}) {
  const subscribe = useCallback(
    (cb: () => void) => {
      engine.on("change", cb);
      engine.on("guides", cb);
      return () => {
        engine.off("change", cb);
        engine.off("guides", cb);
      };
    },
    [engine],
  );
  const tick = useSyncExternalStore(subscribe, () => engine.overlayTick);
  const nodes = useMemo(
    () => baseNodes.map((n) => engine.getNode(n.id) ?? n),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tick drives live re-reads
    [engine, baseNodes, tick],
  );
  return (
    <SVGLayer
      nodes={nodes}
      alignGuides={engine.alignGuides}
      // Selection chrome hides while a MOVE drag is in flight — the frame
      // would just chase the nodes. Transform gestures (resize / rotate)
      // keep it: the chrome is the thing being dragged.
      hideSelectionChrome={engine.gestureKind === "move"}
      {...rest}
    />
  );
};

export default LiveSVGLayerHost;
