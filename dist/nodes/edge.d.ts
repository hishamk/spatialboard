import type { EdgeNode } from "../engine/types";
import type { NodeTypeDefinition } from "./registry";
export type EdgeNodeData = EdgeNode["data"];
export declare const edgeNodeType: NodeTypeDefinition<EdgeNodeData>;
