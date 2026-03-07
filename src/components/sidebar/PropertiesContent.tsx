import { useState, useCallback, useMemo } from "react";
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
import { sectionHeader, rowStyle, labelStyle } from "./styles";
import { useSBTheme } from "./ThemeContext";
import OpacitySlider from "./controls/OpacitySlider";
import BorderControls from "./controls/BorderControls";
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

function TypeGroupSection({
  engine,
  group,
  registry,
  fontsInScene,
}: {
  engine: SpatialEngine;
  group: TypeGroup;
  registry?: NodeTypeRegistry;
  fontsInScene: string[];
}) {
  const label = TYPE_LABELS[group.type] ?? group.type;
  const count = group.nodes.length;
  const primaryNode = group.nodes[0];

  const theme = useSBTheme();

  return (
    <>
      <div style={{ ...sectionHeader, color: theme.textFaint, borderTop: `1px solid ${theme.border}` }}>
        {label} ({count})
      </div>
      <MultiNodeContext.Provider value={group.nodes}>
        <SingleNodeProperties
          engine={engine}
          node={primaryNode}
          registry={registry}
          fontsInScene={fontsInScene}
        />
      </MultiNodeContext.Provider>
    </>
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

  return (
    <>
      <SelectionHeader label={headerLabel} />

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
          <CommonProperties engine={engine} nodes={target.nodes} commonProps={commonProps} />
          <RotationInput engine={engine} nodes={target.nodes} />
          {target.typeGroups.map((group) => (
            <TypeGroupSection
              key={group.type}
              engine={engine}
              group={group}
              registry={registry}
              fontsInScene={fontsInScene}
            />
          ))}
        </>
      )}
    </>
  );
}
