import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";
import { ShowEdgeComputeOverlayField } from "./show-edge-compute-overlay-field";

// ── Data shape ──────────────────────────────────────────────

export interface SequenceData {
  delay: number;
  lastTrigger: number;
  currentStep: number;  // -1 = idle, 0 = A, 1 = B, 2 = C
  aCount: number;
  bCount: number;
  cCount: number;
  accentColor: string;
  showEdgeComputeOverlay?: boolean;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "Go", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "a", label: "A", direction: "output", dataType: "signal" },
  { id: "b", label: "B", direction: "output", dataType: "signal" },
  { id: "c", label: "C", direction: "output", dataType: "signal" },
];

const STEPS = ["A", "B", "C"];

// ── Renderer ────────────────────────────────────────────────

const SequenceRenderer = memo(function SequenceRenderer(
  props: NodeRendererProps<SequenceData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as SequenceData;
  const triggerVal = (portValues?.trigger as number) ?? 0;

  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const delayRef = useRef(cd.delay);
  delayRef.current = cd.delay;
  const aCountRef = useRef(cd.aCount);
  aCountRef.current = cd.aCount;
  const bCountRef = useRef(cd.bCount);
  bCountRef.current = cd.bCount;
  const cCountRef = useRef(cd.cCount);
  cCountRef.current = cd.cCount;

  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    updateDataRef.current({ lastTrigger: triggerVal, currentStep: 0 });

    // Fire A immediately
    updateDataRef.current({ aCount: aCountRef.current + 1, currentStep: 0 });

    // Fire B after delay
    const timerB = setTimeout(() => {
      updateDataRef.current({ bCount: bCountRef.current + 1, currentStep: 1 });
    }, delayRef.current);

    // Fire C after 2x delay
    const timerC = setTimeout(() => {
      updateDataRef.current({ cCount: cCountRef.current + 1, currentStep: 2 });
    }, delayRef.current * 2);

    // Reset to idle
    const timerIdle = setTimeout(() => {
      updateDataRef.current({ currentStep: -1 });
    }, delayRef.current * 2 + 200);

    return () => {
      clearTimeout(timerB);
      clearTimeout(timerC);
      clearTimeout(timerIdle);
    };
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  const running = cd.currentStep >= 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#fff",
      }}
    >
      {/* Stepped shape */}
      <svg
        viewBox="0 0 120 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="seq-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1e38" />
            <stop offset="100%" stopColor="#141428" />
          </linearGradient>
        </defs>
        {/* Staircase outline */}
        <path
          d="M4,4 L40,4 L40,34 L80,34 L80,64 L116,64 L116,96 L4,96 Z"
          fill="url(#seq-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10% 12%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 7, color: "#555", letterSpacing: 1.5, textTransform: "uppercase" }}>
          Sequence
        </div>
        {/* Step indicators */}
        <div style={{
          display: "flex", gap: 6, margin: "6px 0 4px",
          alignItems: "center",
        }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 3 }}>
              {i > 0 && (
                <span style={{ fontSize: 8, color: "#333" }}>{"\u2192"}</span>
              )}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  background: cd.currentStep === i ? cd.accentColor : "#2a2a3e",
                  border: `1px solid ${cd.currentStep === i ? cd.accentColor : "#3a3a4e"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: cd.currentStep === i ? "#fff" : "#555",
                  transition: "all 0.1s ease",
                }}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          fontSize: 10, fontWeight: 700,
          color: running ? cd.accentColor : "#555",
          fontVariantNumeric: "tabular-nums",
        }}>
          {cd.delay}ms
        </div>
      </div>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function SequencePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<SequenceData>) {
  const cd = data as SequenceData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 48, fontSize: 10, color: "#999", flexShrink: 0 };

  const onDelayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v) && v >= 0) updateData({ delay: v });
    },
    [updateData],
  );

  return (
    <>
      <ShowEdgeComputeOverlayField data={data} updateData={updateData} />
      <div style={row}>
        <span style={label}>Delay</span>
        <input
          type="number"
          min={0}
          step={100}
          value={cd.delay}
          onChange={onDelayChange}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
        <span style={{ fontSize: 10, color: "#666" }}>ms</span>
      </div>
      <div style={{ ...row, flexWrap: "wrap" }}>
        <span style={label}>Presets</span>
        {[100, 250, 500, 1000, 2000].map((n) => (
          <button
            key={n}
            onClick={() => updateData({ delay: n })}
            style={{
              padding: "3px 6px",
              background: cd.delay === n ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 9, fontWeight: 600, cursor: "pointer",
            }}
          >
            {n >= 1000 ? `${n / 1000}s` : `${n}`}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const sequenceNodeType: NodeTypeDefinition<SequenceData> = {
  type: "sequence",
  docs: {},
  component: SequenceRenderer,
  propertiesPanel: SequencePropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: SequenceData) => ({
    a: data.aCount,
    b: data.bCount,
    c: data.cCount,
  }),
  getClipboardText: (node) => `Sequence ${(node.data as SequenceData).delay}ms`,
};
