import { useEffect, useMemo, useState } from "react";
import { spatialPerf, type PerfSnapshot } from "../perf/spatial-perf";
import { useSBTheme } from "./sidebar/ThemeContext";
import { useSBI18n } from "./LocalizationContext";

function fmt(ms: number): string {
  return `${ms.toFixed(2)} ms`;
}

function row(label: string, value: string): { label: string; value: string } {
  return { label, value };
}

export default function PerformanceOverlay() {
  const theme = useSBTheme();
  const { labels } = useSBI18n();
  const [snapshot, setSnapshot] = useState<PerfSnapshot>(() => spatialPerf.getSnapshot());

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      spatialPerf.tick(now);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const unsub = spatialPerf.subscribe(() => setSnapshot(spatialPerf.getSnapshot()));
    return () => {
      cancelAnimationFrame(raf);
      unsub();
    };
  }, []);

  const rows = useMemo(
    () => [
      row(labels.perfVirtualization, snapshot.virtualizationActive ? labels.perfOn : labels.perfOff),
      row(labels.perfFps, snapshot.fps.toFixed(1)),
      row(labels.perfFrameP50P95, `${fmt(snapshot.frameMsP50)} / ${fmt(snapshot.frameMsP95)}`),
      row(labels.perfCullingP50P95, `${fmt(snapshot.cullingMsP50)} / ${fmt(snapshot.cullingMsP95)}`),
      row(labels.perfHitTestP50P95, `${fmt(snapshot.hitTestMsP50)} / ${fmt(snapshot.hitTestMsP95)}`),
      row(labels.perfEdgeHitP50P95, `${fmt(snapshot.edgeHitMsP50)} / ${fmt(snapshot.edgeHitMsP95)}`),
      row(labels.perfHitTestCalls, snapshot.hitTestCallsPerSec.toFixed(1)),
      row(labels.perfEdgeHitCalls, snapshot.edgeHitCallsPerSec.toFixed(1)),
      row(labels.perfVisibleNodes, `${snapshot.visibleNodes} / ${snapshot.totalNodes}`),
      row(labels.perfVisibleEdges, `${snapshot.visibleEdges} / ${snapshot.totalEdges}`),
      row(labels.perfSeedVisibleNodes, String(snapshot.seedVisibleNodes)),
      row(labels.perfNodesAdjacency, String(snapshot.nodesAddedByAdjacency)),
      row(labels.perfNodesEdgeEndpoints, String(snapshot.nodesAddedByEdgeEndpoints)),
      row(labels.perfEdgesAdjacency, String(snapshot.edgesAddedByAdjacency)),
      row(labels.perfEdgesCrossing, String(snapshot.edgesAddedByCrossing)),
    ],
    [snapshot, labels],
  );

  return (
    <div
      style={{
        position: "absolute",
        right: 12,
        bottom: 56,
        width: 280,
        borderRadius: theme.panelBorderRadius,
        border: `1px solid ${theme.border}`,
        background: theme.panelBg,
        boxShadow: theme.panelShadow,
        color: theme.text,
        zIndex: 10000,
        pointerEvents: "none",
        fontSize: 11,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        lineHeight: 1.35,
      }}
    >
      <div
        style={{
          padding: "8px 10px",
          borderBottom: `1px solid ${theme.separator}`,
          fontWeight: 700,
          letterSpacing: 0.2,
        }}
      >
        {labels.performanceTitle}
      </div>
      <div style={{ padding: "8px 10px", display: "grid", rowGap: 4 }}>
        {rows.map((r) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <span style={{ color: theme.textMuted }}>{r.label}</span>
            <span>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
