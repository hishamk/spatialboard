// table-guard.ts — bounded spans and widths for tables in rich-text blocks.
//
// A table cell's `colspan`, `rowspan` and `colwidth` are stored as written,
// and anyone who can edit a board can write them. The table code works per
// spanned column: the table map allocates width × height slots, the column
// group loops once per spanned column, and the block conversion builds arrays
// as long as a span or a header count. One cell with `colspan: 1e9` therefore
// hangs the editor before anything is shown.
//
// These rules bound the values for the table as a whole; they never remove a
// cell or any text. The table is laid out the way the table map lays it out
// (each cell at the first column of its row that no rowspan from above still
// covers), so that what the rules allow is what the table plugin builds:
// - a colspan is an integer in [1, MAX_COLSPAN], cut to the free columns at
//   the cell's place (running into a column covered from above makes the
//   table plugin's fix-up pad the table over and over), and shrinks further
//   only when the row, counting the columns rowspans carry into it, would
//   pass the column cap: each cell keeps one column for every cell after it
//   (a row of more than MAX_TABLE_COLUMNS single-column cells is kept);
// - the column cap is MAX_TABLE_COLUMNS, lowered for a table whose rows the
//   table plugin would pad with more than MAX_TABLE_PADDING cells (one wide
//   header over many one-cell rows);
// - a rowspan is an integer from 1 to the rows left in the table, this row
//   included, cut short before a row it would leave without room;
// - a colwidth is an array of whole pixel widths no longer than the cell's
//   colspan (0 or a missing entry means "no width"); anything else is null.
// Values already within bounds are kept as they are, so a table that needs no
// change comes back as the same object.
//
// Plain functions only: no React, no editor imports.

/**
 * Most columns a table row may reach, the columns carried down by earlier
 * rows' rowspans included (the table map's width).
 */
export const MAX_TABLE_COLUMNS = 512;
/**
 * Most cells the table plugin may add to fill a table's rows to its width (a
 * wide header over a long one-cell column is padded into a huge table): a
 * table that would need more gets a lower column cap.
 */
export const MAX_TABLE_PADDING = 4096;
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
 * The table laid out the way the table map lays it out, with spans bounded by
 * `cap`: row by row, each cell goes to the first column of its row that no
 * cell above still covers through its rowspan, and covers its colspan from
 * there.
 * - colspan: an integer in [1, MAX_COLSPAN], cut to the free columns at the
 *   cell's place (a cell that ran into a column covered from above is what
 *   makes the table plugin's fix-up pad the table again and again), and to the
 *   columns `cap` leaves after the columns rowspans carry into the row, the
 *   cells before it and one column for every cell after it;
 * - rowspan: an integer from 1 to the rows left, cut short before a row the
 *   cell's columns would leave without one column for each of its own cells;
 * - colwidth: see `boundColwidth`.
 * `width` is the table map's width (the widest row, carried columns
 * included) and `padding` the cells the table plugin adds to fill every row
 * to it.
 */
function layoutTable(
  rows: ReadonlyArray<ReadonlyArray<SpanAttrs | null>>,
  cap: number,
): { spans: Array<Array<CellSpans | null>>; width: number; padding: number } {
  const height = rows.length;
  const cellCount = rows.map((cells) => cells.filter((c) => c).length);
  const carried: number[] = rows.map(() => 0);
  const covered: Array<Array<[number, number]>> = rows.map(() => []);
  let width = 0;
  let area = 0;
  const spans = rows.map((cells, r) => {
    const blocks = covered[r].sort((a, b) => a[0] - b[0]);
    let next = 0;
    let col = 0;
    let after = cellCount[r];
    let used = carried[r];
    const out = cells.map((attrs) => {
      if (!attrs) return null;
      after--;
      while (next < blocks.length && blocks[next][0] <= col) col = Math.max(col, blocks[next++][1]);
      const free = next < blocks.length ? blocks[next][0] - col : Infinity;
      const room = Math.max(1, cap - used - after);
      const colspan = Math.min(clamp(spanInt(attrs.colspan), 1, MAX_COLSPAN), room, free);
      const wanted = clamp(spanInt(attrs.rowspan), 1, height - r);
      let rowspan = 1;
      while (rowspan < wanted && carried[r + rowspan] + colspan + cellCount[r + rowspan] <= cap) {
        carried[r + rowspan] += colspan;
        covered[r + rowspan].push([col, col + colspan]);
        rowspan++;
      }
      used += colspan;
      col += colspan;
      area += colspan * rowspan;
      return { colspan, rowspan, colwidth: boundColwidth(attrs.colwidth, colspan) };
    });
    width = Math.max(width, used);
    return out;
  });
  return { spans, width, padding: height * width - area };
}

/**
 * The bounded spans of every cell of a table given as rows of cell
 * attributes (`null` entries are row children that are not cells: they take
 * no column and are left alone), laid out as `layoutTable` describes. The
 * cap is MAX_TABLE_COLUMNS, or when the table plugin would add more than
 * MAX_TABLE_PADDING cells to fill the rows, a lower cap, found by binary
 * search, that keeps the padding within that bound; when even the narrowest
 * layout needs more (the rows' own cells are that uneven), the width cap
 * alone applies. No cell is ever removed, and a table already within
 * bounds keeps every value.
 */
export function boundTableSpans(rows: ReadonlyArray<ReadonlyArray<SpanAttrs | null>>): Array<Array<CellSpans | null>> {
  const widest = layoutTable(rows, MAX_TABLE_COLUMNS);
  if (widest.padding <= MAX_TABLE_PADDING) return widest.spans;
  let best = layoutTable(rows, 1);
  if (best.padding > MAX_TABLE_PADDING) return widest.spans;
  let lo = 1;
  let hi = MAX_TABLE_COLUMNS - 1;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    const attempt = layoutTable(rows, mid);
    if (attempt.padding <= MAX_TABLE_PADDING) {
      lo = mid;
      best = attempt;
    } else {
      hi = mid - 1;
    }
  }
  return best.spans;
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
 * For each cell of a table given as rows of cell attributes, the cell's
 * attributes with bounded spans and width (`boundTableSpans`), or null when
 * they are already within bounds (and for `null` entries).
 */
export function boundCellAttrs(
  rows: ReadonlyArray<ReadonlyArray<SpanAttrs | null>>,
): Array<Array<Record<string, unknown> | null>> {
  const spans = boundTableSpans(rows);
  return rows.map((cells, r) =>
    cells.map((attrs, i) => {
      const s = spans[r][i];
      if (!attrs || !s || !spansChanged(attrs, s)) return null;
      return { ...attrs, colspan: s.colspan, rowspan: s.rowspan, colwidth: s.colwidth };
    }),
  );
}

type Json = Record<string, unknown>;

function isObject(value: unknown): value is Json {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isPropsCell(cell: unknown): cell is Json & { props: Json } {
  return isObject(cell) && cell.type === "tableCell" && isObject(cell.props);
}

function boundTableContent(content: Json): Json {
  const rows = content.rows;
  if (!Array.isArray(rows)) return content;
  const cellsOf = (row: unknown): unknown[] => (isObject(row) && Array.isArray(row.cells) ? row.cells : []);
  let maxCells = 0;
  for (const row of rows) maxCells = Math.max(maxCells, cellsOf(row).length);
  // Cells without props (and legacy string or inline-array cells) span one column.
  const bounded = boundCellAttrs(
    rows.map((row: unknown) => cellsOf(row).map((cell): SpanAttrs => (isPropsCell(cell) ? (cell.props as SpanAttrs) : {}))),
  );
  let changed = false;
  const nextRows = rows.map((row: unknown, r: number) => {
    if (bounded[r].every((a) => !a)) return row;
    changed = true;
    const cells = cellsOf(row).map((cell, i) => {
      const next = bounded[r][i];
      if (!next || !isPropsCell(cell)) return cell;
      const props: Json = { ...next };
      if (cell.props.colspan === undefined && props.colspan === 1) delete props.colspan;
      if (cell.props.rowspan === undefined && props.rowspan === 1) delete props.rowspan;
      if (props.colwidth === undefined) delete props.colwidth;
      return { ...cell, props };
    });
    return { ...(row as Json), cells };
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
