import type { SpatialNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { PortDefinition, PortValue } from "../engine/data-flow-types";
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
    editClickPos?: {
        clientX: number;
        clientY: number;
    } | null;
    callbacks: NodeCallbacks;
    /** Current resolved port values for this node (inputs + outputs). */
    portValues?: Record<string, PortValue>;
    /** Update node data (with undo history). */
    updateData: (patch: Partial<TData>) => void;
}
export interface NodeCallbacks {
    onMeasuredHeight?: (nodeId: string, height: number) => void;
    onResizeHandleDown?: (nodeId: string, handle: string, e: React.PointerEvent) => void;
    onEditStart?: (nodeId: string) => void;
    onEditEnd?: () => void;
}
export interface NodePropertiesPanelProps<TData = unknown> {
    node: SpatialNode;
    data: TData;
    engine: SpatialEngine;
    /** Update node data (with undo history). */
    updateData: (patch: Partial<TData>) => void;
}
export interface NodeTypeDefinition<TData = unknown> {
    type: string;
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
    /** Custom hit testing. Default: bounding box with 4px tolerance. */
    hitTest?: (node: SpatialNode, canvasX: number, canvasY: number, zoom: number) => boolean;
    /** Extra hit padding in canvas units (e.g., stroke width for draw nodes). */
    getHitPadding?: (node: SpatialNode) => number;
    /** Text representation for clipboard copy operations. */
    getClipboardText?: (node: SpatialNode) => string | null;
    /** Custom properties panel shown when this node type is selected. */
    propertiesPanel?: React.ComponentType<NodePropertiesPanelProps<TData>>;
    /** Called after a node of this type is added to the engine. */
    onCreate?: (node: SpatialNode, engine: SpatialEngine) => void;
    /** Called before a node of this type is removed from the engine. */
    onDelete?: (node: SpatialNode, engine: SpatialEngine) => void;
    /** Called when a node of this type is moved (after position update). */
    onMove?: (node: SpatialNode, dx: number, dy: number, engine: SpatialEngine) => void;
    /** Called during resize. Return partial data update (e.g., scale points). */
    onResize?: (node: SpatialNode, scaleX: number, scaleY: number, engine: SpatialEngine) => Partial<TData> | null;
    /** Called when a node of this type is rotated. */
    onRotate?: (node: SpatialNode, newAngle: number, engine: SpatialEngine) => void;
    /** Called when a node of this type is flipped. Return partial data update. */
    onFlip?: (node: SpatialNode, direction: "h" | "v", engine: SpatialEngine) => Partial<TData>;
    /** Called when a node of this type is selected. */
    onSelect?: (node: SpatialNode, engine: SpatialEngine) => void;
    /** Called when a node of this type is deselected. */
    onDeselect?: (node: SpatialNode, engine: SpatialEngine) => void;
    /** Called when node.data is updated. */
    onDataChange?: (node: SpatialNode, oldData: TData, newData: TData, engine: SpatialEngine) => void;
    /** Port definitions for this node type. If present, enables data-flow behavior. */
    ports?: PortDefinition[];
    /** Pure compute function. Called when input port values change.
     *  Receives: inputs (keyed by port id) and current node data.
     *  Returns: outputs (keyed by port id). */
    compute?: (inputs: Record<string, PortValue>, data: TData) => Record<string, PortValue> | Promise<Record<string, PortValue>>;
}
export declare class NodeTypeRegistry {
    private types;
    constructor(defs?: NodeTypeDefinition<any>[]);
    register(def: NodeTypeDefinition<any>): void;
    get(type: string): NodeTypeDefinition<any> | undefined;
    getAll(): NodeTypeDefinition<any>[];
    /** Returns type strings for nodes that render in the DOM layer (not SVG-only). */
    getDOMTypes(): Set<string>;
    has(type: string): boolean;
}
