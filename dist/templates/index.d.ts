import type { SpatialNode } from "../engine/types";
export interface Template {
    id: string;
    label: string;
    nodes: SpatialNode[];
}
export declare const TEMPLATES: Template[];
