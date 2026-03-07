import { memo, useState, useEffect, useRef, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  SpatialNode,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface TimerData {
  /** "countdown" counts toward targetSeconds, "stopwatch" counts from 0 */
  mode: "countdown" | "stopwatch";
  /** Target seconds for countdown mode */
  targetSeconds: number;
  /** Elapsed seconds (persisted so the timer survives undo/redo) */
  elapsed: number;
  /** Whether the timer is currently running */
  running: boolean;
  /** Accent color for the progress ring */
  accentColor?: string;
}

// ── Helpers ─────────────────────────────────────────────────

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// ── SVG progress ring ───────────────────────────────────────

function ProgressRing({
  progress,
  size,
  stroke,
  color,
}: {
  progress: number;
  size: number;
  stroke: number;
  color: string;
}) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - clamp(progress, 0, 1));

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#2e2e3e"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.3s ease" }}
      />
    </svg>
  );
}

// ── Renderer ────────────────────────────────────────────────

const TimerRenderer = memo(function TimerRenderer(
  props: NodeRendererProps<TimerData>,
) {
  const { node, data, isSelected, engine } = props;
  const td = data as TimerData;
  const accent = td.accentColor || "#10b981";
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [localElapsed, setLocalElapsed] = useState(td.elapsed);

  // Sync local state when data changes externally (undo/redo)
  useEffect(() => {
    setLocalElapsed(td.elapsed);
  }, [td.elapsed]);

  // Tick while running
  useEffect(() => {
    if (!td.running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    intervalRef.current = setInterval(() => {
      setLocalElapsed((prev) => {
        const next = prev + 1;
        // Stop at target for countdown
        if (td.mode === "countdown" && next >= td.targetSeconds) {
          engine.updateNode(node.id, {
            data: { ...td, elapsed: td.targetSeconds, running: false },
          });
          return td.targetSeconds;
        }
        return next;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [td.running, td.mode, td.targetSeconds, node.id, engine, td]);

  const toggle = useCallback(() => {
    // If countdown finished, reset first
    if (td.mode === "countdown" && localElapsed >= td.targetSeconds) {
      engine.updateNode(node.id, {
        data: { ...td, elapsed: 0, running: true },
      });
      setLocalElapsed(0);
      return;
    }
    engine.updateNode(node.id, {
      data: { ...td, elapsed: localElapsed, running: !td.running },
    });
  }, [td, localElapsed, node.id, engine]);

  const reset = useCallback(() => {
    engine.updateNode(node.id, {
      data: { ...td, elapsed: 0, running: false },
    });
    setLocalElapsed(0);
  }, [td, node.id, engine]);

  const isCountdown = td.mode === "countdown";
  const displaySeconds = isCountdown
    ? Math.max(0, td.targetSeconds - localElapsed)
    : localElapsed;
  const progress = isCountdown
    ? localElapsed / Math.max(1, td.targetSeconds)
    : 0;
  const finished = isCountdown && localElapsed >= td.targetSeconds;

  const ringSize = 100;

  return (
    <div
      style={{
        width: node.w,
        height: node.h === "auto" ? undefined : node.h,
        background: "#1a1a2e",
        borderRadius: 12,
        border: `2px solid ${isSelected ? accent : "#2a2a3e"}`,
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#e0e0e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 12px 12px",
        gap: 10,
        boxShadow: isSelected
          ? `0 0 0 1px ${accent}40, 0 4px 12px rgba(0,0,0,0.3)`
          : "0 2px 8px rgba(0,0,0,0.2)",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      {/* Mode label */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          color: accent,
        }}
      >
        {isCountdown ? "Countdown" : "Stopwatch"}
      </div>

      {/* Ring + time */}
      <div style={{ position: "relative", width: ringSize, height: ringSize }}>
        {isCountdown && (
          <ProgressRing
            progress={progress}
            size={ringSize}
            stroke={6}
            color={finished ? "#ef4444" : accent}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            color: finished ? "#ef4444" : "#f0f0f0",
          }}
        >
          {formatTime(displaySeconds)}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={toggle}
          style={{
            padding: "6px 16px",
            background: td.running ? "#ef4444" : accent,
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          {finished ? "Restart" : td.running ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          style={{
            padding: "6px 12px",
            background: "#2e2e3e",
            color: "#888",
            border: "none",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
});

// ── Node type definition ────────────────────────────────────

export const timerNodeType: NodeTypeDefinition<TimerData> = {
  type: "timer",
  component: TimerRenderer,

  getClipboardText: (node: SpatialNode) => {
    const d = node.data as TimerData;
    const secs =
      d.mode === "countdown"
        ? Math.max(0, d.targetSeconds - d.elapsed)
        : d.elapsed;
    return `${d.mode === "countdown" ? "Countdown" : "Stopwatch"}: ${formatTime(secs)}`;
  },
};
