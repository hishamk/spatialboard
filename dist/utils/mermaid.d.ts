import type { SpatialNode } from "../engine/types";
type MermaidDirection = "TB" | "BT" | "LR" | "RL";
type MermaidShape = "rect" | "round" | "circle" | "diamond";
interface ParsedNode {
    key: string;
    label: string;
    shape: MermaidShape;
}
interface ParsedEdge {
    fromKey: string;
    toKey: string;
    label?: string;
}
interface ParsedGraph {
    direction: MermaidDirection;
    nodes: Map<string, ParsedNode>;
    edges: ParsedEdge[];
    groups: Array<{
        label?: string;
        nodeKeys: string[];
    }>;
}
interface SequenceMessage {
    from: string;
    to: string;
    arrow: string;
    label: string;
}
interface SequenceNote {
    side: "left" | "right" | "over";
    of: string;
    text: string;
}
interface ParsedSequence {
    participants: string[];
    messages: SequenceMessage[];
    notes: Array<{
        step: number;
        note: SequenceNote;
    }>;
    groups: Array<{
        label?: string;
        color?: string;
        participants: string[];
    }>;
}
export declare function parseMermaidFlowchart(input: string): ParsedGraph;
export declare function parseMermaidSequence(input: string): ParsedSequence;
export declare function buildMermaidSketchNodes(input: string, centerX: number, centerY: number, getNextZ: () => number): {
    nodes: SpatialNode[];
    shapeNodeIds: string[];
};
export {};
