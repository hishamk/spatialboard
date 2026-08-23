import type { SpatialEngine } from "./SpatialEngine";
import type { SpatialNode, EdgeNode } from "./types";
import type { NodeTypeRegistry, NodeTypeDefinition } from "../nodes/registry";
import { resolveNodePorts } from "../nodes/registry";
import type { PortValue, PortDefinition } from "./data-flow-types";
import { portKey } from "./data-flow-types";
import type { PortKey } from "./data-flow-types";

/**
 * Reactive data-flow execution engine.
 *
 * Companion to SpatialEngine — listens for node/edge changes and
 * propagates values through port-connected nodes via topological sort.
 *
 * Hybrid model: reactive ports propagate automatically; signal ports
 * trigger compute only on explicit signal.
 */
export class DataFlowEngine {
  private spatial: SpatialEngine;
  private registry: NodeTypeRegistry;

  /** Current resolved port values. */
  private values = new Map<PortKey, PortValue>();

  /** Node IDs that need recomputation. */
  private dirty = new Set<string>();

  /** Whether a microtask flush is already scheduled. */
  private scheduled = false;

  /** Per-node generation counters for canceling stale async results. A single
   *  global counter would discard an earlier async node's outputs whenever a
   *  later node also computed async in the same flush — the guard must be
   *  scoped to the node it protects. */
  private generations = new Map<string, number>();

  /** Change subscribers. */
  private listeners = new Set<() => void>();

  /** Node IDs that are part of a cycle (updated after each topoSort). */
  private _cycleNodeIds = new Set<string>();

  /** Wall time of the last `compute` run per node (sync or async resolution), in ms. */
  private lastComputeMs = new Map<string, number>();

  constructor(spatial: SpatialEngine, registry: NodeTypeRegistry) {
    this.spatial = spatial;
    this.registry = registry;
  }

  // ── Public API ─────────────────────────────────────────────

  /** Node IDs that are part of a dependency cycle (read-only). */
  get cycleNodeIds(): ReadonlySet<string> {
    return this._cycleNodeIds;
  }

  /** Subscribe to port value changes. Returns unsubscribe function. */
  onChange(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  /** Get current value of a specific port. */
  getPortValue(nodeId: string, portId: string): PortValue {
    return this.values.get(portKey(nodeId, portId)) ?? null;
  }

  /** Get all input values for a node, resolved from connected edges. */
  getInputs(nodeId: string): Record<string, PortValue> {
    const node = this.spatial.nodes.get(nodeId);
    const def = this.registry.get(node?.type ?? "");
    const ports = resolveNodePorts(def, node);
    if (!ports) return {};

    const inputs: Record<string, PortValue> = {};
    const inputPorts = ports.filter((p) => p.direction === "input");

    for (const port of inputPorts) {
      // Check if there's an edge connected to this input port
      const edges = this.spatial.getEdgesForNode(nodeId);
      let found = false;
      for (const edge of edges) {
        const ed = (edge as EdgeNode).data;
        if (ed.toId === nodeId && ed.targetPort === port.id) {
          // Read value from the source port
          const sourceVal = this.values.get(
            portKey(ed.fromId, ed.sourcePort ?? ""),
          );
          inputs[port.id] = sourceVal ?? port.defaultValue ?? null;
          found = true;
          break;
        }
      }
      if (!found) {
        inputs[port.id] = port.defaultValue ?? null;
      }
    }
    return inputs;
  }

  /** Get all output values for a node. */
  getOutputs(nodeId: string): Record<string, PortValue> {
    const node = this.spatial.nodes.get(nodeId);
    const def = this.registry.get(node?.type ?? "");
    const ports = resolveNodePorts(def, node);
    if (!ports) return {};

    const outputs: Record<string, PortValue> = {};
    for (const port of ports) {
      if (port.direction === "output") {
        outputs[port.id] =
          this.values.get(portKey(nodeId, port.id)) ?? null;
      }
    }
    return outputs;
  }

  /**
   * Milliseconds for the target node's last `compute` invocation (sync wall time, or
   * async time until the promise settled). Undefined if that node has not run yet.
   * Note: edges do not "process" data — this attributes cost to the downstream node.
   */
  getLastComputeMs(nodeId: string): number | undefined {
    return this.lastComputeMs.get(nodeId);
  }

  /** Get all port values (inputs + outputs) for a node. */
  getAllPortValues(nodeId: string): Record<string, PortValue> {
    const node = this.spatial.nodes.get(nodeId);
    const def = this.registry.get(node?.type ?? "");
    const ports = resolveNodePorts(def, node);
    if (!ports) return {};

    const result: Record<string, PortValue> = {};
    for (const port of ports) {
      if (port.direction === "input") {
        // Resolve input from connected edge
        const edges = this.spatial.getEdgesForNode(nodeId);
        let found = false;
        for (const edge of edges) {
          const ed = (edge as EdgeNode).data;
          if (ed.toId === nodeId && ed.targetPort === port.id) {
            result[port.id] =
              this.values.get(portKey(ed.fromId, ed.sourcePort ?? "")) ??
              port.defaultValue ??
              null;
            found = true;
            break;
          }
        }
        if (!found) {
          result[port.id] = port.defaultValue ?? null;
        }
      } else {
        result[port.id] =
          this.values.get(portKey(nodeId, port.id)) ?? null;
      }
    }
    return result;
  }

  /** Mark a node as dirty and schedule recomputation. */
  markDirty(nodeId: string): void {
    this.dirty.add(nodeId);
    this.scheduleFlush();
  }

  /** Wire up SpatialEngine event listeners. Returns cleanup function. */
  connect(): () => void {
    const onNodeData = (node: SpatialNode) => {
      const def = this.registry.get(node.type);
      if (def?.ports) {
        this.markDirty(node.id);
      }
    };

    const onNodeCreate = (node: SpatialNode) => {
      if (node.type === "edge") {
        // New edge: mark the target node dirty
        const ed = (node as EdgeNode).data;
        if (ed.targetPort) {
          this.markDirty(ed.toId);
        }
      } else {
        // New non-edge node with ports: initialize outputs
        const def = this.registry.get(node.type);
        if (def?.ports && def.compute) {
          this.markDirty(node.id);
        }
      }
    };

    const onNodeDelete = (node: SpatialNode) => {
      if (node.type === "edge") {
        // Deleted edge: mark the former target node dirty
        const ed = (node as EdgeNode).data;
        if (ed.targetPort) {
          this.markDirty(ed.toId);
        }
        // Clean up port values for this edge's connections
      } else {
        // Clean up port values for deleted node
        const def = this.registry.get(node.type);
        const ports = resolveNodePorts(def, node);
        if (ports) {
          for (const port of ports) {
            this.values.delete(portKey(node.id, port.id));
          }
          // Mark any downstream nodes dirty
          this.markDownstream(node.id);
        }
        // Per-id bookkeeping outlives the node otherwise (until dispose()).
        this.generations.delete(node.id);
        this.dirty.delete(node.id);
        this.lastComputeMs.delete(node.id);
      }
    };

    this.spatial.on("node:data", onNodeData);
    this.spatial.on("node:create", onNodeCreate);
    this.spatial.on("node:delete", onNodeDelete);

    // Initial computation for all existing nodes with ports
    this.initializeAll();

    return () => {
      this.spatial.off("node:data", onNodeData);
      this.spatial.off("node:create", onNodeCreate);
      this.spatial.off("node:delete", onNodeDelete);
    };
  }

  /** Dispose and clean up. */
  dispose(): void {
    this.values.clear();
    this.dirty.clear();
    this.listeners.clear();
    this.scheduled = false;
    this.lastComputeMs.clear();
  }

  // ── Private implementation ─────────────────────────────────

  /** Initialize all nodes with ports. */
  private initializeAll(): void {
    for (const node of this.spatial.nodes.values()) {
      const def = this.registry.get(node.type);
      if (def?.ports && def.compute) {
        this.dirty.add(node.id);
      }
    }
    if (this.dirty.size > 0) {
      this.scheduleFlush();
    }
  }

  /** Schedule a microtask flush if not already scheduled. */
  private scheduleFlush(): void {
    if (this.scheduled) return;
    this.scheduled = true;
    queueMicrotask(() => {
      this.scheduled = false;
      this.flush();
    });
  }

  /** Mark all downstream nodes (nodes that depend on outputs of nodeId) as dirty. */
  private markDownstream(nodeId: string): void {
    const edges = this.spatial.getEdgesForNode(nodeId);
    for (const edge of edges) {
      const ed = (edge as EdgeNode).data;
      if (ed.fromId === nodeId && ed.targetPort) {
        this.dirty.add(ed.toId);
      }
    }
  }

  /** Topological sort of dirty nodes + their downstream dependents. */
  private topoSort(): { sorted: string[]; cyclesChanged: boolean } {
    // Collect all nodes that have ports and compute
    const portNodes = new Set<string>();
    for (const node of this.spatial.nodes.values()) {
      const def = this.registry.get(node.type);
      if (def?.ports && def.compute) {
        portNodes.add(node.id);
      }
    }

    if (portNodes.size === 0) {
      const cyclesChanged = this._cycleNodeIds.size > 0;
      if (cyclesChanged) this._cycleNodeIds = new Set();
      return { sorted: [], cyclesChanged };
    }

    // Build adjacency for port-connected nodes only
    // adj[nodeId] = set of node IDs that depend on this node's outputs
    const adj = new Map<string, Set<string>>();
    for (const id of portNodes) {
      adj.set(id, new Set());
    }

    // Walk all edges to build the dependency graph
    const allEdges = this.spatial.getAllEdges();
    for (const edge of allEdges) {
      const ed = (edge as EdgeNode).data;
      if (
        ed.sourcePort &&
        ed.targetPort &&
        portNodes.has(ed.fromId) &&
        portNodes.has(ed.toId)
      ) {
        adj.get(ed.fromId)!.add(ed.toId);
      }
    }

    // Expand dirty set to include all downstream dependents
    const expandedDirty = new Set(this.dirty);
    const visited = new Set<string>();
    const expand = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      const deps = adj.get(nodeId);
      if (deps) {
        for (const dep of deps) {
          expandedDirty.add(dep);
          expand(dep);
        }
      }
    };
    for (const id of [...this.dirty]) {
      expand(id);
    }

    // Kahn's algorithm on the expanded dirty set. In-degree is counted over
    // the deduped adjacency — the same structure the decrement walk below
    // traverses — never per edge: duplicate wires between the same port pair
    // collapse to one adjacency entry, so a per-edge count would leave the
    // target's in-degree permanently above zero (a false cycle).
    const subInDegree = new Map<string, number>();
    for (const id of expandedDirty) {
      subInDegree.set(id, 0);
    }
    for (const from of expandedDirty) {
      const outs = adj.get(from);
      if (!outs) continue;
      for (const to of outs) {
        if (expandedDirty.has(to)) {
          subInDegree.set(to, (subInDegree.get(to) ?? 0) + 1);
        }
      }
    }

    const queue: string[] = [];
    for (const [id, deg] of subInDegree) {
      if (deg === 0) queue.push(id);
    }

    const sorted: string[] = [];
    while (queue.length > 0) {
      const id = queue.shift()!;
      sorted.push(id);
      const deps = adj.get(id);
      if (deps) {
        for (const dep of deps) {
          if (!expandedDirty.has(dep)) continue;
          const newDeg = (subInDegree.get(dep) ?? 1) - 1;
          subInDegree.set(dep, newDeg);
          if (newDeg === 0) queue.push(dep);
        }
      }
    }

    // Detect cycles: nodes in expandedDirty but not in sorted are in a cycle
    const sortedSet = new Set(sorted);
    const newCycleIds = new Set<string>();
    for (const id of expandedDirty) {
      if (!sortedSet.has(id)) {
        newCycleIds.add(id);
      }
    }
    // Update if changed, and signal that cycles changed
    let cyclesChanged = false;
    if (newCycleIds.size !== this._cycleNodeIds.size || [...newCycleIds].some(id => !this._cycleNodeIds.has(id))) {
      this._cycleNodeIds = newCycleIds;
      cyclesChanged = true;
    }

    return { sorted, cyclesChanged };
  }

  /** Full graph recompute of dirty nodes. */
  private flush(): void {
    if (this.dirty.size === 0) return;

    const { sorted, cyclesChanged } = this.topoSort();
    this.dirty.clear();

    let changed = false;
    for (const nodeId of sorted) {
      const didChange = this.executeNode(nodeId);
      if (didChange) changed = true;
    }

    if (changed || cyclesChanged) {
      this.notifyListeners();
    }
  }

  /** Execute a single node's compute function. Returns true if outputs changed. */
  private executeNode(nodeId: string): boolean {
    const node = this.spatial.nodes.get(nodeId);
    if (!node) return false;

    const def = this.registry.get(node.type) as
      | NodeTypeDefinition<unknown>
      | undefined;
    const ports = resolveNodePorts(def, node);
    if (!def?.compute || !ports) return false;

    const inputs = this.getInputs(nodeId);
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;
    const result = def.compute(inputs, node.data);

    // Handle async compute
    if (result instanceof Promise) {
      const gen = (this.generations.get(nodeId) ?? 0) + 1;
      this.generations.set(nodeId, gen);
      result.then((outputs) => {
        if (gen !== this.generations.get(nodeId)) return; // stale — this node re-ran
        const t1 = typeof performance !== "undefined" ? performance.now() : 0;
        this.lastComputeMs.set(nodeId, t1 - t0);
        const didChange = this.applyOutputs(nodeId, ports, outputs);
        if (didChange) {
          // Mark downstream dirty and flush again
          this.markDownstream(nodeId);
          this.notifyListeners();
          if (this.dirty.size > 0) {
            this.scheduleFlush();
          }
        }
      });
      return false;
    }

    // Synchronous compute
    const t1 = typeof performance !== "undefined" ? performance.now() : 0;
    this.lastComputeMs.set(nodeId, t1 - t0);
    return this.applyOutputs(nodeId, ports, result);
  }

  /** Apply computed outputs to the values map. Returns true if any value changed. */
  private applyOutputs(
    nodeId: string,
    ports: PortDefinition[],
    outputs: Record<string, PortValue>,
  ): boolean {
    let changed = false;
    for (const port of ports) {
      if (port.direction !== "output") continue;
      const key = portKey(nodeId, port.id);
      const newVal = outputs[port.id] ?? null;
      const oldVal = this.values.get(key) ?? null;
      if (!shallowEqual(oldVal, newVal)) {
        this.values.set(key, newVal);
        changed = true;
      }
    }
    if (changed) {
      // Mark downstream nodes dirty for next flush
      this.markDownstream(nodeId);
    }
    return changed;
  }

  /** Notify all change listeners. */
  private notifyListeners(): void {
    for (const cb of this.listeners) {
      cb();
    }
  }
}

/** Shallow equality check for port values. */
function shallowEqual(a: PortValue, b: PortValue): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const k of keysA) {
      if (
        (a as Record<string, unknown>)[k] !==
        (b as Record<string, unknown>)[k]
      )
        return false;
    }
    return true;
  }
  return false;
}
