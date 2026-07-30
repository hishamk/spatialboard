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

/**
 * Built-in node types with NO heavy peer dependencies — no BlockNote/Mantine.
 * This is the slim set; the rich-text content node is added separately.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const coreBoardNodes: NodeTypeDefinition<any>[] = [
  drawNodeType,
  shapeNodeType,
  edgeNodeType,
  imageNodeType,
  textNodeType,
  frameNodeType,
  stickyNodeType,
  youtubeNodeType,
];

/** All built-in node type definitions (core + the rich-text content node). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const builtinNodeTypes: NodeTypeDefinition<any>[] = [
  ...coreBoardNodes,
  contentNodeType,
];
