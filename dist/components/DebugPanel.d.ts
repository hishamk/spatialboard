import type { SpatialEngine } from "../engine/SpatialEngine";
export interface DebugBoardEntry {
    label: string;
    color: string;
    load: (engine: SpatialEngine) => void;
}
export default function DebugPanel({ engine, extraBoards }: {
    engine: SpatialEngine;
    extraBoards?: DebugBoardEntry[];
}): import("react/jsx-runtime").JSX.Element;
