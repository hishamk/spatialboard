import type { ExcalidrawLibFile, ExcalidrawLibFileRaw, ExcalidrawLibraryItem } from "./types";
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
export declare function getInstalled(): InstalledLibrary[];
export declare function getItems(libraryId: string): ExcalidrawLibraryItem[];
export declare function install(rawLib: ExcalidrawLibFile | ExcalidrawLibFileRaw, meta?: {
    name?: string;
    source?: string;
}): InstalledLibrary;
export declare function uninstall(libraryId: string): void;
export declare function search(query: string): SearchResult[];
/**
 * Fetch and install an Excalidraw library from a URL.
 * Returns the installed library metadata.
 */
export declare function installFromUrl(url: string, name: string): Promise<InstalledLibrary>;
