// spatialboard/blocknote — the opt-in rich-text node and its BlockNote-backed
// markdown codec.
//
// The main entry (`spatialboard`) carries NO @blocknote/@mantine edge: the slim
// `SpatialBoard` default is `coreBoardNodes`. Importing THIS subpath is what pulls
// the BlockNote/Mantine peers — and, as a side effect of loading the content node
// module, registers the markdown codec that SBD serialize/parse and clipboard
// paste use (see `serialization/markdown-codec.ts`). Hosts that want rich text
// spread `defaultBoardNodes` (or `blocknoteNodeType`) into their `nodeTypes`.

import type { NodeTypeDefinition } from "./nodes/registry";
import { coreBoardNodes } from "./nodes";
import { blocknoteNodeType } from "./nodes/blocknote";

export { blocknoteNodeType } from "./nodes/blocknote";
export type { BlockNoteNodeData } from "./nodes/blocknote";
export {
  blocksToMarkdown,
  markdownToBlocks,
  htmlToBlocks,
} from "./serialization/blocknote-markdown";

/**
 * The full default board: the slim `coreBoardNodes` plus the rich-text content
 * node. Pass this as `nodeTypes` to opt a `SpatialBoard` into rich text.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultBoardNodes: NodeTypeDefinition<any>[] = [
  ...coreBoardNodes,
  blocknoteNodeType,
];
