import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { StickyNoteNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import OpacitySlider from "../controls/OpacitySlider";
import EdgeStyleIcon from "../controls/EdgeStyleIcon";
import { useSBTheme } from "../ThemeContext";
import { rowStyle, labelStyle, btnBase, STICKY_PALETTES } from "../styles";

interface StickyPropertiesProps {
  engine: SpatialEngine;
  node: StickyNoteNode;
}

export default function StickyProperties({ engine, node }: StickyPropertiesProps) {
  const theme = useSBTheme();
  const update = useBatchUpdate<StickyNoteNode["data"]>(engine, node);

  const { data } = node;

  return (
    <>
      {/* Color */}
      <PaletteColorPicker
        label="Color"
        palettes={STICKY_PALETTES}
        value={data.color}
        onChange={(c) => { if (c) update({ color: c }); }}
      />

      {/* Font size */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Size</span>
        {[12, 14, 16, 20, 24].map((s) => (
          <button
            key={s}
            onClick={() => update({ fontSize: s })}
            style={{
              ...btnBase,
              width: 32,
              height: 24,
              background: (data.fontSize ?? 16) === s ? theme.controlBgActive : theme.controlBg,
              borderRadius: theme.controlBorderRadius,
              fontSize: 10,
              color: theme.text,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Edge style */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Edges</span>
        {([
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" },
        ] as const).map((e) => (
          <button
            key={e.key}
            title={e.label}
            onClick={() => update({ edgeStyle: e.key === "sharp" ? undefined : e.key })}
            style={{
              ...btnBase,
              width: 28,
              height: 28,
              background: (data.edgeStyle ?? "sharp") === e.key ? theme.controlBgActive : theme.controlBg,
              color: theme.text,
              borderRadius: theme.controlBorderRadius,
            }}
          >
            <EdgeStyleIcon name={e.key} />
          </button>
        ))}
      </div>

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
