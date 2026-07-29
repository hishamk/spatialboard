import type { AgentCanvasState, AgentStateOptions } from "./types";
import type { SpatialEngine } from "./SpatialEngine";
export declare function getAgentState(engine: SpatialEngine, options?: AgentStateOptions): AgentCanvasState;
export declare function getAgentStateMarkdown(engine: SpatialEngine, options?: AgentStateOptions): string;
