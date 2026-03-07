import type { FrameNode } from "../engine/types";
import type { NodeTypeDefinition } from "./registry";
export type FrameNodeData = FrameNode["data"];
export declare const frameNodeType: NodeTypeDefinition<FrameNodeData>;
