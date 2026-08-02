import type { ReactNode } from "react";
import type { SaveState } from "./usePersistentBoard";

/** Thin chrome around the board: a title bar with the save indicator + About + Reset. */
export function BoardShell({
  title,
  subtitle,
  saveState,
  onReset,
  onAbout,
  children,
}: {
  title: string;
  subtitle: string;
  saveState: SaveState;
  onReset: () => void;
  onAbout?: () => void;
  children: ReactNode;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column" }}>
      <header
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          padding: "8px 12px",
          paddingTop: "calc(8px + env(safe-area-inset-top))",
          background: "#1e1e2e",
          color: "#f8f7f4",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          flexWrap: "wrap",
        }}
      >
        <strong>{title}</strong>
        <span style={{ opacity: 0.55, fontSize: 12 }}>{subtitle}</span>
        <span
          style={{
            opacity: saveState === "error" ? 1 : 0.7,
            color: saveState === "error" ? "#fca5a5" : "inherit",
            flex: 1,
            minWidth: 90,
            textAlign: "right",
            fontSize: 12,
          }}
        >
          {saveState === "loading"
            ? "Loading…"
            : saveState === "saving"
              ? "Saving…"
              : saveState === "error"
                ? "Not saved — device storage is full"
                : "Saved on this device"}
        </span>
        {onAbout && (
          <button
            onClick={onAbout}
            style={{
              background: "transparent",
              color: "inherit",
              border: "1px solid rgba(248,247,244,0.4)",
              borderRadius: 6,
              padding: "4px 10px",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            About
          </button>
        )}
        <button
          onClick={onReset}
          style={{
            background: "transparent",
            color: "inherit",
            border: "1px solid rgba(248,247,244,0.4)",
            borderRadius: 6,
            padding: "4px 10px",
            cursor: "pointer",
            font: "inherit",
          }}
        >
          Reset
        </button>
      </header>
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}
