import type { ContentNode } from "../engine/types";
import type { NodeTypeDefinition } from "./registry";
export type ContentNodeData = ContentNode["data"];
export declare const contentNodeType: NodeTypeDefinition<ContentNodeData>;
