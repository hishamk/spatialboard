import { useContext } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ShapeNode } from "../../../engine/types";
import { MultiNodeContext, useBatchUpdate } from "../MultiNodeContext";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import StrokeStylePicker from "../controls/StrokeStylePicker";
import WidthPicker from "../controls/WidthPicker";
import OpacitySlider from "../controls/OpacitySlider";
import FillIcon from "../controls/FillIcon";
import FontPicker from "../../FontPicker";
import EdgeStyleIcon from "../controls/EdgeStyleIcon";
import PropertySection from "../controls/PropertySection";
import { useSBTheme } from "../ThemeContext";
import {
  rowStyle,
  labelStyle,
  btnBase,
  STROKE_PALETTES,
  FILL_PALETTES,
  FILL_STYLES,
  ROUGHNESS_LEVELS,
  TEXT_ALIGNS,
  WIDTHS_SHAPE,
} from "../styles";

interface ShapePropertiesProps {
  engine: SpatialEngine;
  node: ShapeNode;
  fontsInScene: string[];
}

const LABEL_FONT_SIZES: { label: string; size: number }[] = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 },
];

const SHAPE_TYPES: { key: string; label: string }[] = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" },
];

function ShapeTypeIcon({ name, size = 16 }: { name: string; size?: number }) {
  const p = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === "rect" && <rect x="4" y="4" width="16" height="16" rx="2" {...p} />}
      {name === "ellipse" && <ellipse cx="12" cy="12" rx="9" ry="8" {...p} />}
      {name === "diamond" && <path d="M12 3l9 9-9 9-9-9z" {...p} />}
      {name === "line" && <line x1="5" y1="19" x2="19" y2="5" {...p} />}
      {name === "arrow" && (
        <>
          <line x1="5" y1="19" x2="19" y2="5" {...p} />
          <polyline points="12,5 19,5 19,12" {...p} fill="none" />
        </>
      )}
    </svg>
  );
}

/** Returns true if the given property differs across all nodes in the group. */
function isMixed<T>(nodes: ShapeNode[], get: (n: ShapeNode) => T): boolean {
  if (nodes.length < 2) return false;
  const first = get(nodes[0]);
  return !nodes.every((n) => get(n) === first);
}

export default function ShapeProperties({ engine, node, fontsInScene }: ShapePropertiesProps) {
  const theme = useSBTheme();
  const update = useBatchUpdate<ShapeNode["data"]>(engine, node);
  const allNodes = (useContext(MultiNodeContext) ?? [node]) as ShapeNode[];

  const { data } = node;
  const fillColor = data.fill ?? null;
  const fillStyle = data.fillStyle ?? "hachure";
  const strokeStyle = data.strokeStyle ?? "solid";

  const mixedStroke      = isMixed(allNodes, (n) => n.data.stroke);
  const mixedFill        = isMixed(allNodes, (n) => n.data.fill ?? null);
  const mixedFillStyle   = isMixed(allNodes, (n) => n.data.fillStyle ?? "hachure");
  const mixedStrokeStyle = isMixed(allNodes, (n) => n.data.strokeStyle ?? "solid");
  const mixedStrokeWidth = isMixed(allNodes, (n) => n.data.strokeWidth);
  const mixedRoughness   = isMixed(allNodes, (n) => n.data.roughness);
  const mixedOpacity     = isMixed(allNodes, (n) => n.data.opacity ?? 1);

  return (
    <>
      <PropertySection title="Structure" persistKey="shape.structure">
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Shape</span>
          {SHAPE_TYPES.map((t) => (
            <button
              key={t.key}
              title={t.label}
              onClick={() => update({ shape: t.key as ShapeNode["data"]["shape"] })}
              style={{
                ...btnBase,
                width: 28,
                height: 28,
                background: data.shape === t.key ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              <ShapeTypeIcon name={t.key} />
            </button>
          ))}
        </div>

        {(data.shape === "rect" || data.shape === "diamond") && (
          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>Edges</span>
            {([
              { key: "sharp", label: "Sharp" },
              { key: "round", label: "Round" },
            ] as const).map((e) => (
              <button
                key={e.key}
                title={e.label}
                onClick={() => update({ edgeStyle: e.key === "sharp" ? undefined : e.key })}
                style={{
                  ...btnBase,
                  width: 28,
                  height: 28,
                  background: (data.edgeStyle ?? "sharp") === e.key ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                <EdgeStyleIcon name={e.key} />
              </button>
            ))}
          </div>
        )}

        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Label</span>
          <input
            type="text"
            value={data.label ?? ""}
            placeholder="Add label..."
            onChange={(e) => update({ label: e.target.value || undefined })}
            style={{
              flex: 1,
              fontSize: 12,
              padding: "4px 6px",
              background: theme.controlBg,
              color: theme.text,
              border: `1px solid ${theme.border}`,
              borderRadius: theme.controlBorderRadius,
              outline: "none",
            }}
          />
        </div>
      </PropertySection>

      {data.label && (
        <PropertySection title="Typography" defaultOpen={false} persistKey="shape.typography">
          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>Font</span>
            <FontPicker
              value={data.labelFontFamily ?? "Excalifont"}
              onChange={(f: string) => update({ labelFontFamily: f === "Excalifont" ? undefined : f })}
              fontsInScene={fontsInScene}
            />
          </div>

          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>Size</span>
            {LABEL_FONT_SIZES.map((s) => (
              <button
                key={s.size}
                onClick={() => update({ labelFontSize: s.size === 14 ? undefined : s.size })}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 28,
                  background: (data.labelFontSize ?? 14) === s.size ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>Align</span>
            {TEXT_ALIGNS.map((a) => (
              <button
                key={a.key}
                title={a.key}
                onClick={() => update({ labelAlign: a.key === "center" ? undefined : a.key })}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 28,
                  background: (data.labelAlign ?? "center") === a.key ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  fontSize: 12,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                {a.label}
              </button>
            ))}
          </div>
        </PropertySection>
      )}

      <PropertySection title="Appearance" persistKey="shape.appearance">
        <PaletteColorPicker
          label="Stroke"
          palettes={STROKE_PALETTES}
          value={mixedStroke ? undefined : data.stroke}
          mixed={mixedStroke}
          onChange={(c) => update({ stroke: c! })}
        />

        <PaletteColorPicker
          label="Fill"
          palettes={FILL_PALETTES}
          value={mixedFill ? undefined : fillColor}
          mixed={mixedFill}
          onChange={(c) => update({ fill: c ?? undefined })}
          allowNull
        />

        {fillColor && !mixedFill && (
          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>Fill pattern</span>
            {FILL_STYLES.map((f) => (
              <button
                key={f.key}
                title={f.label}
                onClick={() => update({ fillStyle: f.key })}
                style={{
                  ...btnBase,
                  width: 36,
                  height: 28,
                  background: !mixedFillStyle && fillStyle === f.key ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  fontSize: 9,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                <FillIcon style={f.key} />
              </button>
            ))}
          </div>
        )}

        <StrokeStylePicker
          label="Stroke style"
          value={strokeStyle}
          mixed={mixedStrokeStyle}
          onChange={(s) => update({ strokeStyle: s })}
        />

        <WidthPicker
          label="Stroke width"
          widths={WIDTHS_SHAPE}
          value={data.strokeWidth}
          mixed={mixedStrokeWidth}
          onChange={(w) => update({ strokeWidth: w })}
        />

        <OpacitySlider
          value={data.opacity ?? 1}
          mixed={mixedOpacity}
          onChange={(o) => update({ opacity: o })}
        />
      </PropertySection>

      <PropertySection title="Sketch" defaultOpen={false} persistKey="shape.sketch">
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Roughness</span>
          {ROUGHNESS_LEVELS.map((r) => (
            <button
              key={r.value}
              title={r.label}
              onClick={() => update({ roughness: r.value })}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 8px",
                background: !mixedRoughness && data.roughness === r.value ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 9,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </PropertySection>
    </>
  );
}
