// Table-cell accessors — cells are `string | { text, ...style overrides }`
// (plain strings until styled). Every consumer (block, inspector, export,
// search, clipboard) reads/writes through these so the union stays in one place.

import type { TableCell, TextAlign } from "./types";

/** Per-cell overrides of the table-wide typography. */
export interface TableCellStyle {
  fontFamily?: string;
  color?: string;
  fontSize?: number;
  align?: TextAlign;
}

const STYLE_KEYS: (keyof TableCellStyle)[] = ["fontFamily", "color", "fontSize", "align"];

export function tableCellText(cell: TableCell | undefined): string {
  if (cell == null) return "";
  return typeof cell === "string" ? cell : cell.text ?? "";
}

export function tableCellStyle(cell: TableCell | undefined): TableCellStyle {
  if (cell == null || typeof cell === "string") return {};
  const { fontFamily, color, fontSize, align } = cell;
  return { fontFamily, color, fontSize, align };
}

/** Replace a cell's text, preserving its style overrides. */
export function withTableCellText(cell: TableCell | undefined, text: string): TableCell {
  if (cell == null || typeof cell === "string") return text;
  return { ...cell, text };
}

/** Merge style overrides into a cell; collapses back to a plain string when no
 *  overrides remain (undefined values clear an override). */
export function withTableCellStyle(
  cell: TableCell | undefined,
  patch: TableCellStyle,
): TableCell {
  const text = tableCellText(cell);
  const next: TableCellStyle = { ...tableCellStyle(cell), ...patch };
  let any = false;
  for (const k of STYLE_KEYS) {
    if (next[k] === undefined) delete next[k];
    else any = true;
  }
  if (!any) return text;
  return { text, ...next };
}
