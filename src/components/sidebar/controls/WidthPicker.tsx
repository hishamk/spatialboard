import { rowStyle, labelStyle, btnBase, WIDTHS } from "../styles";
import { useSBTheme } from "../ThemeContext";

interface WidthPickerProps {
  label: string;
  widths?: number[];
  value: number | undefined;
  onChange: (width: number) => void;
  mixed?: boolean;
}

export default function WidthPicker({
  label,
  widths = WIDTHS,
  value,
  onChange,
  mixed,
}: WidthPickerProps) {
  const theme = useSBTheme();
  return (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>{label}</span>
      {widths.map((w) => (
        <button
          key={w}
          title={`${w}px`}
          onClick={() => onChange(w)}
          style={{
            ...btnBase,
            width: 36,
            height: 24,
            background: !mixed && value === w ? theme.controlBgActive : theme.controlBg,
            borderRadius: theme.controlBorderRadius,
          }}
        >
          <div
            style={{
              width: 20,
              height: Math.max(w, 1),
              background: theme.text,
              borderRadius: w / 2,
            }}
          />
        </button>
      ))}
    </div>
  );
}
