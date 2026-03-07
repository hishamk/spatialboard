import { memo } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface StartData {
  /** Incremented by the parent Loop on each iteration */
  fireCount: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "Trigger", direction: "output", dataType: "signal" },
];

// ── Renderer ────────────────────────────────────────────────

const StartRenderer = memo(function StartRenderer(
  props: NodeRendererProps<StartData>,
) {
  const { data } = props;
  const cd = data as StartData;
  const active = cd.fireCount > 0;

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
      {/* Stadium/pill shape via SVG */}
      <svg
        viewBox="0 0 120 60"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="start-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={active ? "#1a2e1a" : "#1e1e38"} />
            <stop offset="100%" stopColor={active ? "#142814" : "#141428"} />
          </linearGradient>
        </defs>
        <rect
          x={2} y={2} width={116} height={56}
          rx={28} ry={28}
          fill="url(#start-bg)"
          stroke={cd.accentColor}
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {active && (
          <rect
            x={6} y={6} width={108} height={48}
            rx={24} ry={24}
            fill="none"
            stroke={cd.accentColor}
            strokeWidth={0.5}
            opacity={0.2}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "0 20%",
          boxSizing: "border-box",
        }}
      >
        {/* Play triangle */}
        <svg width={18} height={18} viewBox="0 0 16 16" style={{ flexShrink: 0 }}>
          <path
            d="M4 2l9 6-9 6z"
            fill={active ? cd.accentColor : "#444"}
            style={{
              filter: active ? `drop-shadow(0 0 4px ${cd.accentColor}88)` : undefined,
            }}
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: active ? "#ddd" : "#666",
          }}>
            Start
          </span>
          {active && (
            <span style={{ fontSize: 8, color: "#555" }}>
              {"\u00d7"}{cd.fireCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

// ── Node type definition ────────────────────────────────────

export const startNodeType: NodeTypeDefinition<StartData> = {
  type: "start",
  component: StartRenderer,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: StartData) => ({
    trigger: data.fireCount,
  }),
  getClipboardText: () => "Start",
};
