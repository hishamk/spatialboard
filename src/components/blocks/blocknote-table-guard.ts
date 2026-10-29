// blocknote-table-guard.ts — the editor wiring for table-guard.ts in the
// rich-text block.
//
// The table map and the table node view read a cell's spans straight from the
// document, so a stored or pasted `colspan: 1e9` hangs the editor in the
// table plugin's own transaction hook. This plugin bounds spans and widths
// (table-guard.ts) in an appended transaction that runs before the table
// plugin's: a TipTap extension with a priority above the table extension's
// (100). The correction is kept out of undo history, and a document that
// needs no change gets no transaction. Pasted and dropped content is bounded
// before the table plugin's paste handler reads it (it pads the pasted rows
// once per spanned column). Block JSON is bounded before it is converted
// (`sanitizeTableBlocks`), since the conversion itself allocates per span.

import { createExtension } from "@blocknote/core";
import { Extension } from "@tiptap/core";
import { Fragment, Slice, type Node as PMNode } from "@tiptap/pm/model";
import { Plugin, PluginKey, type EditorState, type Transaction } from "@tiptap/pm/state";
import { boundCellAttrs, type SpanAttrs } from "./table-guard";

function tableRole(node: PMNode): string {
  return String(node.type.spec.tableRole ?? "");
}

function isCell(node: PMNode): boolean {
  return !node.isText && /cell/.test(tableRole(node));
}

/** Sets bounded spans on the cells of the table at `pos` that need them; true when it changed any. */
function boundTable(tr: Transaction, table: PMNode, pos: number): boolean {
  const rows: Array<Array<SpanAttrs | null>> = [];
  const positions: number[][] = [];
  table.forEach((row, rowOffset) => {
    const cells: Array<SpanAttrs | null> = [];
    const at: number[] = [];
    row.forEach((cell, offset) => {
      cells.push(isCell(cell) ? (cell.attrs as SpanAttrs) : null);
      at.push(pos + 1 + rowOffset + 1 + offset);
    });
    rows.push(cells);
    positions.push(at);
  });
  let changed = false;
  boundCellAttrs(rows).forEach((cells, r) =>
    cells.forEach((attrs, i) => {
      if (!attrs) return;
      tr.setNodeMarkup(positions[r][i], null, attrs);
      changed = true;
    }),
  );
  return changed;
}

/** `rows` (a table's body, or rows cut from one) with their cells' spans bounded; unchanged rows are kept. */
function boundRows(rows: PMNode[]): PMNode[] {
  const attrs = rows.map((row) => {
    const cells: Array<SpanAttrs | null> = [];
    row.forEach((cell) => cells.push(isCell(cell) ? (cell.attrs as SpanAttrs) : null));
    return cells;
  });
  return boundCellAttrs(attrs).map((cells, r) => {
    const row = rows[r];
    let content = row.content;
    cells.forEach((next, i) => {
      if (!next) return;
      const cell = row.child(i);
      content = content.replaceChild(i, cell.type.create(next, cell.content, cell.marks));
    });
    return content === row.content ? row : row.copy(content);
  });
}

/**
 * `fragment` with table spans bounded at any depth: a run of rows (a table's
 * body, or rows cut from one) is bounded as a table, and at the top of a
 * slice a run of cells as one row.
 */
function boundFragment(fragment: Fragment, top: boolean): Fragment {
  const children: PMNode[] = [];
  let changed = false;
  fragment.forEach((child) => {
    let next = child;
    if (child.childCount > 0) {
      const inner = boundFragment(child.content, false);
      if (inner !== child.content) next = child.copy(inner);
    }
    if (next !== child) changed = true;
    children.push(next);
  });
  const roles = children.map(tableRole);
  if (children.length > 0 && roles.every((r) => r === "row")) {
    boundRows(children).forEach((row, i) => {
      if (row !== children[i]) changed = true;
      children[i] = row;
    });
  } else if (top && children.length > 0 && roles.every((r) => /cell/.test(r))) {
    boundCellAttrs([children.map((c) => c.attrs as SpanAttrs)])[0].forEach((attrs, i) => {
      if (!attrs) return;
      const cell = children[i];
      children[i] = cell.type.create(attrs, cell.content, cell.marks);
      changed = true;
    });
  }
  return changed ? Fragment.from(children) : fragment;
}

/**
 * Pasted or dropped content with table spans bounded, or `slice` itself. The
 * table plugin's paste handler pads the pasted rows once per spanned column
 * before any transaction runs, so the guard bounds the slice first
 * (`transformPasted` runs before `handlePaste`).
 */
export function boundSlice(slice: Slice): Slice {
  const content = boundFragment(slice.content, true);
  return content === slice.content ? slice : new Slice(content, slice.openStart, slice.openEnd);
}

/**
 * Calls `f` for every node of `cur` that is not shared with `old`, the way
 * the table plugin finds the tables a transaction touched.
 */
function changedDescendants(old: PMNode, cur: PMNode, offset: number, f: (node: PMNode, pos: number) => void): void {
  const oldSize = old.childCount;
  const curSize = cur.childCount;
  outer: for (let i = 0, j = 0; i < curSize; i++) {
    const child = cur.child(i);
    for (let scan = j, end = Math.min(oldSize, i + 3); scan < end; scan++) {
      if (old.child(scan) === child) {
        j = scan + 1;
        offset += child.nodeSize;
        continue outer;
      }
    }
    f(child, offset);
    if (j < oldSize && old.child(j).sameMarkup(child)) changedDescendants(old.child(j), child, offset + 1, f);
    else child.nodesBetween(0, child.content.size, f, offset + 1);
    offset += child.nodeSize;
  }
}

/**
 * Transaction meta naming the guard's correction: a plain string, so a host
 * can recognise the correction whichever copy of the guard made it. Matches
 * the other copies.
 */
export const TABLE_SPAN_GUARD_META = "tableSpanGuard";

export const tableGuardPluginKey = new PluginKey("tableSpanGuard");

/** A transaction bounding the spans of every table `newState` changed, or null. */
export function boundTablesTransaction(oldState: EditorState, newState: EditorState): Transaction | null {
  const tr = newState.tr;
  let changed = false;
  changedDescendants(oldState.doc, newState.doc, 0, (node, pos) => {
    if (tableRole(node) === "table" && boundTable(tr, node, pos)) changed = true;
  });
  if (!changed) return null;
  return tr.setMeta("addToHistory", false).setMeta(TABLE_SPAN_GUARD_META, true);
}

/** The ProseMirror plugin: bounds table spans after every document change. */
export function tableSpanGuardPlugin(): Plugin {
  return new Plugin({
    key: tableGuardPluginKey,
    appendTransaction(transactions, oldState, newState) {
      if (!transactions.some((tr) => tr.docChanged)) return null;
      return boundTablesTransaction(oldState, newState);
    },
    props: {
      transformPasted: (slice) => boundSlice(slice),
    },
  });
}

/** The guard as a TipTap extension, ranked above the table extension. */
export const TableSpanGuard = Extension.create({
  name: "tableSpanGuard",
  priority: 1100,
  addProseMirrorPlugins() {
    return [tableSpanGuardPlugin()];
  },
});

/** Pass `tableGuardExtension()` in the block editor's `extensions`. */
export const tableGuardExtension = createExtension(() => ({
  key: "tableGuard",
  tiptapExtensions: [TableSpanGuard],
}));
