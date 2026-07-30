import type { StrokeStyle } from "../../../engine/types";
import PaletteColorPicker from "./PaletteColorPicker";
import StrokeStylePicker from "./StrokeStylePicker";
import WidthPicker from "./WidthPicker";
import { STROKE_PALETTES } from "../styles";
import { useSBI18n } from "../../contexts/LocalizationContext";

interface BorderControlsProps {
  borderColor: string | null | undefined;
  borderStyle: StrokeStyle | undefined;
  borderWidth: number | undefined;
  mixed?: {
    color?: boolean;
    style?: boolean;
    width?: boolean;
  };
  onChange: (prop: string, value: unknown) => void;
}

export default function BorderControls({
  borderColor,
  borderStyle,
  borderWidth,
  mixed,
  onChange,
}: BorderControlsProps) {
  const { labels } = useSBI18n();
  return (
    <>
      <PaletteColorPicker
        label={labels.inspectorBorder}
        palettes={STROKE_PALETTES}
        value={borderColor}
        onChange={(c) => onChange("borderColor", c ?? undefined)}
        allowNull
        mixed={mixed?.color}
      />
      {(borderColor || mixed?.color) && (
        <>
          <StrokeStylePicker
            label={labels.inspectorStyle}
            value={borderStyle ?? "solid"}
            onChange={(s) => onChange("borderStyle", s)}
            mixed={mixed?.style}
          />
          <WidthPicker
            label={labels.inspectorWidth}
            value={borderWidth ?? 1}
            onChange={(w) => onChange("borderWidth", w)}
            mixed={mixed?.width}
          />
        </>
      )}
    </>
  );
}
