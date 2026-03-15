import { useState, useCallback, useMemo, useEffect } from "react";
import { MultiNodeContext } from "./MultiNodeContext";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type {
  SpatialNode,
  ShapeNode,
  DrawNode,
  TextNode,
  EdgeNode,
  ImageNode,
  ContentNode,
  FrameNode,
  StickyNoteNode,
  YouTubeNode,
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
import ToolModeProperties from "./sections/ToolModeProperties";
import CustomNodeProperties from "./sections/CustomNodeProperties";
import { PAPER_TYPES } from "../paper-types";

const TYPE_LABELS: Record<string, string> = {
  shape: "Shape",
  draw: "Drawing",
  text: "Text",
  edge: "Edge",
  image: "Image",
  content: "Content",
  frame: "Frame",
  sticky: "Sticky Note",
  youtube: "YouTube",
};

const OPACITY_TYPES = new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]);
const BORDER_TYPES = new Set(["text", "image", "content", "frame", "youtube"]);

function getFontsInScene(engine: SpatialEngine): string[] {
  const seen = new Set<string>();
  const fonts: string[] = [];
  for (const node of engine.getAllNodes()) {
    let f: string | undefined;
    if (node.type === "text") {
      f = (node as TextNode).data.fontFamily;
    } else if (node.type === "shape") {
      f = (node as ShapeNode).data.labelFontFamily;
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

function CanvasSettingsSection({
  engine,
  open,
  onToggle,
}: {
  engine: SpatialEngine;
  open?: boolean;
  onToggle?: () => void;
}) {
  const theme = useSBTheme();
  const [gridOn, setGridOn] = useState(engine.snapToGrid);
  const [gridSize, setGridSize] = useState(engine.gridSize);
  const [smartGuides, setSmartGuides] = useState(engine.smartGuides);
  const [paper, setPaper] = useState(engine.boardBackground);

  useEffect(() => {
    const syncGuides = () => {
      setGridOn(engine.snapToGrid);
      setGridSize(engine.gridSize);
      setSmartGuides(engine.smartGuides);
    };
    const syncBackground = () => setPaper(engine.boardBackground);
    engine.on("guides", syncGuides);
    engine.on("background", syncBackground);
    return () => {
      engine.off("guides", syncGuides);
      engine.off("background", syncBackground);
    };
  }, [engine]);

  const gridSizes = [10, 20, 40, 80];

  return (
    <PropertySection title="Canvas" defaultOpen={false} variant="group" open={open} onToggle={onToggle}>
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Grid</span>
        <button
          onClick={() => engine.toggleSnapToGrid()}
          style={{
            border: "none",
            borderRadius: theme.controlBorderRadius,
            background: gridOn ? theme.controlBgActive : theme.controlBg,
            color: theme.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          {gridOn ? "On" : "Off"}
        </button>
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Grid size</span>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }}>
          {gridSizes.map((s) => (
            <button
              key={s}
              onClick={() => engine.setGridSize(s)}
              style={{
                border: "none",
                borderRadius: theme.controlBorderRadius,
                background: gridSize === s ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 10,
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              {s}px
            </button>
          ))}
        </div>
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Guides</span>
        <button
          onClick={() => engine.toggleSmartGuides()}
          style={{
            border: "none",
            borderRadius: theme.controlBorderRadius,
            background: smartGuides ? theme.controlBgActive : theme.controlBg,
            color: theme.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          {smartGuides ? "On" : "Off"}
        </button>
      </div>

      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>Paper</span>
        <select
          value={paper}
          onChange={(e) => engine.setBoardBackground(e.target.value as typeof paper)}
          style={{
            flex: 1,
            height: 28,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.controlBorderRadius,
            background: theme.controlBg,
            color: theme.text,
            fontSize: 11,
            padding: "0 8px",
            outline: "none",
          }}
        >
          {PAPER_TYPES.map((p) => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
    </PropertySection>
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
    case "content":
      return <ContentProperties engine={engine} node={node as ContentNode} />;
    case "frame":
      return <FrameProperties engine={engine} node={node as FrameNode} />;
    case "sticky":
      return <StickyProperties engine={engine} node={node as StickyNoteNode} />;
    case "youtube":
      return <YouTubeProperties engine={engine} node={node as YouTubeNode} />;
    default: {
      const def = registry?.get(node.type);
      if (def?.propertiesPanel) {
        return <CustomNodeProperties engine={engine} node={node} PanelComponent={def.propertiesPanel} />;
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
      engine.batchUpdateWithHistory(updates);
    },
    [engine, nodes],
  );

  return (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>Rotation</span>
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
          width: 52,
          height: 24,
          border: `1px solid ${theme.border}`,
          borderRadius: theme.controlBorderRadius,
          background: theme.controlBg,
          color: theme.text,
          fontSize: 10,
          textAlign: "center",
          outline: "none",
          padding: "0 2px",
        }}
      />
      <span style={{ fontSize: 10, color: theme.textMuted }}>°</span>
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
      engine.batchUpdateWithHistory(updates);
    },
    [engine, nodes]
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
      label: "Cut",
      disabled: !hasSel,
      action: () => engine.cutSelected(),
    },
    {
      label: "Copy",
      disabled: !hasSel,
      action: () => engine.copySelected(),
    },
    {
      label: "Paste",
      disabled: !engine.hasClipboard(),
      action: () => engine.pasteClipboard(),
    },
    {
      label: "Duplicate",
      disabled: !hasSel,
      action: () => engine.duplicateSelected(),
    },
    {
      label: "Group",
      disabled: !hasGroupOps || selectionIds.length < 2,
      action: () => engine.groupSelected(),
    },
    {
      label: "Ungroup",
      disabled: !hasGroupOps || !engine.selectionHasGroup(),
      action: () => engine.ungroupSelected(),
    },
    {
      label: "Lock",
      disabled: !anyUnlocked,
      action: () => {
        for (const id of selectionIds) engine.updateNode(id, { locked: true });
      },
    },
    {
      label: "Unlock",
      disabled: !anyLocked,
      action: () => {
        for (const id of selectionIds) engine.updateNode(id, { locked: undefined });
      },
    },
    {
      label: "Delete",
      disabled: !hasSel,
      danger: true,
      action: () => engine.deleteSelected(),
    },
  ];

  return (
    <PropertySection title="Actions" defaultOpen variant="group" persistKey="touch-actions">
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
              padding: "5px 10px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.01em",
              cursor: item.disabled ? "default" : "pointer",
              whiteSpace: "nowrap",
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
  const label = TYPE_LABELS[group.type] ?? group.type;
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

export function getHeaderLabel(target: SelectionTarget): string {
  switch (target.kind) {
    case "none":
      return "No selection";
    case "tool":
      return `${target.mode.charAt(0).toUpperCase() + target.mode.slice(1)} tool`;
    case "single":
      return TYPE_LABELS[target.node.type] ?? target.node.type;
    case "multi": {
      const parts = target.typeGroups.map(
        (g) =>
          `${g.nodes.length} ${(TYPE_LABELS[g.type] ?? g.type).toLowerCase()}${g.nodes.length > 1 ? "s" : ""}`
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
}

export default function PropertiesContent({
  engine,
  registry,
  target,
  commonProps,
}: PropertiesContentProps) {
  const fontsInScene = useMemo(() => getFontsInScene(engine), [engine, target]);
  const headerLabel = getHeaderLabel(target);
  const [openMultiSection, setOpenMultiSection] = useState<string>("shared");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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
    const keys = new Set(["canvas", "shared", ...target.typeGroups.map((g) => g.type)]);
    if (!keys.has(openMultiSection)) {
      setOpenMultiSection("shared");
    }
  }, [target, openMultiSection]);

  return (
    <>
      <SelectionHeader label={headerLabel} />
      <CanvasSettingsSection
        engine={engine}
        open={target.kind === "multi" ? openMultiSection === "canvas" : undefined}
        onToggle={target.kind === "multi" ? () => setOpenMultiSection((cur) => (cur === "canvas" ? "" : "canvas")) : undefined}
      />

      {isTouchDevice && (
        <TouchSelectionActionsSection engine={engine} target={target} />
      )}

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
          <RotationInput engine={engine} nodes={[target.node]} />
        </>
      )}

      {target.kind === "multi" && (
        <>
          <PropertySection
            title="Shared"
            defaultOpen
            variant="group"
            open={openMultiSection === "shared"}
            onToggle={() => setOpenMultiSection((cur) => (cur === "shared" ? "" : "shared"))}
          >
            <CommonProperties engine={engine} nodes={target.nodes} commonProps={commonProps} />
            <RotationInput engine={engine} nodes={target.nodes} />
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
    </>
  );
}
