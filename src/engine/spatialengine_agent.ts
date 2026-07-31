// spatialengine_agent.ts — agent/LLM state-observation + agent-action history
// grouping (begin/end/run) operations for SpatialEngine.
// Shard of SpatialEngine.ts (slicing axis: engine domain — see SpatialEngine.ts header).
// Functions take the engine as first argument; the class methods are thin delegators.

import type {
  SpatialNode,
  TextNode,
  StickyNoteNode,
  ShapeNode,
  EdgeNode,
  FrameNode,
  BlockNoteNode,
  AgentCanvasState,
  AgentStateOptions,
} from "./types";
import type { SpatialEngine } from "./SpatialEngine";

/** Max ms between begin/end before depth is force-reset to 0. */
const AGENT_ACTION_TIMEOUT_MS = 60_000;

/** Begin a grouped agent action. All subsequent `addNode`/`addNodes` calls
 *  share one undo snapshot until `endAgentAction()` is called.
 *  Calling this while already inside a group is a no-op (idempotent).
 *
 *  Safety: if `endAgentAction()` is not called within `AGENT_ACTION_TIMEOUT_MS`
 *  (default 60s), the depth is force-reset to 0 so a crashed MCP client can't
 *  permanently disable per-op undo snapshots. In-process JS callers should
 *  prefer `runAgentAction(fn)` which handles begin/end via try/finally. */
export function beginAgentAction(engine: SpatialEngine): void {
  if (engine._agentActionDepth === 0) {
    engine._historyCoalesceKey = null;
    engine.history.pushSnapshot(engine.nodes, engine.groupParent);
    engine.emit("history");
  }
  engine._agentActionDepth++;
  if (engine._agentActionTimer) clearTimeout(engine._agentActionTimer);
  engine._agentActionTimer = setTimeout(() => {
    console.warn(
      `[SpatialEngine] Agent action timed out after ${AGENT_ACTION_TIMEOUT_MS}ms — force-resetting depth (was ${engine._agentActionDepth}).`,
    );
    engine._agentActionDepth = 0;
    engine._agentActionTimer = null;
  }, AGENT_ACTION_TIMEOUT_MS);
}

/** End a grouped agent action. The undo snapshot pushed by `beginAgentAction()`
 *  now covers all intermediate mutations. */
export function endAgentAction(engine: SpatialEngine): void {
  if (engine._agentActionDepth > 0) {
    engine._agentActionDepth--;
  }
  if (engine._agentActionDepth === 0 && engine._agentActionTimer) {
    clearTimeout(engine._agentActionTimer);
    engine._agentActionTimer = null;
  }
}

/** Run a callback inside a `begin/end` agent action with try/finally semantics.
 *  Use this from in-process JS callers (the dev-app demo, tests, etc.) so a
 *  thrown exception can never leak `_agentActionDepth`. Supports sync + async. */
export function runAgentAction<T>(engine: SpatialEngine, fn: () => T | Promise<T>): T | Promise<T> {
  engine.beginAgentAction();
  try {
    const result = fn();
    if (result && typeof (result as { then?: unknown }).then === "function") {
      return (result as Promise<T>).finally(() => engine.endAgentAction());
    }
    engine.endAgentAction();
    return result;
  } catch (err) {
    engine.endAgentAction();
    throw err;
  }
}

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
      } else if (n.type === "blocknote" && data) {
        const md = (data as BlockNoteNode["data"]).markdown;
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
