import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!persistKey || open !== undefined) return;
    persistedOpenState.set(persistKey, isOpen);
  }, [persistKey, open, isOpen]);

  return (
    <section
      style={{
        border: `1px solid ${theme.border}`,
        borderRadius: theme.controlBorderRadius,
        background: isGroup ? theme.panelBg : theme.controlBg,
        overflow: "visible",
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
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          padding: "8px 10px",
          cursor: "pointer",
        }}
      >
        <span>{title}</span>
        <span style={{ color: theme.textMuted }}>{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div
          style={{
            padding: "8px 10px 10px",
            borderTop: `1px solid ${theme.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background: isGroup ? "transparent" : theme.controlBg,
          }}
        >
          {children}
        </div>
      )}
    </section>
  );
}
