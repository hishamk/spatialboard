import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import { TOOL_STRIP_WIDTH } from "./styles";
export { TOOL_STRIP_WIDTH as SIDEBAR_WIDTH };
interface SidebarProps {
    engine: SpatialEngine;
    registry?: NodeTypeRegistry;
    gifApiBaseUrl?: string;
    hostActive?: boolean;
}
export default function Sidebar({ engine, registry, gifApiBaseUrl, hostActive }: SidebarProps): import("react/jsx-runtime").JSX.Element;
