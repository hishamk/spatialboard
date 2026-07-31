import { useState, useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { FONT_FAMILIES, getFontFamilyCSS, getFontIcon } from "../../fonts";
import { fitAnchorPopupPosition } from "../../utils/fit-fixed-popup";
import type { FontOption } from "../../fonts";
import { useSBTheme, SB_UI_FONT } from "../sidebar/ThemeContext";

const SEARCH_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export default function FontPicker({
  value,
  onChange,
  fontsInScene,
  triggerStyle,
}: {
  value: string;
  onChange: (font: string) => void;
  fontsInScene: string[];
  triggerStyle?: React.CSSProperties;
}) {
  const theme = useSBTheme();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Filter available fonts by search
  const searchLower = search.trim().toLowerCase();
  const filteredInScene = useMemo(
    () => fontsInScene.filter((f) => f.toLowerCase().includes(searchLower)),
    [fontsInScene, searchLower]
  );
  const filteredAvailable = useMemo(
    () =>
      FONT_FAMILIES.filter(
        (f) =>
          !fontsInScene.includes(f.key) &&
          (f.key.toLowerCase().includes(searchLower) || f.label.toLowerCase().includes(searchLower))
      ),
    [fontsInScene, searchLower]
  );

  useLayoutEffect(() => {
    if (!open || !popoverRef.current) return;
    const el = popoverRef.current;
    const win = el.ownerDocument.defaultView ?? window;
    const popoverWidth = 260;
    const padding = 16;
    const apply = () => {
      const tr = triggerRef.current?.getBoundingClientRect();
      if (!tr) return;
      let anchorLeft = tr.left;
      if (anchorLeft + popoverWidth > win.innerWidth - padding) {
        anchorLeft = win.innerWidth - popoverWidth - padding;
      }
      if (anchorLeft < padding) anchorLeft = padding;
      const anchorY = tr.bottom + 4;
      const br = el.getBoundingClientRect();
      const pos = fitAnchorPopupPosition(anchorLeft, anchorY, br.width, br.height, win, padding);
      el.style.left = `${pos.left}px`;
      el.style.top = `${pos.top}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, search, filteredInScene.length, filteredAvailable.length]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      const doc = containerRef.current?.ownerDocument ?? document;
      const popoverEl = doc.getElementById("font-picker-popover");
      if (popoverEl?.contains(target)) return;
      setOpen(false);
    };
    const doc = containerRef.current?.ownerDocument ?? document;
    doc.addEventListener("mousedown", onDocClick);
    return () => doc.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const handleSelect = (key: string) => {
    onChange(key);
    setOpen(false);
    setSearch("");
  };

  const renderFontRow = (fontKey: string, opt?: FontOption) => {
    const label = opt?.label ?? fontKey;
    const category = opt?.category;
    const isSelected = value === fontKey;
    return (
      <button
        key={fontKey}
        type="button"
        onClick={() => handleSelect(fontKey)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: isSelected ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: getFontFamilyCSS(fontKey),
          fontSize: 14,
          borderRadius: 6,
        }}
        onMouseEnter={(e) => {
          if (!isSelected) e.currentTarget.style.background = "rgba(0,0,0,0.05)";
        }}
        onMouseLeave={(e) => {
          if (!isSelected) e.currentTarget.style.background = "transparent";
        }}
      >
        <span
          style={{
            width: 24,
            flexShrink: 0,
            fontSize: 12,
            color: "#64748b",
            fontFamily: "sans-serif",
          }}
        >
          {getFontIcon(category)}
        </span>
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
      </button>
    );
  };

  return (
    <div ref={containerRef} style={{ position: "relative", flex: 1, minWidth: 0 }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 28,
          padding: "0 8px",
          background: theme.controlBg,
          color: theme.text,
          border: `1px solid ${theme.separator}`,
          borderRadius: theme.controlBorderRadius,
          fontSize: 11,
          fontFamily: getFontFamilyCSS(value),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...triggerStyle,
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {FONT_FAMILIES.find((f) => f.key === value)?.label ?? value}
        </span>
        <span
          style={{
            flexShrink: 0,
            opacity: 0.7,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.15s",
          }}
        >
          ▼
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={popoverRef}
            id="font-picker-popover"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: 260,
              maxHeight: "min(320px, calc(100dvh - 16px))",
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              zIndex: 10000,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              fontFamily: theme.uiFontFamily ?? SB_UI_FONT,
            }}
          >
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderBottom: "1px solid #eee",
              background: "#fafafa",
            }}
          >
            <span style={{ color: "#64748b", display: "flex" }}>{SEARCH_ICON}</span>
            <input
              type="text"
              placeholder="Quick search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                fontSize: 13,
                outline: "none",
                color: "#1e1e2e",
              }}
            />
          </div>

          <div style={{ overflowY: "auto", padding: 8, flex: 1 }}>
            {/* In this scene */}
            {filteredInScene.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 6,
                    paddingLeft: 4,
                  }}
                >
                  In this scene
                </div>
                {filteredInScene.map((key) => renderFontRow(key, FONT_FAMILIES.find((f) => f.key === key)))}
              </div>
            )}

            {/* Available fonts */}
            <div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#64748b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 6,
                  paddingLeft: 4,
                }}
              >
                Available fonts
              </div>
              {filteredAvailable.length > 0 ? (
                filteredAvailable.map((f) => renderFontRow(f.key, f))
              ) : (
                <div
                  style={{
                    padding: "12px",
                    fontSize: 12,
                    color: "#94a3b8",
                  }}
                >
                  {search ? "No fonts match your search" : "All fonts are in use"}
                </div>
              )}
            </div>
          </div>
        </div>,
          (containerRef.current?.ownerDocument ?? document).body
        )}
    </div>
  );
}
