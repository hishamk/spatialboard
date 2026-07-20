import type { SpatialEngine } from "../engine/SpatialEngine";
import type { SpatialNode, ToolKey } from "../engine/types";
/** Encode nodes as a base64 JSON string (Unicode-safe). */
export declare function encodeClipboardNodes(nodes: SpatialNode[]): string;
/** Extract embedded node data from clipboard HTML (cross-tab paste). */
export declare function extractEmbeddedNodes(html: string): SpatialNode[] | null;
export declare function setupKeyboardHandler(engine: SpatialEngine, container?: HTMLElement | null, tools?: ToolKey[]): () => void;
