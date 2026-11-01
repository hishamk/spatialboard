import type { EdgeType, HandleSide, SpatialNode, StrokeStyle } from "../engine/types";
import type { PortDirection } from "../engine/data-flow-types";

/**
 * Serializable edge-drag preview for a host's presence channel, such as Yjs
 * awareness. Remote peers render it the way SVGLayer renders the local drag.
 */
export interface EdgeCreationAwareness {
  fromNodeId: string;
  cursorX: number;
  cursorY: number;
  sourceHandle?: HandleSide;
  /** Perimeter t (number) or interior [u,v] anchor on the source node. */
  sourceT?: number | [number, number];
  sourcePort?: string;
  sourceDirection?: PortDirection;
  edgeColor?: string;
  edgeStrokeWidth?: number;
  edgeStyle?: StrokeStyle;
  edgeType?: EdgeType;
  attachmentGap?: number;
}

/** Build awareness payload from live `edgePreview` state in SpatialCanvas. */
export function serializeEdgeCreationAwareness(
  p: Omit<EdgeCreationAwareness, "fromNodeId"> & { fromNode: SpatialNode },
): EdgeCreationAwareness {
  const { fromNode, ...rest } = p;
  return { fromNodeId: fromNode.id, ...rest };
}
