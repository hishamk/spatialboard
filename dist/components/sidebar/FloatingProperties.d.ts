import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
interface FloatingPropertiesProps {
    engine: SpatialEngine;
    registry?: NodeTypeRegistry;
}
export default function FloatingProperties({ engine, registry }: FloatingPropertiesProps): import("react/jsx-runtime").JSX.Element | null;
export {};
