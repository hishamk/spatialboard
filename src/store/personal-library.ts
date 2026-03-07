import { nanoid } from "nanoid";
import type { SpatialNode } from "../engine/types";

// ============================================================================
// Types
// ============================================================================

export interface PersonalLibraryItem {
  id: string;
  name: string;
  nodes: SpatialNode[];
  groupParent: [string, string][];
  createdAt: number;
}

// ============================================================================
// Storage
// ============================================================================

const STORAGE_KEY = "sb-personal-library";

function readItems(): PersonalLibraryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PersonalLibraryItem[]) : [];
  } catch {
    return [];
  }
}

function writeItems(items: PersonalLibraryItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// ============================================================================
// Public API
// ============================================================================

export function getPersonalItems(): PersonalLibraryItem[] {
  return readItems();
}

export function addPersonalItem(
  name: string,
  nodes: SpatialNode[],
  groupParent: Map<string, string>,
): PersonalLibraryItem {
  const cloned = structuredClone(nodes);

  // Normalize positions to (0, 0) origin
  if (cloned.length > 0) {
    let minX = Infinity;
    let minY = Infinity;
    for (const n of cloned) {
      if (n.x < minX) minX = n.x;
      if (n.y < minY) minY = n.y;
    }
    if (isFinite(minX)) {
      for (const n of cloned) {
        n.x -= minX;
        n.y -= minY;
      }
    }
  }

  // Filter groupParent to only entries relevant to saved nodes
  const groupIds = new Set(
    cloned.map((n) => n.groupId).filter(Boolean) as string[],
  );
  const relevantEntries: [string, string][] = [];
  for (const [child, parent] of groupParent) {
    if (groupIds.has(child)) {
      relevantEntries.push([child, parent]);
    }
  }

  const item: PersonalLibraryItem = {
    id: nanoid(10),
    name: name.trim() || "Untitled",
    nodes: cloned,
    groupParent: relevantEntries,
    createdAt: Date.now(),
  };

  const items = readItems();
  items.unshift(item);
  writeItems(items);

  return item;
}

export function removePersonalItem(id: string): void {
  const items = readItems().filter((item) => item.id !== id);
  writeItems(items);
}
