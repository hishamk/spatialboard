import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { SpatialNode } from "../../../engine/types";
interface CustomNodePropertiesProps {
    engine: SpatialEngine;
    node: SpatialNode;
    /** When omitted, only resolved docs (if any) is shown — for types with help but no custom panel. */
    PanelComponent?: React.ComponentType<any>;
    /** If set, inspector looks up `localization.customNodeDocs[id ?? node.type]`. */
    docs?: {
        id?: string;
    };
}
export default function CustomNodeProperties({ engine, node, PanelComponent, docs, }: CustomNodePropertiesProps): import("react/jsx-runtime").JSX.Element | null;
export {};
