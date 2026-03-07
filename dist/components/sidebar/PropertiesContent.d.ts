import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import type { SelectionTarget, MergedCommonProps } from "./useMultiSelection";
export declare function getHeaderLabel(target: SelectionTarget): string;
interface PropertiesContentProps {
    engine: SpatialEngine;
    registry?: NodeTypeRegistry;
    target: SelectionTarget;
    commonProps: MergedCommonProps;
}
export default function PropertiesContent({ engine, registry, target, commonProps, }: PropertiesContentProps): import("react/jsx-runtime").JSX.Element;
export {};
