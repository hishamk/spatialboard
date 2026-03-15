var ml = Object.defineProperty;
var bl = (t, e, o) => e in t ? ml(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var yt = (t, e, o) => bl(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as xl, defaultBlockSpecs as wl, BlockNoteEditor as kl } from "@blocknote/core";
import { jsxs as k, jsx as u, Fragment as gt } from "react/jsx-runtime";
import vl, { memo as be, useRef as dt, useState as $, useEffect as bt, useCallback as ct, Component as Sl, useMemo as Vt, useLayoutEffect as Kr, useContext as fr, createContext as _n, Suspense as Ml, lazy as Cl } from "react";
import { useCreateBlockNote as Il } from "@blocknote/react";
import { BlockNoteView as zl } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as qe, flushSync as Tl } from "react-dom";
const Pl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let zt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += Pl[o[t] & 63];
  return e;
};
const Al = {
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
}, El = {
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
}, Rl = {
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
}, Ll = {
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
}, Dl = {
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
}, Wl = {
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
}, Bl = {
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
}, Fl = {
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
}, Nl = {
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
}, Hl = {
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
}, Ol = {
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
}, Xl = {
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
}, Yi = [
  Al,
  El,
  Rl,
  Ll,
  Dl,
  Wl,
  Bl,
  Fl,
  Nl,
  Hl,
  Ol,
  Xl
];
class Gl {
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
const ji = 4, Yl = 8, Vi = 6, qi = 6, jl = 10, Vl = 14, ql = 24;
function vo(t, e, o, r) {
  if (!t.rotation) return [e, o];
  const n = t.x + t.w / 2, s = t.y + r / 2, i = -t.rotation * Math.PI / 180, a = Math.cos(i), l = Math.sin(i), c = e - n, d = o - s;
  return [n + c * a - d * l, s + c * l + d * a];
}
function Fr(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function Kl(t) {
  return Math.max(0.01, t);
}
function yr(t, e) {
  return t / Kl(e);
}
function Ul(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, d) => d.z - c.z);
  let a = null, l = null;
  for (const c of i)
    if (c.type === "draw") {
      if (ts(c, e, o, r))
        return c;
    } else if (c.type === "shape") {
      if (Ur(c, e, o, r)) return c;
      if (!l && c.data.label) {
        const d = c.h === "auto" ? 100 : c.h, [p, h] = vo(c, e, o, d), f = Zi(c, d);
        f && p >= f.lx && p <= f.rx && h >= f.ly && h <= f.ry && (l = c);
      }
    } else if (s && s.has(c.type)) {
      const d = Fr(c, n);
      Ki(c, e, o, r, d) && (a || (a = c));
    } else {
      const d = Fr(c, n), p = yr(Math.max(ji, qi), r), [h, f] = vo(c, e, o, d);
      h >= c.x - p && h <= c.x + c.w + p && f >= c.y - p && f <= c.y + d + p && (l || (l = c));
    }
  return l ?? a;
}
function Ki(t, e, o, r, n) {
  const s = n ?? (t.h === "auto" ? 100 : t.h), [i, a] = vo(t, e, o, s), l = r < 0.8 ? Vl : jl, c = yr(Math.max(Yl, l), r);
  if (t.data.label && i >= t.x && i <= t.x + t.w && a >= t.y - ql && a <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || a < t.y - c || a > t.y + s + c)
    return !1;
  const p = Math.abs(i - t.x), h = Math.abs(i - (t.x + t.w)), f = Math.abs(a - t.y), m = Math.abs(a - (t.y + s)), y = i >= t.x - c && i <= t.x + t.w + c;
  return a >= t.y - c && a <= t.y + s + c && (p <= c || h <= c) || y && (f <= c || m <= c);
}
function Ui(t, e, o, r, n, s) {
  const i = n - o, a = s - r, l = i * i + a * a;
  if (l === 0) return (t - o) ** 2 + (e - r) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * a) / l)), d = o + c * i, p = r + c * a;
  return (t - d) ** 2 + (e - p) ** 2;
}
function Zi(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const r = o.labelFontSize ?? 14, n = r * 1.3, s = r * 0.55, a = t.w - 12 * 2, l = o.label.split(`
`);
  let c = 0;
  for (const m of l) {
    const y = m.length * s;
    c += Math.max(1, Math.ceil(y / Math.max(a, 1)));
  }
  const d = c * n, p = Math.min(a, Math.max(...l.map((m) => m.length)) * s), h = t.x + t.w / 2, f = t.y + e / 2;
  return {
    lx: h - p / 2 - 4,
    ly: f - d / 2 - 4,
    rx: h + p / 2 + 4,
    ry: f + d / 2 + 4
  };
}
function Ur(t, e, o, r, n) {
  const s = t.h === "auto" ? 100 : t.h, [i, a] = vo(t, e, o, s), l = t.data, c = l.strokeWidth ?? 2, d = yr(Math.max(c / 2, Vi), r), p = !!l.fill || !!n;
  switch (l.shape) {
    case "rect": {
      if (p)
        return i >= t.x - d && i <= t.x + t.w + d && a >= t.y - d && a <= t.y + s + d;
      const h = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), m = Math.abs(a - t.y), y = Math.abs(a - (t.y + s)), g = i >= t.x - d && i <= t.x + t.w + d;
      return a >= t.y - d && a <= t.y + s + d && (h <= d || f <= d) || g && (m <= d || y <= d);
    }
    case "ellipse": {
      const h = t.x + t.w / 2, f = t.y + s / 2, m = t.w / 2, y = s / 2;
      if (m === 0 || y === 0) return !1;
      const g = (i - h) / m, w = (a - f) / y, b = g * g + w * w;
      if (p) {
        const M = ((m + d) / m) ** 2;
        return b <= M;
      }
      const v = d / Math.min(m, y);
      return Math.abs(Math.sqrt(b) - 1) <= v;
    }
    case "diamond": {
      const h = t.x + t.w / 2, f = t.y + s / 2, m = t.w / 2, y = s / 2;
      if (m === 0 || y === 0) return !1;
      const g = Math.abs(i - h) / m, w = Math.abs(a - f) / y, b = g + w;
      if (p) {
        const M = d / Math.min(m, y);
        return b <= 1 + M;
      }
      const v = d / Math.min(m, y);
      return Math.abs(b - 1) <= v;
    }
    case "line":
    case "arrow": {
      const h = l.startPoint ?? [0, 0], f = l.endPoint ?? [t.w, s], m = t.x + h[0], y = t.y + h[1], g = t.x + f[0], w = t.y + f[1];
      return Ui(i, a, m, y, g, w) <= d * d;
    }
    default:
      return i >= t.x - d && i <= t.x + t.w + d && a >= t.y - d && a <= t.y + s + d;
  }
}
function Zl(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const i = o[n][0], a = o[n][1], l = o[s][0], c = o[s][1];
    a > e != c > e && t < (l - i) * (e - a) / (c - a) + i && (r = !r);
  }
  return r;
}
function ts(t, e, o, r) {
  const n = t.data.strokeWidth, s = yr(Math.max(n / 2, Vi), r), i = s * s, a = t.h === "auto" ? 100 : t.h, [l, c] = vo(t, e, o, a);
  if (l < t.x - s || l > t.x + t.w + s || c < t.y - s || c > t.y + a + s)
    return !1;
  const d = t.data.points;
  if (!d || d.length === 0) return !1;
  const p = l - t.x, h = c - t.y;
  if (d.length === 1) {
    const f = p - d[0][0], m = h - d[0][1];
    return f * f + m * m <= i;
  }
  if (t.data.fill && d.length >= 3 && Zl(p, h, d))
    return !0;
  for (let f = 0; f < d.length - 1; f++)
    if (Ui(p, h, d[f][0], d[f][1], d[f + 1][0], d[f + 1][1]) <= i)
      return !0;
  return !1;
}
function Ql(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, d) => d.z - c.z), a = [], l = [];
  for (const c of i)
    if (c.type === "draw")
      ts(c, e, o, r) && a.push(c);
    else if (c.type === "shape") {
      if (Ur(c, e, o, r))
        a.push(c);
      else if (c.data.label) {
        const d = c.h === "auto" ? 100 : c.h, [p, h] = vo(c, e, o, d), f = Zi(c, d);
        f && p >= f.lx && p <= f.rx && h >= f.ly && h <= f.ry && l.push(c);
      }
    } else if (s && s.has(c.type)) {
      const d = Fr(c, n);
      Ki(c, e, o, r, d) && l.push(c);
    } else {
      const d = Fr(c, n), p = yr(Math.max(ji, qi), r), [h, f] = vo(c, e, o, d);
      h >= c.x - p && h <= c.x + c.w + p && f >= c.y - p && f <= c.y + d + p && l.push(c);
    }
  return [...a, ...l];
}
function Mr(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, r = t.y + e / 2, n = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, a = Math.abs(Math.cos(i)), l = Math.abs(Math.sin(i)), c = n * a + s * l, d = n * l + s * a;
  return {
    x: o - c,
    y: r - d,
    w: c * 2,
    h: d * 2
  };
}
const We = class We {
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
    this.nodes[0] = new We({ x: r + e, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new We({ x: r, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new We({ x: r, y: n + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new We({ x: r + e, y: n + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const n = Mr(e, r);
    if (this.nodes.length) {
      const s = this.getIndex(n);
      if (s !== -1) {
        this.nodes[s].insert(e, r);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > We.MAX_OBJECTS && this.level < We.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], a = this.resolveH(i), l = Mr(i, a), c = this.getIndex(l);
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
      const r = this.resolveH(e), n = this.getIndex(Mr(e, r));
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
      const s = this.resolveH(n), i = Mr(n, s);
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
yt(We, "MAX_OBJECTS", 10), // Max depth of the tree
yt(We, "MAX_LEVELS", 8);
let Bn = We;
function Vo(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function Ko(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function Jl(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function $l(t, e, o, r) {
  const n = e > 0 ? 0.95 : 1.05, s = Vo(t.zoom * n, 0.1, 5), i = Ko(t, o, r);
  return {
    x: o - i.x * s,
    y: r - i.y * s,
    zoom: s
  };
}
function _l(t, e, o, r) {
  const n = Vo(t.zoom * e, 0.1, 5), s = Ko(t, o, r);
  return {
    x: o - s.x * n,
    y: r - s.y * n,
    zoom: n
  };
}
const es = xl.create({
  blockSpecs: {
    ...wl
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let fn = null;
function os() {
  return fn || (fn = kl.create({ schema: es })), fn;
}
async function tc(t) {
  return await os().blocksToMarkdownLossy(t);
}
async function rs(t) {
  return await os().tryParseMarkdownToBlocks(t);
}
function Qi(t) {
  return os().tryParseHTMLToBlocks(t);
}
function ec(t, e, o) {
  const [r, n] = t, [s, i] = e, [a, l] = o, c = a - s, d = l - i, p = c * c + d * d;
  if (p === 0)
    return (r - s) ** 2 + (n - i) ** 2;
  let h = ((r - s) * c + (n - i) * d) / p;
  h = Math.max(0, Math.min(1, h));
  const f = s + h * c, m = i + h * d;
  return (r - f) ** 2 + (n - m) ** 2;
}
function Fn(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, r = 0;
  const n = t[0], s = t[t.length - 1];
  for (let l = 1; l < t.length - 1; l++) {
    const c = ec(t[l], n, s);
    c > o && (o = c, r = l);
  }
  if (o <= e)
    return [n, s];
  const i = Fn(t.slice(0, r + 1), e), a = Fn(t.slice(r), e);
  return [...i.slice(0, -1), ...a];
}
async function oc(t, e) {
  const o = [], r = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (e != null && e.background && e.background !== "dot-grid" && r.push(`background="${e.background}"`), e != null && e.originView) {
    const h = e.originView;
    r.push(`originView="${h.x},${h.y},${h.zoom}"`);
  }
  o.push(`<!--@meta ${r.join(" ")} -->`), o.push("");
  const n = t.filter((h) => h.type === "frame").sort((h, f) => h.z - f.z || h.y - f.y || h.x - f.x);
  for (const h of n) {
    const f = h.h === "auto" ? "auto" : Math.round(h.h), m = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${f}"`,
      `z="${h.z}"`
    ];
    h.data.label && m.push(`label="${h.data.label.replace(/"/g, "&quot;")}"`), h.data.backgroundColor && m.push(`backgroundColor="${h.data.backgroundColor}"`), h.data.borderColor && m.push(`borderColor="${h.data.borderColor}"`), h.data.borderWidth != null && m.push(`borderWidth="${h.data.borderWidth}"`), h.data.borderStyle && h.data.borderStyle !== "solid" && m.push(`borderStyle="${h.data.borderStyle}"`), h.data.opacity !== void 0 && h.data.opacity !== 1 && m.push(`opacity="${h.data.opacity}"`), h.data.slideOrder != null && m.push(`slideOrder="${h.data.slideOrder}"`), h.data.transition && h.data.transition !== "pan" && m.push(`transition="${h.data.transition}"`), h.data.transitionDuration != null && m.push(`transitionDuration="${h.data.transitionDuration}"`), h.rotation && m.push(`rotation="${h.rotation}"`), h.locked && m.push('locked="true"'), h.groupId && m.push(`group="${h.groupId}"`), o.push(`<!--@frame ${m.join(" ")} -->`), o.push("");
  }
  const s = t.filter((h) => h.type === "content").sort((h, f) => h.z - f.z || h.y - f.y || h.x - f.x);
  for (const h of s) {
    const f = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${h.h}"`,
      `z="${h.z}"`
    ];
    h.rotation && f.push(`rotation="${h.rotation}"`), h.locked && f.push('locked="true"'), h.groupId && f.push(`group="${h.groupId}"`), h.data.borderColor && f.push(`borderColor="${h.data.borderColor}"`), h.data.borderWidth != null && f.push(`borderWidth="${h.data.borderWidth}"`), h.data.borderStyle && h.data.borderStyle !== "solid" && f.push(`borderStyle="${h.data.borderStyle}"`), h.data.opacity !== void 0 && h.data.opacity !== 1 && f.push(`opacity="${h.data.opacity}"`), o.push(`<!--@block ${f.join(" ")} -->`);
    const m = h.data.blocks.length > 0 ? await tc(h.data.blocks) : "";
    o.push(m), o.push("");
  }
  const i = t.filter((h) => h.type === "draw");
  for (const h of i) {
    const f = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `z="${h.z}"`,
      `tool="${h.data.tool}"`,
      `color="${h.data.color}"`,
      `width="${h.data.strokeWidth}"`
    ];
    h.data.opacity !== void 0 && h.data.opacity !== 1 && f.push(`opacity="${h.data.opacity}"`), h.data.fill && f.push(`fill="${h.data.fill}"`), h.data.fillStyle && h.data.fillStyle !== "hachure" && f.push(`fillStyle="${h.data.fillStyle}"`), h.rotation && f.push(`rotation="${h.rotation}"`), h.locked && f.push('locked="true"'), h.groupId && f.push(`group="${h.groupId}"`), o.push(`<!--@draw ${f.join(" ")} -->`);
    const y = Fn([...h.data.points], 1).map(
      ([g, w, b]) => `${(g + h.x).toFixed(1)},${(w + h.y).toFixed(1)},${b.toFixed(2)}`
    ).join(" ");
    o.push(y), o.push("");
  }
  const a = t.filter((h) => h.type === "shape");
  for (const h of a) {
    const f = h.h === "auto" ? "auto" : Math.round(h.h), m = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${f}"`,
      `z="${h.z}"`,
      'tool="shape"',
      `shape="${h.data.shape}"`,
      `color="${h.data.stroke}"`,
      `stroke="${h.data.strokeWidth}"`,
      `roughness="${h.data.roughness}"`
    ];
    h.data.fill && m.push(`fill="${h.data.fill}"`), h.data.fillStyle && h.data.fillStyle !== "hachure" && m.push(`fillStyle="${h.data.fillStyle}"`), h.data.strokeStyle && h.data.strokeStyle !== "solid" && m.push(`strokeStyle="${h.data.strokeStyle}"`), h.data.edgeStyle && h.data.edgeStyle !== "sharp" && m.push(`edgeStyle="${h.data.edgeStyle}"`), h.data.opacity !== void 0 && h.data.opacity !== 1 && m.push(`opacity="${h.data.opacity}"`), h.data.startPoint && m.push(`startPt="${h.data.startPoint[0].toFixed(1)},${h.data.startPoint[1].toFixed(1)}"`), h.data.endPoint && m.push(`endPt="${h.data.endPoint[0].toFixed(1)},${h.data.endPoint[1].toFixed(1)}"`), h.data.label && m.push(`label="${h.data.label.replace(/"/g, "&quot;")}"`), h.data.labelFontSize && m.push(`labelFontSize="${h.data.labelFontSize}"`), h.data.labelFontFamily && h.data.labelFontFamily !== "Excalifont" && m.push(`labelFontFamily="${h.data.labelFontFamily}"`), h.data.labelAlign && h.data.labelAlign !== "center" && m.push(`labelAlign="${h.data.labelAlign}"`), h.rotation && m.push(`rotation="${h.rotation}"`), h.locked && m.push('locked="true"'), h.groupId && m.push(`group="${h.groupId}"`), o.push(`<!--@draw ${m.join(" ")} -->`), o.push("");
  }
  const l = t.filter((h) => h.type === "text");
  for (const h of l) {
    const f = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `z="${h.z}"`,
      `fontSize="${h.data.fontSize}"`,
      `fontFamily="${h.data.fontFamily}"`,
      `color="${h.data.color}"`,
      `align="${h.data.align}"`
    ];
    h.data.opacity !== void 0 && h.data.opacity !== 1 && f.push(`opacity="${h.data.opacity}"`), h.rotation && f.push(`rotation="${h.rotation}"`), h.locked && f.push('locked="true"'), h.groupId && f.push(`group="${h.groupId}"`), o.push(`<!--@text ${f.join(" ")} -->`), o.push(h.data.text), o.push("");
  }
  const c = t.filter((h) => h.type === "image");
  for (const h of c) {
    const f = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${Math.round(h.h)}"`,
      `z="${h.z}"`,
      `src="${h.data.src.replace(/"/g, "&quot;")}"`
    ];
    h.rotation && f.push(`rotation="${h.rotation}"`), h.locked && f.push('locked="true"'), h.groupId && f.push(`group="${h.groupId}"`), h.data.alt && f.push(`alt="${h.data.alt.replace(/"/g, "&quot;")}"`), h.data.opacity != null && h.data.opacity !== 1 && f.push(`opacity="${h.data.opacity}"`), h.data.borderColor && f.push(`borderColor="${h.data.borderColor}"`), h.data.borderWidth != null && f.push(`borderWidth="${h.data.borderWidth}"`), h.data.borderStyle && h.data.borderStyle !== "solid" && f.push(`borderStyle="${h.data.borderStyle}"`), o.push(`<!--@image ${f.join(" ")} -->`), o.push("");
  }
  const d = t.filter((h) => h.type === "edge");
  for (const h of d) {
    const f = [
      `id="${h.id}"`,
      `from="${h.data.fromId}"`,
      `to="${h.data.toId}"`,
      `style="${h.data.style}"`,
      `color="${h.data.color}"`
    ];
    h.data.label && f.push(`label="${h.data.label}"`), h.data.strokeWidth && h.data.strokeWidth !== 1 && f.push(`strokeWidth="${h.data.strokeWidth}"`), h.data.arrowHead && h.data.arrowHead !== "none" && f.push(`arrowHead="${h.data.arrowHead}"`), h.data.arrowTail && h.data.arrowTail !== "none" && f.push(`arrowTail="${h.data.arrowTail}"`), h.data.arrowHeadSize && f.push(`arrowHeadSize="${h.data.arrowHeadSize}"`), h.data.arrowTailSize && f.push(`arrowTailSize="${h.data.arrowTailSize}"`), h.data.edgeType && h.data.edgeType !== "bezier" && f.push(`edgeType="${h.data.edgeType}"`), h.data.animated && f.push('animated="true"'), h.data.animatedDirection && h.data.animatedDirection !== "forward" && f.push(`animatedDirection="${h.data.animatedDirection}"`), h.data.sourceHandle && f.push(`sourceHandle="${h.data.sourceHandle}"`), h.data.targetHandle && f.push(`targetHandle="${h.data.targetHandle}"`), h.data.midpointOffset != null && h.data.midpointOffset !== 0.5 && f.push(`midpointOffset="${h.data.midpointOffset}"`), h.data.curveOffset && (h.data.curveOffset[0] !== 0 || h.data.curveOffset[1] !== 0) && f.push(`curveOffset="${h.data.curveOffset[0]},${h.data.curveOffset[1]}"`), h.locked && f.push('locked="true"'), h.groupId && f.push(`group="${h.groupId}"`), o.push(`<!--@edge ${f.join(" ")} -->`), o.push("");
  }
  const p = t.filter((h) => h.type === "sticky");
  for (const h of p) {
    const f = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${h.h}"`,
      `z="${h.z}"`,
      `color="${h.data.color}"`
    ];
    h.data.fontSize && h.data.fontSize !== 16 && f.push(`fontSize="${h.data.fontSize}"`), h.data.opacity !== void 0 && h.data.opacity !== 1 && f.push(`opacity="${h.data.opacity}"`), h.rotation && f.push(`rotation="${h.rotation}"`), h.locked && f.push('locked="true"'), h.groupId && f.push(`group="${h.groupId}"`), o.push(`<!--@sticky ${f.join(" ")} -->`), o.push(h.data.text), o.push("");
  }
  return o.join(`
`);
}
const Ji = "data:font/woff2;base64,d09GMgABAAAAAMxIAA8AAAAC7dgAAMvmAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGoNAG4GOSByFAgZgAIgKEQgKiYBshtchC5IoAAE2AiQDkiQEIAXzAQegB1veTnIjbLdbehFQ3gC47dfXFsVcELftCZam59bDSCQlLWHbtB4C3QGiXtrfl/3//2cnlSGzDSwpgJ2bql7d/x9TQiFTowtFdwpj9GGzW++z007NWri0WGcTyTgrkbRte+ZmE5LFyWoXu652KxrVJmbBjm84B2zLuzuCh1LPfXV9eV9A1jU0Rne9+oXFL5CuvzOzpZv1BmbxeTE7i+9ELDk9i1ZAHKr9wce3oxeFRPjjf+nfjnV4wMf6ChCHkFiyA9VNFPaH/okkgU/9ZWBsjLR+RHTUrhNPVHyH5+fW+/9vf1F/UWzANsaoGNEumtrG6JIQWrAABRXjCCvAqDPrjOjz1LP6jDq9UwPZdWvlxQXhQf4p1vjP07dnN4AKETSDC7utbwMKWFgCFRVWBPzGltsPV5qmUuYUkYN/nr4O9nb/WeBBGCQUWOMJ5xElnHAgCWTd/7q0VP/Zo2j/3vZ7sjPrzNwVNtgmweBwZI5TgADFIDGSMCHVdNtvUXT7+g0ACGnOXB6bkRFifrpTqAQAS6z3/sU5rb9w6sqO0/KAwcwTSEtUKozH4fLzw+g5HF04nNtko+fx9m6fdRRRwNEoEIion35b//dFK9bAeGZQRxywdpF21yi2sLZgW29wq335lZ89Ma9brm5hJUl+A1Q8kXJ1q44ncIHz+eCWvfl8mckkk0wyySSTJL9a+9y1sxX3geCAobvfAW3FETsd4YGEBRoIqEBrIAtQmecTIxqcW1uOVzMYnBd62ynCxhguT54KwaERHAAown/92tvVif3wJggyyqOTpyIT213THaRFdMsK39Suz6dTcy/b3etmKHFgTrfMzbA4UQmWrdtf/1+lO0cmUIkcmuOUSJX+L1UrYI/E2z0xKHSWLbmtnuwwKdjjTYEkJiRNDNc5VV2rrr/qAyiQVCgAJEFJbotBwanblOTUuYDakOYrnX3d167dW3VVt1oBUGgFgoOEMJrBEwgOMz92mLF/YkOKcDVXSSgTlFqBYCMQIEAOBNvgXF31w2nfff8vp1XV21vV29sHQcOCbDXM3IDOe7it29udJQ9lAcC+OldBSTIERJaceCDUQIMYWFyzoyQtj4weCzUh/4XKMZi2UpSTkiIe7Ty2b+F7iJQWkP6fzbRdnS+MFWDpovVLB02Tplt9SQezBt2Y9kYGaWVco0Z3gdmEBSboQlwx7KxlmD3TbnBl3AvqgjpXAaYuTWmsnKJLmTJlyjyXvsppsW2Tmv236fdiy79g/1T+EUkHJDRB5MwdH1lHV4NXlrU4peH6rj3z5Fd2UVphvAGUAAYC83ked3GLst4i+s5trS3LQj21SxAmweTvl6ZU73527tZV33UFXda18IpSOkAJIdLblq93f+RIbtJaI5emyFVKlzNzX9qbk5TW5YNpsMEg61wrS+mElA5LAyQBrAJiwwSQBNEQmgkE4TQAx6+W32zICovF6BTL48zO6+7p/X8v5CxUz+zlpCArhdMI4fdOnUWCVctlOVKUOEth5cBtE3WISjfFBvIs+Y2T7/+3H62iFjeSKU2l1d1ZFUffe7PyB3XLJEnBpHEIjZTuIJagbSREiPRGiIRKxH9+v1KdpAQ2skBGVy1MKlRthScgBQDvvxf4f/Het/QnwK5AqAgVkw4RuN0t4LkzRfe3QKq2LnWVrCJkhawxFXLlyrQqrZpJ2SGpxMgavYUAp81+m9wzLQ4n8ljVtfIzZcyhxlLI1oFDIiT+sUikQGK2V78sCMnuaEizO8HE767/9Z2I5cuB5P/XspQSymFCF4zxhKcJo9MHEUoIxoSYVqrec2ty2rl0YXE4rBl6wowoil6XxzcxZ4ltSamPV3LFLCYsRhhjhBDDMGfuZz/Na2vS7uS++rVGBl6iIoK8xxAHs7csV53Mmj1eokCBQOszpQIJsgv/8L+pdWZOVDBPIGWi/+MeXtkNAAD9Pgb+/pwNAgCAB4/zlQAAHr6uY0BgdAC6NDNnDlgcJiYcuVgQnVyQBg1w2vWBDJgLssBa7NHvldHWOtEeAIAgEBFAKFBoCDcMZrc5Wd6HHE0Y6RRqyFCnDw10aDKEVmNo8z1MQocebJiCDzOpYRY7zJOGIUVYrgor9WG9NWy2DVsdwg6nsNs97PcOh2jhOCNcIsNVbrjOD7ck4Z4i3FeHR9rwRB/eWeGjHT6L8AMjXRMMIwAKhVEARYaFoHzzBRVUMLiQQsCFFg1KkwaSLj0kY0YQHABgAEA/4O8AFXF6m3FMKhgy5kkBUrejpFeokcWSlVgB96jHBClxesGkW+L9Es1PJOqVzEpiQR4Gfv0oak7nNPKKF2lJON+4OBG/6qSTkjCqiBKs2l4MiEjIKLQfCAQNHQNGxleYOAZJ0uQpU6vFeD1mmmcZGBGs14Wv5HHo+EagN3Tz690q/7DlbZ6y1W3vUfn+Le/wg63u+KzKK7Z80LN3f9hzCb7gI36GwkCPuiYAbseHgDZ79JNikLBoIR6HEzlvgSCck1Q8UcywfQwI64wARHy+Bhnh7fBIKFi4RoD30u1Fs9kXeBjwK40ZfZtfHkb/y2Ir4PGaZo49YoN6+CXYFr1AaN0mq0eBVwgyBAWEAcYEY8GJA8n7gxLnDMk1yW0r0MCjDb6QDz61Uh4FG2AcECGYGMINTA6lAAsGCwELh6NLAgMjMhMGCxI7MgeyNFTZaIoRVYC1JV27DqjOhE3XBzaQsAUWIliaBEOGkS3HsAHZVmR7ofZDHYA6iOAQ2GFkR8COgR1HdgLsNLKzyC5juIrhBtgtsNtgfyG7A3a3kweJHIAHD8BDAOAhATBJZICMpyqhPJE8Z3nhiiJkIqWiZGJUFSuvWFGlVLWiOqkmeS1SHWXWu5mMUtPd9EPZgMxsmWXyVkitVfR7+e5oOxTtU3RA6rDUEXnHpM6XGnCUKLnJG24Iq3HzYPLssS6LxvgbO7oVDZ/UyHw2wqMGDIALNgAcYgByxNjESTCJU2Eqp8E0TofpnAEzUMMMz/ArKIUZA7nIFLIxC1iIo2hJMbI0E4tvn6dQQ50SpWMfY7QJ8l33ApeWYj3n/c6H3gY0j1HBXjBwqqHWOEohTvsKvv73Uv5dYV/jJhF3UcBiqREtSsudGxBtkec5NPy5uLsSDhiAo3iQD5DZ+kGa+7fo8VsIw2ZEHDEjxrVFj6ILfqDJ3bCkDONngWdg6a7WolcKoVALtLI3CjqnKwBiFzsZxeweq0rX8PeW3H7EmSPl89fauU64K+VvmsUsw+oPXDwxQRsj3JIqSTeV3EV2FWspZ8tOMtmbRjS5oedzkVIvDkY7DZrC54vys6eklUQehmYSVcIShG5GDqWD3myH8LAdxY4yiWGLPblWbrGNdN5dWaXRg6KyvmMfD1ybTYsxHOQh0mQKTGtFtOlSq3tjcYCCYNti7W56cwsxtKX43PvV760UHrzz9Z/p4csOzRG4/ViV8SOcOaF4OVa7d2bR/PqBrVu+/aKbi/u93aL23onFw++y/WyAvg5AWmGaaLzTXvwrj8NnV3jsitWg7+Nxa1wd3U9tHd59uth+jci8Iiotfq4UP0B3pj0jZbgm/jApknPYxA6JsBrVsW6RNS8kyVGyBc6BssRAGCznHcIoo8/z9To0jHicskzkmmsLFY4vq7q9C0RS66rCFoqgnQYS6LpgAhqL3HktBzMEwqFxIrXOBsLAoNXt/IoEuCC4Zp8KA461CbB4qCSdXAYosjQQPAC8UV0YD2hyzJIzFHBFBvOai2JNbCvdeqQHAi7iuxiQ9sAoKWXpMkasLOWJz2SpzkivZXBXa+Q6qtSUz0Mi9ZrVebI5YSofjRIKeSo1RTLF23KD3CUPmJxyEiDm9u1Eg51TajpDT73CEhURJUYgwetcg5bLXJd+2jvUpkyXXCXKXHgUyzf1XlGDdIXEpyvoXe1WU4B1hypMRMQCW0ieEKvL1BK6vqhkSNaz9lakengG8dnmiGyxViq3b1Nu4GS/8c0vqE5y75JC+sk0r3sYU34QPQEcDWx3jL9UwQa0K3koRPaSByLWFOhtVn1Ui0a6nlPwgMqnRmzC2IsWolUYQIiCTzPNsCPArIGMWvenZzyW/gQzifrVZcXL1mm62TodYxx4wn9eAQbijsuaO3vCqFExEQdkl5idjQo/8rvs9+VogWxcwbUBwArBqI3aR6rOLEBIIw6mM96jHQnKAyRUoYiozp2JAj7l9Opo8ZTby+eO1gDuO5oEMc0Bo2CbqDhS7NiXywiLgQIpoWcvL8KJGPvHzh6QVws3vtnTTcX5zNaEOLWbe8R9iIfuEwJCbVH/OC3KlJimf+oU2SmeilMA51CgLyPj29MEnXrtEsc0wrXWuluGB+o3YkYe5blD4m5JUBp2w7iO3m3LcV73x/P9+f7+LSpKtBixdPSMTMwSJEpml8IhVaYs2XIUqtCgQ6cuE03Srdc0080w02/6DBg0y2xzzDXP/ErnxIsstsRSsYxPd4WVVlltjbXWWW+DjTbZ3MyR32OfP/DP3yFHHHPCKaedcdY5511w0SWXXXHVNdc98sQzL7zy2htv/eOdDz765LOvvvnhPz9ZA2ggHISHUIgAESESRIYoEBWiQXSIAWEyckQYoApKyipUVXVNW7bpWgwWR9uOXR1dfUN3vvgqV+IqNeFE6mmGNTgb3fuORKExWByZSmdzuDy+QK5QqtQavcFottrZOzg5u7h7+1KoNDoDRjGcZHO4fIFQodJodXqL3eGy3LaH+4RfSvjPAByMwDgYD6MwASbCJJgK02A6zICxWLHjxI0XP0HCnBIVmLKQQovMCBLIE8yACkaG4QEAcgsA0CQ2FmQbACBwvhlbRrRURsNPZ5IdquQLXQALWCENcqAIKqAWmka1S2fUG00PDTw9fP0/MLeRvknXwNrZO2DzxI7Voi5e8t+qf2JBRIgOcRCMZotlxyCxE5ejWx/liZtkE0/iYMlMvlRttHX29Ac4L/GpDDZP4pfW/BkOAPiqAMDXBuDrJE6WZ/6FFJUqQwnZyyivkkYC8GtraWxdTWlms1rQUKtaD8AfBuBPdqBjnelSN7oDwD8B4F8B8B/61PcFyOUIFWGtYF0A5FbrvYGgKQEANCX7xXPVPuHhAA+vgzFHOtXFnfYt6w1XN72/N+Hc/RaZsL3Pw/dhOBGIxO55qBUnvaLHqGrLqdebDaspzUNC1P4zgRbFMlcKTuYdAB9oBY0E3tskFs0NdfNd5xe2gYfXQlHAopiEJCpIk6G74DQAiPbWKZ70/mviOptUo0YloV9hwjwRgEUwT+ZJIrgy90U5GTFz7DwcRqE9hjFARHXSWDtv7HO+4t+bXJVYsrtM/wBay1dEkeMAAOXmWZpIOhWd8pyIo146MPXJEJUs4SRNirKyKMd41KpZPWvEBmib+e7Z85j984eZxZgu2Vfh1vw5twd4QE+MK8ra58l/zH/z//x8JgqTYYph/aYyLWYmt20EuU+cBq93LkwMDZMkDlkKlKnWYLTxJunVZ45FoHo0Tua8UGxjJs6B8FbkSC7C+Wd+cfHbhvkm0EWsEgwrnVgMB/RJHDktKVttnh1zYC7N9bknDcqCYrgyrAUQSKk+AChnkhSZkoZiKiIWwe7C45uBerX2kukK0m3/PBHnwNzLNyid4fC0zNSCVOA2n66Pjbbb65ATzrnilnseA8aeAQCYu90/IAAQRZfe7qNs9/cBYDFgYwE+Dp+Fz8Hn4avwNfgO/Ah+Ab+L/8XoHwIwrAWNySAZnd3it+rlowGaZlRsCvUbMLsYf7Aqk4kC/Rx76nRlo93SEDTbWbqtemYf0IaVjT8YKNZ7ZYUVKdtItnAvOHShBbrnLhuCXKBAjgqtCHdmGb/t9HHqJQT/5xRmffCZrMmZ3Mn7uBOFkige0hUzUmTNgHAyrdM27TNmxs64GT8TpmMmtWKKoVkfd39dF8zCWTSLZ4lF8Wpp0ECkdtRWEgq+gkWII5pKazrse7hA8caFANmMPJNyrMTxSaTCWv2LL56yGTl102YaXMEFfNMw9JaE9rYrxcmCFwie/KkLvnHtezHu6Nd+wv+3+3O+H2DcCOj0E4jEEqlMridElARpchSpUKdFl/5CRUuULlexSvVadcsUlaNIhTotuuQqmx9//Tc6ubh5ePn4GzNjyYY9J648ePNjYNysZZv2nbr26N2vwdyeE1cevPlxmJkhb0Jicmp6ZnZuoBDhosRKkCxNphz5AocMHzV2wuRpM+fMHxyZIFmaTDnyJUFC4LwgyYqq6T4RKQU1HSMLOxcv/6LSiuq6xpb2rt6aUh0jCzsXL11cMeRQUjTDcnwYhsTgSVQGmweAY8lMvlRttHvBcJ5EZbB5hNkXO0vfhsbm1vbO7t5CJcpVqdWgWZtOPfoVLlm+au2Gzdt27tm/uLJBszadevRrAgDHD4BgBMVwHggUAhoOEQUdCxd/UGhEdFxiSnpWbkwoDhEFHQsXTs327Lv/cGllbWNrZ3/YmEkz5i1Z9dmwbc/A8LGTZ85funrj9r2D8XlLVm3Ytmcx3jzuvXDx8tXrN2/fPeiI404564LLrrnpjvsOPvL4U8++8PJrb77z/sMnSC5YtmbTjn3LEGg9iOIkzfJeSFRCWk5RRV1LV//Q6MT03OLK+tbuzGhOUUVdS1dewVqqx2nZjuv5Y5lSozdZHW6fIJ4tN/vT9fH+DeJ5m1Q1tPWMBH4ycAwyA2PwGGKGjOHJ8GeEMKIYKoaBkcCwMzIYeYwSxkhGHaOFMZbRxZjCmMmYxVjAGGKsYqxnbGXsZhxgHGOcwZ4iBLwHANajgJDF5+Lho9e9ugY3QDGA+lhfbf89peAfeBYsvRJ17FS2NxsHz1UxBaiJmj481bC+2NTGU3HLnJr5wZPBr2gQ8fbGPK1hAU0CkBb1WQP+BWCySpz3s7ctrj8kbpaNAKFRJCZEwQ7TkqCeUwTUI1EsQSboFJCBEFC/iL4T3Qqb1ORPaL1UZSCPX/sd4tYyluTf/aKWQK7opxrqGeV+pcu6VKrqE7z2zcPxlfuxNFWp09ZFL6Tc/mCest9za3/WVuTNeJ/roONj2unZQHi+vxcO7JX9OEUt3lN45E5Onni59fMSFNz+YBG33eHZ3pFzG7vd5/TcmWe3W8e0m6yPHK67Gw4akGVJ2JhdzYY0Vfs+IQTbx9mZmXPL9YznOwKpw27lkwOAiXk62vVqzYKwtTaJACTU3ks+WHddimtIUIBHSmDSdLaqRzZOOrAK4mCzE72U3qurdleVNByO55n+WTBmNKr9lvdxd2CSsh/IVAtgIF6rUMp4cFqqTkptDLnzyXnOPIoroxr4QSksqD3ttEJDdN2eQL46EIzFI2ABnK2sD/tqk9fgBbWvEfgy4n6KPClfbLCLeGSa2k5LRiifIPWLDtlWGxcjDZuMD7kVuD2AWXrXSKx/UpL8jP+UlSTWHHEfUEQJSiUwlNqjXCBhm7N0uu814F/tdVxJZ1Ba2e6/5pWTINMNDxdDZ9o6pEv7kv1QmASBCs5RZInKWNfLUgqzGIhA8/Bikw+jnwxngJzOhLMQFs9srJCVsxrYmXe2P65gF0uflpXQPyeif1O/HskY+23z9P35bhvphjseeu6tTzaWAGAcgGAExXAeCBQCGg4RBR0LF39QaER0XGJKelZuTCgOEQUdCxdOZbYHw0SYDnNyOmX4669vwUUUly5L1tLKqaiKamuqvY56mt5A81rSita1uZ3t70inutC1bne/p73uQ9/6uTiEjGDLW/HK1nP9N2SjVrWGTTg8KumP32s+2k4H2TzgXj6ISGuaeIxedaROx8yVAEKb8K4igXAeykewo/lNeKfzL/LbtGoiY2Sr8WSPzMd1KBDJHc9RvLKVQZ1DQcnp2I7qYNFjQS1KZT5M2IxBoNFoC8SX77lwgZyTESfCCX8WfHJUggSEPFGGDMvbTSh0mQo77T2xwKA5nN/cpaSWWcvDepsF2GanEHsdFOGc6+I89IrJG2/YLevTTYnreMtsWFFKj0eN2uenXkd9XKVo18usqXpg79U7ut13o4rt9rcAjaDeOg2dmMKBK95g+0RVblLjWplJYBWdgN2inLi6ztO3cMwi4QJSdAl137eN0gdD5+UP5JCfN0G0SxqwnusQT2WZh3EEaBwosz8oDTOCI5LjOE1G4KUTqkNGJJr2GJN4lwQwp1KRD34Qq26FYpzU4Dvi7yS/cRlv/hM3caKLLErMkbthknbdAmxRy3lLaA9pIP4Q6Ff1Eyt30oK86OwrFG2UsvNQ9hZJyCUnUT6vbuFOw66QIwPBLSCfmNSmXrpiNyo2wBBSxpOlWa2SFWsyN7WwSpNTue+RKRHmszD44hcs5V2hXAQDNBl2Ngk0YIIkcEAWFIwqA0C1bDirdi+PL2z1YmrBDg+88ub8RRjl3dUs96/QYab5Mwh3GcRzQ898xhrxFtA3J+DICXiQRz48XSV7chTcIt7PiA7VkiR0PxwCfeXLakYUr1RFS3wdCy6OeI0uJYm7HGsNMQDxFjCE4QAm+OSEBLxKeVwo+F/Bc1MTqwwFKdIeIdPmWq3WwbZuge10G7nz0+KSQd3AIeM23YGGZIAtiIbovTSTcm8+AIRdxO1xEz0xEztxoZmGO7wRjpMgs8+iYJELkHw9EjSwgHrie3uyjxq1dosuQ0BwJIs/ke4FOR2YWm/EQPjywexZCIdHOS5fCDsmBwjKofOaD7lYJHEosW/4pf1rc7D4rlGp6WmFTl8umI4dLsf0wSPWWwYA4l9pAD0b9/1unHsI/MeHARanrLvtQnKI5L8w0nLRC/y2TMvNgKWQgi7h+BJEnvaTxLclAGaO83czbh4DIIMKnsB4v9tid8LHPONnYH7ZWXj7O9ndxSFUxHPHb+9O38Ed3jV7cW8e+Ufx0Xz0H38eL45/btJdfpQoJIGSKMn6hieVSf1lrB/wLwGQGLLBdnsTOQkzMP8lQPVPdKslTigAkyaeubN3+a47GYB7/tFw9B23jofH25t0lB8k7AtEMnaY+QMq2V/g13Wpw68Ue7RLKxQtNxF5BcewimaAn5f//+x1O+2yCP+9pPu6pQMB+P/0aGCrAODBr/ZgPPDg8MD9IwAAAkAaAEYaL3YOmQCao7bpVUAUKT4PykuVzVyuQqWR6l5JvQaNSZrksQLQ08c+KZFhCgAAtNpgO6jtrGtnfBfg6pm8FIBvEeCWpbfKPUU+YbrT9WPr0Mjgf9QYOjcgYbjr8E8nqfpFX7W0a3HuyMbBxcM/JwIi6XzW6tmlZNzIG6C3ePPh2wYtA4c7Cxn6ijOCipqGti1aGgbfIr45WiRJzsrWIk1pn1tuo3R5rjz5ChRuG6UTdJpo2if64RdaYJElFltq2HLLWqKHrrZK/M58vY173mS7bXbYWZla4WaAb6nefNXX14+p/JOldAAAowBZQ6AMvisAvRVY6/iHO9FWbYro0H1QWYdqrgKi3Ti/hQSRhUUp8XZYWwCwJwEAfIc88xKRyz8BoKEuSfMw1iRjdOsy2RRT9TR+fxaA6WaZLf/mVdRjVBPt6EavMaYxjAYA0CmZX4YfD/ob3DsA3EOBI08Bf79/9NUFpwqHz+T9NAJ6nIO9I7F27+GHyHrHuGooMArnR0llwAj0yDlcuiPLfCWepzjqdDF8Dlo8hVI7JM9q4AoEFW7jESJ5L9B8s7sE3Tqow1VFx2G9GNcj9/jaSufSOopD6CS1pa+rYd2w8FEuo8twh9BTn1yMZe9xMRjz8jkOQUGcx1Si8RWC4V6XNXGKBeyho6eaekk7UloJP4R62HR9GafLCmEQKqgvuEVHkFiUdWkinL5sYN15RzR30rVUTvjh6yffCWZGShjpfF5vLUb1YlZVcOsqXL/dko/auGgghGpZq4K7ffQoF4kTKTf1i5vF2To+jbqPV4X6brltvzs9DnsfVpNnQe3GNKmNNOz2hDo6v/CJLKlzde5DsZFqZdzR7ezw+DaYXdpLG+V6ib+4jEByUsMqfbs7btBM6RtZSgw4OxcqUkl0m14379Xz3qS7lY1EGoksEnkkOpEIJBJx8tfU0w3dsA3fAIlpzGIeAwlrK6dQp4U6K9R5oT49hoDcSOleSEMW8hDIhLXFwEbURsxG3EaOjYDYCCeXYnZBdYHpAtcFILpAKCkTToAsBd+hVcyqmFexU8VAqrgC1BSRRS1mcQtIwGb54L8Ul20k3yRYEiC+RHtT5rIpd/kUXJgqruIXlR4WwtpM2MiyTlsBRP8CH5sqiuGMX/AzuICnR+1CW3Of40cPYoc4sUzkGAj8CEYM8sFpYZfwKVd5pM21LlNZV1O1LlZxV1CFB+MV89lK87WV4it7pUJdlqu43RygjUUZlKniP/kWsu+Yy95prvZOcZVTNmKnfMRfX58qIyXeHCu3+Me3oWM5oWzJIVgQ4qSFkyHKWCjzfP2BH/MJD/gEyDM2Y89gBs+UmbL8laWWTMxKadYzRcROtZF2rN1qKnAFACdLDspQxh0ZAAhOooyiVUq1LJHzAJEowAbWEEOhDn040OU8fOtuprV5tsa4FEf7VKdWEnemu1teHveb8O0qiIH0gRA945EJ0UkjX57Krkk0K+ENJjrN6Z4+bAWZXI8kqkliNLa/G58NPtWBNIBkcqRBBuTT1WxDN0DetNj5aRwDOT1P32YuIubTNhxGYsrJbyn5m18OfR+is8frfvvpcXsZOBo/fOGlSka2Kh5kD7KmjfRiCiRnN11Hd16rBaY98KFYa6TcnaDxTer2wJ7cKBkifVv8dtbL176m37bUHxw2HRHZ+SOpO4nDxAOTtWgAh3viUaIg5uG79OfzcW9bFVTsyy35ex2FYoj8s39tOZA/0GP6gR2zD0COgUxoQLcbJahTkGileaZls9m8lPmDD8pPCe3ZOLWSSuK+B8KcnxP5XD04ZYyU1fKhjXSBVLEV5OsT5ducw1wAXC6nDwYPPczJfGOkZ89iErmo5CaW567y7DjK8vaNyIstvO5f5yK31QzPxMQvpGDAFIhmPOcSOpULJwiE44D0gfAk1IticdJ07uw4qq2iPsOU8pFizC1zVI6w00co1VgSAH77qY/+i40vIMY+q/BUsHNlZTqSRi6O4nE9p8tAP743TDJ1DVWTISnhGdA6S6cRuXLL95INKzjqp+uuYmWld3Pfg8sx97BqdTAVholIKZZjzWReqG76QGNoOtR9EeeNBKoh+dN0UxrF3DnQAQqJEC4MdiKHXgW0IZDJPNSIMsXEOb5RiQkMfDKdUkMy3DAtmWNybUNVHel6tGLGrg09tMWtSXwZmULzGXsiFaIpVC1sGVva8SwEZFssoiIVQhCtpNMxkW6Jrk6qIUISoLKvGmagfd23aN5otths+lzpsTh5DABB5EuFnq8v2/zL10qhKMJ4P8PvYdn6WAbMyGEDxVDjlpcUvX50DG+Yws3JLeE/+iDF5Gri+ciVYOAVSAag3dEQdbiV+XktmVlZdpcrnzWna3Y/U6LJdhp4IdA2WFP22NgBM10ZIIQ7JALRu6mhO2IsXmyKN2DX9JKi6KkScm1Eth9wNXuBaO0F2STdntidf55Sd5exT/GkukBxgG8lQ8loI+s727PpUzk49ltn1mtRIq9rfeA6rWAbP7nrBJEugHTzpqiG4jRaygXo5Go13l/jfXefBVbBLRMw+o6kCv0fstnspW9SBbYBMoEJzRprylCez5nuaCdSRlTOCsYEg/Q5+tB6S1h85EBSTeBf8aav3kNTaBpeDJ9lG+ECd4sXwOqxdCMNLenN9b5Q9plRSkSRqZXS9uRGLq1XevbBtq8XRovJsDmXTYrcXUf9+UradKMe8gRieS8NSDRUFMaZJJaIfkPxLX/CyVXvZO60ICx4XpnoIoUDKbCUR++uOYdBePQyC1yWyKXlS1LgoygIoDJ00+XqiCf1Zznjz9U93hDrZDE5W6qGKL5Pd6XAc4HRWCf7vSGPUsa4ks0Z8zFhLuMcSBQpgwFxmozl39oJPOqPA0Os7iPQjLgQxW7xIpbEBNQOqQKd/Z4OpJ4ezhPnSZENMZzo6xCWyv7vvrYHMDGf8bKnXM1GQgJl+yRoNNGC7aW3MTbk5ptU37ZeUyzwpbW4XgB8C/TjD4xmtPHMmQd0au+1wChcg7RjqEi++WGeIZaWKQ8P/Z3H1eSlT5+4+xiZivkVrfm0/CIrtL6+0AyDWtd7DQ/ZHO+hj/32rcs7zydZZT+vrcBUdRxEOhPQh87e7QeX988DhUQvJc25dSHY/tIKjggsohPbn7ySRJB1FGuHVFrtwt15Rmvne4F5CfOe+hkzscUi0DulR8efiqxFEUVlHxlT1GsjFXhndS+i4njRFZPd04NXG1LQrj+sEJjEJt+K42R3am1qJtSoXo88rku9y/VK2ZK5KB3NZY9F/Dw2kMyCaYD0sCpCNZEKxKiWN7TmeF3XA7ZQvU62YQkJ4G0pkAYu0oYLDFaCjAi5JkQSbK1O0XRSCn6Top0OF4V4tPt0ctGKrJ/QqWGtq6M6OhYYGHr3zRW6HLNCVKHYxQhi7q8VgeJrs1BStIhPwxuaniNnczcDoL0AkmPiLH4+znfv7z65azsNmbC0N/aoxzozZxG89J9PipQRl6cdnyFD+/0XZ0D64PiNzQtGG7weV3GbuaqUNuUhpSQIVr20xDNxd16/Rm8P79xc1efoGNOen5jL/ieQ8aE2pgojAgP3I9g98LnpN643bFG0ISBSs+px/5EU3NGaYdIQR/MscGa9PYblCZUSlX27jd34KK7iaqNAfmw5LU4eXxBtz1BVhJ4YLtr1FSPFfGQuqyRzUUOyWUL1OQeNWyQVYmKLno/vcKQAYjXlhYKgEuRBMNCHbpc5/PcnYD84zvOczr6ODlnikTNnduh1kZ0IZIeMOFzBWuoWMqxWssuyVu6rnAA+bBYsm3THo3odLxkUFkBBYN2STd5OIJALCgCZFZPtUfSS5A3mXUztuC5tcU4kwsR2kpIRr06AtJ+qfJfx2JQnAfTMoxRfIdZAIvkR3Tfax0NR6yG/5yLYb+/6mUtkghruamAFJhDeCG93hH0sd4KBydKN02v5N9c4i6/dvCn8R1IVKu8GVuX5nuDJ5PxlPf7NSsqfQl67NcdtsM+Rgb4pN4hFuJFCe59gxd7xz0/Owuwtks0oTVPH9WzxdVewOMCJLDJLqD7+TIJwBbVZl7Uylb0XCXwDUPmpwmySVlT76veuEUvKtrNgEWor6PveZMMKns4zo5S3E6XtzC7rDJ8a2yYDcfvRfmBMh4J2ne/DmLopwyfvYrYrMurKtkzEFwUXDS38gN0ohZGgIWN+HB58VLXFUyAD8vOUERbVJDp+kPXdHQWxFHwlyMEUgo3fMiRH67JM1CGF2pj4tEBUgaN7AFeQ8d0x/5EbQ7a185ZLVyhXG7xhNWHVwNbqCed/sNQQRRJgIpTU5ryYGIA/4N3qqKq4seK2XSBwRCCkBsxgFKW1hrbVDGjmb7yuQSllHsSrFfbo1cCU5lX5cDGZ2Ge2HSpoi2iQxOKwGLhNNIOs/kG9t3JLSc9pgEXBFgkszjDGqwWfu8SJsUfHz6TgDUanjqk7J92exK56vMoe5jmThSzEt7yJEHZSMNYdilwjYp28DpZguGAhciYs5UwUC9Bfm+rRKIL1I700Edd2fasRyc30jDdd5pYtrtdLu+lQQGItEYv/etEtCpCpTe2tsoK5JtEbN3wL7DPyJ7v0ZKqUihBDWyq4iIYSgdVWigDqsHT4PjLFlSXZ9WC94gnm3eoTjBddEGJXa4Dn17EKyRMoCcg+rJpkBlzGmJpTDgd4JIU+2FNHWtMEwp6KuTdsqb7BGQMliywAHBMfnJ5C6FBriCTv+cWPd+/PWPwZRP1IK2RkiwFelWhJGaYqhlUHFxdvCnABhg6QFAEIXK/52D5UVism65z54K8hnVLXY7Qxt1MlDtgPLRAsbSQb9u3p+daq7uTH+b3gU2h4y56ZsLh1DkkpGubcriq6RYECJEzELj4pGoLtJWy8LRF1lFSFZALFjA4MlW2Pu4dlPm65gWWmZWloSWLLz0LhAgApyCSldeE/H83Spk7ovjoZIRARJ0mKWJ2cQLGWTKBjOEBrPLriZ/PHFFuSAjsqFohSt+z7md97mHd5Lc5ED+txHCI0N4dKHgTjsaKPwQvHlCRf5Kwam6TQjvIq8gVAX6O9kq7M78dgZXV8+vuHcmaRrEQ09CxjryP8AhdYE3aM14/alUtXZL276G4rUvBplasxOubxL7wWuIK9CfaSY+uFzbVTLJk0IaRflZ4i48tyH2BgE/YDUy9lnh3TP1Axnq1Z4AycsTMWhfjAzH9q93OcHNiDic/C0b1H8P3OPyefi2fHKLarWIAWJckHjEKzVo6lzz3bYxY9ptDFiHp4BiSbzCaBkJmCiCVAql0Xy0VYIO8uTih8v4MapZvbFFGHpA6KIqG5fQL70WPUhD4tQyPoRQTpjUjJv0a2xRTFFCZxlDRskcJai4jI8IEp8y3zhqltlPMphgt2weKZKKwec3THcJFxRZ6LYllp6sUxtdAjBNOxXWINRXZA+NLw1c75CsO07O6o2TOJEEiS8IrJxATeDuqAbKZ7tfQR2mYTgszUMir+Q0aNEtb90MuYX9j+J0YnG2ICzWjNCOdyy3nvixeKLe3RyanAz8ASl5Vj6y4+t0IxGB4vrg70Y77JmB0jRUMl6sNTyi/ABPznIrPIhgZGE4fENx6fV+AtYWJtjohkYODuw4ypWB/gGBe5D1vSlAZYLQDJ6YDIHv//R+hMoo8OKdj0CsII3+Thx2hIPV0W+QjoObg/A/IXXFBAJJLdxeKQZAP4McenVBgTwN5hyVWRLCSeibic8YFRbk0FBkE4lyGBTXCa2eI+Q8dfDWn4XYmUKM8YuxfjF92unz/pPpWpQE0Uw0RUXdhixxkc0dixbViJTGxV3LijqEv/QDytcvGqkI+qvcERcL7Sg+6cQOdOTGx/rVbj3OqdTIoG4A+NpOiYT1s8C4nQ0Qy3mfrAEVFUyrR5LfKqBO/q0Kru7msuW+bW50TWiIcBBNPqKjloAk3FyYNTseA3nTGJPg71qGSIUkzLI0eicqQJ8DD6NC0Vu26B3Yp5tfA5MwU7C4lsgJCE9JHHOsoyM26KI5ZuuxwL0qv1gI2Xc/eNLlMow7CFqaPYsGB70in8zJq9e9xJgDB2KzERFKIYBkhuHLQk08QsJDYA1oYWIcPQBC4fEszrPUe6I+ruUofM7VFX2ecHOMHGai0i7rCFbWc428VQAs6OoBkTiRSEQdB1uC75+qmuQd1d3rtd1e/gyF+IwY4cijWBGzhm00pRePxxLzgdckoQlP2xA8+O+ZnP1LlCl3lZ7ViqMhHj4dvSSDMRIO2nUhCEgERpuD4cWqJpaPaDkMx/O0ay1kSq09DQGjXWDesjgPapWL65bad7VdDVnzygCNpS2U1Cg+PHYoKzVjv30I/vVnwedYxAQw5ZHNgj4niBAiqkHDQcoszRK12q87IFl7UojWZU5ihFtKV3xcHjUzkMJXUfGbZAzFtn5Ww+n+kQJxAp0Nne++9Bv/Zz3UUV39Uve6rFyU/rqTCls5XL3qNUPNC62PUX67y+EaJYYh6hkezQDFxSwyE+IoF4cUxLyRjzT76MswFoxGqlooxMmBACY5YWpUanzdinA7ag0R2zkSh5I4WW9zsZvkONO7/9qrm8XZYoUlQ8+SBBJkl2F7s4+I0e2hKRQJfWmJNScc/YVOiMmE/z43Ck4PHU6ZlpwoLPsrBVEFxF/+mx0W2hsePJwyDA5lcBScGv8ydy/GAM8QNV+LksRr4kRt5qilUAnTUl8Fe8hvyel9Q/UGfM5F32hPg5ITo2PBJ4oiyrKAukQ3yssj51SBquy1Zncis5uI8hhKM67uldRSqKNUzCfgLxAyBdVEOoJaKgfLwrMmNXPY6CST0y1K109dn8ozxdwaGzv2oP90cG83Mppcz7inmtRGJXTCTDefw80N2J7Qy3tSHNltXzLmO+gSRCahgeS4ent9gZH1K5tGf2Xtx+wGLZweJqmLUCyCoRdZHcg/H7YVJIMLyb2KovGoKJsc5ayiNVXOv0iS03XvZfxnI2Z8X4lioOMBxsErGrOs2aoNOnC6peGRoPK2ZjLvGxFraAmipWDLbZ1xaNTDw1g1tkWgu8txpwZ/bc5P5aNpfJzsfoBTNmpEQCklSxsaGzvqvurbL9+spCq0mC4rz0PSrzUauDu9zumr2f5gnscmsiChAnJGsgCMgmpVFWoSnRTNEooD1pCqsXuKZoKtDnFB3aMknmrz6VtNY4XdWawjxr+DnOds6x0ALOFWePqXuHJU6AviSQCERyNt1fXgEIyYZs+QSIvVPsuJeM1OodIhmKt58Y+WCeBfaoo6zpK4vA0QQIHJU8cqOYe2ydOnaod0Uux3EYmhTFBRF7wCIDCt2zB4sMoRTTNah9jNKSq3odcSh8Lb74XBTgWzo8RJLSgWMZEzIpJltICkb8A5VSdOzdvw21ESbXQJZLrH+we1Mj3XRV77towzzgQdmhKKLUIVt45CpOt4YPH54wFXtxJRbRRn91nMPziEh+eqdgoWbiQOuPlyKbRHu5Zyn2jR17HsxnMpTkYpcyB/qz68S25ZDbcF0leFTM0m05Yp5tNqSAQiSFLcGdEsKlXSzaAoI+dsicNAqogYvB4KN87jjxJyPOA6bsq5PQm3pQnHICKpQeSp9F2zIVYpVx0BerYAXMrZHkTUVCQzB/MRMqS7JEsqm4Bt5YroEvu4ph6pA8WsjlkKMg2q0VY6vlPI7V3dAuvA2KIiFUemdvD/cu+XKRT8wTIPvLYsAQdPL3Tc6YR+bSqKFSEWrIMbkSZKbCNzD5HpJihCqF0kWGfGKf7mdA5EH8gGIyO6ZTFUK4qodS/yEfszI8nz7UwltHseSP9Wi0eM7c7vs0Vww/le7O3RdtoOpH1r+agqE6mmGx0K4lKG/N2Bguc0PmVE6POTxYO0g8mDufHHDAvsAaVcbBSyMIbdiURTYwwfCLnzjtrnpVlIpVFCmB7mOeT2fF7kHxAZCKeUop6tACKXUT/2TBqxu9zL9OkJ0mO3kOkMEjO1R4aHM7OZ2fhuWTmVuWlTtCGrIOCSnXcoW/MJtruHlsIAtbvJhd1GNXJ84+5CEsWuUlhyMjourjsZbzHSg/puzFTTiyPr0DnQGrlTIVWtlxTmmtiR5QtJ6e84E30ostxl39REXVEXc6IqqhVsTi5R7vKw6EVIEDJ4HxwqmrEwSdpWn4fLTMRV91lSvxcxWP7YIXw+wChUTmr+I2Y+U5iKBfAA6HnP0FWY+dQFDLDrPKSWxuROvbzhLNSeSiUUw1zblAR+kSILRW3FA7rOZ4KkkS3JWFvJa/YArexNu4XPDAifwd76ufYhgCe4qLCbyPTJG5ht5O2evqgNq014UdEsAwqrbiynf02R0JCMv2fYZAbAm/5KdDSHyyUnZZSeQjNbbuAbyH+jeP0B5v9k3FPA+1wPCxES3unCs9IHEgQXBTD487WG+zFVcDIyjmDKNoXzQhg0q8xuQaJANjBb5WyvvljE9YZD3nvQanHXTsMdU6CfW1XcbUxFULhvV7AmH/WADSWt1PVLtqZ2ZEEAisgGDI5DZZZzyQ947pUMSaBkeGFq/0oLgUtzr5vPng2h1Pr/9FBHvV3arSEzG0PE3IcFDEsLHAe9eCOwNXWLgCloHRYLErXok1AUOf1tNDV67MWTm6lDGvdQpiQ7KtmGxY1QXgREb8/95BF6KgMxxYPROfMJ4BsYg6eUD33dtm2bY/SIzd7EqKhiXOpLDpwe37dmfhwohwvltaSEHFS2v7V8QHQSqyt3400jT5QzaZTg2R5AN4OBhPBE1H3V7HyIl6WhWhUGszA0qsrT2rJwNVeDkk5xK9jkjuwrcMbx8pV/dlOvNc3m9xFhKrVpCs1U/fbjA0pbyxznTpujR0S+tAQDjpi5jIzq3A8abPQ87fM8E+OKwJGRdbbXCD8xGr3LvABjqp37K9Q1qdEoHRCtucVz7WedZ31TqZCnSUrfu08ukoklAaaHq8rnfjS9H6uaK22rtsOXnVEEU1FMX2/8RNVNJlWTskVhvncJcT+jkmKOKpwJqaCo0Od/Q0mJ3t7hY6YSATj+TJCBA+6CG8Fbi6A1WoKLpd2vKv9ZYaKYerYXPqkLzP62gJ+np2Gt0s8UQkGaiCrzoer7B0NFZNCYHj4sWaZQZnhbkzVbDNTSn43SuKXIpek0YqYaS4vb7WdccyExHEdffIj9mocwa5jCGTnmXtkIxjjKK9Xl+VTcBLWr7XqaCmAIXh+qX7cmI/cqDsT0p74w67aWGDzcLohQbtYcYY83afnL2lRkl9Qq6L469so7ReVFXIJ9U6M2KcW7BpCVXM5+HOsT8xz6O4AX1yOv2LNOfAPjxW/Mgjktf9rKsVAdvxo9DJy4gRZ93KlzoX1yRFCKwfOoJO2hPdnZc1klpoqX+3Ym6nYVa7Q+30o7KMn/gXX2txIYE565rgTII2VCEDfWdViPme8XVuiwOuhOX5LFyXaFUK/jVKJ1luRj6a/zKNBvZbXU0aFhiYyCWwegMtWAhR2A6RxqEoJFXUC6t3VGOpYZ3Z2+MC95TG7PjURrccTnjMaDgKlyjxESfil0idG4XROoSMa2NykfD5jgTVjCYuY8zgHJWgW4yxzJYXt4KjiSKaBPsBhlIaiE3ep2iWrA7X2B65biOoX0DgbvELoLqWy/kobIFw29XZ9SfMmqBvU70CU6mCyxGP+x6P8OVWGuoc5lbRmV1seYWHBX0zqSyTmPWxTls1WGBVNiV6WmdAXa1LoHpYdCZVgTAdZ0Tg6UPZlGexnPF1rN/ltQyf+DnXHtjBPjThCvXnU3R8s0EZWirHUsojN3d7bA4ZEGMgaSBJDU0OlWag11om61AwBiA5Bvhsk0rg7y5XFhbqrwcIBJth6LjHiTQUGDhF0mvJRb6anH9yR9Dna4vMM/oHoXs6IbOsNi6jaG1ub5Sg74A29JdZUcRdrToidKf3OXNQGJV8Tk5fxpFCJ+gtZPuftcKK3UQejjtTsqZQa9Z6PmaPq814MAgfOzvrOv8vMbcbMYYpX1uVh+WdpiFa16rez2tdrzgKEFjB8ol+wQ58PkOX3aXu1otfsX6UY7uMW4x1bmTVBS7GGa9Sjbld8hkQCLBaZdYSYLuGDYZoaVt655XsaMTG003nM9YNkNkhOB4jhLMWJ/Ky1dohG1ZTVIvIvAa1iF7rUUxL0hB/VUhsZzOWN4nQftdmlbtdFLlK9e2crLyL0ub87rOtycFFsX1yxxrZGVUm0p8ueSBQJhRmTLAAU/ySxz0Jz9w4DRvHQKrpTYk5jOOZ/2IH4sRGnG9L1rHHU1hEk4E4+HzMPG68MfnPpDe3Q9vs9r4p1+eMeDbyqihM7nnvDziZLQqtCzW7wHw5xIU++YU8IVf2tatNxCM7SPY9J47DX2v7lhBg8jNBYUst/kV5NH8SwZ5WKBFr9+5OQk5Mn9kfMCQFe2n9UlULTLdMDAtL9YBq7aRO1TDE+oDvpA4b+LUIhR/z+ERNnD3/SzE1EwYWtrwrObfubRMv810aej/0RhIH14C7fW8kfaKbirDvdI7+GjqebjquD6edDuhAHcraMn2hemuOu5hzPKNF1A90NaCpVJuQFaO67Ja9o099LKneqnGrHrdn+ry78fSLOEaIxf40P4aULsd7plsneIH51V251CKNXRDGxgNqW3jS4Q/HF+sU4Uwztslj+oMRxzorCQ9t9GAstSPBV8zpOOji2R0FXQbpib/Md+e1cUA+Hhus7mdLP/BsiXLhqILbmO3SJhkj7UXPVmfsmXq8skjLwA0/i5+iAULW1IGAwJzT2gEqYHdnBCiW1pP0PgxYL1F7n9QrlcZ0I+z9FTdCHq2HLtZjCb5GCsBTdVobn73TaIsAx+st56sRkkJnC2vw1TBUAqAUlVj/mMiGYj1P+/YYzfkIMO8NOAJoG1xcDHVuznqf9JVHuehjwFBilHjk7gNeNB5c7eIncIuXl3OgkZD40h8dffiSFKG6AFxwdu2h1ozi+CV4CkGgQ2L/Xd+7akeHE+XlF90erjrHgwCuSt0d07D/35Fx4SWlMz4tS9TyRiJB16ORC4LPRRm7lAK0tAY73LCtM/UekK2HmG9+rJN2vxifsYtuXW7SxDXg0psPp32n6NR2kUwNfVhJsR/1zP8C1jf03AwW+kcFHrw5BNK3ixHxBojxOFFHcj9ywtjU5xkhEmQmsMFqXlx7acQEPlccf2pvKpbASzoV3ANNIehwetfFKRZdsWG9AH/AmZfmR2l5qAgPrXvGiu2H3RiAuxPLIojw+qCzQoDRPXJDiNV8A3HtdBV7ZjqjPBJ599nsAuyq27vqU2gz5ZcmnlVmkLSwlcC1CnBHbm6SbU/DZsUI2dK8DIrbeCNS2GnltNLJX05AsnSks56rZskMfv6ycm+xWjebyFklaKiSTs70lQOW2Afyv+OhQSfIny517p21+pyO7HjCGOYNEVGjaEi6aFrki933wwK46v6p9h1fytm2+rzxzrXnJm+iRHq6KaMu7uHZiChuiZ1+QlEEyTIdpzL8wtBbUKOPW739VsvY430Vd9u1w/Y5bdeq+bVsjZqpojk/iemTEu2Z5CCqmI0cpYR7ioO+b4qim3miHEsjeCEmr8TXsVW1PJOh7RcyTRq7WAxuDTRj4luGTf22rQ4lfgOUOGFeGH86YogdE/rWmJfxUELUh05lWdvyDUeSVD7yiXqClBhGHwdCCsuHnSls4GY/zBWXul/6UBFWHIJ9MpjyyDnru/xxn9B/asg8WivnQzh/wqJmm5A7N8K7GjXQAHOcxzgpJioBNVQfCdHrl9WRtjrgaM2zR0aHm7QtwHGTbIJhGQwLy+fgYYH1zeUDyuOHD5iOiqe18IbeHXFCKwYJef/ZeMPmqgnJU5ObbifZkuM0OJ6ZTO2woTdnzO1SeaiQwId+nFlaXi3Sr5uT0fqZYzna8Wf+UyJvjhDVcf5iFc4sZoyYg6D85Tvg1g9J8O54NMUKMzJ50J6FuZn+SRsW5ig9qd3qt9k6NywOTDMCyTIq6di4Q709ipxyiG9DhC2GGyjq7Yr3GcadFWe3OhoQiKzpMNorBmIf/Kd9gr/HtYRF61SRXeNTVGIHYzwPUvQQLAVQ4jw3Gr+eNIx3yV+z5R5FflYJksaG7BkIjLeW18Lpz4L6EM46kb09Wv7lCLSHPJYrn2enu53ZZb7l84bQPxLvVv9QkT+Wm8cf3dGYaj3kxpLur1UWnaNgFfbrpRUeFAUEVtdXs8kfVzwNPq6zImkVcxwdP+IJEiXHWpLLY7BZIyyI7KZ3Rl55+dkTOk4DTHrdrhq4OGgxPYETirSnZuE0cD8wnXRV/MnhtnpendfxNjZxf0jZIyLBvtI8lthRnWY/FK8twuCVvwwHQhIcCURD5cCrRmUrZqyGf0k7sDZsEv+bcQARtWDiVkubI/VKEU2kwKdnIbWi7DHTyz+9t88TTUbNUV/Xtqq2T0fKkc/Rn774Nf0j7UhTmZNf/HvLNd5ORME5DI7n/qtzAvfde2+tPecJEbfnKhpHACkfUNRTJ8cv++fNxhtLzdbf1dZWwVLc2fMNwEQt0/+oFAyqox9MIIAaOvpPUWCgaA4XYt2R/oP9D/0po9PTXMyf6PEojdx1LMFU1qqSBROYcxW4Raw9fx6ze6oA3og5ikPrEnwxLO1ucYTH2e5AG36BsVAEe5DoTntkizj4OqspVvbByD5X/reh38/yDbZHVL2egSUbVOU03PIV0jvilVsOy6rfapsS/JfwQ1YjuiwN4nUEG0Ae+ZZuA8dTQg8FC8pEGabNG+yUfCW9d0v1FEhzQteQ7KBSQybUb8BLTJqgqfekj6Pd+4Upfy0t3aoF1e0Lyjt6OBEHf29vZvGIJYzmwVkbvKVJajptxVfH9Nim8U/EG9avainqd8qOW7Uw8qGCfn7vma/YT6rOpS43fy0B4fAXHpBNiN2Nv51LutfNiDM+Xvk1pIoPp3WsnD7s2Z/xTaX4Jyi48kFOfjQ3GMkxmCh7859Xpquskcmvtxv5Sf4m/8FAl2oCzhhfwc/6Ozs6+MEGFV8yB//5PV2KNP9Omh9bginFBob5kND4EB1cyRh32f+M4LLadez5WO/teWdAIilnsIZXWvOT8jSrACmz7EPaWUblrYp9m1Yn3Lk+t0jLqldr2YGivtiUL0iA0HbPrQNVmYXo1U1XMHmNPS408+97lW6AAn0OmHbO2ybRTz6REjCrITr4InidxU+0ny79EDUwxe7ibclQuuW6RmGbwwFcCPS3/OavTjwGhNqyO7rWK5wnHVJ5kLHi1pKGtRAQSKJAHiHp8R/Vs4Z4ttSB7xcf0Gh/71i/Mi/D/nH+YRm+yHslvt0DWhXRKJDinc+QcwyFK55axN9YFXHhZAiHnDGJQoe80fW70qXjU4ET6PtTd3QhJnpaO4yamVPIp2f+wxYbtM3FELh7CJu6S/esd9jnbIwq8lFl/AmFF6hd3/18KgROmwoGstwx+aJAJm2GNsETcOnkQZp/j61NUJleXw2lnnh/sfJPskgPWvNPsZCTWNqw16RaNWLHq0BpNSc6Gim93ErpNSg0jj8WlUfThmH2Gr2tjTlrm0THb6M7Wnx1RlhLC8DLurYFQaY+9uqqLXXDUEaWGaxEzSxHWTqb4pflRqBWifdoO1+qvdysodjA7pEO6jJgsqnfKklyNXXk8uJIuwG+IxmzkwEx0R772I4ijX6lzfP6+fqy1gLnX8xLJGHRWLtSJA2AutmOu+bvAkdx9kJB8JLcpLf7penE0hXgpRJSlzPigIic4BSnLXak70ls8O656VrS8nM54gFhr8ukb9gssW5mDHxEXG98TROFfBu7LnN+Ps6ohKfC2wQfVWBX2W92CSOk/KDshC3N8cLs0AhGlMDn/x/6SMci2FA2nbVHjFJslbUqsgEsLaCKoieNvxXweDNZmCZlCrqLrFOWRDdZxa7O+jfcRgX2ysaRK36m+5ThaOUh52AWE6kFfqhOINj06IIhx8Pd+6KSS37PPr3nXXHUkXJerM2DFr4r9wWUss0aPtPgj1K6BcqC8ATpKhsCmmT4Rd3afBEIDmm943u7oBbEAnqhLooFhPMxF7fyS95IbNIG4J8SqS/QEY3lq5/rKo5GZhKVaaEZGlHd9Bdu/iTpamH5uwmshWE0mHiSM98HQ00rZ00IbFOKq0wO2kkbXtYZ4zcV37DMliTQ07nZjzldR9MvPp51Te6wTat6pzZY+PnTezY0GFS66Z/KNNXlOnW9Ku97SXaCUDAJBpkuq92o12XOtAPxAn9YX31t8jT1k8myLPuqrqvPip9DSfTrCEVY3fSPI1inQCihSfOFfR9hQTQMLsGaqD84HpKor/4QNpX1KQ/ludJPKZ0aCt4T6QczrcSfsnqAT4ztssBLNQlCxSNFBJV8W96RdN/X3CwTMnnGO4/peBQztu4yvlCs3BeoPdaDm/bMhPs4PiW+ypCHifhDH19bB3TrHSRQph+cne02Eh+oyI6XjjJdHzpLUWmW7mQ78Y6M4uBmPNMbpMUcNtb4g1nmPCQK0CcPWPPdIxZpXCtthiOrO2J8bzF1ohdJDy7JQMLqDE8GwOqyTq4QvJ+JB/y9FZYbq2zQIIFXatTZYOf0I+VB1an+c2OLUhHqbj1zNx85aqTzlcN8j9MlFHceP7aNcP3tdgd18a1X8oXYePNxvZlHmVQ9aF0N2CzQbOioKPaZqkUF6SojzLJmj+6JH07jrizNTnKJLeOlPzkWYQnGVzX16c5+/iFklUDdLH3M8PqRDhd1/V9DFYTljbDApGER65l0/Iw0eZg2I4mWn7Fu1+fLmFRFg1WqBU7UPOOh2OHw/1NDneKFgrjswPV5Ktj7PLxuw9D10TzjRs7YUtzjB2Ly0JZbRFiokUcpnb3mkU/ajspU8XAshqNL/4wx00uyUyQCT6RpAonWPjBzMbR5j0nvn0DfQr3YNKplQiTTjt8pQ2MSnTNvY2bqgIXbjC98KhuzzqSl/1EBHw96bL2wUJjBA0ZP/H2uR7Cl+AFlJmCKlcAJ4ykbi+IARbVA/6++vwYkycTJjK677GpLZ0uJAG5ymi3nzsQyqzUHOAlhtIeAEHJHR0N9kcArjPJF7KxWWmNJpqX/OlAXkzWrMHcDOuevDXPtczRDxULwXelYPLNHariTrdrVv4M8a8xSuYFVTD4pBBVVyG26A5MRRXMA1I0p1kg+Se94YIjTzKFjO3m+UA7bHqtFJPe8uZaFmM/EB5wtLHWk5dAGZRx7esbRBnNFysh/fIbe7wzqQfeiFIkGXDsj65x0Gs/ludZiDC/ZAhpTNCknJS+81YGYECccALkK/Pm8uYN0mdaPAjTavtKT1ZBwFrbPKIXXUz1N9bS5IujHZt4dDBCiPT6HhROx30kppt8zd5jX4rhUhG3dYYtox56e2xsdezCO+nftel48lU0pZUu+dXRS1iiIqzOifZuNlij/GlHez17JBaudc0cQyrNQCxzYpP0IGq0VoMxEtbEqX6cPoyaVMG2gu8mx8Iqi43h6rgdrg5kjPzp52xBIb+yZhhOghMXOD+gJhTFbxUyJKA0PKY8xC/yEjf2Kxi5ebHH8T/ZW2O4+14RwVS+KnWtQKNQg6PNMc4M20r1mT+l0O51Jj+Ida/kqZq7Dy3uQ9dUZzsEcj0n1qPDyl1164mPJfvfVMWMFmVoRxQPnbqb3q8LM8N5qdb7iKQkggzpJtUQn++vSijB91dNZYzKBYMDCFsMjTyO42r8KBrQu28EZxm5n4gxe0sljwxR9i20j2qTUx5qZTLt694PtetOWi8Xdz/rn4SGlBjy1tl+3PhlPDtdvModkTGkg8yArl1fMG3bHdtWeoWAN37Is1tkrSRROoDlMXB0fIEaNrz5Udjq6ydVrsc5qTfom4WC+//4+F0XxVC4YW48QIc/FDhqO7d8S2WQinpIv3g8Z/6N0kgE47Qh9I4RxG8Y4RzLPywvBuWmEmkxgDA1ZuYESZ0eOtZif6x0tKNzrMWhMOP2oMDH6OHmimhtImCZXjceHh/OjoVwFcnE2JkGQrJGg2r2NxWtJXxWfOF0v9U6nDYHvcDQaU2FZmu7kis2bJdTK+c6Ld3GP9+tp/sAwsRQP1waN2wxFBP5fcSPGF3xXoHFMTVIIAmkuXQo4Hncmf1m/vT434T8nYaaRLLtdz0DWaJQSWE9dYRzqIc1XsZ+xRa+rPEJsnXzTHWotV0UKmzfA/wRqCi6Mbr0ol8jU4IYtAs6hJJIXS1lU3BNP4dqyO3V3mbu089YZURPGV0Tzy9aSXDEzwgDxPPipdcVYJAsNggBNY+HbHX8iExiMy1pJQ/oE9716ka29sdtCba2yt/jOQyq/a2/tQuwoILhK8vcWE9toINCFSgRB4eTp++jhtPGyuOwyrYPRSMKcBj60RosdvjlzSuidTTVsAQ2HcvY1tmQp98HelreA2FA34Ml0GVHUCmwNTXshjt4mZmPw5Xp0zpU8yfGJs6f5fI9143b273ls+kyRi9K4LQ2E6kEIhat478XMlFOqpD5wbg6bcSg+5sucoVV+3mptGFgGTfxs+3SSyQ4IWVibosiCydzWgCf9Bd4yY/1Aq7Wau7KZprNoPprL9d8UW+mDctxnL/gndi/9gQMq8OQZW+mWLpW1x/paLC2vvGsp7jGPJj7wjQOyxLT1Ac4u6gxbHkgEVgBqDTJGBCFcSh4ajjzYSLaSU1HY29PybPjQQJXlWsAh9ONzh0w7P6vRaCSjAwbULQ4OOpMDbo48iepDKuRaE7vo2+rML0rCxz+61Bp9KUHsHBUG6IKp7zV3tT5xsa7qetEaSPVatdaxL8mnr763bjefGOcW+cyQPn/93C1LZ452O9U0BBhoJvFJ2Dav1/eu6PHsUOpX1h+IbHiRgt2jZ+04drkB3BVCkXpr682cHe6t7905pNQ3h6VQURSG4x4S+UxuOSmVZv0GtyDZvXYTdt+WIqZORrakgEgn8ZoNjgxDrL4UImVE94dXOa134nmGSuyzfkJOYqRgvyddxth01bP1ZZdqBPRqK0UNudQw1OxI0Zs5vFmBsdQ1VCsN/Rfn1mCrZaEckbIDlCqmwgoQSC86HZdOkALrpyIUQCx2leFpnmbmJ0prvBTt+NiYJlMs+ECxMIOjahqeyjasEbnWU8ZRz88FlOyRH5lRmm2JLs5bHxt2sxUXTrnWBkPKTKXCcAwTe812ieIkwu2fIM1qwEXGBDnoJy51N0zEgcD2ibxrxy1sGUUUCTbLsg1drNZdxQb5omBAcxleNWl7WqsERIq1LfTDdamCjDA6NdychDjTy5Txg/d1vE0+K7j1I2oOeVzGmBbsmspW6m7yipvokNik9iqDhMwo1csBLe+b1hx7+/1ihSoIxvTA3nRuarl5MoZ55VYsGvaWpt/7YN/+jYozVh/uwYapc0Wje0PmoubwmVh3yuF2lx06XY/izfjUSk7AZIyaplO3Z1rem0zfomPqUS0uWByXciZYzG4wSg+V7n1PvDIpXIle9XaW0SjrEDRH7r6asUvW4z2l43rP6anYPbXtmcnxBchkOnQcLszxhrVJyBA2zweUmBbSjbHhsHTZ7YHaZcjeaHFB9UjCpAbwBFe0MumAEVAYasLBhISLlFMNSw04tKzEZXSVrVV6KM/2qKNNgbHL3C2S4dCWC9h/mDlcytfwArh7HANOD7tAVqVTb0L6cvvTw72ZbJUvK6oIE8e6KIhTmYgD83x7x7uiVlatz6sLW7CFHkHvbsIVB/VrhTJ312NYX/hMvfVzZQfmD3NPt3zmcKPyzkqrWgoEmSEWZIp23P5TyDoI5IqIk8BgAsg0qxBD+nPn395kPYlW1kk6XWFXO2t3m+LqEFB28NwMrHY+lXn6YHxORwepVlZSYW2+IaXo0s/jF2OAh14Tpw8w7R1o1/HAp0qIYYx57hi9lz56t/MS/o415ake80TlbSIWbsdpiq/GmZ/r89fUTcskc9mcd9gOwy/n/jMX/iS0l69vWnn9E9WOgo1PNl6zd23m6a3vNZT6xmR4Y0zp0LZ3B1tn/h1tKHB+YWYCZmmg9pvmyFl7YMdtG3GpPrjTdTxDG4yGP5zPP09kWkOTnQsNU5tQP/J1riYXS+LNbsVh5Auw4CzX62f6Mcy+3oLMIy+A4Ckhf3vutiKlydkdR43mTq937D9oBqmpDRLArGhVYZtOL95l7qWp9K7xYRwMs+JM8y0oWj066qy3Dd2zIZKbj2f24xO3XKdfWPjbAaNfHmWssHj/dIb/0T5LzOKl9VLGmMn90g50K4ZIrVeIXhSuNog3mnSO/yCQ4WBWlnKXsf7lA2Zi7+jA7kzo6OgCTz05HIpPZabttrtxSvDsWUlqRq89Lbq7QMtH4Bbpaj1tolLlnSaL3icF7DQ18lhRudE2BVK9luVdrRAk3uHL6TPrvsOniz04mKxnTCUyGquTmkSklkhEfD4cqWXG0vblXGDuQ5KdySLnknQoaUCfw96bbnUKW3ZwVAoOoD2iYz4bu9eWMYwXQAxMGlYsdrgvIK/TlUrrF3xRxt0k49NTX0Ayq0XQwNFhzGhapIeUPlewVeGT7ge7rgUt+isx1/b97EVeIi2R288E8HzjyWAtLCU6KtaK1C1rzzRJu8uaTqSooflr6bbztj6lSq/eGcQKp6jDZ8wECHHT7annjk/pxKHah1Qg8pACR9ego4Vx2sXGaFb6zF+s4xc4a2Gml04i3Rbotfjq6Ck5+t1xe6gd4Q5ZZHyPmylVkTeyyVELuSZWhW5MW504Y63gd7oia0GH5HP0ofyErpzzF1vgebxgCIRp6XrW6shit7jJ0t9zNpix5PoUj0iUGS84MmvcUAk/4KpdpXU8vSjEopq9GPvM8ldMNbG3NJMVwYCQhSuId4d3H9XLFwg3HceuxlOgqdThnEsN6oh4AD2TW2u+rb+07VH61stEMhSdRgYFR14yhcy0dN0v08j0yZOpLN5u2jS3Lc/mqmMvOE0F8pfJfRqCaoYz0nzqpAL3vQUVHJaRZ5zt6skF41VVFXvxAUHEYtUobwX9rKfbMUfXmMuU8qUzeyZF+n4Q7dQcP96yDIX2ms1hfauEtYZhYRCwbcdfomycXGtJES9IRxrHkfNWr9bEG6aqxcuMl6xSq7coJq/DICMyW7ljoOmbIzaKtQGrSXj8cdfDZjvVedPdeXYeCrtqJlM8dxGckHt+0BMb2CFSYHO0L6p2c1HTjTkCRqJmsEjUA7lQi835WsejfVDRhQvarotUMkymYqNn12l5fmMtZDgo8bXNGltT20l9Qix6Lec6D7Iqec/XzDaP22vYEDJOCNu27GOmGI7l2S712jG1f022rGe7AikeQAjaPVlAKW6RvfCotwI1kp3KNJ6GjD5fd2+bmE/oJG0InB8Fsp2bxNSOW9qNb3lybocQqQmZ4KXOhzkJ0k0o/kmXfLGMqjDci6HbVuC003dxo/MmnhPgdbDxYz5DTDE/W+r6Wb2V8XkNXmMkgIyFbO4qgGSpM3wbKCsyCvMIR1G2YAjPR7l+75mr6Dwk3XlfZw5xQpVjpvciRouXopafNJJN4atiuWWq2vmGzRWGm86qIdzsdoimI5lX4uyWHf9h1mtXmYuYfhRYOQZtTYZTkTbYCw8jiB+hfc3R01XHsZ21pWBtahShQHqhA9knZsE25p5FultDRl8c+x9PD5xySnl/yxNY8Oc8cGCvDU4T5BpCZOUq0Mzy6L5AHWaD3RlxhO5QrYCMINX0VTBbYo6unxq5aB5ChbV8QOSaLjrJ7sYHQMxKeb4KPN3bEjUaGrzK4qSV1FXQVOBfD+Slw7qU95VmA7Fr8XyI9yfP5vi7tKYqVv59GTxxj0fvjbDLa5RvzA6k00F7EJeFRLxtw5JYjShIQOLPkfCgmPzcRSeBF5oLr8Ma48pbD2wBEx4rPkNvTDFsWnV9zK3JKInl/DK/cgUwj/tuYeUZ4vvFvXI9scF48I1rMeqT2qbsfDAz++yDS6GpJktR2t/SeqbJHRtYYuP/xd51iA8szxiWyCZGBprXGTPi+DEmhmVfhuHmVvbncYlKulNWobjluHqM1Nm9O3cIQcWTyTwIVJ4o8Y6XvZXH4o/4Xuyfwv1NtQt9Mmx28raaulX/tZpjG+1EEISlWM+zLwTcKVzYagByWS1NZWB5hpbpwiVU2TO5FpJhVCcNG2zva5YEFeRw9O3CGpQ5a/XBYRnR02OHa9lywR2O7eUTC4byX+M/3Tp1XyuPUZfz0OQ0Q5n87jaddm3SuVfVOfejf3d198liZ2160dDYmLExuReV4/Fcppt0DdA4KDrCXr0Mt79a46d1gKueRma2ByYUJd1jkvDhZsIKq+zNCEPFcvvnC8gK46Kanw+S/xZVqSfrhh0BTKin7eRSwjpc83CGuh/i8oF42v8n8FLOmIQxRu1Mt/SmrJv1OdZEO5zp9O59AKoz2bEkVN8AwbYrDN4A4fG19rXfqzgWZSJ16JKa07x9bYgo3t/5fsT4LdiNislFsmCWa2cWeCDWg7RDyMA+orqLK6GvCjOKiSyyEA/A6ibZ+r9rQgw7cxZAuAnb79bTUuZayWxhbIkGhlp1ZHVXZZp9lduTHmMLL/5CNgnX53zA118Al3AqQTgMhoZI8qOblEe+XeTPNRNwXBLWyyJr4UwErdRgGBBDaWQHK4ZXZI57CQQ3iA2kB0sepZQjx8j29D6xM9i6hgbLuBRkyOozrXg5RSeK8eWVt4xu1POThr3rdDUmgVMpLbqDjmSazArLoONc0w/bHvwhs+9zsyiLMxlW4izL7hVOoJ3/OjxOtiB+H9RlRI95/pux/N6vjeyQ5LoEbmTo3dWBwWNm3VjQEeqgmET+BtMeC+bP/Ey4ccVjxreeIyhge/w2fnnUn6Q0IF/vHXYLFaNpxB7nTBVHHpIGBNan8H0Crq87OzRo7NrC6jMkl0w5p5s0NGR6JFsxcYz3bokPMmQNBE/x1C3X86WUckULNuWBcW5tSfJjgbXoCxpvWpzvCgrEBa+JUFMgCEqY6+DdYX8GJhxHXVmgUWnGcs0/D559JbI37ulHM4npCzGU+tHp17ShO3IYRZBmNpalI1/DNP+wPdjY5JawZSGZct8cj8jEZ+PrAyCGPd4AAoP9fTBnr8JKveuQm+Q9aNVdsbh2/GdZaTf3j+kJ0/x12973CGCVImVhc81NJMeoqHyrr+xz2FynQ0Xxhhxa8eFTJb4Gww+VZc/dFXDG8FKTIeaOkLtnYroMgE0cwqmHtVk/A0su233PPylvDxkVG/Vq4OpwiG9yMb/MGvIqGfJXLBmIeeFGdtsz+iFflh9HbwPCCbDC8FGlh58336JhukndnSviC3O3miND1VQKqisbwEbhxFPLy8/tepsZcCoU0Tnt121EaEQYD+KYvI0SOBm9mLvI+ZWuMjLM/z2u0tTOMBAfYDZ/MLTpDgu/q2ax9qyahLZ8OlBpx78Tm64at+sXXdU2B9tPfZM9gtSnE/R/fmYZH9Mtip8g7XMVA7A5+WVZeNPkLzPLm74/ywWPm0u8Kz3vIzFUe+uHsWhxYkaoqPi0c5rPvJO6YOuTetpa1j3ycn9q4+kokM7LfSl8c+ZtX51DzR7YhdKx++Vp1a+Upopot7DZw6N7k60CFO83u+yCeuh+wIArRNGHce6hEFegp3lDooUhofifNlofkvE6O8FAPtzGMa/dZtLIVZwmq54OB7nz62/Vz3fQzF+6EEspSyNyrfkTjyeLrucrq1bcUfcnQOTa7NMYluctl+c8s5x8cRuHezPnjfdf/PfREEtGk+354/PRJAC8HikDO0+lvy3zCnb6SkSW09hCCJc+JoDRGt539Qg/ETe0dRK6lf5Q8IJYaDv8+NCD6jvu5DB8MseP0khqYgiRXGch3DbFeeRUH07d8a1974do3G11dHIuOYGFjmPwETMzMZWyZrh/LD4NKn5k8Eef6lizBZRKnJXPeRd4nd+Jb5Qc0SRTkT6s337lBcFZ5iPscSuWOcpCNW5tZFUmWdY5cTwNhnAoz7154kNSKtm9sCWQhntYpps8Lz6sDp+MY92UtVJXkJ9ccx9Fdh0MY84aKAshgnE9rK3MMHLa+jHpLPFIiOfL+d0SaS4q2D7NUAfhpu4A/aJWYf1gr+eFxJPON8izvZd1MTucvmegsJNEBcg33aeKeThWGX4+g6CNEf3GFhRF310uw0QcsWipkJ0mzCjzBvuYH6IuOrPrmc1UGYQJkHqv8p/3O468HZS5uoi1TvE6+NtcvE/4wi9HtwQOMTy8S77Eo5qtV5VE6nAGOvwwxZ9vYkMVg4VOoGmOEnF8js0nOkhe5RZcBS4S3Y0WSxLSWLnQNvC1luZd5NUp3+LfXcjqKCIWbV0jwl0oAuuiiMlUckPT4eedTQSOyae6id7ttxjspwQsPE8+/UCvtEDxI8N6/hfCJIB0/ah1arN43FngzbUREOaUivZ70r9q3SNYowIROp7ibkrTnuMx4TypjdKw3C+xeVqW+k/BCidOfRkp7H8mmelZbVDqDC0t/+2saisgea4b2FXfIKBzWXgf4V9vv99bmISGgCCrorOaZ+XG5N8ELRpuuHzKRaoDJIgZrXwQ1rKnsPtvoRoNXo72c8m/dU43cR/zLidEzHQdacguNhOGBjdxLm2MYE+65MLA+2RH1aTPuj49pP3R0GV2DU3tQ4i3TUwsyc1hkC5xfLTxxjkMgl5g7thbXyWbNeW4otE+ZQPBXJ0qKitsC//r01yLzrT/FpjvfMrPsRub1lzn9Taxet0PF89bgfKSFXsDJ1TmtJXiSl9JPhp87vsF36f9LPVchYf2jUSTPHM775T+aPrGv1r4nRjc/xlNTCdh/apGR4V7TPF7eN1Cei5iENy+YDp77HIoumWnnrfBcxopFlScpo6SkCGspZpXSgrW+sCIMMffr0rZcxMkndT8+dQ050sqOZ7ZM2K/PWmu2t2dmdcVi8RyTGm6pvzqPXH6aSQNrUC38vNm7EjCOWzO8UlTqZ1g1EnCZ5RNhIy9kHzJyAdrRMMEDXOha1p9Wu8fuv8AE/t7jxCgtZXQqNvKXGddtbRYOIeU4RywfoujHHxDg6TsIOuEEtgjv28TB7fumjN6uuv4gHxe2lx1sHjrf2JR/NxZNLNLEH4nvpmS6d1F2EixS9Bbx3RnL2glsrVMdTDeyhsY3ZXmGAMCucAphlAmU3rSZalID43MUQ3XL7M/dKbeQcK2bu3oRdEcN/e0SJiKwGXIdOb9d8xl1z67XzDmu/9yVpSgdGMFq4W4Gxj++yIjIp4xwpyoiQn4IDGOwvaIcPWkHWuM5SKenDqM3bgMygmvmKQCGKi8xlywzplv+sjnfN1MeFgwtKzoaOaDso4BXoFH3ykdmObesaRGxouH2oqfKgaTKfn5R4Hfqm0HBLnrJ+OW5vXDTjow/UCmcyjT1PBhcCPF9u3GVPd076hmQ2/1kYisS4HBRICKvySa77qNzI2ZQiHzs31bx4TP01CYqiaHHnIn4u3u1l8G6U2pzWfipkXKou2OXNf4S2CN17CTLCDg1Jxtszoiegl5BMdfP44CAZP9CtJBh1zgNA8K6lM+Q+fvM7GR2Dy069/OON+UrSnF30sG8eTQwAHCXYINl0xBjpvbcGAGcc7bdO6GMMNOeFbf8ilg1rT/1DOevhMNr1p8eiDHDeJB7pBSYlerQva5BxQ2RF9Jk0Te3/Hi+JfSzHGFMXu9/7n9Th3RWovvn5Ptwn7KCK7tww3isRMzBwycYloC3GADfjCixxWlVfIeFCHu6Ii0KUVdGbJHNo5ZGHgqP0JzcZmZUKi390YNl1MbqkUW+V/iWhNSJLRsjPN/8DG24MXggw8cM3UZNYtcubciOkIvKDpEaXilb33YUkn0SdPqncB0t+Cbyl8P+VRfSvWIlUPJnPPNfVlOBAB1hpXkTFkz/eHh6cGqfSMScvHDDGrq5uK+RhiCIAxFAr7iGvHDjR6SfDSZ5SJLucGN2CnnlAjNczetxpYeug5j8AyFgtfr44PygsAbKXtVsUC3E1lxI7JkqJD56//Sd9Syq/T6lBQxMc1t9B/v9JZvo1v5wpNXU2MY6n9xAm+4mEJNxOHgvC03mdS5y5LIJk1F1dduoT2F88pTtttmxntguFIa/k+PGIa6DrOQhEVN8+O3Su8UdaVwQdGTgIxUV7sziOZqoEm6r185U/8Q27I79HFBZfq0zrlBHtFmkRsJv36Ta2lQVrUqjZvy6XAgRa62uzXFvHW+5mVosQRnQrdm7Xuje2Xzaj6+mRtu226k2JTXgBsP7JWcAEJfTdlb584T+Zh0+Ki3mMHI7CxHZ7knZsSOSMEUcnerp/8EMsuD+j1rrw4X7JIKO5DDaw83kLY4B/B3RpWddbfPZEe7B1k+zuZmMDyrEQM0GRkLdAJnnSbcwYW1zcmp94GBbclZMS271lgiie4kb7n5fjm7blj8TIw0rXDfiI+7o8gMCNTAUcu56tRg/p3TXWp5coGZcJE1Wm/gQIThdYEy+7PsjkMz4ITg1t5B3JJ/2P7ZAS8IdTklTtePMQeWQXfgMloZId5TWjVLNO8P8ItdMAZqd75PgjRVIWDPypLQ78Obt+eIGORG8oXeLAuWWkHeK5tuIRDRi9PgagjlfcExLYbiGy07c1T7P/xwhiorJIDQ6xmcBMljPdnpYAyxa54w93VHNEZ7WUzwgfRtML3bJXizd4LIZTVDsZ20ngR1Gm91qHgg8ASKD8OjbEr6EgE06WmRL9HRxa5f0XW7IZDG+S97flzengXKoE8aQulXXyUsQYBXOFb8Km2ANY65CkyFDq1yg5jpuV4ZHulWef7RRbTmit13YCYhM3szeeqS/BD5lKmp+r8/jMe/Vt36P/dPncuRiDLCWmCtRD8ucWK7n3zcBLXS5JxopSra5iJC3k7fGrQZK4DqxnCxB3maG1dGLbz+lweMu4a7iPJ5pSzEnYfMDEkFXYTlrysH2XjmJJrNtvpjcuhtEu0vU4gdvp4qC057VLdYg8pbiotgjDI3d6CjrK91/jRxWUlEauJtm/aZ7IfmIth8rbGR4rqdSj69SdZ9ulvWzEw3t67n2nVUmu/wjkEMhlAi39SzQ0ZtonmONxi+VeEjzu3duzdftw8twctclH/SrxK2TpyqG+/eCVE5zlN4vB8zLIPg2XltIqdTUtMVwpr1xnnRlakU2Zd4av3GIq0qy6MWjHraJ8B/ewCFGI6tqnuUmdDwKTYhycen5oXr5jojetD/FsP4vgrFR6AoKYBK+TqCsco3PKuW41/iPDDKITXzHOwBylGx41QCvb5jkPZeR2N5fCPn+8AzcrvGOgVd2BbS93761COLv3HRlOMD52wWn6ExV4BQSdvxqslMvSwmz0mFZumm8OZzKNRHaPDekpLV2Bo3tvVqXvqX5uFPS/z02n85OVAXNKpuM2cfIFQy3FxQCIKLnObTYVb/0cnuEAVa+zRQmcg044kO9oLTK9HPaJ1E03hze0mgP0j3/1eqvROYWbcYaIFGlaBDCXq8Stpcl3DmYAyPNL0NOUI/REFmAAOutsSVe42MsIj3+49p/fBK+J46HrIGN9DasthG18/VDlQ30ZyjdsEUTA1rb4Rj4e46nQZvpWF5nQOeb+XBXExbxmlrNSIy0kIhtiBCzClBxli+dsKD9sBjduGIyVxDc3bU9xFNJIoJ/hPMhmK6PS/v1qQu4VZmD2iy1OLyRgkKt2A4+JFU/612gse4U8nwQacKLRMD0NXt+grHtNzLTHLO63++6LPmJVlD1LXiQYDY0VkIm25IbROOtnXEC4BZ+p64p6fk2lZ4s7Xevm0bimc2f88qJxtgMp94xEg6BgG3BL7VY2vkXRFl+TetZIqCPsWWarAb3FR78v803r/yZ8Hxh2rXEuZ0hrzV8GbMUnJZXDDLkErA24Is6cU92bVigi5sP6SOg7JwGra51qIgpewHQ1TOr9QbK9AZsYRMopZIyEzNVz7Eq3QK0k7MeJn7Ys32wSMbe5yG3MPmzJ13AT8i/OSyIPcto3AG/gotb/v/pYTyujIvXyRPrGNsJm8+pD16vjzstn087mYzP1nkbnfb3WnCXSusV8GuVhQraUbxSYiDce15XPvqvpmMywWnM5d31NhAM7YsgYPmUg//sKAHV0otLXaC5Mo2hmAlf0x69I1jW3evdlh7aBcMxTPhrvnnRiSWkArYBSS4xtlNR6AIw4RBr58V0Otv90jdkQIm4UkqmneWINqwBqR6FZ58z3ROVHlNEWeD5uqwRH1RRI29vKplpGljjE2O1uuecsjLk2BC0/7vk7371zjpinJxJlWKjhnay601yzThR0E+rhivBjvkLvvroMApU1MJAw7EMaCTTCAzKxVmC9HzX7A5rYtkdUcKzBp8u/ycgcwhoqpLjSMq5NwufIWPwDoak+XEZQRQMiE7fAhhr8C+CKsbiHSSUeoC6SDabhZRwwX/+ovHISZ+QHalVR5eIuT9fhJC4PRRIiiZTtKLvJLZTVslIFMYPra/XOjwW8Pco2fUm57QiTpyE525PTGEGOJTOCGBC7C0ui1LfIcdQZf67gvM9+zXy923vkPZiFMwgmkxBNJBXZJXdUQVioNPWatpTGjgSOg6gmdv4e0GDj4QCcRzi1znAG8wcXY6JyBH/kGl/pBamuLir8PqjjwviQsuVtdET+dIpqjdyQRPIh5bDzuYekhSCCXgioOWLRERvE1uC0OYTBaEmWAN2+/QJVI9a5KnOwXXxOfg29hEM1issB65uebu6AvMHerkGJXHFPSWZukV+1JnWLQeXkGej0+ARuhaJlqnjOA7sk0bp74N6XwboF8rjE8jPD9iHclRCBonvtn4SCY/i9NmpKXE/8D6pOt8l3JbrvZj4BtG6qFvKSX2m3D+b8yB8qzQ0VxLkE+eLxHNh17M9aOwl9Msq15nfPLKFbNJmbUv5VIoC00fsk+zjwNMUdl4ElLlD86YLj86a7F+jVjHLpzvR0hrAgQvpEPH1+fXNmbI1GEBURCJkSayxgzLDGCv9DRyI7iA2zmnbTgp3i2FyNXlaNmDBx5RCNeNU07AY+XucY+RhnWu6dlz0QxeHQ/gGvqHsRX6XSQVBLZ0EarCl/JweGM0SPATjX/TO0KQBY+GiQGDk32OuWotVWbr14mQ0RLCbaL+Vsh9mMBtUYyb11Sg0JzKYpsPsjLiuDOJ0149iJ0Jc40IPpHY4jZu+p7YhfkDDxX6y3ufzZRfkDXaeuDeq7x9WSQF3uK2DURDuYP5WKJHj4/D2VQ0ussbyuV1DGbyxKhW56+C/Imz3YTxMlNZbqKf3dWSQVfoLxQ+GM0PuiDSXfZJT+prcwqsU1RBq9ambU705S4ekagIWFHe1nHoIyhj5/pBGnKWRTQz4Smc4rmnLSIi1Im2I3VRKroIrWEXyX/zMeRxt8WDdMO3R6cFJaM08hlKQUI0H0ho6Ij4fhhsmcJqZD5SfT7awu8GFGCwxWxiygcCluPUD0Ld7gOqUxFMFoHX08Wr/IO1hw8+BghO8ulyKt3LffXmkwz1G/8KP1RaVkE0h1duLXHP5AkjdzqCJ3mm8kxjlJUFlFVF7uqUbwjb13bsFeuj9fIHUxmzvlCO8OZ4bApgGb4MFIVWnNUu2eF20jMvOu/5aboLQL2De9aohGtTK9NLgS47JRyMhYjXQ+88rUi1NiYYvrOlx3/OlV6J4Eou/aQNu68LGOd9xzdEzWK/j8qgkmpxK2F8fKhEwuZ+RH4vJDcTN8HGfZBOxmE0pqr/wXkVKneUxeOtblZ8p1uWX6ox9E8xY/22f19OCabc1uA70YyeOKsxVjefBUGSsg485qUvBUK4EU6SrV6X7Yb5P1DMDYLWfVKoIAvpZd/cFH1Qao3HmBjGzcWb662B0Bhk9/1pHUbQMPBdc3h2UY+Kgu/rgXMgK7sicOPYkB2JYjJ6eGG8a2Nf6Iik7rzP6piaUrBFqFWWQkl4Nu60Pz0n0KrDkqHx9S6/ujouI8b5e5HX3BR+DkGFL+1GhuowfB3ZBD2w4HxQg9SVCM3H6obrqCupbLzqkQr/kpAOLhHJpAXLEMEE2T7sOPBHxUeSBOKD7KwCtLcGca9TIF5hyt5/Dn1pCeJqvt0lEchWV0uPe+2Ls16y54PUsNrRZWX3vH5b7jbOwoeTvdlM+BAyzwtXP9VLSE/1L/D1/K15xufyqXTt1hb+DiB2Kpm8wzx6WnBb/1b55NGiV7bwwK+d3wq27zcch2TrZKUjXdIunK4YXXjIJZFnMdMewzsmfPiwF071DY1fty9n93rECnsq/wdzKO5x08xs5/BKXCkvt9LF50uRThfy7xd6dajQGmKQFKwzu08KNKTsSp+xtF/Amnb2gBuzPCGwhfzu+Qjjt2fH5MnzaDCkhFDw8H8+l9YUSvTsLzs000NoEhkiTG7x4aRHl75o04tsujFTFIVJuMmBEZaEGW/PngV+ldDqbhfZvoyKGSxc28KvQanQdg//+0seMqXMB27DoWRqs9ZOcxZ5khLkslbIMd4rL+zjJLrAFli74KLslPA7sj1NWfWLtumo9ELEUrPfBpW8uIENvw3hjZq8Qyn3zHV1dWOBOzGUmkqMzc3mgfJLTKabFqxyWXvCcimcG+/OY+oZFIRcOFdII1kdXgfqj9O7dTHBGrVH0q+Be1/o7+2nT65dV8bxR5r35bMrdl4FB81Im7h+4N8pmG6DrI55zv5wJs1Cy4mty9j3R2ozdHiQlLpENs6puH1WEMo+tLl4kC4h15EfNnSM6LOtOs/Eo7SC0pHv5talxHSXDS5uHO/oVPR0t9W6fdc4mFrC0UI9jKfUFG75hv/wnuZ67UW/V/diPph6sniqAmdU3dLWmFU90/RZJdhmOuod9jSq4piAvWGWctfwN7H2Yz00H/CizQ2v2UtWvtry9DOUImk5jdFD86jH25LqSgLMAqgkFliPfZBn0UbevRxicu3aKC1E8KfKoe6DW8/g0nUrU66qH0H6BrJx90NQgYIgMAfAEMwDaxqDwhJYn1Ivl5+bvFuDfrthNWWdnvpQgn+iCSgSZWv3nF8SRw1iujxZ8oR8b9AW7OfzaDfwq6K2MfnnlFAgXkGR3r/8UXWlk27C4+NLXZbD4VgUNdmCeVFS8THwZ9h8qRL9mEg7hVeAUZcUq14XarTEgCkFxApR7rLdNypBWXBpcLGtgACOoI/UAsWMkbeSU7nekLd+j2+JrN/ESCYwKxdEnMvJnslP4suyBTPoybgfAO9TtMZwVB6ylqf20NY7NLnMm9DYUhMymhBiwSkHM7bV4SqdAJlSYvSy+JNyoJRxqEPEfUvjjrzDnEsWv8MzJosZ0xFrh/y5i2mBq79VFlE3dW5CSFBmGnay/dRJB9P46eUSX3ky6aDhXupZZhbIoR1ysn0oxv76jhpqf+vi5Xs8V52Ull0e4X7yEHLlc+SV2S/633uG7IM10Ss+Bv9IhLZW4RtCCILRuWAVK+j07Y3/orZYAil5YnsS9YHFMw4hIG0ENJBXksTC8uCY3e/sorkhwOpOrZK7JspVhQHpYpHK4vIqlMCpeSusrWUYzUdPhqyo2yHlf033jZ3NHYaNJEepEnikHZOXjYyzJQg+FB+qt41Q4GyZCI+rrL53mr66KGEiu/PkX9oGdxnnYY+VZ0vGabx0blkvW/GNn9VkZzjlsXJmPZdzNrh8GGwh93+b3OXVzmVpO9pXZ3InuLlifVHboCqe0NYrCNnWONhghcesmrjuKwtfHbTl/j+Fx+RDKVBLYFRoAy2JaLpywjyW/fXq3Dgf8JEr0nKHFHxhCxFPjBBPoBDuJAJOC9sQnlWzUCVMKuSz9ukGvsoQcLuLlJjHwtngmWFB0ZOjTOTQjIqvSeFGgKcEUvCtO/XW/z9UGWS66GjzurK9zL/kEg0n35XYshhZ3SMHoohFya6V9FZJycI7vs/Bey5Rcc2ngc/QPt/nVRVirqBRb1D4U2QAwdEClIFwPAvJhnn0/7zY+AhNf8FmCPy6gHeagPs4glBoyKqzK3k8qYnjmrFUnOENhbP09eC3ww//dZaQV3UVsplW+2zVlOB2tzYokpnOnCw4twLQnEUEKyGD4OT8QnH8Irdm1FU/oiwAggO8RoKNS9QGn6D8OVaeq9KhXndIID9Z0yTAuiAt2+tYYlJwZpLJtodH786gQbqwYNcd0zy+0JW0HLppPf3b/QXKgBsCXvKrLLBa9Gexfro68OkqKhMtR1DDtyNN1qMTweuTsQVZZucjGy6P19M1t+EWj8ISmfduCCaicG7QDV/9yck/kSpPFrGN4ByKVEMG8szAnXI8nIxWume7QctMoJPNP3kPGiegEciUU04w5YJvG0/sCk/AI0YyzY+2hzDbDCF6yabltPaToB2sKJAvgT9G8aj92fmhi348yvDa/ZkT3siOTXlwa9MsyyFiJpR+0Hmhgtp6xPGrdn2v31i4mBSUohvNXJy8WJnwZhC+MyKd0ggHgbAEZf40sA0mC1ll5Sx1jmKjiS9DiVJ1eKid7Z9UP6zb72qmzHbGJyIkTPtOcnSkDz0c0m697pY2yu22Srp8ZF/VVhdjKsuGHIacXkoqwB2cd+UB8w9c5Ujvyo1qz3kjLFNGnFQaNoyoGSf+XFoXKIn3TOOZIwwU9VA5JHP4+7oe38t09OuIHj4UiFzzbmsVWNRQV3c77Q+mh5G8mgjKnCB7Dkk34d1ptp5GGGx2CTT9Tx3/tjZOdtseshhHgnukhJFRJQPzw+YciBFxzSaDY6P7F0o8Y+k4ejtYUPQ8fkc2NYvWiCQfT+LvgD0b9kGFKaNd8baIduYzuEt5Lz2BwGajFJgwitQDb48UxhEjHoOzfz5I0/wPiXC4mB+wATfKB6aawwbBb26DdB0Hv0VG5StlNGj5EH/l9OyufA6e5DTDxKGuMY6bSma794IGHm16ZPTKB5dj6YgZ4cE6oNazr7tHBL9yXrFFRRGfGQxt8VuSqEl1Uocaiq6I0JpnOfIUPCxF3gdt07WYuPZuvO3d9uYfN691f/1nW+r7jHBN3kMCs146fjzgRFzOdr+y050yRsExpWmP3CI5byn66742kp1BPRRRvruCt8LfA6krcw+6vUV9eeXvoLPwqwHbws81MCLIyZucfpaGBH60blNP0rdWjjXimjkbD12+a1MVjAlPtNZLxoPbVJQQpZ76fEKpwA7HjWlzlazY2hOqXNMvgPSUVBrq/4UtC+o0IhJ/WO4eFWC/WOR5lOS831ImtnhGnN9AQHAFy+nSAB9FBC6WZvzwHysT3CMwj+45HZErtG5q5Tt3AhkkBXLrZxCMaIVVkyfvXvLx0X8yQfrQYqcb2deepqDztkhwhxIYhPsR6tE6hz53evhd9SpmiVQbqEYJ4AQdkVCuah5UzO0epYyGFsGogsb0kTHTOwgtTEeu8zgDfra3Nj1e3VD2UIGYtdJ41IflfNy/dFFQytbIx9DS1PeFqr6NxvoQi0wTZ7jwgNsqskdVAFPscPKCKlxlfFdymSZiVub70rT7g3681jQirn4Qm/J7TEqhChlqsmsitbPnjONex5h2iZ4VBiGwt25lWXasSs/lmSKYbZKia8rvvk7/HrJ1zfotU/MSI8O8473aVMFfAeBeo2S2u5SaFzlzfezAlVuGSKmw+Loou1pdSDbxOzyZXzuMqM87pIDua7zUPv/+zfT/IpPLcbqYGSljBWJZYntcfchbOMq9TrA5bkNweBQpzs2JDNT8T0pS1JbwUT1TflSsIs8vE3deSH3nKDSe0/QdRvrW5dNaKJ+eDkIxX/y69OrX83JFP/VmBOL/WMFucHmHKTIFUXnXDaRjiAS+ikiQx3HEjyxgv/8w/FZBpzuFFX/v4fu3jgw6NHohfeu3+lmHOZPmeKIef9VhC59fX/eYaX9iHp77mfLigkrMCchWOAKtQ0UXLk99s1+H2OKGvz39Kcv03pb461SA8VBK4n4EhrynPQdTjzfQPMhYJFEoGA9X4xzk2VxiLn5jHH+d5MY1lJjKL5VyJrEhJygVds4k8VE0lfUgM5nHtvzpBjIuBtWidtdQzHtsqH+4XydB/0ybr6wIH+HuG+5jL8WNCTnfWC+azD39N0NITxeCBRffDMzyT7kaXSa88Z8O2+pu0YzbYZg4TRs7Bg3xqLptaxV8Nfva013AnF2+fI+FobtvUwgTb546u16KCr6TXH+xjhVFFW78/7/pD+5e/jBA5P5VW7W+/mERwPkpofYqoK3ytirGX3TabFkkxvsQnJ2gsdUQfuSuNAa7a2AGPrgNp19y6H2jY1vDmgkpR4F0IeZfQPVW7TCP8GEjGWXT7c5kRiWGF26jOrczUVoCm0+cd5L4UjKF4PQcWptDIkyRVP+zp+Vh92EXxnEawSOQmH6l/pcrB16B5/G3QIefHgA1fIy3d/gdpoUE3ZstvMeZuRMlJ9R5tmmwjWQWzHGbQXWVYsFQcJOMRyA6fm/XUfBQNSyeBrctRazneaX2aaUaYgYzOurD/NGLnxNcAvTMgiMNtzTO0r8mr9LW42z0tDkBbj4I1Xx7BbI9nckYjyG/Q69cs6DJki7nI4ck76F6aHMrjSw9sp4ijAk9EAqYbhBwUkCGTaDw6C1b3ycwAubhxaxnGlgHaUkGDqo91MRQuiBU6AO0nLNQPXnrohFpDTWBM1yRCrfflfOtTQ4Y6dtMR/HGJ7APgilVYaix5x2NiIxd7+6SDO/bcxXMMQl+RHqxiaiSQGSRulksFlo/ieUSibr+ppXzBfPEXLmiksdW+DOwCup+nt5jrZIJjnuRgAoky+Q5+JytYNWTjtjSwHXuLI/dKMGuhqF3R5510mlkTTeP4vivdQqH5blrdwabpgzpOxcJ5MNGsLFNOBnMwyduyJYlyqK7OQX0JUO0RqF15PEU0awETemzXGluREwmr4qi0C0slmrwo3mO8jGuKcR6H2ruljwXJNOE12R1++xamTx54pN8t7DQCXsJpKgHNrrTXHIyZ5EL3HSNZeXEDN9/FFsWL2gOBtod9m/ujSH1V7nuPV6yVu3CLuldURccNO0gxg5VZRQx/yYRfqfVNi2LPJpOQYppLeR/yLzpt5e7iWuK73t2ZTcpQiAO6qthizLQoulMoPT6vZGUZQ4ySd5EARa9EZrye7YuuPVn9/PrDe8GmS6fmW/eGI194M0XCtMT+f4u6CGU5vsuhgDN57CvhDDMAAM8JbRqtP5iAnLqSiis4qYn2MqqmPrJnoXkjnetMP5hCP72N4Ctm7zufHgESqItXP4qI2zMNEAUwSLC7yjwb5FI7VBwU5AbipKLz61LoaG2CFu9Yi93Leh3xYI0HIQKV7tXY/+ak/ihShcGKHkRPWPE+G8HYsrgFELDwAyqARlengqlLttaG9R0W1AuSmiuSJZyAxyFLlWBeqKJOaZuuJZsRIutsqwwyD5zUbBe92oCsYveyHf5c1DzycS9fujh3Wuf0sPPhLk4SxBJjTYmloBOEBxILpmGD3UHWy7TdrvhyZHNjW6fCbTrQg0J30KUTRQMd1hxHSSwe/4SjIkC8LgLvWKGSs01zqn4oy0uJE4qZiO7qT19Jfiro0R6QgeRiYi4/mZcOR5NJXkwYh9RoMZCKCBNRWZkMUhYCMu+zQbq+y+wudVUl32uKAeiHecz6utg9w35mK90azihnEsnW8CfW4fr8NHQhAcFGls1PqWikhnORKABuVwT+sAcsHpHoARE8u133V09CMgZjriZGJsZoGETk93G/rEsddv7DAh2qcBZELh/GwEawQiMeefFTa3C5zij59md44h4mDl7tmyYFcjeHVXGx+Jh5K1TRhYM26HxVKwGh4ZxUlktzDkgG9UEUXlaT2elXLt79RZw+kmYpE0yexAP/U2Wjvy6aFp5iCB1/tWh+EFedlRS2nvYSoAnrgF/b99eHIlQ0uO7CRcZrEnMHjmoY/4jzuR6GdW/DVP2v19KeycJiJ/s4WvxJRq4ZCuDyzVPWP9XGGUAHOGjn3fN52ACSkLmgKV8Gl9Iu3HlctpbFuxX5k1pPd7zjEfnytpK7zc8xheElhlqvyJ+XE92SJBNwGUc4qR7O7QFNTCC7HNk+ZHlPolUXxqjWvVvZ4ZHAp10fv67v9YXKmMyotUOkJlMT1WhkqiueaNTy9CUlCl/x5g+gidSZhTzkJSPd8AhR/ZhfSoI19XL18bn6pjYXCW06HnUxc8TNp9u5sQgu3dy3TA81cSmEPEA39Ym8WFBJbPhQ3OohPpu7Xnl/AB7lA0/qApFBS/lnaohhktXAs3CoZgwsfDa+t+30pOdIphoJRleDhFC//lI/SLVcnB5rmn1IFNJ1uioIuA2IPRRZHPOm9nGXK1XpSpr5XZSn3TyrjUbM+HW3BSfWwm2AAd1Hj2SBimm/bka7qxFBd9ITjYQ3He08xXzSxmfSek90vhI/ohGXnl5Xv39LVN+jvGNTiqSWQlBgRyBvq90WKfUYEeLTo2bIsFF/FM0qegq1Cmx875mKg+PHA3r2YrCZo6TCG7aH7f5bjvD1CccbbWRNqDzvvbtRLuFmjeL3169SyFWLip0xdcEaeO3ELecy80IH+XulfkxjGrBhRIJBcuBnpVgphtKpm/J4WVmJIH1YQ2bRJZEoj6mKJ4aOUxhJ4YTXaZ6bXTH975dzi/3YJjcQ/DNKQiu6Oiz3VkkxnzCPqXomeDS8fnvCxoHHlGzv3VXWGHuXJynstWt8McsydrM1e5jUyQoveM5BiZJ9HVHojjcW8w0M6Fpa8eAr1A0tsRqu8R3I3NyJTvF58aC2ByuK42ewbh/KtoCJowCMH1LSGJPRB5nuxNOdjUdfQxklKGeQJCno6Jph08bTh979pSo9hWju0FuLUBXGy+L9hrF20rw9ZL7zLlzpu5PuAyn51d6Vxfjx8LF8CVns+P3/Qk8S2ZM9VxFgv+D3FmptQKYlKxIxtVDuGdujv0lkOkIKlJBnQ23zXAcaOEm/HwpJa0R7JGosEOX/QOzIdVxpuEUW3HokXjMVvlv5QGdio2fkI9jIJ88M87Jl48XtH7Sk68i3/5mFJSvpu2ff6/zpCA5yN/+apNCVGAV/dHtpEjClv5sXVKksR7wrgN1nV7kVtZDf4J1+ko+jJaH+KbB+BotWswdDXvmk9q3j0Z26gySGqo4mv6+GZoLCxBlMhAs1gMuOSKguBfygakDDFMky7OqR4FWy85eP3xAq+ZuGlX/RYPW98f65yX9txSSZ1VuuZ2VLXsRrCEimCRQBil3MyCJk4paufaLLn8fEUYQfUjmeXvqORsh+tQjVJFqS4FgAsGrc+LQxp8C5tNqoZzLBDcfSTNvwQSkCtydUrbVs0ABE8hnPoDtHYkl4W4d0zT3dGf2JDH3tEjZLKxZgMvPmq1yzuVRB5Oan0nmbpj9ZvBIR7fhQaiwWqk11xbu8wJ5rI7lJ5/wZm6c3j1P4KrPEyYLcmnLVqqh63jOJDZkI8ZsWVBrscodwsSI/w1lHV9TUdZFck24Zg26h9q8dpAhV8tzndbXgIWzV5wbbsgSWF9/oJXjUI3S057WQjKVFX8tu9A9MMqzCaPgpYDr+UVJ4IiQLvqOLlIezh8GE2A3mli0oqAzeM3LI5c2k2uXZ9PSnAO0hSO2e9cDHlXFX0b/1wA9c7JxxPeSyF75howchzsEh8eIMTLoXUxlUGPEf5DIVx2srpMbc8oDrAJW8UFE5UvK9PNbUpzCdMYnGm0yWBXbW2wnV1fgTVRj2+hosQZrCtx9+aRbkCYrnPsnFySyJGiNo00+ro8viimRlcQX5XK54IETzXjykfkMK5dt/+6rXvVHnJCf7fFbLHfkWMew7tIV+GvR/pAboSQb6erZXkhT48OzUdA0fvQvWVqwdfJvEJtYT0AFvFU5k+RL+EejE3Zt7C9YFfGkfc0CJY5fdLlPQIm0vmbWyQdLhrRvjw7FUGyaxHY11nVGvVu2MEKwRF/QvQRlUqyfgnw8xm34p/xBEffeQYxTTPczncXUd3a4rj/YRKyJtiTwcVJziZFD1nhWftzyKwCqpKwu0RZ+HDr5Q9YgF8IfehxcphqxivM2GEWL7bzQFgTN3dOKSb1srkUrzDI4dCDtqzk6r7UV3ebsRp64O2jmBC5nT0rqEMgREpjmXYpDvVu7d9t7DX6MWnG7nxUmRXh217XefpDgsWsgVK0Lb6AXTVU3Dx1rUK/RkqnCPfleV+tM9ALxVnYeV3S+WVxYr1Ve4evs40PzoXI/1Neu+vRxbvbcQVdwZf8pKAi7SGLYif/3qyC4homyvfSfTbsgjI+puDfbgZ6wOiOfyxFda0MRqCjHIlEHDjkJSahSkufRRlX/1uC485nhnRwP2LXF7qLF1+qlNNYgLIUMq5fB/SdCDMz+mciJ77LfPzW/+oP1/Ft7obvfzgoOuL1xPpKJhYxlY4APuI8RWMuy/pKlOlK+tWjMQ9dax+gVzmdJp5yvpfyh/hT8v8ujx7JSyn8K7du/Vrn+vRUEaYifffDWf8Ntrqln/p2TWbwm6AVkjFnRwFe4SYujcrNXv5RuL1UizOyP27MudF3WbwvPolScAnhBzp7DeNVOCOPTlJVTsC7scVB6kPJQ+L4QSnduTJGed6ZJ9YpqTK1g/VTJGOFukhX76YIvh0404VUoTRb0JzUbXDoEYI+0Eu/x1wGQJlVkPf2QvQOQ71Fxii+eMALQ4bj+6+dVz5oofXiYHsFgdlFD8uGJZOByepYXsS+VGQlpDKNnr/L0NBNHEwrO9mnSTRs9hb6HSSi0A4beH3s5lc2mWWZirQSm9DxTj7kLdm9ZPrZMb/eEiDBVhPP2IYLhXvRnFIGaxaBN8fHMD3LMXjVHoce3brjbW7GLQEHHoXZffaLf0jDfzJIPQfdmnft0quEh8193zjfnNwSPrIg4RW8qve5DWVvfyT6KJfgfaq30e08WQnMb4A1BniozBcztINUhfeAt4dHxqwkHu+Fktmc62YeUH0CgJbA8zp+X8rzXVl/hxHug7saKRQUITrWs5IzUy51lPhhYcsdB2T4lGuHImjpniJhhy6bf7BVmWFvXnB5nC+8WVot2Lh1lbJZo3kR3x2at6nuHqMqxr7xyb2o8vsOTzi/pU2JMCMYcaOzcK9f+cPsyusw7xSSvmnr1OvW0lz1UZjG6HYRzfGsFptQdy7DYrHg7SQ0eSUy4SvUklF1HKBBaGF6EPIFRrCRDJsi0h4zCPw/YqG5EgnxW4Wwo07SAEVDtj8Q/ogKIVagj1CFFBLySxOMX07Bdk/0du/Bcw/W+cQnsECtpo/Fu6lmmE9BXSdq2lIAfta0c6wPmmFPxm0SJhF+i9bnSaY3OuSoe809QkU93Hc/YM+LHegU7g87KnHBObd4iiCI5LN9HswsvL70qMZV2TT9eVvbUNp14IgK7N0odE5TlChvhxTii010InI5Tff68xZSwpRtrj1MRujAa+Gyk1z6CO2QSO+/KykW/ocgcj3eQZog6eU+fe5vSi1/4kTmibv1QC/7WBrYs4LC9XioIhTb40OHPeBaDrN0lIOuTfsVrhjMePgSpwzCp3IMie3I87n+SPy/j68C2zdfQgnjjyZeSXUIyY77jl1b9ecZcbbjl51hLLOLAnKpXCyWtrWfm/1gt8ZFkB6zAyGuT/jwjYzRR0T+fbxu3QV0a8RZpgpPN2StuxPq/rfTCHT2sBdGQG1tSCq7hl/3wxUMcUp7urmg2zMOT1XsjH59AJ5098pPX/fVWEMZ6b6zINwO1+7wDQFTcfeM5Q5KvCWiVT6fmNOQvLyeyFT5rvw7T/9SWpXdhHC7EblfHzYKWwpyp3eVEvL3tyKdsNstaYDH3pU3O2uaGK58yEOQdMF6Oynis5M2nvboTVfPcVSdOFUzjjQ8EwVXRGiRk6vFeSvgBj30Om4pUSCHCJNTp96ZDbEP4hQZNoiXoT1vzdSrEvvUHlIWCJdyOK66g4UJFEA4SKWW/CCwVWSv7Suf8+jMWIpJxEE8SmVijLxs/+q4dwkc50UoIybkVPveo8zDFKmYQvoeyXWgDGbuR6xC+U3OIZBqhV53TNMw79jlNfj91Cttl+gI9FUTYaY+R3ptNpAGcC80yjaYBwu0kOtUL/IoI86eaqEMALzx5HoL3gkjIBWsoKRWJl2jZGRpCi2vILBnxAF1YVRIBayGtzl7xJny9iNAyphGZaf3F4RC/ujfOunBtqEQKXHrUnfWCMiz6rGNfE6K+651HNeVbquDElzBvD4z97+o44RsfxzT72UlaML5Axi3HfDW3u3uDtTx3eqMLqB0xLExWW9DcV0ojuFxwamXMwRdmGXDsTtwPXDcedmI7jnKHzA2e5wSUGwxfZIzP5Egjaw9bOj5hkMFZyH4vW08+1MbDBRFQPZOh1eOCeOcMea5zsLH1TrPTOd0z4JyG2Rr9ww7zAHPG7DIIVyg0VHgm6/HDB9Bijfy0o8cgW+taZQ0fe+TOEDZTJOV/hpORmETCzOnDlyQLB8hoyco9uXWur8BQeITGel7mVeab3F1BfZIXlVpfo1MM5Tul+uT1RVkuYmFewfQz+RH0+tTKoMrpex2x5fxXBv17bQn0aLkqaFJXrre3Ir3VW8728dcWli8nlDgwHR9H3A+JifDoNgN/dmy8gpWDQXZEDcA4tPn5ZmemXTqHGa8nTMcpeSE9qDtZ2N+jQYWSNQ4mcdBuXZQapCq9LEfDVwZybUPSCm/NuUGDQoPi4XZUJEJrfjSxH8MA5//nNchl6M91frrrhnLP/e1iVQnfUGtuLCRih82RSASPu2j4uGaQXpEUdttw4xBG/LPapQZj7wgqg9ktI87GrC6n5ioM8ruZh933rjjcr/FwZP14DQ0MFBh17PTViFt5yOLZzKoDNXRlePqyVzH/Z7dOcZ40dEuteZSgV4qTUoYR+q+Rhd42UUJYCz9kYqBh/IR9wHz3Y0+HbsCr3BPE23dAQrHxH9G6TRNmOYSJ2sYyX7IlTupEGtJZpKah3B6RaBd/kcT7/W3q3rK5D7te7O98Y+TgCPiaeAg4iYdT7Ohn2ALlRz80SzO5aVtH6lJSTPVNdsD81K6znGRyU2P3wHHc056487FHFmdbbBS3fprC4ppiShfHJZLqDwIrBp8XLT0MSg6S36qw61zVIXG8X5FnmmAhmuix2O0CMPkrRDsW6QpDdns4mXOHlkXHr6LXiy6Szcvah0cxU66Rh6y6Fq07vzLkeGsIPt+ax1y2EZhPrh8FDd1z6w5xRi7Xzls23BFByovy2i/3KWRd+R4PNw9A9OWTWMKAdV79ddOnYt/jlep1xOeHENDaSd1N35a75U1a8ejK33mUS+Mbleu3ryeB3HL/eSUqjeMfG7zGRm2WBf8uQk50jKE0HWgB36P8Ztkm6cunTFMNv3xzxhX98INnQc0iZy/2Rdo2dh+l39b7b2j5DRtB1cdzw0NhsID96+INrG/4uA760Iyzw/krguwph1ffR7oK2L0R57sJR0mkBcNGWVpj782p0GgQqHtXNaqeNAY5WteB4bevJyqIoVrZd4otxlnmOVjFrseqSWPrikwYEUm8+LM05BHuQ/vpyI9y1eW7KlvXKFM6JhkfMW697LfwmZkEDOvwgtAaMnyycd360wxM8pYdLJHhEJXr151mbqmhuxgC32ZkWh/DHEJ8lBFYFiS7cr0hQ7SSsX4dbebOCraLPepdmg9LEisW86huqdgK5tJ8pcdxTcUqWw6mJJSx39IQWN5OS7IQ+gNCfOrVuSpinnx+zrWKcfKBhE1SegpETDt7hREaC/XNTvnoFO0WitqeWGOT9ztNvLojq0W4XyjgJZ1fEYuzBG3Nf+k2cBYg9RCIF/KAs5/cWd2h2YB79JnQCVWZg6LDqmdzkeZxa5y2dAgQow7fcVj2qQmb0Im0GxGg4WNZYuQKXd7utaWn44UsGJ5IDJjo43nrSwFZDeVQJ7EIfZf0s8w63cBTTnNw0CtFKs4Q4Sjcyqrq7Y2ZfTxS2hU3cwtr196BagdV53bRmPfMmyCbVNazN2ZGkxDLzwqab0ZoIWw4/AXhbleUA3/6hKvhGjf4ZrfrQx/4GueDxgVbfQvg5REaXh1Efco2grbo6qEPVGZXCGnEjC6vfWlbgGMDq2f9Kkqq31XdzyVzW6kNzVXFbbXL7sj/SCiZdX39kTjq+mj7BTtNFVbsV9UdBxEWHafV0HC3TdyEo1gkRjpHf1IcTV2qq+mdUyH/QZhrS0vEEWc0Z66Mgttw6mtXCo6tOrXZGytO8VqxAQdP4OajUs7+xb/zgfkCmM1yG0dGKVrNYRgd/V0JEUPgmFzcWwmsHutc90u/ubyKy3OquYkPVsPQ4cE9pRgzFpDrGKGXMna35p13E21CaKrTZd2PEm4B7C0Be1G21aVPzLbXRXaPRRXr4sc4M8cNrVX8dz2QRID08ENIswn7nARGuXbP9I1b8JTfFYX337a2KBOQ2e59S8ODVsJ4UH4fxIali06UL1hQvOUUgydQkVMT48FscdW8VNoNI/NRGIMcXh5OX+Ej6bRoXIw1yQ3dloYfWyQlMp6ay5957I/s669E85JlULXb2gZFwETrsdP/UsyK+ZTQPHgmJGzKcFToP3rO1I7judYYff21xaFeARmSb3rOVPUkp37ODb5vK9YR6JuRJfBNOlhfFVkmi1ulK/Qw41dKO7pDpNVZtOEsQidR4QUGWIhx6EXBoDlOQihzWYCYNnm5il1Irome1VA270IRhsbjeIuZn2Xz1p3l/sJUIs1PnlChmqDor0iIzw4ojylYyoO/0bjYg3RAvKGldjlxmZszKei2VLw6hdL3f4//2gIydIjZ6Bw0koeMIqXQ/kBt9KZrW4PlGQSkZNFwtxB7smI1HiPdS0a0Fd5ZPDFVQnxfHBVeLBoVVdW6P0+nCgoDGVeaCjJ8GAsjf1OJEVclVcRmWwv867kNPvqQYZsTfC86WK6UVjhPmldKwbcVm2pwt0fsdSBvkRkNLAjDnWXO/CJ1WraFuccxt3hWJy6AoeeFo6Bu0XaRt6ROtAI3fKOb3Bq+UdX+S/XRmb77CHNl/YCHHbf5N1iayglsJDKQYUcq3AA8Dox22Am4JxD+ux7vqWxCryDI1hm6aepWu/N7Kw2TDg2vwjlFQWfsx8tEoF0WhXXO8qNwHPq5CcKx/8uQ+neFzhy5cM0VyqHwubRxQy6II1NY7xkT2AdQehl5PpTMnIRaob2kCegbIQRDfAGX+T0+ZjLEeUL14LnNHi1dlcBLhLM7ZFwxNxbFptJARQWOBC/PCCL2cRaTRxBjO3Zfn96+PsXuMiZb6uL4y1glQptHKPcdiZopNaE80W6OlyWcGcKk5PGvbvDdz9wyYFrtKaT/t31o3IiFdwzK1UnwM4qKlAf5/8bFx5P8+YeEtBulWAZcd5VdEkMAGAq48a0JjS1OEkYV5GSEa3xjjeIsQqE/zzFv+ngxGc8QNmQtErIDg4oj1ZS8AkV7LiFB33N0ZeCcw2GsMpA9Ul5GqKdXS7iIhxrBnR7MWOhZFnBEEK8u0JUGZorSPI3FeNPI6swy67Dr1RIVJtSNMf48KixgWkXHRR6xoaNZzt7P4itpbV6zc+vrBBP3tmHEEF45FIfpFcXmFNzBHh9WYXHI21dMJy2P0YUS8hMiYhuJ7V4EV7zY26flWGlzLlYdlnc1rQsCLVg/eS8cotsvauRPC4/VMLSR0wscW+8bwssVoUeHiz3XYQqmSTG+1TD4e/tRN/sW3GB4sjxL4NrwZlbwr2Yy+yi7ILTVzYkfd+DrdFOW/apm8+vvrgXgNTO9NU4fZ1ZMgWwN5emEB+XenffH1DONGeGVY6XLNX7aiO9bCM6fQlwvcg3xHmtLLfxQAzo6Nxh75Iptf6kXFxFJLJAFiRlcuEoo5xGtqIRNk2pGo66mCcIMHop485Tr1Vj8AjK5AHZ3qaKSSVmC4KfylWxPbqNYmxzvLjb97aKGi6NTIhidpDyO91KaILmR+MhwJb2om5omPtN4UAfasCVQHsExKZErG3AiFNIRGlVUM+RB1Td2R2FLPwfpQwTsq9jCpzUyY8XsZEkLSbUPREhtB68UtiolQn81mRYvqfewaLSLCnkPSL/SCmJ8VQ0WUY5LSg4+BW9uqT26rSF6h7/4gFD4Mp3CryeXYJoNlX4xWeGuGv8cj3PTjDNSnJJKseIDRVcDnUckyZP1IlIm+NAUG8etcu0iliWC2PjT9/RzBPGZA+TfetfJtJVe5jD5upnY0TCUwwwPzIgri5vjMsrwF/A7qLXnJ7KOpB8VBRFPlF1MH8mwZYWqPeN0L+wL2PREpvdWW1BXatShSIxxKCpJVt6pK10xoySqzGZ1Lo5gp9hCBCx/VaIMrhPVbpFScqwtwPzJ2MAQhZeTKpM4xaLpXK7WOTQ2YmJW/P/NZ9J5Tbih+T+NNZsLpwO/L+e9BVGopo9ZnWzOrgiqCqUaTinUNE1wotfb4xZ2vby3/0Pff7QxcEbrD3644u03dbOkCuK74iZPclFStl1lQ/6YYenPSrkucWrv3G3yaXaTVymrOJScn3jJont5fRZs56t+3UT7ChuCV0qPtItQs4UtWPdzzh9r6O895AeJ8ZGNsKD5ZzrX1DkxDz+BM/EBKoFzBtMHLcA8Cx1h+JsaBAeh/BQzt6GE3V9F3pdUPCM6QfItbfqcOUs1hzmenIML9jzFCpMmL71BHDF49XQ2vOu7Lo9aexN45ocOdHWNcc4nHnqsn+a0jo8L+yesYKdY0xoWdXa6tPTqEBf2J+VKElhqfrZBSb5UtGjne0l/GIg2Ob8MITkYjSy+C3tDlQtOZ1zodoV3NiQdrFkcejm2QhwVpWla8Y1spKF+c4UqLr3W9meIdPTg1kD/ZKpRe95P0K5yRxk3BH+CP9gUsctqXc5s59xZ8iQU9eWdnPcnUzvXr1mYpNwwv3djxJZnK6MvZpHZjTf2LYU88SMy+p+QQPwfITHhPk/f4hI28QK95RRDVnrczCPJEzipfjXWLo8BbRDl4u5GW8cOu8Eju4PMtQg8lFQ/ujdUPZKwQtfXn4CVGzlJnmVKbjoj0J9p6sCsxtve4CkhvionzhDTMSE9JTqC0B2ZFRHqKG6LCEqJbk4Ikr6V9XMYvz50zk3lidlyO3COY+42TlHTQo2ZjH2qZen+D5ctdsmtBbRWlm02s1X6t/s6V8w9NTKSnWv/w9k472Qnb0lU/SgfJbfJuxcnt9JKOj0mEdk9QKUWHJR99R/HUG0uOJzulFA1zm5q60qMn0CeQT/NmskiGHJPaVcedgoaYQ0ICjb6lAP7+sD1fGo8I1IaqXV9HJiIaHHly8Z0KP28vdCPSHCd6u0budMWQ3VImMoSyqQBOLFcnR1SkBqXbfZy947/Snu3PEY5qipBn85kCoGaAeMh5sQGLEaXaJrXnmVzlAIombpl/2duqrcimdDkXP3EmltSOBqGGV3stNljIneAy8zdsdlC1r3D76WxewT5pAgGgWs0onZzbbCbm/jqshAo0kDIAPZ6GaTH6VkV3gbB0TiLu9H9yigBsWbhkSpXqp28ZJm1eLn1mAN30yUFGV2tEOnotctw6vjxD56QnaqRMjDqT+eko//x1pQEfZQwhTMiqz7GOt/0G+mtufxs7bqQKZ+aT8f+aCXcv7OE5bzuMt/eQtBnelnKPMobU2c71dJ40uCvVVhJSE4hkvnssPF3IA8jUvEEJ77v3GtlPbnkCvf0LZxc7kuEbGLA4pk5TPK13ioWlUsJQSb5NJ0yldLqeatz6/OJQy+CGbnRce5LRQlJ/41nmZgpSzudG7qwxE15HDd0Ajc/LdndsxbfDJawnMbZ1rgTcl16uWo2KxtzNsr7yQVuow8XS42QTzwWX5rEkV0JR3Lcq8JDTRPKw3dCRweFM8my5UyhwRRITm/fnult8hWsdJh5A4CXWE/gQja93Wx7/hNwpnNIBsd9O85QBYY4bUa0/bpICUhsDgB3vwS1e0lEssfBd/s1bNcPaTMFCbuNJpA4/7JlpThZUo0FjHZz5+o3EDd/Op9AYMt39LN5jSO8CGY6Em5qmZihEew5W40QzK7k62c/34lltz3YoCMcojupRRz62CddNhueOUisN69B1kzEAhRUM5IRUZQ69MvQJz9hLV5y1f31KfM61vLAqX2h4hQux+jd9PXu/a4M7fOpxa3Vxo/z7hfW568vFrOWObvYBTf5WDrlIVpBu3Rge3nedj1Flce4hP9Axsog9uFjz4mwLZgahlRC5bBIHpLVnhy+qlvIbf7dLk+cmu4J5YNCUINP+D/LBswbdXuh3DdBx1BDcxV3HGs88pW+JKErUY7EzbvenpJOOVQQxHcXLtoES6eGPX36m4WpUoHKVifz0MmCQqoeLmTu/U7H4cPkzcErpSuhApeiw+04GSzdTDbm5Wtdw5KYLC3nqCr432a3xSFS1O/IpumjFls24pQuo3fgbIRnXFVB0jSv1DcGvwLC5f0bRznlxQIzAjqhXX11FCyE7TESTcWn/p7JzWnsSghXyVWm3YeuKatPx2a7xItnYR2Ysn2aG6SCPIeOX5p1xAm/gS32gv4E7RfGbSsXKq9OzRjn8hEXBINu0DiiFRdZi4O2ZiXjBKoKTJYQJ3QhMsQQzgY/gOFJGCpsj3KjYXg94gc5oMA+Vyt9Ym0NNfl/q05ZHkWo8z55jOgO1AjlZDMaZVBoKoik+9BIKvf6p2sHL7xfHU4HTsIh3bLEcq1adel3Hk+yPSoeq/dMl42Z7s07cI3vvNnX54AUPF+PeNiIEX5Vc3iJ2Bx9Rl6pI6uf/7rzGcdLJv65hrSDJaImcSYIqJrEWS6QCv28cntavUEZ1bI3iLSM3iPxbIItpUEI+2Q1Ll3A9sqd8EgWFIzOEZJ3vuCwAFe4Z7pf4rS0qLohhnFTRuD1K9bHSzbyXCoa84q3/1RO1bgTjSx9imaiervk+gn8Hfu8lMn+I9e72No70q8tGolbOQPftEWkSOQsIPUw/IRQfhjLm5Of/ukX421ACj2puNFc9Q/A/QO1Eq8z959x4tDY4mwokQNaxYT85tpGVqmNPbEZzvMW8Dmj/kj82Fe2IkDjkg0VTEl+fgUrzutnbXe4q8dzMVVg8+IgDluR5XOhqAxSuVJMVDHvFlGiOCfjfSpW5uFwVckEl4ZyJsPOnHQdy+fSkwRqqC0p1pS+YKTBpmfXNTlsfuVQpNlp1+25k51H4v9CLuMyB37Jfzq9jKDkz5mQA5lD/LE/hG9RC8WKWWtjM50tbz5JwGuGMNarqiiYuEJJOa147C1w9tpSEDJQujJAw9/qMgk/EZ8bnyspHeRy4qBM6UiBkoORLBEv+Vgjk+0dnGc/Aad9KzZNPwnfMT8+Zdp85bm0yx6X2OHblLgrHZHXR82ZuXGrdXJaBGihRvuPHbwZfmB60VomF3LEiHDMOn5UWNubqbaQK79/vvgxwyVzrEzjQzxzYNICt/rAgYWMJ08IYLY5MrNc+vxKvBvfzJzGHu1Wpi1r6tZo/UkAUSiSUAv9DHSgm1J/xoD5J0wxGgSmS5I+JhdxpGyHXIvGbC53iK6rhN60jBLyVGa++8YmVnZWio6UQG9lpcIHimjaw6NLUrVpPvFwhctbmjCyomRmGE+COhf18FMBhDudWiZoM8nLao8+b2Tc3fvhjVKBxjH4w3Mdq1Ic91GjsxMxjQqui9M4fogq3JsrPV2HUs4JJNxHjkCsHSpnXiyKjaOB8sq+tGwITTYYgZ5HnoiWAIIGb2bsp4rtOSUGyKFDlsSEKb6PoM/dF2w67fiRlO4CV7B4ztnjwA1GLLyY2IaPD3JphVPQt69aJDdz651vBBLc0+HMZfU5Ng8NXg+LRr+NmDqIuxAqEsAtEDW/0gNM56qcuLEEbAEFJgC9qD5nS69j7UHpdZQkvIWAghmCn5wZU1Gyg8fg2ZyEOKKFHP4bJ4bPbRqPDhIS8CMByQkg+AaggdEkOAvVafnyCc2H2pBUqL6D1bl8Ei4VsYGlOwdKV/prIKoKUgG1jH6kfxx0hdX2QMbmAJCaGk5GR0prYG6g0JvJScCCEMF8sQiUgKSAXUtmTudexNe3ZidCBAu+9uGUMFADoFS8TjXohyEeKECZy2W21uWQyuT8DGckNRuJXGa/hHv6fYxXWpa/nFXMRDsbNeUhlSx8lrjLCUsjxULWefVMevoCz7AsU/raWd8+whpHUSJ+k10njA8yP+IoIr2vdIHVPI9NEgsEzXJiAJqwjvejLon4/ObgjI9HuIXjlnqqRBQSucfDdsTDJG50D6zjHE37YetJNXPj4DJ2PqH8o/zI39iQGZ+Ypsv2I4/MyNaqn7wOjFmhaiGMDPMbV/vi6hVc0LK0EDng+kBZTo5kTxJ5jZiyRDLNLeE0d5yoaYgugjCdbEEc6M4yQ4lqvr89Oyni2x2Jy449Dl5InVNXj/uzpdVDgWxckAWxxQEGNbDS53axTPdIWS3x0NTm8g3UkUiJdWGhZVGlPlfgUvS+L3zAPs7dYVIditRL3oPl4dcN9aWsnLDa9KoUvds8OBmN9zJEp+RMCPv22BRTogDOxjR7wBORyERNQuZUBPc/NXhWzNNRDny0qDymUEbBQC6UvmXxw10ZiA7Sc6lsbM13b8p6AW5MOuoxr5nlwjV76SbidKSd6Ryoq6AaBK6Jbh+hDJSO0qTP9B0bjbhWqkta45Nok9IUOYcOCTu9wNVwnBoyIVbnQQNaJkjnzgkGn+PjXZXhxeTfqvL6aT1jhUVVNKlcH6+fFpFDddtayGScYcD0XkSSDWuc3PFaQhYGdzMjC+bvsfI33F2pVE//VPZ/WomEl3qWcUyOIg2TdMZP6X5XOO3EDTfu+LCEOE8mHocIIc21IojHDjBEmIBYPrsZSiydh9vU13vRNVbK1AQRyfD0RCF0XXoz5UzlgbruaFfbyLSmO9B2I8UGdv7uB4a3E73kKo3CNThRKRUkO7knthT0F4dIPCg6sIDiWUSoDBtJEGVQLfZQ3+stx0p8n2WKKGNKPR+vEFZe2EbFhTUVX+7ECBhs/OrmDGooMnkpmoxygcqb2kKARhqCFrKZcvKw+KEFuD4LdSaxEFPD5ngSVmhd9pVc4YOymQJZlqMN+C7kxGGIvycLS0GnnCg6l08kJpI0iRu8IiT5FGbjRa/lzknr8d4wf1nmvlil5XsmlIZYD1JYaF3Ddls+3Zp7OPPCH1xTuMVBu8Lj6V6wSy7PYqeOW1+8uNyfKveQBuf/JqomJHsxdwZMWKBsuXIzaDGoUY5JXT3xCqGzNYDyYt3r5lEP+YkzpzERWs4RlvOIkuujFtWBVmecinVMlryo2LV4RMHZtGVgJXYokctxz7+vvm8GnfJY6MA7Gwo1Sj5Xop2GmWPCGZWtyFxb9jPvUsFsfjHpg8qjhpJ8oXRYm5yVQ9SrwnGaBVYwXhBBqyWus1f3+wjQhpmehh9lAtFTIWUMMQC5i0rEQWPxichY4/fZ0Zp3f0Wd9hpP53c21HMl8WzxDznJfAM27VrOGAczKIE/LsXBzVQ1BZquCZlbf7N3zt6/68wsWxhmeVM6rSbxeFH7ulkTFWC0DSKATA1SUDRJnUwyJR4ZFlrinTGXF3+ZzVv+u229m0Qfv3Ku3Za7+M2/B8ETSQQhi6OHDAzfAwmmEnPgKHxNNN0km8kgO/ALoUS4JGLTancq1/z+pidbZBh421NzOCU2N5rJzbNzYagQGoejFjRS2eVglVdAmCQzRWiGu1wDfJz9nMMxzkqWP+bPJEAIBsnYnvNgGWqjdK6mBfqLiCT8lA9qcjJF4SxB34ppPmMsFDppBrMbF47gQrIgPDfFyIu/zNBYpHbxRjNah0CFNPpNr0XMseyKcyAVTGf4ky7iUQi2MFzQ3AVY5oSmiqxc5SpNMFwFUK43Xo8GWXj0dw1SUcvvvnwc6eVknGqZ6HjqtEcG/yiYQ0zVqd0aE0cDC8cwXoF8sf3zCpyyKyKoWcxkZt1VLetOuN4H5IxdkSV2QOuZzzHGDvo0WKdJlP02IZBAObKLOIGcF4uvRrlx29MEWDlZNUKlpaAF1N+LXhmDsRVmDMl1gQq0EkgaY5CkZQ64YgsBNa4ENYKzMqFngrPjR9JBNc7qusIN8gA6O6ftpzP/+8jlusq54OEaaKEBj7wFBGeSe0Ttymf9CHQmalwn33QzghoX2lpy/CxEWxVTIhQwJjPEeERm7NWwJjCdlsdGWsfKpmhdcZqM6f90iO6HuhKc57gwYRNJ9L4OM1aITz4BKqOpkEArImFuZAbAXxHsfrNNpIcshWc7E1YehmjTV8yN1q5GTmOofDfaf96DiBUkz7KPzID9ZURwJMJAnEYvoOMsuBISjCOzs2d8G4ImzPcmkkRQymnvm5iIebaKGbiQ+5FIduNTJ3Ggbk50CnR5Kg2GIKEHJILb/ceiJCZzl0QEISCeXmL00vsQMzFKR0uAyo81mlUK9+xwoXMOFnup5FmmBa9LvYgkndWiDpFnzXncsP2wu9UeTCqqwZXrQBSABCq76/i3NI5gouTkSoaCwMyJS/FaZ04eZWHQJ3R+YG2/f46OSO4yCVYhb+UmLs5GzCPjtOD02UOL/KNCQo1ammeFCQAKWZ3mPP+7E8UXKgobw344S0Fx8eT8oU3H6b1TDMXWEOW4smNLy+I+hRo9xRF2BwD7wIjcSh4huLgKT9AKZqG3p/7Fej9roPsYQ+9Ujx1hicokdhQQO5RBMQk9pYhomf/EL+GgtZ05VVYeVGpr6FQdKGyI1XfNrEUN//5VhBVvuQxGM9nlqUQuopFDr0oJEDRC2+6W9m/PeHkQnhZCCh6OJ7iZ6okZbn02fH1VOFIrNu11KMsTKK2VbRCJjhahIiVrEk2jyrq2qze22oLCovFeglXSz/HjSsV5FLbGE3TOXa7isYMtS9RWuEdFSXRN08z1SibMpjEP02LIa+nSOd0/nHBXg+PcZmGVntcSAuiv8zm1CN66H/euLaDAhohehoKrPa7LOmQx43GxcVIJicVT/3qpbd1oF6YhHMcLY7yIwXIfV4RRiIgxL68hWt9QeMC6rHBS8GTZ78wxZUDxdaL/Mp9SpCXGN0jZQQSovVziIzuC1RucGNu7B2a9h/6a+pI3SagkVOEbgwm4rNwRpMtbNpObSumBlosDQomqTQ8TOc7u3PbSieLLjmKhqaEWX1NPZAlm5uit5tCQkaX7dgf8kivTnV1PSa3gLMCTY23iFpIgNY8Lifa37tjhbVls0VbrEbiYzBMLSyllDqWyRLHUbgZZU8+/EHeIAY38om5qOK8ANULBurfKxnVhfDfaucoWHNZAg2Vc8RrjxOGSe6ma5lyxfLK2fqiWvTnPXLGFpQRpgt22h7YnRK7K15NvvOhwq1ZAKeOSHZeuNWHEkt3GaDzuttMoMusKXOxA98/p2pJBMEC6WDKEWAqp8TC2rZYsAr7LjUCpRm53ndKETyXyar6xgKHSR0mU5yyKOW2p3nYeX3waILut0g19Emkqmo97vA/b7Mw3XzvTIobeuBpjxwUHVNDuQvwa6EiOfvFMfCZixcv/SA0MkFxfF6zbot+eQhmCNudNfWXdS/8/tPzOGkKxIbAHYrqBecrRYWYSHgqYX7c5dPl1KGx+6H7r9ilZVDvP7PUKBqkkaVqB0ecq4XEr0032ozWfBAXM3xPg3x6izMHeKLoYO0/XRjHcnEddBRAGM6EP1EfewqBYzN1YilCVeCyhAqOTCfkEJM8TsOCwWTd6PjY6xOmkeOCDFGVnEbFgnh9+4ZplRng8+gBaTNe5sWwAzYG786HkEd3lybjRwqw2kkDVla0FRmgZd2uQ3NsaUUsoQUpiMwK86upcnThS2xNrbYfc9NvRF5PvpqGSIi267GE7I6WjlQ5gXjx+bOSUouIsPXFa0baRcXuvdNXLjh/rCPo/dFs6ouHF7bs8evNsDHUpWBI1jW65mhTcvWzqlu000YCsviwsZYSYda7paKBDjB772OODEb5FZ7w8ZSQpxsqwVp7yZ68ZOfmE6QkcutuVHgGn3/tHENX1ZPpqJHtsHtkRAzRS/9hyQaHNwOofWO4EeTd4HoNXldkgtvOOqwuQd6lofzpR/NcrjDgRj4V9k7VxFxxhbFeomx24zdTxrstdSMjduwR8MOmerJHkAV8GlM3Gv1HIk40MlQWR1JCdWBBSQAQbr3T8huv40xMcoTlG0sDNyKXNsk+XaRD2kEQ6NI22OR23mQ5mbrpf6IdVbI0MFZJVHN8TRyeaSDe53pDWY/8G02rTomceusZ+4hcEaiqZcAOPQMgBSACehOfnxwOa9POloPt7gv2unI/ua8Fx0kJmBR4FpGJYqQSXXgf68aORVui5Z086M+9DRDPTiiv1TJz2+FTqQgahiJLG6f4b3GbmAKGxqh0m+43ipm67DQJ6hhZLqe5O+Z6G1H9RxTofAv60TxfBeCmIM22epwdDkQXBmNvYVhrxOy7nD6HTb6LoD8Ax7q9oN7KSdwaKdKm6NL0stY7wLSQI2rMGZmNakuGOcURR/yTaQ3FQSgUG/xaNI1r8hCQYHxvFLJOlSu1qawHOM9MVvJ14jpKBKFJls7DtQMwiboDWCUzoIIWCljClz55BT3czw7eSWCQ/PMSndOnZZ7zZaHLlJVkZHhXcf8fa8gj3THpG9YweKB2dBadBEA6GIWgSh9nkUQJoiz2sAtukV3XZKMnCGwfD/TEH6l5cCJj1Y8sRWkxkqj9nXOiSLa6H1v/XPFVY/K4KHn8QB9VOQf9PnLac4lSWqnSi9EYHI9AICHGNbrzLR6j4PluDQ/m2WMzf+ZApnAOtZXlvxPUI7XjjsQZNINtljITmvPzZINlIHnn4/z7ABI/mwrhrx5aLrjnZ1mfVQQRsptJw75DSMWIqm6HkCOJYi4JaVoeZcCQC3DImyLpsxQo3r3ow6MkbMd153qi+1RQ+wTCqKUTIQDRX9jSuTqakL9zsEmZZcOjiwW1x1hMhYBix4U2uWYFuieS/2aJsjHWxbd33PLooi4kxX9N456b0ZniPyv7jnUfxtUnnPdPWHTsNHQXBu5uw5H8nD5tb1OciBK0YWHlHSBMwoDBiNbBp6QIhmkHbYbvEozkxcLsxt8dClXuZYzgb1fD6zg3Gj/qZQQRkit/u72AUmhqhoI0O44ZOtmkwFvVCLI6bImL/ipKP9mYoapxi3BN5KEYwzos/ZvbIzLwgKF3FcxPk+x4mMDppCKQ2+SIW15wM/PQKykheoBUOftw1p2KFeJxHi5ddYOGjXInf16HcLNQkPMUM0RP1sxZN2celiyd5kWySj54+vgt736483oUxHQQiK4lAMhB/i2SgfNzMBVJpxVqi5PLH6Q1vWSxhdiPj9dm1t599ZtAKiBPCAG0TVIqfg72zEj5ZVf+HsGXuihz6IPQkaOidy4hVbzhjKc8pnfmsKynuY7NhnDfNaSw4jFt2evvcWWd3Dy0/shW/XItXhxGWSSc7crVtkTP1WnNnxKg0sp6yxHOuPTF9erp4I5EOsnrDTLQuZaNeL484zfrSXtLw19tpoNrV5bBsrXpuxvuqMYwX5xksYyr3pCAPNYv7KJVkK11cjWFwiQlaDYHfBNQOFhwPLHai0oXxTACy5uwZ8ydyrSz9QY5QGvliSLMaR2NP1hrCL40WoVa1mBM1huQ8kOWksyWWgHXAH3dba1kpLTSIvq+UHMVr3N4PVdPB/h0f/aCRIKe1f7HXjE1dqB70NZwosaIp/0Rc2sK29d3f9skpM6SXO1Buzh+u2oOAeTEJzSRjQITEfsGQRwbWNi3u+VxXe9COz7ta338ado8NyWnyUs0nw5kXB/pTIqiPW55gmRHxinH9pXWLhn3cggJuzTs6uyOiF+j+o5TXoVNDwD/XJXobY1inRIb+Soj03sGfduJBFmXNVbohTk+RW5FxnMzpkv45WA0q1jBGqs2tTZ6jlA+dkega+vNc8SRekOTBQL+5wzd7X6HqzaE/toBXWJgenoELTTgkLVd9l4JMKtfuJP1X8lY9JKuqJ8LaAtyr2oRIPM+bAiMGFLC68TcKCD6cdGh4SdqJnf4r/NPCw5ShXv83ekwY/feJVV8U6gmuA8kvzK2d6+E9rO2DvkMCtXzkrDjj63WuyeB3QhjE/LQ3sJjEL0MoDlYDmx/HPTYKphYXpPD2yVVgzsxQy6Z/BHPqxzPLY/nO6xvCsJqHf4ZI2gaPCIztRzOuKIIElepgIt5ITMDqJvYacQxRonswEgtcCOSl+51v8rDrqBefGO9nEPniQ+PKLKU4n+fhzAX1QP0nirzmjS/vP8f8nUhBnv/z7o+zF8fMl0ckAIjgE+ufALb4Mlaio/+r2LIEfvwW0b8Y8eQAb/u77wHcp5F+GMC5y3g7xKMLAtxmyB6+M8AzGnBOwWUgoJiF2MOiaRBc88TM73jtx6uAMDO3RpLUwTV/cGO51ixgiEAdbz4pBKbgmkL0XEHZWIGtAOB/o9SMv1RA66jgZvNa6q9uLJ+kXIpErpR/rmj9xGk0Ub/gtZd6AHDrPktrkTYT1G3+WfGWJaYm8kL4rQp7bgkrEYD+zGN+UrQEuQy7q6LIR+h8IymXV0KieX/+Wx8+hQv1CTamcxuXnwdCmismOogsQ2BC4Yl4zCJBufLMC5RcUDRAawe/kjFiCS6GdL7JjI/kSghbzGVkhPOCXyeQ6xM8PlKbYdxkiZtVxE3l3Hb0evHK0JJFYlPwKMO2TuTmFLcynKgrXiSr33mXsi3hNyehSKuVDtyBmBGxMmBRysYN4FkqlmIF7eAAD7NSsHyqrRJTrOBciMranSGyPM6DWzF82r86hOh70Sd/rDDwiw4iChK49XEU+FUKnP8ot8oig6AihIz+CqBdpYK6sXWgAflDBiztfjkvLCivO6PFasgnULE4bhV+TrJ5GNXA413v014xaH9ojy+4YtDO1DXFwPhHBtEDyCH6YJ0H+xkHErWF6BNf3AJA7yS1D1mtPPix+DYiykrDBMdevJ2HnkKunUHzj4t9hqwHGtCD6AN1yBRw5gMt6vaAHkL/YsGCdro+Ri9VHNfMPRjXyBZyiWxUlILoSkYgbTN8JsoCLIYnsBIyIXfULADshm2QCrnQAovhCYyDlTALyuAGnIhnxlvLQYGji83p0vOHP3fYcMzmmNA8fZNgbIi5cfzOPbGX8RfGEOqwGMm8Fm69ZXOuG4g7P4eLPYaFugV1r+KU0iPQdnCPOn+qoGn4MDTikHOPy1wSMX68gkHw1uo0wmMFcp78l2U2kS5fmxm95s1kgOh5RBSGOndBc4MigcDSuUQEnrOQbzgQOH+D5zuViXznKXK53NouaPzOq09hPY740NKRCxMXNf5tOM2ynxmU68R8nwceAOR1fHsON6WvapoaRJQvAlfuLVTI/BdgbEJ9zh+NWoffcVtbgDgVZEOb8XE+t4h83DaZ39KAegTT6W4CL1dY46jbS7rV/OqgyIrbxgoJAuosj2e84PNioqYImf99FvV3wTw3sxyjFOo6Y1aEPHAbI2btvEDKhUyWwIw4yHwXM//xaoaYhsKMafDtEzr/7zeRwJ7xyJsiLv0c+NYZV758Y0ZhZOJQdigwesQvYlACSkHvtIJAzGJwdSChsOQUF+LFRsPYcnaLqZ80CW98OMWrcUbEhZJdXyrbqk9bHcDd1bhDAQa/7dY/AmYRXdYzhPKA3LlEBll9hJDjjTou/DIWj/nBZcbK6mn4POEOF6IDBxjbLq13cHqQ7Xpyvr2C1GTHYiFk5pw/Y93KkKT4+HKz4DATaWRW4s4q6s7LpXhgplpe5nsx4e9DvaknxgKApiMGdUmGm1Bvw6oLoFWjavMtn552VTZM7dSEkO0zYQQ3TAR3yCYOawwmnuvMF2hM+9sk8ExnEqWNyCRJWxKTgn+sFlRo/5i0a39Fsdykc7rvahNDvu+3tmci3PevABH9IGWrgWsTwrHShNGdMBHe7pk48pGYeHGTKVCr7TEJrPlgEq1vjUmyfhpMCv+jVVChHTRpN3+3RDDpQu5bb2I49z3y48tEv+9PwZuvG9VPWtSNxVkxx9Xj1RPMJ/TuC9aKUrNxiU7b4vFkXgv+AC7OLMqsGqLSeqaYIzzR+3v3ciUieSxH0GAb8YXL76qeeLpzpaQlh6C0CHlCjnidH1rGkmgFlSZkkOnx+8/CazfZha+dig8iTsT/BF7ta1er79cA/VKCkUBvSaLtG3FAPd6KnS1MfZNI4jJKqySPDrDa8nxO8EPYQfp87NqpbwxeLlc4u1ytns+tRVxoi0CxIREMwQLZXC2UvHNAnNArVeW9GnMVsaKlYAjqldI1Yw9HyKkaNEZjiiS2ntN2PUlHsaDNPLsVut5bO3+NV/8dgcuF/3seNHEBcMVDU3onXZ7qrL7zWXQFhegmKpdJbAOLD3GT+pb6CplolFocWbBcDqYnnN0KXYt2/hqv/umiw57/bfgJL9AVD+xOspyomSVHPaV08TtwngB4hoiJ6CX96kJry0DPW4rl8LgT0Z+WSsdZ+QdZmpMbggSLv5IRkIhqoLEKAK8PxbYi8YaCy5zVHLNr4Hq2zX5KOp26Q/X4UMKsp8Hkjm4GBb4LRG21pBAVa28XIqb88UGrxhnFJB2s2FNrpfanc5AIiDlvZ5pHIRtLIHN2bm4+sa8Ase3NpljTq9/Tcphalvo7/fxFtA3g4tlbXOwB/dOjFz6NwnT2N0/8ssQ7mXGxAdSzaRPHR3pgq6VWMf6sPlf3x3CMPeewDjxSMnlLraxOa24y2czigjPzbufI/WCVzLrBu3RxSw0sn9uSH3hA8NPPHM59N69bGcart+Rhmq1xULvHzdFNrzHccTC2pwKmIaF+WrG6QumKPV+T3QBPeFV9AOSWFRs66KdfktMkc9SFYi8GddoHKSTihT4zcZTtZxTmJ1VyCq8TYMGePS2GCCBtg4vWAKumbWm0mXRsmH1yO2B4Y9KulIHCk46P86mvW6xkHrP/sAf/S422BAFEqjIVKUhyyBQDfzMWKdew8MSHpU6JWoYywNY2SFGPgz6zA/Ez5adk9wgXnRWqc2Citdd3R5H7iepOyu6DSAvQMlWpk6gWHjA47u1BlVOoS9FqGJtJzpJyAXQHymmyTVVROYLxPE9KCwMilN8p5cNaEISliwZBGQ2mtPMm5VbY9RIEhHPC+pv7BSS/FwxYWo3SiCNAfgVSUcVUQEROgUiLnr3GmkQQLoQB7EWW4NRHDyT1mrw6xkbkPFKBefUtNHDF4LPo2faD1TjzZuwl6rJ/KpEwU5VYIIJ8wZzUkOqmwmQZIRypvBhmY5QyKtnZQFMFfAaF/XcZBz+c0qAoZ38p/Npb+a8IVM1JLBQCxQf5MVQCzbZsjO69hO9wF9h7AW00e6N7DOSkz4t2rqMmv1ei89ykFGJ7JGMvyinERVKX3xegURichoEL98bei2I2DGb2ZUN+6tfYr6ED8NC5FRaQo+jwwfRehPSmatyFwaEz/jkoPnNwI5ZuMUso26NKAOvYWs/WxA47DkjNSEhSHZHMe/VLTZIbhRchdtvZex2kxvOH3GstbUnjXY8zysIdplSa7LQAjtsnBwqurfS8C5JVmaehE13tKhgV7F+S0sIrR5nsS2shh+V3AwIKVQfyxE6SSEYvIDDOxkp2kjH+GqggckGZRxSMxJSekBmmqXKQqWnSaCA/uDLDClfi/OGY0l73jqV7ChRCvcv39Gp7O+l9LM/KY7p5L2OvDDNDLki+IbUdkSmHH+3A3osPfsgTGMz4ZzDgz7mQ0NGGumjluVJizarzqaW+kZdM1FeEdHZBp7HTjkNe7/gjlVsImw9ugSk2/drWM5uQewLl/nCi9xntOjdH0tsgYcRVEl9UECPWa1uOTqhbvwjLhOtMp68PKR8oa6vu6KpRF9JQ6SvkPviXk155RX/DWCFp0J3tgezkeZ0vLuLuopVxrYZQVKSOUzhfwrxJt7elNNKjpK0KBi1BJq9C8vut5u2O5E7aqhGO/6Ra3IU+44MqcQPD4eCSHMqom7ZASIDbYAqSceI3Gibb1TI8ZlHJAq3RcPQmucdtCy3mlhyV8/in7y3XdY26al8Q+b5cynnzB9BHYCUTsX/vh4lJYoTjbHFPuNi+GTe3f+JltsTnWMyz/ZjmaUD587gOY0f14u1qqLHFmvoax7ugap2rLoxcxVx1HZv+cgpdY0iO+8RGrK9l6ccQxMIGgwEl9N53Eg1HMGNIHFULP+JuexwqJmNqnvKMlHc34NAoKUhn7CMxpz52k24SFTHvsxP3nTtsMBQIUrT3bcB7my44ZTfP/RNPL87JQce5tnV88INXarIaL4+DQq7jEn7D2oFdrC0KsQkT4D1HzuQ1wkylx4xRKaKwxjan2426T7l9D2ZYg07WfMz8fe3uTfJLd22P4l5gxEzghs9TDRKuHVqD8/pgnnn4tI3dNrkJhGo+7oMKEFA7gALohzrApiiAMVeazQuKQIFsEh1Yqa1NK7AqVN4vrrz+X7C9lfhKOJLGPExxtPXYqf4/HYqd+JKmfUiFcULTOeBiPX9dJcfknApu5sr1IWS0cyGHndd7m8CJeqMDAxD+8d6rjU3J0G0/eOPEd6QIa00fRLf+0d7s4n7Wk5B+VZze7OG6vTIcS59jB/e5dyico9d1AeWuh8V7W8/C/rDDLgZJHet1yAd8RIPBnLn+ox2uc02hGet7EMdTkj9Mo4yRUEL1hJRDSZbNPvCBs/axQH2gCF9Cir4dBgeBCrx5kxVZ8UKXLceo2ghUd4kqpL9sYx7ysiOrQ5m0qWDqXfBmt2+cZlHa2VwpF7mpyHh7TcvnkcDwBwi+LKNRmDB1e+vJD+5ToI5pl4CCUOQlcHGXtVd2d+qRLAwdtZeoza5DtezKH4FIK+4iyE907RggsXOQQcnRw7Th/JYVN/vx0j7VVFJ2Fn0XlA/Mc7V4ucmChnUOGKQ1AOp0Y4ndmcrGMID8eJvkIxWlWS+lBdGb1dZ7kBkzK4BARR4VdlyBCZ+r3DMFlohULG3Oypg2cyAO856CeIPreUDOk3zNmPOSLNeYXe4LoN898UjUPccZA9VlIPEDsmm0o3ANNX9ElUgGDkkfNFVlr7NSFdmUkZAaUvFz5xhunZvbsH0FKGeEKfSgES2vl7FoG4D/SNsZhH3g6IVmuCdm8hjcreICV88IHgFz4o559ltOYs85rAMP0gY3nsCbiafhRpxF22COKS8s2ies6Ab5Z1TIwxjClxw5v8pnWHge60sEuRJt8VQRRVw4DwHLIH+xrGfxYJQRhbwvWNMBKgZKAY4w0cCvUwb5NrI6gF6NOAsmkXKf5YLOIKGmom2AAmRpSSRXERIRi1Rki/EikiFUpzUnSgNjIzFyyASocyBKshUIJ02nDDyK8i1Sk3qxkoYRZdqo6lAJD8iyDUQf7/KiXI7DlxSoiQulkWUv3PJK1Hh8pVjtgSQSrBoJqlBBi4eCAlyN8MYak3Mz6DmjWph5zo1avZULk/Abqmk5ISx4S80FJjHj64jg1FdKMsROMcmD+56gjhCQUQhM4l6n0gLvmMCjSFh9x8/Cr3XV3l/x2QgJG6IxozGUzFUhVTth348uLjLzcCPxhBeRygYqw6BRstM1Qalg1MLkGel0JswKQyhbI4BCXwhxADImDb+kEGW3ouQRj3chF7JWUOtGDe2iw8xd9hrU+HrNvopIYBgmo0G8M8oMlNy8tKtF9s+LQPS0sMoIrWVG0jNlFUWlKd2sncKvhkGM371Y6IDUofQrEqEGq+Ai1aRhgHlpX4h+iX42D69HaO+4T4ZVOEf60hcmBIU7BeweVWVCRL0wWWH0PC9dL5qb53GDqUreKIJVwmuubAynBtHKY4MThsdZY25Fu/7sP4m7gGFRhzAYm7rzqcf6AFwVszKVAIu3TOgmwe0amKhA4UscgJonoxLoQkc3awQXdM7Tc3ASCc97VRSQn4IaGmcdnVXaS/DyFTB6K6lEOsZ4BKYBM2DY8rJxRCpdWk4JK8qUKThtFOpWfOMORwt0kpQGTZsLVtv6FwArR+Unprikzca2XSr2o/egtgMekAHRNIL7Z+oJZnwY1HXZkiwdX8ZaQCYeNuBTEh0nW5DlAd8beUVMoMoLGXDokRzjy0G1cj9JK/m2MEEzu5KQaSDAQxxwmJocHMfhae7QCiNvgqabuPPw/hJepqbEzDKRL4DJ7aTCPj9UGbK5OwG1FNbRVYCmQoj1GCqlIkGSEaGeTzoNRUipLFqDSoMSgzcGGkEiH7HV+AeNJDUPOEOrsH0+wrhYdjppDTTLIEtMo97S6mrNdZruFzsFMzQFPtG6WIisprycUNpwdxR3DkrrvpDkrJ0ozj+thQROedSkTBgOhPCi+IYvhSkUtRziWVML3PxmbrrE6jatmeCMeXEgbX66KegzFFRXj/In5/EEnwFxgCRfcGGNtr/CU/JQ2O76IPAuWAt5F5iqkHs3Z/gNnRBugqBlUCLolKgaY61xtGZGu7UScKrfWgKc2acg3Xvfink12K1JL/b/6iTLnl+p4UO6ZFvsZDa8wxQfCaFH9TfDwOXSHcVPRt0K1V0GWDUDuh2HeWdSv3FtC2BtlyFhWfoTKAF4D8RqlydhtaRP7IYwCv1wi8KdpHZPgbXH43ccnT6qTtK0wxzSnSVQ7TTwISSnBjGMjCSSDG3RJVrheJhXpMtcWHsY+Eq1U1AQckq7Jjp8y7UmbmIXCX0rxB47y3CuLT3FE6nDxupJ6dTmu6k0JYQO7YnxxLvJVi6nGZxvpkPSHMLb5YQDt5r7Yb1Jqqfpm3tSg+AXUx8tQ29QN+bjlGYWuwVk32k5XhiwB45sgsj1uZ7Dj8Ndgjn7Xf8yUv6J4pDgxw079ZdxzTBak09+8I3w4//nELirwrPlrDvm53huZvsnF1sbGPS6baJBM0xx1D1LrPPZJ18ss8FpJ21UpFifEmeVOuWMi2w7Fl8oc5VuR68Qm8zu3ul3wzXXVSDKpzPVSJWq1KhWa8go9b/YSzdq5h9Ci1YvjdauzRjjjLXbsAnG69Dptbf2Au/YAP73E3nHemCdX6B3EGSJrAgkQhKRl+8zQXv3cSkoKmHKFBWcSlNVU9fQ7NsQg4cwRdiy0uWh8LhZG9v8OpR9J0MjjnXnh5+VbWVtmD3flWuBQyebI0+PlTv7rjb/XEhlbr3x1jvvfSBIkWpgXSekjw6OWnAtRwqhpPMbPo9jNrI2NTO3MrbE6FEZKkU9gdPjm+YJRBKZQqXRGUwWVw8PM8X9ZXQ9sq2Or4ec0GeIjdDOkkfIHhb/jPU1PQho1H9Ye+zNZAEIRoB7JIQlPctGolGeyuQKJRYNF71H34PRZLZYbQA+ak+r9rUcTBrPU7L+MsDD4aMiLo3qKD6srk+3H6IcZeeBPLrJPO2djy32y7+AAjvN3AH0cUNY4UV0n/77u+hiii2uEalSp0mbzlbb7LTLMdvtcFyXydVn8LsTDjhYY6bMptdivn8ccrjxJZRYUslZs2UvJUeppZVeRplllV1OudZY6ncZesjm+RybnK5vgCwhZmfRyRXnTyG7iyYmUNU0Fp19c3+9UXnUVab9PrqYFqtNOe2c4e1MFHdr0C3YOSq/xBZRWs87eZ79K8KlJ3hFeY6McCc/DILkDgLXcv6lqncBUmtlN1L7kV55kfZb/eyPVJqLyT7nNWm62+jbps8LFFZJftgR0i9EYuFL8WXkX0XiTl+5r9wF/pdKe0hdAcuOvcD2Llyj502yEkGMRXsxCcppT9qrwfAIVU46pp1XKOSilgxukTOczHVBUSxQMhLqXzZqjrHi9Rh6Pnar5gzGvqlaRwwaUcTXQhtM9hOmqpNUmNGUSXtZV3pgYeOZpflgW5nJgYxBZmLoQybxUR+Gz3WbxaRlKCnLLz0UcPXN63GqvlMmg+9jJx4q6n2JUx6M46WTYTwNrkWm562eKsq/XnnjtukMOSdV7+eS4iN7j9H7qTzWH/vrk4/k7/R5uqRtkxQ3gymX5r4Q/rnOy6px2mwpCvlSvblcsWjzn/UlY4Z0vi8aNl6fSnryn68Iz96UvhoPTKSZUnBdNdmOiYqaono9dm6e+yMgS2i53YQdGwYmP3rJ+3UaYwHSZsiSlxW4Nk2UnzFgQ5pzdBiicIjeCvL1F9FRxHEzQSKqgeOUHRSC+fjYRNNN+Hw0jfF9135jND+nWKRrhke1yZuiejsOiyMimJ3bdQ6yL5XEo2M/WFxYW4iTaIMM+WauSA7RvSAVp26si2Dt1iKYiFmWweqtotH3QaVyzYjovRTGmlFZ1DKMqNCn4rEndk19WwMQYYKkuOkMJovNkY+G3wAAAAAAAAAAAIAQQgghhBBCCCFECCGEEEIIIYQQwhhjjDHGGGOMMSYIgiAIgiAIgiAIgtDpF6nrmqIo3cNK1/uaXR7aiKS46ZylB99cLgyOL4o3DZcYZ+Wbaj4rx7HBdzvl05tFp2SbzCkCTE4fnR2n2SzhS+d5svN+QfZcvjE9Zd77+efa4ZpH+zTMW0fksKta8t/+IrbMbiXfdKXafwSrm1Va3TDIadcoWSgUvWfsOM3kDr9TbHXlwz243Hqee6dD9lWZ4Pj/76eHFvG1+7PhMzSUW9/ff3VW84R3LvSrbAWy45pbP8gA", no = "Excalifont", Dr = [
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
], $i = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), rc = /* @__PURE__ */ new Set(["Excalifont"]), nc = /* @__PURE__ */ new Set([...$i, ...rc]);
function sc(t) {
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
function so(t) {
  return $i.has(t) ? t : `'${t}', sans-serif`;
}
let Ys = !1;
function ic(t = document) {
  if (Ys) return;
  Ys = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${Ji}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = Dr.filter((n) => !nc.has(n.key)).map((n) => "family=" + n.key.replace(/ /g, "+")).join("&"), r = t.createElement("link");
  r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(r);
}
function Qe(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let r;
  for (; (r = o.exec(t)) !== null; )
    e[r[1]] = r[2];
  return e;
}
const ac = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function lc(t) {
  var s, i;
  const e = [], o = {}, r = t.split(`
`);
  let n = 0;
  for (; n < r.length; ) {
    const a = r[n].trim();
    if (a.startsWith("<!--@meta")) {
      const l = Qe(a);
      if (l.background) {
        const c = ac[l.background] ?? l.background;
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
      const l = Qe(a);
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
      const l = Qe(a);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      const d = c.join(`
`), p = d.trim().length > 0 ? await rs(d) : [];
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
      const l = Qe(a);
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
          const w = g.split(",").map(Number);
          return [
            w[0] || 0,
            w[1] || 0,
            w[2] || 0.5
          ];
        }) : [];
        let p = 1 / 0, h = 1 / 0, f = -1 / 0, m = -1 / 0;
        for (const [g, w] of d)
          g < p && (p = g), w < h && (h = w), g > f && (f = g), w > m && (m = w);
        isFinite(p) || (p = parseFloat(l.x || "0"), h = parseFloat(l.y || "0"), f = p, m = h);
        const y = d.map(
          ([g, w, b]) => [g - p, w - h, b]
        );
        for (e.push({
          id: l.id || zt(10),
          type: "draw",
          x: p,
          y: h,
          w: f - p,
          h: m - h,
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
      const l = Qe(a);
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
      const l = Qe(a);
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
      const l = Qe(a);
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
          fontFamily: l.fontFamily || no,
          color: l.color || "#1e1e2e",
          align: l.align || "left",
          opacity: l.opacity ? parseFloat(l.opacity) : void 0
        }
      });
      continue;
    }
    if (a.startsWith("<!--@sticky")) {
      const l = Qe(a);
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
const cc = 180;
function Cr(t, e) {
  t.push(e), t.length > cc && t.shift();
}
function Je(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((n, s) => n - s), r = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[r];
}
class dc {
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
      Cr(this.frameMs, r);
    }
    this.lastTick = e, Cr(this.cullingMs, this.pendingCullingMs), Cr(this.hitTestMs, this.pendingHitTestMs), Cr(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
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
      frameMsP50: Je(this.frameMs, 0.5),
      frameMsP95: Je(this.frameMs, 0.95),
      cullingMsP50: Je(this.cullingMs, 0.5),
      cullingMsP95: Je(this.cullingMs, 0.95),
      hitTestMsP50: Je(this.hitTestMs, 0.5),
      hitTestMsP95: Je(this.hitTestMs, 0.95),
      edgeHitMsP50: Je(this.edgeHitMs, 0.5),
      edgeHitMsP95: Je(this.edgeHitMs, 0.95),
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
const he = new dc();
function So(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const hc = 14;
function ur(t, e, o, r, n) {
  const s = e.find((h) => h.id === o);
  if (!s) return null;
  const i = So(t, n), a = hc / r, l = e.filter((h) => h.direction === s.direction), c = l.indexOf(s);
  if (c < 0) return null;
  const d = t.y + i / (l.length + 1) * (c + 1), p = s.direction === "input" ? t.x - a : t.x + t.w + a;
  if (t.rotation) {
    const h = t.x + t.w / 2, f = t.y + i / 2, m = t.rotation * Math.PI / 180, y = Math.cos(m), g = Math.sin(m), w = p - h, b = d - f;
    return { x: h + w * y - b * g, y: f + w * g + b * y };
  }
  return { x: p, y: d };
}
function js(t, e, o, r, n, s, i, a) {
  const l = i - n, c = a - s;
  if (l === 0 && c === 0) return { x: n, y: s, side: "right" };
  let d = 1 / 0, p = n, h = s, f = "right";
  if (l !== 0) {
    const m = (t + o - n) / l;
    if (m > 0 && m < d) {
      const y = s + m * c;
      y >= e && y <= e + r && (d = m, p = t + o, h = y, f = "right");
    }
  }
  if (l !== 0) {
    const m = (t - n) / l;
    if (m > 0 && m < d) {
      const y = s + m * c;
      y >= e && y <= e + r && (d = m, p = t, h = y, f = "left");
    }
  }
  if (c !== 0) {
    const m = (e + r - s) / c;
    if (m > 0 && m < d) {
      const y = n + m * l;
      y >= t && y <= t + o && (d = m, p = y, h = e + r, f = "bottom");
    }
  }
  if (c !== 0) {
    const m = (e - s) / c;
    if (m > 0 && m < d) {
      const y = n + m * l;
      y >= t && y <= t + o && (d = m, p = y, h = e, f = "top");
    }
  }
  return { x: p, y: h, side: f };
}
function Be(t, e, o, r, n) {
  const s = Math.cos(n), i = Math.sin(n), a = t - o, l = e - r;
  return [o + a * s - l * i, r + a * i + l * s];
}
function Nn(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return js(t.x, t.y, t.w, e, n, s, o, r);
  const i = -t.rotation * Math.PI / 180, [a, l] = Be(o, r, n, s, i), c = js(t.x, t.y, t.w, e, n, s, a, l), [d, p] = Be(c.x, c.y, n, s, -i);
  return { x: d, y: p, side: c.side };
}
function ns(t, e, o, r) {
  return Math.abs(t) / o >= Math.abs(e) / r ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function uc(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, d] = t.rotation ? Be(o, r, n, s, l) : [o, r], p = c - n, h = d - s;
  if (p === 0 && h === 0)
    return { x: n + i, y: s, side: "right" };
  const f = 1 / Math.sqrt((p / i) ** 2 + (h / a) ** 2);
  let m = n + p * f, y = s + h * f;
  const g = ns(p, h, i, a);
  return t.rotation && ([m, y] = Be(m, y, n, s, -l)), { x: m, y, side: g };
}
function pc(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, d] = t.rotation ? Be(o, r, n, s, l) : [o, r], p = c - n, h = d - s;
  if (p === 0 && h === 0)
    return { x: n + i, y: s, side: "right" };
  const f = 1 / (Math.abs(p) / i + Math.abs(h) / a);
  let m = n + p * f, y = s + h * f;
  const g = ns(p, h, i, a);
  return t.rotation && ([m, y] = Be(m, y, n, s, -l)), { x: m, y, side: g };
}
function fc(t, e, o, r) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return Nn(t, e, o, r);
  const s = t.x + t.w / 2, i = t.y + e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [l, c] = t.rotation ? Be(o, r, s, i, a) : [o, r], d = l - s, p = c - i, h = Math.hypot(d, p);
  if (h === 0)
    return Nn(t, e, o, r);
  const f = d / h, m = p / h;
  let y = t.x + n[0][0], g = t.y + n[0][1], w = (y - s) * f + (g - i) * m;
  for (let A = 1; A < n.length; A++) {
    const F = t.x + n[A][0], D = t.y + n[A][1], P = (F - s) * f + (D - i) * m;
    P > w && (w = P, y = F, g = D);
  }
  const b = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let v = y + f * b, M = g + m * b;
  const C = ns(d, p, t.w / 2, e / 2);
  return t.rotation && ([v, M] = Be(v, M, s, i, -a)), { x: v, y: M, side: C };
}
function Vs(t, e, o) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return Nr(t, e, o);
  const n = t.x + t.w / 2, s = t.y + e / 2, i = Mo(o), a = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, l = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (g, w, b, v, M, C) => {
    const A = M - b, F = C - v, D = A * A + F * F;
    if (D === 0) return [b, v];
    const P = Math.max(0, Math.min(1, ((g - b) * A + (w - v) * F) / D));
    return [b + P * A, v + P * F];
  };
  let d = t.x + r[0][0], p = t.y + r[0][1], h = (d - a) ** 2 + (p - l) ** 2;
  if (r.length === 1)
    d = t.x + r[0][0], p = t.y + r[0][1];
  else
    for (let g = 0; g < r.length - 1; g++) {
      const w = t.x + r[g][0], b = t.y + r[g][1], v = t.x + r[g + 1][0], M = t.y + r[g + 1][1], [C, A] = c(a, l, w, b, v, M), F = (C - a) ** 2 + (A - l) ** 2;
      F < h && (h = F, d = C, p = A);
    }
  const f = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let m = d + i.dx * f, y = p + i.dy * f;
  if (t.rotation) {
    const g = t.rotation * Math.PI / 180;
    [m, y] = Be(m, y, n, s, g);
  }
  return { x: m, y };
}
function Hn(t, e, o, r) {
  var n;
  if (t.type === "draw")
    return fc(t, e, o, r);
  if (t.type === "shape") {
    const s = (n = t.data) == null ? void 0 : n.shape;
    if (s === "ellipse") return uc(t, e, o, r);
    if (s === "diamond") return pc(t, e, o, r);
  }
  return Nn(t, e, o, r);
}
function On(t, e, o, r) {
  const n = Hn(t, e, o, r);
  return { x: n.x, y: n.y };
}
function Nr(t, e, o) {
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
  const a = t.rotation * Math.PI / 180, [l, c] = Be(s, i, r, n, a);
  return { x: l, y: c };
}
function Mo(t) {
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
function qs(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Ye(t, e, o = "bezier", r, n, s, i, a, l, c) {
  const d = So(t, r), p = So(e, r), h = t.x + t.w / 2, f = t.y + d / 2, m = e.x + e.w / 2, y = e.y + p / 2;
  let g, w, b, v;
  if (l)
    g = l.x, w = l.y, b = n ?? "right";
  else if (n) {
    const D = t.type === "draw" ? Vs(t, d, n) : Nr(t, d, n);
    g = D.x, w = D.y, b = n;
  } else {
    const D = Hn(t, d, m, y);
    if (g = D.x, w = D.y, b = D.side, qs(t)) {
      const P = Math.hypot(m - h, y - f);
      P > 0 && (v = { dx: (m - h) / P, dy: (y - f) / P });
    }
  }
  let M, C, A, F;
  if (c)
    M = c.x, C = c.y, A = s ?? "left";
  else if (s) {
    const D = e.type === "draw" ? Vs(e, p, s) : Nr(e, p, s);
    M = D.x, C = D.y, A = s;
  } else {
    const D = Hn(e, p, h, f);
    if (M = D.x, C = D.y, A = D.side, qs(e)) {
      const P = Math.hypot(h - m, f - y);
      P > 0 && (F = { dx: (h - m) / P, dy: (f - y) / P });
    }
  }
  switch (o) {
    case "straight":
      return yc(g, w, M, C, b, A);
    case "bezier":
      return gc(g, w, M, C, b, A, a, v, F);
    case "smoothstep":
      return mc(g, w, M, C, b, A, i);
    case "step":
      return bc(g, w, M, C, b, A, i);
  }
}
function yc(t, e, o, r, n, s) {
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
function gc(t, e, o, r, n, s, i, a, l) {
  const c = Math.hypot(o - t, r - e), d = Math.min(c * 0.5, Math.max(50, c * 0.25)), p = a ?? Mo(n), h = l ?? Mo(s), f = i ? i[0] * (4 / 3) : 0, m = i ? i[1] * (4 / 3) : 0, y = t + p.dx * d + f, g = e + p.dy * d + m, w = o + h.dx * d + f, b = r + h.dy * d + m, v = 0.125 * t + 0.375 * y + 0.375 * w + 0.125 * o, M = 0.125 * e + 0.375 * g + 0.375 * b + 0.125 * r, C = Math.atan2(r - b, o - w), A = Math.atan2(e - g, t - y), F = {
    x: v,
    y: M,
    axis: "xy",
    min: 0,
    max: 0
  }, D = Math.min(t, o, y, w), P = Math.min(e, r, g, b), G = Math.max(t, o, y, w), st = Math.max(e, r, g, b);
  return {
    path: `M${t},${e} C${y},${g} ${w},${b} ${o},${r}`,
    labelX: v,
    labelY: M,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: C,
    tailAngle: A,
    sourceSide: n,
    targetSide: s,
    kinkHandle: F,
    bounds: { x: D, y: P, w: G - D, h: st - P }
  };
}
function mc(t, e, o, r, n, s, i) {
  const { points: c, kinkHandle: d } = ss(t, e, o, r, n, s, 20, i), p = xc(c, 8), h = Math.floor(c.length / 2), f = (c[h - 1][0] + c[h][0]) / 2, m = (c[h - 1][1] + c[h][1]) / 2, y = c[c.length - 1], g = c[c.length - 2], w = Math.atan2(y[1] - g[1], y[0] - g[0]), b = c[0], v = c[1], M = Math.atan2(b[1] - v[1], b[0] - v[0]);
  let C = 1 / 0, A = 1 / 0, F = -1 / 0, D = -1 / 0;
  for (const [P, G] of c)
    P < C && (C = P), G < A && (A = G), P > F && (F = P), G > D && (D = G);
  return {
    path: p,
    labelX: f,
    labelY: m,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: w,
    tailAngle: M,
    sourceSide: n,
    targetSide: s,
    kinkHandle: d,
    bounds: { x: C, y: A, w: F - C, h: D - A }
  };
}
function bc(t, e, o, r, n, s, i) {
  const { points: l, kinkHandle: c } = ss(t, e, o, r, n, s, 20, i), d = [`M${l[0][0]},${l[0][1]}`];
  for (let D = 1; D < l.length; D++)
    d.push(`L${l[D][0]},${l[D][1]}`);
  const p = Math.floor(l.length / 2), h = (l[p - 1][0] + l[p][0]) / 2, f = (l[p - 1][1] + l[p][1]) / 2, m = l[l.length - 1], y = l[l.length - 2], g = Math.atan2(m[1] - y[1], m[0] - y[0]), w = l[0], b = l[1], v = Math.atan2(w[1] - b[1], w[0] - b[0]);
  let M = 1 / 0, C = 1 / 0, A = -1 / 0, F = -1 / 0;
  for (const [D, P] of l)
    D < M && (M = D), P < C && (C = P), D > A && (A = D), P > F && (F = P);
  return {
    path: d.join(" "),
    labelX: h,
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
    bounds: { x: M, y: C, w: A - M, h: F - C }
  };
}
function ss(t, e, o, r, n, s, i, a) {
  const l = Mo(n), c = Mo(s), d = t + l.dx * i, p = e + l.dy * i, h = o + c.dx * i, f = r + c.dy * i, m = n === "left" || n === "right", y = s === "left" || s === "right", g = [[t, e], [d, p]], w = a ?? 0.5;
  let b;
  if (m && y) {
    const v = d + (h - d) * w;
    g.push([v, p], [v, f]);
    const M = Math.min(d, h), C = Math.max(d, h);
    b = { x: v, y: (p + f) / 2, axis: "x", min: M, max: C };
  } else if (!m && !y) {
    const v = p + (f - p) * w;
    g.push([d, v], [h, v]);
    const M = Math.min(p, f), C = Math.max(p, f);
    b = { x: (d + h) / 2, y: v, axis: "y", min: M, max: C };
  } else m && !y ? g.push([h, p]) : g.push([d, f]);
  return g.push([h, f], [o, r]), { points: g, kinkHandle: b };
}
function xc(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let n = 1; n < t.length - 1; n++) {
    const s = t[n - 1], i = t[n], a = t[n + 1], l = i[0] - s[0], c = i[1] - s[1], d = a[0] - i[0], p = a[1] - i[1], h = Math.hypot(l, c), f = Math.hypot(d, p);
    if (h === 0 || f === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const m = Math.min(e, h / 2, f / 2), y = i[0] - l / h * m, g = i[1] - c / h * m, w = i[0] + d / f * m, b = i[1] + p / f * m;
    o.push(`L${y},${g}`), o.push(`Q${i[0]},${i[1]} ${w},${b}`);
  }
  const r = t[t.length - 1];
  return o.push(`L${r[0]},${r[1]}`), o.join(" ");
}
function wc(t, e, o, r, n, s, i, a, l) {
  const c = 1 - l, d = c * c, p = d * c, h = l * l, f = h * l;
  return [
    p * t + 3 * d * l * o + 3 * c * h * n + f * i,
    p * e + 3 * d * l * r + 3 * c * h * s + f * a
  ];
}
function kc(t, e, o, r, n, s, i, a, l, c, d = 24) {
  let p = 1 / 0, h = o, f = r;
  for (let m = 1; m <= d; m++) {
    const y = m / d, [g, w] = wc(o, r, n, s, i, a, l, c, y), b = is(t, e, h, f, g, w);
    b < p && (p = b), h = g, f = w;
  }
  return p;
}
function vc(t, e, o) {
  let r = 1 / 0;
  for (let n = 1; n < o.length; n++) {
    const s = is(t, e, o[n - 1][0], o[n - 1][1], o[n][0], o[n][1]);
    s < r && (r = s);
  }
  return r;
}
function _i(t, e, o, r, n, s, i, a) {
  const l = n.data.edgeType || "bezier", c = Ye(
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
  ), { x1: d, y1: p, x2: h, y2: f } = c;
  if (l === "straight")
    return is(t, e, d, p, h, f);
  if (l === "bezier") {
    const g = Math.hypot(h - d, f - p), w = Math.min(g * 0.5, Math.max(50, g * 0.25)), b = Mo(c.sourceSide), v = Mo(c.targetSide), M = n.data.curveOffset ? n.data.curveOffset[0] * (4 / 3) : 0, C = n.data.curveOffset ? n.data.curveOffset[1] * (4 / 3) : 0, A = d + b.dx * w + M, F = p + b.dy * w + C, D = h + v.dx * w + M, P = f + v.dy * w + C;
    return kc(t, e, d, p, A, F, D, P, h, f);
  }
  const m = 20, { points: y } = ss(d, p, h, f, c.sourceSide, c.targetSide, m, n.data.midpointOffset);
  return vc(t, e, y);
}
function Ks(t, e, o) {
  const r = So(t, o), n = So(e, o), s = t.x + t.w / 2, i = t.y + r / 2, a = e.x + e.w / 2, l = e.y + n / 2, c = On(t, r, a, l), d = On(e, n, s, i);
  return { x1: c.x, y1: c.y, x2: d.x, y2: d.y };
}
function yn(t, e, o, r) {
  const n = So(t, r);
  return On(t, n, e, o);
}
function is(t, e, o, r, n, s) {
  const i = n - o, a = s - r, l = i * i + a * a;
  if (l === 0) return Math.hypot(t - o, e - r);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * a) / l)), d = o + c * i, p = r + c * a;
  return Math.hypot(t - d, e - p);
}
function qo(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, a = n, l = r / 2, c = t + n * l, d = e + s * l, p = t - n * l, h = e - s * l, f = r * 0.4;
  return `M${p + i * f},${h + a * f} L${c},${d} L${p - i * f},${h - a * f}`;
}
function Hr(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, a = n, l = r / 2, c = t + n * l, d = e + s * l, p = t - n * l, h = e - s * l, f = r * 0.4;
  return `M${c},${d} L${p + i * f},${h + a * f} L${p - i * f},${h - a * f} Z`;
}
function Uo(t, e) {
  const o = So(t, e);
  return ["top", "right", "bottom", "left"].map((n) => {
    const s = Nr(t, o, n);
    return { side: n, x: s.x, y: s.y };
  });
}
function Ir(t, e, o, r) {
  const n = Uo(t, r);
  let s = n[0], i = 1 / 0;
  for (const a of n) {
    const l = Math.hypot(a.x - e, a.y - o);
    l < i && (i = l, s = a);
  }
  return s.side;
}
function Sc(t, e, o, r, n, s) {
  const i = he.isEnabled(), a = i ? performance.now() : 0, l = 8 / r, c = [];
  for (const d of t.values()) {
    if (d.type !== "edge") continue;
    const p = d, h = t.get(p.data.fromId), f = t.get(p.data.toId);
    if (!h || !f) continue;
    const m = s == null ? void 0 : s(p, h, f);
    _i(e, o, h, f, p, n, m == null ? void 0 : m.sourcePortPos, m == null ? void 0 : m.targetPortPos) < l && c.push(d);
  }
  return i && he.recordEdgeHit(performance.now() - a), c;
}
function Mc(t, e, o, r, n, s) {
  const i = he.isEnabled(), a = i ? performance.now() : 0, l = 8 / r;
  let c = null, d = l;
  for (const p of t.values()) {
    if (p.type !== "edge") continue;
    const h = p, f = t.get(h.data.fromId), m = t.get(h.data.toId);
    if (!f || !m) continue;
    const y = s == null ? void 0 : s(h, f, m), g = _i(e, o, f, m, h, n, y == null ? void 0 : y.sourcePortPos, y == null ? void 0 : y.targetPortPos);
    g < d && (d = g, c = p);
  }
  return i && he.recordEdgeHit(performance.now() - a), c;
}
function Cc(t, e, o) {
  const r = t.x, n = t.x + t.w / 2, s = t.x + t.w, i = t.y, a = t.y + t.h / 2, l = t.y + t.h, c = [r, n, s], d = [i, a, l];
  let p = 1 / 0, h = 1 / 0;
  const f = [];
  for (const y of e) {
    const g = y.x, w = y.x + y.w / 2, b = y.x + y.w, v = y.y, M = y.y + y.h / 2, C = y.y + y.h, A = [g, w, b], F = [v, M, C];
    for (const D of c)
      for (const P of A) {
        const G = P - D;
        Math.abs(G) <= o && (Math.abs(G) < Math.abs(p) && (p = G), f.push({
          axis: "x",
          position: P,
          start: Math.min(t.y, t.y + t.h, y.y, y.y + y.h),
          end: Math.max(t.y, t.y + t.h, y.y, y.y + y.h)
        }));
      }
    for (const D of d)
      for (const P of F) {
        const G = P - D;
        Math.abs(G) <= o && (Math.abs(G) < Math.abs(h) && (h = G), f.push({
          axis: "y",
          position: P,
          start: Math.min(t.x, t.x + t.w, y.x, y.x + y.w),
          end: Math.max(t.x, t.x + t.w, y.x, y.x + y.w)
        }));
      }
  }
  const m = /* @__PURE__ */ new Map();
  for (const y of f) {
    const g = `${y.axis}:${y.position.toFixed(1)}`, w = m.get(g);
    w ? (w.start = Math.min(w.start, y.start), w.end = Math.max(w.end, y.end)) : m.set(g, { ...y });
  }
  return {
    guides: Array.from(m.values()),
    snapDx: Math.abs(p) <= o ? p : 0,
    snapDy: Math.abs(h) <= o ? h : 0
  };
}
class Ic {
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
    yt(this, "history", new Gl());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yt(this, "listeners", {});
    yt(this, "_suppressEvents", !1);
    yt(this, "_collabMode", !1);
    yt(this, "clipboard", []);
    yt(this, "pasteCount", 0);
    yt(this, "nextZValue", 1);
    yt(this, "_minZ", 0);
    yt(this, "quadTree", new Bn({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
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
    const o = this.resolveHeight(e), r = 40, n = e.x - r, s = e.y - r, i = e.w + r * 2, a = o + r * 2, l = this._containerWidth, c = this._containerHeight, d = Vo(Math.min(l / i, c / a), 0.1, 5);
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
        const h = p * 2, f = 1 - Math.pow(1 - h, 3);
        this.viewport.x = s.x + (a - s.x) * f, this.viewport.y = s.y + (l - s.y) * f, this.viewport.zoom = s.zoom + (i - s.zoom) * f;
      } else {
        const h = (p - 0.5) * 2, f = 1 - Math.pow(1 - h, 3);
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
   * Compute smart guide alignment + grid snap for a drag operation.
   * Sets `this.alignGuides` and emits `guides` event.
   * Returns the adjusted delta to apply.
   */
  computeDragSnap(e, o, r, n, s) {
    const i = this.snapToGrid && !s, a = this.smartGuides && !s;
    let l = r, c = n, d = [];
    const p = o instanceof Set ? o : new Set(o);
    if (a) {
      let h = 1 / 0, f = 1 / 0, m = -1 / 0, y = -1 / 0;
      for (const D of e) {
        const P = this.getNode(D.id);
        if (!P) continue;
        const G = D.x + r, st = D.y + n, H = this.resolveHeight(P);
        h = Math.min(h, G), f = Math.min(f, st), m = Math.max(m, G + P.w), y = Math.max(y, st + H);
      }
      const g = { x: h, y: f, w: m - h, h: y - f }, w = -this.viewport.x / this.viewport.zoom, b = -this.viewport.y / this.viewport.zoom, v = this._containerWidth / this.viewport.zoom, M = this._containerHeight / this.viewport.zoom, C = [], A = this.quadTree.retrieve([], { x: w, y: b, w: v, h: M });
      for (const D of A) {
        if (D.type === "edge" || p.has(D.id)) continue;
        const P = this.resolveHeight(D);
        C.push({ x: D.x, y: D.y, w: D.w, h: P });
      }
      const F = Cc(g, C, 5);
      if (d = F.guides, i) {
        const D = e[0].x + r, P = e[0].y + n, G = this.snap(D, P), st = G.x - D, H = G.y - P, ot = F.snapDx !== 0 && Math.abs(F.snapDx) <= Math.abs(st), J = F.snapDy !== 0 && Math.abs(F.snapDy) <= Math.abs(H);
        l = r + (ot ? F.snapDx : st), c = n + (J ? F.snapDy : H), ot || (d = d.filter((it) => it.axis !== "x")), J || (d = d.filter((it) => it.axis !== "y"));
      } else
        l = r + F.snapDx, c = n + F.snapDy;
    } else if (i) {
      const h = this.snap(e[0].x + r, e[0].y + n);
      l = h.x - e[0].x, c = h.y - e[0].y;
    }
    return this.alignGuides = d, this.emit("guides"), { finalDx: l, finalDy: c };
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
    this.viewport = $l(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, r) {
    this.viewport = _l(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const r = Vo(e, 0.1, 5);
    if (o) {
      const n = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = Ko(this.viewport, n, s);
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
    const n = r.h === "auto" ? 100 : r.h, s = r.x + r.w / 2, i = r.y + n / 2, a = this.getWindow(), l = a.innerWidth, c = a.innerHeight, d = Vo(o, 0.2, 5);
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
      const h = p.h === "auto" ? 100 : p.h;
      p.x < e && (e = p.x), p.y < o && (o = p.y), p.x + p.w > r && (r = p.x + p.w), p.y + h > n && (n = p.y + h);
    }
    const s = 50;
    e -= s, o -= s, r += s, n += s;
    const i = r - e, a = n - o, l = this._containerWidth, c = this._containerHeight, d = Vo(
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
    return Ko(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return Jl(this.viewport, e, o);
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
    var s, i, a, l, c, d, p, h, f;
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
      const m = r.w !== 0 ? n.w / r.w : 1, y = r.h === "auto" ? 0 : r.h, g = n.h === "auto" ? 0 : n.h, w = y !== 0 ? g / y : 1;
      this.emit("node:resize", n, m, w);
    }
    (r.rotation ?? 0) !== (n.rotation ?? 0) && ((d = (c = (l = this.registry) == null ? void 0 : l.get(n.type)) == null ? void 0 : c.onRotate) == null || d.call(c, n, n.rotation ?? 0, this), this.emit("node:rotate", n, n.rotation ?? 0)), o.data && r.data !== n.data && ((f = (h = (p = this.registry) == null ? void 0 : p.get(n.type)) == null ? void 0 : h.onDataChange) == null || f.call(h, n, r.data, n.data, this), this.emit("node:data", n, r.data, n.data), this.refreshSearchIfNeeded()), this.emit("change");
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
          const l = Ye(
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
          const h = d.fromId === e ? d.toId : d.fromId;
          (a = this.adjacency.get(h)) == null || a.delete(l);
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
        const h = this.resolveHeight(p);
        r.x >= p.x && r.y >= p.y && r.x + r.w <= p.x + p.w && r.y + n <= p.y + h || d.delete(o);
      }
      let s;
      this._containerTypes.has(r.type) && (s = this.getFrameDescendantIds(o));
      let i = null, a = 1 / 0;
      const l = this.quadTree.retrieve([], { x: r.x, y: r.y, w: r.w, h: n });
      for (const c of l) {
        if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
        const d = this.resolveHeight(c);
        if (r.x >= c.x && r.y >= c.y && r.x + r.w <= c.x + c.w && r.y + n <= c.y + d) {
          const h = c.w * d;
          h < a && (a = h, i = c);
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
    const n = he.isEnabled(), s = n ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), l = /* @__PURE__ */ new Map();
    for (const d of a) l.set(d.id, d);
    const c = Ul(l, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && he.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, r) {
    const n = he.isEnabled(), s = n ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), l = /* @__PURE__ */ new Map();
    for (const d of a) l.set(d.id, d);
    const c = Ql(l, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && he.recordHitTest(performance.now() - s), c;
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
              ([d, p, h]) => [d, l - p, h]
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
    for (const w of this.clipboard) {
      const b = w.h === "auto" ? 100 : w.h;
      w.x < r && (r = w.x), w.y < n && (n = w.y), w.x + w.w > s && (s = w.x + w.w), w.y + b > i && (i = w.y + b);
    }
    const a = (r + s) / 2, l = (n + i) / 2;
    let c, d;
    if (e !== void 0 && o !== void 0)
      c = e, d = o;
    else {
      const w = this.getWindow(), b = w.innerWidth / 2, v = w.innerHeight / 2, M = Ko(this.viewport, b, v);
      c = M.x, d = M.y;
    }
    const p = this.pasteCount * 20, h = c - a + p, f = d - l + p, m = /* @__PURE__ */ new Map(), y = this.clipboard.map((w) => {
      const b = zt();
      return m.set(w.id, b), {
        ...structuredClone(w),
        id: b,
        x: w.x + h,
        y: w.y + f,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const w of y)
      if (w.type === "edge" && w.data) {
        const b = w.data;
        m.has(b.fromId) && (b.fromId = m.get(b.fromId)), m.has(b.toId) && (b.toId = m.get(b.toId));
      }
    const g = /* @__PURE__ */ new Map();
    for (const w of y)
      w.groupId && (g.has(w.groupId) || g.set(w.groupId, zt(10)), w.groupId = g.get(w.groupId));
    for (const [w, b] of this.groupParent)
      g.has(w) && g.has(b) && this.linkGroupParent(g.get(w), g.get(b));
    this.addNodes(y), this.selectMultiple(y.map((w) => w.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, r) {
    const n = Yi.find((f) => f.id === e);
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
    const p = o - (a + c) / 2, h = r - (l + d) / 2;
    for (const f of s)
      f.type !== "edge" && (f.x += p, f.y += h), f.z = this.nextZValue++;
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
    return oc(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: r } = await lc(e);
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
class zc {
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
const Us = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Tc = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function Zr(t, e) {
  const o = Us.indexOf(t);
  if (o === -1) return "default";
  const r = (e % 360 + 360) % 360, n = Math.round(r / 45) % 8, s = (o + n) % 8;
  return Tc[Us[s]];
}
class Pc extends Sl {
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
function Zs({ markdown: t }) {
  return /* @__PURE__ */ u(
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
const Ac = 0, Ec = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function Rc(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function Lc({
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
  const c = dt(null), d = dt(l === !0), p = dt(!1), h = dt(!1), f = dt(!1), m = dt(!1), y = dt(t.data.blocks), [g, w] = $(!1), [b, v] = $(!1), M = dt(null), C = Il({ schema: n }), A = dt(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  bt(() => {
    const Y = A.current;
    if (!Y) return;
    A.current = null;
    const N = requestAnimationFrame(() => {
      try {
        C.replaceBlocks(C.document, Y);
        return;
      } catch {
      }
      try {
        const tt = C.blocksToHTMLLossy(Y);
        C._tiptapEditor.commands.setContent(tt);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), v(!0);
    });
    return () => cancelAnimationFrame(N);
  }, [C]), bt(() => {
    (!e || o) && w(!1);
  }, [e, o]), bt(() => {
    d.current && (d.current = !1, p.current = !0, w(!0));
  }, [C]), bt(() => {
    if (!g || !p.current && !M.current) return;
    const Y = M.current;
    M.current = null, p.current = !1;
    const N = requestAnimationFrame(() => {
      if (C.focus(), Y)
        try {
          const tt = C._tiptapEditor, q = tt.view.posAtCoords({ left: Y.x, top: Y.y });
          q && tt.commands.setTextSelection(q.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(N);
  }, [g, C]);
  const F = ct(() => {
    if (h.current || f.current) return;
    const Y = r.getNode(t.id), N = C.document;
    y.current = N, r.updateNode(t.id, {
      data: { ...Y == null ? void 0 : Y.data, blocks: N }
    });
  }, [C, r, t.id]);
  bt(() => {
    if (!C) return;
    const Y = () => {
      var _, Q;
      if (h.current || f.current || m.current) return;
      const K = C.document.length, q = r.getNode(t.id), j = ((Q = (_ = q == null ? void 0 : q.data) == null ? void 0 : _.blocks) == null ? void 0 : Q.length) ?? 0;
      if (K < j) return;
      const X = setTimeout(F, 100);
      return () => clearTimeout(X);
    };
    let N;
    const tt = C.onChange(() => {
      N == null || N(), N = Y();
    });
    return () => {
      tt == null || tt(), N == null || N();
    };
  }, [C, F]), bt(() => {
    const Y = c.current;
    if (!Y) return;
    const N = (tt) => {
      const K = tt.relatedTarget;
      K && Y.contains(K) || F();
    };
    return Y.addEventListener("focusout", N), () => Y.removeEventListener("focusout", N);
  }, [F]), bt(() => {
    if (g || t.data.blocks === y.current) return;
    const Y = JSON.stringify(t.data.blocks), N = JSON.stringify(y.current);
    if (Y !== N) {
      if (t.data.blocks.length > 0 && C.document.length > 0) {
        m.current = !0;
        try {
          C.replaceBlocks(C.document, t.data.blocks);
        } catch {
          try {
            const tt = C.blocksToHTMLLossy(t.data.blocks);
            C._tiptapEditor.commands.setContent(tt);
          } catch {
          }
        }
        m.current = !1;
      }
      y.current = t.data.blocks;
    }
  }, [t.data.blocks, g, C]), bt(() => {
    if (t.h !== "auto" || !a) return;
    const Y = c.current;
    if (!Y) return;
    const N = () => {
      const K = Y.offsetHeight;
      K > 0 && a(t.id, K);
    };
    N();
    const tt = new ResizeObserver(N);
    return tt.observe(Y), () => tt.disconnect();
  }, [t.id, t.h, a]);
  const D = ct(() => {
    const Y = r.getNode(t.id);
    if (!Y || Y.h === "auto" || !C || !c.current)
      return;
    const N = Y.h - Ac, tt = c.current.querySelector(".bn-editor");
    if (!tt) return;
    const K = C.document;
    if (K.length === 0) return;
    let q = 0;
    for (let Q = K.length - 1; Q >= 1 && Rc(K[Q]); Q--)
      q++;
    const j = tt.scrollHeight, X = K.length > 0 ? j / K.length : 36;
    if (h.current = !0, j < N) {
      const Q = N - j, lt = Math.max(0, Math.floor(Q / X));
      if (lt > 0) {
        const ht = K[K.length - 1];
        C.insertBlocks(
          Array.from({ length: lt }, () => ({
            type: "paragraph",
            content: []
          })),
          ht,
          "after"
        );
      }
    } else if (j > N && q > 0) {
      const Q = j - N, lt = Math.min(q, Math.ceil(Q / X));
      if (lt > 0) {
        const ht = K.slice(K.length - lt);
        C.removeBlocks(ht);
      }
    }
    const _ = r.getNode(t.id);
    _ && r.updateNode(t.id, {
      data: { ..._.data, blocks: C.document }
    }), h.current = !1;
  }, [C, r, t.id]), P = dt(D);
  P.current = D, bt(() => {
    if (t.h === "auto") return;
    const Y = setTimeout(() => P.current(), 60);
    return () => clearTimeout(Y);
  }, []);
  const G = ct(
    (Y) => {
      const N = Y.currentTarget.ownerDocument;
      if (Y.altKey) return;
      if (!r.selection.has(t.id) && r.selection.size > 0) {
        const { x: xt, y: ft } = r.screenToCanvas(Y.clientX, Y.clientY);
        for (const Lt of r.selection) {
          const rt = r.getNode(Lt);
          if (!rt) continue;
          const Et = rt.h === "auto" ? 100 : rt.h;
          if (xt >= rt.x && xt <= rt.x + rt.w && ft >= rt.y && ft <= rt.y + Et)
            return;
        }
      }
      Y.stopPropagation(), Y.preventDefault(), Y.currentTarget.setPointerCapture(Y.pointerId), Y.shiftKey ? r.toggleSelect(t.id) : r.selection.has(t.id) || r.select(t.id);
      const tt = Y.clientX, K = Y.clientY, q = Array.from(r.selection), j = q.map((xt) => {
        const ft = r.getNode(xt);
        return { id: xt, x: ft.x, y: ft.y };
      });
      let X = !1, _ = null, Q = tt, lt = K, ht = !1;
      const St = () => {
        _ = null;
        const xt = (Q - tt) / r.viewport.zoom, ft = (lt - K) / r.viewport.zoom, { finalDx: Lt, finalDy: rt } = r.computeDragSnap(
          j,
          q,
          xt,
          ft,
          ht
        ), Et = j.map((Kt) => ({
          id: Kt.id,
          patch: { x: Kt.x + Lt, y: Kt.y + rt }
        }));
        r.updateMany(Et);
      }, vt = (xt) => {
        const ft = (xt.clientX - tt) / r.viewport.zoom, Lt = (xt.clientY - K) / r.viewport.zoom;
        if (!X)
          if (Math.abs(ft) > 2 || Math.abs(Lt) > 2)
            X = !0, f.current = !0, r.pushHistorySnapshot();
          else
            return;
        Q = xt.clientX, lt = xt.clientY, ht = xt.metaKey || xt.ctrlKey, _ === null && (_ = requestAnimationFrame(St));
      }, Mt = () => {
        f.current = !1, _ !== null && (cancelAnimationFrame(_), St()), r.clearAlignGuides(), N.removeEventListener("pointermove", vt), N.removeEventListener("pointerup", Mt);
      };
      N.addEventListener("pointermove", vt), N.addEventListener("pointerup", Mt);
    },
    [r, t.id]
  ), st = ct(
    (Y) => {
      var St;
      const N = Y.currentTarget.ownerDocument;
      Y.stopPropagation(), Y.preventDefault();
      const tt = t.h === "auto" ? (((St = c.current) == null ? void 0 : St.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h, K = t.x + t.w / 2, q = t.y + tt / 2, j = t.rotation || 0, { x: X, y: _ } = r.screenToCanvas(
        Y.clientX,
        Y.clientY
      ), Q = Math.atan2(_ - q, X - K);
      r.pushHistorySnapshot();
      const lt = (vt) => {
        const { x: Mt, y: xt } = r.screenToCanvas(vt.clientX, vt.clientY), ft = Math.atan2(xt - q, Mt - K);
        let Lt = j + (ft - Q) * (180 / Math.PI);
        (vt.shiftKey || r.snapToGrid) && !(vt.metaKey || vt.ctrlKey) && (Lt = Math.round(Lt / 15) * 15), r.updateNode(t.id, { rotation: Lt });
      }, ht = () => {
        N.removeEventListener("pointermove", lt), N.removeEventListener("pointerup", ht);
      };
      N.addEventListener("pointermove", lt), N.addEventListener("pointerup", ht);
    },
    [r, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), H = ct(
    (Y, N) => {
      var St;
      const tt = N.currentTarget.ownerDocument;
      N.stopPropagation(), N.preventDefault();
      const K = N.clientX, q = N.clientY, j = t.x, X = t.y, _ = t.w, Q = t.h === "auto" ? (((St = c.current) == null ? void 0 : St.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h;
      r.pushHistorySnapshot();
      const lt = (vt) => {
        const Mt = (vt.clientX - K) / r.viewport.zoom, xt = (vt.clientY - q) / r.viewport.zoom;
        let ft = j, Lt = X, rt = _, Et = Q;
        if ((Y === "nw" || Y === "w" || Y === "sw") && (ft = j + Mt, rt = _ - Mt), (Y === "ne" || Y === "e" || Y === "se") && (rt = _ + Mt), (Y === "nw" || Y === "n" || Y === "ne") && (Lt = X + xt, Et = Q - xt), (Y === "sw" || Y === "s" || Y === "se") && (Et = Q + xt), r.snapToGrid && !(vt.metaKey || vt.ctrlKey)) {
          const Kt = r.gridSize, Ut = (oe) => Math.round(oe / Kt) * Kt;
          (Y === "nw" || Y === "w" || Y === "sw") && (ft = Ut(ft), rt = j + _ - ft), (Y === "ne" || Y === "e" || Y === "se") && (rt = Ut(ft + rt) - ft), (Y === "nw" || Y === "n" || Y === "ne") && (Lt = Ut(Lt), Et = X + Q - Lt), (Y === "sw" || Y === "s" || Y === "se") && (Et = Ut(Lt + Et) - Lt);
        }
        rt < 100 && (rt = 100, (Y === "nw" || Y === "w" || Y === "sw") && (ft = j + _ - 100)), Et < 60 && (Et = 60, (Y === "nw" || Y === "n" || Y === "ne") && (Lt = X + Q - 60)), r.updateNode(t.id, { x: ft, y: Lt, w: rt, h: Et });
      }, ht = () => {
        tt.removeEventListener("pointermove", lt), tt.removeEventListener("pointerup", ht), requestAnimationFrame(() => P.current());
      };
      tt.addEventListener("pointermove", lt), tt.addEventListener("pointerup", ht);
    },
    [r, t.id, t.x, t.y, t.w, t.h]
  ), ot = ct(
    (Y) => {
      if (!Y.altKey) {
        if (g) {
          Y.stopPropagation();
          return;
        }
        if (e) {
          G(Y);
          return;
        }
        G(Y);
      }
    },
    [g, e, G, r, t.id]
  ), J = ct(
    (Y) => {
      if (Y.stopPropagation(), !g) {
        if (t.groupId) {
          const N = [];
          let tt = t.groupId;
          for (; tt; )
            N.push(tt), tt = r.groupParent.get(tt);
          if (!r.activeGroupId) {
            r.enterGroup(N[N.length - 1]), r.select(t.id);
            return;
          }
          const K = N.indexOf(r.activeGroupId);
          if (K > 0) {
            r.enterGroup(N[K - 1]), r.select(t.id);
            return;
          }
        }
        r.select(t.id), M.current = { x: Y.clientX, y: Y.clientY }, w(!0);
      }
    },
    [g, r, t.id, t.groupId, C]
  ), it = e && !o;
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
        /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(
              "div",
              {
                className: "sb-editor-wrap",
                onPointerDown: ot,
                onKeyDown: g ? (Y) => {
                  Y.key === "Escape" && (Y.stopPropagation(), w(!1));
                } : void 0,
                style: g ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: b ? /* @__PURE__ */ u(Zs, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ u(Pc, { fallback: /* @__PURE__ */ u(Zs, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ u(
                  zl,
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
        it && Ec.map(({ pos: Y, top: N, left: tt }) => {
          const K = 8 / i;
          return /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: (q) => H(Y, q),
              style: {
                position: "absolute",
                top: N,
                left: tt,
                width: K,
                height: K,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: Zr(Y, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            Y
          );
        }),
        it && (() => {
          const Y = 25 / i, N = 10 / i;
          return /* @__PURE__ */ k(gt, { children: [
            /* @__PURE__ */ u(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -Y,
                  left: "50%",
                  width: 1.5 / i,
                  height: Y,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ u(
              "div",
              {
                onPointerDown: st,
                style: {
                  position: "absolute",
                  top: -(Y + N / 2),
                  left: "50%",
                  width: N,
                  height: N,
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
const ta = be(Lc);
function Dc(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    ta,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: es,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const Wc = {
  type: "content",
  component: Dc,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: Bc } = Math, pr = Bc + 1e-4, Qs = 0.5, Js = [1, 1];
function $s(t, e, o, r = (n) => n) {
  return t * r(0.5 - e * (0.5 - o));
}
const { min: gn } = Math;
function ea(t, e, o) {
  let r = gn(1, e / o);
  return gn(1, t + (gn(1, 1 - r) - t) * (r * 0.275));
}
function Fc(t) {
  return [-t[0], -t[1]];
}
function Fe(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function _s(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function ro(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function Xn(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function oo(t, e) {
  return [t[0] * e, t[1] * e];
}
function mn(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function Nc(t, e) {
  return [t[0] / e, t[1] / e];
}
function oa(t) {
  return [t[1], -t[0]];
}
function bn(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function ti(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function Hc(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Oc(t) {
  return Math.hypot(t[0], t[1]);
}
function ei(t, e) {
  let o = t[0] - e[0], r = t[1] - e[1];
  return o * o + r * r;
}
function ra(t) {
  return Nc(t, Oc(t));
}
function Xc(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function as(t, e, o) {
  let r = Math.sin(o), n = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], a = s * n - i * r, l = s * r + i * n;
  return [a + e[0], l + e[1]];
}
function oi(t, e, o, r) {
  let n = Math.sin(r), s = Math.cos(r), i = e[0] - o[0], a = e[1] - o[1], l = i * s - a * n, c = i * n + a * s;
  return t[0] = l + o[0], t[1] = c + o[1], t;
}
function ri(t, e, o) {
  return Fe(t, oo(ro(e, t), o));
}
function Gc(t, e, o, r) {
  let n = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + n * r, t[1] = e[1] + s * r, t;
}
function na(t, e, o) {
  return Fe(t, oo(e, o));
}
const de = [0, 0], $e = [0, 0], _e = [0, 0];
function Yc(t, e) {
  let o = na(t, ra(oa(ro(t, Fe(t, [1, 1])))), -e), r = [], n = 1 / 13;
  for (let s = n; s <= 1; s += n) r.push(as(o, t, pr * 2 * s));
  return r;
}
function jc(t, e, o) {
  let r = [], n = 1 / o;
  for (let s = n; s <= 1; s += n) r.push(as(e, t, pr * s));
  return r;
}
function Vc(t, e, o) {
  let r = ro(e, o), n = oo(r, 0.5), s = oo(r, 0.51);
  return [ro(t, n), ro(t, s), Fe(t, s), Fe(t, n)];
}
function qc(t, e, o, r) {
  let n = [], s = na(t, e, o), i = 1 / r;
  for (let a = i; a < 1; a += i) n.push(as(s, t, pr * 3 * a));
  return n;
}
function Kc(t, e, o) {
  return [Fe(t, oo(e, o)), Fe(t, oo(e, o * 0.99)), ro(t, oo(e, o * 0.99)), ro(t, oo(e, o))];
}
function ni(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function Uc(t, e, o) {
  return t.slice(0, 10).reduce((r, n) => {
    let s = n.pressure;
    return e && (s = ea(r, n.distance, o)), (r + s) / 2;
  }, t[0].pressure);
}
function Zc(t, e = {}) {
  let { size: o = 16, smoothing: r = 0.5, thinning: n = 0.5, simulatePressure: s = !0, easing: i = (N) => N, start: a = {}, end: l = {}, last: c = !1 } = e, { cap: d = !0, easing: p = (N) => N * (2 - N) } = a, { cap: h = !0, easing: f = (N) => --N * N * N + 1 } = l;
  if (t.length === 0 || o <= 0) return [];
  let m = t[t.length - 1].runningLength, y = ni(a.taper, o, m), g = ni(l.taper, o, m), w = (o * r) ** 2, b = [], v = [], M = Uc(t, s, o), C = $s(o, n, t[t.length - 1].pressure, i), A, F = t[0].vector, D = t[0].point, P = D, G = D, st = P, H = !1;
  for (let N = 0; N < t.length; N++) {
    let { pressure: tt } = t[N], { point: K, vector: q, distance: j, runningLength: X } = t[N], _ = N === t.length - 1;
    if (!_ && m - X < 3) continue;
    n ? (s && (tt = ea(M, j, o)), C = $s(o, n, tt, i)) : C = o / 2, A === void 0 && (A = C);
    let Q = X < y ? p(X / y) : 1, lt = m - X < g ? f((m - X) / g) : 1;
    C = Math.max(0.01, C * Math.min(Q, lt));
    let ht = (_ ? t[N] : t[N + 1]).vector, St = _ ? 1 : ti(q, ht), vt = ti(q, F) < 0 && !H, Mt = St !== null && St < 0;
    if (vt || Mt) {
      bn(de, F), mn(de, de, C);
      for (let xt = 0; xt <= 1; xt += 0.07692307692307693) Xn($e, K, de), oi($e, $e, K, pr * xt), G = [$e[0], $e[1]], b.push(G), _s(_e, K, de), oi(_e, _e, K, pr * -xt), st = [_e[0], _e[1]], v.push(st);
      D = G, P = st, Mt && (H = !0);
      continue;
    }
    if (H = !1, _) {
      bn(de, q), mn(de, de, C), b.push(ro(K, de)), v.push(Fe(K, de));
      continue;
    }
    Gc(de, ht, q, St), bn(de, de), mn(de, de, C), Xn($e, K, de), G = [$e[0], $e[1]], (N <= 1 || ei(D, G) > w) && (b.push(G), D = G), _s(_e, K, de), st = [_e[0], _e[1]], (N <= 1 || ei(P, st) > w) && (v.push(st), P = st), M = tt, F = q;
  }
  let ot = [t[0].point[0], t[0].point[1]], J = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : Fe(t[0].point, [1, 1]), it = [], Y = [];
  if (t.length === 1) {
    if (!(y || g) || c) return Yc(ot, A || C);
  } else {
    y || g && t.length === 1 || (d ? it.push(...jc(ot, v[0], 13)) : it.push(...Vc(ot, b[0], v[0])));
    let N = oa(Fc(t[t.length - 1].vector));
    g || y && t.length === 1 ? Y.push(J) : h ? Y.push(...qc(J, N, C, 29)) : Y.push(...Kc(J, N, C));
  }
  return b.concat(Y, v.reverse(), it);
}
const si = [0, 0];
function ii(t) {
  return t != null && t >= 0;
}
function Qc(t, e = {}) {
  var h;
  let { streamline: o = 0.5, size: r = 16, last: n = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: f, y: m, pressure: y = Qs }) => [f, m, y]);
  if (i.length === 2) {
    let f = i[1];
    i = i.slice(0, -1);
    for (let m = 1; m < 5; m++) i.push(ri(i[0], f, m / 4));
  }
  i.length === 1 && (i = [...i, [...Fe(i[0], Js), ...i[0].slice(2)]]);
  let a = [{ point: [i[0][0], i[0][1]], pressure: ii(i[0][2]) ? i[0][2] : 0.25, vector: [...Js], distance: 0, runningLength: 0 }], l = !1, c = 0, d = a[0], p = i.length - 1;
  for (let f = 1; f < i.length; f++) {
    let m = n && f === p ? [i[f][0], i[f][1]] : ri(d.point, i[f], s);
    if (Hc(d.point, m)) continue;
    let y = Xc(m, d.point);
    if (c += y, f < p && !l) {
      if (c < r) continue;
      l = !0;
    }
    Xn(si, d.point, m), d = { point: m, pressure: ii(i[f][2]) ? i[f][2] : Qs, vector: ra(si), distance: y, runningLength: c }, a.push(d);
  }
  return a[0].vector = ((h = a[1]) == null ? void 0 : h.vector) || [0, 0], a;
}
function Jc(t, e = {}) {
  return Zc(Qc(t, e), e);
}
var $c = Jc;
function ls(t, e = {}) {
  const o = $c(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return _c(o);
}
function _c(t) {
  if (!t.length) return "";
  const e = [], [o, r] = t[0];
  e.push("M", o, r);
  for (let n = 0; n < t.length; n++) {
    const [s, i] = t[n], [a, l] = t[(n + 1) % t.length];
    e.push("Q", s, i, (s + a) / 2, (i + l) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function sa(t, e = 0.5) {
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
function td(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = sa(t, e), r = o.length, n = [];
  n.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < r; s++) {
    const [i, a] = o[s], [l, c] = o[(s + 1) % r];
    n.push("Q", i, a, (i + l) / 2, (a + c) / 2);
  }
  return n.push("Z"), n.join(" ");
}
function ed(t, e, o, r) {
  const n = e[0] - t[0], s = e[1] - t[1], i = r[0] - o[0], a = r[1] - o[1], l = n * a - s * i;
  if (Math.abs(l) < 1e-10) return null;
  const c = ((o[0] - t[0]) * a - (o[1] - t[1]) * i) / l, d = ((o[0] - t[0]) * s - (o[1] - t[1]) * n) / l;
  return c <= 0 || c >= 1 || d <= 0 || d >= 1 ? null : [t[0] + c * n, t[1] + c * s];
}
function od(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function ai(t) {
  let e = 0;
  for (let o = 0, r = t.length - 1; o < t.length; r = o++)
    e += (t[r][0] + t[o][0]) * (t[r][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function rd(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let a = i + 2; a < e - 1; a++) {
      const l = ed(
        t[i],
        t[i + 1],
        t[a],
        t[a + 1]
      );
      if (!l) continue;
      const c = [l];
      for (let d = i + 1; d <= a; d++)
        c.push(t[d]);
      ai(c) < 100 || o.push({
        pathD: od(c),
        points: c.map((d) => [d[0], d[1]])
      });
    }
  if (o.length === 0) return [];
  const r = o.map((i) => ai(i.points)), s = Math.max(...r) * 0.05;
  return o.filter((i, a) => r[a] >= s);
}
function xn(t, e, o) {
  if (t && t.length) {
    const [r, n] = e, s = Math.PI / 180 * o, i = Math.cos(s), a = Math.sin(s);
    for (const l of t) {
      const [c, d] = l;
      l[0] = (c - r) * i - (d - n) * a + r, l[1] = (c - r) * a + (d - n) * i + n;
    }
  }
}
function nd(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function sd(t, e, o, r = 1) {
  const n = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, a = [0, 0];
  if (n) for (const c of i) xn(c, a, n);
  const l = function(c, d, p) {
    const h = [];
    for (const b of c) {
      const v = [...b];
      nd(v[0], v[v.length - 1]) || v.push([v[0][0], v[0][1]]), v.length > 2 && h.push(v);
    }
    const f = [];
    d = Math.max(d, 0.1);
    const m = [];
    for (const b of h) for (let v = 0; v < b.length - 1; v++) {
      const M = b[v], C = b[v + 1];
      if (M[1] !== C[1]) {
        const A = Math.min(M[1], C[1]);
        m.push({ ymin: A, ymax: Math.max(M[1], C[1]), x: A === M[1] ? M[0] : C[0], islope: (C[0] - M[0]) / (C[1] - M[1]) });
      }
    }
    if (m.sort((b, v) => b.ymin < v.ymin ? -1 : b.ymin > v.ymin ? 1 : b.x < v.x ? -1 : b.x > v.x ? 1 : b.ymax === v.ymax ? 0 : (b.ymax - v.ymax) / Math.abs(b.ymax - v.ymax)), !m.length) return f;
    let y = [], g = m[0].ymin, w = 0;
    for (; y.length || m.length; ) {
      if (m.length) {
        let b = -1;
        for (let v = 0; v < m.length && !(m[v].ymin > g); v++) b = v;
        m.splice(0, b + 1).forEach((v) => {
          y.push({ s: g, edge: v });
        });
      }
      if (y = y.filter((b) => !(b.edge.ymax <= g)), y.sort((b, v) => b.edge.x === v.edge.x ? 0 : (b.edge.x - v.edge.x) / Math.abs(b.edge.x - v.edge.x)), (p !== 1 || w % d == 0) && y.length > 1) for (let b = 0; b < y.length; b += 2) {
        const v = b + 1;
        if (v >= y.length) break;
        const M = y[b].edge, C = y[v].edge;
        f.push([[Math.round(M.x), g], [Math.round(C.x), g]]);
      }
      g += p, y.forEach((b) => {
        b.edge.x = b.edge.x + p * b.edge.islope;
      }), w++;
    }
    return f;
  }(i, s, r);
  if (n) {
    for (const c of i) xn(c, a, -n);
    (function(c, d, p) {
      const h = [];
      c.forEach((f) => h.push(...f)), xn(h, d, p);
    })(l, a, -n);
  }
  return l;
}
function gr(t, e) {
  var o;
  const r = e.hachureAngle + 90;
  let n = e.hachureGap;
  n < 0 && (n = 4 * e.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = n), sd(t, n, r, s || 1);
}
class cs {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const r = gr(e, o);
    return { type: "fillSketch", ops: this.renderLines(r, o) };
  }
  renderLines(e, o) {
    const r = [];
    for (const n of e) r.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], o));
    return r;
  }
}
function Qr(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class id extends cs {
  fillPolygons(e, o) {
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    const n = gr(e, Object.assign({}, o, { hachureGap: r })), s = Math.PI / 180 * o.hachureAngle, i = [], a = 0.5 * r * Math.cos(s), l = 0.5 * r * Math.sin(s);
    for (const [c, d] of n) Qr([c, d]) && i.push([[c[0] - a, c[1] + l], [...d]], [[c[0] + a, c[1] - l], [...d]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class ad extends cs {
  fillPolygons(e, o) {
    const r = this._fillPolygons(e, o), n = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, n);
    return r.ops = r.ops.concat(s.ops), r;
  }
}
class ld {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = gr(e, o = Object.assign({}, o, { hachureAngle: 0 }));
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
      const l = Qr(a), c = l / n, d = Math.ceil(c) - 1, p = l - d * n, h = (a[0][0] + a[1][0]) / 2 - n / 4, f = Math.min(a[0][1], a[1][1]);
      for (let m = 0; m < d; m++) {
        const y = f + p + m * n, g = h - i + 2 * Math.random() * i, w = y - i + 2 * Math.random() * i, b = this.helper.ellipse(g, w, s, s, o);
        r.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: r };
  }
}
class cd {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = gr(e, o);
    return { type: "fillSketch", ops: this.dashedLine(r, o) };
  }
  dashedLine(e, o) {
    const r = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, n = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const a = Qr(i), l = Math.floor(a / (r + n)), c = (a + n - l * (r + n)) / 2;
      let d = i[0], p = i[1];
      d[0] > p[0] && (d = i[1], p = i[0]);
      const h = Math.atan((p[1] - d[1]) / (p[0] - d[0]));
      for (let f = 0; f < l; f++) {
        const m = f * (r + n), y = m + r, g = [d[0] + m * Math.cos(h) + c * Math.cos(h), d[1] + m * Math.sin(h) + c * Math.sin(h)], w = [d[0] + y * Math.cos(h) + c * Math.cos(h), d[1] + y * Math.sin(h) + c * Math.sin(h)];
        s.push(...this.helper.doubleLineOps(g[0], g[1], w[0], w[1], o));
      }
    }), s;
  }
}
class dd {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, n = o.zigzagOffset < 0 ? r : o.zigzagOffset, s = gr(e, o = Object.assign({}, o, { hachureGap: r + n }));
    return { type: "fillSketch", ops: this.zigzagLines(s, n, o) };
  }
  zigzagLines(e, o, r) {
    const n = [];
    return e.forEach((s) => {
      const i = Qr(s), a = Math.round(i / (2 * o));
      let l = s[0], c = s[1];
      l[0] > c[0] && (l = s[1], c = s[0]);
      const d = Math.atan((c[1] - l[1]) / (c[0] - l[0]));
      for (let p = 0; p < a; p++) {
        const h = 2 * p * o, f = 2 * (p + 1) * o, m = Math.sqrt(2 * Math.pow(o, 2)), y = [l[0] + h * Math.cos(d), l[1] + h * Math.sin(d)], g = [l[0] + f * Math.cos(d), l[1] + f * Math.sin(d)], w = [y[0] + m * Math.cos(d + Math.PI / 4), y[1] + m * Math.sin(d + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(y[0], y[1], w[0], w[1], r), ...this.helper.doubleLineOps(w[0], w[1], g[0], g[1], r));
      }
    }), n;
  }
}
const ge = {};
class hd {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const ud = 0, wn = 1, li = 2, zr = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function kn(t, e) {
  return t.type === e;
}
function ds(t) {
  const e = [], o = function(i) {
    const a = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) a[a.length] = { type: ud, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      a[a.length] = { type: wn, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return a[a.length] = { type: li, text: "" }, a;
  }(t);
  let r = "BOD", n = 0, s = o[n];
  for (; !kn(s, li); ) {
    let i = 0;
    const a = [];
    if (r === "BOD") {
      if (s.text !== "M" && s.text !== "m") return ds("M0,0" + t);
      n++, i = zr[s.text], r = s.text;
    } else kn(s, wn) ? i = zr[r] : (n++, i = zr[s.text], r = s.text);
    if (!(n + i < o.length)) throw new Error("Path data ended short");
    for (let l = n; l < n + i; l++) {
      const c = o[l];
      if (!kn(c, wn)) throw new Error("Param not a number: " + r + "," + c.text);
      a[a.length] = +c.text;
    }
    if (typeof zr[r] != "number") throw new Error("Bad segment: " + r);
    {
      const l = { key: r, data: a };
      e.push(l), n += i, s = o[n], r === "M" && (r = "L"), r === "m" && (r = "l");
    }
  }
  return e;
}
function ia(t) {
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
function aa(t) {
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
        let p = 0, h = 0;
        o === "C" || o === "S" ? (p = r + (r - a), h = n + (n - l)) : (p = r, h = n), e.push({ key: "C", data: [p, h, ...d] }), a = d[0], l = d[1], r = d[2], n = d[3];
        break;
      }
      case "T": {
        const [p, h] = d;
        let f = 0, m = 0;
        o === "Q" || o === "T" ? (f = r + (r - a), m = n + (n - l)) : (f = r, m = n);
        const y = r + 2 * (f - r) / 3, g = n + 2 * (m - n) / 3, w = p + 2 * (f - p) / 3, b = h + 2 * (m - h) / 3;
        e.push({ key: "C", data: [y, g, w, b, p, h] }), a = f, l = m, r = p, n = h;
        break;
      }
      case "Q": {
        const [p, h, f, m] = d, y = r + 2 * (p - r) / 3, g = n + 2 * (h - n) / 3, w = f + 2 * (p - f) / 3, b = m + 2 * (h - m) / 3;
        e.push({ key: "C", data: [y, g, w, b, f, m] }), a = p, l = h, r = f, n = m;
        break;
      }
      case "A": {
        const p = Math.abs(d[0]), h = Math.abs(d[1]), f = d[2], m = d[3], y = d[4], g = d[5], w = d[6];
        p === 0 || h === 0 ? (e.push({ key: "C", data: [r, n, g, w, g, w] }), r = g, n = w) : (r !== g || n !== w) && (la(r, n, g, w, p, h, f, m, y).forEach(function(b) {
          e.push({ key: "C", data: b });
        }), r = g, n = w);
        break;
      }
      case "Z":
        e.push({ key: "Z", data: [] }), r = s, n = i;
    }
    o = c;
  }
  return e;
}
function ar(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function la(t, e, o, r, n, s, i, a, l, c) {
  const d = (p = i, Math.PI * p / 180);
  var p;
  let h = [], f = 0, m = 0, y = 0, g = 0;
  if (c) [f, m, y, g] = c;
  else {
    [t, e] = ar(t, e, -d), [o, r] = ar(o, r, -d);
    const ot = (t - o) / 2, J = (e - r) / 2;
    let it = ot * ot / (n * n) + J * J / (s * s);
    it > 1 && (it = Math.sqrt(it), n *= it, s *= it);
    const Y = n * n, N = s * s, tt = Y * N - Y * J * J - N * ot * ot, K = Y * J * J + N * ot * ot, q = (a === l ? -1 : 1) * Math.sqrt(Math.abs(tt / K));
    y = q * n * J / s + (t + o) / 2, g = q * -s * ot / n + (e + r) / 2, f = Math.asin(parseFloat(((e - g) / s).toFixed(9))), m = Math.asin(parseFloat(((r - g) / s).toFixed(9))), t < y && (f = Math.PI - f), o < y && (m = Math.PI - m), f < 0 && (f = 2 * Math.PI + f), m < 0 && (m = 2 * Math.PI + m), l && f > m && (f -= 2 * Math.PI), !l && m > f && (m -= 2 * Math.PI);
  }
  let w = m - f;
  if (Math.abs(w) > 120 * Math.PI / 180) {
    const ot = m, J = o, it = r;
    m = l && m > f ? f + 120 * Math.PI / 180 * 1 : f + 120 * Math.PI / 180 * -1, h = la(o = y + n * Math.cos(m), r = g + s * Math.sin(m), J, it, n, s, i, 0, l, [m, ot, y, g]);
  }
  w = m - f;
  const b = Math.cos(f), v = Math.sin(f), M = Math.cos(m), C = Math.sin(m), A = Math.tan(w / 4), F = 4 / 3 * n * A, D = 4 / 3 * s * A, P = [t, e], G = [t + F * v, e - D * b], st = [o + F * C, r - D * M], H = [o, r];
  if (G[0] = 2 * P[0] - G[0], G[1] = 2 * P[1] - G[1], c) return [G, st, H].concat(h);
  {
    h = [G, st, H].concat(h);
    const ot = [];
    for (let J = 0; J < h.length; J += 3) {
      const it = ar(h[J][0], h[J][1], d), Y = ar(h[J + 1][0], h[J + 1][1], d), N = ar(h[J + 2][0], h[J + 2][1], d);
      ot.push([it[0], it[1], Y[0], Y[1], N[0], N[1]]);
    }
    return ot;
  }
}
const pd = { randOffset: function(t, e) {
  return Rt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return Or(t, e, o);
}, ellipse: function(t, e, o, r, n) {
  const s = da(o, r, n);
  return Gn(t, e, n, s).opset;
}, doubleLineOps: function(t, e, o, r, n) {
  return io(t, e, o, r, n, !0);
} };
function ca(t, e, o, r, n) {
  return { type: "path", ops: io(t, e, o, r, n) };
}
function Wr(t, e, o) {
  const r = (t || []).length;
  if (r > 2) {
    const n = [];
    for (let s = 0; s < r - 1; s++) n.push(...io(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && n.push(...io(t[r - 1][0], t[r - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: n };
  }
  return r === 2 ? ca(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function fd(t, e, o, r, n) {
  return function(s, i) {
    return Wr(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + r], [t, e + r]], n);
}
function ci(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, r = Tr(o[0], 1 * (1 + 0.2 * e.roughness), e), n = e.disableMultiStroke ? [] : Tr(o[0], 1.5 * (1 + 0.22 * e.roughness), ui(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const a = Tr(i, 1 * (1 + 0.2 * e.roughness), e), l = e.disableMultiStroke ? [] : Tr(i, 1.5 * (1 + 0.22 * e.roughness), ui(e));
        for (const c of a) c.op !== "move" && r.push(c);
        for (const c of l) c.op !== "move" && n.push(c);
      }
    }
    return { type: "path", ops: r.concat(n) };
  }
  return { type: "path", ops: [] };
}
function da(t, e, o) {
  const r = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), n = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * r)), s = 2 * Math.PI / n;
  let i = Math.abs(t / 2), a = Math.abs(e / 2);
  const l = 1 - o.curveFitting;
  return i += Rt(i * l, o), a += Rt(a * l, o), { increment: s, rx: i, ry: a };
}
function Gn(t, e, o, r) {
  const [n, s] = pi(r.increment, t, e, r.rx, r.ry, 1, r.increment * Or(0.1, Or(0.4, 1, o), o), o);
  let i = Xr(n, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [a] = pi(r.increment, t, e, r.rx, r.ry, 1.5, 0, o), l = Xr(a, null, o);
    i = i.concat(l);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function di(t, e, o, r, n, s, i, a, l) {
  const c = t, d = e;
  let p = Math.abs(o / 2), h = Math.abs(r / 2);
  p += Rt(0.01 * p, l), h += Rt(0.01 * h, l);
  let f = n, m = s;
  for (; f < 0; ) f += 2 * Math.PI, m += 2 * Math.PI;
  m - f > 2 * Math.PI && (f = 0, m = 2 * Math.PI);
  const y = 2 * Math.PI / l.curveStepCount, g = Math.min(y / 2, (m - f) / 2), w = fi(g, c, d, p, h, f, m, 1, l);
  if (!l.disableMultiStroke) {
    const b = fi(g, c, d, p, h, f, m, 1.5, l);
    w.push(...b);
  }
  return i && (a ? w.push(...io(c, d, c + p * Math.cos(f), d + h * Math.sin(f), l), ...io(c, d, c + p * Math.cos(m), d + h * Math.sin(m), l)) : w.push({ op: "lineTo", data: [c, d] }, { op: "lineTo", data: [c + p * Math.cos(f), d + h * Math.sin(f)] })), { type: "path", ops: w };
}
function hi(t, e) {
  const o = aa(ia(ds(t))), r = [];
  let n = [0, 0], s = [0, 0];
  for (const { key: i, data: a } of o) switch (i) {
    case "M":
      s = [a[0], a[1]], n = [a[0], a[1]];
      break;
    case "L":
      r.push(...io(s[0], s[1], a[0], a[1], e)), s = [a[0], a[1]];
      break;
    case "C": {
      const [l, c, d, p, h, f] = a;
      r.push(...yd(l, c, d, p, h, f, s, e)), s = [h, f];
      break;
    }
    case "Z":
      r.push(...io(s[0], s[1], n[0], n[1], e)), s = [n[0], n[1]];
  }
  return { type: "path", ops: r };
}
function vn(t, e) {
  const o = [];
  for (const r of t) if (r.length) {
    const n = e.maxRandomnessOffset || 0, s = r.length;
    if (s > 2) {
      o.push({ op: "move", data: [r[0][0] + Rt(n, e), r[0][1] + Rt(n, e)] });
      for (let i = 1; i < s; i++) o.push({ op: "lineTo", data: [r[i][0] + Rt(n, e), r[i][1] + Rt(n, e)] });
    }
  }
  return { type: "fillPath", ops: o };
}
function Bo(t, e) {
  return function(o, r) {
    let n = o.fillStyle || "hachure";
    if (!ge[n]) switch (n) {
      case "zigzag":
        ge[n] || (ge[n] = new id(r));
        break;
      case "cross-hatch":
        ge[n] || (ge[n] = new ad(r));
        break;
      case "dots":
        ge[n] || (ge[n] = new ld(r));
        break;
      case "dashed":
        ge[n] || (ge[n] = new cd(r));
        break;
      case "zigzag-line":
        ge[n] || (ge[n] = new dd(r));
        break;
      default:
        n = "hachure", ge[n] || (ge[n] = new cs(r));
    }
    return ge[n];
  }(e, pd).fillPolygons(t, e);
}
function ui(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function ha(t) {
  return t.randomizer || (t.randomizer = new hd(t.seed || 0)), t.randomizer.next();
}
function Or(t, e, o, r = 1) {
  return o.roughness * r * (ha(o) * (e - t) + t);
}
function Rt(t, e, o = 1) {
  return Or(-t, t, e, o);
}
function io(t, e, o, r, n, s = !1) {
  const i = s ? n.disableMultiStrokeFill : n.disableMultiStroke, a = Yn(t, e, o, r, n, !0, !1);
  if (i) return a;
  const l = Yn(t, e, o, r, n, !0, !0);
  return a.concat(l);
}
function Yn(t, e, o, r, n, s, i) {
  const a = Math.pow(t - o, 2) + Math.pow(e - r, 2), l = Math.sqrt(a);
  let c = 1;
  c = l < 200 ? 1 : l > 500 ? 0.4 : -16668e-7 * l + 1.233334;
  let d = n.maxRandomnessOffset || 0;
  d * d * 100 > a && (d = l / 10);
  const p = d / 2, h = 0.2 + 0.2 * ha(n);
  let f = n.bowing * n.maxRandomnessOffset * (r - e) / 200, m = n.bowing * n.maxRandomnessOffset * (t - o) / 200;
  f = Rt(f, n, c), m = Rt(m, n, c);
  const y = [], g = () => Rt(p, n, c), w = () => Rt(d, n, c), b = n.preserveVertices;
  return i ? y.push({ op: "move", data: [t + (b ? 0 : g()), e + (b ? 0 : g())] }) : y.push({ op: "move", data: [t + (b ? 0 : Rt(d, n, c)), e + (b ? 0 : Rt(d, n, c))] }), i ? y.push({ op: "bcurveTo", data: [f + t + (o - t) * h + g(), m + e + (r - e) * h + g(), f + t + 2 * (o - t) * h + g(), m + e + 2 * (r - e) * h + g(), o + (b ? 0 : g()), r + (b ? 0 : g())] }) : y.push({ op: "bcurveTo", data: [f + t + (o - t) * h + w(), m + e + (r - e) * h + w(), f + t + 2 * (o - t) * h + w(), m + e + 2 * (r - e) * h + w(), o + (b ? 0 : w()), r + (b ? 0 : w())] }), y;
}
function Tr(t, e, o) {
  if (!t.length) return [];
  const r = [];
  r.push([t[0][0] + Rt(e, o), t[0][1] + Rt(e, o)]), r.push([t[0][0] + Rt(e, o), t[0][1] + Rt(e, o)]);
  for (let n = 1; n < t.length; n++) r.push([t[n][0] + Rt(e, o), t[n][1] + Rt(e, o)]), n === t.length - 1 && r.push([t[n][0] + Rt(e, o), t[n][1] + Rt(e, o)]);
  return Xr(r, null, o);
}
function Xr(t, e, o) {
  const r = t.length, n = [];
  if (r > 3) {
    const s = [], i = 1 - o.curveTightness;
    n.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let a = 1; a + 2 < r; a++) {
      const l = t[a];
      s[0] = [l[0], l[1]], s[1] = [l[0] + (i * t[a + 1][0] - i * t[a - 1][0]) / 6, l[1] + (i * t[a + 1][1] - i * t[a - 1][1]) / 6], s[2] = [t[a + 1][0] + (i * t[a][0] - i * t[a + 2][0]) / 6, t[a + 1][1] + (i * t[a][1] - i * t[a + 2][1]) / 6], s[3] = [t[a + 1][0], t[a + 1][1]], n.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else r === 3 ? (n.push({ op: "move", data: [t[1][0], t[1][1]] }), n.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : r === 2 && n.push(...Yn(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return n;
}
function pi(t, e, o, r, n, s, i, a) {
  const l = [], c = [];
  if (a.roughness === 0) {
    t /= 4, c.push([e + r * Math.cos(-t), o + n * Math.sin(-t)]);
    for (let d = 0; d <= 2 * Math.PI; d += t) {
      const p = [e + r * Math.cos(d), o + n * Math.sin(d)];
      l.push(p), c.push(p);
    }
    c.push([e + r * Math.cos(0), o + n * Math.sin(0)]), c.push([e + r * Math.cos(t), o + n * Math.sin(t)]);
  } else {
    const d = Rt(0.5, a) - Math.PI / 2;
    c.push([Rt(s, a) + e + 0.9 * r * Math.cos(d - t), Rt(s, a) + o + 0.9 * n * Math.sin(d - t)]);
    const p = 2 * Math.PI + d - 0.01;
    for (let h = d; h < p; h += t) {
      const f = [Rt(s, a) + e + r * Math.cos(h), Rt(s, a) + o + n * Math.sin(h)];
      l.push(f), c.push(f);
    }
    c.push([Rt(s, a) + e + r * Math.cos(d + 2 * Math.PI + 0.5 * i), Rt(s, a) + o + n * Math.sin(d + 2 * Math.PI + 0.5 * i)]), c.push([Rt(s, a) + e + 0.98 * r * Math.cos(d + i), Rt(s, a) + o + 0.98 * n * Math.sin(d + i)]), c.push([Rt(s, a) + e + 0.9 * r * Math.cos(d + 0.5 * i), Rt(s, a) + o + 0.9 * n * Math.sin(d + 0.5 * i)]);
  }
  return [c, l];
}
function fi(t, e, o, r, n, s, i, a, l) {
  const c = s + Rt(0.1, l), d = [];
  d.push([Rt(a, l) + e + 0.9 * r * Math.cos(c - t), Rt(a, l) + o + 0.9 * n * Math.sin(c - t)]);
  for (let p = c; p <= i; p += t) d.push([Rt(a, l) + e + r * Math.cos(p), Rt(a, l) + o + n * Math.sin(p)]);
  return d.push([e + r * Math.cos(i), o + n * Math.sin(i)]), d.push([e + r * Math.cos(i), o + n * Math.sin(i)]), Xr(d, null, l);
}
function yd(t, e, o, r, n, s, i, a) {
  const l = [], c = [a.maxRandomnessOffset || 1, (a.maxRandomnessOffset || 1) + 0.3];
  let d = [0, 0];
  const p = a.disableMultiStroke ? 1 : 2, h = a.preserveVertices;
  for (let f = 0; f < p; f++) f === 0 ? l.push({ op: "move", data: [i[0], i[1]] }) : l.push({ op: "move", data: [i[0] + (h ? 0 : Rt(c[0], a)), i[1] + (h ? 0 : Rt(c[0], a))] }), d = h ? [n, s] : [n + Rt(c[f], a), s + Rt(c[f], a)], l.push({ op: "bcurveTo", data: [t + Rt(c[f], a), e + Rt(c[f], a), o + Rt(c[f], a), r + Rt(c[f], a), d[0], d[1]] });
  return l;
}
function lr(t) {
  return [...t];
}
function yi(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const r = [];
  if (o === 3) r.push(lr(t[0]), lr(t[1]), lr(t[2]), lr(t[2]));
  else {
    const n = [];
    n.push(t[0], t[0]);
    for (let a = 1; a < t.length; a++) n.push(t[a]), a === t.length - 1 && n.push(t[a]);
    const s = [], i = 1 - e;
    r.push(lr(n[0]));
    for (let a = 1; a + 2 < n.length; a++) {
      const l = n[a];
      s[0] = [l[0], l[1]], s[1] = [l[0] + (i * n[a + 1][0] - i * n[a - 1][0]) / 6, l[1] + (i * n[a + 1][1] - i * n[a - 1][1]) / 6], s[2] = [n[a + 1][0] + (i * n[a][0] - i * n[a + 2][0]) / 6, n[a + 1][1] + (i * n[a][1] - i * n[a + 2][1]) / 6], s[3] = [n[a + 1][0], n[a + 1][1]], r.push(s[1], s[2], s[3]);
    }
  }
  return r;
}
function Br(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function gd(t, e, o) {
  const r = Br(e, o);
  if (r === 0) return Br(t, e);
  let n = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / r;
  return n = Math.max(0, Math.min(1, n)), Br(t, wo(e, o, n));
}
function wo(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function jn(t, e, o, r) {
  const n = r || [];
  if (function(a, l) {
    const c = a[l + 0], d = a[l + 1], p = a[l + 2], h = a[l + 3];
    let f = 3 * d[0] - 2 * c[0] - h[0];
    f *= f;
    let m = 3 * d[1] - 2 * c[1] - h[1];
    m *= m;
    let y = 3 * p[0] - 2 * h[0] - c[0];
    y *= y;
    let g = 3 * p[1] - 2 * h[1] - c[1];
    return g *= g, f < y && (f = y), m < g && (m = g), f + m;
  }(t, e) < o) {
    const a = t[e + 0];
    n.length ? (s = n[n.length - 1], i = a, Math.sqrt(Br(s, i)) > 1 && n.push(a)) : n.push(a), n.push(t[e + 3]);
  } else {
    const l = t[e + 0], c = t[e + 1], d = t[e + 2], p = t[e + 3], h = wo(l, c, 0.5), f = wo(c, d, 0.5), m = wo(d, p, 0.5), y = wo(h, f, 0.5), g = wo(f, m, 0.5), w = wo(y, g, 0.5);
    jn([l, h, y, w], 0, o, n), jn([w, g, m, p], 0, o, n);
  }
  var s, i;
  return n;
}
function md(t, e) {
  return Gr(t, 0, t.length, e);
}
function Gr(t, e, o, r, n) {
  const s = n || [], i = t[e], a = t[o - 1];
  let l = 0, c = 1;
  for (let d = e + 1; d < o - 1; ++d) {
    const p = gd(t[d], i, a);
    p > l && (l = p, c = d);
  }
  return Math.sqrt(l) > r ? (Gr(t, e, c + 1, r, s), Gr(t, c, o, r, s)) : (s.length || s.push(i), s.push(a)), s;
}
function Sn(t, e = 0.15, o) {
  const r = [], n = (t.length - 1) / 3;
  for (let s = 0; s < n; s++)
    jn(t, 3 * s, e, r);
  return o && o > 0 ? Gr(r, 0, r.length, o) : r;
}
const we = "none";
class Yr {
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
    return this._d("line", [ca(e, o, r, n, i)], i);
  }
  rectangle(e, o, r, n, s) {
    const i = this._o(s), a = [], l = fd(e, o, r, n, i);
    if (i.fill) {
      const c = [[e, o], [e + r, o], [e + r, o + n], [e, o + n]];
      i.fillStyle === "solid" ? a.push(vn([c], i)) : a.push(Bo([c], i));
    }
    return i.stroke !== we && a.push(l), this._d("rectangle", a, i);
  }
  ellipse(e, o, r, n, s) {
    const i = this._o(s), a = [], l = da(r, n, i), c = Gn(e, o, i, l);
    if (i.fill) if (i.fillStyle === "solid") {
      const d = Gn(e, o, i, l).opset;
      d.type = "fillPath", a.push(d);
    } else a.push(Bo([c.estimatedPoints], i));
    return i.stroke !== we && a.push(c.opset), this._d("ellipse", a, i);
  }
  circle(e, o, r, n) {
    const s = this.ellipse(e, o, r, r, n);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const r = this._o(o);
    return this._d("linearPath", [Wr(e, !1, r)], r);
  }
  arc(e, o, r, n, s, i, a = !1, l) {
    const c = this._o(l), d = [], p = di(e, o, r, n, s, i, a, !0, c);
    if (a && c.fill) if (c.fillStyle === "solid") {
      const h = Object.assign({}, c);
      h.disableMultiStroke = !0;
      const f = di(e, o, r, n, s, i, !0, !1, h);
      f.type = "fillPath", d.push(f);
    } else d.push(function(h, f, m, y, g, w, b) {
      const v = h, M = f;
      let C = Math.abs(m / 2), A = Math.abs(y / 2);
      C += Rt(0.01 * C, b), A += Rt(0.01 * A, b);
      let F = g, D = w;
      for (; F < 0; ) F += 2 * Math.PI, D += 2 * Math.PI;
      D - F > 2 * Math.PI && (F = 0, D = 2 * Math.PI);
      const P = (D - F) / b.curveStepCount, G = [];
      for (let st = F; st <= D; st += P) G.push([v + C * Math.cos(st), M + A * Math.sin(st)]);
      return G.push([v + C * Math.cos(D), M + A * Math.sin(D)]), G.push([v, M]), Bo([G], b);
    }(e, o, r, n, s, i, c));
    return c.stroke !== we && d.push(p), this._d("arc", d, c);
  }
  curve(e, o) {
    const r = this._o(o), n = [], s = ci(e, r);
    if (r.fill && r.fill !== we) if (r.fillStyle === "solid") {
      const i = ci(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], a = e;
      if (a.length) {
        const l = typeof a[0][0] == "number" ? [a] : a;
        for (const c of l) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...Sn(yi([c[0], c[0], c[1], c[2]]), 10, (1 + r.roughness) / 2)) : i.push(...Sn(yi(c), 10, (1 + r.roughness) / 2));
      }
      i.length && n.push(Bo([i], r));
    }
    return r.stroke !== we && n.push(s), this._d("curve", n, r);
  }
  polygon(e, o) {
    const r = this._o(o), n = [], s = Wr(e, !0, r);
    return r.fill && (r.fillStyle === "solid" ? n.push(vn([e], r)) : n.push(Bo([e], r))), r.stroke !== we && n.push(s), this._d("polygon", n, r);
  }
  path(e, o) {
    const r = this._o(o), n = [];
    if (!e) return this._d("path", n, r);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = r.fill && r.fill !== "transparent" && r.fill !== we, i = r.stroke !== we, a = !!(r.simplification && r.simplification < 1), l = function(d, p, h) {
      const f = aa(ia(ds(d))), m = [];
      let y = [], g = [0, 0], w = [];
      const b = () => {
        w.length >= 4 && y.push(...Sn(w, p)), w = [];
      }, v = () => {
        b(), y.length && (m.push(y), y = []);
      };
      for (const { key: C, data: A } of f) switch (C) {
        case "M":
          v(), g = [A[0], A[1]], y.push(g);
          break;
        case "L":
          b(), y.push([A[0], A[1]]);
          break;
        case "C":
          if (!w.length) {
            const F = y.length ? y[y.length - 1] : g;
            w.push([F[0], F[1]]);
          }
          w.push([A[0], A[1]]), w.push([A[2], A[3]]), w.push([A[4], A[5]]);
          break;
        case "Z":
          b(), y.push([g[0], g[1]]);
      }
      if (v(), !h) return m;
      const M = [];
      for (const C of m) {
        const A = md(C, h);
        A.length && M.push(A);
      }
      return M;
    }(e, 1, a ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2), c = hi(e, r);
    if (s) if (r.fillStyle === "solid") if (l.length === 1) {
      const d = hi(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(d.ops) });
    } else n.push(vn(l, r));
    else n.push(Bo(l, r));
    return i && (a ? l.forEach((d) => {
      n.push(Wr(d, !1, r));
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
class bd {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new Yr(o);
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
const Pr = "http://www.w3.org/2000/svg";
class xd {
  constructor(e, o) {
    this.svg = e, this.gen = new Yr(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, s = n.createElementNS(Pr, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const a of o) {
      let l = null;
      switch (a.type) {
        case "path":
          l = n.createElementNS(Pr, "path"), l.setAttribute("d", this.opsToPath(a, i)), l.setAttribute("stroke", r.stroke), l.setAttribute("stroke-width", r.strokeWidth + ""), l.setAttribute("fill", "none"), r.strokeLineDash && l.setAttribute("stroke-dasharray", r.strokeLineDash.join(" ").trim()), r.strokeLineDashOffset && l.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
          break;
        case "fillPath":
          l = n.createElementNS(Pr, "path"), l.setAttribute("d", this.opsToPath(a, i)), l.setAttribute("stroke", "none"), l.setAttribute("stroke-width", "0"), l.setAttribute("fill", r.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || l.setAttribute("fill-rule", "evenodd");
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
    const s = e.createElementNS(Pr, "path");
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
var wd = { canvas: (t, e) => new bd(t, e), svg: (t, e) => new xd(t, e), generator: (t) => new Yr(t), newSeed: () => Yr.newSeed() };
const Ve = wd.generator();
function kd(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t.charCodeAt(o);
    e = (e << 5) - e + r, e |= 0;
  }
  return Math.abs(e);
}
function ao(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? kd(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function lo(t) {
  var r;
  const e = t.options, o = (r = e == null ? void 0 : e.strokeLineDash) != null && r.length ? e.strokeLineDash.join(" ") : void 0;
  return Ve.toPaths(t).map((n) => ({
    d: n.d,
    stroke: n.stroke,
    strokeWidth: n.strokeWidth,
    fill: n.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: n.stroke !== "none" && n.strokeWidth > 0 ? o : void 0
  }));
}
function _o(t, e) {
  return Math.min(t, e) * 0.25;
}
function vd(t, e, o, r, n) {
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
function jr(t, e, o, r, n, s) {
  if (s) {
    const i = _o(o, r);
    return lo(Ve.path(vd(t, e, o, r, i), ao(n)));
  }
  return lo(Ve.rectangle(t, e, o, r, ao(n)));
}
function hs(t, e, o, r, n) {
  return lo(Ve.ellipse(t, e, o, r, ao(n)));
}
function Sd(t, e, o, r, n) {
  const s = t + o / 2, i = e + r / 2, a = [s, e], l = [t + o, i], c = [s, e + r], d = [t, i], p = Math.hypot(o / 2, r / 2), h = Math.min(n, p / 2) / p, f = (A, F, D) => [
    A[0] + D * (F[0] - A[0]),
    A[1] + D * (F[1] - A[1])
  ], m = f(d, a, 1 - h), y = f(a, l, h), g = f(a, l, 1 - h), w = f(l, c, h), b = f(l, c, 1 - h), v = f(c, d, h), M = f(c, d, 1 - h), C = f(d, a, h);
  return [
    `M${y[0]},${y[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${l[0]},${l[1]} ${w[0]},${w[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${c[0]},${c[1]} ${v[0]},${v[1]}`,
    `L${M[0]},${M[1]}`,
    `Q${d[0]},${d[1]} ${C[0]},${C[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${a[0]},${a[1]} ${y[0]},${y[1]}`,
    "Z"
  ].join(" ");
}
function us(t, e, o, r, n, s) {
  if (s) {
    const a = _o(o, r);
    return lo(Ve.path(Sd(t, e, o, r, a), ao(n)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + r / 2],
    [t + o / 2, e + r],
    [t, e + r / 2]
  ];
  return lo(Ve.polygon(i, ao(n)));
}
function Zo(t, e, o, r, n) {
  return lo(Ve.line(t, e, o, r, ao(n)));
}
function ps(t, e, o, r, n) {
  const s = Zo(t, e, o, r, n), i = Math.atan2(r - e, o - t), a = Math.max(12, n.strokeWidth * 4), l = Math.PI / 6, c = o - a * Math.cos(i - l), d = r - a * Math.sin(i - l), p = o - a * Math.cos(i + l), h = r - a * Math.sin(i + l), f = Zo(o, r, c, d, n), m = Zo(o, r, p, h, n);
  return [...s, ...f, ...m];
}
function gi(t, e) {
  const o = {
    ...ao(e),
    stroke: "none"
  };
  return lo(Ve.polygon(t, o));
}
function Mn(t, e) {
  return lo(Ve.path(t, ao(e)));
}
function co(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function Md(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function Cd({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ u(zd, { node: o }) : /* @__PURE__ */ u(Id, { node: o });
  }
  return /* @__PURE__ */ u(Td, { node: t, editingLabel: e });
}
const Vr = be(Cd), Id = be(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", r = co(e.data.strokeStyle), n = Vt(
    () => o ? null : ls(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Vt(() => {
    const d = e.data.points;
    if (!d || d.length === 0) return "";
    if (d.length === 1) return `M${d[0][0]},${d[0][1]}L${d[0][0]},${d[0][1]}`;
    const p = [`M${d[0][0]},${d[0][1]}`];
    for (let h = 1; h < d.length; h++)
      p.push(`L${d[h][0]},${d[h][1]}`);
    return p.join("");
  }, [e.data.points]), i = Vt(() => {
    if (!o) return null;
    const d = e.data.points;
    if (d.length < 2) return "";
    const p = ["M", d[0][0], d[0][1]];
    for (let f = 1; f < d.length; f++) {
      const [m, y] = d[f], [g, w] = d[f - 1];
      p.push("Q", g, w, (g + m) / 2, (w + y) / 2);
    }
    const h = d[d.length - 1];
    return p.push("L", h[0], h[1]), p.join(" ");
  }, [e.data.points, o]), a = Vt(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const d = e.data.points.map((M) => [M[0], M[1]]), p = sa(d), h = p[0], f = p[p.length - 1], m = Math.hypot(h[0] - f[0], h[1] - f[1]);
    let y = 0;
    for (let M = 1; M < p.length; M++)
      y += Math.hypot(p[M][0] - p[M - 1][0], p[M][1] - p[M - 1][1]);
    const g = y >= 1 && m <= Math.max(e.data.strokeWidth * 4, 20) && m <= y * 0.1, w = e.data.fillStyle || "solid";
    if (g) {
      const M = td(p, 0);
      return w === "solid" ? { kind: "solid", d: M, fill: e.data.fill } : { kind: "rough", paths: gi(p, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: w,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const b = rd(p);
    if (b.length === 0) return null;
    if (w === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: b
      };
    const v = [];
    for (const { points: M } of b)
      M.length >= 3 && v.push(
        ...gi(M, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: w,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: v, regions: b };
  }, [e.data.fill, e.data.fillStyle, e.data.points, e.data.strokeWidth]), l = e.h === "auto" ? 0 : e.h, c = e.data.strokeWidth * 4;
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ u(
        "svg",
        {
          width: e.w + c * 2,
          height: l + c * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ k("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
            (a == null ? void 0 : a.kind) === "solid" && (a.regions ? a.regions.map((d, p) => /* @__PURE__ */ u(
              "path",
              {
                d: d.pathD,
                fill: a.fill,
                stroke: "none"
              },
              p
            )) : /* @__PURE__ */ u("path", { d: a.d, fill: a.fill, stroke: "none" })),
            (a == null ? void 0 : a.kind) === "rough" && a.paths.map((d, p) => /* @__PURE__ */ u(
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
            o ? /* @__PURE__ */ u(
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
            ) : /* @__PURE__ */ u(
              "path",
              {
                d: n,
                fill: e.data.color
              }
            ),
            s && /* @__PURE__ */ u(
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
}), zd = be(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, r = e.data.strokeWidth * 2, n = Vt(() => {
    const a = e.data.points;
    if (!a || a.length === 0) return "";
    const l = [`M${a[0][0]},${a[0][1]}`];
    for (let c = 1; c < a.length; c++)
      l.push(`L${a[c][0]},${a[c][1]}`);
    return l.push("Z"), l.join("");
  }, [e.data.points]), s = co(e.data.strokeStyle), i = s == null ? void 0 : s.map((a) => a * Math.max(e.data.strokeWidth, 1)).join(" ");
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ u(
        "svg",
        {
          width: e.w + r * 2,
          height: o + r * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ k("g", { transform: `translate(${r}, ${r})`, opacity: e.data.opacity ?? 1, children: [
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u(
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
}), Td = be(function({ node: e, editingLabel: o }) {
  var g, w, b, v;
  const r = e.h === "auto" ? 100 : e.h, n = e.data.strokeWidth * 2, s = co(e.data.strokeStyle), i = ((g = e.data.startPoint) == null ? void 0 : g[0]) ?? 0, a = ((w = e.data.startPoint) == null ? void 0 : w[1]) ?? r / 2, l = ((b = e.data.endPoint) == null ? void 0 : b[0]) ?? e.w, c = ((v = e.data.endPoint) == null ? void 0 : v[1]) ?? r / 2, d = Vt(() => {
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
        return jr(0, 0, e.w, r, M, C);
      case "ellipse":
        return hs(e.w / 2, r / 2, e.w, r, M);
      case "diamond":
        return us(0, 0, e.w, r, M, C);
      case "line":
        return Zo(i, a, l, c, M);
      case "arrow":
        return ps(i, a, l, c, M);
      default:
        return null;
    }
  }, [e, s, i, a, l, c, r]), p = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, h = e.data.opacity ?? 1, f = e.data.shape === "line" || e.data.shape === "arrow", m = e.data.label, y = e.data.labelFontSize ?? 14;
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
        /* @__PURE__ */ u(
          "svg",
          {
            width: e.w + n * 2,
            height: r + n * 2,
            style: { overflow: "visible", marginLeft: -n, marginTop: -n },
            children: /* @__PURE__ */ k("g", { transform: `translate(${n}, ${n})`, opacity: h, children: [
              p && /* @__PURE__ */ u(
                Ed,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              d ? d.map((M, C) => p && M.fill && M.fill !== "none" ? null : /* @__PURE__ */ u(
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
              )) : /* @__PURE__ */ u(
                Pd,
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
              /* @__PURE__ */ u(
                Ad,
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
        !f && m && !o && /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(
              "div",
              {
                style: {
                  textAlign: e.data.labelAlign ?? "center",
                  fontFamily: so(e.data.labelFontFamily ?? no),
                  fontSize: y,
                  color: e.data.fill && e.data.fillStyle === "solid" ? Md(e.data.fill) : e.data.stroke,
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
function fs(t, e) {
  const o = _o(t, e), r = t / 2, n = e / 2, s = [r, 0], i = [t, n], a = [r, e], l = [0, n], c = Math.hypot(t / 2, e / 2), d = Math.min(o, c / 2) / c, p = (M, C, A) => [
    M[0] + A * (C[0] - M[0]),
    M[1] + A * (C[1] - M[1])
  ], h = p(s, i, d), f = p(s, i, 1 - d), m = p(i, a, d), y = p(i, a, 1 - d), g = p(a, l, d), w = p(a, l, 1 - d), b = p(l, s, d), v = p(l, s, 1 - d);
  return [
    `M${h[0]},${h[1]}`,
    `L${f[0]},${f[1]}`,
    `Q${i[0]},${i[1]} ${m[0]},${m[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${a[0]},${a[1]} ${g[0]},${g[1]}`,
    `L${w[0]},${w[1]}`,
    `Q${l[0]},${l[1]} ${b[0]},${b[1]}`,
    `L${v[0]},${v[1]}`,
    `Q${s[0]},${s[1]} ${h[0]},${h[1]}`,
    "Z"
  ].join(" ");
}
function Pd({
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
  const h = d == null ? void 0 : d.join(",");
  switch (t) {
    case "rect": {
      const f = !!l && l !== "none", m = o <= Math.max(c * 2, 4), y = e <= Math.max(c * 2, 4);
      if (!f && (m || y))
        return m && e >= o ? /* @__PURE__ */ u(
          "line",
          {
            x1: 0,
            y1: o / 2,
            x2: e,
            y2: o / 2,
            stroke: a,
            strokeWidth: Math.max(c, o),
            strokeDasharray: h
          }
        ) : /* @__PURE__ */ u(
          "line",
          {
            x1: e / 2,
            y1: 0,
            x2: e / 2,
            y2: o,
            stroke: a,
            strokeWidth: Math.max(c, e),
            strokeDasharray: h
          }
        );
      const g = p ? _o(e, o) : 0;
      return /* @__PURE__ */ u(
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
          strokeDasharray: h
        }
      );
    }
    case "ellipse":
      return /* @__PURE__ */ u(
        "ellipse",
        {
          cx: e / 2,
          cy: o / 2,
          rx: e / 2,
          ry: o / 2,
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: h
        }
      );
    case "diamond":
      return p ? /* @__PURE__ */ u(
        "path",
        {
          d: fs(e, o),
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: h
        }
      ) : /* @__PURE__ */ u(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: h
        }
      );
    case "line":
      return /* @__PURE__ */ u(
        "line",
        {
          x1: r,
          y1: n,
          x2: s,
          y2: i,
          stroke: a,
          strokeWidth: c,
          strokeDasharray: h
        }
      );
    case "arrow": {
      const f = Math.atan2(i - n, s - r), m = Math.max(12, c * 4), y = Math.PI / 6, g = s - m * Math.cos(f - y), w = i - m * Math.sin(f - y), b = s - m * Math.cos(f + y), v = i - m * Math.sin(f + y);
      return /* @__PURE__ */ k(gt, { children: [
        /* @__PURE__ */ u(
          "line",
          {
            x1: r,
            y1: n,
            x2: s,
            y2: i,
            stroke: a,
            strokeWidth: c,
            strokeDasharray: h
          }
        ),
        /* @__PURE__ */ u(
          "polyline",
          {
            points: `${g},${w} ${s},${i} ${b},${v}`,
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
function Ad({
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
      const h = c ? _o(e, o) : 0;
      return /* @__PURE__ */ u(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: h || void 0,
          ry: h || void 0,
          fill: p,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: d
        }
      );
    }
    case "ellipse":
      return /* @__PURE__ */ u(
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
      return c ? /* @__PURE__ */ u(
        "path",
        {
          d: fs(e, o),
          fill: p,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: d
        }
      ) : /* @__PURE__ */ u(
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
      return /* @__PURE__ */ u(
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
function Ed({
  shape: t,
  w: e,
  h: o,
  fill: r,
  rounded: n
}) {
  switch (t) {
    case "rect": {
      const s = n ? _o(e, o) : 0;
      return /* @__PURE__ */ u("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: r, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ u("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: r, stroke: "none" });
    case "diamond":
      return n ? /* @__PURE__ */ u(
        "path",
        {
          d: fs(e, o),
          fill: r,
          stroke: "none"
        }
      ) : /* @__PURE__ */ u(
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
const Rd = be(function(e) {
  return /* @__PURE__ */ u(Vr, { node: e.node });
}), Ld = {
  type: "draw",
  component: Rd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => ts(t, e, o, r),
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
}, Dd = be(function(e) {
  const o = e.node;
  return /* @__PURE__ */ u(Vr, { node: o, editingLabel: e.editing });
}), Wd = {
  type: "shape",
  component: Dd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => Ur(t, e, o, r),
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
function Bd(t) {
  return null;
}
const Fd = {
  type: "edge",
  component: Bd,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, Ar = 0.05, Nd = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function Hd({
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
  const c = t.h, d = t.data.crop, p = dt(!1);
  p.current = !!i;
  const h = dt(null), [f, m] = $(null), y = ct(() => {
    h.current && h.current.naturalWidth > 0 && m({ w: h.current.naturalWidth, h: h.current.naturalHeight });
  }, []);
  bt(() => {
    h.current && h.current.naturalWidth > 0 && m({ w: h.current.naturalWidth, h: h.current.naturalHeight });
  }, [t.data.src]);
  const [g, w] = $({ x: 0, y: 0, w: 1, h: 1 });
  bt(() => {
    i && (w(d ?? { x: 0, y: 0, w: 1, h: 1 }), !f && h.current && h.current.naturalWidth > 0 && m({ w: h.current.naturalWidth, h: h.current.naturalHeight }));
  }, [i]);
  const b = Vt(() => {
    if (!f) return null;
    const K = f.w / f.h, q = t.w / c;
    let j, X;
    return K > q ? (j = t.w, X = t.w / K) : (X = c, j = c * K), { x: (t.w - j) / 2, y: (c - X) / 2, w: j, h: X };
  }, [f, t.w, c]), v = ct(() => {
    const K = g.x < 1e-3 && g.y < 1e-3 && g.w > 0.999 && g.h > 0.999;
    o.updateNodeWithHistory(t.id, {
      data: {
        ...t.data,
        crop: K ? void 0 : { x: g.x, y: g.y, w: g.w, h: g.h }
      }
    }), l == null || l();
  }, [o, t, g, l]), M = ct(() => {
    l == null || l();
  }, [l]);
  bt(() => {
    if (!i) return;
    const K = (q) => {
      q.key === "Enter" ? (v(), q.preventDefault(), q.stopPropagation()) : q.key === "Escape" && (M(), q.preventDefault(), q.stopPropagation());
    };
    return document.addEventListener("keydown", K, !0), () => document.removeEventListener("keydown", K, !0);
  }, [i, v, M]);
  const C = ct(
    (K, q) => {
      if (q.stopPropagation(), q.preventDefault(), !b) return;
      const j = q.currentTarget.ownerDocument, X = q.clientX, _ = q.clientY, Q = { ...g }, lt = (St) => {
        const vt = (St.clientX - X) / n / b.w, Mt = (St.clientY - _) / n / b.h, xt = { ...Q }, ft = Q.x + Q.w, Lt = Q.y + Q.h;
        if (K.includes("left")) {
          const rt = Math.max(0, Math.min(ft - Ar, Q.x + vt));
          xt.x = rt, xt.w = ft - rt;
        }
        if (K.includes("right") && (xt.w = Math.max(
          Ar,
          Math.min(1 - Q.x, Q.w + vt)
        )), K.includes("top")) {
          const rt = Math.max(0, Math.min(Lt - Ar, Q.y + Mt));
          xt.y = rt, xt.h = Lt - rt;
        }
        K.includes("bottom") && (xt.h = Math.max(
          Ar,
          Math.min(1 - Q.y, Q.h + Mt)
        )), w(xt);
      }, ht = () => {
        j.removeEventListener("pointermove", lt), j.removeEventListener("pointerup", ht);
      };
      j.addEventListener("pointermove", lt), j.addEventListener("pointerup", ht);
    },
    [g, b, n]
  ), A = ct(
    (K) => {
      if (K.stopPropagation(), K.preventDefault(), !b) return;
      const q = K.currentTarget.ownerDocument, j = K.clientX, X = K.clientY, _ = { ...g }, Q = (ht) => {
        const St = (ht.clientX - j) / n / b.w, vt = (ht.clientY - X) / n / b.h;
        w({
          ..._,
          x: Math.max(0, Math.min(1 - _.w, _.x + St)),
          y: Math.max(0, Math.min(1 - _.h, _.y + vt))
        });
      }, lt = () => {
        q.removeEventListener("pointermove", Q), q.removeEventListener("pointerup", lt);
      };
      q.addEventListener("pointermove", Q), q.addEventListener("pointerup", lt);
    },
    [g, b, n]
  ), F = ct(
    (K) => {
      if (p.current) return;
      const q = K.currentTarget.ownerDocument;
      if (K.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: rt, y: Et } = o.screenToCanvas(
          K.clientX,
          K.clientY
        );
        for (const Kt of o.selection) {
          const Ut = o.getNode(Kt);
          if (!Ut) continue;
          const oe = Ut.h === "auto" ? 100 : Ut.h;
          if (rt >= Ut.x && rt <= Ut.x + Ut.w && Et >= Ut.y && Et <= Ut.y + oe)
            return;
        }
      }
      K.stopPropagation(), K.preventDefault(), K.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const j = K.clientX, X = K.clientY, _ = Array.from(o.selection), Q = _.map((rt) => {
        const Et = o.getNode(rt);
        return { id: rt, x: Et.x, y: Et.y };
      });
      let lt = !1, ht = null, St = j, vt = X, Mt = !1;
      const xt = () => {
        ht = null;
        const rt = (St - j) / o.viewport.zoom, Et = (vt - X) / o.viewport.zoom, { finalDx: Kt, finalDy: Ut } = o.computeDragSnap(
          Q,
          _,
          rt,
          Et,
          Mt
        ), oe = Q.map((ie) => ({
          id: ie.id,
          patch: { x: ie.x + Kt, y: ie.y + Ut }
        }));
        o.updateMany(oe);
      }, ft = (rt) => {
        const Et = (rt.clientX - j) / o.viewport.zoom, Kt = (rt.clientY - X) / o.viewport.zoom;
        if (!lt)
          if (Math.abs(Et) > 2 || Math.abs(Kt) > 2)
            lt = !0, o.pushHistorySnapshot();
          else
            return;
        St = rt.clientX, vt = rt.clientY, Mt = rt.metaKey || rt.ctrlKey, ht === null && (ht = requestAnimationFrame(xt));
      }, Lt = () => {
        ht !== null && (cancelAnimationFrame(ht), xt()), o.clearAlignGuides(), q.removeEventListener("pointermove", ft), q.removeEventListener("pointerup", Lt);
      };
      q.addEventListener("pointermove", ft), q.addEventListener("pointerup", Lt);
    },
    [o, t.id]
  ), D = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], P = 8 / n, G = P / 2, st = 25 / n, H = e && s && !i, ot = ct(
    (K) => {
      const q = K.currentTarget.ownerDocument;
      K.stopPropagation(), K.preventDefault();
      const j = t.x + t.w / 2, X = t.y + c / 2, _ = t.rotation || 0, { x: Q, y: lt } = o.screenToCanvas(
        K.clientX,
        K.clientY
      ), ht = Math.atan2(lt - X, Q - j);
      o.pushHistorySnapshot();
      const St = (Mt) => {
        const { x: xt, y: ft } = o.screenToCanvas(
          Mt.clientX,
          Mt.clientY
        ), Lt = Math.atan2(ft - X, xt - j);
        let rt = _ + (Lt - ht) * (180 / Math.PI);
        (Mt.shiftKey || o.snapToGrid) && !(Mt.metaKey || Mt.ctrlKey) && (rt = Math.round(rt / 15) * 15), o.updateNode(t.id, { rotation: rt });
      }, vt = () => {
        q.removeEventListener("pointermove", St), q.removeEventListener("pointerup", vt);
      };
      q.addEventListener("pointermove", St), q.addEventListener("pointerup", vt);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), J = i && b ? {
    left: b.x + g.x * b.w,
    top: b.y + g.y * b.h,
    width: g.w * b.w,
    height: g.h * b.h
  } : null, it = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, Y = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: it
  };
  if (!i && d) {
    const K = d.y * 100, q = (1 - d.x - d.w) * 100, j = (1 - d.y - d.h) * 100, X = d.x * 100;
    Y.objectViewBox = `inset(${K}% ${q}% ${j}% ${X}%)`;
  }
  const N = 8 / n, tt = N / 2;
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
              /* @__PURE__ */ u(
                "img",
                {
                  ref: h,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: y,
                  style: Y,
                  draggable: !1
                }
              ),
              i && J && /* @__PURE__ */ u(
                "div",
                {
                  onPointerDown: A,
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
        i && J && Nd.map(({ pos: K, edges: q, cx: j, cy: X, cursor: _ }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (Q) => C(q, Q),
            style: {
              position: "absolute",
              left: J.left + j * J.width - tt,
              top: J.top + X * J.height - tt,
              width: N,
              height: N,
              background: "white",
              border: `${1.5 / n}px solid #3b82f6`,
              borderRadius: 2,
              cursor: _,
              zIndex: 11
            }
          },
          K
        )),
        e && !i && /* @__PURE__ */ k(gt, { children: [
          /* @__PURE__ */ u(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: -st,
                width: 1,
                height: st,
                background: "#3b82f6",
                marginLeft: -0.5,
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: ot,
              style: {
                position: "absolute",
                left: "50%",
                top: -(st + P / 2),
                width: P,
                height: P,
                marginLeft: -P / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        H && D.map(({ pos: K, cx: q, cy: j }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (X) => {
              X.stopPropagation(), s == null || s(t.id, K, X);
            },
            style: {
              position: "absolute",
              left: `calc(${q * 100}% - ${G}px)`,
              top: `calc(${j * 100}% - ${G}px)`,
              width: P,
              height: P,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: Zr(K, t.rotation || 0)
            }
          },
          K
        ))
      ]
    }
  );
}
const ua = be(Hd);
function Od(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    ua,
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
const Xd = {
  type: "image",
  component: Od,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function Gd({
  node: t,
  engine: e,
  editing: o,
  editClickPos: r,
  onStopEdit: n,
  onMeasuredHeight: s
}) {
  const i = dt(null), [a, l] = $(t.data.text), c = dt(!1), d = dt(t.data.text), p = dt(null), h = dt(e);
  h.current = e;
  const f = dt(t);
  f.current = t, bt(() => {
    o || l(t.data.text);
  }, [t.data.text]), Kr(() => {
    var C, A;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const F = i.current.ownerDocument;
      let D = !1;
      if (r) {
        const P = F.caretRangeFromPoint(r.clientX, r.clientY);
        if (P && i.current.contains(P.startContainer)) {
          const G = (C = F.defaultView) == null ? void 0 : C.getSelection();
          G == null || G.removeAllRanges(), G == null || G.addRange(P), D = !0;
        }
      }
      if (!D) {
        const P = F.createRange(), G = (A = F.defaultView) == null ? void 0 : A.getSelection();
        i.current.childNodes.length > 0 && (P.selectNodeContents(i.current), P.collapse(!1)), G == null || G.removeAllRanges(), G == null || G.addRange(P);
      }
      d.current = t.data.text, c.current = !1;
    }
  }, [o]), bt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const C = d.current, A = e.getNode(t.id);
        if (A && A.type === "text") {
          const F = A.data;
          C !== F.text && e.updateNodeWithHistory(t.id, {
            data: { ...F, text: C }
          });
        }
      };
  }, [o, e, t.id]), bt(() => {
    if (!i.current || !s) return;
    const C = new ResizeObserver(() => {
      var F;
      const A = ((F = i.current) == null ? void 0 : F.offsetHeight) ?? 0;
      A > 0 && s(t.id, A);
    });
    return C.observe(i.current), () => C.disconnect();
  }, [t.id, s, o]);
  const m = ct(() => {
    var A;
    if (c.current) return;
    c.current = !0, p.current && (clearTimeout(p.current), p.current = null);
    const C = ((A = i.current) == null ? void 0 : A.innerText) ?? "";
    l(C), d.current = C, C !== t.data.text && e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: C }
    }), n();
  }, [e, t, n]), y = ct(
    (C) => {
      var A;
      C.key === "Escape" && (C.preventDefault(), m(), (A = i.current) == null || A.blur()), C.stopPropagation();
    },
    [m]
  ), g = ct(() => {
    m();
  }, [m]), w = ct(() => {
    if (i.current) {
      const C = i.current.innerText;
      l(C), d.current = C, p.current && clearTimeout(p.current), p.current = setTimeout(() => {
        const A = f.current;
        C !== A.data.text && h.current.updateNode(A.id, {
          data: { ...A.data, text: C }
        });
      }, 0);
    }
  }, []), b = t.h === "auto" ? void 0 : t.h, v = t.data.opacity ?? 1, M = {
    fontFamily: so(t.data.fontFamily),
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
  return /* @__PURE__ */ u(
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
      children: o ? /* @__PURE__ */ u(
        "div",
        {
          ref: i,
          contentEditable: !0,
          suppressContentEditableWarning: !0,
          onKeyDown: y,
          onBlur: g,
          onInput: w,
          onPointerDown: (C) => C.stopPropagation(),
          style: { ...M, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ u("div", { ref: i, style: M, children: a || " " })
    }
  );
}
const pa = be(Gd);
function Yd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    pa,
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
const jd = {
  type: "text",
  component: Yd,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function Vd(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, r = ct(
    (s) => {
      var a, l;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (l = (a = t.callbacks).onEditEnd) == null || l.call(a);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), n = ct(
    (s) => {
      (s.key === "Enter" || s.key === "Escape") && s.currentTarget.blur(), s.stopPropagation();
    },
    []
  );
  return /* @__PURE__ */ u(
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
      children: t.editing ? /* @__PURE__ */ u(
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
      ) : e.data.label ? /* @__PURE__ */ u(
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
const qd = {
  type: "frame",
  component: Vd,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, Kd = 100;
function Ud({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onEditStart: i,
  onEditEnd: a
}) {
  const l = dt(null), c = dt(null), d = dt(""), p = dt(null), h = dt(null), f = dt(t);
  f.current = t;
  const m = dt(o);
  m.current = o, bt(() => {
    var M;
    if (s && c.current) {
      const C = c.current;
      C.innerText = t.data.text || "", d.current = t.data.text || "", C.focus();
      const A = C.ownerDocument, F = (M = A.defaultView) == null ? void 0 : M.getSelection(), D = p.current;
      p.current = null;
      let P = !1;
      if (D && F && A.caretRangeFromPoint) {
        const G = A.caretRangeFromPoint(D.x, D.y);
        G && C.contains(G.startContainer) && (F.removeAllRanges(), F.addRange(G), P = !0);
      }
      if (!P && F) {
        const G = A.createRange();
        C.childNodes.length > 0 && (G.selectNodeContents(C), G.collapse(!1)), F.removeAllRanges(), F.addRange(G);
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
  const y = ct(() => {
    h.current && (clearTimeout(h.current), h.current = null), c.current && (d.current = c.current.innerText), a();
  }, [a]), g = ct(
    (M) => {
      const C = M.currentTarget.ownerDocument;
      if (M.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: tt, y: K } = o.screenToCanvas(M.clientX, M.clientY);
        for (const q of o.selection) {
          const j = o.getNode(q);
          if (!j) continue;
          const X = j.h === "auto" ? 100 : j.h;
          if (tt >= j.x && tt <= j.x + j.w && K >= j.y && K <= j.y + X)
            return;
        }
      }
      if (M.stopPropagation(), s) return;
      M.currentTarget.setPointerCapture(M.pointerId), M.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const A = M.clientX, F = M.clientY, D = Array.from(o.selection), P = [];
      for (const tt of D) {
        const K = o.getNode(tt);
        K && P.push({ id: tt, x: K.x, y: K.y });
      }
      if (P.length === 0) return;
      let G = !1, st = null, H = A, ot = F, J = !1;
      const it = () => {
        st = null;
        const tt = (H - A) / o.viewport.zoom, K = (ot - F) / o.viewport.zoom, { finalDx: q, finalDy: j } = o.computeDragSnap(
          P,
          D,
          tt,
          K,
          J
        ), X = P.map((_) => ({
          id: _.id,
          patch: { x: _.x + q, y: _.y + j }
        }));
        o.updateMany(X);
      }, Y = (tt) => {
        const K = (tt.clientX - A) / o.viewport.zoom, q = (tt.clientY - F) / o.viewport.zoom;
        if (!G)
          if (Math.abs(K) > 2 || Math.abs(q) > 2)
            G = !0, o.pushHistorySnapshot();
          else
            return;
        H = tt.clientX, ot = tt.clientY, J = tt.metaKey || tt.ctrlKey, st === null && (st = requestAnimationFrame(it));
      }, N = () => {
        st !== null && (cancelAnimationFrame(st), it()), o.clearAlignGuides(), C.removeEventListener("pointermove", Y), C.removeEventListener("pointerup", N);
      };
      C.addEventListener("pointermove", Y), C.addEventListener("pointerup", N);
    },
    [o, t.id, s]
  ), w = ct(
    (M) => {
      if (r) {
        if (M.stopPropagation(), t.groupId) {
          const C = [];
          let A = t.groupId;
          for (; A; )
            C.push(A), A = o.groupParent.get(A);
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
  ), b = t.data.fontSize ?? 16, v = t.h === "auto" ? Kd : t.h;
  return /* @__PURE__ */ u(
    "div",
    {
      ref: l,
      "data-node-id": t.id,
      className: r ? void 0 : "sb-block-inert",
      onPointerDown: r ? g : void 0,
      onDoubleClick: w,
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
      children: /* @__PURE__ */ u(
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
          children: s ? /* @__PURE__ */ u(
            "div",
            {
              ref: c,
              contentEditable: !0,
              suppressContentEditableWarning: !0,
              onBlur: y,
              onInput: () => {
                c.current && (d.current = c.current.innerText, h.current && clearTimeout(h.current), h.current = setTimeout(() => {
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
                fontFamily: so(no),
                lineHeight: 1.5,
                color: "#1e1e2e",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                outline: "none",
                minHeight: "100%"
              }
            }
          ) : /* @__PURE__ */ u(
            "div",
            {
              style: {
                fontSize: b,
                fontFamily: so(no),
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
const fa = be(Ud);
function Zd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    fa,
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
const Qd = {
  type: "sticky",
  component: Zd,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, ya = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function Jd(t) {
  const e = t.match(ya);
  return e ? e[1] : null;
}
function $d(t) {
  return ya.test(t);
}
function _d(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function th(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function eh({
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
  }, p = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", h = Math.max(6, 8 / n), f = [
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
              /* @__PURE__ */ u(
                "iframe",
                {
                  src: _d(c.videoId),
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
              !s && /* @__PURE__ */ u(
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
        e && r && !s && f.map((m) => /* @__PURE__ */ u(
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
              width: h,
              height: h,
              marginLeft: -h / 2,
              marginTop: -h / 2,
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
const oh = be(eh);
function rh(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    oh,
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
const nh = {
  type: "youtube",
  component: rh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, sh = [
  Wc,
  Ld,
  Wd,
  Fd,
  Xd,
  jd,
  qd,
  Qd,
  nh
];
function mo(t, e) {
  return `${t}:${e}`;
}
class ih {
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
    return this.values.get(mo(e, o)) ?? null;
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
            mo(d.fromId, d.sourcePort ?? "")
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
      s.direction === "output" && (r[s.id] = this.values.get(mo(e, s.id)) ?? null);
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
            r[s.id] = this.values.get(mo(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, a = !0;
            break;
          }
        }
        a || (r[s.id] = s.defaultValue ?? null);
      } else
        r[s.id] = this.values.get(mo(e, s.id)) ?? null;
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
            this.values.delete(mo(n.id, i.id));
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
          const w = (l.get(g) ?? 1) - 1;
          l.set(g, w), w === 0 && c.push(g);
        }
    }
    const p = new Set(d), h = /* @__PURE__ */ new Set();
    for (const m of s)
      p.has(m) || h.add(m);
    let f = !1;
    return (h.size !== this._cycleNodeIds.size || [...h].some((m) => !this._cycleNodeIds.has(m))) && (this._cycleNodeIds = h, f = !0), { sorted: d, cyclesChanged: f };
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
      const i = mo(e, s.id), a = r[s.id] ?? null, l = this.values.get(i) ?? null;
      ah(l, a) || (this.values.set(i, a), n = !0);
    }
    return n && this.markDownstream(e), n;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function ah(t, e) {
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
const Qo = [
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
function mr(t) {
  return Qo.find((e) => e.key === t) ?? Qo[1];
}
function lh() {
  return {
    staticDefs: /* @__PURE__ */ k("filter", { id: "paper-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.08", numOctaves: 4, seed: 12, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ u("feDiffuseLighting", { in: "bump", lightingColor: "#f7f4ee", surfaceScale: "1.2", diffuseConstant: "1", result: "lit", children: /* @__PURE__ */ u("feDistantLight", { azimuth: "225", elevation: "50" }) }),
      /* @__PURE__ */ u("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ u("feFlood", { floodColor: "#f5f0e8", result: "base" }),
      /* @__PURE__ */ u("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "paper" }),
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.6", numOctaves: 3, seed: 7, stitchTiles: "stitch", result: "grain" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "grain", type: "saturate", values: "0", result: "grain-gray" }),
      /* @__PURE__ */ k("feComponentTransfer", { in: "grain-gray", result: "grain-subtle", children: [
        /* @__PURE__ */ u("feFuncR", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ u("feFuncG", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ u("feFuncB", { type: "linear", slope: "0.06", intercept: "0.47" })
      ] }),
      /* @__PURE__ */ u("feBlend", { in: "paper", in2: "grain-subtle", mode: "overlay", result: "paper-final" })
    ] }),
    staticLayers: [
      /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: "#f5f0e8", filter: "url(#paper-texture)" }, "texture")
    ]
  };
}
function ch() {
  return {
    staticDefs: /* @__PURE__ */ k("filter", { id: "kraft-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.04", numOctaves: 5, seed: 42, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ u("feDiffuseLighting", { in: "bump", lightingColor: "#e0c9a6", surfaceScale: "1.4", diffuseConstant: "0.95", result: "lit", children: /* @__PURE__ */ u("feDistantLight", { azimuth: "200", elevation: "50" }) }),
      /* @__PURE__ */ u("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ u("feFlood", { floodColor: "#d4b896", result: "base" }),
      /* @__PURE__ */ u("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "kraft" }),
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.35", numOctaves: 2, seed: 99, stitchTiles: "stitch", result: "fiber" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "fiber", type: "saturate", values: "0", result: "fiber-gray" }),
      /* @__PURE__ */ k("feComponentTransfer", { in: "fiber-gray", result: "fiber-subtle", children: [
        /* @__PURE__ */ u("feFuncR", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ u("feFuncG", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ u("feFuncB", { type: "linear", slope: "0.06", intercept: "0.47" })
      ] }),
      /* @__PURE__ */ u("feBlend", { in: "kraft", in2: "fiber-subtle", mode: "overlay", result: "kraft-final" })
    ] }),
    staticLayers: [
      /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: "#d4b896", filter: "url(#kraft-texture)" }, "texture")
    ]
  };
}
const Cn = {
  "japanese-stationery": lh,
  kraft: ch
};
function dh(t) {
  var e;
  return ((e = Cn[t]) == null ? void 0 : e.call(Cn)) ?? {};
}
const ga = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, hh = {
  ...ga,
  willChange: "transform"
}, uh = be(function({
  background: e
}) {
  const o = mr(e), { staticDefs: r, staticLayers: n } = dh(e);
  return /* @__PURE__ */ k("svg", { style: hh, children: [
    r && /* @__PURE__ */ u("defs", { children: r }),
    /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    n
  ] });
});
function ph({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: r = !0
}) {
  const n = e * t.zoom, s = t.x % n, i = t.y % n, l = mr(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(uh, { background: o }),
    r && /* @__PURE__ */ k("svg", { style: ga, children: [
      /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ u(
        "pattern",
        {
          id: "grid-dots",
          x: s,
          y: i,
          width: n,
          height: n,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ u("circle", { cx: n / 2, cy: n / 2, r: 1.5, fill: l })
        }
      ) }),
      /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: "url(#grid-dots)" })
    ] })
  ] });
}
const ma = "sb-excalib-index", ys = "sb-excalib-";
function Jr() {
  try {
    const t = localStorage.getItem(ma);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function ba(t) {
  localStorage.setItem(ma, JSON.stringify(t));
}
function fh(t) {
  try {
    const e = localStorage.getItem(ys + t);
    return e ? gs(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function gs(t) {
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
function xa() {
  return Jr();
}
function ms(t) {
  const e = fh(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function bs(t, e) {
  const o = gs(t), r = zt(10), n = o.libraryItems.map((a) => a.name || "Untitled"), s = {
    id: r,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: n
  };
  localStorage.setItem(ys + r, JSON.stringify(o));
  const i = Jr();
  return i.push(s), ba(i), s;
}
function yh(t) {
  localStorage.removeItem(ys + t);
  const e = Jr().filter((o) => o.id !== t);
  ba(e);
}
function gh(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], r = Jr();
  for (const n of r) {
    if (!n.itemNames.some((a) => a.toLowerCase().includes(e)) && !n.name.toLowerCase().includes(e)) continue;
    const i = ms(n.id);
    for (const a of i)
      ((a.name || "").toLowerCase().includes(e) || n.name.toLowerCase().includes(e)) && o.push({ library: n, item: a });
  }
  return o;
}
async function mh(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const r = await o.json();
  if (r.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const n = gs(r);
  return bs(n, { name: e, source: t });
}
const Vn = {
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
}, wa = _n(Vn);
function qt() {
  return fr(wa);
}
function br(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function Co(t) {
  if (t)
    return t * (180 / Math.PI);
}
function ka(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function va(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function Sa(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function Ma(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function Ca(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function bh(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function In(t, e) {
  return {
    id: zt(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: Co(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: ka(t.backgroundColor),
      fillStyle: va(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Sa(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: br(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? bh(t) : void 0
    }
  };
}
function mi(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const r = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Sa(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: br(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [a, l] = o, c = Math.min(a[0], l[0]), d = Math.min(a[1], l[1]), p = Math.max(a[0], l[0]), h = Math.max(a[1], l[1]), f = Math.max(p - c, 1), m = Math.max(h - d, 1);
    return [
      {
        id: zt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + d,
        w: f,
        h: m,
        z: 0,
        rotation: Co(t.angle),
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
    const a = xh(t);
    if (a) return [a];
  }
  const s = zt(10), i = [];
  for (let a = 0; a < o.length - 1; a++) {
    const l = o[a], c = o[a + 1], d = Math.min(l[0], c[0]), p = Math.min(l[1], c[1]), h = Math.max(l[0], c[0]), f = Math.max(l[1], c[1]), m = Math.max(h - d, 1), y = Math.max(f - p, 1), g = a === o.length - 2;
    i.push({
      id: zt(10),
      type: "shape",
      x: t.x + d,
      y: t.y + p,
      w: m,
      h: y,
      z: 0,
      rotation: Co(t.angle),
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
function xh(t) {
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
    rotation: Co(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: br(t.opacity ?? 100),
      fill: ka(t.backgroundColor),
      fillStyle: va(t.fillStyle)
    }
  };
}
function wh(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, r = t.simulatePressure !== !1, n = e.map((d, p) => {
    const h = !r && o && p < o.length ? o[p] : 0.5;
    return [d[0], d[1], h];
  });
  let s = 1 / 0, i = 1 / 0, a = -1 / 0, l = -1 / 0;
  for (const [d, p] of n)
    d < s && (s = d), p < i && (i = p), d > a && (a = d), p > l && (l = p);
  isFinite(s) || (s = 0, i = 0, a = 0, l = 0);
  const c = n.map(
    ([d, p, h]) => [d - s, p - i, h]
  );
  return {
    id: zt(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(a - s, 1),
    h: Math.max(l - i, 1),
    z: 0,
    rotation: Co(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: br(t.opacity ?? 100)
    }
  };
}
function kh(t) {
  return {
    id: zt(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: Co(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: Ma(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Ca(t.textAlign),
      opacity: br(t.opacity ?? 100)
    }
  };
}
function vh(t) {
  return {
    id: zt(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: Co(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function Ia(t) {
  return Sh(t.elements);
}
function Sh(t) {
  const e = [], o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && n.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [In(s, "rect")];
        break;
      case "ellipse":
        i = [In(s, "ellipse")];
        break;
      case "diamond":
        i = [In(s, "diamond")];
        break;
      case "arrow":
        i = mi(s, !0);
        break;
      case "line":
        i = mi(s, !1);
        break;
      case "freedraw": {
        const a = wh(s);
        a && (i = [a]);
        break;
      }
      case "text":
        i = [kh(s)];
        break;
      case "frame":
      case "magicframe":
        i = [vh(s)];
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
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = Ma(i.fontFamily), c.labelAlign = Ca(i.textAlign);
  }
  return Mh(t, e, o, r), Ch(e), { nodes: e, groupParent: r };
}
function Mh(t, e, o, r) {
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
function Ch(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const r of t)
    r.x < e && (e = r.x), r.y < o && (o = r.y);
  if (isFinite(e))
    for (const r of t)
      r.x -= e, r.y -= o;
}
function xs(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const p of t) {
    const h = p.h === "auto" ? 40 : p.h;
    o = Math.min(o, p.x), r = Math.min(r, p.y), n = Math.max(n, p.x + p.w), s = Math.max(s, p.y + h);
  }
  const i = n - o || 1, a = s - r || 1, l = 4, c = `${o - l} ${r - l} ${i + l * 2} ${a + l * 2}`, d = [];
  for (const p of t)
    switch (p.type) {
      case "shape":
        d.push(Ih(p));
        break;
      case "draw":
        d.push(zh(p));
        break;
      case "text":
        d.push(Th(p));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${d.join("")}</svg>`;
}
function za(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Ih(t) {
  var h, f, m, y;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, r = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: co(e.strokeStyle),
    seed: t.id
  }, n = ((h = e.startPoint) == null ? void 0 : h[0]) ?? 0, s = ((f = e.startPoint) == null ? void 0 : f[1]) ?? o / 2, i = ((m = e.endPoint) == null ? void 0 : m[0]) ?? t.w, a = ((y = e.endPoint) == null ? void 0 : y[1]) ?? o / 2;
  let l;
  switch (e.shape) {
    case "rect":
      l = jr(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "ellipse":
      l = hs(t.x + t.w / 2, t.y + o / 2, t.w, o, r);
      break;
    case "diamond":
      l = us(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "line":
      l = Zo(t.x + n, t.y + s, t.x + i, t.y + a, r);
      break;
    case "arrow":
      l = ps(t.x + n, t.y + s, t.x + i, t.y + a, r);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, d = c < 1 ? `<g opacity="${c}">` : "<g>", p = l.map(
    (g) => `<path d="${za(g.d)}" fill="${g.fill || "none"}" stroke="${g.stroke}" stroke-width="${g.strokeWidth}"${g.strokeDasharray ? ` stroke-dasharray="${g.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${d}${p.join("")}</g>`;
}
function zh(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), r = e.opacity ?? 1, n = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${n}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${r < 1 ? ` opacity="${r}"` : ""}/>`;
}
function Th(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), r = e.opacity ?? 1, n = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${r < 1 ? ` opacity="${r}"` : ""}>${za(n)}</text>`;
}
const Ta = "sb-personal-library";
function ws() {
  try {
    const t = localStorage.getItem(Ta);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Pa(t) {
  localStorage.setItem(Ta, JSON.stringify(t));
}
function Aa() {
  return ws();
}
function Ph(t, e, o) {
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
  }, a = ws();
  return a.unshift(i), Pa(a), i;
}
function Ah(t) {
  const e = ws().filter((o) => o.id !== t);
  Pa(e);
}
const Ea = {
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
}, Ra = _n({
  dir: "ltr",
  isRTL: !1,
  labels: Ea
});
function Eh(t) {
  var e;
  return t === "rtl" || t === "ltr" ? t : typeof document < "u" && ((e = document.dir) == null ? void 0 : e.toLowerCase()) === "rtl" ? "rtl" : "ltr";
}
function Rh(t, e) {
  return Vt(() => {
    const o = Eh(t);
    return {
      dir: o,
      isRTL: o === "rtl",
      labels: { ...Ea, ...e ?? {} }
    };
  }, [t, e]);
}
function Yt() {
  return fr(Ra);
}
function La(t, e, o, r) {
  const { nodes: n, groupParent: s } = Ia(e);
  if (n.length === 0) return;
  const i = structuredClone(n), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (const b of i) {
    const v = zt(10);
    a.set(b.id, v), b.id = v;
  }
  for (const b of i)
    b.groupId && (l.has(b.groupId) || l.set(b.groupId, zt(10)), b.groupId = l.get(b.groupId));
  let c = 1 / 0, d = 1 / 0, p = -1 / 0, h = -1 / 0;
  for (const b of i) {
    const v = b.h === "auto" ? 100 : b.h;
    c = Math.min(c, b.x), d = Math.min(d, b.y), p = Math.max(p, b.x + b.w), h = Math.max(h, b.y + v);
  }
  const f = o ?? window.innerWidth / 2, m = r ?? window.innerHeight / 2, y = t.screenToCanvas(f, m), g = y.x - (c + p) / 2, w = y.y - (d + h) / 2;
  for (const b of i)
    b.x += g, b.y += w, b.z = t.nextZ();
  t.addNodes(i);
  for (const [b, v] of s) {
    const M = l.get(b) ?? b, C = l.get(v) ?? v;
    t.groupParent.set(M, C);
  }
  t.selectMultiple(i.map((b) => b.id));
}
const qn = "application/x-spatialboard-library-item", Kn = "application/x-spatialboard-personal-item";
function Da(t, e, o, r) {
  if (e.nodes.length === 0) return;
  const n = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const g of n) {
    const w = zt(10);
    s.set(g.id, w), g.id = w;
  }
  for (const g of n)
    g.groupId && (i.has(g.groupId) || i.set(g.groupId, zt(10)), g.groupId = i.get(g.groupId));
  for (const g of n)
    if (g.type === "edge") {
      const w = g.data;
      w.fromId && s.has(w.fromId) && (w.fromId = s.get(w.fromId)), w.toId && s.has(w.toId) && (w.toId = s.get(w.toId));
    }
  let a = 1 / 0, l = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (const g of n) {
    const w = g.h === "auto" ? 100 : g.h;
    a = Math.min(a, g.x), l = Math.min(l, g.y), c = Math.max(c, g.x + g.w), d = Math.max(d, g.y + w);
  }
  const p = o ?? window.innerWidth / 2, h = r ?? window.innerHeight / 2, f = t.screenToCanvas(p, h), m = f.x - (a + c) / 2, y = f.y - (l + d) / 2;
  for (const g of n)
    g.x += m, g.y += y, g.z = t.nextZ();
  t.addNodes(n);
  for (const [g, w] of e.groupParent) {
    const b = i.get(g) ?? g, v = i.get(w) ?? w;
    t.groupParent.set(b, v);
  }
  t.selectMultiple(n.map((g) => g.id));
}
const Jo = /* @__PURE__ */ new Map();
function Lh({ item: t }) {
  const e = Vt(() => {
    const o = Jo.get(t.id);
    if (o) return o;
    const { nodes: r } = Ia(t), n = xs(r, 56);
    return Jo.set(t.id, n), n;
  }, [t.id]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Wa({
  item: t,
  libId: e,
  onClick: o,
  theme: r
}) {
  const { labels: n } = Yt(), s = ct(
    (i) => {
      i.dataTransfer.setData(
        qn,
        JSON.stringify({ libraryId: e, itemId: t.id })
      ), i.dataTransfer.effectAllowed = "copy";
    },
    [e, t.id]
  );
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ u(Lh, { item: t })
    }
  );
}
function Dh({ nodes: t }) {
  const e = Vt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), r = Jo.get(o);
    if (r) return r;
    const n = xs(t, 56);
    return Jo.set(o, n), n;
  }, [t]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Ba({
  item: t,
  onClick: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = Yt(), [s, i] = $(!1), a = ct(
    (l) => {
      l.dataTransfer.setData(
        Kn,
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
        /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(Dh, { nodes: t.nodes })
          }
        ),
        s && /* @__PURE__ */ u(
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
function Wh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  onBrowseDirectory: n
}) {
  const s = qt(), { labels: i } = Yt(), a = dt(null), l = dt(null), [c, d] = $([]), [p, h] = $([]), [f, m] = $(""), [y, g] = $(/* @__PURE__ */ new Set()), w = ct(() => {
    d(xa()), h(Aa());
  }, []);
  bt(() => {
    e && w();
  }, [e, w]), bt(() => {
    if (!e) return;
    const P = (G) => {
      a.current && !a.current.contains(G.target) && o();
    };
    return document.addEventListener("pointerdown", P), () => document.removeEventListener("pointerdown", P);
  }, [e, o]);
  const b = ct(
    (P) => {
      var H;
      const G = (H = P.target.files) == null ? void 0 : H[0];
      if (!G) return;
      const st = new FileReader();
      st.onload = () => {
        try {
          const ot = JSON.parse(st.result);
          if (ot.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const J = G.name.replace(/\.excalidrawlib$/, "");
          bs(ot, { name: J }), w();
        } catch (ot) {
          console.error("Failed to parse library file:", ot);
        }
      }, st.readAsText(G), P.target.value = "";
    },
    [w]
  ), v = ct(
    (P) => {
      yh(P), Jo.clear(), w();
    },
    [w]
  ), M = ct(
    (P) => {
      La(t, P);
    },
    [t]
  ), C = ct(
    (P) => {
      Da(t, P);
    },
    [t]
  ), A = ct(
    (P) => {
      Ah(P), Jo.clear(), w();
    },
    [w]
  ), F = ct((P) => {
    g((G) => {
      const st = new Set(G);
      return st.has(P) ? st.delete(P) : st.add(P), st;
    });
  }, []), D = Vt(() => {
    if (!f.trim()) return null;
    const P = f.toLowerCase(), G = gh(f), st = p.filter(
      (H) => H.name.toLowerCase().includes(P)
    );
    return { excalidraw: G, personal: st };
  }, [f, p]);
  return !e || !r ? null : qe(
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
        onPointerDown: (P) => P.stopPropagation(),
        children: [
          /* @__PURE__ */ k("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                placeholder: i.librariesSearchPlaceholder,
                value: f,
                onChange: (P) => m(P.target.value),
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
          /* @__PURE__ */ u(
            "div",
            {
              style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "4px 12px"
              },
              children: D !== null ? D.excalidraw.length === 0 && D.personal.length === 0 ? /* @__PURE__ */ u(
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
                    D.personal.map((P) => /* @__PURE__ */ u(
                      Ba,
                      {
                        item: P,
                        onClick: () => C(P),
                        onRemove: () => A(P.id),
                        theme: s
                      },
                      P.id
                    )),
                    D.excalidraw.map(({ library: P, item: G }) => /* @__PURE__ */ u(
                      Wa,
                      {
                        item: G,
                        libId: P.id,
                        onClick: () => M(G),
                        theme: s
                      },
                      G.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ k(gt, { children: [
                p.length > 0 && /* @__PURE__ */ u(
                  Fh,
                  {
                    items: p,
                    onPlace: C,
                    onRemove: A,
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
                      /* @__PURE__ */ u("br", {}),
                      i.librariesImportHint,
                      /* @__PURE__ */ u("br", {}),
                      i.librariesBrowseHint
                    ]
                  }
                ) : c.map((P) => {
                  const G = y.has(P.id);
                  return /* @__PURE__ */ u(
                    Bh,
                    {
                      lib: P,
                      expanded: G,
                      onToggle: () => F(P.id),
                      onPlace: M,
                      onUninstall: () => v(P.id),
                      theme: s
                    },
                    P.id
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
                /* @__PURE__ */ u(
                  "button",
                  {
                    onClick: () => {
                      var P;
                      return (P = l.current) == null ? void 0 : P.click();
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
                /* @__PURE__ */ u(
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
          /* @__PURE__ */ u(
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
function Bh({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: r,
  onUninstall: n,
  theme: s
}) {
  const { labels: i } = Yt(), [a, l] = $(null);
  return bt(() => {
    e && a === null && l(ms(t.id));
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
          /* @__PURE__ */ u(
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
              children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ u(
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
          /* @__PURE__ */ u(
            "span",
            {
              style: {
                fontSize: 9,
                color: s.textDisabled
              },
              children: t.itemCount
            }
          ),
          /* @__PURE__ */ u(
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
    e && a && /* @__PURE__ */ u(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: a.map((c) => /* @__PURE__ */ u(
          Wa,
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
function Fh({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = Yt(), [s, i] = $(!0);
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
          /* @__PURE__ */ u(
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
              children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ u(
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
          /* @__PURE__ */ u(
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
    s && /* @__PURE__ */ u(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: t.map((a) => /* @__PURE__ */ u(
          Ba,
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
async function Nh(t, e, o = 1, r = 20, n) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${r}`;
  return (await fetch(s, { signal: n, credentials: "include" })).json();
}
async function bi(t, e = 1, o = 20, r) {
  const n = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(n, { signal: r, credentials: "include" })).json();
}
const Un = "application/x-spatialboard-gif-item";
function Fa(t, e, o, r) {
  const n = e.file.hd.gif, s = 400, i = 300;
  let a = n.width, l = n.height;
  const c = Math.min(1, s / a, i / l);
  a = Math.round(a * c), l = Math.round(l * c);
  const d = o ?? window.innerWidth / 2, p = r ?? window.innerHeight / 2, h = t.screenToCanvas(d, p), f = {
    id: zt(10),
    type: "image",
    x: h.x - a / 2,
    y: h.y - l / 2,
    w: a,
    h: l,
    z: t.nextZ(),
    data: { src: n.url }
  };
  t.addNode(f), t.select(f.id);
}
function Hh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  baseUrl: n
}) {
  const s = qt(), { labels: i } = Yt(), a = dt(null), l = dt(null), [c, d] = $(""), [p, h] = $([]), [f, m] = $(!1), [y, g] = $(1), [w, b] = $(!1), v = dt();
  bt(() => {
    if (!e) return;
    const D = (P) => {
      a.current && !a.current.contains(P.target) && o();
    };
    return document.addEventListener("pointerdown", D), () => document.removeEventListener("pointerdown", D);
  }, [e, o]), bt(() => {
    if (!e || c.trim()) return;
    const D = new AbortController();
    return m(!0), bi(n, 1, 30, D.signal).then((P) => {
      h(P.data.data.filter((G) => G.type !== "ad")), g(1), b(P.data.has_next);
    }).catch(() => {
    }).finally(() => m(!1)), () => D.abort();
  }, [e, n, c]);
  const M = ct(
    (D, P, G) => {
      if (!D.trim()) return;
      const st = new AbortController();
      return m(!0), Nh(n, D, P, 30, st.signal).then((H) => {
        const ot = H.data.data.filter((J) => J.type !== "ad");
        h((J) => G ? [...J, ...ot] : ot), g(P), b(H.data.has_next);
      }).catch(() => {
      }).finally(() => m(!1)), st;
    },
    [n]
  ), C = ct(
    (D) => {
      if (d(D), v.current && clearTimeout(v.current), !D.trim()) {
        h([]), g(1), b(!1);
        return;
      }
      v.current = setTimeout(() => {
        M(D, 1, !1);
      }, 350);
    },
    [M]
  ), A = ct(() => {
    const D = l.current;
    !D || f || !w || D.scrollTop + D.clientHeight >= D.scrollHeight - 100 && (c.trim() ? M(c, y + 1, !0) : (m(!0), bi(n, y + 1, 30).then((P) => {
      const G = P.data.data.filter((st) => st.type !== "ad");
      h((st) => [...st, ...G]), g(y + 1), b(P.data.has_next);
    }).catch(() => {
    }).finally(() => m(!1))));
  }, [f, w, c, y, M, n]), F = ct(
    (D) => {
      Fa(t, D);
    },
    [t]
  );
  return !e || !r ? null : qe(
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
        onPointerDown: (D) => D.stopPropagation(),
        children: [
          /* @__PURE__ */ k("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                placeholder: i.gifSearchPlaceholder,
                value: c,
                onChange: (D) => C(D.target.value),
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
              onScroll: A,
              style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "4px 12px",
                minHeight: 200
              },
              children: [
                p.length === 0 && !f ? /* @__PURE__ */ u(
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
                ) : /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 4
                    },
                    children: p.map((D) => /* @__PURE__ */ u(
                      Oh,
                      {
                        item: D,
                        onClick: () => F(D),
                        engine: t,
                        theme: s
                      },
                      D.id
                    ))
                  }
                ),
                f && /* @__PURE__ */ u(
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
          /* @__PURE__ */ u(
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
function Oh({
  item: t,
  onClick: e,
  engine: o,
  theme: r
}) {
  const n = t.file.sm.webp, s = n.width / n.height, i = ct(
    (a) => {
      a.dataTransfer.setData(Un, JSON.stringify(t)), a.dataTransfer.effectAllowed = "copy";
    },
    [t]
  );
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ u(
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
function Xh({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [r, n] = $(""), s = dt(null), i = dt(null);
  bt(() => {
    var p;
    (p = s.current) == null || p.focus();
  }, []);
  const a = Vt(() => xs(t, 56), [t]), l = ct(() => {
    e(r.trim() || "Untitled");
  }, [r, e]), c = ct(
    (p) => {
      p.key === "Enter" ? (p.preventDefault(), l()) : p.key === "Escape" && (p.preventDefault(), o());
    },
    [l, o]
  ), d = ct(
    (p) => {
      i.current && !i.current.contains(p.target) && o();
    },
    [o]
  );
  return qe(
    /* @__PURE__ */ u(
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
              /* @__PURE__ */ u(
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
              /* @__PURE__ */ u(
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
                  children: /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: a } })
                }
              ),
              /* @__PURE__ */ u(
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
                /* @__PURE__ */ u(
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
                /* @__PURE__ */ u(
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
function Zn(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function Gh(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Na(t, e, o, r) {
  return new Promise((n) => {
    const s = Gh(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, d = i.naturalHeight || 200;
      if (c <= 1 || d <= 1) {
        const p = t.match(/viewBox=["']([^"']+)["']/i);
        if (p) {
          const h = p[1].trim().split(/[\s,]+/).map(Number);
          h.length === 4 && h[2] > 0 && h[3] > 0 && (c = h[2], d = h[3]);
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
async function Yh(t, e, o, r) {
  const { x: n, y: s } = t.screenToCanvas(o, r), i = await Na(e, n, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
const xi = {
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
}, jh = be(function({
  node: e,
  zoom: o,
  showHandles: r = !0,
  measuredHeights: n,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const a = e.h === "auto" ? (n == null ? void 0 : n[e.id]) ?? 100 : e.h, l = e.rotation || 0, c = e.x + e.w / 2, d = e.y + a / 2, p = 8 / o, h = p / 2, f = 25 / o, m = !!e.locked, y = [
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
    /* @__PURE__ */ u(
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
      const g = 16 / o, w = e.x + e.w - g - 4 / o, b = e.y - g - 4 / o;
      return /* @__PURE__ */ k("g", { transform: `translate(${w}, ${b})`, children: [
        /* @__PURE__ */ u(
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
          /* @__PURE__ */ u("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ u("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    r && !m && y.map(({ pos: g, cx: w, cy: b }) => /* @__PURE__ */ u(
      "rect",
      {
        x: w - h,
        y: b - h,
        width: p,
        height: p,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: Zr(g, l),
          pointerEvents: "auto"
        },
        onPointerDown: (v) => {
          v.stopPropagation(), s == null || s(e.id, g, v);
        }
      },
      g
    )),
    r && !m && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u(
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
      /* @__PURE__ */ u(
        "rect",
        {
          x: e.x + e.w / 2 - h,
          y: e.y - f - h,
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
}), Vh = be(function({
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
  cycleNodeIds: h
}) {
  const f = e.data.edgeType || "bezier";
  let m, y;
  if (a && e.data.sourcePort) {
    const ft = a.get(o.type);
    ft != null && ft.ports && (m = ur(o, ft.ports, e.data.sourcePort, n.zoom, i) ?? void 0);
  }
  if (a && e.data.targetPort) {
    const ft = a.get(r.type);
    ft != null && ft.ports && (y = ur(r, ft.ports, e.data.targetPort, n.zoom, i) ?? void 0);
  }
  const g = Ye(
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
  ), { path: w, x1: b, y1: v, x2: M, y2: C, labelX: A, labelY: F, arrowAngle: D, tailAngle: P, kinkHandle: G } = g, st = s.has(e.id), H = e.data.strokeWidth, ot = e.data.style === "dashed" ? `${8 * H},${4 * H}` : e.data.style === "dotted" ? `${2 * H},${3 * H}` : void 0, J = Math.max(8, H * 3), it = e.data.arrowHeadSize ?? J, Y = e.data.arrowTailSize ?? J, N = e.data.animated, tt = p == null ? void 0 : p.has(e.id), K = (d == null ? void 0 : d.edgeId) === e.id, q = !!(h && h.size > 0 && e.data.sourcePort && e.data.targetPort && h.has(e.data.fromId) && h.has(e.data.toId)), j = q ? "#ef4444" : e.data.color, X = e.data.roughness ?? 0, _ = Vt(() => X <= 0 ? null : {
    stroke: j,
    roughness: X,
    strokeWidth: H,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [j, X, H, e.data.style, e.id]);
  let Q = null, lt = null, ht = null;
  _ && (Q = Mn(w, _), e.data.arrowHead === "arrow" && (lt = Mn(qo(M, C, D, it), { ..._, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (ht = Mn(qo(b, v, P, Y), { ..._, strokeLineDash: void 0 })));
  const St = Vt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), vt = Vt(() => {
    if (!N) return;
    const ft = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", Lt = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", rt = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${ft} ${Lt} ${rt} infinite` };
  }, [N, e.data.animatedDirection]), Mt = Vt(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), xt = Vt(
    () => tt ? { filter: "saturate(0)" } : void 0,
    [tt]
  );
  return /* @__PURE__ */ k("g", { opacity: K ? 0.15 : tt ? 0.25 : void 0, style: xt, children: [
    q && /* @__PURE__ */ u(
      "path",
      {
        d: w,
        stroke: "#ef4444",
        strokeWidth: H + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: St
      }
    ),
    st && /* @__PURE__ */ u(
      "path",
      {
        d: w,
        stroke: "#3b82f6",
        strokeWidth: H + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    Q ? Q.map((ft, Lt) => /* @__PURE__ */ u(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeDasharray: ft.strokeDasharray,
        strokeLinecap: "round",
        fill: ft.fill ?? "none",
        style: N ? vt : void 0
      },
      Lt
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: w,
        stroke: j,
        strokeWidth: H,
        strokeDasharray: N ? "12,8" : q ? `${6 * H},${4 * H}` : ot,
        strokeLinecap: "round",
        fill: "none",
        style: q ? Mt : vt
      }
    ),
    e.data.arrowHead === "arrow" && (lt ? lt.map((ft, Lt) => /* @__PURE__ */ u(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ft.fill ?? "none"
      },
      `ah${Lt}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: qo(M, C, D, it),
        fill: "none",
        stroke: j,
        strokeWidth: H,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: Hr(M, C, D, it),
        fill: j,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: M,
        cy: C,
        r: it * 0.25,
        fill: j
      }
    ),
    e.data.arrowTail === "arrow" && (ht ? ht.map((ft, Lt) => /* @__PURE__ */ u(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ft.fill ?? "none"
      },
      `at${Lt}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: qo(b, v, P, Y),
        fill: "none",
        stroke: j,
        strokeWidth: H,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: Hr(b, v, P, Y),
        fill: j,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: b,
        cy: v,
        r: Y * 0.25,
        fill: j
      }
    ),
    e.data.label && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u(
        "rect",
        {
          x: A - (e.data.label.length * 3.5 + 6) / n.zoom,
          y: F - 8 / n.zoom,
          width: (e.data.label.length * 7 + 12) / n.zoom,
          height: 16 / n.zoom,
          fill: "white",
          rx: 4 / n.zoom,
          opacity: 0.9
        }
      ),
      /* @__PURE__ */ u(
        "text",
        {
          x: A,
          y: F + 4 / n.zoom,
          fill: j,
          fontSize: 12 / n.zoom,
          textAnchor: "middle",
          style: { pointerEvents: "none" },
          children: e.data.label
        }
      )
    ] }),
    st && !K && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u(
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
      /* @__PURE__ */ u(
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
    st && !K && G && /* @__PURE__ */ u(
      "circle",
      {
        cx: G.x,
        cy: G.y,
        r: 5 / n.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / n.zoom,
        style: {
          cursor: G.axis === "xy" ? "move" : G.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (ft) => {
          ft.stopPropagation(), c == null || c(e.id, G.axis, G.min, G.max, ft);
        }
      }
    )
  ] });
});
function qh({
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
  edgePreview: h,
  edgeReconnect: f,
  eraserMarkedIds: m,
  eraserTrail: y,
  laserTrail: g,
  mode: w,
  hoveredNodeId: b,
  registry: v,
  onPortHandleDown: M,
  cycleNodeIds: C,
  containerTypes: A,
  alignGuides: F
}) {
  const D = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, P = t.filter(
    (H) => H.type !== "edge" && H.type !== "content" && H.type !== "image"
  ), G = t.filter((H) => H.type === "edge").sort((H, ot) => H.z - ot.z), st = Vt(() => new Map(t.map((H) => [H.id, H])), [t]);
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ k("g", { transform: D, children: [
        G.map((H) => {
          const ot = st.get(H.data.fromId), J = st.get(H.data.toId);
          return !ot || !J ? null : /* @__PURE__ */ u(
            Vh,
            {
              edge: H,
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
            H.id
          );
        }),
        (() => {
          var K, q;
          const H = !!h || !!f, ot = (h == null ? void 0 : h.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, J = (h == null ? void 0 : h.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, it = (h == null ? void 0 : h.fromNode.id) ?? (f == null ? void 0 : f.anchorNodeId) ?? null;
          let Y = null, N = null;
          const tt = /* @__PURE__ */ new Set();
          if (H) {
            let j = 1 / 0, X = !1;
            const _ = 50 / e.zoom;
            for (const Q of t) {
              if (Q.type === "edge" || Q.id === it || (q = (K = v == null ? void 0 : v.get(Q.type)) == null ? void 0 : K.ports) != null && q.length) continue;
              const lt = Q.h === "auto" ? (r == null ? void 0 : r[Q.id]) ?? 100 : Q.h, ht = Q.w * 0.2, St = lt * 0.2;
              ot >= Q.x - ht && ot <= Q.x + Q.w + ht && J >= Q.y - St && J <= Q.y + lt + St && tt.add(Q.id);
              const vt = Uo(Q, r), Mt = A ? A.has(Q.type) : Q.type === "frame";
              for (const xt of vt) {
                const ft = Math.hypot(xt.x - ot, xt.y - J);
                ft >= _ || Mt && !X && Y || (!Mt && X || ft < j) && (j = ft, X = Mt, Y = Q.id, N = xt.side);
              }
            }
          }
          return t.filter((j) => {
            var X, _;
            return j.type === "edge" || (_ = (X = v == null ? void 0 : v.get(j.type)) == null ? void 0 : X.ports) != null && _.length ? !1 : o.size <= 1 && o.has(j.id) || H && (j.id === it || tt.has(j.id));
          }).map((j) => {
            const X = Uo(j, r), _ = 4 / e.zoom, Q = 26 / e.zoom, lt = j.rotation || 0, ht = j.h === "auto" ? (r == null ? void 0 : r[j.id]) ?? 100 : j.h, St = j.x + j.w / 2, vt = j.y + ht / 2, Mt = h && h.fromNode.id === j.id || f && f.anchorNodeId === j.id, xt = o.has(j.id) && !H;
            return /* @__PURE__ */ u("g", { transform: lt ? `rotate(${lt}, ${St}, ${vt})` : void 0, children: X.map(({ side: ft }) => {
              const Lt = {
                top: [j.x + j.w / 2, j.y],
                bottom: [j.x + j.w / 2, j.y + ht],
                left: [j.x, j.y + ht / 2],
                right: [j.x + j.w, j.y + ht / 2]
              }, [rt, Et] = Lt[ft], Kt = ft === "top" && o.has(j.id) ? 42 / e.zoom : Q;
              let Ut = rt, oe = Et;
              switch (ft) {
                case "top":
                  oe = Et - Kt;
                  break;
                case "bottom":
                  oe = Et + Kt;
                  break;
                case "left":
                  Ut = rt - Kt;
                  break;
                case "right":
                  Ut = rt + Kt;
                  break;
              }
              const ie = H && Y === j.id && N === ft;
              return /* @__PURE__ */ u(
                "circle",
                {
                  cx: Ut,
                  cy: oe,
                  r: ie ? 5 / e.zoom : _,
                  fill: Mt || ie ? "#3b82f6" : "white",
                  stroke: ie ? "white" : H && !Mt ? "#3b82f6" : "#94a3b8",
                  strokeWidth: 1.5 / e.zoom,
                  opacity: ie || H && !Mt ? 1 : 0.8,
                  style: {
                    cursor: xt ? "crosshair" : "default",
                    pointerEvents: xt ? "auto" : "none"
                  },
                  onPointerDown: xt ? (ve) => {
                    ve.stopPropagation(), c == null || c(j.id, ft, ve);
                  } : void 0
                },
                `ch-${j.id}-${ft}`
              );
            }) }, `conn-${j.id}`);
          });
        })(),
        v && (() => {
          var K;
          const H = !!h || !!f, ot = (h == null ? void 0 : h.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, J = (h == null ? void 0 : h.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, it = (h == null ? void 0 : h.fromNode.id) ?? null, Y = (h == null ? void 0 : h.sourceDirection) === "output" ? "input" : (h == null ? void 0 : h.sourceDirection) === "input" ? "output" : null;
          let N = null, tt = null;
          if (H && Y) {
            let q = 40 / e.zoom;
            for (const j of t) {
              if (j.type === "edge" || j.id === it) continue;
              const X = v.get(j.type);
              if (!((K = X == null ? void 0 : X.ports) != null && K.length)) continue;
              const _ = j.h === "auto" ? (r == null ? void 0 : r[j.id]) ?? 100 : j.h, Q = 14 / e.zoom, lt = X.ports.filter((ht) => ht.direction === Y);
              for (let ht = 0; ht < lt.length; ht++) {
                const St = lt[ht], vt = j.y + _ / (lt.length + 1) * (ht + 1), Mt = St.direction === "input" ? j.x - Q : j.x + j.w + Q, xt = Math.hypot(Mt - ot, vt - J);
                xt < q && (q = xt, N = j.id, tt = St.id);
              }
            }
          }
          return t.filter((q) => {
            var X;
            if (q.type === "edge") return !1;
            const j = v.get(q.type);
            return !!((X = j == null ? void 0 : j.ports) != null && X.length);
          }).map((q) => {
            const X = v.get(q.type).ports, _ = q.h === "auto" ? (r == null ? void 0 : r[q.id]) ?? 100 : q.h, Q = q.rotation || 0, lt = q.x + q.w / 2, ht = q.y + _ / 2, St = 6 / e.zoom, vt = 14 / e.zoom, Mt = X.filter((Et) => Et.direction === "input"), xt = X.filter((Et) => Et.direction === "output"), ft = !H, Lt = (Et, Kt, Ut, oe) => {
              const ie = q.y + _ / (Ut.length + 1) * (Kt + 1), ve = oe === "input" ? q.x - vt : q.x + q.w + vt, He = xi[Et.dataType] || xi.any, xe = N === q.id && tt === Et.id, To = xe ? 8 / e.zoom : St, ue = oe === "input" ? q.x : q.x + q.w, le = oe === "input" ? ve - St - 4 / e.zoom : ve + St + 4 / e.zoom;
              return /* @__PURE__ */ k("g", { children: [
                /* @__PURE__ */ u(
                  "line",
                  {
                    x1: ve,
                    y1: ie,
                    x2: ue,
                    y2: ie,
                    stroke: He,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                xe && /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: ve,
                    cy: ie,
                    r: 12 / e.zoom,
                    fill: "none",
                    stroke: "white",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.3,
                    style: { pointerEvents: "none" }
                  }
                ),
                /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: ve,
                    cy: ie,
                    r: To,
                    fill: xe ? "white" : He,
                    stroke: xe ? He : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: ft ? "crosshair" : "default",
                      pointerEvents: ft ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: ft ? (Re) => {
                      Re.stopPropagation(), M == null || M(q.id, Et.id, oe, Re);
                    } : void 0
                  }
                ),
                (() => {
                  const Re = Et.label || Et.id, Ke = 9 / e.zoom, ne = 5 / e.zoom, Oe = 2.5 / e.zoom, Bt = Re.length * Ke * 0.62 + ne * 2, uo = Ke + Oe * 2, po = oe === "input" ? le - Bt : le, Po = ie - uo / 2, S = uo / 2, ut = xe ? He : "#1a1a2e", $t = xe ? He : "#2a2a40", se = xe ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ k("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ u(
                      "rect",
                      {
                        x: po,
                        y: Po,
                        width: Bt,
                        height: uo,
                        rx: S,
                        ry: S,
                        fill: ut,
                        fillOpacity: xe ? 0.9 : 0.85,
                        stroke: $t,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ u(
                      "text",
                      {
                        x: po + Bt / 2,
                        y: ie + Ke * 0.35,
                        fill: se,
                        fontSize: Ke,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: Re
                      }
                    )
                  ] });
                })()
              ] }, `port-${q.id}-${Et.id}`);
            }, rt = C == null ? void 0 : C.has(q.id);
            return /* @__PURE__ */ k("g", { transform: Q ? `rotate(${Q}, ${lt}, ${ht})` : void 0, children: [
              Mt.map((Et, Kt) => Lt(Et, Kt, Mt, "input")),
              xt.map((Et, Kt) => Lt(Et, Kt, xt, "output")),
              rt && (() => {
                const Et = 10 / e.zoom, Kt = q.x + q.w + Et * 0.3, Ut = q.y - Et * 0.3;
                return /* @__PURE__ */ k("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: Kt,
                      cy: Ut,
                      r: Et,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ u(
                    "text",
                    {
                      x: Kt,
                      y: Ut + 4 / e.zoom,
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
        h && (() => {
          let H, ot;
          if (h.sourcePort && v) {
            const J = h.fromNode, it = v.get(J.type), Y = it != null && it.ports ? ur(J, it.ports, h.sourcePort, e.zoom, r) : null;
            if (Y)
              H = Y.x, ot = Y.y;
            else {
              const N = yn(J, h.cursorX, h.cursorY, r);
              H = N.x, ot = N.y;
            }
          } else if (h.sourceHandle) {
            const J = h.fromNode, it = J.h === "auto" ? (r == null ? void 0 : r[J.id]) ?? 100 : J.h, Y = {
              top: [J.x + J.w / 2, J.y],
              bottom: [J.x + J.w / 2, J.y + it],
              left: [J.x, J.y + it / 2],
              right: [J.x + J.w, J.y + it / 2]
            }, N = h.sourceHandle, tt = N === "top" ? 42 / e.zoom : 26 / e.zoom, [K, q] = Y[N];
            let j = K, X = q;
            switch (N) {
              case "top":
                X = q - tt;
                break;
              case "bottom":
                X = q + tt;
                break;
              case "left":
                j = K - tt;
                break;
              case "right":
                j = K + tt;
                break;
            }
            if (J.rotation) {
              const _ = J.x + J.w / 2, Q = J.y + it / 2, lt = J.rotation * Math.PI / 180, ht = Math.cos(lt), St = Math.sin(lt), vt = j - _, Mt = X - Q;
              H = _ + vt * ht - Mt * St, ot = Q + vt * St + Mt * ht;
            } else
              H = j, ot = X;
          } else {
            const J = yn(h.fromNode, h.cursorX, h.cursorY, r);
            H = J.x, ot = J.y;
          }
          return /* @__PURE__ */ u(
            "line",
            {
              x1: H,
              y1: ot,
              x2: h.cursorX,
              y2: h.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        f && (() => {
          const H = st.get(f.anchorNodeId);
          if (!H) return null;
          let ot, J;
          if (f.anchorHandle) {
            const it = H.h === "auto" ? (r == null ? void 0 : r[H.id]) ?? 100 : H.h, Y = {
              top: [H.x + H.w / 2, H.y],
              bottom: [H.x + H.w / 2, H.y + it],
              left: [H.x, H.y + it / 2],
              right: [H.x + H.w, H.y + it / 2]
            }, N = f.anchorHandle, tt = N === "top" ? 42 / e.zoom : 26 / e.zoom, [K, q] = Y[N];
            let j = K, X = q;
            switch (N) {
              case "top":
                X = q - tt;
                break;
              case "bottom":
                X = q + tt;
                break;
              case "left":
                j = K - tt;
                break;
              case "right":
                j = K + tt;
                break;
            }
            if (H.rotation) {
              const _ = H.x + H.w / 2, Q = H.y + it / 2, lt = H.rotation * Math.PI / 180, ht = Math.cos(lt), St = Math.sin(lt), vt = j - _, Mt = X - Q;
              ot = _ + vt * ht - Mt * St, J = Q + vt * St + Mt * ht;
            } else
              ot = j, J = X;
          } else {
            const it = yn(H, f.cursorX, f.cursorY, r);
            ot = it.x, J = it.y;
          }
          return /* @__PURE__ */ u(
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
        o.size === 1 && P.filter((H) => o.has(H.id)).map((H) => /* @__PURE__ */ u(
          jh,
          {
            node: H,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: r,
            onHandlePointerDown: a,
            onRotateStart: l
          },
          `sel-${H.id}`
        )),
        n && n.points.length > 1 && (() => {
          if (n.strokeStyle === "dashed" || n.strokeStyle === "dotted") {
            const ot = n.points, J = ["M", ot[0][0], ot[0][1]];
            for (let N = 1; N < ot.length; N++) {
              const [tt, K] = ot[N], [q, j] = ot[N - 1];
              J.push("Q", q, j, (q + tt) / 2, (j + K) / 2);
            }
            const it = ot[ot.length - 1];
            J.push("L", it[0], it[1]);
            const Y = co(n.strokeStyle);
            return /* @__PURE__ */ u(
              "path",
              {
                d: J.join(" "),
                fill: "none",
                stroke: n.color,
                strokeWidth: n.width,
                strokeDasharray: Y == null ? void 0 : Y.map((N) => N * Math.max(n.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            );
          }
          return /* @__PURE__ */ u(
            "path",
            {
              d: ls(n.points, {
                size: n.width
              }),
              fill: n.color
            }
          );
        })(),
        s && i && (() => {
          const H = Math.min(s.startX, s.endX), ot = Math.min(s.startY, s.endY), J = Math.abs(s.endX - s.startX), it = Math.abs(s.endY - s.startY);
          if (J < 2 && it < 2) return null;
          const Y = i, N = Y.shapeType || "rect";
          if (N === "ellipse")
            return /* @__PURE__ */ u(
              "ellipse",
              {
                cx: H + J / 2,
                cy: ot + it / 2,
                rx: J / 2,
                ry: it / 2,
                stroke: Y.stroke,
                strokeWidth: Y.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (N === "diamond")
            return /* @__PURE__ */ u(
              "polygon",
              {
                points: `${H + J / 2},${ot} ${H + J},${ot + it / 2} ${H + J / 2},${ot + it} ${H},${ot + it / 2}`,
                stroke: Y.stroke,
                strokeWidth: Y.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (N === "line" || N === "arrow") {
            const tt = s.startX, K = s.startY, q = s.endX, j = s.endY;
            return /* @__PURE__ */ k(gt, { children: [
              /* @__PURE__ */ u(
                "line",
                {
                  x1: tt,
                  y1: K,
                  x2: q,
                  y2: j,
                  stroke: Y.stroke,
                  strokeWidth: Y.strokeWidth,
                  strokeDasharray: "4"
                }
              ),
              N === "arrow" && (() => {
                const X = Math.atan2(j - K, q - tt), _ = Math.max(12, Y.strokeWidth * 4), Q = Math.PI / 6, lt = q - _ * Math.cos(X - Q), ht = j - _ * Math.sin(X - Q), St = q - _ * Math.cos(X + Q), vt = j - _ * Math.sin(X + Q);
                return /* @__PURE__ */ u(
                  "polyline",
                  {
                    points: `${lt},${ht} ${q},${j} ${St},${vt}`,
                    stroke: Y.stroke,
                    strokeWidth: Y.strokeWidth,
                    fill: "none",
                    strokeDasharray: "4"
                  }
                );
              })()
            ] });
          }
          return /* @__PURE__ */ u(
            "rect",
            {
              x: H,
              y: ot,
              width: J,
              height: it,
              stroke: Y.stroke,
              strokeWidth: Y.strokeWidth,
              fill: "none",
              strokeDasharray: "4"
            }
          );
        })(),
        y && y.length > 1 && (() => {
          const H = performance.now(), ot = 400, J = 6 / e.zoom, it = [`M${y[0][0]},${y[0][1]}`];
          if (y.length === 2)
            it.push(`L${y[1][0]},${y[1][1]}`);
          else {
            for (let _ = 0; _ < y.length - 1; _++) {
              const Q = (y[_][0] + y[_ + 1][0]) / 2, lt = (y[_][1] + y[_ + 1][1]) / 2;
              it.push(`Q${y[_][0]},${y[_][1]},${Q},${lt}`);
            }
            const X = y[y.length - 1];
            it.push(`L${X[0]},${X[1]}`);
          }
          const Y = it.join(" "), N = (H - y[y.length - 1][2]) / ot, tt = (H - y[0][2]) / ot, K = Math.max(0, 0.85 * (1 - N)), q = Math.max(0, 0.85 * (1 - tt)), j = (K + q) / 2;
          return j <= 0 ? null : /* @__PURE__ */ k(gt, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: Y,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: J * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: j * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: Y,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: J,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: j
              }
            )
          ] });
        })(),
        g && g.length > 1 && (() => {
          const H = performance.now(), ot = 1560, J = 6 / e.zoom, it = [];
          let Y = !1, N = !1;
          for (let lt = 0; lt < g.length; lt++) {
            const ht = g[lt];
            if (isNaN(ht[0])) {
              Y = !1, N = !1;
              continue;
            }
            if (!Y)
              it.push(`M${ht[0]},${ht[1]}`), Y = !0, N = !0;
            else if (N) {
              const St = lt + 1 < g.length && !isNaN(g[lt + 1][0]) ? g[lt + 1] : null;
              if (St) {
                const vt = (ht[0] + St[0]) / 2, Mt = (ht[1] + St[1]) / 2;
                it.push(`Q${ht[0]},${ht[1]},${vt},${Mt}`);
              } else
                it.push(`L${ht[0]},${ht[1]}`);
            }
          }
          if (it.length === 0) return null;
          const tt = it.join(" "), K = g.filter((lt) => !isNaN(lt[0]));
          if (K.length === 0) return null;
          const q = (H - K[K.length - 1][2]) / ot, j = (H - K[0][2]) / ot, X = Math.max(0, 0.85 * (1 - q)), _ = Math.max(0, 0.85 * (1 - j)), Q = (X + _) / 2;
          return Q <= 0 ? null : /* @__PURE__ */ k(gt, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: tt,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: J * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: Q * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: tt,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: J,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: Q
              }
            )
          ] });
        })(),
        F && F.length > 0 && F.map((H, ot) => /* @__PURE__ */ u(
          "line",
          {
            x1: H.axis === "x" ? H.position : H.start,
            y1: H.axis === "x" ? H.start : H.position,
            x2: H.axis === "x" ? H.position : H.end,
            y2: H.axis === "x" ? H.end : H.position,
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
function Kh({
  x: t,
  y: e,
  sections: o,
  onClose: r
}) {
  const n = dt(null);
  bt(() => {
    var m;
    const p = (y) => {
      n.current && !n.current.contains(y.target) && r();
    }, h = (y) => {
      y.key === "Escape" && r();
    }, f = ((m = n.current) == null ? void 0 : m.ownerDocument) ?? document;
    return f.addEventListener("pointerdown", p, !0), f.addEventListener("keydown", h), () => {
      f.removeEventListener("pointerdown", p, !0), f.removeEventListener("keydown", h);
    };
  }, [r]), bt(() => {
    const p = n.current;
    if (!p) return;
    const h = p.getBoundingClientRect(), f = p.ownerDocument.defaultView ?? window;
    let m = t, y = e;
    h.right > f.innerWidth && (m = t - h.width), h.bottom > f.innerHeight && (y = e - h.height), m = Math.max(0, m), y = Math.max(0, y), p.style.left = `${m}px`, p.style.top = `${y}px`;
  }, [t, e]);
  const s = ct(
    (p) => {
      p.disabled || (p.action(), r());
    },
    [r]
  ), i = navigator.platform.includes("Mac"), a = i ? "⌘" : "Ctrl+", l = i ? "⌥" : "Alt+", c = i ? "⇧" : "Shift+", d = (p) => p.replace("Mod+", a).replace("Alt+", l).replace("Shift+", c);
  return /* @__PURE__ */ u(
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
      children: o.map((p, h) => /* @__PURE__ */ k("div", { children: [
        h > 0 && /* @__PURE__ */ u(
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
                f.checked !== void 0 && /* @__PURE__ */ u("span", { style: { display: "inline-block", width: 16, marginRight: 4 }, children: f.checked ? "✓" : "" }),
                f.label
              ] }),
              f.shortcut && /* @__PURE__ */ u(
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
      ] }, h))
    }
  );
}
const Ha = "sbd-clipboard", Uh = "sbd-nodes:";
function Oa(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let r = "";
  for (let n = 0; n < o.length; n++) r += String.fromCharCode(o[n]);
  return btoa(r);
}
function wi(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) o[n] = e.charCodeAt(n);
    const r = new TextDecoder().decode(o);
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function Xa(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return wi(e[1]);
  const o = t.match(
    new RegExp(`<!--${Uh}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? wi(o[1]) : null;
}
function Er(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function Ga(t) {
  return t.map((e) => {
    var n;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), r = (n = e.children) != null && n.length ? `
` + Ga(e.children) : "";
    return o + r;
  }).filter(Boolean).join(`
`);
}
function Zh(t) {
  var o;
  const e = [];
  for (const r of t)
    switch (r.type) {
      case "content": {
        const n = r.data;
        (o = n.blocks) != null && o.length ? e.push(Ga(n.blocks)) : n.markdown && e.push(n.markdown);
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
function ki(t, e) {
  const o = Zh(e), r = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), n = Oa(e);
  return t.setData(
    "text/html",
    `<!--${Ha}--><div data-sbd-nodes="${n}">${r || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function Qh(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, r = o.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, i = null;
  const a = (y) => {
    n = y.clientX, s = y.clientY;
  }, l = (y) => {
    Er(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = ki(
      y.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (y) => {
    Er(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = ki(
      y.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, d = async (y) => {
    var D, P, G;
    if (Er(y.target)) return;
    const { x: g, y: w } = t.screenToCanvas(n, s), b = ((D = y.clipboardData) == null ? void 0 : D.getData("text/html")) || "", v = ((P = y.clipboardData) == null ? void 0 : P.getData("text/plain")) || "";
    if (b.includes(Ha) || b.includes("data-sbd-nodes=") || i !== null && v === i) {
      if (i !== null && v === i && t.hasClipboard()) {
        y.preventDefault(), t.pasteClipboard(g, w);
        return;
      }
      const H = Xa(b);
      if (H) {
        y.preventDefault(), t.setClipboard(H), t.pasteClipboard(g, w);
        return;
      }
    }
    const C = (G = y.clipboardData) == null ? void 0 : G.items;
    if (C) {
      for (const st of Array.from(C))
        if (st.type.startsWith("image/")) {
          y.preventDefault();
          const H = st.getAsFile();
          if (!H) continue;
          const ot = new FileReader();
          ot.onload = () => {
            const J = ot.result, it = new Image();
            it.onload = () => {
              const Y = t.screenToCanvas(n, s), N = 400, tt = 300, K = it.naturalWidth / it.naturalHeight, q = Math.min(it.naturalWidth, N), j = Math.min(it.naturalHeight, tt), X = K >= 1 ? q : j * K, _ = K >= 1 ? q / K : j;
              let Q = J;
              if (b) {
                const ht = b.match(/<img[^>]+src=["']([^"']+)["']/i);
                ht && /\.(gif|webp|apng)(\?|#|$)/i.test(ht[1]) && (Q = ht[1].replace(/&amp;/g, "&"));
              }
              const lt = {
                id: zt(10),
                type: "image",
                x: Y.x,
                y: Y.y,
                w: X,
                h: _,
                z: t.nextZ(),
                data: { src: Q }
              };
              t.addNode(lt), t.select(lt.id);
            }, it.src = J;
          }, ot.readAsDataURL(H);
          return;
        }
    }
    const A = Zn(v) ?? Zn(b);
    if (A) {
      y.preventDefault();
      const st = t.screenToCanvas(n, s), H = await Na(
        A,
        st.x,
        st.y,
        t.nextZ()
      );
      H && (t.addNode(H), t.select(H.id));
      return;
    }
    if ($d(v)) {
      const st = Jd(v);
      if (st) {
        y.preventDefault();
        const H = {
          id: zt(10),
          type: "youtube",
          x: g,
          y: w,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: st, url: v.trim() }
        };
        t.addNode(H), t.select(H.id);
        return;
      }
    }
    const F = b.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (F)
      try {
        const st = Qi(F);
        if (st.length > 0) {
          y.preventDefault();
          const H = {
            id: zt(10),
            type: "content",
            x: g,
            y: w,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: st, markdown: v, borderColor: "#1e1e2e" }
          };
          t.addNode(H), t.select(H.id);
          return;
        }
      } catch {
      }
    if (v.trim()) {
      y.preventDefault();
      const st = await rs(v), H = {
        id: zt(10),
        type: "content",
        x: g,
        y: w,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: st, markdown: v, borderColor: "#1e1e2e" }
      };
      t.addNode(H), t.select(H.id);
      return;
    }
    t.hasClipboard() && (y.preventDefault(), t.pasteClipboard(g, w));
  }, p = (y) => {
    const g = y.target;
    if (Er(g)) return;
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
    const w = y.ctrlKey || y.metaKey;
    if (w && y.key === "c") {
      t.copySelected();
      return;
    }
    if (w && y.key === "x") {
      t.copySelected();
      return;
    }
    if (w && y.key.toLowerCase() === "f") {
      y.preventDefault(), o.dispatchEvent(new CustomEvent("sb:search-open"));
      return;
    }
    if (w && y.key === "d") {
      y.preventDefault(), t.duplicateSelected();
      return;
    }
    if (w && y.key === "g") {
      y.preventDefault(), y.shiftKey ? t.ungroupSelected() : t.groupSelected();
      return;
    }
    if (y.shiftKey && !w && y.key === "H") {
      y.preventDefault(), t.flipSelectedHorizontal();
      return;
    }
    if (y.shiftKey && !w && y.key === "V") {
      y.preventDefault(), t.flipSelectedVertical();
      return;
    }
    if (w && y.key === "]") {
      y.preventDefault();
      const b = Array.from(t.selection);
      y.altKey ? t.bringToFront(b) : t.bringForward(b);
      return;
    }
    if (w && y.key === "[") {
      y.preventDefault();
      const b = Array.from(t.selection);
      y.altKey ? t.sendToBack(b) : t.sendBackward(b);
      return;
    }
    if (!w && !y.altKey && !y.shiftKey) {
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
    if (w && y.key === "z") {
      y.preventDefault(), y.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (w && y.key === "a") {
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
    if (w && (y.key === "=" || y.key === "+")) {
      y.preventDefault(), t.zoomIn();
      return;
    }
    if (w && y.key === "-") {
      y.preventDefault(), t.zoomOut();
      return;
    }
    if (w && y.key === "0") {
      y.preventDefault(), t.fitToContent();
      return;
    }
  };
  function h(y, g) {
    y.addEventListener("pointermove", a), y.addEventListener("copy", l), y.addEventListener("cut", c), y.addEventListener("paste", d), g.addEventListener("keydown", p);
  }
  function f(y, g) {
    y.removeEventListener("pointermove", a), y.removeEventListener("copy", l), y.removeEventListener("cut", c), y.removeEventListener("paste", d), g.removeEventListener("keydown", p);
  }
  h(o, r);
  const m = setInterval(() => {
    if (!e) return;
    const y = e.ownerDocument;
    y !== o && (f(o, r), o = y, r = y.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, h(o, r));
  }, 500);
  return () => {
    clearInterval(m), f(o, r);
  };
}
async function vi(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const r = t.measuredHeights, n = Jh(o, r, t), s = e.padding ?? 40, i = e.background !== !1, a = e.format === "png", l = n.w + s * 2, c = n.h + s * 2, d = n.x - s, p = n.y - s, h = await Ya(o, t, r, d, p, a), f = i ? mr(t.boardBackground).canvasBg : "transparent", m = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${l}" height="${c}" viewBox="0 0 ${l} ${c}">`,
    `<rect width="${l}" height="${c}" fill="${f}"/>`,
    ...h,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    Si(new Blob([m], { type: "image/svg+xml" }), "board.svg");
  else {
    const y = e.scale ?? 4, g = await du(m, l, c, y);
    Si(g, "board.png");
  }
}
function Jh(t, e, o) {
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
    const h = Ye(
      d,
      p,
      c.data.edgeType,
      e,
      c.data.sourceHandle,
      c.data.targetHandle,
      c.data.midpointOffset,
      c.data.curveOffset
    );
    r = Math.min(r, h.bounds.x), n = Math.min(n, h.bounds.y), s = Math.max(s, h.bounds.x + h.bounds.w), i = Math.max(i, h.bounds.y + h.bounds.h);
  }
  return isFinite(r) ? { x: r, y: n, w: s - r, h: i - n } : { x: 0, y: 0, w: 100, h: 100 };
}
async function Ya(t, e, o, r, n, s) {
  const i = new Map(t.map((c) => [c.id, c])), a = [...t].sort((c, d) => c.z - d.z), l = [];
  for (const c of a) {
    const d = c.x - r, p = c.y - n, h = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        l.push($h(c, d, p, h));
        break;
      case "content":
        l.push(_h(c, d, p, c.w, h));
        break;
      case "draw":
        l.push(tu(c, r, n));
        break;
      case "shape":
        l.push(ou(c, d, p, c.w, h));
        break;
      case "text":
        l.push(ru(c, d, p, c.w, h));
        break;
      case "sticky":
        l.push(nu(c, d, p, c.w, h));
        break;
      case "image":
        l.push(await su(c, d, p, c.w, h, s));
        break;
      case "youtube":
        l.push(await iu(c, d, p, c.w, h, s));
        break;
      case "edge": {
        const f = c, m = i.get(f.data.fromId), y = i.get(f.data.toId);
        m && y && l.push(lu(f, m, y, o, r, n));
        break;
      }
    }
  }
  return l;
}
function ho(t, e, o, r, n, s, i) {
  const a = [];
  if (s) {
    const l = e + r / 2, c = o + n / 2;
    a.push(`transform="rotate(${s}, ${l}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && a.push(`opacity="${i}"`), `<g ${a.join(" ")}>${t}</g>`;
}
function $h(t, e, o, r) {
  const n = t.data, s = n.backgroundColor || "rgba(0,0,0,0.02)", i = n.borderColor || "#d1d5db", a = n.borderWidth ?? 1, l = $r(n.borderStyle, a), c = n.label ? $o(n.label) : "";
  let d = `<rect x="${e}" y="${o}" width="${t.w}" height="${r}" rx="4" fill="${s}" stroke="${i}" stroke-width="${a}"` + (l ? ` stroke-dasharray="${l}"` : "") + "/>";
  return c && (d += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), ho(d, e, o, t.w, r, t.rotation, n.opacity);
}
function _h(t, e, o, r, n) {
  var p;
  const s = t.data, i = ((p = s.markdown) == null ? void 0 : p.trim()) || "", a = s.borderColor, l = s.borderWidth ?? 0, c = $r(s.borderStyle, l);
  let d = "";
  return a && l > 0 ? d += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white" stroke="${a}" stroke-width="${l}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : d += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white"/>`, i && (d += ks(i, e + 12, o + 20, r - 24, 14, 1.6, "#374151", "left", "sans-serif")), ho(d, e, o, r, n, t.rotation, s.opacity);
}
function tu(t, e, o) {
  const r = t.data, n = r.points.map(
    ([a, l, c]) => [a + t.x - e, l + t.y - o, c]
  );
  if (n.length === 0) return "";
  if (r.tool === "vector")
    return eu(n, r, t);
  const s = co(r.strokeStyle);
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
    const a = ls(n, { size: r.strokeWidth });
    a && (i += `<path d="${a}" fill="${r.color}" stroke="none"/>`);
  }
  return r.opacity !== void 0 && r.opacity !== 1 ? `<g opacity="${r.opacity}">${i}</g>` : i;
}
function eu(t, e, o) {
  const r = t.map((l, c) => `${c === 0 ? "M" : "L"}${l[0].toFixed(2)},${l[1].toFixed(2)}`).join(" ") + " Z", n = co(e.strokeStyle), s = n ? ` stroke-dasharray="${n.map((l) => l * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${r}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, a = o.h === "auto" ? 0 : o.h;
  return ho(i, o.x, o.y, o.w, a, o.rotation, e.opacity);
}
function ou(t, e, o, r, n) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: co(s.strokeStyle),
    seed: t.id
  };
  let a;
  const l = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      a = jr(e, o, r, n, i, l);
      break;
    case "ellipse":
      a = hs(e + r / 2, o + n / 2, r, n, i);
      break;
    case "diamond":
      a = us(e, o, r, n, i, l);
      break;
    case "line": {
      const d = s.startPoint ?? [0, 0], p = s.endPoint ?? [r, n];
      a = Zo(e + d[0], o + d[1], e + p[0], o + p[1], i);
      break;
    }
    case "arrow": {
      const d = s.startPoint ?? [0, 0], p = s.endPoint ?? [r, n];
      a = ps(e + d[0], o + d[1], e + p[0], o + p[1], i);
      break;
    }
    default:
      a = jr(e, o, r, n, i);
  }
  const c = a.map(
    (d) => `<path d="${d.d}" fill="${d.fill || "none"}" stroke="${d.stroke}" stroke-width="${d.strokeWidth}"` + (d.strokeDasharray ? ` stroke-dasharray="${d.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return ho(c, e, o, r, n, t.rotation, s.opacity);
}
function ru(t, e, o, r, n) {
  const s = t.data, i = n || s.text.split(`
`).length * s.fontSize * 1, a = so(s.fontFamily), l = !!s.borderColor, c = l ? 6 : 0;
  let d = "";
  if (l) {
    const h = s.borderWidth ?? 1, f = $r(s.borderStyle, h);
    d += `<rect x="${e}" y="${o}" width="${r}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${h}"` + (f ? ` stroke-dasharray="${f}"` : "") + "/>";
  }
  const p = s.align === "center" ? e + r / 2 : s.align === "right" ? e + r - c : e + c;
  return d += ks(
    s.text,
    p,
    o + c + s.fontSize,
    r - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    a
  ), ho(d, e, o, r, i, t.rotation, s.opacity);
}
function nu(t, e, o, r, n) {
  const s = t.data, i = s.fontSize ?? 16, a = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="2" fill="${s.color}"/>` + ks(s.text, e + 12, o + 12 + i, r - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return ho(a, e, o, r, n, t.rotation, s.opacity);
}
async function su(t, e, o, r, n, s) {
  const i = t.data;
  let a = i.src;
  if (s && a && !a.startsWith("data:"))
    try {
      a = await qr(a);
    } catch {
    }
  const l = i.borderColor, c = i.borderWidth ?? 0, d = $r(i.borderStyle, c);
  let p = `<image href="${$o(a)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  return l && c > 0 && (p += `<rect x="${e}" y="${o}" width="${r}" height="${n}" fill="none" stroke="${l}" stroke-width="${c}"` + (d ? ` stroke-dasharray="${d}"` : "") + "/>"), ho(p, e, o, r, n, t.rotation, i.opacity);
}
async function iu(t, e, o, r, n, s) {
  const i = t.data;
  let a = th(i.videoId);
  if (s)
    try {
      a = await qr(a);
    } catch {
    }
  let l = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="#1a1a1a"/><image href="${$o(a)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + r / 2, d = o + n / 2, p = Math.min(r, n) * 0.12;
  return l += `<circle cx="${c}" cy="${d}" r="${p}" fill="rgba(0,0,0,0.6)"/><path d="${au(c, d, p * 0.5)}" fill="white"/>`, ho(l, e, o, r, n, t.rotation, i.opacity);
}
function au(t, e, o) {
  const r = o * 0.15, n = t - o * 0.7 + r, s = e - o, i = t + o + r, a = e, l = n, c = e + o;
  return `M${n},${s} L${i},${a} L${l},${c} Z`;
}
function lu(t, e, o, r, n, s) {
  const i = t.data, a = Ye(
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
  const h = i.arrowHeadSize ?? Math.max(8, d * 3), f = i.arrowTailSize ?? Math.max(8, d * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      p += `<path d="${qo(a.x2, a.y2, a.arrowAngle, h)}" fill="none" stroke="${i.color}" stroke-width="${d}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      p += `<path d="${Hr(a.x2, a.y2, a.arrowAngle, h)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const m = h / 3;
      p += `<circle cx="${a.x2}" cy="${a.y2}" r="${m}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      p += `<path d="${qo(a.x1, a.y1, a.tailAngle, f)}" fill="none" stroke="${i.color}" stroke-width="${d}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      p += `<path d="${Hr(a.x1, a.y1, a.tailAngle, f)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const m = f / 3;
      p += `<circle cx="${a.x1}" cy="${a.y1}" r="${m}" fill="${i.color}"/>`;
    }
  }
  return i.label && (p += `<text x="${a.labelX}" y="${a.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${$o(i.label)}</text>`), `<g transform="${l}">${p}</g>`;
}
function ks(t, e, o, r, n, s, i, a, l) {
  if (!t) return "";
  const c = a === "center" ? "middle" : a === "right" ? "end" : "start", d = cu(t, r, n), p = n * s, h = d.map(
    (f, m) => `<tspan x="${e}" dy="${m === 0 ? 0 : p}">${$o(f)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${n}" fill="${i}" font-family="${$o(l)}" text-anchor="${c}">${h}</text>`;
}
function cu(t, e, o) {
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
function $r(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function $o(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function qr(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((r, n) => {
    const s = new FileReader();
    s.onloadend = () => r(s.result), s.onerror = n, s.readAsDataURL(o);
  });
}
function du(t, e, o, r) {
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
const hu = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), Fo = /* @__PURE__ */ new Map(), uu = 12;
function pu(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const r = o.data.fontFamily;
      r && !hu.has(r) && e.add(r);
    }
  return [...e];
}
async function fu(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (Fo.has(o)) {
      e.push(Fo.get(o));
      continue;
    }
    try {
      let r;
      if (o === "Excalifont")
        r = await qr(Ji);
      else {
        const a = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!a) continue;
        r = await qr(a[1]);
      }
      const n = `@font-face { font-family: '${o}'; src: url('${r}') format('woff2'); }`;
      if (Fo.size >= uu) {
        const s = Fo.keys().next().value;
        s !== void 0 && Fo.delete(s);
      }
      Fo.set(o, n), e.push(n);
    } catch {
    }
  }
  return e.join(`
`);
}
async function yu(t, e) {
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
  const h = t.measuredHeights, f = await Ya(c, t, h, a, l, !0), m = pu(c), y = await fu(m), g = mr(t.boardBackground).canvasBg, w = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    y ? `<defs><style>${y}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${g}"/>`,
    ...f,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(w)}`;
}
function Si(t, e) {
  const o = URL.createObjectURL(t), r = document.createElement("a");
  r.href = o, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o);
}
const Mi = [
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
], Ci = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function Ii(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const ja = [
  ...Mi,
  ...Ii(Mi, "phone-landscape"),
  ...Ci,
  ...Ii(Ci, "tablet-landscape"),
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
], gu = new Map(ja.map((t) => [t.key, t]));
function Qn(t) {
  return gu.get(t);
}
function Va(t) {
  return t.w / t.h;
}
const mu = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function bu() {
  const t = /* @__PURE__ */ new Map();
  for (const e of ja) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: mu[e] ?? e,
    presets: o
  }));
}
function xu(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function zn(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const [i, a] = o[n], [l, c] = o[s];
    a > e != c > e && t < (l - i) * (e - a) / (c - a) + i && (r = !r);
  }
  return r;
}
function Tn(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function wu(t, e, o) {
  try {
    const r = await navigator.clipboard.read();
    let n = null;
    for (const i of r)
      if (i.types.includes("text/html")) {
        const a = await (await i.getType("text/html")).text();
        if (a.includes("sbd-clipboard") || a.includes("data-sbd-nodes=")) {
          const l = Xa(a);
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
        const p = d.naturalWidth / d.naturalHeight, h = Math.min(d.naturalWidth, 400), f = Math.min(d.naturalHeight, 300), m = p >= 1 ? h : f * p, y = p >= 1 ? h / p : f;
        let g = c;
        if (n) {
          const b = n.match(/<img[^>]+src=["']([^"']+)["']/i);
          b && /\.(gif|webp|apng)(\?|#|$)/i.test(b[1]) && (g = b[1].replace(/&amp;/g, "&"));
        }
        const w = {
          id: zt(10),
          type: "image",
          x: e,
          y: o,
          w: m,
          h: y,
          z: t.nextZ(),
          data: { src: g }
        };
        t.addNode(w), t.select(w.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (n) {
      const i = n.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const a = Qi(i);
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
      const i = await rs(s), a = {
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
async function zi(t) {
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
`).filter(Boolean).map((a) => `<p>${a}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${Oa(e)}">${n || "<p></p>"}</div>`;
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
function Rr(t) {
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
function Ti(t, e) {
  const o = e.x - t.x, r = e.y - t.y;
  return { dist: Math.sqrt(o * o + r * r), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const No = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function ku({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: r,
  observeElement: n,
  unobserveElement: s,
  isContainer: i,
  children: a
}) {
  const l = dt(null);
  bt(() => {
    if (t.h !== "auto") return;
    const p = l.current;
    if (!p) return;
    const h = p.offsetHeight;
    return h > 0 && r(t.id, h), n(p, () => {
      const f = p.offsetHeight;
      f > 0 && r(t.id, f);
    }), () => s(p);
  }, [t.id, t.h, r, n, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, d = Vt(() => ({
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
  return /* @__PURE__ */ u(
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
function vu({
  node: t,
  engine: e,
  onDone: o
}) {
  const r = dt(null), n = dt(t.data.label ?? ""), s = dt(t);
  s.current = t;
  const i = dt(t.data.label ?? "");
  bt(() => () => {
    const d = s.current, p = n.current.trim();
    if (p !== i.current) {
      const f = { data: { ...d.data, label: p || void 0 } }, m = r.current;
      if (m && p) {
        const g = d.h === "auto" ? 100 : d.h, w = m.scrollHeight + 24;
        w > g && (f.h = w);
      }
      e.updateNodeWithHistory(d.id, f);
    }
  }, []);
  const a = t.h === "auto" ? 100 : t.h, l = t.data.labelFontSize ?? 14, c = t.data.fill && t.data.fillStyle === "solid" ? xu(t.data.fill) : t.data.stroke;
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ u(
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
            const h = s.current;
            e.updateNode(h.id, {
              data: { ...h.data, label: p.value || void 0 }
            }), p.style.height = "auto", p.style.height = p.scrollHeight + "px";
            const m = p.scrollHeight + 24;
            m > a && e.updateNode(t.id, { h: m });
          },
          onPointerDown: (d) => d.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: l,
            fontFamily: so(t.data.labelFontFamily ?? no),
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
function Su({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: r
}) {
  var Gs;
  const { labels: n } = Yt(), s = dt(null), i = () => {
    var x;
    return ((x = s.current) == null ? void 0 : x.ownerDocument) ?? document;
  }, [a, l] = $({ w: 0, h: 0 }), [c, d] = $({ ...t.viewport }), [p, h] = $(t.getAllNodes()), [f, m] = $(
    new Set(t.selection)
  ), [y, g] = $(t.mode), [w, b] = $(t.activeGroupId), [v, M] = $(() => t.getSearchState()), [C, A] = $([]), [F, D] = $(t.snapToGrid), [P, G] = $(t.gridSize), [st, H] = $(t.smartGuides), [ot, J] = $([]), [it, Y] = $(t.boardBackground), N = dt(!1), tt = dt(!1), K = dt(/* @__PURE__ */ new Map()), q = dt(!1), j = dt(!1), X = dt(null), _ = dt(null), Q = ct((x) => {
    i().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: x } }));
  }, []);
  bt(() => {
    const x = (I) => {
      var O, z;
      if (I.key === " " && !I.repeat && !N.current) {
        const W = (O = I.target) == null ? void 0 : O.tagName;
        if (W === "INPUT" || W === "TEXTAREA" || (z = I.target) != null && z.isContentEditable) return;
        N.current = !0;
        const E = s.current;
        E && (E.style.cursor = "grab"), I.preventDefault();
      }
    }, T = (I) => {
      if (I.key === " ") {
        N.current = !1, tt.current = !1;
        const O = s.current;
        O && (O.style.cursor = t.lassoSelect ? No : Rr(t.mode));
      }
    };
    return window.addEventListener("keydown", x), window.addEventListener("keyup", T), () => {
      window.removeEventListener("keydown", x), window.removeEventListener("keyup", T);
    };
  }, []), bt(() => {
    const x = (I) => {
      K.current.delete(I.pointerId), I.pointerType === "pen" && (j.current = !1), K.current.size === 0 && Q(!1), X.current && (clearTimeout(X.current), X.current = null, _.current = null);
    }, T = i();
    return T.addEventListener("pointerup", x), T.addEventListener("pointercancel", x), () => {
      T.removeEventListener("pointerup", x), T.removeEventListener("pointercancel", x);
    };
  }, [Q]);
  const [lt, ht] = $(null), [St, vt] = $(null), [Mt, xt] = $(null), [ft, Lt] = $(null);
  bt(() => {
    const x = s.current;
    if (!x) return;
    t.setContainer(x);
    const T = () => {
      const O = x.getBoundingClientRect();
      t.containerOffset = { x: O.left, y: O.top };
    };
    T();
    const I = new ResizeObserver((O) => {
      var E;
      const { width: z, height: W } = ((E = O[0]) == null ? void 0 : E.contentRect) ?? { width: 0, height: 0 };
      l((R) => R.w === z && R.h === W ? R : { w: z, h: W }), t.setContainerSize(z, W), T();
    });
    return I.observe(x), () => I.disconnect();
  }, [t]);
  const [rt, Et] = $({}), Kt = ct((x, T) => {
    Et(
      (I) => I[x] === T ? I : { ...I, [x]: T }
    ), t.updateMeasuredHeight(x, T);
  }, [t]), Ut = dt(null), oe = dt(/* @__PURE__ */ new Map());
  function ie() {
    return Ut.current || (Ut.current = new ResizeObserver((x) => {
      var T;
      for (const I of x)
        (T = oe.current.get(I.target)) == null || T(I);
    })), Ut.current;
  }
  const ve = ct((x, T) => {
    oe.current.set(x, T), ie().observe(x);
  }, []), He = ct((x) => {
    var T;
    oe.current.delete(x), (T = Ut.current) == null || T.unobserve(x);
  }, []);
  bt(() => () => {
    var x;
    (x = Ut.current) == null || x.disconnect(), Ut.current = null, oe.current.clear();
  }, []);
  const xe = Vt(() => new Set(p.map((x) => x.id)), [p]);
  bt(() => {
    Et((x) => {
      let T = !1;
      const I = {};
      for (const [O, z] of Object.entries(x))
        xe.has(O) ? I[O] = z : T = !0;
      return T ? I : x;
    });
  }, [xe]);
  const To = ct(
    (x, T, I) => {
      let O, z;
      if (o && x.data.sourcePort) {
        const W = o.get(T.type);
        W != null && W.ports && (O = ur(T, W.ports, x.data.sourcePort, c.zoom, rt) ?? void 0);
      }
      if (o && x.data.targetPort) {
        const W = o.get(I.type);
        W != null && W.ports && (z = ur(I, W.ports, x.data.targetPort, c.zoom, rt) ?? void 0);
      }
      return { sourcePortPos: O, targetPortPos: z };
    },
    [o, c.zoom, rt]
  );
  ct(
    (x) => t.zoomToNode(x),
    [t, n]
  );
  const ue = ct(
    (x, T) => {
      if (!x.rotation)
        return { minX: x.x, minY: x.y, maxX: x.x + x.w, maxY: x.y + T };
      const I = x.x + x.w / 2, O = x.y + T / 2, z = x.rotation * Math.PI / 180, W = Math.cos(z), E = Math.sin(z), R = [
        [x.w / 2, T / 2],
        [-x.w / 2, T / 2],
        [-x.w / 2, -T / 2],
        [x.w / 2, -T / 2]
      ];
      let B = 1 / 0, V = 1 / 0, L = -1 / 0, U = -1 / 0;
      for (const [Z, et] of R) {
        const nt = I + Z * W - et * E, pt = O + Z * E + et * W;
        B = Math.min(B, nt), V = Math.min(V, pt), L = Math.max(L, nt), U = Math.max(U, pt);
      }
      return { minX: B, minY: V, maxX: L, maxY: U };
    },
    []
  ), le = 8, Re = ct(
    (x, T) => T.filter((I) => {
      if (I.type === "edge") {
        const W = I.data, E = t.getNode(W.fromId), R = t.getNode(W.toId);
        if (!E || !R) return !1;
        const { x1: B, y1: V, x2: L, y2: U } = Ks(E, R, rt);
        return B >= x.x && B <= x.x + x.w && V >= x.y && V <= x.y + x.h && L >= x.x && L <= x.x + x.w && U >= x.y && U <= x.y + x.h;
      }
      const O = I.h === "auto" ? rt[I.id] ?? 100 : I.h, z = ue(I, O);
      return z.minX >= x.x && z.maxX <= x.x + x.w && z.minY >= x.y && z.maxY <= x.y + x.h;
    }),
    [ue, rt]
  ), Ke = ct(
    (x, T) => x.length < 3 ? [] : T.filter((I) => {
      if (I.type === "edge") {
        const E = I, R = t.getNode(E.data.fromId), B = t.getNode(E.data.toId);
        if (!R || !B) return !1;
        const { x1: V, y1: L, x2: U, y2: Z } = Ks(R, B, rt);
        return zn(V, L, x) && zn(U, Z, x);
      }
      const O = I.h === "auto" ? rt[I.id] ?? 100 : I.h, z = I.x + I.w / 2, W = I.y + O / 2;
      return zn(z, W, x);
    }),
    [t, rt]
  ), ne = Vt(() => {
    if (f.size < 2) return null;
    let x = 1 / 0, T = 1 / 0, I = -1 / 0, O = -1 / 0;
    for (const z of f) {
      const W = p.find((B) => B.id === z);
      if (!W || W.type === "edge") continue;
      const E = W.h === "auto" ? rt[W.id] ?? 100 : W.h, R = ue(W, E);
      x = Math.min(x, R.minX), T = Math.min(T, R.minY), I = Math.max(I, R.maxX), O = Math.max(O, R.maxY);
    }
    return x === 1 / 0 ? null : {
      x: x - le,
      y: T - le,
      w: I - x + le * 2,
      h: O - T + le * 2
    };
  }, [f, p, rt, ue]), Oe = Vt(() => {
    if (!w) return null;
    const x = t.getAllGroupDescendantNodes(w);
    if (x.length === 0) return null;
    let T = 1 / 0, I = 1 / 0, O = -1 / 0, z = -1 / 0;
    for (const E of x) {
      if (E.type === "edge") continue;
      const R = E.h === "auto" ? rt[E.id] ?? 100 : E.h, B = ue(E, R);
      T = Math.min(T, B.minX), I = Math.min(I, B.minY), O = Math.max(O, B.maxX), z = Math.max(z, B.maxY);
    }
    if (T === 1 / 0) return null;
    const W = 8;
    return { x: T - W, y: I - W, w: O - T + W * 2, h: z - I + W * 2 };
  }, [w, p, rt, ue, t]), Bt = Vt(() => {
    const x = performance.now();
    if (p.filter(
      (at) => {
        if (o) {
          const wt = o.get(at.type);
          return wt && !wt.isSVGOnly;
        }
        return at.type === "content" || at.type === "draw" || at.type === "shape" || at.type === "image" || at.type === "text" || at.type === "frame" || at.type === "sticky";
      }
    ), a.w <= 0 || a.h <= 0)
      return null;
    const { zoom: T, x: I, y: O } = c, W = Math.min(500, 280 / Math.max(T, 0.1)), E = {
      x: -I / T - W,
      y: -O / T - W,
      w: a.w / T + W * 2,
      h: a.h / T + W * 2
    }, R = t.getNodesInRect(E), B = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Set(), L = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set();
    let Z = 0, et = 0, nt = 0, pt = 0, Tt = 0;
    const Ct = (at, wt = !1) => {
      const mt = t.getNode(at);
      if (!mt) return;
      const Ft = B.has(mt.id);
      B.set(mt.id, mt), mt.type === "edge" ? U.add(mt.id) : (Ft || V.add(mt.id), wt && L.add(mt.id));
    };
    for (const at of R) {
      const wt = L.size;
      Ct(at.id, !0), L.size > wt && (Z += 1);
    }
    for (const at of f)
      Ct(at, !0);
    const kt = ft ? { x: ft.cursorX, y: ft.cursorY } : Mt ? { x: Mt.cursorX, y: Mt.cursorY } : null;
    if (kt) {
      const at = 200 / Math.max(0.2, c.zoom), wt = t.getNodesInRect({
        x: kt.x - at,
        y: kt.y - at,
        w: at * 2,
        h: at * 2
      });
      for (const mt of wt)
        mt.type !== "edge" && Ct(mt.id, !0);
    }
    const At = Array.from(L);
    for (const at of At) {
      const wt = t.getEdgesForNode(at);
      for (const mt of wt) {
        const Ft = mt.data, Pt = U.has(mt.id);
        B.set(mt.id, mt), U.add(mt.id), Pt || (pt += 1);
        const It = V.size;
        Ct(Ft.fromId, !1), V.size > It && (et += 1);
        const Nt = V.size;
        Ct(Ft.toId, !1), V.size > Nt && (et += 1);
      }
    }
    for (const at of p) {
      if (at.type !== "edge" || U.has(at.id)) continue;
      const wt = at.data, mt = t.getNode(wt.fromId), Ft = t.getNode(wt.toId);
      if (!mt || !Ft) continue;
      let Pt = L.has(wt.fromId) || L.has(wt.toId);
      if (!Pt) {
        const It = Ye(
          mt,
          Ft,
          wt.edgeType || "bezier",
          rt,
          wt.sourceHandle,
          wt.targetHandle,
          wt.midpointOffset,
          wt.curveOffset
        );
        Pt = It.bounds.x < E.x + E.w && It.bounds.x + It.bounds.w > E.x && It.bounds.y < E.y + E.h && It.bounds.y + It.bounds.h > E.y;
      }
      if (Pt) {
        B.set(at.id, at), U.add(at.id), Tt += 1;
        const It = V.size;
        Ct(mt.id, !1), V.size > It && (nt += 1);
        const Nt = V.size;
        Ct(Ft.id, !1), V.size > Nt && (nt += 1);
      }
    }
    const Ht = Array.from(B.values());
    return {
      domNodes: Ht.filter((at) => {
        if (at.type === "edge" || !L.has(at.id)) return !1;
        if (o) {
          const wt = o.get(at.type);
          return !!wt && !wt.isSVGOnly;
        }
        return at.type === "content" || at.type === "draw" || at.type === "shape" || at.type === "image" || at.type === "text" || at.type === "frame" || at.type === "sticky";
      }),
      svgNodes: Ht,
      visibleNodeCount: L.size,
      visibleEdgeCount: U.size,
      seedVisibleNodes: Z,
      nodesAddedByAdjacency: et,
      nodesAddedByEdgeEndpoints: nt,
      edgesAddedByAdjacency: pt,
      edgesAddedByCrossing: Tt,
      cullingMs: performance.now() - x
    };
  }, [c, a, p, f, t, o, rt, Mt, ft]), uo = (Bt == null ? void 0 : Bt.domNodes) ?? p.filter((x) => {
    if (o) {
      const T = o.get(x.type);
      return !!T && !T.isSVGOnly;
    }
    return x.type === "content" || x.type === "draw" || x.type === "shape" || x.type === "image" || x.type === "text" || x.type === "frame" || x.type === "sticky";
  }), po = p;
  bt(() => {
    if (!he.isEnabled()) return;
    const x = p.reduce((I, O) => I + (O.type === "edge" ? 1 : 0), 0), T = p.length - x;
    he.recordCulling((Bt == null ? void 0 : Bt.cullingMs) ?? 0), he.setVisibilityCounts({
      visibleNodes: (Bt == null ? void 0 : Bt.visibleNodeCount) ?? T,
      totalNodes: T,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: x,
      totalEdges: x,
      virtualizationActive: !!Bt,
      seedVisibleNodes: (Bt == null ? void 0 : Bt.seedVisibleNodes) ?? T,
      nodesAddedByAdjacency: (Bt == null ? void 0 : Bt.nodesAddedByAdjacency) ?? 0,
      nodesAddedByEdgeEndpoints: (Bt == null ? void 0 : Bt.nodesAddedByEdgeEndpoints) ?? 0,
      edgesAddedByAdjacency: (Bt == null ? void 0 : Bt.edgesAddedByAdjacency) ?? 0,
      edgesAddedByCrossing: (Bt == null ? void 0 : Bt.edgesAddedByCrossing) ?? 0
    });
  }, [p, Bt]);
  const Po = dt(0);
  bt(() => {
    if (!he.isEnabled() || !Bt) return;
    const x = performance.now();
    if (x - Po.current < 1e3) return;
    Po.current = x;
    const T = p.reduce((O, z) => O + (z.type === "edge" ? 1 : 0), 0), I = p.length - T;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: Bt.visibleNodeCount,
      totalNodes: I,
      visibleEdges: Bt.visibleEdgeCount,
      totalEdges: T,
      seedVisibleNodes: Bt.seedVisibleNodes,
      nodesAddedByAdjacency: Bt.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: Bt.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: Bt.edgesAddedByAdjacency,
      edgesAddedByCrossing: Bt.edgesAddedByCrossing,
      cullingMs: Bt.cullingMs
    });
  }, [p, Bt, c]), bt(() => {
    let x = null;
    const T = () => {
      x === null && (x = requestAnimationFrame(() => {
        x = null, h([...t.getAllNodes()]);
      }));
    };
    let I = null;
    const O = () => {
      I === null && (I = requestAnimationFrame(() => {
        I = null, d({ ...t.viewport });
      }));
    }, z = () => {
      m((Z) => {
        const et = new Set(t.selection);
        return Z.size !== et.size || [...Z].some((nt) => !et.has(nt)) ? (fo((nt) => nt && !et.has(nt) ? null : nt), Eo((nt) => nt && !et.has(nt) ? null : nt), yo((nt) => nt && !et.has(nt) ? null : nt), Ro((nt) => nt && !et.has(nt) ? null : nt), Lo((nt) => nt && !et.has(nt) ? null : nt), Ge(null), et) : Z;
      });
    }, W = () => {
      g(t.mode), t.mode === "text" && (sr.current = !1);
    }, E = () => Y(t.boardBackground), R = () => {
      J([...t.alignGuides]), D(t.snapToGrid), G(t.gridSize), H(t.smartGuides);
    }, B = () => M(t.getSearchState());
    t.on("change", T), t.on("viewport", O), t.on("selection", z), t.on("mode", W), t.on("background", E), t.on("guides", R), t.on("search", B);
    const V = (Z) => b(Z), L = () => b(null), U = () => {
      const Z = s.current;
      Z && (Z.style.cursor = t.lassoSelect ? No : Rr(t.mode));
    };
    return t.on("group:enter", V), t.on("group:exit", L), t.on("lassoToggle", U), () => {
      x !== null && cancelAnimationFrame(x), I !== null && cancelAnimationFrame(I), t.off("change", T), t.off("viewport", O), t.off("selection", z), t.off("mode", W), t.off("background", E), t.off("guides", R), t.off("search", B), t.off("group:enter", V), t.off("group:exit", L), t.off("lassoToggle", U);
    };
  }, [t]), bt(() => {
    const x = s.current;
    if (!x) return;
    const T = (I) => {
      if (!I.ctrlKey && !I.metaKey) {
        const z = I.target.closest(".sb-editor-wrap");
        if (z && z.scrollHeight > z.clientHeight) {
          const W = z.scrollTop <= 0 && I.deltaY < 0, E = z.scrollTop + z.clientHeight >= z.scrollHeight && I.deltaY > 0;
          if (!W && !E) return;
        }
      }
      I.preventDefault(), I.ctrlKey || I.metaKey ? t.zoomByWheel(I.deltaY, I.clientX, I.clientY) : t.pan(-I.deltaX, -I.deltaY);
    };
    return x.addEventListener("wheel", T, { passive: !1 }), () => x.removeEventListener("wheel", T);
  }, [t]);
  const [S, ut] = $(null), [$t, se] = $(null), [ye, Ue] = $(null), [Xe, Ge] = $(null), Ao = dt({
    x: 0,
    y: 0,
    index: -1
  }), [Ce, Se] = $(null), [Qa, en] = $(null), or = dt(null), Ja = Vt(() => {
    const x = /* @__PURE__ */ new Set();
    for (const T of p) {
      if (T.type !== "edge") continue;
      const I = T;
      I.data.animated && I.data.animatedDirection === "bop" && (x.add(I.data.fromId), x.add(I.data.toId));
    }
    return x;
  }, [p]), [on, fo] = $(null), rn = dt(null), [Ps, Eo] = $(null), [As, yo] = $(null), [rr, Ro] = $(null), [Es, Lo] = $(null), [$a, Rs] = $(null);
  bt(() => {
    const x = (T) => {
      Tl(() => Lo(T));
    };
    return t.on("image:cropRequest", x), () => t.off("image:cropRequest", x);
  }, [t]);
  const Ls = on || As || Ps || rr || Es || $a, nn = dt(null), Ds = dt(null), [sn, an] = $(/* @__PURE__ */ new Set()), go = dt(/* @__PURE__ */ new Set()), [Ws, nr] = $([]), [wr, ln] = $(null), Le = dt([]), Ze = dt(null), [Bs, kr] = $([]), pe = dt([]), Do = dt(null), sr = dt(!1), Fs = ct(
    (x, T, I, O = "auto") => {
      const z = zt(10);
      Ds.current = z, t.addNode({
        id: z,
        type: "content",
        x,
        y: T,
        w: I,
        h: O,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), vr = ct(
    (x, T, I) => {
      const { x: O, y: z } = t.screenToCanvas(x, T);
      if (I) {
        const V = t.hitTestAll(O, z, rt);
        if (V.length > 0) {
          const L = Ao.current, U = Math.abs(O - L.x) + Math.abs(z - L.y);
          let Z = 0;
          U < 5 && (Z = (L.index + 1) % V.length), Ao.current = { x: O, y: z, index: Z }, t.select(V[Z].id);
        } else
          t.deselectAll();
      } else {
        let V = !1;
        for (const L of t.selection) {
          const U = t.getNode(L);
          if (!U) continue;
          const Z = U.h === "auto" ? 100 : U.h;
          if (O >= U.x && O <= U.x + U.w && z >= U.y && z <= U.y + Z) {
            V = !0;
            break;
          }
        }
        if (!V && t.selection.size >= 2) {
          let L = 1 / 0, U = 1 / 0, Z = -1 / 0, et = -1 / 0;
          for (const nt of t.selection) {
            const pt = t.getNode(nt);
            if (!pt || pt.type === "edge") continue;
            const Tt = pt.h === "auto" ? 100 : pt.h;
            L = Math.min(L, pt.x), U = Math.min(U, pt.y), Z = Math.max(Z, pt.x + pt.w), et = Math.max(et, pt.y + Tt);
          }
          L !== 1 / 0 && O >= L && O <= Z && z >= U && z <= et && (V = !0);
        }
        if (!V) {
          const L = t.hitTest(O, z, rt);
          L ? t.select(L.id) : t.deselectAll();
        }
      }
      const W = Array.from(t.selection), E = W.length > 0, R = [];
      if (R.push({
        items: [
          {
            label: n.actionCut,
            shortcut: "Mod+X",
            disabled: !E,
            action: () => {
              t.cutSelected(), zi(t);
            }
          },
          {
            label: n.actionCopy,
            shortcut: "Mod+C",
            disabled: !E,
            action: () => {
              t.copySelected(), zi(t);
            }
          },
          {
            label: n.actionPaste,
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              wu(t, O, z);
            }
          }
        ]
      }), R.push({
        items: [
          {
            label: n.actionDuplicate,
            shortcut: "Mod+D",
            disabled: !E,
            action: () => t.duplicateSelected()
          }
        ]
      }), E && R.push({
        items: [
          {
            label: n.actionAddToPersonalLibrary,
            action: () => {
              const V = W.map((Z) => t.getNode(Z)).filter((Z) => !!Z).map((Z) => structuredClone(Z)), L = new Set(
                V.map((Z) => Z.groupId).filter(Boolean)
              ), U = /* @__PURE__ */ new Map();
              for (const [Z, et] of t.groupParent)
                L.has(Z) && U.set(Z, et);
              ln({
                nodes: V,
                groupParent: U
              });
            }
          }
        ]
      }), W.length >= 2 || E && t.selectionHasGroup()) {
        const V = [];
        W.length >= 2 && V.push({
          label: n.actionGroupSelection,
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && V.push({
          label: n.actionUngroupSelection,
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), R.push({ items: V });
      }
      if (E && W.every((L) => {
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
      }), E && R.push({
        items: [
          {
            label: n.actionBringForward,
            shortcut: "Mod+]",
            action: () => t.bringForward(W)
          },
          {
            label: n.actionSendBackward,
            shortcut: "Mod+[",
            action: () => t.sendBackward(W)
          },
          {
            label: n.actionBringToFront,
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(W)
          },
          {
            label: n.actionSendToBack,
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(W)
          }
        ]
      }), E) {
        const V = W.some((Z) => {
          var et;
          return (et = t.getNode(Z)) == null ? void 0 : et.locked;
        }), L = W.some((Z) => {
          var et;
          return !((et = t.getNode(Z)) != null && et.locked);
        }), U = [];
        L && U.push({
          label: n.actionLock,
          action: () => {
            for (const Z of W) t.updateNode(Z, { locked: !0 });
          }
        }), V && U.push({
          label: n.actionUnlock,
          action: () => {
            for (const Z of W) t.updateNode(Z, { locked: void 0 });
          }
        }), R.push({ items: U });
      }
      E && R.push({
        items: [
          {
            label: n.actionDelete,
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const B = [10, 20, 40, 80];
      return R.push({
        items: [
          {
            label: n.actionToggleGrid,
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), D(t.snapToGrid);
            }
          },
          {
            label: n.actionSmartGuides,
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), H(t.smartGuides);
            }
          },
          ...B.map((V) => ({
            label: `${V}px`,
            checked: t.gridSize === V,
            action: () => {
              t.setGridSize(V);
            }
          }))
        ]
      }), R.push({
        items: [
          {
            label: n.actionExportAsPng,
            action: () => vi(t, { format: "png" })
          },
          {
            label: n.actionExportAsSvg,
            action: () => vi(t, { format: "svg" })
          }
        ]
      }), R;
    },
    [t]
  ), _a = ct(
    (x) => {
      if (x.preventDefault(), t.presentationMode) return;
      const T = vr(x.clientX, x.clientY, x.altKey);
      Ue({ x: x.clientX, y: x.clientY, sections: T });
    },
    [t, vr]
  ), ir = ct(
    (x, T, I) => {
      const O = zt(10);
      t.addNode({
        id: O,
        type: "text",
        x,
        y: T,
        w: I,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? no,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(O), nn.current = O, fo(O);
    },
    [t]
  ), tl = ct(
    (x) => {
      if (t.presentationMode) return;
      if (t.mode === "text" && sr.current) {
        sr.current = !1, s.current && (s.current.style.cursor = "text"), t.deselectAll();
        const { x: W, y: E } = t.screenToCanvas(x.clientX, x.clientY);
        ir(W, E, 300);
        return;
      }
      if (t.mode !== "select") return;
      const { x: T, y: I } = t.screenToCanvas(x.clientX, x.clientY), O = t.hitTestAll(T, I, rt), z = O.find((W) => !t.isContainerType(W.type)) ?? O[0] ?? null;
      if (z != null && z.groupId) {
        const W = [];
        let E = z.groupId;
        for (; E; )
          W.push(E), E = t.groupParent.get(E);
        if (!t.activeGroupId) {
          t.enterGroup(W[W.length - 1]), t.select(z.id);
          return;
        }
        const R = W.indexOf(t.activeGroupId);
        if (R > 0) {
          t.enterGroup(W[R - 1]), t.select(z.id);
          return;
        }
      }
      if (z && z.type === "text") {
        t.select(z.id), rn.current = { clientX: x.clientX, clientY: x.clientY }, fo(z.id);
        return;
      }
      if (z && z.type === "sticky") {
        t.select(z.id), yo(z.id);
        return;
      }
      if (z && z.type === "frame") {
        t.select(z.id), Eo(z.id);
        return;
      }
      if (z && z.type === "shape") {
        const W = z.data, E = W.shape === "line" || W.shape === "arrow";
        t.select(z.id), E || Ro(z.id);
        return;
      }
      if (z && z.type === "draw") {
        t.select(z.id);
        return;
      }
      if (!z || z.type === "draw") {
        const E = t.getAllNodes().filter((R) => R.type === "shape").sort((R, B) => B.z - R.z).find((R) => !(R.data.shape === "line" || R.data.shape === "arrow") && Ur(R, T, I, t.viewport.zoom, !0));
        if (E) {
          t.select(E.id), Ro(E.id);
          return;
        }
      }
      z || (t.deselectAll(), ir(T, I, 300));
    },
    [t, rt, ir]
  ), el = ct(
    (x) => {
      if (K.current.set(x.pointerId, { x: x.clientX, y: x.clientY }), x.pointerType === "pen" && (j.current = !0), x.button !== 2 && Q(!0), x.pointerType === "touch" && (K.current.size >= 2 || j.current)) {
        q.current = !0, X.current && (clearTimeout(X.current), X.current = null, _.current = null);
        const z = new Map(K.current), W = [...K.current.keys()].find((L) => L !== x.pointerId);
        W !== void 0 && i().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: W,
            bubbles: !0,
            clientX: x.clientX,
            clientY: x.clientY
          })
        );
        const E = [...z.values()];
        let R = Ti(E[0], E[1] ?? E[0]);
        const B = (L) => {
          if (!z.has(L.pointerId)) return;
          z.set(L.pointerId, { x: L.clientX, y: L.clientY });
          const U = [...z.values()];
          if (U.length < 2) return;
          const Z = Ti(U[0], U[1]);
          if (t.pan(Z.mx - R.mx, Z.my - R.my), R.dist > 1) {
            const et = Math.min(Math.max(Z.dist / R.dist, 0.9), 1.1);
            t.zoomByFactor(et, Z.mx, Z.my);
          }
          R = Z;
        }, V = (L) => {
          K.current.delete(L.pointerId), z.delete(L.pointerId), L.pointerType === "pen" && (j.current = !1), z.size < 2 && !j.current && (q.current = !1, i().removeEventListener("pointermove", B), i().removeEventListener("pointerup", V), i().removeEventListener("pointercancel", V));
        };
        i().addEventListener("pointermove", B), i().addEventListener("pointerup", V), i().addEventListener("pointercancel", V);
        return;
      }
      if (q.current || t.presentationMode && !(x.button === 1 || x.button === 0 && N.current))
        return;
      if (ye && Ue(null), x.pointerType === "touch") {
        const z = x.clientX, W = x.clientY, E = x.pointerId;
        _.current = { clientX: z, clientY: W }, X.current = setTimeout(() => {
          if (X.current = null, !_.current || q.current) return;
          const R = vr(z, W, !1);
          Ue({ x: z, y: W, sections: R }), i().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: E,
              bubbles: !0,
              clientX: z,
              clientY: W
            })
          ), _.current = null;
        }, 500);
      }
      if (x.button === 1 || x.button === 0 && N.current) {
        x.preventDefault(), tt.current = !0;
        const z = t.viewport.x, W = t.viewport.y, E = x.clientX, R = x.clientY, B = s.current;
        B && (B.style.cursor = "grabbing");
        const V = (U) => {
          t.viewport.x = z + (U.clientX - E), t.viewport.y = W + (U.clientY - R), d({ ...t.viewport });
        }, L = () => {
          tt.current = !1, B && (B.style.cursor = N.current ? "grab" : t.lassoSelect ? No : ""), i().removeEventListener("pointermove", V), i().removeEventListener("pointerup", L);
        };
        i().addEventListener("pointermove", V), i().addEventListener("pointerup", L);
        return;
      }
      const { x: I, y: O } = t.screenToCanvas(x.clientX, x.clientY);
      if (x.pointerType === "touch" && X.current && t.hitTest(I, O, rt) && (clearTimeout(X.current), X.current = null, _.current = null), t.mode === "select") {
        if (x.button !== 0) return;
        if (x.altKey) {
          const E = t.hitTestAll(I, O, rt);
          if (E.length > 0) {
            const R = Ao.current, B = Math.abs(I - R.x) + Math.abs(O - R.y);
            let V = 0;
            B < 5 && (V = (R.index + 1) % E.length), Ao.current = { x: I, y: O, index: V }, t.select(E[V].id);
          }
          return;
        }
        let z = !1;
        !t.lassoSelect && t.selection.size >= 2 && ne && I >= ne.x && I <= ne.x + ne.w && O >= ne.y && O <= ne.y + ne.h && (z = !0);
        let W = null;
        if (!t.lassoSelect) {
          const E = t.hitTestAll(I, O, rt);
          W = E.find((R) => t.selection.has(R.id) && !t.isContainerType(R.type)) ?? E.find((R) => !t.isContainerType(R.type)) ?? E[0] ?? null, !W && !z && (W = Mc(t.nodes, I, O, t.viewport.zoom, rt, To));
        }
        if (W || z) {
          W && (t.activeGroupId && !t.isNodeInActiveGroup(W.id) && t.exitAllGroups(), x.shiftKey ? t.toggleSelect(W.id) : t.selection.has(W.id) || t.select(W.id));
          const E = Array.from(t.selection).filter(
            (Pt) => {
              var It;
              return !((It = t.getNode(Pt)) != null && It.locked);
            }
          );
          if (E.length === 0) return;
          const R = x.clientX, B = x.clientY, V = /* @__PURE__ */ new Set(), L = /* @__PURE__ */ new Set();
          for (const Pt of E) {
            const It = t.getNode(Pt);
            if (It && t.isContainerType(It.type)) {
              L.add(Pt);
              for (const Nt of t.getFrameDescendantIds(Pt))
                t.selection.has(Nt) || V.add(Nt);
            }
          }
          const U = [...E, ...V], Z = U.map((Pt) => {
            const It = t.getNode(Pt);
            return { id: Pt, x: It.x, y: It.y };
          }), et = t.selectionGroupId(), nt = et ? t.groupRotations.get(et) : null, pt = nt == null ? void 0 : nt.cx, Tt = nt == null ? void 0 : nt.cy;
          Ge(null);
          let Ct = !1, kt = null, At = R, Ht = B, Gt = !1;
          const at = new Set(U), wt = () => {
            kt = null;
            const Pt = (At - R) / t.viewport.zoom, It = (Ht - B) / t.viewport.zoom, { finalDx: Nt, finalDy: Qt } = t.computeDragSnap(
              Z,
              at,
              Pt,
              It,
              Gt
            ), te = Z.map((re) => ({
              id: re.id,
              patch: { x: re.x + Nt, y: re.y + Qt }
            }));
            t.updateMany(te), nt && et && t.groupRotations.set(et, {
              angle: nt.angle,
              cx: pt + Nt,
              cy: Tt + Qt
            });
          }, mt = (Pt) => {
            const It = (Pt.clientX - R) / t.viewport.zoom, Nt = (Pt.clientY - B) / t.viewport.zoom;
            if (!Ct)
              if (Math.abs(It) > 2 || Math.abs(Nt) > 2)
                Ct = !0, t.pushHistorySnapshot();
              else
                return;
            At = Pt.clientX, Ht = Pt.clientY, Gt = Pt.metaKey || Pt.ctrlKey, kt === null && (kt = requestAnimationFrame(wt));
          }, Ft = () => {
            if (kt !== null && (cancelAnimationFrame(kt), wt()), t.clearAlignGuides(), i().removeEventListener("pointermove", mt), i().removeEventListener("pointerup", Ft), Ct) {
              const Pt = E.filter(
                (It) => !V.has(It)
              );
              Pt.length > 0 && t.updateFrameMembership(Pt);
            }
          };
          i().addEventListener("pointermove", mt), i().addEventListener("pointerup", Ft);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          x.shiftKey || t.deselectAll();
          const E = new Set(t.selection);
          if (t.lassoSelect) {
            const R = [[I, O]];
            se([...R]);
            let B = null, V = 0;
            const L = (et = !1) => {
              B = null;
              const nt = et || V % 2 === 0;
              if (V++, nt && R.length >= 3) {
                const Tt = Ke(R, t.getAllNodes()).map((kt) => kt.id), Ct = x.shiftKey ? [.../* @__PURE__ */ new Set([...E, ...Tt])] : Tt;
                (Ct.length !== t.selection.size || Ct.some((kt) => !t.selection.has(kt))) && t.selectMultiple(Ct);
              }
              se([...R]);
            }, U = (et) => {
              const { x: nt, y: pt } = t.screenToCanvas(et.clientX, et.clientY);
              R.push([nt, pt]), B === null && (B = requestAnimationFrame(() => L(!1)));
            }, Z = () => {
              B !== null && cancelAnimationFrame(B), L(!0), i().removeEventListener("pointermove", U), i().removeEventListener("pointerup", Z), se(null), t.toggleLassoSelect();
            };
            i().addEventListener("pointermove", U), i().addEventListener("pointerup", Z);
          } else {
            const R = { startX: I, startY: O, endX: I, endY: O };
            ut(R);
            let B = null, V = 0;
            const L = (et = !1, nt = !1) => {
              B = null;
              const pt = Math.min(R.startX, R.endX), Tt = Math.min(R.startY, R.endY), Ct = Math.abs(R.endX - R.startX), kt = Math.abs(R.endY - R.startY), At = nt || et || V % 2 === 0;
              if (V++, At) {
                const Gt = Re(
                  { x: pt, y: Tt, w: Ct, h: kt },
                  t.getAllNodes()
                ).map((wt) => wt.id), at = x.shiftKey ? [.../* @__PURE__ */ new Set([...E, ...Gt])] : Gt;
                (at.length !== t.selection.size || at.some((wt) => !t.selection.has(wt))) && t.selectMultiple(at);
              }
              ut({ ...R });
            }, U = (et) => {
              const { x: nt, y: pt } = t.screenToCanvas(et.clientX, et.clientY);
              R.endX = nt, R.endY = pt, B === null && (B = requestAnimationFrame(() => L(!1)));
            }, Z = () => {
              B !== null && cancelAnimationFrame(B), L(!0), i().removeEventListener("pointermove", U), i().removeEventListener("pointerup", Z), ut(null);
            };
            i().addEventListener("pointermove", U), i().addEventListener("pointerup", Z);
          }
        }
      } else if (t.mode === "text") {
        if (sr.current) return;
        t.deselectAll();
        const z = I, W = O, E = {
          startX: I,
          startY: O,
          endX: I,
          endY: O
        };
        let R = !1;
        Se(E);
        const B = (L) => {
          const { x: U, y: Z } = t.screenToCanvas(L.clientX, L.clientY);
          E.endX = U, E.endY = Z;
          const et = Math.abs(E.endX - E.startX), nt = Math.abs(E.endY - E.startY);
          (et > 10 || nt > 10) && (R = !0), Se({ ...E });
        }, V = () => {
          i().removeEventListener("pointermove", B), i().removeEventListener("pointerup", V), Se(null);
          const L = R ? Math.max(Math.abs(E.endX - E.startX), 60) : 300, U = R ? Math.min(E.startX, E.endX) : z, Z = R ? Math.min(E.startY, E.endY) : W;
          ir(U, Z, L), sr.current = !0, s.current && (s.current.style.cursor = "crosshair");
        };
        i().addEventListener("pointermove", B), i().addEventListener("pointerup", V);
      } else if (t.mode === "note") {
        t.deselectAll();
        const z = I, W = O, E = {
          startX: I,
          startY: O,
          endX: I,
          endY: O
        };
        let R = !1;
        Se(E);
        const B = (L) => {
          const { x: U, y: Z } = t.screenToCanvas(L.clientX, L.clientY);
          E.endX = U, E.endY = Z;
          const et = Math.abs(E.endX - E.startX), nt = Math.abs(E.endY - E.startY);
          (et > 10 || nt > 10) && (R = !0), Se({ ...E });
        }, V = () => {
          i().removeEventListener("pointermove", B), i().removeEventListener("pointerup", V), Se(null);
          const L = R ? Math.max(Math.abs(E.endX - E.startX), 100) : 300, U = R ? Math.max(Math.abs(E.endY - E.startY), 40) : "auto", Z = R ? Math.min(E.startX, E.endX) : z, et = R ? Math.min(E.startY, E.endY) : W;
          Fs(Z, et, L, U), t.setMode("select");
        };
        i().addEventListener("pointermove", B), i().addEventListener("pointerup", V);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const z = I, W = O, E = {
          startX: I,
          startY: O,
          endX: I,
          endY: O
        };
        let R = !1;
        Se(E);
        const B = (L) => {
          const { x: U, y: Z } = t.screenToCanvas(L.clientX, L.clientY);
          E.endX = U, E.endY = Z, Math.abs(E.endX - E.startX) > 10 && (R = !0), Se({ ...E });
        }, V = () => {
          i().removeEventListener("pointermove", B), i().removeEventListener("pointerup", V), Se(null);
          const L = R ? Math.max(Math.abs(E.endX - E.startX), 100) : 200, U = R ? Math.min(E.startX, E.endX) : z, Z = R ? Math.min(E.startY, E.endY) : W, et = zt(10), nt = R ? Math.max(Math.abs(E.endY - E.startY), 100) : 150;
          t.addNode({
            id: et,
            type: "sticky",
            x: U,
            y: Z,
            w: L,
            h: nt,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(et), yo(et), t.setMode("select");
        };
        i().addEventListener("pointermove", B), i().addEventListener("pointerup", V);
      } else if (t.mode === "draw") {
        const z = x.pressure || 0.5, W = {
          points: [[I, O, z]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle
        };
        ht(W), t.notifyDrawProgress(W);
        const E = (B) => {
          const { x: V, y: L } = t.screenToCanvas(B.clientX, B.clientY), U = B.pressure || 0.5;
          W.points.push([V, L, U]), ht({ ...W, points: [...W.points] }), t.notifyDrawProgress({ ...W, points: [...W.points] });
        }, R = () => {
          if (i().removeEventListener("pointermove", E), i().removeEventListener("pointerup", R), t.notifyDrawEnd(), W.points.length < 2) {
            ht(null);
            return;
          }
          let B = 1 / 0, V = 1 / 0, L = -1 / 0, U = -1 / 0;
          for (const [et, nt] of W.points)
            et < B && (B = et), nt < V && (V = nt), et > L && (L = et), nt > U && (U = nt);
          const Z = W.points.map(
            ([et, nt, pt]) => [et - B, nt - V, pt]
          );
          t.addNode({
            id: zt(10),
            type: "draw",
            x: B,
            y: V,
            w: L - B,
            h: U - V,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: Z,
              color: W.color,
              strokeWidth: W.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => ht(null));
        };
        i().addEventListener("pointermove", E), i().addEventListener("pointerup", R);
      } else if (t.mode === "shape") {
        const z = {
          startX: I,
          startY: O,
          endX: I,
          endY: O
        };
        vt(z);
        const W = {
          shapeType: t.activeTool.shapeType || "rect",
          stroke: t.activeTool.color,
          strokeWidth: t.activeTool.width
        }, E = (B) => {
          const { x: V, y: L } = t.screenToCanvas(B.clientX, B.clientY);
          z.endX = V, z.endY = L, vt({ ...z }), t.notifyShapeProgress({ ...z, ...W });
        }, R = () => {
          i().removeEventListener("pointermove", E), i().removeEventListener("pointerup", R), t.notifyShapeEnd();
          const B = t.activeTool.shapeType || "rect", V = B === "line" || B === "arrow", L = Math.min(z.startX, z.endX);
          let U = Math.min(z.startY, z.endY);
          const Z = Math.abs(z.endX - z.startX), et = Math.abs(z.endY - z.startY);
          let nt;
          if (V) {
            const Ct = t.activeTool.width * 2;
            nt = Math.max(et, Ct), et < Ct && (U -= (Ct - et) / 2);
          } else
            nt = et;
          if (Z < 5 && (V ? Z < 5 && Math.abs(z.endY - z.startY) < 5 : nt < 5)) {
            vt(null);
            return;
          }
          const pt = {};
          V && (pt.startPoint = [
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
            w: Z,
            h: nt,
            z: t.nextZ(),
            data: {
              shape: B,
              stroke: t.activeTool.color,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle,
              strokeWidth: t.activeTool.width,
              strokeStyle: t.activeTool.strokeStyle,
              roughness: t.activeTool.roughness ?? 1,
              opacity: t.activeTool.opacity ?? 1,
              ...pt
            }
          }), vt(null), t.setMode("select"), t.select(Tt);
        };
        i().addEventListener("pointermove", E), i().addEventListener("pointerup", R);
      } else if (t.mode === "edge") {
        const z = t.hitTest(I, O, rt);
        if (!z || z.type === "edge") return;
        xt({ fromNode: z, cursorX: I, cursorY: O });
        const W = (R) => {
          const { x: B, y: V } = t.screenToCanvas(R.clientX, R.clientY);
          xt(
            (L) => L ? { ...L, cursorX: B, cursorY: V } : null
          );
        }, E = (R) => {
          i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", E), xt(null);
          const { x: B, y: V } = t.screenToCanvas(R.clientX, R.clientY);
          let L = t.hitTest(B, V, rt);
          if (!L || L.type === "edge" || t.isContainerType(L.type)) {
            const pt = 50 / t.viewport.zoom;
            let Tt = 1 / 0, Ct = !1, kt = null;
            for (const At of t.getAllNodes()) {
              if (At.type === "edge" || At.id === z.id) continue;
              const Ht = t.isContainerType(At.type), Gt = Uo(At, rt);
              for (const at of Gt) {
                const wt = Math.hypot(at.x - B, at.y - V);
                wt >= pt || Ht && !Ct && kt || (!Ht && Ct || wt < Tt) && (Tt = wt, Ct = Ht, kt = At);
              }
            }
            kt && (L = kt);
          }
          if (!L || L.type === "edge" || L.id === z.id)
            return;
          const U = Ir(z, I, O, rt), Z = Ir(L, B, V, rt);
          if (t.getAllNodes().some((pt) => pt.type !== "edge" ? !1 : Tn(pt.data, {
            fromId: z.id,
            toId: L.id,
            sourceHandle: U,
            targetHandle: Z
          }))) return;
          const nt = {
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
              targetHandle: Z
            }
          };
          t.addNode(nt), t.select(nt.id);
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", E);
      } else if (t.mode === "frame") {
        const z = {
          startX: I,
          startY: O,
          endX: I,
          endY: O
        };
        vt(z);
        const W = (R) => {
          const { x: B, y: V } = t.screenToCanvas(R.clientX, R.clientY);
          z.endX = B, z.endY = V, vt({ ...z });
        }, E = () => {
          i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", E);
          const R = Math.min(z.startX, z.endX), B = Math.min(z.startY, z.endY), V = Math.abs(z.endX - z.startX), L = Math.abs(z.endY - z.startY);
          if (V < 20 || L < 20) {
            vt(null);
            return;
          }
          const U = zt(10);
          t.addNode({
            id: U,
            type: "frame",
            x: R,
            y: B,
            w: V,
            h: L,
            z: t.nextZ(),
            data: {
              label: n.typeFrame,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(U), vt(null), t.select(U), t.setMode("select");
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", E);
      } else if (t.mode === "erase") {
        if (x.button !== 0) return;
        const z = (pt, Tt) => {
          const Ct = t.hitTestAll(pt, Tt, rt), kt = Sc(
            t.nodes,
            pt,
            Tt,
            t.viewport.zoom,
            rt,
            To
          );
          let At = !1;
          for (const Ht of [...Ct, ...kt])
            go.current.has(Ht.id) || (go.current.add(Ht.id), At = !0);
          At && an(new Set(go.current));
        }, W = 400;
        go.current = /* @__PURE__ */ new Set();
        const E = performance.now();
        Le.current = [[I, O, E]], nr([[I, O, E]]), z(I, O);
        let R = I, B = O;
        const V = () => {
          const pt = performance.now(), Tt = Le.current.length;
          Le.current = Le.current.filter(
            (Ct) => pt - Ct[2] < W
          ), Le.current.length !== Tt && nr([...Le.current]), Ze.current = requestAnimationFrame(V);
        };
        Ze.current = requestAnimationFrame(V);
        const L = (pt) => {
          const { x: Tt, y: Ct } = t.screenToCanvas(pt.clientX, pt.clientY);
          R = Tt, B = Ct;
          const kt = performance.now();
          Le.current.push([R, B, kt]), nr([...Le.current]), z(R, B);
        }, U = () => {
          Ze.current !== null && (cancelAnimationFrame(Ze.current), Ze.current = null), go.current = /* @__PURE__ */ new Set(), an(/* @__PURE__ */ new Set()), Le.current = [], nr([]);
        }, Z = () => {
          nt();
          const pt = Array.from(go.current);
          U(), pt.length > 0 && t.deleteNodes(pt);
        }, et = (pt) => {
          pt.key === "Escape" && (nt(), U());
        }, nt = () => {
          i().removeEventListener("pointermove", L), i().removeEventListener("pointerup", Z), i().removeEventListener("keydown", et);
        };
        i().addEventListener("pointermove", L), i().addEventListener("pointerup", Z), i().addEventListener("keydown", et);
      } else if (t.mode === "laser") {
        if (x.button !== 0) return;
        const z = 1560;
        Do.current !== null && (cancelAnimationFrame(Do.current), Do.current = null);
        const W = performance.now();
        pe.current.length > 0 && pe.current.push([NaN, NaN, W]), pe.current.push([I, O, W]), kr([...pe.current]), t.notifyLaserProgress([[I, O]]);
        let E = W;
        const R = () => {
          const L = performance.now(), U = pe.current.length;
          pe.current = pe.current.filter(
            (Z) => L - Z[2] < z
          ), (pe.current.length !== U || pe.current.length > 0) && kr([...pe.current]), L - E >= 60 && (E = L, pe.current.length > 0 && t.notifyLaserProgress(
            pe.current.map((Z) => [Z[0], Z[1]])
          )), pe.current.length > 0 ? Do.current = requestAnimationFrame(R) : (Do.current = null, kr([]), t.notifyLaserEnd());
        };
        Do.current = requestAnimationFrame(R);
        const B = (L) => {
          const { x: U, y: Z } = t.screenToCanvas(L.clientX, L.clientY), et = performance.now();
          pe.current.push([U, Z, et]), kr([...pe.current]), t.notifyLaserProgress(
            pe.current.map((nt) => [nt[0], nt[1]])
          );
        }, V = () => {
          i().removeEventListener("pointermove", B), i().removeEventListener("pointerup", V);
        };
        i().addEventListener("pointermove", B), i().addEventListener("pointerup", V);
      } else if (t.mode === "hand") {
        if (x.button !== 0) return;
        x.preventDefault();
        const z = t.viewport.x, W = t.viewport.y, E = x.clientX, R = x.clientY, B = s.current;
        B && (B.style.cursor = "grabbing");
        const V = (U) => {
          t.viewport.x = z + (U.clientX - E), t.viewport.y = W + (U.clientY - R), d({ ...t.viewport });
        }, L = () => {
          B && (B.style.cursor = t.lassoSelect ? No : Rr(t.mode)), i().removeEventListener("pointermove", V), i().removeEventListener("pointerup", L);
        };
        i().addEventListener("pointermove", V), i().addEventListener("pointerup", L);
      }
    },
    [
      t,
      Fs,
      ir,
      ye,
      vr,
      ne,
      rt,
      ue,
      Re,
      Q
    ]
  ), cn = ct(
    (x, T, I) => {
      if (I.preventDefault(), t.presentationMode) return;
      const O = t.getNode(x);
      if (!O || O.locked) return;
      const z = I.clientX, W = I.clientY, E = O.x, R = O.y, B = O.w, V = O.h === "auto", L = V ? rt[x] ?? 100 : O.h, U = O.type === "draw" ? O.data.points.map(
        (Ct) => [...Ct]
      ) : null, Z = O.type === "shape" ? O.data.startPoint : void 0, et = O.type === "shape" ? O.data.endPoint : void 0, nt = O.type === "text" ? O.data.fontSize : 0;
      t.pushHistorySnapshot();
      const pt = (Ct) => {
        const kt = (Ct.clientX - z) / t.viewport.zoom, At = (Ct.clientY - W) / t.viewport.zoom;
        let Ht = E, Gt = R, at = B, wt = L;
        if ((T === "nw" || T === "w" || T === "sw") && (Ht = E + kt, at = B - kt), (T === "ne" || T === "e" || T === "se") && (at = B + kt), (T === "nw" || T === "n" || T === "ne") && (Gt = R + At, wt = L - At), (T === "sw" || T === "s" || T === "se") && (wt = L + At), t.snapToGrid && !(Ct.metaKey || Ct.ctrlKey)) {
          const Pt = t.gridSize, It = (Nt) => Math.round(Nt / Pt) * Pt;
          (T === "nw" || T === "w" || T === "sw") && (Ht = It(Ht), at = E + B - Ht), (T === "ne" || T === "e" || T === "se") && (at = It(Ht + at) - Ht), (T === "nw" || T === "n" || T === "ne") && (Gt = It(Gt), wt = R + L - Gt), (T === "sw" || T === "s" || T === "se") && (wt = It(Gt + wt) - Gt);
        }
        const mt = 10;
        if (at < mt && (at = mt, (T === "nw" || T === "w" || T === "sw") && (Ht = E + B - mt)), wt < mt && (wt = mt, (T === "nw" || T === "n" || T === "ne") && (Gt = R + L - mt)), O.type === "frame") {
          const Pt = O.data.devicePreset;
          if (Pt) {
            const It = Qn(Pt);
            if (It) {
              const Nt = Va(It);
              if (T === "nw" || T === "ne" || T === "sw" || T === "se" || (T === "e" || T === "w")) {
                const re = Math.round(at / Nt);
                (T === "nw" || T === "ne") && (Gt = R + L - re), wt = re;
              } else
                at = Math.round(wt * Nt);
            }
          }
        }
        const Ft = {
          x: Ht,
          y: Gt,
          w: at,
          h: V ? "auto" : wt
        };
        if (U && O.type === "draw") {
          const Pt = B > 0 ? at / B : 1, It = L > 0 ? wt / L : 1, Nt = U.map(
            ([Qt, te, re]) => [Qt * Pt, te * It, re]
          );
          Ft.data = { ...O.data, points: Nt };
        }
        if (O.type === "shape" && (Z || et)) {
          const Pt = B > 0 ? at / B : 1, It = L > 0 ? wt / L : 1, Nt = { ...O.data };
          Z && (Nt.startPoint = [
            Z[0] * Pt,
            Z[1] * It
          ]), et && (Nt.endPoint = [
            et[0] * Pt,
            et[1] * It
          ]), Ft.data = Nt;
        }
        if (O.type === "text" && nt > 0 && T !== "e" && T !== "w") {
          const Pt = T === "n" || T === "s" ? L > 0 ? wt / L : 1 : B > 0 ? at / B : 1, It = Math.max(8, Math.round(nt * Pt));
          Ft.data = { ...O.data, fontSize: It };
        }
        t.updateNode(x, Ft);
      }, Tt = () => {
        i().removeEventListener("pointermove", pt), i().removeEventListener("pointerup", Tt), t.isContainerType(O.type) && t.syncFrameChildrenAfterResize(x);
      };
      i().addEventListener("pointermove", pt), i().addEventListener("pointerup", Tt);
    },
    [t, rt]
  ), ol = ct(
    (x, T) => {
      T.stopPropagation(), T.preventDefault();
      const I = t.getNode(x);
      if (!I || I.locked) return;
      const O = I.h === "auto" ? rt[x] ?? 100 : I.h, z = I.x + I.w / 2, W = I.y + O / 2, E = I.rotation || 0, { x: R, y: B } = t.screenToCanvas(
        T.clientX,
        T.clientY
      ), V = Math.atan2(B - W, R - z);
      t.pushHistorySnapshot();
      const L = (Z) => {
        const { x: et, y: nt } = t.screenToCanvas(Z.clientX, Z.clientY), pt = Math.atan2(nt - W, et - z);
        let Tt = E + (pt - V) * (180 / Math.PI);
        (Z.shiftKey || t.snapToGrid) && !(Z.metaKey || Z.ctrlKey) && (Tt = Math.round(Tt / 15) * 15), t.updateNode(x, { rotation: Tt });
      }, U = () => {
        i().removeEventListener("pointermove", L), i().removeEventListener("pointerup", U);
      };
      i().addEventListener("pointermove", L), i().addEventListener("pointerup", U);
    },
    [t, rt]
  ), Ns = ct(
    (x, T, I) => {
      I.stopPropagation(), I.preventDefault();
      const O = t.getNode(x);
      if (!O) return;
      const { x: z, y: W } = t.screenToCanvas(I.clientX, I.clientY);
      xt({ fromNode: O, cursorX: z, cursorY: W, sourceHandle: T });
      const E = (B) => {
        const { x: V, y: L } = t.screenToCanvas(B.clientX, B.clientY);
        xt(
          (U) => U ? { ...U, cursorX: V, cursorY: L } : null
        );
      }, R = (B) => {
        i().removeEventListener("pointermove", E), i().removeEventListener("pointerup", R), xt(null);
        const { x: V, y: L } = t.screenToCanvas(B.clientX, B.clientY);
        let U = t.hitTest(V, L, rt);
        if (!U || U.type === "edge" || t.isContainerType(U.type)) {
          const pt = 50 / t.viewport.zoom;
          let Tt = 1 / 0, Ct = !1, kt = null;
          for (const At of t.getAllNodes()) {
            if (At.type === "edge" || At.id === O.id) continue;
            const Ht = t.isContainerType(At.type), Gt = Uo(At, rt);
            for (const at of Gt) {
              const wt = Math.hypot(at.x - V, at.y - L);
              wt >= pt || Ht && !Ct && kt || (!Ht && Ct || wt < Tt) && (Tt = wt, Ct = Ht, kt = At);
            }
          }
          kt && (U = kt);
        }
        if (!U || U.type === "edge" || U.id === O.id)
          return;
        const Z = Ir(U, V, L, rt);
        if (t.getAllNodes().some((pt) => pt.type !== "edge" ? !1 : Tn(pt.data, {
          fromId: O.id,
          toId: U.id,
          sourceHandle: T,
          targetHandle: Z
        }))) return;
        const nt = {
          id: zt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: O.id,
            toId: U.id,
            style: "solid",
            color: t.activeTool.color,
            strokeWidth: 2,
            arrowHead: "arrow",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: T,
            targetHandle: Z
          }
        };
        t.addNode(nt), t.select(nt.id);
      };
      i().addEventListener("pointermove", E), i().addEventListener("pointerup", R);
    },
    [t, rt]
  ), rl = ct(
    (x) => {
      let T = null, I = x === "top" || x === "left" ? 1 / 0 : -1 / 0;
      for (const O of t.selection) {
        const z = t.getNode(O);
        if (!z || z.type === "edge") continue;
        const W = z.h === "auto" ? rt[z.id] ?? 100 : z.h;
        let E;
        switch (x) {
          case "top":
            E = z.y;
            break;
          case "bottom":
            E = z.y + W;
            break;
          case "left":
            E = z.x;
            break;
          case "right":
            E = z.x + z.w;
            break;
        }
        (x === "top" || x === "left" ? E < I : E > I) && (I = E, T = O);
      }
      return T;
    },
    [t, rt]
  ), nl = ct(
    (x, T, I, O) => {
      var Z;
      O.stopPropagation(), O.preventDefault();
      const z = t.getNode(x);
      if (!z || !o) return;
      const W = o.get(z.type), E = (Z = W == null ? void 0 : W.ports) == null ? void 0 : Z.find((et) => et.id === T);
      if (!E) return;
      const R = I === "input" ? "left" : "right", { x: B, y: V } = t.screenToCanvas(O.clientX, O.clientY);
      xt({
        fromNode: z,
        cursorX: B,
        cursorY: V,
        sourceHandle: R,
        sourcePort: T,
        sourceDirection: I
      });
      const L = (et) => {
        const { x: nt, y: pt } = t.screenToCanvas(et.clientX, et.clientY);
        xt(
          (Tt) => Tt ? { ...Tt, cursorX: nt, cursorY: pt } : null
        );
      }, U = (et) => {
        var Ie;
        i().removeEventListener("pointermove", L), i().removeEventListener("pointerup", U), xt(null);
        const { x: nt, y: pt } = t.screenToCanvas(et.clientX, et.clientY), Tt = I === "output" ? "input" : "output", Ct = 40 / t.viewport.zoom;
        let kt = null, At = null, Ht = 1 / 0;
        for (const ee of t.getAllNodes()) {
          if (ee.type === "edge" || ee.id === z.id) continue;
          const ce = o.get(ee.type);
          if (!((Ie = ce == null ? void 0 : ce.ports) != null && Ie.length)) continue;
          const De = ee.h === "auto" ? t.measuredHeights[ee.id] ?? 100 : ee.h;
          for (const ze of ce.ports) {
            if (ze.direction !== Tt || E.dataType !== "any" && ze.dataType !== "any" && E.dataType !== ze.dataType) continue;
            const Wo = ce.ports.filter((gl) => gl.direction === ze.direction), un = Wo.indexOf(ze), Sr = 14 / t.viewport.zoom, fl = ee.y + De / (Wo.length + 1) * (un + 1), yl = ze.direction === "input" ? ee.x - Sr : ee.x + ee.w + Sr, pn = Math.hypot(yl - nt, fl - pt);
            pn < Ct && pn < Ht && (Ht = pn, kt = ee, At = ze);
          }
        }
        if (!kt || !At) return;
        const Gt = At.id, at = I === "output" ? kt.id : z.id, wt = I === "output" ? Gt : T;
        if (t.getAllNodes().some((ee) => {
          if (ee.type !== "edge") return !1;
          const ce = ee.data;
          return ce.toId === at && ce.targetPort === wt;
        })) return;
        const Ft = I === "output" ? z.id : kt.id, Pt = I === "output" ? kt.id : z.id, It = I === "output" ? T : Gt, Nt = I === "output" ? Gt : T, re = {
          id: zt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Ft,
            toId: Pt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: It,
            targetPort: Nt
          }
        };
        t.addNode(re), t.select(re.id);
      };
      i().addEventListener("pointermove", L), i().addEventListener("pointerup", U);
    },
    [t, o, rt]
  ), [Hs, sl] = $(0);
  bt(() => {
    if (r)
      return r.onChange(() => sl((x) => x + 1));
  }, [r]);
  const il = ct(
    (x, T, I, O, z) => {
      z.stopPropagation(), z.preventDefault();
      const W = t.getNode(x);
      if (!W || W.type !== "edge") return;
      t.pushHistorySnapshot();
      const E = (B) => {
        const V = t.screenToCanvas(B.clientX, B.clientY), L = t.getNode(x);
        if (!L) return;
        const U = t.getNode(L.data.fromId), Z = t.getNode(L.data.toId);
        if (!(!U || !Z))
          if (T === "xy") {
            const et = Ye(
              U,
              Z,
              L.data.edgeType || "bezier",
              rt,
              L.data.sourceHandle,
              L.data.targetHandle,
              void 0,
              void 0
              // no offsets → natural midpoint
            );
            if (!et.kinkHandle) return;
            const nt = V.x - et.kinkHandle.x, pt = V.y - et.kinkHandle.y;
            t.updateNode(x, {
              data: { ...L.data, curveOffset: [nt, pt] }
            });
          } else {
            const et = T === "x" ? V.x : V.y, nt = Ye(
              U,
              Z,
              L.data.edgeType || "bezier",
              rt,
              L.data.sourceHandle,
              L.data.targetHandle,
              0.5
              // default to get range
            );
            if (!nt.kinkHandle) return;
            const pt = nt.kinkHandle.min, Tt = nt.kinkHandle.max, Ct = Tt - pt;
            if (Ct === 0) return;
            const At = (Math.max(pt, Math.min(Tt, et)) - pt) / Ct;
            t.updateNode(x, {
              data: { ...L.data, midpointOffset: At }
            });
          }
      }, R = () => {
        i().removeEventListener("pointermove", E), i().removeEventListener("pointerup", R);
      };
      i().addEventListener("pointermove", E), i().addEventListener("pointerup", R);
    },
    [t, rt]
  ), al = ct(
    (x, T, I) => {
      I.stopPropagation(), I.preventDefault();
      const O = t.getNode(x);
      if (!O || O.type !== "edge") return;
      const { fromId: z, toId: W, sourceHandle: E, targetHandle: R } = O.data, B = T === "source" ? W : z, V = T === "source" ? R : E, L = t.getNode(z), U = t.getNode(W);
      if (!L || !U) return;
      const Z = Ye(
        L,
        U,
        O.data.edgeType || "bezier",
        rt,
        E,
        R
      ), et = T === "source" ? { x: Z.x1, y: Z.y1 } : { x: Z.x2, y: Z.y2 };
      Lt({
        edgeId: x,
        endpoint: T,
        anchorNodeId: B,
        anchorHandle: V,
        cursorX: et.x,
        cursorY: et.y
      });
      const nt = (Tt) => {
        const { x: Ct, y: kt } = t.screenToCanvas(Tt.clientX, Tt.clientY);
        Lt(
          (At) => At ? { ...At, cursorX: Ct, cursorY: kt } : null
        );
      }, pt = (Tt) => {
        i().removeEventListener("pointermove", nt), i().removeEventListener("pointerup", pt), Lt(null);
        const { x: Ct, y: kt } = t.screenToCanvas(Tt.clientX, Tt.clientY);
        let At = t.hitTest(Ct, kt, rt);
        if (!At || At.type === "edge" || t.isContainerType(At.type)) {
          const It = 50 / t.viewport.zoom;
          let Nt = 1 / 0, Qt = !1, te = null;
          for (const re of t.getAllNodes()) {
            if (re.type === "edge") continue;
            const Ie = t.isContainerType(re.type), ee = Uo(re, rt);
            for (const ce of ee) {
              const De = Math.hypot(ce.x - Ct, ce.y - kt);
              De >= It || Ie && !Qt && te || (!Ie && Qt || De < Nt) && (Nt = De, Qt = Ie, te = re);
            }
          }
          te && (At = te);
        }
        if (!At || At.type === "edge") return;
        const Ht = T === "source" ? At.id : z, Gt = T === "target" ? At.id : W;
        if (Ht === Gt) return;
        const at = T === "source" ? z : W;
        if (At.id === at) return;
        const wt = Ir(At, Ct, kt, rt), mt = T === "source" ? {
          fromId: Ht,
          toId: Gt,
          sourceHandle: wt,
          targetHandle: R,
          sourcePort: O.data.sourcePort,
          targetPort: O.data.targetPort
        } : {
          fromId: Ht,
          toId: Gt,
          sourceHandle: E,
          targetHandle: wt,
          sourcePort: O.data.sourcePort,
          targetPort: O.data.targetPort
        };
        if (t.getAllNodes().some((It) => It.type !== "edge" || It.id === x ? !1 : Tn(It.data, mt))) return;
        const Pt = T === "source" ? { fromId: At.id, sourceHandle: wt } : { toId: At.id, targetHandle: wt };
        t.updateNodeWithHistory(x, { data: Pt });
      };
      i().addEventListener("pointermove", nt), i().addEventListener("pointerup", pt);
    },
    [t, rt]
  ), ll = ct(
    (x) => {
      if (x.stopPropagation(), x.preventDefault(), t.presentationMode) return;
      const T = Array.from(t.selection).map((mt) => t.getNode(mt)).filter(Boolean);
      if (T.length < 2) return;
      const O = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, z = O ? t.groupRotations.get(O) : null;
      let W, E;
      if (z)
        W = z.cx, E = z.cy;
      else {
        let mt = 1 / 0, Ft = 1 / 0, Pt = -1 / 0, It = -1 / 0;
        for (const Nt of T) {
          const Qt = Nt.h === "auto" ? rt[Nt.id] ?? 100 : Nt.h, te = ue(Nt, Qt);
          mt = Math.min(mt, te.minX), Ft = Math.min(Ft, te.minY), Pt = Math.max(Pt, te.maxX), It = Math.max(It, te.maxY);
        }
        W = (mt + Pt) / 2, E = (Ft + It) / 2;
      }
      const R = (z == null ? void 0 : z.angle) ?? 0, V = T.filter((mt) => !mt.locked).map((mt) => {
        const Ft = mt.h === "auto" ? rt[mt.id] ?? 100 : mt.h;
        return {
          id: mt.id,
          cx: mt.x + mt.w / 2,
          cy: mt.y + Ft / 2,
          w: mt.w,
          h: Ft,
          rotation: mt.rotation || 0
        };
      }), L = -R * Math.PI / 180, U = Math.cos(L), Z = Math.sin(L);
      let et = 1 / 0, nt = 1 / 0, pt = -1 / 0, Tt = -1 / 0;
      for (const mt of V) {
        const Ft = mt.cx - W, Pt = mt.cy - E, It = W + Ft * U - Pt * Z, Nt = E + Ft * Z + Pt * U;
        et = Math.min(et, It - mt.w / 2), nt = Math.min(nt, Nt - mt.h / 2), pt = Math.max(pt, It + mt.w / 2), Tt = Math.max(Tt, Nt + mt.h / 2);
      }
      const Ct = {
        x: et - le,
        y: nt - le,
        w: pt - et + le * 2,
        h: Tt - nt + le * 2
      }, { x: kt, y: At } = t.screenToCanvas(x.clientX, x.clientY), Ht = Math.atan2(At - E, kt - W);
      t.pushHistorySnapshot();
      let Gt = R;
      const at = (mt) => {
        const { x: Ft, y: Pt } = t.screenToCanvas(mt.clientX, mt.clientY);
        let Nt = (Math.atan2(Pt - E, Ft - W) - Ht) * (180 / Math.PI);
        (mt.shiftKey || t.snapToGrid) && !(mt.metaKey || mt.ctrlKey) && (Nt = Math.round(Nt / 15) * 15), Gt = R + Nt, Ge({ angle: Gt, cx: W, cy: E, bounds: Ct });
        const Qt = Nt * Math.PI / 180, te = Math.cos(Qt), re = Math.sin(Qt), Ie = V.map((ee) => {
          const ce = ee.cx - W, De = ee.cy - E, ze = W + ce * te - De * re, Wo = E + ce * re + De * te;
          return {
            id: ee.id,
            patch: {
              x: ze - ee.w / 2,
              y: Wo - ee.h / 2,
              rotation: Gt
            }
          };
        });
        t.updateMany(Ie);
      }, wt = () => {
        O && t.groupRotations.set(O, { angle: Gt, cx: W, cy: E }), Ge({ angle: Gt, cx: W, cy: E, bounds: Ct }), i().removeEventListener("pointermove", at), i().removeEventListener("pointerup", wt);
      };
      i().addEventListener("pointermove", at), i().addEventListener("pointerup", wt);
    },
    [t, rt, ue]
  ), cl = ct(
    (x, T) => {
      if (T.stopPropagation(), T.preventDefault(), t.presentationMode) return;
      const I = Array.from(t.selection).map((at) => t.getNode(at)).filter(Boolean);
      if (I.length < 2) return;
      const O = (at) => at.h === "auto" ? rt[at.id] ?? 100 : at.h;
      let z = 1 / 0, W = 1 / 0, E = -1 / 0, R = -1 / 0;
      for (const at of I) {
        const wt = O(at), mt = ue(at, wt);
        z = Math.min(z, mt.minX), W = Math.min(W, mt.minY), E = Math.max(E, mt.maxX), R = Math.max(R, mt.maxY);
      }
      const B = { x: z, y: W, w: E - z, h: R - W }, V = B.w || 1, L = B.h || 1, Z = I.filter((at) => !at.locked).map((at) => {
        const wt = O(at);
        return {
          id: at.id,
          type: at.type,
          isAutoH: at.h === "auto",
          relX: (at.x - B.x) / V,
          relY: (at.y - B.y) / L,
          relW: at.w / V,
          relH: wt / L,
          origW: at.w,
          origH: wt,
          origPoints: at.type === "draw" ? at.data.points.map((mt) => [...mt]) : null,
          drawData: at.type === "draw" ? { ...at.data } : null
        };
      }), et = T.clientX, nt = T.clientY;
      t.pushHistorySnapshot();
      let pt = null, Tt = et, Ct = nt, kt = !1;
      const At = () => {
        pt = null;
        const at = (Tt - et) / t.viewport.zoom, wt = (Ct - nt) / t.viewport.zoom;
        let mt = B.x, Ft = B.y, Pt = B.w, It = B.h;
        if ((x === "nw" || x === "w" || x === "sw") && (mt = B.x + at, Pt = B.w - at), (x === "ne" || x === "e" || x === "se") && (Pt = B.w + at), (x === "nw" || x === "n" || x === "ne") && (Ft = B.y + wt, It = B.h - wt), (x === "sw" || x === "s" || x === "se") && (It = B.h + wt), t.snapToGrid && !kt) {
          const Qt = t.gridSize, te = (re) => Math.round(re / Qt) * Qt;
          (x === "nw" || x === "w" || x === "sw") && (mt = te(mt), Pt = B.x + B.w - mt), (x === "ne" || x === "e" || x === "se") && (Pt = te(mt + Pt) - mt), (x === "nw" || x === "n" || x === "ne") && (Ft = te(Ft), It = B.y + B.h - Ft), (x === "sw" || x === "s" || x === "se") && (It = te(Ft + It) - Ft);
        }
        Pt < 20 && (Pt = 20, (x === "nw" || x === "w" || x === "sw") && (mt = B.x + B.w - 20)), It < 20 && (It = 20, (x === "nw" || x === "n" || x === "ne") && (Ft = B.y + B.h - 20));
        const Nt = Z.map((Qt) => {
          const te = mt + Qt.relX * Pt, re = Ft + Qt.relY * It, Ie = Qt.relW * Pt, ee = Qt.relH * It, ce = {
            x: te,
            y: re,
            w: Ie,
            h: Qt.isAutoH ? "auto" : ee
          };
          if (Qt.origPoints && Qt.drawData) {
            const De = Qt.origW > 0 ? Ie / Qt.origW : 1, ze = Qt.origH > 0 ? ee / Qt.origH : 1;
            ce.data = {
              ...Qt.drawData,
              points: Qt.origPoints.map(
                ([Wo, un, Sr]) => [Wo * De, un * ze, Sr]
              )
            };
          }
          return { id: Qt.id, patch: ce };
        });
        t.updateMany(Nt);
      }, Ht = (at) => {
        Tt = at.clientX, Ct = at.clientY, kt = at.metaKey || at.ctrlKey, pt === null && (pt = requestAnimationFrame(At));
      }, Gt = () => {
        pt !== null && (cancelAnimationFrame(pt), At()), i().removeEventListener("pointermove", Ht), i().removeEventListener("pointerup", Gt);
        for (const at of I)
          t.isContainerType(at.type) && t.syncFrameChildrenAfterResize(at.id);
      };
      i().addEventListener("pointermove", Ht), i().addEventListener("pointerup", Gt);
    },
    [t, rt, ue]
  );
  bt(() => {
    s.current && (s.current.style.cursor = t.lassoSelect ? No : Rr(y)), y !== "select" && y !== "edge" && (or.current = null, en(null)), y !== "erase" && (Ze.current !== null && (cancelAnimationFrame(Ze.current), Ze.current = null), go.current = /* @__PURE__ */ new Set(), an(/* @__PURE__ */ new Set()), Le.current = [], nr([]));
  }, [y]);
  const dn = dt(null), Os = dt(null), dl = ct(
    (x) => {
      if (X.current && x.pointerType === "touch" && _.current) {
        const T = x.clientX - _.current.clientX, I = x.clientY - _.current.clientY;
        Math.sqrt(T * T + I * I) > 8 && (clearTimeout(X.current), X.current = null, _.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (Os.current = { clientX: x.clientX, clientY: x.clientY }, dn.current === null && (dn.current = requestAnimationFrame(() => {
        dn.current = null;
        const T = s.current, I = Os.current;
        if (!T || !I) return;
        const { x: O, y: z } = t.screenToCanvas(I.clientX, I.clientY);
        if (t.lassoSelect) {
          T.style.cursor = No;
          return;
        }
        if (t.mode === "edge") {
          const R = t.hitTest(O, z, rt), B = R && R.type !== "edge" ? R.id : null;
          B !== or.current && (or.current = B, en(B));
          return;
        }
        if (t.selection.size >= 2 && ne && O >= ne.x && O <= ne.x + ne.w && z >= ne.y && z <= ne.y + ne.h) {
          T.style.cursor = "move";
          return;
        }
        const W = t.hitTest(O, z, rt), E = W ? W.id : null;
        if (E !== or.current && (or.current = E, en(E)), W) {
          T.style.cursor = "move";
          return;
        }
        T.style.cursor = "default";
      })));
    },
    [t, ne, rt, ue]
  ), hl = ct((x) => {
    (x.dataTransfer.types.includes("Files") || x.dataTransfer.types.includes(qn) || x.dataTransfer.types.includes(Kn) || x.dataTransfer.types.includes(Un)) && (x.preventDefault(), x.dataTransfer.dropEffect = "copy");
  }, []), ul = ct(
    (x) => {
      if (x.preventDefault(), t.presentationMode) return;
      const T = x.dataTransfer.getData(Un);
      if (T) {
        try {
          const B = JSON.parse(T);
          Fa(t, B, x.clientX, x.clientY);
        } catch (B) {
          console.error("Failed to place GIF:", B);
        }
        return;
      }
      const I = x.dataTransfer.getData(Kn);
      if (I) {
        try {
          const { itemId: B } = JSON.parse(I), L = Aa().find((U) => U.id === B);
          L && Da(t, L, x.clientX, x.clientY);
        } catch (B) {
          console.error("Failed to place personal library item:", B);
        }
        return;
      }
      const O = x.dataTransfer.getData(qn);
      if (O) {
        try {
          const { libraryId: B, itemId: V } = JSON.parse(O), U = ms(B).find((Z) => Z.id === V);
          U && La(t, U, x.clientX, x.clientY);
        } catch (B) {
          console.error("Failed to place library item:", B);
        }
        return;
      }
      const z = x.dataTransfer.files[0];
      if (!z) return;
      if (z.name.endsWith(".excalidrawlib") || z.name.endsWith(".excalidrawlib.json")) {
        const B = new FileReader();
        B.onload = () => {
          try {
            const V = JSON.parse(B.result);
            if (V.type === "excalidrawlib") {
              const L = z.name.replace(/\.excalidrawlib(\.json)?$/, "");
              bs(V, { name: L });
            }
          } catch (V) {
            console.error("Failed to import library:", V);
          }
        }, B.readAsText(z);
        return;
      }
      if (z.type === "image/svg+xml" || z.name.endsWith(".svg")) {
        const B = new FileReader();
        B.onload = () => {
          const V = B.result, L = Zn(V);
          L && Yh(t, L, x.clientX, x.clientY);
        }, B.readAsText(z);
        return;
      }
      if (!z.type.startsWith("image/")) return;
      const { x: W, y: E } = t.screenToCanvas(x.clientX, x.clientY), R = new FileReader();
      R.onload = () => {
        const B = R.result, V = new Image();
        V.onload = () => {
          const L = Math.min(V.naturalWidth, 400), U = Math.min(V.naturalHeight, 300), Z = V.naturalWidth / V.naturalHeight, et = Z >= 1 ? L : U * Z, nt = Z >= 1 ? L / Z : U;
          t.addNode({
            id: zt(10),
            type: "image",
            x: W,
            y: E,
            w: et,
            h: nt,
            z: t.nextZ(),
            data: { src: B }
          });
        }, V.src = B;
      }, R.readAsDataURL(z);
    },
    [t]
  ), pl = `translate(${c.x}px, ${c.y}px) scale(${c.zoom})`, hn = v.activeIndex >= 0 ? ((Gs = v.matches[v.activeIndex]) == null ? void 0 : Gs.nodeId) ?? null : null, Xs = Vt(() => {
    if (!v.query || v.matches.length === 0) return /* @__PURE__ */ new Set();
    const x = /* @__PURE__ */ new Set();
    for (const T of v.matches)
      T.nodeType !== "edge" && x.add(T.nodeId);
    return x;
  }, [v]);
  return Kr(() => {
    const x = s.current;
    if (!x || !v.query || v.matches.length === 0) {
      A([]);
      return;
    }
    const T = x.getBoundingClientRect(), I = v.query.toLocaleLowerCase(), O = Array.from(new Set(v.matches.map((E) => E.nodeId))), z = [], W = 900;
    for (const E of O) {
      if (z.length >= W) break;
      const R = E.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), B = x.querySelector(`[data-node-id="${R}"]`);
      if (!B) continue;
      const V = document.createTreeWalker(
        B,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(U) {
            const Z = U.parentElement;
            return !Z || Z.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']") || !U.nodeValue || !U.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let L = V.nextNode();
      for (; L && z.length < W; ) {
        const U = L, et = (U.nodeValue ?? "").toLocaleLowerCase();
        let nt = 0;
        for (; nt <= et.length - I.length && z.length < W; ) {
          const pt = et.indexOf(I, nt);
          if (pt < 0) break;
          const Tt = document.createRange();
          Tt.setStart(U, pt), Tt.setEnd(U, pt + I.length);
          const Ct = Tt.getClientRects();
          for (const kt of Ct)
            kt.width <= 0 || kt.height <= 0 || z.push({
              x: kt.left - T.left,
              y: kt.top - T.top,
              w: kt.width,
              h: kt.height,
              active: E === hn
            });
          nt = pt + I.length;
        }
        L = V.nextNode();
      }
    }
    A(z);
  }, [v, p, c, hn]), /* @__PURE__ */ k(
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
        background: mr(it).canvasBg
      },
      onPointerDown: el,
      onPointerMove: dl,
      onDoubleClick: tl,
      onContextMenu: _a,
      onDragOver: hl,
      onDrop: ul,
      children: [
        /* @__PURE__ */ u(ph, { viewport: c, gridSize: P, background: it, gridVisible: F }),
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              transform: pl,
              transformOrigin: "0 0",
              pointerEvents: "none"
            },
            children: [
              uo.sort((x, T) => x.z - T.z).map((x) => {
                var E;
                const T = sn.has(x.id), I = Ja.has(x.id), z = -(x.id.split("").reduce((R, B) => R + B.charCodeAt(0), 0) % 240 / 100);
                let W;
                if (o) {
                  const R = o.get(x.type);
                  if (R) {
                    const B = R.component, V = f.has(x.id), L = y === "select" || y === "text" || y === "note" || y === "sticky", U = /* @__PURE__ */ u(
                      B,
                      {
                        node: x,
                        data: x.data,
                        isSelected: V,
                        multiSelected: f.size > 1 && V && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: L,
                        zoom: c.zoom,
                        editing: Ls === x.id,
                        editClickPos: Ls === x.id ? rn.current : null,
                        callbacks: {
                          onMeasuredHeight: Kt,
                          onResizeHandleDown: cn,
                          onEditStart: (Z) => {
                            const et = t.getNode(Z);
                            et && (et.type === "text" ? fo(Z) : et.type === "sticky" ? yo(Z) : et.type === "frame" ? Eo(Z) : et.type === "shape" ? Ro(Z) : et.type === "image" ? Lo(Z) : et.type === "youtube" && Rs(Z));
                          },
                          onEditEnd: () => {
                            fo(null), yo(null), Eo(null), Ro(null), Lo(null), Rs(null);
                          }
                        },
                        portValues: r && ((E = R.ports) != null && E.length) && Hs >= 0 ? r.getAllPortValues(x.id) : void 0,
                        updateData: (Z) => {
                          t.updateNodeWithHistory(x.id, {
                            data: { ...x.data, ...Z }
                          });
                        }
                      },
                      R.handlesOwnLayout ? x.id : void 0
                    );
                    R.handlesOwnLayout ? W = U : W = /* @__PURE__ */ u(
                      ku,
                      {
                        node: x,
                        isInteractive: L,
                        measuredH: rt[x.id],
                        onMeasuredHeight: Kt,
                        observeElement: ve,
                        unobserveElement: He,
                        isContainer: R.isContainer,
                        children: U
                      },
                      x.id
                    );
                  }
                } else if (x.type === "content") {
                  const R = x;
                  W = /* @__PURE__ */ u(
                    ta,
                    {
                      node: R,
                      isSelected: f.has(x.id),
                      multiSelected: f.size > 1 && f.has(x.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: y === "select" || y === "text" || y === "note",
                      zoom: c.zoom,
                      onMeasuredHeight: Kt,
                      autoEdit: Ds.current === R.id
                    },
                    x.id
                  );
                } else if (x.type === "text")
                  W = /* @__PURE__ */ u(
                    pa,
                    {
                      node: x,
                      engine: t,
                      editing: on === x.id,
                      editClickPos: on === x.id ? rn.current : null,
                      onStopEdit: () => {
                        if (nn.current === x.id) {
                          nn.current = null;
                          const R = t.getNode(x.id);
                          if (!R || !R.data.text.trim()) {
                            t.deleteNode(x.id), fo(null);
                            return;
                          }
                          t.pushHistorySnapshot();
                        }
                        fo(null);
                      },
                      onMeasuredHeight: Kt
                    },
                    x.id
                  );
                else if (x.type === "image")
                  W = /* @__PURE__ */ u(
                    ua,
                    {
                      node: x,
                      isSelected: f.has(x.id),
                      engine: t,
                      interactive: y === "select",
                      zoom: c.zoom,
                      onResizeHandleDown: cn,
                      cropping: Es === x.id,
                      onCropStart: () => Lo(x.id),
                      onCropEnd: () => Lo(null)
                    },
                    x.id
                  );
                else if (x.type === "sticky")
                  W = /* @__PURE__ */ u(
                    fa,
                    {
                      node: x,
                      isSelected: f.has(x.id),
                      engine: t,
                      interactive: y === "select" || y === "sticky",
                      zoom: c.zoom,
                      editing: As === x.id,
                      onEditStart: yo,
                      onEditEnd: () => yo(null)
                    },
                    x.id
                  );
                else if (x.type === "frame") {
                  const R = x, B = R.h === "auto" ? 100 : R.h;
                  W = /* @__PURE__ */ u(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: R.x,
                        top: R.y,
                        width: R.w,
                        height: B,
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
                      children: Ps === x.id ? /* @__PURE__ */ u(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: R.data.label ?? "",
                          placeholder: n.frameLabelPlaceholder,
                          onBlur: (V) => {
                            const L = V.currentTarget.value.trim();
                            t.updateNodeWithHistory(x.id, {
                              data: { ...R.data, label: L || void 0 }
                            }), Eo(null);
                          },
                          onKeyDown: (V) => {
                            (V.key === "Enter" || V.key === "Escape") && V.currentTarget.blur(), V.stopPropagation();
                          },
                          onPointerDown: (V) => V.stopPropagation(),
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
                      ) : R.data.label ? /* @__PURE__ */ u(
                        "div",
                        {
                          onDoubleClick: (V) => {
                            V.stopPropagation(), t.select(x.id), Eo(x.id);
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
                    x.id
                  );
                } else {
                  const R = x;
                  R.type === "draw" ? W = /* @__PURE__ */ u(Vr, { node: R }, x.id) : W = /* @__PURE__ */ u(Vr, { node: R, editingLabel: rr === x.id }, x.id);
                }
                return T || I ? /* @__PURE__ */ u(
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
                    children: W
                  },
                  x.id
                ) : W;
              }),
              Xs.size > 0 && Array.from(Xs).map((x) => {
                const T = t.getNode(x);
                if (!T || T.type === "edge") return null;
                const I = T.h === "auto" ? rt[T.id] ?? 100 : T.h, O = hn === x;
                return /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: T.x - 5,
                      top: T.y - 5,
                      width: T.w + 10,
                      height: I + 10,
                      borderRadius: 10,
                      border: `2px solid ${O ? "#f59e0b" : "#60a5fa"}`,
                      boxShadow: O ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
                      pointerEvents: "none",
                      transform: T.rotation ? `rotate(${T.rotation}deg)` : void 0,
                      transformOrigin: "center center"
                    }
                  },
                  `search-highlight-${x}`
                );
              }),
              rr && (() => {
                const x = t.getNode(rr);
                if (!x || x.type !== "shape") return null;
                const T = x.data;
                return T.shape === "line" || T.shape === "arrow" ? null : /* @__PURE__ */ u(
                  vu,
                  {
                    node: x,
                    engine: t,
                    onDone: () => Ro(null)
                  },
                  rr
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ u(
          qh,
          {
            nodes: po,
            viewport: c,
            selection: f,
            measuredHeights: rt,
            activeStroke: lt,
            shapePreview: St,
            shapePreviewStyle: St ? {
              stroke: t.mode === "frame" ? "#1e1e2e" : t.activeTool.color,
              strokeWidth: t.mode === "frame" ? 1 : t.activeTool.width,
              roughness: t.mode === "frame" ? 0 : t.activeTool.roughness ?? 1,
              shapeType: t.mode === "frame" ? "rect" : t.activeTool.shapeType || "rect"
            } : null,
            onResizeHandleDown: cn,
            onRotateStart: ol,
            onConnectionHandleDown: Ns,
            onEdgeEndpointDown: al,
            onKinkHandleDown: il,
            edgePreview: Mt,
            edgeReconnect: ft,
            eraserMarkedIds: sn.size > 0 ? sn : void 0,
            eraserTrail: Ws.length > 1 ? Ws : void 0,
            laserTrail: Bs.length > 1 ? Bs : void 0,
            mode: y,
            hoveredNodeId: Qa,
            registry: o,
            onPortHandleDown: nl,
            cycleNodeIds: r && Hs >= 0 ? r.cycleNodeIds : void 0,
            containerTypes: t.containerTypes,
            alignGuides: ot
          }
        ),
        ne && (() => {
          const x = t.selectionGroupId(), T = x ? t.groupRotations.get(x) : void 0;
          let I, O, z, W;
          if (Xe)
            I = Xe.bounds, O = Xe.angle, z = Xe.cx, W = Xe.cy;
          else if (T && T.angle !== 0) {
            const L = -T.angle * Math.PI / 180, U = Math.cos(L), Z = Math.sin(L);
            let et = 1 / 0, nt = 1 / 0, pt = -1 / 0, Tt = -1 / 0;
            for (const Ct of t.selection) {
              const kt = t.getNode(Ct);
              if (!kt || kt.type === "edge") continue;
              const At = kt.h === "auto" ? rt[kt.id] ?? 100 : kt.h, Ht = kt.x + kt.w / 2, Gt = kt.y + At / 2, at = Ht - T.cx, wt = Gt - T.cy, mt = T.cx + at * U - wt * Z, Ft = T.cy + at * Z + wt * U;
              et = Math.min(et, mt - kt.w / 2), nt = Math.min(nt, Ft - At / 2), pt = Math.max(pt, mt + kt.w / 2), Tt = Math.max(Tt, Ft + At / 2);
            }
            I = {
              x: et - le,
              y: nt - le,
              w: pt - et + le * 2,
              h: Tt - nt + le * 2
            }, O = T.angle, z = T.cx, W = T.cy;
          } else
            I = ne, O = 0, z = 0, W = 0;
          const E = 8 / c.zoom, R = E / 2, B = [
            { pos: "nw", cx: I.x, cy: I.y },
            { pos: "n", cx: I.x + I.w / 2, cy: I.y },
            { pos: "ne", cx: I.x + I.w, cy: I.y },
            { pos: "e", cx: I.x + I.w, cy: I.y + I.h / 2 },
            { pos: "se", cx: I.x + I.w, cy: I.y + I.h },
            { pos: "s", cx: I.x + I.w / 2, cy: I.y + I.h },
            { pos: "sw", cx: I.x, cy: I.y + I.h },
            { pos: "w", cx: I.x, cy: I.y + I.h / 2 }
          ], V = O !== 0 ? ` rotate(${O}, ${z}, ${W})` : "";
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ k("g", { transform: V, children: [
                /* @__PURE__ */ u(
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
                O === 0 && B.map(({ pos: L, cx: U, cy: Z }) => /* @__PURE__ */ u(
                  "rect",
                  {
                    x: U - R,
                    y: Z - R,
                    width: E,
                    height: E,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / c.zoom,
                    style: { cursor: Zr(L, O), pointerEvents: "auto" },
                    onPointerDown: (et) => {
                      et.stopPropagation(), cl(L, et);
                    }
                  },
                  L
                )),
                (() => {
                  const L = 25 / c.zoom, U = I.x + I.w / 2, Z = I.y;
                  return /* @__PURE__ */ k(gt, { children: [
                    /* @__PURE__ */ u(
                      "line",
                      {
                        x1: U,
                        y1: Z,
                        x2: U,
                        y2: Z - L,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / c.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const et = 8 / c.zoom, nt = et / 2;
                      return /* @__PURE__ */ u(
                        "rect",
                        {
                          x: U - nt,
                          y: Z - L - nt,
                          width: et,
                          height: et,
                          rx: 1.5 / c.zoom,
                          transform: `rotate(45, ${U}, ${Z - L})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / c.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (pt) => ll(pt)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const L = 26 / c.zoom, U = 42 / c.zoom, Z = 4 / c.zoom;
                  return [
                    { side: "top", cx: I.x + I.w / 2, cy: I.y - U },
                    { side: "right", cx: I.x + I.w + L, cy: I.y + I.h / 2 },
                    { side: "bottom", cx: I.x + I.w / 2, cy: I.y + I.h + L },
                    { side: "left", cx: I.x - L, cy: I.y + I.h / 2 }
                  ].map(({ side: nt, cx: pt, cy: Tt }) => /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: pt,
                      cy: Tt,
                      r: Z,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / c.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (Ct) => {
                        Ct.stopPropagation();
                        const kt = rl(nt);
                        kt && Ns(kt, nt, Ct);
                      }
                    },
                    `conn-${nt}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Oe && /* @__PURE__ */ u(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ u("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ u(
              "rect",
              {
                x: Oe.x,
                y: Oe.y,
                width: Oe.w,
                height: Oe.h,
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
        S && (() => {
          const x = t.canvasToScreen(S.startX, S.startY), T = t.canvasToScreen(S.endX, S.endY), I = Math.min(x.x, T.x), O = Math.min(x.y, T.y), z = Math.abs(T.x - x.x), W = Math.abs(T.y - x.y);
          return z < 2 && W < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
                "rect",
                {
                  x: I,
                  y: O,
                  width: z,
                  height: W,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        $t && $t.length > 2 && (() => {
          const T = $t.map(([I, O]) => t.canvasToScreen(I, O)).map((I) => `${I.x},${I.y}`).join(" ");
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
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
        Ce && (() => {
          const x = Math.min(Ce.startX, Ce.endX), T = Math.min(Ce.startY, Ce.endY), I = Math.abs(Ce.endX - Ce.startX), O = Math.abs(Ce.endY - Ce.startY);
          return I < 2 && O < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ u(
                "rect",
                {
                  x,
                  y: T,
                  width: I,
                  height: O,
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
        C.length > 0 && /* @__PURE__ */ u(
          "div",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: C.map((x, T) => /* @__PURE__ */ u(
              "div",
              {
                style: {
                  position: "absolute",
                  left: x.x,
                  top: x.y,
                  width: x.w,
                  height: x.h,
                  borderRadius: 3,
                  background: x.active ? "rgba(250, 204, 21, 0.62)" : "rgba(250, 204, 21, 0.44)",
                  boxShadow: x.active ? "0 0 0 1px rgba(202, 138, 4, 0.85)" : "0 0 0 1px rgba(202, 138, 4, 0.45)"
                }
              },
              `search-text-rect-${T}`
            ))
          }
        ),
        ye && /* @__PURE__ */ u(
          Kh,
          {
            x: ye.x,
            y: ye.y,
            sections: ye.sections,
            onClose: () => Ue(null)
          }
        ),
        wr && /* @__PURE__ */ u(
          Xh,
          {
            nodes: wr.nodes,
            onSave: (x) => {
              Ph(x, wr.nodes, wr.groupParent), ln(null);
            },
            onCancel: () => ln(null)
          }
        )
      ]
    }
  );
}
const je = 52, jo = 300, Cf = je + jo, Mu = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], vs = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Cu = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], Ss = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], qa = [1, 2, 3, 5, 8, 12], Ms = [1, 2, 3, 4, 6, 8], Iu = [1, 2, 3, 4, 6], zu = Ms, Ka = [14, 20, 28, 36], Cs = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Tu = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Ae = [
  { name: "Standard", colors: Mu },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], Is = Ae, Pu = [
  { name: "Standard", colors: Tu },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Wt = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Dt = {
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
}, Au = "https://libraries.excalidraw.com/libraries.json", Jn = "https://libraries.excalidraw.com/libraries";
function Eu({
  onClose: t,
  onInstalled: e
}) {
  const o = qt(), { labels: r } = Yt(), [n, s] = $([]), [i, a] = $(!0), [l, c] = $(null), [d, p] = $(""), [h, f] = $(null), [m, y] = $(/* @__PURE__ */ new Set()), g = ct(() => {
    const v = xa(), M = new Set(v.map((C) => C.source));
    y(M);
  }, []);
  bt(() => {
    let v = !1;
    return (async () => {
      try {
        const M = await fetch(Au);
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
  const w = Vt(() => {
    if (!d.trim()) return n;
    const v = d.toLowerCase();
    return n.filter(
      (M) => {
        var C, A;
        return M.name.toLowerCase().includes(v) || ((C = M.description) == null ? void 0 : C.toLowerCase().includes(v)) || ((A = M.itemNames) == null ? void 0 : A.some((F) => F.toLowerCase().includes(v)));
      }
    );
  }, [n, d]), b = ct(
    async (v) => {
      f(v.id);
      try {
        const M = `${Jn}/${v.source}`;
        await mh(M, v.name), g(), e();
      } catch (M) {
        console.error("Failed to install library:", M);
      } finally {
        f(null);
      }
    },
    [e, g]
  );
  return qe(
    /* @__PURE__ */ u(
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
                          /* @__PURE__ */ u(
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
                          /* @__PURE__ */ u(
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
                    /* @__PURE__ */ u(
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
                    i && /* @__PURE__ */ u(
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
                    !i && !l && w.length === 0 && /* @__PURE__ */ u(
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
                    w.map((v, M) => {
                      const C = m.has(
                        `${Jn}/${v.source}`
                      ), A = h === v.id;
                      return /* @__PURE__ */ u(
                        Ru,
                        {
                          entry: v,
                          isInstalled: C,
                          isInstalling: A,
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
                    w.length,
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
function Ru({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: r,
  theme: n
}) {
  var a;
  const { labels: s } = Yt(), i = t.preview ? `${Jn}/${t.preview}` : null;
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
        i && /* @__PURE__ */ u(
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
          /* @__PURE__ */ u(
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
          t.description && /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
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
const Lu = /^[A-Za-z][A-Za-z0-9_:-]*$/, Pi = /^[A-Za-z][A-Za-z0-9_]*$/;
function Du(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function Pe(t) {
  return Du(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function Pn(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function ko(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: Pe(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: Pe(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: Pe(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: Pe(o[2]), shape: "rect" } : Lu.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function Wu(t) {
  let e = t.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (e) {
    const o = ko(e[1]), r = ko(e[3]);
    return !o || !r ? null : { from: o, to: r, label: Pe(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/), e) {
    const o = ko(e[1]), r = ko(e[3]);
    return !o || !r ? null : { from: o, to: r, label: Pe(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/), e) {
    const o = ko(e[1]), r = ko(e[2]);
    return !o || !r ? null : { from: o, to: r };
  }
  return null;
}
function Bu(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function Fu(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return r ? { label: Pe(r[1]) } : { label: Pe(o) };
}
function Nu(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, r = t.replace(/\r\n/g, `
`).split(`
`).map((l) => l.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (r.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const n = r[0];
  /^(flowchart|graph)\b/i.test(n) && (o.direction = Bu(n), r.shift());
  const i = [], a = (l) => {
    for (const c of i) c.nodeKeys.add(l);
  };
  for (const l of r) {
    const c = l.split(";").map((d) => d.trim()).filter(Boolean);
    for (const d of c) {
      const p = Fu(d);
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
      const h = Wu(d);
      if (h) {
        const m = Pn(o, h.from), y = Pn(o, h.to);
        a(m.key), a(y.key), o.edges.push({ fromKey: m.key, toKey: y.key, label: h.label });
        continue;
      }
      const f = ko(d);
      if (f) {
        const m = Pn(o, f);
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
function Hu(t) {
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
    if (!(!Pi.test(a) || !Pi.test(l)))
      return {
        from: a,
        arrow: s,
        to: l,
        label: Pe(r)
      };
  }
  return null;
}
function Ou(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: Pe(e[3])
  } : null;
}
function Xu(t) {
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
function Gu(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.indexOf(" "), n = r >= 0 ? o.slice(0, r) : o, s = r >= 0 ? o.slice(r + 1).trim() : "";
  return Xu(n) ? { color: n, label: s || void 0 } : { label: o };
}
function Yu(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`).map((h) => h.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (e.length === 0)
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  if (!/^sequenceDiagram\b/i.test(e[0]))
    throw new Error("Not a Mermaid sequence diagram.");
  const o = /* @__PURE__ */ new Set(), r = [], n = [], s = [], i = [], a = [], l = [];
  let c = 0;
  const d = (h) => {
    o.has(h) || (o.add(h), r.push(h));
    for (const f of l) f.participants.add(h);
  };
  for (let h = 1; h < e.length; h++) {
    const f = e[h];
    if (/^autonumber\b/i.test(f)) continue;
    const m = Gu(f);
    if (m) {
      l.push({ type: "box", label: m.label, color: m.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const y = f.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (y) {
      l.push({
        type: "loop",
        label: y[1] ? Pe(y[1]) : void 0,
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
    const w = Ou(f);
    if (w) {
      d(w.of), s.push({ step: c, note: w });
      continue;
    }
    const b = Hu(f);
    if (b) {
      d(b.from), d(b.to), n.push(b), c += 1;
      continue;
    }
  }
  for (; l.length > 0; ) {
    const h = l.pop();
    h.type === "box" ? a.push(h) : i.push({
      label: h.label,
      startStep: h.startStep,
      endStep: c,
      participants: h.participants
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
    loops: i.map((h) => ({
      label: h.label,
      startStep: h.startStep,
      endStep: h.endStep,
      participants: Array.from(h.participants)
    })).filter((h) => h.endStep >= h.startStep),
    groups: a.map((h) => ({
      label: h.label,
      color: h.color,
      participants: Array.from(h.participants)
    })).filter((h) => h.participants.length > 0)
  };
}
function Lr(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function ju(t) {
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
      const h = Math.max(s.get(p) ?? 0, d + 1);
      s.set(p, h), o.set(p, (o.get(p) ?? 0) - 1), (o.get(p) ?? 0) <= 0 && i.push(p);
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
function Vu(t, e, o, r) {
  const n = Yu(t), s = [], i = [], a = 6, l = "#94a3b8", c = 3, d = "#475569", p = 180, h = 64, f = 270, m = o - 140, y = m + h + 8, g = 88, w = Math.max(1, n.messages.length), b = y + w * g + 40, v = b + 12, M = v + h, C = /* @__PURE__ */ new Map();
  for (const A of n.groups) {
    const F = A.participants.map((ot) => C.get(ot)).filter((ot) => typeof ot == "number");
    if (F.length === 0)
      for (const ot of A.participants) {
        const J = n.participants.indexOf(ot);
        J >= 0 && F.push(e + (J - (n.participants.length - 1) / 2) * f);
      }
    if (F.length === 0) continue;
    const D = Math.min(...F) - p / 2 - 24, P = Math.max(...F) + p / 2 + 24, G = m - 22, st = M - G + 18, H = {
      id: zt(10),
      type: "shape",
      x: D,
      y: G,
      w: P - D,
      h: st,
      z: r(),
      data: {
        shape: "rect",
        stroke: A.color ? A.color : "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: A.color ? A.color : "#334155",
        fillStyle: "solid",
        opacity: A.color ? 0.2 : 0.08,
        edgeStyle: "sharp"
      }
    };
    if (s.push(H), i.push(H.id), A.label) {
      const ot = {
        id: zt(10),
        type: "text",
        x: D + 10,
        y: G + 8,
        w: Math.max(120, P - D - 20),
        h: "auto",
        z: r(),
        data: {
          text: A.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      s.push(ot);
    }
  }
  for (let A = 0; A < n.participants.length; A++) {
    const F = n.participants[A], D = e + (A - (n.participants.length - 1) / 2) * f;
    C.set(F, D);
    const P = {
      id: zt(10),
      type: "shape",
      x: D - p / 2,
      y: m,
      w: p,
      h,
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
    s.push(P), i.push(P.id);
    const G = {
      id: zt(10),
      type: "shape",
      x: D - a / 2,
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
    s.push(G);
    const st = {
      id: zt(10),
      type: "shape",
      x: D - p / 2,
      y: v,
      w: p,
      h,
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
    s.push(st), i.push(st.id);
  }
  for (const A of n.loops) {
    const F = A.participants.map((N) => C.get(N)).filter((N) => typeof N == "number");
    if (F.length === 0) continue;
    const D = Math.min(...F) - 130, P = Math.max(...F) + 130, G = A.startStep + 1, st = Math.max(G, A.endStep), H = y + (G - 1) * g + 16, ot = y + st * g + 34, J = {
      id: zt(10),
      type: "shape",
      x: D,
      y: H,
      w: P - D,
      h: Math.max(90, ot - H),
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
    const it = `loop${A.label ? ` [${A.label}]` : ""}`, Y = {
      id: zt(10),
      type: "text",
      x: D + 10,
      y: H + 8,
      w: P - D - 20,
      h: "auto",
      z: r(),
      data: {
        text: it,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#1f2937",
        align: "left"
      }
    };
    s.push(Y);
  }
  for (let A = 0; A < n.messages.length; A++) {
    const F = n.messages[A], D = y + (A + 1) * g, P = C.get(F.from), G = C.get(F.to);
    if (P == null || G == null) continue;
    const st = P === G, H = Math.min(P, G), ot = Math.max(P, G), J = Math.max(ot - H, 40), it = P <= G ? 0 : J, Y = P <= G ? J : 0, N = F.arrow.includes("--") || F.arrow === "-.->", tt = F.arrow.toLowerCase().includes("x"), K = F.arrow.includes(">") || F.arrow.includes(")");
    if (st) {
      const _ = P + 6, Q = D - 16, lt = 92, ht = 48, St = N ? "dashed" : "solid", vt = {
        id: zt(10),
        type: "shape",
        x: _,
        y: Q,
        w: lt,
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
      }, Mt = {
        id: zt(10),
        type: "shape",
        x: _ + lt - c,
        y: Q,
        w: c,
        h: ht,
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
        x: _,
        y: Q + ht - c,
        w: lt,
        h: c,
        z: r(),
        data: {
          shape: K ? "arrow" : "line",
          stroke: d,
          strokeWidth: c,
          strokeStyle: St,
          roughness: 0,
          startPoint: [lt, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(vt, Mt, xt);
    } else {
      const _ = {
        id: zt(10),
        type: "shape",
        x: H,
        y: D - 14,
        w: J,
        h: 28,
        z: r(),
        data: {
          shape: K ? "arrow" : "line",
          stroke: d,
          strokeWidth: c,
          strokeStyle: N ? "dashed" : "solid",
          roughness: 0,
          startPoint: [it, 14],
          endPoint: [Y, 14]
        }
      };
      s.push(_);
    }
    const q = st ? P + 18 : H, j = st ? 170 : J, X = {
      id: zt(10),
      type: "text",
      x: q,
      y: D - 46,
      w: j,
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
    if (s.push(X), tt) {
      const _ = P <= G ? H + J - 14 : H + 8, Q = {
        id: zt(10),
        type: "text",
        x: _,
        y: D - 20,
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
      s.push(Q);
    }
  }
  for (const A of n.notes) {
    const F = y + (A.step + 1) * g, D = C.get(A.note.of);
    if (D == null) continue;
    let P = D;
    A.note.side === "right" && (P += 130), A.note.side === "left" && (P -= 300), A.note.side === "over" && (P -= 110);
    const G = {
      id: zt(10),
      type: "text",
      x: P,
      y: F - 8,
      w: 260,
      h: "auto",
      z: r(),
      data: {
        text: A.note.text,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "left"
      }
    };
    s.push(G);
  }
  return { nodes: s, shapeNodeIds: i };
}
function qu(t, e, o, r) {
  const n = t.trimStart();
  if (/^sequenceDiagram\b/i.test(n))
    return Vu(t, e, o, r);
  const s = Nu(t), i = ju(s), a = Array.from(s.nodes.values()).map((g) => Lr(g.shape)), l = a.length > 0 ? Math.max(...a.map((g) => g.h)) : 96, c = Math.max(l + 130, 260), d = /* @__PURE__ */ new Map(), p = i.length;
  for (let g = 0; g < i.length; g++) {
    const w = i[g], b = w.length, v = (g - (p - 1) / 2) * c, M = w.length > 0 ? Math.max(
      ...w.map((A) => {
        const F = s.nodes.get(A);
        return F ? Lr(F.shape).w : 200;
      })
    ) : 200, C = Math.max(M + 90, 260);
    for (let A = 0; A < w.length; A++) {
      const F = w[A], D = (A - (b - 1) / 2) * C;
      if (s.direction === "LR" || s.direction === "RL") {
        const P = s.direction === "LR" ? e + v : e - v, G = o + D;
        d.set(F, { x: P, y: G });
      } else {
        const P = e + D, G = s.direction === "TB" ? o + v : o - v;
        d.set(F, { x: P, y: G });
      }
    }
  }
  const h = /* @__PURE__ */ new Map(), f = [], m = [], y = /* @__PURE__ */ new Map();
  for (const g of s.groups) {
    if (!g.nodeKeys.length) continue;
    const w = g.nodeKeys.map((F) => {
      const D = s.nodes.get(F), P = d.get(F);
      if (!D || !P) return null;
      const G = Lr(D.shape);
      return { x: P.x - G.w / 2, y: P.y - G.h / 2, w: G.w, h: G.h };
    }).filter((F) => !!F);
    if (!w.length) continue;
    const b = Math.min(...w.map((F) => F.x)) - 30, v = Math.max(...w.map((F) => F.x + F.w)) + 30, M = Math.min(...w.map((F) => F.y)) - 34, C = Math.max(...w.map((F) => F.y + F.h)) + 24, A = {
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
    if (f.push(A), m.push(A.id), g.label) {
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
  for (const [g, w] of s.nodes) {
    const b = d.get(g) ?? { x: e, y: o }, v = Lr(w.shape), M = {
      id: zt(10),
      type: "shape",
      x: b.x - v.w / 2,
      y: b.y - v.h / 2,
      w: v.w,
      h: v.h,
      z: r(),
      data: {
        shape: w.shape === "diamond" ? "diamond" : w.shape === "circle" ? "ellipse" : (w.shape === "round", "rect"),
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        edgeStyle: w.shape === "round" ? "round" : "sharp",
        label: w.label,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    f.push(M), m.push(M.id), h.set(g, M.id), y.set(g, { x: M.x, y: M.y, w: v.w, h: v.h });
  }
  for (const g of s.edges) {
    const w = h.get(g.fromKey), b = h.get(g.toKey);
    if (!w || !b || w === b) continue;
    const v = {
      id: zt(10),
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: r(),
      data: {
        fromId: w,
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
const Ai = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function Ku({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r
}) {
  const n = qt(), { labels: s } = Yt(), i = dt(null), [a, l] = $(Ai), [c, d] = $(null), [p, h] = $(null);
  bt(() => {
    if (!e) return;
    const y = (g) => {
      i.current && !i.current.contains(g.target) && o();
    };
    return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
  }, [e, o]);
  const f = Vt(
    () => s.mermaidSupportedHint,
    [s.mermaidSupportedHint]
  ), m = ct(() => {
    try {
      const y = window.innerWidth / 2, g = window.innerHeight / 2, w = t.screenToCanvas(y, g), { nodes: b, shapeNodeIds: v } = qu(a, w.x, w.y, () => t.nextZ());
      if (b.length === 0)
        throw new Error(s.mermaidNoNodesParsed);
      t.addNodes(b), v.length > 0 && t.selectMultiple(v), d(null), h(
        s.mermaidInsertedSummary.replace("{nodes}", String(v.length)).replace("{edges}", String(b.length - v.length))
      );
    } catch (y) {
      h(null), d(y instanceof Error ? y.message : s.mermaidParseFailed);
    }
  }, [t, s.mermaidInsertedSummary, s.mermaidNoNodesParsed, s.mermaidParseFailed, a]);
  return !e || !r ? null : qe(
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
            /* @__PURE__ */ u("div", { style: { fontSize: 12, fontWeight: 700, color: n.text }, children: s.mermaidSketchTitle }),
            /* @__PURE__ */ u("div", { style: { marginTop: 4, fontSize: 10, color: n.textMuted, lineHeight: 1.45 }, children: f })
          ] }),
          /* @__PURE__ */ k("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ u(
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
            c && /* @__PURE__ */ u("div", { style: { fontSize: 10, color: "#ef4444" }, children: c }),
            p && /* @__PURE__ */ u("div", { style: { fontSize: 10, color: "#16a34a" }, children: p }),
            /* @__PURE__ */ k("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => l(Ai),
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
              /* @__PURE__ */ u(
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
const Uu = [
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
], Io = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, jt = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function zo({ name: t, size: e = 18, textGlyph: o = "T" }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...jt }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ...jt })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...jt }),
    t === "text" && /* @__PURE__ */ u(
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
    t === "note" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ...jt }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...jt }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...jt, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...jt, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...jt, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...jt }),
      /* @__PURE__ */ u("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...jt }),
      /* @__PURE__ */ u("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...jt }),
      /* @__PURE__ */ u("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...jt })
    ] }),
    t === "erase" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...jt }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ...jt })
    ] }),
    t === "laser" && /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ u("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...jt, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...jt, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...jt, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...jt, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...jt, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ...jt }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...jt }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...jt })
    ] }),
    t === "fit" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...jt }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...jt })
    ] }),
    t === "paper" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...jt }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...jt, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...jt, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...jt, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...jt }),
      /* @__PURE__ */ u("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...jt }),
      /* @__PURE__ */ u("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...jt }),
      /* @__PURE__ */ u("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...jt })
    ] }),
    t === "library" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...jt }),
      /* @__PURE__ */ u("path", { d: "M8 7h6", ...jt, opacity: 0.5 }),
      /* @__PURE__ */ u("path", { d: "M8 11h4", ...jt, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...jt }),
      /* @__PURE__ */ u("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ...jt }),
      /* @__PURE__ */ u("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ...jt }),
      /* @__PURE__ */ u("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
function Zu({
  engine: t,
  background: e
}) {
  const o = qt(), { labels: r } = Yt(), [n, s] = $(!1), i = {
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
  }, l = dt(null), c = dt(null);
  bt(() => {
    if (!n) return;
    const h = (f) => {
      c.current && !c.current.contains(f.target) && l.current && !l.current.contains(f.target) && s(!1);
    };
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [n]);
  const d = Qo.find((h) => h.key === e) ?? Qo[1], p = n && l.current ? (() => {
    const h = l.current.getBoundingClientRect();
    return qe(
      /* @__PURE__ */ u(
        "div",
        {
          ref: c,
          style: {
            position: "fixed",
            left: h.right + 8,
            top: h.top,
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
            const m = Qo.filter((y) => y.group === f);
            return m.length === 0 ? null : /* @__PURE__ */ k("div", { style: { marginBottom: 6 }, children: [
              /* @__PURE__ */ u(
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
                    /* @__PURE__ */ u(
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
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ k(
      "button",
      {
        ref: l,
        title: r.paperType,
        onClick: () => s((h) => !h),
        style: {
          ...Io,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ u(zo, { name: "paper" }),
          /* @__PURE__ */ u(
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
function Qu({ engine: t }) {
  const e = qt(), { labels: o } = Yt(), [r, n] = $(!1), s = dt(null), i = dt(null);
  bt(() => {
    if (!r) return;
    const l = (c) => {
      i.current && !i.current.contains(c.target) && s.current && !s.current.contains(c.target) && n(!1);
    };
    return document.addEventListener("pointerdown", l), () => document.removeEventListener("pointerdown", l);
  }, [r]);
  const a = r && s.current ? (() => {
    const l = s.current.getBoundingClientRect();
    return qe(
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
            /* @__PURE__ */ u(
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
            Yi.map((c) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => {
                  const d = typeof window < "u" ? window : void 0;
                  if (!d) return;
                  const p = d.innerWidth / 2, h = d.innerHeight / 2, f = Ko(t.viewport, p, h);
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
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: s,
        title: o.templatesTitle,
        onClick: () => n((l) => !l),
        style: {
          ...Io,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(zo, { name: "template" })
      }
    ),
    a
  ] });
}
function Ju({ engine: t }) {
  const e = qt(), { labels: o } = Yt(), [r, n] = $(!1), [s, i] = $(!1), a = dt(null), [l, c] = $(null), d = ct(() => {
    n((f) => (!f && a.current && c(a.current.getBoundingClientRect()), !f));
  }, []), p = ct(() => n(!1), []), h = ct(() => {
    i(!0);
  }, []);
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: a,
        title: o.librariesTitle,
        onClick: d,
        style: {
          ...Io,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(zo, { name: "library" })
      }
    ),
    /* @__PURE__ */ u(
      Wh,
      {
        engine: t,
        open: r,
        onClose: p,
        triggerRect: l,
        onBrowseDirectory: h
      }
    ),
    s && /* @__PURE__ */ u(
      Eu,
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
function $u({ engine: t, baseUrl: e }) {
  const o = qt(), { labels: r } = Yt(), [n, s] = $(!1), i = dt(null), [a, l] = $(null), c = ct(() => {
    s((p) => (!p && i.current && l(i.current.getBoundingClientRect()), !p));
  }, []), d = ct(() => s(!1), []);
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: i,
        title: r.gifSearchTitle,
        onClick: c,
        style: {
          ...Io,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ u(zo, { name: "gif" })
      }
    ),
    /* @__PURE__ */ u(
      Hh,
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
function _u({ engine: t }) {
  const e = qt(), { labels: o } = Yt(), [r, n] = $(!1), s = dt(null), [i, a] = $(null), l = ct(() => {
    n((d) => (!d && s.current && a(s.current.getBoundingClientRect()), !d));
  }, []), c = ct(() => n(!1), []);
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: s,
        title: o.mermaidSketchTitle,
        onClick: l,
        style: {
          ...Io,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(zo, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ u(
      Ku,
      {
        engine: t,
        open: r,
        onClose: c,
        triggerRect: i
      }
    )
  ] });
}
function tp({ engine: t, gifApiBaseUrl: e }) {
  const o = qt(), { labels: r } = Yt(), [n, s] = $(t.mode), [i, a] = $(t.boardBackground), [l, c] = $(t.lassoSelect);
  bt(() => {
    const p = () => s(t.mode), h = () => a(t.boardBackground), f = () => c(t.lassoSelect);
    return t.on("mode", p), t.on("background", h), t.on("lassoToggle", f), () => {
      t.off("mode", p), t.off("background", h), t.off("lassoToggle", f);
    };
  }, [t]);
  const d = Uu.map((p) => ({
    ...p,
    label: p.key === "select" ? r.toolSelect : p.key === "hand" ? r.toolHand : p.key === "draw" ? r.toolDraw : p.key === "shape" ? r.toolShape : p.key === "text" ? r.toolText : p.key === "note" ? r.toolNote : p.key === "sticky" ? r.toolSticky : p.key === "frame" ? r.toolFrame : p.key === "erase" ? r.toolEraser : r.toolLaser
  }));
  return /* @__PURE__ */ k(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: je,
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
          const h = n === p.key && !(p.key === "select" && l);
          return /* @__PURE__ */ k(
            "button",
            {
              title: `${p.label} (${p.shortcut}${p.num ? ` / ${p.num}` : ""})`,
              onClick: () => {
                l && (t.toggleLassoSelect(), c(!1)), t.setMode(p.key);
              },
              style: {
                ...Io,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: h ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ u(zo, { name: p.key, textGlyph: r.toolTextGlyph }),
                /* @__PURE__ */ u(
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
        /* @__PURE__ */ u("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ k(
          "button",
          {
            title: `${r.toolLassoSelect} (L)`,
            onClick: () => {
              l ? (t.toggleLassoSelect(), c(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), c(!0));
            },
            style: {
              ...Io,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: l ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ u(zo, { name: "lasso" }),
              /* @__PURE__ */ u(
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
        /* @__PURE__ */ u("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ u(Zu, { engine: t, background: i }),
        /* @__PURE__ */ u(Qu, { engine: t }),
        /* @__PURE__ */ u(Ju, { engine: t }),
        /* @__PURE__ */ u(_u, { engine: t }),
        e && /* @__PURE__ */ u($u, { engine: t, baseUrl: e })
      ]
    }
  );
}
const ep = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), op = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function Ei(t) {
  return t.data.opacity ?? 1;
}
function Ho(t, e) {
  return t.data[e];
}
function rp(t) {
  const e = {}, o = t.filter((n) => ep.has(n.type));
  if (o.length > 0) {
    const n = Ei(o[0]), s = o.every((i) => Ei(i) === n);
    e.opacity = s ? n : "mixed";
  }
  const r = t.filter((n) => op.has(n.type));
  if (r.length > 0) {
    const n = Ho(r[0], "borderColor"), s = r.every(
      (d) => Ho(d, "borderColor") === n
    );
    e.borderColor = s ? n ?? null : "mixed";
    const i = Ho(r[0], "borderWidth") ?? 1, a = r.every(
      (d) => (Ho(d, "borderWidth") ?? 1) === i
    );
    e.borderWidth = a ? i : "mixed";
    const l = Ho(r[0], "borderStyle") ?? "solid", c = r.every(
      (d) => (Ho(d, "borderStyle") ?? "solid") === l
    );
    e.borderStyle = c ? l : "mixed";
  }
  return e;
}
function np(t) {
  const [e, o] = $(t.mode), [r, n] = $(new Set(t.selection)), [, s] = $(0);
  if (bt(() => {
    const d = () => o(t.mode), p = () => {
      n(new Set(t.selection)), s((f) => f + 1);
    }, h = () => s((f) => f + 1);
    return t.on("mode", d), t.on("selection", p), t.on("change", h), () => {
      t.off("mode", d), t.off("selection", p), t.off("change", h);
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
  const c = rp(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: l },
    commonProps: c
  };
}
const _r = _n(null);
function Ne(t, e) {
  const o = fr(_r);
  return ct(
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
function Ee({
  value: t,
  onChange: e,
  mixed: o
}) {
  const r = qt(), { labels: n } = Yt(), s = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ k("div", { style: Wt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorOpacity }),
    /* @__PURE__ */ u(
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
    /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10, color: o ? r.textFaint : r.text }, children: o ? "--" : s })
  ] });
}
const sp = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function ke({
  label: t,
  palettes: e,
  value: o,
  onChange: r,
  allowNull: n,
  mixed: s
}) {
  const i = qt(), { labels: a } = Yt(), [l, c] = $(""), [d, p] = $(0), [h, f] = $(!1), m = dt(null), y = dt(null), [g, w] = $(null), [b, v] = $("bottom"), M = e[d] ?? e[0], C = M.name === "Standard" ? a.paletteStandard : M.name, A = o == null ? void 0 : o.toLowerCase();
  bt(() => {
    if (!h) return;
    const P = (G) => {
      m.current && !m.current.contains(G.target) && f(!1);
    };
    return document.addEventListener("mousedown", P), () => document.removeEventListener("mousedown", P);
  }, [h]), bt(() => {
    if (!h) return;
    const P = () => {
      const G = y.current;
      if (!G) return;
      const st = G.getBoundingClientRect(), ot = e.length * 30 + 10, J = window.innerHeight - st.bottom, it = st.top, Y = J < ot && it > J;
      v(Y ? "top" : "bottom"), w({
        top: Y ? st.top - 4 : st.bottom + 4,
        left: st.right
      });
    };
    return P(), window.addEventListener("resize", P), window.addEventListener("scroll", P, !0), () => {
      window.removeEventListener("resize", P), window.removeEventListener("scroll", P, !0);
    };
  }, [h]);
  const F = () => {
    const P = l.trim();
    if (!P) return;
    const G = P.startsWith("#") ? P : `#${P}`;
    sp.test(G) && (r(G), c(""));
  }, D = e.some(
    (P) => P.colors.some((G) => G.toLowerCase() === A)
  );
  return /* @__PURE__ */ k("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 }, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: i.textMuted, paddingTop: 2 }, children: t }),
    /* @__PURE__ */ k("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ k("div", { style: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }, children: [
        n && /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(
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
        M.colors.map((P) => {
          const G = !s && A === P.toLowerCase();
          return /* @__PURE__ */ u(
            "button",
            {
              onClick: () => r(P),
              style: {
                ...Jt,
                width: 20,
                height: 20,
                background: P,
                border: G ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
                borderRadius: "50%"
              }
            },
            P
          );
        }),
        o && !D && !s && /* @__PURE__ */ u(
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
        s && /* @__PURE__ */ u("span", { style: { fontSize: 9, color: i.textMuted, fontStyle: "italic" }, children: a.inspectorMixed })
      ] }),
      e.length > 1 && /* @__PURE__ */ u("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ k("div", { ref: y, style: { position: "relative" }, children: [
        /* @__PURE__ */ k(
          "button",
          {
            onClick: () => f((P) => !P),
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
              /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: h ? "▲" : "▼" })
            ]
          }
        ),
        h && g && qe(
          /* @__PURE__ */ u(
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
              children: e.map((P, G) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    p(G), f(!1);
                  },
                  style: {
                    ...Jt,
                    height: 28,
                    padding: "0 8px",
                    background: G === d ? i.controlBgActive : "transparent",
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
                    /* @__PURE__ */ u("span", { style: { display: "flex", gap: 2 }, children: P.colors.slice(0, 6).map((st) => /* @__PURE__ */ u(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: st,
                          display: "inline-block"
                        }
                      },
                      st
                    )) }),
                    /* @__PURE__ */ u("span", { children: P.name === "Standard" ? a.paletteStandard : P.name })
                  ]
                },
                P.name
              ))
            }
          ),
          document.body
        )
      ] }) }),
      /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          value: l,
          onChange: (P) => c(P.target.value),
          onKeyDown: (P) => {
            P.key === "Enter" && F();
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
function tr({
  label: t,
  value: e,
  onChange: o,
  mixed: r
}) {
  const n = qt();
  return /* @__PURE__ */ k("div", { style: Wt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: t }),
    Cu.map((s) => /* @__PURE__ */ u(
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
        children: /* @__PURE__ */ u("svg", { width: 24, height: 12, children: /* @__PURE__ */ u(
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
function er({
  label: t,
  widths: e = zu,
  value: o,
  onChange: r,
  mixed: n
}) {
  const s = qt();
  return /* @__PURE__ */ k("div", { style: Wt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: s.textMuted }, children: t }),
    /* @__PURE__ */ u("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }, children: e.map((i) => /* @__PURE__ */ u(
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
        children: /* @__PURE__ */ u(
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
function xr({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: r,
  onChange: n
}) {
  const { labels: s } = Yt();
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      ke,
      {
        label: s.inspectorBorder,
        palettes: Ae,
        value: t,
        onChange: (i) => n("borderColor", i ?? void 0),
        allowNull: !0,
        mixed: r == null ? void 0 : r.color
      }
    ),
    (t || (r == null ? void 0 : r.color)) && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u(
        tr,
        {
          label: s.inspectorStyle,
          value: e ?? "solid",
          onChange: (i) => n("borderStyle", i),
          mixed: r == null ? void 0 : r.style
        }
      ),
      /* @__PURE__ */ u(
        er,
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
const An = /* @__PURE__ */ new Map();
function me({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: r,
  onToggle: n,
  persistKey: s,
  children: i
}) {
  const a = qt(), [l, c] = $(() => s && An.has(s) ? !!An.get(s) : e), d = r ?? l, p = o === "group", h = dt(null), [f, m] = $(0);
  return bt(() => {
    !s || r !== void 0 || An.set(s, d);
  }, [s, r, d]), Kr(() => {
    const y = h.current;
    if (!y) return;
    const g = () => m(y.scrollHeight);
    g();
    const w = new ResizeObserver(() => g());
    return w.observe(y), () => w.disconnect();
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
              /* @__PURE__ */ u("span", { children: t }),
              /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
          "div",
          {
            style: {
              maxHeight: d ? f : 0,
              opacity: d ? 1 : 0,
              transition: "max-height 200ms ease, opacity 140ms ease",
              overflow: "hidden",
              pointerEvents: d ? "auto" : "none"
            },
            children: /* @__PURE__ */ u(
              "div",
              {
                ref: h,
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
function zs({ style: t }) {
  const e = qt();
  return t === "hachure" ? /* @__PURE__ */ k("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ k("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: e.text, strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ u("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ u("rect", { x: 2, y: 2, width: 16, height: 12, fill: e.text, rx: 2 }) });
}
const ip = /* @__PURE__ */ k("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ u("path", { d: "m21 21-4.35-4.35" })
] });
function tn({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: r
}) {
  var b, v;
  const n = qt(), [s, i] = $(!1), [a, l] = $(""), c = dt(null), d = dt(null), [p, h] = $(null), f = a.trim().toLowerCase(), m = Vt(
    () => o.filter((M) => M.toLowerCase().includes(f)),
    [o, f]
  ), y = Vt(
    () => Dr.filter(
      (M) => !o.includes(M.key) && (M.key.toLowerCase().includes(f) || M.label.toLowerCase().includes(f))
    ),
    [o, f]
  );
  bt(() => {
    if (!s || !d.current) return;
    const M = d.current.getBoundingClientRect(), C = 260, A = 16;
    let F = M.left;
    F + C > window.innerWidth - A && (F = window.innerWidth - C - A), F < A && (F = A), h({ top: M.bottom + 4, left: F });
  }, [s]), bt(() => {
    var A;
    if (!s) return;
    const M = (F) => {
      var st, H;
      const D = F.target;
      if ((st = c.current) != null && st.contains(D)) return;
      const G = (((H = c.current) == null ? void 0 : H.ownerDocument) ?? document).getElementById("font-picker-popover");
      G != null && G.contains(D) || i(!1);
    }, C = ((A = c.current) == null ? void 0 : A.ownerDocument) ?? document;
    return C.addEventListener("mousedown", M), () => C.removeEventListener("mousedown", M);
  }, [s]);
  const g = (M) => {
    e(M), i(!1), l("");
  }, w = (M, C) => {
    const A = (C == null ? void 0 : C.label) ?? M, F = C == null ? void 0 : C.category, D = t === M;
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
          background: D ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: so(M),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (P) => {
          D || (P.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (P) => {
          D || (P.currentTarget.style.background = "transparent");
        },
        children: [
          /* @__PURE__ */ u(
            "span",
            {
              style: {
                width: 24,
                flexShrink: 0,
                fontSize: 12,
                color: "#64748b",
                fontFamily: "sans-serif"
              },
              children: sc(F)
            }
          ),
          /* @__PURE__ */ u("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: A })
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
          fontFamily: so(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...r
        },
        children: [
          /* @__PURE__ */ u("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((b = Dr.find((M) => M.key === t)) == null ? void 0 : b.label) ?? t }),
          /* @__PURE__ */ u(
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
    s && p && qe(
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
                  /* @__PURE__ */ u("span", { style: { color: "#64748b", display: "flex" }, children: ip }),
                  /* @__PURE__ */ u(
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
                /* @__PURE__ */ u(
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
                m.map((M) => w(M, Dr.find((C) => C.key === M)))
              ] }),
              /* @__PURE__ */ k("div", { children: [
                /* @__PURE__ */ u(
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
                y.length > 0 ? y.map((M) => w(M.key, M)) : /* @__PURE__ */ u(
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
function Ts({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "sharp" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", ...o }),
    t === "round" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4", ...o })
  ] });
}
const ap = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], lp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function cp({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function bo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function dp({ engine: t, node: e, fontsInScene: o }) {
  const r = qt(), { labels: n } = Yt(), s = Ne(t, e), i = fr(_r) ?? [e], { data: a } = e, l = a.fill ?? null, c = a.fillStyle ?? "hachure", d = a.strokeStyle ?? "solid", p = bo(i, (b) => b.data.stroke), h = bo(i, (b) => b.data.fill ?? null), f = bo(i, (b) => b.data.fillStyle ?? "hachure"), m = bo(i, (b) => b.data.strokeStyle ?? "solid"), y = bo(i, (b) => b.data.strokeWidth), g = bo(i, (b) => b.data.roughness), w = bo(i, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ k(me, { title: n.inspectorStructure, persistKey: "shape.structure", children: [
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorShape }),
        lp.map((b) => /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(cp, { name: b.key })
          },
          b.key
        ))
      ] }),
      (a.shape === "rect" || a.shape === "diamond") && /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorEdges }),
        [
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" }
        ].map((b) => /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(Ts, { name: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorLabel }),
        /* @__PURE__ */ u(
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
    a.label && /* @__PURE__ */ k(me, { title: n.inspectorTypography, defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ u(
          tn,
          {
            value: a.labelFontFamily ?? "Excalifont",
            onChange: (b) => s({ labelFontFamily: b === "Excalifont" ? void 0 : b }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorSize }),
        ap.map((b) => /* @__PURE__ */ u(
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
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorAlign }),
        Cs.map((b) => /* @__PURE__ */ u(
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
    /* @__PURE__ */ k(me, { title: n.inspectorAppearance, persistKey: "shape.appearance", children: [
      /* @__PURE__ */ u(
        ke,
        {
          label: n.inspectorStroke,
          palettes: Ae,
          value: p ? void 0 : a.stroke,
          mixed: p,
          onChange: (b) => s({ stroke: b })
        }
      ),
      /* @__PURE__ */ u(
        ke,
        {
          label: n.inspectorFill,
          palettes: Is,
          value: h ? void 0 : l,
          mixed: h,
          onChange: (b) => s({ fill: b ?? void 0 }),
          allowNull: !0
        }
      ),
      l && !h && /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorFillPattern }),
        vs.map((b) => /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(zs, { style: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ u(
        tr,
        {
          label: n.inspectorStrokeStyle,
          value: d,
          mixed: m,
          onChange: (b) => s({ strokeStyle: b })
        }
      ),
      /* @__PURE__ */ u(
        er,
        {
          label: n.inspectorStrokeWidth,
          widths: Ms,
          value: a.strokeWidth,
          mixed: y,
          onChange: (b) => s({ strokeWidth: b })
        }
      ),
      /* @__PURE__ */ u(
        Ee,
        {
          value: a.opacity ?? 1,
          mixed: w,
          onChange: (b) => s({ opacity: b })
        }
      )
    ] }),
    /* @__PURE__ */ u(me, { title: n.inspectorSketch, defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorRoughness }),
      Ss.map((b) => {
        const v = b.value === 0 ? n.roughnessArchitect : b.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ u(
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
function Oo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function hp({ engine: t, node: e }) {
  const o = qt(), { labels: r } = Yt(), n = Ne(t, e), s = fr(_r) ?? [e], { data: i } = e, a = i.fill ?? null, l = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", d = Oo(s, (g) => g.data.color), p = Oo(s, (g) => g.data.fill ?? null), h = Oo(s, (g) => g.data.fillStyle ?? "hachure"), f = Oo(s, (g) => g.data.strokeStyle ?? "solid"), m = Oo(s, (g) => g.data.strokeWidth), y = Oo(s, (g) => g.data.opacity ?? 1);
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      ke,
      {
        label: r.inspectorStroke,
        palettes: Ae,
        value: d ? void 0 : i.color,
        mixed: d,
        onChange: (g) => n({ color: g })
      }
    ),
    /* @__PURE__ */ u(
      ke,
      {
        label: r.inspectorFill,
        palettes: Is,
        value: p ? void 0 : a,
        mixed: p,
        onChange: (g) => n({ fill: g ?? void 0 }),
        allowNull: !0
      }
    ),
    a && !p && /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorFillPattern }),
      vs.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => n({ fillStyle: g.key }),
          style: {
            ...Jt,
            width: 36,
            height: 28,
            background: !h && l === g.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(zs, { style: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ u(
      tr,
      {
        label: r.inspectorStrokeStyle,
        value: c,
        mixed: f,
        onChange: (g) => n({ strokeStyle: g })
      }
    ),
    /* @__PURE__ */ u(
      er,
      {
        label: r.inspectorStrokeWidth,
        widths: qa,
        value: i.strokeWidth,
        mixed: m,
        onChange: (g) => n({ strokeWidth: g })
      }
    ),
    /* @__PURE__ */ u(
      Ee,
      {
        value: i.opacity ?? 1,
        mixed: y,
        onChange: (g) => n({ opacity: g })
      }
    )
  ] });
}
function up({ engine: t, node: e, fontsInScene: o }) {
  const r = qt(), { labels: n } = Yt(), s = Ne(t, e), { data: i } = e;
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ k(me, { title: n.inspectorTypography, persistKey: "text.typography", children: [
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ u(
          tn,
          {
            value: i.fontFamily,
            onChange: (a) => s({ fontFamily: a }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorSize }),
        Ka.map((a) => /* @__PURE__ */ u(
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
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorAlign }),
        Cs.map((a) => /* @__PURE__ */ u(
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
    /* @__PURE__ */ k(me, { title: n.inspectorAppearance, persistKey: "text.appearance", children: [
      /* @__PURE__ */ u(
        ke,
        {
          label: n.inspectorStroke,
          palettes: Ae,
          value: i.color,
          onChange: (a) => s({ color: a })
        }
      ),
      /* @__PURE__ */ u(
        xr,
        {
          borderColor: i.borderColor ?? null,
          borderStyle: i.borderStyle,
          borderWidth: i.borderWidth,
          onChange: (a, l) => s({ [a]: l })
        }
      ),
      /* @__PURE__ */ u(
        Ee,
        {
          value: i.opacity ?? 1,
          onChange: (a) => s({ opacity: a })
        }
      )
    ] })
  ] });
}
function pp({ engine: t, node: e }) {
  const o = qt(), { labels: r } = Yt(), n = Ne(t, e), { data: s } = e;
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ k(me, { title: r.edgeLineSection, persistKey: "edge.line", children: [
      /* @__PURE__ */ u(
        ke,
        {
          label: r.edgeColor,
          palettes: Ae,
          value: s.color,
          onChange: (i) => n({ color: i })
        }
      ),
      /* @__PURE__ */ u(
        tr,
        {
          label: r.inspectorStyle,
          value: s.style,
          onChange: (i) => n({ style: i })
        }
      ),
      /* @__PURE__ */ u(
        er,
        {
          label: r.inspectorWidth,
          widths: Iu,
          value: s.strokeWidth,
          onChange: (i) => n({ strokeWidth: i })
        }
      )
    ] }),
    /* @__PURE__ */ k(me, { title: r.edgeArrowsSection, persistKey: "edge.arrows", children: [
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((i) => /* @__PURE__ */ u(
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
      (s.arrowHead ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.edgeHeadSize }),
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: s.arrowHeadSize ?? Math.max(8, s.strokeWidth * 3) })
      ] }),
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((i) => /* @__PURE__ */ u(
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
      (s.arrowTail ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.edgeTailSize }),
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: s.arrowTailSize ?? Math.max(8, s.strokeWidth * 3) })
      ] })
    ] }),
    /* @__PURE__ */ k(me, { title: r.edgePathMotionSection, defaultOpen: !1, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.edgePath }),
        [
          { key: "bezier", label: r.edgeBezier },
          { key: "straight", label: r.edgeStraight },
          { key: "smoothstep", label: r.edgeSmooth },
          { key: "step", label: r.edgeStep }
        ].map((i) => /* @__PURE__ */ u(
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
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.edgeAnimate }),
        /* @__PURE__ */ u(
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
      s.animated && /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.edgeDirection }),
        ["forward", "reverse", "both", "bop"].map((i) => /* @__PURE__ */ u(
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
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorRoughness }),
        Ss.map((i) => {
          const a = i.value === 0 ? r.roughnessArchitect : i.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
          return /* @__PURE__ */ u(
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
    /* @__PURE__ */ u(me, { title: r.inspectorLabel, defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.edgeText }),
      /* @__PURE__ */ u(
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
function fp({ engine: t, node: e }) {
  const o = qt(), { labels: r } = Yt(), [n, s] = $("idle"), i = Ne(t, e), { data: a } = e, l = !!a.crop;
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      xr,
      {
        borderColor: a.borderColor ?? null,
        borderStyle: a.borderStyle,
        borderWidth: a.borderWidth,
        onChange: (c, d) => i({ [c]: d })
      }
    ),
    /* @__PURE__ */ k("div", { style: { ...Wt, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorCrop }),
      /* @__PURE__ */ u(
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
      l && /* @__PURE__ */ u(
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
    /* @__PURE__ */ k("div", { style: { ...Wt, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorBackground }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: async () => {
            if (n !== "loading") {
              s("loading");
              try {
                const { removeBackground: c } = await import("@imgly/background-removal"), p = await (await fetch(a.src)).blob(), h = await c(p), f = new FileReader(), m = await new Promise((y, g) => {
                  f.onload = () => y(f.result), f.onerror = g, f.readAsDataURL(h);
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
    /* @__PURE__ */ u(
      Ee,
      {
        value: a.opacity ?? 1,
        onChange: (c) => i({ opacity: c })
      }
    )
  ] });
}
function yp({ engine: t, node: e }) {
  const o = qt(), r = Ne(t, e), { data: n } = e;
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      xr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ u(
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
          children: /* @__PURE__ */ u(Ts, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Ee,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
const dr = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, gp = bu();
function mp({
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
  return /* @__PURE__ */ k("div", { style: Wt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r }),
    /* @__PURE__ */ u(
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
    /* @__PURE__ */ u("span", { style: { fontSize: 10, color: o.textMuted }, children: n })
  ] });
}
function bp({ engine: t, node: e }) {
  const o = qt(), { labels: r } = Yt(), n = Ne(t, e), { data: s } = e, i = ct(
    (d) => {
      var y;
      if (!d) {
        n({ devicePreset: void 0 });
        return;
      }
      const p = Qn(d);
      if (!p) return;
      const h = Va(p), f = Math.round(e.w / h), m = { devicePreset: d };
      (!s.label || ((y = Qn(s.devicePreset ?? "")) == null ? void 0 : y.label) === s.label) && (m.label = p.label), n(m), t.updateNodeWithHistory(e.id, { h: f });
    },
    [t, e, s.label, s.devicePreset, n]
  ), a = Vt(() => {
    const d = t.getAllNodes().filter((y) => y.type === "frame"), p = d.length, h = /* @__PURE__ */ new Set();
    for (const y of d)
      y.id !== e.id && y.data.slideOrder != null && h.add(y.data.slideOrder);
    const f = [];
    for (let y = 1; y <= p; y++)
      h.has(y) || f.push(y);
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
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorLabel }),
      /* @__PURE__ */ u(
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
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.frameDevice }),
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
            /* @__PURE__ */ u("option", { value: "", children: r.frameFreeform }),
            gp.map((d) => /* @__PURE__ */ u("optgroup", { label: c[d.label] ?? d.label, children: d.presets.map((p) => /* @__PURE__ */ k("option", { value: p.key, children: [
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
    /* @__PURE__ */ u(
      ke,
      {
        label: r.inspectorBackground,
        palettes: Ae,
        value: (() => {
          const d = s.backgroundColor;
          if (!d) return null;
          for (const p of Ae) {
            const h = p.colors.find((f) => d === `${f}15`);
            if (h) return h;
          }
          return d.length === 9 && d.endsWith("15") ? d.slice(0, 7) : null;
        })(),
        onChange: (d) => n({ backgroundColor: d ? `${d}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ u(
      ke,
      {
        label: r.inspectorBorder,
        palettes: Ae,
        value: s.borderColor,
        onChange: (d) => n({ borderColor: d })
      }
    ),
    /* @__PURE__ */ u(
      tr,
      {
        label: r.inspectorStyle,
        value: s.borderStyle ?? "dashed",
        onChange: (d) => n({ borderStyle: d })
      }
    ),
    /* @__PURE__ */ u(
      er,
      {
        label: r.inspectorWidth,
        value: s.borderWidth ?? 1,
        onChange: (d) => n({ borderWidth: d })
      }
    ),
    /* @__PURE__ */ u(
      Ee,
      {
        value: s.opacity ?? 1,
        onChange: (d) => n({ opacity: d })
      }
    ),
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.frameSlideNumber }),
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
            /* @__PURE__ */ u("option", { value: "", children: r.frameAuto }),
            a.map((d) => /* @__PURE__ */ u("option", { value: d, children: d }, d))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.frameTransition }),
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
            /* @__PURE__ */ u("option", { value: "pan", children: l.pan }),
            /* @__PURE__ */ u("option", { value: "fade", children: l.fade }),
            /* @__PURE__ */ u("option", { value: "dissolve", children: l.dissolve }),
            /* @__PURE__ */ u("option", { value: "zoom", children: l.zoom }),
            /* @__PURE__ */ u("option", { value: "fold", children: l.fold }),
            /* @__PURE__ */ u("option", { value: "cube", children: l.cube }),
            /* @__PURE__ */ u("option", { value: "none", children: l.none })
          ]
        }
      )
    ] }),
    (s.transition ?? "pan") !== "none" && /* @__PURE__ */ u(
      mp,
      {
        value: s.transitionDuration ?? dr[s.transition ?? "pan"],
        onChange: (d) => n({ transitionDuration: d === dr[s.transition ?? "pan"] ? void 0 : d }),
        theme: o,
        durationLabel: r.frameDuration,
        msLabel: r.frameMilliseconds
      }
    )
  ] });
}
function xp({ engine: t, node: e }) {
  const o = qt(), { labels: r } = Yt(), n = Ne(t, e), { data: s } = e;
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      ke,
      {
        label: r.inspectorStroke,
        palettes: Pu,
        value: s.color,
        onChange: (i) => {
          i && n({ color: i });
        }
      }
    ),
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorSize }),
      [12, 14, 16, 20, 24].map((i) => /* @__PURE__ */ u(
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
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorEdges }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((i) => /* @__PURE__ */ u(
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
          children: /* @__PURE__ */ u(Ts, { name: i.key })
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Ee,
      {
        value: s.opacity ?? 1,
        onChange: (i) => n({ opacity: i })
      }
    )
  ] });
}
function wp({ engine: t, node: e }) {
  const o = qt(), r = Ne(t, e), { data: n } = e;
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "URL" }),
      /* @__PURE__ */ u(
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
    /* @__PURE__ */ u(
      xr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ u(
      Ee,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function kp({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const vp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Sp({ engine: t, mode: e, fontsInScene: o }) {
  const r = qt(), { labels: n } = Yt(), [, s] = $(0), i = ct(() => s((y) => y + 1), []), a = t.activeTool;
  if (e === "text") {
    const y = a.fontFamily ?? no, g = a.fontSize ?? 20, w = a.textAlign ?? "left", b = a.color;
    return /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ u(
          tn,
          {
            value: y,
            onChange: (v) => {
              a.fontFamily = v, i();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorSize }),
        Ka.map((v) => /* @__PURE__ */ u(
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
      /* @__PURE__ */ k("div", { style: Wt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorAlign }),
        Cs.map((v) => /* @__PURE__ */ u(
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
              background: w === v.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: v.label
          },
          v.key
        ))
      ] }),
      /* @__PURE__ */ u(
        ke,
        {
          label: n.inspectorStroke,
          palettes: Ae,
          value: b,
          onChange: (v) => {
            a.color = v, i();
          }
        }
      ),
      /* @__PURE__ */ u(
        Ee,
        {
          value: a.opacity ?? 1,
          onChange: (v) => {
            a.opacity = v, i();
          }
        }
      )
    ] });
  }
  const l = e === "shape", c = a.color, d = a.fillColor ?? null, p = a.fillStyle ?? "hachure", h = a.strokeStyle ?? "solid", f = a.width, m = a.roughness ?? 1;
  return /* @__PURE__ */ k(gt, { children: [
    l && /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorShape }),
      vp.map((y) => /* @__PURE__ */ u(
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
          children: /* @__PURE__ */ u(kp, { name: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ke,
      {
        label: n.inspectorStroke,
        palettes: Ae,
        value: c,
        onChange: (y) => {
          a.color = y, i();
        }
      }
    ),
    /* @__PURE__ */ u(
      ke,
      {
        label: n.inspectorFill,
        palettes: Is,
        value: d,
        onChange: (y) => {
          a.fillColor = y ?? void 0, i();
        },
        allowNull: !0
      }
    ),
    d && /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorFillPattern }),
      vs.map((y) => /* @__PURE__ */ u(
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
          children: /* @__PURE__ */ u(zs, { style: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ u(
      tr,
      {
        label: n.inspectorStrokeStyle,
        value: h,
        onChange: (y) => {
          a.strokeStyle = y, i();
        }
      }
    ),
    /* @__PURE__ */ u(
      er,
      {
        label: n.inspectorStrokeWidth,
        widths: l ? Ms : qa,
        value: f,
        onChange: (y) => {
          a.width = y, i();
        }
      }
    ),
    l && /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorRoughness }),
      Ss.map((y) => {
        const g = y.value === 0 ? n.roughnessArchitect : y.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ u(
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
    /* @__PURE__ */ u(
      Ee,
      {
        value: a.opacity ?? 1,
        onChange: (y) => {
          a.opacity = y, i();
        }
      }
    )
  ] });
}
function Mp({ engine: t, node: e, PanelComponent: o }) {
  const r = Ne(t, e);
  return /* @__PURE__ */ u(o, { node: e, data: e.data, engine: t, updateData: r });
}
const Cp = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), Ip = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function Ua(t) {
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
function zp(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t.getAllNodes()) {
    let n;
    r.type === "text" ? n = r.data.fontFamily : r.type === "shape" && (n = r.data.labelFontFamily), n && !e.has(n) && (e.add(n), o.push(n));
  }
  return o;
}
function Tp({ label: t }) {
  const e = qt();
  return /* @__PURE__ */ u(
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
function Pp({
  engine: t,
  open: e,
  onToggle: o
}) {
  const r = qt(), { labels: n } = Yt(), [s, i] = $(t.snapToGrid), [a, l] = $(t.gridSize), [c, d] = $(t.smartGuides), [p, h] = $(t.boardBackground), f = {
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
    }, g = () => h(t.boardBackground);
    return t.on("guides", y), t.on("background", g), () => {
      t.off("guides", y), t.off("background", g);
    };
  }, [t]);
  const m = [10, 20, 40, 80];
  return /* @__PURE__ */ k(me, { title: n.inspectorCanvas, defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorGrid }),
      /* @__PURE__ */ u(
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
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorGridSize }),
      /* @__PURE__ */ u("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }, children: m.map((y) => /* @__PURE__ */ k(
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
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorGuides }),
      /* @__PURE__ */ u(
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
    /* @__PURE__ */ k("div", { style: Wt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: n.inspectorPaper }),
      /* @__PURE__ */ u(
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
          children: Qo.map((y) => /* @__PURE__ */ u("option", { value: y.key, children: f[y.key] ?? y.label }, y.key))
        }
      )
    ] })
  ] });
}
function Za({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: r
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ u(dp, { engine: t, node: e, fontsInScene: r });
    case "draw":
      return /* @__PURE__ */ u(hp, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ u(up, { engine: t, node: e, fontsInScene: r });
    case "edge":
      return /* @__PURE__ */ u(pp, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ u(fp, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ u(yp, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ u(bp, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ u(xp, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ u(wp, { engine: t, node: e });
    default: {
      const n = o == null ? void 0 : o.get(e.type);
      return n != null && n.propertiesPanel ? /* @__PURE__ */ u(Mp, { engine: t, node: e, PanelComponent: n.propertiesPanel }) : null;
    }
  }
}
function Ri({
  engine: t,
  nodes: e
}) {
  const o = qt(), { labels: r } = Yt(), n = Math.round(e[0].rotation ?? 0), i = e.every(
    (d) => Math.round(d.rotation ?? 0) === n
  ) ? n : null, [a, l] = $(null), c = ct(
    (d) => {
      l(null);
      const p = parseFloat(d);
      if (isNaN(p)) return;
      const h = Math.max(-360, Math.min(360, p)), f = e.map((m) => ({
        id: m.id,
        patch: { rotation: h }
      }));
      t.batchUpdateWithHistory(f);
    },
    [t, e]
  );
  return /* @__PURE__ */ k("div", { style: Wt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorRotation }),
    /* @__PURE__ */ u(
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
    /* @__PURE__ */ u("span", { style: { fontSize: 10, color: o.textMuted }, children: "°" })
  ] });
}
function Li({
  engine: t,
  nodes: e
}) {
  const o = qt(), { labels: r } = Yt(), n = e.map((i) => i.id);
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
  return /* @__PURE__ */ k("div", { style: Wt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: r.inspectorStack }),
    /* @__PURE__ */ u(
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
        children: s.map((i) => /* @__PURE__ */ u(
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
function Ap({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const r = ct(
    (n, s) => {
      const i = n === "opacity" ? Cp : Ip, a = e.filter((l) => i.has(l.type)).map((l) => ({
        id: l.id,
        patch: {
          data: { ...l.data, [n]: s }
        }
      }));
      t.batchUpdateWithHistory(a);
    },
    [t, e]
  );
  return /* @__PURE__ */ k(gt, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ u(
      Ee,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (n) => r("opacity", n)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ u(
      xr,
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
function Ep({
  engine: t,
  target: e
}) {
  const o = qt(), { labels: r } = Yt();
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
  return /* @__PURE__ */ u(me, { title: r.inspectorActions, defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ u("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: c.map((d) => /* @__PURE__ */ u(
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
function Rp({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: r,
  open: n,
  onToggle: s
}) {
  const { labels: i } = Yt(), l = Ua(i)[e.type] ?? e.type, c = e.nodes.length, d = e.nodes[0], p = `${l} (${c})`;
  return /* @__PURE__ */ u(me, { title: p, defaultOpen: !1, variant: "group", open: n, onToggle: s, children: /* @__PURE__ */ u(_r.Provider, { value: e.nodes, children: /* @__PURE__ */ u(
    Za,
    {
      engine: t,
      node: d,
      registry: o,
      fontsInScene: r
    }
  ) }) });
}
function Lp(t, e) {
  const o = Ua(e);
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
function Di({
  engine: t,
  registry: e,
  target: o,
  commonProps: r
}) {
  const { labels: n } = Yt(), s = Vt(() => zp(t), [t, o]), i = Lp(o, n), [a, l] = $("shared"), [c, d] = $(!1);
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
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((h) => h.type)])).has(a) || l("shared");
  }, [o, a]), /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(Tp, { label: i }),
    /* @__PURE__ */ u(
      Pp,
      {
        engine: t,
        open: o.kind === "multi" ? a === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => l((p) => p === "canvas" ? "" : "canvas") : void 0
      }
    ),
    c && /* @__PURE__ */ u(Ep, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ u(Sp, { engine: t, mode: o.mode, fontsInScene: s }),
    o.kind === "single" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u(
        Za,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: s
        }
      ),
      /* @__PURE__ */ u(Ri, { engine: t, nodes: [o.node] }),
      /* @__PURE__ */ u(Li, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ k(
        me,
        {
          title: n.inspectorShared,
          defaultOpen: !0,
          variant: "group",
          open: a === "shared",
          onToggle: () => l((p) => p === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ u(Ap, { engine: t, nodes: o.nodes, commonProps: r }),
            /* @__PURE__ */ u(Ri, { engine: t, nodes: o.nodes }),
            /* @__PURE__ */ u(Li, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((p) => /* @__PURE__ */ u(
        Rp,
        {
          engine: t,
          group: p,
          registry: e,
          fontsInScene: s,
          open: a === p.type,
          onToggle: () => l((h) => h === p.type ? "" : p.type)
        },
        p.type
      ))
    ] })
  ] });
}
function Dp({ engine: t, registry: e }) {
  const o = qt(), { isRTL: r, labels: n } = Yt(), { target: s, commonProps: i } = np(t), a = s.kind !== "none", l = ct((X, _) => {
    const Q = X.trim();
    if (Q.startsWith("#")) {
      const lt = Q.slice(1), ht = lt.length === 3 ? lt.split("").map((St) => St + St).join("") : lt;
      if (ht.length === 6) {
        const St = parseInt(ht.slice(0, 2), 16), vt = parseInt(ht.slice(2, 4), 16), Mt = parseInt(ht.slice(4, 6), 16);
        return `rgba(${St}, ${vt}, ${Mt}, ${_})`;
      }
    }
    return Q.startsWith("rgb(") ? `rgba(${Q.slice(4, -1)}, ${_})` : (Q.startsWith("rgba("), Q);
  }, []), [c, d] = $(!1), [p, h] = $(!1), [f, m] = $(!1), [y, g] = $(!1), w = dt(null), b = dt(!1), v = ct(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), M = ct(
    (X) => {
      const _ = v() ? 1366 : 1024;
      return X <= _;
    },
    [v]
  ), C = dt(null), [A, F] = $(null), D = dt(null), [P, G] = $(!1), st = ct(() => {
    var Q, lt;
    const X = (Q = C.current) == null ? void 0 : Q.offsetParent;
    if (X) return { width: X.clientWidth, height: X.clientHeight };
    const _ = ((lt = C.current) == null ? void 0 : lt.ownerDocument.defaultView) ?? window;
    return { width: _.innerWidth, height: _.innerHeight };
  }, []), H = ct(() => {
    const { width: X } = st();
    return r ? { x: je + 16, y: 12 } : { x: X - jo - 16, y: 12 };
  }, [st, r]), ot = A ?? H(), J = dt(!1);
  Kr(() => {
    if (!J.current && C.current && !A) {
      J.current = !0;
      const X = C.current.offsetParent;
      X && F(
        r ? { x: je + 16, y: 12 } : { x: X.clientWidth - jo - 16, y: 12 }
      );
    }
  }, [A, r]), bt(() => {
    var lt, ht;
    const X = ((lt = C.current) == null ? void 0 : lt.offsetParent) ?? ((ht = C.current) == null ? void 0 : ht.ownerDocument.body);
    if (!X) return;
    const _ = new ResizeObserver((St) => {
      var xt;
      const vt = ((xt = St[0]) == null ? void 0 : xt.contentRect.width) ?? X.clientWidth;
      d(vt < 600);
      const Mt = M(vt);
      h(Mt), b.current || (g(Mt), b.current = !0);
    });
    _.observe(X), d(X.clientWidth < 600);
    const Q = M(X.clientWidth);
    return h(Q), b.current || (g(Q), b.current = !0), () => _.disconnect();
  }, [M]), bt(() => {
    var Lt;
    const X = ((Lt = C.current) == null ? void 0 : Lt.ownerDocument) ?? document, _ = () => {
      w.current !== null && window.clearTimeout(w.current), w.current = window.setTimeout(() => {
        m(!1), w.current = null;
      }, 200);
    }, Q = () => {
      w.current !== null && (window.clearTimeout(w.current), w.current = null), m(!0);
    }, lt = (rt) => !!(rt instanceof Element && rt.closest("[data-sb-canvas]")), ht = (rt) => {
      rt.button !== 2 && lt(rt.target) && Q();
    }, St = () => _(), vt = () => _(), Mt = (rt) => {
      lt(rt.target) && Q();
    }, xt = () => _(), ft = (rt) => {
      var Kt;
      ((Kt = rt.detail) == null ? void 0 : Kt.active) ? Q() : _();
    };
    return X.addEventListener("pointerdown", ht, !0), X.addEventListener("pointerup", St, !0), X.addEventListener("pointercancel", vt, !0), X.addEventListener("focusin", Mt, !0), X.addEventListener("focusout", xt, !0), X.addEventListener("sb:canvas-interaction", ft), () => {
      X.removeEventListener("pointerdown", ht, !0), X.removeEventListener("pointerup", St, !0), X.removeEventListener("pointercancel", vt, !0), X.removeEventListener("focusin", Mt, !0), X.removeEventListener("focusout", xt, !0), X.removeEventListener("sb:canvas-interaction", ft), w.current !== null && (window.clearTimeout(w.current), w.current = null);
    };
  }, []);
  const it = ct(
    (X, _) => {
      G(!0);
      const Q = A ? A.x : H().x, lt = A ? A.y : H().y;
      D.current = {
        startX: X.clientX,
        startY: X.clientY,
        startLeft: Q,
        startTop: lt
      }, (_ ?? X.currentTarget).setPointerCapture(X.pointerId);
    },
    [A, H]
  ), Y = ct((X) => X instanceof Element ? !!X.closest(
    'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
  ) : !1, []), N = ct(
    (X) => {
      c || X.button === 0 && (Y(X.target) || (X.stopPropagation(), it(X, X.currentTarget)));
    },
    [c, Y, it]
  ), tt = ct(
    (X) => {
      if (!D.current) return;
      X.stopPropagation();
      const _ = X.clientX - D.current.startX, Q = X.clientY - D.current.startY, { width: lt, height: ht } = st(), St = r ? 8 : je, vt = r ? lt - jo - je - 8 : lt - jo - 8, Mt = Math.max(
        St,
        Math.min(vt, D.current.startLeft + _)
      ), xt = Math.max(
        8,
        Math.min(ht - 100, D.current.startTop + Q)
      );
      F({ x: Mt, y: xt });
    },
    [st, r]
  ), K = ct(() => {
    D.current = null, G(!1);
  }, []), q = y && f, j = l(o.panelBg, 0.9);
  return a ? c ? /* @__PURE__ */ k(
    "div",
    {
      ref: C,
      "data-sb-props-panel": !0,
      onPointerDown: (X) => X.stopPropagation(),
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "45vh",
        minHeight: 200,
        background: j,
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
                  onPointerDown: (X) => X.stopPropagation(),
                  children: [
                    /* @__PURE__ */ u("span", { children: n.autoHide }),
                    /* @__PURE__ */ u(
                      "input",
                      {
                        type: "checkbox",
                        checked: y,
                        onChange: (X) => g(X.target.checked),
                        style: { accentColor: o.accentColor }
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
          "div",
          {
            style: {
              overflowY: "auto",
              padding: "0 16px 24px",
              flex: 1,
              touchAction: "pan-y"
            },
            children: /* @__PURE__ */ u(
              Di,
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
        width: jo,
        background: j,
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
        cursor: P ? "grabbing" : "grab"
      },
      onPointerDownCapture: N,
      onPointerDown: (X) => X.stopPropagation(),
      onPointerMove: tt,
      onPointerUp: K,
      onPointerCancel: K,
      children: [
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              cursor: P ? "grabbing" : "grab",
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
              /* @__PURE__ */ u("span", { style: { fontWeight: 600, letterSpacing: "0.02em" }, children: n.inspectorTitle }),
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
                  onPointerDown: (X) => X.stopPropagation(),
                  children: [
                    /* @__PURE__ */ u("span", { children: n.autoHide }),
                    /* @__PURE__ */ u(
                      "input",
                      {
                        type: "checkbox",
                        checked: y,
                        onChange: (X) => g(X.target.checked),
                        style: { accentColor: o.accentColor }
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(
              Di,
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
function Wp({ engine: t, registry: e, gifApiBaseUrl: o }) {
  const { isRTL: r } = Yt();
  return /* @__PURE__ */ k(gt, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        "data-sb-sidebar": !0,
        style: {
          position: "absolute",
          left: r ? void 0 : 0,
          right: r ? 0 : void 0,
          top: 0,
          bottom: 0,
          width: je,
          zIndex: 100
        },
        onPointerDown: (n) => n.stopPropagation(),
        children: /* @__PURE__ */ u(tp, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ u(Dp, { engine: t, registry: e })
  ] });
}
const hr = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function Bp(t) {
  const e = t.viewport.zoom, o = hr.find((r) => r > e + 1e-3) ?? hr[hr.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function Fp(t) {
  const e = t.viewport.zoom, o = [...hr].reverse().find((r) => r < e - 1e-3) ?? hr[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const Np = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
}, Me = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, ae = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Te({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ u("path", { d: "M5 12h14", ...ae }),
    t === "plus" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M12 5v14", ...ae }),
      /* @__PURE__ */ u("path", { d: "M5 12h14", ...ae })
    ] }),
    t === "undo" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ae, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...ae, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ae, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...ae, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...ae }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...ae })
    ] }),
    t === "play" && /* @__PURE__ */ u("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...ae }),
      /* @__PURE__ */ u("path", { d: "M6 6V18M18 6V18", ...ae }),
      /* @__PURE__ */ u("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...ae })
    ] }),
    t === "gauge" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 15a8 8 0 1 1 16 0", ...ae }),
      /* @__PURE__ */ u("path", { d: "M12 15l4-4", ...ae }),
      /* @__PURE__ */ u("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "search" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "6", ...ae }),
      /* @__PURE__ */ u("path", { d: "M16 16l5 5", ...ae })
    ] }),
    t === "home" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M3 12l9-8 9 8", ...ae, fill: "none" }),
      /* @__PURE__ */ u("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...ae, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...ae, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function Hp({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showPerfOverlay: r,
  onTogglePerfOverlay: n
}) {
  const s = qt(), { labels: i } = Yt(), [a, l] = $(t.viewport.zoom), [c, d] = $(!1), [p, h] = $(!1), [f, m] = $(() => t.originView != null), [y, g] = $(
    () => t.getAllNodes().filter((C) => C.type === "frame").length
  );
  bt(() => {
    const C = () => l(t.viewport.zoom), A = () => {
      d(t.canUndo()), h(t.canRedo());
    }, F = () => {
      g(t.getAllNodes().filter((D) => D.type === "frame").length), m(t.originView != null);
    };
    return t.on("viewport", C), t.on("history", A), t.on("change", F), t.on("node:create", F), t.on("node:delete", F), () => {
      t.off("viewport", C), t.off("history", A), t.off("change", F), t.off("node:create", F), t.off("node:delete", F);
    };
  }, [t]);
  const w = s.panelBg, b = `1px solid ${s.border}`, v = {
    ...Np,
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
        /* @__PURE__ */ k("div", { style: { ...v, background: w, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: i.zoomOut,
              onClick: () => Fp(t),
              style: { ...Me, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Te, { name: "minus" })
            }
          ),
          /* @__PURE__ */ u("div", { style: M }),
          /* @__PURE__ */ k(
            "button",
            {
              title: i.resetZoom,
              onClick: () => {
                t.viewport.zoom = 1, t.pan(0, 0);
              },
              style: {
                ...Me,
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
          /* @__PURE__ */ u("div", { style: M }),
          /* @__PURE__ */ u(
            "button",
            {
              title: i.zoomIn,
              onClick: () => Bp(t),
              style: { ...Me, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Te, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ k("div", { style: { ...v, background: w, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: i.fitToContent,
              onClick: () => t.fitToContent(),
              style: { ...Me, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Te, { name: "fit" })
            }
          ),
          /* @__PURE__ */ u("div", { style: M }),
          /* @__PURE__ */ u(
            "button",
            {
              title: f ? i.clearOriginView : i.saveOriginView,
              onClick: () => {
                f ? (t.clearOriginView(), m(!1)) : (t.setOriginView(), m(!0));
              },
              style: { ...Me, width: 32, height: 32, color: f ? s.accentColor : s.textFaint },
              children: /* @__PURE__ */ u(Te, { name: f ? "bookmark-fill" : "bookmark" })
            }
          ),
          /* @__PURE__ */ u("div", { style: M }),
          /* @__PURE__ */ u(
            "button",
            {
              title: i.goToOriginView,
              onClick: () => {
                f && t.goToOriginView();
              },
              disabled: !f,
              style: { ...Me, width: 32, height: 32, color: f ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Te, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ k("div", { style: { ...v, overflow: "visible", background: w, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: i.presentSlides,
              onClick: () => t.enterPresentation(),
              style: { ...Me, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Te, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ k(gt, { children: [
            /* @__PURE__ */ u("div", { style: M }),
            /* @__PURE__ */ k(
              "button",
              {
                title: i.toggleSlidesPanel,
                onClick: o,
                style: {
                  ...Me,
                  width: 32,
                  height: 32,
                  color: e ? s.text : s.textMuted,
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ u(Te, { name: "slides" }),
                  y > 0 && /* @__PURE__ */ u(
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
          n && /* @__PURE__ */ k(gt, { children: [
            /* @__PURE__ */ u("div", { style: M }),
            /* @__PURE__ */ u(
              "button",
              {
                title: i.togglePerformanceOverlay,
                onClick: n,
                style: {
                  ...Me,
                  width: 32,
                  height: 32,
                  color: r ? s.accentColor : s.textMuted
                },
                children: /* @__PURE__ */ u(Te, { name: "gauge" })
              }
            )
          ] }),
          /* @__PURE__ */ k(gt, { children: [
            /* @__PURE__ */ u("div", { style: M }),
            /* @__PURE__ */ u(
              "button",
              {
                title: i.canvasSearchOpen,
                onClick: () => {
                  document.dispatchEvent(new CustomEvent("sb:search-open"));
                },
                style: {
                  ...Me,
                  width: 32,
                  height: 32,
                  color: s.textMuted
                },
                children: /* @__PURE__ */ u(Te, { name: "search" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ k("div", { style: { ...v, background: w, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: i.undo,
              onClick: () => t.undo(),
              disabled: !c,
              style: { ...Me, width: 32, height: 32, color: c ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Te, { name: "undo" })
            }
          ),
          /* @__PURE__ */ u("div", { style: M }),
          /* @__PURE__ */ u(
            "button",
            {
              title: i.redo,
              onClick: () => t.redo(),
              disabled: !p,
              style: { ...Me, width: 32, height: 32, color: p ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Te, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
function Op(t) {
  return t.matches.length === 0 ? "0/0" : `${t.activeIndex >= 0 ? t.activeIndex + 1 : 0}/${t.matches.length}`;
}
function Xp({ engine: t }) {
  const e = qt(), { labels: o } = Yt(), [r, n] = $(!1), [s, i] = $(() => t.getSearchState()), a = dt(null), l = Vt(() => Op(s), [s]);
  return bt(() => {
    const c = () => i(t.getSearchState()), d = () => {
      n(!0), requestAnimationFrame(() => {
        var h;
        return (h = a.current) == null ? void 0 : h.focus();
      });
    }, p = document;
    return t.on("search", c), p.addEventListener("sb:search-open", d), () => {
      t.off("search", c), p.removeEventListener("sb:search-open", d);
    };
  }, [t]), bt(() => {
    const c = (d) => {
      (d.ctrlKey || d.metaKey) && d.key.toLowerCase() === "f" && (d.preventDefault(), n(!0), requestAnimationFrame(() => {
        var h;
        return (h = a.current) == null ? void 0 : h.focus();
      }));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, []), bt(() => {
    if (!r) return;
    const c = (d) => {
      var h;
      (d.ctrlKey || d.metaKey) && d.key.toLowerCase() === "f" ? (d.preventDefault(), (h = a.current) == null || h.focus()) : d.key === "Escape" && (d.preventDefault(), s.query ? t.clearSearch() : n(!1));
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
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u("span", { style: { minWidth: 42, textAlign: "center", color: e.textMuted, fontSize: 12 }, children: l }),
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
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
const En = 240, Wi = 6;
function Rn(t) {
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
  const l = a.flatMap((d) => d.sort((p, h) => p.x - h.x));
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
const Gp = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Yp() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...Gp }) });
}
function jp(t, e, o) {
  const [r, n] = $("");
  return bt(() => {
    let s = !1;
    return yu(t, e).then((i) => {
      s || n(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), r;
}
function Vp({ engine: t, frameId: e, tick: o }) {
  const r = jp(t, e, o);
  return r ? /* @__PURE__ */ u(
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
  ) : /* @__PURE__ */ u(
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
const qp = ["pan", "fade", "dissolve", "zoom", "fold", "cube", "none"];
function Bi({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ u("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ u("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ u("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ u("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ u("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ u("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const Kp = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function Up({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: r,
  theme: n,
  labels: s
}) {
  const [i, a] = $(!1), [l, c] = $(!1), d = dt(null), p = dt(null), h = t !== "none", f = e ?? dr[t], m = {
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
    const g = (w) => {
      i && d.current && !d.current.contains(w.target) && a(!1), l && p.current && !p.current.contains(w.target) && c(!1);
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
        /* @__PURE__ */ u("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: n.border } }),
        /* @__PURE__ */ k("div", { ref: d, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ k("button", { onClick: () => {
            a((g) => !g), c(!1);
          }, style: y, children: [
            /* @__PURE__ */ u(Bi, { type: t }),
            /* @__PURE__ */ u("span", { children: m[t] ?? s.transitionPan }),
            /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: i ? "▲" : "▼" })
          ] }),
          i && /* @__PURE__ */ u(
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
              children: qp.map((g) => /* @__PURE__ */ k(
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
                    /* @__PURE__ */ u(Bi, { type: g }),
                    m[g]
                  ]
                },
                g
              ))
            }
          )
        ] }),
        h && /* @__PURE__ */ k("div", { ref: p, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ k("button", { onClick: () => {
            c((g) => !g), a(!1);
          }, style: y, children: [
            /* @__PURE__ */ k("span", { children: [
              f,
              "ms"
            ] }),
            /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: l ? "▲" : "▼" })
          ] }),
          l && /* @__PURE__ */ u(
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
              children: Kp.map((g) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    r(g === dr[t] ? void 0 : g), c(!1);
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
                    g === dr[t] ? " •" : ""
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
function Zp({ engine: t, open: e, onClose: o }) {
  const r = qt(), { isRTL: n, labels: s } = Yt(), [i, a] = $(() => Rn(t)), [l, c] = $(() => new Set(t.selection)), [d, p] = $(0), h = dt(null), f = dt(null), m = dt(0), y = dt(!1), g = dt(i);
  g.current = i;
  const w = dt(!1), b = dt(!1), [v, M] = $(null), [C, A] = $(null), [F, D] = $(0), P = dt([]), G = dt(null), st = ct(() => {
    if (w.current) return;
    const N = Rn(t);
    a(N);
  }, [t]), H = ct(() => {
    c(new Set(t.selection));
  }, [t]), ot = dt(null), J = ct(() => {
    ot.current && clearTimeout(ot.current), ot.current = setTimeout(() => p((N) => N + 1), 500);
  }, []);
  bt(() => {
    st(), H();
    const N = setTimeout(() => p((K) => K + 1), 200), tt = () => {
      st(), J();
    };
    return t.on("change", tt), t.on("node:create", tt), t.on("node:delete", tt), t.on("node:data", tt), t.on("selection", H), t.on("history", tt), () => {
      clearTimeout(N), t.off("change", tt), t.off("node:create", tt), t.off("node:delete", tt), t.off("node:data", tt), t.off("selection", H), t.off("history", tt), ot.current && clearTimeout(ot.current);
    };
  }, [t, st, H, J]), bt(() => {
    if (!G.current) return;
    const N = G.current.querySelectorAll("[data-frame-card]");
    P.current = Array.from(N).map((tt) => tt.offsetHeight + Wi);
  }, [i]);
  const it = ct(
    (N) => {
      t.select(N), t.zoomToNode(N, 0.8);
    },
    [t]
  ), Y = ct(
    (N, tt) => {
      N.preventDefault(), N.stopPropagation(), m.current = N.clientY, h.current = tt, f.current = tt, y.current = !1;
    },
    []
  );
  return bt(() => {
    const N = (K) => {
      if (h.current === null) return;
      const q = K.clientY - m.current;
      if (!y.current) {
        if (Math.abs(q) < 4) return;
        y.current = !0, M(h.current), A(h.current);
      }
      D(q);
      const j = P.current, X = h.current;
      let _ = X;
      if (q > 0) {
        let Q = 0;
        for (let lt = X + 1; lt < g.current.length && (Q += j[lt] || 0, q > Q - (j[lt] || 0) / 2); lt++)
          _ = lt;
      } else if (q < 0) {
        let Q = 0;
        for (let lt = X - 1; lt >= 0 && (Q -= j[lt] || 0, q < Q + (j[lt] || 0) / 2); lt--)
          _ = lt;
      }
      f.current = _, A(_);
    }, tt = () => {
      const K = h.current, q = f.current;
      if (K !== null && q !== null && K !== q) {
        w.current = !0;
        const j = [...g.current], [X] = j.splice(K, 1);
        j.splice(q, 0, X);
        let _ = !0;
        for (let Q = 0; Q < j.length; Q++) {
          const lt = j[Q], ht = t.getNode(lt.id);
          ht && (_ ? (t.updateNodeWithHistory(lt.id, {
            data: { ...ht.data, slideOrder: Q + 1 }
          }), _ = !1) : t.updateNode(lt.id, {
            data: { ...ht.data, slideOrder: Q + 1 }
          }));
        }
        w.current = !1, b.current = !0, a(Rn(t)), p((Q) => Q + 1);
      }
      h.current = null, f.current = null, y.current = !1, M(null), A(null), D(0), b.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", N), document.addEventListener("pointerup", tt), document.addEventListener("pointercancel", tt), () => {
      document.removeEventListener("pointermove", N), document.removeEventListener("pointerup", tt), document.removeEventListener("pointercancel", tt);
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
        width: En,
        background: r.panelBg,
        borderLeft: n ? void 0 : `1px solid ${r.border}`,
        borderRight: n ? `1px solid ${r.border}` : void 0,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : n ? `translateX(-${En}px)` : `translateX(${En}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (N) => N.stopPropagation(),
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
              /* @__PURE__ */ u(
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
                  children: /* @__PURE__ */ u(Yp, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ k(
          "div",
          {
            ref: G,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: Wi
            },
            children: [
              i.length === 0 && /* @__PURE__ */ u("div", { style: { padding: "20px 8px", textAlign: "center", color: r.textMuted, fontSize: 11 }, children: s.noFramesYet }),
              i.map((N, tt) => {
                const K = l.has(N.id), q = v === tt;
                let j = 0;
                if (q)
                  j = F;
                else if (v !== null && C !== null) {
                  const Q = P.current;
                  v < C ? tt > v && tt <= C && (j = -(Q[v] || 0)) : v > C && tt >= C && tt < v && (j = Q[v] || 0);
                }
                const X = (Q) => {
                  t.updateNodeWithHistory(N.id, {
                    data: { transition: Q === "pan" ? void 0 : Q, transitionDuration: void 0 }
                  });
                }, _ = (Q) => {
                  t.updateNodeWithHistory(N.id, {
                    data: { transitionDuration: Q }
                  });
                };
                return /* @__PURE__ */ k(vl.Fragment, { children: [
                  v === null && /* @__PURE__ */ u(
                    Up,
                    {
                      value: N.transition ?? "pan",
                      durationMs: N.transitionDuration,
                      onChange: X,
                      onDurationChange: _,
                      theme: r,
                      labels: s
                    }
                  ),
                  /* @__PURE__ */ u(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: (Q) => Y(Q, tt),
                      onDoubleClick: () => it(N.id),
                      style: {
                        borderRadius: 6,
                        border: K ? `2px solid ${N.borderColor || r.text}` : `1px solid ${r.border}`,
                        background: K ? r.controlBgActive : "transparent",
                        cursor: q ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transition: q || b.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${j}px)`,
                        zIndex: q ? 10 : 1,
                        opacity: q ? 0.92 : 1,
                        boxShadow: q ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ u(Vp, { engine: t, frameId: N.id, tick: d })
                    }
                  )
                ] }, N.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const xo = 50, Ln = 30, Qp = `
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
`, Jp = `
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
function Fi(t, e, o) {
  const r = t.createShader(e);
  return r ? (t.shaderSource(r, o), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (t.deleteShader(r), null)) : null;
}
function $p(t, e, o) {
  const r = Fi(t, t.VERTEX_SHADER, e), n = Fi(t, t.FRAGMENT_SHADER, o);
  if (!r || !n) return null;
  const s = t.createProgram();
  return t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function _p() {
  const t = [], e = [];
  for (let o = 0; o <= Ln; o++)
    for (let r = 0; r <= xo; r++)
      t.push(r / xo, o / Ln * 2 - 1);
  for (let o = 0; o < Ln; o++)
    for (let r = 0; r < xo; r++) {
      const n = o * (xo + 1) + r;
      e.push(n, n + xo + 1, n + 1, n + 1, n + xo + 1, n + xo + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function tf({ phase: t, progress: e }) {
  const o = dt(null), r = dt(null);
  return bt(() => {
    const n = o.current;
    if (!n) return;
    const s = window.devicePixelRatio || 1;
    n.width = n.clientWidth * s, n.height = n.clientHeight * s;
    const i = n.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const a = $p(i, Qp, Jp);
    if (!a) return;
    i.useProgram(a);
    const { vertices: l, indices: c } = _p(), d = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, d), i.bufferData(i.ARRAY_BUFFER, l, i.STATIC_DRAW);
    const p = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, p), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const h = i.getAttribLocation(a, "aUV");
    i.enableVertexAttribArray(h), i.vertexAttribPointer(h, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
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
  }, [t, e]), /* @__PURE__ */ u(
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
const ef = {
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
}, Dn = {
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
}, $n = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Ni({ dir: t }) {
  return /* @__PURE__ */ k("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ u("polyline", { points: "15,18 9,12 15,6", ...$n }),
    t === "right" && /* @__PURE__ */ u("polyline", { points: "9,6 15,12 9,18", ...$n })
  ] });
}
function of() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...$n }) });
}
function Hi(t) {
  return 1 - Math.pow(1 - t, 3);
}
function Oi(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Xi(t, e) {
  let r;
  t <= 0.2 ? r = 1 + (0.55 - 1) * Hi(t / 0.2) : t >= 0.8 ? r = 0.55 + (1 - 0.55) * Hi((t - 0.8) / 0.2) : r = 0.55;
  let n;
  return t <= 0.1 ? n = 0 : t <= 0.5 ? n = -e * 90 * Oi((t - 0.1) / 0.4) : t <= 0.9 ? n = e * 90 * (1 - Oi((t - 0.5) / 0.4)) : n = 0, { zoom: r, angle: n };
}
function rf(t, e, o, r) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${r}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function Gi(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function nf({ engine: t }) {
  const [e, o] = $(t.presentationMode), [r, n] = $(t.presentationIndex), [s, i] = $(t.presentationSlides.length), [a, l] = $(""), [c, d] = $(t.transitionOverlay), p = dt(null), h = dt(null);
  if (bt(() => {
    const m = document.querySelector("[data-sb-canvas]");
    p.current = m, h.current = (m == null ? void 0 : m.parentElement) ?? null;
    const y = () => {
      var v;
      if (o(t.presentationMode), n(t.presentationIndex), i(t.presentationSlides.length), d(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const M = t.presentationSlides[t.presentationIndex], C = t.getNode(M);
        l(((v = C == null ? void 0 : C.data) == null ? void 0 : v.label) || "");
      } else
        l("");
      const g = t.transitionOverlay, w = p.current, b = h.current;
      if (w && b && g && g.type === "cube" && g.t != null) {
        const M = g.direction ?? 1, { zoom: C, angle: A } = Xi(g.t, M);
        rf(w, b, C, A);
      } else w && b && Gi(w, b);
    };
    return t.on("presentation", y), () => {
      t.off("presentation", y);
      const g = p.current, w = h.current;
      g && w && Gi(g, w);
    };
  }, [t]), !e || s === 0) return null;
  const f = c && c.type === "cube" && c.t != null ? (() => {
    const m = c.direction ?? 1, { angle: y } = Xi(c.t, m);
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
        c && c.type !== "fold" && c.type !== "cube" && /* @__PURE__ */ u(
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
        c && c.type === "fold" && /* @__PURE__ */ u(tf, { phase: c.phase, progress: c.progress }),
        f > 0.01 && /* @__PURE__ */ u(
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
        /* @__PURE__ */ k("div", { style: ef, onPointerDown: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Dn, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ u(of, {})
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Dn, opacity: r <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: r <= 0,
              children: /* @__PURE__ */ u(Ni, { dir: "left" })
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
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Dn, opacity: r >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: r >= s - 1,
              children: /* @__PURE__ */ u(Ni, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
function to(t) {
  return `${t.toFixed(2)} ms`;
}
function fe(t, e) {
  return { label: t, value: e };
}
function sf() {
  const t = qt(), { labels: e } = Yt(), [o, r] = $(() => he.getSnapshot());
  bt(() => {
    let s = 0;
    const i = (l) => {
      he.tick(l), s = requestAnimationFrame(i);
    };
    s = requestAnimationFrame(i);
    const a = he.subscribe(() => r(he.getSnapshot()));
    return () => {
      cancelAnimationFrame(s), a();
    };
  }, []);
  const n = Vt(
    () => [
      fe(e.perfVirtualization, o.virtualizationActive ? e.perfOn : e.perfOff),
      fe(e.perfFps, o.fps.toFixed(1)),
      fe(e.perfFrameP50P95, `${to(o.frameMsP50)} / ${to(o.frameMsP95)}`),
      fe(e.perfCullingP50P95, `${to(o.cullingMsP50)} / ${to(o.cullingMsP95)}`),
      fe(e.perfHitTestP50P95, `${to(o.hitTestMsP50)} / ${to(o.hitTestMsP95)}`),
      fe(e.perfEdgeHitP50P95, `${to(o.edgeHitMsP50)} / ${to(o.edgeHitMsP95)}`),
      fe(e.perfHitTestCalls, o.hitTestCallsPerSec.toFixed(1)),
      fe(e.perfEdgeHitCalls, o.edgeHitCallsPerSec.toFixed(1)),
      fe(e.perfVisibleNodes, `${o.visibleNodes} / ${o.totalNodes}`),
      fe(e.perfVisibleEdges, `${o.visibleEdges} / ${o.totalEdges}`),
      fe(e.perfSeedVisibleNodes, String(o.seedVisibleNodes)),
      fe(e.perfNodesAdjacency, String(o.nodesAddedByAdjacency)),
      fe(e.perfNodesEdgeEndpoints, String(o.nodesAddedByEdgeEndpoints)),
      fe(e.perfEdgesAdjacency, String(o.edgesAddedByAdjacency)),
      fe(e.perfEdgesCrossing, String(o.edgesAddedByCrossing))
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
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u("div", { style: { padding: "8px 10px", display: "grid", rowGap: 4 }, children: n.map((s) => /* @__PURE__ */ k("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
          /* @__PURE__ */ u("span", { style: { color: t.textMuted }, children: s.label }),
          /* @__PURE__ */ u("span", { children: s.value })
        ] }, s.label)) })
      ]
    }
  );
}
const af = Cl(() => import("./DebugPanel-s3F-L6ni.js"));
function If({
  nodeTypes: t = sh,
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
  localization: h
}) {
  const f = Vt(
    () => e ?? new Ic(),
    [e]
  ), m = Vt(() => new zc(t), [t]);
  bt(() => ic(), []), bt(() => {
    f.setRegistry(m);
  }, [f, m]), bt(() => {
    for (const G of t)
      G.isContainer && f.registerContainerType(G.type);
  }, [f, t]);
  const y = dt(!1);
  bt(() => {
    n && !y.current && (y.current = !0, f.fromSBD(n));
  }, [f, n]);
  const g = dt(null);
  bt(() => {
    if (o)
      return Qh(f, g.current);
  }, [f, o]);
  const w = Vt(() => t.some((st) => {
    var H;
    return (H = st.ports) == null ? void 0 : H.length;
  }) ? new ih(f, m) : null, [f, m, t]);
  bt(() => {
    if (w)
      return w.connect();
  }, [w]);
  const b = Vt(
    () => l ? { ...Vn, ...l } : Vn,
    [l]
  ), v = Rh(p, h), [M, C] = $(!1), [A, F] = $(!1), [D, P] = $(!1);
  return bt(() => {
    he.setEnabled(D);
  }, [D]), bt(() => {
    const G = () => {
      const st = f.presentationMode;
      C(st), c == null || c(st);
    };
    return f.on("presentation", G), () => f.off("presentation", G);
  }, [f, c]), /* @__PURE__ */ u(Ra.Provider, { value: v, children: /* @__PURE__ */ u(wa.Provider, { value: b, children: /* @__PURE__ */ k(
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
        s && !M && /* @__PURE__ */ u(Wp, { engine: f, registry: m, gifApiBaseUrl: d }),
        i && /* @__PURE__ */ u(Ml, { fallback: null, children: /* @__PURE__ */ u(af, { engine: f, extraBoards: a }) }),
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !M && !v.isRTL ? je : 0,
              top: 0,
              right: s && !M && v.isRTL ? je : 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ u(Su, { engine: f, schema: es, registry: m, dataFlow: w }),
              !M && /* @__PURE__ */ u(Xp, { engine: f }),
              !M && /* @__PURE__ */ u(
                Hp,
                {
                  engine: f,
                  framesPanelOpen: A,
                  onToggleFramesPanel: () => F((G) => !G),
                  showPerfOverlay: D,
                  onTogglePerfOverlay: () => P((G) => !G)
                }
              ),
              !M && D && /* @__PURE__ */ u(sf, {}),
              !M && /* @__PURE__ */ u(
                Zp,
                {
                  engine: f,
                  open: A,
                  onClose: () => F(!1)
                }
              ),
              /* @__PURE__ */ u(nf, { engine: f })
            ]
          }
        )
      ]
    }
  ) }) });
}
const lf = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], Xo = {
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
function cr({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ..._t }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ..._t })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ..._t }),
    t === "text" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M7 4h10", ..._t }),
      /* @__PURE__ */ u("path", { d: "M12 4v16", ..._t })
    ] }),
    t === "note" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ..._t }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ..._t }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ..._t, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ..._t, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ..._t, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ..._t }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ..._t })
    ] }),
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ..._t }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ..._t }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ..._t }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ..._t }),
    t === "arrow" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ..._t }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ..._t, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ..._t, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ..._t, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ..._t, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ..._t, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ..._t }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ..._t }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ..._t })
    ] }),
    t === "fit" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ..._t }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ..._t })
    ] })
  ] });
}
function zf({ engine: t }) {
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
        lf.map((c) => /* @__PURE__ */ u(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...Xo,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(cr, { name: c.key })
          },
          c.key
        )),
        /* @__PURE__ */ u(
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
        ].map((c) => /* @__PURE__ */ u(
          "button",
          {
            title: c.label,
            onClick: () => t.setBoardBackground(c.key),
            style: {
              ...Xo,
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
        /* @__PURE__ */ u("div", { style: { flex: 1 } }),
        /* @__PURE__ */ u(
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
              ...Xo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(cr, { name: "print" })
          }
        ),
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
          "button",
          {
            title: "Undo (Ctrl+Z)",
            onClick: () => t.undo(),
            disabled: !r,
            style: {
              ...Xo,
              width: 36,
              height: 36,
              background: "transparent",
              color: r ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(cr, { name: "undo" })
          }
        ),
        /* @__PURE__ */ u(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...Xo,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(cr, { name: "redo" })
          }
        ),
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
          "button",
          {
            title: "Fit to content (Ctrl+0)",
            onClick: () => t.fitToContent(),
            style: {
              ...Xo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(cr, { name: "fit" })
          }
        )
      ]
    }
  );
}
const eo = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], cf = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], df = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Go = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], hf = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Yo = [1, 2.5, 5, 10, 20], uf = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], pf = [14, 20, 28, 36], ff = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Wn = 300, Ot = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, Xt = {
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
function Tf({
  engine: t,
  registry: e
}) {
  const [o, r] = $(t.mode), [n, s] = $(t.selection), [, i] = $(0), [a, l] = $(null), c = dt(null), d = dt(null), [p, h] = $(!1), f = ct(() => {
    var ut;
    return { x: (((ut = c.current) == null ? void 0 : ut.ownerDocument.defaultView) ?? window).innerWidth - Wn - 12, y: 12 };
  }, []), m = a ?? f();
  bt(() => {
    const S = () => r(t.mode), ut = () => {
      s(new Set(t.selection)), i((se) => se + 1);
    }, $t = () => i((se) => se + 1);
    return t.on("mode", S), t.on("selection", ut), t.on("change", $t), () => {
      t.off("mode", S), t.off("selection", ut), t.off("change", $t);
    };
  }, [t]);
  const y = ct((S) => {
    S.stopPropagation(), h(!0);
    const ut = a ? a.x : f().x, $t = a ? a.y : f().y;
    d.current = { startX: S.clientX, startY: S.clientY, startLeft: ut, startTop: $t }, S.currentTarget.setPointerCapture(S.pointerId);
  }, [a, f]);
  bt(() => {
    var se;
    const S = (ye) => {
      var Se;
      if (!d.current) return;
      const Ue = ye.clientX - d.current.startX, Xe = ye.clientY - d.current.startY, Ge = ((Se = c.current) == null ? void 0 : Se.ownerDocument.defaultView) ?? window, Ao = Math.max(48, Math.min(Ge.innerWidth - Wn - 8, d.current.startLeft + Ue)), Ce = Math.max(8, Math.min(Ge.innerHeight - 100, d.current.startTop + Xe));
      l({ x: Ao, y: Ce });
    }, ut = () => {
      d.current = null, h(!1);
    }, $t = ((se = c.current) == null ? void 0 : se.ownerDocument) ?? document;
    return $t.addEventListener("pointermove", S), $t.addEventListener("pointerup", ut), $t.addEventListener("pointercancel", ut), () => {
      $t.removeEventListener("pointermove", S), $t.removeEventListener("pointerup", ut), $t.removeEventListener("pointercancel", ut);
    };
  }, []);
  const g = (() => {
    if (n.size === 1) {
      const S = Array.from(n)[0], ut = t.getNode(S);
      if ((ut == null ? void 0 : ut.type) === "shape") return { kind: "shape", node: ut };
      if ((ut == null ? void 0 : ut.type) === "draw") return { kind: "draw", node: ut };
      if ((ut == null ? void 0 : ut.type) === "text") return { kind: "text", node: ut };
      if ((ut == null ? void 0 : ut.type) === "edge") return { kind: "edge", node: ut };
      if ((ut == null ? void 0 : ut.type) === "image") return { kind: "image", node: ut };
      if ((ut == null ? void 0 : ut.type) === "content") return { kind: "content", node: ut };
      if ((ut == null ? void 0 : ut.type) === "frame") return { kind: "frame", node: ut };
      if ((ut == null ? void 0 : ut.type) === "sticky") return { kind: "sticky", node: ut };
      if (ut && e) {
        const $t = e.get(ut.type);
        if ($t != null && $t.propertiesPanel)
          return { kind: "custom", node: ut, PanelComponent: $t.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" ? { kind: "tool" } : null;
  })(), w = ct(
    (S) => {
      !g || g.kind !== "shape" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), b = ct(
    (S) => {
      !g || g.kind !== "draw" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), v = ct(
    (S) => {
      !g || g.kind !== "text" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), M = ct(
    (S) => {
      !g || g.kind !== "edge" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), C = ct(
    (S) => {
      !g || g.kind !== "image" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), A = ct(
    (S) => {
      !g || g.kind !== "content" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), F = ct(
    (S) => {
      !g || g.kind !== "frame" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), D = ct(
    (S) => {
      !g || g.kind !== "sticky" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), P = ct(
    (S) => {
      !g || g.kind !== "custom" || t.updateNodeWithHistory(g.node.id, {
        data: { ...g.node.data, ...S }
      });
    },
    [t, g]
  ), [G, st] = $("idle");
  if (!g) return null;
  const H = g.kind === "custom", ot = g.kind === "shape", J = g.kind === "draw", it = g.kind === "text", Y = g.kind === "edge", N = g.kind === "image", tt = g.kind === "content", K = g.kind === "frame", q = g.kind === "sticky", j = g.kind === "tool", X = j && o === "shape", _ = j && o === "text", Q = it ? g.node.data.fontFamily : t.activeTool.fontFamily ?? no, lt = it ? g.node.data.fontSize : t.activeTool.fontSize ?? 20, ht = it ? g.node.data.align : t.activeTool.textAlign ?? "left", St = it ? g.node.data.color : t.activeTool.color, vt = ot ? g.node.data.stroke : J ? g.node.data.color : t.activeTool.color, Mt = ot || J ? g.node.data.fill ?? null : t.activeTool.fillColor ?? null, xt = ot || J ? g.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", ft = ot || J ? g.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", Lt = ot || J ? g.node.data.strokeWidth : t.activeTool.width, rt = ot ? g.node.data.roughness : t.activeTool.roughness ?? 1, Et = ot || J || it || N || tt || K || q ? g.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Kt = (() => {
    const S = /* @__PURE__ */ new Set(), ut = [];
    for (const $t of t.getAllNodes())
      if ($t.type === "text") {
        const se = $t.data.fontFamily;
        se && !S.has(se) && (S.add(se), ut.push(se));
      }
    return ut;
  })(), Ut = !it && !_ && !Y && !N && !tt && !K && !q && !H, oe = Ut, ie = Ut, ve = ot || X, He = it || _, xe = (S) => {
    ot ? w({ stroke: S }) : J ? b({ color: S }) : (t.activeTool.color = S, i((ut) => ut + 1));
  }, To = (S) => {
    ot ? w({ fill: S ?? void 0 }) : J ? b({ fill: S ?? void 0 }) : (t.activeTool.fillColor = S ?? void 0, i((ut) => ut + 1));
  }, ue = (S) => {
    ot ? w({ fillStyle: S }) : J ? b({ fillStyle: S }) : (t.activeTool.fillStyle = S, i((ut) => ut + 1));
  }, le = (S) => {
    ot ? w({ strokeStyle: S }) : J ? b({ strokeStyle: S }) : (t.activeTool.strokeStyle = S, i((ut) => ut + 1));
  }, Re = (S) => {
    ot ? w({ strokeWidth: S }) : J ? b({ strokeWidth: S }) : (t.activeTool.width = S, i((ut) => ut + 1));
  }, Ke = (S) => {
    ot ? w({ roughness: S }) : (t.activeTool.roughness = S, i((ut) => ut + 1));
  }, ne = (S) => {
    ot ? w({ opacity: S }) : J ? b({ opacity: S }) : it ? v({ opacity: S }) : N ? C({ opacity: S }) : tt ? A({ opacity: S }) : K ? F({ opacity: S }) : q ? D({ opacity: S }) : (t.activeTool.opacity = S, i((ut) => ut + 1));
  }, Oe = (S) => {
    it ? v({ fontFamily: S }) : (t.activeTool.fontFamily = S, i((ut) => ut + 1));
  }, Bt = (S) => {
    it ? v({ fontSize: S }) : (t.activeTool.fontSize = S, i((ut) => ut + 1));
  }, uo = (S) => {
    it ? v({ align: S }) : (t.activeTool.textAlign = S, i((ut) => ut + 1));
  }, po = (S) => {
    it ? v({ color: S }) : (t.activeTool.color = S, i((ut) => ut + 1));
  }, Po = {
    position: "fixed",
    left: m.x,
    top: m.y,
    width: Wn,
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
      style: Po,
      onPointerDown: (S) => S.stopPropagation(),
      children: [
        /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u("span", { style: { fontWeight: 600, letterSpacing: "0.02em", color: "white" }, children: "Inspector" })
          }
        ),
        He && /* @__PURE__ */ k(gt, { children: [
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Font" }),
            /* @__PURE__ */ u(
              tn,
              {
                value: Q,
                onChange: Oe,
                fontsInScene: Kt
              }
            )
          ] }),
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Size" }),
            pf.map((S) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Bt(S),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: lt === S ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: S
              },
              S
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Align" }),
            ff.map((S) => /* @__PURE__ */ u(
              "button",
              {
                title: S.key,
                onClick: () => uo(S.key),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: ht === S.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: S.label
              },
              S.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Color" }),
            eo.map((S) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => po(S),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S,
                  border: St === S ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              S
            ))
          ] }),
          it && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Border" }),
            [null, ...eo].map((S, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => v({ borderColor: S ?? void 0 }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === S ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ut === 0 && /* @__PURE__ */ u(
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
          it && g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Style" }),
            Go.map((S) => /* @__PURE__ */ u(
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
                children: /* @__PURE__ */ u("svg", { width: 24, height: 12, children: /* @__PURE__ */ u(
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
          it && g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Width" }),
            Yo.map((S) => /* @__PURE__ */ u(
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
                children: /* @__PURE__ */ u(
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
        Ut && /* @__PURE__ */ k(gt, { children: [
          X && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Shape" }),
            uf.map((S) => /* @__PURE__ */ u(
              "button",
              {
                title: S.label,
                onClick: () => {
                  t.activeTool.shapeType = S.key, i((ut) => ut + 1);
                },
                style: {
                  ...Zt,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === S.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(yf, { name: S.key })
              },
              S.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Stroke" }),
            eo.map((S) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => xe(S),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S,
                  border: vt === S ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              S
            ))
          ] }),
          oe && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Fill" }),
            cf.map((S, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => To(S),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: Mt === S ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ut === 0 && /* @__PURE__ */ u(
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
          oe && Mt && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Fill pattern" }),
            df.map((S) => /* @__PURE__ */ u(
              "button",
              {
                title: S.label,
                onClick: () => ue(S.key),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: xt === S.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(gf, { style: S.key })
              },
              S.key
            ))
          ] }),
          ie && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Stroke style" }),
            Go.map((S) => /* @__PURE__ */ u(
              "button",
              {
                title: S.label,
                onClick: () => le(S.key),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: ft === S.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u("svg", { width: 24, height: 12, children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Stroke width" }),
            Yo.map((S) => /* @__PURE__ */ u(
              "button",
              {
                title: `${S}px`,
                onClick: () => Re(S),
                style: {
                  ...Zt,
                  width: 36,
                  height: 24,
                  background: Lt === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
          ve && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Roughness" }),
            hf.map((S) => /* @__PURE__ */ u(
              "button",
              {
                title: S.label,
                onClick: () => Ke(S.value),
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 8px",
                  background: rt === S.value ? "#3b82f6" : "#2a2a3e",
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
        Y && /* @__PURE__ */ k(gt, { children: [
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Color" }),
            eo.map((S) => /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Style" }),
            Go.map((S) => /* @__PURE__ */ u(
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
                children: /* @__PURE__ */ u("svg", { width: 24, height: 12, children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Width" }),
            Yo.map((S) => /* @__PURE__ */ u(
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
                children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((S) => /* @__PURE__ */ u(
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
          (g.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Head size" }),
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: g.node.data.arrowHeadSize ?? Math.max(8, g.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((S) => /* @__PURE__ */ u(
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
          (g.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Tail size" }),
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: g.node.data.arrowTailSize ?? Math.max(8, g.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Label" }),
            /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((S) => /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Animate" }),
            /* @__PURE__ */ u(
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
          g.node.data.animated && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Direction" }),
            ["forward", "reverse", "both"].map((S) => /* @__PURE__ */ u(
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
        N && /* @__PURE__ */ k(gt, { children: [
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Border" }),
            [null, ...eo].map((S, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => C({ borderColor: S ?? void 0 }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === S ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ut === 0 && /* @__PURE__ */ u(
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
          g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Style" }),
            Go.map((S) => /* @__PURE__ */ u(
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
                children: /* @__PURE__ */ u("svg", { width: 24, height: 12, children: /* @__PURE__ */ u(
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
          g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Width" }),
            Yo.map((S) => /* @__PURE__ */ u(
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
                children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: { ...Ot, marginTop: 4 }, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Background" }),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: async () => {
                  if (!(G === "loading" || g.kind !== "image")) {
                    st("loading");
                    try {
                      const { removeBackground: S } = await import("@imgly/background-removal"), $t = await (await fetch(g.node.data.src)).blob(), se = await S($t), ye = new FileReader(), Ue = await new Promise((Xe, Ge) => {
                        ye.onload = () => Xe(ye.result), ye.onerror = Ge, ye.readAsDataURL(se);
                      });
                      C({ src: Ue }), st("idle");
                    } catch (S) {
                      console.error("Background removal failed:", S), st("error"), setTimeout(() => st("idle"), 3e3);
                    }
                  }
                },
                disabled: G === "loading",
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 10px",
                  background: G === "error" ? "#e74c3c" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6,
                  gap: 4,
                  opacity: G === "loading" ? 0.6 : 1
                },
                children: G === "loading" ? "Removing..." : G === "error" ? "Failed" : "Remove BG"
              }
            )
          ] })
        ] }),
        tt && /* @__PURE__ */ k(gt, { children: [
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Border" }),
            [null, ...eo].map((S, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => A({ borderColor: S ?? void 0 }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === S ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ut === 0 && /* @__PURE__ */ u(
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
          g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Style" }),
            Go.map((S) => /* @__PURE__ */ u(
              "button",
              {
                title: S.label,
                onClick: () => A({ borderStyle: S.key }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "solid") === S.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u("svg", { width: 24, height: 12, children: /* @__PURE__ */ u(
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
          g.node.data.borderColor && /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Width" }),
            Yo.map((S) => /* @__PURE__ */ u(
              "button",
              {
                title: `${S}px`,
                onClick: () => A({ borderWidth: S }),
                style: {
                  ...Zt,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === S ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
        K && /* @__PURE__ */ k(gt, { children: [
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Label" }),
            /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Background" }),
            [null, ...eo].map((S, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => F({ backgroundColor: S ? `${S}15` : void 0 }),
                style: {
                  ...Zt,
                  width: 20,
                  height: 20,
                  background: S ?? "transparent",
                  border: (() => {
                    const $t = g.node.data.backgroundColor;
                    return (S === null ? !$t : $t === `${S}15`) ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`;
                  })(),
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ut === 0 && /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Border" }),
            eo.map((S) => /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Style" }),
            Go.map((S) => /* @__PURE__ */ u(
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
                children: /* @__PURE__ */ u("svg", { width: 24, height: 12, children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Width" }),
            Yo.map((S) => /* @__PURE__ */ u(
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
                children: /* @__PURE__ */ u(
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
        q && /* @__PURE__ */ k(gt, { children: [
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((S) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => D({ color: S }),
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
          /* @__PURE__ */ k("div", { style: Ot, children: [
            /* @__PURE__ */ u("span", { style: Xt, children: "Size" }),
            [12, 14, 16, 20, 24].map((S) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => D({ fontSize: S }),
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
        H && (() => {
          const { node: S, PanelComponent: ut } = g;
          return /* @__PURE__ */ u(ut, { node: S, data: S.data, engine: t, updateData: P });
        })(),
        !Y && !H && /* @__PURE__ */ k("div", { style: Ot, children: [
          /* @__PURE__ */ u("span", { style: Xt, children: "Opacity" }),
          /* @__PURE__ */ u(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(Et * 100),
              onChange: (S) => ne(parseInt(S.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(Et * 100) })
        ] })
      ]
    }
  );
}
function yf({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ k(gt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function gf({ style: t }) {
  return t === "hachure" ? /* @__PURE__ */ k("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ k("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: "white", strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ u("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ u("rect", { x: 2, y: 2, width: 16, height: 12, fill: "white", rx: 2 }) });
}
export {
  qt as A,
  no as D,
  zc as N,
  Qo as P,
  Cf as S,
  zf as T,
  Ea as a,
  Vn as b,
  ih as c,
  Tf as d,
  Wp as e,
  If as f,
  Su as g,
  Ic as h,
  sh as i,
  Wc as j,
  Ld as k,
  Fd as l,
  qd as m,
  zt as n,
  mr as o,
  ls as p,
  Xd as q,
  rs as r,
  lc as s,
  mo as t,
  oc as u,
  Qh as v,
  Wd as w,
  Qd as x,
  jd as y,
  Yt as z
};
