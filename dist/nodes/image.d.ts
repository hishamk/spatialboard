import type { ImageNode } from "../engine/types";
import type { NodeTypeDefinition } from "./registry";
export type ImageNodeData = ImageNode["data"];
export declare const imageNodeType: NodeTypeDefinition<ImageNodeData>;
