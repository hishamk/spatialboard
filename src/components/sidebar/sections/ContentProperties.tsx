import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ContentNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import BorderControls from "../controls/BorderControls";
import EdgeStyleIcon from "../controls/EdgeStyleIcon";
import OpacitySlider from "../controls/OpacitySlider";
import { useSBTheme } from "../ThemeContext";
import { rowStyle, labelStyle, btnBase } from "../styles";

interface ContentPropertiesProps {
  engine: SpatialEngine;
  node: ContentNode;
}

export default function ContentProperties({ engine, node }: ContentPropertiesProps) {
  const theme = useSBTheme();
  const update = useBatchUpdate<ContentNode["data"]>(engine, node);

  const { data } = node;

  return (
    <>
      <BorderControls
        borderColor={data.borderColor ?? null}
        borderStyle={data.borderStyle}
        borderWidth={data.borderWidth}
        onChange={(prop, value) => update({ [prop]: value } as Partial<ContentNode["data"]>)}
      />
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
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
