import {
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { fitAnchorPopupPosition } from "../../utils/fit-fixed-popup";
import { useSBTheme, SB_UI_FONT } from "../sidebar/ThemeContext";

export interface ContextMenuItem {
  label: string;
  shortcut?: string;
  action: () => void;
  danger?: boolean;
  disabled?: boolean;
  checked?: boolean;
  /** Optional leading icon (e.g. Lucide). */
  icon?: ReactNode;
  /** Non-interactive subsection title (e.g. alignment groups). */
  kind?: "header";
  /** Hover callbacks — e.g. peek the item's target object on the canvas. */
  onHover?: () => void;
  onHoverEnd?: () => void;
}

export interface ContextMenuSection {
  items: ContextMenuItem[];
}

interface ContextMenuProps {
  x: number;
  y: number;
  sections: ContextMenuSection[];
  onClose: () => void;
}

export default function ContextMenu({
  x,
  y,
  sections,
  onClose,
}: ContextMenuProps) {
  const theme = useSBTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click or scroll
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const doc = menuRef.current?.ownerDocument ?? document;
    doc.addEventListener("pointerdown", handleClick, true);
    doc.addEventListener("keydown", handleKey);
    return () => {
      doc.removeEventListener("pointerdown", handleClick, true);
      doc.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // Portal to body so position:fixed is not clipped by canvas overflow:hidden
  const doc = typeof document !== "undefined" ? document : null;

  // Adjust before paint; re-run when menu size changes (sections, fonts, resize)
  useLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const win = el.ownerDocument.defaultView ?? window;
    const apply = () => {
      const rect = el.getBoundingClientRect();
      const pos = fitAnchorPopupPosition(x, y, rect.width, rect.height, win);
      el.style.left = `${pos.left}px`;
      el.style.top = `${pos.top}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    win.addEventListener("resize", apply);
    return () => {
      ro.disconnect();
      win.removeEventListener("resize", apply);
    };
  }, [x, y, sections]);

  const handleItemClick = useCallback(
    (item: ContextMenuItem) => {
      if (item.kind === "header" || item.disabled) return;
      item.action();
      onClose();
    },
    [onClose]
  );

  const isMac = navigator.platform.includes("Mac");
  const mod = isMac ? "\u2318" : "Ctrl+";
  const alt = isMac ? "\u2325" : "Alt+";
  const shift = isMac ? "\u21E7" : "Shift+";

  const formatShortcut = (shortcut: string) =>
    shortcut
      .replace("Mod+", mod)
      .replace("Alt+", alt)
      .replace("Shift+", shift);

  const menuEl = (
    <div
      data-sb-context-menu
      ref={menuRef}
      onPointerDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: "fixed",
        left: x,
        top: y,
        zIndex: 10002,
        minWidth: 200,
        maxHeight: "min(85dvh, calc(100vh - 16px))",
        overflowY: "auto",
        background: "#1e1e2e",
        borderRadius: 8,
        border: "1px solid #333",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        padding: "4px 0",
        color: "#e0e0e0",
        fontSize: 13,
        fontFamily: theme.uiFontFamily ?? SB_UI_FONT,
        userSelect: "none",
      }}
    >
      {sections.map((section, si) => (
        <div key={si}>
          {si > 0 && (
            <div
              style={{
                height: 1,
                background: "#333",
                margin: "4px 0",
              }}
            />
          )}
          {section.items.map((item, ii) =>
            item.kind === "header" ? (
              <div
                key={ii}
                style={{
                  padding: "8px 16px 4px",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#7a7a8c",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                {item.label}
              </div>
            ) : (
              <div
                key={ii}
                onClick={() => handleItemClick(item)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 16px",
                  cursor: item.disabled ? "default" : "pointer",
                  opacity: item.disabled ? 0.4 : 1,
                  color: item.danger ? "#f87171" : "#e0e0e0",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.08)";
                    item.onHover?.();
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  item.onHoverEnd?.();
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minWidth: 0,
                  }}
                >
                  {item.icon != null && (
                    <span
                      style={{
                        display: "flex",
                        flexShrink: 0,
                        color: "currentColor",
                        opacity: 0.92,
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  {item.checked !== undefined && (
                    <span style={{ display: "inline-block", width: 16, marginRight: -4 }}>
                      {item.checked ? "\u2713" : ""}
                    </span>
                  )}
                  <span>{item.label}</span>
                </span>
                {item.shortcut && (
                  <span
                    style={{
                      marginLeft: 32,
                      fontSize: 12,
                      color: "#888",
                    }}
                  >
                    {formatShortcut(item.shortcut)}
                  </span>
                )}
              </div>
            ),
          )}
        </div>
      ))}
    </div>
  );

  return doc?.body ? createPortal(menuEl, doc.body) : menuEl;
}
