import type { SpatialEngine } from "../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../nodes/registry";
export default function PropertiesPanel({ engine, registry, }: {
    engine: SpatialEngine;
    registry?: NodeTypeRegistry;
}): import("react/jsx-runtime").JSX.Element | null;
