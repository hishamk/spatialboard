import type { SpatialNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { PortDefinition, PortValue } from "../engine/data-flow-types";
import type { PortAnchorMode } from "../engine/edge-geometry";

// ── Renderer props passed to every node component ────────────

export interface NodeRendererProps<TData = unknown> {
  node: SpatialNode;
  data: TData;
  isSelected: boolean;
  multiSelected: boolean;
  engine: SpatialEngine;
  interactive: boolean;
  zoom: number;
  /** Whether this node is currently in inline-edit mode. */
  editing: boolean;
  /** Image crop mode — independent of `editing` so crop works alongside other edit slots. */
  cropping?: boolean;
  /** Pointer position that initiated editing (for cursor placement in text). */
  editClickPos?: { clientX: number; clientY: number } | null;
  callbacks: NodeCallbacks;
  /** Current resolved port values for this node (inputs + outputs). */
  portValues?: Record<string, PortValue>;
  /** Update node data (with undo history). */
  updateData: (patch: Partial<TData>) => void;
}

export interface NodeCallbacks {
  onMeasuredHeight?: (nodeId: string, height: number) => void;
  onResizeHandleDown?: (
    nodeId: string,
    handle: string,
    e: React.PointerEvent,
  ) => void;
  onEditStart?: (nodeId: string) => void;
  onEditEnd?: () => void;
}

// ── Properties panel props ───────────────────────────────────

export interface NodePropertiesPanelProps<TData = unknown> {
  node: SpatialNode;
  data: TData;
  engine: SpatialEngine;
  /** Update node data (with undo history). */
  updateData: (patch: Partial<TData>) => void;
}

// ── Node type definition ─────────────────────────────────────

export interface NodeTypeDefinition<TData = unknown> {
  type: string;

  // ── Rendering ──────────────────────────────────────
  /** React component to render this node in the DOM layer. */
  component: React.ComponentType<NodeRendererProps<TData>>;

  /** If true, this node is excluded from the main DOM render loop
   *  and only rendered via SVGLayer (like edges). Default: false. */
  isSVGOnly?: boolean;

  /** If true, the component handles its own absolute positioning and sizing.
   *  Built-in types set this to true. Custom nodes should leave it false (default)
   *  to get automatic canvas positioning from the wrapper. */
  handlesOwnLayout?: boolean;

  /** If true, this node type behaves as a container (like Frame).
   *  Contained nodes move with the container, hit-testing prefers children
   *  over the container, and spatial membership is tracked. */
  isContainer?: boolean;

  // ── Spatial behavior ───────────────────────────────
  /** Custom hit testing. Default: bounding box with 4px tolerance. */
  hitTest?: (
    node: SpatialNode,
    canvasX: number,
    canvasY: number,
    zoom: number,
  ) => boolean;

  /** Extra hit padding in canvas units (e.g., stroke width for draw nodes). */
  getHitPadding?: (node: SpatialNode) => number;

  /** Text representation for clipboard copy operations. */
  getClipboardText?: (node: SpatialNode) => string | null;

  // ── Properties panel ─────────────────────────────────
  /** Custom properties panel shown when this node type is selected. */
  propertiesPanel?: React.ComponentType<NodePropertiesPanelProps<TData>>;

  /**
   * Optional in-inspector help (?): strings come from `localization.customNodeDocs[key]`
   * where `key` is `docs.id` or defaults to this node’s `type`. Embedders pass copy via
   * `SpatialBoard` `localization`.
   */
  docs?: {
    /** Localization key; defaults to `type`. */
    id?: string;
  };

  // ── Lifecycle hooks ────────────────────────────────
  // Called by the engine at the right moments. All optional.
  // These let custom node types react to spatial events without
  // needing to subscribe to engine events and filter by type.

  /** Called after a node of this type is added to the engine. */
  onCreate?: (node: SpatialNode, engine: SpatialEngine) => void;

  /** Called before a node of this type is removed from the engine. */
  onDelete?: (node: SpatialNode, engine: SpatialEngine) => void;

  /** Called when a node of this type is moved (after position update). */
  onMove?: (
    node: SpatialNode,
    dx: number,
    dy: number,
    engine: SpatialEngine,
  ) => void;

  /** Called during resize. Return partial data update (e.g., scale points). */
  onResize?: (
    node: SpatialNode,
    scaleX: number,
    scaleY: number,
    engine: SpatialEngine,
  ) => Partial<TData> | null;

  /** Called when a node of this type is rotated. */
  onRotate?: (
    node: SpatialNode,
    newAngle: number,
    engine: SpatialEngine,
  ) => void;

  /** Called when a node of this type is flipped. Return partial data update. */
  onFlip?: (
    node: SpatialNode,
    direction: "h" | "v",
    engine: SpatialEngine,
  ) => Partial<TData>;

  /** Called when a node of this type is selected. */
  onSelect?: (node: SpatialNode, engine: SpatialEngine) => void;

  /** Called when a node of this type is deselected. */
  onDeselect?: (node: SpatialNode, engine: SpatialEngine) => void;

  /** Called when node.data is updated. */
  onDataChange?: (
    node: SpatialNode,
    oldData: TData,
    newData: TData,
    engine: SpatialEngine,
  ) => void;

  // ── Data-flow ports ──────────────────────────────
  /** Port definitions for this node type. If present, enables data-flow behavior. */
  ports?: PortDefinition[];

  /**
   * Where ports attach horizontally: `bbox` uses the full node rect (default).
   * `inscribed-circle` uses the circle inscribed in `min(w,h)` — for round nodes
   * drawn inside a square card so ports sit on the visible disc, not the box edge.
   */
  portAnchor?: PortAnchorMode;

  /** Pure compute function. Called when input port values change.
   *  Receives: inputs (keyed by port id) and current node data.
   *  Returns: outputs (keyed by port id). */
  compute?: (
    inputs: Record<string, PortValue>,
    data: TData,
  ) => Record<string, PortValue> | Promise<Record<string, PortValue>>;
}

// ── Agent / MCP catalog (JSON-safe) ───────────────────────────

/** Built-in SpatialBoard node `type` strings — anything else is embedder-defined (“custom”). */
const SPATIALBOARD_BUILTIN_TYPE_IDS = new Set<string>([
  "content",
  "draw",
  "shape",
  "edge",
  "image",
  "text",
  "frame",
  "sticky",
  "youtube",
]);

/** One port row in `SpatialNodeTypeCatalogEntry`. */
export interface SpatialNodeTypeCatalogPort {
  id: string;
  label?: string;
  direction: "input" | "output";
  dataType: string;
  defaultValue?: unknown;
}

/**
 * Serializable description of a registered node type (for agents, MCP, docs).
 * Use `NodeTypeRegistry.toCatalog()` or `SpatialEngine.getNodeTypeCatalog()`.
 */
export interface SpatialNodeTypeCatalogEntry {
  /** `engine.addNode({ type })` value. */
  type: string;
  /** `builtin` = shipped with spatialboard; `custom` = from app `nodeTypes`. */
  origin: "builtin" | "custom";
  /**
   * Key for `SpatialBoard` `localization.customNodeDocs` (from `docs.id`, else `type`).
   */
  docsLocalizationKey: string;
  /** Has `ports` — participates in data-flow when the board wires edges to port ids. */
  isDataFlow: boolean;
  ports: SpatialNodeTypeCatalogPort[];
  portAnchor?: PortAnchorMode;
  hasCompute: boolean;
  isContainer: boolean;
  isSVGOnly: boolean;
  handlesOwnLayout: boolean;
  hasPropertiesPanel: boolean;
}

function catalogEntryFromDefinition(
  def: NodeTypeDefinition,
): SpatialNodeTypeCatalogEntry {
  const docsLocalizationKey = def.docs?.id ?? def.type;
  return {
    type: def.type,
    origin: SPATIALBOARD_BUILTIN_TYPE_IDS.has(def.type) ? "builtin" : "custom",
    docsLocalizationKey,
    isDataFlow: Boolean(def.ports?.length),
    ports: (def.ports ?? []).map((p) => ({
      id: p.id,
      label: p.label,
      direction: p.direction,
      dataType: p.dataType,
      defaultValue: p.defaultValue,
    })),
    portAnchor: def.portAnchor,
    hasCompute: typeof def.compute === "function",
    isContainer: Boolean(def.isContainer),
    isSVGOnly: Boolean(def.isSVGOnly),
    handlesOwnLayout: Boolean(def.handlesOwnLayout),
    hasPropertiesPanel: typeof def.propertiesPanel === "function",
  };
}

// ── Registry ─────────────────────────────────────────────────

export class NodeTypeRegistry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private types = new Map<string, NodeTypeDefinition<any>>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(defs?: NodeTypeDefinition<any>[]) {
    if (defs) {
      for (const def of defs) this.register(def);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(def: NodeTypeDefinition<any>): void {
    this.types.set(def.type, def);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(type: string): NodeTypeDefinition<any> | undefined {
    return this.types.get(type);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll(): NodeTypeDefinition<any>[] {
    return Array.from(this.types.values());
  }

  /**
   * JSON-safe list of every registered type, sorted by `type`.
   * For MCP / LLM agents: pair with app `localization.customNodeDocs` for prose usage hints.
   */
  toCatalog(): SpatialNodeTypeCatalogEntry[] {
    return this.getAll()
      .map((def) => catalogEntryFromDefinition(def))
      .sort((a, b) => a.type.localeCompare(b.type));
  }

  /** Returns type strings for nodes that render in the DOM layer (not SVG-only). */
  getDOMTypes(): Set<string> {
    const set = new Set<string>();
    for (const def of this.types.values()) {
      if (!def.isSVGOnly) set.add(def.type);
    }
    return set;
  }

  has(type: string): boolean {
    return this.types.has(type);
  }
}
