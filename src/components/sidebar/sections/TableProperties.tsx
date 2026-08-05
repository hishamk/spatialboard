import { useContext } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { TableNode, TableCell } from "../../../engine/types";
import { tableCellStyle, withTableCellStyle } from "../../../engine/table-cells";
import { MultiNodeContext, useBatchUpdate } from "../MultiNodeContext";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import OpacitySlider from "../controls/OpacitySlider";
import FontPicker from "../../panels/FontPicker";
import { useSBTheme } from "../ThemeContext";
import {
  rowStyle,
  labelStyle,
  btnBase,
  STROKE_PALETTES,
  ROUGHNESS_LEVELS,
  FONT_SIZES,
  TEXT_ALIGNS,
} from "../styles";
import { useSBI18n } from "../../contexts/LocalizationContext";
import { DEFAULT_FONT } from "../../../fonts";
import { tableColCount, TABLE_DEFAULTS } from "../../blocks/TableBlock";

interface TablePropertiesProps {
  engine: SpatialEngine;
  node: TableNode;
  fontsInScene: string[];
}

const MAX_ROWS = 50;
const MAX_COLS = 12;

export default function TableProperties({ engine, node, fontsInScene }: TablePropertiesProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const update = useBatchUpdate<TableNode["data"]>(engine, node);
  const allNodes = useContext(MultiNodeContext);

  const { data } = node;
  const rows = data.rows?.length ? data.rows : [[""]];
  const rowCount = rows.length;
  const colCount = tableColCount(rows);

  // While a cell is in inline edit, Font/text-color target THAT cell instead
  // of the whole table (the table block publishes it via engine.tableEditCell).
  const editCell =
    engine.tableEditCell?.nodeId === node.id ? engine.tableEditCell : null;
  const editCellValue = editCell ? data.rows?.[editCell.r]?.[editCell.c] : undefined;
  const editCellStyle = tableCellStyle(editCellValue);
  const updateEditCellStyle = (patch: Parameters<typeof withTableCellStyle>[1]) => {
    if (!editCell) return;
    const cur = engine.getNode(node.id) as TableNode | undefined;
    if (!cur) return;
    const rows0 = cur.data.rows?.length ? cur.data.rows : [[""]];
    const nextRows = rows0.map((row, ri) => {
      if (ri !== editCell.r) return row;
      const next = row.slice();
      while (next.length <= editCell.c) next.push("");
      next[editCell.c] = withTableCellStyle(next[editCell.c], patch);
      return next;
    });
    engine.updateNodeWithHistory(node.id, {
      data: { ...cur.data, rows: nextRows },
    } as Partial<TableNode>);
  };

  /** Structural row/col ops transform EACH selected table's own rows —
   *  a shared patch (useBatchUpdate) would clobber the other tables' cells. */
  const transformRows = (fn: (rows: TableCell[][]) => TableCell[][] | null) => {
    const targets = allNodes && allNodes.length > 1 ? allNodes : [node];
    const updates = targets.flatMap((n) => {
      const cur = (n.data as TableNode["data"]).rows;
      const next = fn(cur?.length ? cur : [[""]]);
      if (!next) return [];
      return [{ id: n.id, patch: { data: { ...(n.data as TableNode["data"]), rows: next } } }];
    });
    if (updates.length) engine.batchUpdateWithHistory(updates);
  };

  const stepper = (
    label: string,
    count: number,
    onRemove: () => void,
    onAdd: () => void,
    max: number,
  ) => (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>{label}</span>
      <button
        onClick={onRemove}
        disabled={count <= 1}
        style={{
          ...btnBase,
          width: 28,
          height: 24,
          background: theme.controlBg,
          borderRadius: theme.controlBorderRadius,
          color: count <= 1 ? theme.textDisabled : theme.text,
        }}
      >
        −
      </button>
      <span style={{ minWidth: 24, textAlign: "center", fontSize: 12, color: theme.text }}>{count}</span>
      <button
        onClick={onAdd}
        disabled={count >= max}
        style={{
          ...btnBase,
          width: 28,
          height: 24,
          background: theme.controlBg,
          borderRadius: theme.controlBorderRadius,
          color: count >= max ? theme.textDisabled : theme.text,
        }}
      >
        +
      </button>
    </div>
  );

  return (
    <>
      {stepper(
        labels.inspectorTableRows,
        rowCount,
        () => transformRows((r) => (r.length > 1 ? r.slice(0, -1) : null)),
        () =>
          transformRows((r) =>
            r.length >= MAX_ROWS ? null : [...r, Array.from({ length: tableColCount(r) }, () => "")],
          ),
        MAX_ROWS,
      )}
      {stepper(
        labels.inspectorTableCols,
        colCount,
        () =>
          transformRows((r) => {
            const cols = tableColCount(r);
            if (cols <= 1) return null;
            return r.map((row) => row.slice(0, cols - 1));
          }),
        () =>
          transformRows((r) =>
            tableColCount(r) >= MAX_COLS ? null : r.map((row) => [...row, ""]),
          ),
        MAX_COLS,
      )}

      {/* Header row toggle */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorTableHeader}</span>
        <button
          onClick={() => update({ headerRow: data.headerRow === false ? undefined : false })}
          style={{
            ...btnBase,
            width: 28,
            height: 24,
            background: data.headerRow !== false ? theme.controlBgActive : theme.controlBg,
            borderRadius: theme.controlBorderRadius,
            color: data.headerRow !== false ? theme.text : theme.textFaint,
          }}
        >
          ✓
        </button>
      </div>

      {/* Sketch style — same architect/artist/cartoonist ladder as shapes */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorRoughness}</span>
        {ROUGHNESS_LEVELS.map((r) => {
          const roughnessLabel =
            r.value === 0
              ? labels.roughnessArchitect
              : r.value === 1
                ? labels.roughnessArtist
                : labels.roughnessCartoonist;
          return (
            <button
              key={r.value}
              title={roughnessLabel}
              onClick={() => update({ roughness: r.value })}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 8px",
                background:
                  (data.roughness ?? TABLE_DEFAULTS.roughness) === r.value
                    ? theme.controlBgActive
                    : theme.controlBg,
                color: theme.text,
                fontSize: 9,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {roughnessLabel}
            </button>
          );
        })}
      </div>

      {/* Cell typography — same options as the text tool. While a cell is in
          inline edit, Font + text color style that CELL (override cleared by
          re-picking the table-wide value). */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorFont}</span>
        <FontPicker
          value={editCell ? (editCellStyle.fontFamily ?? data.fontFamily ?? DEFAULT_FONT) : (data.fontFamily ?? DEFAULT_FONT)}
          onChange={(f: string) => {
            if (editCell) {
              updateEditCellStyle({
                fontFamily: f === (data.fontFamily ?? DEFAULT_FONT) ? undefined : f,
              });
            } else {
              update({ fontFamily: f });
            }
          }}
          fontsInScene={fontsInScene}
        />
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorSize}</span>
        {FONT_SIZES.map((s) => {
          const tableSize = data.fontSize ?? TABLE_DEFAULTS.fontSize;
          const effective = editCell ? (editCellStyle.fontSize ?? tableSize) : tableSize;
          return (
            <button
              key={s}
              onClick={() => {
                if (editCell) {
                  updateEditCellStyle({ fontSize: s === tableSize ? undefined : s });
                } else {
                  update({ fontSize: s });
                }
              }}
              style={{
                ...btnBase,
                width: 36,
                height: 28,
                background: effective === s ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 10,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorAlign}</span>
        {TEXT_ALIGNS.map((a) => {
          const tableAlign = data.align ?? "left";
          const effective = editCell ? (editCellStyle.align ?? tableAlign) : tableAlign;
          return (
            <button
              key={a.key}
              title={a.key}
              onClick={() => {
                if (editCell) {
                  updateEditCellStyle({ align: a.key === tableAlign ? undefined : a.key });
                } else {
                  update({ align: a.key });
                }
              }}
              style={{
                ...btnBase,
                width: 36,
                height: 28,
                background: effective === a.key ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 12,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      {/* Cell text color — mirrors the text tool's Stroke row */}
      <PaletteColorPicker
        label={labels.inspectorStroke}
        palettes={STROKE_PALETTES}
        value={
          editCell
            ? (editCellStyle.color ?? data.textColor ?? TABLE_DEFAULTS.textColor)
            : (data.textColor ?? TABLE_DEFAULTS.textColor)
        }
        onChange={(c) => {
          if (!c) return;
          if (editCell) {
            updateEditCellStyle({
              color: c === (data.textColor ?? TABLE_DEFAULTS.textColor) ? undefined : c,
            });
          } else {
            update({ textColor: c });
          }
        }}
      />

      {/* Grid ink color */}
      <PaletteColorPicker
        label={labels.inspectorTableGrid}
        palettes={STROKE_PALETTES}
        value={data.stroke ?? TABLE_DEFAULTS.stroke}
        onChange={(c) => { if (c) update({ stroke: c }); }}
      />

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />
    </>
  );
}
