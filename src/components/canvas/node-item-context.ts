import type { CSSProperties } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { Mode } from "../../engine/types";
import type { NodeTypeRegistry } from "../../nodes/registry";
import type { DataFlowEngine } from "../../engine/DataFlowEngine";
import type { HandlePosition } from "./SVGLayer";
import { useSBI18n } from "../contexts/LocalizationContext";

export const UNIFIED_DOM_VIEWPORT_BASE: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

/** Shared, rarely-changing inputs for NodeItem. A new object identity
 *  re-renders every NodeItem (equivalent to the old whole-map render), so
 *  the parent memoizes it; it must not churn during pointer gestures. */
export interface NodeItemCtx {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  mode: Mode;
  zoom: number;
  selection: Set<string>;
  editingNodeId: string | null;
  editingTextId: string | null;
  editingStickyId: string | null;
  editingFrameLabelId: string | null;
  editingShapeLabelId: string | null;
  croppingImageId: string | null;
  measuredHeights: Record<string, number>;
  dataFlow?: DataFlowEngine | null;
  dataFlowVersion: number;
  labels: ReturnType<typeof useSBI18n>["labels"];
  editClickRef: React.MutableRefObject<{ clientX: number; clientY: number } | null>;
  textEditLockRef: React.MutableRefObject<{ id: string; until: number } | null>;
  newlyCreatedTextRef: React.MutableRefObject<string | null>;
  newlyCreatedBlockNoteIdRef: React.MutableRefObject<string | null>;
  getCoalesceKey: () => string;
  handleMeasuredHeight: (nodeId: string, height: number) => void;
  handleResizeHandleDown: (
    nodeId: string,
    handle: HandlePosition,
    e: React.PointerEvent<SVGRectElement | HTMLElement>,
  ) => void;
  observeElement: (el: Element, callback: (entry: ResizeObserverEntry) => void) => void;
  unobserveElement: (el: Element) => void;
  setEditingTextId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditingStickyId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditingFrameLabelId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditingShapeLabelId: React.Dispatch<React.SetStateAction<string | null>>;
  setCroppingImageId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditingYouTubeId: React.Dispatch<React.SetStateAction<string | null>>;
  setEditingTableId: React.Dispatch<React.SetStateAction<string | null>>;
}

/** Padding around multi-selection bounds (canvas units). */
export const SEL_PAD = 8;
