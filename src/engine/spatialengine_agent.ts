// spatialengine_agent.ts — agent/LLM state-observation operations for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type {
  SpatialNode,
  TextNode,
  StickyNoteNode,
  ShapeNode,
  EdgeNode,
  FrameNode,
  ContentNode,
  AgentCanvasState,
  AgentStateOptions,
} from "./types";
import type { SpatialEngine } from "./SpatialEngine";

export function getAgentState(engine: SpatialEngine, options?: AgentStateOptions): AgentCanvasState {
  const limit = options?.limit ?? 200;
  const nodeIdSet = options?.nodeIds ? new Set(options.nodeIds) : null;
  const typeSet = options?.types ? new Set<string>(options.types) : null;
  const region = options?.region;

  const allNodes = engine.getAllNodes();
  const filtered: SpatialNode[] = [];
  for (const n of allNodes) {
    if (nodeIdSet && !nodeIdSet.has(n.id)) continue;
    if (typeSet && !typeSet.has(n.type)) continue;
    if (region) {
      const nh = engine.resolveHeight(n);
      if (
        n.x + n.w < region.x ||
        n.y + nh < region.y ||
        n.x > region.x + region.w ||
        n.y > region.y + region.h
      ) continue;
    }
    filtered.push(n);
  }

  const truncated = limit > 0 && filtered.length > limit;
  const nodeList = truncated ? filtered.slice(0, limit) : filtered;

  return {
    mode: engine.mode,
    viewport: { ...engine.viewport },
    selection: Array.from(engine.selection),
    activeTool: { ...engine.activeTool },
    nodeCount: engine.nodes.size,
    returnedCount: nodeList.length,
    truncated,
    canUndo: engine.canUndo(),
    canRedo: engine.canRedo(),
    nodes: nodeList.map((n) => {
      const data = n.data as Record<string, unknown> | undefined;
      let text: string | undefined;
      let label: string | undefined;
      let color: string | undefined;
      if (n.type === "text" && data) {
        text = (data as TextNode["data"]).text;
        color = (data as TextNode["data"]).color;
      } else if (n.type === "sticky" && data) {
        text = (data as StickyNoteNode["data"]).text;
        color = (data as StickyNoteNode["data"]).color;
      } else if (n.type === "shape" && data) {
        label = (data as ShapeNode["data"]).label;
        color = (data as ShapeNode["data"]).stroke;
      } else if (n.type === "edge" && data) {
        label = (data as EdgeNode["data"]).label;
        color = (data as EdgeNode["data"]).color;
      } else if (n.type === "frame" && data) {
        label = (data as FrameNode["data"]).label;
      } else if (n.type === "content" && data) {
        const md = (data as ContentNode["data"]).markdown;
        if (md) text = md.length > 200 ? md.slice(0, 197) + "..." : md;
      }
      return {
        id: n.id,
        type: n.type,
        x: n.x, y: n.y,
        w: n.w, h: n.h,
        rotation: n.rotation,
        locked: n.locked,
        groupId: n.groupId,
        text,
        label,
        color,
      };
    }),
  };
}

export function getAgentStateMarkdown(engine: SpatialEngine, options?: AgentStateOptions): string {
  const s = engine.getAgentState(options);
  const lines: string[] = [];
  lines.push(`**Mode:** ${s.mode}  **Nodes:** ${s.nodeCount}  **Selected:** ${s.selection.length}`);
  lines.push(`**Viewport:** center (${Math.round(s.viewport.x)} ${Math.round(s.viewport.y)}), zoom ${s.viewport.zoom.toFixed(2)}`);
  if (s.truncated) {
    lines.push(`**Showing:** first ${s.returnedCount} of ${s.nodeCount} nodes (truncated — pass \`limit\` / \`region\` / \`types\` to narrow).`);
  }
  if (s.canUndo) lines.push("**Undo available:** yes");
  if (s.canRedo) lines.push("**Redo available:** yes");

  const byType = new Map<string, typeof s.nodes>();
  for (const n of s.nodes) {
    const group = byType.get(n.type) || [];
    group.push(n);
    byType.set(n.type, group);
  }

  for (const [type, nodes] of byType) {
    lines.push(`\n**${type}** (${nodes.length}):`);
    for (const n of nodes.slice(0, 20)) {
      const pos = `(${Math.round(n.x)}, ${Math.round(n.y)})`;
      const size = `${Math.round(n.w)}×${n.h === "auto" ? "auto" : Math.round(n.h as number)}`;
      const desc = [n.label, n.text].filter(Boolean).join(" — ");
      lines.push(`  • \`${n.id.slice(0, 8)}\` ${type} at ${pos} ${size}${desc ? ` — ${desc.slice(0, 80)}` : ""}`);
    }
    if (nodes.length > 20) lines.push(`  … and ${nodes.length - 20} more`);
  }

  return lines.join("\n");
}
