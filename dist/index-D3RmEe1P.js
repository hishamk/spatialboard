var Il = Object.defineProperty;
var zl = (t, e, o) => e in t ? Il(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var bt = (t, e, o) => zl(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as Tl, defaultBlockSpecs as Pl, BlockNoteEditor as Al } from "@blocknote/core";
import { jsxs as v, jsx as u, Fragment as wt } from "react/jsx-runtime";
import El, { memo as Me, useRef as ht, useState as ot, useEffect as kt, useCallback as ct, Component as Rl, useMemo as Ut, useLayoutEffect as $r, useContext as br, createContext as ls, Suspense as Ll, lazy as Dl } from "react";
import { useCreateBlockNote as Wl } from "@blocknote/react";
import { BlockNoteView as Fl } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as Je, flushSync as Bl } from "react-dom";
const Nl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Tt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += Nl[o[t] & 63];
  return e;
};
const Hl = {
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
}, Ol = {
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
}, Xl = {
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
}, Gl = {
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
}, Yl = {
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
}, jl = {
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
}, Vl = {
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
}, ql = {
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
}, Kl = {
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
}, Ul = {
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
}, Zl = {
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
}, Ql = {
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
}, Zi = [
  Hl,
  Ol,
  Xl,
  Gl,
  Yl,
  jl,
  Vl,
  ql,
  Kl,
  Ul,
  Zl,
  Ql
];
class Jl {
  constructor() {
    bt(this, "undoStack", []);
    bt(this, "redoStack", []);
    bt(this, "maxSize", 50);
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
const Qi = 4, $l = 8, Ji = 6, $i = 6, _l = 10, tc = 14, ec = 24;
function Po(t, e, o, r) {
  if (!t.rotation) return [e, o];
  const n = t.x + t.w / 2, s = t.y + r / 2, i = -t.rotation * Math.PI / 180, a = Math.cos(i), l = Math.sin(i), c = e - n, d = o - s;
  return [n + c * a - d * l, s + c * l + d * a];
}
function Xr(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function oc(t) {
  return Math.max(0.01, t);
}
function xr(t, e) {
  return t / oc(e);
}
function rc(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, d) => d.z - c.z);
  let a = null, l = null;
  for (const c of i)
    if (c.type === "draw") {
      if (cs(c, e, o, r))
        return c;
    } else if (c.type === "shape") {
      if (_r(c, e, o, r)) return c;
      if (!l && c.data.label) {
        const d = c.h === "auto" ? 100 : c.h, [p, h] = Po(c, e, o, d), f = ea(c, d);
        f && p >= f.lx && p <= f.rx && h >= f.ly && h <= f.ry && (l = c);
      }
    } else if (s && s.has(c.type)) {
      const d = Xr(c, n);
      _i(c, e, o, r, d) && (a || (a = c));
    } else {
      const d = Xr(c, n), p = xr(Math.max(Qi, $i), r), [h, f] = Po(c, e, o, d);
      h >= c.x - p && h <= c.x + c.w + p && f >= c.y - p && f <= c.y + d + p && (l || (l = c));
    }
  return l ?? a;
}
function _i(t, e, o, r, n) {
  const s = n ?? (t.h === "auto" ? 100 : t.h), [i, a] = Po(t, e, o, s), l = r < 0.8 ? tc : _l, c = xr(Math.max($l, l), r);
  if (t.data.label && i >= t.x && i <= t.x + t.w && a >= t.y - ec && a <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || a < t.y - c || a > t.y + s + c)
    return !1;
  const p = Math.abs(i - t.x), h = Math.abs(i - (t.x + t.w)), f = Math.abs(a - t.y), m = Math.abs(a - (t.y + s)), g = i >= t.x - c && i <= t.x + t.w + c;
  return a >= t.y - c && a <= t.y + s + c && (p <= c || h <= c) || g && (f <= c || m <= c);
}
function ta(t, e, o, r, n, s) {
  const i = n - o, a = s - r, l = i * i + a * a;
  if (l === 0) return (t - o) ** 2 + (e - r) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * a) / l)), d = o + c * i, p = r + c * a;
  return (t - d) ** 2 + (e - p) ** 2;
}
function ea(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const r = o.labelFontSize ?? 14, n = r * 1.3, s = r * 0.55, a = t.w - 12 * 2, l = o.label.split(`
`);
  let c = 0;
  for (const m of l) {
    const g = m.length * s;
    c += Math.max(1, Math.ceil(g / Math.max(a, 1)));
  }
  const d = c * n, p = Math.min(a, Math.max(...l.map((m) => m.length)) * s), h = t.x + t.w / 2, f = t.y + e / 2;
  return {
    lx: h - p / 2 - 4,
    ly: f - d / 2 - 4,
    rx: h + p / 2 + 4,
    ry: f + d / 2 + 4
  };
}
function _r(t, e, o, r, n) {
  const s = t.h === "auto" ? 100 : t.h, [i, a] = Po(t, e, o, s), l = t.data, c = l.strokeWidth ?? 2, d = xr(Math.max(c / 2, Ji), r), p = !!l.fill || !!n;
  switch (l.shape) {
    case "rect": {
      if (p)
        return i >= t.x - d && i <= t.x + t.w + d && a >= t.y - d && a <= t.y + s + d;
      const h = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), m = Math.abs(a - t.y), g = Math.abs(a - (t.y + s)), y = i >= t.x - d && i <= t.x + t.w + d;
      return a >= t.y - d && a <= t.y + s + d && (h <= d || f <= d) || y && (m <= d || g <= d);
    }
    case "ellipse": {
      const h = t.x + t.w / 2, f = t.y + s / 2, m = t.w / 2, g = s / 2;
      if (m === 0 || g === 0) return !1;
      const y = (i - h) / m, x = (a - f) / g, b = y * y + x * x;
      if (p) {
        const S = ((m + d) / m) ** 2;
        return b <= S;
      }
      const k = d / Math.min(m, g);
      return Math.abs(Math.sqrt(b) - 1) <= k;
    }
    case "diamond": {
      const h = t.x + t.w / 2, f = t.y + s / 2, m = t.w / 2, g = s / 2;
      if (m === 0 || g === 0) return !1;
      const y = Math.abs(i - h) / m, x = Math.abs(a - f) / g, b = y + x;
      if (p) {
        const S = d / Math.min(m, g);
        return b <= 1 + S;
      }
      const k = d / Math.min(m, g);
      return Math.abs(b - 1) <= k;
    }
    case "line":
    case "arrow": {
      const h = l.startPoint ?? [0, 0], f = l.endPoint ?? [t.w, s], m = t.x + h[0], g = t.y + h[1], y = t.x + f[0], x = t.y + f[1];
      return ta(i, a, m, g, y, x) <= d * d;
    }
    default:
      return i >= t.x - d && i <= t.x + t.w + d && a >= t.y - d && a <= t.y + s + d;
  }
}
function nc(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const i = o[n][0], a = o[n][1], l = o[s][0], c = o[s][1];
    a > e != c > e && t < (l - i) * (e - a) / (c - a) + i && (r = !r);
  }
  return r;
}
function cs(t, e, o, r) {
  const n = t.data.strokeWidth, s = xr(Math.max(n / 2, Ji), r), i = s * s, a = t.h === "auto" ? 100 : t.h, [l, c] = Po(t, e, o, a);
  if (l < t.x - s || l > t.x + t.w + s || c < t.y - s || c > t.y + a + s)
    return !1;
  const d = t.data.points;
  if (!d || d.length === 0) return !1;
  const p = l - t.x, h = c - t.y;
  if (d.length === 1) {
    const f = p - d[0][0], m = h - d[0][1];
    return f * f + m * m <= i;
  }
  if (t.data.fill && d.length >= 3 && nc(p, h, d))
    return !0;
  for (let f = 0; f < d.length - 1; f++)
    if (ta(p, h, d[f][0], d[f][1], d[f + 1][0], d[f + 1][1]) <= i)
      return !0;
  return !1;
}
function sc(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, d) => d.z - c.z), a = [], l = [];
  for (const c of i)
    if (c.type === "draw")
      cs(c, e, o, r) && a.push(c);
    else if (c.type === "shape") {
      if (_r(c, e, o, r))
        a.push(c);
      else if (c.data.label) {
        const d = c.h === "auto" ? 100 : c.h, [p, h] = Po(c, e, o, d), f = ea(c, d);
        f && p >= f.lx && p <= f.rx && h >= f.ly && h <= f.ry && l.push(c);
      }
    } else if (s && s.has(c.type)) {
      const d = Xr(c, n);
      _i(c, e, o, r, d) && l.push(c);
    } else {
      const d = Xr(c, n), p = xr(Math.max(Qi, $i), r), [h, f] = Po(c, e, o, d);
      h >= c.x - p && h <= c.x + c.w + p && f >= c.y - p && f <= c.y + d + p && l.push(c);
    }
  return [...a, ...l];
}
function Tr(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, r = t.y + e / 2, n = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, a = Math.abs(Math.cos(i)), l = Math.abs(Math.sin(i)), c = n * a + s * l, d = n * l + s * a;
  return {
    x: o - c,
    y: r - d,
    w: c * 2,
    h: d * 2
  };
}
const He = class He {
  constructor(e, o = 0, r) {
    // Increased depth for potentially large boards
    bt(this, "level");
    bt(this, "bounds");
    bt(this, "objects");
    bt(this, "nodes");
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    bt(this, "heightMap");
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
    this.nodes[0] = new He({ x: r + e, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new He({ x: r, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new He({ x: r, y: n + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new He({ x: r + e, y: n + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const n = Tr(e, r);
    if (this.nodes.length) {
      const s = this.getIndex(n);
      if (s !== -1) {
        this.nodes[s].insert(e, r);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > He.MAX_OBJECTS && this.level < He.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], a = this.resolveH(i), l = Tr(i, a), c = this.getIndex(l);
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
      const r = this.resolveH(e), n = this.getIndex(Tr(e, r));
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
      const s = this.resolveH(n), i = Tr(n, s);
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
bt(He, "MAX_OBJECTS", 10), // Max depth of the tree
bt(He, "MAX_LEVELS", 8);
let jn = He;
function _o(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function tr(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function ic(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function ac(t, e, o, r) {
  const n = e > 0 ? 0.95 : 1.05, s = _o(t.zoom * n, 0.1, 5), i = tr(t, o, r);
  return {
    x: o - i.x * s,
    y: r - i.y * s,
    zoom: s
  };
}
function lc(t, e, o, r) {
  const n = _o(t.zoom * e, 0.1, 5), s = tr(t, o, r);
  return {
    x: o - s.x * n,
    y: r - s.y * n,
    zoom: n
  };
}
const ds = Tl.create({
  blockSpecs: {
    ...Pl
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let vn = null;
function hs() {
  return vn || (vn = Al.create({ schema: ds })), vn;
}
async function cc(t) {
  return await hs().blocksToMarkdownLossy(t);
}
async function us(t) {
  return await hs().tryParseMarkdownToBlocks(t);
}
function oa(t) {
  return hs().tryParseHTMLToBlocks(t);
}
function dc(t, e, o) {
  const [r, n] = t, [s, i] = e, [a, l] = o, c = a - s, d = l - i, p = c * c + d * d;
  if (p === 0)
    return (r - s) ** 2 + (n - i) ** 2;
  let h = ((r - s) * c + (n - i) * d) / p;
  h = Math.max(0, Math.min(1, h));
  const f = s + h * c, m = i + h * d;
  return (r - f) ** 2 + (n - m) ** 2;
}
function Vn(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, r = 0;
  const n = t[0], s = t[t.length - 1];
  for (let l = 1; l < t.length - 1; l++) {
    const c = dc(t[l], n, s);
    c > o && (o = c, r = l);
  }
  if (o <= e)
    return [n, s];
  const i = Vn(t.slice(0, r + 1), e), a = Vn(t.slice(r), e);
  return [...i.slice(0, -1), ...a];
}
async function hc(t, e) {
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
    const m = h.data.blocks.length > 0 ? await cc(h.data.blocks) : "";
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
    const g = Vn([...h.data.points], 1).map(
      ([y, x, b]) => `${(y + h.x).toFixed(1)},${(x + h.y).toFixed(1)},${b.toFixed(2)}`
    ).join(" ");
    o.push(g), o.push("");
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
const ra = "data:font/woff2;base64,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", lo = "Excalifont", Nr = [
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
], na = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), uc = /* @__PURE__ */ new Set(["Excalifont"]), pc = /* @__PURE__ */ new Set([...na, ...uc]);
function fc(t) {
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
function co(t) {
  return na.has(t) ? t : `'${t}', sans-serif`;
}
let Ks = !1;
function yc(t = document) {
  if (Ks) return;
  Ks = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${ra}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = Nr.filter((n) => !pc.has(n.key)).map((n) => "family=" + n.key.replace(/ /g, "+")).join("&"), r = t.createElement("link");
  r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(r);
}
function to(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let r;
  for (; (r = o.exec(t)) !== null; )
    e[r[1]] = r[2];
  return e;
}
const gc = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function mc(t) {
  var s, i;
  const e = [], o = {}, r = t.split(`
`);
  let n = 0;
  for (; n < r.length; ) {
    const a = r[n].trim();
    if (a.startsWith("<!--@meta")) {
      const l = to(a);
      if (l.background) {
        const c = gc[l.background] ?? l.background;
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
      const l = to(a);
      for (n++; n < r.length && r[n].trim() === ""; ) n++;
      e.push({
        id: l.id || Tt(10),
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
      const l = to(a);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      const d = c.join(`
`), p = d.trim().length > 0 ? await us(d) : [];
      e.push({
        id: l.id || Tt(10),
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
      const l = to(a);
      if (n++, l.tool === "shape")
        for (e.push({
          id: l.id || Tt(10),
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
        const d = c ? c.split(" ").filter(Boolean).map((y) => {
          const x = y.split(",").map(Number);
          return [
            x[0] || 0,
            x[1] || 0,
            x[2] || 0.5
          ];
        }) : [];
        let p = 1 / 0, h = 1 / 0, f = -1 / 0, m = -1 / 0;
        for (const [y, x] of d)
          y < p && (p = y), x < h && (h = x), y > f && (f = y), x > m && (m = x);
        isFinite(p) || (p = parseFloat(l.x || "0"), h = parseFloat(l.y || "0"), f = p, m = h);
        const g = d.map(
          ([y, x, b]) => [y - p, x - h, b]
        );
        for (e.push({
          id: l.id || Tt(10),
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
            points: g,
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
      const l = to(a);
      n++, e.push({
        id: l.id || Tt(10),
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
      const l = to(a);
      for (n++, e.push({
        id: l.id || Tt(10),
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
      const l = to(a);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      e.push({
        id: l.id || Tt(10),
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
          fontFamily: l.fontFamily || lo,
          color: l.color || "#1e1e2e",
          align: l.align || "left",
          opacity: l.opacity ? parseFloat(l.opacity) : void 0
        }
      });
      continue;
    }
    if (a.startsWith("<!--@sticky")) {
      const l = to(a);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      e.push({
        id: l.id || Tt(10),
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
const bc = 180;
function Pr(t, e) {
  t.push(e), t.length > bc && t.shift();
}
function eo(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((n, s) => n - s), r = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[r];
}
class xc {
  constructor() {
    bt(this, "enabled", !1);
    bt(this, "listeners", /* @__PURE__ */ new Set());
    bt(this, "lastTick", 0);
    bt(this, "lastRatesTs", 0);
    bt(this, "frameMs", []);
    bt(this, "cullingMs", []);
    bt(this, "hitTestMs", []);
    bt(this, "edgeHitMs", []);
    bt(this, "pendingCullingMs", 0);
    bt(this, "pendingHitTestMs", 0);
    bt(this, "pendingEdgeHitMs", 0);
    bt(this, "pendingHitTestCalls", 0);
    bt(this, "pendingEdgeHitCalls", 0);
    bt(this, "hitTestCallsPerSec", 0);
    bt(this, "edgeHitCallsPerSec", 0);
    bt(this, "visibleNodes", 0);
    bt(this, "totalNodes", 0);
    bt(this, "visibleEdges", 0);
    bt(this, "totalEdges", 0);
    bt(this, "virtualizationActive", !1);
    bt(this, "seedVisibleNodes", 0);
    bt(this, "nodesAddedByAdjacency", 0);
    bt(this, "nodesAddedByEdgeEndpoints", 0);
    bt(this, "edgesAddedByAdjacency", 0);
    bt(this, "edgesAddedByCrossing", 0);
    bt(this, "lastPublishedAt", 0);
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
      Pr(this.frameMs, r);
    }
    this.lastTick = e, Pr(this.cullingMs, this.pendingCullingMs), Pr(this.hitTestMs, this.pendingHitTestMs), Pr(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
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
      frameMsP50: eo(this.frameMs, 0.5),
      frameMsP95: eo(this.frameMs, 0.95),
      cullingMsP50: eo(this.cullingMs, 0.5),
      cullingMsP95: eo(this.cullingMs, 0.95),
      hitTestMsP50: eo(this.hitTestMs, 0.5),
      hitTestMsP95: eo(this.hitTestMs, 0.95),
      edgeHitMsP50: eo(this.edgeHitMs, 0.5),
      edgeHitMsP95: eo(this.edgeHitMs, 0.95),
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
const pe = new xc();
function ho(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const wc = 14;
function fr(t, e, o, r, n) {
  const s = e.find((h) => h.id === o);
  if (!s) return null;
  const i = ho(t, n), a = wc / r, l = e.filter((h) => h.direction === s.direction), c = l.indexOf(s);
  if (c < 0) return null;
  const d = t.y + i / (l.length + 1) * (c + 1), p = s.direction === "input" ? t.x - a : t.x + t.w + a;
  if (t.rotation) {
    const h = t.x + t.w / 2, f = t.y + i / 2, m = t.rotation * Math.PI / 180, g = Math.cos(m), y = Math.sin(m), x = p - h, b = d - f;
    return { x: h + x * g - b * y, y: f + x * y + b * g };
  }
  return { x: p, y: d };
}
function Us(t, e, o, r, n, s, i, a) {
  const l = i - n, c = a - s;
  if (l === 0 && c === 0) return { x: n, y: s, side: "right" };
  let d = 1 / 0, p = n, h = s, f = "right";
  if (l !== 0) {
    const m = (t + o - n) / l;
    if (m > 0 && m < d) {
      const g = s + m * c;
      g >= e && g <= e + r && (d = m, p = t + o, h = g, f = "right");
    }
  }
  if (l !== 0) {
    const m = (t - n) / l;
    if (m > 0 && m < d) {
      const g = s + m * c;
      g >= e && g <= e + r && (d = m, p = t, h = g, f = "left");
    }
  }
  if (c !== 0) {
    const m = (e + r - s) / c;
    if (m > 0 && m < d) {
      const g = n + m * l;
      g >= t && g <= t + o && (d = m, p = g, h = e + r, f = "bottom");
    }
  }
  if (c !== 0) {
    const m = (e - s) / c;
    if (m > 0 && m < d) {
      const g = n + m * l;
      g >= t && g <= t + o && (d = m, p = g, h = e, f = "top");
    }
  }
  return { x: p, y: h, side: f };
}
function Te(t, e, o, r, n) {
  const s = Math.cos(n), i = Math.sin(n), a = t - o, l = e - r;
  return [o + a * s - l * i, r + a * i + l * s];
}
function qn(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return Us(t.x, t.y, t.w, e, n, s, o, r);
  const i = -t.rotation * Math.PI / 180, [a, l] = Te(o, r, n, s, i), c = Us(t.x, t.y, t.w, e, n, s, a, l), [d, p] = Te(c.x, c.y, n, s, -i);
  return { x: d, y: p, side: c.side };
}
function yr(t, e, o, r) {
  return Math.abs(t) / o >= Math.abs(e) / r ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function kc(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, d] = t.rotation ? Te(o, r, n, s, l) : [o, r], p = c - n, h = d - s;
  if (p === 0 && h === 0)
    return { x: n + i, y: s, side: "right" };
  const f = 1 / Math.sqrt((p / i) ** 2 + (h / a) ** 2);
  let m = n + p * f, g = s + h * f;
  const y = yr(p, h, i, a);
  return t.rotation && ([m, g] = Te(m, g, n, s, -l)), { x: m, y: g, side: y };
}
function vc(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, d] = t.rotation ? Te(o, r, n, s, l) : [o, r], p = c - n, h = d - s;
  if (p === 0 && h === 0)
    return { x: n + i, y: s, side: "right" };
  const f = 1 / (Math.abs(p) / i + Math.abs(h) / a);
  let m = n + p * f, g = s + h * f;
  const y = yr(p, h, i, a);
  return t.rotation && ([m, g] = Te(m, g, n, s, -l)), { x: m, y: g, side: y };
}
function Sc(t, e, o, r) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return qn(t, e, o, r);
  const s = t.x + t.w / 2, i = t.y + e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [l, c] = t.rotation ? Te(o, r, s, i, a) : [o, r], d = l - s, p = c - i, h = Math.hypot(d, p);
  if (h === 0)
    return qn(t, e, o, r);
  const f = d / h, m = p / h;
  let g = t.x + n[0][0], y = t.y + n[0][1], x = (g - s) * f + (y - i) * m;
  for (let A = 1; A < n.length; A++) {
    const R = t.x + n[A][0], F = t.y + n[A][1], T = (R - s) * f + (F - i) * m;
    T > x && (x = T, g = R, y = F);
  }
  const b = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let k = g + f * b, S = y + m * b;
  const M = yr(d, p, t.w / 2, e / 2);
  return t.rotation && ([k, S] = Te(k, S, s, i, -a)), { x: k, y: S, side: M };
}
function Zs(t, e, o) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return Gr(t, e, o);
  const n = t.x + t.w / 2, s = t.y + e / 2, i = Ao(o), a = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, l = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (y, x, b, k, S, M) => {
    const A = S - b, R = M - k, F = A * A + R * R;
    if (F === 0) return [b, k];
    const T = Math.max(0, Math.min(1, ((y - b) * A + (x - k) * R) / F));
    return [b + T * A, k + T * R];
  };
  let d = t.x + r[0][0], p = t.y + r[0][1], h = (d - a) ** 2 + (p - l) ** 2;
  if (r.length === 1)
    d = t.x + r[0][0], p = t.y + r[0][1];
  else
    for (let y = 0; y < r.length - 1; y++) {
      const x = t.x + r[y][0], b = t.y + r[y][1], k = t.x + r[y + 1][0], S = t.y + r[y + 1][1], [M, A] = c(a, l, x, b, k, S), R = (M - a) ** 2 + (A - l) ** 2;
      R < h && (h = R, d = M, p = A);
    }
  const f = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let m = d + i.dx * f, g = p + i.dy * f;
  if (t.rotation) {
    const y = t.rotation * Math.PI / 180;
    [m, g] = Te(m, g, n, s, y);
  }
  return { x: m, y: g };
}
function Kn(t, e, o, r) {
  var n;
  if (t.type === "draw")
    return Sc(t, e, o, r);
  if (t.type === "shape") {
    const s = (n = t.data) == null ? void 0 : n.shape;
    if (s === "ellipse") return kc(t, e, o, r);
    if (s === "diamond") return vc(t, e, o, r);
  }
  return qn(t, e, o, r);
}
function Un(t, e, o, r) {
  const n = Kn(t, e, o, r);
  return { x: n.x, y: n.y };
}
function Gr(t, e, o) {
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
  const a = t.rotation * Math.PI / 180, [l, c] = Te(s, i, r, n, a);
  return { x: l, y: c };
}
function Ao(t) {
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
function Qs(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Le(t, e, o = "bezier", r, n, s, i, a, l, c, d, p, h) {
  const f = ho(t, r), m = ho(e, r), g = t.x + t.w / 2, y = t.y + f / 2, x = e.x + e.w / 2, b = e.y + m / 2;
  let k, S, M, A;
  if (l)
    k = l.x, S = l.y, M = n ?? "right";
  else if (d !== void 0) {
    const $ = jr(t, f, d);
    k = $.x, S = $.y, M = $.side;
    const at = Math.hypot(k - g, S - y);
    at > 0 && (A = { dx: (k - g) / at, dy: (S - y) / at });
  } else if (n) {
    const $ = t.type === "draw" ? Zs(t, f, n) : Gr(t, f, n);
    k = $.x, S = $.y, M = n;
  } else {
    const $ = Kn(t, f, x, b);
    if (k = $.x, S = $.y, M = $.side, Qs(t)) {
      const at = Math.hypot(x - g, b - y);
      at > 0 && (A = { dx: (x - g) / at, dy: (b - y) / at });
    }
  }
  let R, F, T, O;
  if (c)
    R = c.x, F = c.y, T = s ?? "left";
  else if (p !== void 0) {
    const $ = jr(e, m, p);
    R = $.x, F = $.y, T = $.side;
    const at = Math.hypot(R - x, F - b);
    at > 0 && (O = { dx: (R - x) / at, dy: (F - b) / at });
  } else if (s) {
    const $ = e.type === "draw" ? Zs(e, m, s) : Gr(e, m, s);
    R = $.x, F = $.y, T = s;
  } else {
    const $ = Kn(e, m, g, y);
    if (R = $.x, F = $.y, T = $.side, Qs(e)) {
      const at = Math.hypot(g - x, y - b);
      at > 0 && (O = { dx: (g - x) / at, dy: (y - b) / at });
    }
  }
  if (h && h > 0) {
    const $ = Math.hypot(k - g, S - y);
    $ > 0 && (k += (k - g) / $ * h, S += (S - y) / $ * h);
    const at = Math.hypot(R - x, F - b);
    at > 0 && (R += (R - x) / at * h, F += (F - b) / at * h);
  }
  switch (o) {
    case "straight":
      return Mc(k, S, R, F, M, T);
    case "bezier":
      return Cc(k, S, R, F, M, T, a, A, O);
    case "smoothstep":
      return Ic(k, S, R, F, M, T, i);
    case "step":
      return zc(k, S, R, F, M, T, i);
  }
}
function Mc(t, e, o, r, n, s) {
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
function Cc(t, e, o, r, n, s, i, a, l) {
  const c = Math.hypot(o - t, r - e), d = Math.min(c * 0.5, Math.max(50, c * 0.25)), p = a ?? Ao(n), h = l ?? Ao(s), f = i ? i[0] * (4 / 3) : 0, m = i ? i[1] * (4 / 3) : 0, g = t + p.dx * d + f, y = e + p.dy * d + m, x = o + h.dx * d + f, b = r + h.dy * d + m, k = 0.125 * t + 0.375 * g + 0.375 * x + 0.125 * o, S = 0.125 * e + 0.375 * y + 0.375 * b + 0.125 * r, M = Math.atan2(r - b, o - x), A = Math.atan2(e - y, t - g), R = {
    x: k,
    y: S,
    axis: "xy",
    min: 0,
    max: 0
  }, F = Math.min(t, o, g, x), T = Math.min(e, r, y, b), O = Math.max(t, o, g, x), $ = Math.max(e, r, y, b);
  return {
    path: `M${t},${e} C${g},${y} ${x},${b} ${o},${r}`,
    labelX: k,
    labelY: S,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: M,
    tailAngle: A,
    sourceSide: n,
    targetSide: s,
    kinkHandle: R,
    bounds: { x: F, y: T, w: O - F, h: $ - T }
  };
}
function Ic(t, e, o, r, n, s, i) {
  const { points: c, kinkHandle: d } = ps(t, e, o, r, n, s, 20, i), p = Tc(c, 8), h = Math.floor(c.length / 2), f = (c[h - 1][0] + c[h][0]) / 2, m = (c[h - 1][1] + c[h][1]) / 2, g = c[c.length - 1], y = c[c.length - 2], x = Math.atan2(g[1] - y[1], g[0] - y[0]), b = c[0], k = c[1], S = Math.atan2(b[1] - k[1], b[0] - k[0]);
  let M = 1 / 0, A = 1 / 0, R = -1 / 0, F = -1 / 0;
  for (const [T, O] of c)
    T < M && (M = T), O < A && (A = O), T > R && (R = T), O > F && (F = O);
  return {
    path: p,
    labelX: f,
    labelY: m,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: x,
    tailAngle: S,
    sourceSide: n,
    targetSide: s,
    kinkHandle: d,
    bounds: { x: M, y: A, w: R - M, h: F - A }
  };
}
function zc(t, e, o, r, n, s, i) {
  const { points: l, kinkHandle: c } = ps(t, e, o, r, n, s, 20, i), d = [`M${l[0][0]},${l[0][1]}`];
  for (let F = 1; F < l.length; F++)
    d.push(`L${l[F][0]},${l[F][1]}`);
  const p = Math.floor(l.length / 2), h = (l[p - 1][0] + l[p][0]) / 2, f = (l[p - 1][1] + l[p][1]) / 2, m = l[l.length - 1], g = l[l.length - 2], y = Math.atan2(m[1] - g[1], m[0] - g[0]), x = l[0], b = l[1], k = Math.atan2(x[1] - b[1], x[0] - b[0]);
  let S = 1 / 0, M = 1 / 0, A = -1 / 0, R = -1 / 0;
  for (const [F, T] of l)
    F < S && (S = F), T < M && (M = T), F > A && (A = F), T > R && (R = T);
  return {
    path: d.join(" "),
    labelX: h,
    labelY: f,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: y,
    tailAngle: k,
    sourceSide: n,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: S, y: M, w: A - S, h: R - M }
  };
}
function ps(t, e, o, r, n, s, i, a) {
  const l = Ao(n), c = Ao(s), d = t + l.dx * i, p = e + l.dy * i, h = o + c.dx * i, f = r + c.dy * i, m = n === "left" || n === "right", g = s === "left" || s === "right", y = [[t, e], [d, p]], x = a ?? 0.5;
  let b;
  if (m && g) {
    const k = d + (h - d) * x;
    y.push([k, p], [k, f]);
    const S = Math.min(d, h), M = Math.max(d, h);
    b = { x: k, y: (p + f) / 2, axis: "x", min: S, max: M };
  } else if (!m && !g) {
    const k = p + (f - p) * x;
    y.push([d, k], [h, k]);
    const S = Math.min(p, f), M = Math.max(p, f);
    b = { x: (d + h) / 2, y: k, axis: "y", min: S, max: M };
  } else m && !g ? y.push([h, p]) : y.push([d, f]);
  return y.push([h, f], [o, r]), { points: y, kinkHandle: b };
}
function Tc(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let n = 1; n < t.length - 1; n++) {
    const s = t[n - 1], i = t[n], a = t[n + 1], l = i[0] - s[0], c = i[1] - s[1], d = a[0] - i[0], p = a[1] - i[1], h = Math.hypot(l, c), f = Math.hypot(d, p);
    if (h === 0 || f === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const m = Math.min(e, h / 2, f / 2), g = i[0] - l / h * m, y = i[1] - c / h * m, x = i[0] + d / f * m, b = i[1] + p / f * m;
    o.push(`L${g},${y}`), o.push(`Q${i[0]},${i[1]} ${x},${b}`);
  }
  const r = t[t.length - 1];
  return o.push(`L${r[0]},${r[1]}`), o.join(" ");
}
function Pc(t, e, o, r, n, s, i, a, l) {
  const c = 1 - l, d = c * c, p = d * c, h = l * l, f = h * l;
  return [
    p * t + 3 * d * l * o + 3 * c * h * n + f * i,
    p * e + 3 * d * l * r + 3 * c * h * s + f * a
  ];
}
function Ac(t, e, o, r, n, s, i, a, l, c, d = 24) {
  let p = 1 / 0, h = o, f = r;
  for (let m = 1; m <= d; m++) {
    const g = m / d, [y, x] = Pc(o, r, n, s, i, a, l, c, g), b = fs(t, e, h, f, y, x);
    b < p && (p = b), h = y, f = x;
  }
  return p;
}
function Ec(t, e, o) {
  let r = 1 / 0;
  for (let n = 1; n < o.length; n++) {
    const s = fs(t, e, o[n - 1][0], o[n - 1][1], o[n][0], o[n][1]);
    s < r && (r = s);
  }
  return r;
}
function sa(t, e, o, r, n, s, i, a) {
  const l = n.data.edgeType || "bezier", c = Le(
    o,
    r,
    l,
    s,
    n.data.sourceHandle,
    n.data.targetHandle,
    n.data.midpointOffset,
    n.data.curveOffset,
    i,
    a,
    n.data.sourceT,
    n.data.targetT,
    n.data.attachmentGap
  ), { x1: d, y1: p, x2: h, y2: f } = c;
  if (l === "straight")
    return fs(t, e, d, p, h, f);
  if (l === "bezier") {
    const y = Math.hypot(h - d, f - p), x = Math.min(y * 0.5, Math.max(50, y * 0.25)), b = Ao(c.sourceSide), k = Ao(c.targetSide), S = n.data.curveOffset ? n.data.curveOffset[0] * (4 / 3) : 0, M = n.data.curveOffset ? n.data.curveOffset[1] * (4 / 3) : 0, A = d + b.dx * x + S, R = p + b.dy * x + M, F = h + k.dx * x + S, T = f + k.dy * x + M;
    return Ac(t, e, d, p, A, R, F, T, h, f);
  }
  const m = 20, { points: g } = ps(d, p, h, f, c.sourceSide, c.targetSide, m, n.data.midpointOffset);
  return Ec(t, e, g);
}
function Js(t, e, o) {
  const r = ho(t, o), n = ho(e, o), s = t.x + t.w / 2, i = t.y + r / 2, a = e.x + e.w / 2, l = e.y + n / 2, c = Un(t, r, a, l), d = Un(e, n, s, i);
  return { x1: c.x, y1: c.y, x2: d.x, y2: d.y };
}
function Sn(t, e, o, r) {
  const n = ho(t, r);
  return Un(t, n, e, o);
}
function fs(t, e, o, r, n, s) {
  const i = n - o, a = s - r, l = i * i + a * a;
  if (l === 0) return Math.hypot(t - o, e - r);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * a) / l)), d = o + c * i, p = r + c * a;
  return Math.hypot(t - d, e - p);
}
function zo(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, a = n, l = r / 2, c = t + n * l, d = e + s * l, p = t - n * l, h = e - s * l, f = r * 0.4;
  return `M${p + i * f},${h + a * f} L${c},${d} L${p - i * f},${h - a * f}`;
}
function Yr(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, a = n, l = r / 2, c = t + n * l, d = e + s * l, p = t - n * l, h = e - s * l, f = r * 0.4;
  return `M${c},${d} L${p + i * f},${h + a * f} L${p - i * f},${h - a * f} Z`;
}
function Zn(t, e) {
  const o = ho(t, e);
  return ["top", "right", "bottom", "left"].map((n) => {
    const s = Gr(t, o, n);
    return { side: n, x: s.x, y: s.y };
  });
}
function Ar(t, e, o, r) {
  const n = Zn(t, r);
  let s = n[0], i = 1 / 0;
  for (const a of n) {
    const l = Math.hypot(a.x - e, a.y - o);
    l < i && (i = l, s = a);
  }
  return s.side;
}
function Rc(t, e, o, r, n, s) {
  const i = pe.isEnabled(), a = i ? performance.now() : 0, l = 16 / r, c = [];
  for (const d of t.values()) {
    if (d.type !== "edge") continue;
    const p = d, h = t.get(p.data.fromId), f = t.get(p.data.toId);
    if (!h || !f) continue;
    const m = s == null ? void 0 : s(p, h, f);
    sa(e, o, h, f, p, n, m == null ? void 0 : m.sourcePortPos, m == null ? void 0 : m.targetPortPos) < l && c.push(d);
  }
  return i && pe.recordEdgeHit(performance.now() - a), c;
}
function Lc(t, e, o, r, n, s) {
  const i = pe.isEnabled(), a = i ? performance.now() : 0, l = 16 / r;
  let c = null, d = l;
  for (const p of t.values()) {
    if (p.type !== "edge") continue;
    const h = p, f = t.get(h.data.fromId), m = t.get(h.data.toId);
    if (!f || !m) continue;
    const g = s == null ? void 0 : s(h, f, m), y = sa(e, o, f, m, h, n, g == null ? void 0 : g.sourcePortPos, g == null ? void 0 : g.targetPortPos);
    y < d && (d = y, c = p);
  }
  return i && pe.recordEdgeHit(performance.now() - a), c;
}
function jr(t, e, o) {
  var c;
  o = (o % 1 + 1) % 1;
  const r = t.x + t.w / 2, n = t.y + e / 2;
  if (t.type === "draw") {
    const d = t.data.points;
    if (d && d.length >= 2) {
      const p = [0];
      for (let f = 1; f < d.length; f++)
        p.push(p[f - 1] + Math.hypot(d[f][0] - d[f - 1][0], d[f][1] - d[f - 1][1]));
      const h = p[p.length - 1];
      if (h > 0) {
        const f = o * h;
        let m = 0;
        for (let F = 1; F < p.length; F++) {
          if (p[F] >= f) {
            m = F - 1;
            break;
          }
          F === p.length - 1 && (m = F - 1);
        }
        const g = p[m + 1] - p[m], y = g > 0 ? (f - p[m]) / g : 0;
        let x = t.x + d[m][0] + (d[m + 1][0] - d[m][0]) * y, b = t.y + d[m][1] + (d[m + 1][1] - d[m][1]) * y;
        const k = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2), S = x - r, M = b - n, A = Math.hypot(S, M);
        A > 0 && (x += S / A * k, b += M / A * k);
        const R = yr(x - r, b - n, t.w / 2, e / 2);
        if (t.rotation) {
          const F = t.rotation * Math.PI / 180, [T, O] = Te(x, b, r, n, F);
          return { x: T, y: O, side: R };
        }
        return { x, y: b, side: R };
      }
    }
  }
  const s = t.type === "shape" ? (c = t.data) == null ? void 0 : c.shape : void 0;
  let i, a, l;
  if (s === "ellipse") {
    const d = o * 2 * Math.PI - Math.PI / 2, p = t.w / 2, h = e / 2;
    i = r + p * Math.cos(d), a = n + h * Math.sin(d), l = yr(i - r, a - n, p, h);
  } else if (s === "diamond") {
    const d = r, p = t.y, h = t.x + t.w, f = n, m = r, g = t.y + e, y = t.x, x = n;
    if (o < 0.25) {
      const b = o / 0.25;
      i = d + (h - d) * b, a = p + (f - p) * b, l = o < 0.125 ? "top" : "right";
    } else if (o < 0.5) {
      const b = (o - 0.25) / 0.25;
      i = h + (m - h) * b, a = f + (g - f) * b, l = o < 0.375 ? "right" : "bottom";
    } else if (o < 0.75) {
      const b = (o - 0.5) / 0.25;
      i = m + (y - m) * b, a = g + (x - g) * b, l = o < 0.625 ? "bottom" : "left";
    } else {
      const b = (o - 0.75) / 0.25;
      i = y + (d - y) * b, a = x + (p - x) * b, l = o < 0.875 ? "left" : "top";
    }
  } else {
    const d = t.w, p = 2 * (d + e);
    let h = o * p;
    const f = d / 2;
    h < f ? (i = r + h, a = t.y, l = "top") : h < f + e ? (h -= f, i = t.x + d, a = t.y + h, l = "right") : h < f + e + d ? (h -= f + e, i = t.x + d - h, a = t.y + e, l = "bottom") : h < f + e + d + e ? (h -= f + e + d, i = t.x, a = t.y + e - h, l = "left") : (h -= f + e + d + e, i = t.x + h, a = t.y, l = "top");
  }
  if (t.rotation) {
    const d = t.rotation * Math.PI / 180, [p, h] = Te(i, a, r, n, d);
    return { x: p, y: h, side: l };
  }
  return { x: i, y: a, side: l };
}
function Dc(t, e, o, r) {
  var x;
  const n = t.x + t.w / 2, s = t.y + e / 2;
  let i = o, a = r;
  if (t.rotation) {
    const b = -t.rotation * Math.PI / 180;
    [i, a] = Te(o, r, n, s, b);
  }
  if (t.type === "draw") {
    const b = t.data.points;
    if (b && b.length >= 2) {
      const k = [0];
      for (let M = 1; M < b.length; M++)
        k.push(k[M - 1] + Math.hypot(b[M][0] - b[M - 1][0], b[M][1] - b[M - 1][1]));
      const S = k[k.length - 1];
      if (S > 0) {
        const M = i - t.x, A = a - t.y;
        let R = 1 / 0, F = 0;
        for (let T = 0; T < b.length - 1; T++) {
          const O = b[T][0], $ = b[T][1], at = b[T + 1][0], ft = b[T + 1][1], G = at - O, st = ft - $, N = G * G + st * st, D = N === 0 ? 0 : Math.max(0, Math.min(1, ((M - O) * G + (A - $) * st) / N)), Z = O + D * G, j = $ + D * st, J = Math.hypot(M - Z, A - j);
          J < R && (R = J, F = k[T] + D * (k[T + 1] - k[T]));
        }
        return F / S;
      }
    }
  }
  const l = t.type === "shape" ? (x = t.data) == null ? void 0 : x.shape : void 0;
  if (l === "ellipse")
    return ((Math.atan2(a - s, i - n) + Math.PI / 2) / (2 * Math.PI) % 1 + 1) % 1;
  if (l === "diamond") {
    const b = n, k = t.y, S = t.x + t.w, M = s, A = n, R = t.y + e, F = t.x, T = s, O = [
      { ax: b, ay: k, bx: S, by: M, tStart: 0 },
      { ax: S, ay: M, bx: A, by: R, tStart: 0.25 },
      { ax: A, ay: R, bx: F, by: T, tStart: 0.5 },
      { ax: F, ay: T, bx: b, by: k, tStart: 0.75 }
    ];
    let $ = 0, at = 1 / 0;
    for (const ft of O) {
      const G = ft.bx - ft.ax, st = ft.by - ft.ay, N = G * G + st * st, D = N === 0 ? 0 : Math.max(0, Math.min(1, ((i - ft.ax) * G + (a - ft.ay) * st) / N)), Z = ft.ax + D * G, j = ft.ay + D * st, J = Math.hypot(i - Z, a - j);
      J < at && (at = J, $ = ft.tStart + D * 0.25);
    }
    return ($ % 1 + 1) % 1;
  }
  const c = t.w, d = t.x, p = t.y, h = 2 * (c + e), f = c / 2, m = [
    // Top edge right half: top-center → top-right
    { ax: n, ay: p, bx: d + c, by: p, dStart: 0, len: f },
    // Right edge: top-right → bottom-right
    { ax: d + c, ay: p, bx: d + c, by: p + e, dStart: f, len: e },
    // Bottom edge: bottom-right → bottom-left
    { ax: d + c, ay: p + e, bx: d, by: p + e, dStart: f + e, len: c },
    // Left edge: bottom-left → top-left
    { ax: d, ay: p + e, bx: d, by: p, dStart: f + e + c, len: e },
    // Top edge left half: top-left → top-center
    { ax: d, ay: p, bx: n, by: p, dStart: f + e + c + e, len: f }
  ];
  let g = 0, y = 1 / 0;
  for (const b of m) {
    const k = b.bx - b.ax, S = b.by - b.ay, M = k * k + S * S, A = M === 0 ? 0 : Math.max(0, Math.min(1, ((i - b.ax) * k + (a - b.ay) * S) / M)), R = b.ax + A * k, F = b.ay + A * S, T = Math.hypot(i - R, a - F);
    T < y && (y = T, g = (b.dStart + A * b.len) / h);
  }
  return (g % 1 + 1) % 1;
}
function Ae(t, e, o, r) {
  const n = ho(t, r), s = Dc(t, n, e, o), i = jr(t, n, s);
  return { t: s, x: i.x, y: i.y };
}
function Wc(t, e, o) {
  const r = t.x, n = t.x + t.w / 2, s = t.x + t.w, i = t.y, a = t.y + t.h / 2, l = t.y + t.h, c = [r, n, s], d = [i, a, l];
  let p = 1 / 0, h = 1 / 0;
  const f = [];
  for (const g of e) {
    const y = g.x, x = g.x + g.w / 2, b = g.x + g.w, k = g.y, S = g.y + g.h / 2, M = g.y + g.h, A = [y, x, b], R = [k, S, M];
    for (const F of c)
      for (const T of A) {
        const O = T - F;
        Math.abs(O) <= o && (Math.abs(O) < Math.abs(p) && (p = O), f.push({
          axis: "x",
          position: T,
          start: Math.min(t.y, t.y + t.h, g.y, g.y + g.h),
          end: Math.max(t.y, t.y + t.h, g.y, g.y + g.h)
        }));
      }
    for (const F of d)
      for (const T of R) {
        const O = T - F;
        Math.abs(O) <= o && (Math.abs(O) < Math.abs(h) && (h = O), f.push({
          axis: "y",
          position: T,
          start: Math.min(t.x, t.x + t.w, g.x, g.x + g.w),
          end: Math.max(t.x, t.x + t.w, g.x, g.x + g.w)
        }));
      }
  }
  const m = /* @__PURE__ */ new Map();
  for (const g of f) {
    const y = `${g.axis}:${g.position.toFixed(1)}`, x = m.get(y);
    x ? (x.start = Math.min(x.start, g.start), x.end = Math.max(x.end, g.end)) : m.set(y, { ...g });
  }
  return {
    guides: Array.from(m.values()),
    snapDx: Math.abs(p) <= o ? p : 0,
    snapDy: Math.abs(h) <= o ? h : 0
  };
}
class Fc {
  constructor() {
    bt(this, "nodes", /* @__PURE__ */ new Map());
    bt(this, "viewport", { x: 0, y: 0, zoom: 1 });
    bt(this, "selection", /* @__PURE__ */ new Set());
    bt(this, "activeGroupId", null);
    bt(this, "groupRotations", /* @__PURE__ */ new Map());
    /** Maps child groupId → parent groupId for nested groups. */
    bt(this, "groupParent", /* @__PURE__ */ new Map());
    /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
    bt(this, "groupChildren", /* @__PURE__ */ new Map());
    bt(this, "mode", "select");
    bt(this, "activeTool", {
      tool: "pen",
      color: "#1e1e2e",
      width: 3,
      shapeType: "rect",
      strokeStyle: "solid",
      roughness: 1,
      opacity: 1
    });
    bt(this, "containerOffset", { x: 0, y: 0 });
    /** DOM element that hosts the canvas — used to derive the correct window in pop-out scenarios. */
    bt(this, "_container", null);
    bt(this, "snapToGrid", !1);
    bt(this, "smartGuides", !0);
    bt(this, "lassoSelect", !1);
    bt(this, "freeFormEdges", !0);
    bt(this, "presentationMode", !1);
    bt(this, "presentationSlides", []);
    bt(this, "presentationIndex", 0);
    bt(this, "_presentationAnimId", null);
    /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
    bt(this, "_transitionOverlay", null);
    bt(this, "gridSize", 20);
    bt(this, "boardBackground", "dot-grid");
    /** Saved "origin" viewport position restored on next load. */
    bt(this, "originView", null);
    /** Current alignment guides (set during drag). */
    bt(this, "alignGuides", []);
    /** Container dimensions for viewport bounds computation. */
    bt(this, "_containerWidth", 2e3);
    bt(this, "_containerHeight", 1500);
    bt(this, "history", new Jl());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bt(this, "listeners", {});
    bt(this, "_suppressEvents", !1);
    bt(this, "_collabMode", !1);
    bt(this, "clipboard", []);
    bt(this, "pasteCount", 0);
    bt(this, "nextZValue", 1);
    bt(this, "_minZ", 0);
    bt(this, "quadTree", new jn({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    bt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    bt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    bt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    bt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    bt(this, "_measuredHeights", {});
    bt(this, "_search", {
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
  toggleFreeFormEdges() {
    this.freeFormEdges = !this.freeFormEdges, this.emit("change");
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
    const o = this.resolveHeight(e), r = 40, n = e.x - r, s = e.y - r, i = e.w + r * 2, a = o + r * 2, l = this._containerWidth, c = this._containerHeight, d = _o(Math.min(l / i, c / a), 0.1, 5);
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
    const h = o instanceof Set ? o : new Set(o);
    if (l) {
      let f = 1 / 0, m = 1 / 0, g = -1 / 0, y = -1 / 0;
      for (const S of e) {
        const M = this.getNode(S.id);
        if (!M) continue;
        const A = S.x + r, R = S.y + n, F = this.resolveHeight(M);
        f = Math.min(f, A), m = Math.min(m, R), g = Math.max(g, A + M.w), y = Math.max(y, R + F);
      }
      const x = { x: f, y: m, w: g - f, h: y - m }, b = (i == null ? void 0 : i.staticNodes) ?? this.createDragSnapContext(h).staticNodes, k = Wc(x, b, 5);
      if (p = k.guides, a) {
        const S = e[0].x + r, M = e[0].y + n, A = this.snap(S, M), R = A.x - S, F = A.y - M, T = k.snapDx !== 0 && Math.abs(k.snapDx) <= Math.abs(R), O = k.snapDy !== 0 && Math.abs(k.snapDy) <= Math.abs(F);
        c = r + (T ? k.snapDx : R), d = n + (O ? k.snapDy : F), T || (p = p.filter(($) => $.axis !== "x")), O || (p = p.filter(($) => $.axis !== "y"));
      } else
        c = r + k.snapDx, d = n + k.snapDy;
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
    this.viewport = ac(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, r) {
    this.viewport = lc(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const r = _o(e, 0.1, 5);
    if (o) {
      const n = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = tr(this.viewport, n, s);
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
    const n = r.h === "auto" ? 100 : r.h, s = r.x + r.w / 2, i = r.y + n / 2, a = this.getWindow(), l = a.innerWidth, c = a.innerHeight, d = _o(o, 0.2, 5);
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
    const i = r - e, a = n - o, l = this._containerWidth, c = this._containerHeight, d = _o(
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
    return tr(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return ic(this.viewport, e, o);
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
      const m = n.x - r.x, g = n.y - r.y;
      (a = (i = (s = this.registry) == null ? void 0 : s.get(n.type)) == null ? void 0 : i.onMove) == null || a.call(i, n, m, g, this), this.emit("node:move", n, m, g);
    }
    if (r.w !== n.w || r.h !== n.h) {
      const m = r.w !== 0 ? n.w / r.w : 1, g = r.h === "auto" ? 0 : r.h, y = n.h === "auto" ? 0 : n.h, x = g !== 0 ? y / g : 1;
      this.emit("node:resize", n, m, x);
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
          const l = Le(
            i,
            a,
            s.data.edgeType,
            void 0,
            s.data.sourceHandle,
            s.data.targetHandle,
            s.data.midpointOffset,
            s.data.curveOffset,
            void 0,
            void 0,
            s.data.sourceT,
            s.data.targetT,
            s.data.attachmentGap
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
    const n = pe.isEnabled(), s = n ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), l = /* @__PURE__ */ new Map();
    for (const d of a) l.set(d.id, d);
    const c = rc(l, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && pe.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, r) {
    const n = pe.isEnabled(), s = n ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), l = /* @__PURE__ */ new Map();
    for (const d of a) l.set(d.id, d);
    const c = sc(l, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && pe.recordHitTest(performance.now() - s), c;
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
    const e = Tt(10), o = /* @__PURE__ */ new Set();
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
      const a = Tt();
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
      s.groupId && (n.has(s.groupId) || n.set(s.groupId, Tt(10)), s.groupId = n.get(s.groupId));
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
      const x = this.getWindow(), b = x.innerWidth / 2, k = x.innerHeight / 2, S = tr(this.viewport, b, k);
      c = S.x, d = S.y;
    }
    const p = this.pasteCount * 20, h = c - a + p, f = d - l + p, m = /* @__PURE__ */ new Map(), g = this.clipboard.map((x) => {
      const b = Tt();
      return m.set(x.id, b), {
        ...structuredClone(x),
        id: b,
        x: x.x + h,
        y: x.y + f,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const x of g)
      if (x.type === "edge" && x.data) {
        const b = x.data;
        m.has(b.fromId) && (b.fromId = m.get(b.fromId)), m.has(b.toId) && (b.toId = m.get(b.toId));
      }
    const y = /* @__PURE__ */ new Map();
    for (const x of g)
      x.groupId && (y.has(x.groupId) || y.set(x.groupId, Tt(10)), x.groupId = y.get(x.groupId));
    for (const [x, b] of this.groupParent)
      y.has(x) && y.has(b) && this.linkGroupParent(y.get(x), y.get(b));
    this.addNodes(g), this.selectMultiple(g.map((x) => x.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, r) {
    const n = Zi.find((f) => f.id === e);
    if (!n) return;
    const s = structuredClone(n.nodes), i = /* @__PURE__ */ new Map();
    for (const f of s) {
      const m = Tt(10);
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
    return hc(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: r } = await mc(e);
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
class Bc {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bt(this, "types", /* @__PURE__ */ new Map());
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
const $s = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Nc = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function tn(t, e) {
  const o = $s.indexOf(t);
  if (o === -1) return "default";
  const r = (e % 360 + 360) % 360, n = Math.round(r / 45) % 8, s = (o + n) % 8;
  return Nc[$s[s]];
}
class Hc extends Rl {
  constructor() {
    super(...arguments);
    bt(this, "state", { hasError: !1 });
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
function _s({ markdown: t }) {
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
const Oc = 0, Xc = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function Gc(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function Yc({
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
  const c = ht(null), d = ht(l === !0), p = ht(!1), h = ht(!1), f = ht(!1), m = ht(!1), g = ht(t.data.blocks), [y, x] = ot(!1), [b, k] = ot(!1), S = ht(null), M = Wl({ schema: n }), A = ht(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  kt(() => {
    const N = A.current;
    if (!N) return;
    A.current = null;
    const D = requestAnimationFrame(() => {
      try {
        M.replaceBlocks(M.document, N);
        return;
      } catch {
      }
      try {
        const Z = M.blocksToHTMLLossy(N);
        M._tiptapEditor.commands.setContent(Z);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), k(!0);
    });
    return () => cancelAnimationFrame(D);
  }, [M]), kt(() => {
    (!e || o) && x(!1);
  }, [e, o]), kt(() => {
    d.current && (d.current = !1, p.current = !0, x(!0));
  }, [M]), kt(() => {
    if (!y || !p.current && !S.current) return;
    const N = S.current;
    S.current = null, p.current = !1;
    const D = requestAnimationFrame(() => {
      if (M.focus(), N)
        try {
          const Z = M._tiptapEditor, J = Z.view.posAtCoords({ left: N.x, top: N.y });
          J && Z.commands.setTextSelection(J.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(D);
  }, [y, M]);
  const R = ct(() => {
    if (h.current || f.current) return;
    const N = r.getNode(t.id), D = M.document;
    g.current = D, r.updateNode(t.id, {
      data: { ...N == null ? void 0 : N.data, blocks: D }
    });
  }, [M, r, t.id]);
  kt(() => {
    if (!M) return;
    const N = () => {
      var rt, Q;
      if (h.current || f.current || m.current) return;
      const j = M.document.length, J = r.getNode(t.id), Y = ((Q = (rt = J == null ? void 0 : J.data) == null ? void 0 : rt.blocks) == null ? void 0 : Q.length) ?? 0;
      if (j < Y) return;
      const tt = setTimeout(R, 100);
      return () => clearTimeout(tt);
    };
    let D;
    const Z = M.onChange(() => {
      D == null || D(), D = N();
    });
    return () => {
      Z == null || Z(), D == null || D();
    };
  }, [M, R]), kt(() => {
    const N = c.current;
    if (!N) return;
    const D = (Z) => {
      const j = Z.relatedTarget;
      j && N.contains(j) || R();
    };
    return N.addEventListener("focusout", D), () => N.removeEventListener("focusout", D);
  }, [R]), kt(() => {
    if (y || t.data.blocks === g.current) return;
    const N = JSON.stringify(t.data.blocks), D = JSON.stringify(g.current);
    if (N !== D) {
      if (t.data.blocks.length > 0 && M.document.length > 0) {
        m.current = !0;
        try {
          M.replaceBlocks(M.document, t.data.blocks);
        } catch {
          try {
            const Z = M.blocksToHTMLLossy(t.data.blocks);
            M._tiptapEditor.commands.setContent(Z);
          } catch {
          }
        }
        m.current = !1;
      }
      g.current = t.data.blocks;
    }
  }, [t.data.blocks, y, M]), kt(() => {
    if (t.h !== "auto" || !a) return;
    const N = c.current;
    if (!N) return;
    const D = () => {
      const j = N.offsetHeight;
      j > 0 && a(t.id, j);
    };
    D();
    const Z = new ResizeObserver(D);
    return Z.observe(N), () => Z.disconnect();
  }, [t.id, t.h, a]);
  const F = ct(() => {
    const N = r.getNode(t.id);
    if (!N || N.h === "auto" || !M || !c.current)
      return;
    const D = N.h - Oc, Z = c.current.querySelector(".bn-editor");
    if (!Z) return;
    const j = M.document;
    if (j.length === 0) return;
    let J = 0;
    for (let Q = j.length - 1; Q >= 1 && Gc(j[Q]); Q--)
      J++;
    const Y = Z.scrollHeight, tt = j.length > 0 ? Y / j.length : 36;
    if (h.current = !0, Y < D) {
      const Q = D - Y, K = Math.max(0, Math.floor(Q / tt));
      if (K > 0) {
        const et = j[j.length - 1];
        M.insertBlocks(
          Array.from({ length: K }, () => ({
            type: "paragraph",
            content: []
          })),
          et,
          "after"
        );
      }
    } else if (Y > D && J > 0) {
      const Q = Y - D, K = Math.min(J, Math.ceil(Q / tt));
      if (K > 0) {
        const et = j.slice(j.length - K);
        M.removeBlocks(et);
      }
    }
    const rt = r.getNode(t.id);
    rt && r.updateNode(t.id, {
      data: { ...rt.data, blocks: M.document }
    }), h.current = !1;
  }, [M, r, t.id]), T = ht(F);
  T.current = F, kt(() => {
    if (t.h === "auto") return;
    const N = setTimeout(() => T.current(), 60);
    return () => clearTimeout(N);
  }, []);
  const O = ct(
    (N) => {
      const D = N.currentTarget.ownerDocument;
      if (N.altKey) return;
      if (!r.selection.has(t.id) && r.selection.size > 0) {
        const { x: xt, y: pt } = r.screenToCanvas(N.clientX, N.clientY);
        for (const Ct of r.selection) {
          const St = r.getNode(Ct);
          if (!St) continue;
          const Rt = St.h === "auto" ? 100 : St.h;
          if (xt >= St.x && xt <= St.x + St.w && pt >= St.y && pt <= St.y + Rt)
            return;
        }
      }
      N.stopPropagation(), N.preventDefault(), N.currentTarget.setPointerCapture(N.pointerId), N.shiftKey ? r.toggleSelect(t.id) : r.selection.has(t.id) || r.select(t.id);
      const Z = N.clientX, j = N.clientY, J = Array.from(r.selection), Y = J.map((xt) => {
        const pt = r.getNode(xt);
        return { id: xt, x: pt.x, y: pt.y };
      });
      let tt = !1, rt = null, Q = Z, K = j, et = !1;
      const gt = () => {
        rt = null;
        const xt = (Q - Z) / r.viewport.zoom, pt = (K - j) / r.viewport.zoom, { finalDx: Ct, finalDy: St } = r.computeDragSnap(
          Y,
          J,
          xt,
          pt,
          et
        ), Rt = Y.map((dt) => ({
          id: dt.id,
          patch: { x: dt.x + Ct, y: dt.y + St }
        }));
        r.updateMany(Rt);
      }, lt = (xt) => {
        const pt = (xt.clientX - Z) / r.viewport.zoom, Ct = (xt.clientY - j) / r.viewport.zoom;
        if (!tt)
          if (Math.abs(pt) > 2 || Math.abs(Ct) > 2)
            tt = !0, f.current = !0, r.pushHistorySnapshot();
          else
            return;
        Q = xt.clientX, K = xt.clientY, et = xt.metaKey || xt.ctrlKey, rt === null && (rt = requestAnimationFrame(gt));
      }, vt = () => {
        f.current = !1, rt !== null && (cancelAnimationFrame(rt), gt()), r.clearAlignGuides(), D.removeEventListener("pointermove", lt), D.removeEventListener("pointerup", vt);
      };
      D.addEventListener("pointermove", lt), D.addEventListener("pointerup", vt);
    },
    [r, t.id]
  ), $ = ct(
    (N) => {
      var gt;
      const D = N.currentTarget.ownerDocument;
      N.stopPropagation(), N.preventDefault();
      const Z = t.h === "auto" ? (((gt = c.current) == null ? void 0 : gt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h, j = t.x + t.w / 2, J = t.y + Z / 2, Y = t.rotation || 0, { x: tt, y: rt } = r.screenToCanvas(
        N.clientX,
        N.clientY
      ), Q = Math.atan2(rt - J, tt - j);
      r.pushHistorySnapshot();
      const K = (lt) => {
        const { x: vt, y: xt } = r.screenToCanvas(lt.clientX, lt.clientY), pt = Math.atan2(xt - J, vt - j);
        let Ct = Y + (pt - Q) * (180 / Math.PI);
        (lt.shiftKey || r.snapToGrid) && !(lt.metaKey || lt.ctrlKey) && (Ct = Math.round(Ct / 15) * 15), r.updateNode(t.id, { rotation: Ct });
      }, et = () => {
        D.removeEventListener("pointermove", K), D.removeEventListener("pointerup", et);
      };
      D.addEventListener("pointermove", K), D.addEventListener("pointerup", et);
    },
    [r, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), at = ct(
    (N, D) => {
      var gt;
      const Z = D.currentTarget.ownerDocument;
      D.stopPropagation(), D.preventDefault();
      const j = D.clientX, J = D.clientY, Y = t.x, tt = t.y, rt = t.w, Q = t.h === "auto" ? (((gt = c.current) == null ? void 0 : gt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h;
      r.pushHistorySnapshot();
      const K = (lt) => {
        const vt = (lt.clientX - j) / r.viewport.zoom, xt = (lt.clientY - J) / r.viewport.zoom;
        let pt = Y, Ct = tt, St = rt, Rt = Q;
        if ((N === "nw" || N === "w" || N === "sw") && (pt = Y + vt, St = rt - vt), (N === "ne" || N === "e" || N === "se") && (St = rt + vt), (N === "nw" || N === "n" || N === "ne") && (Ct = tt + xt, Rt = Q - xt), (N === "sw" || N === "s" || N === "se") && (Rt = Q + xt), r.snapToGrid && !(lt.metaKey || lt.ctrlKey)) {
          const dt = r.gridSize, Ht = (_t) => Math.round(_t / dt) * dt;
          (N === "nw" || N === "w" || N === "sw") && (pt = Ht(pt), St = Y + rt - pt), (N === "ne" || N === "e" || N === "se") && (St = Ht(pt + St) - pt), (N === "nw" || N === "n" || N === "ne") && (Ct = Ht(Ct), Rt = tt + Q - Ct), (N === "sw" || N === "s" || N === "se") && (Rt = Ht(Ct + Rt) - Ct);
        }
        St < 100 && (St = 100, (N === "nw" || N === "w" || N === "sw") && (pt = Y + rt - 100)), Rt < 60 && (Rt = 60, (N === "nw" || N === "n" || N === "ne") && (Ct = tt + Q - 60)), r.updateNode(t.id, { x: pt, y: Ct, w: St, h: Rt });
      }, et = () => {
        Z.removeEventListener("pointermove", K), Z.removeEventListener("pointerup", et), requestAnimationFrame(() => T.current());
      };
      Z.addEventListener("pointermove", K), Z.addEventListener("pointerup", et);
    },
    [r, t.id, t.x, t.y, t.w, t.h]
  ), ft = ct(
    (N) => {
      if (!N.altKey) {
        if (y) {
          N.stopPropagation();
          return;
        }
        if (e) {
          O(N);
          return;
        }
        O(N);
      }
    },
    [y, e, O, r, t.id]
  ), G = ct(
    (N) => {
      if (N.stopPropagation(), !y) {
        if (t.groupId) {
          const D = [];
          let Z = t.groupId;
          for (; Z; )
            D.push(Z), Z = r.groupParent.get(Z);
          if (!r.activeGroupId) {
            r.enterGroup(D[D.length - 1]), r.select(t.id);
            return;
          }
          const j = D.indexOf(r.activeGroupId);
          if (j > 0) {
            r.enterGroup(D[j - 1]), r.select(t.id);
            return;
          }
        }
        r.select(t.id), S.current = { x: N.clientX, y: N.clientY }, x(!0);
      }
    },
    [y, r, t.id, t.groupId, M]
  ), st = e && !o;
  return /* @__PURE__ */ v(
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
            onDoubleClick: G,
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
                onPointerDown: ft,
                onKeyDown: y ? (N) => {
                  N.key === "Escape" && (N.stopPropagation(), x(!1));
                } : void 0,
                style: y ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: b ? /* @__PURE__ */ u(_s, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ u(Hc, { fallback: /* @__PURE__ */ u(_s, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ u(
                  Fl,
                  {
                    editor: M,
                    theme: "light",
                    editable: s && y
                  }
                ) })
              }
            )
          }
        ),
        st && Xc.map(({ pos: N, top: D, left: Z }) => {
          const j = 8 / i;
          return /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: (J) => at(N, J),
              style: {
                position: "absolute",
                top: D,
                left: Z,
                width: j,
                height: j,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: tn(N, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            N
          );
        }),
        st && (() => {
          const N = 25 / i, D = 10 / i;
          return /* @__PURE__ */ v(wt, { children: [
            /* @__PURE__ */ u(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -N,
                  left: "50%",
                  width: 1.5 / i,
                  height: N,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ u(
              "div",
              {
                onPointerDown: $,
                style: {
                  position: "absolute",
                  top: -(N + D / 2),
                  left: "50%",
                  width: D,
                  height: D,
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
const ia = Me(Yc);
function jc(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    ia,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: ds,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const Vc = {
  type: "content",
  component: jc,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: qc } = Math, gr = qc + 1e-4, ti = 0.5, ei = [1, 1];
function oi(t, e, o, r = (n) => n) {
  return t * r(0.5 - e * (0.5 - o));
}
const { min: Mn } = Math;
function aa(t, e, o) {
  let r = Mn(1, e / o);
  return Mn(1, t + (Mn(1, 1 - r) - t) * (r * 0.275));
}
function Kc(t) {
  return [-t[0], -t[1]];
}
function Oe(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function ri(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function ao(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function Qn(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function io(t, e) {
  return [t[0] * e, t[1] * e];
}
function Cn(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function Uc(t, e) {
  return [t[0] / e, t[1] / e];
}
function la(t) {
  return [t[1], -t[0]];
}
function In(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function ni(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function Zc(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Qc(t) {
  return Math.hypot(t[0], t[1]);
}
function si(t, e) {
  let o = t[0] - e[0], r = t[1] - e[1];
  return o * o + r * r;
}
function ca(t) {
  return Uc(t, Qc(t));
}
function Jc(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function ys(t, e, o) {
  let r = Math.sin(o), n = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], a = s * n - i * r, l = s * r + i * n;
  return [a + e[0], l + e[1]];
}
function ii(t, e, o, r) {
  let n = Math.sin(r), s = Math.cos(r), i = e[0] - o[0], a = e[1] - o[1], l = i * s - a * n, c = i * n + a * s;
  return t[0] = l + o[0], t[1] = c + o[1], t;
}
function ai(t, e, o) {
  return Oe(t, io(ao(e, t), o));
}
function $c(t, e, o, r) {
  let n = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + n * r, t[1] = e[1] + s * r, t;
}
function da(t, e, o) {
  return Oe(t, io(e, o));
}
const ue = [0, 0], oo = [0, 0], ro = [0, 0];
function _c(t, e) {
  let o = da(t, ca(la(ao(t, Oe(t, [1, 1])))), -e), r = [], n = 1 / 13;
  for (let s = n; s <= 1; s += n) r.push(ys(o, t, gr * 2 * s));
  return r;
}
function td(t, e, o) {
  let r = [], n = 1 / o;
  for (let s = n; s <= 1; s += n) r.push(ys(e, t, gr * s));
  return r;
}
function ed(t, e, o) {
  let r = ao(e, o), n = io(r, 0.5), s = io(r, 0.51);
  return [ao(t, n), ao(t, s), Oe(t, s), Oe(t, n)];
}
function od(t, e, o, r) {
  let n = [], s = da(t, e, o), i = 1 / r;
  for (let a = i; a < 1; a += i) n.push(ys(s, t, gr * 3 * a));
  return n;
}
function rd(t, e, o) {
  return [Oe(t, io(e, o)), Oe(t, io(e, o * 0.99)), ao(t, io(e, o * 0.99)), ao(t, io(e, o))];
}
function li(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function nd(t, e, o) {
  return t.slice(0, 10).reduce((r, n) => {
    let s = n.pressure;
    return e && (s = aa(r, n.distance, o)), (r + s) / 2;
  }, t[0].pressure);
}
function sd(t, e = {}) {
  let { size: o = 16, smoothing: r = 0.5, thinning: n = 0.5, simulatePressure: s = !0, easing: i = (D) => D, start: a = {}, end: l = {}, last: c = !1 } = e, { cap: d = !0, easing: p = (D) => D * (2 - D) } = a, { cap: h = !0, easing: f = (D) => --D * D * D + 1 } = l;
  if (t.length === 0 || o <= 0) return [];
  let m = t[t.length - 1].runningLength, g = li(a.taper, o, m), y = li(l.taper, o, m), x = (o * r) ** 2, b = [], k = [], S = nd(t, s, o), M = oi(o, n, t[t.length - 1].pressure, i), A, R = t[0].vector, F = t[0].point, T = F, O = F, $ = T, at = !1;
  for (let D = 0; D < t.length; D++) {
    let { pressure: Z } = t[D], { point: j, vector: J, distance: Y, runningLength: tt } = t[D], rt = D === t.length - 1;
    if (!rt && m - tt < 3) continue;
    n ? (s && (Z = aa(S, Y, o)), M = oi(o, n, Z, i)) : M = o / 2, A === void 0 && (A = M);
    let Q = tt < g ? p(tt / g) : 1, K = m - tt < y ? f((m - tt) / y) : 1;
    M = Math.max(0.01, M * Math.min(Q, K));
    let et = (rt ? t[D] : t[D + 1]).vector, gt = rt ? 1 : ni(J, et), lt = ni(J, R) < 0 && !at, vt = gt !== null && gt < 0;
    if (lt || vt) {
      In(ue, R), Cn(ue, ue, M);
      for (let xt = 0; xt <= 1; xt += 0.07692307692307693) Qn(oo, j, ue), ii(oo, oo, j, gr * xt), O = [oo[0], oo[1]], b.push(O), ri(ro, j, ue), ii(ro, ro, j, gr * -xt), $ = [ro[0], ro[1]], k.push($);
      F = O, T = $, vt && (at = !0);
      continue;
    }
    if (at = !1, rt) {
      In(ue, J), Cn(ue, ue, M), b.push(ao(j, ue)), k.push(Oe(j, ue));
      continue;
    }
    $c(ue, et, J, gt), In(ue, ue), Cn(ue, ue, M), Qn(oo, j, ue), O = [oo[0], oo[1]], (D <= 1 || si(F, O) > x) && (b.push(O), F = O), ri(ro, j, ue), $ = [ro[0], ro[1]], (D <= 1 || si(T, $) > x) && (k.push($), T = $), S = Z, R = J;
  }
  let ft = [t[0].point[0], t[0].point[1]], G = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : Oe(t[0].point, [1, 1]), st = [], N = [];
  if (t.length === 1) {
    if (!(g || y) || c) return _c(ft, A || M);
  } else {
    g || y && t.length === 1 || (d ? st.push(...td(ft, k[0], 13)) : st.push(...ed(ft, b[0], k[0])));
    let D = la(Kc(t[t.length - 1].vector));
    y || g && t.length === 1 ? N.push(G) : h ? N.push(...od(G, D, M, 29)) : N.push(...rd(G, D, M));
  }
  return b.concat(N, k.reverse(), st);
}
const ci = [0, 0];
function di(t) {
  return t != null && t >= 0;
}
function id(t, e = {}) {
  var h;
  let { streamline: o = 0.5, size: r = 16, last: n = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: f, y: m, pressure: g = ti }) => [f, m, g]);
  if (i.length === 2) {
    let f = i[1];
    i = i.slice(0, -1);
    for (let m = 1; m < 5; m++) i.push(ai(i[0], f, m / 4));
  }
  i.length === 1 && (i = [...i, [...Oe(i[0], ei), ...i[0].slice(2)]]);
  let a = [{ point: [i[0][0], i[0][1]], pressure: di(i[0][2]) ? i[0][2] : 0.25, vector: [...ei], distance: 0, runningLength: 0 }], l = !1, c = 0, d = a[0], p = i.length - 1;
  for (let f = 1; f < i.length; f++) {
    let m = n && f === p ? [i[f][0], i[f][1]] : ai(d.point, i[f], s);
    if (Zc(d.point, m)) continue;
    let g = Jc(m, d.point);
    if (c += g, f < p && !l) {
      if (c < r) continue;
      l = !0;
    }
    Qn(ci, d.point, m), d = { point: m, pressure: di(i[f][2]) ? i[f][2] : ti, vector: ca(ci), distance: g, runningLength: c }, a.push(d);
  }
  return a[0].vector = ((h = a[1]) == null ? void 0 : h.vector) || [0, 0], a;
}
function ad(t, e = {}) {
  return sd(id(t, e), e);
}
var ld = ad;
function gs(t, e = {}) {
  const o = ld(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return cd(o);
}
function cd(t) {
  if (!t.length) return "";
  const e = [], [o, r] = t[0];
  e.push("M", o, r);
  for (let n = 0; n < t.length; n++) {
    const [s, i] = t[n], [a, l] = t[(n + 1) % t.length];
    e.push("Q", s, i, (s + a) / 2, (i + l) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function ha(t, e = 0.5) {
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
function dd(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = ha(t, e), r = o.length, n = [];
  n.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < r; s++) {
    const [i, a] = o[s], [l, c] = o[(s + 1) % r];
    n.push("Q", i, a, (i + l) / 2, (a + c) / 2);
  }
  return n.push("Z"), n.join(" ");
}
function hd(t, e, o, r) {
  const n = e[0] - t[0], s = e[1] - t[1], i = r[0] - o[0], a = r[1] - o[1], l = n * a - s * i;
  if (Math.abs(l) < 1e-10) return null;
  const c = ((o[0] - t[0]) * a - (o[1] - t[1]) * i) / l, d = ((o[0] - t[0]) * s - (o[1] - t[1]) * n) / l;
  return c <= 0 || c >= 1 || d <= 0 || d >= 1 ? null : [t[0] + c * n, t[1] + c * s];
}
function ud(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function hi(t) {
  let e = 0;
  for (let o = 0, r = t.length - 1; o < t.length; r = o++)
    e += (t[r][0] + t[o][0]) * (t[r][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function pd(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let a = i + 2; a < e - 1; a++) {
      const l = hd(
        t[i],
        t[i + 1],
        t[a],
        t[a + 1]
      );
      if (!l) continue;
      const c = [l];
      for (let d = i + 1; d <= a; d++)
        c.push(t[d]);
      hi(c) < 100 || o.push({
        pathD: ud(c),
        points: c.map((d) => [d[0], d[1]])
      });
    }
  if (o.length === 0) return [];
  const r = o.map((i) => hi(i.points)), s = Math.max(...r) * 0.05;
  return o.filter((i, a) => r[a] >= s);
}
function zn(t, e, o) {
  if (t && t.length) {
    const [r, n] = e, s = Math.PI / 180 * o, i = Math.cos(s), a = Math.sin(s);
    for (const l of t) {
      const [c, d] = l;
      l[0] = (c - r) * i - (d - n) * a + r, l[1] = (c - r) * a + (d - n) * i + n;
    }
  }
}
function fd(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function yd(t, e, o, r = 1) {
  const n = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, a = [0, 0];
  if (n) for (const c of i) zn(c, a, n);
  const l = function(c, d, p) {
    const h = [];
    for (const b of c) {
      const k = [...b];
      fd(k[0], k[k.length - 1]) || k.push([k[0][0], k[0][1]]), k.length > 2 && h.push(k);
    }
    const f = [];
    d = Math.max(d, 0.1);
    const m = [];
    for (const b of h) for (let k = 0; k < b.length - 1; k++) {
      const S = b[k], M = b[k + 1];
      if (S[1] !== M[1]) {
        const A = Math.min(S[1], M[1]);
        m.push({ ymin: A, ymax: Math.max(S[1], M[1]), x: A === S[1] ? S[0] : M[0], islope: (M[0] - S[0]) / (M[1] - S[1]) });
      }
    }
    if (m.sort((b, k) => b.ymin < k.ymin ? -1 : b.ymin > k.ymin ? 1 : b.x < k.x ? -1 : b.x > k.x ? 1 : b.ymax === k.ymax ? 0 : (b.ymax - k.ymax) / Math.abs(b.ymax - k.ymax)), !m.length) return f;
    let g = [], y = m[0].ymin, x = 0;
    for (; g.length || m.length; ) {
      if (m.length) {
        let b = -1;
        for (let k = 0; k < m.length && !(m[k].ymin > y); k++) b = k;
        m.splice(0, b + 1).forEach((k) => {
          g.push({ s: y, edge: k });
        });
      }
      if (g = g.filter((b) => !(b.edge.ymax <= y)), g.sort((b, k) => b.edge.x === k.edge.x ? 0 : (b.edge.x - k.edge.x) / Math.abs(b.edge.x - k.edge.x)), (p !== 1 || x % d == 0) && g.length > 1) for (let b = 0; b < g.length; b += 2) {
        const k = b + 1;
        if (k >= g.length) break;
        const S = g[b].edge, M = g[k].edge;
        f.push([[Math.round(S.x), y], [Math.round(M.x), y]]);
      }
      y += p, g.forEach((b) => {
        b.edge.x = b.edge.x + p * b.edge.islope;
      }), x++;
    }
    return f;
  }(i, s, r);
  if (n) {
    for (const c of i) zn(c, a, -n);
    (function(c, d, p) {
      const h = [];
      c.forEach((f) => h.push(...f)), zn(h, d, p);
    })(l, a, -n);
  }
  return l;
}
function wr(t, e) {
  var o;
  const r = e.hachureAngle + 90;
  let n = e.hachureGap;
  n < 0 && (n = 4 * e.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = n), yd(t, n, r, s || 1);
}
class ms {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const r = wr(e, o);
    return { type: "fillSketch", ops: this.renderLines(r, o) };
  }
  renderLines(e, o) {
    const r = [];
    for (const n of e) r.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], o));
    return r;
  }
}
function en(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class gd extends ms {
  fillPolygons(e, o) {
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    const n = wr(e, Object.assign({}, o, { hachureGap: r })), s = Math.PI / 180 * o.hachureAngle, i = [], a = 0.5 * r * Math.cos(s), l = 0.5 * r * Math.sin(s);
    for (const [c, d] of n) en([c, d]) && i.push([[c[0] - a, c[1] + l], [...d]], [[c[0] + a, c[1] - l], [...d]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class md extends ms {
  fillPolygons(e, o) {
    const r = this._fillPolygons(e, o), n = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, n);
    return r.ops = r.ops.concat(s.ops), r;
  }
}
class bd {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = wr(e, o = Object.assign({}, o, { hachureAngle: 0 }));
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
      const l = en(a), c = l / n, d = Math.ceil(c) - 1, p = l - d * n, h = (a[0][0] + a[1][0]) / 2 - n / 4, f = Math.min(a[0][1], a[1][1]);
      for (let m = 0; m < d; m++) {
        const g = f + p + m * n, y = h - i + 2 * Math.random() * i, x = g - i + 2 * Math.random() * i, b = this.helper.ellipse(y, x, s, s, o);
        r.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: r };
  }
}
class xd {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = wr(e, o);
    return { type: "fillSketch", ops: this.dashedLine(r, o) };
  }
  dashedLine(e, o) {
    const r = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, n = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const a = en(i), l = Math.floor(a / (r + n)), c = (a + n - l * (r + n)) / 2;
      let d = i[0], p = i[1];
      d[0] > p[0] && (d = i[1], p = i[0]);
      const h = Math.atan((p[1] - d[1]) / (p[0] - d[0]));
      for (let f = 0; f < l; f++) {
        const m = f * (r + n), g = m + r, y = [d[0] + m * Math.cos(h) + c * Math.cos(h), d[1] + m * Math.sin(h) + c * Math.sin(h)], x = [d[0] + g * Math.cos(h) + c * Math.cos(h), d[1] + g * Math.sin(h) + c * Math.sin(h)];
        s.push(...this.helper.doubleLineOps(y[0], y[1], x[0], x[1], o));
      }
    }), s;
  }
}
class wd {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, n = o.zigzagOffset < 0 ? r : o.zigzagOffset, s = wr(e, o = Object.assign({}, o, { hachureGap: r + n }));
    return { type: "fillSketch", ops: this.zigzagLines(s, n, o) };
  }
  zigzagLines(e, o, r) {
    const n = [];
    return e.forEach((s) => {
      const i = en(s), a = Math.round(i / (2 * o));
      let l = s[0], c = s[1];
      l[0] > c[0] && (l = s[1], c = s[0]);
      const d = Math.atan((c[1] - l[1]) / (c[0] - l[0]));
      for (let p = 0; p < a; p++) {
        const h = 2 * p * o, f = 2 * (p + 1) * o, m = Math.sqrt(2 * Math.pow(o, 2)), g = [l[0] + h * Math.cos(d), l[1] + h * Math.sin(d)], y = [l[0] + f * Math.cos(d), l[1] + f * Math.sin(d)], x = [g[0] + m * Math.cos(d + Math.PI / 4), g[1] + m * Math.sin(d + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(g[0], g[1], x[0], x[1], r), ...this.helper.doubleLineOps(x[0], x[1], y[0], y[1], r));
      }
    }), n;
  }
}
const ke = {};
class kd {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const vd = 0, Tn = 1, ui = 2, Er = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function Pn(t, e) {
  return t.type === e;
}
function bs(t) {
  const e = [], o = function(i) {
    const a = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) a[a.length] = { type: vd, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      a[a.length] = { type: Tn, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return a[a.length] = { type: ui, text: "" }, a;
  }(t);
  let r = "BOD", n = 0, s = o[n];
  for (; !Pn(s, ui); ) {
    let i = 0;
    const a = [];
    if (r === "BOD") {
      if (s.text !== "M" && s.text !== "m") return bs("M0,0" + t);
      n++, i = Er[s.text], r = s.text;
    } else Pn(s, Tn) ? i = Er[r] : (n++, i = Er[s.text], r = s.text);
    if (!(n + i < o.length)) throw new Error("Path data ended short");
    for (let l = n; l < n + i; l++) {
      const c = o[l];
      if (!Pn(c, Tn)) throw new Error("Param not a number: " + r + "," + c.text);
      a[a.length] = +c.text;
    }
    if (typeof Er[r] != "number") throw new Error("Bad segment: " + r);
    {
      const l = { key: r, data: a };
      e.push(l), n += i, s = o[n], r === "M" && (r = "L"), r === "m" && (r = "l");
    }
  }
  return e;
}
function ua(t) {
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
function pa(t) {
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
        const g = r + 2 * (f - r) / 3, y = n + 2 * (m - n) / 3, x = p + 2 * (f - p) / 3, b = h + 2 * (m - h) / 3;
        e.push({ key: "C", data: [g, y, x, b, p, h] }), a = f, l = m, r = p, n = h;
        break;
      }
      case "Q": {
        const [p, h, f, m] = d, g = r + 2 * (p - r) / 3, y = n + 2 * (h - n) / 3, x = f + 2 * (p - f) / 3, b = m + 2 * (h - m) / 3;
        e.push({ key: "C", data: [g, y, x, b, f, m] }), a = p, l = h, r = f, n = m;
        break;
      }
      case "A": {
        const p = Math.abs(d[0]), h = Math.abs(d[1]), f = d[2], m = d[3], g = d[4], y = d[5], x = d[6];
        p === 0 || h === 0 ? (e.push({ key: "C", data: [r, n, y, x, y, x] }), r = y, n = x) : (r !== y || n !== x) && (fa(r, n, y, x, p, h, f, m, g).forEach(function(b) {
          e.push({ key: "C", data: b });
        }), r = y, n = x);
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
function fa(t, e, o, r, n, s, i, a, l, c) {
  const d = (p = i, Math.PI * p / 180);
  var p;
  let h = [], f = 0, m = 0, g = 0, y = 0;
  if (c) [f, m, g, y] = c;
  else {
    [t, e] = cr(t, e, -d), [o, r] = cr(o, r, -d);
    const ft = (t - o) / 2, G = (e - r) / 2;
    let st = ft * ft / (n * n) + G * G / (s * s);
    st > 1 && (st = Math.sqrt(st), n *= st, s *= st);
    const N = n * n, D = s * s, Z = N * D - N * G * G - D * ft * ft, j = N * G * G + D * ft * ft, J = (a === l ? -1 : 1) * Math.sqrt(Math.abs(Z / j));
    g = J * n * G / s + (t + o) / 2, y = J * -s * ft / n + (e + r) / 2, f = Math.asin(parseFloat(((e - y) / s).toFixed(9))), m = Math.asin(parseFloat(((r - y) / s).toFixed(9))), t < g && (f = Math.PI - f), o < g && (m = Math.PI - m), f < 0 && (f = 2 * Math.PI + f), m < 0 && (m = 2 * Math.PI + m), l && f > m && (f -= 2 * Math.PI), !l && m > f && (m -= 2 * Math.PI);
  }
  let x = m - f;
  if (Math.abs(x) > 120 * Math.PI / 180) {
    const ft = m, G = o, st = r;
    m = l && m > f ? f + 120 * Math.PI / 180 * 1 : f + 120 * Math.PI / 180 * -1, h = fa(o = g + n * Math.cos(m), r = y + s * Math.sin(m), G, st, n, s, i, 0, l, [m, ft, g, y]);
  }
  x = m - f;
  const b = Math.cos(f), k = Math.sin(f), S = Math.cos(m), M = Math.sin(m), A = Math.tan(x / 4), R = 4 / 3 * n * A, F = 4 / 3 * s * A, T = [t, e], O = [t + R * k, e - F * b], $ = [o + R * M, r - F * S], at = [o, r];
  if (O[0] = 2 * T[0] - O[0], O[1] = 2 * T[1] - O[1], c) return [O, $, at].concat(h);
  {
    h = [O, $, at].concat(h);
    const ft = [];
    for (let G = 0; G < h.length; G += 3) {
      const st = cr(h[G][0], h[G][1], d), N = cr(h[G + 1][0], h[G + 1][1], d), D = cr(h[G + 2][0], h[G + 2][1], d);
      ft.push([st[0], st[1], N[0], N[1], D[0], D[1]]);
    }
    return ft;
  }
}
const Sd = { randOffset: function(t, e) {
  return Bt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return Vr(t, e, o);
}, ellipse: function(t, e, o, r, n) {
  const s = ga(o, r, n);
  return Jn(t, e, n, s).opset;
}, doubleLineOps: function(t, e, o, r, n) {
  return uo(t, e, o, r, n, !0);
} };
function ya(t, e, o, r, n) {
  return { type: "path", ops: uo(t, e, o, r, n) };
}
function Hr(t, e, o) {
  const r = (t || []).length;
  if (r > 2) {
    const n = [];
    for (let s = 0; s < r - 1; s++) n.push(...uo(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && n.push(...uo(t[r - 1][0], t[r - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: n };
  }
  return r === 2 ? ya(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function Md(t, e, o, r, n) {
  return function(s, i) {
    return Hr(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + r], [t, e + r]], n);
}
function pi(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, r = Rr(o[0], 1 * (1 + 0.2 * e.roughness), e), n = e.disableMultiStroke ? [] : Rr(o[0], 1.5 * (1 + 0.22 * e.roughness), gi(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const a = Rr(i, 1 * (1 + 0.2 * e.roughness), e), l = e.disableMultiStroke ? [] : Rr(i, 1.5 * (1 + 0.22 * e.roughness), gi(e));
        for (const c of a) c.op !== "move" && r.push(c);
        for (const c of l) c.op !== "move" && n.push(c);
      }
    }
    return { type: "path", ops: r.concat(n) };
  }
  return { type: "path", ops: [] };
}
function ga(t, e, o) {
  const r = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), n = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * r)), s = 2 * Math.PI / n;
  let i = Math.abs(t / 2), a = Math.abs(e / 2);
  const l = 1 - o.curveFitting;
  return i += Bt(i * l, o), a += Bt(a * l, o), { increment: s, rx: i, ry: a };
}
function Jn(t, e, o, r) {
  const [n, s] = mi(r.increment, t, e, r.rx, r.ry, 1, r.increment * Vr(0.1, Vr(0.4, 1, o), o), o);
  let i = qr(n, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [a] = mi(r.increment, t, e, r.rx, r.ry, 1.5, 0, o), l = qr(a, null, o);
    i = i.concat(l);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function fi(t, e, o, r, n, s, i, a, l) {
  const c = t, d = e;
  let p = Math.abs(o / 2), h = Math.abs(r / 2);
  p += Bt(0.01 * p, l), h += Bt(0.01 * h, l);
  let f = n, m = s;
  for (; f < 0; ) f += 2 * Math.PI, m += 2 * Math.PI;
  m - f > 2 * Math.PI && (f = 0, m = 2 * Math.PI);
  const g = 2 * Math.PI / l.curveStepCount, y = Math.min(g / 2, (m - f) / 2), x = bi(y, c, d, p, h, f, m, 1, l);
  if (!l.disableMultiStroke) {
    const b = bi(y, c, d, p, h, f, m, 1.5, l);
    x.push(...b);
  }
  return i && (a ? x.push(...uo(c, d, c + p * Math.cos(f), d + h * Math.sin(f), l), ...uo(c, d, c + p * Math.cos(m), d + h * Math.sin(m), l)) : x.push({ op: "lineTo", data: [c, d] }, { op: "lineTo", data: [c + p * Math.cos(f), d + h * Math.sin(f)] })), { type: "path", ops: x };
}
function yi(t, e) {
  const o = pa(ua(bs(t))), r = [];
  let n = [0, 0], s = [0, 0];
  for (const { key: i, data: a } of o) switch (i) {
    case "M":
      s = [a[0], a[1]], n = [a[0], a[1]];
      break;
    case "L":
      r.push(...uo(s[0], s[1], a[0], a[1], e)), s = [a[0], a[1]];
      break;
    case "C": {
      const [l, c, d, p, h, f] = a;
      r.push(...Cd(l, c, d, p, h, f, s, e)), s = [h, f];
      break;
    }
    case "Z":
      r.push(...uo(s[0], s[1], n[0], n[1], e)), s = [n[0], n[1]];
  }
  return { type: "path", ops: r };
}
function An(t, e) {
  const o = [];
  for (const r of t) if (r.length) {
    const n = e.maxRandomnessOffset || 0, s = r.length;
    if (s > 2) {
      o.push({ op: "move", data: [r[0][0] + Bt(n, e), r[0][1] + Bt(n, e)] });
      for (let i = 1; i < s; i++) o.push({ op: "lineTo", data: [r[i][0] + Bt(n, e), r[i][1] + Bt(n, e)] });
    }
  }
  return { type: "fillPath", ops: o };
}
function jo(t, e) {
  return function(o, r) {
    let n = o.fillStyle || "hachure";
    if (!ke[n]) switch (n) {
      case "zigzag":
        ke[n] || (ke[n] = new gd(r));
        break;
      case "cross-hatch":
        ke[n] || (ke[n] = new md(r));
        break;
      case "dots":
        ke[n] || (ke[n] = new bd(r));
        break;
      case "dashed":
        ke[n] || (ke[n] = new xd(r));
        break;
      case "zigzag-line":
        ke[n] || (ke[n] = new wd(r));
        break;
      default:
        n = "hachure", ke[n] || (ke[n] = new ms(r));
    }
    return ke[n];
  }(e, Sd).fillPolygons(t, e);
}
function gi(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function ma(t) {
  return t.randomizer || (t.randomizer = new kd(t.seed || 0)), t.randomizer.next();
}
function Vr(t, e, o, r = 1) {
  return o.roughness * r * (ma(o) * (e - t) + t);
}
function Bt(t, e, o = 1) {
  return Vr(-t, t, e, o);
}
function uo(t, e, o, r, n, s = !1) {
  const i = s ? n.disableMultiStrokeFill : n.disableMultiStroke, a = $n(t, e, o, r, n, !0, !1);
  if (i) return a;
  const l = $n(t, e, o, r, n, !0, !0);
  return a.concat(l);
}
function $n(t, e, o, r, n, s, i) {
  const a = Math.pow(t - o, 2) + Math.pow(e - r, 2), l = Math.sqrt(a);
  let c = 1;
  c = l < 200 ? 1 : l > 500 ? 0.4 : -16668e-7 * l + 1.233334;
  let d = n.maxRandomnessOffset || 0;
  d * d * 100 > a && (d = l / 10);
  const p = d / 2, h = 0.2 + 0.2 * ma(n);
  let f = n.bowing * n.maxRandomnessOffset * (r - e) / 200, m = n.bowing * n.maxRandomnessOffset * (t - o) / 200;
  f = Bt(f, n, c), m = Bt(m, n, c);
  const g = [], y = () => Bt(p, n, c), x = () => Bt(d, n, c), b = n.preserveVertices;
  return i ? g.push({ op: "move", data: [t + (b ? 0 : y()), e + (b ? 0 : y())] }) : g.push({ op: "move", data: [t + (b ? 0 : Bt(d, n, c)), e + (b ? 0 : Bt(d, n, c))] }), i ? g.push({ op: "bcurveTo", data: [f + t + (o - t) * h + y(), m + e + (r - e) * h + y(), f + t + 2 * (o - t) * h + y(), m + e + 2 * (r - e) * h + y(), o + (b ? 0 : y()), r + (b ? 0 : y())] }) : g.push({ op: "bcurveTo", data: [f + t + (o - t) * h + x(), m + e + (r - e) * h + x(), f + t + 2 * (o - t) * h + x(), m + e + 2 * (r - e) * h + x(), o + (b ? 0 : x()), r + (b ? 0 : x())] }), g;
}
function Rr(t, e, o) {
  if (!t.length) return [];
  const r = [];
  r.push([t[0][0] + Bt(e, o), t[0][1] + Bt(e, o)]), r.push([t[0][0] + Bt(e, o), t[0][1] + Bt(e, o)]);
  for (let n = 1; n < t.length; n++) r.push([t[n][0] + Bt(e, o), t[n][1] + Bt(e, o)]), n === t.length - 1 && r.push([t[n][0] + Bt(e, o), t[n][1] + Bt(e, o)]);
  return qr(r, null, o);
}
function qr(t, e, o) {
  const r = t.length, n = [];
  if (r > 3) {
    const s = [], i = 1 - o.curveTightness;
    n.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let a = 1; a + 2 < r; a++) {
      const l = t[a];
      s[0] = [l[0], l[1]], s[1] = [l[0] + (i * t[a + 1][0] - i * t[a - 1][0]) / 6, l[1] + (i * t[a + 1][1] - i * t[a - 1][1]) / 6], s[2] = [t[a + 1][0] + (i * t[a][0] - i * t[a + 2][0]) / 6, t[a + 1][1] + (i * t[a][1] - i * t[a + 2][1]) / 6], s[3] = [t[a + 1][0], t[a + 1][1]], n.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else r === 3 ? (n.push({ op: "move", data: [t[1][0], t[1][1]] }), n.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : r === 2 && n.push(...$n(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return n;
}
function mi(t, e, o, r, n, s, i, a) {
  const l = [], c = [];
  if (a.roughness === 0) {
    t /= 4, c.push([e + r * Math.cos(-t), o + n * Math.sin(-t)]);
    for (let d = 0; d <= 2 * Math.PI; d += t) {
      const p = [e + r * Math.cos(d), o + n * Math.sin(d)];
      l.push(p), c.push(p);
    }
    c.push([e + r * Math.cos(0), o + n * Math.sin(0)]), c.push([e + r * Math.cos(t), o + n * Math.sin(t)]);
  } else {
    const d = Bt(0.5, a) - Math.PI / 2;
    c.push([Bt(s, a) + e + 0.9 * r * Math.cos(d - t), Bt(s, a) + o + 0.9 * n * Math.sin(d - t)]);
    const p = 2 * Math.PI + d - 0.01;
    for (let h = d; h < p; h += t) {
      const f = [Bt(s, a) + e + r * Math.cos(h), Bt(s, a) + o + n * Math.sin(h)];
      l.push(f), c.push(f);
    }
    c.push([Bt(s, a) + e + r * Math.cos(d + 2 * Math.PI + 0.5 * i), Bt(s, a) + o + n * Math.sin(d + 2 * Math.PI + 0.5 * i)]), c.push([Bt(s, a) + e + 0.98 * r * Math.cos(d + i), Bt(s, a) + o + 0.98 * n * Math.sin(d + i)]), c.push([Bt(s, a) + e + 0.9 * r * Math.cos(d + 0.5 * i), Bt(s, a) + o + 0.9 * n * Math.sin(d + 0.5 * i)]);
  }
  return [c, l];
}
function bi(t, e, o, r, n, s, i, a, l) {
  const c = s + Bt(0.1, l), d = [];
  d.push([Bt(a, l) + e + 0.9 * r * Math.cos(c - t), Bt(a, l) + o + 0.9 * n * Math.sin(c - t)]);
  for (let p = c; p <= i; p += t) d.push([Bt(a, l) + e + r * Math.cos(p), Bt(a, l) + o + n * Math.sin(p)]);
  return d.push([e + r * Math.cos(i), o + n * Math.sin(i)]), d.push([e + r * Math.cos(i), o + n * Math.sin(i)]), qr(d, null, l);
}
function Cd(t, e, o, r, n, s, i, a) {
  const l = [], c = [a.maxRandomnessOffset || 1, (a.maxRandomnessOffset || 1) + 0.3];
  let d = [0, 0];
  const p = a.disableMultiStroke ? 1 : 2, h = a.preserveVertices;
  for (let f = 0; f < p; f++) f === 0 ? l.push({ op: "move", data: [i[0], i[1]] }) : l.push({ op: "move", data: [i[0] + (h ? 0 : Bt(c[0], a)), i[1] + (h ? 0 : Bt(c[0], a))] }), d = h ? [n, s] : [n + Bt(c[f], a), s + Bt(c[f], a)], l.push({ op: "bcurveTo", data: [t + Bt(c[f], a), e + Bt(c[f], a), o + Bt(c[f], a), r + Bt(c[f], a), d[0], d[1]] });
  return l;
}
function dr(t) {
  return [...t];
}
function xi(t, e = 0) {
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
function Or(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function Id(t, e, o) {
  const r = Or(e, o);
  if (r === 0) return Or(t, e);
  let n = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / r;
  return n = Math.max(0, Math.min(1, n)), Or(t, Co(e, o, n));
}
function Co(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function _n(t, e, o, r) {
  const n = r || [];
  if (function(a, l) {
    const c = a[l + 0], d = a[l + 1], p = a[l + 2], h = a[l + 3];
    let f = 3 * d[0] - 2 * c[0] - h[0];
    f *= f;
    let m = 3 * d[1] - 2 * c[1] - h[1];
    m *= m;
    let g = 3 * p[0] - 2 * h[0] - c[0];
    g *= g;
    let y = 3 * p[1] - 2 * h[1] - c[1];
    return y *= y, f < g && (f = g), m < y && (m = y), f + m;
  }(t, e) < o) {
    const a = t[e + 0];
    n.length ? (s = n[n.length - 1], i = a, Math.sqrt(Or(s, i)) > 1 && n.push(a)) : n.push(a), n.push(t[e + 3]);
  } else {
    const l = t[e + 0], c = t[e + 1], d = t[e + 2], p = t[e + 3], h = Co(l, c, 0.5), f = Co(c, d, 0.5), m = Co(d, p, 0.5), g = Co(h, f, 0.5), y = Co(f, m, 0.5), x = Co(g, y, 0.5);
    _n([l, h, g, x], 0, o, n), _n([x, y, m, p], 0, o, n);
  }
  var s, i;
  return n;
}
function zd(t, e) {
  return Kr(t, 0, t.length, e);
}
function Kr(t, e, o, r, n) {
  const s = n || [], i = t[e], a = t[o - 1];
  let l = 0, c = 1;
  for (let d = e + 1; d < o - 1; ++d) {
    const p = Id(t[d], i, a);
    p > l && (l = p, c = d);
  }
  return Math.sqrt(l) > r ? (Kr(t, e, c + 1, r, s), Kr(t, c, o, r, s)) : (s.length || s.push(i), s.push(a)), s;
}
function En(t, e = 0.15, o) {
  const r = [], n = (t.length - 1) / 3;
  for (let s = 0; s < n; s++)
    _n(t, 3 * s, e, r);
  return o && o > 0 ? Kr(r, 0, r.length, o) : r;
}
const ze = "none";
class Ur {
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
    return this._d("line", [ya(e, o, r, n, i)], i);
  }
  rectangle(e, o, r, n, s) {
    const i = this._o(s), a = [], l = Md(e, o, r, n, i);
    if (i.fill) {
      const c = [[e, o], [e + r, o], [e + r, o + n], [e, o + n]];
      i.fillStyle === "solid" ? a.push(An([c], i)) : a.push(jo([c], i));
    }
    return i.stroke !== ze && a.push(l), this._d("rectangle", a, i);
  }
  ellipse(e, o, r, n, s) {
    const i = this._o(s), a = [], l = ga(r, n, i), c = Jn(e, o, i, l);
    if (i.fill) if (i.fillStyle === "solid") {
      const d = Jn(e, o, i, l).opset;
      d.type = "fillPath", a.push(d);
    } else a.push(jo([c.estimatedPoints], i));
    return i.stroke !== ze && a.push(c.opset), this._d("ellipse", a, i);
  }
  circle(e, o, r, n) {
    const s = this.ellipse(e, o, r, r, n);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const r = this._o(o);
    return this._d("linearPath", [Hr(e, !1, r)], r);
  }
  arc(e, o, r, n, s, i, a = !1, l) {
    const c = this._o(l), d = [], p = fi(e, o, r, n, s, i, a, !0, c);
    if (a && c.fill) if (c.fillStyle === "solid") {
      const h = Object.assign({}, c);
      h.disableMultiStroke = !0;
      const f = fi(e, o, r, n, s, i, !0, !1, h);
      f.type = "fillPath", d.push(f);
    } else d.push(function(h, f, m, g, y, x, b) {
      const k = h, S = f;
      let M = Math.abs(m / 2), A = Math.abs(g / 2);
      M += Bt(0.01 * M, b), A += Bt(0.01 * A, b);
      let R = y, F = x;
      for (; R < 0; ) R += 2 * Math.PI, F += 2 * Math.PI;
      F - R > 2 * Math.PI && (R = 0, F = 2 * Math.PI);
      const T = (F - R) / b.curveStepCount, O = [];
      for (let $ = R; $ <= F; $ += T) O.push([k + M * Math.cos($), S + A * Math.sin($)]);
      return O.push([k + M * Math.cos(F), S + A * Math.sin(F)]), O.push([k, S]), jo([O], b);
    }(e, o, r, n, s, i, c));
    return c.stroke !== ze && d.push(p), this._d("arc", d, c);
  }
  curve(e, o) {
    const r = this._o(o), n = [], s = pi(e, r);
    if (r.fill && r.fill !== ze) if (r.fillStyle === "solid") {
      const i = pi(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], a = e;
      if (a.length) {
        const l = typeof a[0][0] == "number" ? [a] : a;
        for (const c of l) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...En(xi([c[0], c[0], c[1], c[2]]), 10, (1 + r.roughness) / 2)) : i.push(...En(xi(c), 10, (1 + r.roughness) / 2));
      }
      i.length && n.push(jo([i], r));
    }
    return r.stroke !== ze && n.push(s), this._d("curve", n, r);
  }
  polygon(e, o) {
    const r = this._o(o), n = [], s = Hr(e, !0, r);
    return r.fill && (r.fillStyle === "solid" ? n.push(An([e], r)) : n.push(jo([e], r))), r.stroke !== ze && n.push(s), this._d("polygon", n, r);
  }
  path(e, o) {
    const r = this._o(o), n = [];
    if (!e) return this._d("path", n, r);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = r.fill && r.fill !== "transparent" && r.fill !== ze, i = r.stroke !== ze, a = !!(r.simplification && r.simplification < 1), l = function(d, p, h) {
      const f = pa(ua(bs(d))), m = [];
      let g = [], y = [0, 0], x = [];
      const b = () => {
        x.length >= 4 && g.push(...En(x, p)), x = [];
      }, k = () => {
        b(), g.length && (m.push(g), g = []);
      };
      for (const { key: M, data: A } of f) switch (M) {
        case "M":
          k(), y = [A[0], A[1]], g.push(y);
          break;
        case "L":
          b(), g.push([A[0], A[1]]);
          break;
        case "C":
          if (!x.length) {
            const R = g.length ? g[g.length - 1] : y;
            x.push([R[0], R[1]]);
          }
          x.push([A[0], A[1]]), x.push([A[2], A[3]]), x.push([A[4], A[5]]);
          break;
        case "Z":
          b(), g.push([y[0], y[1]]);
      }
      if (k(), !h) return m;
      const S = [];
      for (const M of m) {
        const A = zd(M, h);
        A.length && S.push(A);
      }
      return S;
    }(e, 1, a ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2), c = yi(e, r);
    if (s) if (r.fillStyle === "solid") if (l.length === 1) {
      const d = yi(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(d.ops) });
    } else n.push(An(l, r));
    else n.push(jo(l, r));
    return i && (a ? l.forEach((d) => {
      n.push(Hr(d, !1, r));
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
          i = { d: this.opsToPath(s), stroke: r.stroke, strokeWidth: r.strokeWidth, fill: ze };
          break;
        case "fillPath":
          i = { d: this.opsToPath(s), stroke: ze, strokeWidth: 0, fill: r.fill || ze };
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
    return r < 0 && (r = o.strokeWidth / 2), { d: this.opsToPath(e), stroke: o.fill || ze, strokeWidth: r, fill: ze };
  }
  _mergedShape(e) {
    return e.filter((o, r) => r === 0 || o.op !== "move");
  }
}
class Td {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new Ur(o);
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
const Lr = "http://www.w3.org/2000/svg";
class Pd {
  constructor(e, o) {
    this.svg = e, this.gen = new Ur(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, s = n.createElementNS(Lr, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const a of o) {
      let l = null;
      switch (a.type) {
        case "path":
          l = n.createElementNS(Lr, "path"), l.setAttribute("d", this.opsToPath(a, i)), l.setAttribute("stroke", r.stroke), l.setAttribute("stroke-width", r.strokeWidth + ""), l.setAttribute("fill", "none"), r.strokeLineDash && l.setAttribute("stroke-dasharray", r.strokeLineDash.join(" ").trim()), r.strokeLineDashOffset && l.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
          break;
        case "fillPath":
          l = n.createElementNS(Lr, "path"), l.setAttribute("d", this.opsToPath(a, i)), l.setAttribute("stroke", "none"), l.setAttribute("stroke-width", "0"), l.setAttribute("fill", r.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || l.setAttribute("fill-rule", "evenodd");
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
    const s = e.createElementNS(Lr, "path");
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
var Ad = { canvas: (t, e) => new Td(t, e), svg: (t, e) => new Pd(t, e), generator: (t) => new Ur(t), newSeed: () => Ur.newSeed() };
const Ze = Ad.generator();
function Ed(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t.charCodeAt(o);
    e = (e << 5) - e + r, e |= 0;
  }
  return Math.abs(e);
}
function po(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? Ed(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function fo(t) {
  var r;
  const e = t.options, o = (r = e == null ? void 0 : e.strokeLineDash) != null && r.length ? e.strokeLineDash.join(" ") : void 0;
  return Ze.toPaths(t).map((n) => ({
    d: n.d,
    stroke: n.stroke,
    strokeWidth: n.strokeWidth,
    fill: n.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: n.stroke !== "none" && n.strokeWidth > 0 ? o : void 0
  }));
}
function Fo(t, e) {
  return Math.min(t, e) * 0.25;
}
function Rd(t, e, o, r, n) {
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
function mr(t, e, o, r, n, s) {
  if (s) {
    const i = Fo(o, r);
    return fo(Ze.path(Rd(t, e, o, r, i), po(n)));
  }
  return fo(Ze.rectangle(t, e, o, r, po(n)));
}
function on(t, e, o, r, n) {
  return fo(Ze.ellipse(t, e, o, r, po(n)));
}
function Ld(t, e, o, r, n) {
  const s = t + o / 2, i = e + r / 2, a = [s, e], l = [t + o, i], c = [s, e + r], d = [t, i], p = Math.hypot(o / 2, r / 2), h = Math.min(n, p / 2) / p, f = (A, R, F) => [
    A[0] + F * (R[0] - A[0]),
    A[1] + F * (R[1] - A[1])
  ], m = f(d, a, 1 - h), g = f(a, l, h), y = f(a, l, 1 - h), x = f(l, c, h), b = f(l, c, 1 - h), k = f(c, d, h), S = f(c, d, 1 - h), M = f(d, a, h);
  return [
    `M${g[0]},${g[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${l[0]},${l[1]} ${x[0]},${x[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${c[0]},${c[1]} ${k[0]},${k[1]}`,
    `L${S[0]},${S[1]}`,
    `Q${d[0]},${d[1]} ${M[0]},${M[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${a[0]},${a[1]} ${g[0]},${g[1]}`,
    "Z"
  ].join(" ");
}
function rn(t, e, o, r, n, s) {
  if (s) {
    const a = Fo(o, r);
    return fo(Ze.path(Ld(t, e, o, r, a), po(n)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + r / 2],
    [t + o / 2, e + r],
    [t, e + r / 2]
  ];
  return fo(Ze.polygon(i, po(n)));
}
function To(t, e, o, r, n) {
  return fo(Ze.line(t, e, o, r, po(n)));
}
function nn(t, e, o, r, n) {
  const s = To(t, e, o, r, n), i = Math.atan2(r - e, o - t), a = Math.max(12, n.strokeWidth * 4), l = Math.PI / 6, c = o - a * Math.cos(i - l), d = r - a * Math.sin(i - l), p = o - a * Math.cos(i + l), h = r - a * Math.sin(i + l), f = To(o, r, c, d, n), m = To(o, r, p, h, n);
  return [...s, ...f, ...m];
}
function wi(t, e) {
  const o = {
    ...po(e),
    stroke: "none"
  };
  return fo(Ze.polygon(t, o));
}
function Rn(t, e) {
  return fo(Ze.path(t, po(e)));
}
function Qe(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function Dd(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function Wd({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ u(Bd, { node: o }) : /* @__PURE__ */ u(Fd, { node: o });
  }
  return /* @__PURE__ */ u(Nd, { node: t, editingLabel: e });
}
const Zr = Me(Wd), Fd = Me(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", r = Qe(e.data.strokeStyle), n = Ut(
    () => o ? null : gs(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Ut(() => {
    const d = e.data.points;
    if (!d || d.length === 0) return "";
    if (d.length === 1) return `M${d[0][0]},${d[0][1]}L${d[0][0]},${d[0][1]}`;
    const p = [`M${d[0][0]},${d[0][1]}`];
    for (let h = 1; h < d.length; h++)
      p.push(`L${d[h][0]},${d[h][1]}`);
    return p.join("");
  }, [e.data.points]), i = Ut(() => {
    if (!o) return null;
    const d = e.data.points;
    if (d.length < 2) return "";
    const p = ["M", d[0][0], d[0][1]];
    for (let f = 1; f < d.length; f++) {
      const [m, g] = d[f], [y, x] = d[f - 1];
      p.push("Q", y, x, (y + m) / 2, (x + g) / 2);
    }
    const h = d[d.length - 1];
    return p.push("L", h[0], h[1]), p.join(" ");
  }, [e.data.points, o]), a = Ut(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const d = e.data.points.map((S) => [S[0], S[1]]), p = ha(d), h = p[0], f = p[p.length - 1], m = Math.hypot(h[0] - f[0], h[1] - f[1]);
    let g = 0;
    for (let S = 1; S < p.length; S++)
      g += Math.hypot(p[S][0] - p[S - 1][0], p[S][1] - p[S - 1][1]);
    const y = g >= 1 && m <= Math.max(e.data.strokeWidth * 4, 20) && m <= g * 0.1, x = e.data.fillStyle || "solid";
    if (y) {
      const S = dd(p, 0);
      return x === "solid" ? { kind: "solid", d: S, fill: e.data.fill } : { kind: "rough", paths: wi(p, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: x,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const b = pd(p);
    if (b.length === 0) return null;
    if (x === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: b
      };
    const k = [];
    for (const { points: S } of b)
      S.length >= 3 && k.push(
        ...wi(S, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: x,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: k, regions: b };
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
          children: /* @__PURE__ */ v("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
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
}), Bd = Me(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, r = e.data.strokeWidth * 2, n = Ut(() => {
    const a = e.data.points;
    if (!a || a.length === 0) return "";
    const l = [`M${a[0][0]},${a[0][1]}`];
    for (let c = 1; c < a.length; c++)
      l.push(`L${a[c][0]},${a[c][1]}`);
    return l.push("Z"), l.join("");
  }, [e.data.points]), s = Qe(e.data.strokeStyle), i = s == null ? void 0 : s.map((a) => a * Math.max(e.data.strokeWidth, 1)).join(" ");
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
          children: /* @__PURE__ */ v("g", { transform: `translate(${r}, ${r})`, opacity: e.data.opacity ?? 1, children: [
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
}), Nd = Me(function({ node: e, editingLabel: o }) {
  var y, x, b, k;
  const r = e.h === "auto" ? 100 : e.h, n = e.data.strokeWidth * 2, s = Qe(e.data.strokeStyle), i = ((y = e.data.startPoint) == null ? void 0 : y[0]) ?? 0, a = ((x = e.data.startPoint) == null ? void 0 : x[1]) ?? r / 2, l = ((b = e.data.endPoint) == null ? void 0 : b[0]) ?? e.w, c = ((k = e.data.endPoint) == null ? void 0 : k[1]) ?? r / 2, d = Ut(() => {
    if (e.data.roughness === 0) return null;
    const S = {
      stroke: e.data.stroke,
      fill: e.data.fill,
      fillStyle: e.data.fillStyle,
      roughness: e.data.roughness,
      strokeWidth: e.data.strokeWidth,
      strokeLineDash: s,
      seed: e.id
    }, M = e.data.edgeStyle === "round";
    switch (e.data.shape) {
      case "rect":
        return mr(0, 0, e.w, r, S, M);
      case "ellipse":
        return on(e.w / 2, r / 2, e.w, r, S);
      case "diamond":
        return rn(0, 0, e.w, r, S, M);
      case "line":
        return To(i, a, l, c, S);
      case "arrow":
        return nn(i, a, l, c, S);
      default:
        return null;
    }
  }, [e, s, i, a, l, c, r]), p = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, h = e.data.opacity ?? 1, f = e.data.shape === "line" || e.data.shape === "arrow", m = e.data.label, g = e.data.labelFontSize ?? 14;
  return /* @__PURE__ */ v(
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
            children: /* @__PURE__ */ v("g", { transform: `translate(${n}, ${n})`, opacity: h, children: [
              p && /* @__PURE__ */ u(
                Xd,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              d ? d.map((S, M) => p && S.fill && S.fill !== "none" ? null : /* @__PURE__ */ u(
                "path",
                {
                  d: S.d,
                  stroke: S.stroke,
                  strokeWidth: S.strokeWidth,
                  fill: S.fill,
                  strokeDasharray: S.strokeDasharray,
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                M
              )) : /* @__PURE__ */ u(
                Hd,
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
                Od,
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
                  fontFamily: co(e.data.labelFontFamily ?? lo),
                  fontSize: g,
                  color: e.data.fill && e.data.fillStyle === "solid" ? Dd(e.data.fill) : e.data.stroke,
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
function xs(t, e) {
  const o = Fo(t, e), r = t / 2, n = e / 2, s = [r, 0], i = [t, n], a = [r, e], l = [0, n], c = Math.hypot(t / 2, e / 2), d = Math.min(o, c / 2) / c, p = (S, M, A) => [
    S[0] + A * (M[0] - S[0]),
    S[1] + A * (M[1] - S[1])
  ], h = p(s, i, d), f = p(s, i, 1 - d), m = p(i, a, d), g = p(i, a, 1 - d), y = p(a, l, d), x = p(a, l, 1 - d), b = p(l, s, d), k = p(l, s, 1 - d);
  return [
    `M${h[0]},${h[1]}`,
    `L${f[0]},${f[1]}`,
    `Q${i[0]},${i[1]} ${m[0]},${m[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${a[0]},${a[1]} ${y[0]},${y[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${l[0]},${l[1]} ${b[0]},${b[1]}`,
    `L${k[0]},${k[1]}`,
    `Q${s[0]},${s[1]} ${h[0]},${h[1]}`,
    "Z"
  ].join(" ");
}
function Hd({
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
      const f = !!l && l !== "none", m = o <= Math.max(c * 2, 4), g = e <= Math.max(c * 2, 4);
      if (!f && (m || g))
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
      const y = p ? Fo(e, o) : 0;
      return /* @__PURE__ */ u(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: y || void 0,
          ry: y || void 0,
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
          d: xs(e, o),
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
      const f = Math.atan2(i - n, s - r), m = Math.max(12, c * 4), g = Math.PI / 6, y = s - m * Math.cos(f - g), x = i - m * Math.sin(f - g), b = s - m * Math.cos(f + g), k = i - m * Math.sin(f + g);
      return /* @__PURE__ */ v(wt, { children: [
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
            points: `${y},${x} ${s},${i} ${b},${k}`,
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
function Od({
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
      const h = c ? Fo(e, o) : 0;
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
          d: xs(e, o),
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
function Xd({
  shape: t,
  w: e,
  h: o,
  fill: r,
  rounded: n
}) {
  switch (t) {
    case "rect": {
      const s = n ? Fo(e, o) : 0;
      return /* @__PURE__ */ u("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: r, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ u("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: r, stroke: "none" });
    case "diamond":
      return n ? /* @__PURE__ */ u(
        "path",
        {
          d: xs(e, o),
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
const Gd = Me(function(e) {
  return /* @__PURE__ */ u(Zr, { node: e.node });
}), Yd = {
  type: "draw",
  component: Gd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => cs(t, e, o, r),
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
}, jd = Me(function(e) {
  const o = e.node;
  return /* @__PURE__ */ u(Zr, { node: o, editingLabel: e.editing });
}), Vd = {
  type: "shape",
  component: jd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => _r(t, e, o, r),
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
function qd(t) {
  return null;
}
const Kd = {
  type: "edge",
  component: qd,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, Dr = 0.05, Ud = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function Zd({
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
  const c = t.h, d = t.data.crop, p = ht(!1);
  p.current = !!i;
  const h = ht(null), [f, m] = ot(null), g = ct(() => {
    h.current && h.current.naturalWidth > 0 && m({ w: h.current.naturalWidth, h: h.current.naturalHeight });
  }, []);
  kt(() => {
    h.current && h.current.naturalWidth > 0 && m({ w: h.current.naturalWidth, h: h.current.naturalHeight });
  }, [t.data.src]);
  const [y, x] = ot({ x: 0, y: 0, w: 1, h: 1 });
  kt(() => {
    i && (x(d ?? { x: 0, y: 0, w: 1, h: 1 }), !f && h.current && h.current.naturalWidth > 0 && m({ w: h.current.naturalWidth, h: h.current.naturalHeight }));
  }, [i]);
  const b = Ut(() => {
    if (!f) return null;
    const j = f.w / f.h, J = t.w / c;
    let Y, tt;
    return j > J ? (Y = t.w, tt = t.w / j) : (tt = c, Y = c * j), { x: (t.w - Y) / 2, y: (c - tt) / 2, w: Y, h: tt };
  }, [f, t.w, c]), k = ct(() => {
    const j = y.x < 1e-3 && y.y < 1e-3 && y.w > 0.999 && y.h > 0.999;
    o.updateNodeWithHistory(t.id, {
      data: {
        ...t.data,
        crop: j ? void 0 : { x: y.x, y: y.y, w: y.w, h: y.h }
      }
    }), l == null || l();
  }, [o, t, y, l]), S = ct(() => {
    l == null || l();
  }, [l]);
  kt(() => {
    if (!i) return;
    const j = (J) => {
      J.key === "Enter" ? (k(), J.preventDefault(), J.stopPropagation()) : J.key === "Escape" && (S(), J.preventDefault(), J.stopPropagation());
    };
    return document.addEventListener("keydown", j, !0), () => document.removeEventListener("keydown", j, !0);
  }, [i, k, S]);
  const M = ct(
    (j, J) => {
      if (J.stopPropagation(), J.preventDefault(), !b) return;
      const Y = J.currentTarget.ownerDocument, tt = J.clientX, rt = J.clientY, Q = { ...y }, K = (gt) => {
        const lt = (gt.clientX - tt) / n / b.w, vt = (gt.clientY - rt) / n / b.h, xt = { ...Q }, pt = Q.x + Q.w, Ct = Q.y + Q.h;
        if (j.includes("left")) {
          const St = Math.max(0, Math.min(pt - Dr, Q.x + lt));
          xt.x = St, xt.w = pt - St;
        }
        if (j.includes("right") && (xt.w = Math.max(
          Dr,
          Math.min(1 - Q.x, Q.w + lt)
        )), j.includes("top")) {
          const St = Math.max(0, Math.min(Ct - Dr, Q.y + vt));
          xt.y = St, xt.h = Ct - St;
        }
        j.includes("bottom") && (xt.h = Math.max(
          Dr,
          Math.min(1 - Q.y, Q.h + vt)
        )), x(xt);
      }, et = () => {
        Y.removeEventListener("pointermove", K), Y.removeEventListener("pointerup", et);
      };
      Y.addEventListener("pointermove", K), Y.addEventListener("pointerup", et);
    },
    [y, b, n]
  ), A = ct(
    (j) => {
      if (j.stopPropagation(), j.preventDefault(), !b) return;
      const J = j.currentTarget.ownerDocument, Y = j.clientX, tt = j.clientY, rt = { ...y }, Q = (et) => {
        const gt = (et.clientX - Y) / n / b.w, lt = (et.clientY - tt) / n / b.h;
        x({
          ...rt,
          x: Math.max(0, Math.min(1 - rt.w, rt.x + gt)),
          y: Math.max(0, Math.min(1 - rt.h, rt.y + lt))
        });
      }, K = () => {
        J.removeEventListener("pointermove", Q), J.removeEventListener("pointerup", K);
      };
      J.addEventListener("pointermove", Q), J.addEventListener("pointerup", K);
    },
    [y, b, n]
  ), R = ct(
    (j) => {
      if (p.current) return;
      const J = j.currentTarget.ownerDocument;
      if (j.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: St, y: Rt } = o.screenToCanvas(
          j.clientX,
          j.clientY
        );
        for (const dt of o.selection) {
          const Ht = o.getNode(dt);
          if (!Ht) continue;
          const _t = Ht.h === "auto" ? 100 : Ht.h;
          if (St >= Ht.x && St <= Ht.x + Ht.w && Rt >= Ht.y && Rt <= Ht.y + _t)
            return;
        }
      }
      j.stopPropagation(), j.preventDefault(), j.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const Y = j.clientX, tt = j.clientY, rt = Array.from(o.selection), Q = rt.map((St) => {
        const Rt = o.getNode(St);
        return { id: St, x: Rt.x, y: Rt.y };
      });
      let K = !1, et = null, gt = Y, lt = tt, vt = !1;
      const xt = () => {
        et = null;
        const St = (gt - Y) / o.viewport.zoom, Rt = (lt - tt) / o.viewport.zoom, { finalDx: dt, finalDy: Ht } = o.computeDragSnap(
          Q,
          rt,
          St,
          Rt,
          vt
        ), _t = Q.map((oe) => ({
          id: oe.id,
          patch: { x: oe.x + dt, y: oe.y + Ht }
        }));
        o.updateMany(_t);
      }, pt = (St) => {
        const Rt = (St.clientX - Y) / o.viewport.zoom, dt = (St.clientY - tt) / o.viewport.zoom;
        if (!K)
          if (Math.abs(Rt) > 2 || Math.abs(dt) > 2)
            K = !0, o.pushHistorySnapshot();
          else
            return;
        gt = St.clientX, lt = St.clientY, vt = St.metaKey || St.ctrlKey, et === null && (et = requestAnimationFrame(xt));
      }, Ct = () => {
        et !== null && (cancelAnimationFrame(et), xt()), o.clearAlignGuides(), J.removeEventListener("pointermove", pt), J.removeEventListener("pointerup", Ct);
      };
      J.addEventListener("pointermove", pt), J.addEventListener("pointerup", Ct);
    },
    [o, t.id]
  ), F = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], T = 8 / n, O = T / 2, $ = 25 / n, at = e && s && !i, ft = ct(
    (j) => {
      const J = j.currentTarget.ownerDocument;
      j.stopPropagation(), j.preventDefault();
      const Y = t.x + t.w / 2, tt = t.y + c / 2, rt = t.rotation || 0, { x: Q, y: K } = o.screenToCanvas(
        j.clientX,
        j.clientY
      ), et = Math.atan2(K - tt, Q - Y);
      o.pushHistorySnapshot();
      const gt = (vt) => {
        const { x: xt, y: pt } = o.screenToCanvas(
          vt.clientX,
          vt.clientY
        ), Ct = Math.atan2(pt - tt, xt - Y);
        let St = rt + (Ct - et) * (180 / Math.PI);
        (vt.shiftKey || o.snapToGrid) && !(vt.metaKey || vt.ctrlKey) && (St = Math.round(St / 15) * 15), o.updateNode(t.id, { rotation: St });
      }, lt = () => {
        J.removeEventListener("pointermove", gt), J.removeEventListener("pointerup", lt);
      };
      J.addEventListener("pointermove", gt), J.addEventListener("pointerup", lt);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), G = i && b ? {
    left: b.x + y.x * b.w,
    top: b.y + y.y * b.h,
    width: y.w * b.w,
    height: y.h * b.h
  } : null, st = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, N = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: st
  };
  if (!i && d) {
    const j = d.y * 100, J = (1 - d.x - d.w) * 100, Y = (1 - d.y - d.h) * 100, tt = d.x * 100;
    N.objectViewBox = `inset(${j}% ${J}% ${Y}% ${tt}%)`;
  }
  const D = 8 / n, Z = D / 2;
  return /* @__PURE__ */ v(
    "div",
    {
      onPointerDown: R,
      onDoubleClick: !i && r ? (j) => {
        j.stopPropagation(), a == null || a();
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
        /* @__PURE__ */ v(
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
                  onLoad: g,
                  style: N,
                  draggable: !1
                }
              ),
              i && G && /* @__PURE__ */ u(
                "div",
                {
                  onPointerDown: A,
                  style: {
                    position: "absolute",
                    left: G.left,
                    top: G.top,
                    width: G.width,
                    height: G.height,
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
        i && G && Ud.map(({ pos: j, edges: J, cx: Y, cy: tt, cursor: rt }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (Q) => M(J, Q),
            style: {
              position: "absolute",
              left: G.left + Y * G.width - Z,
              top: G.top + tt * G.height - Z,
              width: D,
              height: D,
              background: "white",
              border: `${1.5 / n}px solid #3b82f6`,
              borderRadius: 2,
              cursor: rt,
              zIndex: 11
            }
          },
          j
        )),
        e && !i && /* @__PURE__ */ v(wt, { children: [
          /* @__PURE__ */ u(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: -$,
                width: 1,
                height: $,
                background: "#3b82f6",
                marginLeft: -0.5,
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: ft,
              style: {
                position: "absolute",
                left: "50%",
                top: -($ + T / 2),
                width: T,
                height: T,
                marginLeft: -T / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        at && F.map(({ pos: j, cx: J, cy: Y }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (tt) => {
              tt.stopPropagation(), s == null || s(t.id, j, tt);
            },
            style: {
              position: "absolute",
              left: `calc(${J * 100}% - ${O}px)`,
              top: `calc(${Y * 100}% - ${O}px)`,
              width: T,
              height: T,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: tn(j, t.rotation || 0)
            }
          },
          j
        ))
      ]
    }
  );
}
const ba = Me(Zd);
function Qd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    ba,
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
const Jd = {
  type: "image",
  component: Qd,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function $d({
  node: t,
  engine: e,
  editing: o,
  editClickPos: r,
  onStopEdit: n,
  onMeasuredHeight: s
}) {
  const i = ht(null), [a, l] = ot(t.data.text), c = ht(!1), d = ht(t.data.text), p = ht(null), h = ht(e);
  h.current = e;
  const f = ht(t);
  f.current = t, kt(() => {
    o || l(t.data.text);
  }, [t.data.text]), $r(() => {
    var M, A;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const R = i.current.ownerDocument;
      let F = !1;
      if (r) {
        const T = R.caretRangeFromPoint(r.clientX, r.clientY);
        if (T && i.current.contains(T.startContainer)) {
          const O = (M = R.defaultView) == null ? void 0 : M.getSelection();
          O == null || O.removeAllRanges(), O == null || O.addRange(T), F = !0;
        }
      }
      if (!F) {
        const T = R.createRange(), O = (A = R.defaultView) == null ? void 0 : A.getSelection();
        i.current.childNodes.length > 0 && (T.selectNodeContents(i.current), T.collapse(!1)), O == null || O.removeAllRanges(), O == null || O.addRange(T);
      }
      d.current = t.data.text, c.current = !1;
    }
  }, [o]), kt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const M = d.current, A = e.getNode(t.id);
        if (A && A.type === "text") {
          const R = A.data;
          M !== R.text && e.updateNodeWithHistory(t.id, {
            data: { ...R, text: M }
          });
        }
      };
  }, [o, e, t.id]), kt(() => {
    if (!i.current || !s) return;
    const M = new ResizeObserver(() => {
      var R;
      const A = ((R = i.current) == null ? void 0 : R.offsetHeight) ?? 0;
      A > 0 && s(t.id, A);
    });
    return M.observe(i.current), () => M.disconnect();
  }, [t.id, s, o]);
  const m = ct(() => {
    var A;
    if (c.current) return;
    c.current = !0, p.current && (clearTimeout(p.current), p.current = null);
    const M = ((A = i.current) == null ? void 0 : A.innerText) ?? "";
    l(M), d.current = M, M !== t.data.text && e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: M }
    }), n();
  }, [e, t, n]), g = ct(
    (M) => {
      var A;
      M.key === "Escape" && (M.preventDefault(), m(), (A = i.current) == null || A.blur()), M.stopPropagation();
    },
    [m]
  ), y = ct(() => {
    m();
  }, [m]), x = ct(() => {
    if (i.current) {
      const M = i.current.innerText;
      l(M), d.current = M, p.current && clearTimeout(p.current), p.current = setTimeout(() => {
        const A = f.current;
        M !== A.data.text && h.current.updateNode(A.id, {
          data: { ...A.data, text: M }
        });
      }, 0);
    }
  }, []), b = t.h === "auto" ? void 0 : t.h, k = t.data.opacity ?? 1, S = {
    fontFamily: co(t.data.fontFamily),
    fontSize: t.data.fontSize,
    color: t.data.color,
    textAlign: t.data.align,
    opacity: k,
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
          onKeyDown: g,
          onBlur: y,
          onInput: x,
          onPointerDown: (M) => M.stopPropagation(),
          style: { ...S, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ u("div", { ref: i, style: S, children: a || " " })
    }
  );
}
const xa = Me($d);
function _d(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    xa,
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
const th = {
  type: "text",
  component: _d,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function eh(t) {
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
const oh = {
  type: "frame",
  component: eh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, rh = 100;
function nh({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onEditStart: i,
  onEditEnd: a
}) {
  const l = ht(null), c = ht(null), d = ht(""), p = ht(null), h = ht(null), f = ht(t);
  f.current = t;
  const m = ht(o);
  m.current = o, kt(() => {
    var S;
    if (s && c.current) {
      const M = c.current;
      M.innerText = t.data.text || "", d.current = t.data.text || "", M.focus();
      const A = M.ownerDocument, R = (S = A.defaultView) == null ? void 0 : S.getSelection(), F = p.current;
      p.current = null;
      let T = !1;
      if (F && R && A.caretRangeFromPoint) {
        const O = A.caretRangeFromPoint(F.x, F.y);
        O && M.contains(O.startContainer) && (R.removeAllRanges(), R.addRange(O), T = !0);
      }
      if (!T && R) {
        const O = A.createRange();
        M.childNodes.length > 0 && (O.selectNodeContents(M), O.collapse(!1)), R.removeAllRanges(), R.addRange(O);
      }
    }
  }, [s]), kt(() => {
    if (s)
      return () => {
        const S = f.current, M = d.current;
        M !== S.data.text && m.current.updateNodeWithHistory(S.id, {
          data: { ...S.data, text: M }
        });
      };
  }, [s]);
  const g = ct(() => {
    h.current && (clearTimeout(h.current), h.current = null), c.current && (d.current = c.current.innerText), a();
  }, [a]), y = ct(
    (S) => {
      const M = S.currentTarget.ownerDocument;
      if (S.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: Z, y: j } = o.screenToCanvas(S.clientX, S.clientY);
        for (const J of o.selection) {
          const Y = o.getNode(J);
          if (!Y) continue;
          const tt = Y.h === "auto" ? 100 : Y.h;
          if (Z >= Y.x && Z <= Y.x + Y.w && j >= Y.y && j <= Y.y + tt)
            return;
        }
      }
      if (S.stopPropagation(), s) return;
      S.currentTarget.setPointerCapture(S.pointerId), S.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const A = S.clientX, R = S.clientY, F = Array.from(o.selection), T = [];
      for (const Z of F) {
        const j = o.getNode(Z);
        j && T.push({ id: Z, x: j.x, y: j.y });
      }
      if (T.length === 0) return;
      let O = !1, $ = null, at = A, ft = R, G = !1;
      const st = () => {
        $ = null;
        const Z = (at - A) / o.viewport.zoom, j = (ft - R) / o.viewport.zoom, { finalDx: J, finalDy: Y } = o.computeDragSnap(
          T,
          F,
          Z,
          j,
          G
        ), tt = T.map((rt) => ({
          id: rt.id,
          patch: { x: rt.x + J, y: rt.y + Y }
        }));
        o.updateMany(tt);
      }, N = (Z) => {
        const j = (Z.clientX - A) / o.viewport.zoom, J = (Z.clientY - R) / o.viewport.zoom;
        if (!O)
          if (Math.abs(j) > 2 || Math.abs(J) > 2)
            O = !0, o.pushHistorySnapshot();
          else
            return;
        at = Z.clientX, ft = Z.clientY, G = Z.metaKey || Z.ctrlKey, $ === null && ($ = requestAnimationFrame(st));
      }, D = () => {
        $ !== null && (cancelAnimationFrame($), st()), o.clearAlignGuides(), M.removeEventListener("pointermove", N), M.removeEventListener("pointerup", D);
      };
      M.addEventListener("pointermove", N), M.addEventListener("pointerup", D);
    },
    [o, t.id, s]
  ), x = ct(
    (S) => {
      if (r) {
        if (S.stopPropagation(), t.groupId) {
          const M = [];
          let A = t.groupId;
          for (; A; )
            M.push(A), A = o.groupParent.get(A);
          if (!o.activeGroupId) {
            o.enterGroup(M[M.length - 1]), o.select(t.id);
            return;
          }
          const R = M.indexOf(o.activeGroupId);
          if (R > 0) {
            o.enterGroup(M[R - 1]), o.select(t.id);
            return;
          }
        }
        s || (p.current = { x: S.clientX, y: S.clientY }, o.select(t.id), i(t.id));
      }
    },
    [r, s, o, t.id, t.groupId, i]
  ), b = t.data.fontSize ?? 16, k = t.h === "auto" ? rh : t.h;
  return /* @__PURE__ */ u(
    "div",
    {
      ref: l,
      "data-node-id": t.id,
      className: r ? void 0 : "sb-block-inert",
      onPointerDown: r ? y : void 0,
      onDoubleClick: x,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: k,
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
              onBlur: g,
              onInput: () => {
                c.current && (d.current = c.current.innerText, h.current && clearTimeout(h.current), h.current = setTimeout(() => {
                  const S = f.current, M = d.current;
                  M !== S.data.text && m.current.updateNode(S.id, {
                    data: { ...S.data, text: M }
                  });
                }, 0));
              },
              onKeyDown: (S) => {
                S.key === "Escape" && (S.stopPropagation(), g()), S.stopPropagation();
              },
              onPointerDown: (S) => S.stopPropagation(),
              style: {
                fontSize: b,
                fontFamily: co(lo),
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
                fontFamily: co(lo),
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
const wa = Me(nh);
function sh(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    wa,
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
const ih = {
  type: "sticky",
  component: sh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, ka = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function ah(t) {
  const e = t.match(ka);
  return e ? e[1] : null;
}
function lh(t) {
  return ka.test(t);
}
function ch(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function dh(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function hh({
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
  return /* @__PURE__ */ v(
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
        /* @__PURE__ */ v(
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
                  src: ch(c.videoId),
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
            onPointerDown: (g) => {
              g.stopPropagation(), i == null || i(t.id, m.key, g);
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
const uh = Me(hh);
function ph(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    uh,
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
const fh = {
  type: "youtube",
  component: ph,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, yh = [
  Vc,
  Yd,
  Vd,
  Kd,
  Jd,
  th,
  oh,
  ih,
  fh
];
function vo(t, e) {
  return `${t}:${e}`;
}
class gh {
  constructor(e, o) {
    bt(this, "spatial");
    bt(this, "registry");
    /** Current resolved port values. */
    bt(this, "values", /* @__PURE__ */ new Map());
    /** Node IDs that need recomputation. */
    bt(this, "dirty", /* @__PURE__ */ new Set());
    /** Whether a microtask flush is already scheduled. */
    bt(this, "scheduled", !1);
    /** Generation counter for canceling stale async results. */
    bt(this, "generation", 0);
    /** Change subscribers. */
    bt(this, "listeners", /* @__PURE__ */ new Set());
    /** Node IDs that are part of a cycle (updated after each topoSort). */
    bt(this, "_cycleNodeIds", /* @__PURE__ */ new Set());
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
    return this.values.get(vo(e, o)) ?? null;
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
            vo(d.fromId, d.sourcePort ?? "")
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
      s.direction === "output" && (r[s.id] = this.values.get(vo(e, s.id)) ?? null);
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
            r[s.id] = this.values.get(vo(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, a = !0;
            break;
          }
        }
        a || (r[s.id] = s.defaultValue ?? null);
      } else
        r[s.id] = this.values.get(vo(e, s.id)) ?? null;
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
            this.values.delete(vo(n.id, i.id));
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
      const g = this.registry.get(m.type);
      g != null && g.ports && g.compute && e.add(m.id);
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
      const g = m.data;
      g.sourcePort && g.targetPort && e.has(g.fromId) && e.has(g.toId) && (o.get(g.fromId).add(g.toId), r.set(g.toId, (r.get(g.toId) ?? 0) + 1));
    }
    const s = new Set(this.dirty), i = /* @__PURE__ */ new Set(), a = (m) => {
      if (i.has(m)) return;
      i.add(m);
      const g = o.get(m);
      if (g)
        for (const y of g)
          s.add(y), a(y);
    };
    for (const m of [...this.dirty])
      a(m);
    const l = /* @__PURE__ */ new Map();
    for (const m of s)
      l.set(m, 0);
    for (const m of n) {
      const g = m.data;
      g.sourcePort && g.targetPort && s.has(g.fromId) && s.has(g.toId) && l.set(
        g.toId,
        (l.get(g.toId) ?? 0) + 1
      );
    }
    const c = [];
    for (const [m, g] of l)
      g === 0 && c.push(m);
    const d = [];
    for (; c.length > 0; ) {
      const m = c.shift();
      d.push(m);
      const g = o.get(m);
      if (g)
        for (const y of g) {
          if (!s.has(y)) continue;
          const x = (l.get(y) ?? 1) - 1;
          l.set(y, x), x === 0 && c.push(y);
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
      const i = vo(e, s.id), a = r[s.id] ?? null, l = this.values.get(i) ?? null;
      mh(l, a) || (this.values.set(i, a), n = !0);
    }
    return n && this.markDownstream(e), n;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function mh(t, e) {
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
const er = [
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
function kr(t) {
  return er.find((e) => e.key === t) ?? er[1];
}
function bh() {
  return {
    staticDefs: /* @__PURE__ */ v("filter", { id: "paper-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.08", numOctaves: 4, seed: 12, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ u("feDiffuseLighting", { in: "bump", lightingColor: "#f7f4ee", surfaceScale: "1.2", diffuseConstant: "1", result: "lit", children: /* @__PURE__ */ u("feDistantLight", { azimuth: "225", elevation: "50" }) }),
      /* @__PURE__ */ u("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ u("feFlood", { floodColor: "#f5f0e8", result: "base" }),
      /* @__PURE__ */ u("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "paper" }),
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.6", numOctaves: 3, seed: 7, stitchTiles: "stitch", result: "grain" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "grain", type: "saturate", values: "0", result: "grain-gray" }),
      /* @__PURE__ */ v("feComponentTransfer", { in: "grain-gray", result: "grain-subtle", children: [
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
function xh() {
  return {
    staticDefs: /* @__PURE__ */ v("filter", { id: "kraft-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.04", numOctaves: 5, seed: 42, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ u("feDiffuseLighting", { in: "bump", lightingColor: "#e0c9a6", surfaceScale: "1.4", diffuseConstant: "0.95", result: "lit", children: /* @__PURE__ */ u("feDistantLight", { azimuth: "200", elevation: "50" }) }),
      /* @__PURE__ */ u("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ u("feFlood", { floodColor: "#d4b896", result: "base" }),
      /* @__PURE__ */ u("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "kraft" }),
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.35", numOctaves: 2, seed: 99, stitchTiles: "stitch", result: "fiber" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "fiber", type: "saturate", values: "0", result: "fiber-gray" }),
      /* @__PURE__ */ v("feComponentTransfer", { in: "fiber-gray", result: "fiber-subtle", children: [
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
const Ln = {
  "japanese-stationery": bh,
  kraft: xh
};
function wh(t) {
  var e;
  return ((e = Ln[t]) == null ? void 0 : e.call(Ln)) ?? {};
}
const va = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, kh = {
  ...va,
  willChange: "transform"
}, vh = Me(function({
  background: e
}) {
  const o = kr(e), { staticDefs: r, staticLayers: n } = wh(e);
  return /* @__PURE__ */ v("svg", { style: kh, children: [
    r && /* @__PURE__ */ u("defs", { children: r }),
    /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    n
  ] });
});
function Sh({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: r = !0
}) {
  const n = e * t.zoom, s = t.x % n, i = t.y % n, l = kr(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(vh, { background: o }),
    r && /* @__PURE__ */ v("svg", { style: va, children: [
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
const Sa = "sb-excalib-index", ws = "sb-excalib-";
function sn() {
  try {
    const t = localStorage.getItem(Sa);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Ma(t) {
  localStorage.setItem(Sa, JSON.stringify(t));
}
function Mh(t) {
  try {
    const e = localStorage.getItem(ws + t);
    return e ? ks(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function ks(t) {
  if (t.libraryItems)
    return t;
  const o = (t.library ?? []).map((r, n) => ({
    id: Tt(10),
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
function Ca() {
  return sn();
}
function vs(t) {
  const e = Mh(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function Ss(t, e) {
  const o = ks(t), r = Tt(10), n = o.libraryItems.map((a) => a.name || "Untitled"), s = {
    id: r,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: n
  };
  localStorage.setItem(ws + r, JSON.stringify(o));
  const i = sn();
  return i.push(s), Ma(i), s;
}
function Ch(t) {
  localStorage.removeItem(ws + t);
  const e = sn().filter((o) => o.id !== t);
  Ma(e);
}
function Ih(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], r = sn();
  for (const n of r) {
    if (!n.itemNames.some((a) => a.toLowerCase().includes(e)) && !n.name.toLowerCase().includes(e)) continue;
    const i = vs(n.id);
    for (const a of i)
      ((a.name || "").toLowerCase().includes(e) || n.name.toLowerCase().includes(e)) && o.push({ library: n, item: a });
  }
  return o;
}
async function zh(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const r = await o.json();
  if (r.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const n = ks(r);
  return Ss(n, { name: e, source: t });
}
const ts = {
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
}, Ia = ls(ts);
function Zt() {
  return br(Ia);
}
function vr(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function Eo(t) {
  if (t)
    return t * (180 / Math.PI);
}
function za(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function Ta(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function Pa(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function Aa(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function Ea(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function Th(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function Dn(t, e) {
  return {
    id: Tt(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: Eo(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: za(t.backgroundColor),
      fillStyle: Ta(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Pa(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: vr(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? Th(t) : void 0
    }
  };
}
function ki(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const r = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Pa(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: vr(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [a, l] = o, c = Math.min(a[0], l[0]), d = Math.min(a[1], l[1]), p = Math.max(a[0], l[0]), h = Math.max(a[1], l[1]), f = Math.max(p - c, 1), m = Math.max(h - d, 1);
    return [
      {
        id: Tt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + d,
        w: f,
        h: m,
        z: 0,
        rotation: Eo(t.angle),
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
    const a = Ph(t);
    if (a) return [a];
  }
  const s = Tt(10), i = [];
  for (let a = 0; a < o.length - 1; a++) {
    const l = o[a], c = o[a + 1], d = Math.min(l[0], c[0]), p = Math.min(l[1], c[1]), h = Math.max(l[0], c[0]), f = Math.max(l[1], c[1]), m = Math.max(h - d, 1), g = Math.max(f - p, 1), y = a === o.length - 2;
    i.push({
      id: Tt(10),
      type: "shape",
      x: t.x + d,
      y: t.y + p,
      w: m,
      h: g,
      z: 0,
      rotation: Eo(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...r,
        shape: e && y ? "arrow" : "line",
        startPoint: [l[0] - d, l[1] - p],
        endPoint: [c[0] - d, c[1] - p]
      }
    });
  }
  return i;
}
function Ph(t) {
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
    id: Tt(10),
    type: "draw",
    x: t.x + o,
    y: t.y + r,
    w: Math.max(n - o, 1),
    h: Math.max(s - r, 1),
    z: 0,
    rotation: Eo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: vr(t.opacity ?? 100),
      fill: za(t.backgroundColor),
      fillStyle: Ta(t.fillStyle)
    }
  };
}
function Ah(t) {
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
    id: Tt(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(a - s, 1),
    h: Math.max(l - i, 1),
    z: 0,
    rotation: Eo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: vr(t.opacity ?? 100)
    }
  };
}
function Eh(t) {
  return {
    id: Tt(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: Eo(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: Aa(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Ea(t.textAlign),
      opacity: vr(t.opacity ?? 100)
    }
  };
}
function Rh(t) {
  return {
    id: Tt(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: Eo(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function Ra(t) {
  return Lh(t.elements);
}
function Lh(t) {
  const e = [], o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && n.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [Dn(s, "rect")];
        break;
      case "ellipse":
        i = [Dn(s, "ellipse")];
        break;
      case "diamond":
        i = [Dn(s, "diamond")];
        break;
      case "arrow":
        i = ki(s, !0);
        break;
      case "line":
        i = ki(s, !1);
        break;
      case "freedraw": {
        const a = Ah(s);
        a && (i = [a]);
        break;
      }
      case "text":
        i = [Eh(s)];
        break;
      case "frame":
      case "magicframe":
        i = [Rh(s)];
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
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = Aa(i.fontFamily), c.labelAlign = Ea(i.textAlign);
  }
  return Dh(t, e, o, r), Wh(e), { nodes: e, groupParent: r };
}
function Dh(t, e, o, r) {
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
function Wh(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const r of t)
    r.x < e && (e = r.x), r.y < o && (o = r.y);
  if (isFinite(e))
    for (const r of t)
      r.x -= e, r.y -= o;
}
function Ms(t, e = 60) {
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
        d.push(Fh(p));
        break;
      case "draw":
        d.push(Bh(p));
        break;
      case "text":
        d.push(Nh(p));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${d.join("")}</svg>`;
}
function La(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Fh(t) {
  var h, f, m, g;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, r = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: Qe(e.strokeStyle),
    seed: t.id
  }, n = ((h = e.startPoint) == null ? void 0 : h[0]) ?? 0, s = ((f = e.startPoint) == null ? void 0 : f[1]) ?? o / 2, i = ((m = e.endPoint) == null ? void 0 : m[0]) ?? t.w, a = ((g = e.endPoint) == null ? void 0 : g[1]) ?? o / 2;
  let l;
  switch (e.shape) {
    case "rect":
      l = mr(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "ellipse":
      l = on(t.x + t.w / 2, t.y + o / 2, t.w, o, r);
      break;
    case "diamond":
      l = rn(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "line":
      l = To(t.x + n, t.y + s, t.x + i, t.y + a, r);
      break;
    case "arrow":
      l = nn(t.x + n, t.y + s, t.x + i, t.y + a, r);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, d = c < 1 ? `<g opacity="${c}">` : "<g>", p = l.map(
    (y) => `<path d="${La(y.d)}" fill="${y.fill || "none"}" stroke="${y.stroke}" stroke-width="${y.strokeWidth}"${y.strokeDasharray ? ` stroke-dasharray="${y.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${d}${p.join("")}</g>`;
}
function Bh(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), r = e.opacity ?? 1, n = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${n}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${r < 1 ? ` opacity="${r}"` : ""}/>`;
}
function Nh(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), r = e.opacity ?? 1, n = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${r < 1 ? ` opacity="${r}"` : ""}>${La(n)}</text>`;
}
const Da = "sb-personal-library";
function Cs() {
  try {
    const t = localStorage.getItem(Da);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Wa(t) {
  localStorage.setItem(Da, JSON.stringify(t));
}
function Fa() {
  return Cs();
}
function Hh(t, e, o) {
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
    id: Tt(10),
    name: t.trim() || "Untitled",
    nodes: r,
    groupParent: s,
    createdAt: Date.now()
  }, a = Cs();
  return a.unshift(i), Wa(a), i;
}
function Oh(t) {
  const e = Cs().filter((o) => o.id !== t);
  Wa(e);
}
const Ba = {
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
}, Na = ls({
  dir: "ltr",
  isRTL: !1,
  labels: Ba
});
function Xh(t) {
  var e;
  return t === "rtl" || t === "ltr" ? t : typeof document < "u" && ((e = document.dir) == null ? void 0 : e.toLowerCase()) === "rtl" ? "rtl" : "ltr";
}
function Gh(t, e) {
  return Ut(() => {
    const o = Xh(t);
    return {
      dir: o,
      isRTL: o === "rtl",
      labels: { ...Ba, ...e ?? {} }
    };
  }, [t, e]);
}
function qt() {
  return br(Na);
}
function Ha(t, e, o, r) {
  const { nodes: n, groupParent: s } = Ra(e);
  if (n.length === 0) return;
  const i = structuredClone(n), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (const b of i) {
    const k = Tt(10);
    a.set(b.id, k), b.id = k;
  }
  for (const b of i)
    b.groupId && (l.has(b.groupId) || l.set(b.groupId, Tt(10)), b.groupId = l.get(b.groupId));
  let c = 1 / 0, d = 1 / 0, p = -1 / 0, h = -1 / 0;
  for (const b of i) {
    const k = b.h === "auto" ? 100 : b.h;
    c = Math.min(c, b.x), d = Math.min(d, b.y), p = Math.max(p, b.x + b.w), h = Math.max(h, b.y + k);
  }
  const f = o ?? window.innerWidth / 2, m = r ?? window.innerHeight / 2, g = t.screenToCanvas(f, m), y = g.x - (c + p) / 2, x = g.y - (d + h) / 2;
  for (const b of i)
    b.x += y, b.y += x, b.z = t.nextZ();
  t.addNodes(i);
  for (const [b, k] of s) {
    const S = l.get(b) ?? b, M = l.get(k) ?? k;
    t.groupParent.set(S, M);
  }
  t.selectMultiple(i.map((b) => b.id));
}
const es = "application/x-spatialboard-library-item", os = "application/x-spatialboard-personal-item";
function Oa(t, e, o, r) {
  if (e.nodes.length === 0) return;
  const n = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const y of n) {
    const x = Tt(10);
    s.set(y.id, x), y.id = x;
  }
  for (const y of n)
    y.groupId && (i.has(y.groupId) || i.set(y.groupId, Tt(10)), y.groupId = i.get(y.groupId));
  for (const y of n)
    if (y.type === "edge") {
      const x = y.data;
      x.fromId && s.has(x.fromId) && (x.fromId = s.get(x.fromId)), x.toId && s.has(x.toId) && (x.toId = s.get(x.toId));
    }
  let a = 1 / 0, l = 1 / 0, c = -1 / 0, d = -1 / 0;
  for (const y of n) {
    const x = y.h === "auto" ? 100 : y.h;
    a = Math.min(a, y.x), l = Math.min(l, y.y), c = Math.max(c, y.x + y.w), d = Math.max(d, y.y + x);
  }
  const p = o ?? window.innerWidth / 2, h = r ?? window.innerHeight / 2, f = t.screenToCanvas(p, h), m = f.x - (a + c) / 2, g = f.y - (l + d) / 2;
  for (const y of n)
    y.x += m, y.y += g, y.z = t.nextZ();
  t.addNodes(n);
  for (const [y, x] of e.groupParent) {
    const b = i.get(y) ?? y, k = i.get(x) ?? x;
    t.groupParent.set(b, k);
  }
  t.selectMultiple(n.map((y) => y.id));
}
const or = /* @__PURE__ */ new Map();
function Yh({ item: t }) {
  const e = Ut(() => {
    const o = or.get(t.id);
    if (o) return o;
    const { nodes: r } = Ra(t), n = Ms(r, 56);
    return or.set(t.id, n), n;
  }, [t.id]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Xa({
  item: t,
  libId: e,
  onClick: o,
  theme: r
}) {
  const { labels: n } = qt(), s = ct(
    (i) => {
      i.dataTransfer.setData(
        es,
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
      children: /* @__PURE__ */ u(Yh, { item: t })
    }
  );
}
function jh({ nodes: t }) {
  const e = Ut(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), r = or.get(o);
    if (r) return r;
    const n = Ms(t, 56);
    return or.set(o, n), n;
  }, [t]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Ga({
  item: t,
  onClick: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = qt(), [s, i] = ot(!1), a = ct(
    (l) => {
      l.dataTransfer.setData(
        os,
        JSON.stringify({ itemId: t.id })
      ), l.dataTransfer.effectAllowed = "copy";
    },
    [t.id]
  );
  return /* @__PURE__ */ v(
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
            children: /* @__PURE__ */ u(jh, { nodes: t.nodes })
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
function Vh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  onBrowseDirectory: n
}) {
  const s = Zt(), { labels: i } = qt(), a = ht(null), l = ht(null), [c, d] = ot([]), [p, h] = ot([]), [f, m] = ot(""), [g, y] = ot(/* @__PURE__ */ new Set()), x = ct(() => {
    d(Ca()), h(Fa());
  }, []);
  kt(() => {
    e && x();
  }, [e, x]), kt(() => {
    if (!e) return;
    const T = (O) => {
      a.current && !a.current.contains(O.target) && o();
    };
    return document.addEventListener("pointerdown", T), () => document.removeEventListener("pointerdown", T);
  }, [e, o]);
  const b = ct(
    (T) => {
      var at;
      const O = (at = T.target.files) == null ? void 0 : at[0];
      if (!O) return;
      const $ = new FileReader();
      $.onload = () => {
        try {
          const ft = JSON.parse($.result);
          if (ft.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const G = O.name.replace(/\.excalidrawlib$/, "");
          Ss(ft, { name: G }), x();
        } catch (ft) {
          console.error("Failed to parse library file:", ft);
        }
      }, $.readAsText(O), T.target.value = "";
    },
    [x]
  ), k = ct(
    (T) => {
      Ch(T), or.clear(), x();
    },
    [x]
  ), S = ct(
    (T) => {
      Ha(t, T);
    },
    [t]
  ), M = ct(
    (T) => {
      Oa(t, T);
    },
    [t]
  ), A = ct(
    (T) => {
      Oh(T), or.clear(), x();
    },
    [x]
  ), R = ct((T) => {
    y((O) => {
      const $ = new Set(O);
      return $.has(T) ? $.delete(T) : $.add(T), $;
    });
  }, []), F = Ut(() => {
    if (!f.trim()) return null;
    const T = f.toLowerCase(), O = Ih(f), $ = p.filter(
      (at) => at.name.toLowerCase().includes(T)
    );
    return { excalidraw: O, personal: $ };
  }, [f, p]);
  return !e || !r ? null : Je(
    /* @__PURE__ */ v(
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
        onPointerDown: (T) => T.stopPropagation(),
        children: [
          /* @__PURE__ */ v("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
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
                onChange: (T) => m(T.target.value),
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
              children: F !== null ? F.excalidraw.length === 0 && F.personal.length === 0 ? /* @__PURE__ */ u(
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
              ) : /* @__PURE__ */ v(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 4
                  },
                  children: [
                    F.personal.map((T) => /* @__PURE__ */ u(
                      Ga,
                      {
                        item: T,
                        onClick: () => M(T),
                        onRemove: () => A(T.id),
                        theme: s
                      },
                      T.id
                    )),
                    F.excalidraw.map(({ library: T, item: O }) => /* @__PURE__ */ u(
                      Xa,
                      {
                        item: O,
                        libId: T.id,
                        onClick: () => S(O),
                        theme: s
                      },
                      O.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ v(wt, { children: [
                p.length > 0 && /* @__PURE__ */ u(
                  Kh,
                  {
                    items: p,
                    onPlace: M,
                    onRemove: A,
                    theme: s
                  }
                ),
                c.length === 0 && p.length === 0 ? /* @__PURE__ */ v(
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
                ) : c.map((T) => {
                  const O = g.has(T.id);
                  return /* @__PURE__ */ u(
                    qh,
                    {
                      lib: T,
                      expanded: O,
                      onToggle: () => R(T.id),
                      onPlace: S,
                      onUninstall: () => k(T.id),
                      theme: s
                    },
                    T.id
                  );
                })
              ] })
            }
          ),
          /* @__PURE__ */ v(
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
                      var T;
                      return (T = l.current) == null ? void 0 : T.click();
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
function qh({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: r,
  onUninstall: n,
  theme: s
}) {
  const { labels: i } = qt(), [a, l] = ot(null);
  return kt(() => {
    e && a === null && l(vs(t.id));
  }, [e, a, t.id]), /* @__PURE__ */ v("div", { style: { marginBottom: 4 }, children: [
    /* @__PURE__ */ v(
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
          Xa,
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
function Kh({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = qt(), [s, i] = ot(!0);
  return /* @__PURE__ */ v("div", { style: { marginBottom: 4 }, children: [
    /* @__PURE__ */ v(
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
          Ga,
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
async function Uh(t, e, o = 1, r = 20, n) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${r}`;
  return (await fetch(s, { signal: n, credentials: "include" })).json();
}
async function vi(t, e = 1, o = 20, r) {
  const n = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(n, { signal: r, credentials: "include" })).json();
}
const rs = "application/x-spatialboard-gif-item";
function Ya(t, e, o, r) {
  const n = e.file.hd.gif, s = 400, i = 300;
  let a = n.width, l = n.height;
  const c = Math.min(1, s / a, i / l);
  a = Math.round(a * c), l = Math.round(l * c);
  const d = o ?? window.innerWidth / 2, p = r ?? window.innerHeight / 2, h = t.screenToCanvas(d, p), f = {
    id: Tt(10),
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
function Zh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  baseUrl: n
}) {
  const s = Zt(), { labels: i } = qt(), a = ht(null), l = ht(null), [c, d] = ot(""), [p, h] = ot([]), [f, m] = ot(!1), [g, y] = ot(1), [x, b] = ot(!1), k = ht();
  kt(() => {
    if (!e) return;
    const F = (T) => {
      a.current && !a.current.contains(T.target) && o();
    };
    return document.addEventListener("pointerdown", F), () => document.removeEventListener("pointerdown", F);
  }, [e, o]), kt(() => {
    if (!e || c.trim()) return;
    const F = new AbortController();
    return m(!0), vi(n, 1, 30, F.signal).then((T) => {
      h(T.data.data.filter((O) => O.type !== "ad")), y(1), b(T.data.has_next);
    }).catch(() => {
    }).finally(() => m(!1)), () => F.abort();
  }, [e, n, c]);
  const S = ct(
    (F, T, O) => {
      if (!F.trim()) return;
      const $ = new AbortController();
      return m(!0), Uh(n, F, T, 30, $.signal).then((at) => {
        const ft = at.data.data.filter((G) => G.type !== "ad");
        h((G) => O ? [...G, ...ft] : ft), y(T), b(at.data.has_next);
      }).catch(() => {
      }).finally(() => m(!1)), $;
    },
    [n]
  ), M = ct(
    (F) => {
      if (d(F), k.current && clearTimeout(k.current), !F.trim()) {
        h([]), y(1), b(!1);
        return;
      }
      k.current = setTimeout(() => {
        S(F, 1, !1);
      }, 350);
    },
    [S]
  ), A = ct(() => {
    const F = l.current;
    !F || f || !x || F.scrollTop + F.clientHeight >= F.scrollHeight - 100 && (c.trim() ? S(c, g + 1, !0) : (m(!0), vi(n, g + 1, 30).then((T) => {
      const O = T.data.data.filter(($) => $.type !== "ad");
      h(($) => [...$, ...O]), y(g + 1), b(T.data.has_next);
    }).catch(() => {
    }).finally(() => m(!1))));
  }, [f, x, c, g, S, n]), R = ct(
    (F) => {
      Ya(t, F);
    },
    [t]
  );
  return !e || !r ? null : Je(
    /* @__PURE__ */ v(
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
        onPointerDown: (F) => F.stopPropagation(),
        children: [
          /* @__PURE__ */ v("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
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
                onChange: (F) => M(F.target.value),
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
          /* @__PURE__ */ v(
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
                    children: p.map((F) => /* @__PURE__ */ u(
                      Qh,
                      {
                        item: F,
                        onClick: () => R(F),
                        engine: t,
                        theme: s
                      },
                      F.id
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
function Qh({
  item: t,
  onClick: e,
  engine: o,
  theme: r
}) {
  const n = t.file.sm.webp, s = n.width / n.height, i = ct(
    (a) => {
      a.dataTransfer.setData(rs, JSON.stringify(t)), a.dataTransfer.effectAllowed = "copy";
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
function Jh({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [r, n] = ot(""), s = ht(null), i = ht(null);
  kt(() => {
    var p;
    (p = s.current) == null || p.focus();
  }, []);
  const a = Ut(() => Ms(t, 56), [t]), l = ct(() => {
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
  return Je(
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
        children: /* @__PURE__ */ v(
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
              /* @__PURE__ */ v("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
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
function ns(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function $h(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function ja(t, e, o, r) {
  return new Promise((n) => {
    const s = $h(t), i = new Image();
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
        id: Tt(10),
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
async function _h(t, e, o, r) {
  const { x: n, y: s } = t.screenToCanvas(o, r), i = await ja(e, n, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
const Si = {
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
}, tu = Me(function({
  node: e,
  zoom: o,
  showHandles: r = !0,
  measuredHeights: n,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const a = e.h === "auto" ? (n == null ? void 0 : n[e.id]) ?? 100 : e.h, l = e.rotation || 0, c = e.x + e.w / 2, d = e.y + a / 2, p = 8 / o, h = p / 2, f = 25 / o, m = !!e.locked, g = [
    { pos: "nw", cx: e.x, cy: e.y },
    { pos: "n", cx: e.x + e.w / 2, cy: e.y },
    { pos: "ne", cx: e.x + e.w, cy: e.y },
    { pos: "e", cx: e.x + e.w, cy: e.y + a / 2 },
    { pos: "se", cx: e.x + e.w, cy: e.y + a },
    { pos: "s", cx: e.x + e.w / 2, cy: e.y + a },
    { pos: "sw", cx: e.x, cy: e.y + a },
    { pos: "w", cx: e.x, cy: e.y + a / 2 }
  ];
  return /* @__PURE__ */ v("g", { transform: `rotate(${l}, ${c}, ${d})`, children: [
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
      const y = 16 / o, x = e.x + e.w - y - 4 / o, b = e.y - y - 4 / o;
      return /* @__PURE__ */ v("g", { transform: `translate(${x}, ${b})`, children: [
        /* @__PURE__ */ u(
          "rect",
          {
            x: 0,
            y: 0,
            width: y,
            height: y,
            rx: 3 / o,
            fill: "#f59e0b"
          }
        ),
        /* @__PURE__ */ v("g", { transform: `scale(${y / 24})`, children: [
          /* @__PURE__ */ u("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ u("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    r && !m && g.map(({ pos: y, cx: x, cy: b }) => /* @__PURE__ */ u(
      "rect",
      {
        x: x - h,
        y: b - h,
        width: p,
        height: p,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: tn(y, l),
          pointerEvents: "auto"
        },
        onPointerDown: (k) => {
          k.stopPropagation(), s == null || s(e.id, y, k);
        }
      },
      y
    )),
    r && !m && /* @__PURE__ */ v(wt, { children: [
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
          onPointerDown: (y) => {
            y.stopPropagation(), i == null || i(e.id, y);
          }
        }
      )
    ] })
  ] });
}), eu = Me(function({
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
  let m, g;
  if (a && e.data.sourcePort) {
    const pt = a.get(o.type);
    pt != null && pt.ports && (m = fr(o, pt.ports, e.data.sourcePort, n.zoom, i) ?? void 0);
  }
  if (a && e.data.targetPort) {
    const pt = a.get(r.type);
    pt != null && pt.ports && (g = fr(r, pt.ports, e.data.targetPort, n.zoom, i) ?? void 0);
  }
  const y = Le(
    o,
    r,
    f,
    i,
    e.data.sourceHandle,
    e.data.targetHandle,
    e.data.midpointOffset,
    e.data.curveOffset,
    m,
    g,
    e.data.sourceT,
    e.data.targetT,
    e.data.attachmentGap
  ), { path: x, x1: b, y1: k, x2: S, y2: M, labelX: A, labelY: R, arrowAngle: F, tailAngle: T, kinkHandle: O } = y, $ = s.has(e.id), at = e.data.strokeWidth, ft = e.data.style === "dashed" ? `${8 * at},${4 * at}` : e.data.style === "dotted" ? `${2 * at},${3 * at}` : void 0, G = Math.max(8, at * 3), st = e.data.arrowHeadSize ?? G, N = e.data.arrowTailSize ?? G, D = e.data.animated, Z = p == null ? void 0 : p.has(e.id), j = (d == null ? void 0 : d.edgeId) === e.id, J = !!(h && h.size > 0 && e.data.sourcePort && e.data.targetPort && h.has(e.data.fromId) && h.has(e.data.toId)), Y = J ? "#ef4444" : e.data.color, tt = e.data.roughness ?? 0, rt = Ut(() => tt <= 0 ? null : {
    stroke: Y,
    roughness: tt,
    strokeWidth: at,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [Y, tt, at, e.data.style, e.id]);
  let Q = null, K = null, et = null;
  rt && (Q = Rn(x, rt), e.data.arrowHead === "arrow" && (K = Rn(zo(S, M, F, st), { ...rt, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (et = Rn(zo(b, k, T, N), { ...rt, strokeLineDash: void 0 })));
  const gt = Ut(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), lt = Ut(() => {
    if (!D) return;
    const pt = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", Ct = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", St = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${pt} ${Ct} ${St} infinite` };
  }, [D, e.data.animatedDirection]), vt = Ut(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), xt = Ut(
    () => Z ? { filter: "saturate(0)" } : void 0,
    [Z]
  );
  return /* @__PURE__ */ v("g", { opacity: j ? 0.15 : Z ? 0.25 : void 0, style: xt, children: [
    /* @__PURE__ */ u(
      "path",
      {
        d: x,
        stroke: "transparent",
        strokeWidth: Math.max(at + 16 / n.zoom, 20 / n.zoom),
        strokeLinecap: "round",
        fill: "none",
        style: { pointerEvents: "stroke", cursor: "pointer" }
      }
    ),
    J && /* @__PURE__ */ u(
      "path",
      {
        d: x,
        stroke: "#ef4444",
        strokeWidth: at + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: gt
      }
    ),
    $ && /* @__PURE__ */ u(
      "path",
      {
        d: x,
        stroke: "#3b82f6",
        strokeWidth: at + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    Q ? Q.map((pt, Ct) => /* @__PURE__ */ u(
      "path",
      {
        d: pt.d,
        stroke: pt.stroke,
        strokeWidth: pt.strokeWidth,
        strokeDasharray: pt.strokeDasharray,
        strokeLinecap: "round",
        fill: pt.fill ?? "none",
        style: D ? lt : void 0
      },
      Ct
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: x,
        stroke: Y,
        strokeWidth: at,
        strokeDasharray: D ? "12,8" : J ? `${6 * at},${4 * at}` : ft,
        strokeLinecap: "round",
        fill: "none",
        style: J ? vt : lt
      }
    ),
    e.data.arrowHead === "arrow" && (K ? K.map((pt, Ct) => /* @__PURE__ */ u(
      "path",
      {
        d: pt.d,
        stroke: pt.stroke,
        strokeWidth: pt.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: pt.fill ?? "none"
      },
      `ah${Ct}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: zo(S, M, F, st),
        fill: "none",
        stroke: Y,
        strokeWidth: at,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: Yr(S, M, F, st),
        fill: Y,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: S,
        cy: M,
        r: st * 0.25,
        fill: Y
      }
    ),
    e.data.arrowTail === "arrow" && (et ? et.map((pt, Ct) => /* @__PURE__ */ u(
      "path",
      {
        d: pt.d,
        stroke: pt.stroke,
        strokeWidth: pt.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: pt.fill ?? "none"
      },
      `at${Ct}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: zo(b, k, T, N),
        fill: "none",
        stroke: Y,
        strokeWidth: at,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: Yr(b, k, T, N),
        fill: Y,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: b,
        cy: k,
        r: N * 0.25,
        fill: Y
      }
    ),
    e.data.label && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u(
        "rect",
        {
          x: A - (e.data.label.length * 3.5 + 6) / n.zoom,
          y: R - 8 / n.zoom,
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
          y: R + 4 / n.zoom,
          fill: Y,
          fontSize: 12 / n.zoom,
          textAnchor: "middle",
          style: { pointerEvents: "none" },
          children: e.data.label
        }
      )
    ] }),
    $ && !j && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u(
        "circle",
        {
          cx: b,
          cy: k,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (pt) => {
            pt.stopPropagation(), l == null || l(e.id, "source", pt);
          }
        }
      ),
      /* @__PURE__ */ u(
        "circle",
        {
          cx: S,
          cy: M,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (pt) => {
            pt.stopPropagation(), l == null || l(e.id, "target", pt);
          }
        }
      )
    ] }),
    $ && !j && O && /* @__PURE__ */ u(
      "circle",
      {
        cx: O.x,
        cy: O.y,
        r: 5 / n.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / n.zoom,
        style: {
          cursor: O.axis === "xy" ? "move" : O.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (pt) => {
          pt.stopPropagation(), c == null || c(e.id, O.axis, O.min, O.max, pt);
        }
      }
    )
  ] });
});
function ou({
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
  eraserTrail: g,
  laserTrail: y,
  mode: x,
  freeFormEdges: b,
  hoveredNodeId: k,
  cursorCanvasPos: S,
  registry: M,
  onPortHandleDown: A,
  cycleNodeIds: R,
  containerTypes: F,
  alignGuides: T
}) {
  const O = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, $ = t.filter(
    (G) => G.type !== "edge" && G.type !== "content" && G.type !== "image"
  ), at = t.filter((G) => G.type === "edge").sort((G, st) => G.z - st.z), ft = Ut(() => new Map(t.map((G) => [G.id, G])), [t]);
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
      children: /* @__PURE__ */ v("g", { transform: O, children: [
        at.map((G) => {
          const st = ft.get(G.data.fromId), N = ft.get(G.data.toId);
          return !st || !N ? null : /* @__PURE__ */ u(
            eu,
            {
              edge: G,
              fromNode: st,
              toNode: N,
              viewport: e,
              selection: o,
              measuredHeights: r,
              registry: M,
              onEdgeEndpointDown: d,
              onKinkHandleDown: p,
              edgeReconnect: f,
              eraserMarkedIds: m,
              cycleNodeIds: R
            },
            G.id
          );
        }),
        x === "edge" && !h && k && S && (() => {
          const G = ft.get(k);
          if (!G || G.type === "edge") return null;
          const st = Ae(G, S.x, S.y, r), N = 4 / e.zoom;
          return /* @__PURE__ */ u("circle", { cx: st.x, cy: st.y, r: N, fill: "#3b82f6", stroke: "white", strokeWidth: 1.5 / e.zoom });
        })(),
        (() => {
          var rt, Q;
          const G = !!h || !!f, st = (h == null ? void 0 : h.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, N = (h == null ? void 0 : h.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, D = (h == null ? void 0 : h.fromNode.id) ?? (f == null ? void 0 : f.anchorNodeId) ?? null;
          let Z = null, j = null, J = null;
          const Y = /* @__PURE__ */ new Set();
          if (G) {
            let K = 1 / 0, et = !1;
            const gt = 50 / e.zoom;
            for (const lt of t) {
              if (lt.type === "edge" || lt.id === D || (Q = (rt = M == null ? void 0 : M.get(lt.type)) == null ? void 0 : rt.ports) != null && Q.length) continue;
              const vt = lt.h === "auto" ? (r == null ? void 0 : r[lt.id]) ?? 100 : lt.h, xt = lt.w * 0.2, pt = vt * 0.2;
              st >= lt.x - xt && st <= lt.x + lt.w + xt && N >= lt.y - pt && N <= lt.y + vt + pt && Y.add(lt.id);
              const Ct = Zn(lt, r), St = F ? F.has(lt.type) : lt.type === "frame";
              for (const Rt of Ct) {
                const dt = Math.hypot(Rt.x - st, Rt.y - N);
                dt >= gt || St && !et && Z || (!St && et || dt < K) && (K = dt, et = St, Z = lt.id, j = Rt.side);
              }
            }
            if (b && Z) {
              const lt = ft.get(Z);
              if (lt) {
                const vt = Ae(lt, st, N, r);
                J = { x: vt.x, y: vt.y };
              }
            }
          }
          const tt = [];
          return b && G && J && tt.push(
            /* @__PURE__ */ u(
              "circle",
              {
                cx: J.x,
                cy: J.y,
                r: 5 / e.zoom,
                fill: "#3b82f6",
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              },
              "freeform-snap-dot"
            )
          ), t.filter((K) => {
            var et, gt;
            return K.type === "edge" || (gt = (et = M == null ? void 0 : M.get(K.type)) == null ? void 0 : et.ports) != null && gt.length ? !1 : o.size <= 1 && o.has(K.id) || !b && G && (K.id === D || Y.has(K.id));
          }).forEach((K) => {
            const et = Zn(K, r), gt = 4 / e.zoom, lt = 26 / e.zoom, vt = K.rotation || 0, xt = K.h === "auto" ? (r == null ? void 0 : r[K.id]) ?? 100 : K.h, pt = K.x + K.w / 2, Ct = K.y + xt / 2, St = h && h.fromNode.id === K.id || f && f.anchorNodeId === K.id, Rt = o.has(K.id) && !G;
            b ? Rt && tt.push(
              /* @__PURE__ */ u("g", { transform: vt ? `rotate(${vt}, ${pt}, ${Ct})` : void 0, children: et.map(({ side: dt }) => {
                const Ht = {
                  top: [K.x + K.w / 2, K.y],
                  bottom: [K.x + K.w / 2, K.y + xt],
                  left: [K.x, K.y + xt / 2],
                  right: [K.x + K.w, K.y + xt / 2]
                }, [_t, oe] = Ht[dt];
                return /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: _t,
                    cy: oe,
                    r: gt,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.8,
                    style: { cursor: "crosshair", pointerEvents: "auto" },
                    onPointerDown: (ie) => {
                      ie.stopPropagation(), c == null || c(K.id, dt, ie);
                    }
                  },
                  `ch-${K.id}-${dt}`
                );
              }) }, `conn-${K.id}`)
            ) : tt.push(
              /* @__PURE__ */ u("g", { transform: vt ? `rotate(${vt}, ${pt}, ${Ct})` : void 0, children: et.map(({ side: dt }) => {
                const Ht = {
                  top: [K.x + K.w / 2, K.y],
                  bottom: [K.x + K.w / 2, K.y + xt],
                  left: [K.x, K.y + xt / 2],
                  right: [K.x + K.w, K.y + xt / 2]
                }, [_t, oe] = Ht[dt], ie = dt === "top" && o.has(K.id) ? 42 / e.zoom : lt;
                let xe = _t, Ce = oe;
                switch (dt) {
                  case "top":
                    Ce = oe - ie;
                    break;
                  case "bottom":
                    Ce = oe + ie;
                    break;
                  case "left":
                    xe = _t - ie;
                    break;
                  case "right":
                    xe = _t + ie;
                    break;
                }
                const we = G && Z === K.id && j === dt;
                return /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: xe,
                    cy: Ce,
                    r: we ? 5 / e.zoom : gt,
                    fill: St || we ? "#3b82f6" : "white",
                    stroke: we ? "white" : G && !St ? "#3b82f6" : "#94a3b8",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: we || G && !St ? 1 : 0.8,
                    style: {
                      cursor: Rt ? "crosshair" : "default",
                      pointerEvents: Rt ? "auto" : "none"
                    },
                    onPointerDown: Rt ? (fe) => {
                      fe.stopPropagation(), c == null || c(K.id, dt, fe);
                    } : void 0
                  },
                  `ch-${K.id}-${dt}`
                );
              }) }, `conn-${K.id}`)
            );
          }), tt;
        })(),
        M && (() => {
          var Y;
          const G = !!h || !!f, st = (h == null ? void 0 : h.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, N = (h == null ? void 0 : h.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, D = (h == null ? void 0 : h.fromNode.id) ?? null, Z = (h == null ? void 0 : h.sourceDirection) === "output" ? "input" : (h == null ? void 0 : h.sourceDirection) === "input" ? "output" : null;
          let j = null, J = null;
          if (G && Z) {
            let tt = 40 / e.zoom;
            for (const rt of t) {
              if (rt.type === "edge" || rt.id === D) continue;
              const Q = M.get(rt.type);
              if (!((Y = Q == null ? void 0 : Q.ports) != null && Y.length)) continue;
              const K = rt.h === "auto" ? (r == null ? void 0 : r[rt.id]) ?? 100 : rt.h, et = 14 / e.zoom, gt = Q.ports.filter((lt) => lt.direction === Z);
              for (let lt = 0; lt < gt.length; lt++) {
                const vt = gt[lt], xt = rt.y + K / (gt.length + 1) * (lt + 1), pt = vt.direction === "input" ? rt.x - et : rt.x + rt.w + et, Ct = Math.hypot(pt - st, xt - N);
                Ct < tt && (tt = Ct, j = rt.id, J = vt.id);
              }
            }
          }
          return t.filter((tt) => {
            var Q;
            if (tt.type === "edge") return !1;
            const rt = M.get(tt.type);
            return !!((Q = rt == null ? void 0 : rt.ports) != null && Q.length);
          }).map((tt) => {
            const Q = M.get(tt.type).ports, K = tt.h === "auto" ? (r == null ? void 0 : r[tt.id]) ?? 100 : tt.h, et = tt.rotation || 0, gt = tt.x + tt.w / 2, lt = tt.y + K / 2, vt = 6 / e.zoom, xt = 14 / e.zoom, pt = Q.filter((Ht) => Ht.direction === "input"), Ct = Q.filter((Ht) => Ht.direction === "output"), St = !G, Rt = (Ht, _t, oe, ie) => {
              const xe = tt.y + K / (oe.length + 1) * (_t + 1), Ce = ie === "input" ? tt.x - xt : tt.x + tt.w + xt, we = Si[Ht.dataType] || Si.any, fe = j === tt.id && J === Ht.id, Bo = fe ? 8 / e.zoom : vt, ye = ie === "input" ? tt.x : tt.x + tt.w, he = ie === "input" ? Ce - vt - 4 / e.zoom : Ce + vt + 4 / e.zoom;
              return /* @__PURE__ */ v("g", { children: [
                /* @__PURE__ */ u(
                  "line",
                  {
                    x1: Ce,
                    y1: xe,
                    x2: ye,
                    y2: xe,
                    stroke: we,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                fe && /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: Ce,
                    cy: xe,
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
                    cx: Ce,
                    cy: xe,
                    r: Bo,
                    fill: fe ? "white" : we,
                    stroke: fe ? we : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: St ? "crosshair" : "default",
                      pointerEvents: St ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: St ? (Fe) => {
                      Fe.stopPropagation(), A == null || A(tt.id, Ht.id, ie, Fe);
                    } : void 0
                  }
                ),
                (() => {
                  const Fe = Ht.label || Ht.id, $e = 9 / e.zoom, ne = 5 / e.zoom, Ge = 2.5 / e.zoom, Ot = Fe.length * $e * 0.62 + ne * 2, go = $e + Ge * 2, C = ie === "input" ? he - Ot : he, ut = xe - go / 2, $t = go / 2, ae = fe ? we : "#1a1a2e", Ie = fe ? we : "#2a2a40", Ye = fe ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ v("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ u(
                      "rect",
                      {
                        x: C,
                        y: ut,
                        width: Ot,
                        height: go,
                        rx: $t,
                        ry: $t,
                        fill: ae,
                        fillOpacity: fe ? 0.9 : 0.85,
                        stroke: Ie,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ u(
                      "text",
                      {
                        x: C + Ot / 2,
                        y: xe + $e * 0.35,
                        fill: Ye,
                        fontSize: $e,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: Fe
                      }
                    )
                  ] });
                })()
              ] }, `port-${tt.id}-${Ht.id}`);
            }, dt = R == null ? void 0 : R.has(tt.id);
            return /* @__PURE__ */ v("g", { transform: et ? `rotate(${et}, ${gt}, ${lt})` : void 0, children: [
              pt.map((Ht, _t) => Rt(Ht, _t, pt, "input")),
              Ct.map((Ht, _t) => Rt(Ht, _t, Ct, "output")),
              dt && (() => {
                const Ht = 10 / e.zoom, _t = tt.x + tt.w + Ht * 0.3, oe = tt.y - Ht * 0.3;
                return /* @__PURE__ */ v("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: _t,
                      cy: oe,
                      r: Ht,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ u(
                    "text",
                    {
                      x: _t,
                      y: oe + 4 / e.zoom,
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
            ] }, `ports-${tt.id}`);
          });
        })(),
        h && (() => {
          if (h.sourcePort && M) {
            const et = h.fromNode, gt = M.get(et.type), lt = gt != null && gt.ports ? fr(et, gt.ports, h.sourcePort, e.zoom, r) : null;
            lt ? (lt.x, lt.y) : Sn(et, h.cursorX, h.cursorY, r);
          } else if (h.sourceT !== void 0) {
            const et = h.fromNode, gt = et.h === "auto" ? (r == null ? void 0 : r[et.id]) ?? 100 : et.h, lt = jr(et, gt, h.sourceT);
            lt.x, lt.y;
          } else if (h.sourceHandle) {
            const et = h.fromNode, gt = et.h === "auto" ? (r == null ? void 0 : r[et.id]) ?? 100 : et.h, lt = {
              top: [et.x + et.w / 2, et.y],
              bottom: [et.x + et.w / 2, et.y + gt],
              left: [et.x, et.y + gt / 2],
              right: [et.x + et.w, et.y + gt / 2]
            }, vt = h.sourceHandle;
            vt === "top" ? 42 / e.zoom : 26 / e.zoom;
            const [xt, pt] = lt[vt];
            et.rotation && (et.x + et.w / 2, et.y + gt / 2, et.rotation * Math.PI / 180);
          } else
            Sn(h.fromNode, h.cursorX, h.cursorY, r);
          const G = h.cursorX, st = h.cursorY, N = h.edgeColor || "#3b82f6", D = h.edgeStrokeWidth || 2, Z = h.edgeStyle || "solid", j = Z === "dashed" ? `${8 * D},${4 * D}` : Z === "dotted" ? `${2 * D},${3 * D}` : void 0, J = Math.max(8, D * 3), Y = 4 / e.zoom;
          let tt = null, rt;
          const Q = 50 / e.zoom;
          for (const et of t) {
            if (et.type === "edge" || et.id === h.fromNode.id) continue;
            const gt = et.h === "auto" ? (r == null ? void 0 : r[et.id]) ?? 100 : et.h, lt = et.w * 0.2, vt = gt * 0.2;
            if (G >= et.x - lt && G <= et.x + et.w + lt && st >= et.y - vt && st <= et.y + gt + vt) {
              const xt = Ae(et, G, st, r);
              if (Math.hypot(xt.x - G, xt.y - st) < Q) {
                tt = et, rt = xt.t;
                break;
              }
            }
          }
          let K;
          if (tt)
            K = Le(
              h.fromNode,
              tt,
              h.edgeType || "bezier",
              r,
              h.sourceHandle,
              void 0,
              void 0,
              void 0,
              void 0,
              void 0,
              h.sourceT,
              rt,
              h.attachmentGap
            );
          else {
            const et = {
              id: "__preview__",
              type: "shape",
              x: G,
              y: st,
              w: 0,
              h: 0,
              data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
            };
            K = Le(
              h.fromNode,
              et,
              h.edgeType || "bezier",
              r,
              h.sourceHandle,
              void 0,
              void 0,
              void 0,
              void 0,
              void 0,
              h.sourceT,
              void 0,
              h.attachmentGap
            );
          }
          return /* @__PURE__ */ v("g", { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: K.path,
                stroke: N,
                strokeWidth: D,
                strokeDasharray: j,
                strokeLinecap: "round",
                fill: "none"
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: zo(K.x2, K.y2, K.arrowAngle, J),
                fill: "none",
                stroke: N,
                strokeWidth: D,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            /* @__PURE__ */ u(
              "circle",
              {
                cx: K.x1,
                cy: K.y1,
                r: Y,
                fill: N,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            ),
            tt && /* @__PURE__ */ u(
              "circle",
              {
                cx: K.x2,
                cy: K.y2,
                r: Y,
                fill: N,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            )
          ] });
        })(),
        f && (() => {
          const G = ft.get(f.anchorNodeId);
          if (!G) return null;
          let st, N;
          if (f.anchorHandle) {
            const D = G.h === "auto" ? (r == null ? void 0 : r[G.id]) ?? 100 : G.h, Z = {
              top: [G.x + G.w / 2, G.y],
              bottom: [G.x + G.w / 2, G.y + D],
              left: [G.x, G.y + D / 2],
              right: [G.x + G.w, G.y + D / 2]
            }, j = f.anchorHandle, J = j === "top" ? 42 / e.zoom : 26 / e.zoom, [Y, tt] = Z[j];
            let rt = Y, Q = tt;
            switch (j) {
              case "top":
                Q = tt - J;
                break;
              case "bottom":
                Q = tt + J;
                break;
              case "left":
                rt = Y - J;
                break;
              case "right":
                rt = Y + J;
                break;
            }
            if (G.rotation) {
              const K = G.x + G.w / 2, et = G.y + D / 2, gt = G.rotation * Math.PI / 180, lt = Math.cos(gt), vt = Math.sin(gt), xt = rt - K, pt = Q - et;
              st = K + xt * lt - pt * vt, N = et + xt * vt + pt * lt;
            } else
              st = rt, N = Q;
          } else {
            const D = Sn(G, f.cursorX, f.cursorY, r);
            st = D.x, N = D.y;
          }
          return /* @__PURE__ */ u(
            "line",
            {
              x1: st,
              y1: N,
              x2: f.cursorX,
              y2: f.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && x !== "edge" && !h && !f && $.filter((G) => o.has(G.id)).map((G) => /* @__PURE__ */ u(
          tu,
          {
            node: G,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: r,
            onHandlePointerDown: a,
            onRotateStart: l
          },
          `sel-${G.id}`
        )),
        n && n.points.length > 1 && (() => {
          const G = n.strokeStyle === "dashed" || n.strokeStyle === "dotted", st = n.opacity ?? 1;
          if (G) {
            const N = n.points, D = ["M", N[0][0], N[0][1]];
            for (let J = 1; J < N.length; J++) {
              const [Y, tt] = N[J], [rt, Q] = N[J - 1];
              D.push("Q", rt, Q, (rt + Y) / 2, (Q + tt) / 2);
            }
            const Z = N[N.length - 1];
            D.push("L", Z[0], Z[1]);
            const j = Qe(n.strokeStyle);
            return /* @__PURE__ */ u(
              "path",
              {
                d: D.join(" "),
                fill: "none",
                stroke: n.color,
                strokeWidth: n.width,
                strokeDasharray: j == null ? void 0 : j.map((J) => J * Math.max(n.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: st
              }
            );
          }
          return /* @__PURE__ */ u(
            "path",
            {
              d: gs(n.points, {
                size: n.width
              }),
              fill: n.color,
              opacity: st
            }
          );
        })(),
        s && i && (() => {
          const G = Math.min(s.startX, s.endX), st = Math.min(s.startY, s.endY), N = Math.abs(s.endX - s.startX), D = Math.abs(s.endY - s.startY);
          if (N < 2 && D < 2) return null;
          const Z = i, j = Z.shapeType || "rect", J = Z.opacity ?? 1, Y = Qe(Z.strokeStyle), tt = Z.edgeStyle === "round", rt = s.startX, Q = s.startY, K = s.endX, et = s.endY, gt = {
            stroke: Z.stroke,
            fill: Z.fill,
            fillStyle: Z.fillStyle,
            roughness: Z.roughness,
            strokeWidth: Z.strokeWidth,
            strokeLineDash: Y,
            seed: "__preview__"
          };
          let lt = null;
          if (Z.roughness > 0)
            switch (j) {
              case "rect":
                lt = mr(0, 0, N, D, gt, tt);
                break;
              case "ellipse":
                lt = on(N / 2, D / 2, N, D, gt);
                break;
              case "diamond":
                lt = rn(0, 0, N, D, gt, tt);
                break;
              case "line":
                lt = To(0, et - Q > 0 ? 0 : D, N, et - Q > 0 ? D : 0, gt);
                break;
              case "arrow":
                lt = nn(0, et - Q > 0 ? 0 : D, N, et - Q > 0 ? D : 0, gt);
                break;
            }
          if (lt) {
            const Ct = j === "line" || j === "arrow" ? Math.min(rt, K) : G, St = j === "line" || j === "arrow" ? Math.min(Q, et) : st;
            return /* @__PURE__ */ u("g", { transform: `translate(${Ct}, ${St})`, opacity: J, children: lt.map((Rt, dt) => /* @__PURE__ */ u(
              "path",
              {
                d: Rt.d,
                stroke: Rt.stroke,
                strokeWidth: Rt.strokeWidth,
                fill: Rt.fill,
                strokeDasharray: Rt.strokeDasharray,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              dt
            )) });
          }
          const vt = Y == null ? void 0 : Y.join(","), xt = Z.fill || "none";
          if (j === "ellipse")
            return /* @__PURE__ */ u(
              "ellipse",
              {
                cx: G + N / 2,
                cy: st + D / 2,
                rx: N / 2,
                ry: D / 2,
                stroke: Z.stroke,
                strokeWidth: Z.strokeWidth,
                fill: xt,
                strokeDasharray: vt,
                opacity: J
              }
            );
          if (j === "diamond")
            return /* @__PURE__ */ u(
              "polygon",
              {
                points: `${G + N / 2},${st} ${G + N},${st + D / 2} ${G + N / 2},${st + D} ${G},${st + D / 2}`,
                stroke: Z.stroke,
                strokeWidth: Z.strokeWidth,
                fill: xt,
                strokeDasharray: vt,
                opacity: J
              }
            );
          if (j === "line" || j === "arrow")
            return /* @__PURE__ */ v("g", { opacity: J, children: [
              /* @__PURE__ */ u(
                "line",
                {
                  x1: rt,
                  y1: Q,
                  x2: K,
                  y2: et,
                  stroke: Z.stroke,
                  strokeWidth: Z.strokeWidth,
                  strokeDasharray: vt
                }
              ),
              j === "arrow" && (() => {
                const Ct = Math.atan2(et - Q, K - rt), St = Math.max(12, Z.strokeWidth * 4), Rt = Math.PI / 6, dt = K - St * Math.cos(Ct - Rt), Ht = et - St * Math.sin(Ct - Rt), _t = K - St * Math.cos(Ct + Rt), oe = et - St * Math.sin(Ct + Rt);
                return /* @__PURE__ */ u(
                  "polyline",
                  {
                    points: `${dt},${Ht} ${K},${et} ${_t},${oe}`,
                    stroke: Z.stroke,
                    strokeWidth: Z.strokeWidth,
                    fill: "none"
                  }
                );
              })()
            ] });
          const pt = tt ? Fo(N, D) : 0;
          return /* @__PURE__ */ u(
            "rect",
            {
              x: G,
              y: st,
              width: N,
              height: D,
              rx: pt || void 0,
              ry: pt || void 0,
              stroke: Z.stroke,
              strokeWidth: Z.strokeWidth,
              fill: xt,
              strokeDasharray: vt,
              opacity: J
            }
          );
        })(),
        g && g.length > 1 && (() => {
          const G = performance.now(), st = 400, N = 6 / e.zoom, D = [`M${g[0][0]},${g[0][1]}`];
          if (g.length === 2)
            D.push(`L${g[1][0]},${g[1][1]}`);
          else {
            for (let K = 0; K < g.length - 1; K++) {
              const et = (g[K][0] + g[K + 1][0]) / 2, gt = (g[K][1] + g[K + 1][1]) / 2;
              D.push(`Q${g[K][0]},${g[K][1]},${et},${gt}`);
            }
            const Q = g[g.length - 1];
            D.push(`L${Q[0]},${Q[1]}`);
          }
          const Z = D.join(" "), j = (G - g[g.length - 1][2]) / st, J = (G - g[0][2]) / st, Y = Math.max(0, 0.85 * (1 - j)), tt = Math.max(0, 0.85 * (1 - J)), rt = (Y + tt) / 2;
          return rt <= 0 ? null : /* @__PURE__ */ v(wt, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: Z,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: N * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: rt * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: Z,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: N,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: rt
              }
            )
          ] });
        })(),
        y && y.length > 1 && (() => {
          const G = performance.now(), st = 1560, N = 6 / e.zoom, D = [];
          let Z = !1, j = !1;
          for (let gt = 0; gt < y.length; gt++) {
            const lt = y[gt];
            if (isNaN(lt[0])) {
              Z = !1, j = !1;
              continue;
            }
            if (!Z)
              D.push(`M${lt[0]},${lt[1]}`), Z = !0, j = !0;
            else if (j) {
              const vt = gt + 1 < y.length && !isNaN(y[gt + 1][0]) ? y[gt + 1] : null;
              if (vt) {
                const xt = (lt[0] + vt[0]) / 2, pt = (lt[1] + vt[1]) / 2;
                D.push(`Q${lt[0]},${lt[1]},${xt},${pt}`);
              } else
                D.push(`L${lt[0]},${lt[1]}`);
            }
          }
          if (D.length === 0) return null;
          const J = D.join(" "), Y = y.filter((gt) => !isNaN(gt[0]));
          if (Y.length === 0) return null;
          const tt = (G - Y[Y.length - 1][2]) / st, rt = (G - Y[0][2]) / st, Q = Math.max(0, 0.85 * (1 - tt)), K = Math.max(0, 0.85 * (1 - rt)), et = (Q + K) / 2;
          return et <= 0 ? null : /* @__PURE__ */ v(wt, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: J,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: N * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: et * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: J,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: N,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: et
              }
            )
          ] });
        })(),
        T && T.length > 0 && T.map((G, st) => /* @__PURE__ */ u(
          "line",
          {
            x1: G.axis === "x" ? G.position : G.start,
            y1: G.axis === "x" ? G.start : G.position,
            x2: G.axis === "x" ? G.position : G.end,
            y2: G.axis === "x" ? G.end : G.position,
            stroke: "#f472b6",
            strokeWidth: 1 / e.zoom,
            strokeDasharray: `${3 / e.zoom} ${2 / e.zoom}`,
            opacity: 0.8
          },
          `guide-${st}`
        ))
      ] })
    }
  );
}
function ru({
  x: t,
  y: e,
  sections: o,
  onClose: r
}) {
  const n = ht(null);
  kt(() => {
    var m;
    const p = (g) => {
      n.current && !n.current.contains(g.target) && r();
    }, h = (g) => {
      g.key === "Escape" && r();
    }, f = ((m = n.current) == null ? void 0 : m.ownerDocument) ?? document;
    return f.addEventListener("pointerdown", p, !0), f.addEventListener("keydown", h), () => {
      f.removeEventListener("pointerdown", p, !0), f.removeEventListener("keydown", h);
    };
  }, [r]), kt(() => {
    const p = n.current;
    if (!p) return;
    const h = p.getBoundingClientRect(), f = p.ownerDocument.defaultView ?? window;
    let m = t, g = e;
    h.right > f.innerWidth && (m = t - h.width), h.bottom > f.innerHeight && (g = e - h.height), m = Math.max(0, m), g = Math.max(0, g), p.style.left = `${m}px`, p.style.top = `${g}px`;
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
      children: o.map((p, h) => /* @__PURE__ */ v("div", { children: [
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
        p.items.map((f, m) => /* @__PURE__ */ v(
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
            onMouseEnter: (g) => {
              f.disabled || (g.currentTarget.style.background = "rgba(255,255,255,0.08)");
            },
            onMouseLeave: (g) => {
              g.currentTarget.style.background = "transparent";
            },
            children: [
              /* @__PURE__ */ v("span", { children: [
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
const Va = "sbd-clipboard", nu = "sbd-nodes:";
function qa(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let r = "";
  for (let n = 0; n < o.length; n++) r += String.fromCharCode(o[n]);
  return btoa(r);
}
function Mi(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) o[n] = e.charCodeAt(n);
    const r = new TextDecoder().decode(o);
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function Ka(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return Mi(e[1]);
  const o = t.match(
    new RegExp(`<!--${nu}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? Mi(o[1]) : null;
}
function Wr(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function Ua(t) {
  return t.map((e) => {
    var n;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), r = (n = e.children) != null && n.length ? `
` + Ua(e.children) : "";
    return o + r;
  }).filter(Boolean).join(`
`);
}
function su(t) {
  var o;
  const e = [];
  for (const r of t)
    switch (r.type) {
      case "content": {
        const n = r.data;
        (o = n.blocks) != null && o.length ? e.push(Ua(n.blocks)) : n.markdown && e.push(n.markdown);
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
function Ci(t, e) {
  const o = su(e), r = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), n = qa(e);
  return t.setData(
    "text/html",
    `<!--${Va}--><div data-sbd-nodes="${n}">${r || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function iu(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, r = o.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, i = null;
  const a = (g) => {
    n = g.clientX, s = g.clientY;
  }, l = (g) => {
    Wr(g.target) || t.selection.size !== 0 && (g.preventDefault(), t.copySelected(), i = Ci(
      g.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (g) => {
    Wr(g.target) || t.selection.size !== 0 && (g.preventDefault(), t.copySelected(), i = Ci(
      g.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, d = async (g) => {
    var F, T, O;
    if (Wr(g.target)) return;
    const { x: y, y: x } = t.screenToCanvas(n, s), b = ((F = g.clipboardData) == null ? void 0 : F.getData("text/html")) || "", k = ((T = g.clipboardData) == null ? void 0 : T.getData("text/plain")) || "";
    if (b.includes(Va) || b.includes("data-sbd-nodes=") || i !== null && k === i) {
      if (i !== null && k === i && t.hasClipboard()) {
        g.preventDefault(), t.pasteClipboard(y, x);
        return;
      }
      const at = Ka(b);
      if (at) {
        g.preventDefault(), t.setClipboard(at), t.pasteClipboard(y, x);
        return;
      }
    }
    const M = (O = g.clipboardData) == null ? void 0 : O.items;
    if (M) {
      for (const $ of Array.from(M))
        if ($.type.startsWith("image/")) {
          g.preventDefault();
          const at = $.getAsFile();
          if (!at) continue;
          const ft = new FileReader();
          ft.onload = () => {
            const G = ft.result, st = new Image();
            st.onload = () => {
              const N = t.screenToCanvas(n, s), D = 400, Z = 300, j = st.naturalWidth / st.naturalHeight, J = Math.min(st.naturalWidth, D), Y = Math.min(st.naturalHeight, Z), tt = j >= 1 ? J : Y * j, rt = j >= 1 ? J / j : Y;
              let Q = G;
              if (b) {
                const et = b.match(/<img[^>]+src=["']([^"']+)["']/i);
                et && /\.(gif|webp|apng)(\?|#|$)/i.test(et[1]) && (Q = et[1].replace(/&amp;/g, "&"));
              }
              const K = {
                id: Tt(10),
                type: "image",
                x: N.x,
                y: N.y,
                w: tt,
                h: rt,
                z: t.nextZ(),
                data: { src: Q }
              };
              t.addNode(K), t.select(K.id);
            }, st.src = G;
          }, ft.readAsDataURL(at);
          return;
        }
    }
    const A = ns(k) ?? ns(b);
    if (A) {
      g.preventDefault();
      const $ = t.screenToCanvas(n, s), at = await ja(
        A,
        $.x,
        $.y,
        t.nextZ()
      );
      at && (t.addNode(at), t.select(at.id));
      return;
    }
    if (lh(k)) {
      const $ = ah(k);
      if ($) {
        g.preventDefault();
        const at = {
          id: Tt(10),
          type: "youtube",
          x: y,
          y: x,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: $, url: k.trim() }
        };
        t.addNode(at), t.select(at.id);
        return;
      }
    }
    const R = b.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (R)
      try {
        const $ = oa(R);
        if ($.length > 0) {
          g.preventDefault();
          const at = {
            id: Tt(10),
            type: "content",
            x: y,
            y: x,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: $, markdown: k, borderColor: "#1e1e2e" }
          };
          t.addNode(at), t.select(at.id);
          return;
        }
      } catch {
      }
    if (k.trim()) {
      g.preventDefault();
      const $ = await us(k), at = {
        id: Tt(10),
        type: "content",
        x: y,
        y: x,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: $, markdown: k, borderColor: "#1e1e2e" }
      };
      t.addNode(at), t.select(at.id);
      return;
    }
    t.hasClipboard() && (g.preventDefault(), t.pasteClipboard(y, x));
  }, p = (g) => {
    const y = g.target;
    if (Wr(y)) return;
    if (t.presentationMode) {
      if (g.key === "ArrowRight" || g.key === " ") {
        g.preventDefault(), t.presentationNext();
        return;
      }
      if (g.key === "ArrowLeft") {
        g.preventDefault(), t.presentationPrev();
        return;
      }
      if (g.key === "Escape") {
        g.preventDefault(), t.exitPresentation();
        return;
      }
      return;
    }
    const x = g.ctrlKey || g.metaKey;
    if (x && g.key === "c") {
      t.copySelected();
      return;
    }
    if (x && g.key === "x") {
      t.copySelected();
      return;
    }
    if (x && g.key.toLowerCase() === "f") {
      g.preventDefault(), o.dispatchEvent(new CustomEvent("sb:search-open"));
      return;
    }
    if (x && g.key === "d") {
      g.preventDefault(), t.duplicateSelected();
      return;
    }
    if (x && g.key === "g") {
      g.preventDefault(), g.shiftKey ? t.ungroupSelected() : t.groupSelected();
      return;
    }
    if (g.shiftKey && !x && g.key === "H") {
      g.preventDefault(), t.flipSelectedHorizontal();
      return;
    }
    if (g.shiftKey && !x && g.key === "V") {
      g.preventDefault(), t.flipSelectedVertical();
      return;
    }
    if (x && g.key === "]") {
      g.preventDefault();
      const b = Array.from(t.selection);
      g.altKey ? t.bringToFront(b) : t.bringForward(b);
      return;
    }
    if (x && g.key === "[") {
      g.preventDefault();
      const b = Array.from(t.selection);
      g.altKey ? t.sendToBack(b) : t.sendBackward(b);
      return;
    }
    if (!x && !g.altKey && !g.shiftKey) {
      if (g.key === "s") {
        t.setMode("select");
        return;
      }
      if (g.key === "p") {
        t.setMode("hand");
        return;
      }
      if (g.key === "d") {
        t.setMode("draw");
        return;
      }
      if (g.key === "g") {
        t.setMode("shape");
        return;
      }
      if (g.key === "t") {
        t.setMode("text");
        return;
      }
      if (g.key === "b") {
        t.setMode("note");
        return;
      }
      if (g.key === "y") {
        t.setMode("sticky");
        return;
      }
      if (g.key === "f") {
        t.setMode("frame");
        return;
      }
      if (g.key === "c") {
        t.setMode("edge");
        return;
      }
      if (g.key === "e") {
        t.setMode("erase");
        return;
      }
      if (g.key === "l") {
        t.toggleLassoSelect();
        return;
      }
      if (g.key === "z") {
        t.setMode("laser");
        return;
      }
    }
    if (g.key === "Delete" || g.key === "Backspace") {
      t.deleteSelected();
      return;
    }
    if (x && g.key === "z") {
      g.preventDefault(), g.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (x && g.key === "a") {
      g.preventDefault(), t.selectMultiple(t.getAllNodes().map((b) => b.id));
      return;
    }
    if (g.key === "Escape") {
      if (t.activeGroupId) {
        t.exitGroup();
        return;
      }
      t.deselectAll(), t.setMode("select");
      return;
    }
    if (x && (g.key === "=" || g.key === "+")) {
      g.preventDefault(), t.zoomIn();
      return;
    }
    if (x && g.key === "-") {
      g.preventDefault(), t.zoomOut();
      return;
    }
    if (x && g.key === "0") {
      g.preventDefault(), t.fitToContent();
      return;
    }
  };
  function h(g, y) {
    g.addEventListener("pointermove", a), g.addEventListener("copy", l), g.addEventListener("cut", c), g.addEventListener("paste", d), y.addEventListener("keydown", p);
  }
  function f(g, y) {
    g.removeEventListener("pointermove", a), g.removeEventListener("copy", l), g.removeEventListener("cut", c), g.removeEventListener("paste", d), y.removeEventListener("keydown", p);
  }
  h(o, r);
  const m = setInterval(() => {
    if (!e) return;
    const g = e.ownerDocument;
    g !== o && (f(o, r), o = g, r = g.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, h(o, r));
  }, 500);
  return () => {
    clearInterval(m), f(o, r);
  };
}
async function Ii(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const r = t.measuredHeights, n = au(o, r, t), s = e.padding ?? 40, i = e.background !== !1, a = e.format === "png", l = n.w + s * 2, c = n.h + s * 2, d = n.x - s, p = n.y - s, h = await Za(o, t, r, d, p, a), f = i ? kr(t.boardBackground).canvasBg : "transparent", m = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${l}" height="${c}" viewBox="0 0 ${l} ${c}">`,
    `<rect width="${l}" height="${c}" fill="${f}"/>`,
    ...h,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    zi(new Blob([m], { type: "image/svg+xml" }), "board.svg");
  else {
    const g = e.scale ?? 4, y = await wu(m, l, c, g);
    zi(y, "board.png");
  }
}
function au(t, e, o) {
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
    const h = Le(
      d,
      p,
      c.data.edgeType,
      e,
      c.data.sourceHandle,
      c.data.targetHandle,
      c.data.midpointOffset,
      c.data.curveOffset,
      void 0,
      void 0,
      c.data.sourceT,
      c.data.targetT,
      c.data.attachmentGap
    );
    r = Math.min(r, h.bounds.x), n = Math.min(n, h.bounds.y), s = Math.max(s, h.bounds.x + h.bounds.w), i = Math.max(i, h.bounds.y + h.bounds.h);
  }
  return isFinite(r) ? { x: r, y: n, w: s - r, h: i - n } : { x: 0, y: 0, w: 100, h: 100 };
}
async function Za(t, e, o, r, n, s) {
  const i = new Map(t.map((c) => [c.id, c])), a = [...t].sort((c, d) => c.z - d.z), l = [];
  for (const c of a) {
    const d = c.x - r, p = c.y - n, h = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        l.push(lu(c, d, p, h));
        break;
      case "content":
        l.push(cu(c, d, p, c.w, h));
        break;
      case "draw":
        l.push(du(c, r, n));
        break;
      case "shape":
        l.push(uu(c, d, p, c.w, h));
        break;
      case "text":
        l.push(pu(c, d, p, c.w, h));
        break;
      case "sticky":
        l.push(fu(c, d, p, c.w, h));
        break;
      case "image":
        l.push(await yu(c, d, p, c.w, h, s));
        break;
      case "youtube":
        l.push(await gu(c, d, p, c.w, h, s));
        break;
      case "edge": {
        const f = c, m = i.get(f.data.fromId), g = i.get(f.data.toId);
        m && g && l.push(bu(f, m, g, o, r, n));
        break;
      }
    }
  }
  return l;
}
function yo(t, e, o, r, n, s, i) {
  const a = [];
  if (s) {
    const l = e + r / 2, c = o + n / 2;
    a.push(`transform="rotate(${s}, ${l}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && a.push(`opacity="${i}"`), `<g ${a.join(" ")}>${t}</g>`;
}
function lu(t, e, o, r) {
  const n = t.data, s = n.backgroundColor || "rgba(0,0,0,0.02)", i = n.borderColor || "#d1d5db", a = n.borderWidth ?? 1, l = an(n.borderStyle, a), c = n.label ? rr(n.label) : "";
  let d = `<rect x="${e}" y="${o}" width="${t.w}" height="${r}" rx="4" fill="${s}" stroke="${i}" stroke-width="${a}"` + (l ? ` stroke-dasharray="${l}"` : "") + "/>";
  return c && (d += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), yo(d, e, o, t.w, r, t.rotation, n.opacity);
}
function cu(t, e, o, r, n) {
  var p;
  const s = t.data, i = ((p = s.markdown) == null ? void 0 : p.trim()) || "", a = s.borderColor, l = s.borderWidth ?? 0, c = an(s.borderStyle, l);
  let d = "";
  return a && l > 0 ? d += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white" stroke="${a}" stroke-width="${l}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : d += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white"/>`, i && (d += Is(i, e + 12, o + 20, r - 24, 14, 1.6, "#374151", "left", "sans-serif")), yo(d, e, o, r, n, t.rotation, s.opacity);
}
function du(t, e, o) {
  const r = t.data, n = r.points.map(
    ([a, l, c]) => [a + t.x - e, l + t.y - o, c]
  );
  if (n.length === 0) return "";
  if (r.tool === "vector")
    return hu(n, r, t);
  const s = Qe(r.strokeStyle);
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
    const a = gs(n, { size: r.strokeWidth });
    a && (i += `<path d="${a}" fill="${r.color}" stroke="none"/>`);
  }
  return r.opacity !== void 0 && r.opacity !== 1 ? `<g opacity="${r.opacity}">${i}</g>` : i;
}
function hu(t, e, o) {
  const r = t.map((l, c) => `${c === 0 ? "M" : "L"}${l[0].toFixed(2)},${l[1].toFixed(2)}`).join(" ") + " Z", n = Qe(e.strokeStyle), s = n ? ` stroke-dasharray="${n.map((l) => l * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${r}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, a = o.h === "auto" ? 0 : o.h;
  return yo(i, o.x, o.y, o.w, a, o.rotation, e.opacity);
}
function uu(t, e, o, r, n) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: Qe(s.strokeStyle),
    seed: t.id
  };
  let a;
  const l = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      a = mr(e, o, r, n, i, l);
      break;
    case "ellipse":
      a = on(e + r / 2, o + n / 2, r, n, i);
      break;
    case "diamond":
      a = rn(e, o, r, n, i, l);
      break;
    case "line": {
      const d = s.startPoint ?? [0, 0], p = s.endPoint ?? [r, n];
      a = To(e + d[0], o + d[1], e + p[0], o + p[1], i);
      break;
    }
    case "arrow": {
      const d = s.startPoint ?? [0, 0], p = s.endPoint ?? [r, n];
      a = nn(e + d[0], o + d[1], e + p[0], o + p[1], i);
      break;
    }
    default:
      a = mr(e, o, r, n, i);
  }
  const c = a.map(
    (d) => `<path d="${d.d}" fill="${d.fill || "none"}" stroke="${d.stroke}" stroke-width="${d.strokeWidth}"` + (d.strokeDasharray ? ` stroke-dasharray="${d.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return yo(c, e, o, r, n, t.rotation, s.opacity);
}
function pu(t, e, o, r, n) {
  const s = t.data, i = n || s.text.split(`
`).length * s.fontSize * 1, a = co(s.fontFamily), l = !!s.borderColor, c = l ? 6 : 0;
  let d = "";
  if (l) {
    const h = s.borderWidth ?? 1, f = an(s.borderStyle, h);
    d += `<rect x="${e}" y="${o}" width="${r}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${h}"` + (f ? ` stroke-dasharray="${f}"` : "") + "/>";
  }
  const p = s.align === "center" ? e + r / 2 : s.align === "right" ? e + r - c : e + c;
  return d += Is(
    s.text,
    p,
    o + c + s.fontSize,
    r - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    a
  ), yo(d, e, o, r, i, t.rotation, s.opacity);
}
function fu(t, e, o, r, n) {
  const s = t.data, i = s.fontSize ?? 16, a = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="2" fill="${s.color}"/>` + Is(s.text, e + 12, o + 12 + i, r - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return yo(a, e, o, r, n, t.rotation, s.opacity);
}
async function yu(t, e, o, r, n, s) {
  const i = t.data;
  let a = i.src;
  if (s && a && !a.startsWith("data:"))
    try {
      a = await Qr(a);
    } catch {
    }
  const l = i.borderColor, c = i.borderWidth ?? 0, d = an(i.borderStyle, c);
  let p = `<image href="${rr(a)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  return l && c > 0 && (p += `<rect x="${e}" y="${o}" width="${r}" height="${n}" fill="none" stroke="${l}" stroke-width="${c}"` + (d ? ` stroke-dasharray="${d}"` : "") + "/>"), yo(p, e, o, r, n, t.rotation, i.opacity);
}
async function gu(t, e, o, r, n, s) {
  const i = t.data;
  let a = dh(i.videoId);
  if (s)
    try {
      a = await Qr(a);
    } catch {
    }
  let l = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="#1a1a1a"/><image href="${rr(a)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + r / 2, d = o + n / 2, p = Math.min(r, n) * 0.12;
  return l += `<circle cx="${c}" cy="${d}" r="${p}" fill="rgba(0,0,0,0.6)"/><path d="${mu(c, d, p * 0.5)}" fill="white"/>`, yo(l, e, o, r, n, t.rotation, i.opacity);
}
function mu(t, e, o) {
  const r = o * 0.15, n = t - o * 0.7 + r, s = e - o, i = t + o + r, a = e, l = n, c = e + o;
  return `M${n},${s} L${i},${a} L${l},${c} Z`;
}
function bu(t, e, o, r, n, s) {
  const i = t.data, a = Le(
    e,
    o,
    i.edgeType,
    r,
    i.sourceHandle,
    i.targetHandle,
    i.midpointOffset,
    i.curveOffset,
    void 0,
    void 0,
    i.sourceT,
    i.targetT,
    i.attachmentGap
  ), l = `translate(${-n}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, d = i.strokeWidth;
  let p = `<path d="${a.path}" fill="none" stroke="${i.color}" stroke-width="${d}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const h = i.arrowHeadSize ?? Math.max(8, d * 3), f = i.arrowTailSize ?? Math.max(8, d * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      p += `<path d="${zo(a.x2, a.y2, a.arrowAngle, h)}" fill="none" stroke="${i.color}" stroke-width="${d}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      p += `<path d="${Yr(a.x2, a.y2, a.arrowAngle, h)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const m = h / 3;
      p += `<circle cx="${a.x2}" cy="${a.y2}" r="${m}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      p += `<path d="${zo(a.x1, a.y1, a.tailAngle, f)}" fill="none" stroke="${i.color}" stroke-width="${d}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      p += `<path d="${Yr(a.x1, a.y1, a.tailAngle, f)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const m = f / 3;
      p += `<circle cx="${a.x1}" cy="${a.y1}" r="${m}" fill="${i.color}"/>`;
    }
  }
  return i.label && (p += `<text x="${a.labelX}" y="${a.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${rr(i.label)}</text>`), `<g transform="${l}">${p}</g>`;
}
function Is(t, e, o, r, n, s, i, a, l) {
  if (!t) return "";
  const c = a === "center" ? "middle" : a === "right" ? "end" : "start", d = xu(t, r, n), p = n * s, h = d.map(
    (f, m) => `<tspan x="${e}" dy="${m === 0 ? 0 : p}">${rr(f)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${n}" fill="${i}" font-family="${rr(l)}" text-anchor="${c}">${h}</text>`;
}
function xu(t, e, o) {
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
function an(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function rr(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Qr(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((r, n) => {
    const s = new FileReader();
    s.onloadend = () => r(s.result), s.onerror = n, s.readAsDataURL(o);
  });
}
function wu(t, e, o, r) {
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
const ku = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), Vo = /* @__PURE__ */ new Map(), vu = 12;
function Su(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const r = o.data.fontFamily;
      r && !ku.has(r) && e.add(r);
    }
  return [...e];
}
async function Mu(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (Vo.has(o)) {
      e.push(Vo.get(o));
      continue;
    }
    try {
      let r;
      if (o === "Excalifont")
        r = await Qr(ra);
      else {
        const a = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!a) continue;
        r = await Qr(a[1]);
      }
      const n = `@font-face { font-family: '${o}'; src: url('${r}') format('woff2'); }`;
      if (Vo.size >= vu) {
        const s = Vo.keys().next().value;
        s !== void 0 && Vo.delete(s);
      }
      Vo.set(o, n), e.push(n);
    } catch {
    }
  }
  return e.join(`
`);
}
async function Cu(t, e) {
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
      const k = b;
      d.has(k.data.fromId) && d.has(k.data.toId) && c.push(b);
    }
  const h = t.measuredHeights, f = await Za(c, t, h, a, l, !0), m = Su(c), g = await Mu(m), y = kr(t.boardBackground).canvasBg, x = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    g ? `<defs><style>${g}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${y}"/>`,
    ...f,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(x)}`;
}
function zi(t, e) {
  const o = URL.createObjectURL(t), r = document.createElement("a");
  r.href = o, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o);
}
const Ti = [
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
], Pi = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function Ai(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const Qa = [
  ...Ti,
  ...Ai(Ti, "phone-landscape"),
  ...Pi,
  ...Ai(Pi, "tablet-landscape"),
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
], Iu = new Map(Qa.map((t) => [t.key, t]));
function ss(t) {
  return Iu.get(t);
}
function Ja(t) {
  return t.w / t.h;
}
const zu = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function Tu() {
  const t = /* @__PURE__ */ new Map();
  for (const e of Qa) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: zu[e] ?? e,
    presets: o
  }));
}
function Pu(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function Wn(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const [i, a] = o[n], [l, c] = o[s];
    a > e != c > e && t < (l - i) * (e - a) / (c - a) + i && (r = !r);
  }
  return r;
}
function Fn(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function Au(t, e, o) {
  try {
    const r = await navigator.clipboard.read();
    let n = null;
    for (const i of r)
      if (i.types.includes("text/html")) {
        const a = await (await i.getType("text/html")).text();
        if (a.includes("sbd-clipboard") || a.includes("data-sbd-nodes=")) {
          const l = Ka(a);
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
          const k = new FileReader();
          k.onload = () => b(k.result), k.readAsDataURL(l);
        }), d = new Image();
        await new Promise((b) => {
          d.onload = () => b(), d.src = c;
        });
        const p = d.naturalWidth / d.naturalHeight, h = Math.min(d.naturalWidth, 400), f = Math.min(d.naturalHeight, 300), m = p >= 1 ? h : f * p, g = p >= 1 ? h / p : f;
        let y = c;
        if (n) {
          const b = n.match(/<img[^>]+src=["']([^"']+)["']/i);
          b && /\.(gif|webp|apng)(\?|#|$)/i.test(b[1]) && (y = b[1].replace(/&amp;/g, "&"));
        }
        const x = {
          id: Tt(10),
          type: "image",
          x: e,
          y: o,
          w: m,
          h: g,
          z: t.nextZ(),
          data: { src: y }
        };
        t.addNode(x), t.select(x.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (n) {
      const i = n.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const a = oa(i);
        if (a.length > 0) {
          const l = {
            id: Tt(10),
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
      const i = await us(s), a = {
        id: Tt(10),
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
async function Ei(t) {
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
`).filter(Boolean).map((a) => `<p>${a}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${qa(e)}">${n || "<p></p>"}</div>`;
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
function Fr(t) {
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
function Ri(t, e) {
  const o = e.x - t.x, r = e.y - t.y;
  return { dist: Math.sqrt(o * o + r * r), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const qo = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function Eu({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: r,
  observeElement: n,
  unobserveElement: s,
  isContainer: i,
  children: a
}) {
  const l = ht(null);
  kt(() => {
    if (t.h !== "auto") return;
    const p = l.current;
    if (!p) return;
    const h = p.offsetHeight;
    return h > 0 && r(t.id, h), n(p, () => {
      const f = p.offsetHeight;
      f > 0 && r(t.id, f);
    }), () => s(p);
  }, [t.id, t.h, r, n, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, d = Ut(() => ({
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
function Ru({
  node: t,
  engine: e,
  onDone: o
}) {
  const r = ht(null), n = ht(t.data.label ?? ""), s = ht(t);
  s.current = t;
  const i = ht(t.data.label ?? "");
  kt(() => () => {
    const d = s.current, p = n.current.trim();
    if (p !== i.current) {
      const f = { data: { ...d.data, label: p || void 0 } }, m = r.current;
      if (m && p) {
        const y = d.h === "auto" ? 100 : d.h, x = m.scrollHeight + 24;
        x > y && (f.h = x);
      }
      e.updateNodeWithHistory(d.id, f);
    }
  }, []);
  const a = t.h === "auto" ? 100 : t.h, l = t.data.labelFontSize ?? 14, c = t.data.fill && t.data.fillStyle === "solid" ? Pu(t.data.fill) : t.data.stroke;
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
            fontFamily: co(t.data.labelFontFamily ?? lo),
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
function Lu({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: r
}) {
  var qs;
  const { labels: n } = qt(), s = ht(null), i = () => {
    var w;
    return ((w = s.current) == null ? void 0 : w.ownerDocument) ?? document;
  }, [a, l] = ot({ w: 0, h: 0 }), [c, d] = ot({ ...t.viewport }), [p, h] = ot(t.getAllNodes()), [f, m] = ot(
    new Set(t.selection)
  ), [g, y] = ot(!1), [x, b] = ot(t.mode), [k, S] = ot(t.activeGroupId), [M, A] = ot(() => t.getSearchState()), [R, F] = ot([]), [T, O] = ot(t.snapToGrid), [$, at] = ot(t.gridSize), [ft, G] = ot(t.smartGuides), [st, N] = ot([]), [D, Z] = ot(t.boardBackground), j = ht(!1), J = ht(!1), Y = ht(/* @__PURE__ */ new Map()), tt = ht(!1), rt = ht(!1), Q = ht(null), K = ht(null), et = ct((w) => {
    i().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: w } }));
  }, []);
  kt(() => {
    const w = (I) => {
      var H, z;
      if (I.key === " " && !I.repeat && !j.current) {
        const B = (H = I.target) == null ? void 0 : H.tagName;
        if (B === "INPUT" || B === "TEXTAREA" || (z = I.target) != null && z.isContentEditable) return;
        j.current = !0;
        const E = s.current;
        E && (E.style.cursor = "grab"), I.preventDefault();
      }
    }, P = (I) => {
      if (I.key === " ") {
        j.current = !1, J.current = !1;
        const H = s.current;
        H && (H.style.cursor = t.lassoSelect ? qo : Fr(t.mode));
      }
    };
    return window.addEventListener("keydown", w), window.addEventListener("keyup", P), () => {
      window.removeEventListener("keydown", w), window.removeEventListener("keyup", P);
    };
  }, []), kt(() => {
    const w = (I) => {
      Y.current.delete(I.pointerId), I.pointerType === "pen" && (rt.current = !1), Y.current.size === 0 && et(!1), Q.current && (clearTimeout(Q.current), Q.current = null, K.current = null);
    }, P = i();
    return P.addEventListener("pointerup", w), P.addEventListener("pointercancel", w), () => {
      P.removeEventListener("pointerup", w), P.removeEventListener("pointercancel", w);
    };
  }, [et]);
  const [gt, lt] = ot(null), [vt, xt] = ot(null), [pt, Ct] = ot(null), [St, Rt] = ot(null);
  kt(() => {
    const w = s.current;
    if (!w) return;
    t.setContainer(w);
    const P = () => {
      const H = w.getBoundingClientRect();
      t.containerOffset = { x: H.left, y: H.top };
    };
    P();
    const I = new ResizeObserver((H) => {
      var E;
      const { width: z, height: B } = ((E = H[0]) == null ? void 0 : E.contentRect) ?? { width: 0, height: 0 };
      l((L) => L.w === z && L.h === B ? L : { w: z, h: B }), t.setContainerSize(z, B), P();
    });
    return I.observe(w), () => I.disconnect();
  }, [t]);
  const [dt, Ht] = ot({}), _t = ct((w, P) => {
    Ht(
      (I) => I[w] === P ? I : { ...I, [w]: P }
    ), t.updateMeasuredHeight(w, P);
  }, [t]), oe = ht(null), ie = ht(/* @__PURE__ */ new Map());
  function xe() {
    return oe.current || (oe.current = new ResizeObserver((w) => {
      var P;
      for (const I of w)
        (P = ie.current.get(I.target)) == null || P(I);
    })), oe.current;
  }
  const Ce = ct((w, P) => {
    ie.current.set(w, P), xe().observe(w);
  }, []), we = ct((w) => {
    var P;
    ie.current.delete(w), (P = oe.current) == null || P.unobserve(w);
  }, []);
  kt(() => () => {
    var w;
    (w = oe.current) == null || w.disconnect(), oe.current = null, ie.current.clear();
  }, []);
  const fe = Ut(() => new Set(p.map((w) => w.id)), [p]);
  kt(() => {
    Ht((w) => {
      let P = !1;
      const I = {};
      for (const [H, z] of Object.entries(w))
        fe.has(H) ? I[H] = z : P = !0;
      return P ? I : w;
    });
  }, [fe]);
  const Bo = ct(
    (w, P, I) => {
      let H, z;
      if (o && w.data.sourcePort) {
        const B = o.get(P.type);
        B != null && B.ports && (H = fr(P, B.ports, w.data.sourcePort, c.zoom, dt) ?? void 0);
      }
      if (o && w.data.targetPort) {
        const B = o.get(I.type);
        B != null && B.ports && (z = fr(I, B.ports, w.data.targetPort, c.zoom, dt) ?? void 0);
      }
      return { sourcePortPos: H, targetPortPos: z };
    },
    [o, c.zoom, dt]
  );
  ct(
    (w) => t.zoomToNode(w),
    [t, n]
  );
  const ye = ct(
    (w, P) => {
      if (!w.rotation)
        return { minX: w.x, minY: w.y, maxX: w.x + w.w, maxY: w.y + P };
      const I = w.x + w.w / 2, H = w.y + P / 2, z = w.rotation * Math.PI / 180, B = Math.cos(z), E = Math.sin(z), L = [
        [w.w / 2, P / 2],
        [-w.w / 2, P / 2],
        [-w.w / 2, -P / 2],
        [w.w / 2, -P / 2]
      ];
      let X = 1 / 0, V = 1 / 0, W = -1 / 0, U = -1 / 0;
      for (const [q, _] of L) {
        const nt = I + q * B - _ * E, mt = H + q * E + _ * B;
        X = Math.min(X, nt), V = Math.min(V, mt), W = Math.max(W, nt), U = Math.max(U, mt);
      }
      return { minX: X, minY: V, maxX: W, maxY: U };
    },
    []
  ), he = 8, Fe = ct(
    (w, P) => P.filter((I) => {
      if (I.type === "edge") {
        const B = I.data, E = t.getNode(B.fromId), L = t.getNode(B.toId);
        if (!E || !L) return !1;
        const { x1: X, y1: V, x2: W, y2: U } = Js(E, L, dt);
        return X >= w.x && X <= w.x + w.w && V >= w.y && V <= w.y + w.h && W >= w.x && W <= w.x + w.w && U >= w.y && U <= w.y + w.h;
      }
      const H = I.h === "auto" ? dt[I.id] ?? 100 : I.h, z = ye(I, H);
      return z.minX >= w.x && z.maxX <= w.x + w.w && z.minY >= w.y && z.maxY <= w.y + w.h;
    }),
    [ye, dt]
  ), $e = ct(
    (w, P) => w.length < 3 ? [] : P.filter((I) => {
      if (I.type === "edge") {
        const E = I, L = t.getNode(E.data.fromId), X = t.getNode(E.data.toId);
        if (!L || !X) return !1;
        const { x1: V, y1: W, x2: U, y2: q } = Js(L, X, dt);
        return Wn(V, W, w) && Wn(U, q, w);
      }
      const H = I.h === "auto" ? dt[I.id] ?? 100 : I.h, z = I.x + I.w / 2, B = I.y + H / 2;
      return Wn(z, B, w);
    }),
    [t, dt]
  ), ne = Ut(() => {
    if (f.size < 2) return null;
    let w = 1 / 0, P = 1 / 0, I = -1 / 0, H = -1 / 0;
    for (const z of f) {
      const B = p.find((X) => X.id === z);
      if (!B || B.type === "edge") continue;
      const E = B.h === "auto" ? dt[B.id] ?? 100 : B.h, L = ye(B, E);
      w = Math.min(w, L.minX), P = Math.min(P, L.minY), I = Math.max(I, L.maxX), H = Math.max(H, L.maxY);
    }
    return w === 1 / 0 ? null : {
      x: w - he,
      y: P - he,
      w: I - w + he * 2,
      h: H - P + he * 2
    };
  }, [f, p, dt, ye]), Ge = Ut(() => {
    if (!k) return null;
    const w = t.getAllGroupDescendantNodes(k);
    if (w.length === 0) return null;
    let P = 1 / 0, I = 1 / 0, H = -1 / 0, z = -1 / 0;
    for (const E of w) {
      if (E.type === "edge") continue;
      const L = E.h === "auto" ? dt[E.id] ?? 100 : E.h, X = ye(E, L);
      P = Math.min(P, X.minX), I = Math.min(I, X.minY), H = Math.max(H, X.maxX), z = Math.max(z, X.maxY);
    }
    if (P === 1 / 0) return null;
    const B = 8;
    return { x: P - B, y: I - B, w: H - P + B * 2, h: z - I + B * 2 };
  }, [k, p, dt, ye, t]), Ot = Ut(() => {
    const w = performance.now();
    if (p.filter(
      (it) => {
        if (o) {
          const Mt = o.get(it.type);
          return Mt && !Mt.isSVGOnly;
        }
        return it.type === "content" || it.type === "draw" || it.type === "shape" || it.type === "image" || it.type === "text" || it.type === "frame" || it.type === "sticky";
      }
    ), a.w <= 0 || a.h <= 0)
      return null;
    const { zoom: P, x: I, y: H } = c, B = Math.min(500, 280 / Math.max(P, 0.1)), E = {
      x: -I / P - B,
      y: -H / P - B,
      w: a.w / P + B * 2,
      h: a.h / P + B * 2
    }, L = t.getNodesInRect(E), X = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set();
    let q = 0, _ = 0, nt = 0, mt = 0, Et = 0;
    const At = (it, Mt = !1) => {
      const yt = t.getNode(it);
      if (!yt) return;
      const Lt = X.has(yt.id);
      X.set(yt.id, yt), yt.type === "edge" ? U.add(yt.id) : (Lt || V.add(yt.id), Mt && W.add(yt.id));
    };
    for (const it of L) {
      const Mt = W.size;
      At(it.id, !0), W.size > Mt && (q += 1);
    }
    for (const it of f)
      At(it, !0);
    const It = St ? { x: St.cursorX, y: St.cursorY } : pt ? { x: pt.cursorX, y: pt.cursorY } : null;
    if (It) {
      const it = 200 / Math.max(0.2, c.zoom), Mt = t.getNodesInRect({
        x: It.x - it,
        y: It.y - it,
        w: it * 2,
        h: it * 2
      });
      for (const yt of Mt)
        yt.type !== "edge" && At(yt.id, !0);
    }
    const zt = Array.from(W);
    for (const it of zt) {
      const Mt = t.getEdgesForNode(it);
      for (const yt of Mt) {
        const Lt = yt.data, Qt = U.has(yt.id);
        X.set(yt.id, yt), U.add(yt.id), Qt || (mt += 1);
        const Pt = V.size;
        At(Lt.fromId, !1), V.size > Pt && (_ += 1);
        const Dt = V.size;
        At(Lt.toId, !1), V.size > Dt && (_ += 1);
      }
    }
    if (!g)
      for (const it of p) {
        if (it.type !== "edge" || U.has(it.id)) continue;
        const Mt = it.data, yt = t.getNode(Mt.fromId), Lt = t.getNode(Mt.toId);
        if (!yt || !Lt) continue;
        let Qt = W.has(Mt.fromId) || W.has(Mt.toId);
        if (!Qt) {
          const Pt = Le(
            yt,
            Lt,
            Mt.edgeType || "bezier",
            dt,
            Mt.sourceHandle,
            Mt.targetHandle,
            Mt.midpointOffset,
            Mt.curveOffset,
            void 0,
            void 0,
            Mt.sourceT,
            Mt.targetT,
            Mt.attachmentGap
          );
          Qt = Pt.bounds.x < E.x + E.w && Pt.bounds.x + Pt.bounds.w > E.x && Pt.bounds.y < E.y + E.h && Pt.bounds.y + Pt.bounds.h > E.y;
        }
        if (Qt) {
          X.set(it.id, it), U.add(it.id), Et += 1;
          const Pt = V.size;
          At(yt.id, !1), V.size > Pt && (nt += 1);
          const Dt = V.size;
          At(Lt.id, !1), V.size > Dt && (nt += 1);
        }
      }
    const Yt = Array.from(X.values());
    return {
      domNodes: Yt.filter((it) => {
        if (it.type === "edge" || !W.has(it.id)) return !1;
        if (o) {
          const Mt = o.get(it.type);
          return !!Mt && !Mt.isSVGOnly;
        }
        return it.type === "content" || it.type === "draw" || it.type === "shape" || it.type === "image" || it.type === "text" || it.type === "frame" || it.type === "sticky";
      }),
      svgNodes: Yt,
      visibleNodeCount: W.size,
      visibleEdgeCount: U.size,
      seedVisibleNodes: q,
      nodesAddedByAdjacency: _,
      nodesAddedByEdgeEndpoints: nt,
      edgesAddedByAdjacency: mt,
      edgesAddedByCrossing: Et,
      cullingMs: performance.now() - w
    };
  }, [c, a, p, f, t, o, dt, pt, St, g]), go = (Ot == null ? void 0 : Ot.domNodes) ?? p.filter((w) => {
    if (o) {
      const P = o.get(w.type);
      return !!P && !P.isSVGOnly;
    }
    return w.type === "content" || w.type === "draw" || w.type === "shape" || w.type === "image" || w.type === "text" || w.type === "frame" || w.type === "sticky";
  }), C = g ? (Ot == null ? void 0 : Ot.svgNodes) ?? p : p;
  kt(() => {
    if (!pe.isEnabled()) return;
    const w = p.reduce((I, H) => I + (H.type === "edge" ? 1 : 0), 0), P = p.length - w;
    pe.recordCulling((Ot == null ? void 0 : Ot.cullingMs) ?? 0), pe.setVisibilityCounts({
      visibleNodes: (Ot == null ? void 0 : Ot.visibleNodeCount) ?? P,
      totalNodes: P,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: w,
      totalEdges: w,
      virtualizationActive: !!Ot,
      seedVisibleNodes: (Ot == null ? void 0 : Ot.seedVisibleNodes) ?? P,
      nodesAddedByAdjacency: (Ot == null ? void 0 : Ot.nodesAddedByAdjacency) ?? 0,
      nodesAddedByEdgeEndpoints: (Ot == null ? void 0 : Ot.nodesAddedByEdgeEndpoints) ?? 0,
      edgesAddedByAdjacency: (Ot == null ? void 0 : Ot.edgesAddedByAdjacency) ?? 0,
      edgesAddedByCrossing: (Ot == null ? void 0 : Ot.edgesAddedByCrossing) ?? 0
    });
  }, [p, Ot]);
  const ut = ht(0);
  kt(() => {
    if (!pe.isEnabled() || !Ot) return;
    const w = performance.now();
    if (w - ut.current < 1e3) return;
    ut.current = w;
    const P = p.reduce((H, z) => H + (z.type === "edge" ? 1 : 0), 0), I = p.length - P;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: Ot.visibleNodeCount,
      totalNodes: I,
      visibleEdges: Ot.visibleEdgeCount,
      totalEdges: P,
      seedVisibleNodes: Ot.seedVisibleNodes,
      nodesAddedByAdjacency: Ot.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: Ot.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: Ot.edgesAddedByAdjacency,
      edgesAddedByCrossing: Ot.edgesAddedByCrossing,
      cullingMs: Ot.cullingMs
    });
  }, [p, Ot, c]), kt(() => {
    let w = null;
    const P = () => {
      w === null && (w = requestAnimationFrame(() => {
        w = null, h([...t.getAllNodes()]);
      }));
    };
    let I = null;
    const H = () => {
      I === null && (I = requestAnimationFrame(() => {
        I = null, d({ ...t.viewport });
      }));
    }, z = () => {
      m((q) => {
        const _ = new Set(t.selection);
        return q.size !== _.size || [...q].some((nt) => !_.has(nt)) ? (xo((nt) => nt && !_.has(nt) ? null : nt), Ho((nt) => nt && !_.has(nt) ? null : nt), wo((nt) => nt && !_.has(nt) ? null : nt), Oo((nt) => nt && !_.has(nt) ? null : nt), Xo((nt) => nt && !_.has(nt) ? null : nt), No(null), _) : q;
      });
    }, B = () => {
      b(t.mode), t.mode === "text" && (ar.current = !1), t.mode === "edge" && t.deselectAll();
    }, E = () => Z(t.boardBackground), L = () => {
      N([...t.alignGuides]), O(t.snapToGrid), at(t.gridSize), G(t.smartGuides);
    }, X = () => A(t.getSearchState());
    t.on("change", P), t.on("viewport", H), t.on("selection", z), t.on("mode", B), t.on("background", E), t.on("guides", L), t.on("search", X);
    const V = (q) => S(q), W = () => S(null), U = () => {
      const q = s.current;
      q && (q.style.cursor = t.lassoSelect ? qo : Fr(t.mode));
    };
    return t.on("group:enter", V), t.on("group:exit", W), t.on("lassoToggle", U), () => {
      w !== null && cancelAnimationFrame(w), I !== null && cancelAnimationFrame(I), t.off("change", P), t.off("viewport", H), t.off("selection", z), t.off("mode", B), t.off("background", E), t.off("guides", L), t.off("search", X), t.off("group:enter", V), t.off("group:exit", W), t.off("lassoToggle", U);
    };
  }, [t]), kt(() => {
    const w = s.current;
    if (!w) return;
    const P = (I) => {
      if (!I.ctrlKey && !I.metaKey) {
        const z = I.target.closest(".sb-editor-wrap");
        if (z && z.scrollHeight > z.clientHeight) {
          const B = z.scrollTop <= 0 && I.deltaY < 0, E = z.scrollTop + z.clientHeight >= z.scrollHeight && I.deltaY > 0;
          if (!B && !E) return;
        }
      }
      I.preventDefault(), I.ctrlKey || I.metaKey ? t.zoomByWheel(I.deltaY, I.clientX, I.clientY) : t.pan(-I.deltaX, -I.deltaY);
    };
    return w.addEventListener("wheel", P, { passive: !1 }), () => w.removeEventListener("wheel", P);
  }, [t]);
  const [$t, ae] = ot(null), [Ie, Ye] = ot(null), [Be, je] = ot(null), [mo, No] = ot(null), bo = ht({
    x: 0,
    y: 0,
    index: -1
  }), [Ve, qe] = ot(null), [rl, dn] = ot(null), [nl, sl] = ot(null), nr = ht(null), il = Ut(() => {
    const w = /* @__PURE__ */ new Set();
    for (const P of p) {
      if (P.type !== "edge") continue;
      const I = P;
      I.data.animated && I.data.animatedDirection === "bop" && (w.add(I.data.fromId), w.add(I.data.toId));
    }
    return w;
  }, [p]), [hn, xo] = ot(null), un = ht(null), [Ls, Ho] = ot(null), [Ds, wo] = ot(null), [sr, Oo] = ot(null), [Ws, Xo] = ot(null), [al, Fs] = ot(null);
  kt(() => {
    const w = (P) => {
      Bl(() => Xo(P));
    };
    return t.on("image:cropRequest", w), () => t.off("image:cropRequest", w);
  }, [t]);
  const Bs = hn || Ds || Ls || sr || Ws || al, pn = ht(null), Ns = ht(null), [fn, yn] = ot(/* @__PURE__ */ new Set()), ko = ht(/* @__PURE__ */ new Set()), [Hs, ir] = ot([]), [Mr, gn] = ot(null), Ne = ht([]), _e = ht(null), [Os, Cr] = ot([]), ge = ht([]), Go = ht(null), ar = ht(!1), Xs = ct(
    (w, P, I, H = "auto") => {
      const z = Tt(10);
      Ns.current = z, t.addNode({
        id: z,
        type: "content",
        x: w,
        y: P,
        w: I,
        h: H,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), Ir = ct(
    (w, P, I) => {
      const { x: H, y: z } = t.screenToCanvas(w, P);
      if (I) {
        const V = t.hitTestAll(H, z, dt);
        if (V.length > 0) {
          const W = bo.current, U = Math.abs(H - W.x) + Math.abs(z - W.y);
          let q = 0;
          U < 5 && (q = (W.index + 1) % V.length), bo.current = { x: H, y: z, index: q }, t.select(V[q].id);
        } else
          t.deselectAll();
      } else {
        let V = !1;
        for (const W of t.selection) {
          const U = t.getNode(W);
          if (!U) continue;
          const q = U.h === "auto" ? 100 : U.h;
          if (H >= U.x && H <= U.x + U.w && z >= U.y && z <= U.y + q) {
            V = !0;
            break;
          }
        }
        if (!V && t.selection.size >= 2) {
          let W = 1 / 0, U = 1 / 0, q = -1 / 0, _ = -1 / 0;
          for (const nt of t.selection) {
            const mt = t.getNode(nt);
            if (!mt || mt.type === "edge") continue;
            const Et = mt.h === "auto" ? 100 : mt.h;
            W = Math.min(W, mt.x), U = Math.min(U, mt.y), q = Math.max(q, mt.x + mt.w), _ = Math.max(_, mt.y + Et);
          }
          W !== 1 / 0 && H >= W && H <= q && z >= U && z <= _ && (V = !0);
        }
        if (!V) {
          const W = t.hitTest(H, z, dt);
          W ? t.select(W.id) : t.deselectAll();
        }
      }
      const B = Array.from(t.selection), E = B.length > 0, L = [];
      if (L.push({
        items: [
          {
            label: n.actionCut,
            shortcut: "Mod+X",
            disabled: !E,
            action: () => {
              t.cutSelected(), Ei(t);
            }
          },
          {
            label: n.actionCopy,
            shortcut: "Mod+C",
            disabled: !E,
            action: () => {
              t.copySelected(), Ei(t);
            }
          },
          {
            label: n.actionPaste,
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              Au(t, H, z);
            }
          }
        ]
      }), L.push({
        items: [
          {
            label: n.actionDuplicate,
            shortcut: "Mod+D",
            disabled: !E,
            action: () => t.duplicateSelected()
          }
        ]
      }), E && L.push({
        items: [
          {
            label: n.actionAddToPersonalLibrary,
            action: () => {
              const V = B.map((q) => t.getNode(q)).filter((q) => !!q).map((q) => structuredClone(q)), W = new Set(
                V.map((q) => q.groupId).filter(Boolean)
              ), U = /* @__PURE__ */ new Map();
              for (const [q, _] of t.groupParent)
                W.has(q) && U.set(q, _);
              gn({
                nodes: V,
                groupParent: U
              });
            }
          }
        ]
      }), B.length >= 2 || E && t.selectionHasGroup()) {
        const V = [];
        B.length >= 2 && V.push({
          label: n.actionGroupSelection,
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && V.push({
          label: n.actionUngroupSelection,
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), L.push({ items: V });
      }
      if (E && B.every((W) => {
        const U = t.getNode(W);
        return U && (U.type === "draw" || U.type === "shape");
      }) && L.push({
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
      }), E && L.push({
        items: [
          {
            label: n.actionBringForward,
            shortcut: "Mod+]",
            action: () => t.bringForward(B)
          },
          {
            label: n.actionSendBackward,
            shortcut: "Mod+[",
            action: () => t.sendBackward(B)
          },
          {
            label: n.actionBringToFront,
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(B)
          },
          {
            label: n.actionSendToBack,
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(B)
          }
        ]
      }), E) {
        const V = B.some((q) => {
          var _;
          return (_ = t.getNode(q)) == null ? void 0 : _.locked;
        }), W = B.some((q) => {
          var _;
          return !((_ = t.getNode(q)) != null && _.locked);
        }), U = [];
        W && U.push({
          label: n.actionLock,
          action: () => {
            for (const q of B) t.updateNode(q, { locked: !0 });
          }
        }), V && U.push({
          label: n.actionUnlock,
          action: () => {
            for (const q of B) t.updateNode(q, { locked: void 0 });
          }
        }), L.push({ items: U });
      }
      E && L.push({
        items: [
          {
            label: n.actionDelete,
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const X = [10, 20, 40, 80];
      return L.push({
        items: [
          {
            label: n.actionToggleGrid,
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), O(t.snapToGrid);
            }
          },
          {
            label: n.actionSmartGuides,
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), G(t.smartGuides);
            }
          },
          ...X.map((V) => ({
            label: `${V}px`,
            checked: t.gridSize === V,
            action: () => {
              t.setGridSize(V);
            }
          }))
        ]
      }), L.push({
        items: [
          {
            label: n.actionExportAsPng,
            action: () => Ii(t, { format: "png" })
          },
          {
            label: n.actionExportAsSvg,
            action: () => Ii(t, { format: "svg" })
          }
        ]
      }), L;
    },
    [t]
  ), ll = ct(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const P = Ir(w.clientX, w.clientY, w.altKey);
      je({ x: w.clientX, y: w.clientY, sections: P });
    },
    [t, Ir]
  ), lr = ct(
    (w, P, I) => {
      const H = Tt(10);
      t.addNode({
        id: H,
        type: "text",
        x: w,
        y: P,
        w: I,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? lo,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(H), pn.current = H, xo(H);
    },
    [t]
  ), cl = ct(
    (w) => {
      if (t.presentationMode) return;
      if (t.mode === "text" && ar.current) {
        ar.current = !1, s.current && (s.current.style.cursor = "text"), t.deselectAll();
        const { x: B, y: E } = t.screenToCanvas(w.clientX, w.clientY);
        lr(B, E, 300);
        return;
      }
      if (t.mode !== "select") return;
      const { x: P, y: I } = t.screenToCanvas(w.clientX, w.clientY), H = t.hitTestAll(P, I, dt), z = H.find((B) => !t.isContainerType(B.type)) ?? H[0] ?? null;
      if (z != null && z.groupId) {
        const B = [];
        let E = z.groupId;
        for (; E; )
          B.push(E), E = t.groupParent.get(E);
        if (!t.activeGroupId) {
          t.enterGroup(B[B.length - 1]), t.select(z.id);
          return;
        }
        const L = B.indexOf(t.activeGroupId);
        if (L > 0) {
          t.enterGroup(B[L - 1]), t.select(z.id);
          return;
        }
      }
      if (z && z.type === "text") {
        t.select(z.id), un.current = { clientX: w.clientX, clientY: w.clientY }, xo(z.id);
        return;
      }
      if (z && z.type === "sticky") {
        t.select(z.id), wo(z.id);
        return;
      }
      if (z && z.type === "frame") {
        t.select(z.id), Ho(z.id);
        return;
      }
      if (z && z.type === "shape") {
        const B = z.data, E = B.shape === "line" || B.shape === "arrow";
        t.select(z.id), E || Oo(z.id);
        return;
      }
      if (z && z.type === "draw") {
        t.select(z.id);
        return;
      }
      if (!z || z.type === "draw") {
        const E = t.getAllNodes().filter((L) => L.type === "shape").sort((L, X) => X.z - L.z).find((L) => !(L.data.shape === "line" || L.data.shape === "arrow") && _r(L, P, I, t.viewport.zoom, !0));
        if (E) {
          t.select(E.id), Oo(E.id);
          return;
        }
      }
      z || (t.deselectAll(), lr(P, I, 300));
    },
    [t, dt, lr]
  ), dl = ct(
    (w) => {
      if (Y.current.set(w.pointerId, { x: w.clientX, y: w.clientY }), w.pointerType === "pen" && (rt.current = !0), w.button !== 2 && et(!0), w.pointerType === "touch" && (Y.current.size >= 2 || rt.current)) {
        tt.current = !0, Q.current && (clearTimeout(Q.current), Q.current = null, K.current = null);
        const z = new Map(Y.current), B = [...Y.current.keys()].find((W) => W !== w.pointerId);
        B !== void 0 && i().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: B,
            bubbles: !0,
            clientX: w.clientX,
            clientY: w.clientY
          })
        );
        const E = [...z.values()];
        let L = Ri(E[0], E[1] ?? E[0]);
        const X = (W) => {
          if (!z.has(W.pointerId)) return;
          z.set(W.pointerId, { x: W.clientX, y: W.clientY });
          const U = [...z.values()];
          if (U.length < 2) return;
          const q = Ri(U[0], U[1]);
          if (t.pan(q.mx - L.mx, q.my - L.my), L.dist > 1) {
            const _ = Math.min(Math.max(q.dist / L.dist, 0.9), 1.1);
            t.zoomByFactor(_, q.mx, q.my);
          }
          L = q;
        }, V = (W) => {
          Y.current.delete(W.pointerId), z.delete(W.pointerId), W.pointerType === "pen" && (rt.current = !1), z.size < 2 && !rt.current && (tt.current = !1, i().removeEventListener("pointermove", X), i().removeEventListener("pointerup", V), i().removeEventListener("pointercancel", V));
        };
        i().addEventListener("pointermove", X), i().addEventListener("pointerup", V), i().addEventListener("pointercancel", V);
        return;
      }
      if (tt.current || t.presentationMode && !(w.button === 1 || w.button === 0 && j.current))
        return;
      if (Be && je(null), w.pointerType === "touch") {
        const z = w.clientX, B = w.clientY, E = w.pointerId;
        K.current = { clientX: z, clientY: B }, Q.current = setTimeout(() => {
          if (Q.current = null, !K.current || tt.current) return;
          const L = Ir(z, B, !1);
          je({ x: z, y: B, sections: L }), i().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: E,
              bubbles: !0,
              clientX: z,
              clientY: B
            })
          ), K.current = null;
        }, 500);
      }
      if (w.button === 1 || w.button === 0 && j.current) {
        w.preventDefault(), J.current = !0;
        const z = t.viewport.x, B = t.viewport.y, E = w.clientX, L = w.clientY, X = s.current;
        X && (X.style.cursor = "grabbing");
        const V = (U) => {
          t.viewport.x = z + (U.clientX - E), t.viewport.y = B + (U.clientY - L), d({ ...t.viewport });
        }, W = () => {
          J.current = !1, X && (X.style.cursor = j.current ? "grab" : t.lassoSelect ? qo : ""), i().removeEventListener("pointermove", V), i().removeEventListener("pointerup", W);
        };
        i().addEventListener("pointermove", V), i().addEventListener("pointerup", W);
        return;
      }
      const { x: I, y: H } = t.screenToCanvas(w.clientX, w.clientY);
      if (w.pointerType === "touch" && Q.current && t.hitTest(I, H, dt) && (clearTimeout(Q.current), Q.current = null, K.current = null), t.mode === "select") {
        if (w.button !== 0) return;
        if (w.altKey) {
          const E = t.hitTestAll(I, H, dt);
          if (E.length > 0) {
            const L = bo.current, X = Math.abs(I - L.x) + Math.abs(H - L.y);
            let V = 0;
            X < 5 && (V = (L.index + 1) % E.length), bo.current = { x: I, y: H, index: V }, t.select(E[V].id);
          }
          return;
        }
        let z = !1;
        !t.lassoSelect && t.selection.size >= 2 && ne && I >= ne.x && I <= ne.x + ne.w && H >= ne.y && H <= ne.y + ne.h && (z = !0);
        let B = null;
        if (!t.lassoSelect) {
          const E = t.hitTestAll(I, H, dt);
          B = E.find((L) => t.selection.has(L.id) && !t.isContainerType(L.type)) ?? E.find((L) => !t.isContainerType(L.type)) ?? E[0] ?? null, !B && !z && (B = Lc(t.nodes, I, H, t.viewport.zoom, dt, Bo));
        }
        if (B || z) {
          B && (t.activeGroupId && !t.isNodeInActiveGroup(B.id) && t.exitAllGroups(), w.shiftKey ? t.toggleSelect(B.id) : t.selection.has(B.id) || t.select(B.id));
          const E = Array.from(t.selection).filter(
            (Pt) => {
              var Dt;
              return !((Dt = t.getNode(Pt)) != null && Dt.locked);
            }
          );
          if (E.length === 0) return;
          const L = w.clientX, X = w.clientY, V = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set();
          for (const Pt of E) {
            const Dt = t.getNode(Pt);
            if (Dt && t.isContainerType(Dt.type)) {
              W.add(Pt);
              for (const Nt of t.getFrameDescendantIds(Pt))
                t.selection.has(Nt) || V.add(Nt);
            }
          }
          const U = [...E, ...V], q = U.map((Pt) => {
            const Dt = t.getNode(Pt);
            return { id: Pt, x: Dt.x, y: Dt.y };
          }), _ = t.selectionGroupId(), nt = _ ? t.groupRotations.get(_) : null, mt = nt == null ? void 0 : nt.cx, Et = nt == null ? void 0 : nt.cy;
          No(null);
          let At = !1, It = null, zt = L, Yt = X, Xt = !1;
          const it = new Set(U), Mt = t.createDragSnapContext(it), yt = () => {
            It = null;
            const Pt = (zt - L) / t.viewport.zoom, Dt = (Yt - X) / t.viewport.zoom, { finalDx: Nt, finalDy: re } = t.computeDragSnap(
              q,
              it,
              Pt,
              Dt,
              Xt,
              Mt
            ), ce = q.map((se) => ({
              id: se.id,
              patch: { x: se.x + Nt, y: se.y + re }
            }));
            t.updateMany(ce), nt && _ && t.groupRotations.set(_, {
              angle: nt.angle,
              cx: mt + Nt,
              cy: Et + re
            });
          }, Lt = (Pt) => {
            const Dt = (Pt.clientX - L) / t.viewport.zoom, Nt = (Pt.clientY - X) / t.viewport.zoom;
            if (!At)
              if (Math.abs(Dt) > 2 || Math.abs(Nt) > 2)
                At = !0, t.pushHistorySnapshot(), y(!0);
              else
                return;
            zt = Pt.clientX, Yt = Pt.clientY, Xt = Pt.metaKey || Pt.ctrlKey, It === null && (It = requestAnimationFrame(yt));
          }, Qt = () => {
            if (It !== null && (cancelAnimationFrame(It), yt()), y(!1), t.clearAlignGuides(), i().removeEventListener("pointermove", Lt), i().removeEventListener("pointerup", Qt), At) {
              const Pt = E.filter(
                (Dt) => !V.has(Dt)
              );
              Pt.length > 0 && t.updateFrameMembership(Pt);
            }
          };
          i().addEventListener("pointermove", Lt), i().addEventListener("pointerup", Qt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          w.shiftKey || t.deselectAll();
          const E = new Set(t.selection);
          if (t.lassoSelect) {
            const L = [[I, H]];
            Ye([...L]);
            let X = null, V = 0;
            const W = (_ = !1) => {
              X = null;
              const nt = _ || V % 2 === 0;
              if (V++, nt && L.length >= 3) {
                const Et = $e(L, t.getAllNodes()).map((It) => It.id), At = w.shiftKey ? [.../* @__PURE__ */ new Set([...E, ...Et])] : Et;
                (At.length !== t.selection.size || At.some((It) => !t.selection.has(It))) && t.selectMultiple(At);
              }
              Ye([...L]);
            }, U = (_) => {
              const { x: nt, y: mt } = t.screenToCanvas(_.clientX, _.clientY);
              L.push([nt, mt]), X === null && (X = requestAnimationFrame(() => W(!1)));
            }, q = () => {
              X !== null && cancelAnimationFrame(X), W(!0), i().removeEventListener("pointermove", U), i().removeEventListener("pointerup", q), Ye(null), t.toggleLassoSelect();
            };
            i().addEventListener("pointermove", U), i().addEventListener("pointerup", q);
          } else {
            const L = { startX: I, startY: H, endX: I, endY: H };
            ae(L);
            let X = null, V = 0;
            const W = (_ = !1, nt = !1) => {
              X = null;
              const mt = Math.min(L.startX, L.endX), Et = Math.min(L.startY, L.endY), At = Math.abs(L.endX - L.startX), It = Math.abs(L.endY - L.startY), zt = nt || _ || V % 2 === 0;
              if (V++, zt) {
                const Xt = Fe(
                  { x: mt, y: Et, w: At, h: It },
                  t.getAllNodes()
                ).map((Mt) => Mt.id), it = w.shiftKey ? [.../* @__PURE__ */ new Set([...E, ...Xt])] : Xt;
                (it.length !== t.selection.size || it.some((Mt) => !t.selection.has(Mt))) && t.selectMultiple(it);
              }
              ae({ ...L });
            }, U = (_) => {
              const { x: nt, y: mt } = t.screenToCanvas(_.clientX, _.clientY);
              L.endX = nt, L.endY = mt, X === null && (X = requestAnimationFrame(() => W(!1)));
            }, q = () => {
              X !== null && cancelAnimationFrame(X), W(!0), i().removeEventListener("pointermove", U), i().removeEventListener("pointerup", q), ae(null);
            };
            i().addEventListener("pointermove", U), i().addEventListener("pointerup", q);
          }
        }
      } else if (t.mode === "text") {
        if (ar.current) return;
        t.deselectAll();
        const z = I, B = H, E = {
          startX: I,
          startY: H,
          endX: I,
          endY: H
        };
        let L = !1;
        qe(E);
        const X = (W) => {
          const { x: U, y: q } = t.screenToCanvas(W.clientX, W.clientY);
          E.endX = U, E.endY = q;
          const _ = Math.abs(E.endX - E.startX), nt = Math.abs(E.endY - E.startY);
          (_ > 10 || nt > 10) && (L = !0), qe({ ...E });
        }, V = () => {
          i().removeEventListener("pointermove", X), i().removeEventListener("pointerup", V), qe(null);
          const W = L ? Math.max(Math.abs(E.endX - E.startX), 60) : 300, U = L ? Math.min(E.startX, E.endX) : z, q = L ? Math.min(E.startY, E.endY) : B;
          lr(U, q, W), ar.current = !0, s.current && (s.current.style.cursor = "crosshair");
        };
        i().addEventListener("pointermove", X), i().addEventListener("pointerup", V);
      } else if (t.mode === "note") {
        t.deselectAll();
        const z = I, B = H, E = {
          startX: I,
          startY: H,
          endX: I,
          endY: H
        };
        let L = !1;
        qe(E);
        const X = (W) => {
          const { x: U, y: q } = t.screenToCanvas(W.clientX, W.clientY);
          E.endX = U, E.endY = q;
          const _ = Math.abs(E.endX - E.startX), nt = Math.abs(E.endY - E.startY);
          (_ > 10 || nt > 10) && (L = !0), qe({ ...E });
        }, V = () => {
          i().removeEventListener("pointermove", X), i().removeEventListener("pointerup", V), qe(null);
          const W = L ? Math.max(Math.abs(E.endX - E.startX), 100) : 300, U = L ? Math.max(Math.abs(E.endY - E.startY), 40) : "auto", q = L ? Math.min(E.startX, E.endX) : z, _ = L ? Math.min(E.startY, E.endY) : B;
          Xs(q, _, W, U), t.setMode("select");
        };
        i().addEventListener("pointermove", X), i().addEventListener("pointerup", V);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const z = I, B = H, E = {
          startX: I,
          startY: H,
          endX: I,
          endY: H
        };
        let L = !1;
        qe(E);
        const X = (W) => {
          const { x: U, y: q } = t.screenToCanvas(W.clientX, W.clientY);
          E.endX = U, E.endY = q, Math.abs(E.endX - E.startX) > 10 && (L = !0), qe({ ...E });
        }, V = () => {
          i().removeEventListener("pointermove", X), i().removeEventListener("pointerup", V), qe(null);
          const W = L ? Math.max(Math.abs(E.endX - E.startX), 100) : 200, U = L ? Math.min(E.startX, E.endX) : z, q = L ? Math.min(E.startY, E.endY) : B, _ = Tt(10), nt = L ? Math.max(Math.abs(E.endY - E.startY), 100) : 150;
          t.addNode({
            id: _,
            type: "sticky",
            x: U,
            y: q,
            w: W,
            h: nt,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(_), wo(_), t.setMode("select");
        };
        i().addEventListener("pointermove", X), i().addEventListener("pointerup", V);
      } else if (t.mode === "draw") {
        const z = w.pressure || 0.5, B = {
          points: [[I, H, z]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle,
          opacity: t.activeTool.opacity
        };
        lt(B), t.notifyDrawProgress(B);
        const E = (X) => {
          const { x: V, y: W } = t.screenToCanvas(X.clientX, X.clientY), U = X.pressure || 0.5;
          B.points.push([V, W, U]), lt({ ...B, points: [...B.points] }), t.notifyDrawProgress({ ...B, points: [...B.points] });
        }, L = () => {
          if (i().removeEventListener("pointermove", E), i().removeEventListener("pointerup", L), t.notifyDrawEnd(), B.points.length < 2) {
            lt(null);
            return;
          }
          let X = 1 / 0, V = 1 / 0, W = -1 / 0, U = -1 / 0;
          for (const [_, nt] of B.points)
            _ < X && (X = _), nt < V && (V = nt), _ > W && (W = _), nt > U && (U = nt);
          const q = B.points.map(
            ([_, nt, mt]) => [_ - X, nt - V, mt]
          );
          t.addNode({
            id: Tt(10),
            type: "draw",
            x: X,
            y: V,
            w: W - X,
            h: U - V,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: q,
              color: B.color,
              strokeWidth: B.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => lt(null));
        };
        i().addEventListener("pointermove", E), i().addEventListener("pointerup", L);
      } else if (t.mode === "shape") {
        const z = {
          startX: I,
          startY: H,
          endX: I,
          endY: H
        };
        xt(z);
        const B = {
          shapeType: t.activeTool.shapeType || "rect",
          stroke: t.activeTool.color,
          strokeWidth: t.activeTool.width
        }, E = (X) => {
          const { x: V, y: W } = t.screenToCanvas(X.clientX, X.clientY);
          z.endX = V, z.endY = W, xt({ ...z }), t.notifyShapeProgress({ ...z, ...B });
        }, L = () => {
          i().removeEventListener("pointermove", E), i().removeEventListener("pointerup", L), t.notifyShapeEnd();
          const X = t.activeTool.shapeType || "rect", V = X === "line" || X === "arrow", W = Math.min(z.startX, z.endX);
          let U = Math.min(z.startY, z.endY);
          const q = Math.abs(z.endX - z.startX), _ = Math.abs(z.endY - z.startY);
          let nt;
          if (V) {
            const At = t.activeTool.width * 2;
            nt = Math.max(_, At), _ < At && (U -= (At - _) / 2);
          } else
            nt = _;
          if (q < 5 && (V ? q < 5 && Math.abs(z.endY - z.startY) < 5 : nt < 5)) {
            xt(null);
            return;
          }
          const mt = {};
          V && (mt.startPoint = [
            z.startX - W,
            z.startY - U
          ], mt.endPoint = [
            z.endX - W,
            z.endY - U
          ]);
          const Et = Tt(10);
          t.addNode({
            id: Et,
            type: "shape",
            x: W,
            y: U,
            w: q,
            h: nt,
            z: t.nextZ(),
            data: {
              shape: X,
              stroke: t.activeTool.color,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle,
              strokeWidth: t.activeTool.width,
              strokeStyle: t.activeTool.strokeStyle,
              roughness: t.activeTool.roughness ?? 1,
              opacity: t.activeTool.opacity ?? 1,
              ...mt
            }
          }), xt(null);
        };
        i().addEventListener("pointermove", E), i().addEventListener("pointerup", L);
      } else if (t.mode === "edge") {
        const z = t.hitTest(I, H, dt);
        if (!z || z.type === "edge") return;
        const B = t.freeFormEdges, E = B ? Ae(z, I, H, dt).t : void 0;
        Ct({
          fromNode: z,
          cursorX: I,
          cursorY: H,
          sourceT: E,
          edgeColor: t.activeTool.color,
          edgeStrokeWidth: t.activeTool.width || 2,
          edgeStyle: t.activeTool.strokeStyle || "solid",
          edgeType: t.activeTool.edgeType,
          attachmentGap: t.activeTool.attachmentGap
        });
        const L = (V) => {
          const { x: W, y: U } = t.screenToCanvas(V.clientX, V.clientY);
          Ct(
            (q) => q ? { ...q, cursorX: W, cursorY: U } : null
          );
        }, X = (V) => {
          i().removeEventListener("pointermove", L), i().removeEventListener("pointerup", X), Ct(null);
          const { x: W, y: U } = t.screenToCanvas(V.clientX, V.clientY);
          let q = t.hitTest(W, U, dt);
          if (!q || q.type === "edge" || t.isContainerType(q.type)) {
            const It = 50 / t.viewport.zoom;
            let zt = 1 / 0, Yt = !1, Xt = null;
            for (const it of t.getAllNodes()) {
              if (it.type === "edge" || it.id === z.id) continue;
              const Mt = t.isContainerType(it.type), yt = Ae(it, W, U, dt), Lt = Math.hypot(yt.x - W, yt.y - U);
              if (Lt < It) {
                if (Mt && !Yt && Xt) continue;
                (!Mt && Yt || Lt < zt) && (zt = Lt, Yt = Mt, Xt = it);
              }
            }
            Xt && (q = Xt);
          }
          if (!q || q.type === "edge" || q.id === z.id)
            return;
          const _ = B ? void 0 : Ar(z, I, H, dt), nt = B ? void 0 : Ar(q, W, U, dt), mt = B ? Ae(q, W, U, dt).t : void 0;
          if (t.getAllNodes().some((It) => {
            if (It.type !== "edge") return !1;
            const zt = It.data;
            return B ? zt.fromId === z.id && zt.toId === q.id && zt.sourceT !== void 0 && zt.targetT !== void 0 && Math.abs(zt.sourceT - E) < 0.02 && Math.abs(zt.targetT - mt) < 0.02 : Fn(zt, {
              fromId: z.id,
              toId: q.id,
              sourceHandle: _,
              targetHandle: nt
            });
          })) return;
          const At = {
            id: Tt(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: z.id,
              toId: q.id,
              style: t.activeTool.strokeStyle || "solid",
              color: t.activeTool.color,
              strokeWidth: t.activeTool.width || 2,
              arrowHead: t.activeTool.arrowHead ?? "arrow",
              arrowTail: t.activeTool.arrowTail ?? "none",
              edgeType: t.activeTool.edgeType ?? "bezier",
              roughness: t.activeTool.roughness ?? 0,
              attachmentGap: t.activeTool.attachmentGap,
              sourceHandle: _,
              targetHandle: nt,
              sourceT: E,
              targetT: mt
            }
          };
          t.addNode(At);
        };
        i().addEventListener("pointermove", L), i().addEventListener("pointerup", X);
      } else if (t.mode === "frame") {
        const z = {
          startX: I,
          startY: H,
          endX: I,
          endY: H
        };
        xt(z);
        const B = (L) => {
          const { x: X, y: V } = t.screenToCanvas(L.clientX, L.clientY);
          z.endX = X, z.endY = V, xt({ ...z });
        }, E = () => {
          i().removeEventListener("pointermove", B), i().removeEventListener("pointerup", E);
          const L = Math.min(z.startX, z.endX), X = Math.min(z.startY, z.endY), V = Math.abs(z.endX - z.startX), W = Math.abs(z.endY - z.startY);
          if (V < 20 || W < 20) {
            xt(null);
            return;
          }
          const U = Tt(10);
          t.addNode({
            id: U,
            type: "frame",
            x: L,
            y: X,
            w: V,
            h: W,
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
        i().addEventListener("pointermove", B), i().addEventListener("pointerup", E);
      } else if (t.mode === "erase") {
        if (w.button !== 0) return;
        const z = (mt, Et) => {
          const At = t.hitTestAll(mt, Et, dt), It = Rc(
            t.nodes,
            mt,
            Et,
            t.viewport.zoom,
            dt,
            Bo
          );
          let zt = !1;
          for (const Yt of [...At, ...It])
            ko.current.has(Yt.id) || (ko.current.add(Yt.id), zt = !0);
          zt && yn(new Set(ko.current));
        }, B = 400;
        ko.current = /* @__PURE__ */ new Set();
        const E = performance.now();
        Ne.current = [[I, H, E]], ir([[I, H, E]]), z(I, H);
        let L = I, X = H;
        const V = () => {
          const mt = performance.now(), Et = Ne.current.length;
          Ne.current = Ne.current.filter(
            (At) => mt - At[2] < B
          ), Ne.current.length !== Et && ir([...Ne.current]), _e.current = requestAnimationFrame(V);
        };
        _e.current = requestAnimationFrame(V);
        const W = (mt) => {
          const { x: Et, y: At } = t.screenToCanvas(mt.clientX, mt.clientY);
          L = Et, X = At;
          const It = performance.now();
          Ne.current.push([L, X, It]), ir([...Ne.current]), z(L, X);
        }, U = () => {
          _e.current !== null && (cancelAnimationFrame(_e.current), _e.current = null), ko.current = /* @__PURE__ */ new Set(), yn(/* @__PURE__ */ new Set()), Ne.current = [], ir([]);
        }, q = () => {
          nt();
          const mt = Array.from(ko.current);
          U(), mt.length > 0 && t.deleteNodes(mt);
        }, _ = (mt) => {
          mt.key === "Escape" && (nt(), U());
        }, nt = () => {
          i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", q), i().removeEventListener("keydown", _);
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", q), i().addEventListener("keydown", _);
      } else if (t.mode === "laser") {
        if (w.button !== 0) return;
        const z = 1560;
        Go.current !== null && (cancelAnimationFrame(Go.current), Go.current = null);
        const B = performance.now();
        ge.current.length > 0 && ge.current.push([NaN, NaN, B]), ge.current.push([I, H, B]), Cr([...ge.current]), t.notifyLaserProgress([[I, H]]);
        let E = B;
        const L = () => {
          const W = performance.now(), U = ge.current.length;
          ge.current = ge.current.filter(
            (q) => W - q[2] < z
          ), (ge.current.length !== U || ge.current.length > 0) && Cr([...ge.current]), W - E >= 60 && (E = W, ge.current.length > 0 && t.notifyLaserProgress(
            ge.current.map((q) => [q[0], q[1]])
          )), ge.current.length > 0 ? Go.current = requestAnimationFrame(L) : (Go.current = null, Cr([]), t.notifyLaserEnd());
        };
        Go.current = requestAnimationFrame(L);
        const X = (W) => {
          const { x: U, y: q } = t.screenToCanvas(W.clientX, W.clientY), _ = performance.now();
          ge.current.push([U, q, _]), Cr([...ge.current]), t.notifyLaserProgress(
            ge.current.map((nt) => [nt[0], nt[1]])
          );
        }, V = () => {
          i().removeEventListener("pointermove", X), i().removeEventListener("pointerup", V);
        };
        i().addEventListener("pointermove", X), i().addEventListener("pointerup", V);
      } else if (t.mode === "hand") {
        if (w.button !== 0) return;
        w.preventDefault();
        const z = t.viewport.x, B = t.viewport.y, E = w.clientX, L = w.clientY, X = s.current;
        X && (X.style.cursor = "grabbing");
        const V = (U) => {
          t.viewport.x = z + (U.clientX - E), t.viewport.y = B + (U.clientY - L), d({ ...t.viewport });
        }, W = () => {
          X && (X.style.cursor = t.lassoSelect ? qo : Fr(t.mode)), i().removeEventListener("pointermove", V), i().removeEventListener("pointerup", W);
        };
        i().addEventListener("pointermove", V), i().addEventListener("pointerup", W);
      }
    },
    [
      t,
      Xs,
      lr,
      Be,
      Ir,
      ne,
      dt,
      ye,
      Fe,
      et
    ]
  ), mn = ct(
    (w, P, I) => {
      if (I.preventDefault(), t.presentationMode) return;
      const H = t.getNode(w);
      if (!H || H.locked) return;
      const z = I.clientX, B = I.clientY, E = H.x, L = H.y, X = H.w, V = H.h === "auto", W = V ? dt[w] ?? 100 : H.h, U = H.type === "draw" ? H.data.points.map(
        (At) => [...At]
      ) : null, q = H.type === "shape" ? H.data.startPoint : void 0, _ = H.type === "shape" ? H.data.endPoint : void 0, nt = H.type === "text" ? H.data.fontSize : 0;
      t.pushHistorySnapshot();
      const mt = (At) => {
        const It = (At.clientX - z) / t.viewport.zoom, zt = (At.clientY - B) / t.viewport.zoom;
        let Yt = E, Xt = L, it = X, Mt = W;
        if ((P === "nw" || P === "w" || P === "sw") && (Yt = E + It, it = X - It), (P === "ne" || P === "e" || P === "se") && (it = X + It), (P === "nw" || P === "n" || P === "ne") && (Xt = L + zt, Mt = W - zt), (P === "sw" || P === "s" || P === "se") && (Mt = W + zt), t.snapToGrid && !(At.metaKey || At.ctrlKey)) {
          const Pt = t.gridSize, Dt = (Nt) => Math.round(Nt / Pt) * Pt;
          (P === "nw" || P === "w" || P === "sw") && (Yt = Dt(Yt), it = E + X - Yt), (P === "ne" || P === "e" || P === "se") && (it = Dt(Yt + it) - Yt), (P === "nw" || P === "n" || P === "ne") && (Xt = Dt(Xt), Mt = L + W - Xt), (P === "sw" || P === "s" || P === "se") && (Mt = Dt(Xt + Mt) - Xt);
        }
        let yt = 10, Lt = 10;
        if (H.type === "legacy-voicenote" ? (yt = 260, Lt = 120) : H.type === "legacy-canvas-link" && (yt = 220, Lt = 86), it < yt && (it = yt, (P === "nw" || P === "w" || P === "sw") && (Yt = E + X - yt)), Mt < Lt && (Mt = Lt, (P === "nw" || P === "n" || P === "ne") && (Xt = L + W - Lt)), H.type === "frame") {
          const Pt = H.data.devicePreset;
          if (Pt) {
            const Dt = ss(Pt);
            if (Dt) {
              const Nt = Ja(Dt);
              if (P === "nw" || P === "ne" || P === "sw" || P === "se" || (P === "e" || P === "w")) {
                const se = Math.round(it / Nt);
                (P === "nw" || P === "ne") && (Xt = L + W - se), Mt = se;
              } else
                it = Math.round(Mt * Nt);
            }
          }
        }
        const Qt = {
          x: Yt,
          y: Xt,
          w: it,
          h: V ? "auto" : Mt
        };
        if (U && H.type === "draw") {
          const Pt = X > 0 ? it / X : 1, Dt = W > 0 ? Mt / W : 1, Nt = U.map(
            ([re, ce, se]) => [re * Pt, ce * Dt, se]
          );
          Qt.data = { ...H.data, points: Nt };
        }
        if (H.type === "shape" && (q || _)) {
          const Pt = X > 0 ? it / X : 1, Dt = W > 0 ? Mt / W : 1, Nt = { ...H.data };
          q && (Nt.startPoint = [
            q[0] * Pt,
            q[1] * Dt
          ]), _ && (Nt.endPoint = [
            _[0] * Pt,
            _[1] * Dt
          ]), Qt.data = Nt;
        }
        if (H.type === "text" && nt > 0 && P !== "e" && P !== "w") {
          const Pt = P === "n" || P === "s" ? W > 0 ? Mt / W : 1 : X > 0 ? it / X : 1, Dt = Math.max(8, Math.round(nt * Pt));
          Qt.data = { ...H.data, fontSize: Dt };
        }
        t.updateNode(w, Qt);
      }, Et = () => {
        i().removeEventListener("pointermove", mt), i().removeEventListener("pointerup", Et), t.isContainerType(H.type) && t.syncFrameChildrenAfterResize(w);
      };
      i().addEventListener("pointermove", mt), i().addEventListener("pointerup", Et);
    },
    [t, dt]
  ), hl = ct(
    (w, P) => {
      P.stopPropagation(), P.preventDefault();
      const I = t.getNode(w);
      if (!I || I.locked) return;
      const H = I.h === "auto" ? dt[w] ?? 100 : I.h, z = I.x + I.w / 2, B = I.y + H / 2, E = I.rotation || 0, { x: L, y: X } = t.screenToCanvas(
        P.clientX,
        P.clientY
      ), V = Math.atan2(X - B, L - z);
      t.pushHistorySnapshot();
      const W = (q) => {
        const { x: _, y: nt } = t.screenToCanvas(q.clientX, q.clientY), mt = Math.atan2(nt - B, _ - z);
        let Et = E + (mt - V) * (180 / Math.PI);
        (q.shiftKey || t.snapToGrid) && !(q.metaKey || q.ctrlKey) && (Et = Math.round(Et / 15) * 15), t.updateNode(w, { rotation: Et });
      }, U = () => {
        i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", U);
      };
      i().addEventListener("pointermove", W), i().addEventListener("pointerup", U);
    },
    [t, dt]
  ), Gs = ct(
    (w, P, I) => {
      I.stopPropagation(), I.preventDefault();
      const H = t.getNode(w);
      if (!H) return;
      const { x: z, y: B } = t.screenToCanvas(I.clientX, I.clientY), E = t.freeFormEdges, L = E ? Ae(H, z, B, dt).t : void 0;
      Ct({
        fromNode: H,
        cursorX: z,
        cursorY: B,
        sourceHandle: E ? void 0 : P,
        sourceT: L,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid"
      });
      const X = (W) => {
        const { x: U, y: q } = t.screenToCanvas(W.clientX, W.clientY);
        Ct(
          (_) => _ ? { ..._, cursorX: U, cursorY: q } : null
        );
      }, V = (W) => {
        i().removeEventListener("pointermove", X), i().removeEventListener("pointerup", V), Ct(null);
        const { x: U, y: q } = t.screenToCanvas(W.clientX, W.clientY);
        let _ = t.hitTest(U, q, dt);
        if (!_ || _.type === "edge" || t.isContainerType(_.type)) {
          const It = 50 / t.viewport.zoom;
          let zt = 1 / 0, Yt = !1, Xt = null;
          for (const it of t.getAllNodes()) {
            if (it.type === "edge" || it.id === H.id) continue;
            const Mt = t.isContainerType(it.type), yt = Ae(it, U, q, dt), Lt = Math.hypot(yt.x - U, yt.y - q);
            Lt >= It || Mt && !Yt && Xt || (!Mt && Yt || Lt < zt) && (zt = Lt, Yt = Mt, Xt = it);
          }
          Xt && (_ = Xt);
        }
        if (!_ || _.type === "edge" || _.id === H.id)
          return;
        const nt = E ? void 0 : Ar(_, U, q, dt), mt = E ? Ae(_, U, q, dt).t : void 0;
        if (t.getAllNodes().some((It) => {
          if (It.type !== "edge") return !1;
          const zt = It.data;
          return E ? zt.fromId === H.id && zt.toId === _.id && zt.sourceT !== void 0 && zt.targetT !== void 0 && Math.abs(zt.sourceT - L) < 0.02 && Math.abs(zt.targetT - mt) < 0.02 : Fn(zt, {
            fromId: H.id,
            toId: _.id,
            sourceHandle: P,
            targetHandle: nt
          });
        })) return;
        const At = {
          id: Tt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: H.id,
            toId: _.id,
            style: t.activeTool.strokeStyle || "solid",
            color: t.activeTool.color,
            strokeWidth: t.activeTool.width || 2,
            arrowHead: t.activeTool.arrowHead ?? "arrow",
            arrowTail: t.activeTool.arrowTail ?? "none",
            edgeType: t.activeTool.edgeType ?? "bezier",
            roughness: t.activeTool.roughness ?? 0,
            attachmentGap: t.activeTool.attachmentGap,
            sourceHandle: E ? void 0 : P,
            targetHandle: nt,
            sourceT: L,
            targetT: mt
          }
        };
        t.addNode(At);
      };
      i().addEventListener("pointermove", X), i().addEventListener("pointerup", V);
    },
    [t, dt]
  ), ul = ct(
    (w) => {
      let P = null, I = w === "top" || w === "left" ? 1 / 0 : -1 / 0;
      for (const H of t.selection) {
        const z = t.getNode(H);
        if (!z || z.type === "edge") continue;
        const B = z.h === "auto" ? dt[z.id] ?? 100 : z.h;
        let E;
        switch (w) {
          case "top":
            E = z.y;
            break;
          case "bottom":
            E = z.y + B;
            break;
          case "left":
            E = z.x;
            break;
          case "right":
            E = z.x + z.w;
            break;
        }
        (w === "top" || w === "left" ? E < I : E > I) && (I = E, P = H);
      }
      return P;
    },
    [t, dt]
  ), pl = ct(
    (w, P, I, H) => {
      var q;
      H.stopPropagation(), H.preventDefault();
      const z = t.getNode(w);
      if (!z || !o) return;
      const B = o.get(z.type), E = (q = B == null ? void 0 : B.ports) == null ? void 0 : q.find((_) => _.id === P);
      if (!E) return;
      const L = I === "input" ? "left" : "right", { x: X, y: V } = t.screenToCanvas(H.clientX, H.clientY);
      Ct({
        fromNode: z,
        cursorX: X,
        cursorY: V,
        sourceHandle: L,
        sourcePort: P,
        sourceDirection: I,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid"
      });
      const W = (_) => {
        const { x: nt, y: mt } = t.screenToCanvas(_.clientX, _.clientY);
        Ct(
          (Et) => Et ? { ...Et, cursorX: nt, cursorY: mt } : null
        );
      }, U = (_) => {
        var se;
        i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", U), Ct(null);
        const { x: nt, y: mt } = t.screenToCanvas(_.clientX, _.clientY), Et = I === "output" ? "input" : "output", At = 40 / t.viewport.zoom;
        let It = null, zt = null, Yt = 1 / 0;
        for (const te of t.getAllNodes()) {
          if (te.type === "edge" || te.id === z.id) continue;
          const de = o.get(te.type);
          if (!((se = de == null ? void 0 : de.ports) != null && se.length)) continue;
          const Ke = te.h === "auto" ? t.measuredHeights[te.id] ?? 100 : te.h;
          for (const me of de.ports) {
            if (me.direction !== Et || E.dataType !== "any" && me.dataType !== "any" && E.dataType !== me.dataType) continue;
            const Yo = de.ports.filter((Cl) => Cl.direction === me.direction), wn = Yo.indexOf(me), zr = 14 / t.viewport.zoom, Sl = te.y + Ke / (Yo.length + 1) * (wn + 1), Ml = me.direction === "input" ? te.x - zr : te.x + te.w + zr, kn = Math.hypot(Ml - nt, Sl - mt);
            kn < At && kn < Yt && (Yt = kn, It = te, zt = me);
          }
        }
        if (!It || !zt) return;
        const Xt = zt.id, it = I === "output" ? It.id : z.id, Mt = I === "output" ? Xt : P;
        if (t.getAllNodes().some((te) => {
          if (te.type !== "edge") return !1;
          const de = te.data;
          return de.toId === it && de.targetPort === Mt;
        })) return;
        const Lt = I === "output" ? z.id : It.id, Qt = I === "output" ? It.id : z.id, Pt = I === "output" ? P : Xt, Dt = I === "output" ? Xt : P, ce = {
          id: Tt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Lt,
            toId: Qt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: Pt,
            targetPort: Dt
          }
        };
        t.addNode(ce), t.select(ce.id);
      };
      i().addEventListener("pointermove", W), i().addEventListener("pointerup", U);
    },
    [t, o, dt]
  ), [Ys, fl] = ot(0);
  kt(() => {
    if (r)
      return r.onChange(() => fl((w) => w + 1));
  }, [r]);
  const yl = ct(
    (w, P, I, H, z) => {
      z.stopPropagation(), z.preventDefault();
      const B = t.getNode(w);
      if (!B || B.type !== "edge") return;
      t.pushHistorySnapshot();
      const E = (X) => {
        const V = t.screenToCanvas(X.clientX, X.clientY), W = t.getNode(w);
        if (!W) return;
        const U = t.getNode(W.data.fromId), q = t.getNode(W.data.toId);
        if (!(!U || !q))
          if (P === "xy") {
            const _ = Le(
              U,
              q,
              W.data.edgeType || "bezier",
              dt,
              W.data.sourceHandle,
              W.data.targetHandle,
              void 0,
              void 0,
              // no offsets → natural midpoint
              void 0,
              void 0,
              W.data.sourceT,
              W.data.targetT,
              W.data.attachmentGap
            );
            if (!_.kinkHandle) return;
            const nt = V.x - _.kinkHandle.x, mt = V.y - _.kinkHandle.y;
            t.updateNode(w, {
              data: { ...W.data, curveOffset: [nt, mt] }
            });
          } else {
            const _ = P === "x" ? V.x : V.y, nt = Le(
              U,
              q,
              W.data.edgeType || "bezier",
              dt,
              W.data.sourceHandle,
              W.data.targetHandle,
              0.5,
              void 0,
              // default to get range
              void 0,
              void 0,
              W.data.sourceT,
              W.data.targetT,
              W.data.attachmentGap
            );
            if (!nt.kinkHandle) return;
            const mt = nt.kinkHandle.min, Et = nt.kinkHandle.max, At = Et - mt;
            if (At === 0) return;
            const zt = (Math.max(mt, Math.min(Et, _)) - mt) / At;
            t.updateNode(w, {
              data: { ...W.data, midpointOffset: zt }
            });
          }
      }, L = () => {
        i().removeEventListener("pointermove", E), i().removeEventListener("pointerup", L);
      };
      i().addEventListener("pointermove", E), i().addEventListener("pointerup", L);
    },
    [t, dt]
  ), gl = ct(
    (w, P, I) => {
      I.stopPropagation(), I.preventDefault();
      const H = t.getNode(w);
      if (!H || H.type !== "edge") return;
      const { fromId: z, toId: B, sourceHandle: E, targetHandle: L } = H.data, X = P === "source" ? B : z, V = P === "source" ? L : E, W = t.getNode(z), U = t.getNode(B);
      if (!W || !U) return;
      const q = Le(
        W,
        U,
        H.data.edgeType || "bezier",
        dt,
        E,
        L,
        void 0,
        void 0,
        void 0,
        void 0,
        H.data.sourceT,
        H.data.targetT,
        H.data.attachmentGap
      ), _ = P === "source" ? { x: q.x1, y: q.y1 } : { x: q.x2, y: q.y2 };
      Rt({
        edgeId: w,
        endpoint: P,
        anchorNodeId: X,
        anchorHandle: V,
        cursorX: _.x,
        cursorY: _.y
      });
      const nt = (Et) => {
        const { x: At, y: It } = t.screenToCanvas(Et.clientX, Et.clientY);
        Rt(
          (zt) => zt ? { ...zt, cursorX: At, cursorY: It } : null
        );
      }, mt = (Et) => {
        i().removeEventListener("pointermove", nt), i().removeEventListener("pointerup", mt), Rt(null);
        const { x: At, y: It } = t.screenToCanvas(Et.clientX, Et.clientY);
        let zt = t.hitTest(At, It, dt);
        if (!zt || zt.type === "edge" || t.isContainerType(zt.type)) {
          const Nt = 50 / t.viewport.zoom;
          let re = 1 / 0, ce = !1, se = null;
          for (const te of t.getAllNodes()) {
            if (te.type === "edge") continue;
            const de = t.isContainerType(te.type), Ke = Ae(te, At, It, dt), me = Math.hypot(Ke.x - At, Ke.y - It);
            me >= Nt || de && !ce && se || (!de && ce || me < re) && (re = me, ce = de, se = te);
          }
          se && (zt = se);
        }
        if (!zt || zt.type === "edge") return;
        const Yt = P === "source" ? zt.id : z, Xt = P === "target" ? zt.id : B;
        if (Yt === Xt) return;
        const it = P === "source" ? z : B;
        if (zt.id === it) return;
        const Mt = H.data.sourceT !== void 0 || H.data.targetT !== void 0, yt = Mt ? void 0 : Ar(zt, At, It, dt), Lt = Mt ? Ae(zt, At, It, dt).t : void 0, Qt = P === "source" ? {
          fromId: Yt,
          toId: Xt,
          sourceHandle: yt ?? E,
          targetHandle: L,
          sourcePort: H.data.sourcePort,
          targetPort: H.data.targetPort
        } : {
          fromId: Yt,
          toId: Xt,
          sourceHandle: E,
          targetHandle: yt ?? L,
          sourcePort: H.data.sourcePort,
          targetPort: H.data.targetPort
        };
        if (t.getAllNodes().some((Nt) => Nt.type !== "edge" || Nt.id === w ? !1 : Fn(Nt.data, Qt))) return;
        let Dt;
        Mt ? Dt = P === "source" ? { fromId: zt.id, sourceT: Lt, sourceHandle: void 0 } : { toId: zt.id, targetT: Lt, targetHandle: void 0 } : Dt = P === "source" ? { fromId: zt.id, sourceHandle: yt } : { toId: zt.id, targetHandle: yt }, t.updateNodeWithHistory(w, { data: Dt });
      };
      i().addEventListener("pointermove", nt), i().addEventListener("pointerup", mt);
    },
    [t, dt]
  ), ml = ct(
    (w) => {
      if (w.stopPropagation(), w.preventDefault(), t.presentationMode) return;
      const P = Array.from(t.selection).map((yt) => t.getNode(yt)).filter(Boolean);
      if (P.length < 2) return;
      const H = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, z = H ? t.groupRotations.get(H) : null;
      let B, E;
      if (z)
        B = z.cx, E = z.cy;
      else {
        let yt = 1 / 0, Lt = 1 / 0, Qt = -1 / 0, Pt = -1 / 0;
        for (const Dt of P) {
          const Nt = Dt.h === "auto" ? dt[Dt.id] ?? 100 : Dt.h, re = ye(Dt, Nt);
          yt = Math.min(yt, re.minX), Lt = Math.min(Lt, re.minY), Qt = Math.max(Qt, re.maxX), Pt = Math.max(Pt, re.maxY);
        }
        B = (yt + Qt) / 2, E = (Lt + Pt) / 2;
      }
      const L = (z == null ? void 0 : z.angle) ?? 0, V = P.filter((yt) => !yt.locked).map((yt) => {
        const Lt = yt.h === "auto" ? dt[yt.id] ?? 100 : yt.h;
        return {
          id: yt.id,
          cx: yt.x + yt.w / 2,
          cy: yt.y + Lt / 2,
          w: yt.w,
          h: Lt,
          rotation: yt.rotation || 0
        };
      }), W = -L * Math.PI / 180, U = Math.cos(W), q = Math.sin(W);
      let _ = 1 / 0, nt = 1 / 0, mt = -1 / 0, Et = -1 / 0;
      for (const yt of V) {
        const Lt = yt.cx - B, Qt = yt.cy - E, Pt = B + Lt * U - Qt * q, Dt = E + Lt * q + Qt * U;
        _ = Math.min(_, Pt - yt.w / 2), nt = Math.min(nt, Dt - yt.h / 2), mt = Math.max(mt, Pt + yt.w / 2), Et = Math.max(Et, Dt + yt.h / 2);
      }
      const At = {
        x: _ - he,
        y: nt - he,
        w: mt - _ + he * 2,
        h: Et - nt + he * 2
      }, { x: It, y: zt } = t.screenToCanvas(w.clientX, w.clientY), Yt = Math.atan2(zt - E, It - B);
      t.pushHistorySnapshot();
      let Xt = L;
      const it = (yt) => {
        const { x: Lt, y: Qt } = t.screenToCanvas(yt.clientX, yt.clientY);
        let Dt = (Math.atan2(Qt - E, Lt - B) - Yt) * (180 / Math.PI);
        (yt.shiftKey || t.snapToGrid) && !(yt.metaKey || yt.ctrlKey) && (Dt = Math.round(Dt / 15) * 15), Xt = L + Dt, No({ angle: Xt, cx: B, cy: E, bounds: At });
        const Nt = Dt * Math.PI / 180, re = Math.cos(Nt), ce = Math.sin(Nt), se = V.map((te) => {
          const de = te.cx - B, Ke = te.cy - E, me = B + de * re - Ke * ce, Yo = E + de * ce + Ke * re;
          return {
            id: te.id,
            patch: {
              x: me - te.w / 2,
              y: Yo - te.h / 2,
              rotation: Xt
            }
          };
        });
        t.updateMany(se);
      }, Mt = () => {
        H && t.groupRotations.set(H, { angle: Xt, cx: B, cy: E }), No({ angle: Xt, cx: B, cy: E, bounds: At }), i().removeEventListener("pointermove", it), i().removeEventListener("pointerup", Mt);
      };
      i().addEventListener("pointermove", it), i().addEventListener("pointerup", Mt);
    },
    [t, dt, ye]
  ), bl = ct(
    (w, P) => {
      if (P.stopPropagation(), P.preventDefault(), t.presentationMode) return;
      const I = Array.from(t.selection).map((it) => t.getNode(it)).filter(Boolean);
      if (I.length < 2) return;
      const H = (it) => it.h === "auto" ? dt[it.id] ?? 100 : it.h;
      let z = 1 / 0, B = 1 / 0, E = -1 / 0, L = -1 / 0;
      for (const it of I) {
        const Mt = H(it), yt = ye(it, Mt);
        z = Math.min(z, yt.minX), B = Math.min(B, yt.minY), E = Math.max(E, yt.maxX), L = Math.max(L, yt.maxY);
      }
      const X = { x: z, y: B, w: E - z, h: L - B }, V = X.w || 1, W = X.h || 1, q = I.filter((it) => !it.locked).map((it) => {
        const Mt = H(it);
        return {
          id: it.id,
          type: it.type,
          isAutoH: it.h === "auto",
          relX: (it.x - X.x) / V,
          relY: (it.y - X.y) / W,
          relW: it.w / V,
          relH: Mt / W,
          origW: it.w,
          origH: Mt,
          origPoints: it.type === "draw" ? it.data.points.map((yt) => [...yt]) : null,
          drawData: it.type === "draw" ? { ...it.data } : null
        };
      }), _ = P.clientX, nt = P.clientY;
      t.pushHistorySnapshot();
      let mt = null, Et = _, At = nt, It = !1;
      const zt = () => {
        mt = null;
        const it = (Et - _) / t.viewport.zoom, Mt = (At - nt) / t.viewport.zoom;
        let yt = X.x, Lt = X.y, Qt = X.w, Pt = X.h;
        if ((w === "nw" || w === "w" || w === "sw") && (yt = X.x + it, Qt = X.w - it), (w === "ne" || w === "e" || w === "se") && (Qt = X.w + it), (w === "nw" || w === "n" || w === "ne") && (Lt = X.y + Mt, Pt = X.h - Mt), (w === "sw" || w === "s" || w === "se") && (Pt = X.h + Mt), t.snapToGrid && !It) {
          const Nt = t.gridSize, re = (ce) => Math.round(ce / Nt) * Nt;
          (w === "nw" || w === "w" || w === "sw") && (yt = re(yt), Qt = X.x + X.w - yt), (w === "ne" || w === "e" || w === "se") && (Qt = re(yt + Qt) - yt), (w === "nw" || w === "n" || w === "ne") && (Lt = re(Lt), Pt = X.y + X.h - Lt), (w === "sw" || w === "s" || w === "se") && (Pt = re(Lt + Pt) - Lt);
        }
        Qt < 20 && (Qt = 20, (w === "nw" || w === "w" || w === "sw") && (yt = X.x + X.w - 20)), Pt < 20 && (Pt = 20, (w === "nw" || w === "n" || w === "ne") && (Lt = X.y + X.h - 20));
        const Dt = q.map((Nt) => {
          const re = yt + Nt.relX * Qt, ce = Lt + Nt.relY * Pt, se = Nt.relW * Qt, te = Nt.relH * Pt, de = {
            x: re,
            y: ce,
            w: se,
            h: Nt.isAutoH ? "auto" : te
          };
          if (Nt.origPoints && Nt.drawData) {
            const Ke = Nt.origW > 0 ? se / Nt.origW : 1, me = Nt.origH > 0 ? te / Nt.origH : 1;
            de.data = {
              ...Nt.drawData,
              points: Nt.origPoints.map(
                ([Yo, wn, zr]) => [Yo * Ke, wn * me, zr]
              )
            };
          }
          return { id: Nt.id, patch: de };
        });
        t.updateMany(Dt);
      }, Yt = (it) => {
        Et = it.clientX, At = it.clientY, It = it.metaKey || it.ctrlKey, mt === null && (mt = requestAnimationFrame(zt));
      }, Xt = () => {
        mt !== null && (cancelAnimationFrame(mt), zt()), i().removeEventListener("pointermove", Yt), i().removeEventListener("pointerup", Xt);
        for (const it of I)
          t.isContainerType(it.type) && t.syncFrameChildrenAfterResize(it.id);
      };
      i().addEventListener("pointermove", Yt), i().addEventListener("pointerup", Xt);
    },
    [t, dt, ye]
  );
  kt(() => {
    s.current && (s.current.style.cursor = t.lassoSelect ? qo : Fr(x)), x !== "select" && x !== "edge" && (nr.current = null, dn(null)), x !== "erase" && (_e.current !== null && (cancelAnimationFrame(_e.current), _e.current = null), ko.current = /* @__PURE__ */ new Set(), yn(/* @__PURE__ */ new Set()), Ne.current = [], ir([]));
  }, [x]);
  const bn = ht(null), js = ht(null), xl = ct(
    (w) => {
      if (Q.current && w.pointerType === "touch" && K.current) {
        const P = w.clientX - K.current.clientX, I = w.clientY - K.current.clientY;
        Math.sqrt(P * P + I * I) > 8 && (clearTimeout(Q.current), Q.current = null, K.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (js.current = { clientX: w.clientX, clientY: w.clientY }, bn.current === null && (bn.current = requestAnimationFrame(() => {
        bn.current = null;
        const P = s.current, I = js.current;
        if (!P || !I) return;
        const { x: H, y: z } = t.screenToCanvas(I.clientX, I.clientY);
        if (t.lassoSelect) {
          P.style.cursor = qo;
          return;
        }
        if (t.mode === "edge") {
          const L = 50 / t.viewport.zoom;
          let X = null, V = L;
          for (const W of t.getAllNodes()) {
            if (W.type === "edge") continue;
            const U = Ae(W, H, z, dt), q = Math.hypot(U.x - H, U.y - z);
            q < V && (V = q, X = W.id);
          }
          X !== nr.current && (nr.current = X, dn(X)), sl({ x: H, y: z });
          return;
        }
        if (t.selection.size >= 2 && ne && H >= ne.x && H <= ne.x + ne.w && z >= ne.y && z <= ne.y + ne.h) {
          P.style.cursor = "move";
          return;
        }
        const B = t.hitTest(H, z, dt), E = B ? B.id : null;
        if (E !== nr.current && (nr.current = E, dn(E)), B) {
          P.style.cursor = "move";
          return;
        }
        P.style.cursor = "default";
      })));
    },
    [t, ne, dt, ye]
  ), wl = ct((w) => {
    (w.dataTransfer.types.includes("Files") || w.dataTransfer.types.includes(es) || w.dataTransfer.types.includes(os) || w.dataTransfer.types.includes(rs)) && (w.preventDefault(), w.dataTransfer.dropEffect = "copy");
  }, []), kl = ct(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const P = w.dataTransfer.getData(rs);
      if (P) {
        try {
          const X = JSON.parse(P);
          Ya(t, X, w.clientX, w.clientY);
        } catch (X) {
          console.error("Failed to place GIF:", X);
        }
        return;
      }
      const I = w.dataTransfer.getData(os);
      if (I) {
        try {
          const { itemId: X } = JSON.parse(I), W = Fa().find((U) => U.id === X);
          W && Oa(t, W, w.clientX, w.clientY);
        } catch (X) {
          console.error("Failed to place personal library item:", X);
        }
        return;
      }
      const H = w.dataTransfer.getData(es);
      if (H) {
        try {
          const { libraryId: X, itemId: V } = JSON.parse(H), U = vs(X).find((q) => q.id === V);
          U && Ha(t, U, w.clientX, w.clientY);
        } catch (X) {
          console.error("Failed to place library item:", X);
        }
        return;
      }
      const z = w.dataTransfer.files[0];
      if (!z) return;
      if (z.name.endsWith(".excalidrawlib") || z.name.endsWith(".excalidrawlib.json")) {
        const X = new FileReader();
        X.onload = () => {
          try {
            const V = JSON.parse(X.result);
            if (V.type === "excalidrawlib") {
              const W = z.name.replace(/\.excalidrawlib(\.json)?$/, "");
              Ss(V, { name: W });
            }
          } catch (V) {
            console.error("Failed to import library:", V);
          }
        }, X.readAsText(z);
        return;
      }
      if (z.type === "image/svg+xml" || z.name.endsWith(".svg")) {
        const X = new FileReader();
        X.onload = () => {
          const V = X.result, W = ns(V);
          W && _h(t, W, w.clientX, w.clientY);
        }, X.readAsText(z);
        return;
      }
      if (!z.type.startsWith("image/")) return;
      const { x: B, y: E } = t.screenToCanvas(w.clientX, w.clientY), L = new FileReader();
      L.onload = () => {
        const X = L.result, V = new Image();
        V.onload = () => {
          const W = Math.min(V.naturalWidth, 400), U = Math.min(V.naturalHeight, 300), q = V.naturalWidth / V.naturalHeight, _ = q >= 1 ? W : U * q, nt = q >= 1 ? W / q : U;
          t.addNode({
            id: Tt(10),
            type: "image",
            x: B,
            y: E,
            w: _,
            h: nt,
            z: t.nextZ(),
            data: { src: X }
          });
        }, V.src = X;
      }, L.readAsDataURL(z);
    },
    [t]
  ), vl = `translate(${c.x}px, ${c.y}px) scale(${c.zoom})`, xn = M.activeIndex >= 0 ? ((qs = M.matches[M.activeIndex]) == null ? void 0 : qs.nodeId) ?? null : null, Vs = Ut(() => {
    if (!M.query || M.matches.length === 0) return /* @__PURE__ */ new Set();
    const w = /* @__PURE__ */ new Set();
    for (const P of M.matches)
      P.nodeType !== "edge" && w.add(P.nodeId);
    return w;
  }, [M]);
  return $r(() => {
    const w = s.current;
    if (g || !w || !M.query || M.matches.length === 0) {
      F((E) => E.length === 0 ? E : []);
      return;
    }
    const P = w.getBoundingClientRect(), I = M.query.toLocaleLowerCase(), H = Array.from(new Set(M.matches.map((E) => E.nodeId))), z = [], B = 900;
    for (const E of H) {
      if (z.length >= B) break;
      const L = E.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), X = w.querySelector(`[data-node-id="${L}"]`);
      if (!X) continue;
      const V = document.createTreeWalker(
        X,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(U) {
            const q = U.parentElement;
            return !q || q.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']") || !U.nodeValue || !U.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let W = V.nextNode();
      for (; W && z.length < B; ) {
        const U = W, _ = (U.nodeValue ?? "").toLocaleLowerCase();
        let nt = 0;
        for (; nt <= _.length - I.length && z.length < B; ) {
          const mt = _.indexOf(I, nt);
          if (mt < 0) break;
          const Et = document.createRange();
          Et.setStart(U, mt), Et.setEnd(U, mt + I.length);
          const At = Et.getClientRects();
          for (const It of At)
            It.width <= 0 || It.height <= 0 || z.push({
              x: It.left - P.left,
              y: It.top - P.top,
              w: It.width,
              h: It.height,
              active: E === xn
            });
          nt = mt + I.length;
        }
        W = V.nextNode();
      }
    }
    F((E) => E.length === z.length && E.every((L, X) => {
      const V = z[X];
      return L.x === V.x && L.y === V.y && L.w === V.w && L.h === V.h && L.active === V.active;
    }) ? E : z);
  }, [M, p, c, xn, g]), /* @__PURE__ */ v(
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
        background: kr(D).canvasBg
      },
      onPointerDown: dl,
      onPointerMove: xl,
      onDoubleClick: cl,
      onContextMenu: ll,
      onDragOver: wl,
      onDrop: kl,
      children: [
        /* @__PURE__ */ u(Sh, { viewport: c, gridSize: $, background: D, gridVisible: T }),
        /* @__PURE__ */ v(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              transform: vl,
              transformOrigin: "0 0",
              pointerEvents: "none"
            },
            children: [
              go.sort((w, P) => w.z - P.z).map((w) => {
                var E;
                const P = fn.has(w.id), I = il.has(w.id), z = -(w.id.split("").reduce((L, X) => L + X.charCodeAt(0), 0) % 240 / 100);
                let B;
                if (o) {
                  const L = o.get(w.type);
                  if (L) {
                    const X = L.component, V = f.has(w.id) && x !== "edge", W = x === "select" || x === "text" || x === "note" || x === "sticky", U = /* @__PURE__ */ u(
                      X,
                      {
                        node: w,
                        data: w.data,
                        isSelected: V,
                        multiSelected: f.size > 1 && V && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: W,
                        zoom: c.zoom,
                        editing: Bs === w.id,
                        editClickPos: Bs === w.id ? un.current : null,
                        callbacks: {
                          onMeasuredHeight: _t,
                          onResizeHandleDown: mn,
                          onEditStart: (q) => {
                            const _ = t.getNode(q);
                            _ && (_.type === "text" ? xo(q) : _.type === "sticky" ? wo(q) : _.type === "frame" ? Ho(q) : _.type === "shape" ? Oo(q) : _.type === "image" ? Xo(q) : _.type === "youtube" && Fs(q));
                          },
                          onEditEnd: () => {
                            xo(null), wo(null), Ho(null), Oo(null), Xo(null), Fs(null);
                          }
                        },
                        portValues: r && ((E = L.ports) != null && E.length) && Ys >= 0 ? r.getAllPortValues(w.id) : void 0,
                        updateData: (q) => {
                          t.updateNodeWithHistory(w.id, {
                            data: { ...w.data, ...q }
                          });
                        }
                      },
                      L.handlesOwnLayout ? w.id : void 0
                    );
                    L.handlesOwnLayout ? B = U : B = /* @__PURE__ */ u(
                      Eu,
                      {
                        node: w,
                        isInteractive: W,
                        measuredH: dt[w.id],
                        onMeasuredHeight: _t,
                        observeElement: Ce,
                        unobserveElement: we,
                        isContainer: L.isContainer,
                        children: U
                      },
                      w.id
                    );
                  }
                } else if (w.type === "content") {
                  const L = w;
                  B = /* @__PURE__ */ u(
                    ia,
                    {
                      node: L,
                      isSelected: f.has(w.id) && x !== "edge",
                      multiSelected: f.size > 1 && f.has(w.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: x === "select" || x === "text" || x === "note",
                      zoom: c.zoom,
                      onMeasuredHeight: _t,
                      autoEdit: Ns.current === L.id
                    },
                    w.id
                  );
                } else if (w.type === "text")
                  B = /* @__PURE__ */ u(
                    xa,
                    {
                      node: w,
                      engine: t,
                      editing: hn === w.id,
                      editClickPos: hn === w.id ? un.current : null,
                      onStopEdit: () => {
                        if (pn.current === w.id) {
                          pn.current = null;
                          const L = t.getNode(w.id);
                          if (!L || !L.data.text.trim()) {
                            t.deleteNode(w.id), xo(null);
                            return;
                          }
                          t.pushHistorySnapshot();
                        }
                        xo(null);
                      },
                      onMeasuredHeight: _t
                    },
                    w.id
                  );
                else if (w.type === "image")
                  B = /* @__PURE__ */ u(
                    ba,
                    {
                      node: w,
                      isSelected: f.has(w.id) && x !== "edge",
                      engine: t,
                      interactive: x === "select",
                      zoom: c.zoom,
                      onResizeHandleDown: mn,
                      cropping: Ws === w.id,
                      onCropStart: () => Xo(w.id),
                      onCropEnd: () => Xo(null)
                    },
                    w.id
                  );
                else if (w.type === "sticky")
                  B = /* @__PURE__ */ u(
                    wa,
                    {
                      node: w,
                      isSelected: f.has(w.id) && x !== "edge",
                      engine: t,
                      interactive: x === "select" || x === "sticky",
                      zoom: c.zoom,
                      editing: Ds === w.id,
                      onEditStart: wo,
                      onEditEnd: () => wo(null)
                    },
                    w.id
                  );
                else if (w.type === "frame") {
                  const L = w, X = L.h === "auto" ? 100 : L.h;
                  B = /* @__PURE__ */ u(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: L.x,
                        top: L.y,
                        width: L.w,
                        height: X,
                        zIndex: L.z,
                        background: L.data.backgroundColor || "rgba(0,0,0,0.02)",
                        border: `${L.data.borderWidth || 1}px ${L.data.borderStyle || "dashed"} ${L.data.borderColor || "#ccc"}`,
                        boxSizing: "border-box",
                        borderRadius: 8,
                        opacity: L.data.opacity ?? 1,
                        pointerEvents: "none",
                        overflow: "visible",
                        transform: L.rotation ? `rotate(${L.rotation}deg)` : void 0,
                        transformOrigin: "center center"
                      },
                      children: Ls === w.id ? /* @__PURE__ */ u(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: L.data.label ?? "",
                          placeholder: n.frameLabelPlaceholder,
                          onBlur: (V) => {
                            const W = V.currentTarget.value.trim();
                            t.updateNodeWithHistory(w.id, {
                              data: { ...L.data, label: W || void 0 }
                            }), Ho(null);
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
                            color: L.data.borderColor || "#999",
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
                      ) : L.data.label ? /* @__PURE__ */ u(
                        "div",
                        {
                          onDoubleClick: (V) => {
                            V.stopPropagation(), t.select(w.id), Ho(w.id);
                          },
                          style: {
                            position: "absolute",
                            top: -20,
                            left: 4,
                            fontSize: 12,
                            color: L.data.borderColor || "#999",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            pointerEvents: "auto",
                            cursor: "default"
                          },
                          children: L.data.label
                        }
                      ) : null
                    },
                    w.id
                  );
                } else {
                  const L = w;
                  L.type === "draw" ? B = /* @__PURE__ */ u(Zr, { node: L }, w.id) : B = /* @__PURE__ */ u(Zr, { node: L, editingLabel: sr === w.id }, w.id);
                }
                return P || I ? /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      opacity: P ? 0.25 : void 0,
                      filter: P ? "saturate(0)" : void 0,
                      animation: I ? "sb-node-bop 3.4s ease-in-out infinite" : void 0,
                      animationDelay: I ? `${z}s` : void 0,
                      transformOrigin: "center center",
                      willChange: I ? "transform" : void 0
                    },
                    children: B
                  },
                  w.id
                ) : B;
              }),
              Vs.size > 0 && Array.from(Vs).map((w) => {
                const P = t.getNode(w);
                if (!P || P.type === "edge") return null;
                const I = P.h === "auto" ? dt[P.id] ?? 100 : P.h, H = xn === w;
                return /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: P.x - 5,
                      top: P.y - 5,
                      width: P.w + 10,
                      height: I + 10,
                      borderRadius: 10,
                      border: `2px solid ${H ? "#f59e0b" : "#60a5fa"}`,
                      boxShadow: H ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
                      pointerEvents: "none",
                      transform: P.rotation ? `rotate(${P.rotation}deg)` : void 0,
                      transformOrigin: "center center"
                    }
                  },
                  `search-highlight-${w}`
                );
              }),
              sr && (() => {
                const w = t.getNode(sr);
                if (!w || w.type !== "shape") return null;
                const P = w.data;
                return P.shape === "line" || P.shape === "arrow" ? null : /* @__PURE__ */ u(
                  Ru,
                  {
                    node: w,
                    engine: t,
                    onDone: () => Oo(null)
                  },
                  sr
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ u(
          ou,
          {
            nodes: C,
            viewport: c,
            selection: f,
            measuredHeights: dt,
            activeStroke: gt,
            shapePreview: vt,
            shapePreviewStyle: vt ? {
              stroke: t.mode === "frame" ? "#1e1e2e" : t.activeTool.color,
              strokeWidth: t.mode === "frame" ? 1 : t.activeTool.width,
              roughness: t.mode === "frame" ? 0 : t.activeTool.roughness ?? 1,
              shapeType: t.mode === "frame" ? "rect" : t.activeTool.shapeType || "rect",
              fill: t.mode === "frame" ? void 0 : t.activeTool.fillColor,
              fillStyle: t.mode === "frame" ? void 0 : t.activeTool.fillStyle,
              strokeStyle: t.mode === "frame" ? void 0 : t.activeTool.strokeStyle,
              opacity: t.mode === "frame" ? void 0 : t.activeTool.opacity,
              edgeStyle: void 0
            } : null,
            onResizeHandleDown: mn,
            onRotateStart: hl,
            onConnectionHandleDown: Gs,
            onEdgeEndpointDown: gl,
            onKinkHandleDown: yl,
            edgePreview: pt,
            edgeReconnect: St,
            eraserMarkedIds: fn.size > 0 ? fn : void 0,
            eraserTrail: Hs.length > 1 ? Hs : void 0,
            laserTrail: Os.length > 1 ? Os : void 0,
            mode: x,
            freeFormEdges: t.freeFormEdges,
            hoveredNodeId: rl,
            cursorCanvasPos: nl,
            registry: o,
            onPortHandleDown: pl,
            cycleNodeIds: r && Ys >= 0 ? r.cycleNodeIds : void 0,
            containerTypes: t.containerTypes,
            alignGuides: st
          }
        ),
        ne && x !== "edge" && !pt && !St && (() => {
          const w = t.selectionGroupId(), P = w ? t.groupRotations.get(w) : void 0;
          let I, H, z, B;
          if (mo)
            I = mo.bounds, H = mo.angle, z = mo.cx, B = mo.cy;
          else if (P && P.angle !== 0) {
            const W = -P.angle * Math.PI / 180, U = Math.cos(W), q = Math.sin(W);
            let _ = 1 / 0, nt = 1 / 0, mt = -1 / 0, Et = -1 / 0;
            for (const At of t.selection) {
              const It = t.getNode(At);
              if (!It || It.type === "edge") continue;
              const zt = It.h === "auto" ? dt[It.id] ?? 100 : It.h, Yt = It.x + It.w / 2, Xt = It.y + zt / 2, it = Yt - P.cx, Mt = Xt - P.cy, yt = P.cx + it * U - Mt * q, Lt = P.cy + it * q + Mt * U;
              _ = Math.min(_, yt - It.w / 2), nt = Math.min(nt, Lt - zt / 2), mt = Math.max(mt, yt + It.w / 2), Et = Math.max(Et, Lt + zt / 2);
            }
            I = {
              x: _ - he,
              y: nt - he,
              w: mt - _ + he * 2,
              h: Et - nt + he * 2
            }, H = P.angle, z = P.cx, B = P.cy;
          } else
            I = ne, H = 0, z = 0, B = 0;
          const E = 8 / c.zoom, L = E / 2, X = [
            { pos: "nw", cx: I.x, cy: I.y },
            { pos: "n", cx: I.x + I.w / 2, cy: I.y },
            { pos: "ne", cx: I.x + I.w, cy: I.y },
            { pos: "e", cx: I.x + I.w, cy: I.y + I.h / 2 },
            { pos: "se", cx: I.x + I.w, cy: I.y + I.h },
            { pos: "s", cx: I.x + I.w / 2, cy: I.y + I.h },
            { pos: "sw", cx: I.x, cy: I.y + I.h },
            { pos: "w", cx: I.x, cy: I.y + I.h / 2 }
          ], V = H !== 0 ? ` rotate(${H}, ${z}, ${B})` : "";
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ v("g", { transform: V, children: [
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
                H === 0 && X.map(({ pos: W, cx: U, cy: q }) => /* @__PURE__ */ u(
                  "rect",
                  {
                    x: U - L,
                    y: q - L,
                    width: E,
                    height: E,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / c.zoom,
                    style: { cursor: tn(W, H), pointerEvents: "auto" },
                    onPointerDown: (_) => {
                      _.stopPropagation(), bl(W, _);
                    }
                  },
                  W
                )),
                (() => {
                  const W = 25 / c.zoom, U = I.x + I.w / 2, q = I.y;
                  return /* @__PURE__ */ v(wt, { children: [
                    /* @__PURE__ */ u(
                      "line",
                      {
                        x1: U,
                        y1: q,
                        x2: U,
                        y2: q - W,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / c.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const _ = 8 / c.zoom, nt = _ / 2;
                      return /* @__PURE__ */ u(
                        "rect",
                        {
                          x: U - nt,
                          y: q - W - nt,
                          width: _,
                          height: _,
                          rx: 1.5 / c.zoom,
                          transform: `rotate(45, ${U}, ${q - W})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / c.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (mt) => ml(mt)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const W = 26 / c.zoom, U = 42 / c.zoom, q = 4 / c.zoom;
                  return [
                    { side: "top", cx: I.x + I.w / 2, cy: I.y - U },
                    { side: "right", cx: I.x + I.w + W, cy: I.y + I.h / 2 },
                    { side: "bottom", cx: I.x + I.w / 2, cy: I.y + I.h + W },
                    { side: "left", cx: I.x - W, cy: I.y + I.h / 2 }
                  ].map(({ side: nt, cx: mt, cy: Et }) => /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: mt,
                      cy: Et,
                      r: q,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / c.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (At) => {
                        At.stopPropagation();
                        const It = ul(nt);
                        It && Gs(It, nt, At);
                      }
                    },
                    `conn-${nt}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Ge && /* @__PURE__ */ u(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ u("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ u(
              "rect",
              {
                x: Ge.x,
                y: Ge.y,
                width: Ge.w,
                height: Ge.h,
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
        $t && (() => {
          const w = t.canvasToScreen($t.startX, $t.startY), P = t.canvasToScreen($t.endX, $t.endY), I = Math.min(w.x, P.x), H = Math.min(w.y, P.y), z = Math.abs(P.x - w.x), B = Math.abs(P.y - w.y);
          return z < 2 && B < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
                "rect",
                {
                  x: I,
                  y: H,
                  width: z,
                  height: B,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        Ie && Ie.length > 2 && (() => {
          const P = Ie.map(([I, H]) => t.canvasToScreen(I, H)).map((I) => `${I.x},${I.y}`).join(" ");
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
                "polygon",
                {
                  points: P,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        Ve && (() => {
          const w = Math.min(Ve.startX, Ve.endX), P = Math.min(Ve.startY, Ve.endY), I = Math.abs(Ve.endX - Ve.startX), H = Math.abs(Ve.endY - Ve.startY);
          return I < 2 && H < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ u(
                "rect",
                {
                  x: w,
                  y: P,
                  width: I,
                  height: H,
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
        R.length > 0 && /* @__PURE__ */ u(
          "div",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: R.map((w, P) => /* @__PURE__ */ u(
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
              `search-text-rect-${P}`
            ))
          }
        ),
        Be && /* @__PURE__ */ u(
          ru,
          {
            x: Be.x,
            y: Be.y,
            sections: Be.sections,
            onClose: () => je(null)
          }
        ),
        Mr && /* @__PURE__ */ u(
          Jh,
          {
            nodes: Mr.nodes,
            onSave: (w) => {
              Hh(w, Mr.nodes, Mr.groupParent), gn(null);
            },
            onCancel: () => gn(null)
          }
        )
      ]
    }
  );
}
const Ue = 52, $o = 300, Wf = Ue + $o, Du = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], zs = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Wu = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], Jr = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], $a = [1, 2, 3, 5, 8, 12], Ts = [1, 2, 3, 4, 6, 8], _a = [1, 2, 3, 4, 6], Fu = Ts, tl = [14, 20, 28, 36], Ps = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Bu = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Ee = [
  { name: "Standard", colors: Du },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], As = Ee, Nu = [
  { name: "Standard", colors: Bu },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Ft = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Wt = {
  width: 64,
  fontSize: 10,
  flexShrink: 0
}, Kt = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
}, Hu = "https://libraries.excalidraw.com/libraries.json", is = "https://libraries.excalidraw.com/libraries";
function Ou({
  onClose: t,
  onInstalled: e
}) {
  const o = Zt(), { labels: r } = qt(), [n, s] = ot([]), [i, a] = ot(!0), [l, c] = ot(null), [d, p] = ot(""), [h, f] = ot(null), [m, g] = ot(/* @__PURE__ */ new Set()), y = ct(() => {
    const k = Ca(), S = new Set(k.map((M) => M.source));
    g(S);
  }, []);
  kt(() => {
    let k = !1;
    return (async () => {
      try {
        const S = await fetch(Hu);
        if (!S.ok) throw new Error(`HTTP ${S.status}`);
        const M = await S.json();
        k || (s(M), a(!1));
      } catch (S) {
        k || (c(String(S)), a(!1));
      }
    })(), y(), () => {
      k = !0;
    };
  }, [y]);
  const x = Ut(() => {
    if (!d.trim()) return n;
    const k = d.toLowerCase();
    return n.filter(
      (S) => {
        var M, A;
        return S.name.toLowerCase().includes(k) || ((M = S.description) == null ? void 0 : M.toLowerCase().includes(k)) || ((A = S.itemNames) == null ? void 0 : A.some((R) => R.toLowerCase().includes(k)));
      }
    );
  }, [n, d]), b = ct(
    async (k) => {
      f(k.id);
      try {
        const S = `${is}/${k.source}`;
        await zh(S, k.name), y(), e();
      } catch (S) {
        console.error("Failed to install library:", S);
      } finally {
        f(null);
      }
    },
    [e, y]
  );
  return Je(
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
        onPointerDown: (k) => {
          k.target === k.currentTarget && t();
        },
        children: /* @__PURE__ */ v(
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
            onPointerDown: (k) => k.stopPropagation(),
            children: [
              /* @__PURE__ */ v(
                "div",
                {
                  style: {
                    padding: "16px 20px 12px",
                    borderBottom: `1px solid ${o.border}`,
                    flexShrink: 0
                  },
                  children: [
                    /* @__PURE__ */ v(
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
                        onChange: (k) => p(k.target.value),
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
              /* @__PURE__ */ v(
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
                    l && /* @__PURE__ */ v(
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
                    !i && !l && x.length === 0 && /* @__PURE__ */ u(
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
                    x.map((k, S) => {
                      const M = m.has(
                        `${is}/${k.source}`
                      ), A = h === k.id;
                      return /* @__PURE__ */ u(
                        Xu,
                        {
                          entry: k,
                          isInstalled: M,
                          isInstalling: A,
                          onInstall: () => b(k),
                          theme: o
                        },
                        k.id || `dir-${S}`
                      );
                    })
                  ]
                }
              ),
              /* @__PURE__ */ v(
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
function Xu({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: r,
  theme: n
}) {
  var a;
  const { labels: s } = qt(), i = t.preview ? `${is}/${t.preview}` : null;
  return /* @__PURE__ */ v(
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
        /* @__PURE__ */ v("div", { style: { flex: 1, minWidth: 0 }, children: [
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
          ((a = t.authors) == null ? void 0 : a.length) > 0 && /* @__PURE__ */ v(
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
const Gu = /^[A-Za-z][A-Za-z0-9_:-]*$/, Li = /^[A-Za-z][A-Za-z0-9_]*$/;
function Yu(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function De(t) {
  return Yu(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function Bn(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function Io(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: De(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: De(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: De(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: De(o[2]), shape: "rect" } : Gu.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function ju(t) {
  let e = t.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (e) {
    const o = Io(e[1]), r = Io(e[3]);
    return !o || !r ? null : { from: o, to: r, label: De(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/), e) {
    const o = Io(e[1]), r = Io(e[3]);
    return !o || !r ? null : { from: o, to: r, label: De(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/), e) {
    const o = Io(e[1]), r = Io(e[2]);
    return !o || !r ? null : { from: o, to: r };
  }
  return null;
}
function Vu(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function qu(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return r ? { label: De(r[1]) } : { label: De(o) };
}
function Ku(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, r = t.replace(/\r\n/g, `
`).split(`
`).map((l) => l.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (r.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const n = r[0];
  /^(flowchart|graph)\b/i.test(n) && (o.direction = Vu(n), r.shift());
  const i = [], a = (l) => {
    for (const c of i) c.nodeKeys.add(l);
  };
  for (const l of r) {
    const c = l.split(";").map((d) => d.trim()).filter(Boolean);
    for (const d of c) {
      const p = qu(d);
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
      const h = ju(d);
      if (h) {
        const m = Bn(o, h.from), g = Bn(o, h.to);
        a(m.key), a(g.key), o.edges.push({ fromKey: m.key, toKey: g.key, label: h.label });
        continue;
      }
      const f = Io(d);
      if (f) {
        const m = Bn(o, f);
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
function Uu(t) {
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
    if (!(!Li.test(a) || !Li.test(l)))
      return {
        from: a,
        arrow: s,
        to: l,
        label: De(r)
      };
  }
  return null;
}
function Zu(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: De(e[3])
  } : null;
}
function Qu(t) {
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
function Ju(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.indexOf(" "), n = r >= 0 ? o.slice(0, r) : o, s = r >= 0 ? o.slice(r + 1).trim() : "";
  return Qu(n) ? { color: n, label: s || void 0 } : { label: o };
}
function $u(t) {
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
    const m = Ju(f);
    if (m) {
      l.push({ type: "box", label: m.label, color: m.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const g = f.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (g) {
      l.push({
        type: "loop",
        label: g[1] ? De(g[1]) : void 0,
        startStep: c,
        participants: /* @__PURE__ */ new Set()
      });
      continue;
    }
    if (/^end\b/i.test(f)) {
      const k = l.pop();
      (k == null ? void 0 : k.type) === "box" ? a.push(k) : (k == null ? void 0 : k.type) === "loop" && i.push({
        label: k.label,
        startStep: k.startStep,
        endStep: c,
        participants: k.participants
      });
      continue;
    }
    const y = f.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (y) {
      d(y[1]);
      continue;
    }
    const x = Zu(f);
    if (x) {
      d(x.of), s.push({ step: c, note: x });
      continue;
    }
    const b = Uu(f);
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
function Br(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function _u(t) {
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
function tp(t, e, o, r) {
  const n = $u(t), s = [], i = [], a = 6, l = "#94a3b8", c = 3, d = "#475569", p = 180, h = 64, f = 270, m = o - 140, g = m + h + 8, y = 88, x = Math.max(1, n.messages.length), b = g + x * y + 40, k = b + 12, S = k + h, M = /* @__PURE__ */ new Map();
  for (const A of n.groups) {
    const R = A.participants.map((ft) => M.get(ft)).filter((ft) => typeof ft == "number");
    if (R.length === 0)
      for (const ft of A.participants) {
        const G = n.participants.indexOf(ft);
        G >= 0 && R.push(e + (G - (n.participants.length - 1) / 2) * f);
      }
    if (R.length === 0) continue;
    const F = Math.min(...R) - p / 2 - 24, T = Math.max(...R) + p / 2 + 24, O = m - 22, $ = S - O + 18, at = {
      id: Tt(10),
      type: "shape",
      x: F,
      y: O,
      w: T - F,
      h: $,
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
    if (s.push(at), i.push(at.id), A.label) {
      const ft = {
        id: Tt(10),
        type: "text",
        x: F + 10,
        y: O + 8,
        w: Math.max(120, T - F - 20),
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
      s.push(ft);
    }
  }
  for (let A = 0; A < n.participants.length; A++) {
    const R = n.participants[A], F = e + (A - (n.participants.length - 1) / 2) * f;
    M.set(R, F);
    const T = {
      id: Tt(10),
      type: "shape",
      x: F - p / 2,
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
        label: R,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(T), i.push(T.id);
    const O = {
      id: Tt(10),
      type: "shape",
      x: F - a / 2,
      y: g,
      w: a,
      h: b - g,
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
    s.push(O);
    const $ = {
      id: Tt(10),
      type: "shape",
      x: F - p / 2,
      y: k,
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
        label: R,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push($), i.push($.id);
  }
  for (const A of n.loops) {
    const R = A.participants.map((D) => M.get(D)).filter((D) => typeof D == "number");
    if (R.length === 0) continue;
    const F = Math.min(...R) - 130, T = Math.max(...R) + 130, O = A.startStep + 1, $ = Math.max(O, A.endStep), at = g + (O - 1) * y + 16, ft = g + $ * y + 34, G = {
      id: Tt(10),
      type: "shape",
      x: F,
      y: at,
      w: T - F,
      h: Math.max(90, ft - at),
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
    s.push(G);
    const st = `loop${A.label ? ` [${A.label}]` : ""}`, N = {
      id: Tt(10),
      type: "text",
      x: F + 10,
      y: at + 8,
      w: T - F - 20,
      h: "auto",
      z: r(),
      data: {
        text: st,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#1f2937",
        align: "left"
      }
    };
    s.push(N);
  }
  for (let A = 0; A < n.messages.length; A++) {
    const R = n.messages[A], F = g + (A + 1) * y, T = M.get(R.from), O = M.get(R.to);
    if (T == null || O == null) continue;
    const $ = T === O, at = Math.min(T, O), ft = Math.max(T, O), G = Math.max(ft - at, 40), st = T <= O ? 0 : G, N = T <= O ? G : 0, D = R.arrow.includes("--") || R.arrow === "-.->", Z = R.arrow.toLowerCase().includes("x"), j = R.arrow.includes(">") || R.arrow.includes(")");
    if ($) {
      const rt = T + 6, Q = F - 16, K = 92, et = 48, gt = D ? "dashed" : "solid", lt = {
        id: Tt(10),
        type: "shape",
        x: rt,
        y: Q,
        w: K,
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
      }, vt = {
        id: Tt(10),
        type: "shape",
        x: rt + K - c,
        y: Q,
        w: c,
        h: et,
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
        id: Tt(10),
        type: "shape",
        x: rt,
        y: Q + et - c,
        w: K,
        h: c,
        z: r(),
        data: {
          shape: j ? "arrow" : "line",
          stroke: d,
          strokeWidth: c,
          strokeStyle: gt,
          roughness: 0,
          startPoint: [K, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(lt, vt, xt);
    } else {
      const rt = {
        id: Tt(10),
        type: "shape",
        x: at,
        y: F - 14,
        w: G,
        h: 28,
        z: r(),
        data: {
          shape: j ? "arrow" : "line",
          stroke: d,
          strokeWidth: c,
          strokeStyle: D ? "dashed" : "solid",
          roughness: 0,
          startPoint: [st, 14],
          endPoint: [N, 14]
        }
      };
      s.push(rt);
    }
    const J = $ ? T + 18 : at, Y = $ ? 170 : G, tt = {
      id: Tt(10),
      type: "text",
      x: J,
      y: F - 46,
      w: Y,
      h: "auto",
      z: r(),
      data: {
        text: R.label,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "center"
      }
    };
    if (s.push(tt), Z) {
      const rt = T <= O ? at + G - 14 : at + 8, Q = {
        id: Tt(10),
        type: "text",
        x: rt,
        y: F - 20,
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
    const R = g + (A.step + 1) * y, F = M.get(A.note.of);
    if (F == null) continue;
    let T = F;
    A.note.side === "right" && (T += 130), A.note.side === "left" && (T -= 300), A.note.side === "over" && (T -= 110);
    const O = {
      id: Tt(10),
      type: "text",
      x: T,
      y: R - 8,
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
    s.push(O);
  }
  return { nodes: s, shapeNodeIds: i };
}
function ep(t, e, o, r) {
  const n = t.trimStart();
  if (/^sequenceDiagram\b/i.test(n))
    return tp(t, e, o, r);
  const s = Ku(t), i = _u(s), a = Array.from(s.nodes.values()).map((y) => Br(y.shape)), l = a.length > 0 ? Math.max(...a.map((y) => y.h)) : 96, c = Math.max(l + 130, 260), d = /* @__PURE__ */ new Map(), p = i.length;
  for (let y = 0; y < i.length; y++) {
    const x = i[y], b = x.length, k = (y - (p - 1) / 2) * c, S = x.length > 0 ? Math.max(
      ...x.map((A) => {
        const R = s.nodes.get(A);
        return R ? Br(R.shape).w : 200;
      })
    ) : 200, M = Math.max(S + 90, 260);
    for (let A = 0; A < x.length; A++) {
      const R = x[A], F = (A - (b - 1) / 2) * M;
      if (s.direction === "LR" || s.direction === "RL") {
        const T = s.direction === "LR" ? e + k : e - k, O = o + F;
        d.set(R, { x: T, y: O });
      } else {
        const T = e + F, O = s.direction === "TB" ? o + k : o - k;
        d.set(R, { x: T, y: O });
      }
    }
  }
  const h = /* @__PURE__ */ new Map(), f = [], m = [], g = /* @__PURE__ */ new Map();
  for (const y of s.groups) {
    if (!y.nodeKeys.length) continue;
    const x = y.nodeKeys.map((R) => {
      const F = s.nodes.get(R), T = d.get(R);
      if (!F || !T) return null;
      const O = Br(F.shape);
      return { x: T.x - O.w / 2, y: T.y - O.h / 2, w: O.w, h: O.h };
    }).filter((R) => !!R);
    if (!x.length) continue;
    const b = Math.min(...x.map((R) => R.x)) - 30, k = Math.max(...x.map((R) => R.x + R.w)) + 30, S = Math.min(...x.map((R) => R.y)) - 34, M = Math.max(...x.map((R) => R.y + R.h)) + 24, A = {
      id: Tt(10),
      type: "shape",
      x: b,
      y: S,
      w: k - b,
      h: M - S,
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
    if (f.push(A), m.push(A.id), y.label) {
      const R = {
        id: Tt(10),
        type: "text",
        x: b + 10,
        y: S + 8,
        w: Math.max(120, k - b - 20),
        h: "auto",
        z: r(),
        data: {
          text: y.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      f.push(R);
    }
  }
  for (const [y, x] of s.nodes) {
    const b = d.get(y) ?? { x: e, y: o }, k = Br(x.shape), S = {
      id: Tt(10),
      type: "shape",
      x: b.x - k.w / 2,
      y: b.y - k.h / 2,
      w: k.w,
      h: k.h,
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
    f.push(S), m.push(S.id), h.set(y, S.id), g.set(y, { x: S.x, y: S.y, w: k.w, h: k.h });
  }
  for (const y of s.edges) {
    const x = h.get(y.fromKey), b = h.get(y.toKey);
    if (!x || !b || x === b) continue;
    const k = {
      id: Tt(10),
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: r(),
      data: {
        fromId: x,
        toId: b,
        label: y.label,
        style: "solid",
        color: "#64748b",
        strokeWidth: 2,
        arrowHead: "arrow",
        edgeType: "bezier"
      }
    };
    f.push(k);
  }
  return { nodes: f, shapeNodeIds: m };
}
const Di = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function op({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r
}) {
  const n = Zt(), { labels: s } = qt(), i = ht(null), [a, l] = ot(Di), [c, d] = ot(null), [p, h] = ot(null);
  kt(() => {
    if (!e) return;
    const g = (y) => {
      i.current && !i.current.contains(y.target) && o();
    };
    return document.addEventListener("pointerdown", g), () => document.removeEventListener("pointerdown", g);
  }, [e, o]);
  const f = Ut(
    () => s.mermaidSupportedHint,
    [s.mermaidSupportedHint]
  ), m = ct(() => {
    try {
      const g = window.innerWidth / 2, y = window.innerHeight / 2, x = t.screenToCanvas(g, y), { nodes: b, shapeNodeIds: k } = ep(a, x.x, x.y, () => t.nextZ());
      if (b.length === 0)
        throw new Error(s.mermaidNoNodesParsed);
      t.addNodes(b), k.length > 0 && t.selectMultiple(k), d(null), h(
        s.mermaidInsertedSummary.replace("{nodes}", String(k.length)).replace("{edges}", String(b.length - k.length))
      );
    } catch (g) {
      h(null), d(g instanceof Error ? g.message : s.mermaidParseFailed);
    }
  }, [t, s.mermaidInsertedSummary, s.mermaidNoNodesParsed, s.mermaidParseFailed, a]);
  return !e || !r ? null : Je(
    /* @__PURE__ */ v(
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
        onPointerDown: (g) => g.stopPropagation(),
        children: [
          /* @__PURE__ */ v("div", { style: { padding: "10px 12px 8px", borderBottom: `1px solid ${n.border}` }, children: [
            /* @__PURE__ */ u("div", { style: { fontSize: 12, fontWeight: 700, color: n.text }, children: s.mermaidSketchTitle }),
            /* @__PURE__ */ u("div", { style: { marginTop: 4, fontSize: 10, color: n.textMuted, lineHeight: 1.45 }, children: f })
          ] }),
          /* @__PURE__ */ v("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ u(
              "textarea",
              {
                value: a,
                onChange: (g) => l(g.target.value),
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
            /* @__PURE__ */ v("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => l(Di),
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
const rp = [
  { key: "select", shortcut: "S", num: "" },
  { key: "hand", shortcut: "P", num: "" },
  { key: "draw", shortcut: "D", num: "" },
  { key: "shape", shortcut: "G", num: "" },
  { key: "text", shortcut: "T", num: "" },
  { key: "note", shortcut: "B", num: "" },
  { key: "sticky", shortcut: "Y", num: "" },
  { key: "frame", shortcut: "F", num: "" },
  { key: "edge", shortcut: "C", num: "" },
  { key: "erase", shortcut: "E", num: "" },
  { key: "laser", shortcut: "Z", num: "" }
], Ro = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, Gt = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Lo({ name: t, size: e = 18, textGlyph: o = "T" }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ...Gt })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...Gt }),
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
    t === "note" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...Gt }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...Gt, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...Gt, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...Gt, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...Gt })
    ] }),
    t === "edge" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("circle", { cx: "5", cy: "5", r: "2.5", ...Gt, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ u("circle", { cx: "19", cy: "19", r: "2.5", ...Gt, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "7", x2: "17", y2: "17", ...Gt }),
      /* @__PURE__ */ u("polyline", { points: "14,17 17,17 17,14", ...Gt, fill: "none" })
    ] }),
    t === "erase" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ...Gt })
    ] }),
    t === "laser" && /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ u("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...Gt, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...Gt, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...Gt, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...Gt, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...Gt, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...Gt }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...Gt })
    ] }),
    t === "fit" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...Gt })
    ] }),
    t === "paper" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...Gt }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...Gt, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...Gt, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...Gt, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...Gt }),
      /* @__PURE__ */ u("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...Gt }),
      /* @__PURE__ */ u("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...Gt }),
      /* @__PURE__ */ u("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...Gt })
    ] }),
    t === "library" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M8 7h6", ...Gt, opacity: 0.5 }),
      /* @__PURE__ */ u("path", { d: "M8 11h4", ...Gt, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...Gt }),
      /* @__PURE__ */ u("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ...Gt }),
      /* @__PURE__ */ u("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ...Gt }),
      /* @__PURE__ */ u("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
function np({
  engine: t,
  background: e
}) {
  const o = Zt(), { labels: r } = qt(), [n, s] = ot(!1), i = {
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
  }, l = ht(null), c = ht(null);
  kt(() => {
    if (!n) return;
    const h = (f) => {
      c.current && !c.current.contains(f.target) && l.current && !l.current.contains(f.target) && s(!1);
    };
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [n]);
  const d = er.find((h) => h.key === e) ?? er[1], p = n && l.current ? (() => {
    const h = l.current.getBoundingClientRect();
    return Je(
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
            const m = er.filter((g) => g.group === f);
            return m.length === 0 ? null : /* @__PURE__ */ v("div", { style: { marginBottom: 6 }, children: [
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
              m.map((g) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    t.setBoardBackground(g.key), s(!1);
                  },
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "5px 6px",
                    border: "none",
                    borderRadius: o.controlBorderRadius,
                    background: e === g.key ? o.controlBgActive : "transparent",
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
                          background: g.swatchColor,
                          border: `1.5px solid ${o.border}`,
                          flexShrink: 0
                        }
                      }
                    ),
                    a[g.key] ?? g.label
                  ]
                },
                g.key
              ))
            ] }, f);
          })
        }
      ),
      document.body
    );
  })() : null;
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ v(
      "button",
      {
        ref: l,
        title: r.paperType,
        onClick: () => s((h) => !h),
        style: {
          ...Ro,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ u(Lo, { name: "paper" }),
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
function sp({ engine: t }) {
  const e = Zt(), { labels: o } = qt(), [r, n] = ot(!1), s = ht(null), i = ht(null);
  kt(() => {
    if (!r) return;
    const l = (c) => {
      i.current && !i.current.contains(c.target) && s.current && !s.current.contains(c.target) && n(!1);
    };
    return document.addEventListener("pointerdown", l), () => document.removeEventListener("pointerdown", l);
  }, [r]);
  const a = r && s.current ? (() => {
    const l = s.current.getBoundingClientRect();
    return Je(
      /* @__PURE__ */ v(
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
            Zi.map((c) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => {
                  const d = typeof window < "u" ? window : void 0;
                  if (!d) return;
                  const p = d.innerWidth / 2, h = d.innerHeight / 2, f = tr(t.viewport, p, h);
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
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: s,
        title: o.templatesTitle,
        onClick: () => n((l) => !l),
        style: {
          ...Ro,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(Lo, { name: "template" })
      }
    ),
    a
  ] });
}
function ip({ engine: t }) {
  const e = Zt(), { labels: o } = qt(), [r, n] = ot(!1), [s, i] = ot(!1), a = ht(null), [l, c] = ot(null), d = ct(() => {
    n((f) => (!f && a.current && c(a.current.getBoundingClientRect()), !f));
  }, []), p = ct(() => n(!1), []), h = ct(() => {
    i(!0);
  }, []);
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: a,
        title: o.librariesTitle,
        onClick: d,
        style: {
          ...Ro,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(Lo, { name: "library" })
      }
    ),
    /* @__PURE__ */ u(
      Vh,
      {
        engine: t,
        open: r,
        onClose: p,
        triggerRect: l,
        onBrowseDirectory: h
      }
    ),
    s && /* @__PURE__ */ u(
      Ou,
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
function ap({ engine: t, baseUrl: e }) {
  const o = Zt(), { labels: r } = qt(), [n, s] = ot(!1), i = ht(null), [a, l] = ot(null), c = ct(() => {
    s((p) => (!p && i.current && l(i.current.getBoundingClientRect()), !p));
  }, []), d = ct(() => s(!1), []);
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: i,
        title: r.gifSearchTitle,
        onClick: c,
        style: {
          ...Ro,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ u(Lo, { name: "gif" })
      }
    ),
    /* @__PURE__ */ u(
      Zh,
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
function lp({ engine: t }) {
  const e = Zt(), { labels: o } = qt(), [r, n] = ot(!1), s = ht(null), [i, a] = ot(null), l = ct(() => {
    n((d) => (!d && s.current && a(s.current.getBoundingClientRect()), !d));
  }, []), c = ct(() => n(!1), []);
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: s,
        title: o.mermaidSketchTitle,
        onClick: l,
        style: {
          ...Ro,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(Lo, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ u(
      op,
      {
        engine: t,
        open: r,
        onClose: c,
        triggerRect: i
      }
    )
  ] });
}
function cp({ engine: t, gifApiBaseUrl: e }) {
  const o = Zt(), { labels: r } = qt(), [n, s] = ot(t.mode), [i, a] = ot(t.boardBackground), [l, c] = ot(t.lassoSelect);
  kt(() => {
    const p = () => s(t.mode), h = () => a(t.boardBackground), f = () => c(t.lassoSelect);
    return t.on("mode", p), t.on("background", h), t.on("lassoToggle", f), () => {
      t.off("mode", p), t.off("background", h), t.off("lassoToggle", f);
    };
  }, [t]);
  const d = rp.map((p) => ({
    ...p,
    label: p.key === "select" ? r.toolSelect : p.key === "hand" ? r.toolHand : p.key === "draw" ? r.toolDraw : p.key === "shape" ? r.toolShape : p.key === "text" ? r.toolText : p.key === "note" ? r.toolNote : p.key === "sticky" ? r.toolSticky : p.key === "frame" ? r.toolFrame : p.key === "erase" ? r.toolEraser : r.toolLaser
  }));
  return /* @__PURE__ */ v(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: Ue,
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
          return /* @__PURE__ */ v(
            "button",
            {
              title: `${p.label} (${p.shortcut}${p.num ? ` / ${p.num}` : ""})`,
              onClick: () => {
                l && (t.toggleLassoSelect(), c(!1)), t.setMode(p.key);
              },
              style: {
                ...Ro,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: h ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ u(Lo, { name: p.key, textGlyph: r.toolTextGlyph }),
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
        /* @__PURE__ */ v(
          "button",
          {
            title: `${r.toolLassoSelect} (L)`,
            onClick: () => {
              l ? (t.toggleLassoSelect(), c(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), c(!0));
            },
            style: {
              ...Ro,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: l ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ u(Lo, { name: "lasso" }),
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
        /* @__PURE__ */ u(np, { engine: t, background: i }),
        /* @__PURE__ */ u(sp, { engine: t }),
        /* @__PURE__ */ u(ip, { engine: t }),
        /* @__PURE__ */ u(lp, { engine: t }),
        e && /* @__PURE__ */ u(ap, { engine: t, baseUrl: e })
      ]
    }
  );
}
const dp = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), hp = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function Wi(t) {
  return t.data.opacity ?? 1;
}
function Ko(t, e) {
  return t.data[e];
}
function up(t) {
  const e = {}, o = t.filter((n) => dp.has(n.type));
  if (o.length > 0) {
    const n = Wi(o[0]), s = o.every((i) => Wi(i) === n);
    e.opacity = s ? n : "mixed";
  }
  const r = t.filter((n) => hp.has(n.type));
  if (r.length > 0) {
    const n = Ko(r[0], "borderColor"), s = r.every(
      (d) => Ko(d, "borderColor") === n
    );
    e.borderColor = s ? n ?? null : "mixed";
    const i = Ko(r[0], "borderWidth") ?? 1, a = r.every(
      (d) => (Ko(d, "borderWidth") ?? 1) === i
    );
    e.borderWidth = a ? i : "mixed";
    const l = Ko(r[0], "borderStyle") ?? "solid", c = r.every(
      (d) => (Ko(d, "borderStyle") ?? "solid") === l
    );
    e.borderStyle = c ? l : "mixed";
  }
  return e;
}
function pp(t) {
  const [e, o] = ot(t.mode), [r, n] = ot(new Set(t.selection)), [, s] = ot(0);
  if (kt(() => {
    const d = () => o(t.mode), p = () => {
      n(new Set(t.selection)), s((f) => f + 1);
    }, h = () => s((f) => f + 1);
    return t.on("mode", d), t.on("selection", p), t.on("change", h), () => {
      t.off("mode", d), t.off("selection", p), t.off("change", h);
    };
  }, [t]), r.size === 0)
    return e === "draw" || e === "shape" || e === "text" || e === "edge" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
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
  const c = up(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: l },
    commonProps: c
  };
}
const ln = ls(null);
function Xe(t, e) {
  const o = br(ln);
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
function We({
  value: t,
  onChange: e,
  mixed: o
}) {
  const r = Zt(), { labels: n } = qt(), s = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ v("div", { style: Ft, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorOpacity }),
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
const fp = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function ve({
  label: t,
  palettes: e,
  value: o,
  onChange: r,
  allowNull: n,
  mixed: s
}) {
  const i = Zt(), { labels: a } = qt(), [l, c] = ot(""), [d, p] = ot(0), [h, f] = ot(!1), m = ht(null), g = ht(null), [y, x] = ot(null), [b, k] = ot("bottom"), S = e[d] ?? e[0], M = S.name === "Standard" ? a.paletteStandard : S.name, A = o == null ? void 0 : o.toLowerCase();
  kt(() => {
    if (!h) return;
    const T = (O) => {
      m.current && !m.current.contains(O.target) && f(!1);
    };
    return document.addEventListener("mousedown", T), () => document.removeEventListener("mousedown", T);
  }, [h]), kt(() => {
    if (!h) return;
    const T = () => {
      const O = g.current;
      if (!O) return;
      const $ = O.getBoundingClientRect(), ft = e.length * 30 + 10, G = window.innerHeight - $.bottom, st = $.top, N = G < ft && st > G;
      k(N ? "top" : "bottom"), x({
        top: N ? $.top - 4 : $.bottom + 4,
        left: $.right
      });
    };
    return T(), window.addEventListener("resize", T), window.addEventListener("scroll", T, !0), () => {
      window.removeEventListener("resize", T), window.removeEventListener("scroll", T, !0);
    };
  }, [h]);
  const R = () => {
    const T = l.trim();
    if (!T) return;
    const O = T.startsWith("#") ? T : `#${T}`;
    fp.test(O) && (r(O), c(""));
  }, F = e.some(
    (T) => T.colors.some((O) => O.toLowerCase() === A)
  );
  return /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 }, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: i.textMuted, paddingTop: 2 }, children: t }),
    /* @__PURE__ */ v("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ v("div", { style: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }, children: [
        n && /* @__PURE__ */ u(
          "button",
          {
            onClick: () => r(null),
            title: a.inspectorNone,
            style: {
              ...Kt,
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
        S.colors.map((T) => {
          const O = !s && A === T.toLowerCase();
          return /* @__PURE__ */ u(
            "button",
            {
              onClick: () => r(T),
              style: {
                ...Kt,
                width: 20,
                height: 20,
                background: T,
                border: O ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
                borderRadius: "50%"
              }
            },
            T
          );
        }),
        o && !F && !s && /* @__PURE__ */ u(
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
      e.length > 1 && /* @__PURE__ */ u("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ v("div", { ref: g, style: { position: "relative" }, children: [
        /* @__PURE__ */ v(
          "button",
          {
            onClick: () => f((T) => !T),
            title: a.inspectorSwitchPalette,
            style: {
              ...Kt,
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
              M,
              /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: h ? "▲" : "▼" })
            ]
          }
        ),
        h && y && Je(
          /* @__PURE__ */ u(
            "div",
            {
              ref: m,
              style: {
                position: "fixed",
                top: y.top,
                left: y.left,
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
              children: e.map((T, O) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    p(O), f(!1);
                  },
                  style: {
                    ...Kt,
                    height: 28,
                    padding: "0 8px",
                    background: O === d ? i.controlBgActive : "transparent",
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
                    /* @__PURE__ */ u("span", { style: { display: "flex", gap: 2 }, children: T.colors.slice(0, 6).map(($) => /* @__PURE__ */ u(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: $,
                          display: "inline-block"
                        }
                      },
                      $
                    )) }),
                    /* @__PURE__ */ u("span", { children: T.name === "Standard" ? a.paletteStandard : T.name })
                  ]
                },
                T.name
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
          onChange: (T) => c(T.target.value),
          onKeyDown: (T) => {
            T.key === "Enter" && R();
          },
          onBlur: R,
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
function Do({
  label: t,
  value: e,
  onChange: o,
  mixed: r
}) {
  const n = Zt();
  return /* @__PURE__ */ v("div", { style: Ft, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: n.textMuted }, children: t }),
    Wu.map((s) => /* @__PURE__ */ u(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...Kt,
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
function Wo({
  label: t,
  widths: e = Fu,
  value: o,
  onChange: r,
  mixed: n
}) {
  const s = Zt();
  return /* @__PURE__ */ v("div", { style: Ft, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: s.textMuted }, children: t }),
    /* @__PURE__ */ u("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }, children: e.map((i) => /* @__PURE__ */ u(
      "button",
      {
        title: `${i}px`,
        onClick: () => r(i),
        style: {
          ...Kt,
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
function Sr({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: r,
  onChange: n
}) {
  const { labels: s } = qt();
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      ve,
      {
        label: s.inspectorBorder,
        palettes: Ee,
        value: t,
        onChange: (i) => n("borderColor", i ?? void 0),
        allowNull: !0,
        mixed: r == null ? void 0 : r.color
      }
    ),
    (t || (r == null ? void 0 : r.color)) && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u(
        Do,
        {
          label: s.inspectorStyle,
          value: e ?? "solid",
          onChange: (i) => n("borderStyle", i),
          mixed: r == null ? void 0 : r.style
        }
      ),
      /* @__PURE__ */ u(
        Wo,
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
const Nn = /* @__PURE__ */ new Map();
function Se({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: r,
  onToggle: n,
  persistKey: s,
  children: i
}) {
  const a = Zt(), [l, c] = ot(() => s && Nn.has(s) ? !!Nn.get(s) : e), d = r ?? l, p = o === "group", h = ht(null), [f, m] = ot(0);
  return kt(() => {
    !s || r !== void 0 || Nn.set(s, d);
  }, [s, r, d]), $r(() => {
    const g = h.current;
    if (!g) return;
    const y = () => m(g.scrollHeight);
    y();
    const x = new ResizeObserver(() => y());
    return x.observe(g), () => x.disconnect();
  }, [i]), /* @__PURE__ */ v(
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
        /* @__PURE__ */ v(
          "button",
          {
            type: "button",
            onClick: () => {
              n ? n() : c((g) => !g);
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
function Es({ style: t }) {
  const e = Zt();
  return t === "hachure" ? /* @__PURE__ */ v("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ v("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: e.text, strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ u("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ u("rect", { x: 2, y: 2, width: 16, height: 12, fill: e.text, rx: 2 }) });
}
const yp = /* @__PURE__ */ v("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ u("path", { d: "m21 21-4.35-4.35" })
] });
function cn({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: r
}) {
  var b, k;
  const n = Zt(), [s, i] = ot(!1), [a, l] = ot(""), c = ht(null), d = ht(null), [p, h] = ot(null), f = a.trim().toLowerCase(), m = Ut(
    () => o.filter((S) => S.toLowerCase().includes(f)),
    [o, f]
  ), g = Ut(
    () => Nr.filter(
      (S) => !o.includes(S.key) && (S.key.toLowerCase().includes(f) || S.label.toLowerCase().includes(f))
    ),
    [o, f]
  );
  kt(() => {
    if (!s || !d.current) return;
    const S = d.current.getBoundingClientRect(), M = 260, A = 16;
    let R = S.left;
    R + M > window.innerWidth - A && (R = window.innerWidth - M - A), R < A && (R = A), h({ top: S.bottom + 4, left: R });
  }, [s]), kt(() => {
    var A;
    if (!s) return;
    const S = (R) => {
      var $, at;
      const F = R.target;
      if (($ = c.current) != null && $.contains(F)) return;
      const O = (((at = c.current) == null ? void 0 : at.ownerDocument) ?? document).getElementById("font-picker-popover");
      O != null && O.contains(F) || i(!1);
    }, M = ((A = c.current) == null ? void 0 : A.ownerDocument) ?? document;
    return M.addEventListener("mousedown", S), () => M.removeEventListener("mousedown", S);
  }, [s]);
  const y = (S) => {
    e(S), i(!1), l("");
  }, x = (S, M) => {
    const A = (M == null ? void 0 : M.label) ?? S, R = M == null ? void 0 : M.category, F = t === S;
    return /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => y(S),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: F ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: co(S),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (T) => {
          F || (T.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (T) => {
          F || (T.currentTarget.style.background = "transparent");
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
              children: fc(R)
            }
          ),
          /* @__PURE__ */ u("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: A })
        ]
      },
      S
    );
  };
  return /* @__PURE__ */ v("div", { ref: c, style: { position: "relative", flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ v(
      "button",
      {
        ref: d,
        type: "button",
        onClick: () => i((S) => !S),
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
          fontFamily: co(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...r
        },
        children: [
          /* @__PURE__ */ u("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((b = Nr.find((S) => S.key === t)) == null ? void 0 : b.label) ?? t }),
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
    s && p && Je(
      /* @__PURE__ */ v(
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
            /* @__PURE__ */ v(
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
                  /* @__PURE__ */ u("span", { style: { color: "#64748b", display: "flex" }, children: yp }),
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "text",
                      placeholder: "Quick search",
                      value: a,
                      onChange: (S) => l(S.target.value),
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
            /* @__PURE__ */ v("div", { style: { overflowY: "auto", padding: 8, flex: 1 }, children: [
              m.length > 0 && /* @__PURE__ */ v("div", { style: { marginBottom: 12 }, children: [
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
                m.map((S) => x(S, Nr.find((M) => M.key === S)))
              ] }),
              /* @__PURE__ */ v("div", { children: [
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
                g.length > 0 ? g.map((S) => x(S.key, S)) : /* @__PURE__ */ u(
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
      (((k = c.current) == null ? void 0 : k.ownerDocument) ?? document).body
    )
  ] });
}
function Rs({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "sharp" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", ...o }),
    t === "round" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4", ...o })
  ] });
}
const gp = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], mp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function bp({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function So(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function xp({ engine: t, node: e, fontsInScene: o }) {
  const r = Zt(), { labels: n } = qt(), s = Xe(t, e), i = br(ln) ?? [e], { data: a } = e, l = a.fill ?? null, c = a.fillStyle ?? "hachure", d = a.strokeStyle ?? "solid", p = So(i, (b) => b.data.stroke), h = So(i, (b) => b.data.fill ?? null), f = So(i, (b) => b.data.fillStyle ?? "hachure"), m = So(i, (b) => b.data.strokeStyle ?? "solid"), g = So(i, (b) => b.data.strokeWidth), y = So(i, (b) => b.data.roughness), x = So(i, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ v(Se, { title: n.inspectorStructure, persistKey: "shape.structure", children: [
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorShape }),
        mp.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => s({ shape: b.key }),
            style: {
              ...Kt,
              width: 28,
              height: 28,
              background: a.shape === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ u(bp, { name: b.key })
          },
          b.key
        ))
      ] }),
      (a.shape === "rect" || a.shape === "diamond") && /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorEdges }),
        [
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" }
        ].map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => s({ edgeStyle: b.key === "sharp" ? void 0 : b.key }),
            style: {
              ...Kt,
              width: 28,
              height: 28,
              background: (a.edgeStyle ?? "sharp") === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ u(Rs, { name: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorLabel }),
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
    a.label && /* @__PURE__ */ v(Se, { title: n.inspectorTypography, defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ u(
          cn,
          {
            value: a.labelFontFamily ?? "Excalifont",
            onChange: (b) => s({ labelFontFamily: b === "Excalifont" ? void 0 : b }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorSize }),
        gp.map((b) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => s({ labelFontSize: b.size === 14 ? void 0 : b.size }),
            style: {
              ...Kt,
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
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorAlign }),
        Ps.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.key,
            onClick: () => s({ labelAlign: b.key === "center" ? void 0 : b.key }),
            style: {
              ...Kt,
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
    /* @__PURE__ */ v(Se, { title: n.inspectorAppearance, persistKey: "shape.appearance", children: [
      /* @__PURE__ */ u(
        ve,
        {
          label: n.inspectorStroke,
          palettes: Ee,
          value: p ? void 0 : a.stroke,
          mixed: p,
          onChange: (b) => s({ stroke: b })
        }
      ),
      /* @__PURE__ */ u(
        ve,
        {
          label: n.inspectorFill,
          palettes: As,
          value: h ? void 0 : l,
          mixed: h,
          onChange: (b) => s({ fill: b ?? void 0 }),
          allowNull: !0
        }
      ),
      l && !h && /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFillPattern }),
        zs.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => s({ fillStyle: b.key }),
            style: {
              ...Kt,
              width: 36,
              height: 28,
              background: !f && c === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ u(Es, { style: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ u(
        Do,
        {
          label: n.inspectorStrokeStyle,
          value: d,
          mixed: m,
          onChange: (b) => s({ strokeStyle: b })
        }
      ),
      /* @__PURE__ */ u(
        Wo,
        {
          label: n.inspectorStrokeWidth,
          widths: Ts,
          value: a.strokeWidth,
          mixed: g,
          onChange: (b) => s({ strokeWidth: b })
        }
      ),
      /* @__PURE__ */ u(
        We,
        {
          value: a.opacity ?? 1,
          mixed: x,
          onChange: (b) => s({ opacity: b })
        }
      )
    ] }),
    /* @__PURE__ */ u(Se, { title: n.inspectorSketch, defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorRoughness }),
      Jr.map((b) => {
        const k = b.value === 0 ? n.roughnessArchitect : b.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ u(
          "button",
          {
            title: k,
            onClick: () => s({ roughness: b.value }),
            style: {
              ...Kt,
              height: 28,
              padding: "0 8px",
              background: !y && a.roughness === b.value ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: k
          },
          b.value
        );
      })
    ] }) })
  ] });
}
function Uo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function wp({ engine: t, node: e }) {
  const o = Zt(), { labels: r } = qt(), n = Xe(t, e), s = br(ln) ?? [e], { data: i } = e, a = i.fill ?? null, l = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", d = Uo(s, (y) => y.data.color), p = Uo(s, (y) => y.data.fill ?? null), h = Uo(s, (y) => y.data.fillStyle ?? "hachure"), f = Uo(s, (y) => y.data.strokeStyle ?? "solid"), m = Uo(s, (y) => y.data.strokeWidth), g = Uo(s, (y) => y.data.opacity ?? 1);
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      ve,
      {
        label: r.inspectorStroke,
        palettes: Ee,
        value: d ? void 0 : i.color,
        mixed: d,
        onChange: (y) => n({ color: y })
      }
    ),
    /* @__PURE__ */ u(
      ve,
      {
        label: r.inspectorFill,
        palettes: As,
        value: p ? void 0 : a,
        mixed: p,
        onChange: (y) => n({ fill: y ?? void 0 }),
        allowNull: !0
      }
    ),
    a && !p && /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorFillPattern }),
      zs.map((y) => /* @__PURE__ */ u(
        "button",
        {
          title: y.label,
          onClick: () => n({ fillStyle: y.key }),
          style: {
            ...Kt,
            width: 36,
            height: 28,
            background: !h && l === y.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(Es, { style: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Do,
      {
        label: r.inspectorStrokeStyle,
        value: c,
        mixed: f,
        onChange: (y) => n({ strokeStyle: y })
      }
    ),
    /* @__PURE__ */ u(
      Wo,
      {
        label: r.inspectorStrokeWidth,
        widths: $a,
        value: i.strokeWidth,
        mixed: m,
        onChange: (y) => n({ strokeWidth: y })
      }
    ),
    /* @__PURE__ */ u(
      We,
      {
        value: i.opacity ?? 1,
        mixed: g,
        onChange: (y) => n({ opacity: y })
      }
    )
  ] });
}
function kp({ engine: t, node: e, fontsInScene: o }) {
  const r = Zt(), { labels: n } = qt(), s = Xe(t, e), { data: i } = e;
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ v(Se, { title: n.inspectorTypography, persistKey: "text.typography", children: [
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ u(
          cn,
          {
            value: i.fontFamily,
            onChange: (a) => s({ fontFamily: a }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorSize }),
        tl.map((a) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => s({ fontSize: a }),
            style: {
              ...Kt,
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
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorAlign }),
        Ps.map((a) => /* @__PURE__ */ u(
          "button",
          {
            title: a.key,
            onClick: () => s({ align: a.key }),
            style: {
              ...Kt,
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
    /* @__PURE__ */ v(Se, { title: n.inspectorAppearance, persistKey: "text.appearance", children: [
      /* @__PURE__ */ u(
        ve,
        {
          label: n.inspectorStroke,
          palettes: Ee,
          value: i.color,
          onChange: (a) => s({ color: a })
        }
      ),
      /* @__PURE__ */ u(
        Sr,
        {
          borderColor: i.borderColor ?? null,
          borderStyle: i.borderStyle,
          borderWidth: i.borderWidth,
          onChange: (a, l) => s({ [a]: l })
        }
      ),
      /* @__PURE__ */ u(
        We,
        {
          value: i.opacity ?? 1,
          onChange: (a) => s({ opacity: a })
        }
      )
    ] })
  ] });
}
const Fi = { top: 0, right: 0.25, bottom: 0.5, left: 0.75 }, vp = [[0, "top"], [0.25, "right"], [0.5, "bottom"], [0.75, "left"]];
function Bi(t) {
  let e = "top", o = 1 / 0;
  for (const [r, n] of vp) {
    const s = Math.min(Math.abs(t - r), Math.abs(t - r - 1), Math.abs(t - r + 1));
    s < o && (o = s, e = n);
  }
  return e;
}
function Sp({ engine: t, node: e }) {
  const o = Zt(), { labels: r } = qt(), n = Xe(t, e), { data: s } = e;
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ v(Se, { title: r.edgeLineSection, persistKey: "edge.line", children: [
      /* @__PURE__ */ u(
        ve,
        {
          label: r.edgeColor,
          palettes: Ee,
          value: s.color,
          onChange: (i) => n({ color: i })
        }
      ),
      /* @__PURE__ */ u(
        Do,
        {
          label: r.inspectorStyle,
          value: s.style,
          onChange: (i) => n({ style: i })
        }
      ),
      /* @__PURE__ */ u(
        Wo,
        {
          label: r.inspectorWidth,
          widths: _a,
          value: s.strokeWidth,
          onChange: (i) => n({ strokeWidth: i })
        }
      ),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Connect" }),
        ["fixed", "free"].map((i) => {
          const a = s.sourceT !== void 0 || s.targetT !== void 0;
          return /* @__PURE__ */ u(
            "button",
            {
              onClick: () => {
                i === "free" && !a ? n({
                  sourceT: s.sourceHandle ? Fi[s.sourceHandle] : 0,
                  targetT: s.targetHandle ? Fi[s.targetHandle] : 0.5,
                  sourceHandle: void 0,
                  targetHandle: void 0
                }) : i === "fixed" && a && n({
                  sourceHandle: s.sourceT !== void 0 ? Bi(s.sourceT) : "right",
                  targetHandle: s.targetT !== void 0 ? Bi(s.targetT) : "left",
                  sourceT: void 0,
                  targetT: void 0
                });
              },
              style: {
                ...Kt,
                height: 28,
                padding: "0 8px",
                background: (i === "free" ? a : !a) ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 10,
                borderRadius: o.controlBorderRadius
              },
              children: i === "fixed" ? "Fixed" : "Free"
            },
            i
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ v(Se, { title: r.edgeArrowsSection, persistKey: "edge.arrows", children: [
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((i) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n({ arrowHead: i }),
            style: {
              ...Kt,
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
      (s.arrowHead ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeHeadSize }),
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
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((i) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n({ arrowTail: i }),
            style: {
              ...Kt,
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
      (s.arrowTail ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeTailSize }),
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
    /* @__PURE__ */ v(Se, { title: r.edgePathMotionSection, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.edgePath }),
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
              ...Kt,
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
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeAnimate }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n({ animated: !s.animated }),
            style: {
              ...Kt,
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
      s.animated && /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeDirection }),
        ["forward", "reverse", "both", "bop"].map((i) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n({ animatedDirection: i }),
            style: {
              ...Kt,
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
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorRoughness }),
        Jr.map((i) => {
          const a = i.value === 0 ? r.roughnessArchitect : i.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
          return /* @__PURE__ */ u(
            "button",
            {
              title: a,
              onClick: () => n({ roughness: i.value }),
              style: {
                ...Kt,
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
    /* @__PURE__ */ u(Se, { title: r.inspectorLabel, defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.edgeText }),
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
function Mp({ engine: t, node: e }) {
  const o = Zt(), { labels: r } = qt(), [n, s] = ot("idle"), i = Xe(t, e), { data: a } = e, l = !!a.crop;
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      Sr,
      {
        borderColor: a.borderColor ?? null,
        borderStyle: a.borderStyle,
        borderWidth: a.borderWidth,
        onChange: (c, d) => i({ [c]: d })
      }
    ),
    /* @__PURE__ */ v("div", { style: { ...Ft, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorCrop }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => t.requestImageCrop(e.id),
          style: {
            ...Kt,
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
            ...Kt,
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
    /* @__PURE__ */ v("div", { style: { ...Ft, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorBackground }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: async () => {
            if (n !== "loading") {
              s("loading");
              try {
                const { removeBackground: c } = await import("@imgly/background-removal"), p = await (await fetch(a.src)).blob(), h = await c(p), f = new FileReader(), m = await new Promise((g, y) => {
                  f.onload = () => g(f.result), f.onerror = y, f.readAsDataURL(h);
                });
                i({ src: m }), s("idle");
              } catch (c) {
                console.error("Background removal failed:", c), s("error"), setTimeout(() => s("idle"), 3e3);
              }
            }
          },
          disabled: n === "loading",
          style: {
            ...Kt,
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
      We,
      {
        value: a.opacity ?? 1,
        onChange: (c) => i({ opacity: c })
      }
    )
  ] });
}
function Cp({ engine: t, node: e }) {
  const o = Zt(), r = Xe(t, e), { data: n } = e;
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      Sr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ u(
        "button",
        {
          title: s.label,
          onClick: () => r({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...Kt,
            width: 28,
            height: 28,
            background: (n.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(Rs, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ u(
      We,
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
}, Ip = Tu();
function zp({
  value: t,
  onChange: e,
  theme: o,
  durationLabel: r,
  msLabel: n
}) {
  const [s, i] = ot(String(t));
  kt(() => i(String(t)), [t]);
  const a = () => {
    const l = parseInt(s, 10);
    !isNaN(l) && l >= 100 && l <= 5e3 ? e(l) : i(String(t));
  };
  return /* @__PURE__ */ v("div", { style: Ft, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r }),
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
function Tp({ engine: t, node: e }) {
  const o = Zt(), { labels: r } = qt(), n = Xe(t, e), { data: s } = e, i = ct(
    (d) => {
      var g;
      if (!d) {
        n({ devicePreset: void 0 });
        return;
      }
      const p = ss(d);
      if (!p) return;
      const h = Ja(p), f = Math.round(e.w / h), m = { devicePreset: d };
      (!s.label || ((g = ss(s.devicePreset ?? "")) == null ? void 0 : g.label) === s.label) && (m.label = p.label), n(m), t.updateNodeWithHistory(e.id, { h: f });
    },
    [t, e, s.label, s.devicePreset, n]
  ), a = Ut(() => {
    const d = t.getAllNodes().filter((g) => g.type === "frame"), p = d.length, h = /* @__PURE__ */ new Set();
    for (const g of d)
      g.id !== e.id && g.data.slideOrder != null && h.add(g.data.slideOrder);
    const f = [];
    for (let g = 1; g <= p; g++)
      h.has(g) || f.push(g);
    const m = e.data.slideOrder;
    return m != null && !f.includes(m) && (f.push(m), f.sort((g, y) => g - y)), f;
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
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorLabel }),
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
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.frameDevice }),
      /* @__PURE__ */ v(
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
            Ip.map((d) => /* @__PURE__ */ u("optgroup", { label: c[d.label] ?? d.label, children: d.presets.map((p) => /* @__PURE__ */ v("option", { value: p.key, children: [
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
      ve,
      {
        label: r.inspectorBackground,
        palettes: Ee,
        value: (() => {
          const d = s.backgroundColor;
          if (!d) return null;
          for (const p of Ee) {
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
      ve,
      {
        label: r.inspectorBorder,
        palettes: Ee,
        value: s.borderColor,
        onChange: (d) => n({ borderColor: d })
      }
    ),
    /* @__PURE__ */ u(
      Do,
      {
        label: r.inspectorStyle,
        value: s.borderStyle ?? "dashed",
        onChange: (d) => n({ borderStyle: d })
      }
    ),
    /* @__PURE__ */ u(
      Wo,
      {
        label: r.inspectorWidth,
        value: s.borderWidth ?? 1,
        onChange: (d) => n({ borderWidth: d })
      }
    ),
    /* @__PURE__ */ u(
      We,
      {
        value: s.opacity ?? 1,
        onChange: (d) => n({ opacity: d })
      }
    ),
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.frameSlideNumber }),
      /* @__PURE__ */ v(
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
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.frameTransition }),
      /* @__PURE__ */ v(
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
      zp,
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
function Pp({ engine: t, node: e }) {
  const o = Zt(), { labels: r } = qt(), n = Xe(t, e), { data: s } = e;
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(
      ve,
      {
        label: r.inspectorStroke,
        palettes: Nu,
        value: s.color,
        onChange: (i) => {
          i && n({ color: i });
        }
      }
    ),
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorSize }),
      [12, 14, 16, 20, 24].map((i) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => n({ fontSize: i }),
          style: {
            ...Kt,
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
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorEdges }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((i) => /* @__PURE__ */ u(
        "button",
        {
          title: i.label,
          onClick: () => n({ edgeStyle: i.key === "sharp" ? void 0 : i.key }),
          style: {
            ...Kt,
            width: 28,
            height: 28,
            background: (s.edgeStyle ?? "sharp") === i.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(Rs, { name: i.key })
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ u(
      We,
      {
        value: s.opacity ?? 1,
        onChange: (i) => n({ opacity: i })
      }
    )
  ] });
}
function Ap({ engine: t, node: e }) {
  const o = Zt(), r = Xe(t, e), { data: n } = e;
  return /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "URL" }),
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
      Sr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ u(
      We,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function Ep({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const Rp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Lp({ engine: t, mode: e, fontsInScene: o }) {
  const r = Zt(), { labels: n } = qt(), [, s] = ot(0), i = ct(() => s((g) => g + 1), []), a = t.activeTool;
  if (e === "text") {
    const g = a.fontFamily ?? lo, y = a.fontSize ?? 20, x = a.textAlign ?? "left", b = a.color;
    return /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ u(
          cn,
          {
            value: g,
            onChange: (k) => {
              a.fontFamily = k, i();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorSize }),
        tl.map((k) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => {
              a.fontSize = k, i();
            },
            style: {
              ...Kt,
              width: 36,
              height: 28,
              background: y === k ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              borderRadius: r.controlBorderRadius
            },
            children: k
          },
          k
        ))
      ] }),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorAlign }),
        Ps.map((k) => /* @__PURE__ */ u(
          "button",
          {
            title: k.key,
            onClick: () => {
              a.textAlign = k.key, i();
            },
            style: {
              ...Kt,
              width: 36,
              height: 28,
              background: x === k.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: k.label
          },
          k.key
        ))
      ] }),
      /* @__PURE__ */ u(
        ve,
        {
          label: n.inspectorStroke,
          palettes: Ee,
          value: b,
          onChange: (k) => {
            a.color = k, i();
          }
        }
      ),
      /* @__PURE__ */ u(
        We,
        {
          value: a.opacity ?? 1,
          onChange: (k) => {
            a.opacity = k, i();
          }
        }
      )
    ] });
  }
  if (e === "edge") {
    const g = a.roughness ?? 0;
    return /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u(
        ve,
        {
          label: n.inspectorStroke,
          palettes: Ee,
          value: a.color,
          onChange: (y) => {
            a.color = y, i();
          }
        }
      ),
      /* @__PURE__ */ u(
        Do,
        {
          label: n.inspectorStrokeStyle,
          value: a.strokeStyle ?? "solid",
          onChange: (y) => {
            a.strokeStyle = y, i();
          }
        }
      ),
      /* @__PURE__ */ u(
        Wo,
        {
          label: n.inspectorStrokeWidth,
          widths: _a,
          value: a.width,
          onChange: (y) => {
            a.width = y, i();
          }
        }
      ),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((y) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => {
              a.arrowHead = y, i();
            },
            style: {
              ...Kt,
              height: 28,
              padding: "0 6px",
              background: (a.arrowHead ?? "arrow") === y ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 11,
              borderRadius: r.controlBorderRadius
            },
            children: y === "none" ? n.inspectorNone : y === "arrow" ? "▷" : y === "filled" ? "▶" : "●"
          },
          y
        ))
      ] }),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((y) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => {
              a.arrowTail = y, i();
            },
            style: {
              ...Kt,
              height: 28,
              padding: "0 6px",
              background: (a.arrowTail ?? "none") === y ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 11,
              borderRadius: r.controlBorderRadius
            },
            children: y === "none" ? n.inspectorNone : y === "arrow" ? "◁" : y === "filled" ? "◀" : "●"
          },
          y
        ))
      ] }),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.edgePath }),
        [
          { key: "bezier", label: n.edgeBezier },
          { key: "straight", label: n.edgeStraight },
          { key: "smoothstep", label: n.edgeSmooth },
          { key: "step", label: n.edgeStep }
        ].map((y) => /* @__PURE__ */ u(
          "button",
          {
            title: y.label,
            onClick: () => {
              a.edgeType = y.key, i();
            },
            style: {
              ...Kt,
              height: 28,
              padding: "0 6px",
              background: (a.edgeType ?? "bezier") === y.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: y.label
          },
          y.key
        ))
      ] }),
      /* @__PURE__ */ v("div", { style: Ft, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorRoughness }),
        Jr.map((y) => {
          const x = y.value === 0 ? n.roughnessArchitect : y.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
          return /* @__PURE__ */ u(
            "button",
            {
              title: x,
              onClick: () => {
                a.roughness = y.value, i();
              },
              style: {
                ...Kt,
                height: 28,
                padding: "0 8px",
                background: g === y.value ? r.controlBgActive : r.controlBg,
                color: r.text,
                fontSize: 9,
                borderRadius: r.controlBorderRadius
              },
              children: x
            },
            y.value
          );
        })
      ] })
    ] });
  }
  const l = e === "shape", c = a.color, d = a.fillColor ?? null, p = a.fillStyle ?? "hachure", h = a.strokeStyle ?? "solid", f = a.width, m = a.roughness ?? 1;
  return /* @__PURE__ */ v(wt, { children: [
    l && /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorShape }),
      Rp.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => {
            a.shapeType = g.key, i();
          },
          style: {
            ...Kt,
            width: 28,
            height: 28,
            background: (a.shapeType ?? "rect") === g.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ u(Ep, { name: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ve,
      {
        label: n.inspectorStroke,
        palettes: Ee,
        value: c,
        onChange: (g) => {
          a.color = g, i();
        }
      }
    ),
    /* @__PURE__ */ u(
      ve,
      {
        label: n.inspectorFill,
        palettes: As,
        value: d,
        onChange: (g) => {
          a.fillColor = g ?? void 0, i();
        },
        allowNull: !0
      }
    ),
    d && /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorFillPattern }),
      zs.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => {
            a.fillStyle = g.key, i();
          },
          style: {
            ...Kt,
            width: 36,
            height: 28,
            background: p === g.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ u(Es, { style: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Do,
      {
        label: n.inspectorStrokeStyle,
        value: h,
        onChange: (g) => {
          a.strokeStyle = g, i();
        }
      }
    ),
    /* @__PURE__ */ u(
      Wo,
      {
        label: n.inspectorStrokeWidth,
        widths: l ? Ts : $a,
        value: f,
        onChange: (g) => {
          a.width = g, i();
        }
      }
    ),
    l && /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorRoughness }),
      Jr.map((g) => {
        const y = g.value === 0 ? n.roughnessArchitect : g.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ u(
          "button",
          {
            title: y,
            onClick: () => {
              a.roughness = g.value, i();
            },
            style: {
              ...Kt,
              height: 28,
              padding: "0 8px",
              background: m === g.value ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: y
          },
          g.value
        );
      })
    ] }),
    /* @__PURE__ */ u(
      We,
      {
        value: a.opacity ?? 1,
        onChange: (g) => {
          a.opacity = g, i();
        }
      }
    )
  ] });
}
function Dp({ engine: t, node: e, PanelComponent: o }) {
  const r = Xe(t, e);
  return /* @__PURE__ */ u(o, { node: e, data: e.data, engine: t, updateData: r });
}
const Wp = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), Fp = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function el(t) {
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
function Bp(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t.getAllNodes()) {
    let n;
    r.type === "text" ? n = r.data.fontFamily : r.type === "shape" && (n = r.data.labelFontFamily), n && !e.has(n) && (e.add(n), o.push(n));
  }
  return o;
}
function Np({ label: t }) {
  const e = Zt();
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
function Hp({
  engine: t,
  open: e,
  onToggle: o
}) {
  const r = Zt(), { labels: n } = qt(), [s, i] = ot(t.snapToGrid), [a, l] = ot(t.gridSize), [c, d] = ot(t.smartGuides), [p, h] = ot(t.freeFormEdges), [f, m] = ot(t.boardBackground), g = {
    "plain-white": n.paperWhite,
    "dot-grid": n.paperCream,
    engineering: n.paperWarm,
    blueprint: n.paperBlueprint,
    "dark-grid": n.paperNight,
    "japanese-stationery": n.paperJapaneseStationery,
    kraft: n.paperKraftPaper
  };
  kt(() => {
    const x = () => {
      i(t.snapToGrid), l(t.gridSize), d(t.smartGuides), h(t.freeFormEdges);
    }, b = () => h(t.freeFormEdges);
    t.on("change", b);
    const k = () => m(t.boardBackground);
    return t.on("guides", x), t.on("background", k), () => {
      t.off("guides", x), t.off("background", k), t.off("change", b);
    };
  }, [t]);
  const y = [10, 20, 40, 80];
  return /* @__PURE__ */ v(Se, { title: n.inspectorCanvas, defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorGrid }),
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
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorGridSize }),
      /* @__PURE__ */ u("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }, children: y.map((x) => /* @__PURE__ */ v(
        "button",
        {
          onClick: () => t.setGridSize(x),
          style: {
            border: "none",
            borderRadius: r.controlBorderRadius,
            background: a === x ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 10,
            padding: "4px 8px",
            cursor: "pointer"
          },
          children: [
            x,
            "px"
          ]
        },
        x
      )) })
    ] }),
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorGuides }),
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
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Free edges" }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => t.toggleFreeFormEdges(),
          style: {
            border: "none",
            borderRadius: r.controlBorderRadius,
            background: p ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: p ? n.inspectorOn : n.inspectorOff
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { style: Ft, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: n.inspectorPaper }),
      /* @__PURE__ */ u(
        "select",
        {
          value: f,
          onChange: (x) => t.setBoardBackground(x.target.value),
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
          children: er.map((x) => /* @__PURE__ */ u("option", { value: x.key, children: g[x.key] ?? x.label }, x.key))
        }
      )
    ] })
  ] });
}
function ol({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: r
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ u(xp, { engine: t, node: e, fontsInScene: r });
    case "draw":
      return /* @__PURE__ */ u(wp, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ u(kp, { engine: t, node: e, fontsInScene: r });
    case "edge":
      return /* @__PURE__ */ u(Sp, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ u(Mp, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ u(Cp, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ u(Tp, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ u(Pp, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ u(Ap, { engine: t, node: e });
    default: {
      const n = o == null ? void 0 : o.get(e.type);
      return n != null && n.propertiesPanel ? /* @__PURE__ */ u(Dp, { engine: t, node: e, PanelComponent: n.propertiesPanel }) : null;
    }
  }
}
function Ni({
  engine: t,
  nodes: e
}) {
  const o = Zt(), { labels: r } = qt(), n = Math.round(e[0].rotation ?? 0), i = e.every(
    (d) => Math.round(d.rotation ?? 0) === n
  ) ? n : null, [a, l] = ot(null), c = ct(
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
  return /* @__PURE__ */ v("div", { style: Ft, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorRotation }),
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
function Hi({
  engine: t,
  nodes: e
}) {
  const o = Zt(), { labels: r } = qt(), n = e.map((i) => i.id);
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
  return /* @__PURE__ */ v("div", { style: Ft, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: r.inspectorStack }),
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
function Op({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const r = ct(
    (n, s) => {
      const i = n === "opacity" ? Wp : Fp, a = e.filter((l) => i.has(l.type)).map((l) => ({
        id: l.id,
        patch: {
          data: { ...l.data, [n]: s }
        }
      }));
      t.batchUpdateWithHistory(a);
    },
    [t, e]
  );
  return /* @__PURE__ */ v(wt, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ u(
      We,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (n) => r("opacity", n)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ u(
      Sr,
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
function Xp({
  engine: t,
  target: e
}) {
  const o = Zt(), { labels: r } = qt();
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
  return /* @__PURE__ */ u(Se, { title: r.inspectorActions, defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ u("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: c.map((d) => /* @__PURE__ */ u(
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
function Gp({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: r,
  open: n,
  onToggle: s
}) {
  const { labels: i } = qt(), l = el(i)[e.type] ?? e.type, c = e.nodes.length, d = e.nodes[0], p = `${l} (${c})`;
  return /* @__PURE__ */ u(Se, { title: p, defaultOpen: !1, variant: "group", open: n, onToggle: s, children: /* @__PURE__ */ u(ln.Provider, { value: e.nodes, children: /* @__PURE__ */ u(
    ol,
    {
      engine: t,
      node: d,
      registry: o,
      fontsInScene: r
    }
  ) }) });
}
function Yp(t, e) {
  const o = el(e);
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
function Oi({
  engine: t,
  registry: e,
  target: o,
  commonProps: r
}) {
  const { labels: n } = qt(), s = Ut(() => Bp(t), [t, o]), i = Yp(o, n), [a, l] = ot("shared"), [c, d] = ot(!1);
  return kt(() => {
    const p = () => {
      d(
        window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0
      );
    };
    return p(), window.addEventListener("resize", p), () => window.removeEventListener("resize", p);
  }, []), kt(() => {
    if (o.kind !== "multi") {
      l("shared");
      return;
    }
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((h) => h.type)])).has(a) || l("shared");
  }, [o, a]), /* @__PURE__ */ v(wt, { children: [
    /* @__PURE__ */ u(Np, { label: i }),
    /* @__PURE__ */ u(
      Hp,
      {
        engine: t,
        open: o.kind === "multi" ? a === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => l((p) => p === "canvas" ? "" : "canvas") : void 0
      }
    ),
    c && /* @__PURE__ */ u(Xp, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ u(Lp, { engine: t, mode: o.mode, fontsInScene: s }),
    o.kind === "single" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u(
        ol,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: s
        }
      ),
      /* @__PURE__ */ u(Ni, { engine: t, nodes: [o.node] }),
      /* @__PURE__ */ u(Hi, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ v(
        Se,
        {
          title: n.inspectorShared,
          defaultOpen: !0,
          variant: "group",
          open: a === "shared",
          onToggle: () => l((p) => p === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ u(Op, { engine: t, nodes: o.nodes, commonProps: r }),
            /* @__PURE__ */ u(Ni, { engine: t, nodes: o.nodes }),
            /* @__PURE__ */ u(Hi, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((p) => /* @__PURE__ */ u(
        Gp,
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
function jp({ engine: t, registry: e }) {
  const o = Zt(), { isRTL: r, labels: n } = qt(), { target: s, commonProps: i } = pp(t), a = s.kind !== "none";
  ct((Y, tt) => {
    const rt = Y.trim();
    if (rt.startsWith("#")) {
      const Q = rt.slice(1), K = Q.length === 3 ? Q.split("").map((et) => et + et).join("") : Q;
      if (K.length === 6) {
        const et = parseInt(K.slice(0, 2), 16), gt = parseInt(K.slice(2, 4), 16), lt = parseInt(K.slice(4, 6), 16);
        return `rgba(${et}, ${gt}, ${lt}, ${tt})`;
      }
    }
    return rt.startsWith("rgb(") ? `rgba(${rt.slice(4, -1)}, ${tt})` : (rt.startsWith("rgba("), rt);
  }, []);
  const [l, c] = ot(!1), [d, p] = ot(!1), [h, f] = ot(!1), [m, g] = ot(!1), y = ht(null), x = ht(!1), b = ct(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), k = ct(
    (Y) => {
      const tt = b() ? 1366 : 1024;
      return Y <= tt;
    },
    [b]
  ), S = ht(null), [M, A] = ot(null), R = ht(null), [F, T] = ot(!1), O = ct(() => {
    var rt, Q;
    const Y = (rt = S.current) == null ? void 0 : rt.offsetParent;
    if (Y) return { width: Y.clientWidth, height: Y.clientHeight };
    const tt = ((Q = S.current) == null ? void 0 : Q.ownerDocument.defaultView) ?? window;
    return { width: tt.innerWidth, height: tt.innerHeight };
  }, []), $ = ct(() => {
    const { width: Y } = O();
    return r ? { x: Ue + 16, y: 12 } : { x: Y - $o - 16, y: 12 };
  }, [O, r]), at = M ?? $(), ft = ht(!1);
  $r(() => {
    if (!ft.current && S.current && !M) {
      ft.current = !0;
      const Y = S.current.offsetParent;
      Y && A(
        r ? { x: Ue + 16, y: 12 } : { x: Y.clientWidth - $o - 16, y: 12 }
      );
    }
  }, [M, r]), kt(() => {
    var Q, K;
    const Y = ((Q = S.current) == null ? void 0 : Q.offsetParent) ?? ((K = S.current) == null ? void 0 : K.ownerDocument.body);
    if (!Y) return;
    const tt = new ResizeObserver((et) => {
      var vt;
      const gt = ((vt = et[0]) == null ? void 0 : vt.contentRect.width) ?? Y.clientWidth;
      c(gt < 600);
      const lt = k(gt);
      p(lt), x.current || (g(lt), x.current = !0);
    });
    tt.observe(Y), c(Y.clientWidth < 600);
    const rt = k(Y.clientWidth);
    return p(rt), x.current || (g(rt), x.current = !0), () => tt.disconnect();
  }, [k]), kt(() => {
    var pt;
    const Y = ((pt = S.current) == null ? void 0 : pt.ownerDocument) ?? document, tt = () => {
      y.current !== null && window.clearTimeout(y.current), y.current = window.setTimeout(() => {
        f(!1), y.current = null;
      }, 200);
    }, rt = () => {
      y.current !== null && (window.clearTimeout(y.current), y.current = null), f(!0);
    }, Q = (Ct) => !!(Ct instanceof Element && Ct.closest("[data-sb-canvas]")), K = (Ct) => {
      Ct.button !== 2 && Q(Ct.target) && rt();
    }, et = () => tt(), gt = () => tt(), lt = (Ct) => {
      Q(Ct.target) && rt();
    }, vt = () => tt(), xt = (Ct) => {
      var Rt;
      ((Rt = Ct.detail) == null ? void 0 : Rt.active) ? rt() : tt();
    };
    return Y.addEventListener("pointerdown", K, !0), Y.addEventListener("pointerup", et, !0), Y.addEventListener("pointercancel", gt, !0), Y.addEventListener("focusin", lt, !0), Y.addEventListener("focusout", vt, !0), Y.addEventListener("sb:canvas-interaction", xt), () => {
      Y.removeEventListener("pointerdown", K, !0), Y.removeEventListener("pointerup", et, !0), Y.removeEventListener("pointercancel", gt, !0), Y.removeEventListener("focusin", lt, !0), Y.removeEventListener("focusout", vt, !0), Y.removeEventListener("sb:canvas-interaction", xt), y.current !== null && (window.clearTimeout(y.current), y.current = null);
    };
  }, []);
  const G = ct(
    (Y, tt) => {
      T(!0);
      const rt = M ? M.x : $().x, Q = M ? M.y : $().y;
      R.current = {
        startX: Y.clientX,
        startY: Y.clientY,
        startLeft: rt,
        startTop: Q
      }, (tt ?? Y.currentTarget).setPointerCapture(Y.pointerId);
    },
    [M, $]
  ), st = ct((Y) => Y instanceof Element ? !!Y.closest(
    'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
  ) : !1, []), N = ct(
    (Y) => {
      l || Y.button === 0 && (st(Y.target) || (Y.stopPropagation(), G(Y, Y.currentTarget)));
    },
    [l, st, G]
  ), D = ct(
    (Y) => {
      if (!R.current) return;
      Y.stopPropagation();
      const tt = Y.clientX - R.current.startX, rt = Y.clientY - R.current.startY, { width: Q, height: K } = O(), et = r ? 8 : Ue, gt = r ? Q - $o - Ue - 8 : Q - $o - 8, lt = Math.max(
        et,
        Math.min(gt, R.current.startLeft + tt)
      ), vt = Math.max(
        8,
        Math.min(K - 100, R.current.startTop + rt)
      );
      A({ x: lt, y: vt });
    },
    [O, r]
  ), Z = ct(() => {
    R.current = null, T(!1);
  }, []), j = m && h, J = o.panelBg;
  return a ? l ? /* @__PURE__ */ v(
    "div",
    {
      ref: S,
      "data-sb-props-panel": !0,
      onPointerDown: (Y) => Y.stopPropagation(),
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "45vh",
        minHeight: 200,
        background: J,
        borderRadius: "12px 12px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        color: o.text,
        fontSize: 12,
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        opacity: j ? 0 : 1,
        transform: j ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: j ? "none" : "auto"
      },
      children: [
        /* @__PURE__ */ v(
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
              /* @__PURE__ */ v(
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
                  onPointerDown: (Y) => Y.stopPropagation(),
                  children: [
                    /* @__PURE__ */ u("span", { children: n.autoHide }),
                    /* @__PURE__ */ u(
                      "input",
                      {
                        type: "checkbox",
                        checked: m,
                        onChange: (Y) => g(Y.target.checked),
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
              Oi,
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
  ) : /* @__PURE__ */ v(
    "div",
    {
      ref: S,
      "data-sb-props-panel": !0,
      style: {
        position: "absolute",
        left: at.x,
        top: at.y,
        width: $o,
        background: J,
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
        opacity: j ? 0 : 1,
        transform: j ? "translateY(-4px) scale(0.995)" : "translateY(0) scale(1)",
        transformOrigin: r ? "top left" : "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: j ? "none" : "auto",
        cursor: F ? "grabbing" : "grab"
      },
      onPointerDownCapture: N,
      onPointerDown: (Y) => Y.stopPropagation(),
      onPointerMove: D,
      onPointerUp: Z,
      onPointerCancel: Z,
      children: [
        /* @__PURE__ */ v(
          "div",
          {
            style: {
              cursor: F ? "grabbing" : "grab",
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
              /* @__PURE__ */ v(
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
                  onPointerDown: (Y) => Y.stopPropagation(),
                  children: [
                    /* @__PURE__ */ u("span", { children: n.autoHide }),
                    /* @__PURE__ */ u(
                      "input",
                      {
                        type: "checkbox",
                        checked: m,
                        onChange: (Y) => g(Y.target.checked),
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
              Oi,
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
function Vp({ engine: t, registry: e, gifApiBaseUrl: o }) {
  const { isRTL: r } = qt();
  return /* @__PURE__ */ v(wt, { children: [
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
          width: Ue,
          zIndex: 100
        },
        onPointerDown: (n) => n.stopPropagation(),
        children: /* @__PURE__ */ u(cp, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ u(jp, { engine: t, registry: e })
  ] });
}
const pr = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function qp(t) {
  const e = t.viewport.zoom, o = pr.find((r) => r > e + 1e-3) ?? pr[pr.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function Kp(t) {
  const e = t.viewport.zoom, o = [...pr].reverse().find((r) => r < e - 1e-3) ?? pr[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const Up = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
}, Pe = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, le = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Re({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ u("path", { d: "M5 12h14", ...le }),
    t === "plus" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M12 5v14", ...le }),
      /* @__PURE__ */ u("path", { d: "M5 12h14", ...le })
    ] }),
    t === "undo" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...le, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...le, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...le, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...le, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...le }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...le })
    ] }),
    t === "play" && /* @__PURE__ */ u("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...le }),
      /* @__PURE__ */ u("path", { d: "M6 6V18M18 6V18", ...le }),
      /* @__PURE__ */ u("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...le })
    ] }),
    t === "gauge" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 15a8 8 0 1 1 16 0", ...le }),
      /* @__PURE__ */ u("path", { d: "M12 15l4-4", ...le }),
      /* @__PURE__ */ u("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "search" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "6", ...le }),
      /* @__PURE__ */ u("path", { d: "M16 16l5 5", ...le })
    ] }),
    t === "home" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M3 12l9-8 9 8", ...le, fill: "none" }),
      /* @__PURE__ */ u("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...le, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...le, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function Zp({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showPerfOverlay: r,
  onTogglePerfOverlay: n
}) {
  const s = Zt(), { labels: i } = qt(), [a, l] = ot(t.viewport.zoom), [c, d] = ot(!1), [p, h] = ot(!1), [f, m] = ot(() => t.originView != null), [g, y] = ot(
    () => t.getAllNodes().filter((M) => M.type === "frame").length
  );
  kt(() => {
    const M = () => l(t.viewport.zoom), A = () => {
      d(t.canUndo()), h(t.canRedo());
    }, R = () => {
      y(t.getAllNodes().filter((F) => F.type === "frame").length), m(t.originView != null);
    };
    return t.on("viewport", M), t.on("history", A), t.on("change", R), t.on("node:create", R), t.on("node:delete", R), () => {
      t.off("viewport", M), t.off("history", A), t.off("change", R), t.off("node:create", R), t.off("node:delete", R);
    };
  }, [t]);
  const x = s.panelBg, b = `1px solid ${s.border}`, k = {
    ...Up,
    borderRadius: s.panelBorderRadius
  }, S = {
    width: 1,
    height: 20,
    background: s.separator,
    flexShrink: 0
  };
  return /* @__PURE__ */ v(
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
      onPointerDown: (M) => M.stopPropagation(),
      children: [
        /* @__PURE__ */ v("div", { style: { ...k, background: x, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: i.zoomOut,
              onClick: () => Kp(t),
              style: { ...Pe, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Re, { name: "minus" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ v(
            "button",
            {
              title: i.resetZoom,
              onClick: () => {
                t.viewport.zoom = 1, t.pan(0, 0);
              },
              style: {
                ...Pe,
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
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: i.zoomIn,
              onClick: () => qp(t),
              style: { ...Pe, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Re, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { style: { ...k, background: x, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: i.fitToContent,
              onClick: () => t.fitToContent(),
              style: { ...Pe, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Re, { name: "fit" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: i.canvasSearchOpen,
              onClick: () => {
                document.dispatchEvent(new CustomEvent("sb:search-open"));
              },
              style: {
                ...Pe,
                width: 32,
                height: 32,
                color: s.textMuted
              },
              children: /* @__PURE__ */ u(Re, { name: "search" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: f ? i.clearOriginView : i.saveOriginView,
              onClick: () => {
                f ? (t.clearOriginView(), m(!1)) : (t.setOriginView(), m(!0));
              },
              style: { ...Pe, width: 32, height: 32, color: f ? s.accentColor : s.textFaint },
              children: /* @__PURE__ */ u(Re, { name: f ? "bookmark-fill" : "bookmark" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: i.goToOriginView,
              onClick: () => {
                f && t.goToOriginView();
              },
              disabled: !f,
              style: { ...Pe, width: 32, height: 32, color: f ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Re, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { style: { ...k, overflow: "visible", background: x, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: i.presentSlides,
              onClick: () => t.enterPresentation(),
              style: { ...Pe, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Re, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ v(wt, { children: [
            /* @__PURE__ */ u("div", { style: S }),
            /* @__PURE__ */ v(
              "button",
              {
                title: i.toggleSlidesPanel,
                onClick: o,
                style: {
                  ...Pe,
                  width: 32,
                  height: 32,
                  color: e ? s.text : s.textMuted,
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ u(Re, { name: "slides" }),
                  g > 0 && /* @__PURE__ */ u(
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
                      children: g
                    }
                  )
                ]
              }
            )
          ] }),
          n && /* @__PURE__ */ v(wt, { children: [
            /* @__PURE__ */ u("div", { style: S }),
            /* @__PURE__ */ u(
              "button",
              {
                title: i.togglePerformanceOverlay,
                onClick: n,
                style: {
                  ...Pe,
                  width: 32,
                  height: 32,
                  color: r ? s.accentColor : s.textMuted
                },
                children: /* @__PURE__ */ u(Re, { name: "gauge" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ v("div", { style: { ...k, background: x, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: i.undo,
              onClick: () => t.undo(),
              disabled: !c,
              style: { ...Pe, width: 32, height: 32, color: c ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Re, { name: "undo" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: i.redo,
              onClick: () => t.redo(),
              disabled: !p,
              style: { ...Pe, width: 32, height: 32, color: p ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Re, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
function Qp(t) {
  return t.matches.length === 0 ? "0/0" : `${t.activeIndex >= 0 ? t.activeIndex + 1 : 0}/${t.matches.length}`;
}
function Jp({ engine: t }) {
  const e = Zt(), { labels: o } = qt(), [r, n] = ot(!1), [s, i] = ot(() => t.getSearchState()), a = ht(null), l = Ut(() => Qp(s), [s]);
  return kt(() => {
    const c = () => i(t.getSearchState()), d = () => {
      n(!0), requestAnimationFrame(() => {
        var h;
        return (h = a.current) == null ? void 0 : h.focus();
      });
    }, p = document;
    return t.on("search", c), p.addEventListener("sb:search-open", d), () => {
      t.off("search", c), p.removeEventListener("sb:search-open", d);
    };
  }, [t]), kt(() => {
    const c = (d) => {
      (d.ctrlKey || d.metaKey) && d.key.toLowerCase() === "f" && (d.preventDefault(), n(!0), requestAnimationFrame(() => {
        var h;
        return (h = a.current) == null ? void 0 : h.focus();
      }));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, []), kt(() => {
    if (!r) return;
    const c = (d) => {
      var h;
      (d.ctrlKey || d.metaKey) && d.key.toLowerCase() === "f" ? (d.preventDefault(), (h = a.current) == null || h.focus()) : d.key === "Escape" && (d.preventDefault(), s.query ? t.clearSearch() : n(!1));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [t, r, s.query]), r ? /* @__PURE__ */ v(
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
const Hn = 240, Xi = 6;
function On(t) {
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
const $p = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function _p() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...$p }) });
}
function tf(t, e, o) {
  const [r, n] = ot("");
  return kt(() => {
    let s = !1;
    return Cu(t, e).then((i) => {
      s || n(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), r;
}
function ef({ engine: t, frameId: e, tick: o }) {
  const r = tf(t, e, o);
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
const of = ["pan", "fade", "dissolve", "zoom", "fold", "cube", "none"];
function Gi({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ u("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ u("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ u("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ u("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ u("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ u("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const rf = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function nf({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: r,
  theme: n,
  labels: s
}) {
  const [i, a] = ot(!1), [l, c] = ot(!1), d = ht(null), p = ht(null), h = t !== "none", f = e ?? ur[t], m = {
    pan: s.transitionPan,
    fade: s.transitionFadeToBlack,
    dissolve: s.transitionDissolve,
    zoom: s.transitionZoom,
    fold: s.transitionFold,
    cube: s.transitionCube,
    none: s.transitionNoneInstant
  };
  kt(() => {
    if (!i && !l) return;
    const y = (x) => {
      i && d.current && !d.current.contains(x.target) && a(!1), l && p.current && !p.current.contains(x.target) && c(!1);
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [i, l]);
  const g = {
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
  return /* @__PURE__ */ v(
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
        /* @__PURE__ */ v("div", { ref: d, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ v("button", { onClick: () => {
            a((y) => !y), c(!1);
          }, style: g, children: [
            /* @__PURE__ */ u(Gi, { type: t }),
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
              children: of.map((y) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    o(y), a(!1);
                  },
                  style: {
                    border: "none",
                    background: y === t ? n.controlBgActive : "transparent",
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
                    /* @__PURE__ */ u(Gi, { type: y }),
                    m[y]
                  ]
                },
                y
              ))
            }
          )
        ] }),
        h && /* @__PURE__ */ v("div", { ref: p, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ v("button", { onClick: () => {
            c((y) => !y), a(!1);
          }, style: g, children: [
            /* @__PURE__ */ v("span", { children: [
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
              children: rf.map((y) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    r(y === ur[t] ? void 0 : y), c(!1);
                  },
                  style: {
                    border: "none",
                    background: y === f ? n.controlBgActive : "transparent",
                    color: n.text,
                    borderRadius: 4,
                    padding: "4px 8px",
                    fontSize: 10,
                    cursor: "pointer",
                    textAlign: "center",
                    width: "100%"
                  },
                  children: [
                    y,
                    "ms",
                    y === ur[t] ? " •" : ""
                  ]
                },
                y
              ))
            }
          )
        ] })
      ]
    }
  );
}
function sf({ engine: t, open: e, onClose: o }) {
  const r = Zt(), { isRTL: n, labels: s } = qt(), [i, a] = ot(() => On(t)), [l, c] = ot(() => new Set(t.selection)), [d, p] = ot(0), h = ht(null), f = ht(null), m = ht(0), g = ht(!1), y = ht(i);
  y.current = i;
  const x = ht(!1), b = ht(!1), [k, S] = ot(null), [M, A] = ot(null), [R, F] = ot(0), T = ht([]), O = ht(null), $ = ct(() => {
    if (x.current) return;
    const D = On(t);
    a(D);
  }, [t]), at = ct(() => {
    c(new Set(t.selection));
  }, [t]), ft = ht(null), G = ct(() => {
    ft.current && clearTimeout(ft.current), ft.current = setTimeout(() => p((D) => D + 1), 500);
  }, []);
  kt(() => {
    $(), at();
    const D = setTimeout(() => p((j) => j + 1), 200), Z = () => {
      $(), G();
    };
    return t.on("change", Z), t.on("node:create", Z), t.on("node:delete", Z), t.on("node:data", Z), t.on("selection", at), t.on("history", Z), () => {
      clearTimeout(D), t.off("change", Z), t.off("node:create", Z), t.off("node:delete", Z), t.off("node:data", Z), t.off("selection", at), t.off("history", Z), ft.current && clearTimeout(ft.current);
    };
  }, [t, $, at, G]), kt(() => {
    if (!O.current) return;
    const D = O.current.querySelectorAll("[data-frame-card]");
    T.current = Array.from(D).map((Z) => Z.offsetHeight + Xi);
  }, [i]);
  const st = ct(
    (D) => {
      t.select(D), t.zoomToNode(D, 0.8);
    },
    [t]
  ), N = ct(
    (D, Z) => {
      D.preventDefault(), D.stopPropagation(), m.current = D.clientY, h.current = Z, f.current = Z, g.current = !1;
    },
    []
  );
  return kt(() => {
    const D = (j) => {
      if (h.current === null) return;
      const J = j.clientY - m.current;
      if (!g.current) {
        if (Math.abs(J) < 4) return;
        g.current = !0, S(h.current), A(h.current);
      }
      F(J);
      const Y = T.current, tt = h.current;
      let rt = tt;
      if (J > 0) {
        let Q = 0;
        for (let K = tt + 1; K < y.current.length && (Q += Y[K] || 0, J > Q - (Y[K] || 0) / 2); K++)
          rt = K;
      } else if (J < 0) {
        let Q = 0;
        for (let K = tt - 1; K >= 0 && (Q -= Y[K] || 0, J < Q + (Y[K] || 0) / 2); K--)
          rt = K;
      }
      f.current = rt, A(rt);
    }, Z = () => {
      const j = h.current, J = f.current;
      if (j !== null && J !== null && j !== J) {
        x.current = !0;
        const Y = [...y.current], [tt] = Y.splice(j, 1);
        Y.splice(J, 0, tt);
        let rt = !0;
        for (let Q = 0; Q < Y.length; Q++) {
          const K = Y[Q], et = t.getNode(K.id);
          et && (rt ? (t.updateNodeWithHistory(K.id, {
            data: { ...et.data, slideOrder: Q + 1 }
          }), rt = !1) : t.updateNode(K.id, {
            data: { ...et.data, slideOrder: Q + 1 }
          }));
        }
        x.current = !1, b.current = !0, a(On(t)), p((Q) => Q + 1);
      }
      h.current = null, f.current = null, g.current = !1, S(null), A(null), F(0), b.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", D), document.addEventListener("pointerup", Z), document.addEventListener("pointercancel", Z), () => {
      document.removeEventListener("pointermove", D), document.removeEventListener("pointerup", Z), document.removeEventListener("pointercancel", Z);
    };
  }, [t]), /* @__PURE__ */ v(
    "div",
    {
      "data-sb-frames-panel": !0,
      style: {
        position: "absolute",
        top: 0,
        right: n ? void 0 : 0,
        left: n ? 0 : void 0,
        bottom: 0,
        width: Hn,
        background: r.panelBg,
        borderLeft: n ? void 0 : `1px solid ${r.border}`,
        borderRight: n ? `1px solid ${r.border}` : void 0,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : n ? `translateX(-${Hn}px)` : `translateX(${Hn}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (D) => D.stopPropagation(),
      children: [
        /* @__PURE__ */ v(
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
              /* @__PURE__ */ v("span", { style: { fontSize: 12, fontWeight: 600, color: r.text, letterSpacing: "0.02em" }, children: [
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
                  children: /* @__PURE__ */ u(_p, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ v(
          "div",
          {
            ref: O,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: Xi
            },
            children: [
              i.length === 0 && /* @__PURE__ */ u("div", { style: { padding: "20px 8px", textAlign: "center", color: r.textMuted, fontSize: 11 }, children: s.noFramesYet }),
              i.map((D, Z) => {
                const j = l.has(D.id), J = k === Z;
                let Y = 0;
                if (J)
                  Y = R;
                else if (k !== null && M !== null) {
                  const Q = T.current;
                  k < M ? Z > k && Z <= M && (Y = -(Q[k] || 0)) : k > M && Z >= M && Z < k && (Y = Q[k] || 0);
                }
                const tt = (Q) => {
                  t.updateNodeWithHistory(D.id, {
                    data: { transition: Q === "pan" ? void 0 : Q, transitionDuration: void 0 }
                  });
                }, rt = (Q) => {
                  t.updateNodeWithHistory(D.id, {
                    data: { transitionDuration: Q }
                  });
                };
                return /* @__PURE__ */ v(El.Fragment, { children: [
                  k === null && /* @__PURE__ */ u(
                    nf,
                    {
                      value: D.transition ?? "pan",
                      durationMs: D.transitionDuration,
                      onChange: tt,
                      onDurationChange: rt,
                      theme: r,
                      labels: s
                    }
                  ),
                  /* @__PURE__ */ u(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: (Q) => N(Q, Z),
                      onDoubleClick: () => st(D.id),
                      style: {
                        borderRadius: 6,
                        border: j ? `2px solid ${D.borderColor || r.text}` : `1px solid ${r.border}`,
                        background: j ? r.controlBgActive : "transparent",
                        cursor: J ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transition: J || b.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${Y}px)`,
                        zIndex: J ? 10 : 1,
                        opacity: J ? 0.92 : 1,
                        boxShadow: J ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ u(ef, { engine: t, frameId: D.id, tick: d })
                    }
                  )
                ] }, D.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const Mo = 50, Xn = 30, af = `
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
`, lf = `
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
function Yi(t, e, o) {
  const r = t.createShader(e);
  return r ? (t.shaderSource(r, o), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (t.deleteShader(r), null)) : null;
}
function cf(t, e, o) {
  const r = Yi(t, t.VERTEX_SHADER, e), n = Yi(t, t.FRAGMENT_SHADER, o);
  if (!r || !n) return null;
  const s = t.createProgram();
  return t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function df() {
  const t = [], e = [];
  for (let o = 0; o <= Xn; o++)
    for (let r = 0; r <= Mo; r++)
      t.push(r / Mo, o / Xn * 2 - 1);
  for (let o = 0; o < Xn; o++)
    for (let r = 0; r < Mo; r++) {
      const n = o * (Mo + 1) + r;
      e.push(n, n + Mo + 1, n + 1, n + 1, n + Mo + 1, n + Mo + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function hf({ phase: t, progress: e }) {
  const o = ht(null), r = ht(null);
  return kt(() => {
    const n = o.current;
    if (!n) return;
    const s = window.devicePixelRatio || 1;
    n.width = n.clientWidth * s, n.height = n.clientHeight * s;
    const i = n.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const a = cf(i, af, lf);
    if (!a) return;
    i.useProgram(a);
    const { vertices: l, indices: c } = df(), d = i.createBuffer();
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
  }, []), kt(() => {
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
const uf = {
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
}, Gn = {
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
}, as = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function ji({ dir: t }) {
  return /* @__PURE__ */ v("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ u("polyline", { points: "15,18 9,12 15,6", ...as }),
    t === "right" && /* @__PURE__ */ u("polyline", { points: "9,6 15,12 9,18", ...as })
  ] });
}
function pf() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...as }) });
}
function Vi(t) {
  return 1 - Math.pow(1 - t, 3);
}
function qi(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Ki(t, e) {
  let r;
  t <= 0.2 ? r = 1 + (0.55 - 1) * Vi(t / 0.2) : t >= 0.8 ? r = 0.55 + (1 - 0.55) * Vi((t - 0.8) / 0.2) : r = 0.55;
  let n;
  return t <= 0.1 ? n = 0 : t <= 0.5 ? n = -e * 90 * qi((t - 0.1) / 0.4) : t <= 0.9 ? n = e * 90 * (1 - qi((t - 0.5) / 0.4)) : n = 0, { zoom: r, angle: n };
}
function ff(t, e, o, r) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${r}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function Ui(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function yf({ engine: t }) {
  const [e, o] = ot(t.presentationMode), [r, n] = ot(t.presentationIndex), [s, i] = ot(t.presentationSlides.length), [a, l] = ot(""), [c, d] = ot(t.transitionOverlay), p = ht(null), h = ht(null);
  if (kt(() => {
    const m = document.querySelector("[data-sb-canvas]");
    p.current = m, h.current = (m == null ? void 0 : m.parentElement) ?? null;
    const g = () => {
      var k;
      if (o(t.presentationMode), n(t.presentationIndex), i(t.presentationSlides.length), d(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const S = t.presentationSlides[t.presentationIndex], M = t.getNode(S);
        l(((k = M == null ? void 0 : M.data) == null ? void 0 : k.label) || "");
      } else
        l("");
      const y = t.transitionOverlay, x = p.current, b = h.current;
      if (x && b && y && y.type === "cube" && y.t != null) {
        const S = y.direction ?? 1, { zoom: M, angle: A } = Ki(y.t, S);
        ff(x, b, M, A);
      } else x && b && Ui(x, b);
    };
    return t.on("presentation", g), () => {
      t.off("presentation", g);
      const y = p.current, x = h.current;
      y && x && Ui(y, x);
    };
  }, [t]), !e || s === 0) return null;
  const f = c && c.type === "cube" && c.t != null ? (() => {
    const m = c.direction ?? 1, { angle: g } = Ki(c.t, m);
    return Math.abs(g) / 90 * 0.4;
  })() : 0;
  return /* @__PURE__ */ v(
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
        c && c.type === "fold" && /* @__PURE__ */ u(hf, { phase: c.phase, progress: c.progress }),
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
        /* @__PURE__ */ v("div", { style: uf, onPointerDown: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Gn, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ u(pf, {})
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Gn, opacity: r <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: r <= 0,
              children: /* @__PURE__ */ u(ji, { dir: "left" })
            }
          ),
          /* @__PURE__ */ v(
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
                a && /* @__PURE__ */ v("span", { style: { opacity: 0.6, marginLeft: 8 }, children: [
                  "— ",
                  a
                ] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Gn, opacity: r >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: r >= s - 1,
              children: /* @__PURE__ */ u(ji, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
function no(t) {
  return `${t.toFixed(2)} ms`;
}
function be(t, e) {
  return { label: t, value: e };
}
function gf() {
  const t = Zt(), { labels: e } = qt(), [o, r] = ot(() => pe.getSnapshot());
  kt(() => {
    let s = 0;
    const i = (l) => {
      pe.tick(l), s = requestAnimationFrame(i);
    };
    s = requestAnimationFrame(i);
    const a = pe.subscribe(() => r(pe.getSnapshot()));
    return () => {
      cancelAnimationFrame(s), a();
    };
  }, []);
  const n = Ut(
    () => [
      be(e.perfVirtualization, o.virtualizationActive ? e.perfOn : e.perfOff),
      be(e.perfFps, o.fps.toFixed(1)),
      be(e.perfFrameP50P95, `${no(o.frameMsP50)} / ${no(o.frameMsP95)}`),
      be(e.perfCullingP50P95, `${no(o.cullingMsP50)} / ${no(o.cullingMsP95)}`),
      be(e.perfHitTestP50P95, `${no(o.hitTestMsP50)} / ${no(o.hitTestMsP95)}`),
      be(e.perfEdgeHitP50P95, `${no(o.edgeHitMsP50)} / ${no(o.edgeHitMsP95)}`),
      be(e.perfHitTestCalls, o.hitTestCallsPerSec.toFixed(1)),
      be(e.perfEdgeHitCalls, o.edgeHitCallsPerSec.toFixed(1)),
      be(e.perfVisibleNodes, `${o.visibleNodes} / ${o.totalNodes}`),
      be(e.perfVisibleEdges, `${o.visibleEdges} / ${o.totalEdges}`),
      be(e.perfSeedVisibleNodes, String(o.seedVisibleNodes)),
      be(e.perfNodesAdjacency, String(o.nodesAddedByAdjacency)),
      be(e.perfNodesEdgeEndpoints, String(o.nodesAddedByEdgeEndpoints)),
      be(e.perfEdgesAdjacency, String(o.edgesAddedByAdjacency)),
      be(e.perfEdgesCrossing, String(o.edgesAddedByCrossing))
    ],
    [o, e]
  );
  return /* @__PURE__ */ v(
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
        /* @__PURE__ */ u("div", { style: { padding: "8px 10px", display: "grid", rowGap: 4 }, children: n.map((s) => /* @__PURE__ */ v("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
          /* @__PURE__ */ u("span", { style: { color: t.textMuted }, children: s.label }),
          /* @__PURE__ */ u("span", { children: s.value })
        ] }, s.label)) })
      ]
    }
  );
}
const mf = Dl(() => import("./DebugPanel-Dxvl7FhQ.js"));
function Ff({
  nodeTypes: t = yh,
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
  const f = Ut(
    () => e ?? new Fc(),
    [e]
  ), m = Ut(() => new Bc(t), [t]);
  kt(() => yc(), []), kt(() => {
    f.setRegistry(m);
  }, [f, m]), kt(() => {
    for (const O of t)
      O.isContainer && f.registerContainerType(O.type);
  }, [f, t]);
  const g = ht(!1);
  kt(() => {
    n && !g.current && (g.current = !0, f.fromSBD(n));
  }, [f, n]);
  const y = ht(null);
  kt(() => {
    if (o)
      return iu(f, y.current);
  }, [f, o]);
  const x = Ut(() => t.some(($) => {
    var at;
    return (at = $.ports) == null ? void 0 : at.length;
  }) ? new gh(f, m) : null, [f, m, t]);
  kt(() => {
    if (x)
      return x.connect();
  }, [x]);
  const b = Ut(
    () => l ? { ...ts, ...l } : ts,
    [l]
  ), k = Gh(p, h), [S, M] = ot(!1), [A, R] = ot(!1), [F, T] = ot(!1);
  return kt(() => {
    pe.setEnabled(F);
  }, [F]), kt(() => {
    const O = () => {
      const $ = f.presentationMode;
      M($), c == null || c($);
    };
    return f.on("presentation", O), () => f.off("presentation", O);
  }, [f, c]), /* @__PURE__ */ u(Na.Provider, { value: k, children: /* @__PURE__ */ u(Ia.Provider, { value: b, children: /* @__PURE__ */ v(
    "div",
    {
      ref: y,
      dir: k.dir,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        ...r
      },
      children: [
        s && !S && /* @__PURE__ */ u(Vp, { engine: f, registry: m, gifApiBaseUrl: d }),
        i && /* @__PURE__ */ u(Ll, { fallback: null, children: /* @__PURE__ */ u(mf, { engine: f, extraBoards: a }) }),
        /* @__PURE__ */ v(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !S && !k.isRTL ? Ue : 0,
              top: 0,
              right: s && !S && k.isRTL ? Ue : 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ u(Lu, { engine: f, schema: ds, registry: m, dataFlow: x }),
              !S && /* @__PURE__ */ u(Jp, { engine: f }),
              !S && /* @__PURE__ */ u(
                Zp,
                {
                  engine: f,
                  framesPanelOpen: A,
                  onToggleFramesPanel: () => R((O) => !O),
                  showPerfOverlay: F,
                  onTogglePerfOverlay: () => T((O) => !O)
                }
              ),
              !S && F && /* @__PURE__ */ u(gf, {}),
              !S && /* @__PURE__ */ u(
                sf,
                {
                  engine: f,
                  open: A,
                  onClose: () => R(!1)
                }
              ),
              /* @__PURE__ */ u(yf, { engine: f })
            ]
          }
        )
      ]
    }
  ) }) });
}
const bf = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], Zo = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, ee = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function hr({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...ee }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ...ee })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...ee }),
    t === "text" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M7 4h10", ...ee }),
      /* @__PURE__ */ u("path", { d: "M12 4v16", ...ee })
    ] }),
    t === "note" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ...ee }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...ee }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...ee, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...ee, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...ee, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...ee }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ...ee })
    ] }),
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...ee }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...ee }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...ee }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...ee }),
    t === "arrow" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...ee }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...ee, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ee, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...ee, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ee, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...ee, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ...ee }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...ee }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...ee })
    ] }),
    t === "fit" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...ee }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...ee })
    ] })
  ] });
}
function Bf({ engine: t }) {
  const [e, o] = ot(t.mode), [r, n] = ot(!1), [s, i] = ot(!1), [a, l] = ot(t.boardBackground);
  return kt(() => {
    const c = () => o(t.mode), d = () => {
      n(t.canUndo()), i(t.canRedo());
    }, p = () => l(t.boardBackground);
    return t.on("mode", c), t.on("history", d), t.on("background", p), () => {
      t.off("mode", c), t.off("history", d), t.off("background", p);
    };
  }, [t]), /* @__PURE__ */ v(
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
        bf.map((c) => /* @__PURE__ */ u(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...Zo,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(hr, { name: c.key })
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
              ...Zo,
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
              ...Zo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(hr, { name: "print" })
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
              ...Zo,
              width: 36,
              height: 36,
              background: "transparent",
              color: r ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(hr, { name: "undo" })
          }
        ),
        /* @__PURE__ */ u(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...Zo,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(hr, { name: "redo" })
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
              ...Zo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(hr, { name: "fit" })
          }
        )
      ]
    }
  );
}
const so = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], xf = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], wf = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Qo = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], kf = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Jo = [1, 2.5, 5, 10, 20], vf = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], Sf = [14, 20, 28, 36], Mf = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Yn = 300, jt = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, Vt = {
  width: 64,
  fontSize: 10,
  color: "#999",
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
};
function Nf({
  engine: t,
  registry: e
}) {
  const [o, r] = ot(t.mode), [n, s] = ot(t.selection), [, i] = ot(0), [a, l] = ot(null), c = ht(null), d = ht(null), [p, h] = ot(!1), f = ct(() => {
    var ut;
    return { x: (((ut = c.current) == null ? void 0 : ut.ownerDocument.defaultView) ?? window).innerWidth - Yn - 12, y: 12 };
  }, []), m = a ?? f();
  kt(() => {
    const C = () => r(t.mode), ut = () => {
      s(new Set(t.selection)), i((ae) => ae + 1);
    }, $t = () => i((ae) => ae + 1);
    return t.on("mode", C), t.on("selection", ut), t.on("change", $t), () => {
      t.off("mode", C), t.off("selection", ut), t.off("change", $t);
    };
  }, [t]);
  const g = ct((C) => {
    C.stopPropagation(), h(!0);
    const ut = a ? a.x : f().x, $t = a ? a.y : f().y;
    d.current = { startX: C.clientX, startY: C.clientY, startLeft: ut, startTop: $t }, C.currentTarget.setPointerCapture(C.pointerId);
  }, [a, f]);
  kt(() => {
    var ae;
    const C = (Ie) => {
      var bo;
      if (!d.current) return;
      const Ye = Ie.clientX - d.current.startX, Be = Ie.clientY - d.current.startY, je = ((bo = c.current) == null ? void 0 : bo.ownerDocument.defaultView) ?? window, mo = Math.max(48, Math.min(je.innerWidth - Yn - 8, d.current.startLeft + Ye)), No = Math.max(8, Math.min(je.innerHeight - 100, d.current.startTop + Be));
      l({ x: mo, y: No });
    }, ut = () => {
      d.current = null, h(!1);
    }, $t = ((ae = c.current) == null ? void 0 : ae.ownerDocument) ?? document;
    return $t.addEventListener("pointermove", C), $t.addEventListener("pointerup", ut), $t.addEventListener("pointercancel", ut), () => {
      $t.removeEventListener("pointermove", C), $t.removeEventListener("pointerup", ut), $t.removeEventListener("pointercancel", ut);
    };
  }, []);
  const y = (() => {
    if (n.size === 1) {
      const C = Array.from(n)[0], ut = t.getNode(C);
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
    return o === "draw" || o === "shape" || o === "text" || o === "edge" ? { kind: "tool" } : null;
  })(), x = ct(
    (C) => {
      !y || y.kind !== "shape" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), b = ct(
    (C) => {
      !y || y.kind !== "draw" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), k = ct(
    (C) => {
      !y || y.kind !== "text" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), S = ct(
    (C) => {
      !y || y.kind !== "edge" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), M = ct(
    (C) => {
      !y || y.kind !== "image" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), A = ct(
    (C) => {
      !y || y.kind !== "content" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), R = ct(
    (C) => {
      !y || y.kind !== "frame" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), F = ct(
    (C) => {
      !y || y.kind !== "sticky" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), T = ct(
    (C) => {
      !y || y.kind !== "custom" || t.updateNodeWithHistory(y.node.id, {
        data: { ...y.node.data, ...C }
      });
    },
    [t, y]
  ), [O, $] = ot("idle");
  if (!y) return null;
  const at = y.kind === "custom", ft = y.kind === "shape", G = y.kind === "draw", st = y.kind === "text", N = y.kind === "edge", D = y.kind === "image", Z = y.kind === "content", j = y.kind === "frame", J = y.kind === "sticky", Y = y.kind === "tool", tt = Y && o === "shape", rt = Y && o === "text", Q = st ? y.node.data.fontFamily : t.activeTool.fontFamily ?? lo, K = st ? y.node.data.fontSize : t.activeTool.fontSize ?? 20, et = st ? y.node.data.align : t.activeTool.textAlign ?? "left", gt = st ? y.node.data.color : t.activeTool.color, lt = ft ? y.node.data.stroke : G ? y.node.data.color : t.activeTool.color, vt = ft || G ? y.node.data.fill ?? null : t.activeTool.fillColor ?? null, xt = ft || G ? y.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", pt = ft || G ? y.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", Ct = ft || G ? y.node.data.strokeWidth : t.activeTool.width, St = ft ? y.node.data.roughness : t.activeTool.roughness ?? 1, Rt = ft || G || st || D || Z || j || J ? y.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, dt = (() => {
    const C = /* @__PURE__ */ new Set(), ut = [];
    for (const $t of t.getAllNodes())
      if ($t.type === "text") {
        const ae = $t.data.fontFamily;
        ae && !C.has(ae) && (C.add(ae), ut.push(ae));
      }
    return ut;
  })(), Ht = !st && !rt && !N && !D && !Z && !j && !J && !at, _t = Ht, oe = Ht, ie = ft || tt, xe = st || rt, Ce = (C) => {
    ft ? x({ stroke: C }) : G ? b({ color: C }) : (t.activeTool.color = C, i((ut) => ut + 1));
  }, we = (C) => {
    ft ? x({ fill: C ?? void 0 }) : G ? b({ fill: C ?? void 0 }) : (t.activeTool.fillColor = C ?? void 0, i((ut) => ut + 1));
  }, fe = (C) => {
    ft ? x({ fillStyle: C }) : G ? b({ fillStyle: C }) : (t.activeTool.fillStyle = C, i((ut) => ut + 1));
  }, Bo = (C) => {
    ft ? x({ strokeStyle: C }) : G ? b({ strokeStyle: C }) : (t.activeTool.strokeStyle = C, i((ut) => ut + 1));
  }, ye = (C) => {
    ft ? x({ strokeWidth: C }) : G ? b({ strokeWidth: C }) : (t.activeTool.width = C, i((ut) => ut + 1));
  }, he = (C) => {
    ft ? x({ roughness: C }) : (t.activeTool.roughness = C, i((ut) => ut + 1));
  }, Fe = (C) => {
    ft ? x({ opacity: C }) : G ? b({ opacity: C }) : st ? k({ opacity: C }) : D ? M({ opacity: C }) : Z ? A({ opacity: C }) : j ? R({ opacity: C }) : J ? F({ opacity: C }) : (t.activeTool.opacity = C, i((ut) => ut + 1));
  }, $e = (C) => {
    st ? k({ fontFamily: C }) : (t.activeTool.fontFamily = C, i((ut) => ut + 1));
  }, ne = (C) => {
    st ? k({ fontSize: C }) : (t.activeTool.fontSize = C, i((ut) => ut + 1));
  }, Ge = (C) => {
    st ? k({ align: C }) : (t.activeTool.textAlign = C, i((ut) => ut + 1));
  }, Ot = (C) => {
    st ? k({ color: C }) : (t.activeTool.color = C, i((ut) => ut + 1));
  }, go = {
    position: "fixed",
    left: m.x,
    top: m.y,
    width: Yn,
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
  return /* @__PURE__ */ v(
    "div",
    {
      ref: c,
      "data-sb-props-panel": !0,
      style: go,
      onPointerDown: (C) => C.stopPropagation(),
      children: [
        /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: g,
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
        xe && /* @__PURE__ */ v(wt, { children: [
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Font" }),
            /* @__PURE__ */ u(
              cn,
              {
                value: Q,
                onChange: $e,
                fontsInScene: dt
              }
            )
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Size" }),
            Sf.map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => ne(C),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: K === C ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: C
              },
              C
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Align" }),
            Mf.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.key,
                onClick: () => Ge(C.key),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: et === C.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: C.label
              },
              C.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Color" }),
            so.map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Ot(C),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C,
                  border: gt === C ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              C
            ))
          ] }),
          st && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Border" }),
            [null, ...so].map((C, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => k({ borderColor: C ?? void 0 }),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C ?? "transparent",
                  border: (y.node.data.borderColor ?? null) === C ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
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
              C ?? "none"
            ))
          ] }),
          st && y.node.data.borderColor && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Style" }),
            Qo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => k({ borderStyle: C.key }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: (y.node.data.borderStyle ?? "solid") === C.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: C.dash
                  }
                ) })
              },
              C.key
            ))
          ] }),
          st && y.node.data.borderColor && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Width" }),
            Jo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: `${C}px`,
                onClick: () => k({ borderWidth: C }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 24,
                  background: (y.node.data.borderWidth ?? 1) === C ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(C, 1),
                      background: "white",
                      borderRadius: C / 2
                    }
                  }
                )
              },
              C
            ))
          ] })
        ] }),
        Ht && /* @__PURE__ */ v(wt, { children: [
          tt && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Shape" }),
            vf.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => {
                  t.activeTool.shapeType = C.key, i((ut) => ut + 1);
                },
                style: {
                  ...Jt,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === C.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(Cf, { name: C.key })
              },
              C.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Stroke" }),
            so.map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Ce(C),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C,
                  border: lt === C ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              C
            ))
          ] }),
          _t && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Fill" }),
            xf.map((C, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => we(C),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C ?? "transparent",
                  border: vt === C ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
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
              C ?? "none"
            ))
          ] }),
          _t && vt && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Fill pattern" }),
            wf.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => fe(C.key),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: xt === C.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(If, { style: C.key })
              },
              C.key
            ))
          ] }),
          oe && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Stroke style" }),
            Qo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => Bo(C.key),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: pt === C.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: C.dash
                  }
                ) })
              },
              C.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Stroke width" }),
            Jo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: `${C}px`,
                onClick: () => ye(C),
                style: {
                  ...Jt,
                  width: 36,
                  height: 24,
                  background: Ct === C ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(C, 1),
                      background: "white",
                      borderRadius: C / 2
                    }
                  }
                )
              },
              C
            ))
          ] }),
          ie && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Roughness" }),
            kf.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => he(C.value),
                style: {
                  ...Jt,
                  height: 28,
                  padding: "0 8px",
                  background: St === C.value ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: C.label
              },
              C.value
            ))
          ] })
        ] }),
        N && /* @__PURE__ */ v(wt, { children: [
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Color" }),
            so.map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => S({ color: C }),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C,
                  border: y.node.data.color === C ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              C
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Style" }),
            Qo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => S({ style: C.key }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: y.node.data.style === C.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: C.dash
                  }
                ) })
              },
              C.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Width" }),
            Jo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: `${C}px`,
                onClick: () => S({ strokeWidth: C }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 24,
                  background: y.node.data.strokeWidth === C ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(C, 1),
                      background: "white",
                      borderRadius: C / 2
                    }
                  }
                )
              },
              C
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => S({ arrowHead: C }),
                style: {
                  ...Jt,
                  height: 28,
                  padding: "0 8px",
                  background: (y.node.data.arrowHead ?? "none") === C ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: C === "none" ? "None" : C === "arrow" ? "▷" : C === "filled" ? "▶" : "●"
              },
              C
            ))
          ] }),
          (y.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Head size" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: y.node.data.arrowHeadSize ?? Math.max(8, y.node.data.strokeWidth * 3),
                onChange: (C) => S({ arrowHeadSize: Number(C.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: y.node.data.arrowHeadSize ?? Math.max(8, y.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => S({ arrowTail: C }),
                style: {
                  ...Jt,
                  height: 28,
                  padding: "0 8px",
                  background: (y.node.data.arrowTail ?? "none") === C ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: C === "none" ? "None" : C === "arrow" ? "◁" : C === "filled" ? "◀" : "●"
              },
              C
            ))
          ] }),
          (y.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Tail size" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: y.node.data.arrowTailSize ?? Math.max(8, y.node.data.strokeWidth * 3),
                onChange: (C) => S({ arrowTailSize: Number(C.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: y.node.data.arrowTailSize ?? Math.max(8, y.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Label" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: y.node.data.label ?? "",
                onChange: (C) => S({ label: C.target.value || void 0 }),
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
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => S({ edgeType: C.key }),
                style: {
                  ...Jt,
                  height: 28,
                  padding: "0 8px",
                  background: (y.node.data.edgeType ?? "bezier") === C.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: C.label
              },
              C.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Animate" }),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: () => S({ animated: !y.node.data.animated }),
                style: {
                  ...Jt,
                  height: 28,
                  padding: "0 12px",
                  background: y.node.data.animated ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: y.node.data.animated ? "On" : "Off"
              }
            )
          ] }),
          y.node.data.animated && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Direction" }),
            ["forward", "reverse", "both"].map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => S({ animatedDirection: C }),
                style: {
                  ...Jt,
                  height: 28,
                  padding: "0 8px",
                  background: (y.node.data.animatedDirection ?? "forward") === C ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: C === "forward" ? "→" : C === "reverse" ? "←" : "⇆"
              },
              C
            ))
          ] })
        ] }),
        D && /* @__PURE__ */ v(wt, { children: [
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Border" }),
            [null, ...so].map((C, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => M({ borderColor: C ?? void 0 }),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C ?? "transparent",
                  border: (y.node.data.borderColor ?? null) === C ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
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
              C ?? "none"
            ))
          ] }),
          y.node.data.borderColor && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Style" }),
            Qo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => M({ borderStyle: C.key }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: (y.node.data.borderStyle ?? "solid") === C.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: C.dash
                  }
                ) })
              },
              C.key
            ))
          ] }),
          y.node.data.borderColor && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Width" }),
            Jo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: `${C}px`,
                onClick: () => M({ borderWidth: C }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 24,
                  background: (y.node.data.borderWidth ?? 1) === C ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(C, 1),
                      background: "white",
                      borderRadius: C / 2
                    }
                  }
                )
              },
              C
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: { ...jt, marginTop: 4 }, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Background" }),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: async () => {
                  if (!(O === "loading" || y.kind !== "image")) {
                    $("loading");
                    try {
                      const { removeBackground: C } = await import("@imgly/background-removal"), $t = await (await fetch(y.node.data.src)).blob(), ae = await C($t), Ie = new FileReader(), Ye = await new Promise((Be, je) => {
                        Ie.onload = () => Be(Ie.result), Ie.onerror = je, Ie.readAsDataURL(ae);
                      });
                      M({ src: Ye }), $("idle");
                    } catch (C) {
                      console.error("Background removal failed:", C), $("error"), setTimeout(() => $("idle"), 3e3);
                    }
                  }
                },
                disabled: O === "loading",
                style: {
                  ...Jt,
                  height: 28,
                  padding: "0 10px",
                  background: O === "error" ? "#e74c3c" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6,
                  gap: 4,
                  opacity: O === "loading" ? 0.6 : 1
                },
                children: O === "loading" ? "Removing..." : O === "error" ? "Failed" : "Remove BG"
              }
            )
          ] })
        ] }),
        Z && /* @__PURE__ */ v(wt, { children: [
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Border" }),
            [null, ...so].map((C, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => A({ borderColor: C ?? void 0 }),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C ?? "transparent",
                  border: (y.node.data.borderColor ?? null) === C ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
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
              C ?? "none"
            ))
          ] }),
          y.node.data.borderColor && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Style" }),
            Qo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => A({ borderStyle: C.key }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: (y.node.data.borderStyle ?? "solid") === C.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: C.dash
                  }
                ) })
              },
              C.key
            ))
          ] }),
          y.node.data.borderColor && /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Width" }),
            Jo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: `${C}px`,
                onClick: () => A({ borderWidth: C }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 24,
                  background: (y.node.data.borderWidth ?? 1) === C ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(C, 1),
                      background: "white",
                      borderRadius: C / 2
                    }
                  }
                )
              },
              C
            ))
          ] })
        ] }),
        j && /* @__PURE__ */ v(wt, { children: [
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Label" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: y.node.data.label ?? "",
                onChange: (C) => R({ label: C.target.value || void 0 }),
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
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Background" }),
            [null, ...so].map((C, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => R({ backgroundColor: C ? `${C}15` : void 0 }),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C ?? "transparent",
                  border: (() => {
                    const $t = y.node.data.backgroundColor;
                    return (C === null ? !$t : $t === `${C}15`) ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`;
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
              C ?? "none"
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Border" }),
            so.map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => R({ borderColor: C }),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C,
                  border: y.node.data.borderColor === C ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              C
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Style" }),
            Qo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: C.label,
                onClick: () => R({ borderStyle: C.key }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 28,
                  background: (y.node.data.borderStyle ?? "dashed") === C.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: C.dash
                  }
                ) })
              },
              C.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Width" }),
            Jo.map((C) => /* @__PURE__ */ u(
              "button",
              {
                title: `${C}px`,
                onClick: () => R({ borderWidth: C }),
                style: {
                  ...Jt,
                  width: 36,
                  height: 24,
                  background: (y.node.data.borderWidth ?? 1) === C ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(C, 1),
                      background: "white",
                      borderRadius: C / 2
                    }
                  }
                )
              },
              C
            ))
          ] })
        ] }),
        J && /* @__PURE__ */ v(wt, { children: [
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => F({ color: C }),
                style: {
                  ...Jt,
                  width: 20,
                  height: 20,
                  background: C,
                  border: y.node.data.color === C ? "2px solid #1e1e2e" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              C
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: jt, children: [
            /* @__PURE__ */ u("span", { style: Vt, children: "Size" }),
            [12, 14, 16, 20, 24].map((C) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => F({ fontSize: C }),
                style: {
                  ...Jt,
                  width: 32,
                  height: 24,
                  background: (y.node.data.fontSize ?? 16) === C ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                  fontSize: 10,
                  color: "white"
                },
                children: C
              },
              C
            ))
          ] })
        ] }),
        at && (() => {
          const { node: C, PanelComponent: ut } = y;
          return /* @__PURE__ */ u(ut, { node: C, data: C.data, engine: t, updateData: T });
        })(),
        !N && !at && /* @__PURE__ */ v("div", { style: jt, children: [
          /* @__PURE__ */ u("span", { style: Vt, children: "Opacity" }),
          /* @__PURE__ */ u(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(Rt * 100),
              onChange: (C) => Fe(parseInt(C.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(Rt * 100) })
        ] })
      ]
    }
  );
}
function Cf({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function If({ style: t }) {
  return t === "hachure" ? /* @__PURE__ */ v("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ v("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: "white", strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ u("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ u("rect", { x: 2, y: 2, width: 16, height: 12, fill: "white", rx: 2 }) });
}
export {
  Zt as A,
  lo as D,
  Bc as N,
  er as P,
  Wf as S,
  Bf as T,
  Ba as a,
  ts as b,
  gh as c,
  Nf as d,
  Vp as e,
  Ff as f,
  Lu as g,
  Fc as h,
  yh as i,
  Vc as j,
  Yd as k,
  Kd as l,
  oh as m,
  Tt as n,
  kr as o,
  gs as p,
  Jd as q,
  us as r,
  mc as s,
  vo as t,
  hc as u,
  iu as v,
  Vd as w,
  ih as x,
  th as y,
  qt as z
};
