import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { SpatialNode, Mode } from "../../engine/types";
export interface TypeGroup {
    type: string;
    nodes: SpatialNode[];
}
export type SelectionTarget = {
    kind: "none";
} | {
    kind: "tool";
    mode: Mode;
} | {
    kind: "single";
    node: SpatialNode;
} | {
    kind: "multi";
    nodes: SpatialNode[];
    typeGroups: TypeGroup[];
};
export interface MergedCommonProps {
    opacity?: number | "mixed";
    borderColor?: string | null | "mixed";
    borderWidth?: number | "mixed";
    borderStyle?: "solid" | "dashed" | "dotted" | "mixed";
}
export declare function useMultiSelection(engine: SpatialEngine): {
    target: SelectionTarget;
    commonProps: MergedCommonProps;
};
