import { useState, useEffect } from "react";
import type { SpatialEngine } from "../engine/SpatialEngine";
import { TEST_SBD } from "../test-data/test-board.sbd";
import { LOBBYING_SBD } from "../test-data/lobbying-board.sbd";
import { GOLDEN_AGE_ISLAM_SBD } from "../test-data/golden-age-islam-board.sbd";
import { COMPUTERS_HISTORY_SBD } from "../test-data/computers-history-board.sbd";
import { COMPUTER_LANGUAGES_SBD } from "../test-data/computer-languages-board.sbd";
import { DEEP_OCEAN_SBD } from "../test-data/deep-ocean-board.sbd";
import { runBenchmark } from "../performance-test";

const btnStyle: React.CSSProperties = {
  padding: "4px 10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 11,
};

export interface DebugBoardEntry {
  label: string;
  color: string;
  load: (engine: SpatialEngine) => void;
}

export default function DebugPanel({ engine, extraBoards }: { engine: SpatialEngine; extraBoards?: DebugBoardEntry[] }) {
  const [sbd, setSbd] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [importText, setImportText] = useState("");
  const [copied, setCopied] = useState(false);
  const [benchmarking, setBenchmarking] = useState(false);

  useEffect(() => {
    const update = () => {
      engine.toSBD().then(setSbd);
    };
    engine.on("change", update);
    update();
    return () => engine.off("change", update);
  }, [engine]);

  const handleExport = () => {
    navigator.clipboard.writeText(sbd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    engine.fromSBD(importText).then(() => setImportText(""));
  };

  const handleBenchmark = async () => {
    setBenchmarking(true);
    try {
      await runBenchmark(engine);
    } catch (e) {
      console.error(e);
      alert("Benchmark failed: " + e);
    } finally {
      setBenchmarking(false);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 48,
        right: 0,
        maxHeight: isExpanded ? 300 : 32,
        background: "#1e1e2e",
        color: "#e0e0e0",
        fontFamily: "monospace",
        fontSize: 11,
        overflow: "hidden",
        transition: "max-height 0.2s ease",
        zIndex: 100,
        borderTop: "1px solid #333",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "6px 12px",
          gap: 8,
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{isExpanded ? "\u25BC" : "\u25B2"} SBD Output</span>
        <span style={{ color: "#888", fontSize: 10 }}>
          {engine.getAllNodes().length} nodes
        </span>
        <div style={{ flex: 1 }} />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBenchmark();
          }}
          style={{ ...btnStyle, background: benchmarking ? "#f59e0b" : "#ef4444" }}
          disabled={benchmarking}
        >
          {benchmarking ? "Running..." : "Run Benchmark"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleExport();
          }}
          style={btnStyle}
        >
          {copied ? "Copied!" : "Copy SBD"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            engine.fromSBD(TEST_SBD);
          }}
          style={{ ...btnStyle, background: "#8b5cf6" }}
        >
          Load Test
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            engine.fromSBD(LOBBYING_SBD);
          }}
          style={{ ...btnStyle, background: "#ef4444" }}
        >
          Load Lobbying
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            engine.fromSBD(GOLDEN_AGE_ISLAM_SBD);
          }}
          style={{ ...btnStyle, background: "#f59e0b" }}
        >
          Load Golden Age
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            engine.fromSBD(COMPUTERS_HISTORY_SBD);
          }}
          style={{ ...btnStyle, background: "#10b981" }}
        >
          Load Computers
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            engine.fromSBD(COMPUTER_LANGUAGES_SBD);
          }}
          style={{ ...btnStyle, background: "#6366f1" }}
        >
          Load Languages
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            engine.fromSBD(DEEP_OCEAN_SBD);
          }}
          style={{ ...btnStyle, background: "#0ea5e9" }}
        >
          Load Deep Ocean
        </button>
        {extraBoards?.map((board) => (
          <button
            key={board.label}
            onClick={(e) => {
              e.stopPropagation();
              board.load(engine);
            }}
            style={{ ...btnStyle, background: board.color }}
          >
            {board.label}
          </button>
        ))}
      </div>

      {isExpanded && (
        <div
          style={{
            display: "flex",
            gap: 12,
            padding: "0 12px 12px",
            height: 250,
          }}
        >
          <pre
            style={{
              flex: 1,
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              background: "#2a2a3e",
              padding: 8,
              borderRadius: 4,
              margin: 0,
              fontSize: 11,
              lineHeight: 1.4,
            }}
          >
            {sbd}
          </pre>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste SBD markdown here to import..."
              style={{
                flex: 1,
                fontFamily: "monospace",
                fontSize: 11,
                background: "#2a2a3e",
                color: "#e0e0e0",
                border: "1px solid #444",
                borderRadius: 4,
                padding: 8,
                resize: "none",
                outline: "none",
              }}
            />
            <button onClick={handleImport} style={btnStyle}>
              Load SBD
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

