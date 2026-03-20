import { useMemo, useCallback, useState, useEffect, useContext } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { FrameNode, SlideTransition } from "../../../engine/types";
import { TRANSITION_DEFAULTS } from "../../../engine/types";
import { useBatchUpdate } from "../MultiNodeContext";
import { PropertyHistoryCoalesceContext } from "../PropertyHistoryCoalesceContext";
import { getGroupedPresets, getPreset, getAspectRatio } from "../devicePresets";
import PaletteColorPicker from "../controls/PaletteColorPicker";
import StrokeStylePicker from "../controls/StrokeStylePicker";
import WidthPicker from "../controls/WidthPicker";
import OpacitySlider from "../controls/OpacitySlider";
import { useSBTheme } from "../ThemeContext";
import { rowStyle, labelStyle, STROKE_PALETTES, STROKE_COLORS } from "../styles";
import { useSBI18n } from "../../LocalizationContext";

interface FramePropertiesProps {
  engine: SpatialEngine;
  node: FrameNode;
}

const groupedPresets = getGroupedPresets();

function DurationInput({
  value,
  onChange,
  theme,
  durationLabel,
  msLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  theme: ReturnType<typeof useSBTheme>;
  durationLabel: string;
  msLabel: string;
}) {
  const [local, setLocal] = useState(String(value));
  useEffect(() => setLocal(String(value)), [value]);

  const commit = () => {
    const v = parseInt(local, 10);
    if (!isNaN(v) && v >= 100 && v <= 5000) {
      onChange(v);
    } else {
      setLocal(String(value));
    }
  };

  return (
    <div style={rowStyle}>
      <span style={{ ...labelStyle, color: theme.textMuted }}>{durationLabel}</span>
      <input
        type="number"
        min={100}
        max={5000}
        step={50}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); }}
        style={{
          width: 64,
          background: theme.controlBg,
          color: theme.text,
          border: "none",
          borderRadius: theme.controlBorderRadius,
          padding: "4px 6px",
          fontSize: 11,
          outline: "none",
        }}
      />
      <span style={{ fontSize: 10, color: theme.textMuted }}>{msLabel}</span>
    </div>
  );
}

export default function FrameProperties({ engine, node }: FramePropertiesProps) {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const update = useBatchUpdate<FrameNode["data"]>(engine, node);
  const getCoalesceKey = useContext(PropertyHistoryCoalesceContext);

  const { data } = node;

  const onPresetChange = useCallback(
    (key: string) => {
      if (!key) {
        // Freeform — clear preset
        update({ devicePreset: undefined });
        return;
      }
      const preset = getPreset(key);
      if (!preset) return;
      const ratio = getAspectRatio(preset);
      const newH = Math.round(node.w / ratio);
      const patch: Partial<FrameNode["data"]> = { devicePreset: key };
      if (!data.label || getPreset(data.devicePreset ?? "")?.label === data.label) {
        patch.label = preset.label;
      }
      const newData = { ...node.data, ...patch };
      const k = getCoalesceKey?.();
      if (k) {
        engine.updateNodeWithHistoryCoalesced(
          node.id,
          { h: newH, data: newData } as Partial<FrameNode>,
          k,
        );
      } else {
        engine.updateNodeWithHistory(node.id, {
          h: newH,
          data: newData,
        } as Partial<FrameNode>);
      }
    },
    [engine, node, data.label, data.devicePreset, update, getCoalesceKey],
  );

  // Compute available slide slots: 1..frameCount, excluding slots taken by other frames
  const slideOptions = useMemo(() => {
    const allFrames = engine.getAllNodes().filter((n) => n.type === "frame") as FrameNode[];
    const total = allFrames.length;
    const taken = new Set<number>();
    for (const f of allFrames) {
      if (f.id !== node.id && f.data.slideOrder != null) {
        taken.add(f.data.slideOrder);
      }
    }
    const available: number[] = [];
    for (let i = 1; i <= total; i++) {
      if (!taken.has(i)) available.push(i);
    }
    // Ensure current value is included even if out of range (e.g. frame deleted)
    const cur = node.data.slideOrder;
    if (cur != null && !available.includes(cur)) {
      available.push(cur);
      available.sort((a, b) => a - b);
    }
    return available;
  }, [engine, node]);

  const transitionLabelByKey: Record<SlideTransition, string> = {
    pan: labels.transitionPan,
    fade: labels.transitionFadeToBlack,
    dissolve: labels.transitionDissolve,
    zoom: labels.transitionZoom,
    fold: labels.transitionFold,
    cube: labels.transitionCube,
    none: labels.transitionNoneInstant,
  };
  const presetGroupLabelByEnglish: Record<string, string> = {
    Phones: labels.deviceGroupPhones,
    "Phones (Landscape)": labels.deviceGroupPhonesLandscape,
    Tablets: labels.deviceGroupTablets,
    "Tablets (Landscape)": labels.deviceGroupTabletsLandscape,
    Devices: labels.deviceGroupDevices,
    Standard: labels.deviceGroupStandard,
  };

  return (
    <>
      {/* Label */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.inspectorLabel}</span>
        <input
          type="text"
          value={data.label ?? ""}
          onChange={(e) => update({ label: e.target.value || undefined })}
          placeholder={labels.frameLabelPlaceholder}
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

      {/* Device preset */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.frameDevice}</span>
        <select
          value={data.devicePreset ?? ""}
          onChange={(e) => onPresetChange(e.target.value)}
          style={{
            flex: 1,
            background: theme.controlBg,
            color: theme.text,
            border: "none",
            borderRadius: theme.controlBorderRadius,
            padding: "4px 6px",
            fontSize: 11,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="">{labels.frameFreeform}</option>
          {groupedPresets.map((group) => (
            <optgroup key={group.label} label={presetGroupLabelByEnglish[group.label] ?? group.label}>
              {group.presets.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label} ({p.w}×{p.h})
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Background color */}
      <PaletteColorPicker
        label={labels.inspectorBackground}
        palettes={STROKE_PALETTES}
        value={(() => {
          const bg = data.backgroundColor;
          if (!bg) return null;
          // Reverse the `${c}15` encoding — check all palettes
          for (const p of STROKE_PALETTES) {
            const match = p.colors.find((c) => bg === `${c}15`);
            if (match) return match;
          }
          // Fallback: strip trailing "15" suffix
          if (bg.length === 9 && bg.endsWith("15")) return bg.slice(0, 7);
          return null;
        })()}
        onChange={(c) => update({ backgroundColor: c ? `${c}15` : undefined })}
        allowNull
      />

      {/* Border color */}
      <PaletteColorPicker
        label={labels.inspectorBorder}
        palettes={STROKE_PALETTES}
        value={data.borderColor}
        onChange={(c) => update({ borderColor: c! })}
      />

      {/* Border style */}
      <StrokeStylePicker
        label={labels.inspectorStyle}
        value={data.borderStyle ?? "dashed"}
        onChange={(s) => update({ borderStyle: s })}
      />

      {/* Border width */}
      <WidthPicker
        label={labels.inspectorWidth}
        value={data.borderWidth ?? 1}
        onChange={(w) => update({ borderWidth: w })}
      />

      {/* Opacity */}
      <OpacitySlider
        value={data.opacity ?? 1}
        onChange={(o) => update({ opacity: o })}
      />

      {/* Slide order */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.frameSlideNumber}</span>
        <select
          value={data.slideOrder ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            update({ slideOrder: v ? parseInt(v, 10) : undefined });
          }}
          style={{
            width: 72,
            background: theme.controlBg,
            color: theme.text,
            border: "none",
            borderRadius: theme.controlBorderRadius,
            padding: "4px 6px",
            fontSize: 11,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="">{labels.frameAuto}</option>
          {slideOptions.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Slide transition */}
      <div style={rowStyle}>
        <span style={{ ...labelStyle, color: theme.textMuted }}>{labels.frameTransition}</span>
        <select
          value={data.transition ?? "pan"}
          onChange={(e) => {
            const v = e.target.value as SlideTransition;
            update({ transition: v === "pan" ? undefined : v, transitionDuration: undefined });
          }}
          style={{
            flex: 1,
            background: theme.controlBg,
            color: theme.text,
            border: "none",
            borderRadius: theme.controlBorderRadius,
            padding: "4px 6px",
            fontSize: 11,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="pan">{transitionLabelByKey.pan}</option>
          <option value="fade">{transitionLabelByKey.fade}</option>
          <option value="dissolve">{transitionLabelByKey.dissolve}</option>
          <option value="zoom">{transitionLabelByKey.zoom}</option>
          <option value="fold">{transitionLabelByKey.fold}</option>
          <option value="cube">{transitionLabelByKey.cube}</option>
          <option value="none">{transitionLabelByKey.none}</option>
        </select>
      </div>

      {/* Transition duration (hidden for "none") */}
      {(data.transition ?? "pan") !== "none" && (
        <DurationInput
          value={data.transitionDuration ?? TRANSITION_DEFAULTS[data.transition ?? "pan"]}
          onChange={(v) => update({ transitionDuration: v === TRANSITION_DEFAULTS[data.transition ?? "pan"] ? undefined : v })}
          theme={theme}
          durationLabel={labels.frameDuration}
          msLabel={labels.frameMilliseconds}
        />
      )}
    </>
  );
}
