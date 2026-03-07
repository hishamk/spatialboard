import { useState, useRef, useEffect } from "react";
import { rowStyle, labelStyle, btnBase } from "../styles";
import type { ColorPalette } from "../styles";
import { useSBTheme } from "../ThemeContext";

interface PaletteColorPickerProps {
  label: string;
  palettes: ColorPalette[];
  value: string | null | undefined;
  onChange: (color: string | null) => void;
  allowNull?: boolean;
  mixed?: boolean;
}

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export default function PaletteColorPicker({
  label,
  palettes,
  value,
  onChange,
  allowNull,
  mixed,
}: PaletteColorPickerProps) {
  const theme = useSBTheme();
  const [hexInput, setHexInput] = useState("");
  const [activePalette, setActivePalette] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const palette = palettes[activePalette] ?? palettes[0];
  const valueLower = value?.toLowerCase();

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const commitHex = () => {
    const trimmed = hexInput.trim();
    if (!trimmed) return;
    const hex = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    if (HEX_RE.test(hex)) {
      onChange(hex);
      setHexInput("");
    }
  };

  // Check if current value is a custom color (not in any palette)
  const inPalette = palettes.some((p) =>
    p.colors.some((c) => c.toLowerCase() === valueLower),
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Main row: label + null + swatches + custom swatch + palette dropdown */}
      <div style={{ ...rowStyle, margin: 0, flexWrap: "wrap", gap: 4 }}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{label}</span>

        {/* Null swatch */}
        {allowNull && (
          <button
            onClick={() => onChange(null)}
            title="None"
            style={{
              ...btnBase,
              width: 20,
              height: 20,
              background: "transparent",
              border:
                !mixed && value == null
                  ? `2px solid ${theme.swatchBorderActive}`
                  : `2px solid ${theme.textDisabled}`,
              borderRadius: "50%",
              position: "relative" as const,
              overflow: "hidden" as const,
            }}
          >
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
          </button>
        )}

        {/* Active palette swatches */}
        {palette.colors.map((c) => {
          const isActive = !mixed && valueLower === c.toLowerCase();
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              style={{
                ...btnBase,
                width: 20,
                height: 20,
                background: c,
                border: isActive
                  ? `2px solid ${theme.swatchBorderActive}`
                  : "2px solid transparent",
                borderRadius: "50%",
              }}
            />
          );
        })}

        {/* Custom color swatch (shown when value isn't in any palette) */}
        {value && !inPalette && !mixed && (
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: value,
              border: `2px solid ${theme.swatchBorderActive}`,
              flexShrink: 0,
            }}
          />
        )}

        {mixed && (
          <span style={{ fontSize: 9, color: theme.textMuted, fontStyle: "italic" }}>
            Mixed
          </span>
        )}

        {/* Palette selector dropdown */}
        {palettes.length > 1 && (
          <div ref={dropdownRef} style={{ position: "relative", marginLeft: "auto" }}>
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              title="Switch palette"
              style={{
                ...btnBase,
                height: 20,
                padding: "0 5px",
                background: theme.controlBg,
                color: theme.textMuted,
                fontSize: 9,
                borderRadius: theme.controlBorderRadius,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {palette.name}
              <span style={{ fontSize: 7 }}>{dropdownOpen ? "\u25B2" : "\u25BC"}</span>
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 2,
                  background: theme.panelBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 6,
                  padding: 4,
                  zIndex: 100,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  minWidth: 120,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                }}
              >
                {palettes.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setActivePalette(i);
                      setDropdownOpen(false);
                    }}
                    style={{
                      ...btnBase,
                      height: 28,
                      padding: "0 8px",
                      background: i === activePalette ? theme.controlBgActive : "transparent",
                      color: theme.text,
                      fontSize: 10,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      width: "100%",
                      justifyContent: "flex-start",
                    }}
                  >
                    {/* Mini preview swatches */}
                    <span style={{ display: "flex", gap: 2 }}>
                      {p.colors.slice(0, 6).map((c) => (
                        <span
                          key={c}
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: c,
                            display: "inline-block",
                          }}
                        />
                      ))}
                    </span>
                    <span>{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hex input row */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 52 }}>
        <input
          type="text"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitHex();
          }}
          onBlur={commitHex}
          placeholder={value ?? "#000000"}
          style={{
            width: 72,
            height: 20,
            background: theme.controlBg,
            border: `1px solid ${theme.border}`,
            borderRadius: 4,
            color: theme.text,
            fontSize: 10,
            fontFamily: "monospace",
            padding: "0 6px",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}
