import type { StrokeStyle } from "../../../engine/types";
import { rowStyle, labelStyle, btnBase, STROKE_STYLES } from "../styles";
import { useSBTheme } from "../ThemeContext";

interface StrokeStylePickerProps {
  label: string;
  value: StrokeStyle | undefined;
  onChange: (style: StrokeStyle) => void;
  mixed?: boolean;
}

export default function StrokeStylePicker({
  label,
  value,
  onChange,
  mixed,
}: StrokeStylePickerProps) {
  const theme = useSBTheme();
  return (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>{label}</span>
      {STROKE_STYLES.map((s) => (
        <button
          key={s.key}
          title={s.label}
          onClick={() => onChange(s.key)}
          style={{
            ...btnBase,
            width: 36,
            height: 28,
            background: !mixed && value === s.key ? theme.controlBgActive : theme.controlBg,
            borderRadius: theme.controlBorderRadius,
          }}
        >
          <svg width={24} height={12}>
            <line
              x1={2}
              y1={6}
              x2={22}
              y2={6}
              stroke={theme.text}
              strokeWidth={2}
              strokeDasharray={s.dash}
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
