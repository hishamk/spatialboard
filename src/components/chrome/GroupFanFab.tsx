import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { SpatialNode } from "../../engine/types";
import { useSBTheme } from "../sidebar/ThemeContext";
import { useSBI18n } from "../contexts/LocalizationContext";
import { selectionInkPad } from "../canvas/selection-pad";
import { SEL_PAD } from "../canvas/node-item-context";
import { handleHitSizePx } from "../canvas/pointer-coarse";
import { nodeChromeAABB } from "./SelectionActionBar";

/**
 * Floating "fan out" button for grouped selections — a round FAB hanging off
 * the selection's bottom-right corner (deliberately apart from the action
 * pill: fanning is a spatial gesture, not a clipboard action).
 *
 * Clicking it temporarily explodes the group's members into a ring so one can
 * be picked out; the pick is raised above the rest of the GROUP and everything
 * tweens back home. Member positions move via history-free updateNode
 * (transient) — only the pick's z-raise lands in undo history.
 */
const FAB_SIZE = 38;
/** Diagonal gap between the selection chrome corner and the FAB center. */
const FAB_GAP = 14;

function FanOutIcon() {
  const icon = {
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  return (
    <svg width={17} height={17} viewBox="0 0 24 24">
      {/* Four arrows bursting outward from a small center square */}
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.75" {...icon} />
      <path d="M15 9l4.5-4.5M19.5 4.5h-3.6M19.5 4.5v3.6" {...icon} />
      <path d="M9 15l-4.5 4.5M4.5 19.5h3.6M4.5 19.5v-3.6" {...icon} />
      <path d="M15 15l4.5 4.5M19.5 19.5v-3.6M19.5 19.5h-3.6" {...icon} />
      <path d="M9 9L4.5 4.5M4.5 4.5v3.6M4.5 4.5h3.6" {...icon} />
    </svg>
  );
}

export default function GroupFanFab({ engine }: { engine: SpatialEngine }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [, setTick] = useState(0);
  const fabRef = useRef<HTMLButtonElement>(null);
  const [dims, setDims] = useState({ contW: 0, contH: 0 });

  useLayoutEffect(() => {
    const el = fabRef.current;
    if (!el) return;
    const parent = el.parentElement;
    const next = { contW: parent?.clientWidth ?? 0, contH: parent?.clientHeight ?? 0 };
    setDims((d) => (d.contW === next.contW && d.contH === next.contH ? d : next));
  });

  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    const events = ["selection", "change", "viewport", "gesture:start", "gesture:end"] as const;
    for (const e of events) engine.on(e, bump);
    return () => {
      for (const e of events) engine.off(e, bump);
    };
  }, [engine]);

  const fanRef = useRef<{ originals: Map<string, { x: number; y: number }>; raf: number } | null>(null);
  const [fanned, setFanned] = useState(false);

  const tweenPositions = (targets: Map<string, { x: number; y: number }>, done?: () => void) => {
    const fan = fanRef.current;
    if (!fan) return;
    cancelAnimationFrame(fan.raf);
    const starts = new Map<string, { x: number; y: number }>();
    for (const id of targets.keys()) {
      const n = engine.getNode(id);
      if (n) starts.set(id, { x: n.x, y: n.y });
    }
    const t0 = performance.now();
    const DUR = 180;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / DUR);
      const e = 1 - Math.pow(1 - k, 3);
      // ONE batched update per frame (single "change" emit) — per-node
      // updateNode would fan n subscriber sweeps + n collab ticks per frame.
      const updates: Array<{ id: string; patch: { x: number; y: number } }> = [];
      for (const [id, to] of targets) {
        const from = starts.get(id);
        if (from) updates.push({ id, patch: { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e } });
      }
      engine.updateMany(updates);
      if (k < 1) {
        if (fanRef.current) fanRef.current.raf = requestAnimationFrame(step);
      } else done?.();
    };
    fan.raf = requestAnimationFrame(step);
  };

  const fanOut = () => {
    const members = Array.from(engine.selection)
      .map((id) => engine.getNode(id))
      .filter((n): n is SpatialNode => !!n && n.type !== "edge");
    if (members.length < 2) return;
    const centers = members.map((n) => {
      const h = engine.resolveHeight(n);
      return { n, h, cx: n.x + n.w / 2, cy: n.y + h / 2 };
    });
    const gx = centers.reduce((s, c) => s + c.cx, 0) / centers.length;
    const gy = centers.reduce((s, c) => s + c.cy, 0) / centers.length;
    // Ring radius: past the widest member spread AND wide enough that the
    // members fit around the circumference without overlapping.
    const maxDist = Math.max(...centers.map((c) => Math.hypot(c.cx - gx, c.cy - gy)));
    const sumDiag = centers.reduce((s, c) => s + Math.hypot(c.n.w, c.h), 0);
    const R = Math.max(maxDist * 1.15, (sumDiag / (2 * Math.PI)) * 1.2, 120);
    // Preserve each member's rough angular order around the centroid (piles
    // tie-break by stacking order) so the fan reads as "spread", not shuffle.
    const order = [...centers].sort((a, b) => {
      const aa = Math.atan2(a.cy - gy, a.cx - gx);
      const bb = Math.atan2(b.cy - gy, b.cx - gx);
      return aa === bb ? a.n.z - b.n.z : aa - bb;
    });
    const base = order.length ? Math.atan2(order[0].cy - gy, order[0].cx - gx) : -Math.PI / 2;
    const targets = new Map<string, { x: number; y: number }>();
    order.forEach((c, i) => {
      const th = (Number.isFinite(base) ? base : -Math.PI / 2) + (i * 2 * Math.PI) / order.length;
      targets.set(c.n.id, { x: gx + R * Math.cos(th) - c.n.w / 2, y: gy + R * Math.sin(th) - c.h / 2 });
    });
    fanRef.current = { originals: new Map(members.map((n) => [n.id, { x: n.x, y: n.y }])), raf: 0 };
    setFanned(true);
    tweenPositions(targets);
  };

  const restoreFan = (pickId?: string) => {
    const fan = fanRef.current;
    if (!fan) {
      setFanned(false);
      return;
    }
    if (pickId) {
      // Raise the pick above every other GROUP member first, so it visibly
      // lands on top of the pile as the fan collapses. Single undo step.
      let maxZ = -Infinity;
      for (const id of fan.originals.keys()) {
        const n = engine.getNode(id);
        if (n) maxZ = Math.max(maxZ, n.z);
      }
      engine.updateNodeWithHistory(pickId, { z: maxZ + 1 });
    }
    tweenPositions(new Map(fan.originals), () => {
      fanRef.current = null;
      setFanned(false);
    });
  };

  // While fanned: the NEXT pointer-down picks (member) or dismisses (anything
  // else). Capture phase beats the canvas' own handlers, so members can't be
  // accidentally dragged mid-fan.
  useEffect(() => {
    if (!fanned) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.("[data-sb-fan-fab]")) return; // the FAB toggles itself
      if (!t?.closest?.("[data-sb-canvas]")) {
        restoreFan(); // outside the canvas: collapse, let the click through
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const pt = engine.screenToCanvas(e.clientX, e.clientY);
      const hit = engine.hitTest(pt.x, pt.y, engine.measuredHeights);
      if (hit && fanRef.current?.originals.has(hit.id)) restoreFan(hit.id);
      else restoreFan();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        restoreFan();
      }
    };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("keydown", onKey, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fanned]);

  // Selection changed under the fan (or unmount): snap members home instantly.
  useEffect(() => {
    const cancel = () => {
      const fan = fanRef.current;
      if (!fan) return;
      cancelAnimationFrame(fan.raf);
      engine.updateMany(Array.from(fan.originals, ([id, p]) => ({ id, patch: p })));
      fanRef.current = null;
      setFanned(false);
    };
    engine.on("selection", cancel);
    return () => {
      engine.off("selection", cancel);
      cancel();
    };
  }, [engine]);

  const ids = Array.from(engine.selection);
  const nodes = ids.map((id) => engine.getNode(id)).filter((n): n is SpatialNode => !!n);
  const members = nodes.filter((n) => n.type !== "edge");
  const inGroup = !!engine.selectionGroupId();
  if (!inGroup || members.length < 2 || engine.gestureActive) return null;

  // Selection chrome envelope (same frame the pill measures) — the FAB hangs
  // diagonally off its bottom-right corner, clear of the resize handles.
  let maxX = -Infinity, maxY = -Infinity;
  for (const n of nodes) {
    const aabb = nodeChromeAABB(n, engine.resolveHeight(n));
    const pad = n.type === "edge" ? 0 : selectionInkPad(n) + SEL_PAD;
    maxX = Math.max(maxX, aabb.maxX + pad);
    maxY = Math.max(maxY, aabb.maxY + pad);
  }
  const corner = engine.canvasToScreen(maxX, maxY);
  const hitHalf = handleHitSizePx() / 2;
  let left = corner.x + hitHalf + FAB_GAP;
  let top = corner.y + hitHalf + FAB_GAP;
  if (dims.contW) left = Math.min(Math.max(left, 8), dims.contW - FAB_SIZE - 8);
  if (dims.contH) top = Math.min(Math.max(top, 8), dims.contH - FAB_SIZE - 8);

  return (
    <button
      ref={fabRef}
      data-sb-fan-fab
      title={labels.actionFanOut}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={() => (fanned ? restoreFan() : fanOut())}
      style={{
        position: "absolute",
        left,
        top,
        width: FAB_SIZE,
        height: FAB_SIZE,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${theme.border}`,
        borderRadius: 999,
        background: fanned ? theme.controlBgActive : theme.panelBg,
        color: theme.text,
        boxShadow: theme.panelShadow,
        cursor: "pointer",
        zIndex: 9000,
        padding: 0,
      }}
    >
      <FanOutIcon />
    </button>
  );
}
