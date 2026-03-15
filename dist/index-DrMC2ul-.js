var xl = Object.defineProperty;
var wl = (t, e, o) => e in t ? xl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var yt = (t, e, o) => wl(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as kl, defaultBlockSpecs as vl, BlockNoteEditor as Sl } from "@blocknote/core";
import { jsxs as k, jsx as h, Fragment as mt } from "react/jsx-runtime";
import Ml, { memo as xe, useRef as ct, useState as $, useEffect as bt, useCallback as at, Component as Cl, useMemo as Kt, useLayoutEffect as Zr, useContext as gr, createContext as es, Suspense as Il, lazy as zl } from "react";
import { useCreateBlockNote as Tl } from "@blocknote/react";
import { BlockNoteView as Pl } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as Ve, flushSync as Al } from "react-dom";
const El = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let zt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += El[o[t] & 63];
  return e;
};
const Rl = {
  id: "kanban",
  label: "Kanban Board",
  nodes: [
    // Column frames
    { id: "kf1", type: "frame", x: 0, y: 0, w: 300, h: 500, z: 0, data: { label: "To Do", backgroundColor: "#ef444415", borderColor: "#ef4444", borderWidth: 2, borderStyle: "solid" } },
    { id: "kf2", type: "frame", x: 330, y: 0, w: 300, h: 500, z: 0, data: { label: "In Progress", backgroundColor: "#f59e0b15", borderColor: "#f59e0b", borderWidth: 2, borderStyle: "solid" } },
    { id: "kf3", type: "frame", x: 660, y: 0, w: 300, h: 500, z: 0, data: { label: "Done", backgroundColor: "#22c55e15", borderColor: "#22c55e", borderWidth: 2, borderStyle: "solid" } },
    // To Do stickies
    { id: "ks1", type: "sticky", x: 30, y: 40, w: 240, h: 80, z: 1, data: { text: "Task 1", color: "#fecaca", fontSize: 14 } },
    { id: "ks2", type: "sticky", x: 30, y: 140, w: 240, h: 80, z: 1, data: { text: "Task 2", color: "#fecaca", fontSize: 14 } },
    { id: "ks3", type: "sticky", x: 30, y: 240, w: 240, h: 80, z: 1, data: { text: "Task 3", color: "#fecaca", fontSize: 14 } },
    // In Progress stickies
    { id: "ks4", type: "sticky", x: 360, y: 40, w: 240, h: 80, z: 1, data: { text: "Task 4", color: "#fed7aa", fontSize: 14 } },
    { id: "ks5", type: "sticky", x: 360, y: 140, w: 240, h: 80, z: 1, data: { text: "Task 5", color: "#fed7aa", fontSize: 14 } },
    // Done stickies
    { id: "ks6", type: "sticky", x: 690, y: 40, w: 240, h: 80, z: 1, data: { text: "Task 6", color: "#bbf7d0", fontSize: 14 } }
  ]
}, Ll = {
  id: "mind-map",
  label: "Mind Map",
  nodes: [
    // Central topic
    { id: "c0", type: "shape", x: 250, y: 200, w: 200, h: 80, z: 0, data: { shape: "ellipse", stroke: "#6366f1", strokeWidth: 2, roughness: 0, fill: "#eef2ff", fillStyle: "solid", label: "Main Topic" } },
    // Branch topics
    { id: "c1", type: "shape", x: 0, y: 0, w: 160, h: 60, z: 1, data: { shape: "rect", stroke: "#ec4899", strokeWidth: 2, roughness: 0, fill: "#fdf2f8", fillStyle: "solid", label: "Idea 1" } },
    { id: "c2", type: "shape", x: 540, y: 0, w: 160, h: 60, z: 1, data: { shape: "rect", stroke: "#f59e0b", strokeWidth: 2, roughness: 0, fill: "#fffbeb", fillStyle: "solid", label: "Idea 2" } },
    { id: "c3", type: "shape", x: 0, y: 400, w: 160, h: 60, z: 1, data: { shape: "rect", stroke: "#22c55e", strokeWidth: 2, roughness: 0, fill: "#f0fdf4", fillStyle: "solid", label: "Idea 3" } },
    { id: "c4", type: "shape", x: 540, y: 400, w: 160, h: 60, z: 1, data: { shape: "rect", stroke: "#3b82f6", strokeWidth: 2, roughness: 0, fill: "#eff6ff", fillStyle: "solid", label: "Idea 4" } },
    // Edges from center to branches
    { id: "e1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 2, data: { fromId: "c0", toId: "c1", style: "solid", color: "#ec4899", strokeWidth: 2, arrowHead: "filled", edgeType: "bezier" } },
    { id: "e2", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 2, data: { fromId: "c0", toId: "c2", style: "solid", color: "#f59e0b", strokeWidth: 2, arrowHead: "filled", edgeType: "bezier" } },
    { id: "e3", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 2, data: { fromId: "c0", toId: "c3", style: "solid", color: "#22c55e", strokeWidth: 2, arrowHead: "filled", edgeType: "bezier" } },
    { id: "e4", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 2, data: { fromId: "c0", toId: "c4", style: "solid", color: "#3b82f6", strokeWidth: 2, arrowHead: "filled", edgeType: "bezier" } }
  ]
}, Dl = {
  id: "flowchart",
  label: "Flowchart",
  nodes: [
    // Start (ellipse)
    { id: "fc0", type: "shape", x: 200, y: 0, w: 160, h: 60, z: 0, data: { shape: "ellipse", stroke: "#22c55e", strokeWidth: 2, roughness: 0, fill: "#f0fdf4", fillStyle: "solid", label: "Start" } },
    // Process 1
    { id: "fc1", type: "shape", x: 200, y: 120, w: 160, h: 60, z: 0, data: { shape: "rect", stroke: "#3b82f6", strokeWidth: 2, roughness: 0, fill: "#eff6ff", fillStyle: "solid", label: "Process" } },
    // Decision (diamond)
    { id: "fc2", type: "shape", x: 180, y: 250, w: 200, h: 100, z: 0, data: { shape: "diamond", stroke: "#f59e0b", strokeWidth: 2, roughness: 0, fill: "#fffbeb", fillStyle: "solid", label: "Decision?" } },
    // Yes branch
    { id: "fc3", type: "shape", x: 200, y: 420, w: 160, h: 60, z: 0, data: { shape: "rect", stroke: "#3b82f6", strokeWidth: 2, roughness: 0, fill: "#eff6ff", fillStyle: "solid", label: "Action A" } },
    // No branch
    { id: "fc4", type: "shape", x: 480, y: 270, w: 160, h: 60, z: 0, data: { shape: "rect", stroke: "#3b82f6", strokeWidth: 2, roughness: 0, fill: "#eff6ff", fillStyle: "solid", label: "Action B" } },
    // End
    { id: "fc5", type: "shape", x: 200, y: 540, w: 160, h: 60, z: 0, data: { shape: "ellipse", stroke: "#ef4444", strokeWidth: 2, roughness: 0, fill: "#fef2f2", fillStyle: "solid", label: "End" } },
    // Edges
    { id: "fe1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "fc0", toId: "fc1", style: "solid", color: "#666666", strokeWidth: 2, arrowHead: "filled" } },
    { id: "fe2", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "fc1", toId: "fc2", style: "solid", color: "#666666", strokeWidth: 2, arrowHead: "filled" } },
    { id: "fe3", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "fc2", toId: "fc3", style: "solid", color: "#22c55e", strokeWidth: 2, arrowHead: "filled", label: "Yes", sourceHandle: "bottom" } },
    { id: "fe4", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "fc2", toId: "fc4", style: "solid", color: "#ef4444", strokeWidth: 2, arrowHead: "filled", label: "No", sourceHandle: "right" } },
    { id: "fe5", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "fc3", toId: "fc5", style: "solid", color: "#666666", strokeWidth: 2, arrowHead: "filled" } },
    { id: "fe6", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "fc4", toId: "fc5", style: "solid", color: "#666666", strokeWidth: 2, arrowHead: "filled" } }
  ]
}, Wl = {
  id: "swot",
  label: "SWOT Analysis",
  nodes: [
    // Quadrant frames
    { id: "sf1", type: "frame", x: 0, y: 0, w: 300, h: 300, z: 0, data: { label: "Strengths", backgroundColor: "#22c55e15", borderColor: "#22c55e", borderWidth: 2, borderStyle: "solid" } },
    { id: "sf2", type: "frame", x: 330, y: 0, w: 300, h: 300, z: 0, data: { label: "Weaknesses", backgroundColor: "#ef444415", borderColor: "#ef4444", borderWidth: 2, borderStyle: "solid" } },
    { id: "sf3", type: "frame", x: 0, y: 330, w: 300, h: 300, z: 0, data: { label: "Opportunities", backgroundColor: "#3b82f615", borderColor: "#3b82f6", borderWidth: 2, borderStyle: "solid" } },
    { id: "sf4", type: "frame", x: 330, y: 330, w: 300, h: 300, z: 0, data: { label: "Threats", backgroundColor: "#f59e0b15", borderColor: "#f59e0b", borderWidth: 2, borderStyle: "solid" } },
    // Placeholder stickies
    { id: "ss1", type: "sticky", x: 30, y: 40, w: 240, h: 80, z: 1, data: { text: "Add strength...", color: "#bbf7d0", fontSize: 14 } },
    { id: "ss2", type: "sticky", x: 360, y: 40, w: 240, h: 80, z: 1, data: { text: "Add weakness...", color: "#fecaca", fontSize: 14 } },
    { id: "ss3", type: "sticky", x: 30, y: 370, w: 240, h: 80, z: 1, data: { text: "Add opportunity...", color: "#bfdbfe", fontSize: 14 } },
    { id: "ss4", type: "sticky", x: 360, y: 370, w: 240, h: 80, z: 1, data: { text: "Add threat...", color: "#fed7aa", fontSize: 14 } }
  ]
}, Bl = {
  id: "retrospective",
  label: "Retrospective",
  nodes: [
    // Column frames
    { id: "rf1", type: "frame", x: 0, y: 0, w: 300, h: 500, z: 0, data: { label: "What went well", backgroundColor: "#22c55e15", borderColor: "#22c55e", borderWidth: 2, borderStyle: "solid" } },
    { id: "rf2", type: "frame", x: 330, y: 0, w: 300, h: 500, z: 0, data: { label: "What didn't go well", backgroundColor: "#ef444415", borderColor: "#ef4444", borderWidth: 2, borderStyle: "solid" } },
    { id: "rf3", type: "frame", x: 660, y: 0, w: 300, h: 500, z: 0, data: { label: "Action items", backgroundColor: "#3b82f615", borderColor: "#3b82f6", borderWidth: 2, borderStyle: "solid" } },
    // Stickies
    { id: "rs1", type: "sticky", x: 30, y: 40, w: 240, h: 80, z: 1, data: { text: "Good thing 1", color: "#bbf7d0", fontSize: 14 } },
    { id: "rs2", type: "sticky", x: 30, y: 140, w: 240, h: 80, z: 1, data: { text: "Good thing 2", color: "#bbf7d0", fontSize: 14 } },
    { id: "rs3", type: "sticky", x: 360, y: 40, w: 240, h: 80, z: 1, data: { text: "Issue 1", color: "#fecaca", fontSize: 14 } },
    { id: "rs4", type: "sticky", x: 360, y: 140, w: 240, h: 80, z: 1, data: { text: "Issue 2", color: "#fecaca", fontSize: 14 } },
    { id: "rs5", type: "sticky", x: 690, y: 40, w: 240, h: 80, z: 1, data: { text: "Action 1", color: "#bfdbfe", fontSize: 14 } },
    { id: "rs6", type: "sticky", x: 690, y: 140, w: 240, h: 80, z: 1, data: { text: "Action 2", color: "#bfdbfe", fontSize: 14 } }
  ]
}, Fl = {
  id: "weekly-planner",
  label: "Weekly Planner",
  nodes: [
    // Day frames
    { id: "wf1", type: "frame", x: 0, y: 0, w: 170, h: 400, z: 0, data: { label: "Monday", backgroundColor: "#6366f115", borderColor: "#6366f1", borderWidth: 1, borderStyle: "solid" } },
    { id: "wf2", type: "frame", x: 180, y: 0, w: 170, h: 400, z: 0, data: { label: "Tuesday", backgroundColor: "#8b5cf615", borderColor: "#8b5cf6", borderWidth: 1, borderStyle: "solid" } },
    { id: "wf3", type: "frame", x: 360, y: 0, w: 170, h: 400, z: 0, data: { label: "Wednesday", backgroundColor: "#ec489915", borderColor: "#ec4899", borderWidth: 1, borderStyle: "solid" } },
    { id: "wf4", type: "frame", x: 540, y: 0, w: 170, h: 400, z: 0, data: { label: "Thursday", backgroundColor: "#f59e0b15", borderColor: "#f59e0b", borderWidth: 1, borderStyle: "solid" } },
    { id: "wf5", type: "frame", x: 720, y: 0, w: 170, h: 400, z: 0, data: { label: "Friday", backgroundColor: "#22c55e15", borderColor: "#22c55e", borderWidth: 1, borderStyle: "solid" } },
    { id: "wf6", type: "frame", x: 900, y: 0, w: 170, h: 400, z: 0, data: { label: "Saturday", backgroundColor: "#3b82f615", borderColor: "#3b82f6", borderWidth: 1, borderStyle: "solid" } },
    { id: "wf7", type: "frame", x: 1080, y: 0, w: 170, h: 400, z: 0, data: { label: "Sunday", backgroundColor: "#ef444415", borderColor: "#ef4444", borderWidth: 1, borderStyle: "solid" } },
    // Placeholder stickies
    { id: "ws1", type: "sticky", x: 10, y: 40, w: 150, h: 60, z: 1, data: { text: "Task", color: "#e0e7ff", fontSize: 12 } },
    { id: "ws2", type: "sticky", x: 190, y: 40, w: 150, h: 60, z: 1, data: { text: "Task", color: "#ede9fe", fontSize: 12 } }
  ]
}, Nl = {
  id: "pros-cons",
  label: "Pros & Cons",
  nodes: [
    // Column frames
    { id: "pf1", type: "frame", x: 0, y: 0, w: 300, h: 450, z: 0, data: { label: "Pros", backgroundColor: "#22c55e15", borderColor: "#22c55e", borderWidth: 2, borderStyle: "solid" } },
    { id: "pf2", type: "frame", x: 330, y: 0, w: 300, h: 450, z: 0, data: { label: "Cons", backgroundColor: "#ef444415", borderColor: "#ef4444", borderWidth: 2, borderStyle: "solid" } },
    // Stickies
    { id: "ps1", type: "sticky", x: 30, y: 40, w: 240, h: 80, z: 1, data: { text: "Pro 1", color: "#bbf7d0", fontSize: 14 } },
    { id: "ps2", type: "sticky", x: 30, y: 140, w: 240, h: 80, z: 1, data: { text: "Pro 2", color: "#bbf7d0", fontSize: 14 } },
    { id: "ps3", type: "sticky", x: 360, y: 40, w: 240, h: 80, z: 1, data: { text: "Con 1", color: "#fecaca", fontSize: 14 } },
    { id: "ps4", type: "sticky", x: 360, y: 140, w: 240, h: 80, z: 1, data: { text: "Con 2", color: "#fecaca", fontSize: 14 } }
  ]
}, Hl = {
  id: "eisenhower",
  label: "Eisenhower Matrix",
  nodes: [
    // Quadrant frames
    { id: "ef1", type: "frame", x: 0, y: 0, w: 300, h: 300, z: 0, data: { label: "Do First (Urgent + Important)", backgroundColor: "#ef444415", borderColor: "#ef4444", borderWidth: 2, borderStyle: "solid" } },
    { id: "ef2", type: "frame", x: 330, y: 0, w: 300, h: 300, z: 0, data: { label: "Schedule (Important)", backgroundColor: "#3b82f615", borderColor: "#3b82f6", borderWidth: 2, borderStyle: "solid" } },
    { id: "ef3", type: "frame", x: 0, y: 330, w: 300, h: 300, z: 0, data: { label: "Delegate (Urgent)", backgroundColor: "#f59e0b15", borderColor: "#f59e0b", borderWidth: 2, borderStyle: "solid" } },
    { id: "ef4", type: "frame", x: 330, y: 330, w: 300, h: 300, z: 0, data: { label: "Eliminate", backgroundColor: "#6b728015", borderColor: "#6b7280", borderWidth: 2, borderStyle: "solid" } },
    // Stickies
    { id: "es1", type: "sticky", x: 30, y: 40, w: 240, h: 80, z: 1, data: { text: "Critical task...", color: "#fecaca", fontSize: 14 } },
    { id: "es2", type: "sticky", x: 360, y: 40, w: 240, h: 80, z: 1, data: { text: "Plan for later...", color: "#bfdbfe", fontSize: 14 } },
    { id: "es3", type: "sticky", x: 30, y: 370, w: 240, h: 80, z: 1, data: { text: "Hand off...", color: "#fed7aa", fontSize: 14 } },
    { id: "es4", type: "sticky", x: 360, y: 370, w: 240, h: 80, z: 1, data: { text: "Drop this...", color: "#e5e7eb", fontSize: 14 } }
  ]
}, Ol = {
  id: "org-chart",
  label: "Org Chart",
  nodes: [
    // Top level
    { id: "oc0", type: "shape", x: 250, y: 0, w: 160, h: 60, z: 0, data: { shape: "rect", stroke: "#6366f1", strokeWidth: 2, roughness: 0, fill: "#eef2ff", fillStyle: "solid", label: "CEO" } },
    // Second level
    { id: "oc1", type: "shape", x: 0, y: 140, w: 160, h: 60, z: 0, data: { shape: "rect", stroke: "#3b82f6", strokeWidth: 2, roughness: 0, fill: "#eff6ff", fillStyle: "solid", label: "Engineering" } },
    { id: "oc2", type: "shape", x: 250, y: 140, w: 160, h: 60, z: 0, data: { shape: "rect", stroke: "#22c55e", strokeWidth: 2, roughness: 0, fill: "#f0fdf4", fillStyle: "solid", label: "Product" } },
    { id: "oc3", type: "shape", x: 500, y: 140, w: 160, h: 60, z: 0, data: { shape: "rect", stroke: "#f59e0b", strokeWidth: 2, roughness: 0, fill: "#fffbeb", fillStyle: "solid", label: "Marketing" } },
    // Third level
    { id: "oc4", type: "shape", x: -60, y: 280, w: 140, h: 50, z: 0, data: { shape: "rect", stroke: "#94a3b8", strokeWidth: 1, roughness: 0, fill: "#f8fafc", fillStyle: "solid", label: "Frontend" } },
    { id: "oc5", type: "shape", x: 80, y: 280, w: 140, h: 50, z: 0, data: { shape: "rect", stroke: "#94a3b8", strokeWidth: 1, roughness: 0, fill: "#f8fafc", fillStyle: "solid", label: "Backend" } },
    { id: "oc6", type: "shape", x: 200, y: 280, w: 140, h: 50, z: 0, data: { shape: "rect", stroke: "#94a3b8", strokeWidth: 1, roughness: 0, fill: "#f8fafc", fillStyle: "solid", label: "Design" } },
    { id: "oc7", type: "shape", x: 360, y: 280, w: 140, h: 50, z: 0, data: { shape: "rect", stroke: "#94a3b8", strokeWidth: 1, roughness: 0, fill: "#f8fafc", fillStyle: "solid", label: "Research" } },
    { id: "oc8", type: "shape", x: 450, y: 280, w: 140, h: 50, z: 0, data: { shape: "rect", stroke: "#94a3b8", strokeWidth: 1, roughness: 0, fill: "#f8fafc", fillStyle: "solid", label: "Content" } },
    { id: "oc9", type: "shape", x: 590, y: 280, w: 140, h: 50, z: 0, data: { shape: "rect", stroke: "#94a3b8", strokeWidth: 1, roughness: 0, fill: "#f8fafc", fillStyle: "solid", label: "Growth" } },
    // Edges - top to second
    { id: "oe1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc0", toId: "oc1", style: "solid", color: "#94a3b8", strokeWidth: 2, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } },
    { id: "oe2", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc0", toId: "oc2", style: "solid", color: "#94a3b8", strokeWidth: 2, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } },
    { id: "oe3", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc0", toId: "oc3", style: "solid", color: "#94a3b8", strokeWidth: 2, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } },
    // Edges - second to third
    { id: "oe4", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc1", toId: "oc4", style: "solid", color: "#cbd5e1", strokeWidth: 1, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } },
    { id: "oe5", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc1", toId: "oc5", style: "solid", color: "#cbd5e1", strokeWidth: 1, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } },
    { id: "oe6", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc2", toId: "oc6", style: "solid", color: "#cbd5e1", strokeWidth: 1, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } },
    { id: "oe7", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc2", toId: "oc7", style: "solid", color: "#cbd5e1", strokeWidth: 1, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } },
    { id: "oe8", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc3", toId: "oc8", style: "solid", color: "#cbd5e1", strokeWidth: 1, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } },
    { id: "oe9", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "oc3", toId: "oc9", style: "solid", color: "#cbd5e1", strokeWidth: 1, arrowHead: "none", sourceHandle: "bottom", targetHandle: "top" } }
  ]
}, Xl = {
  id: "timeline",
  label: "Project Timeline",
  nodes: [
    // Phase shapes
    { id: "tl0", type: "shape", x: 0, y: 0, w: 180, h: 70, z: 0, data: { shape: "rect", stroke: "#6366f1", strokeWidth: 2, roughness: 0, fill: "#eef2ff", fillStyle: "solid", label: "Discovery" } },
    { id: "tl1", type: "shape", x: 230, y: 0, w: 180, h: 70, z: 0, data: { shape: "rect", stroke: "#3b82f6", strokeWidth: 2, roughness: 0, fill: "#eff6ff", fillStyle: "solid", label: "Design" } },
    { id: "tl2", type: "shape", x: 460, y: 0, w: 180, h: 70, z: 0, data: { shape: "rect", stroke: "#22c55e", strokeWidth: 2, roughness: 0, fill: "#f0fdf4", fillStyle: "solid", label: "Development" } },
    { id: "tl3", type: "shape", x: 690, y: 0, w: 180, h: 70, z: 0, data: { shape: "rect", stroke: "#f59e0b", strokeWidth: 2, roughness: 0, fill: "#fffbeb", fillStyle: "solid", label: "Testing" } },
    { id: "tl4", type: "shape", x: 920, y: 0, w: 180, h: 70, z: 0, data: { shape: "rect", stroke: "#ec4899", strokeWidth: 2, roughness: 0, fill: "#fdf2f8", fillStyle: "solid", label: "Launch" } },
    // Milestone diamonds below
    { id: "tl5", type: "shape", x: 185, y: 120, w: 40, h: 40, z: 0, data: { shape: "diamond", stroke: "#6366f1", strokeWidth: 2, roughness: 0, fill: "#6366f1", fillStyle: "solid" } },
    { id: "tl6", type: "shape", x: 415, y: 120, w: 40, h: 40, z: 0, data: { shape: "diamond", stroke: "#3b82f6", strokeWidth: 2, roughness: 0, fill: "#3b82f6", fillStyle: "solid" } },
    { id: "tl7", type: "shape", x: 645, y: 120, w: 40, h: 40, z: 0, data: { shape: "diamond", stroke: "#22c55e", strokeWidth: 2, roughness: 0, fill: "#22c55e", fillStyle: "solid" } },
    { id: "tl8", type: "shape", x: 875, y: 120, w: 40, h: 40, z: 0, data: { shape: "diamond", stroke: "#f59e0b", strokeWidth: 2, roughness: 0, fill: "#f59e0b", fillStyle: "solid" } },
    // Phase arrows
    { id: "te1", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "tl0", toId: "tl1", style: "solid", color: "#94a3b8", strokeWidth: 2, arrowHead: "filled", sourceHandle: "right", targetHandle: "left" } },
    { id: "te2", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "tl1", toId: "tl2", style: "solid", color: "#94a3b8", strokeWidth: 2, arrowHead: "filled", sourceHandle: "right", targetHandle: "left" } },
    { id: "te3", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "tl2", toId: "tl3", style: "solid", color: "#94a3b8", strokeWidth: 2, arrowHead: "filled", sourceHandle: "right", targetHandle: "left" } },
    { id: "te4", type: "edge", x: 0, y: 0, w: 0, h: 0, z: 1, data: { fromId: "tl3", toId: "tl4", style: "solid", color: "#94a3b8", strokeWidth: 2, arrowHead: "filled", sourceHandle: "right", targetHandle: "left" } },
    // Milestone labels
    { id: "tt1", type: "text", x: 155, y: 170, w: 100, h: "auto", z: 1, data: { text: "Kickoff", fontSize: 12, fontFamily: "sans-serif", color: "#6366f1", align: "center" } },
    { id: "tt2", type: "text", x: 385, y: 170, w: 100, h: "auto", z: 1, data: { text: "Specs Done", fontSize: 12, fontFamily: "sans-serif", color: "#3b82f6", align: "center" } },
    { id: "tt3", type: "text", x: 615, y: 170, w: 100, h: "auto", z: 1, data: { text: "Code Freeze", fontSize: 12, fontFamily: "sans-serif", color: "#22c55e", align: "center" } },
    { id: "tt4", type: "text", x: 845, y: 170, w: 100, h: "auto", z: 1, data: { text: "Sign-off", fontSize: 12, fontFamily: "sans-serif", color: "#f59e0b", align: "center" } }
  ]
}, Gl = {
  id: "bmc",
  label: "Business Model Canvas",
  nodes: [
    // Top row: 5 sections
    { id: "bf1", type: "frame", x: 0, y: 0, w: 220, h: 320, z: 0, data: { label: "Key Partners", backgroundColor: "#8b5cf615", borderColor: "#8b5cf6", borderWidth: 1, borderStyle: "solid" } },
    { id: "bf2", type: "frame", x: 230, y: 0, w: 220, h: 150, z: 0, data: { label: "Key Activities", backgroundColor: "#6366f115", borderColor: "#6366f1", borderWidth: 1, borderStyle: "solid" } },
    { id: "bf3", type: "frame", x: 230, y: 160, w: 220, h: 160, z: 0, data: { label: "Key Resources", backgroundColor: "#3b82f615", borderColor: "#3b82f6", borderWidth: 1, borderStyle: "solid" } },
    { id: "bf4", type: "frame", x: 460, y: 0, w: 220, h: 320, z: 0, data: { label: "Value Propositions", backgroundColor: "#22c55e15", borderColor: "#22c55e", borderWidth: 1, borderStyle: "solid" } },
    { id: "bf5", type: "frame", x: 690, y: 0, w: 220, h: 150, z: 0, data: { label: "Customer Relationships", backgroundColor: "#f59e0b15", borderColor: "#f59e0b", borderWidth: 1, borderStyle: "solid" } },
    { id: "bf6", type: "frame", x: 690, y: 160, w: 220, h: 160, z: 0, data: { label: "Channels", backgroundColor: "#ec489915", borderColor: "#ec4899", borderWidth: 1, borderStyle: "solid" } },
    { id: "bf7", type: "frame", x: 920, y: 0, w: 220, h: 320, z: 0, data: { label: "Customer Segments", backgroundColor: "#ef444415", borderColor: "#ef4444", borderWidth: 1, borderStyle: "solid" } },
    // Bottom row: 2 wide sections
    { id: "bf8", type: "frame", x: 0, y: 340, w: 565, h: 160, z: 0, data: { label: "Cost Structure", backgroundColor: "#6b728015", borderColor: "#6b7280", borderWidth: 1, borderStyle: "solid" } },
    { id: "bf9", type: "frame", x: 575, y: 340, w: 565, h: 160, z: 0, data: { label: "Revenue Streams", backgroundColor: "#14b8a615", borderColor: "#14b8a6", borderWidth: 1, borderStyle: "solid" } },
    // Placeholder stickies
    { id: "bs1", type: "sticky", x: 15, y: 40, w: 190, h: 60, z: 1, data: { text: "Partner...", color: "#ede9fe", fontSize: 12 } },
    { id: "bs2", type: "sticky", x: 475, y: 40, w: 190, h: 60, z: 1, data: { text: "Value prop...", color: "#bbf7d0", fontSize: 12 } },
    { id: "bs3", type: "sticky", x: 935, y: 40, w: 190, h: 60, z: 1, data: { text: "Segment...", color: "#fecaca", fontSize: 12 } }
  ]
}, Yl = {
  id: "storyboard",
  label: "Storyboard",
  nodes: [
    // Row 1
    { id: "sb1", type: "frame", x: 0, y: 0, w: 300, h: 250, z: 0, data: { label: "Scene 1", backgroundColor: "#f8fafc", borderColor: "#94a3b8", borderWidth: 1, borderStyle: "solid" } },
    { id: "sb2", type: "frame", x: 320, y: 0, w: 300, h: 250, z: 0, data: { label: "Scene 2", backgroundColor: "#f8fafc", borderColor: "#94a3b8", borderWidth: 1, borderStyle: "solid" } },
    { id: "sb3", type: "frame", x: 640, y: 0, w: 300, h: 250, z: 0, data: { label: "Scene 3", backgroundColor: "#f8fafc", borderColor: "#94a3b8", borderWidth: 1, borderStyle: "solid" } },
    // Row 2
    { id: "sb4", type: "frame", x: 0, y: 280, w: 300, h: 250, z: 0, data: { label: "Scene 4", backgroundColor: "#f8fafc", borderColor: "#94a3b8", borderWidth: 1, borderStyle: "solid" } },
    { id: "sb5", type: "frame", x: 320, y: 280, w: 300, h: 250, z: 0, data: { label: "Scene 5", backgroundColor: "#f8fafc", borderColor: "#94a3b8", borderWidth: 1, borderStyle: "solid" } },
    { id: "sb6", type: "frame", x: 640, y: 280, w: 300, h: 250, z: 0, data: { label: "Scene 6", backgroundColor: "#f8fafc", borderColor: "#94a3b8", borderWidth: 1, borderStyle: "solid" } },
    // Caption text below each frame
    { id: "st1", type: "text", x: 0, y: 200, w: 300, h: "auto", z: 1, data: { text: "Caption...", fontSize: 12, fontFamily: "sans-serif", color: "#64748b", align: "center" } },
    { id: "st2", type: "text", x: 320, y: 200, w: 300, h: "auto", z: 1, data: { text: "Caption...", fontSize: 12, fontFamily: "sans-serif", color: "#64748b", align: "center" } },
    { id: "st3", type: "text", x: 640, y: 200, w: 300, h: "auto", z: 1, data: { text: "Caption...", fontSize: 12, fontFamily: "sans-serif", color: "#64748b", align: "center" } },
    { id: "st4", type: "text", x: 0, y: 480, w: 300, h: "auto", z: 1, data: { text: "Caption...", fontSize: 12, fontFamily: "sans-serif", color: "#64748b", align: "center" } },
    { id: "st5", type: "text", x: 320, y: 480, w: 300, h: "auto", z: 1, data: { text: "Caption...", fontSize: 12, fontFamily: "sans-serif", color: "#64748b", align: "center" } },
    { id: "st6", type: "text", x: 640, y: 480, w: 300, h: "auto", z: 1, data: { text: "Caption...", fontSize: 12, fontFamily: "sans-serif", color: "#64748b", align: "center" } }
  ]
}, Vi = [
  Rl,
  Ll,
  Dl,
  Wl,
  Bl,
  Fl,
  Nl,
  Hl,
  Ol,
  Xl,
  Gl,
  Yl
];
class jl {
  constructor() {
    yt(this, "undoStack", []);
    yt(this, "redoStack", []);
    yt(this, "maxSize", 50);
  }
  pushSnapshot(e, o) {
    const r = { nodes: Array.from(e.entries()) };
    o && o.size > 0 && (r.groupParent = Array.from(o.entries()));
    const n = JSON.stringify(r);
    this.undoStack.push(n), this.undoStack.length > this.maxSize && this.undoStack.shift(), this.redoStack = [];
  }
  undo(e, o) {
    if (this.undoStack.length === 0) return null;
    const r = { nodes: Array.from(e.entries()) };
    o && o.size > 0 && (r.groupParent = Array.from(o.entries())), this.redoStack.push(JSON.stringify(r));
    const n = JSON.parse(this.undoStack.pop());
    return {
      nodes: new Map(n.nodes),
      groupParent: new Map(n.groupParent ?? [])
    };
  }
  redo(e, o) {
    if (this.redoStack.length === 0) return null;
    const r = { nodes: Array.from(e.entries()) };
    o && o.size > 0 && (r.groupParent = Array.from(o.entries())), this.undoStack.push(JSON.stringify(r));
    const n = JSON.parse(this.redoStack.pop());
    return {
      nodes: new Map(n.nodes),
      groupParent: new Map(n.groupParent ?? [])
    };
  }
  clear() {
    this.undoStack = [], this.redoStack = [];
  }
  canUndo() {
    return this.undoStack.length > 0;
  }
  canRedo() {
    return this.redoStack.length > 0;
  }
}
const qi = 4, Vl = 8, Ki = 6, Ui = 6, ql = 10, Kl = 14, Ul = 24;
function ko(t, e, o, r) {
  if (!t.rotation) return [e, o];
  const n = t.x + t.w / 2, s = t.y + r / 2, i = -t.rotation * Math.PI / 180, a = Math.cos(i), l = Math.sin(i), c = e - n, d = o - s;
  return [n + c * a - d * l, s + c * l + d * a];
}
function Hr(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function Zl(t) {
  return Math.max(0.01, t);
}
function mr(t, e) {
  return t / Zl(e);
}
function Ql(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, d) => d.z - c.z);
  let a = null, l = null;
  for (const c of i)
    if (c.type === "draw") {
      if (os(c, e, o, r))
        return c;
    } else if (c.type === "shape") {
      if (Qr(c, e, o, r)) return c;
      if (!l && c.data.label) {
        const d = c.h === "auto" ? 100 : c.h, [p, u] = ko(c, e, o, d), f = Ji(c, d);
        f && p >= f.lx && p <= f.rx && u >= f.ly && u <= f.ry && (l = c);
      }
    } else if (s && s.has(c.type)) {
      const d = Hr(c, n);
      Zi(c, e, o, r, d) && (a || (a = c));
    } else {
      const d = Hr(c, n), p = mr(Math.max(qi, Ui), r), [u, f] = ko(c, e, o, d);
      u >= c.x - p && u <= c.x + c.w + p && f >= c.y - p && f <= c.y + d + p && (l || (l = c));
    }
  return l ?? a;
}
function Zi(t, e, o, r, n) {
  const s = n ?? (t.h === "auto" ? 100 : t.h), [i, a] = ko(t, e, o, s), l = r < 0.8 ? Kl : ql, c = mr(Math.max(Vl, l), r);
  if (t.data.label && i >= t.x && i <= t.x + t.w && a >= t.y - Ul && a <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || a < t.y - c || a > t.y + s + c)
    return !1;
  const p = Math.abs(i - t.x), u = Math.abs(i - (t.x + t.w)), f = Math.abs(a - t.y), m = Math.abs(a - (t.y + s)), y = i >= t.x - c && i <= t.x + t.w + c;
  return a >= t.y - c && a <= t.y + s + c && (p <= c || u <= c) || y && (f <= c || m <= c);
}
function Qi(t, e, o, r, n, s) {
  const i = n - o, a = s - r, l = i * i + a * a;
  if (l === 0) return (t - o) ** 2 + (e - r) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * a) / l)), d = o + c * i, p = r + c * a;
  return (t - d) ** 2 + (e - p) ** 2;
}
function Ji(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const r = o.labelFontSize ?? 14, n = r * 1.3, s = r * 0.55, a = t.w - 12 * 2, l = o.label.split(`
`);
  let c = 0;
  for (const m of l) {
    const y = m.length * s;
    c += Math.max(1, Math.ceil(y / Math.max(a, 1)));
  }
  const d = c * n, p = Math.min(a, Math.max(...l.map((m) => m.length)) * s), u = t.x + t.w / 2, f = t.y + e / 2;
  return {
    lx: u - p / 2 - 4,
    ly: f - d / 2 - 4,
    rx: u + p / 2 + 4,
    ry: f + d / 2 + 4
  };
}
function Qr(t, e, o, r, n) {
  const s = t.h === "auto" ? 100 : t.h, [i, a] = ko(t, e, o, s), l = t.data, c = l.strokeWidth ?? 2, d = mr(Math.max(c / 2, Ki), r), p = !!l.fill || !!n;
  switch (l.shape) {
    case "rect": {
      if (p)
        return i >= t.x - d && i <= t.x + t.w + d && a >= t.y - d && a <= t.y + s + d;
      const u = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), m = Math.abs(a - t.y), y = Math.abs(a - (t.y + s)), g = i >= t.x - d && i <= t.x + t.w + d;
      return a >= t.y - d && a <= t.y + s + d && (u <= d || f <= d) || g && (m <= d || y <= d);
    }
    case "ellipse": {
      const u = t.x + t.w / 2, f = t.y + s / 2, m = t.w / 2, y = s / 2;
      if (m === 0 || y === 0) return !1;
      const g = (i - u) / m, x = (a - f) / y, b = g * g + x * x;
      if (p) {
        const M = ((m + d) / m) ** 2;
        return b <= M;
      }
      const v = d / Math.min(m, y);
      return Math.abs(Math.sqrt(b) - 1) <= v;
    }
    case "diamond": {
      const u = t.x + t.w / 2, f = t.y + s / 2, m = t.w / 2, y = s / 2;
      if (m === 0 || y === 0) return !1;
      const g = Math.abs(i - u) / m, x = Math.abs(a - f) / y, b = g + x;
      if (p) {
        const M = d / Math.min(m, y);
        return b <= 1 + M;
      }
      const v = d / Math.min(m, y);
      return Math.abs(b - 1) <= v;
    }
    case "line":
    case "arrow": {
      const u = l.startPoint ?? [0, 0], f = l.endPoint ?? [t.w, s], m = t.x + u[0], y = t.y + u[1], g = t.x + f[0], x = t.y + f[1];
      return Qi(i, a, m, y, g, x) <= d * d;
    }
    default:
      return i >= t.x - d && i <= t.x + t.w + d && a >= t.y - d && a <= t.y + s + d;
  }
}
function Jl(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const i = o[n][0], a = o[n][1], l = o[s][0], c = o[s][1];
    a > e != c > e && t < (l - i) * (e - a) / (c - a) + i && (r = !r);
  }
  return r;
}
function os(t, e, o, r) {
  const n = t.data.strokeWidth, s = mr(Math.max(n / 2, Ki), r), i = s * s, a = t.h === "auto" ? 100 : t.h, [l, c] = ko(t, e, o, a);
  if (l < t.x - s || l > t.x + t.w + s || c < t.y - s || c > t.y + a + s)
    return !1;
  const d = t.data.points;
  if (!d || d.length === 0) return !1;
  const p = l - t.x, u = c - t.y;
  if (d.length === 1) {
    const f = p - d[0][0], m = u - d[0][1];
    return f * f + m * m <= i;
  }
  if (t.data.fill && d.length >= 3 && Jl(p, u, d))
    return !0;
  for (let f = 0; f < d.length - 1; f++)
    if (Qi(p, u, d[f][0], d[f][1], d[f + 1][0], d[f + 1][1]) <= i)
      return !0;
  return !1;
}
function $l(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, d) => d.z - c.z), a = [], l = [];
  for (const c of i)
    if (c.type === "draw")
      os(c, e, o, r) && a.push(c);
    else if (c.type === "shape") {
      if (Qr(c, e, o, r))
        a.push(c);
      else if (c.data.label) {
        const d = c.h === "auto" ? 100 : c.h, [p, u] = ko(c, e, o, d), f = Ji(c, d);
        f && p >= f.lx && p <= f.rx && u >= f.ly && u <= f.ry && l.push(c);
      }
    } else if (s && s.has(c.type)) {
      const d = Hr(c, n);
      Zi(c, e, o, r, d) && l.push(c);
    } else {
      const d = Hr(c, n), p = mr(Math.max(qi, Ui), r), [u, f] = ko(c, e, o, d);
      u >= c.x - p && u <= c.x + c.w + p && f >= c.y - p && f <= c.y + d + p && l.push(c);
    }
  return [...a, ...l];
}
function Ir(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, r = t.y + e / 2, n = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, a = Math.abs(Math.cos(i)), l = Math.abs(Math.sin(i)), c = n * a + s * l, d = n * l + s * a;
  return {
    x: o - c,
    y: r - d,
    w: c * 2,
    h: d * 2
  };
}
const De = class De {
  constructor(e, o = 0, r) {
    // Increased depth for potentially large boards
    yt(this, "level");
    yt(this, "bounds");
    yt(this, "objects");
    yt(this, "nodes");
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    yt(this, "heightMap");
    this.bounds = e, this.level = o, this.objects = [], this.nodes = [], this.heightMap = r ?? /* @__PURE__ */ new Map();
  }
  /** Resolve the effective height for a node (uses measured height for auto-height nodes) */
  resolveH(e) {
    return typeof e.h == "number" ? e.h : this.heightMap.get(e.id) ?? 100;
  }
  /** Store a measured height for an auto-height node */
  setMeasuredHeight(e, o) {
    this.heightMap.set(e, o);
  }
  // Clear the quadtree
  clear() {
    this.objects = [];
    for (let e = 0; e < this.nodes.length; e++)
      this.nodes[e].clear();
    this.nodes = [];
  }
  // Split the node into 4 subnodes
  split() {
    const e = this.bounds.w / 2, o = this.bounds.h / 2, r = this.bounds.x, n = this.bounds.y;
    this.nodes[0] = new De({ x: r + e, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new De({ x: r, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new De({ x: r, y: n + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new De({ x: r + e, y: n + o, w: e, h: o }, this.level + 1, this.heightMap);
  }
  // Determine which quadrant the object belongs to
  getIndex(e) {
    let o = -1;
    const r = this.bounds.x + this.bounds.w / 2, n = this.bounds.y + this.bounds.h / 2, s = e.y < n && e.y + e.h < n, i = e.y > n;
    return e.x < r && e.x + e.w < r ? s ? o = 1 : i && (o = 2) : e.x > r && (s ? o = 0 : i && (o = 3)), o;
  }
  // Insert the object into the quadtree
  insert(e, o) {
    const r = o ?? this.resolveH(e);
    o != null && e.h === "auto" && this.heightMap.set(e.id, o);
    const n = Ir(e, r);
    if (this.nodes.length) {
      const s = this.getIndex(n);
      if (s !== -1) {
        this.nodes[s].insert(e, r);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > De.MAX_OBJECTS && this.level < De.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], a = this.resolveH(i), l = Ir(i, a), c = this.getIndex(l);
        c !== -1 ? (this.nodes[c].insert(i, a), this.objects.splice(s, 1)) : s++;
      }
    }
  }
  // Remove an object. Requires the node (with its coordinates) to find it efficiently.
  remove(e) {
    const o = this.objects.findIndex((r) => r.id === e.id);
    if (o !== -1)
      return this.objects.splice(o, 1), !0;
    if (this.nodes.length) {
      const r = this.resolveH(e), n = this.getIndex(Ir(e, r));
      if (n !== -1 && this.nodes[n].remove(e))
        return !0;
      for (let s = 0; s < this.nodes.length; s++)
        if (s !== n && this.nodes[s].remove(e)) return !0;
    }
    return !1;
  }
  // Return all objects that could collide with the given rect
  retrieve(e, o) {
    const r = this.getIndex(o);
    for (const n of this.objects) {
      const s = this.resolveH(n), i = Ir(n, s);
      i.x < o.x + o.w && i.x + i.w > o.x && i.y < o.y + o.h && i.y + i.h > o.y && e.push(n);
    }
    if (this.nodes.length)
      if (r !== -1)
        this.nodes[r].retrieve(e, o);
      else
        for (const n of this.nodes)
          n.bounds.x < o.x + o.w && n.bounds.x + n.bounds.w > o.x && n.bounds.y < o.y + o.h && n.bounds.y + n.bounds.h > o.y && n.retrieve(e, o);
    return e;
  }
};
// Max number of objects per node before splitting
yt(De, "MAX_OBJECTS", 10), // Max depth of the tree
yt(De, "MAX_LEVELS", 8);
let Nn = De;
function jo(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function qo(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function _l(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function tc(t, e, o, r) {
  const n = e > 0 ? 0.95 : 1.05, s = jo(t.zoom * n, 0.1, 5), i = qo(t, o, r);
  return {
    x: o - i.x * s,
    y: r - i.y * s,
    zoom: s
  };
}
function ec(t, e, o, r) {
  const n = jo(t.zoom * e, 0.1, 5), s = qo(t, o, r);
  return {
    x: o - s.x * n,
    y: r - s.y * n,
    zoom: n
  };
}
const rs = kl.create({
  blockSpecs: {
    ...vl
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let gn = null;
function ns() {
  return gn || (gn = Sl.create({ schema: rs })), gn;
}
async function oc(t) {
  return await ns().blocksToMarkdownLossy(t);
}
async function ss(t) {
  return await ns().tryParseMarkdownToBlocks(t);
}
function $i(t) {
  return ns().tryParseHTMLToBlocks(t);
}
function rc(t, e, o) {
  const [r, n] = t, [s, i] = e, [a, l] = o, c = a - s, d = l - i, p = c * c + d * d;
  if (p === 0)
    return (r - s) ** 2 + (n - i) ** 2;
  let u = ((r - s) * c + (n - i) * d) / p;
  u = Math.max(0, Math.min(1, u));
  const f = s + u * c, m = i + u * d;
  return (r - f) ** 2 + (n - m) ** 2;
}
function Hn(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, r = 0;
  const n = t[0], s = t[t.length - 1];
  for (let l = 1; l < t.length - 1; l++) {
    const c = rc(t[l], n, s);
    c > o && (o = c, r = l);
  }
  if (o <= e)
    return [n, s];
  const i = Hn(t.slice(0, r + 1), e), a = Hn(t.slice(r), e);
  return [...i.slice(0, -1), ...a];
}
async function nc(t, e) {
  const o = [], r = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (e != null && e.background && e.background !== "dot-grid" && r.push(`background="${e.background}"`), e != null && e.originView) {
    const u = e.originView;
    r.push(`originView="${u.x},${u.y},${u.zoom}"`);
  }
  o.push(`<!--@meta ${r.join(" ")} -->`), o.push("");
  const n = t.filter((u) => u.type === "frame").sort((u, f) => u.z - f.z || u.y - f.y || u.x - f.x);
  for (const u of n) {
    const f = u.h === "auto" ? "auto" : Math.round(u.h), m = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${f}"`,
      `z="${u.z}"`
    ];
    u.data.label && m.push(`label="${u.data.label.replace(/"/g, "&quot;")}"`), u.data.backgroundColor && m.push(`backgroundColor="${u.data.backgroundColor}"`), u.data.borderColor && m.push(`borderColor="${u.data.borderColor}"`), u.data.borderWidth != null && m.push(`borderWidth="${u.data.borderWidth}"`), u.data.borderStyle && u.data.borderStyle !== "solid" && m.push(`borderStyle="${u.data.borderStyle}"`), u.data.opacity !== void 0 && u.data.opacity !== 1 && m.push(`opacity="${u.data.opacity}"`), u.data.slideOrder != null && m.push(`slideOrder="${u.data.slideOrder}"`), u.data.transition && u.data.transition !== "pan" && m.push(`transition="${u.data.transition}"`), u.data.transitionDuration != null && m.push(`transitionDuration="${u.data.transitionDuration}"`), u.rotation && m.push(`rotation="${u.rotation}"`), u.locked && m.push('locked="true"'), u.groupId && m.push(`group="${u.groupId}"`), o.push(`<!--@frame ${m.join(" ")} -->`), o.push("");
  }
  const s = t.filter((u) => u.type === "content").sort((u, f) => u.z - f.z || u.y - f.y || u.x - f.x);
  for (const u of s) {
    const f = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${u.h}"`,
      `z="${u.z}"`
    ];
    u.rotation && f.push(`rotation="${u.rotation}"`), u.locked && f.push('locked="true"'), u.groupId && f.push(`group="${u.groupId}"`), u.data.borderColor && f.push(`borderColor="${u.data.borderColor}"`), u.data.borderWidth != null && f.push(`borderWidth="${u.data.borderWidth}"`), u.data.borderStyle && u.data.borderStyle !== "solid" && f.push(`borderStyle="${u.data.borderStyle}"`), u.data.opacity !== void 0 && u.data.opacity !== 1 && f.push(`opacity="${u.data.opacity}"`), o.push(`<!--@block ${f.join(" ")} -->`);
    const m = u.data.blocks.length > 0 ? await oc(u.data.blocks) : "";
    o.push(m), o.push("");
  }
  const i = t.filter((u) => u.type === "draw");
  for (const u of i) {
    const f = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `z="${u.z}"`,
      `tool="${u.data.tool}"`,
      `color="${u.data.color}"`,
      `width="${u.data.strokeWidth}"`
    ];
    u.data.opacity !== void 0 && u.data.opacity !== 1 && f.push(`opacity="${u.data.opacity}"`), u.data.fill && f.push(`fill="${u.data.fill}"`), u.data.fillStyle && u.data.fillStyle !== "hachure" && f.push(`fillStyle="${u.data.fillStyle}"`), u.rotation && f.push(`rotation="${u.rotation}"`), u.locked && f.push('locked="true"'), u.groupId && f.push(`group="${u.groupId}"`), o.push(`<!--@draw ${f.join(" ")} -->`);
    const y = Hn([...u.data.points], 1).map(
      ([g, x, b]) => `${(g + u.x).toFixed(1)},${(x + u.y).toFixed(1)},${b.toFixed(2)}`
    ).join(" ");
    o.push(y), o.push("");
  }
  const a = t.filter((u) => u.type === "shape");
  for (const u of a) {
    const f = u.h === "auto" ? "auto" : Math.round(u.h), m = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${f}"`,
      `z="${u.z}"`,
      'tool="shape"',
      `shape="${u.data.shape}"`,
      `color="${u.data.stroke}"`,
      `stroke="${u.data.strokeWidth}"`,
      `roughness="${u.data.roughness}"`
    ];
    u.data.fill && m.push(`fill="${u.data.fill}"`), u.data.fillStyle && u.data.fillStyle !== "hachure" && m.push(`fillStyle="${u.data.fillStyle}"`), u.data.strokeStyle && u.data.strokeStyle !== "solid" && m.push(`strokeStyle="${u.data.strokeStyle}"`), u.data.edgeStyle && u.data.edgeStyle !== "sharp" && m.push(`edgeStyle="${u.data.edgeStyle}"`), u.data.opacity !== void 0 && u.data.opacity !== 1 && m.push(`opacity="${u.data.opacity}"`), u.data.startPoint && m.push(`startPt="${u.data.startPoint[0].toFixed(1)},${u.data.startPoint[1].toFixed(1)}"`), u.data.endPoint && m.push(`endPt="${u.data.endPoint[0].toFixed(1)},${u.data.endPoint[1].toFixed(1)}"`), u.data.label && m.push(`label="${u.data.label.replace(/"/g, "&quot;")}"`), u.data.labelFontSize && m.push(`labelFontSize="${u.data.labelFontSize}"`), u.data.labelFontFamily && u.data.labelFontFamily !== "Excalifont" && m.push(`labelFontFamily="${u.data.labelFontFamily}"`), u.data.labelAlign && u.data.labelAlign !== "center" && m.push(`labelAlign="${u.data.labelAlign}"`), u.rotation && m.push(`rotation="${u.rotation}"`), u.locked && m.push('locked="true"'), u.groupId && m.push(`group="${u.groupId}"`), o.push(`<!--@draw ${m.join(" ")} -->`), o.push("");
  }
  const l = t.filter((u) => u.type === "text");
  for (const u of l) {
    const f = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `z="${u.z}"`,
      `fontSize="${u.data.fontSize}"`,
      `fontFamily="${u.data.fontFamily}"`,
      `color="${u.data.color}"`,
      `align="${u.data.align}"`
    ];
    u.data.opacity !== void 0 && u.data.opacity !== 1 && f.push(`opacity="${u.data.opacity}"`), u.rotation && f.push(`rotation="${u.rotation}"`), u.locked && f.push('locked="true"'), u.groupId && f.push(`group="${u.groupId}"`), o.push(`<!--@text ${f.join(" ")} -->`), o.push(u.data.text), o.push("");
  }
  const c = t.filter((u) => u.type === "image");
  for (const u of c) {
    const f = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${Math.round(u.h)}"`,
      `z="${u.z}"`,
      `src="${u.data.src.replace(/"/g, "&quot;")}"`
    ];
    u.rotation && f.push(`rotation="${u.rotation}"`), u.locked && f.push('locked="true"'), u.groupId && f.push(`group="${u.groupId}"`), u.data.alt && f.push(`alt="${u.data.alt.replace(/"/g, "&quot;")}"`), u.data.opacity != null && u.data.opacity !== 1 && f.push(`opacity="${u.data.opacity}"`), u.data.borderColor && f.push(`borderColor="${u.data.borderColor}"`), u.data.borderWidth != null && f.push(`borderWidth="${u.data.borderWidth}"`), u.data.borderStyle && u.data.borderStyle !== "solid" && f.push(`borderStyle="${u.data.borderStyle}"`), o.push(`<!--@image ${f.join(" ")} -->`), o.push("");
  }
  const d = t.filter((u) => u.type === "edge");
  for (const u of d) {
    const f = [
      `id="${u.id}"`,
      `from="${u.data.fromId}"`,
      `to="${u.data.toId}"`,
      `style="${u.data.style}"`,
      `color="${u.data.color}"`
    ];
    u.data.label && f.push(`label="${u.data.label}"`), u.data.strokeWidth && u.data.strokeWidth !== 1 && f.push(`strokeWidth="${u.data.strokeWidth}"`), u.data.arrowHead && u.data.arrowHead !== "none" && f.push(`arrowHead="${u.data.arrowHead}"`), u.data.arrowTail && u.data.arrowTail !== "none" && f.push(`arrowTail="${u.data.arrowTail}"`), u.data.arrowHeadSize && f.push(`arrowHeadSize="${u.data.arrowHeadSize}"`), u.data.arrowTailSize && f.push(`arrowTailSize="${u.data.arrowTailSize}"`), u.data.edgeType && u.data.edgeType !== "bezier" && f.push(`edgeType="${u.data.edgeType}"`), u.data.animated && f.push('animated="true"'), u.data.animatedDirection && u.data.animatedDirection !== "forward" && f.push(`animatedDirection="${u.data.animatedDirection}"`), u.data.sourceHandle && f.push(`sourceHandle="${u.data.sourceHandle}"`), u.data.targetHandle && f.push(`targetHandle="${u.data.targetHandle}"`), u.data.midpointOffset != null && u.data.midpointOffset !== 0.5 && f.push(`midpointOffset="${u.data.midpointOffset}"`), u.data.curveOffset && (u.data.curveOffset[0] !== 0 || u.data.curveOffset[1] !== 0) && f.push(`curveOffset="${u.data.curveOffset[0]},${u.data.curveOffset[1]}"`), u.locked && f.push('locked="true"'), u.groupId && f.push(`group="${u.groupId}"`), o.push(`<!--@edge ${f.join(" ")} -->`), o.push("");
  }
  const p = t.filter((u) => u.type === "sticky");
  for (const u of p) {
    const f = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${u.h}"`,
      `z="${u.z}"`,
      `color="${u.data.color}"`
    ];
    u.data.fontSize && u.data.fontSize !== 16 && f.push(`fontSize="${u.data.fontSize}"`), u.data.opacity !== void 0 && u.data.opacity !== 1 && f.push(`opacity="${u.data.opacity}"`), u.rotation && f.push(`rotation="${u.rotation}"`), u.locked && f.push('locked="true"'), u.groupId && f.push(`group="${u.groupId}"`), o.push(`<!--@sticky ${f.join(" ")} -->`), o.push(u.data.text), o.push("");
  }
  return o.join(`
`);
}
const _i = "data:font/woff2;base64,d09GMgABAAAAAMxIAA8AAAAC7dgAAMvmAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGoNAG4GOSByFAgZgAIgKEQgKiYBshtchC5IoAAE2AiQDkiQEIAXzAQegB1veTnIjbLdbehFQ3gC47dfXFsVcELftCZam59bDSCQlLWHbtB4C3QGiXtrfl/3//2cnlSGzDSwpgJ2bql7d/x9TQiFTowtFdwpj9GGzW++z007NWri0WGcTyTgrkbRte+ZmE5LFyWoXu652KxrVJmbBjm84B2zLuzuCh1LPfXV9eV9A1jU0Rne9+oXFL5CuvzOzpZv1BmbxeTE7i+9ELDk9i1ZAHKr9wce3oxeFRPjjf+nfjnV4wMf6ChCHkFiyA9VNFPaH/okkgU/9ZWBsjLR+RHTUrhNPVHyH5+fW+/9vf1F/UWzANsaoGNEumtrG6JIQWrAABRXjCCvAqDPrjOjz1LP6jDq9UwPZdWvlxQXhQf4p1vjP07dnN4AKETSDC7utbwMKWFgCFRVWBPzGltsPV5qmUuYUkYN/nr4O9nb/WeBBGCQUWOMJ5xElnHAgCWTd/7q0VP/Zo2j/3vZ7sjPrzNwVNtgmweBwZI5TgADFIDGSMCHVdNtvUXT7+g0ACGnOXB6bkRFifrpTqAQAS6z3/sU5rb9w6sqO0/KAwcwTSEtUKozH4fLzw+g5HF04nNtko+fx9m6fdRRRwNEoEIion35b//dFK9bAeGZQRxywdpF21yi2sLZgW29wq335lZ89Ma9brm5hJUl+A1Q8kXJ1q44ncIHz+eCWvfl8mckkk0wyySSTJL9a+9y1sxX3geCAobvfAW3FETsd4YGEBRoIqEBrIAtQmecTIxqcW1uOVzMYnBd62ynCxhguT54KwaERHAAown/92tvVif3wJggyyqOTpyIT213THaRFdMsK39Suz6dTcy/b3etmKHFgTrfMzbA4UQmWrdtf/1+lO0cmUIkcmuOUSJX+L1UrYI/E2z0xKHSWLbmtnuwwKdjjTYEkJiRNDNc5VV2rrr/qAyiQVCgAJEFJbotBwanblOTUuYDakOYrnX3d167dW3VVt1oBUGgFgoOEMJrBEwgOMz92mLF/YkOKcDVXSSgTlFqBYCMQIEAOBNvgXF31w2nfff8vp1XV21vV29sHQcOCbDXM3IDOe7it29udJQ9lAcC+OldBSTIERJaceCDUQIMYWFyzoyQtj4weCzUh/4XKMZi2UpSTkiIe7Ty2b+F7iJQWkP6fzbRdnS+MFWDpovVLB02Tplt9SQezBt2Y9kYGaWVco0Z3gdmEBSboQlwx7KxlmD3TbnBl3AvqgjpXAaYuTWmsnKJLmTJlyjyXvsppsW2Tmv236fdiy79g/1T+EUkHJDRB5MwdH1lHV4NXlrU4peH6rj3z5Fd2UVphvAGUAAYC83ked3GLst4i+s5trS3LQj21SxAmweTvl6ZU73527tZV33UFXda18IpSOkAJIdLblq93f+RIbtJaI5emyFVKlzNzX9qbk5TW5YNpsMEg61wrS+mElA5LAyQBrAJiwwSQBNEQmgkE4TQAx6+W32zICovF6BTL48zO6+7p/X8v5CxUz+zlpCArhdMI4fdOnUWCVctlOVKUOEth5cBtE3WISjfFBvIs+Y2T7/+3H62iFjeSKU2l1d1ZFUffe7PyB3XLJEnBpHEIjZTuIJagbSREiPRGiIRKxH9+v1KdpAQ2skBGVy1MKlRthScgBQDvvxf4f/Het/QnwK5AqAgVkw4RuN0t4LkzRfe3QKq2LnWVrCJkhawxFXLlyrQqrZpJ2SGpxMgavYUAp81+m9wzLQ4n8ljVtfIzZcyhxlLI1oFDIiT+sUikQGK2V78sCMnuaEizO8HE767/9Z2I5cuB5P/XspQSymFCF4zxhKcJo9MHEUoIxoSYVqrec2ty2rl0YXE4rBl6wowoil6XxzcxZ4ltSamPV3LFLCYsRhhjhBDDMGfuZz/Na2vS7uS++rVGBl6iIoK8xxAHs7csV53Mmj1eokCBQOszpQIJsgv/8L+pdWZOVDBPIGWi/+MeXtkNAAD9Pgb+/pwNAgCAB4/zlQAAHr6uY0BgdAC6NDNnDlgcJiYcuVgQnVyQBg1w2vWBDJgLssBa7NHvldHWOtEeAIAgEBFAKFBoCDcMZrc5Wd6HHE0Y6RRqyFCnDw10aDKEVmNo8z1MQocebJiCDzOpYRY7zJOGIUVYrgor9WG9NWy2DVsdwg6nsNs97PcOh2jhOCNcIsNVbrjOD7ck4Z4i3FeHR9rwRB/eWeGjHT6L8AMjXRMMIwAKhVEARYaFoHzzBRVUMLiQQsCFFg1KkwaSLj0kY0YQHABgAEA/4O8AFXF6m3FMKhgy5kkBUrejpFeokcWSlVgB96jHBClxesGkW+L9Es1PJOqVzEpiQR4Gfv0oak7nNPKKF2lJON+4OBG/6qSTkjCqiBKs2l4MiEjIKLQfCAQNHQNGxleYOAZJ0uQpU6vFeD1mmmcZGBGs14Wv5HHo+EagN3Tz690q/7DlbZ6y1W3vUfn+Le/wg63u+KzKK7Z80LN3f9hzCb7gI36GwkCPuiYAbseHgDZ79JNikLBoIR6HEzlvgSCck1Q8UcywfQwI64wARHy+Bhnh7fBIKFi4RoD30u1Fs9kXeBjwK40ZfZtfHkb/y2Ir4PGaZo49YoN6+CXYFr1AaN0mq0eBVwgyBAWEAcYEY8GJA8n7gxLnDMk1yW0r0MCjDb6QDz61Uh4FG2AcECGYGMINTA6lAAsGCwELh6NLAgMjMhMGCxI7MgeyNFTZaIoRVYC1JV27DqjOhE3XBzaQsAUWIliaBEOGkS3HsAHZVmR7ofZDHYA6iOAQ2GFkR8COgR1HdgLsNLKzyC5juIrhBtgtsNtgfyG7A3a3kweJHIAHD8BDAOAhATBJZICMpyqhPJE8Z3nhiiJkIqWiZGJUFSuvWFGlVLWiOqkmeS1SHWXWu5mMUtPd9EPZgMxsmWXyVkitVfR7+e5oOxTtU3RA6rDUEXnHpM6XGnCUKLnJG24Iq3HzYPLssS6LxvgbO7oVDZ/UyHw2wqMGDIALNgAcYgByxNjESTCJU2Eqp8E0TofpnAEzUMMMz/ArKIUZA7nIFLIxC1iIo2hJMbI0E4tvn6dQQ50SpWMfY7QJ8l33ApeWYj3n/c6H3gY0j1HBXjBwqqHWOEohTvsKvv73Uv5dYV/jJhF3UcBiqREtSsudGxBtkec5NPy5uLsSDhiAo3iQD5DZ+kGa+7fo8VsIw2ZEHDEjxrVFj6ILfqDJ3bCkDONngWdg6a7WolcKoVALtLI3CjqnKwBiFzsZxeweq0rX8PeW3H7EmSPl89fauU64K+VvmsUsw+oPXDwxQRsj3JIqSTeV3EV2FWspZ8tOMtmbRjS5oedzkVIvDkY7DZrC54vys6eklUQehmYSVcIShG5GDqWD3myH8LAdxY4yiWGLPblWbrGNdN5dWaXRg6KyvmMfD1ybTYsxHOQh0mQKTGtFtOlSq3tjcYCCYNti7W56cwsxtKX43PvV760UHrzz9Z/p4csOzRG4/ViV8SOcOaF4OVa7d2bR/PqBrVu+/aKbi/u93aL23onFw++y/WyAvg5AWmGaaLzTXvwrj8NnV3jsitWg7+Nxa1wd3U9tHd59uth+jci8Iiotfq4UP0B3pj0jZbgm/jApknPYxA6JsBrVsW6RNS8kyVGyBc6BssRAGCznHcIoo8/z9To0jHicskzkmmsLFY4vq7q9C0RS66rCFoqgnQYS6LpgAhqL3HktBzMEwqFxIrXOBsLAoNXt/IoEuCC4Zp8KA461CbB4qCSdXAYosjQQPAC8UV0YD2hyzJIzFHBFBvOai2JNbCvdeqQHAi7iuxiQ9sAoKWXpMkasLOWJz2SpzkivZXBXa+Q6qtSUz0Mi9ZrVebI5YSofjRIKeSo1RTLF23KD3CUPmJxyEiDm9u1Eg51TajpDT73CEhURJUYgwetcg5bLXJd+2jvUpkyXXCXKXHgUyzf1XlGDdIXEpyvoXe1WU4B1hypMRMQCW0ieEKvL1BK6vqhkSNaz9lakengG8dnmiGyxViq3b1Nu4GS/8c0vqE5y75JC+sk0r3sYU34QPQEcDWx3jL9UwQa0K3koRPaSByLWFOhtVn1Ui0a6nlPwgMqnRmzC2IsWolUYQIiCTzPNsCPArIGMWvenZzyW/gQzifrVZcXL1mm62TodYxx4wn9eAQbijsuaO3vCqFExEQdkl5idjQo/8rvs9+VogWxcwbUBwArBqI3aR6rOLEBIIw6mM96jHQnKAyRUoYiozp2JAj7l9Opo8ZTby+eO1gDuO5oEMc0Bo2CbqDhS7NiXywiLgQIpoWcvL8KJGPvHzh6QVws3vtnTTcX5zNaEOLWbe8R9iIfuEwJCbVH/OC3KlJimf+oU2SmeilMA51CgLyPj29MEnXrtEsc0wrXWuluGB+o3YkYe5blD4m5JUBp2w7iO3m3LcV73x/P9+f7+LSpKtBixdPSMTMwSJEpml8IhVaYs2XIUqtCgQ6cuE03Srdc0080w02/6DBg0y2xzzDXP/ErnxIsstsRSsYxPd4WVVlltjbXWWW+DjTbZ3MyR32OfP/DP3yFHHHPCKaedcdY5511w0SWXXXHVNdc98sQzL7zy2htv/eOdDz765LOvvvnhPz9ZA2ggHISHUIgAESESRIYoEBWiQXSIAWEyckQYoApKyipUVXVNW7bpWgwWR9uOXR1dfUN3vvgqV+IqNeFE6mmGNTgb3fuORKExWByZSmdzuDy+QK5QqtQavcFottrZOzg5u7h7+1KoNDoDRjGcZHO4fIFQodJodXqL3eGy3LaH+4RfSvjPAByMwDgYD6MwASbCJJgK02A6zICxWLHjxI0XP0HCnBIVmLKQQovMCBLIE8yACkaG4QEAcgsA0CQ2FmQbACBwvhlbRrRURsNPZ5IdquQLXQALWCENcqAIKqAWmka1S2fUG00PDTw9fP0/MLeRvknXwNrZO2DzxI7Voi5e8t+qf2JBRIgOcRCMZotlxyCxE5ejWx/liZtkE0/iYMlMvlRttHX29Ac4L/GpDDZP4pfW/BkOAPiqAMDXBuDrJE6WZ/6FFJUqQwnZyyivkkYC8GtraWxdTWlms1rQUKtaD8AfBuBPdqBjnelSN7oDwD8B4F8B8B/61PcFyOUIFWGtYF0A5FbrvYGgKQEANCX7xXPVPuHhAA+vgzFHOtXFnfYt6w1XN72/N+Hc/RaZsL3Pw/dhOBGIxO55qBUnvaLHqGrLqdebDaspzUNC1P4zgRbFMlcKTuYdAB9oBY0E3tskFs0NdfNd5xe2gYfXQlHAopiEJCpIk6G74DQAiPbWKZ70/mviOptUo0YloV9hwjwRgEUwT+ZJIrgy90U5GTFz7DwcRqE9hjFARHXSWDtv7HO+4t+bXJVYsrtM/wBay1dEkeMAAOXmWZpIOhWd8pyIo146MPXJEJUs4SRNirKyKMd41KpZPWvEBmib+e7Z85j984eZxZgu2Vfh1vw5twd4QE+MK8ra58l/zH/z//x8JgqTYYph/aYyLWYmt20EuU+cBq93LkwMDZMkDlkKlKnWYLTxJunVZ45FoHo0Tua8UGxjJs6B8FbkSC7C+Wd+cfHbhvkm0EWsEgwrnVgMB/RJHDktKVttnh1zYC7N9bknDcqCYrgyrAUQSKk+AChnkhSZkoZiKiIWwe7C45uBerX2kukK0m3/PBHnwNzLNyid4fC0zNSCVOA2n66Pjbbb65ATzrnilnseA8aeAQCYu90/IAAQRZfe7qNs9/cBYDFgYwE+Dp+Fz8Hn4avwNfgO/Ah+Ab+L/8XoHwIwrAWNySAZnd3it+rlowGaZlRsCvUbMLsYf7Aqk4kC/Rx76nRlo93SEDTbWbqtemYf0IaVjT8YKNZ7ZYUVKdtItnAvOHShBbrnLhuCXKBAjgqtCHdmGb/t9HHqJQT/5xRmffCZrMmZ3Mn7uBOFkige0hUzUmTNgHAyrdM27TNmxs64GT8TpmMmtWKKoVkfd39dF8zCWTSLZ4lF8Wpp0ECkdtRWEgq+gkWII5pKazrse7hA8caFANmMPJNyrMTxSaTCWv2LL56yGTl102YaXMEFfNMw9JaE9rYrxcmCFwie/KkLvnHtezHu6Nd+wv+3+3O+H2DcCOj0E4jEEqlMridElARpchSpUKdFl/5CRUuULlexSvVadcsUlaNIhTotuuQqmx9//Tc6ubh5ePn4GzNjyYY9J648ePNjYNysZZv2nbr26N2vwdyeE1cevPlxmJkhb0Jicmp6ZnZuoBDhosRKkCxNphz5AocMHzV2wuRpM+fMHxyZIFmaTDnyJUFC4LwgyYqq6T4RKQU1HSMLOxcv/6LSiuq6xpb2rt6aUh0jCzsXL11cMeRQUjTDcnwYhsTgSVQGmweAY8lMvlRttHvBcJ5EZbB5hNkXO0vfhsbm1vbO7t5CJcpVqdWgWZtOPfoVLlm+au2Gzdt27tm/uLJBszadevRrAgDHD4BgBMVwHggUAhoOEQUdCxd/UGhEdFxiSnpWbkwoDhEFHQsXTs327Lv/cGllbWNrZ3/YmEkz5i1Z9dmwbc/A8LGTZ85funrj9r2D8XlLVm3Ytmcx3jzuvXDx8tXrN2/fPeiI404564LLrrnpjvsOPvL4U8++8PJrb77z/sMnSC5YtmbTjn3LEGg9iOIkzfJeSFRCWk5RRV1LV//Q6MT03OLK+tbuzGhOUUVdS1dewVqqx2nZjuv5Y5lSozdZHW6fIJ4tN/vT9fH+DeJ5m1Q1tPWMBH4ycAwyA2PwGGKGjOHJ8GeEMKIYKoaBkcCwMzIYeYwSxkhGHaOFMZbRxZjCmMmYxVjAGGKsYqxnbGXsZhxgHGOcwZ4iBLwHANajgJDF5+Lho9e9ugY3QDGA+lhfbf89peAfeBYsvRJ17FS2NxsHz1UxBaiJmj481bC+2NTGU3HLnJr5wZPBr2gQ8fbGPK1hAU0CkBb1WQP+BWCySpz3s7ctrj8kbpaNAKFRJCZEwQ7TkqCeUwTUI1EsQSboFJCBEFC/iL4T3Qqb1ORPaL1UZSCPX/sd4tYyluTf/aKWQK7opxrqGeV+pcu6VKrqE7z2zcPxlfuxNFWp09ZFL6Tc/mCest9za3/WVuTNeJ/roONj2unZQHi+vxcO7JX9OEUt3lN45E5Onni59fMSFNz+YBG33eHZ3pFzG7vd5/TcmWe3W8e0m6yPHK67Gw4akGVJ2JhdzYY0Vfs+IQTbx9mZmXPL9YznOwKpw27lkwOAiXk62vVqzYKwtTaJACTU3ks+WHddimtIUIBHSmDSdLaqRzZOOrAK4mCzE72U3qurdleVNByO55n+WTBmNKr9lvdxd2CSsh/IVAtgIF6rUMp4cFqqTkptDLnzyXnOPIoroxr4QSksqD3ttEJDdN2eQL46EIzFI2ABnK2sD/tqk9fgBbWvEfgy4n6KPClfbLCLeGSa2k5LRiifIPWLDtlWGxcjDZuMD7kVuD2AWXrXSKx/UpL8jP+UlSTWHHEfUEQJSiUwlNqjXCBhm7N0uu814F/tdVxJZ1Ba2e6/5pWTINMNDxdDZ9o6pEv7kv1QmASBCs5RZInKWNfLUgqzGIhA8/Bikw+jnwxngJzOhLMQFs9srJCVsxrYmXe2P65gF0uflpXQPyeif1O/HskY+23z9P35bhvphjseeu6tTzaWAGAcgGAExXAeCBQCGg4RBR0LF39QaER0XGJKelZuTCgOEQUdCxdOZbYHw0SYDnNyOmX4669vwUUUly5L1tLKqaiKamuqvY56mt5A81rSita1uZ3t70inutC1bne/p73uQ9/6uTiEjGDLW/HK1nP9N2SjVrWGTTg8KumP32s+2k4H2TzgXj6ISGuaeIxedaROx8yVAEKb8K4igXAeykewo/lNeKfzL/LbtGoiY2Sr8WSPzMd1KBDJHc9RvLKVQZ1DQcnp2I7qYNFjQS1KZT5M2IxBoNFoC8SX77lwgZyTESfCCX8WfHJUggSEPFGGDMvbTSh0mQo77T2xwKA5nN/cpaSWWcvDepsF2GanEHsdFOGc6+I89IrJG2/YLevTTYnreMtsWFFKj0eN2uenXkd9XKVo18usqXpg79U7ut13o4rt9rcAjaDeOg2dmMKBK95g+0RVblLjWplJYBWdgN2inLi6ztO3cMwi4QJSdAl137eN0gdD5+UP5JCfN0G0SxqwnusQT2WZh3EEaBwosz8oDTOCI5LjOE1G4KUTqkNGJJr2GJN4lwQwp1KRD34Qq26FYpzU4Dvi7yS/cRlv/hM3caKLLErMkbthknbdAmxRy3lLaA9pIP4Q6Ff1Eyt30oK86OwrFG2UsvNQ9hZJyCUnUT6vbuFOw66QIwPBLSCfmNSmXrpiNyo2wBBSxpOlWa2SFWsyN7WwSpNTue+RKRHmszD44hcs5V2hXAQDNBl2Ngk0YIIkcEAWFIwqA0C1bDirdi+PL2z1YmrBDg+88ub8RRjl3dUs96/QYab5Mwh3GcRzQ898xhrxFtA3J+DICXiQRz48XSV7chTcIt7PiA7VkiR0PxwCfeXLakYUr1RFS3wdCy6OeI0uJYm7HGsNMQDxFjCE4QAm+OSEBLxKeVwo+F/Bc1MTqwwFKdIeIdPmWq3WwbZuge10G7nz0+KSQd3AIeM23YGGZIAtiIbovTSTcm8+AIRdxO1xEz0xEztxoZmGO7wRjpMgs8+iYJELkHw9EjSwgHrie3uyjxq1dosuQ0BwJIs/ke4FOR2YWm/EQPjywexZCIdHOS5fCDsmBwjKofOaD7lYJHEosW/4pf1rc7D4rlGp6WmFTl8umI4dLsf0wSPWWwYA4l9pAD0b9/1unHsI/MeHARanrLvtQnKI5L8w0nLRC/y2TMvNgKWQgi7h+BJEnvaTxLclAGaO83czbh4DIIMKnsB4v9tid8LHPONnYH7ZWXj7O9ndxSFUxHPHb+9O38Ed3jV7cW8e+Ufx0Xz0H38eL45/btJdfpQoJIGSKMn6hieVSf1lrB/wLwGQGLLBdnsTOQkzMP8lQPVPdKslTigAkyaeubN3+a47GYB7/tFw9B23jofH25t0lB8k7AtEMnaY+QMq2V/g13Wpw68Ue7RLKxQtNxF5BcewimaAn5f//+x1O+2yCP+9pPu6pQMB+P/0aGCrAODBr/ZgPPDg8MD9IwAAAkAaAEYaL3YOmQCao7bpVUAUKT4PykuVzVyuQqWR6l5JvQaNSZrksQLQ08c+KZFhCgAAtNpgO6jtrGtnfBfg6pm8FIBvEeCWpbfKPUU+YbrT9WPr0Mjgf9QYOjcgYbjr8E8nqfpFX7W0a3HuyMbBxcM/JwIi6XzW6tmlZNzIG6C3ePPh2wYtA4c7Cxn6ijOCipqGti1aGgbfIr45WiRJzsrWIk1pn1tuo3R5rjz5ChRuG6UTdJpo2if64RdaYJElFltq2HLLWqKHrrZK/M58vY173mS7bXbYWZla4WaAb6nefNXX14+p/JOldAAAowBZQ6AMvisAvRVY6/iHO9FWbYro0H1QWYdqrgKi3Ti/hQSRhUUp8XZYWwCwJwEAfIc88xKRyz8BoKEuSfMw1iRjdOsy2RRT9TR+fxaA6WaZLf/mVdRjVBPt6EavMaYxjAYA0CmZX4YfD/ob3DsA3EOBI08Bf79/9NUFpwqHz+T9NAJ6nIO9I7F27+GHyHrHuGooMArnR0llwAj0yDlcuiPLfCWepzjqdDF8Dlo8hVI7JM9q4AoEFW7jESJ5L9B8s7sE3Tqow1VFx2G9GNcj9/jaSufSOopD6CS1pa+rYd2w8FEuo8twh9BTn1yMZe9xMRjz8jkOQUGcx1Si8RWC4V6XNXGKBeyho6eaekk7UloJP4R62HR9GafLCmEQKqgvuEVHkFiUdWkinL5sYN15RzR30rVUTvjh6yffCWZGShjpfF5vLUb1YlZVcOsqXL/dko/auGgghGpZq4K7ffQoF4kTKTf1i5vF2To+jbqPV4X6brltvzs9DnsfVpNnQe3GNKmNNOz2hDo6v/CJLKlzde5DsZFqZdzR7ezw+DaYXdpLG+V6ib+4jEByUsMqfbs7btBM6RtZSgw4OxcqUkl0m14379Xz3qS7lY1EGoksEnkkOpEIJBJx8tfU0w3dsA3fAIlpzGIeAwlrK6dQp4U6K9R5oT49hoDcSOleSEMW8hDIhLXFwEbURsxG3EaOjYDYCCeXYnZBdYHpAtcFILpAKCkTToAsBd+hVcyqmFexU8VAqrgC1BSRRS1mcQtIwGb54L8Ul20k3yRYEiC+RHtT5rIpd/kUXJgqruIXlR4WwtpM2MiyTlsBRP8CH5sqiuGMX/AzuICnR+1CW3Of40cPYoc4sUzkGAj8CEYM8sFpYZfwKVd5pM21LlNZV1O1LlZxV1CFB+MV89lK87WV4it7pUJdlqu43RygjUUZlKniP/kWsu+Yy95prvZOcZVTNmKnfMRfX58qIyXeHCu3+Me3oWM5oWzJIVgQ4qSFkyHKWCjzfP2BH/MJD/gEyDM2Y89gBs+UmbL8laWWTMxKadYzRcROtZF2rN1qKnAFACdLDspQxh0ZAAhOooyiVUq1LJHzAJEowAbWEEOhDn040OU8fOtuprV5tsa4FEf7VKdWEnemu1teHveb8O0qiIH0gRA945EJ0UkjX57Krkk0K+ENJjrN6Z4+bAWZXI8kqkliNLa/G58NPtWBNIBkcqRBBuTT1WxDN0DetNj5aRwDOT1P32YuIubTNhxGYsrJbyn5m18OfR+is8frfvvpcXsZOBo/fOGlSka2Kh5kD7KmjfRiCiRnN11Hd16rBaY98KFYa6TcnaDxTer2wJ7cKBkifVv8dtbL176m37bUHxw2HRHZ+SOpO4nDxAOTtWgAh3viUaIg5uG79OfzcW9bFVTsyy35ex2FYoj8s39tOZA/0GP6gR2zD0COgUxoQLcbJahTkGileaZls9m8lPmDD8pPCe3ZOLWSSuK+B8KcnxP5XD04ZYyU1fKhjXSBVLEV5OsT5ducw1wAXC6nDwYPPczJfGOkZ89iErmo5CaW567y7DjK8vaNyIstvO5f5yK31QzPxMQvpGDAFIhmPOcSOpULJwiE44D0gfAk1IticdJ07uw4qq2iPsOU8pFizC1zVI6w00co1VgSAH77qY/+i40vIMY+q/BUsHNlZTqSRi6O4nE9p8tAP743TDJ1DVWTISnhGdA6S6cRuXLL95INKzjqp+uuYmWld3Pfg8sx97BqdTAVholIKZZjzWReqG76QGNoOtR9EeeNBKoh+dN0UxrF3DnQAQqJEC4MdiKHXgW0IZDJPNSIMsXEOb5RiQkMfDKdUkMy3DAtmWNybUNVHel6tGLGrg09tMWtSXwZmULzGXsiFaIpVC1sGVva8SwEZFssoiIVQhCtpNMxkW6Jrk6qIUISoLKvGmagfd23aN5otths+lzpsTh5DABB5EuFnq8v2/zL10qhKMJ4P8PvYdn6WAbMyGEDxVDjlpcUvX50DG+Yws3JLeE/+iDF5Gri+ciVYOAVSAag3dEQdbiV+XktmVlZdpcrnzWna3Y/U6LJdhp4IdA2WFP22NgBM10ZIIQ7JALRu6mhO2IsXmyKN2DX9JKi6KkScm1Eth9wNXuBaO0F2STdntidf55Sd5exT/GkukBxgG8lQ8loI+s727PpUzk49ltn1mtRIq9rfeA6rWAbP7nrBJEugHTzpqiG4jRaygXo5Go13l/jfXefBVbBLRMw+o6kCv0fstnspW9SBbYBMoEJzRprylCez5nuaCdSRlTOCsYEg/Q5+tB6S1h85EBSTeBf8aav3kNTaBpeDJ9lG+ECd4sXwOqxdCMNLenN9b5Q9plRSkSRqZXS9uRGLq1XevbBtq8XRovJsDmXTYrcXUf9+UradKMe8gRieS8NSDRUFMaZJJaIfkPxLX/CyVXvZO60ICx4XpnoIoUDKbCUR++uOYdBePQyC1yWyKXlS1LgoygIoDJ00+XqiCf1Zznjz9U93hDrZDE5W6qGKL5Pd6XAc4HRWCf7vSGPUsa4ks0Z8zFhLuMcSBQpgwFxmozl39oJPOqPA0Os7iPQjLgQxW7xIpbEBNQOqQKd/Z4OpJ4ezhPnSZENMZzo6xCWyv7vvrYHMDGf8bKnXM1GQgJl+yRoNNGC7aW3MTbk5ptU37ZeUyzwpbW4XgB8C/TjD4xmtPHMmQd0au+1wChcg7RjqEi++WGeIZaWKQ8P/Z3H1eSlT5+4+xiZivkVrfm0/CIrtL6+0AyDWtd7DQ/ZHO+hj/32rcs7zydZZT+vrcBUdRxEOhPQh87e7QeX988DhUQvJc25dSHY/tIKjggsohPbn7ySRJB1FGuHVFrtwt15Rmvne4F5CfOe+hkzscUi0DulR8efiqxFEUVlHxlT1GsjFXhndS+i4njRFZPd04NXG1LQrj+sEJjEJt+K42R3am1qJtSoXo88rku9y/VK2ZK5KB3NZY9F/Dw2kMyCaYD0sCpCNZEKxKiWN7TmeF3XA7ZQvU62YQkJ4G0pkAYu0oYLDFaCjAi5JkQSbK1O0XRSCn6Top0OF4V4tPt0ctGKrJ/QqWGtq6M6OhYYGHr3zRW6HLNCVKHYxQhi7q8VgeJrs1BStIhPwxuaniNnczcDoL0AkmPiLH4+znfv7z65azsNmbC0N/aoxzozZxG89J9PipQRl6cdnyFD+/0XZ0D64PiNzQtGG7weV3GbuaqUNuUhpSQIVr20xDNxd16/Rm8P79xc1efoGNOen5jL/ieQ8aE2pgojAgP3I9g98LnpN643bFG0ISBSs+px/5EU3NGaYdIQR/MscGa9PYblCZUSlX27jd34KK7iaqNAfmw5LU4eXxBtz1BVhJ4YLtr1FSPFfGQuqyRzUUOyWUL1OQeNWyQVYmKLno/vcKQAYjXlhYKgEuRBMNCHbpc5/PcnYD84zvOczr6ODlnikTNnduh1kZ0IZIeMOFzBWuoWMqxWssuyVu6rnAA+bBYsm3THo3odLxkUFkBBYN2STd5OIJALCgCZFZPtUfSS5A3mXUztuC5tcU4kwsR2kpIRr06AtJ+qfJfx2JQnAfTMoxRfIdZAIvkR3Tfax0NR6yG/5yLYb+/6mUtkghruamAFJhDeCG93hH0sd4KBydKN02v5N9c4i6/dvCn8R1IVKu8GVuX5nuDJ5PxlPf7NSsqfQl67NcdtsM+Rgb4pN4hFuJFCe59gxd7xz0/Owuwtks0oTVPH9WzxdVewOMCJLDJLqD7+TIJwBbVZl7Uylb0XCXwDUPmpwmySVlT76veuEUvKtrNgEWor6PveZMMKns4zo5S3E6XtzC7rDJ8a2yYDcfvRfmBMh4J2ne/DmLopwyfvYrYrMurKtkzEFwUXDS38gN0ohZGgIWN+HB58VLXFUyAD8vOUERbVJDp+kPXdHQWxFHwlyMEUgo3fMiRH67JM1CGF2pj4tEBUgaN7AFeQ8d0x/5EbQ7a185ZLVyhXG7xhNWHVwNbqCed/sNQQRRJgIpTU5ryYGIA/4N3qqKq4seK2XSBwRCCkBsxgFKW1hrbVDGjmb7yuQSllHsSrFfbo1cCU5lX5cDGZ2Ge2HSpoi2iQxOKwGLhNNIOs/kG9t3JLSc9pgEXBFgkszjDGqwWfu8SJsUfHz6TgDUanjqk7J92exK56vMoe5jmThSzEt7yJEHZSMNYdilwjYp28DpZguGAhciYs5UwUC9Bfm+rRKIL1I700Edd2fasRyc30jDdd5pYtrtdLu+lQQGItEYv/etEtCpCpTe2tsoK5JtEbN3wL7DPyJ7v0ZKqUihBDWyq4iIYSgdVWigDqsHT4PjLFlSXZ9WC94gnm3eoTjBddEGJXa4Dn17EKyRMoCcg+rJpkBlzGmJpTDgd4JIU+2FNHWtMEwp6KuTdsqb7BGQMliywAHBMfnJ5C6FBriCTv+cWPd+/PWPwZRP1IK2RkiwFelWhJGaYqhlUHFxdvCnABhg6QFAEIXK/52D5UVism65z54K8hnVLXY7Qxt1MlDtgPLRAsbSQb9u3p+daq7uTH+b3gU2h4y56ZsLh1DkkpGubcriq6RYECJEzELj4pGoLtJWy8LRF1lFSFZALFjA4MlW2Pu4dlPm65gWWmZWloSWLLz0LhAgApyCSldeE/H83Spk7ovjoZIRARJ0mKWJ2cQLGWTKBjOEBrPLriZ/PHFFuSAjsqFohSt+z7md97mHd5Lc5ED+txHCI0N4dKHgTjsaKPwQvHlCRf5Kwam6TQjvIq8gVAX6O9kq7M78dgZXV8+vuHcmaRrEQ09CxjryP8AhdYE3aM14/alUtXZL276G4rUvBplasxOubxL7wWuIK9CfaSY+uFzbVTLJk0IaRflZ4i48tyH2BgE/YDUy9lnh3TP1Axnq1Z4AycsTMWhfjAzH9q93OcHNiDic/C0b1H8P3OPyefi2fHKLarWIAWJckHjEKzVo6lzz3bYxY9ptDFiHp4BiSbzCaBkJmCiCVAql0Xy0VYIO8uTih8v4MapZvbFFGHpA6KIqG5fQL70WPUhD4tQyPoRQTpjUjJv0a2xRTFFCZxlDRskcJai4jI8IEp8y3zhqltlPMphgt2weKZKKwec3THcJFxRZ6LYllp6sUxtdAjBNOxXWINRXZA+NLw1c75CsO07O6o2TOJEEiS8IrJxATeDuqAbKZ7tfQR2mYTgszUMir+Q0aNEtb90MuYX9j+J0YnG2ICzWjNCOdyy3nvixeKLe3RyanAz8ASl5Vj6y4+t0IxGB4vrg70Y77JmB0jRUMl6sNTyi/ABPznIrPIhgZGE4fENx6fV+AtYWJtjohkYODuw4ypWB/gGBe5D1vSlAZYLQDJ6YDIHv//R+hMoo8OKdj0CsII3+Thx2hIPV0W+QjoObg/A/IXXFBAJJLdxeKQZAP4McenVBgTwN5hyVWRLCSeibic8YFRbk0FBkE4lyGBTXCa2eI+Q8dfDWn4XYmUKM8YuxfjF92unz/pPpWpQE0Uw0RUXdhixxkc0dixbViJTGxV3LijqEv/QDytcvGqkI+qvcERcL7Sg+6cQOdOTGx/rVbj3OqdTIoG4A+NpOiYT1s8C4nQ0Qy3mfrAEVFUyrR5LfKqBO/q0Kru7msuW+bW50TWiIcBBNPqKjloAk3FyYNTseA3nTGJPg71qGSIUkzLI0eicqQJ8DD6NC0Vu26B3Yp5tfA5MwU7C4lsgJCE9JHHOsoyM26KI5ZuuxwL0qv1gI2Xc/eNLlMow7CFqaPYsGB70in8zJq9e9xJgDB2KzERFKIYBkhuHLQk08QsJDYA1oYWIcPQBC4fEszrPUe6I+ruUofM7VFX2ecHOMHGai0i7rCFbWc428VQAs6OoBkTiRSEQdB1uC75+qmuQd1d3rtd1e/gyF+IwY4cijWBGzhm00pRePxxLzgdckoQlP2xA8+O+ZnP1LlCl3lZ7ViqMhHj4dvSSDMRIO2nUhCEgERpuD4cWqJpaPaDkMx/O0ay1kSq09DQGjXWDesjgPapWL65bad7VdDVnzygCNpS2U1Cg+PHYoKzVjv30I/vVnwedYxAQw5ZHNgj4niBAiqkHDQcoszRK12q87IFl7UojWZU5ihFtKV3xcHjUzkMJXUfGbZAzFtn5Ww+n+kQJxAp0Nne++9Bv/Zz3UUV39Uve6rFyU/rqTCls5XL3qNUPNC62PUX67y+EaJYYh6hkezQDFxSwyE+IoF4cUxLyRjzT76MswFoxGqlooxMmBACY5YWpUanzdinA7ag0R2zkSh5I4WW9zsZvkONO7/9qrm8XZYoUlQ8+SBBJkl2F7s4+I0e2hKRQJfWmJNScc/YVOiMmE/z43Ck4PHU6ZlpwoLPsrBVEFxF/+mx0W2hsePJwyDA5lcBScGv8ydy/GAM8QNV+LksRr4kRt5qilUAnTUl8Fe8hvyel9Q/UGfM5F32hPg5ITo2PBJ4oiyrKAukQ3yssj51SBquy1Zncis5uI8hhKM67uldRSqKNUzCfgLxAyBdVEOoJaKgfLwrMmNXPY6CST0y1K109dn8ozxdwaGzv2oP90cG83Mppcz7inmtRGJXTCTDefw80N2J7Qy3tSHNltXzLmO+gSRCahgeS4ent9gZH1K5tGf2Xtx+wGLZweJqmLUCyCoRdZHcg/H7YVJIMLyb2KovGoKJsc5ayiNVXOv0iS03XvZfxnI2Z8X4lioOMBxsErGrOs2aoNOnC6peGRoPK2ZjLvGxFraAmipWDLbZ1xaNTDw1g1tkWgu8txpwZ/bc5P5aNpfJzsfoBTNmpEQCklSxsaGzvqvurbL9+spCq0mC4rz0PSrzUauDu9zumr2f5gnscmsiChAnJGsgCMgmpVFWoSnRTNEooD1pCqsXuKZoKtDnFB3aMknmrz6VtNY4XdWawjxr+DnOds6x0ALOFWePqXuHJU6AviSQCERyNt1fXgEIyYZs+QSIvVPsuJeM1OodIhmKt58Y+WCeBfaoo6zpK4vA0QQIHJU8cqOYe2ydOnaod0Uux3EYmhTFBRF7wCIDCt2zB4sMoRTTNah9jNKSq3odcSh8Lb74XBTgWzo8RJLSgWMZEzIpJltICkb8A5VSdOzdvw21ESbXQJZLrH+we1Mj3XRV77towzzgQdmhKKLUIVt45CpOt4YPH54wFXtxJRbRRn91nMPziEh+eqdgoWbiQOuPlyKbRHu5Zyn2jR17HsxnMpTkYpcyB/qz68S25ZDbcF0leFTM0m05Yp5tNqSAQiSFLcGdEsKlXSzaAoI+dsicNAqogYvB4KN87jjxJyPOA6bsq5PQm3pQnHICKpQeSp9F2zIVYpVx0BerYAXMrZHkTUVCQzB/MRMqS7JEsqm4Bt5YroEvu4ph6pA8WsjlkKMg2q0VY6vlPI7V3dAuvA2KIiFUemdvD/cu+XKRT8wTIPvLYsAQdPL3Tc6YR+bSqKFSEWrIMbkSZKbCNzD5HpJihCqF0kWGfGKf7mdA5EH8gGIyO6ZTFUK4qodS/yEfszI8nz7UwltHseSP9Wi0eM7c7vs0Vww/le7O3RdtoOpH1r+agqE6mmGx0K4lKG/N2Bguc0PmVE6POTxYO0g8mDufHHDAvsAaVcbBSyMIbdiURTYwwfCLnzjtrnpVlIpVFCmB7mOeT2fF7kHxAZCKeUop6tACKXUT/2TBqxu9zL9OkJ0mO3kOkMEjO1R4aHM7OZ2fhuWTmVuWlTtCGrIOCSnXcoW/MJtruHlsIAtbvJhd1GNXJ84+5CEsWuUlhyMjourjsZbzHSg/puzFTTiyPr0DnQGrlTIVWtlxTmmtiR5QtJ6e84E30ostxl39REXVEXc6IqqhVsTi5R7vKw6EVIEDJ4HxwqmrEwSdpWn4fLTMRV91lSvxcxWP7YIXw+wChUTmr+I2Y+U5iKBfAA6HnP0FWY+dQFDLDrPKSWxuROvbzhLNSeSiUUw1zblAR+kSILRW3FA7rOZ4KkkS3JWFvJa/YArexNu4XPDAifwd76ufYhgCe4qLCbyPTJG5ht5O2evqgNq014UdEsAwqrbiynf02R0JCMv2fYZAbAm/5KdDSHyyUnZZSeQjNbbuAbyH+jeP0B5v9k3FPA+1wPCxES3unCs9IHEgQXBTD487WG+zFVcDIyjmDKNoXzQhg0q8xuQaJANjBb5WyvvljE9YZD3nvQanHXTsMdU6CfW1XcbUxFULhvV7AmH/WADSWt1PVLtqZ2ZEEAisgGDI5DZZZzyQ947pUMSaBkeGFq/0oLgUtzr5vPng2h1Pr/9FBHvV3arSEzG0PE3IcFDEsLHAe9eCOwNXWLgCloHRYLErXok1AUOf1tNDV67MWTm6lDGvdQpiQ7KtmGxY1QXgREb8/95BF6KgMxxYPROfMJ4BsYg6eUD33dtm2bY/SIzd7EqKhiXOpLDpwe37dmfhwohwvltaSEHFS2v7V8QHQSqyt3400jT5QzaZTg2R5AN4OBhPBE1H3V7HyIl6WhWhUGszA0qsrT2rJwNVeDkk5xK9jkjuwrcMbx8pV/dlOvNc3m9xFhKrVpCs1U/fbjA0pbyxznTpujR0S+tAQDjpi5jIzq3A8abPQ87fM8E+OKwJGRdbbXCD8xGr3LvABjqp37K9Q1qdEoHRCtucVz7WedZ31TqZCnSUrfu08ukoklAaaHq8rnfjS9H6uaK22rtsOXnVEEU1FMX2/8RNVNJlWTskVhvncJcT+jkmKOKpwJqaCo0Od/Q0mJ3t7hY6YSATj+TJCBA+6CG8Fbi6A1WoKLpd2vKv9ZYaKYerYXPqkLzP62gJ+np2Gt0s8UQkGaiCrzoer7B0NFZNCYHj4sWaZQZnhbkzVbDNTSn43SuKXIpek0YqYaS4vb7WdccyExHEdffIj9mocwa5jCGTnmXtkIxjjKK9Xl+VTcBLWr7XqaCmAIXh+qX7cmI/cqDsT0p74w67aWGDzcLohQbtYcYY83afnL2lRkl9Qq6L469so7ReVFXIJ9U6M2KcW7BpCVXM5+HOsT8xz6O4AX1yOv2LNOfAPjxW/Mgjktf9rKsVAdvxo9DJy4gRZ93KlzoX1yRFCKwfOoJO2hPdnZc1klpoqX+3Ym6nYVa7Q+30o7KMn/gXX2txIYE565rgTII2VCEDfWdViPme8XVuiwOuhOX5LFyXaFUK/jVKJ1luRj6a/zKNBvZbXU0aFhiYyCWwegMtWAhR2A6RxqEoJFXUC6t3VGOpYZ3Z2+MC95TG7PjURrccTnjMaDgKlyjxESfil0idG4XROoSMa2NykfD5jgTVjCYuY8zgHJWgW4yxzJYXt4KjiSKaBPsBhlIaiE3ep2iWrA7X2B65biOoX0DgbvELoLqWy/kobIFw29XZ9SfMmqBvU70CU6mCyxGP+x6P8OVWGuoc5lbRmV1seYWHBX0zqSyTmPWxTls1WGBVNiV6WmdAXa1LoHpYdCZVgTAdZ0Tg6UPZlGexnPF1rN/ltQyf+DnXHtjBPjThCvXnU3R8s0EZWirHUsojN3d7bA4ZEGMgaSBJDU0OlWag11om61AwBiA5Bvhsk0rg7y5XFhbqrwcIBJth6LjHiTQUGDhF0mvJRb6anH9yR9Dna4vMM/oHoXs6IbOsNi6jaG1ub5Sg74A29JdZUcRdrToidKf3OXNQGJV8Tk5fxpFCJ+gtZPuftcKK3UQejjtTsqZQa9Z6PmaPq814MAgfOzvrOv8vMbcbMYYpX1uVh+WdpiFa16rez2tdrzgKEFjB8ol+wQ58PkOX3aXu1otfsX6UY7uMW4x1bmTVBS7GGa9Sjbld8hkQCLBaZdYSYLuGDYZoaVt655XsaMTG003nM9YNkNkhOB4jhLMWJ/Ky1dohG1ZTVIvIvAa1iF7rUUxL0hB/VUhsZzOWN4nQftdmlbtdFLlK9e2crLyL0ub87rOtycFFsX1yxxrZGVUm0p8ueSBQJhRmTLAAU/ySxz0Jz9w4DRvHQKrpTYk5jOOZ/2IH4sRGnG9L1rHHU1hEk4E4+HzMPG68MfnPpDe3Q9vs9r4p1+eMeDbyqihM7nnvDziZLQqtCzW7wHw5xIU++YU8IVf2tatNxCM7SPY9J47DX2v7lhBg8jNBYUst/kV5NH8SwZ5WKBFr9+5OQk5Mn9kfMCQFe2n9UlULTLdMDAtL9YBq7aRO1TDE+oDvpA4b+LUIhR/z+ERNnD3/SzE1EwYWtrwrObfubRMv810aej/0RhIH14C7fW8kfaKbirDvdI7+GjqebjquD6edDuhAHcraMn2hemuOu5hzPKNF1A90NaCpVJuQFaO67Ja9o099LKneqnGrHrdn+ry78fSLOEaIxf40P4aULsd7plsneIH51V251CKNXRDGxgNqW3jS4Q/HF+sU4Uwztslj+oMRxzorCQ9t9GAstSPBV8zpOOji2R0FXQbpib/Md+e1cUA+Hhus7mdLP/BsiXLhqILbmO3SJhkj7UXPVmfsmXq8skjLwA0/i5+iAULW1IGAwJzT2gEqYHdnBCiW1pP0PgxYL1F7n9QrlcZ0I+z9FTdCHq2HLtZjCb5GCsBTdVobn73TaIsAx+st56sRkkJnC2vw1TBUAqAUlVj/mMiGYj1P+/YYzfkIMO8NOAJoG1xcDHVuznqf9JVHuehjwFBilHjk7gNeNB5c7eIncIuXl3OgkZD40h8dffiSFKG6AFxwdu2h1ozi+CV4CkGgQ2L/Xd+7akeHE+XlF90erjrHgwCuSt0d07D/35Fx4SWlMz4tS9TyRiJB16ORC4LPRRm7lAK0tAY73LCtM/UekK2HmG9+rJN2vxifsYtuXW7SxDXg0psPp32n6NR2kUwNfVhJsR/1zP8C1jf03AwW+kcFHrw5BNK3ixHxBojxOFFHcj9ywtjU5xkhEmQmsMFqXlx7acQEPlccf2pvKpbASzoV3ANNIehwetfFKRZdsWG9AH/AmZfmR2l5qAgPrXvGiu2H3RiAuxPLIojw+qCzQoDRPXJDiNV8A3HtdBV7ZjqjPBJ599nsAuyq27vqU2gz5ZcmnlVmkLSwlcC1CnBHbm6SbU/DZsUI2dK8DIrbeCNS2GnltNLJX05AsnSks56rZskMfv6ycm+xWjebyFklaKiSTs70lQOW2Afyv+OhQSfIny517p21+pyO7HjCGOYNEVGjaEi6aFrki933wwK46v6p9h1fytm2+rzxzrXnJm+iRHq6KaMu7uHZiChuiZ1+QlEEyTIdpzL8wtBbUKOPW739VsvY430Vd9u1w/Y5bdeq+bVsjZqpojk/iemTEu2Z5CCqmI0cpYR7ioO+b4qim3miHEsjeCEmr8TXsVW1PJOh7RcyTRq7WAxuDTRj4luGTf22rQ4lfgOUOGFeGH86YogdE/rWmJfxUELUh05lWdvyDUeSVD7yiXqClBhGHwdCCsuHnSls4GY/zBWXul/6UBFWHIJ9MpjyyDnru/xxn9B/asg8WivnQzh/wqJmm5A7N8K7GjXQAHOcxzgpJioBNVQfCdHrl9WRtjrgaM2zR0aHm7QtwHGTbIJhGQwLy+fgYYH1zeUDyuOHD5iOiqe18IbeHXFCKwYJef/ZeMPmqgnJU5ObbifZkuM0OJ6ZTO2woTdnzO1SeaiQwId+nFlaXi3Sr5uT0fqZYzna8Wf+UyJvjhDVcf5iFc4sZoyYg6D85Tvg1g9J8O54NMUKMzJ50J6FuZn+SRsW5ig9qd3qt9k6NywOTDMCyTIq6di4Q709ipxyiG9DhC2GGyjq7Yr3GcadFWe3OhoQiKzpMNorBmIf/Kd9gr/HtYRF61SRXeNTVGIHYzwPUvQQLAVQ4jw3Gr+eNIx3yV+z5R5FflYJksaG7BkIjLeW18Lpz4L6EM46kb09Wv7lCLSHPJYrn2enu53ZZb7l84bQPxLvVv9QkT+Wm8cf3dGYaj3kxpLur1UWnaNgFfbrpRUeFAUEVtdXs8kfVzwNPq6zImkVcxwdP+IJEiXHWpLLY7BZIyyI7KZ3Rl55+dkTOk4DTHrdrhq4OGgxPYETirSnZuE0cD8wnXRV/MnhtnpendfxNjZxf0jZIyLBvtI8lthRnWY/FK8twuCVvwwHQhIcCURD5cCrRmUrZqyGf0k7sDZsEv+bcQARtWDiVkubI/VKEU2kwKdnIbWi7DHTyz+9t88TTUbNUV/Xtqq2T0fKkc/Rn774Nf0j7UhTmZNf/HvLNd5ORME5DI7n/qtzAvfde2+tPecJEbfnKhpHACkfUNRTJ8cv++fNxhtLzdbf1dZWwVLc2fMNwEQt0/+oFAyqox9MIIAaOvpPUWCgaA4XYt2R/oP9D/0po9PTXMyf6PEojdx1LMFU1qqSBROYcxW4Raw9fx6ze6oA3og5ikPrEnwxLO1ucYTH2e5AG36BsVAEe5DoTntkizj4OqspVvbByD5X/reh38/yDbZHVL2egSUbVOU03PIV0jvilVsOy6rfapsS/JfwQ1YjuiwN4nUEG0Ae+ZZuA8dTQg8FC8pEGabNG+yUfCW9d0v1FEhzQteQ7KBSQybUb8BLTJqgqfekj6Pd+4Upfy0t3aoF1e0Lyjt6OBEHf29vZvGIJYzmwVkbvKVJajptxVfH9Nim8U/EG9avainqd8qOW7Uw8qGCfn7vma/YT6rOpS43fy0B4fAXHpBNiN2Nv51LutfNiDM+Xvk1pIoPp3WsnD7s2Z/xTaX4Jyi48kFOfjQ3GMkxmCh7859Xpquskcmvtxv5Sf4m/8FAl2oCzhhfwc/6Ozs6+MEGFV8yB//5PV2KNP9Omh9bginFBob5kND4EB1cyRh32f+M4LLadez5WO/teWdAIilnsIZXWvOT8jSrACmz7EPaWUblrYp9m1Yn3Lk+t0jLqldr2YGivtiUL0iA0HbPrQNVmYXo1U1XMHmNPS408+97lW6AAn0OmHbO2ybRTz6REjCrITr4InidxU+0ny79EDUwxe7ibclQuuW6RmGbwwFcCPS3/OavTjwGhNqyO7rWK5wnHVJ5kLHi1pKGtRAQSKJAHiHp8R/Vs4Z4ttSB7xcf0Gh/71i/Mi/D/nH+YRm+yHslvt0DWhXRKJDinc+QcwyFK55axN9YFXHhZAiHnDGJQoe80fW70qXjU4ET6PtTd3QhJnpaO4yamVPIp2f+wxYbtM3FELh7CJu6S/esd9jnbIwq8lFl/AmFF6hd3/18KgROmwoGstwx+aJAJm2GNsETcOnkQZp/j61NUJleXw2lnnh/sfJPskgPWvNPsZCTWNqw16RaNWLHq0BpNSc6Gim93ErpNSg0jj8WlUfThmH2Gr2tjTlrm0THb6M7Wnx1RlhLC8DLurYFQaY+9uqqLXXDUEaWGaxEzSxHWTqb4pflRqBWifdoO1+qvdysodjA7pEO6jJgsqnfKklyNXXk8uJIuwG+IxmzkwEx0R772I4ijX6lzfP6+fqy1gLnX8xLJGHRWLtSJA2AutmOu+bvAkdx9kJB8JLcpLf7penE0hXgpRJSlzPigIic4BSnLXak70ls8O656VrS8nM54gFhr8ukb9gssW5mDHxEXG98TROFfBu7LnN+Ps6ohKfC2wQfVWBX2W92CSOk/KDshC3N8cLs0AhGlMDn/x/6SMci2FA2nbVHjFJslbUqsgEsLaCKoieNvxXweDNZmCZlCrqLrFOWRDdZxa7O+jfcRgX2ysaRK36m+5ThaOUh52AWE6kFfqhOINj06IIhx8Pd+6KSS37PPr3nXXHUkXJerM2DFr4r9wWUss0aPtPgj1K6BcqC8ATpKhsCmmT4Rd3afBEIDmm943u7oBbEAnqhLooFhPMxF7fyS95IbNIG4J8SqS/QEY3lq5/rKo5GZhKVaaEZGlHd9Bdu/iTpamH5uwmshWE0mHiSM98HQ00rZ00IbFOKq0wO2kkbXtYZ4zcV37DMliTQ07nZjzldR9MvPp51Te6wTat6pzZY+PnTezY0GFS66Z/KNNXlOnW9Ku97SXaCUDAJBpkuq92o12XOtAPxAn9YX31t8jT1k8myLPuqrqvPip9DSfTrCEVY3fSPI1inQCihSfOFfR9hQTQMLsGaqD84HpKor/4QNpX1KQ/ludJPKZ0aCt4T6QczrcSfsnqAT4ztssBLNQlCxSNFBJV8W96RdN/X3CwTMnnGO4/peBQztu4yvlCs3BeoPdaDm/bMhPs4PiW+ypCHifhDH19bB3TrHSRQph+cne02Eh+oyI6XjjJdHzpLUWmW7mQ78Y6M4uBmPNMbpMUcNtb4g1nmPCQK0CcPWPPdIxZpXCtthiOrO2J8bzF1ohdJDy7JQMLqDE8GwOqyTq4QvJ+JB/y9FZYbq2zQIIFXatTZYOf0I+VB1an+c2OLUhHqbj1zNx85aqTzlcN8j9MlFHceP7aNcP3tdgd18a1X8oXYePNxvZlHmVQ9aF0N2CzQbOioKPaZqkUF6SojzLJmj+6JH07jrizNTnKJLeOlPzkWYQnGVzX16c5+/iFklUDdLH3M8PqRDhd1/V9DFYTljbDApGER65l0/Iw0eZg2I4mWn7Fu1+fLmFRFg1WqBU7UPOOh2OHw/1NDneKFgrjswPV5Ktj7PLxuw9D10TzjRs7YUtzjB2Ly0JZbRFiokUcpnb3mkU/ajspU8XAshqNL/4wx00uyUyQCT6RpAonWPjBzMbR5j0nvn0DfQr3YNKplQiTTjt8pQ2MSnTNvY2bqgIXbjC98KhuzzqSl/1EBHw96bL2wUJjBA0ZP/H2uR7Cl+AFlJmCKlcAJ4ykbi+IARbVA/6++vwYkycTJjK677GpLZ0uJAG5ymi3nzsQyqzUHOAlhtIeAEHJHR0N9kcArjPJF7KxWWmNJpqX/OlAXkzWrMHcDOuevDXPtczRDxULwXelYPLNHariTrdrVv4M8a8xSuYFVTD4pBBVVyG26A5MRRXMA1I0p1kg+Se94YIjTzKFjO3m+UA7bHqtFJPe8uZaFmM/EB5wtLHWk5dAGZRx7esbRBnNFysh/fIbe7wzqQfeiFIkGXDsj65x0Gs/ludZiDC/ZAhpTNCknJS+81YGYECccALkK/Pm8uYN0mdaPAjTavtKT1ZBwFrbPKIXXUz1N9bS5IujHZt4dDBCiPT6HhROx30kppt8zd5jX4rhUhG3dYYtox56e2xsdezCO+nftel48lU0pZUu+dXRS1iiIqzOifZuNlij/GlHez17JBaudc0cQyrNQCxzYpP0IGq0VoMxEtbEqX6cPoyaVMG2gu8mx8Iqi43h6rgdrg5kjPzp52xBIb+yZhhOghMXOD+gJhTFbxUyJKA0PKY8xC/yEjf2Kxi5ebHH8T/ZW2O4+14RwVS+KnWtQKNQg6PNMc4M20r1mT+l0O51Jj+Ida/kqZq7Dy3uQ9dUZzsEcj0n1qPDyl1164mPJfvfVMWMFmVoRxQPnbqb3q8LM8N5qdb7iKQkggzpJtUQn++vSijB91dNZYzKBYMDCFsMjTyO42r8KBrQu28EZxm5n4gxe0sljwxR9i20j2qTUx5qZTLt694PtetOWi8Xdz/rn4SGlBjy1tl+3PhlPDtdvModkTGkg8yArl1fMG3bHdtWeoWAN37Is1tkrSRROoDlMXB0fIEaNrz5Udjq6ydVrsc5qTfom4WC+//4+F0XxVC4YW48QIc/FDhqO7d8S2WQinpIv3g8Z/6N0kgE47Qh9I4RxG8Y4RzLPywvBuWmEmkxgDA1ZuYESZ0eOtZif6x0tKNzrMWhMOP2oMDH6OHmimhtImCZXjceHh/OjoVwFcnE2JkGQrJGg2r2NxWtJXxWfOF0v9U6nDYHvcDQaU2FZmu7kis2bJdTK+c6Ld3GP9+tp/sAwsRQP1waN2wxFBP5fcSPGF3xXoHFMTVIIAmkuXQo4Hncmf1m/vT434T8nYaaRLLtdz0DWaJQSWE9dYRzqIc1XsZ+xRa+rPEJsnXzTHWotV0UKmzfA/wRqCi6Mbr0ol8jU4IYtAs6hJJIXS1lU3BNP4dqyO3V3mbu089YZURPGV0Tzy9aSXDEzwgDxPPipdcVYJAsNggBNY+HbHX8iExiMy1pJQ/oE9716ka29sdtCba2yt/jOQyq/a2/tQuwoILhK8vcWE9toINCFSgRB4eTp++jhtPGyuOwyrYPRSMKcBj60RosdvjlzSuidTTVsAQ2HcvY1tmQp98HelreA2FA34Ml0GVHUCmwNTXshjt4mZmPw5Xp0zpU8yfGJs6f5fI9143b273ls+kyRi9K4LQ2E6kEIhat478XMlFOqpD5wbg6bcSg+5sucoVV+3mptGFgGTfxs+3SSyQ4IWVibosiCydzWgCf9Bd4yY/1Aq7Wau7KZprNoPprL9d8UW+mDctxnL/gndi/9gQMq8OQZW+mWLpW1x/paLC2vvGsp7jGPJj7wjQOyxLT1Ac4u6gxbHkgEVgBqDTJGBCFcSh4ajjzYSLaSU1HY29PybPjQQJXlWsAh9ONzh0w7P6vRaCSjAwbULQ4OOpMDbo48iepDKuRaE7vo2+rML0rCxz+61Bp9KUHsHBUG6IKp7zV3tT5xsa7qetEaSPVatdaxL8mnr763bjefGOcW+cyQPn/93C1LZ452O9U0BBhoJvFJ2Dav1/eu6PHsUOpX1h+IbHiRgt2jZ+04drkB3BVCkXpr682cHe6t7905pNQ3h6VQURSG4x4S+UxuOSmVZv0GtyDZvXYTdt+WIqZORrakgEgn8ZoNjgxDrL4UImVE94dXOa134nmGSuyzfkJOYqRgvyddxth01bP1ZZdqBPRqK0UNudQw1OxI0Zs5vFmBsdQ1VCsN/Rfn1mCrZaEckbIDlCqmwgoQSC86HZdOkALrpyIUQCx2leFpnmbmJ0prvBTt+NiYJlMs+ECxMIOjahqeyjasEbnWU8ZRz88FlOyRH5lRmm2JLs5bHxt2sxUXTrnWBkPKTKXCcAwTe812ieIkwu2fIM1qwEXGBDnoJy51N0zEgcD2ibxrxy1sGUUUCTbLsg1drNZdxQb5omBAcxleNWl7WqsERIq1LfTDdamCjDA6NdychDjTy5Txg/d1vE0+K7j1I2oOeVzGmBbsmspW6m7yipvokNik9iqDhMwo1csBLe+b1hx7+/1ihSoIxvTA3nRuarl5MoZ55VYsGvaWpt/7YN/+jYozVh/uwYapc0Wje0PmoubwmVh3yuF2lx06XY/izfjUSk7AZIyaplO3Z1rem0zfomPqUS0uWByXciZYzG4wSg+V7n1PvDIpXIle9XaW0SjrEDRH7r6asUvW4z2l43rP6anYPbXtmcnxBchkOnQcLszxhrVJyBA2zweUmBbSjbHhsHTZ7YHaZcjeaHFB9UjCpAbwBFe0MumAEVAYasLBhISLlFMNSw04tKzEZXSVrVV6KM/2qKNNgbHL3C2S4dCWC9h/mDlcytfwArh7HANOD7tAVqVTb0L6cvvTw72ZbJUvK6oIE8e6KIhTmYgD83x7x7uiVlatz6sLW7CFHkHvbsIVB/VrhTJ312NYX/hMvfVzZQfmD3NPt3zmcKPyzkqrWgoEmSEWZIp23P5TyDoI5IqIk8BgAsg0qxBD+nPn395kPYlW1kk6XWFXO2t3m+LqEFB28NwMrHY+lXn6YHxORwepVlZSYW2+IaXo0s/jF2OAh14Tpw8w7R1o1/HAp0qIYYx57hi9lz56t/MS/o415ake80TlbSIWbsdpiq/GmZ/r89fUTcskc9mcd9gOwy/n/jMX/iS0l69vWnn9E9WOgo1PNl6zd23m6a3vNZT6xmR4Y0zp0LZ3B1tn/h1tKHB+YWYCZmmg9pvmyFl7YMdtG3GpPrjTdTxDG4yGP5zPP09kWkOTnQsNU5tQP/J1riYXS+LNbsVh5Auw4CzX62f6Mcy+3oLMIy+A4Ckhf3vutiKlydkdR43mTq937D9oBqmpDRLArGhVYZtOL95l7qWp9K7xYRwMs+JM8y0oWj066qy3Dd2zIZKbj2f24xO3XKdfWPjbAaNfHmWssHj/dIb/0T5LzOKl9VLGmMn90g50K4ZIrVeIXhSuNog3mnSO/yCQ4WBWlnKXsf7lA2Zi7+jA7kzo6OgCTz05HIpPZabttrtxSvDsWUlqRq89Lbq7QMtH4Bbpaj1tolLlnSaL3icF7DQ18lhRudE2BVK9luVdrRAk3uHL6TPrvsOniz04mKxnTCUyGquTmkSklkhEfD4cqWXG0vblXGDuQ5KdySLnknQoaUCfw96bbnUKW3ZwVAoOoD2iYz4bu9eWMYwXQAxMGlYsdrgvIK/TlUrrF3xRxt0k49NTX0Ayq0XQwNFhzGhapIeUPlewVeGT7ge7rgUt+isx1/b97EVeIi2R288E8HzjyWAtLCU6KtaK1C1rzzRJu8uaTqSooflr6bbztj6lSq/eGcQKp6jDZ8wECHHT7annjk/pxKHah1Qg8pACR9ego4Vx2sXGaFb6zF+s4xc4a2Gml04i3Rbotfjq6Ck5+t1xe6gd4Q5ZZHyPmylVkTeyyVELuSZWhW5MW504Y63gd7oia0GH5HP0ofyErpzzF1vgebxgCIRp6XrW6shit7jJ0t9zNpix5PoUj0iUGS84MmvcUAk/4KpdpXU8vSjEopq9GPvM8ldMNbG3NJMVwYCQhSuId4d3H9XLFwg3HceuxlOgqdThnEsN6oh4AD2TW2u+rb+07VH61stEMhSdRgYFR14yhcy0dN0v08j0yZOpLN5u2jS3Lc/mqmMvOE0F8pfJfRqCaoYz0nzqpAL3vQUVHJaRZ5zt6skF41VVFXvxAUHEYtUobwX9rKfbMUfXmMuU8qUzeyZF+n4Q7dQcP96yDIX2ms1hfauEtYZhYRCwbcdfomycXGtJES9IRxrHkfNWr9bEG6aqxcuMl6xSq7coJq/DICMyW7ljoOmbIzaKtQGrSXj8cdfDZjvVedPdeXYeCrtqJlM8dxGckHt+0BMb2CFSYHO0L6p2c1HTjTkCRqJmsEjUA7lQi835WsejfVDRhQvarotUMkymYqNn12l5fmMtZDgo8bXNGltT20l9Qix6Lec6D7Iqec/XzDaP22vYEDJOCNu27GOmGI7l2S712jG1f022rGe7AikeQAjaPVlAKW6RvfCotwI1kp3KNJ6GjD5fd2+bmE/oJG0InB8Fsp2bxNSOW9qNb3lybocQqQmZ4KXOhzkJ0k0o/kmXfLGMqjDci6HbVuC003dxo/MmnhPgdbDxYz5DTDE/W+r6Wb2V8XkNXmMkgIyFbO4qgGSpM3wbKCsyCvMIR1G2YAjPR7l+75mr6Dwk3XlfZw5xQpVjpvciRouXopafNJJN4atiuWWq2vmGzRWGm86qIdzsdoimI5lX4uyWHf9h1mtXmYuYfhRYOQZtTYZTkTbYCw8jiB+hfc3R01XHsZ21pWBtahShQHqhA9knZsE25p5FultDRl8c+x9PD5xySnl/yxNY8Oc8cGCvDU4T5BpCZOUq0Mzy6L5AHWaD3RlxhO5QrYCMINX0VTBbYo6unxq5aB5ChbV8QOSaLjrJ7sYHQMxKeb4KPN3bEjUaGrzK4qSV1FXQVOBfD+Slw7qU95VmA7Fr8XyI9yfP5vi7tKYqVv59GTxxj0fvjbDLa5RvzA6k00F7EJeFRLxtw5JYjShIQOLPkfCgmPzcRSeBF5oLr8Ma48pbD2wBEx4rPkNvTDFsWnV9zK3JKInl/DK/cgUwj/tuYeUZ4vvFvXI9scF48I1rMeqT2qbsfDAz++yDS6GpJktR2t/SeqbJHRtYYuP/xd51iA8szxiWyCZGBprXGTPi+DEmhmVfhuHmVvbncYlKulNWobjluHqM1Nm9O3cIQcWTyTwIVJ4o8Y6XvZXH4o/4Xuyfwv1NtQt9Mmx28raaulX/tZpjG+1EEISlWM+zLwTcKVzYagByWS1NZWB5hpbpwiVU2TO5FpJhVCcNG2zva5YEFeRw9O3CGpQ5a/XBYRnR02OHa9lywR2O7eUTC4byX+M/3Tp1XyuPUZfz0OQ0Q5n87jaddm3SuVfVOfejf3d198liZ2160dDYmLExuReV4/Fcppt0DdA4KDrCXr0Mt79a46d1gKueRma2ByYUJd1jkvDhZsIKq+zNCEPFcvvnC8gK46Kanw+S/xZVqSfrhh0BTKin7eRSwjpc83CGuh/i8oF42v8n8FLOmIQxRu1Mt/SmrJv1OdZEO5zp9O59AKoz2bEkVN8AwbYrDN4A4fG19rXfqzgWZSJ16JKa07x9bYgo3t/5fsT4LdiNislFsmCWa2cWeCDWg7RDyMA+orqLK6GvCjOKiSyyEA/A6ibZ+r9rQgw7cxZAuAnb79bTUuZayWxhbIkGhlp1ZHVXZZp9lduTHmMLL/5CNgnX53zA118Al3AqQTgMhoZI8qOblEe+XeTPNRNwXBLWyyJr4UwErdRgGBBDaWQHK4ZXZI57CQQ3iA2kB0sepZQjx8j29D6xM9i6hgbLuBRkyOozrXg5RSeK8eWVt4xu1POThr3rdDUmgVMpLbqDjmSazArLoONc0w/bHvwhs+9zsyiLMxlW4izL7hVOoJ3/OjxOtiB+H9RlRI95/pux/N6vjeyQ5LoEbmTo3dWBwWNm3VjQEeqgmET+BtMeC+bP/Ey4ccVjxreeIyhge/w2fnnUn6Q0IF/vHXYLFaNpxB7nTBVHHpIGBNan8H0Crq87OzRo7NrC6jMkl0w5p5s0NGR6JFsxcYz3bokPMmQNBE/x1C3X86WUckULNuWBcW5tSfJjgbXoCxpvWpzvCgrEBa+JUFMgCEqY6+DdYX8GJhxHXVmgUWnGcs0/D559JbI37ulHM4npCzGU+tHp17ShO3IYRZBmNpalI1/DNP+wPdjY5JawZSGZct8cj8jEZ+PrAyCGPd4AAoP9fTBnr8JKveuQm+Q9aNVdsbh2/GdZaTf3j+kJ0/x12973CGCVImVhc81NJMeoqHyrr+xz2FynQ0Xxhhxa8eFTJb4Gww+VZc/dFXDG8FKTIeaOkLtnYroMgE0cwqmHtVk/A0su233PPylvDxkVG/Vq4OpwiG9yMb/MGvIqGfJXLBmIeeFGdtsz+iFflh9HbwPCCbDC8FGlh58336JhukndnSviC3O3miND1VQKqisbwEbhxFPLy8/tepsZcCoU0Tnt121EaEQYD+KYvI0SOBm9mLvI+ZWuMjLM/z2u0tTOMBAfYDZ/MLTpDgu/q2ax9qyahLZ8OlBpx78Tm64at+sXXdU2B9tPfZM9gtSnE/R/fmYZH9Mtip8g7XMVA7A5+WVZeNPkLzPLm74/ywWPm0u8Kz3vIzFUe+uHsWhxYkaoqPi0c5rPvJO6YOuTetpa1j3ycn9q4+kokM7LfSl8c+ZtX51DzR7YhdKx++Vp1a+Upopot7DZw6N7k60CFO83u+yCeuh+wIArRNGHce6hEFegp3lDooUhofifNlofkvE6O8FAPtzGMa/dZtLIVZwmq54OB7nz62/Vz3fQzF+6EEspSyNyrfkTjyeLrucrq1bcUfcnQOTa7NMYluctl+c8s5x8cRuHezPnjfdf/PfREEtGk+354/PRJAC8HikDO0+lvy3zCnb6SkSW09hCCJc+JoDRGt539Qg/ETe0dRK6lf5Q8IJYaDv8+NCD6jvu5DB8MseP0khqYgiRXGch3DbFeeRUH07d8a1974do3G11dHIuOYGFjmPwETMzMZWyZrh/LD4NKn5k8Eef6lizBZRKnJXPeRd4nd+Jb5Qc0SRTkT6s337lBcFZ5iPscSuWOcpCNW5tZFUmWdY5cTwNhnAoz7154kNSKtm9sCWQhntYpps8Lz6sDp+MY92UtVJXkJ9ccx9Fdh0MY84aKAshgnE9rK3MMHLa+jHpLPFIiOfL+d0SaS4q2D7NUAfhpu4A/aJWYf1gr+eFxJPON8izvZd1MTucvmegsJNEBcg33aeKeThWGX4+g6CNEf3GFhRF310uw0QcsWipkJ0mzCjzBvuYH6IuOrPrmc1UGYQJkHqv8p/3O468HZS5uoi1TvE6+NtcvE/4wi9HtwQOMTy8S77Eo5qtV5VE6nAGOvwwxZ9vYkMVg4VOoGmOEnF8js0nOkhe5RZcBS4S3Y0WSxLSWLnQNvC1luZd5NUp3+LfXcjqKCIWbV0jwl0oAuuiiMlUckPT4eedTQSOyae6id7ttxjspwQsPE8+/UCvtEDxI8N6/hfCJIB0/ah1arN43FngzbUREOaUivZ70r9q3SNYowIROp7ibkrTnuMx4TypjdKw3C+xeVqW+k/BCidOfRkp7H8mmelZbVDqDC0t/+2saisgea4b2FXfIKBzWXgf4V9vv99bmISGgCCrorOaZ+XG5N8ELRpuuHzKRaoDJIgZrXwQ1rKnsPtvoRoNXo72c8m/dU43cR/zLidEzHQdacguNhOGBjdxLm2MYE+65MLA+2RH1aTPuj49pP3R0GV2DU3tQ4i3TUwsyc1hkC5xfLTxxjkMgl5g7thbXyWbNeW4otE+ZQPBXJ0qKitsC//r01yLzrT/FpjvfMrPsRub1lzn9Taxet0PF89bgfKSFXsDJ1TmtJXiSl9JPhp87vsF36f9LPVchYf2jUSTPHM775T+aPrGv1r4nRjc/xlNTCdh/apGR4V7TPF7eN1Cei5iENy+YDp77HIoumWnnrfBcxopFlScpo6SkCGspZpXSgrW+sCIMMffr0rZcxMkndT8+dQ050sqOZ7ZM2K/PWmu2t2dmdcVi8RyTGm6pvzqPXH6aSQNrUC38vNm7EjCOWzO8UlTqZ1g1EnCZ5RNhIy9kHzJyAdrRMMEDXOha1p9Wu8fuv8AE/t7jxCgtZXQqNvKXGddtbRYOIeU4RywfoujHHxDg6TsIOuEEtgjv28TB7fumjN6uuv4gHxe2lx1sHjrf2JR/NxZNLNLEH4nvpmS6d1F2EixS9Bbx3RnL2glsrVMdTDeyhsY3ZXmGAMCucAphlAmU3rSZalID43MUQ3XL7M/dKbeQcK2bu3oRdEcN/e0SJiKwGXIdOb9d8xl1z67XzDmu/9yVpSgdGMFq4W4Gxj++yIjIp4xwpyoiQn4IDGOwvaIcPWkHWuM5SKenDqM3bgMygmvmKQCGKi8xlywzplv+sjnfN1MeFgwtKzoaOaDso4BXoFH3ykdmObesaRGxouH2oqfKgaTKfn5R4Hfqm0HBLnrJ+OW5vXDTjow/UCmcyjT1PBhcCPF9u3GVPd076hmQ2/1kYisS4HBRICKvySa77qNzI2ZQiHzs31bx4TP01CYqiaHHnIn4u3u1l8G6U2pzWfipkXKou2OXNf4S2CN17CTLCDg1Jxtszoiegl5BMdfP44CAZP9CtJBh1zgNA8K6lM+Q+fvM7GR2Dy069/OON+UrSnF30sG8eTQwAHCXYINl0xBjpvbcGAGcc7bdO6GMMNOeFbf8ilg1rT/1DOevhMNr1p8eiDHDeJB7pBSYlerQva5BxQ2RF9Jk0Te3/Hi+JfSzHGFMXu9/7n9Th3RWovvn5Ptwn7KCK7tww3isRMzBwycYloC3GADfjCixxWlVfIeFCHu6Ii0KUVdGbJHNo5ZGHgqP0JzcZmZUKi390YNl1MbqkUW+V/iWhNSJLRsjPN/8DG24MXggw8cM3UZNYtcubciOkIvKDpEaXilb33YUkn0SdPqncB0t+Cbyl8P+VRfSvWIlUPJnPPNfVlOBAB1hpXkTFkz/eHh6cGqfSMScvHDDGrq5uK+RhiCIAxFAr7iGvHDjR6SfDSZ5SJLucGN2CnnlAjNczetxpYeug5j8AyFgtfr44PygsAbKXtVsUC3E1lxI7JkqJD56//Sd9Syq/T6lBQxMc1t9B/v9JZvo1v5wpNXU2MY6n9xAm+4mEJNxOHgvC03mdS5y5LIJk1F1dduoT2F88pTtttmxntguFIa/k+PGIa6DrOQhEVN8+O3Su8UdaVwQdGTgIxUV7sziOZqoEm6r185U/8Q27I79HFBZfq0zrlBHtFmkRsJv36Ta2lQVrUqjZvy6XAgRa62uzXFvHW+5mVosQRnQrdm7Xuje2Xzaj6+mRtu226k2JTXgBsP7JWcAEJfTdlb584T+Zh0+Ki3mMHI7CxHZ7knZsSOSMEUcnerp/8EMsuD+j1rrw4X7JIKO5DDaw83kLY4B/B3RpWddbfPZEe7B1k+zuZmMDyrEQM0GRkLdAJnnSbcwYW1zcmp94GBbclZMS271lgiie4kb7n5fjm7blj8TIw0rXDfiI+7o8gMCNTAUcu56tRg/p3TXWp5coGZcJE1Wm/gQIThdYEy+7PsjkMz4ITg1t5B3JJ/2P7ZAS8IdTklTtePMQeWQXfgMloZId5TWjVLNO8P8ItdMAZqd75PgjRVIWDPypLQ78Obt+eIGORG8oXeLAuWWkHeK5tuIRDRi9PgagjlfcExLYbiGy07c1T7P/xwhiorJIDQ6xmcBMljPdnpYAyxa54w93VHNEZ7WUzwgfRtML3bJXizd4LIZTVDsZ20ngR1Gm91qHgg8ASKD8OjbEr6EgE06WmRL9HRxa5f0XW7IZDG+S97flzengXKoE8aQulXXyUsQYBXOFb8Km2ANY65CkyFDq1yg5jpuV4ZHulWef7RRbTmit13YCYhM3szeeqS/BD5lKmp+r8/jMe/Vt36P/dPncuRiDLCWmCtRD8ucWK7n3zcBLXS5JxopSra5iJC3k7fGrQZK4DqxnCxB3maG1dGLbz+lweMu4a7iPJ5pSzEnYfMDEkFXYTlrysH2XjmJJrNtvpjcuhtEu0vU4gdvp4qC057VLdYg8pbiotgjDI3d6CjrK91/jRxWUlEauJtm/aZ7IfmIth8rbGR4rqdSj69SdZ9ulvWzEw3t67n2nVUmu/wjkEMhlAi39SzQ0ZtonmONxi+VeEjzu3duzdftw8twctclH/SrxK2TpyqG+/eCVE5zlN4vB8zLIPg2XltIqdTUtMVwpr1xnnRlakU2Zd4av3GIq0qy6MWjHraJ8B/ewCFGI6tqnuUmdDwKTYhycen5oXr5jojetD/FsP4vgrFR6AoKYBK+TqCsco3PKuW41/iPDDKITXzHOwBylGx41QCvb5jkPZeR2N5fCPn+8AzcrvGOgVd2BbS93761COLv3HRlOMD52wWn6ExV4BQSdvxqslMvSwmz0mFZumm8OZzKNRHaPDekpLV2Bo3tvVqXvqX5uFPS/z02n85OVAXNKpuM2cfIFQy3FxQCIKLnObTYVb/0cnuEAVa+zRQmcg044kO9oLTK9HPaJ1E03hze0mgP0j3/1eqvROYWbcYaIFGlaBDCXq8Stpcl3DmYAyPNL0NOUI/REFmAAOutsSVe42MsIj3+49p/fBK+J46HrIGN9DasthG18/VDlQ30ZyjdsEUTA1rb4Rj4e46nQZvpWF5nQOeb+XBXExbxmlrNSIy0kIhtiBCzClBxli+dsKD9sBjduGIyVxDc3bU9xFNJIoJ/hPMhmK6PS/v1qQu4VZmD2iy1OLyRgkKt2A4+JFU/612gse4U8nwQacKLRMD0NXt+grHtNzLTHLO63++6LPmJVlD1LXiQYDY0VkIm25IbROOtnXEC4BZ+p64p6fk2lZ4s7Xevm0bimc2f88qJxtgMp94xEg6BgG3BL7VY2vkXRFl+TetZIqCPsWWarAb3FR78v803r/yZ8Hxh2rXEuZ0hrzV8GbMUnJZXDDLkErA24Is6cU92bVigi5sP6SOg7JwGra51qIgpewHQ1TOr9QbK9AZsYRMopZIyEzNVz7Eq3QK0k7MeJn7Ys32wSMbe5yG3MPmzJ13AT8i/OSyIPcto3AG/gotb/v/pYTyujIvXyRPrGNsJm8+pD16vjzstn087mYzP1nkbnfb3WnCXSusV8GuVhQraUbxSYiDce15XPvqvpmMywWnM5d31NhAM7YsgYPmUg//sKAHV0otLXaC5Mo2hmAlf0x69I1jW3evdlh7aBcMxTPhrvnnRiSWkArYBSS4xtlNR6AIw4RBr58V0Otv90jdkQIm4UkqmneWINqwBqR6FZ58z3ROVHlNEWeD5uqwRH1RRI29vKplpGljjE2O1uuecsjLk2BC0/7vk7371zjpinJxJlWKjhnay601yzThR0E+rhivBjvkLvvroMApU1MJAw7EMaCTTCAzKxVmC9HzX7A5rYtkdUcKzBp8u/ycgcwhoqpLjSMq5NwufIWPwDoak+XEZQRQMiE7fAhhr8C+CKsbiHSSUeoC6SDabhZRwwX/+ovHISZ+QHalVR5eIuT9fhJC4PRRIiiZTtKLvJLZTVslIFMYPra/XOjwW8Pco2fUm57QiTpyE525PTGEGOJTOCGBC7C0ui1LfIcdQZf67gvM9+zXy923vkPZiFMwgmkxBNJBXZJXdUQVioNPWatpTGjgSOg6gmdv4e0GDj4QCcRzi1znAG8wcXY6JyBH/kGl/pBamuLir8PqjjwviQsuVtdET+dIpqjdyQRPIh5bDzuYekhSCCXgioOWLRERvE1uC0OYTBaEmWAN2+/QJVI9a5KnOwXXxOfg29hEM1issB65uebu6AvMHerkGJXHFPSWZukV+1JnWLQeXkGej0+ARuhaJlqnjOA7sk0bp74N6XwboF8rjE8jPD9iHclRCBonvtn4SCY/i9NmpKXE/8D6pOt8l3JbrvZj4BtG6qFvKSX2m3D+b8yB8qzQ0VxLkE+eLxHNh17M9aOwl9Msq15nfPLKFbNJmbUv5VIoC00fsk+zjwNMUdl4ElLlD86YLj86a7F+jVjHLpzvR0hrAgQvpEPH1+fXNmbI1GEBURCJkSayxgzLDGCv9DRyI7iA2zmnbTgp3i2FyNXlaNmDBx5RCNeNU07AY+XucY+RhnWu6dlz0QxeHQ/gGvqHsRX6XSQVBLZ0EarCl/JweGM0SPATjX/TO0KQBY+GiQGDk32OuWotVWbr14mQ0RLCbaL+Vsh9mMBtUYyb11Sg0JzKYpsPsjLiuDOJ0149iJ0Jc40IPpHY4jZu+p7YhfkDDxX6y3ufzZRfkDXaeuDeq7x9WSQF3uK2DURDuYP5WKJHj4/D2VQ0ussbyuV1DGbyxKhW56+C/Imz3YTxMlNZbqKf3dWSQVfoLxQ+GM0PuiDSXfZJT+prcwqsU1RBq9ambU705S4ekagIWFHe1nHoIyhj5/pBGnKWRTQz4Smc4rmnLSIi1Im2I3VRKroIrWEXyX/zMeRxt8WDdMO3R6cFJaM08hlKQUI0H0ho6Ij4fhhsmcJqZD5SfT7awu8GFGCwxWxiygcCluPUD0Ld7gOqUxFMFoHX08Wr/IO1hw8+BghO8ulyKt3LffXmkwz1G/8KP1RaVkE0h1duLXHP5AkjdzqCJ3mm8kxjlJUFlFVF7uqUbwjb13bsFeuj9fIHUxmzvlCO8OZ4bApgGb4MFIVWnNUu2eF20jMvOu/5aboLQL2De9aohGtTK9NLgS47JRyMhYjXQ+88rUi1NiYYvrOlx3/OlV6J4Eou/aQNu68LGOd9xzdEzWK/j8qgkmpxK2F8fKhEwuZ+RH4vJDcTN8HGfZBOxmE0pqr/wXkVKneUxeOtblZ8p1uWX6ox9E8xY/22f19OCabc1uA70YyeOKsxVjefBUGSsg485qUvBUK4EU6SrV6X7Yb5P1DMDYLWfVKoIAvpZd/cFH1Qao3HmBjGzcWb662B0Bhk9/1pHUbQMPBdc3h2UY+Kgu/rgXMgK7sicOPYkB2JYjJ6eGG8a2Nf6Iik7rzP6piaUrBFqFWWQkl4Nu60Pz0n0KrDkqHx9S6/ujouI8b5e5HX3BR+DkGFL+1GhuowfB3ZBD2w4HxQg9SVCM3H6obrqCupbLzqkQr/kpAOLhHJpAXLEMEE2T7sOPBHxUeSBOKD7KwCtLcGca9TIF5hyt5/Dn1pCeJqvt0lEchWV0uPe+2Ls16y54PUsNrRZWX3vH5b7jbOwoeTvdlM+BAyzwtXP9VLSE/1L/D1/K15xufyqXTt1hb+DiB2Kpm8wzx6WnBb/1b55NGiV7bwwK+d3wq27zcch2TrZKUjXdIunK4YXXjIJZFnMdMewzsmfPiwF071DY1fty9n93rECnsq/wdzKO5x08xs5/BKXCkvt9LF50uRThfy7xd6dajQGmKQFKwzu08KNKTsSp+xtF/Amnb2gBuzPCGwhfzu+Qjjt2fH5MnzaDCkhFDw8H8+l9YUSvTsLzs000NoEhkiTG7x4aRHl75o04tsujFTFIVJuMmBEZaEGW/PngV+ldDqbhfZvoyKGSxc28KvQanQdg//+0seMqXMB27DoWRqs9ZOcxZ5khLkslbIMd4rL+zjJLrAFli74KLslPA7sj1NWfWLtumo9ELEUrPfBpW8uIENvw3hjZq8Qyn3zHV1dWOBOzGUmkqMzc3mgfJLTKabFqxyWXvCcimcG+/OY+oZFIRcOFdII1kdXgfqj9O7dTHBGrVH0q+Be1/o7+2nT65dV8bxR5r35bMrdl4FB81Im7h+4N8pmG6DrI55zv5wJs1Cy4mty9j3R2ozdHiQlLpENs6puH1WEMo+tLl4kC4h15EfNnSM6LOtOs/Eo7SC0pHv5talxHSXDS5uHO/oVPR0t9W6fdc4mFrC0UI9jKfUFG75hv/wnuZ67UW/V/diPph6sniqAmdU3dLWmFU90/RZJdhmOuod9jSq4piAvWGWctfwN7H2Yz00H/CizQ2v2UtWvtry9DOUImk5jdFD86jH25LqSgLMAqgkFliPfZBn0UbevRxicu3aKC1E8KfKoe6DW8/g0nUrU66qH0H6BrJx90NQgYIgMAfAEMwDaxqDwhJYn1Ivl5+bvFuDfrthNWWdnvpQgn+iCSgSZWv3nF8SRw1iujxZ8oR8b9AW7OfzaDfwq6K2MfnnlFAgXkGR3r/8UXWlk27C4+NLXZbD4VgUNdmCeVFS8THwZ9h8qRL9mEg7hVeAUZcUq14XarTEgCkFxApR7rLdNypBWXBpcLGtgACOoI/UAsWMkbeSU7nekLd+j2+JrN/ESCYwKxdEnMvJnslP4suyBTPoybgfAO9TtMZwVB6ylqf20NY7NLnMm9DYUhMymhBiwSkHM7bV4SqdAJlSYvSy+JNyoJRxqEPEfUvjjrzDnEsWv8MzJosZ0xFrh/y5i2mBq79VFlE3dW5CSFBmGnay/dRJB9P46eUSX3ky6aDhXupZZhbIoR1ysn0oxv76jhpqf+vi5Xs8V52Ull0e4X7yEHLlc+SV2S/633uG7IM10Ss+Bv9IhLZW4RtCCILRuWAVK+j07Y3/orZYAil5YnsS9YHFMw4hIG0ENJBXksTC8uCY3e/sorkhwOpOrZK7JspVhQHpYpHK4vIqlMCpeSusrWUYzUdPhqyo2yHlf033jZ3NHYaNJEepEnikHZOXjYyzJQg+FB+qt41Q4GyZCI+rrL53mr66KGEiu/PkX9oGdxnnYY+VZ0vGabx0blkvW/GNn9VkZzjlsXJmPZdzNrh8GGwh93+b3OXVzmVpO9pXZ3InuLlifVHboCqe0NYrCNnWONhghcesmrjuKwtfHbTl/j+Fx+RDKVBLYFRoAy2JaLpywjyW/fXq3Dgf8JEr0nKHFHxhCxFPjBBPoBDuJAJOC9sQnlWzUCVMKuSz9ukGvsoQcLuLlJjHwtngmWFB0ZOjTOTQjIqvSeFGgKcEUvCtO/XW/z9UGWS66GjzurK9zL/kEg0n35XYshhZ3SMHoohFya6V9FZJycI7vs/Bey5Rcc2ngc/QPt/nVRVirqBRb1D4U2QAwdEClIFwPAvJhnn0/7zY+AhNf8FmCPy6gHeagPs4glBoyKqzK3k8qYnjmrFUnOENhbP09eC3ww//dZaQV3UVsplW+2zVlOB2tzYokpnOnCw4twLQnEUEKyGD4OT8QnH8Irdm1FU/oiwAggO8RoKNS9QGn6D8OVaeq9KhXndIID9Z0yTAuiAt2+tYYlJwZpLJtodH786gQbqwYNcd0zy+0JW0HLppPf3b/QXKgBsCXvKrLLBa9Gexfro68OkqKhMtR1DDtyNN1qMTweuTsQVZZucjGy6P19M1t+EWj8ISmfduCCaicG7QDV/9yck/kSpPFrGN4ByKVEMG8szAnXI8nIxWume7QctMoJPNP3kPGiegEciUU04w5YJvG0/sCk/AI0YyzY+2hzDbDCF6yabltPaToB2sKJAvgT9G8aj92fmhi348yvDa/ZkT3siOTXlwa9MsyyFiJpR+0Hmhgtp6xPGrdn2v31i4mBSUohvNXJy8WJnwZhC+MyKd0ggHgbAEZf40sA0mC1ll5Sx1jmKjiS9DiVJ1eKid7Z9UP6zb72qmzHbGJyIkTPtOcnSkDz0c0m697pY2yu22Srp8ZF/VVhdjKsuGHIacXkoqwB2cd+UB8w9c5Ujvyo1qz3kjLFNGnFQaNoyoGSf+XFoXKIn3TOOZIwwU9VA5JHP4+7oe38t09OuIHj4UiFzzbmsVWNRQV3c77Q+mh5G8mgjKnCB7Dkk34d1ptp5GGGx2CTT9Tx3/tjZOdtseshhHgnukhJFRJQPzw+YciBFxzSaDY6P7F0o8Y+k4ejtYUPQ8fkc2NYvWiCQfT+LvgD0b9kGFKaNd8baIduYzuEt5Lz2BwGajFJgwitQDb48UxhEjHoOzfz5I0/wPiXC4mB+wATfKB6aawwbBb26DdB0Hv0VG5StlNGj5EH/l9OyufA6e5DTDxKGuMY6bSma794IGHm16ZPTKB5dj6YgZ4cE6oNazr7tHBL9yXrFFRRGfGQxt8VuSqEl1Uocaiq6I0JpnOfIUPCxF3gdt07WYuPZuvO3d9uYfN691f/1nW+r7jHBN3kMCs146fjzgRFzOdr+y050yRsExpWmP3CI5byn66742kp1BPRRRvruCt8LfA6krcw+6vUV9eeXvoLPwqwHbws81MCLIyZucfpaGBH60blNP0rdWjjXimjkbD12+a1MVjAlPtNZLxoPbVJQQpZ76fEKpwA7HjWlzlazY2hOqXNMvgPSUVBrq/4UtC+o0IhJ/WO4eFWC/WOR5lOS831ImtnhGnN9AQHAFy+nSAB9FBC6WZvzwHysT3CMwj+45HZErtG5q5Tt3AhkkBXLrZxCMaIVVkyfvXvLx0X8yQfrQYqcb2deepqDztkhwhxIYhPsR6tE6hz53evhd9SpmiVQbqEYJ4AQdkVCuah5UzO0epYyGFsGogsb0kTHTOwgtTEeu8zgDfra3Nj1e3VD2UIGYtdJ41IflfNy/dFFQytbIx9DS1PeFqr6NxvoQi0wTZ7jwgNsqskdVAFPscPKCKlxlfFdymSZiVub70rT7g3681jQirn4Qm/J7TEqhChlqsmsitbPnjONex5h2iZ4VBiGwt25lWXasSs/lmSKYbZKia8rvvk7/HrJ1zfotU/MSI8O8473aVMFfAeBeo2S2u5SaFzlzfezAlVuGSKmw+Loou1pdSDbxOzyZXzuMqM87pIDua7zUPv/+zfT/IpPLcbqYGSljBWJZYntcfchbOMq9TrA5bkNweBQpzs2JDNT8T0pS1JbwUT1TflSsIs8vE3deSH3nKDSe0/QdRvrW5dNaKJ+eDkIxX/y69OrX83JFP/VmBOL/WMFucHmHKTIFUXnXDaRjiAS+ikiQx3HEjyxgv/8w/FZBpzuFFX/v4fu3jgw6NHohfeu3+lmHOZPmeKIef9VhC59fX/eYaX9iHp77mfLigkrMCchWOAKtQ0UXLk99s1+H2OKGvz39Kcv03pb461SA8VBK4n4EhrynPQdTjzfQPMhYJFEoGA9X4xzk2VxiLn5jHH+d5MY1lJjKL5VyJrEhJygVds4k8VE0lfUgM5nHtvzpBjIuBtWidtdQzHtsqH+4XydB/0ybr6wIH+HuG+5jL8WNCTnfWC+azD39N0NITxeCBRffDMzyT7kaXSa88Z8O2+pu0YzbYZg4TRs7Bg3xqLptaxV8Nfva013AnF2+fI+FobtvUwgTb546u16KCr6TXH+xjhVFFW78/7/pD+5e/jBA5P5VW7W+/mERwPkpofYqoK3ytirGX3TabFkkxvsQnJ2gsdUQfuSuNAa7a2AGPrgNp19y6H2jY1vDmgkpR4F0IeZfQPVW7TCP8GEjGWXT7c5kRiWGF26jOrczUVoCm0+cd5L4UjKF4PQcWptDIkyRVP+zp+Vh92EXxnEawSOQmH6l/pcrB16B5/G3QIefHgA1fIy3d/gdpoUE3ZstvMeZuRMlJ9R5tmmwjWQWzHGbQXWVYsFQcJOMRyA6fm/XUfBQNSyeBrctRazneaX2aaUaYgYzOurD/NGLnxNcAvTMgiMNtzTO0r8mr9LW42z0tDkBbj4I1Xx7BbI9nckYjyG/Q69cs6DJki7nI4ck76F6aHMrjSw9sp4ijAk9EAqYbhBwUkCGTaDw6C1b3ycwAubhxaxnGlgHaUkGDqo91MRQuiBU6AO0nLNQPXnrohFpDTWBM1yRCrfflfOtTQ4Y6dtMR/HGJ7APgilVYaix5x2NiIxd7+6SDO/bcxXMMQl+RHqxiaiSQGSRulksFlo/ieUSibr+ppXzBfPEXLmiksdW+DOwCup+nt5jrZIJjnuRgAoky+Q5+JytYNWTjtjSwHXuLI/dKMGuhqF3R5510mlkTTeP4vivdQqH5blrdwabpgzpOxcJ5MNGsLFNOBnMwyduyJYlyqK7OQX0JUO0RqF15PEU0awETemzXGluREwmr4qi0C0slmrwo3mO8jGuKcR6H2ruljwXJNOE12R1++xamTx54pN8t7DQCXsJpKgHNrrTXHIyZ5EL3HSNZeXEDN9/FFsWL2gOBtod9m/ujSH1V7nuPV6yVu3CLuldURccNO0gxg5VZRQx/yYRfqfVNi2LPJpOQYppLeR/yLzpt5e7iWuK73t2ZTcpQiAO6qthizLQoulMoPT6vZGUZQ4ySd5EARa9EZrye7YuuPVn9/PrDe8GmS6fmW/eGI194M0XCtMT+f4u6CGU5vsuhgDN57CvhDDMAAM8JbRqtP5iAnLqSiis4qYn2MqqmPrJnoXkjnetMP5hCP72N4Ctm7zufHgESqItXP4qI2zMNEAUwSLC7yjwb5FI7VBwU5AbipKLz61LoaG2CFu9Yi93Leh3xYI0HIQKV7tXY/+ak/ihShcGKHkRPWPE+G8HYsrgFELDwAyqARlengqlLttaG9R0W1AuSmiuSJZyAxyFLlWBeqKJOaZuuJZsRIutsqwwyD5zUbBe92oCsYveyHf5c1DzycS9fujh3Wuf0sPPhLk4SxBJjTYmloBOEBxILpmGD3UHWy7TdrvhyZHNjW6fCbTrQg0J30KUTRQMd1hxHSSwe/4SjIkC8LgLvWKGSs01zqn4oy0uJE4qZiO7qT19Jfiro0R6QgeRiYi4/mZcOR5NJXkwYh9RoMZCKCBNRWZkMUhYCMu+zQbq+y+wudVUl32uKAeiHecz6utg9w35mK90azihnEsnW8CfW4fr8NHQhAcFGls1PqWikhnORKABuVwT+sAcsHpHoARE8u133V09CMgZjriZGJsZoGETk93G/rEsddv7DAh2qcBZELh/GwEawQiMeefFTa3C5zij59md44h4mDl7tmyYFcjeHVXGx+Jh5K1TRhYM26HxVKwGh4ZxUlktzDkgG9UEUXlaT2elXLt79RZw+kmYpE0yexAP/U2Wjvy6aFp5iCB1/tWh+EFedlRS2nvYSoAnrgF/b99eHIlQ0uO7CRcZrEnMHjmoY/4jzuR6GdW/DVP2v19KeycJiJ/s4WvxJRq4ZCuDyzVPWP9XGGUAHOGjn3fN52ACSkLmgKV8Gl9Iu3HlctpbFuxX5k1pPd7zjEfnytpK7zc8xheElhlqvyJ+XE92SJBNwGUc4qR7O7QFNTCC7HNk+ZHlPolUXxqjWvVvZ4ZHAp10fv67v9YXKmMyotUOkJlMT1WhkqiueaNTy9CUlCl/x5g+gidSZhTzkJSPd8AhR/ZhfSoI19XL18bn6pjYXCW06HnUxc8TNp9u5sQgu3dy3TA81cSmEPEA39Ym8WFBJbPhQ3OohPpu7Xnl/AB7lA0/qApFBS/lnaohhktXAs3CoZgwsfDa+t+30pOdIphoJRleDhFC//lI/SLVcnB5rmn1IFNJ1uioIuA2IPRRZHPOm9nGXK1XpSpr5XZSn3TyrjUbM+HW3BSfWwm2AAd1Hj2SBimm/bka7qxFBd9ITjYQ3He08xXzSxmfSek90vhI/ohGXnl5Xv39LVN+jvGNTiqSWQlBgRyBvq90WKfUYEeLTo2bIsFF/FM0qegq1Cmx875mKg+PHA3r2YrCZo6TCG7aH7f5bjvD1CccbbWRNqDzvvbtRLuFmjeL3169SyFWLip0xdcEaeO3ELecy80IH+XulfkxjGrBhRIJBcuBnpVgphtKpm/J4WVmJIH1YQ2bRJZEoj6mKJ4aOUxhJ4YTXaZ6bXTH975dzi/3YJjcQ/DNKQiu6Oiz3VkkxnzCPqXomeDS8fnvCxoHHlGzv3VXWGHuXJynstWt8McsydrM1e5jUyQoveM5BiZJ9HVHojjcW8w0M6Fpa8eAr1A0tsRqu8R3I3NyJTvF58aC2ByuK42ewbh/KtoCJowCMH1LSGJPRB5nuxNOdjUdfQxklKGeQJCno6Jph08bTh979pSo9hWju0FuLUBXGy+L9hrF20rw9ZL7zLlzpu5PuAyn51d6Vxfjx8LF8CVns+P3/Qk8S2ZM9VxFgv+D3FmptQKYlKxIxtVDuGdujv0lkOkIKlJBnQ23zXAcaOEm/HwpJa0R7JGosEOX/QOzIdVxpuEUW3HokXjMVvlv5QGdio2fkI9jIJ88M87Jl48XtH7Sk68i3/5mFJSvpu2ff6/zpCA5yN/+apNCVGAV/dHtpEjClv5sXVKksR7wrgN1nV7kVtZDf4J1+ko+jJaH+KbB+BotWswdDXvmk9q3j0Z26gySGqo4mv6+GZoLCxBlMhAs1gMuOSKguBfygakDDFMky7OqR4FWy85eP3xAq+ZuGlX/RYPW98f65yX9txSSZ1VuuZ2VLXsRrCEimCRQBil3MyCJk4paufaLLn8fEUYQfUjmeXvqORsh+tQjVJFqS4FgAsGrc+LQxp8C5tNqoZzLBDcfSTNvwQSkCtydUrbVs0ABE8hnPoDtHYkl4W4d0zT3dGf2JDH3tEjZLKxZgMvPmq1yzuVRB5Oan0nmbpj9ZvBIR7fhQaiwWqk11xbu8wJ5rI7lJ5/wZm6c3j1P4KrPEyYLcmnLVqqh63jOJDZkI8ZsWVBrscodwsSI/w1lHV9TUdZFck24Zg26h9q8dpAhV8tzndbXgIWzV5wbbsgSWF9/oJXjUI3S057WQjKVFX8tu9A9MMqzCaPgpYDr+UVJ4IiQLvqOLlIezh8GE2A3mli0oqAzeM3LI5c2k2uXZ9PSnAO0hSO2e9cDHlXFX0b/1wA9c7JxxPeSyF75howchzsEh8eIMTLoXUxlUGPEf5DIVx2srpMbc8oDrAJW8UFE5UvK9PNbUpzCdMYnGm0yWBXbW2wnV1fgTVRj2+hosQZrCtx9+aRbkCYrnPsnFySyJGiNo00+ro8viimRlcQX5XK54IETzXjykfkMK5dt/+6rXvVHnJCf7fFbLHfkWMew7tIV+GvR/pAboSQb6erZXkhT48OzUdA0fvQvWVqwdfJvEJtYT0AFvFU5k+RL+EejE3Zt7C9YFfGkfc0CJY5fdLlPQIm0vmbWyQdLhrRvjw7FUGyaxHY11nVGvVu2MEKwRF/QvQRlUqyfgnw8xm34p/xBEffeQYxTTPczncXUd3a4rj/YRKyJtiTwcVJziZFD1nhWftzyKwCqpKwu0RZ+HDr5Q9YgF8IfehxcphqxivM2GEWL7bzQFgTN3dOKSb1srkUrzDI4dCDtqzk6r7UV3ebsRp64O2jmBC5nT0rqEMgREpjmXYpDvVu7d9t7DX6MWnG7nxUmRXh217XefpDgsWsgVK0Lb6AXTVU3Dx1rUK/RkqnCPfleV+tM9ALxVnYeV3S+WVxYr1Ve4evs40PzoXI/1Neu+vRxbvbcQVdwZf8pKAi7SGLYif/3qyC4homyvfSfTbsgjI+puDfbgZ6wOiOfyxFda0MRqCjHIlEHDjkJSahSkufRRlX/1uC485nhnRwP2LXF7qLF1+qlNNYgLIUMq5fB/SdCDMz+mciJ77LfPzW/+oP1/Ft7obvfzgoOuL1xPpKJhYxlY4APuI8RWMuy/pKlOlK+tWjMQ9dax+gVzmdJp5yvpfyh/hT8v8ujx7JSyn8K7du/Vrn+vRUEaYifffDWf8Ntrqln/p2TWbwm6AVkjFnRwFe4SYujcrNXv5RuL1UizOyP27MudF3WbwvPolScAnhBzp7DeNVOCOPTlJVTsC7scVB6kPJQ+L4QSnduTJGed6ZJ9YpqTK1g/VTJGOFukhX76YIvh0404VUoTRb0JzUbXDoEYI+0Eu/x1wGQJlVkPf2QvQOQ71Fxii+eMALQ4bj+6+dVz5oofXiYHsFgdlFD8uGJZOByepYXsS+VGQlpDKNnr/L0NBNHEwrO9mnSTRs9hb6HSSi0A4beH3s5lc2mWWZirQSm9DxTj7kLdm9ZPrZMb/eEiDBVhPP2IYLhXvRnFIGaxaBN8fHMD3LMXjVHoce3brjbW7GLQEHHoXZffaLf0jDfzJIPQfdmnft0quEh8193zjfnNwSPrIg4RW8qve5DWVvfyT6KJfgfaq30e08WQnMb4A1BniozBcztINUhfeAt4dHxqwkHu+Fktmc62YeUH0CgJbA8zp+X8rzXVl/hxHug7saKRQUITrWs5IzUy51lPhhYcsdB2T4lGuHImjpniJhhy6bf7BVmWFvXnB5nC+8WVot2Lh1lbJZo3kR3x2at6nuHqMqxr7xyb2o8vsOTzi/pU2JMCMYcaOzcK9f+cPsyusw7xSSvmnr1OvW0lz1UZjG6HYRzfGsFptQdy7DYrHg7SQ0eSUy4SvUklF1HKBBaGF6EPIFRrCRDJsi0h4zCPw/YqG5EgnxW4Wwo07SAEVDtj8Q/ogKIVagj1CFFBLySxOMX07Bdk/0du/Bcw/W+cQnsECtpo/Fu6lmmE9BXSdq2lIAfta0c6wPmmFPxm0SJhF+i9bnSaY3OuSoe809QkU93Hc/YM+LHegU7g87KnHBObd4iiCI5LN9HswsvL70qMZV2TT9eVvbUNp14IgK7N0odE5TlChvhxTii010InI5Tff68xZSwpRtrj1MRujAa+Gyk1z6CO2QSO+/KykW/ocgcj3eQZog6eU+fe5vSi1/4kTmibv1QC/7WBrYs4LC9XioIhTb40OHPeBaDrN0lIOuTfsVrhjMePgSpwzCp3IMie3I87n+SPy/j68C2zdfQgnjjyZeSXUIyY77jl1b9ecZcbbjl51hLLOLAnKpXCyWtrWfm/1gt8ZFkB6zAyGuT/jwjYzRR0T+fbxu3QV0a8RZpgpPN2StuxPq/rfTCHT2sBdGQG1tSCq7hl/3wxUMcUp7urmg2zMOT1XsjH59AJ5098pPX/fVWEMZ6b6zINwO1+7wDQFTcfeM5Q5KvCWiVT6fmNOQvLyeyFT5rvw7T/9SWpXdhHC7EblfHzYKWwpyp3eVEvL3tyKdsNstaYDH3pU3O2uaGK58yEOQdMF6Oynis5M2nvboTVfPcVSdOFUzjjQ8EwVXRGiRk6vFeSvgBj30Om4pUSCHCJNTp96ZDbEP4hQZNoiXoT1vzdSrEvvUHlIWCJdyOK66g4UJFEA4SKWW/CCwVWSv7Suf8+jMWIpJxEE8SmVijLxs/+q4dwkc50UoIybkVPveo8zDFKmYQvoeyXWgDGbuR6xC+U3OIZBqhV53TNMw79jlNfj91Cttl+gI9FUTYaY+R3ptNpAGcC80yjaYBwu0kOtUL/IoI86eaqEMALzx5HoL3gkjIBWsoKRWJl2jZGRpCi2vILBnxAF1YVRIBayGtzl7xJny9iNAyphGZaf3F4RC/ujfOunBtqEQKXHrUnfWCMiz6rGNfE6K+651HNeVbquDElzBvD4z97+o44RsfxzT72UlaML5Axi3HfDW3u3uDtTx3eqMLqB0xLExWW9DcV0ojuFxwamXMwRdmGXDsTtwPXDcedmI7jnKHzA2e5wSUGwxfZIzP5Egjaw9bOj5hkMFZyH4vW08+1MbDBRFQPZOh1eOCeOcMea5zsLH1TrPTOd0z4JyG2Rr9ww7zAHPG7DIIVyg0VHgm6/HDB9Bijfy0o8cgW+taZQ0fe+TOEDZTJOV/hpORmETCzOnDlyQLB8hoyco9uXWur8BQeITGel7mVeab3F1BfZIXlVpfo1MM5Tul+uT1RVkuYmFewfQz+RH0+tTKoMrpex2x5fxXBv17bQn0aLkqaFJXrre3Ir3VW8728dcWli8nlDgwHR9H3A+JifDoNgN/dmy8gpWDQXZEDcA4tPn5ZmemXTqHGa8nTMcpeSE9qDtZ2N+jQYWSNQ4mcdBuXZQapCq9LEfDVwZybUPSCm/NuUGDQoPi4XZUJEJrfjSxH8MA5//nNchl6M91frrrhnLP/e1iVQnfUGtuLCRih82RSASPu2j4uGaQXpEUdttw4xBG/LPapQZj7wgqg9ktI87GrC6n5ioM8ruZh933rjjcr/FwZP14DQ0MFBh17PTViFt5yOLZzKoDNXRlePqyVzH/Z7dOcZ40dEuteZSgV4qTUoYR+q+Rhd42UUJYCz9kYqBh/IR9wHz3Y0+HbsCr3BPE23dAQrHxH9G6TRNmOYSJ2sYyX7IlTupEGtJZpKah3B6RaBd/kcT7/W3q3rK5D7te7O98Y+TgCPiaeAg4iYdT7Ohn2ALlRz80SzO5aVtH6lJSTPVNdsD81K6znGRyU2P3wHHc056487FHFmdbbBS3fprC4ppiShfHJZLqDwIrBp8XLT0MSg6S36qw61zVIXG8X5FnmmAhmuix2O0CMPkrRDsW6QpDdns4mXOHlkXHr6LXiy6Szcvah0cxU66Rh6y6Fq07vzLkeGsIPt+ax1y2EZhPrh8FDd1z6w5xRi7Xzls23BFByovy2i/3KWRd+R4PNw9A9OWTWMKAdV79ddOnYt/jlep1xOeHENDaSd1N35a75U1a8ejK33mUS+Mbleu3ryeB3HL/eSUqjeMfG7zGRm2WBf8uQk50jKE0HWgB36P8Ztkm6cunTFMNv3xzxhX98INnQc0iZy/2Rdo2dh+l39b7b2j5DRtB1cdzw0NhsID96+INrG/4uA760Iyzw/krguwph1ffR7oK2L0R57sJR0mkBcNGWVpj782p0GgQqHtXNaqeNAY5WteB4bevJyqIoVrZd4otxlnmOVjFrseqSWPrikwYEUm8+LM05BHuQ/vpyI9y1eW7KlvXKFM6JhkfMW697LfwmZkEDOvwgtAaMnyycd360wxM8pYdLJHhEJXr151mbqmhuxgC32ZkWh/DHEJ8lBFYFiS7cr0hQ7SSsX4dbebOCraLPepdmg9LEisW86huqdgK5tJ8pcdxTcUqWw6mJJSx39IQWN5OS7IQ+gNCfOrVuSpinnx+zrWKcfKBhE1SegpETDt7hREaC/XNTvnoFO0WitqeWGOT9ztNvLojq0W4XyjgJZ1fEYuzBG3Nf+k2cBYg9RCIF/KAs5/cWd2h2YB79JnQCVWZg6LDqmdzkeZxa5y2dAgQow7fcVj2qQmb0Im0GxGg4WNZYuQKXd7utaWn44UsGJ5IDJjo43nrSwFZDeVQJ7EIfZf0s8w63cBTTnNw0CtFKs4Q4Sjcyqrq7Y2ZfTxS2hU3cwtr196BagdV53bRmPfMmyCbVNazN2ZGkxDLzwqab0ZoIWw4/AXhbleUA3/6hKvhGjf4ZrfrQx/4GueDxgVbfQvg5REaXh1Efco2grbo6qEPVGZXCGnEjC6vfWlbgGMDq2f9Kkqq31XdzyVzW6kNzVXFbbXL7sj/SCiZdX39kTjq+mj7BTtNFVbsV9UdBxEWHafV0HC3TdyEo1gkRjpHf1IcTV2qq+mdUyH/QZhrS0vEEWc0Z66Mgttw6mtXCo6tOrXZGytO8VqxAQdP4OajUs7+xb/zgfkCmM1yG0dGKVrNYRgd/V0JEUPgmFzcWwmsHutc90u/ubyKy3OquYkPVsPQ4cE9pRgzFpDrGKGXMna35p13E21CaKrTZd2PEm4B7C0Be1G21aVPzLbXRXaPRRXr4sc4M8cNrVX8dz2QRID08ENIswn7nARGuXbP9I1b8JTfFYX337a2KBOQ2e59S8ODVsJ4UH4fxIali06UL1hQvOUUgydQkVMT48FscdW8VNoNI/NRGIMcXh5OX+Ej6bRoXIw1yQ3dloYfWyQlMp6ay5957I/s669E85JlULXb2gZFwETrsdP/UsyK+ZTQPHgmJGzKcFToP3rO1I7judYYff21xaFeARmSb3rOVPUkp37ODb5vK9YR6JuRJfBNOlhfFVkmi1ulK/Qw41dKO7pDpNVZtOEsQidR4QUGWIhx6EXBoDlOQihzWYCYNnm5il1Irome1VA270IRhsbjeIuZn2Xz1p3l/sJUIs1PnlChmqDor0iIzw4ojylYyoO/0bjYg3RAvKGldjlxmZszKei2VLw6hdL3f4//2gIydIjZ6Bw0koeMIqXQ/kBt9KZrW4PlGQSkZNFwtxB7smI1HiPdS0a0Fd5ZPDFVQnxfHBVeLBoVVdW6P0+nCgoDGVeaCjJ8GAsjf1OJEVclVcRmWwv867kNPvqQYZsTfC86WK6UVjhPmldKwbcVm2pwt0fsdSBvkRkNLAjDnWXO/CJ1WraFuccxt3hWJy6AoeeFo6Bu0XaRt6ROtAI3fKOb3Bq+UdX+S/XRmb77CHNl/YCHHbf5N1iayglsJDKQYUcq3AA8Dox22Am4JxD+ux7vqWxCryDI1hm6aepWu/N7Kw2TDg2vwjlFQWfsx8tEoF0WhXXO8qNwHPq5CcKx/8uQ+neFzhy5cM0VyqHwubRxQy6II1NY7xkT2AdQehl5PpTMnIRaob2kCegbIQRDfAGX+T0+ZjLEeUL14LnNHi1dlcBLhLM7ZFwxNxbFptJARQWOBC/PCCL2cRaTRxBjO3Zfn96+PsXuMiZb6uL4y1glQptHKPcdiZopNaE80W6OlyWcGcKk5PGvbvDdz9wyYFrtKaT/t31o3IiFdwzK1UnwM4qKlAf5/8bFx5P8+YeEtBulWAZcd5VdEkMAGAq48a0JjS1OEkYV5GSEa3xjjeIsQqE/zzFv+ngxGc8QNmQtErIDg4oj1ZS8AkV7LiFB33N0ZeCcw2GsMpA9Ul5GqKdXS7iIhxrBnR7MWOhZFnBEEK8u0JUGZorSPI3FeNPI6swy67Dr1RIVJtSNMf48KixgWkXHRR6xoaNZzt7P4itpbV6zc+vrBBP3tmHEEF45FIfpFcXmFNzBHh9WYXHI21dMJy2P0YUS8hMiYhuJ7V4EV7zY26flWGlzLlYdlnc1rQsCLVg/eS8cotsvauRPC4/VMLSR0wscW+8bwssVoUeHiz3XYQqmSTG+1TD4e/tRN/sW3GB4sjxL4NrwZlbwr2Yy+yi7ILTVzYkfd+DrdFOW/apm8+vvrgXgNTO9NU4fZ1ZMgWwN5emEB+XenffH1DONGeGVY6XLNX7aiO9bCM6fQlwvcg3xHmtLLfxQAzo6Nxh75Iptf6kXFxFJLJAFiRlcuEoo5xGtqIRNk2pGo66mCcIMHop485Tr1Vj8AjK5AHZ3qaKSSVmC4KfylWxPbqNYmxzvLjb97aKGi6NTIhidpDyO91KaILmR+MhwJb2om5omPtN4UAfasCVQHsExKZErG3AiFNIRGlVUM+RB1Td2R2FLPwfpQwTsq9jCpzUyY8XsZEkLSbUPREhtB68UtiolQn81mRYvqfewaLSLCnkPSL/SCmJ8VQ0WUY5LSg4+BW9uqT26rSF6h7/4gFD4Mp3CryeXYJoNlX4xWeGuGv8cj3PTjDNSnJJKseIDRVcDnUckyZP1IlIm+NAUG8etcu0iliWC2PjT9/RzBPGZA+TfetfJtJVe5jD5upnY0TCUwwwPzIgri5vjMsrwF/A7qLXnJ7KOpB8VBRFPlF1MH8mwZYWqPeN0L+wL2PREpvdWW1BXatShSIxxKCpJVt6pK10xoySqzGZ1Lo5gp9hCBCx/VaIMrhPVbpFScqwtwPzJ2MAQhZeTKpM4xaLpXK7WOTQ2YmJW/P/NZ9J5Tbih+T+NNZsLpwO/L+e9BVGopo9ZnWzOrgiqCqUaTinUNE1wotfb4xZ2vby3/0Pff7QxcEbrD3644u03dbOkCuK74iZPclFStl1lQ/6YYenPSrkucWrv3G3yaXaTVymrOJScn3jJont5fRZs56t+3UT7ChuCV0qPtItQs4UtWPdzzh9r6O895AeJ8ZGNsKD5ZzrX1DkxDz+BM/EBKoFzBtMHLcA8Cx1h+JsaBAeh/BQzt6GE3V9F3pdUPCM6QfItbfqcOUs1hzmenIML9jzFCpMmL71BHDF49XQ2vOu7Lo9aexN45ocOdHWNcc4nHnqsn+a0jo8L+yesYKdY0xoWdXa6tPTqEBf2J+VKElhqfrZBSb5UtGjne0l/GIg2Ob8MITkYjSy+C3tDlQtOZ1zodoV3NiQdrFkcejm2QhwVpWla8Y1spKF+c4UqLr3W9meIdPTg1kD/ZKpRe95P0K5yRxk3BH+CP9gUsctqXc5s59xZ8iQU9eWdnPcnUzvXr1mYpNwwv3djxJZnK6MvZpHZjTf2LYU88SMy+p+QQPwfITHhPk/f4hI28QK95RRDVnrczCPJEzipfjXWLo8BbRDl4u5GW8cOu8Eju4PMtQg8lFQ/ujdUPZKwQtfXn4CVGzlJnmVKbjoj0J9p6sCsxtve4CkhvionzhDTMSE9JTqC0B2ZFRHqKG6LCEqJbk4Ikr6V9XMYvz50zk3lidlyO3COY+42TlHTQo2ZjH2qZen+D5ctdsmtBbRWlm02s1X6t/s6V8w9NTKSnWv/w9k472Qnb0lU/SgfJbfJuxcnt9JKOj0mEdk9QKUWHJR99R/HUG0uOJzulFA1zm5q60qMn0CeQT/NmskiGHJPaVcedgoaYQ0ICjb6lAP7+sD1fGo8I1IaqXV9HJiIaHHly8Z0KP28vdCPSHCd6u0budMWQ3VImMoSyqQBOLFcnR1SkBqXbfZy947/Snu3PEY5qipBn85kCoGaAeMh5sQGLEaXaJrXnmVzlAIombpl/2duqrcimdDkXP3EmltSOBqGGV3stNljIneAy8zdsdlC1r3D76WxewT5pAgGgWs0onZzbbCbm/jqshAo0kDIAPZ6GaTH6VkV3gbB0TiLu9H9yigBsWbhkSpXqp28ZJm1eLn1mAN30yUFGV2tEOnotctw6vjxD56QnaqRMjDqT+eko//x1pQEfZQwhTMiqz7GOt/0G+mtufxs7bqQKZ+aT8f+aCXcv7OE5bzuMt/eQtBnelnKPMobU2c71dJ40uCvVVhJSE4hkvnssPF3IA8jUvEEJ77v3GtlPbnkCvf0LZxc7kuEbGLA4pk5TPK13ioWlUsJQSb5NJ0yldLqeatz6/OJQy+CGbnRce5LRQlJ/41nmZgpSzudG7qwxE15HDd0Ajc/LdndsxbfDJawnMbZ1rgTcl16uWo2KxtzNsr7yQVuow8XS42QTzwWX5rEkV0JR3Lcq8JDTRPKw3dCRweFM8my5UyhwRRITm/fnult8hWsdJh5A4CXWE/gQja93Wx7/hNwpnNIBsd9O85QBYY4bUa0/bpICUhsDgB3vwS1e0lEssfBd/s1bNcPaTMFCbuNJpA4/7JlpThZUo0FjHZz5+o3EDd/Op9AYMt39LN5jSO8CGY6Em5qmZihEew5W40QzK7k62c/34lltz3YoCMcojupRRz62CddNhueOUisN69B1kzEAhRUM5IRUZQ69MvQJz9hLV5y1f31KfM61vLAqX2h4hQux+jd9PXu/a4M7fOpxa3Vxo/z7hfW568vFrOWObvYBTf5WDrlIVpBu3Rge3nedj1Flce4hP9Axsog9uFjz4mwLZgahlRC5bBIHpLVnhy+qlvIbf7dLk+cmu4J5YNCUINP+D/LBswbdXuh3DdBx1BDcxV3HGs88pW+JKErUY7EzbvenpJOOVQQxHcXLtoES6eGPX36m4WpUoHKVifz0MmCQqoeLmTu/U7H4cPkzcErpSuhApeiw+04GSzdTDbm5Wtdw5KYLC3nqCr432a3xSFS1O/IpumjFls24pQuo3fgbIRnXFVB0jSv1DcGvwLC5f0bRznlxQIzAjqhXX11FCyE7TESTcWn/p7JzWnsSghXyVWm3YeuKatPx2a7xItnYR2Ysn2aG6SCPIeOX5p1xAm/gS32gv4E7RfGbSsXKq9OzRjn8hEXBINu0DiiFRdZi4O2ZiXjBKoKTJYQJ3QhMsQQzgY/gOFJGCpsj3KjYXg94gc5oMA+Vyt9Ym0NNfl/q05ZHkWo8z55jOgO1AjlZDMaZVBoKoik+9BIKvf6p2sHL7xfHU4HTsIh3bLEcq1adel3Hk+yPSoeq/dMl42Z7s07cI3vvNnX54AUPF+PeNiIEX5Vc3iJ2Bx9Rl6pI6uf/7rzGcdLJv65hrSDJaImcSYIqJrEWS6QCv28cntavUEZ1bI3iLSM3iPxbIItpUEI+2Q1Ll3A9sqd8EgWFIzOEZJ3vuCwAFe4Z7pf4rS0qLohhnFTRuD1K9bHSzbyXCoa84q3/1RO1bgTjSx9imaiervk+gn8Hfu8lMn+I9e72No70q8tGolbOQPftEWkSOQsIPUw/IRQfhjLm5Of/ukX421ACj2puNFc9Q/A/QO1Eq8z959x4tDY4mwokQNaxYT85tpGVqmNPbEZzvMW8Dmj/kj82Fe2IkDjkg0VTEl+fgUrzutnbXe4q8dzMVVg8+IgDluR5XOhqAxSuVJMVDHvFlGiOCfjfSpW5uFwVckEl4ZyJsPOnHQdy+fSkwRqqC0p1pS+YKTBpmfXNTlsfuVQpNlp1+25k51H4v9CLuMyB37Jfzq9jKDkz5mQA5lD/LE/hG9RC8WKWWtjM50tbz5JwGuGMNarqiiYuEJJOa147C1w9tpSEDJQujJAw9/qMgk/EZ8bnyspHeRy4qBM6UiBkoORLBEv+Vgjk+0dnGc/Aad9KzZNPwnfMT8+Zdp85bm0yx6X2OHblLgrHZHXR82ZuXGrdXJaBGihRvuPHbwZfmB60VomF3LEiHDMOn5UWNubqbaQK79/vvgxwyVzrEzjQzxzYNICt/rAgYWMJ08IYLY5MrNc+vxKvBvfzJzGHu1Wpi1r6tZo/UkAUSiSUAv9DHSgm1J/xoD5J0wxGgSmS5I+JhdxpGyHXIvGbC53iK6rhN60jBLyVGa++8YmVnZWio6UQG9lpcIHimjaw6NLUrVpPvFwhctbmjCyomRmGE+COhf18FMBhDudWiZoM8nLao8+b2Tc3fvhjVKBxjH4w3Mdq1Ic91GjsxMxjQqui9M4fogq3JsrPV2HUs4JJNxHjkCsHSpnXiyKjaOB8sq+tGwITTYYgZ5HnoiWAIIGb2bsp4rtOSUGyKFDlsSEKb6PoM/dF2w67fiRlO4CV7B4ztnjwA1GLLyY2IaPD3JphVPQt69aJDdz651vBBLc0+HMZfU5Ng8NXg+LRr+NmDqIuxAqEsAtEDW/0gNM56qcuLEEbAEFJgC9qD5nS69j7UHpdZQkvIWAghmCn5wZU1Gyg8fg2ZyEOKKFHP4bJ4bPbRqPDhIS8CMByQkg+AaggdEkOAvVafnyCc2H2pBUqL6D1bl8Ei4VsYGlOwdKV/prIKoKUgG1jH6kfxx0hdX2QMbmAJCaGk5GR0prYG6g0JvJScCCEMF8sQiUgKSAXUtmTudexNe3ZidCBAu+9uGUMFADoFS8TjXohyEeKECZy2W21uWQyuT8DGckNRuJXGa/hHv6fYxXWpa/nFXMRDsbNeUhlSx8lrjLCUsjxULWefVMevoCz7AsU/raWd8+whpHUSJ+k10njA8yP+IoIr2vdIHVPI9NEgsEzXJiAJqwjvejLon4/ObgjI9HuIXjlnqqRBQSucfDdsTDJG50D6zjHE37YetJNXPj4DJ2PqH8o/zI39iQGZ+Ypsv2I4/MyNaqn7wOjFmhaiGMDPMbV/vi6hVc0LK0EDng+kBZTo5kTxJ5jZiyRDLNLeE0d5yoaYgugjCdbEEc6M4yQ4lqvr89Oyni2x2Jy449Dl5InVNXj/uzpdVDgWxckAWxxQEGNbDS53axTPdIWS3x0NTm8g3UkUiJdWGhZVGlPlfgUvS+L3zAPs7dYVIditRL3oPl4dcN9aWsnLDa9KoUvds8OBmN9zJEp+RMCPv22BRTogDOxjR7wBORyERNQuZUBPc/NXhWzNNRDny0qDymUEbBQC6UvmXxw10ZiA7Sc6lsbM13b8p6AW5MOuoxr5nlwjV76SbidKSd6Ryoq6AaBK6Jbh+hDJSO0qTP9B0bjbhWqkta45Nok9IUOYcOCTu9wNVwnBoyIVbnQQNaJkjnzgkGn+PjXZXhxeTfqvL6aT1jhUVVNKlcH6+fFpFDddtayGScYcD0XkSSDWuc3PFaQhYGdzMjC+bvsfI33F2pVE//VPZ/WomEl3qWcUyOIg2TdMZP6X5XOO3EDTfu+LCEOE8mHocIIc21IojHDjBEmIBYPrsZSiydh9vU13vRNVbK1AQRyfD0RCF0XXoz5UzlgbruaFfbyLSmO9B2I8UGdv7uB4a3E73kKo3CNThRKRUkO7knthT0F4dIPCg6sIDiWUSoDBtJEGVQLfZQ3+stx0p8n2WKKGNKPR+vEFZe2EbFhTUVX+7ECBhs/OrmDGooMnkpmoxygcqb2kKARhqCFrKZcvKw+KEFuD4LdSaxEFPD5ngSVmhd9pVc4YOymQJZlqMN+C7kxGGIvycLS0GnnCg6l08kJpI0iRu8IiT5FGbjRa/lzknr8d4wf1nmvlil5XsmlIZYD1JYaF3Ddls+3Zp7OPPCH1xTuMVBu8Lj6V6wSy7PYqeOW1+8uNyfKveQBuf/JqomJHsxdwZMWKBsuXIzaDGoUY5JXT3xCqGzNYDyYt3r5lEP+YkzpzERWs4RlvOIkuujFtWBVmecinVMlryo2LV4RMHZtGVgJXYokctxz7+vvm8GnfJY6MA7Gwo1Sj5Xop2GmWPCGZWtyFxb9jPvUsFsfjHpg8qjhpJ8oXRYm5yVQ9SrwnGaBVYwXhBBqyWus1f3+wjQhpmehh9lAtFTIWUMMQC5i0rEQWPxichY4/fZ0Zp3f0Wd9hpP53c21HMl8WzxDznJfAM27VrOGAczKIE/LsXBzVQ1BZquCZlbf7N3zt6/68wsWxhmeVM6rSbxeFH7ulkTFWC0DSKATA1SUDRJnUwyJR4ZFlrinTGXF3+ZzVv+u229m0Qfv3Ku3Za7+M2/B8ETSQQhi6OHDAzfAwmmEnPgKHxNNN0km8kgO/ALoUS4JGLTancq1/z+pidbZBh421NzOCU2N5rJzbNzYagQGoejFjRS2eVglVdAmCQzRWiGu1wDfJz9nMMxzkqWP+bPJEAIBsnYnvNgGWqjdK6mBfqLiCT8lA9qcjJF4SxB34ppPmMsFDppBrMbF47gQrIgPDfFyIu/zNBYpHbxRjNah0CFNPpNr0XMseyKcyAVTGf4ky7iUQi2MFzQ3AVY5oSmiqxc5SpNMFwFUK43Xo8GWXj0dw1SUcvvvnwc6eVknGqZ6HjqtEcG/yiYQ0zVqd0aE0cDC8cwXoF8sf3zCpyyKyKoWcxkZt1VLetOuN4H5IxdkSV2QOuZzzHGDvo0WKdJlP02IZBAObKLOIGcF4uvRrlx29MEWDlZNUKlpaAF1N+LXhmDsRVmDMl1gQq0EkgaY5CkZQ64YgsBNa4ENYKzMqFngrPjR9JBNc7qusIN8gA6O6ftpzP/+8jlusq54OEaaKEBj7wFBGeSe0Ttymf9CHQmalwn33QzghoX2lpy/CxEWxVTIhQwJjPEeERm7NWwJjCdlsdGWsfKpmhdcZqM6f90iO6HuhKc57gwYRNJ9L4OM1aITz4BKqOpkEArImFuZAbAXxHsfrNNpIcshWc7E1YehmjTV8yN1q5GTmOofDfaf96DiBUkz7KPzID9ZURwJMJAnEYvoOMsuBISjCOzs2d8G4ImzPcmkkRQymnvm5iIebaKGbiQ+5FIduNTJ3Ggbk50CnR5Kg2GIKEHJILb/ceiJCZzl0QEISCeXmL00vsQMzFKR0uAyo81mlUK9+xwoXMOFnup5FmmBa9LvYgkndWiDpFnzXncsP2wu9UeTCqqwZXrQBSABCq76/i3NI5gouTkSoaCwMyJS/FaZ04eZWHQJ3R+YG2/f46OSO4yCVYhb+UmLs5GzCPjtOD02UOL/KNCQo1ammeFCQAKWZ3mPP+7E8UXKgobw344S0Fx8eT8oU3H6b1TDMXWEOW4smNLy+I+hRo9xRF2BwD7wIjcSh4huLgKT9AKZqG3p/7Fej9roPsYQ+9Ujx1hicokdhQQO5RBMQk9pYhomf/EL+GgtZ05VVYeVGpr6FQdKGyI1XfNrEUN//5VhBVvuQxGM9nlqUQuopFDr0oJEDRC2+6W9m/PeHkQnhZCCh6OJ7iZ6okZbn02fH1VOFIrNu11KMsTKK2VbRCJjhahIiVrEk2jyrq2qze22oLCovFeglXSz/HjSsV5FLbGE3TOXa7isYMtS9RWuEdFSXRN08z1SibMpjEP02LIa+nSOd0/nHBXg+PcZmGVntcSAuiv8zm1CN66H/euLaDAhohehoKrPa7LOmQx43GxcVIJicVT/3qpbd1oF6YhHMcLY7yIwXIfV4RRiIgxL68hWt9QeMC6rHBS8GTZ78wxZUDxdaL/Mp9SpCXGN0jZQQSovVziIzuC1RucGNu7B2a9h/6a+pI3SagkVOEbgwm4rNwRpMtbNpObSumBlosDQomqTQ8TOc7u3PbSieLLjmKhqaEWX1NPZAlm5uit5tCQkaX7dgf8kivTnV1PSa3gLMCTY23iFpIgNY8Lifa37tjhbVls0VbrEbiYzBMLSyllDqWyRLHUbgZZU8+/EHeIAY38om5qOK8ANULBurfKxnVhfDfaucoWHNZAg2Vc8RrjxOGSe6ma5lyxfLK2fqiWvTnPXLGFpQRpgt22h7YnRK7K15NvvOhwq1ZAKeOSHZeuNWHEkt3GaDzuttMoMusKXOxA98/p2pJBMEC6WDKEWAqp8TC2rZYsAr7LjUCpRm53ndKETyXyar6xgKHSR0mU5yyKOW2p3nYeX3waILut0g19Emkqmo97vA/b7Mw3XzvTIobeuBpjxwUHVNDuQvwa6EiOfvFMfCZixcv/SA0MkFxfF6zbot+eQhmCNudNfWXdS/8/tPzOGkKxIbAHYrqBecrRYWYSHgqYX7c5dPl1KGx+6H7r9ilZVDvP7PUKBqkkaVqB0ecq4XEr0032ozWfBAXM3xPg3x6izMHeKLoYO0/XRjHcnEddBRAGM6EP1EfewqBYzN1YilCVeCyhAqOTCfkEJM8TsOCwWTd6PjY6xOmkeOCDFGVnEbFgnh9+4ZplRng8+gBaTNe5sWwAzYG786HkEd3lybjRwqw2kkDVla0FRmgZd2uQ3NsaUUsoQUpiMwK86upcnThS2xNrbYfc9NvRF5PvpqGSIi267GE7I6WjlQ5gXjx+bOSUouIsPXFa0baRcXuvdNXLjh/rCPo/dFs6ouHF7bs8evNsDHUpWBI1jW65mhTcvWzqlu000YCsviwsZYSYda7paKBDjB772OODEb5FZ7w8ZSQpxsqwVp7yZ68ZOfmE6QkcutuVHgGn3/tHENX1ZPpqJHtsHtkRAzRS/9hyQaHNwOofWO4EeTd4HoNXldkgtvOOqwuQd6lofzpR/NcrjDgRj4V9k7VxFxxhbFeomx24zdTxrstdSMjduwR8MOmerJHkAV8GlM3Gv1HIk40MlQWR1JCdWBBSQAQbr3T8huv40xMcoTlG0sDNyKXNsk+XaRD2kEQ6NI22OR23mQ5mbrpf6IdVbI0MFZJVHN8TRyeaSDe53pDWY/8G02rTomceusZ+4hcEaiqZcAOPQMgBSACehOfnxwOa9POloPt7gv2unI/ua8Fx0kJmBR4FpGJYqQSXXgf68aORVui5Z086M+9DRDPTiiv1TJz2+FTqQgahiJLG6f4b3GbmAKGxqh0m+43ipm67DQJ6hhZLqe5O+Z6G1H9RxTofAv60TxfBeCmIM22epwdDkQXBmNvYVhrxOy7nD6HTb6LoD8Ax7q9oN7KSdwaKdKm6NL0stY7wLSQI2rMGZmNakuGOcURR/yTaQ3FQSgUG/xaNI1r8hCQYHxvFLJOlSu1qawHOM9MVvJ14jpKBKFJls7DtQMwiboDWCUzoIIWCljClz55BT3czw7eSWCQ/PMSndOnZZ7zZaHLlJVkZHhXcf8fa8gj3THpG9YweKB2dBadBEA6GIWgSh9nkUQJoiz2sAtukV3XZKMnCGwfD/TEH6l5cCJj1Y8sRWkxkqj9nXOiSLa6H1v/XPFVY/K4KHn8QB9VOQf9PnLac4lSWqnSi9EYHI9AICHGNbrzLR6j4PluDQ/m2WMzf+ZApnAOtZXlvxPUI7XjjsQZNINtljITmvPzZINlIHnn4/z7ABI/mwrhrx5aLrjnZ1mfVQQRsptJw75DSMWIqm6HkCOJYi4JaVoeZcCQC3DImyLpsxQo3r3ow6MkbMd153qi+1RQ+wTCqKUTIQDRX9jSuTqakL9zsEmZZcOjiwW1x1hMhYBix4U2uWYFuieS/2aJsjHWxbd33PLooi4kxX9N456b0ZniPyv7jnUfxtUnnPdPWHTsNHQXBu5uw5H8nD5tb1OciBK0YWHlHSBMwoDBiNbBp6QIhmkHbYbvEozkxcLsxt8dClXuZYzgb1fD6zg3Gj/qZQQRkit/u72AUmhqhoI0O44ZOtmkwFvVCLI6bImL/ipKP9mYoapxi3BN5KEYwzos/ZvbIzLwgKF3FcxPk+x4mMDppCKQ2+SIW15wM/PQKykheoBUOftw1p2KFeJxHi5ddYOGjXInf16HcLNQkPMUM0RP1sxZN2celiyd5kWySj54+vgt736483oUxHQQiK4lAMhB/i2SgfNzMBVJpxVqi5PLH6Q1vWSxhdiPj9dm1t599ZtAKiBPCAG0TVIqfg72zEj5ZVf+HsGXuihz6IPQkaOidy4hVbzhjKc8pnfmsKynuY7NhnDfNaSw4jFt2evvcWWd3Dy0/shW/XItXhxGWSSc7crVtkTP1WnNnxKg0sp6yxHOuPTF9erp4I5EOsnrDTLQuZaNeL484zfrSXtLw19tpoNrV5bBsrXpuxvuqMYwX5xksYyr3pCAPNYv7KJVkK11cjWFwiQlaDYHfBNQOFhwPLHai0oXxTACy5uwZ8ydyrSz9QY5QGvliSLMaR2NP1hrCL40WoVa1mBM1huQ8kOWksyWWgHXAH3dba1kpLTSIvq+UHMVr3N4PVdPB/h0f/aCRIKe1f7HXjE1dqB70NZwosaIp/0Rc2sK29d3f9skpM6SXO1Buzh+u2oOAeTEJzSRjQITEfsGQRwbWNi3u+VxXe9COz7ta338ado8NyWnyUs0nw5kXB/pTIqiPW55gmRHxinH9pXWLhn3cggJuzTs6uyOiF+j+o5TXoVNDwD/XJXobY1inRIb+Soj03sGfduJBFmXNVbohTk+RW5FxnMzpkv45WA0q1jBGqs2tTZ6jlA+dkega+vNc8SRekOTBQL+5wzd7X6HqzaE/toBXWJgenoELTTgkLVd9l4JMKtfuJP1X8lY9JKuqJ8LaAtyr2oRIPM+bAiMGFLC68TcKCD6cdGh4SdqJnf4r/NPCw5ShXv83ekwY/feJVV8U6gmuA8kvzK2d6+E9rO2DvkMCtXzkrDjj63WuyeB3QhjE/LQ3sJjEL0MoDlYDmx/HPTYKphYXpPD2yVVgzsxQy6Z/BHPqxzPLY/nO6xvCsJqHf4ZI2gaPCIztRzOuKIIElepgIt5ITMDqJvYacQxRonswEgtcCOSl+51v8rDrqBefGO9nEPniQ+PKLKU4n+fhzAX1QP0nirzmjS/vP8f8nUhBnv/z7o+zF8fMl0ckAIjgE+ufALb4Mlaio/+r2LIEfvwW0b8Y8eQAb/u77wHcp5F+GMC5y3g7xKMLAtxmyB6+M8AzGnBOwWUgoJiF2MOiaRBc88TM73jtx6uAMDO3RpLUwTV/cGO51ixgiEAdbz4pBKbgmkL0XEHZWIGtAOB/o9SMv1RA66jgZvNa6q9uLJ+kXIpErpR/rmj9xGk0Ub/gtZd6AHDrPktrkTYT1G3+WfGWJaYm8kL4rQp7bgkrEYD+zGN+UrQEuQy7q6LIR+h8IymXV0KieX/+Wx8+hQv1CTamcxuXnwdCmismOogsQ2BC4Yl4zCJBufLMC5RcUDRAawe/kjFiCS6GdL7JjI/kSghbzGVkhPOCXyeQ6xM8PlKbYdxkiZtVxE3l3Hb0evHK0JJFYlPwKMO2TuTmFLcynKgrXiSr33mXsi3hNyehSKuVDtyBmBGxMmBRysYN4FkqlmIF7eAAD7NSsHyqrRJTrOBciMranSGyPM6DWzF82r86hOh70Sd/rDDwiw4iChK49XEU+FUKnP8ot8oig6AihIz+CqBdpYK6sXWgAflDBiztfjkvLCivO6PFasgnULE4bhV+TrJ5GNXA413v014xaH9ojy+4YtDO1DXFwPhHBtEDyCH6YJ0H+xkHErWF6BNf3AJA7yS1D1mtPPix+DYiykrDBMdevJ2HnkKunUHzj4t9hqwHGtCD6AN1yBRw5gMt6vaAHkL/YsGCdro+Ri9VHNfMPRjXyBZyiWxUlILoSkYgbTN8JsoCLIYnsBIyIXfULADshm2QCrnQAovhCYyDlTALyuAGnIhnxlvLQYGji83p0vOHP3fYcMzmmNA8fZNgbIi5cfzOPbGX8RfGEOqwGMm8Fm69ZXOuG4g7P4eLPYaFugV1r+KU0iPQdnCPOn+qoGn4MDTikHOPy1wSMX68gkHw1uo0wmMFcp78l2U2kS5fmxm95s1kgOh5RBSGOndBc4MigcDSuUQEnrOQbzgQOH+D5zuViXznKXK53NouaPzOq09hPY740NKRCxMXNf5tOM2ynxmU68R8nwceAOR1fHsON6WvapoaRJQvAlfuLVTI/BdgbEJ9zh+NWoffcVtbgDgVZEOb8XE+t4h83DaZ39KAegTT6W4CL1dY46jbS7rV/OqgyIrbxgoJAuosj2e84PNioqYImf99FvV3wTw3sxyjFOo6Y1aEPHAbI2btvEDKhUyWwIw4yHwXM//xaoaYhsKMafDtEzr/7zeRwJ7xyJsiLv0c+NYZV758Y0ZhZOJQdigwesQvYlACSkHvtIJAzGJwdSChsOQUF+LFRsPYcnaLqZ80CW98OMWrcUbEhZJdXyrbqk9bHcDd1bhDAQa/7dY/AmYRXdYzhPKA3LlEBll9hJDjjTou/DIWj/nBZcbK6mn4POEOF6IDBxjbLq13cHqQ7Xpyvr2C1GTHYiFk5pw/Y93KkKT4+HKz4DATaWRW4s4q6s7LpXhgplpe5nsx4e9DvaknxgKApiMGdUmGm1Bvw6oLoFWjavMtn552VTZM7dSEkO0zYQQ3TAR3yCYOawwmnuvMF2hM+9sk8ExnEqWNyCRJWxKTgn+sFlRo/5i0a39Fsdykc7rvahNDvu+3tmci3PevABH9IGWrgWsTwrHShNGdMBHe7pk48pGYeHGTKVCr7TEJrPlgEq1vjUmyfhpMCv+jVVChHTRpN3+3RDDpQu5bb2I49z3y48tEv+9PwZuvG9VPWtSNxVkxx9Xj1RPMJ/TuC9aKUrNxiU7b4vFkXgv+AC7OLMqsGqLSeqaYIzzR+3v3ciUieSxH0GAb8YXL76qeeLpzpaQlh6C0CHlCjnidH1rGkmgFlSZkkOnx+8/CazfZha+dig8iTsT/BF7ta1er79cA/VKCkUBvSaLtG3FAPd6KnS1MfZNI4jJKqySPDrDa8nxO8EPYQfp87NqpbwxeLlc4u1ytns+tRVxoi0CxIREMwQLZXC2UvHNAnNArVeW9GnMVsaKlYAjqldI1Yw9HyKkaNEZjiiS2ntN2PUlHsaDNPLsVut5bO3+NV/8dgcuF/3seNHEBcMVDU3onXZ7qrL7zWXQFhegmKpdJbAOLD3GT+pb6CplolFocWbBcDqYnnN0KXYt2/hqv/umiw57/bfgJL9AVD+xOspyomSVHPaV08TtwngB4hoiJ6CX96kJry0DPW4rl8LgT0Z+WSsdZ+QdZmpMbggSLv5IRkIhqoLEKAK8PxbYi8YaCy5zVHLNr4Hq2zX5KOp26Q/X4UMKsp8Hkjm4GBb4LRG21pBAVa28XIqb88UGrxhnFJB2s2FNrpfanc5AIiDlvZ5pHIRtLIHN2bm4+sa8Ase3NpljTq9/Tcphalvo7/fxFtA3g4tlbXOwB/dOjFz6NwnT2N0/8ssQ7mXGxAdSzaRPHR3pgq6VWMf6sPlf3x3CMPeewDjxSMnlLraxOa24y2czigjPzbufI/WCVzLrBu3RxSw0sn9uSH3hA8NPPHM59N69bGcart+Rhmq1xULvHzdFNrzHccTC2pwKmIaF+WrG6QumKPV+T3QBPeFV9AOSWFRs66KdfktMkc9SFYi8GddoHKSTihT4zcZTtZxTmJ1VyCq8TYMGePS2GCCBtg4vWAKumbWm0mXRsmH1yO2B4Y9KulIHCk46P86mvW6xkHrP/sAf/S422BAFEqjIVKUhyyBQDfzMWKdew8MSHpU6JWoYywNY2SFGPgz6zA/Ez5adk9wgXnRWqc2Citdd3R5H7iepOyu6DSAvQMlWpk6gWHjA47u1BlVOoS9FqGJtJzpJyAXQHymmyTVVROYLxPE9KCwMilN8p5cNaEISliwZBGQ2mtPMm5VbY9RIEhHPC+pv7BSS/FwxYWo3SiCNAfgVSUcVUQEROgUiLnr3GmkQQLoQB7EWW4NRHDyT1mrw6xkbkPFKBefUtNHDF4LPo2faD1TjzZuwl6rJ/KpEwU5VYIIJ8wZzUkOqmwmQZIRypvBhmY5QyKtnZQFMFfAaF/XcZBz+c0qAoZ38p/Npb+a8IVM1JLBQCxQf5MVQCzbZsjO69hO9wF9h7AW00e6N7DOSkz4t2rqMmv1ei89ykFGJ7JGMvyinERVKX3xegURichoEL98bei2I2DGb2ZUN+6tfYr6ED8NC5FRaQo+jwwfRehPSmatyFwaEz/jkoPnNwI5ZuMUso26NKAOvYWs/WxA47DkjNSEhSHZHMe/VLTZIbhRchdtvZex2kxvOH3GstbUnjXY8zysIdplSa7LQAjtsnBwqurfS8C5JVmaehE13tKhgV7F+S0sIrR5nsS2shh+V3AwIKVQfyxE6SSEYvIDDOxkp2kjH+GqggckGZRxSMxJSekBmmqXKQqWnSaCA/uDLDClfi/OGY0l73jqV7ChRCvcv39Gp7O+l9LM/KY7p5L2OvDDNDLki+IbUdkSmHH+3A3osPfsgTGMz4ZzDgz7mQ0NGGumjluVJizarzqaW+kZdM1FeEdHZBp7HTjkNe7/gjlVsImw9ugSk2/drWM5uQewLl/nCi9xntOjdH0tsgYcRVEl9UECPWa1uOTqhbvwjLhOtMp68PKR8oa6vu6KpRF9JQ6SvkPviXk155RX/DWCFp0J3tgezkeZ0vLuLuopVxrYZQVKSOUzhfwrxJt7elNNKjpK0KBi1BJq9C8vut5u2O5E7aqhGO/6Ra3IU+44MqcQPD4eCSHMqom7ZASIDbYAqSceI3Gibb1TI8ZlHJAq3RcPQmucdtCy3mlhyV8/in7y3XdY26al8Q+b5cynnzB9BHYCUTsX/vh4lJYoTjbHFPuNi+GTe3f+JltsTnWMyz/ZjmaUD587gOY0f14u1qqLHFmvoax7ugap2rLoxcxVx1HZv+cgpdY0iO+8RGrK9l6ccQxMIGgwEl9N53Eg1HMGNIHFULP+JuexwqJmNqnvKMlHc34NAoKUhn7CMxpz52k24SFTHvsxP3nTtsMBQIUrT3bcB7my44ZTfP/RNPL87JQce5tnV88INXarIaL4+DQq7jEn7D2oFdrC0KsQkT4D1HzuQ1wkylx4xRKaKwxjan2426T7l9D2ZYg07WfMz8fe3uTfJLd22P4l5gxEzghs9TDRKuHVqD8/pgnnn4tI3dNrkJhGo+7oMKEFA7gALohzrApiiAMVeazQuKQIFsEh1Yqa1NK7AqVN4vrrz+X7C9lfhKOJLGPExxtPXYqf4/HYqd+JKmfUiFcULTOeBiPX9dJcfknApu5sr1IWS0cyGHndd7m8CJeqMDAxD+8d6rjU3J0G0/eOPEd6QIa00fRLf+0d7s4n7Wk5B+VZze7OG6vTIcS59jB/e5dyico9d1AeWuh8V7W8/C/rDDLgZJHet1yAd8RIPBnLn+ox2uc02hGet7EMdTkj9Mo4yRUEL1hJRDSZbNPvCBs/axQH2gCF9Cir4dBgeBCrx5kxVZ8UKXLceo2ghUd4kqpL9sYx7ysiOrQ5m0qWDqXfBmt2+cZlHa2VwpF7mpyHh7TcvnkcDwBwi+LKNRmDB1e+vJD+5ToI5pl4CCUOQlcHGXtVd2d+qRLAwdtZeoza5DtezKH4FIK+4iyE907RggsXOQQcnRw7Th/JYVN/vx0j7VVFJ2Fn0XlA/Mc7V4ucmChnUOGKQ1AOp0Y4ndmcrGMID8eJvkIxWlWS+lBdGb1dZ7kBkzK4BARR4VdlyBCZ+r3DMFlohULG3Oypg2cyAO856CeIPreUDOk3zNmPOSLNeYXe4LoN898UjUPccZA9VlIPEDsmm0o3ANNX9ElUgGDkkfNFVlr7NSFdmUkZAaUvFz5xhunZvbsH0FKGeEKfSgES2vl7FoG4D/SNsZhH3g6IVmuCdm8hjcreICV88IHgFz4o559ltOYs85rAMP0gY3nsCbiafhRpxF22COKS8s2ies6Ab5Z1TIwxjClxw5v8pnWHge60sEuRJt8VQRRVw4DwHLIH+xrGfxYJQRhbwvWNMBKgZKAY4w0cCvUwb5NrI6gF6NOAsmkXKf5YLOIKGmom2AAmRpSSRXERIRi1Rki/EikiFUpzUnSgNjIzFyyASocyBKshUIJ02nDDyK8i1Sk3qxkoYRZdqo6lAJD8iyDUQf7/KiXI7DlxSoiQulkWUv3PJK1Hh8pVjtgSQSrBoJqlBBi4eCAlyN8MYak3Mz6DmjWph5zo1avZULk/Abqmk5ISx4S80FJjHj64jg1FdKMsROMcmD+56gjhCQUQhM4l6n0gLvmMCjSFh9x8/Cr3XV3l/x2QgJG6IxozGUzFUhVTth348uLjLzcCPxhBeRygYqw6BRstM1Qalg1MLkGel0JswKQyhbI4BCXwhxADImDb+kEGW3ouQRj3chF7JWUOtGDe2iw8xd9hrU+HrNvopIYBgmo0G8M8oMlNy8tKtF9s+LQPS0sMoIrWVG0jNlFUWlKd2sncKvhkGM371Y6IDUofQrEqEGq+Ai1aRhgHlpX4h+iX42D69HaO+4T4ZVOEf60hcmBIU7BeweVWVCRL0wWWH0PC9dL5qb53GDqUreKIJVwmuubAynBtHKY4MThsdZY25Fu/7sP4m7gGFRhzAYm7rzqcf6AFwVszKVAIu3TOgmwe0amKhA4UscgJonoxLoQkc3awQXdM7Tc3ASCc97VRSQn4IaGmcdnVXaS/DyFTB6K6lEOsZ4BKYBM2DY8rJxRCpdWk4JK8qUKThtFOpWfOMORwt0kpQGTZsLVtv6FwArR+Unprikzca2XSr2o/egtgMekAHRNIL7Z+oJZnwY1HXZkiwdX8ZaQCYeNuBTEh0nW5DlAd8beUVMoMoLGXDokRzjy0G1cj9JK/m2MEEzu5KQaSDAQxxwmJocHMfhae7QCiNvgqabuPPw/hJepqbEzDKRL4DJ7aTCPj9UGbK5OwG1FNbRVYCmQoj1GCqlIkGSEaGeTzoNRUipLFqDSoMSgzcGGkEiH7HV+AeNJDUPOEOrsH0+wrhYdjppDTTLIEtMo97S6mrNdZruFzsFMzQFPtG6WIisprycUNpwdxR3DkrrvpDkrJ0ozj+thQROedSkTBgOhPCi+IYvhSkUtRziWVML3PxmbrrE6jatmeCMeXEgbX66KegzFFRXj/In5/EEnwFxgCRfcGGNtr/CU/JQ2O76IPAuWAt5F5iqkHs3Z/gNnRBugqBlUCLolKgaY61xtGZGu7UScKrfWgKc2acg3Xvfink12K1JL/b/6iTLnl+p4UO6ZFvsZDa8wxQfCaFH9TfDwOXSHcVPRt0K1V0GWDUDuh2HeWdSv3FtC2BtlyFhWfoTKAF4D8RqlydhtaRP7IYwCv1wi8KdpHZPgbXH43ccnT6qTtK0wxzSnSVQ7TTwISSnBjGMjCSSDG3RJVrheJhXpMtcWHsY+Eq1U1AQckq7Jjp8y7UmbmIXCX0rxB47y3CuLT3FE6nDxupJ6dTmu6k0JYQO7YnxxLvJVi6nGZxvpkPSHMLb5YQDt5r7Yb1Jqqfpm3tSg+AXUx8tQ29QN+bjlGYWuwVk32k5XhiwB45sgsj1uZ7Dj8Ndgjn7Xf8yUv6J4pDgxw079ZdxzTBak09+8I3w4//nELirwrPlrDvm53huZvsnF1sbGPS6baJBM0xx1D1LrPPZJ18ss8FpJ21UpFifEmeVOuWMi2w7Fl8oc5VuR68Qm8zu3ul3wzXXVSDKpzPVSJWq1KhWa8go9b/YSzdq5h9Ci1YvjdauzRjjjLXbsAnG69Dptbf2Au/YAP73E3nHemCdX6B3EGSJrAgkQhKRl+8zQXv3cSkoKmHKFBWcSlNVU9fQ7NsQg4cwRdiy0uWh8LhZG9v8OpR9J0MjjnXnh5+VbWVtmD3flWuBQyebI0+PlTv7rjb/XEhlbr3x1jvvfSBIkWpgXSekjw6OWnAtRwqhpPMbPo9jNrI2NTO3MrbE6FEZKkU9gdPjm+YJRBKZQqXRGUwWVw8PM8X9ZXQ9sq2Or4ec0GeIjdDOkkfIHhb/jPU1PQho1H9Ye+zNZAEIRoB7JIQlPctGolGeyuQKJRYNF71H34PRZLZYbQA+ak+r9rUcTBrPU7L+MsDD4aMiLo3qKD6srk+3H6IcZeeBPLrJPO2djy32y7+AAjvN3AH0cUNY4UV0n/77u+hiii2uEalSp0mbzlbb7LTLMdvtcFyXydVn8LsTDjhYY6bMptdivn8ccrjxJZRYUslZs2UvJUeppZVeRplllV1OudZY6ncZesjm+RybnK5vgCwhZmfRyRXnTyG7iyYmUNU0Fp19c3+9UXnUVab9PrqYFqtNOe2c4e1MFHdr0C3YOSq/xBZRWs87eZ79K8KlJ3hFeY6McCc/DILkDgLXcv6lqncBUmtlN1L7kV55kfZb/eyPVJqLyT7nNWm62+jbps8LFFZJftgR0i9EYuFL8WXkX0XiTl+5r9wF/pdKe0hdAcuOvcD2Llyj502yEkGMRXsxCcppT9qrwfAIVU46pp1XKOSilgxukTOczHVBUSxQMhLqXzZqjrHi9Rh6Pnar5gzGvqlaRwwaUcTXQhtM9hOmqpNUmNGUSXtZV3pgYeOZpflgW5nJgYxBZmLoQybxUR+Gz3WbxaRlKCnLLz0UcPXN63GqvlMmg+9jJx4q6n2JUx6M46WTYTwNrkWm562eKsq/XnnjtukMOSdV7+eS4iN7j9H7qTzWH/vrk4/k7/R5uqRtkxQ3gymX5r4Q/rnOy6px2mwpCvlSvblcsWjzn/UlY4Z0vi8aNl6fSnryn68Iz96UvhoPTKSZUnBdNdmOiYqaono9dm6e+yMgS2i53YQdGwYmP3rJ+3UaYwHSZsiSlxW4Nk2UnzFgQ5pzdBiicIjeCvL1F9FRxHEzQSKqgeOUHRSC+fjYRNNN+Hw0jfF9135jND+nWKRrhke1yZuiejsOiyMimJ3bdQ6yL5XEo2M/WFxYW4iTaIMM+WauSA7RvSAVp26si2Dt1iKYiFmWweqtotH3QaVyzYjovRTGmlFZ1DKMqNCn4rEndk19WwMQYYKkuOkMJovNkY+G3wAAAAAAAAAAAIAQQgghhBBCCCFECCGEEEIIIYQQwhhjjDHGGGOMMSYIgiAIgiAIgiAIgtDpF6nrmqIo3cNK1/uaXR7aiKS46ZylB99cLgyOL4o3DZcYZ+Wbaj4rx7HBdzvl05tFp2SbzCkCTE4fnR2n2SzhS+d5svN+QfZcvjE9Zd77+efa4ZpH+zTMW0fksKta8t/+IrbMbiXfdKXafwSrm1Va3TDIadcoWSgUvWfsOM3kDr9TbHXlwz243Hqee6dD9lWZ4Pj/76eHFvG1+7PhMzSUW9/ff3VW84R3LvSrbAWy45pbP8gA", eo = "Excalifont", Br = [
  // Bundled — hand-drawn default
  { key: "Excalifont", label: "Excalifont", category: "hand" },
  // System
  { key: "sans-serif", label: "Sans (system)", category: "system" },
  { key: "serif", label: "Serif (system)", category: "system" },
  { key: "monospace", label: "Mono (system)", category: "system" },
  // Google — Professional
  { key: "Inter", label: "Inter", category: "sans" },
  { key: "Roboto", label: "Roboto", category: "sans" },
  { key: "Open Sans", label: "Open Sans", category: "sans" },
  { key: "Lora", label: "Lora", category: "serif" },
  { key: "Playfair Display", label: "Playfair Display", category: "serif" },
  { key: "Merriweather", label: "Merriweather", category: "serif" },
  // Google — Mono
  { key: "JetBrains Mono", label: "JetBrains Mono", category: "mono" },
  { key: "Fira Code", label: "Fira Code", category: "mono" },
  { key: "Source Code Pro", label: "Source Code Pro", category: "mono" },
  // Google — Handwritten / Casual
  { key: "Caveat", label: "Caveat", category: "hand" },
  { key: "Shadows Into Light", label: "Shadows Into Light", category: "hand" },
  { key: "Dancing Script", label: "Dancing Script", category: "hand" },
  { key: "Amatic SC", label: "Amatic SC", category: "hand" },
  // Google — Display / Funky
  { key: "Pacifico", label: "Pacifico", category: "display" },
  { key: "Lobster", label: "Lobster", category: "display" },
  { key: "Permanent Marker", label: "Permanent Marker", category: "display" },
  { key: "Bangers", label: "Bangers", category: "display" },
  { key: "Righteous", label: "Righteous", category: "display" },
  { key: "Satisfy", label: "Satisfy", category: "display" },
  { key: "Kaushan Script", label: "Kaushan Script", category: "display" },
  { key: "Fredericka the Great", label: "Fredericka the Great", category: "display" },
  { key: "Comfortaa", label: "Comfortaa", category: "display" }
], ta = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), sc = /* @__PURE__ */ new Set(["Excalifont"]), ic = /* @__PURE__ */ new Set([...ta, ...sc]);
function ac(t) {
  switch (t) {
    case "serif":
    case "display":
      return "H";
    case "mono":
      return "</>";
    case "hand":
      return "✏";
    default:
      return "A";
  }
}
function oo(t) {
  return ta.has(t) ? t : `'${t}', sans-serif`;
}
let Vs = !1;
function lc(t = document) {
  if (Vs) return;
  Vs = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${_i}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = Br.filter((n) => !ic.has(n.key)).map((n) => "family=" + n.key.replace(/ /g, "+")).join("&"), r = t.createElement("link");
  r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(r);
}
function Ke(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let r;
  for (; (r = o.exec(t)) !== null; )
    e[r[1]] = r[2];
  return e;
}
const cc = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function dc(t) {
  var s, i;
  const e = [], o = {}, r = t.split(`
`);
  let n = 0;
  for (; n < r.length; ) {
    const a = r[n].trim();
    if (a.startsWith("<!--@meta")) {
      const l = Ke(a);
      if (l.background) {
        const c = cc[l.background] ?? l.background;
        o.background = c;
      }
      if (l.originView) {
        const c = l.originView.split(",").map(Number);
        c.length === 3 && c.every((d) => !isNaN(d)) && (o.originView = { x: c[0], y: c[1], zoom: c[2] });
      }
      n++;
      continue;
    }
    if (a.startsWith("<!--@frame")) {
      const l = Ke(a);
      for (n++; n < r.length && r[n].trim() === ""; ) n++;
      e.push({
        id: l.id || zt(10),
        type: "frame",
        x: parseFloat(l.x || "0"),
        y: parseFloat(l.y || "0"),
        w: parseFloat(l.w || "400"),
        h: l.h === "auto" || !l.h ? "auto" : parseFloat(l.h),
        z: parseInt(l.z || "0"),
        rotation: l.rotation ? parseFloat(l.rotation) : void 0,
        locked: l.locked === "true" || void 0,
        groupId: l.group || void 0,
        data: {
          label: ((s = l.label) == null ? void 0 : s.replace(/&quot;/g, '"')) || void 0,
          backgroundColor: l.backgroundColor || void 0,
          borderColor: l.borderColor || void 0,
          borderWidth: l.borderWidth ? parseFloat(l.borderWidth) : void 0,
          borderStyle: l.borderStyle || void 0,
          opacity: l.opacity ? parseFloat(l.opacity) : void 0,
          slideOrder: l.slideOrder ? parseInt(l.slideOrder, 10) : void 0,
          transition: l.transition || void 0,
          transitionDuration: l.transitionDuration ? parseInt(l.transitionDuration, 10) : void 0
        }
      });
      continue;
    }
    if (a.startsWith("<!--@block")) {
      const l = Ke(a);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      const d = c.join(`
`), p = d.trim().length > 0 ? await ss(d) : [];
      e.push({
        id: l.id || zt(10),
        type: "content",
        x: parseFloat(l.x || "0"),
        y: parseFloat(l.y || "0"),
        w: parseFloat(l.w || "300"),
        h: l.h === "auto" || !l.h ? "auto" : parseFloat(l.h),
        z: parseInt(l.z || "1"),
        rotation: l.rotation ? parseFloat(l.rotation) : void 0,
        locked: l.locked === "true" || void 0,
        groupId: l.group || void 0,
        data: {
          blocks: p,
          markdown: d,
          borderColor: l.borderColor || void 0,
          borderWidth: l.borderWidth ? parseFloat(l.borderWidth) : void 0,
          borderStyle: l.borderStyle || void 0,
          opacity: l.opacity ? parseFloat(l.opacity) : void 0
        }
      });
      continue;
    }
    if (a.startsWith("<!--@draw")) {
      const l = Ke(a);
      if (n++, l.tool === "shape")
        for (e.push({
          id: l.id || zt(10),
          type: "shape",
          x: parseFloat(l.x || "0"),
          y: parseFloat(l.y || "0"),
          w: parseFloat(l.w || "100"),
          h: l.h === "auto" || !l.h ? "auto" : parseFloat(l.h),
          z: parseInt(l.z || "0"),
          rotation: l.rotation ? parseFloat(l.rotation) : void 0,
          locked: l.locked === "true" || void 0,
          groupId: l.group || void 0,
          data: {
            shape: l.shape || "rect",
            stroke: l.color || "#1e1e2e",
            fill: l.fill || void 0,
            fillStyle: l.fillStyle || void 0,
            strokeWidth: parseFloat(l.stroke || "2"),
            strokeStyle: l.strokeStyle || void 0,
            edgeStyle: l.edgeStyle || void 0,
            roughness: parseFloat(l.roughness || "1"),
            opacity: l.opacity ? parseFloat(l.opacity) : void 0,
            startPoint: l.startPt ? l.startPt.split(",").map(Number) : void 0,
            endPoint: l.endPt ? l.endPt.split(",").map(Number) : void 0,
            label: ((i = l.label) == null ? void 0 : i.replace(/&quot;/g, '"')) || void 0,
            labelFontSize: l.labelFontSize ? parseFloat(l.labelFontSize) : void 0,
            labelFontFamily: l.labelFontFamily || void 0,
            labelAlign: l.labelAlign || void 0
          }
        }); n < r.length && r[n].trim() === ""; ) n++;
      else {
        let c = "";
        n < r.length && !r[n].trim().startsWith("<!--@") && (c = r[n].trim(), n++);
        const d = c ? c.split(" ").filter(Boolean).map((g) => {
          const x = g.split(",").map(Number);
          return [
            x[0] || 0,
            x[1] || 0,
            x[2] || 0.5
          ];
        }) : [];
        let p = 1 / 0, u = 1 / 0, f = -1 / 0, m = -1 / 0;
        for (const [g, x] of d)
          g < p && (p = g), x < u && (u = x), g > f && (f = g), x > m && (m = x);
        isFinite(p) || (p = parseFloat(l.x || "0"), u = parseFloat(l.y || "0"), f = p, m = u);
        const y = d.map(
          ([g, x, b]) => [g - p, x - u, b]
        );
        for (e.push({
          id: l.id || zt(10),
          type: "draw",
          x: p,
          y: u,
          w: f - p,
          h: m - u,
          z: parseInt(l.z || "0"),
          rotation: l.rotation ? parseFloat(l.rotation) : void 0,
          locked: l.locked === "true" || void 0,
          groupId: l.group || void 0,
          data: {
            tool: l.tool || "pen",
            points: y,
            color: l.color || "#1e1e2e",
            strokeWidth: parseFloat(l.width || "2"),
            opacity: l.opacity ? parseFloat(l.opacity) : void 0,
            fill: l.fill || void 0,
            fillStyle: l.fillStyle || void 0
          }
        }); n < r.length && r[n].trim() === ""; ) n++;
      }
      continue;
    }
    if (a.startsWith("<!--@image")) {
      const l = Ke(a);
      n++, e.push({
        id: l.id || zt(10),
        type: "image",
        x: parseFloat(l.x || "0"),
        y: parseFloat(l.y || "0"),
        w: parseFloat(l.w || "200"),
        h: parseFloat(l.h || "150"),
        z: parseInt(l.z || "0"),
        rotation: l.rotation ? parseFloat(l.rotation) : void 0,
        locked: l.locked === "true" || void 0,
        groupId: l.group || void 0,
        data: {
          src: l.src || "",
          alt: l.alt,
          opacity: l.opacity ? parseFloat(l.opacity) : void 0,
          borderColor: l.borderColor || void 0,
          borderWidth: l.borderWidth ? parseFloat(l.borderWidth) : void 0,
          borderStyle: l.borderStyle || void 0
        }
      });
      continue;
    }
    if (a.startsWith("<!--@edge")) {
      const l = Ke(a);
      for (n++, e.push({
        id: l.id || zt(10),
        type: "edge",
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        z: 0,
        locked: l.locked === "true" || void 0,
        groupId: l.group || void 0,
        data: {
          fromId: l.from || "",
          toId: l.to || "",
          label: l.label,
          style: l.style || "solid",
          color: l.color || "#666",
          strokeWidth: l.strokeWidth ? parseFloat(l.strokeWidth) : 1,
          arrowHead: l.arrowHead || void 0,
          arrowTail: l.arrowTail || void 0,
          arrowHeadSize: l.arrowHeadSize ? parseFloat(l.arrowHeadSize) : void 0,
          arrowTailSize: l.arrowTailSize ? parseFloat(l.arrowTailSize) : void 0,
          edgeType: l.edgeType || void 0,
          animated: l.animated === "true" || void 0,
          animatedDirection: l.animatedDirection || void 0,
          sourceHandle: l.sourceHandle || void 0,
          targetHandle: l.targetHandle || void 0,
          midpointOffset: l.midpointOffset ? parseFloat(l.midpointOffset) : void 0,
          curveOffset: l.curveOffset ? l.curveOffset.split(",").map(Number) : void 0
        }
      }); n < r.length && r[n].trim() === ""; ) n++;
      continue;
    }
    if (a.startsWith("<!--@text")) {
      const l = Ke(a);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      e.push({
        id: l.id || zt(10),
        type: "text",
        x: parseFloat(l.x || "0"),
        y: parseFloat(l.y || "0"),
        w: parseFloat(l.w || "200"),
        h: "auto",
        z: parseInt(l.z || "0"),
        rotation: l.rotation ? parseFloat(l.rotation) : void 0,
        locked: l.locked === "true" || void 0,
        groupId: l.group || void 0,
        data: {
          text: c.join(`
`),
          fontSize: parseFloat(l.fontSize || "20"),
          fontFamily: l.fontFamily || eo,
          color: l.color || "#1e1e2e",
          align: l.align || "left",
          opacity: l.opacity ? parseFloat(l.opacity) : void 0
        }
      });
      continue;
    }
    if (a.startsWith("<!--@sticky")) {
      const l = Ke(a);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      e.push({
        id: l.id || zt(10),
        type: "sticky",
        x: parseFloat(l.x || "0"),
        y: parseFloat(l.y || "0"),
        w: parseFloat(l.w || "200"),
        h: parseFloat(l.h || "150"),
        z: parseInt(l.z || "1"),
        rotation: l.rotation ? parseFloat(l.rotation) : void 0,
        locked: l.locked === "true" || void 0,
        groupId: l.group || void 0,
        data: {
          text: c.join(`
`),
          color: l.color || "#FEF3C7",
          fontSize: l.fontSize ? parseFloat(l.fontSize) : void 0,
          opacity: l.opacity ? parseFloat(l.opacity) : void 0
        }
      });
      continue;
    }
    n++;
  }
  return { nodes: e, meta: o };
}
const hc = 180;
function zr(t, e) {
  t.push(e), t.length > hc && t.shift();
}
function Ue(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((n, s) => n - s), r = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[r];
}
class uc {
  constructor() {
    yt(this, "enabled", !1);
    yt(this, "listeners", /* @__PURE__ */ new Set());
    yt(this, "lastTick", 0);
    yt(this, "lastRatesTs", 0);
    yt(this, "frameMs", []);
    yt(this, "cullingMs", []);
    yt(this, "hitTestMs", []);
    yt(this, "edgeHitMs", []);
    yt(this, "pendingCullingMs", 0);
    yt(this, "pendingHitTestMs", 0);
    yt(this, "pendingEdgeHitMs", 0);
    yt(this, "pendingHitTestCalls", 0);
    yt(this, "pendingEdgeHitCalls", 0);
    yt(this, "hitTestCallsPerSec", 0);
    yt(this, "edgeHitCallsPerSec", 0);
    yt(this, "visibleNodes", 0);
    yt(this, "totalNodes", 0);
    yt(this, "visibleEdges", 0);
    yt(this, "totalEdges", 0);
    yt(this, "virtualizationActive", !1);
    yt(this, "seedVisibleNodes", 0);
    yt(this, "nodesAddedByAdjacency", 0);
    yt(this, "nodesAddedByEdgeEndpoints", 0);
    yt(this, "edgesAddedByAdjacency", 0);
    yt(this, "edgesAddedByCrossing", 0);
    yt(this, "lastPublishedAt", 0);
  }
  isEnabled() {
    return this.enabled;
  }
  setEnabled(e) {
    this.enabled !== e && (this.enabled = e, e || (this.lastTick = 0, this.lastRatesTs = 0, this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.pendingHitTestCalls = 0, this.pendingEdgeHitCalls = 0, this.hitTestCallsPerSec = 0, this.edgeHitCallsPerSec = 0), this.emit());
  }
  subscribe(e) {
    return this.listeners.add(e), () => this.listeners.delete(e);
  }
  recordCulling(e) {
    this.enabled && (this.pendingCullingMs += e);
  }
  recordHitTest(e) {
    this.enabled && (this.pendingHitTestMs += e, this.pendingHitTestCalls += 1);
  }
  recordEdgeHit(e) {
    this.enabled && (this.pendingEdgeHitMs += e, this.pendingEdgeHitCalls += 1);
  }
  setVisibilityCounts(e) {
    this.enabled && (this.visibleNodes = e.visibleNodes, this.totalNodes = e.totalNodes, this.visibleEdges = e.visibleEdges, this.totalEdges = e.totalEdges, this.virtualizationActive = e.virtualizationActive ?? !1, this.seedVisibleNodes = e.seedVisibleNodes ?? 0, this.nodesAddedByAdjacency = e.nodesAddedByAdjacency ?? 0, this.nodesAddedByEdgeEndpoints = e.nodesAddedByEdgeEndpoints ?? 0, this.edgesAddedByAdjacency = e.edgesAddedByAdjacency ?? 0, this.edgesAddedByCrossing = e.edgesAddedByCrossing ?? 0);
  }
  tick(e = performance.now()) {
    if (!this.enabled) return;
    if (this.lastTick > 0) {
      const r = e - this.lastTick;
      zr(this.frameMs, r);
    }
    this.lastTick = e, zr(this.cullingMs, this.pendingCullingMs), zr(this.hitTestMs, this.pendingHitTestMs), zr(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
    const o = e - this.lastRatesTs;
    if (o >= 250) {
      const r = 1e3 / o;
      this.hitTestCallsPerSec = this.pendingHitTestCalls * r, this.edgeHitCallsPerSec = this.pendingEdgeHitCalls * r, this.pendingHitTestCalls = 0, this.pendingEdgeHitCalls = 0, this.lastRatesTs = e;
    }
    e - this.lastPublishedAt >= 150 && (this.lastPublishedAt = e, this.emit());
  }
  getSnapshot() {
    const e = this.frameMs.length ? 1e3 / (this.frameMs.reduce((o, r) => o + r, 0) / this.frameMs.length) : 0;
    return {
      enabled: this.enabled,
      fps: e,
      frameMsP50: Ue(this.frameMs, 0.5),
      frameMsP95: Ue(this.frameMs, 0.95),
      cullingMsP50: Ue(this.cullingMs, 0.5),
      cullingMsP95: Ue(this.cullingMs, 0.95),
      hitTestMsP50: Ue(this.hitTestMs, 0.5),
      hitTestMsP95: Ue(this.hitTestMs, 0.95),
      edgeHitMsP50: Ue(this.edgeHitMs, 0.5),
      edgeHitMsP95: Ue(this.edgeHitMs, 0.95),
      hitTestCallsPerSec: this.hitTestCallsPerSec,
      edgeHitCallsPerSec: this.edgeHitCallsPerSec,
      visibleNodes: this.visibleNodes,
      totalNodes: this.totalNodes,
      visibleEdges: this.visibleEdges,
      totalEdges: this.totalEdges,
      virtualizationActive: this.virtualizationActive,
      seedVisibleNodes: this.seedVisibleNodes,
      nodesAddedByAdjacency: this.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: this.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: this.edgesAddedByAdjacency,
      edgesAddedByCrossing: this.edgesAddedByCrossing,
      lastUpdatedAt: this.lastPublishedAt
    };
  }
  emit() {
    for (const e of this.listeners) e();
  }
}
const ue = new uc();
function vo(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const pc = 14;
function fr(t, e, o, r, n) {
  const s = e.find((u) => u.id === o);
  if (!s) return null;
  const i = vo(t, n), a = pc / r, l = e.filter((u) => u.direction === s.direction), c = l.indexOf(s);
  if (c < 0) return null;
  const d = t.y + i / (l.length + 1) * (c + 1), p = s.direction === "input" ? t.x - a : t.x + t.w + a;
  if (t.rotation) {
    const u = t.x + t.w / 2, f = t.y + i / 2, m = t.rotation * Math.PI / 180, y = Math.cos(m), g = Math.sin(m), x = p - u, b = d - f;
    return { x: u + x * y - b * g, y: f + x * g + b * y };
  }
  return { x: p, y: d };
}
function qs(t, e, o, r, n, s, i, a) {
  const l = i - n, c = a - s;
  if (l === 0 && c === 0) return { x: n, y: s, side: "right" };
  let d = 1 / 0, p = n, u = s, f = "right";
  if (l !== 0) {
    const m = (t + o - n) / l;
    if (m > 0 && m < d) {
      const y = s + m * c;
      y >= e && y <= e + r && (d = m, p = t + o, u = y, f = "right");
    }
  }
  if (l !== 0) {
    const m = (t - n) / l;
    if (m > 0 && m < d) {
      const y = s + m * c;
      y >= e && y <= e + r && (d = m, p = t, u = y, f = "left");
    }
  }
  if (c !== 0) {
    const m = (e + r - s) / c;
    if (m > 0 && m < d) {
      const y = n + m * l;
      y >= t && y <= t + o && (d = m, p = y, u = e + r, f = "bottom");
    }
  }
  if (c !== 0) {
    const m = (e - s) / c;
    if (m > 0 && m < d) {
      const y = n + m * l;
      y >= t && y <= t + o && (d = m, p = y, u = e, f = "top");
    }
  }
  return { x: p, y: u, side: f };
}
function We(t, e, o, r, n) {
  const s = Math.cos(n), i = Math.sin(n), a = t - o, l = e - r;
  return [o + a * s - l * i, r + a * i + l * s];
}
function On(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return qs(t.x, t.y, t.w, e, n, s, o, r);
  const i = -t.rotation * Math.PI / 180, [a, l] = We(o, r, n, s, i), c = qs(t.x, t.y, t.w, e, n, s, a, l), [d, p] = We(c.x, c.y, n, s, -i);
  return { x: d, y: p, side: c.side };
}
function is(t, e, o, r) {
  return Math.abs(t) / o >= Math.abs(e) / r ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function fc(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, d] = t.rotation ? We(o, r, n, s, l) : [o, r], p = c - n, u = d - s;
  if (p === 0 && u === 0)
    return { x: n + i, y: s, side: "right" };
  const f = 1 / Math.sqrt((p / i) ** 2 + (u / a) ** 2);
  let m = n + p * f, y = s + u * f;
  const g = is(p, u, i, a);
  return t.rotation && ([m, y] = We(m, y, n, s, -l)), { x: m, y, side: g };
}
function yc(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, d] = t.rotation ? We(o, r, n, s, l) : [o, r], p = c - n, u = d - s;
  if (p === 0 && u === 0)
    return { x: n + i, y: s, side: "right" };
  const f = 1 / (Math.abs(p) / i + Math.abs(u) / a);
  let m = n + p * f, y = s + u * f;
  const g = is(p, u, i, a);
  return t.rotation && ([m, y] = We(m, y, n, s, -l)), { x: m, y, side: g };
}
function gc(t, e, o, r) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return On(t, e, o, r);
  const s = t.x + t.w / 2, i = t.y + e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [l, c] = t.rotation ? We(o, r, s, i, a) : [o, r], d = l - s, p = c - i, u = Math.hypot(d, p);
  if (u === 0)
    return On(t, e, o, r);
  const f = d / u, m = p / u;
  let y = t.x + n[0][0], g = t.y + n[0][1], x = (y - s) * f + (g - i) * m;
  for (let P = 1; P < n.length; P++) {
    const F = t.x + n[P][0], B = t.y + n[P][1], E = (F - s) * f + (B - i) * m;
    E > x && (x = E, y = F, g = B);
  }
  const b = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let v = y + f * b, M = g + m * b;
  const C = is(d, p, t.w / 2, e / 2);
  return t.rotation && ([v, M] = We(v, M, s, i, -a)), { x: v, y: M, side: C };
}
function Ks(t, e, o) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return Or(t, e, o);
  const n = t.x + t.w / 2, s = t.y + e / 2, i = So(o), a = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, l = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (g, x, b, v, M, C) => {
    const P = M - b, F = C - v, B = P * P + F * F;
    if (B === 0) return [b, v];
    const E = Math.max(0, Math.min(1, ((g - b) * P + (x - v) * F) / B));
    return [b + E * P, v + E * F];
  };
  let d = t.x + r[0][0], p = t.y + r[0][1], u = (d - a) ** 2 + (p - l) ** 2;
  if (r.length === 1)
    d = t.x + r[0][0], p = t.y + r[0][1];
  else
    for (let g = 0; g < r.length - 1; g++) {
      const x = t.x + r[g][0], b = t.y + r[g][1], v = t.x + r[g + 1][0], M = t.y + r[g + 1][1], [C, P] = c(a, l, x, b, v, M), F = (C - a) ** 2 + (P - l) ** 2;
      F < u && (u = F, d = C, p = P);
    }
  const f = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let m = d + i.dx * f, y = p + i.dy * f;
  if (t.rotation) {
    const g = t.rotation * Math.PI / 180;
    [m, y] = We(m, y, n, s, g);
  }
  return { x: m, y };
}
function Xn(t, e, o, r) {
  var n;
  if (t.type === "draw")
    return gc(t, e, o, r);
  if (t.type === "shape") {
    const s = (n = t.data) == null ? void 0 : n.shape;
    if (s === "ellipse") return fc(t, e, o, r);
    if (s === "diamond") return yc(t, e, o, r);
  }
  return On(t, e, o, r);
}
function Gn(t, e, o, r) {
  const n = Xn(t, e, o, r);
  return { x: n.x, y: n.y };
}
function Or(t, e, o) {
  const r = t.x + t.w / 2, n = t.y + e / 2;
  let s, i;
  switch (o) {
    case "top":
      s = r, i = t.y;
      break;
    case "bottom":
      s = r, i = t.y + e;
      break;
    case "left":
      s = t.x, i = n;
      break;
    case "right":
      s = t.x + t.w, i = n;
      break;
  }
  if (!t.rotation) return { x: s, y: i };
  const a = t.rotation * Math.PI / 180, [l, c] = We(s, i, r, n, a);
  return { x: l, y: c };
}
function So(t) {
  switch (t) {
    case "top":
      return { dx: 0, dy: -1 };
    case "bottom":
      return { dx: 0, dy: 1 };
    case "left":
      return { dx: -1, dy: 0 };
    case "right":
      return { dx: 1, dy: 0 };
  }
}
function Us(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Ge(t, e, o = "bezier", r, n, s, i, a, l, c) {
  const d = vo(t, r), p = vo(e, r), u = t.x + t.w / 2, f = t.y + d / 2, m = e.x + e.w / 2, y = e.y + p / 2;
  let g, x, b, v;
  if (l)
    g = l.x, x = l.y, b = n ?? "right";
  else if (n) {
    const B = t.type === "draw" ? Ks(t, d, n) : Or(t, d, n);
    g = B.x, x = B.y, b = n;
  } else {
    const B = Xn(t, d, m, y);
    if (g = B.x, x = B.y, b = B.side, Us(t)) {
      const E = Math.hypot(m - u, y - f);
      E > 0 && (v = { dx: (m - u) / E, dy: (y - f) / E });
    }
  }
  let M, C, P, F;
  if (c)
    M = c.x, C = c.y, P = s ?? "left";
  else if (s) {
    const B = e.type === "draw" ? Ks(e, p, s) : Or(e, p, s);
    M = B.x, C = B.y, P = s;
  } else {
    const B = Xn(e, p, u, f);
    if (M = B.x, C = B.y, P = B.side, Us(e)) {
      const E = Math.hypot(u - m, f - y);
      E > 0 && (F = { dx: (u - m) / E, dy: (f - y) / E });
    }
  }
  switch (o) {
    case "straight":
      return mc(g, x, M, C, b, P);
    case "bezier":
      return bc(g, x, M, C, b, P, a, v, F);
    case "smoothstep":
      return xc(g, x, M, C, b, P, i);
    case "step":
      return wc(g, x, M, C, b, P, i);
  }
}
function mc(t, e, o, r, n, s) {
  const i = Math.min(t, o), a = Math.min(e, r), l = Math.abs(o - t), c = Math.abs(r - e);
  return {
    path: `M${t},${e} L${o},${r}`,
    labelX: (t + o) / 2,
    labelY: (e + r) / 2,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: Math.atan2(r - e, o - t),
    tailAngle: Math.atan2(e - r, t - o),
    sourceSide: n,
    targetSide: s,
    bounds: { x: i, y: a, w: l, h: c }
  };
}
function bc(t, e, o, r, n, s, i, a, l) {
  const c = Math.hypot(o - t, r - e), d = Math.min(c * 0.5, Math.max(50, c * 0.25)), p = a ?? So(n), u = l ?? So(s), f = i ? i[0] * (4 / 3) : 0, m = i ? i[1] * (4 / 3) : 0, y = t + p.dx * d + f, g = e + p.dy * d + m, x = o + u.dx * d + f, b = r + u.dy * d + m, v = 0.125 * t + 0.375 * y + 0.375 * x + 0.125 * o, M = 0.125 * e + 0.375 * g + 0.375 * b + 0.125 * r, C = Math.atan2(r - b, o - x), P = Math.atan2(e - g, t - y), F = {
    x: v,
    y: M,
    axis: "xy",
    min: 0,
    max: 0
  }, B = Math.min(t, o, y, x), E = Math.min(e, r, g, b), X = Math.max(t, o, y, x), nt = Math.max(e, r, g, b);
  return {
    path: `M${t},${e} C${y},${g} ${x},${b} ${o},${r}`,
    labelX: v,
    labelY: M,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: C,
    tailAngle: P,
    sourceSide: n,
    targetSide: s,
    kinkHandle: F,
    bounds: { x: B, y: E, w: X - B, h: nt - E }
  };
}
function xc(t, e, o, r, n, s, i) {
  const { points: c, kinkHandle: d } = as(t, e, o, r, n, s, 20, i), p = kc(c, 8), u = Math.floor(c.length / 2), f = (c[u - 1][0] + c[u][0]) / 2, m = (c[u - 1][1] + c[u][1]) / 2, y = c[c.length - 1], g = c[c.length - 2], x = Math.atan2(y[1] - g[1], y[0] - g[0]), b = c[0], v = c[1], M = Math.atan2(b[1] - v[1], b[0] - v[0]);
  let C = 1 / 0, P = 1 / 0, F = -1 / 0, B = -1 / 0;
  for (const [E, X] of c)
    E < C && (C = E), X < P && (P = X), E > F && (F = E), X > B && (B = X);
  return {
    path: p,
    labelX: f,
    labelY: m,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: x,
    tailAngle: M,
    sourceSide: n,
    targetSide: s,
    kinkHandle: d,
    bounds: { x: C, y: P, w: F - C, h: B - P }
  };
}
function wc(t, e, o, r, n, s, i) {
  const { points: l, kinkHandle: c } = as(t, e, o, r, n, s, 20, i), d = [`M${l[0][0]},${l[0][1]}`];
  for (let B = 1; B < l.length; B++)
    d.push(`L${l[B][0]},${l[B][1]}`);
  const p = Math.floor(l.length / 2), u = (l[p - 1][0] + l[p][0]) / 2, f = (l[p - 1][1] + l[p][1]) / 2, m = l[l.length - 1], y = l[l.length - 2], g = Math.atan2(m[1] - y[1], m[0] - y[0]), x = l[0], b = l[1], v = Math.atan2(x[1] - b[1], x[0] - b[0]);
  let M = 1 / 0, C = 1 / 0, P = -1 / 0, F = -1 / 0;
  for (const [B, E] of l)
    B < M && (M = B), E < C && (C = E), B > P && (P = B), E > F && (F = E);
  return {
    path: d.join(" "),
    labelX: u,
    labelY: f,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: g,
    tailAngle: v,
    sourceSide: n,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: M, y: C, w: P - M, h: F - C }
  };
}
function as(t, e, o, r, n, s, i, a) {
  const l = So(n), c = So(s), d = t + l.dx * i, p = e + l.dy * i, u = o + c.dx * i, f = r + c.dy * i, m = n === "left" || n === "right", y = s === "left" || s === "right", g = [[t, e], [d, p]], x = a ?? 0.5;
  let b;
  if (m && y) {
    const v = d + (u - d) * x;
    g.push([v, p], [v, f]);
    const M = Math.min(d, u), C = Math.max(d, u);
    b = { x: v, y: (p + f) / 2, axis: "x", min: M, max: C };
  } else if (!m && !y) {
    const v = p + (f - p) * x;
    g.push([d, v], [u, v]);
    const M = Math.min(p, f), C = Math.max(p, f);
    b = { x: (d + u) / 2, y: v, axis: "y", min: M, max: C };
  } else m && !y ? g.push([u, p]) : g.push([d, f]);
  return g.push([u, f], [o, r]), { points: g, kinkHandle: b };
}
function kc(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let n = 1; n < t.length - 1; n++) {
    const s = t[n - 1], i = t[n], a = t[n + 1], l = i[0] - s[0], c = i[1] - s[1], d = a[0] - i[0], p = a[1] - i[1], u = Math.hypot(l, c), f = Math.hypot(d, p);
    if (u === 0 || f === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const m = Math.min(e, u / 2, f / 2), y = i[0] - l / u * m, g = i[1] - c / u * m, x = i[0] + d / f * m, b = i[1] + p / f * m;
    o.push(`L${y},${g}`), o.push(`Q${i[0]},${i[1]} ${x},${b}`);
  }
  const r = t[t.length - 1];
  return o.push(`L${r[0]},${r[1]}`), o.join(" ");
}
function vc(t, e, o, r, n, s, i, a, l) {
  const c = 1 - l, d = c * c, p = d * c, u = l * l, f = u * l;
  return [
    p * t + 3 * d * l * o + 3 * c * u * n + f * i,
    p * e + 3 * d * l * r + 3 * c * u * s + f * a
  ];
}
function Sc(t, e, o, r, n, s, i, a, l, c, d = 24) {
  let p = 1 / 0, u = o, f = r;
  for (let m = 1; m <= d; m++) {
    const y = m / d, [g, x] = vc(o, r, n, s, i, a, l, c, y), b = ls(t, e, u, f, g, x);
    b < p && (p = b), u = g, f = x;
  }
  return p;
}
function Mc(t, e, o) {
  let r = 1 / 0;
  for (let n = 1; n < o.length; n++) {
    const s = ls(t, e, o[n - 1][0], o[n - 1][1], o[n][0], o[n][1]);
    s < r && (r = s);
  }
  return r;
}
function ea(t, e, o, r, n, s, i, a) {
  const l = n.data.edgeType || "bezier", c = Ge(
    o,
    r,
    l,
    s,
    n.data.sourceHandle,
    n.data.targetHandle,
    n.data.midpointOffset,
    n.data.curveOffset,
    i,
    a
  ), { x1: d, y1: p, x2: u, y2: f } = c;
  if (l === "straight")
    return ls(t, e, d, p, u, f);
  if (l === "bezier") {
    const g = Math.hypot(u - d, f - p), x = Math.min(g * 0.5, Math.max(50, g * 0.25)), b = So(c.sourceSide), v = So(c.targetSide), M = n.data.curveOffset ? n.data.curveOffset[0] * (4 / 3) : 0, C = n.data.curveOffset ? n.data.curveOffset[1] * (4 / 3) : 0, P = d + b.dx * x + M, F = p + b.dy * x + C, B = u + v.dx * x + M, E = f + v.dy * x + C;
    return Sc(t, e, d, p, P, F, B, E, u, f);
  }
  const m = 20, { points: y } = as(d, p, u, f, c.sourceSide, c.targetSide, m, n.data.midpointOffset);
  return Mc(t, e, y);
}
function Zs(t, e, o) {
  const r = vo(t, o), n = vo(e, o), s = t.x + t.w / 2, i = t.y + r / 2, a = e.x + e.w / 2, l = e.y + n / 2, c = Gn(t, r, a, l), d = Gn(e, n, s, i);
  return { x1: c.x, y1: c.y, x2: d.x, y2: d.y };
}
function mn(t, e, o, r) {
  const n = vo(t, r);
  return Gn(t, n, e, o);
}
function ls(t, e, o, r, n, s) {
  const i = n - o, a = s - r, l = i * i + a * a;
  if (l === 0) return Math.hypot(t - o, e - r);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * a) / l)), d = o + c * i, p = r + c * a;
  return Math.hypot(t - d, e - p);
}
function Vo(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, a = n, l = r / 2, c = t + n * l, d = e + s * l, p = t - n * l, u = e - s * l, f = r * 0.4;
  return `M${p + i * f},${u + a * f} L${c},${d} L${p - i * f},${u - a * f}`;
}
function Xr(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, a = n, l = r / 2, c = t + n * l, d = e + s * l, p = t - n * l, u = e - s * l, f = r * 0.4;
  return `M${c},${d} L${p + i * f},${u + a * f} L${p - i * f},${u - a * f} Z`;
}
function Ko(t, e) {
  const o = vo(t, e);
  return ["top", "right", "bottom", "left"].map((n) => {
    const s = Or(t, o, n);
    return { side: n, x: s.x, y: s.y };
  });
}
function Tr(t, e, o, r) {
  const n = Ko(t, r);
  let s = n[0], i = 1 / 0;
  for (const a of n) {
    const l = Math.hypot(a.x - e, a.y - o);
    l < i && (i = l, s = a);
  }
  return s.side;
}
function Cc(t, e, o, r, n, s) {
  const i = ue.isEnabled(), a = i ? performance.now() : 0, l = 8 / r, c = [];
  for (const d of t.values()) {
    if (d.type !== "edge") continue;
    const p = d, u = t.get(p.data.fromId), f = t.get(p.data.toId);
    if (!u || !f) continue;
    const m = s == null ? void 0 : s(p, u, f);
    ea(e, o, u, f, p, n, m == null ? void 0 : m.sourcePortPos, m == null ? void 0 : m.targetPortPos) < l && c.push(d);
  }
  return i && ue.recordEdgeHit(performance.now() - a), c;
}
function Ic(t, e, o, r, n, s) {
  const i = ue.isEnabled(), a = i ? performance.now() : 0, l = 8 / r;
  let c = null, d = l;
  for (const p of t.values()) {
    if (p.type !== "edge") continue;
    const u = p, f = t.get(u.data.fromId), m = t.get(u.data.toId);
    if (!f || !m) continue;
    const y = s == null ? void 0 : s(u, f, m), g = ea(e, o, f, m, u, n, y == null ? void 0 : y.sourcePortPos, y == null ? void 0 : y.targetPortPos);
    g < d && (d = g, c = p);
  }
  return i && ue.recordEdgeHit(performance.now() - a), c;
}
function zc(t, e, o) {
  const r = t.x, n = t.x + t.w / 2, s = t.x + t.w, i = t.y, a = t.y + t.h / 2, l = t.y + t.h, c = [r, n, s], d = [i, a, l];
  let p = 1 / 0, u = 1 / 0;
  const f = [];
  for (const y of e) {
    const g = y.x, x = y.x + y.w / 2, b = y.x + y.w, v = y.y, M = y.y + y.h / 2, C = y.y + y.h, P = [g, x, b], F = [v, M, C];
    for (const B of c)
      for (const E of P) {
        const X = E - B;
        Math.abs(X) <= o && (Math.abs(X) < Math.abs(p) && (p = X), f.push({
          axis: "x",
          position: E,
          start: Math.min(t.y, t.y + t.h, y.y, y.y + y.h),
          end: Math.max(t.y, t.y + t.h, y.y, y.y + y.h)
        }));
      }
    for (const B of d)
      for (const E of F) {
        const X = E - B;
        Math.abs(X) <= o && (Math.abs(X) < Math.abs(u) && (u = X), f.push({
          axis: "y",
          position: E,
          start: Math.min(t.x, t.x + t.w, y.x, y.x + y.w),
          end: Math.max(t.x, t.x + t.w, y.x, y.x + y.w)
        }));
      }
  }
  const m = /* @__PURE__ */ new Map();
  for (const y of f) {
    const g = `${y.axis}:${y.position.toFixed(1)}`, x = m.get(g);
    x ? (x.start = Math.min(x.start, y.start), x.end = Math.max(x.end, y.end)) : m.set(g, { ...y });
  }
  return {
    guides: Array.from(m.values()),
    snapDx: Math.abs(p) <= o ? p : 0,
    snapDy: Math.abs(u) <= o ? u : 0
  };
}
class Tc {
  constructor() {
    yt(this, "nodes", /* @__PURE__ */ new Map());
    yt(this, "viewport", { x: 0, y: 0, zoom: 1 });
    yt(this, "selection", /* @__PURE__ */ new Set());
    yt(this, "activeGroupId", null);
    yt(this, "groupRotations", /* @__PURE__ */ new Map());
    /** Maps child groupId → parent groupId for nested groups. */
    yt(this, "groupParent", /* @__PURE__ */ new Map());
    /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
    yt(this, "groupChildren", /* @__PURE__ */ new Map());
    yt(this, "mode", "select");
    yt(this, "activeTool", {
      tool: "pen",
      color: "#1e1e2e",
      width: 3,
      shapeType: "rect",
      strokeStyle: "solid",
      roughness: 1,
      opacity: 1
    });
    yt(this, "containerOffset", { x: 0, y: 0 });
    /** DOM element that hosts the canvas — used to derive the correct window in pop-out scenarios. */
    yt(this, "_container", null);
    yt(this, "snapToGrid", !1);
    yt(this, "smartGuides", !0);
    yt(this, "lassoSelect", !1);
    yt(this, "presentationMode", !1);
    yt(this, "presentationSlides", []);
    yt(this, "presentationIndex", 0);
    yt(this, "_presentationAnimId", null);
    /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
    yt(this, "_transitionOverlay", null);
    yt(this, "gridSize", 20);
    yt(this, "boardBackground", "dot-grid");
    /** Saved "origin" viewport position restored on next load. */
    yt(this, "originView", null);
    /** Current alignment guides (set during drag). */
    yt(this, "alignGuides", []);
    /** Container dimensions for viewport bounds computation. */
    yt(this, "_containerWidth", 2e3);
    yt(this, "_containerHeight", 1500);
    yt(this, "history", new jl());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yt(this, "listeners", {});
    yt(this, "_suppressEvents", !1);
    yt(this, "_collabMode", !1);
    yt(this, "clipboard", []);
    yt(this, "pasteCount", 0);
    yt(this, "nextZValue", 1);
    yt(this, "_minZ", 0);
    yt(this, "quadTree", new Nn({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    yt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    yt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    yt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    yt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    yt(this, "_measuredHeights", {});
    yt(this, "_search", {
      query: "",
      matches: [],
      activeIndex: -1
    });
  }
  get transitionOverlay() {
    return this._transitionOverlay;
  }
  /** Set the node type registry for lifecycle hooks. */
  setRegistry(e) {
    this.registry = e;
  }
  /** Enable collaborative mode. Disables local snapshot history. */
  setCollabMode(e) {
    this._collabMode = e, e && this.history.clear();
  }
  /** Whether the engine is in collaborative mode. */
  get isCollabMode() {
    return this._collabMode;
  }
  /** Register a node type as a container (frame-like behavior). */
  registerContainerType(e) {
    this._containerTypes.add(e);
  }
  /** Check whether a node type behaves as a container. */
  isContainerType(e) {
    return this._containerTypes.has(e);
  }
  /** The set of container type strings (read-only). */
  get containerTypes() {
    return this._containerTypes;
  }
  /** Update the measured height for an auto-height node. */
  setMeasuredHeight(e, o) {
    this._measuredHeights[e] = o;
  }
  /** Get the resolved height for a node (measured or explicit). */
  resolveHeight(e) {
    return e.h !== "auto" ? e.h : this._measuredHeights[e.id] ?? 100;
  }
  /** Get all measured heights (for canvas rendering). */
  get measuredHeights() {
    return this._measuredHeights;
  }
  // --- Edge helpers (data-flow) ---
  /** Get all edge nodes connected to a given node. */
  getEdgesForNode(e) {
    const o = this.adjacency.get(e);
    if (!o) return [];
    const r = [];
    for (const n of o) {
      const s = this.nodes.get(n);
      s && s.type === "edge" && r.push(s);
    }
    return r;
  }
  /** Get all edge nodes in the board. */
  getAllEdges() {
    const e = [];
    for (const o of this.nodes.values())
      o.type === "edge" && e.push(o);
    return e;
  }
  /** Set the container element (used by SpatialCanvas on mount). */
  setContainer(e) {
    this._container = e;
  }
  /** Get the window object for the container (supports pop-out windows). */
  getWindow() {
    var e;
    return ((e = this._container) == null ? void 0 : e.ownerDocument.defaultView) ?? window;
  }
  // --- Event Emitter ---
  on(e, o) {
    this.listeners[e] || (this.listeners[e] = /* @__PURE__ */ new Set()), this.listeners[e].add(o);
  }
  off(e, o) {
    var r;
    (r = this.listeners[e]) == null || r.delete(o);
  }
  emit(e, ...o) {
    var r;
    this._suppressEvents || (r = this.listeners[e]) == null || r.forEach((n) => n(...o));
  }
  /** Request entering image crop mode (handled by the canvas component). */
  requestImageCrop(e) {
    this.emit("image:cropRequest", e);
  }
  // --- Search ---
  getSearchState() {
    return {
      query: this._search.query,
      matches: this._search.matches.map((e) => ({ ...e })),
      activeIndex: this._search.activeIndex
    };
  }
  setSearchQuery(e) {
    const o = e.trim();
    if (o.length === 0) {
      this._search = { query: "", matches: [], activeIndex: -1 }, this.emit("search");
      return;
    }
    const r = this.computeSearchMatches(o);
    this._search = {
      query: o,
      matches: r,
      activeIndex: r.length > 0 ? 0 : -1
    }, this.emit("search");
  }
  clearSearch() {
    !this._search.query && this._search.matches.length === 0 && this._search.activeIndex === -1 || (this._search = { query: "", matches: [], activeIndex: -1 }, this.emit("search"));
  }
  setSearchActiveIndex(e) {
    if (this._search.matches.length === 0) {
      this._search.activeIndex !== -1 && (this._search = { ...this._search, activeIndex: -1 }, this.emit("search"));
      return;
    }
    const o = Math.max(0, Math.min(this._search.matches.length - 1, e));
    o !== this._search.activeIndex && (this._search = { ...this._search, activeIndex: o }, this.emit("search"));
  }
  searchNext() {
    const e = this._search.matches.length;
    if (e === 0) return;
    const o = this._search.activeIndex < 0 ? 0 : (this._search.activeIndex + 1) % e;
    this.setSearchActiveIndex(o);
  }
  searchPrev() {
    const e = this._search.matches.length;
    if (e === 0) return;
    const o = this._search.activeIndex < 0 ? 0 : (this._search.activeIndex - 1 + e) % e;
    this.setSearchActiveIndex(o);
  }
  focusSearchResult(e, o) {
    if (this._search.matches.length === 0) return;
    const r = Math.max(0, Math.min(this._search.matches.length - 1, e)), n = this._search.matches[r];
    if (this.nodes.has(n.nodeId) && (this.setSearchActiveIndex(r), (o == null ? void 0 : o.select) !== !1 && this.select(n.nodeId), (o == null ? void 0 : o.center) !== !1)) {
      const s = (o == null ? void 0 : o.minZoom) ?? 0.9;
      this.zoomToNode(n.nodeId, Math.max(this.viewport.zoom, s));
    }
  }
  focusActiveSearchResult(e) {
    this._search.activeIndex < 0 || this.focusSearchResult(this._search.activeIndex, e);
  }
  refreshSearchIfNeeded() {
    var n;
    if (!this._search.query) return;
    const e = this._search.activeIndex >= 0 ? (n = this._search.matches[this._search.activeIndex]) == null ? void 0 : n.nodeId : void 0, o = this.computeSearchMatches(this._search.query);
    let r = -1;
    if (o.length > 0)
      if (e) {
        const s = o.findIndex((i) => i.nodeId === e);
        r = s >= 0 ? s : 0;
      } else
        r = 0;
    this._search = {
      query: this._search.query,
      matches: o,
      activeIndex: r
    }, this.emit("search");
  }
  computeSearchMatches(e) {
    const o = e.toLocaleLowerCase(), r = [], n = Array.from(this.nodes.values()).sort((s, i) => s.z - i.z);
    for (const s of n) {
      const i = this.getNodeSearchCandidates(s);
      for (const a of i) {
        const l = this.countOccurrences(a.text.toLocaleLowerCase(), o);
        l > 0 && r.push({
          nodeId: s.id,
          nodeType: s.type,
          field: a.field,
          text: a.text,
          matchCount: l
        });
      }
    }
    return r;
  }
  getNodeSearchCandidates(e) {
    if (!e.data || typeof e.data != "object") return [];
    const o = e.data, r = [], n = (s, i) => {
      if (typeof i != "string") return;
      const a = i.trim();
      a && r.push({ field: s, text: a });
    };
    switch (e.type) {
      case "text":
      case "sticky":
        n("text", o.text);
        break;
      case "shape":
      case "edge":
      case "frame":
        n("label", o.label);
        break;
      case "content": {
        const s = this.extractBlockText(o.blocks);
        n("content", s), n("content", o.markdown);
        break;
      }
    }
    return r;
  }
  extractBlockText(e) {
    if (!Array.isArray(e)) return "";
    const o = (r) => r.map((n) => {
      if (!n || typeof n != "object") return "";
      const s = n, i = Array.isArray(s.content) ? s.content.filter((l) => l && typeof l == "object" && (l.type ?? "text") === "text").map((l) => typeof l.text == "string" ? l.text : "").join("") : "", a = Array.isArray(s.children) && s.children.length > 0 ? o(s.children) : "";
      return a ? `${i}
${a}` : i;
    }).filter(Boolean).join(`
`);
    return o(e);
  }
  countOccurrences(e, o) {
    if (!o) return 0;
    let r = 0, n = 0;
    for (; r <= e.length - o.length; ) {
      const s = e.indexOf(o, r);
      if (s < 0) break;
      n += 1, r = s + o.length;
    }
    return n;
  }
  // --- Grid Snapping ---
  toggleSnapToGrid() {
    this.snapToGrid = !this.snapToGrid, this.emit("guides");
  }
  toggleSmartGuides() {
    this.smartGuides = !this.smartGuides, this.emit("guides");
  }
  setGridSize(e) {
    const o = Math.max(1, Math.round(e));
    this.gridSize !== o && (this.gridSize = o, this.emit("guides"));
  }
  toggleLassoSelect() {
    this.lassoSelect = !this.lassoSelect, this.emit("lassoToggle");
  }
  // ── Presentation mode ─────────────────────────────────────────
  enterPresentation() {
    const e = [];
    for (const l of this.nodes.values())
      if (l.type === "frame") {
        const c = l.data;
        e.push({ id: l.id, x: l.x, y: l.y, order: c.slideOrder });
      }
    if (e.length === 0) return;
    const o = e.filter((l) => l.order != null).sort((l, c) => l.order - c.order), r = e.filter((l) => l.order == null), n = 100;
    r.sort((l, c) => l.y - c.y);
    const s = [];
    for (const l of r) {
      const c = s[s.length - 1];
      c && Math.abs(l.y - c[0].y) < n ? c.push(l) : s.push([l]);
    }
    const i = s.flatMap((l) => l.sort((c, d) => c.x - d.x)), a = [...o, ...i];
    this.presentationSlides = a.map((l) => l.id), this.presentationIndex = 0, this.presentationMode = !0, this.selection.size > 0 && (this.selection.clear(), this.emit("selection")), this.emit("presentation"), this.presentationGoTo(0);
  }
  exitPresentation() {
    this._presentationAnimId != null && (cancelAnimationFrame(this._presentationAnimId), this._presentationAnimId = null), this._transitionOverlay = null, this.presentationMode = !1, this.presentationSlides = [], this.presentationIndex = 0, this.emit("presentation");
  }
  presentationNext() {
    this.presentationIndex < this.presentationSlides.length - 1 && this.presentationGoTo(this.presentationIndex + 1);
  }
  presentationPrev() {
    this.presentationIndex > 0 && this.presentationGoTo(this.presentationIndex - 1);
  }
  presentationGoTo(e) {
    if (e < 0 || e >= this.presentationSlides.length) return;
    const o = this.presentationSlides[e], r = this.nodes.get(o);
    if (!r) {
      this.exitPresentation();
      return;
    }
    const n = this.presentationIndex;
    this.presentationIndex = e, this.emit("presentation"), this._presentationAnimId != null && (cancelAnimationFrame(this._presentationAnimId), this._presentationAnimId = null), this._transitionOverlay = null;
    const s = this._computeSlideViewport(r), i = r.data, a = i.transition ?? "pan", l = i.transitionDuration, c = e >= n ? 1 : -1;
    switch (a) {
      case "none":
        this._transitionNone(s);
        break;
      case "fade":
        this._transitionFade(s, l);
        break;
      case "dissolve":
        this._transitionDissolve(s, l);
        break;
      case "zoom":
        this._transitionZoom(s, l);
        break;
      case "fold":
        this._transitionFold(s, l);
        break;
      case "cube":
        this._transitionCube(s, l, c);
        break;
      case "pan":
      default:
        this._transitionPan(s, l);
        break;
    }
  }
  _computeSlideViewport(e) {
    const o = this.resolveHeight(e), r = 40, n = e.x - r, s = e.y - r, i = e.w + r * 2, a = o + r * 2, l = this._containerWidth, c = this._containerHeight, d = jo(Math.min(l / i, c / a), 0.1, 5);
    return {
      x: (l - i * d) / 2 - n * d,
      y: (c - a * d) / 2 - s * d,
      zoom: d
    };
  }
  /** Pan transition: smooth viewport interpolation (default). */
  _transitionPan(e, o) {
    const r = o ?? 400, n = performance.now(), s = { ...this.viewport }, i = (a) => {
      const l = Math.min((a - n) / r, 1), c = 1 - Math.pow(1 - l, 3);
      this.viewport.x = s.x + (e.x - s.x) * c, this.viewport.y = s.y + (e.y - s.y) * c, this.viewport.zoom = s.zoom + (e.zoom - s.zoom) * c, this.emit("viewport"), l < 1 ? this._presentationAnimId = requestAnimationFrame(i) : this._presentationAnimId = null;
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** None transition: instant viewport snap. */
  _transitionNone(e) {
    this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport");
  }
  /** Fade transition: fade to black, snap viewport, fade from black. */
  _transitionFade(e, o) {
    const r = (o ?? 500) / 2, n = performance.now(), s = (i) => {
      const a = Math.min((i - n) / r, 1);
      if (this._transitionOverlay = { type: "fade", phase: "out", progress: a }, this.emit("presentation"), a < 1)
        this._presentationAnimId = requestAnimationFrame(s);
      else {
        this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport");
        const l = performance.now(), c = (d) => {
          const p = Math.min((d - l) / r, 1);
          this._transitionOverlay = { type: "fade", phase: "in", progress: p }, this.emit("presentation"), p < 1 ? this._presentationAnimId = requestAnimationFrame(c) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
        };
        this._presentationAnimId = requestAnimationFrame(c);
      }
    };
    this._presentationAnimId = requestAnimationFrame(s);
  }
  /** Dissolve transition: quick overlay fade, snap viewport at midpoint. */
  _transitionDissolve(e, o) {
    const r = o ?? 400, n = performance.now();
    let s = !1;
    const i = (a) => {
      const l = Math.min((a - n) / r, 1);
      l < 0.5 ? this._transitionOverlay = { type: "dissolve", phase: "out", progress: l * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "dissolve", phase: "in", progress: (l - 0.5) * 2 }), this.emit("presentation"), l < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Zoom transition: zoom out from current, zoom into target. */
  _transitionZoom(e, o) {
    const r = o ?? 600, n = performance.now(), s = { ...this.viewport }, i = Math.max(0.1, Math.min(s.zoom, e.zoom) * 0.35), a = (s.x + e.x) / 2, l = (s.y + e.y) / 2, c = (d) => {
      const p = Math.min((d - n) / r, 1);
      if (p < 0.5) {
        const u = p * 2, f = 1 - Math.pow(1 - u, 3);
        this.viewport.x = s.x + (a - s.x) * f, this.viewport.y = s.y + (l - s.y) * f, this.viewport.zoom = s.zoom + (i - s.zoom) * f;
      } else {
        const u = (p - 0.5) * 2, f = 1 - Math.pow(1 - u, 3);
        this.viewport.x = a + (e.x - a) * f, this.viewport.y = l + (e.y - l) * f, this.viewport.zoom = i + (e.zoom - i) * f;
      }
      this.emit("viewport"), p < 1 ? this._presentationAnimId = requestAnimationFrame(c) : this._presentationAnimId = null;
    };
    this._presentationAnimId = requestAnimationFrame(c);
  }
  /** Fold transition: two halves fold shut like a book, snap viewport, unfold to reveal. */
  _transitionFold(e, o) {
    const r = o ?? 700, n = performance.now();
    let s = !1;
    const i = (a) => {
      const l = Math.min((a - n) / r, 1);
      l < 0.5 ? this._transitionOverlay = { type: "fold", phase: "out", progress: l * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "fold", phase: "in", progress: (l - 0.5) * 2 }), this.emit("presentation"), l < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
  _transitionCube(e, o, r = 1) {
    const n = o ?? 1200, s = performance.now();
    let i = !1;
    const a = (l) => {
      const c = Math.min((l - s) / n, 1);
      c >= 0.5 && !i && (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), i = !0), this._transitionOverlay = {
        type: "cube",
        phase: c < 0.5 ? "out" : "in",
        progress: c < 0.5 ? c * 2 : (c - 0.5) * 2,
        direction: r,
        t: c
      }, this.emit("presentation"), c < 1 ? this._presentationAnimId = requestAnimationFrame(a) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(a);
  }
  snap(e, o) {
    return this.snapToGrid ? {
      x: Math.round(e / this.gridSize) * this.gridSize,
      y: Math.round(o / this.gridSize) * this.gridSize
    } : { x: e, y: o };
  }
  /** Update the container dimensions (called from canvas resize observer). */
  setContainerSize(e, o) {
    const r = this._containerWidth, n = this._containerHeight;
    this._containerWidth = e, this._containerHeight = o, this.presentationMode && this.presentationSlides.length > 0 ? this.presentationGoTo(this.presentationIndex) : r > 0 && n > 0 && (this.viewport.x += (e - r) / 2, this.viewport.y += (o - n) / 2, this.emit("viewport"));
  }
  /**
   * Precompute static guide candidates for a drag gesture.
   * Reuse this context across pointermove frames to reduce QuadTree work.
   */
  createDragSnapContext(e) {
    const o = e instanceof Set ? e : new Set(e), r = -this.viewport.x / this.viewport.zoom, n = -this.viewport.y / this.viewport.zoom, s = this._containerWidth / this.viewport.zoom, i = this._containerHeight / this.viewport.zoom, a = [], l = this.quadTree.retrieve([], { x: r, y: n, w: s, h: i });
    for (const c of l) {
      if (c.type === "edge" || o.has(c.id)) continue;
      const d = this.resolveHeight(c);
      a.push({ x: c.x, y: c.y, w: c.w, h: d });
    }
    return { staticNodes: a };
  }
  /**
   * Compute smart guide alignment + grid snap for a drag operation.
   * Sets `this.alignGuides` and emits `guides` event.
   * Returns the adjusted delta to apply.
   */
  computeDragSnap(e, o, r, n, s, i) {
    const a = this.snapToGrid && !s, l = this.smartGuides && !s;
    let c = r, d = n, p = [];
    const u = o instanceof Set ? o : new Set(o);
    if (l) {
      let f = 1 / 0, m = 1 / 0, y = -1 / 0, g = -1 / 0;
      for (const M of e) {
        const C = this.getNode(M.id);
        if (!C) continue;
        const P = M.x + r, F = M.y + n, B = this.resolveHeight(C);
        f = Math.min(f, P), m = Math.min(m, F), y = Math.max(y, P + C.w), g = Math.max(g, F + B);
      }
      const x = { x: f, y: m, w: y - f, h: g - m }, b = (i == null ? void 0 : i.staticNodes) ?? this.createDragSnapContext(u).staticNodes, v = zc(x, b, 5);
      if (p = v.guides, a) {
        const M = e[0].x + r, C = e[0].y + n, P = this.snap(M, C), F = P.x - M, B = P.y - C, E = v.snapDx !== 0 && Math.abs(v.snapDx) <= Math.abs(F), X = v.snapDy !== 0 && Math.abs(v.snapDy) <= Math.abs(B);
        c = r + (E ? v.snapDx : F), d = n + (X ? v.snapDy : B), E || (p = p.filter((nt) => nt.axis !== "x")), X || (p = p.filter((nt) => nt.axis !== "y"));
      } else
        c = r + v.snapDx, d = n + v.snapDy;
    } else if (a) {
      const f = this.snap(e[0].x + r, e[0].y + n);
      c = f.x - e[0].x, d = f.y - e[0].y;
    }
    return this.alignGuides = p, this.emit("guides"), { finalDx: c, finalDy: d };
  }
  /** Clear alignment guides (call on drag end). */
  clearAlignGuides() {
    this.alignGuides.length !== 0 && (this.alignGuides = [], this.emit("guides"));
  }
  // --- Board Background ---
  setBoardBackground(e) {
    this.boardBackground !== e && (this.boardBackground = e, this.emit("background"));
  }
  // --- Viewport ---
  pan(e, o) {
    this.viewport.x += e, this.viewport.y += o, this.emit("viewport");
  }
  zoomByWheel(e, o, r) {
    this.viewport = tc(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, r) {
    this.viewport = ec(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const r = jo(e, 0.1, 5);
    if (o) {
      const n = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = qo(this.viewport, n, s);
      this.viewport = {
        x: n - i.x * r,
        y: s - i.y * r,
        zoom: r
      };
    } else
      this.viewport.zoom = r;
    this.emit("viewport");
  }
  zoomIn() {
    this.zoomTo(this.viewport.zoom * 1.2);
  }
  zoomOut() {
    this.zoomTo(this.viewport.zoom / 1.2);
  }
  /** Zoom and pan to center a node for editing (e.g. after double-click on placeholder) */
  zoomToNode(e, o = 1) {
    const r = this.nodes.get(e);
    if (!r) return;
    const n = r.h === "auto" ? 100 : r.h, s = r.x + r.w / 2, i = r.y + n / 2, a = this.getWindow(), l = a.innerWidth, c = a.innerHeight, d = jo(o, 0.2, 5);
    this.viewport = {
      x: l / 2 - s * d,
      y: c / 2 - i * d,
      zoom: d
    }, this.emit("viewport");
  }
  fitToContent() {
    if (this.nodes.size === 0) return;
    let e = 1 / 0, o = 1 / 0, r = -1 / 0, n = -1 / 0;
    for (const p of this.nodes.values()) {
      const u = p.h === "auto" ? 100 : p.h;
      p.x < e && (e = p.x), p.y < o && (o = p.y), p.x + p.w > r && (r = p.x + p.w), p.y + u > n && (n = p.y + u);
    }
    const s = 50;
    e -= s, o -= s, r += s, n += s;
    const i = r - e, a = n - o, l = this._containerWidth, c = this._containerHeight, d = jo(
      Math.min(l / i, c / a),
      0.1,
      5
    );
    this.viewport = {
      x: (l - i * d) / 2 - e * d,
      y: (c - a * d) / 2 - o * d,
      zoom: d
    }, this.emit("viewport");
  }
  /** Save the current viewport as the origin view (restored on next load). */
  setOriginView() {
    this.originView = { ...this.viewport }, this.emit("background");
  }
  /** Clear the saved origin view. */
  clearOriginView() {
    this.originView = null, this.emit("background");
  }
  /** Jump to the saved origin view, or fit-to-content if none is saved. */
  goToOriginView() {
    this.originView ? (this.viewport = { ...this.originView }, this.emit("viewport")) : this.fitToContent();
  }
  screenToCanvas(e, o) {
    return qo(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return _l(this.viewport, e, o);
  }
  // --- Node CRUD ---
  addNode(e) {
    var o, r, n;
    if (this.history.pushSnapshot(this.nodes, this.groupParent), this.nodes.set(e.id, e), this.quadTree.insert(e), e.z < this._minZ && (this._minZ = e.z), e.type === "edge") {
      const s = e, { fromId: i, toId: a } = s.data;
      this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.has(a) || this.adjacency.set(a, /* @__PURE__ */ new Set()), this.adjacency.get(i).add(e.id), this.adjacency.get(a).add(e.id);
    }
    e.type !== "edge" && this.updateFrameMembership([e.id]), (n = (r = (o = this.registry) == null ? void 0 : o.get(e.type)) == null ? void 0 : r.onCreate) == null || n.call(r, e, this), this.emit("node:create", e), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
  }
  addNodes(e) {
    if (e.length === 0) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    for (const r of e)
      if (this.nodes.set(r.id, r), this.quadTree.insert(r), r.type === "edge") {
        const n = r, { fromId: s, toId: i } = n.data;
        this.adjacency.has(s) || this.adjacency.set(s, /* @__PURE__ */ new Set()), this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.get(s).add(r.id), this.adjacency.get(i).add(r.id);
      }
    const o = e.filter((r) => r.type !== "edge").map((r) => r.id);
    o.length > 0 && this.updateFrameMembership(o), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
  }
  updateNode(e, o) {
    var s, i, a, l, c, d, p, u, f;
    const r = this.nodes.get(e);
    if (!r) return;
    const n = { ...r, ...o };
    if (o.data && typeof o.data == "object" && r.data && typeof r.data == "object" && (n.data = {
      ...r.data,
      ...o.data
    }), this.nodes.set(e, n), (r.x !== n.x || r.y !== n.y || r.w !== n.w || r.h !== n.h || (r.rotation ?? 0) !== (n.rotation ?? 0)) && (this.quadTree.remove(r), this.quadTree.insert(n), this.updateConnectedEdges(e)), r.x !== n.x || r.y !== n.y) {
      const m = n.x - r.x, y = n.y - r.y;
      (a = (i = (s = this.registry) == null ? void 0 : s.get(n.type)) == null ? void 0 : i.onMove) == null || a.call(i, n, m, y, this), this.emit("node:move", n, m, y);
    }
    if (r.w !== n.w || r.h !== n.h) {
      const m = r.w !== 0 ? n.w / r.w : 1, y = r.h === "auto" ? 0 : r.h, g = n.h === "auto" ? 0 : n.h, x = y !== 0 ? g / y : 1;
      this.emit("node:resize", n, m, x);
    }
    (r.rotation ?? 0) !== (n.rotation ?? 0) && ((d = (c = (l = this.registry) == null ? void 0 : l.get(n.type)) == null ? void 0 : c.onRotate) == null || d.call(c, n, n.rotation ?? 0, this), this.emit("node:rotate", n, n.rotation ?? 0)), o.data && r.data !== n.data && ((f = (u = (p = this.registry) == null ? void 0 : p.get(n.type)) == null ? void 0 : u.onDataChange) == null || f.call(u, n, r.data, n.data, this), this.emit("node:data", n, r.data, n.data), this.refreshSearchIfNeeded()), this.emit("change");
  }
  /**
   * Batch update multiple nodes with a single change emit.
   * Use during drag/resize to avoid N re-renders per frame.
   */
  updateMany(e) {
    let o = !1, r = !1;
    for (const { id: n, patch: s } of e) {
      const i = this.nodes.get(n);
      if (!i) continue;
      const a = { ...i, ...s };
      s.data && typeof s.data == "object" && i.data && typeof i.data == "object" && (a.data = {
        ...i.data,
        ...s.data
      }, r = !0), this.nodes.set(n, a), (i.x !== a.x || i.y !== a.y || i.w !== a.w || i.h !== a.h || (i.rotation ?? 0) !== (a.rotation ?? 0)) && (this.quadTree.remove(i), this.quadTree.insert(a), this.updateConnectedEdges(n)), o = !0;
    }
    o && r && this.refreshSearchIfNeeded(), o && this.emit("change");
  }
  updateConnectedEdges(e) {
    const o = this.adjacency.get(e);
    if (o)
      for (const r of o) {
        const n = this.nodes.get(r);
        if (!n || n.type !== "edge") continue;
        const s = n, i = this.nodes.get(s.data.fromId), a = this.nodes.get(s.data.toId);
        if (i && a) {
          const l = Ge(
            i,
            a,
            s.data.edgeType,
            void 0,
            s.data.sourceHandle,
            s.data.targetHandle,
            s.data.midpointOffset,
            s.data.curveOffset
          ), c = { ...s, ...l.bounds };
          this.nodes.set(r, c), this.quadTree.remove(s), this.quadTree.insert(c);
        }
      }
  }
  updateNodeWithHistory(e, o) {
    this.history.pushSnapshot(this.nodes, this.groupParent), this.updateNode(e, o), this.emit("history");
  }
  /** Update multiple nodes in a single undo step. */
  batchUpdateWithHistory(e) {
    if (e.length !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const { id: o, patch: r } of e)
        this.updateNode(o, r);
      this.emit("history");
    }
  }
  deleteNode(e) {
    var r, n, s, i, a;
    if (!this.nodes.has(e) || (r = this.nodes.get(e)) != null && r.locked) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = this.nodes.get(e);
    o && ((i = (s = (n = this.registry) == null ? void 0 : n.get(o.type)) == null ? void 0 : s.onDelete) == null || i.call(s, o, this), this.emit("node:delete", o), this.quadTree.remove(o)), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
    for (const l of this.frameChildren.values()) l.delete(e);
    for (const [l, c] of this.nodes)
      if (c.type === "edge") {
        const d = c.data;
        if (d.fromId === e || d.toId === e) {
          const p = this.nodes.get(l);
          p && this.quadTree.remove(p), this.nodes.delete(l), this.selection.delete(l);
          const u = d.fromId === e ? d.toId : d.fromId;
          (a = this.adjacency.get(u)) == null || a.delete(l);
        }
      }
    this.refreshSearchIfNeeded(), this.emit("change"), this.emit("selection"), this.emit("history");
  }
  getNode(e) {
    return this.nodes.get(e);
  }
  getAllNodes() {
    return Array.from(this.nodes.values());
  }
  /** Returns a read-only iterable of all nodes (no copy). */
  iterNodes() {
    return this.nodes.values();
  }
  getNodesByType(e) {
    const o = [];
    for (const r of this.nodes.values())
      r.type === e && o.push(r);
    return o;
  }
  /** Returns all non-edge nodes fully contained within a frame's bounds (including nested frames). */
  getNodesInsideFrame(e) {
    const o = this.nodes.get(e);
    if (!o || !this._containerTypes.has(o.type)) return [];
    const r = this.resolveHeight(o), n = [];
    for (const s of this.nodes.values()) {
      if (s.id === e || s.type === "edge") continue;
      const i = this.resolveHeight(s);
      s.x >= o.x && s.y >= o.y && s.x + s.w <= o.x + o.w && s.y + i <= o.y + r && n.push(s);
    }
    return n;
  }
  /** Returns tracked frame children (nodes explicitly added to the frame). */
  getFrameChildren(e) {
    const o = this.frameChildren.get(e);
    if (!o) return [];
    const r = [];
    for (const n of o) {
      const s = this.nodes.get(n);
      s && r.push(s);
    }
    return r;
  }
  /** Returns IDs of all descendants of a frame (children, grandchildren, etc.). */
  getFrameDescendantIds(e) {
    const o = /* @__PURE__ */ new Set(), r = (n) => {
      const s = this.frameChildren.get(n);
      if (s)
        for (const i of s) {
          if (o.has(i)) continue;
          o.add(i);
          const a = this.nodes.get(i);
          a && this._containerTypes.has(a.type) && r(i);
        }
    };
    return r(e), o;
  }
  /** Rebuild frameChildren from spatial containment. Called on load/undo/redo.
   *  Each node is assigned only to its smallest containing frame. */
  rebuildFrameChildren() {
    this.frameChildren.clear();
    const e = [];
    for (const r of this.nodes.values()) {
      if (!this._containerTypes.has(r.type)) continue;
      const n = this.resolveHeight(r);
      e.push({ node: r, area: r.w * n });
    }
    e.sort((r, n) => r.area - n.area);
    const o = /* @__PURE__ */ new Set();
    for (const { node: r } of e) {
      const s = this.getNodesInsideFrame(r.id).filter((i) => !o.has(i.id));
      if (s.length > 0) {
        const i = /* @__PURE__ */ new Set();
        for (const a of s)
          i.add(a.id), o.add(a.id);
        this.frameChildren.set(r.id, i);
      }
    }
  }
  /** After nodes are moved, update which frames they belong to.
   *  Each node is assigned only to its smallest containing frame.
   *  Frames can be nested inside other frames (but not inside themselves or their descendants). */
  updateFrameMembership(e) {
    for (const o of e) {
      const r = this.nodes.get(o);
      if (!r || r.type === "edge") continue;
      const n = this.resolveHeight(r);
      for (const [c, d] of this.frameChildren) {
        if (!d.has(o)) continue;
        const p = this.nodes.get(c);
        if (!p) {
          d.delete(o);
          continue;
        }
        const u = this.resolveHeight(p);
        r.x >= p.x && r.y >= p.y && r.x + r.w <= p.x + p.w && r.y + n <= p.y + u || d.delete(o);
      }
      let s;
      this._containerTypes.has(r.type) && (s = this.getFrameDescendantIds(o));
      let i = null, a = 1 / 0;
      const l = this.quadTree.retrieve([], { x: r.x, y: r.y, w: r.w, h: n });
      for (const c of l) {
        if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
        const d = this.resolveHeight(c);
        if (r.x >= c.x && r.y >= c.y && r.x + r.w <= c.x + c.w && r.y + n <= c.y + d) {
          const u = c.w * d;
          u < a && (a = u, i = c);
        }
      }
      for (const [, c] of this.frameChildren)
        c.delete(o);
      i && (this.frameChildren.has(i.id) || this.frameChildren.set(i.id, /* @__PURE__ */ new Set()), this.frameChildren.get(i.id).add(o));
    }
  }
  /** Sync frame children after resize: remove nodes no longer inside, add newly contained nodes. */
  syncFrameChildrenAfterResize(e) {
    const o = this.nodes.get(e);
    if (!o || !this._containerTypes.has(o.type)) return;
    const r = this.getNodesInsideFrame(e);
    r.length > 0 ? this.frameChildren.set(e, new Set(r.map((n) => n.id))) : this.frameChildren.delete(e);
  }
  /** Adopt all existing nodes that are spatially inside a newly created frame. */
  adoptNodesIntoNewFrame(e) {
    const o = this.getNodesInsideFrame(e);
    if (o.length > 0) {
      const r = /* @__PURE__ */ new Set();
      for (const n of o) r.add(n.id);
      this.frameChildren.set(e, r);
    }
  }
  nextZ() {
    return this.nextZValue++;
  }
  setNextZ(e) {
    this.nextZValue = e;
  }
  // --- Z-ordering ---
  bringToFront(e) {
    if (e.length !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const r = this.nodes.get(o);
        r && !r.locked && this.nodes.set(o, { ...r, z: this.nextZValue++ });
      }
      this.emit("change"), this.emit("history");
    }
  }
  sendToBack(e) {
    if (e.length !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (let o = e.length - 1; o >= 0; o--) {
        const r = this.nodes.get(e[o]);
        r && !r.locked && this.nodes.set(e[o], { ...r, z: --this._minZ });
      }
      this.emit("change"), this.emit("history");
    }
  }
  /** AABB overlap test between two nodes. */
  _nodesOverlap(e, o) {
    const r = this.resolveHeight(e), n = this.resolveHeight(o);
    return e.x < o.x + o.w && e.x + e.w > o.x && e.y < o.y + n && e.y + r > o.y;
  }
  bringForward(e) {
    if (e.length !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const r = this.nodes.get(o);
        if (!r || r.locked) continue;
        const n = r.type === "edge", s = [];
        for (const d of this.nodes.values())
          d.id !== o && (n ? d.type === "edge" : d.type !== "edge") && d.z >= r.z && this._nodesOverlap(r, d) && s.push(d);
        if (s.length === 0) continue;
        s.sort((d, p) => d.z - p.z);
        const i = s[0], a = this.nodes.get(i.id), l = r.z, c = a.z;
        l === c ? this.nodes.set(o, { ...r, z: c + 1 }) : (this.nodes.set(o, { ...r, z: c }), this.nodes.set(i.id, { ...a, z: l }));
      }
      this.emit("change"), this.emit("history");
    }
  }
  sendBackward(e) {
    if (e.length !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const r = this.nodes.get(o);
        if (!r || r.locked) continue;
        const n = r.type === "edge", s = [];
        for (const d of this.nodes.values())
          d.id !== o && (n ? d.type === "edge" : d.type !== "edge") && d.z <= r.z && this._nodesOverlap(r, d) && s.push(d);
        if (s.length === 0) continue;
        s.sort((d, p) => p.z - d.z);
        const i = s[0], a = this.nodes.get(i.id), l = r.z, c = a.z;
        l === c ? this.nodes.set(o, { ...r, z: c - 1 }) : (this.nodes.set(o, { ...r, z: c }), this.nodes.set(i.id, { ...a, z: l }));
      }
      this.emit("change"), this.emit("history");
    }
  }
  /** Update the QuadTree bounds for an auto-height node when its measured height changes. */
  updateMeasuredHeight(e, o) {
    const r = this.nodes.get(e);
    !r || r.h !== "auto" || (this._measuredHeights[e] = o, this.quadTree.remove(r), this.quadTree.insert(r, o));
  }
  // --- Spatial Queries ---
  hitTest(e, o, r) {
    const n = ue.isEnabled(), s = n ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), l = /* @__PURE__ */ new Map();
    for (const d of a) l.set(d.id, d);
    const c = Ql(l, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && ue.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, r) {
    const n = ue.isEnabled(), s = n ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), l = /* @__PURE__ */ new Map();
    for (const d of a) l.set(d.id, d);
    const c = $l(l, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && ue.recordHitTest(performance.now() - s), c;
  }
  getNodesInRect(e) {
    return this.quadTree.retrieve([], e);
  }
  // --- Selection ---
  /** Expand selection to include all group siblings, walking up the group
   *  hierarchy until the active group (or root) is reached. */
  expandSelectionToGroups() {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.selection) {
      const s = this.nodes.get(n);
      if (!(s != null && s.groupId) || this.activeGroupId && s.groupId === this.activeGroupId) continue;
      let i = s.groupId;
      for (; ; ) {
        const a = this.groupParent.get(i);
        if (!a || this.activeGroupId && a === this.activeGroupId) break;
        i = a;
      }
      e.add(i);
    }
    if (e.size === 0) return;
    const o = new Set(e), r = (n) => {
      const s = this.groupChildren.get(n);
      if (s)
        for (const i of s)
          o.has(i) || (o.add(i), r(i));
    };
    for (const n of e)
      r(n);
    for (const n of this.nodes.values())
      n.groupId && o.has(n.groupId) && this.selection.add(n.id);
  }
  select(e) {
    var o, r, n, s, i, a;
    for (const l of this.selection) {
      const c = this.nodes.get(l);
      c && ((n = (r = (o = this.registry) == null ? void 0 : o.get(c.type)) == null ? void 0 : r.onDeselect) == null || n.call(r, c, this), this.emit("node:deselect", c));
    }
    this.selection.clear(), this.selection.add(e), this.expandSelectionToGroups();
    for (const l of this.selection) {
      const c = this.nodes.get(l);
      c && ((a = (i = (s = this.registry) == null ? void 0 : s.get(c.type)) == null ? void 0 : i.onSelect) == null || a.call(i, c, this), this.emit("node:select", c));
    }
    this.emit("selection");
  }
  toggleSelect(e) {
    const o = this.nodes.get(e);
    if (this.selection.has(e))
      if (o != null && o.groupId)
        for (const r of this.nodes.values())
          r.groupId === o.groupId && this.selection.delete(r.id);
      else
        this.selection.delete(e);
    else
      this.selection.add(e), this.expandSelectionToGroups();
    this.emit("selection");
  }
  selectMultiple(e) {
    this.selection = new Set(e), this.expandSelectionToGroups(), this.emit("selection");
  }
  deselectAll() {
    var e, o, r;
    if (!(this.selection.size === 0 && !this.activeGroupId)) {
      for (const n of this.selection) {
        const s = this.nodes.get(n);
        s && ((r = (o = (e = this.registry) == null ? void 0 : e.get(s.type)) == null ? void 0 : o.onDeselect) == null || r.call(o, s, this), this.emit("node:deselect", s));
      }
      this.selection.clear(), this.activeGroupId && (this.activeGroupId = null, this.emit("group:exit")), this.emit("selection");
    }
  }
  deleteSelected() {
    var r, n, s;
    if (this.selection.size === 0) return;
    const e = new Set(
      Array.from(this.selection).filter((i) => {
        var a;
        return !((a = this.nodes.get(i)) != null && a.locked);
      })
    );
    if (e.size === 0) return;
    this.activeGroupId && this.getGroupMembers(this.activeGroupId).filter((a) => !e.has(a.id)).length === 0 && (this.activeGroupId = null, this.emit("group:exit")), this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = e;
    for (const i of e) {
      const a = this.nodes.get(i);
      a && ((s = (n = (r = this.registry) == null ? void 0 : r.get(a.type)) == null ? void 0 : n.onDelete) == null || s.call(n, a, this), this.emit("node:delete", a), this.quadTree.remove(a), this.nodes.delete(i));
    }
    for (const [i, a] of this.nodes)
      if (a.type === "edge") {
        const l = a.data;
        if (o.has(l.fromId) || o.has(l.toId)) {
          const c = this.nodes.get(i);
          c && this.quadTree.remove(c), this.nodes.delete(i);
        }
      }
    this.cleanupEmptyGroups();
    for (const i of e) this.selection.delete(i);
    this.refreshSearchIfNeeded(), this.emit("change"), this.emit("selection"), this.emit("history");
  }
  /** Remove groupParent entries for groups that no longer have any members. */
  cleanupEmptyGroups() {
    const e = /* @__PURE__ */ new Set();
    for (const o of this.nodes.values())
      o.groupId && e.add(o.groupId);
    for (const [o] of this.groupParent)
      e.has(o) || this.unlinkGroupParent(o);
  }
  /** Set a groupParent entry and keep groupChildren in sync. */
  linkGroupParent(e, o) {
    var s;
    const r = this.groupParent.get(e);
    r && ((s = this.groupChildren.get(r)) == null || s.delete(e)), this.groupParent.set(e, o);
    let n = this.groupChildren.get(o);
    n || (n = /* @__PURE__ */ new Set(), this.groupChildren.set(o, n)), n.add(e);
  }
  /** Remove a groupParent entry and keep groupChildren in sync. */
  unlinkGroupParent(e) {
    const o = this.groupParent.get(e);
    if (o) {
      const r = this.groupChildren.get(o);
      r && (r.delete(e), r.size === 0 && this.groupChildren.delete(o));
    }
    this.groupParent.delete(e);
  }
  /** Rebuild the groupChildren reverse index from groupParent. */
  rebuildGroupChildren() {
    this.groupChildren.clear();
    for (const [e, o] of this.groupParent) {
      let r = this.groupChildren.get(o);
      r || (r = /* @__PURE__ */ new Set(), this.groupChildren.set(o, r)), r.add(e);
    }
  }
  deleteNodes(e) {
    var r, n, s;
    if (e.length === 0) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = new Set(e);
    for (const i of e) {
      const a = this.nodes.get(i);
      if (a) {
        (s = (n = (r = this.registry) == null ? void 0 : r.get(a.type)) == null ? void 0 : n.onDelete) == null || s.call(n, a, this), this.emit("node:delete", a), this.quadTree.remove(a), this.nodes.delete(i), this.frameChildren.delete(i);
        for (const l of this.frameChildren.values()) l.delete(i);
      }
    }
    for (const [i, a] of this.nodes)
      if (a.type === "edge") {
        const l = a.data;
        if (o.has(l.fromId) || o.has(l.toId)) {
          const c = this.nodes.get(i);
          c && this.quadTree.remove(c), this.nodes.delete(i);
        }
      }
    this.selection.clear(), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("selection"), this.emit("history");
  }
  // --- Flip ---
  flipSelected(e) {
    var o;
    if (this.selection.size !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const r of this.selection) {
        const n = this.nodes.get(r);
        if (!n) continue;
        this.quadTree.remove(n);
        let s = null;
        const i = (o = this.registry) == null ? void 0 : o.get(n.type);
        if (i != null && i.onFlip) {
          const a = i.onFlip(n, e, this);
          a && Object.keys(a).length > 0 && (s = {
            ...n,
            data: { ...n.data, ...a }
          });
        } else if (n.type === "draw") {
          const a = n;
          if (e === "h") {
            const l = a.data.points.map(
              ([c, d, p]) => [a.w - c, d, p]
            );
            s = { ...a, data: { ...a.data, points: l } };
          } else {
            const l = a.h === "auto" ? 0 : a.h, c = a.data.points.map(
              ([d, p, u]) => [d, l - p, u]
            );
            s = { ...a, data: { ...a.data, points: c } };
          }
        } else if (n.type === "shape") {
          const a = n;
          if (a.data.shape === "arrow" || a.data.shape === "line")
            if (a.data.startPoint && a.data.endPoint)
              if (e === "h") {
                const l = [a.w - a.data.startPoint[0], a.data.startPoint[1]], c = [a.w - a.data.endPoint[0], a.data.endPoint[1]];
                s = { ...a, data: { ...a.data, startPoint: l, endPoint: c } };
              } else {
                const l = a.h === "auto" ? 0 : a.h, c = [a.data.startPoint[0], l - a.data.startPoint[1]], d = [a.data.endPoint[0], l - a.data.endPoint[1]];
                s = { ...a, data: { ...a.data, startPoint: c, endPoint: d } };
              }
            else
              s = e === "h" ? { ...a, rotation: -(a.rotation || 0) + 180 } : { ...a, rotation: -(a.rotation || 0) };
        } else if (n.type === "image") {
          const a = n;
          s = e === "h" ? { ...a, data: { ...a.data, flipH: !a.data.flipH } } : { ...a, data: { ...a.data, flipV: !a.data.flipV } };
        }
        s ? (this.nodes.set(r, s), this.quadTree.insert(s), this.emit("node:flip", s, e)) : this.quadTree.insert(n);
      }
      this.emit("change"), this.emit("history");
    }
  }
  flipSelectedHorizontal() {
    this.flipSelected("h");
  }
  flipSelectedVertical() {
    this.flipSelected("v");
  }
  // --- Grouping ---
  groupSelected() {
    if (this.selection.size < 2 || this.activeGroupId) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = zt(10), o = /* @__PURE__ */ new Set();
    for (const r of this.selection) {
      const n = this.nodes.get(r);
      if (n != null && n.groupId) {
        let s = n.groupId;
        for (; this.groupParent.has(s); ) s = this.groupParent.get(s);
        o.add(s);
      }
    }
    if (o.size > 0) {
      for (const r of o)
        this.linkGroupParent(r, e);
      for (const r of this.selection) {
        const n = this.nodes.get(r);
        n && !n.groupId && this.nodes.set(r, { ...n, groupId: e });
      }
    } else
      for (const r of this.selection) {
        const n = this.nodes.get(r);
        n && this.nodes.set(r, { ...n, groupId: e });
      }
    this.emit("change"), this.emit("history");
  }
  ungroupSelected() {
    if (this.selection.size === 0) return;
    const e = /* @__PURE__ */ new Set();
    for (const o of this.selection) {
      const r = this.nodes.get(o);
      if (r != null && r.groupId) {
        let n = r.groupId;
        for (; this.groupParent.has(n); ) {
          const s = this.groupParent.get(n);
          if (s === this.activeGroupId) break;
          n = s;
        }
        e.add(n);
      }
    }
    if (e.size !== 0) {
      this.activeGroupId && e.has(this.activeGroupId) && (this.activeGroupId = null, this.emit("group:exit")), this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const r = this.groupParent.get(o);
        for (const s of this.nodes.values())
          if (s.groupId === o)
            if (r)
              this.nodes.set(s.id, { ...s, groupId: r });
            else {
              const { groupId: i, ...a } = s;
              this.nodes.set(s.id, a);
            }
        const n = this.groupChildren.get(o);
        if (n)
          for (const s of [...n])
            r ? this.linkGroupParent(s, r) : this.unlinkGroupParent(s);
        this.unlinkGroupParent(o), this.groupChildren.delete(o), this.groupRotations.delete(o);
      }
      this.emit("change"), this.emit("history");
    }
  }
  selectionHasGroup() {
    var e;
    for (const o of this.selection)
      if ((e = this.nodes.get(o)) != null && e.groupId) return !0;
    return !1;
  }
  /** Returns the outermost groupId if all selected nodes belong to the same group tree, else undefined. */
  selectionGroupId() {
    if (this.selection.size < 2) return;
    let e;
    for (const o of this.selection) {
      const r = this.nodes.get(o);
      if (!(r != null && r.groupId)) return;
      let n = r.groupId;
      for (; this.groupParent.has(n); ) n = this.groupParent.get(n);
      if (!e) e = n;
      else if (n !== e) return;
    }
    return e;
  }
  /** True if all selected nodes belong to exactly one group (possibly nested). */
  selectionIsSingleGroup() {
    if (this.selection.size < 2) return !1;
    let e;
    for (const o of this.selection) {
      const r = this.nodes.get(o);
      if (!(r != null && r.groupId)) return !1;
      let n = r.groupId;
      for (; this.groupParent.has(n); ) n = this.groupParent.get(n);
      if (!e) e = n;
      else if (n !== e) return !1;
    }
    return !0;
  }
  getGroupMembers(e) {
    const o = [];
    for (const r of this.nodes.values())
      r.groupId === e && o.push(r);
    return o;
  }
  /** Enter a group for drill-down selection of individual children. */
  enterGroup(e) {
    this.activeGroupId !== e && (this.activeGroupId = e, this.emit("group:enter", e));
  }
  /** Fully exit all group levels and deselect. */
  exitAllGroups() {
    this.activeGroupId && (this.activeGroupId = null, this.emit("group:exit"));
  }
  /** Exit the active group — go up one level for nested groups, or exit entirely. */
  exitGroup() {
    if (!this.activeGroupId) return;
    const e = this.activeGroupId, o = this.groupParent.get(e);
    o ? (this.activeGroupId = o, this.emit("group:enter", o)) : (this.activeGroupId = null, this.emit("group:exit"));
    const r = this.getGroupMembers(e);
    r.length > 0 && (this.selection = /* @__PURE__ */ new Set([r[0].id]), this.expandSelectionToGroups(), this.emit("selection"));
  }
  /** Check if a node belongs to the currently active (entered) group or any of its descendants. */
  isNodeInActiveGroup(e) {
    if (!this.activeGroupId) return !1;
    const o = this.nodes.get(e);
    if (!(o != null && o.groupId)) return !1;
    let r = o.groupId;
    for (; r; ) {
      if (r === this.activeGroupId) return !0;
      r = this.groupParent.get(r);
    }
    return !1;
  }
  /** Get the outermost group of a node (stopping at activeGroupId boundary). */
  getNodeOutermostGroup(e) {
    const o = this.nodes.get(e);
    if (!(o != null && o.groupId)) return;
    let r = o.groupId;
    for (; ; ) {
      const n = this.groupParent.get(r);
      if (!n || this.activeGroupId && n === this.activeGroupId) break;
      r = n;
    }
    return r;
  }
  /** Get all nodes that are descendants of a group (direct + nested sub-groups). */
  getAllGroupDescendantNodes(e) {
    const o = /* @__PURE__ */ new Set([e]), r = (s) => {
      const i = this.groupChildren.get(s);
      if (i)
        for (const a of i)
          o.has(a) || (o.add(a), r(a));
    };
    r(e);
    const n = [];
    for (const s of this.nodes.values())
      s.groupId && o.has(s.groupId) && n.push(s);
    return n;
  }
  duplicateSelected() {
    if (this.selection.size === 0) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = 20, o = /* @__PURE__ */ new Map(), r = [];
    for (const s of this.selection) {
      const i = this.nodes.get(s);
      if (!i) continue;
      const a = zt();
      o.set(i.id, a), r.push({
        ...JSON.parse(JSON.stringify(i)),
        id: a,
        x: i.x + e,
        y: i.y + e,
        z: this.nextZValue++,
        locked: void 0
      });
    }
    for (const s of r)
      if (s.type === "edge" && s.data) {
        const i = s.data;
        o.has(i.fromId) && (i.fromId = o.get(i.fromId)), o.has(i.toId) && (i.toId = o.get(i.toId));
      }
    const n = /* @__PURE__ */ new Map();
    for (const s of r)
      s.groupId && (n.has(s.groupId) || n.set(s.groupId, zt(10)), s.groupId = n.get(s.groupId));
    for (const [s, i] of this.groupParent)
      n.has(s) && n.has(i) && this.linkGroupParent(n.get(s), n.get(i));
    this.addNodes(r), this.selection = new Set(r.map((s) => s.id)), this.emit("change"), this.emit("selection"), this.emit("history");
  }
  // --- Mode ---
  // --- Clipboard ---
  copySelected() {
    this.selection.size !== 0 && (this.clipboard = Array.from(this.selection).map((e) => {
      const o = this.nodes.get(e);
      return JSON.parse(JSON.stringify(o));
    }), this.pasteCount = 0);
  }
  cutSelected() {
    this.copySelected(), this.deleteSelected();
  }
  /**
   * Paste clipboard contents centered at a canvas position.
   * If no position given, uses viewport center.
   */
  pasteClipboard(e, o) {
    if (this.clipboard.length === 0) return;
    this.pasteCount++;
    let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
    for (const x of this.clipboard) {
      const b = x.h === "auto" ? 100 : x.h;
      x.x < r && (r = x.x), x.y < n && (n = x.y), x.x + x.w > s && (s = x.x + x.w), x.y + b > i && (i = x.y + b);
    }
    const a = (r + s) / 2, l = (n + i) / 2;
    let c, d;
    if (e !== void 0 && o !== void 0)
      c = e, d = o;
    else {
      const x = this.getWindow(), b = x.innerWidth / 2, v = x.innerHeight / 2, M = qo(this.viewport, b, v);
      c = M.x, d = M.y;
    }
    const p = this.pasteCount * 20, u = c - a + p, f = d - l + p, m = /* @__PURE__ */ new Map(), y = this.clipboard.map((x) => {
      const b = zt();
      return m.set(x.id, b), {
        ...structuredClone(x),
        id: b,
        x: x.x + u,
        y: x.y + f,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const x of y)
      if (x.type === "edge" && x.data) {
        const b = x.data;
        m.has(b.fromId) && (b.fromId = m.get(b.fromId)), m.has(b.toId) && (b.toId = m.get(b.toId));
      }
    const g = /* @__PURE__ */ new Map();
    for (const x of y)
      x.groupId && (g.has(x.groupId) || g.set(x.groupId, zt(10)), x.groupId = g.get(x.groupId));
    for (const [x, b] of this.groupParent)
      g.has(x) && g.has(b) && this.linkGroupParent(g.get(x), g.get(b));
    this.addNodes(y), this.selectMultiple(y.map((x) => x.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, r) {
    const n = Vi.find((f) => f.id === e);
    if (!n) return;
    const s = structuredClone(n.nodes), i = /* @__PURE__ */ new Map();
    for (const f of s) {
      const m = zt(10);
      i.set(f.id, m), f.id = m;
    }
    for (const f of s) {
      if (f.type === "edge" && f.data) {
        const m = f.data;
        i.has(m.fromId) && (m.fromId = i.get(m.fromId)), i.has(m.toId) && (m.toId = i.get(m.toId));
      }
      f.groupId && i.has(f.groupId) && (f.groupId = i.get(f.groupId));
    }
    let a = 1 / 0, l = 1 / 0, c = -1 / 0, d = -1 / 0;
    for (const f of s) {
      if (f.type === "edge") continue;
      const m = f.h === "auto" ? 100 : f.h;
      a = Math.min(a, f.x), l = Math.min(l, f.y), c = Math.max(c, f.x + f.w), d = Math.max(d, f.y + m);
    }
    const p = o - (a + c) / 2, u = r - (l + d) / 2;
    for (const f of s)
      f.type !== "edge" && (f.x += p, f.y += u), f.z = this.nextZValue++;
    this.addNodes(s), this.selectMultiple(s.map((f) => f.id));
  }
  hasClipboard() {
    return this.clipboard.length > 0;
  }
  getClipboardNodes() {
    return this.clipboard.map((e) => structuredClone(e));
  }
  setClipboard(e) {
    this.clipboard = e.map((o) => structuredClone(o)), this.pasteCount = 0;
  }
  // --- Mode ---
  setMode(e) {
    this.mode !== e && (this.mode = e, this.selection.size > 0 && (this.selection.clear(), this.emit("selection")), this.emit("mode"));
  }
  // --- History ---
  pushHistorySnapshot() {
    this.history.pushSnapshot(this.nodes, this.groupParent), this.emit("history");
  }
  /*private*/
  rebuildQuadTree() {
    this.quadTree.clear(), this.adjacency.clear();
    let e = 0, o = 0;
    for (const r of this.nodes.values())
      if (this.quadTree.insert(r), r.z < e && (e = r.z), r.z > o && (o = r.z), r.type === "edge") {
        const n = r, { fromId: s, toId: i } = n.data;
        this.adjacency.has(s) || this.adjacency.set(s, /* @__PURE__ */ new Set()), this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.get(s).add(r.id), this.adjacency.get(i).add(r.id);
      }
    this._minZ = e, this.nextZValue = o + 1;
  }
  undo() {
    const e = this.history.undo(this.nodes, this.groupParent);
    e && (this.nodes = e.nodes, this.groupParent = e.groupParent, this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), this.selection.clear(), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("selection"), this.emit("history"));
  }
  redo() {
    const e = this.history.redo(this.nodes, this.groupParent);
    e && (this.nodes = e.nodes, this.groupParent = e.groupParent, this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), this.selection.clear(), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("selection"), this.emit("history"));
  }
  canUndo() {
    return this.history.canUndo();
  }
  canRedo() {
    return this.history.canRedo();
  }
  // --- Remote Collaboration ---
  /** Add a remote node without emitting events or pushing history. */
  addRemoteNode(e) {
    if (this._suppressEvents = !0, this.nodes.set(e.id, e), this.quadTree.insert(e), e.type === "edge") {
      const o = e, { fromId: r, toId: n } = o.data;
      this.adjacency.has(r) || this.adjacency.set(r, /* @__PURE__ */ new Set()), this.adjacency.has(n) || this.adjacency.set(n, /* @__PURE__ */ new Set()), this.adjacency.get(r).add(e.id), this.adjacency.get(n).add(e.id);
    }
    e.z >= this.nextZValue && (this.nextZValue = e.z + 1), e.z < this._minZ && (this._minZ = e.z), this._suppressEvents = !1, this.refreshSearchIfNeeded();
  }
  /** Delete a remote node without emitting events or pushing history. */
  deleteRemoteNode(e) {
    var r;
    this._suppressEvents = !0;
    const o = this.nodes.get(e);
    if (o) {
      this.quadTree.remove(o), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
      for (const n of this.frameChildren.values()) n.delete(e);
      for (const [n, s] of this.nodes)
        if (s.type === "edge") {
          const i = s.data;
          if (i.fromId === e || i.toId === e) {
            const a = this.nodes.get(n);
            a && this.quadTree.remove(a), this.nodes.delete(n), this.selection.delete(n);
            const l = i.fromId === e ? i.toId : i.fromId;
            (r = this.adjacency.get(l)) == null || r.delete(n);
          }
        }
    }
    this._suppressEvents = !1, this.refreshSearchIfNeeded();
  }
  /** Apply a remote node update without emitting events or pushing history. */
  applyRemoteNodeUpdate(e, o) {
    this._suppressEvents = !0;
    const r = this.nodes.get(e);
    if (r) {
      const n = { ...r, ...o };
      o.data && typeof o.data == "object" && r.data && typeof r.data == "object" && (n.data = {
        ...r.data,
        ...o.data
      }), this.nodes.set(e, n), (r.x !== n.x || r.y !== n.y || r.w !== n.w || r.h !== n.h) && (this.quadTree.remove(r), this.quadTree.insert(n), this.updateConnectedEdges(e)), n.z >= this.nextZValue && (this.nextZValue = n.z + 1), o.data && this.refreshSearchIfNeeded();
    }
    this._suppressEvents = !1;
  }
  /** Trigger a re-render without pushing history. Used after remote updates. */
  notifyChange() {
    var e;
    (e = this.listeners.change) == null || e.forEach((o) => o());
  }
  /** Emit draw progress for collab live stroke preview. */
  notifyDrawProgress(e) {
    this.emit("draw:progress", e);
  }
  /** Emit draw end when a stroke is completed or cancelled. */
  notifyDrawEnd() {
    this.emit("draw:end");
  }
  /** Emit shape progress for collab live shape preview. */
  notifyShapeProgress(e) {
    this.emit("shape:progress", e);
  }
  /** Emit shape end when shape creation is completed or cancelled. */
  notifyShapeEnd() {
    this.emit("shape:end");
  }
  /** Emit laser pointer progress for collab trail preview. */
  notifyLaserProgress(e) {
    this.emit("laser:progress", e);
  }
  /** Emit laser pointer end when trail has fully faded. */
  notifyLaserEnd() {
    this.emit("laser:end");
  }
  // --- Serialization ---
  async toSBD() {
    return nc(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: r } = await dc(e);
    r.background && (this.boardBackground = r.background, this.emit("background")), r.originView ? this.originView = r.originView : this.originView = null;
    let n = 0, s = 0;
    for (const i of o)
      this.nodes.set(i.id, i), i.z > n && (n = i.z), i.z < s && (s = i.z);
    this.rebuildQuadTree(), this.rebuildFrameChildren(), this.nextZValue = n + 1, this._minZ = s, this.selection.clear(), this.refreshSearchIfNeeded(), this.goToOriginView(), this.emit("change"), this.emit("selection"), this.emit("history");
  }
  toJSON() {
    const e = {
      nodes: Array.from(this.nodes.entries()),
      viewport: this.viewport
    };
    return this.groupParent.size > 0 && (e.groupParent = Array.from(this.groupParent.entries())), e;
  }
  fromJSON(e) {
    this.history.clear(), this.nodes = new Map(e.nodes), this.groupParent = new Map(e.groupParent ?? []), this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), e.viewport && (this.viewport = e.viewport), this.selection.clear(), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("viewport"), this.emit("selection"), this.emit("history");
  }
}
class Pc {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yt(this, "types", /* @__PURE__ */ new Map());
    if (e)
      for (const o of e) this.register(o);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(e) {
    this.types.set(e.type, e);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(e) {
    return this.types.get(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll() {
    return Array.from(this.types.values());
  }
  /** Returns type strings for nodes that render in the DOM layer (not SVG-only). */
  getDOMTypes() {
    const e = /* @__PURE__ */ new Set();
    for (const o of this.types.values())
      o.isSVGOnly || e.add(o.type);
    return e;
  }
  has(e) {
    return this.types.has(e);
  }
}
const Qs = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Ac = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function Jr(t, e) {
  const o = Qs.indexOf(t);
  if (o === -1) return "default";
  const r = (e % 360 + 360) % 360, n = Math.round(r / 45) % 8, s = (o + n) % 8;
  return Ac[Qs[s]];
}
class Ec extends Cl {
  constructor() {
    super(...arguments);
    yt(this, "state", { hasError: !1 });
  }
  static getDerivedStateFromError() {
    return { hasError: !0 };
  }
  componentDidCatch(o, r) {
    console.error("[ContentBlock] Editor mount failed, showing markdown fallback:", o, r);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
function Js({ markdown: t }) {
  return /* @__PURE__ */ h(
    "div",
    {
      className: "sb-markdown-fallback",
      style: {
        padding: "8px 12px",
        fontSize: 14,
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        color: "#374151",
        opacity: 0.85
      },
      children: t || " "
    }
  );
}
const Rc = 0, Lc = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function Dc(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function Wc({
  node: t,
  isSelected: e,
  multiSelected: o,
  engine: r,
  schema: n,
  interactive: s,
  zoom: i,
  onMeasuredHeight: a,
  autoEdit: l
}) {
  const c = ct(null), d = ct(l === !0), p = ct(!1), u = ct(!1), f = ct(!1), m = ct(!1), y = ct(t.data.blocks), [g, x] = $(!1), [b, v] = $(!1), M = ct(null), C = Tl({ schema: n }), P = ct(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  bt(() => {
    const H = P.current;
    if (!H) return;
    P.current = null;
    const O = requestAnimationFrame(() => {
      try {
        C.replaceBlocks(C.document, H);
        return;
      } catch {
      }
      try {
        const _ = C.blocksToHTMLLossy(H);
        C._tiptapEditor.commands.setContent(_);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), v(!0);
    });
    return () => cancelAnimationFrame(O);
  }, [C]), bt(() => {
    (!e || o) && x(!1);
  }, [e, o]), bt(() => {
    d.current && (d.current = !1, p.current = !0, x(!0));
  }, [C]), bt(() => {
    if (!g || !p.current && !M.current) return;
    const H = M.current;
    M.current = null, p.current = !1;
    const O = requestAnimationFrame(() => {
      if (C.focus(), H)
        try {
          const _ = C._tiptapEditor, q = _.view.posAtCoords({ left: H.x, top: H.y });
          q && _.commands.setTextSelection(q.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(O);
  }, [g, C]);
  const F = at(() => {
    if (u.current || f.current) return;
    const H = r.getNode(t.id), O = C.document;
    y.current = O, r.updateNode(t.id, {
      data: { ...H == null ? void 0 : H.data, blocks: O }
    });
  }, [C, r, t.id]);
  bt(() => {
    if (!C) return;
    const H = () => {
      var tt, Z;
      if (u.current || f.current || m.current) return;
      const K = C.document.length, q = r.getNode(t.id), G = ((Z = (tt = q == null ? void 0 : q.data) == null ? void 0 : tt.blocks) == null ? void 0 : Z.length) ?? 0;
      if (K < G) return;
      const V = setTimeout(F, 100);
      return () => clearTimeout(V);
    };
    let O;
    const _ = C.onChange(() => {
      O == null || O(), O = H();
    });
    return () => {
      _ == null || _(), O == null || O();
    };
  }, [C, F]), bt(() => {
    const H = c.current;
    if (!H) return;
    const O = (_) => {
      const K = _.relatedTarget;
      K && H.contains(K) || F();
    };
    return H.addEventListener("focusout", O), () => H.removeEventListener("focusout", O);
  }, [F]), bt(() => {
    if (g || t.data.blocks === y.current) return;
    const H = JSON.stringify(t.data.blocks), O = JSON.stringify(y.current);
    if (H !== O) {
      if (t.data.blocks.length > 0 && C.document.length > 0) {
        m.current = !0;
        try {
          C.replaceBlocks(C.document, t.data.blocks);
        } catch {
          try {
            const _ = C.blocksToHTMLLossy(t.data.blocks);
            C._tiptapEditor.commands.setContent(_);
          } catch {
          }
        }
        m.current = !1;
      }
      y.current = t.data.blocks;
    }
  }, [t.data.blocks, g, C]), bt(() => {
    if (t.h !== "auto" || !a) return;
    const H = c.current;
    if (!H) return;
    const O = () => {
      const K = H.offsetHeight;
      K > 0 && a(t.id, K);
    };
    O();
    const _ = new ResizeObserver(O);
    return _.observe(H), () => _.disconnect();
  }, [t.id, t.h, a]);
  const B = at(() => {
    const H = r.getNode(t.id);
    if (!H || H.h === "auto" || !C || !c.current)
      return;
    const O = H.h - Rc, _ = c.current.querySelector(".bn-editor");
    if (!_) return;
    const K = C.document;
    if (K.length === 0) return;
    let q = 0;
    for (let Z = K.length - 1; Z >= 1 && Dc(K[Z]); Z--)
      q++;
    const G = _.scrollHeight, V = K.length > 0 ? G / K.length : 36;
    if (u.current = !0, G < O) {
      const Z = O - G, st = Math.max(0, Math.floor(Z / V));
      if (st > 0) {
        const dt = K[K.length - 1];
        C.insertBlocks(
          Array.from({ length: st }, () => ({
            type: "paragraph",
            content: []
          })),
          dt,
          "after"
        );
      }
    } else if (G > O && q > 0) {
      const Z = G - O, st = Math.min(q, Math.ceil(Z / V));
      if (st > 0) {
        const dt = K.slice(K.length - st);
        C.removeBlocks(dt);
      }
    }
    const tt = r.getNode(t.id);
    tt && r.updateNode(t.id, {
      data: { ...tt.data, blocks: C.document }
    }), u.current = !1;
  }, [C, r, t.id]), E = ct(B);
  E.current = B, bt(() => {
    if (t.h === "auto") return;
    const H = setTimeout(() => E.current(), 60);
    return () => clearTimeout(H);
  }, []);
  const X = at(
    (H) => {
      const O = H.currentTarget.ownerDocument;
      if (H.altKey) return;
      if (!r.selection.has(t.id) && r.selection.size > 0) {
        const { x: xt, y: ft } = r.screenToCanvas(H.clientX, H.clientY);
        for (const Et of r.selection) {
          const St = r.getNode(Et);
          if (!St) continue;
          const Rt = St.h === "auto" ? 100 : St.h;
          if (xt >= St.x && xt <= St.x + St.w && ft >= St.y && ft <= St.y + Rt)
            return;
        }
      }
      H.stopPropagation(), H.preventDefault(), H.currentTarget.setPointerCapture(H.pointerId), H.shiftKey ? r.toggleSelect(t.id) : r.selection.has(t.id) || r.select(t.id);
      const _ = H.clientX, K = H.clientY, q = Array.from(r.selection), G = q.map((xt) => {
        const ft = r.getNode(xt);
        return { id: xt, x: ft.x, y: ft.y };
      });
      let V = !1, tt = null, Z = _, st = K, dt = !1;
      const Mt = () => {
        tt = null;
        const xt = (Z - _) / r.viewport.zoom, ft = (st - K) / r.viewport.zoom, { finalDx: Et, finalDy: St } = r.computeDragSnap(
          G,
          q,
          xt,
          ft,
          dt
        ), Rt = G.map((ut) => ({
          id: ut.id,
          patch: { x: ut.x + Et, y: ut.y + St }
        }));
        r.updateMany(Rt);
      }, Ct = (xt) => {
        const ft = (xt.clientX - _) / r.viewport.zoom, Et = (xt.clientY - K) / r.viewport.zoom;
        if (!V)
          if (Math.abs(ft) > 2 || Math.abs(Et) > 2)
            V = !0, f.current = !0, r.pushHistorySnapshot();
          else
            return;
        Z = xt.clientX, st = xt.clientY, dt = xt.metaKey || xt.ctrlKey, tt === null && (tt = requestAnimationFrame(Mt));
      }, Pt = () => {
        f.current = !1, tt !== null && (cancelAnimationFrame(tt), Mt()), r.clearAlignGuides(), O.removeEventListener("pointermove", Ct), O.removeEventListener("pointerup", Pt);
      };
      O.addEventListener("pointermove", Ct), O.addEventListener("pointerup", Pt);
    },
    [r, t.id]
  ), nt = at(
    (H) => {
      var Mt;
      const O = H.currentTarget.ownerDocument;
      H.stopPropagation(), H.preventDefault();
      const _ = t.h === "auto" ? (((Mt = c.current) == null ? void 0 : Mt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h, K = t.x + t.w / 2, q = t.y + _ / 2, G = t.rotation || 0, { x: V, y: tt } = r.screenToCanvas(
        H.clientX,
        H.clientY
      ), Z = Math.atan2(tt - q, V - K);
      r.pushHistorySnapshot();
      const st = (Ct) => {
        const { x: Pt, y: xt } = r.screenToCanvas(Ct.clientX, Ct.clientY), ft = Math.atan2(xt - q, Pt - K);
        let Et = G + (ft - Z) * (180 / Math.PI);
        (Ct.shiftKey || r.snapToGrid) && !(Ct.metaKey || Ct.ctrlKey) && (Et = Math.round(Et / 15) * 15), r.updateNode(t.id, { rotation: Et });
      }, dt = () => {
        O.removeEventListener("pointermove", st), O.removeEventListener("pointerup", dt);
      };
      O.addEventListener("pointermove", st), O.addEventListener("pointerup", dt);
    },
    [r, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), Y = at(
    (H, O) => {
      var Mt;
      const _ = O.currentTarget.ownerDocument;
      O.stopPropagation(), O.preventDefault();
      const K = O.clientX, q = O.clientY, G = t.x, V = t.y, tt = t.w, Z = t.h === "auto" ? (((Mt = c.current) == null ? void 0 : Mt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h;
      r.pushHistorySnapshot();
      const st = (Ct) => {
        const Pt = (Ct.clientX - K) / r.viewport.zoom, xt = (Ct.clientY - q) / r.viewport.zoom;
        let ft = G, Et = V, St = tt, Rt = Z;
        if ((H === "nw" || H === "w" || H === "sw") && (ft = G + Pt, St = tt - Pt), (H === "ne" || H === "e" || H === "se") && (St = tt + Pt), (H === "nw" || H === "n" || H === "ne") && (Et = V + xt, Rt = Z - xt), (H === "sw" || H === "s" || H === "se") && (Rt = Z + xt), r.snapToGrid && !(Ct.metaKey || Ct.ctrlKey)) {
          const ut = r.gridSize, $t = (re) => Math.round(re / ut) * ut;
          (H === "nw" || H === "w" || H === "sw") && (ft = $t(ft), St = G + tt - ft), (H === "ne" || H === "e" || H === "se") && (St = $t(ft + St) - ft), (H === "nw" || H === "n" || H === "ne") && (Et = $t(Et), Rt = V + Z - Et), (H === "sw" || H === "s" || H === "se") && (Rt = $t(Et + Rt) - Et);
        }
        St < 100 && (St = 100, (H === "nw" || H === "w" || H === "sw") && (ft = G + tt - 100)), Rt < 60 && (Rt = 60, (H === "nw" || H === "n" || H === "ne") && (Et = V + Z - 60)), r.updateNode(t.id, { x: ft, y: Et, w: St, h: Rt });
      }, dt = () => {
        _.removeEventListener("pointermove", st), _.removeEventListener("pointerup", dt), requestAnimationFrame(() => E.current());
      };
      _.addEventListener("pointermove", st), _.addEventListener("pointerup", dt);
    },
    [r, t.id, t.x, t.y, t.w, t.h]
  ), ot = at(
    (H) => {
      if (!H.altKey) {
        if (g) {
          H.stopPropagation();
          return;
        }
        if (e) {
          X(H);
          return;
        }
        X(H);
      }
    },
    [g, e, X, r, t.id]
  ), J = at(
    (H) => {
      if (H.stopPropagation(), !g) {
        if (t.groupId) {
          const O = [];
          let _ = t.groupId;
          for (; _; )
            O.push(_), _ = r.groupParent.get(_);
          if (!r.activeGroupId) {
            r.enterGroup(O[O.length - 1]), r.select(t.id);
            return;
          }
          const K = O.indexOf(r.activeGroupId);
          if (K > 0) {
            r.enterGroup(O[K - 1]), r.select(t.id);
            return;
          }
        }
        r.select(t.id), M.current = { x: H.clientX, y: H.clientY }, x(!0);
      }
    },
    [g, r, t.id, t.groupId, C]
  ), lt = e && !o;
  return /* @__PURE__ */ k(
    "div",
    {
      ref: c,
      "data-node-id": t.id,
      className: s ? void 0 : "sb-block-inert",
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        zIndex: t.z,
        height: t.h === "auto" ? void 0 : t.h,
        minHeight: 20,
        border: t.data.borderColor ? `${t.data.borderWidth ?? 1}px ${t.data.borderStyle ?? "solid"} ${t.data.borderColor}` : "none",
        boxSizing: t.data.borderColor ? "border-box" : void 0,
        outline: e ? `${1.5 / i}px dashed #3b82f6` : "none",
        outlineOffset: t.data.borderColor ? 2 / i : 0,
        borderRadius: t.data.edgeStyle === "round" ? 12 : 0,
        background: "transparent",
        boxShadow: "none",
        overflow: "visible",
        pointerEvents: s ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
        opacity: t.data.opacity ?? 1,
        transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0
      },
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            onDoubleClick: J,
            style: {
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: t.data.borderColor || e ? 7 : 0
            },
            children: /* @__PURE__ */ h(
              "div",
              {
                className: "sb-editor-wrap",
                onPointerDown: ot,
                onKeyDown: g ? (H) => {
                  H.key === "Escape" && (H.stopPropagation(), x(!1));
                } : void 0,
                style: g ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: b ? /* @__PURE__ */ h(Js, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ h(Ec, { fallback: /* @__PURE__ */ h(Js, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ h(
                  Pl,
                  {
                    editor: C,
                    theme: "light",
                    editable: s && g
                  }
                ) })
              }
            )
          }
        ),
        lt && Lc.map(({ pos: H, top: O, left: _ }) => {
          const K = 8 / i;
          return /* @__PURE__ */ h(
            "div",
            {
              onPointerDown: (q) => Y(H, q),
              style: {
                position: "absolute",
                top: O,
                left: _,
                width: K,
                height: K,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: Jr(H, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            H
          );
        }),
        lt && (() => {
          const H = 25 / i, O = 10 / i;
          return /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ h(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -H,
                  left: "50%",
                  width: 1.5 / i,
                  height: H,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ h(
              "div",
              {
                onPointerDown: nt,
                style: {
                  position: "absolute",
                  top: -(H + O / 2),
                  left: "50%",
                  width: O,
                  height: O,
                  transform: "translateX(-50%) rotate(45deg)",
                  borderRadius: 1.5 / i,
                  background: "white",
                  border: `${1.5 / i}px solid #3b82f6`,
                  cursor: "grab",
                  zIndex: 10,
                  pointerEvents: "auto"
                }
              }
            )
          ] });
        })()
      ]
    }
  );
}
const oa = xe(Wc);
function Bc(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    oa,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: rs,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const Fc = {
  type: "content",
  component: Bc,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: Nc } = Math, yr = Nc + 1e-4, $s = 0.5, _s = [1, 1];
function ti(t, e, o, r = (n) => n) {
  return t * r(0.5 - e * (0.5 - o));
}
const { min: bn } = Math;
function ra(t, e, o) {
  let r = bn(1, e / o);
  return bn(1, t + (bn(1, 1 - r) - t) * (r * 0.275));
}
function Hc(t) {
  return [-t[0], -t[1]];
}
function Be(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function ei(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function to(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function Yn(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function _e(t, e) {
  return [t[0] * e, t[1] * e];
}
function xn(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function Oc(t, e) {
  return [t[0] / e, t[1] / e];
}
function na(t) {
  return [t[1], -t[0]];
}
function wn(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function oi(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function Xc(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Gc(t) {
  return Math.hypot(t[0], t[1]);
}
function ri(t, e) {
  let o = t[0] - e[0], r = t[1] - e[1];
  return o * o + r * r;
}
function sa(t) {
  return Oc(t, Gc(t));
}
function Yc(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function cs(t, e, o) {
  let r = Math.sin(o), n = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], a = s * n - i * r, l = s * r + i * n;
  return [a + e[0], l + e[1]];
}
function ni(t, e, o, r) {
  let n = Math.sin(r), s = Math.cos(r), i = e[0] - o[0], a = e[1] - o[1], l = i * s - a * n, c = i * n + a * s;
  return t[0] = l + o[0], t[1] = c + o[1], t;
}
function si(t, e, o) {
  return Be(t, _e(to(e, t), o));
}
function jc(t, e, o, r) {
  let n = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + n * r, t[1] = e[1] + s * r, t;
}
function ia(t, e, o) {
  return Be(t, _e(e, o));
}
const he = [0, 0], Ze = [0, 0], Qe = [0, 0];
function Vc(t, e) {
  let o = ia(t, sa(na(to(t, Be(t, [1, 1])))), -e), r = [], n = 1 / 13;
  for (let s = n; s <= 1; s += n) r.push(cs(o, t, yr * 2 * s));
  return r;
}
function qc(t, e, o) {
  let r = [], n = 1 / o;
  for (let s = n; s <= 1; s += n) r.push(cs(e, t, yr * s));
  return r;
}
function Kc(t, e, o) {
  let r = to(e, o), n = _e(r, 0.5), s = _e(r, 0.51);
  return [to(t, n), to(t, s), Be(t, s), Be(t, n)];
}
function Uc(t, e, o, r) {
  let n = [], s = ia(t, e, o), i = 1 / r;
  for (let a = i; a < 1; a += i) n.push(cs(s, t, yr * 3 * a));
  return n;
}
function Zc(t, e, o) {
  return [Be(t, _e(e, o)), Be(t, _e(e, o * 0.99)), to(t, _e(e, o * 0.99)), to(t, _e(e, o))];
}
function ii(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function Qc(t, e, o) {
  return t.slice(0, 10).reduce((r, n) => {
    let s = n.pressure;
    return e && (s = ra(r, n.distance, o)), (r + s) / 2;
  }, t[0].pressure);
}
function Jc(t, e = {}) {
  let { size: o = 16, smoothing: r = 0.5, thinning: n = 0.5, simulatePressure: s = !0, easing: i = (O) => O, start: a = {}, end: l = {}, last: c = !1 } = e, { cap: d = !0, easing: p = (O) => O * (2 - O) } = a, { cap: u = !0, easing: f = (O) => --O * O * O + 1 } = l;
  if (t.length === 0 || o <= 0) return [];
  let m = t[t.length - 1].runningLength, y = ii(a.taper, o, m), g = ii(l.taper, o, m), x = (o * r) ** 2, b = [], v = [], M = Qc(t, s, o), C = ti(o, n, t[t.length - 1].pressure, i), P, F = t[0].vector, B = t[0].point, E = B, X = B, nt = E, Y = !1;
  for (let O = 0; O < t.length; O++) {
    let { pressure: _ } = t[O], { point: K, vector: q, distance: G, runningLength: V } = t[O], tt = O === t.length - 1;
    if (!tt && m - V < 3) continue;
    n ? (s && (_ = ra(M, G, o)), C = ti(o, n, _, i)) : C = o / 2, P === void 0 && (P = C);
    let Z = V < y ? p(V / y) : 1, st = m - V < g ? f((m - V) / g) : 1;
    C = Math.max(0.01, C * Math.min(Z, st));
    let dt = (tt ? t[O] : t[O + 1]).vector, Mt = tt ? 1 : oi(q, dt), Ct = oi(q, F) < 0 && !Y, Pt = Mt !== null && Mt < 0;
    if (Ct || Pt) {
      wn(he, F), xn(he, he, C);
      for (let xt = 0; xt <= 1; xt += 0.07692307692307693) Yn(Ze, K, he), ni(Ze, Ze, K, yr * xt), X = [Ze[0], Ze[1]], b.push(X), ei(Qe, K, he), ni(Qe, Qe, K, yr * -xt), nt = [Qe[0], Qe[1]], v.push(nt);
      B = X, E = nt, Pt && (Y = !0);
      continue;
    }
    if (Y = !1, tt) {
      wn(he, q), xn(he, he, C), b.push(to(K, he)), v.push(Be(K, he));
      continue;
    }
    jc(he, dt, q, Mt), wn(he, he), xn(he, he, C), Yn(Ze, K, he), X = [Ze[0], Ze[1]], (O <= 1 || ri(B, X) > x) && (b.push(X), B = X), ei(Qe, K, he), nt = [Qe[0], Qe[1]], (O <= 1 || ri(E, nt) > x) && (v.push(nt), E = nt), M = _, F = q;
  }
  let ot = [t[0].point[0], t[0].point[1]], J = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : Be(t[0].point, [1, 1]), lt = [], H = [];
  if (t.length === 1) {
    if (!(y || g) || c) return Vc(ot, P || C);
  } else {
    y || g && t.length === 1 || (d ? lt.push(...qc(ot, v[0], 13)) : lt.push(...Kc(ot, b[0], v[0])));
    let O = na(Hc(t[t.length - 1].vector));
    g || y && t.length === 1 ? H.push(J) : u ? H.push(...Uc(J, O, C, 29)) : H.push(...Zc(J, O, C));
  }
  return b.concat(H, v.reverse(), lt);
}
const ai = [0, 0];
function li(t) {
  return t != null && t >= 0;
}
function $c(t, e = {}) {
  var u;
  let { streamline: o = 0.5, size: r = 16, last: n = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: f, y: m, pressure: y = $s }) => [f, m, y]);
  if (i.length === 2) {
    let f = i[1];
    i = i.slice(0, -1);
    for (let m = 1; m < 5; m++) i.push(si(i[0], f, m / 4));
  }
  i.length === 1 && (i = [...i, [...Be(i[0], _s), ...i[0].slice(2)]]);
  let a = [{ point: [i[0][0], i[0][1]], pressure: li(i[0][2]) ? i[0][2] : 0.25, vector: [..._s], distance: 0, runningLength: 0 }], l = !1, c = 0, d = a[0], p = i.length - 1;
  for (let f = 1; f < i.length; f++) {
    let m = n && f === p ? [i[f][0], i[f][1]] : si(d.point, i[f], s);
    if (Xc(d.point, m)) continue;
    let y = Yc(m, d.point);
    if (c += y, f < p && !l) {
      if (c < r) continue;
      l = !0;
    }
    Yn(ai, d.point, m), d = { point: m, pressure: li(i[f][2]) ? i[f][2] : $s, vector: sa(ai), distance: y, runningLength: c }, a.push(d);
  }
  return a[0].vector = ((u = a[1]) == null ? void 0 : u.vector) || [0, 0], a;
}
function _c(t, e = {}) {
  return Jc($c(t, e), e);
}
var td = _c;
function ds(t, e = {}) {
  const o = td(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return ed(o);
}
function ed(t) {
  if (!t.length) return "";
  const e = [], [o, r] = t[0];
  e.push("M", o, r);
  for (let n = 0; n < t.length; n++) {
    const [s, i] = t[n], [a, l] = t[(n + 1) % t.length];
    e.push("Q", s, i, (s + a) / 2, (i + l) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function aa(t, e = 0.5) {
  if (t.length < 2) return t;
  const o = 0.15 + (1 - e) * 0.85, r = [[t[0][0], t[0][1]]];
  for (let n = 1; n < t.length; n++) {
    const s = r[n - 1];
    r.push([
      s[0] + (t[n][0] - s[0]) * o,
      s[1] + (t[n][1] - s[1]) * o
    ]);
  }
  return r;
}
function od(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = aa(t, e), r = o.length, n = [];
  n.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < r; s++) {
    const [i, a] = o[s], [l, c] = o[(s + 1) % r];
    n.push("Q", i, a, (i + l) / 2, (a + c) / 2);
  }
  return n.push("Z"), n.join(" ");
}
function rd(t, e, o, r) {
  const n = e[0] - t[0], s = e[1] - t[1], i = r[0] - o[0], a = r[1] - o[1], l = n * a - s * i;
  if (Math.abs(l) < 1e-10) return null;
  const c = ((o[0] - t[0]) * a - (o[1] - t[1]) * i) / l, d = ((o[0] - t[0]) * s - (o[1] - t[1]) * n) / l;
  return c <= 0 || c >= 1 || d <= 0 || d >= 1 ? null : [t[0] + c * n, t[1] + c * s];
}
function nd(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function ci(t) {
  let e = 0;
  for (let o = 0, r = t.length - 1; o < t.length; r = o++)
    e += (t[r][0] + t[o][0]) * (t[r][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function sd(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let a = i + 2; a < e - 1; a++) {
      const l = rd(
        t[i],
        t[i + 1],
        t[a],
        t[a + 1]
      );
      if (!l) continue;
      const c = [l];
      for (let d = i + 1; d <= a; d++)
        c.push(t[d]);
      ci(c) < 100 || o.push({
        pathD: nd(c),
        points: c.map((d) => [d[0], d[1]])
      });
    }
  if (o.length === 0) return [];
  const r = o.map((i) => ci(i.points)), s = Math.max(...r) * 0.05;
  return o.filter((i, a) => r[a] >= s);
}
function kn(t, e, o) {
  if (t && t.length) {
    const [r, n] = e, s = Math.PI / 180 * o, i = Math.cos(s), a = Math.sin(s);
    for (const l of t) {
      const [c, d] = l;
      l[0] = (c - r) * i - (d - n) * a + r, l[1] = (c - r) * a + (d - n) * i + n;
    }
  }
}
function id(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function ad(t, e, o, r = 1) {
  const n = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, a = [0, 0];
  if (n) for (const c of i) kn(c, a, n);
  const l = function(c, d, p) {
    const u = [];
    for (const b of c) {
      const v = [...b];
      id(v[0], v[v.length - 1]) || v.push([v[0][0], v[0][1]]), v.length > 2 && u.push(v);
    }
    const f = [];
    d = Math.max(d, 0.1);
    const m = [];
    for (const b of u) for (let v = 0; v < b.length - 1; v++) {
      const M = b[v], C = b[v + 1];
      if (M[1] !== C[1]) {
        const P = Math.min(M[1], C[1]);
        m.push({ ymin: P, ymax: Math.max(M[1], C[1]), x: P === M[1] ? M[0] : C[0], islope: (C[0] - M[0]) / (C[1] - M[1]) });
      }
    }
    if (m.sort((b, v) => b.ymin < v.ymin ? -1 : b.ymin > v.ymin ? 1 : b.x < v.x ? -1 : b.x > v.x ? 1 : b.ymax === v.ymax ? 0 : (b.ymax - v.ymax) / Math.abs(b.ymax - v.ymax)), !m.length) return f;
    let y = [], g = m[0].ymin, x = 0;
    for (; y.length || m.length; ) {
      if (m.length) {
        let b = -1;
        for (let v = 0; v < m.length && !(m[v].ymin > g); v++) b = v;
        m.splice(0, b + 1).forEach((v) => {
          y.push({ s: g, edge: v });
        });
      }
      if (y = y.filter((b) => !(b.edge.ymax <= g)), y.sort((b, v) => b.edge.x === v.edge.x ? 0 : (b.edge.x - v.edge.x) / Math.abs(b.edge.x - v.edge.x)), (p !== 1 || x % d == 0) && y.length > 1) for (let b = 0; b < y.length; b += 2) {
        const v = b + 1;
        if (v >= y.length) break;
        const M = y[b].edge, C = y[v].edge;
        f.push([[Math.round(M.x), g], [Math.round(C.x), g]]);
      }
      g += p, y.forEach((b) => {
        b.edge.x = b.edge.x + p * b.edge.islope;
      }), x++;
    }
    return f;
  }(i, s, r);
  if (n) {
    for (const c of i) kn(c, a, -n);
    (function(c, d, p) {
      const u = [];
      c.forEach((f) => u.push(...f)), kn(u, d, p);
    })(l, a, -n);
  }
  return l;
}
function br(t, e) {
  var o;
  const r = e.hachureAngle + 90;
  let n = e.hachureGap;
  n < 0 && (n = 4 * e.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = n), ad(t, n, r, s || 1);
}
class hs {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const r = br(e, o);
    return { type: "fillSketch", ops: this.renderLines(r, o) };
  }
  renderLines(e, o) {
    const r = [];
    for (const n of e) r.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], o));
    return r;
  }
}
function $r(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class ld extends hs {
  fillPolygons(e, o) {
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    const n = br(e, Object.assign({}, o, { hachureGap: r })), s = Math.PI / 180 * o.hachureAngle, i = [], a = 0.5 * r * Math.cos(s), l = 0.5 * r * Math.sin(s);
    for (const [c, d] of n) $r([c, d]) && i.push([[c[0] - a, c[1] + l], [...d]], [[c[0] + a, c[1] - l], [...d]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class cd extends hs {
  fillPolygons(e, o) {
    const r = this._fillPolygons(e, o), n = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, n);
    return r.ops = r.ops.concat(s.ops), r;
  }
}
class dd {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = br(e, o = Object.assign({}, o, { hachureAngle: 0 }));
    return this.dotsOnLines(r, o);
  }
  dotsOnLines(e, o) {
    const r = [];
    let n = o.hachureGap;
    n < 0 && (n = 4 * o.strokeWidth), n = Math.max(n, 0.1);
    let s = o.fillWeight;
    s < 0 && (s = o.strokeWidth / 2);
    const i = n / 4;
    for (const a of e) {
      const l = $r(a), c = l / n, d = Math.ceil(c) - 1, p = l - d * n, u = (a[0][0] + a[1][0]) / 2 - n / 4, f = Math.min(a[0][1], a[1][1]);
      for (let m = 0; m < d; m++) {
        const y = f + p + m * n, g = u - i + 2 * Math.random() * i, x = y - i + 2 * Math.random() * i, b = this.helper.ellipse(g, x, s, s, o);
        r.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: r };
  }
}
class hd {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = br(e, o);
    return { type: "fillSketch", ops: this.dashedLine(r, o) };
  }
  dashedLine(e, o) {
    const r = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, n = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const a = $r(i), l = Math.floor(a / (r + n)), c = (a + n - l * (r + n)) / 2;
      let d = i[0], p = i[1];
      d[0] > p[0] && (d = i[1], p = i[0]);
      const u = Math.atan((p[1] - d[1]) / (p[0] - d[0]));
      for (let f = 0; f < l; f++) {
        const m = f * (r + n), y = m + r, g = [d[0] + m * Math.cos(u) + c * Math.cos(u), d[1] + m * Math.sin(u) + c * Math.sin(u)], x = [d[0] + y * Math.cos(u) + c * Math.cos(u), d[1] + y * Math.sin(u) + c * Math.sin(u)];
        s.push(...this.helper.doubleLineOps(g[0], g[1], x[0], x[1], o));
      }
    }), s;
  }
}
class ud {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, n = o.zigzagOffset < 0 ? r : o.zigzagOffset, s = br(e, o = Object.assign({}, o, { hachureGap: r + n }));
    return { type: "fillSketch", ops: this.zigzagLines(s, n, o) };
  }
  zigzagLines(e, o, r) {
    const n = [];
    return e.forEach((s) => {
      const i = $r(s), a = Math.round(i / (2 * o));
      let l = s[0], c = s[1];
      l[0] > c[0] && (l = s[1], c = s[0]);
      const d = Math.atan((c[1] - l[1]) / (c[0] - l[0]));
      for (let p = 0; p < a; p++) {
        const u = 2 * p * o, f = 2 * (p + 1) * o, m = Math.sqrt(2 * Math.pow(o, 2)), y = [l[0] + u * Math.cos(d), l[1] + u * Math.sin(d)], g = [l[0] + f * Math.cos(d), l[1] + f * Math.sin(d)], x = [y[0] + m * Math.cos(d + Math.PI / 4), y[1] + m * Math.sin(d + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(y[0], y[1], x[0], x[1], r), ...this.helper.doubleLineOps(x[0], x[1], g[0], g[1], r));
      }
    }), n;
  }
}
const me = {};
class pd {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const fd = 0, vn = 1, di = 2, Pr = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function Sn(t, e) {
  return t.type === e;
}
function us(t) {
  const e = [], o = function(i) {
    const a = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) a[a.length] = { type: fd, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      a[a.length] = { type: vn, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return a[a.length] = { type: di, text: "" }, a;
  }(t);
  let r = "BOD", n = 0, s = o[n];
  for (; !Sn(s, di); ) {
    let i = 0;
    const a = [];
    if (r === "BOD") {
      if (s.text !== "M" && s.text !== "m") return us("M0,0" + t);
      n++, i = Pr[s.text], r = s.text;
    } else Sn(s, vn) ? i = Pr[r] : (n++, i = Pr[s.text], r = s.text);
    if (!(n + i < o.length)) throw new Error("Path data ended short");
    for (let l = n; l < n + i; l++) {
      const c = o[l];
      if (!Sn(c, vn)) throw new Error("Param not a number: " + r + "," + c.text);
      a[a.length] = +c.text;
    }
    if (typeof Pr[r] != "number") throw new Error("Bad segment: " + r);
    {
      const l = { key: r, data: a };
      e.push(l), n += i, s = o[n], r === "M" && (r = "L"), r === "m" && (r = "l");
    }
  }
  return e;
}
function la(t) {
  let e = 0, o = 0, r = 0, n = 0;
  const s = [];
  for (const { key: i, data: a } of t) switch (i) {
    case "M":
      s.push({ key: "M", data: [...a] }), [e, o] = a, [r, n] = a;
      break;
    case "m":
      e += a[0], o += a[1], s.push({ key: "M", data: [e, o] }), r = e, n = o;
      break;
    case "L":
      s.push({ key: "L", data: [...a] }), [e, o] = a;
      break;
    case "l":
      e += a[0], o += a[1], s.push({ key: "L", data: [e, o] });
      break;
    case "C":
      s.push({ key: "C", data: [...a] }), e = a[4], o = a[5];
      break;
    case "c": {
      const l = a.map((c, d) => d % 2 ? c + o : c + e);
      s.push({ key: "C", data: l }), e = l[4], o = l[5];
      break;
    }
    case "Q":
      s.push({ key: "Q", data: [...a] }), e = a[2], o = a[3];
      break;
    case "q": {
      const l = a.map((c, d) => d % 2 ? c + o : c + e);
      s.push({ key: "Q", data: l }), e = l[2], o = l[3];
      break;
    }
    case "A":
      s.push({ key: "A", data: [...a] }), e = a[5], o = a[6];
      break;
    case "a":
      e += a[5], o += a[6], s.push({ key: "A", data: [a[0], a[1], a[2], a[3], a[4], e, o] });
      break;
    case "H":
      s.push({ key: "H", data: [...a] }), e = a[0];
      break;
    case "h":
      e += a[0], s.push({ key: "H", data: [e] });
      break;
    case "V":
      s.push({ key: "V", data: [...a] }), o = a[0];
      break;
    case "v":
      o += a[0], s.push({ key: "V", data: [o] });
      break;
    case "S":
      s.push({ key: "S", data: [...a] }), e = a[2], o = a[3];
      break;
    case "s": {
      const l = a.map((c, d) => d % 2 ? c + o : c + e);
      s.push({ key: "S", data: l }), e = l[2], o = l[3];
      break;
    }
    case "T":
      s.push({ key: "T", data: [...a] }), e = a[0], o = a[1];
      break;
    case "t":
      e += a[0], o += a[1], s.push({ key: "T", data: [e, o] });
      break;
    case "Z":
    case "z":
      s.push({ key: "Z", data: [] }), e = r, o = n;
  }
  return s;
}
function ca(t) {
  const e = [];
  let o = "", r = 0, n = 0, s = 0, i = 0, a = 0, l = 0;
  for (const { key: c, data: d } of t) {
    switch (c) {
      case "M":
        e.push({ key: "M", data: [...d] }), [r, n] = d, [s, i] = d;
        break;
      case "C":
        e.push({ key: "C", data: [...d] }), r = d[4], n = d[5], a = d[2], l = d[3];
        break;
      case "L":
        e.push({ key: "L", data: [...d] }), [r, n] = d;
        break;
      case "H":
        r = d[0], e.push({ key: "L", data: [r, n] });
        break;
      case "V":
        n = d[0], e.push({ key: "L", data: [r, n] });
        break;
      case "S": {
        let p = 0, u = 0;
        o === "C" || o === "S" ? (p = r + (r - a), u = n + (n - l)) : (p = r, u = n), e.push({ key: "C", data: [p, u, ...d] }), a = d[0], l = d[1], r = d[2], n = d[3];
        break;
      }
      case "T": {
        const [p, u] = d;
        let f = 0, m = 0;
        o === "Q" || o === "T" ? (f = r + (r - a), m = n + (n - l)) : (f = r, m = n);
        const y = r + 2 * (f - r) / 3, g = n + 2 * (m - n) / 3, x = p + 2 * (f - p) / 3, b = u + 2 * (m - u) / 3;
        e.push({ key: "C", data: [y, g, x, b, p, u] }), a = f, l = m, r = p, n = u;
        break;
      }
      case "Q": {
        const [p, u, f, m] = d, y = r + 2 * (p - r) / 3, g = n + 2 * (u - n) / 3, x = f + 2 * (p - f) / 3, b = m + 2 * (u - m) / 3;
        e.push({ key: "C", data: [y, g, x, b, f, m] }), a = p, l = u, r = f, n = m;
        break;
      }
      case "A": {
        const p = Math.abs(d[0]), u = Math.abs(d[1]), f = d[2], m = d[3], y = d[4], g = d[5], x = d[6];
        p === 0 || u === 0 ? (e.push({ key: "C", data: [r, n, g, x, g, x] }), r = g, n = x) : (r !== g || n !== x) && (da(r, n, g, x, p, u, f, m, y).forEach(function(b) {
          e.push({ key: "C", data: b });
        }), r = g, n = x);
        break;
      }
      case "Z":
        e.push({ key: "Z", data: [] }), r = s, n = i;
    }
    o = c;
  }
  return e;
}
function cr(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function da(t, e, o, r, n, s, i, a, l, c) {
  const d = (p = i, Math.PI * p / 180);
  var p;
  let u = [], f = 0, m = 0, y = 0, g = 0;
  if (c) [f, m, y, g] = c;
  else {
    [t, e] = cr(t, e, -d), [o, r] = cr(o, r, -d);
    const ot = (t - o) / 2, J = (e - r) / 2;
    let lt = ot * ot / (n * n) + J * J / (s * s);
    lt > 1 && (lt = Math.sqrt(lt), n *= lt, s *= lt);
    const H = n * n, O = s * s, _ = H * O - H * J * J - O * ot * ot, K = H * J * J + O * ot * ot, q = (a === l ? -1 : 1) * Math.sqrt(Math.abs(_ / K));
    y = q * n * J / s + (t + o) / 2, g = q * -s * ot / n + (e + r) / 2, f = Math.asin(parseFloat(((e - g) / s).toFixed(9))), m = Math.asin(parseFloat(((r - g) / s).toFixed(9))), t < y && (f = Math.PI - f), o < y && (m = Math.PI - m), f < 0 && (f = 2 * Math.PI + f), m < 0 && (m = 2 * Math.PI + m), l && f > m && (f -= 2 * Math.PI), !l && m > f && (m -= 2 * Math.PI);
  }
  let x = m - f;
  if (Math.abs(x) > 120 * Math.PI / 180) {
    const ot = m, J = o, lt = r;
    m = l && m > f ? f + 120 * Math.PI / 180 * 1 : f + 120 * Math.PI / 180 * -1, u = da(o = y + n * Math.cos(m), r = g + s * Math.sin(m), J, lt, n, s, i, 0, l, [m, ot, y, g]);
  }
  x = m - f;
  const b = Math.cos(f), v = Math.sin(f), M = Math.cos(m), C = Math.sin(m), P = Math.tan(x / 4), F = 4 / 3 * n * P, B = 4 / 3 * s * P, E = [t, e], X = [t + F * v, e - B * b], nt = [o + F * C, r - B * M], Y = [o, r];
  if (X[0] = 2 * E[0] - X[0], X[1] = 2 * E[1] - X[1], c) return [X, nt, Y].concat(u);
  {
    u = [X, nt, Y].concat(u);
    const ot = [];
    for (let J = 0; J < u.length; J += 3) {
      const lt = cr(u[J][0], u[J][1], d), H = cr(u[J + 1][0], u[J + 1][1], d), O = cr(u[J + 2][0], u[J + 2][1], d);
      ot.push([lt[0], lt[1], H[0], H[1], O[0], O[1]]);
    }
    return ot;
  }
}
const yd = { randOffset: function(t, e) {
  return Dt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return Gr(t, e, o);
}, ellipse: function(t, e, o, r, n) {
  const s = ua(o, r, n);
  return jn(t, e, n, s).opset;
}, doubleLineOps: function(t, e, o, r, n) {
  return ro(t, e, o, r, n, !0);
} };
function ha(t, e, o, r, n) {
  return { type: "path", ops: ro(t, e, o, r, n) };
}
function Fr(t, e, o) {
  const r = (t || []).length;
  if (r > 2) {
    const n = [];
    for (let s = 0; s < r - 1; s++) n.push(...ro(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && n.push(...ro(t[r - 1][0], t[r - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: n };
  }
  return r === 2 ? ha(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function gd(t, e, o, r, n) {
  return function(s, i) {
    return Fr(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + r], [t, e + r]], n);
}
function hi(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, r = Ar(o[0], 1 * (1 + 0.2 * e.roughness), e), n = e.disableMultiStroke ? [] : Ar(o[0], 1.5 * (1 + 0.22 * e.roughness), fi(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const a = Ar(i, 1 * (1 + 0.2 * e.roughness), e), l = e.disableMultiStroke ? [] : Ar(i, 1.5 * (1 + 0.22 * e.roughness), fi(e));
        for (const c of a) c.op !== "move" && r.push(c);
        for (const c of l) c.op !== "move" && n.push(c);
      }
    }
    return { type: "path", ops: r.concat(n) };
  }
  return { type: "path", ops: [] };
}
function ua(t, e, o) {
  const r = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), n = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * r)), s = 2 * Math.PI / n;
  let i = Math.abs(t / 2), a = Math.abs(e / 2);
  const l = 1 - o.curveFitting;
  return i += Dt(i * l, o), a += Dt(a * l, o), { increment: s, rx: i, ry: a };
}
function jn(t, e, o, r) {
  const [n, s] = yi(r.increment, t, e, r.rx, r.ry, 1, r.increment * Gr(0.1, Gr(0.4, 1, o), o), o);
  let i = Yr(n, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [a] = yi(r.increment, t, e, r.rx, r.ry, 1.5, 0, o), l = Yr(a, null, o);
    i = i.concat(l);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function ui(t, e, o, r, n, s, i, a, l) {
  const c = t, d = e;
  let p = Math.abs(o / 2), u = Math.abs(r / 2);
  p += Dt(0.01 * p, l), u += Dt(0.01 * u, l);
  let f = n, m = s;
  for (; f < 0; ) f += 2 * Math.PI, m += 2 * Math.PI;
  m - f > 2 * Math.PI && (f = 0, m = 2 * Math.PI);
  const y = 2 * Math.PI / l.curveStepCount, g = Math.min(y / 2, (m - f) / 2), x = gi(g, c, d, p, u, f, m, 1, l);
  if (!l.disableMultiStroke) {
    const b = gi(g, c, d, p, u, f, m, 1.5, l);
    x.push(...b);
  }
  return i && (a ? x.push(...ro(c, d, c + p * Math.cos(f), d + u * Math.sin(f), l), ...ro(c, d, c + p * Math.cos(m), d + u * Math.sin(m), l)) : x.push({ op: "lineTo", data: [c, d] }, { op: "lineTo", data: [c + p * Math.cos(f), d + u * Math.sin(f)] })), { type: "path", ops: x };
}
function pi(t, e) {
  const o = ca(la(us(t))), r = [];
  let n = [0, 0], s = [0, 0];
  for (const { key: i, data: a } of o) switch (i) {
    case "M":
      s = [a[0], a[1]], n = [a[0], a[1]];
      break;
    case "L":
      r.push(...ro(s[0], s[1], a[0], a[1], e)), s = [a[0], a[1]];
      break;
    case "C": {
      const [l, c, d, p, u, f] = a;
      r.push(...md(l, c, d, p, u, f, s, e)), s = [u, f];
      break;
    }
    case "Z":
      r.push(...ro(s[0], s[1], n[0], n[1], e)), s = [n[0], n[1]];
  }
  return { type: "path", ops: r };
}
function Mn(t, e) {
  const o = [];
  for (const r of t) if (r.length) {
    const n = e.maxRandomnessOffset || 0, s = r.length;
    if (s > 2) {
      o.push({ op: "move", data: [r[0][0] + Dt(n, e), r[0][1] + Dt(n, e)] });
      for (let i = 1; i < s; i++) o.push({ op: "lineTo", data: [r[i][0] + Dt(n, e), r[i][1] + Dt(n, e)] });
    }
  }
  return { type: "fillPath", ops: o };
}
function Wo(t, e) {
  return function(o, r) {
    let n = o.fillStyle || "hachure";
    if (!me[n]) switch (n) {
      case "zigzag":
        me[n] || (me[n] = new ld(r));
        break;
      case "cross-hatch":
        me[n] || (me[n] = new cd(r));
        break;
      case "dots":
        me[n] || (me[n] = new dd(r));
        break;
      case "dashed":
        me[n] || (me[n] = new hd(r));
        break;
      case "zigzag-line":
        me[n] || (me[n] = new ud(r));
        break;
      default:
        n = "hachure", me[n] || (me[n] = new hs(r));
    }
    return me[n];
  }(e, yd).fillPolygons(t, e);
}
function fi(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function pa(t) {
  return t.randomizer || (t.randomizer = new pd(t.seed || 0)), t.randomizer.next();
}
function Gr(t, e, o, r = 1) {
  return o.roughness * r * (pa(o) * (e - t) + t);
}
function Dt(t, e, o = 1) {
  return Gr(-t, t, e, o);
}
function ro(t, e, o, r, n, s = !1) {
  const i = s ? n.disableMultiStrokeFill : n.disableMultiStroke, a = Vn(t, e, o, r, n, !0, !1);
  if (i) return a;
  const l = Vn(t, e, o, r, n, !0, !0);
  return a.concat(l);
}
function Vn(t, e, o, r, n, s, i) {
  const a = Math.pow(t - o, 2) + Math.pow(e - r, 2), l = Math.sqrt(a);
  let c = 1;
  c = l < 200 ? 1 : l > 500 ? 0.4 : -16668e-7 * l + 1.233334;
  let d = n.maxRandomnessOffset || 0;
  d * d * 100 > a && (d = l / 10);
  const p = d / 2, u = 0.2 + 0.2 * pa(n);
  let f = n.bowing * n.maxRandomnessOffset * (r - e) / 200, m = n.bowing * n.maxRandomnessOffset * (t - o) / 200;
  f = Dt(f, n, c), m = Dt(m, n, c);
  const y = [], g = () => Dt(p, n, c), x = () => Dt(d, n, c), b = n.preserveVertices;
  return i ? y.push({ op: "move", data: [t + (b ? 0 : g()), e + (b ? 0 : g())] }) : y.push({ op: "move", data: [t + (b ? 0 : Dt(d, n, c)), e + (b ? 0 : Dt(d, n, c))] }), i ? y.push({ op: "bcurveTo", data: [f + t + (o - t) * u + g(), m + e + (r - e) * u + g(), f + t + 2 * (o - t) * u + g(), m + e + 2 * (r - e) * u + g(), o + (b ? 0 : g()), r + (b ? 0 : g())] }) : y.push({ op: "bcurveTo", data: [f + t + (o - t) * u + x(), m + e + (r - e) * u + x(), f + t + 2 * (o - t) * u + x(), m + e + 2 * (r - e) * u + x(), o + (b ? 0 : x()), r + (b ? 0 : x())] }), y;
}
function Ar(t, e, o) {
  if (!t.length) return [];
  const r = [];
  r.push([t[0][0] + Dt(e, o), t[0][1] + Dt(e, o)]), r.push([t[0][0] + Dt(e, o), t[0][1] + Dt(e, o)]);
  for (let n = 1; n < t.length; n++) r.push([t[n][0] + Dt(e, o), t[n][1] + Dt(e, o)]), n === t.length - 1 && r.push([t[n][0] + Dt(e, o), t[n][1] + Dt(e, o)]);
  return Yr(r, null, o);
}
function Yr(t, e, o) {
  const r = t.length, n = [];
  if (r > 3) {
    const s = [], i = 1 - o.curveTightness;
    n.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let a = 1; a + 2 < r; a++) {
      const l = t[a];
      s[0] = [l[0], l[1]], s[1] = [l[0] + (i * t[a + 1][0] - i * t[a - 1][0]) / 6, l[1] + (i * t[a + 1][1] - i * t[a - 1][1]) / 6], s[2] = [t[a + 1][0] + (i * t[a][0] - i * t[a + 2][0]) / 6, t[a + 1][1] + (i * t[a][1] - i * t[a + 2][1]) / 6], s[3] = [t[a + 1][0], t[a + 1][1]], n.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else r === 3 ? (n.push({ op: "move", data: [t[1][0], t[1][1]] }), n.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : r === 2 && n.push(...Vn(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return n;
}
function yi(t, e, o, r, n, s, i, a) {
  const l = [], c = [];
  if (a.roughness === 0) {
    t /= 4, c.push([e + r * Math.cos(-t), o + n * Math.sin(-t)]);
    for (let d = 0; d <= 2 * Math.PI; d += t) {
      const p = [e + r * Math.cos(d), o + n * Math.sin(d)];
      l.push(p), c.push(p);
    }
    c.push([e + r * Math.cos(0), o + n * Math.sin(0)]), c.push([e + r * Math.cos(t), o + n * Math.sin(t)]);
  } else {
    const d = Dt(0.5, a) - Math.PI / 2;
    c.push([Dt(s, a) + e + 0.9 * r * Math.cos(d - t), Dt(s, a) + o + 0.9 * n * Math.sin(d - t)]);
    const p = 2 * Math.PI + d - 0.01;
    for (let u = d; u < p; u += t) {
      const f = [Dt(s, a) + e + r * Math.cos(u), Dt(s, a) + o + n * Math.sin(u)];
      l.push(f), c.push(f);
    }
    c.push([Dt(s, a) + e + r * Math.cos(d + 2 * Math.PI + 0.5 * i), Dt(s, a) + o + n * Math.sin(d + 2 * Math.PI + 0.5 * i)]), c.push([Dt(s, a) + e + 0.98 * r * Math.cos(d + i), Dt(s, a) + o + 0.98 * n * Math.sin(d + i)]), c.push([Dt(s, a) + e + 0.9 * r * Math.cos(d + 0.5 * i), Dt(s, a) + o + 0.9 * n * Math.sin(d + 0.5 * i)]);
  }
  return [c, l];
}
function gi(t, e, o, r, n, s, i, a, l) {
  const c = s + Dt(0.1, l), d = [];
  d.push([Dt(a, l) + e + 0.9 * r * Math.cos(c - t), Dt(a, l) + o + 0.9 * n * Math.sin(c - t)]);
  for (let p = c; p <= i; p += t) d.push([Dt(a, l) + e + r * Math.cos(p), Dt(a, l) + o + n * Math.sin(p)]);
  return d.push([e + r * Math.cos(i), o + n * Math.sin(i)]), d.push([e + r * Math.cos(i), o + n * Math.sin(i)]), Yr(d, null, l);
}
function md(t, e, o, r, n, s, i, a) {
  const l = [], c = [a.maxRandomnessOffset || 1, (a.maxRandomnessOffset || 1) + 0.3];
  let d = [0, 0];
  const p = a.disableMultiStroke ? 1 : 2, u = a.preserveVertices;
  for (let f = 0; f < p; f++) f === 0 ? l.push({ op: "move", data: [i[0], i[1]] }) : l.push({ op: "move", data: [i[0] + (u ? 0 : Dt(c[0], a)), i[1] + (u ? 0 : Dt(c[0], a))] }), d = u ? [n, s] : [n + Dt(c[f], a), s + Dt(c[f], a)], l.push({ op: "bcurveTo", data: [t + Dt(c[f], a), e + Dt(c[f], a), o + Dt(c[f], a), r + Dt(c[f], a), d[0], d[1]] });
  return l;
}
function dr(t) {
  return [...t];
}
function mi(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const r = [];
  if (o === 3) r.push(dr(t[0]), dr(t[1]), dr(t[2]), dr(t[2]));
  else {
    const n = [];
    n.push(t[0], t[0]);
    for (let a = 1; a < t.length; a++) n.push(t[a]), a === t.length - 1 && n.push(t[a]);
    const s = [], i = 1 - e;
    r.push(dr(n[0]));
    for (let a = 1; a + 2 < n.length; a++) {
      const l = n[a];
      s[0] = [l[0], l[1]], s[1] = [l[0] + (i * n[a + 1][0] - i * n[a - 1][0]) / 6, l[1] + (i * n[a + 1][1] - i * n[a - 1][1]) / 6], s[2] = [n[a + 1][0] + (i * n[a][0] - i * n[a + 2][0]) / 6, n[a + 1][1] + (i * n[a][1] - i * n[a + 2][1]) / 6], s[3] = [n[a + 1][0], n[a + 1][1]], r.push(s[1], s[2], s[3]);
    }
  }
  return r;
}
function Nr(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function bd(t, e, o) {
  const r = Nr(e, o);
  if (r === 0) return Nr(t, e);
  let n = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / r;
  return n = Math.max(0, Math.min(1, n)), Nr(t, xo(e, o, n));
}
function xo(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function qn(t, e, o, r) {
  const n = r || [];
  if (function(a, l) {
    const c = a[l + 0], d = a[l + 1], p = a[l + 2], u = a[l + 3];
    let f = 3 * d[0] - 2 * c[0] - u[0];
    f *= f;
    let m = 3 * d[1] - 2 * c[1] - u[1];
    m *= m;
    let y = 3 * p[0] - 2 * u[0] - c[0];
    y *= y;
    let g = 3 * p[1] - 2 * u[1] - c[1];
    return g *= g, f < y && (f = y), m < g && (m = g), f + m;
  }(t, e) < o) {
    const a = t[e + 0];
    n.length ? (s = n[n.length - 1], i = a, Math.sqrt(Nr(s, i)) > 1 && n.push(a)) : n.push(a), n.push(t[e + 3]);
  } else {
    const l = t[e + 0], c = t[e + 1], d = t[e + 2], p = t[e + 3], u = xo(l, c, 0.5), f = xo(c, d, 0.5), m = xo(d, p, 0.5), y = xo(u, f, 0.5), g = xo(f, m, 0.5), x = xo(y, g, 0.5);
    qn([l, u, y, x], 0, o, n), qn([x, g, m, p], 0, o, n);
  }
  var s, i;
  return n;
}
function xd(t, e) {
  return jr(t, 0, t.length, e);
}
function jr(t, e, o, r, n) {
  const s = n || [], i = t[e], a = t[o - 1];
  let l = 0, c = 1;
  for (let d = e + 1; d < o - 1; ++d) {
    const p = bd(t[d], i, a);
    p > l && (l = p, c = d);
  }
  return Math.sqrt(l) > r ? (jr(t, e, c + 1, r, s), jr(t, c, o, r, s)) : (s.length || s.push(i), s.push(a)), s;
}
function Cn(t, e = 0.15, o) {
  const r = [], n = (t.length - 1) / 3;
  for (let s = 0; s < n; s++)
    qn(t, 3 * s, e, r);
  return o && o > 0 ? jr(r, 0, r.length, o) : r;
}
const we = "none";
class Vr {
  constructor(e) {
    this.defaultOptions = { maxRandomnessOffset: 2, roughness: 1, bowing: 1, stroke: "#000", strokeWidth: 1, curveTightness: 0, curveFitting: 0.95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, seed: 0, disableMultiStroke: !1, disableMultiStrokeFill: !1, preserveVertices: !1, fillShapeRoughnessGain: 0.8 }, this.config = e || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
  }
  static newSeed() {
    return Math.floor(Math.random() * 2 ** 31);
  }
  _o(e) {
    return e ? Object.assign({}, this.defaultOptions, e) : this.defaultOptions;
  }
  _d(e, o, r) {
    return { shape: e, sets: o || [], options: r || this.defaultOptions };
  }
  line(e, o, r, n, s) {
    const i = this._o(s);
    return this._d("line", [ha(e, o, r, n, i)], i);
  }
  rectangle(e, o, r, n, s) {
    const i = this._o(s), a = [], l = gd(e, o, r, n, i);
    if (i.fill) {
      const c = [[e, o], [e + r, o], [e + r, o + n], [e, o + n]];
      i.fillStyle === "solid" ? a.push(Mn([c], i)) : a.push(Wo([c], i));
    }
    return i.stroke !== we && a.push(l), this._d("rectangle", a, i);
  }
  ellipse(e, o, r, n, s) {
    const i = this._o(s), a = [], l = ua(r, n, i), c = jn(e, o, i, l);
    if (i.fill) if (i.fillStyle === "solid") {
      const d = jn(e, o, i, l).opset;
      d.type = "fillPath", a.push(d);
    } else a.push(Wo([c.estimatedPoints], i));
    return i.stroke !== we && a.push(c.opset), this._d("ellipse", a, i);
  }
  circle(e, o, r, n) {
    const s = this.ellipse(e, o, r, r, n);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const r = this._o(o);
    return this._d("linearPath", [Fr(e, !1, r)], r);
  }
  arc(e, o, r, n, s, i, a = !1, l) {
    const c = this._o(l), d = [], p = ui(e, o, r, n, s, i, a, !0, c);
    if (a && c.fill) if (c.fillStyle === "solid") {
      const u = Object.assign({}, c);
      u.disableMultiStroke = !0;
      const f = ui(e, o, r, n, s, i, !0, !1, u);
      f.type = "fillPath", d.push(f);
    } else d.push(function(u, f, m, y, g, x, b) {
      const v = u, M = f;
      let C = Math.abs(m / 2), P = Math.abs(y / 2);
      C += Dt(0.01 * C, b), P += Dt(0.01 * P, b);
      let F = g, B = x;
      for (; F < 0; ) F += 2 * Math.PI, B += 2 * Math.PI;
      B - F > 2 * Math.PI && (F = 0, B = 2 * Math.PI);
      const E = (B - F) / b.curveStepCount, X = [];
      for (let nt = F; nt <= B; nt += E) X.push([v + C * Math.cos(nt), M + P * Math.sin(nt)]);
      return X.push([v + C * Math.cos(B), M + P * Math.sin(B)]), X.push([v, M]), Wo([X], b);
    }(e, o, r, n, s, i, c));
    return c.stroke !== we && d.push(p), this._d("arc", d, c);
  }
  curve(e, o) {
    const r = this._o(o), n = [], s = hi(e, r);
    if (r.fill && r.fill !== we) if (r.fillStyle === "solid") {
      const i = hi(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], a = e;
      if (a.length) {
        const l = typeof a[0][0] == "number" ? [a] : a;
        for (const c of l) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...Cn(mi([c[0], c[0], c[1], c[2]]), 10, (1 + r.roughness) / 2)) : i.push(...Cn(mi(c), 10, (1 + r.roughness) / 2));
      }
      i.length && n.push(Wo([i], r));
    }
    return r.stroke !== we && n.push(s), this._d("curve", n, r);
  }
  polygon(e, o) {
    const r = this._o(o), n = [], s = Fr(e, !0, r);
    return r.fill && (r.fillStyle === "solid" ? n.push(Mn([e], r)) : n.push(Wo([e], r))), r.stroke !== we && n.push(s), this._d("polygon", n, r);
  }
  path(e, o) {
    const r = this._o(o), n = [];
    if (!e) return this._d("path", n, r);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = r.fill && r.fill !== "transparent" && r.fill !== we, i = r.stroke !== we, a = !!(r.simplification && r.simplification < 1), l = function(d, p, u) {
      const f = ca(la(us(d))), m = [];
      let y = [], g = [0, 0], x = [];
      const b = () => {
        x.length >= 4 && y.push(...Cn(x, p)), x = [];
      }, v = () => {
        b(), y.length && (m.push(y), y = []);
      };
      for (const { key: C, data: P } of f) switch (C) {
        case "M":
          v(), g = [P[0], P[1]], y.push(g);
          break;
        case "L":
          b(), y.push([P[0], P[1]]);
          break;
        case "C":
          if (!x.length) {
            const F = y.length ? y[y.length - 1] : g;
            x.push([F[0], F[1]]);
          }
          x.push([P[0], P[1]]), x.push([P[2], P[3]]), x.push([P[4], P[5]]);
          break;
        case "Z":
          b(), y.push([g[0], g[1]]);
      }
      if (v(), !u) return m;
      const M = [];
      for (const C of m) {
        const P = xd(C, u);
        P.length && M.push(P);
      }
      return M;
    }(e, 1, a ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2), c = pi(e, r);
    if (s) if (r.fillStyle === "solid") if (l.length === 1) {
      const d = pi(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(d.ops) });
    } else n.push(Mn(l, r));
    else n.push(Wo(l, r));
    return i && (a ? l.forEach((d) => {
      n.push(Fr(d, !1, r));
    }) : n.push(c)), this._d("path", n, r);
  }
  opsToPath(e, o) {
    let r = "";
    for (const n of e.ops) {
      const s = typeof o == "number" && o >= 0 ? n.data.map((i) => +i.toFixed(o)) : n.data;
      switch (n.op) {
        case "move":
          r += `M${s[0]} ${s[1]} `;
          break;
        case "bcurveTo":
          r += `C${s[0]} ${s[1]}, ${s[2]} ${s[3]}, ${s[4]} ${s[5]} `;
          break;
        case "lineTo":
          r += `L${s[0]} ${s[1]} `;
      }
    }
    return r.trim();
  }
  toPaths(e) {
    const o = e.sets || [], r = e.options || this.defaultOptions, n = [];
    for (const s of o) {
      let i = null;
      switch (s.type) {
        case "path":
          i = { d: this.opsToPath(s), stroke: r.stroke, strokeWidth: r.strokeWidth, fill: we };
          break;
        case "fillPath":
          i = { d: this.opsToPath(s), stroke: we, strokeWidth: 0, fill: r.fill || we };
          break;
        case "fillSketch":
          i = this.fillSketch(s, r);
      }
      i && n.push(i);
    }
    return n;
  }
  fillSketch(e, o) {
    let r = o.fillWeight;
    return r < 0 && (r = o.strokeWidth / 2), { d: this.opsToPath(e), stroke: o.fill || we, strokeWidth: r, fill: we };
  }
  _mergedShape(e) {
    return e.filter((o, r) => r === 0 || o.op !== "move");
  }
}
class wd {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new Vr(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.ctx, s = e.options.fixedDecimalPlaceDigits;
    for (const i of o) switch (i.type) {
      case "path":
        n.save(), n.strokeStyle = r.stroke === "none" ? "transparent" : r.stroke, n.lineWidth = r.strokeWidth, r.strokeLineDash && n.setLineDash(r.strokeLineDash), r.strokeLineDashOffset && (n.lineDashOffset = r.strokeLineDashOffset), this._drawToContext(n, i, s), n.restore();
        break;
      case "fillPath": {
        n.save(), n.fillStyle = r.fill || "";
        const a = e.shape === "curve" || e.shape === "polygon" || e.shape === "path" ? "evenodd" : "nonzero";
        this._drawToContext(n, i, s, a), n.restore();
        break;
      }
      case "fillSketch":
        this.fillSketch(n, i, r);
    }
  }
  fillSketch(e, o, r) {
    let n = r.fillWeight;
    n < 0 && (n = r.strokeWidth / 2), e.save(), r.fillLineDash && e.setLineDash(r.fillLineDash), r.fillLineDashOffset && (e.lineDashOffset = r.fillLineDashOffset), e.strokeStyle = r.fill || "", e.lineWidth = n, this._drawToContext(e, o, r.fixedDecimalPlaceDigits), e.restore();
  }
  _drawToContext(e, o, r, n = "nonzero") {
    e.beginPath();
    for (const s of o.ops) {
      const i = typeof r == "number" && r >= 0 ? s.data.map((a) => +a.toFixed(r)) : s.data;
      switch (s.op) {
        case "move":
          e.moveTo(i[0], i[1]);
          break;
        case "bcurveTo":
          e.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
          break;
        case "lineTo":
          e.lineTo(i[0], i[1]);
      }
    }
    o.type === "fillPath" ? e.fill(n) : e.stroke();
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  line(e, o, r, n, s) {
    const i = this.gen.line(e, o, r, n, s);
    return this.draw(i), i;
  }
  rectangle(e, o, r, n, s) {
    const i = this.gen.rectangle(e, o, r, n, s);
    return this.draw(i), i;
  }
  ellipse(e, o, r, n, s) {
    const i = this.gen.ellipse(e, o, r, n, s);
    return this.draw(i), i;
  }
  circle(e, o, r, n) {
    const s = this.gen.circle(e, o, r, n);
    return this.draw(s), s;
  }
  linearPath(e, o) {
    const r = this.gen.linearPath(e, o);
    return this.draw(r), r;
  }
  polygon(e, o) {
    const r = this.gen.polygon(e, o);
    return this.draw(r), r;
  }
  arc(e, o, r, n, s, i, a = !1, l) {
    const c = this.gen.arc(e, o, r, n, s, i, a, l);
    return this.draw(c), c;
  }
  curve(e, o) {
    const r = this.gen.curve(e, o);
    return this.draw(r), r;
  }
  path(e, o) {
    const r = this.gen.path(e, o);
    return this.draw(r), r;
  }
}
const Er = "http://www.w3.org/2000/svg";
class kd {
  constructor(e, o) {
    this.svg = e, this.gen = new Vr(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, s = n.createElementNS(Er, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const a of o) {
      let l = null;
      switch (a.type) {
        case "path":
          l = n.createElementNS(Er, "path"), l.setAttribute("d", this.opsToPath(a, i)), l.setAttribute("stroke", r.stroke), l.setAttribute("stroke-width", r.strokeWidth + ""), l.setAttribute("fill", "none"), r.strokeLineDash && l.setAttribute("stroke-dasharray", r.strokeLineDash.join(" ").trim()), r.strokeLineDashOffset && l.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
          break;
        case "fillPath":
          l = n.createElementNS(Er, "path"), l.setAttribute("d", this.opsToPath(a, i)), l.setAttribute("stroke", "none"), l.setAttribute("stroke-width", "0"), l.setAttribute("fill", r.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || l.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          l = this.fillSketch(n, a, r);
      }
      l && s.appendChild(l);
    }
    return s;
  }
  fillSketch(e, o, r) {
    let n = r.fillWeight;
    n < 0 && (n = r.strokeWidth / 2);
    const s = e.createElementNS(Er, "path");
    return s.setAttribute("d", this.opsToPath(o, r.fixedDecimalPlaceDigits)), s.setAttribute("stroke", r.fill || ""), s.setAttribute("stroke-width", n + ""), s.setAttribute("fill", "none"), r.fillLineDash && s.setAttribute("stroke-dasharray", r.fillLineDash.join(" ").trim()), r.fillLineDashOffset && s.setAttribute("stroke-dashoffset", `${r.fillLineDashOffset}`), s;
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  opsToPath(e, o) {
    return this.gen.opsToPath(e, o);
  }
  line(e, o, r, n, s) {
    const i = this.gen.line(e, o, r, n, s);
    return this.draw(i);
  }
  rectangle(e, o, r, n, s) {
    const i = this.gen.rectangle(e, o, r, n, s);
    return this.draw(i);
  }
  ellipse(e, o, r, n, s) {
    const i = this.gen.ellipse(e, o, r, n, s);
    return this.draw(i);
  }
  circle(e, o, r, n) {
    const s = this.gen.circle(e, o, r, n);
    return this.draw(s);
  }
  linearPath(e, o) {
    const r = this.gen.linearPath(e, o);
    return this.draw(r);
  }
  polygon(e, o) {
    const r = this.gen.polygon(e, o);
    return this.draw(r);
  }
  arc(e, o, r, n, s, i, a = !1, l) {
    const c = this.gen.arc(e, o, r, n, s, i, a, l);
    return this.draw(c);
  }
  curve(e, o) {
    const r = this.gen.curve(e, o);
    return this.draw(r);
  }
  path(e, o) {
    const r = this.gen.path(e, o);
    return this.draw(r);
  }
}
var vd = { canvas: (t, e) => new wd(t, e), svg: (t, e) => new kd(t, e), generator: (t) => new Vr(t), newSeed: () => Vr.newSeed() };
const je = vd.generator();
function Sd(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t.charCodeAt(o);
    e = (e << 5) - e + r, e |= 0;
  }
  return Math.abs(e);
}
function no(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? Sd(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function so(t) {
  var r;
  const e = t.options, o = (r = e == null ? void 0 : e.strokeLineDash) != null && r.length ? e.strokeLineDash.join(" ") : void 0;
  return je.toPaths(t).map((n) => ({
    d: n.d,
    stroke: n.stroke,
    strokeWidth: n.strokeWidth,
    fill: n.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: n.stroke !== "none" && n.strokeWidth > 0 ? o : void 0
  }));
}
function $o(t, e) {
  return Math.min(t, e) * 0.25;
}
function Md(t, e, o, r, n) {
  const s = Math.min(n, o / 2, r / 2);
  return [
    `M${t + s},${e}`,
    `L${t + o - s},${e}`,
    `A${s},${s} 0 0 1 ${t + o},${e + s}`,
    `L${t + o},${e + r - s}`,
    `A${s},${s} 0 0 1 ${t + o - s},${e + r}`,
    `L${t + s},${e + r}`,
    `A${s},${s} 0 0 1 ${t},${e + r - s}`,
    `L${t},${e + s}`,
    `A${s},${s} 0 0 1 ${t + s},${e}`,
    "Z"
  ].join(" ");
}
function qr(t, e, o, r, n, s) {
  if (s) {
    const i = $o(o, r);
    return so(je.path(Md(t, e, o, r, i), no(n)));
  }
  return so(je.rectangle(t, e, o, r, no(n)));
}
function ps(t, e, o, r, n) {
  return so(je.ellipse(t, e, o, r, no(n)));
}
function Cd(t, e, o, r, n) {
  const s = t + o / 2, i = e + r / 2, a = [s, e], l = [t + o, i], c = [s, e + r], d = [t, i], p = Math.hypot(o / 2, r / 2), u = Math.min(n, p / 2) / p, f = (P, F, B) => [
    P[0] + B * (F[0] - P[0]),
    P[1] + B * (F[1] - P[1])
  ], m = f(d, a, 1 - u), y = f(a, l, u), g = f(a, l, 1 - u), x = f(l, c, u), b = f(l, c, 1 - u), v = f(c, d, u), M = f(c, d, 1 - u), C = f(d, a, u);
  return [
    `M${y[0]},${y[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${l[0]},${l[1]} ${x[0]},${x[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${c[0]},${c[1]} ${v[0]},${v[1]}`,
    `L${M[0]},${M[1]}`,
    `Q${d[0]},${d[1]} ${C[0]},${C[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${a[0]},${a[1]} ${y[0]},${y[1]}`,
    "Z"
  ].join(" ");
}
function fs(t, e, o, r, n, s) {
  if (s) {
    const a = $o(o, r);
    return so(je.path(Cd(t, e, o, r, a), no(n)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + r / 2],
    [t + o / 2, e + r],
    [t, e + r / 2]
  ];
  return so(je.polygon(i, no(n)));
}
function Uo(t, e, o, r, n) {
  return so(je.line(t, e, o, r, no(n)));
}
function ys(t, e, o, r, n) {
  const s = Uo(t, e, o, r, n), i = Math.atan2(r - e, o - t), a = Math.max(12, n.strokeWidth * 4), l = Math.PI / 6, c = o - a * Math.cos(i - l), d = r - a * Math.sin(i - l), p = o - a * Math.cos(i + l), u = r - a * Math.sin(i + l), f = Uo(o, r, c, d, n), m = Uo(o, r, p, u, n);
  return [...s, ...f, ...m];
}
function bi(t, e) {
  const o = {
    ...no(e),
    stroke: "none"
  };
  return so(je.polygon(t, o));
}
function In(t, e) {
  return so(je.path(t, no(e)));
}
function io(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function Id(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function zd({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ h(Pd, { node: o }) : /* @__PURE__ */ h(Td, { node: o });
  }
  return /* @__PURE__ */ h(Ad, { node: t, editingLabel: e });
}
const Kr = xe(zd), Td = xe(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", r = io(e.data.strokeStyle), n = Kt(
    () => o ? null : ds(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Kt(() => {
    const d = e.data.points;
    if (!d || d.length === 0) return "";
    if (d.length === 1) return `M${d[0][0]},${d[0][1]}L${d[0][0]},${d[0][1]}`;
    const p = [`M${d[0][0]},${d[0][1]}`];
    for (let u = 1; u < d.length; u++)
      p.push(`L${d[u][0]},${d[u][1]}`);
    return p.join("");
  }, [e.data.points]), i = Kt(() => {
    if (!o) return null;
    const d = e.data.points;
    if (d.length < 2) return "";
    const p = ["M", d[0][0], d[0][1]];
    for (let f = 1; f < d.length; f++) {
      const [m, y] = d[f], [g, x] = d[f - 1];
      p.push("Q", g, x, (g + m) / 2, (x + y) / 2);
    }
    const u = d[d.length - 1];
    return p.push("L", u[0], u[1]), p.join(" ");
  }, [e.data.points, o]), a = Kt(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const d = e.data.points.map((M) => [M[0], M[1]]), p = aa(d), u = p[0], f = p[p.length - 1], m = Math.hypot(u[0] - f[0], u[1] - f[1]);
    let y = 0;
    for (let M = 1; M < p.length; M++)
      y += Math.hypot(p[M][0] - p[M - 1][0], p[M][1] - p[M - 1][1]);
    const g = y >= 1 && m <= Math.max(e.data.strokeWidth * 4, 20) && m <= y * 0.1, x = e.data.fillStyle || "solid";
    if (g) {
      const M = od(p, 0);
      return x === "solid" ? { kind: "solid", d: M, fill: e.data.fill } : { kind: "rough", paths: bi(p, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: x,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const b = sd(p);
    if (b.length === 0) return null;
    if (x === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: b
      };
    const v = [];
    for (const { points: M } of b)
      M.length >= 3 && v.push(
        ...bi(M, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: x,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: v, regions: b };
  }, [e.data.fill, e.data.fillStyle, e.data.points, e.data.strokeWidth]), l = e.h === "auto" ? 0 : e.h, c = e.data.strokeWidth * 4;
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - c,
        top: e.y - c,
        width: e.w + c * 2,
        height: l + c * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: e.w + c * 2,
          height: l + c * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ k("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
            (a == null ? void 0 : a.kind) === "solid" && (a.regions ? a.regions.map((d, p) => /* @__PURE__ */ h(
              "path",
              {
                d: d.pathD,
                fill: a.fill,
                stroke: "none"
              },
              p
            )) : /* @__PURE__ */ h("path", { d: a.d, fill: a.fill, stroke: "none" })),
            (a == null ? void 0 : a.kind) === "rough" && a.paths.map((d, p) => /* @__PURE__ */ h(
              "path",
              {
                d: d.d,
                stroke: d.stroke,
                strokeWidth: d.strokeWidth,
                fill: d.fill,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              p
            )),
            o ? /* @__PURE__ */ h(
              "path",
              {
                d: i,
                fill: "none",
                stroke: e.data.color,
                strokeWidth: e.data.strokeWidth,
                strokeDasharray: r == null ? void 0 : r.map((d) => d * Math.max(e.data.strokeWidth, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) : /* @__PURE__ */ h(
              "path",
              {
                d: n,
                fill: e.data.color
              }
            ),
            s && /* @__PURE__ */ h(
              "path",
              {
                d: s,
                fill: "none",
                stroke: "transparent",
                strokeWidth: e.data.strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                pointerEvents: "stroke"
              }
            )
          ] })
        }
      )
    }
  );
}), Pd = xe(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, r = e.data.strokeWidth * 2, n = Kt(() => {
    const a = e.data.points;
    if (!a || a.length === 0) return "";
    const l = [`M${a[0][0]},${a[0][1]}`];
    for (let c = 1; c < a.length; c++)
      l.push(`L${a[c][0]},${a[c][1]}`);
    return l.push("Z"), l.join("");
  }, [e.data.points]), s = io(e.data.strokeStyle), i = s == null ? void 0 : s.map((a) => a * Math.max(e.data.strokeWidth, 1)).join(" ");
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - r,
        top: e.y - r,
        width: e.w + r * 2,
        height: o + r * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: e.w + r * 2,
          height: o + r * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ k("g", { transform: `translate(${r}, ${r})`, opacity: e.data.opacity ?? 1, children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: n,
                fill: e.data.fill || "none",
                stroke: e.data.color,
                strokeWidth: e.data.strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeDasharray: i
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: n,
                fill: e.data.fill ? "transparent" : "none",
                stroke: "transparent",
                strokeWidth: Math.max(e.data.strokeWidth, 8),
                pointerEvents: e.data.fill ? "painted" : "stroke"
              }
            )
          ] })
        }
      )
    }
  );
}), Ad = xe(function({ node: e, editingLabel: o }) {
  var g, x, b, v;
  const r = e.h === "auto" ? 100 : e.h, n = e.data.strokeWidth * 2, s = io(e.data.strokeStyle), i = ((g = e.data.startPoint) == null ? void 0 : g[0]) ?? 0, a = ((x = e.data.startPoint) == null ? void 0 : x[1]) ?? r / 2, l = ((b = e.data.endPoint) == null ? void 0 : b[0]) ?? e.w, c = ((v = e.data.endPoint) == null ? void 0 : v[1]) ?? r / 2, d = Kt(() => {
    if (e.data.roughness === 0) return null;
    const M = {
      stroke: e.data.stroke,
      fill: e.data.fill,
      fillStyle: e.data.fillStyle,
      roughness: e.data.roughness,
      strokeWidth: e.data.strokeWidth,
      strokeLineDash: s,
      seed: e.id
    }, C = e.data.edgeStyle === "round";
    switch (e.data.shape) {
      case "rect":
        return qr(0, 0, e.w, r, M, C);
      case "ellipse":
        return ps(e.w / 2, r / 2, e.w, r, M);
      case "diamond":
        return fs(0, 0, e.w, r, M, C);
      case "line":
        return Uo(i, a, l, c, M);
      case "arrow":
        return ys(i, a, l, c, M);
      default:
        return null;
    }
  }, [e, s, i, a, l, c, r]), p = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, u = e.data.opacity ?? 1, f = e.data.shape === "line" || e.data.shape === "arrow", m = e.data.label, y = e.data.labelFontSize ?? 14;
  return /* @__PURE__ */ k(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x,
        top: e.y,
        width: e.w,
        height: r,
        zIndex: e.z,
        pointerEvents: "none",
        overflow: "visible",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: [
        /* @__PURE__ */ h(
          "svg",
          {
            width: e.w + n * 2,
            height: r + n * 2,
            style: { overflow: "visible", marginLeft: -n, marginTop: -n },
            children: /* @__PURE__ */ k("g", { transform: `translate(${n}, ${n})`, opacity: u, children: [
              p && /* @__PURE__ */ h(
                Ld,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              d ? d.map((M, C) => p && M.fill && M.fill !== "none" ? null : /* @__PURE__ */ h(
                "path",
                {
                  d: M.d,
                  stroke: M.stroke,
                  strokeWidth: M.strokeWidth,
                  fill: M.fill,
                  strokeDasharray: M.strokeDasharray,
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                C
              )) : /* @__PURE__ */ h(
                Ed,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
                  x1: i,
                  y1: a,
                  x2: l,
                  y2: c,
                  stroke: e.data.stroke,
                  fill: e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  dashArray: s,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              /* @__PURE__ */ h(
                Rd,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
                  x1: i,
                  y1: a,
                  x2: l,
                  y2: c,
                  hasFill: !!e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  rounded: e.data.edgeStyle === "round"
                }
              )
            ] })
          }
        ),
        !f && m && !o && /* @__PURE__ */ h(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              padding: "4px 8px"
            },
            children: /* @__PURE__ */ h(
              "div",
              {
                style: {
                  textAlign: e.data.labelAlign ?? "center",
                  fontFamily: oo(e.data.labelFontFamily ?? eo),
                  fontSize: y,
                  color: e.data.fill && e.data.fillStyle === "solid" ? Id(e.data.fill) : e.data.stroke,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  width: "100%"
                },
                children: m
              }
            )
          }
        )
      ]
    }
  );
});
function gs(t, e) {
  const o = $o(t, e), r = t / 2, n = e / 2, s = [r, 0], i = [t, n], a = [r, e], l = [0, n], c = Math.hypot(t / 2, e / 2), d = Math.min(o, c / 2) / c, p = (M, C, P) => [
    M[0] + P * (C[0] - M[0]),
    M[1] + P * (C[1] - M[1])
  ], u = p(s, i, d), f = p(s, i, 1 - d), m = p(i, a, d), y = p(i, a, 1 - d), g = p(a, l, d), x = p(a, l, 1 - d), b = p(l, s, d), v = p(l, s, 1 - d);
  return [
    `M${u[0]},${u[1]}`,
    `L${f[0]},${f[1]}`,
    `Q${i[0]},${i[1]} ${m[0]},${m[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${a[0]},${a[1]} ${g[0]},${g[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${l[0]},${l[1]} ${b[0]},${b[1]}`,
    `L${v[0]},${v[1]}`,
    `Q${s[0]},${s[1]} ${u[0]},${u[1]}`,
    "Z"
  ].join(" ");
}
function Ed({
  shape: t,
  w: e,
  h: o,
  x1: r,
  y1: n,
  x2: s,
  y2: i,
  stroke: a,
  fill: l,
  strokeWidth: c,
  dashArray: d,
  rounded: p
}) {
  const u = d == null ? void 0 : d.join(",");
  switch (t) {
    case "rect": {
      const f = !!l && l !== "none", m = o <= Math.max(c * 2, 4), y = e <= Math.max(c * 2, 4);
      if (!f && (m || y))
        return m && e >= o ? /* @__PURE__ */ h(
          "line",
          {
            x1: 0,
            y1: o / 2,
            x2: e,
            y2: o / 2,
            stroke: a,
            strokeWidth: Math.max(c, o),
            strokeDasharray: u
          }
        ) : /* @__PURE__ */ h(
          "line",
          {
            x1: e / 2,
            y1: 0,
            x2: e / 2,
            y2: o,
            stroke: a,
            strokeWidth: Math.max(c, e),
            strokeDasharray: u
          }
        );
      const g = p ? $o(e, o) : 0;
      return /* @__PURE__ */ h(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: g || void 0,
          ry: g || void 0,
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: u
        }
      );
    }
    case "ellipse":
      return /* @__PURE__ */ h(
        "ellipse",
        {
          cx: e / 2,
          cy: o / 2,
          rx: e / 2,
          ry: o / 2,
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: u
        }
      );
    case "diamond":
      return p ? /* @__PURE__ */ h(
        "path",
        {
          d: gs(e, o),
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: u
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: u
        }
      );
    case "line":
      return /* @__PURE__ */ h(
        "line",
        {
          x1: r,
          y1: n,
          x2: s,
          y2: i,
          stroke: a,
          strokeWidth: c,
          strokeDasharray: u
        }
      );
    case "arrow": {
      const f = Math.atan2(i - n, s - r), m = Math.max(12, c * 4), y = Math.PI / 6, g = s - m * Math.cos(f - y), x = i - m * Math.sin(f - y), b = s - m * Math.cos(f + y), v = i - m * Math.sin(f + y);
      return /* @__PURE__ */ k(mt, { children: [
        /* @__PURE__ */ h(
          "line",
          {
            x1: r,
            y1: n,
            x2: s,
            y2: i,
            stroke: a,
            strokeWidth: c,
            strokeDasharray: u
          }
        ),
        /* @__PURE__ */ h(
          "polyline",
          {
            points: `${g},${x} ${s},${i} ${b},${v}`,
            stroke: a,
            strokeWidth: c,
            fill: "none"
          }
        )
      ] });
    }
    default:
      return null;
  }
}
function Rd({
  shape: t,
  w: e,
  h: o,
  x1: r,
  y1: n,
  x2: s,
  y2: i,
  hasFill: a,
  strokeWidth: l,
  rounded: c
}) {
  const d = a ? "painted" : "stroke", p = a ? "transparent" : "none";
  switch (t) {
    case "rect": {
      const u = c ? $o(e, o) : 0;
      return /* @__PURE__ */ h(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: u || void 0,
          ry: u || void 0,
          fill: p,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: d
        }
      );
    }
    case "ellipse":
      return /* @__PURE__ */ h(
        "ellipse",
        {
          cx: e / 2,
          cy: o / 2,
          rx: e / 2,
          ry: o / 2,
          fill: p,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: d
        }
      );
    case "diamond":
      return c ? /* @__PURE__ */ h(
        "path",
        {
          d: gs(e, o),
          fill: p,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: d
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: p,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: d
        }
      );
    case "line":
    case "arrow":
      return /* @__PURE__ */ h(
        "line",
        {
          x1: r,
          y1: n,
          x2: s,
          y2: i,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: "stroke"
        }
      );
    default:
      return null;
  }
}
function Ld({
  shape: t,
  w: e,
  h: o,
  fill: r,
  rounded: n
}) {
  switch (t) {
    case "rect": {
      const s = n ? $o(e, o) : 0;
      return /* @__PURE__ */ h("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: r, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ h("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: r, stroke: "none" });
    case "diamond":
      return n ? /* @__PURE__ */ h(
        "path",
        {
          d: gs(e, o),
          fill: r,
          stroke: "none"
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: r,
          stroke: "none"
        }
      );
    default:
      return null;
  }
}
const Dd = xe(function(e) {
  return /* @__PURE__ */ h(Kr, { node: e.node });
}), Wd = {
  type: "draw",
  component: Dd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => os(t, e, o, r),
  getHitPadding: (t) => {
    const e = t.data;
    return Math.max(20, e.strokeWidth * 4);
  },
  onResize: (t, e, o) => ({
    points: t.data.points.map(
      ([n, s, i]) => [n * e, s * o, i]
    )
  }),
  onFlip: (t, e) => {
    const o = t.data;
    if (e === "h")
      return {
        points: o.points.map(
          ([n, s, i]) => [t.w - n, s, i]
        )
      };
    const r = t.h === "auto" ? 0 : t.h;
    return {
      points: o.points.map(
        ([n, s, i]) => [n, r - s, i]
      )
    };
  },
  getClipboardText: () => null
}, Bd = xe(function(e) {
  const o = e.node;
  return /* @__PURE__ */ h(Kr, { node: o, editingLabel: e.editing });
}), Fd = {
  type: "shape",
  component: Bd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => Qr(t, e, o, r),
  onResize: (t, e, o) => {
    const r = t.data, n = {};
    return r.startPoint && (n.startPoint = [r.startPoint[0] * e, r.startPoint[1] * o]), r.endPoint && (n.endPoint = [r.endPoint[0] * e, r.endPoint[1] * o]), Object.keys(n).length > 0 ? n : null;
  },
  onFlip: (t, e) => {
    const o = t.data;
    if (o.shape !== "arrow" && o.shape !== "line")
      return {};
    if (e === "h")
      return o.startPoint && o.endPoint ? {
        startPoint: [t.w - o.startPoint[0], o.startPoint[1]],
        endPoint: [t.w - o.endPoint[0], o.endPoint[1]]
      } : {};
    const r = t.h === "auto" ? 0 : t.h;
    return o.startPoint && o.endPoint ? {
      startPoint: [o.startPoint[0], r - o.startPoint[1]],
      endPoint: [o.endPoint[0], r - o.endPoint[1]]
    } : {};
  },
  getClipboardText: (t) => t.data.label || null
};
function Nd(t) {
  return null;
}
const Hd = {
  type: "edge",
  component: Nd,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, Rr = 0.05, Od = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function Xd({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  onResizeHandleDown: s,
  cropping: i,
  onCropStart: a,
  onCropEnd: l
}) {
  const c = t.h, d = t.data.crop, p = ct(!1);
  p.current = !!i;
  const u = ct(null), [f, m] = $(null), y = at(() => {
    u.current && u.current.naturalWidth > 0 && m({ w: u.current.naturalWidth, h: u.current.naturalHeight });
  }, []);
  bt(() => {
    u.current && u.current.naturalWidth > 0 && m({ w: u.current.naturalWidth, h: u.current.naturalHeight });
  }, [t.data.src]);
  const [g, x] = $({ x: 0, y: 0, w: 1, h: 1 });
  bt(() => {
    i && (x(d ?? { x: 0, y: 0, w: 1, h: 1 }), !f && u.current && u.current.naturalWidth > 0 && m({ w: u.current.naturalWidth, h: u.current.naturalHeight }));
  }, [i]);
  const b = Kt(() => {
    if (!f) return null;
    const K = f.w / f.h, q = t.w / c;
    let G, V;
    return K > q ? (G = t.w, V = t.w / K) : (V = c, G = c * K), { x: (t.w - G) / 2, y: (c - V) / 2, w: G, h: V };
  }, [f, t.w, c]), v = at(() => {
    const K = g.x < 1e-3 && g.y < 1e-3 && g.w > 0.999 && g.h > 0.999;
    o.updateNodeWithHistory(t.id, {
      data: {
        ...t.data,
        crop: K ? void 0 : { x: g.x, y: g.y, w: g.w, h: g.h }
      }
    }), l == null || l();
  }, [o, t, g, l]), M = at(() => {
    l == null || l();
  }, [l]);
  bt(() => {
    if (!i) return;
    const K = (q) => {
      q.key === "Enter" ? (v(), q.preventDefault(), q.stopPropagation()) : q.key === "Escape" && (M(), q.preventDefault(), q.stopPropagation());
    };
    return document.addEventListener("keydown", K, !0), () => document.removeEventListener("keydown", K, !0);
  }, [i, v, M]);
  const C = at(
    (K, q) => {
      if (q.stopPropagation(), q.preventDefault(), !b) return;
      const G = q.currentTarget.ownerDocument, V = q.clientX, tt = q.clientY, Z = { ...g }, st = (Mt) => {
        const Ct = (Mt.clientX - V) / n / b.w, Pt = (Mt.clientY - tt) / n / b.h, xt = { ...Z }, ft = Z.x + Z.w, Et = Z.y + Z.h;
        if (K.includes("left")) {
          const St = Math.max(0, Math.min(ft - Rr, Z.x + Ct));
          xt.x = St, xt.w = ft - St;
        }
        if (K.includes("right") && (xt.w = Math.max(
          Rr,
          Math.min(1 - Z.x, Z.w + Ct)
        )), K.includes("top")) {
          const St = Math.max(0, Math.min(Et - Rr, Z.y + Pt));
          xt.y = St, xt.h = Et - St;
        }
        K.includes("bottom") && (xt.h = Math.max(
          Rr,
          Math.min(1 - Z.y, Z.h + Pt)
        )), x(xt);
      }, dt = () => {
        G.removeEventListener("pointermove", st), G.removeEventListener("pointerup", dt);
      };
      G.addEventListener("pointermove", st), G.addEventListener("pointerup", dt);
    },
    [g, b, n]
  ), P = at(
    (K) => {
      if (K.stopPropagation(), K.preventDefault(), !b) return;
      const q = K.currentTarget.ownerDocument, G = K.clientX, V = K.clientY, tt = { ...g }, Z = (dt) => {
        const Mt = (dt.clientX - G) / n / b.w, Ct = (dt.clientY - V) / n / b.h;
        x({
          ...tt,
          x: Math.max(0, Math.min(1 - tt.w, tt.x + Mt)),
          y: Math.max(0, Math.min(1 - tt.h, tt.y + Ct))
        });
      }, st = () => {
        q.removeEventListener("pointermove", Z), q.removeEventListener("pointerup", st);
      };
      q.addEventListener("pointermove", Z), q.addEventListener("pointerup", st);
    },
    [g, b, n]
  ), F = at(
    (K) => {
      if (p.current) return;
      const q = K.currentTarget.ownerDocument;
      if (K.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: St, y: Rt } = o.screenToCanvas(
          K.clientX,
          K.clientY
        );
        for (const ut of o.selection) {
          const $t = o.getNode(ut);
          if (!$t) continue;
          const re = $t.h === "auto" ? 100 : $t.h;
          if (St >= $t.x && St <= $t.x + $t.w && Rt >= $t.y && Rt <= $t.y + re)
            return;
        }
      }
      K.stopPropagation(), K.preventDefault(), K.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const G = K.clientX, V = K.clientY, tt = Array.from(o.selection), Z = tt.map((St) => {
        const Rt = o.getNode(St);
        return { id: St, x: Rt.x, y: Rt.y };
      });
      let st = !1, dt = null, Mt = G, Ct = V, Pt = !1;
      const xt = () => {
        dt = null;
        const St = (Mt - G) / o.viewport.zoom, Rt = (Ct - V) / o.viewport.zoom, { finalDx: ut, finalDy: $t } = o.computeDragSnap(
          Z,
          tt,
          St,
          Rt,
          Pt
        ), re = Z.map((ne) => ({
          id: ne.id,
          patch: { x: ne.x + ut, y: ne.y + $t }
        }));
        o.updateMany(re);
      }, ft = (St) => {
        const Rt = (St.clientX - G) / o.viewport.zoom, ut = (St.clientY - V) / o.viewport.zoom;
        if (!st)
          if (Math.abs(Rt) > 2 || Math.abs(ut) > 2)
            st = !0, o.pushHistorySnapshot();
          else
            return;
        Mt = St.clientX, Ct = St.clientY, Pt = St.metaKey || St.ctrlKey, dt === null && (dt = requestAnimationFrame(xt));
      }, Et = () => {
        dt !== null && (cancelAnimationFrame(dt), xt()), o.clearAlignGuides(), q.removeEventListener("pointermove", ft), q.removeEventListener("pointerup", Et);
      };
      q.addEventListener("pointermove", ft), q.addEventListener("pointerup", Et);
    },
    [o, t.id]
  ), B = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], E = 8 / n, X = E / 2, nt = 25 / n, Y = e && s && !i, ot = at(
    (K) => {
      const q = K.currentTarget.ownerDocument;
      K.stopPropagation(), K.preventDefault();
      const G = t.x + t.w / 2, V = t.y + c / 2, tt = t.rotation || 0, { x: Z, y: st } = o.screenToCanvas(
        K.clientX,
        K.clientY
      ), dt = Math.atan2(st - V, Z - G);
      o.pushHistorySnapshot();
      const Mt = (Pt) => {
        const { x: xt, y: ft } = o.screenToCanvas(
          Pt.clientX,
          Pt.clientY
        ), Et = Math.atan2(ft - V, xt - G);
        let St = tt + (Et - dt) * (180 / Math.PI);
        (Pt.shiftKey || o.snapToGrid) && !(Pt.metaKey || Pt.ctrlKey) && (St = Math.round(St / 15) * 15), o.updateNode(t.id, { rotation: St });
      }, Ct = () => {
        q.removeEventListener("pointermove", Mt), q.removeEventListener("pointerup", Ct);
      };
      q.addEventListener("pointermove", Mt), q.addEventListener("pointerup", Ct);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), J = i && b ? {
    left: b.x + g.x * b.w,
    top: b.y + g.y * b.h,
    width: g.w * b.w,
    height: g.h * b.h
  } : null, lt = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, H = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: lt
  };
  if (!i && d) {
    const K = d.y * 100, q = (1 - d.x - d.w) * 100, G = (1 - d.y - d.h) * 100, V = d.x * 100;
    H.objectViewBox = `inset(${K}% ${q}% ${G}% ${V}%)`;
  }
  const O = 8 / n, _ = O / 2;
  return /* @__PURE__ */ k(
    "div",
    {
      onPointerDown: F,
      onDoubleClick: !i && r ? (K) => {
        K.stopPropagation(), a == null || a();
      } : void 0,
      style: {
        position: "absolute",
        left: t.x + t.w / 2,
        top: t.y + c / 2,
        width: t.w,
        height: c,
        marginLeft: -t.w / 2,
        marginTop: -c / 2,
        zIndex: t.z,
        border: e ? "2px dashed #3b82f6" : "none",
        borderRadius: 6,
        overflow: "visible",
        pointerEvents: r ? "auto" : "none",
        cursor: i ? "default" : "move",
        transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0,
        transformOrigin: "center center",
        boxSizing: "border-box"
      },
      children: [
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 4,
              border: t.data.borderColor ? `${t.data.borderWidth ?? 1}px ${t.data.borderStyle ?? "solid"} ${t.data.borderColor}` : "none",
              boxSizing: "border-box"
            },
            children: [
              /* @__PURE__ */ h(
                "img",
                {
                  ref: u,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: y,
                  style: H,
                  draggable: !1
                }
              ),
              i && J && /* @__PURE__ */ h(
                "div",
                {
                  onPointerDown: P,
                  style: {
                    position: "absolute",
                    left: J.left,
                    top: J.top,
                    width: J.width,
                    height: J.height,
                    boxShadow: `0 0 0 ${Math.max(t.w, c) * 2}px rgba(0,0,0,0.45)`,
                    border: `${1.5 / n}px dashed rgba(255,255,255,0.8)`,
                    boxSizing: "border-box",
                    cursor: "move",
                    zIndex: 10
                  }
                }
              )
            ]
          }
        ),
        i && J && Od.map(({ pos: K, edges: q, cx: G, cy: V, cursor: tt }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (Z) => C(q, Z),
            style: {
              position: "absolute",
              left: J.left + G * J.width - _,
              top: J.top + V * J.height - _,
              width: O,
              height: O,
              background: "white",
              border: `${1.5 / n}px solid #3b82f6`,
              borderRadius: 2,
              cursor: tt,
              zIndex: 11
            }
          },
          K
        )),
        e && !i && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: -nt,
                width: 1,
                height: nt,
                background: "#3b82f6",
                marginLeft: -0.5,
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              onPointerDown: ot,
              style: {
                position: "absolute",
                left: "50%",
                top: -(nt + E / 2),
                width: E,
                height: E,
                marginLeft: -E / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        Y && B.map(({ pos: K, cx: q, cy: G }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (V) => {
              V.stopPropagation(), s == null || s(t.id, K, V);
            },
            style: {
              position: "absolute",
              left: `calc(${q * 100}% - ${X}px)`,
              top: `calc(${G * 100}% - ${X}px)`,
              width: E,
              height: E,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: Jr(K, t.rotation || 0)
            }
          },
          K
        ))
      ]
    }
  );
}
const fa = xe(Xd);
function Gd(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    fa,
    {
      node: e,
      isSelected: t.isSelected,
      engine: t.engine,
      interactive: t.interactive,
      zoom: t.zoom,
      onResizeHandleDown: t.callbacks.onResizeHandleDown,
      cropping: t.editing,
      onCropStart: () => {
        var o, r;
        return (r = (o = t.callbacks).onEditStart) == null ? void 0 : r.call(o, e.id);
      },
      onCropEnd: () => {
        var o, r;
        return (r = (o = t.callbacks).onEditEnd) == null ? void 0 : r.call(o);
      }
    }
  );
}
const Yd = {
  type: "image",
  component: Gd,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function jd({
  node: t,
  engine: e,
  editing: o,
  editClickPos: r,
  onStopEdit: n,
  onMeasuredHeight: s
}) {
  const i = ct(null), [a, l] = $(t.data.text), c = ct(!1), d = ct(t.data.text), p = ct(null), u = ct(e);
  u.current = e;
  const f = ct(t);
  f.current = t, bt(() => {
    o || l(t.data.text);
  }, [t.data.text]), Zr(() => {
    var C, P;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const F = i.current.ownerDocument;
      let B = !1;
      if (r) {
        const E = F.caretRangeFromPoint(r.clientX, r.clientY);
        if (E && i.current.contains(E.startContainer)) {
          const X = (C = F.defaultView) == null ? void 0 : C.getSelection();
          X == null || X.removeAllRanges(), X == null || X.addRange(E), B = !0;
        }
      }
      if (!B) {
        const E = F.createRange(), X = (P = F.defaultView) == null ? void 0 : P.getSelection();
        i.current.childNodes.length > 0 && (E.selectNodeContents(i.current), E.collapse(!1)), X == null || X.removeAllRanges(), X == null || X.addRange(E);
      }
      d.current = t.data.text, c.current = !1;
    }
  }, [o]), bt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const C = d.current, P = e.getNode(t.id);
        if (P && P.type === "text") {
          const F = P.data;
          C !== F.text && e.updateNodeWithHistory(t.id, {
            data: { ...F, text: C }
          });
        }
      };
  }, [o, e, t.id]), bt(() => {
    if (!i.current || !s) return;
    const C = new ResizeObserver(() => {
      var F;
      const P = ((F = i.current) == null ? void 0 : F.offsetHeight) ?? 0;
      P > 0 && s(t.id, P);
    });
    return C.observe(i.current), () => C.disconnect();
  }, [t.id, s, o]);
  const m = at(() => {
    var P;
    if (c.current) return;
    c.current = !0, p.current && (clearTimeout(p.current), p.current = null);
    const C = ((P = i.current) == null ? void 0 : P.innerText) ?? "";
    l(C), d.current = C, C !== t.data.text && e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: C }
    }), n();
  }, [e, t, n]), y = at(
    (C) => {
      var P;
      C.key === "Escape" && (C.preventDefault(), m(), (P = i.current) == null || P.blur()), C.stopPropagation();
    },
    [m]
  ), g = at(() => {
    m();
  }, [m]), x = at(() => {
    if (i.current) {
      const C = i.current.innerText;
      l(C), d.current = C, p.current && clearTimeout(p.current), p.current = setTimeout(() => {
        const P = f.current;
        C !== P.data.text && u.current.updateNode(P.id, {
          data: { ...P.data, text: C }
        });
      }, 0);
    }
  }, []), b = t.h === "auto" ? void 0 : t.h, v = t.data.opacity ?? 1, M = {
    fontFamily: oo(t.data.fontFamily),
    fontSize: t.data.fontSize,
    color: t.data.color,
    textAlign: t.data.align,
    opacity: v,
    lineHeight: 1,
    outline: "none",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    border: t.data.borderColor ? `${t.data.borderWidth ?? 1}px ${t.data.borderStyle ?? "solid"} ${t.data.borderColor}` : void 0,
    boxSizing: t.data.borderColor ? "border-box" : void 0,
    borderRadius: t.data.borderColor ? 4 : void 0,
    padding: t.data.borderColor ? 6 : void 0
  };
  return /* @__PURE__ */ h(
    "div",
    {
      "data-node-id": t.id,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: b,
        zIndex: t.z,
        transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0,
        transformOrigin: "center center",
        pointerEvents: o ? "auto" : "none"
      },
      children: o ? /* @__PURE__ */ h(
        "div",
        {
          ref: i,
          contentEditable: !0,
          suppressContentEditableWarning: !0,
          onKeyDown: y,
          onBlur: g,
          onInput: x,
          onPointerDown: (C) => C.stopPropagation(),
          style: { ...M, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ h("div", { ref: i, style: M, children: a || " " })
    }
  );
}
const ya = xe(jd);
function Vd(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    ya,
    {
      node: e,
      engine: t.engine,
      editing: t.editing,
      editClickPos: t.editClickPos,
      onStopEdit: () => {
        var o, r;
        return (r = (o = t.callbacks).onEditEnd) == null ? void 0 : r.call(o);
      },
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const qd = {
  type: "text",
  component: Vd,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function Kd(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, r = at(
    (s) => {
      var a, l;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (l = (a = t.callbacks).onEditEnd) == null || l.call(a);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), n = at(
    (s) => {
      (s.key === "Enter" || s.key === "Escape") && s.currentTarget.blur(), s.stopPropagation();
    },
    []
  );
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x,
        top: e.y,
        width: e.w,
        height: o,
        zIndex: e.z,
        background: e.data.backgroundColor || "rgba(0,0,0,0.02)",
        border: `${e.data.borderWidth || 1}px ${e.data.borderStyle || "dashed"} ${e.data.borderColor || "#ccc"}`,
        boxSizing: "border-box",
        borderRadius: 8,
        opacity: e.data.opacity ?? 1,
        pointerEvents: "none",
        overflow: "visible",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: t.editing ? /* @__PURE__ */ h(
        "input",
        {
          autoFocus: !0,
          defaultValue: e.data.label ?? "",
          placeholder: "Frame label...",
          onBlur: r,
          onKeyDown: n,
          onPointerDown: (s) => s.stopPropagation(),
          style: {
            position: "absolute",
            top: -24,
            left: 0,
            fontSize: 12,
            color: e.data.borderColor || "#999",
            fontWeight: 500,
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #3b82f6",
            borderRadius: 4,
            padding: "1px 4px",
            outline: "none",
            pointerEvents: "auto",
            minWidth: 80
          }
        }
      ) : e.data.label ? /* @__PURE__ */ h(
        "div",
        {
          onDoubleClick: (s) => {
            var i, a;
            s.stopPropagation(), t.engine.select(e.id), (a = (i = t.callbacks).onEditStart) == null || a.call(i, e.id);
          },
          style: {
            position: "absolute",
            top: -20,
            left: 4,
            fontSize: 12,
            color: e.data.borderColor || "#999",
            fontWeight: 500,
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "auto",
            cursor: "default"
          },
          children: e.data.label
        }
      ) : null
    }
  );
}
const Ud = {
  type: "frame",
  component: Kd,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, Zd = 100;
function Qd({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onEditStart: i,
  onEditEnd: a
}) {
  const l = ct(null), c = ct(null), d = ct(""), p = ct(null), u = ct(null), f = ct(t);
  f.current = t;
  const m = ct(o);
  m.current = o, bt(() => {
    var M;
    if (s && c.current) {
      const C = c.current;
      C.innerText = t.data.text || "", d.current = t.data.text || "", C.focus();
      const P = C.ownerDocument, F = (M = P.defaultView) == null ? void 0 : M.getSelection(), B = p.current;
      p.current = null;
      let E = !1;
      if (B && F && P.caretRangeFromPoint) {
        const X = P.caretRangeFromPoint(B.x, B.y);
        X && C.contains(X.startContainer) && (F.removeAllRanges(), F.addRange(X), E = !0);
      }
      if (!E && F) {
        const X = P.createRange();
        C.childNodes.length > 0 && (X.selectNodeContents(C), X.collapse(!1)), F.removeAllRanges(), F.addRange(X);
      }
    }
  }, [s]), bt(() => {
    if (s)
      return () => {
        const M = f.current, C = d.current;
        C !== M.data.text && m.current.updateNodeWithHistory(M.id, {
          data: { ...M.data, text: C }
        });
      };
  }, [s]);
  const y = at(() => {
    u.current && (clearTimeout(u.current), u.current = null), c.current && (d.current = c.current.innerText), a();
  }, [a]), g = at(
    (M) => {
      const C = M.currentTarget.ownerDocument;
      if (M.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: _, y: K } = o.screenToCanvas(M.clientX, M.clientY);
        for (const q of o.selection) {
          const G = o.getNode(q);
          if (!G) continue;
          const V = G.h === "auto" ? 100 : G.h;
          if (_ >= G.x && _ <= G.x + G.w && K >= G.y && K <= G.y + V)
            return;
        }
      }
      if (M.stopPropagation(), s) return;
      M.currentTarget.setPointerCapture(M.pointerId), M.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const P = M.clientX, F = M.clientY, B = Array.from(o.selection), E = [];
      for (const _ of B) {
        const K = o.getNode(_);
        K && E.push({ id: _, x: K.x, y: K.y });
      }
      if (E.length === 0) return;
      let X = !1, nt = null, Y = P, ot = F, J = !1;
      const lt = () => {
        nt = null;
        const _ = (Y - P) / o.viewport.zoom, K = (ot - F) / o.viewport.zoom, { finalDx: q, finalDy: G } = o.computeDragSnap(
          E,
          B,
          _,
          K,
          J
        ), V = E.map((tt) => ({
          id: tt.id,
          patch: { x: tt.x + q, y: tt.y + G }
        }));
        o.updateMany(V);
      }, H = (_) => {
        const K = (_.clientX - P) / o.viewport.zoom, q = (_.clientY - F) / o.viewport.zoom;
        if (!X)
          if (Math.abs(K) > 2 || Math.abs(q) > 2)
            X = !0, o.pushHistorySnapshot();
          else
            return;
        Y = _.clientX, ot = _.clientY, J = _.metaKey || _.ctrlKey, nt === null && (nt = requestAnimationFrame(lt));
      }, O = () => {
        nt !== null && (cancelAnimationFrame(nt), lt()), o.clearAlignGuides(), C.removeEventListener("pointermove", H), C.removeEventListener("pointerup", O);
      };
      C.addEventListener("pointermove", H), C.addEventListener("pointerup", O);
    },
    [o, t.id, s]
  ), x = at(
    (M) => {
      if (r) {
        if (M.stopPropagation(), t.groupId) {
          const C = [];
          let P = t.groupId;
          for (; P; )
            C.push(P), P = o.groupParent.get(P);
          if (!o.activeGroupId) {
            o.enterGroup(C[C.length - 1]), o.select(t.id);
            return;
          }
          const F = C.indexOf(o.activeGroupId);
          if (F > 0) {
            o.enterGroup(C[F - 1]), o.select(t.id);
            return;
          }
        }
        s || (p.current = { x: M.clientX, y: M.clientY }, o.select(t.id), i(t.id));
      }
    },
    [r, s, o, t.id, t.groupId, i]
  ), b = t.data.fontSize ?? 16, v = t.h === "auto" ? Zd : t.h;
  return /* @__PURE__ */ h(
    "div",
    {
      ref: l,
      "data-node-id": t.id,
      className: r ? void 0 : "sb-block-inert",
      onPointerDown: r ? g : void 0,
      onDoubleClick: x,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: v,
        zIndex: t.z,
        background: t.data.color,
        borderRadius: t.data.edgeStyle === "round" ? 12 : 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        opacity: t.data.opacity ?? 1,
        pointerEvents: r ? "auto" : "none",
        outline: "none",
        overflow: "hidden",
        transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ h(
        "div",
        {
          style: {
            padding: 12,
            height: "100%",
            overflow: "auto",
            touchAction: s ? "pan-y" : "none",
            cursor: s ? "text" : "move",
            userSelect: s ? "text" : "none"
          },
          children: s ? /* @__PURE__ */ h(
            "div",
            {
              ref: c,
              contentEditable: !0,
              suppressContentEditableWarning: !0,
              onBlur: y,
              onInput: () => {
                c.current && (d.current = c.current.innerText, u.current && clearTimeout(u.current), u.current = setTimeout(() => {
                  const M = f.current, C = d.current;
                  C !== M.data.text && m.current.updateNode(M.id, {
                    data: { ...M.data, text: C }
                  });
                }, 0));
              },
              onKeyDown: (M) => {
                M.key === "Escape" && (M.stopPropagation(), y()), M.stopPropagation();
              },
              onPointerDown: (M) => M.stopPropagation(),
              style: {
                fontSize: b,
                fontFamily: oo(eo),
                lineHeight: 1.5,
                color: "#1e1e2e",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                outline: "none",
                minHeight: "100%"
              }
            }
          ) : /* @__PURE__ */ h(
            "div",
            {
              style: {
                fontSize: b,
                fontFamily: oo(eo),
                lineHeight: 1.5,
                color: "#1e1e2e",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap"
              },
              children: t.data.text || ""
            }
          )
        }
      )
    }
  );
}
const ga = xe(Qd);
function Jd(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    ga,
    {
      node: e,
      isSelected: t.isSelected,
      engine: t.engine,
      interactive: t.interactive,
      zoom: t.zoom,
      editing: t.editing,
      onEditStart: (o) => {
        var r, n;
        return (n = (r = t.callbacks).onEditStart) == null ? void 0 : n.call(r, o);
      },
      onEditEnd: () => {
        var o, r;
        return (r = (o = t.callbacks).onEditEnd) == null ? void 0 : r.call(o);
      }
    }
  );
}
const $d = {
  type: "sticky",
  component: Jd,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, ma = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function _d(t) {
  const e = t.match(ma);
  return e ? e[1] : null;
}
function th(t) {
  return ma.test(t);
}
function eh(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function oh(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function rh({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onResizeHandleDown: i,
  onEditStart: a
}) {
  const l = t.h, { data: c } = t, d = (m) => {
    if (r && s) {
      m.stopPropagation();
      return;
    }
  }, p = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", u = Math.max(6, 8 / n), f = [
    { key: "nw", x: "0%", y: "0%", cursor: "nwse-resize" },
    { key: "ne", x: "100%", y: "0%", cursor: "nesw-resize" },
    { key: "se", x: "100%", y: "100%", cursor: "nwse-resize" },
    { key: "sw", x: "0%", y: "100%", cursor: "nesw-resize" },
    { key: "n", x: "50%", y: "0%", cursor: "ns-resize" },
    { key: "s", x: "50%", y: "100%", cursor: "ns-resize" },
    { key: "e", x: "100%", y: "50%", cursor: "ew-resize" },
    { key: "w", x: "0%", y: "50%", cursor: "ew-resize" }
  ];
  return /* @__PURE__ */ k(
    "div",
    {
      onPointerDown: d,
      onDoubleClick: !s && r ? (m) => {
        m.stopPropagation(), a == null || a();
      } : void 0,
      style: {
        position: "absolute",
        left: t.x + t.w / 2,
        top: t.y + l / 2,
        width: t.w,
        height: l,
        marginLeft: -t.w / 2,
        marginTop: -l / 2,
        zIndex: t.z,
        border: e ? "2px dashed #3b82f6" : "none",
        borderRadius: 6,
        overflow: "visible",
        pointerEvents: r ? "auto" : "none",
        cursor: s ? "default" : "move",
        transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0,
        transformOrigin: "center center",
        boxSizing: "border-box"
      },
      children: [
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 4,
              border: p,
              boxSizing: "border-box",
              opacity: c.opacity ?? 1
            },
            children: [
              /* @__PURE__ */ h(
                "iframe",
                {
                  src: eh(c.videoId),
                  title: "YouTube video",
                  allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                  allowFullScreen: !0,
                  style: {
                    width: "100%",
                    height: "100%",
                    border: "none",
                    display: "block",
                    pointerEvents: s ? "auto" : "none"
                  }
                }
              ),
              !s && /* @__PURE__ */ h(
                "div",
                {
                  style: {
                    position: "absolute",
                    inset: 0,
                    cursor: "move"
                  }
                }
              )
            ]
          }
        ),
        e && r && !s && f.map((m) => /* @__PURE__ */ h(
          "div",
          {
            "data-handle": m.key,
            onPointerDown: (y) => {
              y.stopPropagation(), i == null || i(t.id, m.key, y);
            },
            style: {
              position: "absolute",
              left: m.x,
              top: m.y,
              width: u,
              height: u,
              marginLeft: -u / 2,
              marginTop: -u / 2,
              background: "#fff",
              border: "1px solid #3b82f6",
              borderRadius: 2,
              cursor: m.cursor,
              zIndex: 1
            }
          },
          m.key
        ))
      ]
    }
  );
}
const nh = xe(rh);
function sh(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    nh,
    {
      node: e,
      isSelected: t.isSelected,
      engine: t.engine,
      interactive: t.interactive,
      zoom: t.zoom,
      editing: t.editing,
      onResizeHandleDown: t.callbacks.onResizeHandleDown,
      onEditStart: () => {
        var o, r;
        return (r = (o = t.callbacks).onEditStart) == null ? void 0 : r.call(o, e.id);
      },
      onEditEnd: () => {
        var o, r;
        return (r = (o = t.callbacks).onEditEnd) == null ? void 0 : r.call(o);
      }
    }
  );
}
const ih = {
  type: "youtube",
  component: sh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, ah = [
  Fc,
  Wd,
  Fd,
  Hd,
  Yd,
  qd,
  Ud,
  $d,
  ih
];
function go(t, e) {
  return `${t}:${e}`;
}
class lh {
  constructor(e, o) {
    yt(this, "spatial");
    yt(this, "registry");
    /** Current resolved port values. */
    yt(this, "values", /* @__PURE__ */ new Map());
    /** Node IDs that need recomputation. */
    yt(this, "dirty", /* @__PURE__ */ new Set());
    /** Whether a microtask flush is already scheduled. */
    yt(this, "scheduled", !1);
    /** Generation counter for canceling stale async results. */
    yt(this, "generation", 0);
    /** Change subscribers. */
    yt(this, "listeners", /* @__PURE__ */ new Set());
    /** Node IDs that are part of a cycle (updated after each topoSort). */
    yt(this, "_cycleNodeIds", /* @__PURE__ */ new Set());
    this.spatial = e, this.registry = o;
  }
  // ── Public API ─────────────────────────────────────────────
  /** Node IDs that are part of a dependency cycle (read-only). */
  get cycleNodeIds() {
    return this._cycleNodeIds;
  }
  /** Subscribe to port value changes. Returns unsubscribe function. */
  onChange(e) {
    return this.listeners.add(e), () => this.listeners.delete(e);
  }
  /** Get current value of a specific port. */
  getPortValue(e, o) {
    return this.values.get(go(e, o)) ?? null;
  }
  /** Get all input values for a node, resolved from connected edges. */
  getInputs(e) {
    var s;
    const o = this.registry.get(
      ((s = this.spatial.nodes.get(e)) == null ? void 0 : s.type) ?? ""
    );
    if (!(o != null && o.ports)) return {};
    const r = {}, n = o.ports.filter((i) => i.direction === "input");
    for (const i of n) {
      const a = this.spatial.getEdgesForNode(e);
      let l = !1;
      for (const c of a) {
        const d = c.data;
        if (d.toId === e && d.targetPort === i.id) {
          const p = this.values.get(
            go(d.fromId, d.sourcePort ?? "")
          );
          r[i.id] = p ?? i.defaultValue ?? null, l = !0;
          break;
        }
      }
      l || (r[i.id] = i.defaultValue ?? null);
    }
    return r;
  }
  /** Get all output values for a node. */
  getOutputs(e) {
    var n;
    const o = this.registry.get(
      ((n = this.spatial.nodes.get(e)) == null ? void 0 : n.type) ?? ""
    );
    if (!(o != null && o.ports)) return {};
    const r = {};
    for (const s of o.ports)
      s.direction === "output" && (r[s.id] = this.values.get(go(e, s.id)) ?? null);
    return r;
  }
  /** Get all port values (inputs + outputs) for a node. */
  getAllPortValues(e) {
    var n;
    const o = this.registry.get(
      ((n = this.spatial.nodes.get(e)) == null ? void 0 : n.type) ?? ""
    );
    if (!(o != null && o.ports)) return {};
    const r = {};
    for (const s of o.ports)
      if (s.direction === "input") {
        const i = this.spatial.getEdgesForNode(e);
        let a = !1;
        for (const l of i) {
          const c = l.data;
          if (c.toId === e && c.targetPort === s.id) {
            r[s.id] = this.values.get(go(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, a = !0;
            break;
          }
        }
        a || (r[s.id] = s.defaultValue ?? null);
      } else
        r[s.id] = this.values.get(go(e, s.id)) ?? null;
    return r;
  }
  /** Mark a node as dirty and schedule recomputation. */
  markDirty(e) {
    this.dirty.add(e), this.scheduleFlush();
  }
  /** Wire up SpatialEngine event listeners. Returns cleanup function. */
  connect() {
    const e = (n) => {
      const s = this.registry.get(n.type);
      s != null && s.ports && this.markDirty(n.id);
    }, o = (n) => {
      if (n.type === "edge") {
        const s = n.data;
        s.targetPort && this.markDirty(s.toId);
      } else {
        const s = this.registry.get(n.type);
        s != null && s.ports && s.compute && this.markDirty(n.id);
      }
    }, r = (n) => {
      if (n.type === "edge") {
        const s = n.data;
        s.targetPort && this.markDirty(s.toId);
      } else {
        const s = this.registry.get(n.type);
        if (s != null && s.ports) {
          for (const i of s.ports)
            this.values.delete(go(n.id, i.id));
          this.markDownstream(n.id);
        }
      }
    };
    return this.spatial.on("node:data", e), this.spatial.on("node:create", o), this.spatial.on("node:delete", r), this.initializeAll(), () => {
      this.spatial.off("node:data", e), this.spatial.off("node:create", o), this.spatial.off("node:delete", r);
    };
  }
  /** Dispose and clean up. */
  dispose() {
    this.values.clear(), this.dirty.clear(), this.listeners.clear(), this.scheduled = !1;
  }
  // ── Private implementation ─────────────────────────────────
  /** Initialize all nodes with ports. */
  initializeAll() {
    for (const e of this.spatial.nodes.values()) {
      const o = this.registry.get(e.type);
      o != null && o.ports && o.compute && this.dirty.add(e.id);
    }
    this.dirty.size > 0 && this.scheduleFlush();
  }
  /** Schedule a microtask flush if not already scheduled. */
  scheduleFlush() {
    this.scheduled || (this.scheduled = !0, queueMicrotask(() => {
      this.scheduled = !1, this.flush();
    }));
  }
  /** Mark all downstream nodes (nodes that depend on outputs of nodeId) as dirty. */
  markDownstream(e) {
    const o = this.spatial.getEdgesForNode(e);
    for (const r of o) {
      const n = r.data;
      n.fromId === e && n.targetPort && this.dirty.add(n.toId);
    }
  }
  /** Topological sort of dirty nodes + their downstream dependents. */
  topoSort() {
    const e = /* @__PURE__ */ new Set();
    for (const m of this.spatial.nodes.values()) {
      const y = this.registry.get(m.type);
      y != null && y.ports && y.compute && e.add(m.id);
    }
    if (e.size === 0) {
      const m = this._cycleNodeIds.size > 0;
      return m && (this._cycleNodeIds = /* @__PURE__ */ new Set()), { sorted: [], cyclesChanged: m };
    }
    const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const m of e)
      o.set(m, /* @__PURE__ */ new Set()), r.set(m, 0);
    const n = this.spatial.getAllEdges();
    for (const m of n) {
      const y = m.data;
      y.sourcePort && y.targetPort && e.has(y.fromId) && e.has(y.toId) && (o.get(y.fromId).add(y.toId), r.set(y.toId, (r.get(y.toId) ?? 0) + 1));
    }
    const s = new Set(this.dirty), i = /* @__PURE__ */ new Set(), a = (m) => {
      if (i.has(m)) return;
      i.add(m);
      const y = o.get(m);
      if (y)
        for (const g of y)
          s.add(g), a(g);
    };
    for (const m of [...this.dirty])
      a(m);
    const l = /* @__PURE__ */ new Map();
    for (const m of s)
      l.set(m, 0);
    for (const m of n) {
      const y = m.data;
      y.sourcePort && y.targetPort && s.has(y.fromId) && s.has(y.toId) && l.set(
        y.toId,
        (l.get(y.toId) ?? 0) + 1
      );
    }
    const c = [];
    for (const [m, y] of l)
      y === 0 && c.push(m);
    const d = [];
    for (; c.length > 0; ) {
      const m = c.shift();
      d.push(m);
      const y = o.get(m);
      if (y)
        for (const g of y) {
          if (!s.has(g)) continue;
          const x = (l.get(g) ?? 1) - 1;
          l.set(g, x), x === 0 && c.push(g);
        }
    }
    const p = new Set(d), u = /* @__PURE__ */ new Set();
    for (const m of s)
      p.has(m) || u.add(m);
    let f = !1;
    return (u.size !== this._cycleNodeIds.size || [...u].some((m) => !this._cycleNodeIds.has(m))) && (this._cycleNodeIds = u, f = !0), { sorted: d, cyclesChanged: f };
  }
  /** Full graph recompute of dirty nodes. */
  flush() {
    if (this.dirty.size === 0) return;
    const { sorted: e, cyclesChanged: o } = this.topoSort();
    this.dirty.clear();
    let r = !1;
    for (const n of e)
      this.executeNode(n) && (r = !0);
    (r || o) && this.notifyListeners();
  }
  /** Execute a single node's compute function. Returns true if outputs changed. */
  executeNode(e) {
    const o = this.spatial.nodes.get(e);
    if (!o) return !1;
    const r = this.registry.get(o.type);
    if (!(r != null && r.compute) || !r.ports) return !1;
    const n = this.getInputs(e), s = r.compute(n, o.data);
    if (s instanceof Promise) {
      const i = ++this.generation;
      return s.then((a) => {
        if (i !== this.generation) return;
        this.applyOutputs(e, r.ports, a) && (this.markDownstream(e), this.notifyListeners(), this.dirty.size > 0 && this.scheduleFlush());
      }), !1;
    }
    return this.applyOutputs(e, r.ports, s);
  }
  /** Apply computed outputs to the values map. Returns true if any value changed. */
  applyOutputs(e, o, r) {
    let n = !1;
    for (const s of o) {
      if (s.direction !== "output") continue;
      const i = go(e, s.id), a = r[s.id] ?? null, l = this.values.get(i) ?? null;
      ch(l, a) || (this.values.set(i, a), n = !0);
    }
    return n && this.markDownstream(e), n;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function ch(t, e) {
  if (t === e) return !0;
  if (t == null || e == null || typeof t != typeof e) return !1;
  if (typeof t == "object" && typeof e == "object") {
    const o = Object.keys(t), r = Object.keys(e);
    if (o.length !== r.length) return !1;
    for (const n of o)
      if (t[n] !== e[n])
        return !1;
    return !0;
  }
  return !1;
}
const Zo = [
  // Light
  { key: "plain-white", label: "White", group: "light", canvasBg: "#ffffff", swatchColor: "#ffffff" },
  { key: "dot-grid", label: "Cream", group: "light", canvasBg: "#f8f7f5", swatchColor: "#f8f7f5" },
  { key: "engineering", label: "Warm", group: "light", canvasBg: "#fdf6e3", swatchColor: "#fdf6e3" },
  // Dark
  { key: "blueprint", label: "Blueprint", group: "dark", canvasBg: "#1e3a5f", swatchColor: "#1e3a5f" },
  { key: "dark-grid", label: "Night", group: "dark", canvasBg: "#1a1a2e", swatchColor: "#1a1a2e" },
  // Textured
  { key: "japanese-stationery", label: "Japanese Stationery", group: "textured", canvasBg: "#f5f0e8", swatchColor: "#f5f0e8" },
  { key: "kraft", label: "Kraft Paper", group: "textured", canvasBg: "#d4b896", swatchColor: "#d4b896" }
];
function xr(t) {
  return Zo.find((e) => e.key === t) ?? Zo[1];
}
function dh() {
  return {
    staticDefs: /* @__PURE__ */ k("filter", { id: "paper-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ h("feTurbulence", { type: "fractalNoise", baseFrequency: "0.08", numOctaves: 4, seed: 12, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ h("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ h("feDiffuseLighting", { in: "bump", lightingColor: "#f7f4ee", surfaceScale: "1.2", diffuseConstant: "1", result: "lit", children: /* @__PURE__ */ h("feDistantLight", { azimuth: "225", elevation: "50" }) }),
      /* @__PURE__ */ h("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ h("feFlood", { floodColor: "#f5f0e8", result: "base" }),
      /* @__PURE__ */ h("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "paper" }),
      /* @__PURE__ */ h("feTurbulence", { type: "fractalNoise", baseFrequency: "0.6", numOctaves: 3, seed: 7, stitchTiles: "stitch", result: "grain" }),
      /* @__PURE__ */ h("feColorMatrix", { in: "grain", type: "saturate", values: "0", result: "grain-gray" }),
      /* @__PURE__ */ k("feComponentTransfer", { in: "grain-gray", result: "grain-subtle", children: [
        /* @__PURE__ */ h("feFuncR", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ h("feFuncG", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ h("feFuncB", { type: "linear", slope: "0.06", intercept: "0.47" })
      ] }),
      /* @__PURE__ */ h("feBlend", { in: "paper", in2: "grain-subtle", mode: "overlay", result: "paper-final" })
    ] }),
    staticLayers: [
      /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: "#f5f0e8", filter: "url(#paper-texture)" }, "texture")
    ]
  };
}
function hh() {
  return {
    staticDefs: /* @__PURE__ */ k("filter", { id: "kraft-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ h("feTurbulence", { type: "fractalNoise", baseFrequency: "0.04", numOctaves: 5, seed: 42, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ h("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ h("feDiffuseLighting", { in: "bump", lightingColor: "#e0c9a6", surfaceScale: "1.4", diffuseConstant: "0.95", result: "lit", children: /* @__PURE__ */ h("feDistantLight", { azimuth: "200", elevation: "50" }) }),
      /* @__PURE__ */ h("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ h("feFlood", { floodColor: "#d4b896", result: "base" }),
      /* @__PURE__ */ h("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "kraft" }),
      /* @__PURE__ */ h("feTurbulence", { type: "fractalNoise", baseFrequency: "0.35", numOctaves: 2, seed: 99, stitchTiles: "stitch", result: "fiber" }),
      /* @__PURE__ */ h("feColorMatrix", { in: "fiber", type: "saturate", values: "0", result: "fiber-gray" }),
      /* @__PURE__ */ k("feComponentTransfer", { in: "fiber-gray", result: "fiber-subtle", children: [
        /* @__PURE__ */ h("feFuncR", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ h("feFuncG", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ h("feFuncB", { type: "linear", slope: "0.06", intercept: "0.47" })
      ] }),
      /* @__PURE__ */ h("feBlend", { in: "kraft", in2: "fiber-subtle", mode: "overlay", result: "kraft-final" })
    ] }),
    staticLayers: [
      /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: "#d4b896", filter: "url(#kraft-texture)" }, "texture")
    ]
  };
}
const zn = {
  "japanese-stationery": dh,
  kraft: hh
};
function uh(t) {
  var e;
  return ((e = zn[t]) == null ? void 0 : e.call(zn)) ?? {};
}
const ba = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, ph = {
  ...ba,
  willChange: "transform"
}, fh = xe(function({
  background: e
}) {
  const o = xr(e), { staticDefs: r, staticLayers: n } = uh(e);
  return /* @__PURE__ */ k("svg", { style: ph, children: [
    r && /* @__PURE__ */ h("defs", { children: r }),
    /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    n
  ] });
});
function yh({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: r = !0
}) {
  const n = e * t.zoom, s = t.x % n, i = t.y % n, l = xr(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(fh, { background: o }),
    r && /* @__PURE__ */ k("svg", { style: ba, children: [
      /* @__PURE__ */ h("defs", { children: /* @__PURE__ */ h(
        "pattern",
        {
          id: "grid-dots",
          x: s,
          y: i,
          width: n,
          height: n,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ h("circle", { cx: n / 2, cy: n / 2, r: 1.5, fill: l })
        }
      ) }),
      /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: "url(#grid-dots)" })
    ] })
  ] });
}
const xa = "sb-excalib-index", ms = "sb-excalib-";
function _r() {
  try {
    const t = localStorage.getItem(xa);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function wa(t) {
  localStorage.setItem(xa, JSON.stringify(t));
}
function gh(t) {
  try {
    const e = localStorage.getItem(ms + t);
    return e ? bs(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function bs(t) {
  if (t.libraryItems)
    return t;
  const o = (t.library ?? []).map((r, n) => ({
    id: zt(10),
    name: `Item ${n + 1}`,
    status: "published",
    created: Date.now(),
    elements: r
  }));
  return {
    type: "excalidrawlib",
    version: 2,
    source: t.source,
    libraryItems: o
  };
}
function ka() {
  return _r();
}
function xs(t) {
  const e = gh(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function ws(t, e) {
  const o = bs(t), r = zt(10), n = o.libraryItems.map((a) => a.name || "Untitled"), s = {
    id: r,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: n
  };
  localStorage.setItem(ms + r, JSON.stringify(o));
  const i = _r();
  return i.push(s), wa(i), s;
}
function mh(t) {
  localStorage.removeItem(ms + t);
  const e = _r().filter((o) => o.id !== t);
  wa(e);
}
function bh(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], r = _r();
  for (const n of r) {
    if (!n.itemNames.some((a) => a.toLowerCase().includes(e)) && !n.name.toLowerCase().includes(e)) continue;
    const i = xs(n.id);
    for (const a of i)
      ((a.name || "").toLowerCase().includes(e) || n.name.toLowerCase().includes(e)) && o.push({ library: n, item: a });
  }
  return o;
}
async function xh(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const r = await o.json();
  if (r.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const n = bs(r);
  return ws(n, { name: e, source: t });
}
const Kn = {
  toolbarBg: "#1e1e2e",
  panelBg: "#1e1e2e",
  panelShadow: "0 4px 24px rgba(0,0,0,0.4)",
  panelBorderRadius: 12,
  controlBg: "#2a2a3e",
  controlBgActive: "#3b82f6",
  controlBorderRadius: 6,
  text: "white",
  textMuted: "#999",
  textSecondary: "#888",
  textFaint: "#666",
  textDisabled: "#555",
  border: "#333",
  separator: "#444",
  swatchBorderActive: "white",
  error: "#e74c3c",
  accentColor: "#3b82f6"
}, va = es(Kn);
function Ut() {
  return gr(va);
}
function wr(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function Mo(t) {
  if (t)
    return t * (180 / Math.PI);
}
function Sa(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function Ma(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function Ca(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function Ia(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function za(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function wh(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function Tn(t, e) {
  return {
    id: zt(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: Mo(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: Sa(t.backgroundColor),
      fillStyle: Ma(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Ca(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: wr(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? wh(t) : void 0
    }
  };
}
function xi(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const r = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Ca(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: wr(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [a, l] = o, c = Math.min(a[0], l[0]), d = Math.min(a[1], l[1]), p = Math.max(a[0], l[0]), u = Math.max(a[1], l[1]), f = Math.max(p - c, 1), m = Math.max(u - d, 1);
    return [
      {
        id: zt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + d,
        w: f,
        h: m,
        z: 0,
        rotation: Mo(t.angle),
        locked: t.locked || void 0,
        data: {
          ...r,
          shape: e ? "arrow" : "line",
          startPoint: [a[0] - c, a[1] - d],
          endPoint: [l[0] - c, l[1] - d]
        }
      }
    ];
  }
  if (t.backgroundColor && t.backgroundColor !== "transparent") {
    const a = kh(t);
    if (a) return [a];
  }
  const s = zt(10), i = [];
  for (let a = 0; a < o.length - 1; a++) {
    const l = o[a], c = o[a + 1], d = Math.min(l[0], c[0]), p = Math.min(l[1], c[1]), u = Math.max(l[0], c[0]), f = Math.max(l[1], c[1]), m = Math.max(u - d, 1), y = Math.max(f - p, 1), g = a === o.length - 2;
    i.push({
      id: zt(10),
      type: "shape",
      x: t.x + d,
      y: t.y + p,
      w: m,
      h: y,
      z: 0,
      rotation: Mo(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...r,
        shape: e && g ? "arrow" : "line",
        startPoint: [l[0] - d, l[1] - p],
        endPoint: [c[0] - d, c[1] - p]
      }
    });
  }
  return i;
}
function kh(t) {
  const e = t.points ?? [];
  if (e.length < 3) return null;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const [a, l] of e)
    a < o && (o = a), l < r && (r = l), a > n && (n = a), l > s && (s = l);
  if (!isFinite(o)) return null;
  const i = e.map(([a, l]) => [
    a - o,
    l - r,
    0.5
  ]);
  return {
    id: zt(10),
    type: "draw",
    x: t.x + o,
    y: t.y + r,
    w: Math.max(n - o, 1),
    h: Math.max(s - r, 1),
    z: 0,
    rotation: Mo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: wr(t.opacity ?? 100),
      fill: Sa(t.backgroundColor),
      fillStyle: Ma(t.fillStyle)
    }
  };
}
function vh(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, r = t.simulatePressure !== !1, n = e.map((d, p) => {
    const u = !r && o && p < o.length ? o[p] : 0.5;
    return [d[0], d[1], u];
  });
  let s = 1 / 0, i = 1 / 0, a = -1 / 0, l = -1 / 0;
  for (const [d, p] of n)
    d < s && (s = d), p < i && (i = p), d > a && (a = d), p > l && (l = p);
  isFinite(s) || (s = 0, i = 0, a = 0, l = 0);
  const c = n.map(
    ([d, p, u]) => [d - s, p - i, u]
  );
  return {
    id: zt(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(a - s, 1),
    h: Math.max(l - i, 1),
    z: 0,
    rotation: Mo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: wr(t.opacity ?? 100)
    }
  };
}
function Sh(t) {
  return {
    id: zt(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: Mo(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: Ia(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: za(t.textAlign),
      opacity: wr(t.opacity ?? 100)
    }
  };
}
function Mh(t) {
  return {
    id: zt(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: Mo(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function Ta(t) {
  return Ch(t.elements);
}
function Ch(t) {
  const e = [], o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && n.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [Tn(s, "rect")];
        break;
      case "ellipse":
        i = [Tn(s, "ellipse")];
        break;
      case "diamond":
        i = [Tn(s, "diamond")];
        break;
      case "arrow":
        i = xi(s, !0);
        break;
      case "line":
        i = xi(s, !1);
        break;
      case "freedraw": {
        const a = vh(s);
        a && (i = [a]);
        break;
      }
      case "text":
        i = [Sh(s)];
        break;
      case "frame":
      case "magicframe":
        i = [Mh(s)];
        break;
      case "image":
        continue;
      default:
        continue;
    }
    i.length > 0 && o.set(s.id, i[0].id), e.push(...i);
  }
  for (const [s, i] of n) {
    const a = o.get(s);
    if (!a) continue;
    const l = e.find((d) => d.id === a);
    if (!l || l.type !== "shape") continue;
    const c = l.data;
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = Ia(i.fontFamily), c.labelAlign = za(i.textAlign);
  }
  return Ih(t, e, o, r), zh(e), { nodes: e, groupParent: r };
}
function Ih(t, e, o, r) {
  var s;
  const n = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (i.isDeleted || !((s = i.groupIds) != null && s.length)) continue;
    for (let l = 0; l < i.groupIds.length - 1; l++) {
      const c = i.groupIds[l], d = i.groupIds[l + 1];
      n.has(c) || n.set(c, d);
    }
    const a = o.get(i.id);
    if (a) {
      const l = e.find((c) => c.id === a);
      l && (l.groupId = i.groupIds[0]);
    }
  }
  for (const [i, a] of n)
    r.set(i, a);
}
function zh(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const r of t)
    r.x < e && (e = r.x), r.y < o && (o = r.y);
  if (isFinite(e))
    for (const r of t)
      r.x -= e, r.y -= o;
}
function ks(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const p of t) {
    const u = p.h === "auto" ? 40 : p.h;
    o = Math.min(o, p.x), r = Math.min(r, p.y), n = Math.max(n, p.x + p.w), s = Math.max(s, p.y + u);
  }
  const i = n - o || 1, a = s - r || 1, l = 4, c = `${o - l} ${r - l} ${i + l * 2} ${a + l * 2}`, d = [];
  for (const p of t)
    switch (p.type) {
      case "shape":
        d.push(Th(p));
        break;
      case "draw":
        d.push(Ph(p));
        break;
      case "text":
        d.push(Ah(p));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${d.join("")}</svg>`;
}
function Pa(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Th(t) {
  var u, f, m, y;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, r = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: io(e.strokeStyle),
    seed: t.id
  }, n = ((u = e.startPoint) == null ? void 0 : u[0]) ?? 0, s = ((f = e.startPoint) == null ? void 0 : f[1]) ?? o / 2, i = ((m = e.endPoint) == null ? void 0 : m[0]) ?? t.w, a = ((y = e.endPoint) == null ? void 0 : y[1]) ?? o / 2;
  let l;
  switch (e.shape) {
    case "rect":
      l = qr(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "ellipse":
      l = ps(t.x + t.w / 2, t.y + o / 2, t.w, o, r);
      break;
    case "diamond":
      l = fs(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "line":
      l = Uo(t.x + n, t.y + s, t.x + i, t.y + a, r);
      break;
    case "arrow":
      l = ys(t.x + n, t.y + s, t.x + i, t.y + a, r);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, d = c < 1 ? `<g opacity="${c}">` : "<g>", p = l.map(
    (g) => `<path d="${Pa(g.d)}" fill="${g.fill || "none"}" stroke="${g.stroke}" stroke-width="${g.strokeWidth}"${g.strokeDasharray ? ` stroke-dasharray="${g.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${d}${p.join("")}</g>`;
}
function Ph(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), r = e.opacity ?? 1, n = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${n}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${r < 1 ? ` opacity="${r}"` : ""}/>`;
}
function Ah(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), r = e.opacity ?? 1, n = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${r < 1 ? ` opacity="${r}"` : ""}>${Pa(n)}</text>`;
}
const Aa = "sb-personal-library";
function vs() {
  try {
    const t = localStorage.getItem(Aa);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Ea(t) {
  localStorage.setItem(Aa, JSON.stringify(t));
}
function Ra() {
  return vs();
}
function Eh(t, e, o) {
  const r = structuredClone(e);
  if (r.length > 0) {
    let l = 1 / 0, c = 1 / 0;
    for (const d of r)
      d.x < l && (l = d.x), d.y < c && (c = d.y);
    if (isFinite(l))
      for (const d of r)
        d.x -= l, d.y -= c;
  }
  const n = new Set(
    r.map((l) => l.groupId).filter(Boolean)
  ), s = [];
  for (const [l, c] of o)
    n.has(l) && s.push([l, c]);
  const i = {
    id: zt(10),
    name: t.trim() || "Untitled",
    nodes: r,
    groupParent: s,
    createdAt: Date.now()
  }, a = vs();
  return a.unshift(i), Ea(a), i;
}
function Rh(t) {
  const e = vs().filter((o) => o.id !== t);
  Ea(e);
}
const La = {
  inspectorTitle: "Inspector",
  autoHide: "Auto-hide",
  performanceTitle: "Performance",
  perfVirtualization: "Virtualization",
  perfOn: "on",
  perfOff: "off",
  perfFps: "FPS",
  perfFrameP50P95: "Frame (p50/p95)",
  perfCullingP50P95: "Culling (p50/p95)",
  perfHitTestP50P95: "Hit-test (p50/p95)",
  perfEdgeHitP50P95: "Edge-hit (p50/p95)",
  perfHitTestCalls: "Hit-test calls/s",
  perfEdgeHitCalls: "Edge-hit calls/s",
  perfVisibleNodes: "Visible nodes",
  perfVisibleEdges: "Visible edges",
  perfSeedVisibleNodes: "Seed visible nodes",
  perfNodesAdjacency: "Nodes +adjacency",
  perfNodesEdgeEndpoints: "Nodes +edge-endpoints",
  perfEdgesAdjacency: "Edges +adjacency",
  perfEdgesCrossing: "Edges +crossing",
  zoomOut: "Zoom out",
  zoomIn: "Zoom in",
  resetZoom: "Reset zoom to 100%",
  fitToContent: "Fit to content (Ctrl+0)",
  saveOriginView: "Save current view as origin",
  clearOriginView: "Clear saved view",
  goToOriginView: "Go to saved view",
  presentSlides: "Present (frames as slides)",
  toggleSlidesPanel: "Toggle slides panel",
  togglePerformanceOverlay: "Toggle performance overlay",
  canvasSearchPlaceholder: "Search canvas...",
  canvasSearchOpen: "Search (Ctrl+F)",
  canvasSearchPrev: "Previous match",
  canvasSearchNext: "Next match",
  canvasSearchClose: "Close search",
  undo: "Undo (Ctrl+Z)",
  redo: "Redo (Ctrl+Shift+Z)",
  slidesTitle: "Slides",
  closeSlidesPanel: "Close slides panel",
  noFramesYet: "No frames yet. Use the Frame tool (F) to create slides.",
  inspectorNoSelection: "No selection",
  inspectorToolSuffix: "tool",
  inspectorShared: "Shared",
  inspectorCanvas: "Canvas",
  inspectorStructure: "Structure",
  inspectorTypography: "Typography",
  inspectorAppearance: "Appearance",
  inspectorSketch: "Sketch",
  inspectorActions: "Actions",
  inspectorStack: "Stack",
  inspectorOn: "On",
  inspectorOff: "Off",
  inspectorMixed: "Mixed",
  inspectorGrid: "Grid",
  inspectorGridSize: "Grid size",
  inspectorGuides: "Guides",
  inspectorPaper: "Paper",
  inspectorRotation: "Rotation",
  inspectorOpacity: "Opacity",
  inspectorStroke: "Stroke",
  inspectorBorder: "Border",
  inspectorStyle: "Style",
  inspectorWidth: "Width",
  inspectorFill: "Fill",
  inspectorFillPattern: "Fill pattern",
  inspectorStrokeStyle: "Stroke style",
  inspectorStrokeWidth: "Stroke width",
  inspectorShape: "Shape",
  inspectorEdges: "Edges",
  inspectorLabel: "Label",
  inspectorFont: "Font",
  inspectorSize: "Size",
  inspectorAlign: "Align",
  inspectorRoughness: "Roughness",
  inspectorCrop: "Crop",
  inspectorReset: "Reset",
  inspectorBackground: "Background",
  inspectorRemoving: "Removing...",
  inspectorFailed: "Failed",
  inspectorRemoveBg: "Remove BG",
  inspectorNone: "None",
  inspectorSwitchPalette: "Switch palette",
  paletteStandard: "Standard",
  edgeLineSection: "Line",
  edgeColor: "Color",
  edgeArrowsSection: "Arrows",
  edgeHead: "Head",
  edgeHeadSize: "Head size",
  edgeTail: "Tail",
  edgeTailSize: "Tail size",
  edgePathMotionSection: "Path & Motion",
  edgePath: "Path",
  edgeBezier: "Bezier",
  edgeStraight: "Straight",
  edgeSmooth: "Smooth",
  edgeStep: "Step",
  edgeAnimate: "Animate",
  edgeDirection: "Direction",
  edgeText: "Text",
  edgeLabelPlaceholder: "Edge label...",
  frameLabelPlaceholder: "Frame label...",
  frameDevice: "Device",
  frameFreeform: "Freeform",
  frameSlideNumber: "Slide #",
  frameAuto: "Auto",
  frameTransition: "Transition",
  frameDuration: "Duration",
  frameMilliseconds: "ms",
  transitionPan: "Pan",
  transitionFadeToBlack: "Fade to Black",
  transitionDissolve: "Dissolve",
  transitionZoom: "Zoom",
  transitionFold: "Fold",
  transitionCube: "Cube",
  transitionNoneInstant: "None (instant)",
  deviceGroupPhones: "Phones",
  deviceGroupPhonesLandscape: "Phones (Landscape)",
  deviceGroupTablets: "Tablets",
  deviceGroupTabletsLandscape: "Tablets (Landscape)",
  deviceGroupDevices: "Devices",
  deviceGroupStandard: "Standard",
  paperType: "Paper type",
  paperGroupLight: "Light",
  paperGroupDark: "Dark",
  paperGroupTextured: "Textured",
  paperWhite: "White",
  paperCream: "Cream",
  paperWarm: "Warm",
  paperBlueprint: "Blueprint",
  paperNight: "Night",
  paperJapaneseStationery: "Japanese Stationery",
  paperKraftPaper: "Kraft Paper",
  templatesTitle: "Templates",
  librariesTitle: "Libraries",
  librariesSearchPlaceholder: "Search library...",
  librariesNoMatchingItems: "No matching items",
  librariesNoLibrariesInstalled: "No libraries installed.",
  librariesImportHint: "Import an .excalidrawlib file",
  librariesBrowseHint: "or browse the community directory.",
  librariesImportFile: "Import file",
  librariesBrowseLibraries: "Browse libraries",
  librariesUninstall: "Uninstall library",
  librariesPersonal: "Personal",
  librariesUntitled: "Untitled",
  librariesRemoveFromPersonal: "Remove from Personal Library",
  libraryDirectoryTitle: "Excalidraw Libraries",
  libraryDirectorySearchPlaceholder: "Search libraries...",
  libraryDirectoryLoading: "Loading libraries...",
  libraryDirectoryFailedPrefix: "Failed to load directory",
  libraryDirectoryNoMatches: "No libraries match your search.",
  libraryDirectoryLibrariesCountSuffix: "libraries",
  libraryDirectoryPoweredBy: "Powered by Excalidraw Libraries",
  libraryDirectoryBy: "by",
  libraryDirectoryInstalled: "Installed",
  libraryDirectoryInstalling: "Installing...",
  libraryDirectoryInstall: "Install",
  gifSearchTitle: "GIF Search",
  gifPanelTitle: "GIFs",
  gifSearchPlaceholder: "Search KLIPY",
  gifNoResults: "No results",
  gifLoading: "Loading...",
  gifPoweredBy: "Powered by KLIPY",
  mermaidSketchTitle: "Mermaid Sketch",
  mermaidSupportedHint: "Supported: flowchart/graph (TB/BT/LR/RL) and sequenceDiagram. Flowchart nodes: A[Text], A{Decision}, A((Start)). Edges: A-->B, A -- label --> B.",
  mermaidNoNodesParsed: "No nodes were parsed.",
  mermaidInsertedSummary: "Inserted {nodes} nodes and {edges} edges.",
  mermaidParseFailed: "Failed to parse Mermaid graph.",
  mermaidResetExample: "Reset Example",
  mermaidInsertDiagram: "Insert Diagram",
  toolSelect: "Select",
  toolHand: "Hand",
  toolDraw: "Draw",
  toolShape: "Shape",
  toolText: "Text",
  toolNote: "Note",
  toolSticky: "Sticky",
  toolFrame: "Frame",
  toolEraser: "Eraser",
  toolLaser: "Laser",
  toolLassoSelect: "Lasso Select",
  toolTextGlyph: "T",
  roughnessArchitect: "Architect",
  roughnessArtist: "Artist",
  roughnessCartoonist: "Cartoonist",
  actionCut: "Cut",
  actionCopy: "Copy",
  actionPaste: "Paste",
  actionDuplicate: "Duplicate",
  actionAddToPersonalLibrary: "Add to Personal Library",
  actionGroupSelection: "Group selection",
  actionUngroupSelection: "Ungroup selection",
  actionFlipHorizontal: "Flip horizontal",
  actionFlipVertical: "Flip vertical",
  actionBringForward: "Bring forward",
  actionSendBackward: "Send backward",
  actionBringToFront: "Bring to front",
  actionSendToBack: "Send to back",
  actionLock: "Lock",
  actionUnlock: "Unlock",
  actionDelete: "Delete",
  actionToggleGrid: "Toggle Grid",
  actionSmartGuides: "Smart Guides",
  actionExportAsPng: "Export as PNG",
  actionExportAsSvg: "Export as SVG",
  typeShape: "Shape",
  typeDrawing: "Drawing",
  typeText: "Text",
  typeEdge: "Edge",
  typeImage: "Image",
  typeContent: "Content",
  typeFrame: "Frame",
  typeStickyNote: "Sticky Note",
  typeYouTube: "YouTube"
}, Da = es({
  dir: "ltr",
  isRTL: !1,
  labels: La
});
function Lh(t) {
  var e;
  return t === "rtl" || t === "ltr" ? t : typeof document < "u" && ((e = document.dir) == null ? void 0 : e.toLowerCase()) === "rtl" ? "rtl" : "ltr";
}
function Dh(t, e) {
  return Kt(() => {
    const o = Lh(t);
    return {
      dir: o,
      isRTL: o === "rtl",
      labels: { ...La, ...e ?? {} }
    };
  }, [t, e]);
}
function jt() {
  return gr(Da);
}
function Wa(t, e, o, r) {
  const { nodes: n, groupParent: s } = Ta(e);
  if (n.length === 0) return;
  const i = structuredClone(n), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (const b of i) {
    const v = zt(10);
    a.set(b.id, v), b.id = v;
  }
  for (const b of i)
    b.groupId && (l.has(b.groupId) || l.set(b.groupId, zt(10)), b.groupId = l.get(b.groupId));
  let c = 1 / 0, d = 1 / 0, p = -1 / 0, u = -1 / 0;
  for (const b of i) {
    const v = b.h === "auto" ? 100 : b.h;
    c = Math.min(c, b.x), d = Math.min(d, b.y), p = Math.max(p, b.x + b.w), u = Math.max(u, b.y + v);
  }
  const f = o ?? window.innerWidth / 2, m = r ?? window.innerHeight / 2, y = t.screenToCanvas(f, m), g = y.x - (c + p) / 2, x = y.y - (d + u) / 2;
  for (const b of i)
    b.x += g, b.y += x, b.z = t.nextZ();
  t.addNodes(i);
  for (const [b, v] of s) {
    const M = l.get(b) ?? b, C = l.get(v) ?? v;
    t.groupParent.set(M, C);
  }
  t.selectMultiple(i.map((b) => b.id));
}
const Un = "application/x-spatialboard-library-item", Zn = "application/x-spatialboard-personal-item";
function Ba(t, e, o, r) {
  if (e.nodes.length === 0) return;
  const n = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const g of n) {
    const x = zt(10);
    s.set(g.id, x), g.id = x;
  }
  for (const g of n)
    g.groupId && (i.has(g.groupId) || i.set(g.groupId, zt(10)), g.groupId = i.get(g.groupId));
  for (const g of n)
    if (g.type === "edge") {
      const x = g.data;
      x.fromId && s.has(x.fromId) && (x.fromId = s.get(x.fromId)), x.toId && s.has(x.toId) && (x.toId = s.get(x.toId));
    }
  let a = 1 / 0, l = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (const g of n) {
    const x = g.h === "auto" ? 100 : g.h;
    a = Math.min(a, g.x), l = Math.min(l, g.y), c = Math.max(c, g.x + g.w), d = Math.max(d, g.y + x);
  }
  const p = o ?? window.innerWidth / 2, u = r ?? window.innerHeight / 2, f = t.screenToCanvas(p, u), m = f.x - (a + c) / 2, y = f.y - (l + d) / 2;
  for (const g of n)
    g.x += m, g.y += y, g.z = t.nextZ();
  t.addNodes(n);
  for (const [g, x] of e.groupParent) {
    const b = i.get(g) ?? g, v = i.get(x) ?? x;
    t.groupParent.set(b, v);
  }
  t.selectMultiple(n.map((g) => g.id));
}
const Qo = /* @__PURE__ */ new Map();
function Wh({ item: t }) {
  const e = Kt(() => {
    const o = Qo.get(t.id);
    if (o) return o;
    const { nodes: r } = Ta(t), n = ks(r, 56);
    return Qo.set(t.id, n), n;
  }, [t.id]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Fa({
  item: t,
  libId: e,
  onClick: o,
  theme: r
}) {
  const { labels: n } = jt(), s = at(
    (i) => {
      i.dataTransfer.setData(
        Un,
        JSON.stringify({ libraryId: e, itemId: t.id })
      ), i.dataTransfer.effectAllowed = "copy";
    },
    [e, t.id]
  );
  return /* @__PURE__ */ h(
    "button",
    {
      title: t.name || n.librariesUntitled,
      onClick: o,
      draggable: !0,
      onDragStart: s,
      style: {
        border: `1px solid ${r.border}`,
        borderRadius: 4,
        background: r.controlBg,
        cursor: "grab",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: "1"
      },
      children: /* @__PURE__ */ h(Wh, { item: t })
    }
  );
}
function Bh({ nodes: t }) {
  const e = Kt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), r = Qo.get(o);
    if (r) return r;
    const n = ks(t, 56);
    return Qo.set(o, n), n;
  }, [t]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Na({
  item: t,
  onClick: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = jt(), [s, i] = $(!1), a = at(
    (l) => {
      l.dataTransfer.setData(
        Zn,
        JSON.stringify({ itemId: t.id })
      ), l.dataTransfer.effectAllowed = "copy";
    },
    [t.id]
  );
  return /* @__PURE__ */ k(
    "div",
    {
      style: { position: "relative", aspectRatio: "1" },
      onMouseEnter: () => i(!0),
      onMouseLeave: () => i(!1),
      children: [
        /* @__PURE__ */ h(
          "button",
          {
            title: t.name,
            onClick: e,
            draggable: !0,
            onDragStart: a,
            style: {
              border: `1px solid ${r.border}`,
              borderRadius: 4,
              background: r.controlBg,
              cursor: "grab",
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%"
            },
            children: /* @__PURE__ */ h(Bh, { nodes: t.nodes })
          }
        ),
        s && /* @__PURE__ */ h(
          "button",
          {
            title: n.librariesRemoveFromPersonal,
            onClick: (l) => {
              l.stopPropagation(), o();
            },
            style: {
              position: "absolute",
              top: -4,
              right: -4,
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "none",
              background: "#ef4444",
              color: "#fff",
              fontSize: 10,
              lineHeight: "16px",
              textAlign: "center",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: "×"
          }
        )
      ]
    }
  );
}
function Fh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  onBrowseDirectory: n
}) {
  const s = Ut(), { labels: i } = jt(), a = ct(null), l = ct(null), [c, d] = $([]), [p, u] = $([]), [f, m] = $(""), [y, g] = $(/* @__PURE__ */ new Set()), x = at(() => {
    d(ka()), u(Ra());
  }, []);
  bt(() => {
    e && x();
  }, [e, x]), bt(() => {
    if (!e) return;
    const E = (X) => {
      a.current && !a.current.contains(X.target) && o();
    };
    return document.addEventListener("pointerdown", E), () => document.removeEventListener("pointerdown", E);
  }, [e, o]);
  const b = at(
    (E) => {
      var Y;
      const X = (Y = E.target.files) == null ? void 0 : Y[0];
      if (!X) return;
      const nt = new FileReader();
      nt.onload = () => {
        try {
          const ot = JSON.parse(nt.result);
          if (ot.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const J = X.name.replace(/\.excalidrawlib$/, "");
          ws(ot, { name: J }), x();
        } catch (ot) {
          console.error("Failed to parse library file:", ot);
        }
      }, nt.readAsText(X), E.target.value = "";
    },
    [x]
  ), v = at(
    (E) => {
      mh(E), Qo.clear(), x();
    },
    [x]
  ), M = at(
    (E) => {
      Wa(t, E);
    },
    [t]
  ), C = at(
    (E) => {
      Ba(t, E);
    },
    [t]
  ), P = at(
    (E) => {
      Rh(E), Qo.clear(), x();
    },
    [x]
  ), F = at((E) => {
    g((X) => {
      const nt = new Set(X);
      return nt.has(E) ? nt.delete(E) : nt.add(E), nt;
    });
  }, []), B = Kt(() => {
    if (!f.trim()) return null;
    const E = f.toLowerCase(), X = bh(f), nt = p.filter(
      (Y) => Y.name.toLowerCase().includes(E)
    );
    return { excalidraw: X, personal: nt };
  }, [f, p]);
  return !e || !r ? null : Ve(
    /* @__PURE__ */ k(
      "div",
      {
        ref: a,
        style: {
          position: "fixed",
          left: r.right + 8,
          top: r.top,
          background: s.panelBg,
          border: `1px solid ${s.border}`,
          borderRadius: s.panelBorderRadius,
          padding: 0,
          zIndex: 99999,
          boxShadow: s.panelShadow,
          width: 280,
          maxHeight: `calc(100vh - ${r.top + 20}px)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (E) => E.stopPropagation(),
        children: [
          /* @__PURE__ */ k("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
            /* @__PURE__ */ h(
              "div",
              {
                style: {
                  fontSize: 11,
                  fontWeight: 600,
                  color: s.text,
                  marginBottom: 8
                },
                children: i.librariesTitle
              }
            ),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                placeholder: i.librariesSearchPlaceholder,
                value: f,
                onChange: (E) => m(E.target.value),
                style: {
                  width: "100%",
                  padding: "5px 8px",
                  border: `1px solid ${s.border}`,
                  borderRadius: s.controlBorderRadius,
                  background: s.controlBg,
                  color: s.text,
                  fontSize: 11,
                  outline: "none",
                  boxSizing: "border-box"
                }
              }
            )
          ] }),
          /* @__PURE__ */ h(
            "div",
            {
              style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "4px 12px"
              },
              children: B !== null ? B.excalidraw.length === 0 && B.personal.length === 0 ? /* @__PURE__ */ h(
                "div",
                {
                  style: {
                    color: s.textDisabled,
                    fontSize: 11,
                    textAlign: "center",
                    padding: 20
                  },
                  children: i.librariesNoMatchingItems
                }
              ) : /* @__PURE__ */ k(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 4
                  },
                  children: [
                    B.personal.map((E) => /* @__PURE__ */ h(
                      Na,
                      {
                        item: E,
                        onClick: () => C(E),
                        onRemove: () => P(E.id),
                        theme: s
                      },
                      E.id
                    )),
                    B.excalidraw.map(({ library: E, item: X }) => /* @__PURE__ */ h(
                      Fa,
                      {
                        item: X,
                        libId: E.id,
                        onClick: () => M(X),
                        theme: s
                      },
                      X.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ k(mt, { children: [
                p.length > 0 && /* @__PURE__ */ h(
                  Hh,
                  {
                    items: p,
                    onPlace: C,
                    onRemove: P,
                    theme: s
                  }
                ),
                c.length === 0 && p.length === 0 ? /* @__PURE__ */ k(
                  "div",
                  {
                    style: {
                      color: s.textDisabled,
                      fontSize: 11,
                      textAlign: "center",
                      padding: "20px 10px"
                    },
                    children: [
                      i.librariesNoLibrariesInstalled,
                      /* @__PURE__ */ h("br", {}),
                      i.librariesImportHint,
                      /* @__PURE__ */ h("br", {}),
                      i.librariesBrowseHint
                    ]
                  }
                ) : c.map((E) => {
                  const X = y.has(E.id);
                  return /* @__PURE__ */ h(
                    Nh,
                    {
                      lib: E,
                      expanded: X,
                      onToggle: () => F(E.id),
                      onPlace: M,
                      onUninstall: () => v(E.id),
                      theme: s
                    },
                    E.id
                  );
                })
              ] })
            }
          ),
          /* @__PURE__ */ k(
            "div",
            {
              style: {
                borderTop: `1px solid ${s.border}`,
                padding: "8px 12px",
                display: "flex",
                gap: 6,
                flexShrink: 0
              },
              children: [
                /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: () => {
                      var E;
                      return (E = l.current) == null ? void 0 : E.click();
                    },
                    style: {
                      flex: 1,
                      padding: "5px 8px",
                      border: `1px solid ${s.border}`,
                      borderRadius: s.controlBorderRadius,
                      background: s.controlBg,
                      color: s.text,
                      cursor: "pointer",
                      fontSize: 10,
                      fontWeight: 500
                    },
                    children: i.librariesImportFile
                  }
                ),
                /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: n,
                    style: {
                      flex: 1,
                      padding: "5px 8px",
                      border: "none",
                      borderRadius: s.controlBorderRadius,
                      background: s.accentColor,
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 10,
                      fontWeight: 500
                    },
                    children: i.librariesBrowseLibraries
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ h(
            "input",
            {
              ref: l,
              type: "file",
              accept: ".excalidrawlib,.json",
              style: { display: "none" },
              onChange: b
            }
          )
        ]
      }
    ),
    document.body
  );
}
function Nh({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: r,
  onUninstall: n,
  theme: s
}) {
  const { labels: i } = jt(), [a, l] = $(null);
  return bt(() => {
    e && a === null && l(xs(t.id));
  }, [e, a, t.id]), /* @__PURE__ */ k("div", { style: { marginBottom: 4 }, children: [
    /* @__PURE__ */ k(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 0",
          cursor: "pointer",
          userSelect: "none"
        },
        onClick: o,
        children: [
          /* @__PURE__ */ h(
            "svg",
            {
              width: 12,
              height: 12,
              viewBox: "0 0 12 12",
              fill: "none",
              style: {
                transform: e ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.15s"
              },
              children: /* @__PURE__ */ h(
                "path",
                {
                  d: "M4 2l4 4-4 4",
                  stroke: s.textMuted,
                  strokeWidth: 1.5,
                  strokeLinecap: "round"
                }
              )
            }
          ),
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                flex: 1,
                fontSize: 10,
                fontWeight: 600,
                color: s.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              },
              children: t.name
            }
          ),
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                fontSize: 9,
                color: s.textDisabled
              },
              children: t.itemCount
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              title: i.librariesUninstall,
              onClick: (c) => {
                c.stopPropagation(), n();
              },
              style: {
                border: "none",
                background: "transparent",
                color: s.textDisabled,
                cursor: "pointer",
                padding: "2px 4px",
                fontSize: 12,
                lineHeight: 1
              },
              children: "×"
            }
          )
        ]
      }
    ),
    e && a && /* @__PURE__ */ h(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: a.map((c) => /* @__PURE__ */ h(
          Fa,
          {
            item: c,
            libId: t.id,
            onClick: () => r(c),
            theme: s
          },
          c.id
        ))
      }
    )
  ] });
}
function Hh({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = jt(), [s, i] = $(!0);
  return /* @__PURE__ */ k("div", { style: { marginBottom: 4 }, children: [
    /* @__PURE__ */ k(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 0",
          cursor: "pointer",
          userSelect: "none"
        },
        onClick: () => i((a) => !a),
        children: [
          /* @__PURE__ */ h(
            "svg",
            {
              width: 12,
              height: 12,
              viewBox: "0 0 12 12",
              fill: "none",
              style: {
                transform: s ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.15s"
              },
              children: /* @__PURE__ */ h(
                "path",
                {
                  d: "M4 2l4 4-4 4",
                  stroke: r.textMuted,
                  strokeWidth: 1.5,
                  strokeLinecap: "round"
                }
              )
            }
          ),
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                flex: 1,
                fontSize: 10,
                fontWeight: 600,
                color: r.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.03em"
              },
              children: n.librariesPersonal
            }
          ),
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                fontSize: 9,
                color: r.textDisabled
              },
              children: t.length
            }
          )
        ]
      }
    ),
    s && /* @__PURE__ */ h(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: t.map((a) => /* @__PURE__ */ h(
          Na,
          {
            item: a,
            onClick: () => e(a),
            onRemove: () => o(a.id),
            theme: r
          },
          a.id
        ))
      }
    )
  ] });
}
async function Oh(t, e, o = 1, r = 20, n) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${r}`;
  return (await fetch(s, { signal: n, credentials: "include" })).json();
}
async function wi(t, e = 1, o = 20, r) {
  const n = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(n, { signal: r, credentials: "include" })).json();
}
const Qn = "application/x-spatialboard-gif-item";
function Ha(t, e, o, r) {
  const n = e.file.hd.gif, s = 400, i = 300;
  let a = n.width, l = n.height;
  const c = Math.min(1, s / a, i / l);
  a = Math.round(a * c), l = Math.round(l * c);
  const d = o ?? window.innerWidth / 2, p = r ?? window.innerHeight / 2, u = t.screenToCanvas(d, p), f = {
    id: zt(10),
    type: "image",
    x: u.x - a / 2,
    y: u.y - l / 2,
    w: a,
    h: l,
    z: t.nextZ(),
    data: { src: n.url }
  };
  t.addNode(f), t.select(f.id);
}
function Xh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  baseUrl: n
}) {
  const s = Ut(), { labels: i } = jt(), a = ct(null), l = ct(null), [c, d] = $(""), [p, u] = $([]), [f, m] = $(!1), [y, g] = $(1), [x, b] = $(!1), v = ct();
  bt(() => {
    if (!e) return;
    const B = (E) => {
      a.current && !a.current.contains(E.target) && o();
    };
    return document.addEventListener("pointerdown", B), () => document.removeEventListener("pointerdown", B);
  }, [e, o]), bt(() => {
    if (!e || c.trim()) return;
    const B = new AbortController();
    return m(!0), wi(n, 1, 30, B.signal).then((E) => {
      u(E.data.data.filter((X) => X.type !== "ad")), g(1), b(E.data.has_next);
    }).catch(() => {
    }).finally(() => m(!1)), () => B.abort();
  }, [e, n, c]);
  const M = at(
    (B, E, X) => {
      if (!B.trim()) return;
      const nt = new AbortController();
      return m(!0), Oh(n, B, E, 30, nt.signal).then((Y) => {
        const ot = Y.data.data.filter((J) => J.type !== "ad");
        u((J) => X ? [...J, ...ot] : ot), g(E), b(Y.data.has_next);
      }).catch(() => {
      }).finally(() => m(!1)), nt;
    },
    [n]
  ), C = at(
    (B) => {
      if (d(B), v.current && clearTimeout(v.current), !B.trim()) {
        u([]), g(1), b(!1);
        return;
      }
      v.current = setTimeout(() => {
        M(B, 1, !1);
      }, 350);
    },
    [M]
  ), P = at(() => {
    const B = l.current;
    !B || f || !x || B.scrollTop + B.clientHeight >= B.scrollHeight - 100 && (c.trim() ? M(c, y + 1, !0) : (m(!0), wi(n, y + 1, 30).then((E) => {
      const X = E.data.data.filter((nt) => nt.type !== "ad");
      u((nt) => [...nt, ...X]), g(y + 1), b(E.data.has_next);
    }).catch(() => {
    }).finally(() => m(!1))));
  }, [f, x, c, y, M, n]), F = at(
    (B) => {
      Ha(t, B);
    },
    [t]
  );
  return !e || !r ? null : Ve(
    /* @__PURE__ */ k(
      "div",
      {
        ref: a,
        style: {
          position: "fixed",
          left: r.right + 8,
          top: r.top,
          background: s.panelBg,
          border: `1px solid ${s.border}`,
          borderRadius: s.panelBorderRadius,
          padding: 0,
          zIndex: 99999,
          boxShadow: s.panelShadow,
          width: 300,
          maxHeight: `calc(100vh - ${r.top + 20}px)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (B) => B.stopPropagation(),
        children: [
          /* @__PURE__ */ k("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
            /* @__PURE__ */ h(
              "div",
              {
                style: {
                  fontSize: 11,
                  fontWeight: 600,
                  color: s.text,
                  marginBottom: 8
                },
                children: i.gifPanelTitle
              }
            ),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                placeholder: i.gifSearchPlaceholder,
                value: c,
                onChange: (B) => C(B.target.value),
                style: {
                  width: "100%",
                  padding: "5px 8px",
                  border: `1px solid ${s.border}`,
                  borderRadius: s.controlBorderRadius,
                  background: s.controlBg,
                  color: s.text,
                  fontSize: 11,
                  outline: "none",
                  boxSizing: "border-box"
                }
              }
            )
          ] }),
          /* @__PURE__ */ k(
            "div",
            {
              ref: l,
              onScroll: P,
              style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "4px 12px",
                minHeight: 200
              },
              children: [
                p.length === 0 && !f ? /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      color: s.textDisabled,
                      fontSize: 11,
                      textAlign: "center",
                      padding: 20
                    },
                    children: c.trim() ? i.gifNoResults : i.gifLoading
                  }
                ) : /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 4
                    },
                    children: p.map((B) => /* @__PURE__ */ h(
                      Gh,
                      {
                        item: B,
                        onClick: () => F(B),
                        engine: t,
                        theme: s
                      },
                      B.id
                    ))
                  }
                ),
                f && /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      color: s.textMuted,
                      fontSize: 10,
                      textAlign: "center",
                      padding: 12
                    },
                    children: i.gifLoading
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              style: {
                borderTop: `1px solid ${s.border}`,
                padding: "6px 12px",
                fontSize: 9,
                color: s.textMuted,
                textAlign: "center",
                flexShrink: 0
              },
              children: i.gifPoweredBy
            }
          )
        ]
      }
    ),
    document.body
  );
}
function Gh({
  item: t,
  onClick: e,
  engine: o,
  theme: r
}) {
  const n = t.file.sm.webp, s = n.width / n.height, i = at(
    (a) => {
      a.dataTransfer.setData(Qn, JSON.stringify(t)), a.dataTransfer.effectAllowed = "copy";
    },
    [t]
  );
  return /* @__PURE__ */ h(
    "button",
    {
      title: t.title,
      onClick: e,
      draggable: !0,
      onDragStart: i,
      style: {
        border: `1px solid ${r.border}`,
        borderRadius: r.controlBorderRadius,
        background: r.controlBg,
        cursor: "grab",
        padding: 0,
        overflow: "hidden",
        aspectRatio: s > 1.5 ? "16/9" : s < 0.7 ? "3/4" : "1"
      },
      children: /* @__PURE__ */ h(
        "img",
        {
          src: n.url,
          alt: t.title,
          loading: "lazy",
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }
        }
      )
    }
  );
}
function Yh({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [r, n] = $(""), s = ct(null), i = ct(null);
  bt(() => {
    var p;
    (p = s.current) == null || p.focus();
  }, []);
  const a = Kt(() => ks(t, 56), [t]), l = at(() => {
    e(r.trim() || "Untitled");
  }, [r, e]), c = at(
    (p) => {
      p.key === "Enter" ? (p.preventDefault(), l()) : p.key === "Escape" && (p.preventDefault(), o());
    },
    [l, o]
  ), d = at(
    (p) => {
      i.current && !i.current.contains(p.target) && o();
    },
    [o]
  );
  return Ve(
    /* @__PURE__ */ h(
      "div",
      {
        onClick: d,
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ k(
          "div",
          {
            ref: i,
            onPointerDown: (p) => p.stopPropagation(),
            style: {
              background: "#1e1e2e",
              borderRadius: 8,
              border: "1px solid #333",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              padding: 16,
              width: 280,
              color: "#e0e0e0",
              fontSize: 13,
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            },
            children: [
              /* @__PURE__ */ h(
                "div",
                {
                  style: {
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 12
                  },
                  children: "Add to Personal Library"
                }
              ),
              /* @__PURE__ */ h(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 12,
                    padding: 8,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 6,
                    border: "1px solid #333"
                  },
                  children: /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: a } })
                }
              ),
              /* @__PURE__ */ h(
                "input",
                {
                  ref: s,
                  type: "text",
                  value: r,
                  onChange: (p) => n(p.target.value),
                  onKeyDown: c,
                  placeholder: "Item name",
                  style: {
                    width: "100%",
                    padding: "6px 8px",
                    border: "1px solid #333",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.06)",
                    color: "#e0e0e0",
                    fontSize: 13,
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: 12
                  }
                }
              ),
              /* @__PURE__ */ k("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
                /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: o,
                    style: {
                      padding: "5px 12px",
                      border: "1px solid #333",
                      borderRadius: 4,
                      background: "transparent",
                      color: "#e0e0e0",
                      cursor: "pointer",
                      fontSize: 12
                    },
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: l,
                    style: {
                      padding: "5px 12px",
                      border: "none",
                      borderRadius: 4,
                      background: "#6366f1",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 500
                    },
                    children: "Save"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    document.body
  );
}
function Jn(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function jh(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Oa(t, e, o, r) {
  return new Promise((n) => {
    const s = jh(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, d = i.naturalHeight || 200;
      if (c <= 1 || d <= 1) {
        const p = t.match(/viewBox=["']([^"']+)["']/i);
        if (p) {
          const u = p[1].trim().split(/[\s,]+/).map(Number);
          u.length === 4 && u[2] > 0 && u[3] > 0 && (c = u[2], d = u[3]);
        }
      }
      if (c > 400 || d > 400) {
        const p = Math.min(400 / c, 400 / d);
        c = Math.round(c * p), d = Math.round(d * p);
      }
      n({
        id: zt(10),
        type: "image",
        x: e,
        y: o,
        w: c,
        h: d,
        z: r,
        data: { src: s }
      });
    }, i.onerror = () => n(null), i.src = s;
  });
}
async function Vh(t, e, o, r) {
  const { x: n, y: s } = t.screenToCanvas(o, r), i = await Oa(e, n, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
const ki = {
  number: "#3b82f6",
  // blue
  string: "#10b981",
  // green
  boolean: "#f59e0b",
  // amber
  object: "#8b5cf6",
  // purple
  any: "#6b7280",
  // gray
  signal: "#ef4444"
  // red
}, qh = xe(function({
  node: e,
  zoom: o,
  showHandles: r = !0,
  measuredHeights: n,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const a = e.h === "auto" ? (n == null ? void 0 : n[e.id]) ?? 100 : e.h, l = e.rotation || 0, c = e.x + e.w / 2, d = e.y + a / 2, p = 8 / o, u = p / 2, f = 25 / o, m = !!e.locked, y = [
    { pos: "nw", cx: e.x, cy: e.y },
    { pos: "n", cx: e.x + e.w / 2, cy: e.y },
    { pos: "ne", cx: e.x + e.w, cy: e.y },
    { pos: "e", cx: e.x + e.w, cy: e.y + a / 2 },
    { pos: "se", cx: e.x + e.w, cy: e.y + a },
    { pos: "s", cx: e.x + e.w / 2, cy: e.y + a },
    { pos: "sw", cx: e.x, cy: e.y + a },
    { pos: "w", cx: e.x, cy: e.y + a / 2 }
  ];
  return /* @__PURE__ */ k("g", { transform: `rotate(${l}, ${c}, ${d})`, children: [
    /* @__PURE__ */ h(
      "rect",
      {
        x: e.x,
        y: e.y,
        width: e.w,
        height: a,
        fill: "none",
        stroke: m ? "#f59e0b" : "#3b82f6",
        strokeWidth: 1.5 / o,
        strokeDasharray: `${4 / o} ${3 / o}`
      }
    ),
    m && (() => {
      const g = 16 / o, x = e.x + e.w - g - 4 / o, b = e.y - g - 4 / o;
      return /* @__PURE__ */ k("g", { transform: `translate(${x}, ${b})`, children: [
        /* @__PURE__ */ h(
          "rect",
          {
            x: 0,
            y: 0,
            width: g,
            height: g,
            rx: 3 / o,
            fill: "#f59e0b"
          }
        ),
        /* @__PURE__ */ k("g", { transform: `scale(${g / 24})`, children: [
          /* @__PURE__ */ h("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ h("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    r && !m && y.map(({ pos: g, cx: x, cy: b }) => /* @__PURE__ */ h(
      "rect",
      {
        x: x - u,
        y: b - u,
        width: p,
        height: p,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: Jr(g, l),
          pointerEvents: "auto"
        },
        onPointerDown: (v) => {
          v.stopPropagation(), s == null || s(e.id, g, v);
        }
      },
      g
    )),
    r && !m && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h(
        "line",
        {
          x1: e.x + e.w / 2,
          y1: e.y,
          x2: e.x + e.w / 2,
          y2: e.y - f,
          stroke: "#3b82f6",
          strokeWidth: 1.5 / o
        }
      ),
      /* @__PURE__ */ h(
        "rect",
        {
          x: e.x + e.w / 2 - u,
          y: e.y - f - u,
          width: p,
          height: p,
          rx: 1.5 / o,
          transform: `rotate(45, ${e.x + e.w / 2}, ${e.y - f})`,
          fill: "white",
          stroke: "#3b82f6",
          strokeWidth: 1.5 / o,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (g) => {
            g.stopPropagation(), i == null || i(e.id, g);
          }
        }
      )
    ] })
  ] });
}), Kh = xe(function({
  edge: e,
  fromNode: o,
  toNode: r,
  viewport: n,
  selection: s,
  measuredHeights: i,
  registry: a,
  onEdgeEndpointDown: l,
  onKinkHandleDown: c,
  edgeReconnect: d,
  eraserMarkedIds: p,
  cycleNodeIds: u
}) {
  const f = e.data.edgeType || "bezier";
  let m, y;
  if (a && e.data.sourcePort) {
    const ft = a.get(o.type);
    ft != null && ft.ports && (m = fr(o, ft.ports, e.data.sourcePort, n.zoom, i) ?? void 0);
  }
  if (a && e.data.targetPort) {
    const ft = a.get(r.type);
    ft != null && ft.ports && (y = fr(r, ft.ports, e.data.targetPort, n.zoom, i) ?? void 0);
  }
  const g = Ge(
    o,
    r,
    f,
    i,
    e.data.sourceHandle,
    e.data.targetHandle,
    e.data.midpointOffset,
    e.data.curveOffset,
    m,
    y
  ), { path: x, x1: b, y1: v, x2: M, y2: C, labelX: P, labelY: F, arrowAngle: B, tailAngle: E, kinkHandle: X } = g, nt = s.has(e.id), Y = e.data.strokeWidth, ot = e.data.style === "dashed" ? `${8 * Y},${4 * Y}` : e.data.style === "dotted" ? `${2 * Y},${3 * Y}` : void 0, J = Math.max(8, Y * 3), lt = e.data.arrowHeadSize ?? J, H = e.data.arrowTailSize ?? J, O = e.data.animated, _ = p == null ? void 0 : p.has(e.id), K = (d == null ? void 0 : d.edgeId) === e.id, q = !!(u && u.size > 0 && e.data.sourcePort && e.data.targetPort && u.has(e.data.fromId) && u.has(e.data.toId)), G = q ? "#ef4444" : e.data.color, V = e.data.roughness ?? 0, tt = Kt(() => V <= 0 ? null : {
    stroke: G,
    roughness: V,
    strokeWidth: Y,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [G, V, Y, e.data.style, e.id]);
  let Z = null, st = null, dt = null;
  tt && (Z = In(x, tt), e.data.arrowHead === "arrow" && (st = In(Vo(M, C, B, lt), { ...tt, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (dt = In(Vo(b, v, E, H), { ...tt, strokeLineDash: void 0 })));
  const Mt = Kt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), Ct = Kt(() => {
    if (!O) return;
    const ft = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", Et = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", St = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${ft} ${Et} ${St} infinite` };
  }, [O, e.data.animatedDirection]), Pt = Kt(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), xt = Kt(
    () => _ ? { filter: "saturate(0)" } : void 0,
    [_]
  );
  return /* @__PURE__ */ k("g", { opacity: K ? 0.15 : _ ? 0.25 : void 0, style: xt, children: [
    q && /* @__PURE__ */ h(
      "path",
      {
        d: x,
        stroke: "#ef4444",
        strokeWidth: Y + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: Mt
      }
    ),
    nt && /* @__PURE__ */ h(
      "path",
      {
        d: x,
        stroke: "#3b82f6",
        strokeWidth: Y + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    Z ? Z.map((ft, Et) => /* @__PURE__ */ h(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeDasharray: ft.strokeDasharray,
        strokeLinecap: "round",
        fill: ft.fill ?? "none",
        style: O ? Ct : void 0
      },
      Et
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: x,
        stroke: G,
        strokeWidth: Y,
        strokeDasharray: O ? "12,8" : q ? `${6 * Y},${4 * Y}` : ot,
        strokeLinecap: "round",
        fill: "none",
        style: q ? Pt : Ct
      }
    ),
    e.data.arrowHead === "arrow" && (st ? st.map((ft, Et) => /* @__PURE__ */ h(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ft.fill ?? "none"
      },
      `ah${Et}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: Vo(M, C, B, lt),
        fill: "none",
        stroke: G,
        strokeWidth: Y,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: Xr(M, C, B, lt),
        fill: G,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: M,
        cy: C,
        r: lt * 0.25,
        fill: G
      }
    ),
    e.data.arrowTail === "arrow" && (dt ? dt.map((ft, Et) => /* @__PURE__ */ h(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ft.fill ?? "none"
      },
      `at${Et}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: Vo(b, v, E, H),
        fill: "none",
        stroke: G,
        strokeWidth: Y,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: Xr(b, v, E, H),
        fill: G,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: b,
        cy: v,
        r: H * 0.25,
        fill: G
      }
    ),
    e.data.label && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h(
        "rect",
        {
          x: P - (e.data.label.length * 3.5 + 6) / n.zoom,
          y: F - 8 / n.zoom,
          width: (e.data.label.length * 7 + 12) / n.zoom,
          height: 16 / n.zoom,
          fill: "white",
          rx: 4 / n.zoom,
          opacity: 0.9
        }
      ),
      /* @__PURE__ */ h(
        "text",
        {
          x: P,
          y: F + 4 / n.zoom,
          fill: G,
          fontSize: 12 / n.zoom,
          textAnchor: "middle",
          style: { pointerEvents: "none" },
          children: e.data.label
        }
      )
    ] }),
    nt && !K && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h(
        "circle",
        {
          cx: b,
          cy: v,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ft) => {
            ft.stopPropagation(), l == null || l(e.id, "source", ft);
          }
        }
      ),
      /* @__PURE__ */ h(
        "circle",
        {
          cx: M,
          cy: C,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ft) => {
            ft.stopPropagation(), l == null || l(e.id, "target", ft);
          }
        }
      )
    ] }),
    nt && !K && X && /* @__PURE__ */ h(
      "circle",
      {
        cx: X.x,
        cy: X.y,
        r: 5 / n.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / n.zoom,
        style: {
          cursor: X.axis === "xy" ? "move" : X.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (ft) => {
          ft.stopPropagation(), c == null || c(e.id, X.axis, X.min, X.max, ft);
        }
      }
    )
  ] });
});
function Uh({
  nodes: t,
  viewport: e,
  selection: o,
  measuredHeights: r,
  activeStroke: n,
  shapePreview: s,
  shapePreviewStyle: i,
  onResizeHandleDown: a,
  onRotateStart: l,
  onConnectionHandleDown: c,
  onEdgeEndpointDown: d,
  onKinkHandleDown: p,
  edgePreview: u,
  edgeReconnect: f,
  eraserMarkedIds: m,
  eraserTrail: y,
  laserTrail: g,
  mode: x,
  hoveredNodeId: b,
  registry: v,
  onPortHandleDown: M,
  cycleNodeIds: C,
  containerTypes: P,
  alignGuides: F
}) {
  const B = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, E = t.filter(
    (Y) => Y.type !== "edge" && Y.type !== "content" && Y.type !== "image"
  ), X = t.filter((Y) => Y.type === "edge").sort((Y, ot) => Y.z - ot.z), nt = Kt(() => new Map(t.map((Y) => [Y.id, Y])), [t]);
  return /* @__PURE__ */ h(
    "svg",
    {
      "data-sb-overlay": !0,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none"
      },
      children: /* @__PURE__ */ k("g", { transform: B, children: [
        X.map((Y) => {
          const ot = nt.get(Y.data.fromId), J = nt.get(Y.data.toId);
          return !ot || !J ? null : /* @__PURE__ */ h(
            Kh,
            {
              edge: Y,
              fromNode: ot,
              toNode: J,
              viewport: e,
              selection: o,
              measuredHeights: r,
              registry: v,
              onEdgeEndpointDown: d,
              onKinkHandleDown: p,
              edgeReconnect: f,
              eraserMarkedIds: m,
              cycleNodeIds: C
            },
            Y.id
          );
        }),
        (() => {
          var K, q;
          const Y = !!u || !!f, ot = (u == null ? void 0 : u.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, J = (u == null ? void 0 : u.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, lt = (u == null ? void 0 : u.fromNode.id) ?? (f == null ? void 0 : f.anchorNodeId) ?? null;
          let H = null, O = null;
          const _ = /* @__PURE__ */ new Set();
          if (Y) {
            let G = 1 / 0, V = !1;
            const tt = 50 / e.zoom;
            for (const Z of t) {
              if (Z.type === "edge" || Z.id === lt || (q = (K = v == null ? void 0 : v.get(Z.type)) == null ? void 0 : K.ports) != null && q.length) continue;
              const st = Z.h === "auto" ? (r == null ? void 0 : r[Z.id]) ?? 100 : Z.h, dt = Z.w * 0.2, Mt = st * 0.2;
              ot >= Z.x - dt && ot <= Z.x + Z.w + dt && J >= Z.y - Mt && J <= Z.y + st + Mt && _.add(Z.id);
              const Ct = Ko(Z, r), Pt = P ? P.has(Z.type) : Z.type === "frame";
              for (const xt of Ct) {
                const ft = Math.hypot(xt.x - ot, xt.y - J);
                ft >= tt || Pt && !V && H || (!Pt && V || ft < G) && (G = ft, V = Pt, H = Z.id, O = xt.side);
              }
            }
          }
          return t.filter((G) => {
            var V, tt;
            return G.type === "edge" || (tt = (V = v == null ? void 0 : v.get(G.type)) == null ? void 0 : V.ports) != null && tt.length ? !1 : o.size <= 1 && o.has(G.id) || Y && (G.id === lt || _.has(G.id));
          }).map((G) => {
            const V = Ko(G, r), tt = 4 / e.zoom, Z = 26 / e.zoom, st = G.rotation || 0, dt = G.h === "auto" ? (r == null ? void 0 : r[G.id]) ?? 100 : G.h, Mt = G.x + G.w / 2, Ct = G.y + dt / 2, Pt = u && u.fromNode.id === G.id || f && f.anchorNodeId === G.id, xt = o.has(G.id) && !Y;
            return /* @__PURE__ */ h("g", { transform: st ? `rotate(${st}, ${Mt}, ${Ct})` : void 0, children: V.map(({ side: ft }) => {
              const Et = {
                top: [G.x + G.w / 2, G.y],
                bottom: [G.x + G.w / 2, G.y + dt],
                left: [G.x, G.y + dt / 2],
                right: [G.x + G.w, G.y + dt / 2]
              }, [St, Rt] = Et[ft], ut = ft === "top" && o.has(G.id) ? 42 / e.zoom : Z;
              let $t = St, re = Rt;
              switch (ft) {
                case "top":
                  re = Rt - ut;
                  break;
                case "bottom":
                  re = Rt + ut;
                  break;
                case "left":
                  $t = St - ut;
                  break;
                case "right":
                  $t = St + ut;
                  break;
              }
              const ne = Y && H === G.id && O === ft;
              return /* @__PURE__ */ h(
                "circle",
                {
                  cx: $t,
                  cy: re,
                  r: ne ? 5 / e.zoom : tt,
                  fill: Pt || ne ? "#3b82f6" : "white",
                  stroke: ne ? "white" : Y && !Pt ? "#3b82f6" : "#94a3b8",
                  strokeWidth: 1.5 / e.zoom,
                  opacity: ne || Y && !Pt ? 1 : 0.8,
                  style: {
                    cursor: xt ? "crosshair" : "default",
                    pointerEvents: xt ? "auto" : "none"
                  },
                  onPointerDown: xt ? (fe) => {
                    fe.stopPropagation(), c == null || c(G.id, ft, fe);
                  } : void 0
                },
                `ch-${G.id}-${ft}`
              );
            }) }, `conn-${G.id}`);
          });
        })(),
        v && (() => {
          var K;
          const Y = !!u || !!f, ot = (u == null ? void 0 : u.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, J = (u == null ? void 0 : u.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, lt = (u == null ? void 0 : u.fromNode.id) ?? null, H = (u == null ? void 0 : u.sourceDirection) === "output" ? "input" : (u == null ? void 0 : u.sourceDirection) === "input" ? "output" : null;
          let O = null, _ = null;
          if (Y && H) {
            let q = 40 / e.zoom;
            for (const G of t) {
              if (G.type === "edge" || G.id === lt) continue;
              const V = v.get(G.type);
              if (!((K = V == null ? void 0 : V.ports) != null && K.length)) continue;
              const tt = G.h === "auto" ? (r == null ? void 0 : r[G.id]) ?? 100 : G.h, Z = 14 / e.zoom, st = V.ports.filter((dt) => dt.direction === H);
              for (let dt = 0; dt < st.length; dt++) {
                const Mt = st[dt], Ct = G.y + tt / (st.length + 1) * (dt + 1), Pt = Mt.direction === "input" ? G.x - Z : G.x + G.w + Z, xt = Math.hypot(Pt - ot, Ct - J);
                xt < q && (q = xt, O = G.id, _ = Mt.id);
              }
            }
          }
          return t.filter((q) => {
            var V;
            if (q.type === "edge") return !1;
            const G = v.get(q.type);
            return !!((V = G == null ? void 0 : G.ports) != null && V.length);
          }).map((q) => {
            const V = v.get(q.type).ports, tt = q.h === "auto" ? (r == null ? void 0 : r[q.id]) ?? 100 : q.h, Z = q.rotation || 0, st = q.x + q.w / 2, dt = q.y + tt / 2, Mt = 6 / e.zoom, Ct = 14 / e.zoom, Pt = V.filter((Rt) => Rt.direction === "input"), xt = V.filter((Rt) => Rt.direction === "output"), ft = !Y, Et = (Rt, ut, $t, re) => {
              const ne = q.y + tt / ($t.length + 1) * (ut + 1), fe = re === "input" ? q.x - Ct : q.x + q.w + Ct, Ne = ki[Rt.dataType] || ki.any, ve = O === q.id && _ === Rt.id, er = ve ? 8 / e.zoom : Mt, zo = re === "input" ? q.x : q.x + q.w, lo = re === "input" ? fe - Mt - 4 / e.zoom : fe + Mt + 4 / e.zoom;
              return /* @__PURE__ */ k("g", { children: [
                /* @__PURE__ */ h(
                  "line",
                  {
                    x1: fe,
                    y1: ne,
                    x2: zo,
                    y2: ne,
                    stroke: Ne,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                ve && /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: fe,
                    cy: ne,
                    r: 12 / e.zoom,
                    fill: "none",
                    stroke: "white",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.3,
                    style: { pointerEvents: "none" }
                  }
                ),
                /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: fe,
                    cy: ne,
                    r: er,
                    fill: ve ? "white" : Ne,
                    stroke: ve ? Ne : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: ft ? "crosshair" : "default",
                      pointerEvents: ft ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: ft ? (ie) => {
                      ie.stopPropagation(), M == null || M(q.id, Rt.id, re, ie);
                    } : void 0
                  }
                ),
                (() => {
                  const ie = Rt.label || Rt.id, le = 9 / e.zoom, To = 5 / e.zoom, or = 2.5 / e.zoom, ee = ie.length * le * 0.62 + To * 2, Me = le + or * 2, Ft = re === "input" ? lo - ee : lo, rr = ne - Me / 2, S = Me / 2, ht = ve ? Ne : "#1a1a2e", Qt = ve ? Ne : "#2a2a40", ae = ve ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ k("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ h(
                      "rect",
                      {
                        x: Ft,
                        y: rr,
                        width: ee,
                        height: Me,
                        rx: S,
                        ry: S,
                        fill: ht,
                        fillOpacity: ve ? 0.9 : 0.85,
                        stroke: Qt,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ h(
                      "text",
                      {
                        x: Ft + ee / 2,
                        y: ne + le * 0.35,
                        fill: ae,
                        fontSize: le,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: ie
                      }
                    )
                  ] });
                })()
              ] }, `port-${q.id}-${Rt.id}`);
            }, St = C == null ? void 0 : C.has(q.id);
            return /* @__PURE__ */ k("g", { transform: Z ? `rotate(${Z}, ${st}, ${dt})` : void 0, children: [
              Pt.map((Rt, ut) => Et(Rt, ut, Pt, "input")),
              xt.map((Rt, ut) => Et(Rt, ut, xt, "output")),
              St && (() => {
                const Rt = 10 / e.zoom, ut = q.x + q.w + Rt * 0.3, $t = q.y - Rt * 0.3;
                return /* @__PURE__ */ k("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: ut,
                      cy: $t,
                      r: Rt,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ h(
                    "text",
                    {
                      x: ut,
                      y: $t + 4 / e.zoom,
                      fill: "white",
                      fontSize: 12 / e.zoom,
                      fontWeight: 800,
                      textAnchor: "middle",
                      style: { pointerEvents: "none", userSelect: "none" },
                      children: "!"
                    }
                  )
                ] });
              })()
            ] }, `ports-${q.id}`);
          });
        })(),
        u && (() => {
          let Y, ot;
          if (u.sourcePort && v) {
            const J = u.fromNode, lt = v.get(J.type), H = lt != null && lt.ports ? fr(J, lt.ports, u.sourcePort, e.zoom, r) : null;
            if (H)
              Y = H.x, ot = H.y;
            else {
              const O = mn(J, u.cursorX, u.cursorY, r);
              Y = O.x, ot = O.y;
            }
          } else if (u.sourceHandle) {
            const J = u.fromNode, lt = J.h === "auto" ? (r == null ? void 0 : r[J.id]) ?? 100 : J.h, H = {
              top: [J.x + J.w / 2, J.y],
              bottom: [J.x + J.w / 2, J.y + lt],
              left: [J.x, J.y + lt / 2],
              right: [J.x + J.w, J.y + lt / 2]
            }, O = u.sourceHandle, _ = O === "top" ? 42 / e.zoom : 26 / e.zoom, [K, q] = H[O];
            let G = K, V = q;
            switch (O) {
              case "top":
                V = q - _;
                break;
              case "bottom":
                V = q + _;
                break;
              case "left":
                G = K - _;
                break;
              case "right":
                G = K + _;
                break;
            }
            if (J.rotation) {
              const tt = J.x + J.w / 2, Z = J.y + lt / 2, st = J.rotation * Math.PI / 180, dt = Math.cos(st), Mt = Math.sin(st), Ct = G - tt, Pt = V - Z;
              Y = tt + Ct * dt - Pt * Mt, ot = Z + Ct * Mt + Pt * dt;
            } else
              Y = G, ot = V;
          } else {
            const J = mn(u.fromNode, u.cursorX, u.cursorY, r);
            Y = J.x, ot = J.y;
          }
          return /* @__PURE__ */ h(
            "line",
            {
              x1: Y,
              y1: ot,
              x2: u.cursorX,
              y2: u.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        f && (() => {
          const Y = nt.get(f.anchorNodeId);
          if (!Y) return null;
          let ot, J;
          if (f.anchorHandle) {
            const lt = Y.h === "auto" ? (r == null ? void 0 : r[Y.id]) ?? 100 : Y.h, H = {
              top: [Y.x + Y.w / 2, Y.y],
              bottom: [Y.x + Y.w / 2, Y.y + lt],
              left: [Y.x, Y.y + lt / 2],
              right: [Y.x + Y.w, Y.y + lt / 2]
            }, O = f.anchorHandle, _ = O === "top" ? 42 / e.zoom : 26 / e.zoom, [K, q] = H[O];
            let G = K, V = q;
            switch (O) {
              case "top":
                V = q - _;
                break;
              case "bottom":
                V = q + _;
                break;
              case "left":
                G = K - _;
                break;
              case "right":
                G = K + _;
                break;
            }
            if (Y.rotation) {
              const tt = Y.x + Y.w / 2, Z = Y.y + lt / 2, st = Y.rotation * Math.PI / 180, dt = Math.cos(st), Mt = Math.sin(st), Ct = G - tt, Pt = V - Z;
              ot = tt + Ct * dt - Pt * Mt, J = Z + Ct * Mt + Pt * dt;
            } else
              ot = G, J = V;
          } else {
            const lt = mn(Y, f.cursorX, f.cursorY, r);
            ot = lt.x, J = lt.y;
          }
          return /* @__PURE__ */ h(
            "line",
            {
              x1: ot,
              y1: J,
              x2: f.cursorX,
              y2: f.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && E.filter((Y) => o.has(Y.id)).map((Y) => /* @__PURE__ */ h(
          qh,
          {
            node: Y,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: r,
            onHandlePointerDown: a,
            onRotateStart: l
          },
          `sel-${Y.id}`
        )),
        n && n.points.length > 1 && (() => {
          if (n.strokeStyle === "dashed" || n.strokeStyle === "dotted") {
            const ot = n.points, J = ["M", ot[0][0], ot[0][1]];
            for (let O = 1; O < ot.length; O++) {
              const [_, K] = ot[O], [q, G] = ot[O - 1];
              J.push("Q", q, G, (q + _) / 2, (G + K) / 2);
            }
            const lt = ot[ot.length - 1];
            J.push("L", lt[0], lt[1]);
            const H = io(n.strokeStyle);
            return /* @__PURE__ */ h(
              "path",
              {
                d: J.join(" "),
                fill: "none",
                stroke: n.color,
                strokeWidth: n.width,
                strokeDasharray: H == null ? void 0 : H.map((O) => O * Math.max(n.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            );
          }
          return /* @__PURE__ */ h(
            "path",
            {
              d: ds(n.points, {
                size: n.width
              }),
              fill: n.color
            }
          );
        })(),
        s && i && (() => {
          const Y = Math.min(s.startX, s.endX), ot = Math.min(s.startY, s.endY), J = Math.abs(s.endX - s.startX), lt = Math.abs(s.endY - s.startY);
          if (J < 2 && lt < 2) return null;
          const H = i, O = H.shapeType || "rect";
          if (O === "ellipse")
            return /* @__PURE__ */ h(
              "ellipse",
              {
                cx: Y + J / 2,
                cy: ot + lt / 2,
                rx: J / 2,
                ry: lt / 2,
                stroke: H.stroke,
                strokeWidth: H.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (O === "diamond")
            return /* @__PURE__ */ h(
              "polygon",
              {
                points: `${Y + J / 2},${ot} ${Y + J},${ot + lt / 2} ${Y + J / 2},${ot + lt} ${Y},${ot + lt / 2}`,
                stroke: H.stroke,
                strokeWidth: H.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (O === "line" || O === "arrow") {
            const _ = s.startX, K = s.startY, q = s.endX, G = s.endY;
            return /* @__PURE__ */ k(mt, { children: [
              /* @__PURE__ */ h(
                "line",
                {
                  x1: _,
                  y1: K,
                  x2: q,
                  y2: G,
                  stroke: H.stroke,
                  strokeWidth: H.strokeWidth,
                  strokeDasharray: "4"
                }
              ),
              O === "arrow" && (() => {
                const V = Math.atan2(G - K, q - _), tt = Math.max(12, H.strokeWidth * 4), Z = Math.PI / 6, st = q - tt * Math.cos(V - Z), dt = G - tt * Math.sin(V - Z), Mt = q - tt * Math.cos(V + Z), Ct = G - tt * Math.sin(V + Z);
                return /* @__PURE__ */ h(
                  "polyline",
                  {
                    points: `${st},${dt} ${q},${G} ${Mt},${Ct}`,
                    stroke: H.stroke,
                    strokeWidth: H.strokeWidth,
                    fill: "none",
                    strokeDasharray: "4"
                  }
                );
              })()
            ] });
          }
          return /* @__PURE__ */ h(
            "rect",
            {
              x: Y,
              y: ot,
              width: J,
              height: lt,
              stroke: H.stroke,
              strokeWidth: H.strokeWidth,
              fill: "none",
              strokeDasharray: "4"
            }
          );
        })(),
        y && y.length > 1 && (() => {
          const Y = performance.now(), ot = 400, J = 6 / e.zoom, lt = [`M${y[0][0]},${y[0][1]}`];
          if (y.length === 2)
            lt.push(`L${y[1][0]},${y[1][1]}`);
          else {
            for (let tt = 0; tt < y.length - 1; tt++) {
              const Z = (y[tt][0] + y[tt + 1][0]) / 2, st = (y[tt][1] + y[tt + 1][1]) / 2;
              lt.push(`Q${y[tt][0]},${y[tt][1]},${Z},${st}`);
            }
            const V = y[y.length - 1];
            lt.push(`L${V[0]},${V[1]}`);
          }
          const H = lt.join(" "), O = (Y - y[y.length - 1][2]) / ot, _ = (Y - y[0][2]) / ot, K = Math.max(0, 0.85 * (1 - O)), q = Math.max(0, 0.85 * (1 - _)), G = (K + q) / 2;
          return G <= 0 ? null : /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: H,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: J * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: G * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: H,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: J,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: G
              }
            )
          ] });
        })(),
        g && g.length > 1 && (() => {
          const Y = performance.now(), ot = 1560, J = 6 / e.zoom, lt = [];
          let H = !1, O = !1;
          for (let st = 0; st < g.length; st++) {
            const dt = g[st];
            if (isNaN(dt[0])) {
              H = !1, O = !1;
              continue;
            }
            if (!H)
              lt.push(`M${dt[0]},${dt[1]}`), H = !0, O = !0;
            else if (O) {
              const Mt = st + 1 < g.length && !isNaN(g[st + 1][0]) ? g[st + 1] : null;
              if (Mt) {
                const Ct = (dt[0] + Mt[0]) / 2, Pt = (dt[1] + Mt[1]) / 2;
                lt.push(`Q${dt[0]},${dt[1]},${Ct},${Pt}`);
              } else
                lt.push(`L${dt[0]},${dt[1]}`);
            }
          }
          if (lt.length === 0) return null;
          const _ = lt.join(" "), K = g.filter((st) => !isNaN(st[0]));
          if (K.length === 0) return null;
          const q = (Y - K[K.length - 1][2]) / ot, G = (Y - K[0][2]) / ot, V = Math.max(0, 0.85 * (1 - q)), tt = Math.max(0, 0.85 * (1 - G)), Z = (V + tt) / 2;
          return Z <= 0 ? null : /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: _,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: J * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: Z * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: _,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: J,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: Z
              }
            )
          ] });
        })(),
        F && F.length > 0 && F.map((Y, ot) => /* @__PURE__ */ h(
          "line",
          {
            x1: Y.axis === "x" ? Y.position : Y.start,
            y1: Y.axis === "x" ? Y.start : Y.position,
            x2: Y.axis === "x" ? Y.position : Y.end,
            y2: Y.axis === "x" ? Y.end : Y.position,
            stroke: "#f472b6",
            strokeWidth: 1 / e.zoom,
            strokeDasharray: `${3 / e.zoom} ${2 / e.zoom}`,
            opacity: 0.8
          },
          `guide-${ot}`
        ))
      ] })
    }
  );
}
function Zh({
  x: t,
  y: e,
  sections: o,
  onClose: r
}) {
  const n = ct(null);
  bt(() => {
    var m;
    const p = (y) => {
      n.current && !n.current.contains(y.target) && r();
    }, u = (y) => {
      y.key === "Escape" && r();
    }, f = ((m = n.current) == null ? void 0 : m.ownerDocument) ?? document;
    return f.addEventListener("pointerdown", p, !0), f.addEventListener("keydown", u), () => {
      f.removeEventListener("pointerdown", p, !0), f.removeEventListener("keydown", u);
    };
  }, [r]), bt(() => {
    const p = n.current;
    if (!p) return;
    const u = p.getBoundingClientRect(), f = p.ownerDocument.defaultView ?? window;
    let m = t, y = e;
    u.right > f.innerWidth && (m = t - u.width), u.bottom > f.innerHeight && (y = e - u.height), m = Math.max(0, m), y = Math.max(0, y), p.style.left = `${m}px`, p.style.top = `${y}px`;
  }, [t, e]);
  const s = at(
    (p) => {
      p.disabled || (p.action(), r());
    },
    [r]
  ), i = navigator.platform.includes("Mac"), a = i ? "⌘" : "Ctrl+", l = i ? "⌥" : "Alt+", c = i ? "⇧" : "Shift+", d = (p) => p.replace("Mod+", a).replace("Alt+", l).replace("Shift+", c);
  return /* @__PURE__ */ h(
    "div",
    {
      "data-sb-context-menu": !0,
      ref: n,
      onPointerDown: (p) => p.stopPropagation(),
      onContextMenu: (p) => p.preventDefault(),
      style: {
        position: "fixed",
        left: t,
        top: e,
        zIndex: 9999,
        minWidth: 200,
        background: "#1e1e2e",
        borderRadius: 8,
        border: "1px solid #333",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        padding: "4px 0",
        color: "#e0e0e0",
        fontSize: 13,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        userSelect: "none"
      },
      children: o.map((p, u) => /* @__PURE__ */ k("div", { children: [
        u > 0 && /* @__PURE__ */ h(
          "div",
          {
            style: {
              height: 1,
              background: "#333",
              margin: "4px 0"
            }
          }
        ),
        p.items.map((f, m) => /* @__PURE__ */ k(
          "div",
          {
            onClick: () => s(f),
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 16px",
              cursor: f.disabled ? "default" : "pointer",
              opacity: f.disabled ? 0.4 : 1,
              color: f.danger ? "#f87171" : "#e0e0e0",
              transition: "background 0.1s"
            },
            onMouseEnter: (y) => {
              f.disabled || (y.currentTarget.style.background = "rgba(255,255,255,0.08)");
            },
            onMouseLeave: (y) => {
              y.currentTarget.style.background = "transparent";
            },
            children: [
              /* @__PURE__ */ k("span", { children: [
                f.checked !== void 0 && /* @__PURE__ */ h("span", { style: { display: "inline-block", width: 16, marginRight: 4 }, children: f.checked ? "✓" : "" }),
                f.label
              ] }),
              f.shortcut && /* @__PURE__ */ h(
                "span",
                {
                  style: {
                    marginLeft: 32,
                    fontSize: 12,
                    color: "#888"
                  },
                  children: d(f.shortcut)
                }
              )
            ]
          },
          m
        ))
      ] }, u))
    }
  );
}
const Xa = "sbd-clipboard", Qh = "sbd-nodes:";
function Ga(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let r = "";
  for (let n = 0; n < o.length; n++) r += String.fromCharCode(o[n]);
  return btoa(r);
}
function vi(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) o[n] = e.charCodeAt(n);
    const r = new TextDecoder().decode(o);
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function Ya(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return vi(e[1]);
  const o = t.match(
    new RegExp(`<!--${Qh}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? vi(o[1]) : null;
}
function Lr(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function ja(t) {
  return t.map((e) => {
    var n;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), r = (n = e.children) != null && n.length ? `
` + ja(e.children) : "";
    return o + r;
  }).filter(Boolean).join(`
`);
}
function Jh(t) {
  var o;
  const e = [];
  for (const r of t)
    switch (r.type) {
      case "content": {
        const n = r.data;
        (o = n.blocks) != null && o.length ? e.push(ja(n.blocks)) : n.markdown && e.push(n.markdown);
        break;
      }
      case "image": {
        const n = r.data;
        n.src.startsWith("http") ? e.push(n.src) : e.push(n.alt || "[Image]");
        break;
      }
      case "shape": {
        const n = r.data;
        n.label && e.push(n.label);
        break;
      }
      case "text": {
        const n = r.data;
        n.text && e.push(n.text);
        break;
      }
      case "sticky": {
        const n = r.data;
        n.text && e.push(n.text);
        break;
      }
      case "draw":
        break;
      case "edge": {
        const n = r.data;
        n.label && e.push(n.label);
        break;
      }
    }
  return e.join(`

`);
}
function Si(t, e) {
  const o = Jh(e), r = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), n = Ga(e);
  return t.setData(
    "text/html",
    `<!--${Xa}--><div data-sbd-nodes="${n}">${r || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function $h(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, r = o.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, i = null;
  const a = (y) => {
    n = y.clientX, s = y.clientY;
  }, l = (y) => {
    Lr(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = Si(
      y.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (y) => {
    Lr(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = Si(
      y.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, d = async (y) => {
    var B, E, X;
    if (Lr(y.target)) return;
    const { x: g, y: x } = t.screenToCanvas(n, s), b = ((B = y.clipboardData) == null ? void 0 : B.getData("text/html")) || "", v = ((E = y.clipboardData) == null ? void 0 : E.getData("text/plain")) || "";
    if (b.includes(Xa) || b.includes("data-sbd-nodes=") || i !== null && v === i) {
      if (i !== null && v === i && t.hasClipboard()) {
        y.preventDefault(), t.pasteClipboard(g, x);
        return;
      }
      const Y = Ya(b);
      if (Y) {
        y.preventDefault(), t.setClipboard(Y), t.pasteClipboard(g, x);
        return;
      }
    }
    const C = (X = y.clipboardData) == null ? void 0 : X.items;
    if (C) {
      for (const nt of Array.from(C))
        if (nt.type.startsWith("image/")) {
          y.preventDefault();
          const Y = nt.getAsFile();
          if (!Y) continue;
          const ot = new FileReader();
          ot.onload = () => {
            const J = ot.result, lt = new Image();
            lt.onload = () => {
              const H = t.screenToCanvas(n, s), O = 400, _ = 300, K = lt.naturalWidth / lt.naturalHeight, q = Math.min(lt.naturalWidth, O), G = Math.min(lt.naturalHeight, _), V = K >= 1 ? q : G * K, tt = K >= 1 ? q / K : G;
              let Z = J;
              if (b) {
                const dt = b.match(/<img[^>]+src=["']([^"']+)["']/i);
                dt && /\.(gif|webp|apng)(\?|#|$)/i.test(dt[1]) && (Z = dt[1].replace(/&amp;/g, "&"));
              }
              const st = {
                id: zt(10),
                type: "image",
                x: H.x,
                y: H.y,
                w: V,
                h: tt,
                z: t.nextZ(),
                data: { src: Z }
              };
              t.addNode(st), t.select(st.id);
            }, lt.src = J;
          }, ot.readAsDataURL(Y);
          return;
        }
    }
    const P = Jn(v) ?? Jn(b);
    if (P) {
      y.preventDefault();
      const nt = t.screenToCanvas(n, s), Y = await Oa(
        P,
        nt.x,
        nt.y,
        t.nextZ()
      );
      Y && (t.addNode(Y), t.select(Y.id));
      return;
    }
    if (th(v)) {
      const nt = _d(v);
      if (nt) {
        y.preventDefault();
        const Y = {
          id: zt(10),
          type: "youtube",
          x: g,
          y: x,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: nt, url: v.trim() }
        };
        t.addNode(Y), t.select(Y.id);
        return;
      }
    }
    const F = b.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (F)
      try {
        const nt = $i(F);
        if (nt.length > 0) {
          y.preventDefault();
          const Y = {
            id: zt(10),
            type: "content",
            x: g,
            y: x,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: nt, markdown: v, borderColor: "#1e1e2e" }
          };
          t.addNode(Y), t.select(Y.id);
          return;
        }
      } catch {
      }
    if (v.trim()) {
      y.preventDefault();
      const nt = await ss(v), Y = {
        id: zt(10),
        type: "content",
        x: g,
        y: x,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: nt, markdown: v, borderColor: "#1e1e2e" }
      };
      t.addNode(Y), t.select(Y.id);
      return;
    }
    t.hasClipboard() && (y.preventDefault(), t.pasteClipboard(g, x));
  }, p = (y) => {
    const g = y.target;
    if (Lr(g)) return;
    if (t.presentationMode) {
      if (y.key === "ArrowRight" || y.key === " ") {
        y.preventDefault(), t.presentationNext();
        return;
      }
      if (y.key === "ArrowLeft") {
        y.preventDefault(), t.presentationPrev();
        return;
      }
      if (y.key === "Escape") {
        y.preventDefault(), t.exitPresentation();
        return;
      }
      return;
    }
    const x = y.ctrlKey || y.metaKey;
    if (x && y.key === "c") {
      t.copySelected();
      return;
    }
    if (x && y.key === "x") {
      t.copySelected();
      return;
    }
    if (x && y.key.toLowerCase() === "f") {
      y.preventDefault(), o.dispatchEvent(new CustomEvent("sb:search-open"));
      return;
    }
    if (x && y.key === "d") {
      y.preventDefault(), t.duplicateSelected();
      return;
    }
    if (x && y.key === "g") {
      y.preventDefault(), y.shiftKey ? t.ungroupSelected() : t.groupSelected();
      return;
    }
    if (y.shiftKey && !x && y.key === "H") {
      y.preventDefault(), t.flipSelectedHorizontal();
      return;
    }
    if (y.shiftKey && !x && y.key === "V") {
      y.preventDefault(), t.flipSelectedVertical();
      return;
    }
    if (x && y.key === "]") {
      y.preventDefault();
      const b = Array.from(t.selection);
      y.altKey ? t.bringToFront(b) : t.bringForward(b);
      return;
    }
    if (x && y.key === "[") {
      y.preventDefault();
      const b = Array.from(t.selection);
      y.altKey ? t.sendToBack(b) : t.sendBackward(b);
      return;
    }
    if (!x && !y.altKey && !y.shiftKey) {
      if (y.key === "s") {
        t.setMode("select");
        return;
      }
      if (y.key === "p") {
        t.setMode("hand");
        return;
      }
      if (y.key === "d") {
        t.setMode("draw");
        return;
      }
      if (y.key === "g") {
        t.setMode("shape");
        return;
      }
      if (y.key === "t") {
        t.setMode("text");
        return;
      }
      if (y.key === "b") {
        t.setMode("note");
        return;
      }
      if (y.key === "y") {
        t.setMode("sticky");
        return;
      }
      if (y.key === "f") {
        t.setMode("frame");
        return;
      }
      if (y.key === "e") {
        t.setMode("erase");
        return;
      }
      if (y.key === "l") {
        t.toggleLassoSelect();
        return;
      }
      if (y.key === "z") {
        t.setMode("laser");
        return;
      }
    }
    if (y.key === "Delete" || y.key === "Backspace") {
      t.deleteSelected();
      return;
    }
    if (x && y.key === "z") {
      y.preventDefault(), y.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (x && y.key === "a") {
      y.preventDefault(), t.selectMultiple(t.getAllNodes().map((b) => b.id));
      return;
    }
    if (y.key === "Escape") {
      if (t.activeGroupId) {
        t.exitGroup();
        return;
      }
      t.deselectAll(), t.setMode("select");
      return;
    }
    if (x && (y.key === "=" || y.key === "+")) {
      y.preventDefault(), t.zoomIn();
      return;
    }
    if (x && y.key === "-") {
      y.preventDefault(), t.zoomOut();
      return;
    }
    if (x && y.key === "0") {
      y.preventDefault(), t.fitToContent();
      return;
    }
  };
  function u(y, g) {
    y.addEventListener("pointermove", a), y.addEventListener("copy", l), y.addEventListener("cut", c), y.addEventListener("paste", d), g.addEventListener("keydown", p);
  }
  function f(y, g) {
    y.removeEventListener("pointermove", a), y.removeEventListener("copy", l), y.removeEventListener("cut", c), y.removeEventListener("paste", d), g.removeEventListener("keydown", p);
  }
  u(o, r);
  const m = setInterval(() => {
    if (!e) return;
    const y = e.ownerDocument;
    y !== o && (f(o, r), o = y, r = y.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, u(o, r));
  }, 500);
  return () => {
    clearInterval(m), f(o, r);
  };
}
async function Mi(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const r = t.measuredHeights, n = _h(o, r, t), s = e.padding ?? 40, i = e.background !== !1, a = e.format === "png", l = n.w + s * 2, c = n.h + s * 2, d = n.x - s, p = n.y - s, u = await Va(o, t, r, d, p, a), f = i ? xr(t.boardBackground).canvasBg : "transparent", m = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${l}" height="${c}" viewBox="0 0 ${l} ${c}">`,
    `<rect width="${l}" height="${c}" fill="${f}"/>`,
    ...u,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    Ci(new Blob([m], { type: "image/svg+xml" }), "board.svg");
  else {
    const y = e.scale ?? 4, g = await uu(m, l, c, y);
    Ci(g, "board.png");
  }
}
function _h(t, e, o) {
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const l of t) {
    if (l.type === "edge") continue;
    const c = o.resolveHeight(l);
    r = Math.min(r, l.x), n = Math.min(n, l.y), s = Math.max(s, l.x + l.w), i = Math.max(i, l.y + c);
  }
  const a = new Map(t.map((l) => [l.id, l]));
  for (const l of t) {
    if (l.type !== "edge") continue;
    const c = l, d = a.get(c.data.fromId), p = a.get(c.data.toId);
    if (!d || !p) continue;
    const u = Ge(
      d,
      p,
      c.data.edgeType,
      e,
      c.data.sourceHandle,
      c.data.targetHandle,
      c.data.midpointOffset,
      c.data.curveOffset
    );
    r = Math.min(r, u.bounds.x), n = Math.min(n, u.bounds.y), s = Math.max(s, u.bounds.x + u.bounds.w), i = Math.max(i, u.bounds.y + u.bounds.h);
  }
  return isFinite(r) ? { x: r, y: n, w: s - r, h: i - n } : { x: 0, y: 0, w: 100, h: 100 };
}
async function Va(t, e, o, r, n, s) {
  const i = new Map(t.map((c) => [c.id, c])), a = [...t].sort((c, d) => c.z - d.z), l = [];
  for (const c of a) {
    const d = c.x - r, p = c.y - n, u = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        l.push(tu(c, d, p, u));
        break;
      case "content":
        l.push(eu(c, d, p, c.w, u));
        break;
      case "draw":
        l.push(ou(c, r, n));
        break;
      case "shape":
        l.push(nu(c, d, p, c.w, u));
        break;
      case "text":
        l.push(su(c, d, p, c.w, u));
        break;
      case "sticky":
        l.push(iu(c, d, p, c.w, u));
        break;
      case "image":
        l.push(await au(c, d, p, c.w, u, s));
        break;
      case "youtube":
        l.push(await lu(c, d, p, c.w, u, s));
        break;
      case "edge": {
        const f = c, m = i.get(f.data.fromId), y = i.get(f.data.toId);
        m && y && l.push(du(f, m, y, o, r, n));
        break;
      }
    }
  }
  return l;
}
function ao(t, e, o, r, n, s, i) {
  const a = [];
  if (s) {
    const l = e + r / 2, c = o + n / 2;
    a.push(`transform="rotate(${s}, ${l}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && a.push(`opacity="${i}"`), `<g ${a.join(" ")}>${t}</g>`;
}
function tu(t, e, o, r) {
  const n = t.data, s = n.backgroundColor || "rgba(0,0,0,0.02)", i = n.borderColor || "#d1d5db", a = n.borderWidth ?? 1, l = tn(n.borderStyle, a), c = n.label ? Jo(n.label) : "";
  let d = `<rect x="${e}" y="${o}" width="${t.w}" height="${r}" rx="4" fill="${s}" stroke="${i}" stroke-width="${a}"` + (l ? ` stroke-dasharray="${l}"` : "") + "/>";
  return c && (d += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), ao(d, e, o, t.w, r, t.rotation, n.opacity);
}
function eu(t, e, o, r, n) {
  var p;
  const s = t.data, i = ((p = s.markdown) == null ? void 0 : p.trim()) || "", a = s.borderColor, l = s.borderWidth ?? 0, c = tn(s.borderStyle, l);
  let d = "";
  return a && l > 0 ? d += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white" stroke="${a}" stroke-width="${l}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : d += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white"/>`, i && (d += Ss(i, e + 12, o + 20, r - 24, 14, 1.6, "#374151", "left", "sans-serif")), ao(d, e, o, r, n, t.rotation, s.opacity);
}
function ou(t, e, o) {
  const r = t.data, n = r.points.map(
    ([a, l, c]) => [a + t.x - e, l + t.y - o, c]
  );
  if (n.length === 0) return "";
  if (r.tool === "vector")
    return ru(n, r, t);
  const s = io(r.strokeStyle);
  let i = "";
  if (r.fill) {
    const a = n.map(([l, c]) => [l, c]);
    if (a.length > 2) {
      const l = a.map((c, d) => `${d === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ") + " Z";
      i += `<path d="${l}" fill="${r.fill}" fill-opacity="0.4" stroke="none"/>`;
    }
  }
  if (s) {
    const a = n.map((c, d) => `${d === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" "), l = s.map((c) => c * Math.max(r.strokeWidth, 1)).join(" ");
    i += `<path d="${a}" fill="none" stroke="${r.color}" stroke-width="${r.strokeWidth}" stroke-dasharray="${l}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const a = ds(n, { size: r.strokeWidth });
    a && (i += `<path d="${a}" fill="${r.color}" stroke="none"/>`);
  }
  return r.opacity !== void 0 && r.opacity !== 1 ? `<g opacity="${r.opacity}">${i}</g>` : i;
}
function ru(t, e, o) {
  const r = t.map((l, c) => `${c === 0 ? "M" : "L"}${l[0].toFixed(2)},${l[1].toFixed(2)}`).join(" ") + " Z", n = io(e.strokeStyle), s = n ? ` stroke-dasharray="${n.map((l) => l * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${r}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, a = o.h === "auto" ? 0 : o.h;
  return ao(i, o.x, o.y, o.w, a, o.rotation, e.opacity);
}
function nu(t, e, o, r, n) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: io(s.strokeStyle),
    seed: t.id
  };
  let a;
  const l = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      a = qr(e, o, r, n, i, l);
      break;
    case "ellipse":
      a = ps(e + r / 2, o + n / 2, r, n, i);
      break;
    case "diamond":
      a = fs(e, o, r, n, i, l);
      break;
    case "line": {
      const d = s.startPoint ?? [0, 0], p = s.endPoint ?? [r, n];
      a = Uo(e + d[0], o + d[1], e + p[0], o + p[1], i);
      break;
    }
    case "arrow": {
      const d = s.startPoint ?? [0, 0], p = s.endPoint ?? [r, n];
      a = ys(e + d[0], o + d[1], e + p[0], o + p[1], i);
      break;
    }
    default:
      a = qr(e, o, r, n, i);
  }
  const c = a.map(
    (d) => `<path d="${d.d}" fill="${d.fill || "none"}" stroke="${d.stroke}" stroke-width="${d.strokeWidth}"` + (d.strokeDasharray ? ` stroke-dasharray="${d.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return ao(c, e, o, r, n, t.rotation, s.opacity);
}
function su(t, e, o, r, n) {
  const s = t.data, i = n || s.text.split(`
`).length * s.fontSize * 1, a = oo(s.fontFamily), l = !!s.borderColor, c = l ? 6 : 0;
  let d = "";
  if (l) {
    const u = s.borderWidth ?? 1, f = tn(s.borderStyle, u);
    d += `<rect x="${e}" y="${o}" width="${r}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${u}"` + (f ? ` stroke-dasharray="${f}"` : "") + "/>";
  }
  const p = s.align === "center" ? e + r / 2 : s.align === "right" ? e + r - c : e + c;
  return d += Ss(
    s.text,
    p,
    o + c + s.fontSize,
    r - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    a
  ), ao(d, e, o, r, i, t.rotation, s.opacity);
}
function iu(t, e, o, r, n) {
  const s = t.data, i = s.fontSize ?? 16, a = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="2" fill="${s.color}"/>` + Ss(s.text, e + 12, o + 12 + i, r - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return ao(a, e, o, r, n, t.rotation, s.opacity);
}
async function au(t, e, o, r, n, s) {
  const i = t.data;
  let a = i.src;
  if (s && a && !a.startsWith("data:"))
    try {
      a = await Ur(a);
    } catch {
    }
  const l = i.borderColor, c = i.borderWidth ?? 0, d = tn(i.borderStyle, c);
  let p = `<image href="${Jo(a)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  return l && c > 0 && (p += `<rect x="${e}" y="${o}" width="${r}" height="${n}" fill="none" stroke="${l}" stroke-width="${c}"` + (d ? ` stroke-dasharray="${d}"` : "") + "/>"), ao(p, e, o, r, n, t.rotation, i.opacity);
}
async function lu(t, e, o, r, n, s) {
  const i = t.data;
  let a = oh(i.videoId);
  if (s)
    try {
      a = await Ur(a);
    } catch {
    }
  let l = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="#1a1a1a"/><image href="${Jo(a)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + r / 2, d = o + n / 2, p = Math.min(r, n) * 0.12;
  return l += `<circle cx="${c}" cy="${d}" r="${p}" fill="rgba(0,0,0,0.6)"/><path d="${cu(c, d, p * 0.5)}" fill="white"/>`, ao(l, e, o, r, n, t.rotation, i.opacity);
}
function cu(t, e, o) {
  const r = o * 0.15, n = t - o * 0.7 + r, s = e - o, i = t + o + r, a = e, l = n, c = e + o;
  return `M${n},${s} L${i},${a} L${l},${c} Z`;
}
function du(t, e, o, r, n, s) {
  const i = t.data, a = Ge(
    e,
    o,
    i.edgeType,
    r,
    i.sourceHandle,
    i.targetHandle,
    i.midpointOffset,
    i.curveOffset
  ), l = `translate(${-n}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, d = i.strokeWidth;
  let p = `<path d="${a.path}" fill="none" stroke="${i.color}" stroke-width="${d}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const u = i.arrowHeadSize ?? Math.max(8, d * 3), f = i.arrowTailSize ?? Math.max(8, d * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      p += `<path d="${Vo(a.x2, a.y2, a.arrowAngle, u)}" fill="none" stroke="${i.color}" stroke-width="${d}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      p += `<path d="${Xr(a.x2, a.y2, a.arrowAngle, u)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const m = u / 3;
      p += `<circle cx="${a.x2}" cy="${a.y2}" r="${m}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      p += `<path d="${Vo(a.x1, a.y1, a.tailAngle, f)}" fill="none" stroke="${i.color}" stroke-width="${d}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      p += `<path d="${Xr(a.x1, a.y1, a.tailAngle, f)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const m = f / 3;
      p += `<circle cx="${a.x1}" cy="${a.y1}" r="${m}" fill="${i.color}"/>`;
    }
  }
  return i.label && (p += `<text x="${a.labelX}" y="${a.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${Jo(i.label)}</text>`), `<g transform="${l}">${p}</g>`;
}
function Ss(t, e, o, r, n, s, i, a, l) {
  if (!t) return "";
  const c = a === "center" ? "middle" : a === "right" ? "end" : "start", d = hu(t, r, n), p = n * s, u = d.map(
    (f, m) => `<tspan x="${e}" dy="${m === 0 ? 0 : p}">${Jo(f)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${n}" fill="${i}" font-family="${Jo(l)}" text-anchor="${c}">${u}</text>`;
}
function hu(t, e, o) {
  const r = o * 0.55, n = Math.max(1, Math.floor(e / r)), s = [];
  for (const i of t.split(`
`)) {
    if (!i.trim()) {
      s.push("");
      continue;
    }
    const a = i.split(/\s+/);
    let l = "";
    for (const c of a) {
      const d = l ? l + " " + c : c;
      d.length > n && l ? (s.push(l), l = c) : l = d;
    }
    l && s.push(l);
  }
  return s;
}
function tn(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function Jo(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Ur(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((r, n) => {
    const s = new FileReader();
    s.onloadend = () => r(s.result), s.onerror = n, s.readAsDataURL(o);
  });
}
function uu(t, e, o, r) {
  return new Promise((n, s) => {
    const i = new Image(), a = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), l = URL.createObjectURL(a);
    i.onload = () => {
      const c = document.createElement("canvas");
      c.width = e * r, c.height = o * r;
      const d = c.getContext("2d");
      d.scale(r, r), d.drawImage(i, 0, 0, e, o), URL.revokeObjectURL(l), c.toBlob((p) => {
        p ? n(p) : s(new Error("Canvas toBlob failed"));
      }, "image/png");
    }, i.onerror = () => {
      URL.revokeObjectURL(l), s(new Error("Failed to load SVG as image"));
    }, i.src = l;
  });
}
const pu = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), Bo = /* @__PURE__ */ new Map(), fu = 12;
function yu(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const r = o.data.fontFamily;
      r && !pu.has(r) && e.add(r);
    }
  return [...e];
}
async function gu(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (Bo.has(o)) {
      e.push(Bo.get(o));
      continue;
    }
    try {
      let r;
      if (o === "Excalifont")
        r = await Ur(_i);
      else {
        const a = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!a) continue;
        r = await Ur(a[1]);
      }
      const n = `@font-face { font-family: '${o}'; src: url('${r}') format('woff2'); }`;
      if (Bo.size >= fu) {
        const s = Bo.keys().next().value;
        s !== void 0 && Bo.delete(s);
      }
      Bo.set(o, n), e.push(n);
    } catch {
    }
  }
  return e.join(`
`);
}
async function mu(t, e) {
  const o = t.getNode(e);
  if (!o || o.type !== "frame") return "";
  const r = t.resolveHeight(o), n = 0, s = o.w + n * 2, i = r + n * 2, a = o.x - n, l = o.y - n, c = [o], d = /* @__PURE__ */ new Set([e]), p = (b) => {
    d.has(b.id) || b.type === "edge" || (d.add(b.id), c.push(b));
  };
  for (const b of t.getNodesInRect({ x: o.x, y: o.y, w: o.w, h: r }))
    p(b);
  for (const b of t.getFrameChildren(e))
    p(b);
  for (const b of t.getAllNodes())
    if (b.type === "edge") {
      const v = b;
      d.has(v.data.fromId) && d.has(v.data.toId) && c.push(b);
    }
  const u = t.measuredHeights, f = await Va(c, t, u, a, l, !0), m = yu(c), y = await gu(m), g = xr(t.boardBackground).canvasBg, x = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    y ? `<defs><style>${y}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${g}"/>`,
    ...f,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(x)}`;
}
function Ci(t, e) {
  const o = URL.createObjectURL(t), r = document.createElement("a");
  r.href = o, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o);
}
const Ii = [
  { key: "iphone-se", label: "iPhone SE", w: 375, h: 667, group: "phone" },
  { key: "iphone-xr", label: "iPhone XR", w: 414, h: 896, group: "phone" },
  { key: "iphone-12-pro", label: "iPhone 12 Pro", w: 390, h: 844, group: "phone" },
  { key: "iphone-14-pro-max", label: "iPhone 14 Pro Max", w: 430, h: 932, group: "phone" },
  { key: "iphone-16-pro", label: "iPhone 16 Pro", w: 402, h: 874, group: "phone" },
  { key: "pixel-7", label: "Pixel 7", w: 412, h: 915, group: "phone" },
  { key: "galaxy-s8", label: "Galaxy S8+", w: 360, h: 740, group: "phone" },
  { key: "galaxy-s20-ultra", label: "Galaxy S20 Ultra", w: 412, h: 915, group: "phone" },
  { key: "galaxy-z-fold-5", label: "Galaxy Z Fold 5", w: 344, h: 882, group: "phone" },
  { key: "galaxy-a51", label: "Galaxy A51/71", w: 412, h: 914, group: "phone" }
], zi = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function Ti(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const qa = [
  ...Ii,
  ...Ti(Ii, "phone-landscape"),
  ...zi,
  ...Ti(zi, "tablet-landscape"),
  // Other devices (already landscape-oriented)
  { key: "nest-hub", label: "Nest Hub", w: 1024, h: 600, group: "other" },
  { key: "nest-hub-max", label: "Nest Hub Max", w: 1280, h: 800, group: "other" },
  // Standard ratios
  { key: "16-9", label: "16:9", w: 1920, h: 1080, group: "standard" },
  { key: "9-16", label: "9:16", w: 1080, h: 1920, group: "standard" },
  { key: "4-3", label: "4:3", w: 1024, h: 768, group: "standard" },
  { key: "3-4", label: "3:4", w: 768, h: 1024, group: "standard" },
  { key: "1-1", label: "1:1", w: 1e3, h: 1e3, group: "standard" },
  { key: "21-9", label: "21:9", w: 2560, h: 1080, group: "standard" }
], bu = new Map(qa.map((t) => [t.key, t]));
function $n(t) {
  return bu.get(t);
}
function Ka(t) {
  return t.w / t.h;
}
const xu = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function wu() {
  const t = /* @__PURE__ */ new Map();
  for (const e of qa) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: xu[e] ?? e,
    presets: o
  }));
}
function ku(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function Pn(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const [i, a] = o[n], [l, c] = o[s];
    a > e != c > e && t < (l - i) * (e - a) / (c - a) + i && (r = !r);
  }
  return r;
}
function An(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function vu(t, e, o) {
  try {
    const r = await navigator.clipboard.read();
    let n = null;
    for (const i of r)
      if (i.types.includes("text/html")) {
        const a = await (await i.getType("text/html")).text();
        if (a.includes("sbd-clipboard") || a.includes("data-sbd-nodes=")) {
          const l = Ya(a);
          if (l) {
            t.setClipboard(l), t.pasteClipboard(e, o);
            return;
          }
          if (t.hasClipboard()) {
            t.pasteClipboard(e, o);
            return;
          }
        }
        n = a;
      }
    for (const i of r) {
      const a = i.types.find((l) => l.startsWith("image/"));
      if (a) {
        const l = await i.getType(a), c = await new Promise((b) => {
          const v = new FileReader();
          v.onload = () => b(v.result), v.readAsDataURL(l);
        }), d = new Image();
        await new Promise((b) => {
          d.onload = () => b(), d.src = c;
        });
        const p = d.naturalWidth / d.naturalHeight, u = Math.min(d.naturalWidth, 400), f = Math.min(d.naturalHeight, 300), m = p >= 1 ? u : f * p, y = p >= 1 ? u / p : f;
        let g = c;
        if (n) {
          const b = n.match(/<img[^>]+src=["']([^"']+)["']/i);
          b && /\.(gif|webp|apng)(\?|#|$)/i.test(b[1]) && (g = b[1].replace(/&amp;/g, "&"));
        }
        const x = {
          id: zt(10),
          type: "image",
          x: e,
          y: o,
          w: m,
          h: y,
          z: t.nextZ(),
          data: { src: g }
        };
        t.addNode(x), t.select(x.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (n) {
      const i = n.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const a = $i(i);
        if (a.length > 0) {
          const l = {
            id: zt(10),
            type: "content",
            x: e,
            y: o,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: a, markdown: s || "", borderColor: "#1e1e2e" }
          };
          t.addNode(l), t.select(l.id);
          return;
        }
      } catch {
      }
    }
    if (s != null && s.trim()) {
      const i = await ss(s), a = {
        id: zt(10),
        type: "content",
        x: e,
        y: o,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: i, markdown: s, borderColor: "#1e1e2e" }
      };
      t.addNode(a), t.select(a.id);
      return;
    }
  } catch {
  }
  t.pasteClipboard(e, o);
}
async function Pi(t) {
  const e = t.getClipboardNodes();
  if (e.length === 0) return;
  const o = [];
  for (const a of e)
    if (a.type === "content") {
      const l = a.data;
      l.markdown && o.push(l.markdown);
    } else if (a.type === "text") {
      const l = a.data;
      l.text && o.push(l.text);
    } else if (a.type === "image") {
      const l = a.data;
      o.push(l.src.startsWith("http") ? l.src : l.alt || "[Image]");
    } else if (a.type === "shape") {
      const l = a.data;
      l.label && o.push(l.label);
    } else if (a.type === "sticky") {
      const l = a.data;
      l.text && o.push(l.text);
    } else if (a.type === "edge") {
      const l = a.data;
      l.label && o.push(l.label);
    }
  const r = o.join(`

`), n = r.split(`
`).filter(Boolean).map((a) => `<p>${a}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${Ga(e)}">${n || "<p></p>"}</div>`;
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([r], { type: "text/plain" }),
        "text/html": new Blob([i], { type: "text/html" })
      })
    ]);
  } catch {
    try {
      await navigator.clipboard.writeText(r);
    } catch {
    }
  }
}
function Dr(t) {
  switch (t) {
    case "select":
      return "default";
    case "text":
      return "text";
    case "note":
      return "text";
    case "sticky":
      return "crosshair";
    case "draw":
      return "crosshair";
    case "shape":
      return "crosshair";
    case "edge":
      return "crosshair";
    case "frame":
      return "crosshair";
    case "erase":
      return `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><circle cx='10' cy='10' r='9' fill='none' stroke='%239ca3af' stroke-width='1.5'/></svg>") ${20 / 2} ${20 / 2}, crosshair`;
    case "laser":
      return `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16'><circle cx='8' cy='8' r='3' fill='%23ef4444'/><circle cx='8' cy='8' r='7' fill='none' stroke='%23ef4444' stroke-width='1' opacity='0.4'/></svg>") ${16 / 2} ${16 / 2}, crosshair`;
    case "hand":
      return "grab";
    default:
      return "default";
  }
}
function Ai(t, e) {
  const o = e.x - t.x, r = e.y - t.y;
  return { dist: Math.sqrt(o * o + r * r), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const Fo = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function Su({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: r,
  observeElement: n,
  unobserveElement: s,
  isContainer: i,
  children: a
}) {
  const l = ct(null);
  bt(() => {
    if (t.h !== "auto") return;
    const p = l.current;
    if (!p) return;
    const u = p.offsetHeight;
    return u > 0 && r(t.id, u), n(p, () => {
      const f = p.offsetHeight;
      f > 0 && r(t.id, f);
    }), () => s(p);
  }, [t.id, t.h, r, n, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, d = Kt(() => ({
    position: "absolute",
    left: t.x,
    top: t.y,
    width: t.w,
    height: c,
    zIndex: t.z,
    pointerEvents: i ? "none" : e ? "auto" : "none",
    transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0,
    transformOrigin: "center center"
  }), [t.x, t.y, t.w, c, t.z, t.rotation, i, e]);
  return /* @__PURE__ */ h(
    "div",
    {
      ref: l,
      "data-node-id": t.id,
      className: e ? void 0 : "sb-block-inert",
      style: d,
      children: a
    }
  );
}
function Mu({
  node: t,
  engine: e,
  onDone: o
}) {
  const r = ct(null), n = ct(t.data.label ?? ""), s = ct(t);
  s.current = t;
  const i = ct(t.data.label ?? "");
  bt(() => () => {
    const d = s.current, p = n.current.trim();
    if (p !== i.current) {
      const f = { data: { ...d.data, label: p || void 0 } }, m = r.current;
      if (m && p) {
        const g = d.h === "auto" ? 100 : d.h, x = m.scrollHeight + 24;
        x > g && (f.h = x);
      }
      e.updateNodeWithHistory(d.id, f);
    }
  }, []);
  const a = t.h === "auto" ? 100 : t.h, l = t.data.labelFontSize ?? 14, c = t.data.fill && t.data.fillStyle === "solid" ? ku(t.data.fill) : t.data.stroke;
  return /* @__PURE__ */ h(
    "div",
    {
      "data-node-id": t.id,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: a,
        zIndex: 999998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
        padding: "8px 12px",
        boxSizing: "border-box"
      },
      children: /* @__PURE__ */ h(
        "textarea",
        {
          ref: r,
          autoFocus: !0,
          defaultValue: t.data.label ?? "",
          placeholder: "",
          rows: 1,
          onBlur: () => o(),
          onKeyDown: (d) => {
            d.key === "Escape" && d.currentTarget.blur(), d.stopPropagation();
          },
          onInput: (d) => {
            const p = d.currentTarget;
            n.current = p.value;
            const u = s.current;
            e.updateNode(u.id, {
              data: { ...u.data, label: p.value || void 0 }
            }), p.style.height = "auto", p.style.height = p.scrollHeight + "px";
            const m = p.scrollHeight + 24;
            m > a && e.updateNode(t.id, { h: m });
          },
          onPointerDown: (d) => d.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: l,
            fontFamily: oo(t.data.labelFontFamily ?? eo),
            color: c,
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            overflow: "hidden",
            width: "100%",
            padding: 0,
            margin: 0,
            lineHeight: 1.3,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap"
          }
        }
      )
    }
  );
}
function Cu({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: r
}) {
  var js;
  const { labels: n } = jt(), s = ct(null), i = () => {
    var w;
    return ((w = s.current) == null ? void 0 : w.ownerDocument) ?? document;
  }, [a, l] = $({ w: 0, h: 0 }), [c, d] = $({ ...t.viewport }), [p, u] = $(t.getAllNodes()), [f, m] = $(
    new Set(t.selection)
  ), [y, g] = $(!1), [x, b] = $(t.mode), [v, M] = $(t.activeGroupId), [C, P] = $(() => t.getSearchState()), [F, B] = $([]), [E, X] = $(t.snapToGrid), [nt, Y] = $(t.gridSize), [ot, J] = $(t.smartGuides), [lt, H] = $([]), [O, _] = $(t.boardBackground), K = ct(!1), q = ct(!1), G = ct(/* @__PURE__ */ new Map()), V = ct(!1), tt = ct(!1), Z = ct(null), st = ct(null), dt = at((w) => {
    i().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: w } }));
  }, []);
  bt(() => {
    const w = (I) => {
      var N, z;
      if (I.key === " " && !I.repeat && !K.current) {
        const D = (N = I.target) == null ? void 0 : N.tagName;
        if (D === "INPUT" || D === "TEXTAREA" || (z = I.target) != null && z.isContentEditable) return;
        K.current = !0;
        const A = s.current;
        A && (A.style.cursor = "grab"), I.preventDefault();
      }
    }, T = (I) => {
      if (I.key === " ") {
        K.current = !1, q.current = !1;
        const N = s.current;
        N && (N.style.cursor = t.lassoSelect ? Fo : Dr(t.mode));
      }
    };
    return window.addEventListener("keydown", w), window.addEventListener("keyup", T), () => {
      window.removeEventListener("keydown", w), window.removeEventListener("keyup", T);
    };
  }, []), bt(() => {
    const w = (I) => {
      G.current.delete(I.pointerId), I.pointerType === "pen" && (tt.current = !1), G.current.size === 0 && dt(!1), Z.current && (clearTimeout(Z.current), Z.current = null, st.current = null);
    }, T = i();
    return T.addEventListener("pointerup", w), T.addEventListener("pointercancel", w), () => {
      T.removeEventListener("pointerup", w), T.removeEventListener("pointercancel", w);
    };
  }, [dt]);
  const [Mt, Ct] = $(null), [Pt, xt] = $(null), [ft, Et] = $(null), [St, Rt] = $(null);
  bt(() => {
    const w = s.current;
    if (!w) return;
    t.setContainer(w);
    const T = () => {
      const N = w.getBoundingClientRect();
      t.containerOffset = { x: N.left, y: N.top };
    };
    T();
    const I = new ResizeObserver((N) => {
      var A;
      const { width: z, height: D } = ((A = N[0]) == null ? void 0 : A.contentRect) ?? { width: 0, height: 0 };
      l((R) => R.w === z && R.h === D ? R : { w: z, h: D }), t.setContainerSize(z, D), T();
    });
    return I.observe(w), () => I.disconnect();
  }, [t]);
  const [ut, $t] = $({}), re = at((w, T) => {
    $t(
      (I) => I[w] === T ? I : { ...I, [w]: T }
    ), t.updateMeasuredHeight(w, T);
  }, [t]), ne = ct(null), fe = ct(/* @__PURE__ */ new Map());
  function Ne() {
    return ne.current || (ne.current = new ResizeObserver((w) => {
      var T;
      for (const I of w)
        (T = fe.current.get(I.target)) == null || T(I);
    })), ne.current;
  }
  const ve = at((w, T) => {
    fe.current.set(w, T), Ne().observe(w);
  }, []), er = at((w) => {
    var T;
    fe.current.delete(w), (T = ne.current) == null || T.unobserve(w);
  }, []);
  bt(() => () => {
    var w;
    (w = ne.current) == null || w.disconnect(), ne.current = null, fe.current.clear();
  }, []);
  const zo = Kt(() => new Set(p.map((w) => w.id)), [p]);
  bt(() => {
    $t((w) => {
      let T = !1;
      const I = {};
      for (const [N, z] of Object.entries(w))
        zo.has(N) ? I[N] = z : T = !0;
      return T ? I : w;
    });
  }, [zo]);
  const lo = at(
    (w, T, I) => {
      let N, z;
      if (o && w.data.sourcePort) {
        const D = o.get(T.type);
        D != null && D.ports && (N = fr(T, D.ports, w.data.sourcePort, c.zoom, ut) ?? void 0);
      }
      if (o && w.data.targetPort) {
        const D = o.get(I.type);
        D != null && D.ports && (z = fr(I, D.ports, w.data.targetPort, c.zoom, ut) ?? void 0);
      }
      return { sourcePortPos: N, targetPortPos: z };
    },
    [o, c.zoom, ut]
  );
  at(
    (w) => t.zoomToNode(w),
    [t, n]
  );
  const ie = at(
    (w, T) => {
      if (!w.rotation)
        return { minX: w.x, minY: w.y, maxX: w.x + w.w, maxY: w.y + T };
      const I = w.x + w.w / 2, N = w.y + T / 2, z = w.rotation * Math.PI / 180, D = Math.cos(z), A = Math.sin(z), R = [
        [w.w / 2, T / 2],
        [-w.w / 2, T / 2],
        [-w.w / 2, -T / 2],
        [w.w / 2, -T / 2]
      ];
      let W = 1 / 0, j = 1 / 0, L = -1 / 0, U = -1 / 0;
      for (const [Q, et] of R) {
        const rt = I + Q * D - et * A, pt = N + Q * A + et * D;
        W = Math.min(W, rt), j = Math.min(j, pt), L = Math.max(L, rt), U = Math.max(U, pt);
      }
      return { minX: W, minY: j, maxX: L, maxY: U };
    },
    []
  ), le = 8, To = at(
    (w, T) => T.filter((I) => {
      if (I.type === "edge") {
        const D = I.data, A = t.getNode(D.fromId), R = t.getNode(D.toId);
        if (!A || !R) return !1;
        const { x1: W, y1: j, x2: L, y2: U } = Zs(A, R, ut);
        return W >= w.x && W <= w.x + w.w && j >= w.y && j <= w.y + w.h && L >= w.x && L <= w.x + w.w && U >= w.y && U <= w.y + w.h;
      }
      const N = I.h === "auto" ? ut[I.id] ?? 100 : I.h, z = ie(I, N);
      return z.minX >= w.x && z.maxX <= w.x + w.w && z.minY >= w.y && z.maxY <= w.y + w.h;
    }),
    [ie, ut]
  ), or = at(
    (w, T) => w.length < 3 ? [] : T.filter((I) => {
      if (I.type === "edge") {
        const A = I, R = t.getNode(A.data.fromId), W = t.getNode(A.data.toId);
        if (!R || !W) return !1;
        const { x1: j, y1: L, x2: U, y2: Q } = Zs(R, W, ut);
        return Pn(j, L, w) && Pn(U, Q, w);
      }
      const N = I.h === "auto" ? ut[I.id] ?? 100 : I.h, z = I.x + I.w / 2, D = I.y + N / 2;
      return Pn(z, D, w);
    }),
    [t, ut]
  ), ee = Kt(() => {
    if (f.size < 2) return null;
    let w = 1 / 0, T = 1 / 0, I = -1 / 0, N = -1 / 0;
    for (const z of f) {
      const D = p.find((W) => W.id === z);
      if (!D || D.type === "edge") continue;
      const A = D.h === "auto" ? ut[D.id] ?? 100 : D.h, R = ie(D, A);
      w = Math.min(w, R.minX), T = Math.min(T, R.minY), I = Math.max(I, R.maxX), N = Math.max(N, R.maxY);
    }
    return w === 1 / 0 ? null : {
      x: w - le,
      y: T - le,
      w: I - w + le * 2,
      h: N - T + le * 2
    };
  }, [f, p, ut, ie]), Me = Kt(() => {
    if (!v) return null;
    const w = t.getAllGroupDescendantNodes(v);
    if (w.length === 0) return null;
    let T = 1 / 0, I = 1 / 0, N = -1 / 0, z = -1 / 0;
    for (const A of w) {
      if (A.type === "edge") continue;
      const R = A.h === "auto" ? ut[A.id] ?? 100 : A.h, W = ie(A, R);
      T = Math.min(T, W.minX), I = Math.min(I, W.minY), N = Math.max(N, W.maxX), z = Math.max(z, W.maxY);
    }
    if (T === 1 / 0) return null;
    const D = 8;
    return { x: T - D, y: I - D, w: N - T + D * 2, h: z - I + D * 2 };
  }, [v, p, ut, ie, t]), Ft = Kt(() => {
    const w = performance.now();
    if (p.filter(
      (it) => {
        if (o) {
          const wt = o.get(it.type);
          return wt && !wt.isSVGOnly;
        }
        return it.type === "content" || it.type === "draw" || it.type === "shape" || it.type === "image" || it.type === "text" || it.type === "frame" || it.type === "sticky";
      }
    ), a.w <= 0 || a.h <= 0)
      return null;
    const { zoom: T, x: I, y: N } = c, D = Math.min(500, 280 / Math.max(T, 0.1)), A = {
      x: -I / T - D,
      y: -N / T - D,
      w: a.w / T + D * 2,
      h: a.h / T + D * 2
    }, R = t.getNodesInRect(A), W = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Set(), L = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set();
    let Q = 0, et = 0, rt = 0, pt = 0, Tt = 0;
    const It = (it, wt = !1) => {
      const gt = t.getNode(it);
      if (!gt) return;
      const Ht = W.has(gt.id);
      W.set(gt.id, gt), gt.type === "edge" ? U.add(gt.id) : (Ht || j.add(gt.id), wt && L.add(gt.id));
    };
    for (const it of R) {
      const wt = L.size;
      It(it.id, !0), L.size > wt && (Q += 1);
    }
    for (const it of f)
      It(it, !0);
    const kt = St ? { x: St.cursorX, y: St.cursorY } : ft ? { x: ft.cursorX, y: ft.cursorY } : null;
    if (kt) {
      const it = 200 / Math.max(0.2, c.zoom), wt = t.getNodesInRect({
        x: kt.x - it,
        y: kt.y - it,
        w: it * 2,
        h: it * 2
      });
      for (const gt of wt)
        gt.type !== "edge" && It(gt.id, !0);
    }
    const At = Array.from(L);
    for (const it of At) {
      const wt = t.getEdgesForNode(it);
      for (const gt of wt) {
        const Ht = gt.data, Nt = U.has(gt.id);
        W.set(gt.id, gt), U.add(gt.id), Nt || (pt += 1);
        const vt = j.size;
        It(Ht.fromId, !1), j.size > vt && (et += 1);
        const Lt = j.size;
        It(Ht.toId, !1), j.size > Lt && (et += 1);
      }
    }
    if (!y)
      for (const it of p) {
        if (it.type !== "edge" || U.has(it.id)) continue;
        const wt = it.data, gt = t.getNode(wt.fromId), Ht = t.getNode(wt.toId);
        if (!gt || !Ht) continue;
        let Nt = L.has(wt.fromId) || L.has(wt.toId);
        if (!Nt) {
          const vt = Ge(
            gt,
            Ht,
            wt.edgeType || "bezier",
            ut,
            wt.sourceHandle,
            wt.targetHandle,
            wt.midpointOffset,
            wt.curveOffset
          );
          Nt = vt.bounds.x < A.x + A.w && vt.bounds.x + vt.bounds.w > A.x && vt.bounds.y < A.y + A.h && vt.bounds.y + vt.bounds.h > A.y;
        }
        if (Nt) {
          W.set(it.id, it), U.add(it.id), Tt += 1;
          const vt = j.size;
          It(gt.id, !1), j.size > vt && (rt += 1);
          const Lt = j.size;
          It(Ht.id, !1), j.size > Lt && (rt += 1);
        }
      }
    const Ot = Array.from(W.values());
    return {
      domNodes: Ot.filter((it) => {
        if (it.type === "edge" || !L.has(it.id)) return !1;
        if (o) {
          const wt = o.get(it.type);
          return !!wt && !wt.isSVGOnly;
        }
        return it.type === "content" || it.type === "draw" || it.type === "shape" || it.type === "image" || it.type === "text" || it.type === "frame" || it.type === "sticky";
      }),
      svgNodes: Ot,
      visibleNodeCount: L.size,
      visibleEdgeCount: U.size,
      seedVisibleNodes: Q,
      nodesAddedByAdjacency: et,
      nodesAddedByEdgeEndpoints: rt,
      edgesAddedByAdjacency: pt,
      edgesAddedByCrossing: Tt,
      cullingMs: performance.now() - w
    };
  }, [c, a, p, f, t, o, ut, ft, St, y]), rr = (Ft == null ? void 0 : Ft.domNodes) ?? p.filter((w) => {
    if (o) {
      const T = o.get(w.type);
      return !!T && !T.isSVGOnly;
    }
    return w.type === "content" || w.type === "draw" || w.type === "shape" || w.type === "image" || w.type === "text" || w.type === "frame" || w.type === "sticky";
  }), S = y ? (Ft == null ? void 0 : Ft.svgNodes) ?? p : p;
  bt(() => {
    if (!ue.isEnabled()) return;
    const w = p.reduce((I, N) => I + (N.type === "edge" ? 1 : 0), 0), T = p.length - w;
    ue.recordCulling((Ft == null ? void 0 : Ft.cullingMs) ?? 0), ue.setVisibilityCounts({
      visibleNodes: (Ft == null ? void 0 : Ft.visibleNodeCount) ?? T,
      totalNodes: T,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: w,
      totalEdges: w,
      virtualizationActive: !!Ft,
      seedVisibleNodes: (Ft == null ? void 0 : Ft.seedVisibleNodes) ?? T,
      nodesAddedByAdjacency: (Ft == null ? void 0 : Ft.nodesAddedByAdjacency) ?? 0,
      nodesAddedByEdgeEndpoints: (Ft == null ? void 0 : Ft.nodesAddedByEdgeEndpoints) ?? 0,
      edgesAddedByAdjacency: (Ft == null ? void 0 : Ft.edgesAddedByAdjacency) ?? 0,
      edgesAddedByCrossing: (Ft == null ? void 0 : Ft.edgesAddedByCrossing) ?? 0
    });
  }, [p, Ft]);
  const ht = ct(0);
  bt(() => {
    if (!ue.isEnabled() || !Ft) return;
    const w = performance.now();
    if (w - ht.current < 1e3) return;
    ht.current = w;
    const T = p.reduce((N, z) => N + (z.type === "edge" ? 1 : 0), 0), I = p.length - T;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: Ft.visibleNodeCount,
      totalNodes: I,
      visibleEdges: Ft.visibleEdgeCount,
      totalEdges: T,
      seedVisibleNodes: Ft.seedVisibleNodes,
      nodesAddedByAdjacency: Ft.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: Ft.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: Ft.edgesAddedByAdjacency,
      edgesAddedByCrossing: Ft.edgesAddedByCrossing,
      cullingMs: Ft.cullingMs
    });
  }, [p, Ft, c]), bt(() => {
    let w = null;
    const T = () => {
      w === null && (w = requestAnimationFrame(() => {
        w = null, u([...t.getAllNodes()]);
      }));
    };
    let I = null;
    const N = () => {
      I === null && (I = requestAnimationFrame(() => {
        I = null, d({ ...t.viewport });
      }));
    }, z = () => {
      m((Q) => {
        const et = new Set(t.selection);
        return Q.size !== et.size || [...Q].some((rt) => !et.has(rt)) ? (po((rt) => rt && !et.has(rt) ? null : rt), Ao((rt) => rt && !et.has(rt) ? null : rt), fo((rt) => rt && !et.has(rt) ? null : rt), Eo((rt) => rt && !et.has(rt) ? null : rt), Ro((rt) => rt && !et.has(rt) ? null : rt), Po(null), et) : Q;
      });
    }, D = () => {
      b(t.mode), t.mode === "text" && (ar.current = !1);
    }, A = () => _(t.boardBackground), R = () => {
      H([...t.alignGuides]), X(t.snapToGrid), Y(t.gridSize), J(t.smartGuides);
    }, W = () => P(t.getSearchState());
    t.on("change", T), t.on("viewport", N), t.on("selection", z), t.on("mode", D), t.on("background", A), t.on("guides", R), t.on("search", W);
    const j = (Q) => M(Q), L = () => M(null), U = () => {
      const Q = s.current;
      Q && (Q.style.cursor = t.lassoSelect ? Fo : Dr(t.mode));
    };
    return t.on("group:enter", j), t.on("group:exit", L), t.on("lassoToggle", U), () => {
      w !== null && cancelAnimationFrame(w), I !== null && cancelAnimationFrame(I), t.off("change", T), t.off("viewport", N), t.off("selection", z), t.off("mode", D), t.off("background", A), t.off("guides", R), t.off("search", W), t.off("group:enter", j), t.off("group:exit", L), t.off("lassoToggle", U);
    };
  }, [t]), bt(() => {
    const w = s.current;
    if (!w) return;
    const T = (I) => {
      if (!I.ctrlKey && !I.metaKey) {
        const z = I.target.closest(".sb-editor-wrap");
        if (z && z.scrollHeight > z.clientHeight) {
          const D = z.scrollTop <= 0 && I.deltaY < 0, A = z.scrollTop + z.clientHeight >= z.scrollHeight && I.deltaY > 0;
          if (!D && !A) return;
        }
      }
      I.preventDefault(), I.ctrlKey || I.metaKey ? t.zoomByWheel(I.deltaY, I.clientX, I.clientY) : t.pan(-I.deltaX, -I.deltaY);
    };
    return w.addEventListener("wheel", T, { passive: !1 }), () => w.removeEventListener("wheel", T);
  }, [t]);
  const [Qt, ae] = $(null), [Ce, co] = $(null), [Ee, He] = $(null), [ho, Po] = $(null), uo = ct({
    x: 0,
    y: 0,
    index: -1
  }), [Oe, Xe] = $(null), [$a, rn] = $(null), nr = ct(null), _a = Kt(() => {
    const w = /* @__PURE__ */ new Set();
    for (const T of p) {
      if (T.type !== "edge") continue;
      const I = T;
      I.data.animated && I.data.animatedDirection === "bop" && (w.add(I.data.fromId), w.add(I.data.toId));
    }
    return w;
  }, [p]), [nn, po] = $(null), sn = ct(null), [Es, Ao] = $(null), [Rs, fo] = $(null), [sr, Eo] = $(null), [Ls, Ro] = $(null), [tl, Ds] = $(null);
  bt(() => {
    const w = (T) => {
      Al(() => Ro(T));
    };
    return t.on("image:cropRequest", w), () => t.off("image:cropRequest", w);
  }, [t]);
  const Ws = nn || Rs || Es || sr || Ls || tl, an = ct(null), Bs = ct(null), [ln, cn] = $(/* @__PURE__ */ new Set()), yo = ct(/* @__PURE__ */ new Set()), [Fs, ir] = $([]), [vr, dn] = $(null), Re = ct([]), qe = ct(null), [Ns, Sr] = $([]), pe = ct([]), Lo = ct(null), ar = ct(!1), Hs = at(
    (w, T, I, N = "auto") => {
      const z = zt(10);
      Bs.current = z, t.addNode({
        id: z,
        type: "content",
        x: w,
        y: T,
        w: I,
        h: N,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), Mr = at(
    (w, T, I) => {
      const { x: N, y: z } = t.screenToCanvas(w, T);
      if (I) {
        const j = t.hitTestAll(N, z, ut);
        if (j.length > 0) {
          const L = uo.current, U = Math.abs(N - L.x) + Math.abs(z - L.y);
          let Q = 0;
          U < 5 && (Q = (L.index + 1) % j.length), uo.current = { x: N, y: z, index: Q }, t.select(j[Q].id);
        } else
          t.deselectAll();
      } else {
        let j = !1;
        for (const L of t.selection) {
          const U = t.getNode(L);
          if (!U) continue;
          const Q = U.h === "auto" ? 100 : U.h;
          if (N >= U.x && N <= U.x + U.w && z >= U.y && z <= U.y + Q) {
            j = !0;
            break;
          }
        }
        if (!j && t.selection.size >= 2) {
          let L = 1 / 0, U = 1 / 0, Q = -1 / 0, et = -1 / 0;
          for (const rt of t.selection) {
            const pt = t.getNode(rt);
            if (!pt || pt.type === "edge") continue;
            const Tt = pt.h === "auto" ? 100 : pt.h;
            L = Math.min(L, pt.x), U = Math.min(U, pt.y), Q = Math.max(Q, pt.x + pt.w), et = Math.max(et, pt.y + Tt);
          }
          L !== 1 / 0 && N >= L && N <= Q && z >= U && z <= et && (j = !0);
        }
        if (!j) {
          const L = t.hitTest(N, z, ut);
          L ? t.select(L.id) : t.deselectAll();
        }
      }
      const D = Array.from(t.selection), A = D.length > 0, R = [];
      if (R.push({
        items: [
          {
            label: n.actionCut,
            shortcut: "Mod+X",
            disabled: !A,
            action: () => {
              t.cutSelected(), Pi(t);
            }
          },
          {
            label: n.actionCopy,
            shortcut: "Mod+C",
            disabled: !A,
            action: () => {
              t.copySelected(), Pi(t);
            }
          },
          {
            label: n.actionPaste,
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              vu(t, N, z);
            }
          }
        ]
      }), R.push({
        items: [
          {
            label: n.actionDuplicate,
            shortcut: "Mod+D",
            disabled: !A,
            action: () => t.duplicateSelected()
          }
        ]
      }), A && R.push({
        items: [
          {
            label: n.actionAddToPersonalLibrary,
            action: () => {
              const j = D.map((Q) => t.getNode(Q)).filter((Q) => !!Q).map((Q) => structuredClone(Q)), L = new Set(
                j.map((Q) => Q.groupId).filter(Boolean)
              ), U = /* @__PURE__ */ new Map();
              for (const [Q, et] of t.groupParent)
                L.has(Q) && U.set(Q, et);
              dn({
                nodes: j,
                groupParent: U
              });
            }
          }
        ]
      }), D.length >= 2 || A && t.selectionHasGroup()) {
        const j = [];
        D.length >= 2 && j.push({
          label: n.actionGroupSelection,
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && j.push({
          label: n.actionUngroupSelection,
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), R.push({ items: j });
      }
      if (A && D.every((L) => {
        const U = t.getNode(L);
        return U && (U.type === "draw" || U.type === "shape");
      }) && R.push({
        items: [
          {
            label: n.actionFlipHorizontal,
            shortcut: "Shift+H",
            action: () => t.flipSelectedHorizontal()
          },
          {
            label: n.actionFlipVertical,
            shortcut: "Shift+V",
            action: () => t.flipSelectedVertical()
          }
        ]
      }), A && R.push({
        items: [
          {
            label: n.actionBringForward,
            shortcut: "Mod+]",
            action: () => t.bringForward(D)
          },
          {
            label: n.actionSendBackward,
            shortcut: "Mod+[",
            action: () => t.sendBackward(D)
          },
          {
            label: n.actionBringToFront,
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(D)
          },
          {
            label: n.actionSendToBack,
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(D)
          }
        ]
      }), A) {
        const j = D.some((Q) => {
          var et;
          return (et = t.getNode(Q)) == null ? void 0 : et.locked;
        }), L = D.some((Q) => {
          var et;
          return !((et = t.getNode(Q)) != null && et.locked);
        }), U = [];
        L && U.push({
          label: n.actionLock,
          action: () => {
            for (const Q of D) t.updateNode(Q, { locked: !0 });
          }
        }), j && U.push({
          label: n.actionUnlock,
          action: () => {
            for (const Q of D) t.updateNode(Q, { locked: void 0 });
          }
        }), R.push({ items: U });
      }
      A && R.push({
        items: [
          {
            label: n.actionDelete,
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const W = [10, 20, 40, 80];
      return R.push({
        items: [
          {
            label: n.actionToggleGrid,
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), X(t.snapToGrid);
            }
          },
          {
            label: n.actionSmartGuides,
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), J(t.smartGuides);
            }
          },
          ...W.map((j) => ({
            label: `${j}px`,
            checked: t.gridSize === j,
            action: () => {
              t.setGridSize(j);
            }
          }))
        ]
      }), R.push({
        items: [
          {
            label: n.actionExportAsPng,
            action: () => Mi(t, { format: "png" })
          },
          {
            label: n.actionExportAsSvg,
            action: () => Mi(t, { format: "svg" })
          }
        ]
      }), R;
    },
    [t]
  ), el = at(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const T = Mr(w.clientX, w.clientY, w.altKey);
      He({ x: w.clientX, y: w.clientY, sections: T });
    },
    [t, Mr]
  ), lr = at(
    (w, T, I) => {
      const N = zt(10);
      t.addNode({
        id: N,
        type: "text",
        x: w,
        y: T,
        w: I,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? eo,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(N), an.current = N, po(N);
    },
    [t]
  ), ol = at(
    (w) => {
      if (t.presentationMode) return;
      if (t.mode === "text" && ar.current) {
        ar.current = !1, s.current && (s.current.style.cursor = "text"), t.deselectAll();
        const { x: D, y: A } = t.screenToCanvas(w.clientX, w.clientY);
        lr(D, A, 300);
        return;
      }
      if (t.mode !== "select") return;
      const { x: T, y: I } = t.screenToCanvas(w.clientX, w.clientY), N = t.hitTestAll(T, I, ut), z = N.find((D) => !t.isContainerType(D.type)) ?? N[0] ?? null;
      if (z != null && z.groupId) {
        const D = [];
        let A = z.groupId;
        for (; A; )
          D.push(A), A = t.groupParent.get(A);
        if (!t.activeGroupId) {
          t.enterGroup(D[D.length - 1]), t.select(z.id);
          return;
        }
        const R = D.indexOf(t.activeGroupId);
        if (R > 0) {
          t.enterGroup(D[R - 1]), t.select(z.id);
          return;
        }
      }
      if (z && z.type === "text") {
        t.select(z.id), sn.current = { clientX: w.clientX, clientY: w.clientY }, po(z.id);
        return;
      }
      if (z && z.type === "sticky") {
        t.select(z.id), fo(z.id);
        return;
      }
      if (z && z.type === "frame") {
        t.select(z.id), Ao(z.id);
        return;
      }
      if (z && z.type === "shape") {
        const D = z.data, A = D.shape === "line" || D.shape === "arrow";
        t.select(z.id), A || Eo(z.id);
        return;
      }
      if (z && z.type === "draw") {
        t.select(z.id);
        return;
      }
      if (!z || z.type === "draw") {
        const A = t.getAllNodes().filter((R) => R.type === "shape").sort((R, W) => W.z - R.z).find((R) => !(R.data.shape === "line" || R.data.shape === "arrow") && Qr(R, T, I, t.viewport.zoom, !0));
        if (A) {
          t.select(A.id), Eo(A.id);
          return;
        }
      }
      z || (t.deselectAll(), lr(T, I, 300));
    },
    [t, ut, lr]
  ), rl = at(
    (w) => {
      if (G.current.set(w.pointerId, { x: w.clientX, y: w.clientY }), w.pointerType === "pen" && (tt.current = !0), w.button !== 2 && dt(!0), w.pointerType === "touch" && (G.current.size >= 2 || tt.current)) {
        V.current = !0, Z.current && (clearTimeout(Z.current), Z.current = null, st.current = null);
        const z = new Map(G.current), D = [...G.current.keys()].find((L) => L !== w.pointerId);
        D !== void 0 && i().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: D,
            bubbles: !0,
            clientX: w.clientX,
            clientY: w.clientY
          })
        );
        const A = [...z.values()];
        let R = Ai(A[0], A[1] ?? A[0]);
        const W = (L) => {
          if (!z.has(L.pointerId)) return;
          z.set(L.pointerId, { x: L.clientX, y: L.clientY });
          const U = [...z.values()];
          if (U.length < 2) return;
          const Q = Ai(U[0], U[1]);
          if (t.pan(Q.mx - R.mx, Q.my - R.my), R.dist > 1) {
            const et = Math.min(Math.max(Q.dist / R.dist, 0.9), 1.1);
            t.zoomByFactor(et, Q.mx, Q.my);
          }
          R = Q;
        }, j = (L) => {
          G.current.delete(L.pointerId), z.delete(L.pointerId), L.pointerType === "pen" && (tt.current = !1), z.size < 2 && !tt.current && (V.current = !1, i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", j), i().removeEventListener("pointercancel", j));
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", j), i().addEventListener("pointercancel", j);
        return;
      }
      if (V.current || t.presentationMode && !(w.button === 1 || w.button === 0 && K.current))
        return;
      if (Ee && He(null), w.pointerType === "touch") {
        const z = w.clientX, D = w.clientY, A = w.pointerId;
        st.current = { clientX: z, clientY: D }, Z.current = setTimeout(() => {
          if (Z.current = null, !st.current || V.current) return;
          const R = Mr(z, D, !1);
          He({ x: z, y: D, sections: R }), i().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: A,
              bubbles: !0,
              clientX: z,
              clientY: D
            })
          ), st.current = null;
        }, 500);
      }
      if (w.button === 1 || w.button === 0 && K.current) {
        w.preventDefault(), q.current = !0;
        const z = t.viewport.x, D = t.viewport.y, A = w.clientX, R = w.clientY, W = s.current;
        W && (W.style.cursor = "grabbing");
        const j = (U) => {
          t.viewport.x = z + (U.clientX - A), t.viewport.y = D + (U.clientY - R), d({ ...t.viewport });
        }, L = () => {
          q.current = !1, W && (W.style.cursor = K.current ? "grab" : t.lassoSelect ? Fo : ""), i().removeEventListener("pointermove", j), i().removeEventListener("pointerup", L);
        };
        i().addEventListener("pointermove", j), i().addEventListener("pointerup", L);
        return;
      }
      const { x: I, y: N } = t.screenToCanvas(w.clientX, w.clientY);
      if (w.pointerType === "touch" && Z.current && t.hitTest(I, N, ut) && (clearTimeout(Z.current), Z.current = null, st.current = null), t.mode === "select") {
        if (w.button !== 0) return;
        if (w.altKey) {
          const A = t.hitTestAll(I, N, ut);
          if (A.length > 0) {
            const R = uo.current, W = Math.abs(I - R.x) + Math.abs(N - R.y);
            let j = 0;
            W < 5 && (j = (R.index + 1) % A.length), uo.current = { x: I, y: N, index: j }, t.select(A[j].id);
          }
          return;
        }
        let z = !1;
        !t.lassoSelect && t.selection.size >= 2 && ee && I >= ee.x && I <= ee.x + ee.w && N >= ee.y && N <= ee.y + ee.h && (z = !0);
        let D = null;
        if (!t.lassoSelect) {
          const A = t.hitTestAll(I, N, ut);
          D = A.find((R) => t.selection.has(R.id) && !t.isContainerType(R.type)) ?? A.find((R) => !t.isContainerType(R.type)) ?? A[0] ?? null, !D && !z && (D = Ic(t.nodes, I, N, t.viewport.zoom, ut, lo));
        }
        if (D || z) {
          D && (t.activeGroupId && !t.isNodeInActiveGroup(D.id) && t.exitAllGroups(), w.shiftKey ? t.toggleSelect(D.id) : t.selection.has(D.id) || t.select(D.id));
          const A = Array.from(t.selection).filter(
            (vt) => {
              var Lt;
              return !((Lt = t.getNode(vt)) != null && Lt.locked);
            }
          );
          if (A.length === 0) return;
          const R = w.clientX, W = w.clientY, j = /* @__PURE__ */ new Set(), L = /* @__PURE__ */ new Set();
          for (const vt of A) {
            const Lt = t.getNode(vt);
            if (Lt && t.isContainerType(Lt.type)) {
              L.add(vt);
              for (const Vt of t.getFrameDescendantIds(vt))
                t.selection.has(Vt) || j.add(Vt);
            }
          }
          const U = [...A, ...j], Q = U.map((vt) => {
            const Lt = t.getNode(vt);
            return { id: vt, x: Lt.x, y: Lt.y };
          }), et = t.selectionGroupId(), rt = et ? t.groupRotations.get(et) : null, pt = rt == null ? void 0 : rt.cx, Tt = rt == null ? void 0 : rt.cy;
          Po(null);
          let It = !1, kt = null, At = R, Ot = W, Yt = !1;
          const it = new Set(U), wt = t.createDragSnapContext(it), gt = () => {
            kt = null;
            const vt = (At - R) / t.viewport.zoom, Lt = (Ot - W) / t.viewport.zoom, { finalDx: Vt, finalDy: te } = t.computeDragSnap(
              Q,
              it,
              vt,
              Lt,
              Yt,
              wt
            ), se = Q.map((ye) => ({
              id: ye.id,
              patch: { x: ye.x + Vt, y: ye.y + te }
            }));
            t.updateMany(se), rt && et && t.groupRotations.set(et, {
              angle: rt.angle,
              cx: pt + Vt,
              cy: Tt + te
            });
          }, Ht = (vt) => {
            const Lt = (vt.clientX - R) / t.viewport.zoom, Vt = (vt.clientY - W) / t.viewport.zoom;
            if (!It)
              if (Math.abs(Lt) > 2 || Math.abs(Vt) > 2)
                It = !0, t.pushHistorySnapshot(), g(!0);
              else
                return;
            At = vt.clientX, Ot = vt.clientY, Yt = vt.metaKey || vt.ctrlKey, kt === null && (kt = requestAnimationFrame(gt));
          }, Nt = () => {
            if (kt !== null && (cancelAnimationFrame(kt), gt()), g(!1), t.clearAlignGuides(), i().removeEventListener("pointermove", Ht), i().removeEventListener("pointerup", Nt), It) {
              const vt = A.filter(
                (Lt) => !j.has(Lt)
              );
              vt.length > 0 && t.updateFrameMembership(vt);
            }
          };
          i().addEventListener("pointermove", Ht), i().addEventListener("pointerup", Nt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          w.shiftKey || t.deselectAll();
          const A = new Set(t.selection);
          if (t.lassoSelect) {
            const R = [[I, N]];
            co([...R]);
            let W = null, j = 0;
            const L = (et = !1) => {
              W = null;
              const rt = et || j % 2 === 0;
              if (j++, rt && R.length >= 3) {
                const Tt = or(R, t.getAllNodes()).map((kt) => kt.id), It = w.shiftKey ? [.../* @__PURE__ */ new Set([...A, ...Tt])] : Tt;
                (It.length !== t.selection.size || It.some((kt) => !t.selection.has(kt))) && t.selectMultiple(It);
              }
              co([...R]);
            }, U = (et) => {
              const { x: rt, y: pt } = t.screenToCanvas(et.clientX, et.clientY);
              R.push([rt, pt]), W === null && (W = requestAnimationFrame(() => L(!1)));
            }, Q = () => {
              W !== null && cancelAnimationFrame(W), L(!0), i().removeEventListener("pointermove", U), i().removeEventListener("pointerup", Q), co(null), t.toggleLassoSelect();
            };
            i().addEventListener("pointermove", U), i().addEventListener("pointerup", Q);
          } else {
            const R = { startX: I, startY: N, endX: I, endY: N };
            ae(R);
            let W = null, j = 0;
            const L = (et = !1, rt = !1) => {
              W = null;
              const pt = Math.min(R.startX, R.endX), Tt = Math.min(R.startY, R.endY), It = Math.abs(R.endX - R.startX), kt = Math.abs(R.endY - R.startY), At = rt || et || j % 2 === 0;
              if (j++, At) {
                const Yt = To(
                  { x: pt, y: Tt, w: It, h: kt },
                  t.getAllNodes()
                ).map((wt) => wt.id), it = w.shiftKey ? [.../* @__PURE__ */ new Set([...A, ...Yt])] : Yt;
                (it.length !== t.selection.size || it.some((wt) => !t.selection.has(wt))) && t.selectMultiple(it);
              }
              ae({ ...R });
            }, U = (et) => {
              const { x: rt, y: pt } = t.screenToCanvas(et.clientX, et.clientY);
              R.endX = rt, R.endY = pt, W === null && (W = requestAnimationFrame(() => L(!1)));
            }, Q = () => {
              W !== null && cancelAnimationFrame(W), L(!0), i().removeEventListener("pointermove", U), i().removeEventListener("pointerup", Q), ae(null);
            };
            i().addEventListener("pointermove", U), i().addEventListener("pointerup", Q);
          }
        }
      } else if (t.mode === "text") {
        if (ar.current) return;
        t.deselectAll();
        const z = I, D = N, A = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        let R = !1;
        Xe(A);
        const W = (L) => {
          const { x: U, y: Q } = t.screenToCanvas(L.clientX, L.clientY);
          A.endX = U, A.endY = Q;
          const et = Math.abs(A.endX - A.startX), rt = Math.abs(A.endY - A.startY);
          (et > 10 || rt > 10) && (R = !0), Xe({ ...A });
        }, j = () => {
          i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", j), Xe(null);
          const L = R ? Math.max(Math.abs(A.endX - A.startX), 60) : 300, U = R ? Math.min(A.startX, A.endX) : z, Q = R ? Math.min(A.startY, A.endY) : D;
          lr(U, Q, L), ar.current = !0, s.current && (s.current.style.cursor = "crosshair");
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", j);
      } else if (t.mode === "note") {
        t.deselectAll();
        const z = I, D = N, A = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        let R = !1;
        Xe(A);
        const W = (L) => {
          const { x: U, y: Q } = t.screenToCanvas(L.clientX, L.clientY);
          A.endX = U, A.endY = Q;
          const et = Math.abs(A.endX - A.startX), rt = Math.abs(A.endY - A.startY);
          (et > 10 || rt > 10) && (R = !0), Xe({ ...A });
        }, j = () => {
          i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", j), Xe(null);
          const L = R ? Math.max(Math.abs(A.endX - A.startX), 100) : 300, U = R ? Math.max(Math.abs(A.endY - A.startY), 40) : "auto", Q = R ? Math.min(A.startX, A.endX) : z, et = R ? Math.min(A.startY, A.endY) : D;
          Hs(Q, et, L, U), t.setMode("select");
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", j);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const z = I, D = N, A = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        let R = !1;
        Xe(A);
        const W = (L) => {
          const { x: U, y: Q } = t.screenToCanvas(L.clientX, L.clientY);
          A.endX = U, A.endY = Q, Math.abs(A.endX - A.startX) > 10 && (R = !0), Xe({ ...A });
        }, j = () => {
          i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", j), Xe(null);
          const L = R ? Math.max(Math.abs(A.endX - A.startX), 100) : 200, U = R ? Math.min(A.startX, A.endX) : z, Q = R ? Math.min(A.startY, A.endY) : D, et = zt(10), rt = R ? Math.max(Math.abs(A.endY - A.startY), 100) : 150;
          t.addNode({
            id: et,
            type: "sticky",
            x: U,
            y: Q,
            w: L,
            h: rt,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(et), fo(et), t.setMode("select");
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", j);
      } else if (t.mode === "draw") {
        const z = w.pressure || 0.5, D = {
          points: [[I, N, z]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle
        };
        Ct(D), t.notifyDrawProgress(D);
        const A = (W) => {
          const { x: j, y: L } = t.screenToCanvas(W.clientX, W.clientY), U = W.pressure || 0.5;
          D.points.push([j, L, U]), Ct({ ...D, points: [...D.points] }), t.notifyDrawProgress({ ...D, points: [...D.points] });
        }, R = () => {
          if (i().removeEventListener("pointermove", A), i().removeEventListener("pointerup", R), t.notifyDrawEnd(), D.points.length < 2) {
            Ct(null);
            return;
          }
          let W = 1 / 0, j = 1 / 0, L = -1 / 0, U = -1 / 0;
          for (const [et, rt] of D.points)
            et < W && (W = et), rt < j && (j = rt), et > L && (L = et), rt > U && (U = rt);
          const Q = D.points.map(
            ([et, rt, pt]) => [et - W, rt - j, pt]
          );
          t.addNode({
            id: zt(10),
            type: "draw",
            x: W,
            y: j,
            w: L - W,
            h: U - j,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: Q,
              color: D.color,
              strokeWidth: D.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => Ct(null));
        };
        i().addEventListener("pointermove", A), i().addEventListener("pointerup", R);
      } else if (t.mode === "shape") {
        const z = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        xt(z);
        const D = {
          shapeType: t.activeTool.shapeType || "rect",
          stroke: t.activeTool.color,
          strokeWidth: t.activeTool.width
        }, A = (W) => {
          const { x: j, y: L } = t.screenToCanvas(W.clientX, W.clientY);
          z.endX = j, z.endY = L, xt({ ...z }), t.notifyShapeProgress({ ...z, ...D });
        }, R = () => {
          i().removeEventListener("pointermove", A), i().removeEventListener("pointerup", R), t.notifyShapeEnd();
          const W = t.activeTool.shapeType || "rect", j = W === "line" || W === "arrow", L = Math.min(z.startX, z.endX);
          let U = Math.min(z.startY, z.endY);
          const Q = Math.abs(z.endX - z.startX), et = Math.abs(z.endY - z.startY);
          let rt;
          if (j) {
            const It = t.activeTool.width * 2;
            rt = Math.max(et, It), et < It && (U -= (It - et) / 2);
          } else
            rt = et;
          if (Q < 5 && (j ? Q < 5 && Math.abs(z.endY - z.startY) < 5 : rt < 5)) {
            xt(null);
            return;
          }
          const pt = {};
          j && (pt.startPoint = [
            z.startX - L,
            z.startY - U
          ], pt.endPoint = [
            z.endX - L,
            z.endY - U
          ]);
          const Tt = zt(10);
          t.addNode({
            id: Tt,
            type: "shape",
            x: L,
            y: U,
            w: Q,
            h: rt,
            z: t.nextZ(),
            data: {
              shape: W,
              stroke: t.activeTool.color,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle,
              strokeWidth: t.activeTool.width,
              strokeStyle: t.activeTool.strokeStyle,
              roughness: t.activeTool.roughness ?? 1,
              opacity: t.activeTool.opacity ?? 1,
              ...pt
            }
          }), xt(null), t.setMode("select"), t.select(Tt);
        };
        i().addEventListener("pointermove", A), i().addEventListener("pointerup", R);
      } else if (t.mode === "edge") {
        const z = t.hitTest(I, N, ut);
        if (!z || z.type === "edge") return;
        Et({ fromNode: z, cursorX: I, cursorY: N });
        const D = (R) => {
          const { x: W, y: j } = t.screenToCanvas(R.clientX, R.clientY);
          Et(
            (L) => L ? { ...L, cursorX: W, cursorY: j } : null
          );
        }, A = (R) => {
          i().removeEventListener("pointermove", D), i().removeEventListener("pointerup", A), Et(null);
          const { x: W, y: j } = t.screenToCanvas(R.clientX, R.clientY);
          let L = t.hitTest(W, j, ut);
          if (!L || L.type === "edge" || t.isContainerType(L.type)) {
            const pt = 50 / t.viewport.zoom;
            let Tt = 1 / 0, It = !1, kt = null;
            for (const At of t.getAllNodes()) {
              if (At.type === "edge" || At.id === z.id) continue;
              const Ot = t.isContainerType(At.type), Yt = Ko(At, ut);
              for (const it of Yt) {
                const wt = Math.hypot(it.x - W, it.y - j);
                wt >= pt || Ot && !It && kt || (!Ot && It || wt < Tt) && (Tt = wt, It = Ot, kt = At);
              }
            }
            kt && (L = kt);
          }
          if (!L || L.type === "edge" || L.id === z.id)
            return;
          const U = Tr(z, I, N, ut), Q = Tr(L, W, j, ut);
          if (t.getAllNodes().some((pt) => pt.type !== "edge" ? !1 : An(pt.data, {
            fromId: z.id,
            toId: L.id,
            sourceHandle: U,
            targetHandle: Q
          }))) return;
          const rt = {
            id: zt(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: z.id,
              toId: L.id,
              style: "solid",
              color: t.activeTool.color,
              strokeWidth: 2,
              arrowHead: "arrow",
              arrowTail: "none",
              edgeType: "bezier",
              sourceHandle: U,
              targetHandle: Q
            }
          };
          t.addNode(rt), t.select(rt.id);
        };
        i().addEventListener("pointermove", D), i().addEventListener("pointerup", A);
      } else if (t.mode === "frame") {
        const z = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        xt(z);
        const D = (R) => {
          const { x: W, y: j } = t.screenToCanvas(R.clientX, R.clientY);
          z.endX = W, z.endY = j, xt({ ...z });
        }, A = () => {
          i().removeEventListener("pointermove", D), i().removeEventListener("pointerup", A);
          const R = Math.min(z.startX, z.endX), W = Math.min(z.startY, z.endY), j = Math.abs(z.endX - z.startX), L = Math.abs(z.endY - z.startY);
          if (j < 20 || L < 20) {
            xt(null);
            return;
          }
          const U = zt(10);
          t.addNode({
            id: U,
            type: "frame",
            x: R,
            y: W,
            w: j,
            h: L,
            z: t.nextZ(),
            data: {
              label: n.typeFrame,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(U), xt(null), t.select(U), t.setMode("select");
        };
        i().addEventListener("pointermove", D), i().addEventListener("pointerup", A);
      } else if (t.mode === "erase") {
        if (w.button !== 0) return;
        const z = (pt, Tt) => {
          const It = t.hitTestAll(pt, Tt, ut), kt = Cc(
            t.nodes,
            pt,
            Tt,
            t.viewport.zoom,
            ut,
            lo
          );
          let At = !1;
          for (const Ot of [...It, ...kt])
            yo.current.has(Ot.id) || (yo.current.add(Ot.id), At = !0);
          At && cn(new Set(yo.current));
        }, D = 400;
        yo.current = /* @__PURE__ */ new Set();
        const A = performance.now();
        Re.current = [[I, N, A]], ir([[I, N, A]]), z(I, N);
        let R = I, W = N;
        const j = () => {
          const pt = performance.now(), Tt = Re.current.length;
          Re.current = Re.current.filter(
            (It) => pt - It[2] < D
          ), Re.current.length !== Tt && ir([...Re.current]), qe.current = requestAnimationFrame(j);
        };
        qe.current = requestAnimationFrame(j);
        const L = (pt) => {
          const { x: Tt, y: It } = t.screenToCanvas(pt.clientX, pt.clientY);
          R = Tt, W = It;
          const kt = performance.now();
          Re.current.push([R, W, kt]), ir([...Re.current]), z(R, W);
        }, U = () => {
          qe.current !== null && (cancelAnimationFrame(qe.current), qe.current = null), yo.current = /* @__PURE__ */ new Set(), cn(/* @__PURE__ */ new Set()), Re.current = [], ir([]);
        }, Q = () => {
          rt();
          const pt = Array.from(yo.current);
          U(), pt.length > 0 && t.deleteNodes(pt);
        }, et = (pt) => {
          pt.key === "Escape" && (rt(), U());
        }, rt = () => {
          i().removeEventListener("pointermove", L), i().removeEventListener("pointerup", Q), i().removeEventListener("keydown", et);
        };
        i().addEventListener("pointermove", L), i().addEventListener("pointerup", Q), i().addEventListener("keydown", et);
      } else if (t.mode === "laser") {
        if (w.button !== 0) return;
        const z = 1560;
        Lo.current !== null && (cancelAnimationFrame(Lo.current), Lo.current = null);
        const D = performance.now();
        pe.current.length > 0 && pe.current.push([NaN, NaN, D]), pe.current.push([I, N, D]), Sr([...pe.current]), t.notifyLaserProgress([[I, N]]);
        let A = D;
        const R = () => {
          const L = performance.now(), U = pe.current.length;
          pe.current = pe.current.filter(
            (Q) => L - Q[2] < z
          ), (pe.current.length !== U || pe.current.length > 0) && Sr([...pe.current]), L - A >= 60 && (A = L, pe.current.length > 0 && t.notifyLaserProgress(
            pe.current.map((Q) => [Q[0], Q[1]])
          )), pe.current.length > 0 ? Lo.current = requestAnimationFrame(R) : (Lo.current = null, Sr([]), t.notifyLaserEnd());
        };
        Lo.current = requestAnimationFrame(R);
        const W = (L) => {
          const { x: U, y: Q } = t.screenToCanvas(L.clientX, L.clientY), et = performance.now();
          pe.current.push([U, Q, et]), Sr([...pe.current]), t.notifyLaserProgress(
            pe.current.map((rt) => [rt[0], rt[1]])
          );
        }, j = () => {
          i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", j);
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", j);
      } else if (t.mode === "hand") {
        if (w.button !== 0) return;
        w.preventDefault();
        const z = t.viewport.x, D = t.viewport.y, A = w.clientX, R = w.clientY, W = s.current;
        W && (W.style.cursor = "grabbing");
        const j = (U) => {
          t.viewport.x = z + (U.clientX - A), t.viewport.y = D + (U.clientY - R), d({ ...t.viewport });
        }, L = () => {
          W && (W.style.cursor = t.lassoSelect ? Fo : Dr(t.mode)), i().removeEventListener("pointermove", j), i().removeEventListener("pointerup", L);
        };
        i().addEventListener("pointermove", j), i().addEventListener("pointerup", L);
      }
    },
    [
      t,
      Hs,
      lr,
      Ee,
      Mr,
      ee,
      ut,
      ie,
      To,
      dt
    ]
  ), hn = at(
    (w, T, I) => {
      if (I.preventDefault(), t.presentationMode) return;
      const N = t.getNode(w);
      if (!N || N.locked) return;
      const z = I.clientX, D = I.clientY, A = N.x, R = N.y, W = N.w, j = N.h === "auto", L = j ? ut[w] ?? 100 : N.h, U = N.type === "draw" ? N.data.points.map(
        (It) => [...It]
      ) : null, Q = N.type === "shape" ? N.data.startPoint : void 0, et = N.type === "shape" ? N.data.endPoint : void 0, rt = N.type === "text" ? N.data.fontSize : 0;
      t.pushHistorySnapshot();
      const pt = (It) => {
        const kt = (It.clientX - z) / t.viewport.zoom, At = (It.clientY - D) / t.viewport.zoom;
        let Ot = A, Yt = R, it = W, wt = L;
        if ((T === "nw" || T === "w" || T === "sw") && (Ot = A + kt, it = W - kt), (T === "ne" || T === "e" || T === "se") && (it = W + kt), (T === "nw" || T === "n" || T === "ne") && (Yt = R + At, wt = L - At), (T === "sw" || T === "s" || T === "se") && (wt = L + At), t.snapToGrid && !(It.metaKey || It.ctrlKey)) {
          const Nt = t.gridSize, vt = (Lt) => Math.round(Lt / Nt) * Nt;
          (T === "nw" || T === "w" || T === "sw") && (Ot = vt(Ot), it = A + W - Ot), (T === "ne" || T === "e" || T === "se") && (it = vt(Ot + it) - Ot), (T === "nw" || T === "n" || T === "ne") && (Yt = vt(Yt), wt = R + L - Yt), (T === "sw" || T === "s" || T === "se") && (wt = vt(Yt + wt) - Yt);
        }
        const gt = 10;
        if (it < gt && (it = gt, (T === "nw" || T === "w" || T === "sw") && (Ot = A + W - gt)), wt < gt && (wt = gt, (T === "nw" || T === "n" || T === "ne") && (Yt = R + L - gt)), N.type === "frame") {
          const Nt = N.data.devicePreset;
          if (Nt) {
            const vt = $n(Nt);
            if (vt) {
              const Lt = Ka(vt);
              if (T === "nw" || T === "ne" || T === "sw" || T === "se" || (T === "e" || T === "w")) {
                const se = Math.round(it / Lt);
                (T === "nw" || T === "ne") && (Yt = R + L - se), wt = se;
              } else
                it = Math.round(wt * Lt);
            }
          }
        }
        const Ht = {
          x: Ot,
          y: Yt,
          w: it,
          h: j ? "auto" : wt
        };
        if (U && N.type === "draw") {
          const Nt = W > 0 ? it / W : 1, vt = L > 0 ? wt / L : 1, Lt = U.map(
            ([Vt, te, se]) => [Vt * Nt, te * vt, se]
          );
          Ht.data = { ...N.data, points: Lt };
        }
        if (N.type === "shape" && (Q || et)) {
          const Nt = W > 0 ? it / W : 1, vt = L > 0 ? wt / L : 1, Lt = { ...N.data };
          Q && (Lt.startPoint = [
            Q[0] * Nt,
            Q[1] * vt
          ]), et && (Lt.endPoint = [
            et[0] * Nt,
            et[1] * vt
          ]), Ht.data = Lt;
        }
        if (N.type === "text" && rt > 0 && T !== "e" && T !== "w") {
          const Nt = T === "n" || T === "s" ? L > 0 ? wt / L : 1 : W > 0 ? it / W : 1, vt = Math.max(8, Math.round(rt * Nt));
          Ht.data = { ...N.data, fontSize: vt };
        }
        t.updateNode(w, Ht);
      }, Tt = () => {
        i().removeEventListener("pointermove", pt), i().removeEventListener("pointerup", Tt), t.isContainerType(N.type) && t.syncFrameChildrenAfterResize(w);
      };
      i().addEventListener("pointermove", pt), i().addEventListener("pointerup", Tt);
    },
    [t, ut]
  ), nl = at(
    (w, T) => {
      T.stopPropagation(), T.preventDefault();
      const I = t.getNode(w);
      if (!I || I.locked) return;
      const N = I.h === "auto" ? ut[w] ?? 100 : I.h, z = I.x + I.w / 2, D = I.y + N / 2, A = I.rotation || 0, { x: R, y: W } = t.screenToCanvas(
        T.clientX,
        T.clientY
      ), j = Math.atan2(W - D, R - z);
      t.pushHistorySnapshot();
      const L = (Q) => {
        const { x: et, y: rt } = t.screenToCanvas(Q.clientX, Q.clientY), pt = Math.atan2(rt - D, et - z);
        let Tt = A + (pt - j) * (180 / Math.PI);
        (Q.shiftKey || t.snapToGrid) && !(Q.metaKey || Q.ctrlKey) && (Tt = Math.round(Tt / 15) * 15), t.updateNode(w, { rotation: Tt });
      }, U = () => {
        i().removeEventListener("pointermove", L), i().removeEventListener("pointerup", U);
      };
      i().addEventListener("pointermove", L), i().addEventListener("pointerup", U);
    },
    [t, ut]
  ), Os = at(
    (w, T, I) => {
      I.stopPropagation(), I.preventDefault();
      const N = t.getNode(w);
      if (!N) return;
      const { x: z, y: D } = t.screenToCanvas(I.clientX, I.clientY);
      Et({ fromNode: N, cursorX: z, cursorY: D, sourceHandle: T });
      const A = (W) => {
        const { x: j, y: L } = t.screenToCanvas(W.clientX, W.clientY);
        Et(
          (U) => U ? { ...U, cursorX: j, cursorY: L } : null
        );
      }, R = (W) => {
        i().removeEventListener("pointermove", A), i().removeEventListener("pointerup", R), Et(null);
        const { x: j, y: L } = t.screenToCanvas(W.clientX, W.clientY);
        let U = t.hitTest(j, L, ut);
        if (!U || U.type === "edge" || t.isContainerType(U.type)) {
          const pt = 50 / t.viewport.zoom;
          let Tt = 1 / 0, It = !1, kt = null;
          for (const At of t.getAllNodes()) {
            if (At.type === "edge" || At.id === N.id) continue;
            const Ot = t.isContainerType(At.type), Yt = Ko(At, ut);
            for (const it of Yt) {
              const wt = Math.hypot(it.x - j, it.y - L);
              wt >= pt || Ot && !It && kt || (!Ot && It || wt < Tt) && (Tt = wt, It = Ot, kt = At);
            }
          }
          kt && (U = kt);
        }
        if (!U || U.type === "edge" || U.id === N.id)
          return;
        const Q = Tr(U, j, L, ut);
        if (t.getAllNodes().some((pt) => pt.type !== "edge" ? !1 : An(pt.data, {
          fromId: N.id,
          toId: U.id,
          sourceHandle: T,
          targetHandle: Q
        }))) return;
        const rt = {
          id: zt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: N.id,
            toId: U.id,
            style: "solid",
            color: t.activeTool.color,
            strokeWidth: 2,
            arrowHead: "arrow",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: T,
            targetHandle: Q
          }
        };
        t.addNode(rt), t.select(rt.id);
      };
      i().addEventListener("pointermove", A), i().addEventListener("pointerup", R);
    },
    [t, ut]
  ), sl = at(
    (w) => {
      let T = null, I = w === "top" || w === "left" ? 1 / 0 : -1 / 0;
      for (const N of t.selection) {
        const z = t.getNode(N);
        if (!z || z.type === "edge") continue;
        const D = z.h === "auto" ? ut[z.id] ?? 100 : z.h;
        let A;
        switch (w) {
          case "top":
            A = z.y;
            break;
          case "bottom":
            A = z.y + D;
            break;
          case "left":
            A = z.x;
            break;
          case "right":
            A = z.x + z.w;
            break;
        }
        (w === "top" || w === "left" ? A < I : A > I) && (I = A, T = N);
      }
      return T;
    },
    [t, ut]
  ), il = at(
    (w, T, I, N) => {
      var Q;
      N.stopPropagation(), N.preventDefault();
      const z = t.getNode(w);
      if (!z || !o) return;
      const D = o.get(z.type), A = (Q = D == null ? void 0 : D.ports) == null ? void 0 : Q.find((et) => et.id === T);
      if (!A) return;
      const R = I === "input" ? "left" : "right", { x: W, y: j } = t.screenToCanvas(N.clientX, N.clientY);
      Et({
        fromNode: z,
        cursorX: W,
        cursorY: j,
        sourceHandle: R,
        sourcePort: T,
        sourceDirection: I
      });
      const L = (et) => {
        const { x: rt, y: pt } = t.screenToCanvas(et.clientX, et.clientY);
        Et(
          (Tt) => Tt ? { ...Tt, cursorX: rt, cursorY: pt } : null
        );
      }, U = (et) => {
        var ye;
        i().removeEventListener("pointermove", L), i().removeEventListener("pointerup", U), Et(null);
        const { x: rt, y: pt } = t.screenToCanvas(et.clientX, et.clientY), Tt = I === "output" ? "input" : "output", It = 40 / t.viewport.zoom;
        let kt = null, At = null, Ot = 1 / 0;
        for (const oe of t.getAllNodes()) {
          if (oe.type === "edge" || oe.id === z.id) continue;
          const de = o.get(oe.type);
          if (!((ye = de == null ? void 0 : de.ports) != null && ye.length)) continue;
          const Le = oe.h === "auto" ? t.measuredHeights[oe.id] ?? 100 : oe.h;
          for (const Ie of de.ports) {
            if (Ie.direction !== Tt || A.dataType !== "any" && Ie.dataType !== "any" && A.dataType !== Ie.dataType) continue;
            const Do = de.ports.filter((bl) => bl.direction === Ie.direction), fn = Do.indexOf(Ie), Cr = 14 / t.viewport.zoom, gl = oe.y + Le / (Do.length + 1) * (fn + 1), ml = Ie.direction === "input" ? oe.x - Cr : oe.x + oe.w + Cr, yn = Math.hypot(ml - rt, gl - pt);
            yn < It && yn < Ot && (Ot = yn, kt = oe, At = Ie);
          }
        }
        if (!kt || !At) return;
        const Yt = At.id, it = I === "output" ? kt.id : z.id, wt = I === "output" ? Yt : T;
        if (t.getAllNodes().some((oe) => {
          if (oe.type !== "edge") return !1;
          const de = oe.data;
          return de.toId === it && de.targetPort === wt;
        })) return;
        const Ht = I === "output" ? z.id : kt.id, Nt = I === "output" ? kt.id : z.id, vt = I === "output" ? T : Yt, Lt = I === "output" ? Yt : T, se = {
          id: zt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Ht,
            toId: Nt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: vt,
            targetPort: Lt
          }
        };
        t.addNode(se), t.select(se.id);
      };
      i().addEventListener("pointermove", L), i().addEventListener("pointerup", U);
    },
    [t, o, ut]
  ), [Xs, al] = $(0);
  bt(() => {
    if (r)
      return r.onChange(() => al((w) => w + 1));
  }, [r]);
  const ll = at(
    (w, T, I, N, z) => {
      z.stopPropagation(), z.preventDefault();
      const D = t.getNode(w);
      if (!D || D.type !== "edge") return;
      t.pushHistorySnapshot();
      const A = (W) => {
        const j = t.screenToCanvas(W.clientX, W.clientY), L = t.getNode(w);
        if (!L) return;
        const U = t.getNode(L.data.fromId), Q = t.getNode(L.data.toId);
        if (!(!U || !Q))
          if (T === "xy") {
            const et = Ge(
              U,
              Q,
              L.data.edgeType || "bezier",
              ut,
              L.data.sourceHandle,
              L.data.targetHandle,
              void 0,
              void 0
              // no offsets → natural midpoint
            );
            if (!et.kinkHandle) return;
            const rt = j.x - et.kinkHandle.x, pt = j.y - et.kinkHandle.y;
            t.updateNode(w, {
              data: { ...L.data, curveOffset: [rt, pt] }
            });
          } else {
            const et = T === "x" ? j.x : j.y, rt = Ge(
              U,
              Q,
              L.data.edgeType || "bezier",
              ut,
              L.data.sourceHandle,
              L.data.targetHandle,
              0.5
              // default to get range
            );
            if (!rt.kinkHandle) return;
            const pt = rt.kinkHandle.min, Tt = rt.kinkHandle.max, It = Tt - pt;
            if (It === 0) return;
            const At = (Math.max(pt, Math.min(Tt, et)) - pt) / It;
            t.updateNode(w, {
              data: { ...L.data, midpointOffset: At }
            });
          }
      }, R = () => {
        i().removeEventListener("pointermove", A), i().removeEventListener("pointerup", R);
      };
      i().addEventListener("pointermove", A), i().addEventListener("pointerup", R);
    },
    [t, ut]
  ), cl = at(
    (w, T, I) => {
      I.stopPropagation(), I.preventDefault();
      const N = t.getNode(w);
      if (!N || N.type !== "edge") return;
      const { fromId: z, toId: D, sourceHandle: A, targetHandle: R } = N.data, W = T === "source" ? D : z, j = T === "source" ? R : A, L = t.getNode(z), U = t.getNode(D);
      if (!L || !U) return;
      const Q = Ge(
        L,
        U,
        N.data.edgeType || "bezier",
        ut,
        A,
        R
      ), et = T === "source" ? { x: Q.x1, y: Q.y1 } : { x: Q.x2, y: Q.y2 };
      Rt({
        edgeId: w,
        endpoint: T,
        anchorNodeId: W,
        anchorHandle: j,
        cursorX: et.x,
        cursorY: et.y
      });
      const rt = (Tt) => {
        const { x: It, y: kt } = t.screenToCanvas(Tt.clientX, Tt.clientY);
        Rt(
          (At) => At ? { ...At, cursorX: It, cursorY: kt } : null
        );
      }, pt = (Tt) => {
        i().removeEventListener("pointermove", rt), i().removeEventListener("pointerup", pt), Rt(null);
        const { x: It, y: kt } = t.screenToCanvas(Tt.clientX, Tt.clientY);
        let At = t.hitTest(It, kt, ut);
        if (!At || At.type === "edge" || t.isContainerType(At.type)) {
          const vt = 50 / t.viewport.zoom;
          let Lt = 1 / 0, Vt = !1, te = null;
          for (const se of t.getAllNodes()) {
            if (se.type === "edge") continue;
            const ye = t.isContainerType(se.type), oe = Ko(se, ut);
            for (const de of oe) {
              const Le = Math.hypot(de.x - It, de.y - kt);
              Le >= vt || ye && !Vt && te || (!ye && Vt || Le < Lt) && (Lt = Le, Vt = ye, te = se);
            }
          }
          te && (At = te);
        }
        if (!At || At.type === "edge") return;
        const Ot = T === "source" ? At.id : z, Yt = T === "target" ? At.id : D;
        if (Ot === Yt) return;
        const it = T === "source" ? z : D;
        if (At.id === it) return;
        const wt = Tr(At, It, kt, ut), gt = T === "source" ? {
          fromId: Ot,
          toId: Yt,
          sourceHandle: wt,
          targetHandle: R,
          sourcePort: N.data.sourcePort,
          targetPort: N.data.targetPort
        } : {
          fromId: Ot,
          toId: Yt,
          sourceHandle: A,
          targetHandle: wt,
          sourcePort: N.data.sourcePort,
          targetPort: N.data.targetPort
        };
        if (t.getAllNodes().some((vt) => vt.type !== "edge" || vt.id === w ? !1 : An(vt.data, gt))) return;
        const Nt = T === "source" ? { fromId: At.id, sourceHandle: wt } : { toId: At.id, targetHandle: wt };
        t.updateNodeWithHistory(w, { data: Nt });
      };
      i().addEventListener("pointermove", rt), i().addEventListener("pointerup", pt);
    },
    [t, ut]
  ), dl = at(
    (w) => {
      if (w.stopPropagation(), w.preventDefault(), t.presentationMode) return;
      const T = Array.from(t.selection).map((gt) => t.getNode(gt)).filter(Boolean);
      if (T.length < 2) return;
      const N = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, z = N ? t.groupRotations.get(N) : null;
      let D, A;
      if (z)
        D = z.cx, A = z.cy;
      else {
        let gt = 1 / 0, Ht = 1 / 0, Nt = -1 / 0, vt = -1 / 0;
        for (const Lt of T) {
          const Vt = Lt.h === "auto" ? ut[Lt.id] ?? 100 : Lt.h, te = ie(Lt, Vt);
          gt = Math.min(gt, te.minX), Ht = Math.min(Ht, te.minY), Nt = Math.max(Nt, te.maxX), vt = Math.max(vt, te.maxY);
        }
        D = (gt + Nt) / 2, A = (Ht + vt) / 2;
      }
      const R = (z == null ? void 0 : z.angle) ?? 0, j = T.filter((gt) => !gt.locked).map((gt) => {
        const Ht = gt.h === "auto" ? ut[gt.id] ?? 100 : gt.h;
        return {
          id: gt.id,
          cx: gt.x + gt.w / 2,
          cy: gt.y + Ht / 2,
          w: gt.w,
          h: Ht,
          rotation: gt.rotation || 0
        };
      }), L = -R * Math.PI / 180, U = Math.cos(L), Q = Math.sin(L);
      let et = 1 / 0, rt = 1 / 0, pt = -1 / 0, Tt = -1 / 0;
      for (const gt of j) {
        const Ht = gt.cx - D, Nt = gt.cy - A, vt = D + Ht * U - Nt * Q, Lt = A + Ht * Q + Nt * U;
        et = Math.min(et, vt - gt.w / 2), rt = Math.min(rt, Lt - gt.h / 2), pt = Math.max(pt, vt + gt.w / 2), Tt = Math.max(Tt, Lt + gt.h / 2);
      }
      const It = {
        x: et - le,
        y: rt - le,
        w: pt - et + le * 2,
        h: Tt - rt + le * 2
      }, { x: kt, y: At } = t.screenToCanvas(w.clientX, w.clientY), Ot = Math.atan2(At - A, kt - D);
      t.pushHistorySnapshot();
      let Yt = R;
      const it = (gt) => {
        const { x: Ht, y: Nt } = t.screenToCanvas(gt.clientX, gt.clientY);
        let Lt = (Math.atan2(Nt - A, Ht - D) - Ot) * (180 / Math.PI);
        (gt.shiftKey || t.snapToGrid) && !(gt.metaKey || gt.ctrlKey) && (Lt = Math.round(Lt / 15) * 15), Yt = R + Lt, Po({ angle: Yt, cx: D, cy: A, bounds: It });
        const Vt = Lt * Math.PI / 180, te = Math.cos(Vt), se = Math.sin(Vt), ye = j.map((oe) => {
          const de = oe.cx - D, Le = oe.cy - A, Ie = D + de * te - Le * se, Do = A + de * se + Le * te;
          return {
            id: oe.id,
            patch: {
              x: Ie - oe.w / 2,
              y: Do - oe.h / 2,
              rotation: Yt
            }
          };
        });
        t.updateMany(ye);
      }, wt = () => {
        N && t.groupRotations.set(N, { angle: Yt, cx: D, cy: A }), Po({ angle: Yt, cx: D, cy: A, bounds: It }), i().removeEventListener("pointermove", it), i().removeEventListener("pointerup", wt);
      };
      i().addEventListener("pointermove", it), i().addEventListener("pointerup", wt);
    },
    [t, ut, ie]
  ), hl = at(
    (w, T) => {
      if (T.stopPropagation(), T.preventDefault(), t.presentationMode) return;
      const I = Array.from(t.selection).map((it) => t.getNode(it)).filter(Boolean);
      if (I.length < 2) return;
      const N = (it) => it.h === "auto" ? ut[it.id] ?? 100 : it.h;
      let z = 1 / 0, D = 1 / 0, A = -1 / 0, R = -1 / 0;
      for (const it of I) {
        const wt = N(it), gt = ie(it, wt);
        z = Math.min(z, gt.minX), D = Math.min(D, gt.minY), A = Math.max(A, gt.maxX), R = Math.max(R, gt.maxY);
      }
      const W = { x: z, y: D, w: A - z, h: R - D }, j = W.w || 1, L = W.h || 1, Q = I.filter((it) => !it.locked).map((it) => {
        const wt = N(it);
        return {
          id: it.id,
          type: it.type,
          isAutoH: it.h === "auto",
          relX: (it.x - W.x) / j,
          relY: (it.y - W.y) / L,
          relW: it.w / j,
          relH: wt / L,
          origW: it.w,
          origH: wt,
          origPoints: it.type === "draw" ? it.data.points.map((gt) => [...gt]) : null,
          drawData: it.type === "draw" ? { ...it.data } : null
        };
      }), et = T.clientX, rt = T.clientY;
      t.pushHistorySnapshot();
      let pt = null, Tt = et, It = rt, kt = !1;
      const At = () => {
        pt = null;
        const it = (Tt - et) / t.viewport.zoom, wt = (It - rt) / t.viewport.zoom;
        let gt = W.x, Ht = W.y, Nt = W.w, vt = W.h;
        if ((w === "nw" || w === "w" || w === "sw") && (gt = W.x + it, Nt = W.w - it), (w === "ne" || w === "e" || w === "se") && (Nt = W.w + it), (w === "nw" || w === "n" || w === "ne") && (Ht = W.y + wt, vt = W.h - wt), (w === "sw" || w === "s" || w === "se") && (vt = W.h + wt), t.snapToGrid && !kt) {
          const Vt = t.gridSize, te = (se) => Math.round(se / Vt) * Vt;
          (w === "nw" || w === "w" || w === "sw") && (gt = te(gt), Nt = W.x + W.w - gt), (w === "ne" || w === "e" || w === "se") && (Nt = te(gt + Nt) - gt), (w === "nw" || w === "n" || w === "ne") && (Ht = te(Ht), vt = W.y + W.h - Ht), (w === "sw" || w === "s" || w === "se") && (vt = te(Ht + vt) - Ht);
        }
        Nt < 20 && (Nt = 20, (w === "nw" || w === "w" || w === "sw") && (gt = W.x + W.w - 20)), vt < 20 && (vt = 20, (w === "nw" || w === "n" || w === "ne") && (Ht = W.y + W.h - 20));
        const Lt = Q.map((Vt) => {
          const te = gt + Vt.relX * Nt, se = Ht + Vt.relY * vt, ye = Vt.relW * Nt, oe = Vt.relH * vt, de = {
            x: te,
            y: se,
            w: ye,
            h: Vt.isAutoH ? "auto" : oe
          };
          if (Vt.origPoints && Vt.drawData) {
            const Le = Vt.origW > 0 ? ye / Vt.origW : 1, Ie = Vt.origH > 0 ? oe / Vt.origH : 1;
            de.data = {
              ...Vt.drawData,
              points: Vt.origPoints.map(
                ([Do, fn, Cr]) => [Do * Le, fn * Ie, Cr]
              )
            };
          }
          return { id: Vt.id, patch: de };
        });
        t.updateMany(Lt);
      }, Ot = (it) => {
        Tt = it.clientX, It = it.clientY, kt = it.metaKey || it.ctrlKey, pt === null && (pt = requestAnimationFrame(At));
      }, Yt = () => {
        pt !== null && (cancelAnimationFrame(pt), At()), i().removeEventListener("pointermove", Ot), i().removeEventListener("pointerup", Yt);
        for (const it of I)
          t.isContainerType(it.type) && t.syncFrameChildrenAfterResize(it.id);
      };
      i().addEventListener("pointermove", Ot), i().addEventListener("pointerup", Yt);
    },
    [t, ut, ie]
  );
  bt(() => {
    s.current && (s.current.style.cursor = t.lassoSelect ? Fo : Dr(x)), x !== "select" && x !== "edge" && (nr.current = null, rn(null)), x !== "erase" && (qe.current !== null && (cancelAnimationFrame(qe.current), qe.current = null), yo.current = /* @__PURE__ */ new Set(), cn(/* @__PURE__ */ new Set()), Re.current = [], ir([]));
  }, [x]);
  const un = ct(null), Gs = ct(null), ul = at(
    (w) => {
      if (Z.current && w.pointerType === "touch" && st.current) {
        const T = w.clientX - st.current.clientX, I = w.clientY - st.current.clientY;
        Math.sqrt(T * T + I * I) > 8 && (clearTimeout(Z.current), Z.current = null, st.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (Gs.current = { clientX: w.clientX, clientY: w.clientY }, un.current === null && (un.current = requestAnimationFrame(() => {
        un.current = null;
        const T = s.current, I = Gs.current;
        if (!T || !I) return;
        const { x: N, y: z } = t.screenToCanvas(I.clientX, I.clientY);
        if (t.lassoSelect) {
          T.style.cursor = Fo;
          return;
        }
        if (t.mode === "edge") {
          const R = t.hitTest(N, z, ut), W = R && R.type !== "edge" ? R.id : null;
          W !== nr.current && (nr.current = W, rn(W));
          return;
        }
        if (t.selection.size >= 2 && ee && N >= ee.x && N <= ee.x + ee.w && z >= ee.y && z <= ee.y + ee.h) {
          T.style.cursor = "move";
          return;
        }
        const D = t.hitTest(N, z, ut), A = D ? D.id : null;
        if (A !== nr.current && (nr.current = A, rn(A)), D) {
          T.style.cursor = "move";
          return;
        }
        T.style.cursor = "default";
      })));
    },
    [t, ee, ut, ie]
  ), pl = at((w) => {
    (w.dataTransfer.types.includes("Files") || w.dataTransfer.types.includes(Un) || w.dataTransfer.types.includes(Zn) || w.dataTransfer.types.includes(Qn)) && (w.preventDefault(), w.dataTransfer.dropEffect = "copy");
  }, []), fl = at(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const T = w.dataTransfer.getData(Qn);
      if (T) {
        try {
          const W = JSON.parse(T);
          Ha(t, W, w.clientX, w.clientY);
        } catch (W) {
          console.error("Failed to place GIF:", W);
        }
        return;
      }
      const I = w.dataTransfer.getData(Zn);
      if (I) {
        try {
          const { itemId: W } = JSON.parse(I), L = Ra().find((U) => U.id === W);
          L && Ba(t, L, w.clientX, w.clientY);
        } catch (W) {
          console.error("Failed to place personal library item:", W);
        }
        return;
      }
      const N = w.dataTransfer.getData(Un);
      if (N) {
        try {
          const { libraryId: W, itemId: j } = JSON.parse(N), U = xs(W).find((Q) => Q.id === j);
          U && Wa(t, U, w.clientX, w.clientY);
        } catch (W) {
          console.error("Failed to place library item:", W);
        }
        return;
      }
      const z = w.dataTransfer.files[0];
      if (!z) return;
      if (z.name.endsWith(".excalidrawlib") || z.name.endsWith(".excalidrawlib.json")) {
        const W = new FileReader();
        W.onload = () => {
          try {
            const j = JSON.parse(W.result);
            if (j.type === "excalidrawlib") {
              const L = z.name.replace(/\.excalidrawlib(\.json)?$/, "");
              ws(j, { name: L });
            }
          } catch (j) {
            console.error("Failed to import library:", j);
          }
        }, W.readAsText(z);
        return;
      }
      if (z.type === "image/svg+xml" || z.name.endsWith(".svg")) {
        const W = new FileReader();
        W.onload = () => {
          const j = W.result, L = Jn(j);
          L && Vh(t, L, w.clientX, w.clientY);
        }, W.readAsText(z);
        return;
      }
      if (!z.type.startsWith("image/")) return;
      const { x: D, y: A } = t.screenToCanvas(w.clientX, w.clientY), R = new FileReader();
      R.onload = () => {
        const W = R.result, j = new Image();
        j.onload = () => {
          const L = Math.min(j.naturalWidth, 400), U = Math.min(j.naturalHeight, 300), Q = j.naturalWidth / j.naturalHeight, et = Q >= 1 ? L : U * Q, rt = Q >= 1 ? L / Q : U;
          t.addNode({
            id: zt(10),
            type: "image",
            x: D,
            y: A,
            w: et,
            h: rt,
            z: t.nextZ(),
            data: { src: W }
          });
        }, j.src = W;
      }, R.readAsDataURL(z);
    },
    [t]
  ), yl = `translate(${c.x}px, ${c.y}px) scale(${c.zoom})`, pn = C.activeIndex >= 0 ? ((js = C.matches[C.activeIndex]) == null ? void 0 : js.nodeId) ?? null : null, Ys = Kt(() => {
    if (!C.query || C.matches.length === 0) return /* @__PURE__ */ new Set();
    const w = /* @__PURE__ */ new Set();
    for (const T of C.matches)
      T.nodeType !== "edge" && w.add(T.nodeId);
    return w;
  }, [C]);
  return Zr(() => {
    const w = s.current;
    if (y || !w || !C.query || C.matches.length === 0) {
      B((A) => A.length === 0 ? A : []);
      return;
    }
    const T = w.getBoundingClientRect(), I = C.query.toLocaleLowerCase(), N = Array.from(new Set(C.matches.map((A) => A.nodeId))), z = [], D = 900;
    for (const A of N) {
      if (z.length >= D) break;
      const R = A.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), W = w.querySelector(`[data-node-id="${R}"]`);
      if (!W) continue;
      const j = document.createTreeWalker(
        W,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(U) {
            const Q = U.parentElement;
            return !Q || Q.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']") || !U.nodeValue || !U.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let L = j.nextNode();
      for (; L && z.length < D; ) {
        const U = L, et = (U.nodeValue ?? "").toLocaleLowerCase();
        let rt = 0;
        for (; rt <= et.length - I.length && z.length < D; ) {
          const pt = et.indexOf(I, rt);
          if (pt < 0) break;
          const Tt = document.createRange();
          Tt.setStart(U, pt), Tt.setEnd(U, pt + I.length);
          const It = Tt.getClientRects();
          for (const kt of It)
            kt.width <= 0 || kt.height <= 0 || z.push({
              x: kt.left - T.left,
              y: kt.top - T.top,
              w: kt.width,
              h: kt.height,
              active: A === pn
            });
          rt = pt + I.length;
        }
        L = j.nextNode();
      }
    }
    B((A) => A.length === z.length && A.every((R, W) => {
      const j = z[W];
      return R.x === j.x && R.y === j.y && R.w === j.w && R.h === j.h && R.active === j.active;
    }) ? A : z);
  }, [C, p, c, pn, y]), /* @__PURE__ */ k(
    "div",
    {
      ref: s,
      "data-sb-canvas": !0,
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        touchAction: "none",
        background: xr(O).canvasBg
      },
      onPointerDown: rl,
      onPointerMove: ul,
      onDoubleClick: ol,
      onContextMenu: el,
      onDragOver: pl,
      onDrop: fl,
      children: [
        /* @__PURE__ */ h(yh, { viewport: c, gridSize: nt, background: O, gridVisible: E }),
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              transform: yl,
              transformOrigin: "0 0",
              pointerEvents: "none"
            },
            children: [
              rr.sort((w, T) => w.z - T.z).map((w) => {
                var A;
                const T = ln.has(w.id), I = _a.has(w.id), z = -(w.id.split("").reduce((R, W) => R + W.charCodeAt(0), 0) % 240 / 100);
                let D;
                if (o) {
                  const R = o.get(w.type);
                  if (R) {
                    const W = R.component, j = f.has(w.id), L = x === "select" || x === "text" || x === "note" || x === "sticky", U = /* @__PURE__ */ h(
                      W,
                      {
                        node: w,
                        data: w.data,
                        isSelected: j,
                        multiSelected: f.size > 1 && j && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: L,
                        zoom: c.zoom,
                        editing: Ws === w.id,
                        editClickPos: Ws === w.id ? sn.current : null,
                        callbacks: {
                          onMeasuredHeight: re,
                          onResizeHandleDown: hn,
                          onEditStart: (Q) => {
                            const et = t.getNode(Q);
                            et && (et.type === "text" ? po(Q) : et.type === "sticky" ? fo(Q) : et.type === "frame" ? Ao(Q) : et.type === "shape" ? Eo(Q) : et.type === "image" ? Ro(Q) : et.type === "youtube" && Ds(Q));
                          },
                          onEditEnd: () => {
                            po(null), fo(null), Ao(null), Eo(null), Ro(null), Ds(null);
                          }
                        },
                        portValues: r && ((A = R.ports) != null && A.length) && Xs >= 0 ? r.getAllPortValues(w.id) : void 0,
                        updateData: (Q) => {
                          t.updateNodeWithHistory(w.id, {
                            data: { ...w.data, ...Q }
                          });
                        }
                      },
                      R.handlesOwnLayout ? w.id : void 0
                    );
                    R.handlesOwnLayout ? D = U : D = /* @__PURE__ */ h(
                      Su,
                      {
                        node: w,
                        isInteractive: L,
                        measuredH: ut[w.id],
                        onMeasuredHeight: re,
                        observeElement: ve,
                        unobserveElement: er,
                        isContainer: R.isContainer,
                        children: U
                      },
                      w.id
                    );
                  }
                } else if (w.type === "content") {
                  const R = w;
                  D = /* @__PURE__ */ h(
                    oa,
                    {
                      node: R,
                      isSelected: f.has(w.id),
                      multiSelected: f.size > 1 && f.has(w.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: x === "select" || x === "text" || x === "note",
                      zoom: c.zoom,
                      onMeasuredHeight: re,
                      autoEdit: Bs.current === R.id
                    },
                    w.id
                  );
                } else if (w.type === "text")
                  D = /* @__PURE__ */ h(
                    ya,
                    {
                      node: w,
                      engine: t,
                      editing: nn === w.id,
                      editClickPos: nn === w.id ? sn.current : null,
                      onStopEdit: () => {
                        if (an.current === w.id) {
                          an.current = null;
                          const R = t.getNode(w.id);
                          if (!R || !R.data.text.trim()) {
                            t.deleteNode(w.id), po(null);
                            return;
                          }
                          t.pushHistorySnapshot();
                        }
                        po(null);
                      },
                      onMeasuredHeight: re
                    },
                    w.id
                  );
                else if (w.type === "image")
                  D = /* @__PURE__ */ h(
                    fa,
                    {
                      node: w,
                      isSelected: f.has(w.id),
                      engine: t,
                      interactive: x === "select",
                      zoom: c.zoom,
                      onResizeHandleDown: hn,
                      cropping: Ls === w.id,
                      onCropStart: () => Ro(w.id),
                      onCropEnd: () => Ro(null)
                    },
                    w.id
                  );
                else if (w.type === "sticky")
                  D = /* @__PURE__ */ h(
                    ga,
                    {
                      node: w,
                      isSelected: f.has(w.id),
                      engine: t,
                      interactive: x === "select" || x === "sticky",
                      zoom: c.zoom,
                      editing: Rs === w.id,
                      onEditStart: fo,
                      onEditEnd: () => fo(null)
                    },
                    w.id
                  );
                else if (w.type === "frame") {
                  const R = w, W = R.h === "auto" ? 100 : R.h;
                  D = /* @__PURE__ */ h(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: R.x,
                        top: R.y,
                        width: R.w,
                        height: W,
                        zIndex: R.z,
                        background: R.data.backgroundColor || "rgba(0,0,0,0.02)",
                        border: `${R.data.borderWidth || 1}px ${R.data.borderStyle || "dashed"} ${R.data.borderColor || "#ccc"}`,
                        boxSizing: "border-box",
                        borderRadius: 8,
                        opacity: R.data.opacity ?? 1,
                        pointerEvents: "none",
                        overflow: "visible",
                        transform: R.rotation ? `rotate(${R.rotation}deg)` : void 0,
                        transformOrigin: "center center"
                      },
                      children: Es === w.id ? /* @__PURE__ */ h(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: R.data.label ?? "",
                          placeholder: n.frameLabelPlaceholder,
                          onBlur: (j) => {
                            const L = j.currentTarget.value.trim();
                            t.updateNodeWithHistory(w.id, {
                              data: { ...R.data, label: L || void 0 }
                            }), Ao(null);
                          },
                          onKeyDown: (j) => {
                            (j.key === "Enter" || j.key === "Escape") && j.currentTarget.blur(), j.stopPropagation();
                          },
                          onPointerDown: (j) => j.stopPropagation(),
                          style: {
                            position: "absolute",
                            top: -24,
                            left: 0,
                            fontSize: 12,
                            color: R.data.borderColor || "#999",
                            fontWeight: 500,
                            background: "rgba(255,255,255,0.95)",
                            border: "1px solid #3b82f6",
                            borderRadius: 4,
                            padding: "1px 4px",
                            outline: "none",
                            pointerEvents: "auto",
                            minWidth: 80
                          }
                        }
                      ) : R.data.label ? /* @__PURE__ */ h(
                        "div",
                        {
                          onDoubleClick: (j) => {
                            j.stopPropagation(), t.select(w.id), Ao(w.id);
                          },
                          style: {
                            position: "absolute",
                            top: -20,
                            left: 4,
                            fontSize: 12,
                            color: R.data.borderColor || "#999",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            pointerEvents: "auto",
                            cursor: "default"
                          },
                          children: R.data.label
                        }
                      ) : null
                    },
                    w.id
                  );
                } else {
                  const R = w;
                  R.type === "draw" ? D = /* @__PURE__ */ h(Kr, { node: R }, w.id) : D = /* @__PURE__ */ h(Kr, { node: R, editingLabel: sr === w.id }, w.id);
                }
                return T || I ? /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      opacity: T ? 0.25 : void 0,
                      filter: T ? "saturate(0)" : void 0,
                      animation: I ? "sb-node-bop 3.4s ease-in-out infinite" : void 0,
                      animationDelay: I ? `${z}s` : void 0,
                      transformOrigin: "center center",
                      willChange: I ? "transform" : void 0
                    },
                    children: D
                  },
                  w.id
                ) : D;
              }),
              Ys.size > 0 && Array.from(Ys).map((w) => {
                const T = t.getNode(w);
                if (!T || T.type === "edge") return null;
                const I = T.h === "auto" ? ut[T.id] ?? 100 : T.h, N = pn === w;
                return /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: T.x - 5,
                      top: T.y - 5,
                      width: T.w + 10,
                      height: I + 10,
                      borderRadius: 10,
                      border: `2px solid ${N ? "#f59e0b" : "#60a5fa"}`,
                      boxShadow: N ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
                      pointerEvents: "none",
                      transform: T.rotation ? `rotate(${T.rotation}deg)` : void 0,
                      transformOrigin: "center center"
                    }
                  },
                  `search-highlight-${w}`
                );
              }),
              sr && (() => {
                const w = t.getNode(sr);
                if (!w || w.type !== "shape") return null;
                const T = w.data;
                return T.shape === "line" || T.shape === "arrow" ? null : /* @__PURE__ */ h(
                  Mu,
                  {
                    node: w,
                    engine: t,
                    onDone: () => Eo(null)
                  },
                  sr
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ h(
          Uh,
          {
            nodes: S,
            viewport: c,
            selection: f,
            measuredHeights: ut,
            activeStroke: Mt,
            shapePreview: Pt,
            shapePreviewStyle: Pt ? {
              stroke: t.mode === "frame" ? "#1e1e2e" : t.activeTool.color,
              strokeWidth: t.mode === "frame" ? 1 : t.activeTool.width,
              roughness: t.mode === "frame" ? 0 : t.activeTool.roughness ?? 1,
              shapeType: t.mode === "frame" ? "rect" : t.activeTool.shapeType || "rect"
            } : null,
            onResizeHandleDown: hn,
            onRotateStart: nl,
            onConnectionHandleDown: Os,
            onEdgeEndpointDown: cl,
            onKinkHandleDown: ll,
            edgePreview: ft,
            edgeReconnect: St,
            eraserMarkedIds: ln.size > 0 ? ln : void 0,
            eraserTrail: Fs.length > 1 ? Fs : void 0,
            laserTrail: Ns.length > 1 ? Ns : void 0,
            mode: x,
            hoveredNodeId: $a,
            registry: o,
            onPortHandleDown: il,
            cycleNodeIds: r && Xs >= 0 ? r.cycleNodeIds : void 0,
            containerTypes: t.containerTypes,
            alignGuides: lt
          }
        ),
        ee && (() => {
          const w = t.selectionGroupId(), T = w ? t.groupRotations.get(w) : void 0;
          let I, N, z, D;
          if (ho)
            I = ho.bounds, N = ho.angle, z = ho.cx, D = ho.cy;
          else if (T && T.angle !== 0) {
            const L = -T.angle * Math.PI / 180, U = Math.cos(L), Q = Math.sin(L);
            let et = 1 / 0, rt = 1 / 0, pt = -1 / 0, Tt = -1 / 0;
            for (const It of t.selection) {
              const kt = t.getNode(It);
              if (!kt || kt.type === "edge") continue;
              const At = kt.h === "auto" ? ut[kt.id] ?? 100 : kt.h, Ot = kt.x + kt.w / 2, Yt = kt.y + At / 2, it = Ot - T.cx, wt = Yt - T.cy, gt = T.cx + it * U - wt * Q, Ht = T.cy + it * Q + wt * U;
              et = Math.min(et, gt - kt.w / 2), rt = Math.min(rt, Ht - At / 2), pt = Math.max(pt, gt + kt.w / 2), Tt = Math.max(Tt, Ht + At / 2);
            }
            I = {
              x: et - le,
              y: rt - le,
              w: pt - et + le * 2,
              h: Tt - rt + le * 2
            }, N = T.angle, z = T.cx, D = T.cy;
          } else
            I = ee, N = 0, z = 0, D = 0;
          const A = 8 / c.zoom, R = A / 2, W = [
            { pos: "nw", cx: I.x, cy: I.y },
            { pos: "n", cx: I.x + I.w / 2, cy: I.y },
            { pos: "ne", cx: I.x + I.w, cy: I.y },
            { pos: "e", cx: I.x + I.w, cy: I.y + I.h / 2 },
            { pos: "se", cx: I.x + I.w, cy: I.y + I.h },
            { pos: "s", cx: I.x + I.w / 2, cy: I.y + I.h },
            { pos: "sw", cx: I.x, cy: I.y + I.h },
            { pos: "w", cx: I.x, cy: I.y + I.h / 2 }
          ], j = N !== 0 ? ` rotate(${N}, ${z}, ${D})` : "";
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ k("g", { transform: j, children: [
                /* @__PURE__ */ h(
                  "rect",
                  {
                    x: I.x,
                    y: I.y,
                    width: I.w,
                    height: I.h,
                    fill: "none",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / c.zoom
                  }
                ),
                N === 0 && W.map(({ pos: L, cx: U, cy: Q }) => /* @__PURE__ */ h(
                  "rect",
                  {
                    x: U - R,
                    y: Q - R,
                    width: A,
                    height: A,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / c.zoom,
                    style: { cursor: Jr(L, N), pointerEvents: "auto" },
                    onPointerDown: (et) => {
                      et.stopPropagation(), hl(L, et);
                    }
                  },
                  L
                )),
                (() => {
                  const L = 25 / c.zoom, U = I.x + I.w / 2, Q = I.y;
                  return /* @__PURE__ */ k(mt, { children: [
                    /* @__PURE__ */ h(
                      "line",
                      {
                        x1: U,
                        y1: Q,
                        x2: U,
                        y2: Q - L,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / c.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const et = 8 / c.zoom, rt = et / 2;
                      return /* @__PURE__ */ h(
                        "rect",
                        {
                          x: U - rt,
                          y: Q - L - rt,
                          width: et,
                          height: et,
                          rx: 1.5 / c.zoom,
                          transform: `rotate(45, ${U}, ${Q - L})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / c.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (pt) => dl(pt)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const L = 26 / c.zoom, U = 42 / c.zoom, Q = 4 / c.zoom;
                  return [
                    { side: "top", cx: I.x + I.w / 2, cy: I.y - U },
                    { side: "right", cx: I.x + I.w + L, cy: I.y + I.h / 2 },
                    { side: "bottom", cx: I.x + I.w / 2, cy: I.y + I.h + L },
                    { side: "left", cx: I.x - L, cy: I.y + I.h / 2 }
                  ].map(({ side: rt, cx: pt, cy: Tt }) => /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: pt,
                      cy: Tt,
                      r: Q,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / c.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (It) => {
                        It.stopPropagation();
                        const kt = sl(rt);
                        kt && Os(kt, rt, It);
                      }
                    },
                    `conn-${rt}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Me && /* @__PURE__ */ h(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ h("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ h(
              "rect",
              {
                x: Me.x,
                y: Me.y,
                width: Me.w,
                height: Me.h,
                fill: "none",
                stroke: "#6366f1",
                strokeWidth: 1.5 / c.zoom,
                strokeDasharray: `${5 / c.zoom} ${3 / c.zoom}`,
                rx: 4 / c.zoom,
                opacity: 0.5
              }
            ) })
          }
        ),
        Qt && (() => {
          const w = t.canvasToScreen(Qt.startX, Qt.startY), T = t.canvasToScreen(Qt.endX, Qt.endY), I = Math.min(w.x, T.x), N = Math.min(w.y, T.y), z = Math.abs(T.x - w.x), D = Math.abs(T.y - w.y);
          return z < 2 && D < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "rect",
                {
                  x: I,
                  y: N,
                  width: z,
                  height: D,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        Ce && Ce.length > 2 && (() => {
          const T = Ce.map(([I, N]) => t.canvasToScreen(I, N)).map((I) => `${I.x},${I.y}`).join(" ");
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "polygon",
                {
                  points: T,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        Oe && (() => {
          const w = Math.min(Oe.startX, Oe.endX), T = Math.min(Oe.startY, Oe.endY), I = Math.abs(Oe.endX - Oe.startX), N = Math.abs(Oe.endY - Oe.startY);
          return I < 2 && N < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ h(
                "rect",
                {
                  x: w,
                  y: T,
                  width: I,
                  height: N,
                  fill: "rgba(59,130,246,0.06)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5 / c.zoom,
                  strokeDasharray: `${4 / c.zoom}`,
                  rx: 8 / c.zoom
                }
              ) })
            }
          );
        })(),
        F.length > 0 && /* @__PURE__ */ h(
          "div",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: F.map((w, T) => /* @__PURE__ */ h(
              "div",
              {
                style: {
                  position: "absolute",
                  left: w.x,
                  top: w.y,
                  width: w.w,
                  height: w.h,
                  borderRadius: 3,
                  background: w.active ? "rgba(250, 204, 21, 0.62)" : "rgba(250, 204, 21, 0.44)",
                  boxShadow: w.active ? "0 0 0 1px rgba(202, 138, 4, 0.85)" : "0 0 0 1px rgba(202, 138, 4, 0.45)"
                }
              },
              `search-text-rect-${T}`
            ))
          }
        ),
        Ee && /* @__PURE__ */ h(
          Zh,
          {
            x: Ee.x,
            y: Ee.y,
            sections: Ee.sections,
            onClose: () => He(null)
          }
        ),
        vr && /* @__PURE__ */ h(
          Yh,
          {
            nodes: vr.nodes,
            onSave: (w) => {
              Eh(w, vr.nodes, vr.groupParent), dn(null);
            },
            onCancel: () => dn(null)
          }
        )
      ]
    }
  );
}
const Ye = 52, Yo = 300, zf = Ye + Yo, Iu = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], Ms = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], zu = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], Cs = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Ua = [1, 2, 3, 5, 8, 12], Is = [1, 2, 3, 4, 6, 8], Tu = [1, 2, 3, 4, 6], Pu = Is, Za = [14, 20, 28, 36], zs = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Au = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Pe = [
  { name: "Standard", colors: Iu },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], Ts = Pe, Eu = [
  { name: "Standard", colors: Au },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Bt = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Wt = {
  width: 64,
  fontSize: 10,
  flexShrink: 0
}, Jt = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
}, Ru = "https://libraries.excalidraw.com/libraries.json", _n = "https://libraries.excalidraw.com/libraries";
function Lu({
  onClose: t,
  onInstalled: e
}) {
  const o = Ut(), { labels: r } = jt(), [n, s] = $([]), [i, a] = $(!0), [l, c] = $(null), [d, p] = $(""), [u, f] = $(null), [m, y] = $(/* @__PURE__ */ new Set()), g = at(() => {
    const v = ka(), M = new Set(v.map((C) => C.source));
    y(M);
  }, []);
  bt(() => {
    let v = !1;
    return (async () => {
      try {
        const M = await fetch(Ru);
        if (!M.ok) throw new Error(`HTTP ${M.status}`);
        const C = await M.json();
        v || (s(C), a(!1));
      } catch (M) {
        v || (c(String(M)), a(!1));
      }
    })(), g(), () => {
      v = !0;
    };
  }, [g]);
  const x = Kt(() => {
    if (!d.trim()) return n;
    const v = d.toLowerCase();
    return n.filter(
      (M) => {
        var C, P;
        return M.name.toLowerCase().includes(v) || ((C = M.description) == null ? void 0 : C.toLowerCase().includes(v)) || ((P = M.itemNames) == null ? void 0 : P.some((F) => F.toLowerCase().includes(v)));
      }
    );
  }, [n, d]), b = at(
    async (v) => {
      f(v.id);
      try {
        const M = `${_n}/${v.source}`;
        await xh(M, v.name), g(), e();
      } catch (M) {
        console.error("Failed to install library:", M);
      } finally {
        f(null);
      }
    },
    [e, g]
  );
  return Ve(
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 1e5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)"
        },
        onPointerDown: (v) => {
          v.target === v.currentTarget && t();
        },
        children: /* @__PURE__ */ k(
          "div",
          {
            style: {
              width: 620,
              maxWidth: "90vw",
              maxHeight: "80vh",
              background: o.panelBg,
              border: `1px solid ${o.border}`,
              borderRadius: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            },
            onPointerDown: (v) => v.stopPropagation(),
            children: [
              /* @__PURE__ */ k(
                "div",
                {
                  style: {
                    padding: "16px 20px 12px",
                    borderBottom: `1px solid ${o.border}`,
                    flexShrink: 0
                  },
                  children: [
                    /* @__PURE__ */ k(
                      "div",
                      {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 12
                        },
                        children: [
                          /* @__PURE__ */ h(
                            "span",
                            {
                              style: {
                                fontSize: 14,
                                fontWeight: 600,
                                color: o.text
                              },
                              children: r.libraryDirectoryTitle
                            }
                          ),
                          /* @__PURE__ */ h(
                            "button",
                            {
                              onClick: t,
                              style: {
                                border: "none",
                                background: "transparent",
                                color: o.textMuted,
                                cursor: "pointer",
                                fontSize: 18,
                                lineHeight: 1,
                                padding: "2px 6px"
                              },
                              children: "×"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "text",
                        placeholder: r.libraryDirectorySearchPlaceholder,
                        value: d,
                        onChange: (v) => p(v.target.value),
                        autoFocus: !0,
                        style: {
                          width: "100%",
                          padding: "7px 10px",
                          border: `1px solid ${o.border}`,
                          borderRadius: 6,
                          background: o.controlBg,
                          color: o.text,
                          fontSize: 12,
                          outline: "none",
                          boxSizing: "border-box"
                        }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ k(
                "div",
                {
                  style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "8px 20px"
                  },
                  children: [
                    i && /* @__PURE__ */ h(
                      "div",
                      {
                        style: {
                          textAlign: "center",
                          padding: 40,
                          color: o.textMuted,
                          fontSize: 12
                        },
                        children: r.libraryDirectoryLoading
                      }
                    ),
                    l && /* @__PURE__ */ k(
                      "div",
                      {
                        style: {
                          textAlign: "center",
                          padding: 40,
                          color: "#ef4444",
                          fontSize: 12
                        },
                        children: [
                          r.libraryDirectoryFailedPrefix,
                          ": ",
                          l
                        ]
                      }
                    ),
                    !i && !l && x.length === 0 && /* @__PURE__ */ h(
                      "div",
                      {
                        style: {
                          textAlign: "center",
                          padding: 40,
                          color: o.textDisabled,
                          fontSize: 12
                        },
                        children: r.libraryDirectoryNoMatches
                      }
                    ),
                    x.map((v, M) => {
                      const C = m.has(
                        `${_n}/${v.source}`
                      ), P = u === v.id;
                      return /* @__PURE__ */ h(
                        Du,
                        {
                          entry: v,
                          isInstalled: C,
                          isInstalling: P,
                          onInstall: () => b(v),
                          theme: o
                        },
                        v.id || `dir-${M}`
                      );
                    })
                  ]
                }
              ),
              /* @__PURE__ */ k(
                "div",
                {
                  style: {
                    padding: "8px 20px",
                    borderTop: `1px solid ${o.border}`,
                    color: o.textDisabled,
                    fontSize: 10,
                    textAlign: "center",
                    flexShrink: 0
                  },
                  children: [
                    x.length,
                    " ",
                    r.libraryDirectoryLibrariesCountSuffix,
                    " • ",
                    r.libraryDirectoryPoweredBy
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    document.body
  );
}
function Du({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: r,
  theme: n
}) {
  var a;
  const { labels: s } = jt(), i = t.preview ? `${_n}/${t.preview}` : null;
  return /* @__PURE__ */ k(
    "div",
    {
      style: {
        display: "flex",
        gap: 12,
        padding: "10px 0",
        borderBottom: `1px solid ${n.border}`,
        alignItems: "flex-start"
      },
      children: [
        i && /* @__PURE__ */ h(
          "img",
          {
            src: i,
            alt: t.name,
            loading: "lazy",
            style: {
              width: 64,
              height: 64,
              objectFit: "cover",
              borderRadius: 6,
              border: `1px solid ${n.border}`,
              flexShrink: 0,
              background: "#fff"
            }
          }
        ),
        /* @__PURE__ */ k("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ h(
            "div",
            {
              style: {
                fontSize: 12,
                fontWeight: 600,
                color: n.text,
                marginBottom: 2
              },
              children: t.name
            }
          ),
          ((a = t.authors) == null ? void 0 : a.length) > 0 && /* @__PURE__ */ k(
            "div",
            {
              style: {
                fontSize: 10,
                color: n.textMuted,
                marginBottom: 4
              },
              children: [
                s.libraryDirectoryBy,
                " ",
                t.authors.map((l) => l.name).join(", ")
              ]
            }
          ),
          t.description && /* @__PURE__ */ h(
            "div",
            {
              style: {
                fontSize: 10,
                color: n.textSecondary,
                lineHeight: 1.4,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              },
              children: t.description
            }
          )
        ] }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: r,
            disabled: e || o,
            style: {
              flexShrink: 0,
              padding: "5px 10px",
              border: e ? `1px solid ${n.border}` : "none",
              borderRadius: 4,
              background: e ? "transparent" : o ? n.controlBgActive : n.accentColor,
              color: e ? n.textMuted : "#fff",
              cursor: e || o ? "default" : "pointer",
              fontSize: 10,
              fontWeight: 500,
              opacity: o ? 0.7 : 1
            },
            children: e ? s.libraryDirectoryInstalled : o ? s.libraryDirectoryInstalling : s.libraryDirectoryInstall
          }
        )
      ]
    }
  );
}
const Wu = /^[A-Za-z][A-Za-z0-9_:-]*$/, Ei = /^[A-Za-z][A-Za-z0-9_]*$/;
function Bu(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function Te(t) {
  return Bu(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function En(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function wo(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: Te(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: Te(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: Te(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: Te(o[2]), shape: "rect" } : Wu.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function Fu(t) {
  let e = t.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (e) {
    const o = wo(e[1]), r = wo(e[3]);
    return !o || !r ? null : { from: o, to: r, label: Te(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/), e) {
    const o = wo(e[1]), r = wo(e[3]);
    return !o || !r ? null : { from: o, to: r, label: Te(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/), e) {
    const o = wo(e[1]), r = wo(e[2]);
    return !o || !r ? null : { from: o, to: r };
  }
  return null;
}
function Nu(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function Hu(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return r ? { label: Te(r[1]) } : { label: Te(o) };
}
function Ou(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, r = t.replace(/\r\n/g, `
`).split(`
`).map((l) => l.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (r.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const n = r[0];
  /^(flowchart|graph)\b/i.test(n) && (o.direction = Nu(n), r.shift());
  const i = [], a = (l) => {
    for (const c of i) c.nodeKeys.add(l);
  };
  for (const l of r) {
    const c = l.split(";").map((d) => d.trim()).filter(Boolean);
    for (const d of c) {
      const p = Hu(d);
      if (p) {
        i.push({ label: p.label, nodeKeys: /* @__PURE__ */ new Set() });
        continue;
      }
      if (/^end\b/i.test(d)) {
        const m = i.pop();
        m && o.groups.push({
          label: m.label,
          nodeKeys: Array.from(m.nodeKeys)
        });
        continue;
      }
      const u = Fu(d);
      if (u) {
        const m = En(o, u.from), y = En(o, u.to);
        a(m.key), a(y.key), o.edges.push({ fromKey: m.key, toKey: y.key, label: u.label });
        continue;
      }
      const f = wo(d);
      if (f) {
        const m = En(o, f);
        a(m.key);
      }
    }
  }
  for (; i.length > 0; ) {
    const l = i.pop();
    o.groups.push({
      label: l.label,
      nodeKeys: Array.from(l.nodeKeys)
    });
  }
  if (o.nodes.size === 0)
    throw new Error("Could not parse Mermaid nodes. Try simple flowchart syntax like A-->B.");
  return o;
}
function Xu(t) {
  const e = t.indexOf(":");
  if (e < 0) return null;
  const o = t.slice(0, e).trim(), r = t.slice(e + 1).trim();
  if (!o || !r) return null;
  const n = [
    "-->>",
    "->>",
    "--x",
    "-x",
    "-->",
    "->",
    "--)",
    "-)",
    "-.->",
    "==>",
    "---"
  ];
  for (const s of n) {
    const i = o.indexOf(s);
    if (i < 0) continue;
    const a = o.slice(0, i).trim(), l = o.slice(i + s.length).trim();
    if (!(!Ei.test(a) || !Ei.test(l)))
      return {
        from: a,
        arrow: s,
        to: l,
        label: Te(r)
      };
  }
  return null;
}
function Gu(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: Te(e[3])
  } : null;
}
function Yu(t) {
  return t ? /^#[0-9a-f]{3,8}$/i.test(t) || /^(rgb|rgba|hsl|hsla)\(/i.test(t) ? !0 : (/* @__PURE__ */ new Set([
    "red",
    "green",
    "blue",
    "purple",
    "pink",
    "orange",
    "yellow",
    "brown",
    "gray",
    "grey",
    "black",
    "white",
    "teal",
    "cyan",
    "magenta",
    "indigo",
    "violet",
    "gold",
    "silver",
    "maroon",
    "navy",
    "olive",
    "lime",
    "aqua",
    "fuchsia",
    "rebeccapurple"
  ])).has(t.toLowerCase()) : !1;
}
function ju(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.indexOf(" "), n = r >= 0 ? o.slice(0, r) : o, s = r >= 0 ? o.slice(r + 1).trim() : "";
  return Yu(n) ? { color: n, label: s || void 0 } : { label: o };
}
function Vu(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`).map((u) => u.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (e.length === 0)
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  if (!/^sequenceDiagram\b/i.test(e[0]))
    throw new Error("Not a Mermaid sequence diagram.");
  const o = /* @__PURE__ */ new Set(), r = [], n = [], s = [], i = [], a = [], l = [];
  let c = 0;
  const d = (u) => {
    o.has(u) || (o.add(u), r.push(u));
    for (const f of l) f.participants.add(u);
  };
  for (let u = 1; u < e.length; u++) {
    const f = e[u];
    if (/^autonumber\b/i.test(f)) continue;
    const m = ju(f);
    if (m) {
      l.push({ type: "box", label: m.label, color: m.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const y = f.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (y) {
      l.push({
        type: "loop",
        label: y[1] ? Te(y[1]) : void 0,
        startStep: c,
        participants: /* @__PURE__ */ new Set()
      });
      continue;
    }
    if (/^end\b/i.test(f)) {
      const v = l.pop();
      (v == null ? void 0 : v.type) === "box" ? a.push(v) : (v == null ? void 0 : v.type) === "loop" && i.push({
        label: v.label,
        startStep: v.startStep,
        endStep: c,
        participants: v.participants
      });
      continue;
    }
    const g = f.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (g) {
      d(g[1]);
      continue;
    }
    const x = Gu(f);
    if (x) {
      d(x.of), s.push({ step: c, note: x });
      continue;
    }
    const b = Xu(f);
    if (b) {
      d(b.from), d(b.to), n.push(b), c += 1;
      continue;
    }
  }
  for (; l.length > 0; ) {
    const u = l.pop();
    u.type === "box" ? a.push(u) : i.push({
      label: u.label,
      startStep: u.startStep,
      endStep: c,
      participants: u.participants
    });
  }
  const p = r;
  if (p.length === 0)
    throw new Error("No participants found in sequenceDiagram.");
  if (n.length === 0 && s.length === 0)
    throw new Error("No messages/notes found in sequenceDiagram.");
  return {
    participants: p,
    messages: n,
    notes: s,
    loops: i.map((u) => ({
      label: u.label,
      startStep: u.startStep,
      endStep: u.endStep,
      participants: Array.from(u.participants)
    })).filter((u) => u.endStep >= u.startStep),
    groups: a.map((u) => ({
      label: u.label,
      color: u.color,
      participants: Array.from(u.participants)
    })).filter((u) => u.participants.length > 0)
  };
}
function Wr(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function qu(t) {
  const e = Array.from(t.nodes.keys()).sort(), o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const c of e)
    o.set(c, 0), r.set(c, []);
  for (const c of t.edges)
    !o.has(c.fromKey) || !o.has(c.toKey) || (r.get(c.fromKey).push(c.toKey), o.set(c.toKey, (o.get(c.toKey) ?? 0) + 1));
  const n = e.filter((c) => (o.get(c) ?? 0) === 0), s = /* @__PURE__ */ new Map();
  for (const c of n) s.set(c, 0);
  const i = [...n];
  for (; i.length > 0; ) {
    const c = i.shift(), d = s.get(c) ?? 0;
    for (const p of r.get(c) ?? []) {
      const u = Math.max(s.get(p) ?? 0, d + 1);
      s.set(p, u), o.set(p, (o.get(p) ?? 0) - 1), (o.get(p) ?? 0) <= 0 && i.push(p);
    }
  }
  let a = 0;
  for (const c of s.values()) a = Math.max(a, c);
  for (const c of e)
    s.has(c) || (a += 1, s.set(c, a));
  const l = /* @__PURE__ */ new Map();
  for (const c of e) {
    const d = s.get(c) ?? 0;
    l.has(d) || l.set(d, []), l.get(d).push(c);
  }
  return Array.from(l.entries()).sort((c, d) => c[0] - d[0]).map(([, c]) => c.sort());
}
function Ku(t, e, o, r) {
  const n = Vu(t), s = [], i = [], a = 6, l = "#94a3b8", c = 3, d = "#475569", p = 180, u = 64, f = 270, m = o - 140, y = m + u + 8, g = 88, x = Math.max(1, n.messages.length), b = y + x * g + 40, v = b + 12, M = v + u, C = /* @__PURE__ */ new Map();
  for (const P of n.groups) {
    const F = P.participants.map((ot) => C.get(ot)).filter((ot) => typeof ot == "number");
    if (F.length === 0)
      for (const ot of P.participants) {
        const J = n.participants.indexOf(ot);
        J >= 0 && F.push(e + (J - (n.participants.length - 1) / 2) * f);
      }
    if (F.length === 0) continue;
    const B = Math.min(...F) - p / 2 - 24, E = Math.max(...F) + p / 2 + 24, X = m - 22, nt = M - X + 18, Y = {
      id: zt(10),
      type: "shape",
      x: B,
      y: X,
      w: E - B,
      h: nt,
      z: r(),
      data: {
        shape: "rect",
        stroke: P.color ? P.color : "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: P.color ? P.color : "#334155",
        fillStyle: "solid",
        opacity: P.color ? 0.2 : 0.08,
        edgeStyle: "sharp"
      }
    };
    if (s.push(Y), i.push(Y.id), P.label) {
      const ot = {
        id: zt(10),
        type: "text",
        x: B + 10,
        y: X + 8,
        w: Math.max(120, E - B - 20),
        h: "auto",
        z: r(),
        data: {
          text: P.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      s.push(ot);
    }
  }
  for (let P = 0; P < n.participants.length; P++) {
    const F = n.participants[P], B = e + (P - (n.participants.length - 1) / 2) * f;
    C.set(F, B);
    const E = {
      id: zt(10),
      type: "shape",
      x: B - p / 2,
      y: m,
      w: p,
      h: u,
      z: r(),
      data: {
        shape: "rect",
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        edgeStyle: "round",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        label: F,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(E), i.push(E.id);
    const X = {
      id: zt(10),
      type: "shape",
      x: B - a / 2,
      y,
      w: a,
      h: b - y,
      z: r(),
      data: {
        shape: "rect",
        stroke: l,
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 0,
        fill: l,
        fillStyle: "solid",
        opacity: 0.3,
        edgeStyle: "round"
      }
    };
    s.push(X);
    const nt = {
      id: zt(10),
      type: "shape",
      x: B - p / 2,
      y: v,
      w: p,
      h: u,
      z: r(),
      data: {
        shape: "rect",
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        edgeStyle: "round",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        label: F,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(nt), i.push(nt.id);
  }
  for (const P of n.loops) {
    const F = P.participants.map((O) => C.get(O)).filter((O) => typeof O == "number");
    if (F.length === 0) continue;
    const B = Math.min(...F) - 130, E = Math.max(...F) + 130, X = P.startStep + 1, nt = Math.max(X, P.endStep), Y = y + (X - 1) * g + 16, ot = y + nt * g + 34, J = {
      id: zt(10),
      type: "shape",
      x: B,
      y: Y,
      w: E - B,
      h: Math.max(90, ot - Y),
      z: r(),
      data: {
        shape: "rect",
        stroke: "#c4b5fd",
        strokeWidth: 1.5,
        strokeStyle: "dotted",
        roughness: 0,
        fill: "#64748b",
        fillStyle: "solid",
        opacity: 0.08,
        edgeStyle: "sharp"
      }
    };
    s.push(J);
    const lt = `loop${P.label ? ` [${P.label}]` : ""}`, H = {
      id: zt(10),
      type: "text",
      x: B + 10,
      y: Y + 8,
      w: E - B - 20,
      h: "auto",
      z: r(),
      data: {
        text: lt,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#1f2937",
        align: "left"
      }
    };
    s.push(H);
  }
  for (let P = 0; P < n.messages.length; P++) {
    const F = n.messages[P], B = y + (P + 1) * g, E = C.get(F.from), X = C.get(F.to);
    if (E == null || X == null) continue;
    const nt = E === X, Y = Math.min(E, X), ot = Math.max(E, X), J = Math.max(ot - Y, 40), lt = E <= X ? 0 : J, H = E <= X ? J : 0, O = F.arrow.includes("--") || F.arrow === "-.->", _ = F.arrow.toLowerCase().includes("x"), K = F.arrow.includes(">") || F.arrow.includes(")");
    if (nt) {
      const tt = E + 6, Z = B - 16, st = 92, dt = 48, Mt = O ? "dashed" : "solid", Ct = {
        id: zt(10),
        type: "shape",
        x: tt,
        y: Z,
        w: st,
        h: c,
        z: r(),
        data: {
          shape: "rect",
          stroke: d,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: d,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, Pt = {
        id: zt(10),
        type: "shape",
        x: tt + st - c,
        y: Z,
        w: c,
        h: dt,
        z: r(),
        data: {
          shape: "rect",
          stroke: d,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: d,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, xt = {
        id: zt(10),
        type: "shape",
        x: tt,
        y: Z + dt - c,
        w: st,
        h: c,
        z: r(),
        data: {
          shape: K ? "arrow" : "line",
          stroke: d,
          strokeWidth: c,
          strokeStyle: Mt,
          roughness: 0,
          startPoint: [st, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(Ct, Pt, xt);
    } else {
      const tt = {
        id: zt(10),
        type: "shape",
        x: Y,
        y: B - 14,
        w: J,
        h: 28,
        z: r(),
        data: {
          shape: K ? "arrow" : "line",
          stroke: d,
          strokeWidth: c,
          strokeStyle: O ? "dashed" : "solid",
          roughness: 0,
          startPoint: [lt, 14],
          endPoint: [H, 14]
        }
      };
      s.push(tt);
    }
    const q = nt ? E + 18 : Y, G = nt ? 170 : J, V = {
      id: zt(10),
      type: "text",
      x: q,
      y: B - 46,
      w: G,
      h: "auto",
      z: r(),
      data: {
        text: F.label,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "center"
      }
    };
    if (s.push(V), _) {
      const tt = E <= X ? Y + J - 14 : Y + 8, Z = {
        id: zt(10),
        type: "text",
        x: tt,
        y: B - 20,
        w: 20,
        h: "auto",
        z: r(),
        data: {
          text: "×",
          fontSize: 16,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "center"
        }
      };
      s.push(Z);
    }
  }
  for (const P of n.notes) {
    const F = y + (P.step + 1) * g, B = C.get(P.note.of);
    if (B == null) continue;
    let E = B;
    P.note.side === "right" && (E += 130), P.note.side === "left" && (E -= 300), P.note.side === "over" && (E -= 110);
    const X = {
      id: zt(10),
      type: "text",
      x: E,
      y: F - 8,
      w: 260,
      h: "auto",
      z: r(),
      data: {
        text: P.note.text,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "left"
      }
    };
    s.push(X);
  }
  return { nodes: s, shapeNodeIds: i };
}
function Uu(t, e, o, r) {
  const n = t.trimStart();
  if (/^sequenceDiagram\b/i.test(n))
    return Ku(t, e, o, r);
  const s = Ou(t), i = qu(s), a = Array.from(s.nodes.values()).map((g) => Wr(g.shape)), l = a.length > 0 ? Math.max(...a.map((g) => g.h)) : 96, c = Math.max(l + 130, 260), d = /* @__PURE__ */ new Map(), p = i.length;
  for (let g = 0; g < i.length; g++) {
    const x = i[g], b = x.length, v = (g - (p - 1) / 2) * c, M = x.length > 0 ? Math.max(
      ...x.map((P) => {
        const F = s.nodes.get(P);
        return F ? Wr(F.shape).w : 200;
      })
    ) : 200, C = Math.max(M + 90, 260);
    for (let P = 0; P < x.length; P++) {
      const F = x[P], B = (P - (b - 1) / 2) * C;
      if (s.direction === "LR" || s.direction === "RL") {
        const E = s.direction === "LR" ? e + v : e - v, X = o + B;
        d.set(F, { x: E, y: X });
      } else {
        const E = e + B, X = s.direction === "TB" ? o + v : o - v;
        d.set(F, { x: E, y: X });
      }
    }
  }
  const u = /* @__PURE__ */ new Map(), f = [], m = [], y = /* @__PURE__ */ new Map();
  for (const g of s.groups) {
    if (!g.nodeKeys.length) continue;
    const x = g.nodeKeys.map((F) => {
      const B = s.nodes.get(F), E = d.get(F);
      if (!B || !E) return null;
      const X = Wr(B.shape);
      return { x: E.x - X.w / 2, y: E.y - X.h / 2, w: X.w, h: X.h };
    }).filter((F) => !!F);
    if (!x.length) continue;
    const b = Math.min(...x.map((F) => F.x)) - 30, v = Math.max(...x.map((F) => F.x + F.w)) + 30, M = Math.min(...x.map((F) => F.y)) - 34, C = Math.max(...x.map((F) => F.y + F.h)) + 24, P = {
      id: zt(10),
      type: "shape",
      x: b,
      y: M,
      w: v - b,
      h: C - M,
      z: r(),
      data: {
        shape: "rect",
        stroke: "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: "#334155",
        fillStyle: "solid",
        opacity: 0.12,
        edgeStyle: "sharp"
      }
    };
    if (f.push(P), m.push(P.id), g.label) {
      const F = {
        id: zt(10),
        type: "text",
        x: b + 10,
        y: M + 8,
        w: Math.max(120, v - b - 20),
        h: "auto",
        z: r(),
        data: {
          text: g.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      f.push(F);
    }
  }
  for (const [g, x] of s.nodes) {
    const b = d.get(g) ?? { x: e, y: o }, v = Wr(x.shape), M = {
      id: zt(10),
      type: "shape",
      x: b.x - v.w / 2,
      y: b.y - v.h / 2,
      w: v.w,
      h: v.h,
      z: r(),
      data: {
        shape: x.shape === "diamond" ? "diamond" : x.shape === "circle" ? "ellipse" : (x.shape === "round", "rect"),
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        edgeStyle: x.shape === "round" ? "round" : "sharp",
        label: x.label,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    f.push(M), m.push(M.id), u.set(g, M.id), y.set(g, { x: M.x, y: M.y, w: v.w, h: v.h });
  }
  for (const g of s.edges) {
    const x = u.get(g.fromKey), b = u.get(g.toKey);
    if (!x || !b || x === b) continue;
    const v = {
      id: zt(10),
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: r(),
      data: {
        fromId: x,
        toId: b,
        label: g.label,
        style: "solid",
        color: "#64748b",
        strokeWidth: 2,
        arrowHead: "arrow",
        edgeType: "bezier"
      }
    };
    f.push(v);
  }
  return { nodes: f, shapeNodeIds: m };
}
const Ri = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function Zu({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r
}) {
  const n = Ut(), { labels: s } = jt(), i = ct(null), [a, l] = $(Ri), [c, d] = $(null), [p, u] = $(null);
  bt(() => {
    if (!e) return;
    const y = (g) => {
      i.current && !i.current.contains(g.target) && o();
    };
    return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
  }, [e, o]);
  const f = Kt(
    () => s.mermaidSupportedHint,
    [s.mermaidSupportedHint]
  ), m = at(() => {
    try {
      const y = window.innerWidth / 2, g = window.innerHeight / 2, x = t.screenToCanvas(y, g), { nodes: b, shapeNodeIds: v } = Uu(a, x.x, x.y, () => t.nextZ());
      if (b.length === 0)
        throw new Error(s.mermaidNoNodesParsed);
      t.addNodes(b), v.length > 0 && t.selectMultiple(v), d(null), u(
        s.mermaidInsertedSummary.replace("{nodes}", String(v.length)).replace("{edges}", String(b.length - v.length))
      );
    } catch (y) {
      u(null), d(y instanceof Error ? y.message : s.mermaidParseFailed);
    }
  }, [t, s.mermaidInsertedSummary, s.mermaidNoNodesParsed, s.mermaidParseFailed, a]);
  return !e || !r ? null : Ve(
    /* @__PURE__ */ k(
      "div",
      {
        ref: i,
        style: {
          position: "fixed",
          left: r.right + 8,
          top: r.top,
          background: n.panelBg,
          border: `1px solid ${n.border}`,
          borderRadius: n.panelBorderRadius,
          boxShadow: n.panelShadow,
          width: 340,
          maxHeight: `calc(100vh - ${r.top + 20}px)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          zIndex: 99999
        },
        onPointerDown: (y) => y.stopPropagation(),
        children: [
          /* @__PURE__ */ k("div", { style: { padding: "10px 12px 8px", borderBottom: `1px solid ${n.border}` }, children: [
            /* @__PURE__ */ h("div", { style: { fontSize: 12, fontWeight: 700, color: n.text }, children: s.mermaidSketchTitle }),
            /* @__PURE__ */ h("div", { style: { marginTop: 4, fontSize: 10, color: n.textMuted, lineHeight: 1.45 }, children: f })
          ] }),
          /* @__PURE__ */ k("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ h(
              "textarea",
              {
                value: a,
                onChange: (y) => l(y.target.value),
                spellCheck: !1,
                style: {
                  width: "100%",
                  minHeight: 180,
                  resize: "vertical",
                  padding: "8px 10px",
                  borderRadius: n.controlBorderRadius,
                  border: `1px solid ${n.border}`,
                  background: n.controlBg,
                  color: n.text,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 11,
                  lineHeight: 1.4,
                  boxSizing: "border-box"
                }
              }
            ),
            c && /* @__PURE__ */ h("div", { style: { fontSize: 10, color: "#ef4444" }, children: c }),
            p && /* @__PURE__ */ h("div", { style: { fontSize: 10, color: "#16a34a" }, children: p }),
            /* @__PURE__ */ k("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => l(Ri),
                  style: {
                    border: `1px solid ${n.border}`,
                    background: "transparent",
                    color: n.text,
                    borderRadius: n.controlBorderRadius,
                    padding: "6px 10px",
                    fontSize: 11,
                    cursor: "pointer"
                  },
                  children: s.mermaidResetExample
                }
              ),
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: m,
                  style: {
                    border: `1px solid ${n.border}`,
                    background: n.controlBgActive,
                    color: n.text,
                    borderRadius: n.controlBorderRadius,
                    padding: "6px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer"
                  },
                  children: s.mermaidInsertDiagram
                }
              )
            ] })
          ] })
        ]
      }
    ),
    document.body
  );
}
const Qu = [
  { key: "select", shortcut: "S", num: "" },
  { key: "hand", shortcut: "P", num: "" },
  { key: "draw", shortcut: "D", num: "" },
  { key: "shape", shortcut: "G", num: "" },
  { key: "text", shortcut: "T", num: "" },
  { key: "note", shortcut: "B", num: "" },
  { key: "sticky", shortcut: "Y", num: "" },
  { key: "frame", shortcut: "F", num: "" },
  { key: "erase", shortcut: "E", num: "" },
  { key: "laser", shortcut: "Z", num: "" }
], Co = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, qt = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Io({ name: t, size: e = 18, textGlyph: o = "T" }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...qt }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ...qt })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...qt }),
    t === "text" && /* @__PURE__ */ h(
      "text",
      {
        x: "12",
        y: "16",
        textAnchor: "middle",
        fontSize: "16",
        fontWeight: "700",
        fill: "currentColor",
        stroke: "none",
        children: o
      }
    ),
    t === "note" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ...qt }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...qt }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...qt, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...qt, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...qt, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...qt }),
      /* @__PURE__ */ h("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...qt }),
      /* @__PURE__ */ h("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...qt }),
      /* @__PURE__ */ h("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...qt })
    ] }),
    t === "erase" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...qt }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ...qt })
    ] }),
    t === "laser" && /* @__PURE__ */ h("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ h("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...qt, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...qt, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...qt, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...qt, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...qt, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ...qt }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...qt }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...qt })
    ] }),
    t === "fit" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...qt }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...qt })
    ] }),
    t === "paper" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...qt }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...qt, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...qt, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...qt, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...qt }),
      /* @__PURE__ */ h("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...qt }),
      /* @__PURE__ */ h("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...qt }),
      /* @__PURE__ */ h("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...qt })
    ] }),
    t === "library" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...qt }),
      /* @__PURE__ */ h("path", { d: "M8 7h6", ...qt, opacity: 0.5 }),
      /* @__PURE__ */ h("path", { d: "M8 11h4", ...qt, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...qt }),
      /* @__PURE__ */ h("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ...qt }),
      /* @__PURE__ */ h("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ...qt }),
      /* @__PURE__ */ h("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
function Ju({
  engine: t,
  background: e
}) {
  const o = Ut(), { labels: r } = jt(), [n, s] = $(!1), i = {
    light: r.paperGroupLight,
    dark: r.paperGroupDark,
    textured: r.paperGroupTextured
  }, a = {
    "plain-white": r.paperWhite,
    "dot-grid": r.paperCream,
    engineering: r.paperWarm,
    blueprint: r.paperBlueprint,
    "dark-grid": r.paperNight,
    "japanese-stationery": r.paperJapaneseStationery,
    kraft: r.paperKraftPaper
  }, l = ct(null), c = ct(null);
  bt(() => {
    if (!n) return;
    const u = (f) => {
      c.current && !c.current.contains(f.target) && l.current && !l.current.contains(f.target) && s(!1);
    };
    return document.addEventListener("pointerdown", u), () => document.removeEventListener("pointerdown", u);
  }, [n]);
  const d = Zo.find((u) => u.key === e) ?? Zo[1], p = n && l.current ? (() => {
    const u = l.current.getBoundingClientRect();
    return Ve(
      /* @__PURE__ */ h(
        "div",
        {
          ref: c,
          style: {
            position: "fixed",
            left: u.right + 8,
            top: u.top,
            background: o.panelBg,
            border: `1px solid ${o.border}`,
            borderRadius: o.panelBorderRadius,
            padding: 8,
            zIndex: 99999,
            boxShadow: o.panelShadow,
            width: 180,
            maxHeight: 400,
            overflowY: "auto"
          },
          onPointerDown: (f) => f.stopPropagation(),
          children: ["light", "dark", "textured"].map((f) => {
            const m = Zo.filter((y) => y.group === f);
            return m.length === 0 ? null : /* @__PURE__ */ k("div", { style: { marginBottom: 6 }, children: [
              /* @__PURE__ */ h(
                "div",
                {
                  style: {
                    fontSize: 10,
                    fontWeight: 600,
                    color: o.textMuted,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "4px 6px 2px"
                  },
                  children: i[f]
                }
              ),
              m.map((y) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    t.setBoardBackground(y.key), s(!1);
                  },
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "5px 6px",
                    border: "none",
                    borderRadius: o.controlBorderRadius,
                    background: e === y.key ? o.controlBgActive : "transparent",
                    color: o.text,
                    cursor: "pointer",
                    fontSize: 12,
                    textAlign: "left"
                  },
                  children: [
                    /* @__PURE__ */ h(
                      "span",
                      {
                        style: {
                          width: 18,
                          height: 18,
                          borderRadius: 3,
                          background: y.swatchColor,
                          border: `1.5px solid ${o.border}`,
                          flexShrink: 0
                        }
                      }
                    ),
                    a[y.key] ?? y.label
                  ]
                },
                y.key
              ))
            ] }, f);
          })
        }
      ),
      document.body
    );
  })() : null;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k(
      "button",
      {
        ref: l,
        title: r.paperType,
        onClick: () => s((u) => !u),
        style: {
          ...Co,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ h(Io, { name: "paper" }),
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                position: "absolute",
                bottom: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: d.swatchColor,
                border: `1px solid ${o.border}`
              }
            }
          )
        ]
      }
    ),
    p
  ] });
}
function $u({ engine: t }) {
  const e = Ut(), { labels: o } = jt(), [r, n] = $(!1), s = ct(null), i = ct(null);
  bt(() => {
    if (!r) return;
    const l = (c) => {
      i.current && !i.current.contains(c.target) && s.current && !s.current.contains(c.target) && n(!1);
    };
    return document.addEventListener("pointerdown", l), () => document.removeEventListener("pointerdown", l);
  }, [r]);
  const a = r && s.current ? (() => {
    const l = s.current.getBoundingClientRect();
    return Ve(
      /* @__PURE__ */ k(
        "div",
        {
          ref: i,
          style: {
            position: "fixed",
            left: l.right + 8,
            top: l.top,
            background: e.panelBg,
            border: `1px solid ${e.border}`,
            borderRadius: 8,
            padding: 8,
            zIndex: 99999,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            width: 180
          },
          onPointerDown: (c) => c.stopPropagation(),
          children: [
            /* @__PURE__ */ h(
              "div",
              {
                style: {
                  fontSize: 10,
                  fontWeight: 600,
                  color: e.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "4px 6px 2px"
                },
                children: o.templatesTitle
              }
            ),
            Vi.map((c) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => {
                  const d = typeof window < "u" ? window : void 0;
                  if (!d) return;
                  const p = d.innerWidth / 2, u = d.innerHeight / 2, f = qo(t.viewport, p, u);
                  t.applyTemplate(c.id, f.x, f.y), n(!1);
                },
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "6px 6px",
                  border: "none",
                  borderRadius: e.controlBorderRadius,
                  background: "transparent",
                  color: e.text,
                  cursor: "pointer",
                  fontSize: 12,
                  textAlign: "left"
                },
                onMouseEnter: (d) => {
                  d.currentTarget.style.background = e.controlBgActive;
                },
                onMouseLeave: (d) => {
                  d.currentTarget.style.background = "transparent";
                },
                children: c.label
              },
              c.id
            ))
          ]
        }
      ),
      document.body
    );
  })() : null;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: s,
        title: o.templatesTitle,
        onClick: () => n((l) => !l),
        style: {
          ...Co,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Io, { name: "template" })
      }
    ),
    a
  ] });
}
function _u({ engine: t }) {
  const e = Ut(), { labels: o } = jt(), [r, n] = $(!1), [s, i] = $(!1), a = ct(null), [l, c] = $(null), d = at(() => {
    n((f) => (!f && a.current && c(a.current.getBoundingClientRect()), !f));
  }, []), p = at(() => n(!1), []), u = at(() => {
    i(!0);
  }, []);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: a,
        title: o.librariesTitle,
        onClick: d,
        style: {
          ...Co,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Io, { name: "library" })
      }
    ),
    /* @__PURE__ */ h(
      Fh,
      {
        engine: t,
        open: r,
        onClose: p,
        triggerRect: l,
        onBrowseDirectory: u
      }
    ),
    s && /* @__PURE__ */ h(
      Lu,
      {
        onClose: () => i(!1),
        onInstalled: () => {
          n(!1), setTimeout(() => {
            a.current && c(a.current.getBoundingClientRect()), n(!0);
          }, 100);
        }
      }
    )
  ] });
}
function tp({ engine: t, baseUrl: e }) {
  const o = Ut(), { labels: r } = jt(), [n, s] = $(!1), i = ct(null), [a, l] = $(null), c = at(() => {
    s((p) => (!p && i.current && l(i.current.getBoundingClientRect()), !p));
  }, []), d = at(() => s(!1), []);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: i,
        title: r.gifSearchTitle,
        onClick: c,
        style: {
          ...Co,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ h(Io, { name: "gif" })
      }
    ),
    /* @__PURE__ */ h(
      Xh,
      {
        engine: t,
        open: n,
        onClose: d,
        triggerRect: a,
        baseUrl: e
      }
    )
  ] });
}
function ep({ engine: t }) {
  const e = Ut(), { labels: o } = jt(), [r, n] = $(!1), s = ct(null), [i, a] = $(null), l = at(() => {
    n((d) => (!d && s.current && a(s.current.getBoundingClientRect()), !d));
  }, []), c = at(() => n(!1), []);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: s,
        title: o.mermaidSketchTitle,
        onClick: l,
        style: {
          ...Co,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Io, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ h(
      Zu,
      {
        engine: t,
        open: r,
        onClose: c,
        triggerRect: i
      }
    )
  ] });
}
function op({ engine: t, gifApiBaseUrl: e }) {
  const o = Ut(), { labels: r } = jt(), [n, s] = $(t.mode), [i, a] = $(t.boardBackground), [l, c] = $(t.lassoSelect);
  bt(() => {
    const p = () => s(t.mode), u = () => a(t.boardBackground), f = () => c(t.lassoSelect);
    return t.on("mode", p), t.on("background", u), t.on("lassoToggle", f), () => {
      t.off("mode", p), t.off("background", u), t.off("lassoToggle", f);
    };
  }, [t]);
  const d = Qu.map((p) => ({
    ...p,
    label: p.key === "select" ? r.toolSelect : p.key === "hand" ? r.toolHand : p.key === "draw" ? r.toolDraw : p.key === "shape" ? r.toolShape : p.key === "text" ? r.toolText : p.key === "note" ? r.toolNote : p.key === "sticky" ? r.toolSticky : p.key === "frame" ? r.toolFrame : p.key === "erase" ? r.toolEraser : r.toolLaser
  }));
  return /* @__PURE__ */ k(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: Ye,
        height: "100%",
        flexShrink: 0,
        background: o.toolbarBg,
        borderRight: `1px solid ${o.border}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 0",
        gap: 4
      },
      children: [
        d.map((p) => {
          const u = n === p.key && !(p.key === "select" && l);
          return /* @__PURE__ */ k(
            "button",
            {
              title: `${p.label} (${p.shortcut}${p.num ? ` / ${p.num}` : ""})`,
              onClick: () => {
                l && (t.toggleLassoSelect(), c(!1)), t.setMode(p.key);
              },
              style: {
                ...Co,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: u ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ h(Io, { name: p.key, textGlyph: r.toolTextGlyph }),
                /* @__PURE__ */ h(
                  "span",
                  {
                    style: {
                      position: "absolute",
                      bottom: 2,
                      right: 2,
                      fontSize: 8,
                      lineHeight: 1,
                      color: o.textMuted,
                      fontWeight: 500,
                      pointerEvents: "none"
                    },
                    children: p.num || p.shortcut
                  }
                )
              ]
            },
            p.key
          );
        }),
        /* @__PURE__ */ h("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ k(
          "button",
          {
            title: `${r.toolLassoSelect} (L)`,
            onClick: () => {
              l ? (t.toggleLassoSelect(), c(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), c(!0));
            },
            style: {
              ...Co,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: l ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ h(Io, { name: "lasso" }),
              /* @__PURE__ */ h(
                "span",
                {
                  style: {
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    fontSize: 8,
                    lineHeight: 1,
                    color: o.textMuted,
                    fontWeight: 500,
                    pointerEvents: "none"
                  },
                  children: "L"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ h("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ h(Ju, { engine: t, background: i }),
        /* @__PURE__ */ h($u, { engine: t }),
        /* @__PURE__ */ h(_u, { engine: t }),
        /* @__PURE__ */ h(ep, { engine: t }),
        e && /* @__PURE__ */ h(tp, { engine: t, baseUrl: e })
      ]
    }
  );
}
const rp = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), np = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function Li(t) {
  return t.data.opacity ?? 1;
}
function No(t, e) {
  return t.data[e];
}
function sp(t) {
  const e = {}, o = t.filter((n) => rp.has(n.type));
  if (o.length > 0) {
    const n = Li(o[0]), s = o.every((i) => Li(i) === n);
    e.opacity = s ? n : "mixed";
  }
  const r = t.filter((n) => np.has(n.type));
  if (r.length > 0) {
    const n = No(r[0], "borderColor"), s = r.every(
      (d) => No(d, "borderColor") === n
    );
    e.borderColor = s ? n ?? null : "mixed";
    const i = No(r[0], "borderWidth") ?? 1, a = r.every(
      (d) => (No(d, "borderWidth") ?? 1) === i
    );
    e.borderWidth = a ? i : "mixed";
    const l = No(r[0], "borderStyle") ?? "solid", c = r.every(
      (d) => (No(d, "borderStyle") ?? "solid") === l
    );
    e.borderStyle = c ? l : "mixed";
  }
  return e;
}
function ip(t) {
  const [e, o] = $(t.mode), [r, n] = $(new Set(t.selection)), [, s] = $(0);
  if (bt(() => {
    const d = () => o(t.mode), p = () => {
      n(new Set(t.selection)), s((f) => f + 1);
    }, u = () => s((f) => f + 1);
    return t.on("mode", d), t.on("selection", p), t.on("change", u), () => {
      t.off("mode", d), t.off("selection", p), t.off("change", u);
    };
  }, [t]), r.size === 0)
    return e === "draw" || e === "shape" || e === "text" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
  const i = [];
  for (const d of r) {
    const p = t.getNode(d);
    p && i.push(p);
  }
  if (i.length === 0)
    return { target: { kind: "none" }, commonProps: {} };
  if (i.length === 1)
    return { target: { kind: "single", node: i[0] }, commonProps: {} };
  const a = /* @__PURE__ */ new Map();
  for (const d of i) {
    const p = a.get(d.type);
    p ? p.push(d) : a.set(d.type, [d]);
  }
  const l = [];
  for (const [d, p] of a)
    l.push({ type: d, nodes: p });
  const c = sp(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: l },
    commonProps: c
  };
}
const en = es(null);
function Fe(t, e) {
  const o = gr(en);
  return at(
    (r) => {
      if (o && o.length > 1) {
        const n = o.map((s) => ({
          id: s.id,
          patch: {
            data: { ...s.data, ...r }
          }
        }));
        t.batchUpdateWithHistory(n);
      } else
        t.updateNodeWithHistory(e.id, {
          data: { ...e.data, ...r }
        });
    },
    [t, e, o]
  );
}
function Ae({
  value: t,
  onChange: e,
  mixed: o
}) {
  const r = Ut(), { labels: n } = jt(), s = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ k("div", { style: Bt, children: [
    /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorOpacity }),
    /* @__PURE__ */ h(
      "input",
      {
        type: "range",
        min: 0,
        max: 100,
        value: s,
        onChange: (i) => e(parseInt(i.target.value) / 100),
        style: { flex: 1, accentColor: r.accentColor }
      }
    ),
    /* @__PURE__ */ h("span", { style: { width: 28, textAlign: "right", fontSize: 10, color: o ? r.textFaint : r.text }, children: o ? "--" : s })
  ] });
}
const ap = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function ke({
  label: t,
  palettes: e,
  value: o,
  onChange: r,
  allowNull: n,
  mixed: s
}) {
  const i = Ut(), { labels: a } = jt(), [l, c] = $(""), [d, p] = $(0), [u, f] = $(!1), m = ct(null), y = ct(null), [g, x] = $(null), [b, v] = $("bottom"), M = e[d] ?? e[0], C = M.name === "Standard" ? a.paletteStandard : M.name, P = o == null ? void 0 : o.toLowerCase();
  bt(() => {
    if (!u) return;
    const E = (X) => {
      m.current && !m.current.contains(X.target) && f(!1);
    };
    return document.addEventListener("mousedown", E), () => document.removeEventListener("mousedown", E);
  }, [u]), bt(() => {
    if (!u) return;
    const E = () => {
      const X = y.current;
      if (!X) return;
      const nt = X.getBoundingClientRect(), ot = e.length * 30 + 10, J = window.innerHeight - nt.bottom, lt = nt.top, H = J < ot && lt > J;
      v(H ? "top" : "bottom"), x({
        top: H ? nt.top - 4 : nt.bottom + 4,
        left: nt.right
      });
    };
    return E(), window.addEventListener("resize", E), window.addEventListener("scroll", E, !0), () => {
      window.removeEventListener("resize", E), window.removeEventListener("scroll", E, !0);
    };
  }, [u]);
  const F = () => {
    const E = l.trim();
    if (!E) return;
    const X = E.startsWith("#") ? E : `#${E}`;
    ap.test(X) && (r(X), c(""));
  }, B = e.some(
    (E) => E.colors.some((X) => X.toLowerCase() === P)
  );
  return /* @__PURE__ */ k("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 }, children: [
    /* @__PURE__ */ h("span", { style: { ...Wt, color: i.textMuted, paddingTop: 2 }, children: t }),
    /* @__PURE__ */ k("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ k("div", { style: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }, children: [
        n && /* @__PURE__ */ h(
          "button",
          {
            onClick: () => r(null),
            title: a.inspectorNone,
            style: {
              ...Jt,
              width: 20,
              height: 20,
              background: "transparent",
              border: !s && o == null ? `2px solid ${i.swatchBorderActive}` : `2px solid ${i.textDisabled}`,
              borderRadius: "50%",
              position: "relative",
              overflow: "hidden"
            },
            children: /* @__PURE__ */ h(
              "div",
              {
                style: {
                  position: "absolute",
                  width: "140%",
                  height: 2,
                  background: i.error,
                  transform: "rotate(-45deg)",
                  top: "50%",
                  left: "-20%"
                }
              }
            )
          }
        ),
        M.colors.map((E) => {
          const X = !s && P === E.toLowerCase();
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => r(E),
              style: {
                ...Jt,
                width: 20,
                height: 20,
                background: E,
                border: X ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
                borderRadius: "50%"
              }
            },
            E
          );
        }),
        o && !B && !s && /* @__PURE__ */ h(
          "div",
          {
            style: {
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: o,
              border: `2px solid ${i.swatchBorderActive}`,
              flexShrink: 0
            }
          }
        ),
        s && /* @__PURE__ */ h("span", { style: { fontSize: 9, color: i.textMuted, fontStyle: "italic" }, children: a.inspectorMixed })
      ] }),
      e.length > 1 && /* @__PURE__ */ h("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ k("div", { ref: y, style: { position: "relative" }, children: [
        /* @__PURE__ */ k(
          "button",
          {
            onClick: () => f((E) => !E),
            title: a.inspectorSwitchPalette,
            style: {
              ...Jt,
              height: 24,
              padding: "0 8px",
              background: i.controlBg,
              color: i.textMuted,
              fontSize: 9,
              borderRadius: i.controlBorderRadius,
              display: "flex",
              alignItems: "center",
              gap: 4
            },
            children: [
              C,
              /* @__PURE__ */ h("span", { style: { fontSize: 7 }, children: u ? "▲" : "▼" })
            ]
          }
        ),
        u && g && Ve(
          /* @__PURE__ */ h(
            "div",
            {
              ref: m,
              style: {
                position: "fixed",
                top: g.top,
                left: g.left,
                transform: b === "top" ? "translate(-100%, -100%)" : "translateX(-100%)",
                background: i.panelBg,
                border: `1px solid ${i.border}`,
                borderRadius: i.panelBorderRadius,
                padding: 4,
                zIndex: 2e4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: 120,
                boxShadow: i.panelShadow
              },
              children: e.map((E, X) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    p(X), f(!1);
                  },
                  style: {
                    ...Jt,
                    height: 28,
                    padding: "0 8px",
                    background: X === d ? i.controlBgActive : "transparent",
                    color: i.text,
                    fontSize: 10,
                    borderRadius: i.controlBorderRadius,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    width: "100%",
                    justifyContent: "flex-start"
                  },
                  children: [
                    /* @__PURE__ */ h("span", { style: { display: "flex", gap: 2 }, children: E.colors.slice(0, 6).map((nt) => /* @__PURE__ */ h(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: nt,
                          display: "inline-block"
                        }
                      },
                      nt
                    )) }),
                    /* @__PURE__ */ h("span", { children: E.name === "Standard" ? a.paletteStandard : E.name })
                  ]
                },
                E.name
              ))
            }
          ),
          document.body
        )
      ] }) }),
      /* @__PURE__ */ h("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: l,
          onChange: (E) => c(E.target.value),
          onKeyDown: (E) => {
            E.key === "Enter" && F();
          },
          onBlur: F,
          placeholder: o ?? "#000000",
          style: {
            width: 84,
            height: 28,
            background: i.controlBg,
            border: `1px solid ${i.border}`,
            borderRadius: i.controlBorderRadius,
            color: i.text,
            fontSize: 10,
            fontFamily: "monospace",
            padding: "0 8px",
            outline: "none"
          }
        }
      ) })
    ] })
  ] });
}
function _o({
  label: t,
  value: e,
  onChange: o,
  mixed: r
}) {
  const n = Ut();
  return /* @__PURE__ */ k("div", { style: Bt, children: [
    /* @__PURE__ */ h("span", { style: { ...Wt, color: n.textMuted }, children: t }),
    zu.map((s) => /* @__PURE__ */ h(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...Jt,
          width: 36,
          height: 28,
          background: !r && e === s.key ? n.controlBgActive : n.controlBg,
          borderRadius: n.controlBorderRadius
        },
        children: /* @__PURE__ */ h("svg", { width: 24, height: 12, children: /* @__PURE__ */ h(
          "line",
          {
            x1: 2,
            y1: 6,
            x2: 22,
            y2: 6,
            stroke: n.text,
            strokeWidth: 2,
            strokeDasharray: s.dash
          }
        ) })
      },
      s.key
    ))
  ] });
}
function tr({
  label: t,
  widths: e = Pu,
  value: o,
  onChange: r,
  mixed: n
}) {
  const s = Ut();
  return /* @__PURE__ */ k("div", { style: Bt, children: [
    /* @__PURE__ */ h("span", { style: { ...Wt, color: s.textMuted }, children: t }),
    /* @__PURE__ */ h("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }, children: e.map((i) => /* @__PURE__ */ h(
      "button",
      {
        title: `${i}px`,
        onClick: () => r(i),
        style: {
          ...Jt,
          width: 30,
          height: 24,
          background: !n && o === i ? s.controlBgActive : s.controlBg,
          borderRadius: s.controlBorderRadius
        },
        children: /* @__PURE__ */ h(
          "div",
          {
            style: {
              width: 16,
              height: Math.max(i, 1),
              background: s.text,
              borderRadius: i / 2
            }
          }
        )
      },
      i
    )) })
  ] });
}
function kr({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: r,
  onChange: n
}) {
  const { labels: s } = jt();
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      ke,
      {
        label: s.inspectorBorder,
        palettes: Pe,
        value: t,
        onChange: (i) => n("borderColor", i ?? void 0),
        allowNull: !0,
        mixed: r == null ? void 0 : r.color
      }
    ),
    (t || (r == null ? void 0 : r.color)) && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h(
        _o,
        {
          label: s.inspectorStyle,
          value: e ?? "solid",
          onChange: (i) => n("borderStyle", i),
          mixed: r == null ? void 0 : r.style
        }
      ),
      /* @__PURE__ */ h(
        tr,
        {
          label: s.inspectorWidth,
          value: o ?? 1,
          onChange: (i) => n("borderWidth", i),
          mixed: r == null ? void 0 : r.width
        }
      )
    ] })
  ] });
}
const Rn = /* @__PURE__ */ new Map();
function be({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: r,
  onToggle: n,
  persistKey: s,
  children: i
}) {
  const a = Ut(), [l, c] = $(() => s && Rn.has(s) ? !!Rn.get(s) : e), d = r ?? l, p = o === "group", u = ct(null), [f, m] = $(0);
  return bt(() => {
    !s || r !== void 0 || Rn.set(s, d);
  }, [s, r, d]), Zr(() => {
    const y = u.current;
    if (!y) return;
    const g = () => m(y.scrollHeight);
    g();
    const x = new ResizeObserver(() => g());
    return x.observe(y), () => x.disconnect();
  }, [i]), /* @__PURE__ */ k(
    "section",
    {
      style: {
        border: `1px solid ${a.border}`,
        borderRadius: a.controlBorderRadius,
        background: p ? a.panelBg : a.controlBg,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch"
      },
      children: [
        /* @__PURE__ */ k(
          "button",
          {
            type: "button",
            onClick: () => {
              n ? n() : c((y) => !y);
            },
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "transparent",
              border: "none",
              color: p ? a.textMuted : a.textSecondary,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              padding: "8px 10px",
              cursor: "pointer"
            },
            children: [
              /* @__PURE__ */ h("span", { children: t }),
              /* @__PURE__ */ h(
                "span",
                {
                  style: {
                    color: a.textMuted,
                    display: "inline-block",
                    transform: d ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 170ms ease",
                    lineHeight: 1
                  },
                  children: "▸"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            style: {
              maxHeight: d ? f : 0,
              opacity: d ? 1 : 0,
              transition: "max-height 200ms ease, opacity 140ms ease",
              overflow: "hidden",
              pointerEvents: d ? "auto" : "none"
            },
            children: /* @__PURE__ */ h(
              "div",
              {
                ref: u,
                style: {
                  padding: "8px 10px 10px",
                  borderTop: `1px solid ${a.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: p ? "transparent" : a.controlBg
                },
                children: i
              }
            )
          }
        )
      ]
    }
  );
}
function Ps({ style: t }) {
  const e = Ut();
  return t === "hachure" ? /* @__PURE__ */ k("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ h("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ h("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ k("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ h("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: e.text, strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ h("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ h("rect", { x: 2, y: 2, width: 16, height: 12, fill: e.text, rx: 2 }) });
}
const lp = /* @__PURE__ */ k("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ h("path", { d: "m21 21-4.35-4.35" })
] });
function on({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: r
}) {
  var b, v;
  const n = Ut(), [s, i] = $(!1), [a, l] = $(""), c = ct(null), d = ct(null), [p, u] = $(null), f = a.trim().toLowerCase(), m = Kt(
    () => o.filter((M) => M.toLowerCase().includes(f)),
    [o, f]
  ), y = Kt(
    () => Br.filter(
      (M) => !o.includes(M.key) && (M.key.toLowerCase().includes(f) || M.label.toLowerCase().includes(f))
    ),
    [o, f]
  );
  bt(() => {
    if (!s || !d.current) return;
    const M = d.current.getBoundingClientRect(), C = 260, P = 16;
    let F = M.left;
    F + C > window.innerWidth - P && (F = window.innerWidth - C - P), F < P && (F = P), u({ top: M.bottom + 4, left: F });
  }, [s]), bt(() => {
    var P;
    if (!s) return;
    const M = (F) => {
      var nt, Y;
      const B = F.target;
      if ((nt = c.current) != null && nt.contains(B)) return;
      const X = (((Y = c.current) == null ? void 0 : Y.ownerDocument) ?? document).getElementById("font-picker-popover");
      X != null && X.contains(B) || i(!1);
    }, C = ((P = c.current) == null ? void 0 : P.ownerDocument) ?? document;
    return C.addEventListener("mousedown", M), () => C.removeEventListener("mousedown", M);
  }, [s]);
  const g = (M) => {
    e(M), i(!1), l("");
  }, x = (M, C) => {
    const P = (C == null ? void 0 : C.label) ?? M, F = C == null ? void 0 : C.category, B = t === M;
    return /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: () => g(M),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: B ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: oo(M),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (E) => {
          B || (E.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (E) => {
          B || (E.currentTarget.style.background = "transparent");
        },
        children: [
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                width: 24,
                flexShrink: 0,
                fontSize: 12,
                color: "#64748b",
                fontFamily: "sans-serif"
              },
              children: ac(F)
            }
          ),
          /* @__PURE__ */ h("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: P })
        ]
      },
      M
    );
  };
  return /* @__PURE__ */ k("div", { ref: c, style: { position: "relative", flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ k(
      "button",
      {
        ref: d,
        type: "button",
        onClick: () => i((M) => !M),
        style: {
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 28,
          padding: "0 8px",
          background: n.controlBg,
          color: n.text,
          border: `1px solid ${n.separator}`,
          borderRadius: n.controlBorderRadius,
          fontSize: 11,
          fontFamily: oo(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...r
        },
        children: [
          /* @__PURE__ */ h("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((b = Br.find((M) => M.key === t)) == null ? void 0 : b.label) ?? t }),
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                flexShrink: 0,
                opacity: 0.7,
                transform: s ? "rotate(180deg)" : "none",
                transition: "transform 0.15s"
              },
              children: "▼"
            }
          )
        ]
      }
    ),
    s && p && Ve(
      /* @__PURE__ */ k(
        "div",
        {
          id: "font-picker-popover",
          style: {
            position: "fixed",
            top: p.top,
            left: p.left,
            width: 260,
            maxHeight: Math.min(320, window.innerHeight - p.top - 16),
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            zIndex: 1e4,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          },
          children: [
            /* @__PURE__ */ k(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  borderBottom: "1px solid #eee",
                  background: "#fafafa"
                },
                children: [
                  /* @__PURE__ */ h("span", { style: { color: "#64748b", display: "flex" }, children: lp }),
                  /* @__PURE__ */ h(
                    "input",
                    {
                      type: "text",
                      placeholder: "Quick search",
                      value: a,
                      onChange: (M) => l(M.target.value),
                      autoFocus: !0,
                      style: {
                        flex: 1,
                        border: "none",
                        background: "transparent",
                        fontSize: 13,
                        outline: "none",
                        color: "#1e1e2e"
                      }
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ k("div", { style: { overflowY: "auto", padding: 8, flex: 1 }, children: [
              m.length > 0 && /* @__PURE__ */ k("div", { style: { marginBottom: 12 }, children: [
                /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 6,
                      paddingLeft: 4
                    },
                    children: "In this scene"
                  }
                ),
                m.map((M) => x(M, Br.find((C) => C.key === M)))
              ] }),
              /* @__PURE__ */ k("div", { children: [
                /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#64748b",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: 6,
                      paddingLeft: 4
                    },
                    children: "Available fonts"
                  }
                ),
                y.length > 0 ? y.map((M) => x(M.key, M)) : /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      padding: "12px",
                      fontSize: 12,
                      color: "#94a3b8"
                    },
                    children: a ? "No fonts match your search" : "All fonts are in use"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      (((v = c.current) == null ? void 0 : v.ownerDocument) ?? document).body
    )
  ] });
}
function As({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "sharp" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", ...o }),
    t === "round" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4", ...o })
  ] });
}
const cp = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], dp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function hp({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function mo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function up({ engine: t, node: e, fontsInScene: o }) {
  const r = Ut(), { labels: n } = jt(), s = Fe(t, e), i = gr(en) ?? [e], { data: a } = e, l = a.fill ?? null, c = a.fillStyle ?? "hachure", d = a.strokeStyle ?? "solid", p = mo(i, (b) => b.data.stroke), u = mo(i, (b) => b.data.fill ?? null), f = mo(i, (b) => b.data.fillStyle ?? "hachure"), m = mo(i, (b) => b.data.strokeStyle ?? "solid"), y = mo(i, (b) => b.data.strokeWidth), g = mo(i, (b) => b.data.roughness), x = mo(i, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k(be, { title: n.inspectorStructure, persistKey: "shape.structure", children: [
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorShape }),
        dp.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ shape: b.key }),
            style: {
              ...Jt,
              width: 28,
              height: 28,
              background: a.shape === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(hp, { name: b.key })
          },
          b.key
        ))
      ] }),
      (a.shape === "rect" || a.shape === "diamond") && /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorEdges }),
        [
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" }
        ].map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ edgeStyle: b.key === "sharp" ? void 0 : b.key }),
            style: {
              ...Jt,
              width: 28,
              height: 28,
              background: (a.edgeStyle ?? "sharp") === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(As, { name: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorLabel }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "text",
            value: a.label ?? "",
            placeholder: n.inspectorLabel,
            onChange: (b) => s({ label: b.target.value || void 0 }),
            style: {
              flex: 1,
              fontSize: 12,
              padding: "4px 6px",
              background: r.controlBg,
              color: r.text,
              border: `1px solid ${r.border}`,
              borderRadius: r.controlBorderRadius,
              outline: "none"
            }
          }
        )
      ] })
    ] }),
    a.label && /* @__PURE__ */ k(be, { title: n.inspectorTypography, defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          on,
          {
            value: a.labelFontFamily ?? "Excalifont",
            onChange: (b) => s({ labelFontFamily: b === "Excalifont" ? void 0 : b }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorSize }),
        cp.map((b) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ labelFontSize: b.size === 14 ? void 0 : b.size }),
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: (a.labelFontSize ?? 14) === b.size ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              fontWeight: 600,
              borderRadius: r.controlBorderRadius
            },
            children: b.label
          },
          b.size
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorAlign }),
        zs.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.key,
            onClick: () => s({ labelAlign: b.key === "center" ? void 0 : b.key }),
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: (a.labelAlign ?? "center") === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: b.label
          },
          b.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ k(be, { title: n.inspectorAppearance, persistKey: "shape.appearance", children: [
      /* @__PURE__ */ h(
        ke,
        {
          label: n.inspectorStroke,
          palettes: Pe,
          value: p ? void 0 : a.stroke,
          mixed: p,
          onChange: (b) => s({ stroke: b })
        }
      ),
      /* @__PURE__ */ h(
        ke,
        {
          label: n.inspectorFill,
          palettes: Ts,
          value: u ? void 0 : l,
          mixed: u,
          onChange: (b) => s({ fill: b ?? void 0 }),
          allowNull: !0
        }
      ),
      l && !u && /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFillPattern }),
        Ms.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ fillStyle: b.key }),
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: !f && c === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(Ps, { style: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ h(
        _o,
        {
          label: n.inspectorStrokeStyle,
          value: d,
          mixed: m,
          onChange: (b) => s({ strokeStyle: b })
        }
      ),
      /* @__PURE__ */ h(
        tr,
        {
          label: n.inspectorStrokeWidth,
          widths: Is,
          value: a.strokeWidth,
          mixed: y,
          onChange: (b) => s({ strokeWidth: b })
        }
      ),
      /* @__PURE__ */ h(
        Ae,
        {
          value: a.opacity ?? 1,
          mixed: x,
          onChange: (b) => s({ opacity: b })
        }
      )
    ] }),
    /* @__PURE__ */ h(be, { title: n.inspectorSketch, defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorRoughness }),
      Cs.map((b) => {
        const v = b.value === 0 ? n.roughnessArchitect : b.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: v,
            onClick: () => s({ roughness: b.value }),
            style: {
              ...Jt,
              height: 28,
              padding: "0 8px",
              background: !g && a.roughness === b.value ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: v
          },
          b.value
        );
      })
    ] }) })
  ] });
}
function Ho(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function pp({ engine: t, node: e }) {
  const o = Ut(), { labels: r } = jt(), n = Fe(t, e), s = gr(en) ?? [e], { data: i } = e, a = i.fill ?? null, l = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", d = Ho(s, (g) => g.data.color), p = Ho(s, (g) => g.data.fill ?? null), u = Ho(s, (g) => g.data.fillStyle ?? "hachure"), f = Ho(s, (g) => g.data.strokeStyle ?? "solid"), m = Ho(s, (g) => g.data.strokeWidth), y = Ho(s, (g) => g.data.opacity ?? 1);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      ke,
      {
        label: r.inspectorStroke,
        palettes: Pe,
        value: d ? void 0 : i.color,
        mixed: d,
        onChange: (g) => n({ color: g })
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        label: r.inspectorFill,
        palettes: Ts,
        value: p ? void 0 : a,
        mixed: p,
        onChange: (g) => n({ fill: g ?? void 0 }),
        allowNull: !0
      }
    ),
    a && !p && /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorFillPattern }),
      Ms.map((g) => /* @__PURE__ */ h(
        "button",
        {
          title: g.label,
          onClick: () => n({ fillStyle: g.key }),
          style: {
            ...Jt,
            width: 36,
            height: 28,
            background: !u && l === g.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(Ps, { style: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ h(
      _o,
      {
        label: r.inspectorStrokeStyle,
        value: c,
        mixed: f,
        onChange: (g) => n({ strokeStyle: g })
      }
    ),
    /* @__PURE__ */ h(
      tr,
      {
        label: r.inspectorStrokeWidth,
        widths: Ua,
        value: i.strokeWidth,
        mixed: m,
        onChange: (g) => n({ strokeWidth: g })
      }
    ),
    /* @__PURE__ */ h(
      Ae,
      {
        value: i.opacity ?? 1,
        mixed: y,
        onChange: (g) => n({ opacity: g })
      }
    )
  ] });
}
function fp({ engine: t, node: e, fontsInScene: o }) {
  const r = Ut(), { labels: n } = jt(), s = Fe(t, e), { data: i } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k(be, { title: n.inspectorTypography, persistKey: "text.typography", children: [
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          on,
          {
            value: i.fontFamily,
            onChange: (a) => s({ fontFamily: a }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorSize }),
        Za.map((a) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ fontSize: a }),
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: i.fontSize === a ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              borderRadius: r.controlBorderRadius
            },
            children: a
          },
          a
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorAlign }),
        zs.map((a) => /* @__PURE__ */ h(
          "button",
          {
            title: a.key,
            onClick: () => s({ align: a.key }),
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: i.align === a.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: a.label
          },
          a.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ k(be, { title: n.inspectorAppearance, persistKey: "text.appearance", children: [
      /* @__PURE__ */ h(
        ke,
        {
          label: n.inspectorStroke,
          palettes: Pe,
          value: i.color,
          onChange: (a) => s({ color: a })
        }
      ),
      /* @__PURE__ */ h(
        kr,
        {
          borderColor: i.borderColor ?? null,
          borderStyle: i.borderStyle,
          borderWidth: i.borderWidth,
          onChange: (a, l) => s({ [a]: l })
        }
      ),
      /* @__PURE__ */ h(
        Ae,
        {
          value: i.opacity ?? 1,
          onChange: (a) => s({ opacity: a })
        }
      )
    ] })
  ] });
}
function yp({ engine: t, node: e }) {
  const o = Ut(), { labels: r } = jt(), n = Fe(t, e), { data: s } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k(be, { title: r.edgeLineSection, persistKey: "edge.line", children: [
      /* @__PURE__ */ h(
        ke,
        {
          label: r.edgeColor,
          palettes: Pe,
          value: s.color,
          onChange: (i) => n({ color: i })
        }
      ),
      /* @__PURE__ */ h(
        _o,
        {
          label: r.inspectorStyle,
          value: s.style,
          onChange: (i) => n({ style: i })
        }
      ),
      /* @__PURE__ */ h(
        tr,
        {
          label: r.inspectorWidth,
          widths: Tu,
          value: s.strokeWidth,
          onChange: (i) => n({ strokeWidth: i })
        }
      )
    ] }),
    /* @__PURE__ */ k(be, { title: r.edgeArrowsSection, persistKey: "edge.arrows", children: [
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((i) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ arrowHead: i }),
            style: {
              ...Jt,
              height: 28,
              padding: "0 6px",
              background: (s.arrowHead ?? "none") === i ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: i === "none" ? r.inspectorNone : i === "arrow" ? "▷" : i === "filled" ? "▶" : "●"
          },
          i
        ))
      ] }),
      (s.arrowHead ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeHeadSize }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: s.arrowHeadSize ?? Math.max(8, s.strokeWidth * 3),
            onChange: (i) => n({ arrowHeadSize: Number(i.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ h("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: s.arrowHeadSize ?? Math.max(8, s.strokeWidth * 3) })
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((i) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ arrowTail: i }),
            style: {
              ...Jt,
              height: 28,
              padding: "0 6px",
              background: (s.arrowTail ?? "none") === i ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: i === "none" ? r.inspectorNone : i === "arrow" ? "◁" : i === "filled" ? "◀" : "●"
          },
          i
        ))
      ] }),
      (s.arrowTail ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeTailSize }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: s.arrowTailSize ?? Math.max(8, s.strokeWidth * 3),
            onChange: (i) => n({ arrowTailSize: Number(i.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ h("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: s.arrowTailSize ?? Math.max(8, s.strokeWidth * 3) })
      ] })
    ] }),
    /* @__PURE__ */ k(be, { title: r.edgePathMotionSection, defaultOpen: !1, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.edgePath }),
        [
          { key: "bezier", label: r.edgeBezier },
          { key: "straight", label: r.edgeStraight },
          { key: "smoothstep", label: r.edgeSmooth },
          { key: "step", label: r.edgeStep }
        ].map((i) => /* @__PURE__ */ h(
          "button",
          {
            title: i.label,
            onClick: () => n({ edgeType: i.key }),
            style: {
              ...Jt,
              height: 28,
              padding: "0 6px",
              background: (s.edgeType ?? "bezier") === i.key ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 9,
              borderRadius: o.controlBorderRadius
            },
            children: i.label
          },
          i.key
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeAnimate }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ animated: !s.animated }),
            style: {
              ...Jt,
              height: 28,
              padding: "0 12px",
              background: s.animated ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: s.animated ? r.inspectorOn : r.inspectorOff
          }
        )
      ] }),
      s.animated && /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeDirection }),
        ["forward", "reverse", "both", "bop"].map((i) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ animatedDirection: i }),
            style: {
              ...Jt,
              height: 28,
              padding: "0 6px",
              background: (s.animatedDirection ?? "forward") === i ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 10,
              borderRadius: o.controlBorderRadius
            },
            children: i === "forward" ? "→" : i === "reverse" ? "←" : i === "both" ? "⇆" : "~"
          },
          i
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorRoughness }),
        Cs.map((i) => {
          const a = i.value === 0 ? r.roughnessArchitect : i.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
          return /* @__PURE__ */ h(
            "button",
            {
              title: a,
              onClick: () => n({ roughness: i.value }),
              style: {
                ...Jt,
                height: 28,
                padding: "0 8px",
                background: (s.roughness ?? 0) === i.value ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 9,
                borderRadius: o.controlBorderRadius
              },
              children: a
            },
            i.value
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ h(be, { title: r.inspectorLabel, defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeText }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: s.label ?? "",
          onChange: (i) => n({ label: i.target.value || void 0 }),
          placeholder: r.edgeLabelPlaceholder,
          style: {
            flex: 1,
            background: o.controlBg,
            color: o.text,
            border: "none",
            borderRadius: o.controlBorderRadius,
            padding: "4px 8px",
            fontSize: 11,
            outline: "none"
          }
        }
      )
    ] }) })
  ] });
}
function gp({ engine: t, node: e }) {
  const o = Ut(), { labels: r } = jt(), [n, s] = $("idle"), i = Fe(t, e), { data: a } = e, l = !!a.crop;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      kr,
      {
        borderColor: a.borderColor ?? null,
        borderStyle: a.borderStyle,
        borderWidth: a.borderWidth,
        onChange: (c, d) => i({ [c]: d })
      }
    ),
    /* @__PURE__ */ k("div", { style: { ...Bt, marginTop: 4 }, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorCrop }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.requestImageCrop(e.id),
          style: {
            ...Jt,
            height: 28,
            padding: "0 10px",
            background: o.controlBg,
            color: o.text,
            fontSize: 10,
            borderRadius: o.controlBorderRadius
          },
          children: r.inspectorCrop
        }
      ),
      l && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => i({ crop: void 0 }),
          style: {
            ...Jt,
            height: 28,
            padding: "0 10px",
            background: o.controlBg,
            color: o.textMuted,
            fontSize: 10,
            borderRadius: o.controlBorderRadius
          },
          children: r.inspectorReset
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: { ...Bt, marginTop: 4 }, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorBackground }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: async () => {
            if (n !== "loading") {
              s("loading");
              try {
                const { removeBackground: c } = await import("@imgly/background-removal"), p = await (await fetch(a.src)).blob(), u = await c(p), f = new FileReader(), m = await new Promise((y, g) => {
                  f.onload = () => y(f.result), f.onerror = g, f.readAsDataURL(u);
                });
                i({ src: m }), s("idle");
              } catch (c) {
                console.error("Background removal failed:", c), s("error"), setTimeout(() => s("idle"), 3e3);
              }
            }
          },
          disabled: n === "loading",
          style: {
            ...Jt,
            height: 28,
            padding: "0 10px",
            background: n === "error" ? o.error : o.controlBg,
            color: o.text,
            fontSize: 10,
            borderRadius: o.controlBorderRadius,
            gap: 4,
            opacity: n === "loading" ? 0.6 : 1
          },
          children: n === "loading" ? r.inspectorRemoving : n === "error" ? r.inspectorFailed : r.inspectorRemoveBg
        }
      )
    ] }),
    /* @__PURE__ */ h(
      Ae,
      {
        value: a.opacity ?? 1,
        onChange: (c) => i({ opacity: c })
      }
    )
  ] });
}
function mp({ engine: t, node: e }) {
  const o = Ut(), r = Fe(t, e), { data: n } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      kr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ h(
        "button",
        {
          title: s.label,
          onClick: () => r({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...Jt,
            width: 28,
            height: 28,
            background: (n.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(As, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Ae,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
const ur = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, bp = wu();
function xp({
  value: t,
  onChange: e,
  theme: o,
  durationLabel: r,
  msLabel: n
}) {
  const [s, i] = $(String(t));
  bt(() => i(String(t)), [t]);
  const a = () => {
    const l = parseInt(s, 10);
    !isNaN(l) && l >= 100 && l <= 5e3 ? e(l) : i(String(t));
  };
  return /* @__PURE__ */ k("div", { style: Bt, children: [
    /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r }),
    /* @__PURE__ */ h(
      "input",
      {
        type: "number",
        min: 100,
        max: 5e3,
        step: 50,
        value: s,
        onChange: (l) => i(l.target.value),
        onBlur: a,
        onKeyDown: (l) => {
          l.key === "Enter" && a();
        },
        style: {
          width: 64,
          background: o.controlBg,
          color: o.text,
          border: "none",
          borderRadius: o.controlBorderRadius,
          padding: "4px 6px",
          fontSize: 11,
          outline: "none"
        }
      }
    ),
    /* @__PURE__ */ h("span", { style: { fontSize: 10, color: o.textMuted }, children: n })
  ] });
}
function wp({ engine: t, node: e }) {
  const o = Ut(), { labels: r } = jt(), n = Fe(t, e), { data: s } = e, i = at(
    (d) => {
      var y;
      if (!d) {
        n({ devicePreset: void 0 });
        return;
      }
      const p = $n(d);
      if (!p) return;
      const u = Ka(p), f = Math.round(e.w / u), m = { devicePreset: d };
      (!s.label || ((y = $n(s.devicePreset ?? "")) == null ? void 0 : y.label) === s.label) && (m.label = p.label), n(m), t.updateNodeWithHistory(e.id, { h: f });
    },
    [t, e, s.label, s.devicePreset, n]
  ), a = Kt(() => {
    const d = t.getAllNodes().filter((y) => y.type === "frame"), p = d.length, u = /* @__PURE__ */ new Set();
    for (const y of d)
      y.id !== e.id && y.data.slideOrder != null && u.add(y.data.slideOrder);
    const f = [];
    for (let y = 1; y <= p; y++)
      u.has(y) || f.push(y);
    const m = e.data.slideOrder;
    return m != null && !f.includes(m) && (f.push(m), f.sort((y, g) => y - g)), f;
  }, [t, e]), l = {
    pan: r.transitionPan,
    fade: r.transitionFadeToBlack,
    dissolve: r.transitionDissolve,
    zoom: r.transitionZoom,
    fold: r.transitionFold,
    cube: r.transitionCube,
    none: r.transitionNoneInstant
  }, c = {
    Phones: r.deviceGroupPhones,
    "Phones (Landscape)": r.deviceGroupPhonesLandscape,
    Tablets: r.deviceGroupTablets,
    "Tablets (Landscape)": r.deviceGroupTabletsLandscape,
    Devices: r.deviceGroupDevices,
    Standard: r.deviceGroupStandard
  };
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorLabel }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: s.label ?? "",
          onChange: (d) => n({ label: d.target.value || void 0 }),
          placeholder: r.frameLabelPlaceholder,
          style: {
            flex: 1,
            background: o.controlBg,
            color: o.text,
            border: "none",
            borderRadius: o.controlBorderRadius,
            padding: "4px 8px",
            fontSize: 11,
            outline: "none"
          }
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.frameDevice }),
      /* @__PURE__ */ k(
        "select",
        {
          value: s.devicePreset ?? "",
          onChange: (d) => i(d.target.value),
          style: {
            flex: 1,
            background: o.controlBg,
            color: o.text,
            border: "none",
            borderRadius: o.controlBorderRadius,
            padding: "4px 6px",
            fontSize: 11,
            outline: "none",
            cursor: "pointer"
          },
          children: [
            /* @__PURE__ */ h("option", { value: "", children: r.frameFreeform }),
            bp.map((d) => /* @__PURE__ */ h("optgroup", { label: c[d.label] ?? d.label, children: d.presets.map((p) => /* @__PURE__ */ k("option", { value: p.key, children: [
              p.label,
              " (",
              p.w,
              "×",
              p.h,
              ")"
            ] }, p.key)) }, d.label))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ h(
      ke,
      {
        label: r.inspectorBackground,
        palettes: Pe,
        value: (() => {
          const d = s.backgroundColor;
          if (!d) return null;
          for (const p of Pe) {
            const u = p.colors.find((f) => d === `${f}15`);
            if (u) return u;
          }
          return d.length === 9 && d.endsWith("15") ? d.slice(0, 7) : null;
        })(),
        onChange: (d) => n({ backgroundColor: d ? `${d}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        label: r.inspectorBorder,
        palettes: Pe,
        value: s.borderColor,
        onChange: (d) => n({ borderColor: d })
      }
    ),
    /* @__PURE__ */ h(
      _o,
      {
        label: r.inspectorStyle,
        value: s.borderStyle ?? "dashed",
        onChange: (d) => n({ borderStyle: d })
      }
    ),
    /* @__PURE__ */ h(
      tr,
      {
        label: r.inspectorWidth,
        value: s.borderWidth ?? 1,
        onChange: (d) => n({ borderWidth: d })
      }
    ),
    /* @__PURE__ */ h(
      Ae,
      {
        value: s.opacity ?? 1,
        onChange: (d) => n({ opacity: d })
      }
    ),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.frameSlideNumber }),
      /* @__PURE__ */ k(
        "select",
        {
          value: s.slideOrder ?? "",
          onChange: (d) => {
            const p = d.target.value;
            n({ slideOrder: p ? parseInt(p, 10) : void 0 });
          },
          style: {
            width: 72,
            background: o.controlBg,
            color: o.text,
            border: "none",
            borderRadius: o.controlBorderRadius,
            padding: "4px 6px",
            fontSize: 11,
            outline: "none",
            cursor: "pointer"
          },
          children: [
            /* @__PURE__ */ h("option", { value: "", children: r.frameAuto }),
            a.map((d) => /* @__PURE__ */ h("option", { value: d, children: d }, d))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.frameTransition }),
      /* @__PURE__ */ k(
        "select",
        {
          value: s.transition ?? "pan",
          onChange: (d) => {
            const p = d.target.value;
            n({ transition: p === "pan" ? void 0 : p, transitionDuration: void 0 });
          },
          style: {
            flex: 1,
            background: o.controlBg,
            color: o.text,
            border: "none",
            borderRadius: o.controlBorderRadius,
            padding: "4px 6px",
            fontSize: 11,
            outline: "none",
            cursor: "pointer"
          },
          children: [
            /* @__PURE__ */ h("option", { value: "pan", children: l.pan }),
            /* @__PURE__ */ h("option", { value: "fade", children: l.fade }),
            /* @__PURE__ */ h("option", { value: "dissolve", children: l.dissolve }),
            /* @__PURE__ */ h("option", { value: "zoom", children: l.zoom }),
            /* @__PURE__ */ h("option", { value: "fold", children: l.fold }),
            /* @__PURE__ */ h("option", { value: "cube", children: l.cube }),
            /* @__PURE__ */ h("option", { value: "none", children: l.none })
          ]
        }
      )
    ] }),
    (s.transition ?? "pan") !== "none" && /* @__PURE__ */ h(
      xp,
      {
        value: s.transitionDuration ?? ur[s.transition ?? "pan"],
        onChange: (d) => n({ transitionDuration: d === ur[s.transition ?? "pan"] ? void 0 : d }),
        theme: o,
        durationLabel: r.frameDuration,
        msLabel: r.frameMilliseconds
      }
    )
  ] });
}
function kp({ engine: t, node: e }) {
  const o = Ut(), { labels: r } = jt(), n = Fe(t, e), { data: s } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      ke,
      {
        label: r.inspectorStroke,
        palettes: Eu,
        value: s.color,
        onChange: (i) => {
          i && n({ color: i });
        }
      }
    ),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorSize }),
      [12, 14, 16, 20, 24].map((i) => /* @__PURE__ */ h(
        "button",
        {
          onClick: () => n({ fontSize: i }),
          style: {
            ...Jt,
            width: 32,
            height: 24,
            background: (s.fontSize ?? 16) === i ? o.controlBgActive : o.controlBg,
            borderRadius: o.controlBorderRadius,
            fontSize: 10,
            color: o.text
          },
          children: i
        },
        i
      ))
    ] }),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorEdges }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((i) => /* @__PURE__ */ h(
        "button",
        {
          title: i.label,
          onClick: () => n({ edgeStyle: i.key === "sharp" ? void 0 : i.key }),
          style: {
            ...Jt,
            width: 28,
            height: 28,
            background: (s.edgeStyle ?? "sharp") === i.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(As, { name: i.key })
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Ae,
      {
        value: s.opacity ?? 1,
        onChange: (i) => n({ opacity: i })
      }
    )
  ] });
}
function vp({ engine: t, node: e }) {
  const o = Ut(), r = Fe(t, e), { data: n } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: "URL" }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: n.url,
          readOnly: !0,
          style: {
            flex: 1,
            background: o.controlBg,
            color: o.textMuted,
            border: "none",
            borderRadius: o.controlBorderRadius,
            padding: "4px 8px",
            fontSize: 10,
            outline: "none",
            cursor: "default"
          },
          onClick: (s) => s.target.select()
        }
      )
    ] }),
    /* @__PURE__ */ h(
      kr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ h(
      Ae,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function Sp({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const Mp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Cp({ engine: t, mode: e, fontsInScene: o }) {
  const r = Ut(), { labels: n } = jt(), [, s] = $(0), i = at(() => s((y) => y + 1), []), a = t.activeTool;
  if (e === "text") {
    const y = a.fontFamily ?? eo, g = a.fontSize ?? 20, x = a.textAlign ?? "left", b = a.color;
    return /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          on,
          {
            value: y,
            onChange: (v) => {
              a.fontFamily = v, i();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorSize }),
        Za.map((v) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              a.fontSize = v, i();
            },
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: g === v ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              borderRadius: r.controlBorderRadius
            },
            children: v
          },
          v
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Bt, children: [
        /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorAlign }),
        zs.map((v) => /* @__PURE__ */ h(
          "button",
          {
            title: v.key,
            onClick: () => {
              a.textAlign = v.key, i();
            },
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: x === v.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: v.label
          },
          v.key
        ))
      ] }),
      /* @__PURE__ */ h(
        ke,
        {
          label: n.inspectorStroke,
          palettes: Pe,
          value: b,
          onChange: (v) => {
            a.color = v, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        Ae,
        {
          value: a.opacity ?? 1,
          onChange: (v) => {
            a.opacity = v, i();
          }
        }
      )
    ] });
  }
  const l = e === "shape", c = a.color, d = a.fillColor ?? null, p = a.fillStyle ?? "hachure", u = a.strokeStyle ?? "solid", f = a.width, m = a.roughness ?? 1;
  return /* @__PURE__ */ k(mt, { children: [
    l && /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorShape }),
      Mp.map((y) => /* @__PURE__ */ h(
        "button",
        {
          title: y.label,
          onClick: () => {
            a.shapeType = y.key, i();
          },
          style: {
            ...Jt,
            width: 28,
            height: 28,
            background: (a.shapeType ?? "rect") === y.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ h(Sp, { name: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ h(
      ke,
      {
        label: n.inspectorStroke,
        palettes: Pe,
        value: c,
        onChange: (y) => {
          a.color = y, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      ke,
      {
        label: n.inspectorFill,
        palettes: Ts,
        value: d,
        onChange: (y) => {
          a.fillColor = y ?? void 0, i();
        },
        allowNull: !0
      }
    ),
    d && /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFillPattern }),
      Ms.map((y) => /* @__PURE__ */ h(
        "button",
        {
          title: y.label,
          onClick: () => {
            a.fillStyle = y.key, i();
          },
          style: {
            ...Jt,
            width: 36,
            height: 28,
            background: p === y.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ h(Ps, { style: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ h(
      _o,
      {
        label: n.inspectorStrokeStyle,
        value: u,
        onChange: (y) => {
          a.strokeStyle = y, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      tr,
      {
        label: n.inspectorStrokeWidth,
        widths: l ? Is : Ua,
        value: f,
        onChange: (y) => {
          a.width = y, i();
        }
      }
    ),
    l && /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorRoughness }),
      Cs.map((y) => {
        const g = y.value === 0 ? n.roughnessArchitect : y.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: g,
            onClick: () => {
              a.roughness = y.value, i();
            },
            style: {
              ...Jt,
              height: 28,
              padding: "0 8px",
              background: m === y.value ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: g
          },
          y.value
        );
      })
    ] }),
    /* @__PURE__ */ h(
      Ae,
      {
        value: a.opacity ?? 1,
        onChange: (y) => {
          a.opacity = y, i();
        }
      }
    )
  ] });
}
function Ip({ engine: t, node: e, PanelComponent: o }) {
  const r = Fe(t, e);
  return /* @__PURE__ */ h(o, { node: e, data: e.data, engine: t, updateData: r });
}
const zp = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), Tp = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function Qa(t) {
  return {
    shape: t.typeShape,
    draw: t.typeDrawing,
    text: t.typeText,
    edge: t.typeEdge,
    image: t.typeImage,
    content: t.typeContent,
    frame: t.typeFrame,
    sticky: t.typeStickyNote,
    youtube: t.typeYouTube
  };
}
function Pp(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t.getAllNodes()) {
    let n;
    r.type === "text" ? n = r.data.fontFamily : r.type === "shape" && (n = r.data.labelFontFamily), n && !e.has(n) && (e.add(n), o.push(n));
  }
  return o;
}
function Ap({ label: t }) {
  const e = Ut();
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: e.textSecondary,
        padding: "2px 0 6px",
        borderBottom: `1px solid ${e.border}`,
        marginBottom: 2
      },
      children: t
    }
  );
}
function Ep({
  engine: t,
  open: e,
  onToggle: o
}) {
  const r = Ut(), { labels: n } = jt(), [s, i] = $(t.snapToGrid), [a, l] = $(t.gridSize), [c, d] = $(t.smartGuides), [p, u] = $(t.boardBackground), f = {
    "plain-white": n.paperWhite,
    "dot-grid": n.paperCream,
    engineering: n.paperWarm,
    blueprint: n.paperBlueprint,
    "dark-grid": n.paperNight,
    "japanese-stationery": n.paperJapaneseStationery,
    kraft: n.paperKraftPaper
  };
  bt(() => {
    const y = () => {
      i(t.snapToGrid), l(t.gridSize), d(t.smartGuides);
    }, g = () => u(t.boardBackground);
    return t.on("guides", y), t.on("background", g), () => {
      t.off("guides", y), t.off("background", g);
    };
  }, [t]);
  const m = [10, 20, 40, 80];
  return /* @__PURE__ */ k(be, { title: n.inspectorCanvas, defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorGrid }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.toggleSnapToGrid(),
          style: {
            border: "none",
            borderRadius: r.controlBorderRadius,
            background: s ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: s ? n.inspectorOn : n.inspectorOff
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorGridSize }),
      /* @__PURE__ */ h("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }, children: m.map((y) => /* @__PURE__ */ k(
        "button",
        {
          onClick: () => t.setGridSize(y),
          style: {
            border: "none",
            borderRadius: r.controlBorderRadius,
            background: a === y ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 10,
            padding: "4px 8px",
            cursor: "pointer"
          },
          children: [
            y,
            "px"
          ]
        },
        y
      )) })
    ] }),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorGuides }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.toggleSmartGuides(),
          style: {
            border: "none",
            borderRadius: r.controlBorderRadius,
            background: c ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: c ? n.inspectorOn : n.inspectorOff
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: Bt, children: [
      /* @__PURE__ */ h("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorPaper }),
      /* @__PURE__ */ h(
        "select",
        {
          value: p,
          onChange: (y) => t.setBoardBackground(y.target.value),
          style: {
            flex: 1,
            height: 28,
            border: `1px solid ${r.border}`,
            borderRadius: r.controlBorderRadius,
            background: r.controlBg,
            color: r.text,
            fontSize: 11,
            padding: "0 8px",
            outline: "none"
          },
          children: Zo.map((y) => /* @__PURE__ */ h("option", { value: y.key, children: f[y.key] ?? y.label }, y.key))
        }
      )
    ] })
  ] });
}
function Ja({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: r
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ h(up, { engine: t, node: e, fontsInScene: r });
    case "draw":
      return /* @__PURE__ */ h(pp, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ h(fp, { engine: t, node: e, fontsInScene: r });
    case "edge":
      return /* @__PURE__ */ h(yp, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ h(gp, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ h(mp, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ h(wp, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ h(kp, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ h(vp, { engine: t, node: e });
    default: {
      const n = o == null ? void 0 : o.get(e.type);
      return n != null && n.propertiesPanel ? /* @__PURE__ */ h(Ip, { engine: t, node: e, PanelComponent: n.propertiesPanel }) : null;
    }
  }
}
function Di({
  engine: t,
  nodes: e
}) {
  const o = Ut(), { labels: r } = jt(), n = Math.round(e[0].rotation ?? 0), i = e.every(
    (d) => Math.round(d.rotation ?? 0) === n
  ) ? n : null, [a, l] = $(null), c = at(
    (d) => {
      l(null);
      const p = parseFloat(d);
      if (isNaN(p)) return;
      const u = Math.max(-360, Math.min(360, p)), f = e.map((m) => ({
        id: m.id,
        patch: { rotation: u }
      }));
      t.batchUpdateWithHistory(f);
    },
    [t, e]
  );
  return /* @__PURE__ */ k("div", { style: Bt, children: [
    /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorRotation }),
    /* @__PURE__ */ h(
      "input",
      {
        type: "number",
        min: -360,
        max: 360,
        value: a ?? (i !== null ? String(i) : ""),
        placeholder: i === null ? "Mixed" : void 0,
        onChange: (d) => l(d.target.value),
        onBlur: (d) => c(d.target.value),
        onKeyDown: (d) => {
          d.key === "Enter" && c(d.target.value), d.key === "Escape" && l(null);
        },
        style: {
          width: 52,
          height: 24,
          border: `1px solid ${o.border}`,
          borderRadius: o.controlBorderRadius,
          background: o.controlBg,
          color: o.text,
          fontSize: 10,
          textAlign: "center",
          outline: "none",
          padding: "0 2px"
        }
      }
    ),
    /* @__PURE__ */ h("span", { style: { fontSize: 10, color: o.textMuted }, children: "°" })
  ] });
}
function Wi({
  engine: t,
  nodes: e
}) {
  const o = Ut(), { labels: r } = jt(), n = e.map((i) => i.id);
  if (n.length === 0) return null;
  const s = [
    {
      label: r.actionBringForward,
      action: () => t.bringForward(n),
      icon: "↑+"
    },
    {
      label: r.actionSendBackward,
      action: () => t.sendBackward(n),
      icon: "↓-"
    },
    {
      label: r.actionBringToFront,
      action: () => t.bringToFront(n),
      icon: "⇡|"
    },
    {
      label: r.actionSendToBack,
      action: () => t.sendToBack(n),
      icon: "|⇣"
    }
  ];
  return /* @__PURE__ */ k("div", { style: Bt, children: [
    /* @__PURE__ */ h("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorStack }),
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexWrap: "wrap",
          flex: 1,
          minWidth: 0
        },
        children: s.map((i) => /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            onClick: i.action,
            title: i.label,
            "aria-label": i.label,
            style: {
              border: "none",
              borderRadius: o.controlBorderRadius,
              background: o.controlBg,
              color: o.text,
              width: 42,
              height: 28,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0
            },
            children: i.icon
          },
          i.label
        ))
      }
    )
  ] });
}
function Rp({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const r = at(
    (n, s) => {
      const i = n === "opacity" ? zp : Tp, a = e.filter((l) => i.has(l.type)).map((l) => ({
        id: l.id,
        patch: {
          data: { ...l.data, [n]: s }
        }
      }));
      t.batchUpdateWithHistory(a);
    },
    [t, e]
  );
  return /* @__PURE__ */ k(mt, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ h(
      Ae,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (n) => r("opacity", n)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ h(
      kr,
      {
        borderColor: o.borderColor === "mixed" ? void 0 : o.borderColor,
        borderStyle: o.borderStyle === "mixed" ? void 0 : o.borderStyle,
        borderWidth: o.borderWidth === "mixed" ? void 0 : o.borderWidth,
        mixed: {
          color: o.borderColor === "mixed",
          style: o.borderStyle === "mixed",
          width: o.borderWidth === "mixed"
        },
        onChange: (n, s) => r(n, s)
      }
    )
  ] });
}
function Lp({
  engine: t,
  target: e
}) {
  const o = Ut(), { labels: r } = jt();
  if (e.kind !== "single" && e.kind !== "multi") return null;
  const n = Array.from(t.selection), s = n.length > 0, i = n.length >= 2 || t.selectionHasGroup(), a = n.some((d) => {
    var p;
    return (p = t.getNode(d)) == null ? void 0 : p.locked;
  }), l = n.some((d) => {
    var p;
    return !((p = t.getNode(d)) != null && p.locked);
  }), c = [
    {
      label: r.actionCut,
      disabled: !s,
      action: () => t.cutSelected()
    },
    {
      label: r.actionCopy,
      disabled: !s,
      action: () => t.copySelected()
    },
    {
      label: r.actionPaste,
      disabled: !t.hasClipboard(),
      action: () => t.pasteClipboard()
    },
    {
      label: r.actionDuplicate,
      disabled: !s,
      action: () => t.duplicateSelected()
    },
    {
      label: r.actionBringForward,
      disabled: !s,
      action: () => t.bringForward(n)
    },
    {
      label: r.actionSendBackward,
      disabled: !s,
      action: () => t.sendBackward(n)
    },
    {
      label: r.actionBringToFront,
      disabled: !s,
      action: () => t.bringToFront(n)
    },
    {
      label: r.actionSendToBack,
      disabled: !s,
      action: () => t.sendToBack(n)
    },
    {
      label: r.actionGroupSelection,
      disabled: !i || n.length < 2,
      action: () => t.groupSelected()
    },
    {
      label: r.actionUngroupSelection,
      disabled: !i || !t.selectionHasGroup(),
      action: () => t.ungroupSelected()
    },
    {
      label: r.actionLock,
      disabled: !l,
      action: () => {
        for (const d of n) t.updateNode(d, { locked: !0 });
      }
    },
    {
      label: r.actionUnlock,
      disabled: !a,
      action: () => {
        for (const d of n) t.updateNode(d, { locked: void 0 });
      }
    },
    {
      label: r.actionDelete,
      disabled: !s,
      danger: !0,
      action: () => t.deleteSelected()
    }
  ];
  return /* @__PURE__ */ h(be, { title: r.inspectorActions, defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: c.map((d) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      disabled: d.disabled,
      onClick: d.action,
      style: {
        border: `1px solid ${o.border}`,
        borderRadius: 999,
        background: d.disabled ? o.controlBg : o.controlBgActive,
        color: d.danger ? "#fecaca" : o.text,
        opacity: d.disabled ? 0.45 : 0.95,
        padding: "5px 10px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.01em",
        cursor: d.disabled ? "default" : "pointer",
        whiteSpace: "nowrap"
      },
      children: d.label
    },
    d.label
  )) }) });
}
function Dp({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: r,
  open: n,
  onToggle: s
}) {
  const { labels: i } = jt(), l = Qa(i)[e.type] ?? e.type, c = e.nodes.length, d = e.nodes[0], p = `${l} (${c})`;
  return /* @__PURE__ */ h(be, { title: p, defaultOpen: !1, variant: "group", open: n, onToggle: s, children: /* @__PURE__ */ h(en.Provider, { value: e.nodes, children: /* @__PURE__ */ h(
    Ja,
    {
      engine: t,
      node: d,
      registry: o,
      fontsInScene: r
    }
  ) }) });
}
function Wp(t, e) {
  const o = Qa(e);
  switch (t.kind) {
    case "none":
      return e.inspectorNoSelection;
    case "tool":
      return `${t.mode.charAt(0).toUpperCase() + t.mode.slice(1)} ${e.inspectorToolSuffix}`;
    case "single":
      return o[t.node.type] ?? t.node.type;
    case "multi":
      return t.typeGroups.map(
        (n) => `${n.nodes.length} ${(o[n.type] ?? n.type).toLowerCase()}${n.nodes.length > 1 ? "s" : ""}`
      ).join(", ");
  }
}
function Bi({
  engine: t,
  registry: e,
  target: o,
  commonProps: r
}) {
  const { labels: n } = jt(), s = Kt(() => Pp(t), [t, o]), i = Wp(o, n), [a, l] = $("shared"), [c, d] = $(!1);
  return bt(() => {
    const p = () => {
      d(
        window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0
      );
    };
    return p(), window.addEventListener("resize", p), () => window.removeEventListener("resize", p);
  }, []), bt(() => {
    if (o.kind !== "multi") {
      l("shared");
      return;
    }
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((u) => u.type)])).has(a) || l("shared");
  }, [o, a]), /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(Ap, { label: i }),
    /* @__PURE__ */ h(
      Ep,
      {
        engine: t,
        open: o.kind === "multi" ? a === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => l((p) => p === "canvas" ? "" : "canvas") : void 0
      }
    ),
    c && /* @__PURE__ */ h(Lp, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ h(Cp, { engine: t, mode: o.mode, fontsInScene: s }),
    o.kind === "single" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h(
        Ja,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: s
        }
      ),
      /* @__PURE__ */ h(Di, { engine: t, nodes: [o.node] }),
      /* @__PURE__ */ h(Wi, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ k(
        be,
        {
          title: n.inspectorShared,
          defaultOpen: !0,
          variant: "group",
          open: a === "shared",
          onToggle: () => l((p) => p === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ h(Rp, { engine: t, nodes: o.nodes, commonProps: r }),
            /* @__PURE__ */ h(Di, { engine: t, nodes: o.nodes }),
            /* @__PURE__ */ h(Wi, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((p) => /* @__PURE__ */ h(
        Dp,
        {
          engine: t,
          group: p,
          registry: e,
          fontsInScene: s,
          open: a === p.type,
          onToggle: () => l((u) => u === p.type ? "" : p.type)
        },
        p.type
      ))
    ] })
  ] });
}
function Bp({ engine: t, registry: e }) {
  const o = Ut(), { isRTL: r, labels: n } = jt(), { target: s, commonProps: i } = ip(t), a = s.kind !== "none", l = at((V, tt) => {
    const Z = V.trim();
    if (Z.startsWith("#")) {
      const st = Z.slice(1), dt = st.length === 3 ? st.split("").map((Mt) => Mt + Mt).join("") : st;
      if (dt.length === 6) {
        const Mt = parseInt(dt.slice(0, 2), 16), Ct = parseInt(dt.slice(2, 4), 16), Pt = parseInt(dt.slice(4, 6), 16);
        return `rgba(${Mt}, ${Ct}, ${Pt}, ${tt})`;
      }
    }
    return Z.startsWith("rgb(") ? `rgba(${Z.slice(4, -1)}, ${tt})` : (Z.startsWith("rgba("), Z);
  }, []), [c, d] = $(!1), [p, u] = $(!1), [f, m] = $(!1), [y, g] = $(!1), x = ct(null), b = ct(!1), v = at(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), M = at(
    (V) => {
      const tt = v() ? 1366 : 1024;
      return V <= tt;
    },
    [v]
  ), C = ct(null), [P, F] = $(null), B = ct(null), [E, X] = $(!1), nt = at(() => {
    var Z, st;
    const V = (Z = C.current) == null ? void 0 : Z.offsetParent;
    if (V) return { width: V.clientWidth, height: V.clientHeight };
    const tt = ((st = C.current) == null ? void 0 : st.ownerDocument.defaultView) ?? window;
    return { width: tt.innerWidth, height: tt.innerHeight };
  }, []), Y = at(() => {
    const { width: V } = nt();
    return r ? { x: Ye + 16, y: 12 } : { x: V - Yo - 16, y: 12 };
  }, [nt, r]), ot = P ?? Y(), J = ct(!1);
  Zr(() => {
    if (!J.current && C.current && !P) {
      J.current = !0;
      const V = C.current.offsetParent;
      V && F(
        r ? { x: Ye + 16, y: 12 } : { x: V.clientWidth - Yo - 16, y: 12 }
      );
    }
  }, [P, r]), bt(() => {
    var st, dt;
    const V = ((st = C.current) == null ? void 0 : st.offsetParent) ?? ((dt = C.current) == null ? void 0 : dt.ownerDocument.body);
    if (!V) return;
    const tt = new ResizeObserver((Mt) => {
      var xt;
      const Ct = ((xt = Mt[0]) == null ? void 0 : xt.contentRect.width) ?? V.clientWidth;
      d(Ct < 600);
      const Pt = M(Ct);
      u(Pt), b.current || (g(Pt), b.current = !0);
    });
    tt.observe(V), d(V.clientWidth < 600);
    const Z = M(V.clientWidth);
    return u(Z), b.current || (g(Z), b.current = !0), () => tt.disconnect();
  }, [M]), bt(() => {
    var Et;
    const V = ((Et = C.current) == null ? void 0 : Et.ownerDocument) ?? document, tt = () => {
      x.current !== null && window.clearTimeout(x.current), x.current = window.setTimeout(() => {
        m(!1), x.current = null;
      }, 200);
    }, Z = () => {
      x.current !== null && (window.clearTimeout(x.current), x.current = null), m(!0);
    }, st = (St) => !!(St instanceof Element && St.closest("[data-sb-canvas]")), dt = (St) => {
      St.button !== 2 && st(St.target) && Z();
    }, Mt = () => tt(), Ct = () => tt(), Pt = (St) => {
      st(St.target) && Z();
    }, xt = () => tt(), ft = (St) => {
      var ut;
      ((ut = St.detail) == null ? void 0 : ut.active) ? Z() : tt();
    };
    return V.addEventListener("pointerdown", dt, !0), V.addEventListener("pointerup", Mt, !0), V.addEventListener("pointercancel", Ct, !0), V.addEventListener("focusin", Pt, !0), V.addEventListener("focusout", xt, !0), V.addEventListener("sb:canvas-interaction", ft), () => {
      V.removeEventListener("pointerdown", dt, !0), V.removeEventListener("pointerup", Mt, !0), V.removeEventListener("pointercancel", Ct, !0), V.removeEventListener("focusin", Pt, !0), V.removeEventListener("focusout", xt, !0), V.removeEventListener("sb:canvas-interaction", ft), x.current !== null && (window.clearTimeout(x.current), x.current = null);
    };
  }, []);
  const lt = at(
    (V, tt) => {
      X(!0);
      const Z = P ? P.x : Y().x, st = P ? P.y : Y().y;
      B.current = {
        startX: V.clientX,
        startY: V.clientY,
        startLeft: Z,
        startTop: st
      }, (tt ?? V.currentTarget).setPointerCapture(V.pointerId);
    },
    [P, Y]
  ), H = at((V) => V instanceof Element ? !!V.closest(
    'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
  ) : !1, []), O = at(
    (V) => {
      c || V.button === 0 && (H(V.target) || (V.stopPropagation(), lt(V, V.currentTarget)));
    },
    [c, H, lt]
  ), _ = at(
    (V) => {
      if (!B.current) return;
      V.stopPropagation();
      const tt = V.clientX - B.current.startX, Z = V.clientY - B.current.startY, { width: st, height: dt } = nt(), Mt = r ? 8 : Ye, Ct = r ? st - Yo - Ye - 8 : st - Yo - 8, Pt = Math.max(
        Mt,
        Math.min(Ct, B.current.startLeft + tt)
      ), xt = Math.max(
        8,
        Math.min(dt - 100, B.current.startTop + Z)
      );
      F({ x: Pt, y: xt });
    },
    [nt, r]
  ), K = at(() => {
    B.current = null, X(!1);
  }, []), q = y && f, G = l(o.panelBg, 0.9);
  return a ? c ? /* @__PURE__ */ k(
    "div",
    {
      ref: C,
      "data-sb-props-panel": !0,
      onPointerDown: (V) => V.stopPropagation(),
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "45vh",
        minHeight: 200,
        background: G,
        borderRadius: "12px 12px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        color: o.text,
        fontSize: 12,
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        opacity: q ? 0 : 1,
        transform: q ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: q ? "none" : "auto"
      },
      children: [
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              padding: "0 12px"
            },
            children: [
              /* @__PURE__ */ k(
                "label",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: o.textMuted,
                    fontSize: 11,
                    userSelect: "none"
                  },
                  onPointerDown: (V) => V.stopPropagation(),
                  children: [
                    /* @__PURE__ */ h("span", { children: n.autoHide }),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: y,
                        onChange: (V) => g(V.target.checked),
                        style: { accentColor: o.accentColor }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ h(
                "div",
                {
                  style: {
                    width: 36,
                    height: 4,
                    borderRadius: 2,
                    background: o.border
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            style: {
              overflowY: "auto",
              padding: "0 16px 24px",
              flex: 1,
              touchAction: "pan-y"
            },
            children: /* @__PURE__ */ h(
              Bi,
              {
                engine: t,
                registry: e,
                target: s,
                commonProps: i
              }
            )
          }
        )
      ]
    }
  ) : /* @__PURE__ */ k(
    "div",
    {
      ref: C,
      "data-sb-props-panel": !0,
      style: {
        position: "absolute",
        left: ot.x,
        top: ot.y,
        width: Yo,
        background: G,
        borderRadius: o.panelBorderRadius,
        padding: "0 0 12px",
        display: "flex",
        flexDirection: "column",
        zIndex: 99,
        color: o.text,
        fontSize: 11,
        maxHeight: "calc(100% - 40px)",
        boxShadow: o.panelShadow,
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        opacity: q ? 0 : 1,
        transform: q ? "translateY(-4px) scale(0.995)" : "translateY(0) scale(1)",
        transformOrigin: r ? "top left" : "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: q ? "none" : "auto",
        cursor: E ? "grabbing" : "grab"
      },
      onPointerDownCapture: O,
      onPointerDown: (V) => V.stopPropagation(),
      onPointerMove: _,
      onPointerUp: K,
      onPointerCancel: K,
      children: [
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              cursor: E ? "grabbing" : "grab",
              padding: "8px 16px",
              userSelect: "none",
              touchAction: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${o.border}`,
              color: o.textMuted,
              fontSize: 10,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ h("span", { style: { fontWeight: 600, letterSpacing: "0.02em" }, children: n.inspectorTitle }),
              /* @__PURE__ */ k(
                "label",
                {
                  "data-no-panel-drag": !0,
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: o.textMuted,
                    fontSize: 10,
                    userSelect: "none",
                    cursor: "default"
                  },
                  onPointerDown: (V) => V.stopPropagation(),
                  children: [
                    /* @__PURE__ */ h("span", { children: n.autoHide }),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: y,
                        onChange: (V) => g(V.target.checked),
                        style: { accentColor: o.accentColor }
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            style: {
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              touchAction: "pan-y"
            },
            children: /* @__PURE__ */ h(
              Bi,
              {
                engine: t,
                registry: e,
                target: s,
                commonProps: i
              }
            )
          }
        )
      ]
    }
  ) : null;
}
function Fp({ engine: t, registry: e, gifApiBaseUrl: o }) {
  const { isRTL: r } = jt();
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ h(
      "div",
      {
        "data-sb-sidebar": !0,
        style: {
          position: "absolute",
          left: r ? void 0 : 0,
          right: r ? 0 : void 0,
          top: 0,
          bottom: 0,
          width: Ye,
          zIndex: 100
        },
        onPointerDown: (n) => n.stopPropagation(),
        children: /* @__PURE__ */ h(op, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ h(Bp, { engine: t, registry: e })
  ] });
}
const pr = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function Np(t) {
  const e = t.viewport.zoom, o = pr.find((r) => r > e + 1e-3) ?? pr[pr.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function Hp(t) {
  const e = t.viewport.zoom, o = [...pr].reverse().find((r) => r < e - 1e-3) ?? pr[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const Op = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
}, Se = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, ce = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function ze({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ h("path", { d: "M5 12h14", ...ce }),
    t === "plus" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M12 5v14", ...ce }),
      /* @__PURE__ */ h("path", { d: "M5 12h14", ...ce })
    ] }),
    t === "undo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ce, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...ce, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ce, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...ce, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...ce }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...ce })
    ] }),
    t === "play" && /* @__PURE__ */ h("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...ce }),
      /* @__PURE__ */ h("path", { d: "M6 6V18M18 6V18", ...ce }),
      /* @__PURE__ */ h("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...ce })
    ] }),
    t === "gauge" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 15a8 8 0 1 1 16 0", ...ce }),
      /* @__PURE__ */ h("path", { d: "M12 15l4-4", ...ce }),
      /* @__PURE__ */ h("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "search" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "6", ...ce }),
      /* @__PURE__ */ h("path", { d: "M16 16l5 5", ...ce })
    ] }),
    t === "home" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M3 12l9-8 9 8", ...ce, fill: "none" }),
      /* @__PURE__ */ h("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...ce, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...ce, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function Xp({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showPerfOverlay: r,
  onTogglePerfOverlay: n
}) {
  const s = Ut(), { labels: i } = jt(), [a, l] = $(t.viewport.zoom), [c, d] = $(!1), [p, u] = $(!1), [f, m] = $(() => t.originView != null), [y, g] = $(
    () => t.getAllNodes().filter((C) => C.type === "frame").length
  );
  bt(() => {
    const C = () => l(t.viewport.zoom), P = () => {
      d(t.canUndo()), u(t.canRedo());
    }, F = () => {
      g(t.getAllNodes().filter((B) => B.type === "frame").length), m(t.originView != null);
    };
    return t.on("viewport", C), t.on("history", P), t.on("change", F), t.on("node:create", F), t.on("node:delete", F), () => {
      t.off("viewport", C), t.off("history", P), t.off("change", F), t.off("node:create", F), t.off("node:delete", F);
    };
  }, [t]);
  const x = s.panelBg, b = `1px solid ${s.border}`, v = {
    ...Op,
    borderRadius: s.panelBorderRadius
  }, M = {
    width: 1,
    height: 20,
    background: s.separator,
    flexShrink: 0
  };
  return /* @__PURE__ */ k(
    "div",
    {
      "data-sb-bottombar": !0,
      style: {
        position: "absolute",
        bottom: 12,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 8,
        zIndex: 9999,
        pointerEvents: "auto"
      },
      onPointerDown: (C) => C.stopPropagation(),
      children: [
        /* @__PURE__ */ k("div", { style: { ...v, background: x, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: i.zoomOut,
              onClick: () => Hp(t),
              style: { ...Se, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ h(ze, { name: "minus" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ k(
            "button",
            {
              title: i.resetZoom,
              onClick: () => {
                t.viewport.zoom = 1, t.pan(0, 0);
              },
              style: {
                ...Se,
                minWidth: 48,
                height: 32,
                color: s.text,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
                padding: "0 4px"
              },
              children: [
                Math.round(a * 100),
                "%"
              ]
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: i.zoomIn,
              onClick: () => Np(t),
              style: { ...Se, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ h(ze, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ k("div", { style: { ...v, background: x, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: i.fitToContent,
              onClick: () => t.fitToContent(),
              style: { ...Se, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ h(ze, { name: "fit" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: i.canvasSearchOpen,
              onClick: () => {
                document.dispatchEvent(new CustomEvent("sb:search-open"));
              },
              style: {
                ...Se,
                width: 32,
                height: 32,
                color: s.textMuted
              },
              children: /* @__PURE__ */ h(ze, { name: "search" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: f ? i.clearOriginView : i.saveOriginView,
              onClick: () => {
                f ? (t.clearOriginView(), m(!1)) : (t.setOriginView(), m(!0));
              },
              style: { ...Se, width: 32, height: 32, color: f ? s.accentColor : s.textFaint },
              children: /* @__PURE__ */ h(ze, { name: f ? "bookmark-fill" : "bookmark" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: i.goToOriginView,
              onClick: () => {
                f && t.goToOriginView();
              },
              disabled: !f,
              style: { ...Se, width: 32, height: 32, color: f ? s.text : s.textFaint },
              children: /* @__PURE__ */ h(ze, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ k("div", { style: { ...v, overflow: "visible", background: x, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: i.presentSlides,
              onClick: () => t.enterPresentation(),
              style: { ...Se, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ h(ze, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ h("div", { style: M }),
            /* @__PURE__ */ k(
              "button",
              {
                title: i.toggleSlidesPanel,
                onClick: o,
                style: {
                  ...Se,
                  width: 32,
                  height: 32,
                  color: e ? s.text : s.textMuted,
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ h(ze, { name: "slides" }),
                  y > 0 && /* @__PURE__ */ h(
                    "span",
                    {
                      style: {
                        position: "absolute",
                        top: -4,
                        right: -4,
                        minWidth: 14,
                        height: 14,
                        borderRadius: 7,
                        background: s.accentColor,
                        color: "#fff",
                        fontSize: 9,
                        fontWeight: 700,
                        lineHeight: "14px",
                        textAlign: "center",
                        padding: "0 3px",
                        pointerEvents: "none"
                      },
                      children: y
                    }
                  )
                ]
              }
            )
          ] }),
          n && /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ h("div", { style: M }),
            /* @__PURE__ */ h(
              "button",
              {
                title: i.togglePerformanceOverlay,
                onClick: n,
                style: {
                  ...Se,
                  width: 32,
                  height: 32,
                  color: r ? s.accentColor : s.textMuted
                },
                children: /* @__PURE__ */ h(ze, { name: "gauge" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ k("div", { style: { ...v, background: x, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: i.undo,
              onClick: () => t.undo(),
              disabled: !c,
              style: { ...Se, width: 32, height: 32, color: c ? s.text : s.textFaint },
              children: /* @__PURE__ */ h(ze, { name: "undo" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: i.redo,
              onClick: () => t.redo(),
              disabled: !p,
              style: { ...Se, width: 32, height: 32, color: p ? s.text : s.textFaint },
              children: /* @__PURE__ */ h(ze, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
function Gp(t) {
  return t.matches.length === 0 ? "0/0" : `${t.activeIndex >= 0 ? t.activeIndex + 1 : 0}/${t.matches.length}`;
}
function Yp({ engine: t }) {
  const e = Ut(), { labels: o } = jt(), [r, n] = $(!1), [s, i] = $(() => t.getSearchState()), a = ct(null), l = Kt(() => Gp(s), [s]);
  return bt(() => {
    const c = () => i(t.getSearchState()), d = () => {
      n(!0), requestAnimationFrame(() => {
        var u;
        return (u = a.current) == null ? void 0 : u.focus();
      });
    }, p = document;
    return t.on("search", c), p.addEventListener("sb:search-open", d), () => {
      t.off("search", c), p.removeEventListener("sb:search-open", d);
    };
  }, [t]), bt(() => {
    const c = (d) => {
      (d.ctrlKey || d.metaKey) && d.key.toLowerCase() === "f" && (d.preventDefault(), n(!0), requestAnimationFrame(() => {
        var u;
        return (u = a.current) == null ? void 0 : u.focus();
      }));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, []), bt(() => {
    if (!r) return;
    const c = (d) => {
      var u;
      (d.ctrlKey || d.metaKey) && d.key.toLowerCase() === "f" ? (d.preventDefault(), (u = a.current) == null || u.focus()) : d.key === "Escape" && (d.preventDefault(), s.query ? t.clearSearch() : n(!1));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [t, r, s.query]), r ? /* @__PURE__ */ k(
    "div",
    {
      style: {
        position: "absolute",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10001,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 8,
        borderRadius: 10,
        border: `1px solid ${e.border}`,
        background: e.panelBg,
        boxShadow: e.panelShadow
      },
      onPointerDown: (c) => c.stopPropagation(),
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: a,
            value: s.query,
            placeholder: o.canvasSearchPlaceholder,
            onChange: (c) => t.setSearchQuery(c.currentTarget.value),
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), c.shiftKey ? t.searchPrev() : t.searchNext(), t.focusActiveSearchResult());
            },
            style: {
              width: 260,
              height: 30,
              borderRadius: 8,
              border: `1px solid ${e.border}`,
              background: e.controlBg,
              color: e.text,
              padding: "0 10px",
              outline: "none",
              fontSize: 13
            }
          }
        ),
        /* @__PURE__ */ h("span", { style: { minWidth: 42, textAlign: "center", color: e.textMuted, fontSize: 12 }, children: l }),
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            title: o.canvasSearchPrev,
            onClick: () => {
              t.searchPrev(), t.focusActiveSearchResult();
            },
            disabled: s.matches.length === 0,
            style: {
              border: "none",
              borderRadius: 8,
              width: 28,
              height: 28,
              cursor: s.matches.length === 0 ? "default" : "pointer",
              background: e.controlBg,
              color: s.matches.length === 0 ? e.textDisabled : e.text
            },
            children: "↑"
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            title: o.canvasSearchNext,
            onClick: () => {
              t.searchNext(), t.focusActiveSearchResult();
            },
            disabled: s.matches.length === 0,
            style: {
              border: "none",
              borderRadius: 8,
              width: 28,
              height: 28,
              cursor: s.matches.length === 0 ? "default" : "pointer",
              background: e.controlBg,
              color: s.matches.length === 0 ? e.textDisabled : e.text
            },
            children: "↓"
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            type: "button",
            title: o.canvasSearchClose,
            onClick: () => {
              t.clearSearch(), n(!1);
            },
            style: {
              border: "none",
              borderRadius: 8,
              width: 28,
              height: 28,
              cursor: "pointer",
              background: e.controlBg,
              color: e.text,
              fontSize: 16,
              lineHeight: 1
            },
            children: "×"
          }
        )
      ]
    }
  ) : null;
}
const Ln = 240, Fi = 6;
function Dn(t) {
  const o = t.getAllNodes().filter((d) => d.type === "frame");
  if (o.length === 0) return [];
  const r = o.map((d) => ({
    id: d.id,
    x: d.x,
    y: d.y,
    slideOrder: d.data.slideOrder,
    label: d.data.label || "",
    borderColor: d.data.borderColor,
    transition: d.data.transition,
    transitionDuration: d.data.transitionDuration
  })), n = r.filter((d) => d.slideOrder != null).sort((d, p) => d.slideOrder - p.slideOrder), s = r.filter((d) => d.slideOrder == null), i = 100;
  s.sort((d, p) => d.y - p.y);
  const a = [];
  for (const d of s) {
    const p = a[a.length - 1];
    p && Math.abs(d.y - p[0].y) < i ? p.push(d) : a.push([d]);
  }
  const l = a.flatMap((d) => d.sort((p, u) => p.x - u.x));
  return [...n, ...l].map((d, p) => ({
    id: d.id,
    label: d.label || `Frame ${p + 1}`,
    order: p + 1,
    slideOrder: d.slideOrder,
    borderColor: d.borderColor,
    transition: d.transition,
    transitionDuration: d.transitionDuration
  }));
}
const jp = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Vp() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...jp }) });
}
function qp(t, e, o) {
  const [r, n] = $("");
  return bt(() => {
    let s = !1;
    return mu(t, e).then((i) => {
      s || n(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), r;
}
function Kp({ engine: t, frameId: e, tick: o }) {
  const r = qp(t, e, o);
  return r ? /* @__PURE__ */ h(
    "img",
    {
      src: r,
      alt: "",
      draggable: !1,
      style: {
        width: "100%",
        display: "block",
        borderRadius: "4px 4px 0 0",
        pointerEvents: "none"
      }
    }
  ) : /* @__PURE__ */ h(
    "div",
    {
      style: {
        width: "100%",
        aspectRatio: "16/10",
        background: "rgba(128,128,128,0.06)",
        borderRadius: "4px 4px 0 0"
      }
    }
  );
}
const Up = ["pan", "fade", "dissolve", "zoom", "fold", "cube", "none"];
function Ni({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ h("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ h("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ h("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ h("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ h("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ h("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ h("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ h("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const Zp = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function Qp({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: r,
  theme: n,
  labels: s
}) {
  const [i, a] = $(!1), [l, c] = $(!1), d = ct(null), p = ct(null), u = t !== "none", f = e ?? ur[t], m = {
    pan: s.transitionPan,
    fade: s.transitionFadeToBlack,
    dissolve: s.transitionDissolve,
    zoom: s.transitionZoom,
    fold: s.transitionFold,
    cube: s.transitionCube,
    none: s.transitionNoneInstant
  };
  bt(() => {
    if (!i && !l) return;
    const g = (x) => {
      i && d.current && !d.current.contains(x.target) && a(!1), l && p.current && !p.current.contains(x.target) && c(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [i, l]);
  const y = {
    border: `1px solid ${n.border}`,
    background: n.panelBg,
    borderRadius: 10,
    height: 20,
    padding: "0 6px",
    display: "flex",
    alignItems: "center",
    gap: 3,
    cursor: "pointer",
    color: n.textMuted,
    fontSize: 9,
    position: "relative",
    zIndex: 1
  };
  return /* @__PURE__ */ k(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 22,
        flexShrink: 0,
        position: "relative",
        gap: 4,
        zIndex: i || l ? 50 : void 0
      },
      children: [
        /* @__PURE__ */ h("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: n.border } }),
        /* @__PURE__ */ k("div", { ref: d, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ k("button", { onClick: () => {
            a((g) => !g), c(!1);
          }, style: y, children: [
            /* @__PURE__ */ h(Ni, { type: t }),
            /* @__PURE__ */ h("span", { children: m[t] ?? s.transitionPan }),
            /* @__PURE__ */ h("span", { style: { fontSize: 7 }, children: i ? "▲" : "▼" })
          ] }),
          i && /* @__PURE__ */ h(
            "div",
            {
              style: {
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: 2,
                background: n.panelBg,
                border: `1px solid ${n.border}`,
                borderRadius: 6,
                padding: 3,
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minWidth: 100,
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
              },
              children: Up.map((g) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    o(g), a(!1);
                  },
                  style: {
                    border: "none",
                    background: g === t ? n.controlBgActive : "transparent",
                    color: n.text,
                    borderRadius: 4,
                    padding: "4px 8px",
                    fontSize: 10,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    width: "100%"
                  },
                  children: [
                    /* @__PURE__ */ h(Ni, { type: g }),
                    m[g]
                  ]
                },
                g
              ))
            }
          )
        ] }),
        u && /* @__PURE__ */ k("div", { ref: p, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ k("button", { onClick: () => {
            c((g) => !g), a(!1);
          }, style: y, children: [
            /* @__PURE__ */ k("span", { children: [
              f,
              "ms"
            ] }),
            /* @__PURE__ */ h("span", { style: { fontSize: 7 }, children: l ? "▲" : "▼" })
          ] }),
          l && /* @__PURE__ */ h(
            "div",
            {
              style: {
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: 2,
                background: n.panelBg,
                border: `1px solid ${n.border}`,
                borderRadius: 6,
                padding: 3,
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minWidth: 64,
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
              },
              children: Zp.map((g) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    r(g === ur[t] ? void 0 : g), c(!1);
                  },
                  style: {
                    border: "none",
                    background: g === f ? n.controlBgActive : "transparent",
                    color: n.text,
                    borderRadius: 4,
                    padding: "4px 8px",
                    fontSize: 10,
                    cursor: "pointer",
                    textAlign: "center",
                    width: "100%"
                  },
                  children: [
                    g,
                    "ms",
                    g === ur[t] ? " •" : ""
                  ]
                },
                g
              ))
            }
          )
        ] })
      ]
    }
  );
}
function Jp({ engine: t, open: e, onClose: o }) {
  const r = Ut(), { isRTL: n, labels: s } = jt(), [i, a] = $(() => Dn(t)), [l, c] = $(() => new Set(t.selection)), [d, p] = $(0), u = ct(null), f = ct(null), m = ct(0), y = ct(!1), g = ct(i);
  g.current = i;
  const x = ct(!1), b = ct(!1), [v, M] = $(null), [C, P] = $(null), [F, B] = $(0), E = ct([]), X = ct(null), nt = at(() => {
    if (x.current) return;
    const O = Dn(t);
    a(O);
  }, [t]), Y = at(() => {
    c(new Set(t.selection));
  }, [t]), ot = ct(null), J = at(() => {
    ot.current && clearTimeout(ot.current), ot.current = setTimeout(() => p((O) => O + 1), 500);
  }, []);
  bt(() => {
    nt(), Y();
    const O = setTimeout(() => p((K) => K + 1), 200), _ = () => {
      nt(), J();
    };
    return t.on("change", _), t.on("node:create", _), t.on("node:delete", _), t.on("node:data", _), t.on("selection", Y), t.on("history", _), () => {
      clearTimeout(O), t.off("change", _), t.off("node:create", _), t.off("node:delete", _), t.off("node:data", _), t.off("selection", Y), t.off("history", _), ot.current && clearTimeout(ot.current);
    };
  }, [t, nt, Y, J]), bt(() => {
    if (!X.current) return;
    const O = X.current.querySelectorAll("[data-frame-card]");
    E.current = Array.from(O).map((_) => _.offsetHeight + Fi);
  }, [i]);
  const lt = at(
    (O) => {
      t.select(O), t.zoomToNode(O, 0.8);
    },
    [t]
  ), H = at(
    (O, _) => {
      O.preventDefault(), O.stopPropagation(), m.current = O.clientY, u.current = _, f.current = _, y.current = !1;
    },
    []
  );
  return bt(() => {
    const O = (K) => {
      if (u.current === null) return;
      const q = K.clientY - m.current;
      if (!y.current) {
        if (Math.abs(q) < 4) return;
        y.current = !0, M(u.current), P(u.current);
      }
      B(q);
      const G = E.current, V = u.current;
      let tt = V;
      if (q > 0) {
        let Z = 0;
        for (let st = V + 1; st < g.current.length && (Z += G[st] || 0, q > Z - (G[st] || 0) / 2); st++)
          tt = st;
      } else if (q < 0) {
        let Z = 0;
        for (let st = V - 1; st >= 0 && (Z -= G[st] || 0, q < Z + (G[st] || 0) / 2); st--)
          tt = st;
      }
      f.current = tt, P(tt);
    }, _ = () => {
      const K = u.current, q = f.current;
      if (K !== null && q !== null && K !== q) {
        x.current = !0;
        const G = [...g.current], [V] = G.splice(K, 1);
        G.splice(q, 0, V);
        let tt = !0;
        for (let Z = 0; Z < G.length; Z++) {
          const st = G[Z], dt = t.getNode(st.id);
          dt && (tt ? (t.updateNodeWithHistory(st.id, {
            data: { ...dt.data, slideOrder: Z + 1 }
          }), tt = !1) : t.updateNode(st.id, {
            data: { ...dt.data, slideOrder: Z + 1 }
          }));
        }
        x.current = !1, b.current = !0, a(Dn(t)), p((Z) => Z + 1);
      }
      u.current = null, f.current = null, y.current = !1, M(null), P(null), B(0), b.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", O), document.addEventListener("pointerup", _), document.addEventListener("pointercancel", _), () => {
      document.removeEventListener("pointermove", O), document.removeEventListener("pointerup", _), document.removeEventListener("pointercancel", _);
    };
  }, [t]), /* @__PURE__ */ k(
    "div",
    {
      "data-sb-frames-panel": !0,
      style: {
        position: "absolute",
        top: 0,
        right: n ? void 0 : 0,
        left: n ? 0 : void 0,
        bottom: 0,
        width: Ln,
        background: r.panelBg,
        borderLeft: n ? void 0 : `1px solid ${r.border}`,
        borderRight: n ? `1px solid ${r.border}` : void 0,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : n ? `translateX(-${Ln}px)` : `translateX(${Ln}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (O) => O.stopPropagation(),
      children: [
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderBottom: `1px solid ${r.border}`,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ k("span", { style: { fontSize: 12, fontWeight: 600, color: r.text, letterSpacing: "0.02em" }, children: [
                s.slidesTitle,
                " (",
                i.length,
                ")"
              ] }),
              /* @__PURE__ */ h(
                "button",
                {
                  title: s.closeSlidesPanel,
                  onClick: o,
                  style: {
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: r.textMuted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    padding: 0
                  },
                  children: /* @__PURE__ */ h(Vp, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ k(
          "div",
          {
            ref: X,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: Fi
            },
            children: [
              i.length === 0 && /* @__PURE__ */ h("div", { style: { padding: "20px 8px", textAlign: "center", color: r.textMuted, fontSize: 11 }, children: s.noFramesYet }),
              i.map((O, _) => {
                const K = l.has(O.id), q = v === _;
                let G = 0;
                if (q)
                  G = F;
                else if (v !== null && C !== null) {
                  const Z = E.current;
                  v < C ? _ > v && _ <= C && (G = -(Z[v] || 0)) : v > C && _ >= C && _ < v && (G = Z[v] || 0);
                }
                const V = (Z) => {
                  t.updateNodeWithHistory(O.id, {
                    data: { transition: Z === "pan" ? void 0 : Z, transitionDuration: void 0 }
                  });
                }, tt = (Z) => {
                  t.updateNodeWithHistory(O.id, {
                    data: { transitionDuration: Z }
                  });
                };
                return /* @__PURE__ */ k(Ml.Fragment, { children: [
                  v === null && /* @__PURE__ */ h(
                    Qp,
                    {
                      value: O.transition ?? "pan",
                      durationMs: O.transitionDuration,
                      onChange: V,
                      onDurationChange: tt,
                      theme: r,
                      labels: s
                    }
                  ),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: (Z) => H(Z, _),
                      onDoubleClick: () => lt(O.id),
                      style: {
                        borderRadius: 6,
                        border: K ? `2px solid ${O.borderColor || r.text}` : `1px solid ${r.border}`,
                        background: K ? r.controlBgActive : "transparent",
                        cursor: q ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transition: q || b.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${G}px)`,
                        zIndex: q ? 10 : 1,
                        opacity: q ? 0.92 : 1,
                        boxShadow: q ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ h(Kp, { engine: t, frameId: O.id, tick: d })
                    }
                  )
                ] }, O.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const bo = 50, Wn = 30, $p = `
attribute vec2 aUV;
uniform float uLayPos;
uniform float uRadius;
uniform float uSide;

varying float vLight;
varying float vSpec;
varying float vShadow;
varying float vY;

void main() {
  float PI = 3.14159265;
  float d = aUV.x; // 0 = fold edge (center), 1 = far edge
  float y = aUV.y; // -1 to 1

  float x, z, theta;

  // Slight height-based radius modulation for organic curl
  float R = uRadius * (1.0 + 0.04 * sin(y * PI));

  if (d >= uLayPos) {
    // Flat — already laid on screen
    x = d;
    z = 0.0;
    theta = 0.0;
  } else {
    float arc = uLayPos - d;
    theta = arc / R;
    if (theta < PI) {
      // On the curl cylinder
      x = uLayPos - R * sin(theta);
      z = R * (1.0 - cos(theta));
    } else {
      // Back side — past the full curl, extending away
      float back = (theta - PI) * R;
      x = uLayPos + back;
      z = 2.0 * R;
      theta = PI;
    }
  }

  // Mirror for left/right half
  x *= uSide;

  // Perspective
  float eye = 2.5;
  float s = eye / (eye + z);

  // Diffuse lighting (front-facing light)
  float diffuse = 0.2 + 0.8 * max(0.0, cos(theta));
  diffuse *= (1.0 - z * 0.25); // depth darkening

  // Specular highlight on curl crest (~40 degrees)
  float specTarget = 0.7;
  vSpec = pow(max(0.0, 1.0 - abs(theta - specTarget) * 2.5), 6.0) * 0.5;

  // Shadow on flat surface near curl
  if (d >= uLayPos) {
    float distToCurl = d - uLayPos;
    vShadow = 1.0 - 0.4 * exp(-distToCurl * 25.0);
  } else {
    vShadow = 1.0;
  }

  vLight = diffuse;
  vY = y * 0.5 + 0.5; // normalized 0..1

  gl_Position = vec4(x * s * 2.0, y * s, -z * 0.01, 1.0);
}
`, _p = `
precision mediump float;
varying float vLight;
varying float vSpec;
varying float vShadow;
varying float vY;
uniform vec3 uColor;

void main() {
  // Height gradient for subtle sheen (Video Toaster aesthetic)
  float gradient = 0.88 + 0.12 * vY;
  vec3 c = uColor * vLight * gradient * vShadow + vec3(vSpec);
  gl_FragColor = vec4(c, 1.0);
}
`;
function Hi(t, e, o) {
  const r = t.createShader(e);
  return r ? (t.shaderSource(r, o), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (t.deleteShader(r), null)) : null;
}
function tf(t, e, o) {
  const r = Hi(t, t.VERTEX_SHADER, e), n = Hi(t, t.FRAGMENT_SHADER, o);
  if (!r || !n) return null;
  const s = t.createProgram();
  return t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function ef() {
  const t = [], e = [];
  for (let o = 0; o <= Wn; o++)
    for (let r = 0; r <= bo; r++)
      t.push(r / bo, o / Wn * 2 - 1);
  for (let o = 0; o < Wn; o++)
    for (let r = 0; r < bo; r++) {
      const n = o * (bo + 1) + r;
      e.push(n, n + bo + 1, n + 1, n + 1, n + bo + 1, n + bo + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function of({ phase: t, progress: e }) {
  const o = ct(null), r = ct(null);
  return bt(() => {
    const n = o.current;
    if (!n) return;
    const s = window.devicePixelRatio || 1;
    n.width = n.clientWidth * s, n.height = n.clientHeight * s;
    const i = n.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const a = tf(i, $p, _p);
    if (!a) return;
    i.useProgram(a);
    const { vertices: l, indices: c } = ef(), d = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, d), i.bufferData(i.ARRAY_BUFFER, l, i.STATIC_DRAW);
    const p = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, p), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const u = i.getAttribLocation(a, "aUV");
    i.enableVertexAttribArray(u), i.vertexAttribPointer(u, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const f = (m) => i.getUniformLocation(a, m);
    return r.current = {
      gl: i,
      locs: { uLayPos: f("uLayPos"), uRadius: f("uRadius"), uSide: f("uSide"), uColor: f("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(a), i.deleteBuffer(d), i.deleteBuffer(p), r.current = null;
    };
  }, []), bt(() => {
    const n = r.current;
    if (!n) return;
    const { gl: s, locs: i, count: a } = n, l = t === "out" ? 1 - Math.pow(1 - e, 3) : Math.pow(e, 3), c = t === "out" ? 1 - l : l, d = 0.07 + 0.16 * c;
    s.viewport(0, 0, s.canvas.width, s.canvas.height), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.uniform1f(i.uLayPos, c), s.uniform1f(i.uRadius, d), s.uniform1f(i.uSide, 1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, a, s.UNSIGNED_SHORT, 0), s.uniform1f(i.uSide, -1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, a, s.UNSIGNED_SHORT, 0);
  }, [t, e]), /* @__PURE__ */ h(
    "canvas",
    {
      ref: o,
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999
      }
    }
  );
}
const rf = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: "10px 20px",
  background: "rgba(0,0,0,0.7)",
  backdropFilter: "blur(8px)",
  pointerEvents: "auto"
}, Bn = {
  border: "none",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  padding: 0
}, ts = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Oi({ dir: t }) {
  return /* @__PURE__ */ k("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ h("polyline", { points: "15,18 9,12 15,6", ...ts }),
    t === "right" && /* @__PURE__ */ h("polyline", { points: "9,6 15,12 9,18", ...ts })
  ] });
}
function nf() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...ts }) });
}
function Xi(t) {
  return 1 - Math.pow(1 - t, 3);
}
function Gi(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Yi(t, e) {
  let r;
  t <= 0.2 ? r = 1 + (0.55 - 1) * Xi(t / 0.2) : t >= 0.8 ? r = 0.55 + (1 - 0.55) * Xi((t - 0.8) / 0.2) : r = 0.55;
  let n;
  return t <= 0.1 ? n = 0 : t <= 0.5 ? n = -e * 90 * Gi((t - 0.1) / 0.4) : t <= 0.9 ? n = e * 90 * (1 - Gi((t - 0.5) / 0.4)) : n = 0, { zoom: r, angle: n };
}
function sf(t, e, o, r) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${r}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function ji(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function af({ engine: t }) {
  const [e, o] = $(t.presentationMode), [r, n] = $(t.presentationIndex), [s, i] = $(t.presentationSlides.length), [a, l] = $(""), [c, d] = $(t.transitionOverlay), p = ct(null), u = ct(null);
  if (bt(() => {
    const m = document.querySelector("[data-sb-canvas]");
    p.current = m, u.current = (m == null ? void 0 : m.parentElement) ?? null;
    const y = () => {
      var v;
      if (o(t.presentationMode), n(t.presentationIndex), i(t.presentationSlides.length), d(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const M = t.presentationSlides[t.presentationIndex], C = t.getNode(M);
        l(((v = C == null ? void 0 : C.data) == null ? void 0 : v.label) || "");
      } else
        l("");
      const g = t.transitionOverlay, x = p.current, b = u.current;
      if (x && b && g && g.type === "cube" && g.t != null) {
        const M = g.direction ?? 1, { zoom: C, angle: P } = Yi(g.t, M);
        sf(x, b, C, P);
      } else x && b && ji(x, b);
    };
    return t.on("presentation", y), () => {
      t.off("presentation", y);
      const g = p.current, x = u.current;
      g && x && ji(g, x);
    };
  }, [t]), !e || s === 0) return null;
  const f = c && c.type === "cube" && c.t != null ? (() => {
    const m = c.direction ?? 1, { angle: y } = Yi(c.t, m);
    return Math.abs(y) / 90 * 0.4;
  })() : 0;
  return /* @__PURE__ */ k(
    "div",
    {
      "data-sb-presentation": !0,
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 1e4,
        pointerEvents: "none"
      },
      children: [
        c && c.type !== "fold" && c.type !== "cube" && /* @__PURE__ */ h(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              backgroundColor: "black",
              opacity: c.phase === "out" ? c.progress : 1 - c.progress,
              pointerEvents: "none",
              zIndex: 9999
            }
          }
        ),
        c && c.type === "fold" && /* @__PURE__ */ h(of, { phase: c.phase, progress: c.progress }),
        f > 0.01 && /* @__PURE__ */ h(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              backgroundColor: "black",
              opacity: f,
              pointerEvents: "none",
              zIndex: 9999
            }
          }
        ),
        /* @__PURE__ */ k("div", { style: rf, onPointerDown: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...Bn, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ h(nf, {})
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...Bn, opacity: r <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: r <= 0,
              children: /* @__PURE__ */ h(Oi, { dir: "left" })
            }
          ),
          /* @__PURE__ */ k(
            "span",
            {
              style: {
                color: "white",
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "inherit",
                minWidth: 80,
                textAlign: "center",
                userSelect: "none"
              },
              children: [
                r + 1,
                " / ",
                s,
                a && /* @__PURE__ */ k("span", { style: { opacity: 0.6, marginLeft: 8 }, children: [
                  "— ",
                  a
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...Bn, opacity: r >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: r >= s - 1,
              children: /* @__PURE__ */ h(Oi, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
function Je(t) {
  return `${t.toFixed(2)} ms`;
}
function ge(t, e) {
  return { label: t, value: e };
}
function lf() {
  const t = Ut(), { labels: e } = jt(), [o, r] = $(() => ue.getSnapshot());
  bt(() => {
    let s = 0;
    const i = (l) => {
      ue.tick(l), s = requestAnimationFrame(i);
    };
    s = requestAnimationFrame(i);
    const a = ue.subscribe(() => r(ue.getSnapshot()));
    return () => {
      cancelAnimationFrame(s), a();
    };
  }, []);
  const n = Kt(
    () => [
      ge(e.perfVirtualization, o.virtualizationActive ? e.perfOn : e.perfOff),
      ge(e.perfFps, o.fps.toFixed(1)),
      ge(e.perfFrameP50P95, `${Je(o.frameMsP50)} / ${Je(o.frameMsP95)}`),
      ge(e.perfCullingP50P95, `${Je(o.cullingMsP50)} / ${Je(o.cullingMsP95)}`),
      ge(e.perfHitTestP50P95, `${Je(o.hitTestMsP50)} / ${Je(o.hitTestMsP95)}`),
      ge(e.perfEdgeHitP50P95, `${Je(o.edgeHitMsP50)} / ${Je(o.edgeHitMsP95)}`),
      ge(e.perfHitTestCalls, o.hitTestCallsPerSec.toFixed(1)),
      ge(e.perfEdgeHitCalls, o.edgeHitCallsPerSec.toFixed(1)),
      ge(e.perfVisibleNodes, `${o.visibleNodes} / ${o.totalNodes}`),
      ge(e.perfVisibleEdges, `${o.visibleEdges} / ${o.totalEdges}`),
      ge(e.perfSeedVisibleNodes, String(o.seedVisibleNodes)),
      ge(e.perfNodesAdjacency, String(o.nodesAddedByAdjacency)),
      ge(e.perfNodesEdgeEndpoints, String(o.nodesAddedByEdgeEndpoints)),
      ge(e.perfEdgesAdjacency, String(o.edgesAddedByAdjacency)),
      ge(e.perfEdgesCrossing, String(o.edgesAddedByCrossing))
    ],
    [o, e]
  );
  return /* @__PURE__ */ k(
    "div",
    {
      style: {
        position: "absolute",
        right: 12,
        bottom: 56,
        width: 280,
        borderRadius: t.panelBorderRadius,
        border: `1px solid ${t.border}`,
        background: t.panelBg,
        boxShadow: t.panelShadow,
        color: t.text,
        zIndex: 1e4,
        pointerEvents: "none",
        fontSize: 11,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        lineHeight: 1.35
      },
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            style: {
              padding: "8px 10px",
              borderBottom: `1px solid ${t.separator}`,
              fontWeight: 700,
              letterSpacing: 0.2
            },
            children: e.performanceTitle
          }
        ),
        /* @__PURE__ */ h("div", { style: { padding: "8px 10px", display: "grid", rowGap: 4 }, children: n.map((s) => /* @__PURE__ */ k("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
          /* @__PURE__ */ h("span", { style: { color: t.textMuted }, children: s.label }),
          /* @__PURE__ */ h("span", { children: s.value })
        ] }, s.label)) })
      ]
    }
  );
}
const cf = zl(() => import("./DebugPanel-DZrEf4dd.js"));
function Tf({
  nodeTypes: t = ah,
  engine: e,
  keyboardShortcuts: o = !0,
  style: r,
  initialData: n,
  toolbar: s = !0,
  debugPanel: i = !1,
  debugBoards: a,
  theme: l,
  onPresentationChange: c,
  gifApiBaseUrl: d,
  direction: p,
  localization: u
}) {
  const f = Kt(
    () => e ?? new Tc(),
    [e]
  ), m = Kt(() => new Pc(t), [t]);
  bt(() => lc(), []), bt(() => {
    f.setRegistry(m);
  }, [f, m]), bt(() => {
    for (const X of t)
      X.isContainer && f.registerContainerType(X.type);
  }, [f, t]);
  const y = ct(!1);
  bt(() => {
    n && !y.current && (y.current = !0, f.fromSBD(n));
  }, [f, n]);
  const g = ct(null);
  bt(() => {
    if (o)
      return $h(f, g.current);
  }, [f, o]);
  const x = Kt(() => t.some((nt) => {
    var Y;
    return (Y = nt.ports) == null ? void 0 : Y.length;
  }) ? new lh(f, m) : null, [f, m, t]);
  bt(() => {
    if (x)
      return x.connect();
  }, [x]);
  const b = Kt(
    () => l ? { ...Kn, ...l } : Kn,
    [l]
  ), v = Dh(p, u), [M, C] = $(!1), [P, F] = $(!1), [B, E] = $(!1);
  return bt(() => {
    ue.setEnabled(B);
  }, [B]), bt(() => {
    const X = () => {
      const nt = f.presentationMode;
      C(nt), c == null || c(nt);
    };
    return f.on("presentation", X), () => f.off("presentation", X);
  }, [f, c]), /* @__PURE__ */ h(Da.Provider, { value: v, children: /* @__PURE__ */ h(va.Provider, { value: b, children: /* @__PURE__ */ k(
    "div",
    {
      ref: g,
      dir: v.dir,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        ...r
      },
      children: [
        s && !M && /* @__PURE__ */ h(Fp, { engine: f, registry: m, gifApiBaseUrl: d }),
        i && /* @__PURE__ */ h(Il, { fallback: null, children: /* @__PURE__ */ h(cf, { engine: f, extraBoards: a }) }),
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !M && !v.isRTL ? Ye : 0,
              top: 0,
              right: s && !M && v.isRTL ? Ye : 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ h(Cu, { engine: f, schema: rs, registry: m, dataFlow: x }),
              !M && /* @__PURE__ */ h(Yp, { engine: f }),
              !M && /* @__PURE__ */ h(
                Xp,
                {
                  engine: f,
                  framesPanelOpen: P,
                  onToggleFramesPanel: () => F((X) => !X),
                  showPerfOverlay: B,
                  onTogglePerfOverlay: () => E((X) => !X)
                }
              ),
              !M && B && /* @__PURE__ */ h(lf, {}),
              !M && /* @__PURE__ */ h(
                Jp,
                {
                  engine: f,
                  open: P,
                  onClose: () => F(!1)
                }
              ),
              /* @__PURE__ */ h(af, { engine: f })
            ]
          }
        )
      ]
    }
  ) }) });
}
const df = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], Oo = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, _t = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function hr({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ..._t }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ..._t })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ..._t }),
    t === "text" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M7 4h10", ..._t }),
      /* @__PURE__ */ h("path", { d: "M12 4v16", ..._t })
    ] }),
    t === "note" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ..._t }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ..._t }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ..._t, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ..._t, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ..._t, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ..._t }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ..._t })
    ] }),
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ..._t }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ..._t }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ..._t }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ..._t }),
    t === "arrow" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ..._t }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ..._t, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ..._t, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ..._t, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ..._t, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ..._t, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ..._t }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ..._t }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ..._t })
    ] }),
    t === "fit" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ..._t }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ..._t })
    ] })
  ] });
}
function Pf({ engine: t }) {
  const [e, o] = $(t.mode), [r, n] = $(!1), [s, i] = $(!1), [a, l] = $(t.boardBackground);
  return bt(() => {
    const c = () => o(t.mode), d = () => {
      n(t.canUndo()), i(t.canRedo());
    }, p = () => l(t.boardBackground);
    return t.on("mode", c), t.on("history", d), t.on("background", p), () => {
      t.off("mode", c), t.off("history", d), t.off("background", p);
    };
  }, [t]), /* @__PURE__ */ k(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 48,
        background: "#1e1e2e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 0",
        gap: 4,
        zIndex: 100
      },
      children: [
        df.map((c) => /* @__PURE__ */ h(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...Oo,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(hr, { name: c.key })
          },
          c.key
        )),
        /* @__PURE__ */ h(
          "div",
          {
            style: {
              width: 28,
              height: 1,
              background: "#444",
              margin: "8px 0"
            }
          }
        ),
        [
          { key: "dot-grid", color: "#f8f7f5", label: "Dot Grid" },
          { key: "blueprint", color: "#1e3a5f", label: "Blueprint" },
          { key: "japanese-stationery", color: "#f5f0e8", label: "Japanese Stationery" }
        ].map((c) => /* @__PURE__ */ h(
          "button",
          {
            title: c.label,
            onClick: () => t.setBoardBackground(c.key),
            style: {
              ...Oo,
              width: 20,
              height: 20,
              background: c.color,
              border: a === c.key ? "2px solid white" : "2px solid transparent",
              borderRadius: 4,
              boxShadow: c.key === "japanese-stationery" ? "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(160,140,110,0.15)" : void 0
            }
          },
          c.key
        )),
        /* @__PURE__ */ h("div", { style: { flex: 1 } }),
        /* @__PURE__ */ h(
          "button",
          {
            title: "Print (landscape)",
            onClick: () => {
              const c = { ...t.viewport };
              t.fitToContent(), requestAnimationFrame(() => {
                window.print(), t.viewport.x = c.x, t.viewport.y = c.y, t.viewport.zoom = c.zoom, t.pan(0, 0);
              });
            },
            style: {
              ...Oo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(hr, { name: "print" })
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            style: {
              width: 28,
              height: 1,
              background: "#444",
              margin: "4px 0"
            }
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            title: "Undo (Ctrl+Z)",
            onClick: () => t.undo(),
            disabled: !r,
            style: {
              ...Oo,
              width: 36,
              height: 36,
              background: "transparent",
              color: r ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(hr, { name: "undo" })
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...Oo,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(hr, { name: "redo" })
          }
        ),
        /* @__PURE__ */ h(
          "div",
          {
            style: {
              width: 28,
              height: 1,
              background: "#444",
              margin: "4px 0"
            }
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            title: "Fit to content (Ctrl+0)",
            onClick: () => t.fitToContent(),
            style: {
              ...Oo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(hr, { name: "fit" })
          }
        )
      ]
    }
  );
}
const $e = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], hf = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], uf = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Xo = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], pf = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Go = [1, 2.5, 5, 10, 20], ff = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], yf = [14, 20, 28, 36], gf = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Fn = 300, Xt = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, Gt = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0
}, Zt = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
};
function Af({
  engine: t,
  registry: e
}) {
  const [o, r] = $(t.mode), [n, s] = $(t.selection), [, i] = $(0), [a, l] = $(null), c = ct(null), d = ct(null), [p, u] = $(!1), f = at(() => {
    var ht;
    return { x: (((ht = c.current) == null ? void 0 : ht.ownerDocument.defaultView) ?? window).innerWidth - Fn - 12, y: 12 };
  }, []), m = a ?? f();
  bt(() => {
    const S = () => r(t.mode), ht = () => {
      s(new Set(t.selection)), i((ae) => ae + 1);
    }, Qt = () => i((ae) => ae + 1);
    return t.on("mode", S), t.on("selection", ht), t.on("change", Qt), () => {
      t.off("mode", S), t.off("selection", ht), t.off("change", Qt);
    };
  }, [t]);
  const y = at((S) => {
    S.stopPropagation(), u(!0);
    const ht = a ? a.x : f().x, Qt = a ? a.y : f().y;
    d.current = { startX: S.clientX, startY: S.clientY, startLeft: ht, startTop: Qt }, S.currentTarget.setPointerCapture(S.pointerId);
  }, [a, f]);
  bt(() => {
    var ae;
    const S = (Ce) => {
      var uo;
      if (!d.current) return;
      const co = Ce.clientX - d.current.startX, Ee = Ce.clientY - d.current.startY, He = ((uo = c.current) == null ? void 0 : uo.ownerDocument.defaultView) ?? window, ho = Math.max(48, Math.min(He.innerWidth - Fn - 8, d.current.startLeft + co)), Po = Math.max(8, Math.min(He.innerHeight - 100, d.current.startTop + Ee));
      l({ x: ho, y: Po });
    }, ht = () => {
      d.current = null, u(!1);
    }, Qt = ((ae = c.current) == null ? void 0 : ae.ownerDocument) ?? document;
    return Qt.addEventListener("pointermove", S), Qt.addEventListener("pointerup", ht), Qt.addEventListener("pointercancel", ht), () => {
      Qt.removeEventListener("pointermove", S), Qt.removeEventListener("pointerup", ht), Qt.removeEventListener("pointercancel", ht);
    };
  }, []);
  const g = (() => {
    if (n.size === 1) {
      const S = Array.from(n)[0], ht = t.getNode(S);
      if ((ht == null ? void 0 : ht.type) === "shape") return { kind: "shape", node: ht };
      if ((ht == null ? void 0 : ht.type) === "draw") return { kind: "draw", node: ht };
      if ((ht == null ? void 0 : ht.type) === "text") return { kind: "text", node: ht };
      if ((ht == null ? void 0 : ht.type) === "edge") return { kind: "edge", node: ht };
      if ((ht == null ? void 0 : ht.type) === "image") return { kind: "image", node: ht };
      if ((ht == null ? void 0 : ht.type) === "content") return { kind: "content", node: ht };
      if ((ht == null ? void 0 : ht.type) === "frame") return { kind: "frame", node: ht };
      if ((ht == null ? void 0 : ht.type) === "sticky") return { kind: "sticky", node: ht };
      if (ht && e) {
        const Qt = e.get(ht.type);
        if (Qt != null && Qt.propertiesPanel)
          return { kind: "custom", node: ht, PanelComponent: Qt.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" ? { kind: "tool" } : null;
  })(), x = at(
    (S) => {
      !g || g.kind !== "shape" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), b = at(
    (S) => {
      !g || g.kind !== "draw" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), v = at(
    (S) => {
      !g || g.kind !== "text" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), M = at(
    (S) => {
      !g || g.kind !== "edge" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), C = at(
    (S) => {
      !g || g.kind !== "image" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), P = at(
    (S) => {
      !g || g.kind !== "content" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), F = at(
    (S) => {
      !g || g.kind !== "frame" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), B = at(
    (S) => {
      !g || g.kind !== "sticky" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), E = at(
    (S) => {
      !g || g.kind !== "custom" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), [X, nt] = $("idle");
  if (!g) return null;
  const Y = g.kind === "custom", ot = g.kind === "shape", J = g.kind === "draw", lt = g.kind === "text", H = g.kind === "edge", O = g.kind === "image", _ = g.kind === "content", K = g.kind === "frame", q = g.kind === "sticky", G = g.kind === "tool", V = G && o === "shape", tt = G && o === "text", Z = lt ? g.node.data.fontFamily : t.activeTool.fontFamily ?? eo, st = lt ? g.node.data.fontSize : t.activeTool.fontSize ?? 20, dt = lt ? g.node.data.align : t.activeTool.textAlign ?? "left", Mt = lt ? g.node.data.color : t.activeTool.color, Ct = ot ? g.node.data.stroke : J ? g.node.data.color : t.activeTool.color, Pt = ot || J ? g.node.data.fill ?? null : t.activeTool.fillColor ?? null, xt = ot || J ? g.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", ft = ot || J ? g.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", Et = ot || J ? g.node.data.strokeWidth : t.activeTool.width, St = ot ? g.node.data.roughness : t.activeTool.roughness ?? 1, Rt = ot || J || lt || O || _ || K || q ? g.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, ut = (() => {
    const S = /* @__PURE__ */ new Set(), ht = [];
    for (const Qt of t.getAllNodes())
      if (Qt.type === "text") {
        const ae = Qt.data.fontFamily;
        ae && !S.has(ae) && (S.add(ae), ht.push(ae));
      }
    return ht;
  })(), $t = !lt && !tt && !H && !O && !_ && !K && !q && !Y, re = $t, ne = $t, fe = ot || V, Ne = lt || tt, ve = (S) => {
    ot ? x({ stroke: S }) : J ? b({ color: S }) : (t.activeTool.color = S, i((ht) => ht + 1));
  }, er = (S) => {
    ot ? x({ fill: S ?? void 0 }) : J ? b({ fill: S ?? void 0 }) : (t.activeTool.fillColor = S ?? void 0, i((ht) => ht + 1));
  }, zo = (S) => {
    ot ? x({ fillStyle: S }) : J ? b({ fillStyle: S }) : (t.activeTool.fillStyle = S, i((ht) => ht + 1));
  }, lo = (S) => {
    ot ? x({ strokeStyle: S }) : J ? b({ strokeStyle: S }) : (t.activeTool.strokeStyle = S, i((ht) => ht + 1));
  }, ie = (S) => {
    ot ? x({ strokeWidth: S }) : J ? b({ strokeWidth: S }) : (t.activeTool.width = S, i((ht) => ht + 1));
  }, le = (S) => {
    ot ? x({ roughness: S }) : (t.activeTool.roughness = S, i((ht) => ht + 1));
  }, To = (S) => {
    ot ? x({ opacity: S }) : J ? b({ opacity: S }) : lt ? v({ opacity: S }) : O ? C({ opacity: S }) : _ ? P({ opacity: S }) : K ? F({ opacity: S }) : q ? B({ opacity: S }) : (t.activeTool.opacity = S, i((ht) => ht + 1));
  }, or = (S) => {
    lt ? v({ fontFamily: S }) : (t.activeTool.fontFamily = S, i((ht) => ht + 1));
  }, ee = (S) => {
    lt ? v({ fontSize: S }) : (t.activeTool.fontSize = S, i((ht) => ht + 1));
  }, Me = (S) => {
    lt ? v({ align: S }) : (t.activeTool.textAlign = S, i((ht) => ht + 1));
  }, Ft = (S) => {
    lt ? v({ color: S }) : (t.activeTool.color = S, i((ht) => ht + 1));
  }, rr = {
    position: "fixed",
    left: m.x,
    top: m.y,
    width: Fn,
    background: "#1e1e2e",
    borderRadius: 12,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    zIndex: 99,
    color: "white",
    fontSize: 11,
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
    boxShadow: "0 4px 24px rgba(0,0,0,0.4)"
  };
  return /* @__PURE__ */ k(
    "div",
    {
      ref: c,
      "data-sb-props-panel": !0,
      style: rr,
      onPointerDown: (S) => S.stopPropagation(),
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: y,
            style: {
              cursor: p ? "grabbing" : "grab",
              margin: "-12px -16px 8px -16px",
              padding: "8px 16px",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderBottom: "1px solid #333",
              color: "#999",
              fontSize: 10
            },
            children: /* @__PURE__ */ h("span", { style: { fontWeight: 600, letterSpacing: "0.02em", color: "white" }, children: "Inspector" })
          }
        ),
        Ne && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Font" }),
            /* @__PURE__ */ h(
              on,
              {
                value: Z,
                onChange: or,
                fontsInScene: ut
              }
            )
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Size" }),
            yf.map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => ee(S),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: st === S ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: S
              },
              S
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Align" }),
            gf.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.key,
                onClick: () => Me(S.key),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: dt === S.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: S.label
              },
              S.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Color" }),
            $e.map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Ft(S),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S,
                  border: Mt === S ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              S
            ))
          ] }),
          lt && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Border" }),
            [null, ...$e].map((S, ht) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => v({ borderColor: S ?? void 0 }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === S ? "2px solid white" : `2px solid ${ht === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ht === 0 && /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      width: 2,
                      height: 24,
                      background: "#e74c3c",
                      transform: "rotate(45deg)"
                    }
                  }
                )
              },
              S ?? "none"
            ))
          ] }),
          lt && g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Style" }),
            Xo.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => v({ borderStyle: S.key }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "solid") === S.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h("svg", { width: 24, height: 12, children: /* @__PURE__ */ h(
                  "line",
                  {
                    x1: 2,
                    y1: 6,
                    x2: 22,
                    y2: 6,
                    stroke: "white",
                    strokeWidth: 2,
                    strokeDasharray: S.dash
                  }
                ) })
              },
              S.key
            ))
          ] }),
          lt && g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Width" }),
            Go.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: `${S}px`,
                onClick: () => v({ borderWidth: S }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(S, 1),
                      background: "white",
                      borderRadius: S / 2
                    }
                  }
                )
              },
              S
            ))
          ] })
        ] }),
        $t && /* @__PURE__ */ k(mt, { children: [
          V && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Shape" }),
            ff.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => {
                  t.activeTool.shapeType = S.key, i((ht) => ht + 1);
                },
                style: {
                  ...Zt,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === S.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(mf, { name: S.key })
              },
              S.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Stroke" }),
            $e.map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => ve(S),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S,
                  border: Ct === S ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              S
            ))
          ] }),
          re && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Fill" }),
            hf.map((S, ht) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => er(S),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: Pt === S ? "2px solid white" : `2px solid ${ht === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ht === 0 && /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      width: "140%",
                      height: 2,
                      background: "#e74c3c",
                      transform: "rotate(-45deg)",
                      top: "50%",
                      left: "-20%"
                    }
                  }
                )
              },
              S ?? "none"
            ))
          ] }),
          re && Pt && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Fill pattern" }),
            uf.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => zo(S.key),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: xt === S.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(bf, { style: S.key })
              },
              S.key
            ))
          ] }),
          ne && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Stroke style" }),
            Xo.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => lo(S.key),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: ft === S.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h("svg", { width: 24, height: 12, children: /* @__PURE__ */ h(
                  "line",
                  {
                    x1: 2,
                    y1: 6,
                    x2: 22,
                    y2: 6,
                    stroke: "white",
                    strokeWidth: 2,
                    strokeDasharray: S.dash
                  }
                ) })
              },
              S.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Stroke width" }),
            Go.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: `${S}px`,
                onClick: () => ie(S),
                style: {
                  ...Zt,
                  width: 36,
                  height: 24,
                  background: Et === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(S, 1),
                      background: "white",
                      borderRadius: S / 2
                    }
                  }
                )
              },
              S
            ))
          ] }),
          fe && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Roughness" }),
            pf.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => le(S.value),
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 8px",
                  background: St === S.value ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: S.label
              },
              S.value
            ))
          ] })
        ] }),
        H && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Color" }),
            $e.map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ color: S }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S,
                  border: g.node.data.color === S ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              S
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Style" }),
            Xo.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => M({ style: S.key }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: g.node.data.style === S.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h("svg", { width: 24, height: 12, children: /* @__PURE__ */ h(
                  "line",
                  {
                    x1: 2,
                    y1: 6,
                    x2: 22,
                    y2: 6,
                    stroke: "white",
                    strokeWidth: 2,
                    strokeDasharray: S.dash
                  }
                ) })
              },
              S.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Width" }),
            Go.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: `${S}px`,
                onClick: () => M({ strokeWidth: S }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 24,
                  background: g.node.data.strokeWidth === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(S, 1),
                      background: "white",
                      borderRadius: S / 2
                    }
                  }
                )
              },
              S
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ arrowHead: S }),
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 8px",
                  background: (g.node.data.arrowHead ?? "none") === S ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: S === "none" ? "None" : S === "arrow" ? "▷" : S === "filled" ? "▶" : "●"
              },
              S
            ))
          ] }),
          (g.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Head size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: g.node.data.arrowHeadSize ?? Math.max(8, g.node.data.strokeWidth * 3),
                onChange: (S) => M({ arrowHeadSize: Number(S.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: g.node.data.arrowHeadSize ?? Math.max(8, g.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ arrowTail: S }),
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 8px",
                  background: (g.node.data.arrowTail ?? "none") === S ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: S === "none" ? "None" : S === "arrow" ? "◁" : S === "filled" ? "◀" : "●"
              },
              S
            ))
          ] }),
          (g.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Tail size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: g.node.data.arrowTailSize ?? Math.max(8, g.node.data.strokeWidth * 3),
                onChange: (S) => M({ arrowTailSize: Number(S.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: g.node.data.arrowTailSize ?? Math.max(8, g.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: g.node.data.label ?? "",
                onChange: (S) => M({ label: S.target.value || void 0 }),
                placeholder: "Edge label...",
                style: {
                  flex: 1,
                  background: "#2a2a3e",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 8px",
                  fontSize: 11,
                  outline: "none"
                }
              }
            )
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => M({ edgeType: S.key }),
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 8px",
                  background: (g.node.data.edgeType ?? "bezier") === S.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: S.label
              },
              S.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Animate" }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ animated: !g.node.data.animated }),
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 12px",
                  background: g.node.data.animated ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: g.node.data.animated ? "On" : "Off"
              }
            )
          ] }),
          g.node.data.animated && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Direction" }),
            ["forward", "reverse", "both"].map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ animatedDirection: S }),
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 8px",
                  background: (g.node.data.animatedDirection ?? "forward") === S ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: S === "forward" ? "→" : S === "reverse" ? "←" : "⇆"
              },
              S
            ))
          ] })
        ] }),
        O && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Border" }),
            [null, ...$e].map((S, ht) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ borderColor: S ?? void 0 }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === S ? "2px solid white" : `2px solid ${ht === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ht === 0 && /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      width: "140%",
                      height: 2,
                      background: "#e74c3c",
                      transform: "rotate(-45deg)",
                      top: "50%",
                      left: "-20%"
                    }
                  }
                )
              },
              S ?? "none"
            ))
          ] }),
          g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Style" }),
            Xo.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => C({ borderStyle: S.key }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "solid") === S.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h("svg", { width: 24, height: 12, children: /* @__PURE__ */ h(
                  "line",
                  {
                    x1: 2,
                    y1: 6,
                    x2: 22,
                    y2: 6,
                    stroke: "white",
                    strokeWidth: 2,
                    strokeDasharray: S.dash
                  }
                ) })
              },
              S.key
            ))
          ] }),
          g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Width" }),
            Go.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: `${S}px`,
                onClick: () => C({ borderWidth: S }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(S, 1),
                      background: "white",
                      borderRadius: S / 2
                    }
                  }
                )
              },
              S
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: { ...Xt, marginTop: 4 }, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Background" }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: async () => {
                  if (!(X === "loading" || g.kind !== "image")) {
                    nt("loading");
                    try {
                      const { removeBackground: S } = await import("@imgly/background-removal"), Qt = await (await fetch(g.node.data.src)).blob(), ae = await S(Qt), Ce = new FileReader(), co = await new Promise((Ee, He) => {
                        Ce.onload = () => Ee(Ce.result), Ce.onerror = He, Ce.readAsDataURL(ae);
                      });
                      C({ src: co }), nt("idle");
                    } catch (S) {
                      console.error("Background removal failed:", S), nt("error"), setTimeout(() => nt("idle"), 3e3);
                    }
                  }
                },
                disabled: X === "loading",
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 10px",
                  background: X === "error" ? "#e74c3c" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6,
                  gap: 4,
                  opacity: X === "loading" ? 0.6 : 1
                },
                children: X === "loading" ? "Removing..." : X === "error" ? "Failed" : "Remove BG"
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Border" }),
            [null, ...$e].map((S, ht) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => P({ borderColor: S ?? void 0 }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === S ? "2px solid white" : `2px solid ${ht === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ht === 0 && /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      width: "140%",
                      height: 2,
                      background: "#e74c3c",
                      transform: "rotate(-45deg)",
                      top: "50%",
                      left: "-20%"
                    }
                  }
                )
              },
              S ?? "none"
            ))
          ] }),
          g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Style" }),
            Xo.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => P({ borderStyle: S.key }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "solid") === S.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h("svg", { width: 24, height: 12, children: /* @__PURE__ */ h(
                  "line",
                  {
                    x1: 2,
                    y1: 6,
                    x2: 22,
                    y2: 6,
                    stroke: "white",
                    strokeWidth: 2,
                    strokeDasharray: S.dash
                  }
                ) })
              },
              S.key
            ))
          ] }),
          g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Width" }),
            Go.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: `${S}px`,
                onClick: () => P({ borderWidth: S }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(S, 1),
                      background: "white",
                      borderRadius: S / 2
                    }
                  }
                )
              },
              S
            ))
          ] })
        ] }),
        K && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: g.node.data.label ?? "",
                onChange: (S) => F({ label: S.target.value || void 0 }),
                placeholder: "Frame label...",
                style: {
                  flex: 1,
                  background: "#2a2a3e",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  padding: "4px 8px",
                  fontSize: 11,
                  outline: "none"
                }
              }
            )
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Background" }),
            [null, ...$e].map((S, ht) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => F({ backgroundColor: S ? `${S}15` : void 0 }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: (() => {
                    const Qt = g.node.data.backgroundColor;
                    return (S === null ? !Qt : Qt === `${S}15`) ? "2px solid white" : `2px solid ${ht === 0 ? "#555" : "transparent"}`;
                  })(),
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ht === 0 && /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      width: "140%",
                      height: 2,
                      background: "#e74c3c",
                      transform: "rotate(-45deg)",
                      top: "50%",
                      left: "-20%"
                    }
                  }
                )
              },
              S ?? "none"
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Border" }),
            $e.map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => F({ borderColor: S }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S,
                  border: g.node.data.borderColor === S ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              S
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Style" }),
            Xo.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: S.label,
                onClick: () => F({ borderStyle: S.key }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "dashed") === S.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h("svg", { width: 24, height: 12, children: /* @__PURE__ */ h(
                  "line",
                  {
                    x1: 2,
                    y1: 6,
                    x2: 22,
                    y2: 6,
                    stroke: "white",
                    strokeWidth: 2,
                    strokeDasharray: S.dash
                  }
                ) })
              },
              S.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Width" }),
            Go.map((S) => /* @__PURE__ */ h(
              "button",
              {
                title: `${S}px`,
                onClick: () => F({ borderWidth: S }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(S, 1),
                      background: "white",
                      borderRadius: S / 2
                    }
                  }
                )
              },
              S
            ))
          ] })
        ] }),
        q && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => B({ color: S }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S,
                  border: g.node.data.color === S ? "2px solid #1e1e2e" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              S
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ h("span", { style: Gt, children: "Size" }),
            [12, 14, 16, 20, 24].map((S) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => B({ fontSize: S }),
                style: {
                  ...Zt,
                  width: 32,
                  height: 24,
                  background: (g.node.data.fontSize ?? 16) === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                  fontSize: 10,
                  color: "white"
                },
                children: S
              },
              S
            ))
          ] })
        ] }),
        Y && (() => {
          const { node: S, PanelComponent: ht } = g;
          return /* @__PURE__ */ h(ht, { node: S, data: S.data, engine: t, updateData: E });
        })(),
        !H && !Y && /* @__PURE__ */ k("div", { style: Xt, children: [
          /* @__PURE__ */ h("span", { style: Gt, children: "Opacity" }),
          /* @__PURE__ */ h(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(Rt * 100),
              onChange: (S) => To(parseInt(S.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ h("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(Rt * 100) })
        ] })
      ]
    }
  );
}
function mf({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function bf({ style: t }) {
  return t === "hachure" ? /* @__PURE__ */ k("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ h("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ h("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ k("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ h("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: "white", strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ h("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ h("rect", { x: 2, y: 2, width: 16, height: 12, fill: "white", rx: 2 }) });
}
export {
  Ut as A,
  eo as D,
  Pc as N,
  Zo as P,
  zf as S,
  Pf as T,
  La as a,
  Kn as b,
  lh as c,
  Af as d,
  Fp as e,
  Tf as f,
  Cu as g,
  Tc as h,
  ah as i,
  Fc as j,
  Wd as k,
  Hd as l,
  Ud as m,
  zt as n,
  xr as o,
  ds as p,
  Yd as q,
  ss as r,
  dc as s,
  go as t,
  nc as u,
  $h as v,
  Fd as w,
  $d as x,
  qd as y,
  jt as z
};
