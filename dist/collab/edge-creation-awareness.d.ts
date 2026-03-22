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
export declare function serializeEdgeCreationAwareness(p: {
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
}): EdgeCreationAwareness;
