import type { TableNode } from "../engine/types";
import { tableCellText } from "../engine/table-cells";
import type { NodeTypeDefinition, NodeRendererProps } from "./registry";
import TableBlock from "../components/blocks/TableBlock";

export type TableNodeData = TableNode["data"];

function TableNodeRenderer(props: NodeRendererProps<TableNodeData>) {
  const node = props.node as TableNode;
  return (
    <TableBlock
      node={node}
      isSelected={props.isSelected}
      engine={props.engine}
      interactive={props.interactive}
      zoom={props.zoom}
      editing={props.editing}
      onMeasuredHeight={props.callbacks.onMeasuredHeight}
      onEditStart={(id) => props.callbacks.onEditStart?.(id)}
      onEditEnd={() => props.callbacks.onEditEnd?.()}
    />
  );
}

export const tableNodeType: NodeTypeDefinition<TableNodeData> = {
  type: "table",
  component: TableNodeRenderer,
  handlesOwnLayout: true,
  selectionRadius: 8,
  getClipboardText: (node) => {
    const rows = (node.data as TableNodeData).rows;
    if (!rows?.length) return null;
    const tsv = rows.map((r) => r.map(tableCellText).join("\t")).join("\n");
    return tsv.trim() ? tsv : null;
  },
};
