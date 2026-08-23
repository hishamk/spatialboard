// ── Data-flow port system types ──────────────────────────────

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
export function nodeShowsEdgeComputeOverlay(node: SpatialNode): boolean {
  const d = node.data as Record<string, unknown> | undefined;
  return d?.showEdgeComputeOverlay === true;
}

/** Supported data types for ports. */
export type PortDataType = "number" | "string" | "boolean" | "object" | "any" | "signal";

/** Whether a port receives or sends data. */
export type PortDirection = "input" | "output";

/** Definition of a single port on a node type. */
export interface PortDefinition {
  /** Unique identifier within the node (e.g. "input_a", "result"). */
  id: string;
  /** Display label shown next to the port circle. */
  label?: string;
  /** Whether this port receives or sends data. */
  direction: PortDirection;
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

/** A value that flows through a port. Arrays cover the common data-flow
 *  payloads (vectors, matrices, token lists) without forcing an object
 *  wrapper; element/property types stay loose on purpose so hosts can move
 *  whatever their compute functions understand. */
export type PortValue =
  | number
  | string
  | boolean
  | Record<string, unknown>
  | unknown[]
  | null;

/** Composite key for port values: "nodeId:portId". */
export type PortKey = `${string}:${string}`;

/** Helper to create a port key. */
export function portKey(nodeId: string, portId: string): PortKey {
  return `${nodeId}:${portId}`;
}
