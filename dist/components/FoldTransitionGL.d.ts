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
export default function FoldTransitionGL({ phase, progress }: FoldTransitionGLProps): import("react/jsx-runtime").JSX.Element;
export {};
