import { SpatialEngine } from "../engine/SpatialEngine";
import type { SBDSchema } from "../schema";
import type { NodeTypeRegistry } from "../nodes/registry";
import type { DataFlowEngine } from "../engine/DataFlowEngine";
export default function SpatialCanvas({ engine, schema, registry, dataFlow, }: {
    engine: SpatialEngine;
    schema: SBDSchema;
    registry?: NodeTypeRegistry;
    dataFlow?: DataFlowEngine | null;
}): import("react/jsx-runtime").JSX.Element;
