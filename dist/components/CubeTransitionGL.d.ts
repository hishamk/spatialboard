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
export default function CubeTransitionGL({ phase, progress, direction }: CubeTransitionGLProps): import("react/jsx-runtime").JSX.Element;
export {};
