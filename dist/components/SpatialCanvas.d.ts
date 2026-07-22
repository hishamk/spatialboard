import { SpatialEngine } from "../engine/SpatialEngine";
import type { SpatialNode } from "../engine/types";
import type { SBDSchema } from "../schema";
import type { NodeTypeRegistry } from "../nodes/registry";
import type { DataFlowEngine } from "../engine/DataFlowEngine";
import type { DataFlowEdgeOverlay } from "./SVGLayer";
export default function SpatialCanvas({ engine, schema, registry, dataFlow, dataFlowEdgeOverlay, showPortLabels, onPortConnectEmpty, portConnectHold, minimapVisible, singleFrameId, hostVisibleNodeIds, overlayNodes, }: {
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
    /** Host render scope: when non-null, render ONLY these node ids (+ edges whose
     *  both endpoints are in the set). null = render everything (default). */
    hostVisibleNodeIds?: ReadonlySet<string> | null;
    /** Ephemeral overlay nodes (cards + edges) rendered but NOT in the engine —
     *  merged into the DOM/SVG render lists AFTER the scope filter, so they always
     *  show. Serialize/history never see them (they live only in this prop). */
    overlayNodes?: readonly SpatialNode[] | null;
}): import("react/jsx-runtime").JSX.Element;
