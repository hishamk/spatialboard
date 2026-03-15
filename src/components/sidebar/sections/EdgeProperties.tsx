import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { EdgeNode } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import StrokeStylePicker from "../controls/StrokeStylePicker";
import WidthPicker from "../controls/WidthPicker";
import PropertySection from "../controls/PropertySection";
import { useSBTheme } from "../ThemeContext";
import { rowStyle, labelStyle, btnBase, STROKE_PALETTES, ROUGHNESS_LEVELS, WIDTHS_EDGE } from "../styles";

interface EdgePropertiesProps {
  engine: SpatialEngine;
  node: EdgeNode;
}

export default function EdgeProperties({ engine, node }: EdgePropertiesProps) {
  const theme = useSBTheme();
  const update = useBatchUpdate<EdgeNode["data"]>(engine, node);

  const { data } = node;

  return (
    <>
      <PropertySection title="Line" persistKey="edge.line">
        <PaletteColorPicker
          label="Color"
          palettes={STROKE_PALETTES}
          value={data.color}
          onChange={(c) => update({ color: c! })}
        />

        <StrokeStylePicker
          label="Style"
          value={data.style}
          onChange={(s) => update({ style: s })}
        />

        <WidthPicker
          label="Width"
          widths={WIDTHS_EDGE}
          value={data.strokeWidth}
          onChange={(w) => update({ strokeWidth: w })}
        />
      </PropertySection>

      <PropertySection title="Arrows" persistKey="edge.arrows">
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Head</span>
          {(["none", "arrow", "filled", "dot"] as const).map((v) => (
            <button
              key={v}
              onClick={() => update({ arrowHead: v })}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 6px",
                background: (data.arrowHead ?? "none") === v ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 11,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {v === "none" ? "None" : v === "arrow" ? "\u25B7" : v === "filled" ? "\u25B6" : "\u25CF"}
            </button>
          ))}
        </div>
        {(data.arrowHead ?? "none") !== "none" && (
          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>Head size</span>
            <input
              type="range"
              min={4}
              max={40}
              step={1}
              value={data.arrowHeadSize ?? Math.max(8, data.strokeWidth * 3)}
              onChange={(e) => update({ arrowHeadSize: Number(e.target.value) })}
              style={{ flex: 1, accentColor: theme.accentColor }}
            />
            <span style={{ color: theme.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }}>
              {data.arrowHeadSize ?? Math.max(8, data.strokeWidth * 3)}
            </span>
          </div>
        )}

        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Tail</span>
          {(["none", "arrow", "filled", "dot"] as const).map((v) => (
            <button
              key={v}
              onClick={() => update({ arrowTail: v })}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 6px",
                background: (data.arrowTail ?? "none") === v ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 11,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {v === "none" ? "None" : v === "arrow" ? "\u25C1" : v === "filled" ? "\u25C0" : "\u25CF"}
            </button>
          ))}
        </div>
        {(data.arrowTail ?? "none") !== "none" && (
          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>Tail size</span>
            <input
              type="range"
              min={4}
              max={40}
              step={1}
              value={data.arrowTailSize ?? Math.max(8, data.strokeWidth * 3)}
              onChange={(e) => update({ arrowTailSize: Number(e.target.value) })}
              style={{ flex: 1, accentColor: theme.accentColor }}
            />
            <span style={{ color: theme.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }}>
              {data.arrowTailSize ?? Math.max(8, data.strokeWidth * 3)}
            </span>
          </div>
        )}
      </PropertySection>

      <PropertySection title="Path & Motion" defaultOpen={false} persistKey="edge.path-motion">
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Path</span>
          {(
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              title={t.label}
              onClick={() => update({ edgeType: t.key })}
              style={{
                ...btnBase,
                height: 28,
                padding: "0 6px",
                background: (data.edgeType ?? "bezier") === t.key ? theme.controlBgActive : theme.controlBg,
                color: theme.text,
                fontSize: 9,
                borderRadius: theme.controlBorderRadius,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Animate</span>
          <button
            onClick={() => update({ animated: !data.animated })}
            style={{
              ...btnBase,
              height: 28,
              padding: "0 12px",
              background: data.animated ? theme.controlBgActive : theme.controlBg,
              color: theme.text,
              fontSize: 11,
              borderRadius: theme.controlBorderRadius,
            }}
          >
            {data.animated ? "On" : "Off"}
          </button>
        </div>
        {data.animated && (
          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>Direction</span>
            {(["forward", "reverse", "both", "bop"] as const).map((v) => (
              <button
                key={v}
                onClick={() => update({ animatedDirection: v })}
                style={{
                  ...btnBase,
                  height: 28,
                  padding: "0 6px",
                  background: (data.animatedDirection ?? "forward") === v ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  fontSize: 10,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                {v === "forward" ? "\u2192" : v === "reverse" ? "\u2190" : v === "both" ? "\u21C6" : "~"}
              </button>
            ))}
          </div>
        )}

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
                background: (data.roughness ?? 0) === r.value ? theme.controlBgActive : theme.controlBg,
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

      <PropertySection title="Label" defaultOpen={false} persistKey="edge.label">
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Text</span>
          <input
            type="text"
            value={data.label ?? ""}
            onChange={(e) => update({ label: e.target.value || undefined })}
            placeholder="Edge label..."
            style={{
              flex: 1,
              background: theme.controlBg,
              color: theme.text,
              border: "none",
              borderRadius: theme.controlBorderRadius,
              padding: "4px 8px",
              fontSize: 11,
              outline: "none",
            }}
          />
        </div>
      </PropertySection>
    </>
  );
}
