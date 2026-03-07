import { useState, useEffect, useRef } from "react";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { FrameNode } from "../engine/types";
import FoldTransitionGL from "./FoldTransitionGL";

const bar: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: "10px 20px",
  background: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(8px)",
  pointerEvents: "auto",
};

const btn: React.CSSProperties = {
  border: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  padding: 0,
};

const sp = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function NavIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      {dir === "left" && <polyline points="15,18 9,12 15,6" {...sp} />}
      {dir === "right" && <polyline points="9,6 15,12 9,18" {...sp} />}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" {...sp} />
    </svg>
  );
}

// ── Cube CSS 3D: zoom-out → rotate → zoom-in ────────────────────

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x: number) { return x * x * x; }
function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/** Derive scale + rotateY from overall timeline t (0–1). */
function computeCubeParams(t: number, dir: 1 | -1) {
  const MIN_ZOOM = 0.55;

  // Zoom: [0, 0.20] → scale down ; [0.20, 0.80] → hold ; [0.80, 1.0] → scale up
  let zoom: number;
  if (t <= 0.20) {
    zoom = 1.0 + (MIN_ZOOM - 1.0) * easeOutCubic(t / 0.20);
  } else if (t >= 0.80) {
    zoom = MIN_ZOOM + (1.0 - MIN_ZOOM) * easeOutCubic((t - 0.80) / 0.20);
  } else {
    zoom = MIN_ZOOM;
  }

  // Rotation: [0.10, 0.50] → 0°→−90°·dir ; [0.50, 0.90] → +90°·dir→0°
  let angle: number;
  if (t <= 0.10) {
    angle = 0;
  } else if (t <= 0.50) {
    angle = -dir * 90 * easeInOutCubic((t - 0.10) / 0.40);
  } else if (t <= 0.90) {
    angle = dir * 90 * (1 - easeInOutCubic((t - 0.50) / 0.40));
  } else {
    angle = 0;
  }

  return { zoom, angle };
}

function applyCubeTransform(el: HTMLElement, parentEl: HTMLElement, zoom: number, angle: number) {
  el.style.transform = `perspective(1200px) scale(${zoom}) rotateY(${angle}deg)`;
  el.style.transformOrigin = "50% 50%";
  el.style.backfaceVisibility = "hidden";
  el.style.overflow = "visible";
  // Dark background on parent so the "inside" of the cube is visible during rotation
  parentEl.style.background = "#0a0a15";
}

function clearCubeTransform(el: HTMLElement, parentEl: HTMLElement) {
  el.style.transform = "";
  el.style.transformOrigin = "";
  el.style.backfaceVisibility = "";
  el.style.overflow = "";
  parentEl.style.background = "";
}

// ─────────────────────────────────────────────────────────────────

export default function PresentationOverlay({ engine }: { engine: SpatialEngine }) {
  const [active, setActive] = useState(engine.presentationMode);
  const [index, setIndex] = useState(engine.presentationIndex);
  const [total, setTotal] = useState(engine.presentationSlides.length);
  const [label, setLabel] = useState("");
  const [overlay, setOverlay] = useState(engine.transitionOverlay);
  const canvasElRef = useRef<HTMLElement | null>(null);
  const parentElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const canvasEl = document.querySelector("[data-sb-canvas]") as HTMLElement | null;
    canvasElRef.current = canvasEl;
    parentElRef.current = canvasEl?.parentElement ?? null;

    const sync = () => {
      setActive(engine.presentationMode);
      setIndex(engine.presentationIndex);
      setTotal(engine.presentationSlides.length);
      setOverlay(engine.transitionOverlay);
      if (engine.presentationMode && engine.presentationSlides.length > 0) {
        const frameId = engine.presentationSlides[engine.presentationIndex];
        const node = engine.getNode(frameId) as FrameNode | undefined;
        setLabel(node?.data?.label || "");
      } else {
        setLabel("");
      }

      // Apply CSS 3D cube transform directly to the canvas container
      const ov = engine.transitionOverlay;
      const el = canvasElRef.current;
      const parentEl = parentElRef.current;
      if (el && parentEl && ov && ov.type === "cube" && ov.t != null) {
        const dir = ov.direction ?? 1;
        const { zoom, angle } = computeCubeParams(ov.t, dir);
        applyCubeTransform(el, parentEl, zoom, angle);
      } else if (el && parentEl) {
        clearCubeTransform(el, parentEl);
      }
    };

    engine.on("presentation", sync);
    return () => {
      engine.off("presentation", sync);
      const el = canvasElRef.current;
      const parentEl = parentElRef.current;
      if (el && parentEl) clearCubeTransform(el, parentEl);
    };
  }, [engine]);

  if (!active || total === 0) return null;

  // Compute cube dimming from timeline t
  const cubeDim = overlay && overlay.type === "cube" && overlay.t != null
    ? (() => {
        const dir = overlay.direction ?? 1;
        const { angle } = computeCubeParams(overlay.t, dir);
        return (Math.abs(angle) / 90) * 0.4;
      })()
    : 0;

  return (
    <div
      data-sb-presentation
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10000,
        pointerEvents: "none",
      }}
    >
      {/* Transition overlay for fade/dissolve */}
      {overlay && overlay.type !== "fold" && overlay.type !== "cube" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "black",
            opacity: overlay.phase === "out" ? overlay.progress : 1 - overlay.progress,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      )}

      {/* Fold transition — WebGL page-curl effect */}
      {overlay && overlay.type === "fold" && (
        <FoldTransitionGL phase={overlay.phase} progress={overlay.progress} />
      )}

      {/* Cube transition — dimming overlay (actual 3D is CSS on canvas container) */}
      {cubeDim > 0.01 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "black",
            opacity: cubeDim,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      )}

      <div style={bar} onPointerDown={(e) => e.stopPropagation()}>
        <button
          style={{ ...btn, position: "absolute", right: 16 }}
          title="Exit presentation (Esc)"
          onClick={() => engine.exitPresentation()}
        >
          <CloseIcon />
        </button>

        <button
          style={{ ...btn, opacity: index <= 0 ? 0.3 : 1 }}
          title="Previous slide (←)"
          onClick={() => engine.presentationPrev()}
          disabled={index <= 0}
        >
          <NavIcon dir="left" />
        </button>

        <span
          style={{
            color: "white",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "inherit",
            minWidth: 80,
            textAlign: "center",
            userSelect: "none",
          }}
        >
          {index + 1} / {total}
          {label && (
            <span style={{ opacity: 0.6, marginLeft: 8 }}>
              — {label}
            </span>
          )}
        </span>

        <button
          style={{ ...btn, opacity: index >= total - 1 ? 0.3 : 1 }}
          title="Next slide (→)"
          onClick={() => engine.presentationNext()}
          disabled={index >= total - 1}
        >
          <NavIcon dir="right" />
        </button>
      </div>
    </div>
  );
}
