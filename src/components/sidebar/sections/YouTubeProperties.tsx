import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { YouTubeNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import BorderControls from "../controls/BorderControls";
import OpacitySlider from "../controls/OpacitySlider";
import { useSBTheme } from "../ThemeContext";
import { rowStyle, labelStyle } from "../styles";

interface YouTubePropertiesProps {
  engine: SpatialEngine;
  node: YouTubeNode;
}

export default function YouTubeProperties({ engine, node }: YouTubePropertiesProps) {
  const theme = useSBTheme();
  const update = useBatchUpdate<YouTubeNode["data"]>(engine, node);
  const { data } = node;

  return (
    <>
      {/* Video URL (read-only) */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>URL</span>
        <input
          type="text"
          value={data.url}
          readOnly
          style={{
            flex: 1,
            background: theme.controlBg,
            color: theme.textMuted,
            border: "none",
            borderRadius: theme.controlBorderRadius,
            padding: "4px 8px",
            fontSize: 10,
            outline: "none",
            cursor: "default",
          }}
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
      </div>

      {/* Border */}
      <BorderControls
        borderColor={data.borderColor ?? null}
        borderStyle={data.borderStyle}
        borderWidth={data.borderWidth}
        onChange={(prop, value) => update({ [prop]: value } as Partial<YouTubeNode["data"]>)}
      />

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
