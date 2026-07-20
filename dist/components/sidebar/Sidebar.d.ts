import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import type { ToolKey } from "../../engine/types";
import { TOOL_STRIP_WIDTH } from "./styles";
export { TOOL_STRIP_WIDTH as SIDEBAR_WIDTH };
interface SidebarProps {
    engine: SpatialEngine;
    registry?: NodeTypeRegistry;
    gifApiBaseUrl?: string;
    hostActive?: boolean;
    /** Toolbar-visibility allowlist (undefined ⇒ all tools). */
    tools?: ToolKey[];
    /** Render the built-in floating inspector. Default true. */
    nodeInspector?: boolean;
}
export default function Sidebar({ engine, registry, gifApiBaseUrl, hostActive, tools, nodeInspector }: SidebarProps): import("react/jsx-runtime").JSX.Element;
