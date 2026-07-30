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

export { NodeTypeRegistry, defineReactNode } from "./registry";
export type {
  NodeTypeDefinition,
  NodeTypeDef,
  NodeTypeReactUI,
  NodeRendererProps,
  NodeCallbacks,
  NodePropertiesPanelProps,
} from "./registry";

// Re-import for the builtinNodeTypes array
import { contentNodeType } from "./content";
import { drawNodeType } from "./draw";
import { shapeNodeType } from "./shape";
import { edgeNodeType } from "./edge";
import { imageNodeType } from "./image";
import { textNodeType } from "./text";
import { frameNodeType } from "./frame";
import { stickyNodeType } from "./sticky";
import { youtubeNodeType } from "./youtube";

/** All built-in node type definitions shipped with spatialboard. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const builtinNodeTypes: NodeTypeDefinition<any>[] = [
  contentNodeType,
  drawNodeType,
  shapeNodeType,
  edgeNodeType,
  imageNodeType,
  textNodeType,
  frameNodeType,
  stickyNodeType,
  youtubeNodeType,
];
