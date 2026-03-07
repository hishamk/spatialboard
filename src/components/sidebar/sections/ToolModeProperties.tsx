import { useState, useCallback } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { Mode, ShapeNode, TextNode } from "../../../engine/types";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import StrokeStylePicker from "../controls/StrokeStylePicker";
import WidthPicker from "../controls/WidthPicker";
import OpacitySlider from "../controls/OpacitySlider";
import FillIcon from "../controls/FillIcon";
import FontPicker from "../../FontPicker";
import { DEFAULT_FONT } from "../../../fonts";
import { useSBTheme } from "../ThemeContext";
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
          <span style={{ ...labelStyle, color: theme.textMuted }}>Font</span>
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
          <span style={{ ...labelStyle, color: theme.textMuted }}>Size</span>
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
          <span style={{ ...labelStyle, color: theme.textMuted }}>Align</span>
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
          label="Color"
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
          <span style={{ ...labelStyle, color: theme.textMuted }}>Shape</span>
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

      {/* Stroke color */}
      <PaletteColorPicker
        label="Stroke"
        palettes={STROKE_PALETTES}
        value={strokeColor}
        onChange={(c) => {
          tool.color = c!;
          refresh();
        }}
      />

      {/* Fill color */}
      <PaletteColorPicker
        label="Fill"
        palettes={FILL_PALETTES}
        value={fillColor}
        onChange={(c) => {
          tool.fillColor = c ?? undefined;
          refresh();
        }}
        allowNull
      />

      {/* Fill style */}
      {fillColor && (
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Fill pattern</span>
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
      <StrokeStylePicker
        label="Stroke style"
        value={strokeStyle}
        onChange={(s) => {
          tool.strokeStyle = s;
          refresh();
        }}
      />

      {/* Stroke width */}
      <WidthPicker
        label="Stroke width"
        value={strokeWidth}
        onChange={(w) => {
          tool.width = w;
          refresh();
        }}
      />

      {/* Roughness (shape mode only) */}
      {isShapeMode && (
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Roughness</span>
          {ROUGHNESS_LEVELS.map((r) => (
            <button
              key={r.value}
              title={r.label}
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
              {r.label}
            </button>
          ))}
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
