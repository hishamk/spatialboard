import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import ToolStrip from "./ToolStrip";
import FloatingProperties from "./FloatingProperties";
import { TOOL_STRIP_WIDTH } from "./styles";

export { TOOL_STRIP_WIDTH as SIDEBAR_WIDTH };

interface SidebarProps {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  gifApiBaseUrl?: string;
}

export default function Sidebar({ engine, registry, gifApiBaseUrl }: SidebarProps) {
  return (
    <>
      <div
        data-sb-sidebar
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: TOOL_STRIP_WIDTH,
          zIndex: 100,
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ToolStrip engine={engine} gifApiBaseUrl={gifApiBaseUrl} />
      </div>
      <FloatingProperties engine={engine} registry={registry} />
    </>
  );
}
