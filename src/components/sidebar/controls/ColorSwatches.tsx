import { rowStyle, labelStyle, btnBase } from "../styles";
import { useSBTheme } from "../ThemeContext";

interface ColorSwatchesProps {
  label: string;
  colors: (string | null)[];
  value: string | null | undefined;
  onChange: (color: string | null) => void;
  mixed?: boolean;
}

export default function ColorSwatches({
  label,
  colors,
  value,
  onChange,
  mixed,
}: ColorSwatchesProps) {
  const theme = useSBTheme();
  return (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>{label}</span>
      {colors.map((c, i) => {
        const isNoColor = c === null;
        const isActive = !mixed && value === c;
        return (
          <button
            key={c ?? "none"}
            onClick={() => onChange(c)}
            style={{
              ...btnBase,
              width: "var(--sbp-swatch, 20px)",
              height: "var(--sbp-swatch, 20px)",
              background: c ?? "transparent",
              border: isActive
                ? `2px solid ${theme.swatchBorderActive}`
                : `2px solid ${isNoColor ? theme.textDisabled : "transparent"}`,
              borderRadius: "50%",
              position: "relative" as const,
              overflow: "hidden" as const,
            }}
          >
            {isNoColor && i === 0 && (
              <div
                style={{
                  position: "absolute",
                  width: "140%",
                  height: 2,
                  background: theme.error,
                  transform: "rotate(-45deg)",
                  top: "50%",
                  left: "-20%",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
