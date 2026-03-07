import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { TextNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import BorderControls from "../controls/BorderControls";
import OpacitySlider from "../controls/OpacitySlider";
import FontPicker from "../../FontPicker";
import { useSBTheme } from "../ThemeContext";
import {
  rowStyle,
  labelStyle,
  btnBase,
  STROKE_PALETTES,
  FONT_SIZES,
  TEXT_ALIGNS,
} from "../styles";

interface TextPropertiesProps {
  engine: SpatialEngine;
  node: TextNode;
  fontsInScene: string[];
}

export default function TextProperties({ engine, node, fontsInScene }: TextPropertiesProps) {
  const theme = useSBTheme();
  const update = useBatchUpdate<TextNode["data"]>(engine, node);

  const { data } = node;

  return (
    <>
      {/* Font family */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Font</span>
        <FontPicker
          value={data.fontFamily}
          onChange={(f: string) => update({ fontFamily: f })}
          fontsInScene={fontsInScene}
        />
      </div>

      {/* Font size */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Size</span>
        {FONT_SIZES.map((s) => (
          <button
            key={s}
            onClick={() => update({ fontSize: s })}
            style={{
              ...btnBase,
              width: 36,
              height: 28,
              background: data.fontSize === s ? theme.controlBgActive : theme.controlBg,
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
            onClick={() => update({ align: a.key })}
            style={{
              ...btnBase,
              width: 36,
              height: 28,
              background: data.align === a.key ? theme.controlBgActive : theme.controlBg,
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
        value={data.color}
        onChange={(c) => update({ color: c! })}
      />

      {/* Border */}
      <BorderControls
        borderColor={data.borderColor ?? null}
        borderStyle={data.borderStyle}
        borderWidth={data.borderWidth}
        onChange={(prop, value) => update({ [prop]: value } as Partial<TextNode["data"]>)}
      />

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
