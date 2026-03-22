import type { EdgeType, HandleSide, SpatialNode } from "../engine/types";

/**
 * Serializable edge-drag preview for Yjs awareness (remote parity with SVGLayer).
 */
export interface EdgeCreationAwareness {
  fromNodeId: string;
  cursorX: number;
  cursorY: number;
  sourceHandle?: HandleSide;
  sourceT?: number;
  sourcePort?: string;
  sourceDirection?: "input" | "output";
  edgeColor?: string;
  edgeStrokeWidth?: number;
  edgeStyle?: "solid" | "dashed" | "dotted";
  edgeType?: EdgeType;
  attachmentGap?: number;
}

/** Build awareness payload from live `edgePreview` state in SpatialCanvas. */
export function serializeEdgeCreationAwareness(p: {
  fromNode: SpatialNode;
  cursorX: number;
  cursorY: number;
  sourceHandle?: HandleSide;
  sourceT?: number;
  sourcePort?: string;
  sourceDirection?: "input" | "output";
  edgeColor?: string;
  edgeStrokeWidth?: number;
  edgeStyle?: "solid" | "dashed" | "dotted";
  edgeType?: EdgeType;
  attachmentGap?: number;
}): EdgeCreationAwareness {
  return {
    fromNodeId: p.fromNode.id,
    cursorX: p.cursorX,
    cursorY: p.cursorY,
    sourceHandle: p.sourceHandle,
    sourceT: p.sourceT,
    sourcePort: p.sourcePort,
    sourceDirection: p.sourceDirection,
    edgeColor: p.edgeColor,
    edgeStrokeWidth: p.edgeStrokeWidth,
    edgeStyle: p.edgeStyle,
    edgeType: p.edgeType,
    attachmentGap: p.attachmentGap,
  };
}
