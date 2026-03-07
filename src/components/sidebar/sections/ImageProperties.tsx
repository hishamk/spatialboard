import { useState } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ImageNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import BorderControls from "../controls/BorderControls";
import OpacitySlider from "../controls/OpacitySlider";
import { useSBTheme } from "../ThemeContext";
import { rowStyle, labelStyle, btnBase } from "../styles";

interface ImagePropertiesProps {
  engine: SpatialEngine;
  node: ImageNode;
}

export default function ImageProperties({ engine, node }: ImagePropertiesProps) {
  const theme = useSBTheme();
  const [bgRemovalState, setBgRemovalState] = useState<"idle" | "loading" | "error">("idle");
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
        <span style={{ ...labelStyle, color: theme.textMuted }}>Crop</span>
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
          Crop
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
            Reset
          </button>
        )}
      </div>

      {/* Background removal */}
      <div style={{ ...rowStyle, marginTop: 4 }}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Background</span>
        <button
          onClick={async () => {
            if (bgRemovalState === "loading") return;
            setBgRemovalState("loading");
            try {
              const { removeBackground } = await import("@imgly/background-removal");
              const response = await fetch(data.src);
              const blob = await response.blob();
              const resultBlob = await removeBackground(blob);
              const reader = new FileReader();
              const dataUrl = await new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(resultBlob);
              });
              update({ src: dataUrl });
              setBgRemovalState("idle");
            } catch (err) {
              console.error("Background removal failed:", err);
              setBgRemovalState("error");
              setTimeout(() => setBgRemovalState("idle"), 3000);
            }
          }}
          disabled={bgRemovalState === "loading"}
          style={{
            ...btnBase,
            height: 28,
            padding: "0 10px",
            background: bgRemovalState === "error" ? theme.error : theme.controlBg,
            color: theme.text,
            fontSize: 10,
            borderRadius: theme.controlBorderRadius,
            gap: 4,
            opacity: bgRemovalState === "loading" ? 0.6 : 1,
          }}
        >
          {bgRemovalState === "loading"
            ? "Removing..."
            : bgRemovalState === "error"
            ? "Failed"
            : "Remove BG"}
        </button>
      </div>

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
