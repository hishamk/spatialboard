/**
 * Debug-panel exemplar boards for this dev-app.
 * Layout implementations live in `src/exemplars/`.
 */
import type { DebugBoardEntry } from "spatialboard";
import {
  loadApiConstellationBoard,
  loadHalfAdderBoard,
  loadLayoutExemplarBoard,
  loadMissionControlBoard,
  loadWhiteboardBoard,
  loadDeckBoard,
} from "./exemplars";

export const exemplarDebugBoards: DebugBoardEntry[] = [
  { label: "Packet Observatory", color: "#22d3ee", load: (eng) => loadApiConstellationBoard(eng) },
  { label: "Half adder", color: "#eab308", load: (eng) => loadHalfAdderBoard(eng) },
  { label: "Layout exemplar", color: "#38bdf8", load: (eng) => loadLayoutExemplarBoard(eng) },
  { label: "Mission Control", color: "#d946ef", load: (eng) => loadMissionControlBoard(eng) },
  { label: "Whiteboard", color: "#f97316", load: (eng) => loadWhiteboardBoard(eng) },
  { label: "Deck", color: "#0ea5e9", load: (eng) => loadDeckBoard(eng) },
];
