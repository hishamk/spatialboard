import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import ToolStrip from "./ToolStrip";
import FloatingProperties from "./FloatingProperties";
import { TOOL_STRIP_WIDTH } from "./styles";
import { useSBI18n } from "../LocalizationContext";

export { TOOL_STRIP_WIDTH as SIDEBAR_WIDTH };

interface SidebarProps {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  gifApiBaseUrl?: string;
  hostActive?: boolean;
}

export default function Sidebar({ engine, registry, gifApiBaseUrl, hostActive }: SidebarProps) {
  const { isRTL } = useSBI18n();
  return (
    <>
      <div
        data-sb-sidebar
        style={{
          position: "absolute",
          left: isRTL ? undefined : 0,
          right: isRTL ? 0 : undefined,
          top: 0,
          bottom: 0,
          width: TOOL_STRIP_WIDTH,
          zIndex: 100,
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ToolStrip engine={engine} gifApiBaseUrl={gifApiBaseUrl} />
      </div>
      <FloatingProperties engine={engine} registry={registry} hostActive={hostActive} />
    </>
  );
}
