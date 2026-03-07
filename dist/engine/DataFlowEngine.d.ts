import type { SpatialEngine } from "./SpatialEngine";
import type { NodeTypeRegistry } from "../nodes/registry";
import type { PortValue } from "./data-flow-types";
/**
 * Reactive data-flow execution engine.
 *
 * Companion to SpatialEngine — listens for node/edge changes and
 * propagates values through port-connected nodes via topological sort.
 *
 * Hybrid model: reactive ports propagate automatically; signal ports
 * trigger compute only on explicit signal.
 */
export declare class DataFlowEngine {
    private spatial;
    private registry;
    /** Current resolved port values. */
    private values;
    /** Node IDs that need recomputation. */
    private dirty;
    /** Whether a microtask flush is already scheduled. */
    private scheduled;
    /** Generation counter for canceling stale async results. */
    private generation;
    /** Change subscribers. */
    private listeners;
    /** Node IDs that are part of a cycle (updated after each topoSort). */
    private _cycleNodeIds;
    constructor(spatial: SpatialEngine, registry: NodeTypeRegistry);
    /** Node IDs that are part of a dependency cycle (read-only). */
    get cycleNodeIds(): ReadonlySet<string>;
    /** Subscribe to port value changes. Returns unsubscribe function. */
    onChange(cb: () => void): () => void;
    /** Get current value of a specific port. */
    getPortValue(nodeId: string, portId: string): PortValue;
    /** Get all input values for a node, resolved from connected edges. */
    getInputs(nodeId: string): Record<string, PortValue>;
    /** Get all output values for a node. */
    getOutputs(nodeId: string): Record<string, PortValue>;
    /** Get all port values (inputs + outputs) for a node. */
    getAllPortValues(nodeId: string): Record<string, PortValue>;
    /** Mark a node as dirty and schedule recomputation. */
    markDirty(nodeId: string): void;
    /** Wire up SpatialEngine event listeners. Returns cleanup function. */
    connect(): () => void;
    /** Dispose and clean up. */
    dispose(): void;
    /** Initialize all nodes with ports. */
    private initializeAll;
    /** Schedule a microtask flush if not already scheduled. */
    private scheduleFlush;
    /** Mark all downstream nodes (nodes that depend on outputs of nodeId) as dirty. */
    private markDownstream;
    /** Topological sort of dirty nodes + their downstream dependents. */
    private topoSort;
    /** Full graph recompute of dirty nodes. */
    private flush;
    /** Execute a single node's compute function. Returns true if outputs changed. */
    private executeNode;
    /** Apply computed outputs to the values map. Returns true if any value changed. */
    private applyOutputs;
    /** Notify all change listeners. */
    private notifyListeners;
}
