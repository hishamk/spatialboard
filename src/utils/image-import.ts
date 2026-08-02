/** Longest edge an imported (dropped/pasted) raster image keeps. */
export const IMAGE_IMPORT_MAX_EDGE = 2048;
/** Data-URIs above this re-encode even when the dimensions are fine. */
const REENCODE_THRESHOLD_BYTES = 1_500_000;

/**
 * Downscale / re-encode oversized imported images. A 12-megapixel photo
 * arrives as a ~30MB PNG data URI — that breaks localStorage-backed hosts
 * (silent quota failure = the board stops persisting), bloats SBD and collab
 * payloads, and drags rendering. Capping the long edge and re-encoding as
 * WebP (alpha preserved; browsers without a WebP encoder fall back to PNG
 * automatically) turns that into a few hundred KB with no visible loss at
 * canvas scale.
 *
 * Animated GIFs are passed through untouched — re-encoding would freeze them.
 */
export function normalizeImportedImage(
  dataUrl: string,
  mimeType?: string,
): Promise<{ src: string; width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const keepAsIs =
        mimeType === "image/gif" ||
        (Math.max(w, h) <= IMAGE_IMPORT_MAX_EDGE && dataUrl.length <= REENCODE_THRESHOLD_BYTES);
      if (keepAsIs || w === 0 || h === 0) {
        resolve({ src: dataUrl, width: w, height: h });
        return;
      }
      const scale = Math.min(1, IMAGE_IMPORT_MAX_EDGE / Math.max(w, h));
      const cw = Math.max(1, Math.round(w * scale));
      const ch = Math.max(1, Math.round(h * scale));
      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ src: dataUrl, width: w, height: h });
        return;
      }
      ctx.drawImage(img, 0, 0, cw, ch);
      let out: string;
      try {
        out = canvas.toDataURL("image/webp", 0.85);
      } catch {
        resolve({ src: dataUrl, width: w, height: h });
        return;
      }
      // Never "optimize" into something larger than the original
      if (out.length >= dataUrl.length) {
        resolve({ src: dataUrl, width: w, height: h });
        return;
      }
      resolve({ src: out, width: cw, height: ch });
    };
    img.onerror = () => resolve({ src: dataUrl, width: 0, height: 0 });
    img.src = dataUrl;
  });
}
