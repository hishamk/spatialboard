import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { DrawNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import StrokeStylePicker from "../controls/StrokeStylePicker";
import WidthPicker from "../controls/WidthPicker";
import OpacitySlider from "../controls/OpacitySlider";
import FillIcon from "../controls/FillIcon";
import { useSBTheme } from "../ThemeContext";
import {
  rowStyle,
  labelStyle,
  btnBase,
  STROKE_PALETTES,
  FILL_PALETTES,
  FILL_STYLES,
} from "../styles";

interface DrawPropertiesProps {
  engine: SpatialEngine;
  node: DrawNode;
}

export default function DrawProperties({ engine, node }: DrawPropertiesProps) {
  const theme = useSBTheme();
  const update = useBatchUpdate<DrawNode["data"]>(engine, node);

  const { data } = node;
  const fillColor = data.fill ?? null;
  const fillStyle = data.fillStyle ?? "hachure";
  const strokeStyle = data.strokeStyle ?? "solid";

  return (
    <>
      {/* Stroke color */}
      <PaletteColorPicker
        label="Stroke"
        palettes={STROKE_PALETTES}
        value={data.color}
        onChange={(c) => update({ color: c! })}
      />

      {/* Fill color */}
      <PaletteColorPicker
        label="Fill"
        palettes={FILL_PALETTES}
        value={fillColor}
        onChange={(c) => update({ fill: c ?? undefined })}
        allowNull
      />

      {/* Fill style (only when fill is set) */}
      {fillColor && (
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Fill pattern</span>
          {FILL_STYLES.map((f) => (
            <button
              key={f.key}
              title={f.label}
              onClick={() => update({ fillStyle: f.key })}
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
        onChange={(s) => update({ strokeStyle: s })}
      />

      {/* Stroke width */}
      <WidthPicker
        label="Stroke width"
        value={data.strokeWidth}
        onChange={(w) => update({ strokeWidth: w })}
      />

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
