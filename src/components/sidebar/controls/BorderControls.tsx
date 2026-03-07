import PaletteColorPicker from "./PaletteColorPicker";
import StrokeStylePicker from "./StrokeStylePicker";
import WidthPicker from "./WidthPicker";
import { STROKE_PALETTES } from "../styles";

interface BorderControlsProps {
  borderColor: string | null | undefined;
  borderStyle: "solid" | "dashed" | "dotted" | undefined;
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
  return (
    <>
      <PaletteColorPicker
        label="Border"
        palettes={STROKE_PALETTES}
        value={borderColor}
        onChange={(c) => onChange("borderColor", c ?? undefined)}
        allowNull
        mixed={mixed?.color}
      />
      {(borderColor || mixed?.color) && (
        <>
          <StrokeStylePicker
            label="Style"
            value={borderStyle ?? "solid"}
            onChange={(s) => onChange("borderStyle", s)}
            mixed={mixed?.style}
          />
          <WidthPicker
            label="Width"
            value={borderWidth ?? 1}
            onChange={(w) => onChange("borderWidth", w)}
            mixed={mixed?.width}
          />
        </>
      )}
    </>
  );
}
