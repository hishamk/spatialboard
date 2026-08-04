import { useContext } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { DrawNode } from "../../../engine/types";
import { MultiNodeContext, useBatchUpdate } from "../MultiNodeContext";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import StrokeStylePicker from "../controls/StrokeStylePicker";
import WidthPicker from "../controls/WidthPicker";
import OpacitySlider from "../controls/OpacitySlider";
import FillIcon from "../controls/FillIcon";
import { useSBTheme } from "../ThemeContext";
import { useSBI18n } from "../../contexts/LocalizationContext";
import {
  rowStyle,
  labelStyle,
  btnBase,
  STROKE_PALETTES,
  FILL_PALETTES,
  FILL_STYLES,
  WIDTHS_DRAW,
} from "../styles";

interface DrawPropertiesProps {
  engine: SpatialEngine;
  node: DrawNode;
}

/** Returns true if the given property differs across all nodes in the group. */
function isMixed<T>(nodes: DrawNode[], get: (n: DrawNode) => T): boolean {
  if (nodes.length < 2) return false;
  const first = get(nodes[0]);
  return !nodes.every((n) => get(n) === first);
}

export default function DrawProperties({ engine, node }: DrawPropertiesProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const update = useBatchUpdate<DrawNode["data"]>(engine, node);
  const allNodes = (useContext(MultiNodeContext) ?? [node]) as DrawNode[];

  const { data } = node;
  const fillColor = data.fill ?? null;
  const fillStyle = data.fillStyle ?? "hachure";
  const strokeStyle = data.strokeStyle ?? "solid";

  const mixedColor       = isMixed(allNodes, (n) => n.data.color);
  const mixedFill        = isMixed(allNodes, (n) => n.data.fill ?? null);
  const mixedFillStyle   = isMixed(allNodes, (n) => n.data.fillStyle ?? "hachure");
  const mixedStrokeStyle = isMixed(allNodes, (n) => n.data.strokeStyle ?? "solid");
  const mixedStrokeWidth = isMixed(allNodes, (n) => n.data.strokeWidth);
  const mixedOpacity     = isMixed(allNodes, (n) => n.data.opacity ?? 1);

  const brush = data.tool === "airbrush" ? "airbrush" : "pen";
  const mixedBrush = isMixed(allNodes, (n) => (n.data.tool === "airbrush" ? "airbrush" : "pen"));
  // Spray has no fill and no dash — hide those controls when the whole
  // selection is airbrush (mixed selections keep them for the pen strokes).
  const allAirbrush = !mixedBrush && brush === "airbrush";

  return (
    <>
      {/* Brush: pen ink vs airbrush spray (points are stored raw, so
          existing strokes convert freely) */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorBrush}</span>
        {([
          { key: "pen" as const, label: labels.brushPen },
          { key: "airbrush" as const, label: labels.brushAirbrush },
        ]).map((b) => (
          <button
            key={b.key}
            title={b.label}
            onClick={() => update({ tool: b.key })}
            style={{
              ...btnBase,
              height: 28,
              padding: "0 10px",
              background: !mixedBrush && brush === b.key ? theme.controlBgActive : theme.controlBg,
              color: theme.text,
              fontSize: 10,
              borderRadius: theme.controlBorderRadius,
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Stroke color */}
      <PaletteColorPicker
        label={labels.inspectorStroke}
        palettes={STROKE_PALETTES}
        value={mixedColor ? undefined : data.color}
        mixed={mixedColor}
        onChange={(c) => update({ color: c! })}
      />

      {/* Fill color */}
      {!allAirbrush && (
      <PaletteColorPicker
        label={labels.inspectorFill}
        palettes={FILL_PALETTES}
        value={mixedFill ? undefined : fillColor}
        mixed={mixedFill}
        onChange={(c) => update({ fill: c ?? undefined })}
        allowNull
      />
      )}

      {/* Fill style (only when fill is set and not mixed) */}
      {!allAirbrush && fillColor && !mixedFill && (
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorFillPattern}</span>
          {FILL_STYLES.map((f) => (
            <button
              key={f.key}
              title={f.label}
              onClick={() => update({ fillStyle: f.key })}
              style={{
                ...btnBase,
                width: 36,
                height: 28,
                background: !mixedFillStyle && fillStyle === f.key ? theme.controlBgActive : theme.controlBg,
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
      {!allAirbrush && (
      <StrokeStylePicker
        label={labels.inspectorStrokeStyle}
        value={strokeStyle}
        mixed={mixedStrokeStyle}
        onChange={(s) => update({ strokeStyle: s })}
      />
      )}

      {/* Stroke width */}
      <WidthPicker
        label={labels.inspectorStrokeWidth}
        widths={WIDTHS_DRAW}
        value={data.strokeWidth}
        mixed={mixedStrokeWidth}
        onChange={(w) => update({ strokeWidth: w })}
      />

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        mixed={mixedOpacity}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
