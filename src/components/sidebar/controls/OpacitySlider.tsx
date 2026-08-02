import { rowStyle, labelStyle } from "../styles";
import { useSBTheme } from "../ThemeContext";
import { useSBI18n } from "../../contexts/LocalizationContext";

interface OpacitySliderProps {
  value: number | undefined;
  onChange: (opacity: number) => void;
  mixed?: boolean;
}

export default function OpacitySlider({
  value,
  onChange,
  mixed,
}: OpacitySliderProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const displayValue = mixed || value === undefined ? 100 : Math.round(value * 100);
  return (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorOpacity}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={displayValue}
        onChange={(e) => onChange(parseInt(e.target.value) / 100)}
        style={{ flex: 1, accentColor: theme.accentColor, height: "var(--sbp-ctl-h, auto)", touchAction: "pan-x", margin: 0 }}
      />
      <span style={{ width: 28, textAlign: "right", fontSize: "var(--sbp-label-fs, 10px)", color: mixed ? theme.textFaint : theme.text }}>
        {mixed ? "--" : displayValue}
      </span>
    </div>
  );
}
