import type { NodeTypeDefinition } from "./registry";
export { contentNodeType } from "./content";
export { drawNodeType } from "./draw";
export { shapeNodeType } from "./shape";
export { edgeNodeType } from "./edge";
export { imageNodeType } from "./image";
export { textNodeType } from "./text";
export { frameNodeType } from "./frame";
export { stickyNodeType } from "./sticky";
export { youtubeNodeType } from "./youtube";
export { NodeTypeRegistry } from "./registry";
export type { NodeTypeDefinition, NodeRendererProps, NodeCallbacks } from "./registry";
/** All built-in node type definitions shipped with spatialboard. */
export declare const builtinNodeTypes: NodeTypeDefinition<any>[];
