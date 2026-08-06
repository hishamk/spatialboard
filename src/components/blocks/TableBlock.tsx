import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { TableNode, TableCell } from "../../engine/types";
import { tableCellText, tableCellStyle, withTableCellText } from "../../engine/table-cells";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import { getFontFamilyCSS, DEFAULT_FONT } from "../../fonts";
import { SB_UI_FONT } from "../sidebar/ThemeContext";
import { observeResize } from "../../utils/shared-resize-observer";
import { getRoughRectPaths, getRoughLinePaths } from "../../rendering/rough-shapes";
import type { RoughPathData } from "../../rendering/rough-shapes";

interface TableBlockProps {
  node: TableNode;
  isSelected: boolean;
  engine: SpatialEngine;
  interactive: boolean;
  zoom: number;
  editing: boolean;
  onMeasuredHeight?: (id: string, h: number) => void;
  onEditStart: (id: string) => void;
  onEditEnd: () => void;
}

/** Standard cell size (canvas units) used by the drag-to-layout gesture. */
export const TABLE_CELL_W = 110;
export const TABLE_CELL_H = 40;

export const TABLE_DEFAULTS = {
  stroke: "#1e1e2e",
  strokeWidth: 1.5,
  roughness: 1,
  fontSize: 14,
  textColor: "#1e1e2e",
} as const;

/** Column count = widest row (ragged rows render trailing empty cells). */
export function tableColCount(rows: TableCell[][]): number {
  let cols = 1;
  for (const r of rows) if (r.length > cols) cols = r.length;
  return cols;
}

/** Normalized column weights → cumulative x boundaries [0 … w]. */
export function tableColXs(w: number, cols: number, colWidths?: number[]): number[] {
  const weights = Array.from({ length: cols }, (_, i) => {
    const v = colWidths?.[i];
    return typeof v === "number" && Number.isFinite(v) && v > 0 ? v : 1;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  const xs = [0];
  let acc = 0;
  for (const wt of weights) {
    acc += (wt / total) * w;
    xs.push(acc);
  }
  xs[xs.length - 1] = w;
  return xs;
}

function TableBlock({
  node,
  isSelected,
  engine,
  interactive,
  zoom,
  editing,
  onMeasuredHeight,
  onEditStart,
  onEditEnd,
}: TableBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRef = useRef<HTMLDivElement>(null);
  const [editCell, setEditCell] = useState<{ r: number; c: number } | null>(null);
  const [hovered, setHovered] = useState(false);
  // Edge-hover targets: hovering the table's TOP edge band picks a column,
  // the LEFT edge band picks a row — only that one's −/+ chips render.
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  // Row boundary Ys (cumulative, [0 … totalH]) measured from the DOM grid.
  const [rowYs, setRowYs] = useState<number[]>([]);
  const latestTextRef = useRef("");
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const historyBaselinePushedRef = useRef(false);
  const nodeRef = useRef(node);
  nodeRef.current = node;
  const engineRef = useRef(engine);
  engineRef.current = engine;
  const editCellRef = useRef(editCell);
  editCellRef.current = editCell;
  // Where the caret lands when editing moves to another cell ("end" default;
  // arrow-right/down arrivals feel natural at "start").
  const caretPlacementRef = useRef<"start" | "end">("end");

  const data = node.data;
  const rows = data.rows?.length ? data.rows : [[""]];
  const cols = tableColCount(rows);
  const headerRow = data.headerRow !== false;
  const fontSize = data.fontSize ?? TABLE_DEFAULTS.fontSize;
  const fontFamily = data.fontFamily ?? DEFAULT_FONT;
  const align = data.align ?? "left";
  const textColor = data.textColor ?? TABLE_DEFAULTS.textColor;
  const stroke = data.stroke ?? TABLE_DEFAULTS.stroke;
  const strokeWidth = data.strokeWidth ?? TABLE_DEFAULTS.strokeWidth;
  const roughness = data.roughness ?? TABLE_DEFAULTS.roughness;

  const colXs = useMemo(() => tableColXs(node.w, cols, data.colWidths), [node.w, cols, data.colWidths]);

  const cellText = (r: number, c: number) => tableCellText(rows[r]?.[c]);

  /** Write the in-progress cell text back to the engine (no history). */
  const syncCell = useCallback(() => {
    const cell = editCellRef.current;
    if (!cell) return;
    const n = nodeRef.current;
    const text = latestTextRef.current;
    if (tableCellText(n.data.rows[cell.r]?.[cell.c]) === text) return;
    const nextRows = (n.data.rows?.length ? n.data.rows : [[""]]).map((row, ri) => {
      if (ri !== cell.r) return row;
      const next = row.slice();
      while (next.length <= cell.c) next.push("");
      next[cell.c] = withTableCellText(next[cell.c], text);
      return next;
    });
    engineRef.current.updateNode(n.id, {
      data: { ...n.data, rows: nextRows },
    } as Partial<TableNode>);
  }, []);

  /** Commit the editing cell's text (history-aware, sticky-note pattern). */
  const commitCell = useCallback(() => {
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
      syncTimerRef.current = null;
    }
    if (cellRef.current) latestTextRef.current = cellRef.current.innerText;
    const cell = editCellRef.current;
    if (!cell) return;
    const n = nodeRef.current;
    const text = latestTextRef.current;
    if (tableCellText(n.data.rows[cell.r]?.[cell.c]) === text) return;
    const nextRows = (n.data.rows?.length ? n.data.rows : [[""]]).map((row, ri) => {
      if (ri !== cell.r) return row;
      const next = row.slice();
      while (next.length <= cell.c) next.push("");
      next[cell.c] = withTableCellText(next[cell.c], text);
      return next;
    });
    const patch = { data: { ...n.data, rows: nextRows } } as Partial<TableNode>;
    if (historyBaselinePushedRef.current) {
      historyBaselinePushedRef.current = false;
      engineRef.current.updateNode(n.id, patch);
    } else {
      engineRef.current.updateNodeWithHistory(n.id, patch);
    }
  }, []);

  // Leaving edit mode commits the open cell even if the contentEditable
  // unmounts before blur fires.
  useEffect(() => {
    if (!editing) {
      setEditCell(null);
      return;
    }
    return () => commitCell();
  }, [editing, commitCell]);

  // Click-away ends the edit session: a pointerdown on the CANVAS outside the
  // table commits the open cell and exits (capture phase, so it wins over
  // canvas handlers). Clicks outside the canvas — inspector, console deck,
  // panels — keep the session alive so per-cell styling can target the cell.
  useEffect(() => {
    if (!editing) return;
    const host = blockRef.current;
    const canvasEl = host?.closest("[data-sb-canvas]");
    const doc = host?.ownerDocument ?? document;
    const onDocPointerDown = (e: PointerEvent) => {
      if (!(e.target instanceof Node)) return;
      if (host && host.contains(e.target)) return;
      if (canvasEl && !canvasEl.contains(e.target)) return;
      commitCell();
      onEditEnd();
    };
    doc.addEventListener("pointerdown", onDocPointerDown, true);
    return () => doc.removeEventListener("pointerdown", onDocPointerDown, true);
  }, [editing, commitCell, onEditEnd]);

  // Publish the active edit cell so the inspector can target Font/color at it.
  useEffect(() => {
    const eng = engineRef.current;
    if (editing && editCell) {
      eng.setTableEditCell({ nodeId: node.id, r: editCell.r, c: editCell.c });
    }
    return () => {
      if (eng.tableEditCell?.nodeId === node.id) eng.setTableEditCell(null);
    };
  }, [editing, editCell, node.id]);

  // Focus + seed the contentEditable when the edit cell changes.
  useEffect(() => {
    if (!editing || !editCell || !cellRef.current) return;
    const el = cellRef.current;
    el.innerText = cellText(editCell.r, editCell.c);
    latestTextRef.current = el.innerText;
    historyBaselinePushedRef.current = false;
    el.focus();
    const sel = el.ownerDocument.defaultView?.getSelection();
    if (sel) {
      const range = el.ownerDocument.createRange();
      range.selectNodeContents(el);
      range.collapse(caretPlacementRef.current === "start");
      sel.removeAllRanges();
      sel.addRange(range);
    }
    caretPlacementRef.current = "end";
    // Seed only when the target cell changes, not on every rows update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, editCell?.r, editCell?.c]);

  /** Measure row boundaries from the DOM grid so the rough lines track
   *  content-driven row heights exactly. */
  const measureRows = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const children = grid.children;
    const colsNow = tableColCount(nodeRef.current.data.rows?.length ? nodeRef.current.data.rows : [[""]]);
    const ys: number[] = [0];
    for (let i = colsNow; i < children.length; i += colsNow) {
      ys.push((children[i] as HTMLElement).offsetTop);
    }
    ys.push(grid.offsetHeight);
    // Share the layout with the engine so anchored edges can track cells
    // through resizes (rows don't scale uniformly when text re-wraps).
    engineRef.current.setTableRowYs(nodeRef.current.id, ys);
    setRowYs((prev) =>
      prev.length === ys.length && prev.every((v, i) => Math.abs(v - ys[i]) < 0.5) ? prev : ys,
    );
  }, []);

  useLayoutEffect(() => {
    measureRows();
  });

  // Report the rendered height so auto-height chrome/hit-testing stays true.
  useEffect(() => {
    if (!blockRef.current || !onMeasuredHeight) return;
    return observeResize(blockRef.current, () => {
      const h = blockRef.current?.offsetHeight ?? 0;
      if (h > 0) onMeasuredHeight(node.id, h);
      measureRows();
    });
  }, [node.id, onMeasuredHeight, measureRows]);

  const totalH = rowYs.length > 1 ? rowYs[rowYs.length - 1] : rows.length * TABLE_CELL_H;

  // Hand-drawn grid: outer rough rect + rough lines at row/col boundaries.
  // Seeded per node + line so the wiggle is stable across renders and
  // identical in SVG export.
  const roughPaths = useMemo<RoughPathData[]>(() => {
    const opts = { stroke, strokeWidth, roughness };
    const paths: RoughPathData[] = [
      ...getRoughRectPaths(0, 0, node.w, totalH, { ...opts, seed: `${node.id}:outer` }),
    ];
    for (let c = 1; c < cols; c++) {
      paths.push(
        ...getRoughLinePaths(colXs[c], 0, colXs[c], totalH, { ...opts, seed: `${node.id}:c${c}` }),
      );
    }
    for (let r = 1; r < rowYs.length - 1; r++) {
      paths.push(
        ...getRoughLinePaths(0, rowYs[r], node.w, rowYs[r], { ...opts, seed: `${node.id}:r${r}` }),
      );
    }
    return paths;
  }, [node.id, node.w, totalH, cols, colXs, rowYs, stroke, strokeWidth, roughness]);

  /** Structural update with history. */
  const updateRows = useCallback((fn: (rows: TableCell[][]) => TableCell[][]) => {
    const n = nodeRef.current;
    const cur = n.data.rows?.length ? n.data.rows : [[""]];
    engineRef.current.updateNodeWithHistory(n.id, {
      data: { ...n.data, rows: fn(cur) },
    } as Partial<TableNode>);
  }, []);

  const addColumn = () =>
    updateRows((r) => r.map((row) => {
      const next = row.slice();
      while (next.length < tableColCount(r)) next.push("");
      next.push("");
      return next;
    }));
  const addRow = () =>
    updateRows((r) => [...r, Array.from({ length: tableColCount(r) }, () => "")]);
  const removeColumn = (c: number) =>
    updateRows((r) => (tableColCount(r) <= 1 ? r : r.map((row) => row.filter((_, i) => i !== c))));
  const removeRow = (ri: number) =>
    updateRows((r) => (r.length <= 1 ? r : r.filter((_, i) => i !== ri)));
  const insertColumnAfter = (c: number) =>
    updateRows((r) => r.map((row) => {
      const next = row.slice();
      while (next.length < tableColCount(r)) next.push("");
      next.splice(c + 1, 0, "");
      return next;
    }));
  const insertRowAfter = (ri: number) =>
    updateRows((r) => {
      const next = r.slice();
      next.splice(ri + 1, 0, Array.from({ length: tableColCount(r) }, () => ""));
      return next;
    });

  /** Drag an internal column boundary to rebalance the two adjacent columns. */
  const handleColResizeDown = (e: React.PointerEvent, boundary: number) => {
    e.stopPropagation();
    e.preventDefault();
    const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
    const n = nodeRef.current;
    const colsNow = tableColCount(n.data.rows?.length ? n.data.rows : [[""]]);
    const startXs = tableColXs(n.w, colsNow, n.data.colWidths);
    const startClientX = e.clientX;
    const minW = 24;
    let snapshotPushed = false;
    const onMove = (me: PointerEvent) => {
      const dx = (me.clientX - startClientX) / engineRef.current.viewport.zoom;
      if (!snapshotPushed) {
        if (Math.abs(dx) < 1) return;
        snapshotPushed = true;
        engineRef.current.pushHistorySnapshot();
      }
      const target = Math.min(
        startXs[boundary + 1] - minW,
        Math.max(startXs[boundary - 1] + minW, startXs[boundary] + dx),
      );
      const widths = [];
      for (let i = 0; i < colsNow; i++) {
        const left = i === boundary - 1 ? startXs[i] : i === boundary ? target : startXs[i];
        const right = i === boundary - 1 ? target : startXs[i + 1];
        widths.push(Math.max(minW, right - left));
      }
      const cur = nodeRef.current;
      engineRef.current.updateNode(cur.id, {
        data: { ...cur.data, colWidths: widths },
      } as Partial<TableNode>);
    };
    const onUp = () => {
      ownerDoc.removeEventListener("pointermove", onMove);
      ownerDoc.removeEventListener("pointerup", onUp);
    };
    ownerDoc.addEventListener("pointermove", onMove);
    ownerDoc.addEventListener("pointerup", onUp);
  };

  /** Commit, then move editing to another cell — appending a row when Tab
   *  walks off the last cell (quick data entry). */
  const moveEdit = useCallback(
    (r: number, c: number) => {
      commitCell();
      const n = nodeRef.current;
      const curRows = n.data.rows?.length ? n.data.rows : [[""]];
      const curCols = tableColCount(curRows);
      if (r >= curRows.length) {
        const empty = Array.from({ length: curCols }, () => "");
        engineRef.current.updateNodeWithHistory(n.id, {
          data: { ...n.data, rows: [...curRows, empty] },
        } as Partial<TableNode>);
      }
      setEditCell({ r, c });
    },
    [commitCell],
  );

  /** Caret position within the editing cell — cell-hop arrows only fire at
   *  the matching text boundary so multi-line cells keep native caret moves. */
  const caretBoundaries = () => {
    const el = cellRef.current;
    const sel = el?.ownerDocument.defaultView?.getSelection();
    if (!el || !sel || sel.rangeCount === 0 || !sel.isCollapsed) {
      return { atStart: false, atEnd: false, firstLine: false, lastLine: false };
    }
    if (!el.innerText.trim()) return { atStart: true, atEnd: true, firstLine: true, lastLine: true };
    const range = sel.getRangeAt(0);
    const pre = range.cloneRange();
    pre.selectNodeContents(el);
    pre.setEnd(range.startContainer, range.startOffset);
    const post = range.cloneRange();
    post.selectNodeContents(el);
    post.setStart(range.endContainer, range.endOffset);
    // Vertical: compare the caret's rect to the editable's rect — height of
    // the caret rect ≈ one line, so this self-normalizes across zoom levels.
    const caretRect = range.getClientRects()[0] ?? range.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const lineTol = (caretRect.height || 16) * 0.6;
    return {
      atStart: pre.toString().length === 0,
      atEnd: post.toString().length === 0,
      firstLine: caretRect.height === 0 || caretRect.top - elRect.top < lineTol,
      lastLine: caretRect.height === 0 || elRect.bottom - caretRect.bottom < lineTol,
    };
  };

  const handleCellKeyDown = (e: React.KeyboardEvent) => {
    if (!editCell) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      commitCell();
      onEditEnd();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();
      const forward = !e.shiftKey;
      let { r, c } = editCell;
      if (forward) {
        c += 1;
        if (c >= cols) { c = 0; r += 1; }
        moveEdit(r, c); // r may be rows.length → appends a row
      } else {
        c -= 1;
        if (c < 0) { c = cols - 1; r -= 1; }
        if (r >= 0) moveEdit(r, c);
      }
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      const r = editCell.r + 1;
      if (r < rows.length) {
        moveEdit(r, editCell.c);
      } else {
        commitCell();
        onEditEnd();
      }
      return;
    }
    // Arrow keys hop cells at text boundaries; elsewhere they move the caret.
    if (e.key.startsWith("Arrow") && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
      const b = caretBoundaries();
      const { r, c } = editCell;
      let target: { r: number; c: number; caret: "start" | "end" } | null = null;
      if (e.key === "ArrowUp" && b.firstLine && r > 0) {
        target = { r: r - 1, c, caret: "end" };
      } else if (e.key === "ArrowDown" && b.lastLine && r < rows.length - 1) {
        target = { r: r + 1, c, caret: "start" };
      } else if (e.key === "ArrowLeft" && b.atStart && (c > 0 || r > 0)) {
        target = c > 0 ? { r, c: c - 1, caret: "end" } : { r: r - 1, c: cols - 1, caret: "end" };
      } else if (e.key === "ArrowRight" && b.atEnd && (c < cols - 1 || r < rows.length - 1)) {
        target = c < cols - 1 ? { r, c: c + 1, caret: "start" } : { r: r + 1, c: 0, caret: "start" };
      }
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        caretPlacementRef.current = target.caret;
        moveEdit(target.r, target.c);
        return;
      }
      e.stopPropagation();
      return;
    }
    e.stopPropagation();
  };

  // Whole-node select + drag — same pattern as StickyNoteBlock.
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      if (e.altKey) return;
      if (engine.mode !== "select") return;

      if (!engine.selection.has(node.id) && engine.selection.size > 0) {
        const { x: cx, y: cy } = engine.screenToCanvas(e.clientX, e.clientY);
        for (const selId of engine.selection) {
          const selNode = engine.getNode(selId);
          if (!selNode) continue;
          const sh = selNode.h === "auto" ? 100 : (selNode.h as number);
          if (cx >= selNode.x && cx <= selNode.x + selNode.w && cy >= selNode.y && cy <= selNode.y + sh) {
            return; // Let canvas handle deep-select
          }
        }
      }

      e.stopPropagation();
      if (editing) {
        // Single click on another cell while editing moves the session there
        // (the contentEditable's own pointerdown never bubbles this far).
        const { x: lx, y: ly } = toLocal(e.clientX, e.clientY);
        const r = rowAt(ly);
        const c = colAt(lx);
        const cur = editCellRef.current;
        if (cur && (cur.r !== r || cur.c !== c)) {
          e.preventDefault(); // keep native focus off <body> until the new cell mounts
          caretPlacementRef.current = "end";
          moveEdit(r, c);
        }
        return;
      }

      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

      if (e.shiftKey) {
        engine.toggleSelect(node.id);
      } else if (!engine.selection.has(node.id)) {
        engine.select(node.id);
      }

      const startX = e.clientX;
      const startY = e.clientY;
      const draggedIds = Array.from(engine.selection);
      const origPositions: { id: string; x: number; y: number }[] = [];
      for (const id of draggedIds) {
        const n = engine.getNode(id);
        if (n) origPositions.push({ id, x: n.x, y: n.y });
      }
      if (origPositions.length === 0) return;
      let didMove = false;
      let rafId: number | null = null;
      let lastClientX = startX;
      let lastClientY = startY;
      let lastModKey = false;

      const applyMove = () => {
        rafId = null;
        const dx = (lastClientX - startX) / engine.viewport.zoom;
        const dy = (lastClientY - startY) / engine.viewport.zoom;
        const { finalDx, finalDy } = engine.computeDragSnap(
          origPositions, draggedIds, dx, dy, lastModKey,
        );
        const updates = origPositions.map((orig) => ({
          id: orig.id,
          patch: { x: orig.x + finalDx, y: orig.y + finalDy },
        }));
        engine.updateMany(updates);
      };

      const onMove = (me: PointerEvent) => {
        const dx = (me.clientX - startX) / engine.viewport.zoom;
        const dy = (me.clientY - startY) / engine.viewport.zoom;
        if (!didMove) {
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            didMove = true;
            engine.pushHistorySnapshot();
            engine.beginNodeGesture(draggedIds);
          } else {
            return;
          }
        }
        lastClientX = me.clientX;
        lastClientY = me.clientY;
        lastModKey = me.metaKey || me.ctrlKey;
        if (rafId === null) rafId = requestAnimationFrame(applyMove);
      };
      const onUp = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          applyMove();
        }
        engine.clearAlignGuides();
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
        engine.endNodeGesture();
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [engine, node.id, editing],
  );

  /** Screen point → table-local canvas coordinates (accounts for zoom via the
   *  host's rendered rect). */
  const toLocal = (clientX: number, clientY: number) => {
    const host = blockRef.current;
    if (!host) return { x: 0, y: 0 };
    const rect = host.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / Math.max(rect.width, 1)) * node.w,
      y: ((clientY - rect.top) / Math.max(rect.height, 1)) * Math.max(totalH, 1),
    };
  };

  const colAt = (x: number) => {
    let c = 0;
    while (c < cols - 1 && x > colXs[c + 1]) c++;
    return c;
  };
  const rowAt = (y: number) => {
    let r = 0;
    while (r < rows.length - 1 && rowYs.length > r + 1 && y > rowYs[r + 1]) r++;
    return r;
  };

  /** Edge-band hover tracking: the top band (just outside → just inside the
   *  top edge) targets a column, the left band targets a row. The chips
   *  themselves sit inside these bands, so hovering a chip keeps it alive. */
  const EDGE_OUT = 30;
  const EDGE_IN = 14;
  const handleHostPointerMove = (e: React.PointerEvent) => {
    if (editing) return;
    if (e.buttons) return; // no hover targets mid-drag/resize
    const { x, y } = toLocal(e.clientX, e.clientY);
    if (y >= -EDGE_OUT && y <= EDGE_IN && x >= 0 && x <= node.w) {
      setHoverCol(colAt(x));
      setHoverRow(null);
    } else if (x >= -EDGE_OUT && x <= EDGE_IN && y >= 0 && y <= totalH) {
      setHoverRow(rowAt(y));
      setHoverCol(null);
    } else {
      setHoverCol(null);
      setHoverRow(null);
    }
  };

  /** Host-level dblclick → resolve the cell from coordinates. Pointer capture
   *  (whole-node drag) retargets the second click to the host, so per-cell
   *  dblclick handlers never fire from a real mouse. */
  const handleHostDoubleClick = (e: React.MouseEvent) => {
    const { x, y } = toLocal(e.clientX, e.clientY);
    handleCellDoubleClick(e, rowAt(y), colAt(x));
  };

  const handleCellDoubleClick = (e: React.MouseEvent, r: number, c: number) => {
    if (!interactive) return;
    e.stopPropagation();
    // Grouped: drill down one level at a time (same as other blocks).
    if (node.groupId) {
      const chain: string[] = [];
      let gid: string | undefined = node.groupId;
      while (gid) { chain.push(gid); gid = engine.groupParent.get(gid); }
      if (!engine.activeGroupId) {
        engine.enterGroup(chain[chain.length - 1]);
        engine.select(node.id);
        return;
      }
      const activeIdx = chain.indexOf(engine.activeGroupId);
      if (activeIdx > 0) {
        engine.enterGroup(chain[activeIdx - 1]);
        engine.select(node.id);
        return;
      }
    }
    if (editing && editCell && (editCell.r !== r || editCell.c !== c)) {
      moveEdit(r, c);
      return;
    }
    if (!editing) {
      engine.select(node.id);
      onEditStart(node.id);
      setEditCell({ r, c });
    }
  };

  const h = node.h === "auto" ? undefined : (node.h as number);
  // Rows breathe with the TYPE: at large font sizes the floor grows past the
  // standard cell height so empty rows scale with a vertical (font) resize
  // instead of clamping flat at 40.
  const minCellH = Math.max(TABLE_CELL_H, Math.round(fontSize * 1.45) + 16);
  // Hover tools: shown while the table is selected OR hovered, hidden while
  // editing or in readOnly (interactive covers readOnly + tool modes).
  const showTools = interactive && (isSelected || hovered) && !editing && engine.mode === "select";
  // Standard UI chrome — deliberately NOT the table's rough ink/font (the
  // host's Excalifont + stroke would leak in via inheritance otherwise).
  const toolBtn: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    borderRadius: 9,
    border: "1px solid #D1D5DB",
    background: "#fff",
    color: "#374151",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    cursor: "pointer",
    padding: 0,
    fontFamily: SB_UI_FONT,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  };

  return (
    <div
      ref={blockRef}
      data-node-id={node.id}
      className={interactive ? undefined : "sb-block-inert"}
      onPointerDown={interactive ? handlePointerDown : undefined}
      onDoubleClick={interactive ? handleHostDoubleClick : undefined}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={interactive ? handleHostPointerMove : undefined}
      onPointerLeave={() => { setHovered(false); setHoverCol(null); setHoverRow(null); }}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: node.w,
        height: h,
        zIndex: node.z,
        opacity: data.opacity ?? 1,
        pointerEvents: interactive ? "auto" : "none",
        transform: node.rotation ? `rotate(${node.rotation}deg)` : undefined,
        transformOrigin: "center center",
        cursor: editing ? undefined : "move",
        fontFamily: getFontFamilyCSS(fontFamily),
        fontSize,
        lineHeight: 1.45,
        color: textColor,
      }}
    >
      {/* Hand-drawn grid underlay */}
      <svg
        width={node.w}
        height={Math.max(totalH, 1)}
        viewBox={`0 0 ${node.w} ${Math.max(totalH, 1)}`}
        style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}
      >
        {roughPaths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            stroke={p.stroke}
            strokeWidth={p.strokeWidth}
            fill={p.fill && p.fill !== "none" ? p.fill : "none"}
            strokeDasharray={p.strokeDasharray}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Cell text grid (transparent — the rough underlay draws the chrome) */}
      <div
        ref={gridRef}
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: colXs
            .slice(1)
            .map((x, i) => `${((x - colXs[i]) / node.w) * 100}%`)
            .join(" "),
          height: h ? "100%" : undefined,
          alignContent: "start",
          userSelect: editing ? "text" : "none",
        }}
      >
        {rows.map((_, r) => {
          const isHeader = headerRow && r === 0;
          return Array.from({ length: cols }, (_unused, c) => {
            const isEditingCell = editing && editCell?.r === r && editCell?.c === c;
            const cs = tableCellStyle(rows[r]?.[c]);
            return (
              <div
                key={`${r}:${c}`}
                style={{
                  fontWeight: isHeader ? 700 : undefined,
                  fontFamily: cs.fontFamily ? getFontFamilyCSS(cs.fontFamily) : undefined,
                  color: cs.color,
                  fontSize: cs.fontSize,
                  padding: "8px 10px",
                  minHeight: minCellH,
                  minWidth: 0,
                  textAlign: cs.align ?? align,
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  outline: isEditingCell ? "2px solid #3b82f6" : undefined,
                  outlineOffset: -4,
                  borderRadius: isEditingCell ? 4 : undefined,
                  cursor: editing ? "text" : undefined,
                }}
              >
                {isEditingCell ? (
                  <div
                    ref={cellRef}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={commitCell}
                    onInput={() => {
                      if (!cellRef.current) return;
                      latestTextRef.current = cellRef.current.innerText;
                      const cell = editCellRef.current;
                      const n = nodeRef.current;
                      if (
                        cell &&
                        latestTextRef.current !== tableCellText(n.data.rows[cell.r]?.[cell.c]) &&
                        !historyBaselinePushedRef.current
                      ) {
                        historyBaselinePushedRef.current = true;
                        engineRef.current.pushHistorySnapshot();
                      }
                      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
                      syncTimerRef.current = setTimeout(syncCell, 0);
                    }}
                    onKeyDown={handleCellKeyDown}
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{ outline: "none", minHeight: "1em" }}
                  />
                ) : (
                  cellText(r, c)
                )}
              </div>
            );
          });
        })}
      </div>

      {/* Hover tools. Invisible bands extend past the top/left edges so
          approaching a column or row from outside reveals ITS −/+ chips;
          the right/bottom edge "+" appends, boundary strips resize columns. */}
      {showTools && (
        <>
          {/* Hover-catch bands (outside the table bounds) */}
          <div
            style={{ position: "absolute", left: 0, right: 0, top: -EDGE_OUT, height: EDGE_OUT }}
          />
          <div
            style={{ position: "absolute", top: 0, height: totalH, left: -EDGE_OUT, width: EDGE_OUT }}
          />

          {/* Append column / row */}
          <button
            title="+"
            onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
            onClick={(e) => { e.stopPropagation(); addColumn(); }}
            style={{ ...toolBtn, right: -26, top: totalH / 2 - 9 }}
          >
            +
          </button>
          <button
            title="+"
            onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
            onClick={(e) => { e.stopPropagation(); addRow(); }}
            style={{ ...toolBtn, left: node.w / 2 - 9, top: totalH + 8 }}
          >
            +
          </button>

          {/* Hovered column: − delete, + insert after */}
          {hoverCol !== null && hoverCol < cols && (
            <>
              {cols > 1 && (
                <button
                  title="−"
                  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onClick={(e) => { e.stopPropagation(); setHoverCol(null); removeColumn(hoverCol); }}
                  style={{
                    ...toolBtn,
                    width: 16,
                    height: 16,
                    fontSize: 11,
                    left: (colXs[hoverCol] + colXs[hoverCol + 1]) / 2 - (cols < 12 ? 19 : 8),
                    top: -22,
                  }}
                >
                  −
                </button>
              )}
              {cols < 12 && (
                <button
                  title="+"
                  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onClick={(e) => { e.stopPropagation(); insertColumnAfter(hoverCol); }}
                  style={{
                    ...toolBtn,
                    width: 16,
                    height: 16,
                    fontSize: 11,
                    left: (colXs[hoverCol] + colXs[hoverCol + 1]) / 2 + (cols > 1 ? 3 : -8),
                    top: -22,
                  }}
                >
                  +
                </button>
              )}
            </>
          )}

          {/* Hovered row: − delete, + insert after */}
          {hoverRow !== null && hoverRow < rows.length && rowYs.length > hoverRow + 1 && (
            <>
              {rows.length > 1 && (
                <button
                  title="−"
                  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onClick={(e) => { e.stopPropagation(); setHoverRow(null); removeRow(hoverRow); }}
                  style={{
                    ...toolBtn,
                    width: 16,
                    height: 16,
                    fontSize: 11,
                    left: -22,
                    top: (rowYs[hoverRow] + rowYs[hoverRow + 1]) / 2 - (rows.length < 50 ? 19 : 8),
                  }}
                >
                  −
                </button>
              )}
              {rows.length < 50 && (
                <button
                  title="+"
                  onPointerDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onClick={(e) => { e.stopPropagation(); insertRowAfter(hoverRow); }}
                  style={{
                    ...toolBtn,
                    width: 16,
                    height: 16,
                    fontSize: 11,
                    left: -22,
                    top: (rowYs[hoverRow] + rowYs[hoverRow + 1]) / 2 + (rows.length > 1 ? 3 : -8),
                  }}
                >
                  +
                </button>
              )}
            </>
          )}

          {/* Column-resize strips on internal boundaries */}
          {Array.from({ length: cols - 1 }, (_, i) => (
            <div
              key={`rs-${i + 1}`}
              onPointerDown={(e) => handleColResizeDown(e, i + 1)}
              style={{
                position: "absolute",
                left: colXs[i + 1] - 4,
                top: 0,
                width: 8,
                height: totalH,
                cursor: "col-resize",
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default memo(TableBlock);
