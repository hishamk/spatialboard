import { useRef, useState } from "react";

/**
 * Site chrome for the hosted demos: a floating, draggable panel listing the
 * examples, the examples index, and the GitHub repo. Open by default,
 * collapsible to its title bar; position and collapsed state persist per
 * device (shared across the demos, so it stays where you put it).
 *
 * Not part of the example itself — delete this file (and its usage) when
 * copying the example out as a starter.
 */

const DEMOS = [
  { slug: "basic", name: "Basic board", href: "/basic/" },
  { slug: "rich-text", name: "Rich text", href: "/rich-text/" },
  { slug: "custom-nodes", name: "Custom nodes", href: "/custom-nodes/" },
  { slug: "video-notes", name: "Video notes", href: "/video-notes/" },
  { slug: "dev-app", name: "Playground", href: "/dev-app/" },
];

const REPO_URL = "https://github.com/hishamk/spatialboard";
const STORAGE_KEY = "sb-demos-panel";

type PanelState = { x: number | null; y: number | null; collapsed: boolean };

function loadState(): PanelState {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (raw && typeof raw === "object") {
      return {
        x: Number.isFinite(raw.x) ? raw.x : null,
        y: Number.isFinite(raw.y) ? raw.y : null,
        collapsed: raw.collapsed === true,
      };
    }
  } catch {
    /* corrupt or unavailable storage — fall through to defaults */
  }
  return { x: null, y: null, collapsed: false };
}

function saveState(s: PanelState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable — the panel still works, it just won't persist */
  }
}

const itemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 12px",
  color: "inherit",
  textDecoration: "none",
  font: "inherit",
  fontSize: 13,
  whiteSpace: "nowrap",
};

export function DemoSwitcher({ current }: { current: string; floating?: boolean; dark?: boolean }) {
  const [state, setState] = useState<PanelState>(loadState);
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ dx: number; dy: number; moved: boolean } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    const rect = rootRef.current!.getBoundingClientRect();
    dragRef.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    d.moved = true;
    const w = rootRef.current?.offsetWidth ?? 200;
    const h = rootRef.current?.offsetHeight ?? 40;
    setState((s) => ({
      ...s,
      x: Math.min(Math.max(e.clientX - d.dx, 4), window.innerWidth - w - 4),
      y: Math.min(Math.max(e.clientY - d.dy, 4), window.innerHeight - h - 4),
    }));
  };
  const onPointerUp = () => {
    if (dragRef.current?.moved) saveState({ ...state });
    dragRef.current = null;
  };

  const toggleCollapsed = () => {
    const next = { ...state, collapsed: !state.collapsed };
    setState(next);
    saveState(next);
  };

  const placement: React.CSSProperties =
    state.x != null && state.y != null
      ? { left: state.x, top: state.y }
      : { top: "calc(56px + env(safe-area-inset-top))", right: 12 };

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        ...placement,
        zIndex: 1000,
        width: 180,
        background: "#ffffff",
        color: "#1e1e2e",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        boxShadow: "0 8px 24px rgba(30, 30, 46, 0.14)",
        fontFamily: "system-ui, sans-serif",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 8px 7px 12px",
          cursor: "grab",
          touchAction: "none",
          borderBottom: state.collapsed ? "none" : "1px solid #eef0f3",
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#6b7280",
          }}
        >
          Demos
        </span>
        <button
          onClick={toggleCollapsed}
          aria-label={state.collapsed ? "Expand" : "Collapse"}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
            font: "inherit",
            fontSize: 12,
            padding: "0 4px",
            lineHeight: 1,
          }}
        >
          {state.collapsed ? "▸" : "▾"}
        </button>
      </div>
      {!state.collapsed && (
        <div style={{ padding: "5px 0 6px" }}>
          {DEMOS.map((d) =>
            d.slug === current ? (
              <span key={d.slug} style={{ ...itemStyle, fontWeight: 600, cursor: "default" }}>
                <span style={{ color: "#d97706" }}>●</span> {d.name}
              </span>
            ) : (
              <a key={d.slug} href={d.href} style={itemStyle}>
                <span style={{ opacity: 0 }}>●</span> {d.name}
              </a>
            ),
          )}
          <div style={{ height: 1, background: "#eef0f3", margin: "5px 0" }} />
          <a href="/" style={itemStyle}>
            <span style={{ opacity: 0 }}>●</span> All examples
          </a>
          <a href={REPO_URL} style={itemStyle}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            GitHub repo
          </a>
        </div>
      )}
    </div>
  );
}
