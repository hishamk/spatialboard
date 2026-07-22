import { SpatialEngine } from "../engine/SpatialEngine";
import type { SBDSchema } from "../schema";
import type { NodeTypeRegistry } from "../nodes/registry";
import type { DataFlowEngine } from "../engine/DataFlowEngine";
import type { DataFlowEdgeOverlay } from "./SVGLayer";
export default function SpatialCanvas({ engine, schema, registry, dataFlow, dataFlowEdgeOverlay, showPortLabels, onPortConnectEmpty, portConnectHold, minimapVisible, singleFrameId, }: {
    engine: SpatialEngine;
    schema: SBDSchema;
    registry?: NodeTypeRegistry;
    dataFlow?: DataFlowEngine | null;
    /** Port edge captions; only applies when `dataFlow` is active. Default `off`. */
    dataFlowEdgeOverlay?: DataFlowEdgeOverlay;
    /** When false, hide In/Out pills beside port dots. Default true. */
    showPortLabels?: boolean;
    /** Port-drag released with no compatible target port under the cursor. */
    onPortConnectEmpty?: (event: {
        nodeId: string;
        portId: string;
        direction: "input" | "output";
        canvasX: number;
        canvasY: number;
        clientX: number;
        clientY: number;
    }) => void;
    /** Keep edge preview + skeleton ghost while host add-node menu is open. */
    portConnectHold?: boolean;
    /** When false, the canvas minimap overlay is hidden. Default true. */
    minimapVisible?: boolean;
    /** When set, only render this frame and its children. */
    singleFrameId?: string;
}): import("react/jsx-runtime").JSX.Element;
