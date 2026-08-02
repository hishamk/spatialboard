import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useSBTheme } from "../ThemeContext";

const persistedOpenState = new Map<string, boolean>();

interface PropertySectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  variant?: "group" | "sub";
  open?: boolean;
  onToggle?: () => void;
  persistKey?: string;
}

export default function PropertySection({
  title,
  defaultOpen = true,
  variant = "sub",
  open,
  onToggle,
  persistKey,
  children,
}: PropertySectionProps) {
  const theme = useSBTheme();
  const [internalOpen, setInternalOpen] = useState(() => {
    if (persistKey && persistedOpenState.has(persistKey)) {
      return !!persistedOpenState.get(persistKey);
    }
    return defaultOpen;
  });
  const isOpen = open ?? internalOpen;
  const isGroup = variant === "group";
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!persistKey || open !== undefined) return;
    persistedOpenState.set(persistKey, isOpen);
  }, [persistKey, open, isOpen]);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setContentHeight(el.scrollHeight);
    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <section
      style={{
        border: `1px solid ${theme.border}`,
        borderRadius: theme.controlBorderRadius,
        background: isGroup ? theme.panelBg : theme.controlBg,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch",
      }}
    >
      <button
        type="button"
        onClick={() => {
          if (onToggle) onToggle();
          else setInternalOpen((v) => !v);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
          border: "none",
          color: isGroup ? theme.textMuted : theme.textSecondary,
          fontSize: "var(--sbp-sec-fs, 10px)",
          fontWeight: 700,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          padding: "var(--sbp-sec-pad, 8px 10px)",
          cursor: "pointer",
          touchAction: "manipulation",
        }}
      >
        <span>{title}</span>
        <span
          style={{
            color: theme.textMuted,
            display: "inline-block",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 170ms ease",
            lineHeight: 1,
          }}
        >
          ▸
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? contentHeight : 0,
          opacity: isOpen ? 1 : 0,
          transition: "max-height 200ms ease, opacity 140ms ease",
          overflow: "hidden",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div
          ref={contentRef}
          style={{
            padding: "var(--sbp-sec-content-pad, 8px 10px 10px)",
            borderTop: `1px solid ${theme.border}`,
            display: "flex",
            flexDirection: "column",
            gap: "var(--sbp-row-gap, 8px)",
            background: isGroup ? "transparent" : theme.controlBg,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
