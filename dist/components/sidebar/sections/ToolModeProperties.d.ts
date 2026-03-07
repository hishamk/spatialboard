import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { Mode } from "../../../engine/types";
interface ToolModePropertiesProps {
    engine: SpatialEngine;
    mode: Mode;
    fontsInScene: string[];
}
export default function ToolModeProperties({ engine, mode, fontsInScene }: ToolModePropertiesProps): import("react/jsx-runtime").JSX.Element;
export {};
