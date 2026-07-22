import type { SpatialNode } from "./types";
/**
 * Optional field on **target** node `data`: when `true`, edges that end at this node may show
 * automatic wire badges (port names `a → b`, and `compute …` when the board uses
 * `dataFlowEdgeOverlay="ports+compute"`). Omitted or `false` hides all of that (default);
 * only a custom `edge.data.label` still shows.
 */
export type DataflowEdgeComputeOverlayFlag = {
    showEdgeComputeOverlay?: boolean;
};
/** Whether incoming edges may show automatic port / compute labels for this node (opt-in). */
export declare function nodeShowsEdgeComputeOverlay(node: SpatialNode): boolean;
/** Supported data types for ports. */
export type PortDataType = "number" | "string" | "boolean" | "object" | "any" | "signal";
/** Definition of a single port on a node type. */
export interface PortDefinition {
    /** Unique identifier within the node (e.g. "input_a", "result"). */
    id: string;
    /** Display label shown next to the port circle. */
    label?: string;
    /** Whether this port receives or sends data. */
    direction: "input" | "output";
    /** The data type this port carries. */
    dataType: PortDataType;
    /** Default value used when no edge is connected. */
    defaultValue?: PortValue;
    /**
     * Optional vertical placement along the port side as a fraction of node
     * height (0 = top, 1 = bottom). When omitted, ports of the same direction
     * are evenly spaced. Used by branching cards (intent / condition) so each
     * output hugs its labeled row.
     */
    sideT?: number;
}
/** A value that flows through a port. */
export type PortValue = number | string | boolean | Record<string, unknown> | null;
/** Composite key for port values: "nodeId:portId". */
export type PortKey = `${string}:${string}`;
/** Helper to create a port key. */
export declare function portKey(nodeId: string, portId: string): PortKey;
