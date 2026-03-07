import type { TextNode } from "../engine/types";
import type { NodeTypeDefinition } from "./registry";
export type TextNodeData = TextNode["data"];
export declare const textNodeType: NodeTypeDefinition<TextNodeData>;
