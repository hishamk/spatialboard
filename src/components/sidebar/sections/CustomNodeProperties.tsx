import { useMemo, useState } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { SpatialNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import { useSBTheme } from "../ThemeContext";
import { useSBI18n } from "../../LocalizationContext";

function humanizeNodeType(type: string): string {
  return type
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

interface CustomNodePropertiesProps {
  engine: SpatialEngine;
  node: SpatialNode;
  /** When omitted, only resolved docs (if any) is shown — for types with help but no custom panel. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PanelComponent?: React.ComponentType<any>;
  /** If set, inspector looks up `localization.customNodeDocs[id ?? node.type]`. */
  docs?: { id?: string };
}

export default function CustomNodeProperties({
  engine,
  node,
  PanelComponent,
  docs,
}: CustomNodePropertiesProps) {
  const updateData = useBatchUpdate<Record<string, unknown>>(engine, node);
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [open, setOpen] = useState(false);

  const docKey = docs ? (docs.id ?? node.type) : null;
  const entry = docKey ? labels.customNodeDocs[docKey] : undefined;
  const hasHelp = Boolean(entry?.body);

  const title = useMemo(
    () => entry?.title ?? humanizeNodeType(node.type),
    [entry?.title, node.type],
  );

  const helpBlock =
    docs != null && hasHelp ? (
      <div style={{ marginBottom: PanelComponent ? 10 : 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              color: theme.textSecondary,
            }}
          >
            {title}
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? labels.inspectorNodeHelpHide : labels.inspectorNodeHelpShow}
            style={{
              flexShrink: 0,
              minWidth: 28,
              height: 28,
              padding: "0 8px",
              borderRadius: theme.controlBorderRadius,
              border: `1px solid ${theme.border}`,
              background: open ? theme.controlBg : "transparent",
              color: theme.textMuted,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            ?
          </button>
        </div>
        {open ? (
          <p
            style={{
              margin: "8px 0 0",
              padding: "8px 10px",
              borderRadius: theme.controlBorderRadius,
              fontSize: 12,
              lineHeight: 1.45,
              color: theme.textMuted,
              background: theme.controlBg,
              border: `1px solid ${theme.border}`,
              whiteSpace: "pre-wrap",
              maxHeight: 220,
              overflowY: "auto",
            }}
          >
            {entry!.body}
          </p>
        ) : null}
      </div>
    ) : null;

  if (!PanelComponent) {
    return helpBlock;
  }

  return (
    <>
      {helpBlock}
      <PanelComponent node={node} data={node.data} engine={engine} updateData={updateData} />
    </>
  );
}
