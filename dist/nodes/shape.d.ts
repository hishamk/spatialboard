import type { ShapeNode } from "../engine/types";
import type { NodeTypeDefinition } from "./registry";
export type ShapeNodeData = ShapeNode["data"];
export declare const shapeNodeType: NodeTypeDefinition<ShapeNodeData>;
