import { useEffect, useMemo, useRef, useState } from "react";
import type { SpatialEngine, SpatialSearchState } from "../engine/SpatialEngine";
import { useSBTheme } from "./sidebar/ThemeContext";
import { useSBI18n } from "./LocalizationContext";

function getCountLabel(state: SpatialSearchState): string {
  if (state.matches.length === 0) return "0/0";
  const current = state.activeIndex >= 0 ? state.activeIndex + 1 : 0;
  return `${current}/${state.matches.length}`;
}

export default function CanvasSearchBar({ engine }: { engine: SpatialEngine }) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<SpatialSearchState>(() => engine.getSearchState());
  const inputRef = useRef<HTMLInputElement>(null);

  const countLabel = useMemo(() => getCountLabel(search), [search]);

  useEffect(() => {
    const sync = () => setSearch(engine.getSearchState());
    const onOpen = () => {
      setOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    const doc = document;
    engine.on("search", sync);
    doc.addEventListener("sb:search-open", onOpen as EventListener);
    return () => {
      engine.off("search", sync);
      doc.removeEventListener("sb:search-open", onOpen as EventListener);
    };
  }, [engine]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "f") {
        e.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "f") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        if (search.query) {
          engine.clearSearch();
        } else {
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [engine, open, search.query]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10001,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 8,
        borderRadius: 10,
        border: `1px solid ${theme.border}`,
        background: theme.panelBg,
        boxShadow: theme.panelShadow,
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <input
        ref={inputRef}
        value={search.query}
        placeholder={labels.canvasSearchPlaceholder}
        onChange={(e) => engine.setSearchQuery(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (e.shiftKey) {
              engine.searchPrev();
            } else {
              engine.searchNext();
            }
            engine.focusActiveSearchResult();
          }
        }}
        style={{
          width: 260,
          height: 30,
          borderRadius: 8,
          border: `1px solid ${theme.border}`,
          background: theme.controlBg,
          color: theme.text,
          padding: "0 10px",
          outline: "none",
          fontSize: 13,
        }}
      />
      <span style={{ minWidth: 42, textAlign: "center", color: theme.textMuted, fontSize: 12 }}>
        {countLabel}
      </span>
      <button
        type="button"
        title={labels.canvasSearchPrev}
        onClick={() => {
          engine.searchPrev();
          engine.focusActiveSearchResult();
        }}
        disabled={search.matches.length === 0}
        style={{
          border: "none",
          borderRadius: 8,
          width: 28,
          height: 28,
          cursor: search.matches.length === 0 ? "default" : "pointer",
          background: theme.controlBg,
          color: search.matches.length === 0 ? theme.textDisabled : theme.text,
        }}
      >
        ↑
      </button>
      <button
        type="button"
        title={labels.canvasSearchNext}
        onClick={() => {
          engine.searchNext();
          engine.focusActiveSearchResult();
        }}
        disabled={search.matches.length === 0}
        style={{
          border: "none",
          borderRadius: 8,
          width: 28,
          height: 28,
          cursor: search.matches.length === 0 ? "default" : "pointer",
          background: theme.controlBg,
          color: search.matches.length === 0 ? theme.textDisabled : theme.text,
        }}
      >
        ↓
      </button>
      <button
        type="button"
        title={labels.canvasSearchClose}
        onClick={() => {
          engine.clearSearch();
          setOpen(false);
        }}
        style={{
          border: "none",
          borderRadius: 8,
          width: 28,
          height: 28,
          cursor: "pointer",
          background: theme.controlBg,
          color: theme.text,
          fontSize: 16,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}
