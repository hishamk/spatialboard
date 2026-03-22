import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useFitSidePopoverPositionFromRect } from "../../hooks/useFitSidePopoverPosition";
import { nanoid } from "nanoid";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { ImageNode } from "../../engine/types";
import { useSBTheme } from "./ThemeContext";
import { searchGifs, trendingGifs, type KlipyItem } from "../../utils/klipy";
import { useSBI18n } from "../LocalizationContext";

/** MIME type for drag-and-drop of GIF items */
export const GIF_ITEM_MIME = "application/x-spatialboard-gif-item";

function placeGif(engine: SpatialEngine, item: KlipyItem, screenX?: number, screenY?: number) {
  const hd = item.file.hd.gif;
  const MAX_W = 400;
  const MAX_H = 300;
  let w = hd.width;
  let h = hd.height;
  const scale = Math.min(1, MAX_W / w, MAX_H / h);
  w = Math.round(w * scale);
  h = Math.round(h * scale);

  const sx = screenX ?? window.innerWidth / 2;
  const sy = screenY ?? window.innerHeight / 2;
  const pt = engine.screenToCanvas(sx, sy);

  const node: ImageNode = {
    id: nanoid(10),
    type: "image",
    x: pt.x - w / 2,
    y: pt.y - h / 2,
    w,
    h,
    z: engine.nextZ(),
    data: { src: hd.url },
  };
  engine.addNode(node);
  engine.select(node.id);
}

export { placeGif };

export default function GifSearchPanel({
  engine,
  open,
  onClose,
  triggerRect,
  baseUrl,
}: {
  engine: SpatialEngine;
  open: boolean;
  onClose: () => void;
  triggerRect: DOMRect | null;
  baseUrl: string;
}) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<KlipyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useFitSidePopoverPositionFromRect(open && !!triggerRect, triggerRect, panelRef, [
    items.length,
    loading,
  ]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("pointerdown", handle);
    return () => document.removeEventListener("pointerdown", handle);
  }, [open, onClose]);

  // Load trending on open
  useEffect(() => {
    if (!open) return;
    if (query.trim()) return; // Don't load trending if there's a search query
    const controller = new AbortController();
    setLoading(true);
    trendingGifs(baseUrl, 1, 30, controller.signal)
      .then((res) => {
        setItems(res.data.data.filter((d) => d.type !== "ad"));
        setPage(1);
        setHasNext(res.data.has_next);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [open, baseUrl, query]);

  // Debounced search
  const doSearch = useCallback(
    (q: string, pg: number, append: boolean) => {
      if (!q.trim()) return;
      const controller = new AbortController();
      setLoading(true);
      searchGifs(baseUrl, q, pg, 30, controller.signal)
        .then((res) => {
          const filtered = res.data.data.filter((d) => d.type !== "ad");
          setItems((prev) => (append ? [...prev, ...filtered] : filtered));
          setPage(pg);
          setHasNext(res.data.has_next);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
      return controller;
    },
    [baseUrl],
  );

  const handleQueryChange = useCallback(
    (val: string) => {
      setQuery(val);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (!val.trim()) {
        setItems([]);
        setPage(1);
        setHasNext(false);
        return;
      }
      debounceRef.current = setTimeout(() => {
        doSearch(val, 1, false);
      }, 350);
    },
    [doSearch],
  );

  // Load more on scroll
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || loading || !hasNext) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
      if (query.trim()) {
        doSearch(query, page + 1, true);
      } else {
        setLoading(true);
        trendingGifs(baseUrl, page + 1, 30)
          .then((res) => {
            const filtered = res.data.data.filter((d) => d.type !== "ad");
            setItems((prev) => [...prev, ...filtered]);
            setPage(page + 1);
            setHasNext(res.data.has_next);
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      }
    }
  }, [loading, hasNext, query, page, doSearch, baseUrl]);

  const handlePlace = useCallback(
    (item: KlipyItem) => {
      placeGif(engine, item);
    },
    [engine],
  );

  if (!open || !triggerRect) return null;

  return createPortal(
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        left: triggerRect.right + 8,
        top: triggerRect.top,
        background: theme.panelBg,
        border: `1px solid ${theme.border}`,
        borderRadius: theme.panelBorderRadius,
        padding: 0,
        zIndex: 99999,
        boxShadow: theme.panelShadow,
        width: 300,
        maxHeight: "min(420px, calc(100dvh - 16px))",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div style={{ padding: "10px 12px 6px", flexShrink: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: theme.text,
            marginBottom: 8,
          }}
        >
          {labels.gifPanelTitle}
        </div>
        <input
          type="text"
          placeholder={labels.gifSearchPlaceholder}
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          style={{
            width: "100%",
            padding: "5px 8px",
            border: `1px solid ${theme.border}`,
            borderRadius: theme.controlBorderRadius,
            background: theme.controlBg,
            color: theme.text,
            fontSize: 11,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Results grid */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "4px 12px",
          minHeight: 200,
        }}
      >
        {items.length === 0 && !loading ? (
          <div
            style={{
              color: theme.textDisabled,
              fontSize: 11,
              textAlign: "center",
              padding: 20,
            }}
          >
            {query.trim() ? labels.gifNoResults : labels.gifLoading}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 4,
            }}
          >
            {items.map((item) => (
              <GifThumbnail
                key={item.id}
                item={item}
                onClick={() => handlePlace(item)}
                engine={engine}
                theme={theme}
              />
            ))}
          </div>
        )}
        {loading && (
          <div
            style={{
              color: theme.textMuted,
              fontSize: 10,
              textAlign: "center",
              padding: 12,
            }}
          >
            {labels.gifLoading}
          </div>
        )}
      </div>

      {/* Attribution */}
      <div
        style={{
          borderTop: `1px solid ${theme.border}`,
          padding: "6px 12px",
          fontSize: 9,
          color: theme.textMuted,
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        {labels.gifPoweredBy}
      </div>
    </div>,
    document.body,
  );
}

function GifThumbnail({
  item,
  onClick,
  engine,
  theme,
}: {
  item: KlipyItem;
  onClick: () => void;
  engine: SpatialEngine;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  const thumb = item.file.sm.webp;
  const aspectRatio = thumb.width / thumb.height;
  /** After a successful drop, some browsers still emit a click on the source — skip it to avoid double placement. */
  const suppressClickUntilRef = useRef(0);

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData(GIF_ITEM_MIME, JSON.stringify(item));
      e.dataTransfer.effectAllowed = "copy";
    },
    [item],
  );

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    if (e.dataTransfer.dropEffect !== "none") {
      suppressClickUntilRef.current = performance.now() + 450;
    }
  }, []);

  const handleClick = useCallback(
    (ev: React.MouseEvent) => {
      if (performance.now() < suppressClickUntilRef.current) {
        ev.preventDefault();
        ev.stopPropagation();
        return;
      }
      onClick();
    },
    [onClick],
  );

  return (
    <button
      title={item.title}
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        border: `1px solid ${theme.border}`,
        borderRadius: theme.controlBorderRadius,
        background: theme.controlBg,
        cursor: "grab",
        padding: 0,
        overflow: "hidden",
        aspectRatio: aspectRatio > 1.5 ? "16/9" : aspectRatio < 0.7 ? "3/4" : "1",
      }}
    >
      <img
        src={thumb.url}
        alt={item.title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </button>
  );
}
