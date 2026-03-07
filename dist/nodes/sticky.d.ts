import type { StickyNoteNode } from "../engine/types";
import type { NodeTypeDefinition } from "./registry";
export type StickyNodeData = StickyNoteNode["data"];
export declare const stickyNodeType: NodeTypeDefinition<StickyNodeData>;
