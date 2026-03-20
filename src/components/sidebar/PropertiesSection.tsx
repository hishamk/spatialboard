import { useCallback, useContext, useMemo } from "react";
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
  ContentNode,
  FrameNode,
  StickyNoteNode,
} from "../../engine/types";
import type { NodeTypeRegistry } from "../../nodes/registry";
import { useMultiSelection, type TypeGroup, type MergedCommonProps } from "./useMultiSelection";
import { PROPERTIES_WIDTH, sectionHeader } from "./styles";
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
};

const OPACITY_TYPES = new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]);
const BORDER_TYPES = new Set(["text", "image", "content", "frame"]);

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

function EmptyState() {
  const theme = useSBTheme();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        color: theme.textDisabled,
        fontSize: 11,
        textAlign: "center",
        padding: "20px 10px",
      }}
    >
      Select an element to<br />edit its properties
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
            commonProps.borderColor === "mixed"
              ? undefined
              : commonProps.borderColor
          }
          borderStyle={
            commonProps.borderStyle === "mixed"
              ? undefined
              : commonProps.borderStyle
          }
          borderWidth={
            commonProps.borderWidth === "mixed"
              ? undefined
              : commonProps.borderWidth
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

  // For multi-selection of same type, we show controls for the first node
  // and fan out changes to all nodes of this type
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

export default function PropertiesSection({
  engine,
  registry,
}: {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
}) {
  const theme = useSBTheme();
  const { target, commonProps } = useMultiSelection(engine);

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

  const fontsInScene = useMemo(() => getFontsInScene(engine), [engine, target]);

  const headerLabel = (() => {
    switch (target.kind) {
      case "none":
        return "No selection";
      case "tool":
        return `${target.mode.charAt(0).toUpperCase() + target.mode.slice(1)} tool`;
      case "single":
        return TYPE_LABELS[target.node.type] ?? target.node.type;
      case "multi": {
        const parts = target.typeGroups.map(
          (g) => `${g.nodes.length} ${(TYPE_LABELS[g.type] ?? g.type).toLowerCase()}${g.nodes.length > 1 ? "s" : ""}`
        );
        return parts.join(", ");
      }
    }
  })();

  return (
    <div
      data-sb-properties
      style={{
        width: PROPERTIES_WIDTH,
        background: theme.panelBg,
        borderLeft: `1px solid ${theme.border}`,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "8px 10px",
        gap: 8,
        color: theme.text,
        fontSize: 11,
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <PropertyHistoryCoalesceContext.Provider value={getCoalesceKey}>
        <SelectionHeader label={headerLabel} />

        {target.kind === "none" && <EmptyState />}

        {target.kind === "tool" && (
          <ToolModeProperties engine={engine} mode={target.mode} fontsInScene={fontsInScene} />
        )}

        {target.kind === "single" && (
          <SingleNodeProperties
            engine={engine}
            node={target.node}
            registry={registry}
            fontsInScene={fontsInScene}
          />
        )}

        {target.kind === "multi" && (
          <>
            <CommonProperties
              engine={engine}
              nodes={target.nodes}
              commonProps={commonProps}
            />
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
      </PropertyHistoryCoalesceContext.Provider>
    </div>
  );
}
