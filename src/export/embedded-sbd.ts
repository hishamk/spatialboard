/**
 * Editable exports — the draw.io / Excalidraw trick: exported PNG/SVG files
 * carry the board's SBD source as metadata, so the same file is both a plain
 * image anyone can view AND a document the board can reopen as editable nodes.
 *
 * PNG: an `iTXt` text chunk (keyword "spatialboard") inserted right after
 * IHDR — ignored by every image viewer, preserved by anything that doesn't
 * re-encode the pixels.
 * SVG: a `<metadata id="spatialboard-source">` element holding the SBD
 * base64-encoded (survives XML tooling; no escaping edge cases).
 */

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const PNG_KEYWORD = "spatialboard";
const SVG_METADATA_ID = "spatialboard-source";

// ---------------------------------------------------------------------------
// CRC32 (PNG chunk checksums)
// ---------------------------------------------------------------------------

let crcTable: Uint32Array | null = null;

function getCrcTable(): Uint32Array {
  if (crcTable) return crcTable;
  crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c >>> 0;
  }
  return crcTable;
}

function crc32(bytes: Uint8Array): number {
  const table = getCrcTable();
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// ---------------------------------------------------------------------------
// PNG
// ---------------------------------------------------------------------------

function hasPngSignature(png: Uint8Array): boolean {
  if (png.length < PNG_SIGNATURE.length) return false;
  return PNG_SIGNATURE.every((b, i) => png[i] === b);
}

/**
 * Return a copy of `png` with the SBD source embedded as an `iTXt` chunk
 * (inserted after IHDR). An existing spatialboard chunk is replaced.
 */
export function embedSBDInPNG(png: Uint8Array, sbd: string): Uint8Array {
  if (!hasPngSignature(png)) return png;

  const stripped = stripSpatialboardChunks(png);

  // iTXt data: keyword \0 compressionFlag(0) compressionMethod(0)
  //            languageTag \0 translatedKeyword \0 utf8-text
  const keyword = new TextEncoder().encode(PNG_KEYWORD);
  const text = new TextEncoder().encode(sbd);
  const data = new Uint8Array(keyword.length + 5 + text.length);
  data.set(keyword, 0);
  // 5 zero bytes: keyword terminator, compression flag, compression method,
  // empty language tag terminator, empty translated keyword terminator
  data.set(text, keyword.length + 5);

  const type = new TextEncoder().encode("iTXt");
  const chunk = new Uint8Array(4 + 4 + data.length + 4);
  const view = new DataView(chunk.buffer);
  view.setUint32(0, data.length);
  chunk.set(type, 4);
  chunk.set(data, 8);
  const crcInput = new Uint8Array(4 + data.length);
  crcInput.set(type, 0);
  crcInput.set(data, 4);
  view.setUint32(8 + data.length, crc32(crcInput));

  // IHDR is mandatory-first: signature(8) + length(4) + type(4) + 13 + crc(4)
  const insertAt = 8 + 4 + 4 + 13 + 4;
  const out = new Uint8Array(stripped.length + chunk.length);
  out.set(stripped.subarray(0, insertAt), 0);
  out.set(chunk, insertAt);
  out.set(stripped.subarray(insertAt), insertAt + chunk.length);
  return out;
}

/** Extract the embedded SBD source from a PNG, or null when absent. */
export function extractSBDFromPNG(png: Uint8Array): string | null {
  for (const { type, data } of iteratePngChunks(png)) {
    if (type !== "iTXt") continue;
    const parsed = parseITXt(data);
    if (parsed?.keyword === PNG_KEYWORD) return parsed.text;
  }
  return null;
}

function* iteratePngChunks(
  png: Uint8Array,
): Generator<{ type: string; data: Uint8Array; start: number; end: number }> {
  if (!hasPngSignature(png)) return;
  const view = new DataView(png.buffer, png.byteOffset, png.byteLength);
  let offset = 8;
  while (offset + 12 <= png.length) {
    const length = view.getUint32(offset);
    const end = offset + 12 + length;
    if (end > png.length) return; // truncated/corrupt — stop
    const type = String.fromCharCode(
      png[offset + 4],
      png[offset + 5],
      png[offset + 6],
      png[offset + 7],
    );
    yield { type, data: png.subarray(offset + 8, offset + 8 + length), start: offset, end };
    if (type === "IEND") return;
    offset = end;
  }
}

function parseITXt(data: Uint8Array): { keyword: string; text: string } | null {
  const keywordEnd = data.indexOf(0);
  if (keywordEnd < 0) return null;
  const keyword = new TextDecoder("latin1").decode(data.subarray(0, keywordEnd));
  const compressionFlag = data[keywordEnd + 1];
  // Skip language tag + translated keyword (two more NUL-terminated fields)
  let p = keywordEnd + 3;
  for (let fields = 0; fields < 2; fields++) {
    const nul = data.indexOf(0, p);
    if (nul < 0) return null;
    p = nul + 1;
  }
  if (compressionFlag !== 0) return null; // compressed payloads not produced by us
  return { keyword, text: new TextDecoder().decode(data.subarray(p)) };
}

/** Drop any previously-embedded spatialboard chunks (re-export of a re-import). */
function stripSpatialboardChunks(png: Uint8Array): Uint8Array {
  const ranges: Array<{ start: number; end: number }> = [];
  for (const { type, data, start, end } of iteratePngChunks(png)) {
    if (type === "iTXt" && parseITXt(data)?.keyword === PNG_KEYWORD) {
      ranges.push({ start, end });
    }
  }
  if (ranges.length === 0) return png;
  const kept: Uint8Array[] = [];
  let cursor = 0;
  for (const r of ranges) {
    kept.push(png.subarray(cursor, r.start));
    cursor = r.end;
  }
  kept.push(png.subarray(cursor));
  const total = kept.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of kept) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

// ---------------------------------------------------------------------------
// SVG
// ---------------------------------------------------------------------------

function base64EncodeUtf8(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let binary = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

function base64DecodeUtf8(b64: string): string | null {
  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

/** Return the SVG markup with the SBD source embedded as `<metadata>`. */
export function embedSBDInSVG(svg: string, sbd: string): string {
  const cleaned = svg.replace(
    new RegExp(`<metadata id="${SVG_METADATA_ID}"[^>]*>[^<]*</metadata>\\n?`, "g"),
    "",
  );
  const closing = cleaned.lastIndexOf("</svg>");
  if (closing < 0) return svg;
  const meta = `<metadata id="${SVG_METADATA_ID}" data-encoding="base64">${base64EncodeUtf8(sbd)}</metadata>\n`;
  return cleaned.slice(0, closing) + meta + cleaned.slice(closing);
}

/** Extract the embedded SBD source from SVG markup, or null when absent. */
export function extractSBDFromSVG(svg: string): string | null {
  const m = svg.match(
    new RegExp(`<metadata id="${SVG_METADATA_ID}"[^>]*>([^<]*)</metadata>`),
  );
  if (!m) return null;
  return base64DecodeUtf8(m[1].trim());
}
