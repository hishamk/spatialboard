import { useRef, useEffect } from "react";

/**
 * WebGL page-curl fold transition — Video Toaster / Amiga style.
 * Two half-screen pages curl in (folding shut) or out (unfolding)
 * using a cylinder deformation with perspective, diffuse + specular lighting,
 * and a curl-cast shadow on the flat surface.
 */

interface FoldTransitionGLProps {
  phase: "out" | "in";
  progress: number;
}

const COLS = 50;
const ROWS = 30;

// ── Shaders ──────────────────────────────────────────────────────

const VERT_SRC = `
attribute vec2 aUV;
uniform float uLayPos;
uniform float uRadius;
uniform float uSide;

varying float vLight;
varying float vSpec;
varying float vShadow;
varying float vY;

void main() {
  float PI = 3.14159265;
  float d = aUV.x; // 0 = fold edge (center), 1 = far edge
  float y = aUV.y; // -1 to 1

  float x, z, theta;

  // Slight height-based radius modulation for organic curl
  float R = uRadius * (1.0 + 0.04 * sin(y * PI));

  if (d >= uLayPos) {
    // Flat — already laid on screen
    x = d;
    z = 0.0;
    theta = 0.0;
  } else {
    float arc = uLayPos - d;
    theta = arc / R;
    if (theta < PI) {
      // On the curl cylinder
      x = uLayPos - R * sin(theta);
      z = R * (1.0 - cos(theta));
    } else {
      // Back side — past the full curl, extending away
      float back = (theta - PI) * R;
      x = uLayPos + back;
      z = 2.0 * R;
      theta = PI;
    }
  }

  // Mirror for left/right half
  x *= uSide;

  // Perspective
  float eye = 2.5;
  float s = eye / (eye + z);

  // Diffuse lighting (front-facing light)
  float diffuse = 0.2 + 0.8 * max(0.0, cos(theta));
  diffuse *= (1.0 - z * 0.25); // depth darkening

  // Specular highlight on curl crest (~40 degrees)
  float specTarget = 0.7;
  vSpec = pow(max(0.0, 1.0 - abs(theta - specTarget) * 2.5), 6.0) * 0.5;

  // Shadow on flat surface near curl
  if (d >= uLayPos) {
    float distToCurl = d - uLayPos;
    vShadow = 1.0 - 0.4 * exp(-distToCurl * 25.0);
  } else {
    vShadow = 1.0;
  }

  vLight = diffuse;
  vY = y * 0.5 + 0.5; // normalized 0..1

  gl_Position = vec4(x * s * 2.0, y * s, -z * 0.01, 1.0);
}
`;

const FRAG_SRC = `
precision mediump float;
varying float vLight;
varying float vSpec;
varying float vShadow;
varying float vY;
uniform vec3 uColor;

void main() {
  // Height gradient for subtle sheen (Video Toaster aesthetic)
  float gradient = 0.88 + 0.12 * vY;
  vec3 c = uColor * vLight * gradient * vShadow + vec3(vSpec);
  gl_FragColor = vec4(c, 1.0);
}
`;

// ── GL helpers ───────────────────────────────────────────────────

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function linkProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const v = compileShader(gl, gl.VERTEX_SHADER, vs);
  const f = compileShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const p = gl.createProgram()!;
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null;
  return p;
}

function buildGrid() {
  const verts: number[] = [];
  const idxs: number[] = [];
  for (let r = 0; r <= ROWS; r++) {
    for (let c = 0; c <= COLS; c++) {
      verts.push(c / COLS, (r / ROWS) * 2 - 1);
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const a = r * (COLS + 1) + c;
      idxs.push(a, a + COLS + 1, a + 1, a + 1, a + COLS + 1, a + COLS + 2);
    }
  }
  return { vertices: new Float32Array(verts), indices: new Uint16Array(idxs) };
}

// ── Component ────────────────────────────────────────────────────

export default function FoldTransitionGL({ phase, progress }: FoldTransitionGLProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<{
    gl: WebGLRenderingContext;
    locs: Record<string, WebGLUniformLocation>;
    count: number;
  } | null>(null);

  // Init WebGL once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: true });
    if (!gl) return;

    const prog = linkProgram(gl, VERT_SRC, FRAG_SRC);
    if (!prog) return;
    gl.useProgram(prog);

    const { vertices, indices } = buildGrid();

    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const ibo = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const aUV = gl.getAttribLocation(prog, "aUV");
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    const loc = (n: string) => gl.getUniformLocation(prog, n)!;
    ctxRef.current = {
      gl,
      locs: { uLayPos: loc("uLayPos"), uRadius: loc("uRadius"), uSide: loc("uSide"), uColor: loc("uColor") },
      count: indices.length,
    };

    return () => {
      gl.deleteProgram(prog);
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(ibo);
      ctxRef.current = null;
    };
  }, []);

  // Draw each frame
  useEffect(() => {
    const c = ctxRef.current;
    if (!c) return;
    const { gl, locs, count } = c;

    // Easing: cubic for snappy Video-Toaster feel
    const eased = phase === "out"
      ? 1 - Math.pow(1 - progress, 3)
      : Math.pow(progress, 3);

    // layPos: 1→0 when folding shut, 0→1 when unfolding
    const layPos = phase === "out" ? 1.0 - eased : eased;

    // Cylinder radius: wider at start, tighter as it closes
    const radius = 0.07 + 0.16 * layPos;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform1f(locs.uLayPos, layPos);
    gl.uniform1f(locs.uRadius, radius);

    // Right half — dark blue-grey page
    gl.uniform1f(locs.uSide, 1.0);
    gl.uniform3f(locs.uColor, 0.09, 0.09, 0.17);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);

    // Left half
    gl.uniform1f(locs.uSide, -1.0);
    gl.uniform3f(locs.uColor, 0.09, 0.09, 0.17);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  }, [phase, progress]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
