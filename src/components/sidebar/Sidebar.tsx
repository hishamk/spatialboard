import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import type { ToolKey } from "../../engine/types";
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
  /** Toolbar-visibility allowlist (undefined ⇒ all tools). */
  tools?: ToolKey[];
  /** Render the built-in floating inspector. Default true. */
  nodeInspector?: boolean;
  /** Render the vertical tool rail. Default true; false when the host seats the
   *  tools in the BottomBar instead (SpatialBoard `toolsInBottomBar`) — the
   *  floating inspector still renders per `nodeInspector`. */
  toolStrip?: boolean;
}

export default function Sidebar({ engine, registry, gifApiBaseUrl, hostActive, tools, nodeInspector = true, toolStrip = true }: SidebarProps) {
  const { isRTL } = useSBI18n();
  return (
    <>
      {toolStrip && (
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
          <ToolStrip engine={engine} gifApiBaseUrl={gifApiBaseUrl} tools={tools} />
        </div>
      )}
      {nodeInspector && <FloatingProperties engine={engine} registry={registry} hostActive={hostActive} />}
    </>
  );
}
