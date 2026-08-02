import { useState, useEffect } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import { PAPER_TYPES } from "../paper-types";
import { rowStyle, labelStyle } from "./styles";
import { useSBTheme } from "./ThemeContext";
import { useSBI18n } from "../contexts/LocalizationContext";

/**
 * Board-level canvas settings (grid, guides, free-form edges, paper).
 * Lived in the inspector's CANVAS section historically; now shared by the
 * tool rail's gear popover (desktop) and the mobile ⋯ menu — board settings
 * don't belong in a per-node inspector.
 */
export default function CanvasSettings({ engine }: { engine: SpatialEngine }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [gridOn, setGridOn] = useState(engine.snapToGrid);
  const [gridSize, setGridSize] = useState(engine.gridSize);
  const [smartGuides, setSmartGuides] = useState(engine.smartGuides);
  const [freeFormEdges, setFreeFormEdges] = useState(engine.freeFormEdges);
  const [paper, setPaper] = useState(engine.boardBackground);
  const paperLabelByKey: Record<string, string> = {
    "plain-white": labels.paperWhite,
    "dot-grid": labels.paperCream,
    engineering: labels.paperWarm,
    blueprint: labels.paperBlueprint,
    "dark-grid": labels.paperNight,
    "japanese-stationery": labels.paperJapaneseStationery,
    kraft: labels.paperKraftPaper,
  };

  useEffect(() => {
    const syncGuides = () => {
      setGridOn(engine.snapToGrid);
      setGridSize(engine.gridSize);
      setSmartGuides(engine.smartGuides);
      setFreeFormEdges(engine.freeFormEdges);
    };
    const syncChange = () => setFreeFormEdges(engine.freeFormEdges);
    engine.on("change", syncChange);
    const syncBackground = () => setPaper(engine.boardBackground);
    engine.on("guides", syncGuides);
    engine.on("background", syncBackground);
    return () => {
      engine.off("guides", syncGuides);
      engine.off("background", syncBackground);
      engine.off("change", syncChange);
    };
  }, [engine]);

  const gridSizes = [10, 20, 40, 80];

  const toggleBtn = (active: boolean): React.CSSProperties => ({
    border: "none",
    borderRadius: theme.controlBorderRadius,
    background: active ? theme.controlBgActive : theme.controlBg,
    color: theme.text,
    fontSize: "var(--sbp-label-fs, 10px)",
    padding: "var(--sbp-toggle-pad, 4px 10px)",
    cursor: "pointer",
    touchAction: "manipulation",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sbp-row-gap, 8px)" }}>
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorGrid}</span>
        <button onClick={() => engine.toggleSnapToGrid()} style={toggleBtn(gridOn)}>
          {gridOn ? labels.inspectorOn : labels.inspectorOff}
        </button>
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorGridSize}</span>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }}>
          {gridSizes.map((s) => (
            <button
              key={s}
              onClick={() => engine.setGridSize(s)}
              style={{ ...toggleBtn(gridSize === s), padding: "var(--sbp-toggle-pad, 4px 8px)" }}
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorGuides}</span>
        <button onClick={() => engine.toggleSmartGuides()} style={toggleBtn(smartGuides)}>
          {smartGuides ? labels.inspectorOn : labels.inspectorOff}
        </button>
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Free edges</span>
        <button onClick={() => engine.toggleFreeFormEdges()} style={toggleBtn(freeFormEdges)}>
          {freeFormEdges ? labels.inspectorOn : labels.inspectorOff}
        </button>
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorPaper}</span>
        <select
          value={paper}
          onChange={(e) => engine.setBoardBackground(e.target.value as typeof paper)}
          style={{
            flex: 1,
            minWidth: 0,
            height: "var(--sbp-ctl-h, 28px)",
            border: `1px solid ${theme.border}`,
            borderRadius: theme.controlBorderRadius,
            background: theme.controlBg,
            color: theme.text,
            fontSize: "var(--sbp-label-fs, 11px)",
            padding: "0 8px",
            outline: "none",
          }}
        >
          {PAPER_TYPES.map((p) => (
            <option key={p.key} value={p.key}>
              {paperLabelByKey[p.key] ?? p.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
