import type { NodeTypeDefinition } from "./registry";

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

// Re-import for the coreBoardNodes array
import { drawNodeType } from "./draw";
import { shapeNodeType } from "./shape";
import { edgeNodeType } from "./edge";
import { imageNodeType } from "./image";
import { textNodeType } from "./text";
import { frameNodeType } from "./frame";
import { stickyNodeType } from "./sticky";
import { youtubeNodeType } from "./youtube";

/**
 * The default board node types — NO heavy peer dependencies (no BlockNote /
 * Mantine). This is the slim set `SpatialBoard` ships by default. The rich-text
 * content node is opt-in via the `spatialboard/blocknote` subpath, whose
 * `defaultBoardNodes` is `[...coreBoardNodes, contentNodeType]`.
 *
 * IMPORTANT: this barrel must not import `./content` (it pulls @blocknote) —
 * that edge lives only behind the `blocknote` subpath.
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
