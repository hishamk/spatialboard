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

  /** Reverse index: node id → the value keys it owns. Lets a delete purge a
   *  node's values exactly, without a prefix scan over the whole map (which
   *  would also mis-match a sibling whose id is a colon-prefix of this one)
   *  and without re-deriving ports at delete time (which a narrowed resolver
   *  would under-report). Written wherever `values` is. */
  private valueKeys = new Map<string, Set<PortKey>>();

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

  /** Last thrown/rejected `compute` error per node — parked so one failing
   *  node cannot abort the rest of a flush, cleared by the node's next
   *  successful run. Read via getComputeError(). */
  private computeErrors = new Map<string, unknown>();

  /** Bumped whenever a parked error appears or clears; the flush compares it
   *  around its execute loop so error transitions notify listeners exactly
   *  once per flush. */
  private errorEpoch = 0;

  /** The connect() unsubscribe, retained so dispose() can sever the engine
   *  even when the host never calls the returned cleanup. */
  private disconnectSpatial: (() => void) | null = null;

  /** Set by dispose(), cleared by connect(): a disposed engine schedules
   *  nothing and executes nothing, even from a flush already in progress or
   *  a markDirty issued by a host that kept the reference. */
  private disposed = false;

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

  /** The error the target node's last `compute` threw (sync) or rejected
   *  with (async), or undefined when its last run succeeded. Errors park
   *  here instead of aborting the flush; a park or clear notifies change
   *  listeners like a value change does. */
  getComputeError(nodeId: string): unknown {
    return this.computeErrors.get(nodeId);
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

  /** Wire up SpatialEngine event listeners. Returns cleanup function.
   *  Connecting a disposed engine re-arms it — deliberate, and safe against
   *  anything left in flight from before the dispose (the counters were
   *  bumped, never reset, so a dead run's landing can't match). */
  connect(): () => void {
    this.disposed = false;
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
        // Drop the deleted node's whole state (by id prefix — a narrowed
        // resolver port set must not leak values onto a reused id), then
        // mark any downstream nodes dirty.
        const def = this.registry.get(node.type);
        if (def?.ports) {
          this.purgeNodeState(node.id);
          this.markDownstream(node.id);
        }
        // Bump — never delete — the generation: an entry exists iff an
        // async compute started, and a recreated node with the SAME id
        // (serialized boards carry deterministic ids) must not accept the
        // dead instance's in-flight resolution. Absent entry ⇒ nothing in
        // flight ⇒ nothing to guard. The counter deliberately outlives the
        // node (until dispose()); purgeNodeState leaves it untouched.
        const gen = this.generations.get(node.id);
        if (gen !== undefined) this.generations.set(node.id, gen + 1);
        this.dirty.delete(node.id);
      }
    };

    // A wholesale swap of the nodes map (undo / redo / deserialize) emits no
    // granular node events — the handlers above never fire, so the engine must
    // rebuild its state against the new graph from scratch.
    const onGraphReplaced = () => this.reconcile();

    this.spatial.on("node:data", onNodeData);
    this.spatial.on("node:create", onNodeCreate);
    this.spatial.on("node:delete", onNodeDelete);
    this.spatial.on("graph:replaced", onGraphReplaced);

    // Initial computation for all existing nodes with ports
    this.initializeAll();

    const disconnect = () => {
      this.spatial.off("node:data", onNodeData);
      this.spatial.off("node:create", onNodeCreate);
      this.spatial.off("node:delete", onNodeDelete);
      this.spatial.off("graph:replaced", onGraphReplaced);
    };
    this.disconnectSpatial = disconnect;
    return disconnect;
  }

  /** Dispose and clean up. Severs the SpatialEngine subscription itself (a
   *  host that forgot the connect() cleanup must not keep a recomputing
   *  zombie), marks the engine inert (nothing schedules or executes past
   *  this point, including the remainder of a flush in progress), and BUMPS
   *  every generation counter — clearing would let a dispose+connect revival
   *  re-mint a number a pre-dispose in-flight promise still holds, the same
   *  trap the delete path avoids by bumping. */
  dispose(): void {
    this.disposed = true;
    this.disconnectSpatial?.();
    this.values.clear();
    this.valueKeys.clear();
    this.dirty.clear();
    this.listeners.clear();
    this.scheduled = false;
    this.lastComputeMs.clear();
    for (const [id, gen] of this.generations) {
      this.generations.set(id, gen + 1);
    }
    this.computeErrors.clear();
    this._cycleNodeIds = new Set();
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

  /** Rebuild state after a wholesale swap of the nodes map (undo / redo /
   *  deserialize), which arrives with no granular node events. Drop stored
   *  state for node ids the swap removed — their values would otherwise
   *  linger and read back through getPortValue — then re-mark every live
   *  compute-capable node dirty so the restored graph recomputes without a
   *  manual touch. Cheap and idempotent: it fires only on the swap events,
   *  never on ordinary edits (which the granular handlers keep in sync). */
  private reconcile(): void {
    if (this.disposed) return;
    const live = this.spatial.nodes;
    // Candidate ids come from the per-node maps, all keyed by node id — no
    // reverse-parsing of `nodeId:portId` value keys (which would assume
    // colon-free ids). The union covers stored values (valueKeys), timings
    // (lastComputeMs), in-flight async (generations), and parked errors
    // (computeErrors) — each map explicitly, so completeness holds even if a
    // future write path populates one without the others.
    const stale = new Set<string>();
    for (const nodeId of this.valueKeys.keys()) {
      if (!live.has(nodeId)) stale.add(nodeId);
    }
    for (const nodeId of this.lastComputeMs.keys()) {
      if (!live.has(nodeId)) stale.add(nodeId);
    }
    for (const nodeId of this.generations.keys()) {
      if (!live.has(nodeId)) stale.add(nodeId);
    }
    for (const nodeId of this.computeErrors.keys()) {
      if (!live.has(nodeId)) stale.add(nodeId);
    }
    for (const nodeId of stale) {
      this.purgeNodeState(nodeId);
      // A gone node's in-flight async must not land on a future reuse of its
      // id — bump past the generation the dead run holds (matching delete).
      const gen = this.generations.get(nodeId);
      if (gen !== undefined) this.generations.set(nodeId, gen + 1);
      this.dirty.delete(nodeId);
    }
    this.initializeAll();
  }

  /** Schedule a microtask flush if not already scheduled. */
  private scheduleFlush(): void {
    if (this.disposed || this.scheduled) return;
    this.scheduled = true;
    queueMicrotask(() => {
      this.scheduled = false;
      this.flush();
    });
  }

  /** Mark all downstream nodes (nodes that depend on outputs of nodeId) as
   *  dirty, and schedule a flush when anything was marked. Scheduling here is
   *  load-bearing for the node-delete path: deleteNode/deleteNodes emit ONE
   *  node:delete per node (its edges still queryable at that point) and then
   *  cascade the edges away without events, so no later signal arrives to
   *  flush the dependents. */
  private markDownstream(nodeId: string): void {
    const edges = this.spatial.getEdgesForNode(nodeId);
    let marked = false;
    for (const edge of edges) {
      const ed = (edge as EdgeNode).data;
      if (ed.fromId === nodeId && ed.targetPort) {
        this.dirty.add(ed.toId);
        marked = true;
      }
    }
    if (marked) this.scheduleFlush();
  }

  /** Topological sort of dirty nodes + their downstream dependents. Also
   *  returns the adjacency it sorted on, so the flush can forward-propagate
   *  changes through the exact same graph. */
  private topoSort(): {
    sorted: string[];
    cyclesChanged: boolean;
    adj: Map<string, Set<string>>;
  } {
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
      return { sorted: [], cyclesChanged, adj: new Map() };
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

    return { sorted, cyclesChanged, adj };
  }

  /** Full graph recompute of dirty nodes. */
  private flush(): void {
    if (this.disposed || this.dirty.size === 0) return;

    const initiallyDirty = new Set(this.dirty);
    const { sorted, cyclesChanged, adj } = this.topoSort();
    this.dirty.clear();

    // Execute in topo order, but only where something actually happened: a
    // node the flush was asked about (initially dirty), or one downstream of
    // a node whose outputs CHANGED this pass — forward-propagated through
    // the same adjacency the sort ran on (topo order guarantees upstream
    // executes first). Expansion-only nodes with untouched inputs keep
    // their values: recomputing a matrix upstream must not re-run the whole
    // downstream when the result is structurally identical. (Async computes
    // return "unchanged" here and re-enter through markDirty when their
    // promise applies a real change.)
    const pending = new Set<string>();
    const errorEpochBefore = this.errorEpoch;
    let changed = false;
    for (const nodeId of sorted) {
      if (!initiallyDirty.has(nodeId) && !pending.has(nodeId)) continue;
      const didChange = this.executeNode(nodeId);
      if (didChange) {
        changed = true;
        for (const to of adj.get(nodeId) ?? []) pending.add(to);
      }
    }

    if (changed || cyclesChanged || this.errorEpoch !== errorEpochBefore) {
      this.notifyListeners();
    }
  }

  /** Execute a single node's compute function. Returns true if outputs changed. */
  private executeNode(nodeId: string): boolean {
    // A compute earlier in this same flush may have disposed the engine —
    // the rest of the topo order must not write into the cleared maps.
    if (this.disposed) return false;
    const node = this.spatial.nodes.get(nodeId);
    if (!node) return false;

    const def = this.registry.get(node.type) as
      | NodeTypeDefinition<unknown>
      | undefined;
    const ports = resolveNodePorts(def, node);
    if (!def?.compute || !ports) return false;

    // A new run supersedes any async run still in flight for this node —
    // the old landing must not overwrite what this run produces, nor clear
    // the error it parks. An entry exists iff an async run ever started, so
    // sync-only nodes never grow the map.
    const prevGen = this.generations.get(nodeId);
    if (prevGen !== undefined) this.generations.set(nodeId, prevGen + 1);

    const inputs = this.getInputs(nodeId);
    const t0 = typeof performance !== "undefined" ? performance.now() : 0;
    let result: Record<string, PortValue> | Promise<Record<string, PortValue>>;
    try {
      result = def.compute(inputs, node.data);
    } catch (err) {
      // Park and move on: dirty is already cleared for this flush, so letting
      // the throw escape the microtask would silently cost every node later
      // in the topo order its recompute. Outputs keep their last good values.
      this.parkComputeError(nodeId, err);
      return false;
    }

    // Handle async compute
    if (result instanceof Promise) {
      const gen = (this.generations.get(nodeId) ?? 0) + 1;
      this.generations.set(nodeId, gen);
      result.then(
        (outputs) => {
          if (gen !== this.generations.get(nodeId)) return; // stale — this node re-ran
          const t1 = typeof performance !== "undefined" ? performance.now() : 0;
          this.lastComputeMs.set(nodeId, t1 - t0);
          let didChange: boolean;
          try {
            didChange = this.applyOutputs(nodeId, ports, outputs);
          } catch (err) {
            // Hostile output values (a plain object whose property getter
            // throws) fail during the change check; that failure belongs to
            // this node, exactly like a rejection.
            if (this.parkComputeError(nodeId, err)) {
              this.notifyListeners();
            }
            return;
          }
          const errorCleared = this.clearComputeError(nodeId);
          if (didChange) {
            // markDownstream schedules the follow-up flush itself when the
            // change has dependents.
            this.markDownstream(nodeId);
          }
          if (didChange || errorCleared) {
            this.notifyListeners();
          }
        },
        (err) => {
          // Rejections park exactly like a sync throw — an async compute must
          // never surface as an unhandled rejection. Stale rejections (node
          // re-ran, was deleted, or the engine was disposed) are dropped.
          if (gen !== this.generations.get(nodeId)) return;
          if (this.parkComputeError(nodeId, err)) {
            this.notifyListeners();
          }
        },
      );
      return false;
    }

    // Synchronous compute
    const t1 = typeof performance !== "undefined" ? performance.now() : 0;
    this.lastComputeMs.set(nodeId, t1 - t0);
    // applyOutputs sits inside the same net as the compute itself: hostile
    // output values (a plain object whose property getter throws) fail during
    // the change check, and that failure belongs to this node, not to the
    // rest of the flush.
    try {
      const didChange = this.applyOutputs(nodeId, ports, result);
      this.clearComputeError(nodeId);
      return didChange;
    } catch (err) {
      this.parkComputeError(nodeId, err);
      return false;
    }
  }

  /** Apply computed outputs to the values map. Returns true if any value
   *  changed. Propagation is the CALLER's job: the sync flush loop carries
   *  changes forward through its topo order, and the async completion marks
   *  downstream itself — marking here too would leave stale ids in `dirty`
   *  during a flush, and a later flush would then treat untouched downstream
   *  nodes as invalidated. */
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
      if (!portValuesEqual(oldVal, newVal)) {
        this.values.set(key, newVal);
        let keys = this.valueKeys.get(nodeId);
        if (!keys) this.valueKeys.set(nodeId, (keys = new Set()));
        keys.add(key);
        changed = true;
      }
    }
    return changed;
  }

  /** Park a compute error for a node. Returns true when the parked state
   *  changed — a compute that throws a cached singleton error on every run
   *  must not re-notify hosts once per flush, so identical re-parks are
   *  no-ops (fresh objects per throw, the common case, always report).
   *  `undefined` normalizes to a real Error so a parked failure can never
   *  read as "no error" through getComputeError. */
  private parkComputeError(nodeId: string, err: unknown): boolean {
    if (err === undefined) err = new Error("compute failed with no error value");
    if (this.computeErrors.get(nodeId) === err) return false;
    this.computeErrors.set(nodeId, err);
    this.errorEpoch++;
    return true;
  }

  /** Clear a node's parked compute error. Returns true when one was parked. */
  private clearComputeError(nodeId: string): boolean {
    if (!this.computeErrors.delete(nodeId)) return false;
    this.errorEpoch++;
    return true;
  }

  /** Notify all change listeners. A throwing listener is isolated: it is
   *  reported and the remaining listeners still run — one misbehaving host
   *  subscriber must not starve the others, and on the async notify paths a
   *  throw here would otherwise surface as an unhandled rejection. Listener
   *  errors deliberately do not propagate to the engine's callers. */
  private notifyListeners(): void {
    for (const cb of this.listeners) {
      try {
        cb();
      } catch (err) {
        console.error("DataFlowEngine: a change listener threw", err);
      }
    }
  }

  /** Remove every stored entry for a node id — all the port values it owns
   *  (from the reverse index, so every port it ever produced is dropped even
   *  if a later narrow removed the port from its resolver, and a sibling
   *  whose id is a colon-prefix of this one is never touched) plus the
   *  per-node timing / error records. Generations are left to the caller —
   *  delete and reconcile bump them rather than clear. */
  private purgeNodeState(nodeId: string): void {
    const keys = this.valueKeys.get(nodeId);
    if (keys) {
      for (const key of keys) this.values.delete(key);
      this.valueKeys.delete(nodeId);
    }
    this.lastComputeMs.delete(nodeId);
    this.computeErrors.delete(nodeId);
  }
}

/** Recursion ceiling for the change check. Port payloads are data (matrices,
 *  token lists, plain records); anything nested deeper than this — or cyclic —
 *  falls back to reference identity, which errs toward "changed" (a spurious
 *  recompute) rather than a missed one. */
const EQUAL_MAX_DEPTH = 100;

/** Plain data object: `{}`-literal or null-prototype. */
function isPlainObject(v: object): boolean {
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
}

/** Plain array — a subclass can carry state its elements don't show. */
function isPlainArray(v: unknown[]): boolean {
  return Object.getPrototypeOf(v) === Array.prototype;
}

/** Deep equality for port values: SameValueZero primitives, arrays, and plain
 *  objects. Freshly built but structurally equal payloads (a recomputed
 *  matrix) must compare equal, or every upstream run marks the whole
 *  downstream dirty for nothing. */
function portValuesEqual(a: unknown, b: unknown, depth = 0): boolean {
  if (a === b) return true;
  // SameValueZero: NaN equals NaN (=== already treats +0/-0 as equal).
  if (typeof a === "number" && typeof b === "number") {
    return a !== a && b !== b;
  }
  if (a == null || b == null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (depth >= EQUAL_MAX_DEPTH) return false;

  const aIsArray = Array.isArray(a);
  if (aIsArray !== Array.isArray(b)) return false;
  if (aIsArray) {
    const arrA = a as unknown[];
    const arrB = b as unknown[];
    if (!isPlainArray(arrA) || !isPlainArray(arrB)) return false;
    if (arrA.length !== arrB.length) return false;
    for (let i = 0; i < arrA.length; i++) {
      if (!portValuesEqual(arrA[i], arrB[i], depth + 1)) return false;
    }
    return true;
  }

  // Structural comparison is for DATA: plain objects and arrays. Anything
  // else — Date, Map, Set, class instances — carries state Object.keys
  // cannot see, so two DISTINCT instances always count as a change
  // (identical references already returned true at the top). Errs toward
  // a recompute, never a swallowed update.
  if (!isPlainObject(a) || !isPlainObject(b)) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    if (
      !portValuesEqual(
        (a as Record<string, unknown>)[k],
        (b as Record<string, unknown>)[k],
        depth + 1,
      )
    )
      return false;
  }
  return true;
}
