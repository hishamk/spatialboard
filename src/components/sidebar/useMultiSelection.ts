import { useState, useEffect } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { SpatialNode, Mode } from "../../engine/types";

export interface TypeGroup {
  type: string;
  nodes: SpatialNode[];
}

export type SelectionTarget =
  | { kind: "none" }
  | { kind: "tool"; mode: Mode }
  | { kind: "single"; node: SpatialNode }
  | { kind: "multi"; nodes: SpatialNode[]; typeGroups: TypeGroup[] };

export interface MergedCommonProps {
  opacity?: number | "mixed";
  borderColor?: string | null | "mixed";
  borderWidth?: number | "mixed";
  borderStyle?: "solid" | "dashed" | "dotted" | "mixed";
}

const OPACITY_TYPES = new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]);
const BORDER_TYPES = new Set(["text", "image", "content", "frame"]);

function getOpacity(node: SpatialNode): number {
  const data = node.data as Record<string, unknown>;
  return (data.opacity as number) ?? 1;
}

function getBorderProp(node: SpatialNode, prop: string): unknown {
  const data = node.data as Record<string, unknown>;
  return data[prop];
}

function computeCommonProps(nodes: SpatialNode[]): MergedCommonProps {
  const result: MergedCommonProps = {};

  // Opacity — for all non-edge types
  const opacityNodes = nodes.filter((n) => OPACITY_TYPES.has(n.type));
  if (opacityNodes.length > 0) {
    const first = getOpacity(opacityNodes[0]);
    const allSame = opacityNodes.every((n) => getOpacity(n) === first);
    result.opacity = allSame ? first : "mixed";
  }

  // Border props — for text, image, content, frame
  const borderNodes = nodes.filter((n) => BORDER_TYPES.has(n.type));
  if (borderNodes.length > 0) {
    // borderColor
    const firstColor = getBorderProp(borderNodes[0], "borderColor") as string | undefined;
    const allColorSame = borderNodes.every(
      (n) => (getBorderProp(n, "borderColor") as string | undefined) === firstColor
    );
    result.borderColor = allColorSame ? (firstColor ?? null) : "mixed";

    // borderWidth
    const firstWidth = (getBorderProp(borderNodes[0], "borderWidth") as number) ?? 1;
    const allWidthSame = borderNodes.every(
      (n) => ((getBorderProp(n, "borderWidth") as number) ?? 1) === firstWidth
    );
    result.borderWidth = allWidthSame ? firstWidth : "mixed";

    // borderStyle
    const firstStyle = (getBorderProp(borderNodes[0], "borderStyle") as string) ?? "solid";
    const allStyleSame = borderNodes.every(
      (n) => ((getBorderProp(n, "borderStyle") as string) ?? "solid") === firstStyle
    );
    result.borderStyle = allStyleSame
      ? (firstStyle as "solid" | "dashed" | "dotted")
      : "mixed";
  }

  return result;
}

export function useMultiSelection(engine: SpatialEngine): {
  target: SelectionTarget;
  commonProps: MergedCommonProps;
} {
  const [mode, setMode] = useState<Mode>(engine.mode);
  const [selection, setSelection] = useState<Set<string>>(new Set(engine.selection));
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const onMode = () => setMode(engine.mode);
    const onSelection = () => {
      setSelection(new Set(engine.selection));
      forceUpdate((n) => n + 1);
    };
    const onChange = () => forceUpdate((n) => n + 1);
    engine.on("mode", onMode);
    engine.on("selection", onSelection);
    engine.on("change", onChange);
    return () => {
      engine.off("mode", onMode);
      engine.off("selection", onSelection);
      engine.off("change", onChange);
    };
  }, [engine]);

  // Compute on every render — node data can change via onChange without
  // selection/mode changing, so useMemo would return stale references.
  if (selection.size === 0) {
    if (mode === "draw" || mode === "shape" || mode === "text") {
      return { target: { kind: "tool" as const, mode }, commonProps: {} };
    }
    return { target: { kind: "none" as const }, commonProps: {} };
  }

  // Resolve nodes
  const nodes: SpatialNode[] = [];
  for (const id of selection) {
    const node = engine.getNode(id);
    if (node) nodes.push(node);
  }

  if (nodes.length === 0) {
    return { target: { kind: "none" as const }, commonProps: {} };
  }

  if (nodes.length === 1) {
    return { target: { kind: "single" as const, node: nodes[0] }, commonProps: {} };
  }

  // Multi-selection: group by type
  const groups = new Map<string, SpatialNode[]>();
  for (const node of nodes) {
    const arr = groups.get(node.type);
    if (arr) arr.push(node);
    else groups.set(node.type, [node]);
  }

  const typeGroups: TypeGroup[] = [];
  for (const [type, groupNodes] of groups) {
    typeGroups.push({ type, nodes: groupNodes });
  }

  const commonProps = computeCommonProps(nodes);

  return {
    target: { kind: "multi" as const, nodes, typeGroups },
    commonProps,
  };
}
