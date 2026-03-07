import type { SpatialEngine } from "spatialboard";
import type { AnalogClockData } from "../nodes/analog-clock";
import type { DataCardData } from "../nodes/data-card";
import type { TimerData } from "../nodes/timer";
import type { SpinningCubeData } from "../nodes/spinning-cube";

/**
 * Populates an engine with a "Mars Rover Mission Control" demo board.
 * Showcases all built-in and custom node types.
 */
export function loadMissionControlBoard(engine: SpatialEngine): void {
  // Clear existing board
  engine.deleteNodes(Array.from(engine.nodes.keys()));

  let z = 1;

  // ── Background frame: full mission control ─────────────────
  engine.addNode({
    id: "frame-mission",
    type: "frame",
    x: 20,
    y: 20,
    w: 1760,
    h: 1060,
    z: z++,
    data: { label: "ARTEMIS — Mars Rover Mission Control", color: "#1e1e2e" },
  });

  // ── Title ──────────────────────────────────────────────────
  engine.addNode({
    id: "title",
    type: "text",
    x: 60,
    y: 50,
    w: 700,
    h: "auto",
    z: z++,
    data: {
      text: "ARTEMIS MISSION CONTROL",
      fontSize: 42,
      fontFamily: "sans-serif",
      color: "#e0e0e0",
      align: "left",
    },
  });

  engine.addNode({
    id: "subtitle",
    type: "text",
    x: 60,
    y: 100,
    w: 500,
    h: "auto",
    z: z++,
    data: {
      text: "Sol 847 · Jezero Crater · Active",
      fontSize: 16,
      fontFamily: "sans-serif",
      color: "#6366f1",
      align: "left",
    },
  });

  // ── Status indicator shape ─────────────────────────────────
  engine.addNode({
    id: "status-dot",
    type: "shape",
    x: 42,
    y: 56,
    w: 12,
    h: 12,
    z: z++,
    data: {
      shape: "ellipse",
      fill: "#22c55e",
      stroke: "#22c55e",
      strokeWidth: 0,
      roughness: 0,
    },
  });

  // ══════════════════════════════════════════════════════════════
  // SECTION: World Clocks
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-clocks",
    type: "frame",
    x: 60,
    y: 150,
    w: 760,
    h: 270,
    z: z++,
    data: { label: "Ground Station Clocks", color: "#312e81" },
  });

  const clocks: { id: string; label: string; offset: number; accent: string; x: number }[] = [
    { id: "clock-houston", label: "Houston", offset: -6, accent: "#3b82f6", x: 80 },
    { id: "clock-moscow", label: "Moscow", offset: 3, accent: "#ef4444", x: 270 },
    { id: "clock-canberra", label: "Canberra", offset: 11, accent: "#22c55e", x: 460 },
    { id: "clock-tokyo", label: "Tokyo", offset: 9, accent: "#f97316", x: 650 },
  ];

  for (const c of clocks) {
    engine.addNode({
      id: c.id,
      type: "analog-clock",
      x: c.x,
      y: 190,
      w: 160,
      h: 210,
      z: z++,
      data: {
        utcOffset: c.offset,
        label: c.label,
        accentColor: c.accent,
      } satisfies AnalogClockData,
    });
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION: Telemetry
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-telemetry",
    type: "frame",
    x: 60,
    y: 450,
    w: 760,
    h: 310,
    z: z++,
    data: { label: "Rover Telemetry", color: "#1e3a2e" },
  });

  const telemetryCards: {
    id: string;
    title: string;
    fields: DataCardData["fields"];
    accent: string;
    x: number;
    y: number;
  }[] = [
    {
      id: "card-power",
      title: "Power Systems",
      accent: "#f59e0b",
      x: 80,
      y: 490,
      fields: [
        { key: "Battery", value: "87%" },
        { key: "Solar Input", value: "412W" },
        { key: "Draw", value: "289W" },
        { key: "RTG Temp", value: "42.1°C" },
      ],
    },
    {
      id: "card-nav",
      title: "Navigation",
      accent: "#3b82f6",
      x: 320,
      y: 490,
      fields: [
        { key: "Lat", value: "18.4446°N" },
        { key: "Lon", value: "77.4509°E" },
        { key: "Heading", value: "247°" },
        { key: "Odometer", value: "14.82 km" },
      ],
    },
    {
      id: "card-env",
      title: "Environment",
      accent: "#ef4444",
      x: 560,
      y: 490,
      fields: [
        { key: "Air Temp", value: "-63°C" },
        { key: "Ground", value: "-41°C" },
        { key: "Wind", value: "12 m/s NW" },
        { key: "Pressure", value: "636 Pa" },
      ],
    },
  ];

  for (const card of telemetryCards) {
    engine.addNode({
      id: card.id,
      type: "data-card",
      x: card.x,
      y: card.y,
      w: 220,
      h: "auto",
      z: z++,
      data: {
        title: card.title,
        fields: card.fields,
        accentColor: card.accent,
        lastUpdated: Date.now(),
      } satisfies DataCardData,
    });
  }

  // ══════════════════════════════════════════════════════════════
  // SECTION: Mission Timers
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-timers",
    type: "frame",
    x: 860,
    y: 150,
    w: 400,
    h: 270,
    z: z++,
    data: { label: "Mission Timers", color: "#3b1e1e" },
  });

  engine.addNode({
    id: "timer-mission",
    type: "timer",
    x: 880,
    y: 190,
    w: 170,
    h: "auto",
    z: z++,
    data: {
      mode: "stopwatch",
      targetSeconds: 0,
      elapsed: 73180800, // ~847 sols in seconds (approximate)
      running: true,
      accentColor: "#3b82f6",
    } satisfies TimerData,
  });

  engine.addNode({
    id: "timer-comms",
    type: "timer",
    x: 1070,
    y: 190,
    w: 170,
    h: "auto",
    z: z++,
    data: {
      mode: "countdown",
      targetSeconds: 2340,
      elapsed: 0,
      running: true,
      accentColor: "#10b981",
    } satisfies TimerData,
  });

  engine.addNode({
    id: "label-mission-timer",
    type: "text",
    x: 890,
    y: 370,
    w: 150,
    h: "auto",
    z: z++,
    data: {
      text: "Mission Elapsed",
      fontSize: 11,
      fontFamily: "sans-serif",
      color: "#888",
      align: "center",
    },
  });

  engine.addNode({
    id: "label-comms-timer",
    type: "text",
    x: 1080,
    y: 370,
    w: 150,
    h: "auto",
    z: z++,
    data: {
      text: "Next Comm Window",
      fontSize: 11,
      fontFamily: "sans-serif",
      color: "#888",
      align: "center",
    },
  });

  // ══════════════════════════════════════════════════════════════
  // SECTION: 3D Orientation
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-3d",
    type: "frame",
    x: 860,
    y: 450,
    w: 400,
    h: 310,
    z: z++,
    data: { label: "Rover Orientation", color: "#1e2a3e" },
  });

  engine.addNode({
    id: "cube-orientation",
    type: "spinning-cube",
    x: 930,
    y: 490,
    w: 250,
    h: 240,
    z: z++,
    data: {
      speed: 0.3,
      palette: "neon",
      strokeWidth: 2.5,
      spinning: true,
    } satisfies SpinningCubeData,
  });

  // ══════════════════════════════════════════════════════════════
  // SECTION: Right sidebar — Comms & Notes
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-comms",
    type: "frame",
    x: 1300,
    y: 150,
    w: 450,
    h: 610,
    z: z++,
    data: { label: "Comm Log & Notes", color: "#2e1e3e" },
  });

  engine.addNode({
    id: "card-comms",
    type: "data-card",
    x: 1320,
    y: 190,
    w: 220,
    h: "auto",
    z: z++,
    data: {
      title: "Signal Status",
      fields: [
        { key: "DSN", value: "Goldstone" },
        { key: "Band", value: "X-band" },
        { key: "Signal", value: "-142 dBm" },
        { key: "Latency", value: "11m 23s" },
        { key: "Uplink", value: "2 kbps" },
        { key: "Downlink", value: "256 kbps" },
      ],
      accentColor: "#8b5cf6",
      lastUpdated: Date.now(),
    } satisfies DataCardData,
  });

  // Sticky notes for mission notes
  engine.addNode({
    id: "sticky-drill",
    type: "sticky",
    x: 1320,
    y: 460,
    w: 200,
    h: 130,
    z: z++,
    rotation: -2,
    data: {
      text: "Sample tube #24 sealed. Drill bit wear at 67% — schedule replacement before Sol 860.",
      color: "#FEF3C7",
    },
  });

  engine.addNode({
    id: "sticky-weather",
    type: "sticky",
    x: 1540,
    y: 190,
    w: 190,
    h: 120,
    z: z++,
    rotation: 3,
    data: {
      text: "Dust storm forming in Isidis Basin. May reach Jezero by Sol 852. Monitor closely!",
      color: "#FECACA",
    },
  });

  engine.addNode({
    id: "sticky-photo",
    type: "sticky",
    x: 1540,
    y: 340,
    w: 190,
    h: 110,
    z: z++,
    rotation: -1,
    data: {
      text: "Panorama capture queued for next sunrise. MastCam-Z 360° sweep.",
      color: "#BBF7D0",
    },
  });

  engine.addNode({
    id: "sticky-team",
    type: "sticky",
    x: 1540,
    y: 480,
    w: 190,
    h: 120,
    z: z++,
    rotation: 2,
    data: {
      text: "Shift handoff at 14:00 UTC. Garcia → Tanaka. Brief on autonomous nav route.",
      color: "#BFDBFE",
    },
  });

  // ══════════════════════════════════════════════════════════════
  // SECTION: Bottom bar — mission briefing
  // ══════════════════════════════════════════════════════════════

  engine.addNode({
    id: "frame-briefing",
    type: "frame",
    x: 60,
    y: 790,
    w: 1200,
    h: 260,
    z: z++,
    data: { label: "Today's Mission Plan", color: "#1e2e1e" },
  });

  engine.addNode({
    id: "plan-1",
    type: "shape",
    x: 100,
    y: 840,
    w: 200,
    h: 60,
    z: z++,
    data: {
      shape: "rect",
      fill: "#1e3a5e",
      stroke: "#3b82f6",
      strokeWidth: 2,
      roughness: 0,
    },
  });
  engine.addNode({
    id: "plan-1-label",
    type: "text",
    x: 110,
    y: 855,
    w: 180,
    h: "auto",
    z: z++,
    data: { text: "Wake & Systems Check", fontSize: 13, fontFamily: "sans-serif", color: "#93c5fd", align: "center" },
  });

  engine.addNode({
    id: "plan-2",
    type: "shape",
    x: 360,
    y: 840,
    w: 200,
    h: 60,
    z: z++,
    data: {
      shape: "rect",
      fill: "#1e3a2e",
      stroke: "#22c55e",
      strokeWidth: 2,
      roughness: 0,
    },
  });
  engine.addNode({
    id: "plan-2-label",
    type: "text",
    x: 370,
    y: 855,
    w: 180,
    h: "auto",
    z: z++,
    data: { text: "Drive to Waypoint 7", fontSize: 13, fontFamily: "sans-serif", color: "#86efac", align: "center" },
  });

  engine.addNode({
    id: "plan-3",
    type: "shape",
    x: 620,
    y: 840,
    w: 200,
    h: 60,
    z: z++,
    data: {
      shape: "rect",
      fill: "#3a2e1e",
      stroke: "#f59e0b",
      strokeWidth: 2,
      roughness: 0,
    },
  });
  engine.addNode({
    id: "plan-3-label",
    type: "text",
    x: 630,
    y: 855,
    w: 180,
    h: "auto",
    z: z++,
    data: { text: "Rock Abrasion & Sample", fontSize: 13, fontFamily: "sans-serif", color: "#fcd34d", align: "center" },
  });

  engine.addNode({
    id: "plan-4",
    type: "shape",
    x: 880,
    y: 840,
    w: 200,
    h: 60,
    z: z++,
    data: {
      shape: "rect",
      fill: "#2e1e3a",
      stroke: "#a78bfa",
      strokeWidth: 2,
      roughness: 0,
    },
  });
  engine.addNode({
    id: "plan-4-label",
    type: "text",
    x: 890,
    y: 855,
    w: 180,
    h: "auto",
    z: z++,
    data: { text: "Data Downlink & Sleep", fontSize: 13, fontFamily: "sans-serif", color: "#c4b5fd", align: "center" },
  });

  // Arrows connecting plan steps
  engine.addNode({
    id: "e-plan-1-2",
    type: "edge",
    x: 0, y: 0, w: 0, h: 0, z: z++,
    data: {
      fromId: "plan-1",
      toId: "plan-2",
      style: "solid",
      color: "#555",
      strokeWidth: 2,
      arrowHead: "arrow",
      edgeType: "straight",
      sourceHandle: "right",
      targetHandle: "left",
    },
  });

  engine.addNode({
    id: "e-plan-2-3",
    type: "edge",
    x: 0, y: 0, w: 0, h: 0, z: z++,
    data: {
      fromId: "plan-2",
      toId: "plan-3",
      style: "solid",
      color: "#555",
      strokeWidth: 2,
      arrowHead: "arrow",
      edgeType: "straight",
      sourceHandle: "right",
      targetHandle: "left",
    },
  });

  engine.addNode({
    id: "e-plan-3-4",
    type: "edge",
    x: 0, y: 0, w: 0, h: 0, z: z++,
    data: {
      fromId: "plan-3",
      toId: "plan-4",
      style: "solid",
      color: "#555",
      strokeWidth: 2,
      arrowHead: "arrow",
      edgeType: "straight",
      sourceHandle: "right",
      targetHandle: "left",
    },
  });

  // Time labels under the plan steps
  engine.addNode({
    id: "time-1",
    type: "text",
    x: 130, y: 910, w: 140, h: "auto", z: z++,
    data: { text: "06:00 LMST", fontSize: 10, fontFamily: "sans-serif", color: "#666", align: "center" },
  });
  engine.addNode({
    id: "time-2",
    type: "text",
    x: 390, y: 910, w: 140, h: "auto", z: z++,
    data: { text: "08:30 LMST", fontSize: 10, fontFamily: "sans-serif", color: "#666", align: "center" },
  });
  engine.addNode({
    id: "time-3",
    type: "text",
    x: 650, y: 910, w: 140, h: "auto", z: z++,
    data: { text: "12:00 LMST", fontSize: 10, fontFamily: "sans-serif", color: "#666", align: "center" },
  });
  engine.addNode({
    id: "time-4",
    type: "text",
    x: 910, y: 910, w: 140, h: "auto", z: z++,
    data: { text: "16:00 LMST", fontSize: 10, fontFamily: "sans-serif", color: "#666", align: "center" },
  });

  // Progress bar shape under plan
  engine.addNode({
    id: "progress-bg",
    type: "shape",
    x: 100,
    y: 950,
    w: 980,
    h: 8,
    z: z++,
    data: {
      shape: "rect",
      fill: "#1e1e2e",
      stroke: "transparent",
      strokeWidth: 0,
      roughness: 0,
    },
  });

  engine.addNode({
    id: "progress-fill",
    type: "shape",
    x: 100,
    y: 950,
    w: 540,
    h: 8,
    z: z++,
    data: {
      shape: "rect",
      fill: "#22c55e",
      stroke: "transparent",
      strokeWidth: 0,
      roughness: 0,
    },
  });

  engine.addNode({
    id: "progress-label",
    type: "text",
    x: 1090,
    y: 943,
    w: 80,
    h: "auto",
    z: z++,
    data: { text: "55%", fontSize: 12, fontFamily: "sans-serif", color: "#22c55e", align: "left" },
  });

  // ── Edge: Signal status → comms timer ─────────────────────
  engine.addNode({
    id: "e-comms-timer",
    type: "edge",
    x: 0, y: 0, w: 0, h: 0, z: z++,
    data: {
      fromId: "card-comms",
      toId: "timer-comms",
      style: "dashed",
      color: "#8b5cf6",
      strokeWidth: 1,
      arrowHead: "arrow",
      edgeType: "bezier",
      sourceHandle: "left",
      targetHandle: "right",
    },
  });

  // ── Edge: Power → Nav (shared power bus) ──────────────────
  engine.addNode({
    id: "e-power-nav",
    type: "edge",
    x: 0, y: 0, w: 0, h: 0, z: z++,
    data: {
      fromId: "card-power",
      toId: "card-nav",
      style: "dashed",
      color: "#f59e0b40",
      strokeWidth: 1,
      arrowHead: "arrow",
      edgeType: "bezier",
      sourceHandle: "right",
      targetHandle: "left",
    },
  });
}
