import { useState, useCallback, useMemo, useEffect, useContext } from "react";
import { MultiNodeContext } from "./MultiNodeContext";
import {
  PropertyHistoryCoalesceContext,
  usePropertyHistorySession,
} from "./PropertyHistoryCoalesceContext";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type {
  SpatialNode,
  ShapeNode,
  DrawNode,
  TextNode,
  EdgeNode,
  ImageNode,
  BlockNoteNode,
  FrameNode,
  StickyNoteNode,
  YouTubeNode,
  TableNode,
} from "../../engine/types";
import type { NodeTypeRegistry } from "../../nodes/registry";
import type { SelectionTarget, TypeGroup, MergedCommonProps } from "./useMultiSelection";
import { rowStyle, labelStyle } from "./styles";
import { useSBTheme } from "./ThemeContext";
import OpacitySlider from "./controls/OpacitySlider";
import BorderControls from "./controls/BorderControls";
import PropertySection from "./controls/PropertySection";
import ShapeProperties from "./sections/ShapeProperties";
import DrawProperties from "./sections/DrawProperties";
import TextProperties from "./sections/TextProperties";
import EdgeProperties from "./sections/EdgeProperties";
import ImageProperties from "./sections/ImageProperties";
import ContentProperties from "./sections/ContentProperties";
import FrameProperties from "./sections/FrameProperties";
import StickyProperties from "./sections/StickyProperties";
import YouTubeProperties from "./sections/YouTubeProperties";
import TableProperties from "./sections/TableProperties";
import ToolModeProperties from "./sections/ToolModeProperties";
import CustomNodeProperties from "./sections/CustomNodeProperties";
import { useSBI18n } from "../contexts/LocalizationContext";

const OPACITY_TYPES = new Set(["shape", "draw", "text", "image", "blocknote", "frame", "sticky", "youtube", "table"]);
const BORDER_TYPES = new Set(["text", "image", "blocknote", "frame", "youtube"]);

function buildTypeLabels(labels: ReturnType<typeof useSBI18n>["labels"]): Record<string, string> {
  return {
    shape: labels.typeShape,
    draw: labels.typeDrawing,
    text: labels.typeText,
    edge: labels.typeEdge,
    image: labels.typeImage,
    content: labels.typeContent,
    frame: labels.typeFrame,
    sticky: labels.typeStickyNote,
    youtube: labels.typeYouTube,
    table: labels.typeTable,
  };
}

function getFontsInScene(engine: SpatialEngine): string[] {
  const seen = new Set<string>();
  const fonts: string[] = [];
  for (const node of engine.getAllNodes()) {
    let f: string | undefined;
    if (node.type === "text") {
      f = (node as TextNode).data.fontFamily;
    } else if (node.type === "shape") {
      f = (node as ShapeNode).data.labelFontFamily;
    } else if (node.type === "table") {
      f = (node as TableNode).data.fontFamily;
    }
    if (f && !seen.has(f)) {
      seen.add(f);
      fonts.push(f);
    }
  }
  return fonts;
}

function SelectionHeader({ label }: { label: string }) {
  const theme = useSBTheme();
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: theme.textSecondary,
        padding: "2px 0 6px",
        borderBottom: `1px solid ${theme.border}`,
        marginBottom: 2,
      }}
    >
      {label}
    </div>
  );
}

function SingleNodeProperties({
  engine,
  node,
  registry,
  fontsInScene,
}: {
  engine: SpatialEngine;
  node: SpatialNode;
  registry?: NodeTypeRegistry;
  fontsInScene: string[];
}) {
  switch (node.type) {
    case "shape":
      return <ShapeProperties engine={engine} node={node as ShapeNode} fontsInScene={fontsInScene} />;
    case "draw":
      return <DrawProperties engine={engine} node={node as DrawNode} />;
    case "text":
      return <TextProperties engine={engine} node={node as TextNode} fontsInScene={fontsInScene} />;
    case "edge":
      return <EdgeProperties engine={engine} node={node as EdgeNode} />;
    case "image":
      return <ImageProperties engine={engine} node={node as ImageNode} />;
    case "blocknote":
      return <ContentProperties engine={engine} node={node as BlockNoteNode} />;
    case "frame":
      return <FrameProperties engine={engine} node={node as FrameNode} />;
    case "sticky":
      return <StickyProperties engine={engine} node={node as StickyNoteNode} />;
    case "youtube":
      return <YouTubeProperties engine={engine} node={node as YouTubeNode} />;
    case "table":
      return <TableProperties engine={engine} node={node as TableNode} fontsInScene={fontsInScene} />;
    default: {
      const def = registry?.get(node.type);
      if (def?.propertiesPanel) {
        return (
          <CustomNodeProperties
            engine={engine}
            node={node}
            PanelComponent={def.propertiesPanel}
            docs={def.docs}
          />
        );
      }
      if (def?.docs) {
        return <CustomNodeProperties engine={engine} node={node} docs={def.docs} />;
      }
      return null;
    }
  }
}

function RotationInput({
  engine,
  nodes,
}: {
  engine: SpatialEngine;
  nodes: SpatialNode[];
}) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const getCoalesceKey = useContext(PropertyHistoryCoalesceContext);
  // node.rotation is already in degrees
  const firstDeg = Math.round(nodes[0].rotation ?? 0);
  const allSame = nodes.every(
    (n) => Math.round(n.rotation ?? 0) === firstDeg,
  );
  const currentDeg = allSame ? firstDeg : null;

  const [draft, setDraft] = useState<string | null>(null);

  const commit = useCallback(
    (raw: string) => {
      setDraft(null);
      const parsed = parseFloat(raw);
      if (isNaN(parsed)) return;
      const clamped = Math.max(-360, Math.min(360, parsed));
      const updates = nodes.map((n) => ({
        id: n.id,
        patch: { rotation: clamped },
      }));
      const key = getCoalesceKey?.();
      if (key) engine.batchUpdateWithHistoryCoalesced(updates, key);
      else engine.batchUpdateWithHistory(updates);
    },
    [engine, nodes, getCoalesceKey],
  );

  return (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorRotation}</span>
      <input
        type="number"
        min={-360}
        max={360}
        value={draft ?? (currentDeg !== null ? String(currentDeg) : "")}
        placeholder={currentDeg === null ? "Mixed" : undefined}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
          if (e.key === "Escape") setDraft(null);
        }}
        style={{
          width: 56,
          height: "var(--sbp-ctl-h, 24px)",
          border: `1px solid ${theme.border}`,
          borderRadius: theme.controlBorderRadius,
          background: theme.controlBg,
          color: theme.text,
          fontSize: "var(--sbp-label-fs, 10px)",
          textAlign: "center",
          outline: "none",
          padding: "0 2px",
        }}
      />
      <span style={{ fontSize: "var(--sbp-label-fs, 10px)", color: theme.textMuted }}>°</span>
    </div>
  );
}

function ZOrderControls({
  engine,
  nodes,
}: {
  engine: SpatialEngine;
  nodes: SpatialNode[];
}) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const ids = nodes.map((n) => n.id);
  if (ids.length === 0) return null;

  const actions = [
    {
      label: labels.actionBringForward,
      action: () => engine.bringForward(ids),
      icon: "\u2191+",
    },
    {
      label: labels.actionSendBackward,
      action: () => engine.sendBackward(ids),
      icon: "\u2193-",
    },
    {
      label: labels.actionBringToFront,
      action: () => engine.bringToFront(ids),
      icon: "\u21E1|",
    },
    {
      label: labels.actionSendToBack,
      action: () => engine.sendToBack(ids),
      icon: "|\u21E3",
    },
  ];

  return (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorStack}</span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
          flex: 1,
          minWidth: 0,
        }}
      >
        {actions.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.action}
            title={item.label}
            aria-label={item.label}
            style={{
              border: "none",
              borderRadius: theme.controlBorderRadius,
              background: theme.controlBg,
              color: theme.text,
              width: "var(--sbp-sbtn-w, 42px)",
              height: "var(--sbp-ctl-h, 28px)",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              touchAction: "manipulation",
            }}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

function CommonProperties({
  engine,
  nodes,
  commonProps,
}: {
  engine: SpatialEngine;
  nodes: SpatialNode[];
  commonProps: MergedCommonProps;
}) {
  const getCoalesceKey = useContext(PropertyHistoryCoalesceContext);
  const updateAll = useCallback(
    (prop: string, value: unknown) => {
      const supportSet = prop === "opacity" ? OPACITY_TYPES : BORDER_TYPES;
      const updates = nodes
        .filter((n) => supportSet.has(n.type))
        .map((n) => ({
          id: n.id,
          patch: {
            data: { ...(n.data as Record<string, unknown>), [prop]: value },
          },
        }));
      const key = getCoalesceKey?.();
      if (key) engine.batchUpdateWithHistoryCoalesced(updates, key);
      else engine.batchUpdateWithHistory(updates);
    },
    [engine, nodes, getCoalesceKey]
  );

  return (
    <>
      {commonProps.opacity !== undefined && (
        <OpacitySlider
          value={commonProps.opacity === "mixed" ? undefined : commonProps.opacity}
          mixed={commonProps.opacity === "mixed"}
          onChange={(v) => updateAll("opacity", v)}
        />
      )}
      {commonProps.borderColor !== undefined && (
        <BorderControls
          borderColor={
            commonProps.borderColor === "mixed" ? undefined : commonProps.borderColor
          }
          borderStyle={
            commonProps.borderStyle === "mixed" ? undefined : commonProps.borderStyle
          }
          borderWidth={
            commonProps.borderWidth === "mixed" ? undefined : commonProps.borderWidth
          }
          mixed={{
            color: commonProps.borderColor === "mixed",
            style: commonProps.borderStyle === "mixed",
            width: commonProps.borderWidth === "mixed",
          }}
          onChange={(prop, value) => updateAll(prop, value)}
        />
      )}
    </>
  );
}

function TouchSelectionActionsSection({
  engine,
  target,
}: {
  engine: SpatialEngine;
  target: SelectionTarget;
}) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  if (target.kind !== "single" && target.kind !== "multi") return null;

  const selectionIds = Array.from(engine.selection);
  const hasSel = selectionIds.length > 0;
  const hasGroupOps = selectionIds.length >= 2 || engine.selectionHasGroup();
  const anyLocked = selectionIds.some((id) => engine.getNode(id)?.locked);
  const anyUnlocked = selectionIds.some((id) => !engine.getNode(id)?.locked);

  const actions: Array<{
    label: string;
    disabled?: boolean;
    danger?: boolean;
    action: () => void;
  }> = [
    {
      label: labels.actionCut,
      disabled: !hasSel,
      action: () => engine.cutSelected(),
    },
    {
      label: labels.actionCopy,
      disabled: !hasSel,
      action: () => engine.copySelected(),
    },
    {
      label: labels.actionPaste,
      disabled: !engine.hasClipboard(),
      action: () => engine.pasteClipboard(),
    },
    {
      label: labels.actionDuplicate,
      disabled: !hasSel,
      action: () => engine.duplicateSelected(),
    },
    {
      label: labels.actionBringForward,
      disabled: !hasSel,
      action: () => engine.bringForward(selectionIds),
    },
    {
      label: labels.actionSendBackward,
      disabled: !hasSel,
      action: () => engine.sendBackward(selectionIds),
    },
    {
      label: labels.actionBringToFront,
      disabled: !hasSel,
      action: () => engine.bringToFront(selectionIds),
    },
    {
      label: labels.actionSendToBack,
      disabled: !hasSel,
      action: () => engine.sendToBack(selectionIds),
    },
    {
      label: labels.actionGroupSelection,
      disabled: !hasGroupOps || selectionIds.length < 2,
      action: () => engine.groupSelected(),
    },
    {
      label: labels.actionUngroupSelection,
      disabled: !hasGroupOps || !engine.selectionHasGroup(),
      action: () => engine.ungroupSelected(),
    },
    {
      label: labels.actionLock,
      disabled: !anyUnlocked,
      action: () => {
        for (const id of selectionIds) engine.updateNode(id, { locked: true });
      },
    },
    {
      label: labels.actionUnlock,
      disabled: !anyLocked,
      action: () => {
        for (const id of selectionIds) engine.updateNode(id, { locked: undefined });
      },
    },
    {
      label: labels.actionDelete,
      disabled: !hasSel,
      danger: true,
      action: () => engine.deleteSelected(),
    },
  ];

  return (
    <PropertySection title={labels.inspectorActions} defaultOpen variant="group" persistKey="touch-actions">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {actions.map((item) => (
          <button
            key={item.label}
            type="button"
            disabled={item.disabled}
            onClick={item.action}
            style={{
              border: `1px solid ${theme.border}`,
              borderRadius: 999,
              background: item.disabled ? theme.controlBg : theme.controlBgActive,
              color: item.danger ? "#fecaca" : theme.text,
              opacity: item.disabled ? 0.45 : 0.95,
              padding: "var(--sbp-pill-pad, 5px 10px)",
              fontSize: "var(--sbp-pill-fs, 10px)",
              fontWeight: 700,
              letterSpacing: "0.01em",
              cursor: item.disabled ? "default" : "pointer",
              whiteSpace: "nowrap",
              touchAction: "manipulation",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </PropertySection>
  );
}

function TypeGroupSection({
  engine,
  group,
  registry,
  fontsInScene,
  open,
  onToggle,
}: {
  engine: SpatialEngine;
  group: TypeGroup;
  registry?: NodeTypeRegistry;
  fontsInScene: string[];
  open?: boolean;
  onToggle?: () => void;
}) {
  const { labels } = useSBI18n();
  const typeLabels = buildTypeLabels(labels);
  const label = typeLabels[group.type] ?? group.type;
  const count = group.nodes.length;
  const primaryNode = group.nodes[0];
  const title = `${label} (${count})`;

  return (
    <PropertySection title={title} defaultOpen={false} variant="group" open={open} onToggle={onToggle}>
      <MultiNodeContext.Provider value={group.nodes}>
        <SingleNodeProperties
          engine={engine}
          node={primaryNode}
          registry={registry}
          fontsInScene={fontsInScene}
        />
      </MultiNodeContext.Provider>
    </PropertySection>
  );
}

export function getHeaderLabel(
  target: SelectionTarget,
  labels: ReturnType<typeof useSBI18n>["labels"],
): string {
  const typeLabels = buildTypeLabels(labels);
  switch (target.kind) {
    case "none":
      return labels.inspectorNoSelection;
    case "tool":
      return `${target.mode.charAt(0).toUpperCase() + target.mode.slice(1)} ${labels.inspectorToolSuffix}`;
    case "single":
      return typeLabels[target.node.type] ?? target.node.type;
    case "multi": {
      const parts = target.typeGroups.map(
        (g) =>
          `${g.nodes.length} ${(typeLabels[g.type] ?? g.type).toLowerCase()}${g.nodes.length > 1 ? "s" : ""}`
      );
      return parts.join(", ");
    }
  }
}

interface PropertiesContentProps {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  target: SelectionTarget;
  commonProps: MergedCommonProps;
  /** Mobile sheet layout: style controls first, actions after; the type
   *  header is omitted (the sheet header carries it). */
  mobileLayout?: boolean;
  /** Multi-selection layout: the default vertical accordion, or a TAB strip
   *  (Shared + one tab per node type) for wide horizontal hosts like the
   *  console chrome, where stacked collapsibles force scrolling. */
  multiLayout?: "accordion" | "tabs";
  /** Omit the selection header (hosts whose zone label already names the
   *  target, e.g. the console chrome). */
  hideHeader?: boolean;
  /** Omit rotation + stack rows (hosts that surface them elsewhere, e.g. the
   *  console chrome's floating selection action bar). */
  hideArrangeControls?: boolean;
}

export default function PropertiesContent({
  engine,
  registry,
  target,
  commonProps,
  mobileLayout = false,
  multiLayout = "accordion",
  hideHeader = false,
  hideArrangeControls = false,
}: PropertiesContentProps) {
  const { labels } = useSBI18n();
  const theme = useSBTheme();
  const fontsInScene = useMemo(() => getFontsInScene(engine), [engine, target]);
  const headerLabel = getHeaderLabel(target, labels);
  const [openMultiSection, setOpenMultiSection] = useState<string>("shared");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const stableSelectionId = useMemo(() => {
    switch (target.kind) {
      case "single":
        return target.node.id;
      case "multi":
        return [...target.nodes].map((n) => n.id).sort().join("\0");
      case "tool":
        return "tool";
      default:
        return "none";
    }
  }, [target]);

  const getCoalesceKey = usePropertyHistorySession(engine, stableSelectionId);

  useEffect(() => {
    const update = () => {
      setIsTouchDevice(
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches ||
        navigator.maxTouchPoints > 0
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (target.kind !== "multi") {
      setOpenMultiSection("shared");
      return;
    }
    // Keep current selection section if it still exists, otherwise reset to shared.
    const keys = new Set(["shared", ...target.typeGroups.map((g) => g.type)]);
    if (!keys.has(openMultiSection)) {
      setOpenMultiSection("shared");
    }
  }, [target, openMultiSection]);

  const touchActions = isTouchDevice ? (
    <TouchSelectionActionsSection engine={engine} target={target} />
  ) : null;

  const styleControls = (
    <>
      {target.kind === "tool" && (
        <ToolModeProperties engine={engine} mode={target.mode} fontsInScene={fontsInScene} />
      )}

      {target.kind === "single" && (
        <>
          <SingleNodeProperties
            engine={engine}
            node={target.node}
            registry={registry}
            fontsInScene={fontsInScene}
          />
          {!hideArrangeControls && <RotationInput engine={engine} nodes={[target.node]} />}
          {!hideArrangeControls && <ZOrderControls engine={engine} nodes={[target.node]} />}
        </>
      )}

      {target.kind === "multi" && multiLayout === "accordion" && (
        <>
          <PropertySection
            title={labels.inspectorShared}
            defaultOpen
            variant="group"
            open={openMultiSection === "shared"}
            onToggle={() => setOpenMultiSection((cur) => (cur === "shared" ? "" : "shared"))}
          >
            <CommonProperties engine={engine} nodes={target.nodes} commonProps={commonProps} />
            <RotationInput engine={engine} nodes={target.nodes} />
            <ZOrderControls engine={engine} nodes={target.nodes} />
          </PropertySection>
          {target.typeGroups.map((group) => (
            <TypeGroupSection
              key={group.type}
              engine={engine}
              group={group}
              registry={registry}
              fontsInScene={fontsInScene}
              open={openMultiSection === group.type}
              onToggle={() => setOpenMultiSection((cur) => (cur === group.type ? "" : group.type))}
            />
          ))}
        </>
      )}

      {target.kind === "multi" && multiLayout === "tabs" && (() => {
        const typeLabels = buildTypeLabels(labels);
        const activeGroup = target.typeGroups.find((g) => g.type === openMultiSection);
        const tabBtn = (active: boolean): React.CSSProperties => ({
          border: "none",
          cursor: "pointer",
          borderRadius: 999,
          padding: "3px 10px",
          fontSize: 11,
          fontFamily: "inherit",
          background: active ? theme.controlBgActive : theme.controlBg,
          color: theme.text,
          whiteSpace: "nowrap",
        });
        return (
          <>
            {/* Tab strip takes the full line in wrap-flow hosts. */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, columnSpan: "all", flexBasis: "100%" }}>
              <button
                style={tabBtn(openMultiSection === "shared")}
                onClick={() => setOpenMultiSection("shared")}
              >
                {labels.inspectorShared}
              </button>
              {target.typeGroups.map((group) => (
                <button
                  key={group.type}
                  style={tabBtn(openMultiSection === group.type)}
                  onClick={() => setOpenMultiSection(group.type)}
                >
                  {typeLabels[group.type] ?? group.type} ({group.nodes.length})
                </button>
              ))}
            </div>
            {openMultiSection === "shared" || !activeGroup ? (
              <>
                <CommonProperties engine={engine} nodes={target.nodes} commonProps={commonProps} />
                {!hideArrangeControls && <RotationInput engine={engine} nodes={target.nodes} />}
                {!hideArrangeControls && <ZOrderControls engine={engine} nodes={target.nodes} />}
              </>
            ) : (
              <MultiNodeContext.Provider value={activeGroup.nodes}>
                <SingleNodeProperties
                  engine={engine}
                  node={activeGroup.nodes[0]}
                  registry={registry}
                  fontsInScene={fontsInScene}
                />
              </MultiNodeContext.Provider>
            )}
          </>
        );
      })()}
    </>
  );

  // Mobile sheet: what you came to change (style) sits under your thumb
  // first, actions follow. The type header is omitted — the sheet's own
  // header names the selection. (Board-level canvas settings live in the
  // rail gear / mobile ⋯ menu, not the inspector.)
  if (mobileLayout) {
    return (
      <PropertyHistoryCoalesceContext.Provider value={getCoalesceKey}>
        {styleControls}
        {touchActions}
      </PropertyHistoryCoalesceContext.Provider>
    );
  }

  return (
    <PropertyHistoryCoalesceContext.Provider value={getCoalesceKey}>
      {!hideHeader && <SelectionHeader label={headerLabel} />}
      {touchActions}
      {styleControls}
    </PropertyHistoryCoalesceContext.Provider>
  );
}
