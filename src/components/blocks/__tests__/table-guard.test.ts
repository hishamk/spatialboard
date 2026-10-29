import { describe, expect, it } from "vitest";
import { BlockNoteEditor } from "@blocknote/core";
import { EditorState } from "@tiptap/pm/state";
import { TableMap, __pastedCells } from "@tiptap/pm/tables";
import { Fragment, Slice, type Node as PMNode } from "@tiptap/pm/model";
import {
  boundTableSpans,
  sanitizeTableBlocks,
  boundCellAttrs,
  MAX_TABLE_COLUMNS,
  type SpanAttrs,
} from "../table-guard";
import { boundSlice, tableGuardExtension, TABLE_SPAN_GUARD_META } from "../blocknote-table-guard";

// Span rule vectors: rows of cell attributes (null = a row child that is not
// a cell) and the bounded [colspan, rowspan, colwidth] of each cell.
const cellRow = (n: number, colspan = 1) => Array.from({ length: n }, () => ({ colspan, rowspan: 1, colwidth: null }));
const SPAN_VECTORS = [
  { name: "colspan 1e9", rows: [[{ colspan: 1e9, rowspan: 1, colwidth: null }]], expect: [[[512, 1, null]]] },
  { name: "colspan \"1e9\"", rows: [[{ colspan: "1e9", rowspan: 1, colwidth: null }]], expect: [[[512, 1, null]]] },
  { name: "colspan -3", rows: [[{ colspan: -3, rowspan: 1, colwidth: null }]], expect: [[[1, 1, null]]] },
  { name: "colspan 2.4", rows: [[{ colspan: 2.4, rowspan: 1, colwidth: null }]], expect: [[[2, 1, null]]] },
  { name: "colspan null", rows: [[{ colspan: null, rowspan: 1, colwidth: null }]], expect: [[[1, 1, null]]] },
  { name: "colspan \"x\"", rows: [[{ colspan: "x", rowspan: 1, colwidth: null }]], expect: [[[1, 1, null]]] },
  { name: "colspan \"  7 \"", rows: [[{ colspan: "  7 ", rowspan: 1, colwidth: null }]], expect: [[[7, 1, null]]] },
  { name: "colspan Infinity", rows: [[{ colspan: Infinity, rowspan: 1, colwidth: null }]], expect: [[[1, 1, null]]] },
  { name: "colspan NaN", rows: [[{ colspan: NaN, rowspan: 1, colwidth: null }]], expect: [[[1, 1, null]]] },
  { name: "colspan object", rows: [[{ colspan: { n: 7 }, rowspan: 1, colwidth: null }]], expect: [[[1, 1, null]]] },
  {
    name: "three cells of colspan 200 share the cap",
    rows: [[{ colspan: 200, rowspan: 1, colwidth: null }, { colspan: 200, rowspan: 1, colwidth: null }, { colspan: 200, rowspan: 1, colwidth: null }]],
    expect: [[[200, 1, null], [200, 1, null], [112, 1, null]]],
  },
  {
    name: "rowspan beyond the last row",
    rows: [[{ colspan: 1, rowspan: 9, colwidth: null }, { colspan: 1, rowspan: 1, colwidth: null }], [{ colspan: 1, rowspan: 1, colwidth: null }]],
    expect: [[[1, 2, null], [1, 1, null]], [[1, 1, null]]],
  },
  {
    name: "rowspan 1e9, \"3\" and -1",
    rows: [[{ colspan: 1, rowspan: "3", colwidth: null }], [{ colspan: 1, rowspan: -1, colwidth: null }], [{ colspan: 1, rowspan: 1e9, colwidth: null }]],
    expect: [[[1, 3, null]], [[1, 1, null]], [[1, 1, null]]],
  },
  { name: "colwidth strings", rows: [[{ colspan: 2, rowspan: 1, colwidth: ["100", "1px;background:red"] }]], expect: [[[2, 1, [100, 0]]]] },
  { name: "colwidth object", rows: [[{ colspan: 1, rowspan: 1, colwidth: { a: 1 } }]], expect: [[[1, 1, null]]] },
  { name: "colwidth string", rows: [[{ colspan: 1, rowspan: 1, colwidth: "100" }]], expect: [[[1, 1, null]]] },
  { name: "colwidth longer than the span", rows: [[{ colspan: 1, rowspan: 1, colwidth: [100, 200, 300] }]], expect: [[[1, 1, [100]]]] },
  { name: "colwidth entries out of range", rows: [[{ colspan: 4, rowspan: 1, colwidth: [-5, 2.6, 1e9, null] }]], expect: [[[4, 1, [0, 3, 100000, null]]]] },
  { name: "colwidth kept under a shrunk span", rows: [[{ colspan: 1e9, rowspan: 1, colwidth: [10, 20, 30] }]], expect: [[[512, 1, [10, 20, 30]]]] },
  {
    name: "a row child that is not a cell takes no column",
    rows: [[{ colspan: 2, rowspan: 1, colwidth: null }, null, { colspan: 3, rowspan: 1, colwidth: null }]],
    expect: [[[2, 1, null], null, [3, 1, null]]],
  },
  {
    name: "cells within bounds are kept",
    rows: [[{ colspan: 2, rowspan: 2, colwidth: [100, null] }, { colspan: 1, rowspan: 1, colwidth: [0] }], [{ colspan: 1, rowspan: 1, colwidth: null }]],
    expect: [[[2, 2, [100, null]], [1, 1, [0]]], [[1, 1, null]]],
  },
  {
    name: "500 cells of colspan 1000",
    rows: [cellRow(500, 1000)],
    expect: [[[13, 1, null], ...Array.from({ length: 499 }, () => [1, 1, null])]],
  },
  {
    name: "a row of 600 single-column cells is kept",
    rows: [cellRow(600)],
    expect: [Array.from({ length: 600 }, () => [1, 1, null])],
  },
  {
    name: "a 300-column table with a colspan-2 header is kept",
    rows: [[{ colspan: 2, rowspan: 1, colwidth: null }, ...cellRow(298)], cellRow(300)],
    expect: [[[2, 1, null], ...Array.from({ length: 298 }, () => [1, 1, null])], Array.from({ length: 300 }, () => [1, 1, null])],
  },
  {
    name: "carried columns count against the cap",
    rows: [[{ colspan: 300, rowspan: 2, colwidth: null }], [{ colspan: 300, rowspan: 1, colwidth: null }]],
    expect: [[[300, 2, null]], [[212, 1, null]]],
  },
  {
    name: "a rowspan stops before a row it would leave without room",
    rows: [[{ colspan: 500, rowspan: 3, colwidth: null }], [{ colspan: 1, rowspan: 1, colwidth: null }], cellRow(20)],
    expect: [[[500, 2, null]], [[1, 1, null]], Array.from({ length: 20 }, () => [1, 1, null])],
  },
  {
    name: "a staircase of 12 rows stays within the cap",
    rows: Array.from({ length: 12 }, (_, r) => [{ colspan: 256, rowspan: 12 - r, colwidth: null }]),
    expect: Array.from({ length: 12 }, (_, r) => [[256, r === 0 ? 12 : 1, null]]),
  },
  {
    name: "a cell that would run into a column covered from above is cut to the free columns",
    rows: [
      [{ colspan: 3, rowspan: 1, colwidth: null }, { colspan: 300, rowspan: 2, colwidth: null }],
      [{ colspan: 2, rowspan: 1, colwidth: null }, { colspan: 210, rowspan: 1, colwidth: null }],
    ],
    expect: [[[3, 1, null], [300, 2, null]], [[2, 1, null], [1, 1, null]]],
  },
  {
    name: "a one-column gap before a covered block takes one column",
    rows: [[{ colspan: 1, rowspan: 1, colwidth: null }, { colspan: 256, rowspan: 2, colwidth: null }], [{ colspan: 256, rowspan: 1, colwidth: null }]],
    expect: [[[1, 1, null], [256, 2, null]], [[1, 1, null]]],
  },
  ...[40, 200, 2000].map((height) => ({
    name: `a ${height}-row table under a 512-column header is padded with at most 4096 cells`,
    rows: [[{ colspan: 512, rowspan: 1, colwidth: null }], ...Array.from({ length: height - 1 }, () => cellRow(1))],
    expect: [[[Math.floor(4096 / (height - 1)) + 1, 1, null]], ...Array.from({ length: height - 1 }, () => [[1, 1, null]])],
  })),
];

const tuples = (rows: ReadonlyArray<ReadonlyArray<SpanAttrs | null>>) =>
  boundTableSpans(rows).map((r) => r.map((s) => (s ? [s.colspan, s.rowspan, s.colwidth] : null)));

describe("span rules", () => {
  it.each(SPAN_VECTORS.map((v) => [v.name, v] as const))("%s", (_name, v) => {
    expect(tuples(v.rows)).toEqual(v.expect);
  });

  it("keeps clean cells as written, colwidth included", () => {
    const rows: SpanAttrs[][] = [
      [{ colspan: 2, rowspan: 1, colwidth: [120, 80] }, { colspan: 1, rowspan: 2, colwidth: null }],
      [{ colspan: 1, rowspan: 1, colwidth: [0] }, { colspan: 1, rowspan: 1, colwidth: null }],
      [{ colspan: 1, rowspan: 1, colwidth: null }, { colspan: 1, rowspan: 1, colwidth: null }, { colspan: 1, rowspan: 1, colwidth: null }],
    ];
    const spans = boundTableSpans(rows);
    expect(boundCellAttrs(rows)).toEqual(rows.map((cells) => cells.map(() => null)));
    rows.forEach((cells, r) => cells.forEach((attrs, c) => expect(spans[r][c]!.colwidth).toBe(attrs.colwidth)));
  });
});

const cell = (text: string, props: Record<string, unknown> = {}) => ({ type: "tableCell", content: [text], props });

function tableBlock(content: Record<string, unknown>, children: unknown[] = []) {
  return { id: "t1", type: "table", props: {}, content: { type: "tableContent", ...content }, children };
}

describe("sanitizeTableBlocks", () => {
  it("bounds header counts, column widths and cell spans", () => {
    const hostile = tableBlock({
      headerRows: 1e9,
      headerCols: 1e9,
      columnWidths: ["1px;background:url(https://evil.example/x)", 120, -4, 2.5],
      rows: [{ cells: [cell("a", { colspan: 1e9, rowspan: 1e9 }), cell("b")] }, { cells: ["c", ["d"]] }],
    });
    const [out] = sanitizeTableBlocks([hostile]) as any[];
    expect(out.content.headerRows).toBe(2);
    expect(out.content.headerCols).toBe(2);
    expect(out.content.columnWidths).toEqual([undefined, 120, undefined, 3]);
    expect(out.content.rows[0].cells[0].props).toEqual({ colspan: 511, rowspan: 1 });
    expect(out.content.rows[0].cells[1]).toBe(hostile.content.rows[0].cells[1]);
    expect(out.content.rows[1]).toBe(hostile.content.rows[1]);
    expect(out.content.rows[0].cells[0].content).toEqual(["a"]);
  });

  it("drops header counts that are not numbers and replaces non-array widths", () => {
    const [out] = sanitizeTableBlocks([
      tableBlock({ headerRows: "1e9", headerCols: NaN, columnWidths: { 0: "1px;color:red" }, rows: [{ cells: ["a"] }] }),
    ]) as any[];
    expect("headerRows" in out.content).toBe(false);
    expect("headerCols" in out.content).toBe(false);
    expect(out.content.columnWidths).toEqual([]);
  });

  it("reaches tables nested in children", () => {
    const inner = tableBlock({ rows: [{ cells: [cell("x", { colspan: 1e9 })] }] });
    const outer = { id: "p", type: "paragraph", props: {}, content: [], children: [inner] };
    const [out] = sanitizeTableBlocks([outer]) as any[];
    expect(out.children[0].content.rows[0].cells[0].props.colspan).toBe(MAX_TABLE_COLUMNS);
  });

  it("returns clean blocks as the same objects", () => {
    const blocks = [
      tableBlock({
        headerRows: 1,
        headerCols: 0,
        columnWidths: [100, undefined, null],
        rows: [{ cells: [cell("a", { colspan: 2 }), cell("b", { rowspan: 2 })] }, { cells: ["c", "d"] }],
      }),
      { id: "p", type: "paragraph", props: {}, content: [], children: [] },
    ];
    expect(sanitizeTableBlocks(blocks)).toBe(blocks);
    expect(sanitizeTableBlocks(null)).toBe(null);
  });
});

// A BlockNote table as ProseMirror JSON, built without the block conversion.
function pmTable(rows: Array<Array<Record<string, unknown>>>) {
  return {
    type: "blockContainer",
    attrs: { id: "hostile" },
    content: [
      {
        type: "table",
        content: rows.map((cells) => ({
          type: "tableRow",
          content: cells.map((attrs, i) => ({
            type: "tableCell",
            attrs,
            content: [{ type: "tableParagraph", content: [{ type: "text", text: `c${i}` }] }],
          })),
        })),
      },
    ],
  };
}

function guardedState(withGuard: boolean) {
  const editor = BlockNoteEditor.create({ extensions: withGuard ? [tableGuardExtension()] : [] });
  const tiptap = (editor as any)._tiptapEditor;
  const plugins = tiptap.extensionManager.plugins;
  return { state: EditorState.create({ doc: tiptap.state.doc, plugins }), plugins };
}

function applyTable(rows: Array<Array<Record<string, unknown>>>) {
  const { state } = guardedState(true);
  const block = state.schema.nodeFromJSON(pmTable(rows));
  const group = state.doc.firstChild!;
  const tr = state.tr.replaceWith(1, 1 + group.content.size, block);
  const started = performance.now();
  const next = state.apply(tr);
  const ms = performance.now() - started;
  let table: PMNode | null = null;
  next.doc.descendants((node) => {
    if (node.type.name === "table") table = node;
    return !table;
  });
  return { ms, table: table! };
}

const rowWidth = (row: PMNode) => {
  let w = 0;
  row.forEach((c) => (w += c.attrs.colspan));
  return w;
};

describe("table guard in the rich-text editor", () => {
  it("runs before the table plugin", () => {
    const keys = guardedState(true).plugins.map((p: { key: string }) => p.key);
    const guard = keys.indexOf("tableSpanGuard$");
    expect(guard).toBeGreaterThanOrEqual(0);
    expect(guard).toBeLessThan(keys.indexOf("selectingCells$"));
    expect(guard).toBeLessThan(keys.indexOf("tableColumnResizing$"));
  });

  it("keeps its correction out of undo history", () => {
    const { state } = guardedState(true);
    const block = state.schema.nodeFromJSON(pmTable([[{ colspan: 1e9 }]]));
    const tr = state.tr.replaceWith(1, 1 + state.doc.firstChild!.content.size, block);
    const guard = state.applyTransaction(tr).transactions.find((t) => t.getMeta(TABLE_SPAN_GUARD_META));
    expect(guard?.getMeta("addToHistory")).toBe(false);
  });

  it("bounds a planted colspan before the table plugin sees it", () => {
    const { ms, table } = applyTable([[{ colspan: 1e9, colwidth: ["1px;background:red"] }], [{ rowspan: 1e9 }]]);
    expect(ms).toBeLessThan(1000);
    expect(table.firstChild!.firstChild!.attrs.colspan).toBe(MAX_TABLE_COLUMNS);
    expect(table.firstChild!.firstChild!.attrs.colwidth).toEqual([0]);
    expect(TableMap.get(table).width).toBeLessThanOrEqual(MAX_TABLE_COLUMNS);
  });

  it("bounds a wide spanned row and keeps every cell and its text", () => {
    const row = Array.from({ length: 500 }, () => ({ colspan: 1000 }));
    const { ms, table } = applyTable([row, [{ colspan: 1 }]]);
    // Includes the table plugin padding the second row to 500 cells.
    expect(ms).toBeLessThan(2000);
    expect(table.firstChild!.childCount).toBe(500);
    expect(rowWidth(table.firstChild!)).toBe(MAX_TABLE_COLUMNS);
    expect(TableMap.get(table).width).toBeLessThanOrEqual(MAX_TABLE_COLUMNS);
    expect(table.firstChild!.child(499).textContent).toBe("c499");
  });

  it("bounds a staircase of rowspans as a whole table", () => {
    const stairs = Array.from({ length: 12 }, (_, r) => [{ colspan: 256, rowspan: 12 - r }]);
    const { ms, table } = applyTable(stairs);
    expect(ms).toBeLessThan(1000);
    expect(TableMap.get(table).width).toBeLessThanOrEqual(MAX_TABLE_COLUMNS);
    expect(table.childCount).toBe(12);
  });

  it("lays out a cell that would run into a covered column without collisions", () => {
    const { ms, table } = applyTable([[{ colspan: 3 }, { colspan: 300, rowspan: 2 }], [{ colspan: 2 }, { colspan: 210 }]]);
    const map = TableMap.get(table);
    expect(ms).toBeLessThan(1000);
    expect([map.width, map.problems ?? []]).toEqual([303, []]);
  });

  it.each([40, 200])("pads a %i-row table under a wide header with at most 4096 cells", (height) => {
    const { ms, table } = applyTable([[{ colspan: 512 }], ...Array.from({ length: height - 1 }, () => [{}])]);
    const map = TableMap.get(table);
    expect(ms).toBeLessThan(1000);
    expect(map.width * map.height - (map.width + height - 1)).toBeLessThanOrEqual(4096);
  });

  it("leaves a 300-column table with a colspan-2 header as it is", () => {
    const { state } = guardedState(true);
    const header = [{ colspan: 2 }, ...Array.from({ length: 298 }, () => ({}))];
    const body = Array.from({ length: 300 }, () => ({}));
    const block = state.schema.nodeFromJSON(pmTable([header, body]));
    const tr = state.tr.replaceWith(1, 1 + state.doc.firstChild!.content.size, block);
    const { transactions } = state.applyTransaction(tr);
    expect(transactions.some((t) => t.getMeta(TABLE_SPAN_GUARD_META))).toBe(false);
  });

  it("bounds a moderate span (bite case)", () => {
    const { table } = applyTable([[{ colspan: 5000 }], [{ colspan: 1 }]]);
    expect(TableMap.get(table).width).toBeLessThanOrEqual(MAX_TABLE_COLUMNS);
  });

  it("leaves a clean table alone", () => {
    const { state } = guardedState(true);
    const block = state.schema.nodeFromJSON(
      pmTable([[{ colspan: 2, colwidth: [100, null] }, { rowspan: 2 }], [{}, {}]]),
    );
    const tr = state.tr.replaceWith(1, 1 + state.doc.firstChild!.content.size, block);
    const { transactions } = state.applyTransaction(tr);
    expect(transactions.some((t) => t.getMeta(TABLE_SPAN_GUARD_META))).toBe(false);
  });

  it("bounds pasted tables before the table plugin's paste handler pads them", () => {
    const { state, plugins } = guardedState(true);
    const table = state.schema.nodeFromJSON(pmTable([[{ colspan: 1e9, rowspan: 1e9 }, { colspan: 3 }], [{}]])).firstChild!;
    const slice = new Slice(Fragment.from(table), 0, 0);
    const guard = plugins.find((p: { key: string }) => p.key === "tableSpanGuard$");
    const pasted = guard.props.transformPasted(slice) as Slice;
    expect(pasted).not.toBe(slice);
    const started = performance.now();
    const cells = __pastedCells(pasted)!;
    expect(performance.now() - started).toBeLessThan(1000);
    expect(cells.width).toBeLessThanOrEqual(MAX_TABLE_COLUMNS);
    expect(cells.height).toBe(2);
    // Loose cells at the top of a slice are bounded as one row.
    const loose = new Slice(Fragment.from([table.firstChild!.firstChild!, table.firstChild!.child(1)]), 0, 0);
    const looseCells = __pastedCells(boundSlice(loose))!;
    expect(looseCells.width).toBe(MAX_TABLE_COLUMNS);
    expect(looseCells.height).toBe(1);
  });

  it("bounds a moderate pasted span (bite case)", () => {
    const { state } = guardedState(true);
    const table = state.schema.nodeFromJSON(pmTable([[{ colspan: 5000 }], [{}]])).firstChild!;
    expect(__pastedCells(boundSlice(new Slice(Fragment.from(table), 0, 0)))!.width).toBeLessThanOrEqual(MAX_TABLE_COLUMNS);
  });

  it("returns a clean pasted slice as it is", () => {
    const { state } = guardedState(true);
    const table = state.schema.nodeFromJSON(pmTable([[{ colspan: 2 }, { rowspan: 2 }], [{}, {}]])).firstChild!;
    const slice = new Slice(Fragment.from(table), 0, 0);
    expect(boundSlice(slice)).toBe(slice);
  });
});
