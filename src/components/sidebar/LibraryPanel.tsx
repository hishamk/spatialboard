import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useFitSidePopoverPositionFromRect } from "../../hooks/useFitSidePopoverPosition";
import { nanoid } from "nanoid";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { SpatialNode } from "../../engine/types";
import { useSBTheme } from "./ThemeContext";
import {
  getInstalled,
  getItems,
  install,
  uninstall,
  search as searchStore,
  type InstalledLibrary,
} from "../../excalidraw/library-store";
import type {
  ExcalidrawLibFileRaw,
  ExcalidrawLibraryItem,
} from "../../excalidraw/types";
import { convertLibraryItem } from "../../excalidraw/converter";
import { renderPreviewSVG } from "../../excalidraw/preview-renderer";
import {
  getPersonalItems,
  removePersonalItem,
  type PersonalLibraryItem,
} from "../../store/personal-library";
import { useSBI18n } from "../LocalizationContext";

// ============================================================================
// Placement helper — mirrors engine.applyTemplate logic
// ============================================================================

/**
 * Place a library item on the canvas.
 * If screenX/screenY are provided, the item is centered at that screen position.
 * Otherwise it's centered at the viewport center.
 */
export function placeLibraryItem(
  engine: SpatialEngine,
  item: ExcalidrawLibraryItem,
  screenX?: number,
  screenY?: number,
): void {
  const { nodes, groupParent } = convertLibraryItem(item);
  if (nodes.length === 0) return;

  const cloned: SpatialNode[] = structuredClone(nodes);
  const idMap = new Map<string, string>();
  const groupIdMap = new Map<string, string>();

  // Remap node IDs
  for (const node of cloned) {
    const newId = nanoid(10);
    idMap.set(node.id, newId);
    node.id = newId;
  }

  // Remap groupId references (group IDs are separate from node IDs)
  for (const node of cloned) {
    if (node.groupId) {
      if (!groupIdMap.has(node.groupId)) {
        groupIdMap.set(node.groupId, nanoid(10));
      }
      node.groupId = groupIdMap.get(node.groupId)!;
    }
  }

  // Compute bounding box
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const n of cloned) {
    const h = n.h === "auto" ? 100 : (n.h as number);
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x + n.w);
    maxY = Math.max(maxY, n.y + h);
  }

  // Target canvas point: drop position or viewport center
  const sx = screenX ?? window.innerWidth / 2;
  const sy = screenY ?? window.innerHeight / 2;
  const pt = engine.screenToCanvas(sx, sy);
  const dx = pt.x - (minX + maxX) / 2;
  const dy = pt.y - (minY + maxY) / 2;

  for (const n of cloned) {
    n.x += dx;
    n.y += dy;
    n.z = engine.nextZ();
  }

  engine.addNodes(cloned);

  // Apply group hierarchy
  for (const [child, parent] of groupParent) {
    const mappedChild = groupIdMap.get(child) ?? child;
    const mappedParent = groupIdMap.get(parent) ?? parent;
    engine.groupParent.set(mappedChild, mappedParent);
  }

  engine.selectMultiple(cloned.map((n) => n.id));
}

/** MIME type for drag-and-drop of library items */
export const LIBRARY_ITEM_MIME = "application/x-spatialboard-library-item";

/** MIME type for drag-and-drop of personal library items */
export const PERSONAL_ITEM_MIME = "application/x-spatialboard-personal-item";

/**
 * Place a personal library item on the canvas.
 */
export function placePersonalItem(
  engine: SpatialEngine,
  item: PersonalLibraryItem,
  screenX?: number,
  screenY?: number,
): void {
  if (item.nodes.length === 0) return;

  const cloned: SpatialNode[] = structuredClone(item.nodes);
  const idMap = new Map<string, string>();
  const groupIdMap = new Map<string, string>();

  // Remap node IDs
  for (const node of cloned) {
    const newId = nanoid(10);
    idMap.set(node.id, newId);
    node.id = newId;
  }

  // Remap groupId references
  for (const node of cloned) {
    if (node.groupId) {
      if (!groupIdMap.has(node.groupId)) {
        groupIdMap.set(node.groupId, nanoid(10));
      }
      node.groupId = groupIdMap.get(node.groupId)!;
    }
  }

  // Remap edge references
  for (const node of cloned) {
    if (node.type === "edge") {
      const data = (node as { data: { fromId?: string; toId?: string } }).data;
      if (data.fromId && idMap.has(data.fromId)) data.fromId = idMap.get(data.fromId)!;
      if (data.toId && idMap.has(data.toId)) data.toId = idMap.get(data.toId)!;
    }
  }

  // Compute bounding box
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const n of cloned) {
    const h = n.h === "auto" ? 100 : (n.h as number);
    minX = Math.min(minX, n.x);
    minY = Math.min(minY, n.y);
    maxX = Math.max(maxX, n.x + n.w);
    maxY = Math.max(maxY, n.y + h);
  }

  // Target canvas point: drop position or viewport center
  const sx = screenX ?? window.innerWidth / 2;
  const sy = screenY ?? window.innerHeight / 2;
  const pt = engine.screenToCanvas(sx, sy);
  const dx = pt.x - (minX + maxX) / 2;
  const dy = pt.y - (minY + maxY) / 2;

  for (const n of cloned) {
    n.x += dx;
    n.y += dy;
    n.z = engine.nextZ();
  }

  engine.addNodes(cloned);

  // Apply group hierarchy
  for (const [child, parent] of item.groupParent) {
    const mappedChild = groupIdMap.get(child) ?? child;
    const mappedParent = groupIdMap.get(parent) ?? parent;
    engine.groupParent.set(mappedChild, mappedParent);
  }

  engine.selectMultiple(cloned.map((n) => n.id));
}

// ============================================================================
// Thumbnail component
// ============================================================================

const previewCache = new Map<string, string>();

function ItemThumbnail({ item }: { item: ExcalidrawLibraryItem }) {
  const svg = useMemo(() => {
    const cached = previewCache.get(item.id);
    if (cached) return cached;
    const { nodes } = convertLibraryItem(item);
    const svgStr = renderPreviewSVG(nodes, 56);
    previewCache.set(item.id, svgStr);
    return svgStr;
  }, [item.id]);

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}

// ============================================================================
// Draggable item button
// ============================================================================

function DraggableItemButton({
  item,
  libId,
  onClick,
  theme,
}: {
  item: ExcalidrawLibraryItem;
  libId: string;
  onClick: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  const { labels } = useSBI18n();
  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData(
        LIBRARY_ITEM_MIME,
        JSON.stringify({ libraryId: libId, itemId: item.id }),
      );
      e.dataTransfer.effectAllowed = "copy";
    },
    [libId, item.id],
  );

  return (
    <button
      title={item.name || labels.librariesUntitled}
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      style={{
        border: `1px solid ${theme.border}`,
        borderRadius: 4,
        background: theme.controlBg,
        cursor: "grab",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: "1",
      }}
    >
      <ItemThumbnail item={item} />
    </button>
  );
}

// ============================================================================
// Personal library thumbnail
// ============================================================================

function PersonalItemThumbnail({ nodes }: { nodes: SpatialNode[] }) {
  const svg = useMemo(() => {
    const key = "personal-" + nodes.map((n) => n.id).join(",");
    const cached = previewCache.get(key);
    if (cached) return cached;
    const svgStr = renderPreviewSVG(nodes, 56);
    previewCache.set(key, svgStr);
    return svgStr;
  }, [nodes]);

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}

// ============================================================================
// Draggable personal item button
// ============================================================================

function DraggablePersonalItemButton({
  item,
  onClick,
  onRemove,
  theme,
}: {
  item: PersonalLibraryItem;
  onClick: () => void;
  onRemove: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  const { labels } = useSBI18n();
  const [hovered, setHovered] = useState(false);

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData(
        PERSONAL_ITEM_MIME,
        JSON.stringify({ itemId: item.id }),
      );
      e.dataTransfer.effectAllowed = "copy";
    },
    [item.id],
  );

  return (
    <div
      style={{ position: "relative", aspectRatio: "1" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        title={item.name}
        onClick={onClick}
        draggable
        onDragStart={handleDragStart}
        style={{
          border: `1px solid ${theme.border}`,
          borderRadius: 4,
          background: theme.controlBg,
          cursor: "grab",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <PersonalItemThumbnail nodes={item.nodes} />
      </button>
      {hovered && (
        <button
          title={labels.librariesRemoveFromPersonal}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "none",
            background: "#ef4444",
            color: "#fff",
            fontSize: 10,
            lineHeight: "16px",
            textAlign: "center",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

// ============================================================================
// LibraryPanel component
// ============================================================================

export default function LibraryPanel({
  engine,
  open,
  onClose,
  triggerRect,
  onBrowseDirectory,
}: {
  engine: SpatialEngine;
  open: boolean;
  onClose: () => void;
  triggerRect: DOMRect | null;
  onBrowseDirectory: () => void;
}) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [libraries, setLibraries] = useState<InstalledLibrary[]>([]);
  const [personalItems, setPersonalItems] = useState<PersonalLibraryItem[]>([]);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useFitSidePopoverPositionFromRect(open && !!triggerRect, triggerRect, panelRef, [
    libraries.length,
    personalItems.length,
    query,
    expanded.size,
  ]);

  // Refresh library list
  const refresh = useCallback(() => {
    setLibraries(getInstalled());
    setPersonalItems(getPersonalItems());
  }, []);

  useEffect(() => {
    if (open) refresh();
  }, [open, refresh]);

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

  // File import handler
  const handleFileImport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const lib = JSON.parse(reader.result as string) as ExcalidrawLibFileRaw;
          if (lib.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const name = file.name.replace(/\.excalidrawlib$/, "");
          install(lib, { name });
          refresh();
        } catch (err) {
          console.error("Failed to parse library file:", err);
        }
      };
      reader.readAsText(file);
      // Reset input so the same file can be imported again
      e.target.value = "";
    },
    [refresh],
  );

  const handleUninstall = useCallback(
    (libId: string) => {
      uninstall(libId);
      previewCache.clear();
      refresh();
    },
    [refresh],
  );

  const handlePlace = useCallback(
    (item: ExcalidrawLibraryItem) => {
      placeLibraryItem(engine, item);
    },
    [engine],
  );

  const handlePlacePersonal = useCallback(
    (item: PersonalLibraryItem) => {
      placePersonalItem(engine, item);
    },
    [engine],
  );

  const handleRemovePersonal = useCallback(
    (id: string) => {
      removePersonalItem(id);
      previewCache.clear();
      refresh();
    },
    [refresh],
  );

  const toggleExpand = useCallback((libId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(libId)) next.delete(libId);
      else next.add(libId);
      return next;
    });
  }, []);

  // Search results
  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    const excalidraw = searchStore(query);
    const personal = personalItems.filter((item) =>
      item.name.toLowerCase().includes(q),
    );
    return { excalidraw, personal };
  }, [query, personalItems]);

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
        width: 280,
        maxHeight: "min(480px, calc(100dvh - 16px))",
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
          {labels.librariesTitle}
        </div>
        {/* Search */}
        <input
          type="text"
          placeholder={labels.librariesSearchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "4px 12px",
        }}
      >
        {/* Search results mode */}
        {searchResults !== null ? (
          searchResults.excalidraw.length === 0 && searchResults.personal.length === 0 ? (
            <div
              style={{
                color: theme.textDisabled,
                fontSize: 11,
                textAlign: "center",
                padding: 20,
              }}
            >
              {labels.librariesNoMatchingItems}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 4,
              }}
            >
              {searchResults.personal.map((item) => (
                <DraggablePersonalItemButton
                  key={item.id}
                  item={item}
                  onClick={() => handlePlacePersonal(item)}
                  onRemove={() => handleRemovePersonal(item.id)}
                  theme={theme}
                />
              ))}
              {searchResults.excalidraw.map(({ library, item }) => (
                <DraggableItemButton
                  key={item.id}
                  item={item}
                  libId={library.id}
                  onClick={() => handlePlace(item)}
                  theme={theme}
                />
              ))}
            </div>
          )
        ) : (
          <>
            {/* Personal library section */}
            {personalItems.length > 0 && (
              <PersonalLibrarySection
                items={personalItems}
                onPlace={handlePlacePersonal}
                onRemove={handleRemovePersonal}
                theme={theme}
              />
            )}

            {/* Installed Excalidraw libraries */}
            {libraries.length === 0 && personalItems.length === 0 ? (
              <div
                style={{
                  color: theme.textDisabled,
                  fontSize: 11,
                  textAlign: "center",
                  padding: "20px 10px",
                }}
              >
                {labels.librariesNoLibrariesInstalled}
                <br />
                {labels.librariesImportHint}
                <br />
                {labels.librariesBrowseHint}
              </div>
            ) : (
              libraries.map((lib) => {
                const isExpanded = expanded.has(lib.id);
                return (
                  <LibrarySection
                    key={lib.id}
                    lib={lib}
                    expanded={isExpanded}
                    onToggle={() => toggleExpand(lib.id)}
                    onPlace={handlePlace}
                    onUninstall={() => handleUninstall(lib.id)}
                    theme={theme}
                  />
                );
              })
            )}
          </>
        )}
      </div>

      {/* Footer buttons */}
      <div
        style={{
          borderTop: `1px solid ${theme.border}`,
          padding: "8px 12px",
          display: "flex",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            flex: 1,
            padding: "5px 8px",
            border: `1px solid ${theme.border}`,
            borderRadius: theme.controlBorderRadius,
            background: theme.controlBg,
            color: theme.text,
            cursor: "pointer",
            fontSize: 10,
            fontWeight: 500,
          }}
        >
          {labels.librariesImportFile}
        </button>
        <button
          onClick={onBrowseDirectory}
          style={{
            flex: 1,
            padding: "5px 8px",
            border: "none",
            borderRadius: theme.controlBorderRadius,
            background: theme.accentColor,
            color: "#fff",
            cursor: "pointer",
            fontSize: 10,
            fontWeight: 500,
          }}
        >
          {labels.librariesBrowseLibraries}
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".excalidrawlib,.json"
        style={{ display: "none" }}
        onChange={handleFileImport}
      />
    </div>,
    document.body,
  );
}

// ============================================================================
// Library section (collapsible)
// ============================================================================

function LibrarySection({
  lib,
  expanded,
  onToggle,
  onPlace,
  onUninstall,
  theme,
}: {
  lib: InstalledLibrary;
  expanded: boolean;
  onToggle: () => void;
  onPlace: (item: ExcalidrawLibraryItem) => void;
  onUninstall: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  const { labels } = useSBI18n();
  const [items, setItems] = useState<ExcalidrawLibraryItem[] | null>(null);

  // Load items lazily on expand
  useEffect(() => {
    if (expanded && items === null) {
      setItems(getItems(lib.id));
    }
  }, [expanded, items, lib.id]);

  return (
    <div style={{ marginBottom: 4 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 0",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={onToggle}
      >
        <svg
          width={12}
          height={12}
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        >
          <path
            d="M4 2l4 4-4 4"
            stroke={theme.textMuted}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            flex: 1,
            fontSize: 10,
            fontWeight: 600,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {lib.name}
        </span>
        <span
          style={{
            fontSize: 9,
            color: theme.textDisabled,
          }}
        >
          {lib.itemCount}
        </span>
        <button
          title={labels.librariesUninstall}
          onClick={(e) => {
            e.stopPropagation();
            onUninstall();
          }}
          style={{
            border: "none",
            background: "transparent",
            color: theme.textDisabled,
            cursor: "pointer",
            padding: "2px 4px",
            fontSize: 12,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      {expanded && items && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            padding: "2px 0 6px",
          }}
        >
          {items.map((item) => (
            <DraggableItemButton
              key={item.id}
              item={item}
              libId={lib.id}
              onClick={() => onPlace(item)}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Personal library section
// ============================================================================

function PersonalLibrarySection({
  items,
  onPlace,
  onRemove,
  theme,
}: {
  items: PersonalLibraryItem[];
  onPlace: (item: PersonalLibraryItem) => void;
  onRemove: (id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  const { labels } = useSBI18n();
  const [expanded, setExpanded] = useState(true);

  return (
    <div style={{ marginBottom: 4 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 0",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        <svg
          width={12}
          height={12}
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        >
          <path
            d="M4 2l4 4-4 4"
            stroke={theme.textMuted}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            flex: 1,
            fontSize: 10,
            fontWeight: 600,
            color: theme.textMuted,
            textTransform: "uppercase",
            letterSpacing: "0.03em",
          }}
        >
          {labels.librariesPersonal}
        </span>
        <span
          style={{
            fontSize: 9,
            color: theme.textDisabled,
          }}
        >
          {items.length}
        </span>
      </div>

      {expanded && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
            padding: "2px 0 6px",
          }}
        >
          {items.map((item) => (
            <DraggablePersonalItemButton
              key={item.id}
              item={item}
              onClick={() => onPlace(item)}
              onRemove={() => onRemove(item.id)}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
}
