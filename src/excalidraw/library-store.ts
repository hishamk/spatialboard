import type {
  ExcalidrawLibFile,
  ExcalidrawLibFileRaw,
  ExcalidrawLibraryItem,
} from "./types";
import { nanoid } from "nanoid";

// NOTE:
// This store manages Excalidraw library-file compatibility (indexing/import/search)
// for interoperability with community .excalidrawlib assets.

// ============================================================================
// Types
// ============================================================================

export interface InstalledLibrary {
  id: string;
  name: string;
  source: string;
  installedAt: number;
  itemCount: number;
  itemNames: string[];
}

export interface SearchResult {
  library: InstalledLibrary;
  item: ExcalidrawLibraryItem;
}

// ============================================================================
// Storage keys
// ============================================================================

const INDEX_KEY = "sb-excalib-index";
const LIB_PREFIX = "sb-excalib-";

// ============================================================================
// Library Store
// ============================================================================

function readIndex(): InstalledLibrary[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? (JSON.parse(raw) as InstalledLibrary[]) : [];
  } catch {
    return [];
  }
}

function writeIndex(libs: InstalledLibrary[]): void {
  localStorage.setItem(INDEX_KEY, JSON.stringify(libs));
}

function readLibFile(id: string): ExcalidrawLibFile | null {
  try {
    const raw = localStorage.getItem(LIB_PREFIX + id);
    return raw ? normalizeLibFile(JSON.parse(raw) as ExcalidrawLibFileRaw) : null;
  } catch {
    return null;
  }
}

/**
 * Normalize a raw library file (v1 or v2) into the canonical v2 format.
 * V1 uses `library: ExcalidrawElement[][]` — each item is a flat array of elements.
 * V2 uses `libraryItems: ExcalidrawLibraryItem[]` — proper objects with id/name/elements.
 */
function normalizeLibFile(raw: ExcalidrawLibFileRaw): ExcalidrawLibFile {
  if (raw.libraryItems) {
    return raw as ExcalidrawLibFile;
  }

  // V1 format: convert `library` array of element arrays into libraryItems
  const v1Items = raw.library ?? [];
  const libraryItems: ExcalidrawLibraryItem[] = v1Items.map((elements, idx) => ({
    id: nanoid(10),
    name: `Item ${idx + 1}`,
    status: "published",
    created: Date.now(),
    elements,
  }));

  return {
    type: "excalidrawlib",
    version: 2,
    source: raw.source,
    libraryItems,
  };
}

export function getInstalled(): InstalledLibrary[] {
  return readIndex();
}

export function getItems(libraryId: string): ExcalidrawLibraryItem[] {
  const lib = readLibFile(libraryId);
  return lib?.libraryItems ?? [];
}

export function install(
  rawLib: ExcalidrawLibFile | ExcalidrawLibFileRaw,
  meta?: { name?: string; source?: string },
): InstalledLibrary {
  const lib = normalizeLibFile(rawLib as ExcalidrawLibFileRaw);
  const id = nanoid(10);
  const itemNames = lib.libraryItems.map((item) => item.name || "Untitled");

  const entry: InstalledLibrary = {
    id,
    name: meta?.name || "Imported Library",
    source: meta?.source || "local-import",
    installedAt: Date.now(),
    itemCount: lib.libraryItems.length,
    itemNames,
  };

  // Store full library data
  localStorage.setItem(LIB_PREFIX + id, JSON.stringify(lib));

  // Update index
  const index = readIndex();
  index.push(entry);
  writeIndex(index);

  return entry;
}

export function uninstall(libraryId: string): void {
  localStorage.removeItem(LIB_PREFIX + libraryId);
  const index = readIndex().filter((l) => l.id !== libraryId);
  writeIndex(index);
}

export function search(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  const index = readIndex();
  for (const lib of index) {
    // Quick check: does any item name match?
    const hasMatch = lib.itemNames.some((n) => n.toLowerCase().includes(q));
    if (!hasMatch && !lib.name.toLowerCase().includes(q)) continue;

    // Load full library to get matching items
    const items = getItems(lib.id);
    for (const item of items) {
      const name = (item.name || "").toLowerCase();
      if (name.includes(q) || lib.name.toLowerCase().includes(q)) {
        results.push({ library: lib, item });
      }
    }
  }

  return results;
}

/**
 * Fetch and install an Excalidraw library from a URL.
 * Returns the installed library metadata.
 */
export async function installFromUrl(
  url: string,
  name: string,
): Promise<InstalledLibrary> {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to fetch library: ${resp.status}`);
  const raw = (await resp.json()) as ExcalidrawLibFileRaw;
  if (raw.type !== "excalidrawlib") {
    throw new Error("Invalid file: not an Excalidraw library");
  }
  const lib = normalizeLibFile(raw);
  return install(lib, { name, source: url });
}
