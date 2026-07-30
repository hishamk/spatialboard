import { useContext, useEffect, useMemo } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { EdgeNode, HandleSide } from "../../../engine/types";
import { MultiNodeContext, useBatchUpdate } from "../MultiNodeContext";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import StrokeStylePicker from "../controls/StrokeStylePicker";
import WidthPicker from "../controls/WidthPicker";
import PropertySection from "../controls/PropertySection";
import { useSBTheme } from "../ThemeContext";
import { rowStyle, labelStyle, btnBase, STROKE_PALETTES, ROUGHNESS_LEVELS, WIDTHS_EDGE } from "../styles";
import { useSBI18n } from "../../contexts/LocalizationContext";

const HANDLE_TO_T: Record<HandleSide, number> = { top: 0, right: 0.25, bottom: 0.5, left: 0.75 };
const T_TO_HANDLE: [number, HandleSide][] = [[0, "top"], [0.25, "right"], [0.5, "bottom"], [0.75, "left"]];
function tToNearestHandle(t: number): HandleSide {
  let best: HandleSide = "top";
  let bestDist = Infinity;
  for (const [tv, side] of T_TO_HANDLE) {
    const d = Math.min(Math.abs(t - tv), Math.abs(t - tv - 1), Math.abs(t - tv + 1));
    if (d < bestDist) { bestDist = d; best = side; }
  }
  return best;
}

interface EdgePropertiesProps {
  engine: SpatialEngine;
  node: EdgeNode;
}

const PORT_EDGE_ANIM_DIRECTIONS = ["forward"] as const;
const FREE_EDGE_ANIM_DIRECTIONS = ["forward", "reverse", "both", "bop"] as const;

export default function EdgeProperties({ engine, node }: EdgePropertiesProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const update = useBatchUpdate<EdgeNode["data"]>(engine, node);
  const multi = useContext(MultiNodeContext);

  const { data } = node;
  const isPortConnection = Boolean(data.sourcePort && data.targetPort);
  const animDirections = isPortConnection ? PORT_EDGE_ANIM_DIRECTIONS : FREE_EDGE_ANIM_DIRECTIONS;

  const multiEdgeKey = useMemo(() => {
    if (!multi?.length || !multi.every((n) => n.type === "edge")) return null;
    return [...multi].map((n) => n.id).sort().join("|");
  }, [multi]);

  useEffect(() => {
    const ids = multiEdgeKey !== null ? multiEdgeKey.split("|") : [node.id];
    for (const id of ids) {
      const en = engine.getNode(id) as EdgeNode | undefined;
      if (!en || en.type !== "edge") continue;
      const d = en.data;
      if (!d.sourcePort || !d.targetPort || !d.animated) continue;
      if ((d.animatedDirection ?? "forward") === "forward") continue;
      engine.updateNode(id, { data: { ...d, animatedDirection: "forward" } });
    }
  }, [engine, multiEdgeKey, node.id]);

  return (
    <>
      <PropertySection title={labels.edgeLineSection} persistKey="edge.line">
        <PaletteColorPicker
          label={labels.edgeColor}
          palettes={STROKE_PALETTES}
          value={data.color}
          onChange={(c) => update({ color: c! })}
        />

        <StrokeStylePicker
          label={labels.inspectorStyle}
          value={data.style}
          onChange={(s) => update({ style: s })}
        />

        <WidthPicker
          label={labels.inspectorWidth}
          widths={WIDTHS_EDGE}
          value={data.strokeWidth}
          onChange={(w) => update({ strokeWidth: w })}
        />

        {/* Connection mode: Fixed (4 anchors) vs Free (any border point) */}
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>Connect</span>
          {(["fixed", "free"] as const).map((mode) => {
            const isFree = data.sourceT !== undefined || data.targetT !== undefined;
            const isActive = mode === "free" ? isFree : !isFree;
            return (
              <button
                key={mode}
                onClick={() => {
                  if (mode === "free" && !isFree) {
                    // Convert fixed → free
                    update({
                      sourceT: data.sourceHandle ? HANDLE_TO_T[data.sourceHandle] : 0,
                      targetT: data.targetHandle ? HANDLE_TO_T[data.targetHandle] : 0.5,
                      sourceHandle: undefined,
                      targetHandle: undefined,
                    } as any);
                  } else if (mode === "fixed" && isFree) {
                    // Convert free → fixed
                    update({
                      sourceHandle: data.sourceT !== undefined ? tToNearestHandle(data.sourceT) : "right",
                      targetHandle: data.targetT !== undefined ? tToNearestHandle(data.targetT) : "left",
                      sourceT: undefined,
                      targetT: undefined,
                    } as any);
                  }
                }}
                style={{
                  ...btnBase,
                  height: 28,
                  padding: "0 8px",
                  background: isActive ? theme.controlBgActive : theme.controlBg,
                  color: theme.text,
                  fontSize: 10,
                  borderRadius: theme.controlBorderRadius,
                }}
              >
                {mode === "fixed" ? "Fixed" : "Free"}
              </button>
            );
          })}
        </div>

      </PropertySection>

      <PropertySection title={labels.edgeArrowsSection} persistKey="edge.arrows">
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeHead}</span>
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
              {v === "none" ? labels.inspectorNone : v === "arrow" ? "\u25B7" : v === "filled" ? "\u25B6" : "\u25CF"}
            </button>
          ))}
        </div>
        {(data.arrowHead ?? "none") !== "none" && (
          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeHeadSize}</span>
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
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeTail}</span>
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
              {v === "none" ? labels.inspectorNone : v === "arrow" ? "\u25C1" : v === "filled" ? "\u25C0" : "\u25CF"}
            </button>
          ))}
        </div>
        {(data.arrowTail ?? "none") !== "none" && (
          <div style={rowStyle}>
            <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeTailSize}</span>
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

      <PropertySection title={labels.edgePathMotionSection} persistKey="edge.path-motion">
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgePath}</span>
          {(
            [
              { key: "bezier", label: labels.edgeBezier },
              { key: "straight", label: labels.edgeStraight },
              { key: "smoothstep", label: labels.edgeSmooth },
              { key: "step", label: labels.edgeStep },
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
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeAnimate}</span>
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
            {data.animated ? labels.inspectorOn : labels.inspectorOff}
          </button>
        </div>
        {data.animated && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={rowStyle}>
              <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeDirection}</span>
              {animDirections.map((v) => (
                <button
                  key={v}
                  type="button"
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
            {isPortConnection && (
              <span
                style={{
                  marginLeft: 0,
                  fontSize: 10,
                  color: theme.textMuted,
                  lineHeight: 1.35,
                }}
              >
                {labels.edgeAnimationPortHint}
              </span>
            )}
          </div>
        )}

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
                  background: (data.roughness ?? 0) === r.value ? theme.controlBgActive : theme.controlBg,
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
      </PropertySection>

      <PropertySection title={labels.inspectorLabel} defaultOpen={false} persistKey="edge.label">
        <div style={rowStyle}>
          <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.edgeText}</span>
          <input
            type="text"
            value={data.label ?? ""}
            onChange={(e) => update({ label: e.target.value || undefined })}
            placeholder={labels.edgeLabelPlaceholder}
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
