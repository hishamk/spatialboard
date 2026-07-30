import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ImageNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import BorderControls from "../controls/BorderControls";
import OpacitySlider from "../controls/OpacitySlider";
import { useSBTheme } from "../ThemeContext";
import { rowStyle, labelStyle, btnBase } from "../styles";
import { useSBI18n } from "../../contexts/LocalizationContext";

interface ImagePropertiesProps {
  engine: SpatialEngine;
  node: ImageNode;
}

export default function ImageProperties({ engine, node }: ImagePropertiesProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const update = useBatchUpdate<ImageNode["data"]>(engine, node);

  const { data } = node;
  const hasCrop = !!data.crop;

  return (
    <>
      {/* Border */}
      <BorderControls
        borderColor={data.borderColor ?? null}
        borderStyle={data.borderStyle}
        borderWidth={data.borderWidth}
        onChange={(prop, value) => update({ [prop]: value } as Partial<ImageNode["data"]>)}
      />

      {/* Crop */}
      <div style={{ ...rowStyle, marginTop: 4 }}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorCrop}</span>
        <button
          onClick={() => engine.requestImageCrop(node.id)}
          style={{
            ...btnBase,
            height: 28,
            padding: "0 10px",
            background: theme.controlBg,
            color: theme.text,
            fontSize: 10,
            borderRadius: theme.controlBorderRadius,
          }}
        >
          {labels.inspectorCrop}
        </button>
        {hasCrop && (
          <button
            onClick={() => update({ crop: undefined })}
            style={{
              ...btnBase,
              height: 28,
              padding: "0 10px",
              background: theme.controlBg,
              color: theme.textMuted,
              fontSize: 10,
              borderRadius: theme.controlBorderRadius,
            }}
          >
            {labels.inspectorReset}
          </button>
        )}
      </div>

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
