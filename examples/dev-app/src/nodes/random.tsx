import { memo, useRef, useEffect, useCallback, useState } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  PortDefinition,
  PortValue,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface RandomData {
  min: number;
  max: number;
  decimals: number;
  value: number; // the generated random number (set by Roll)
  /** Last trigger value we responded to (to detect new triggers) */
  lastTrigger: number;
  accentColor: string;
}

// ── Ports ───────────────────────────────────────────────────

const ports: PortDefinition[] = [
  { id: "trigger", label: "Trigger", direction: "input", dataType: "signal", defaultValue: 0 },
  { id: "value", label: "Value", direction: "output", dataType: "number" },
];

// ── 3D Icosahedron geometry ────────────────────────────────

type Vec3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;

const ICOSA_VERTICES: Vec3[] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
].map(([x, y, z]) => {
  const len = Math.sqrt(x * x + y * y + z * z);
  return [x / len, y / len, z / len] as Vec3;
});

const ICOSA_FACES: [number, number, number][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

// Get unique edges from faces
const edgeSet = new Set<string>();
const ICOSA_EDGES: [number, number][] = [];
for (const [a, b, c] of ICOSA_FACES) {
  for (const [i, j] of [[a, b], [b, c], [c, a]] as [number, number][]) {
    const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      ICOSA_EDGES.push([i, j]);
    }
  }
}

function rotateY(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c];
}
function rotateX(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c];
}
function rotateZ(v: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]];
}
function project(v: Vec3, cx: number, cy: number, scale: number, fov: number): [number, number] {
  const z = v[2] + fov;
  const f = fov / z;
  return [cx + v[0] * scale * f, cy + v[1] * scale * f];
}

// ── Color helpers ───────────────────────────────────────────

const FACE_COLORS = [
  "#ff3366", "#ff6633", "#ffcc33", "#33ff66", "#33ccff",
  "#6633ff", "#ff33cc", "#33ffcc", "#ff9933", "#9933ff",
  "#33ff99", "#3366ff", "#ff3399", "#99ff33", "#cc33ff",
  "#33ffff", "#ff6666", "#66ff33", "#3399ff", "#ff33ff",
];

// ── Renderer ────────────────────────────────────────────────

const RandomRenderer = memo(function RandomRenderer(
  props: NodeRendererProps<RandomData>,
) {
  const { data, portValues, updateData } = props;
  const cd = data as RandomData;
  const value = (portValues?.value as number) ?? 0;
  const triggerVal = (portValues?.trigger as number) ?? 0;

  const svgRef = useRef<SVGSVGElement>(null);
  const angleRef = useRef({ x: 0.3, y: 0, z: 0 });
  const rafRef = useRef<number>(0);
  const spinSpeedRef = useRef(0);
  const pendingValueRef = useRef<number | null>(null);
  const updateDataRef = useRef(updateData);
  updateDataRef.current = updateData;
  const [isSpinning, setIsSpinning] = useState(false);

  // Keep data refs in sync for the roll helper
  const minRef = useRef(cd.min);
  minRef.current = cd.min;
  const maxRef = useRef(cd.max);
  maxRef.current = cd.max;
  const decimalsRef = useRef(cd.decimals);
  decimalsRef.current = cd.decimals;

  /** Kick off a roll: spin the d20 and queue a new random value. */
  const doRoll = useCallback(() => {
    spinSpeedRef.current = 12 + Math.random() * 8;
    setIsSpinning(true);
    const raw = minRef.current + Math.random() * (maxRef.current - minRef.current);
    const factor = Math.pow(10, decimalsRef.current);
    pendingValueRef.current = Math.round(raw * factor) / factor;
  }, []);

  const draw = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ax = angleRef.current.x;
    const ay = angleRef.current.y;
    const az = angleRef.current.z;
    const fov = 4;
    const scale = 30;

    // Project vertices
    const projected = ICOSA_VERTICES.map((v) => {
      const r1 = rotateX(v, ax);
      const r2 = rotateY(r1, ay);
      const r3 = rotateZ(r2, az);
      return { p2d: project(r3, 55, 50, scale, fov), z: r3[2] };
    });

    // Compute face depths and sort back-to-front
    const facesWithDepth = ICOSA_FACES.map((face, i) => {
      const avgZ = (projected[face[0]].z + projected[face[1]].z + projected[face[2]].z) / 3;
      return { face, i, avgZ };
    }).sort((a, b) => a.avgZ - b.avgZ);

    // Update face polygons
    const polygons = svg.querySelectorAll("polygon");
    facesWithDepth.forEach(({ face, i, avgZ }, drawIdx) => {
      const poly = polygons[drawIdx];
      if (!poly) return;
      const pts = face.map((vi) => `${projected[vi].p2d[0]},${projected[vi].p2d[1]}`).join(" ");
      poly.setAttribute("points", pts);
      const brightness = 0.3 + 0.7 * ((avgZ + 1.5) / 3);
      poly.setAttribute("fill", FACE_COLORS[i % FACE_COLORS.length]);
      poly.setAttribute("opacity", String(Math.max(0.15, Math.min(0.85, brightness))));
    });

    // Update edge lines
    const lines = svg.querySelectorAll("line");
    ICOSA_EDGES.forEach(([a, b], i) => {
      const line = lines[i];
      if (!line) return;
      const pa = projected[a];
      const pb = projected[b];
      line.setAttribute("x1", String(pa.p2d[0]));
      line.setAttribute("y1", String(pa.p2d[1]));
      line.setAttribute("x2", String(pb.p2d[0]));
      line.setAttribute("y2", String(pb.p2d[1]));
      const avgZ = (pa.z + pb.z) / 2;
      const opacity = 0.2 + 0.8 * ((avgZ + 1.5) / 3);
      line.setAttribute("opacity", String(Math.max(0.1, Math.min(1, opacity))));
    });
  }, []);

  // Idle slow rotation + spin animation
  useEffect(() => {
    let lastTime = performance.now();
    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (spinSpeedRef.current > 0.05) {
        // Decelerating spin
        angleRef.current.y += dt * spinSpeedRef.current;
        angleRef.current.x += dt * spinSpeedRef.current * 0.6;
        angleRef.current.z += dt * spinSpeedRef.current * 0.3;
        spinSpeedRef.current *= 0.97;
        if (spinSpeedRef.current < 0.05) {
          spinSpeedRef.current = 0;
          setIsSpinning(false);
          // Commit the pending value now that the animation is done
          if (pendingValueRef.current !== null) {
            updateDataRef.current({ value: pendingValueRef.current });
            pendingValueRef.current = null;
          }
        }
      } else {
        // Gentle idle rotation
        angleRef.current.y += dt * 0.3;
        angleRef.current.x += dt * 0.15;
      }
      draw();
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  // Auto-roll when trigger input changes
  useEffect(() => {
    if (triggerVal <= 0 || triggerVal === cd.lastTrigger) return;
    updateDataRef.current({ lastTrigger: triggerVal });
    doRoll();
  }, [triggerVal]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRoll = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    doRoll();
  }, [doRoll]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        borderRadius: 12,
        border: `2px solid ${cd.accentColor}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: "#fff",
        padding: "8px 8px 10px",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle glow overlay */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `radial-gradient(circle at 60% 40%, ${cd.accentColor}15 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ fontSize: 8, color: "#666", letterSpacing: 1.5, textTransform: "uppercase", zIndex: 1 }}>
        Random
      </div>

      {/* 3D Icosahedron */}
      <svg
        ref={svgRef}
        viewBox="0 0 110 100"
        style={{ width: "100%", flex: 1, minHeight: 0, zIndex: 1 }}
      >
        <defs>
          <filter id="die-glow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Face polygons (sorted back-to-front in draw()) */}
        {ICOSA_FACES.map((_, i) => (
          <polygon
            key={`f${i}`}
            points="55,50 55,50 55,50"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={0.3}
          />
        ))}
        {/* Edge wireframe */}
        {ICOSA_EDGES.map((_, i) => (
          <line
            key={`e${i}`}
            x1={55} y1={50} x2={55} y2={50}
            stroke="rgba(255,255,255,0.6)"
            strokeWidth={0.4}
            filter="url(#die-glow)"
          />
        ))}
      </svg>

      {/* Value display */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: cd.accentColor,
          textShadow: `0 0 12px ${cd.accentColor}88`,
          letterSpacing: -0.5,
          lineHeight: 1,
          zIndex: 1,
          fontVariantNumeric: "tabular-nums",
          transition: "transform 0.15s ease",
          transform: isSpinning ? "scale(0.9)" : "scale(1)",
        }}
      >
        {isSpinning ? "..." : value}
      </div>

      {/* Roll button */}
      <button
        onClick={handleRoll}
        style={{
          marginTop: 4,
          padding: "3px 14px",
          background: `linear-gradient(135deg, ${cd.accentColor}, ${cd.accentColor}cc)`,
          border: "none",
          borderRadius: 6,
          color: "#fff",
          fontSize: 10,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          boxShadow: `0 2px 8px ${cd.accentColor}44`,
          zIndex: 1,
          pointerEvents: "auto",
          transition: "transform 0.1s ease, box-shadow 0.1s ease",
        }}
        onMouseDown={(e) => {
          (e.currentTarget.style.transform = "scale(0.95)");
        }}
        onMouseUp={(e) => {
          (e.currentTarget.style.transform = "scale(1)");
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.style.transform = "scale(1)");
        }}
      >
        Roll
      </button>
    </div>
  );
});

// ── Properties panel ────────────────────────────────────────

function RandomPropertiesPanel({ data, updateData }: NodePropertiesPanelProps<RandomData>) {
  const cd = data as RandomData;
  const row: React.CSSProperties = { display: "flex", alignItems: "center", gap: 4 };
  const label: React.CSSProperties = { width: 56, fontSize: 10, color: "#999", flexShrink: 0 };

  return (
    <>
      <div style={row}>
        <span style={label}>Min</span>
        <input
          type="number"
          value={cd.min}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) updateData({ min: v });
          }}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
      <div style={row}>
        <span style={label}>Max</span>
        <input
          type="number"
          value={cd.max}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) updateData({ max: v });
          }}
          style={{
            flex: 1, background: "#2a2a3e", border: "1px solid #3a3a4e",
            borderRadius: 6, color: "#fff", padding: "4px 8px", fontSize: 12,
          }}
        />
      </div>
      <div style={row}>
        <span style={label}>Decimals</span>
        {[0, 1, 2, 3].map((d) => (
          <button
            key={d}
            onClick={() => updateData({ decimals: d })}
            style={{
              width: 28, height: 24,
              background: cd.decimals === d ? cd.accentColor : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6, color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer",
            }}
          >
            {d}
          </button>
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const randomNodeType: NodeTypeDefinition<RandomData> = {
  type: "random",
  component: RandomRenderer,
  propertiesPanel: RandomPropertiesPanel,
  ports,
  compute: (_inputs: Record<string, PortValue>, data: RandomData) => ({
    value: data.value,
  }),
  getClipboardText: (node) => String((node.data as RandomData).value),
};
