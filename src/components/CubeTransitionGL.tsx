import { useRef, useEffect } from "react";

/**
 * WebGL 3D cube-flip transition.
 * The screen rotates like a face of a cube — the outgoing slide rotates away
 * while the incoming slide rotates in from the adjacent face.
 * Includes perspective, diffuse lighting, specular edge highlights, and a
 * subtle reflection/shadow on the receding face.
 */

interface CubeTransitionGLProps {
  phase: "out" | "in";
  progress: number;
  /** Flip direction: 1 = rotate left (next), -1 = rotate right (prev). Default: 1 */
  direction?: 1 | -1;
}

// ── Shaders ──────────────────────────────────────────────────────

const VERT_SRC = `
attribute vec3 aPos;
attribute vec2 aUV;
uniform mat4 uMVP;
uniform float uFace; // 0 = front (outgoing), 1 = side (incoming)

varying vec2 vUV;
varying float vLight;
varying float vEdge;

void main() {
  vUV = aUV;

  vec4 pos = uMVP * vec4(aPos, 1.0);
  gl_Position = pos;

  // Compute normal in view space for lighting
  // Front face normal is (0, 0, 1), side face normal is (dir, 0, 0)
  // After rotation, we approximate lighting from the transformed normal
  vec3 normal = uFace < 0.5
    ? vec3(0.0, 0.0, 1.0)
    : vec3(1.0, 0.0, 0.0);

  // Simple directional light from front-right-top
  vec3 lightDir = normalize(vec3(0.3, 0.2, 1.0));

  // We need the rotated normal — approximate by transforming
  vec3 rotNormal = normalize((uMVP * vec4(normal, 0.0)).xyz);
  float diffuse = 0.3 + 0.7 * max(0.0, dot(rotNormal, lightDir));

  vLight = diffuse;

  // Edge highlight: brighter near the rotating edge (x close to pivot)
  float edgeDist = uFace < 0.5
    ? 1.0 - aUV.x  // front face: right edge is pivot
    : aUV.x;        // side face: left edge is pivot
  vEdge = pow(max(0.0, 1.0 - edgeDist * 4.0), 3.0) * 0.15;
}
`;

const FRAG_SRC = `
precision mediump float;
varying vec2 vUV;
varying float vLight;
varying float vEdge;
uniform vec3 uColor;
uniform float uAlpha;

void main() {
  // Subtle vertical gradient
  float grad = 0.92 + 0.08 * vUV.y;
  vec3 c = uColor * vLight * grad + vec3(vEdge);
  gl_FragColor = vec4(c, uAlpha);
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

// Build a unit quad: positions in 3D + UV
function buildQuad() {
  // 4 vertices: (x, y, z, u, v)
  // Quad spans x: -1..1, y: -1..1, z: 0
  const verts = new Float32Array([
    -1, -1, 0, 0, 0,
     1, -1, 0, 1, 0,
     1,  1, 0, 1, 1,
    -1,  1, 0, 0, 1,
  ]);
  const idxs = new Uint16Array([0, 1, 2, 0, 2, 3]);
  return { vertices: verts, indices: idxs };
}

// ── Matrix math (minimal, no dependency) ─────────────────────────

function mat4Identity(): Float32Array {
  const m = new Float32Array(16);
  m[0] = m[5] = m[10] = m[15] = 1;
  return m;
}

function mat4Perspective(fov: number, aspect: number, near: number, far: number): Float32Array {
  const m = new Float32Array(16);
  const f = 1 / Math.tan(fov / 2);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
  return m;
}

function mat4RotateY(angle: number): Float32Array {
  const m = mat4Identity();
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  m[0] = c;
  m[2] = s;
  m[8] = -s;
  m[10] = c;
  return m;
}

function mat4Translate(x: number, y: number, z: number): Float32Array {
  const m = mat4Identity();
  m[12] = x;
  m[13] = y;
  m[14] = z;
  return m;
}

function mat4Mul(a: Float32Array, b: Float32Array): Float32Array {
  const r = new Float32Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      r[j * 4 + i] =
        a[0 * 4 + i] * b[j * 4 + 0] +
        a[1 * 4 + i] * b[j * 4 + 1] +
        a[2 * 4 + i] * b[j * 4 + 2] +
        a[3 * 4 + i] * b[j * 4 + 3];
    }
  }
  return r;
}

// ── Component ────────────────────────────────────────────────────

export default function CubeTransitionGL({ phase, progress, direction = 1 }: CubeTransitionGLProps) {
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

    const { vertices, indices } = buildQuad();

    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const ibo = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const stride = 5 * 4; // 5 floats × 4 bytes
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, stride, 0);

    const aUV = gl.getAttribLocation(prog, "aUV");
    gl.enableVertexAttribArray(aUV);
    gl.vertexAttribPointer(aUV, 2, gl.FLOAT, false, stride, 3 * 4);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);

    const loc = (n: string) => gl.getUniformLocation(prog, n)!;
    ctxRef.current = {
      gl,
      locs: { uMVP: loc("uMVP"), uFace: loc("uFace"), uColor: loc("uColor"), uAlpha: loc("uAlpha") },
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

    // Easing: smooth cubic
    const eased = phase === "out"
      ? 1 - Math.pow(1 - progress, 3)
      : Math.pow(progress, 3);

    // Total rotation: 0 → 90° over the full transition
    // "out" phase: 0→90° (front face rotates away)
    // "in" phase: continues from where out left off (90°→0° for incoming)
    const PI_2 = Math.PI / 2;
    const angle = phase === "out"
      ? eased * PI_2 * direction
      : (1 - eased) * PI_2 * direction;

    const aspect = gl.canvas.width / gl.canvas.height;

    // Projection: perspective with moderate FOV
    const proj = mat4Perspective(Math.PI / 4, aspect, 0.1, 100);
    // Camera pulled back
    const view = mat4Translate(0, 0, -3.2);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // The cube rotates around its right edge (direction=1) or left edge (direction=-1)
    // Pivot at x = direction * 1.0 (the edge of the quad)
    const pivotX = direction;

    // --- Outgoing face (front) ---
    // Translate pivot to origin, rotate, translate back
    const frontModel = mat4Mul(
      mat4Translate(pivotX, 0, 0),
      mat4Mul(
        mat4RotateY(-angle),
        mat4Translate(-pivotX, 0, 0),
      ),
    );
    const frontMVP = mat4Mul(proj, mat4Mul(view, frontModel));

    gl.uniformMatrix4fv(locs.uMVP, false, frontMVP);
    gl.uniform1f(locs.uFace, 0);
    gl.uniform3f(locs.uColor, 0.08, 0.08, 0.15);
    gl.uniform1f(locs.uAlpha, 1.0);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);

    // --- Incoming face (side) ---
    // This face starts perpendicular (rotated 90° from front) and rotates into view
    const sideModel = mat4Mul(
      mat4Translate(pivotX, 0, 0),
      mat4Mul(
        mat4RotateY(-angle + PI_2 * direction),
        mat4Translate(-pivotX, 0, 0),
      ),
    );
    const sideMVP = mat4Mul(proj, mat4Mul(view, sideModel));

    gl.uniformMatrix4fv(locs.uMVP, false, sideMVP);
    gl.uniform1f(locs.uFace, 1);
    gl.uniform3f(locs.uColor, 0.10, 0.10, 0.18);
    gl.uniform1f(locs.uAlpha, 1.0);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
  }, [phase, progress, direction]);

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
