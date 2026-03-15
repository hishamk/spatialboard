import { useState, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { useSBTheme } from "./ThemeContext";
import type { ExcalidrawDirectoryEntry } from "../../excalidraw/types";
import {
  installFromUrl,
  getInstalled,
} from "../../excalidraw/library-store";
import { useSBI18n } from "../LocalizationContext";

const DIRECTORY_URL = "https://libraries.excalidraw.com/libraries.json";
const BASE_URL = "https://libraries.excalidraw.com/libraries";

export default function LibraryDirectory({
  onClose,
  onInstalled,
}: {
  onClose: () => void;
  onInstalled: () => void;
}) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [entries, setEntries] = useState<ExcalidrawDirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());

  // Track which directory entry sources are already installed
  const refreshInstalled = useCallback(() => {
    const libs = getInstalled();
    const sources = new Set(libs.map((l) => l.source));
    setInstalledIds(sources);
  }, []);

  // Fetch directory
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resp = await fetch(DIRECTORY_URL);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = (await resp.json()) as ExcalidrawDirectoryEntry[];
        if (!cancelled) {
          setEntries(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(String(err));
          setLoading(false);
        }
      }
    })();
    refreshInstalled();
    return () => {
      cancelled = true;
    };
  }, [refreshInstalled]);

  // Filter entries by search query
  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.itemNames?.some((n) => n.toLowerCase().includes(q)),
    );
  }, [entries, query]);

  const handleInstall = useCallback(
    async (entry: ExcalidrawDirectoryEntry) => {
      setInstallingId(entry.id);
      try {
        const url = `${BASE_URL}/${entry.source}`;
        await installFromUrl(url, entry.name);
        refreshInstalled();
        onInstalled();
      } catch (err) {
        console.error("Failed to install library:", err);
      } finally {
        setInstallingId(null);
      }
    },
    [onInstalled, refreshInstalled],
  );

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
      }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: 620,
          maxWidth: "90vw",
          maxHeight: "80vh",
          background: theme.panelBg,
          border: `1px solid ${theme.border}`,
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px 12px",
            borderBottom: `1px solid ${theme.border}`,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.text,
              }}
            >
              {labels.libraryDirectoryTitle}
            </span>
            <button
              onClick={onClose}
              style={{
                border: "none",
                background: "transparent",
                color: theme.textMuted,
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
                padding: "2px 6px",
              }}
            >
              ×
            </button>
          </div>
          <input
            type="text"
            placeholder={labels.libraryDirectorySearchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: "100%",
              padding: "7px 10px",
              border: `1px solid ${theme.border}`,
              borderRadius: 6,
              background: theme.controlBg,
              color: theme.text,
              fontSize: 12,
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
            padding: "8px 20px",
          }}
        >
          {loading && (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: theme.textMuted,
                fontSize: 12,
              }}
            >
              {labels.libraryDirectoryLoading}
            </div>
          )}
          {error && (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: "#ef4444",
                fontSize: 12,
              }}
            >
              {labels.libraryDirectoryFailedPrefix}: {error}
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: theme.textDisabled,
                fontSize: 12,
              }}
            >
              {labels.libraryDirectoryNoMatches}
            </div>
          )}
          {filtered.map((entry, idx) => {
            const isInstalled = installedIds.has(
              `${BASE_URL}/${entry.source}`,
            );
            const isInstalling = installingId === entry.id;
            return (
              <DirectoryCard
                key={entry.id || `dir-${idx}`}
                entry={entry}
                isInstalled={isInstalled}
                isInstalling={isInstalling}
                onInstall={() => handleInstall(entry)}
                theme={theme}
              />
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "8px 20px",
            borderTop: `1px solid ${theme.border}`,
            color: theme.textDisabled,
            fontSize: 10,
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {filtered.length} {labels.libraryDirectoryLibrariesCountSuffix} • {labels.libraryDirectoryPoweredBy}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function DirectoryCard({
  entry,
  isInstalled,
  isInstalling,
  onInstall,
  theme,
}: {
  entry: ExcalidrawDirectoryEntry;
  isInstalled: boolean;
  isInstalling: boolean;
  onInstall: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  const { labels } = useSBI18n();
  const previewUrl = entry.preview
    ? `${BASE_URL}/${entry.preview}`
    : null;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "10px 0",
        borderBottom: `1px solid ${theme.border}`,
        alignItems: "flex-start",
      }}
    >
      {/* Preview image */}
      {previewUrl && (
        <img
          src={previewUrl}
          alt={entry.name}
          loading="lazy"
          style={{
            width: 64,
            height: 64,
            objectFit: "cover",
            borderRadius: 6,
            border: `1px solid ${theme.border}`,
            flexShrink: 0,
            background: "#fff",
          }}
        />
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: theme.text,
            marginBottom: 2,
          }}
        >
          {entry.name}
        </div>
        {entry.authors?.length > 0 && (
          <div
            style={{
              fontSize: 10,
              color: theme.textMuted,
              marginBottom: 4,
            }}
          >
            {labels.libraryDirectoryBy} {entry.authors.map((a) => a.name).join(", ")}
          </div>
        )}
        {entry.description && (
          <div
            style={{
              fontSize: 10,
              color: theme.textSecondary,
              lineHeight: 1.4,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
            }}
          >
            {entry.description}
          </div>
        )}
      </div>

      {/* Install button */}
      <button
        onClick={onInstall}
        disabled={isInstalled || isInstalling}
        style={{
          flexShrink: 0,
          padding: "5px 10px",
          border: isInstalled
            ? `1px solid ${theme.border}`
            : "none",
          borderRadius: 4,
          background: isInstalled
            ? "transparent"
            : isInstalling
              ? theme.controlBgActive
              : theme.accentColor,
          color: isInstalled
            ? theme.textMuted
            : "#fff",
          cursor:
            isInstalled || isInstalling ? "default" : "pointer",
          fontSize: 10,
          fontWeight: 500,
          opacity: isInstalling ? 0.7 : 1,
        }}
      >
        {isInstalled ? labels.libraryDirectoryInstalled : isInstalling ? labels.libraryDirectoryInstalling : labels.libraryDirectoryInstall}
      </button>
    </div>
  );
}
