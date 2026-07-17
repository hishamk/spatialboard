import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
interface FloatingPropertiesProps {
    engine: SpatialEngine;
    registry?: NodeTypeRegistry;
    /** When false, a popped-out inspector hides (its host panel is backgrounded). */
    hostActive?: boolean;
}
export default function FloatingProperties({ engine, registry, hostActive }: FloatingPropertiesProps): import("react/jsx-runtime").JSX.Element | null;
export {};
