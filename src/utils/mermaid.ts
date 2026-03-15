import { nanoid } from "nanoid";
import type { EdgeNode, ShapeNode, SpatialNode, TextNode } from "../engine/types";

type MermaidDirection = "TB" | "BT" | "LR" | "RL";
type MermaidShape = "rect" | "round" | "circle" | "diamond";

interface ParsedNode {
  key: string;
  label: string;
  shape: MermaidShape;
}

interface ParsedEdge {
  fromKey: string;
  toKey: string;
  label?: string;
}

interface ParsedGraph {
  direction: MermaidDirection;
  nodes: Map<string, ParsedNode>;
  edges: ParsedEdge[];
  groups: Array<{
    label?: string;
    nodeKeys: string[];
  }>;
}

interface SequenceMessage {
  from: string;
  to: string;
  arrow: string;
  label: string;
}

interface SequenceNote {
  side: "left" | "right" | "over";
  of: string;
  text: string;
}

interface ParsedSequence {
  participants: string[];
  messages: SequenceMessage[];
  notes: Array<{ step: number; note: SequenceNote }>;
  groups: Array<{
    label?: string;
    color?: string;
    participants: string[];
  }>;
}

const NODE_KEY_RE = /^[A-Za-z][A-Za-z0-9_:-]*$/;
const PARTICIPANT_RE = /^[A-Za-z][A-Za-z0-9_]*$/;

function stripQuotes(text: string): string {
  const t = text.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1).trim();
  }
  return t;
}

function decodeLabel(text: string): string {
  return stripQuotes(text).replace(/<br\s*\/?>/gi, "\n").replace(/\\n/g, "\n");
}

function ensureNode(graph: ParsedGraph, node: ParsedNode): ParsedNode {
  const existing = graph.nodes.get(node.key);
  if (!existing) {
    graph.nodes.set(node.key, node);
    return node;
  }
  // Prefer explicit labels/shapes over fallback key-only nodes.
  if (existing.label === existing.key && node.label !== node.key) {
    existing.label = node.label;
  }
  if (existing.shape === "rect" && node.shape !== "rect") {
    existing.shape = node.shape;
  }
  return existing;
}

function parseNodeExpr(expr: string): ParsedNode | null {
  const t = expr.trim();
  if (!t) return null;

  let m = t.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  if (m) {
    return { key: m[1], label: decodeLabel(m[2]), shape: "circle" };
  }

  m = t.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/);
  if (m) {
    return { key: m[1], label: decodeLabel(m[2]), shape: "round" };
  }

  m = t.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/);
  if (m) {
    return { key: m[1], label: decodeLabel(m[2]), shape: "diamond" };
  }

  m = t.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/);
  if (m) {
    return { key: m[1], label: decodeLabel(m[2]), shape: "rect" };
  }

  if (NODE_KEY_RE.test(t)) {
    return { key: t, label: t, shape: "rect" };
  }

  return null;
}

function parseEdgeLine(line: string): { from: ParsedNode; to: ParsedNode; label?: string } | null {
  // A --|label|--> B
  let m = line.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (m) {
    const from = parseNodeExpr(m[1]);
    const to = parseNodeExpr(m[3]);
    if (!from || !to) return null;
    return { from, to, label: decodeLabel(m[2]) };
  }

  // A -- label --> B
  m = line.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/);
  if (m) {
    const from = parseNodeExpr(m[1]);
    const to = parseNodeExpr(m[3]);
    if (!from || !to) return null;
    return { from, to, label: decodeLabel(m[2]) };
  }

  // A --> B, A ==> B, A -.-> B, A --- B
  m = line.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/);
  if (m) {
    const from = parseNodeExpr(m[1]);
    const to = parseNodeExpr(m[2]);
    if (!from || !to) return null;
    return { from, to };
  }

  return null;
}

function parseDirection(headerLine: string): MermaidDirection {
  const m = headerLine.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!m) return "TB";
  const d = m[1].toUpperCase();
  if (d === "TD") return "TB";
  if (d === "TB" || d === "BT" || d === "LR" || d === "RL") return d;
  return "TB";
}

function parseSubgraphHeader(line: string): { label?: string } | null {
  const m = line.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!m) return null;
  const rest = (m[1] ?? "").trim();
  if (!rest) return {};

  // Support forms like:
  // subgraph one
  // subgraph id [Display Name]
  // subgraph "Display Name"
  const bracket = rest.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  if (bracket) return { label: decodeLabel(bracket[1]) };
  return { label: decodeLabel(rest) };
}

export function parseMermaidFlowchart(input: string): ParsedGraph {
  const directionDefault: MermaidDirection = "TB";
  const graph: ParsedGraph = { direction: directionDefault, nodes: new Map(), edges: [], groups: [] };
  const lines = input
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/%%.*$/, "").trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("Paste a Mermaid flowchart first.");
  }

  const header = lines[0];
  const looksLikeHeader = /^(flowchart|graph)\b/i.test(header);
  if (looksLikeHeader) {
    graph.direction = parseDirection(header);
    lines.shift();
  }

  const openGroups: Array<{ label?: string; nodeKeys: Set<string> }> = [];

  const addNodeToOpenGroups = (key: string) => {
    for (const g of openGroups) g.nodeKeys.add(key);
  };

  for (const raw of lines) {
    const segments = raw
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);

    for (const line of segments) {
      const g = parseSubgraphHeader(line);
      if (g) {
        openGroups.push({ label: g.label, nodeKeys: new Set<string>() });
        continue;
      }
      if (/^end\b/i.test(line)) {
        const done = openGroups.pop();
        if (done) {
          graph.groups.push({
            label: done.label,
            nodeKeys: Array.from(done.nodeKeys),
          });
        }
        continue;
      }

      const edge = parseEdgeLine(line);
      if (edge) {
        const from = ensureNode(graph, edge.from);
        const to = ensureNode(graph, edge.to);
        addNodeToOpenGroups(from.key);
        addNodeToOpenGroups(to.key);
        graph.edges.push({ fromKey: from.key, toKey: to.key, label: edge.label });
        continue;
      }

      const node = parseNodeExpr(line);
      if (node) {
        const ensured = ensureNode(graph, node);
        addNodeToOpenGroups(ensured.key);
      }
    }
  }

  while (openGroups.length > 0) {
    const done = openGroups.pop()!;
    graph.groups.push({
      label: done.label,
      nodeKeys: Array.from(done.nodeKeys),
    });
  }

  if (graph.nodes.size === 0) {
    throw new Error("Could not parse Mermaid nodes. Try simple flowchart syntax like A-->B.");
  }

  return graph;
}

function parseSequenceMessage(line: string): SequenceMessage | null {
  // Examples:
  // Alice ->> Bob: Hello
  // Bob -->> John: Ping
  // Bob --x Alice: Done
  // Alice -) Bob: Ack
  const colon = line.indexOf(":");
  if (colon < 0) return null;
  const lhs = line.slice(0, colon).trim();
  const rhs = line.slice(colon + 1).trim();
  if (!lhs || !rhs) return null;

  // Longest tokens first.
  const arrowTokens = [
    "-->>",
    "->>",
    "--x",
    "-x",
    "-->",
    "->",
    "--)",
    "-)",
    "-.->",
    "==>",
    "---",
  ];

  for (const token of arrowTokens) {
    const idx = lhs.indexOf(token);
    if (idx < 0) continue;
    const from = lhs.slice(0, idx).trim();
    const to = lhs.slice(idx + token.length).trim();
    if (!PARTICIPANT_RE.test(from) || !PARTICIPANT_RE.test(to)) continue;
    return {
      from,
      arrow: token,
      to,
      label: decodeLabel(rhs),
    };
  }
  return null;
}

function parseSequenceNote(line: string): SequenceNote | null {
  // Note right of John: ...
  const m = line.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  if (!m) return null;
  const side = m[1].toLowerCase() as "left" | "right" | "over";
  return {
    side,
    of: m[2],
    text: decodeLabel(m[3]),
  };
}

function looksLikeColorToken(token: string): boolean {
  if (!token) return false;
  if (/^#[0-9a-f]{3,8}$/i.test(token)) return true;
  if (/^(rgb|rgba|hsl|hsla)\(/i.test(token)) return true;
  const named = new Set([
    "red", "green", "blue", "purple", "pink", "orange", "yellow", "brown", "gray", "grey",
    "black", "white", "teal", "cyan", "magenta", "indigo", "violet", "gold", "silver",
    "maroon", "navy", "olive", "lime", "aqua", "fuchsia", "rebeccapurple",
  ]);
  return named.has(token.toLowerCase());
}

function parseBoxHeader(line: string): { color?: string; label?: string } | null {
  const m = line.match(/^box(?:\s+(.+))?$/i);
  if (!m) return null;
  const rest = (m[1] ?? "").trim();
  if (!rest) return {};
  const firstSpace = rest.indexOf(" ");
  const firstToken = firstSpace >= 0 ? rest.slice(0, firstSpace) : rest;
  const tail = firstSpace >= 0 ? rest.slice(firstSpace + 1).trim() : "";

  if (looksLikeColorToken(firstToken)) {
    return { color: firstToken, label: tail || undefined };
  }
  return { label: rest };
}

export function parseMermaidSequence(input: string): ParsedSequence {
  const lines = input
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/%%.*$/, "").trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  }

  if (!/^sequenceDiagram\b/i.test(lines[0])) {
    throw new Error("Not a Mermaid sequence diagram.");
  }

  const participantsSet = new Set<string>();
  const participantsOrder: string[] = [];
  const messages: SequenceMessage[] = [];
  const notes: Array<{ step: number; note: SequenceNote }> = [];
  const groups: Array<{ label?: string; color?: string; participants: Set<string> }> = [];
  const openGroups: Array<{ label?: string; color?: string; participants: Set<string> }> = [];
  let step = 0;

  const addParticipant = (id: string) => {
    if (!participantsSet.has(id)) {
      participantsSet.add(id);
      participantsOrder.push(id);
    }
    for (const g of openGroups) g.participants.add(id);
  };

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^autonumber\b/i.test(line)) continue;

    const box = parseBoxHeader(line);
    if (box) {
      openGroups.push({ label: box.label, color: box.color, participants: new Set<string>() });
      continue;
    }
    if (/^end\b/i.test(line)) {
      const done = openGroups.pop();
      if (done) groups.push(done);
      continue;
    }

    const p = line.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (p) {
      addParticipant(p[1]);
      continue;
    }

    const note = parseSequenceNote(line);
    if (note) {
      addParticipant(note.of);
      notes.push({ step, note });
      continue;
    }

    const msg = parseSequenceMessage(line);
    if (msg) {
      addParticipant(msg.from);
      addParticipant(msg.to);
      messages.push(msg);
      step += 1;
      continue;
    }
  }

  while (openGroups.length > 0) {
    const done = openGroups.pop()!;
    groups.push(done);
  }

  const participants = participantsOrder;
  if (participants.length === 0) {
    throw new Error("No participants found in sequenceDiagram.");
  }
  if (messages.length === 0 && notes.length === 0) {
    throw new Error("No messages/notes found in sequenceDiagram.");
  }

  return {
    participants,
    messages,
    notes,
    groups: groups
      .map((g) => ({
        label: g.label,
        color: g.color,
        participants: Array.from(g.participants),
      }))
      .filter((g) => g.participants.length > 0),
  };
}

function getNodeSize(shape: MermaidShape): { w: number; h: number } {
  if (shape === "diamond") return { w: 200, h: 120 };
  if (shape === "circle") return { w: 140, h: 140 };
  return { w: 200, h: 96 };
}

function computeLayers(graph: ParsedGraph): string[][] {
  const keys = Array.from(graph.nodes.keys()).sort();
  const indegree = new Map<string, number>();
  const adj = new Map<string, string[]>();
  for (const k of keys) {
    indegree.set(k, 0);
    adj.set(k, []);
  }
  for (const e of graph.edges) {
    if (!indegree.has(e.fromKey) || !indegree.has(e.toKey)) continue;
    adj.get(e.fromKey)!.push(e.toKey);
    indegree.set(e.toKey, (indegree.get(e.toKey) ?? 0) + 1);
  }

  const queue = keys.filter((k) => (indegree.get(k) ?? 0) === 0);
  const level = new Map<string, number>();
  for (const k of queue) level.set(k, 0);

  const orderedQueue = [...queue];
  while (orderedQueue.length > 0) {
    const cur = orderedQueue.shift()!;
    const curLevel = level.get(cur) ?? 0;
    for (const nxt of adj.get(cur) ?? []) {
      const nextLevel = Math.max(level.get(nxt) ?? 0, curLevel + 1);
      level.set(nxt, nextLevel);
      indegree.set(nxt, (indegree.get(nxt) ?? 0) - 1);
      if ((indegree.get(nxt) ?? 0) <= 0) {
        orderedQueue.push(nxt);
      }
    }
  }

  // Cycles/unreachable from roots: place them progressively.
  let maxLevel = 0;
  for (const v of level.values()) maxLevel = Math.max(maxLevel, v);
  for (const k of keys) {
    if (!level.has(k)) {
      maxLevel += 1;
      level.set(k, maxLevel);
    }
  }

  const layersMap = new Map<number, string[]>();
  for (const k of keys) {
    const l = level.get(k) ?? 0;
    if (!layersMap.has(l)) layersMap.set(l, []);
    layersMap.get(l)!.push(k);
  }

  return Array.from(layersMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, layerKeys]) => layerKeys.sort());
}

function buildSequenceSketchNodes(
  input: string,
  centerX: number,
  centerY: number,
  getNextZ: () => number,
): { nodes: SpatialNode[]; shapeNodeIds: string[] } {
  const seq = parseMermaidSequence(input);
  const out: SpatialNode[] = [];
  const shapeNodeIds: string[] = [];

  const participantW = 180;
  const participantH = 64;
  const xGap = 270;
  const headerY = centerY - 140;
  const lifelineTop = headerY + participantH + 8;
  const stepGap = 88;
  const totalSteps = Math.max(1, seq.messages.length);
  const lifelineBottom = lifelineTop + totalSteps * stepGap + 40;
  const footerTop = lifelineBottom + 12;
  const footerBottom = footerTop + participantH;

  const centers = new Map<string, number>();

  // Group background boxes behind participants (Mermaid `box ... end` support).
  for (const g of seq.groups) {
    const participantXs = g.participants
      .map((id) => centers.get(id))
      .filter((v): v is number => typeof v === "number");
    // If centers are not available yet, compute from participant order directly.
    if (participantXs.length === 0) {
      for (const pid of g.participants) {
        const idx = seq.participants.indexOf(pid);
        if (idx >= 0) {
          participantXs.push(centerX + (idx - (seq.participants.length - 1) / 2) * xGap);
        }
      }
    }
    if (participantXs.length === 0) continue;
    const left = Math.min(...participantXs) - participantW / 2 - 24;
    const right = Math.max(...participantXs) + participantW / 2 + 24;
    const y = headerY - 22;
    const h = footerBottom - y + 18;

    const groupBox: ShapeNode = {
      id: nanoid(10),
      type: "shape",
      x: left,
      y,
      w: right - left,
      h,
      z: getNextZ(),
      data: {
        shape: "rect",
        stroke: g.color ? g.color : "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: g.color ? g.color : "#334155",
        fillStyle: "solid",
        opacity: g.color ? 0.2 : 0.08,
        edgeStyle: "sharp",
      },
    };
    out.push(groupBox);
    shapeNodeIds.push(groupBox.id);

    if (g.label) {
      const title: TextNode = {
        id: nanoid(10),
        type: "text",
        x: left + 10,
        y: y + 8,
        w: Math.max(120, right - left - 20),
        h: "auto",
        z: getNextZ(),
        data: {
          text: g.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left",
        },
      };
      out.push(title);
    }
  }

  for (let i = 0; i < seq.participants.length; i++) {
    const p = seq.participants[i];
    const x = centerX + (i - (seq.participants.length - 1) / 2) * xGap;
    centers.set(p, x);

    const headerNode: ShapeNode = {
      id: nanoid(10),
      type: "shape",
      x: x - participantW / 2,
      y: headerY,
      w: participantW,
      h: participantH,
      z: getNextZ(),
      data: {
        shape: "rect",
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        edgeStyle: "round",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        label: p,
        labelAlign: "center",
        labelFontSize: 14,
      },
    };
    out.push(headerNode);
    shapeNodeIds.push(headerNode.id);

    const lineNode: ShapeNode = {
      id: nanoid(10),
      type: "shape",
      x: x - 1,
      y: lifelineTop,
      w: 2,
      h: lifelineBottom - lifelineTop,
      z: getNextZ(),
      data: {
        shape: "line",
        stroke: "#94a3b8",
        strokeWidth: 2,
        strokeStyle: "dashed",
        roughness: 0,
        startPoint: [1, 0],
        endPoint: [1, lifelineBottom - lifelineTop],
      },
    };
    out.push(lineNode);
    shapeNodeIds.push(lineNode.id);

    // Bottom participant box (Mermaid sequence style mirrors headers at footer).
    const footerNode: ShapeNode = {
      id: nanoid(10),
      type: "shape",
      x: x - participantW / 2,
      y: footerTop,
      w: participantW,
      h: participantH,
      z: getNextZ(),
      data: {
        shape: "rect",
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        edgeStyle: "round",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        label: p,
        labelAlign: "center",
        labelFontSize: 14,
      },
    };
    out.push(footerNode);
    shapeNodeIds.push(footerNode.id);
  }

  for (let i = 0; i < seq.messages.length; i++) {
    const m = seq.messages[i];
    const y = lifelineTop + (i + 1) * stepGap;
    const fromX = centers.get(m.from);
    const toX = centers.get(m.to);
    if (fromX == null || toX == null) continue;

    const left = Math.min(fromX, toX);
    const right = Math.max(fromX, toX);
    const width = Math.max(right - left, 40);
    const start = fromX <= toX ? 0 : width;
    const end = fromX <= toX ? width : 0;
    const isDashed = m.arrow.includes("--") || m.arrow === "-.->";
    const isCross = m.arrow.toLowerCase().includes("x");
    const isOpenArrow = m.arrow.includes(">") || m.arrow.includes(")");

    const arrowNode: ShapeNode = {
      id: nanoid(10),
      type: "shape",
      x: left,
      y: y - 14,
      w: width,
      h: 28,
      z: getNextZ(),
      data: {
        shape: "arrow",
        stroke: "#475569",
        strokeWidth: 2,
        strokeStyle: isDashed ? "dashed" : "solid",
        roughness: 0,
        startPoint: [start, 14],
        endPoint: [end, 14],
      },
    };
    out.push(arrowNode);
    shapeNodeIds.push(arrowNode.id);

    if (isOpenArrow) {
      // Keep arrowhead visually explicit.
      arrowNode.data.shape = "arrow";
    } else {
      // Fallback to line for non-arrow tokens.
      arrowNode.data.shape = "line";
    }

    // Message label as separate text node (linear shape labels are hidden).
    const labelNode: TextNode = {
      id: nanoid(10),
      type: "text",
      x: left,
      y: y - 46,
      w: width,
      h: "auto",
      z: getNextZ(),
      data: {
        text: m.label,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "center",
      },
    };
    out.push(labelNode);

    // Destroy marker (x) near message target.
    if (isCross) {
      const crossX = fromX <= toX ? left + width - 14 : left + 8;
      const crossNode: TextNode = {
        id: nanoid(10),
        type: "text",
        x: crossX,
        y: y - 20,
        w: 20,
        h: "auto",
        z: getNextZ(),
        data: {
          text: "×",
          fontSize: 16,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "center",
        },
      };
      out.push(crossNode);
    }
  }

  for (const entry of seq.notes) {
    const y = lifelineTop + (entry.step + 1) * stepGap;
    const anchorX = centers.get(entry.note.of);
    if (anchorX == null) continue;
    let x = anchorX;
    if (entry.note.side === "right") x += 130;
    if (entry.note.side === "left") x -= 300;
    if (entry.note.side === "over") x -= 110;

    const note: TextNode = {
      id: nanoid(10),
      type: "text",
      x,
      y: y - 8,
      w: 260,
      h: "auto",
      z: getNextZ(),
      data: {
        text: entry.note.text,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "left",
      },
    };
    out.push(note);
  }

  return { nodes: out, shapeNodeIds };
}

export function buildMermaidSketchNodes(
  input: string,
  centerX: number,
  centerY: number,
  getNextZ: () => number,
): { nodes: SpatialNode[]; shapeNodeIds: string[] } {
  const normalized = input.trimStart();
  if (/^sequenceDiagram\b/i.test(normalized)) {
    return buildSequenceSketchNodes(input, centerX, centerY, getNextZ);
  }

  const graph = parseMermaidFlowchart(input);
  const layers = computeLayers(graph);
  const allNodeSizes = Array.from(graph.nodes.values()).map((n) => getNodeSize(n.shape));
  const maxNodeH = allNodeSizes.length > 0 ? Math.max(...allNodeSizes.map((s) => s.h)) : 96;
  const gapPrimary = Math.max(maxNodeH + 130, 260);

  const coords = new Map<string, { x: number; y: number }>();
  const layerCount = layers.length;

  for (let li = 0; li < layers.length; li++) {
    const layer = layers[li];
    const secCount = layer.length;
    const primaryOffset = (li - (layerCount - 1) / 2) * gapPrimary;
    const layerMaxW =
      layer.length > 0
        ? Math.max(
            ...layer.map((key) => {
              const n = graph.nodes.get(key);
              return n ? getNodeSize(n.shape).w : 200;
            }),
          )
        : 200;
    const gapSecondary = Math.max(layerMaxW + 90, 260);
    for (let si = 0; si < layer.length; si++) {
      const key = layer[si];
      const secondaryOffset = (si - (secCount - 1) / 2) * gapSecondary;
      if (graph.direction === "LR" || graph.direction === "RL") {
        const x = graph.direction === "LR" ? centerX + primaryOffset : centerX - primaryOffset;
        const y = centerY + secondaryOffset;
        coords.set(key, { x, y });
      } else {
        const x = centerX + secondaryOffset;
        const y = graph.direction === "TB" ? centerY + primaryOffset : centerY - primaryOffset;
        coords.set(key, { x, y });
      }
    }
  }

  const shapeIdMap = new Map<string, string>();
  const out: SpatialNode[] = [];
  const shapeNodeIds: string[] = [];
  const nodeBoxes = new Map<string, { x: number; y: number; w: number; h: number }>();

  // Group background boxes behind nodes (`subgraph ... end` support).
  for (const g of graph.groups) {
    if (!g.nodeKeys.length) continue;
    const boxes = g.nodeKeys
      .map((key) => {
        const n = graph.nodes.get(key);
        const pos = coords.get(key);
        if (!n || !pos) return null;
        const size = getNodeSize(n.shape);
        return { x: pos.x - size.w / 2, y: pos.y - size.h / 2, w: size.w, h: size.h };
      })
      .filter((b): b is { x: number; y: number; w: number; h: number } => !!b);
    if (!boxes.length) continue;

    const left = Math.min(...boxes.map((b) => b.x)) - 30;
    const right = Math.max(...boxes.map((b) => b.x + b.w)) + 30;
    const top = Math.min(...boxes.map((b) => b.y)) - 34;
    const bottom = Math.max(...boxes.map((b) => b.y + b.h)) + 24;

    const groupBox: ShapeNode = {
      id: nanoid(10),
      type: "shape",
      x: left,
      y: top,
      w: right - left,
      h: bottom - top,
      z: getNextZ(),
      data: {
        shape: "rect",
        stroke: "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: "#334155",
        fillStyle: "solid",
        opacity: 0.12,
        edgeStyle: "sharp",
      },
    };
    out.push(groupBox);
    shapeNodeIds.push(groupBox.id);

    if (g.label) {
      const title: TextNode = {
        id: nanoid(10),
        type: "text",
        x: left + 10,
        y: top + 8,
        w: Math.max(120, right - left - 20),
        h: "auto",
        z: getNextZ(),
        data: {
          text: g.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left",
        },
      };
      out.push(title);
    }
  }

  for (const [key, node] of graph.nodes) {
    const pos = coords.get(key) ?? { x: centerX, y: centerY };
    const size = getNodeSize(node.shape);
    const shape: ShapeNode = {
      id: nanoid(10),
      type: "shape",
      x: pos.x - size.w / 2,
      y: pos.y - size.h / 2,
      w: size.w,
      h: size.h,
      z: getNextZ(),
      data: {
        shape:
          node.shape === "diamond"
            ? "diamond"
            : node.shape === "circle"
              ? "ellipse"
              : node.shape === "round"
                ? "rect"
                : "rect",
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        edgeStyle: node.shape === "round" ? "round" : "sharp",
        label: node.label,
        labelAlign: "center",
        labelFontSize: 14,
      },
    };
    out.push(shape);
    shapeNodeIds.push(shape.id);
    shapeIdMap.set(key, shape.id);
    nodeBoxes.set(key, { x: shape.x, y: shape.y, w: size.w, h: size.h });
  }

  for (const edge of graph.edges) {
    const fromId = shapeIdMap.get(edge.fromKey);
    const toId = shapeIdMap.get(edge.toKey);
    if (!fromId || !toId || fromId === toId) continue;
    const e: EdgeNode = {
      id: nanoid(10),
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: getNextZ(),
      data: {
        fromId,
        toId,
        label: edge.label,
        style: "solid",
        color: "#64748b",
        strokeWidth: 2,
        arrowHead: "arrow",
        edgeType: "bezier",
      },
    };
    out.push(e);
  }

  return { nodes: out, shapeNodeIds };
}

