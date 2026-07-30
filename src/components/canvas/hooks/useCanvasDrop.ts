import { useRef, useCallback } from "react";
import { nanoid } from "nanoid";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ImageNode } from "../../../engine/types";
import { install as installExcalidrawLib, getItems as getLibraryItems } from "../../../excalidraw/library-store";
import type { ExcalidrawLibFileRaw } from "../../../excalidraw/types";
import { placeLibraryItem, placePersonalItem, LIBRARY_ITEM_MIME, PERSONAL_ITEM_MIME } from "../../sidebar/LibraryPanel";
import { GIF_ITEM_MIME, placeGif } from "../../sidebar/GifSearchPanel";
import { getPersonalItems } from "../../../store/personal-library";
import { extractSvgMarkup, placeSvgOnCanvas } from "../../../utils/svg-import";

/**
 * External drag-and-drop handlers for the canvas root: GIF / personal-library /
 * library items, `.excalidrawlib` files, SVGs, and image files. Owns the
 * duplicate-drop dedup ref. Pure extraction from SpatialCanvas — behavior identical.
 */
export function useCanvasDrop(engine: SpatialEngine) {
  /** Some browsers / host apps deliver two `drop` events for one OS file drop — coalesce by file + position. */
  const lastOsFileDropRef = useRef<{ sig: string; at: number } | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (
      e.dataTransfer.types.includes("Files") ||
      e.dataTransfer.types.includes(LIBRARY_ITEM_MIME) ||
      e.dataTransfer.types.includes(PERSONAL_ITEM_MIME) ||
      e.dataTransfer.types.includes(GIF_ITEM_MIME)
    ) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (engine.presentationMode) return;

      // Handle GIF item drag-and-drop
      const gifData = e.dataTransfer.getData(GIF_ITEM_MIME);
      if (gifData) {
        try {
          const item = JSON.parse(gifData);
          placeGif(engine, item, e.clientX, e.clientY);
        } catch (err) {
          console.error("Failed to place GIF:", err);
        }
        return;
      }

      // Handle personal library item drag-and-drop
      const personalData = e.dataTransfer.getData(PERSONAL_ITEM_MIME);
      if (personalData) {
        try {
          const { itemId } = JSON.parse(personalData) as { itemId: string };
          const items = getPersonalItems();
          const item = items.find((i) => i.id === itemId);
          if (item) {
            placePersonalItem(engine, item, e.clientX, e.clientY);
          }
        } catch (err) {
          console.error("Failed to place personal library item:", err);
        }
        return;
      }

      // Handle library item drag-and-drop from the library panel
      const libItemData = e.dataTransfer.getData(LIBRARY_ITEM_MIME);
      if (libItemData) {
        try {
          const { libraryId, itemId } = JSON.parse(libItemData) as {
            libraryId: string;
            itemId: string;
          };
          const items = getLibraryItems(libraryId);
          const item = items.find((i) => i.id === itemId);
          if (item) {
            placeLibraryItem(engine, item, e.clientX, e.clientY);
          }
        } catch (err) {
          console.error("Failed to place library item:", err);
        }
        return;
      }

      const file = e.dataTransfer.files[0];
      if (!file) return;

      const dropSig = `${file.name}|${file.size}|${file.lastModified}|${Math.round(e.clientX)}|${Math.round(e.clientY)}`;
      const now = performance.now();
      const prevDrop = lastOsFileDropRef.current;
      if (prevDrop && prevDrop.sig === dropSig && now - prevDrop.at < 150) {
        return;
      }
      lastOsFileDropRef.current = { sig: dropSig, at: now };
      e.stopPropagation();
      const ne = e.nativeEvent as DragEvent;
      if (typeof ne.stopImmediatePropagation === "function") {
        ne.stopImmediatePropagation();
      }

      // Handle .excalidrawlib file drops
      if (file.name.endsWith(".excalidrawlib") || file.name.endsWith(".excalidrawlib.json")) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const lib = JSON.parse(reader.result as string) as ExcalidrawLibFileRaw;
            if (lib.type === "excalidrawlib") {
              const name = file.name.replace(/\.excalidrawlib(\.json)?$/, "");
              installExcalidrawLib(lib, { name });
            }
          } catch (err) {
            console.error("Failed to import library:", err);
          }
        };
        reader.readAsText(file);
        return;
      }

      // Handle SVG files — read as text to preserve viewBox dimensions
      if (file.type === "image/svg+xml" || file.name.endsWith(".svg")) {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result as string;
          const svg = extractSvgMarkup(text);
          if (svg) {
            placeSvgOnCanvas(engine, svg, e.clientX, e.clientY);
          }
        };
        reader.readAsText(file);
        return;
      }

      if (!file.type.startsWith("image/")) return;
      const { x, y } = engine.screenToCanvas(e.clientX, e.clientY);
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const img = new Image();
        img.onload = () => {
          const w = Math.min(img.naturalWidth, 400);
          const h = Math.min(img.naturalHeight, 300);
          const aspect = img.naturalWidth / img.naturalHeight;
          const finalW = aspect >= 1 ? w : h * aspect;
          const finalH = aspect >= 1 ? w / aspect : h;
          engine.addNode({
            id: nanoid(10),
            type: "image",
            x,
            y,
            w: finalW,
            h: finalH,
            z: engine.nextZ(),
            data: { src: dataUrl },
          } as ImageNode);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    [engine]
  );

  return { handleDragOver, handleDrop };
}
