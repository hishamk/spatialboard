import { memo, useRef, useEffect, useCallback } from "react";
import type {
  NodeTypeDefinition,
  NodeRendererProps,
  NodePropertiesPanelProps,
  SpatialNode,
} from "spatialboard";

// ── Data shape ──────────────────────────────────────────────

export interface SpinningCubeData {
  /** Rotation speed multiplier (1 = normal) */
  speed: number;
  /** Edge color palette name */
  palette: "neon" | "pastel" | "mono" | "sunset";
  /** Stroke width for the wireframe */
  strokeWidth: number;
  /** Whether the cube is currently spinning */
  spinning: boolean;
}

// ── 3D math helpers ─────────────────────────────────────────

type Vec3 = [number, number, number];

const CUBE_VERTICES: Vec3[] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];

// 12 edges as pairs of vertex indices
const CUBE_EDGES: [number, number][] = [
  // back face
  [0, 1], [1, 2], [2, 3], [3, 0],
  // front face
  [4, 5], [5, 6], [6, 7], [7, 4],
  // connecting edges
  [0, 4], [1, 5], [2, 6], [3, 7],
];

// Which face each edge belongs to (for coloring): 0=back, 1=front, 2=left, 3=right, 4=top, 5=bottom
const EDGE_FACE: number[] = [
  0, 3, 4, 2,  // back face edges → back, right, top, left
  1, 3, 4, 2,  // front face edges → front, right, top, left
  2, 3, 4, 5,  // connecting edges → left, right, top, bottom
];

const PALETTES: Record<SpinningCubeData["palette"], string[]> = {
  neon: ["#ff00ff", "#00ffff", "#ffff00", "#ff6600", "#00ff66", "#6600ff"],
  pastel: ["#ffb3ba", "#baffc9", "#bae1ff", "#ffffba", "#e8baff", "#ffd9ba"],
  mono: ["#ffffff", "#cccccc", "#999999", "#e0e0e0", "#b0b0b0", "#d0d0d0"],
  sunset: ["#ff6b6b", "#ffa06b", "#ffd93d", "#ff8a5c", "#ff6348", "#ffc048"],
};

function rotateY(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [v[0] * cos + v[2] * sin, v[1], -v[0] * sin + v[2] * cos];
}

function rotateX(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [v[0], v[1] * cos - v[2] * sin, v[1] * sin + v[2] * cos];
}

function project(v: Vec3, cx: number, cy: number, scale: number, fov: number): [number, number] {
  const z = v[2] + fov;
  const factor = fov / z;
  return [cx + v[0] * scale * factor, cy + v[1] * scale * factor];
}

// ── Renderer ────────────────────────────────────────────────

const SpinningCubeRenderer = memo(function SpinningCubeRenderer(
  props: NodeRendererProps<SpinningCubeData>,
) {
  const { data } = props;
  const cd = data as SpinningCubeData;
  const palette = PALETTES[cd.palette] || PALETTES.neon;
  const rafRef = useRef<number>(0);
  const angleRef = useRef({ x: 0.4, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const draw = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines = svg.querySelectorAll("line");
    const ax = angleRef.current.x;
    const ay = angleRef.current.y;
    const fov = 4;
    const scale = 28;

    // Project all vertices
    const projected = CUBE_VERTICES.map((v) => {
      const r1 = rotateX(v, ax);
      const r2 = rotateY(r1, ay);
      return { p2d: project(r2, 50, 50, scale, fov), z: r2[2] };
    });

    // Update each line element
    CUBE_EDGES.forEach(([a, b], i) => {
      const line = lines[i];
      if (!line) return;
      const pa = projected[a];
      const pb = projected[b];
      line.setAttribute("x1", String(pa.p2d[0]));
      line.setAttribute("y1", String(pa.p2d[1]));
      line.setAttribute("x2", String(pb.p2d[0]));
      line.setAttribute("y2", String(pb.p2d[1]));
      // Depth-based opacity for the cartoon depth effect
      const avgZ = (pa.z + pb.z) / 2;
      const opacity = 0.4 + 0.6 * ((avgZ + 1.5) / 3);
      line.setAttribute("opacity", String(Math.max(0.2, Math.min(1, opacity))));
    });
  }, []);

  useEffect(() => {
    // Initial draw
    draw();

    if (!cd.spinning) return;

    let lastTime = performance.now();
    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      angleRef.current.y += dt * cd.speed * 1.5;
      angleRef.current.x += dt * cd.speed * 0.7;
      draw();
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cd.spinning, cd.speed, draw]);

  return (
    <svg ref={svgRef} viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
      {/* Glow filter for cartoon neon effect */}
      <defs>
        <filter id="cartoon-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Wireframe edges */}
      {CUBE_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={50} y1={50} x2={50} y2={50}
          stroke={palette[EDGE_FACE[i] % palette.length]}
          strokeWidth={cd.strokeWidth}
          strokeLinecap="round"
          filter="url(#cartoon-glow)"
        />
      ))}
    </svg>
  );
});

// ── Properties panel ────────────────────────────────────────

const PALETTE_OPTIONS: { key: SpinningCubeData["palette"]; label: string; preview: string }[] = [
  { key: "neon", label: "Neon", preview: "#ff00ff" },
  { key: "pastel", label: "Pastel", preview: "#ffb3ba" },
  { key: "mono", label: "Mono", preview: "#cccccc" },
  { key: "sunset", label: "Sunset", preview: "#ff6b6b" },
];

const panelRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const panelLabel: React.CSSProperties = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0,
};

function CubePropertiesPanel({ data, updateData }: NodePropertiesPanelProps<SpinningCubeData>) {
  const cd = data as SpinningCubeData;

  return (
    <>
      {/* Spinning toggle */}
      <div style={panelRow}>
        <span style={panelLabel}>Spinning</span>
        <button
          onClick={() => updateData({ spinning: !cd.spinning })}
          style={{
            padding: "4px 12px",
            background: cd.spinning ? "#22c55e" : "#444",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          {cd.spinning ? "On" : "Off"}
        </button>
      </div>

      {/* Speed */}
      <div style={panelRow}>
        <span style={panelLabel}>Speed</span>
        <input
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          value={cd.speed}
          onChange={(e) => updateData({ speed: Number(e.target.value) })}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: 10, color: "#888", width: 28, textAlign: "right" }}>
          {cd.speed.toFixed(1)}x
        </span>
      </div>

      {/* Stroke width */}
      <div style={panelRow}>
        <span style={panelLabel}>Thickness</span>
        {[1.5, 2.5, 4].map((w) => (
          <button
            key={w}
            onClick={() => updateData({ strokeWidth: w })}
            style={{
              width: 28,
              height: 24,
              background: cd.strokeWidth === w ? "#3b82f6" : "#2a2a3e",
              border: "1px solid #3a3a4e",
              borderRadius: 6,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{
              width: Math.min(18, w * 5),
              height: Math.min(6, w * 1.5),
              background: "#fff",
              borderRadius: 2,
            }} />
          </button>
        ))}
      </div>

      {/* Palette */}
      <div style={panelRow}>
        <span style={panelLabel}>Palette</span>
        {PALETTE_OPTIONS.map((p) => (
          <button
            key={p.key}
            onClick={() => updateData({ palette: p.key })}
            style={{
              width: 24,
              height: 24,
              background: p.preview,
              border: cd.palette === p.key
                ? "2px solid white"
                : "2px solid transparent",
              borderRadius: "50%",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
            title={p.label}
          />
        ))}
      </div>
    </>
  );
}

// ── Node type definition ────────────────────────────────────

export const spinningCubeNodeType: NodeTypeDefinition<SpinningCubeData> = {
  type: "spinning-cube",
  docs: {},
  component: SpinningCubeRenderer,
  propertiesPanel: CubePropertiesPanel,

  getClipboardText: () => "3D Spinning Cube",
};
