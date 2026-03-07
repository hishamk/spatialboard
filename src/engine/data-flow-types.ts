// ── Data-flow port system types ──────────────────────────────

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
}

/** A value that flows through a port. */
export type PortValue = number | string | boolean | Record<string, unknown> | null;

/** Composite key for port values: "nodeId:portId". */
export type PortKey = `${string}:${string}`;

/** Helper to create a port key. */
export function portKey(nodeId: string, portId: string): PortKey {
  return `${nodeId}:${portId}`;
}
