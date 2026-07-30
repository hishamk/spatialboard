import type { Mode } from "./engine/types";
import type { NodeTypeRegistry } from "./nodes/registry";
import type { SpatialBoardLocalization } from "./components/contexts/LocalizationContext";

export interface ToolSpec {
  /** Engine mode this tool activates — also the `ToolIcon` name and the key used
   *  by the host `tools` allowlist. */
  mode: Mode;
  /** Single-key (lowercase) keyboard shortcut. */
  shortcut: string;
  /** Localization key for the tooltip label. */
  labelKey: keyof SpatialBoardLocalization;
  /** If set, the tool CREATES this node type — it is only shown / active when that
   *  type is registered, so a slim `coreBoardNodes` board hides the rich-text tool. */
  nodeType?: string;
}

/**
 * Single source of truth for the built-in toolbar tools. `ToolStrip` and
 * `ModeCluster` render from it, the keyboard handler binds shortcuts from it, and
 * all three gate node-creating tools on the registry via `modeAvailable`. Add or
 * change a tool in ONE place.
 *
 * (Lasso is a toggle, not a mode, so it's handled separately by its callers.)
 */
export const TOOLS: ToolSpec[] = [
  { mode: "select", shortcut: "s", labelKey: "toolSelect" },
  { mode: "hand",   shortcut: "p", labelKey: "toolHand" },
  { mode: "draw",   shortcut: "d", labelKey: "toolDraw",   nodeType: "draw" },
  { mode: "shape",  shortcut: "g", labelKey: "toolShape",  nodeType: "shape" },
  { mode: "text",   shortcut: "t", labelKey: "toolText",   nodeType: "text" },
  { mode: "note",   shortcut: "b", labelKey: "toolNote",   nodeType: "blocknote" },
  { mode: "sticky", shortcut: "y", labelKey: "toolSticky", nodeType: "sticky" },
  { mode: "frame",  shortcut: "f", labelKey: "toolFrame",  nodeType: "frame" },
  { mode: "edge",   shortcut: "c", labelKey: "toolEdge",   nodeType: "edge" },
  { mode: "erase",  shortcut: "e", labelKey: "toolEraser" },
  { mode: "laser",  shortcut: "z", labelKey: "toolLaser" },
];

const BY_MODE = new Map<string, ToolSpec>(TOOLS.map((t) => [t.mode, t]));

/**
 * Whether a tool is available: a node-creating tool needs its node type
 * registered. Keys not in the table (or without a node type) — and the case where
 * the registry isn't known yet — are always available (byte-identical to the
 * pre-registry behaviour).
 */
export function modeAvailable(key: string, registry?: NodeTypeRegistry): boolean {
  const nodeType = BY_MODE.get(key)?.nodeType;
  return !nodeType || !registry || registry.has(nodeType);
}
