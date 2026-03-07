import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
  SpatialNode,
  SpatialEngine,
} from "spatialboard";
import type { StartData } from "./start";

// ── Data shape ──────────────────────────────────────────────

export interface LoopData {
  /** Number of iterations */
  count: number;
  /** Delay between iterations in ms */
  delay: number;
  /** Current iteration index (0-based) */
  currentIndex: number;
  /** Whether the loop is currently running */
  running: boolean;
  /** Last trigger value we responded to (to detect new triggers) */
  lastTrigger: number;
  /** Increments on every iteration tick (monotonic counter for downstream triggers) */
  tick: number;
  /** Increments each time the loop completes */
  doneCount: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "Run", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "tick", label: "Tick", direction: "output", dataType: "signal" },
  { id: "index", label: "Index", direction: "output", dataType: "number" },
  { id: "count", label: "N", direction: "output", dataType: "number" },
  { id: "done", label: "Done", direction: "output", dataType: "signal" },
];

// ── Helpers ─────────────────────────────────────────────────

function resolveH(node: SpatialNode): number {
  return node.h === "auto" ? 100 : node.h;
}

/** Find all Start nodes whose center falls inside the given Loop node's bounds. */
function findStartNodesInside(engine: SpatialEngine, loopNode: SpatialNode): SpatialNode[] {
  const lx = loopNode.x;
  const ly = loopNode.y;
  const lw = loopNode.w;
  const lh = resolveH(loopNode);
  const result: SpatialNode[] = [];
  for (const node of engine.nodes.values()) {
    if (node.type !== "start" || node.id === loopNode.id) continue;
    const cx = node.x + node.w / 2;
    const cy = node.y + resolveH(node) / 2;
    if (cx >= lx && cx <= lx + lw && cy >= ly && cy <= ly + lh) {
      result.push(node);
    }
  }
  return result;
}

// ── Renderer ────────────────────────────────────────────────

const LoopRenderer = memo(function LoopRenderer(
  props: NodeRendererProps<LoopData>,
) {
  const { data, node, engine, portValues, updateData } = props;
  const cd = data as LoopData;
  const triggerVal = (portValues?.trigger as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const engineRef = useRef(engine);
  engineRef.current = engine;
  const nodeRef = useRef(node);
  nodeRef.current = node;
  const abortRef = useRef(false);
  const runningRef = useRef(false);

  // Keep refs in sync with latest data for the async loop
  const countRef = useRef(cd.count);
  countRef.current = cd.count;
  const delayRef = useRef(cd.delay);
  delayRef.current = cd.delay;
  const doneCountRef = useRef(cd.doneCount);
  doneCountRef.current = cd.doneCount;
  const tickRef = useRef(cd.tick);
  tickRef.current = cd.tick;

  /** Trigger all Start nodes inside this Loop's bounds. */
  const triggerStartNodes = useCallback(() => {
    const eng = engineRef.current;
    const loopNode = nodeRef.current;
    const starts = findStartNodesInside(eng, loopNode);
    for (const sn of starts) {
      const sd = sn.data as StartData;
      eng.updateNodeWithHistory(sn.id, {
        data: { ...sd, fireCount: sd.fireCount + 1 },
      });
    }
  }, []);

  // Detect trigger changes and start the loop
  useEffect(() => {
    // Only react when trigger value actually changes and is > 0
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    if (runningRef.current) {
      // Abort the current loop, a new one will start
      abortRef.current = true;
    }

    const startLoop = async () => {
      const gen = triggerVal;
      runningRef.current = true;
      abortRef.current = false;

      updateDataRef.current({
        lastTrigger: gen,
        running: true,
        currentIndex: 0,
      });

      const total = countRef.current;
      for (let i = 0; i < total; i++) {
        if (abortRef.current) return;

        // Update loop state
        updateDataRef.current({ currentIndex: i, tick: tickRef.current + 1 });

        // Trigger Start nodes inside this loop
        triggerStartNodes();

        if (i < total - 1) {
          await new Promise((r) => setTimeout(r, delayRef.current));
        }
      }

      if (!abortRef.current) {
        runningRef.current = false;
        updateDataRef.current({
          running: false,
          currentIndex: total - 1,
          doneCount: doneCountRef.current + 1,
        });
      }
    };

    startLoop();

    return () => {
      abortRef.current = true;
    };
  }, [triggerVal, triggerStartNodes]); // eslint-disable-line react-hooks/exhaustive-deps

  const progress = cd.count > 0 ? (cd.currentIndex + (cd.running ? 1 : 0)) / cd.count : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "rgba(10, 10, 20, 0.35)",
        borderRadius: 10,
        border: `2px dashed ${cd.running ? cd.accentColor : "#3a3a4e"}`,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#fff",
        boxSizing: "border-box",
        overflow: "hidden",
        transition: "border-color 0.3s ease",
        pointerEvents: "none",
      }}
    >
      {/* Header bar — frame-like */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 10px",
          background: cd.running
            ? `linear-gradient(90deg, ${cd.accentColor}30, transparent)`
            : "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
          pointerEvents: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Animated loop icon */}
          <svg width={14} height={14} viewBox="0 0 16 16" style={{
            animation: cd.running ? "spin 1s linear infinite" : undefined,
          }}>
            <path
              d="M8 1.5A6.5 6.5 0 0114.5 8h-2A4.5 4.5 0 008 3.5V1.5z"
              fill={cd.accentColor}
              opacity={0.8}
            />
            <path
              d="M8 14.5A6.5 6.5 0 011.5 8h2A4.5 4.5 0 008 12.5v2z"
              fill={cd.accentColor}
              opacity={0.4}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </svg>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#aaa" }}>
            Loop
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {cd.running && (
            <span style={{
              fontSize: 9,
              color: cd.accentColor,
              fontVariantNumeric: "tabular-nums",
            }}>
              {cd.currentIndex + 1}/{cd.count}
            </span>
          )}
          {!cd.running && cd.doneCount > 0 && (
            <span style={{ fontSize: 9, color: "#22c55e" }}>
              done {cd.doneCount}×
            </span>
          )}
          <span style={{ fontSize: 10, color: "#666", fontVariantNumeric: "tabular-nums" }}>
            ×{cd.count}
          </span>
        </div>
      </div>

      {/* Spacer — transparent so child nodes are visible through the frame */}
      <div style={{ flex: 1 }} />

      {/* Progress bar at bottom */}
      <div
        style={{
          height: 3,
          background: "rgba(255,255,255,0.05)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, progress * 100)}%`,
            background: cd.running
              ? cd.accentColor
              : cd.doneCount > 0
                ? "#22c55e"
                : "transparent",
            transition: cd.running ? "width 0.1s ease" : "width 0.3s ease",
            borderRadius: "0 2px 2px 0",
            boxShadow: cd.running ? `0 0 6px ${cd.accentColor}88` : undefined,
          }}
        />
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function LoopPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<LoopData>) {
  const cd = data as LoopData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  const onCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v > 0) updateData({ count: v });
    },
    [updateData],
  );

  const onDelayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 0) updateData({ delay: v });
    },
    [updateData],
  );

  return (
    <>
      <div style={row}>
        <span style={label}>Loops</span>
        <input
          type="number"
          min={1}
          value={cd.count}
          onChange={onCountChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
      <div style={row}>
        <span style={label}>Delay</span>
        <input
          type="number"
          min={0}
          step={50}
          value={cd.delay}
          onChange={onDelayChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
        <span style={{ fontSize: 10, color: "#666" }}>ms</span>
      </div>
      {/* Quick presets */}
      <div style={{ ...row, flexWrap: "wrap" }}>
        <span style={label}>Presets</span>
        {[3, 5, 10, 50, 100].map((n) => (
          <button
            key={n}
            onClick={() => updateData({ count: n })}
            style={{
              padding: "3px 8px",
              background: cd.count === n ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6,
              color: "#fff",
              fontSize: 10,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {n}×
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const loopNodeType: NodeTypeDefinition<LoopData> = {
  type: "loop",
  component: LoopRenderer,
  propertiesPanel: LoopPropertiesPanel,
  isContainer: true,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: LoopData) => ({
    tick: data.tick,
    index: data.currentIndex,
    count: data.count,
    done: data.doneCount,
  }),
  getClipboardText: (node) => `Loop ×${(node.data as LoopData).count}`,
};
