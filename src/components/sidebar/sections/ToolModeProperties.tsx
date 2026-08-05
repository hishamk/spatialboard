import { useState, useCallback } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { Mode, ShapeNode } from "../../../engine/types";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import StrokeStylePicker from "../controls/StrokeStylePicker";
import WidthPicker from "../controls/WidthPicker";
import OpacitySlider from "../controls/OpacitySlider";
import FillIcon from "../controls/FillIcon";
import FontPicker from "../../panels/FontPicker";
import { DEFAULT_FONT } from "../../../fonts";
import { useSBTheme } from "../ThemeContext";
import { useSBI18n } from "../../contexts/LocalizationContext";
import {
  rowStyle,
  labelStyle,
  btnBase,
  STROKE_PALETTES,
  FILL_PALETTES,
  FILL_STYLES,
  ROUGHNESS_LEVELS,
  FONT_SIZES,
  TEXT_ALIGNS,
  WIDTHS_DRAW,
  WIDTHS_SHAPE,
  WIDTHS_EDGE,
} from "../styles";

interface ToolModePropertiesProps {
  engine: SpatialEngine;
  mode: Mode;
  fontsInScene: string[];
}

function ShapeTypeIcon({ name, size = 16 }: { name: string; size?: number }) {
  const p = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === "rect" && <rect x="4" y="4" width="16" height="16" rx="2" {...p} />}
      {name === "ellipse" && <ellipse cx="12" cy="12" rx="9" ry="8" {...p} />}
      {name === "diamond" && <path d="M12 3l9 9-9 9-9-9z" {...p} />}
      {name === "line" && <line x1="5" y1="19" x2="19" y2="5" {...p} />}
      {name === "arrow" && (
        <>
          <line x1="5" y1="19" x2="19" y2="5" {...p} />
          <polyline points="12,5 19,5 19,12" {...p} fill="none" />
        </>
      )}
    </svg>
  );
}

const SHAPE_TYPES: { key: string; label: string }[] = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" },
];

export default function ToolModeProperties({ engine, mode, fontsInScene }: ToolModePropertiesProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [, forceUpdate] = useState(0);
  const refresh = useCallback(() => forceUpdate((n) => n + 1), []);

  const tool = engine.activeTool;

  if (mode === "text") {
    const fontFamily = tool.fontFamily ?? DEFAULT_FONT;
    const fontSize = tool.fontSize ?? 20;
    const textAlign = tool.textAlign ?? "left";
    const textColor = tool.color;

    return (
      <>
        {/* Font family */}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorFont}</span>
          <FontPicker
            value={fontFamily}
            onChange={(f: string) => {
              tool.fontFamily = f;
              refresh();
            }}
            fontsInScene={fontsInScene}
          />
        </div>

        {/* Font size */}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorSize}</span>
          {FONT_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => {
                tool.fontSize = s;
                refresh();
              }}
              style={{
                ...btnBase,
                width: 36,
                height: 28,
                background: fontSize === s ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 10,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Text align */}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorAlign}</span>
          {TEXT_ALIGNS.map((a) => (
            <button
              key={a.key}
              title={a.key}
              onClick={() => {
                tool.textAlign = a.key;
                refresh();
              }}
              style={{
                ...btnBase,
                width: 36,
                height: 28,
                background: textAlign === a.key ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 12,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Text color */}
        <PaletteColorPicker
          label={labels.inspectorStroke}
          palettes={STROKE_PALETTES}
          value={textColor}
          onChange={(c) => {
            tool.color = c!;
            refresh();
          }}
        />

        {/* Opacity */}
        <OpacitySlider
          value={tool.opacity ?? 1}
          onChange={(o) => {
            tool.opacity = o;
            refresh();
          }}
        />
      </>
    );
  }

  // Table mode — grid dimensions for the next-created table
  if (mode === "table") {
    const tableRows = tool.tableRows ?? 3;
    const tableCols = tool.tableCols ?? 3;
    const dimRow = (
      label: string,
      value: number,
      set: (n: number) => void,
      max: number,
    ) => (
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{label}</span>
        <button
          onClick={() => { set(Math.max(1, value - 1)); refresh(); }}
          style={{ ...btnBase, width: 28, height: 24, background: theme.controlBg, color: theme.text, borderRadius: theme.controlBorderRadius }}
        >
          −
        </button>
        <span style={{ minWidth: 24, textAlign: "center", fontSize: 12, color: theme.text }}>{value}</span>
        <button
          onClick={() => { set(Math.min(max, value + 1)); refresh(); }}
          style={{ ...btnBase, width: 28, height: 24, background: theme.controlBg, color: theme.text, borderRadius: theme.controlBorderRadius }}
        >
          +
        </button>
      </div>
    );
    return (
      <>
        {dimRow(labels.inspectorTableRows, tableRows, (n) => { tool.tableRows = n; }, 50)}
        {dimRow(labels.inspectorTableCols, tableCols, (n) => { tool.tableCols = n; }, 12)}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorRoughness}</span>
          {ROUGHNESS_LEVELS.map((r) => {
            const roughnessLabel =
              r.value === 0
                ? labels.roughnessArchitect
                : r.value === 1
                  ? labels.roughnessArtist
                  : labels.roughnessCartoonist;
            return (
              <button
                key={r.value}
                title={roughnessLabel}
                onClick={() => { tool.roughness = r.value; refresh(); }}
                style={{
                  ...btnBase,
                  height: 28,
                  padding: "0 8px",
                  background: (tool.roughness ?? 1) === r.value ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  fontSize: 9,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                {roughnessLabel}
              </button>
            );
          })}
        </div>
      </>
    );
  }

  // Edge mode — all edge options
  if (mode === "edge") {
    const edgeRoughness = tool.roughness ?? 0;
    return (
      <>
        {/* Stroke color */}
        <PaletteColorPicker
          label={labels.inspectorStroke}
          palettes={STROKE_PALETTES}
          value={tool.color}
          onChange={(c) => {
            tool.color = c!;
            refresh();
          }}
        />

        {/* Stroke style */}
        <StrokeStylePicker
          label={labels.inspectorStrokeStyle}
          value={tool.strokeStyle ?? "solid"}
          onChange={(s) => {
            tool.strokeStyle = s;
            refresh();
          }}
        />

        {/* Stroke width */}
        <WidthPicker
          label={labels.inspectorStrokeWidth}
          widths={WIDTHS_EDGE}
          value={tool.width}
          onChange={(w) => {
            tool.width = w;
            refresh();
          }}
        />

        {/* Arrow head */}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeHead}</span>
          {(["none", "arrow", "filled", "dot"] as const).map((v) => (
            <button
              key={v}
              onClick={() => { tool.arrowHead = v; refresh(); }}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 6px",
                background: (tool.arrowHead ?? "arrow") === v ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 11,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {v === "none" ? labels.inspectorNone : v === "arrow" ? "\u25B7" : v === "filled" ? "\u25B6" : "\u25CF"}
            </button>
          ))}
        </div>

        {/* Arrow tail */}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeTail}</span>
          {(["none", "arrow", "filled", "dot"] as const).map((v) => (
            <button
              key={v}
              onClick={() => { tool.arrowTail = v; refresh(); }}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 6px",
                background: (tool.arrowTail ?? "none") === v ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 11,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {v === "none" ? labels.inspectorNone : v === "arrow" ? "\u25C1" : v === "filled" ? "\u25C0" : "\u25CF"}
            </button>
          ))}
        </div>

        {/* Edge type */}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgePath}</span>
          {(
            [
              { key: "bezier", label: labels.edgeBezier },
              { key: "straight", label: labels.edgeStraight },
              { key: "smoothstep", label: labels.edgeSmooth },
              { key: "step", label: labels.edgeStep },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              title={t.label}
              onClick={() => { tool.edgeType = t.key; refresh(); }}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 6px",
                background: (tool.edgeType ?? "bezier") === t.key ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 9,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Roughness */}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorRoughness}</span>
          {ROUGHNESS_LEVELS.map((r) => {
            const roughnessLabel =
              r.value === 0 ? labels.roughnessArchitect
                : r.value === 1 ? labels.roughnessArtist
                  : labels.roughnessCartoonist;
            return (
              <button
                key={r.value}
                title={roughnessLabel}
                onClick={() => { tool.roughness = r.value; refresh(); }}
                style={{
                  ...btnBase,
                  height: 28,
                  padding: "0 8px",
                  background: edgeRoughness === r.value ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  fontSize: 9,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                {roughnessLabel}
              </button>
            );
          })}
        </div>

      </>
    );
  }

  // Draw or Shape mode
  const isShapeMode = mode === "shape";
  const strokeColor = tool.color;
  const fillColor = tool.fillColor ?? null;
  const fillStyle = tool.fillStyle ?? "hachure";
  const strokeStyle = tool.strokeStyle ?? "solid";
  const strokeWidth = tool.width;
  const roughness = tool.roughness ?? 1;

  return (
    <>
      {/* Shape type selector */}
      {isShapeMode && (
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorShape}</span>
          {SHAPE_TYPES.map((t) => (
            <button
              key={t.key}
              title={t.label}
              onClick={() => {
                tool.shapeType = t.key as ShapeNode["data"]["shape"];
                refresh();
              }}
              style={{
                ...btnBase,
                width: 28,
                height: 28,
                background: (tool.shapeType ?? "rect") === t.key ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              <ShapeTypeIcon name={t.key} />
            </button>
          ))}
        </div>
      )}

      {/* Brush (draw mode): pen ink vs airbrush spray */}
      {!isShapeMode && (
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorBrush}</span>
          {([
            { key: "pen" as const, label: labels.brushPen },
            { key: "airbrush" as const, label: labels.brushAirbrush },
          ]).map((b) => (
            <button
              key={b.key}
              title={b.label}
              onClick={() => {
                tool.tool = b.key;
                refresh();
              }}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 10px",
                background: (tool.tool === "airbrush" ? "airbrush" : "pen") === b.key ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 10,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      {/* Stroke color */}
      <PaletteColorPicker
        label={labels.inspectorStroke}
        palettes={STROKE_PALETTES}
        value={strokeColor}
        onChange={(c) => {
          tool.color = c!;
          refresh();
        }}
      />

      {/* Fill color — airbrush is spray-only: no fill, no dash */}
      {!(!isShapeMode && tool.tool === "airbrush") && (
      <PaletteColorPicker
        label={labels.inspectorFill}
        palettes={FILL_PALETTES}
        value={fillColor}
        onChange={(c) => {
          tool.fillColor = c ?? undefined;
          refresh();
        }}
        allowNull
      />
      )}

      {/* Fill style */}
      {!(!isShapeMode && tool.tool === "airbrush") && fillColor && (
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorFillPattern}</span>
          {FILL_STYLES.map((f) => (
            <button
              key={f.key}
              title={f.label}
              onClick={() => {
                tool.fillStyle = f.key;
                refresh();
              }}
              style={{
                ...btnBase,
                width: 36,
                height: 28,
                background: fillStyle === f.key ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 9,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              <FillIcon style={f.key} />
            </button>
          ))}
        </div>
      )}

      {/* Stroke style */}
      {!(!isShapeMode && tool.tool === "airbrush") && (
      <StrokeStylePicker
        label={labels.inspectorStrokeStyle}
        value={strokeStyle}
        onChange={(s) => {
          tool.strokeStyle = s;
          refresh();
        }}
      />
      )}

      {/* Stroke width */}
      <WidthPicker
        label={labels.inspectorStrokeWidth}
        widths={isShapeMode ? WIDTHS_SHAPE : WIDTHS_DRAW}
        value={strokeWidth}
        onChange={(w) => {
          tool.width = w;
          refresh();
        }}
      />

      {/* Roughness (shape mode only — draw nodes don't support roughness) */}
      {isShapeMode && (
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorRoughness}</span>
          {ROUGHNESS_LEVELS.map((r) => {
            const roughnessLabel =
              r.value === 0
                ? labels.roughnessArchitect
                : r.value === 1
                  ? labels.roughnessArtist
                  : labels.roughnessCartoonist;
            return (
              <button
                key={r.value}
                title={roughnessLabel}
                onClick={() => {
                  tool.roughness = r.value;
                  refresh();
                }}
                style={{
                  ...btnBase,
                  height: 28,
                  padding: "0 8px",
                  background: roughness === r.value ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  fontSize: 9,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                {roughnessLabel}
              </button>
            );
          })}
        </div>
      )}

      {/* Opacity */}
      <OpacitySlider
        value={tool.opacity ?? 1}
        onChange={(o) => {
          tool.opacity = o;
          refresh();
        }}
      />
    </>
  );
}
