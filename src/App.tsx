import { useMemo, useEffect } from "react";
import { SpatialEngine } from "./engine/SpatialEngine";
import SpatialCanvas from "./components/canvas/SpatialCanvas";
import Sidebar from "./components/sidebar/Sidebar";
import { TOOL_STRIP_WIDTH } from "./components/sidebar/styles";
import DebugPanel from "./components/overlays/DebugPanel";
import { setupKeyboardHandler } from "./interactions/keyboard-handler";
import { schema } from "./schema";

export default function App() {
  const engine = useMemo(() => new SpatialEngine(), []);

  // Expose for debugging
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__engine = engine;
  }, [engine]);

  // Keyboard shortcuts
  useEffect(() => {
    return setupKeyboardHandler(engine);
  }, [engine]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Sidebar engine={engine} />
      <DebugPanel engine={engine} />
      <div
        style={{
          position: "absolute",
          left: TOOL_STRIP_WIDTH,
          top: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <SpatialCanvas engine={engine} schema={schema} />
      </div>
    </div>
  );
}
