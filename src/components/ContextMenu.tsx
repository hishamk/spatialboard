import { useEffect, useRef, useCallback } from "react";

export interface ContextMenuItem {
  label: string;
  shortcut?: string;
  action: () => void;
  danger?: boolean;
  disabled?: boolean;
  checked?: boolean;
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

  // Adjust position to stay within viewport
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const win = el.ownerDocument.defaultView ?? window;
    let adjustedX = x;
    let adjustedY = y;
    if (rect.right > win.innerWidth) {
      adjustedX = x - rect.width;
    }
    if (rect.bottom > win.innerHeight) {
      adjustedY = y - rect.height;
    }
    // Clamp so menu never goes above or left of viewport
    adjustedX = Math.max(0, adjustedX);
    adjustedY = Math.max(0, adjustedY);
    el.style.left = `${adjustedX}px`;
    el.style.top = `${adjustedY}px`;
  }, [x, y]);

  const handleItemClick = useCallback(
    (item: ContextMenuItem) => {
      if (item.disabled) return;
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

  return (
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
        background: "#1e1e2e",
        borderRadius: 8,
        border: "1px solid #333",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        padding: "4px 0",
        color: "#e0e0e0",
        fontSize: 13,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
          {section.items.map((item, ii) => (
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
                if (!item.disabled)
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <span>
                {item.checked !== undefined && (
                  <span style={{ display: "inline-block", width: 16, marginRight: 4 }}>
                    {item.checked ? "\u2713" : ""}
                  </span>
                )}
                {item.label}
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
          ))}
        </div>
      ))}
    </div>
  );
}
