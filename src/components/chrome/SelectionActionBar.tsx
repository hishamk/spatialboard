import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { ImageNode, SpatialNode } from "../../engine/types";
import { useSBTheme } from "../sidebar/ThemeContext";
import { useSBI18n } from "../contexts/LocalizationContext";
import { selectionInkPad } from "../canvas/selection-pad";
import { SEL_PAD } from "../canvas/node-item-context";
import { handleHitSizePx } from "../canvas/pointer-coarse";
import { downloadImageNode } from "../canvas/hooks/useContextMenu";

/**
 * Floating action pill above the selection (the Canva pattern): the ACTIONS a
 * selection affords — group/ungroup, duplicate, delete, and stack order —
 * live on the selection itself, so the console deck below stays pure
 * properties. Rendered by the console chrome; floating chrome keeps its
 * context menu + inspector actions.
 *
 * Positioning measures the selection CHROME envelope, not the raw node AABB:
 * the drawn frame sits at ink-pad + SEL_PAD outside the nodes, corner/edge
 * handles extend a hit-radius past the frame, and the rotation knob hangs a
 * further ROTATE_STEM above top-center — the pill must clear all of it (in
 * both the above and flipped-below placements) so it never occludes a
 * handle.
 */
/** Breathing room between the pill and the outermost chrome, screen px. */
const BAR_MARGIN = 10;
/** Rotation stem length above the frame top — mirrors `rotateGap = 25/zoom`
 *  in SVGLayer + SelectionChromeOverlay (screen-constant). */
const ROTATE_STEM = 25;

/** Rotation-aware node AABB in canvas units (mirror of useCanvasGeometry).
 *  Shared with GroupFanFab, which anchors to the same chrome envelope. */
export function nodeChromeAABB(n: SpatialNode, h: number) {
  if (!n.rotation) {
    return { minX: n.x, minY: n.y, maxX: n.x + n.w, maxY: n.y + h };
  }
  const cx = n.x + n.w / 2;
  const cy = n.y + h / 2;
  const rad = (n.rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [rx, ry] of [
    [n.w / 2, h / 2],
    [-n.w / 2, h / 2],
    [-n.w / 2, -h / 2],
    [n.w / 2, -h / 2],
  ] as const) {
    const wx = cx + rx * cos - ry * sin;
    const wy = cy + rx * sin + ry * cos;
    minX = Math.min(minX, wx);
    minY = Math.min(minY, wy);
    maxX = Math.max(maxX, wx);
    maxY = Math.max(maxY, wy);
  }
  return { minX, minY, maxX, maxY };
}

const icon = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function GroupIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24">
      <path d="M3 7V4h3M17 4h3v3M21 17v3h-3M7 20H4v-3" {...icon} />
      <rect x="7" y="7" width="6" height="6" rx="1" {...icon} />
      <rect x="11" y="11" width="6" height="6" rx="1" {...icon} />
    </svg>
  );
}

function UngroupIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24">
      <rect x="4" y="4" width="7" height="7" rx="1" {...icon} />
      <rect x="13" y="13" width="7" height="7" rx="1" {...icon} />
      <path d="M14 7h3M17 10V7M10 17H7M7 14v3" {...icon} />
    </svg>
  );
}

function ZIcon({ kind }: { kind: "fwd" | "back" | "front" | "backmost" }) {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24">
      {kind === "fwd" && <>
        <path d="M12 15V5M8.5 8.5 12 5l3.5 3.5" {...icon} />
        <path d="M5 19h14" {...icon} opacity={0.45} />
      </>}
      {kind === "back" && <>
        <path d="M12 9v10M8.5 15.5 12 19l3.5-3.5" {...icon} />
        <path d="M5 5h14" {...icon} opacity={0.45} />
      </>}
      {kind === "front" && <>
        <path d="M5 4h14" {...icon} />
        <path d="M12 20V8M8.5 11.5 12 8l3.5 3.5" {...icon} />
      </>}
      {kind === "backmost" && <>
        <path d="M5 20h14" {...icon} />
        <path d="M12 4v12M8.5 12.5 12 16l3.5-3.5" {...icon} />
      </>}
    </svg>
  );
}

function DuplicateIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24">
      <rect x="8" y="8" width="12" height="12" rx="2" {...icon} />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" {...icon} />
      <path d="M14 11v6M11 14h6" {...icon} />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24">
      <path d="M4 7h16M10 4h4M6.5 7l1 13h9l1-13" {...icon} />
      <path d="M10 11v5M14 11v5" {...icon} />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24">
      {/* Arrow into a tray — the tray sides keep it distinct from the
          Send-Backward stack arrow. */}
      <path d="M12 4v9M8.5 9.5 12 13l3.5-3.5" {...icon} />
      <path d="M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16" {...icon} />
    </svg>
  );
}

export default function SelectionActionBar({ engine }: { engine: SpatialEngine }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [, setTick] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  // Measured bar + container dims so the pill can clamp itself inside the
  // canvas (and flip below the selection when there's no headroom).
  const [dims, setDims] = useState({ barW: 0, contW: 0, contH: 0 });
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const parent = el.parentElement;
    const next = {
      barW: el.offsetWidth,
      contW: parent?.clientWidth ?? 0,
      contH: parent?.clientHeight ?? 0,
    };
    setDims((d) =>
      d.barW === next.barW && d.contW === next.contW && d.contH === next.contH ? d : next,
    );
  });

  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    const events = ["selection", "change", "viewport", "gesture:start", "gesture:end"] as const;
    for (const e of events) engine.on(e, bump);
    return () => {
      for (const e of events) engine.off(e, bump);
    };
  }, [engine]);

  const ids = Array.from(engine.selection);
  const nodes = ids.map((id) => engine.getNode(id)).filter((n): n is SpatialNode => !!n);
  if (nodes.length === 0 || engine.gestureActive) return null;

  // Chrome-envelope union in canvas space — the same padded frame the
  // selection chrome draws (rotation-aware AABB + per-node ink pad +
  // SEL_PAD). Edges have no frame; their raw AABB contributes as-is and
  // the screen-space clearance below covers their endpoint knobs.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  let hasFrame = false;
  for (const n of nodes) {
    const aabb = nodeChromeAABB(n, engine.resolveHeight(n));
    const pad = n.type === "edge" ? 0 : selectionInkPad(n) + SEL_PAD;
    if (n.type !== "edge") hasFrame = true;
    minX = Math.min(minX, aabb.minX - pad);
    minY = Math.min(minY, aabb.minY - pad);
    maxX = Math.max(maxX, aabb.maxX + pad);
    maxY = Math.max(maxY, aabb.maxY + pad);
  }
  const topCenter = engine.canvasToScreen((minX + maxX) / 2, minY);
  const bottomCenter = engine.canvasToScreen((minX + maxX) / 2, maxY);

  // Horizontal: clamp the centered pill fully inside the container.
  const half = dims.barW / 2;
  const clampedX = dims.contW
    ? Math.min(Math.max(topCenter.x, half + 8), dims.contW - half - 8)
    : topCenter.x;
  // Vertical: prefer above the selection; flip below when there is no
  // headroom, and never leave the container. Clearances are screen-px:
  // handle hit targets extend hitHalf past the frame on every side, and a
  // framed selection hangs the rotation knob ROTATE_STEM above top-center
  // (knob hit circle = another hitHalf around the stem end).
  const BAR_H = 38;
  const hitHalf = handleHitSizePx() / 2;
  const topClear = (hasFrame ? ROTATE_STEM + hitHalf : hitHalf) + BAR_MARGIN;
  const botClear = hitHalf + BAR_MARGIN;
  let barTop = topCenter.y - BAR_H - topClear;
  if (barTop < 8) barTop = bottomCenter.y + botClear;
  if (dims.contH) barTop = Math.min(barTop, dims.contH - BAR_H - 8);

  const inGroup = !!engine.selectionGroupId();
  const canGroup = nodes.length > 1 && !inGroup;
  // Single image selected → offer the same download the context menu has.
  const imageNode = nodes.length === 1 && nodes[0].type === "image" ? (nodes[0] as ImageNode) : null;

  const btn: React.CSSProperties = {
    border: "none",
    cursor: "pointer",
    background: "transparent",
    color: theme.text,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 34,
    minWidth: 34,
    padding: "0 8px",
    borderRadius: 999,
    fontSize: 13,
    fontFamily: "inherit",
  };

  return (
    <div
      ref={barRef}
      data-sb-selection-bar
      style={{
        position: "absolute",
        left: clampedX,
        top: Math.max(8, barTop),
        transform: "translateX(-50%)",
        // Hide the unclamped first paint (width unknown until measured).
        visibility: dims.barW ? "visible" : "hidden",
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "2px 6px",
        background: theme.panelBg,
        border: `1px solid ${theme.border}`,
        borderRadius: 999,
        boxShadow: theme.panelShadow,
        zIndex: 9000,
        whiteSpace: "nowrap",
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {(canGroup || inGroup) && (
        <button
          style={btn}
          title={inGroup ? labels.actionUngroupSelection : labels.actionGroupSelection}
          onClick={() => (inGroup ? engine.ungroupSelected() : engine.groupSelected())}
        >
          {inGroup ? <UngroupIcon /> : <GroupIcon />}
        </button>
      )}
      <button style={btn} title={labels.actionDuplicate} onClick={() => engine.duplicateSelected()}>
        <DuplicateIcon />
      </button>
      {imageNode && (
        <button
          style={btn}
          title={labels.actionDownloadImage}
          onClick={() => void downloadImageNode(imageNode)}
        >
          <DownloadIcon />
        </button>
      )}
      <button style={btn} title={labels.actionDelete} onClick={() => engine.deleteSelected()}>
        <TrashIcon />
      </button>
      <div style={{ width: 1, height: 20, background: theme.separator, margin: "0 4px" }} />
      <button style={btn} title={labels.actionBringForward} onClick={() => engine.bringForward(ids)}>
        <ZIcon kind="fwd" />
      </button>
      <button style={btn} title={labels.actionSendBackward} onClick={() => engine.sendBackward(ids)}>
        <ZIcon kind="back" />
      </button>
      <button style={btn} title={labels.actionBringToFront} onClick={() => engine.bringToFront(ids)}>
        <ZIcon kind="front" />
      </button>
      <button style={btn} title={labels.actionSendToBack} onClick={() => engine.sendToBack(ids)}>
        <ZIcon kind="backmost" />
      </button>
    </div>
  );
}
