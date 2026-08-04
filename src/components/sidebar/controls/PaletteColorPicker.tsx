import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { labelStyle, btnBase } from "../styles";
import type { ColorPalette } from "../styles";
import { useSBTheme, SB_UI_FONT } from "../ThemeContext";
import { useSBI18n } from "../../contexts/LocalizationContext";

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
  const { labels } = useSBI18n();
  const [activePalette, setActivePalette] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [dropdownPlacement, setDropdownPlacement] = useState<"top" | "bottom">("bottom");

  const palette = palettes[activePalette] ?? palettes[0];
  const displayPaletteName = palette.name === "Standard" ? labels.paletteStandard : palette.name;
  // Coerce: collab/agent payloads can land here as numbers/objects despite the
  // string type — guard so the inspector doesn't crash the whole canvas.
  const safeValue = typeof value === "string" ? value : undefined;
  const valueLower = safeValue?.toLowerCase();

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

  // Position dropdown in viewport (portal) so parent overflow never clips it.
  useEffect(() => {
    if (!dropdownOpen) return;
    const updatePos = () => {
      const el = triggerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const rowHeight = 30;
      const estimatedHeight = palettes.length * rowHeight + 10;
      const spaceBelow = window.innerHeight - r.bottom;
      const spaceAbove = r.top;
      const placeTop = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;
      setDropdownPlacement(placeTop ? "top" : "bottom");
      setDropdownPos({
        top: placeTop ? r.top - 4 : r.bottom + 4,
        left: r.right,
      });
    };
    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [dropdownOpen]);

  // Check if current value is a custom color (not in any palette)
  const inPalette = palettes.some((p) =>
    p.colors.some((c) => c.toLowerCase() === valueLower),
  );

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
      <span style={{ ...labelStyle, color: theme.textMuted, paddingTop: 2 }}>{label}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
          {/* Null swatch */}
          {allowNull && (
            <button
              onClick={() => onChange(null)}
              title={labels.inspectorNone}
              style={{
                ...btnBase,
                width: "var(--sbp-swatch, 20px)",
                height: "var(--sbp-swatch, 20px)",
                background: "transparent",
                border:
                  !mixed && safeValue == null
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
                  width: "var(--sbp-swatch, 20px)",
                  height: "var(--sbp-swatch, 20px)",
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
          {safeValue && !inPalette && !mixed && (
            <div
              style={{
                width: "var(--sbp-swatch, 20px)",
                height: "var(--sbp-swatch, 20px)",
                borderRadius: "50%",
                background: safeValue,
                border: `2px solid ${theme.swatchBorderActive}`,
                flexShrink: 0,
              }}
            />
          )}

          {mixed && (
            <span style={{ fontSize: 9, color: theme.textMuted, fontStyle: "italic" }}>
              {labels.inspectorMixed}
            </span>
          )}

        </div>

        {/* Palette selector dropdown on its own line */}
        {palettes.length > 1 && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div ref={triggerRef} style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                title={labels.inspectorSwitchPalette}
                style={{
                  ...btnBase,
                  height: "var(--sbp-ctl-h, 24px)",
                  padding: "0 8px",
                  background: theme.controlBg,
                  color: theme.textMuted,
                  fontSize: 9,
                  borderRadius: theme.controlBorderRadius,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                {displayPaletteName}
                <span style={{ fontSize: 7 }}>{dropdownOpen ? "\u25B2" : "\u25BC"}</span>
              </button>
              {dropdownOpen && dropdownPos &&
                createPortal(
                  <div
                    ref={dropdownRef}
                    style={{
                      position: "fixed",
                      top: dropdownPos.top,
                      left: dropdownPos.left,
                      transform:
                        dropdownPlacement === "top"
                          ? "translate(-100%, -100%)"
                          : "translateX(-100%)",
                      background: theme.panelBg,
                      border: `1px solid ${theme.border}`,
                      borderRadius: theme.panelBorderRadius,
                      padding: 4,
                      zIndex: 20000,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      minWidth: 120,
                      boxShadow: theme.panelShadow,
                      fontFamily: theme.uiFontFamily ?? SB_UI_FONT,
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
                          borderRadius: theme.controlBorderRadius,
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
                        <span>{p.name === "Standard" ? labels.paletteStandard : p.name}</span>
                      </button>
                    ))}
                  </div>,
                  document.body
                )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
