import type { DrawNode } from "../engine/types";
import type { NodeTypeDefinition } from "./registry";
export type DrawNodeData = DrawNode["data"];
export declare const drawNodeType: NodeTypeDefinition<DrawNodeData>;
