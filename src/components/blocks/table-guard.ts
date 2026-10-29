// table-guard.ts — bounded spans and widths for tables in rich-text blocks.
//
// A table cell's `colspan`, `rowspan` and `colwidth` are stored as written,
// and anyone who can edit a board can write them. The table code works per
// spanned column: the table map allocates width × height slots, the column
// group loops once per spanned column, and the block conversion builds arrays
// as long as a span or a header count. One cell with `colspan: 1e9` therefore
// hangs the editor before anything is shown.
//
// These rules bound the values; they never remove a cell or any text:
// - a colspan is an integer in [1, MAX_COLSPAN], and shrinks further only when
//   the row would pass MAX_TABLE_COLUMNS: each cell may span the columns the
//   cap leaves after the cells before it and one column for every cell after
//   it (a row of more than MAX_TABLE_COLUMNS single-column cells is kept);
// - a rowspan is an integer from 1 to the rows left in the table, this row
//   included;
// - a colwidth is an array of whole pixel widths no longer than the cell's
//   colspan (0 or a missing entry means "no width"); anything else is null.
// Values already within bounds are kept as they are, so a table that needs no
// change comes back as the same object.
//
// Plain functions only: no React, no editor imports.

/** Most columns a table row may reach through its spans. */
export const MAX_TABLE_COLUMNS = 256;
/** Upper bound for a single colspan. */
export const MAX_COLSPAN = 1_000;
/** Upper bound for one column width in pixels. */
export const MAX_COLWIDTH = 100_000;

/** The span and width attributes of one table cell, as stored. */
export interface SpanAttrs {
  colspan?: unknown;
  rowspan?: unknown;
  colwidth?: unknown;
}

/** A cell's bounded spans and width. */
export interface CellSpans {
  colspan: number;
  rowspan: number;
  colwidth: unknown;
}

function finiteNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/** A stored span as an integer: numbers and numeric strings are rounded, anything else is 1. */
function spanInt(value: unknown): number {
  const n = finiteNumber(value);
  return n === null ? 1 : Math.round(n);
}

/**
 * One column width as whole pixels in [1, MAX_COLWIDTH], or 0 for "no
 * width". Objects are never coerced, so no `valueOf`/`toString` runs.
 */
export function safeColwidthEntry(value: unknown): number {
  const n = finiteNumber(value);
  if (n === null) return 0;
  const rounded = Math.round(n);
  if (rounded <= 0) return 0;
  return Math.min(rounded, MAX_COLWIDTH);
}

function cleanWidthEntry(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= MAX_COLWIDTH)
  );
}

/**
 * A cell's `colwidth` for a cell spanning `colspan` columns: the value itself
 * when it is missing or already clean, null when it is not an array, else the
 * entries made safe and cut to `colspan` (never padded).
 */
export function boundColwidth(value: unknown, colspan: number): unknown {
  if (value === null || value === undefined) return value;
  if (!Array.isArray(value)) return null;
  let clean = value.length <= colspan;
  for (let i = 0; clean && i < value.length; i++) clean = cleanWidthEntry(value[i]);
  if (clean) return value;
  const out: unknown[] = [];
  const n = Math.min(value.length, colspan);
  for (let i = 0; i < n; i++) out.push(cleanWidthEntry(value[i]) ? value[i] : safeColwidthEntry(value[i]));
  return out;
}

/**
 * The bounded spans of one row's cells, in order. `cells` holds each cell's
 * attributes, or null for a row child that is not a cell (it takes no
 * column and is left alone). `rowsLeft` counts this row and the rows after it.
 */
export function boundRow(cells: ReadonlyArray<SpanAttrs | null>, rowsLeft: number): Array<CellSpans | null> {
  let after = 0;
  for (const c of cells) if (c) after++;
  const out: Array<CellSpans | null> = [];
  let used = 0;
  for (const attrs of cells) {
    if (!attrs) {
      out.push(null);
      continue;
    }
    after--;
    const room = Math.max(1, MAX_TABLE_COLUMNS - used - after);
    const colspan = Math.min(clamp(spanInt(attrs.colspan), 1, MAX_COLSPAN), room);
    const rowspan = clamp(spanInt(attrs.rowspan), 1, Math.max(1, rowsLeft));
    used += colspan;
    out.push({ colspan, rowspan, colwidth: boundColwidth(attrs.colwidth, colspan) });
  }
  return out;
}

/** The bounded spans of every cell of a table given as rows of cell attributes. */
export function boundTableSpans(rows: ReadonlyArray<ReadonlyArray<SpanAttrs | null>>): Array<Array<CellSpans | null>> {
  return rows.map((cells, i) => boundRow(cells, rows.length - i));
}

/**
 * True when `spans` differ from the stored `attrs`. A missing colspan or
 * rowspan reads as 1, so an absent span that stays 1 is not a change.
 */
function spansChanged(attrs: SpanAttrs, spans: CellSpans): boolean {
  const sameSpan = (stored: unknown, next: number) => stored === next || (stored === undefined && next === 1);
  return !sameSpan(attrs.colspan, spans.colspan) || !sameSpan(attrs.rowspan, spans.rowspan) || attrs.colwidth !== spans.colwidth;
}

/**
 * For each cell of one row, the cell's attributes with bounded spans and
 * width, or null when they are already within bounds (and for `null`
 * entries, row children that are not cells).
 */
export function boundCellAttrs(
  cells: ReadonlyArray<SpanAttrs | null>,
  rowsLeft: number,
): Array<Record<string, unknown> | null> {
  const spans = boundRow(cells, rowsLeft);
  return cells.map((attrs, i) => {
    const s = spans[i];
    if (!attrs || !s || !spansChanged(attrs, s)) return null;
    return { ...attrs, colspan: s.colspan, rowspan: s.rowspan, colwidth: s.colwidth };
  });
}

type Json = Record<string, unknown>;

function isObject(value: unknown): value is Json {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function boundTableContent(content: Json): Json {
  const rows = content.rows;
  if (!Array.isArray(rows)) return content;
  let changed = false;
  let maxCells = 0;
  const nextRows = rows.map((row: unknown, rowIndex: number) => {
    if (!isObject(row) || !Array.isArray(row.cells)) return row;
    const cells = row.cells as unknown[];
    maxCells = Math.max(maxCells, cells.length);
    // Cells without props (and legacy string or inline-array cells) span one column.
    const attrs = cells.map((cell): SpanAttrs => {
      if (isObject(cell) && cell.type === "tableCell" && isObject(cell.props)) return cell.props as SpanAttrs;
      return {};
    });
    const bounded = boundCellAttrs(attrs, rows.length - rowIndex);
    if (bounded.every((a) => !a)) return row;
    const nextCells = cells.map((cell, i) => {
      const next = bounded[i];
      if (!next || !isObject(cell) || !isObject(cell.props)) return cell;
      const props: Json = { ...next };
      if (cell.props.colspan === undefined && props.colspan === 1) delete props.colspan;
      if (cell.props.rowspan === undefined && props.rowspan === 1) delete props.rowspan;
      if (props.colwidth === undefined) delete props.colwidth;
      return { ...cell, props };
    });
    changed = true;
    return { ...row, cells: nextCells };
  });
  const next: Json = changed ? { ...content, rows: nextRows } : { ...content };
  let headerChanged = false;
  const header = (key: "headerRows" | "headerCols", max: number) => {
    const value = content[key];
    if (value === undefined) return;
    if (typeof value !== "number" || !Number.isFinite(value)) {
      delete next[key];
      headerChanged = true;
      return;
    }
    const bounded = clamp(Math.round(value), 0, max);
    if (bounded !== value) {
      next[key] = bounded;
      headerChanged = true;
    }
  };
  header("headerRows", rows.length);
  header("headerCols", maxCells);
  const widths = content.columnWidths;
  if (widths !== undefined) {
    if (!Array.isArray(widths)) {
      next.columnWidths = [];
      headerChanged = true;
    } else {
      let clean = widths.length <= MAX_TABLE_COLUMNS;
      for (let i = 0; clean && i < widths.length; i++) clean = cleanWidthEntry(widths[i]);
      if (!clean) {
        next.columnWidths = widths
          .slice(0, MAX_TABLE_COLUMNS)
          .map((w: unknown) => (cleanWidthEntry(w) ? w : safeColwidthEntry(w) || undefined));
        headerChanged = true;
      }
    }
  }
  return changed || headerChanged ? next : content;
}

/**
 * Rich-text blocks with every table's spans, header counts and column widths
 * bounded, through `children` as well. Table cells and their text are never
 * removed. Returns `blocks` itself when nothing needed a change, and any
 * unchanged block as the same object.
 */
export function sanitizeTableBlocks<T>(blocks: T): T {
  if (!Array.isArray(blocks)) return blocks;
  let changed = false;
  const next = blocks.map((block: unknown) => {
    if (!isObject(block)) return block;
    let out = block;
    if (block.type === "table" && isObject(block.content) && block.content.type === "tableContent") {
      const content = boundTableContent(block.content);
      if (content !== block.content) out = { ...out, content };
    }
    if (Array.isArray(block.children) && block.children.length > 0) {
      const children = sanitizeTableBlocks(block.children);
      if (children !== block.children) out = { ...out, children };
    }
    if (out !== block) changed = true;
    return out;
  });
  return (changed ? next : blocks) as T;
}
