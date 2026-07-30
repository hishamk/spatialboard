import type { SpatialNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { PortDefinition, PortValue, PortDirection } from "../engine/data-flow-types";
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

/**
 * Framework-agnostic node type: behavior, spatial policy, and data-flow — NO
 * React types, so the engine, agents, and headless code can consume it. Layer
 * the DOM renderer on with `NodeTypeReactUI` via `defineReactNode`.
 */
export interface NodeTypeDef<TData = unknown> {
  type: string;

  // ── Rendering policy (React-free flags; the component lives in NodeTypeReactUI) ──
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

  /**
   * When false, hide resize handles and ignore resize gestures for this type.
   * Default true. Use for fixed-size cards (e.g. workflow step nodes).
   */
  resizable?: boolean;

  /**
   * When false, hide the rotate handle and ignore rotate gestures for this type.
   * Default true.
   */
  rotatable?: boolean;

  /**
   * Corner radius (canvas units) for the single-selection dashed outline.
   * Default 0 (sharp). Match the node's visual card radius so the chrome fits.
   */
  selectionRadius?: number;

  /**
   * When true, the node (DOM) owns the selection outline instead of the SVG
   * overlay — so the ring respects node z-order and won't paint over neighbors.
   * Typical for fixed cards with `resizable: false` / `rotatable: false`.
   */
  selectionInNode?: boolean;

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
  /**
   * Port definitions for this node type. If present, enables data-flow behavior.
   *
   * Either a STATIC array (the common case — the type has a fixed port set) OR a
   * per-node RESOLVER `(node) => PortDefinition[]` for node types whose port set
   * depends on the individual node's `data` (e.g. an N-way branch node that grows
   * one out-port per configured branch). The resolver is read at every port
   * consumer via `resolveNodePorts(def, node)`; an array-valued def resolves to
   * the exact same array, so static-port nodes are byte-identical.
   */
  ports?: PortDefinition[] | ((node: SpatialNode) => PortDefinition[]);

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

/**
 * The React UI half of a node type, kept separate so `NodeTypeDef` stays
 * framework-agnostic. `component` is optional: a compute-only / headless type
 * renders no DOM (the React host skips it).
 */
export interface NodeTypeReactUI<TData = unknown> {
  /** React component to render this node in the DOM layer. */
  component?: React.ComponentType<NodeRendererProps<TData>>;
  /** Custom properties panel shown when this node type is selected. */
  propertiesPanel?: React.ComponentType<NodePropertiesPanelProps<TData>>;
}

/** A fully-specified node type for the React board: behavior + UI. */
export type NodeTypeDefinition<TData = unknown> = NodeTypeDef<TData> &
  NodeTypeReactUI<TData>;

/** Compose a framework-agnostic def with its React UI into a board node type. */
export function defineReactNode<TData = unknown>(
  def: NodeTypeDef<TData>,
  ui: NodeTypeReactUI<TData>,
): NodeTypeDefinition<TData> {
  return { ...def, ...ui };
}

// ── Dynamic-port resolution ───────────────────────────────────

/**
 * The port set for a specific node. When `def.ports` is a static array it is
 * returned verbatim (byte-identical to the pre-dynamic behavior); when it is a
 * `(node) => PortDefinition[]` resolver it is invoked with the node. Returns
 * `undefined` for a non-data-flow type (no `ports`). This is the single seam
 * every port consumer reads through so a node type can grow/shrink ports per
 * instance (e.g. an N-way branch node).
 */
export function resolveNodePorts(
  def: NodeTypeDef<unknown> | undefined,
  node: SpatialNode | undefined,
): PortDefinition[] | undefined {
  const p = def?.ports;
  if (!p) return undefined;
  if (typeof p === "function") return node ? p(node) : [];
  return p;
}

/**
 * Whether a node type participates in data-flow (declares ports) — presence is
 * TYPE-level, so this holds for both array- and resolver-valued `ports` without
 * needing a node instance. Prefer this over `def.ports?.length` (a resolver is a
 * function whose `.length` is its arity, not a port count).
 */
export function nodeTypeHasPorts(
  def: NodeTypeDef<unknown> | undefined,
): boolean {
  const p = def?.ports;
  return typeof p === "function" || (Array.isArray(p) && p.length > 0);
}

// ── Agent / MCP catalog (JSON-safe) ───────────────────────────

/** Built-in SpatialBoard node `type` strings — anything else is embedder-defined (“custom”). */
const SPATIALBOARD_BUILTIN_TYPE_IDS = new Set<string>([
  "blocknote",
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
  direction: PortDirection;
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
    isDataFlow: nodeTypeHasPorts(def),
    // The catalog is a TYPE-level description; a resolver-valued `ports` has no
    // single instance to resolve against, so it contributes an empty port list
    // (still flagged data-flow via isDataFlow).
    ports: (Array.isArray(def.ports) ? def.ports : []).map((p) => ({
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
