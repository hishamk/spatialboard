var Ic = Object.defineProperty;
var Tc = (t, e, o) => e in t ? Ic(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var kt = (t, e, o) => Tc(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as zc, defaultBlockSpecs as Pc, BlockNoteEditor as Ac } from "@blocknote/core";
import { jsxs as S, jsx as h, Fragment as Mt } from "react/jsx-runtime";
import Ec, { memo as Le, useRef as ut, useState as et, useEffect as St, useCallback as lt, Component as Lc, useMemo as Kt, useLayoutEffect as Co, useContext as Ge, createContext as Bn, forwardRef as Wa, createElement as ms, Suspense as Rc, lazy as Dc } from "react";
import { useCreateBlockNote as Wc } from "@blocknote/react";
import { BlockNoteView as Bc } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as Ze, flushSync as Nc } from "react-dom";
const Fc = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Rt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += Fc[o[t] & 63];
  return e;
};
const Hc = {
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
}, Oc = {
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
}, Xc = {
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
}, Yc = {
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
}, Gc = {
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
}, jc = {
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
}, Vc = {
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
}, Kc = {
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
}, qc = {
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
}, Uc = {
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
}, Zc = {
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
}, Qc = {
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
}, Ba = [
  Hc,
  Oc,
  Xc,
  Yc,
  Gc,
  jc,
  Vc,
  Kc,
  qc,
  Uc,
  Zc,
  Qc
];
class Jc {
  constructor() {
    kt(this, "undoStack", []);
    kt(this, "redoStack", []);
    kt(this, "maxSize", 50);
  }
  pushSnapshot(e, o) {
    const n = { nodes: Array.from(e.entries()) };
    o && o.size > 0 && (n.groupParent = Array.from(o.entries()));
    const r = JSON.stringify(n);
    this.undoStack.push(r), this.undoStack.length > this.maxSize && this.undoStack.shift(), this.redoStack = [];
  }
  undo(e, o) {
    if (this.undoStack.length === 0) return null;
    const n = { nodes: Array.from(e.entries()) };
    o && o.size > 0 && (n.groupParent = Array.from(o.entries())), this.redoStack.push(JSON.stringify(n));
    const r = JSON.parse(this.undoStack.pop());
    return {
      nodes: new Map(r.nodes),
      groupParent: new Map(r.groupParent ?? [])
    };
  }
  redo(e, o) {
    if (this.redoStack.length === 0) return null;
    const n = { nodes: Array.from(e.entries()) };
    o && o.size > 0 && (n.groupParent = Array.from(o.entries())), this.undoStack.push(JSON.stringify(n));
    const r = JSON.parse(this.redoStack.pop());
    return {
      nodes: new Map(r.nodes),
      groupParent: new Map(r.groupParent ?? [])
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
const Na = 4, $c = 8, Fa = 6, Ha = 6, _c = 10, td = 14, ed = 24;
function bo(t, e, o, n) {
  if (!t.rotation) return [e, o];
  const r = t.x + t.w / 2, s = t.y + n / 2, i = -t.rotation * Math.PI / 180, l = Math.cos(i), d = Math.sin(i), c = e - r, a = o - s;
  return [r + c * l - a * d, s + c * d + a * l];
}
function Rn(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function od(t, e, o, n) {
  const r = Rn(t, n), [s, i] = bo(t, e, o, r), l = t.x, d = t.y, c = t.w, a = r, u = s < l ? l - s : s > l + c ? s - (l + c) : 0, f = i < d ? d - i : i > d + a ? i - (d + a) : 0;
  return u === 0 && f === 0 ? Math.min(s - l, l + c - s, i - d, d + a - i) : Math.hypot(u, f);
}
function nd(t) {
  return Math.max(0.01, t);
}
function Nn(t, e) {
  return t / nd(e);
}
function rd(t, e, o, n = 1, r, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, a) => a.z - c.z);
  let l = null, d = null;
  for (const c of i)
    if (c.type === "draw") {
      if (Ys(c, e, o, n))
        return c;
    } else if (c.type === "shape") {
      if (Sr(c, e, o, n)) return c;
      if (!d && c.data.label) {
        const a = c.h === "auto" ? 100 : c.h, [u, f] = bo(c, e, o, a), y = Ya(c, a);
        y && u >= y.lx && u <= y.rx && f >= y.ly && f <= y.ry && (d = c);
      }
    } else if (s && s.has(c.type)) {
      const a = Rn(c, r);
      Oa(c, e, o, n, a) && (l || (l = c));
    } else {
      const a = Rn(c, r), u = Nn(Math.max(Na, Ha), n), [f, y] = bo(c, e, o, a);
      f >= c.x - u && f <= c.x + c.w + u && y >= c.y - u && y <= c.y + a + u && (d || (d = c));
    }
  return d ?? l;
}
function Oa(t, e, o, n, r) {
  const s = r ?? (t.h === "auto" ? 100 : t.h), [i, l] = bo(t, e, o, s), d = n < 0.8 ? td : _c, c = Nn(Math.max($c, d), n);
  if (t.data.label && i >= t.x && i <= t.x + t.w && l >= t.y - ed && l <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || l < t.y - c || l > t.y + s + c)
    return !1;
  const u = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), y = Math.abs(l - t.y), p = Math.abs(l - (t.y + s)), g = i >= t.x - c && i <= t.x + t.w + c;
  return l >= t.y - c && l <= t.y + s + c && (u <= c || f <= c) || g && (y <= c || p <= c);
}
function Xa(t, e, o, n, r, s) {
  const i = r - o, l = s - n, d = i * i + l * l;
  if (d === 0) return (t - o) ** 2 + (e - n) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - n) * l) / d)), a = o + c * i, u = n + c * l;
  return (t - a) ** 2 + (e - u) ** 2;
}
function Ya(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const n = o.labelFontSize ?? 14, r = n * 1.3, s = n * 0.55, l = t.w - 12 * 2, d = o.label.split(`
`);
  let c = 0;
  for (const p of d) {
    const g = p.length * s;
    c += Math.max(1, Math.ceil(g / Math.max(l, 1)));
  }
  const a = c * r, u = Math.min(l, Math.max(...d.map((p) => p.length)) * s), f = t.x + t.w / 2, y = t.y + e / 2;
  return {
    lx: f - u / 2 - 4,
    ly: y - a / 2 - 4,
    rx: f + u / 2 + 4,
    ry: y + a / 2 + 4
  };
}
function Sr(t, e, o, n, r) {
  const s = t.h === "auto" ? 100 : t.h, [i, l] = bo(t, e, o, s), d = t.data, c = d.strokeWidth ?? 2, a = Nn(Math.max(c / 2, Fa), n), u = !!d.fill || !!r;
  switch (d.shape) {
    case "rect": {
      if (u)
        return i >= t.x - a && i <= t.x + t.w + a && l >= t.y - a && l <= t.y + s + a;
      const f = Math.abs(i - t.x), y = Math.abs(i - (t.x + t.w)), p = Math.abs(l - t.y), g = Math.abs(l - (t.y + s)), m = i >= t.x - a && i <= t.x + t.w + a;
      return l >= t.y - a && l <= t.y + s + a && (f <= a || y <= a) || m && (p <= a || g <= a);
    }
    case "ellipse": {
      const f = t.x + t.w / 2, y = t.y + s / 2, p = t.w / 2, g = s / 2;
      if (p === 0 || g === 0) return !1;
      const m = (i - f) / p, x = (l - y) / g, b = m * m + x * x;
      if (u) {
        const M = ((p + a) / p) ** 2;
        return b <= M;
      }
      const w = a / Math.min(p, g);
      return Math.abs(Math.sqrt(b) - 1) <= w;
    }
    case "diamond": {
      const f = t.x + t.w / 2, y = t.y + s / 2, p = t.w / 2, g = s / 2;
      if (p === 0 || g === 0) return !1;
      const m = Math.abs(i - f) / p, x = Math.abs(l - y) / g, b = m + x;
      if (u) {
        const M = a / Math.min(p, g);
        return b <= 1 + M;
      }
      const w = a / Math.min(p, g);
      return Math.abs(b - 1) <= w;
    }
    case "line":
    case "arrow": {
      const f = d.startPoint ?? [0, 0], y = d.endPoint ?? [t.w, s], p = t.x + f[0], g = t.y + f[1], m = t.x + y[0], x = t.y + y[1];
      return Xa(i, l, p, g, m, x) <= a * a;
    }
    default:
      return i >= t.x - a && i <= t.x + t.w + a && l >= t.y - a && l <= t.y + s + a;
  }
}
function sd(t, e, o) {
  let n = !1;
  for (let r = 0, s = o.length - 1; r < o.length; s = r++) {
    const i = o[r][0], l = o[r][1], d = o[s][0], c = o[s][1];
    l > e != c > e && t < (d - i) * (e - l) / (c - l) + i && (n = !n);
  }
  return n;
}
function Ys(t, e, o, n) {
  const r = t.data.strokeWidth, s = Nn(Math.max(r / 2, Fa), n), i = s * s, l = t.h === "auto" ? 100 : t.h, [d, c] = bo(t, e, o, l);
  if (d < t.x - s || d > t.x + t.w + s || c < t.y - s || c > t.y + l + s)
    return !1;
  const a = t.data.points;
  if (!a || a.length === 0) return !1;
  const u = d - t.x, f = c - t.y;
  if (a.length === 1) {
    const y = u - a[0][0], p = f - a[0][1];
    return y * y + p * p <= i;
  }
  if (t.data.fill && a.length >= 3 && sd(u, f, a))
    return !0;
  for (let y = 0; y < a.length - 1; y++)
    if (Xa(u, f, a[y][0], a[y][1], a[y + 1][0], a[y + 1][1]) <= i)
      return !0;
  return !1;
}
function id(t, e, o, n = 1, r, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, a) => a.z - c.z), l = [], d = [];
  for (const c of i)
    if (c.type === "draw")
      Ys(c, e, o, n) && l.push(c);
    else if (c.type === "shape") {
      if (Sr(c, e, o, n))
        l.push(c);
      else if (c.data.label) {
        const a = c.h === "auto" ? 100 : c.h, [u, f] = bo(c, e, o, a), y = Ya(c, a);
        y && u >= y.lx && u <= y.rx && f >= y.ly && f <= y.ry && d.push(c);
      }
    } else if (s && s.has(c.type)) {
      const a = Rn(c, r);
      Oa(c, e, o, n, a) && d.push(c);
    } else {
      const a = Rn(c, r), u = Nn(Math.max(Na, Ha), n), [f, y] = bo(c, e, o, a);
      f >= c.x - u && f <= c.x + c.w + u && y >= c.y - u && y <= c.y + a + u && d.push(c);
    }
  return [...l, ...d];
}
function $n(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, n = t.y + e / 2, r = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, l = Math.abs(Math.cos(i)), d = Math.abs(Math.sin(i)), c = r * l + s * d, a = r * d + s * l;
  return {
    x: o - c,
    y: n - a,
    w: c * 2,
    h: a * 2
  };
}
const Ke = class Ke {
  constructor(e, o = 0, n) {
    // Increased depth for potentially large boards
    kt(this, "level");
    kt(this, "bounds");
    kt(this, "objects");
    kt(this, "nodes");
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    kt(this, "heightMap");
    this.bounds = e, this.level = o, this.objects = [], this.nodes = [], this.heightMap = n ?? /* @__PURE__ */ new Map();
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
    const e = this.bounds.w / 2, o = this.bounds.h / 2, n = this.bounds.x, r = this.bounds.y;
    this.nodes[0] = new Ke({ x: n + e, y: r, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new Ke({ x: n, y: r, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new Ke({ x: n, y: r + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new Ke({ x: n + e, y: r + o, w: e, h: o }, this.level + 1, this.heightMap);
  }
  // Determine which quadrant the object belongs to
  getIndex(e) {
    let o = -1;
    const n = this.bounds.x + this.bounds.w / 2, r = this.bounds.y + this.bounds.h / 2, s = e.y < r && e.y + e.h < r, i = e.y > r;
    return e.x < n && e.x + e.w < n ? s ? o = 1 : i && (o = 2) : e.x > n && (s ? o = 0 : i && (o = 3)), o;
  }
  // Insert the object into the quadtree
  insert(e, o) {
    const n = o ?? this.resolveH(e);
    o != null && e.h === "auto" && this.heightMap.set(e.id, o);
    const r = $n(e, n);
    if (this.nodes.length) {
      const s = this.getIndex(r);
      if (s !== -1) {
        this.nodes[s].insert(e, n);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > Ke.MAX_OBJECTS && this.level < Ke.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], l = this.resolveH(i), d = $n(i, l), c = this.getIndex(d);
        c !== -1 ? (this.nodes[c].insert(i, l), this.objects.splice(s, 1)) : s++;
      }
    }
  }
  // Remove an object. Requires the node (with its coordinates) to find it efficiently.
  remove(e) {
    const o = this.objects.findIndex((n) => n.id === e.id);
    if (o !== -1)
      return this.objects.splice(o, 1), !0;
    if (this.nodes.length) {
      const n = this.resolveH(e), r = this.getIndex($n(e, n));
      if (r !== -1 && this.nodes[r].remove(e))
        return !0;
      for (let s = 0; s < this.nodes.length; s++)
        if (s !== r && this.nodes[s].remove(e)) return !0;
    }
    return !1;
  }
  // Return all objects that could collide with the given rect
  retrieve(e, o) {
    const n = this.getIndex(o);
    for (const r of this.objects) {
      const s = this.resolveH(r), i = $n(r, s);
      i.x < o.x + o.w && i.x + i.w > o.x && i.y < o.y + o.h && i.y + i.h > o.y && e.push(r);
    }
    if (this.nodes.length)
      if (n !== -1)
        this.nodes[n].retrieve(e, o);
      else
        for (const r of this.nodes)
          r.bounds.x < o.x + o.w && r.bounds.x + r.bounds.w > o.x && r.bounds.y < o.y + o.h && r.bounds.y + r.bounds.h > o.y && r.retrieve(e, o);
    return e;
  }
};
// Max number of objects per node before splitting
kt(Ke, "MAX_OBJECTS", 10), // Max depth of the tree
kt(Ke, "MAX_LEVELS", 8);
let bs = Ke;
function Ho(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function un(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function ad(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function ld(t, e, o, n) {
  const r = e > 0 ? 0.95 : 1.05, s = Ho(t.zoom * r, 0.1, 5), i = un(t, o, n);
  return {
    x: o - i.x * s,
    y: n - i.y * s,
    zoom: s
  };
}
function cd(t, e, o, n) {
  const r = Ho(t.zoom * e, 0.1, 5), s = un(t, o, n);
  return {
    x: o - s.x * r,
    y: n - s.y * r,
    zoom: r
  };
}
const Gs = zc.create({
  blockSpecs: {
    ...Pc
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let Kr = null;
function js() {
  return Kr || (Kr = Ac.create({ schema: Gs })), Kr;
}
async function dd(t) {
  return await js().blocksToMarkdownLossy(t);
}
async function Vs(t) {
  return await js().tryParseMarkdownToBlocks(t);
}
function Ga(t) {
  return js().tryParseHTMLToBlocks(t);
}
function hd(t, e, o) {
  const [n, r] = t, [s, i] = e, [l, d] = o, c = l - s, a = d - i, u = c * c + a * a;
  if (u === 0)
    return (n - s) ** 2 + (r - i) ** 2;
  let f = ((n - s) * c + (r - i) * a) / u;
  f = Math.max(0, Math.min(1, f));
  const y = s + f * c, p = i + f * a;
  return (n - y) ** 2 + (r - p) ** 2;
}
function xs(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, n = 0;
  const r = t[0], s = t[t.length - 1];
  for (let d = 1; d < t.length - 1; d++) {
    const c = hd(t[d], r, s);
    c > o && (o = c, n = d);
  }
  if (o <= e)
    return [r, s];
  const i = xs(t.slice(0, n + 1), e), l = xs(t.slice(n), e);
  return [...i.slice(0, -1), ...l];
}
async function ud(t, e) {
  const o = [], n = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (e != null && e.background && e.background !== "dot-grid" && n.push(`background="${e.background}"`), e != null && e.originView) {
    const p = e.originView;
    n.push(`originView="${p.x},${p.y},${p.zoom}"`);
  }
  o.push(`<!--@meta ${n.join(" ")} -->`), o.push("");
  const r = t.filter((p) => p.type === "frame").sort((p, g) => p.z - g.z || p.y - g.y || p.x - g.x);
  for (const p of r) {
    const g = p.h === "auto" ? "auto" : Math.round(p.h), m = [
      `id="${p.id}"`,
      `x="${Math.round(p.x)}"`,
      `y="${Math.round(p.y)}"`,
      `w="${Math.round(p.w)}"`,
      `h="${g}"`,
      `z="${p.z}"`
    ];
    p.data.label && m.push(`label="${p.data.label.replace(/"/g, "&quot;")}"`), p.data.backgroundColor && m.push(`backgroundColor="${p.data.backgroundColor}"`), p.data.borderColor && m.push(`borderColor="${p.data.borderColor}"`), p.data.borderWidth != null && m.push(`borderWidth="${p.data.borderWidth}"`), p.data.borderStyle && p.data.borderStyle !== "solid" && m.push(`borderStyle="${p.data.borderStyle}"`), p.data.opacity !== void 0 && p.data.opacity !== 1 && m.push(`opacity="${p.data.opacity}"`), p.data.slideOrder != null && m.push(`slideOrder="${p.data.slideOrder}"`), p.data.transition && p.data.transition !== "pan" && m.push(`transition="${p.data.transition}"`), p.data.transitionDuration != null && m.push(`transitionDuration="${p.data.transitionDuration}"`), p.rotation && m.push(`rotation="${p.rotation}"`), p.locked && m.push('locked="true"'), p.groupId && m.push(`group="${p.groupId}"`), o.push(`<!--@frame ${m.join(" ")} -->`), o.push("");
  }
  const s = t.filter((p) => p.type === "content").sort((p, g) => p.z - g.z || p.y - g.y || p.x - g.x);
  for (const p of s) {
    const g = [
      `id="${p.id}"`,
      `x="${Math.round(p.x)}"`,
      `y="${Math.round(p.y)}"`,
      `w="${Math.round(p.w)}"`,
      `h="${p.h}"`,
      `z="${p.z}"`
    ];
    p.rotation && g.push(`rotation="${p.rotation}"`), p.locked && g.push('locked="true"'), p.groupId && g.push(`group="${p.groupId}"`), p.data.borderColor && g.push(`borderColor="${p.data.borderColor}"`), p.data.borderWidth != null && g.push(`borderWidth="${p.data.borderWidth}"`), p.data.borderStyle && p.data.borderStyle !== "solid" && g.push(`borderStyle="${p.data.borderStyle}"`), p.data.opacity !== void 0 && p.data.opacity !== 1 && g.push(`opacity="${p.data.opacity}"`), o.push(`<!--@block ${g.join(" ")} -->`);
    const m = p.data.blocks.length > 0 ? await dd(p.data.blocks) : "";
    o.push(m), o.push("");
  }
  const i = t.filter((p) => p.type === "draw");
  for (const p of i) {
    const g = [
      `id="${p.id}"`,
      `x="${Math.round(p.x)}"`,
      `y="${Math.round(p.y)}"`,
      `z="${p.z}"`,
      `tool="${p.data.tool}"`,
      `color="${p.data.color}"`,
      `width="${p.data.strokeWidth}"`
    ];
    p.data.opacity !== void 0 && p.data.opacity !== 1 && g.push(`opacity="${p.data.opacity}"`), p.data.fill && g.push(`fill="${p.data.fill}"`), p.data.fillStyle && p.data.fillStyle !== "hachure" && g.push(`fillStyle="${p.data.fillStyle}"`), p.rotation && g.push(`rotation="${p.rotation}"`), p.locked && g.push('locked="true"'), p.groupId && g.push(`group="${p.groupId}"`), o.push(`<!--@draw ${g.join(" ")} -->`);
    const x = xs([...p.data.points], 1).map(
      ([b, w, M]) => `${(b + p.x).toFixed(1)},${(w + p.y).toFixed(1)},${M.toFixed(2)}`
    ).join(" ");
    o.push(x), o.push("");
  }
  const l = t.filter((p) => p.type === "shape");
  for (const p of l) {
    const g = p.h === "auto" ? "auto" : Math.round(p.h), m = [
      `id="${p.id}"`,
      `x="${Math.round(p.x)}"`,
      `y="${Math.round(p.y)}"`,
      `w="${Math.round(p.w)}"`,
      `h="${g}"`,
      `z="${p.z}"`,
      'tool="shape"',
      `shape="${p.data.shape}"`,
      `color="${p.data.stroke}"`,
      `stroke="${p.data.strokeWidth}"`,
      `roughness="${p.data.roughness}"`
    ];
    p.data.fill && m.push(`fill="${p.data.fill}"`), p.data.fillStyle && p.data.fillStyle !== "hachure" && m.push(`fillStyle="${p.data.fillStyle}"`), p.data.strokeStyle && p.data.strokeStyle !== "solid" && m.push(`strokeStyle="${p.data.strokeStyle}"`), p.data.edgeStyle && p.data.edgeStyle !== "sharp" && m.push(`edgeStyle="${p.data.edgeStyle}"`), p.data.opacity !== void 0 && p.data.opacity !== 1 && m.push(`opacity="${p.data.opacity}"`), p.data.startPoint && m.push(`startPt="${p.data.startPoint[0].toFixed(1)},${p.data.startPoint[1].toFixed(1)}"`), p.data.endPoint && m.push(`endPt="${p.data.endPoint[0].toFixed(1)},${p.data.endPoint[1].toFixed(1)}"`), p.data.label && m.push(`label="${p.data.label.replace(/"/g, "&quot;")}"`), p.data.labelFontSize && m.push(`labelFontSize="${p.data.labelFontSize}"`), p.data.labelFontFamily && p.data.labelFontFamily !== "Excalifont" && m.push(`labelFontFamily="${p.data.labelFontFamily}"`), p.data.labelAlign && p.data.labelAlign !== "center" && m.push(`labelAlign="${p.data.labelAlign}"`), p.rotation && m.push(`rotation="${p.rotation}"`), p.locked && m.push('locked="true"'), p.groupId && m.push(`group="${p.groupId}"`), o.push(`<!--@draw ${m.join(" ")} -->`), o.push("");
  }
  const d = t.filter((p) => p.type === "text");
  for (const p of d) {
    const g = [
      `id="${p.id}"`,
      `x="${Math.round(p.x)}"`,
      `y="${Math.round(p.y)}"`,
      `w="${Math.round(p.w)}"`,
      `z="${p.z}"`,
      `fontSize="${p.data.fontSize}"`,
      `fontFamily="${p.data.fontFamily}"`,
      `color="${p.data.color}"`,
      `align="${p.data.align}"`
    ];
    p.data.opacity !== void 0 && p.data.opacity !== 1 && g.push(`opacity="${p.data.opacity}"`), p.rotation && g.push(`rotation="${p.rotation}"`), p.locked && g.push('locked="true"'), p.groupId && g.push(`group="${p.groupId}"`), o.push(`<!--@text ${g.join(" ")} -->`), o.push(p.data.text), o.push("");
  }
  const c = t.filter((p) => p.type === "image");
  for (const p of c) {
    const g = [
      `id="${p.id}"`,
      `x="${Math.round(p.x)}"`,
      `y="${Math.round(p.y)}"`,
      `w="${Math.round(p.w)}"`,
      `h="${Math.round(p.h)}"`,
      `z="${p.z}"`,
      `src="${p.data.src.replace(/"/g, "&quot;")}"`
    ];
    p.rotation && g.push(`rotation="${p.rotation}"`), p.locked && g.push('locked="true"'), p.groupId && g.push(`group="${p.groupId}"`), p.data.alt && g.push(`alt="${p.data.alt.replace(/"/g, "&quot;")}"`), p.data.opacity != null && p.data.opacity !== 1 && g.push(`opacity="${p.data.opacity}"`), p.data.borderColor && g.push(`borderColor="${p.data.borderColor}"`), p.data.borderWidth != null && g.push(`borderWidth="${p.data.borderWidth}"`), p.data.borderStyle && p.data.borderStyle !== "solid" && g.push(`borderStyle="${p.data.borderStyle}"`), o.push(`<!--@image ${g.join(" ")} -->`), o.push("");
  }
  const a = t.filter((p) => p.type === "edge");
  for (const p of a) {
    const g = [
      `id="${p.id}"`,
      `from="${p.data.fromId}"`,
      `to="${p.data.toId}"`,
      `style="${p.data.style}"`,
      `color="${p.data.color}"`
    ];
    p.data.label && g.push(`label="${p.data.label}"`), p.data.strokeWidth && p.data.strokeWidth !== 1 && g.push(`strokeWidth="${p.data.strokeWidth}"`), p.data.arrowHead && p.data.arrowHead !== "none" && g.push(`arrowHead="${p.data.arrowHead}"`), p.data.arrowTail && p.data.arrowTail !== "none" && g.push(`arrowTail="${p.data.arrowTail}"`), p.data.arrowHeadSize && g.push(`arrowHeadSize="${p.data.arrowHeadSize}"`), p.data.arrowTailSize && g.push(`arrowTailSize="${p.data.arrowTailSize}"`), p.data.edgeType && p.data.edgeType !== "bezier" && g.push(`edgeType="${p.data.edgeType}"`), p.data.animated && g.push('animated="true"'), p.data.animatedDirection && p.data.animatedDirection !== "forward" && g.push(`animatedDirection="${p.data.animatedDirection}"`), p.data.sourceHandle && g.push(`sourceHandle="${p.data.sourceHandle}"`), p.data.targetHandle && g.push(`targetHandle="${p.data.targetHandle}"`), p.data.sourcePort && g.push(`sourcePort="${p.data.sourcePort.replace(/"/g, "&quot;")}"`), p.data.targetPort && g.push(`targetPort="${p.data.targetPort.replace(/"/g, "&quot;")}"`), p.data.sourceT != null && g.push(`sourceT="${p.data.sourceT}"`), p.data.targetT != null && g.push(`targetT="${p.data.targetT}"`), p.data.attachmentGap != null && p.data.attachmentGap !== 0 && g.push(`attachmentGap="${p.data.attachmentGap}"`), p.data.roughness != null && p.data.roughness !== 0 && g.push(`roughness="${p.data.roughness}"`), p.data.midpointOffset != null && p.data.midpointOffset !== 0.5 && g.push(`midpointOffset="${p.data.midpointOffset}"`), p.data.curveOffset && (p.data.curveOffset[0] !== 0 || p.data.curveOffset[1] !== 0) && g.push(`curveOffset="${p.data.curveOffset[0]},${p.data.curveOffset[1]}"`), p.locked && g.push('locked="true"'), p.groupId && g.push(`group="${p.groupId}"`), o.push(`<!--@edge ${g.join(" ")} -->`), o.push("");
  }
  const u = t.filter((p) => p.type === "sticky");
  for (const p of u) {
    const g = [
      `id="${p.id}"`,
      `x="${Math.round(p.x)}"`,
      `y="${Math.round(p.y)}"`,
      `w="${Math.round(p.w)}"`,
      `h="${p.h}"`,
      `z="${p.z}"`,
      `color="${p.data.color}"`
    ];
    p.data.fontSize && p.data.fontSize !== 16 && g.push(`fontSize="${p.data.fontSize}"`), p.data.opacity !== void 0 && p.data.opacity !== 1 && g.push(`opacity="${p.data.opacity}"`), p.rotation && g.push(`rotation="${p.rotation}"`), p.locked && g.push('locked="true"'), p.groupId && g.push(`group="${p.groupId}"`), o.push(`<!--@sticky ${g.join(" ")} -->`), o.push(p.data.text), o.push("");
  }
  const f = /* @__PURE__ */ new Set(["frame", "content", "draw", "shape", "image", "text", "youtube", "edge", "sticky"]), y = t.filter((p) => !f.has(p.type));
  for (const p of y)
    o.push(`<!--@custom ${JSON.stringify(p)} -->`), o.push("");
  return o.join(`
`);
}
const ja = "data:font/woff2;base64,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", xo = "Excalifont", hr = [
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
], Va = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), pd = /* @__PURE__ */ new Set(["Excalifont"]), fd = /* @__PURE__ */ new Set([...Va, ...pd]);
function yd(t) {
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
function wo(t) {
  return Va.has(t) ? t : `'${t}', sans-serif`;
}
let Ti = !1;
function gd(t = document) {
  if (Ti) return;
  Ti = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${ja}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = hr.filter((r) => !fd.has(r.key)).map((r) => "family=" + r.key.replace(/ /g, "+")).join("&"), n = t.createElement("link");
  n.rel = "stylesheet", n.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(n);
}
function io(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    e[n[1]] = n[2];
  return e;
}
function Cn(t) {
  if (t == null || t === "") return;
  const e = parseFloat(t);
  return Number.isFinite(e) ? e : void 0;
}
const md = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function bd(t) {
  var s, i, l, d;
  const e = [], o = {}, n = t.split(`
`);
  let r = 0;
  for (; r < n.length; ) {
    const c = n[r].trim();
    if (c.startsWith("<!--@meta")) {
      const a = io(c);
      if (a.background) {
        const u = md[a.background] ?? a.background;
        o.background = u;
      }
      if (a.originView) {
        const u = a.originView.split(",").map(Number);
        u.length === 3 && u.every((f) => !isNaN(f)) && (o.originView = { x: u[0], y: u[1], zoom: u[2] });
      }
      r++;
      continue;
    }
    if (c.startsWith("<!--@frame")) {
      const a = io(c);
      for (r++; r < n.length && n[r].trim() === ""; ) r++;
      e.push({
        id: a.id || Rt(10),
        type: "frame",
        x: parseFloat(a.x || "0"),
        y: parseFloat(a.y || "0"),
        w: parseFloat(a.w || "400"),
        h: a.h === "auto" || !a.h ? "auto" : parseFloat(a.h),
        z: parseInt(a.z || "0"),
        rotation: a.rotation ? parseFloat(a.rotation) : void 0,
        locked: a.locked === "true" || void 0,
        groupId: a.group || void 0,
        data: {
          label: ((s = a.label) == null ? void 0 : s.replace(/&quot;/g, '"')) || void 0,
          backgroundColor: a.backgroundColor || void 0,
          borderColor: a.borderColor || void 0,
          borderWidth: a.borderWidth ? parseFloat(a.borderWidth) : void 0,
          borderStyle: a.borderStyle || void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0,
          slideOrder: a.slideOrder ? parseInt(a.slideOrder, 10) : void 0,
          transition: a.transition || void 0,
          transitionDuration: a.transitionDuration ? parseInt(a.transitionDuration, 10) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@block")) {
      const a = io(c);
      r++;
      const u = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        u.push(n[r]), r++;
      for (; u.length > 0 && u[u.length - 1].trim() === ""; )
        u.pop();
      const f = u.join(`
`), y = f.trim().length > 0 ? await Vs(f) : [];
      e.push({
        id: a.id || Rt(10),
        type: "content",
        x: parseFloat(a.x || "0"),
        y: parseFloat(a.y || "0"),
        w: parseFloat(a.w || "300"),
        h: a.h === "auto" || !a.h ? "auto" : parseFloat(a.h),
        z: parseInt(a.z || "1"),
        rotation: a.rotation ? parseFloat(a.rotation) : void 0,
        locked: a.locked === "true" || void 0,
        groupId: a.group || void 0,
        data: {
          blocks: y,
          markdown: f,
          borderColor: a.borderColor || void 0,
          borderWidth: a.borderWidth ? parseFloat(a.borderWidth) : void 0,
          borderStyle: a.borderStyle || void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@draw")) {
      const a = io(c);
      if (r++, a.tool === "shape")
        for (e.push({
          id: a.id || Rt(10),
          type: "shape",
          x: parseFloat(a.x || "0"),
          y: parseFloat(a.y || "0"),
          w: parseFloat(a.w || "100"),
          h: a.h === "auto" || !a.h ? "auto" : parseFloat(a.h),
          z: parseInt(a.z || "0"),
          rotation: a.rotation ? parseFloat(a.rotation) : void 0,
          locked: a.locked === "true" || void 0,
          groupId: a.group || void 0,
          data: {
            shape: a.shape || "rect",
            stroke: a.color || "#1e1e2e",
            fill: a.fill || void 0,
            fillStyle: a.fillStyle || void 0,
            strokeWidth: parseFloat(a.stroke || "2"),
            strokeStyle: a.strokeStyle || void 0,
            edgeStyle: a.edgeStyle || void 0,
            roughness: parseFloat(a.roughness || "1"),
            opacity: a.opacity ? parseFloat(a.opacity) : void 0,
            startPoint: a.startPt ? a.startPt.split(",").map(Number) : void 0,
            endPoint: a.endPt ? a.endPt.split(",").map(Number) : void 0,
            label: ((i = a.label) == null ? void 0 : i.replace(/&quot;/g, '"')) || void 0,
            labelFontSize: a.labelFontSize ? parseFloat(a.labelFontSize) : void 0,
            labelFontFamily: a.labelFontFamily || void 0,
            labelAlign: a.labelAlign || void 0
          }
        }); r < n.length && n[r].trim() === ""; ) r++;
      else {
        let u = "";
        r < n.length && !n[r].trim().startsWith("<!--@") && (u = n[r].trim(), r++);
        const f = u ? u.split(" ").filter(Boolean).map((b) => {
          const w = b.split(",").map(Number);
          return [
            w[0] || 0,
            w[1] || 0,
            w[2] || 0.5
          ];
        }) : [];
        let y = 1 / 0, p = 1 / 0, g = -1 / 0, m = -1 / 0;
        for (const [b, w] of f)
          b < y && (y = b), w < p && (p = w), b > g && (g = b), w > m && (m = w);
        isFinite(y) || (y = parseFloat(a.x || "0"), p = parseFloat(a.y || "0"), g = y, m = p);
        const x = f.map(
          ([b, w, M]) => [b - y, w - p, M]
        );
        for (e.push({
          id: a.id || Rt(10),
          type: "draw",
          x: y,
          y: p,
          w: g - y,
          h: m - p,
          z: parseInt(a.z || "0"),
          rotation: a.rotation ? parseFloat(a.rotation) : void 0,
          locked: a.locked === "true" || void 0,
          groupId: a.group || void 0,
          data: {
            tool: a.tool || "pen",
            points: x,
            color: a.color || "#1e1e2e",
            strokeWidth: parseFloat(a.width || "2"),
            opacity: a.opacity ? parseFloat(a.opacity) : void 0,
            fill: a.fill || void 0,
            fillStyle: a.fillStyle || void 0
          }
        }); r < n.length && n[r].trim() === ""; ) r++;
      }
      continue;
    }
    if (c.startsWith("<!--@image")) {
      const a = io(c);
      r++, e.push({
        id: a.id || Rt(10),
        type: "image",
        x: parseFloat(a.x || "0"),
        y: parseFloat(a.y || "0"),
        w: parseFloat(a.w || "200"),
        h: parseFloat(a.h || "150"),
        z: parseInt(a.z || "0"),
        rotation: a.rotation ? parseFloat(a.rotation) : void 0,
        locked: a.locked === "true" || void 0,
        groupId: a.group || void 0,
        data: {
          src: a.src || "",
          alt: a.alt,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0,
          borderColor: a.borderColor || void 0,
          borderWidth: a.borderWidth ? parseFloat(a.borderWidth) : void 0,
          borderStyle: a.borderStyle || void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@edge")) {
      const a = io(c);
      for (r++, e.push({
        id: a.id || Rt(10),
        type: "edge",
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        z: 0,
        locked: a.locked === "true" || void 0,
        groupId: a.group || void 0,
        data: {
          fromId: a.from || "",
          toId: a.to || "",
          label: a.label,
          style: a.style || "solid",
          color: a.color || "#666",
          strokeWidth: a.strokeWidth ? parseFloat(a.strokeWidth) : 1,
          arrowHead: a.arrowHead || void 0,
          arrowTail: a.arrowTail || void 0,
          arrowHeadSize: a.arrowHeadSize ? parseFloat(a.arrowHeadSize) : void 0,
          arrowTailSize: a.arrowTailSize ? parseFloat(a.arrowTailSize) : void 0,
          edgeType: a.edgeType || void 0,
          animated: a.animated === "true" || void 0,
          animatedDirection: a.animatedDirection || void 0,
          sourceHandle: a.sourceHandle || void 0,
          targetHandle: a.targetHandle || void 0,
          sourcePort: ((l = a.sourcePort) == null ? void 0 : l.replace(/&quot;/g, '"')) || void 0,
          targetPort: ((d = a.targetPort) == null ? void 0 : d.replace(/&quot;/g, '"')) || void 0,
          sourceT: Cn(a.sourceT),
          targetT: Cn(a.targetT),
          attachmentGap: Cn(a.attachmentGap),
          roughness: Cn(a.roughness),
          midpointOffset: Cn(a.midpointOffset),
          curveOffset: a.curveOffset ? a.curveOffset.split(",").map(Number) : void 0
        }
      }); r < n.length && n[r].trim() === ""; ) r++;
      continue;
    }
    if (c.startsWith("<!--@text")) {
      const a = io(c);
      r++;
      const u = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        u.push(n[r]), r++;
      for (; u.length > 0 && u[u.length - 1].trim() === ""; )
        u.pop();
      e.push({
        id: a.id || Rt(10),
        type: "text",
        x: parseFloat(a.x || "0"),
        y: parseFloat(a.y || "0"),
        w: parseFloat(a.w || "200"),
        h: "auto",
        z: parseInt(a.z || "0"),
        rotation: a.rotation ? parseFloat(a.rotation) : void 0,
        locked: a.locked === "true" || void 0,
        groupId: a.group || void 0,
        data: {
          text: u.join(`
`),
          fontSize: parseFloat(a.fontSize || "20"),
          fontFamily: a.fontFamily || xo,
          color: a.color || "#1e1e2e",
          align: a.align || "left",
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@sticky")) {
      const a = io(c);
      r++;
      const u = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        u.push(n[r]), r++;
      for (; u.length > 0 && u[u.length - 1].trim() === ""; )
        u.pop();
      e.push({
        id: a.id || Rt(10),
        type: "sticky",
        x: parseFloat(a.x || "0"),
        y: parseFloat(a.y || "0"),
        w: parseFloat(a.w || "200"),
        h: parseFloat(a.h || "150"),
        z: parseInt(a.z || "1"),
        rotation: a.rotation ? parseFloat(a.rotation) : void 0,
        locked: a.locked === "true" || void 0,
        groupId: a.group || void 0,
        data: {
          text: u.join(`
`),
          color: a.color || "#FEF3C7",
          fontSize: a.fontSize ? parseFloat(a.fontSize) : void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@custom")) {
      const a = c.indexOf("{"), u = c.lastIndexOf("}");
      if (a >= 0 && u > a)
        try {
          const f = JSON.parse(c.slice(a, u + 1));
          f.id && f.type && e.push(f);
        } catch {
        }
      r++;
      continue;
    }
    r++;
  }
  return { nodes: e, meta: o };
}
const xd = 180;
function _n(t, e) {
  t.push(e), t.length > xd && t.shift();
}
function ao(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((r, s) => r - s), n = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[n];
}
class wd {
  constructor() {
    kt(this, "enabled", !1);
    kt(this, "listeners", /* @__PURE__ */ new Set());
    kt(this, "lastTick", 0);
    kt(this, "lastRatesTs", 0);
    kt(this, "frameMs", []);
    kt(this, "cullingMs", []);
    kt(this, "hitTestMs", []);
    kt(this, "edgeHitMs", []);
    kt(this, "pendingCullingMs", 0);
    kt(this, "pendingHitTestMs", 0);
    kt(this, "pendingEdgeHitMs", 0);
    kt(this, "pendingHitTestCalls", 0);
    kt(this, "pendingEdgeHitCalls", 0);
    kt(this, "hitTestCallsPerSec", 0);
    kt(this, "edgeHitCallsPerSec", 0);
    kt(this, "visibleNodes", 0);
    kt(this, "totalNodes", 0);
    kt(this, "visibleEdges", 0);
    kt(this, "totalEdges", 0);
    kt(this, "virtualizationActive", !1);
    kt(this, "seedVisibleNodes", 0);
    kt(this, "nodesAddedByAdjacency", 0);
    kt(this, "nodesAddedByEdgeEndpoints", 0);
    kt(this, "edgesAddedByAdjacency", 0);
    kt(this, "edgesAddedByCrossing", 0);
    kt(this, "lastPublishedAt", 0);
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
      const n = e - this.lastTick;
      _n(this.frameMs, n);
    }
    this.lastTick = e, _n(this.cullingMs, this.pendingCullingMs), _n(this.hitTestMs, this.pendingHitTestMs), _n(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
    const o = e - this.lastRatesTs;
    if (o >= 250) {
      const n = 1e3 / o;
      this.hitTestCallsPerSec = this.pendingHitTestCalls * n, this.edgeHitCallsPerSec = this.pendingEdgeHitCalls * n, this.pendingHitTestCalls = 0, this.pendingEdgeHitCalls = 0, this.lastRatesTs = e;
    }
    e - this.lastPublishedAt >= 150 && (this.lastPublishedAt = e, this.emit());
  }
  getSnapshot() {
    const e = this.frameMs.length ? 1e3 / (this.frameMs.reduce((o, n) => o + n, 0) / this.frameMs.length) : 0;
    return {
      enabled: this.enabled,
      fps: e,
      frameMsP50: ao(this.frameMs, 0.5),
      frameMsP95: ao(this.frameMs, 0.95),
      cullingMsP50: ao(this.cullingMs, 0.5),
      cullingMsP95: ao(this.cullingMs, 0.95),
      hitTestMsP50: ao(this.hitTestMs, 0.5),
      hitTestMsP95: ao(this.hitTestMs, 0.95),
      edgeHitMsP50: ao(this.edgeHitMs, 0.5),
      edgeHitMsP95: ao(this.edgeHitMs, 0.95),
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
const we = new wd();
function qe(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const Ka = 7, Ks = 52, kd = 8;
function vd(t, e, o, n) {
  const r = qe(t, n);
  if (!t.rotation) return { x: e, y: o };
  const s = t.x + t.w / 2, i = t.y + r / 2, l = t.rotation * Math.PI / 180, d = Math.cos(l), c = Math.sin(l), a = e - s, u = o - i;
  return { x: s + a * d - u * c, y: i + a * c + u * d };
}
function qa(t, e, o, n, r, s = "bbox") {
  const i = e.find((y) => y.id === o);
  if (!i) return null;
  const l = qe(t, r), d = Ka / n, c = e.filter((y) => y.direction === i.direction), a = c.indexOf(i);
  if (a < 0) return null;
  const u = t.y + l / (c.length + 1) * (a + 1);
  let f;
  if (s === "inscribed-circle") {
    const y = Math.min(t.w, l) / 2, p = t.x + t.w / 2;
    f = i.direction === "input" ? p - y - d : p + y + d;
  } else
    f = i.direction === "input" ? t.x - d : t.x + t.w + d;
  return { px: f, py: u, direction: i.direction };
}
function Sd(t, e, o, n, r = "bbox") {
  const s = qe(t, n);
  if (r === "bbox")
    return e === "input" ? { x: t.x, y: o.y } : { x: t.x + t.w, y: o.y };
  const i = Math.min(t.w, s) / 2, l = t.x + t.w / 2, d = t.y + s / 2;
  let c = o.x - l, a = o.y - d, u = Math.hypot(c, a);
  return u < 1e-6 && (c = e === "input" ? -1 : 1, a = 0, u = 1), { x: l + c / u * i, y: d + a / u * i };
}
function ze(t, e, o, n, r, s = "bbox") {
  const i = qa(
    t,
    e,
    o,
    n,
    r,
    s
  );
  return i ? vd(t, i.px, i.py, r) : null;
}
function zi(t, e, o, n, r, s, i, l) {
  const d = i - r, c = l - s;
  if (d === 0 && c === 0) return { x: r, y: s, side: "right" };
  let a = 1 / 0, u = r, f = s, y = "right";
  if (d !== 0) {
    const p = (t + o - r) / d;
    if (p > 0 && p < a) {
      const g = s + p * c;
      g >= e && g <= e + n && (a = p, u = t + o, f = g, y = "right");
    }
  }
  if (d !== 0) {
    const p = (t - r) / d;
    if (p > 0 && p < a) {
      const g = s + p * c;
      g >= e && g <= e + n && (a = p, u = t, f = g, y = "left");
    }
  }
  if (c !== 0) {
    const p = (e + n - s) / c;
    if (p > 0 && p < a) {
      const g = r + p * d;
      g >= t && g <= t + o && (a = p, u = g, f = e + n, y = "bottom");
    }
  }
  if (c !== 0) {
    const p = (e - s) / c;
    if (p > 0 && p < a) {
      const g = r + p * d;
      g >= t && g <= t + o && (a = p, u = g, f = e, y = "top");
    }
  }
  return { x: u, y: f, side: y };
}
function Be(t, e, o, n, r) {
  const s = Math.cos(r), i = Math.sin(r), l = t - o, d = e - n;
  return [o + l * s - d * i, n + l * i + d * s];
}
function ws(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return zi(t.x, t.y, t.w, e, r, s, o, n);
  const i = -t.rotation * Math.PI / 180, [l, d] = Be(o, n, r, s, i), c = zi(t.x, t.y, t.w, e, r, s, l, d), [a, u] = Be(c.x, c.y, r, s, -i);
  return { x: a, y: u, side: c.side };
}
function Xo(t, e, o, n) {
  return Math.abs(t) / o >= Math.abs(e) / n ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function Md(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, d = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, a] = t.rotation ? Be(o, n, r, s, d) : [o, n], u = c - r, f = a - s;
  if (u === 0 && f === 0)
    return { x: r + i, y: s, side: "right" };
  const y = 1 / Math.sqrt((u / i) ** 2 + (f / l) ** 2);
  let p = r + u * y, g = s + f * y;
  const m = Xo(u, f, i, l);
  return t.rotation && ([p, g] = Be(p, g, r, s, -d)), { x: p, y: g, side: m };
}
function Cd(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, d = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, a] = t.rotation ? Be(o, n, r, s, d) : [o, n], u = c - r, f = a - s;
  if (u === 0 && f === 0)
    return { x: r + i, y: s, side: "right" };
  const y = 1 / (Math.abs(u) / i + Math.abs(f) / l);
  let p = r + u * y, g = s + f * y;
  const m = Xo(u, f, i, l);
  return t.rotation && ([p, g] = Be(p, g, r, s, -d)), { x: p, y: g, side: m };
}
function Id(t, e, o, n) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return ws(t, e, o, n);
  const s = t.x + t.w / 2, i = t.y + e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [d, c] = t.rotation ? Be(o, n, s, i, l) : [o, n], a = d - s, u = c - i, f = Math.hypot(a, u);
  if (f === 0)
    return ws(t, e, o, n);
  const y = a / f, p = u / f;
  let g = t.x + r[0][0], m = t.y + r[0][1], x = (g - s) * y + (m - i) * p;
  for (let C = 1; C < r.length; C++) {
    const T = t.x + r[C][0], E = t.y + r[C][1], z = (T - s) * y + (E - i) * p;
    z > x && (x = z, g = T, m = E);
  }
  const b = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let w = g + y * b, M = m + p * b;
  const v = Xo(a, u, t.w / 2, e / 2);
  return t.rotation && ([w, M] = Be(w, M, s, i, -l)), { x: w, y: M, side: v };
}
function Pi(t, e, o) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return fr(t, e, o);
  const r = t.x + t.w / 2, s = t.y + e / 2, i = Yo(o), l = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, d = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (m, x, b, w, M, v) => {
    const C = M - b, T = v - w, E = C * C + T * T;
    if (E === 0) return [b, w];
    const z = Math.max(0, Math.min(1, ((m - b) * C + (x - w) * T) / E));
    return [b + z * C, w + z * T];
  };
  let a = t.x + n[0][0], u = t.y + n[0][1], f = (a - l) ** 2 + (u - d) ** 2;
  if (n.length === 1)
    a = t.x + n[0][0], u = t.y + n[0][1];
  else
    for (let m = 0; m < n.length - 1; m++) {
      const x = t.x + n[m][0], b = t.y + n[m][1], w = t.x + n[m + 1][0], M = t.y + n[m + 1][1], [v, C] = c(l, d, x, b, w, M), T = (v - l) ** 2 + (C - d) ** 2;
      T < f && (f = T, a = v, u = C);
    }
  const y = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let p = a + i.dx * y, g = u + i.dy * y;
  if (t.rotation) {
    const m = t.rotation * Math.PI / 180;
    [p, g] = Be(p, g, r, s, m);
  }
  return { x: p, y: g };
}
function ks(t, e, o, n) {
  var r;
  if (t.type === "draw")
    return Id(t, e, o, n);
  if (t.type === "shape") {
    const s = (r = t.data) == null ? void 0 : r.shape;
    if (s === "ellipse") return Md(t, e, o, n);
    if (s === "diamond") return Cd(t, e, o, n);
  }
  return ws(t, e, o, n);
}
function vs(t, e, o, n) {
  const r = ks(t, e, o, n);
  return { x: r.x, y: r.y };
}
function fr(t, e, o) {
  const n = t.x + t.w / 2, r = t.y + e / 2;
  let s, i;
  switch (o) {
    case "top":
      s = n, i = t.y;
      break;
    case "bottom":
      s = n, i = t.y + e;
      break;
    case "left":
      s = t.x, i = r;
      break;
    case "right":
      s = t.x + t.w, i = r;
      break;
  }
  if (!t.rotation) return { x: s, y: i };
  const l = t.rotation * Math.PI / 180, [d, c] = Be(s, i, n, r, l);
  return { x: d, y: c };
}
function Yo(t) {
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
function Ai(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Pe(t, e, o = "bezier", n, r, s, i, l, d, c, a, u, f) {
  const y = qe(t, n), p = qe(e, n), g = t.x + t.w / 2, m = t.y + y / 2, x = e.x + e.w / 2, b = e.y + p / 2;
  let w, M, v, C;
  if (d) {
    w = d.x, M = d.y;
    const Y = w - g, nt = M - m, rt = Math.hypot(Y, nt);
    rt > 1e-6 && (C = { dx: Y / rt, dy: nt / rt }), v = Xo(Y, nt, t.w / 2, y / 2);
  } else if (a !== void 0) {
    const Y = Ms(t, y, a);
    w = Y.x, M = Y.y, v = Y.side;
    const nt = Math.hypot(w - g, M - m);
    nt > 0 && (C = { dx: (w - g) / nt, dy: (M - m) / nt });
  } else if (r) {
    const Y = t.type === "draw" ? Pi(t, y, r) : fr(t, y, r);
    w = Y.x, M = Y.y, v = r;
  } else {
    const Y = ks(t, y, x, b);
    if (w = Y.x, M = Y.y, v = Y.side, Ai(t)) {
      const nt = Math.hypot(x - g, b - m);
      nt > 0 && (C = { dx: (x - g) / nt, dy: (b - m) / nt });
    }
  }
  let T, E, z, j;
  if (c) {
    T = c.x, E = c.y;
    const Y = T - x, nt = E - b, rt = Math.hypot(Y, nt);
    rt > 1e-6 && (j = { dx: Y / rt, dy: nt / rt }), z = Xo(Y, nt, e.w / 2, p / 2);
  } else if (u !== void 0) {
    const Y = Ms(e, p, u);
    T = Y.x, E = Y.y, z = Y.side;
    const nt = Math.hypot(T - x, E - b);
    nt > 0 && (j = { dx: (T - x) / nt, dy: (E - b) / nt });
  } else if (s) {
    const Y = e.type === "draw" ? Pi(e, p, s) : fr(e, p, s);
    T = Y.x, E = Y.y, z = s;
  } else {
    const Y = ks(e, p, g, m);
    if (T = Y.x, E = Y.y, z = Y.side, Ai(e)) {
      const nt = Math.hypot(g - x, m - b);
      nt > 0 && (j = { dx: (g - x) / nt, dy: (m - b) / nt });
    }
  }
  if (f && f > 0) {
    const Y = Math.hypot(w - g, M - m);
    Y > 0 && (w += (w - g) / Y * f, M += (M - m) / Y * f);
    const nt = Math.hypot(T - x, E - b);
    nt > 0 && (T += (T - x) / nt * f, E += (E - b) / nt * f);
  }
  switch (o) {
    case "straight":
      return Td(w, M, T, E, v, z);
    case "bezier":
      return zd(w, M, T, E, v, z, l, C, j);
    case "smoothstep":
      return Pd(w, M, T, E, v, z, i);
    case "step":
      return Ad(w, M, T, E, v, z, i);
  }
}
function Td(t, e, o, n, r, s) {
  const i = Math.min(t, o), l = Math.min(e, n), d = Math.abs(o - t), c = Math.abs(n - e);
  return {
    path: `M${t},${e} L${o},${n}`,
    labelX: (t + o) / 2,
    labelY: (e + n) / 2,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: Math.atan2(n - e, o - t),
    tailAngle: Math.atan2(e - n, t - o),
    sourceSide: r,
    targetSide: s,
    bounds: { x: i, y: l, w: d, h: c }
  };
}
function zd(t, e, o, n, r, s, i, l, d) {
  const c = Math.hypot(o - t, n - e), a = Math.min(c * 0.5, Math.max(50, c * 0.25)), u = l ?? Yo(r), f = d ?? Yo(s), y = i ? i[0] * (4 / 3) : 0, p = i ? i[1] * (4 / 3) : 0, g = t + u.dx * a + y, m = e + u.dy * a + p, x = o + f.dx * a + y, b = n + f.dy * a + p, w = 0.125 * t + 0.375 * g + 0.375 * x + 0.125 * o, M = 0.125 * e + 0.375 * m + 0.375 * b + 0.125 * n, v = Math.atan2(n - b, o - x), C = Math.atan2(e - m, t - g), T = {
    x: w,
    y: M,
    axis: "xy",
    min: 0,
    max: 0
  }, E = Math.min(t, o, g, x), z = Math.min(e, n, m, b), j = Math.max(t, o, g, x), Y = Math.max(e, n, m, b);
  return {
    path: `M${t},${e} C${g},${m} ${x},${b} ${o},${n}`,
    labelX: w,
    labelY: M,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: v,
    tailAngle: C,
    sourceSide: r,
    targetSide: s,
    kinkHandle: T,
    bounds: { x: E, y: z, w: j - E, h: Y - z }
  };
}
function Pd(t, e, o, n, r, s, i) {
  const { points: c, kinkHandle: a } = qs(t, e, o, n, r, s, 20, i), u = Ed(c, 8), f = Math.floor(c.length / 2), y = (c[f - 1][0] + c[f][0]) / 2, p = (c[f - 1][1] + c[f][1]) / 2, g = c[c.length - 1], m = c[c.length - 2], x = Math.atan2(g[1] - m[1], g[0] - m[0]), b = c[0], w = c[1], M = Math.atan2(b[1] - w[1], b[0] - w[0]);
  let v = 1 / 0, C = 1 / 0, T = -1 / 0, E = -1 / 0;
  for (const [z, j] of c)
    z < v && (v = z), j < C && (C = j), z > T && (T = z), j > E && (E = j);
  return {
    path: u,
    labelX: y,
    labelY: p,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: x,
    tailAngle: M,
    sourceSide: r,
    targetSide: s,
    kinkHandle: a,
    bounds: { x: v, y: C, w: T - v, h: E - C }
  };
}
function Ad(t, e, o, n, r, s, i) {
  const { points: d, kinkHandle: c } = qs(t, e, o, n, r, s, 20, i), a = [`M${d[0][0]},${d[0][1]}`];
  for (let E = 1; E < d.length; E++)
    a.push(`L${d[E][0]},${d[E][1]}`);
  const u = Math.floor(d.length / 2), f = (d[u - 1][0] + d[u][0]) / 2, y = (d[u - 1][1] + d[u][1]) / 2, p = d[d.length - 1], g = d[d.length - 2], m = Math.atan2(p[1] - g[1], p[0] - g[0]), x = d[0], b = d[1], w = Math.atan2(x[1] - b[1], x[0] - b[0]);
  let M = 1 / 0, v = 1 / 0, C = -1 / 0, T = -1 / 0;
  for (const [E, z] of d)
    E < M && (M = E), z < v && (v = z), E > C && (C = E), z > T && (T = z);
  return {
    path: a.join(" "),
    labelX: f,
    labelY: y,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: m,
    tailAngle: w,
    sourceSide: r,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: M, y: v, w: C - M, h: T - v }
  };
}
function qs(t, e, o, n, r, s, i, l) {
  const d = Yo(r), c = Yo(s), a = t + d.dx * i, u = e + d.dy * i, f = o + c.dx * i, y = n + c.dy * i, p = r === "left" || r === "right", g = s === "left" || s === "right", m = [[t, e], [a, u]], x = l ?? 0.5;
  let b;
  if (p && g) {
    const w = a + (f - a) * x;
    m.push([w, u], [w, y]);
    const M = Math.min(a, f), v = Math.max(a, f);
    b = { x: w, y: (u + y) / 2, axis: "x", min: M, max: v };
  } else if (!p && !g) {
    const w = u + (y - u) * x;
    m.push([a, w], [f, w]);
    const M = Math.min(u, y), v = Math.max(u, y);
    b = { x: (a + f) / 2, y: w, axis: "y", min: M, max: v };
  } else p && !g ? m.push([f, u]) : m.push([a, y]);
  return m.push([f, y], [o, n]), { points: m, kinkHandle: b };
}
function Ed(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let r = 1; r < t.length - 1; r++) {
    const s = t[r - 1], i = t[r], l = t[r + 1], d = i[0] - s[0], c = i[1] - s[1], a = l[0] - i[0], u = l[1] - i[1], f = Math.hypot(d, c), y = Math.hypot(a, u);
    if (f === 0 || y === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const p = Math.min(e, f / 2, y / 2), g = i[0] - d / f * p, m = i[1] - c / f * p, x = i[0] + a / y * p, b = i[1] + u / y * p;
    o.push(`L${g},${m}`), o.push(`Q${i[0]},${i[1]} ${x},${b}`);
  }
  const n = t[t.length - 1];
  return o.push(`L${n[0]},${n[1]}`), o.join(" ");
}
function Ld(t, e, o, n, r, s, i, l, d) {
  const c = 1 - d, a = c * c, u = a * c, f = d * d, y = f * d;
  return [
    u * t + 3 * a * d * o + 3 * c * f * r + y * i,
    u * e + 3 * a * d * n + 3 * c * f * s + y * l
  ];
}
function Rd(t, e, o, n, r, s, i, l, d, c, a = 40) {
  let u = 1 / 0, f = o, y = n;
  for (let p = 1; p <= a; p++) {
    const g = p / a, [m, x] = Ld(o, n, r, s, i, l, d, c, g), b = Us(t, e, f, y, m, x);
    b < u && (u = b), f = m, y = x;
  }
  return u;
}
function Dd(t, e, o) {
  let n = 1 / 0;
  for (let r = 1; r < o.length; r++) {
    const s = Us(t, e, o[r - 1][0], o[r - 1][1], o[r][0], o[r][1]);
    s < n && (n = s);
  }
  return n;
}
function Ua(t, e, o, n, r, s, i, l) {
  const d = r.data.edgeType || "bezier", c = Pe(
    o,
    n,
    d,
    s,
    r.data.sourceHandle,
    r.data.targetHandle,
    r.data.midpointOffset,
    r.data.curveOffset,
    i,
    l,
    r.data.sourceT,
    r.data.targetT,
    r.data.attachmentGap
  ), { x1: a, y1: u, x2: f, y2: y } = c;
  if (d === "straight")
    return Us(t, e, a, u, f, y);
  if (d === "bezier") {
    const m = Math.hypot(f - a, y - u), x = Math.min(m * 0.5, Math.max(50, m * 0.25)), b = Yo(c.sourceSide), w = Yo(c.targetSide), M = r.data.curveOffset ? r.data.curveOffset[0] * (4 / 3) : 0, v = r.data.curveOffset ? r.data.curveOffset[1] * (4 / 3) : 0, C = a + b.dx * x + M, T = u + b.dy * x + v, E = f + w.dx * x + M, z = y + w.dy * x + v;
    return Rd(t, e, a, u, C, T, E, z, f, y);
  }
  const p = 20, { points: g } = qs(a, u, f, y, c.sourceSide, c.targetSide, p, r.data.midpointOffset);
  return Dd(t, e, g);
}
function Ei(t, e, o) {
  const n = qe(t, o), r = qe(e, o), s = t.x + t.w / 2, i = t.y + n / 2, l = e.x + e.w / 2, d = e.y + r / 2, c = vs(t, n, l, d), a = vs(e, r, s, i);
  return { x1: c.x, y1: c.y, x2: a.x, y2: a.y };
}
function Wd(t, e, o, n) {
  const r = qe(t, n);
  return vs(t, r, e, o);
}
function Us(t, e, o, n, r, s) {
  const i = r - o, l = s - n, d = i * i + l * l;
  if (d === 0) return Math.hypot(t - o, e - n);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - n) * l) / d)), a = o + c * i, u = n + c * l;
  return Math.hypot(t - a, e - u);
}
function yo(t, e, o, n) {
  const r = Math.cos(o), s = Math.sin(o), i = -s, l = r, d = n / 2, c = t + r * d, a = e + s * d, u = t - r * d, f = e - s * d, y = n * 0.4;
  return `M${u + i * y},${f + l * y} L${c},${a} L${u - i * y},${f - l * y}`;
}
function yr(t, e, o, n) {
  const r = Math.cos(o), s = Math.sin(o), i = -s, l = r, d = n / 2, c = t + r * d, a = e + s * d, u = t - r * d, f = e - s * d, y = n * 0.4;
  return `M${c},${a} L${u + i * y},${f + l * y} L${u - i * y},${f - l * y} Z`;
}
function Ss(t, e) {
  const o = qe(t, e);
  return ["top", "right", "bottom", "left"].map((r) => {
    const s = fr(t, o, r);
    return { side: r, x: s.x, y: s.y };
  });
}
function tr(t, e, o, n) {
  const r = Ss(t, n);
  let s = r[0], i = 1 / 0;
  for (const l of r) {
    const d = Math.hypot(l.x - e, l.y - o);
    d < i && (i = d, s = l);
  }
  return s.side;
}
function Za(t, e) {
  const o = Math.max(0.01, e), n = t.data.strokeWidth ?? 2;
  return Math.max(n / 2 + 8 / o, 10 / o);
}
function Li(t, e, o, n, r, s) {
  const i = we.isEnabled(), l = i ? performance.now() : 0;
  let d = null;
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const a = c, u = t.get(a.data.fromId), f = t.get(a.data.toId);
    if (!u || !f) continue;
    const y = s == null ? void 0 : s(a, u, f), p = Ua(e, o, u, f, a, r, y == null ? void 0 : y.sourcePortPos, y == null ? void 0 : y.targetPortPos), g = Za(a, n);
    p < g && (!d || p < d.distance) && (d = { node: c, distance: p });
  }
  return i && we.recordEdgeHit(performance.now() - l), d;
}
function Bd(t, e, o, n, r, s) {
  const i = we.isEnabled(), l = i ? performance.now() : 0, d = [];
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const a = c, u = t.get(a.data.fromId), f = t.get(a.data.toId);
    if (!u || !f) continue;
    const y = s == null ? void 0 : s(a, u, f);
    Ua(e, o, u, f, a, r, y == null ? void 0 : y.sourcePortPos, y == null ? void 0 : y.targetPortPos) < Za(a, n) && d.push(c);
  }
  return i && we.recordEdgeHit(performance.now() - l), d;
}
function Ms(t, e, o) {
  var c;
  o = (o % 1 + 1) % 1;
  const n = t.x + t.w / 2, r = t.y + e / 2;
  if (t.type === "draw") {
    const a = t.data.points;
    if (a && a.length >= 2) {
      const u = [0];
      for (let y = 1; y < a.length; y++)
        u.push(u[y - 1] + Math.hypot(a[y][0] - a[y - 1][0], a[y][1] - a[y - 1][1]));
      const f = u[u.length - 1];
      if (f > 0) {
        const y = o * f;
        let p = 0;
        for (let E = 1; E < u.length; E++) {
          if (u[E] >= y) {
            p = E - 1;
            break;
          }
          E === u.length - 1 && (p = E - 1);
        }
        const g = u[p + 1] - u[p], m = g > 0 ? (y - u[p]) / g : 0;
        let x = t.x + a[p][0] + (a[p + 1][0] - a[p][0]) * m, b = t.y + a[p][1] + (a[p + 1][1] - a[p][1]) * m;
        const w = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2), M = x - n, v = b - r, C = Math.hypot(M, v);
        C > 0 && (x += M / C * w, b += v / C * w);
        const T = Xo(x - n, b - r, t.w / 2, e / 2);
        if (t.rotation) {
          const E = t.rotation * Math.PI / 180, [z, j] = Be(x, b, n, r, E);
          return { x: z, y: j, side: T };
        }
        return { x, y: b, side: T };
      }
    }
  }
  const s = t.type === "shape" ? (c = t.data) == null ? void 0 : c.shape : void 0;
  let i, l, d;
  if (s === "ellipse") {
    const a = o * 2 * Math.PI - Math.PI / 2, u = t.w / 2, f = e / 2;
    i = n + u * Math.cos(a), l = r + f * Math.sin(a), d = Xo(i - n, l - r, u, f);
  } else if (s === "diamond") {
    const a = n, u = t.y, f = t.x + t.w, y = r, p = n, g = t.y + e, m = t.x, x = r;
    if (o < 0.25) {
      const b = o / 0.25;
      i = a + (f - a) * b, l = u + (y - u) * b, d = o < 0.125 ? "top" : "right";
    } else if (o < 0.5) {
      const b = (o - 0.25) / 0.25;
      i = f + (p - f) * b, l = y + (g - y) * b, d = o < 0.375 ? "right" : "bottom";
    } else if (o < 0.75) {
      const b = (o - 0.5) / 0.25;
      i = p + (m - p) * b, l = g + (x - g) * b, d = o < 0.625 ? "bottom" : "left";
    } else {
      const b = (o - 0.75) / 0.25;
      i = m + (a - m) * b, l = x + (u - x) * b, d = o < 0.875 ? "left" : "top";
    }
  } else {
    const a = t.w, u = 2 * (a + e);
    let f = o * u;
    const y = a / 2;
    f < y ? (i = n + f, l = t.y, d = "top") : f < y + e ? (f -= y, i = t.x + a, l = t.y + f, d = "right") : f < y + e + a ? (f -= y + e, i = t.x + a - f, l = t.y + e, d = "bottom") : f < y + e + a + e ? (f -= y + e + a, i = t.x, l = t.y + e - f, d = "left") : (f -= y + e + a + e, i = t.x + f, l = t.y, d = "top");
  }
  if (t.rotation) {
    const a = t.rotation * Math.PI / 180, [u, f] = Be(i, l, n, r, a);
    return { x: u, y: f, side: d };
  }
  return { x: i, y: l, side: d };
}
function Nd(t, e, o, n) {
  var x;
  const r = t.x + t.w / 2, s = t.y + e / 2;
  let i = o, l = n;
  if (t.rotation) {
    const b = -t.rotation * Math.PI / 180;
    [i, l] = Be(o, n, r, s, b);
  }
  if (t.type === "draw") {
    const b = t.data.points;
    if (b && b.length >= 2) {
      const w = [0];
      for (let v = 1; v < b.length; v++)
        w.push(w[v - 1] + Math.hypot(b[v][0] - b[v - 1][0], b[v][1] - b[v - 1][1]));
      const M = w[w.length - 1];
      if (M > 0) {
        const v = i - t.x, C = l - t.y;
        let T = 1 / 0, E = 0;
        for (let z = 0; z < b.length - 1; z++) {
          const j = b[z][0], Y = b[z][1], nt = b[z + 1][0], rt = b[z + 1][1], pt = nt - j, xt = rt - Y, mt = pt * pt + xt * xt, W = mt === 0 ? 0 : Math.max(0, Math.min(1, ((v - j) * pt + (C - Y) * xt) / mt)), B = j + W * pt, G = Y + W * xt, q = Math.hypot(v - B, C - G);
          q < T && (T = q, E = w[z] + W * (w[z + 1] - w[z]));
        }
        return E / M;
      }
    }
  }
  const d = t.type === "shape" ? (x = t.data) == null ? void 0 : x.shape : void 0;
  if (d === "ellipse")
    return ((Math.atan2(l - s, i - r) + Math.PI / 2) / (2 * Math.PI) % 1 + 1) % 1;
  if (d === "diamond") {
    const b = r, w = t.y, M = t.x + t.w, v = s, C = r, T = t.y + e, E = t.x, z = s, j = [
      { ax: b, ay: w, bx: M, by: v, tStart: 0 },
      { ax: M, ay: v, bx: C, by: T, tStart: 0.25 },
      { ax: C, ay: T, bx: E, by: z, tStart: 0.5 },
      { ax: E, ay: z, bx: b, by: w, tStart: 0.75 }
    ];
    let Y = 0, nt = 1 / 0;
    for (const rt of j) {
      const pt = rt.bx - rt.ax, xt = rt.by - rt.ay, mt = pt * pt + xt * xt, W = mt === 0 ? 0 : Math.max(0, Math.min(1, ((i - rt.ax) * pt + (l - rt.ay) * xt) / mt)), B = rt.ax + W * pt, G = rt.ay + W * xt, q = Math.hypot(i - B, l - G);
      q < nt && (nt = q, Y = rt.tStart + W * 0.25);
    }
    return (Y % 1 + 1) % 1;
  }
  const c = t.w, a = t.x, u = t.y, f = 2 * (c + e), y = c / 2, p = [
    // Top edge right half: top-center → top-right
    { ax: r, ay: u, bx: a + c, by: u, dStart: 0, len: y },
    // Right edge: top-right → bottom-right
    { ax: a + c, ay: u, bx: a + c, by: u + e, dStart: y, len: e },
    // Bottom edge: bottom-right → bottom-left
    { ax: a + c, ay: u + e, bx: a, by: u + e, dStart: y + e, len: c },
    // Left edge: bottom-left → top-left
    { ax: a, ay: u + e, bx: a, by: u, dStart: y + e + c, len: e },
    // Top edge left half: top-left → top-center
    { ax: a, ay: u, bx: r, by: u, dStart: y + e + c + e, len: y }
  ];
  let g = 0, m = 1 / 0;
  for (const b of p) {
    const w = b.bx - b.ax, M = b.by - b.ay, v = w * w + M * M, C = v === 0 ? 0 : Math.max(0, Math.min(1, ((i - b.ax) * w + (l - b.ay) * M) / v)), T = b.ax + C * w, E = b.ay + C * M, z = Math.hypot(i - T, l - E);
    z < m && (m = z, g = (b.dStart + C * b.len) / f);
  }
  return (g % 1 + 1) % 1;
}
function We(t, e, o, n) {
  const r = qe(t, n), s = Nd(t, r, e, o), i = Ms(t, r, s);
  return { t: s, x: i.x, y: i.y };
}
function Cs(t) {
  const e = t.data;
  return (e == null ? void 0 : e.showEdgeComputeOverlay) === !0;
}
function Do(t, e) {
  return `${t}:${e}`;
}
function ko(t, e) {
  return t.h === "auto" ? (e == null ? void 0 : e[t.id]) ?? 100 : t.h;
}
function Fd(t, e) {
  const o = new Set(t), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const l of t)
    n.set(l, 0), r.set(l, []);
  for (const { from: l, to: d } of e)
    !o.has(l) || !o.has(d) || (r.get(l).push(d), n.set(d, (n.get(d) ?? 0) + 1));
  const s = t.filter((l) => (n.get(l) ?? 0) === 0);
  let i = 0;
  for (; s.length; ) {
    const l = s.pop();
    i++;
    for (const d of r.get(l) ?? []) {
      const c = (n.get(d) ?? 0) - 1;
      n.set(d, c), c === 0 && s.push(d);
    }
  }
  return i === t.length;
}
function Hd(t, e) {
  const o = new Set(t), n = /* @__PURE__ */ new Map();
  for (const i of t) n.set(i, /* @__PURE__ */ new Set());
  for (const { from: i, to: l } of e)
    o.has(i) && o.has(l) && (n.get(i).add(l), n.get(l).add(i));
  const r = /* @__PURE__ */ new Set(), s = [];
  for (const i of [...t].sort()) {
    if (r.has(i)) continue;
    const l = [i];
    r.add(i);
    const d = [];
    for (; l.length; ) {
      const c = l.pop();
      d.push(c);
      for (const a of n.get(c) ?? [])
        r.has(a) || (r.add(a), l.push(a));
    }
    s.push(d);
  }
  return s;
}
function Od(t, e) {
  const o = [];
  for (const n of t) {
    if (n.type !== "edge") continue;
    const r = n, { fromId: s, toId: i } = r.data;
    e.has(s) && e.has(i) && o.push(r);
  }
  return o;
}
function Xd(t) {
  return t.map((e) => ({
    from: e.data.fromId,
    to: e.data.toId
  }));
}
function Yd(t, e, o, n) {
  const r = [...t].sort(
    (f, y) => f.y === y.y ? f.x - y.x : f.y - y.y
  ), s = r.length;
  if (s === 0) return /* @__PURE__ */ new Map();
  const i = Math.max(1, Math.ceil(Math.sqrt(s))), l = Math.max(1, ...r.map((f) => f.w)), d = Math.max(
    1,
    ...r.map((f) => ko(f, e))
  ), c = l + o, a = d + n, u = /* @__PURE__ */ new Map();
  for (let f = 0; f < s; f++) {
    const y = Math.floor(f / i), p = f % i;
    u.set(r[f].id, { x: p * c, y: y * a });
  }
  return u;
}
function Gd(t, e) {
  const o = /* @__PURE__ */ new Map();
  for (const r of t) o.set(r, 0);
  const n = Math.max(t.length, e.length) + 2;
  for (let r = 0; r < n; r++)
    for (const { from: s, to: i } of e)
      o.set(i, Math.max(o.get(i), o.get(s) + 1));
  return o;
}
function Ri(t, e, o, n) {
  if (e.length === 0) return [...t];
  const r = new Map(e.map((i, l) => [i, l])), s = t.map((i) => {
    let l = 0, d = 0;
    for (const { from: c, to: a } of o)
      n === "backward" ? a === i && r.has(c) && (l += r.get(c), d++) : c === i && r.has(a) && (l += r.get(a), d++);
    return { id: i, score: d > 0 ? l / d : 1e9 };
  });
  return s.sort((i, l) => i.score - l.score || i.id.localeCompare(l.id)), s.map((i) => i.id);
}
function jd(t, e, o, n, r) {
  const s = t.map((p) => p.id), i = new Set(s), l = e.filter(
    (p) => i.has(p.from) && i.has(p.to)
  ), d = Gd(s, l), c = Math.max(0, ...s.map((p) => d.get(p) ?? 0)), a = [];
  for (let p = 0; p <= c; p++) a[p] = [];
  for (const p of s) {
    const g = d.get(p) ?? 0;
    a[g].push(p);
  }
  const u = new Map(t.map((p) => [p.id, p]));
  for (let p = 0; p <= c; p++)
    a[p].sort((g, m) => {
      const x = u.get(g), b = u.get(m);
      return x.y - b.y || x.x - b.x;
    });
  for (let p = 0; p < 2; p++) {
    for (let g = 1; g <= c; g++)
      a[g] = Ri(
        a[g],
        a[g - 1],
        l,
        "backward"
      );
    for (let g = c - 1; g >= 0; g--)
      a[g] = Ri(
        a[g],
        a[g + 1],
        l,
        "forward"
      );
  }
  const f = /* @__PURE__ */ new Map();
  let y = 0;
  for (let p = 0; p <= c; p++) {
    const g = a[p], m = Math.max(1, ...g.map((b) => u.get(b).w));
    let x = 0;
    for (const b of g) {
      const w = u.get(b);
      f.set(b, { x: y, y: x }), x += ko(w, o) + r;
    }
    y += m + n;
  }
  return f;
}
function Is(t, e, o) {
  let n = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
  const l = new Map(e.map((d) => [d.id, d]));
  for (const [d, c] of t) {
    const a = l.get(d);
    if (!a) continue;
    const u = ko(a, o);
    n = Math.min(n, c.x), r = Math.min(r, c.y), s = Math.max(s, c.x + a.w), i = Math.max(i, c.y + u);
  }
  return Number.isFinite(n) ? { minX: n, minY: r, maxX: s, maxY: i } : { minX: 0, minY: 0, maxX: 0, maxY: 0 };
}
function Vd(t, e, o) {
  const n = Is(t, e, o), r = -n.minX, s = -n.minY, i = /* @__PURE__ */ new Map();
  for (const [l, d] of t)
    i.set(l, { x: d.x + r, y: d.y + s });
  return i;
}
function qr(t, e) {
  const o = t.x + t.w / 2, n = t.y + t.h / 2, r = e.x + e.w / 2, s = e.y + e.h / 2, i = Math.min(t.x + t.w, e.x + e.w) - Math.max(t.x, e.x), l = Math.min(t.y + t.h, e.y + e.h) - Math.max(t.y, e.y);
  return i <= 0 || l <= 0 ? null : i < l ? o < r ? { dx: -i, dy: 0 } : { dx: i, dy: 0 } : n < s ? { dx: 0, dy: -l } : { dx: 0, dy: l };
}
function Ur(t, e, o, n, r) {
  var c;
  const s = ko(t, o);
  let i = 0, l = 0;
  const d = n == null ? void 0 : n.get(t.type);
  if ((c = d == null ? void 0 : d.ports) != null && c.length) {
    const a = (Ka + 12) / Math.max(0.35, r);
    d.ports.some((u) => u.direction === "input") && (i = a), d.ports.some((u) => u.direction === "output") && (l = a);
  }
  return {
    x: e.x - i,
    y: e.y,
    w: t.w + i + l,
    h: s
  };
}
function Qa(t, e, o, n) {
  const r = 14 + 10 / Math.max(0.35, n);
  for (let s = 0; s < 40; s++)
    for (let i = 0; i < e.length; i++)
      for (let l = i + 1; l < e.length; l++) {
        const d = e[i], c = e[l], a = t.get(d.id), u = t.get(c.id), f = ko(d, o), y = ko(c, o), p = a.x + d.w / 2, g = a.y + f / 2, m = u.x + c.w / 2, x = u.y + y / 2;
        let b = p - m, w = g - x, M = Math.hypot(b, w);
        if (M >= r) continue;
        if (M < 1e-4) {
          const C = (i * 2.17 + l * 3.91 + s * 0.37) % (Math.PI * 2);
          b = Math.cos(C), w = Math.sin(C), M = 0;
        } else
          b /= M, w /= M;
        const v = (r - M) * 0.62 + 6 / Math.max(0.35, n);
        a.x += b * v, a.y += w * v, u.x -= b * v, u.y -= w * v;
      }
}
function Kd(t, e, o, n, r) {
  const s = ko(t, o), i = ko(e, o), l = t.x + t.w / 2, d = t.y + s / 2, c = e.x + e.w / 2, a = e.y + i / 2;
  let u = c - l, f = a - d, y = Math.hypot(u, f);
  y < 1e-4 && (u = 1, f = 0, y = 1);
  const p = -f / y, g = u / y, m = Math.floor(n / 2) + 1, b = (n % 2 === 0 ? 1 : -1) * (18 / Math.max(0.35, r)) * Math.min(3, m) * (1 + m * 0.12);
  return { dx: p * b, dy: g * b };
}
function Zr(t, e, o, n, r = 0) {
  const s = 13 / n, i = 7 / n, l = 5 / n, d = 6 / n, c = Math.max(...t.map((f) => f.text.length), 1), a = Math.min(c * d + i * 2, 280 / n) + r, u = t.length * s + l * 2;
  return {
    x: e - a / 2,
    y: o - u / 2,
    w: a,
    h: u
  };
}
function qd(t, e, o, n, r, s) {
  var u, f;
  const i = o.data, l = Pe(
    t,
    e,
    i.edgeType ?? "bezier",
    r,
    i.sourceHandle,
    i.targetHandle,
    i.midpointOffset,
    i.curveOffset,
    (() => {
      if (!i.sourcePort || !n) return;
      const y = n.get(t.type);
      if (y != null && y.ports)
        return ze(
          t,
          y.ports,
          i.sourcePort,
          s,
          r,
          y.portAnchor ?? "bbox"
        ) ?? void 0;
    })(),
    (() => {
      if (!i.targetPort || !n) return;
      const y = n.get(e.type);
      if (y != null && y.ports)
        return ze(
          e,
          y.ports,
          i.targetPort,
          s,
          r,
          y.portAnchor ?? "bbox"
        ) ?? void 0;
    })(),
    i.sourceT,
    i.targetT,
    i.attachmentGap
  ), d = l.labelX, c = l.labelY;
  if (i.sourcePort && i.targetPort) {
    const y = (u = i.label) == null ? void 0 : u.trim();
    if (!Cs(e))
      return y ? Zr([{ text: y }], d, c, s, 0) : null;
    const p = [];
    y && p.push({ text: y }), p.push({
      text: `${i.sourcePort} → ${i.targetPort}`
    }), p.push({ text: "compute 999 ms" });
    const g = 9 / s;
    return Zr(
      p,
      d,
      c,
      s,
      g * 2 + 6 / s
    );
  }
  const a = (f = i.label) == null ? void 0 : f.trim();
  return a ? Zr(
    [{ text: a }],
    d,
    c,
    s,
    0
  ) : null;
}
function Di(t, e, o, n, r, s) {
  const i = Kd(e, o, n, r, s);
  return { ...t, x: t.x + i.dx, y: t.y + i.dy };
}
function Ud(t, e) {
  const o = Math.hypot(t.x, t.y);
  if (o > e && o > 1e-9) {
    const n = e / o;
    t.x *= n, t.y *= n;
  }
}
function Zd(t) {
  return [...t].sort(
    (e, o) => e.data.fromId.localeCompare(o.data.fromId) || e.data.toId.localeCompare(o.data.toId) || e.id.localeCompare(o.id)
  );
}
function Qd(t, e, o, n, r, s) {
  if (e.length < 2) return;
  const i = new Map(e.map((u) => [u.id, u])), l = new Set(e.map((u) => u.id)), d = 78, c = (u, f, y, p) => {
    const g = p.get(u) ?? { x: 0, y: 0 };
    g.x += f, g.y += y, p.set(u, g);
  }, a = Math.max(0.35, s);
  for (let u = 0; u < d; u++) {
    const f = /* @__PURE__ */ new Map(), y = 0.36 + u * 9e-3, p = 34, g = (w) => {
      const M = i.get(w), v = t.get(w);
      return { ...M, x: v.x, y: v.y };
    };
    for (let w = 0; w < e.length; w++)
      for (let M = w + 1; M < e.length; M++) {
        const v = e[w], C = e[M], T = Ur(
          v,
          t.get(v.id),
          r,
          n,
          a
        ), E = Ur(
          C,
          t.get(C.id),
          r,
          n,
          a
        ), z = qr(T, E);
        if (!z) continue;
        const j = 1.08 + (u < 24 ? 0.12 : 0), Y = z.dx * 0.5 * j, nt = z.dy * 0.5 * j;
        c(v.id, Y, nt, f), c(C.id, -Y, -nt, f);
      }
    const m = [], x = Zd(o);
    let b = 0;
    for (const w of x) {
      const { fromId: M, toId: v } = w.data;
      if (!l.has(M) || !l.has(v)) continue;
      const C = qd(
        g(M),
        g(v),
        w,
        n,
        r,
        s
      );
      C && m.push({ rect: C, fromId: M, toId: v, idx: b++ });
    }
    for (const { rect: w, fromId: M, toId: v } of m)
      for (const C of e) {
        const T = Ur(
          C,
          t.get(C.id),
          r,
          n,
          a
        ), E = qr(w, T);
        if (!E) continue;
        const z = C.id === M || C.id === v ? 0.58 : 0.44;
        c(M, E.dx * z, E.dy * z, f), c(v, E.dx * z, E.dy * z, f), C.id !== M && C.id !== v && c(C.id, -E.dx * z * 0.9, -E.dy * z * 0.9, f);
      }
    for (let w = 0; w < m.length; w++)
      for (let M = w + 1; M < m.length; M++) {
        const v = m[w], C = m[M], T = Di(
          v.rect,
          g(v.fromId),
          g(v.toId),
          r,
          v.idx * 2,
          s
        ), E = Di(
          C.rect,
          g(C.fromId),
          g(C.toId),
          r,
          C.idx * 2 + 1,
          s
        );
        let z = qr(T, E);
        if (!z) {
          const rt = T.x + T.w / 2, pt = T.y + T.h / 2, xt = E.x + E.w / 2, mt = E.y + E.h / 2;
          let W = rt - xt, B = pt - mt, G = Math.hypot(W, B);
          if (G < 1e-4) {
            const q = (w * 1.7 + M * 2.3 + u * 0.11) % (Math.PI * 2);
            W = Math.cos(q), B = Math.sin(q), G = 1;
          } else
            W /= G, B /= G;
          z = { dx: W * 14, dy: B * 14 };
        }
        const j = 0.5 + (u < 30 ? 0.12 : 0), Y = z.dx * j, nt = z.dy * j;
        c(v.fromId, Y, nt, f), c(v.toId, Y, nt, f), c(C.fromId, -Y, -nt, f), c(C.toId, -Y, -nt, f);
      }
    for (const [w, M] of f) {
      const v = { x: M.x * y, y: M.y * y };
      Ud(v, p);
      const C = t.get(w);
      C && (C.x += v.x, C.y += v.y);
    }
    (u === 20 || u === 45) && Qa(t, e, r, s);
  }
}
function Jd(t, e, o, n, r, s = 1) {
  const i = Math.max(24, n ?? 32), l = Math.max(16, Math.round((n ?? 32) * 0.5)), d = Math.max(32, i), c = new Map(t.map((T) => [T.id, T])), a = [...e].map((T) => c.get(T)).filter(
    (T) => !!T && T.type !== "edge" && !T.locked
  );
  if (a.length < 2) return [];
  const u = new Set(a.map((T) => T.id)), f = Od(t, u), y = Xd(f), p = Hd(
    a.map((T) => T.id),
    y
  );
  p.sort((T, E) => {
    const z = Math.min(...T.map((Y) => {
      var nt;
      return ((nt = c.get(Y)) == null ? void 0 : nt.x) ?? 0;
    })), j = Math.min(...E.map((Y) => {
      var nt;
      return ((nt = c.get(Y)) == null ? void 0 : nt.x) ?? 0;
    }));
    return z - j;
  });
  const g = /* @__PURE__ */ new Map();
  let m = 0;
  for (const T of p) {
    const E = T.map((B) => c.get(B)).filter((B) => !!B), z = new Set(T), j = f.filter(
      (B) => z.has(B.data.fromId) && z.has(B.data.toId)
    ), Y = y.filter(
      (B) => z.has(B.from) && z.has(B.to)
    ), rt = j.some(
      (B) => B.data.sourcePort && B.data.targetPort
    ) ? 1.72 : 1.18, pt = i * rt, xt = l * rt;
    let mt;
    Y.length === 0 || !Fd(T, Y) ? mt = Yd(E, o, pt, xt) : mt = jd(
      E,
      Y,
      o,
      pt,
      xt
    ), Qa(
      mt,
      E,
      o,
      Math.max(0.25, s)
    ), Qd(
      mt,
      E,
      j,
      r,
      o,
      Math.max(0.25, s)
    ), mt = Vd(mt, E, o);
    const W = Is(mt, E, o);
    for (const [B, G] of mt)
      g.set(B, { x: G.x + m, y: G.y });
    m += W.maxX - W.minX + d;
  }
  const x = Math.min(...a.map((T) => T.x)), b = Math.min(...a.map((T) => T.y)), w = Is(g, a, o), M = x - w.minX, v = b - w.minY, C = [];
  for (const T of a) {
    const E = g.get(T.id);
    E && C.push({ id: T.id, x: E.x + M, y: E.y + v });
  }
  return C;
}
function $d(t, e, o) {
  const n = t.x, r = t.x + t.w / 2, s = t.x + t.w, i = t.y, l = t.y + t.h / 2, d = t.y + t.h, c = [n, r, s], a = [i, l, d];
  let u = 1 / 0, f = 1 / 0;
  const y = [];
  for (const g of e) {
    const m = g.x, x = g.x + g.w / 2, b = g.x + g.w, w = g.y, M = g.y + g.h / 2, v = g.y + g.h, C = [m, x, b], T = [w, M, v];
    for (const E of c)
      for (const z of C) {
        const j = z - E;
        Math.abs(j) <= o && (Math.abs(j) < Math.abs(u) && (u = j), y.push({
          axis: "x",
          position: z,
          start: Math.min(t.y, t.y + t.h, g.y, g.y + g.h),
          end: Math.max(t.y, t.y + t.h, g.y, g.y + g.h)
        }));
      }
    for (const E of a)
      for (const z of T) {
        const j = z - E;
        Math.abs(j) <= o && (Math.abs(j) < Math.abs(f) && (f = j), y.push({
          axis: "y",
          position: z,
          start: Math.min(t.x, t.x + t.w, g.x, g.x + g.w),
          end: Math.max(t.x, t.x + t.w, g.x, g.x + g.w)
        }));
      }
  }
  const p = /* @__PURE__ */ new Map();
  for (const g of y) {
    const m = `${g.axis}:${g.position.toFixed(1)}`, x = p.get(m);
    x ? (x.start = Math.min(x.start, g.start), x.end = Math.max(x.end, g.end)) : p.set(m, { ...g });
  }
  return {
    guides: Array.from(p.values()),
    snapDx: Math.abs(u) <= o ? u : 0,
    snapDy: Math.abs(f) <= o ? f : 0
  };
}
class _d {
  constructor() {
    kt(this, "nodes", /* @__PURE__ */ new Map());
    kt(this, "viewport", { x: 0, y: 0, zoom: 1 });
    kt(this, "selection", /* @__PURE__ */ new Set());
    kt(this, "activeGroupId", null);
    kt(this, "groupRotations", /* @__PURE__ */ new Map());
    /** Maps child groupId → parent groupId for nested groups. */
    kt(this, "groupParent", /* @__PURE__ */ new Map());
    /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
    kt(this, "groupChildren", /* @__PURE__ */ new Map());
    kt(this, "mode", "select");
    kt(this, "activeTool", {
      tool: "pen",
      color: "#1e1e2e",
      width: 3,
      shapeType: "rect",
      strokeStyle: "solid",
      roughness: 1,
      opacity: 1
    });
    kt(this, "containerOffset", { x: 0, y: 0 });
    /** DOM element that hosts the canvas — used to derive the correct window in pop-out scenarios. */
    kt(this, "_container", null);
    kt(this, "snapToGrid", !1);
    kt(this, "smartGuides", !0);
    kt(this, "lassoSelect", !1);
    kt(this, "freeFormEdges", !0);
    /**
     * When true, every local doc-mutating method on this engine is a
     * no-op (addNode, updateNode, deleteNode, …). View state — viewport,
     * selection, search, measured heights, mode — keeps responding so
     * the user can still pan, zoom, and select to inspect.
     *
     * Remote-op methods (`addRemoteNode`, `applyRemoteNodeUpdate`,
     * `deleteRemoteNode`) are NOT guarded — incoming sync from peers
     * must still apply, otherwise a viewer wouldn't see live edits.
     *
     * Driven externally via `setReadOnly` (typically by the host's
     * collab perm signal). The host should also hide creation chrome
     * (sidebar, bottom bar) so guarded ops don't fail visibly.
     */
    kt(this, "readOnly", !1);
    kt(this, "presentationMode", !1);
    kt(this, "presentationSlides", []);
    kt(this, "presentationIndex", 0);
    kt(this, "_presentationAnimId", null);
    /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
    kt(this, "_transitionOverlay", null);
    kt(this, "gridSize", 20);
    kt(this, "boardBackground", "dot-grid");
    /** Saved "origin" viewport position restored on next load. */
    kt(this, "originView", null);
    /** Current alignment guides (set during drag). */
    kt(this, "alignGuides", []);
    /** Container dimensions for viewport bounds computation. */
    kt(this, "_containerWidth", 2e3);
    kt(this, "_containerHeight", 1500);
    kt(this, "history", new Jc());
    /** When set, `updateNodeWithHistoryCoalesced` reuses one undo step until `endHistoryCoalesce()`. */
    kt(this, "_historyCoalesceKey", null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kt(this, "listeners", {});
    kt(this, "_suppressEvents", !1);
    kt(this, "_collabMode", !1);
    kt(this, "clipboard", []);
    kt(this, "pasteCount", 0);
    kt(this, "nextZValue", 1);
    kt(this, "_minZ", 0);
    kt(this, "quadTree", new bs({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    kt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    kt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    kt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    kt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    kt(this, "_measuredHeights", {});
    kt(this, "_search", {
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
  /** Registry used by the canvas (remote edge preview, hooks). */
  getRegistry() {
    return this.registry;
  }
  /**
   * All registered node types (built-in + custom from `SpatialBoard` `nodeTypes`).
   * Empty until `setRegistry` runs (after mount). Intended for agents / MCP discovery.
   */
  getNodeTypeCatalog() {
    var e;
    return ((e = this.registry) == null ? void 0 : e.toCatalog()) ?? [];
  }
  /** Enable collaborative mode. Disables local snapshot history. */
  setCollabMode(e) {
    this._collabMode = e, this._historyCoalesceKey = null, e && this.history.clear();
  }
  /** Whether the engine is in collaborative mode. */
  get isCollabMode() {
    return this._collabMode;
  }
  /** Toggle read-only mode. See `readOnly` field for semantics. */
  setReadOnly(e) {
    this.readOnly = e;
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
    const n = [];
    for (const r of o) {
      const s = this.nodes.get(r);
      s && s.type === "edge" && n.push(s);
    }
    return n;
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
    var n;
    (n = this.listeners[e]) == null || n.delete(o);
  }
  emit(e, ...o) {
    var n;
    this._suppressEvents || (n = this.listeners[e]) == null || n.forEach((r) => r(...o));
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
    const n = this.computeSearchMatches(o);
    this._search = {
      query: o,
      matches: n,
      activeIndex: n.length > 0 ? 0 : -1
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
    const n = Math.max(0, Math.min(this._search.matches.length - 1, e)), r = this._search.matches[n];
    if (this.nodes.has(r.nodeId) && (this.setSearchActiveIndex(n), (o == null ? void 0 : o.select) !== !1 && this.select(r.nodeId), (o == null ? void 0 : o.center) !== !1)) {
      const s = (o == null ? void 0 : o.minZoom) ?? 0.9;
      this.zoomToNode(r.nodeId, Math.max(this.viewport.zoom, s));
    }
  }
  focusActiveSearchResult(e) {
    this._search.activeIndex < 0 || this.focusSearchResult(this._search.activeIndex, e);
  }
  refreshSearchIfNeeded() {
    var r;
    if (!this._search.query) return;
    const e = this._search.activeIndex >= 0 ? (r = this._search.matches[this._search.activeIndex]) == null ? void 0 : r.nodeId : void 0, o = this.computeSearchMatches(this._search.query);
    let n = -1;
    if (o.length > 0)
      if (e) {
        const s = o.findIndex((i) => i.nodeId === e);
        n = s >= 0 ? s : 0;
      } else
        n = 0;
    this._search = {
      query: this._search.query,
      matches: o,
      activeIndex: n
    }, this.emit("search");
  }
  computeSearchMatches(e) {
    const o = e.toLocaleLowerCase(), n = [], r = Array.from(this.nodes.values()).sort((s, i) => s.z - i.z);
    for (const s of r) {
      const i = this.getNodeSearchCandidates(s);
      for (const l of i) {
        const d = this.countOccurrences(l.text.toLocaleLowerCase(), o);
        d > 0 && n.push({
          nodeId: s.id,
          nodeType: s.type,
          field: l.field,
          text: l.text,
          matchCount: d
        });
      }
    }
    return n;
  }
  getNodeSearchCandidates(e) {
    if (!e.data || typeof e.data != "object") return [];
    const o = e.data, n = [], r = (s, i) => {
      if (typeof i != "string") return;
      const l = i.trim();
      l && n.push({ field: s, text: l });
    };
    switch (e.type) {
      case "text":
      case "sticky":
        r("text", o.text);
        break;
      case "shape":
      case "edge":
      case "frame":
        r("label", o.label);
        break;
      case "content": {
        const s = this.extractBlockText(o.blocks);
        r("content", s), r("content", o.markdown);
        break;
      }
    }
    return n;
  }
  extractBlockText(e) {
    if (!Array.isArray(e)) return "";
    const o = (n) => n.map((r) => {
      if (!r || typeof r != "object") return "";
      const s = r, i = Array.isArray(s.content) ? s.content.filter((d) => d && typeof d == "object" && (d.type ?? "text") === "text").map((d) => typeof d.text == "string" ? d.text : "").join("") : "", l = Array.isArray(s.children) && s.children.length > 0 ? o(s.children) : "";
      return l ? `${i}
${l}` : i;
    }).filter(Boolean).join(`
`);
    return o(e);
  }
  countOccurrences(e, o) {
    if (!o) return 0;
    let n = 0, r = 0;
    for (; n <= e.length - o.length; ) {
      const s = e.indexOf(o, n);
      if (s < 0) break;
      r += 1, n = s + o.length;
    }
    return r;
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
    for (const d of this.nodes.values())
      if (d.type === "frame") {
        const c = d.data;
        e.push({ id: d.id, x: d.x, y: d.y, order: c.slideOrder });
      }
    if (e.length === 0) return;
    const o = e.filter((d) => d.order != null).sort((d, c) => d.order - c.order), n = e.filter((d) => d.order == null), r = 100;
    n.sort((d, c) => d.y - c.y);
    const s = [];
    for (const d of n) {
      const c = s[s.length - 1];
      c && Math.abs(d.y - c[0].y) < r ? c.push(d) : s.push([d]);
    }
    const i = s.flatMap((d) => d.sort((c, a) => c.x - a.x)), l = [...o, ...i];
    this.presentationSlides = l.map((d) => d.id), this.presentationIndex = 0, this.presentationMode = !0, this.selection.size > 0 && (this.selection.clear(), this.emit("selection")), this.emit("presentation"), this.presentationGoTo(0);
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
    const o = this.presentationSlides[e], n = this.nodes.get(o);
    if (!n) {
      this.exitPresentation();
      return;
    }
    const r = this.presentationIndex;
    this.presentationIndex = e, this.emit("presentation"), this._presentationAnimId != null && (cancelAnimationFrame(this._presentationAnimId), this._presentationAnimId = null), this._transitionOverlay = null;
    const s = this._computeSlideViewport(n), i = n.data, l = i.transition ?? "pan", d = i.transitionDuration, c = e >= r ? 1 : -1;
    switch (l) {
      case "none":
        this._transitionNone(s);
        break;
      case "fade":
        this._transitionFade(s, d);
        break;
      case "dissolve":
        this._transitionDissolve(s, d);
        break;
      case "zoom":
        this._transitionZoom(s, d);
        break;
      case "fold":
        this._transitionFold(s, d);
        break;
      case "cube":
        this._transitionCube(s, d, c);
        break;
      case "pan":
      default:
        this._transitionPan(s, d);
        break;
    }
  }
  _computeSlideViewport(e) {
    const o = this.resolveHeight(e), n = 40, r = e.x - n, s = e.y - n, i = e.w + n * 2, l = o + n * 2, d = this._containerWidth, c = this._containerHeight, a = Ho(Math.min(d / i, c / l), 0.1, 5);
    return {
      x: (d - i * a) / 2 - r * a,
      y: (c - l * a) / 2 - s * a,
      zoom: a
    };
  }
  /** Pan transition: smooth viewport interpolation (default). */
  _transitionPan(e, o) {
    const n = o ?? 400, r = performance.now(), s = { ...this.viewport }, i = (l) => {
      const d = Math.min((l - r) / n, 1), c = 1 - Math.pow(1 - d, 3);
      this.viewport.x = s.x + (e.x - s.x) * c, this.viewport.y = s.y + (e.y - s.y) * c, this.viewport.zoom = s.zoom + (e.zoom - s.zoom) * c, this.emit("viewport"), d < 1 ? this._presentationAnimId = requestAnimationFrame(i) : this._presentationAnimId = null;
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** None transition: instant viewport snap. */
  _transitionNone(e) {
    this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport");
  }
  /** Fade transition: fade to black, snap viewport, fade from black. */
  _transitionFade(e, o) {
    const n = (o ?? 500) / 2, r = performance.now(), s = (i) => {
      const l = Math.min((i - r) / n, 1);
      if (this._transitionOverlay = { type: "fade", phase: "out", progress: l }, this.emit("presentation"), l < 1)
        this._presentationAnimId = requestAnimationFrame(s);
      else {
        this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport");
        const d = performance.now(), c = (a) => {
          const u = Math.min((a - d) / n, 1);
          this._transitionOverlay = { type: "fade", phase: "in", progress: u }, this.emit("presentation"), u < 1 ? this._presentationAnimId = requestAnimationFrame(c) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
        };
        this._presentationAnimId = requestAnimationFrame(c);
      }
    };
    this._presentationAnimId = requestAnimationFrame(s);
  }
  /** Dissolve transition: quick overlay fade, snap viewport at midpoint. */
  _transitionDissolve(e, o) {
    const n = o ?? 400, r = performance.now();
    let s = !1;
    const i = (l) => {
      const d = Math.min((l - r) / n, 1);
      d < 0.5 ? this._transitionOverlay = { type: "dissolve", phase: "out", progress: d * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "dissolve", phase: "in", progress: (d - 0.5) * 2 }), this.emit("presentation"), d < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Zoom transition: zoom out from current, zoom into target. */
  _transitionZoom(e, o) {
    const n = o ?? 600, r = performance.now(), s = { ...this.viewport }, i = Math.max(0.1, Math.min(s.zoom, e.zoom) * 0.35), l = (s.x + e.x) / 2, d = (s.y + e.y) / 2, c = (a) => {
      const u = Math.min((a - r) / n, 1);
      if (u < 0.5) {
        const f = u * 2, y = 1 - Math.pow(1 - f, 3);
        this.viewport.x = s.x + (l - s.x) * y, this.viewport.y = s.y + (d - s.y) * y, this.viewport.zoom = s.zoom + (i - s.zoom) * y;
      } else {
        const f = (u - 0.5) * 2, y = 1 - Math.pow(1 - f, 3);
        this.viewport.x = l + (e.x - l) * y, this.viewport.y = d + (e.y - d) * y, this.viewport.zoom = i + (e.zoom - i) * y;
      }
      this.emit("viewport"), u < 1 ? this._presentationAnimId = requestAnimationFrame(c) : this._presentationAnimId = null;
    };
    this._presentationAnimId = requestAnimationFrame(c);
  }
  /** Fold transition: two halves fold shut like a book, snap viewport, unfold to reveal. */
  _transitionFold(e, o) {
    const n = o ?? 700, r = performance.now();
    let s = !1;
    const i = (l) => {
      const d = Math.min((l - r) / n, 1);
      d < 0.5 ? this._transitionOverlay = { type: "fold", phase: "out", progress: d * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "fold", phase: "in", progress: (d - 0.5) * 2 }), this.emit("presentation"), d < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
  _transitionCube(e, o, n = 1) {
    const r = o ?? 1200, s = performance.now();
    let i = !1;
    const l = (d) => {
      const c = Math.min((d - s) / r, 1);
      c >= 0.5 && !i && (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), i = !0), this._transitionOverlay = {
        type: "cube",
        phase: c < 0.5 ? "out" : "in",
        progress: c < 0.5 ? c * 2 : (c - 0.5) * 2,
        direction: n,
        t: c
      }, this.emit("presentation"), c < 1 ? this._presentationAnimId = requestAnimationFrame(l) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(l);
  }
  snap(e, o) {
    return this.snapToGrid ? {
      x: Math.round(e / this.gridSize) * this.gridSize,
      y: Math.round(o / this.gridSize) * this.gridSize
    } : { x: e, y: o };
  }
  /** Update the container dimensions (called from canvas resize observer). */
  setContainerSize(e, o) {
    const n = this._containerWidth, r = this._containerHeight;
    this._containerWidth = e, this._containerHeight = o, this.presentationMode && this.presentationSlides.length > 0 ? this.presentationGoTo(this.presentationIndex) : n > 0 && r > 0 && (this.viewport.x += (e - n) / 2, this.viewport.y += (o - r) / 2, this.emit("viewport"));
  }
  /**
   * Precompute static guide candidates for a drag gesture.
   * Reuse this context across pointermove frames to reduce QuadTree work.
   */
  createDragSnapContext(e) {
    const o = e instanceof Set ? e : new Set(e), n = -this.viewport.x / this.viewport.zoom, r = -this.viewport.y / this.viewport.zoom, s = this._containerWidth / this.viewport.zoom, i = this._containerHeight / this.viewport.zoom, l = [], d = this.quadTree.retrieve([], { x: n, y: r, w: s, h: i });
    for (const c of d) {
      if (c.type === "edge" || o.has(c.id)) continue;
      const a = this.resolveHeight(c);
      l.push({ x: c.x, y: c.y, w: c.w, h: a });
    }
    return { staticNodes: l };
  }
  /**
   * Compute smart guide alignment + grid snap for a drag operation.
   * Sets `this.alignGuides` and emits `guides` event.
   * Returns the adjusted delta to apply.
   */
  computeDragSnap(e, o, n, r, s, i) {
    const l = this.snapToGrid && !s, d = this.smartGuides && !s;
    let c = n, a = r, u = [];
    const f = o instanceof Set ? o : new Set(o);
    if (d) {
      let y = 1 / 0, p = 1 / 0, g = -1 / 0, m = -1 / 0;
      for (const M of e) {
        const v = this.getNode(M.id);
        if (!v) continue;
        const C = M.x + n, T = M.y + r, E = this.resolveHeight(v);
        y = Math.min(y, C), p = Math.min(p, T), g = Math.max(g, C + v.w), m = Math.max(m, T + E);
      }
      const x = { x: y, y: p, w: g - y, h: m - p }, b = (i == null ? void 0 : i.staticNodes) ?? this.createDragSnapContext(f).staticNodes, w = $d(x, b, 5);
      if (u = w.guides, l) {
        const M = e[0].x + n, v = e[0].y + r, C = this.snap(M, v), T = C.x - M, E = C.y - v, z = w.snapDx !== 0 && Math.abs(w.snapDx) <= Math.abs(T), j = w.snapDy !== 0 && Math.abs(w.snapDy) <= Math.abs(E);
        c = n + (z ? w.snapDx : T), a = r + (j ? w.snapDy : E), z || (u = u.filter((Y) => Y.axis !== "x")), j || (u = u.filter((Y) => Y.axis !== "y"));
      } else
        c = n + w.snapDx, a = r + w.snapDy;
    } else if (l) {
      const y = this.snap(e[0].x + n, e[0].y + r);
      c = y.x - e[0].x, a = y.y - e[0].y;
    }
    return this.alignGuides = u, this.emit("guides"), { finalDx: c, finalDy: a };
  }
  /** Clear alignment guides (call on drag end). */
  clearAlignGuides() {
    this.alignGuides.length !== 0 && (this.alignGuides = [], this.emit("guides"));
  }
  // --- Board Background ---
  setBoardBackground(e) {
    this.readOnly || this.boardBackground !== e && (this.boardBackground = e, this.emit("background"));
  }
  // --- Viewport ---
  pan(e, o) {
    this.viewport.x += e, this.viewport.y += o, this.emit("viewport");
  }
  zoomByWheel(e, o, n) {
    this.viewport = ld(
      this.viewport,
      e,
      o - this.containerOffset.x,
      n - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, n) {
    this.viewport = cd(
      this.viewport,
      e,
      o - this.containerOffset.x,
      n - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const n = Ho(e, 0.1, 5);
    if (o) {
      const r = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = un(this.viewport, r, s);
      this.viewport = {
        x: r - i.x * n,
        y: s - i.y * n,
        zoom: n
      };
    } else
      this.viewport.zoom = n;
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
    const n = this.nodes.get(e);
    if (!n) return;
    const r = n.h === "auto" ? 100 : n.h, s = n.x + n.w / 2, i = n.y + r / 2, l = this.getWindow(), d = l.innerWidth, c = l.innerHeight, a = Ho(o, 0.2, 5);
    this.viewport = {
      x: d / 2 - s * a,
      y: c / 2 - i * a,
      zoom: a
    }, this.emit("viewport");
  }
  fitToContent() {
    if (this.nodes.size === 0) return;
    let e = 1 / 0, o = 1 / 0, n = -1 / 0, r = -1 / 0;
    for (const u of this.nodes.values()) {
      const f = u.h === "auto" ? 100 : u.h;
      u.x < e && (e = u.x), u.y < o && (o = u.y), u.x + u.w > n && (n = u.x + u.w), u.y + f > r && (r = u.y + f);
    }
    const s = 50;
    e -= s, o -= s, n += s, r += s;
    const i = n - e, l = r - o, d = this._containerWidth, c = this._containerHeight, a = Ho(
      Math.min(d / i, c / l),
      0.1,
      5
    );
    this.viewport = {
      x: (d - i * a) / 2 - e * a,
      y: (c - l * a) / 2 - o * a,
      zoom: a
    }, this.emit("viewport");
  }
  /**
   * Fit viewport to a single frame node, ignoring everything else.
   * Used by single-frame rendering (e.g. flashcard study mode).
   */
  fitToFrame(e) {
    const o = this.nodes.get(e);
    if (!o) return this.fitToContent();
    const n = o.h === "auto" ? 100 : o.h, r = 20, s = o.w + r * 2, i = n + r * 2, l = this._containerWidth, d = this._containerHeight, c = Ho(
      Math.min(l / s, d / i),
      0.1,
      5
    );
    this.viewport = {
      x: (l - s * c) / 2 - (o.x - r) * c,
      y: (d - i * c) / 2 - (o.y - r) * c,
      zoom: c
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
    return un(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return ad(this.viewport, e, o);
  }
  // --- Node CRUD ---
  addNode(e) {
    var o, n, r;
    if (!this.readOnly) {
      if (this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent), this.nodes.set(e.id, e), this.quadTree.insert(e), e.z < this._minZ && (this._minZ = e.z), e.type === "edge") {
        const s = e, { fromId: i, toId: l } = s.data;
        this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.has(l) || this.adjacency.set(l, /* @__PURE__ */ new Set()), this.adjacency.get(i).add(e.id), this.adjacency.get(l).add(e.id);
      }
      e.type !== "edge" && this.updateFrameMembership([e.id]), (r = (n = (o = this.registry) == null ? void 0 : o.get(e.type)) == null ? void 0 : n.onCreate) == null || r.call(n, e, this), this.emit("node:create", e), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
    }
  }
  addNodes(e) {
    if (this.readOnly || e.length === 0) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    for (const n of e)
      if (this.nodes.set(n.id, n), this.quadTree.insert(n), n.type === "edge") {
        const r = n, { fromId: s, toId: i } = r.data;
        this.adjacency.has(s) || this.adjacency.set(s, /* @__PURE__ */ new Set()), this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.get(s).add(n.id), this.adjacency.get(i).add(n.id);
      }
    const o = e.filter((n) => n.type !== "edge").map((n) => n.id);
    o.length > 0 && this.updateFrameMembership(o), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
  }
  updateNode(e, o) {
    var s, i, l, d, c, a, u, f, y;
    if (this.readOnly) return;
    const n = this.nodes.get(e);
    if (!n) return;
    const r = { ...n, ...o };
    if (o.data && typeof o.data == "object" && n.data && typeof n.data == "object" && (r.data = {
      ...n.data,
      ...o.data
    }), this.nodes.set(e, r), (n.x !== r.x || n.y !== r.y || n.w !== r.w || n.h !== r.h || (n.rotation ?? 0) !== (r.rotation ?? 0)) && (this.quadTree.remove(n), this.quadTree.insert(r), this.updateConnectedEdges(e)), n.x !== r.x || n.y !== r.y) {
      const p = r.x - n.x, g = r.y - n.y;
      (l = (i = (s = this.registry) == null ? void 0 : s.get(r.type)) == null ? void 0 : i.onMove) == null || l.call(i, r, p, g, this), this.emit("node:move", r, p, g);
    }
    if (n.w !== r.w || n.h !== r.h) {
      const p = n.w !== 0 ? r.w / n.w : 1, g = n.h === "auto" ? 0 : n.h, m = r.h === "auto" ? 0 : r.h, x = g !== 0 ? m / g : 1;
      this.emit("node:resize", r, p, x);
    }
    (n.rotation ?? 0) !== (r.rotation ?? 0) && ((a = (c = (d = this.registry) == null ? void 0 : d.get(r.type)) == null ? void 0 : c.onRotate) == null || a.call(c, r, r.rotation ?? 0, this), this.emit("node:rotate", r, r.rotation ?? 0)), o.data && n.data !== r.data && ((y = (f = (u = this.registry) == null ? void 0 : u.get(r.type)) == null ? void 0 : f.onDataChange) == null || y.call(f, r, n.data, r.data, this), this.emit("node:data", r, n.data, r.data), this.refreshSearchIfNeeded()), this.emit("change");
  }
  /**
   * Batch update multiple nodes with a single change emit.
   * Use during drag/resize to avoid N re-renders per frame.
   */
  updateMany(e) {
    if (this.readOnly) return;
    let o = !1, n = !1;
    for (const { id: r, patch: s } of e) {
      const i = this.nodes.get(r);
      if (!i) continue;
      const l = { ...i, ...s };
      s.data && typeof s.data == "object" && i.data && typeof i.data == "object" && (l.data = {
        ...i.data,
        ...s.data
      }, n = !0), this.nodes.set(r, l), (i.x !== l.x || i.y !== l.y || i.w !== l.w || i.h !== l.h || (i.rotation ?? 0) !== (l.rotation ?? 0)) && (this.quadTree.remove(i), this.quadTree.insert(l), this.updateConnectedEdges(r)), o = !0;
    }
    o && n && this.refreshSearchIfNeeded(), o && this.emit("change");
  }
  updateConnectedEdges(e) {
    const o = this.adjacency.get(e);
    if (o)
      for (const n of o) {
        const r = this.nodes.get(n);
        if (!r || r.type !== "edge") continue;
        const s = r, i = this.nodes.get(s.data.fromId), l = this.nodes.get(s.data.toId);
        if (i && l) {
          const d = Pe(
            i,
            l,
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
          ), c = { ...s, ...d.bounds };
          this.nodes.set(n, c), this.quadTree.remove(s), this.quadTree.insert(c);
        }
      }
  }
  updateNodeWithHistory(e, o) {
    this.readOnly || (this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent), this.updateNode(e, o), this.emit("history"));
  }
  /**
   * Like `updateNodeWithHistory`, but multiple calls with the same `sessionKey` share one undo step
   * (e.g. dragging an inspector slider). Call `endHistoryCoalesce()` when the gesture ends.
   */
  updateNodeWithHistoryCoalesced(e, o, n) {
    if (!this.readOnly) {
      if (this._collabMode) {
        this.updateNode(e, o);
        return;
      }
      this._historyCoalesceKey !== n && (this.history.pushSnapshot(this.nodes, this.groupParent), this._historyCoalesceKey = n, this.emit("history")), this.updateNode(e, o);
    }
  }
  /** Update multiple nodes in a single undo step. */
  batchUpdateWithHistory(e) {
    if (e.length !== 0) {
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const { id: o, patch: n } of e)
        this.updateNode(o, n);
      this.emit("history");
    }
  }
  /**
   * Like `batchUpdateWithHistory`, but shares one undo step with other calls using the same `sessionKey`.
   */
  batchUpdateWithHistoryCoalesced(e, o) {
    if (e.length !== 0) {
      if (this._collabMode) {
        for (const { id: n, patch: r } of e)
          this.updateNode(n, r);
        return;
      }
      this._historyCoalesceKey !== o && (this.history.pushSnapshot(this.nodes, this.groupParent), this._historyCoalesceKey = o, this.emit("history"));
      for (const { id: n, patch: r } of e)
        this.updateNode(n, r);
    }
  }
  deleteNode(e) {
    var n, r, s, i, l;
    if (this.readOnly || !this.nodes.has(e) || (n = this.nodes.get(e)) != null && n.locked) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = this.nodes.get(e);
    o && ((i = (s = (r = this.registry) == null ? void 0 : r.get(o.type)) == null ? void 0 : s.onDelete) == null || i.call(s, o, this), this.emit("node:delete", o), this.quadTree.remove(o)), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
    for (const d of this.frameChildren.values()) d.delete(e);
    for (const [d, c] of this.nodes)
      if (c.type === "edge") {
        const a = c.data;
        if (a.fromId === e || a.toId === e) {
          const u = this.nodes.get(d);
          u && this.quadTree.remove(u), this.nodes.delete(d), this.selection.delete(d);
          const f = a.fromId === e ? a.toId : a.fromId;
          (l = this.adjacency.get(f)) == null || l.delete(d);
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
    for (const n of this.nodes.values())
      n.type === e && o.push(n);
    return o;
  }
  /** Returns all non-edge nodes fully contained within a frame's bounds (including nested frames). */
  getNodesInsideFrame(e) {
    const o = this.nodes.get(e);
    if (!o || !this._containerTypes.has(o.type)) return [];
    const n = this.resolveHeight(o), r = [];
    for (const s of this.nodes.values()) {
      if (s.id === e || s.type === "edge") continue;
      const i = this.resolveHeight(s);
      s.x >= o.x && s.y >= o.y && s.x + s.w <= o.x + o.w && s.y + i <= o.y + n && r.push(s);
    }
    return r;
  }
  /** Returns tracked frame children (nodes explicitly added to the frame). */
  getFrameChildren(e) {
    const o = this.frameChildren.get(e);
    if (!o) return [];
    const n = [];
    for (const r of o) {
      const s = this.nodes.get(r);
      s && n.push(s);
    }
    return n;
  }
  /** Returns IDs of all descendants of a frame (children, grandchildren, etc.). */
  getFrameDescendantIds(e) {
    const o = /* @__PURE__ */ new Set(), n = (r) => {
      const s = this.frameChildren.get(r);
      if (s)
        for (const i of s) {
          if (o.has(i)) continue;
          o.add(i);
          const l = this.nodes.get(i);
          l && this._containerTypes.has(l.type) && n(i);
        }
    };
    return n(e), o;
  }
  /** Rebuild frameChildren from spatial containment. Called on load/undo/redo.
   *  Each node is assigned only to its smallest containing frame. */
  rebuildFrameChildren() {
    this.frameChildren.clear();
    const e = [];
    for (const n of this.nodes.values()) {
      if (!this._containerTypes.has(n.type)) continue;
      const r = this.resolveHeight(n);
      e.push({ node: n, area: n.w * r });
    }
    e.sort((n, r) => n.area - r.area);
    const o = /* @__PURE__ */ new Set();
    for (const { node: n } of e) {
      const s = this.getNodesInsideFrame(n.id).filter((i) => !o.has(i.id));
      if (s.length > 0) {
        const i = /* @__PURE__ */ new Set();
        for (const l of s)
          i.add(l.id), o.add(l.id);
        this.frameChildren.set(n.id, i);
      }
    }
  }
  /** After nodes are moved, update which frames they belong to.
   *  Each node is assigned only to its smallest containing frame.
   *  Frames can be nested inside other frames (but not inside themselves or their descendants). */
  updateFrameMembership(e) {
    if (!this.readOnly)
      for (const o of e) {
        const n = this.nodes.get(o);
        if (!n || n.type === "edge") continue;
        const r = this.resolveHeight(n);
        for (const [c, a] of this.frameChildren) {
          if (!a.has(o)) continue;
          const u = this.nodes.get(c);
          if (!u) {
            a.delete(o);
            continue;
          }
          const f = this.resolveHeight(u);
          n.x >= u.x && n.y >= u.y && n.x + n.w <= u.x + u.w && n.y + r <= u.y + f || a.delete(o);
        }
        let s;
        this._containerTypes.has(n.type) && (s = this.getFrameDescendantIds(o));
        let i = null, l = 1 / 0;
        const d = this.quadTree.retrieve([], { x: n.x, y: n.y, w: n.w, h: r });
        for (const c of d) {
          if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
          const a = this.resolveHeight(c);
          if (n.x >= c.x && n.y >= c.y && n.x + n.w <= c.x + c.w && n.y + r <= c.y + a) {
            const f = c.w * a;
            f < l && (l = f, i = c);
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
    const n = this.getNodesInsideFrame(e);
    n.length > 0 ? this.frameChildren.set(e, new Set(n.map((r) => r.id))) : this.frameChildren.delete(e);
  }
  /** Adopt all existing nodes that are spatially inside a newly created frame. */
  adoptNodesIntoNewFrame(e) {
    const o = this.getNodesInsideFrame(e);
    if (o.length > 0) {
      const n = /* @__PURE__ */ new Set();
      for (const r of o) n.add(r.id);
      this.frameChildren.set(e, n);
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
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const n = this.nodes.get(o);
        n && !n.locked && this.nodes.set(o, { ...n, z: this.nextZValue++ });
      }
      this.emit("change"), this.emit("history");
    }
  }
  sendToBack(e) {
    if (e.length !== 0) {
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (let o = e.length - 1; o >= 0; o--) {
        const n = this.nodes.get(e[o]);
        n && !n.locked && this.nodes.set(e[o], { ...n, z: --this._minZ });
      }
      this.emit("change"), this.emit("history");
    }
  }
  /** AABB overlap test between two nodes. */
  _nodesOverlap(e, o) {
    const n = this.resolveHeight(e), r = this.resolveHeight(o);
    return e.x < o.x + o.w && e.x + e.w > o.x && e.y < o.y + r && e.y + n > o.y;
  }
  bringForward(e) {
    if (e.length !== 0) {
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const n = this.nodes.get(o);
        if (!n || n.locked) continue;
        const r = n.type === "edge", s = [];
        for (const a of this.nodes.values())
          a.id !== o && (r ? a.type === "edge" : a.type !== "edge") && a.z >= n.z && this._nodesOverlap(n, a) && s.push(a);
        if (s.length === 0) continue;
        s.sort((a, u) => a.z - u.z);
        const i = s[0], l = this.nodes.get(i.id), d = n.z, c = l.z;
        d === c ? this.nodes.set(o, { ...n, z: c + 1 }) : (this.nodes.set(o, { ...n, z: c }), this.nodes.set(i.id, { ...l, z: d }));
      }
      this.emit("change"), this.emit("history");
    }
  }
  sendBackward(e) {
    if (e.length !== 0) {
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const n = this.nodes.get(o);
        if (!n || n.locked) continue;
        const r = n.type === "edge", s = [];
        for (const a of this.nodes.values())
          a.id !== o && (r ? a.type === "edge" : a.type !== "edge") && a.z <= n.z && this._nodesOverlap(n, a) && s.push(a);
        if (s.length === 0) continue;
        s.sort((a, u) => u.z - a.z);
        const i = s[0], l = this.nodes.get(i.id), d = n.z, c = l.z;
        d === c ? this.nodes.set(o, { ...n, z: c - 1 }) : (this.nodes.set(o, { ...n, z: c }), this.nodes.set(i.id, { ...l, z: d }));
      }
      this.emit("change"), this.emit("history");
    }
  }
  /** Update the QuadTree bounds for an auto-height node when its measured height changes. */
  updateMeasuredHeight(e, o) {
    const n = this.nodes.get(e);
    !n || n.h !== "auto" || (this._measuredHeights[e] = o, this.quadTree.remove(n), this.quadTree.insert(n, o));
  }
  // --- Spatial Queries ---
  hitTest(e, o, n) {
    const r = we.isEnabled(), s = r ? performance.now() : 0, i = 50, l = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), d = /* @__PURE__ */ new Map();
    for (const a of l) d.set(a.id, a);
    const c = rd(d, e, o, this.viewport.zoom, n, this._containerTypes);
    return r && we.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, n) {
    const r = we.isEnabled(), s = r ? performance.now() : 0, i = 50, l = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), d = /* @__PURE__ */ new Map();
    for (const a of l) d.set(a.id, a);
    const c = id(d, e, o, this.viewport.zoom, n, this._containerTypes);
    return r && we.recordHitTest(performance.now() - s), c;
  }
  getNodesInRect(e) {
    return this.quadTree.retrieve([], e);
  }
  // --- Selection ---
  /** Expand selection to include all group siblings, walking up the group
   *  hierarchy until the active group (or root) is reached. */
  expandSelectionToGroups() {
    const e = /* @__PURE__ */ new Set();
    for (const r of this.selection) {
      const s = this.nodes.get(r);
      if (!(s != null && s.groupId) || this.activeGroupId && s.groupId === this.activeGroupId) continue;
      let i = s.groupId;
      for (; ; ) {
        const l = this.groupParent.get(i);
        if (!l || this.activeGroupId && l === this.activeGroupId) break;
        i = l;
      }
      e.add(i);
    }
    if (e.size === 0) return;
    const o = new Set(e), n = (r) => {
      const s = this.groupChildren.get(r);
      if (s)
        for (const i of s)
          o.has(i) || (o.add(i), n(i));
    };
    for (const r of e)
      n(r);
    for (const r of this.nodes.values())
      r.groupId && o.has(r.groupId) && this.selection.add(r.id);
  }
  select(e) {
    var o, n, r, s, i, l;
    for (const d of this.selection) {
      const c = this.nodes.get(d);
      c && ((r = (n = (o = this.registry) == null ? void 0 : o.get(c.type)) == null ? void 0 : n.onDeselect) == null || r.call(n, c, this), this.emit("node:deselect", c));
    }
    this.selection.clear(), this.selection.add(e), this.expandSelectionToGroups();
    for (const d of this.selection) {
      const c = this.nodes.get(d);
      c && ((l = (i = (s = this.registry) == null ? void 0 : s.get(c.type)) == null ? void 0 : i.onSelect) == null || l.call(i, c, this), this.emit("node:select", c));
    }
    this.emit("selection");
  }
  toggleSelect(e) {
    const o = this.nodes.get(e);
    if (this.selection.has(e))
      if (o != null && o.groupId)
        for (const n of this.nodes.values())
          n.groupId === o.groupId && this.selection.delete(n.id);
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
    var e, o, n;
    if (!(this.selection.size === 0 && !this.activeGroupId)) {
      for (const r of this.selection) {
        const s = this.nodes.get(r);
        s && ((n = (o = (e = this.registry) == null ? void 0 : e.get(s.type)) == null ? void 0 : o.onDeselect) == null || n.call(o, s, this), this.emit("node:deselect", s));
      }
      this.selection.clear(), this.activeGroupId && (this.activeGroupId = null, this.emit("group:exit")), this.emit("selection");
    }
  }
  deleteSelected() {
    var n, r, s;
    if (this.readOnly || this.selection.size === 0) return;
    const e = new Set(
      Array.from(this.selection).filter((i) => {
        var l;
        return !((l = this.nodes.get(i)) != null && l.locked);
      })
    );
    if (e.size === 0) return;
    this.activeGroupId && this.getGroupMembers(this.activeGroupId).filter((l) => !e.has(l.id)).length === 0 && (this.activeGroupId = null, this.emit("group:exit")), this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = e;
    for (const i of e) {
      const l = this.nodes.get(i);
      l && ((s = (r = (n = this.registry) == null ? void 0 : n.get(l.type)) == null ? void 0 : r.onDelete) == null || s.call(r, l, this), this.emit("node:delete", l), this.quadTree.remove(l), this.nodes.delete(i));
    }
    for (const [i, l] of this.nodes)
      if (l.type === "edge") {
        const d = l.data;
        if (o.has(d.fromId) || o.has(d.toId)) {
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
    const n = this.groupParent.get(e);
    n && ((s = this.groupChildren.get(n)) == null || s.delete(e)), this.groupParent.set(e, o);
    let r = this.groupChildren.get(o);
    r || (r = /* @__PURE__ */ new Set(), this.groupChildren.set(o, r)), r.add(e);
  }
  /** Remove a groupParent entry and keep groupChildren in sync. */
  unlinkGroupParent(e) {
    const o = this.groupParent.get(e);
    if (o) {
      const n = this.groupChildren.get(o);
      n && (n.delete(e), n.size === 0 && this.groupChildren.delete(o));
    }
    this.groupParent.delete(e);
  }
  /** Rebuild the groupChildren reverse index from groupParent. */
  rebuildGroupChildren() {
    this.groupChildren.clear();
    for (const [e, o] of this.groupParent) {
      let n = this.groupChildren.get(o);
      n || (n = /* @__PURE__ */ new Set(), this.groupChildren.set(o, n)), n.add(e);
    }
  }
  deleteNodes(e) {
    var n, r, s;
    if (this.readOnly || e.length === 0) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = new Set(e);
    for (const i of e) {
      const l = this.nodes.get(i);
      if (l) {
        (s = (r = (n = this.registry) == null ? void 0 : n.get(l.type)) == null ? void 0 : r.onDelete) == null || s.call(r, l, this), this.emit("node:delete", l), this.quadTree.remove(l), this.nodes.delete(i), this.frameChildren.delete(i);
        for (const d of this.frameChildren.values()) d.delete(i);
      }
    }
    for (const [i, l] of this.nodes)
      if (l.type === "edge") {
        const d = l.data;
        if (o.has(d.fromId) || o.has(d.toId)) {
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
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const n of this.selection) {
        const r = this.nodes.get(n);
        if (!r) continue;
        this.quadTree.remove(r);
        let s = null;
        const i = (o = this.registry) == null ? void 0 : o.get(r.type);
        if (i != null && i.onFlip) {
          const l = i.onFlip(r, e, this);
          l && Object.keys(l).length > 0 && (s = {
            ...r,
            data: { ...r.data, ...l }
          });
        } else if (r.type === "draw") {
          const l = r;
          if (e === "h") {
            const d = l.data.points.map(
              ([c, a, u]) => [l.w - c, a, u]
            );
            s = { ...l, data: { ...l.data, points: d } };
          } else {
            const d = l.h === "auto" ? 0 : l.h, c = l.data.points.map(
              ([a, u, f]) => [a, d - u, f]
            );
            s = { ...l, data: { ...l.data, points: c } };
          }
        } else if (r.type === "shape") {
          const l = r;
          if (l.data.shape === "arrow" || l.data.shape === "line")
            if (l.data.startPoint && l.data.endPoint)
              if (e === "h") {
                const d = [l.w - l.data.startPoint[0], l.data.startPoint[1]], c = [l.w - l.data.endPoint[0], l.data.endPoint[1]];
                s = { ...l, data: { ...l.data, startPoint: d, endPoint: c } };
              } else {
                const d = l.h === "auto" ? 0 : l.h, c = [l.data.startPoint[0], d - l.data.startPoint[1]], a = [l.data.endPoint[0], d - l.data.endPoint[1]];
                s = { ...l, data: { ...l.data, startPoint: c, endPoint: a } };
              }
            else
              s = e === "h" ? { ...l, rotation: -(l.rotation || 0) + 180 } : { ...l, rotation: -(l.rotation || 0) };
        } else if (r.type === "image") {
          const l = r;
          s = e === "h" ? { ...l, data: { ...l.data, flipH: !l.data.flipH } } : { ...l, data: { ...l.data, flipV: !l.data.flipV } };
        }
        s ? (this.nodes.set(n, s), this.quadTree.insert(s), this.emit("node:flip", s, e)) : this.quadTree.insert(r);
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
  /**
   * Re-layout selected nodes in one undo step: layered left-to-right flow when
   * selected edges form a DAG (with barycenter crossing reduction), otherwise a
   * tidy reading-order grid; then overlap refinement for nodes and estimated
   * wire labels. Skips edges and locked nodes.
   */
  arrangeSelectedNodes(e, o = 1) {
    const n = Jd(
      this.getAllNodes(),
      this.selection,
      e,
      this.gridSize,
      this.registry,
      o
    );
    n.length !== 0 && this.batchUpdateWithHistory(
      n.map((r) => ({ id: r.id, patch: { x: r.x, y: r.y } }))
    );
  }
  /** Axis alignment for multi-select (union bbox reference). Skips edges and locked nodes. */
  alignSelectedNodes(e, o) {
    const n = [];
    for (const f of this.selection) {
      const y = this.nodes.get(f);
      !y || y.type === "edge" || y.locked || n.push(y);
    }
    if (n.length < 2) return;
    const r = (f) => f.h === "auto" ? (o == null ? void 0 : o[f.id]) ?? 100 : f.h;
    let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
    for (const f of n) {
      const y = r(f);
      s = Math.min(s, f.x), i = Math.min(i, f.y), l = Math.max(l, f.x + f.w), d = Math.max(d, f.y + y);
    }
    const c = (s + l) / 2, a = (i + d) / 2, u = [];
    for (const f of n) {
      const y = r(f);
      let p = f.x, g = f.y;
      switch (e) {
        case "left":
          p = s;
          break;
        case "right":
          p = l - f.w;
          break;
        case "centerH":
          p = c - f.w / 2;
          break;
        case "top":
          g = i;
          break;
        case "bottom":
          g = d - y;
          break;
        case "centerV":
          g = a - y / 2;
          break;
      }
      (p !== f.x || g !== f.y) && u.push({ id: f.id, patch: { x: p, y: g } });
    }
    u.length !== 0 && this.batchUpdateWithHistory(u);
  }
  /**
   * Even spacing between adjacent items along `axis` (sort by min edge on that axis).
   * Gaps are never negative: if the union bbox is narrower than the sum of sizes,
   * uses zero gap and centers the packed strip on the original bbox so nothing overlaps.
   * Skips edges and locked nodes.
   */
  distributeSelectedNodes(e, o) {
    const n = [];
    for (const i of this.selection) {
      const l = this.nodes.get(i);
      !l || l.type === "edge" || l.locked || n.push(l);
    }
    if (n.length < 2) return;
    const r = (i) => i.h === "auto" ? (o == null ? void 0 : o[i.id]) ?? 100 : i.h, s = [];
    if (e === "horizontal") {
      const i = [...n].sort((g, m) => g.x - m.x || g.id.localeCompare(m.id));
      let l = 1 / 0, d = -1 / 0, c = 0;
      for (const g of i)
        l = Math.min(l, g.x), d = Math.max(d, g.x + g.w), c += g.w;
      const a = d - l, u = a - c, f = u >= 0 ? u / (i.length - 1) : 0;
      let p = u >= 0 ? l : l + (a - c) / 2;
      for (const g of i) {
        const m = p;
        p += g.w + f, m !== g.x && s.push({ id: g.id, patch: { x: m } });
      }
    } else {
      const i = [...n].sort(
        (g, m) => g.y - m.y || g.id.localeCompare(m.id)
      );
      let l = 1 / 0, d = -1 / 0, c = 0;
      for (const g of i) {
        const m = r(g);
        l = Math.min(l, g.y), d = Math.max(d, g.y + m), c += m;
      }
      const a = d - l, u = a - c, f = u >= 0 ? u / (i.length - 1) : 0;
      let p = u >= 0 ? l : l + (a - c) / 2;
      for (const g of i) {
        const m = r(g), x = p;
        p += m + f, x !== g.y && s.push({ id: g.id, patch: { y: x } });
      }
    }
    s.length !== 0 && this.batchUpdateWithHistory(s);
  }
  // --- Grouping ---
  groupSelected() {
    if (this.readOnly || this.selection.size < 2 || this.activeGroupId) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = Rt(10), o = /* @__PURE__ */ new Set();
    for (const n of this.selection) {
      const r = this.nodes.get(n);
      if (r != null && r.groupId) {
        let s = r.groupId;
        for (; this.groupParent.has(s); ) s = this.groupParent.get(s);
        o.add(s);
      }
    }
    if (o.size > 0) {
      for (const n of o)
        this.linkGroupParent(n, e);
      for (const n of this.selection) {
        const r = this.nodes.get(n);
        r && !r.groupId && this.nodes.set(n, { ...r, groupId: e });
      }
    } else
      for (const n of this.selection) {
        const r = this.nodes.get(n);
        r && this.nodes.set(n, { ...r, groupId: e });
      }
    this.emit("change"), this.emit("history");
  }
  ungroupSelected() {
    if (this.readOnly || this.selection.size === 0) return;
    const e = /* @__PURE__ */ new Set();
    for (const o of this.selection) {
      const n = this.nodes.get(o);
      if (n != null && n.groupId) {
        let r = n.groupId;
        for (; this.groupParent.has(r); ) {
          const s = this.groupParent.get(r);
          if (s === this.activeGroupId) break;
          r = s;
        }
        e.add(r);
      }
    }
    if (e.size !== 0) {
      this.activeGroupId && e.has(this.activeGroupId) && (this.activeGroupId = null, this.emit("group:exit")), this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const n = this.groupParent.get(o);
        for (const s of this.nodes.values())
          if (s.groupId === o)
            if (n)
              this.nodes.set(s.id, { ...s, groupId: n });
            else {
              const { groupId: i, ...l } = s;
              this.nodes.set(s.id, l);
            }
        const r = this.groupChildren.get(o);
        if (r)
          for (const s of [...r])
            n ? this.linkGroupParent(s, n) : this.unlinkGroupParent(s);
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
      const n = this.nodes.get(o);
      if (!(n != null && n.groupId)) return;
      let r = n.groupId;
      for (; this.groupParent.has(r); ) r = this.groupParent.get(r);
      if (!e) e = r;
      else if (r !== e) return;
    }
    return e;
  }
  /** True if all selected nodes belong to exactly one group (possibly nested). */
  selectionIsSingleGroup() {
    if (this.selection.size < 2) return !1;
    let e;
    for (const o of this.selection) {
      const n = this.nodes.get(o);
      if (!(n != null && n.groupId)) return !1;
      let r = n.groupId;
      for (; this.groupParent.has(r); ) r = this.groupParent.get(r);
      if (!e) e = r;
      else if (r !== e) return !1;
    }
    return !0;
  }
  getGroupMembers(e) {
    const o = [];
    for (const n of this.nodes.values())
      n.groupId === e && o.push(n);
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
    const n = this.getGroupMembers(e);
    n.length > 0 && (this.selection = /* @__PURE__ */ new Set([n[0].id]), this.expandSelectionToGroups(), this.emit("selection"));
  }
  /** Check if a node belongs to the currently active (entered) group or any of its descendants. */
  isNodeInActiveGroup(e) {
    if (!this.activeGroupId) return !1;
    const o = this.nodes.get(e);
    if (!(o != null && o.groupId)) return !1;
    let n = o.groupId;
    for (; n; ) {
      if (n === this.activeGroupId) return !0;
      n = this.groupParent.get(n);
    }
    return !1;
  }
  /** Get the outermost group of a node (stopping at activeGroupId boundary). */
  getNodeOutermostGroup(e) {
    const o = this.nodes.get(e);
    if (!(o != null && o.groupId)) return;
    let n = o.groupId;
    for (; ; ) {
      const r = this.groupParent.get(n);
      if (!r || this.activeGroupId && r === this.activeGroupId) break;
      n = r;
    }
    return n;
  }
  /** Get all nodes that are descendants of a group (direct + nested sub-groups). */
  getAllGroupDescendantNodes(e) {
    const o = /* @__PURE__ */ new Set([e]), n = (s) => {
      const i = this.groupChildren.get(s);
      if (i)
        for (const l of i)
          o.has(l) || (o.add(l), n(l));
    };
    n(e);
    const r = [];
    for (const s of this.nodes.values())
      s.groupId && o.has(s.groupId) && r.push(s);
    return r;
  }
  duplicateSelected() {
    if (this.readOnly || this.selection.size === 0) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = 20, o = /* @__PURE__ */ new Map(), n = [];
    for (const s of this.selection) {
      const i = this.nodes.get(s);
      if (!i) continue;
      const l = Rt();
      o.set(i.id, l), n.push({
        ...JSON.parse(JSON.stringify(i)),
        id: l,
        x: i.x + e,
        y: i.y + e,
        z: this.nextZValue++,
        locked: void 0
      });
    }
    for (const s of n)
      if (s.type === "edge" && s.data) {
        const i = s.data;
        o.has(i.fromId) && (i.fromId = o.get(i.fromId)), o.has(i.toId) && (i.toId = o.get(i.toId));
      }
    const r = /* @__PURE__ */ new Map();
    for (const s of n)
      s.groupId && (r.has(s.groupId) || r.set(s.groupId, Rt(10)), s.groupId = r.get(s.groupId));
    for (const [s, i] of this.groupParent)
      r.has(s) && r.has(i) && this.linkGroupParent(r.get(s), r.get(i));
    this.addNodes(n), this.selection = new Set(n.map((s) => s.id)), this.emit("change"), this.emit("selection"), this.emit("history");
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
    if (this.readOnly || this.clipboard.length === 0) return;
    this.pasteCount++;
    let n = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
    for (const x of this.clipboard) {
      const b = x.h === "auto" ? 100 : x.h;
      x.x < n && (n = x.x), x.y < r && (r = x.y), x.x + x.w > s && (s = x.x + x.w), x.y + b > i && (i = x.y + b);
    }
    const l = (n + s) / 2, d = (r + i) / 2;
    let c, a;
    if (e !== void 0 && o !== void 0)
      c = e, a = o;
    else {
      const x = this.getWindow(), b = x.innerWidth / 2, w = x.innerHeight / 2, M = un(this.viewport, b, w);
      c = M.x, a = M.y;
    }
    const u = this.pasteCount * 20, f = c - l + u, y = a - d + u, p = /* @__PURE__ */ new Map(), g = this.clipboard.map((x) => {
      const b = Rt();
      return p.set(x.id, b), {
        ...structuredClone(x),
        id: b,
        x: x.x + f,
        y: x.y + y,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const x of g)
      if (x.type === "edge" && x.data) {
        const b = x.data;
        p.has(b.fromId) && (b.fromId = p.get(b.fromId)), p.has(b.toId) && (b.toId = p.get(b.toId));
      }
    const m = /* @__PURE__ */ new Map();
    for (const x of g)
      x.groupId && (m.has(x.groupId) || m.set(x.groupId, Rt(10)), x.groupId = m.get(x.groupId));
    for (const [x, b] of this.groupParent)
      m.has(x) && m.has(b) && this.linkGroupParent(m.get(x), m.get(b));
    this.addNodes(g), this.selectMultiple(g.map((x) => x.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, n) {
    const r = Ba.find((y) => y.id === e);
    if (!r) return;
    const s = structuredClone(r.nodes), i = /* @__PURE__ */ new Map();
    for (const y of s) {
      const p = Rt(10);
      i.set(y.id, p), y.id = p;
    }
    for (const y of s) {
      if (y.type === "edge" && y.data) {
        const p = y.data;
        i.has(p.fromId) && (p.fromId = i.get(p.fromId)), i.has(p.toId) && (p.toId = i.get(p.toId));
      }
      y.groupId && i.has(y.groupId) && (y.groupId = i.get(y.groupId));
    }
    let l = 1 / 0, d = 1 / 0, c = -1 / 0, a = -1 / 0;
    for (const y of s) {
      if (y.type === "edge") continue;
      const p = y.h === "auto" ? 100 : y.h;
      l = Math.min(l, y.x), d = Math.min(d, y.y), c = Math.max(c, y.x + y.w), a = Math.max(a, y.y + p);
    }
    const u = o - (l + c) / 2, f = n - (d + a) / 2;
    for (const y of s)
      y.type !== "edge" && (y.x += u, y.y += f), y.z = this.nextZValue++;
    this.addNodes(s), this.selectMultiple(s.map((y) => y.id));
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
  /** End a coalesced inspector/gesture history session (see `updateNodeWithHistoryCoalesced`). */
  endHistoryCoalesce() {
    this._historyCoalesceKey = null;
  }
  pushHistorySnapshot() {
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent), this.emit("history");
  }
  /*private*/
  rebuildQuadTree() {
    this.quadTree.clear(), this.adjacency.clear();
    let e = 0, o = 0;
    for (const n of this.nodes.values())
      if (this.quadTree.insert(n), n.z < e && (e = n.z), n.z > o && (o = n.z), n.type === "edge") {
        const r = n, { fromId: s, toId: i } = r.data;
        this.adjacency.has(s) || this.adjacency.set(s, /* @__PURE__ */ new Set()), this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.get(s).add(n.id), this.adjacency.get(i).add(n.id);
      }
    this._minZ = e, this.nextZValue = o + 1;
  }
  undo() {
    if (this.readOnly) return;
    const e = this.history.undo(this.nodes, this.groupParent);
    e && (this._historyCoalesceKey = null, this.nodes = e.nodes, this.groupParent = e.groupParent, this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), this.selection.clear(), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("selection"), this.emit("history"));
  }
  redo() {
    if (this.readOnly) return;
    const e = this.history.redo(this.nodes, this.groupParent);
    e && (this._historyCoalesceKey = null, this.nodes = e.nodes, this.groupParent = e.groupParent, this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), this.selection.clear(), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("selection"), this.emit("history"));
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
      const o = e, { fromId: n, toId: r } = o.data;
      this.adjacency.has(n) || this.adjacency.set(n, /* @__PURE__ */ new Set()), this.adjacency.has(r) || this.adjacency.set(r, /* @__PURE__ */ new Set()), this.adjacency.get(n).add(e.id), this.adjacency.get(r).add(e.id);
    }
    e.z >= this.nextZValue && (this.nextZValue = e.z + 1), e.z < this._minZ && (this._minZ = e.z), this._suppressEvents = !1, this.refreshSearchIfNeeded();
  }
  /** Delete a remote node without emitting events or pushing history. */
  deleteRemoteNode(e) {
    var n;
    this._suppressEvents = !0;
    const o = this.nodes.get(e);
    if (o) {
      this.quadTree.remove(o), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
      for (const r of this.frameChildren.values()) r.delete(e);
      for (const [r, s] of this.nodes)
        if (s.type === "edge") {
          const i = s.data;
          if (i.fromId === e || i.toId === e) {
            const l = this.nodes.get(r);
            l && this.quadTree.remove(l), this.nodes.delete(r), this.selection.delete(r);
            const d = i.fromId === e ? i.toId : i.fromId;
            (n = this.adjacency.get(d)) == null || n.delete(r);
          }
        }
    }
    this._suppressEvents = !1, this.refreshSearchIfNeeded();
  }
  /** Apply a remote node update without emitting events or pushing history. */
  applyRemoteNodeUpdate(e, o) {
    this._suppressEvents = !0;
    const n = this.nodes.get(e);
    if (n) {
      const r = { ...n, ...o };
      o.data && typeof o.data == "object" && n.data && typeof n.data == "object" && (r.data = {
        ...n.data,
        ...o.data
      }), this.nodes.set(e, r), (n.x !== r.x || n.y !== r.y || n.w !== r.w || n.h !== r.h) && (this.quadTree.remove(n), this.quadTree.insert(r), this.updateConnectedEdges(e)), r.z >= this.nextZValue && (this.nextZValue = r.z + 1), o.data && this.refreshSearchIfNeeded();
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
  /** Emit edge creation drag progress for collab preview. */
  notifyEdgeProgress(e) {
    this.emit("edge:progress", e);
  }
  /** Emit when edge creation drag ends (commit or cancel). */
  notifyEdgeEnd() {
    this.emit("edge:end");
  }
  /** Frame / text / note / sticky rectangle drag preview for collab. */
  notifyRectDragProgress(e) {
    this.emit("rectDrag:progress", e);
  }
  notifyRectDragEnd() {
    this.emit("rectDrag:end");
  }
  /** Eraser drag trail + marked node IDs for collab preview. */
  notifyEraserProgress(e) {
    this.emit("eraser:progress", e);
  }
  notifyEraserEnd() {
    this.emit("eraser:end");
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
    return ud(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: n } = await bd(e);
    n.background && (this.boardBackground = n.background, this.emit("background")), n.originView ? this.originView = n.originView : this.originView = null;
    let r = 0, s = 0;
    for (const i of o)
      this.nodes.set(i.id, i), i.z > r && (r = i.z), i.z < s && (s = i.z);
    this.rebuildQuadTree(), this.rebuildFrameChildren(), this.nextZValue = r + 1, this._minZ = s, this.selection.clear(), this.refreshSearchIfNeeded(), this.goToOriginView(), this.emit("change"), this.emit("selection"), this.emit("history");
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
const th = /* @__PURE__ */ new Set([
  "content",
  "draw",
  "shape",
  "edge",
  "image",
  "text",
  "frame",
  "sticky",
  "youtube"
]);
function eh(t) {
  var o, n;
  const e = ((o = t.docs) == null ? void 0 : o.id) ?? t.type;
  return {
    type: t.type,
    origin: th.has(t.type) ? "builtin" : "custom",
    docsLocalizationKey: e,
    isDataFlow: !!((n = t.ports) != null && n.length),
    ports: (t.ports ?? []).map((r) => ({
      id: r.id,
      label: r.label,
      direction: r.direction,
      dataType: r.dataType,
      defaultValue: r.defaultValue
    })),
    portAnchor: t.portAnchor,
    hasCompute: typeof t.compute == "function",
    isContainer: !!t.isContainer,
    isSVGOnly: !!t.isSVGOnly,
    handlesOwnLayout: !!t.handlesOwnLayout,
    hasPropertiesPanel: typeof t.propertiesPanel == "function"
  };
}
class oh {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kt(this, "types", /* @__PURE__ */ new Map());
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
  /**
   * JSON-safe list of every registered type, sorted by `type`.
   * For MCP / LLM agents: pair with app `localization.customNodeDocs` for prose usage hints.
   */
  toCatalog() {
    return this.getAll().map((e) => eh(e)).sort((e, o) => e.type.localeCompare(o.type));
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
const Wi = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], nh = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function Mr(t, e) {
  const o = Wi.indexOf(t);
  if (o === -1) return "default";
  const n = (e % 360 + 360) % 360, r = Math.round(n / 45) % 8, s = (o + r) % 8;
  return nh[Wi[s]];
}
function Ts(t, e, o, n, r, s, i, l, d) {
  if (!(t === "nw" || t === "ne" || t === "sw" || t === "se") || n <= 0 || r <= 0 || l <= 0 || d <= 0)
    return { x: s, y: i, w: l, h: d };
  const a = n / r;
  let u = l, f = d;
  u / f > a ? u = f * a : f = u / a;
  let y = s, p = i;
  return t === "se" ? (y = e, p = o) : t === "ne" ? (y = e, p = o + r - f) : t === "sw" ? (y = e + n - u, p = o) : (y = e + n - u, p = o + r - f), { x: y, y: p, w: u, h: f };
}
class rh extends Lc {
  constructor() {
    super(...arguments);
    kt(this, "state", { hasError: !1 });
  }
  static getDerivedStateFromError() {
    return { hasError: !0 };
  }
  componentDidCatch(o, n) {
    console.error("[ContentBlock] Editor mount failed, showing markdown fallback:", o, n);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
function Bi({ markdown: t }) {
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
const sh = 0, ih = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function ah(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function lh({
  node: t,
  isSelected: e,
  multiSelected: o,
  engine: n,
  schema: r,
  interactive: s,
  zoom: i,
  onMeasuredHeight: l,
  autoEdit: d
}) {
  const c = ut(null), a = ut(d === !0), u = ut(!1), f = ut(!1), y = ut(!1), p = ut(!1), g = ut(JSON.stringify(t.data.blocks ?? [])), [m, x] = et(!1), [b, w] = et(!1), M = ut(null), v = Wc({ schema: r }), C = ut(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  St(() => {
    const W = C.current;
    if (!W) return;
    C.current = null;
    const B = requestAnimationFrame(() => {
      try {
        v.replaceBlocks(v.document, W), g.current = JSON.stringify(v.document);
        return;
      } catch {
      }
      try {
        const G = v.blocksToHTMLLossy(W);
        v._tiptapEditor.commands.setContent(G), g.current = JSON.stringify(v.document);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), w(!0);
    });
    return () => cancelAnimationFrame(B);
  }, [v]), St(() => {
    (!e || o) && x(!1);
  }, [e, o]), St(() => {
    a.current && (a.current = !1, u.current = !0, x(!0));
  }, [v]), St(() => {
    if (!m || !u.current && !M.current) return;
    const W = M.current;
    M.current = null, u.current = !1;
    const B = requestAnimationFrame(() => {
      if (v.focus(), W)
        try {
          const G = v._tiptapEditor, J = G.view.posAtCoords({ left: W.x, top: W.y });
          J && G.commands.setTextSelection(J.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(B);
  }, [m, v]);
  const T = lt(() => {
    if (f.current || y.current) return;
    const W = n.getNode(t.id), B = v.document;
    g.current = JSON.stringify(B), n.updateNode(t.id, {
      data: { ...W == null ? void 0 : W.data, blocks: B }
    });
  }, [v, n, t.id]), E = 100;
  St(() => {
    if (!v) return;
    let W = null, B = 0;
    const G = () => {
      var U, tt;
      if (f.current || y.current || p.current) return;
      const J = v.document.length, H = n.getNode(t.id), $ = ((tt = (U = H == null ? void 0 : H.data) == null ? void 0 : U.blocks) == null ? void 0 : tt.length) ?? 0;
      if (J < $) return;
      const st = Date.now(), it = st - B;
      if (it >= E) {
        B = st, T();
        return;
      }
      W && clearTimeout(W), W = setTimeout(() => {
        W = null, B = Date.now(), T();
      }, E - it);
    }, q = v.onChange(G);
    return () => {
      q == null || q(), W && clearTimeout(W);
    };
  }, [v, T, n, t.id]), St(() => {
    const W = c.current;
    if (!W) return;
    const B = (G) => {
      const q = G.relatedTarget;
      q && W.contains(q) || T();
    };
    return W.addEventListener("focusout", B), () => W.removeEventListener("focusout", B);
  }, [T]), St(() => {
    if (m) return;
    const W = t.data.blocks;
    if (!Array.isArray(W)) return;
    const B = W.length > 0 ? W : [{ type: "paragraph", content: [] }], G = JSON.stringify(B);
    if (G !== g.current) {
      p.current = !0;
      try {
        v.replaceBlocks(v.document, B);
      } catch {
        try {
          const q = v.blocksToHTMLLossy(B);
          v._tiptapEditor.commands.setContent(q);
        } catch {
          p.current = !1;
          return;
        }
      }
      p.current = !1, g.current = G;
    }
  }, [t.data.blocks, m, v]), St(() => {
    if (t.h !== "auto" || !l) return;
    const W = c.current;
    if (!W) return;
    const B = () => {
      const q = W.offsetHeight;
      q > 0 && l(t.id, q);
    };
    B();
    const G = new ResizeObserver(B);
    return G.observe(W), () => G.disconnect();
  }, [t.id, t.h, l]);
  const z = lt(() => {
    const W = n.getNode(t.id);
    if (!W || W.h === "auto" || !v || !c.current)
      return;
    const B = W.h - sh, G = c.current.querySelector(".bn-editor");
    if (!G) return;
    const q = v.document;
    if (q.length === 0) return;
    let J = 0;
    for (let it = q.length - 1; it >= 1 && ah(q[it]); it--)
      J++;
    const H = G.scrollHeight, $ = q.length > 0 ? H / q.length : 36;
    if (f.current = !0, H < B) {
      const it = B - H, U = Math.max(0, Math.floor(it / $));
      if (U > 0) {
        const tt = q[q.length - 1];
        v.insertBlocks(
          Array.from({ length: U }, () => ({
            type: "paragraph",
            content: []
          })),
          tt,
          "after"
        );
      }
    } else if (H > B && J > 0) {
      const it = H - B, U = Math.min(J, Math.ceil(it / $));
      if (U > 0) {
        const tt = q.slice(q.length - U);
        v.removeBlocks(tt);
      }
    }
    const st = n.getNode(t.id);
    st && (n.updateNode(t.id, {
      data: { ...st.data, blocks: v.document }
    }), g.current = JSON.stringify(v.document)), f.current = !1;
  }, [v, n, t.id]), j = ut(z);
  j.current = z, St(() => {
    if (t.h === "auto") return;
    const W = setTimeout(() => j.current(), 60);
    return () => clearTimeout(W);
  }, []);
  const Y = lt(
    (W) => {
      const B = W.currentTarget.ownerDocument;
      if (W.altKey) return;
      if (!n.selection.has(t.id) && n.selection.size > 0) {
        const { x: gt, y: ft } = n.screenToCanvas(W.clientX, W.clientY);
        for (const wt of n.selection) {
          const zt = n.getNode(wt);
          if (!zt) continue;
          const Ft = zt.h === "auto" ? 100 : zt.h;
          if (gt >= zt.x && gt <= zt.x + zt.w && ft >= zt.y && ft <= zt.y + Ft)
            return;
        }
      }
      W.stopPropagation(), W.preventDefault(), W.currentTarget.setPointerCapture(W.pointerId), W.shiftKey ? n.toggleSelect(t.id) : n.selection.has(t.id) || n.select(t.id);
      const G = W.clientX, q = W.clientY, J = Array.from(n.selection), H = J.map((gt) => {
        const ft = n.getNode(gt);
        return { id: gt, x: ft.x, y: ft.y };
      });
      let $ = !1, st = null, it = G, U = q, tt = !1;
      const dt = () => {
        st = null;
        const gt = (it - G) / n.viewport.zoom, ft = (U - q) / n.viewport.zoom, { finalDx: wt, finalDy: zt } = n.computeDragSnap(
          H,
          J,
          gt,
          ft,
          tt
        ), Ft = H.map((Et) => ({
          id: Et.id,
          patch: { x: Et.x + wt, y: Et.y + zt }
        }));
        n.updateMany(Ft);
      }, _ = (gt) => {
        const ft = (gt.clientX - G) / n.viewport.zoom, wt = (gt.clientY - q) / n.viewport.zoom;
        if (!$)
          if (Math.abs(ft) > 2 || Math.abs(wt) > 2)
            $ = !0, y.current = !0, n.pushHistorySnapshot();
          else
            return;
        it = gt.clientX, U = gt.clientY, tt = gt.metaKey || gt.ctrlKey, st === null && (st = requestAnimationFrame(dt));
      }, ht = () => {
        y.current = !1, st !== null && (cancelAnimationFrame(st), dt()), n.clearAlignGuides(), B.removeEventListener("pointermove", _), B.removeEventListener("pointerup", ht);
      };
      B.addEventListener("pointermove", _), B.addEventListener("pointerup", ht);
    },
    [n, t.id]
  ), nt = lt(
    (W) => {
      var _;
      const B = W.currentTarget.ownerDocument;
      W.stopPropagation(), W.preventDefault();
      const G = t.h === "auto" ? (((_ = c.current) == null ? void 0 : _.getBoundingClientRect().height) ?? 60) / n.viewport.zoom : t.h, q = t.x + t.w / 2, J = t.y + G / 2, H = t.rotation || 0, { x: $, y: st } = n.screenToCanvas(
        W.clientX,
        W.clientY
      ), it = Math.atan2(st - J, $ - q);
      let U = !1;
      const tt = (ht) => {
        U || (U = !0, n.pushHistorySnapshot());
        const { x: gt, y: ft } = n.screenToCanvas(ht.clientX, ht.clientY), wt = Math.atan2(ft - J, gt - q);
        let zt = H + (wt - it) * (180 / Math.PI);
        (ht.shiftKey || n.snapToGrid) && !(ht.metaKey || ht.ctrlKey) && (zt = Math.round(zt / 15) * 15), n.updateNode(t.id, { rotation: zt });
      }, dt = () => {
        B.removeEventListener("pointermove", tt), B.removeEventListener("pointerup", dt);
      };
      B.addEventListener("pointermove", tt), B.addEventListener("pointerup", dt);
    },
    [n, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), rt = lt(
    (W, B) => {
      var _;
      const G = B.currentTarget.ownerDocument;
      B.stopPropagation(), B.preventDefault();
      const q = B.clientX, J = B.clientY, H = t.x, $ = t.y, st = t.w, it = t.h === "auto" ? (((_ = c.current) == null ? void 0 : _.getBoundingClientRect().height) ?? 60) / n.viewport.zoom : t.h;
      let U = !1;
      const tt = (ht) => {
        const gt = (ht.clientX - q) / n.viewport.zoom, ft = (ht.clientY - J) / n.viewport.zoom;
        U || (U = !0, n.pushHistorySnapshot());
        let wt = H, zt = $, Ft = st, Et = it;
        if ((W === "nw" || W === "w" || W === "sw") && (wt = H + gt, Ft = st - gt), (W === "ne" || W === "e" || W === "se") && (Ft = st + gt), (W === "nw" || W === "n" || W === "ne") && (zt = $ + ft, Et = it - ft), (W === "sw" || W === "s" || W === "se") && (Et = it + ft), n.snapToGrid && !(ht.metaKey || ht.ctrlKey)) {
          const ct = n.gridSize, Bt = (Gt) => Math.round(Gt / ct) * ct;
          (W === "nw" || W === "w" || W === "sw") && (wt = Bt(wt), Ft = H + st - wt), (W === "ne" || W === "e" || W === "se") && (Ft = Bt(wt + Ft) - wt), (W === "nw" || W === "n" || W === "ne") && (zt = Bt(zt), Et = $ + it - zt), (W === "sw" || W === "s" || W === "se") && (Et = Bt(zt + Et) - zt);
        }
        if (Ft < 100 && (Ft = 100, (W === "nw" || W === "w" || W === "sw") && (wt = H + st - 100)), Et < 60 && (Et = 60, (W === "nw" || W === "n" || W === "ne") && (zt = $ + it - 60)), ht.shiftKey) {
          const ct = Ts(
            W,
            H,
            $,
            st,
            it,
            wt,
            zt,
            Ft,
            Et
          );
          wt = ct.x, zt = ct.y, Ft = ct.w, Et = ct.h;
        }
        n.updateNode(t.id, { x: wt, y: zt, w: Ft, h: Et });
      }, dt = () => {
        G.removeEventListener("pointermove", tt), G.removeEventListener("pointerup", dt), requestAnimationFrame(() => j.current());
      };
      G.addEventListener("pointermove", tt), G.addEventListener("pointerup", dt);
    },
    [n, t.id, t.x, t.y, t.w, t.h]
  ), pt = lt(
    (W) => {
      if (!W.altKey) {
        if (m) {
          W.stopPropagation();
          return;
        }
        if (e) {
          Y(W);
          return;
        }
        Y(W);
      }
    },
    [m, e, Y, n, t.id]
  ), xt = lt(
    (W) => {
      if (W.stopPropagation(), !m) {
        if (t.groupId) {
          const B = [];
          let G = t.groupId;
          for (; G; )
            B.push(G), G = n.groupParent.get(G);
          if (!n.activeGroupId) {
            n.enterGroup(B[B.length - 1]), n.select(t.id);
            return;
          }
          const q = B.indexOf(n.activeGroupId);
          if (q > 0) {
            n.enterGroup(B[q - 1]), n.select(t.id);
            return;
          }
        }
        n.select(t.id), M.current = { x: W.clientX, y: W.clientY }, x(!0);
      }
    },
    [m, n, t.id, t.groupId, v]
  ), mt = e && !o;
  return /* @__PURE__ */ S(
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
            onDoubleClick: xt,
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
                onPointerDown: pt,
                onKeyDown: m ? (W) => {
                  W.key === "Escape" && (W.stopPropagation(), x(!1));
                } : void 0,
                style: m ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: b ? /* @__PURE__ */ h(Bi, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ h(rh, { fallback: /* @__PURE__ */ h(Bi, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ h(
                  Bc,
                  {
                    editor: v,
                    theme: "light",
                    editable: s && m
                  }
                ) })
              }
            )
          }
        ),
        mt && ih.map(({ pos: W, top: B, left: G }) => {
          const q = 8 / i;
          return /* @__PURE__ */ h(
            "div",
            {
              onPointerDown: (J) => rt(W, J),
              style: {
                position: "absolute",
                top: B,
                left: G,
                width: q,
                height: q,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: Mr(W, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            W
          );
        }),
        mt && (() => {
          const W = 25 / i, B = 10 / i;
          return /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -W,
                  left: "50%",
                  width: 1.5 / i,
                  height: W,
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
                  top: -(W + B / 2),
                  left: "50%",
                  width: B,
                  height: B,
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
const Ja = Le(lh);
function ch(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    Ja,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: Gs,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const dh = {
  type: "content",
  component: ch,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: hh } = Math, Dn = hh + 1e-4, Ni = 0.5, Fi = [1, 1];
function Hi(t, e, o, n = (r) => r) {
  return t * n(0.5 - e * (0.5 - o));
}
const { min: Qr } = Math;
function $a(t, e, o) {
  let n = Qr(1, e / o);
  return Qr(1, t + (Qr(1, 1 - n) - t) * (n * 0.275));
}
function uh(t) {
  return [-t[0], -t[1]];
}
function Ue(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function Oi(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function mo(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function zs(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function go(t, e) {
  return [t[0] * e, t[1] * e];
}
function Jr(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function ph(t, e) {
  return [t[0] / e, t[1] / e];
}
function _a(t) {
  return [t[1], -t[0]];
}
function $r(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function Xi(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function fh(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function yh(t) {
  return Math.hypot(t[0], t[1]);
}
function Yi(t, e) {
  let o = t[0] - e[0], n = t[1] - e[1];
  return o * o + n * n;
}
function tl(t) {
  return ph(t, yh(t));
}
function gh(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function Zs(t, e, o) {
  let n = Math.sin(o), r = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], l = s * r - i * n, d = s * n + i * r;
  return [l + e[0], d + e[1]];
}
function Gi(t, e, o, n) {
  let r = Math.sin(n), s = Math.cos(n), i = e[0] - o[0], l = e[1] - o[1], d = i * s - l * r, c = i * r + l * s;
  return t[0] = d + o[0], t[1] = c + o[1], t;
}
function ji(t, e, o) {
  return Ue(t, go(mo(e, t), o));
}
function mh(t, e, o, n) {
  let r = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + r * n, t[1] = e[1] + s * n, t;
}
function el(t, e, o) {
  return Ue(t, go(e, o));
}
const xe = [0, 0], lo = [0, 0], co = [0, 0];
function bh(t, e) {
  let o = el(t, tl(_a(mo(t, Ue(t, [1, 1])))), -e), n = [], r = 1 / 13;
  for (let s = r; s <= 1; s += r) n.push(Zs(o, t, Dn * 2 * s));
  return n;
}
function xh(t, e, o) {
  let n = [], r = 1 / o;
  for (let s = r; s <= 1; s += r) n.push(Zs(e, t, Dn * s));
  return n;
}
function wh(t, e, o) {
  let n = mo(e, o), r = go(n, 0.5), s = go(n, 0.51);
  return [mo(t, r), mo(t, s), Ue(t, s), Ue(t, r)];
}
function kh(t, e, o, n) {
  let r = [], s = el(t, e, o), i = 1 / n;
  for (let l = i; l < 1; l += i) r.push(Zs(s, t, Dn * 3 * l));
  return r;
}
function vh(t, e, o) {
  return [Ue(t, go(e, o)), Ue(t, go(e, o * 0.99)), mo(t, go(e, o * 0.99)), mo(t, go(e, o))];
}
function Vi(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function Sh(t, e, o) {
  return t.slice(0, 10).reduce((n, r) => {
    let s = r.pressure;
    return e && (s = $a(n, r.distance, o)), (n + s) / 2;
  }, t[0].pressure);
}
function Mh(t, e = {}) {
  let { size: o = 16, smoothing: n = 0.5, thinning: r = 0.5, simulatePressure: s = !0, easing: i = (W) => W, start: l = {}, end: d = {}, last: c = !1 } = e, { cap: a = !0, easing: u = (W) => W * (2 - W) } = l, { cap: f = !0, easing: y = (W) => --W * W * W + 1 } = d;
  if (t.length === 0 || o <= 0) return [];
  let p = t[t.length - 1].runningLength, g = Vi(l.taper, o, p), m = Vi(d.taper, o, p), x = (o * n) ** 2, b = [], w = [], M = Sh(t, s, o), v = Hi(o, r, t[t.length - 1].pressure, i), C, T = t[0].vector, E = t[0].point, z = E, j = E, Y = z, nt = !1;
  for (let W = 0; W < t.length; W++) {
    let { pressure: B } = t[W], { point: G, vector: q, distance: J, runningLength: H } = t[W], $ = W === t.length - 1;
    if (!$ && p - H < 3) continue;
    r ? (s && (B = $a(M, J, o)), v = Hi(o, r, B, i)) : v = o / 2, C === void 0 && (C = v);
    let st = H < g ? u(H / g) : 1, it = p - H < m ? y((p - H) / m) : 1;
    v = Math.max(0.01, v * Math.min(st, it));
    let U = ($ ? t[W] : t[W + 1]).vector, tt = $ ? 1 : Xi(q, U), dt = Xi(q, T) < 0 && !nt, _ = tt !== null && tt < 0;
    if (dt || _) {
      $r(xe, T), Jr(xe, xe, v);
      for (let ht = 0; ht <= 1; ht += 0.07692307692307693) zs(lo, G, xe), Gi(lo, lo, G, Dn * ht), j = [lo[0], lo[1]], b.push(j), Oi(co, G, xe), Gi(co, co, G, Dn * -ht), Y = [co[0], co[1]], w.push(Y);
      E = j, z = Y, _ && (nt = !0);
      continue;
    }
    if (nt = !1, $) {
      $r(xe, q), Jr(xe, xe, v), b.push(mo(G, xe)), w.push(Ue(G, xe));
      continue;
    }
    mh(xe, U, q, tt), $r(xe, xe), Jr(xe, xe, v), zs(lo, G, xe), j = [lo[0], lo[1]], (W <= 1 || Yi(E, j) > x) && (b.push(j), E = j), Oi(co, G, xe), Y = [co[0], co[1]], (W <= 1 || Yi(z, Y) > x) && (w.push(Y), z = Y), M = B, T = q;
  }
  let rt = [t[0].point[0], t[0].point[1]], pt = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : Ue(t[0].point, [1, 1]), xt = [], mt = [];
  if (t.length === 1) {
    if (!(g || m) || c) return bh(rt, C || v);
  } else {
    g || m && t.length === 1 || (a ? xt.push(...xh(rt, w[0], 13)) : xt.push(...wh(rt, b[0], w[0])));
    let W = _a(uh(t[t.length - 1].vector));
    m || g && t.length === 1 ? mt.push(pt) : f ? mt.push(...kh(pt, W, v, 29)) : mt.push(...vh(pt, W, v));
  }
  return b.concat(mt, w.reverse(), xt);
}
const Ki = [0, 0];
function qi(t) {
  return t != null && t >= 0;
}
function Ch(t, e = {}) {
  var f;
  let { streamline: o = 0.5, size: n = 16, last: r = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: y, y: p, pressure: g = Ni }) => [y, p, g]);
  if (i.length === 2) {
    let y = i[1];
    i = i.slice(0, -1);
    for (let p = 1; p < 5; p++) i.push(ji(i[0], y, p / 4));
  }
  i.length === 1 && (i = [...i, [...Ue(i[0], Fi), ...i[0].slice(2)]]);
  let l = [{ point: [i[0][0], i[0][1]], pressure: qi(i[0][2]) ? i[0][2] : 0.25, vector: [...Fi], distance: 0, runningLength: 0 }], d = !1, c = 0, a = l[0], u = i.length - 1;
  for (let y = 1; y < i.length; y++) {
    let p = r && y === u ? [i[y][0], i[y][1]] : ji(a.point, i[y], s);
    if (fh(a.point, p)) continue;
    let g = gh(p, a.point);
    if (c += g, y < u && !d) {
      if (c < n) continue;
      d = !0;
    }
    zs(Ki, a.point, p), a = { point: p, pressure: qi(i[y][2]) ? i[y][2] : Ni, vector: tl(Ki), distance: g, runningLength: c }, l.push(a);
  }
  return l[0].vector = ((f = l[1]) == null ? void 0 : f.vector) || [0, 0], l;
}
function Ih(t, e = {}) {
  return Mh(Ch(t, e), e);
}
var Th = Ih;
function Qs(t, e = {}) {
  const o = Th(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return zh(o);
}
function zh(t) {
  if (!t.length) return "";
  const e = [], [o, n] = t[0];
  e.push("M", o, n);
  for (let r = 0; r < t.length; r++) {
    const [s, i] = t[r], [l, d] = t[(r + 1) % t.length];
    e.push("Q", s, i, (s + l) / 2, (i + d) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function ol(t, e = 0.5) {
  if (t.length < 2) return t;
  const o = 0.15 + (1 - e) * 0.85, n = [[t[0][0], t[0][1]]];
  for (let r = 1; r < t.length; r++) {
    const s = n[r - 1];
    n.push([
      s[0] + (t[r][0] - s[0]) * o,
      s[1] + (t[r][1] - s[1]) * o
    ]);
  }
  return n;
}
function Ph(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = ol(t, e), n = o.length, r = [];
  r.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < n; s++) {
    const [i, l] = o[s], [d, c] = o[(s + 1) % n];
    r.push("Q", i, l, (i + d) / 2, (l + c) / 2);
  }
  return r.push("Z"), r.join(" ");
}
function Ah(t, e, o, n) {
  const r = e[0] - t[0], s = e[1] - t[1], i = n[0] - o[0], l = n[1] - o[1], d = r * l - s * i;
  if (Math.abs(d) < 1e-10) return null;
  const c = ((o[0] - t[0]) * l - (o[1] - t[1]) * i) / d, a = ((o[0] - t[0]) * s - (o[1] - t[1]) * r) / d;
  return c <= 0 || c >= 1 || a <= 0 || a >= 1 ? null : [t[0] + c * r, t[1] + c * s];
}
function Eh(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function Ui(t) {
  let e = 0;
  for (let o = 0, n = t.length - 1; o < t.length; n = o++)
    e += (t[n][0] + t[o][0]) * (t[n][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function Lh(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let l = i + 2; l < e - 1; l++) {
      const d = Ah(
        t[i],
        t[i + 1],
        t[l],
        t[l + 1]
      );
      if (!d) continue;
      const c = [d];
      for (let a = i + 1; a <= l; a++)
        c.push(t[a]);
      Ui(c) < 100 || o.push({
        pathD: Eh(c),
        points: c.map((a) => [a[0], a[1]])
      });
    }
  if (o.length === 0) return [];
  const n = o.map((i) => Ui(i.points)), s = Math.max(...n) * 0.05;
  return o.filter((i, l) => n[l] >= s);
}
function _r(t, e, o) {
  if (t && t.length) {
    const [n, r] = e, s = Math.PI / 180 * o, i = Math.cos(s), l = Math.sin(s);
    for (const d of t) {
      const [c, a] = d;
      d[0] = (c - n) * i - (a - r) * l + n, d[1] = (c - n) * l + (a - r) * i + r;
    }
  }
}
function Rh(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Dh(t, e, o, n = 1) {
  const r = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, l = [0, 0];
  if (r) for (const c of i) _r(c, l, r);
  const d = function(c, a, u) {
    const f = [];
    for (const b of c) {
      const w = [...b];
      Rh(w[0], w[w.length - 1]) || w.push([w[0][0], w[0][1]]), w.length > 2 && f.push(w);
    }
    const y = [];
    a = Math.max(a, 0.1);
    const p = [];
    for (const b of f) for (let w = 0; w < b.length - 1; w++) {
      const M = b[w], v = b[w + 1];
      if (M[1] !== v[1]) {
        const C = Math.min(M[1], v[1]);
        p.push({ ymin: C, ymax: Math.max(M[1], v[1]), x: C === M[1] ? M[0] : v[0], islope: (v[0] - M[0]) / (v[1] - M[1]) });
      }
    }
    if (p.sort((b, w) => b.ymin < w.ymin ? -1 : b.ymin > w.ymin ? 1 : b.x < w.x ? -1 : b.x > w.x ? 1 : b.ymax === w.ymax ? 0 : (b.ymax - w.ymax) / Math.abs(b.ymax - w.ymax)), !p.length) return y;
    let g = [], m = p[0].ymin, x = 0;
    for (; g.length || p.length; ) {
      if (p.length) {
        let b = -1;
        for (let w = 0; w < p.length && !(p[w].ymin > m); w++) b = w;
        p.splice(0, b + 1).forEach((w) => {
          g.push({ s: m, edge: w });
        });
      }
      if (g = g.filter((b) => !(b.edge.ymax <= m)), g.sort((b, w) => b.edge.x === w.edge.x ? 0 : (b.edge.x - w.edge.x) / Math.abs(b.edge.x - w.edge.x)), (u !== 1 || x % a == 0) && g.length > 1) for (let b = 0; b < g.length; b += 2) {
        const w = b + 1;
        if (w >= g.length) break;
        const M = g[b].edge, v = g[w].edge;
        y.push([[Math.round(M.x), m], [Math.round(v.x), m]]);
      }
      m += u, g.forEach((b) => {
        b.edge.x = b.edge.x + u * b.edge.islope;
      }), x++;
    }
    return y;
  }(i, s, n);
  if (r) {
    for (const c of i) _r(c, l, -r);
    (function(c, a, u) {
      const f = [];
      c.forEach((y) => f.push(...y)), _r(f, a, u);
    })(d, l, -r);
  }
  return d;
}
function Fn(t, e) {
  var o;
  const n = e.hachureAngle + 90;
  let r = e.hachureGap;
  r < 0 && (r = 4 * e.strokeWidth), r = Math.round(Math.max(r, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = r), Dh(t, r, n, s || 1);
}
class Js {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const n = Fn(e, o);
    return { type: "fillSketch", ops: this.renderLines(n, o) };
  }
  renderLines(e, o) {
    const n = [];
    for (const r of e) n.push(...this.helper.doubleLineOps(r[0][0], r[0][1], r[1][0], r[1][1], o));
    return n;
  }
}
function Cr(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class Wh extends Js {
  fillPolygons(e, o) {
    let n = o.hachureGap;
    n < 0 && (n = 4 * o.strokeWidth), n = Math.max(n, 0.1);
    const r = Fn(e, Object.assign({}, o, { hachureGap: n })), s = Math.PI / 180 * o.hachureAngle, i = [], l = 0.5 * n * Math.cos(s), d = 0.5 * n * Math.sin(s);
    for (const [c, a] of r) Cr([c, a]) && i.push([[c[0] - l, c[1] + d], [...a]], [[c[0] + l, c[1] - d], [...a]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class Bh extends Js {
  fillPolygons(e, o) {
    const n = this._fillPolygons(e, o), r = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, r);
    return n.ops = n.ops.concat(s.ops), n;
  }
}
class Nh {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = Fn(e, o = Object.assign({}, o, { hachureAngle: 0 }));
    return this.dotsOnLines(n, o);
  }
  dotsOnLines(e, o) {
    const n = [];
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    let s = o.fillWeight;
    s < 0 && (s = o.strokeWidth / 2);
    const i = r / 4;
    for (const l of e) {
      const d = Cr(l), c = d / r, a = Math.ceil(c) - 1, u = d - a * r, f = (l[0][0] + l[1][0]) / 2 - r / 4, y = Math.min(l[0][1], l[1][1]);
      for (let p = 0; p < a; p++) {
        const g = y + u + p * r, m = f - i + 2 * Math.random() * i, x = g - i + 2 * Math.random() * i, b = this.helper.ellipse(m, x, s, s, o);
        n.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: n };
  }
}
class Fh {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = Fn(e, o);
    return { type: "fillSketch", ops: this.dashedLine(n, o) };
  }
  dashedLine(e, o) {
    const n = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, r = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const l = Cr(i), d = Math.floor(l / (n + r)), c = (l + r - d * (n + r)) / 2;
      let a = i[0], u = i[1];
      a[0] > u[0] && (a = i[1], u = i[0]);
      const f = Math.atan((u[1] - a[1]) / (u[0] - a[0]));
      for (let y = 0; y < d; y++) {
        const p = y * (n + r), g = p + n, m = [a[0] + p * Math.cos(f) + c * Math.cos(f), a[1] + p * Math.sin(f) + c * Math.sin(f)], x = [a[0] + g * Math.cos(f) + c * Math.cos(f), a[1] + g * Math.sin(f) + c * Math.sin(f)];
        s.push(...this.helper.doubleLineOps(m[0], m[1], x[0], x[1], o));
      }
    }), s;
  }
}
class Hh {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, r = o.zigzagOffset < 0 ? n : o.zigzagOffset, s = Fn(e, o = Object.assign({}, o, { hachureGap: n + r }));
    return { type: "fillSketch", ops: this.zigzagLines(s, r, o) };
  }
  zigzagLines(e, o, n) {
    const r = [];
    return e.forEach((s) => {
      const i = Cr(s), l = Math.round(i / (2 * o));
      let d = s[0], c = s[1];
      d[0] > c[0] && (d = s[1], c = s[0]);
      const a = Math.atan((c[1] - d[1]) / (c[0] - d[0]));
      for (let u = 0; u < l; u++) {
        const f = 2 * u * o, y = 2 * (u + 1) * o, p = Math.sqrt(2 * Math.pow(o, 2)), g = [d[0] + f * Math.cos(a), d[1] + f * Math.sin(a)], m = [d[0] + y * Math.cos(a), d[1] + y * Math.sin(a)], x = [g[0] + p * Math.cos(a + Math.PI / 4), g[1] + p * Math.sin(a + Math.PI / 4)];
        r.push(...this.helper.doubleLineOps(g[0], g[1], x[0], x[1], n), ...this.helper.doubleLineOps(x[0], x[1], m[0], m[1], n));
      }
    }), r;
  }
}
const Te = {};
let Oh = class {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
};
const Xh = 0, ts = 1, Zi = 2, er = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function es(t, e) {
  return t.type === e;
}
function $s(t) {
  const e = [], o = function(i) {
    const l = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) l[l.length] = { type: Xh, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      l[l.length] = { type: ts, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return l[l.length] = { type: Zi, text: "" }, l;
  }(t);
  let n = "BOD", r = 0, s = o[r];
  for (; !es(s, Zi); ) {
    let i = 0;
    const l = [];
    if (n === "BOD") {
      if (s.text !== "M" && s.text !== "m") return $s("M0,0" + t);
      r++, i = er[s.text], n = s.text;
    } else es(s, ts) ? i = er[n] : (r++, i = er[s.text], n = s.text);
    if (!(r + i < o.length)) throw new Error("Path data ended short");
    for (let d = r; d < r + i; d++) {
      const c = o[d];
      if (!es(c, ts)) throw new Error("Param not a number: " + n + "," + c.text);
      l[l.length] = +c.text;
    }
    if (typeof er[n] != "number") throw new Error("Bad segment: " + n);
    {
      const d = { key: n, data: l };
      e.push(d), r += i, s = o[r], n === "M" && (n = "L"), n === "m" && (n = "l");
    }
  }
  return e;
}
function nl(t) {
  let e = 0, o = 0, n = 0, r = 0;
  const s = [];
  for (const { key: i, data: l } of t) switch (i) {
    case "M":
      s.push({ key: "M", data: [...l] }), [e, o] = l, [n, r] = l;
      break;
    case "m":
      e += l[0], o += l[1], s.push({ key: "M", data: [e, o] }), n = e, r = o;
      break;
    case "L":
      s.push({ key: "L", data: [...l] }), [e, o] = l;
      break;
    case "l":
      e += l[0], o += l[1], s.push({ key: "L", data: [e, o] });
      break;
    case "C":
      s.push({ key: "C", data: [...l] }), e = l[4], o = l[5];
      break;
    case "c": {
      const d = l.map((c, a) => a % 2 ? c + o : c + e);
      s.push({ key: "C", data: d }), e = d[4], o = d[5];
      break;
    }
    case "Q":
      s.push({ key: "Q", data: [...l] }), e = l[2], o = l[3];
      break;
    case "q": {
      const d = l.map((c, a) => a % 2 ? c + o : c + e);
      s.push({ key: "Q", data: d }), e = d[2], o = d[3];
      break;
    }
    case "A":
      s.push({ key: "A", data: [...l] }), e = l[5], o = l[6];
      break;
    case "a":
      e += l[5], o += l[6], s.push({ key: "A", data: [l[0], l[1], l[2], l[3], l[4], e, o] });
      break;
    case "H":
      s.push({ key: "H", data: [...l] }), e = l[0];
      break;
    case "h":
      e += l[0], s.push({ key: "H", data: [e] });
      break;
    case "V":
      s.push({ key: "V", data: [...l] }), o = l[0];
      break;
    case "v":
      o += l[0], s.push({ key: "V", data: [o] });
      break;
    case "S":
      s.push({ key: "S", data: [...l] }), e = l[2], o = l[3];
      break;
    case "s": {
      const d = l.map((c, a) => a % 2 ? c + o : c + e);
      s.push({ key: "S", data: d }), e = d[2], o = d[3];
      break;
    }
    case "T":
      s.push({ key: "T", data: [...l] }), e = l[0], o = l[1];
      break;
    case "t":
      e += l[0], o += l[1], s.push({ key: "T", data: [e, o] });
      break;
    case "Z":
    case "z":
      s.push({ key: "Z", data: [] }), e = n, o = r;
  }
  return s;
}
function rl(t) {
  const e = [];
  let o = "", n = 0, r = 0, s = 0, i = 0, l = 0, d = 0;
  for (const { key: c, data: a } of t) {
    switch (c) {
      case "M":
        e.push({ key: "M", data: [...a] }), [n, r] = a, [s, i] = a;
        break;
      case "C":
        e.push({ key: "C", data: [...a] }), n = a[4], r = a[5], l = a[2], d = a[3];
        break;
      case "L":
        e.push({ key: "L", data: [...a] }), [n, r] = a;
        break;
      case "H":
        n = a[0], e.push({ key: "L", data: [n, r] });
        break;
      case "V":
        r = a[0], e.push({ key: "L", data: [n, r] });
        break;
      case "S": {
        let u = 0, f = 0;
        o === "C" || o === "S" ? (u = n + (n - l), f = r + (r - d)) : (u = n, f = r), e.push({ key: "C", data: [u, f, ...a] }), l = a[0], d = a[1], n = a[2], r = a[3];
        break;
      }
      case "T": {
        const [u, f] = a;
        let y = 0, p = 0;
        o === "Q" || o === "T" ? (y = n + (n - l), p = r + (r - d)) : (y = n, p = r);
        const g = n + 2 * (y - n) / 3, m = r + 2 * (p - r) / 3, x = u + 2 * (y - u) / 3, b = f + 2 * (p - f) / 3;
        e.push({ key: "C", data: [g, m, x, b, u, f] }), l = y, d = p, n = u, r = f;
        break;
      }
      case "Q": {
        const [u, f, y, p] = a, g = n + 2 * (u - n) / 3, m = r + 2 * (f - r) / 3, x = y + 2 * (u - y) / 3, b = p + 2 * (f - p) / 3;
        e.push({ key: "C", data: [g, m, x, b, y, p] }), l = u, d = f, n = y, r = p;
        break;
      }
      case "A": {
        const u = Math.abs(a[0]), f = Math.abs(a[1]), y = a[2], p = a[3], g = a[4], m = a[5], x = a[6];
        u === 0 || f === 0 ? (e.push({ key: "C", data: [n, r, m, x, m, x] }), n = m, r = x) : (n !== m || r !== x) && (sl(n, r, m, x, u, f, y, p, g).forEach(function(b) {
          e.push({ key: "C", data: b });
        }), n = m, r = x);
        break;
      }
      case "Z":
        e.push({ key: "Z", data: [] }), n = s, r = i;
    }
    o = c;
  }
  return e;
}
function In(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function sl(t, e, o, n, r, s, i, l, d, c) {
  const a = (u = i, Math.PI * u / 180);
  var u;
  let f = [], y = 0, p = 0, g = 0, m = 0;
  if (c) [y, p, g, m] = c;
  else {
    [t, e] = In(t, e, -a), [o, n] = In(o, n, -a);
    const rt = (t - o) / 2, pt = (e - n) / 2;
    let xt = rt * rt / (r * r) + pt * pt / (s * s);
    xt > 1 && (xt = Math.sqrt(xt), r *= xt, s *= xt);
    const mt = r * r, W = s * s, B = mt * W - mt * pt * pt - W * rt * rt, G = mt * pt * pt + W * rt * rt, q = (l === d ? -1 : 1) * Math.sqrt(Math.abs(B / G));
    g = q * r * pt / s + (t + o) / 2, m = q * -s * rt / r + (e + n) / 2, y = Math.asin(parseFloat(((e - m) / s).toFixed(9))), p = Math.asin(parseFloat(((n - m) / s).toFixed(9))), t < g && (y = Math.PI - y), o < g && (p = Math.PI - p), y < 0 && (y = 2 * Math.PI + y), p < 0 && (p = 2 * Math.PI + p), d && y > p && (y -= 2 * Math.PI), !d && p > y && (p -= 2 * Math.PI);
  }
  let x = p - y;
  if (Math.abs(x) > 120 * Math.PI / 180) {
    const rt = p, pt = o, xt = n;
    p = d && p > y ? y + 120 * Math.PI / 180 * 1 : y + 120 * Math.PI / 180 * -1, f = sl(o = g + r * Math.cos(p), n = m + s * Math.sin(p), pt, xt, r, s, i, 0, d, [p, rt, g, m]);
  }
  x = p - y;
  const b = Math.cos(y), w = Math.sin(y), M = Math.cos(p), v = Math.sin(p), C = Math.tan(x / 4), T = 4 / 3 * r * C, E = 4 / 3 * s * C, z = [t, e], j = [t + T * w, e - E * b], Y = [o + T * v, n - E * M], nt = [o, n];
  if (j[0] = 2 * z[0] - j[0], j[1] = 2 * z[1] - j[1], c) return [j, Y, nt].concat(f);
  {
    f = [j, Y, nt].concat(f);
    const rt = [];
    for (let pt = 0; pt < f.length; pt += 3) {
      const xt = In(f[pt][0], f[pt][1], a), mt = In(f[pt + 1][0], f[pt + 1][1], a), W = In(f[pt + 2][0], f[pt + 2][1], a);
      rt.push([xt[0], xt[1], mt[0], mt[1], W[0], W[1]]);
    }
    return rt;
  }
}
const Yh = { randOffset: function(t, e) {
  return jt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return gr(t, e, o);
}, ellipse: function(t, e, o, n, r) {
  const s = al(o, n, r);
  return Ps(t, e, r, s).opset;
}, doubleLineOps: function(t, e, o, n, r) {
  return vo(t, e, o, n, r, !0);
} };
function il(t, e, o, n, r) {
  return { type: "path", ops: vo(t, e, o, n, r) };
}
function ur(t, e, o) {
  const n = (t || []).length;
  if (n > 2) {
    const r = [];
    for (let s = 0; s < n - 1; s++) r.push(...vo(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && r.push(...vo(t[n - 1][0], t[n - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: r };
  }
  return n === 2 ? il(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function Gh(t, e, o, n, r) {
  return function(s, i) {
    return ur(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + n], [t, e + n]], r);
}
function Qi(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, n = or(o[0], 1 * (1 + 0.2 * e.roughness), e), r = e.disableMultiStroke ? [] : or(o[0], 1.5 * (1 + 0.22 * e.roughness), _i(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const l = or(i, 1 * (1 + 0.2 * e.roughness), e), d = e.disableMultiStroke ? [] : or(i, 1.5 * (1 + 0.22 * e.roughness), _i(e));
        for (const c of l) c.op !== "move" && n.push(c);
        for (const c of d) c.op !== "move" && r.push(c);
      }
    }
    return { type: "path", ops: n.concat(r) };
  }
  return { type: "path", ops: [] };
}
function al(t, e, o) {
  const n = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), r = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * n)), s = 2 * Math.PI / r;
  let i = Math.abs(t / 2), l = Math.abs(e / 2);
  const d = 1 - o.curveFitting;
  return i += jt(i * d, o), l += jt(l * d, o), { increment: s, rx: i, ry: l };
}
function Ps(t, e, o, n) {
  const [r, s] = ta(n.increment, t, e, n.rx, n.ry, 1, n.increment * gr(0.1, gr(0.4, 1, o), o), o);
  let i = mr(r, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [l] = ta(n.increment, t, e, n.rx, n.ry, 1.5, 0, o), d = mr(l, null, o);
    i = i.concat(d);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function Ji(t, e, o, n, r, s, i, l, d) {
  const c = t, a = e;
  let u = Math.abs(o / 2), f = Math.abs(n / 2);
  u += jt(0.01 * u, d), f += jt(0.01 * f, d);
  let y = r, p = s;
  for (; y < 0; ) y += 2 * Math.PI, p += 2 * Math.PI;
  p - y > 2 * Math.PI && (y = 0, p = 2 * Math.PI);
  const g = 2 * Math.PI / d.curveStepCount, m = Math.min(g / 2, (p - y) / 2), x = ea(m, c, a, u, f, y, p, 1, d);
  if (!d.disableMultiStroke) {
    const b = ea(m, c, a, u, f, y, p, 1.5, d);
    x.push(...b);
  }
  return i && (l ? x.push(...vo(c, a, c + u * Math.cos(y), a + f * Math.sin(y), d), ...vo(c, a, c + u * Math.cos(p), a + f * Math.sin(p), d)) : x.push({ op: "lineTo", data: [c, a] }, { op: "lineTo", data: [c + u * Math.cos(y), a + f * Math.sin(y)] })), { type: "path", ops: x };
}
function $i(t, e) {
  const o = rl(nl($s(t))), n = [];
  let r = [0, 0], s = [0, 0];
  for (const { key: i, data: l } of o) switch (i) {
    case "M":
      s = [l[0], l[1]], r = [l[0], l[1]];
      break;
    case "L":
      n.push(...vo(s[0], s[1], l[0], l[1], e)), s = [l[0], l[1]];
      break;
    case "C": {
      const [d, c, a, u, f, y] = l;
      n.push(...jh(d, c, a, u, f, y, s, e)), s = [f, y];
      break;
    }
    case "Z":
      n.push(...vo(s[0], s[1], r[0], r[1], e)), s = [r[0], r[1]];
  }
  return { type: "path", ops: n };
}
function os(t, e) {
  const o = [];
  for (const n of t) if (n.length) {
    const r = e.maxRandomnessOffset || 0, s = n.length;
    if (s > 2) {
      o.push({ op: "move", data: [n[0][0] + jt(r, e), n[0][1] + jt(r, e)] });
      for (let i = 1; i < s; i++) o.push({ op: "lineTo", data: [n[i][0] + jt(r, e), n[i][1] + jt(r, e)] });
    }
  }
  return { type: "fillPath", ops: o };
}
function en(t, e) {
  return function(o, n) {
    let r = o.fillStyle || "hachure";
    if (!Te[r]) switch (r) {
      case "zigzag":
        Te[r] || (Te[r] = new Wh(n));
        break;
      case "cross-hatch":
        Te[r] || (Te[r] = new Bh(n));
        break;
      case "dots":
        Te[r] || (Te[r] = new Nh(n));
        break;
      case "dashed":
        Te[r] || (Te[r] = new Fh(n));
        break;
      case "zigzag-line":
        Te[r] || (Te[r] = new Hh(n));
        break;
      default:
        r = "hachure", Te[r] || (Te[r] = new Js(n));
    }
    return Te[r];
  }(e, Yh).fillPolygons(t, e);
}
function _i(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function ll(t) {
  return t.randomizer || (t.randomizer = new Oh(t.seed || 0)), t.randomizer.next();
}
function gr(t, e, o, n = 1) {
  return o.roughness * n * (ll(o) * (e - t) + t);
}
function jt(t, e, o = 1) {
  return gr(-t, t, e, o);
}
function vo(t, e, o, n, r, s = !1) {
  const i = s ? r.disableMultiStrokeFill : r.disableMultiStroke, l = As(t, e, o, n, r, !0, !1);
  if (i) return l;
  const d = As(t, e, o, n, r, !0, !0);
  return l.concat(d);
}
function As(t, e, o, n, r, s, i) {
  const l = Math.pow(t - o, 2) + Math.pow(e - n, 2), d = Math.sqrt(l);
  let c = 1;
  c = d < 200 ? 1 : d > 500 ? 0.4 : -16668e-7 * d + 1.233334;
  let a = r.maxRandomnessOffset || 0;
  a * a * 100 > l && (a = d / 10);
  const u = a / 2, f = 0.2 + 0.2 * ll(r);
  let y = r.bowing * r.maxRandomnessOffset * (n - e) / 200, p = r.bowing * r.maxRandomnessOffset * (t - o) / 200;
  y = jt(y, r, c), p = jt(p, r, c);
  const g = [], m = () => jt(u, r, c), x = () => jt(a, r, c), b = r.preserveVertices;
  return i ? g.push({ op: "move", data: [t + (b ? 0 : m()), e + (b ? 0 : m())] }) : g.push({ op: "move", data: [t + (b ? 0 : jt(a, r, c)), e + (b ? 0 : jt(a, r, c))] }), i ? g.push({ op: "bcurveTo", data: [y + t + (o - t) * f + m(), p + e + (n - e) * f + m(), y + t + 2 * (o - t) * f + m(), p + e + 2 * (n - e) * f + m(), o + (b ? 0 : m()), n + (b ? 0 : m())] }) : g.push({ op: "bcurveTo", data: [y + t + (o - t) * f + x(), p + e + (n - e) * f + x(), y + t + 2 * (o - t) * f + x(), p + e + 2 * (n - e) * f + x(), o + (b ? 0 : x()), n + (b ? 0 : x())] }), g;
}
function or(t, e, o) {
  if (!t.length) return [];
  const n = [];
  n.push([t[0][0] + jt(e, o), t[0][1] + jt(e, o)]), n.push([t[0][0] + jt(e, o), t[0][1] + jt(e, o)]);
  for (let r = 1; r < t.length; r++) n.push([t[r][0] + jt(e, o), t[r][1] + jt(e, o)]), r === t.length - 1 && n.push([t[r][0] + jt(e, o), t[r][1] + jt(e, o)]);
  return mr(n, null, o);
}
function mr(t, e, o) {
  const n = t.length, r = [];
  if (n > 3) {
    const s = [], i = 1 - o.curveTightness;
    r.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let l = 1; l + 2 < n; l++) {
      const d = t[l];
      s[0] = [d[0], d[1]], s[1] = [d[0] + (i * t[l + 1][0] - i * t[l - 1][0]) / 6, d[1] + (i * t[l + 1][1] - i * t[l - 1][1]) / 6], s[2] = [t[l + 1][0] + (i * t[l][0] - i * t[l + 2][0]) / 6, t[l + 1][1] + (i * t[l][1] - i * t[l + 2][1]) / 6], s[3] = [t[l + 1][0], t[l + 1][1]], r.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else n === 3 ? (r.push({ op: "move", data: [t[1][0], t[1][1]] }), r.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : n === 2 && r.push(...As(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return r;
}
function ta(t, e, o, n, r, s, i, l) {
  const d = [], c = [];
  if (l.roughness === 0) {
    t /= 4, c.push([e + n * Math.cos(-t), o + r * Math.sin(-t)]);
    for (let a = 0; a <= 2 * Math.PI; a += t) {
      const u = [e + n * Math.cos(a), o + r * Math.sin(a)];
      d.push(u), c.push(u);
    }
    c.push([e + n * Math.cos(0), o + r * Math.sin(0)]), c.push([e + n * Math.cos(t), o + r * Math.sin(t)]);
  } else {
    const a = jt(0.5, l) - Math.PI / 2;
    c.push([jt(s, l) + e + 0.9 * n * Math.cos(a - t), jt(s, l) + o + 0.9 * r * Math.sin(a - t)]);
    const u = 2 * Math.PI + a - 0.01;
    for (let f = a; f < u; f += t) {
      const y = [jt(s, l) + e + n * Math.cos(f), jt(s, l) + o + r * Math.sin(f)];
      d.push(y), c.push(y);
    }
    c.push([jt(s, l) + e + n * Math.cos(a + 2 * Math.PI + 0.5 * i), jt(s, l) + o + r * Math.sin(a + 2 * Math.PI + 0.5 * i)]), c.push([jt(s, l) + e + 0.98 * n * Math.cos(a + i), jt(s, l) + o + 0.98 * r * Math.sin(a + i)]), c.push([jt(s, l) + e + 0.9 * n * Math.cos(a + 0.5 * i), jt(s, l) + o + 0.9 * r * Math.sin(a + 0.5 * i)]);
  }
  return [c, d];
}
function ea(t, e, o, n, r, s, i, l, d) {
  const c = s + jt(0.1, d), a = [];
  a.push([jt(l, d) + e + 0.9 * n * Math.cos(c - t), jt(l, d) + o + 0.9 * r * Math.sin(c - t)]);
  for (let u = c; u <= i; u += t) a.push([jt(l, d) + e + n * Math.cos(u), jt(l, d) + o + r * Math.sin(u)]);
  return a.push([e + n * Math.cos(i), o + r * Math.sin(i)]), a.push([e + n * Math.cos(i), o + r * Math.sin(i)]), mr(a, null, d);
}
function jh(t, e, o, n, r, s, i, l) {
  const d = [], c = [l.maxRandomnessOffset || 1, (l.maxRandomnessOffset || 1) + 0.3];
  let a = [0, 0];
  const u = l.disableMultiStroke ? 1 : 2, f = l.preserveVertices;
  for (let y = 0; y < u; y++) y === 0 ? d.push({ op: "move", data: [i[0], i[1]] }) : d.push({ op: "move", data: [i[0] + (f ? 0 : jt(c[0], l)), i[1] + (f ? 0 : jt(c[0], l))] }), a = f ? [r, s] : [r + jt(c[y], l), s + jt(c[y], l)], d.push({ op: "bcurveTo", data: [t + jt(c[y], l), e + jt(c[y], l), o + jt(c[y], l), n + jt(c[y], l), a[0], a[1]] });
  return d;
}
function Tn(t) {
  return [...t];
}
function oa(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const n = [];
  if (o === 3) n.push(Tn(t[0]), Tn(t[1]), Tn(t[2]), Tn(t[2]));
  else {
    const r = [];
    r.push(t[0], t[0]);
    for (let l = 1; l < t.length; l++) r.push(t[l]), l === t.length - 1 && r.push(t[l]);
    const s = [], i = 1 - e;
    n.push(Tn(r[0]));
    for (let l = 1; l + 2 < r.length; l++) {
      const d = r[l];
      s[0] = [d[0], d[1]], s[1] = [d[0] + (i * r[l + 1][0] - i * r[l - 1][0]) / 6, d[1] + (i * r[l + 1][1] - i * r[l - 1][1]) / 6], s[2] = [r[l + 1][0] + (i * r[l][0] - i * r[l + 2][0]) / 6, r[l + 1][1] + (i * r[l][1] - i * r[l + 2][1]) / 6], s[3] = [r[l + 1][0], r[l + 1][1]], n.push(s[1], s[2], s[3]);
    }
  }
  return n;
}
function pr(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function Vh(t, e, o) {
  const n = pr(e, o);
  if (n === 0) return pr(t, e);
  let r = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / n;
  return r = Math.max(0, Math.min(1, r)), pr(t, No(e, o, r));
}
function No(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function Es(t, e, o, n) {
  const r = n || [];
  if (function(l, d) {
    const c = l[d + 0], a = l[d + 1], u = l[d + 2], f = l[d + 3];
    let y = 3 * a[0] - 2 * c[0] - f[0];
    y *= y;
    let p = 3 * a[1] - 2 * c[1] - f[1];
    p *= p;
    let g = 3 * u[0] - 2 * f[0] - c[0];
    g *= g;
    let m = 3 * u[1] - 2 * f[1] - c[1];
    return m *= m, y < g && (y = g), p < m && (p = m), y + p;
  }(t, e) < o) {
    const l = t[e + 0];
    r.length ? (s = r[r.length - 1], i = l, Math.sqrt(pr(s, i)) > 1 && r.push(l)) : r.push(l), r.push(t[e + 3]);
  } else {
    const d = t[e + 0], c = t[e + 1], a = t[e + 2], u = t[e + 3], f = No(d, c, 0.5), y = No(c, a, 0.5), p = No(a, u, 0.5), g = No(f, y, 0.5), m = No(y, p, 0.5), x = No(g, m, 0.5);
    Es([d, f, g, x], 0, o, r), Es([x, m, p, u], 0, o, r);
  }
  var s, i;
  return r;
}
function Kh(t, e) {
  return br(t, 0, t.length, e);
}
function br(t, e, o, n, r) {
  const s = r || [], i = t[e], l = t[o - 1];
  let d = 0, c = 1;
  for (let a = e + 1; a < o - 1; ++a) {
    const u = Vh(t[a], i, l);
    u > d && (d = u, c = a);
  }
  return Math.sqrt(d) > n ? (br(t, e, c + 1, n, s), br(t, c, o, n, s)) : (s.length || s.push(i), s.push(l)), s;
}
function ns(t, e = 0.15, o) {
  const n = [], r = (t.length - 1) / 3;
  for (let s = 0; s < r; s++)
    Es(t, 3 * s, e, n);
  return o && o > 0 ? br(n, 0, n.length, o) : n;
}
const Re = "none";
class xr {
  constructor(e) {
    this.defaultOptions = { maxRandomnessOffset: 2, roughness: 1, bowing: 1, stroke: "#000", strokeWidth: 1, curveTightness: 0, curveFitting: 0.95, curveStepCount: 9, fillStyle: "hachure", fillWeight: -1, hachureAngle: -41, hachureGap: -1, dashOffset: -1, dashGap: -1, zigzagOffset: -1, seed: 0, disableMultiStroke: !1, disableMultiStrokeFill: !1, preserveVertices: !1, fillShapeRoughnessGain: 0.8 }, this.config = e || {}, this.config.options && (this.defaultOptions = this._o(this.config.options));
  }
  static newSeed() {
    return Math.floor(Math.random() * 2 ** 31);
  }
  _o(e) {
    return e ? Object.assign({}, this.defaultOptions, e) : this.defaultOptions;
  }
  _d(e, o, n) {
    return { shape: e, sets: o || [], options: n || this.defaultOptions };
  }
  line(e, o, n, r, s) {
    const i = this._o(s);
    return this._d("line", [il(e, o, n, r, i)], i);
  }
  rectangle(e, o, n, r, s) {
    const i = this._o(s), l = [], d = Gh(e, o, n, r, i);
    if (i.fill) {
      const c = [[e, o], [e + n, o], [e + n, o + r], [e, o + r]];
      i.fillStyle === "solid" ? l.push(os([c], i)) : l.push(en([c], i));
    }
    return i.stroke !== Re && l.push(d), this._d("rectangle", l, i);
  }
  ellipse(e, o, n, r, s) {
    const i = this._o(s), l = [], d = al(n, r, i), c = Ps(e, o, i, d);
    if (i.fill) if (i.fillStyle === "solid") {
      const a = Ps(e, o, i, d).opset;
      a.type = "fillPath", l.push(a);
    } else l.push(en([c.estimatedPoints], i));
    return i.stroke !== Re && l.push(c.opset), this._d("ellipse", l, i);
  }
  circle(e, o, n, r) {
    const s = this.ellipse(e, o, n, n, r);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const n = this._o(o);
    return this._d("linearPath", [ur(e, !1, n)], n);
  }
  arc(e, o, n, r, s, i, l = !1, d) {
    const c = this._o(d), a = [], u = Ji(e, o, n, r, s, i, l, !0, c);
    if (l && c.fill) if (c.fillStyle === "solid") {
      const f = Object.assign({}, c);
      f.disableMultiStroke = !0;
      const y = Ji(e, o, n, r, s, i, !0, !1, f);
      y.type = "fillPath", a.push(y);
    } else a.push(function(f, y, p, g, m, x, b) {
      const w = f, M = y;
      let v = Math.abs(p / 2), C = Math.abs(g / 2);
      v += jt(0.01 * v, b), C += jt(0.01 * C, b);
      let T = m, E = x;
      for (; T < 0; ) T += 2 * Math.PI, E += 2 * Math.PI;
      E - T > 2 * Math.PI && (T = 0, E = 2 * Math.PI);
      const z = (E - T) / b.curveStepCount, j = [];
      for (let Y = T; Y <= E; Y += z) j.push([w + v * Math.cos(Y), M + C * Math.sin(Y)]);
      return j.push([w + v * Math.cos(E), M + C * Math.sin(E)]), j.push([w, M]), en([j], b);
    }(e, o, n, r, s, i, c));
    return c.stroke !== Re && a.push(u), this._d("arc", a, c);
  }
  curve(e, o) {
    const n = this._o(o), r = [], s = Qi(e, n);
    if (n.fill && n.fill !== Re) if (n.fillStyle === "solid") {
      const i = Qi(e, Object.assign(Object.assign({}, n), { disableMultiStroke: !0, roughness: n.roughness ? n.roughness + n.fillShapeRoughnessGain : 0 }));
      r.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], l = e;
      if (l.length) {
        const d = typeof l[0][0] == "number" ? [l] : l;
        for (const c of d) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...ns(oa([c[0], c[0], c[1], c[2]]), 10, (1 + n.roughness) / 2)) : i.push(...ns(oa(c), 10, (1 + n.roughness) / 2));
      }
      i.length && r.push(en([i], n));
    }
    return n.stroke !== Re && r.push(s), this._d("curve", r, n);
  }
  polygon(e, o) {
    const n = this._o(o), r = [], s = ur(e, !0, n);
    return n.fill && (n.fillStyle === "solid" ? r.push(os([e], n)) : r.push(en([e], n))), n.stroke !== Re && r.push(s), this._d("polygon", r, n);
  }
  path(e, o) {
    const n = this._o(o), r = [];
    if (!e) return this._d("path", r, n);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = n.fill && n.fill !== "transparent" && n.fill !== Re, i = n.stroke !== Re, l = !!(n.simplification && n.simplification < 1), d = function(a, u, f) {
      const y = rl(nl($s(a))), p = [];
      let g = [], m = [0, 0], x = [];
      const b = () => {
        x.length >= 4 && g.push(...ns(x, u)), x = [];
      }, w = () => {
        b(), g.length && (p.push(g), g = []);
      };
      for (const { key: v, data: C } of y) switch (v) {
        case "M":
          w(), m = [C[0], C[1]], g.push(m);
          break;
        case "L":
          b(), g.push([C[0], C[1]]);
          break;
        case "C":
          if (!x.length) {
            const T = g.length ? g[g.length - 1] : m;
            x.push([T[0], T[1]]);
          }
          x.push([C[0], C[1]]), x.push([C[2], C[3]]), x.push([C[4], C[5]]);
          break;
        case "Z":
          b(), g.push([m[0], m[1]]);
      }
      if (w(), !f) return p;
      const M = [];
      for (const v of p) {
        const C = Kh(v, f);
        C.length && M.push(C);
      }
      return M;
    }(e, 1, l ? 4 - 4 * (n.simplification || 1) : (1 + n.roughness) / 2), c = $i(e, n);
    if (s) if (n.fillStyle === "solid") if (d.length === 1) {
      const a = $i(e, Object.assign(Object.assign({}, n), { disableMultiStroke: !0, roughness: n.roughness ? n.roughness + n.fillShapeRoughnessGain : 0 }));
      r.push({ type: "fillPath", ops: this._mergedShape(a.ops) });
    } else r.push(os(d, n));
    else r.push(en(d, n));
    return i && (l ? d.forEach((a) => {
      r.push(ur(a, !1, n));
    }) : r.push(c)), this._d("path", r, n);
  }
  opsToPath(e, o) {
    let n = "";
    for (const r of e.ops) {
      const s = typeof o == "number" && o >= 0 ? r.data.map((i) => +i.toFixed(o)) : r.data;
      switch (r.op) {
        case "move":
          n += `M${s[0]} ${s[1]} `;
          break;
        case "bcurveTo":
          n += `C${s[0]} ${s[1]}, ${s[2]} ${s[3]}, ${s[4]} ${s[5]} `;
          break;
        case "lineTo":
          n += `L${s[0]} ${s[1]} `;
      }
    }
    return n.trim();
  }
  toPaths(e) {
    const o = e.sets || [], n = e.options || this.defaultOptions, r = [];
    for (const s of o) {
      let i = null;
      switch (s.type) {
        case "path":
          i = { d: this.opsToPath(s), stroke: n.stroke, strokeWidth: n.strokeWidth, fill: Re };
          break;
        case "fillPath":
          i = { d: this.opsToPath(s), stroke: Re, strokeWidth: 0, fill: n.fill || Re };
          break;
        case "fillSketch":
          i = this.fillSketch(s, n);
      }
      i && r.push(i);
    }
    return r;
  }
  fillSketch(e, o) {
    let n = o.fillWeight;
    return n < 0 && (n = o.strokeWidth / 2), { d: this.opsToPath(e), stroke: o.fill || Re, strokeWidth: n, fill: Re };
  }
  _mergedShape(e) {
    return e.filter((o, n) => n === 0 || o.op !== "move");
  }
}
class qh {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new xr(o);
  }
  draw(e) {
    const o = e.sets || [], n = e.options || this.getDefaultOptions(), r = this.ctx, s = e.options.fixedDecimalPlaceDigits;
    for (const i of o) switch (i.type) {
      case "path":
        r.save(), r.strokeStyle = n.stroke === "none" ? "transparent" : n.stroke, r.lineWidth = n.strokeWidth, n.strokeLineDash && r.setLineDash(n.strokeLineDash), n.strokeLineDashOffset && (r.lineDashOffset = n.strokeLineDashOffset), this._drawToContext(r, i, s), r.restore();
        break;
      case "fillPath": {
        r.save(), r.fillStyle = n.fill || "";
        const l = e.shape === "curve" || e.shape === "polygon" || e.shape === "path" ? "evenodd" : "nonzero";
        this._drawToContext(r, i, s, l), r.restore();
        break;
      }
      case "fillSketch":
        this.fillSketch(r, i, n);
    }
  }
  fillSketch(e, o, n) {
    let r = n.fillWeight;
    r < 0 && (r = n.strokeWidth / 2), e.save(), n.fillLineDash && e.setLineDash(n.fillLineDash), n.fillLineDashOffset && (e.lineDashOffset = n.fillLineDashOffset), e.strokeStyle = n.fill || "", e.lineWidth = r, this._drawToContext(e, o, n.fixedDecimalPlaceDigits), e.restore();
  }
  _drawToContext(e, o, n, r = "nonzero") {
    e.beginPath();
    for (const s of o.ops) {
      const i = typeof n == "number" && n >= 0 ? s.data.map((l) => +l.toFixed(n)) : s.data;
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
    o.type === "fillPath" ? e.fill(r) : e.stroke();
  }
  get generator() {
    return this.gen;
  }
  getDefaultOptions() {
    return this.gen.defaultOptions;
  }
  line(e, o, n, r, s) {
    const i = this.gen.line(e, o, n, r, s);
    return this.draw(i), i;
  }
  rectangle(e, o, n, r, s) {
    const i = this.gen.rectangle(e, o, n, r, s);
    return this.draw(i), i;
  }
  ellipse(e, o, n, r, s) {
    const i = this.gen.ellipse(e, o, n, r, s);
    return this.draw(i), i;
  }
  circle(e, o, n, r) {
    const s = this.gen.circle(e, o, n, r);
    return this.draw(s), s;
  }
  linearPath(e, o) {
    const n = this.gen.linearPath(e, o);
    return this.draw(n), n;
  }
  polygon(e, o) {
    const n = this.gen.polygon(e, o);
    return this.draw(n), n;
  }
  arc(e, o, n, r, s, i, l = !1, d) {
    const c = this.gen.arc(e, o, n, r, s, i, l, d);
    return this.draw(c), c;
  }
  curve(e, o) {
    const n = this.gen.curve(e, o);
    return this.draw(n), n;
  }
  path(e, o) {
    const n = this.gen.path(e, o);
    return this.draw(n), n;
  }
}
const nr = "http://www.w3.org/2000/svg";
class Uh {
  constructor(e, o) {
    this.svg = e, this.gen = new xr(o);
  }
  draw(e) {
    const o = e.sets || [], n = e.options || this.getDefaultOptions(), r = this.svg.ownerDocument || window.document, s = r.createElementNS(nr, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const l of o) {
      let d = null;
      switch (l.type) {
        case "path":
          d = r.createElementNS(nr, "path"), d.setAttribute("d", this.opsToPath(l, i)), d.setAttribute("stroke", n.stroke), d.setAttribute("stroke-width", n.strokeWidth + ""), d.setAttribute("fill", "none"), n.strokeLineDash && d.setAttribute("stroke-dasharray", n.strokeLineDash.join(" ").trim()), n.strokeLineDashOffset && d.setAttribute("stroke-dashoffset", `${n.strokeLineDashOffset}`);
          break;
        case "fillPath":
          d = r.createElementNS(nr, "path"), d.setAttribute("d", this.opsToPath(l, i)), d.setAttribute("stroke", "none"), d.setAttribute("stroke-width", "0"), d.setAttribute("fill", n.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || d.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          d = this.fillSketch(r, l, n);
      }
      d && s.appendChild(d);
    }
    return s;
  }
  fillSketch(e, o, n) {
    let r = n.fillWeight;
    r < 0 && (r = n.strokeWidth / 2);
    const s = e.createElementNS(nr, "path");
    return s.setAttribute("d", this.opsToPath(o, n.fixedDecimalPlaceDigits)), s.setAttribute("stroke", n.fill || ""), s.setAttribute("stroke-width", r + ""), s.setAttribute("fill", "none"), n.fillLineDash && s.setAttribute("stroke-dasharray", n.fillLineDash.join(" ").trim()), n.fillLineDashOffset && s.setAttribute("stroke-dashoffset", `${n.fillLineDashOffset}`), s;
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
  line(e, o, n, r, s) {
    const i = this.gen.line(e, o, n, r, s);
    return this.draw(i);
  }
  rectangle(e, o, n, r, s) {
    const i = this.gen.rectangle(e, o, n, r, s);
    return this.draw(i);
  }
  ellipse(e, o, n, r, s) {
    const i = this.gen.ellipse(e, o, n, r, s);
    return this.draw(i);
  }
  circle(e, o, n, r) {
    const s = this.gen.circle(e, o, n, r);
    return this.draw(s);
  }
  linearPath(e, o) {
    const n = this.gen.linearPath(e, o);
    return this.draw(n);
  }
  polygon(e, o) {
    const n = this.gen.polygon(e, o);
    return this.draw(n);
  }
  arc(e, o, n, r, s, i, l = !1, d) {
    const c = this.gen.arc(e, o, n, r, s, i, l, d);
    return this.draw(c);
  }
  curve(e, o) {
    const n = this.gen.curve(e, o);
    return this.draw(n);
  }
  path(e, o) {
    const n = this.gen.path(e, o);
    return this.draw(n);
  }
}
var Zh = { canvas: (t, e) => new qh(t, e), svg: (t, e) => new Uh(t, e), generator: (t) => new xr(t), newSeed: () => xr.newSeed() };
const oo = Zh.generator();
function Qh(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const n = t.charCodeAt(o);
    e = (e << 5) - e + n, e |= 0;
  }
  return Math.abs(e);
}
function So(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? Qh(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function Mo(t) {
  var n;
  const e = t.options, o = (n = e == null ? void 0 : e.strokeLineDash) != null && n.length ? e.strokeLineDash.join(" ") : void 0;
  return oo.toPaths(t).map((r) => ({
    d: r.d,
    stroke: r.stroke,
    strokeWidth: r.strokeWidth,
    fill: r.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: r.stroke !== "none" && r.strokeWidth > 0 ? o : void 0
  }));
}
function Uo(t, e) {
  return Math.min(t, e) * 0.25;
}
function Jh(t, e, o, n, r) {
  const s = Math.min(r, o / 2, n / 2);
  return [
    `M${t + s},${e}`,
    `L${t + o - s},${e}`,
    `A${s},${s} 0 0 1 ${t + o},${e + s}`,
    `L${t + o},${e + n - s}`,
    `A${s},${s} 0 0 1 ${t + o - s},${e + n}`,
    `L${t + s},${e + n}`,
    `A${s},${s} 0 0 1 ${t},${e + n - s}`,
    `L${t},${e + s}`,
    `A${s},${s} 0 0 1 ${t + s},${e}`,
    "Z"
  ].join(" ");
}
function Wn(t, e, o, n, r, s) {
  if (s) {
    const i = Uo(o, n);
    return Mo(oo.path(Jh(t, e, o, n, i), So(r)));
  }
  return Mo(oo.rectangle(t, e, o, n, So(r)));
}
function Ir(t, e, o, n, r) {
  return Mo(oo.ellipse(t, e, o, n, So(r)));
}
function $h(t, e, o, n, r) {
  const s = t + o / 2, i = e + n / 2, l = [s, e], d = [t + o, i], c = [s, e + n], a = [t, i], u = Math.hypot(o / 2, n / 2), f = Math.min(r, u / 2) / u, y = (C, T, E) => [
    C[0] + E * (T[0] - C[0]),
    C[1] + E * (T[1] - C[1])
  ], p = y(a, l, 1 - f), g = y(l, d, f), m = y(l, d, 1 - f), x = y(d, c, f), b = y(d, c, 1 - f), w = y(c, a, f), M = y(c, a, 1 - f), v = y(a, l, f);
  return [
    `M${g[0]},${g[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${d[0]},${d[1]} ${x[0]},${x[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${c[0]},${c[1]} ${w[0]},${w[1]}`,
    `L${M[0]},${M[1]}`,
    `Q${a[0]},${a[1]} ${v[0]},${v[1]}`,
    `L${p[0]},${p[1]}`,
    `Q${l[0]},${l[1]} ${g[0]},${g[1]}`,
    "Z"
  ].join(" ");
}
function Tr(t, e, o, n, r, s) {
  if (s) {
    const l = Uo(o, n);
    return Mo(oo.path($h(t, e, o, n, l), So(r)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + n / 2],
    [t + o / 2, e + n],
    [t, e + n / 2]
  ];
  return Mo(oo.polygon(i, So(r)));
}
function Oo(t, e, o, n, r) {
  return Mo(oo.line(t, e, o, n, So(r)));
}
function zr(t, e, o, n, r) {
  const s = Oo(t, e, o, n, r), i = Math.atan2(n - e, o - t), l = Math.max(12, r.strokeWidth * 4), d = Math.PI / 6, c = o - l * Math.cos(i - d), a = n - l * Math.sin(i - d), u = o - l * Math.cos(i + d), f = n - l * Math.sin(i + d), y = Oo(o, n, c, a, r), p = Oo(o, n, u, f, r);
  return [...s, ...y, ...p];
}
function na(t, e) {
  const o = {
    ...So(e),
    stroke: "none"
  };
  return Mo(oo.polygon(t, o));
}
function rs(t, e) {
  return Mo(oo.path(t, So(e)));
}
function no(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function _h(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, n = parseInt(e.substring(2, 4), 16) || 0, r = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * n + 0.114 * r) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function tu({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ h(ou, { node: o }) : /* @__PURE__ */ h(eu, { node: o });
  }
  return /* @__PURE__ */ h(nu, { node: t, editingLabel: e });
}
const wr = Le(tu), eu = Le(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", n = no(e.data.strokeStyle), r = Kt(
    () => o ? null : Qs(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Kt(() => {
    const a = e.data.points;
    if (!a || a.length === 0) return "";
    if (a.length === 1) return `M${a[0][0]},${a[0][1]}L${a[0][0]},${a[0][1]}`;
    const u = [`M${a[0][0]},${a[0][1]}`];
    for (let f = 1; f < a.length; f++)
      u.push(`L${a[f][0]},${a[f][1]}`);
    return u.join("");
  }, [e.data.points]), i = Kt(() => {
    if (!o) return null;
    const a = e.data.points;
    if (a.length < 2) return "";
    const u = ["M", a[0][0], a[0][1]];
    for (let y = 1; y < a.length; y++) {
      const [p, g] = a[y], [m, x] = a[y - 1];
      u.push("Q", m, x, (m + p) / 2, (x + g) / 2);
    }
    const f = a[a.length - 1];
    return u.push("L", f[0], f[1]), u.join(" ");
  }, [e.data.points, o]), l = Kt(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const a = e.data.points.map((M) => [M[0], M[1]]), u = ol(a), f = u[0], y = u[u.length - 1], p = Math.hypot(f[0] - y[0], f[1] - y[1]);
    let g = 0;
    for (let M = 1; M < u.length; M++)
      g += Math.hypot(u[M][0] - u[M - 1][0], u[M][1] - u[M - 1][1]);
    const m = g >= 1 && p <= Math.max(e.data.strokeWidth * 4, 20) && p <= g * 0.1, x = e.data.fillStyle || "solid";
    if (m) {
      const M = Ph(u, 0);
      return x === "solid" ? { kind: "solid", d: M, fill: e.data.fill } : { kind: "rough", paths: na(u, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: x,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const b = Lh(u);
    if (b.length === 0) return null;
    if (x === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: b
      };
    const w = [];
    for (const { points: M } of b)
      M.length >= 3 && w.push(
        ...na(M, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: x,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: w, regions: b };
  }, [e.data.fill, e.data.fillStyle, e.data.points, e.data.strokeWidth]), d = e.h === "auto" ? 0 : e.h, c = e.data.strokeWidth * 4;
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - c,
        top: e.y - c,
        width: e.w + c * 2,
        height: d + c * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: e.w + c * 2,
          height: d + c * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ S("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
            (l == null ? void 0 : l.kind) === "solid" && (l.regions ? l.regions.map((a, u) => /* @__PURE__ */ h(
              "path",
              {
                d: a.pathD,
                fill: l.fill,
                stroke: "none"
              },
              u
            )) : /* @__PURE__ */ h("path", { d: l.d, fill: l.fill, stroke: "none" })),
            (l == null ? void 0 : l.kind) === "rough" && l.paths.map((a, u) => /* @__PURE__ */ h(
              "path",
              {
                d: a.d,
                stroke: a.stroke,
                strokeWidth: a.strokeWidth,
                fill: a.fill,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              u
            )),
            o ? /* @__PURE__ */ h(
              "path",
              {
                d: i,
                fill: "none",
                stroke: e.data.color,
                strokeWidth: e.data.strokeWidth,
                strokeDasharray: n == null ? void 0 : n.map((a) => a * Math.max(e.data.strokeWidth, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) : /* @__PURE__ */ h(
              "path",
              {
                d: r,
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
}), ou = Le(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, n = e.data.strokeWidth * 2, r = Kt(() => {
    const l = e.data.points;
    if (!l || l.length === 0) return "";
    const d = [`M${l[0][0]},${l[0][1]}`];
    for (let c = 1; c < l.length; c++)
      d.push(`L${l[c][0]},${l[c][1]}`);
    return d.push("Z"), d.join("");
  }, [e.data.points]), s = no(e.data.strokeStyle), i = s == null ? void 0 : s.map((l) => l * Math.max(e.data.strokeWidth, 1)).join(" ");
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - n,
        top: e.y - n,
        width: e.w + n * 2,
        height: o + n * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: e.w + n * 2,
          height: o + n * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ S("g", { transform: `translate(${n}, ${n})`, opacity: e.data.opacity ?? 1, children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: r,
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
                d: r,
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
}), nu = Le(function({ node: e, editingLabel: o }) {
  var m, x, b, w;
  const n = e.h === "auto" ? 100 : e.h, r = e.data.strokeWidth * 2, s = no(e.data.strokeStyle), i = ((m = e.data.startPoint) == null ? void 0 : m[0]) ?? 0, l = ((x = e.data.startPoint) == null ? void 0 : x[1]) ?? n / 2, d = ((b = e.data.endPoint) == null ? void 0 : b[0]) ?? e.w, c = ((w = e.data.endPoint) == null ? void 0 : w[1]) ?? n / 2, a = Kt(() => {
    if (e.data.roughness === 0) return null;
    const M = {
      stroke: e.data.stroke,
      fill: e.data.fill,
      fillStyle: e.data.fillStyle,
      roughness: e.data.roughness,
      strokeWidth: e.data.strokeWidth,
      strokeLineDash: s,
      seed: e.id
    }, v = e.data.edgeStyle === "round";
    switch (e.data.shape) {
      case "rect":
        return Wn(0, 0, e.w, n, M, v);
      case "ellipse":
        return Ir(e.w / 2, n / 2, e.w, n, M);
      case "diamond":
        return Tr(0, 0, e.w, n, M, v);
      case "line":
        return Oo(i, l, d, c, M);
      case "arrow":
        return zr(i, l, d, c, M);
      default:
        return null;
    }
  }, [e, s, i, l, d, c, n]), u = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, f = e.data.opacity ?? 1, y = e.data.shape === "line" || e.data.shape === "arrow", p = e.data.label, g = e.data.labelFontSize ?? 14;
  return /* @__PURE__ */ S(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x,
        top: e.y,
        width: e.w,
        height: n,
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
            width: e.w + r * 2,
            height: n + r * 2,
            style: { overflow: "visible", marginLeft: -r, marginTop: -r },
            children: /* @__PURE__ */ S("g", { transform: `translate(${r}, ${r})`, opacity: f, children: [
              u && /* @__PURE__ */ h(
                iu,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              a ? a.map((M, v) => u && M.fill && M.fill !== "none" ? null : /* @__PURE__ */ h(
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
                v
              )) : /* @__PURE__ */ h(
                ru,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  x1: i,
                  y1: l,
                  x2: d,
                  y2: c,
                  stroke: e.data.stroke,
                  fill: e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  dashArray: s,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              /* @__PURE__ */ h(
                su,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  x1: i,
                  y1: l,
                  x2: d,
                  y2: c,
                  hasFill: !!e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  rounded: e.data.edgeStyle === "round"
                }
              )
            ] })
          }
        ),
        !y && p && !o && /* @__PURE__ */ h(
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
                  fontFamily: wo(e.data.labelFontFamily ?? xo),
                  fontSize: g,
                  color: e.data.fill && e.data.fillStyle === "solid" ? _h(e.data.fill) : e.data.stroke,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  width: "100%"
                },
                children: p
              }
            )
          }
        )
      ]
    }
  );
});
function _s(t, e) {
  const o = Uo(t, e), n = t / 2, r = e / 2, s = [n, 0], i = [t, r], l = [n, e], d = [0, r], c = Math.hypot(t / 2, e / 2), a = Math.min(o, c / 2) / c, u = (M, v, C) => [
    M[0] + C * (v[0] - M[0]),
    M[1] + C * (v[1] - M[1])
  ], f = u(s, i, a), y = u(s, i, 1 - a), p = u(i, l, a), g = u(i, l, 1 - a), m = u(l, d, a), x = u(l, d, 1 - a), b = u(d, s, a), w = u(d, s, 1 - a);
  return [
    `M${f[0]},${f[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${i[0]},${i[1]} ${p[0]},${p[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${l[0]},${l[1]} ${m[0]},${m[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${d[0]},${d[1]} ${b[0]},${b[1]}`,
    `L${w[0]},${w[1]}`,
    `Q${s[0]},${s[1]} ${f[0]},${f[1]}`,
    "Z"
  ].join(" ");
}
function ru({
  shape: t,
  w: e,
  h: o,
  x1: n,
  y1: r,
  x2: s,
  y2: i,
  stroke: l,
  fill: d,
  strokeWidth: c,
  dashArray: a,
  rounded: u
}) {
  const f = a == null ? void 0 : a.join(",");
  switch (t) {
    case "rect": {
      const y = !!d && d !== "none", p = o <= Math.max(c * 2, 4), g = e <= Math.max(c * 2, 4);
      if (!y && (p || g))
        return p && e >= o ? /* @__PURE__ */ h(
          "line",
          {
            x1: 0,
            y1: o / 2,
            x2: e,
            y2: o / 2,
            stroke: l,
            strokeWidth: Math.max(c, o),
            strokeDasharray: f
          }
        ) : /* @__PURE__ */ h(
          "line",
          {
            x1: e / 2,
            y1: 0,
            x2: e / 2,
            y2: o,
            stroke: l,
            strokeWidth: Math.max(c, e),
            strokeDasharray: f
          }
        );
      const m = u ? Uo(e, o) : 0;
      return /* @__PURE__ */ h(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: m || void 0,
          ry: m || void 0,
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: f
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
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: f
        }
      );
    case "diamond":
      return u ? /* @__PURE__ */ h(
        "path",
        {
          d: _s(e, o),
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: f
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: f
        }
      );
    case "line":
      return /* @__PURE__ */ h(
        "line",
        {
          x1: n,
          y1: r,
          x2: s,
          y2: i,
          stroke: l,
          strokeWidth: c,
          strokeDasharray: f
        }
      );
    case "arrow": {
      const y = Math.atan2(i - r, s - n), p = Math.max(12, c * 4), g = Math.PI / 6, m = s - p * Math.cos(y - g), x = i - p * Math.sin(y - g), b = s - p * Math.cos(y + g), w = i - p * Math.sin(y + g);
      return /* @__PURE__ */ S(Mt, { children: [
        /* @__PURE__ */ h(
          "line",
          {
            x1: n,
            y1: r,
            x2: s,
            y2: i,
            stroke: l,
            strokeWidth: c,
            strokeDasharray: f
          }
        ),
        /* @__PURE__ */ h(
          "polyline",
          {
            points: `${m},${x} ${s},${i} ${b},${w}`,
            stroke: l,
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
function su({
  shape: t,
  w: e,
  h: o,
  x1: n,
  y1: r,
  x2: s,
  y2: i,
  hasFill: l,
  strokeWidth: d,
  rounded: c
}) {
  const a = l ? "painted" : "stroke", u = l ? "transparent" : "none";
  switch (t) {
    case "rect": {
      const f = c ? Uo(e, o) : 0;
      return /* @__PURE__ */ h(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: f || void 0,
          ry: f || void 0,
          fill: u,
          stroke: "transparent",
          strokeWidth: d,
          pointerEvents: a
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
          fill: u,
          stroke: "transparent",
          strokeWidth: d,
          pointerEvents: a
        }
      );
    case "diamond":
      return c ? /* @__PURE__ */ h(
        "path",
        {
          d: _s(e, o),
          fill: u,
          stroke: "transparent",
          strokeWidth: d,
          pointerEvents: a
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: u,
          stroke: "transparent",
          strokeWidth: d,
          pointerEvents: a
        }
      );
    case "line":
    case "arrow":
      return /* @__PURE__ */ h(
        "line",
        {
          x1: n,
          y1: r,
          x2: s,
          y2: i,
          stroke: "transparent",
          strokeWidth: d,
          pointerEvents: "stroke"
        }
      );
    default:
      return null;
  }
}
function iu({
  shape: t,
  w: e,
  h: o,
  fill: n,
  rounded: r
}) {
  switch (t) {
    case "rect": {
      const s = r ? Uo(e, o) : 0;
      return /* @__PURE__ */ h("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: n, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ h("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: n, stroke: "none" });
    case "diamond":
      return r ? /* @__PURE__ */ h(
        "path",
        {
          d: _s(e, o),
          fill: n,
          stroke: "none"
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: n,
          stroke: "none"
        }
      );
    default:
      return null;
  }
}
const au = Le(function(e) {
  return /* @__PURE__ */ h(wr, { node: e.node });
}), lu = {
  type: "draw",
  component: au,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, n) => Ys(t, e, o, n),
  getHitPadding: (t) => {
    const e = t.data;
    return Math.max(20, e.strokeWidth * 4);
  },
  onResize: (t, e, o) => ({
    points: t.data.points.map(
      ([r, s, i]) => [r * e, s * o, i]
    )
  }),
  onFlip: (t, e) => {
    const o = t.data;
    if (e === "h")
      return {
        points: o.points.map(
          ([r, s, i]) => [t.w - r, s, i]
        )
      };
    const n = t.h === "auto" ? 0 : t.h;
    return {
      points: o.points.map(
        ([r, s, i]) => [r, n - s, i]
      )
    };
  },
  getClipboardText: () => null
}, cu = Le(function(e) {
  const o = e.node;
  return /* @__PURE__ */ h(wr, { node: o, editingLabel: e.editing });
}), du = {
  type: "shape",
  component: cu,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, n) => Sr(t, e, o, n),
  onResize: (t, e, o) => {
    const n = t.data, r = {};
    return n.startPoint && (r.startPoint = [n.startPoint[0] * e, n.startPoint[1] * o]), n.endPoint && (r.endPoint = [n.endPoint[0] * e, n.endPoint[1] * o]), Object.keys(r).length > 0 ? r : null;
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
    const n = t.h === "auto" ? 0 : t.h;
    return o.startPoint && o.endPoint ? {
      startPoint: [o.startPoint[0], n - o.startPoint[1]],
      endPoint: [o.endPoint[0], n - o.endPoint[1]]
    } : {};
  },
  getClipboardText: (t) => t.data.label || null
};
function hu(t) {
  return null;
}
const uu = {
  type: "edge",
  component: hu,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, rr = 0.05, sr = 10, pu = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function fu({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  onResizeHandleDown: s,
  cropping: i,
  onCropStart: l,
  onCropEnd: d
}) {
  const c = t.h, a = t.data.crop, u = ut(!1);
  u.current = !!i;
  const f = ut(null), y = ut(!1), p = ut(null), [g, m] = et(null), x = lt(() => {
    p.current && p.current.naturalWidth > 0 && m({ w: p.current.naturalWidth, h: p.current.naturalHeight });
  }, []);
  St(() => {
    p.current && p.current.naturalWidth > 0 && m({ w: p.current.naturalWidth, h: p.current.naturalHeight });
  }, [t.data.src]);
  const [b, w] = et({ x: 0, y: 0, w: 1, h: 1 });
  St(() => {
    i && (f.current = null, w(a ?? { x: 0, y: 0, w: 1, h: 1 }), !g && p.current && p.current.naturalWidth > 0 && m({ w: p.current.naturalWidth, h: p.current.naturalHeight }));
  }, [i]);
  const M = Kt(() => {
    if (g) {
      const H = g.w / g.h, $ = t.w / c;
      let st, it;
      return H > $ ? (st = t.w, it = t.w / H) : (it = c, st = c * H), { x: (t.w - st) / 2, y: (c - it) / 2, w: st, h: it };
    }
    return i ? { x: 0, y: 0, w: t.w, h: c } : null;
  }, [g, i, t.w, c]), v = lt(
    (H) => {
      const $ = o.getNode(t.id);
      if (!$ || $.type !== "image") return;
      const st = $.data;
      if (H.x < 1e-3 && H.y < 1e-3 && H.w > 0.999 && H.h > 0.999) {
        o.updateNodeWithHistory(t.id, {
          data: { ...st, crop: void 0 }
        });
        return;
      }
      const U = $.h === "auto" ? c : $.h, tt = $.rotation || 0;
      let dt, _, ht, gt;
      if (M)
        if (dt = Math.max(sr, H.w * M.w), _ = Math.max(sr, H.h * M.h), !tt)
          ht = $.x + M.x + H.x * M.w, gt = $.y + M.y + H.y * M.h;
        else {
          const ft = $.x + $.w / 2, wt = $.y + U / 2;
          ht = ft - dt / 2, gt = wt - _ / 2;
        }
      else if (dt = Math.max(sr, H.w * $.w), _ = Math.max(sr, H.h * U), !tt)
        ht = $.x + H.x * $.w, gt = $.y + H.y * U;
      else {
        const ft = $.x + $.w / 2, wt = $.y + U / 2;
        ht = ft - dt / 2, gt = wt - _ / 2;
      }
      o.updateNodeWithHistory(t.id, {
        x: ht,
        y: gt,
        w: dt,
        h: _,
        data: {
          ...st,
          crop: { x: H.x, y: H.y, w: H.w, h: H.h }
        }
      });
    },
    [o, t.id, M, c]
  ), C = lt(() => {
    f.current = "apply", v(b), d == null || d();
  }, [v, b, d]), T = lt(() => {
    f.current = "cancel", d == null || d();
  }, [d]);
  St(() => {
    if (i) {
      y.current = !0;
      return;
    }
    if (!y.current) return;
    y.current = !1;
    const H = f.current;
    f.current = null, !(H === "cancel" || H === "apply") && (v(b), d == null || d());
  }, [i, b, v, d]), St(() => {
    if (!i) return;
    const H = ($) => {
      $.key === "Enter" ? (C(), $.preventDefault(), $.stopPropagation()) : $.key === "Escape" && (T(), $.preventDefault(), $.stopPropagation());
    };
    return document.addEventListener("keydown", H, !0), () => document.removeEventListener("keydown", H, !0);
  }, [i, C, T]);
  const E = lt(
    (H, $) => {
      if ($.stopPropagation(), $.preventDefault(), !M) return;
      const st = $.currentTarget.ownerDocument, it = $.clientX, U = $.clientY, tt = { ...b }, dt = (ht) => {
        const gt = (ht.clientX - it) / r / M.w, ft = (ht.clientY - U) / r / M.h, wt = { ...tt }, zt = tt.x + tt.w, Ft = tt.y + tt.h;
        if (H.includes("left")) {
          const Et = Math.max(0, Math.min(zt - rr, tt.x + gt));
          wt.x = Et, wt.w = zt - Et;
        }
        if (H.includes("right") && (wt.w = Math.max(
          rr,
          Math.min(1 - tt.x, tt.w + gt)
        )), H.includes("top")) {
          const Et = Math.max(0, Math.min(Ft - rr, tt.y + ft));
          wt.y = Et, wt.h = Ft - Et;
        }
        H.includes("bottom") && (wt.h = Math.max(
          rr,
          Math.min(1 - tt.y, tt.h + ft)
        )), w(wt);
      }, _ = () => {
        st.removeEventListener("pointermove", dt), st.removeEventListener("pointerup", _);
      };
      st.addEventListener("pointermove", dt), st.addEventListener("pointerup", _);
    },
    [b, M, r]
  ), z = lt(
    (H) => {
      if (H.stopPropagation(), H.preventDefault(), !M) return;
      const $ = H.currentTarget.ownerDocument, st = H.clientX, it = H.clientY, U = { ...b }, tt = (_) => {
        const ht = (_.clientX - st) / r / M.w, gt = (_.clientY - it) / r / M.h;
        w({
          ...U,
          x: Math.max(0, Math.min(1 - U.w, U.x + ht)),
          y: Math.max(0, Math.min(1 - U.h, U.y + gt))
        });
      }, dt = () => {
        $.removeEventListener("pointermove", tt), $.removeEventListener("pointerup", dt);
      };
      $.addEventListener("pointermove", tt), $.addEventListener("pointerup", dt);
    },
    [b, M, r]
  ), j = lt(
    (H) => {
      if (u.current) {
        H.stopPropagation();
        return;
      }
      const $ = H.currentTarget.ownerDocument;
      if (H.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: Et, y: ct } = o.screenToCanvas(
          H.clientX,
          H.clientY
        );
        for (const Bt of o.selection) {
          const Gt = o.getNode(Bt);
          if (!Gt) continue;
          const Ut = Gt.h === "auto" ? 100 : Gt.h;
          if (Et >= Gt.x && Et <= Gt.x + Gt.w && ct >= Gt.y && ct <= Gt.y + Ut)
            return;
        }
      }
      H.stopPropagation(), H.preventDefault(), H.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const st = H.clientX, it = H.clientY, U = Array.from(o.selection), tt = U.map((Et) => {
        const ct = o.getNode(Et);
        return { id: Et, x: ct.x, y: ct.y };
      });
      let dt = !1, _ = null, ht = st, gt = it, ft = !1;
      const wt = () => {
        _ = null;
        const Et = (ht - st) / o.viewport.zoom, ct = (gt - it) / o.viewport.zoom, { finalDx: Bt, finalDy: Gt } = o.computeDragSnap(
          tt,
          U,
          Et,
          ct,
          ft
        ), Ut = tt.map((Jt) => ({
          id: Jt.id,
          patch: { x: Jt.x + Bt, y: Jt.y + Gt }
        }));
        o.updateMany(Ut);
      }, zt = (Et) => {
        const ct = (Et.clientX - st) / o.viewport.zoom, Bt = (Et.clientY - it) / o.viewport.zoom;
        if (!dt)
          if (Math.abs(ct) > 2 || Math.abs(Bt) > 2)
            dt = !0, o.pushHistorySnapshot();
          else
            return;
        ht = Et.clientX, gt = Et.clientY, ft = Et.metaKey || Et.ctrlKey, _ === null && (_ = requestAnimationFrame(wt));
      }, Ft = () => {
        _ !== null && (cancelAnimationFrame(_), wt()), o.clearAlignGuides(), $.removeEventListener("pointermove", zt), $.removeEventListener("pointerup", Ft);
      };
      $.addEventListener("pointermove", zt), $.addEventListener("pointerup", Ft);
    },
    [o, t.id]
  ), Y = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], nt = 8 / r, rt = nt / 2, pt = 25 / r, xt = e && s && !i, mt = lt(
    (H) => {
      const $ = H.currentTarget.ownerDocument;
      H.stopPropagation(), H.preventDefault();
      const st = t.x + t.w / 2, it = t.y + c / 2, U = t.rotation || 0, { x: tt, y: dt } = o.screenToCanvas(
        H.clientX,
        H.clientY
      ), _ = Math.atan2(dt - it, tt - st);
      let ht = !1;
      const gt = (wt) => {
        ht || (ht = !0, o.pushHistorySnapshot());
        const { x: zt, y: Ft } = o.screenToCanvas(
          wt.clientX,
          wt.clientY
        ), Et = Math.atan2(Ft - it, zt - st);
        let ct = U + (Et - _) * (180 / Math.PI);
        (wt.shiftKey || o.snapToGrid) && !(wt.metaKey || wt.ctrlKey) && (ct = Math.round(ct / 15) * 15), o.updateNode(t.id, { rotation: ct });
      }, ft = () => {
        $.removeEventListener("pointermove", gt), $.removeEventListener("pointerup", ft);
      };
      $.addEventListener("pointermove", gt), $.addEventListener("pointerup", ft);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), W = i && M ? {
    left: M.x + b.x * M.w,
    top: M.y + b.y * M.h,
    width: b.w * M.w,
    height: b.h * M.h
  } : null, B = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, G = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: B
  };
  if (!i && a) {
    const H = a.y * 100, $ = (1 - a.x - a.w) * 100, st = (1 - a.y - a.h) * 100, it = a.x * 100;
    G.objectViewBox = `inset(${H}% ${$}% ${st}% ${it}%)`;
  }
  const q = 8 / r, J = q / 2;
  return /* @__PURE__ */ S(
    "div",
    {
      onPointerDown: j,
      onDoubleClick: !i && n ? (H) => {
        H.stopPropagation(), l == null || l();
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
        border: e && !i ? "2px dashed #3b82f6" : "none",
        borderRadius: 6,
        overflow: "visible",
        pointerEvents: n || i ? "auto" : "none",
        cursor: i ? "default" : "move",
        transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0,
        transformOrigin: "center center",
        boxSizing: "border-box"
      },
      children: [
        /* @__PURE__ */ S(
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
                  ref: p,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: x,
                  style: G,
                  draggable: !1
                }
              ),
              i && W && /* @__PURE__ */ h(
                "div",
                {
                  onPointerDown: z,
                  style: {
                    position: "absolute",
                    left: W.left,
                    top: W.top,
                    width: W.width,
                    height: W.height,
                    boxShadow: `0 0 0 ${Math.max(t.w, c) * 2}px rgba(0,0,0,0.45)`,
                    border: `${1.5 / r}px dashed rgba(255,255,255,0.8)`,
                    boxSizing: "border-box",
                    cursor: "move",
                    zIndex: 10
                  }
                }
              )
            ]
          }
        ),
        i && W && pu.map(({ pos: H, edges: $, cx: st, cy: it, cursor: U }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (tt) => E($, tt),
            style: {
              position: "absolute",
              left: W.left + st * W.width - J,
              top: W.top + it * W.height - J,
              width: q,
              height: q,
              background: "white",
              border: `${1.5 / r}px solid #3b82f6`,
              borderRadius: 2,
              cursor: U,
              zIndex: 11
            }
          },
          H
        )),
        e && !i && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: -pt,
                width: 1,
                height: pt,
                background: "#3b82f6",
                marginLeft: -0.5,
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              onPointerDown: mt,
              style: {
                position: "absolute",
                left: "50%",
                top: -(pt + nt / 2),
                width: nt,
                height: nt,
                marginLeft: -nt / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        xt && Y.map(({ pos: H, cx: $, cy: st }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (it) => {
              it.stopPropagation(), s == null || s(t.id, H, it);
            },
            style: {
              position: "absolute",
              left: `calc(${$ * 100}% - ${rt}px)`,
              top: `calc(${st * 100}% - ${rt}px)`,
              width: nt,
              height: nt,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: Mr(H, t.rotation || 0)
            }
          },
          H
        ))
      ]
    }
  );
}
const cl = Le(fu);
function yu(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    cl,
    {
      node: e,
      isSelected: t.isSelected,
      engine: t.engine,
      interactive: t.interactive,
      zoom: t.zoom,
      onResizeHandleDown: t.callbacks.onResizeHandleDown,
      cropping: !!t.cropping,
      onCropStart: () => {
        var o, n;
        return (n = (o = t.callbacks).onEditStart) == null ? void 0 : n.call(o, e.id);
      },
      onCropEnd: () => {
        var o, n;
        return (n = (o = t.callbacks).onEditEnd) == null ? void 0 : n.call(o);
      }
    }
  );
}
const gu = {
  type: "image",
  component: yu,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function mu({
  node: t,
  engine: e,
  editing: o,
  editClickPos: n,
  onStopEdit: r,
  onMeasuredHeight: s
}) {
  const i = ut(null), [l, d] = et(t.data.text), c = ut(!1), a = ut(t.data.text), u = ut(null), f = ut(e);
  f.current = e;
  const y = ut(t);
  y.current = t;
  const p = ut(!1);
  St(() => {
    o || d(t.data.text);
  }, [t.data.text]), Co(() => {
    var C, T;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const E = i.current.ownerDocument;
      let z = !1;
      if (n) {
        const j = E.caretRangeFromPoint(n.clientX, n.clientY);
        if (j && i.current.contains(j.startContainer)) {
          const Y = (C = E.defaultView) == null ? void 0 : C.getSelection();
          Y == null || Y.removeAllRanges(), Y == null || Y.addRange(j), z = !0;
        }
      }
      if (!z) {
        const j = E.createRange(), Y = (T = E.defaultView) == null ? void 0 : T.getSelection();
        i.current.childNodes.length > 0 && (j.selectNodeContents(i.current), j.collapse(!1)), Y == null || Y.removeAllRanges(), Y == null || Y.addRange(j);
      }
      a.current = t.data.text, c.current = !1, p.current = !1;
    }
  }, [o]), St(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const C = a.current, T = e.getNode(t.id);
        if (T && T.type === "text") {
          const E = T.data;
          C !== E.text && (p.current ? (p.current = !1, e.updateNode(t.id, {
            data: { ...E, text: C }
          })) : e.updateNodeWithHistory(t.id, {
            data: { ...E, text: C }
          }));
        }
      };
  }, [o, e, t.id]), St(() => {
    if (!i.current || !s) return;
    const C = new ResizeObserver(() => {
      var E;
      const T = ((E = i.current) == null ? void 0 : E.offsetHeight) ?? 0;
      T > 0 && s(t.id, T);
    });
    return C.observe(i.current), () => C.disconnect();
  }, [t.id, s, o]);
  const g = lt(() => {
    var T;
    if (c.current) return;
    c.current = !0, u.current && (clearTimeout(u.current), u.current = null);
    const C = ((T = i.current) == null ? void 0 : T.innerText) ?? "";
    d(C), a.current = C, C !== t.data.text && (p.current ? (p.current = !1, e.updateNode(t.id, {
      data: { ...t.data, text: C }
    })) : e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: C }
    })), r();
  }, [e, t, r]), m = lt(
    (C) => {
      var T;
      C.key === "Escape" && (C.preventDefault(), g(), (T = i.current) == null || T.blur()), C.stopPropagation();
    },
    [g]
  ), x = lt(() => {
    g();
  }, [g]), b = lt(() => {
    if (i.current) {
      const C = i.current.innerText;
      d(C), a.current = C, C !== y.current.data.text && !p.current && (p.current = !0, f.current.pushHistorySnapshot()), u.current && clearTimeout(u.current), u.current = setTimeout(() => {
        const T = y.current;
        C !== T.data.text && f.current.updateNode(T.id, {
          data: { ...T.data, text: C }
        });
      }, 0);
    }
  }, []), w = t.h === "auto" ? void 0 : t.h, M = t.data.opacity ?? 1, v = {
    fontFamily: wo(t.data.fontFamily),
    fontSize: t.data.fontSize,
    color: t.data.color,
    textAlign: t.data.align,
    opacity: M,
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
        height: w,
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
          onKeyDown: m,
          onBlur: x,
          onInput: b,
          onPointerDown: (C) => C.stopPropagation(),
          style: { ...v, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ h("div", { ref: i, style: v, children: l || " " })
    }
  );
}
const dl = Le(mu);
function bu(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    dl,
    {
      node: e,
      engine: t.engine,
      editing: t.editing,
      editClickPos: t.editClickPos,
      onStopEdit: () => {
        var o, n;
        return (n = (o = t.callbacks).onEditEnd) == null ? void 0 : n.call(o);
      },
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const xu = {
  type: "text",
  component: bu,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function wu(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, n = lt(
    (s) => {
      var l, d;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (d = (l = t.callbacks).onEditEnd) == null || d.call(l);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), r = lt(
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
          onBlur: n,
          onKeyDown: r,
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
            var i, l;
            s.stopPropagation(), t.engine.select(e.id), (l = (i = t.callbacks).onEditStart) == null || l.call(i, e.id);
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
const ku = {
  type: "frame",
  component: wu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, vu = 100;
function Su({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  editing: s,
  onEditStart: i,
  onEditEnd: l
}) {
  const d = ut(null), c = ut(null), a = ut(""), u = ut(null), f = ut(null), y = ut(t);
  y.current = t;
  const p = ut(o);
  p.current = o;
  const g = ut(!1);
  St(() => {
    var v;
    if (s && c.current) {
      const C = c.current;
      C.innerText = t.data.text || "", a.current = t.data.text || "", C.focus();
      const T = C.ownerDocument, E = (v = T.defaultView) == null ? void 0 : v.getSelection(), z = u.current;
      u.current = null;
      let j = !1;
      if (z && E && T.caretRangeFromPoint) {
        const Y = T.caretRangeFromPoint(z.x, z.y);
        Y && C.contains(Y.startContainer) && (E.removeAllRanges(), E.addRange(Y), j = !0);
      }
      if (!j && E) {
        const Y = T.createRange();
        C.childNodes.length > 0 && (Y.selectNodeContents(C), Y.collapse(!1)), E.removeAllRanges(), E.addRange(Y);
      }
      g.current = !1;
    }
  }, [s]), St(() => {
    if (s)
      return () => {
        const v = y.current, C = a.current;
        C !== v.data.text && (g.current ? (g.current = !1, p.current.updateNode(v.id, {
          data: { ...v.data, text: C }
        })) : p.current.updateNodeWithHistory(v.id, {
          data: { ...v.data, text: C }
        }));
      };
  }, [s]);
  const m = lt(() => {
    f.current && (clearTimeout(f.current), f.current = null), c.current && (a.current = c.current.innerText), l();
  }, [l]), x = lt(
    (v) => {
      const C = v.currentTarget.ownerDocument;
      if (v.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: G, y: q } = o.screenToCanvas(v.clientX, v.clientY);
        for (const J of o.selection) {
          const H = o.getNode(J);
          if (!H) continue;
          const $ = H.h === "auto" ? 100 : H.h;
          if (G >= H.x && G <= H.x + H.w && q >= H.y && q <= H.y + $)
            return;
        }
      }
      if (v.stopPropagation(), s) return;
      v.currentTarget.setPointerCapture(v.pointerId), v.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const T = v.clientX, E = v.clientY, z = Array.from(o.selection), j = [];
      for (const G of z) {
        const q = o.getNode(G);
        q && j.push({ id: G, x: q.x, y: q.y });
      }
      if (j.length === 0) return;
      let Y = !1, nt = null, rt = T, pt = E, xt = !1;
      const mt = () => {
        nt = null;
        const G = (rt - T) / o.viewport.zoom, q = (pt - E) / o.viewport.zoom, { finalDx: J, finalDy: H } = o.computeDragSnap(
          j,
          z,
          G,
          q,
          xt
        ), $ = j.map((st) => ({
          id: st.id,
          patch: { x: st.x + J, y: st.y + H }
        }));
        o.updateMany($);
      }, W = (G) => {
        const q = (G.clientX - T) / o.viewport.zoom, J = (G.clientY - E) / o.viewport.zoom;
        if (!Y)
          if (Math.abs(q) > 2 || Math.abs(J) > 2)
            Y = !0, o.pushHistorySnapshot();
          else
            return;
        rt = G.clientX, pt = G.clientY, xt = G.metaKey || G.ctrlKey, nt === null && (nt = requestAnimationFrame(mt));
      }, B = () => {
        nt !== null && (cancelAnimationFrame(nt), mt()), o.clearAlignGuides(), C.removeEventListener("pointermove", W), C.removeEventListener("pointerup", B);
      };
      C.addEventListener("pointermove", W), C.addEventListener("pointerup", B);
    },
    [o, t.id, s]
  ), b = lt(
    (v) => {
      if (n) {
        if (v.stopPropagation(), t.groupId) {
          const C = [];
          let T = t.groupId;
          for (; T; )
            C.push(T), T = o.groupParent.get(T);
          if (!o.activeGroupId) {
            o.enterGroup(C[C.length - 1]), o.select(t.id);
            return;
          }
          const E = C.indexOf(o.activeGroupId);
          if (E > 0) {
            o.enterGroup(C[E - 1]), o.select(t.id);
            return;
          }
        }
        s || (u.current = { x: v.clientX, y: v.clientY }, o.select(t.id), i(t.id));
      }
    },
    [n, s, o, t.id, t.groupId, i]
  ), w = t.data.fontSize ?? 16, M = t.h === "auto" ? vu : t.h;
  return /* @__PURE__ */ h(
    "div",
    {
      ref: d,
      "data-node-id": t.id,
      className: n ? void 0 : "sb-block-inert",
      onPointerDown: n ? x : void 0,
      onDoubleClick: b,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: M,
        zIndex: t.z,
        background: t.data.color,
        borderRadius: t.data.edgeStyle === "round" ? 12 : 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)",
        opacity: t.data.opacity ?? 1,
        pointerEvents: n ? "auto" : "none",
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
              onBlur: m,
              onInput: () => {
                c.current && (a.current = c.current.innerText, a.current !== y.current.data.text && !g.current && (g.current = !0, p.current.pushHistorySnapshot()), f.current && clearTimeout(f.current), f.current = setTimeout(() => {
                  const C = y.current, T = a.current;
                  T !== C.data.text && p.current.updateNode(C.id, {
                    data: { ...C.data, text: T }
                  });
                }, 0));
              },
              onKeyDown: (v) => {
                v.key === "Escape" && (v.stopPropagation(), m()), v.stopPropagation();
              },
              onPointerDown: (v) => v.stopPropagation(),
              style: {
                fontSize: w,
                fontFamily: wo(xo),
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
                fontSize: w,
                fontFamily: wo(xo),
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
const hl = Le(Su);
function Mu(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    hl,
    {
      node: e,
      isSelected: t.isSelected,
      engine: t.engine,
      interactive: t.interactive,
      zoom: t.zoom,
      editing: t.editing,
      onEditStart: (o) => {
        var n, r;
        return (r = (n = t.callbacks).onEditStart) == null ? void 0 : r.call(n, o);
      },
      onEditEnd: () => {
        var o, n;
        return (n = (o = t.callbacks).onEditEnd) == null ? void 0 : n.call(o);
      }
    }
  );
}
const Cu = {
  type: "sticky",
  component: Mu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, ul = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function Iu(t) {
  const e = t.match(ul);
  return e ? e[1] : null;
}
function Tu(t) {
  return ul.test(t);
}
function zu(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function Pu(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function Au({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  editing: s,
  onResizeHandleDown: i,
  onEditStart: l
}) {
  const d = t.h, { data: c } = t, a = (p) => {
    if (n && s) {
      p.stopPropagation();
      return;
    }
  }, u = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", f = Math.max(6, 8 / r), y = [
    { key: "nw", x: "0%", y: "0%", cursor: "nwse-resize" },
    { key: "ne", x: "100%", y: "0%", cursor: "nesw-resize" },
    { key: "se", x: "100%", y: "100%", cursor: "nwse-resize" },
    { key: "sw", x: "0%", y: "100%", cursor: "nesw-resize" },
    { key: "n", x: "50%", y: "0%", cursor: "ns-resize" },
    { key: "s", x: "50%", y: "100%", cursor: "ns-resize" },
    { key: "e", x: "100%", y: "50%", cursor: "ew-resize" },
    { key: "w", x: "0%", y: "50%", cursor: "ew-resize" }
  ];
  return /* @__PURE__ */ S(
    "div",
    {
      onPointerDown: a,
      onDoubleClick: !s && n ? (p) => {
        p.stopPropagation(), l == null || l();
      } : void 0,
      style: {
        position: "absolute",
        left: t.x + t.w / 2,
        top: t.y + d / 2,
        width: t.w,
        height: d,
        marginLeft: -t.w / 2,
        marginTop: -d / 2,
        zIndex: t.z,
        border: e ? "2px dashed #3b82f6" : "none",
        borderRadius: 6,
        overflow: "visible",
        pointerEvents: n ? "auto" : "none",
        cursor: s ? "default" : "move",
        transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0,
        transformOrigin: "center center",
        boxSizing: "border-box"
      },
      children: [
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 4,
              border: u,
              boxSizing: "border-box",
              opacity: c.opacity ?? 1
            },
            children: [
              /* @__PURE__ */ h(
                "iframe",
                {
                  src: zu(c.videoId),
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
        e && n && !s && y.map((p) => /* @__PURE__ */ h(
          "div",
          {
            "data-handle": p.key,
            onPointerDown: (g) => {
              g.stopPropagation(), i == null || i(t.id, p.key, g);
            },
            style: {
              position: "absolute",
              left: p.x,
              top: p.y,
              width: f,
              height: f,
              marginLeft: -f / 2,
              marginTop: -f / 2,
              background: "#fff",
              border: "1px solid #3b82f6",
              borderRadius: 2,
              cursor: p.cursor,
              zIndex: 1
            }
          },
          p.key
        ))
      ]
    }
  );
}
const Eu = Le(Au);
function Lu(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    Eu,
    {
      node: e,
      isSelected: t.isSelected,
      engine: t.engine,
      interactive: t.interactive,
      zoom: t.zoom,
      editing: t.editing,
      onResizeHandleDown: t.callbacks.onResizeHandleDown,
      onEditStart: () => {
        var o, n;
        return (n = (o = t.callbacks).onEditStart) == null ? void 0 : n.call(o, e.id);
      },
      onEditEnd: () => {
        var o, n;
        return (n = (o = t.callbacks).onEditEnd) == null ? void 0 : n.call(o);
      }
    }
  );
}
const Ru = {
  type: "youtube",
  component: Lu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, Du = [
  dh,
  lu,
  du,
  uu,
  gu,
  xu,
  ku,
  Cu,
  Ru
];
class Wu {
  constructor(e, o) {
    kt(this, "spatial");
    kt(this, "registry");
    /** Current resolved port values. */
    kt(this, "values", /* @__PURE__ */ new Map());
    /** Node IDs that need recomputation. */
    kt(this, "dirty", /* @__PURE__ */ new Set());
    /** Whether a microtask flush is already scheduled. */
    kt(this, "scheduled", !1);
    /** Generation counter for canceling stale async results. */
    kt(this, "generation", 0);
    /** Change subscribers. */
    kt(this, "listeners", /* @__PURE__ */ new Set());
    /** Node IDs that are part of a cycle (updated after each topoSort). */
    kt(this, "_cycleNodeIds", /* @__PURE__ */ new Set());
    /** Wall time of the last `compute` run per node (sync or async resolution), in ms. */
    kt(this, "lastComputeMs", /* @__PURE__ */ new Map());
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
    return this.values.get(Do(e, o)) ?? null;
  }
  /** Get all input values for a node, resolved from connected edges. */
  getInputs(e) {
    var s;
    const o = this.registry.get(
      ((s = this.spatial.nodes.get(e)) == null ? void 0 : s.type) ?? ""
    );
    if (!(o != null && o.ports)) return {};
    const n = {}, r = o.ports.filter((i) => i.direction === "input");
    for (const i of r) {
      const l = this.spatial.getEdgesForNode(e);
      let d = !1;
      for (const c of l) {
        const a = c.data;
        if (a.toId === e && a.targetPort === i.id) {
          const u = this.values.get(
            Do(a.fromId, a.sourcePort ?? "")
          );
          n[i.id] = u ?? i.defaultValue ?? null, d = !0;
          break;
        }
      }
      d || (n[i.id] = i.defaultValue ?? null);
    }
    return n;
  }
  /** Get all output values for a node. */
  getOutputs(e) {
    var r;
    const o = this.registry.get(
      ((r = this.spatial.nodes.get(e)) == null ? void 0 : r.type) ?? ""
    );
    if (!(o != null && o.ports)) return {};
    const n = {};
    for (const s of o.ports)
      s.direction === "output" && (n[s.id] = this.values.get(Do(e, s.id)) ?? null);
    return n;
  }
  /**
   * Milliseconds for the target node's last `compute` invocation (sync wall time, or
   * async time until the promise settled). Undefined if that node has not run yet.
   * Note: edges do not "process" data — this attributes cost to the downstream node.
   */
  getLastComputeMs(e) {
    return this.lastComputeMs.get(e);
  }
  /** Get all port values (inputs + outputs) for a node. */
  getAllPortValues(e) {
    var r;
    const o = this.registry.get(
      ((r = this.spatial.nodes.get(e)) == null ? void 0 : r.type) ?? ""
    );
    if (!(o != null && o.ports)) return {};
    const n = {};
    for (const s of o.ports)
      if (s.direction === "input") {
        const i = this.spatial.getEdgesForNode(e);
        let l = !1;
        for (const d of i) {
          const c = d.data;
          if (c.toId === e && c.targetPort === s.id) {
            n[s.id] = this.values.get(Do(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, l = !0;
            break;
          }
        }
        l || (n[s.id] = s.defaultValue ?? null);
      } else
        n[s.id] = this.values.get(Do(e, s.id)) ?? null;
    return n;
  }
  /** Mark a node as dirty and schedule recomputation. */
  markDirty(e) {
    this.dirty.add(e), this.scheduleFlush();
  }
  /** Wire up SpatialEngine event listeners. Returns cleanup function. */
  connect() {
    const e = (r) => {
      const s = this.registry.get(r.type);
      s != null && s.ports && this.markDirty(r.id);
    }, o = (r) => {
      if (r.type === "edge") {
        const s = r.data;
        s.targetPort && this.markDirty(s.toId);
      } else {
        const s = this.registry.get(r.type);
        s != null && s.ports && s.compute && this.markDirty(r.id);
      }
    }, n = (r) => {
      if (r.type === "edge") {
        const s = r.data;
        s.targetPort && this.markDirty(s.toId);
      } else {
        const s = this.registry.get(r.type);
        if (s != null && s.ports) {
          for (const i of s.ports)
            this.values.delete(Do(r.id, i.id));
          this.markDownstream(r.id);
        }
      }
    };
    return this.spatial.on("node:data", e), this.spatial.on("node:create", o), this.spatial.on("node:delete", n), this.initializeAll(), () => {
      this.spatial.off("node:data", e), this.spatial.off("node:create", o), this.spatial.off("node:delete", n);
    };
  }
  /** Dispose and clean up. */
  dispose() {
    this.values.clear(), this.dirty.clear(), this.listeners.clear(), this.scheduled = !1, this.lastComputeMs.clear();
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
    for (const n of o) {
      const r = n.data;
      r.fromId === e && r.targetPort && this.dirty.add(r.toId);
    }
  }
  /** Topological sort of dirty nodes + their downstream dependents. */
  topoSort() {
    const e = /* @__PURE__ */ new Set();
    for (const p of this.spatial.nodes.values()) {
      const g = this.registry.get(p.type);
      g != null && g.ports && g.compute && e.add(p.id);
    }
    if (e.size === 0) {
      const p = this._cycleNodeIds.size > 0;
      return p && (this._cycleNodeIds = /* @__PURE__ */ new Set()), { sorted: [], cyclesChanged: p };
    }
    const o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    for (const p of e)
      o.set(p, /* @__PURE__ */ new Set()), n.set(p, 0);
    const r = this.spatial.getAllEdges();
    for (const p of r) {
      const g = p.data;
      g.sourcePort && g.targetPort && e.has(g.fromId) && e.has(g.toId) && (o.get(g.fromId).add(g.toId), n.set(g.toId, (n.get(g.toId) ?? 0) + 1));
    }
    const s = new Set(this.dirty), i = /* @__PURE__ */ new Set(), l = (p) => {
      if (i.has(p)) return;
      i.add(p);
      const g = o.get(p);
      if (g)
        for (const m of g)
          s.add(m), l(m);
    };
    for (const p of [...this.dirty])
      l(p);
    const d = /* @__PURE__ */ new Map();
    for (const p of s)
      d.set(p, 0);
    for (const p of r) {
      const g = p.data;
      g.sourcePort && g.targetPort && s.has(g.fromId) && s.has(g.toId) && d.set(
        g.toId,
        (d.get(g.toId) ?? 0) + 1
      );
    }
    const c = [];
    for (const [p, g] of d)
      g === 0 && c.push(p);
    const a = [];
    for (; c.length > 0; ) {
      const p = c.shift();
      a.push(p);
      const g = o.get(p);
      if (g)
        for (const m of g) {
          if (!s.has(m)) continue;
          const x = (d.get(m) ?? 1) - 1;
          d.set(m, x), x === 0 && c.push(m);
        }
    }
    const u = new Set(a), f = /* @__PURE__ */ new Set();
    for (const p of s)
      u.has(p) || f.add(p);
    let y = !1;
    return (f.size !== this._cycleNodeIds.size || [...f].some((p) => !this._cycleNodeIds.has(p))) && (this._cycleNodeIds = f, y = !0), { sorted: a, cyclesChanged: y };
  }
  /** Full graph recompute of dirty nodes. */
  flush() {
    if (this.dirty.size === 0) return;
    const { sorted: e, cyclesChanged: o } = this.topoSort();
    this.dirty.clear();
    let n = !1;
    for (const r of e)
      this.executeNode(r) && (n = !0);
    (n || o) && this.notifyListeners();
  }
  /** Execute a single node's compute function. Returns true if outputs changed. */
  executeNode(e) {
    const o = this.spatial.nodes.get(e);
    if (!o) return !1;
    const n = this.registry.get(o.type);
    if (!(n != null && n.compute) || !n.ports) return !1;
    const r = this.getInputs(e), s = typeof performance < "u" ? performance.now() : 0, i = n.compute(r, o.data);
    if (i instanceof Promise) {
      const d = ++this.generation;
      return i.then((c) => {
        if (d !== this.generation) return;
        const a = typeof performance < "u" ? performance.now() : 0;
        this.lastComputeMs.set(e, a - s), this.applyOutputs(e, n.ports, c) && (this.markDownstream(e), this.notifyListeners(), this.dirty.size > 0 && this.scheduleFlush());
      }), !1;
    }
    const l = typeof performance < "u" ? performance.now() : 0;
    return this.lastComputeMs.set(e, l - s), this.applyOutputs(e, n.ports, i);
  }
  /** Apply computed outputs to the values map. Returns true if any value changed. */
  applyOutputs(e, o, n) {
    let r = !1;
    for (const s of o) {
      if (s.direction !== "output") continue;
      const i = Do(e, s.id), l = n[s.id] ?? null, d = this.values.get(i) ?? null;
      Bu(d, l) || (this.values.set(i, l), r = !0);
    }
    return r && this.markDownstream(e), r;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function Bu(t, e) {
  if (t === e) return !0;
  if (t == null || e == null || typeof t != typeof e) return !1;
  if (typeof t == "object" && typeof e == "object") {
    const o = Object.keys(t), n = Object.keys(e);
    if (o.length !== n.length) return !1;
    for (const r of o)
      if (t[r] !== e[r])
        return !1;
    return !0;
  }
  return !1;
}
const pn = [
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
function Hn(t) {
  return pn.find((e) => e.key === t) ?? pn[1];
}
function Nu() {
  return {
    staticDefs: /* @__PURE__ */ S("filter", { id: "paper-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ h("feTurbulence", { type: "fractalNoise", baseFrequency: "0.08", numOctaves: 4, seed: 12, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ h("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ h("feDiffuseLighting", { in: "bump", lightingColor: "#f7f4ee", surfaceScale: "1.2", diffuseConstant: "1", result: "lit", children: /* @__PURE__ */ h("feDistantLight", { azimuth: "225", elevation: "50" }) }),
      /* @__PURE__ */ h("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ h("feFlood", { floodColor: "#f5f0e8", result: "base" }),
      /* @__PURE__ */ h("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "paper" }),
      /* @__PURE__ */ h("feTurbulence", { type: "fractalNoise", baseFrequency: "0.6", numOctaves: 3, seed: 7, stitchTiles: "stitch", result: "grain" }),
      /* @__PURE__ */ h("feColorMatrix", { in: "grain", type: "saturate", values: "0", result: "grain-gray" }),
      /* @__PURE__ */ S("feComponentTransfer", { in: "grain-gray", result: "grain-subtle", children: [
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
function Fu() {
  return {
    staticDefs: /* @__PURE__ */ S("filter", { id: "kraft-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ h("feTurbulence", { type: "fractalNoise", baseFrequency: "0.04", numOctaves: 5, seed: 42, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ h("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ h("feDiffuseLighting", { in: "bump", lightingColor: "#e0c9a6", surfaceScale: "1.4", diffuseConstant: "0.95", result: "lit", children: /* @__PURE__ */ h("feDistantLight", { azimuth: "200", elevation: "50" }) }),
      /* @__PURE__ */ h("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ h("feFlood", { floodColor: "#d4b896", result: "base" }),
      /* @__PURE__ */ h("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "kraft" }),
      /* @__PURE__ */ h("feTurbulence", { type: "fractalNoise", baseFrequency: "0.35", numOctaves: 2, seed: 99, stitchTiles: "stitch", result: "fiber" }),
      /* @__PURE__ */ h("feColorMatrix", { in: "fiber", type: "saturate", values: "0", result: "fiber-gray" }),
      /* @__PURE__ */ S("feComponentTransfer", { in: "fiber-gray", result: "fiber-subtle", children: [
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
const ss = {
  "japanese-stationery": Nu,
  kraft: Fu
};
function Hu(t) {
  var e;
  return ((e = ss[t]) == null ? void 0 : e.call(ss)) ?? {};
}
const pl = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, Ou = {
  ...pl,
  willChange: "transform"
}, Xu = Le(function({
  background: e
}) {
  const o = Hn(e), { staticDefs: n, staticLayers: r } = Hu(e);
  return /* @__PURE__ */ S("svg", { style: Ou, children: [
    n && /* @__PURE__ */ h("defs", { children: n }),
    /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    r
  ] });
});
function Yu({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: n = !0
}) {
  const r = e * t.zoom, s = t.x % r, i = t.y % r, d = Hn(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(Xu, { background: o }),
    n && /* @__PURE__ */ S("svg", { style: pl, children: [
      /* @__PURE__ */ h("defs", { children: /* @__PURE__ */ h(
        "pattern",
        {
          id: "grid-dots",
          x: s,
          y: i,
          width: r,
          height: r,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ h("circle", { cx: r / 2, cy: r / 2, r: 1.5, fill: d })
        }
      ) }),
      /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: "url(#grid-dots)" })
    ] })
  ] });
}
const Ls = {
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
}, fl = Bn(Ls);
function oe() {
  return Ge(fl);
}
const Rs = {
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
  viewOnly: "View only",
  togglePerformanceOverlay: "Toggle performance overlay",
  canvasSearchPlaceholder: "Search canvas...",
  canvasSearchOpen: "Search (Ctrl+F)",
  canvasSearchPrev: "Previous match",
  canvasSearchNext: "Next match",
  canvasSearchClose: "Close search",
  minimapTitle: "Minimap — click or drag to pan the canvas",
  toggleMinimap: "Toggle minimap",
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
  edgeAnimationPortHint: "Port links follow output → input",
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
  actionArrangeSelection: "Smart arrange",
  alignMenuHorizontal: "Horizontal",
  alignMenuVertical: "Vertical",
  alignLeft: "Align left edges",
  alignCenterHorizontal: "Align horizontal centers",
  alignRight: "Align right edges",
  alignTop: "Align top edges",
  alignCenterVertical: "Align vertical centers",
  alignBottom: "Align bottom edges",
  alignDistributeHorizontal: "Spread horizontally (equal spacing)",
  alignDistributeVertical: "Spread vertically (equal spacing)",
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
  typeYouTube: "YouTube",
  inspectorNodeHelpShow: "Show node help",
  inspectorNodeHelpHide: "Hide node help",
  customNodeDocs: {}
}, yl = Bn({
  dir: "ltr",
  isRTL: !1,
  labels: Rs
});
function Gu(t) {
  var e;
  return t === "rtl" || t === "ltr" ? t : typeof document < "u" && ((e = document.dir) == null ? void 0 : e.toLowerCase()) === "rtl" ? "rtl" : "ltr";
}
function ju(t, e) {
  return Kt(() => {
    const o = Gu(t), { customNodeDocs: n, ...r } = e ?? {};
    return {
      dir: o,
      isRTL: o === "rtl",
      labels: {
        ...Rs,
        ...r,
        customNodeDocs: {
          ...Rs.customNodeDocs,
          ...n ?? {}
        }
      }
    };
  }, [t, e]);
}
function _t() {
  return Ge(yl);
}
const Pn = 168, An = 112, hn = 6, ir = Pn - hn * 2, ar = An - hn * 2;
function gl(t, e) {
  return t.h === "auto" ? e[t.id] ?? 100 : t.h;
}
function Vu(t, e, o, n, r) {
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
  for (const g of t) {
    if (g.type === "edge") continue;
    const m = gl(g, e);
    s = Math.min(s, g.x), i = Math.min(i, g.y), l = Math.max(l, g.x + g.w), d = Math.max(d, g.y + m);
  }
  const c = o.zoom, a = (0 - o.x) / c, u = (0 - o.y) / c, f = (n - o.x) / c, y = (r - o.y) / c;
  if (!Number.isFinite(s))
    return {
      minX: Math.min(a, f) - 80,
      minY: Math.min(u, y) - 80,
      maxX: Math.max(a, f) + 80,
      maxY: Math.max(u, y) + 80
    };
  const p = 48;
  return s -= p, i -= p, l += p, d += p, s = Math.min(s, a, f), i = Math.min(i, u, y), l = Math.max(l, a, f), d = Math.max(d, u, y), { minX: s, minY: i, maxX: l, maxY: d };
}
function Ku({
  engine: t,
  nodes: e,
  viewport: o,
  containerSize: n,
  measuredHeights: r
}) {
  const s = oe(), { labels: i } = _t(), [l, d] = et(() => t.presentationMode), c = ut(null), a = ut(!1), [u, f] = et(!1);
  St(() => {
    const U = () => d(t.presentationMode);
    return t.on("presentation", U), () => t.off("presentation", U);
  }, [t]);
  const { minX: y, minY: p, maxX: g, maxY: m, scale: x, offsetX: b, offsetY: w } = Kt(() => {
    const { w: U, h: tt } = n;
    if (U <= 0 || tt <= 0)
      return { minX: 0, minY: 0, maxX: 1, maxY: 1, scale: 1, offsetX: 0, offsetY: 0 };
    const dt = Vu(e, r, o, U, tt), _ = Math.max(dt.maxX - dt.minX, 1e-6), ht = Math.max(dt.maxY - dt.minY, 1e-6), gt = Math.min(ir / _, ar / ht), ft = _ * gt, wt = ht * gt;
    return {
      minX: dt.minX,
      minY: dt.minY,
      maxX: dt.maxX,
      maxY: dt.maxY,
      scale: gt,
      offsetX: (ir - ft) / 2,
      offsetY: (ar - wt) / 2
    };
  }, [e, r, o, n]), M = lt(
    (U, tt) => {
      const { w: dt, h: _ } = n;
      if (dt <= 0 || _ <= 0) return;
      const ht = t.viewport.zoom, { x: gt, y: ft } = t.viewport, wt = dt / 2 - U * ht, zt = _ / 2 - tt * ht;
      t.pan(wt - gt, zt - ft);
    },
    [n, t]
  ), v = lt((U, tt) => {
    const dt = c.current;
    if (!dt) return null;
    const _ = dt.getBoundingClientRect();
    if (_.width <= 0 || _.height <= 0) return null;
    const ht = (U - _.left) / _.width * Pn, gt = (tt - _.top) / _.height * An, ft = ht - hn, wt = gt - hn;
    return ft < -0.5 || wt < -0.5 || ft > ir + 0.5 || wt > ar + 0.5 ? null : { ix: ft, iy: wt };
  }, []), C = lt(
    (U, tt) => ({
      wx: y + (U - b) / x,
      wy: p + (tt - w) / x
    }),
    [y, p, b, w, x]
  ), T = lt(
    (U, tt) => {
      const dt = v(U, tt);
      if (!dt) return;
      const { wx: _, wy: ht } = C(dt.ix, dt.iy);
      M(_, ht);
    },
    [v, C, M]
  ), E = lt(
    (U) => {
      U.stopPropagation(), U.button === 0 && (a.current = !0, f(!0), U.currentTarget.setPointerCapture(U.pointerId), T(U.clientX, U.clientY));
    },
    [T]
  ), z = lt(
    (U) => {
      a.current && T(U.clientX, U.clientY);
    },
    [T]
  ), j = lt((U) => {
    a.current = !1, f(!1);
    try {
      U.currentTarget.releasePointerCapture(U.pointerId);
    } catch {
    }
  }, []);
  if (l || n.w <= 0 || n.h <= 0)
    return null;
  const Y = o.zoom, nt = n.w, rt = n.h, pt = (0 - o.x) / Y, xt = (0 - o.y) / Y, mt = (nt - o.x) / Y, W = (rt - o.y) / Y, B = b + (pt - y) * x, G = w + (xt - p) * x, q = Math.max(2, (mt - pt) * x), J = Math.max(2, (W - xt) * x), H = [];
  for (const U of e) {
    if (U.type === "edge") continue;
    const tt = gl(U, r), dt = b + (U.x - y) * x, _ = w + (U.y - p) * x, ht = Math.max(1.5, U.w * x), gt = Math.max(1.5, tt * x);
    H.push(
      /* @__PURE__ */ h(
        "rect",
        {
          x: dt,
          y: _,
          width: ht,
          height: gt,
          rx: 1,
          fill: s.accentColor,
          fillOpacity: 0.45,
          stroke: "none"
        },
        U.id
      )
    );
  }
  const $ = s.border, st = s.controlBg, it = s.accentColor;
  return /* @__PURE__ */ h(
    "div",
    {
      "data-sb-minimap": !0,
      style: {
        position: "absolute",
        insetInlineEnd: 12,
        bottom: 56,
        width: Pn,
        height: An,
        zIndex: 9998,
        pointerEvents: "auto",
        touchAction: "none",
        borderRadius: s.controlBorderRadius,
        boxShadow: s.panelShadow
      },
      onPointerDown: (U) => U.stopPropagation(),
      children: /* @__PURE__ */ S(
        "svg",
        {
          ref: c,
          width: Pn,
          height: An,
          role: "img",
          "aria-label": i.minimapTitle,
          style: {
            display: "block",
            cursor: u ? "grabbing" : "grab",
            borderRadius: s.controlBorderRadius,
            overflow: "hidden"
          },
          onPointerDown: E,
          onPointerMove: z,
          onPointerUp: j,
          onPointerCancel: j,
          children: [
            /* @__PURE__ */ h("rect", { x: 0, y: 0, width: Pn, height: An, fill: st, stroke: $, strokeWidth: 1 }),
            /* @__PURE__ */ S("g", { transform: `translate(${hn}, ${hn})`, children: [
              /* @__PURE__ */ h(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: ir,
                  height: ar,
                  fill: "rgba(255,255,255,0.04)",
                  stroke: $,
                  strokeOpacity: 0.5,
                  strokeWidth: 0.5
                }
              ),
              H,
              /* @__PURE__ */ h(
                "rect",
                {
                  x: B,
                  y: G,
                  width: q,
                  height: J,
                  fill: it,
                  fillOpacity: 0.12,
                  stroke: it,
                  strokeWidth: 1.25,
                  strokeOpacity: 0.95,
                  pointerEvents: "none"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const ml = "sb-excalib-index", ti = "sb-excalib-";
function Pr() {
  try {
    const t = localStorage.getItem(ml);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function bl(t) {
  localStorage.setItem(ml, JSON.stringify(t));
}
function qu(t) {
  try {
    const e = localStorage.getItem(ti + t);
    return e ? ei(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function ei(t) {
  if (t.libraryItems)
    return t;
  const o = (t.library ?? []).map((n, r) => ({
    id: Rt(10),
    name: `Item ${r + 1}`,
    status: "published",
    created: Date.now(),
    elements: n
  }));
  return {
    type: "excalidrawlib",
    version: 2,
    source: t.source,
    libraryItems: o
  };
}
function xl() {
  return Pr();
}
function oi(t) {
  const e = qu(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function ni(t, e) {
  const o = ei(t), n = Rt(10), r = o.libraryItems.map((l) => l.name || "Untitled"), s = {
    id: n,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: r
  };
  localStorage.setItem(ti + n, JSON.stringify(o));
  const i = Pr();
  return i.push(s), bl(i), s;
}
function Uu(t) {
  localStorage.removeItem(ti + t);
  const e = Pr().filter((o) => o.id !== t);
  bl(e);
}
function Zu(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], n = Pr();
  for (const r of n) {
    if (!r.itemNames.some((l) => l.toLowerCase().includes(e)) && !r.name.toLowerCase().includes(e)) continue;
    const i = oi(r.id);
    for (const l of i)
      ((l.name || "").toLowerCase().includes(e) || r.name.toLowerCase().includes(e)) && o.push({ library: r, item: l });
  }
  return o;
}
async function Qu(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const n = await o.json();
  if (n.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const r = ei(n);
  return ni(r, { name: e, source: t });
}
function wl(t) {
  const e = t.visualViewport;
  return {
    vw: (e == null ? void 0 : e.width) ?? t.innerWidth,
    vh: (e == null ? void 0 : e.height) ?? t.innerHeight
  };
}
const kl = 8;
function vl(t, e, o, n, r, s = kl) {
  const { vw: i, vh: l } = wl(r);
  let d = t;
  d + o + s > i && (d = t - o), d = Math.max(s, Math.min(d, i - o - s));
  let c = e;
  if (n + s * 2 <= l) {
    if (c + n + s > l) {
      const f = e - n;
      e - s >= n ? c = f : c = l - n - s;
    }
    c < s && (c = s);
  } else
    c = s;
  const u = Math.max(s, l - n - s);
  return c = Math.max(s, Math.min(c, u)), { left: d, top: c };
}
function Sl(t, e, o, n, r) {
  const i = kl, { vw: l, vh: d } = wl(n);
  let c = t.right + 8;
  c + e + i > l && (c = t.left - e - 8), c < i && (c = i), c = Math.max(i, Math.min(c, l - e - i));
  let a = t.top;
  a + o + i > d && (a = d - o - i), a < i && (a = i);
  const u = Math.max(i, d - o - i);
  return a = Math.max(i, Math.min(a, u)), { left: c, top: a };
}
function Ml(t, e, o, n = []) {
  Co(() => {
    if (!t) return;
    const r = o.current;
    if (!r) return;
    const s = r.ownerDocument.defaultView ?? window, i = () => {
      var u;
      const d = (u = e.current) == null ? void 0 : u.getBoundingClientRect();
      if (!d) return;
      const c = r.getBoundingClientRect(), a = Sl(d, c.width, c.height, s);
      r.style.left = `${a.left}px`, r.style.top = `${a.top}px`;
    };
    i();
    const l = new ResizeObserver(i);
    return l.observe(r), () => l.disconnect();
  }, [t, e, o, ...n]);
}
function ri(t, e, o, n = []) {
  Co(() => {
    if (!t || !e) return;
    const r = o.current;
    if (!r) return;
    const s = r.ownerDocument.defaultView ?? window, i = () => {
      const d = r.getBoundingClientRect(), c = Sl(e, d.width, d.height, s);
      r.style.left = `${c.left}px`, r.style.top = `${c.top}px`;
    };
    i();
    const l = new ResizeObserver(i);
    return l.observe(r), () => l.disconnect();
  }, [t, e, o, ...n]);
}
function On(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function Go(t) {
  if (t)
    return t * (180 / Math.PI);
}
function Cl(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function Il(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function Tl(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function zl(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function Pl(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function Ju(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function is(t, e) {
  return {
    id: Rt(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: Go(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: Cl(t.backgroundColor),
      fillStyle: Il(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Tl(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: On(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? Ju(t) : void 0
    }
  };
}
function ra(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const n = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Tl(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: On(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [l, d] = o, c = Math.min(l[0], d[0]), a = Math.min(l[1], d[1]), u = Math.max(l[0], d[0]), f = Math.max(l[1], d[1]), y = Math.max(u - c, 1), p = Math.max(f - a, 1);
    return [
      {
        id: Rt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + a,
        w: y,
        h: p,
        z: 0,
        rotation: Go(t.angle),
        locked: t.locked || void 0,
        data: {
          ...n,
          shape: e ? "arrow" : "line",
          startPoint: [l[0] - c, l[1] - a],
          endPoint: [d[0] - c, d[1] - a]
        }
      }
    ];
  }
  if (t.backgroundColor && t.backgroundColor !== "transparent") {
    const l = $u(t);
    if (l) return [l];
  }
  const s = Rt(10), i = [];
  for (let l = 0; l < o.length - 1; l++) {
    const d = o[l], c = o[l + 1], a = Math.min(d[0], c[0]), u = Math.min(d[1], c[1]), f = Math.max(d[0], c[0]), y = Math.max(d[1], c[1]), p = Math.max(f - a, 1), g = Math.max(y - u, 1), m = l === o.length - 2;
    i.push({
      id: Rt(10),
      type: "shape",
      x: t.x + a,
      y: t.y + u,
      w: p,
      h: g,
      z: 0,
      rotation: Go(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...n,
        shape: e && m ? "arrow" : "line",
        startPoint: [d[0] - a, d[1] - u],
        endPoint: [c[0] - a, c[1] - u]
      }
    });
  }
  return i;
}
function $u(t) {
  const e = t.points ?? [];
  if (e.length < 3) return null;
  let o = 1 / 0, n = 1 / 0, r = -1 / 0, s = -1 / 0;
  for (const [l, d] of e)
    l < o && (o = l), d < n && (n = d), l > r && (r = l), d > s && (s = d);
  if (!isFinite(o)) return null;
  const i = e.map(([l, d]) => [
    l - o,
    d - n,
    0.5
  ]);
  return {
    id: Rt(10),
    type: "draw",
    x: t.x + o,
    y: t.y + n,
    w: Math.max(r - o, 1),
    h: Math.max(s - n, 1),
    z: 0,
    rotation: Go(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: On(t.opacity ?? 100),
      fill: Cl(t.backgroundColor),
      fillStyle: Il(t.fillStyle)
    }
  };
}
function _u(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, n = t.simulatePressure !== !1, r = e.map((a, u) => {
    const f = !n && o && u < o.length ? o[u] : 0.5;
    return [a[0], a[1], f];
  });
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
  for (const [a, u] of r)
    a < s && (s = a), u < i && (i = u), a > l && (l = a), u > d && (d = u);
  isFinite(s) || (s = 0, i = 0, l = 0, d = 0);
  const c = r.map(
    ([a, u, f]) => [a - s, u - i, f]
  );
  return {
    id: Rt(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(l - s, 1),
    h: Math.max(d - i, 1),
    z: 0,
    rotation: Go(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: On(t.opacity ?? 100)
    }
  };
}
function tp(t) {
  return {
    id: Rt(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: Go(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: zl(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Pl(t.textAlign),
      opacity: On(t.opacity ?? 100)
    }
  };
}
function ep(t) {
  return {
    id: Rt(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: Go(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function Al(t) {
  return op(t.elements);
}
function op(t) {
  const e = [], o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && r.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [is(s, "rect")];
        break;
      case "ellipse":
        i = [is(s, "ellipse")];
        break;
      case "diamond":
        i = [is(s, "diamond")];
        break;
      case "arrow":
        i = ra(s, !0);
        break;
      case "line":
        i = ra(s, !1);
        break;
      case "freedraw": {
        const l = _u(s);
        l && (i = [l]);
        break;
      }
      case "text":
        i = [tp(s)];
        break;
      case "frame":
      case "magicframe":
        i = [ep(s)];
        break;
      case "image":
        continue;
      default:
        continue;
    }
    i.length > 0 && o.set(s.id, i[0].id), e.push(...i);
  }
  for (const [s, i] of r) {
    const l = o.get(s);
    if (!l) continue;
    const d = e.find((a) => a.id === l);
    if (!d || d.type !== "shape") continue;
    const c = d.data;
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = zl(i.fontFamily), c.labelAlign = Pl(i.textAlign);
  }
  return np(t, e, o, n), rp(e), { nodes: e, groupParent: n };
}
function np(t, e, o, n) {
  var s;
  const r = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (i.isDeleted || !((s = i.groupIds) != null && s.length)) continue;
    for (let d = 0; d < i.groupIds.length - 1; d++) {
      const c = i.groupIds[d], a = i.groupIds[d + 1];
      r.has(c) || r.set(c, a);
    }
    const l = o.get(i.id);
    if (l) {
      const d = e.find((c) => c.id === l);
      d && (d.groupId = i.groupIds[0]);
    }
  }
  for (const [i, l] of r)
    n.set(i, l);
}
function rp(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const n of t)
    n.x < e && (e = n.x), n.y < o && (o = n.y);
  if (isFinite(e))
    for (const n of t)
      n.x -= e, n.y -= o;
}
function si(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, n = 1 / 0, r = -1 / 0, s = -1 / 0;
  for (const u of t) {
    const f = u.h === "auto" ? 40 : u.h;
    o = Math.min(o, u.x), n = Math.min(n, u.y), r = Math.max(r, u.x + u.w), s = Math.max(s, u.y + f);
  }
  const i = r - o || 1, l = s - n || 1, d = 4, c = `${o - d} ${n - d} ${i + d * 2} ${l + d * 2}`, a = [];
  for (const u of t)
    switch (u.type) {
      case "shape":
        a.push(sp(u));
        break;
      case "draw":
        a.push(ip(u));
        break;
      case "text":
        a.push(ap(u));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${a.join("")}</svg>`;
}
function El(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function sp(t) {
  var f, y, p, g;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, n = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: no(e.strokeStyle),
    seed: t.id
  }, r = ((f = e.startPoint) == null ? void 0 : f[0]) ?? 0, s = ((y = e.startPoint) == null ? void 0 : y[1]) ?? o / 2, i = ((p = e.endPoint) == null ? void 0 : p[0]) ?? t.w, l = ((g = e.endPoint) == null ? void 0 : g[1]) ?? o / 2;
  let d;
  switch (e.shape) {
    case "rect":
      d = Wn(t.x, t.y, t.w, o, n, e.edgeStyle === "round");
      break;
    case "ellipse":
      d = Ir(t.x + t.w / 2, t.y + o / 2, t.w, o, n);
      break;
    case "diamond":
      d = Tr(t.x, t.y, t.w, o, n, e.edgeStyle === "round");
      break;
    case "line":
      d = Oo(t.x + r, t.y + s, t.x + i, t.y + l, n);
      break;
    case "arrow":
      d = zr(t.x + r, t.y + s, t.x + i, t.y + l, n);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, a = c < 1 ? `<g opacity="${c}">` : "<g>", u = d.map(
    (m) => `<path d="${El(m.d)}" fill="${m.fill || "none"}" stroke="${m.stroke}" stroke-width="${m.strokeWidth}"${m.strokeDasharray ? ` stroke-dasharray="${m.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${a}${u.join("")}</g>`;
}
function ip(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), n = e.opacity ?? 1, r = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${r}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${n < 1 ? ` opacity="${n}"` : ""}/>`;
}
function ap(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), n = e.opacity ?? 1, r = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${n < 1 ? ` opacity="${n}"` : ""}>${El(r)}</text>`;
}
const Ll = "sb-personal-library";
function ii() {
  try {
    const t = localStorage.getItem(Ll);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Rl(t) {
  localStorage.setItem(Ll, JSON.stringify(t));
}
function Dl() {
  return ii();
}
function lp(t, e, o) {
  const n = structuredClone(e);
  if (n.length > 0) {
    let d = 1 / 0, c = 1 / 0;
    for (const a of n)
      a.x < d && (d = a.x), a.y < c && (c = a.y);
    if (isFinite(d))
      for (const a of n)
        a.x -= d, a.y -= c;
  }
  const r = new Set(
    n.map((d) => d.groupId).filter(Boolean)
  ), s = [];
  for (const [d, c] of o)
    r.has(d) && s.push([d, c]);
  const i = {
    id: Rt(10),
    name: t.trim() || "Untitled",
    nodes: n,
    groupParent: s,
    createdAt: Date.now()
  }, l = ii();
  return l.unshift(i), Rl(l), i;
}
function cp(t) {
  const e = ii().filter((o) => o.id !== t);
  Rl(e);
}
function Wl(t, e, o, n) {
  const { nodes: r, groupParent: s } = Al(e);
  if (r.length === 0) return;
  const i = structuredClone(r), l = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const b of i) {
    const w = Rt(10);
    l.set(b.id, w), b.id = w;
  }
  for (const b of i)
    b.groupId && (d.has(b.groupId) || d.set(b.groupId, Rt(10)), b.groupId = d.get(b.groupId));
  let c = 1 / 0, a = 1 / 0, u = -1 / 0, f = -1 / 0;
  for (const b of i) {
    const w = b.h === "auto" ? 100 : b.h;
    c = Math.min(c, b.x), a = Math.min(a, b.y), u = Math.max(u, b.x + b.w), f = Math.max(f, b.y + w);
  }
  const y = o ?? window.innerWidth / 2, p = n ?? window.innerHeight / 2, g = t.screenToCanvas(y, p), m = g.x - (c + u) / 2, x = g.y - (a + f) / 2;
  for (const b of i)
    b.x += m, b.y += x, b.z = t.nextZ();
  t.addNodes(i);
  for (const [b, w] of s) {
    const M = d.get(b) ?? b, v = d.get(w) ?? w;
    t.groupParent.set(M, v);
  }
  t.selectMultiple(i.map((b) => b.id));
}
const Ds = "application/x-spatialboard-library-item", Ws = "application/x-spatialboard-personal-item";
function Bl(t, e, o, n) {
  if (e.nodes.length === 0) return;
  const r = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const m of r) {
    const x = Rt(10);
    s.set(m.id, x), m.id = x;
  }
  for (const m of r)
    m.groupId && (i.has(m.groupId) || i.set(m.groupId, Rt(10)), m.groupId = i.get(m.groupId));
  for (const m of r)
    if (m.type === "edge") {
      const x = m.data;
      x.fromId && s.has(x.fromId) && (x.fromId = s.get(x.fromId)), x.toId && s.has(x.toId) && (x.toId = s.get(x.toId));
    }
  let l = 1 / 0, d = 1 / 0, c = -1 / 0, a = -1 / 0;
  for (const m of r) {
    const x = m.h === "auto" ? 100 : m.h;
    l = Math.min(l, m.x), d = Math.min(d, m.y), c = Math.max(c, m.x + m.w), a = Math.max(a, m.y + x);
  }
  const u = o ?? window.innerWidth / 2, f = n ?? window.innerHeight / 2, y = t.screenToCanvas(u, f), p = y.x - (l + c) / 2, g = y.y - (d + a) / 2;
  for (const m of r)
    m.x += p, m.y += g, m.z = t.nextZ();
  t.addNodes(r);
  for (const [m, x] of e.groupParent) {
    const b = i.get(m) ?? m, w = i.get(x) ?? x;
    t.groupParent.set(b, w);
  }
  t.selectMultiple(r.map((m) => m.id));
}
const fn = /* @__PURE__ */ new Map();
function dp({ item: t }) {
  const e = Kt(() => {
    const o = fn.get(t.id);
    if (o) return o;
    const { nodes: n } = Al(t), r = si(n, 56);
    return fn.set(t.id, r), r;
  }, [t.id]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Nl({
  item: t,
  libId: e,
  onClick: o,
  theme: n
}) {
  const { labels: r } = _t(), s = lt(
    (i) => {
      i.dataTransfer.setData(
        Ds,
        JSON.stringify({ libraryId: e, itemId: t.id })
      ), i.dataTransfer.effectAllowed = "copy";
    },
    [e, t.id]
  );
  return /* @__PURE__ */ h(
    "button",
    {
      title: t.name || r.librariesUntitled,
      onClick: o,
      draggable: !0,
      onDragStart: s,
      style: {
        border: `1px solid ${n.border}`,
        borderRadius: 4,
        background: n.controlBg,
        cursor: "grab",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: "1"
      },
      children: /* @__PURE__ */ h(dp, { item: t })
    }
  );
}
function hp({ nodes: t }) {
  const e = Kt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), n = fn.get(o);
    if (n) return n;
    const r = si(t, 56);
    return fn.set(o, r), r;
  }, [t]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Fl({
  item: t,
  onClick: e,
  onRemove: o,
  theme: n
}) {
  const { labels: r } = _t(), [s, i] = et(!1), l = lt(
    (d) => {
      d.dataTransfer.setData(
        Ws,
        JSON.stringify({ itemId: t.id })
      ), d.dataTransfer.effectAllowed = "copy";
    },
    [t.id]
  );
  return /* @__PURE__ */ S(
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
            onDragStart: l,
            style: {
              border: `1px solid ${n.border}`,
              borderRadius: 4,
              background: n.controlBg,
              cursor: "grab",
              padding: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%"
            },
            children: /* @__PURE__ */ h(hp, { nodes: t.nodes })
          }
        ),
        s && /* @__PURE__ */ h(
          "button",
          {
            title: r.librariesRemoveFromPersonal,
            onClick: (d) => {
              d.stopPropagation(), o();
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
function up({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n,
  onBrowseDirectory: r
}) {
  const s = oe(), { labels: i } = _t(), l = ut(null), d = ut(null), [c, a] = et([]), [u, f] = et([]), [y, p] = et(""), [g, m] = et(/* @__PURE__ */ new Set());
  ri(e && !!n, n, l, [
    c.length,
    u.length,
    y,
    g.size
  ]);
  const x = lt(() => {
    a(xl()), f(Dl());
  }, []);
  St(() => {
    e && x();
  }, [e, x]), St(() => {
    if (!e) return;
    const z = (j) => {
      l.current && !l.current.contains(j.target) && o();
    };
    return document.addEventListener("pointerdown", z), () => document.removeEventListener("pointerdown", z);
  }, [e, o]);
  const b = lt(
    (z) => {
      var nt;
      const j = (nt = z.target.files) == null ? void 0 : nt[0];
      if (!j) return;
      const Y = new FileReader();
      Y.onload = () => {
        try {
          const rt = JSON.parse(Y.result);
          if (rt.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const pt = j.name.replace(/\.excalidrawlib$/, "");
          ni(rt, { name: pt }), x();
        } catch (rt) {
          console.error("Failed to parse library file:", rt);
        }
      }, Y.readAsText(j), z.target.value = "";
    },
    [x]
  ), w = lt(
    (z) => {
      Uu(z), fn.clear(), x();
    },
    [x]
  ), M = lt(
    (z) => {
      Wl(t, z);
    },
    [t]
  ), v = lt(
    (z) => {
      Bl(t, z);
    },
    [t]
  ), C = lt(
    (z) => {
      cp(z), fn.clear(), x();
    },
    [x]
  ), T = lt((z) => {
    m((j) => {
      const Y = new Set(j);
      return Y.has(z) ? Y.delete(z) : Y.add(z), Y;
    });
  }, []), E = Kt(() => {
    if (!y.trim()) return null;
    const z = y.toLowerCase(), j = Zu(y), Y = u.filter(
      (nt) => nt.name.toLowerCase().includes(z)
    );
    return { excalidraw: j, personal: Y };
  }, [y, u]);
  return !e || !n ? null : Ze(
    /* @__PURE__ */ S(
      "div",
      {
        ref: l,
        style: {
          position: "fixed",
          left: n.right + 8,
          top: n.top,
          background: s.panelBg,
          border: `1px solid ${s.border}`,
          borderRadius: s.panelBorderRadius,
          padding: 0,
          zIndex: 99999,
          boxShadow: s.panelShadow,
          width: 280,
          maxHeight: "min(480px, calc(100dvh - 16px))",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (z) => z.stopPropagation(),
        children: [
          /* @__PURE__ */ S("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
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
                value: y,
                onChange: (z) => p(z.target.value),
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
              children: E !== null ? E.excalidraw.length === 0 && E.personal.length === 0 ? /* @__PURE__ */ h(
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
              ) : /* @__PURE__ */ S(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 4
                  },
                  children: [
                    E.personal.map((z) => /* @__PURE__ */ h(
                      Fl,
                      {
                        item: z,
                        onClick: () => v(z),
                        onRemove: () => C(z.id),
                        theme: s
                      },
                      z.id
                    )),
                    E.excalidraw.map(({ library: z, item: j }) => /* @__PURE__ */ h(
                      Nl,
                      {
                        item: j,
                        libId: z.id,
                        onClick: () => M(j),
                        theme: s
                      },
                      j.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ S(Mt, { children: [
                u.length > 0 && /* @__PURE__ */ h(
                  fp,
                  {
                    items: u,
                    onPlace: v,
                    onRemove: C,
                    theme: s
                  }
                ),
                c.length === 0 && u.length === 0 ? /* @__PURE__ */ S(
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
                ) : c.map((z) => {
                  const j = g.has(z.id);
                  return /* @__PURE__ */ h(
                    pp,
                    {
                      lib: z,
                      expanded: j,
                      onToggle: () => T(z.id),
                      onPlace: M,
                      onUninstall: () => w(z.id),
                      theme: s
                    },
                    z.id
                  );
                })
              ] })
            }
          ),
          /* @__PURE__ */ S(
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
                      var z;
                      return (z = d.current) == null ? void 0 : z.click();
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
                    onClick: r,
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
              ref: d,
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
function pp({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: n,
  onUninstall: r,
  theme: s
}) {
  const { labels: i } = _t(), [l, d] = et(null);
  return St(() => {
    e && l === null && d(oi(t.id));
  }, [e, l, t.id]), /* @__PURE__ */ S("div", { style: { marginBottom: 4 }, children: [
    /* @__PURE__ */ S(
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
                c.stopPropagation(), r();
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
    e && l && /* @__PURE__ */ h(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: l.map((c) => /* @__PURE__ */ h(
          Nl,
          {
            item: c,
            libId: t.id,
            onClick: () => n(c),
            theme: s
          },
          c.id
        ))
      }
    )
  ] });
}
function fp({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: n
}) {
  const { labels: r } = _t(), [s, i] = et(!0);
  return /* @__PURE__ */ S("div", { style: { marginBottom: 4 }, children: [
    /* @__PURE__ */ S(
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
        onClick: () => i((l) => !l),
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
                  stroke: n.textMuted,
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
                color: n.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.03em"
              },
              children: r.librariesPersonal
            }
          ),
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                fontSize: 9,
                color: n.textDisabled
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
        children: t.map((l) => /* @__PURE__ */ h(
          Fl,
          {
            item: l,
            onClick: () => e(l),
            onRemove: () => o(l.id),
            theme: n
          },
          l.id
        ))
      }
    )
  ] });
}
async function yp(t, e, o = 1, n = 20, r) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${n}`;
  return (await fetch(s, { signal: r, credentials: "include" })).json();
}
async function sa(t, e = 1, o = 20, n) {
  const r = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(r, { signal: n, credentials: "include" })).json();
}
const Bs = "application/x-spatialboard-gif-item";
function Hl(t, e, o, n) {
  const r = e.file.hd.gif, s = 400, i = 300;
  let l = r.width, d = r.height;
  const c = Math.min(1, s / l, i / d);
  l = Math.round(l * c), d = Math.round(d * c);
  const a = o ?? window.innerWidth / 2, u = n ?? window.innerHeight / 2, f = t.screenToCanvas(a, u), y = {
    id: Rt(10),
    type: "image",
    x: f.x - l / 2,
    y: f.y - d / 2,
    w: l,
    h: d,
    z: t.nextZ(),
    data: { src: r.url }
  };
  t.addNode(y), t.select(y.id);
}
function gp({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n,
  baseUrl: r
}) {
  const s = oe(), { labels: i } = _t(), l = ut(null), d = ut(null), [c, a] = et(""), [u, f] = et([]), [y, p] = et(!1), [g, m] = et(1), [x, b] = et(!1), w = ut();
  ri(e && !!n, n, l, [
    u.length,
    y
  ]), St(() => {
    if (!e) return;
    const E = (z) => {
      l.current && !l.current.contains(z.target) && o();
    };
    return document.addEventListener("pointerdown", E), () => document.removeEventListener("pointerdown", E);
  }, [e, o]), St(() => {
    if (!e || c.trim()) return;
    const E = new AbortController();
    return p(!0), sa(r, 1, 30, E.signal).then((z) => {
      f(z.data.data.filter((j) => j.type !== "ad")), m(1), b(z.data.has_next);
    }).catch(() => {
    }).finally(() => p(!1)), () => E.abort();
  }, [e, r, c]);
  const M = lt(
    (E, z, j) => {
      if (!E.trim()) return;
      const Y = new AbortController();
      return p(!0), yp(r, E, z, 30, Y.signal).then((nt) => {
        const rt = nt.data.data.filter((pt) => pt.type !== "ad");
        f((pt) => j ? [...pt, ...rt] : rt), m(z), b(nt.data.has_next);
      }).catch(() => {
      }).finally(() => p(!1)), Y;
    },
    [r]
  ), v = lt(
    (E) => {
      if (a(E), w.current && clearTimeout(w.current), !E.trim()) {
        f([]), m(1), b(!1);
        return;
      }
      w.current = setTimeout(() => {
        M(E, 1, !1);
      }, 350);
    },
    [M]
  ), C = lt(() => {
    const E = d.current;
    !E || y || !x || E.scrollTop + E.clientHeight >= E.scrollHeight - 100 && (c.trim() ? M(c, g + 1, !0) : (p(!0), sa(r, g + 1, 30).then((z) => {
      const j = z.data.data.filter((Y) => Y.type !== "ad");
      f((Y) => [...Y, ...j]), m(g + 1), b(z.data.has_next);
    }).catch(() => {
    }).finally(() => p(!1))));
  }, [y, x, c, g, M, r]), T = lt(
    (E) => {
      Hl(t, E);
    },
    [t]
  );
  return !e || !n ? null : Ze(
    /* @__PURE__ */ S(
      "div",
      {
        ref: l,
        style: {
          position: "fixed",
          left: n.right + 8,
          top: n.top,
          background: s.panelBg,
          border: `1px solid ${s.border}`,
          borderRadius: s.panelBorderRadius,
          padding: 0,
          zIndex: 99999,
          boxShadow: s.panelShadow,
          width: 300,
          maxHeight: "min(420px, calc(100dvh - 16px))",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (E) => E.stopPropagation(),
        children: [
          /* @__PURE__ */ S("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
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
                onChange: (E) => v(E.target.value),
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
          /* @__PURE__ */ S(
            "div",
            {
              ref: d,
              onScroll: C,
              style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "4px 12px",
                minHeight: 200
              },
              children: [
                u.length === 0 && !y ? /* @__PURE__ */ h(
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
                    children: u.map((E) => /* @__PURE__ */ h(
                      mp,
                      {
                        item: E,
                        onClick: () => T(E),
                        engine: t,
                        theme: s
                      },
                      E.id
                    ))
                  }
                ),
                y && /* @__PURE__ */ h(
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
function mp({
  item: t,
  onClick: e,
  engine: o,
  theme: n
}) {
  const r = t.file.sm.webp, s = r.width / r.height, i = ut(0), l = lt(
    (a) => {
      a.dataTransfer.setData(Bs, JSON.stringify(t)), a.dataTransfer.effectAllowed = "copy";
    },
    [t]
  ), d = lt((a) => {
    a.dataTransfer.dropEffect !== "none" && (i.current = performance.now() + 450);
  }, []), c = lt(
    (a) => {
      if (performance.now() < i.current) {
        a.preventDefault(), a.stopPropagation();
        return;
      }
      e();
    },
    [e]
  );
  return /* @__PURE__ */ h(
    "button",
    {
      title: t.title,
      onClick: c,
      draggable: !0,
      onDragStart: l,
      onDragEnd: d,
      style: {
        border: `1px solid ${n.border}`,
        borderRadius: n.controlBorderRadius,
        background: n.controlBg,
        cursor: "grab",
        padding: 0,
        overflow: "hidden",
        aspectRatio: s > 1.5 ? "16/9" : s < 0.7 ? "3/4" : "1"
      },
      children: /* @__PURE__ */ h(
        "img",
        {
          src: r.url,
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
function bp({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [n, r] = et(""), s = ut(null), i = ut(null);
  St(() => {
    var u;
    (u = s.current) == null || u.focus();
  }, []);
  const l = Kt(() => si(t, 56), [t]), d = lt(() => {
    e(n.trim() || "Untitled");
  }, [n, e]), c = lt(
    (u) => {
      u.key === "Enter" ? (u.preventDefault(), d()) : u.key === "Escape" && (u.preventDefault(), o());
    },
    [d, o]
  ), a = lt(
    (u) => {
      i.current && !i.current.contains(u.target) && o();
    },
    [o]
  );
  return Ze(
    /* @__PURE__ */ h(
      "div",
      {
        onClick: a,
        style: {
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */ S(
          "div",
          {
            ref: i,
            onPointerDown: (u) => u.stopPropagation(),
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
                  children: /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: l } })
                }
              ),
              /* @__PURE__ */ h(
                "input",
                {
                  ref: s,
                  type: "text",
                  value: n,
                  onChange: (u) => r(u.target.value),
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
              /* @__PURE__ */ S("div", { style: { display: "flex", gap: 8, justifyContent: "flex-end" }, children: [
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
                    onClick: d,
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
const gn = Bn(
  null
);
function Ar(t, e) {
  const o = ut(null), n = ut(0), r = lt(() => (o.current || (o.current = `${e}:${++n.current}`), o.current), [e]);
  return St(() => {
    o.current = null, t.endHistoryCoalesce();
  }, [e, t]), St(() => {
    const s = () => {
      o.current = null, t.endHistoryCoalesce();
    }, i = typeof document < "u" ? document : null;
    if (i)
      return i.addEventListener("pointerup", s), i.addEventListener("pointercancel", s), () => {
        i.removeEventListener("pointerup", s), i.removeEventListener("pointercancel", s);
      };
  }, [t]), r;
}
function Ns(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function xp(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Ol(t, e, o, n) {
  return new Promise((r) => {
    const s = xp(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, a = i.naturalHeight || 200;
      if (c <= 1 || a <= 1) {
        const u = t.match(/viewBox=["']([^"']+)["']/i);
        if (u) {
          const f = u[1].trim().split(/[\s,]+/).map(Number);
          f.length === 4 && f[2] > 0 && f[3] > 0 && (c = f[2], a = f[3]);
        }
      }
      if (c > 400 || a > 400) {
        const u = Math.min(400 / c, 400 / a);
        c = Math.round(c * u), a = Math.round(a * u);
      }
      r({
        id: Rt(10),
        type: "image",
        x: e,
        y: o,
        w: c,
        h: a,
        z: n,
        data: { src: s }
      });
    }, i.onerror = () => r(null), i.src = s;
  });
}
async function wp(t, e, o, n) {
  const { x: r, y: s } = t.screenToCanvas(o, n), i = await Ol(e, r, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
function kp() {
  if (typeof navigator > "u") return !1;
  const t = navigator.userAgent, e = /iPhone|iPad|iPod/i.test(t);
  return /Chrome|Chromium|EdgA?|OPR|Brave/i.test(t) && !e || /Firefox/i.test(t) ? !1 : e ? !0 : /Safari/i.test(t) && !/Chrome|Chromium|Edg/i.test(t);
}
function vp(t) {
  return {
    fromNodeId: t.fromNode.id,
    cursorX: t.cursorX,
    cursorY: t.cursorY,
    sourceHandle: t.sourceHandle,
    sourceT: t.sourceT,
    sourcePort: t.sourcePort,
    sourceDirection: t.sourceDirection,
    edgeColor: t.edgeColor,
    edgeStrokeWidth: t.edgeStrokeWidth,
    edgeStyle: t.edgeStyle,
    edgeType: t.edgeType,
    attachmentGap: t.attachmentGap
  };
}
function Sp(t) {
  return !Number.isFinite(t) || t < 0 ? "" : t < 0.05 ? "<0.05 ms" : t < 10 ? `${t < 1 ? t.toFixed(2) : t.toFixed(1)} ms` : `${Math.round(t)} ms`;
}
function Mp(t, e, o) {
  if (!t || !o || !e.id) return null;
  const n = t.get(e.type);
  if (!(n != null && n.ports)) return null;
  for (const r of n.ports) {
    if (r.direction !== "output" || r.id !== "error" && r.id !== "err") continue;
    const s = o(e.id, r.id), i = s != null && s !== void 0 ? String(s).trim() : "";
    if (i) return i.length > 200 ? `${i.slice(0, 197)}…` : i;
  }
  return null;
}
function Cp(t, e, o, n) {
  if (t.length === 0) return null;
  const r = 13 / n, s = 7 / n, i = 5 / n, l = 6 / n, d = Math.max(...t.map((u) => u.text.length), 1), c = Math.min(d * l + s * 2, 280 / n), a = t.length * r + i * 2;
  return {
    w: c,
    h: a,
    x0: e - c / 2,
    y0: o - a / 2
  };
}
const ia = {
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
}, Ip = Le(function({
  node: e,
  zoom: o,
  showHandles: n = !0,
  measuredHeights: r,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const l = e.h === "auto" ? (r == null ? void 0 : r[e.id]) ?? 100 : e.h, d = e.rotation || 0, c = e.x + e.w / 2, a = e.y + l / 2, u = 8 / o, f = u / 2, y = 25 / o, p = !!e.locked, g = [
    { pos: "nw", cx: e.x, cy: e.y },
    { pos: "n", cx: e.x + e.w / 2, cy: e.y },
    { pos: "ne", cx: e.x + e.w, cy: e.y },
    { pos: "e", cx: e.x + e.w, cy: e.y + l / 2 },
    { pos: "se", cx: e.x + e.w, cy: e.y + l },
    { pos: "s", cx: e.x + e.w / 2, cy: e.y + l },
    { pos: "sw", cx: e.x, cy: e.y + l },
    { pos: "w", cx: e.x, cy: e.y + l / 2 }
  ];
  return /* @__PURE__ */ S("g", { transform: `rotate(${d}, ${c}, ${a})`, children: [
    /* @__PURE__ */ h(
      "rect",
      {
        x: e.x,
        y: e.y,
        width: e.w,
        height: l,
        fill: "none",
        stroke: p ? "#f59e0b" : "#3b82f6",
        strokeWidth: 1.5 / o,
        strokeDasharray: `${4 / o} ${3 / o}`
      }
    ),
    p && (() => {
      const m = 16 / o, x = e.x + e.w - m - 4 / o, b = e.y - m - 4 / o;
      return /* @__PURE__ */ S("g", { transform: `translate(${x}, ${b})`, children: [
        /* @__PURE__ */ h(
          "rect",
          {
            x: 0,
            y: 0,
            width: m,
            height: m,
            rx: 3 / o,
            fill: "#f59e0b"
          }
        ),
        /* @__PURE__ */ S("g", { transform: `scale(${m / 24})`, children: [
          /* @__PURE__ */ h("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ h("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    n && !p && g.map(({ pos: m, cx: x, cy: b }) => /* @__PURE__ */ h(
      "rect",
      {
        x: x - f,
        y: b - f,
        width: u,
        height: u,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: Mr(m, d),
          pointerEvents: "auto"
        },
        onPointerDown: (w) => {
          w.stopPropagation(), s == null || s(e.id, m, w);
        }
      },
      m
    )),
    n && !p && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        "line",
        {
          x1: e.x + e.w / 2,
          y1: e.y,
          x2: e.x + e.w / 2,
          y2: e.y - y,
          stroke: "#3b82f6",
          strokeWidth: 1.5 / o
        }
      ),
      /* @__PURE__ */ h(
        "rect",
        {
          x: e.x + e.w / 2 - f,
          y: e.y - y - f,
          width: u,
          height: u,
          rx: 1.5 / o,
          transform: `rotate(45, ${e.x + e.w / 2}, ${e.y - y})`,
          fill: "white",
          stroke: "#3b82f6",
          strokeWidth: 1.5 / o,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (m) => {
            m.stopPropagation(), i == null || i(e.id, m);
          }
        }
      )
    ] })
  ] });
}), Tp = Le(function({
  edge: e,
  fromNode: o,
  toNode: n,
  viewport: r,
  selection: s,
  measuredHeights: i,
  registry: l,
  onEdgeEndpointDown: d,
  onKinkHandleDown: c,
  edgeReconnect: a,
  eraserMarkedIds: u,
  cycleNodeIds: f,
  dataFlowEdgeOverlay: y = "off",
  getLastComputeMs: p,
  getDataFlowPortValue: g,
  interactionMode: m
}) {
  const x = e.data.edgeType || "bezier";
  let b, w;
  if (l && e.data.sourcePort) {
    const ct = l.get(o.type);
    ct != null && ct.ports && (b = ze(o, ct.ports, e.data.sourcePort, r.zoom, i, ct.portAnchor ?? "bbox") ?? void 0);
  }
  if (l && e.data.targetPort) {
    const ct = l.get(n.type);
    ct != null && ct.ports && (w = ze(n, ct.ports, e.data.targetPort, r.zoom, i, ct.portAnchor ?? "bbox") ?? void 0);
  }
  const M = Pe(
    o,
    n,
    x,
    i,
    e.data.sourceHandle,
    e.data.targetHandle,
    e.data.midpointOffset,
    e.data.curveOffset,
    b,
    w,
    e.data.sourceT,
    e.data.targetT,
    e.data.attachmentGap
  ), { path: v, x1: C, y1: T, x2: E, y2: z, labelX: j, labelY: Y, arrowAngle: nt, tailAngle: rt, kinkHandle: pt } = M, xt = s.has(e.id), mt = e.data.strokeWidth, W = e.data.style === "dashed" ? `${8 * mt},${4 * mt}` : e.data.style === "dotted" ? `${2 * mt},${3 * mt}` : void 0, B = Math.max(8, mt * 3), G = e.data.arrowHeadSize ?? B, q = e.data.arrowTailSize ?? B, J = e.data.animated, H = u == null ? void 0 : u.has(e.id), $ = (a == null ? void 0 : a.edgeId) === e.id, st = !!(f && f.size > 0 && e.data.sourcePort && e.data.targetPort && f.has(e.data.fromId) && f.has(e.data.toId)), it = st ? "#ef4444" : e.data.color, U = e.data.roughness ?? 0, tt = Kt(() => U <= 0 ? null : {
    stroke: it,
    roughness: U,
    strokeWidth: mt,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [it, U, mt, e.data.style, e.id]);
  let dt = null, _ = null, ht = null;
  tt && (dt = rs(v, tt), e.data.arrowHead === "arrow" && (_ = rs(yo(E, z, nt, G), { ...tt, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (ht = rs(yo(C, T, rt, q), { ...tt, strokeLineDash: void 0 })));
  const gt = Kt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), ft = Kt(() => {
    if (!J) return;
    const ct = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", Bt = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", Gt = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${ct} ${Bt} ${Gt} infinite` };
  }, [J, e.data.animatedDirection]), wt = Kt(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), zt = Kt(
    () => H ? { filter: "saturate(0)" } : void 0,
    [H]
  ), Ft = Kt(() => {
    var Ut;
    const ct = y ?? "off", Bt = (Ut = e.data.label) == null ? void 0 : Ut.trim(), Gt = [];
    if (Bt && Gt.push({ text: Bt, primary: !0 }), ct !== "off" && Cs(n) && e.data.sourcePort && e.data.targetPort && Gt.push({
      text: `${e.data.sourcePort} → ${e.data.targetPort}`,
      primary: !Bt
    }), ct === "ports+compute" && Cs(n) && p && e.data.toId) {
      const Jt = p(e.data.toId);
      Jt != null && Number.isFinite(Jt) && Gt.push({ text: `compute ${Sp(Jt)}`, primary: !1 });
    }
    return Gt;
  }, [
    y,
    e.data.label,
    e.data.sourcePort,
    e.data.targetPort,
    e.data.toId,
    p,
    n
  ]), Et = Kt(
    () => e.data.sourcePort && e.data.targetPort ? Mp(l, n, g) : null,
    [
      l,
      n,
      e.data.sourcePort,
      e.data.targetPort,
      g
    ]
  );
  return /* @__PURE__ */ S("g", { opacity: $ ? 0.15 : H ? 0.25 : void 0, style: zt, children: [
    /* @__PURE__ */ h(
      "path",
      {
        d: v,
        stroke: "transparent",
        strokeWidth: Math.max(mt + 16 / r.zoom, 20 / r.zoom),
        strokeLinecap: "round",
        fill: "none",
        style: {
          pointerEvents: "stroke",
          cursor: m === "select" || m == null ? "move" : "inherit"
        }
      }
    ),
    st && /* @__PURE__ */ h(
      "path",
      {
        d: v,
        stroke: "#ef4444",
        strokeWidth: mt + 6 / r.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: gt
      }
    ),
    xt && /* @__PURE__ */ h(
      "path",
      {
        d: v,
        stroke: "#3b82f6",
        strokeWidth: mt + 6 / r.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    dt ? dt.map((ct, Bt) => /* @__PURE__ */ h(
      "path",
      {
        d: ct.d,
        stroke: ct.stroke,
        strokeWidth: ct.strokeWidth,
        strokeDasharray: ct.strokeDasharray,
        strokeLinecap: "round",
        fill: ct.fill ?? "none",
        style: J ? ft : void 0
      },
      Bt
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: v,
        stroke: it,
        strokeWidth: mt,
        strokeDasharray: J ? "12,8" : st ? `${6 * mt},${4 * mt}` : W,
        strokeLinecap: "round",
        fill: "none",
        style: st ? wt : ft
      }
    ),
    e.data.arrowHead === "arrow" && (_ ? _.map((ct, Bt) => /* @__PURE__ */ h(
      "path",
      {
        d: ct.d,
        stroke: ct.stroke,
        strokeWidth: ct.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ct.fill ?? "none"
      },
      `ah${Bt}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: yo(E, z, nt, G),
        fill: "none",
        stroke: it,
        strokeWidth: mt,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: yr(E, z, nt, G),
        fill: it,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: E,
        cy: z,
        r: G * 0.25,
        fill: it
      }
    ),
    e.data.arrowTail === "arrow" && (ht ? ht.map((ct, Bt) => /* @__PURE__ */ h(
      "path",
      {
        d: ct.d,
        stroke: ct.stroke,
        strokeWidth: ct.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ct.fill ?? "none"
      },
      `at${Bt}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: yo(C, T, rt, q),
        fill: "none",
        stroke: it,
        strokeWidth: mt,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: yr(C, T, rt, q),
        fill: it,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: C,
        cy: T,
        r: q * 0.25,
        fill: it
      }
    ),
    (() => {
      const ct = r.zoom, Bt = 13 / ct, Gt = 5 / ct, Ut = 11 / ct, Jt = 10 / ct, Zt = Cp(Ft, j, Y, ct), yt = 9 / ct, fe = !!Et, de = Zt ? Zt.x0 + Zt.w + yt + 4 / ct : j + yt + 4 / ct, se = Y;
      return /* @__PURE__ */ S(Mt, { children: [
        Zt && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ h(
            "rect",
            {
              x: Zt.x0,
              y: Zt.y0,
              width: Zt.w,
              height: Zt.h,
              fill: "white",
              rx: 4 / ct,
              opacity: 0.92
            }
          ),
          Ft.map((ge, ke) => /* @__PURE__ */ h(
            "text",
            {
              x: j,
              y: Zt.y0 + Gt + (ke + 0.78) * Bt,
              fill: ge.primary ? it : "#64748b",
              fontSize: ge.primary ? Ut : Jt,
              textAnchor: "middle",
              style: { pointerEvents: "none" },
              children: ge.text
            },
            ke
          ))
        ] }),
        fe && /* @__PURE__ */ S("g", { style: { pointerEvents: "auto" }, children: [
          /* @__PURE__ */ h("title", { children: Et }),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: de,
              cy: se,
              r: yt,
              fill: "#ea580c",
              stroke: "#fff",
              strokeWidth: 1.25 / ct
            }
          ),
          /* @__PURE__ */ h(
            "text",
            {
              x: de,
              y: se + 3.5 / ct,
              fill: "#fff",
              fontSize: 11 / ct,
              fontWeight: 800,
              textAnchor: "middle",
              style: { pointerEvents: "none" },
              children: "!"
            }
          )
        ] })
      ] });
    })(),
    xt && !$ && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        "circle",
        {
          cx: C,
          cy: T,
          r: 5 / r.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / r.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ct) => {
            ct.stopPropagation(), d == null || d(e.id, "source", ct);
          }
        }
      ),
      /* @__PURE__ */ h(
        "circle",
        {
          cx: E,
          cy: z,
          r: 5 / r.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / r.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ct) => {
            ct.stopPropagation(), d == null || d(e.id, "target", ct);
          }
        }
      )
    ] }),
    xt && !$ && pt && /* @__PURE__ */ h(
      "circle",
      {
        cx: pt.x,
        cy: pt.y,
        r: 5 / r.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / r.zoom,
        style: {
          cursor: pt.axis === "xy" ? "move" : pt.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (ct) => {
          ct.stopPropagation(), c == null || c(e.id, pt.axis, pt.min, pt.max, ct);
        }
      }
    )
  ] });
});
function zp({
  nodes: t,
  viewport: e,
  selection: o,
  measuredHeights: n,
  activeStroke: r,
  shapePreview: s,
  shapePreviewStyle: i,
  onResizeHandleDown: l,
  onRotateStart: d,
  onConnectionHandleDown: c,
  onEdgeEndpointDown: a,
  onKinkHandleDown: u,
  edgePreview: f,
  edgeReconnect: y,
  eraserMarkedIds: p,
  eraserTrail: g,
  laserTrail: m,
  mode: x,
  freeFormEdges: b,
  hoveredNodeId: w,
  cursorCanvasPos: M,
  registry: v,
  onPortHandleDown: C,
  cycleNodeIds: T,
  dataFlowEdgeOverlay: E = "off",
  getLastComputeMs: z,
  getDataFlowPortValue: j,
  containerTypes: Y,
  alignGuides: nt,
  suppressNodeOverlayId: rt
}) {
  const pt = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, xt = t.filter(
    (B) => B.type !== "edge" && B.type !== "content" && B.type !== "image"
  ), mt = t.filter((B) => B.type === "edge").sort((B, G) => B.z - G.z), W = Kt(() => new Map(t.map((B) => [B.id, B])), [t]);
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
      children: /* @__PURE__ */ S("g", { transform: pt, children: [
        mt.map((B) => {
          const G = W.get(B.data.fromId), q = W.get(B.data.toId);
          return !G || !q ? null : /* @__PURE__ */ h(
            Tp,
            {
              edge: B,
              fromNode: G,
              toNode: q,
              viewport: e,
              selection: o,
              measuredHeights: n,
              registry: v,
              onEdgeEndpointDown: a,
              onKinkHandleDown: u,
              edgeReconnect: y,
              eraserMarkedIds: p,
              cycleNodeIds: T,
              dataFlowEdgeOverlay: E,
              getLastComputeMs: z,
              getDataFlowPortValue: j,
              interactionMode: x
            },
            B.id
          );
        }),
        x === "edge" && !f && w && M && (() => {
          const B = W.get(w);
          if (!B || B.type === "edge") return null;
          const G = We(B, M.x, M.y, n), q = 4 / e.zoom;
          return /* @__PURE__ */ h("circle", { cx: G.x, cy: G.y, r: q, fill: "#3b82f6", stroke: "white", strokeWidth: 1.5 / e.zoom });
        })(),
        (() => {
          var tt, dt;
          const B = !!f || !!y, G = (f == null ? void 0 : f.cursorX) ?? (y == null ? void 0 : y.cursorX) ?? 0, q = (f == null ? void 0 : f.cursorY) ?? (y == null ? void 0 : y.cursorY) ?? 0, J = (f == null ? void 0 : f.fromNode.id) ?? (y == null ? void 0 : y.anchorNodeId) ?? null;
          let H = null, $ = null, st = null;
          const it = /* @__PURE__ */ new Set();
          if (B) {
            let _ = 1 / 0, ht = !1;
            const gt = 50 / e.zoom;
            for (const ft of t) {
              if (ft.type === "edge" || ft.id === J || (dt = (tt = v == null ? void 0 : v.get(ft.type)) == null ? void 0 : tt.ports) != null && dt.length) continue;
              const wt = ft.h === "auto" ? (n == null ? void 0 : n[ft.id]) ?? 100 : ft.h, zt = ft.w * 0.2, Ft = wt * 0.2;
              G >= ft.x - zt && G <= ft.x + ft.w + zt && q >= ft.y - Ft && q <= ft.y + wt + Ft && it.add(ft.id);
              const Et = Ss(ft, n), ct = Y ? Y.has(ft.type) : ft.type === "frame";
              for (const Bt of Et) {
                const Gt = Math.hypot(Bt.x - G, Bt.y - q);
                Gt >= gt || ct && !ht && H || (!ct && ht || Gt < _) && (_ = Gt, ht = ct, H = ft.id, $ = Bt.side);
              }
            }
            if (b && H) {
              const ft = W.get(H);
              if (ft) {
                const wt = We(ft, G, q, n);
                st = { x: wt.x, y: wt.y };
              }
            }
          }
          const U = [];
          return b && B && st && U.push(
            /* @__PURE__ */ h(
              "circle",
              {
                cx: st.x,
                cy: st.y,
                r: 5 / e.zoom,
                fill: "#3b82f6",
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              },
              "freeform-snap-dot"
            )
          ), t.filter((_) => {
            var ht, gt;
            return _.type === "edge" || rt && _.id === rt || (gt = (ht = v == null ? void 0 : v.get(_.type)) == null ? void 0 : ht.ports) != null && gt.length || b && _.type === "image" ? !1 : o.size <= 1 && o.has(_.id) || !b && B && (_.id === J || it.has(_.id));
          }).forEach((_) => {
            const ht = Ss(_, n), gt = 4 / e.zoom, ft = 26 / e.zoom, wt = _.rotation || 0, zt = _.h === "auto" ? (n == null ? void 0 : n[_.id]) ?? 100 : _.h, Ft = _.x + _.w / 2, Et = _.y + zt / 2, ct = f && f.fromNode.id === _.id || y && y.anchorNodeId === _.id, Bt = o.has(_.id) && !B;
            b ? Bt && U.push(
              /* @__PURE__ */ h("g", { transform: wt ? `rotate(${wt}, ${Ft}, ${Et})` : void 0, children: ht.map(({ side: Gt }) => {
                const Ut = {
                  top: [_.x + _.w / 2, _.y],
                  bottom: [_.x + _.w / 2, _.y + zt],
                  left: [_.x, _.y + zt / 2],
                  right: [_.x + _.w, _.y + zt / 2]
                }, [Jt, Zt] = Ut[Gt];
                return /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: Jt,
                    cy: Zt,
                    r: gt,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.8,
                    style: { cursor: "crosshair", pointerEvents: "auto" },
                    onPointerDown: (yt) => {
                      yt.stopPropagation(), c == null || c(_.id, Gt, yt);
                    }
                  },
                  `ch-${_.id}-${Gt}`
                );
              }) }, `conn-${_.id}`)
            ) : U.push(
              /* @__PURE__ */ h("g", { transform: wt ? `rotate(${wt}, ${Ft}, ${Et})` : void 0, children: ht.map(({ side: Gt }) => {
                const Ut = {
                  top: [_.x + _.w / 2, _.y],
                  bottom: [_.x + _.w / 2, _.y + zt],
                  left: [_.x, _.y + zt / 2],
                  right: [_.x + _.w, _.y + zt / 2]
                }, [Jt, Zt] = Ut[Gt], yt = Gt === "top" && o.has(_.id) ? 42 / e.zoom : ft;
                let fe = Jt, de = Zt;
                switch (Gt) {
                  case "top":
                    de = Zt - yt;
                    break;
                  case "bottom":
                    de = Zt + yt;
                    break;
                  case "left":
                    fe = Jt - yt;
                    break;
                  case "right":
                    fe = Jt + yt;
                    break;
                }
                const se = B && H === _.id && $ === Gt;
                return /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: fe,
                    cy: de,
                    r: se ? 5 / e.zoom : gt,
                    fill: ct || se ? "#3b82f6" : "white",
                    stroke: se ? "white" : B && !ct ? "#3b82f6" : "#94a3b8",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: se || B && !ct ? 1 : 0.8,
                    style: {
                      cursor: Bt ? "crosshair" : "default",
                      pointerEvents: Bt ? "auto" : "none"
                    },
                    onPointerDown: Bt ? (ge) => {
                      ge.stopPropagation(), c == null || c(_.id, Gt, ge);
                    } : void 0
                  },
                  `ch-${_.id}-${Gt}`
                );
              }) }, `conn-${_.id}`)
            );
          }), U;
        })(),
        v && (() => {
          var it;
          const B = !!f || !!y, G = (f == null ? void 0 : f.cursorX) ?? (y == null ? void 0 : y.cursorX) ?? 0, q = (f == null ? void 0 : f.cursorY) ?? (y == null ? void 0 : y.cursorY) ?? 0, J = (f == null ? void 0 : f.fromNode.id) ?? null, H = (f == null ? void 0 : f.sourceDirection) === "output" ? "input" : (f == null ? void 0 : f.sourceDirection) === "input" ? "output" : null;
          let $ = null, st = null;
          if (B && H) {
            const U = kd / e.zoom;
            let tt = 1 / 0;
            for (const dt of t) {
              if (dt.type === "edge" || dt.id === J) continue;
              const _ = v.get(dt.type);
              if (!((it = _ == null ? void 0 : _.ports) != null && it.length)) continue;
              const ht = _.ports.filter((gt) => gt.direction === H);
              for (const gt of ht) {
                const ft = ze(
                  dt,
                  _.ports,
                  gt.id,
                  e.zoom,
                  n,
                  _.portAnchor ?? "bbox"
                );
                if (!ft) continue;
                const wt = Math.hypot(ft.x - G, ft.y - q);
                wt <= U && wt < tt && (tt = wt, $ = dt.id, st = gt.id);
              }
            }
          }
          return t.filter((U) => {
            var dt;
            if (U.type === "edge" || rt && U.id === rt) return !1;
            const tt = v.get(U.type);
            return !!((dt = tt == null ? void 0 : tt.ports) != null && dt.length);
          }).map((U) => {
            const tt = v.get(U.type), dt = tt.ports, _ = U.h === "auto" ? (n == null ? void 0 : n[U.id]) ?? 100 : U.h, ht = U.rotation || 0, gt = U.x + U.w / 2, ft = U.y + _ / 2, wt = 6 / e.zoom, zt = tt.portAnchor ?? "bbox", Ft = dt.filter((Ut) => Ut.direction === "input"), Et = dt.filter((Ut) => Ut.direction === "output"), ct = !B, Bt = (Ut, Jt, Zt, yt) => {
              const fe = qa(
                U,
                dt,
                Ut.id,
                e.zoom,
                n,
                zt
              );
              if (!fe) return null;
              const { px: de, py: se } = fe, ge = Sd(
                U,
                yt,
                { x: de, y: se },
                n,
                zt
              ), ke = ia[Ut.dataType] || ia.any, Ne = $ === U.id && st === Ut.id, mn = Ne ? 8 / e.zoom : wt, zo = 2.5 / e.zoom, Je = yt === "input" ? de - wt - zo : de + wt + zo;
              return /* @__PURE__ */ S("g", { children: [
                /* @__PURE__ */ h(
                  "line",
                  {
                    x1: de,
                    y1: se,
                    x2: ge.x,
                    y2: ge.y,
                    stroke: ke,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                Ne && /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: de,
                    cy: se,
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
                    cx: de,
                    cy: se,
                    r: mn,
                    fill: Ne ? "white" : ke,
                    stroke: Ne ? ke : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: ct ? "crosshair" : "default",
                      pointerEvents: ct ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: ct ? (I) => {
                      I.stopPropagation(), C == null || C(U.id, Ut.id, yt, I);
                    } : void 0
                  }
                ),
                (() => {
                  const I = Ut.label || Ut.id, at = 9 / e.zoom, ae = 5 / e.zoom, ve = 2.5 / e.zoom, ce = I.length * at * 0.62 + ae * 2, Oe = at + ve * 2, qt = yt === "input" ? Je - ce : Je, Ve = se - Oe / 2, Po = Oe / 2, bn = Ne ? ke : "#1a1a2e", Ao = Ne ? ke : "#2a2a40", Eo = Ne ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ h(
                      "rect",
                      {
                        x: qt,
                        y: Ve,
                        width: ce,
                        height: Oe,
                        rx: Po,
                        ry: Po,
                        fill: bn,
                        fillOpacity: Ne ? 0.9 : 0.85,
                        stroke: Ao,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ h(
                      "text",
                      {
                        x: qt + ce / 2,
                        y: se + at * 0.35,
                        fill: Eo,
                        fontSize: at,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: I
                      }
                    )
                  ] });
                })()
              ] }, `port-${U.id}-${Ut.id}`);
            }, Gt = T == null ? void 0 : T.has(U.id);
            return /* @__PURE__ */ S("g", { transform: ht ? `rotate(${ht}, ${gt}, ${ft})` : void 0, children: [
              Ft.map((Ut, Jt) => Bt(Ut, Jt, Ft, "input")),
              Et.map((Ut, Jt) => Bt(Ut, Jt, Et, "output")),
              Gt && (() => {
                const Ut = 10 / e.zoom, Jt = U.x + U.w + Ut * 0.3, Zt = U.y - Ut * 0.3;
                return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: Jt,
                      cy: Zt,
                      r: Ut,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ h(
                    "text",
                    {
                      x: Jt,
                      y: Zt + 4 / e.zoom,
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
            ] }, `ports-${U.id}`);
          });
        })(),
        f && (() => {
          var Ut;
          const B = f.cursorX, G = f.cursorY, q = f.edgeColor || "#3b82f6", J = f.edgeStrokeWidth || 2, H = f.edgeStyle || "solid", $ = H === "dashed" ? `${8 * J},${4 * J}` : H === "dotted" ? `${2 * J},${3 * J}` : void 0, st = Math.max(8, J * 3), it = 4 / e.zoom, U = v == null ? void 0 : v.get(f.fromNode.type), tt = f.sourcePort && (U != null && U.ports) ? ze(
            f.fromNode,
            U.ports,
            f.sourcePort,
            e.zoom,
            n,
            U.portAnchor ?? "bbox"
          ) ?? void 0 : void 0, dt = f.sourcePort && (U != null && U.ports) ? U.ports.find((Jt) => Jt.id === f.sourcePort) : void 0, _ = f.sourceDirection === "output" ? "input" : f.sourceDirection === "input" ? "output" : null;
          let ht = null, gt, ft = null;
          if (v && f.sourcePort && _ && dt) {
            const Jt = Ks / e.zoom;
            let Zt = 1 / 0;
            for (const yt of t) {
              if (yt.type === "edge" || yt.id === f.fromNode.id) continue;
              const fe = v.get(yt.type);
              if (!((Ut = fe == null ? void 0 : fe.ports) != null && Ut.length)) continue;
              const de = fe.ports.filter((se) => se.direction === _);
              for (const se of de) {
                if (dt.dataType !== "any" && se.dataType !== "any" && dt.dataType !== se.dataType)
                  continue;
                const ge = ze(
                  yt,
                  fe.ports,
                  se.id,
                  e.zoom,
                  n,
                  fe.portAnchor ?? "bbox"
                );
                if (!ge) continue;
                const ke = Math.hypot(ge.x - B, ge.y - G);
                ke < Jt && ke < Zt && (Zt = ke, ht = yt, ft = se.id);
              }
            }
          }
          if (!ft) {
            const Jt = 50 / e.zoom;
            for (const Zt of t) {
              if (Zt.type === "edge" || Zt.id === f.fromNode.id) continue;
              const yt = Zt.h === "auto" ? (n == null ? void 0 : n[Zt.id]) ?? 100 : Zt.h, fe = Zt.w * 0.2, de = yt * 0.2;
              if (B >= Zt.x - fe && B <= Zt.x + Zt.w + fe && G >= Zt.y - de && G <= Zt.y + yt + de) {
                const se = We(Zt, B, G, n);
                if (Math.hypot(se.x - B, se.y - G) < Jt) {
                  ht = Zt, gt = se.t;
                  break;
                }
              }
            }
          }
          const wt = ht ? v == null ? void 0 : v.get(ht.type) : void 0, zt = ht && ft && (wt != null && wt.ports) ? ze(
            ht,
            wt.ports,
            ft,
            e.zoom,
            n,
            wt.portAnchor ?? "bbox"
          ) ?? void 0 : void 0, Ft = tt ? void 0 : f.sourceT, Et = zt ? void 0 : gt;
          let ct;
          if (ht)
            ct = Pe(
              f.fromNode,
              ht,
              f.edgeType || "bezier",
              n,
              f.sourceHandle,
              void 0,
              void 0,
              void 0,
              tt,
              zt,
              Ft,
              Et,
              f.attachmentGap
            );
          else {
            const Jt = {
              id: "__preview__",
              type: "shape",
              x: B,
              y: G,
              w: 0,
              h: 0,
              data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
            };
            ct = Pe(
              f.fromNode,
              Jt,
              f.edgeType || "bezier",
              n,
              f.sourceHandle,
              void 0,
              void 0,
              void 0,
              tt,
              void 0,
              Ft,
              void 0,
              f.attachmentGap
            );
          }
          const Bt = !tt, Gt = !!(ht && !zt);
          return /* @__PURE__ */ S("g", { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: ct.path,
                stroke: q,
                strokeWidth: J,
                strokeDasharray: $,
                strokeLinecap: "round",
                fill: "none"
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: yo(ct.x2, ct.y2, ct.arrowAngle, st),
                fill: "none",
                stroke: q,
                strokeWidth: J,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            Bt && /* @__PURE__ */ h(
              "circle",
              {
                cx: ct.x1,
                cy: ct.y1,
                r: it,
                fill: q,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            ),
            Gt && /* @__PURE__ */ h(
              "circle",
              {
                cx: ct.x2,
                cy: ct.y2,
                r: it,
                fill: q,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            )
          ] });
        })(),
        y && (() => {
          const B = W.get(y.anchorNodeId);
          if (!B) return null;
          let G, q;
          if (y.anchorHandle) {
            const J = B.h === "auto" ? (n == null ? void 0 : n[B.id]) ?? 100 : B.h, H = {
              top: [B.x + B.w / 2, B.y],
              bottom: [B.x + B.w / 2, B.y + J],
              left: [B.x, B.y + J / 2],
              right: [B.x + B.w, B.y + J / 2]
            }, $ = y.anchorHandle, st = $ === "top" ? 42 / e.zoom : 26 / e.zoom, [it, U] = H[$];
            let tt = it, dt = U;
            switch ($) {
              case "top":
                dt = U - st;
                break;
              case "bottom":
                dt = U + st;
                break;
              case "left":
                tt = it - st;
                break;
              case "right":
                tt = it + st;
                break;
            }
            if (B.rotation) {
              const _ = B.x + B.w / 2, ht = B.y + J / 2, gt = B.rotation * Math.PI / 180, ft = Math.cos(gt), wt = Math.sin(gt), zt = tt - _, Ft = dt - ht;
              G = _ + zt * ft - Ft * wt, q = ht + zt * wt + Ft * ft;
            } else
              G = tt, q = dt;
          } else {
            const J = Wd(B, y.cursorX, y.cursorY, n);
            G = J.x, q = J.y;
          }
          return /* @__PURE__ */ h(
            "line",
            {
              x1: G,
              y1: q,
              x2: y.cursorX,
              y2: y.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && x !== "edge" && !f && !y && xt.filter((B) => o.has(B.id)).map((B) => /* @__PURE__ */ h(
          Ip,
          {
            node: B,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: n,
            onHandlePointerDown: l,
            onRotateStart: d
          },
          `sel-${B.id}`
        )),
        r && r.points.length > 1 && (() => {
          const B = r.strokeStyle === "dashed" || r.strokeStyle === "dotted", G = r.opacity ?? 1;
          if (B) {
            const q = r.points, J = ["M", q[0][0], q[0][1]];
            for (let st = 1; st < q.length; st++) {
              const [it, U] = q[st], [tt, dt] = q[st - 1];
              J.push("Q", tt, dt, (tt + it) / 2, (dt + U) / 2);
            }
            const H = q[q.length - 1];
            J.push("L", H[0], H[1]);
            const $ = no(r.strokeStyle);
            return /* @__PURE__ */ h(
              "path",
              {
                d: J.join(" "),
                fill: "none",
                stroke: r.color,
                strokeWidth: r.width,
                strokeDasharray: $ == null ? void 0 : $.map((st) => st * Math.max(r.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: G
              }
            );
          }
          return /* @__PURE__ */ h(
            "path",
            {
              d: Qs(r.points, {
                size: r.width
              }),
              fill: r.color,
              opacity: G
            }
          );
        })(),
        s && i && (() => {
          const B = Math.min(s.startX, s.endX), G = Math.min(s.startY, s.endY), q = Math.abs(s.endX - s.startX), J = Math.abs(s.endY - s.startY);
          if (q < 2 && J < 2) return null;
          const H = i, $ = H.shapeType || "rect", st = H.opacity ?? 1, it = no(H.strokeStyle), U = H.edgeStyle === "round", tt = s.startX, dt = s.startY, _ = s.endX, ht = s.endY, gt = {
            stroke: H.stroke,
            fill: H.fill,
            fillStyle: H.fillStyle,
            roughness: H.roughness,
            strokeWidth: H.strokeWidth,
            strokeLineDash: it,
            seed: "__preview__"
          };
          let ft = null;
          if (H.roughness > 0)
            switch ($) {
              case "rect":
                ft = Wn(0, 0, q, J, gt, U);
                break;
              case "ellipse":
                ft = Ir(q / 2, J / 2, q, J, gt);
                break;
              case "diamond":
                ft = Tr(0, 0, q, J, gt, U);
                break;
              case "line":
                ft = Oo(0, ht - dt > 0 ? 0 : J, q, ht - dt > 0 ? J : 0, gt);
                break;
              case "arrow":
                ft = zr(0, ht - dt > 0 ? 0 : J, q, ht - dt > 0 ? J : 0, gt);
                break;
            }
          if (ft) {
            const Et = $ === "line" || $ === "arrow" ? Math.min(tt, _) : B, ct = $ === "line" || $ === "arrow" ? Math.min(dt, ht) : G;
            return /* @__PURE__ */ h("g", { transform: `translate(${Et}, ${ct})`, opacity: st, children: ft.map((Bt, Gt) => /* @__PURE__ */ h(
              "path",
              {
                d: Bt.d,
                stroke: Bt.stroke,
                strokeWidth: Bt.strokeWidth,
                fill: Bt.fill,
                strokeDasharray: Bt.strokeDasharray,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              Gt
            )) });
          }
          const wt = it == null ? void 0 : it.join(","), zt = H.fill || "none";
          if ($ === "ellipse")
            return /* @__PURE__ */ h(
              "ellipse",
              {
                cx: B + q / 2,
                cy: G + J / 2,
                rx: q / 2,
                ry: J / 2,
                stroke: H.stroke,
                strokeWidth: H.strokeWidth,
                fill: zt,
                strokeDasharray: wt,
                opacity: st
              }
            );
          if ($ === "diamond")
            return /* @__PURE__ */ h(
              "polygon",
              {
                points: `${B + q / 2},${G} ${B + q},${G + J / 2} ${B + q / 2},${G + J} ${B},${G + J / 2}`,
                stroke: H.stroke,
                strokeWidth: H.strokeWidth,
                fill: zt,
                strokeDasharray: wt,
                opacity: st
              }
            );
          if ($ === "line" || $ === "arrow")
            return /* @__PURE__ */ S("g", { opacity: st, children: [
              /* @__PURE__ */ h(
                "line",
                {
                  x1: tt,
                  y1: dt,
                  x2: _,
                  y2: ht,
                  stroke: H.stroke,
                  strokeWidth: H.strokeWidth,
                  strokeDasharray: wt
                }
              ),
              $ === "arrow" && (() => {
                const Et = Math.atan2(ht - dt, _ - tt), ct = Math.max(12, H.strokeWidth * 4), Bt = Math.PI / 6, Gt = _ - ct * Math.cos(Et - Bt), Ut = ht - ct * Math.sin(Et - Bt), Jt = _ - ct * Math.cos(Et + Bt), Zt = ht - ct * Math.sin(Et + Bt);
                return /* @__PURE__ */ h(
                  "polyline",
                  {
                    points: `${Gt},${Ut} ${_},${ht} ${Jt},${Zt}`,
                    stroke: H.stroke,
                    strokeWidth: H.strokeWidth,
                    fill: "none"
                  }
                );
              })()
            ] });
          const Ft = U ? Uo(q, J) : 0;
          return /* @__PURE__ */ h(
            "rect",
            {
              x: B,
              y: G,
              width: q,
              height: J,
              rx: Ft || void 0,
              ry: Ft || void 0,
              stroke: H.stroke,
              strokeWidth: H.strokeWidth,
              fill: zt,
              strokeDasharray: wt,
              opacity: st
            }
          );
        })(),
        g && g.length > 1 && (() => {
          const B = Date.now(), G = 400, q = 6 / e.zoom, J = [`M${g[0][0]},${g[0][1]}`];
          if (g.length === 2)
            J.push(`L${g[1][0]},${g[1][1]}`);
          else {
            for (let _ = 0; _ < g.length - 1; _++) {
              const ht = (g[_][0] + g[_ + 1][0]) / 2, gt = (g[_][1] + g[_ + 1][1]) / 2;
              J.push(`Q${g[_][0]},${g[_][1]},${ht},${gt}`);
            }
            const dt = g[g.length - 1];
            J.push(`L${dt[0]},${dt[1]}`);
          }
          const H = J.join(" "), $ = (B - g[g.length - 1][2]) / G, st = (B - g[0][2]) / G, it = Math.max(0, 0.85 * (1 - $)), U = Math.max(0, 0.85 * (1 - st)), tt = (it + U) / 2;
          return tt <= 0 ? null : /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: H,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: q * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: tt * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: H,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: q,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: tt
              }
            )
          ] });
        })(),
        m && m.length > 1 && (() => {
          const B = performance.now(), G = 1560, q = 6 / e.zoom, J = [];
          let H = !1, $ = !1;
          for (let gt = 0; gt < m.length; gt++) {
            const ft = m[gt];
            if (isNaN(ft[0])) {
              H = !1, $ = !1;
              continue;
            }
            if (!H)
              J.push(`M${ft[0]},${ft[1]}`), H = !0, $ = !0;
            else if ($) {
              const wt = gt + 1 < m.length && !isNaN(m[gt + 1][0]) ? m[gt + 1] : null;
              if (wt) {
                const zt = (ft[0] + wt[0]) / 2, Ft = (ft[1] + wt[1]) / 2;
                J.push(`Q${ft[0]},${ft[1]},${zt},${Ft}`);
              } else
                J.push(`L${ft[0]},${ft[1]}`);
            }
          }
          if (J.length === 0) return null;
          const st = J.join(" "), it = m.filter((gt) => !isNaN(gt[0]));
          if (it.length === 0) return null;
          const U = (B - it[it.length - 1][2]) / G, tt = (B - it[0][2]) / G, dt = Math.max(0, 0.85 * (1 - U)), _ = Math.max(0, 0.85 * (1 - tt)), ht = (dt + _) / 2;
          return ht <= 0 ? null : /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: st,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: q * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ht * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: st,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: q,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ht
              }
            )
          ] });
        })(),
        nt && nt.length > 0 && nt.map((B, G) => /* @__PURE__ */ h(
          "line",
          {
            x1: B.axis === "x" ? B.position : B.start,
            y1: B.axis === "x" ? B.start : B.position,
            x2: B.axis === "x" ? B.position : B.end,
            y2: B.axis === "x" ? B.end : B.position,
            stroke: "#f472b6",
            strokeWidth: 1 / e.zoom,
            strokeDasharray: `${3 / e.zoom} ${2 / e.zoom}`,
            opacity: 0.8
          },
          `guide-${G}`
        ))
      ] })
    }
  );
}
function Pp({
  x: t,
  y: e,
  sections: o,
  onClose: n
}) {
  const r = ut(null);
  St(() => {
    var m;
    const y = (x) => {
      r.current && !r.current.contains(x.target) && n();
    }, p = (x) => {
      x.key === "Escape" && n();
    }, g = ((m = r.current) == null ? void 0 : m.ownerDocument) ?? document;
    return g.addEventListener("pointerdown", y, !0), g.addEventListener("keydown", p), () => {
      g.removeEventListener("pointerdown", y, !0), g.removeEventListener("keydown", p);
    };
  }, [n]);
  const s = typeof document < "u" ? document : null;
  Co(() => {
    const y = r.current;
    if (!y) return;
    const p = y.ownerDocument.defaultView ?? window, g = () => {
      const x = y.getBoundingClientRect(), b = vl(t, e, x.width, x.height, p);
      y.style.left = `${b.left}px`, y.style.top = `${b.top}px`;
    };
    g();
    const m = new ResizeObserver(g);
    return m.observe(y), p.addEventListener("resize", g), () => {
      m.disconnect(), p.removeEventListener("resize", g);
    };
  }, [t, e, o]);
  const i = lt(
    (y) => {
      y.kind === "header" || y.disabled || (y.action(), n());
    },
    [n]
  ), l = navigator.platform.includes("Mac"), d = l ? "⌘" : "Ctrl+", c = l ? "⌥" : "Alt+", a = l ? "⇧" : "Shift+", u = (y) => y.replace("Mod+", d).replace("Alt+", c).replace("Shift+", a), f = /* @__PURE__ */ h(
    "div",
    {
      "data-sb-context-menu": !0,
      ref: r,
      onPointerDown: (y) => y.stopPropagation(),
      onContextMenu: (y) => y.preventDefault(),
      style: {
        position: "fixed",
        left: t,
        top: e,
        zIndex: 10002,
        minWidth: 200,
        maxHeight: "min(85dvh, calc(100vh - 16px))",
        overflowY: "auto",
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
      children: o.map((y, p) => /* @__PURE__ */ S("div", { children: [
        p > 0 && /* @__PURE__ */ h(
          "div",
          {
            style: {
              height: 1,
              background: "#333",
              margin: "4px 0"
            }
          }
        ),
        y.items.map(
          (g, m) => g.kind === "header" ? /* @__PURE__ */ h(
            "div",
            {
              style: {
                padding: "8px 16px 4px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#7a7a8c",
                pointerEvents: "none",
                userSelect: "none"
              },
              children: g.label
            },
            m
          ) : /* @__PURE__ */ S(
            "div",
            {
              onClick: () => i(g),
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 16px",
                cursor: g.disabled ? "default" : "pointer",
                opacity: g.disabled ? 0.4 : 1,
                color: g.danger ? "#f87171" : "#e0e0e0",
                transition: "background 0.1s"
              },
              onMouseEnter: (x) => {
                g.disabled || (x.currentTarget.style.background = "rgba(255,255,255,0.08)");
              },
              onMouseLeave: (x) => {
                x.currentTarget.style.background = "transparent";
              },
              children: [
                /* @__PURE__ */ S(
                  "span",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      minWidth: 0
                    },
                    children: [
                      g.icon != null && /* @__PURE__ */ h(
                        "span",
                        {
                          style: {
                            display: "flex",
                            flexShrink: 0,
                            color: "currentColor",
                            opacity: 0.92
                          },
                          children: g.icon
                        }
                      ),
                      g.checked !== void 0 && /* @__PURE__ */ h("span", { style: { display: "inline-block", width: 16, marginRight: -4 }, children: g.checked ? "✓" : "" }),
                      /* @__PURE__ */ h("span", { children: g.label })
                    ]
                  }
                ),
                g.shortcut && /* @__PURE__ */ h(
                  "span",
                  {
                    style: {
                      marginLeft: 32,
                      fontSize: 12,
                      color: "#888"
                    },
                    children: u(g.shortcut)
                  }
                )
              ]
            },
            m
          )
        )
      ] }, p))
    }
  );
  return s != null && s.body ? Ze(f, s.body) : f;
}
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ap = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ep = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, o, n) => n ? n.toUpperCase() : o.toLowerCase()
), aa = (t) => {
  const e = Ep(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
}, Xl = (...t) => t.filter((e, o, n) => !!e && e.trim() !== "" && n.indexOf(e) === o).join(" ").trim(), Lp = (t) => {
  for (const e in t)
    if (e.startsWith("aria-") || e === "role" || e === "title")
      return !0;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Rp = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dp = Wa(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: n,
    className: r = "",
    children: s,
    iconNode: i,
    ...l
  }, d) => ms(
    "svg",
    {
      ref: d,
      ...Rp,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: n ? Number(o) * 24 / Number(e) : o,
      className: Xl("lucide", r),
      ...!s && !Lp(l) && { "aria-hidden": "true" },
      ...l
    },
    [
      ...i.map(([c, a]) => ms(c, a)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Io = (t, e) => {
  const o = Wa(
    ({ className: n, ...r }, s) => ms(Dp, {
      ref: s,
      iconNode: e,
      className: Xl(
        `lucide-${Ap(aa(t))}`,
        `lucide-${t}`,
        n
      ),
      ...r
    })
  );
  return o.displayName = aa(t), o;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wp = [
  ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2", key: "dy24zr" }],
  ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2", key: "13zkjt" }],
  ["path", { d: "M12 2v20", key: "t6zp3m" }]
], Bp = Io(
  "align-horizontal-justify-center",
  Wp
);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Np = [
  ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2", key: "dy24zr" }],
  ["rect", { width: "6", height: "10", x: "12", y: "7", rx: "2", key: "1ht384" }],
  ["path", { d: "M22 2v20", key: "40qfg1" }]
], Fp = Io("align-horizontal-justify-end", Np);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hp = [
  ["rect", { width: "6", height: "14", x: "6", y: "5", rx: "2", key: "hsirpf" }],
  ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2", key: "13zkjt" }],
  ["path", { d: "M2 2v20", key: "1ivd8o" }]
], Op = Io("align-horizontal-justify-start", Hp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xp = [
  ["rect", { width: "6", height: "14", x: "3", y: "5", rx: "2", key: "j77dae" }],
  ["rect", { width: "6", height: "10", x: "15", y: "7", rx: "2", key: "bq30hj" }],
  ["path", { d: "M3 2v20", key: "1d2pfg" }],
  ["path", { d: "M21 2v20", key: "p059bm" }]
], Yp = Io("align-horizontal-space-between", Xp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gp = [
  ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2", key: "1i8z2d" }],
  ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2", key: "ypihtt" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], jp = Io("align-vertical-justify-center", Gp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vp = [
  ["rect", { width: "14", height: "6", x: "5", y: "12", rx: "2", key: "4l4tp2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2", key: "ypihtt" }],
  ["path", { d: "M2 22h20", key: "272qi7" }]
], Kp = Io("align-vertical-justify-end", Vp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qp = [
  ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2", key: "1i8z2d" }],
  ["rect", { width: "10", height: "6", x: "7", y: "6", rx: "2", key: "13squh" }],
  ["path", { d: "M2 2h20", key: "1ennik" }]
], Up = Io("align-vertical-justify-start", qp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zp = [
  ["rect", { width: "14", height: "6", x: "5", y: "15", rx: "2", key: "1w91an" }],
  ["rect", { width: "10", height: "6", x: "7", y: "3", rx: "2", key: "17wqzy" }],
  ["path", { d: "M2 21h20", key: "1nyx9w" }],
  ["path", { d: "M2 3h20", key: "91anmk" }]
], Qp = Io("align-vertical-space-between", Zp), ho = {
  size: 16,
  strokeWidth: 2,
  "aria-hidden": !0
}, uo = {
  alignHLeft: /* @__PURE__ */ h(Op, { ...ho }),
  alignHCenter: /* @__PURE__ */ h(Bp, { ...ho }),
  alignHRight: /* @__PURE__ */ h(Fp, { ...ho }),
  distributeH: /* @__PURE__ */ h(Yp, { ...ho }),
  alignVTop: /* @__PURE__ */ h(Up, { ...ho }),
  alignVCenter: /* @__PURE__ */ h(jp, { ...ho }),
  alignVBottom: /* @__PURE__ */ h(Kp, { ...ho }),
  distributeV: /* @__PURE__ */ h(Qp, { ...ho })
}, Fs = "sbd-clipboard", Jp = "sbd-nodes:";
function Yl(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let n = "";
  for (let r = 0; r < o.length; r++) n += String.fromCharCode(o[r]);
  return btoa(n);
}
function la(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let r = 0; r < e.length; r++) o[r] = e.charCodeAt(r);
    const n = new TextDecoder().decode(o);
    return JSON.parse(n);
  } catch {
    return null;
  }
}
function Gl(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return la(e[1]);
  const o = t.match(
    new RegExp(`<!--${Jp}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? la(o[1]) : null;
}
function lr(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function jl(t) {
  return t.map((e) => {
    var r;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), n = (r = e.children) != null && r.length ? `
` + jl(e.children) : "";
    return o + n;
  }).filter(Boolean).join(`
`);
}
function $p(t) {
  var o;
  const e = [];
  for (const n of t)
    switch (n.type) {
      case "content": {
        const r = n.data;
        (o = r.blocks) != null && o.length ? e.push(jl(r.blocks)) : r.markdown && e.push(r.markdown);
        break;
      }
      case "image": {
        const r = n.data;
        r.src.startsWith("http") ? e.push(r.src) : e.push(r.alt || "[Image]");
        break;
      }
      case "shape": {
        const r = n.data;
        r.label && e.push(r.label);
        break;
      }
      case "text": {
        const r = n.data;
        r.text && e.push(r.text);
        break;
      }
      case "sticky": {
        const r = n.data;
        r.text && e.push(r.text);
        break;
      }
      case "draw":
        break;
      case "edge": {
        const r = n.data;
        r.label && e.push(r.label);
        break;
      }
    }
  return e.join(`

`);
}
function ca(t, e) {
  const o = $p(e), n = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), r = Yl(e);
  return t.setData(
    "text/html",
    `<!--${Fs}--><div data-sbd-nodes="${r}">${n || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function _p(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, n = o.defaultView ?? window, r = n.innerWidth / 2, s = n.innerHeight / 2, i = null;
  const l = (m) => {
    r = m.clientX, s = m.clientY;
  }, d = (m) => {
    lr(m.target) || t.selection.size !== 0 && (m.preventDefault(), t.copySelected(), i = ca(
      m.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (m) => {
    lr(m.target) || t.selection.size !== 0 && (m.preventDefault(), t.copySelected(), i = ca(
      m.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, a = (m) => {
    m.preventDefault(), m.stopImmediatePropagation();
  }, u = async (m) => {
    var z, j, Y;
    if (lr(m.target)) return;
    const { x, y: b } = t.screenToCanvas(r, s), w = ((z = m.clipboardData) == null ? void 0 : z.getData("text/html")) || "", M = ((j = m.clipboardData) == null ? void 0 : j.getData("text/plain")) || "";
    if (w.includes(Fs) || w.includes("data-sbd-nodes=") || i !== null && M === i) {
      if (i !== null && M === i && t.hasClipboard()) {
        a(m), t.pasteClipboard(x, b);
        return;
      }
      const rt = Gl(w);
      if (rt) {
        a(m), t.setClipboard(rt), t.pasteClipboard(x, b);
        return;
      }
      if (w.includes(Fs) || w.includes("data-sbd-nodes=")) {
        a(m), t.hasClipboard() && t.pasteClipboard(x, b);
        return;
      }
    }
    const C = (Y = m.clipboardData) == null ? void 0 : Y.items;
    if (C) {
      for (const nt of Array.from(C))
        if (nt.type.startsWith("image/")) {
          const rt = nt.getAsFile();
          if (!rt) continue;
          a(m);
          const pt = new FileReader();
          pt.onload = () => {
            const xt = pt.result, mt = new Image();
            mt.onload = () => {
              const W = t.screenToCanvas(r, s), B = 400, G = 300, q = mt.naturalWidth / mt.naturalHeight, J = Math.min(mt.naturalWidth, B), H = Math.min(mt.naturalHeight, G), $ = q >= 1 ? J : H * q, st = q >= 1 ? J / q : H;
              let it = xt;
              if (w) {
                const tt = w.match(/<img[^>]+src=["']([^"']+)["']/i);
                tt && /\.(gif|webp|apng)(\?|#|$)/i.test(tt[1]) && (it = tt[1].replace(/&amp;/g, "&"));
              }
              const U = {
                id: Rt(10),
                type: "image",
                x: W.x,
                y: W.y,
                w: $,
                h: st,
                z: t.nextZ(),
                data: { src: it }
              };
              t.addNode(U), t.select(U.id);
            }, mt.src = xt;
          }, pt.readAsDataURL(rt);
          return;
        }
    }
    const T = Ns(M) ?? Ns(w);
    if (T) {
      a(m);
      const nt = t.screenToCanvas(r, s), rt = await Ol(
        T,
        nt.x,
        nt.y,
        t.nextZ()
      );
      rt && (t.addNode(rt), t.select(rt.id));
      return;
    }
    if (Tu(M)) {
      const nt = Iu(M);
      if (nt) {
        a(m);
        const rt = {
          id: Rt(10),
          type: "youtube",
          x,
          y: b,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: nt, url: M.trim() }
        };
        t.addNode(rt), t.select(rt.id);
        return;
      }
    }
    const E = w.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (E)
      try {
        const nt = Ga(E);
        if (nt.length > 0) {
          a(m);
          const rt = {
            id: Rt(10),
            type: "content",
            x,
            y: b,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: nt, markdown: M, borderColor: "#1e1e2e" }
          };
          t.addNode(rt), t.select(rt.id);
          return;
        }
      } catch {
      }
    if (M.trim()) {
      a(m);
      const nt = await Vs(M), rt = {
        id: Rt(10),
        type: "content",
        x,
        y: b,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: nt, markdown: M, borderColor: "#1e1e2e" }
      };
      t.addNode(rt), t.select(rt.id);
      return;
    }
    t.hasClipboard() && (a(m), t.pasteClipboard(x, b));
  }, f = (m) => {
    const x = m.target;
    if (lr(x)) return;
    if (t.presentationMode) {
      if (m.key === "ArrowRight" || m.key === " ") {
        m.preventDefault(), t.presentationNext();
        return;
      }
      if (m.key === "ArrowLeft") {
        m.preventDefault(), t.presentationPrev();
        return;
      }
      if (m.key === "Escape") {
        m.preventDefault(), t.exitPresentation();
        return;
      }
      return;
    }
    const b = m.ctrlKey || m.metaKey;
    if (b && m.key === "c") {
      t.copySelected();
      return;
    }
    if (b && m.key === "x") {
      t.copySelected();
      return;
    }
    if (b && m.key.toLowerCase() === "f") {
      m.preventDefault(), o.dispatchEvent(new CustomEvent("sb:search-open"));
      return;
    }
    if (b && m.key === "d") {
      m.preventDefault(), t.duplicateSelected();
      return;
    }
    if (b && m.key === "g") {
      m.preventDefault(), m.shiftKey ? t.ungroupSelected() : t.groupSelected();
      return;
    }
    if (m.shiftKey && !b && m.key === "H") {
      m.preventDefault(), t.flipSelectedHorizontal();
      return;
    }
    if (m.shiftKey && !b && m.key === "V") {
      m.preventDefault(), t.flipSelectedVertical();
      return;
    }
    if (b && m.key === "]") {
      m.preventDefault();
      const w = Array.from(t.selection);
      m.altKey ? t.bringToFront(w) : t.bringForward(w);
      return;
    }
    if (b && m.key === "[") {
      m.preventDefault();
      const w = Array.from(t.selection);
      m.altKey ? t.sendToBack(w) : t.sendBackward(w);
      return;
    }
    if (!b && !m.altKey && !m.shiftKey) {
      if (m.key === "s") {
        t.setMode("select");
        return;
      }
      if (m.key === "p") {
        t.setMode("hand");
        return;
      }
      if (m.key === "d") {
        t.setMode("draw");
        return;
      }
      if (m.key === "g") {
        t.setMode("shape");
        return;
      }
      if (m.key === "t") {
        t.setMode("text");
        return;
      }
      if (m.key === "b") {
        t.setMode("note");
        return;
      }
      if (m.key === "y") {
        t.setMode("sticky");
        return;
      }
      if (m.key === "f") {
        t.setMode("frame");
        return;
      }
      if (m.key === "c") {
        t.setMode("edge");
        return;
      }
      if (m.key === "e") {
        t.setMode("erase");
        return;
      }
      if (m.key === "l") {
        t.toggleLassoSelect();
        return;
      }
      if (m.key === "z") {
        t.setMode("laser");
        return;
      }
    }
    if (m.key === "Delete" || m.key === "Backspace") {
      t.deleteSelected();
      return;
    }
    if (b && m.key === "z") {
      m.preventDefault(), m.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (b && m.key === "a") {
      m.preventDefault(), t.selectMultiple(t.getAllNodes().map((w) => w.id));
      return;
    }
    if (m.key === "Escape") {
      if (t.activeGroupId) {
        t.exitGroup();
        return;
      }
      t.deselectAll(), t.setMode("select");
      return;
    }
    if (b && (m.key === "=" || m.key === "+")) {
      m.preventDefault(), t.zoomIn();
      return;
    }
    if (b && m.key === "-") {
      m.preventDefault(), t.zoomOut();
      return;
    }
    if (b && m.key === "0") {
      m.preventDefault(), t.fitToContent();
      return;
    }
  };
  function y(m, x) {
    m.addEventListener("pointermove", l), m.addEventListener("copy", d), m.addEventListener("cut", c), m.addEventListener("paste", u), x.addEventListener("keydown", f);
  }
  function p(m, x) {
    m.removeEventListener("pointermove", l), m.removeEventListener("copy", d), m.removeEventListener("cut", c), m.removeEventListener("paste", u), x.removeEventListener("keydown", f);
  }
  y(o, n);
  const g = setInterval(() => {
    if (!e) return;
    const m = e.ownerDocument;
    m !== o && (p(o, n), o = m, n = m.defaultView ?? window, r = n.innerWidth / 2, s = n.innerHeight / 2, y(o, n));
  }, 500);
  return () => {
    clearInterval(g), p(o, n);
  };
}
async function da(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const n = t.measuredHeights, r = tf(o, n, t), s = e.padding ?? 40, i = e.background !== !1, l = e.format === "png", d = r.w + s * 2, c = r.h + s * 2, a = r.x - s, u = r.y - s, f = await Vl(o, t, n, a, u, l), y = i ? Hn(t.boardBackground).canvasBg : "transparent", p = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${d}" height="${c}" viewBox="0 0 ${d} ${c}">`,
    `<rect width="${d}" height="${c}" fill="${y}"/>`,
    ...f,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    ha(new Blob([p], { type: "image/svg+xml" }), "board.svg");
  else {
    const g = e.scale ?? 4, m = await ff(p, d, c, g);
    ha(m, "board.png");
  }
}
function tf(t, e, o) {
  let n = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const d of t) {
    if (d.type === "edge") continue;
    const c = o.resolveHeight(d);
    n = Math.min(n, d.x), r = Math.min(r, d.y), s = Math.max(s, d.x + d.w), i = Math.max(i, d.y + c);
  }
  const l = new Map(t.map((d) => [d.id, d]));
  for (const d of t) {
    if (d.type !== "edge") continue;
    const c = d, a = l.get(c.data.fromId), u = l.get(c.data.toId);
    if (!a || !u) continue;
    const f = Pe(
      a,
      u,
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
    n = Math.min(n, f.bounds.x), r = Math.min(r, f.bounds.y), s = Math.max(s, f.bounds.x + f.bounds.w), i = Math.max(i, f.bounds.y + f.bounds.h);
  }
  return isFinite(n) ? { x: n, y: r, w: s - n, h: i - r } : { x: 0, y: 0, w: 100, h: 100 };
}
async function Vl(t, e, o, n, r, s) {
  const i = new Map(t.map((c) => [c.id, c])), l = [...t].sort((c, a) => c.z - a.z), d = [];
  for (const c of l) {
    const a = c.x - n, u = c.y - r, f = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        d.push(ef(c, a, u, f));
        break;
      case "content":
        d.push(of(c, a, u, c.w, f));
        break;
      case "draw":
        d.push(nf(c, n, r));
        break;
      case "shape":
        d.push(sf(c, a, u, c.w, f));
        break;
      case "text":
        d.push(af(c, a, u, c.w, f));
        break;
      case "sticky":
        d.push(lf(c, a, u, c.w, f));
        break;
      case "image":
        d.push(await cf(c, a, u, c.w, f, s));
        break;
      case "youtube":
        d.push(await df(c, a, u, c.w, f, s));
        break;
      case "edge": {
        const y = c, p = i.get(y.data.fromId), g = i.get(y.data.toId);
        p && g && d.push(uf(y, p, g, o, n, r));
        break;
      }
    }
  }
  return d;
}
function To(t, e, o, n, r, s, i) {
  const l = [];
  if (s) {
    const d = e + n / 2, c = o + r / 2;
    l.push(`transform="rotate(${s}, ${d}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && l.push(`opacity="${i}"`), `<g ${l.join(" ")}>${t}</g>`;
}
function ef(t, e, o, n) {
  const r = t.data, s = r.backgroundColor || "rgba(0,0,0,0.02)", i = r.borderColor || "#d1d5db", l = r.borderWidth ?? 1, d = Er(r.borderStyle, l), c = r.label ? yn(r.label) : "";
  let a = `<rect x="${e}" y="${o}" width="${t.w}" height="${n}" rx="4" fill="${s}" stroke="${i}" stroke-width="${l}"` + (d ? ` stroke-dasharray="${d}"` : "") + "/>";
  return c && (a += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), To(a, e, o, t.w, n, t.rotation, r.opacity);
}
function of(t, e, o, n, r) {
  var u;
  const s = t.data, i = ((u = s.markdown) == null ? void 0 : u.trim()) || "", l = s.borderColor, d = s.borderWidth ?? 0, c = Er(s.borderStyle, d);
  let a = "";
  return l && d > 0 ? a += `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="white" stroke="${l}" stroke-width="${d}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : a += `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="white"/>`, i && (a += ai(i, e + 12, o + 20, n - 24, 14, 1.6, "#374151", "left", "sans-serif")), To(a, e, o, n, r, t.rotation, s.opacity);
}
function nf(t, e, o) {
  const n = t.data, r = n.points.map(
    ([l, d, c]) => [l + t.x - e, d + t.y - o, c]
  );
  if (r.length === 0) return "";
  if (n.tool === "vector")
    return rf(r, n, t);
  const s = no(n.strokeStyle);
  let i = "";
  if (n.fill) {
    const l = r.map(([d, c]) => [d, c]);
    if (l.length > 2) {
      const d = l.map((c, a) => `${a === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ") + " Z";
      i += `<path d="${d}" fill="${n.fill}" fill-opacity="0.4" stroke="none"/>`;
    }
  }
  if (s) {
    const l = r.map((c, a) => `${a === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" "), d = s.map((c) => c * Math.max(n.strokeWidth, 1)).join(" ");
    i += `<path d="${l}" fill="none" stroke="${n.color}" stroke-width="${n.strokeWidth}" stroke-dasharray="${d}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const l = Qs(r, { size: n.strokeWidth });
    l && (i += `<path d="${l}" fill="${n.color}" stroke="none"/>`);
  }
  return n.opacity !== void 0 && n.opacity !== 1 ? `<g opacity="${n.opacity}">${i}</g>` : i;
}
function rf(t, e, o) {
  const n = t.map((d, c) => `${c === 0 ? "M" : "L"}${d[0].toFixed(2)},${d[1].toFixed(2)}`).join(" ") + " Z", r = no(e.strokeStyle), s = r ? ` stroke-dasharray="${r.map((d) => d * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${n}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, l = o.h === "auto" ? 0 : o.h;
  return To(i, o.x, o.y, o.w, l, o.rotation, e.opacity);
}
function sf(t, e, o, n, r) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: no(s.strokeStyle),
    seed: t.id
  };
  let l;
  const d = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      l = Wn(e, o, n, r, i, d);
      break;
    case "ellipse":
      l = Ir(e + n / 2, o + r / 2, n, r, i);
      break;
    case "diamond":
      l = Tr(e, o, n, r, i, d);
      break;
    case "line": {
      const a = s.startPoint ?? [0, 0], u = s.endPoint ?? [n, r];
      l = Oo(e + a[0], o + a[1], e + u[0], o + u[1], i);
      break;
    }
    case "arrow": {
      const a = s.startPoint ?? [0, 0], u = s.endPoint ?? [n, r];
      l = zr(e + a[0], o + a[1], e + u[0], o + u[1], i);
      break;
    }
    default:
      l = Wn(e, o, n, r, i);
  }
  const c = l.map(
    (a) => `<path d="${a.d}" fill="${a.fill || "none"}" stroke="${a.stroke}" stroke-width="${a.strokeWidth}"` + (a.strokeDasharray ? ` stroke-dasharray="${a.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return To(c, e, o, n, r, t.rotation, s.opacity);
}
function af(t, e, o, n, r) {
  const s = t.data, i = r || s.text.split(`
`).length * s.fontSize * 1, l = wo(s.fontFamily), d = !!s.borderColor, c = d ? 6 : 0;
  let a = "";
  if (d) {
    const f = s.borderWidth ?? 1, y = Er(s.borderStyle, f);
    a += `<rect x="${e}" y="${o}" width="${n}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${f}"` + (y ? ` stroke-dasharray="${y}"` : "") + "/>";
  }
  const u = s.align === "center" ? e + n / 2 : s.align === "right" ? e + n - c : e + c;
  return a += ai(
    s.text,
    u,
    o + c + s.fontSize,
    n - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    l
  ), To(a, e, o, n, i, t.rotation, s.opacity);
}
function lf(t, e, o, n, r) {
  const s = t.data, i = s.fontSize ?? 16, l = `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="2" fill="${s.color}"/>` + ai(s.text, e + 12, o + 12 + i, n - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return To(l, e, o, n, r, t.rotation, s.opacity);
}
async function cf(t, e, o, n, r, s) {
  const i = t.data;
  let l = i.src;
  if (s && l && !l.startsWith("data:"))
    try {
      l = await kr(l);
    } catch {
    }
  const d = i.borderColor, c = i.borderWidth ?? 0, a = Er(i.borderStyle, c);
  let u = `<image href="${yn(l)}" x="${e}" y="${o}" width="${n}" height="${r}" preserveAspectRatio="xMidYMid slice"/>`;
  return d && c > 0 && (u += `<rect x="${e}" y="${o}" width="${n}" height="${r}" fill="none" stroke="${d}" stroke-width="${c}"` + (a ? ` stroke-dasharray="${a}"` : "") + "/>"), To(u, e, o, n, r, t.rotation, i.opacity);
}
async function df(t, e, o, n, r, s) {
  const i = t.data;
  let l = Pu(i.videoId);
  if (s)
    try {
      l = await kr(l);
    } catch {
    }
  let d = `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="#1a1a1a"/><image href="${yn(l)}" x="${e}" y="${o}" width="${n}" height="${r}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + n / 2, a = o + r / 2, u = Math.min(n, r) * 0.12;
  return d += `<circle cx="${c}" cy="${a}" r="${u}" fill="rgba(0,0,0,0.6)"/><path d="${hf(c, a, u * 0.5)}" fill="white"/>`, To(d, e, o, n, r, t.rotation, i.opacity);
}
function hf(t, e, o) {
  const n = o * 0.15, r = t - o * 0.7 + n, s = e - o, i = t + o + n, l = e, d = r, c = e + o;
  return `M${r},${s} L${i},${l} L${d},${c} Z`;
}
function uf(t, e, o, n, r, s) {
  const i = t.data, l = Pe(
    e,
    o,
    i.edgeType,
    n,
    i.sourceHandle,
    i.targetHandle,
    i.midpointOffset,
    i.curveOffset,
    void 0,
    void 0,
    i.sourceT,
    i.targetT,
    i.attachmentGap
  ), d = `translate(${-r}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, a = i.strokeWidth;
  let u = `<path d="${l.path}" fill="none" stroke="${i.color}" stroke-width="${a}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const f = i.arrowHeadSize ?? Math.max(8, a * 3), y = i.arrowTailSize ?? Math.max(8, a * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      u += `<path d="${yo(l.x2, l.y2, l.arrowAngle, f)}" fill="none" stroke="${i.color}" stroke-width="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      u += `<path d="${yr(l.x2, l.y2, l.arrowAngle, f)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const p = f / 3;
      u += `<circle cx="${l.x2}" cy="${l.y2}" r="${p}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      u += `<path d="${yo(l.x1, l.y1, l.tailAngle, y)}" fill="none" stroke="${i.color}" stroke-width="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      u += `<path d="${yr(l.x1, l.y1, l.tailAngle, y)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const p = y / 3;
      u += `<circle cx="${l.x1}" cy="${l.y1}" r="${p}" fill="${i.color}"/>`;
    }
  }
  return i.label && (u += `<text x="${l.labelX}" y="${l.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${yn(i.label)}</text>`), `<g transform="${d}">${u}</g>`;
}
function ai(t, e, o, n, r, s, i, l, d) {
  if (!t) return "";
  const c = l === "center" ? "middle" : l === "right" ? "end" : "start", a = pf(t, n, r), u = r * s, f = a.map(
    (y, p) => `<tspan x="${e}" dy="${p === 0 ? 0 : u}">${yn(y)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${r}" fill="${i}" font-family="${yn(d)}" text-anchor="${c}">${f}</text>`;
}
function pf(t, e, o) {
  const n = o * 0.55, r = Math.max(1, Math.floor(e / n)), s = [];
  for (const i of t.split(`
`)) {
    if (!i.trim()) {
      s.push("");
      continue;
    }
    const l = i.split(/\s+/);
    let d = "";
    for (const c of l) {
      const a = d ? d + " " + c : c;
      a.length > r && d ? (s.push(d), d = c) : d = a;
    }
    d && s.push(d);
  }
  return s;
}
function Er(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function yn(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function kr(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((n, r) => {
    const s = new FileReader();
    s.onloadend = () => n(s.result), s.onerror = r, s.readAsDataURL(o);
  });
}
function ff(t, e, o, n) {
  return new Promise((r, s) => {
    const i = new Image(), l = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), d = URL.createObjectURL(l);
    i.onload = () => {
      const c = document.createElement("canvas");
      c.width = e * n, c.height = o * n;
      const a = c.getContext("2d");
      a.scale(n, n), a.drawImage(i, 0, 0, e, o), URL.revokeObjectURL(d), c.toBlob((u) => {
        u ? r(u) : s(new Error("Canvas toBlob failed"));
      }, "image/png");
    }, i.onerror = () => {
      URL.revokeObjectURL(d), s(new Error("Failed to load SVG as image"));
    }, i.src = d;
  });
}
const yf = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), on = /* @__PURE__ */ new Map(), gf = 12;
function mf(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const n = o.data.fontFamily;
      n && !yf.has(n) && e.add(n);
    }
  return [...e];
}
async function bf(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (on.has(o)) {
      e.push(on.get(o));
      continue;
    }
    try {
      let n;
      if (o === "Excalifont")
        n = await kr(ja);
      else {
        const l = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!l) continue;
        n = await kr(l[1]);
      }
      const r = `@font-face { font-family: '${o}'; src: url('${n}') format('woff2'); }`;
      if (on.size >= gf) {
        const s = on.keys().next().value;
        s !== void 0 && on.delete(s);
      }
      on.set(o, r), e.push(r);
    } catch {
    }
  }
  return e.join(`
`);
}
async function xf(t, e) {
  const o = t.getNode(e);
  if (!o || o.type !== "frame") return "";
  const n = t.resolveHeight(o), r = 0, s = o.w + r * 2, i = n + r * 2, l = o.x - r, d = o.y - r, c = [o], a = /* @__PURE__ */ new Set([e]), u = (b) => {
    a.has(b.id) || b.type === "edge" || (a.add(b.id), c.push(b));
  };
  for (const b of t.getNodesInRect({ x: o.x, y: o.y, w: o.w, h: n }))
    u(b);
  for (const b of t.getFrameChildren(e))
    u(b);
  for (const b of t.getAllNodes())
    if (b.type === "edge") {
      const w = b;
      a.has(w.data.fromId) && a.has(w.data.toId) && c.push(b);
    }
  const f = t.measuredHeights, y = await Vl(c, t, f, l, d, !0), p = mf(c), g = await bf(p), m = Hn(t.boardBackground).canvasBg, x = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    g ? `<defs><style>${g}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${m}"/>`,
    ...y,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(x)}`;
}
function ha(t, e) {
  const o = URL.createObjectURL(t), n = document.createElement("a");
  n.href = o, n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(o);
}
const ua = [
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
], pa = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function fa(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const Kl = [
  ...ua,
  ...fa(ua, "phone-landscape"),
  ...pa,
  ...fa(pa, "tablet-landscape"),
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
], wf = new Map(Kl.map((t) => [t.key, t]));
function Hs(t) {
  return wf.get(t);
}
function ql(t) {
  return t.w / t.h;
}
const kf = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function vf() {
  const t = /* @__PURE__ */ new Map();
  for (const e of Kl) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: kf[e] ?? e,
    presets: o
  }));
}
function Sf(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, n = parseInt(e.substring(2, 4), 16) || 0, r = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * n + 0.114 * r) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function as(t, e, o) {
  let n = !1;
  for (let r = 0, s = o.length - 1; r < o.length; s = r++) {
    const [i, l] = o[r], [d, c] = o[s];
    l > e != c > e && t < (d - i) * (e - l) / (c - l) + i && (n = !n);
  }
  return n;
}
function ls(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function Mf(t, e, o) {
  try {
    const n = await navigator.clipboard.read();
    let r = null;
    for (const i of n)
      if (i.types.includes("text/html")) {
        const l = await (await i.getType("text/html")).text();
        if (l.includes("sbd-clipboard") || l.includes("data-sbd-nodes=")) {
          const d = Gl(l);
          if (d) {
            t.setClipboard(d), t.pasteClipboard(e, o);
            return;
          }
          if (t.hasClipboard()) {
            t.pasteClipboard(e, o);
            return;
          }
        }
        r = l;
      }
    for (const i of n) {
      const l = i.types.find((d) => d.startsWith("image/"));
      if (l) {
        const d = await i.getType(l), c = await new Promise((b) => {
          const w = new FileReader();
          w.onload = () => b(w.result), w.readAsDataURL(d);
        }), a = new Image();
        await new Promise((b) => {
          a.onload = () => b(), a.src = c;
        });
        const u = a.naturalWidth / a.naturalHeight, f = Math.min(a.naturalWidth, 400), y = Math.min(a.naturalHeight, 300), p = u >= 1 ? f : y * u, g = u >= 1 ? f / u : y;
        let m = c;
        if (r) {
          const b = r.match(/<img[^>]+src=["']([^"']+)["']/i);
          b && /\.(gif|webp|apng)(\?|#|$)/i.test(b[1]) && (m = b[1].replace(/&amp;/g, "&"));
        }
        const x = {
          id: Rt(10),
          type: "image",
          x: e,
          y: o,
          w: p,
          h: g,
          z: t.nextZ(),
          data: { src: m }
        };
        t.addNode(x), t.select(x.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (r) {
      const i = r.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const l = Ga(i);
        if (l.length > 0) {
          const d = {
            id: Rt(10),
            type: "content",
            x: e,
            y: o,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: l, markdown: s || "", borderColor: "#1e1e2e" }
          };
          t.addNode(d), t.select(d.id);
          return;
        }
      } catch {
      }
    }
    if (s != null && s.trim()) {
      const i = await Vs(s), l = {
        id: Rt(10),
        type: "content",
        x: e,
        y: o,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: i, markdown: s, borderColor: "#1e1e2e" }
      };
      t.addNode(l), t.select(l.id);
      return;
    }
  } catch {
  }
  t.pasteClipboard(e, o);
}
async function ya(t) {
  const e = t.getClipboardNodes();
  if (e.length === 0) return;
  const o = [];
  for (const l of e)
    if (l.type === "content") {
      const d = l.data;
      d.markdown && o.push(d.markdown);
    } else if (l.type === "text") {
      const d = l.data;
      d.text && o.push(d.text);
    } else if (l.type === "image") {
      const d = l.data;
      o.push(d.src.startsWith("http") ? d.src : d.alt || "[Image]");
    } else if (l.type === "shape") {
      const d = l.data;
      d.label && o.push(d.label);
    } else if (l.type === "sticky") {
      const d = l.data;
      d.text && o.push(d.text);
    } else if (l.type === "edge") {
      const d = l.data;
      d.label && o.push(d.label);
    }
  const n = o.join(`

`), r = n.split(`
`).filter(Boolean).map((l) => `<p>${l}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${Yl(e)}">${r || "<p></p>"}</div>`;
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([n], { type: "text/plain" }),
        "text/html": new Blob([i], { type: "text/html" })
      })
    ]);
  } catch {
    try {
      await navigator.clipboard.writeText(n);
    } catch {
    }
  }
}
function cr(t) {
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
function ga(t, e) {
  const o = e.x - t.x, n = e.y - t.y;
  return { dist: Math.sqrt(o * o + n * n), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const nn = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function Cf({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: n,
  observeElement: r,
  unobserveElement: s,
  isContainer: i,
  children: l
}) {
  const d = ut(null);
  St(() => {
    if (t.h !== "auto") return;
    const u = d.current;
    if (!u) return;
    const f = u.offsetHeight;
    return f > 0 && n(t.id, f), r(u, () => {
      const y = u.offsetHeight;
      y > 0 && n(t.id, y);
    }), () => s(u);
  }, [t.id, t.h, n, r, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, a = Kt(() => ({
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
      ref: d,
      "data-node-id": t.id,
      className: e ? void 0 : "sb-block-inert",
      style: a,
      children: l
    }
  );
}
function If({
  node: t,
  engine: e,
  onDone: o
}) {
  const n = ut(null), r = ut(t.data.label ?? ""), s = ut(t);
  s.current = t;
  const i = ut(t.data.label ?? ""), l = ut(!1);
  St(() => () => {
    const u = s.current, f = r.current.trim();
    if (f !== i.current) {
      const p = { data: { ...u.data, label: f || void 0 } }, g = n.current;
      if (g && f) {
        const x = u.h === "auto" ? 100 : u.h, b = g.scrollHeight + 24;
        b > x && (p.h = b);
      }
      l.current ? (l.current = !1, e.updateNode(u.id, p)) : e.updateNodeWithHistory(u.id, p);
    }
  }, []);
  const d = t.h === "auto" ? 100 : t.h, c = t.data.labelFontSize ?? 14, a = t.data.fill && t.data.fillStyle === "solid" ? Sf(t.data.fill) : t.data.stroke;
  return /* @__PURE__ */ h(
    "div",
    {
      "data-node-id": t.id,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: d,
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
          ref: n,
          autoFocus: !0,
          defaultValue: t.data.label ?? "",
          placeholder: "",
          rows: 1,
          onBlur: () => o(),
          onKeyDown: (u) => {
            u.key === "Escape" && u.currentTarget.blur(), u.stopPropagation();
          },
          onInput: (u) => {
            const f = u.currentTarget;
            l.current || (l.current = !0, e.pushHistorySnapshot()), r.current = f.value;
            const y = s.current;
            e.updateNode(y.id, {
              data: { ...y.data, label: f.value || void 0 }
            }), f.style.height = "auto", f.style.height = f.scrollHeight + "px";
            const g = f.scrollHeight + 24;
            g > d && e.updateNode(t.id, { h: g });
          },
          onPointerDown: (u) => u.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: c,
            fontFamily: wo(t.data.labelFontFamily ?? xo),
            color: a,
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
const ma = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none"
};
function Tf({
  safariWebKitWorkaround: t,
  viewport: e,
  viewportTransform: o,
  children: n
}) {
  return t ? /* @__PURE__ */ h(
    "div",
    {
      style: {
        ...ma,
        transform: `translate3d(${e.x}px, ${e.y}px, 0)`,
        transformOrigin: "0 0",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden"
      },
      children: /* @__PURE__ */ h(
        "div",
        {
          style: {
            position: "absolute",
            inset: 0,
            transform: `scale(${e.zoom})`,
            transformOrigin: "0 0",
            pointerEvents: "none",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden"
          },
          children: n
        }
      )
    }
  ) : /* @__PURE__ */ h(
    "div",
    {
      style: {
        ...ma,
        transform: o,
        transformOrigin: "0 0"
      },
      children: n
    }
  );
}
function zf({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: n,
  dataFlowEdgeOverlay: r = "off",
  minimapVisible: s = !0,
  singleFrameId: i
}) {
  var Ii;
  const { labels: l } = _t(), d = ut(null), c = ut(null), a = () => {
    var k;
    return ((k = d.current) == null ? void 0 : k.ownerDocument) ?? document;
  }, [u, f] = et({ w: 0, h: 0 }), [y, p] = et({ ...t.viewport }), [g, m] = et(t.getAllNodes()), [x, b] = et(
    new Set(t.selection)
  ), [w, M] = et(!1), [v, C] = et(t.mode), [T, E] = et(t.activeGroupId), [z, j] = et(() => t.getSearchState()), [Y, nt] = et([]), [rt, pt] = et(t.snapToGrid), [xt, mt] = et(t.gridSize), [W, B] = et(t.smartGuides), [G, q] = et([]), [J, H] = et(t.boardBackground), $ = Kt(() => x.size === 1 ? Array.from(x)[0] : x.size > 1 ? [...x].sort().join("\0") : "canvas-none", [x]), st = Ar(t, $), it = ut(!1), U = ut(!1), tt = ut(/* @__PURE__ */ new Map()), dt = ut(!1), _ = ut(!1), ht = ut(null), gt = ut(null), ft = lt((k) => {
    a().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: k } }));
  }, []);
  St(() => {
    const k = (P) => {
      var O, A;
      if (P.key === " " && !P.repeat && !it.current) {
        const N = (O = P.target) == null ? void 0 : O.tagName;
        if (N === "INPUT" || N === "TEXTAREA" || (A = P.target) != null && A.isContentEditable) return;
        it.current = !0;
        const R = d.current;
        R && (R.style.cursor = "grab"), P.preventDefault();
      }
    }, L = (P) => {
      if (P.key === " ") {
        it.current = !1, U.current = !1;
        const O = d.current;
        O && (O.style.cursor = t.lassoSelect ? nn : cr(t.mode));
      }
    };
    return window.addEventListener("keydown", k), window.addEventListener("keyup", L), () => {
      window.removeEventListener("keydown", k), window.removeEventListener("keyup", L);
    };
  }, []), St(() => {
    const k = (P) => {
      tt.current.delete(P.pointerId), P.pointerType === "pen" && (_.current = !1), tt.current.size === 0 && ft(!1), ht.current && (clearTimeout(ht.current), ht.current = null, gt.current = null);
    }, L = a();
    return L.addEventListener("pointerup", k), L.addEventListener("pointercancel", k), () => {
      L.removeEventListener("pointerup", k), L.removeEventListener("pointercancel", k);
    };
  }, [ft]);
  const [wt, zt] = et(null), [Ft, Et] = et(null), [ct, Bt] = et(null), Gt = ut(ct);
  St(() => {
    const k = Gt.current;
    Gt.current = ct, ct ? t.notifyEdgeProgress(vp(ct)) : k && t.notifyEdgeEnd();
  }, [ct, t]);
  const Ut = ut(Ft);
  St(() => {
    if (t.mode !== "frame") {
      Ut.current && t.notifyRectDragEnd(), Ut.current = null;
      return;
    }
    const k = Ut.current;
    Ut.current = Ft, Ft ? t.notifyRectDragProgress({
      kind: "frame",
      startX: Ft.startX,
      startY: Ft.startY,
      endX: Ft.endX,
      endY: Ft.endY
    }) : k && t.notifyRectDragEnd();
  }, [Ft, t.mode, t]);
  const [Jt, Zt] = et(null);
  St(() => {
    const k = d.current;
    if (!k) return;
    t.setContainer(k);
    const L = () => {
      const N = k.getBoundingClientRect();
      t.containerOffset = { x: N.left, y: N.top };
    };
    L();
    const P = new ResizeObserver((N) => {
      var V;
      const { width: R, height: D } = ((V = N[0]) == null ? void 0 : V.contentRect) ?? { width: 0, height: 0 };
      f((Z) => Z.w === R && Z.h === D ? Z : { w: R, h: D }), t.setContainerSize(R, D), L();
    });
    P.observe(k);
    const O = () => L();
    window.addEventListener("scroll", O, !0), window.addEventListener("resize", O);
    const A = window.visualViewport;
    return A && (A.addEventListener("resize", O), A.addEventListener("scroll", O)), () => {
      P.disconnect(), window.removeEventListener("scroll", O, !0), window.removeEventListener("resize", O), A && (A.removeEventListener("resize", O), A.removeEventListener("scroll", O));
    };
  }, [t]);
  const [yt, fe] = et({}), de = lt((k, L) => {
    fe(
      (P) => P[k] === L ? P : { ...P, [k]: L }
    ), t.updateMeasuredHeight(k, L);
  }, [t]), se = ut(null), ge = ut(/* @__PURE__ */ new Map());
  function ke() {
    return se.current || (se.current = new ResizeObserver((k) => {
      var L;
      for (const P of k)
        (L = ge.current.get(P.target)) == null || L(P);
    })), se.current;
  }
  const Ne = lt((k, L) => {
    ge.current.set(k, L), ke().observe(k);
  }, []), mn = lt((k) => {
    var L;
    ge.current.delete(k), (L = se.current) == null || L.unobserve(k);
  }, []);
  St(() => () => {
    var k;
    (k = se.current) == null || k.disconnect(), se.current = null, ge.current.clear();
  }, []);
  const zo = Kt(() => new Set(g.map((k) => k.id)), [g]);
  St(() => {
    fe((k) => {
      let L = !1;
      const P = {};
      for (const [O, A] of Object.entries(k))
        zo.has(O) ? P[O] = A : L = !0;
      return L ? P : k;
    });
  }, [zo]);
  const Je = lt(
    (k, L, P) => {
      let O, A;
      if (o && k.data.sourcePort) {
        const N = o.get(L.type);
        N != null && N.ports && (O = ze(L, N.ports, k.data.sourcePort, y.zoom, yt, N.portAnchor ?? "bbox") ?? void 0);
      }
      if (o && k.data.targetPort) {
        const N = o.get(P.type);
        N != null && N.ports && (A = ze(P, N.ports, k.data.targetPort, y.zoom, yt, N.portAnchor ?? "bbox") ?? void 0);
      }
      return { sourcePortPos: O, targetPortPos: A };
    },
    [o, y.zoom, yt]
  );
  lt(
    (k) => t.zoomToNode(k),
    [t, l]
  );
  const I = lt(
    (k, L) => {
      if (!k.rotation)
        return { minX: k.x, minY: k.y, maxX: k.x + k.w, maxY: k.y + L };
      const P = k.x + k.w / 2, O = k.y + L / 2, A = k.rotation * Math.PI / 180, N = Math.cos(A), R = Math.sin(A), D = [
        [k.w / 2, L / 2],
        [-k.w / 2, L / 2],
        [-k.w / 2, -L / 2],
        [k.w / 2, -L / 2]
      ];
      let V = 1 / 0, Z = 1 / 0, X = -1 / 0, Q = -1 / 0;
      for (const [F, K] of D) {
        const ot = P + F * N - K * R, vt = O + F * R + K * N;
        V = Math.min(V, ot), Z = Math.min(Z, vt), X = Math.max(X, ot), Q = Math.max(Q, vt);
      }
      return { minX: V, minY: Z, maxX: X, maxY: Q };
    },
    []
  ), at = 8, ae = lt(
    (k, L) => L.filter((P) => {
      if (P.type === "edge") {
        const N = P.data, R = t.getNode(N.fromId), D = t.getNode(N.toId);
        if (!R || !D) return !1;
        const { x1: V, y1: Z, x2: X, y2: Q } = Ei(R, D, yt);
        return V >= k.x && V <= k.x + k.w && Z >= k.y && Z <= k.y + k.h && X >= k.x && X <= k.x + k.w && Q >= k.y && Q <= k.y + k.h;
      }
      const O = P.h === "auto" ? yt[P.id] ?? 100 : P.h, A = I(P, O);
      return A.minX >= k.x && A.maxX <= k.x + k.w && A.minY >= k.y && A.maxY <= k.y + k.h;
    }),
    [I, yt]
  ), ve = lt(
    (k, L) => k.length < 3 ? [] : L.filter((P) => {
      if (P.type === "edge") {
        const R = P, D = t.getNode(R.data.fromId), V = t.getNode(R.data.toId);
        if (!D || !V) return !1;
        const { x1: Z, y1: X, x2: Q, y2: F } = Ei(D, V, yt);
        return as(Z, X, k) && as(Q, F, k);
      }
      const O = P.h === "auto" ? yt[P.id] ?? 100 : P.h, A = P.x + P.w / 2, N = P.y + O / 2;
      return as(A, N, k);
    }),
    [t, yt]
  ), ce = Kt(() => {
    if (x.size < 2) return null;
    let k = 1 / 0, L = 1 / 0, P = -1 / 0, O = -1 / 0;
    for (const A of x) {
      const N = g.find((V) => V.id === A);
      if (!N || N.type === "edge") continue;
      const R = N.h === "auto" ? yt[N.id] ?? 100 : N.h, D = I(N, R);
      k = Math.min(k, D.minX), L = Math.min(L, D.minY), P = Math.max(P, D.maxX), O = Math.max(O, D.maxY);
    }
    return k === 1 / 0 ? null : {
      x: k - at,
      y: L - at,
      w: P - k + at * 2,
      h: O - L + at * 2
    };
  }, [x, g, yt, I]), Oe = Kt(() => {
    if (!T) return null;
    const k = t.getAllGroupDescendantNodes(T);
    if (k.length === 0) return null;
    let L = 1 / 0, P = 1 / 0, O = -1 / 0, A = -1 / 0;
    for (const R of k) {
      if (R.type === "edge") continue;
      const D = R.h === "auto" ? yt[R.id] ?? 100 : R.h, V = I(R, D);
      L = Math.min(L, V.minX), P = Math.min(P, V.minY), O = Math.max(O, V.maxX), A = Math.max(A, V.maxY);
    }
    if (L === 1 / 0) return null;
    const N = 8;
    return { x: L - N, y: P - N, w: O - L + N * 2, h: A - P + N * 2 };
  }, [T, g, yt, I, t]), qt = Kt(() => {
    const k = performance.now();
    if (g.filter(
      (Ct) => {
        if (o) {
          const At = o.get(Ct.type);
          return At && !At.isSVGOnly;
        }
        return Ct.type === "content" || Ct.type === "draw" || Ct.type === "shape" || Ct.type === "image" || Ct.type === "text" || Ct.type === "frame" || Ct.type === "sticky";
      }
    ), u.w <= 0 || u.h <= 0)
      return null;
    const { zoom: L, x: P, y: O } = y, N = Math.min(500, 280 / Math.max(L, 0.1)), R = {
      x: -P / L - N,
      y: -O / L - N,
      w: u.w / L + N * 2,
      h: u.h / L + N * 2
    }, D = t.getNodesInRect(R), V = /* @__PURE__ */ new Map(), Z = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set();
    let F = 0, K = 0, ot = 0, vt = 0, Tt = 0;
    const Dt = (Ct, At = !1) => {
      const bt = t.getNode(Ct);
      if (!bt) return;
      const Pt = V.has(bt.id);
      V.set(bt.id, bt), bt.type === "edge" ? Q.add(bt.id) : (Pt || Z.add(bt.id), At && X.add(bt.id));
    };
    for (const Ct of D) {
      const At = X.size;
      Dt(Ct.id, !0), X.size > At && (F += 1);
    }
    for (const Ct of x)
      Dt(Ct, !0);
    const It = Jt ? { x: Jt.cursorX, y: Jt.cursorY } : ct ? { x: ct.cursorX, y: ct.cursorY } : null;
    if (It) {
      const Ct = 200 / Math.max(0.2, y.zoom), At = t.getNodesInRect({
        x: It.x - Ct,
        y: It.y - Ct,
        w: Ct * 2,
        h: Ct * 2
      });
      for (const bt of At)
        bt.type !== "edge" && Dt(bt.id, !0);
    }
    const Lt = Array.from(X);
    for (const Ct of Lt) {
      const At = t.getEdgesForNode(Ct);
      for (const bt of At) {
        const Pt = bt.data, Vt = Q.has(bt.id);
        V.set(bt.id, bt), Q.add(bt.id), Vt || (vt += 1);
        const Nt = Z.size;
        Dt(Pt.fromId, !1), Z.size > Nt && (K += 1);
        const Wt = Z.size;
        Dt(Pt.toId, !1), Z.size > Wt && (K += 1);
      }
    }
    if (!w)
      for (const Ct of g) {
        if (Ct.type !== "edge" || Q.has(Ct.id)) continue;
        const At = Ct.data, bt = t.getNode(At.fromId), Pt = t.getNode(At.toId);
        if (!bt || !Pt) continue;
        let Vt = X.has(At.fromId) || X.has(At.toId);
        if (!Vt) {
          const Nt = Pe(
            bt,
            Pt,
            At.edgeType || "bezier",
            yt,
            At.sourceHandle,
            At.targetHandle,
            At.midpointOffset,
            At.curveOffset,
            void 0,
            void 0,
            At.sourceT,
            At.targetT,
            At.attachmentGap
          );
          Vt = Nt.bounds.x < R.x + R.w && Nt.bounds.x + Nt.bounds.w > R.x && Nt.bounds.y < R.y + R.h && Nt.bounds.y + Nt.bounds.h > R.y;
        }
        if (Vt) {
          V.set(Ct.id, Ct), Q.add(Ct.id), Tt += 1;
          const Nt = Z.size;
          Dt(bt.id, !1), Z.size > Nt && (ot += 1);
          const Wt = Z.size;
          Dt(Pt.id, !1), Z.size > Wt && (ot += 1);
        }
      }
    const ne = Array.from(V.values());
    return {
      domNodes: ne.filter((Ct) => {
        if (Ct.type === "edge" || !X.has(Ct.id)) return !1;
        if (o) {
          const At = o.get(Ct.type);
          return !!At && !At.isSVGOnly;
        }
        return Ct.type === "content" || Ct.type === "draw" || Ct.type === "shape" || Ct.type === "image" || Ct.type === "text" || Ct.type === "frame" || Ct.type === "sticky";
      }),
      svgNodes: ne,
      visibleNodeCount: X.size,
      visibleEdgeCount: Q.size,
      seedVisibleNodes: F,
      nodesAddedByAdjacency: K,
      nodesAddedByEdgeEndpoints: ot,
      edgesAddedByAdjacency: vt,
      edgesAddedByCrossing: Tt,
      cullingMs: performance.now() - k
    };
  }, [y, u, g, x, t, o, yt, ct, Jt, w]), Ve = Kt(() => {
    if (!i) return null;
    const k = /* @__PURE__ */ new Set();
    k.add(i);
    const L = t.getFrameDescendantIds(i);
    for (const P of L) k.add(P);
    return k;
  }, [i, t, g]), Po = w ? (qt == null ? void 0 : qt.svgNodes) ?? g : g, bn = Ve ? Po.filter((k) => Ve.has(k.id)) : Po;
  St(() => {
    if (!we.isEnabled()) return;
    const k = g.reduce((P, O) => P + (O.type === "edge" ? 1 : 0), 0), L = g.length - k;
    we.recordCulling((qt == null ? void 0 : qt.cullingMs) ?? 0), we.setVisibilityCounts({
      visibleNodes: (qt == null ? void 0 : qt.visibleNodeCount) ?? L,
      totalNodes: L,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: k,
      totalEdges: k,
      virtualizationActive: !!qt,
      seedVisibleNodes: (qt == null ? void 0 : qt.seedVisibleNodes) ?? L,
      nodesAddedByAdjacency: (qt == null ? void 0 : qt.nodesAddedByAdjacency) ?? 0,
      nodesAddedByEdgeEndpoints: (qt == null ? void 0 : qt.nodesAddedByEdgeEndpoints) ?? 0,
      edgesAddedByAdjacency: (qt == null ? void 0 : qt.edgesAddedByAdjacency) ?? 0,
      edgesAddedByCrossing: (qt == null ? void 0 : qt.edgesAddedByCrossing) ?? 0
    });
  }, [g, qt]);
  const Ao = ut(0);
  St(() => {
    if (!we.isEnabled() || !qt) return;
    const k = performance.now();
    if (k - Ao.current < 1e3) return;
    Ao.current = k;
    const L = g.reduce((O, A) => O + (A.type === "edge" ? 1 : 0), 0), P = g.length - L;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: qt.visibleNodeCount,
      totalNodes: P,
      visibleEdges: qt.visibleEdgeCount,
      totalEdges: L,
      seedVisibleNodes: qt.seedVisibleNodes,
      nodesAddedByAdjacency: qt.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: qt.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: qt.edgesAddedByAdjacency,
      edgesAddedByCrossing: qt.edgesAddedByCrossing,
      cullingMs: qt.cullingMs
    });
  }, [g, qt, y]), St(() => {
    let k = null;
    const L = () => {
      k === null && (k = requestAnimationFrame(() => {
        k = null, m([...t.getAllNodes()]);
      }));
    };
    let P = null;
    const O = () => {
      P === null && (P = requestAnimationFrame(() => {
        P = null, p({ ...t.viewport });
      }));
    }, A = () => {
      b((F) => {
        const K = new Set(t.selection);
        return F.size !== K.size || [...F].some((ot) => !K.has(ot)) ? (Lo((ot) => {
          if (!ot || K.has(ot)) return ot;
          const vt = Kn.current;
          return vt && vt.id === ot && performance.now() < vt.until ? ot : null;
        }), Jo((ot) => ot && !K.has(ot) ? null : ot), Ro((ot) => ot && !K.has(ot) ? null : ot), $o((ot) => ot && !K.has(ot) ? null : ot), _o((ot) => ot && !K.has(ot) ? null : ot), jn(null), K) : F;
      });
    }, N = () => {
      C(t.mode), t.mode === "edge" && t.deselectAll();
    }, R = () => H(t.boardBackground), D = () => {
      q([...t.alignGuides]), pt(t.snapToGrid), mt(t.gridSize), B(t.smartGuides);
    }, V = () => j(t.getSearchState());
    t.on("change", L), t.on("viewport", O), t.on("selection", A), t.on("mode", N), t.on("background", R), t.on("guides", D), t.on("search", V);
    const Z = (F) => E(F), X = () => E(null), Q = () => {
      const F = d.current;
      F && (F.style.cursor = t.lassoSelect ? nn : cr(t.mode));
    };
    return t.on("group:enter", Z), t.on("group:exit", X), t.on("lassoToggle", Q), () => {
      k !== null && cancelAnimationFrame(k), P !== null && cancelAnimationFrame(P), t.off("change", L), t.off("viewport", O), t.off("selection", A), t.off("mode", N), t.off("background", R), t.off("guides", D), t.off("search", V), t.off("group:enter", Z), t.off("group:exit", X), t.off("lassoToggle", Q);
    };
  }, [t]), St(() => {
    const k = d.current;
    if (!k) return;
    const L = (P) => {
      if (!P.ctrlKey && !P.metaKey) {
        const A = P.target.closest(".sb-editor-wrap");
        if (A && A.scrollHeight > A.clientHeight) {
          const N = A.scrollTop <= 0 && P.deltaY < 0, R = A.scrollTop + A.clientHeight >= A.scrollHeight && P.deltaY > 0;
          if (!N && !R) return;
        }
      }
      P.preventDefault(), P.ctrlKey || P.metaKey ? t.zoomByWheel(P.deltaY, P.clientX, P.clientY) : t.pan(-P.deltaX, -P.deltaY);
    };
    return k.addEventListener("wheel", L, { passive: !1 }), () => k.removeEventListener("wheel", L);
  }, [t]);
  const [Eo, Rr] = et(null), [Dr, Wr] = et(null), [Zo, Gn] = et(null), [xn, jn] = et(null), Vn = ut({
    x: 0,
    y: 0,
    index: -1
  }), [be, $e] = et(null), Br = ut(be);
  St(() => {
    const k = Br.current, L = t.mode === "text" ? "text" : t.mode === "note" ? "note" : t.mode === "sticky" ? "sticky" : null;
    if (!L) {
      k && !be && t.notifyRectDragEnd(), Br.current = be;
      return;
    }
    Br.current = be, be ? t.notifyRectDragProgress({
      kind: L,
      startX: be.startX,
      startY: be.startY,
      endX: be.endX,
      endY: be.endY
    }) : k && t.notifyRectDragEnd();
  }, [be, t.mode, t]);
  const [tc, Nr] = et(null), [ec, oc] = et(null), wn = ut(null), nc = Kt(() => {
    const k = /* @__PURE__ */ new Set();
    for (const L of g) {
      if (L.type !== "edge") continue;
      const P = L;
      P.data.animated && P.data.animatedDirection === "bop" && (k.add(P.data.fromId), k.add(P.data.toId));
    }
    return k;
  }, [g]), [Qo, Lo] = et(null), Fr = ut(null), [fi, Jo] = et(null), [yi, Ro] = et(null), [kn, $o] = et(null), [_e, _o] = et(null), [rc, gi] = et(null);
  St(() => {
    const k = (L) => {
      Nc(() => _o(L));
    };
    return t.on("image:cropRequest", k), () => t.off("image:cropRequest", k);
  }, [t]);
  const mi = Qo || yi || fi || kn || _e || rc, sc = Kt(() => {
    const k = (qt == null ? void 0 : qt.domNodes) ?? g.filter((P) => {
      if (Ve && (P.id === i || !Ve.has(P.id)))
        return !1;
      if (o) {
        const O = o.get(P.type);
        return !!O && !O.isSVGOnly;
      }
      return P.type === "content" || P.type === "draw" || P.type === "shape" || P.type === "image" || P.type === "text" || P.type === "frame" || P.type === "sticky";
    });
    if (!_e || k.some((P) => P.id === _e)) return k;
    const L = g.find((P) => P.id === _e);
    return L ? [...k, L] : k;
  }, [qt, g, o, _e, Ve]), Hr = ut(null), Kn = ut(null), bi = ut(null), [Or, Xr] = et(/* @__PURE__ */ new Set()), ro = ut(/* @__PURE__ */ new Set()), [xi, vn] = et([]), [qn, Yr] = et(null), Xe = ut([]), so = ut(null), wi = ut(0), Sn = lt(
    (k = !1) => {
      if (t.mode !== "erase") return;
      const L = performance.now();
      if (!k && L - wi.current < 48) return;
      wi.current = L;
      const P = Xe.current;
      t.notifyEraserProgress({
        trail: P.length > 0 ? [...P] : void 0,
        markedIds: Array.from(ro.current)
      });
    },
    [t]
  ), [ki, Un] = et([]), Se = ut([]), tn = ut(null);
  St(() => {
    if (!Qo) return;
    const k = a(), L = (Z) => Z.querySelector(
      `[data-node-id="${Qo}"] [contenteditable="true"]`
    ), P = (Z) => !Z || !(Z instanceof HTMLElement) ? !1 : Z.isContentEditable || Z instanceof HTMLInputElement || Z instanceof HTMLTextAreaElement, O = (Z) => Z.metaKey || Z.ctrlKey || Z.altKey ? !1 : Z.key.length === 1 ? !0 : Z.key === "Backspace" || Z.key === "Delete" || Z.key === "Enter" || Z.key === "Tab" || Z.key === " ", A = (Z) => !!(Z.inputType.startsWith("insert") || Z.inputType.startsWith("delete")), N = (Z) => {
      const X = d.current;
      if (!X) return;
      const Q = Z.target;
      if (Q && X.contains(Q)) return;
      Z.preventDefault(), Z.stopPropagation(), "stopImmediatePropagation" in Z && typeof Z.stopImmediatePropagation == "function" && Z.stopImmediatePropagation();
      const F = L(X);
      F && F.focus();
    }, R = (Z) => {
      O(Z) && N(Z);
    }, D = (Z) => {
      A(Z) && N(Z);
    }, V = (Z) => {
      const X = d.current;
      if (!X) return;
      const Q = Z.target;
      if (!Q || X.contains(Q) || !P(Q)) return;
      const F = L(X);
      requestAnimationFrame(() => {
        try {
          Q.blur();
        } catch {
        }
        F && F.focus();
      });
    };
    return k.addEventListener("keydown", R, !0), k.addEventListener("beforeinput", D, !0), k.addEventListener("focusin", V, !0), () => {
      k.removeEventListener("keydown", R, !0), k.removeEventListener("beforeinput", D, !0), k.removeEventListener("focusin", V, !0);
    };
  }, [Qo]);
  const vi = lt(
    (k, L, P, O = "auto") => {
      const A = Rt(10);
      bi.current = A, t.addNode({
        id: A,
        type: "content",
        x: k,
        y: L,
        w: P,
        h: O,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), Zn = lt(
    (k, L, P) => {
      const { x: O, y: A } = t.screenToCanvas(k, L);
      if (P) {
        const X = t.hitTestAll(O, A, yt);
        if (X.length > 0) {
          const Q = Vn.current, F = Math.abs(O - Q.x) + Math.abs(A - Q.y);
          let K = 0;
          F < 5 && (K = (Q.index + 1) % X.length), Vn.current = { x: O, y: A, index: K }, t.select(X[K].id);
        } else
          t.deselectAll();
      } else {
        let X = !1;
        for (const Q of t.selection) {
          const F = t.getNode(Q);
          if (!F) continue;
          const K = F.h === "auto" ? 100 : F.h;
          if (O >= F.x && O <= F.x + F.w && A >= F.y && A <= F.y + K) {
            X = !0;
            break;
          }
        }
        if (!X && t.selection.size >= 2) {
          let Q = 1 / 0, F = 1 / 0, K = -1 / 0, ot = -1 / 0;
          for (const vt of t.selection) {
            const Tt = t.getNode(vt);
            if (!Tt || Tt.type === "edge") continue;
            const Dt = Tt.h === "auto" ? 100 : Tt.h;
            Q = Math.min(Q, Tt.x), F = Math.min(F, Tt.y), K = Math.max(K, Tt.x + Tt.w), ot = Math.max(ot, Tt.y + Dt);
          }
          Q !== 1 / 0 && O >= Q && O <= K && A >= F && A <= ot && (X = !0);
        }
        if (!X) {
          const Q = t.hitTest(O, A, yt);
          Q ? t.select(Q.id) : t.deselectAll();
        }
      }
      const N = Array.from(t.selection), R = N.length > 0, D = [];
      if (D.push({
        items: [
          {
            label: l.actionCut,
            shortcut: "Mod+X",
            disabled: !R,
            action: () => {
              t.cutSelected(), ya(t);
            }
          },
          {
            label: l.actionCopy,
            shortcut: "Mod+C",
            disabled: !R,
            action: () => {
              t.copySelected(), ya(t);
            }
          },
          {
            label: l.actionPaste,
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              Mf(t, O, A);
            }
          }
        ]
      }), D.push({
        items: [
          {
            label: l.actionDuplicate,
            shortcut: "Mod+D",
            disabled: !R,
            action: () => t.duplicateSelected()
          }
        ]
      }), N.filter((X) => {
        const Q = t.getNode(X);
        return !!Q && Q.type !== "edge" && !Q.locked;
      }).length >= 2 && (D.push({
        items: [
          {
            label: l.actionArrangeSelection,
            action: () => t.arrangeSelectedNodes(yt, y.zoom)
          }
        ]
      }), D.push({
        items: [
          {
            kind: "header",
            label: l.alignMenuHorizontal,
            action: () => {
            }
          },
          {
            label: l.alignLeft,
            icon: uo.alignHLeft,
            action: () => t.alignSelectedNodes("left", yt)
          },
          {
            label: l.alignCenterHorizontal,
            icon: uo.alignHCenter,
            action: () => t.alignSelectedNodes("centerH", yt)
          },
          {
            label: l.alignRight,
            icon: uo.alignHRight,
            action: () => t.alignSelectedNodes("right", yt)
          },
          {
            label: l.alignDistributeHorizontal,
            icon: uo.distributeH,
            action: () => t.distributeSelectedNodes(
              "horizontal",
              yt
            )
          },
          {
            kind: "header",
            label: l.alignMenuVertical,
            action: () => {
            }
          },
          {
            label: l.alignTop,
            icon: uo.alignVTop,
            action: () => t.alignSelectedNodes("top", yt)
          },
          {
            label: l.alignCenterVertical,
            icon: uo.alignVCenter,
            action: () => t.alignSelectedNodes("centerV", yt)
          },
          {
            label: l.alignBottom,
            icon: uo.alignVBottom,
            action: () => t.alignSelectedNodes("bottom", yt)
          },
          {
            label: l.alignDistributeVertical,
            icon: uo.distributeV,
            action: () => t.distributeSelectedNodes("vertical", yt)
          }
        ]
      })), R && D.push({
        items: [
          {
            label: l.actionAddToPersonalLibrary,
            action: () => {
              const X = N.map((K) => t.getNode(K)).filter((K) => !!K).map((K) => structuredClone(K)), Q = new Set(
                X.map((K) => K.groupId).filter(Boolean)
              ), F = /* @__PURE__ */ new Map();
              for (const [K, ot] of t.groupParent)
                Q.has(K) && F.set(K, ot);
              Yr({
                nodes: X,
                groupParent: F
              });
            }
          }
        ]
      }), N.length >= 2 || R && t.selectionHasGroup()) {
        const X = [];
        N.length >= 2 && X.push({
          label: l.actionGroupSelection,
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && X.push({
          label: l.actionUngroupSelection,
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), D.push({ items: X });
      }
      if (R && N.every((Q) => {
        const F = t.getNode(Q);
        return F && (F.type === "draw" || F.type === "shape");
      }) && D.push({
        items: [
          {
            label: l.actionFlipHorizontal,
            shortcut: "Shift+H",
            action: () => t.flipSelectedHorizontal()
          },
          {
            label: l.actionFlipVertical,
            shortcut: "Shift+V",
            action: () => t.flipSelectedVertical()
          }
        ]
      }), R && D.push({
        items: [
          {
            label: l.actionBringForward,
            shortcut: "Mod+]",
            action: () => t.bringForward(N)
          },
          {
            label: l.actionSendBackward,
            shortcut: "Mod+[",
            action: () => t.sendBackward(N)
          },
          {
            label: l.actionBringToFront,
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(N)
          },
          {
            label: l.actionSendToBack,
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(N)
          }
        ]
      }), R) {
        const X = N.some((K) => {
          var ot;
          return (ot = t.getNode(K)) == null ? void 0 : ot.locked;
        }), Q = N.some((K) => {
          var ot;
          return !((ot = t.getNode(K)) != null && ot.locked);
        }), F = [];
        Q && F.push({
          label: l.actionLock,
          action: () => {
            for (const K of N) t.updateNode(K, { locked: !0 });
          }
        }), X && F.push({
          label: l.actionUnlock,
          action: () => {
            for (const K of N) t.updateNode(K, { locked: void 0 });
          }
        }), D.push({ items: F });
      }
      R && D.push({
        items: [
          {
            label: l.actionDelete,
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const Z = [10, 20, 40, 80];
      return D.push({
        items: [
          {
            label: l.actionToggleGrid,
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), pt(t.snapToGrid);
            }
          },
          {
            label: l.actionSmartGuides,
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), B(t.smartGuides);
            }
          },
          ...Z.map((X) => ({
            label: `${X}px`,
            checked: t.gridSize === X,
            action: () => {
              t.setGridSize(X);
            }
          }))
        ]
      }), D.push({
        items: [
          {
            label: l.actionExportAsPng,
            action: () => da(t, { format: "png" })
          },
          {
            label: l.actionExportAsSvg,
            action: () => da(t, { format: "svg" })
          }
        ]
      }), D;
    },
    [t, l, yt, y.zoom]
  ), ic = lt(
    (k) => {
      if (k.preventDefault(), t.presentationMode) return;
      const L = Zn(k.clientX, k.clientY, k.altKey);
      Gn({ x: k.clientX, y: k.clientY, sections: L });
    },
    [t, Zn]
  ), Qn = lt(
    (k, L, P) => {
      const O = () => {
        const R = d.current, D = (R == null ? void 0 : R.ownerDocument) ?? document, V = Array.from(
          D.querySelectorAll('input, textarea, [contenteditable="true"]')
        );
        for (const Z of V)
          if (!(R != null && R.contains(Z)))
            try {
              Z.blur();
            } catch {
            }
      };
      O();
      const A = Rt(10);
      t.addNode({
        id: A,
        type: "text",
        x: k,
        y: L,
        w: P,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? xo,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(A), Hr.current = A, Kn.current = { id: A, until: performance.now() + 1500 }, Lo(A);
      const N = (R = 0) => {
        const D = d.current;
        if (!D) return;
        const V = D.querySelector(
          `[data-node-id="${A}"] [contenteditable="true"]`
        );
        if (V) {
          O(), V.focus(), Kn.current = null;
          return;
        }
        R < 12 && requestAnimationFrame(() => N(R + 1));
      };
      requestAnimationFrame(() => N(0));
    },
    [t]
  ), ac = lt(
    (k) => {
      if (t.presentationMode || t.mode !== "select") return;
      const { x: L, y: P } = t.screenToCanvas(k.clientX, k.clientY), O = t.hitTestAll(L, P, yt), A = O.find((N) => !t.isContainerType(N.type)) ?? O[0] ?? null;
      if (A != null && A.groupId) {
        const N = [];
        let R = A.groupId;
        for (; R; )
          N.push(R), R = t.groupParent.get(R);
        if (!t.activeGroupId) {
          t.enterGroup(N[N.length - 1]), t.select(A.id);
          return;
        }
        const D = N.indexOf(t.activeGroupId);
        if (D > 0) {
          t.enterGroup(N[D - 1]), t.select(A.id);
          return;
        }
      }
      if (A && A.type === "text") {
        t.select(A.id), Fr.current = { clientX: k.clientX, clientY: k.clientY }, Lo(A.id);
        return;
      }
      if (A && A.type === "sticky") {
        t.select(A.id), Ro(A.id);
        return;
      }
      if (A && A.type === "frame") {
        t.select(A.id), Jo(A.id);
        return;
      }
      if (A && A.type === "shape") {
        const N = A.data, R = N.shape === "line" || N.shape === "arrow";
        t.select(A.id), R || $o(A.id);
        return;
      }
      if (A && A.type === "draw") {
        t.select(A.id);
        return;
      }
      if (!A || A.type === "draw") {
        const R = t.getAllNodes().filter((D) => D.type === "shape").sort((D, V) => V.z - D.z).find((D) => !(D.data.shape === "line" || D.data.shape === "arrow") && Sr(D, L, P, t.viewport.zoom, !0));
        if (R) {
          t.select(R.id), $o(R.id);
          return;
        }
      }
      A || (t.deselectAll(), Qn(L, P, 300));
    },
    [t, yt, Qn]
  ), lc = lt(
    (k) => {
      if (tt.current.set(k.pointerId, { x: k.clientX, y: k.clientY }), k.pointerType === "pen" && (_.current = !0), k.button !== 2 && ft(!0), k.pointerType === "touch" && (tt.current.size >= 2 || _.current)) {
        dt.current = !0, ht.current && (clearTimeout(ht.current), ht.current = null, gt.current = null);
        const A = new Map(tt.current), N = [...tt.current.keys()].find((X) => X !== k.pointerId);
        N !== void 0 && a().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: N,
            bubbles: !0,
            clientX: k.clientX,
            clientY: k.clientY
          })
        );
        const R = [...A.values()];
        let D = ga(R[0], R[1] ?? R[0]);
        const V = (X) => {
          if (!A.has(X.pointerId)) return;
          A.set(X.pointerId, { x: X.clientX, y: X.clientY });
          const Q = [...A.values()];
          if (Q.length < 2) return;
          const F = ga(Q[0], Q[1]);
          if (t.pan(F.mx - D.mx, F.my - D.my), D.dist > 1) {
            const K = Math.min(Math.max(F.dist / D.dist, 0.9), 1.1);
            t.zoomByFactor(K, F.mx, F.my);
          }
          D = F;
        }, Z = (X) => {
          tt.current.delete(X.pointerId), A.delete(X.pointerId), X.pointerType === "pen" && (_.current = !1), A.size < 2 && !_.current && (dt.current = !1, a().removeEventListener("pointermove", V), a().removeEventListener("pointerup", Z), a().removeEventListener("pointercancel", Z));
        };
        a().addEventListener("pointermove", V), a().addEventListener("pointerup", Z), a().addEventListener("pointercancel", Z);
        return;
      }
      if (dt.current || t.presentationMode && !(k.button === 1 || k.button === 0 && it.current))
        return;
      if (Zo && Gn(null), k.pointerType === "touch") {
        const A = k.clientX, N = k.clientY, R = k.pointerId;
        gt.current = { clientX: A, clientY: N }, ht.current = setTimeout(() => {
          if (ht.current = null, !gt.current || dt.current) return;
          const D = Zn(A, N, !1);
          Gn({ x: A, y: N, sections: D }), a().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: R,
              bubbles: !0,
              clientX: A,
              clientY: N
            })
          ), gt.current = null;
        }, 500);
      }
      if (k.button === 1 || k.button === 0 && it.current) {
        k.preventDefault(), U.current = !0;
        const A = t.viewport.x, N = t.viewport.y, R = k.clientX, D = k.clientY, V = d.current;
        V && (V.style.cursor = "grabbing");
        const Z = (Q) => {
          t.viewport.x = A + (Q.clientX - R), t.viewport.y = N + (Q.clientY - D), p({ ...t.viewport });
        }, X = () => {
          U.current = !1, V && (V.style.cursor = it.current ? "grab" : t.lassoSelect ? nn : ""), a().removeEventListener("pointermove", Z), a().removeEventListener("pointerup", X);
        };
        a().addEventListener("pointermove", Z), a().addEventListener("pointerup", X);
        return;
      }
      const { x: P, y: O } = t.screenToCanvas(k.clientX, k.clientY);
      if (k.pointerType === "touch" && ht.current && t.hitTest(P, O, yt) && (clearTimeout(ht.current), ht.current = null, gt.current = null), t.mode === "select") {
        if (k.button !== 0) return;
        if (k.altKey) {
          const R = t.hitTestAll(P, O, yt);
          if (R.length > 0) {
            const D = Vn.current, V = Math.abs(P - D.x) + Math.abs(O - D.y);
            let Z = 0;
            V < 5 && (Z = (D.index + 1) % R.length), Vn.current = { x: P, y: O, index: Z }, t.select(R[Z].id);
          }
          return;
        }
        let A = !1;
        !t.lassoSelect && t.selection.size >= 2 && ce && P >= ce.x && P <= ce.x + ce.w && O >= ce.y && O <= ce.y + ce.h && (A = !0);
        let N = null;
        if (!t.lassoSelect) {
          const R = t.hitTestAll(P, O, yt);
          if (N = R.find((D) => t.selection.has(D.id) && !t.isContainerType(D.type)) ?? R.find((D) => !t.isContainerType(D.type)) ?? R[0] ?? null, !A) {
            const D = Li(
              t.nodes,
              P,
              O,
              t.viewport.zoom,
              yt,
              Je
            );
            D && (N ? N.type !== "draw" && N.type !== "shape" && !t.isContainerType(N.type) && D.distance < od(N, P, O, yt) && (N = D.node) : N = D.node);
          }
        }
        if (N || A) {
          N && (t.activeGroupId && !t.isNodeInActiveGroup(N.id) && t.exitAllGroups(), k.shiftKey ? t.toggleSelect(N.id) : t.selection.has(N.id) || t.select(N.id));
          const R = Array.from(t.selection).filter(
            (Nt) => {
              var Wt;
              return !((Wt = t.getNode(Nt)) != null && Wt.locked);
            }
          );
          if (R.length === 0) return;
          const D = k.clientX, V = k.clientY, Z = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set();
          for (const Nt of R) {
            const Wt = t.getNode(Nt);
            if (Wt && t.isContainerType(Wt.type)) {
              X.add(Nt);
              for (const Ht of t.getFrameDescendantIds(Nt))
                t.selection.has(Ht) || Z.add(Ht);
            }
          }
          const Q = [...R, ...Z], F = Q.map((Nt) => {
            const Wt = t.getNode(Nt);
            return { id: Nt, x: Wt.x, y: Wt.y };
          }), K = t.selectionGroupId(), ot = K ? t.groupRotations.get(K) : null, vt = ot == null ? void 0 : ot.cx, Tt = ot == null ? void 0 : ot.cy;
          jn(null);
          let Dt = !1, It = null, Lt = D, ne = V, Qt = !1;
          const Ct = new Set(Q), At = t.createDragSnapContext(Ct), bt = () => {
            It = null;
            const Nt = (Lt - D) / t.viewport.zoom, Wt = (ne - V) / t.viewport.zoom, { finalDx: Ht, finalDy: ue } = t.computeDragSnap(
              F,
              Ct,
              Nt,
              Wt,
              Qt,
              At
            ), Yt = F.map((pe) => ({
              id: pe.id,
              patch: { x: pe.x + Ht, y: pe.y + ue }
            }));
            t.updateMany(Yt), ot && K && t.groupRotations.set(K, {
              angle: ot.angle,
              cx: vt + Ht,
              cy: Tt + ue
            });
          }, Pt = (Nt) => {
            const Wt = (Nt.clientX - D) / t.viewport.zoom, Ht = (Nt.clientY - V) / t.viewport.zoom;
            if (!Dt)
              if (Math.abs(Wt) > 2 || Math.abs(Ht) > 2)
                Dt = !0, t.pushHistorySnapshot(), M(!0);
              else
                return;
            Lt = Nt.clientX, ne = Nt.clientY, Qt = Nt.metaKey || Nt.ctrlKey, It === null && (It = requestAnimationFrame(bt));
          }, Vt = () => {
            if (It !== null && (cancelAnimationFrame(It), bt()), M(!1), t.clearAlignGuides(), a().removeEventListener("pointermove", Pt), a().removeEventListener("pointerup", Vt), Dt) {
              const Nt = R.filter(
                (Wt) => !Z.has(Wt)
              );
              Nt.length > 0 && t.updateFrameMembership(Nt);
            }
          };
          a().addEventListener("pointermove", Pt), a().addEventListener("pointerup", Vt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          k.shiftKey || t.deselectAll();
          const R = new Set(t.selection);
          if (t.lassoSelect) {
            const D = [[P, O]];
            Wr([...D]);
            let V = null, Z = 0;
            const X = (K = !1) => {
              V = null;
              const ot = K || Z % 2 === 0;
              if (Z++, ot && D.length >= 3) {
                const Tt = ve(D, t.getAllNodes()).map((It) => It.id), Dt = k.shiftKey ? [.../* @__PURE__ */ new Set([...R, ...Tt])] : Tt;
                (Dt.length !== t.selection.size || Dt.some((It) => !t.selection.has(It))) && t.selectMultiple(Dt);
              }
              Wr([...D]);
            }, Q = (K) => {
              const { x: ot, y: vt } = t.screenToCanvas(K.clientX, K.clientY);
              D.push([ot, vt]), V === null && (V = requestAnimationFrame(() => X(!1)));
            }, F = () => {
              V !== null && cancelAnimationFrame(V), X(!0), a().removeEventListener("pointermove", Q), a().removeEventListener("pointerup", F), Wr(null), t.toggleLassoSelect();
            };
            a().addEventListener("pointermove", Q), a().addEventListener("pointerup", F);
          } else {
            const D = { startX: P, startY: O, endX: P, endY: O };
            Rr(D);
            let V = null, Z = 0;
            const X = (K = !1, ot = !1) => {
              V = null;
              const vt = Math.min(D.startX, D.endX), Tt = Math.min(D.startY, D.endY), Dt = Math.abs(D.endX - D.startX), It = Math.abs(D.endY - D.startY), Lt = ot || K || Z % 2 === 0;
              if (Z++, Lt) {
                const Qt = ae(
                  { x: vt, y: Tt, w: Dt, h: It },
                  t.getAllNodes()
                ).map((At) => At.id), Ct = k.shiftKey ? [.../* @__PURE__ */ new Set([...R, ...Qt])] : Qt;
                (Ct.length !== t.selection.size || Ct.some((At) => !t.selection.has(At))) && t.selectMultiple(Ct);
              }
              Rr({ ...D });
            }, Q = (K) => {
              const { x: ot, y: vt } = t.screenToCanvas(K.clientX, K.clientY);
              D.endX = ot, D.endY = vt, V === null && (V = requestAnimationFrame(() => X(!1)));
            }, F = () => {
              V !== null && cancelAnimationFrame(V), X(!0), a().removeEventListener("pointermove", Q), a().removeEventListener("pointerup", F), Rr(null);
            };
            a().addEventListener("pointermove", Q), a().addEventListener("pointerup", F);
          }
        }
      } else if (t.mode === "text") {
        t.deselectAll();
        const A = P, N = O, R = {
          startX: P,
          startY: O,
          endX: P,
          endY: O
        };
        let D = !1;
        $e(R);
        const V = (X) => {
          const { x: Q, y: F } = t.screenToCanvas(X.clientX, X.clientY);
          R.endX = Q, R.endY = F;
          const K = Math.abs(R.endX - R.startX), ot = Math.abs(R.endY - R.startY);
          (K > 10 || ot > 10) && (D = !0), $e({ ...R });
        }, Z = () => {
          a().removeEventListener("pointermove", V), a().removeEventListener("pointerup", Z), $e(null);
          const X = D ? Math.max(Math.abs(R.endX - R.startX), 60) : 300, Q = D ? Math.min(R.startX, R.endX) : A, F = D ? Math.min(R.startY, R.endY) : N;
          Qn(Q, F, X);
        };
        a().addEventListener("pointermove", V), a().addEventListener("pointerup", Z);
      } else if (t.mode === "note") {
        t.deselectAll();
        const A = P, N = O, R = {
          startX: P,
          startY: O,
          endX: P,
          endY: O
        };
        let D = !1;
        $e(R);
        const V = (X) => {
          const { x: Q, y: F } = t.screenToCanvas(X.clientX, X.clientY);
          R.endX = Q, R.endY = F;
          const K = Math.abs(R.endX - R.startX), ot = Math.abs(R.endY - R.startY);
          (K > 10 || ot > 10) && (D = !0), $e({ ...R });
        }, Z = () => {
          a().removeEventListener("pointermove", V), a().removeEventListener("pointerup", Z), $e(null);
          const X = D ? Math.max(Math.abs(R.endX - R.startX), 100) : 300, Q = D ? Math.max(Math.abs(R.endY - R.startY), 40) : "auto", F = D ? Math.min(R.startX, R.endX) : A, K = D ? Math.min(R.startY, R.endY) : N;
          vi(F, K, X, Q), t.setMode("select");
        };
        a().addEventListener("pointermove", V), a().addEventListener("pointerup", Z);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const A = P, N = O, R = {
          startX: P,
          startY: O,
          endX: P,
          endY: O
        };
        let D = !1;
        $e(R);
        const V = (X) => {
          const { x: Q, y: F } = t.screenToCanvas(X.clientX, X.clientY);
          R.endX = Q, R.endY = F, Math.abs(R.endX - R.startX) > 10 && (D = !0), $e({ ...R });
        }, Z = () => {
          a().removeEventListener("pointermove", V), a().removeEventListener("pointerup", Z), $e(null);
          const X = D ? Math.max(Math.abs(R.endX - R.startX), 100) : 200, Q = D ? Math.min(R.startX, R.endX) : A, F = D ? Math.min(R.startY, R.endY) : N, K = Rt(10), ot = D ? Math.max(Math.abs(R.endY - R.startY), 100) : 150;
          t.addNode({
            id: K,
            type: "sticky",
            x: Q,
            y: F,
            w: X,
            h: ot,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(K), Ro(K), t.setMode("select");
        };
        a().addEventListener("pointermove", V), a().addEventListener("pointerup", Z);
      } else if (t.mode === "draw") {
        const A = k.pressure || 0.5, N = {
          points: [[P, O, A]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle,
          opacity: t.activeTool.opacity
        };
        zt(N), t.notifyDrawProgress(N);
        const R = (V) => {
          const { x: Z, y: X } = t.screenToCanvas(V.clientX, V.clientY), Q = V.pressure || 0.5;
          N.points.push([Z, X, Q]), zt({ ...N, points: [...N.points] }), t.notifyDrawProgress({ ...N, points: [...N.points] });
        }, D = () => {
          if (a().removeEventListener("pointermove", R), a().removeEventListener("pointerup", D), N.points.length < 2) {
            t.notifyDrawEnd(), zt(null);
            return;
          }
          let V = 1 / 0, Z = 1 / 0, X = -1 / 0, Q = -1 / 0;
          for (const [K, ot] of N.points)
            K < V && (V = K), ot < Z && (Z = ot), K > X && (X = K), ot > Q && (Q = ot);
          const F = N.points.map(
            ([K, ot, vt]) => [K - V, ot - Z, vt]
          );
          t.addNode({
            id: Rt(10),
            type: "draw",
            x: V,
            y: Z,
            w: X - V,
            h: Q - Z,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: F,
              color: N.color,
              strokeWidth: N.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => {
            zt(null), requestAnimationFrame(() => {
              t.notifyDrawEnd();
            });
          });
        };
        a().addEventListener("pointermove", R), a().addEventListener("pointerup", D);
      } else if (t.mode === "shape") {
        const A = {
          startX: P,
          startY: O,
          endX: P,
          endY: O
        };
        Et(A);
        const N = (D) => {
          const { x: V, y: Z } = t.screenToCanvas(D.clientX, D.clientY);
          A.endX = V, A.endY = Z, Et({ ...A }), t.notifyShapeProgress({
            ...A,
            shapeType: t.activeTool.shapeType || "rect",
            stroke: t.activeTool.color,
            strokeWidth: t.activeTool.width,
            roughness: t.activeTool.roughness ?? 1,
            fill: t.activeTool.fillColor,
            fillStyle: t.activeTool.fillStyle,
            strokeStyle: t.activeTool.strokeStyle,
            opacity: t.activeTool.opacity ?? 1
          });
        }, R = () => {
          a().removeEventListener("pointermove", N), a().removeEventListener("pointerup", R);
          const D = t.activeTool.shapeType || "rect", V = D === "line" || D === "arrow", Z = Math.min(A.startX, A.endX);
          let X = Math.min(A.startY, A.endY);
          const Q = Math.abs(A.endX - A.startX), F = Math.abs(A.endY - A.startY);
          let K;
          if (V) {
            const Tt = t.activeTool.width * 2;
            K = Math.max(F, Tt), F < Tt && (X -= (Tt - F) / 2);
          } else
            K = F;
          if (Q < 5 && (V ? Q < 5 && Math.abs(A.endY - A.startY) < 5 : K < 5)) {
            t.notifyShapeEnd(), Et(null);
            return;
          }
          const ot = {};
          V && (ot.startPoint = [
            A.startX - Z,
            A.startY - X
          ], ot.endPoint = [
            A.endX - Z,
            A.endY - X
          ]);
          const vt = Rt(10);
          t.addNode({
            id: vt,
            type: "shape",
            x: Z,
            y: X,
            w: Q,
            h: K,
            z: t.nextZ(),
            data: {
              shape: D,
              stroke: t.activeTool.color,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle,
              strokeWidth: t.activeTool.width,
              strokeStyle: t.activeTool.strokeStyle,
              roughness: t.activeTool.roughness ?? 1,
              opacity: t.activeTool.opacity ?? 1,
              ...ot
            }
          }), requestAnimationFrame(() => {
            Et(null), requestAnimationFrame(() => {
              t.notifyShapeEnd();
            });
          });
        };
        a().addEventListener("pointermove", N), a().addEventListener("pointerup", R);
      } else if (t.mode === "edge") {
        const A = t.hitTest(P, O, yt);
        if (!A || A.type === "edge") return;
        const N = t.freeFormEdges, R = N ? We(A, P, O, yt).t : void 0;
        Bt({
          fromNode: A,
          cursorX: P,
          cursorY: O,
          sourceT: R,
          edgeColor: t.activeTool.color,
          edgeStrokeWidth: t.activeTool.width || 2,
          edgeStyle: t.activeTool.strokeStyle || "solid",
          edgeType: t.activeTool.edgeType,
          attachmentGap: t.activeTool.attachmentGap
        });
        const D = (Z) => {
          const { x: X, y: Q } = t.screenToCanvas(Z.clientX, Z.clientY);
          Bt(
            (F) => F ? { ...F, cursorX: X, cursorY: Q } : null
          );
        }, V = (Z) => {
          a().removeEventListener("pointermove", D), a().removeEventListener("pointerup", V), Bt(null);
          const { x: X, y: Q } = t.screenToCanvas(Z.clientX, Z.clientY);
          let F = t.hitTest(X, Q, yt);
          if (!F || F.type === "edge" || t.isContainerType(F.type)) {
            const It = 50 / t.viewport.zoom;
            let Lt = 1 / 0, ne = !1, Qt = null;
            for (const Ct of t.getAllNodes()) {
              if (Ct.type === "edge" || Ct.id === A.id) continue;
              const At = t.isContainerType(Ct.type), bt = We(Ct, X, Q, yt), Pt = Math.hypot(bt.x - X, bt.y - Q);
              if (Pt < It) {
                if (At && !ne && Qt) continue;
                (!At && ne || Pt < Lt) && (Lt = Pt, ne = At, Qt = Ct);
              }
            }
            Qt && (F = Qt);
          }
          if (!F || F.type === "edge" || F.id === A.id)
            return;
          const K = N ? void 0 : tr(A, P, O, yt), ot = N ? void 0 : tr(F, X, Q, yt), vt = N ? We(F, X, Q, yt).t : void 0;
          if (t.getAllNodes().some((It) => {
            if (It.type !== "edge") return !1;
            const Lt = It.data;
            return N ? Lt.fromId === A.id && Lt.toId === F.id && Lt.sourceT !== void 0 && Lt.targetT !== void 0 && Math.abs(Lt.sourceT - R) < 0.02 && Math.abs(Lt.targetT - vt) < 0.02 : ls(Lt, {
              fromId: A.id,
              toId: F.id,
              sourceHandle: K,
              targetHandle: ot
            });
          })) return;
          const Dt = {
            id: Rt(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: A.id,
              toId: F.id,
              style: t.activeTool.strokeStyle || "solid",
              color: t.activeTool.color,
              strokeWidth: t.activeTool.width || 2,
              arrowHead: t.activeTool.arrowHead ?? "arrow",
              arrowTail: t.activeTool.arrowTail ?? "none",
              edgeType: t.activeTool.edgeType ?? "bezier",
              roughness: t.activeTool.roughness ?? 0,
              attachmentGap: t.activeTool.attachmentGap,
              sourceHandle: K,
              targetHandle: ot,
              sourceT: R,
              targetT: vt
            }
          };
          t.addNode(Dt);
        };
        a().addEventListener("pointermove", D), a().addEventListener("pointerup", V);
      } else if (t.mode === "frame") {
        const A = {
          startX: P,
          startY: O,
          endX: P,
          endY: O
        };
        Et(A);
        const N = (D) => {
          const { x: V, y: Z } = t.screenToCanvas(D.clientX, D.clientY);
          A.endX = V, A.endY = Z, Et({ ...A });
        }, R = () => {
          a().removeEventListener("pointermove", N), a().removeEventListener("pointerup", R);
          const D = Math.min(A.startX, A.endX), V = Math.min(A.startY, A.endY), Z = Math.abs(A.endX - A.startX), X = Math.abs(A.endY - A.startY);
          if (Z < 20 || X < 20) {
            Et(null);
            return;
          }
          const Q = Rt(10);
          t.addNode({
            id: Q,
            type: "frame",
            x: D,
            y: V,
            w: Z,
            h: X,
            z: t.nextZ(),
            data: {
              label: l.typeFrame,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(Q), Et(null), t.select(Q), t.setMode("select");
        };
        a().addEventListener("pointermove", N), a().addEventListener("pointerup", R);
      } else if (t.mode === "erase") {
        if (k.button !== 0) return;
        const A = (vt, Tt) => {
          const Dt = t.hitTestAll(vt, Tt, yt), It = Bd(
            t.nodes,
            vt,
            Tt,
            t.viewport.zoom,
            yt,
            Je
          );
          let Lt = !1;
          for (const ne of [...Dt, ...It])
            ro.current.has(ne.id) || (ro.current.add(ne.id), Lt = !0);
          Lt && Xr(new Set(ro.current));
        }, N = 400;
        ro.current = /* @__PURE__ */ new Set();
        const R = Date.now();
        Xe.current = [[P, O, R]], vn([[P, O, R]]), A(P, O), Sn(!0);
        let D = P, V = O;
        const Z = () => {
          const vt = Date.now(), Tt = Xe.current.length;
          Xe.current = Xe.current.filter(
            (Dt) => vt - Dt[2] < N
          ), Xe.current.length !== Tt && vn([...Xe.current]), Sn(), so.current = requestAnimationFrame(Z);
        };
        so.current = requestAnimationFrame(Z);
        const X = (vt) => {
          const { x: Tt, y: Dt } = t.screenToCanvas(vt.clientX, vt.clientY);
          D = Tt, V = Dt;
          const It = Date.now();
          Xe.current.push([D, V, It]), vn([...Xe.current]), A(D, V), Sn(!0);
        }, Q = () => {
          so.current !== null && (cancelAnimationFrame(so.current), so.current = null), t.notifyEraserEnd(), ro.current = /* @__PURE__ */ new Set(), Xr(/* @__PURE__ */ new Set()), Xe.current = [], vn([]);
        }, F = () => {
          ot();
          const vt = Array.from(ro.current);
          Sn(!0), Q(), vt.length > 0 && t.deleteNodes(vt);
        }, K = (vt) => {
          vt.key === "Escape" && (ot(), Sn(!0), Q());
        }, ot = () => {
          a().removeEventListener("pointermove", X), a().removeEventListener("pointerup", F), a().removeEventListener("keydown", K);
        };
        a().addEventListener("pointermove", X), a().addEventListener("pointerup", F), a().addEventListener("keydown", K);
      } else if (t.mode === "laser") {
        if (k.button !== 0) return;
        const A = 1560;
        tn.current !== null && (cancelAnimationFrame(tn.current), tn.current = null);
        const N = performance.now();
        Se.current.length > 0 && Se.current.push([NaN, NaN, N]), Se.current.push([P, O, N]), Un([...Se.current]), t.notifyLaserProgress([[P, O]]);
        let R = N;
        const D = () => {
          const X = performance.now(), Q = Se.current.length;
          Se.current = Se.current.filter(
            (F) => X - F[2] < A
          ), (Se.current.length !== Q || Se.current.length > 0) && Un([...Se.current]), X - R >= 60 && (R = X, Se.current.length > 0 && t.notifyLaserProgress(
            Se.current.map((F) => [F[0], F[1]])
          )), Se.current.length > 0 ? tn.current = requestAnimationFrame(D) : (tn.current = null, Un([]), t.notifyLaserEnd());
        };
        tn.current = requestAnimationFrame(D);
        const V = (X) => {
          const { x: Q, y: F } = t.screenToCanvas(X.clientX, X.clientY), K = performance.now();
          Se.current.push([Q, F, K]), Un([...Se.current]), t.notifyLaserProgress(
            Se.current.map((ot) => [ot[0], ot[1]])
          );
        }, Z = () => {
          a().removeEventListener("pointermove", V), a().removeEventListener("pointerup", Z);
        };
        a().addEventListener("pointermove", V), a().addEventListener("pointerup", Z);
      } else if (t.mode === "hand") {
        if (k.button !== 0) return;
        k.preventDefault();
        const A = t.viewport.x, N = t.viewport.y, R = k.clientX, D = k.clientY, V = d.current;
        V && (V.style.cursor = "grabbing");
        const Z = (Q) => {
          t.viewport.x = A + (Q.clientX - R), t.viewport.y = N + (Q.clientY - D), p({ ...t.viewport });
        }, X = () => {
          V && (V.style.cursor = t.lassoSelect ? nn : cr(t.mode)), a().removeEventListener("pointermove", Z), a().removeEventListener("pointerup", X);
        };
        a().addEventListener("pointermove", Z), a().addEventListener("pointerup", X);
      }
    },
    [
      t,
      vi,
      Qn,
      Zo,
      Zn,
      ce,
      yt,
      I,
      ae,
      ft
    ]
  ), Gr = lt(
    (k, L, P) => {
      if (P.preventDefault(), t.presentationMode) return;
      const O = t.getNode(k);
      if (!O || O.locked) return;
      const A = P.clientX, N = P.clientY, R = O.x, D = O.y, V = O.w, Z = O.h === "auto", X = Z ? yt[k] ?? 100 : O.h, Q = O.type === "draw" ? O.data.points.map(
        (It) => [...It]
      ) : null, F = O.type === "shape" ? O.data.startPoint : void 0, K = O.type === "shape" ? O.data.endPoint : void 0, ot = O.type === "text" ? O.data.fontSize : 0;
      let vt = !1;
      const Tt = (It) => {
        const Lt = (It.clientX - A) / t.viewport.zoom, ne = (It.clientY - N) / t.viewport.zoom;
        vt || (vt = !0, t.pushHistorySnapshot());
        let Qt = R, Ct = D, At = V, bt = X;
        if ((L === "nw" || L === "w" || L === "sw") && (Qt = R + Lt, At = V - Lt), (L === "ne" || L === "e" || L === "se") && (At = V + Lt), (L === "nw" || L === "n" || L === "ne") && (Ct = D + ne, bt = X - ne), (L === "sw" || L === "s" || L === "se") && (bt = X + ne), t.snapToGrid && !(It.metaKey || It.ctrlKey)) {
          const Wt = t.gridSize, Ht = (ue) => Math.round(ue / Wt) * Wt;
          (L === "nw" || L === "w" || L === "sw") && (Qt = Ht(Qt), At = R + V - Qt), (L === "ne" || L === "e" || L === "se") && (At = Ht(Qt + At) - Qt), (L === "nw" || L === "n" || L === "ne") && (Ct = Ht(Ct), bt = D + X - Ct), (L === "sw" || L === "s" || L === "se") && (bt = Ht(Ct + bt) - Ct);
        }
        let Pt = 10, Vt = 10;
        if (O.type === "legacy-voicenote" ? (Pt = 260, Vt = 120) : O.type === "legacy-canvas-link" && (Pt = 220, Vt = 86), At < Pt && (At = Pt, (L === "nw" || L === "w" || L === "sw") && (Qt = R + V - Pt)), bt < Vt && (bt = Vt, (L === "nw" || L === "n" || L === "ne") && (Ct = D + X - Vt)), It.shiftKey && !(O.type === "frame" && O.data.devicePreset)) {
          const Wt = Ts(
            L,
            R,
            D,
            V,
            X,
            Qt,
            Ct,
            At,
            bt
          );
          Qt = Wt.x, Ct = Wt.y, At = Wt.w, bt = Wt.h;
        }
        if (O.type === "frame") {
          const Wt = O.data.devicePreset;
          if (Wt) {
            const Ht = Hs(Wt);
            if (Ht) {
              const ue = ql(Ht);
              if (L === "nw" || L === "ne" || L === "sw" || L === "se" || (L === "e" || L === "w")) {
                const he = Math.round(At / ue);
                (L === "nw" || L === "ne") && (Ct = D + X - he), bt = he;
              } else
                At = Math.round(bt * ue);
            }
          }
        }
        const Nt = {
          x: Qt,
          y: Ct,
          w: At,
          h: Z ? "auto" : bt
        };
        if (Q && O.type === "draw") {
          const Wt = V > 0 ? At / V : 1, Ht = X > 0 ? bt / X : 1, ue = Q.map(
            ([Yt, pe, he]) => [Yt * Wt, pe * Ht, he]
          );
          Nt.data = { ...O.data, points: ue };
        }
        if (O.type === "shape" && (F || K)) {
          const Wt = V > 0 ? At / V : 1, Ht = X > 0 ? bt / X : 1, ue = { ...O.data };
          F && (ue.startPoint = [
            F[0] * Wt,
            F[1] * Ht
          ]), K && (ue.endPoint = [
            K[0] * Wt,
            K[1] * Ht
          ]), Nt.data = ue;
        }
        if (O.type === "text" && ot > 0 && L !== "e" && L !== "w") {
          const Wt = L === "n" || L === "s" ? X > 0 ? bt / X : 1 : V > 0 ? At / V : 1, Ht = Math.max(8, Math.round(ot * Wt));
          Nt.data = { ...O.data, fontSize: Ht };
        }
        t.updateNode(k, Nt);
      }, Dt = () => {
        a().removeEventListener("pointermove", Tt), a().removeEventListener("pointerup", Dt), t.isContainerType(O.type) && t.syncFrameChildrenAfterResize(k);
      };
      a().addEventListener("pointermove", Tt), a().addEventListener("pointerup", Dt);
    },
    [t, yt]
  ), cc = lt(
    (k, L) => {
      L.stopPropagation(), L.preventDefault();
      const P = t.getNode(k);
      if (!P || P.locked) return;
      const O = P.h === "auto" ? yt[k] ?? 100 : P.h, A = P.x + P.w / 2, N = P.y + O / 2, R = P.rotation || 0, { x: D, y: V } = t.screenToCanvas(
        L.clientX,
        L.clientY
      ), Z = Math.atan2(V - N, D - A);
      let X = !1;
      const Q = (K) => {
        X || (X = !0, t.pushHistorySnapshot());
        const { x: ot, y: vt } = t.screenToCanvas(K.clientX, K.clientY), Tt = Math.atan2(vt - N, ot - A);
        let Dt = R + (Tt - Z) * (180 / Math.PI);
        (K.shiftKey || t.snapToGrid) && !(K.metaKey || K.ctrlKey) && (Dt = Math.round(Dt / 15) * 15), t.updateNode(k, { rotation: Dt });
      }, F = () => {
        a().removeEventListener("pointermove", Q), a().removeEventListener("pointerup", F);
      };
      a().addEventListener("pointermove", Q), a().addEventListener("pointerup", F);
    },
    [t, yt]
  ), Si = lt(
    (k, L, P) => {
      P.stopPropagation(), P.preventDefault();
      const O = t.getNode(k);
      if (!O) return;
      const { x: A, y: N } = t.screenToCanvas(P.clientX, P.clientY), R = t.freeFormEdges, D = R ? We(O, A, N, yt).t : void 0;
      Bt({
        fromNode: O,
        cursorX: A,
        cursorY: N,
        sourceHandle: R ? void 0 : L,
        sourceT: D,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid",
        edgeType: t.activeTool.edgeType,
        attachmentGap: t.activeTool.attachmentGap
      });
      const V = (X) => {
        const { x: Q, y: F } = t.screenToCanvas(X.clientX, X.clientY);
        Bt(
          (K) => K ? { ...K, cursorX: Q, cursorY: F } : null
        );
      }, Z = (X) => {
        a().removeEventListener("pointermove", V), a().removeEventListener("pointerup", Z), Bt(null);
        const { x: Q, y: F } = t.screenToCanvas(X.clientX, X.clientY);
        let K = t.hitTest(Q, F, yt);
        if (!K || K.type === "edge" || t.isContainerType(K.type)) {
          const It = 50 / t.viewport.zoom;
          let Lt = 1 / 0, ne = !1, Qt = null;
          for (const Ct of t.getAllNodes()) {
            if (Ct.type === "edge" || Ct.id === O.id) continue;
            const At = t.isContainerType(Ct.type), bt = We(Ct, Q, F, yt), Pt = Math.hypot(bt.x - Q, bt.y - F);
            Pt >= It || At && !ne && Qt || (!At && ne || Pt < Lt) && (Lt = Pt, ne = At, Qt = Ct);
          }
          Qt && (K = Qt);
        }
        if (!K || K.type === "edge" || K.id === O.id)
          return;
        const ot = R ? void 0 : tr(K, Q, F, yt), vt = R ? We(K, Q, F, yt).t : void 0;
        if (t.getAllNodes().some((It) => {
          if (It.type !== "edge") return !1;
          const Lt = It.data;
          return R ? Lt.fromId === O.id && Lt.toId === K.id && Lt.sourceT !== void 0 && Lt.targetT !== void 0 && Math.abs(Lt.sourceT - D) < 0.02 && Math.abs(Lt.targetT - vt) < 0.02 : ls(Lt, {
            fromId: O.id,
            toId: K.id,
            sourceHandle: L,
            targetHandle: ot
          });
        })) return;
        const Dt = {
          id: Rt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: O.id,
            toId: K.id,
            style: t.activeTool.strokeStyle || "solid",
            color: t.activeTool.color,
            strokeWidth: t.activeTool.width || 2,
            arrowHead: t.activeTool.arrowHead ?? "arrow",
            arrowTail: t.activeTool.arrowTail ?? "none",
            edgeType: t.activeTool.edgeType ?? "bezier",
            roughness: t.activeTool.roughness ?? 0,
            attachmentGap: t.activeTool.attachmentGap,
            sourceHandle: R ? void 0 : L,
            targetHandle: ot,
            sourceT: D,
            targetT: vt
          }
        };
        t.addNode(Dt);
      };
      a().addEventListener("pointermove", V), a().addEventListener("pointerup", Z);
    },
    [t, yt]
  ), dc = lt(
    (k) => {
      let L = null, P = k === "top" || k === "left" ? 1 / 0 : -1 / 0;
      for (const O of t.selection) {
        const A = t.getNode(O);
        if (!A || A.type === "edge") continue;
        const N = A.h === "auto" ? yt[A.id] ?? 100 : A.h;
        let R;
        switch (k) {
          case "top":
            R = A.y;
            break;
          case "bottom":
            R = A.y + N;
            break;
          case "left":
            R = A.x;
            break;
          case "right":
            R = A.x + A.w;
            break;
        }
        (k === "top" || k === "left" ? R < P : R > P) && (P = R, L = O);
      }
      return L;
    },
    [t, yt]
  ), hc = lt(
    (k, L, P, O) => {
      var F;
      O.stopPropagation(), O.preventDefault();
      const A = t.getNode(k);
      if (!A || !o) return;
      const N = o.get(A.type), R = (F = N == null ? void 0 : N.ports) == null ? void 0 : F.find((K) => K.id === L);
      if (!R) return;
      const D = P === "input" ? "left" : "right", { x: V, y: Z } = t.screenToCanvas(O.clientX, O.clientY);
      Bt({
        fromNode: A,
        cursorX: V,
        cursorY: Z,
        sourceHandle: D,
        sourcePort: L,
        sourceDirection: P,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid",
        edgeType: t.activeTool.edgeType,
        attachmentGap: t.activeTool.attachmentGap
      });
      const X = (K) => {
        const { x: ot, y: vt } = t.screenToCanvas(K.clientX, K.clientY);
        Bt(
          (Tt) => Tt ? { ...Tt, cursorX: ot, cursorY: vt } : null
        );
      }, Q = (K) => {
        var pe;
        a().removeEventListener("pointermove", X), a().removeEventListener("pointerup", Q), Bt(null);
        const { x: ot, y: vt } = t.screenToCanvas(K.clientX, K.clientY), Tt = P === "output" ? "input" : "output", Dt = Ks / t.viewport.zoom;
        let It = null, Lt = null, ne = 1 / 0;
        for (const he of t.getAllNodes()) {
          if (he.type === "edge" || he.id === A.id) continue;
          const ye = o.get(he.type);
          if ((pe = ye == null ? void 0 : ye.ports) != null && pe.length)
            for (const Me of ye.ports) {
              if (Me.direction !== Tt || R.dataType !== "any" && Me.dataType !== "any" && R.dataType !== Me.dataType) continue;
              const Ie = ze(
                he,
                ye.ports,
                Me.id,
                t.viewport.zoom,
                t.measuredHeights,
                ye.portAnchor ?? "bbox"
              );
              if (!Ie) continue;
              const to = Math.hypot(Ie.x - ot, Ie.y - vt);
              to < Dt && to < ne && (ne = to, It = he, Lt = Me);
            }
        }
        if (!It || !Lt) return;
        const Qt = Lt.id, Ct = P === "output" ? It.id : A.id, At = P === "output" ? Qt : L;
        if (t.getAllNodes().some((he) => {
          if (he.type !== "edge") return !1;
          const ye = he.data;
          return ye.toId === Ct && ye.targetPort === At;
        })) return;
        const Pt = P === "output" ? A.id : It.id, Vt = P === "output" ? It.id : A.id, Nt = P === "output" ? L : Qt, Wt = P === "output" ? Qt : L, Yt = {
          id: Rt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Pt,
            toId: Vt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: Nt,
            targetPort: Wt
          }
        };
        t.addNode(Yt), t.select(Yt.id);
      };
      a().addEventListener("pointermove", X), a().addEventListener("pointerup", Q);
    },
    [t, o, yt]
  ), [Jn, uc] = et(0);
  St(() => {
    if (n)
      return n.onChange(() => uc((k) => k + 1));
  }, [n]);
  const pc = lt(
    (k) => n == null ? void 0 : n.getLastComputeMs(k),
    [n, Jn]
  ), fc = lt(
    (k, L) => n ? n.getPortValue(k, L) : null,
    [n, Jn]
  ), yc = lt(
    (k, L, P, O, A) => {
      A.stopPropagation(), A.preventDefault();
      const N = t.getNode(k);
      if (!N || N.type !== "edge") return;
      let R = !1;
      const D = (Z) => {
        R || (R = !0, t.pushHistorySnapshot());
        const X = t.screenToCanvas(Z.clientX, Z.clientY), Q = t.getNode(k);
        if (!Q) return;
        const F = t.getNode(Q.data.fromId), K = t.getNode(Q.data.toId);
        if (!(!F || !K))
          if (L === "xy") {
            const ot = Pe(
              F,
              K,
              Q.data.edgeType || "bezier",
              yt,
              Q.data.sourceHandle,
              Q.data.targetHandle,
              void 0,
              void 0,
              // no offsets → natural midpoint
              void 0,
              void 0,
              Q.data.sourceT,
              Q.data.targetT,
              Q.data.attachmentGap
            );
            if (!ot.kinkHandle) return;
            const vt = X.x - ot.kinkHandle.x, Tt = X.y - ot.kinkHandle.y;
            t.updateNode(k, {
              data: { ...Q.data, curveOffset: [vt, Tt] }
            });
          } else {
            const ot = L === "x" ? X.x : X.y, vt = Pe(
              F,
              K,
              Q.data.edgeType || "bezier",
              yt,
              Q.data.sourceHandle,
              Q.data.targetHandle,
              0.5,
              void 0,
              // default to get range
              void 0,
              void 0,
              Q.data.sourceT,
              Q.data.targetT,
              Q.data.attachmentGap
            );
            if (!vt.kinkHandle) return;
            const Tt = vt.kinkHandle.min, Dt = vt.kinkHandle.max, It = Dt - Tt;
            if (It === 0) return;
            const ne = (Math.max(Tt, Math.min(Dt, ot)) - Tt) / It;
            t.updateNode(k, {
              data: { ...Q.data, midpointOffset: ne }
            });
          }
      }, V = () => {
        a().removeEventListener("pointermove", D), a().removeEventListener("pointerup", V);
      };
      a().addEventListener("pointermove", D), a().addEventListener("pointerup", V);
    },
    [t, yt]
  ), gc = lt(
    (k, L, P) => {
      P.stopPropagation(), P.preventDefault();
      const O = t.getNode(k);
      if (!O || O.type !== "edge") return;
      const { fromId: A, toId: N, sourceHandle: R, targetHandle: D } = O.data, V = L === "source" ? N : A, Z = L === "source" ? D : R, X = t.getNode(A), Q = t.getNode(N);
      if (!X || !Q) return;
      const F = Pe(
        X,
        Q,
        O.data.edgeType || "bezier",
        yt,
        R,
        D,
        void 0,
        void 0,
        void 0,
        void 0,
        O.data.sourceT,
        O.data.targetT,
        O.data.attachmentGap
      ), K = L === "source" ? { x: F.x1, y: F.y1 } : { x: F.x2, y: F.y2 };
      Zt({
        edgeId: k,
        endpoint: L,
        anchorNodeId: V,
        anchorHandle: Z,
        cursorX: K.x,
        cursorY: K.y
      });
      const ot = (Tt) => {
        const { x: Dt, y: It } = t.screenToCanvas(Tt.clientX, Tt.clientY);
        Zt(
          (Lt) => Lt ? { ...Lt, cursorX: Dt, cursorY: It } : null
        );
      }, vt = (Tt) => {
        a().removeEventListener("pointermove", ot), a().removeEventListener("pointerup", vt), Zt(null);
        const { x: Dt, y: It } = t.screenToCanvas(Tt.clientX, Tt.clientY);
        let Lt = t.hitTest(Dt, It, yt);
        if (!Lt || Lt.type === "edge" || t.isContainerType(Lt.type)) {
          const Ht = 50 / t.viewport.zoom;
          let ue = 1 / 0, Yt = !1, pe = null;
          for (const he of t.getAllNodes()) {
            if (he.type === "edge") continue;
            const ye = t.isContainerType(he.type), Me = We(he, Dt, It, yt), Ie = Math.hypot(Me.x - Dt, Me.y - It);
            Ie >= Ht || ye && !Yt && pe || (!ye && Yt || Ie < ue) && (ue = Ie, Yt = ye, pe = he);
          }
          pe && (Lt = pe);
        }
        if (!Lt || Lt.type === "edge") return;
        const ne = L === "source" ? Lt.id : A, Qt = L === "target" ? Lt.id : N;
        if (ne === Qt) return;
        const Ct = L === "source" ? A : N;
        if (Lt.id === Ct) return;
        const At = O.data.sourceT !== void 0 || O.data.targetT !== void 0, bt = At ? void 0 : tr(Lt, Dt, It, yt), Pt = At ? We(Lt, Dt, It, yt).t : void 0, Vt = L === "source" ? {
          fromId: ne,
          toId: Qt,
          sourceHandle: bt ?? R,
          targetHandle: D,
          sourcePort: O.data.sourcePort,
          targetPort: O.data.targetPort
        } : {
          fromId: ne,
          toId: Qt,
          sourceHandle: R,
          targetHandle: bt ?? D,
          sourcePort: O.data.sourcePort,
          targetPort: O.data.targetPort
        };
        if (t.getAllNodes().some((Ht) => Ht.type !== "edge" || Ht.id === k ? !1 : ls(Ht.data, Vt))) return;
        let Wt;
        At ? Wt = L === "source" ? { fromId: Lt.id, sourceT: Pt, sourceHandle: void 0 } : { toId: Lt.id, targetT: Pt, targetHandle: void 0 } : Wt = L === "source" ? { fromId: Lt.id, sourceHandle: bt } : { toId: Lt.id, targetHandle: bt }, t.updateNodeWithHistory(k, { data: Wt });
      };
      a().addEventListener("pointermove", ot), a().addEventListener("pointerup", vt);
    },
    [t, yt]
  ), mc = lt(
    (k) => {
      if (k.stopPropagation(), k.preventDefault(), t.presentationMode) return;
      const L = Array.from(t.selection).map((Pt) => t.getNode(Pt)).filter(Boolean);
      if (L.length < 2) return;
      const O = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, A = O ? t.groupRotations.get(O) : null;
      let N, R;
      if (A)
        N = A.cx, R = A.cy;
      else {
        let Pt = 1 / 0, Vt = 1 / 0, Nt = -1 / 0, Wt = -1 / 0;
        for (const Ht of L) {
          const ue = Ht.h === "auto" ? yt[Ht.id] ?? 100 : Ht.h, Yt = I(Ht, ue);
          Pt = Math.min(Pt, Yt.minX), Vt = Math.min(Vt, Yt.minY), Nt = Math.max(Nt, Yt.maxX), Wt = Math.max(Wt, Yt.maxY);
        }
        N = (Pt + Nt) / 2, R = (Vt + Wt) / 2;
      }
      const D = (A == null ? void 0 : A.angle) ?? 0, Z = L.filter((Pt) => !Pt.locked).map((Pt) => {
        const Vt = Pt.h === "auto" ? yt[Pt.id] ?? 100 : Pt.h;
        return {
          id: Pt.id,
          cx: Pt.x + Pt.w / 2,
          cy: Pt.y + Vt / 2,
          w: Pt.w,
          h: Vt,
          rotation: Pt.rotation || 0
        };
      }), X = -D * Math.PI / 180, Q = Math.cos(X), F = Math.sin(X);
      let K = 1 / 0, ot = 1 / 0, vt = -1 / 0, Tt = -1 / 0;
      for (const Pt of Z) {
        const Vt = Pt.cx - N, Nt = Pt.cy - R, Wt = N + Vt * Q - Nt * F, Ht = R + Vt * F + Nt * Q;
        K = Math.min(K, Wt - Pt.w / 2), ot = Math.min(ot, Ht - Pt.h / 2), vt = Math.max(vt, Wt + Pt.w / 2), Tt = Math.max(Tt, Ht + Pt.h / 2);
      }
      const Dt = {
        x: K - at,
        y: ot - at,
        w: vt - K + at * 2,
        h: Tt - ot + at * 2
      }, { x: It, y: Lt } = t.screenToCanvas(k.clientX, k.clientY), ne = Math.atan2(Lt - R, It - N);
      let Qt = !1, Ct = D;
      const At = (Pt) => {
        Qt || (Qt = !0, t.pushHistorySnapshot());
        const { x: Vt, y: Nt } = t.screenToCanvas(Pt.clientX, Pt.clientY);
        let Ht = (Math.atan2(Nt - R, Vt - N) - ne) * (180 / Math.PI);
        (Pt.shiftKey || t.snapToGrid) && !(Pt.metaKey || Pt.ctrlKey) && (Ht = Math.round(Ht / 15) * 15), Ct = D + Ht, jn({ angle: Ct, cx: N, cy: R, bounds: Dt });
        const ue = Ht * Math.PI / 180, Yt = Math.cos(ue), pe = Math.sin(ue), he = Z.map((ye) => {
          const Me = ye.cx - N, Ie = ye.cy - R, to = N + Me * Yt - Ie * pe, Mn = R + Me * pe + Ie * Yt;
          return {
            id: ye.id,
            patch: {
              x: to - ye.w / 2,
              y: Mn - ye.h / 2,
              rotation: Ct
            }
          };
        });
        t.updateMany(he);
      }, bt = () => {
        O && t.groupRotations.set(O, { angle: Ct, cx: N, cy: R }), jn({ angle: Ct, cx: N, cy: R, bounds: Dt }), a().removeEventListener("pointermove", At), a().removeEventListener("pointerup", bt);
      };
      a().addEventListener("pointermove", At), a().addEventListener("pointerup", bt);
    },
    [t, yt, I]
  ), bc = lt(
    (k, L) => {
      if (L.stopPropagation(), L.preventDefault(), t.presentationMode) return;
      const P = Array.from(t.selection).map((bt) => t.getNode(bt)).filter(Boolean);
      if (P.length < 2) return;
      const O = (bt) => bt.h === "auto" ? yt[bt.id] ?? 100 : bt.h;
      let A = 1 / 0, N = 1 / 0, R = -1 / 0, D = -1 / 0;
      for (const bt of P) {
        const Pt = O(bt), Vt = I(bt, Pt);
        A = Math.min(A, Vt.minX), N = Math.min(N, Vt.minY), R = Math.max(R, Vt.maxX), D = Math.max(D, Vt.maxY);
      }
      const V = { x: A, y: N, w: R - A, h: D - N }, Z = V.w || 1, X = V.h || 1, F = P.filter((bt) => !bt.locked).map((bt) => {
        const Pt = O(bt);
        return {
          id: bt.id,
          type: bt.type,
          isAutoH: bt.h === "auto",
          relX: (bt.x - V.x) / Z,
          relY: (bt.y - V.y) / X,
          relW: bt.w / Z,
          relH: Pt / X,
          origW: bt.w,
          origH: Pt,
          origPoints: bt.type === "draw" ? bt.data.points.map((Vt) => [...Vt]) : null,
          drawData: bt.type === "draw" ? { ...bt.data } : null,
          origFontSize: bt.type === "text" ? bt.data.fontSize : 0,
          textData: bt.type === "text" ? { ...bt.data } : null
        };
      }), K = L.clientX, ot = L.clientY;
      let vt = !1, Tt = null, Dt = K, It = ot, Lt = !1, ne = L.shiftKey;
      const Qt = () => {
        Tt = null;
        const bt = (Dt - K) / t.viewport.zoom, Pt = (It - ot) / t.viewport.zoom;
        !vt && (bt !== 0 || Pt !== 0) && (vt = !0, t.pushHistorySnapshot());
        let Vt = V.x, Nt = V.y, Wt = V.w, Ht = V.h;
        if ((k === "nw" || k === "w" || k === "sw") && (Vt = V.x + bt, Wt = V.w - bt), (k === "ne" || k === "e" || k === "se") && (Wt = V.w + bt), (k === "nw" || k === "n" || k === "ne") && (Nt = V.y + Pt, Ht = V.h - Pt), (k === "sw" || k === "s" || k === "se") && (Ht = V.h + Pt), t.snapToGrid && !Lt) {
          const Yt = t.gridSize, pe = (he) => Math.round(he / Yt) * Yt;
          (k === "nw" || k === "w" || k === "sw") && (Vt = pe(Vt), Wt = V.x + V.w - Vt), (k === "ne" || k === "e" || k === "se") && (Wt = pe(Vt + Wt) - Vt), (k === "nw" || k === "n" || k === "ne") && (Nt = pe(Nt), Ht = V.y + V.h - Nt), (k === "sw" || k === "s" || k === "se") && (Ht = pe(Nt + Ht) - Nt);
        }
        if (Wt < 20 && (Wt = 20, (k === "nw" || k === "w" || k === "sw") && (Vt = V.x + V.w - 20)), Ht < 20 && (Ht = 20, (k === "nw" || k === "n" || k === "ne") && (Nt = V.y + V.h - 20)), ne && V.w > 0 && V.h > 0) {
          const Yt = Ts(
            k,
            V.x,
            V.y,
            V.w,
            V.h,
            Vt,
            Nt,
            Wt,
            Ht
          );
          Vt = Yt.x, Nt = Yt.y, Wt = Yt.w, Ht = Yt.h;
        }
        const ue = F.map((Yt) => {
          const pe = Vt + Yt.relX * Wt, he = Nt + Yt.relY * Ht, ye = Yt.relW * Wt, Me = Yt.relH * Ht, Ie = {
            x: pe,
            y: he,
            w: ye,
            h: Yt.isAutoH ? "auto" : Me
          };
          if (Yt.origPoints && Yt.drawData) {
            const to = Yt.origW > 0 ? ye / Yt.origW : 1, Mn = Yt.origH > 0 ? Me / Yt.origH : 1;
            Ie.data = {
              ...Yt.drawData,
              points: Yt.origPoints.map(
                ([Sc, Mc, Cc]) => [Sc * to, Mc * Mn, Cc]
              )
            };
          }
          if (Yt.type === "text" && Yt.origFontSize > 0 && Yt.textData && k !== "e" && k !== "w") {
            const to = k === "n" || k === "s" ? Yt.origH > 0 ? Me / Yt.origH : 1 : Yt.origW > 0 ? ye / Yt.origW : 1, Mn = Math.max(8, Math.round(Yt.origFontSize * to));
            Ie.data = { ...Yt.textData, fontSize: Mn };
          }
          return { id: Yt.id, patch: Ie };
        });
        t.updateMany(ue);
      }, Ct = (bt) => {
        Dt = bt.clientX, It = bt.clientY, Lt = bt.metaKey || bt.ctrlKey, ne = bt.shiftKey, Tt === null && (Tt = requestAnimationFrame(Qt));
      }, At = () => {
        Tt !== null && (cancelAnimationFrame(Tt), Qt()), a().removeEventListener("pointermove", Ct), a().removeEventListener("pointerup", At);
        for (const bt of P)
          t.isContainerType(bt.type) && t.syncFrameChildrenAfterResize(bt.id);
      };
      a().addEventListener("pointermove", Ct), a().addEventListener("pointerup", At);
    },
    [t, yt, I]
  );
  St(() => {
    d.current && (d.current.style.cursor = t.lassoSelect ? nn : cr(v)), v !== "select" && v !== "edge" && (wn.current = null, Nr(null)), v !== "erase" && (so.current !== null && (cancelAnimationFrame(so.current), so.current = null), ro.current = /* @__PURE__ */ new Set(), Xr(/* @__PURE__ */ new Set()), Xe.current = [], vn([]), t.notifyEraserEnd());
  }, [v, t]);
  const jr = ut(null), Mi = ut(null), xc = lt(
    (k) => {
      if (ht.current && k.pointerType === "touch" && gt.current) {
        const L = k.clientX - gt.current.clientX, P = k.clientY - gt.current.clientY;
        Math.sqrt(L * L + P * P) > 8 && (clearTimeout(ht.current), ht.current = null, gt.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (Mi.current = { clientX: k.clientX, clientY: k.clientY }, jr.current === null && (jr.current = requestAnimationFrame(() => {
        jr.current = null;
        const L = d.current, P = Mi.current;
        if (!L || !P) return;
        const { x: O, y: A } = t.screenToCanvas(P.clientX, P.clientY);
        if (t.lassoSelect) {
          L.style.cursor = nn;
          return;
        }
        if (t.mode === "edge") {
          const D = 50 / t.viewport.zoom;
          let V = null, Z = D;
          for (const X of t.getAllNodes()) {
            if (X.type === "edge") continue;
            const Q = We(X, O, A, yt), F = Math.hypot(Q.x - O, Q.y - A);
            F < Z && (Z = F, V = X.id);
          }
          V !== wn.current && (wn.current = V, Nr(V)), oc({ x: O, y: A });
          return;
        }
        if (t.selection.size >= 2 && ce && O >= ce.x && O <= ce.x + ce.w && A >= ce.y && A <= ce.y + ce.h) {
          L.style.cursor = "move";
          return;
        }
        const N = t.hitTest(O, A, yt), R = N ? N.id : null;
        if (R !== wn.current && (wn.current = R, Nr(R)), N) {
          L.style.cursor = "move";
          return;
        }
        if (Li(
          t.nodes,
          O,
          A,
          t.viewport.zoom,
          yt,
          Je
        )) {
          L.style.cursor = "move";
          return;
        }
        L.style.cursor = "default";
      })));
    },
    [t, ce, yt, I, Je]
  ), wc = lt((k) => {
    (k.dataTransfer.types.includes("Files") || k.dataTransfer.types.includes(Ds) || k.dataTransfer.types.includes(Ws) || k.dataTransfer.types.includes(Bs)) && (k.preventDefault(), k.dataTransfer.dropEffect = "copy");
  }, []), kc = lt(
    (k) => {
      if (k.preventDefault(), t.presentationMode) return;
      const L = k.dataTransfer.getData(Bs);
      if (L) {
        try {
          const F = JSON.parse(L);
          Hl(t, F, k.clientX, k.clientY);
        } catch (F) {
          console.error("Failed to place GIF:", F);
        }
        return;
      }
      const P = k.dataTransfer.getData(Ws);
      if (P) {
        try {
          const { itemId: F } = JSON.parse(P), ot = Dl().find((vt) => vt.id === F);
          ot && Bl(t, ot, k.clientX, k.clientY);
        } catch (F) {
          console.error("Failed to place personal library item:", F);
        }
        return;
      }
      const O = k.dataTransfer.getData(Ds);
      if (O) {
        try {
          const { libraryId: F, itemId: K } = JSON.parse(O), vt = oi(F).find((Tt) => Tt.id === K);
          vt && Wl(t, vt, k.clientX, k.clientY);
        } catch (F) {
          console.error("Failed to place library item:", F);
        }
        return;
      }
      const A = k.dataTransfer.files[0];
      if (!A) return;
      const N = `${A.name}|${A.size}|${A.lastModified}|${Math.round(k.clientX)}|${Math.round(k.clientY)}`, R = performance.now(), D = c.current;
      if (D && D.sig === N && R - D.at < 150)
        return;
      c.current = { sig: N, at: R }, k.stopPropagation();
      const V = k.nativeEvent;
      if (typeof V.stopImmediatePropagation == "function" && V.stopImmediatePropagation(), A.name.endsWith(".excalidrawlib") || A.name.endsWith(".excalidrawlib.json")) {
        const F = new FileReader();
        F.onload = () => {
          try {
            const K = JSON.parse(F.result);
            if (K.type === "excalidrawlib") {
              const ot = A.name.replace(/\.excalidrawlib(\.json)?$/, "");
              ni(K, { name: ot });
            }
          } catch (K) {
            console.error("Failed to import library:", K);
          }
        }, F.readAsText(A);
        return;
      }
      if (A.type === "image/svg+xml" || A.name.endsWith(".svg")) {
        const F = new FileReader();
        F.onload = () => {
          const K = F.result, ot = Ns(K);
          ot && wp(t, ot, k.clientX, k.clientY);
        }, F.readAsText(A);
        return;
      }
      if (!A.type.startsWith("image/")) return;
      const { x: Z, y: X } = t.screenToCanvas(k.clientX, k.clientY), Q = new FileReader();
      Q.onload = () => {
        const F = Q.result, K = new Image();
        K.onload = () => {
          const ot = Math.min(K.naturalWidth, 400), vt = Math.min(K.naturalHeight, 300), Tt = K.naturalWidth / K.naturalHeight, Dt = Tt >= 1 ? ot : vt * Tt, It = Tt >= 1 ? ot / Tt : vt;
          t.addNode({
            id: Rt(10),
            type: "image",
            x: Z,
            y: X,
            w: Dt,
            h: It,
            z: t.nextZ(),
            data: { src: F }
          });
        }, K.src = F;
      }, Q.readAsDataURL(A);
    },
    [t]
  ), vc = `translate(${y.x}px, ${y.y}px) scale(${y.zoom})`, Vr = z.activeIndex >= 0 ? ((Ii = z.matches[z.activeIndex]) == null ? void 0 : Ii.nodeId) ?? null : null, Ci = Kt(() => {
    if (!z.query || z.matches.length === 0) return /* @__PURE__ */ new Set();
    const k = /* @__PURE__ */ new Set();
    for (const L of z.matches)
      L.nodeType !== "edge" && k.add(L.nodeId);
    return k;
  }, [z]);
  return Co(() => {
    const k = d.current;
    if (w || !k || !z.query || z.matches.length === 0) {
      nt((R) => R.length === 0 ? R : []);
      return;
    }
    const L = k.getBoundingClientRect(), P = z.query.toLocaleLowerCase(), O = Array.from(new Set(z.matches.map((R) => R.nodeId))), A = [], N = 900;
    for (const R of O) {
      if (A.length >= N) break;
      const D = R.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), V = k.querySelector(`[data-node-id="${D}"]`);
      if (!V) continue;
      const Z = document.createTreeWalker(
        V,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(Q) {
            const F = Q.parentElement;
            return !F || F.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']") || !Q.nodeValue || !Q.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let X = Z.nextNode();
      for (; X && A.length < N; ) {
        const Q = X, K = (Q.nodeValue ?? "").toLocaleLowerCase();
        let ot = 0;
        for (; ot <= K.length - P.length && A.length < N; ) {
          const vt = K.indexOf(P, ot);
          if (vt < 0) break;
          const Tt = document.createRange();
          Tt.setStart(Q, vt), Tt.setEnd(Q, vt + P.length);
          const Dt = Tt.getClientRects();
          for (const It of Dt)
            It.width <= 0 || It.height <= 0 || A.push({
              x: It.left - L.left,
              y: It.top - L.top,
              w: It.width,
              h: It.height,
              active: R === Vr
            });
          ot = vt + P.length;
        }
        X = Z.nextNode();
      }
    }
    nt((R) => R.length === A.length && R.every((D, V) => {
      const Z = A[V];
      return D.x === Z.x && D.y === Z.y && D.w === Z.w && D.h === Z.h && D.active === Z.active;
    }) ? R : A);
  }, [z, g, y, Vr, w]), /* @__PURE__ */ h(gn.Provider, { value: st, children: /* @__PURE__ */ S(
    "div",
    {
      ref: d,
      "data-sb-canvas": !0,
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        touchAction: "none",
        background: Hn(J).canvasBg
      },
      onPointerDown: lc,
      onPointerMove: xc,
      onDoubleClick: ac,
      onContextMenu: ic,
      onDragOver: wc,
      onDrop: kc,
      children: [
        /* @__PURE__ */ h(Yu, { viewport: y, gridSize: xt, background: J, gridVisible: rt }),
        /* @__PURE__ */ S(
          Tf,
          {
            safariWebKitWorkaround: kp(),
            viewport: y,
            viewportTransform: vc,
            children: [
              sc.sort((k, L) => k.z - L.z).map((k) => {
                var R;
                const L = Or.has(k.id), P = nc.has(k.id), A = -(k.id.split("").reduce((D, V) => D + V.charCodeAt(0), 0) % 240 / 100);
                let N;
                if (o) {
                  const D = o.get(k.type);
                  if (D) {
                    const V = D.component, Z = x.has(k.id) && v !== "edge", X = !t.readOnly && (v === "select" || v === "text" || v === "note" || v === "sticky"), Q = /* @__PURE__ */ h(
                      V,
                      {
                        node: k,
                        data: k.data,
                        isSelected: Z,
                        multiSelected: x.size > 1 && Z && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: X,
                        zoom: y.zoom,
                        editing: mi === k.id,
                        cropping: _e === k.id,
                        editClickPos: mi === k.id ? Fr.current : null,
                        callbacks: {
                          onMeasuredHeight: de,
                          // drop resize-handle starts in readOnly. The
                          // canvas selection-frame is hidden in that mode but a
                          // node-internal resize handle (if any) shouldn't fire
                          // either.
                          onResizeHandleDown: t.readOnly ? void 0 : Gr,
                          onEditStart: (F) => {
                            if (t.readOnly) return;
                            const K = t.getNode(F);
                            K && (K.type === "text" ? Lo(F) : K.type === "sticky" ? Ro(F) : K.type === "frame" ? Jo(F) : K.type === "shape" ? $o(F) : K.type === "image" ? _o(F) : K.type === "youtube" && gi(F));
                          },
                          onEditEnd: () => {
                            k.type === "text" ? Lo((F) => {
                              if (F !== k.id) return F;
                              const K = Kn.current;
                              return K && K.id === F && performance.now() < K.until ? F : null;
                            }) : k.type === "sticky" ? Ro((F) => F === k.id ? null : F) : k.type === "frame" ? Jo((F) => F === k.id ? null : F) : k.type === "shape" ? $o((F) => F === k.id ? null : F) : k.type === "image" ? _o((F) => F === k.id ? null : F) : k.type === "youtube" && gi((F) => F === k.id ? null : F);
                          }
                        },
                        portValues: n && ((R = D.ports) != null && R.length) && Jn >= 0 ? n.getAllPortValues(k.id) : void 0,
                        updateData: (F) => {
                          const K = st();
                          t.updateNodeWithHistoryCoalesced(
                            k.id,
                            {
                              data: { ...k.data, ...F }
                            },
                            `${K}:registry:${k.id}`
                          );
                        }
                      },
                      D.handlesOwnLayout ? k.id : void 0
                    );
                    D.handlesOwnLayout ? N = Q : N = /* @__PURE__ */ h(
                      Cf,
                      {
                        node: k,
                        isInteractive: X,
                        measuredH: yt[k.id],
                        onMeasuredHeight: de,
                        observeElement: Ne,
                        unobserveElement: mn,
                        isContainer: D.isContainer,
                        children: Q
                      },
                      k.id
                    );
                  }
                } else if (k.type === "content") {
                  const D = k;
                  N = /* @__PURE__ */ h(
                    Ja,
                    {
                      node: D,
                      isSelected: x.has(k.id) && v !== "edge",
                      multiSelected: x.size > 1 && x.has(k.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: v === "select" || v === "text" || v === "note",
                      zoom: y.zoom,
                      onMeasuredHeight: de,
                      autoEdit: bi.current === D.id
                    },
                    k.id
                  );
                } else if (k.type === "text")
                  N = /* @__PURE__ */ h(
                    dl,
                    {
                      node: k,
                      engine: t,
                      editing: Qo === k.id,
                      editClickPos: Qo === k.id ? Fr.current : null,
                      onStopEdit: () => {
                        if (Hr.current === k.id) {
                          Hr.current = null;
                          const D = t.getNode(k.id);
                          if (!D || !D.data.text.trim()) {
                            t.deleteNode(k.id), Lo((V) => V === k.id ? null : V);
                            return;
                          }
                        }
                        Lo((D) => D === k.id ? null : D);
                      },
                      onMeasuredHeight: de
                    },
                    k.id
                  );
                else if (k.type === "image")
                  N = /* @__PURE__ */ h(
                    cl,
                    {
                      node: k,
                      isSelected: x.has(k.id) && v !== "edge",
                      engine: t,
                      interactive: v === "select",
                      zoom: y.zoom,
                      onResizeHandleDown: Gr,
                      cropping: _e === k.id,
                      onCropStart: () => _o(k.id),
                      onCropEnd: () => _o(null)
                    },
                    k.id
                  );
                else if (k.type === "sticky")
                  N = /* @__PURE__ */ h(
                    hl,
                    {
                      node: k,
                      isSelected: x.has(k.id) && v !== "edge",
                      engine: t,
                      interactive: v === "select" || v === "sticky",
                      zoom: y.zoom,
                      editing: yi === k.id,
                      onEditStart: Ro,
                      onEditEnd: () => Ro(null)
                    },
                    k.id
                  );
                else if (k.type === "frame") {
                  const D = k, V = D.h === "auto" ? 100 : D.h;
                  N = /* @__PURE__ */ h(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: D.x,
                        top: D.y,
                        width: D.w,
                        height: V,
                        zIndex: D.z,
                        background: D.data.backgroundColor || "rgba(0,0,0,0.02)",
                        border: `${D.data.borderWidth || 1}px ${D.data.borderStyle || "dashed"} ${D.data.borderColor || "#ccc"}`,
                        boxSizing: "border-box",
                        borderRadius: 8,
                        opacity: D.data.opacity ?? 1,
                        pointerEvents: "none",
                        overflow: "visible",
                        transform: D.rotation ? `rotate(${D.rotation}deg)` : void 0,
                        transformOrigin: "center center"
                      },
                      children: fi === k.id ? /* @__PURE__ */ h(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: D.data.label ?? "",
                          placeholder: l.frameLabelPlaceholder,
                          onBlur: (Z) => {
                            const X = Z.currentTarget.value.trim();
                            t.updateNodeWithHistory(k.id, {
                              data: { ...D.data, label: X || void 0 }
                            }), Jo(null);
                          },
                          onKeyDown: (Z) => {
                            (Z.key === "Enter" || Z.key === "Escape") && Z.currentTarget.blur(), Z.stopPropagation();
                          },
                          onPointerDown: (Z) => Z.stopPropagation(),
                          style: {
                            position: "absolute",
                            top: -24,
                            left: 0,
                            fontSize: 12,
                            color: D.data.borderColor || "#999",
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
                      ) : D.data.label ? /* @__PURE__ */ h(
                        "div",
                        {
                          onDoubleClick: (Z) => {
                            Z.stopPropagation(), t.select(k.id), Jo(k.id);
                          },
                          style: {
                            position: "absolute",
                            top: -20,
                            left: 4,
                            fontSize: 12,
                            color: D.data.borderColor || "#999",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            pointerEvents: "auto",
                            cursor: "default"
                          },
                          children: D.data.label
                        }
                      ) : null
                    },
                    k.id
                  );
                } else {
                  const D = k;
                  D.type === "draw" ? N = /* @__PURE__ */ h(wr, { node: D }, k.id) : N = /* @__PURE__ */ h(wr, { node: D, editingLabel: kn === k.id }, k.id);
                }
                return L || P ? /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      opacity: L ? 0.25 : void 0,
                      filter: L ? "saturate(0)" : void 0,
                      animation: P ? "sb-node-bop 3.4s ease-in-out infinite" : void 0,
                      animationDelay: P ? `${A}s` : void 0,
                      transformOrigin: "center center",
                      willChange: P ? "transform" : void 0
                    },
                    children: N
                  },
                  k.id
                ) : N;
              }),
              Ci.size > 0 && Array.from(Ci).map((k) => {
                const L = t.getNode(k);
                if (!L || L.type === "edge") return null;
                const P = L.h === "auto" ? yt[L.id] ?? 100 : L.h, O = Vr === k;
                return /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: L.x - 5,
                      top: L.y - 5,
                      width: L.w + 10,
                      height: P + 10,
                      borderRadius: 10,
                      border: `2px solid ${O ? "#f59e0b" : "#60a5fa"}`,
                      boxShadow: O ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
                      pointerEvents: "none",
                      transform: L.rotation ? `rotate(${L.rotation}deg)` : void 0,
                      transformOrigin: "center center"
                    }
                  },
                  `search-highlight-${k}`
                );
              }),
              kn && (() => {
                const k = t.getNode(kn);
                if (!k || k.type !== "shape") return null;
                const L = k.data;
                return L.shape === "line" || L.shape === "arrow" ? null : /* @__PURE__ */ h(
                  If,
                  {
                    node: k,
                    engine: t,
                    onDone: () => $o(null)
                  },
                  kn
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ h(
          zp,
          {
            nodes: bn,
            viewport: y,
            selection: x,
            measuredHeights: yt,
            activeStroke: wt,
            shapePreview: Ft,
            shapePreviewStyle: Ft ? {
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
            onResizeHandleDown: Gr,
            onRotateStart: cc,
            onConnectionHandleDown: Si,
            onEdgeEndpointDown: gc,
            onKinkHandleDown: yc,
            edgePreview: ct,
            edgeReconnect: Jt,
            eraserMarkedIds: Or.size > 0 ? Or : void 0,
            eraserTrail: xi.length > 1 ? xi : void 0,
            laserTrail: ki.length > 1 ? ki : void 0,
            mode: v,
            freeFormEdges: t.freeFormEdges,
            hoveredNodeId: tc,
            cursorCanvasPos: ec,
            registry: o,
            onPortHandleDown: hc,
            cycleNodeIds: n && Jn >= 0 ? n.cycleNodeIds : void 0,
            dataFlowEdgeOverlay: n ? r : "off",
            getLastComputeMs: n ? pc : void 0,
            getDataFlowPortValue: n ? fc : void 0,
            containerTypes: t.containerTypes,
            alignGuides: G,
            suppressNodeOverlayId: _e
          }
        ),
        ce && !_e && v !== "edge" && !ct && !Jt && !t.readOnly && (() => {
          const k = t.selectionGroupId(), L = k ? t.groupRotations.get(k) : void 0;
          let P, O, A, N;
          if (xn)
            P = xn.bounds, O = xn.angle, A = xn.cx, N = xn.cy;
          else if (L && L.angle !== 0) {
            const X = -L.angle * Math.PI / 180, Q = Math.cos(X), F = Math.sin(X);
            let K = 1 / 0, ot = 1 / 0, vt = -1 / 0, Tt = -1 / 0;
            for (const Dt of t.selection) {
              const It = t.getNode(Dt);
              if (!It || It.type === "edge") continue;
              const Lt = It.h === "auto" ? yt[It.id] ?? 100 : It.h, ne = It.x + It.w / 2, Qt = It.y + Lt / 2, Ct = ne - L.cx, At = Qt - L.cy, bt = L.cx + Ct * Q - At * F, Pt = L.cy + Ct * F + At * Q;
              K = Math.min(K, bt - It.w / 2), ot = Math.min(ot, Pt - Lt / 2), vt = Math.max(vt, bt + It.w / 2), Tt = Math.max(Tt, Pt + Lt / 2);
            }
            P = {
              x: K - at,
              y: ot - at,
              w: vt - K + at * 2,
              h: Tt - ot + at * 2
            }, O = L.angle, A = L.cx, N = L.cy;
          } else
            P = ce, O = 0, A = 0, N = 0;
          const R = 8 / y.zoom, D = R / 2, V = [
            { pos: "nw", cx: P.x, cy: P.y },
            { pos: "n", cx: P.x + P.w / 2, cy: P.y },
            { pos: "ne", cx: P.x + P.w, cy: P.y },
            { pos: "e", cx: P.x + P.w, cy: P.y + P.h / 2 },
            { pos: "se", cx: P.x + P.w, cy: P.y + P.h },
            { pos: "s", cx: P.x + P.w / 2, cy: P.y + P.h },
            { pos: "sw", cx: P.x, cy: P.y + P.h },
            { pos: "w", cx: P.x, cy: P.y + P.h / 2 }
          ], Z = O !== 0 ? ` rotate(${O}, ${A}, ${N})` : "";
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${y.x}, ${y.y}) scale(${y.zoom})`, children: /* @__PURE__ */ S("g", { transform: Z, children: [
                /* @__PURE__ */ h(
                  "rect",
                  {
                    x: P.x,
                    y: P.y,
                    width: P.w,
                    height: P.h,
                    fill: "none",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / y.zoom
                  }
                ),
                O === 0 && V.map(({ pos: X, cx: Q, cy: F }) => /* @__PURE__ */ h(
                  "rect",
                  {
                    x: Q - D,
                    y: F - D,
                    width: R,
                    height: R,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / y.zoom,
                    style: { cursor: Mr(X, O), pointerEvents: "auto" },
                    onPointerDown: (K) => {
                      K.stopPropagation(), bc(X, K);
                    }
                  },
                  X
                )),
                (() => {
                  const X = 25 / y.zoom, Q = P.x + P.w / 2, F = P.y;
                  return /* @__PURE__ */ S(Mt, { children: [
                    /* @__PURE__ */ h(
                      "line",
                      {
                        x1: Q,
                        y1: F,
                        x2: Q,
                        y2: F - X,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / y.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const K = 8 / y.zoom, ot = K / 2;
                      return /* @__PURE__ */ h(
                        "rect",
                        {
                          x: Q - ot,
                          y: F - X - ot,
                          width: K,
                          height: K,
                          rx: 1.5 / y.zoom,
                          transform: `rotate(45, ${Q}, ${F - X})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / y.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (vt) => mc(vt)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const X = 26 / y.zoom, Q = 42 / y.zoom, F = 4 / y.zoom;
                  return [
                    { side: "top", cx: P.x + P.w / 2, cy: P.y - Q },
                    { side: "right", cx: P.x + P.w + X, cy: P.y + P.h / 2 },
                    { side: "bottom", cx: P.x + P.w / 2, cy: P.y + P.h + X },
                    { side: "left", cx: P.x - X, cy: P.y + P.h / 2 }
                  ].map(({ side: ot, cx: vt, cy: Tt }) => /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: vt,
                      cy: Tt,
                      r: F,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / y.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (Dt) => {
                        Dt.stopPropagation();
                        const It = dc(ot);
                        It && Si(It, ot, Dt);
                      }
                    },
                    `conn-${ot}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Oe && /* @__PURE__ */ h(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ h("g", { transform: `translate(${y.x}, ${y.y}) scale(${y.zoom})`, children: /* @__PURE__ */ h(
              "rect",
              {
                x: Oe.x,
                y: Oe.y,
                width: Oe.w,
                height: Oe.h,
                fill: "none",
                stroke: "#6366f1",
                strokeWidth: 1.5 / y.zoom,
                strokeDasharray: `${5 / y.zoom} ${3 / y.zoom}`,
                rx: 4 / y.zoom,
                opacity: 0.5
              }
            ) })
          }
        ),
        Eo && (() => {
          const k = t.canvasToScreen(Eo.startX, Eo.startY), L = t.canvasToScreen(Eo.endX, Eo.endY), P = Math.min(k.x, L.x), O = Math.min(k.y, L.y), A = Math.abs(L.x - k.x), N = Math.abs(L.y - k.y);
          return A < 2 && N < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "rect",
                {
                  x: P,
                  y: O,
                  width: A,
                  height: N,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        Dr && Dr.length > 2 && (() => {
          const L = Dr.map(([P, O]) => t.canvasToScreen(P, O)).map((P) => `${P.x},${P.y}`).join(" ");
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "polygon",
                {
                  points: L,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        be && (() => {
          const k = Math.min(be.startX, be.endX), L = Math.min(be.startY, be.endY), P = Math.abs(be.endX - be.startX), O = Math.abs(be.endY - be.startY);
          return P < 2 && O < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${y.x}, ${y.y}) scale(${y.zoom})`, children: /* @__PURE__ */ h(
                "rect",
                {
                  x: k,
                  y: L,
                  width: P,
                  height: O,
                  fill: "rgba(59,130,246,0.06)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5 / y.zoom,
                  strokeDasharray: `${4 / y.zoom}`,
                  rx: 8 / y.zoom
                }
              ) })
            }
          );
        })(),
        Y.length > 0 && /* @__PURE__ */ h(
          "div",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: Y.map((k, L) => /* @__PURE__ */ h(
              "div",
              {
                style: {
                  position: "absolute",
                  left: k.x,
                  top: k.y,
                  width: k.w,
                  height: k.h,
                  borderRadius: 3,
                  background: k.active ? "rgba(250, 204, 21, 0.62)" : "rgba(250, 204, 21, 0.44)",
                  boxShadow: k.active ? "0 0 0 1px rgba(202, 138, 4, 0.85)" : "0 0 0 1px rgba(202, 138, 4, 0.45)"
                }
              },
              `search-text-rect-${L}`
            ))
          }
        ),
        s && /* @__PURE__ */ h(
          Ku,
          {
            engine: t,
            nodes: g,
            viewport: y,
            containerSize: u,
            measuredHeights: yt
          }
        ),
        Zo && /* @__PURE__ */ h(
          Pp,
          {
            x: Zo.x,
            y: Zo.y,
            sections: Zo.sections,
            onClose: () => Gn(null)
          }
        ),
        qn && /* @__PURE__ */ h(
          bp,
          {
            nodes: qn.nodes,
            onSave: (k) => {
              lp(k, qn.nodes, qn.groupParent), Yr(null);
            },
            onCancel: () => Yr(null)
          }
        )
      ]
    }
  ) });
}
const eo = 52, dn = 300, D0 = eo + dn, Pf = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], li = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Af = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], vr = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Ul = [1, 2, 3, 5, 8, 12], ci = [1, 2, 3, 4, 6, 8], Zl = [1, 2, 3, 4, 6], Ef = ci, Ql = [14, 20, 28, 36], di = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Lf = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], He = [
  { name: "Standard", colors: Pf },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], hi = He, Rf = [
  { name: "Standard", colors: Lf },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Xt = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Ot = {
  width: 64,
  fontSize: 10,
  flexShrink: 0
}, re = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
}, Df = "https://libraries.excalidraw.com/libraries.json", Os = "https://libraries.excalidraw.com/libraries";
function Wf({
  onClose: t,
  onInstalled: e
}) {
  const o = oe(), { labels: n } = _t(), [r, s] = et([]), [i, l] = et(!0), [d, c] = et(null), [a, u] = et(""), [f, y] = et(null), [p, g] = et(/* @__PURE__ */ new Set()), m = lt(() => {
    const w = xl(), M = new Set(w.map((v) => v.source));
    g(M);
  }, []);
  St(() => {
    let w = !1;
    return (async () => {
      try {
        const M = await fetch(Df);
        if (!M.ok) throw new Error(`HTTP ${M.status}`);
        const v = await M.json();
        w || (s(v), l(!1));
      } catch (M) {
        w || (c(String(M)), l(!1));
      }
    })(), m(), () => {
      w = !0;
    };
  }, [m]);
  const x = Kt(() => {
    if (!a.trim()) return r;
    const w = a.toLowerCase();
    return r.filter(
      (M) => {
        var v, C;
        return M.name.toLowerCase().includes(w) || ((v = M.description) == null ? void 0 : v.toLowerCase().includes(w)) || ((C = M.itemNames) == null ? void 0 : C.some((T) => T.toLowerCase().includes(w)));
      }
    );
  }, [r, a]), b = lt(
    async (w) => {
      y(w.id);
      try {
        const M = `${Os}/${w.source}`;
        await Qu(M, w.name), m(), e();
      } catch (M) {
        console.error("Failed to install library:", M);
      } finally {
        y(null);
      }
    },
    [e, m]
  );
  return Ze(
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
        onPointerDown: (w) => {
          w.target === w.currentTarget && t();
        },
        children: /* @__PURE__ */ S(
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
            onPointerDown: (w) => w.stopPropagation(),
            children: [
              /* @__PURE__ */ S(
                "div",
                {
                  style: {
                    padding: "16px 20px 12px",
                    borderBottom: `1px solid ${o.border}`,
                    flexShrink: 0
                  },
                  children: [
                    /* @__PURE__ */ S(
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
                              children: n.libraryDirectoryTitle
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
                        placeholder: n.libraryDirectorySearchPlaceholder,
                        value: a,
                        onChange: (w) => u(w.target.value),
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
              /* @__PURE__ */ S(
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
                        children: n.libraryDirectoryLoading
                      }
                    ),
                    d && /* @__PURE__ */ S(
                      "div",
                      {
                        style: {
                          textAlign: "center",
                          padding: 40,
                          color: "#ef4444",
                          fontSize: 12
                        },
                        children: [
                          n.libraryDirectoryFailedPrefix,
                          ": ",
                          d
                        ]
                      }
                    ),
                    !i && !d && x.length === 0 && /* @__PURE__ */ h(
                      "div",
                      {
                        style: {
                          textAlign: "center",
                          padding: 40,
                          color: o.textDisabled,
                          fontSize: 12
                        },
                        children: n.libraryDirectoryNoMatches
                      }
                    ),
                    x.map((w, M) => {
                      const v = p.has(
                        `${Os}/${w.source}`
                      ), C = f === w.id;
                      return /* @__PURE__ */ h(
                        Bf,
                        {
                          entry: w,
                          isInstalled: v,
                          isInstalling: C,
                          onInstall: () => b(w),
                          theme: o
                        },
                        w.id || `dir-${M}`
                      );
                    })
                  ]
                }
              ),
              /* @__PURE__ */ S(
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
                    n.libraryDirectoryLibrariesCountSuffix,
                    " • ",
                    n.libraryDirectoryPoweredBy
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
function Bf({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: n,
  theme: r
}) {
  var l;
  const { labels: s } = _t(), i = t.preview ? `${Os}/${t.preview}` : null;
  return /* @__PURE__ */ S(
    "div",
    {
      style: {
        display: "flex",
        gap: 12,
        padding: "10px 0",
        borderBottom: `1px solid ${r.border}`,
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
              border: `1px solid ${r.border}`,
              flexShrink: 0,
              background: "#fff"
            }
          }
        ),
        /* @__PURE__ */ S("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ h(
            "div",
            {
              style: {
                fontSize: 12,
                fontWeight: 600,
                color: r.text,
                marginBottom: 2
              },
              children: t.name
            }
          ),
          ((l = t.authors) == null ? void 0 : l.length) > 0 && /* @__PURE__ */ S(
            "div",
            {
              style: {
                fontSize: 10,
                color: r.textMuted,
                marginBottom: 4
              },
              children: [
                s.libraryDirectoryBy,
                " ",
                t.authors.map((d) => d.name).join(", ")
              ]
            }
          ),
          t.description && /* @__PURE__ */ h(
            "div",
            {
              style: {
                fontSize: 10,
                color: r.textSecondary,
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
            onClick: n,
            disabled: e || o,
            style: {
              flexShrink: 0,
              padding: "5px 10px",
              border: e ? `1px solid ${r.border}` : "none",
              borderRadius: 4,
              background: e ? "transparent" : o ? r.controlBgActive : r.accentColor,
              color: e ? r.textMuted : "#fff",
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
const Nf = /^[A-Za-z][A-Za-z0-9_:-]*$/, ba = /^[A-Za-z][A-Za-z0-9_]*$/;
function Ff(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function Ye(t) {
  return Ff(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function cs(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function Fo(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: Ye(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: Ye(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: Ye(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: Ye(o[2]), shape: "rect" } : Nf.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function Hf(t) {
  let e = t.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (e) {
    const o = Fo(e[1]), n = Fo(e[3]);
    return !o || !n ? null : { from: o, to: n, label: Ye(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/), e) {
    const o = Fo(e[1]), n = Fo(e[3]);
    return !o || !n ? null : { from: o, to: n, label: Ye(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/), e) {
    const o = Fo(e[1]), n = Fo(e[2]);
    return !o || !n ? null : { from: o, to: n };
  }
  return null;
}
function Of(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function Xf(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const n = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return n ? { label: Ye(n[1]) } : { label: Ye(o) };
}
function Yf(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, n = t.replace(/\r\n/g, `
`).split(`
`).map((d) => d.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (n.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const r = n[0];
  /^(flowchart|graph)\b/i.test(r) && (o.direction = Of(r), n.shift());
  const i = [], l = (d) => {
    for (const c of i) c.nodeKeys.add(d);
  };
  for (const d of n) {
    const c = d.split(";").map((a) => a.trim()).filter(Boolean);
    for (const a of c) {
      const u = Xf(a);
      if (u) {
        i.push({ label: u.label, nodeKeys: /* @__PURE__ */ new Set() });
        continue;
      }
      if (/^end\b/i.test(a)) {
        const p = i.pop();
        p && o.groups.push({
          label: p.label,
          nodeKeys: Array.from(p.nodeKeys)
        });
        continue;
      }
      const f = Hf(a);
      if (f) {
        const p = cs(o, f.from), g = cs(o, f.to);
        l(p.key), l(g.key), o.edges.push({ fromKey: p.key, toKey: g.key, label: f.label });
        continue;
      }
      const y = Fo(a);
      if (y) {
        const p = cs(o, y);
        l(p.key);
      }
    }
  }
  for (; i.length > 0; ) {
    const d = i.pop();
    o.groups.push({
      label: d.label,
      nodeKeys: Array.from(d.nodeKeys)
    });
  }
  if (o.nodes.size === 0)
    throw new Error("Could not parse Mermaid nodes. Try simple flowchart syntax like A-->B.");
  return o;
}
function Gf(t) {
  const e = t.indexOf(":");
  if (e < 0) return null;
  const o = t.slice(0, e).trim(), n = t.slice(e + 1).trim();
  if (!o || !n) return null;
  const r = [
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
  for (const s of r) {
    const i = o.indexOf(s);
    if (i < 0) continue;
    const l = o.slice(0, i).trim(), d = o.slice(i + s.length).trim();
    if (!(!ba.test(l) || !ba.test(d)))
      return {
        from: l,
        arrow: s,
        to: d,
        label: Ye(n)
      };
  }
  return null;
}
function jf(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: Ye(e[3])
  } : null;
}
function Vf(t) {
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
function Kf(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const n = o.indexOf(" "), r = n >= 0 ? o.slice(0, n) : o, s = n >= 0 ? o.slice(n + 1).trim() : "";
  return Vf(r) ? { color: r, label: s || void 0 } : { label: o };
}
function qf(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`).map((f) => f.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (e.length === 0)
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  if (!/^sequenceDiagram\b/i.test(e[0]))
    throw new Error("Not a Mermaid sequence diagram.");
  const o = /* @__PURE__ */ new Set(), n = [], r = [], s = [], i = [], l = [], d = [];
  let c = 0;
  const a = (f) => {
    o.has(f) || (o.add(f), n.push(f));
    for (const y of d) y.participants.add(f);
  };
  for (let f = 1; f < e.length; f++) {
    const y = e[f];
    if (/^autonumber\b/i.test(y)) continue;
    const p = Kf(y);
    if (p) {
      d.push({ type: "box", label: p.label, color: p.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const g = y.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (g) {
      d.push({
        type: "loop",
        label: g[1] ? Ye(g[1]) : void 0,
        startStep: c,
        participants: /* @__PURE__ */ new Set()
      });
      continue;
    }
    if (/^end\b/i.test(y)) {
      const w = d.pop();
      (w == null ? void 0 : w.type) === "box" ? l.push(w) : (w == null ? void 0 : w.type) === "loop" && i.push({
        label: w.label,
        startStep: w.startStep,
        endStep: c,
        participants: w.participants
      });
      continue;
    }
    const m = y.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (m) {
      a(m[1]);
      continue;
    }
    const x = jf(y);
    if (x) {
      a(x.of), s.push({ step: c, note: x });
      continue;
    }
    const b = Gf(y);
    if (b) {
      a(b.from), a(b.to), r.push(b), c += 1;
      continue;
    }
  }
  for (; d.length > 0; ) {
    const f = d.pop();
    f.type === "box" ? l.push(f) : i.push({
      label: f.label,
      startStep: f.startStep,
      endStep: c,
      participants: f.participants
    });
  }
  const u = n;
  if (u.length === 0)
    throw new Error("No participants found in sequenceDiagram.");
  if (r.length === 0 && s.length === 0)
    throw new Error("No messages/notes found in sequenceDiagram.");
  return {
    participants: u,
    messages: r,
    notes: s,
    loops: i.map((f) => ({
      label: f.label,
      startStep: f.startStep,
      endStep: f.endStep,
      participants: Array.from(f.participants)
    })).filter((f) => f.endStep >= f.startStep),
    groups: l.map((f) => ({
      label: f.label,
      color: f.color,
      participants: Array.from(f.participants)
    })).filter((f) => f.participants.length > 0)
  };
}
function dr(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function Uf(t) {
  const e = Array.from(t.nodes.keys()).sort(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const c of e)
    o.set(c, 0), n.set(c, []);
  for (const c of t.edges)
    !o.has(c.fromKey) || !o.has(c.toKey) || (n.get(c.fromKey).push(c.toKey), o.set(c.toKey, (o.get(c.toKey) ?? 0) + 1));
  const r = e.filter((c) => (o.get(c) ?? 0) === 0), s = /* @__PURE__ */ new Map();
  for (const c of r) s.set(c, 0);
  const i = [...r];
  for (; i.length > 0; ) {
    const c = i.shift(), a = s.get(c) ?? 0;
    for (const u of n.get(c) ?? []) {
      const f = Math.max(s.get(u) ?? 0, a + 1);
      s.set(u, f), o.set(u, (o.get(u) ?? 0) - 1), (o.get(u) ?? 0) <= 0 && i.push(u);
    }
  }
  let l = 0;
  for (const c of s.values()) l = Math.max(l, c);
  for (const c of e)
    s.has(c) || (l += 1, s.set(c, l));
  const d = /* @__PURE__ */ new Map();
  for (const c of e) {
    const a = s.get(c) ?? 0;
    d.has(a) || d.set(a, []), d.get(a).push(c);
  }
  return Array.from(d.entries()).sort((c, a) => c[0] - a[0]).map(([, c]) => c.sort());
}
function Zf(t, e, o, n) {
  const r = qf(t), s = [], i = [], l = 6, d = "#94a3b8", c = 3, a = "#475569", u = 180, f = 64, y = 270, p = o - 140, g = p + f + 8, m = 88, x = Math.max(1, r.messages.length), b = g + x * m + 40, w = b + 12, M = w + f, v = /* @__PURE__ */ new Map();
  for (const C of r.groups) {
    const T = C.participants.map((rt) => v.get(rt)).filter((rt) => typeof rt == "number");
    if (T.length === 0)
      for (const rt of C.participants) {
        const pt = r.participants.indexOf(rt);
        pt >= 0 && T.push(e + (pt - (r.participants.length - 1) / 2) * y);
      }
    if (T.length === 0) continue;
    const E = Math.min(...T) - u / 2 - 24, z = Math.max(...T) + u / 2 + 24, j = p - 22, Y = M - j + 18, nt = {
      id: Rt(10),
      type: "shape",
      x: E,
      y: j,
      w: z - E,
      h: Y,
      z: n(),
      data: {
        shape: "rect",
        stroke: C.color ? C.color : "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: C.color ? C.color : "#334155",
        fillStyle: "solid",
        opacity: C.color ? 0.2 : 0.08,
        edgeStyle: "sharp"
      }
    };
    if (s.push(nt), i.push(nt.id), C.label) {
      const rt = {
        id: Rt(10),
        type: "text",
        x: E + 10,
        y: j + 8,
        w: Math.max(120, z - E - 20),
        h: "auto",
        z: n(),
        data: {
          text: C.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      s.push(rt);
    }
  }
  for (let C = 0; C < r.participants.length; C++) {
    const T = r.participants[C], E = e + (C - (r.participants.length - 1) / 2) * y;
    v.set(T, E);
    const z = {
      id: Rt(10),
      type: "shape",
      x: E - u / 2,
      y: p,
      w: u,
      h: f,
      z: n(),
      data: {
        shape: "rect",
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        edgeStyle: "round",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        label: T,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(z), i.push(z.id);
    const j = {
      id: Rt(10),
      type: "shape",
      x: E - l / 2,
      y: g,
      w: l,
      h: b - g,
      z: n(),
      data: {
        shape: "rect",
        stroke: d,
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 0,
        fill: d,
        fillStyle: "solid",
        opacity: 0.3,
        edgeStyle: "round"
      }
    };
    s.push(j);
    const Y = {
      id: Rt(10),
      type: "shape",
      x: E - u / 2,
      y: w,
      w: u,
      h: f,
      z: n(),
      data: {
        shape: "rect",
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        edgeStyle: "round",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        label: T,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(Y), i.push(Y.id);
  }
  for (const C of r.loops) {
    const T = C.participants.map((W) => v.get(W)).filter((W) => typeof W == "number");
    if (T.length === 0) continue;
    const E = Math.min(...T) - 130, z = Math.max(...T) + 130, j = C.startStep + 1, Y = Math.max(j, C.endStep), nt = g + (j - 1) * m + 16, rt = g + Y * m + 34, pt = {
      id: Rt(10),
      type: "shape",
      x: E,
      y: nt,
      w: z - E,
      h: Math.max(90, rt - nt),
      z: n(),
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
    s.push(pt);
    const xt = `loop${C.label ? ` [${C.label}]` : ""}`, mt = {
      id: Rt(10),
      type: "text",
      x: E + 10,
      y: nt + 8,
      w: z - E - 20,
      h: "auto",
      z: n(),
      data: {
        text: xt,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#1f2937",
        align: "left"
      }
    };
    s.push(mt);
  }
  for (let C = 0; C < r.messages.length; C++) {
    const T = r.messages[C], E = g + (C + 1) * m, z = v.get(T.from), j = v.get(T.to);
    if (z == null || j == null) continue;
    const Y = z === j, nt = Math.min(z, j), rt = Math.max(z, j), pt = Math.max(rt - nt, 40), xt = z <= j ? 0 : pt, mt = z <= j ? pt : 0, W = T.arrow.includes("--") || T.arrow === "-.->", B = T.arrow.toLowerCase().includes("x"), G = T.arrow.includes(">") || T.arrow.includes(")");
    if (Y) {
      const $ = z + 6, st = E - 16, it = 92, U = 48, tt = W ? "dashed" : "solid", dt = {
        id: Rt(10),
        type: "shape",
        x: $,
        y: st,
        w: it,
        h: c,
        z: n(),
        data: {
          shape: "rect",
          stroke: a,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: a,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, _ = {
        id: Rt(10),
        type: "shape",
        x: $ + it - c,
        y: st,
        w: c,
        h: U,
        z: n(),
        data: {
          shape: "rect",
          stroke: a,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: a,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, ht = {
        id: Rt(10),
        type: "shape",
        x: $,
        y: st + U - c,
        w: it,
        h: c,
        z: n(),
        data: {
          shape: G ? "arrow" : "line",
          stroke: a,
          strokeWidth: c,
          strokeStyle: tt,
          roughness: 0,
          startPoint: [it, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(dt, _, ht);
    } else {
      const $ = {
        id: Rt(10),
        type: "shape",
        x: nt,
        y: E - 14,
        w: pt,
        h: 28,
        z: n(),
        data: {
          shape: G ? "arrow" : "line",
          stroke: a,
          strokeWidth: c,
          strokeStyle: W ? "dashed" : "solid",
          roughness: 0,
          startPoint: [xt, 14],
          endPoint: [mt, 14]
        }
      };
      s.push($);
    }
    const q = Y ? z + 18 : nt, J = Y ? 170 : pt, H = {
      id: Rt(10),
      type: "text",
      x: q,
      y: E - 46,
      w: J,
      h: "auto",
      z: n(),
      data: {
        text: T.label,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "center"
      }
    };
    if (s.push(H), B) {
      const $ = z <= j ? nt + pt - 14 : nt + 8, st = {
        id: Rt(10),
        type: "text",
        x: $,
        y: E - 20,
        w: 20,
        h: "auto",
        z: n(),
        data: {
          text: "×",
          fontSize: 16,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "center"
        }
      };
      s.push(st);
    }
  }
  for (const C of r.notes) {
    const T = g + (C.step + 1) * m, E = v.get(C.note.of);
    if (E == null) continue;
    let z = E;
    C.note.side === "right" && (z += 130), C.note.side === "left" && (z -= 300), C.note.side === "over" && (z -= 110);
    const j = {
      id: Rt(10),
      type: "text",
      x: z,
      y: T - 8,
      w: 260,
      h: "auto",
      z: n(),
      data: {
        text: C.note.text,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "left"
      }
    };
    s.push(j);
  }
  return { nodes: s, shapeNodeIds: i };
}
function Qf(t, e, o, n) {
  const r = t.trimStart();
  if (/^sequenceDiagram\b/i.test(r))
    return Zf(t, e, o, n);
  const s = Yf(t), i = Uf(s), l = Array.from(s.nodes.values()).map((m) => dr(m.shape)), d = l.length > 0 ? Math.max(...l.map((m) => m.h)) : 96, c = Math.max(d + 130, 260), a = /* @__PURE__ */ new Map(), u = i.length;
  for (let m = 0; m < i.length; m++) {
    const x = i[m], b = x.length, w = (m - (u - 1) / 2) * c, M = x.length > 0 ? Math.max(
      ...x.map((C) => {
        const T = s.nodes.get(C);
        return T ? dr(T.shape).w : 200;
      })
    ) : 200, v = Math.max(M + 90, 260);
    for (let C = 0; C < x.length; C++) {
      const T = x[C], E = (C - (b - 1) / 2) * v;
      if (s.direction === "LR" || s.direction === "RL") {
        const z = s.direction === "LR" ? e + w : e - w, j = o + E;
        a.set(T, { x: z, y: j });
      } else {
        const z = e + E, j = s.direction === "TB" ? o + w : o - w;
        a.set(T, { x: z, y: j });
      }
    }
  }
  const f = /* @__PURE__ */ new Map(), y = [], p = [], g = /* @__PURE__ */ new Map();
  for (const m of s.groups) {
    if (!m.nodeKeys.length) continue;
    const x = m.nodeKeys.map((T) => {
      const E = s.nodes.get(T), z = a.get(T);
      if (!E || !z) return null;
      const j = dr(E.shape);
      return { x: z.x - j.w / 2, y: z.y - j.h / 2, w: j.w, h: j.h };
    }).filter((T) => !!T);
    if (!x.length) continue;
    const b = Math.min(...x.map((T) => T.x)) - 30, w = Math.max(...x.map((T) => T.x + T.w)) + 30, M = Math.min(...x.map((T) => T.y)) - 34, v = Math.max(...x.map((T) => T.y + T.h)) + 24, C = {
      id: Rt(10),
      type: "shape",
      x: b,
      y: M,
      w: w - b,
      h: v - M,
      z: n(),
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
    if (y.push(C), p.push(C.id), m.label) {
      const T = {
        id: Rt(10),
        type: "text",
        x: b + 10,
        y: M + 8,
        w: Math.max(120, w - b - 20),
        h: "auto",
        z: n(),
        data: {
          text: m.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      y.push(T);
    }
  }
  for (const [m, x] of s.nodes) {
    const b = a.get(m) ?? { x: e, y: o }, w = dr(x.shape), M = {
      id: Rt(10),
      type: "shape",
      x: b.x - w.w / 2,
      y: b.y - w.h / 2,
      w: w.w,
      h: w.h,
      z: n(),
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
    y.push(M), p.push(M.id), f.set(m, M.id), g.set(m, { x: M.x, y: M.y, w: w.w, h: w.h });
  }
  for (const m of s.edges) {
    const x = f.get(m.fromKey), b = f.get(m.toKey);
    if (!x || !b || x === b) continue;
    const w = {
      id: Rt(10),
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: n(),
      data: {
        fromId: x,
        toId: b,
        label: m.label,
        style: "solid",
        color: "#64748b",
        strokeWidth: 2,
        arrowHead: "arrow",
        edgeType: "bezier"
      }
    };
    y.push(w);
  }
  return { nodes: y, shapeNodeIds: p };
}
const xa = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function Jf({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n
}) {
  const r = oe(), { labels: s } = _t(), i = ut(null), [l, d] = et(xa), [c, a] = et(null), [u, f] = et(null);
  ri(e && !!n, n, i, [
    l.length,
    c,
    u
  ]), St(() => {
    if (!e) return;
    const g = (m) => {
      i.current && !i.current.contains(m.target) && o();
    };
    return document.addEventListener("pointerdown", g), () => document.removeEventListener("pointerdown", g);
  }, [e, o]);
  const y = Kt(
    () => s.mermaidSupportedHint,
    [s.mermaidSupportedHint]
  ), p = lt(() => {
    try {
      const g = window.innerWidth / 2, m = window.innerHeight / 2, x = t.screenToCanvas(g, m), { nodes: b, shapeNodeIds: w } = Qf(l, x.x, x.y, () => t.nextZ());
      if (b.length === 0)
        throw new Error(s.mermaidNoNodesParsed);
      t.addNodes(b), w.length > 0 && t.selectMultiple(w), a(null), f(
        s.mermaidInsertedSummary.replace("{nodes}", String(w.length)).replace("{edges}", String(b.length - w.length))
      );
    } catch (g) {
      f(null), a(g instanceof Error ? g.message : s.mermaidParseFailed);
    }
  }, [t, s.mermaidInsertedSummary, s.mermaidNoNodesParsed, s.mermaidParseFailed, l]);
  return !e || !n ? null : Ze(
    /* @__PURE__ */ S(
      "div",
      {
        ref: i,
        style: {
          position: "fixed",
          left: n.right + 8,
          top: n.top,
          background: r.panelBg,
          border: `1px solid ${r.border}`,
          borderRadius: r.panelBorderRadius,
          boxShadow: r.panelShadow,
          width: 340,
          maxHeight: "min(520px, calc(100dvh - 16px))",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          zIndex: 99999
        },
        onPointerDown: (g) => g.stopPropagation(),
        children: [
          /* @__PURE__ */ S("div", { style: { padding: "10px 12px 8px", borderBottom: `1px solid ${r.border}` }, children: [
            /* @__PURE__ */ h("div", { style: { fontSize: 12, fontWeight: 700, color: r.text }, children: s.mermaidSketchTitle }),
            /* @__PURE__ */ h("div", { style: { marginTop: 4, fontSize: 10, color: r.textMuted, lineHeight: 1.45 }, children: y })
          ] }),
          /* @__PURE__ */ S("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ h(
              "textarea",
              {
                value: l,
                onChange: (g) => d(g.target.value),
                spellCheck: !1,
                style: {
                  width: "100%",
                  minHeight: 180,
                  resize: "vertical",
                  padding: "8px 10px",
                  borderRadius: r.controlBorderRadius,
                  border: `1px solid ${r.border}`,
                  background: r.controlBg,
                  color: r.text,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 11,
                  lineHeight: 1.4,
                  boxSizing: "border-box"
                }
              }
            ),
            c && /* @__PURE__ */ h("div", { style: { fontSize: 10, color: "#ef4444" }, children: c }),
            u && /* @__PURE__ */ h("div", { style: { fontSize: 10, color: "#16a34a" }, children: u }),
            /* @__PURE__ */ S("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => d(xa),
                  style: {
                    border: `1px solid ${r.border}`,
                    background: "transparent",
                    color: r.text,
                    borderRadius: r.controlBorderRadius,
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
                  onClick: p,
                  style: {
                    border: `1px solid ${r.border}`,
                    background: r.controlBgActive,
                    color: r.text,
                    borderRadius: r.controlBorderRadius,
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
const $f = [
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
], jo = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, $t = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Vo({ name: t, size: e = 18, textGlyph: o = "T" }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...$t }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ...$t })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...$t }),
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
    t === "note" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ...$t }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...$t }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...$t, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...$t, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...$t, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...$t }),
      /* @__PURE__ */ h("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...$t }),
      /* @__PURE__ */ h("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...$t }),
      /* @__PURE__ */ h("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...$t })
    ] }),
    t === "edge" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("circle", { cx: "5", cy: "5", r: "2.5", ...$t, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ h("circle", { cx: "19", cy: "19", r: "2.5", ...$t, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "7", x2: "17", y2: "17", ...$t }),
      /* @__PURE__ */ h("polyline", { points: "14,17 17,17 17,14", ...$t, fill: "none" })
    ] }),
    t === "erase" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...$t }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ...$t })
    ] }),
    t === "laser" && /* @__PURE__ */ h("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ h("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...$t, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...$t, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...$t, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...$t, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...$t, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ...$t }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...$t }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...$t })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...$t }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...$t })
    ] }),
    t === "paper" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...$t }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...$t, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...$t, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...$t, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...$t }),
      /* @__PURE__ */ h("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...$t }),
      /* @__PURE__ */ h("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...$t }),
      /* @__PURE__ */ h("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...$t })
    ] }),
    t === "library" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...$t }),
      /* @__PURE__ */ h("path", { d: "M8 7h6", ...$t, opacity: 0.5 }),
      /* @__PURE__ */ h("path", { d: "M8 11h4", ...$t, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...$t }),
      /* @__PURE__ */ h("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ...$t }),
      /* @__PURE__ */ h("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ...$t }),
      /* @__PURE__ */ h("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
function _f({
  engine: t,
  background: e
}) {
  const o = oe(), { labels: n } = _t(), [r, s] = et(!1), i = {
    light: n.paperGroupLight,
    dark: n.paperGroupDark,
    textured: n.paperGroupTextured
  }, l = {
    "plain-white": n.paperWhite,
    "dot-grid": n.paperCream,
    engineering: n.paperWarm,
    blueprint: n.paperBlueprint,
    "dark-grid": n.paperNight,
    "japanese-stationery": n.paperJapaneseStationery,
    kraft: n.paperKraftPaper
  }, d = ut(null), c = ut(null);
  Ml(r, d, c, []), St(() => {
    if (!r) return;
    const f = (y) => {
      c.current && !c.current.contains(y.target) && d.current && !d.current.contains(y.target) && s(!1);
    };
    return document.addEventListener("pointerdown", f), () => document.removeEventListener("pointerdown", f);
  }, [r]);
  const a = pn.find((f) => f.key === e) ?? pn[1], u = r && d.current ? (() => {
    const f = d.current.getBoundingClientRect();
    return Ze(
      /* @__PURE__ */ h(
        "div",
        {
          ref: c,
          style: {
            position: "fixed",
            left: f.right + 8,
            top: f.top,
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
          onPointerDown: (y) => y.stopPropagation(),
          children: ["light", "dark", "textured"].map((y) => {
            const p = pn.filter((g) => g.group === y);
            return p.length === 0 ? null : /* @__PURE__ */ S("div", { style: { marginBottom: 6 }, children: [
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
                  children: i[y]
                }
              ),
              p.map((g) => /* @__PURE__ */ S(
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
                    /* @__PURE__ */ h(
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
                    l[g.key] ?? g.label
                  ]
                },
                g.key
              ))
            ] }, y);
          })
        }
      ),
      document.body
    );
  })() : null;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S(
      "button",
      {
        ref: d,
        title: n.paperType,
        onClick: () => s((f) => !f),
        style: {
          ...jo,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: r ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ h(Vo, { name: "paper" }),
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
                background: a.swatchColor,
                border: `1px solid ${o.border}`
              }
            }
          )
        ]
      }
    ),
    u
  ] });
}
function ty({ engine: t }) {
  const e = oe(), { labels: o } = _t(), [n, r] = et(!1), s = ut(null), i = ut(null);
  Ml(n, s, i, []), St(() => {
    if (!n) return;
    const d = (c) => {
      i.current && !i.current.contains(c.target) && s.current && !s.current.contains(c.target) && r(!1);
    };
    return document.addEventListener("pointerdown", d), () => document.removeEventListener("pointerdown", d);
  }, [n]);
  const l = n && s.current ? (() => {
    const d = s.current.getBoundingClientRect();
    return Ze(
      /* @__PURE__ */ S(
        "div",
        {
          ref: i,
          style: {
            position: "fixed",
            left: d.right + 8,
            top: d.top,
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
            Ba.map((c) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => {
                  const a = typeof window < "u" ? window : void 0;
                  if (!a) return;
                  const u = a.innerWidth / 2, f = a.innerHeight / 2, y = un(t.viewport, u, f);
                  t.applyTemplate(c.id, y.x, y.y), r(!1);
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
                onMouseEnter: (a) => {
                  a.currentTarget.style.background = e.controlBgActive;
                },
                onMouseLeave: (a) => {
                  a.currentTarget.style.background = "transparent";
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
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: s,
        title: o.templatesTitle,
        onClick: () => r((d) => !d),
        style: {
          ...jo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: n ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Vo, { name: "template" })
      }
    ),
    l
  ] });
}
function ey({ engine: t }) {
  const e = oe(), { labels: o } = _t(), [n, r] = et(!1), [s, i] = et(!1), l = ut(null), [d, c] = et(null), a = lt(() => {
    r((y) => (!y && l.current && c(l.current.getBoundingClientRect()), !y));
  }, []), u = lt(() => r(!1), []), f = lt(() => {
    i(!0);
  }, []);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: l,
        title: o.librariesTitle,
        onClick: a,
        style: {
          ...jo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: n ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Vo, { name: "library" })
      }
    ),
    /* @__PURE__ */ h(
      up,
      {
        engine: t,
        open: n,
        onClose: u,
        triggerRect: d,
        onBrowseDirectory: f
      }
    ),
    s && /* @__PURE__ */ h(
      Wf,
      {
        onClose: () => i(!1),
        onInstalled: () => {
          r(!1), setTimeout(() => {
            l.current && c(l.current.getBoundingClientRect()), r(!0);
          }, 100);
        }
      }
    )
  ] });
}
function oy({ engine: t, baseUrl: e }) {
  const o = oe(), { labels: n } = _t(), [r, s] = et(!1), i = ut(null), [l, d] = et(null), c = lt(() => {
    s((u) => (!u && i.current && d(i.current.getBoundingClientRect()), !u));
  }, []), a = lt(() => s(!1), []);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: i,
        title: n.gifSearchTitle,
        onClick: c,
        style: {
          ...jo,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: r ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ h(Vo, { name: "gif" })
      }
    ),
    /* @__PURE__ */ h(
      gp,
      {
        engine: t,
        open: r,
        onClose: a,
        triggerRect: l,
        baseUrl: e
      }
    )
  ] });
}
function ny({ engine: t }) {
  const e = oe(), { labels: o } = _t(), [n, r] = et(!1), s = ut(null), [i, l] = et(null), d = lt(() => {
    r((a) => (!a && s.current && l(s.current.getBoundingClientRect()), !a));
  }, []), c = lt(() => r(!1), []);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: s,
        title: o.mermaidSketchTitle,
        onClick: d,
        style: {
          ...jo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: n ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Vo, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ h(
      Jf,
      {
        engine: t,
        open: n,
        onClose: c,
        triggerRect: i
      }
    )
  ] });
}
function ry({ engine: t, gifApiBaseUrl: e }) {
  const o = oe(), { labels: n } = _t(), [r, s] = et(t.mode), [i, l] = et(t.boardBackground), [d, c] = et(t.lassoSelect);
  St(() => {
    const u = () => s(t.mode), f = () => l(t.boardBackground), y = () => c(t.lassoSelect);
    return t.on("mode", u), t.on("background", f), t.on("lassoToggle", y), () => {
      t.off("mode", u), t.off("background", f), t.off("lassoToggle", y);
    };
  }, [t]);
  const a = $f.map((u) => ({
    ...u,
    label: u.key === "select" ? n.toolSelect : u.key === "hand" ? n.toolHand : u.key === "draw" ? n.toolDraw : u.key === "shape" ? n.toolShape : u.key === "text" ? n.toolText : u.key === "note" ? n.toolNote : u.key === "sticky" ? n.toolSticky : u.key === "frame" ? n.toolFrame : u.key === "erase" ? n.toolEraser : n.toolLaser
  }));
  return /* @__PURE__ */ S(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: eo,
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
        a.map((u) => {
          const f = r === u.key && !(u.key === "select" && d);
          return /* @__PURE__ */ S(
            "button",
            {
              title: `${u.label} (${u.shortcut}${u.num ? ` / ${u.num}` : ""})`,
              onClick: () => {
                d && (t.toggleLassoSelect(), c(!1)), t.setMode(u.key);
              },
              style: {
                ...jo,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: f ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ h(Vo, { name: u.key, textGlyph: n.toolTextGlyph }),
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
                    children: u.num || u.shortcut
                  }
                )
              ]
            },
            u.key
          );
        }),
        /* @__PURE__ */ h("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ S(
          "button",
          {
            title: `${n.toolLassoSelect} (L)`,
            onClick: () => {
              d ? (t.toggleLassoSelect(), c(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), c(!0));
            },
            style: {
              ...jo,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: d ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ h(Vo, { name: "lasso" }),
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
        /* @__PURE__ */ h(_f, { engine: t, background: i }),
        /* @__PURE__ */ h(ty, { engine: t }),
        /* @__PURE__ */ h(ey, { engine: t }),
        /* @__PURE__ */ h(ny, { engine: t }),
        e && /* @__PURE__ */ h(oy, { engine: t, baseUrl: e })
      ]
    }
  );
}
const sy = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), iy = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function wa(t) {
  return t.data.opacity ?? 1;
}
function rn(t, e) {
  return t.data[e];
}
function ay(t) {
  const e = {}, o = t.filter((r) => sy.has(r.type));
  if (o.length > 0) {
    const r = wa(o[0]), s = o.every((i) => wa(i) === r);
    e.opacity = s ? r : "mixed";
  }
  const n = t.filter((r) => iy.has(r.type));
  if (n.length > 0) {
    const r = rn(n[0], "borderColor"), s = n.every(
      (a) => rn(a, "borderColor") === r
    );
    e.borderColor = s ? r ?? null : "mixed";
    const i = rn(n[0], "borderWidth") ?? 1, l = n.every(
      (a) => (rn(a, "borderWidth") ?? 1) === i
    );
    e.borderWidth = l ? i : "mixed";
    const d = rn(n[0], "borderStyle") ?? "solid", c = n.every(
      (a) => (rn(a, "borderStyle") ?? "solid") === d
    );
    e.borderStyle = c ? d : "mixed";
  }
  return e;
}
function ly(t) {
  const [e, o] = et(t.mode), [n, r] = et(new Set(t.selection)), [, s] = et(0);
  if (St(() => {
    const a = () => o(t.mode), u = () => {
      r(new Set(t.selection)), s((y) => y + 1);
    }, f = () => s((y) => y + 1);
    return t.on("mode", a), t.on("selection", u), t.on("change", f), () => {
      t.off("mode", a), t.off("selection", u), t.off("change", f);
    };
  }, [t]), n.size === 0)
    return e === "draw" || e === "shape" || e === "text" || e === "edge" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
  const i = [];
  for (const a of n) {
    const u = t.getNode(a);
    u && i.push(u);
  }
  if (i.length === 0)
    return { target: { kind: "none" }, commonProps: {} };
  if (i.length === 1)
    return { target: { kind: "single", node: i[0] }, commonProps: {} };
  const l = /* @__PURE__ */ new Map();
  for (const a of i) {
    const u = l.get(a.type);
    u ? u.push(a) : l.set(a.type, [a]);
  }
  const d = [];
  for (const [a, u] of l)
    d.push({ type: a, nodes: u });
  const c = ay(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: d },
    commonProps: c
  };
}
const Xn = Bn(null);
function Qe(t, e) {
  const o = Ge(Xn), n = Ge(gn);
  return lt(
    (r) => {
      const s = n == null ? void 0 : n(), i = {
        ...e.data,
        ...r
      };
      if (s) {
        if (o && o.length > 1) {
          const l = o.map((d) => ({
            id: d.id,
            patch: {
              data: { ...d.data, ...r }
            }
          }));
          t.batchUpdateWithHistoryCoalesced(l, s);
        } else
          t.updateNodeWithHistoryCoalesced(
            e.id,
            { data: i },
            s
          );
        return;
      }
      if (o && o.length > 1) {
        const l = o.map((d) => ({
          id: d.id,
          patch: {
            data: { ...d.data, ...r }
          }
        }));
        t.batchUpdateWithHistory(l);
      } else
        t.updateNodeWithHistory(e.id, {
          data: i
        });
    },
    [t, e, o, n]
  );
}
function je({
  value: t,
  onChange: e,
  mixed: o
}) {
  const n = oe(), { labels: r } = _t(), s = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorOpacity }),
    /* @__PURE__ */ h(
      "input",
      {
        type: "range",
        min: 0,
        max: 100,
        value: s,
        onChange: (i) => e(parseInt(i.target.value) / 100),
        style: { flex: 1, accentColor: n.accentColor }
      }
    ),
    /* @__PURE__ */ h("span", { style: { width: 28, textAlign: "right", fontSize: 10, color: o ? n.textFaint : n.text }, children: o ? "--" : s })
  ] });
}
const cy = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function Ae({
  label: t,
  palettes: e,
  value: o,
  onChange: n,
  allowNull: r,
  mixed: s
}) {
  const i = oe(), { labels: l } = _t(), [d, c] = et(""), [a, u] = et(0), [f, y] = et(!1), p = ut(null), g = ut(null), [m, x] = et(null), [b, w] = et("bottom"), M = e[a] ?? e[0], v = M.name === "Standard" ? l.paletteStandard : M.name, C = o == null ? void 0 : o.toLowerCase();
  St(() => {
    if (!f) return;
    const z = (j) => {
      p.current && !p.current.contains(j.target) && y(!1);
    };
    return document.addEventListener("mousedown", z), () => document.removeEventListener("mousedown", z);
  }, [f]), St(() => {
    if (!f) return;
    const z = () => {
      const j = g.current;
      if (!j) return;
      const Y = j.getBoundingClientRect(), rt = e.length * 30 + 10, pt = window.innerHeight - Y.bottom, xt = Y.top, mt = pt < rt && xt > pt;
      w(mt ? "top" : "bottom"), x({
        top: mt ? Y.top - 4 : Y.bottom + 4,
        left: Y.right
      });
    };
    return z(), window.addEventListener("resize", z), window.addEventListener("scroll", z, !0), () => {
      window.removeEventListener("resize", z), window.removeEventListener("scroll", z, !0);
    };
  }, [f]);
  const T = () => {
    const z = d.trim();
    if (!z) return;
    const j = z.startsWith("#") ? z : `#${z}`;
    cy.test(j) && (n(j), c(""));
  }, E = e.some(
    (z) => z.colors.some((j) => j.toLowerCase() === C)
  );
  return /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 }, children: [
    /* @__PURE__ */ h("span", { style: { ...Ot, color: i.textMuted, paddingTop: 2 }, children: t }),
    /* @__PURE__ */ S("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }, children: [
        r && /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n(null),
            title: l.inspectorNone,
            style: {
              ...re,
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
        M.colors.map((z) => {
          const j = !s && C === z.toLowerCase();
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => n(z),
              style: {
                ...re,
                width: 20,
                height: 20,
                background: z,
                border: j ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
                borderRadius: "50%"
              }
            },
            z
          );
        }),
        o && !E && !s && /* @__PURE__ */ h(
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
        s && /* @__PURE__ */ h("span", { style: { fontSize: 9, color: i.textMuted, fontStyle: "italic" }, children: l.inspectorMixed })
      ] }),
      e.length > 1 && /* @__PURE__ */ h("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ S("div", { ref: g, style: { position: "relative" }, children: [
        /* @__PURE__ */ S(
          "button",
          {
            onClick: () => y((z) => !z),
            title: l.inspectorSwitchPalette,
            style: {
              ...re,
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
              v,
              /* @__PURE__ */ h("span", { style: { fontSize: 7 }, children: f ? "▲" : "▼" })
            ]
          }
        ),
        f && m && Ze(
          /* @__PURE__ */ h(
            "div",
            {
              ref: p,
              style: {
                position: "fixed",
                top: m.top,
                left: m.left,
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
              children: e.map((z, j) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    u(j), y(!1);
                  },
                  style: {
                    ...re,
                    height: 28,
                    padding: "0 8px",
                    background: j === a ? i.controlBgActive : "transparent",
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
                    /* @__PURE__ */ h("span", { style: { display: "flex", gap: 2 }, children: z.colors.slice(0, 6).map((Y) => /* @__PURE__ */ h(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: Y,
                          display: "inline-block"
                        }
                      },
                      Y
                    )) }),
                    /* @__PURE__ */ h("span", { children: z.name === "Standard" ? l.paletteStandard : z.name })
                  ]
                },
                z.name
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
          value: d,
          onChange: (z) => c(z.target.value),
          onKeyDown: (z) => {
            z.key === "Enter" && T();
          },
          onBlur: T,
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
function Ko({
  label: t,
  value: e,
  onChange: o,
  mixed: n
}) {
  const r = oe();
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Ot, color: r.textMuted }, children: t }),
    Af.map((s) => /* @__PURE__ */ h(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...re,
          width: 36,
          height: 28,
          background: !n && e === s.key ? r.controlBgActive : r.controlBg,
          borderRadius: r.controlBorderRadius
        },
        children: /* @__PURE__ */ h("svg", { width: 24, height: 12, children: /* @__PURE__ */ h(
          "line",
          {
            x1: 2,
            y1: 6,
            x2: 22,
            y2: 6,
            stroke: r.text,
            strokeWidth: 2,
            strokeDasharray: s.dash
          }
        ) })
      },
      s.key
    ))
  ] });
}
function qo({
  label: t,
  widths: e = Ef,
  value: o,
  onChange: n,
  mixed: r
}) {
  const s = oe();
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Ot, color: s.textMuted }, children: t }),
    /* @__PURE__ */ h("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }, children: e.map((i) => /* @__PURE__ */ h(
      "button",
      {
        title: `${i}px`,
        onClick: () => n(i),
        style: {
          ...re,
          width: 30,
          height: 24,
          background: !r && o === i ? s.controlBgActive : s.controlBg,
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
function Yn({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: n,
  onChange: r
}) {
  const { labels: s } = _t();
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      Ae,
      {
        label: s.inspectorBorder,
        palettes: He,
        value: t,
        onChange: (i) => r("borderColor", i ?? void 0),
        allowNull: !0,
        mixed: n == null ? void 0 : n.color
      }
    ),
    (t || (n == null ? void 0 : n.color)) && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        Ko,
        {
          label: s.inspectorStyle,
          value: e ?? "solid",
          onChange: (i) => r("borderStyle", i),
          mixed: n == null ? void 0 : n.style
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: s.inspectorWidth,
          value: o ?? 1,
          onChange: (i) => r("borderWidth", i),
          mixed: n == null ? void 0 : n.width
        }
      )
    ] })
  ] });
}
const ds = /* @__PURE__ */ new Map();
function Ee({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: n,
  onToggle: r,
  persistKey: s,
  children: i
}) {
  const l = oe(), [d, c] = et(() => s && ds.has(s) ? !!ds.get(s) : e), a = n ?? d, u = o === "group", f = ut(null), [y, p] = et(0);
  return St(() => {
    !s || n !== void 0 || ds.set(s, a);
  }, [s, n, a]), Co(() => {
    const g = f.current;
    if (!g) return;
    const m = () => p(g.scrollHeight);
    m();
    const x = new ResizeObserver(() => m());
    return x.observe(g), () => x.disconnect();
  }, [i]), /* @__PURE__ */ S(
    "section",
    {
      style: {
        border: `1px solid ${l.border}`,
        borderRadius: l.controlBorderRadius,
        background: u ? l.panelBg : l.controlBg,
        overflow: "hidden",
        flexShrink: 0,
        alignSelf: "stretch"
      },
      children: [
        /* @__PURE__ */ S(
          "button",
          {
            type: "button",
            onClick: () => {
              r ? r() : c((g) => !g);
            },
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "transparent",
              border: "none",
              color: u ? l.textMuted : l.textSecondary,
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
                    color: l.textMuted,
                    display: "inline-block",
                    transform: a ? "rotate(90deg)" : "rotate(0deg)",
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
              maxHeight: a ? y : 0,
              opacity: a ? 1 : 0,
              transition: "max-height 200ms ease, opacity 140ms ease",
              overflow: "hidden",
              pointerEvents: a ? "auto" : "none"
            },
            children: /* @__PURE__ */ h(
              "div",
              {
                ref: f,
                style: {
                  padding: "8px 10px 10px",
                  borderTop: `1px solid ${l.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: u ? "transparent" : l.controlBg
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
function ui({ style: t }) {
  const e = oe();
  return t === "hachure" ? /* @__PURE__ */ S("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ h("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ h("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ S("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ h("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: e.text, strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ h("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ h("rect", { x: 2, y: 2, width: 16, height: 12, fill: e.text, rx: 2 }) });
}
const dy = /* @__PURE__ */ S("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ h("path", { d: "m21 21-4.35-4.35" })
] });
function Lr({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: n
}) {
  var x, b;
  const r = oe(), [s, i] = et(!1), [l, d] = et(""), c = ut(null), a = ut(null), u = ut(null), f = l.trim().toLowerCase(), y = Kt(
    () => o.filter((w) => w.toLowerCase().includes(f)),
    [o, f]
  ), p = Kt(
    () => hr.filter(
      (w) => !o.includes(w.key) && (w.key.toLowerCase().includes(f) || w.label.toLowerCase().includes(f))
    ),
    [o, f]
  );
  Co(() => {
    if (!s || !u.current) return;
    const w = u.current, M = w.ownerDocument.defaultView ?? window, v = 260, C = 16, T = () => {
      var pt;
      const z = (pt = a.current) == null ? void 0 : pt.getBoundingClientRect();
      if (!z) return;
      let j = z.left;
      j + v > M.innerWidth - C && (j = M.innerWidth - v - C), j < C && (j = C);
      const Y = z.bottom + 4, nt = w.getBoundingClientRect(), rt = vl(j, Y, nt.width, nt.height, M, C);
      w.style.left = `${rt.left}px`, w.style.top = `${rt.top}px`;
    };
    T();
    const E = new ResizeObserver(T);
    return E.observe(w), () => E.disconnect();
  }, [s, l, y.length, p.length]), St(() => {
    var v;
    if (!s) return;
    const w = (C) => {
      var j, Y;
      const T = C.target;
      if ((j = c.current) != null && j.contains(T)) return;
      const z = (((Y = c.current) == null ? void 0 : Y.ownerDocument) ?? document).getElementById("font-picker-popover");
      z != null && z.contains(T) || i(!1);
    }, M = ((v = c.current) == null ? void 0 : v.ownerDocument) ?? document;
    return M.addEventListener("mousedown", w), () => M.removeEventListener("mousedown", w);
  }, [s]);
  const g = (w) => {
    e(w), i(!1), d("");
  }, m = (w, M) => {
    const v = (M == null ? void 0 : M.label) ?? w, C = M == null ? void 0 : M.category, T = t === w;
    return /* @__PURE__ */ S(
      "button",
      {
        type: "button",
        onClick: () => g(w),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: T ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: wo(w),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (E) => {
          T || (E.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (E) => {
          T || (E.currentTarget.style.background = "transparent");
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
              children: yd(C)
            }
          ),
          /* @__PURE__ */ h("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: v })
        ]
      },
      w
    );
  };
  return /* @__PURE__ */ S("div", { ref: c, style: { position: "relative", flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ S(
      "button",
      {
        ref: a,
        type: "button",
        onClick: () => i((w) => !w),
        style: {
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: 28,
          padding: "0 8px",
          background: r.controlBg,
          color: r.text,
          border: `1px solid ${r.separator}`,
          borderRadius: r.controlBorderRadius,
          fontSize: 11,
          fontFamily: wo(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...n
        },
        children: [
          /* @__PURE__ */ h("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((x = hr.find((w) => w.key === t)) == null ? void 0 : x.label) ?? t }),
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
    s && Ze(
      /* @__PURE__ */ S(
        "div",
        {
          ref: u,
          id: "font-picker-popover",
          style: {
            position: "fixed",
            top: 0,
            left: 0,
            width: 260,
            maxHeight: "min(320px, calc(100dvh - 16px))",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            zIndex: 1e4,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          },
          children: [
            /* @__PURE__ */ S(
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
                  /* @__PURE__ */ h("span", { style: { color: "#64748b", display: "flex" }, children: dy }),
                  /* @__PURE__ */ h(
                    "input",
                    {
                      type: "text",
                      placeholder: "Quick search",
                      value: l,
                      onChange: (w) => d(w.target.value),
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
            /* @__PURE__ */ S("div", { style: { overflowY: "auto", padding: 8, flex: 1 }, children: [
              y.length > 0 && /* @__PURE__ */ S("div", { style: { marginBottom: 12 }, children: [
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
                y.map((w) => m(w, hr.find((M) => M.key === w)))
              ] }),
              /* @__PURE__ */ S("div", { children: [
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
                p.length > 0 ? p.map((w) => m(w.key, w)) : /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      padding: "12px",
                      fontSize: 12,
                      color: "#94a3b8"
                    },
                    children: l ? "No fonts match your search" : "All fonts are in use"
                  }
                )
              ] })
            ] })
          ]
        }
      ),
      (((b = c.current) == null ? void 0 : b.ownerDocument) ?? document).body
    )
  ] });
}
function pi({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "sharp" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", ...o }),
    t === "round" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4", ...o })
  ] });
}
const hy = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], uy = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function py({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function Wo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((n) => e(n) === o);
}
function fy({ engine: t, node: e, fontsInScene: o }) {
  const n = oe(), { labels: r } = _t(), s = Qe(t, e), i = Ge(Xn) ?? [e], { data: l } = e, d = l.fill ?? null, c = l.fillStyle ?? "hachure", a = l.strokeStyle ?? "solid", u = Wo(i, (b) => b.data.stroke), f = Wo(i, (b) => b.data.fill ?? null), y = Wo(i, (b) => b.data.fillStyle ?? "hachure"), p = Wo(i, (b) => b.data.strokeStyle ?? "solid"), g = Wo(i, (b) => b.data.strokeWidth), m = Wo(i, (b) => b.data.roughness), x = Wo(i, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S(Ee, { title: r.inspectorStructure, persistKey: "shape.structure", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorShape }),
        uy.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ shape: b.key }),
            style: {
              ...re,
              width: 28,
              height: 28,
              background: l.shape === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ h(py, { name: b.key })
          },
          b.key
        ))
      ] }),
      (l.shape === "rect" || l.shape === "diamond") && /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorEdges }),
        [
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" }
        ].map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ edgeStyle: b.key === "sharp" ? void 0 : b.key }),
            style: {
              ...re,
              width: 28,
              height: 28,
              background: (l.edgeStyle ?? "sharp") === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ h(pi, { name: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorLabel }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "text",
            value: l.label ?? "",
            placeholder: r.inspectorLabel,
            onChange: (b) => s({ label: b.target.value || void 0 }),
            style: {
              flex: 1,
              fontSize: 12,
              padding: "4px 6px",
              background: n.controlBg,
              color: n.text,
              border: `1px solid ${n.border}`,
              borderRadius: n.controlBorderRadius,
              outline: "none"
            }
          }
        )
      ] })
    ] }),
    l.label && /* @__PURE__ */ S(Ee, { title: r.inspectorTypography, defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorFont }),
        /* @__PURE__ */ h(
          Lr,
          {
            value: l.labelFontFamily ?? "Excalifont",
            onChange: (b) => s({ labelFontFamily: b === "Excalifont" ? void 0 : b }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorSize }),
        hy.map((b) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ labelFontSize: b.size === 14 ? void 0 : b.size }),
            style: {
              ...re,
              width: 36,
              height: 28,
              background: (l.labelFontSize ?? 14) === b.size ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 10,
              fontWeight: 600,
              borderRadius: n.controlBorderRadius
            },
            children: b.label
          },
          b.size
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorAlign }),
        di.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.key,
            onClick: () => s({ labelAlign: b.key === "center" ? void 0 : b.key }),
            style: {
              ...re,
              width: 36,
              height: 28,
              background: (l.labelAlign ?? "center") === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 12,
              borderRadius: n.controlBorderRadius
            },
            children: b.label
          },
          b.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ S(Ee, { title: r.inspectorAppearance, persistKey: "shape.appearance", children: [
      /* @__PURE__ */ h(
        Ae,
        {
          label: r.inspectorStroke,
          palettes: He,
          value: u ? void 0 : l.stroke,
          mixed: u,
          onChange: (b) => s({ stroke: b })
        }
      ),
      /* @__PURE__ */ h(
        Ae,
        {
          label: r.inspectorFill,
          palettes: hi,
          value: f ? void 0 : d,
          mixed: f,
          onChange: (b) => s({ fill: b ?? void 0 }),
          allowNull: !0
        }
      ),
      d && !f && /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorFillPattern }),
        li.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ fillStyle: b.key }),
            style: {
              ...re,
              width: 36,
              height: 28,
              background: !y && c === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 9,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ h(ui, { style: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ h(
        Ko,
        {
          label: r.inspectorStrokeStyle,
          value: a,
          mixed: p,
          onChange: (b) => s({ strokeStyle: b })
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: r.inspectorStrokeWidth,
          widths: ci,
          value: l.strokeWidth,
          mixed: g,
          onChange: (b) => s({ strokeWidth: b })
        }
      ),
      /* @__PURE__ */ h(
        je,
        {
          value: l.opacity ?? 1,
          mixed: x,
          onChange: (b) => s({ opacity: b })
        }
      )
    ] }),
    /* @__PURE__ */ h(Ee, { title: r.inspectorSketch, defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorRoughness }),
      vr.map((b) => {
        const w = b.value === 0 ? r.roughnessArchitect : b.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: w,
            onClick: () => s({ roughness: b.value }),
            style: {
              ...re,
              height: 28,
              padding: "0 8px",
              background: !m && l.roughness === b.value ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 9,
              borderRadius: n.controlBorderRadius
            },
            children: w
          },
          b.value
        );
      })
    ] }) })
  ] });
}
function sn(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((n) => e(n) === o);
}
function yy({ engine: t, node: e }) {
  const o = oe(), { labels: n } = _t(), r = Qe(t, e), s = Ge(Xn) ?? [e], { data: i } = e, l = i.fill ?? null, d = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", a = sn(s, (m) => m.data.color), u = sn(s, (m) => m.data.fill ?? null), f = sn(s, (m) => m.data.fillStyle ?? "hachure"), y = sn(s, (m) => m.data.strokeStyle ?? "solid"), p = sn(s, (m) => m.data.strokeWidth), g = sn(s, (m) => m.data.opacity ?? 1);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      Ae,
      {
        label: n.inspectorStroke,
        palettes: He,
        value: a ? void 0 : i.color,
        mixed: a,
        onChange: (m) => r({ color: m })
      }
    ),
    /* @__PURE__ */ h(
      Ae,
      {
        label: n.inspectorFill,
        palettes: hi,
        value: u ? void 0 : l,
        mixed: u,
        onChange: (m) => r({ fill: m ?? void 0 }),
        allowNull: !0
      }
    ),
    l && !u && /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.inspectorFillPattern }),
      li.map((m) => /* @__PURE__ */ h(
        "button",
        {
          title: m.label,
          onClick: () => r({ fillStyle: m.key }),
          style: {
            ...re,
            width: 36,
            height: 28,
            background: !f && d === m.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(ui, { style: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Ko,
      {
        label: n.inspectorStrokeStyle,
        value: c,
        mixed: y,
        onChange: (m) => r({ strokeStyle: m })
      }
    ),
    /* @__PURE__ */ h(
      qo,
      {
        label: n.inspectorStrokeWidth,
        widths: Ul,
        value: i.strokeWidth,
        mixed: p,
        onChange: (m) => r({ strokeWidth: m })
      }
    ),
    /* @__PURE__ */ h(
      je,
      {
        value: i.opacity ?? 1,
        mixed: g,
        onChange: (m) => r({ opacity: m })
      }
    )
  ] });
}
function gy({ engine: t, node: e, fontsInScene: o }) {
  const n = oe(), { labels: r } = _t(), s = Qe(t, e), { data: i } = e;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S(Ee, { title: r.inspectorTypography, persistKey: "text.typography", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorFont }),
        /* @__PURE__ */ h(
          Lr,
          {
            value: i.fontFamily,
            onChange: (l) => s({ fontFamily: l }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorSize }),
        Ql.map((l) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ fontSize: l }),
            style: {
              ...re,
              width: 36,
              height: 28,
              background: i.fontSize === l ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 10,
              borderRadius: n.controlBorderRadius
            },
            children: l
          },
          l
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorAlign }),
        di.map((l) => /* @__PURE__ */ h(
          "button",
          {
            title: l.key,
            onClick: () => s({ align: l.key }),
            style: {
              ...re,
              width: 36,
              height: 28,
              background: i.align === l.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 12,
              borderRadius: n.controlBorderRadius
            },
            children: l.label
          },
          l.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ S(Ee, { title: r.inspectorAppearance, persistKey: "text.appearance", children: [
      /* @__PURE__ */ h(
        Ae,
        {
          label: r.inspectorStroke,
          palettes: He,
          value: i.color,
          onChange: (l) => s({ color: l })
        }
      ),
      /* @__PURE__ */ h(
        Yn,
        {
          borderColor: i.borderColor ?? null,
          borderStyle: i.borderStyle,
          borderWidth: i.borderWidth,
          onChange: (l, d) => s({ [l]: d })
        }
      ),
      /* @__PURE__ */ h(
        je,
        {
          value: i.opacity ?? 1,
          onChange: (l) => s({ opacity: l })
        }
      )
    ] })
  ] });
}
const ka = { top: 0, right: 0.25, bottom: 0.5, left: 0.75 }, my = [[0, "top"], [0.25, "right"], [0.5, "bottom"], [0.75, "left"]];
function va(t) {
  let e = "top", o = 1 / 0;
  for (const [n, r] of my) {
    const s = Math.min(Math.abs(t - n), Math.abs(t - n - 1), Math.abs(t - n + 1));
    s < o && (o = s, e = r);
  }
  return e;
}
const by = ["forward"], xy = ["forward", "reverse", "both", "bop"];
function wy({ engine: t, node: e }) {
  const o = oe(), { labels: n } = _t(), r = Qe(t, e), s = Ge(Xn), { data: i } = e, l = !!(i.sourcePort && i.targetPort), d = l ? by : xy, c = Kt(() => !(s != null && s.length) || !s.every((a) => a.type === "edge") ? null : [...s].map((a) => a.id).sort().join("|"), [s]);
  return St(() => {
    const a = c !== null ? c.split("|") : [e.id];
    for (const u of a) {
      const f = t.getNode(u);
      if (!f || f.type !== "edge") continue;
      const y = f.data;
      !y.sourcePort || !y.targetPort || !y.animated || (y.animatedDirection ?? "forward") !== "forward" && t.updateNode(u, { data: { ...y, animatedDirection: "forward" } });
    }
  }, [t, c, e.id]), /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S(Ee, { title: n.edgeLineSection, persistKey: "edge.line", children: [
      /* @__PURE__ */ h(
        Ae,
        {
          label: n.edgeColor,
          palettes: He,
          value: i.color,
          onChange: (a) => r({ color: a })
        }
      ),
      /* @__PURE__ */ h(
        Ko,
        {
          label: n.inspectorStyle,
          value: i.style,
          onChange: (a) => r({ style: a })
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: n.inspectorWidth,
          widths: Zl,
          value: i.strokeWidth,
          onChange: (a) => r({ strokeWidth: a })
        }
      ),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: "Connect" }),
        ["fixed", "free"].map((a) => {
          const u = i.sourceT !== void 0 || i.targetT !== void 0;
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                a === "free" && !u ? r({
                  sourceT: i.sourceHandle ? ka[i.sourceHandle] : 0,
                  targetT: i.targetHandle ? ka[i.targetHandle] : 0.5,
                  sourceHandle: void 0,
                  targetHandle: void 0
                }) : a === "fixed" && u && r({
                  sourceHandle: i.sourceT !== void 0 ? va(i.sourceT) : "right",
                  targetHandle: i.targetT !== void 0 ? va(i.targetT) : "left",
                  sourceT: void 0,
                  targetT: void 0
                });
              },
              style: {
                ...re,
                height: 28,
                padding: "0 8px",
                background: (a === "free" ? u : !u) ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 10,
                borderRadius: o.controlBorderRadius
              },
              children: a === "fixed" ? "Fixed" : "Free"
            },
            a
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ S(Ee, { title: n.edgeArrowsSection, persistKey: "edge.arrows", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((a) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => r({ arrowHead: a }),
            style: {
              ...re,
              height: 28,
              padding: "0 6px",
              background: (i.arrowHead ?? "none") === a ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: a === "none" ? n.inspectorNone : a === "arrow" ? "▷" : a === "filled" ? "▶" : "●"
          },
          a
        ))
      ] }),
      (i.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.edgeHeadSize }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: i.arrowHeadSize ?? Math.max(8, i.strokeWidth * 3),
            onChange: (a) => r({ arrowHeadSize: Number(a.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ h("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: i.arrowHeadSize ?? Math.max(8, i.strokeWidth * 3) })
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((a) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => r({ arrowTail: a }),
            style: {
              ...re,
              height: 28,
              padding: "0 6px",
              background: (i.arrowTail ?? "none") === a ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: a === "none" ? n.inspectorNone : a === "arrow" ? "◁" : a === "filled" ? "◀" : "●"
          },
          a
        ))
      ] }),
      (i.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.edgeTailSize }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: i.arrowTailSize ?? Math.max(8, i.strokeWidth * 3),
            onChange: (a) => r({ arrowTailSize: Number(a.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ h("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: i.arrowTailSize ?? Math.max(8, i.strokeWidth * 3) })
      ] })
    ] }),
    /* @__PURE__ */ S(Ee, { title: n.edgePathMotionSection, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.edgePath }),
        [
          { key: "bezier", label: n.edgeBezier },
          { key: "straight", label: n.edgeStraight },
          { key: "smoothstep", label: n.edgeSmooth },
          { key: "step", label: n.edgeStep }
        ].map((a) => /* @__PURE__ */ h(
          "button",
          {
            title: a.label,
            onClick: () => r({ edgeType: a.key }),
            style: {
              ...re,
              height: 28,
              padding: "0 6px",
              background: (i.edgeType ?? "bezier") === a.key ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 9,
              borderRadius: o.controlBorderRadius
            },
            children: a.label
          },
          a.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.edgeAnimate }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => r({ animated: !i.animated }),
            style: {
              ...re,
              height: 28,
              padding: "0 12px",
              background: i.animated ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: i.animated ? n.inspectorOn : n.inspectorOff
          }
        )
      ] }),
      i.animated && /* @__PURE__ */ S("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
        /* @__PURE__ */ S("div", { style: Xt, children: [
          /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.edgeDirection }),
          d.map((a) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => r({ animatedDirection: a }),
              style: {
                ...re,
                height: 28,
                padding: "0 6px",
                background: (i.animatedDirection ?? "forward") === a ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 10,
                borderRadius: o.controlBorderRadius
              },
              children: a === "forward" ? "→" : a === "reverse" ? "←" : a === "both" ? "⇆" : "~"
            },
            a
          ))
        ] }),
        l && /* @__PURE__ */ h(
          "span",
          {
            style: {
              marginLeft: 0,
              fontSize: 10,
              color: o.textMuted,
              lineHeight: 1.35
            },
            children: n.edgeAnimationPortHint
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.inspectorRoughness }),
        vr.map((a) => {
          const u = a.value === 0 ? n.roughnessArchitect : a.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
          return /* @__PURE__ */ h(
            "button",
            {
              title: u,
              onClick: () => r({ roughness: a.value }),
              style: {
                ...re,
                height: 28,
                padding: "0 8px",
                background: (i.roughness ?? 0) === a.value ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 9,
                borderRadius: o.controlBorderRadius
              },
              children: u
            },
            a.value
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ h(Ee, { title: n.inspectorLabel, defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.edgeText }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: i.label ?? "",
          onChange: (a) => r({ label: a.target.value || void 0 }),
          placeholder: n.edgeLabelPlaceholder,
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
function ky({ engine: t, node: e }) {
  const o = oe(), { labels: n } = _t(), r = Qe(t, e), { data: s } = e, i = !!s.crop;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      Yn,
      {
        borderColor: s.borderColor ?? null,
        borderStyle: s.borderStyle,
        borderWidth: s.borderWidth,
        onChange: (l, d) => r({ [l]: d })
      }
    ),
    /* @__PURE__ */ S("div", { style: { ...Xt, marginTop: 4 }, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.inspectorCrop }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.requestImageCrop(e.id),
          style: {
            ...re,
            height: 28,
            padding: "0 10px",
            background: o.controlBg,
            color: o.text,
            fontSize: 10,
            borderRadius: o.controlBorderRadius
          },
          children: n.inspectorCrop
        }
      ),
      i && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => r({ crop: void 0 }),
          style: {
            ...re,
            height: 28,
            padding: "0 10px",
            background: o.controlBg,
            color: o.textMuted,
            fontSize: 10,
            borderRadius: o.controlBorderRadius
          },
          children: n.inspectorReset
        }
      )
    ] }),
    /* @__PURE__ */ h(
      je,
      {
        value: s.opacity ?? 1,
        onChange: (l) => r({ opacity: l })
      }
    )
  ] });
}
function vy({ engine: t, node: e }) {
  const o = oe(), n = Qe(t, e), { data: r } = e;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      Yn,
      {
        borderColor: r.borderColor ?? null,
        borderStyle: r.borderStyle,
        borderWidth: r.borderWidth,
        onChange: (s, i) => n({ [s]: i })
      }
    ),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ h(
        "button",
        {
          title: s.label,
          onClick: () => n({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...re,
            width: 28,
            height: 28,
            background: (r.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(pi, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ h(
      je,
      {
        value: r.opacity ?? 1,
        onChange: (s) => n({ opacity: s })
      }
    )
  ] });
}
const En = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, Sy = vf();
function My({
  value: t,
  onChange: e,
  theme: o,
  durationLabel: n,
  msLabel: r
}) {
  const [s, i] = et(String(t));
  St(() => i(String(t)), [t]);
  const l = () => {
    const d = parseInt(s, 10);
    !isNaN(d) && d >= 100 && d <= 5e3 ? e(d) : i(String(t));
  };
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n }),
    /* @__PURE__ */ h(
      "input",
      {
        type: "number",
        min: 100,
        max: 5e3,
        step: 50,
        value: s,
        onChange: (d) => i(d.target.value),
        onBlur: l,
        onKeyDown: (d) => {
          d.key === "Enter" && l();
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
    /* @__PURE__ */ h("span", { style: { fontSize: 10, color: o.textMuted }, children: r })
  ] });
}
function Cy({ engine: t, node: e }) {
  const o = oe(), { labels: n } = _t(), r = Qe(t, e), s = Ge(gn), { data: i } = e, l = lt(
    (u) => {
      var b;
      if (!u) {
        r({ devicePreset: void 0 });
        return;
      }
      const f = Hs(u);
      if (!f) return;
      const y = ql(f), p = Math.round(e.w / y), g = { devicePreset: u };
      (!i.label || ((b = Hs(i.devicePreset ?? "")) == null ? void 0 : b.label) === i.label) && (g.label = f.label);
      const m = { ...e.data, ...g }, x = s == null ? void 0 : s();
      x ? t.updateNodeWithHistoryCoalesced(
        e.id,
        { h: p, data: m },
        x
      ) : t.updateNodeWithHistory(e.id, {
        h: p,
        data: m
      });
    },
    [t, e, i.label, i.devicePreset, r, s]
  ), d = Kt(() => {
    const u = t.getAllNodes().filter((m) => m.type === "frame"), f = u.length, y = /* @__PURE__ */ new Set();
    for (const m of u)
      m.id !== e.id && m.data.slideOrder != null && y.add(m.data.slideOrder);
    const p = [];
    for (let m = 1; m <= f; m++)
      y.has(m) || p.push(m);
    const g = e.data.slideOrder;
    return g != null && !p.includes(g) && (p.push(g), p.sort((m, x) => m - x)), p;
  }, [t, e]), c = {
    pan: n.transitionPan,
    fade: n.transitionFadeToBlack,
    dissolve: n.transitionDissolve,
    zoom: n.transitionZoom,
    fold: n.transitionFold,
    cube: n.transitionCube,
    none: n.transitionNoneInstant
  }, a = {
    Phones: n.deviceGroupPhones,
    "Phones (Landscape)": n.deviceGroupPhonesLandscape,
    Tablets: n.deviceGroupTablets,
    "Tablets (Landscape)": n.deviceGroupTabletsLandscape,
    Devices: n.deviceGroupDevices,
    Standard: n.deviceGroupStandard
  };
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.inspectorLabel }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: i.label ?? "",
          onChange: (u) => r({ label: u.target.value || void 0 }),
          placeholder: n.frameLabelPlaceholder,
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
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.frameDevice }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.devicePreset ?? "",
          onChange: (u) => l(u.target.value),
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
            /* @__PURE__ */ h("option", { value: "", children: n.frameFreeform }),
            Sy.map((u) => /* @__PURE__ */ h("optgroup", { label: a[u.label] ?? u.label, children: u.presets.map((f) => /* @__PURE__ */ S("option", { value: f.key, children: [
              f.label,
              " (",
              f.w,
              "×",
              f.h,
              ")"
            ] }, f.key)) }, u.label))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ h(
      Ae,
      {
        label: n.inspectorBackground,
        palettes: He,
        value: (() => {
          const u = i.backgroundColor;
          if (!u) return null;
          for (const f of He) {
            const y = f.colors.find((p) => u === `${p}15`);
            if (y) return y;
          }
          return u.length === 9 && u.endsWith("15") ? u.slice(0, 7) : null;
        })(),
        onChange: (u) => r({ backgroundColor: u ? `${u}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ h(
      Ae,
      {
        label: n.inspectorBorder,
        palettes: He,
        value: i.borderColor,
        onChange: (u) => r({ borderColor: u })
      }
    ),
    /* @__PURE__ */ h(
      Ko,
      {
        label: n.inspectorStyle,
        value: i.borderStyle ?? "dashed",
        onChange: (u) => r({ borderStyle: u })
      }
    ),
    /* @__PURE__ */ h(
      qo,
      {
        label: n.inspectorWidth,
        value: i.borderWidth ?? 1,
        onChange: (u) => r({ borderWidth: u })
      }
    ),
    /* @__PURE__ */ h(
      je,
      {
        value: i.opacity ?? 1,
        onChange: (u) => r({ opacity: u })
      }
    ),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.frameSlideNumber }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.slideOrder ?? "",
          onChange: (u) => {
            const f = u.target.value;
            r({ slideOrder: f ? parseInt(f, 10) : void 0 });
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
            /* @__PURE__ */ h("option", { value: "", children: n.frameAuto }),
            d.map((u) => /* @__PURE__ */ h("option", { value: u, children: u }, u))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.frameTransition }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.transition ?? "pan",
          onChange: (u) => {
            const f = u.target.value;
            r({ transition: f === "pan" ? void 0 : f, transitionDuration: void 0 });
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
            /* @__PURE__ */ h("option", { value: "pan", children: c.pan }),
            /* @__PURE__ */ h("option", { value: "fade", children: c.fade }),
            /* @__PURE__ */ h("option", { value: "dissolve", children: c.dissolve }),
            /* @__PURE__ */ h("option", { value: "zoom", children: c.zoom }),
            /* @__PURE__ */ h("option", { value: "fold", children: c.fold }),
            /* @__PURE__ */ h("option", { value: "cube", children: c.cube }),
            /* @__PURE__ */ h("option", { value: "none", children: c.none })
          ]
        }
      )
    ] }),
    (i.transition ?? "pan") !== "none" && /* @__PURE__ */ h(
      My,
      {
        value: i.transitionDuration ?? En[i.transition ?? "pan"],
        onChange: (u) => r({ transitionDuration: u === En[i.transition ?? "pan"] ? void 0 : u }),
        theme: o,
        durationLabel: n.frameDuration,
        msLabel: n.frameMilliseconds
      }
    )
  ] });
}
function Iy({ engine: t, node: e }) {
  const o = oe(), { labels: n } = _t(), r = Qe(t, e), { data: s } = e;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      Ae,
      {
        label: n.inspectorStroke,
        palettes: Rf,
        value: s.color,
        onChange: (i) => {
          i && r({ color: i });
        }
      }
    ),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.inspectorSize }),
      [12, 14, 16, 20, 24].map((i) => /* @__PURE__ */ h(
        "button",
        {
          onClick: () => r({ fontSize: i }),
          style: {
            ...re,
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
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.inspectorEdges }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((i) => /* @__PURE__ */ h(
        "button",
        {
          title: i.label,
          onClick: () => r({ edgeStyle: i.key === "sharp" ? void 0 : i.key }),
          style: {
            ...re,
            width: 28,
            height: 28,
            background: (s.edgeStyle ?? "sharp") === i.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(pi, { name: i.key })
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ h(
      je,
      {
        value: s.opacity ?? 1,
        onChange: (i) => r({ opacity: i })
      }
    )
  ] });
}
function Ty({ engine: t, node: e }) {
  const o = oe(), n = Qe(t, e), { data: r } = e;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: "URL" }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: r.url,
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
      Yn,
      {
        borderColor: r.borderColor ?? null,
        borderStyle: r.borderStyle,
        borderWidth: r.borderWidth,
        onChange: (s, i) => n({ [s]: i })
      }
    ),
    /* @__PURE__ */ h(
      je,
      {
        value: r.opacity ?? 1,
        onChange: (s) => n({ opacity: s })
      }
    )
  ] });
}
function zy({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const Py = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Ay({ engine: t, mode: e, fontsInScene: o }) {
  const n = oe(), { labels: r } = _t(), [, s] = et(0), i = lt(() => s((g) => g + 1), []), l = t.activeTool;
  if (e === "text") {
    const g = l.fontFamily ?? xo, m = l.fontSize ?? 20, x = l.textAlign ?? "left", b = l.color;
    return /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorFont }),
        /* @__PURE__ */ h(
          Lr,
          {
            value: g,
            onChange: (w) => {
              l.fontFamily = w, i();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorSize }),
        Ql.map((w) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.fontSize = w, i();
            },
            style: {
              ...re,
              width: 36,
              height: 28,
              background: m === w ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 10,
              borderRadius: n.controlBorderRadius
            },
            children: w
          },
          w
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorAlign }),
        di.map((w) => /* @__PURE__ */ h(
          "button",
          {
            title: w.key,
            onClick: () => {
              l.textAlign = w.key, i();
            },
            style: {
              ...re,
              width: 36,
              height: 28,
              background: x === w.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 12,
              borderRadius: n.controlBorderRadius
            },
            children: w.label
          },
          w.key
        ))
      ] }),
      /* @__PURE__ */ h(
        Ae,
        {
          label: r.inspectorStroke,
          palettes: He,
          value: b,
          onChange: (w) => {
            l.color = w, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        je,
        {
          value: l.opacity ?? 1,
          onChange: (w) => {
            l.opacity = w, i();
          }
        }
      )
    ] });
  }
  if (e === "edge") {
    const g = l.roughness ?? 0;
    return /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        Ae,
        {
          label: r.inspectorStroke,
          palettes: He,
          value: l.color,
          onChange: (m) => {
            l.color = m, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        Ko,
        {
          label: r.inspectorStrokeStyle,
          value: l.strokeStyle ?? "solid",
          onChange: (m) => {
            l.strokeStyle = m, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: r.inspectorStrokeWidth,
          widths: Zl,
          value: l.width,
          onChange: (m) => {
            l.width = m, i();
          }
        }
      ),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((m) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.arrowHead = m, i();
            },
            style: {
              ...re,
              height: 28,
              padding: "0 6px",
              background: (l.arrowHead ?? "arrow") === m ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 11,
              borderRadius: n.controlBorderRadius
            },
            children: m === "none" ? r.inspectorNone : m === "arrow" ? "▷" : m === "filled" ? "▶" : "●"
          },
          m
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((m) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.arrowTail = m, i();
            },
            style: {
              ...re,
              height: 28,
              padding: "0 6px",
              background: (l.arrowTail ?? "none") === m ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 11,
              borderRadius: n.controlBorderRadius
            },
            children: m === "none" ? r.inspectorNone : m === "arrow" ? "◁" : m === "filled" ? "◀" : "●"
          },
          m
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.edgePath }),
        [
          { key: "bezier", label: r.edgeBezier },
          { key: "straight", label: r.edgeStraight },
          { key: "smoothstep", label: r.edgeSmooth },
          { key: "step", label: r.edgeStep }
        ].map((m) => /* @__PURE__ */ h(
          "button",
          {
            title: m.label,
            onClick: () => {
              l.edgeType = m.key, i();
            },
            style: {
              ...re,
              height: 28,
              padding: "0 6px",
              background: (l.edgeType ?? "bezier") === m.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 9,
              borderRadius: n.controlBorderRadius
            },
            children: m.label
          },
          m.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorRoughness }),
        vr.map((m) => {
          const x = m.value === 0 ? r.roughnessArchitect : m.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
          return /* @__PURE__ */ h(
            "button",
            {
              title: x,
              onClick: () => {
                l.roughness = m.value, i();
              },
              style: {
                ...re,
                height: 28,
                padding: "0 8px",
                background: g === m.value ? n.controlBgActive : n.controlBg,
                color: n.text,
                fontSize: 9,
                borderRadius: n.controlBorderRadius
              },
              children: x
            },
            m.value
          );
        })
      ] })
    ] });
  }
  const d = e === "shape", c = l.color, a = l.fillColor ?? null, u = l.fillStyle ?? "hachure", f = l.strokeStyle ?? "solid", y = l.width, p = l.roughness ?? 1;
  return /* @__PURE__ */ S(Mt, { children: [
    d && /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorShape }),
      Py.map((g) => /* @__PURE__ */ h(
        "button",
        {
          title: g.label,
          onClick: () => {
            l.shapeType = g.key, i();
          },
          style: {
            ...re,
            width: 28,
            height: 28,
            background: (l.shapeType ?? "rect") === g.key ? n.controlBgActive : n.controlBg,
            color: n.text,
            borderRadius: n.controlBorderRadius
          },
          children: /* @__PURE__ */ h(zy, { name: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Ae,
      {
        label: r.inspectorStroke,
        palettes: He,
        value: c,
        onChange: (g) => {
          l.color = g, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      Ae,
      {
        label: r.inspectorFill,
        palettes: hi,
        value: a,
        onChange: (g) => {
          l.fillColor = g ?? void 0, i();
        },
        allowNull: !0
      }
    ),
    a && /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorFillPattern }),
      li.map((g) => /* @__PURE__ */ h(
        "button",
        {
          title: g.label,
          onClick: () => {
            l.fillStyle = g.key, i();
          },
          style: {
            ...re,
            width: 36,
            height: 28,
            background: u === g.key ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 9,
            borderRadius: n.controlBorderRadius
          },
          children: /* @__PURE__ */ h(ui, { style: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Ko,
      {
        label: r.inspectorStrokeStyle,
        value: f,
        onChange: (g) => {
          l.strokeStyle = g, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      qo,
      {
        label: r.inspectorStrokeWidth,
        widths: d ? ci : Ul,
        value: y,
        onChange: (g) => {
          l.width = g, i();
        }
      }
    ),
    d && /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorRoughness }),
      vr.map((g) => {
        const m = g.value === 0 ? r.roughnessArchitect : g.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: m,
            onClick: () => {
              l.roughness = g.value, i();
            },
            style: {
              ...re,
              height: 28,
              padding: "0 8px",
              background: p === g.value ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 9,
              borderRadius: n.controlBorderRadius
            },
            children: m
          },
          g.value
        );
      })
    ] }),
    /* @__PURE__ */ h(
      je,
      {
        value: l.opacity ?? 1,
        onChange: (g) => {
          l.opacity = g, i();
        }
      }
    )
  ] });
}
function Ey(t) {
  return t.split(/[-_]/).filter(Boolean).map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ");
}
function Sa({
  engine: t,
  node: e,
  PanelComponent: o,
  docs: n
}) {
  const r = Qe(t, e), s = oe(), { labels: i } = _t(), [l, d] = et(!1), c = n ? n.id ?? e.type : null, a = c ? i.customNodeDocs[c] : void 0, u = !!(a != null && a.body), f = Kt(
    () => (a == null ? void 0 : a.title) ?? Ey(e.type),
    [a == null ? void 0 : a.title, e.type]
  ), y = n != null && u ? /* @__PURE__ */ S("div", { style: { marginBottom: o ? 10 : 0 }, children: [
    /* @__PURE__ */ S(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8
        },
        children: [
          /* @__PURE__ */ h(
            "span",
            {
              style: {
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                color: s.textSecondary
              },
              children: f
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => d((p) => !p),
              "aria-expanded": l,
              "aria-label": l ? i.inspectorNodeHelpHide : i.inspectorNodeHelpShow,
              style: {
                flexShrink: 0,
                minWidth: 28,
                height: 28,
                padding: "0 8px",
                borderRadius: s.controlBorderRadius,
                border: `1px solid ${s.border}`,
                background: l ? s.controlBg : "transparent",
                color: s.textMuted,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 1
              },
              children: "?"
            }
          )
        ]
      }
    ),
    l ? /* @__PURE__ */ h(
      "p",
      {
        style: {
          margin: "8px 0 0",
          padding: "8px 10px",
          borderRadius: s.controlBorderRadius,
          fontSize: 12,
          lineHeight: 1.45,
          color: s.textMuted,
          background: s.controlBg,
          border: `1px solid ${s.border}`,
          whiteSpace: "pre-wrap",
          maxHeight: 220,
          overflowY: "auto"
        },
        children: a.body
      }
    ) : null
  ] }) : null;
  return o ? /* @__PURE__ */ S(Mt, { children: [
    y,
    /* @__PURE__ */ h(o, { node: e, data: e.data, engine: t, updateData: r })
  ] }) : y;
}
const Ly = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), Ry = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function Jl(t) {
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
function Dy(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const n of t.getAllNodes()) {
    let r;
    n.type === "text" ? r = n.data.fontFamily : n.type === "shape" && (r = n.data.labelFontFamily), r && !e.has(r) && (e.add(r), o.push(r));
  }
  return o;
}
function Wy({ label: t }) {
  const e = oe();
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
function By({
  engine: t,
  open: e,
  onToggle: o
}) {
  const n = oe(), { labels: r } = _t(), [s, i] = et(t.snapToGrid), [l, d] = et(t.gridSize), [c, a] = et(t.smartGuides), [u, f] = et(t.freeFormEdges), [y, p] = et(t.boardBackground), g = {
    "plain-white": r.paperWhite,
    "dot-grid": r.paperCream,
    engineering: r.paperWarm,
    blueprint: r.paperBlueprint,
    "dark-grid": r.paperNight,
    "japanese-stationery": r.paperJapaneseStationery,
    kraft: r.paperKraftPaper
  };
  St(() => {
    const x = () => {
      i(t.snapToGrid), d(t.gridSize), a(t.smartGuides), f(t.freeFormEdges);
    }, b = () => f(t.freeFormEdges);
    t.on("change", b);
    const w = () => p(t.boardBackground);
    return t.on("guides", x), t.on("background", w), () => {
      t.off("guides", x), t.off("background", w), t.off("change", b);
    };
  }, [t]);
  const m = [10, 20, 40, 80];
  return /* @__PURE__ */ S(Ee, { title: r.inspectorCanvas, defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorGrid }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.toggleSnapToGrid(),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: s ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: s ? r.inspectorOn : r.inspectorOff
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorGridSize }),
      /* @__PURE__ */ h("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }, children: m.map((x) => /* @__PURE__ */ S(
        "button",
        {
          onClick: () => t.setGridSize(x),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: l === x ? n.controlBgActive : n.controlBg,
            color: n.text,
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
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorGuides }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.toggleSmartGuides(),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: c ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: c ? r.inspectorOn : r.inspectorOff
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: "Free edges" }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.toggleFreeFormEdges(),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: u ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: u ? r.inspectorOn : r.inspectorOff
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Ot, color: n.textMuted }, children: r.inspectorPaper }),
      /* @__PURE__ */ h(
        "select",
        {
          value: y,
          onChange: (x) => t.setBoardBackground(x.target.value),
          style: {
            flex: 1,
            height: 28,
            border: `1px solid ${n.border}`,
            borderRadius: n.controlBorderRadius,
            background: n.controlBg,
            color: n.text,
            fontSize: 11,
            padding: "0 8px",
            outline: "none"
          },
          children: pn.map((x) => /* @__PURE__ */ h("option", { value: x.key, children: g[x.key] ?? x.label }, x.key))
        }
      )
    ] })
  ] });
}
function $l({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: n
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ h(fy, { engine: t, node: e, fontsInScene: n });
    case "draw":
      return /* @__PURE__ */ h(yy, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ h(gy, { engine: t, node: e, fontsInScene: n });
    case "edge":
      return /* @__PURE__ */ h(wy, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ h(ky, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ h(vy, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ h(Cy, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ h(Iy, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ h(Ty, { engine: t, node: e });
    default: {
      const r = o == null ? void 0 : o.get(e.type);
      return r != null && r.propertiesPanel ? /* @__PURE__ */ h(
        Sa,
        {
          engine: t,
          node: e,
          PanelComponent: r.propertiesPanel,
          docs: r.docs
        }
      ) : r != null && r.docs ? /* @__PURE__ */ h(Sa, { engine: t, node: e, docs: r.docs }) : null;
    }
  }
}
function Ma({
  engine: t,
  nodes: e
}) {
  const o = oe(), { labels: n } = _t(), r = Ge(gn), s = Math.round(e[0].rotation ?? 0), l = e.every(
    (u) => Math.round(u.rotation ?? 0) === s
  ) ? s : null, [d, c] = et(null), a = lt(
    (u) => {
      c(null);
      const f = parseFloat(u);
      if (isNaN(f)) return;
      const y = Math.max(-360, Math.min(360, f)), p = e.map((m) => ({
        id: m.id,
        patch: { rotation: y }
      })), g = r == null ? void 0 : r();
      g ? t.batchUpdateWithHistoryCoalesced(p, g) : t.batchUpdateWithHistory(p);
    },
    [t, e, r]
  );
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.inspectorRotation }),
    /* @__PURE__ */ h(
      "input",
      {
        type: "number",
        min: -360,
        max: 360,
        value: d ?? (l !== null ? String(l) : ""),
        placeholder: l === null ? "Mixed" : void 0,
        onChange: (u) => c(u.target.value),
        onBlur: (u) => a(u.target.value),
        onKeyDown: (u) => {
          u.key === "Enter" && a(u.target.value), u.key === "Escape" && c(null);
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
function Ca({
  engine: t,
  nodes: e
}) {
  const o = oe(), { labels: n } = _t(), r = e.map((i) => i.id);
  if (r.length === 0) return null;
  const s = [
    {
      label: n.actionBringForward,
      action: () => t.bringForward(r),
      icon: "↑+"
    },
    {
      label: n.actionSendBackward,
      action: () => t.sendBackward(r),
      icon: "↓-"
    },
    {
      label: n.actionBringToFront,
      action: () => t.bringToFront(r),
      icon: "⇡|"
    },
    {
      label: n.actionSendToBack,
      action: () => t.sendToBack(r),
      icon: "|⇣"
    }
  ];
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Ot, color: o.textMuted }, children: n.inspectorStack }),
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
function Ny({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const n = Ge(gn), r = lt(
    (s, i) => {
      const l = s === "opacity" ? Ly : Ry, d = e.filter((a) => l.has(a.type)).map((a) => ({
        id: a.id,
        patch: {
          data: { ...a.data, [s]: i }
        }
      })), c = n == null ? void 0 : n();
      c ? t.batchUpdateWithHistoryCoalesced(d, c) : t.batchUpdateWithHistory(d);
    },
    [t, e, n]
  );
  return /* @__PURE__ */ S(Mt, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ h(
      je,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (s) => r("opacity", s)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ h(
      Yn,
      {
        borderColor: o.borderColor === "mixed" ? void 0 : o.borderColor,
        borderStyle: o.borderStyle === "mixed" ? void 0 : o.borderStyle,
        borderWidth: o.borderWidth === "mixed" ? void 0 : o.borderWidth,
        mixed: {
          color: o.borderColor === "mixed",
          style: o.borderStyle === "mixed",
          width: o.borderWidth === "mixed"
        },
        onChange: (s, i) => r(s, i)
      }
    )
  ] });
}
function Fy({
  engine: t,
  target: e
}) {
  const o = oe(), { labels: n } = _t();
  if (e.kind !== "single" && e.kind !== "multi") return null;
  const r = Array.from(t.selection), s = r.length > 0, i = r.length >= 2 || t.selectionHasGroup(), l = r.some((a) => {
    var u;
    return (u = t.getNode(a)) == null ? void 0 : u.locked;
  }), d = r.some((a) => {
    var u;
    return !((u = t.getNode(a)) != null && u.locked);
  }), c = [
    {
      label: n.actionCut,
      disabled: !s,
      action: () => t.cutSelected()
    },
    {
      label: n.actionCopy,
      disabled: !s,
      action: () => t.copySelected()
    },
    {
      label: n.actionPaste,
      disabled: !t.hasClipboard(),
      action: () => t.pasteClipboard()
    },
    {
      label: n.actionDuplicate,
      disabled: !s,
      action: () => t.duplicateSelected()
    },
    {
      label: n.actionBringForward,
      disabled: !s,
      action: () => t.bringForward(r)
    },
    {
      label: n.actionSendBackward,
      disabled: !s,
      action: () => t.sendBackward(r)
    },
    {
      label: n.actionBringToFront,
      disabled: !s,
      action: () => t.bringToFront(r)
    },
    {
      label: n.actionSendToBack,
      disabled: !s,
      action: () => t.sendToBack(r)
    },
    {
      label: n.actionGroupSelection,
      disabled: !i || r.length < 2,
      action: () => t.groupSelected()
    },
    {
      label: n.actionUngroupSelection,
      disabled: !i || !t.selectionHasGroup(),
      action: () => t.ungroupSelected()
    },
    {
      label: n.actionLock,
      disabled: !d,
      action: () => {
        for (const a of r) t.updateNode(a, { locked: !0 });
      }
    },
    {
      label: n.actionUnlock,
      disabled: !l,
      action: () => {
        for (const a of r) t.updateNode(a, { locked: void 0 });
      }
    },
    {
      label: n.actionDelete,
      disabled: !s,
      danger: !0,
      action: () => t.deleteSelected()
    }
  ];
  return /* @__PURE__ */ h(Ee, { title: n.inspectorActions, defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: c.map((a) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      disabled: a.disabled,
      onClick: a.action,
      style: {
        border: `1px solid ${o.border}`,
        borderRadius: 999,
        background: a.disabled ? o.controlBg : o.controlBgActive,
        color: a.danger ? "#fecaca" : o.text,
        opacity: a.disabled ? 0.45 : 0.95,
        padding: "5px 10px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.01em",
        cursor: a.disabled ? "default" : "pointer",
        whiteSpace: "nowrap"
      },
      children: a.label
    },
    a.label
  )) }) });
}
function Hy({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: n,
  open: r,
  onToggle: s
}) {
  const { labels: i } = _t(), d = Jl(i)[e.type] ?? e.type, c = e.nodes.length, a = e.nodes[0], u = `${d} (${c})`;
  return /* @__PURE__ */ h(Ee, { title: u, defaultOpen: !1, variant: "group", open: r, onToggle: s, children: /* @__PURE__ */ h(Xn.Provider, { value: e.nodes, children: /* @__PURE__ */ h(
    $l,
    {
      engine: t,
      node: a,
      registry: o,
      fontsInScene: n
    }
  ) }) });
}
function Oy(t, e) {
  const o = Jl(e);
  switch (t.kind) {
    case "none":
      return e.inspectorNoSelection;
    case "tool":
      return `${t.mode.charAt(0).toUpperCase() + t.mode.slice(1)} ${e.inspectorToolSuffix}`;
    case "single":
      return o[t.node.type] ?? t.node.type;
    case "multi":
      return t.typeGroups.map(
        (r) => `${r.nodes.length} ${(o[r.type] ?? r.type).toLowerCase()}${r.nodes.length > 1 ? "s" : ""}`
      ).join(", ");
  }
}
function Ia({
  engine: t,
  registry: e,
  target: o,
  commonProps: n
}) {
  const { labels: r } = _t(), s = Kt(() => Dy(t), [t, o]), i = Oy(o, r), [l, d] = et("shared"), [c, a] = et(!1), u = Kt(() => {
    switch (o.kind) {
      case "single":
        return o.node.id;
      case "multi":
        return [...o.nodes].map((y) => y.id).sort().join("\0");
      case "tool":
        return "tool";
      default:
        return "none";
    }
  }, [o]), f = Ar(t, u);
  return St(() => {
    const y = () => {
      a(
        window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0
      );
    };
    return y(), window.addEventListener("resize", y), () => window.removeEventListener("resize", y);
  }, []), St(() => {
    if (o.kind !== "multi") {
      d("shared");
      return;
    }
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((p) => p.type)])).has(l) || d("shared");
  }, [o, l]), /* @__PURE__ */ S(gn.Provider, { value: f, children: [
    /* @__PURE__ */ h(Wy, { label: i }),
    /* @__PURE__ */ h(
      By,
      {
        engine: t,
        open: o.kind === "multi" ? l === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => d((y) => y === "canvas" ? "" : "canvas") : void 0
      }
    ),
    c && /* @__PURE__ */ h(Fy, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ h(Ay, { engine: t, mode: o.mode, fontsInScene: s }),
    o.kind === "single" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        $l,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: s
        }
      ),
      /* @__PURE__ */ h(Ma, { engine: t, nodes: [o.node] }),
      /* @__PURE__ */ h(Ca, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ S(
        Ee,
        {
          title: r.inspectorShared,
          defaultOpen: !0,
          variant: "group",
          open: l === "shared",
          onToggle: () => d((y) => y === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ h(Ny, { engine: t, nodes: o.nodes, commonProps: n }),
            /* @__PURE__ */ h(Ma, { engine: t, nodes: o.nodes }),
            /* @__PURE__ */ h(Ca, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((y) => /* @__PURE__ */ h(
        Hy,
        {
          engine: t,
          group: y,
          registry: e,
          fontsInScene: s,
          open: l === y.type,
          onToggle: () => d((p) => p === y.type ? "" : y.type)
        },
        y.type
      ))
    ] })
  ] });
}
function Xy({ engine: t, registry: e }) {
  const o = oe(), { isRTL: n, labels: r } = _t(), { target: s, commonProps: i } = ly(t), l = s.kind !== "none";
  lt((J, H) => {
    const $ = J.trim();
    if ($.startsWith("#")) {
      const st = $.slice(1), it = st.length === 3 ? st.split("").map((U) => U + U).join("") : st;
      if (it.length === 6) {
        const U = parseInt(it.slice(0, 2), 16), tt = parseInt(it.slice(2, 4), 16), dt = parseInt(it.slice(4, 6), 16);
        return `rgba(${U}, ${tt}, ${dt}, ${H})`;
      }
    }
    return $.startsWith("rgb(") ? `rgba(${$.slice(4, -1)}, ${H})` : ($.startsWith("rgba("), $);
  }, []);
  const [d, c] = et(!1), [a, u] = et(!1), [f, y] = et(!1), [p, g] = et(!1), m = ut(null), x = ut(!1), b = lt(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), w = lt(
    (J) => {
      const H = b() ? 1366 : 1024;
      return J <= H;
    },
    [b]
  ), M = ut(null), [v, C] = et(null), T = ut(null), [E, z] = et(!1), j = lt(() => {
    var $, st;
    const J = ($ = M.current) == null ? void 0 : $.offsetParent;
    if (J) return { width: J.clientWidth, height: J.clientHeight };
    const H = ((st = M.current) == null ? void 0 : st.ownerDocument.defaultView) ?? window;
    return { width: H.innerWidth, height: H.innerHeight };
  }, []), Y = lt(() => {
    const { width: J } = j();
    return n ? { x: eo + 16, y: 12 } : { x: J - dn - 16, y: 12 };
  }, [j, n]), nt = v ?? Y(), rt = ut(!1);
  Co(() => {
    if (!rt.current && M.current && !v) {
      rt.current = !0;
      const J = M.current.offsetParent;
      J && C(
        n ? { x: eo + 16, y: 12 } : { x: J.clientWidth - dn - 16, y: 12 }
      );
    }
  }, [v, n]), St(() => {
    var st, it;
    const J = ((st = M.current) == null ? void 0 : st.offsetParent) ?? ((it = M.current) == null ? void 0 : it.ownerDocument.body);
    if (!J) return;
    const H = new ResizeObserver((U) => {
      var _;
      const tt = ((_ = U[0]) == null ? void 0 : _.contentRect.width) ?? J.clientWidth;
      c(tt < 600);
      const dt = w(tt);
      u(dt), x.current || (g(dt), x.current = !0);
    });
    H.observe(J), c(J.clientWidth < 600);
    const $ = w(J.clientWidth);
    return u($), x.current || (g($), x.current = !0), () => H.disconnect();
  }, [w]), St(() => {
    var gt;
    const J = ((gt = M.current) == null ? void 0 : gt.ownerDocument) ?? document, H = () => {
      m.current !== null && window.clearTimeout(m.current), m.current = window.setTimeout(() => {
        y(!1), m.current = null;
      }, 200);
    }, $ = () => {
      m.current !== null && (window.clearTimeout(m.current), m.current = null), y(!0);
    }, st = (ft) => !!(ft instanceof Element && ft.closest("[data-sb-canvas]")), it = (ft) => {
      ft.button !== 2 && st(ft.target) && $();
    }, U = () => H(), tt = () => H(), dt = (ft) => {
      st(ft.target) && $();
    }, _ = () => H(), ht = (ft) => {
      var zt;
      ((zt = ft.detail) == null ? void 0 : zt.active) ? $() : H();
    };
    return J.addEventListener("pointerdown", it, !0), J.addEventListener("pointerup", U, !0), J.addEventListener("pointercancel", tt, !0), J.addEventListener("focusin", dt, !0), J.addEventListener("focusout", _, !0), J.addEventListener("sb:canvas-interaction", ht), () => {
      J.removeEventListener("pointerdown", it, !0), J.removeEventListener("pointerup", U, !0), J.removeEventListener("pointercancel", tt, !0), J.removeEventListener("focusin", dt, !0), J.removeEventListener("focusout", _, !0), J.removeEventListener("sb:canvas-interaction", ht), m.current !== null && (window.clearTimeout(m.current), m.current = null);
    };
  }, []);
  const pt = lt(
    (J, H) => {
      z(!0);
      const $ = v ? v.x : Y().x, st = v ? v.y : Y().y;
      T.current = {
        startX: J.clientX,
        startY: J.clientY,
        startLeft: $,
        startTop: st
      }, (H ?? J.currentTarget).setPointerCapture(J.pointerId);
    },
    [v, Y]
  ), xt = lt((J) => J instanceof Element ? !!J.closest(
    'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
  ) : !1, []), mt = lt(
    (J) => {
      d || J.button === 0 && (xt(J.target) || (J.stopPropagation(), pt(J, J.currentTarget)));
    },
    [d, xt, pt]
  ), W = lt(
    (J) => {
      if (!T.current) return;
      J.stopPropagation();
      const H = J.clientX - T.current.startX, $ = J.clientY - T.current.startY, { width: st, height: it } = j(), U = n ? 8 : eo, tt = n ? st - dn - eo - 8 : st - dn - 8, dt = Math.max(
        U,
        Math.min(tt, T.current.startLeft + H)
      ), _ = Math.max(
        8,
        Math.min(it - 100, T.current.startTop + $)
      );
      C({ x: dt, y: _ });
    },
    [j, n]
  ), B = lt(() => {
    T.current = null, z(!1);
  }, []), G = p && f, q = o.panelBg;
  return l ? d ? /* @__PURE__ */ S(
    "div",
    {
      ref: M,
      "data-sb-props-panel": !0,
      onPointerDown: (J) => J.stopPropagation(),
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "45vh",
        minHeight: 200,
        background: q,
        borderRadius: "12px 12px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        color: o.text,
        fontSize: 12,
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        opacity: G ? 0 : 1,
        transform: G ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: G ? "none" : "auto"
      },
      children: [
        /* @__PURE__ */ S(
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
              /* @__PURE__ */ S(
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
                  onPointerDown: (J) => J.stopPropagation(),
                  children: [
                    /* @__PURE__ */ h("span", { children: r.autoHide }),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: p,
                        onChange: (J) => g(J.target.checked),
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
              Ia,
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
  ) : /* @__PURE__ */ S(
    "div",
    {
      ref: M,
      "data-sb-props-panel": !0,
      style: {
        position: "absolute",
        left: nt.x,
        top: nt.y,
        width: dn,
        background: q,
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
        opacity: G ? 0 : 1,
        transform: G ? "translateY(-4px) scale(0.995)" : "translateY(0) scale(1)",
        transformOrigin: n ? "top left" : "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: G ? "none" : "auto",
        cursor: E ? "grabbing" : "grab"
      },
      onPointerDownCapture: mt,
      onPointerDown: (J) => J.stopPropagation(),
      onPointerMove: W,
      onPointerUp: B,
      onPointerCancel: B,
      children: [
        /* @__PURE__ */ S(
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
              /* @__PURE__ */ h("span", { style: { fontWeight: 600, letterSpacing: "0.02em" }, children: r.inspectorTitle }),
              /* @__PURE__ */ S(
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
                  onPointerDown: (J) => J.stopPropagation(),
                  children: [
                    /* @__PURE__ */ h("span", { children: r.autoHide }),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: p,
                        onChange: (J) => g(J.target.checked),
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
              Ia,
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
function Yy({ engine: t, registry: e, gifApiBaseUrl: o }) {
  const { isRTL: n } = _t();
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      "div",
      {
        "data-sb-sidebar": !0,
        style: {
          position: "absolute",
          left: n ? void 0 : 0,
          right: n ? 0 : void 0,
          top: 0,
          bottom: 0,
          width: eo,
          zIndex: 100
        },
        onPointerDown: (r) => r.stopPropagation(),
        children: /* @__PURE__ */ h(ry, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ h(Xy, { engine: t, registry: e })
  ] });
}
const Ln = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function Gy(t) {
  const e = t.viewport.zoom, o = Ln.find((n) => n > e + 1e-3) ?? Ln[Ln.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function jy(t) {
  const e = t.viewport.zoom, o = [...Ln].reverse().find((n) => n < e - 1e-3) ?? Ln[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const Vy = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
}, De = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, me = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Fe({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ h("path", { d: "M5 12h14", ...me }),
    t === "plus" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M12 5v14", ...me }),
      /* @__PURE__ */ h("path", { d: "M5 12h14", ...me })
    ] }),
    t === "undo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...me, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...me, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...me, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...me, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...me }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...me })
    ] }),
    t === "play" && /* @__PURE__ */ h("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...me }),
      /* @__PURE__ */ h("path", { d: "M6 6V18M18 6V18", ...me }),
      /* @__PURE__ */ h("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...me })
    ] }),
    t === "gauge" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 15a8 8 0 1 1 16 0", ...me }),
      /* @__PURE__ */ h("path", { d: "M12 15l4-4", ...me }),
      /* @__PURE__ */ h("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "minimap" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3.5", y: "3.5", width: "17", height: "17", rx: "2", ...me, fill: "none" }),
      /* @__PURE__ */ h(
        "rect",
        {
          x: "11.5",
          y: "6.5",
          width: "9",
          height: "7",
          rx: "1",
          fill: "currentColor",
          fillOpacity: 0.4,
          stroke: "currentColor",
          strokeWidth: 1.25
        }
      )
    ] }),
    t === "search" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "6", ...me }),
      /* @__PURE__ */ h("path", { d: "M16 16l5 5", ...me })
    ] }),
    t === "home" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M3 12l9-8 9 8", ...me, fill: "none" }),
      /* @__PURE__ */ h("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...me, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...me, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function Ky({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showMinimap: n,
  onToggleMinimap: r,
  showPerfOverlay: s,
  onTogglePerfOverlay: i
}) {
  const l = oe(), { labels: d } = _t(), [c, a] = et(t.viewport.zoom), [u, f] = et(!1), [y, p] = et(!1), [g, m] = et(() => t.originView != null), [x, b] = et(
    () => t.getAllNodes().filter((T) => T.type === "frame").length
  );
  St(() => {
    const T = () => a(t.viewport.zoom), E = () => {
      f(t.canUndo()), p(t.canRedo());
    }, z = () => {
      b(t.getAllNodes().filter((j) => j.type === "frame").length), m(t.originView != null);
    };
    return t.on("viewport", T), t.on("history", E), t.on("change", z), t.on("node:create", z), t.on("node:delete", z), () => {
      t.off("viewport", T), t.off("history", E), t.off("change", z), t.off("node:create", z), t.off("node:delete", z);
    };
  }, [t]);
  const w = l.panelBg, M = `1px solid ${l.border}`, v = {
    ...Vy,
    borderRadius: l.panelBorderRadius
  }, C = {
    width: 1,
    height: 20,
    background: l.separator,
    flexShrink: 0
  };
  return /* @__PURE__ */ S(
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
      onPointerDown: (T) => T.stopPropagation(),
      children: [
        /* @__PURE__ */ S("div", { "data-sb-bar-zoom": !0, style: { ...v, background: w, border: M, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.zoomOut,
              onClick: () => jy(t),
              style: { ...De, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Fe, { name: "minus" })
            }
          ),
          /* @__PURE__ */ h("div", { style: C }),
          /* @__PURE__ */ S(
            "button",
            {
              title: d.resetZoom,
              onClick: () => {
                t.viewport.zoom = 1, t.pan(0, 0);
              },
              style: {
                ...De,
                minWidth: 48,
                height: 32,
                color: l.text,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
                padding: "0 4px"
              },
              children: [
                Math.round(c * 100),
                "%"
              ]
            }
          ),
          /* @__PURE__ */ h("div", { style: C }),
          /* @__PURE__ */ h(
            "button",
            {
              title: d.zoomIn,
              onClick: () => Gy(t),
              style: { ...De, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Fe, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-nav": !0, style: { ...v, background: w, border: M, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.fitToContent,
              onClick: () => t.fitToContent(),
              style: { ...De, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Fe, { name: "fit" })
            }
          ),
          /* @__PURE__ */ h("div", { style: C }),
          /* @__PURE__ */ h(
            "button",
            {
              title: d.canvasSearchOpen,
              onClick: () => {
                document.dispatchEvent(new CustomEvent("sb:search-open"));
              },
              style: {
                ...De,
                width: 32,
                height: 32,
                color: l.textMuted
              },
              children: /* @__PURE__ */ h(Fe, { name: "search" })
            }
          ),
          /* @__PURE__ */ h("div", { style: C }),
          /* @__PURE__ */ h(
            "button",
            {
              title: g ? d.clearOriginView : d.saveOriginView,
              onClick: () => {
                g ? (t.clearOriginView(), m(!1)) : (t.setOriginView(), m(!0));
              },
              style: { ...De, width: 32, height: 32, color: g ? l.accentColor : l.textFaint },
              children: /* @__PURE__ */ h(Fe, { name: g ? "bookmark-fill" : "bookmark" })
            }
          ),
          /* @__PURE__ */ h("div", { style: C }),
          /* @__PURE__ */ h(
            "button",
            {
              title: d.goToOriginView,
              onClick: () => {
                g && t.goToOriginView();
              },
              disabled: !g,
              style: { ...De, width: 32, height: 32, color: g ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Fe, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-present": !0, style: { ...v, overflow: "visible", background: w, border: M, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.presentSlides,
              onClick: () => t.enterPresentation(),
              style: { ...De, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Fe, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h("div", { style: C }),
            /* @__PURE__ */ S(
              "button",
              {
                title: d.toggleSlidesPanel,
                onClick: o,
                style: {
                  ...De,
                  width: 32,
                  height: 32,
                  color: e ? l.text : l.textMuted,
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ h(Fe, { name: "slides" }),
                  x > 0 && /* @__PURE__ */ h(
                    "span",
                    {
                      style: {
                        position: "absolute",
                        top: -4,
                        right: -4,
                        minWidth: 14,
                        height: 14,
                        borderRadius: 7,
                        background: l.accentColor,
                        color: "#fff",
                        fontSize: 9,
                        fontWeight: 700,
                        lineHeight: "14px",
                        textAlign: "center",
                        padding: "0 3px",
                        pointerEvents: "none"
                      },
                      children: x
                    }
                  )
                ]
              }
            )
          ] }),
          r && /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h("div", { style: C }),
            /* @__PURE__ */ h(
              "button",
              {
                title: d.toggleMinimap,
                onClick: r,
                style: {
                  ...De,
                  width: 32,
                  height: 32,
                  color: n ? l.accentColor : l.textMuted
                },
                children: /* @__PURE__ */ h(Fe, { name: "minimap" })
              }
            )
          ] }),
          i && /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h("div", { style: C }),
            /* @__PURE__ */ h(
              "button",
              {
                title: d.togglePerformanceOverlay,
                onClick: i,
                style: {
                  ...De,
                  width: 32,
                  height: 32,
                  color: s ? l.accentColor : l.textMuted
                },
                children: /* @__PURE__ */ h(Fe, { name: "gauge" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-history": !0, style: { ...v, background: w, border: M, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.undo,
              onClick: () => t.undo(),
              disabled: !u,
              style: { ...De, width: 32, height: 32, color: u ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Fe, { name: "undo" })
            }
          ),
          /* @__PURE__ */ h("div", { style: C }),
          /* @__PURE__ */ h(
            "button",
            {
              title: d.redo,
              onClick: () => t.redo(),
              disabled: !y,
              style: { ...De, width: 32, height: 32, color: y ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Fe, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
function qy(t) {
  return t.matches.length === 0 ? "0/0" : `${t.activeIndex >= 0 ? t.activeIndex + 1 : 0}/${t.matches.length}`;
}
function Uy({ engine: t }) {
  const e = oe(), { labels: o } = _t(), [n, r] = et(!1), [s, i] = et(() => t.getSearchState()), l = ut(null), d = Kt(() => qy(s), [s]);
  return St(() => {
    const c = () => i(t.getSearchState()), a = () => {
      r(!0), requestAnimationFrame(() => {
        var f;
        return (f = l.current) == null ? void 0 : f.focus();
      });
    }, u = document;
    return t.on("search", c), u.addEventListener("sb:search-open", a), () => {
      t.off("search", c), u.removeEventListener("sb:search-open", a);
    };
  }, [t]), St(() => {
    const c = (a) => {
      (a.ctrlKey || a.metaKey) && a.key.toLowerCase() === "f" && (a.preventDefault(), r(!0), requestAnimationFrame(() => {
        var f;
        return (f = l.current) == null ? void 0 : f.focus();
      }));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, []), St(() => {
    if (!n) return;
    const c = (a) => {
      var f;
      (a.ctrlKey || a.metaKey) && a.key.toLowerCase() === "f" ? (a.preventDefault(), (f = l.current) == null || f.focus()) : a.key === "Escape" && (a.preventDefault(), s.query ? t.clearSearch() : r(!1));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [t, n, s.query]), n ? /* @__PURE__ */ S(
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
            ref: l,
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
        /* @__PURE__ */ h("span", { style: { minWidth: 42, textAlign: "center", color: e.textMuted, fontSize: 12 }, children: d }),
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
              t.clearSearch(), r(!1);
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
const _l = Bn(!1);
function Zy() {
  return Ge(_l);
}
const hs = 240, Ta = 6;
function us(t) {
  const o = t.getAllNodes().filter((a) => a.type === "frame");
  if (o.length === 0) return [];
  const n = o.map((a) => ({
    id: a.id,
    x: a.x,
    y: a.y,
    slideOrder: a.data.slideOrder,
    label: a.data.label || "",
    borderColor: a.data.borderColor,
    transition: a.data.transition,
    transitionDuration: a.data.transitionDuration
  })), r = n.filter((a) => a.slideOrder != null).sort((a, u) => a.slideOrder - u.slideOrder), s = n.filter((a) => a.slideOrder == null), i = 100;
  s.sort((a, u) => a.y - u.y);
  const l = [];
  for (const a of s) {
    const u = l[l.length - 1];
    u && Math.abs(a.y - u[0].y) < i ? u.push(a) : l.push([a]);
  }
  const d = l.flatMap((a) => a.sort((u, f) => u.x - f.x));
  return [...r, ...d].map((a, u) => ({
    id: a.id,
    label: a.label || `Frame ${u + 1}`,
    order: u + 1,
    slideOrder: a.slideOrder,
    borderColor: a.borderColor,
    transition: a.transition,
    transitionDuration: a.transitionDuration
  }));
}
const Qy = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Jy() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...Qy }) });
}
function $y(t, e, o) {
  const [n, r] = et("");
  return St(() => {
    let s = !1;
    return xf(t, e).then((i) => {
      s || r(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), n;
}
function _y({ engine: t, frameId: e, tick: o }) {
  const n = $y(t, e, o);
  return n ? /* @__PURE__ */ h(
    "img",
    {
      src: n,
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
const t0 = ["pan", "fade", "dissolve", "zoom", "fold", "cube", "none"];
function za({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ h("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ h("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ h("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ h("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ h("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ h("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ h("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ h("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const e0 = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function o0({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: n,
  theme: r,
  labels: s
}) {
  const [i, l] = et(!1), [d, c] = et(!1), a = ut(null), u = ut(null), f = t !== "none", y = e ?? En[t], p = {
    pan: s.transitionPan,
    fade: s.transitionFadeToBlack,
    dissolve: s.transitionDissolve,
    zoom: s.transitionZoom,
    fold: s.transitionFold,
    cube: s.transitionCube,
    none: s.transitionNoneInstant
  };
  St(() => {
    if (!i && !d) return;
    const m = (x) => {
      i && a.current && !a.current.contains(x.target) && l(!1), d && u.current && !u.current.contains(x.target) && c(!1);
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, [i, d]);
  const g = {
    border: `1px solid ${r.border}`,
    background: r.panelBg,
    borderRadius: 10,
    height: 20,
    padding: "0 6px",
    display: "flex",
    alignItems: "center",
    gap: 3,
    cursor: "pointer",
    color: r.textMuted,
    fontSize: 9,
    position: "relative",
    zIndex: 1
  };
  return /* @__PURE__ */ S(
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
        zIndex: i || d ? 50 : void 0
      },
      children: [
        /* @__PURE__ */ h("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: r.border } }),
        /* @__PURE__ */ S("div", { ref: a, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            l((m) => !m), c(!1);
          }, style: g, children: [
            /* @__PURE__ */ h(za, { type: t }),
            /* @__PURE__ */ h("span", { children: p[t] ?? s.transitionPan }),
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
                background: r.panelBg,
                border: `1px solid ${r.border}`,
                borderRadius: 6,
                padding: 3,
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minWidth: 100,
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
              },
              children: t0.map((m) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    o(m), l(!1);
                  },
                  style: {
                    border: "none",
                    background: m === t ? r.controlBgActive : "transparent",
                    color: r.text,
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
                    /* @__PURE__ */ h(za, { type: m }),
                    p[m]
                  ]
                },
                m
              ))
            }
          )
        ] }),
        f && /* @__PURE__ */ S("div", { ref: u, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            c((m) => !m), l(!1);
          }, style: g, children: [
            /* @__PURE__ */ S("span", { children: [
              y,
              "ms"
            ] }),
            /* @__PURE__ */ h("span", { style: { fontSize: 7 }, children: d ? "▲" : "▼" })
          ] }),
          d && /* @__PURE__ */ h(
            "div",
            {
              style: {
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: 2,
                background: r.panelBg,
                border: `1px solid ${r.border}`,
                borderRadius: 6,
                padding: 3,
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minWidth: 64,
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
              },
              children: e0.map((m) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    n(m === En[t] ? void 0 : m), c(!1);
                  },
                  style: {
                    border: "none",
                    background: m === y ? r.controlBgActive : "transparent",
                    color: r.text,
                    borderRadius: 4,
                    padding: "4px 8px",
                    fontSize: 10,
                    cursor: "pointer",
                    textAlign: "center",
                    width: "100%"
                  },
                  children: [
                    m,
                    "ms",
                    m === En[t] ? " •" : ""
                  ]
                },
                m
              ))
            }
          )
        ] })
      ]
    }
  );
}
function n0({ engine: t, open: e, onClose: o }) {
  const n = oe(), { isRTL: r, labels: s } = _t(), i = Zy(), [l, d] = et(() => us(t)), [c, a] = et(() => new Set(t.selection)), [u, f] = et(0), y = Ar(t, "frames-panel"), p = ut(null), g = ut(null), m = ut(0), x = ut(!1), b = ut(l);
  b.current = l;
  const w = ut(!1), M = ut(!1), [v, C] = et(null), [T, E] = et(null), [z, j] = et(0), Y = ut([]), nt = ut(null), rt = lt(() => {
    if (w.current) return;
    const G = us(t);
    d(G);
  }, [t]), pt = lt(() => {
    a(new Set(t.selection));
  }, [t]), xt = ut(null), mt = lt(() => {
    xt.current && clearTimeout(xt.current), xt.current = setTimeout(() => f((G) => G + 1), 500);
  }, []);
  St(() => {
    rt(), pt();
    const G = setTimeout(() => f((J) => J + 1), 200), q = () => {
      rt(), mt();
    };
    return t.on("change", q), t.on("node:create", q), t.on("node:delete", q), t.on("node:data", q), t.on("selection", pt), t.on("history", q), () => {
      clearTimeout(G), t.off("change", q), t.off("node:create", q), t.off("node:delete", q), t.off("node:data", q), t.off("selection", pt), t.off("history", q), xt.current && clearTimeout(xt.current);
    };
  }, [t, rt, pt, mt]), St(() => {
    if (!nt.current) return;
    const G = nt.current.querySelectorAll("[data-frame-card]");
    Y.current = Array.from(G).map((q) => q.offsetHeight + Ta);
  }, [l]);
  const W = lt(
    (G) => {
      t.select(G), t.zoomToNode(G, 0.8);
    },
    [t]
  ), B = lt(
    (G, q) => {
      G.preventDefault(), G.stopPropagation(), m.current = G.clientY, p.current = q, g.current = q, x.current = !1;
    },
    []
  );
  return St(() => {
    const G = (J) => {
      if (p.current === null) return;
      const H = J.clientY - m.current;
      if (!x.current) {
        if (Math.abs(H) < 4) return;
        x.current = !0, C(p.current), E(p.current);
      }
      j(H);
      const $ = Y.current, st = p.current;
      let it = st;
      if (H > 0) {
        let U = 0;
        for (let tt = st + 1; tt < b.current.length && (U += $[tt] || 0, H > U - ($[tt] || 0) / 2); tt++)
          it = tt;
      } else if (H < 0) {
        let U = 0;
        for (let tt = st - 1; tt >= 0 && (U -= $[tt] || 0, H < U + ($[tt] || 0) / 2); tt--)
          it = tt;
      }
      g.current = it, E(it);
    }, q = () => {
      const J = p.current, H = g.current;
      if (J !== null && H !== null && J !== H) {
        w.current = !0;
        const $ = [...b.current], [st] = $.splice(J, 1);
        $.splice(H, 0, st);
        let it = !0;
        for (let U = 0; U < $.length; U++) {
          const tt = $[U], dt = t.getNode(tt.id);
          dt && (it ? (t.updateNodeWithHistory(tt.id, {
            data: { ...dt.data, slideOrder: U + 1 }
          }), it = !1) : t.updateNode(tt.id, {
            data: { ...dt.data, slideOrder: U + 1 }
          }));
        }
        w.current = !1, M.current = !0, d(us(t)), f((U) => U + 1);
      }
      p.current = null, g.current = null, x.current = !1, C(null), E(null), j(0), M.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          M.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", G), document.addEventListener("pointerup", q), document.addEventListener("pointercancel", q), () => {
      document.removeEventListener("pointermove", G), document.removeEventListener("pointerup", q), document.removeEventListener("pointercancel", q);
    };
  }, [t]), /* @__PURE__ */ S(
    "div",
    {
      "data-sb-frames-panel": !0,
      style: {
        position: "absolute",
        top: 0,
        right: r ? void 0 : 0,
        left: r ? 0 : void 0,
        bottom: 0,
        width: hs,
        background: n.panelBg,
        borderLeft: r ? void 0 : `1px solid ${n.border}`,
        borderRight: r ? `1px solid ${n.border}` : void 0,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : r ? `translateX(-${hs}px)` : `translateX(${hs}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (G) => G.stopPropagation(),
      children: [
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 12px",
              borderBottom: `1px solid ${n.border}`,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ S("span", { style: { fontSize: 12, fontWeight: 600, color: n.text, letterSpacing: "0.02em" }, children: [
                s.slidesTitle,
                " (",
                l.length,
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
                    color: n.textMuted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    padding: 0
                  },
                  children: /* @__PURE__ */ h(Jy, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ S(
          "div",
          {
            ref: nt,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: Ta
            },
            children: [
              l.length === 0 && /* @__PURE__ */ h("div", { style: { padding: "20px 8px", textAlign: "center", color: n.textMuted, fontSize: 11 }, children: s.noFramesYet }),
              l.map((G, q) => {
                const J = c.has(G.id), H = v === q;
                let $ = 0;
                if (H)
                  $ = z;
                else if (v !== null && T !== null) {
                  const U = Y.current;
                  v < T ? q > v && q <= T && ($ = -(U[v] || 0)) : v > T && q >= T && q < v && ($ = U[v] || 0);
                }
                const st = (U) => {
                  const tt = t.getNode(G.id);
                  if (!tt) return;
                  const dt = `${y()}:${G.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    G.id,
                    {
                      data: {
                        ...tt.data,
                        transition: U === "pan" ? void 0 : U,
                        transitionDuration: void 0
                      }
                    },
                    dt
                  );
                }, it = (U) => {
                  const tt = t.getNode(G.id);
                  if (!tt) return;
                  const dt = `${y()}:${G.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    G.id,
                    {
                      data: { ...tt.data, transitionDuration: U }
                    },
                    dt
                  );
                };
                return /* @__PURE__ */ S(Ec.Fragment, { children: [
                  !i && v === null && /* @__PURE__ */ h(
                    o0,
                    {
                      value: G.transition ?? "pan",
                      durationMs: G.transitionDuration,
                      onChange: st,
                      onDurationChange: it,
                      theme: n,
                      labels: s
                    }
                  ),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: i ? void 0 : (U) => B(U, q),
                      onDoubleClick: () => W(G.id),
                      style: {
                        borderRadius: 6,
                        border: J ? `2px solid ${G.borderColor || n.text}` : `1px solid ${n.border}`,
                        background: J ? n.controlBgActive : "transparent",
                        cursor: i ? "pointer" : H ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: i ? "auto" : "none",
                        transition: H || M.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${$}px)`,
                        zIndex: H ? 10 : 1,
                        opacity: H ? 0.92 : 1,
                        boxShadow: H ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ h(_y, { engine: t, frameId: G.id, tick: u })
                    }
                  )
                ] }, G.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const Bo = 50, ps = 30, r0 = `
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
`, s0 = `
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
function Pa(t, e, o) {
  const n = t.createShader(e);
  return n ? (t.shaderSource(n, o), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) ? n : (t.deleteShader(n), null)) : null;
}
function i0(t, e, o) {
  const n = Pa(t, t.VERTEX_SHADER, e), r = Pa(t, t.FRAGMENT_SHADER, o);
  if (!n || !r) return null;
  const s = t.createProgram();
  return t.attachShader(s, n), t.attachShader(s, r), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function a0() {
  const t = [], e = [];
  for (let o = 0; o <= ps; o++)
    for (let n = 0; n <= Bo; n++)
      t.push(n / Bo, o / ps * 2 - 1);
  for (let o = 0; o < ps; o++)
    for (let n = 0; n < Bo; n++) {
      const r = o * (Bo + 1) + n;
      e.push(r, r + Bo + 1, r + 1, r + 1, r + Bo + 1, r + Bo + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function l0({ phase: t, progress: e }) {
  const o = ut(null), n = ut(null);
  return St(() => {
    const r = o.current;
    if (!r) return;
    const s = window.devicePixelRatio || 1;
    r.width = r.clientWidth * s, r.height = r.clientHeight * s;
    const i = r.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const l = i0(i, r0, s0);
    if (!l) return;
    i.useProgram(l);
    const { vertices: d, indices: c } = a0(), a = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, a), i.bufferData(i.ARRAY_BUFFER, d, i.STATIC_DRAW);
    const u = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, u), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const f = i.getAttribLocation(l, "aUV");
    i.enableVertexAttribArray(f), i.vertexAttribPointer(f, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const y = (p) => i.getUniformLocation(l, p);
    return n.current = {
      gl: i,
      locs: { uLayPos: y("uLayPos"), uRadius: y("uRadius"), uSide: y("uSide"), uColor: y("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(l), i.deleteBuffer(a), i.deleteBuffer(u), n.current = null;
    };
  }, []), St(() => {
    const r = n.current;
    if (!r) return;
    const { gl: s, locs: i, count: l } = r, d = t === "out" ? 1 - Math.pow(1 - e, 3) : Math.pow(e, 3), c = t === "out" ? 1 - d : d, a = 0.07 + 0.16 * c;
    s.viewport(0, 0, s.canvas.width, s.canvas.height), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.uniform1f(i.uLayPos, c), s.uniform1f(i.uRadius, a), s.uniform1f(i.uSide, 1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, l, s.UNSIGNED_SHORT, 0), s.uniform1f(i.uSide, -1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, l, s.UNSIGNED_SHORT, 0);
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
const c0 = {
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
}, fs = {
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
}, Xs = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Aa({ dir: t }) {
  return /* @__PURE__ */ S("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ h("polyline", { points: "15,18 9,12 15,6", ...Xs }),
    t === "right" && /* @__PURE__ */ h("polyline", { points: "9,6 15,12 9,18", ...Xs })
  ] });
}
function d0() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...Xs }) });
}
function Ea(t) {
  return 1 - Math.pow(1 - t, 3);
}
function La(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Ra(t, e) {
  let n;
  t <= 0.2 ? n = 1 + (0.55 - 1) * Ea(t / 0.2) : t >= 0.8 ? n = 0.55 + (1 - 0.55) * Ea((t - 0.8) / 0.2) : n = 0.55;
  let r;
  return t <= 0.1 ? r = 0 : t <= 0.5 ? r = -e * 90 * La((t - 0.1) / 0.4) : t <= 0.9 ? r = e * 90 * (1 - La((t - 0.5) / 0.4)) : r = 0, { zoom: n, angle: r };
}
function h0(t, e, o, n) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${n}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function Da(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function u0({ engine: t }) {
  const [e, o] = et(t.presentationMode), [n, r] = et(t.presentationIndex), [s, i] = et(t.presentationSlides.length), [l, d] = et(""), [c, a] = et(t.transitionOverlay), u = ut(null), f = ut(null);
  if (St(() => {
    const p = document.querySelector("[data-sb-canvas]");
    u.current = p, f.current = (p == null ? void 0 : p.parentElement) ?? null;
    const g = () => {
      var w;
      if (o(t.presentationMode), r(t.presentationIndex), i(t.presentationSlides.length), a(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const M = t.presentationSlides[t.presentationIndex], v = t.getNode(M);
        d(((w = v == null ? void 0 : v.data) == null ? void 0 : w.label) || "");
      } else
        d("");
      const m = t.transitionOverlay, x = u.current, b = f.current;
      if (x && b && m && m.type === "cube" && m.t != null) {
        const M = m.direction ?? 1, { zoom: v, angle: C } = Ra(m.t, M);
        h0(x, b, v, C);
      } else x && b && Da(x, b);
    };
    return t.on("presentation", g), () => {
      t.off("presentation", g);
      const m = u.current, x = f.current;
      m && x && Da(m, x);
    };
  }, [t]), !e || s === 0) return null;
  const y = c && c.type === "cube" && c.t != null ? (() => {
    const p = c.direction ?? 1, { angle: g } = Ra(c.t, p);
    return Math.abs(g) / 90 * 0.4;
  })() : 0;
  return /* @__PURE__ */ S(
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
        c && c.type === "fold" && /* @__PURE__ */ h(l0, { phase: c.phase, progress: c.progress }),
        y > 0.01 && /* @__PURE__ */ h(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              backgroundColor: "black",
              opacity: y,
              pointerEvents: "none",
              zIndex: 9999
            }
          }
        ),
        /* @__PURE__ */ S("div", { style: c0, onPointerDown: (p) => p.stopPropagation(), children: [
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...fs, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ h(d0, {})
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...fs, opacity: n <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: n <= 0,
              children: /* @__PURE__ */ h(Aa, { dir: "left" })
            }
          ),
          /* @__PURE__ */ S(
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
                n + 1,
                " / ",
                s,
                l && /* @__PURE__ */ S("span", { style: { opacity: 0.6, marginLeft: 8 }, children: [
                  "— ",
                  l
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...fs, opacity: n >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: n >= s - 1,
              children: /* @__PURE__ */ h(Aa, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
function po(t) {
  return `${t.toFixed(2)} ms`;
}
function Ce(t, e) {
  return { label: t, value: e };
}
function p0() {
  const t = oe(), { labels: e } = _t(), [o, n] = et(() => we.getSnapshot());
  St(() => {
    let s = 0;
    const i = (d) => {
      we.tick(d), s = requestAnimationFrame(i);
    };
    s = requestAnimationFrame(i);
    const l = we.subscribe(() => n(we.getSnapshot()));
    return () => {
      cancelAnimationFrame(s), l();
    };
  }, []);
  const r = Kt(
    () => [
      Ce(e.perfVirtualization, o.virtualizationActive ? e.perfOn : e.perfOff),
      Ce(e.perfFps, o.fps.toFixed(1)),
      Ce(e.perfFrameP50P95, `${po(o.frameMsP50)} / ${po(o.frameMsP95)}`),
      Ce(e.perfCullingP50P95, `${po(o.cullingMsP50)} / ${po(o.cullingMsP95)}`),
      Ce(e.perfHitTestP50P95, `${po(o.hitTestMsP50)} / ${po(o.hitTestMsP95)}`),
      Ce(e.perfEdgeHitP50P95, `${po(o.edgeHitMsP50)} / ${po(o.edgeHitMsP95)}`),
      Ce(e.perfHitTestCalls, o.hitTestCallsPerSec.toFixed(1)),
      Ce(e.perfEdgeHitCalls, o.edgeHitCallsPerSec.toFixed(1)),
      Ce(e.perfVisibleNodes, `${o.visibleNodes} / ${o.totalNodes}`),
      Ce(e.perfVisibleEdges, `${o.visibleEdges} / ${o.totalEdges}`),
      Ce(e.perfSeedVisibleNodes, String(o.seedVisibleNodes)),
      Ce(e.perfNodesAdjacency, String(o.nodesAddedByAdjacency)),
      Ce(e.perfNodesEdgeEndpoints, String(o.nodesAddedByEdgeEndpoints)),
      Ce(e.perfEdgesAdjacency, String(o.edgesAddedByAdjacency)),
      Ce(e.perfEdgesCrossing, String(o.edgesAddedByCrossing))
    ],
    [o, e]
  );
  return /* @__PURE__ */ S(
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
        /* @__PURE__ */ h("div", { style: { padding: "8px 10px", display: "grid", rowGap: 4 }, children: r.map((s) => /* @__PURE__ */ S("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
          /* @__PURE__ */ h("span", { style: { color: t.textMuted }, children: s.label }),
          /* @__PURE__ */ h("span", { children: s.value })
        ] }, s.label)) })
      ]
    }
  );
}
const f0 = Dc(() => import("./DebugPanel-BiuaTRWA.js"));
function W0({
  nodeTypes: t = Du,
  engine: e,
  keyboardShortcuts: o = !0,
  style: n,
  initialData: r,
  toolbar: s = !0,
  debugPanel: i = !1,
  debugBoards: l,
  theme: d,
  onPresentationChange: c,
  gifApiBaseUrl: a,
  direction: u,
  localization: f,
  dataFlowEdgeOverlay: y = "off",
  initialFramesPanelOpen: p = !1,
  preview: g = !1,
  readOnly: m = !1,
  singleFrameId: x
}) {
  const b = Kt(
    () => e ?? new _d(),
    [e]
  ), w = Kt(() => new oh(t), [t]);
  St(() => gd(), []), St(() => {
    b.setRegistry(w);
  }, [b, w]), St(() => {
    b.setReadOnly(m);
  }, [b, m]), St(() => {
    for (const W of t)
      W.isContainer && b.registerContainerType(W.type);
  }, [b, t]);
  const M = ut(!1);
  St(() => {
    if (!r || M.current) return;
    M.current = !0;
    let W = !1;
    return g || x ? (async () => (await b.fromSBD(r), !W && requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        W || (x ? b.fitToFrame(x) : b.fitToContent());
      });
    })))() : b.fromSBD(r), () => {
      W = !0;
    };
  }, [b, r, g, x]);
  const v = ut(null);
  St(() => {
    if (o)
      return _p(b, v.current);
  }, [b, o]);
  const C = Kt(() => t.some((B) => {
    var G;
    return (G = B.ports) == null ? void 0 : G.length;
  }) ? new Wu(b, w) : null, [b, w, t]);
  St(() => {
    if (C)
      return C.connect();
  }, [C]);
  const T = Kt(
    () => d ? { ...Ls, ...d } : Ls,
    [d]
  ), E = ju(u, f), [z, j] = et(!1), [Y, nt] = et(p), [rt, pt] = et(!g), [xt, mt] = et(!1);
  return St(() => {
    we.setEnabled(g ? !1 : xt);
  }, [g, xt]), St(() => {
    const W = () => {
      const B = b.presentationMode;
      j(B), c == null || c(B);
    };
    return b.on("presentation", W), () => b.off("presentation", W);
  }, [b, c]), /* @__PURE__ */ h(yl.Provider, { value: E, children: /* @__PURE__ */ h(fl.Provider, { value: T, children: /* @__PURE__ */ h(_l.Provider, { value: m, children: /* @__PURE__ */ S(
    "div",
    {
      ref: v,
      dir: E.dir,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        ...n
      },
      children: [
        s && !z && !m && /* @__PURE__ */ h(Yy, { engine: b, registry: w, gifApiBaseUrl: a }),
        i && /* @__PURE__ */ h(Rc, { fallback: null, children: /* @__PURE__ */ h(f0, { engine: b, extraBoards: l }) }),
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !z && !m && !E.isRTL ? eo : 0,
              top: 0,
              right: s && !z && !m && E.isRTL ? eo : 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ h(
                zf,
                {
                  engine: b,
                  schema: Gs,
                  registry: w,
                  dataFlow: C,
                  dataFlowEdgeOverlay: y,
                  minimapVisible: g ? !1 : rt,
                  singleFrameId: x
                }
              ),
              !g && !z && /* @__PURE__ */ h(Uy, { engine: b }),
              !g && !z && /* @__PURE__ */ h(
                Ky,
                {
                  engine: b,
                  framesPanelOpen: Y,
                  onToggleFramesPanel: () => nt((W) => !W),
                  showMinimap: rt,
                  onToggleMinimap: () => pt((W) => !W),
                  showPerfOverlay: xt,
                  onTogglePerfOverlay: () => mt((W) => !W)
                }
              ),
              !g && !z && xt && /* @__PURE__ */ h(p0, {}),
              !g && !z && /* @__PURE__ */ h(
                n0,
                {
                  engine: b,
                  open: Y,
                  onClose: () => nt(!1)
                }
              ),
              !g && /* @__PURE__ */ h(u0, { engine: b }),
              m && !z && !g && /* @__PURE__ */ h(
                "div",
                {
                  "data-sb-readonly-pill": !0,
                  style: {
                    position: "absolute",
                    top: 12,
                    [E.isRTL ? "left" : "right"]: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    background: T.panelBg,
                    color: T.textMuted,
                    border: `1px solid ${T.border}`,
                    boxShadow: T.panelShadow,
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 10
                  },
                  children: E.labels.viewOnly ?? "View only"
                }
              )
            ]
          }
        )
      ]
    }
  ) }) }) });
}
const y0 = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], an = {
  border: "none",
  borderRadius: 6,
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
function zn({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...le }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ...le })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...le }),
    t === "text" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M7 4h10", ...le }),
      /* @__PURE__ */ h("path", { d: "M12 4v16", ...le })
    ] }),
    t === "note" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ...le }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...le }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...le, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...le, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...le, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...le }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ...le })
    ] }),
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...le }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...le }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...le }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...le }),
    t === "arrow" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...le }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...le, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...le, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...le, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...le, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...le, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ...le }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...le }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...le })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...le }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...le })
    ] })
  ] });
}
function B0({ engine: t }) {
  const [e, o] = et(t.mode), [n, r] = et(!1), [s, i] = et(!1), [l, d] = et(t.boardBackground);
  return St(() => {
    const c = () => o(t.mode), a = () => {
      r(t.canUndo()), i(t.canRedo());
    }, u = () => d(t.boardBackground);
    return t.on("mode", c), t.on("history", a), t.on("background", u), () => {
      t.off("mode", c), t.off("history", a), t.off("background", u);
    };
  }, [t]), /* @__PURE__ */ S(
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
        y0.map((c) => /* @__PURE__ */ h(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...an,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(zn, { name: c.key })
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
              ...an,
              width: 20,
              height: 20,
              background: c.color,
              border: l === c.key ? "2px solid white" : "2px solid transparent",
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
              ...an,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(zn, { name: "print" })
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
            disabled: !n,
            style: {
              ...an,
              width: 36,
              height: 36,
              background: "transparent",
              color: n ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(zn, { name: "undo" })
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...an,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(zn, { name: "redo" })
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
              ...an,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(zn, { name: "fit" })
          }
        )
      ]
    }
  );
}
const fo = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], g0 = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], m0 = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], ln = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], b0 = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], cn = [1, 2.5, 5, 10, 20], x0 = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], w0 = [14, 20, 28, 36], k0 = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], ys = 300, te = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, ee = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0
}, ie = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
};
function N0({
  engine: t,
  registry: e
}) {
  const [o, n] = et(t.mode), [r, s] = et(t.selection), [, i] = et(0), [l, d] = et(null), c = ut(null), a = ut(null), [u, f] = et(!1), y = lt(() => {
    var at;
    return { x: (((at = c.current) == null ? void 0 : at.ownerDocument.defaultView) ?? window).innerWidth - ys - 12, y: 12 };
  }, []), p = l ?? y();
  St(() => {
    const I = () => n(t.mode), at = () => {
      s(new Set(t.selection)), i((ve) => ve + 1);
    }, ae = () => i((ve) => ve + 1);
    return t.on("mode", I), t.on("selection", at), t.on("change", ae), () => {
      t.off("mode", I), t.off("selection", at), t.off("change", ae);
    };
  }, [t]);
  const g = lt((I) => {
    I.stopPropagation(), f(!0);
    const at = l ? l.x : y().x, ae = l ? l.y : y().y;
    a.current = { startX: I.clientX, startY: I.clientY, startLeft: at, startTop: ae }, I.currentTarget.setPointerCapture(I.pointerId);
  }, [l, y]);
  St(() => {
    var ve;
    const I = (ce) => {
      var Ao;
      if (!a.current) return;
      const Oe = ce.clientX - a.current.startX, qt = ce.clientY - a.current.startY, Ve = ((Ao = c.current) == null ? void 0 : Ao.ownerDocument.defaultView) ?? window, Po = Math.max(48, Math.min(Ve.innerWidth - ys - 8, a.current.startLeft + Oe)), bn = Math.max(8, Math.min(Ve.innerHeight - 100, a.current.startTop + qt));
      d({ x: Po, y: bn });
    }, at = () => {
      a.current = null, f(!1);
    }, ae = ((ve = c.current) == null ? void 0 : ve.ownerDocument) ?? document;
    return ae.addEventListener("pointermove", I), ae.addEventListener("pointerup", at), ae.addEventListener("pointercancel", at), () => {
      ae.removeEventListener("pointermove", I), ae.removeEventListener("pointerup", at), ae.removeEventListener("pointercancel", at);
    };
  }, []);
  const m = Kt(() => r.size === 1 ? Array.from(r)[0] : o === "draw" || o === "shape" || o === "text" || o === "edge" ? "tool" : "none", [r, o]), x = Ar(t, m), b = (() => {
    if (r.size === 1) {
      const I = Array.from(r)[0], at = t.getNode(I);
      if ((at == null ? void 0 : at.type) === "shape") return { kind: "shape", node: at };
      if ((at == null ? void 0 : at.type) === "draw") return { kind: "draw", node: at };
      if ((at == null ? void 0 : at.type) === "text") return { kind: "text", node: at };
      if ((at == null ? void 0 : at.type) === "edge") return { kind: "edge", node: at };
      if ((at == null ? void 0 : at.type) === "image") return { kind: "image", node: at };
      if ((at == null ? void 0 : at.type) === "content") return { kind: "content", node: at };
      if ((at == null ? void 0 : at.type) === "frame") return { kind: "frame", node: at };
      if ((at == null ? void 0 : at.type) === "sticky") return { kind: "sticky", node: at };
      if (at && e) {
        const ae = e.get(at.type);
        if (ae != null && ae.propertiesPanel)
          return { kind: "custom", node: at, PanelComponent: ae.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" || o === "edge" ? { kind: "tool" } : null;
  })(), w = lt(
    (I) => {
      if (!b || b.kind !== "shape") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  ), M = lt(
    (I) => {
      if (!b || b.kind !== "draw") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  ), v = lt(
    (I) => {
      if (!b || b.kind !== "text") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  ), C = lt(
    (I) => {
      if (!b || b.kind !== "edge") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  ), T = lt(
    (I) => {
      if (!b || b.kind !== "image") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  ), E = lt(
    (I) => {
      if (!b || b.kind !== "content") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  ), z = lt(
    (I) => {
      if (!b || b.kind !== "frame") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  ), j = lt(
    (I) => {
      if (!b || b.kind !== "sticky") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  ), Y = lt(
    (I) => {
      if (!b || b.kind !== "custom") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        at
      );
    },
    [t, b, x]
  );
  if (!b) return null;
  const nt = b.kind === "custom", rt = b.kind === "shape", pt = b.kind === "draw", xt = b.kind === "text", mt = b.kind === "edge", W = b.kind === "image", B = b.kind === "content", G = b.kind === "frame", q = b.kind === "sticky", J = b.kind === "tool", H = J && o === "shape", $ = J && o === "text", st = xt ? b.node.data.fontFamily : t.activeTool.fontFamily ?? xo, it = xt ? b.node.data.fontSize : t.activeTool.fontSize ?? 20, U = xt ? b.node.data.align : t.activeTool.textAlign ?? "left", tt = xt ? b.node.data.color : t.activeTool.color, dt = rt ? b.node.data.stroke : pt ? b.node.data.color : t.activeTool.color, _ = rt || pt ? b.node.data.fill ?? null : t.activeTool.fillColor ?? null, ht = rt || pt ? b.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", gt = rt || pt ? b.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", ft = rt || pt ? b.node.data.strokeWidth : t.activeTool.width, wt = rt ? b.node.data.roughness : t.activeTool.roughness ?? 1, zt = rt || pt || xt || W || B || G || q ? b.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Ft = (() => {
    const I = /* @__PURE__ */ new Set(), at = [];
    for (const ae of t.getAllNodes())
      if (ae.type === "text") {
        const ve = ae.data.fontFamily;
        ve && !I.has(ve) && (I.add(ve), at.push(ve));
      }
    return at;
  })(), Et = !xt && !$ && !mt && !W && !B && !G && !q && !nt, ct = Et, Bt = Et, Gt = rt || H, Ut = xt || $, Jt = (I) => {
    rt ? w({ stroke: I }) : pt ? M({ color: I }) : (t.activeTool.color = I, i((at) => at + 1));
  }, Zt = (I) => {
    rt ? w({ fill: I ?? void 0 }) : pt ? M({ fill: I ?? void 0 }) : (t.activeTool.fillColor = I ?? void 0, i((at) => at + 1));
  }, yt = (I) => {
    rt ? w({ fillStyle: I }) : pt ? M({ fillStyle: I }) : (t.activeTool.fillStyle = I, i((at) => at + 1));
  }, fe = (I) => {
    rt ? w({ strokeStyle: I }) : pt ? M({ strokeStyle: I }) : (t.activeTool.strokeStyle = I, i((at) => at + 1));
  }, de = (I) => {
    rt ? w({ strokeWidth: I }) : pt ? M({ strokeWidth: I }) : (t.activeTool.width = I, i((at) => at + 1));
  }, se = (I) => {
    rt ? w({ roughness: I }) : (t.activeTool.roughness = I, i((at) => at + 1));
  }, ge = (I) => {
    rt ? w({ opacity: I }) : pt ? M({ opacity: I }) : xt ? v({ opacity: I }) : W ? T({ opacity: I }) : B ? E({ opacity: I }) : G ? z({ opacity: I }) : q ? j({ opacity: I }) : (t.activeTool.opacity = I, i((at) => at + 1));
  }, ke = (I) => {
    xt ? v({ fontFamily: I }) : (t.activeTool.fontFamily = I, i((at) => at + 1));
  }, Ne = (I) => {
    xt ? v({ fontSize: I }) : (t.activeTool.fontSize = I, i((at) => at + 1));
  }, mn = (I) => {
    xt ? v({ align: I }) : (t.activeTool.textAlign = I, i((at) => at + 1));
  }, zo = (I) => {
    xt ? v({ color: I }) : (t.activeTool.color = I, i((at) => at + 1));
  }, Je = {
    position: "fixed",
    left: p.x,
    top: p.y,
    width: ys,
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
  return /* @__PURE__ */ S(
    "div",
    {
      ref: c,
      "data-sb-props-panel": !0,
      style: Je,
      onPointerDown: (I) => I.stopPropagation(),
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: g,
            style: {
              cursor: u ? "grabbing" : "grab",
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
        Ut && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Font" }),
            /* @__PURE__ */ h(
              Lr,
              {
                value: st,
                onChange: ke,
                fontsInScene: Ft
              }
            )
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Size" }),
            w0.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Ne(I),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: it === I ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: I
              },
              I
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Align" }),
            k0.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.key,
                onClick: () => mn(I.key),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: U === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: I.label
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Color" }),
            fo.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => zo(I),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I,
                  border: tt === I ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          xt && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Border" }),
            [null, ...fo].map((I, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => v({ borderColor: I ?? void 0 }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ h(
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
              I ?? "none"
            ))
          ] }),
          xt && b.node.data.borderColor && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => v({ borderStyle: I.key }),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          xt && b.node.data.borderColor && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => v({ borderWidth: I }),
                style: {
                  ...ie,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(I, 1),
                      background: "white",
                      borderRadius: I / 2
                    }
                  }
                )
              },
              I
            ))
          ] })
        ] }),
        Et && /* @__PURE__ */ S(Mt, { children: [
          H && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Shape" }),
            x0.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => {
                  t.activeTool.shapeType = I.key, i((at) => at + 1);
                },
                style: {
                  ...ie,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(v0, { name: I.key })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Stroke" }),
            fo.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Jt(I),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I,
                  border: dt === I ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          ct && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Fill" }),
            g0.map((I, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Zt(I),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: _ === I ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ h(
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
              I ?? "none"
            ))
          ] }),
          ct && _ && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Fill pattern" }),
            m0.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => yt(I.key),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: ht === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(S0, { style: I.key })
              },
              I.key
            ))
          ] }),
          Bt && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Stroke style" }),
            ln.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => fe(I.key),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: gt === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Stroke width" }),
            cn.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => de(I),
                style: {
                  ...ie,
                  width: 36,
                  height: 24,
                  background: ft === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(I, 1),
                      background: "white",
                      borderRadius: I / 2
                    }
                  }
                )
              },
              I
            ))
          ] }),
          Gt && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Roughness" }),
            b0.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => se(I.value),
                style: {
                  ...ie,
                  height: 28,
                  padding: "0 8px",
                  background: wt === I.value ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: I.label
              },
              I.value
            ))
          ] })
        ] }),
        mt && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Color" }),
            fo.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ color: I }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I,
                  border: b.node.data.color === I ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => C({ style: I.key }),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: b.node.data.style === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => C({ strokeWidth: I }),
                style: {
                  ...ie,
                  width: 36,
                  height: 24,
                  background: b.node.data.strokeWidth === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(I, 1),
                      background: "white",
                      borderRadius: I / 2
                    }
                  }
                )
              },
              I
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ arrowHead: I }),
                style: {
                  ...ie,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.arrowHead ?? "none") === I ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: I === "none" ? "None" : I === "arrow" ? "▷" : I === "filled" ? "▶" : "●"
              },
              I
            ))
          ] }),
          (b.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Head size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3),
                onChange: (I) => C({ arrowHeadSize: Number(I.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ arrowTail: I }),
                style: {
                  ...ie,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.arrowTail ?? "none") === I ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: I === "none" ? "None" : I === "arrow" ? "◁" : I === "filled" ? "◀" : "●"
              },
              I
            ))
          ] }),
          (b.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Tail size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3),
                onChange: (I) => C({ arrowTailSize: Number(I.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (I) => C({ label: I.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => C({ edgeType: I.key }),
                style: {
                  ...ie,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.edgeType ?? "bezier") === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: I.label
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Animate" }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ animated: !b.node.data.animated }),
                style: {
                  ...ie,
                  height: 28,
                  padding: "0 12px",
                  background: b.node.data.animated ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: b.node.data.animated ? "On" : "Off"
              }
            )
          ] }),
          b.node.data.animated && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Direction" }),
            ["forward", "reverse", "both"].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ animatedDirection: I }),
                style: {
                  ...ie,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.animatedDirection ?? "forward") === I ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: I === "forward" ? "→" : I === "reverse" ? "←" : "⇆"
              },
              I
            ))
          ] })
        ] }),
        W && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Border" }),
            [null, ...fo].map((I, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => T({ borderColor: I ?? void 0 }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ h(
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
              I ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => T({ borderStyle: I.key }),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => T({ borderWidth: I }),
                style: {
                  ...ie,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(I, 1),
                      background: "white",
                      borderRadius: I / 2
                    }
                  }
                )
              },
              I
            ))
          ] })
        ] }),
        B && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Border" }),
            [null, ...fo].map((I, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => E({ borderColor: I ?? void 0 }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ h(
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
              I ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => E({ borderStyle: I.key }),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => E({ borderWidth: I }),
                style: {
                  ...ie,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(I, 1),
                      background: "white",
                      borderRadius: I / 2
                    }
                  }
                )
              },
              I
            ))
          ] })
        ] }),
        G && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (I) => z({ label: I.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Background" }),
            [null, ...fo].map((I, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => z({ backgroundColor: I ? `${I}15` : void 0 }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (() => {
                    const ae = b.node.data.backgroundColor;
                    return (I === null ? !ae : ae === `${I}15`) ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`;
                  })(),
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ h(
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
              I ?? "none"
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Border" }),
            fo.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => z({ borderColor: I }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I,
                  border: b.node.data.borderColor === I ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => z({ borderStyle: I.key }),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "dashed") === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => z({ borderWidth: I }),
                style: {
                  ...ie,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(I, 1),
                      background: "white",
                      borderRadius: I / 2
                    }
                  }
                )
              },
              I
            ))
          ] })
        ] }),
        q && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => j({ color: I }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I,
                  border: b.node.data.color === I ? "2px solid #1e1e2e" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: te, children: [
            /* @__PURE__ */ h("span", { style: ee, children: "Size" }),
            [12, 14, 16, 20, 24].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => j({ fontSize: I }),
                style: {
                  ...ie,
                  width: 32,
                  height: 24,
                  background: (b.node.data.fontSize ?? 16) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                  fontSize: 10,
                  color: "white"
                },
                children: I
              },
              I
            ))
          ] })
        ] }),
        nt && (() => {
          const { node: I, PanelComponent: at } = b;
          return /* @__PURE__ */ h(at, { node: I, data: I.data, engine: t, updateData: Y });
        })(),
        !mt && !nt && /* @__PURE__ */ S("div", { style: te, children: [
          /* @__PURE__ */ h("span", { style: ee, children: "Opacity" }),
          /* @__PURE__ */ h(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(zt * 100),
              onChange: (I) => ge(parseInt(I.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ h("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(zt * 100) })
        ] })
      ]
    }
  );
}
function v0({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function S0({ style: t }) {
  return t === "hachure" ? /* @__PURE__ */ S("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ h("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ h("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ S("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ h("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ h("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: "white", strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ h("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ h("rect", { x: 2, y: 2, width: 16, height: 12, fill: "white", rx: 2 }) });
}
function F0({
  preview: t,
  engine: e,
  zoom: o
}) {
  var pt;
  const n = e.getNode(t.fromNodeId);
  if (!n) return null;
  const r = e.getRegistry(), s = e.getAllNodes(), i = e.measuredHeights, l = t.cursorX, d = t.cursorY, c = t.edgeColor || "#3b82f6", a = t.edgeStrokeWidth || 2, u = t.edgeStyle || "solid", f = u === "dashed" ? `${8 * a},${4 * a}` : u === "dotted" ? `${2 * a},${3 * a}` : void 0, y = Math.max(8, a * 3), p = 4 / o, g = {
    fromNode: n,
    sourceHandle: t.sourceHandle,
    sourceT: t.sourceT,
    sourcePort: t.sourcePort,
    sourceDirection: t.sourceDirection,
    edgeType: t.edgeType,
    attachmentGap: t.attachmentGap
  }, m = r == null ? void 0 : r.get(g.fromNode.type), x = g.sourcePort && (m != null && m.ports) ? ze(
    g.fromNode,
    m.ports,
    g.sourcePort,
    o,
    i,
    m.portAnchor ?? "bbox"
  ) ?? void 0 : void 0, b = g.sourcePort && (m != null && m.ports) ? m.ports.find((xt) => xt.id === g.sourcePort) : void 0, w = g.sourceDirection === "output" ? "input" : g.sourceDirection === "input" ? "output" : null;
  let M = null, v, C = null;
  if (r && g.sourcePort && w && b) {
    const xt = Ks / o;
    let mt = 1 / 0;
    for (const W of s) {
      if (W.type === "edge" || W.id === g.fromNode.id) continue;
      const B = r.get(W.type);
      if (!((pt = B == null ? void 0 : B.ports) != null && pt.length)) continue;
      const G = B.ports.filter((q) => q.direction === w);
      for (const q of G) {
        if (b.dataType !== "any" && q.dataType !== "any" && b.dataType !== q.dataType)
          continue;
        const J = ze(W, B.ports, q.id, o, i, B.portAnchor ?? "bbox");
        if (!J) continue;
        const H = Math.hypot(J.x - l, J.y - d);
        H < xt && H < mt && (mt = H, M = W, C = q.id);
      }
    }
  }
  if (!C) {
    const xt = 50 / o;
    for (const mt of s) {
      if (mt.type === "edge" || mt.id === g.fromNode.id) continue;
      const W = mt.h === "auto" ? (i == null ? void 0 : i[mt.id]) ?? 100 : mt.h, B = mt.w * 0.2, G = W * 0.2;
      if (l >= mt.x - B && l <= mt.x + mt.w + B && d >= mt.y - G && d <= mt.y + W + G) {
        const q = We(mt, l, d, i);
        if (Math.hypot(q.x - l, q.y - d) < xt) {
          M = mt, v = q.t;
          break;
        }
      }
    }
  }
  const T = M ? r == null ? void 0 : r.get(M.type) : void 0, E = M && C && (T != null && T.ports) ? ze(
    M,
    T.ports,
    C,
    o,
    i,
    T.portAnchor ?? "bbox"
  ) ?? void 0 : void 0, z = x ? void 0 : g.sourceT, j = E ? void 0 : v;
  let Y;
  if (M)
    Y = Pe(
      g.fromNode,
      M,
      g.edgeType || "bezier",
      i,
      g.sourceHandle,
      void 0,
      void 0,
      void 0,
      x,
      E,
      z,
      j,
      g.attachmentGap
    );
  else {
    const xt = {
      id: "__preview__",
      type: "shape",
      x: l,
      y: d,
      w: 0,
      h: 0,
      data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
    };
    Y = Pe(
      g.fromNode,
      xt,
      g.edgeType || "bezier",
      i,
      g.sourceHandle,
      void 0,
      void 0,
      void 0,
      x,
      void 0,
      z,
      void 0,
      g.attachmentGap
    );
  }
  const nt = !x, rt = !!(M && !E);
  return /* @__PURE__ */ S("g", { children: [
    /* @__PURE__ */ h(
      "path",
      {
        d: Y.path,
        stroke: c,
        strokeWidth: a,
        strokeDasharray: f,
        strokeLinecap: "round",
        fill: "none"
      }
    ),
    /* @__PURE__ */ h(
      "path",
      {
        d: yo(Y.x2, Y.y2, Y.arrowAngle, y),
        fill: "none",
        stroke: c,
        strokeWidth: a,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    nt && /* @__PURE__ */ h(
      "circle",
      {
        cx: Y.x1,
        cy: Y.y1,
        r: p,
        fill: c,
        stroke: "white",
        strokeWidth: 1.5 / o
      }
    ),
    rt && /* @__PURE__ */ h(
      "circle",
      {
        cx: Y.x2,
        cy: Y.y2,
        r: p,
        fill: c,
        stroke: "white",
        strokeWidth: 1.5 / o
      }
    )
  ] });
}
function H0({
  preview: t,
  zoom: e
}) {
  const o = Math.min(t.startX, t.endX), n = Math.min(t.startY, t.endY), r = Math.abs(t.endX - t.startX), s = Math.abs(t.endY - t.startY);
  return r < 2 && s < 2 ? null : t.kind === "frame" ? /* @__PURE__ */ h(
    "rect",
    {
      x: o,
      y: n,
      width: r,
      height: s,
      fill: "none",
      stroke: "#1e1e2e",
      strokeWidth: 1
    }
  ) : /* @__PURE__ */ h(
    "rect",
    {
      x: o,
      y: n,
      width: r,
      height: s,
      fill: "rgba(59,130,246,0.06)",
      stroke: "#3b82f6",
      strokeWidth: 1.5 / e,
      strokeDasharray: `${4 / e}`,
      rx: 8 / e
    }
  );
}
const gs = 400;
function M0(t, e) {
  return t.h !== "auto" ? t.h : e[t.id] ?? 100;
}
function O0({
  eraser: t,
  engine: e,
  zoom: o
}) {
  var a;
  const [, n] = et(0);
  St(() => {
    const u = t.trail && t.trail.length > 0, f = t.markedIds && t.markedIds.length > 0;
    if (!u && !f) return;
    let y = 0;
    const p = () => {
      n(performance.now()), y = requestAnimationFrame(p);
    };
    return y = requestAnimationFrame(p), () => cancelAnimationFrame(y);
  }, [t.trail, t.markedIds]);
  const r = Date.now(), s = ((a = t.trail) == null ? void 0 : a.filter((u) => r - u[2] < gs)) ?? [], i = e.measuredHeights, l = 6 / o;
  let d = null;
  if (s.length > 1) {
    const u = [`M${s[0][0]},${s[0][1]}`];
    if (s.length === 2)
      u.push(`L${s[1][0]},${s[1][1]}`);
    else {
      for (let w = 0; w < s.length - 1; w++) {
        const M = (s[w][0] + s[w + 1][0]) / 2, v = (s[w][1] + s[w + 1][1]) / 2;
        u.push(`Q${s[w][0]},${s[w][1]},${M},${v}`);
      }
      const b = s[s.length - 1];
      u.push(`L${b[0]},${b[1]}`);
    }
    const f = u.join(" "), y = (r - s[s.length - 1][2]) / gs, p = (r - s[0][2]) / gs, g = Math.max(0, 0.85 * (1 - y)), m = Math.max(0, 0.85 * (1 - p)), x = (g + m) / 2;
    x > 0 && (d = /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        "path",
        {
          d: f,
          fill: "none",
          stroke: "#9ca3af",
          strokeWidth: l * 3,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: x * 0.35
        }
      ),
      /* @__PURE__ */ h(
        "path",
        {
          d: f,
          fill: "none",
          stroke: "#d1d5db",
          strokeWidth: l,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: x
        }
      )
    ] }));
  }
  const c = [];
  for (const u of t.markedIds ?? []) {
    const f = e.getNode(u);
    if (!f || f.type === "edge") continue;
    const y = M0(f, i);
    if (f.w < 1 || y < 1) continue;
    const p = f.rotation ?? 0, g = f.x + f.w / 2, m = f.y + y / 2;
    c.push(
      /* @__PURE__ */ h("g", { transform: p ? `rotate(${p}, ${g}, ${m})` : void 0, children: /* @__PURE__ */ h(
        "rect",
        {
          x: f.x,
          y: f.y,
          width: f.w,
          height: y,
          fill: "rgba(0,0,0,0.2)",
          stroke: "rgba(100,100,100,0.35)",
          strokeWidth: 1 / o,
          rx: 4 / o
        }
      ) }, u)
    );
  }
  return !d && c.length === 0 ? null : /* @__PURE__ */ S("g", { children: [
    d,
    c
  ] });
}
export {
  Cs as A,
  bd as B,
  Do as C,
  xo as D,
  kp as E,
  Uo as F,
  vp as G,
  ud as H,
  _p as I,
  du as J,
  Cu as K,
  no as L,
  xu as M,
  oh as N,
  _t as O,
  pn as P,
  oe as Q,
  F0 as R,
  D0 as S,
  B0 as T,
  Zy as U,
  Rs as a,
  Ls as b,
  Wu as c,
  N0 as d,
  O0 as e,
  H0 as f,
  Yy as g,
  W0 as h,
  _l as i,
  zf as j,
  _d as k,
  Du as l,
  dh as m,
  Rt as n,
  lu as o,
  uu as p,
  ku as q,
  Hn as r,
  zr as s,
  Tr as t,
  Ir as u,
  Oo as v,
  Wn as w,
  Qs as x,
  gu as y,
  Vs as z
};
