var vc = Object.defineProperty;
var Sc = (t, e, o) => e in t ? vc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var kt = (t, e, o) => Sc(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as Mc, defaultBlockSpecs as Cc, BlockNoteEditor as Ic } from "@blocknote/core";
import { jsxs as S, jsx as u, Fragment as St } from "react/jsx-runtime";
import zc, { memo as Le, useRef as pt, useState as et, useEffect as Mt, useCallback as lt, Component as Tc, useMemo as Ut, useLayoutEffect as Io, useContext as Ke, createContext as vr, forwardRef as La, createElement as fs, Suspense as Pc, lazy as Ac } from "react";
import { useCreateBlockNote as Ec } from "@blocknote/react";
import { BlockNoteView as Lc } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as Ze, flushSync as Rc } from "react-dom";
const Dc = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Rt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += Dc[o[t] & 63];
  return e;
};
const Wc = {
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
}, Bc = {
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
}, Nc = {
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
}, Fc = {
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
}, Hc = {
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
}, Oc = {
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
}, Xc = {
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
}, Yc = {
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
}, Gc = {
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
}, jc = {
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
}, Vc = {
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
}, Kc = {
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
}, Ra = [
  Wc,
  Bc,
  Nc,
  Fc,
  Hc,
  Oc,
  Xc,
  Yc,
  Gc,
  jc,
  Vc,
  Kc
];
class qc {
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
const Da = 4, Uc = 8, Wa = 6, Ba = 6, Zc = 10, Qc = 14, Jc = 24;
function xo(t, e, o, n) {
  if (!t.rotation) return [e, o];
  const r = t.x + t.w / 2, s = t.y + n / 2, i = -t.rotation * Math.PI / 180, a = Math.cos(i), h = Math.sin(i), c = e - r, l = o - s;
  return [r + c * a - l * h, s + c * h + l * a];
}
function Rn(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function $c(t, e, o, n) {
  const r = Rn(t, n), [s, i] = xo(t, e, o, r), a = t.x, h = t.y, c = t.w, l = r, p = s < a ? a - s : s > a + c ? s - (a + c) : 0, d = i < h ? h - i : i > h + l ? i - (h + l) : 0;
  return p === 0 && d === 0 ? Math.min(s - a, a + c - s, i - h, h + l - i) : Math.hypot(p, d);
}
function _c(t) {
  return Math.max(0.01, t);
}
function Bn(t, e) {
  return t / _c(e);
}
function td(t, e, o, n = 1, r, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, l) => l.z - c.z);
  let a = null, h = null;
  for (const c of i)
    if (c.type === "draw") {
      if (Hs(c, e, o, n))
        return c;
    } else if (c.type === "shape") {
      if (Sr(c, e, o, n)) return c;
      if (!h && c.data.label) {
        const l = c.h === "auto" ? 100 : c.h, [p, d] = xo(c, e, o, l), f = Ha(c, l);
        f && p >= f.lx && p <= f.rx && d >= f.ly && d <= f.ry && (h = c);
      }
    } else if (s && s.has(c.type)) {
      const l = Rn(c, r);
      Na(c, e, o, n, l) && (a || (a = c));
    } else {
      const l = Rn(c, r), p = Bn(Math.max(Da, Ba), n), [d, f] = xo(c, e, o, l);
      d >= c.x - p && d <= c.x + c.w + p && f >= c.y - p && f <= c.y + l + p && (h || (h = c));
    }
  return h ?? a;
}
function Na(t, e, o, n, r) {
  const s = r ?? (t.h === "auto" ? 100 : t.h), [i, a] = xo(t, e, o, s), h = n < 0.8 ? Qc : Zc, c = Bn(Math.max(Uc, h), n);
  if (t.data.label && i >= t.x && i <= t.x + t.w && a >= t.y - Jc && a <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || a < t.y - c || a > t.y + s + c)
    return !1;
  const p = Math.abs(i - t.x), d = Math.abs(i - (t.x + t.w)), f = Math.abs(a - t.y), g = Math.abs(a - (t.y + s)), m = i >= t.x - c && i <= t.x + t.w + c;
  return a >= t.y - c && a <= t.y + s + c && (p <= c || d <= c) || m && (f <= c || g <= c);
}
function Fa(t, e, o, n, r, s) {
  const i = r - o, a = s - n, h = i * i + a * a;
  if (h === 0) return (t - o) ** 2 + (e - n) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - n) * a) / h)), l = o + c * i, p = n + c * a;
  return (t - l) ** 2 + (e - p) ** 2;
}
function Ha(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const n = o.labelFontSize ?? 14, r = n * 1.3, s = n * 0.55, a = t.w - 12 * 2, h = o.label.split(`
`);
  let c = 0;
  for (const g of h) {
    const m = g.length * s;
    c += Math.max(1, Math.ceil(m / Math.max(a, 1)));
  }
  const l = c * r, p = Math.min(a, Math.max(...h.map((g) => g.length)) * s), d = t.x + t.w / 2, f = t.y + e / 2;
  return {
    lx: d - p / 2 - 4,
    ly: f - l / 2 - 4,
    rx: d + p / 2 + 4,
    ry: f + l / 2 + 4
  };
}
function Sr(t, e, o, n, r) {
  const s = t.h === "auto" ? 100 : t.h, [i, a] = xo(t, e, o, s), h = t.data, c = h.strokeWidth ?? 2, l = Bn(Math.max(c / 2, Wa), n), p = !!h.fill || !!r;
  switch (h.shape) {
    case "rect": {
      if (p)
        return i >= t.x - l && i <= t.x + t.w + l && a >= t.y - l && a <= t.y + s + l;
      const d = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), g = Math.abs(a - t.y), m = Math.abs(a - (t.y + s)), y = i >= t.x - l && i <= t.x + t.w + l;
      return a >= t.y - l && a <= t.y + s + l && (d <= l || f <= l) || y && (g <= l || m <= l);
    }
    case "ellipse": {
      const d = t.x + t.w / 2, f = t.y + s / 2, g = t.w / 2, m = s / 2;
      if (g === 0 || m === 0) return !1;
      const y = (i - d) / g, x = (a - f) / m, b = y * y + x * x;
      if (p) {
        const v = ((g + l) / g) ** 2;
        return b <= v;
      }
      const w = l / Math.min(g, m);
      return Math.abs(Math.sqrt(b) - 1) <= w;
    }
    case "diamond": {
      const d = t.x + t.w / 2, f = t.y + s / 2, g = t.w / 2, m = s / 2;
      if (g === 0 || m === 0) return !1;
      const y = Math.abs(i - d) / g, x = Math.abs(a - f) / m, b = y + x;
      if (p) {
        const v = l / Math.min(g, m);
        return b <= 1 + v;
      }
      const w = l / Math.min(g, m);
      return Math.abs(b - 1) <= w;
    }
    case "line":
    case "arrow": {
      const d = h.startPoint ?? [0, 0], f = h.endPoint ?? [t.w, s], g = t.x + d[0], m = t.y + d[1], y = t.x + f[0], x = t.y + f[1];
      return Fa(i, a, g, m, y, x) <= l * l;
    }
    default:
      return i >= t.x - l && i <= t.x + t.w + l && a >= t.y - l && a <= t.y + s + l;
  }
}
function ed(t, e, o) {
  let n = !1;
  for (let r = 0, s = o.length - 1; r < o.length; s = r++) {
    const i = o[r][0], a = o[r][1], h = o[s][0], c = o[s][1];
    a > e != c > e && t < (h - i) * (e - a) / (c - a) + i && (n = !n);
  }
  return n;
}
function Hs(t, e, o, n) {
  const r = t.data.strokeWidth, s = Bn(Math.max(r / 2, Wa), n), i = s * s, a = t.h === "auto" ? 100 : t.h, [h, c] = xo(t, e, o, a);
  if (h < t.x - s || h > t.x + t.w + s || c < t.y - s || c > t.y + a + s)
    return !1;
  const l = t.data.points;
  if (!l || l.length === 0) return !1;
  const p = h - t.x, d = c - t.y;
  if (l.length === 1) {
    const f = p - l[0][0], g = d - l[0][1];
    return f * f + g * g <= i;
  }
  if (t.data.fill && l.length >= 3 && ed(p, d, l))
    return !0;
  for (let f = 0; f < l.length - 1; f++)
    if (Fa(p, d, l[f][0], l[f][1], l[f + 1][0], l[f + 1][1]) <= i)
      return !0;
  return !1;
}
function od(t, e, o, n = 1, r, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, l) => l.z - c.z), a = [], h = [];
  for (const c of i)
    if (c.type === "draw")
      Hs(c, e, o, n) && a.push(c);
    else if (c.type === "shape") {
      if (Sr(c, e, o, n))
        a.push(c);
      else if (c.data.label) {
        const l = c.h === "auto" ? 100 : c.h, [p, d] = xo(c, e, o, l), f = Ha(c, l);
        f && p >= f.lx && p <= f.rx && d >= f.ly && d <= f.ry && h.push(c);
      }
    } else if (s && s.has(c.type)) {
      const l = Rn(c, r);
      Na(c, e, o, n, l) && h.push(c);
    } else {
      const l = Rn(c, r), p = Bn(Math.max(Da, Ba), n), [d, f] = xo(c, e, o, l);
      d >= c.x - p && d <= c.x + c.w + p && f >= c.y - p && f <= c.y + l + p && h.push(c);
    }
  return [...a, ...h];
}
function Jn(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, n = t.y + e / 2, r = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, a = Math.abs(Math.cos(i)), h = Math.abs(Math.sin(i)), c = r * a + s * h, l = r * h + s * a;
  return {
    x: o - c,
    y: n - l,
    w: c * 2,
    h: l * 2
  };
}
const Ve = class Ve {
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
    this.nodes[0] = new Ve({ x: n + e, y: r, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new Ve({ x: n, y: r, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new Ve({ x: n, y: r + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new Ve({ x: n + e, y: r + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const r = Jn(e, n);
    if (this.nodes.length) {
      const s = this.getIndex(r);
      if (s !== -1) {
        this.nodes[s].insert(e, n);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > Ve.MAX_OBJECTS && this.level < Ve.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], a = this.resolveH(i), h = Jn(i, a), c = this.getIndex(h);
        c !== -1 ? (this.nodes[c].insert(i, a), this.objects.splice(s, 1)) : s++;
      }
    }
  }
  // Remove an object. Requires the node (with its coordinates) to find it efficiently.
  remove(e) {
    const o = this.objects.findIndex((n) => n.id === e.id);
    if (o !== -1)
      return this.objects.splice(o, 1), !0;
    if (this.nodes.length) {
      const n = this.resolveH(e), r = this.getIndex(Jn(e, n));
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
      const s = this.resolveH(r), i = Jn(r, s);
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
kt(Ve, "MAX_OBJECTS", 10), // Max depth of the tree
kt(Ve, "MAX_LEVELS", 8);
let ys = Ve;
function hn(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function pn(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function nd(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function rd(t, e, o, n) {
  const r = e > 0 ? 0.95 : 1.05, s = hn(t.zoom * r, 0.1, 5), i = pn(t, o, n);
  return {
    x: o - i.x * s,
    y: n - i.y * s,
    zoom: s
  };
}
function sd(t, e, o, n) {
  const r = hn(t.zoom * e, 0.1, 5), s = pn(t, o, n);
  return {
    x: o - s.x * r,
    y: n - s.y * r,
    zoom: r
  };
}
const Os = Mc.create({
  blockSpecs: {
    ...Cc
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let Gr = null;
function Xs() {
  return Gr || (Gr = Ic.create({ schema: Os })), Gr;
}
async function id(t) {
  return await Xs().blocksToMarkdownLossy(t);
}
async function Ys(t) {
  return await Xs().tryParseMarkdownToBlocks(t);
}
function Oa(t) {
  return Xs().tryParseHTMLToBlocks(t);
}
function ad(t, e, o) {
  const [n, r] = t, [s, i] = e, [a, h] = o, c = a - s, l = h - i, p = c * c + l * l;
  if (p === 0)
    return (n - s) ** 2 + (r - i) ** 2;
  let d = ((n - s) * c + (r - i) * l) / p;
  d = Math.max(0, Math.min(1, d));
  const f = s + d * c, g = i + d * l;
  return (n - f) ** 2 + (r - g) ** 2;
}
function gs(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, n = 0;
  const r = t[0], s = t[t.length - 1];
  for (let h = 1; h < t.length - 1; h++) {
    const c = ad(t[h], r, s);
    c > o && (o = c, n = h);
  }
  if (o <= e)
    return [r, s];
  const i = gs(t.slice(0, n + 1), e), a = gs(t.slice(n), e);
  return [...i.slice(0, -1), ...a];
}
async function ld(t, e) {
  const o = [], n = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (e != null && e.background && e.background !== "dot-grid" && n.push(`background="${e.background}"`), e != null && e.originView) {
    const d = e.originView;
    n.push(`originView="${d.x},${d.y},${d.zoom}"`);
  }
  o.push(`<!--@meta ${n.join(" ")} -->`), o.push("");
  const r = t.filter((d) => d.type === "frame").sort((d, f) => d.z - f.z || d.y - f.y || d.x - f.x);
  for (const d of r) {
    const f = d.h === "auto" ? "auto" : Math.round(d.h), g = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${f}"`,
      `z="${d.z}"`
    ];
    d.data.label && g.push(`label="${d.data.label.replace(/"/g, "&quot;")}"`), d.data.backgroundColor && g.push(`backgroundColor="${d.data.backgroundColor}"`), d.data.borderColor && g.push(`borderColor="${d.data.borderColor}"`), d.data.borderWidth != null && g.push(`borderWidth="${d.data.borderWidth}"`), d.data.borderStyle && d.data.borderStyle !== "solid" && g.push(`borderStyle="${d.data.borderStyle}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && g.push(`opacity="${d.data.opacity}"`), d.data.slideOrder != null && g.push(`slideOrder="${d.data.slideOrder}"`), d.data.transition && d.data.transition !== "pan" && g.push(`transition="${d.data.transition}"`), d.data.transitionDuration != null && g.push(`transitionDuration="${d.data.transitionDuration}"`), d.rotation && g.push(`rotation="${d.rotation}"`), d.locked && g.push('locked="true"'), d.groupId && g.push(`group="${d.groupId}"`), o.push(`<!--@frame ${g.join(" ")} -->`), o.push("");
  }
  const s = t.filter((d) => d.type === "content").sort((d, f) => d.z - f.z || d.y - f.y || d.x - f.x);
  for (const d of s) {
    const f = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${d.h}"`,
      `z="${d.z}"`
    ];
    d.rotation && f.push(`rotation="${d.rotation}"`), d.locked && f.push('locked="true"'), d.groupId && f.push(`group="${d.groupId}"`), d.data.borderColor && f.push(`borderColor="${d.data.borderColor}"`), d.data.borderWidth != null && f.push(`borderWidth="${d.data.borderWidth}"`), d.data.borderStyle && d.data.borderStyle !== "solid" && f.push(`borderStyle="${d.data.borderStyle}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && f.push(`opacity="${d.data.opacity}"`), o.push(`<!--@block ${f.join(" ")} -->`);
    const g = d.data.blocks.length > 0 ? await id(d.data.blocks) : "";
    o.push(g), o.push("");
  }
  const i = t.filter((d) => d.type === "draw");
  for (const d of i) {
    const f = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `z="${d.z}"`,
      `tool="${d.data.tool}"`,
      `color="${d.data.color}"`,
      `width="${d.data.strokeWidth}"`
    ];
    d.data.opacity !== void 0 && d.data.opacity !== 1 && f.push(`opacity="${d.data.opacity}"`), d.data.fill && f.push(`fill="${d.data.fill}"`), d.data.fillStyle && d.data.fillStyle !== "hachure" && f.push(`fillStyle="${d.data.fillStyle}"`), d.rotation && f.push(`rotation="${d.rotation}"`), d.locked && f.push('locked="true"'), d.groupId && f.push(`group="${d.groupId}"`), o.push(`<!--@draw ${f.join(" ")} -->`);
    const m = gs([...d.data.points], 1).map(
      ([y, x, b]) => `${(y + d.x).toFixed(1)},${(x + d.y).toFixed(1)},${b.toFixed(2)}`
    ).join(" ");
    o.push(m), o.push("");
  }
  const a = t.filter((d) => d.type === "shape");
  for (const d of a) {
    const f = d.h === "auto" ? "auto" : Math.round(d.h), g = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${f}"`,
      `z="${d.z}"`,
      'tool="shape"',
      `shape="${d.data.shape}"`,
      `color="${d.data.stroke}"`,
      `stroke="${d.data.strokeWidth}"`,
      `roughness="${d.data.roughness}"`
    ];
    d.data.fill && g.push(`fill="${d.data.fill}"`), d.data.fillStyle && d.data.fillStyle !== "hachure" && g.push(`fillStyle="${d.data.fillStyle}"`), d.data.strokeStyle && d.data.strokeStyle !== "solid" && g.push(`strokeStyle="${d.data.strokeStyle}"`), d.data.edgeStyle && d.data.edgeStyle !== "sharp" && g.push(`edgeStyle="${d.data.edgeStyle}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && g.push(`opacity="${d.data.opacity}"`), d.data.startPoint && g.push(`startPt="${d.data.startPoint[0].toFixed(1)},${d.data.startPoint[1].toFixed(1)}"`), d.data.endPoint && g.push(`endPt="${d.data.endPoint[0].toFixed(1)},${d.data.endPoint[1].toFixed(1)}"`), d.data.label && g.push(`label="${d.data.label.replace(/"/g, "&quot;")}"`), d.data.labelFontSize && g.push(`labelFontSize="${d.data.labelFontSize}"`), d.data.labelFontFamily && d.data.labelFontFamily !== "Excalifont" && g.push(`labelFontFamily="${d.data.labelFontFamily}"`), d.data.labelAlign && d.data.labelAlign !== "center" && g.push(`labelAlign="${d.data.labelAlign}"`), d.rotation && g.push(`rotation="${d.rotation}"`), d.locked && g.push('locked="true"'), d.groupId && g.push(`group="${d.groupId}"`), o.push(`<!--@draw ${g.join(" ")} -->`), o.push("");
  }
  const h = t.filter((d) => d.type === "text");
  for (const d of h) {
    const f = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `z="${d.z}"`,
      `fontSize="${d.data.fontSize}"`,
      `fontFamily="${d.data.fontFamily}"`,
      `color="${d.data.color}"`,
      `align="${d.data.align}"`
    ];
    d.data.opacity !== void 0 && d.data.opacity !== 1 && f.push(`opacity="${d.data.opacity}"`), d.rotation && f.push(`rotation="${d.rotation}"`), d.locked && f.push('locked="true"'), d.groupId && f.push(`group="${d.groupId}"`), o.push(`<!--@text ${f.join(" ")} -->`), o.push(d.data.text), o.push("");
  }
  const c = t.filter((d) => d.type === "image");
  for (const d of c) {
    const f = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${Math.round(d.h)}"`,
      `z="${d.z}"`,
      `src="${d.data.src.replace(/"/g, "&quot;")}"`
    ];
    d.rotation && f.push(`rotation="${d.rotation}"`), d.locked && f.push('locked="true"'), d.groupId && f.push(`group="${d.groupId}"`), d.data.alt && f.push(`alt="${d.data.alt.replace(/"/g, "&quot;")}"`), d.data.opacity != null && d.data.opacity !== 1 && f.push(`opacity="${d.data.opacity}"`), d.data.borderColor && f.push(`borderColor="${d.data.borderColor}"`), d.data.borderWidth != null && f.push(`borderWidth="${d.data.borderWidth}"`), d.data.borderStyle && d.data.borderStyle !== "solid" && f.push(`borderStyle="${d.data.borderStyle}"`), o.push(`<!--@image ${f.join(" ")} -->`), o.push("");
  }
  const l = t.filter((d) => d.type === "edge");
  for (const d of l) {
    const f = [
      `id="${d.id}"`,
      `from="${d.data.fromId}"`,
      `to="${d.data.toId}"`,
      `style="${d.data.style}"`,
      `color="${d.data.color}"`
    ];
    d.data.label && f.push(`label="${d.data.label}"`), d.data.strokeWidth && d.data.strokeWidth !== 1 && f.push(`strokeWidth="${d.data.strokeWidth}"`), d.data.arrowHead && d.data.arrowHead !== "none" && f.push(`arrowHead="${d.data.arrowHead}"`), d.data.arrowTail && d.data.arrowTail !== "none" && f.push(`arrowTail="${d.data.arrowTail}"`), d.data.arrowHeadSize && f.push(`arrowHeadSize="${d.data.arrowHeadSize}"`), d.data.arrowTailSize && f.push(`arrowTailSize="${d.data.arrowTailSize}"`), d.data.edgeType && d.data.edgeType !== "bezier" && f.push(`edgeType="${d.data.edgeType}"`), d.data.animated && f.push('animated="true"'), d.data.animatedDirection && d.data.animatedDirection !== "forward" && f.push(`animatedDirection="${d.data.animatedDirection}"`), d.data.sourceHandle && f.push(`sourceHandle="${d.data.sourceHandle}"`), d.data.targetHandle && f.push(`targetHandle="${d.data.targetHandle}"`), d.data.sourcePort && f.push(`sourcePort="${d.data.sourcePort.replace(/"/g, "&quot;")}"`), d.data.targetPort && f.push(`targetPort="${d.data.targetPort.replace(/"/g, "&quot;")}"`), d.data.sourceT != null && f.push(`sourceT="${d.data.sourceT}"`), d.data.targetT != null && f.push(`targetT="${d.data.targetT}"`), d.data.attachmentGap != null && d.data.attachmentGap !== 0 && f.push(`attachmentGap="${d.data.attachmentGap}"`), d.data.roughness != null && d.data.roughness !== 0 && f.push(`roughness="${d.data.roughness}"`), d.data.midpointOffset != null && d.data.midpointOffset !== 0.5 && f.push(`midpointOffset="${d.data.midpointOffset}"`), d.data.curveOffset && (d.data.curveOffset[0] !== 0 || d.data.curveOffset[1] !== 0) && f.push(`curveOffset="${d.data.curveOffset[0]},${d.data.curveOffset[1]}"`), d.locked && f.push('locked="true"'), d.groupId && f.push(`group="${d.groupId}"`), o.push(`<!--@edge ${f.join(" ")} -->`), o.push("");
  }
  const p = t.filter((d) => d.type === "sticky");
  for (const d of p) {
    const f = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${d.h}"`,
      `z="${d.z}"`,
      `color="${d.data.color}"`
    ];
    d.data.fontSize && d.data.fontSize !== 16 && f.push(`fontSize="${d.data.fontSize}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && f.push(`opacity="${d.data.opacity}"`), d.rotation && f.push(`rotation="${d.rotation}"`), d.locked && f.push('locked="true"'), d.groupId && f.push(`group="${d.groupId}"`), o.push(`<!--@sticky ${f.join(" ")} -->`), o.push(d.data.text), o.push("");
  }
  return o.join(`
`);
}
const Xa = "data:font/woff2;base64,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", wo = "Excalifont", dr = [
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
], Ya = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), cd = /* @__PURE__ */ new Set(["Excalifont"]), dd = /* @__PURE__ */ new Set([...Ya, ...cd]);
function hd(t) {
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
function ko(t) {
  return Ya.has(t) ? t : `'${t}', sans-serif`;
}
let Mi = !1;
function ud(t = document) {
  if (Mi) return;
  Mi = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${Xa}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = dr.filter((r) => !dd.has(r.key)).map((r) => "family=" + r.key.replace(/ /g, "+")).join("&"), n = t.createElement("link");
  n.rel = "stylesheet", n.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(n);
}
function ao(t) {
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
const pd = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function fd(t) {
  var s, i, a, h;
  const e = [], o = {}, n = t.split(`
`);
  let r = 0;
  for (; r < n.length; ) {
    const c = n[r].trim();
    if (c.startsWith("<!--@meta")) {
      const l = ao(c);
      if (l.background) {
        const p = pd[l.background] ?? l.background;
        o.background = p;
      }
      if (l.originView) {
        const p = l.originView.split(",").map(Number);
        p.length === 3 && p.every((d) => !isNaN(d)) && (o.originView = { x: p[0], y: p[1], zoom: p[2] });
      }
      r++;
      continue;
    }
    if (c.startsWith("<!--@frame")) {
      const l = ao(c);
      for (r++; r < n.length && n[r].trim() === ""; ) r++;
      e.push({
        id: l.id || Rt(10),
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
    if (c.startsWith("<!--@block")) {
      const l = ao(c);
      r++;
      const p = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        p.push(n[r]), r++;
      for (; p.length > 0 && p[p.length - 1].trim() === ""; )
        p.pop();
      const d = p.join(`
`), f = d.trim().length > 0 ? await Ys(d) : [];
      e.push({
        id: l.id || Rt(10),
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
          blocks: f,
          markdown: d,
          borderColor: l.borderColor || void 0,
          borderWidth: l.borderWidth ? parseFloat(l.borderWidth) : void 0,
          borderStyle: l.borderStyle || void 0,
          opacity: l.opacity ? parseFloat(l.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@draw")) {
      const l = ao(c);
      if (r++, l.tool === "shape")
        for (e.push({
          id: l.id || Rt(10),
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
        }); r < n.length && n[r].trim() === ""; ) r++;
      else {
        let p = "";
        r < n.length && !n[r].trim().startsWith("<!--@") && (p = n[r].trim(), r++);
        const d = p ? p.split(" ").filter(Boolean).map((b) => {
          const w = b.split(",").map(Number);
          return [
            w[0] || 0,
            w[1] || 0,
            w[2] || 0.5
          ];
        }) : [];
        let f = 1 / 0, g = 1 / 0, m = -1 / 0, y = -1 / 0;
        for (const [b, w] of d)
          b < f && (f = b), w < g && (g = w), b > m && (m = b), w > y && (y = w);
        isFinite(f) || (f = parseFloat(l.x || "0"), g = parseFloat(l.y || "0"), m = f, y = g);
        const x = d.map(
          ([b, w, v]) => [b - f, w - g, v]
        );
        for (e.push({
          id: l.id || Rt(10),
          type: "draw",
          x: f,
          y: g,
          w: m - f,
          h: y - g,
          z: parseInt(l.z || "0"),
          rotation: l.rotation ? parseFloat(l.rotation) : void 0,
          locked: l.locked === "true" || void 0,
          groupId: l.group || void 0,
          data: {
            tool: l.tool || "pen",
            points: x,
            color: l.color || "#1e1e2e",
            strokeWidth: parseFloat(l.width || "2"),
            opacity: l.opacity ? parseFloat(l.opacity) : void 0,
            fill: l.fill || void 0,
            fillStyle: l.fillStyle || void 0
          }
        }); r < n.length && n[r].trim() === ""; ) r++;
      }
      continue;
    }
    if (c.startsWith("<!--@image")) {
      const l = ao(c);
      r++, e.push({
        id: l.id || Rt(10),
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
    if (c.startsWith("<!--@edge")) {
      const l = ao(c);
      for (r++, e.push({
        id: l.id || Rt(10),
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
          sourcePort: ((a = l.sourcePort) == null ? void 0 : a.replace(/&quot;/g, '"')) || void 0,
          targetPort: ((h = l.targetPort) == null ? void 0 : h.replace(/&quot;/g, '"')) || void 0,
          sourceT: Cn(l.sourceT),
          targetT: Cn(l.targetT),
          attachmentGap: Cn(l.attachmentGap),
          roughness: Cn(l.roughness),
          midpointOffset: Cn(l.midpointOffset),
          curveOffset: l.curveOffset ? l.curveOffset.split(",").map(Number) : void 0
        }
      }); r < n.length && n[r].trim() === ""; ) r++;
      continue;
    }
    if (c.startsWith("<!--@text")) {
      const l = ao(c);
      r++;
      const p = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        p.push(n[r]), r++;
      for (; p.length > 0 && p[p.length - 1].trim() === ""; )
        p.pop();
      e.push({
        id: l.id || Rt(10),
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
          text: p.join(`
`),
          fontSize: parseFloat(l.fontSize || "20"),
          fontFamily: l.fontFamily || wo,
          color: l.color || "#1e1e2e",
          align: l.align || "left",
          opacity: l.opacity ? parseFloat(l.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@sticky")) {
      const l = ao(c);
      r++;
      const p = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        p.push(n[r]), r++;
      for (; p.length > 0 && p[p.length - 1].trim() === ""; )
        p.pop();
      e.push({
        id: l.id || Rt(10),
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
          text: p.join(`
`),
          color: l.color || "#FEF3C7",
          fontSize: l.fontSize ? parseFloat(l.fontSize) : void 0,
          opacity: l.opacity ? parseFloat(l.opacity) : void 0
        }
      });
      continue;
    }
    r++;
  }
  return { nodes: e, meta: o };
}
const yd = 180;
function $n(t, e) {
  t.push(e), t.length > yd && t.shift();
}
function lo(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((r, s) => r - s), n = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[n];
}
class gd {
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
      $n(this.frameMs, n);
    }
    this.lastTick = e, $n(this.cullingMs, this.pendingCullingMs), $n(this.hitTestMs, this.pendingHitTestMs), $n(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
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
      frameMsP50: lo(this.frameMs, 0.5),
      frameMsP95: lo(this.frameMs, 0.95),
      cullingMsP50: lo(this.cullingMs, 0.5),
      cullingMsP95: lo(this.cullingMs, 0.95),
      hitTestMsP50: lo(this.hitTestMs, 0.5),
      hitTestMsP95: lo(this.hitTestMs, 0.95),
      edgeHitMsP50: lo(this.edgeHitMs, 0.5),
      edgeHitMsP95: lo(this.edgeHitMs, 0.95),
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
const ke = new gd();
function qe(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const Ga = 7, Gs = 52, md = 8;
function bd(t, e, o, n) {
  const r = qe(t, n);
  if (!t.rotation) return { x: e, y: o };
  const s = t.x + t.w / 2, i = t.y + r / 2, a = t.rotation * Math.PI / 180, h = Math.cos(a), c = Math.sin(a), l = e - s, p = o - i;
  return { x: s + l * h - p * c, y: i + l * c + p * h };
}
function ja(t, e, o, n, r, s = "bbox") {
  const i = e.find((f) => f.id === o);
  if (!i) return null;
  const a = qe(t, r), h = Ga / n, c = e.filter((f) => f.direction === i.direction), l = c.indexOf(i);
  if (l < 0) return null;
  const p = t.y + a / (c.length + 1) * (l + 1);
  let d;
  if (s === "inscribed-circle") {
    const f = Math.min(t.w, a) / 2, g = t.x + t.w / 2;
    d = i.direction === "input" ? g - f - h : g + f + h;
  } else
    d = i.direction === "input" ? t.x - h : t.x + t.w + h;
  return { px: d, py: p, direction: i.direction };
}
function xd(t, e, o, n, r = "bbox") {
  const s = qe(t, n);
  if (r === "bbox")
    return e === "input" ? { x: t.x, y: o.y } : { x: t.x + t.w, y: o.y };
  const i = Math.min(t.w, s) / 2, a = t.x + t.w / 2, h = t.y + s / 2;
  let c = o.x - a, l = o.y - h, p = Math.hypot(c, l);
  return p < 1e-6 && (c = e === "input" ? -1 : 1, l = 0, p = 1), { x: a + c / p * i, y: h + l / p * i };
}
function Te(t, e, o, n, r, s = "bbox") {
  const i = ja(
    t,
    e,
    o,
    n,
    r,
    s
  );
  return i ? bd(t, i.px, i.py, r) : null;
}
function Ci(t, e, o, n, r, s, i, a) {
  const h = i - r, c = a - s;
  if (h === 0 && c === 0) return { x: r, y: s, side: "right" };
  let l = 1 / 0, p = r, d = s, f = "right";
  if (h !== 0) {
    const g = (t + o - r) / h;
    if (g > 0 && g < l) {
      const m = s + g * c;
      m >= e && m <= e + n && (l = g, p = t + o, d = m, f = "right");
    }
  }
  if (h !== 0) {
    const g = (t - r) / h;
    if (g > 0 && g < l) {
      const m = s + g * c;
      m >= e && m <= e + n && (l = g, p = t, d = m, f = "left");
    }
  }
  if (c !== 0) {
    const g = (e + n - s) / c;
    if (g > 0 && g < l) {
      const m = r + g * h;
      m >= t && m <= t + o && (l = g, p = m, d = e + n, f = "bottom");
    }
  }
  if (c !== 0) {
    const g = (e - s) / c;
    if (g > 0 && g < l) {
      const m = r + g * h;
      m >= t && m <= t + o && (l = g, p = m, d = e, f = "top");
    }
  }
  return { x: p, y: d, side: f };
}
function Ne(t, e, o, n, r) {
  const s = Math.cos(r), i = Math.sin(r), a = t - o, h = e - n;
  return [o + a * s - h * i, n + a * i + h * s];
}
function ms(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return Ci(t.x, t.y, t.w, e, r, s, o, n);
  const i = -t.rotation * Math.PI / 180, [a, h] = Ne(o, n, r, s, i), c = Ci(t.x, t.y, t.w, e, r, s, a, h), [l, p] = Ne(c.x, c.y, r, s, -i);
  return { x: l, y: p, side: c.side };
}
function Oo(t, e, o, n) {
  return Math.abs(t) / o >= Math.abs(e) / n ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function wd(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, h = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, l] = t.rotation ? Ne(o, n, r, s, h) : [o, n], p = c - r, d = l - s;
  if (p === 0 && d === 0)
    return { x: r + i, y: s, side: "right" };
  const f = 1 / Math.sqrt((p / i) ** 2 + (d / a) ** 2);
  let g = r + p * f, m = s + d * f;
  const y = Oo(p, d, i, a);
  return t.rotation && ([g, m] = Ne(g, m, r, s, -h)), { x: g, y: m, side: y };
}
function kd(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, h = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, l] = t.rotation ? Ne(o, n, r, s, h) : [o, n], p = c - r, d = l - s;
  if (p === 0 && d === 0)
    return { x: r + i, y: s, side: "right" };
  const f = 1 / (Math.abs(p) / i + Math.abs(d) / a);
  let g = r + p * f, m = s + d * f;
  const y = Oo(p, d, i, a);
  return t.rotation && ([g, m] = Ne(g, m, r, s, -h)), { x: g, y: m, side: y };
}
function vd(t, e, o, n) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return ms(t, e, o, n);
  const s = t.x + t.w / 2, i = t.y + e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [h, c] = t.rotation ? Ne(o, n, s, i, a) : [o, n], l = h - s, p = c - i, d = Math.hypot(l, p);
  if (d === 0)
    return ms(t, e, o, n);
  const f = l / d, g = p / d;
  let m = t.x + r[0][0], y = t.y + r[0][1], x = (m - s) * f + (y - i) * g;
  for (let C = 1; C < r.length; C++) {
    const z = t.x + r[C][0], A = t.y + r[C][1], P = (z - s) * f + (A - i) * g;
    P > x && (x = P, m = z, y = A);
  }
  const b = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let w = m + f * b, v = y + g * b;
  const M = Oo(l, p, t.w / 2, e / 2);
  return t.rotation && ([w, v] = Ne(w, v, s, i, -a)), { x: w, y: v, side: M };
}
function Ii(t, e, o) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return pr(t, e, o);
  const r = t.x + t.w / 2, s = t.y + e / 2, i = Xo(o), a = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, h = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (y, x, b, w, v, M) => {
    const C = v - b, z = M - w, A = C * C + z * z;
    if (A === 0) return [b, w];
    const P = Math.max(0, Math.min(1, ((y - b) * C + (x - w) * z) / A));
    return [b + P * C, w + P * z];
  };
  let l = t.x + n[0][0], p = t.y + n[0][1], d = (l - a) ** 2 + (p - h) ** 2;
  if (n.length === 1)
    l = t.x + n[0][0], p = t.y + n[0][1];
  else
    for (let y = 0; y < n.length - 1; y++) {
      const x = t.x + n[y][0], b = t.y + n[y][1], w = t.x + n[y + 1][0], v = t.y + n[y + 1][1], [M, C] = c(a, h, x, b, w, v), z = (M - a) ** 2 + (C - h) ** 2;
      z < d && (d = z, l = M, p = C);
    }
  const f = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let g = l + i.dx * f, m = p + i.dy * f;
  if (t.rotation) {
    const y = t.rotation * Math.PI / 180;
    [g, m] = Ne(g, m, r, s, y);
  }
  return { x: g, y: m };
}
function bs(t, e, o, n) {
  var r;
  if (t.type === "draw")
    return vd(t, e, o, n);
  if (t.type === "shape") {
    const s = (r = t.data) == null ? void 0 : r.shape;
    if (s === "ellipse") return wd(t, e, o, n);
    if (s === "diamond") return kd(t, e, o, n);
  }
  return ms(t, e, o, n);
}
function xs(t, e, o, n) {
  const r = bs(t, e, o, n);
  return { x: r.x, y: r.y };
}
function pr(t, e, o) {
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
  const a = t.rotation * Math.PI / 180, [h, c] = Ne(s, i, n, r, a);
  return { x: h, y: c };
}
function Xo(t) {
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
function zi(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Pe(t, e, o = "bezier", n, r, s, i, a, h, c, l, p, d) {
  const f = qe(t, n), g = qe(e, n), m = t.x + t.w / 2, y = t.y + f / 2, x = e.x + e.w / 2, b = e.y + g / 2;
  let w, v, M, C;
  if (h) {
    w = h.x, v = h.y;
    const G = w - m, rt = v - y, st = Math.hypot(G, rt);
    st > 1e-6 && (C = { dx: G / st, dy: rt / st }), M = Oo(G, rt, t.w / 2, f / 2);
  } else if (l !== void 0) {
    const G = ks(t, f, l);
    w = G.x, v = G.y, M = G.side;
    const rt = Math.hypot(w - m, v - y);
    rt > 0 && (C = { dx: (w - m) / rt, dy: (v - y) / rt });
  } else if (r) {
    const G = t.type === "draw" ? Ii(t, f, r) : pr(t, f, r);
    w = G.x, v = G.y, M = r;
  } else {
    const G = bs(t, f, x, b);
    if (w = G.x, v = G.y, M = G.side, zi(t)) {
      const rt = Math.hypot(x - m, b - y);
      rt > 0 && (C = { dx: (x - m) / rt, dy: (b - y) / rt });
    }
  }
  let z, A, P, Y;
  if (c) {
    z = c.x, A = c.y;
    const G = z - x, rt = A - b, st = Math.hypot(G, rt);
    st > 1e-6 && (Y = { dx: G / st, dy: rt / st }), P = Oo(G, rt, e.w / 2, g / 2);
  } else if (p !== void 0) {
    const G = ks(e, g, p);
    z = G.x, A = G.y, P = G.side;
    const rt = Math.hypot(z - x, A - b);
    rt > 0 && (Y = { dx: (z - x) / rt, dy: (A - b) / rt });
  } else if (s) {
    const G = e.type === "draw" ? Ii(e, g, s) : pr(e, g, s);
    z = G.x, A = G.y, P = s;
  } else {
    const G = bs(e, g, m, y);
    if (z = G.x, A = G.y, P = G.side, zi(e)) {
      const rt = Math.hypot(m - x, y - b);
      rt > 0 && (Y = { dx: (m - x) / rt, dy: (y - b) / rt });
    }
  }
  if (d && d > 0) {
    const G = Math.hypot(w - m, v - y);
    G > 0 && (w += (w - m) / G * d, v += (v - y) / G * d);
    const rt = Math.hypot(z - x, A - b);
    rt > 0 && (z += (z - x) / rt * d, A += (A - b) / rt * d);
  }
  switch (o) {
    case "straight":
      return Sd(w, v, z, A, M, P);
    case "bezier":
      return Md(w, v, z, A, M, P, a, C, Y);
    case "smoothstep":
      return Cd(w, v, z, A, M, P, i);
    case "step":
      return Id(w, v, z, A, M, P, i);
  }
}
function Sd(t, e, o, n, r, s) {
  const i = Math.min(t, o), a = Math.min(e, n), h = Math.abs(o - t), c = Math.abs(n - e);
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
    bounds: { x: i, y: a, w: h, h: c }
  };
}
function Md(t, e, o, n, r, s, i, a, h) {
  const c = Math.hypot(o - t, n - e), l = Math.min(c * 0.5, Math.max(50, c * 0.25)), p = a ?? Xo(r), d = h ?? Xo(s), f = i ? i[0] * (4 / 3) : 0, g = i ? i[1] * (4 / 3) : 0, m = t + p.dx * l + f, y = e + p.dy * l + g, x = o + d.dx * l + f, b = n + d.dy * l + g, w = 0.125 * t + 0.375 * m + 0.375 * x + 0.125 * o, v = 0.125 * e + 0.375 * y + 0.375 * b + 0.125 * n, M = Math.atan2(n - b, o - x), C = Math.atan2(e - y, t - m), z = {
    x: w,
    y: v,
    axis: "xy",
    min: 0,
    max: 0
  }, A = Math.min(t, o, m, x), P = Math.min(e, n, y, b), Y = Math.max(t, o, m, x), G = Math.max(e, n, y, b);
  return {
    path: `M${t},${e} C${m},${y} ${x},${b} ${o},${n}`,
    labelX: w,
    labelY: v,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: M,
    tailAngle: C,
    sourceSide: r,
    targetSide: s,
    kinkHandle: z,
    bounds: { x: A, y: P, w: Y - A, h: G - P }
  };
}
function Cd(t, e, o, n, r, s, i) {
  const { points: c, kinkHandle: l } = js(t, e, o, n, r, s, 20, i), p = zd(c, 8), d = Math.floor(c.length / 2), f = (c[d - 1][0] + c[d][0]) / 2, g = (c[d - 1][1] + c[d][1]) / 2, m = c[c.length - 1], y = c[c.length - 2], x = Math.atan2(m[1] - y[1], m[0] - y[0]), b = c[0], w = c[1], v = Math.atan2(b[1] - w[1], b[0] - w[0]);
  let M = 1 / 0, C = 1 / 0, z = -1 / 0, A = -1 / 0;
  for (const [P, Y] of c)
    P < M && (M = P), Y < C && (C = Y), P > z && (z = P), Y > A && (A = Y);
  return {
    path: p,
    labelX: f,
    labelY: g,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: x,
    tailAngle: v,
    sourceSide: r,
    targetSide: s,
    kinkHandle: l,
    bounds: { x: M, y: C, w: z - M, h: A - C }
  };
}
function Id(t, e, o, n, r, s, i) {
  const { points: h, kinkHandle: c } = js(t, e, o, n, r, s, 20, i), l = [`M${h[0][0]},${h[0][1]}`];
  for (let A = 1; A < h.length; A++)
    l.push(`L${h[A][0]},${h[A][1]}`);
  const p = Math.floor(h.length / 2), d = (h[p - 1][0] + h[p][0]) / 2, f = (h[p - 1][1] + h[p][1]) / 2, g = h[h.length - 1], m = h[h.length - 2], y = Math.atan2(g[1] - m[1], g[0] - m[0]), x = h[0], b = h[1], w = Math.atan2(x[1] - b[1], x[0] - b[0]);
  let v = 1 / 0, M = 1 / 0, C = -1 / 0, z = -1 / 0;
  for (const [A, P] of h)
    A < v && (v = A), P < M && (M = P), A > C && (C = A), P > z && (z = P);
  return {
    path: l.join(" "),
    labelX: d,
    labelY: f,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: y,
    tailAngle: w,
    sourceSide: r,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: v, y: M, w: C - v, h: z - M }
  };
}
function js(t, e, o, n, r, s, i, a) {
  const h = Xo(r), c = Xo(s), l = t + h.dx * i, p = e + h.dy * i, d = o + c.dx * i, f = n + c.dy * i, g = r === "left" || r === "right", m = s === "left" || s === "right", y = [[t, e], [l, p]], x = a ?? 0.5;
  let b;
  if (g && m) {
    const w = l + (d - l) * x;
    y.push([w, p], [w, f]);
    const v = Math.min(l, d), M = Math.max(l, d);
    b = { x: w, y: (p + f) / 2, axis: "x", min: v, max: M };
  } else if (!g && !m) {
    const w = p + (f - p) * x;
    y.push([l, w], [d, w]);
    const v = Math.min(p, f), M = Math.max(p, f);
    b = { x: (l + d) / 2, y: w, axis: "y", min: v, max: M };
  } else g && !m ? y.push([d, p]) : y.push([l, f]);
  return y.push([d, f], [o, n]), { points: y, kinkHandle: b };
}
function zd(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let r = 1; r < t.length - 1; r++) {
    const s = t[r - 1], i = t[r], a = t[r + 1], h = i[0] - s[0], c = i[1] - s[1], l = a[0] - i[0], p = a[1] - i[1], d = Math.hypot(h, c), f = Math.hypot(l, p);
    if (d === 0 || f === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const g = Math.min(e, d / 2, f / 2), m = i[0] - h / d * g, y = i[1] - c / d * g, x = i[0] + l / f * g, b = i[1] + p / f * g;
    o.push(`L${m},${y}`), o.push(`Q${i[0]},${i[1]} ${x},${b}`);
  }
  const n = t[t.length - 1];
  return o.push(`L${n[0]},${n[1]}`), o.join(" ");
}
function Td(t, e, o, n, r, s, i, a, h) {
  const c = 1 - h, l = c * c, p = l * c, d = h * h, f = d * h;
  return [
    p * t + 3 * l * h * o + 3 * c * d * r + f * i,
    p * e + 3 * l * h * n + 3 * c * d * s + f * a
  ];
}
function Pd(t, e, o, n, r, s, i, a, h, c, l = 40) {
  let p = 1 / 0, d = o, f = n;
  for (let g = 1; g <= l; g++) {
    const m = g / l, [y, x] = Td(o, n, r, s, i, a, h, c, m), b = Vs(t, e, d, f, y, x);
    b < p && (p = b), d = y, f = x;
  }
  return p;
}
function Ad(t, e, o) {
  let n = 1 / 0;
  for (let r = 1; r < o.length; r++) {
    const s = Vs(t, e, o[r - 1][0], o[r - 1][1], o[r][0], o[r][1]);
    s < n && (n = s);
  }
  return n;
}
function Va(t, e, o, n, r, s, i, a) {
  const h = r.data.edgeType || "bezier", c = Pe(
    o,
    n,
    h,
    s,
    r.data.sourceHandle,
    r.data.targetHandle,
    r.data.midpointOffset,
    r.data.curveOffset,
    i,
    a,
    r.data.sourceT,
    r.data.targetT,
    r.data.attachmentGap
  ), { x1: l, y1: p, x2: d, y2: f } = c;
  if (h === "straight")
    return Vs(t, e, l, p, d, f);
  if (h === "bezier") {
    const y = Math.hypot(d - l, f - p), x = Math.min(y * 0.5, Math.max(50, y * 0.25)), b = Xo(c.sourceSide), w = Xo(c.targetSide), v = r.data.curveOffset ? r.data.curveOffset[0] * (4 / 3) : 0, M = r.data.curveOffset ? r.data.curveOffset[1] * (4 / 3) : 0, C = l + b.dx * x + v, z = p + b.dy * x + M, A = d + w.dx * x + v, P = f + w.dy * x + M;
    return Pd(t, e, l, p, C, z, A, P, d, f);
  }
  const g = 20, { points: m } = js(l, p, d, f, c.sourceSide, c.targetSide, g, r.data.midpointOffset);
  return Ad(t, e, m);
}
function Ti(t, e, o) {
  const n = qe(t, o), r = qe(e, o), s = t.x + t.w / 2, i = t.y + n / 2, a = e.x + e.w / 2, h = e.y + r / 2, c = xs(t, n, a, h), l = xs(e, r, s, i);
  return { x1: c.x, y1: c.y, x2: l.x, y2: l.y };
}
function Ed(t, e, o, n) {
  const r = qe(t, n);
  return xs(t, r, e, o);
}
function Vs(t, e, o, n, r, s) {
  const i = r - o, a = s - n, h = i * i + a * a;
  if (h === 0) return Math.hypot(t - o, e - n);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - n) * a) / h)), l = o + c * i, p = n + c * a;
  return Math.hypot(t - l, e - p);
}
function go(t, e, o, n) {
  const r = Math.cos(o), s = Math.sin(o), i = -s, a = r, h = n / 2, c = t + r * h, l = e + s * h, p = t - r * h, d = e - s * h, f = n * 0.4;
  return `M${p + i * f},${d + a * f} L${c},${l} L${p - i * f},${d - a * f}`;
}
function fr(t, e, o, n) {
  const r = Math.cos(o), s = Math.sin(o), i = -s, a = r, h = n / 2, c = t + r * h, l = e + s * h, p = t - r * h, d = e - s * h, f = n * 0.4;
  return `M${c},${l} L${p + i * f},${d + a * f} L${p - i * f},${d - a * f} Z`;
}
function ws(t, e) {
  const o = qe(t, e);
  return ["top", "right", "bottom", "left"].map((r) => {
    const s = pr(t, o, r);
    return { side: r, x: s.x, y: s.y };
  });
}
function _n(t, e, o, n) {
  const r = ws(t, n);
  let s = r[0], i = 1 / 0;
  for (const a of r) {
    const h = Math.hypot(a.x - e, a.y - o);
    h < i && (i = h, s = a);
  }
  return s.side;
}
function Ka(t, e) {
  const o = Math.max(0.01, e), n = t.data.strokeWidth ?? 2;
  return Math.max(n / 2 + 8 / o, 10 / o);
}
function Pi(t, e, o, n, r, s) {
  const i = ke.isEnabled(), a = i ? performance.now() : 0;
  let h = null;
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const l = c, p = t.get(l.data.fromId), d = t.get(l.data.toId);
    if (!p || !d) continue;
    const f = s == null ? void 0 : s(l, p, d), g = Va(e, o, p, d, l, r, f == null ? void 0 : f.sourcePortPos, f == null ? void 0 : f.targetPortPos), m = Ka(l, n);
    g < m && (!h || g < h.distance) && (h = { node: c, distance: g });
  }
  return i && ke.recordEdgeHit(performance.now() - a), h;
}
function Ld(t, e, o, n, r, s) {
  const i = ke.isEnabled(), a = i ? performance.now() : 0, h = [];
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const l = c, p = t.get(l.data.fromId), d = t.get(l.data.toId);
    if (!p || !d) continue;
    const f = s == null ? void 0 : s(l, p, d);
    Va(e, o, p, d, l, r, f == null ? void 0 : f.sourcePortPos, f == null ? void 0 : f.targetPortPos) < Ka(l, n) && h.push(c);
  }
  return i && ke.recordEdgeHit(performance.now() - a), h;
}
function ks(t, e, o) {
  var c;
  o = (o % 1 + 1) % 1;
  const n = t.x + t.w / 2, r = t.y + e / 2;
  if (t.type === "draw") {
    const l = t.data.points;
    if (l && l.length >= 2) {
      const p = [0];
      for (let f = 1; f < l.length; f++)
        p.push(p[f - 1] + Math.hypot(l[f][0] - l[f - 1][0], l[f][1] - l[f - 1][1]));
      const d = p[p.length - 1];
      if (d > 0) {
        const f = o * d;
        let g = 0;
        for (let A = 1; A < p.length; A++) {
          if (p[A] >= f) {
            g = A - 1;
            break;
          }
          A === p.length - 1 && (g = A - 1);
        }
        const m = p[g + 1] - p[g], y = m > 0 ? (f - p[g]) / m : 0;
        let x = t.x + l[g][0] + (l[g + 1][0] - l[g][0]) * y, b = t.y + l[g][1] + (l[g + 1][1] - l[g][1]) * y;
        const w = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2), v = x - n, M = b - r, C = Math.hypot(v, M);
        C > 0 && (x += v / C * w, b += M / C * w);
        const z = Oo(x - n, b - r, t.w / 2, e / 2);
        if (t.rotation) {
          const A = t.rotation * Math.PI / 180, [P, Y] = Ne(x, b, n, r, A);
          return { x: P, y: Y, side: z };
        }
        return { x, y: b, side: z };
      }
    }
  }
  const s = t.type === "shape" ? (c = t.data) == null ? void 0 : c.shape : void 0;
  let i, a, h;
  if (s === "ellipse") {
    const l = o * 2 * Math.PI - Math.PI / 2, p = t.w / 2, d = e / 2;
    i = n + p * Math.cos(l), a = r + d * Math.sin(l), h = Oo(i - n, a - r, p, d);
  } else if (s === "diamond") {
    const l = n, p = t.y, d = t.x + t.w, f = r, g = n, m = t.y + e, y = t.x, x = r;
    if (o < 0.25) {
      const b = o / 0.25;
      i = l + (d - l) * b, a = p + (f - p) * b, h = o < 0.125 ? "top" : "right";
    } else if (o < 0.5) {
      const b = (o - 0.25) / 0.25;
      i = d + (g - d) * b, a = f + (m - f) * b, h = o < 0.375 ? "right" : "bottom";
    } else if (o < 0.75) {
      const b = (o - 0.5) / 0.25;
      i = g + (y - g) * b, a = m + (x - m) * b, h = o < 0.625 ? "bottom" : "left";
    } else {
      const b = (o - 0.75) / 0.25;
      i = y + (l - y) * b, a = x + (p - x) * b, h = o < 0.875 ? "left" : "top";
    }
  } else {
    const l = t.w, p = 2 * (l + e);
    let d = o * p;
    const f = l / 2;
    d < f ? (i = n + d, a = t.y, h = "top") : d < f + e ? (d -= f, i = t.x + l, a = t.y + d, h = "right") : d < f + e + l ? (d -= f + e, i = t.x + l - d, a = t.y + e, h = "bottom") : d < f + e + l + e ? (d -= f + e + l, i = t.x, a = t.y + e - d, h = "left") : (d -= f + e + l + e, i = t.x + d, a = t.y, h = "top");
  }
  if (t.rotation) {
    const l = t.rotation * Math.PI / 180, [p, d] = Ne(i, a, n, r, l);
    return { x: p, y: d, side: h };
  }
  return { x: i, y: a, side: h };
}
function Rd(t, e, o, n) {
  var x;
  const r = t.x + t.w / 2, s = t.y + e / 2;
  let i = o, a = n;
  if (t.rotation) {
    const b = -t.rotation * Math.PI / 180;
    [i, a] = Ne(o, n, r, s, b);
  }
  if (t.type === "draw") {
    const b = t.data.points;
    if (b && b.length >= 2) {
      const w = [0];
      for (let M = 1; M < b.length; M++)
        w.push(w[M - 1] + Math.hypot(b[M][0] - b[M - 1][0], b[M][1] - b[M - 1][1]));
      const v = w[w.length - 1];
      if (v > 0) {
        const M = i - t.x, C = a - t.y;
        let z = 1 / 0, A = 0;
        for (let P = 0; P < b.length - 1; P++) {
          const Y = b[P][0], G = b[P][1], rt = b[P + 1][0], st = b[P + 1][1], at = rt - Y, xt = st - G, O = at * at + xt * xt, _ = O === 0 ? 0 : Math.max(0, Math.min(1, ((M - Y) * at + (C - G) * xt) / O)), W = Y + _ * at, Z = G + _ * xt, tt = Math.hypot(M - W, C - Z);
          tt < z && (z = tt, A = w[P] + _ * (w[P + 1] - w[P]));
        }
        return A / v;
      }
    }
  }
  const h = t.type === "shape" ? (x = t.data) == null ? void 0 : x.shape : void 0;
  if (h === "ellipse")
    return ((Math.atan2(a - s, i - r) + Math.PI / 2) / (2 * Math.PI) % 1 + 1) % 1;
  if (h === "diamond") {
    const b = r, w = t.y, v = t.x + t.w, M = s, C = r, z = t.y + e, A = t.x, P = s, Y = [
      { ax: b, ay: w, bx: v, by: M, tStart: 0 },
      { ax: v, ay: M, bx: C, by: z, tStart: 0.25 },
      { ax: C, ay: z, bx: A, by: P, tStart: 0.5 },
      { ax: A, ay: P, bx: b, by: w, tStart: 0.75 }
    ];
    let G = 0, rt = 1 / 0;
    for (const st of Y) {
      const at = st.bx - st.ax, xt = st.by - st.ay, O = at * at + xt * xt, _ = O === 0 ? 0 : Math.max(0, Math.min(1, ((i - st.ax) * at + (a - st.ay) * xt) / O)), W = st.ax + _ * at, Z = st.ay + _ * xt, tt = Math.hypot(i - W, a - Z);
      tt < rt && (rt = tt, G = st.tStart + _ * 0.25);
    }
    return (G % 1 + 1) % 1;
  }
  const c = t.w, l = t.x, p = t.y, d = 2 * (c + e), f = c / 2, g = [
    // Top edge right half: top-center → top-right
    { ax: r, ay: p, bx: l + c, by: p, dStart: 0, len: f },
    // Right edge: top-right → bottom-right
    { ax: l + c, ay: p, bx: l + c, by: p + e, dStart: f, len: e },
    // Bottom edge: bottom-right → bottom-left
    { ax: l + c, ay: p + e, bx: l, by: p + e, dStart: f + e, len: c },
    // Left edge: bottom-left → top-left
    { ax: l, ay: p + e, bx: l, by: p, dStart: f + e + c, len: e },
    // Top edge left half: top-left → top-center
    { ax: l, ay: p, bx: r, by: p, dStart: f + e + c + e, len: f }
  ];
  let m = 0, y = 1 / 0;
  for (const b of g) {
    const w = b.bx - b.ax, v = b.by - b.ay, M = w * w + v * v, C = M === 0 ? 0 : Math.max(0, Math.min(1, ((i - b.ax) * w + (a - b.ay) * v) / M)), z = b.ax + C * w, A = b.ay + C * v, P = Math.hypot(i - z, a - A);
    P < y && (y = P, m = (b.dStart + C * b.len) / d);
  }
  return (m % 1 + 1) % 1;
}
function Be(t, e, o, n) {
  const r = qe(t, n), s = Rd(t, r, e, o), i = ks(t, r, s);
  return { t: s, x: i.x, y: i.y };
}
function vs(t) {
  const e = t.data;
  return (e == null ? void 0 : e.showEdgeComputeOverlay) === !0;
}
function Do(t, e) {
  return `${t}:${e}`;
}
function vo(t, e) {
  return t.h === "auto" ? (e == null ? void 0 : e[t.id]) ?? 100 : t.h;
}
function Dd(t, e) {
  const o = new Set(t), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const a of t)
    n.set(a, 0), r.set(a, []);
  for (const { from: a, to: h } of e)
    !o.has(a) || !o.has(h) || (r.get(a).push(h), n.set(h, (n.get(h) ?? 0) + 1));
  const s = t.filter((a) => (n.get(a) ?? 0) === 0);
  let i = 0;
  for (; s.length; ) {
    const a = s.pop();
    i++;
    for (const h of r.get(a) ?? []) {
      const c = (n.get(h) ?? 0) - 1;
      n.set(h, c), c === 0 && s.push(h);
    }
  }
  return i === t.length;
}
function Wd(t, e) {
  const o = new Set(t), n = /* @__PURE__ */ new Map();
  for (const i of t) n.set(i, /* @__PURE__ */ new Set());
  for (const { from: i, to: a } of e)
    o.has(i) && o.has(a) && (n.get(i).add(a), n.get(a).add(i));
  const r = /* @__PURE__ */ new Set(), s = [];
  for (const i of [...t].sort()) {
    if (r.has(i)) continue;
    const a = [i];
    r.add(i);
    const h = [];
    for (; a.length; ) {
      const c = a.pop();
      h.push(c);
      for (const l of n.get(c) ?? [])
        r.has(l) || (r.add(l), a.push(l));
    }
    s.push(h);
  }
  return s;
}
function Bd(t, e) {
  const o = [];
  for (const n of t) {
    if (n.type !== "edge") continue;
    const r = n, { fromId: s, toId: i } = r.data;
    e.has(s) && e.has(i) && o.push(r);
  }
  return o;
}
function Nd(t) {
  return t.map((e) => ({
    from: e.data.fromId,
    to: e.data.toId
  }));
}
function Fd(t, e, o, n) {
  const r = [...t].sort(
    (d, f) => d.y === f.y ? d.x - f.x : d.y - f.y
  ), s = r.length;
  if (s === 0) return /* @__PURE__ */ new Map();
  const i = Math.max(1, Math.ceil(Math.sqrt(s))), a = Math.max(1, ...r.map((d) => d.w)), h = Math.max(
    1,
    ...r.map((d) => vo(d, e))
  ), c = a + o, l = h + n, p = /* @__PURE__ */ new Map();
  for (let d = 0; d < s; d++) {
    const f = Math.floor(d / i), g = d % i;
    p.set(r[d].id, { x: g * c, y: f * l });
  }
  return p;
}
function Hd(t, e) {
  const o = /* @__PURE__ */ new Map();
  for (const r of t) o.set(r, 0);
  const n = Math.max(t.length, e.length) + 2;
  for (let r = 0; r < n; r++)
    for (const { from: s, to: i } of e)
      o.set(i, Math.max(o.get(i), o.get(s) + 1));
  return o;
}
function Ai(t, e, o, n) {
  if (e.length === 0) return [...t];
  const r = new Map(e.map((i, a) => [i, a])), s = t.map((i) => {
    let a = 0, h = 0;
    for (const { from: c, to: l } of o)
      n === "backward" ? l === i && r.has(c) && (a += r.get(c), h++) : c === i && r.has(l) && (a += r.get(l), h++);
    return { id: i, score: h > 0 ? a / h : 1e9 };
  });
  return s.sort((i, a) => i.score - a.score || i.id.localeCompare(a.id)), s.map((i) => i.id);
}
function Od(t, e, o, n, r) {
  const s = t.map((g) => g.id), i = new Set(s), a = e.filter(
    (g) => i.has(g.from) && i.has(g.to)
  ), h = Hd(s, a), c = Math.max(0, ...s.map((g) => h.get(g) ?? 0)), l = [];
  for (let g = 0; g <= c; g++) l[g] = [];
  for (const g of s) {
    const m = h.get(g) ?? 0;
    l[m].push(g);
  }
  const p = new Map(t.map((g) => [g.id, g]));
  for (let g = 0; g <= c; g++)
    l[g].sort((m, y) => {
      const x = p.get(m), b = p.get(y);
      return x.y - b.y || x.x - b.x;
    });
  for (let g = 0; g < 2; g++) {
    for (let m = 1; m <= c; m++)
      l[m] = Ai(
        l[m],
        l[m - 1],
        a,
        "backward"
      );
    for (let m = c - 1; m >= 0; m--)
      l[m] = Ai(
        l[m],
        l[m + 1],
        a,
        "forward"
      );
  }
  const d = /* @__PURE__ */ new Map();
  let f = 0;
  for (let g = 0; g <= c; g++) {
    const m = l[g], y = Math.max(1, ...m.map((b) => p.get(b).w));
    let x = 0;
    for (const b of m) {
      const w = p.get(b);
      d.set(b, { x: f, y: x }), x += vo(w, o) + r;
    }
    f += y + n;
  }
  return d;
}
function Ss(t, e, o) {
  let n = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
  const a = new Map(e.map((h) => [h.id, h]));
  for (const [h, c] of t) {
    const l = a.get(h);
    if (!l) continue;
    const p = vo(l, o);
    n = Math.min(n, c.x), r = Math.min(r, c.y), s = Math.max(s, c.x + l.w), i = Math.max(i, c.y + p);
  }
  return Number.isFinite(n) ? { minX: n, minY: r, maxX: s, maxY: i } : { minX: 0, minY: 0, maxX: 0, maxY: 0 };
}
function Xd(t, e, o) {
  const n = Ss(t, e, o), r = -n.minX, s = -n.minY, i = /* @__PURE__ */ new Map();
  for (const [a, h] of t)
    i.set(a, { x: h.x + r, y: h.y + s });
  return i;
}
function jr(t, e) {
  const o = t.x + t.w / 2, n = t.y + t.h / 2, r = e.x + e.w / 2, s = e.y + e.h / 2, i = Math.min(t.x + t.w, e.x + e.w) - Math.max(t.x, e.x), a = Math.min(t.y + t.h, e.y + e.h) - Math.max(t.y, e.y);
  return i <= 0 || a <= 0 ? null : i < a ? o < r ? { dx: -i, dy: 0 } : { dx: i, dy: 0 } : n < s ? { dx: 0, dy: -a } : { dx: 0, dy: a };
}
function Vr(t, e, o, n, r) {
  var c;
  const s = vo(t, o);
  let i = 0, a = 0;
  const h = n == null ? void 0 : n.get(t.type);
  if ((c = h == null ? void 0 : h.ports) != null && c.length) {
    const l = (Ga + 12) / Math.max(0.35, r);
    h.ports.some((p) => p.direction === "input") && (i = l), h.ports.some((p) => p.direction === "output") && (a = l);
  }
  return {
    x: e.x - i,
    y: e.y,
    w: t.w + i + a,
    h: s
  };
}
function qa(t, e, o, n) {
  const r = 14 + 10 / Math.max(0.35, n);
  for (let s = 0; s < 40; s++)
    for (let i = 0; i < e.length; i++)
      for (let a = i + 1; a < e.length; a++) {
        const h = e[i], c = e[a], l = t.get(h.id), p = t.get(c.id), d = vo(h, o), f = vo(c, o), g = l.x + h.w / 2, m = l.y + d / 2, y = p.x + c.w / 2, x = p.y + f / 2;
        let b = g - y, w = m - x, v = Math.hypot(b, w);
        if (v >= r) continue;
        if (v < 1e-4) {
          const C = (i * 2.17 + a * 3.91 + s * 0.37) % (Math.PI * 2);
          b = Math.cos(C), w = Math.sin(C), v = 0;
        } else
          b /= v, w /= v;
        const M = (r - v) * 0.62 + 6 / Math.max(0.35, n);
        l.x += b * M, l.y += w * M, p.x -= b * M, p.y -= w * M;
      }
}
function Yd(t, e, o, n, r) {
  const s = vo(t, o), i = vo(e, o), a = t.x + t.w / 2, h = t.y + s / 2, c = e.x + e.w / 2, l = e.y + i / 2;
  let p = c - a, d = l - h, f = Math.hypot(p, d);
  f < 1e-4 && (p = 1, d = 0, f = 1);
  const g = -d / f, m = p / f, y = Math.floor(n / 2) + 1, b = (n % 2 === 0 ? 1 : -1) * (18 / Math.max(0.35, r)) * Math.min(3, y) * (1 + y * 0.12);
  return { dx: g * b, dy: m * b };
}
function Kr(t, e, o, n, r = 0) {
  const s = 13 / n, i = 7 / n, a = 5 / n, h = 6 / n, c = Math.max(...t.map((d) => d.text.length), 1), l = Math.min(c * h + i * 2, 280 / n) + r, p = t.length * s + a * 2;
  return {
    x: e - l / 2,
    y: o - p / 2,
    w: l,
    h: p
  };
}
function Gd(t, e, o, n, r, s) {
  var p, d;
  const i = o.data, a = Pe(
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
      const f = n.get(t.type);
      if (f != null && f.ports)
        return Te(
          t,
          f.ports,
          i.sourcePort,
          s,
          r,
          f.portAnchor ?? "bbox"
        ) ?? void 0;
    })(),
    (() => {
      if (!i.targetPort || !n) return;
      const f = n.get(e.type);
      if (f != null && f.ports)
        return Te(
          e,
          f.ports,
          i.targetPort,
          s,
          r,
          f.portAnchor ?? "bbox"
        ) ?? void 0;
    })(),
    i.sourceT,
    i.targetT,
    i.attachmentGap
  ), h = a.labelX, c = a.labelY;
  if (i.sourcePort && i.targetPort) {
    const f = (p = i.label) == null ? void 0 : p.trim();
    if (!vs(e))
      return f ? Kr([{ text: f }], h, c, s, 0) : null;
    const g = [];
    f && g.push({ text: f }), g.push({
      text: `${i.sourcePort} → ${i.targetPort}`
    }), g.push({ text: "compute 999 ms" });
    const m = 9 / s;
    return Kr(
      g,
      h,
      c,
      s,
      m * 2 + 6 / s
    );
  }
  const l = (d = i.label) == null ? void 0 : d.trim();
  return l ? Kr(
    [{ text: l }],
    h,
    c,
    s,
    0
  ) : null;
}
function Ei(t, e, o, n, r, s) {
  const i = Yd(e, o, n, r, s);
  return { ...t, x: t.x + i.dx, y: t.y + i.dy };
}
function jd(t, e) {
  const o = Math.hypot(t.x, t.y);
  if (o > e && o > 1e-9) {
    const n = e / o;
    t.x *= n, t.y *= n;
  }
}
function Vd(t) {
  return [...t].sort(
    (e, o) => e.data.fromId.localeCompare(o.data.fromId) || e.data.toId.localeCompare(o.data.toId) || e.id.localeCompare(o.id)
  );
}
function Kd(t, e, o, n, r, s) {
  if (e.length < 2) return;
  const i = new Map(e.map((p) => [p.id, p])), a = new Set(e.map((p) => p.id)), h = 78, c = (p, d, f, g) => {
    const m = g.get(p) ?? { x: 0, y: 0 };
    m.x += d, m.y += f, g.set(p, m);
  }, l = Math.max(0.35, s);
  for (let p = 0; p < h; p++) {
    const d = /* @__PURE__ */ new Map(), f = 0.36 + p * 9e-3, g = 34, m = (w) => {
      const v = i.get(w), M = t.get(w);
      return { ...v, x: M.x, y: M.y };
    };
    for (let w = 0; w < e.length; w++)
      for (let v = w + 1; v < e.length; v++) {
        const M = e[w], C = e[v], z = Vr(
          M,
          t.get(M.id),
          r,
          n,
          l
        ), A = Vr(
          C,
          t.get(C.id),
          r,
          n,
          l
        ), P = jr(z, A);
        if (!P) continue;
        const Y = 1.08 + (p < 24 ? 0.12 : 0), G = P.dx * 0.5 * Y, rt = P.dy * 0.5 * Y;
        c(M.id, G, rt, d), c(C.id, -G, -rt, d);
      }
    const y = [], x = Vd(o);
    let b = 0;
    for (const w of x) {
      const { fromId: v, toId: M } = w.data;
      if (!a.has(v) || !a.has(M)) continue;
      const C = Gd(
        m(v),
        m(M),
        w,
        n,
        r,
        s
      );
      C && y.push({ rect: C, fromId: v, toId: M, idx: b++ });
    }
    for (const { rect: w, fromId: v, toId: M } of y)
      for (const C of e) {
        const z = Vr(
          C,
          t.get(C.id),
          r,
          n,
          l
        ), A = jr(w, z);
        if (!A) continue;
        const P = C.id === v || C.id === M ? 0.58 : 0.44;
        c(v, A.dx * P, A.dy * P, d), c(M, A.dx * P, A.dy * P, d), C.id !== v && C.id !== M && c(C.id, -A.dx * P * 0.9, -A.dy * P * 0.9, d);
      }
    for (let w = 0; w < y.length; w++)
      for (let v = w + 1; v < y.length; v++) {
        const M = y[w], C = y[v], z = Ei(
          M.rect,
          m(M.fromId),
          m(M.toId),
          r,
          M.idx * 2,
          s
        ), A = Ei(
          C.rect,
          m(C.fromId),
          m(C.toId),
          r,
          C.idx * 2 + 1,
          s
        );
        let P = jr(z, A);
        if (!P) {
          const st = z.x + z.w / 2, at = z.y + z.h / 2, xt = A.x + A.w / 2, O = A.y + A.h / 2;
          let _ = st - xt, W = at - O, Z = Math.hypot(_, W);
          if (Z < 1e-4) {
            const tt = (w * 1.7 + v * 2.3 + p * 0.11) % (Math.PI * 2);
            _ = Math.cos(tt), W = Math.sin(tt), Z = 1;
          } else
            _ /= Z, W /= Z;
          P = { dx: _ * 14, dy: W * 14 };
        }
        const Y = 0.5 + (p < 30 ? 0.12 : 0), G = P.dx * Y, rt = P.dy * Y;
        c(M.fromId, G, rt, d), c(M.toId, G, rt, d), c(C.fromId, -G, -rt, d), c(C.toId, -G, -rt, d);
      }
    for (const [w, v] of d) {
      const M = { x: v.x * f, y: v.y * f };
      jd(M, g);
      const C = t.get(w);
      C && (C.x += M.x, C.y += M.y);
    }
    (p === 20 || p === 45) && qa(t, e, r, s);
  }
}
function qd(t, e, o, n, r, s = 1) {
  const i = Math.max(24, n ?? 32), a = Math.max(16, Math.round((n ?? 32) * 0.5)), h = Math.max(32, i), c = new Map(t.map((z) => [z.id, z])), l = [...e].map((z) => c.get(z)).filter(
    (z) => !!z && z.type !== "edge" && !z.locked
  );
  if (l.length < 2) return [];
  const p = new Set(l.map((z) => z.id)), d = Bd(t, p), f = Nd(d), g = Wd(
    l.map((z) => z.id),
    f
  );
  g.sort((z, A) => {
    const P = Math.min(...z.map((G) => {
      var rt;
      return ((rt = c.get(G)) == null ? void 0 : rt.x) ?? 0;
    })), Y = Math.min(...A.map((G) => {
      var rt;
      return ((rt = c.get(G)) == null ? void 0 : rt.x) ?? 0;
    }));
    return P - Y;
  });
  const m = /* @__PURE__ */ new Map();
  let y = 0;
  for (const z of g) {
    const A = z.map((W) => c.get(W)).filter((W) => !!W), P = new Set(z), Y = d.filter(
      (W) => P.has(W.data.fromId) && P.has(W.data.toId)
    ), G = f.filter(
      (W) => P.has(W.from) && P.has(W.to)
    ), st = Y.some(
      (W) => W.data.sourcePort && W.data.targetPort
    ) ? 1.72 : 1.18, at = i * st, xt = a * st;
    let O;
    G.length === 0 || !Dd(z, G) ? O = Fd(A, o, at, xt) : O = Od(
      A,
      G,
      o,
      at,
      xt
    ), qa(
      O,
      A,
      o,
      Math.max(0.25, s)
    ), Kd(
      O,
      A,
      Y,
      r,
      o,
      Math.max(0.25, s)
    ), O = Xd(O, A, o);
    const _ = Ss(O, A, o);
    for (const [W, Z] of O)
      m.set(W, { x: Z.x + y, y: Z.y });
    y += _.maxX - _.minX + h;
  }
  const x = Math.min(...l.map((z) => z.x)), b = Math.min(...l.map((z) => z.y)), w = Ss(m, l, o), v = x - w.minX, M = b - w.minY, C = [];
  for (const z of l) {
    const A = m.get(z.id);
    A && C.push({ id: z.id, x: A.x + v, y: A.y + M });
  }
  return C;
}
function Ud(t, e, o) {
  const n = t.x, r = t.x + t.w / 2, s = t.x + t.w, i = t.y, a = t.y + t.h / 2, h = t.y + t.h, c = [n, r, s], l = [i, a, h];
  let p = 1 / 0, d = 1 / 0;
  const f = [];
  for (const m of e) {
    const y = m.x, x = m.x + m.w / 2, b = m.x + m.w, w = m.y, v = m.y + m.h / 2, M = m.y + m.h, C = [y, x, b], z = [w, v, M];
    for (const A of c)
      for (const P of C) {
        const Y = P - A;
        Math.abs(Y) <= o && (Math.abs(Y) < Math.abs(p) && (p = Y), f.push({
          axis: "x",
          position: P,
          start: Math.min(t.y, t.y + t.h, m.y, m.y + m.h),
          end: Math.max(t.y, t.y + t.h, m.y, m.y + m.h)
        }));
      }
    for (const A of l)
      for (const P of z) {
        const Y = P - A;
        Math.abs(Y) <= o && (Math.abs(Y) < Math.abs(d) && (d = Y), f.push({
          axis: "y",
          position: P,
          start: Math.min(t.x, t.x + t.w, m.x, m.x + m.w),
          end: Math.max(t.x, t.x + t.w, m.x, m.x + m.w)
        }));
      }
  }
  const g = /* @__PURE__ */ new Map();
  for (const m of f) {
    const y = `${m.axis}:${m.position.toFixed(1)}`, x = g.get(y);
    x ? (x.start = Math.min(x.start, m.start), x.end = Math.max(x.end, m.end)) : g.set(y, { ...m });
  }
  return {
    guides: Array.from(g.values()),
    snapDx: Math.abs(p) <= o ? p : 0,
    snapDy: Math.abs(d) <= o ? d : 0
  };
}
class Zd {
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
    kt(this, "history", new qc());
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
    kt(this, "quadTree", new ys({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
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
      for (const a of i) {
        const h = this.countOccurrences(a.text.toLocaleLowerCase(), o);
        h > 0 && n.push({
          nodeId: s.id,
          nodeType: s.type,
          field: a.field,
          text: a.text,
          matchCount: h
        });
      }
    }
    return n;
  }
  getNodeSearchCandidates(e) {
    if (!e.data || typeof e.data != "object") return [];
    const o = e.data, n = [], r = (s, i) => {
      if (typeof i != "string") return;
      const a = i.trim();
      a && n.push({ field: s, text: a });
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
      const s = r, i = Array.isArray(s.content) ? s.content.filter((h) => h && typeof h == "object" && (h.type ?? "text") === "text").map((h) => typeof h.text == "string" ? h.text : "").join("") : "", a = Array.isArray(s.children) && s.children.length > 0 ? o(s.children) : "";
      return a ? `${i}
${a}` : i;
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
    for (const h of this.nodes.values())
      if (h.type === "frame") {
        const c = h.data;
        e.push({ id: h.id, x: h.x, y: h.y, order: c.slideOrder });
      }
    if (e.length === 0) return;
    const o = e.filter((h) => h.order != null).sort((h, c) => h.order - c.order), n = e.filter((h) => h.order == null), r = 100;
    n.sort((h, c) => h.y - c.y);
    const s = [];
    for (const h of n) {
      const c = s[s.length - 1];
      c && Math.abs(h.y - c[0].y) < r ? c.push(h) : s.push([h]);
    }
    const i = s.flatMap((h) => h.sort((c, l) => c.x - l.x)), a = [...o, ...i];
    this.presentationSlides = a.map((h) => h.id), this.presentationIndex = 0, this.presentationMode = !0, this.selection.size > 0 && (this.selection.clear(), this.emit("selection")), this.emit("presentation"), this.presentationGoTo(0);
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
    const s = this._computeSlideViewport(n), i = n.data, a = i.transition ?? "pan", h = i.transitionDuration, c = e >= r ? 1 : -1;
    switch (a) {
      case "none":
        this._transitionNone(s);
        break;
      case "fade":
        this._transitionFade(s, h);
        break;
      case "dissolve":
        this._transitionDissolve(s, h);
        break;
      case "zoom":
        this._transitionZoom(s, h);
        break;
      case "fold":
        this._transitionFold(s, h);
        break;
      case "cube":
        this._transitionCube(s, h, c);
        break;
      case "pan":
      default:
        this._transitionPan(s, h);
        break;
    }
  }
  _computeSlideViewport(e) {
    const o = this.resolveHeight(e), n = 40, r = e.x - n, s = e.y - n, i = e.w + n * 2, a = o + n * 2, h = this._containerWidth, c = this._containerHeight, l = hn(Math.min(h / i, c / a), 0.1, 5);
    return {
      x: (h - i * l) / 2 - r * l,
      y: (c - a * l) / 2 - s * l,
      zoom: l
    };
  }
  /** Pan transition: smooth viewport interpolation (default). */
  _transitionPan(e, o) {
    const n = o ?? 400, r = performance.now(), s = { ...this.viewport }, i = (a) => {
      const h = Math.min((a - r) / n, 1), c = 1 - Math.pow(1 - h, 3);
      this.viewport.x = s.x + (e.x - s.x) * c, this.viewport.y = s.y + (e.y - s.y) * c, this.viewport.zoom = s.zoom + (e.zoom - s.zoom) * c, this.emit("viewport"), h < 1 ? this._presentationAnimId = requestAnimationFrame(i) : this._presentationAnimId = null;
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
      const a = Math.min((i - r) / n, 1);
      if (this._transitionOverlay = { type: "fade", phase: "out", progress: a }, this.emit("presentation"), a < 1)
        this._presentationAnimId = requestAnimationFrame(s);
      else {
        this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport");
        const h = performance.now(), c = (l) => {
          const p = Math.min((l - h) / n, 1);
          this._transitionOverlay = { type: "fade", phase: "in", progress: p }, this.emit("presentation"), p < 1 ? this._presentationAnimId = requestAnimationFrame(c) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
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
    const i = (a) => {
      const h = Math.min((a - r) / n, 1);
      h < 0.5 ? this._transitionOverlay = { type: "dissolve", phase: "out", progress: h * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "dissolve", phase: "in", progress: (h - 0.5) * 2 }), this.emit("presentation"), h < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Zoom transition: zoom out from current, zoom into target. */
  _transitionZoom(e, o) {
    const n = o ?? 600, r = performance.now(), s = { ...this.viewport }, i = Math.max(0.1, Math.min(s.zoom, e.zoom) * 0.35), a = (s.x + e.x) / 2, h = (s.y + e.y) / 2, c = (l) => {
      const p = Math.min((l - r) / n, 1);
      if (p < 0.5) {
        const d = p * 2, f = 1 - Math.pow(1 - d, 3);
        this.viewport.x = s.x + (a - s.x) * f, this.viewport.y = s.y + (h - s.y) * f, this.viewport.zoom = s.zoom + (i - s.zoom) * f;
      } else {
        const d = (p - 0.5) * 2, f = 1 - Math.pow(1 - d, 3);
        this.viewport.x = a + (e.x - a) * f, this.viewport.y = h + (e.y - h) * f, this.viewport.zoom = i + (e.zoom - i) * f;
      }
      this.emit("viewport"), p < 1 ? this._presentationAnimId = requestAnimationFrame(c) : this._presentationAnimId = null;
    };
    this._presentationAnimId = requestAnimationFrame(c);
  }
  /** Fold transition: two halves fold shut like a book, snap viewport, unfold to reveal. */
  _transitionFold(e, o) {
    const n = o ?? 700, r = performance.now();
    let s = !1;
    const i = (a) => {
      const h = Math.min((a - r) / n, 1);
      h < 0.5 ? this._transitionOverlay = { type: "fold", phase: "out", progress: h * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "fold", phase: "in", progress: (h - 0.5) * 2 }), this.emit("presentation"), h < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
  _transitionCube(e, o, n = 1) {
    const r = o ?? 1200, s = performance.now();
    let i = !1;
    const a = (h) => {
      const c = Math.min((h - s) / r, 1);
      c >= 0.5 && !i && (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), i = !0), this._transitionOverlay = {
        type: "cube",
        phase: c < 0.5 ? "out" : "in",
        progress: c < 0.5 ? c * 2 : (c - 0.5) * 2,
        direction: n,
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
    const n = this._containerWidth, r = this._containerHeight;
    this._containerWidth = e, this._containerHeight = o, this.presentationMode && this.presentationSlides.length > 0 ? this.presentationGoTo(this.presentationIndex) : n > 0 && r > 0 && (this.viewport.x += (e - n) / 2, this.viewport.y += (o - r) / 2, this.emit("viewport"));
  }
  /**
   * Precompute static guide candidates for a drag gesture.
   * Reuse this context across pointermove frames to reduce QuadTree work.
   */
  createDragSnapContext(e) {
    const o = e instanceof Set ? e : new Set(e), n = -this.viewport.x / this.viewport.zoom, r = -this.viewport.y / this.viewport.zoom, s = this._containerWidth / this.viewport.zoom, i = this._containerHeight / this.viewport.zoom, a = [], h = this.quadTree.retrieve([], { x: n, y: r, w: s, h: i });
    for (const c of h) {
      if (c.type === "edge" || o.has(c.id)) continue;
      const l = this.resolveHeight(c);
      a.push({ x: c.x, y: c.y, w: c.w, h: l });
    }
    return { staticNodes: a };
  }
  /**
   * Compute smart guide alignment + grid snap for a drag operation.
   * Sets `this.alignGuides` and emits `guides` event.
   * Returns the adjusted delta to apply.
   */
  computeDragSnap(e, o, n, r, s, i) {
    const a = this.snapToGrid && !s, h = this.smartGuides && !s;
    let c = n, l = r, p = [];
    const d = o instanceof Set ? o : new Set(o);
    if (h) {
      let f = 1 / 0, g = 1 / 0, m = -1 / 0, y = -1 / 0;
      for (const v of e) {
        const M = this.getNode(v.id);
        if (!M) continue;
        const C = v.x + n, z = v.y + r, A = this.resolveHeight(M);
        f = Math.min(f, C), g = Math.min(g, z), m = Math.max(m, C + M.w), y = Math.max(y, z + A);
      }
      const x = { x: f, y: g, w: m - f, h: y - g }, b = (i == null ? void 0 : i.staticNodes) ?? this.createDragSnapContext(d).staticNodes, w = Ud(x, b, 5);
      if (p = w.guides, a) {
        const v = e[0].x + n, M = e[0].y + r, C = this.snap(v, M), z = C.x - v, A = C.y - M, P = w.snapDx !== 0 && Math.abs(w.snapDx) <= Math.abs(z), Y = w.snapDy !== 0 && Math.abs(w.snapDy) <= Math.abs(A);
        c = n + (P ? w.snapDx : z), l = r + (Y ? w.snapDy : A), P || (p = p.filter((G) => G.axis !== "x")), Y || (p = p.filter((G) => G.axis !== "y"));
      } else
        c = n + w.snapDx, l = r + w.snapDy;
    } else if (a) {
      const f = this.snap(e[0].x + n, e[0].y + r);
      c = f.x - e[0].x, l = f.y - e[0].y;
    }
    return this.alignGuides = p, this.emit("guides"), { finalDx: c, finalDy: l };
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
  zoomByWheel(e, o, n) {
    this.viewport = rd(
      this.viewport,
      e,
      o - this.containerOffset.x,
      n - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, n) {
    this.viewport = sd(
      this.viewport,
      e,
      o - this.containerOffset.x,
      n - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const n = hn(e, 0.1, 5);
    if (o) {
      const r = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = pn(this.viewport, r, s);
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
    const r = n.h === "auto" ? 100 : n.h, s = n.x + n.w / 2, i = n.y + r / 2, a = this.getWindow(), h = a.innerWidth, c = a.innerHeight, l = hn(o, 0.2, 5);
    this.viewport = {
      x: h / 2 - s * l,
      y: c / 2 - i * l,
      zoom: l
    }, this.emit("viewport");
  }
  fitToContent() {
    if (this.nodes.size === 0) return;
    let e = 1 / 0, o = 1 / 0, n = -1 / 0, r = -1 / 0;
    for (const p of this.nodes.values()) {
      const d = p.h === "auto" ? 100 : p.h;
      p.x < e && (e = p.x), p.y < o && (o = p.y), p.x + p.w > n && (n = p.x + p.w), p.y + d > r && (r = p.y + d);
    }
    const s = 50;
    e -= s, o -= s, n += s, r += s;
    const i = n - e, a = r - o, h = this._containerWidth, c = this._containerHeight, l = hn(
      Math.min(h / i, c / a),
      0.1,
      5
    );
    this.viewport = {
      x: (h - i * l) / 2 - e * l,
      y: (c - a * l) / 2 - o * l,
      zoom: l
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
    return pn(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return nd(this.viewport, e, o);
  }
  // --- Node CRUD ---
  addNode(e) {
    var o, n, r;
    if (this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent), this.nodes.set(e.id, e), this.quadTree.insert(e), e.z < this._minZ && (this._minZ = e.z), e.type === "edge") {
      const s = e, { fromId: i, toId: a } = s.data;
      this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.has(a) || this.adjacency.set(a, /* @__PURE__ */ new Set()), this.adjacency.get(i).add(e.id), this.adjacency.get(a).add(e.id);
    }
    e.type !== "edge" && this.updateFrameMembership([e.id]), (r = (n = (o = this.registry) == null ? void 0 : o.get(e.type)) == null ? void 0 : n.onCreate) == null || r.call(n, e, this), this.emit("node:create", e), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
  }
  addNodes(e) {
    if (e.length === 0) return;
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
    var s, i, a, h, c, l, p, d, f;
    const n = this.nodes.get(e);
    if (!n) return;
    const r = { ...n, ...o };
    if (o.data && typeof o.data == "object" && n.data && typeof n.data == "object" && (r.data = {
      ...n.data,
      ...o.data
    }), this.nodes.set(e, r), (n.x !== r.x || n.y !== r.y || n.w !== r.w || n.h !== r.h || (n.rotation ?? 0) !== (r.rotation ?? 0)) && (this.quadTree.remove(n), this.quadTree.insert(r), this.updateConnectedEdges(e)), n.x !== r.x || n.y !== r.y) {
      const g = r.x - n.x, m = r.y - n.y;
      (a = (i = (s = this.registry) == null ? void 0 : s.get(r.type)) == null ? void 0 : i.onMove) == null || a.call(i, r, g, m, this), this.emit("node:move", r, g, m);
    }
    if (n.w !== r.w || n.h !== r.h) {
      const g = n.w !== 0 ? r.w / n.w : 1, m = n.h === "auto" ? 0 : n.h, y = r.h === "auto" ? 0 : r.h, x = m !== 0 ? y / m : 1;
      this.emit("node:resize", r, g, x);
    }
    (n.rotation ?? 0) !== (r.rotation ?? 0) && ((l = (c = (h = this.registry) == null ? void 0 : h.get(r.type)) == null ? void 0 : c.onRotate) == null || l.call(c, r, r.rotation ?? 0, this), this.emit("node:rotate", r, r.rotation ?? 0)), o.data && n.data !== r.data && ((f = (d = (p = this.registry) == null ? void 0 : p.get(r.type)) == null ? void 0 : d.onDataChange) == null || f.call(d, r, n.data, r.data, this), this.emit("node:data", r, n.data, r.data), this.refreshSearchIfNeeded()), this.emit("change");
  }
  /**
   * Batch update multiple nodes with a single change emit.
   * Use during drag/resize to avoid N re-renders per frame.
   */
  updateMany(e) {
    let o = !1, n = !1;
    for (const { id: r, patch: s } of e) {
      const i = this.nodes.get(r);
      if (!i) continue;
      const a = { ...i, ...s };
      s.data && typeof s.data == "object" && i.data && typeof i.data == "object" && (a.data = {
        ...i.data,
        ...s.data
      }, n = !0), this.nodes.set(r, a), (i.x !== a.x || i.y !== a.y || i.w !== a.w || i.h !== a.h || (i.rotation ?? 0) !== (a.rotation ?? 0)) && (this.quadTree.remove(i), this.quadTree.insert(a), this.updateConnectedEdges(r)), o = !0;
    }
    o && n && this.refreshSearchIfNeeded(), o && this.emit("change");
  }
  updateConnectedEdges(e) {
    const o = this.adjacency.get(e);
    if (o)
      for (const n of o) {
        const r = this.nodes.get(n);
        if (!r || r.type !== "edge") continue;
        const s = r, i = this.nodes.get(s.data.fromId), a = this.nodes.get(s.data.toId);
        if (i && a) {
          const h = Pe(
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
          ), c = { ...s, ...h.bounds };
          this.nodes.set(n, c), this.quadTree.remove(s), this.quadTree.insert(c);
        }
      }
  }
  updateNodeWithHistory(e, o) {
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent), this.updateNode(e, o), this.emit("history");
  }
  /**
   * Like `updateNodeWithHistory`, but multiple calls with the same `sessionKey` share one undo step
   * (e.g. dragging an inspector slider). Call `endHistoryCoalesce()` when the gesture ends.
   */
  updateNodeWithHistoryCoalesced(e, o, n) {
    if (this._collabMode) {
      this.updateNode(e, o);
      return;
    }
    this._historyCoalesceKey !== n && (this.history.pushSnapshot(this.nodes, this.groupParent), this._historyCoalesceKey = n, this.emit("history")), this.updateNode(e, o);
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
    var n, r, s, i, a;
    if (!this.nodes.has(e) || (n = this.nodes.get(e)) != null && n.locked) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = this.nodes.get(e);
    o && ((i = (s = (r = this.registry) == null ? void 0 : r.get(o.type)) == null ? void 0 : s.onDelete) == null || i.call(s, o, this), this.emit("node:delete", o), this.quadTree.remove(o)), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
    for (const h of this.frameChildren.values()) h.delete(e);
    for (const [h, c] of this.nodes)
      if (c.type === "edge") {
        const l = c.data;
        if (l.fromId === e || l.toId === e) {
          const p = this.nodes.get(h);
          p && this.quadTree.remove(p), this.nodes.delete(h), this.selection.delete(h);
          const d = l.fromId === e ? l.toId : l.fromId;
          (a = this.adjacency.get(d)) == null || a.delete(h);
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
          const a = this.nodes.get(i);
          a && this._containerTypes.has(a.type) && n(i);
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
        for (const a of s)
          i.add(a.id), o.add(a.id);
        this.frameChildren.set(n.id, i);
      }
    }
  }
  /** After nodes are moved, update which frames they belong to.
   *  Each node is assigned only to its smallest containing frame.
   *  Frames can be nested inside other frames (but not inside themselves or their descendants). */
  updateFrameMembership(e) {
    for (const o of e) {
      const n = this.nodes.get(o);
      if (!n || n.type === "edge") continue;
      const r = this.resolveHeight(n);
      for (const [c, l] of this.frameChildren) {
        if (!l.has(o)) continue;
        const p = this.nodes.get(c);
        if (!p) {
          l.delete(o);
          continue;
        }
        const d = this.resolveHeight(p);
        n.x >= p.x && n.y >= p.y && n.x + n.w <= p.x + p.w && n.y + r <= p.y + d || l.delete(o);
      }
      let s;
      this._containerTypes.has(n.type) && (s = this.getFrameDescendantIds(o));
      let i = null, a = 1 / 0;
      const h = this.quadTree.retrieve([], { x: n.x, y: n.y, w: n.w, h: r });
      for (const c of h) {
        if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
        const l = this.resolveHeight(c);
        if (n.x >= c.x && n.y >= c.y && n.x + n.w <= c.x + c.w && n.y + r <= c.y + l) {
          const d = c.w * l;
          d < a && (a = d, i = c);
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
        for (const l of this.nodes.values())
          l.id !== o && (r ? l.type === "edge" : l.type !== "edge") && l.z >= n.z && this._nodesOverlap(n, l) && s.push(l);
        if (s.length === 0) continue;
        s.sort((l, p) => l.z - p.z);
        const i = s[0], a = this.nodes.get(i.id), h = n.z, c = a.z;
        h === c ? this.nodes.set(o, { ...n, z: c + 1 }) : (this.nodes.set(o, { ...n, z: c }), this.nodes.set(i.id, { ...a, z: h }));
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
        for (const l of this.nodes.values())
          l.id !== o && (r ? l.type === "edge" : l.type !== "edge") && l.z <= n.z && this._nodesOverlap(n, l) && s.push(l);
        if (s.length === 0) continue;
        s.sort((l, p) => p.z - l.z);
        const i = s[0], a = this.nodes.get(i.id), h = n.z, c = a.z;
        h === c ? this.nodes.set(o, { ...n, z: c - 1 }) : (this.nodes.set(o, { ...n, z: c }), this.nodes.set(i.id, { ...a, z: h }));
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
    const r = ke.isEnabled(), s = r ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), h = /* @__PURE__ */ new Map();
    for (const l of a) h.set(l.id, l);
    const c = td(h, e, o, this.viewport.zoom, n, this._containerTypes);
    return r && ke.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, n) {
    const r = ke.isEnabled(), s = r ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), h = /* @__PURE__ */ new Map();
    for (const l of a) h.set(l.id, l);
    const c = od(h, e, o, this.viewport.zoom, n, this._containerTypes);
    return r && ke.recordHitTest(performance.now() - s), c;
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
        const a = this.groupParent.get(i);
        if (!a || this.activeGroupId && a === this.activeGroupId) break;
        i = a;
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
    var o, n, r, s, i, a;
    for (const h of this.selection) {
      const c = this.nodes.get(h);
      c && ((r = (n = (o = this.registry) == null ? void 0 : o.get(c.type)) == null ? void 0 : n.onDeselect) == null || r.call(n, c, this), this.emit("node:deselect", c));
    }
    this.selection.clear(), this.selection.add(e), this.expandSelectionToGroups();
    for (const h of this.selection) {
      const c = this.nodes.get(h);
      c && ((a = (i = (s = this.registry) == null ? void 0 : s.get(c.type)) == null ? void 0 : i.onSelect) == null || a.call(i, c, this), this.emit("node:select", c));
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
    if (this.selection.size === 0) return;
    const e = new Set(
      Array.from(this.selection).filter((i) => {
        var a;
        return !((a = this.nodes.get(i)) != null && a.locked);
      })
    );
    if (e.size === 0) return;
    this.activeGroupId && this.getGroupMembers(this.activeGroupId).filter((a) => !e.has(a.id)).length === 0 && (this.activeGroupId = null, this.emit("group:exit")), this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = e;
    for (const i of e) {
      const a = this.nodes.get(i);
      a && ((s = (r = (n = this.registry) == null ? void 0 : n.get(a.type)) == null ? void 0 : r.onDelete) == null || s.call(r, a, this), this.emit("node:delete", a), this.quadTree.remove(a), this.nodes.delete(i));
    }
    for (const [i, a] of this.nodes)
      if (a.type === "edge") {
        const h = a.data;
        if (o.has(h.fromId) || o.has(h.toId)) {
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
    if (e.length === 0) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = new Set(e);
    for (const i of e) {
      const a = this.nodes.get(i);
      if (a) {
        (s = (r = (n = this.registry) == null ? void 0 : n.get(a.type)) == null ? void 0 : r.onDelete) == null || s.call(r, a, this), this.emit("node:delete", a), this.quadTree.remove(a), this.nodes.delete(i), this.frameChildren.delete(i);
        for (const h of this.frameChildren.values()) h.delete(i);
      }
    }
    for (const [i, a] of this.nodes)
      if (a.type === "edge") {
        const h = a.data;
        if (o.has(h.fromId) || o.has(h.toId)) {
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
          const a = i.onFlip(r, e, this);
          a && Object.keys(a).length > 0 && (s = {
            ...r,
            data: { ...r.data, ...a }
          });
        } else if (r.type === "draw") {
          const a = r;
          if (e === "h") {
            const h = a.data.points.map(
              ([c, l, p]) => [a.w - c, l, p]
            );
            s = { ...a, data: { ...a.data, points: h } };
          } else {
            const h = a.h === "auto" ? 0 : a.h, c = a.data.points.map(
              ([l, p, d]) => [l, h - p, d]
            );
            s = { ...a, data: { ...a.data, points: c } };
          }
        } else if (r.type === "shape") {
          const a = r;
          if (a.data.shape === "arrow" || a.data.shape === "line")
            if (a.data.startPoint && a.data.endPoint)
              if (e === "h") {
                const h = [a.w - a.data.startPoint[0], a.data.startPoint[1]], c = [a.w - a.data.endPoint[0], a.data.endPoint[1]];
                s = { ...a, data: { ...a.data, startPoint: h, endPoint: c } };
              } else {
                const h = a.h === "auto" ? 0 : a.h, c = [a.data.startPoint[0], h - a.data.startPoint[1]], l = [a.data.endPoint[0], h - a.data.endPoint[1]];
                s = { ...a, data: { ...a.data, startPoint: c, endPoint: l } };
              }
            else
              s = e === "h" ? { ...a, rotation: -(a.rotation || 0) + 180 } : { ...a, rotation: -(a.rotation || 0) };
        } else if (r.type === "image") {
          const a = r;
          s = e === "h" ? { ...a, data: { ...a.data, flipH: !a.data.flipH } } : { ...a, data: { ...a.data, flipV: !a.data.flipV } };
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
    const n = qd(
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
    for (const d of this.selection) {
      const f = this.nodes.get(d);
      !f || f.type === "edge" || f.locked || n.push(f);
    }
    if (n.length < 2) return;
    const r = (d) => d.h === "auto" ? (o == null ? void 0 : o[d.id]) ?? 100 : d.h;
    let s = 1 / 0, i = 1 / 0, a = -1 / 0, h = -1 / 0;
    for (const d of n) {
      const f = r(d);
      s = Math.min(s, d.x), i = Math.min(i, d.y), a = Math.max(a, d.x + d.w), h = Math.max(h, d.y + f);
    }
    const c = (s + a) / 2, l = (i + h) / 2, p = [];
    for (const d of n) {
      const f = r(d);
      let g = d.x, m = d.y;
      switch (e) {
        case "left":
          g = s;
          break;
        case "right":
          g = a - d.w;
          break;
        case "centerH":
          g = c - d.w / 2;
          break;
        case "top":
          m = i;
          break;
        case "bottom":
          m = h - f;
          break;
        case "centerV":
          m = l - f / 2;
          break;
      }
      (g !== d.x || m !== d.y) && p.push({ id: d.id, patch: { x: g, y: m } });
    }
    p.length !== 0 && this.batchUpdateWithHistory(p);
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
      const a = this.nodes.get(i);
      !a || a.type === "edge" || a.locked || n.push(a);
    }
    if (n.length < 2) return;
    const r = (i) => i.h === "auto" ? (o == null ? void 0 : o[i.id]) ?? 100 : i.h, s = [];
    if (e === "horizontal") {
      const i = [...n].sort((m, y) => m.x - y.x || m.id.localeCompare(y.id));
      let a = 1 / 0, h = -1 / 0, c = 0;
      for (const m of i)
        a = Math.min(a, m.x), h = Math.max(h, m.x + m.w), c += m.w;
      const l = h - a, p = l - c, d = p >= 0 ? p / (i.length - 1) : 0;
      let g = p >= 0 ? a : a + (l - c) / 2;
      for (const m of i) {
        const y = g;
        g += m.w + d, y !== m.x && s.push({ id: m.id, patch: { x: y } });
      }
    } else {
      const i = [...n].sort(
        (m, y) => m.y - y.y || m.id.localeCompare(y.id)
      );
      let a = 1 / 0, h = -1 / 0, c = 0;
      for (const m of i) {
        const y = r(m);
        a = Math.min(a, m.y), h = Math.max(h, m.y + y), c += y;
      }
      const l = h - a, p = l - c, d = p >= 0 ? p / (i.length - 1) : 0;
      let g = p >= 0 ? a : a + (l - c) / 2;
      for (const m of i) {
        const y = r(m), x = g;
        g += y + d, x !== m.y && s.push({ id: m.id, patch: { y: x } });
      }
    }
    s.length !== 0 && this.batchUpdateWithHistory(s);
  }
  // --- Grouping ---
  groupSelected() {
    if (this.selection.size < 2 || this.activeGroupId) return;
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
    if (this.selection.size === 0) return;
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
              const { groupId: i, ...a } = s;
              this.nodes.set(s.id, a);
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
        for (const a of i)
          o.has(a) || (o.add(a), n(a));
    };
    n(e);
    const r = [];
    for (const s of this.nodes.values())
      s.groupId && o.has(s.groupId) && r.push(s);
    return r;
  }
  duplicateSelected() {
    if (this.selection.size === 0) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = 20, o = /* @__PURE__ */ new Map(), n = [];
    for (const s of this.selection) {
      const i = this.nodes.get(s);
      if (!i) continue;
      const a = Rt();
      o.set(i.id, a), n.push({
        ...JSON.parse(JSON.stringify(i)),
        id: a,
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
    if (this.clipboard.length === 0) return;
    this.pasteCount++;
    let n = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
    for (const x of this.clipboard) {
      const b = x.h === "auto" ? 100 : x.h;
      x.x < n && (n = x.x), x.y < r && (r = x.y), x.x + x.w > s && (s = x.x + x.w), x.y + b > i && (i = x.y + b);
    }
    const a = (n + s) / 2, h = (r + i) / 2;
    let c, l;
    if (e !== void 0 && o !== void 0)
      c = e, l = o;
    else {
      const x = this.getWindow(), b = x.innerWidth / 2, w = x.innerHeight / 2, v = pn(this.viewport, b, w);
      c = v.x, l = v.y;
    }
    const p = this.pasteCount * 20, d = c - a + p, f = l - h + p, g = /* @__PURE__ */ new Map(), m = this.clipboard.map((x) => {
      const b = Rt();
      return g.set(x.id, b), {
        ...structuredClone(x),
        id: b,
        x: x.x + d,
        y: x.y + f,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const x of m)
      if (x.type === "edge" && x.data) {
        const b = x.data;
        g.has(b.fromId) && (b.fromId = g.get(b.fromId)), g.has(b.toId) && (b.toId = g.get(b.toId));
      }
    const y = /* @__PURE__ */ new Map();
    for (const x of m)
      x.groupId && (y.has(x.groupId) || y.set(x.groupId, Rt(10)), x.groupId = y.get(x.groupId));
    for (const [x, b] of this.groupParent)
      y.has(x) && y.has(b) && this.linkGroupParent(y.get(x), y.get(b));
    this.addNodes(m), this.selectMultiple(m.map((x) => x.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, n) {
    const r = Ra.find((f) => f.id === e);
    if (!r) return;
    const s = structuredClone(r.nodes), i = /* @__PURE__ */ new Map();
    for (const f of s) {
      const g = Rt(10);
      i.set(f.id, g), f.id = g;
    }
    for (const f of s) {
      if (f.type === "edge" && f.data) {
        const g = f.data;
        i.has(g.fromId) && (g.fromId = i.get(g.fromId)), i.has(g.toId) && (g.toId = i.get(g.toId));
      }
      f.groupId && i.has(f.groupId) && (f.groupId = i.get(f.groupId));
    }
    let a = 1 / 0, h = 1 / 0, c = -1 / 0, l = -1 / 0;
    for (const f of s) {
      if (f.type === "edge") continue;
      const g = f.h === "auto" ? 100 : f.h;
      a = Math.min(a, f.x), h = Math.min(h, f.y), c = Math.max(c, f.x + f.w), l = Math.max(l, f.y + g);
    }
    const p = o - (a + c) / 2, d = n - (h + l) / 2;
    for (const f of s)
      f.type !== "edge" && (f.x += p, f.y += d), f.z = this.nextZValue++;
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
    const e = this.history.undo(this.nodes, this.groupParent);
    e && (this._historyCoalesceKey = null, this.nodes = e.nodes, this.groupParent = e.groupParent, this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), this.selection.clear(), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("selection"), this.emit("history"));
  }
  redo() {
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
            const a = this.nodes.get(r);
            a && this.quadTree.remove(a), this.nodes.delete(r), this.selection.delete(r);
            const h = i.fromId === e ? i.toId : i.fromId;
            (n = this.adjacency.get(h)) == null || n.delete(r);
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
    return ld(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: n } = await fd(e);
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
const Qd = /* @__PURE__ */ new Set([
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
function Jd(t) {
  var o, n;
  const e = ((o = t.docs) == null ? void 0 : o.id) ?? t.type;
  return {
    type: t.type,
    origin: Qd.has(t.type) ? "builtin" : "custom",
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
class $d {
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
    return this.getAll().map((e) => Jd(e)).sort((e, o) => e.type.localeCompare(o.type));
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
const Li = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], _d = {
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
  const o = Li.indexOf(t);
  if (o === -1) return "default";
  const n = (e % 360 + 360) % 360, r = Math.round(n / 45) % 8, s = (o + r) % 8;
  return _d[Li[s]];
}
function Ms(t, e, o, n, r, s, i, a, h) {
  if (!(t === "nw" || t === "ne" || t === "sw" || t === "se") || n <= 0 || r <= 0 || a <= 0 || h <= 0)
    return { x: s, y: i, w: a, h };
  const l = n / r;
  let p = a, d = h;
  p / d > l ? p = d * l : d = p / l;
  let f = s, g = i;
  return t === "se" ? (f = e, g = o) : t === "ne" ? (f = e, g = o + r - d) : t === "sw" ? (f = e + n - p, g = o) : (f = e + n - p, g = o + r - d), { x: f, y: g, w: p, h: d };
}
class th extends Tc {
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
function Ri({ markdown: t }) {
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
const eh = 0, oh = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function nh(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function rh({
  node: t,
  isSelected: e,
  multiSelected: o,
  engine: n,
  schema: r,
  interactive: s,
  zoom: i,
  onMeasuredHeight: a,
  autoEdit: h
}) {
  const c = pt(null), l = pt(h === !0), p = pt(!1), d = pt(!1), f = pt(!1), g = pt(!1), m = pt(t.data.blocks), [y, x] = et(!1), [b, w] = et(!1), v = pt(null), M = Ec({ schema: r }), C = pt(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  Mt(() => {
    const O = C.current;
    if (!O) return;
    C.current = null;
    const _ = requestAnimationFrame(() => {
      try {
        M.replaceBlocks(M.document, O);
        return;
      } catch {
      }
      try {
        const W = M.blocksToHTMLLossy(O);
        M._tiptapEditor.commands.setContent(W);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), w(!0);
    });
    return () => cancelAnimationFrame(_);
  }, [M]), Mt(() => {
    (!e || o) && x(!1);
  }, [e, o]), Mt(() => {
    l.current && (l.current = !1, p.current = !0, x(!0));
  }, [M]), Mt(() => {
    if (!y || !p.current && !v.current) return;
    const O = v.current;
    v.current = null, p.current = !1;
    const _ = requestAnimationFrame(() => {
      if (M.focus(), O)
        try {
          const W = M._tiptapEditor, tt = W.view.posAtCoords({ left: O.x, top: O.y });
          tt && W.commands.setTextSelection(tt.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(_);
  }, [y, M]);
  const z = lt(() => {
    if (d.current || f.current) return;
    const O = n.getNode(t.id), _ = M.document;
    m.current = _, n.updateNode(t.id, {
      data: { ...O == null ? void 0 : O.data, blocks: _ }
    });
  }, [M, n, t.id]);
  Mt(() => {
    if (!M) return;
    const O = () => {
      var $, ot;
      if (d.current || f.current || g.current) return;
      const Z = M.document.length, tt = n.getNode(t.id), K = ((ot = ($ = tt == null ? void 0 : tt.data) == null ? void 0 : $.blocks) == null ? void 0 : ot.length) ?? 0;
      if (Z < K) return;
      const H = setTimeout(z, 100);
      return () => clearTimeout(H);
    };
    let _;
    const W = M.onChange(() => {
      _ == null || _(), _ = O();
    });
    return () => {
      W == null || W(), _ == null || _();
    };
  }, [M, z]), Mt(() => {
    const O = c.current;
    if (!O) return;
    const _ = (W) => {
      const Z = W.relatedTarget;
      Z && O.contains(Z) || z();
    };
    return O.addEventListener("focusout", _), () => O.removeEventListener("focusout", _);
  }, [z]), Mt(() => {
    if (y || t.data.blocks === m.current) return;
    const O = JSON.stringify(t.data.blocks), _ = JSON.stringify(m.current);
    if (O !== _) {
      if (t.data.blocks.length > 0 && M.document.length > 0) {
        g.current = !0;
        try {
          M.replaceBlocks(M.document, t.data.blocks);
        } catch {
          try {
            const W = M.blocksToHTMLLossy(t.data.blocks);
            M._tiptapEditor.commands.setContent(W);
          } catch {
          }
        }
        g.current = !1;
      }
      m.current = t.data.blocks;
    }
  }, [t.data.blocks, y, M]), Mt(() => {
    if (t.h !== "auto" || !a) return;
    const O = c.current;
    if (!O) return;
    const _ = () => {
      const Z = O.offsetHeight;
      Z > 0 && a(t.id, Z);
    };
    _();
    const W = new ResizeObserver(_);
    return W.observe(O), () => W.disconnect();
  }, [t.id, t.h, a]);
  const A = lt(() => {
    const O = n.getNode(t.id);
    if (!O || O.h === "auto" || !M || !c.current)
      return;
    const _ = O.h - eh, W = c.current.querySelector(".bn-editor");
    if (!W) return;
    const Z = M.document;
    if (Z.length === 0) return;
    let tt = 0;
    for (let ot = Z.length - 1; ot >= 1 && nh(Z[ot]); ot--)
      tt++;
    const K = W.scrollHeight, H = Z.length > 0 ? K / Z.length : 36;
    if (d.current = !0, K < _) {
      const ot = _ - K, it = Math.max(0, Math.floor(ot / H));
      if (it > 0) {
        const Q = Z[Z.length - 1];
        M.insertBlocks(
          Array.from({ length: it }, () => ({
            type: "paragraph",
            content: []
          })),
          Q,
          "after"
        );
      }
    } else if (K > _ && tt > 0) {
      const ot = K - _, it = Math.min(tt, Math.ceil(ot / H));
      if (it > 0) {
        const Q = Z.slice(Z.length - it);
        M.removeBlocks(Q);
      }
    }
    const $ = n.getNode(t.id);
    $ && n.updateNode(t.id, {
      data: { ...$.data, blocks: M.document }
    }), d.current = !1;
  }, [M, n, t.id]), P = pt(A);
  P.current = A, Mt(() => {
    if (t.h === "auto") return;
    const O = setTimeout(() => P.current(), 60);
    return () => clearTimeout(O);
  }, []);
  const Y = lt(
    (O) => {
      const _ = O.currentTarget.ownerDocument;
      if (O.altKey) return;
      if (!n.selection.has(t.id) && n.selection.size > 0) {
        const { x: dt, y: wt } = n.screenToCanvas(O.clientX, O.clientY);
        for (const gt of n.selection) {
          const mt = n.getNode(gt);
          if (!mt) continue;
          const At = mt.h === "auto" ? 100 : mt.h;
          if (dt >= mt.x && dt <= mt.x + mt.w && wt >= mt.y && wt <= mt.y + At)
            return;
        }
      }
      O.stopPropagation(), O.preventDefault(), O.currentTarget.setPointerCapture(O.pointerId), O.shiftKey ? n.toggleSelect(t.id) : n.selection.has(t.id) || n.select(t.id);
      const W = O.clientX, Z = O.clientY, tt = Array.from(n.selection), K = tt.map((dt) => {
        const wt = n.getNode(dt);
        return { id: dt, x: wt.x, y: wt.y };
      });
      let H = !1, $ = null, ot = W, it = Z, Q = !1;
      const ct = () => {
        $ = null;
        const dt = (ot - W) / n.viewport.zoom, wt = (it - Z) / n.viewport.zoom, { finalDx: gt, finalDy: mt } = n.computeDragSnap(
          K,
          tt,
          dt,
          wt,
          Q
        ), At = K.map((Nt) => ({
          id: Nt.id,
          patch: { x: Nt.x + gt, y: Nt.y + mt }
        }));
        n.updateMany(At);
      }, yt = (dt) => {
        const wt = (dt.clientX - W) / n.viewport.zoom, gt = (dt.clientY - Z) / n.viewport.zoom;
        if (!H)
          if (Math.abs(wt) > 2 || Math.abs(gt) > 2)
            H = !0, f.current = !0, n.pushHistorySnapshot();
          else
            return;
        ot = dt.clientX, it = dt.clientY, Q = dt.metaKey || dt.ctrlKey, $ === null && ($ = requestAnimationFrame(ct));
      }, J = () => {
        f.current = !1, $ !== null && (cancelAnimationFrame($), ct()), n.clearAlignGuides(), _.removeEventListener("pointermove", yt), _.removeEventListener("pointerup", J);
      };
      _.addEventListener("pointermove", yt), _.addEventListener("pointerup", J);
    },
    [n, t.id]
  ), G = lt(
    (O) => {
      var yt;
      const _ = O.currentTarget.ownerDocument;
      O.stopPropagation(), O.preventDefault();
      const W = t.h === "auto" ? (((yt = c.current) == null ? void 0 : yt.getBoundingClientRect().height) ?? 60) / n.viewport.zoom : t.h, Z = t.x + t.w / 2, tt = t.y + W / 2, K = t.rotation || 0, { x: H, y: $ } = n.screenToCanvas(
        O.clientX,
        O.clientY
      ), ot = Math.atan2($ - tt, H - Z);
      let it = !1;
      const Q = (J) => {
        it || (it = !0, n.pushHistorySnapshot());
        const { x: dt, y: wt } = n.screenToCanvas(J.clientX, J.clientY), gt = Math.atan2(wt - tt, dt - Z);
        let mt = K + (gt - ot) * (180 / Math.PI);
        (J.shiftKey || n.snapToGrid) && !(J.metaKey || J.ctrlKey) && (mt = Math.round(mt / 15) * 15), n.updateNode(t.id, { rotation: mt });
      }, ct = () => {
        _.removeEventListener("pointermove", Q), _.removeEventListener("pointerup", ct);
      };
      _.addEventListener("pointermove", Q), _.addEventListener("pointerup", ct);
    },
    [n, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), rt = lt(
    (O, _) => {
      var yt;
      const W = _.currentTarget.ownerDocument;
      _.stopPropagation(), _.preventDefault();
      const Z = _.clientX, tt = _.clientY, K = t.x, H = t.y, $ = t.w, ot = t.h === "auto" ? (((yt = c.current) == null ? void 0 : yt.getBoundingClientRect().height) ?? 60) / n.viewport.zoom : t.h;
      let it = !1;
      const Q = (J) => {
        const dt = (J.clientX - Z) / n.viewport.zoom, wt = (J.clientY - tt) / n.viewport.zoom;
        it || (it = !0, n.pushHistorySnapshot());
        let gt = K, mt = H, At = $, Nt = ot;
        if ((O === "nw" || O === "w" || O === "sw") && (gt = K + dt, At = $ - dt), (O === "ne" || O === "e" || O === "se") && (At = $ + dt), (O === "nw" || O === "n" || O === "ne") && (mt = H + wt, Nt = ot - wt), (O === "sw" || O === "s" || O === "se") && (Nt = ot + wt), n.snapToGrid && !(J.metaKey || J.ctrlKey)) {
          const Lt = n.gridSize, ft = (Xt) => Math.round(Xt / Lt) * Lt;
          (O === "nw" || O === "w" || O === "sw") && (gt = ft(gt), At = K + $ - gt), (O === "ne" || O === "e" || O === "se") && (At = ft(gt + At) - gt), (O === "nw" || O === "n" || O === "ne") && (mt = ft(mt), Nt = H + ot - mt), (O === "sw" || O === "s" || O === "se") && (Nt = ft(mt + Nt) - mt);
        }
        if (At < 100 && (At = 100, (O === "nw" || O === "w" || O === "sw") && (gt = K + $ - 100)), Nt < 60 && (Nt = 60, (O === "nw" || O === "n" || O === "ne") && (mt = H + ot - 60)), J.shiftKey) {
          const Lt = Ms(
            O,
            K,
            H,
            $,
            ot,
            gt,
            mt,
            At,
            Nt
          );
          gt = Lt.x, mt = Lt.y, At = Lt.w, Nt = Lt.h;
        }
        n.updateNode(t.id, { x: gt, y: mt, w: At, h: Nt });
      }, ct = () => {
        W.removeEventListener("pointermove", Q), W.removeEventListener("pointerup", ct), requestAnimationFrame(() => P.current());
      };
      W.addEventListener("pointermove", Q), W.addEventListener("pointerup", ct);
    },
    [n, t.id, t.x, t.y, t.w, t.h]
  ), st = lt(
    (O) => {
      if (!O.altKey) {
        if (y) {
          O.stopPropagation();
          return;
        }
        if (e) {
          Y(O);
          return;
        }
        Y(O);
      }
    },
    [y, e, Y, n, t.id]
  ), at = lt(
    (O) => {
      if (O.stopPropagation(), !y) {
        if (t.groupId) {
          const _ = [];
          let W = t.groupId;
          for (; W; )
            _.push(W), W = n.groupParent.get(W);
          if (!n.activeGroupId) {
            n.enterGroup(_[_.length - 1]), n.select(t.id);
            return;
          }
          const Z = _.indexOf(n.activeGroupId);
          if (Z > 0) {
            n.enterGroup(_[Z - 1]), n.select(t.id);
            return;
          }
        }
        n.select(t.id), v.current = { x: O.clientX, y: O.clientY }, x(!0);
      }
    },
    [y, n, t.id, t.groupId, M]
  ), xt = e && !o;
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
        /* @__PURE__ */ u(
          "div",
          {
            onDoubleClick: at,
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
                onPointerDown: st,
                onKeyDown: y ? (O) => {
                  O.key === "Escape" && (O.stopPropagation(), x(!1));
                } : void 0,
                style: y ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: b ? /* @__PURE__ */ u(Ri, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ u(th, { fallback: /* @__PURE__ */ u(Ri, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ u(
                  Lc,
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
        xt && oh.map(({ pos: O, top: _, left: W }) => {
          const Z = 8 / i;
          return /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: (tt) => rt(O, tt),
              style: {
                position: "absolute",
                top: _,
                left: W,
                width: Z,
                height: Z,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: Mr(O, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            O
          );
        }),
        xt && (() => {
          const O = 25 / i, _ = 10 / i;
          return /* @__PURE__ */ S(St, { children: [
            /* @__PURE__ */ u(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -O,
                  left: "50%",
                  width: 1.5 / i,
                  height: O,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ u(
              "div",
              {
                onPointerDown: G,
                style: {
                  position: "absolute",
                  top: -(O + _ / 2),
                  left: "50%",
                  width: _,
                  height: _,
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
const Ua = Le(rh);
function sh(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    Ua,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: Os,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const ih = {
  type: "content",
  component: sh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: ah } = Math, Dn = ah + 1e-4, Di = 0.5, Wi = [1, 1];
function Bi(t, e, o, n = (r) => r) {
  return t * n(0.5 - e * (0.5 - o));
}
const { min: qr } = Math;
function Za(t, e, o) {
  let n = qr(1, e / o);
  return qr(1, t + (qr(1, 1 - n) - t) * (n * 0.275));
}
function lh(t) {
  return [-t[0], -t[1]];
}
function Ue(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function Ni(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function bo(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function Cs(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function mo(t, e) {
  return [t[0] * e, t[1] * e];
}
function Ur(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function ch(t, e) {
  return [t[0] / e, t[1] / e];
}
function Qa(t) {
  return [t[1], -t[0]];
}
function Zr(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function Fi(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function dh(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function hh(t) {
  return Math.hypot(t[0], t[1]);
}
function Hi(t, e) {
  let o = t[0] - e[0], n = t[1] - e[1];
  return o * o + n * n;
}
function Ja(t) {
  return ch(t, hh(t));
}
function uh(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function Ks(t, e, o) {
  let n = Math.sin(o), r = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], a = s * r - i * n, h = s * n + i * r;
  return [a + e[0], h + e[1]];
}
function Oi(t, e, o, n) {
  let r = Math.sin(n), s = Math.cos(n), i = e[0] - o[0], a = e[1] - o[1], h = i * s - a * r, c = i * r + a * s;
  return t[0] = h + o[0], t[1] = c + o[1], t;
}
function Xi(t, e, o) {
  return Ue(t, mo(bo(e, t), o));
}
function ph(t, e, o, n) {
  let r = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + r * n, t[1] = e[1] + s * n, t;
}
function $a(t, e, o) {
  return Ue(t, mo(e, o));
}
const we = [0, 0], co = [0, 0], ho = [0, 0];
function fh(t, e) {
  let o = $a(t, Ja(Qa(bo(t, Ue(t, [1, 1])))), -e), n = [], r = 1 / 13;
  for (let s = r; s <= 1; s += r) n.push(Ks(o, t, Dn * 2 * s));
  return n;
}
function yh(t, e, o) {
  let n = [], r = 1 / o;
  for (let s = r; s <= 1; s += r) n.push(Ks(e, t, Dn * s));
  return n;
}
function gh(t, e, o) {
  let n = bo(e, o), r = mo(n, 0.5), s = mo(n, 0.51);
  return [bo(t, r), bo(t, s), Ue(t, s), Ue(t, r)];
}
function mh(t, e, o, n) {
  let r = [], s = $a(t, e, o), i = 1 / n;
  for (let a = i; a < 1; a += i) r.push(Ks(s, t, Dn * 3 * a));
  return r;
}
function bh(t, e, o) {
  return [Ue(t, mo(e, o)), Ue(t, mo(e, o * 0.99)), bo(t, mo(e, o * 0.99)), bo(t, mo(e, o))];
}
function Yi(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function xh(t, e, o) {
  return t.slice(0, 10).reduce((n, r) => {
    let s = r.pressure;
    return e && (s = Za(n, r.distance, o)), (n + s) / 2;
  }, t[0].pressure);
}
function wh(t, e = {}) {
  let { size: o = 16, smoothing: n = 0.5, thinning: r = 0.5, simulatePressure: s = !0, easing: i = (_) => _, start: a = {}, end: h = {}, last: c = !1 } = e, { cap: l = !0, easing: p = (_) => _ * (2 - _) } = a, { cap: d = !0, easing: f = (_) => --_ * _ * _ + 1 } = h;
  if (t.length === 0 || o <= 0) return [];
  let g = t[t.length - 1].runningLength, m = Yi(a.taper, o, g), y = Yi(h.taper, o, g), x = (o * n) ** 2, b = [], w = [], v = xh(t, s, o), M = Bi(o, r, t[t.length - 1].pressure, i), C, z = t[0].vector, A = t[0].point, P = A, Y = A, G = P, rt = !1;
  for (let _ = 0; _ < t.length; _++) {
    let { pressure: W } = t[_], { point: Z, vector: tt, distance: K, runningLength: H } = t[_], $ = _ === t.length - 1;
    if (!$ && g - H < 3) continue;
    r ? (s && (W = Za(v, K, o)), M = Bi(o, r, W, i)) : M = o / 2, C === void 0 && (C = M);
    let ot = H < m ? p(H / m) : 1, it = g - H < y ? f((g - H) / y) : 1;
    M = Math.max(0.01, M * Math.min(ot, it));
    let Q = ($ ? t[_] : t[_ + 1]).vector, ct = $ ? 1 : Fi(tt, Q), yt = Fi(tt, z) < 0 && !rt, J = ct !== null && ct < 0;
    if (yt || J) {
      Zr(we, z), Ur(we, we, M);
      for (let dt = 0; dt <= 1; dt += 0.07692307692307693) Cs(co, Z, we), Oi(co, co, Z, Dn * dt), Y = [co[0], co[1]], b.push(Y), Ni(ho, Z, we), Oi(ho, ho, Z, Dn * -dt), G = [ho[0], ho[1]], w.push(G);
      A = Y, P = G, J && (rt = !0);
      continue;
    }
    if (rt = !1, $) {
      Zr(we, tt), Ur(we, we, M), b.push(bo(Z, we)), w.push(Ue(Z, we));
      continue;
    }
    ph(we, Q, tt, ct), Zr(we, we), Ur(we, we, M), Cs(co, Z, we), Y = [co[0], co[1]], (_ <= 1 || Hi(A, Y) > x) && (b.push(Y), A = Y), Ni(ho, Z, we), G = [ho[0], ho[1]], (_ <= 1 || Hi(P, G) > x) && (w.push(G), P = G), v = W, z = tt;
  }
  let st = [t[0].point[0], t[0].point[1]], at = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : Ue(t[0].point, [1, 1]), xt = [], O = [];
  if (t.length === 1) {
    if (!(m || y) || c) return fh(st, C || M);
  } else {
    m || y && t.length === 1 || (l ? xt.push(...yh(st, w[0], 13)) : xt.push(...gh(st, b[0], w[0])));
    let _ = Qa(lh(t[t.length - 1].vector));
    y || m && t.length === 1 ? O.push(at) : d ? O.push(...mh(at, _, M, 29)) : O.push(...bh(at, _, M));
  }
  return b.concat(O, w.reverse(), xt);
}
const Gi = [0, 0];
function ji(t) {
  return t != null && t >= 0;
}
function kh(t, e = {}) {
  var d;
  let { streamline: o = 0.5, size: n = 16, last: r = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: f, y: g, pressure: m = Di }) => [f, g, m]);
  if (i.length === 2) {
    let f = i[1];
    i = i.slice(0, -1);
    for (let g = 1; g < 5; g++) i.push(Xi(i[0], f, g / 4));
  }
  i.length === 1 && (i = [...i, [...Ue(i[0], Wi), ...i[0].slice(2)]]);
  let a = [{ point: [i[0][0], i[0][1]], pressure: ji(i[0][2]) ? i[0][2] : 0.25, vector: [...Wi], distance: 0, runningLength: 0 }], h = !1, c = 0, l = a[0], p = i.length - 1;
  for (let f = 1; f < i.length; f++) {
    let g = r && f === p ? [i[f][0], i[f][1]] : Xi(l.point, i[f], s);
    if (dh(l.point, g)) continue;
    let m = uh(g, l.point);
    if (c += m, f < p && !h) {
      if (c < n) continue;
      h = !0;
    }
    Cs(Gi, l.point, g), l = { point: g, pressure: ji(i[f][2]) ? i[f][2] : Di, vector: Ja(Gi), distance: m, runningLength: c }, a.push(l);
  }
  return a[0].vector = ((d = a[1]) == null ? void 0 : d.vector) || [0, 0], a;
}
function vh(t, e = {}) {
  return wh(kh(t, e), e);
}
var Sh = vh;
function qs(t, e = {}) {
  const o = Sh(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return Mh(o);
}
function Mh(t) {
  if (!t.length) return "";
  const e = [], [o, n] = t[0];
  e.push("M", o, n);
  for (let r = 0; r < t.length; r++) {
    const [s, i] = t[r], [a, h] = t[(r + 1) % t.length];
    e.push("Q", s, i, (s + a) / 2, (i + h) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function _a(t, e = 0.5) {
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
function Ch(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = _a(t, e), n = o.length, r = [];
  r.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < n; s++) {
    const [i, a] = o[s], [h, c] = o[(s + 1) % n];
    r.push("Q", i, a, (i + h) / 2, (a + c) / 2);
  }
  return r.push("Z"), r.join(" ");
}
function Ih(t, e, o, n) {
  const r = e[0] - t[0], s = e[1] - t[1], i = n[0] - o[0], a = n[1] - o[1], h = r * a - s * i;
  if (Math.abs(h) < 1e-10) return null;
  const c = ((o[0] - t[0]) * a - (o[1] - t[1]) * i) / h, l = ((o[0] - t[0]) * s - (o[1] - t[1]) * r) / h;
  return c <= 0 || c >= 1 || l <= 0 || l >= 1 ? null : [t[0] + c * r, t[1] + c * s];
}
function zh(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function Vi(t) {
  let e = 0;
  for (let o = 0, n = t.length - 1; o < t.length; n = o++)
    e += (t[n][0] + t[o][0]) * (t[n][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function Th(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let a = i + 2; a < e - 1; a++) {
      const h = Ih(
        t[i],
        t[i + 1],
        t[a],
        t[a + 1]
      );
      if (!h) continue;
      const c = [h];
      for (let l = i + 1; l <= a; l++)
        c.push(t[l]);
      Vi(c) < 100 || o.push({
        pathD: zh(c),
        points: c.map((l) => [l[0], l[1]])
      });
    }
  if (o.length === 0) return [];
  const n = o.map((i) => Vi(i.points)), s = Math.max(...n) * 0.05;
  return o.filter((i, a) => n[a] >= s);
}
function Qr(t, e, o) {
  if (t && t.length) {
    const [n, r] = e, s = Math.PI / 180 * o, i = Math.cos(s), a = Math.sin(s);
    for (const h of t) {
      const [c, l] = h;
      h[0] = (c - n) * i - (l - r) * a + n, h[1] = (c - n) * a + (l - r) * i + r;
    }
  }
}
function Ph(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Ah(t, e, o, n = 1) {
  const r = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, a = [0, 0];
  if (r) for (const c of i) Qr(c, a, r);
  const h = function(c, l, p) {
    const d = [];
    for (const b of c) {
      const w = [...b];
      Ph(w[0], w[w.length - 1]) || w.push([w[0][0], w[0][1]]), w.length > 2 && d.push(w);
    }
    const f = [];
    l = Math.max(l, 0.1);
    const g = [];
    for (const b of d) for (let w = 0; w < b.length - 1; w++) {
      const v = b[w], M = b[w + 1];
      if (v[1] !== M[1]) {
        const C = Math.min(v[1], M[1]);
        g.push({ ymin: C, ymax: Math.max(v[1], M[1]), x: C === v[1] ? v[0] : M[0], islope: (M[0] - v[0]) / (M[1] - v[1]) });
      }
    }
    if (g.sort((b, w) => b.ymin < w.ymin ? -1 : b.ymin > w.ymin ? 1 : b.x < w.x ? -1 : b.x > w.x ? 1 : b.ymax === w.ymax ? 0 : (b.ymax - w.ymax) / Math.abs(b.ymax - w.ymax)), !g.length) return f;
    let m = [], y = g[0].ymin, x = 0;
    for (; m.length || g.length; ) {
      if (g.length) {
        let b = -1;
        for (let w = 0; w < g.length && !(g[w].ymin > y); w++) b = w;
        g.splice(0, b + 1).forEach((w) => {
          m.push({ s: y, edge: w });
        });
      }
      if (m = m.filter((b) => !(b.edge.ymax <= y)), m.sort((b, w) => b.edge.x === w.edge.x ? 0 : (b.edge.x - w.edge.x) / Math.abs(b.edge.x - w.edge.x)), (p !== 1 || x % l == 0) && m.length > 1) for (let b = 0; b < m.length; b += 2) {
        const w = b + 1;
        if (w >= m.length) break;
        const v = m[b].edge, M = m[w].edge;
        f.push([[Math.round(v.x), y], [Math.round(M.x), y]]);
      }
      y += p, m.forEach((b) => {
        b.edge.x = b.edge.x + p * b.edge.islope;
      }), x++;
    }
    return f;
  }(i, s, n);
  if (r) {
    for (const c of i) Qr(c, a, -r);
    (function(c, l, p) {
      const d = [];
      c.forEach((f) => d.push(...f)), Qr(d, l, p);
    })(h, a, -r);
  }
  return h;
}
function Nn(t, e) {
  var o;
  const n = e.hachureAngle + 90;
  let r = e.hachureGap;
  r < 0 && (r = 4 * e.strokeWidth), r = Math.round(Math.max(r, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = r), Ah(t, r, n, s || 1);
}
class Us {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const n = Nn(e, o);
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
class Eh extends Us {
  fillPolygons(e, o) {
    let n = o.hachureGap;
    n < 0 && (n = 4 * o.strokeWidth), n = Math.max(n, 0.1);
    const r = Nn(e, Object.assign({}, o, { hachureGap: n })), s = Math.PI / 180 * o.hachureAngle, i = [], a = 0.5 * n * Math.cos(s), h = 0.5 * n * Math.sin(s);
    for (const [c, l] of r) Cr([c, l]) && i.push([[c[0] - a, c[1] + h], [...l]], [[c[0] + a, c[1] - h], [...l]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class Lh extends Us {
  fillPolygons(e, o) {
    const n = this._fillPolygons(e, o), r = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, r);
    return n.ops = n.ops.concat(s.ops), n;
  }
}
class Rh {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = Nn(e, o = Object.assign({}, o, { hachureAngle: 0 }));
    return this.dotsOnLines(n, o);
  }
  dotsOnLines(e, o) {
    const n = [];
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    let s = o.fillWeight;
    s < 0 && (s = o.strokeWidth / 2);
    const i = r / 4;
    for (const a of e) {
      const h = Cr(a), c = h / r, l = Math.ceil(c) - 1, p = h - l * r, d = (a[0][0] + a[1][0]) / 2 - r / 4, f = Math.min(a[0][1], a[1][1]);
      for (let g = 0; g < l; g++) {
        const m = f + p + g * r, y = d - i + 2 * Math.random() * i, x = m - i + 2 * Math.random() * i, b = this.helper.ellipse(y, x, s, s, o);
        n.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: n };
  }
}
class Dh {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = Nn(e, o);
    return { type: "fillSketch", ops: this.dashedLine(n, o) };
  }
  dashedLine(e, o) {
    const n = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, r = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const a = Cr(i), h = Math.floor(a / (n + r)), c = (a + r - h * (n + r)) / 2;
      let l = i[0], p = i[1];
      l[0] > p[0] && (l = i[1], p = i[0]);
      const d = Math.atan((p[1] - l[1]) / (p[0] - l[0]));
      for (let f = 0; f < h; f++) {
        const g = f * (n + r), m = g + n, y = [l[0] + g * Math.cos(d) + c * Math.cos(d), l[1] + g * Math.sin(d) + c * Math.sin(d)], x = [l[0] + m * Math.cos(d) + c * Math.cos(d), l[1] + m * Math.sin(d) + c * Math.sin(d)];
        s.push(...this.helper.doubleLineOps(y[0], y[1], x[0], x[1], o));
      }
    }), s;
  }
}
class Wh {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, r = o.zigzagOffset < 0 ? n : o.zigzagOffset, s = Nn(e, o = Object.assign({}, o, { hachureGap: n + r }));
    return { type: "fillSketch", ops: this.zigzagLines(s, r, o) };
  }
  zigzagLines(e, o, n) {
    const r = [];
    return e.forEach((s) => {
      const i = Cr(s), a = Math.round(i / (2 * o));
      let h = s[0], c = s[1];
      h[0] > c[0] && (h = s[1], c = s[0]);
      const l = Math.atan((c[1] - h[1]) / (c[0] - h[0]));
      for (let p = 0; p < a; p++) {
        const d = 2 * p * o, f = 2 * (p + 1) * o, g = Math.sqrt(2 * Math.pow(o, 2)), m = [h[0] + d * Math.cos(l), h[1] + d * Math.sin(l)], y = [h[0] + f * Math.cos(l), h[1] + f * Math.sin(l)], x = [m[0] + g * Math.cos(l + Math.PI / 4), m[1] + g * Math.sin(l + Math.PI / 4)];
        r.push(...this.helper.doubleLineOps(m[0], m[1], x[0], x[1], n), ...this.helper.doubleLineOps(x[0], x[1], y[0], y[1], n));
      }
    }), r;
  }
}
const ze = {};
let Bh = class {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
};
const Nh = 0, Jr = 1, Ki = 2, tr = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function $r(t, e) {
  return t.type === e;
}
function Zs(t) {
  const e = [], o = function(i) {
    const a = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) a[a.length] = { type: Nh, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      a[a.length] = { type: Jr, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return a[a.length] = { type: Ki, text: "" }, a;
  }(t);
  let n = "BOD", r = 0, s = o[r];
  for (; !$r(s, Ki); ) {
    let i = 0;
    const a = [];
    if (n === "BOD") {
      if (s.text !== "M" && s.text !== "m") return Zs("M0,0" + t);
      r++, i = tr[s.text], n = s.text;
    } else $r(s, Jr) ? i = tr[n] : (r++, i = tr[s.text], n = s.text);
    if (!(r + i < o.length)) throw new Error("Path data ended short");
    for (let h = r; h < r + i; h++) {
      const c = o[h];
      if (!$r(c, Jr)) throw new Error("Param not a number: " + n + "," + c.text);
      a[a.length] = +c.text;
    }
    if (typeof tr[n] != "number") throw new Error("Bad segment: " + n);
    {
      const h = { key: n, data: a };
      e.push(h), r += i, s = o[r], n === "M" && (n = "L"), n === "m" && (n = "l");
    }
  }
  return e;
}
function tl(t) {
  let e = 0, o = 0, n = 0, r = 0;
  const s = [];
  for (const { key: i, data: a } of t) switch (i) {
    case "M":
      s.push({ key: "M", data: [...a] }), [e, o] = a, [n, r] = a;
      break;
    case "m":
      e += a[0], o += a[1], s.push({ key: "M", data: [e, o] }), n = e, r = o;
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
      const h = a.map((c, l) => l % 2 ? c + o : c + e);
      s.push({ key: "C", data: h }), e = h[4], o = h[5];
      break;
    }
    case "Q":
      s.push({ key: "Q", data: [...a] }), e = a[2], o = a[3];
      break;
    case "q": {
      const h = a.map((c, l) => l % 2 ? c + o : c + e);
      s.push({ key: "Q", data: h }), e = h[2], o = h[3];
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
      const h = a.map((c, l) => l % 2 ? c + o : c + e);
      s.push({ key: "S", data: h }), e = h[2], o = h[3];
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
      s.push({ key: "Z", data: [] }), e = n, o = r;
  }
  return s;
}
function el(t) {
  const e = [];
  let o = "", n = 0, r = 0, s = 0, i = 0, a = 0, h = 0;
  for (const { key: c, data: l } of t) {
    switch (c) {
      case "M":
        e.push({ key: "M", data: [...l] }), [n, r] = l, [s, i] = l;
        break;
      case "C":
        e.push({ key: "C", data: [...l] }), n = l[4], r = l[5], a = l[2], h = l[3];
        break;
      case "L":
        e.push({ key: "L", data: [...l] }), [n, r] = l;
        break;
      case "H":
        n = l[0], e.push({ key: "L", data: [n, r] });
        break;
      case "V":
        r = l[0], e.push({ key: "L", data: [n, r] });
        break;
      case "S": {
        let p = 0, d = 0;
        o === "C" || o === "S" ? (p = n + (n - a), d = r + (r - h)) : (p = n, d = r), e.push({ key: "C", data: [p, d, ...l] }), a = l[0], h = l[1], n = l[2], r = l[3];
        break;
      }
      case "T": {
        const [p, d] = l;
        let f = 0, g = 0;
        o === "Q" || o === "T" ? (f = n + (n - a), g = r + (r - h)) : (f = n, g = r);
        const m = n + 2 * (f - n) / 3, y = r + 2 * (g - r) / 3, x = p + 2 * (f - p) / 3, b = d + 2 * (g - d) / 3;
        e.push({ key: "C", data: [m, y, x, b, p, d] }), a = f, h = g, n = p, r = d;
        break;
      }
      case "Q": {
        const [p, d, f, g] = l, m = n + 2 * (p - n) / 3, y = r + 2 * (d - r) / 3, x = f + 2 * (p - f) / 3, b = g + 2 * (d - g) / 3;
        e.push({ key: "C", data: [m, y, x, b, f, g] }), a = p, h = d, n = f, r = g;
        break;
      }
      case "A": {
        const p = Math.abs(l[0]), d = Math.abs(l[1]), f = l[2], g = l[3], m = l[4], y = l[5], x = l[6];
        p === 0 || d === 0 ? (e.push({ key: "C", data: [n, r, y, x, y, x] }), n = y, r = x) : (n !== y || r !== x) && (ol(n, r, y, x, p, d, f, g, m).forEach(function(b) {
          e.push({ key: "C", data: b });
        }), n = y, r = x);
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
function ol(t, e, o, n, r, s, i, a, h, c) {
  const l = (p = i, Math.PI * p / 180);
  var p;
  let d = [], f = 0, g = 0, m = 0, y = 0;
  if (c) [f, g, m, y] = c;
  else {
    [t, e] = In(t, e, -l), [o, n] = In(o, n, -l);
    const st = (t - o) / 2, at = (e - n) / 2;
    let xt = st * st / (r * r) + at * at / (s * s);
    xt > 1 && (xt = Math.sqrt(xt), r *= xt, s *= xt);
    const O = r * r, _ = s * s, W = O * _ - O * at * at - _ * st * st, Z = O * at * at + _ * st * st, tt = (a === h ? -1 : 1) * Math.sqrt(Math.abs(W / Z));
    m = tt * r * at / s + (t + o) / 2, y = tt * -s * st / r + (e + n) / 2, f = Math.asin(parseFloat(((e - y) / s).toFixed(9))), g = Math.asin(parseFloat(((n - y) / s).toFixed(9))), t < m && (f = Math.PI - f), o < m && (g = Math.PI - g), f < 0 && (f = 2 * Math.PI + f), g < 0 && (g = 2 * Math.PI + g), h && f > g && (f -= 2 * Math.PI), !h && g > f && (g -= 2 * Math.PI);
  }
  let x = g - f;
  if (Math.abs(x) > 120 * Math.PI / 180) {
    const st = g, at = o, xt = n;
    g = h && g > f ? f + 120 * Math.PI / 180 * 1 : f + 120 * Math.PI / 180 * -1, d = ol(o = m + r * Math.cos(g), n = y + s * Math.sin(g), at, xt, r, s, i, 0, h, [g, st, m, y]);
  }
  x = g - f;
  const b = Math.cos(f), w = Math.sin(f), v = Math.cos(g), M = Math.sin(g), C = Math.tan(x / 4), z = 4 / 3 * r * C, A = 4 / 3 * s * C, P = [t, e], Y = [t + z * w, e - A * b], G = [o + z * M, n - A * v], rt = [o, n];
  if (Y[0] = 2 * P[0] - Y[0], Y[1] = 2 * P[1] - Y[1], c) return [Y, G, rt].concat(d);
  {
    d = [Y, G, rt].concat(d);
    const st = [];
    for (let at = 0; at < d.length; at += 3) {
      const xt = In(d[at][0], d[at][1], l), O = In(d[at + 1][0], d[at + 1][1], l), _ = In(d[at + 2][0], d[at + 2][1], l);
      st.push([xt[0], xt[1], O[0], O[1], _[0], _[1]]);
    }
    return st;
  }
}
const Fh = { randOffset: function(t, e) {
  return jt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return yr(t, e, o);
}, ellipse: function(t, e, o, n, r) {
  const s = rl(o, n, r);
  return Is(t, e, r, s).opset;
}, doubleLineOps: function(t, e, o, n, r) {
  return So(t, e, o, n, r, !0);
} };
function nl(t, e, o, n, r) {
  return { type: "path", ops: So(t, e, o, n, r) };
}
function hr(t, e, o) {
  const n = (t || []).length;
  if (n > 2) {
    const r = [];
    for (let s = 0; s < n - 1; s++) r.push(...So(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && r.push(...So(t[n - 1][0], t[n - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: r };
  }
  return n === 2 ? nl(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function Hh(t, e, o, n, r) {
  return function(s, i) {
    return hr(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + n], [t, e + n]], r);
}
function qi(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, n = er(o[0], 1 * (1 + 0.2 * e.roughness), e), r = e.disableMultiStroke ? [] : er(o[0], 1.5 * (1 + 0.22 * e.roughness), Qi(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const a = er(i, 1 * (1 + 0.2 * e.roughness), e), h = e.disableMultiStroke ? [] : er(i, 1.5 * (1 + 0.22 * e.roughness), Qi(e));
        for (const c of a) c.op !== "move" && n.push(c);
        for (const c of h) c.op !== "move" && r.push(c);
      }
    }
    return { type: "path", ops: n.concat(r) };
  }
  return { type: "path", ops: [] };
}
function rl(t, e, o) {
  const n = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), r = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * n)), s = 2 * Math.PI / r;
  let i = Math.abs(t / 2), a = Math.abs(e / 2);
  const h = 1 - o.curveFitting;
  return i += jt(i * h, o), a += jt(a * h, o), { increment: s, rx: i, ry: a };
}
function Is(t, e, o, n) {
  const [r, s] = Ji(n.increment, t, e, n.rx, n.ry, 1, n.increment * yr(0.1, yr(0.4, 1, o), o), o);
  let i = gr(r, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [a] = Ji(n.increment, t, e, n.rx, n.ry, 1.5, 0, o), h = gr(a, null, o);
    i = i.concat(h);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function Ui(t, e, o, n, r, s, i, a, h) {
  const c = t, l = e;
  let p = Math.abs(o / 2), d = Math.abs(n / 2);
  p += jt(0.01 * p, h), d += jt(0.01 * d, h);
  let f = r, g = s;
  for (; f < 0; ) f += 2 * Math.PI, g += 2 * Math.PI;
  g - f > 2 * Math.PI && (f = 0, g = 2 * Math.PI);
  const m = 2 * Math.PI / h.curveStepCount, y = Math.min(m / 2, (g - f) / 2), x = $i(y, c, l, p, d, f, g, 1, h);
  if (!h.disableMultiStroke) {
    const b = $i(y, c, l, p, d, f, g, 1.5, h);
    x.push(...b);
  }
  return i && (a ? x.push(...So(c, l, c + p * Math.cos(f), l + d * Math.sin(f), h), ...So(c, l, c + p * Math.cos(g), l + d * Math.sin(g), h)) : x.push({ op: "lineTo", data: [c, l] }, { op: "lineTo", data: [c + p * Math.cos(f), l + d * Math.sin(f)] })), { type: "path", ops: x };
}
function Zi(t, e) {
  const o = el(tl(Zs(t))), n = [];
  let r = [0, 0], s = [0, 0];
  for (const { key: i, data: a } of o) switch (i) {
    case "M":
      s = [a[0], a[1]], r = [a[0], a[1]];
      break;
    case "L":
      n.push(...So(s[0], s[1], a[0], a[1], e)), s = [a[0], a[1]];
      break;
    case "C": {
      const [h, c, l, p, d, f] = a;
      n.push(...Oh(h, c, l, p, d, f, s, e)), s = [d, f];
      break;
    }
    case "Z":
      n.push(...So(s[0], s[1], r[0], r[1], e)), s = [r[0], r[1]];
  }
  return { type: "path", ops: n };
}
function _r(t, e) {
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
    if (!ze[r]) switch (r) {
      case "zigzag":
        ze[r] || (ze[r] = new Eh(n));
        break;
      case "cross-hatch":
        ze[r] || (ze[r] = new Lh(n));
        break;
      case "dots":
        ze[r] || (ze[r] = new Rh(n));
        break;
      case "dashed":
        ze[r] || (ze[r] = new Dh(n));
        break;
      case "zigzag-line":
        ze[r] || (ze[r] = new Wh(n));
        break;
      default:
        r = "hachure", ze[r] || (ze[r] = new Us(n));
    }
    return ze[r];
  }(e, Fh).fillPolygons(t, e);
}
function Qi(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function sl(t) {
  return t.randomizer || (t.randomizer = new Bh(t.seed || 0)), t.randomizer.next();
}
function yr(t, e, o, n = 1) {
  return o.roughness * n * (sl(o) * (e - t) + t);
}
function jt(t, e, o = 1) {
  return yr(-t, t, e, o);
}
function So(t, e, o, n, r, s = !1) {
  const i = s ? r.disableMultiStrokeFill : r.disableMultiStroke, a = zs(t, e, o, n, r, !0, !1);
  if (i) return a;
  const h = zs(t, e, o, n, r, !0, !0);
  return a.concat(h);
}
function zs(t, e, o, n, r, s, i) {
  const a = Math.pow(t - o, 2) + Math.pow(e - n, 2), h = Math.sqrt(a);
  let c = 1;
  c = h < 200 ? 1 : h > 500 ? 0.4 : -16668e-7 * h + 1.233334;
  let l = r.maxRandomnessOffset || 0;
  l * l * 100 > a && (l = h / 10);
  const p = l / 2, d = 0.2 + 0.2 * sl(r);
  let f = r.bowing * r.maxRandomnessOffset * (n - e) / 200, g = r.bowing * r.maxRandomnessOffset * (t - o) / 200;
  f = jt(f, r, c), g = jt(g, r, c);
  const m = [], y = () => jt(p, r, c), x = () => jt(l, r, c), b = r.preserveVertices;
  return i ? m.push({ op: "move", data: [t + (b ? 0 : y()), e + (b ? 0 : y())] }) : m.push({ op: "move", data: [t + (b ? 0 : jt(l, r, c)), e + (b ? 0 : jt(l, r, c))] }), i ? m.push({ op: "bcurveTo", data: [f + t + (o - t) * d + y(), g + e + (n - e) * d + y(), f + t + 2 * (o - t) * d + y(), g + e + 2 * (n - e) * d + y(), o + (b ? 0 : y()), n + (b ? 0 : y())] }) : m.push({ op: "bcurveTo", data: [f + t + (o - t) * d + x(), g + e + (n - e) * d + x(), f + t + 2 * (o - t) * d + x(), g + e + 2 * (n - e) * d + x(), o + (b ? 0 : x()), n + (b ? 0 : x())] }), m;
}
function er(t, e, o) {
  if (!t.length) return [];
  const n = [];
  n.push([t[0][0] + jt(e, o), t[0][1] + jt(e, o)]), n.push([t[0][0] + jt(e, o), t[0][1] + jt(e, o)]);
  for (let r = 1; r < t.length; r++) n.push([t[r][0] + jt(e, o), t[r][1] + jt(e, o)]), r === t.length - 1 && n.push([t[r][0] + jt(e, o), t[r][1] + jt(e, o)]);
  return gr(n, null, o);
}
function gr(t, e, o) {
  const n = t.length, r = [];
  if (n > 3) {
    const s = [], i = 1 - o.curveTightness;
    r.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let a = 1; a + 2 < n; a++) {
      const h = t[a];
      s[0] = [h[0], h[1]], s[1] = [h[0] + (i * t[a + 1][0] - i * t[a - 1][0]) / 6, h[1] + (i * t[a + 1][1] - i * t[a - 1][1]) / 6], s[2] = [t[a + 1][0] + (i * t[a][0] - i * t[a + 2][0]) / 6, t[a + 1][1] + (i * t[a][1] - i * t[a + 2][1]) / 6], s[3] = [t[a + 1][0], t[a + 1][1]], r.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else n === 3 ? (r.push({ op: "move", data: [t[1][0], t[1][1]] }), r.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : n === 2 && r.push(...zs(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return r;
}
function Ji(t, e, o, n, r, s, i, a) {
  const h = [], c = [];
  if (a.roughness === 0) {
    t /= 4, c.push([e + n * Math.cos(-t), o + r * Math.sin(-t)]);
    for (let l = 0; l <= 2 * Math.PI; l += t) {
      const p = [e + n * Math.cos(l), o + r * Math.sin(l)];
      h.push(p), c.push(p);
    }
    c.push([e + n * Math.cos(0), o + r * Math.sin(0)]), c.push([e + n * Math.cos(t), o + r * Math.sin(t)]);
  } else {
    const l = jt(0.5, a) - Math.PI / 2;
    c.push([jt(s, a) + e + 0.9 * n * Math.cos(l - t), jt(s, a) + o + 0.9 * r * Math.sin(l - t)]);
    const p = 2 * Math.PI + l - 0.01;
    for (let d = l; d < p; d += t) {
      const f = [jt(s, a) + e + n * Math.cos(d), jt(s, a) + o + r * Math.sin(d)];
      h.push(f), c.push(f);
    }
    c.push([jt(s, a) + e + n * Math.cos(l + 2 * Math.PI + 0.5 * i), jt(s, a) + o + r * Math.sin(l + 2 * Math.PI + 0.5 * i)]), c.push([jt(s, a) + e + 0.98 * n * Math.cos(l + i), jt(s, a) + o + 0.98 * r * Math.sin(l + i)]), c.push([jt(s, a) + e + 0.9 * n * Math.cos(l + 0.5 * i), jt(s, a) + o + 0.9 * r * Math.sin(l + 0.5 * i)]);
  }
  return [c, h];
}
function $i(t, e, o, n, r, s, i, a, h) {
  const c = s + jt(0.1, h), l = [];
  l.push([jt(a, h) + e + 0.9 * n * Math.cos(c - t), jt(a, h) + o + 0.9 * r * Math.sin(c - t)]);
  for (let p = c; p <= i; p += t) l.push([jt(a, h) + e + n * Math.cos(p), jt(a, h) + o + r * Math.sin(p)]);
  return l.push([e + n * Math.cos(i), o + r * Math.sin(i)]), l.push([e + n * Math.cos(i), o + r * Math.sin(i)]), gr(l, null, h);
}
function Oh(t, e, o, n, r, s, i, a) {
  const h = [], c = [a.maxRandomnessOffset || 1, (a.maxRandomnessOffset || 1) + 0.3];
  let l = [0, 0];
  const p = a.disableMultiStroke ? 1 : 2, d = a.preserveVertices;
  for (let f = 0; f < p; f++) f === 0 ? h.push({ op: "move", data: [i[0], i[1]] }) : h.push({ op: "move", data: [i[0] + (d ? 0 : jt(c[0], a)), i[1] + (d ? 0 : jt(c[0], a))] }), l = d ? [r, s] : [r + jt(c[f], a), s + jt(c[f], a)], h.push({ op: "bcurveTo", data: [t + jt(c[f], a), e + jt(c[f], a), o + jt(c[f], a), n + jt(c[f], a), l[0], l[1]] });
  return h;
}
function zn(t) {
  return [...t];
}
function _i(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const n = [];
  if (o === 3) n.push(zn(t[0]), zn(t[1]), zn(t[2]), zn(t[2]));
  else {
    const r = [];
    r.push(t[0], t[0]);
    for (let a = 1; a < t.length; a++) r.push(t[a]), a === t.length - 1 && r.push(t[a]);
    const s = [], i = 1 - e;
    n.push(zn(r[0]));
    for (let a = 1; a + 2 < r.length; a++) {
      const h = r[a];
      s[0] = [h[0], h[1]], s[1] = [h[0] + (i * r[a + 1][0] - i * r[a - 1][0]) / 6, h[1] + (i * r[a + 1][1] - i * r[a - 1][1]) / 6], s[2] = [r[a + 1][0] + (i * r[a][0] - i * r[a + 2][0]) / 6, r[a + 1][1] + (i * r[a][1] - i * r[a + 2][1]) / 6], s[3] = [r[a + 1][0], r[a + 1][1]], n.push(s[1], s[2], s[3]);
    }
  }
  return n;
}
function ur(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function Xh(t, e, o) {
  const n = ur(e, o);
  if (n === 0) return ur(t, e);
  let r = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / n;
  return r = Math.max(0, Math.min(1, r)), ur(t, No(e, o, r));
}
function No(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function Ts(t, e, o, n) {
  const r = n || [];
  if (function(a, h) {
    const c = a[h + 0], l = a[h + 1], p = a[h + 2], d = a[h + 3];
    let f = 3 * l[0] - 2 * c[0] - d[0];
    f *= f;
    let g = 3 * l[1] - 2 * c[1] - d[1];
    g *= g;
    let m = 3 * p[0] - 2 * d[0] - c[0];
    m *= m;
    let y = 3 * p[1] - 2 * d[1] - c[1];
    return y *= y, f < m && (f = m), g < y && (g = y), f + g;
  }(t, e) < o) {
    const a = t[e + 0];
    r.length ? (s = r[r.length - 1], i = a, Math.sqrt(ur(s, i)) > 1 && r.push(a)) : r.push(a), r.push(t[e + 3]);
  } else {
    const h = t[e + 0], c = t[e + 1], l = t[e + 2], p = t[e + 3], d = No(h, c, 0.5), f = No(c, l, 0.5), g = No(l, p, 0.5), m = No(d, f, 0.5), y = No(f, g, 0.5), x = No(m, y, 0.5);
    Ts([h, d, m, x], 0, o, r), Ts([x, y, g, p], 0, o, r);
  }
  var s, i;
  return r;
}
function Yh(t, e) {
  return mr(t, 0, t.length, e);
}
function mr(t, e, o, n, r) {
  const s = r || [], i = t[e], a = t[o - 1];
  let h = 0, c = 1;
  for (let l = e + 1; l < o - 1; ++l) {
    const p = Xh(t[l], i, a);
    p > h && (h = p, c = l);
  }
  return Math.sqrt(h) > n ? (mr(t, e, c + 1, n, s), mr(t, c, o, n, s)) : (s.length || s.push(i), s.push(a)), s;
}
function ts(t, e = 0.15, o) {
  const n = [], r = (t.length - 1) / 3;
  for (let s = 0; s < r; s++)
    Ts(t, 3 * s, e, n);
  return o && o > 0 ? mr(n, 0, n.length, o) : n;
}
const De = "none";
class br {
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
    return this._d("line", [nl(e, o, n, r, i)], i);
  }
  rectangle(e, o, n, r, s) {
    const i = this._o(s), a = [], h = Hh(e, o, n, r, i);
    if (i.fill) {
      const c = [[e, o], [e + n, o], [e + n, o + r], [e, o + r]];
      i.fillStyle === "solid" ? a.push(_r([c], i)) : a.push(en([c], i));
    }
    return i.stroke !== De && a.push(h), this._d("rectangle", a, i);
  }
  ellipse(e, o, n, r, s) {
    const i = this._o(s), a = [], h = rl(n, r, i), c = Is(e, o, i, h);
    if (i.fill) if (i.fillStyle === "solid") {
      const l = Is(e, o, i, h).opset;
      l.type = "fillPath", a.push(l);
    } else a.push(en([c.estimatedPoints], i));
    return i.stroke !== De && a.push(c.opset), this._d("ellipse", a, i);
  }
  circle(e, o, n, r) {
    const s = this.ellipse(e, o, n, n, r);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const n = this._o(o);
    return this._d("linearPath", [hr(e, !1, n)], n);
  }
  arc(e, o, n, r, s, i, a = !1, h) {
    const c = this._o(h), l = [], p = Ui(e, o, n, r, s, i, a, !0, c);
    if (a && c.fill) if (c.fillStyle === "solid") {
      const d = Object.assign({}, c);
      d.disableMultiStroke = !0;
      const f = Ui(e, o, n, r, s, i, !0, !1, d);
      f.type = "fillPath", l.push(f);
    } else l.push(function(d, f, g, m, y, x, b) {
      const w = d, v = f;
      let M = Math.abs(g / 2), C = Math.abs(m / 2);
      M += jt(0.01 * M, b), C += jt(0.01 * C, b);
      let z = y, A = x;
      for (; z < 0; ) z += 2 * Math.PI, A += 2 * Math.PI;
      A - z > 2 * Math.PI && (z = 0, A = 2 * Math.PI);
      const P = (A - z) / b.curveStepCount, Y = [];
      for (let G = z; G <= A; G += P) Y.push([w + M * Math.cos(G), v + C * Math.sin(G)]);
      return Y.push([w + M * Math.cos(A), v + C * Math.sin(A)]), Y.push([w, v]), en([Y], b);
    }(e, o, n, r, s, i, c));
    return c.stroke !== De && l.push(p), this._d("arc", l, c);
  }
  curve(e, o) {
    const n = this._o(o), r = [], s = qi(e, n);
    if (n.fill && n.fill !== De) if (n.fillStyle === "solid") {
      const i = qi(e, Object.assign(Object.assign({}, n), { disableMultiStroke: !0, roughness: n.roughness ? n.roughness + n.fillShapeRoughnessGain : 0 }));
      r.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], a = e;
      if (a.length) {
        const h = typeof a[0][0] == "number" ? [a] : a;
        for (const c of h) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...ts(_i([c[0], c[0], c[1], c[2]]), 10, (1 + n.roughness) / 2)) : i.push(...ts(_i(c), 10, (1 + n.roughness) / 2));
      }
      i.length && r.push(en([i], n));
    }
    return n.stroke !== De && r.push(s), this._d("curve", r, n);
  }
  polygon(e, o) {
    const n = this._o(o), r = [], s = hr(e, !0, n);
    return n.fill && (n.fillStyle === "solid" ? r.push(_r([e], n)) : r.push(en([e], n))), n.stroke !== De && r.push(s), this._d("polygon", r, n);
  }
  path(e, o) {
    const n = this._o(o), r = [];
    if (!e) return this._d("path", r, n);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = n.fill && n.fill !== "transparent" && n.fill !== De, i = n.stroke !== De, a = !!(n.simplification && n.simplification < 1), h = function(l, p, d) {
      const f = el(tl(Zs(l))), g = [];
      let m = [], y = [0, 0], x = [];
      const b = () => {
        x.length >= 4 && m.push(...ts(x, p)), x = [];
      }, w = () => {
        b(), m.length && (g.push(m), m = []);
      };
      for (const { key: M, data: C } of f) switch (M) {
        case "M":
          w(), y = [C[0], C[1]], m.push(y);
          break;
        case "L":
          b(), m.push([C[0], C[1]]);
          break;
        case "C":
          if (!x.length) {
            const z = m.length ? m[m.length - 1] : y;
            x.push([z[0], z[1]]);
          }
          x.push([C[0], C[1]]), x.push([C[2], C[3]]), x.push([C[4], C[5]]);
          break;
        case "Z":
          b(), m.push([y[0], y[1]]);
      }
      if (w(), !d) return g;
      const v = [];
      for (const M of g) {
        const C = Yh(M, d);
        C.length && v.push(C);
      }
      return v;
    }(e, 1, a ? 4 - 4 * (n.simplification || 1) : (1 + n.roughness) / 2), c = Zi(e, n);
    if (s) if (n.fillStyle === "solid") if (h.length === 1) {
      const l = Zi(e, Object.assign(Object.assign({}, n), { disableMultiStroke: !0, roughness: n.roughness ? n.roughness + n.fillShapeRoughnessGain : 0 }));
      r.push({ type: "fillPath", ops: this._mergedShape(l.ops) });
    } else r.push(_r(h, n));
    else r.push(en(h, n));
    return i && (a ? h.forEach((l) => {
      r.push(hr(l, !1, n));
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
          i = { d: this.opsToPath(s), stroke: n.stroke, strokeWidth: n.strokeWidth, fill: De };
          break;
        case "fillPath":
          i = { d: this.opsToPath(s), stroke: De, strokeWidth: 0, fill: n.fill || De };
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
    return n < 0 && (n = o.strokeWidth / 2), { d: this.opsToPath(e), stroke: o.fill || De, strokeWidth: n, fill: De };
  }
  _mergedShape(e) {
    return e.filter((o, n) => n === 0 || o.op !== "move");
  }
}
class Gh {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new br(o);
  }
  draw(e) {
    const o = e.sets || [], n = e.options || this.getDefaultOptions(), r = this.ctx, s = e.options.fixedDecimalPlaceDigits;
    for (const i of o) switch (i.type) {
      case "path":
        r.save(), r.strokeStyle = n.stroke === "none" ? "transparent" : n.stroke, r.lineWidth = n.strokeWidth, n.strokeLineDash && r.setLineDash(n.strokeLineDash), n.strokeLineDashOffset && (r.lineDashOffset = n.strokeLineDashOffset), this._drawToContext(r, i, s), r.restore();
        break;
      case "fillPath": {
        r.save(), r.fillStyle = n.fill || "";
        const a = e.shape === "curve" || e.shape === "polygon" || e.shape === "path" ? "evenodd" : "nonzero";
        this._drawToContext(r, i, s, a), r.restore();
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
      const i = typeof n == "number" && n >= 0 ? s.data.map((a) => +a.toFixed(n)) : s.data;
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
  arc(e, o, n, r, s, i, a = !1, h) {
    const c = this.gen.arc(e, o, n, r, s, i, a, h);
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
const or = "http://www.w3.org/2000/svg";
class jh {
  constructor(e, o) {
    this.svg = e, this.gen = new br(o);
  }
  draw(e) {
    const o = e.sets || [], n = e.options || this.getDefaultOptions(), r = this.svg.ownerDocument || window.document, s = r.createElementNS(or, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const a of o) {
      let h = null;
      switch (a.type) {
        case "path":
          h = r.createElementNS(or, "path"), h.setAttribute("d", this.opsToPath(a, i)), h.setAttribute("stroke", n.stroke), h.setAttribute("stroke-width", n.strokeWidth + ""), h.setAttribute("fill", "none"), n.strokeLineDash && h.setAttribute("stroke-dasharray", n.strokeLineDash.join(" ").trim()), n.strokeLineDashOffset && h.setAttribute("stroke-dashoffset", `${n.strokeLineDashOffset}`);
          break;
        case "fillPath":
          h = r.createElementNS(or, "path"), h.setAttribute("d", this.opsToPath(a, i)), h.setAttribute("stroke", "none"), h.setAttribute("stroke-width", "0"), h.setAttribute("fill", n.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || h.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          h = this.fillSketch(r, a, n);
      }
      h && s.appendChild(h);
    }
    return s;
  }
  fillSketch(e, o, n) {
    let r = n.fillWeight;
    r < 0 && (r = n.strokeWidth / 2);
    const s = e.createElementNS(or, "path");
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
  arc(e, o, n, r, s, i, a = !1, h) {
    const c = this.gen.arc(e, o, n, r, s, i, a, h);
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
var Vh = { canvas: (t, e) => new Gh(t, e), svg: (t, e) => new jh(t, e), generator: (t) => new br(t), newSeed: () => br.newSeed() };
const oo = Vh.generator();
function Kh(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const n = t.charCodeAt(o);
    e = (e << 5) - e + n, e |= 0;
  }
  return Math.abs(e);
}
function Mo(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? Kh(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function Co(t) {
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
function qo(t, e) {
  return Math.min(t, e) * 0.25;
}
function qh(t, e, o, n, r) {
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
    const i = qo(o, n);
    return Co(oo.path(qh(t, e, o, n, i), Mo(r)));
  }
  return Co(oo.rectangle(t, e, o, n, Mo(r)));
}
function Ir(t, e, o, n, r) {
  return Co(oo.ellipse(t, e, o, n, Mo(r)));
}
function Uh(t, e, o, n, r) {
  const s = t + o / 2, i = e + n / 2, a = [s, e], h = [t + o, i], c = [s, e + n], l = [t, i], p = Math.hypot(o / 2, n / 2), d = Math.min(r, p / 2) / p, f = (C, z, A) => [
    C[0] + A * (z[0] - C[0]),
    C[1] + A * (z[1] - C[1])
  ], g = f(l, a, 1 - d), m = f(a, h, d), y = f(a, h, 1 - d), x = f(h, c, d), b = f(h, c, 1 - d), w = f(c, l, d), v = f(c, l, 1 - d), M = f(l, a, d);
  return [
    `M${m[0]},${m[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${h[0]},${h[1]} ${x[0]},${x[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${c[0]},${c[1]} ${w[0]},${w[1]}`,
    `L${v[0]},${v[1]}`,
    `Q${l[0]},${l[1]} ${M[0]},${M[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${a[0]},${a[1]} ${m[0]},${m[1]}`,
    "Z"
  ].join(" ");
}
function zr(t, e, o, n, r, s) {
  if (s) {
    const a = qo(o, n);
    return Co(oo.path(Uh(t, e, o, n, a), Mo(r)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + n / 2],
    [t + o / 2, e + n],
    [t, e + n / 2]
  ];
  return Co(oo.polygon(i, Mo(r)));
}
function Ho(t, e, o, n, r) {
  return Co(oo.line(t, e, o, n, Mo(r)));
}
function Tr(t, e, o, n, r) {
  const s = Ho(t, e, o, n, r), i = Math.atan2(n - e, o - t), a = Math.max(12, r.strokeWidth * 4), h = Math.PI / 6, c = o - a * Math.cos(i - h), l = n - a * Math.sin(i - h), p = o - a * Math.cos(i + h), d = n - a * Math.sin(i + h), f = Ho(o, n, c, l, r), g = Ho(o, n, p, d, r);
  return [...s, ...f, ...g];
}
function ta(t, e) {
  const o = {
    ...Mo(e),
    stroke: "none"
  };
  return Co(oo.polygon(t, o));
}
function es(t, e) {
  return Co(oo.path(t, Mo(e)));
}
function no(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function Zh(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, n = parseInt(e.substring(2, 4), 16) || 0, r = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * n + 0.114 * r) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function Qh({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ u($h, { node: o }) : /* @__PURE__ */ u(Jh, { node: o });
  }
  return /* @__PURE__ */ u(_h, { node: t, editingLabel: e });
}
const xr = Le(Qh), Jh = Le(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", n = no(e.data.strokeStyle), r = Ut(
    () => o ? null : qs(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Ut(() => {
    const l = e.data.points;
    if (!l || l.length === 0) return "";
    if (l.length === 1) return `M${l[0][0]},${l[0][1]}L${l[0][0]},${l[0][1]}`;
    const p = [`M${l[0][0]},${l[0][1]}`];
    for (let d = 1; d < l.length; d++)
      p.push(`L${l[d][0]},${l[d][1]}`);
    return p.join("");
  }, [e.data.points]), i = Ut(() => {
    if (!o) return null;
    const l = e.data.points;
    if (l.length < 2) return "";
    const p = ["M", l[0][0], l[0][1]];
    for (let f = 1; f < l.length; f++) {
      const [g, m] = l[f], [y, x] = l[f - 1];
      p.push("Q", y, x, (y + g) / 2, (x + m) / 2);
    }
    const d = l[l.length - 1];
    return p.push("L", d[0], d[1]), p.join(" ");
  }, [e.data.points, o]), a = Ut(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const l = e.data.points.map((v) => [v[0], v[1]]), p = _a(l), d = p[0], f = p[p.length - 1], g = Math.hypot(d[0] - f[0], d[1] - f[1]);
    let m = 0;
    for (let v = 1; v < p.length; v++)
      m += Math.hypot(p[v][0] - p[v - 1][0], p[v][1] - p[v - 1][1]);
    const y = m >= 1 && g <= Math.max(e.data.strokeWidth * 4, 20) && g <= m * 0.1, x = e.data.fillStyle || "solid";
    if (y) {
      const v = Ch(p, 0);
      return x === "solid" ? { kind: "solid", d: v, fill: e.data.fill } : { kind: "rough", paths: ta(p, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: x,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const b = Th(p);
    if (b.length === 0) return null;
    if (x === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: b
      };
    const w = [];
    for (const { points: v } of b)
      v.length >= 3 && w.push(
        ...ta(v, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: x,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: w, regions: b };
  }, [e.data.fill, e.data.fillStyle, e.data.points, e.data.strokeWidth]), h = e.h === "auto" ? 0 : e.h, c = e.data.strokeWidth * 4;
  return /* @__PURE__ */ u(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - c,
        top: e.y - c,
        width: e.w + c * 2,
        height: h + c * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ u(
        "svg",
        {
          width: e.w + c * 2,
          height: h + c * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ S("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
            (a == null ? void 0 : a.kind) === "solid" && (a.regions ? a.regions.map((l, p) => /* @__PURE__ */ u(
              "path",
              {
                d: l.pathD,
                fill: a.fill,
                stroke: "none"
              },
              p
            )) : /* @__PURE__ */ u("path", { d: a.d, fill: a.fill, stroke: "none" })),
            (a == null ? void 0 : a.kind) === "rough" && a.paths.map((l, p) => /* @__PURE__ */ u(
              "path",
              {
                d: l.d,
                stroke: l.stroke,
                strokeWidth: l.strokeWidth,
                fill: l.fill,
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
                strokeDasharray: n == null ? void 0 : n.map((l) => l * Math.max(e.data.strokeWidth, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ) : /* @__PURE__ */ u(
              "path",
              {
                d: r,
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
}), $h = Le(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, n = e.data.strokeWidth * 2, r = Ut(() => {
    const a = e.data.points;
    if (!a || a.length === 0) return "";
    const h = [`M${a[0][0]},${a[0][1]}`];
    for (let c = 1; c < a.length; c++)
      h.push(`L${a[c][0]},${a[c][1]}`);
    return h.push("Z"), h.join("");
  }, [e.data.points]), s = no(e.data.strokeStyle), i = s == null ? void 0 : s.map((a) => a * Math.max(e.data.strokeWidth, 1)).join(" ");
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ u(
        "svg",
        {
          width: e.w + n * 2,
          height: o + n * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ S("g", { transform: `translate(${n}, ${n})`, opacity: e.data.opacity ?? 1, children: [
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u(
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
}), _h = Le(function({ node: e, editingLabel: o }) {
  var y, x, b, w;
  const n = e.h === "auto" ? 100 : e.h, r = e.data.strokeWidth * 2, s = no(e.data.strokeStyle), i = ((y = e.data.startPoint) == null ? void 0 : y[0]) ?? 0, a = ((x = e.data.startPoint) == null ? void 0 : x[1]) ?? n / 2, h = ((b = e.data.endPoint) == null ? void 0 : b[0]) ?? e.w, c = ((w = e.data.endPoint) == null ? void 0 : w[1]) ?? n / 2, l = Ut(() => {
    if (e.data.roughness === 0) return null;
    const v = {
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
        return Wn(0, 0, e.w, n, v, M);
      case "ellipse":
        return Ir(e.w / 2, n / 2, e.w, n, v);
      case "diamond":
        return zr(0, 0, e.w, n, v, M);
      case "line":
        return Ho(i, a, h, c, v);
      case "arrow":
        return Tr(i, a, h, c, v);
      default:
        return null;
    }
  }, [e, s, i, a, h, c, n]), p = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, d = e.data.opacity ?? 1, f = e.data.shape === "line" || e.data.shape === "arrow", g = e.data.label, m = e.data.labelFontSize ?? 14;
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
        /* @__PURE__ */ u(
          "svg",
          {
            width: e.w + r * 2,
            height: n + r * 2,
            style: { overflow: "visible", marginLeft: -r, marginTop: -r },
            children: /* @__PURE__ */ S("g", { transform: `translate(${r}, ${r})`, opacity: d, children: [
              p && /* @__PURE__ */ u(
                ou,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              l ? l.map((v, M) => p && v.fill && v.fill !== "none" ? null : /* @__PURE__ */ u(
                "path",
                {
                  d: v.d,
                  stroke: v.stroke,
                  strokeWidth: v.strokeWidth,
                  fill: v.fill,
                  strokeDasharray: v.strokeDasharray,
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                M
              )) : /* @__PURE__ */ u(
                tu,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  x1: i,
                  y1: a,
                  x2: h,
                  y2: c,
                  stroke: e.data.stroke,
                  fill: e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  dashArray: s,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              /* @__PURE__ */ u(
                eu,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  x1: i,
                  y1: a,
                  x2: h,
                  y2: c,
                  hasFill: !!e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  rounded: e.data.edgeStyle === "round"
                }
              )
            ] })
          }
        ),
        !f && g && !o && /* @__PURE__ */ u(
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
                  fontFamily: ko(e.data.labelFontFamily ?? wo),
                  fontSize: m,
                  color: e.data.fill && e.data.fillStyle === "solid" ? Zh(e.data.fill) : e.data.stroke,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  width: "100%"
                },
                children: g
              }
            )
          }
        )
      ]
    }
  );
});
function Qs(t, e) {
  const o = qo(t, e), n = t / 2, r = e / 2, s = [n, 0], i = [t, r], a = [n, e], h = [0, r], c = Math.hypot(t / 2, e / 2), l = Math.min(o, c / 2) / c, p = (v, M, C) => [
    v[0] + C * (M[0] - v[0]),
    v[1] + C * (M[1] - v[1])
  ], d = p(s, i, l), f = p(s, i, 1 - l), g = p(i, a, l), m = p(i, a, 1 - l), y = p(a, h, l), x = p(a, h, 1 - l), b = p(h, s, l), w = p(h, s, 1 - l);
  return [
    `M${d[0]},${d[1]}`,
    `L${f[0]},${f[1]}`,
    `Q${i[0]},${i[1]} ${g[0]},${g[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${a[0]},${a[1]} ${y[0]},${y[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${h[0]},${h[1]} ${b[0]},${b[1]}`,
    `L${w[0]},${w[1]}`,
    `Q${s[0]},${s[1]} ${d[0]},${d[1]}`,
    "Z"
  ].join(" ");
}
function tu({
  shape: t,
  w: e,
  h: o,
  x1: n,
  y1: r,
  x2: s,
  y2: i,
  stroke: a,
  fill: h,
  strokeWidth: c,
  dashArray: l,
  rounded: p
}) {
  const d = l == null ? void 0 : l.join(",");
  switch (t) {
    case "rect": {
      const f = !!h && h !== "none", g = o <= Math.max(c * 2, 4), m = e <= Math.max(c * 2, 4);
      if (!f && (g || m))
        return g && e >= o ? /* @__PURE__ */ u(
          "line",
          {
            x1: 0,
            y1: o / 2,
            x2: e,
            y2: o / 2,
            stroke: a,
            strokeWidth: Math.max(c, o),
            strokeDasharray: d
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
            strokeDasharray: d
          }
        );
      const y = p ? qo(e, o) : 0;
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
          fill: h || "none",
          strokeWidth: c,
          strokeDasharray: d
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
          fill: h || "none",
          strokeWidth: c,
          strokeDasharray: d
        }
      );
    case "diamond":
      return p ? /* @__PURE__ */ u(
        "path",
        {
          d: Qs(e, o),
          stroke: a,
          fill: h || "none",
          strokeWidth: c,
          strokeDasharray: d
        }
      ) : /* @__PURE__ */ u(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: a,
          fill: h || "none",
          strokeWidth: c,
          strokeDasharray: d
        }
      );
    case "line":
      return /* @__PURE__ */ u(
        "line",
        {
          x1: n,
          y1: r,
          x2: s,
          y2: i,
          stroke: a,
          strokeWidth: c,
          strokeDasharray: d
        }
      );
    case "arrow": {
      const f = Math.atan2(i - r, s - n), g = Math.max(12, c * 4), m = Math.PI / 6, y = s - g * Math.cos(f - m), x = i - g * Math.sin(f - m), b = s - g * Math.cos(f + m), w = i - g * Math.sin(f + m);
      return /* @__PURE__ */ S(St, { children: [
        /* @__PURE__ */ u(
          "line",
          {
            x1: n,
            y1: r,
            x2: s,
            y2: i,
            stroke: a,
            strokeWidth: c,
            strokeDasharray: d
          }
        ),
        /* @__PURE__ */ u(
          "polyline",
          {
            points: `${y},${x} ${s},${i} ${b},${w}`,
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
function eu({
  shape: t,
  w: e,
  h: o,
  x1: n,
  y1: r,
  x2: s,
  y2: i,
  hasFill: a,
  strokeWidth: h,
  rounded: c
}) {
  const l = a ? "painted" : "stroke", p = a ? "transparent" : "none";
  switch (t) {
    case "rect": {
      const d = c ? qo(e, o) : 0;
      return /* @__PURE__ */ u(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: d || void 0,
          ry: d || void 0,
          fill: p,
          stroke: "transparent",
          strokeWidth: h,
          pointerEvents: l
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
          strokeWidth: h,
          pointerEvents: l
        }
      );
    case "diamond":
      return c ? /* @__PURE__ */ u(
        "path",
        {
          d: Qs(e, o),
          fill: p,
          stroke: "transparent",
          strokeWidth: h,
          pointerEvents: l
        }
      ) : /* @__PURE__ */ u(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: p,
          stroke: "transparent",
          strokeWidth: h,
          pointerEvents: l
        }
      );
    case "line":
    case "arrow":
      return /* @__PURE__ */ u(
        "line",
        {
          x1: n,
          y1: r,
          x2: s,
          y2: i,
          stroke: "transparent",
          strokeWidth: h,
          pointerEvents: "stroke"
        }
      );
    default:
      return null;
  }
}
function ou({
  shape: t,
  w: e,
  h: o,
  fill: n,
  rounded: r
}) {
  switch (t) {
    case "rect": {
      const s = r ? qo(e, o) : 0;
      return /* @__PURE__ */ u("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: n, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ u("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: n, stroke: "none" });
    case "diamond":
      return r ? /* @__PURE__ */ u(
        "path",
        {
          d: Qs(e, o),
          fill: n,
          stroke: "none"
        }
      ) : /* @__PURE__ */ u(
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
const nu = Le(function(e) {
  return /* @__PURE__ */ u(xr, { node: e.node });
}), ru = {
  type: "draw",
  component: nu,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, n) => Hs(t, e, o, n),
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
}, su = Le(function(e) {
  const o = e.node;
  return /* @__PURE__ */ u(xr, { node: o, editingLabel: e.editing });
}), iu = {
  type: "shape",
  component: su,
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
function au(t) {
  return null;
}
const lu = {
  type: "edge",
  component: au,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, nr = 0.05, rr = 10, cu = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function du({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  onResizeHandleDown: s,
  cropping: i,
  onCropStart: a,
  onCropEnd: h
}) {
  const c = t.h, l = t.data.crop, p = pt(!1);
  p.current = !!i;
  const d = pt(null), f = pt(!1), g = pt(null), [m, y] = et(null), x = lt(() => {
    g.current && g.current.naturalWidth > 0 && y({ w: g.current.naturalWidth, h: g.current.naturalHeight });
  }, []);
  Mt(() => {
    g.current && g.current.naturalWidth > 0 && y({ w: g.current.naturalWidth, h: g.current.naturalHeight });
  }, [t.data.src]);
  const [b, w] = et({ x: 0, y: 0, w: 1, h: 1 });
  Mt(() => {
    i && (d.current = null, w(l ?? { x: 0, y: 0, w: 1, h: 1 }), !m && g.current && g.current.naturalWidth > 0 && y({ w: g.current.naturalWidth, h: g.current.naturalHeight }));
  }, [i]);
  const v = Ut(() => {
    if (m) {
      const H = m.w / m.h, $ = t.w / c;
      let ot, it;
      return H > $ ? (ot = t.w, it = t.w / H) : (it = c, ot = c * H), { x: (t.w - ot) / 2, y: (c - it) / 2, w: ot, h: it };
    }
    return i ? { x: 0, y: 0, w: t.w, h: c } : null;
  }, [m, i, t.w, c]), M = lt(
    (H) => {
      const $ = o.getNode(t.id);
      if (!$ || $.type !== "image") return;
      const ot = $.data;
      if (H.x < 1e-3 && H.y < 1e-3 && H.w > 0.999 && H.h > 0.999) {
        o.updateNodeWithHistory(t.id, {
          data: { ...ot, crop: void 0 }
        });
        return;
      }
      const Q = $.h === "auto" ? c : $.h, ct = $.rotation || 0;
      let yt, J, dt, wt;
      if (v)
        if (yt = Math.max(rr, H.w * v.w), J = Math.max(rr, H.h * v.h), !ct)
          dt = $.x + v.x + H.x * v.w, wt = $.y + v.y + H.y * v.h;
        else {
          const gt = $.x + $.w / 2, mt = $.y + Q / 2;
          dt = gt - yt / 2, wt = mt - J / 2;
        }
      else if (yt = Math.max(rr, H.w * $.w), J = Math.max(rr, H.h * Q), !ct)
        dt = $.x + H.x * $.w, wt = $.y + H.y * Q;
      else {
        const gt = $.x + $.w / 2, mt = $.y + Q / 2;
        dt = gt - yt / 2, wt = mt - J / 2;
      }
      o.updateNodeWithHistory(t.id, {
        x: dt,
        y: wt,
        w: yt,
        h: J,
        data: {
          ...ot,
          crop: { x: H.x, y: H.y, w: H.w, h: H.h }
        }
      });
    },
    [o, t.id, v, c]
  ), C = lt(() => {
    d.current = "apply", M(b), h == null || h();
  }, [M, b, h]), z = lt(() => {
    d.current = "cancel", h == null || h();
  }, [h]);
  Mt(() => {
    if (i) {
      f.current = !0;
      return;
    }
    if (!f.current) return;
    f.current = !1;
    const H = d.current;
    d.current = null, !(H === "cancel" || H === "apply") && (M(b), h == null || h());
  }, [i, b, M, h]), Mt(() => {
    if (!i) return;
    const H = ($) => {
      $.key === "Enter" ? (C(), $.preventDefault(), $.stopPropagation()) : $.key === "Escape" && (z(), $.preventDefault(), $.stopPropagation());
    };
    return document.addEventListener("keydown", H, !0), () => document.removeEventListener("keydown", H, !0);
  }, [i, C, z]);
  const A = lt(
    (H, $) => {
      if ($.stopPropagation(), $.preventDefault(), !v) return;
      const ot = $.currentTarget.ownerDocument, it = $.clientX, Q = $.clientY, ct = { ...b }, yt = (dt) => {
        const wt = (dt.clientX - it) / r / v.w, gt = (dt.clientY - Q) / r / v.h, mt = { ...ct }, At = ct.x + ct.w, Nt = ct.y + ct.h;
        if (H.includes("left")) {
          const Lt = Math.max(0, Math.min(At - nr, ct.x + wt));
          mt.x = Lt, mt.w = At - Lt;
        }
        if (H.includes("right") && (mt.w = Math.max(
          nr,
          Math.min(1 - ct.x, ct.w + wt)
        )), H.includes("top")) {
          const Lt = Math.max(0, Math.min(Nt - nr, ct.y + gt));
          mt.y = Lt, mt.h = Nt - Lt;
        }
        H.includes("bottom") && (mt.h = Math.max(
          nr,
          Math.min(1 - ct.y, ct.h + gt)
        )), w(mt);
      }, J = () => {
        ot.removeEventListener("pointermove", yt), ot.removeEventListener("pointerup", J);
      };
      ot.addEventListener("pointermove", yt), ot.addEventListener("pointerup", J);
    },
    [b, v, r]
  ), P = lt(
    (H) => {
      if (H.stopPropagation(), H.preventDefault(), !v) return;
      const $ = H.currentTarget.ownerDocument, ot = H.clientX, it = H.clientY, Q = { ...b }, ct = (J) => {
        const dt = (J.clientX - ot) / r / v.w, wt = (J.clientY - it) / r / v.h;
        w({
          ...Q,
          x: Math.max(0, Math.min(1 - Q.w, Q.x + dt)),
          y: Math.max(0, Math.min(1 - Q.h, Q.y + wt))
        });
      }, yt = () => {
        $.removeEventListener("pointermove", ct), $.removeEventListener("pointerup", yt);
      };
      $.addEventListener("pointermove", ct), $.addEventListener("pointerup", yt);
    },
    [b, v, r]
  ), Y = lt(
    (H) => {
      if (p.current) {
        H.stopPropagation();
        return;
      }
      const $ = H.currentTarget.ownerDocument;
      if (H.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: Lt, y: ft } = o.screenToCanvas(
          H.clientX,
          H.clientY
        );
        for (const Xt of o.selection) {
          const Gt = o.getNode(Xt);
          if (!Gt) continue;
          const Kt = Gt.h === "auto" ? 100 : Gt.h;
          if (Lt >= Gt.x && Lt <= Gt.x + Gt.w && ft >= Gt.y && ft <= Gt.y + Kt)
            return;
        }
      }
      H.stopPropagation(), H.preventDefault(), H.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const ot = H.clientX, it = H.clientY, Q = Array.from(o.selection), ct = Q.map((Lt) => {
        const ft = o.getNode(Lt);
        return { id: Lt, x: ft.x, y: ft.y };
      });
      let yt = !1, J = null, dt = ot, wt = it, gt = !1;
      const mt = () => {
        J = null;
        const Lt = (dt - ot) / o.viewport.zoom, ft = (wt - it) / o.viewport.zoom, { finalDx: Xt, finalDy: Gt } = o.computeDragSnap(
          ct,
          Q,
          Lt,
          ft,
          gt
        ), Kt = ct.map(($t) => ({
          id: $t.id,
          patch: { x: $t.x + Xt, y: $t.y + Gt }
        }));
        o.updateMany(Kt);
      }, At = (Lt) => {
        const ft = (Lt.clientX - ot) / o.viewport.zoom, Xt = (Lt.clientY - it) / o.viewport.zoom;
        if (!yt)
          if (Math.abs(ft) > 2 || Math.abs(Xt) > 2)
            yt = !0, o.pushHistorySnapshot();
          else
            return;
        dt = Lt.clientX, wt = Lt.clientY, gt = Lt.metaKey || Lt.ctrlKey, J === null && (J = requestAnimationFrame(mt));
      }, Nt = () => {
        J !== null && (cancelAnimationFrame(J), mt()), o.clearAlignGuides(), $.removeEventListener("pointermove", At), $.removeEventListener("pointerup", Nt);
      };
      $.addEventListener("pointermove", At), $.addEventListener("pointerup", Nt);
    },
    [o, t.id]
  ), G = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], rt = 8 / r, st = rt / 2, at = 25 / r, xt = e && s && !i, O = lt(
    (H) => {
      const $ = H.currentTarget.ownerDocument;
      H.stopPropagation(), H.preventDefault();
      const ot = t.x + t.w / 2, it = t.y + c / 2, Q = t.rotation || 0, { x: ct, y: yt } = o.screenToCanvas(
        H.clientX,
        H.clientY
      ), J = Math.atan2(yt - it, ct - ot);
      let dt = !1;
      const wt = (mt) => {
        dt || (dt = !0, o.pushHistorySnapshot());
        const { x: At, y: Nt } = o.screenToCanvas(
          mt.clientX,
          mt.clientY
        ), Lt = Math.atan2(Nt - it, At - ot);
        let ft = Q + (Lt - J) * (180 / Math.PI);
        (mt.shiftKey || o.snapToGrid) && !(mt.metaKey || mt.ctrlKey) && (ft = Math.round(ft / 15) * 15), o.updateNode(t.id, { rotation: ft });
      }, gt = () => {
        $.removeEventListener("pointermove", wt), $.removeEventListener("pointerup", gt);
      };
      $.addEventListener("pointermove", wt), $.addEventListener("pointerup", gt);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), _ = i && v ? {
    left: v.x + b.x * v.w,
    top: v.y + b.y * v.h,
    width: b.w * v.w,
    height: b.h * v.h
  } : null, W = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, Z = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: W
  };
  if (!i && l) {
    const H = l.y * 100, $ = (1 - l.x - l.w) * 100, ot = (1 - l.y - l.h) * 100, it = l.x * 100;
    Z.objectViewBox = `inset(${H}% ${$}% ${ot}% ${it}%)`;
  }
  const tt = 8 / r, K = tt / 2;
  return /* @__PURE__ */ S(
    "div",
    {
      onPointerDown: Y,
      onDoubleClick: !i && n ? (H) => {
        H.stopPropagation(), a == null || a();
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
              /* @__PURE__ */ u(
                "img",
                {
                  ref: g,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: x,
                  style: Z,
                  draggable: !1
                }
              ),
              i && _ && /* @__PURE__ */ u(
                "div",
                {
                  onPointerDown: P,
                  style: {
                    position: "absolute",
                    left: _.left,
                    top: _.top,
                    width: _.width,
                    height: _.height,
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
        i && _ && cu.map(({ pos: H, edges: $, cx: ot, cy: it, cursor: Q }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (ct) => A($, ct),
            style: {
              position: "absolute",
              left: _.left + ot * _.width - K,
              top: _.top + it * _.height - K,
              width: tt,
              height: tt,
              background: "white",
              border: `${1.5 / r}px solid #3b82f6`,
              borderRadius: 2,
              cursor: Q,
              zIndex: 11
            }
          },
          H
        )),
        e && !i && /* @__PURE__ */ S(St, { children: [
          /* @__PURE__ */ u(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: -at,
                width: 1,
                height: at,
                background: "#3b82f6",
                marginLeft: -0.5,
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: O,
              style: {
                position: "absolute",
                left: "50%",
                top: -(at + rt / 2),
                width: rt,
                height: rt,
                marginLeft: -rt / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        xt && G.map(({ pos: H, cx: $, cy: ot }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (it) => {
              it.stopPropagation(), s == null || s(t.id, H, it);
            },
            style: {
              position: "absolute",
              left: `calc(${$ * 100}% - ${st}px)`,
              top: `calc(${ot * 100}% - ${st}px)`,
              width: rt,
              height: rt,
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
const il = Le(du);
function hu(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    il,
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
const uu = {
  type: "image",
  component: hu,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function pu({
  node: t,
  engine: e,
  editing: o,
  editClickPos: n,
  onStopEdit: r,
  onMeasuredHeight: s
}) {
  const i = pt(null), [a, h] = et(t.data.text), c = pt(!1), l = pt(t.data.text), p = pt(null), d = pt(e);
  d.current = e;
  const f = pt(t);
  f.current = t;
  const g = pt(!1);
  Mt(() => {
    o || h(t.data.text);
  }, [t.data.text]), Io(() => {
    var C, z;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const A = i.current.ownerDocument;
      let P = !1;
      if (n) {
        const Y = A.caretRangeFromPoint(n.clientX, n.clientY);
        if (Y && i.current.contains(Y.startContainer)) {
          const G = (C = A.defaultView) == null ? void 0 : C.getSelection();
          G == null || G.removeAllRanges(), G == null || G.addRange(Y), P = !0;
        }
      }
      if (!P) {
        const Y = A.createRange(), G = (z = A.defaultView) == null ? void 0 : z.getSelection();
        i.current.childNodes.length > 0 && (Y.selectNodeContents(i.current), Y.collapse(!1)), G == null || G.removeAllRanges(), G == null || G.addRange(Y);
      }
      l.current = t.data.text, c.current = !1, g.current = !1;
    }
  }, [o]), Mt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const C = l.current, z = e.getNode(t.id);
        if (z && z.type === "text") {
          const A = z.data;
          C !== A.text && (g.current ? (g.current = !1, e.updateNode(t.id, {
            data: { ...A, text: C }
          })) : e.updateNodeWithHistory(t.id, {
            data: { ...A, text: C }
          }));
        }
      };
  }, [o, e, t.id]), Mt(() => {
    if (!i.current || !s) return;
    const C = new ResizeObserver(() => {
      var A;
      const z = ((A = i.current) == null ? void 0 : A.offsetHeight) ?? 0;
      z > 0 && s(t.id, z);
    });
    return C.observe(i.current), () => C.disconnect();
  }, [t.id, s, o]);
  const m = lt(() => {
    var z;
    if (c.current) return;
    c.current = !0, p.current && (clearTimeout(p.current), p.current = null);
    const C = ((z = i.current) == null ? void 0 : z.innerText) ?? "";
    h(C), l.current = C, C !== t.data.text && (g.current ? (g.current = !1, e.updateNode(t.id, {
      data: { ...t.data, text: C }
    })) : e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: C }
    })), r();
  }, [e, t, r]), y = lt(
    (C) => {
      var z;
      C.key === "Escape" && (C.preventDefault(), m(), (z = i.current) == null || z.blur()), C.stopPropagation();
    },
    [m]
  ), x = lt(() => {
    m();
  }, [m]), b = lt(() => {
    if (i.current) {
      const C = i.current.innerText;
      h(C), l.current = C, C !== f.current.data.text && !g.current && (g.current = !0, d.current.pushHistorySnapshot()), p.current && clearTimeout(p.current), p.current = setTimeout(() => {
        const z = f.current;
        C !== z.data.text && d.current.updateNode(z.id, {
          data: { ...z.data, text: C }
        });
      }, 0);
    }
  }, []), w = t.h === "auto" ? void 0 : t.h, v = t.data.opacity ?? 1, M = {
    fontFamily: ko(t.data.fontFamily),
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
        height: w,
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
          onBlur: x,
          onInput: b,
          onPointerDown: (C) => C.stopPropagation(),
          style: { ...M, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ u("div", { ref: i, style: M, children: a || " " })
    }
  );
}
const al = Le(pu);
function fu(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    al,
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
const yu = {
  type: "text",
  component: fu,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function gu(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, n = lt(
    (s) => {
      var a, h;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (h = (a = t.callbacks).onEditEnd) == null || h.call(a);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), r = lt(
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
const mu = {
  type: "frame",
  component: gu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, bu = 100;
function xu({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  editing: s,
  onEditStart: i,
  onEditEnd: a
}) {
  const h = pt(null), c = pt(null), l = pt(""), p = pt(null), d = pt(null), f = pt(t);
  f.current = t;
  const g = pt(o);
  g.current = o;
  const m = pt(!1);
  Mt(() => {
    var M;
    if (s && c.current) {
      const C = c.current;
      C.innerText = t.data.text || "", l.current = t.data.text || "", C.focus();
      const z = C.ownerDocument, A = (M = z.defaultView) == null ? void 0 : M.getSelection(), P = p.current;
      p.current = null;
      let Y = !1;
      if (P && A && z.caretRangeFromPoint) {
        const G = z.caretRangeFromPoint(P.x, P.y);
        G && C.contains(G.startContainer) && (A.removeAllRanges(), A.addRange(G), Y = !0);
      }
      if (!Y && A) {
        const G = z.createRange();
        C.childNodes.length > 0 && (G.selectNodeContents(C), G.collapse(!1)), A.removeAllRanges(), A.addRange(G);
      }
      m.current = !1;
    }
  }, [s]), Mt(() => {
    if (s)
      return () => {
        const M = f.current, C = l.current;
        C !== M.data.text && (m.current ? (m.current = !1, g.current.updateNode(M.id, {
          data: { ...M.data, text: C }
        })) : g.current.updateNodeWithHistory(M.id, {
          data: { ...M.data, text: C }
        }));
      };
  }, [s]);
  const y = lt(() => {
    d.current && (clearTimeout(d.current), d.current = null), c.current && (l.current = c.current.innerText), a();
  }, [a]), x = lt(
    (M) => {
      const C = M.currentTarget.ownerDocument;
      if (M.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: Z, y: tt } = o.screenToCanvas(M.clientX, M.clientY);
        for (const K of o.selection) {
          const H = o.getNode(K);
          if (!H) continue;
          const $ = H.h === "auto" ? 100 : H.h;
          if (Z >= H.x && Z <= H.x + H.w && tt >= H.y && tt <= H.y + $)
            return;
        }
      }
      if (M.stopPropagation(), s) return;
      M.currentTarget.setPointerCapture(M.pointerId), M.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const z = M.clientX, A = M.clientY, P = Array.from(o.selection), Y = [];
      for (const Z of P) {
        const tt = o.getNode(Z);
        tt && Y.push({ id: Z, x: tt.x, y: tt.y });
      }
      if (Y.length === 0) return;
      let G = !1, rt = null, st = z, at = A, xt = !1;
      const O = () => {
        rt = null;
        const Z = (st - z) / o.viewport.zoom, tt = (at - A) / o.viewport.zoom, { finalDx: K, finalDy: H } = o.computeDragSnap(
          Y,
          P,
          Z,
          tt,
          xt
        ), $ = Y.map((ot) => ({
          id: ot.id,
          patch: { x: ot.x + K, y: ot.y + H }
        }));
        o.updateMany($);
      }, _ = (Z) => {
        const tt = (Z.clientX - z) / o.viewport.zoom, K = (Z.clientY - A) / o.viewport.zoom;
        if (!G)
          if (Math.abs(tt) > 2 || Math.abs(K) > 2)
            G = !0, o.pushHistorySnapshot();
          else
            return;
        st = Z.clientX, at = Z.clientY, xt = Z.metaKey || Z.ctrlKey, rt === null && (rt = requestAnimationFrame(O));
      }, W = () => {
        rt !== null && (cancelAnimationFrame(rt), O()), o.clearAlignGuides(), C.removeEventListener("pointermove", _), C.removeEventListener("pointerup", W);
      };
      C.addEventListener("pointermove", _), C.addEventListener("pointerup", W);
    },
    [o, t.id, s]
  ), b = lt(
    (M) => {
      if (n) {
        if (M.stopPropagation(), t.groupId) {
          const C = [];
          let z = t.groupId;
          for (; z; )
            C.push(z), z = o.groupParent.get(z);
          if (!o.activeGroupId) {
            o.enterGroup(C[C.length - 1]), o.select(t.id);
            return;
          }
          const A = C.indexOf(o.activeGroupId);
          if (A > 0) {
            o.enterGroup(C[A - 1]), o.select(t.id);
            return;
          }
        }
        s || (p.current = { x: M.clientX, y: M.clientY }, o.select(t.id), i(t.id));
      }
    },
    [n, s, o, t.id, t.groupId, i]
  ), w = t.data.fontSize ?? 16, v = t.h === "auto" ? bu : t.h;
  return /* @__PURE__ */ u(
    "div",
    {
      ref: h,
      "data-node-id": t.id,
      className: n ? void 0 : "sb-block-inert",
      onPointerDown: n ? x : void 0,
      onDoubleClick: b,
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
        pointerEvents: n ? "auto" : "none",
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
                c.current && (l.current = c.current.innerText, l.current !== f.current.data.text && !m.current && (m.current = !0, g.current.pushHistorySnapshot()), d.current && clearTimeout(d.current), d.current = setTimeout(() => {
                  const C = f.current, z = l.current;
                  z !== C.data.text && g.current.updateNode(C.id, {
                    data: { ...C.data, text: z }
                  });
                }, 0));
              },
              onKeyDown: (M) => {
                M.key === "Escape" && (M.stopPropagation(), y()), M.stopPropagation();
              },
              onPointerDown: (M) => M.stopPropagation(),
              style: {
                fontSize: w,
                fontFamily: ko(wo),
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
                fontSize: w,
                fontFamily: ko(wo),
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
const ll = Le(xu);
function wu(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    ll,
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
const ku = {
  type: "sticky",
  component: wu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, cl = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function vu(t) {
  const e = t.match(cl);
  return e ? e[1] : null;
}
function Su(t) {
  return cl.test(t);
}
function Mu(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function Cu(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function Iu({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  editing: s,
  onResizeHandleDown: i,
  onEditStart: a
}) {
  const h = t.h, { data: c } = t, l = (g) => {
    if (n && s) {
      g.stopPropagation();
      return;
    }
  }, p = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", d = Math.max(6, 8 / r), f = [
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
      onPointerDown: l,
      onDoubleClick: !s && n ? (g) => {
        g.stopPropagation(), a == null || a();
      } : void 0,
      style: {
        position: "absolute",
        left: t.x + t.w / 2,
        top: t.y + h / 2,
        width: t.w,
        height: h,
        marginLeft: -t.w / 2,
        marginTop: -h / 2,
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
              border: p,
              boxSizing: "border-box",
              opacity: c.opacity ?? 1
            },
            children: [
              /* @__PURE__ */ u(
                "iframe",
                {
                  src: Mu(c.videoId),
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
        e && n && !s && f.map((g) => /* @__PURE__ */ u(
          "div",
          {
            "data-handle": g.key,
            onPointerDown: (m) => {
              m.stopPropagation(), i == null || i(t.id, g.key, m);
            },
            style: {
              position: "absolute",
              left: g.x,
              top: g.y,
              width: d,
              height: d,
              marginLeft: -d / 2,
              marginTop: -d / 2,
              background: "#fff",
              border: "1px solid #3b82f6",
              borderRadius: 2,
              cursor: g.cursor,
              zIndex: 1
            }
          },
          g.key
        ))
      ]
    }
  );
}
const zu = Le(Iu);
function Tu(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    zu,
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
const Pu = {
  type: "youtube",
  component: Tu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, Au = [
  ih,
  ru,
  iu,
  lu,
  uu,
  yu,
  mu,
  ku,
  Pu
];
class Eu {
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
      const a = this.spatial.getEdgesForNode(e);
      let h = !1;
      for (const c of a) {
        const l = c.data;
        if (l.toId === e && l.targetPort === i.id) {
          const p = this.values.get(
            Do(l.fromId, l.sourcePort ?? "")
          );
          n[i.id] = p ?? i.defaultValue ?? null, h = !0;
          break;
        }
      }
      h || (n[i.id] = i.defaultValue ?? null);
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
        let a = !1;
        for (const h of i) {
          const c = h.data;
          if (c.toId === e && c.targetPort === s.id) {
            n[s.id] = this.values.get(Do(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, a = !0;
            break;
          }
        }
        a || (n[s.id] = s.defaultValue ?? null);
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
    for (const g of this.spatial.nodes.values()) {
      const m = this.registry.get(g.type);
      m != null && m.ports && m.compute && e.add(g.id);
    }
    if (e.size === 0) {
      const g = this._cycleNodeIds.size > 0;
      return g && (this._cycleNodeIds = /* @__PURE__ */ new Set()), { sorted: [], cyclesChanged: g };
    }
    const o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    for (const g of e)
      o.set(g, /* @__PURE__ */ new Set()), n.set(g, 0);
    const r = this.spatial.getAllEdges();
    for (const g of r) {
      const m = g.data;
      m.sourcePort && m.targetPort && e.has(m.fromId) && e.has(m.toId) && (o.get(m.fromId).add(m.toId), n.set(m.toId, (n.get(m.toId) ?? 0) + 1));
    }
    const s = new Set(this.dirty), i = /* @__PURE__ */ new Set(), a = (g) => {
      if (i.has(g)) return;
      i.add(g);
      const m = o.get(g);
      if (m)
        for (const y of m)
          s.add(y), a(y);
    };
    for (const g of [...this.dirty])
      a(g);
    const h = /* @__PURE__ */ new Map();
    for (const g of s)
      h.set(g, 0);
    for (const g of r) {
      const m = g.data;
      m.sourcePort && m.targetPort && s.has(m.fromId) && s.has(m.toId) && h.set(
        m.toId,
        (h.get(m.toId) ?? 0) + 1
      );
    }
    const c = [];
    for (const [g, m] of h)
      m === 0 && c.push(g);
    const l = [];
    for (; c.length > 0; ) {
      const g = c.shift();
      l.push(g);
      const m = o.get(g);
      if (m)
        for (const y of m) {
          if (!s.has(y)) continue;
          const x = (h.get(y) ?? 1) - 1;
          h.set(y, x), x === 0 && c.push(y);
        }
    }
    const p = new Set(l), d = /* @__PURE__ */ new Set();
    for (const g of s)
      p.has(g) || d.add(g);
    let f = !1;
    return (d.size !== this._cycleNodeIds.size || [...d].some((g) => !this._cycleNodeIds.has(g))) && (this._cycleNodeIds = d, f = !0), { sorted: l, cyclesChanged: f };
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
      const h = ++this.generation;
      return i.then((c) => {
        if (h !== this.generation) return;
        const l = typeof performance < "u" ? performance.now() : 0;
        this.lastComputeMs.set(e, l - s), this.applyOutputs(e, n.ports, c) && (this.markDownstream(e), this.notifyListeners(), this.dirty.size > 0 && this.scheduleFlush());
      }), !1;
    }
    const a = typeof performance < "u" ? performance.now() : 0;
    return this.lastComputeMs.set(e, a - s), this.applyOutputs(e, n.ports, i);
  }
  /** Apply computed outputs to the values map. Returns true if any value changed. */
  applyOutputs(e, o, n) {
    let r = !1;
    for (const s of o) {
      if (s.direction !== "output") continue;
      const i = Do(e, s.id), a = n[s.id] ?? null, h = this.values.get(i) ?? null;
      Lu(h, a) || (this.values.set(i, a), r = !0);
    }
    return r && this.markDownstream(e), r;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function Lu(t, e) {
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
const fn = [
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
function Fn(t) {
  return fn.find((e) => e.key === t) ?? fn[1];
}
function Ru() {
  return {
    staticDefs: /* @__PURE__ */ S("filter", { id: "paper-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.08", numOctaves: 4, seed: 12, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ u("feDiffuseLighting", { in: "bump", lightingColor: "#f7f4ee", surfaceScale: "1.2", diffuseConstant: "1", result: "lit", children: /* @__PURE__ */ u("feDistantLight", { azimuth: "225", elevation: "50" }) }),
      /* @__PURE__ */ u("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ u("feFlood", { floodColor: "#f5f0e8", result: "base" }),
      /* @__PURE__ */ u("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "paper" }),
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.6", numOctaves: 3, seed: 7, stitchTiles: "stitch", result: "grain" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "grain", type: "saturate", values: "0", result: "grain-gray" }),
      /* @__PURE__ */ S("feComponentTransfer", { in: "grain-gray", result: "grain-subtle", children: [
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
function Du() {
  return {
    staticDefs: /* @__PURE__ */ S("filter", { id: "kraft-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.04", numOctaves: 5, seed: 42, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ u("feDiffuseLighting", { in: "bump", lightingColor: "#e0c9a6", surfaceScale: "1.4", diffuseConstant: "0.95", result: "lit", children: /* @__PURE__ */ u("feDistantLight", { azimuth: "200", elevation: "50" }) }),
      /* @__PURE__ */ u("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ u("feFlood", { floodColor: "#d4b896", result: "base" }),
      /* @__PURE__ */ u("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "kraft" }),
      /* @__PURE__ */ u("feTurbulence", { type: "fractalNoise", baseFrequency: "0.35", numOctaves: 2, seed: 99, stitchTiles: "stitch", result: "fiber" }),
      /* @__PURE__ */ u("feColorMatrix", { in: "fiber", type: "saturate", values: "0", result: "fiber-gray" }),
      /* @__PURE__ */ S("feComponentTransfer", { in: "fiber-gray", result: "fiber-subtle", children: [
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
const os = {
  "japanese-stationery": Ru,
  kraft: Du
};
function Wu(t) {
  var e;
  return ((e = os[t]) == null ? void 0 : e.call(os)) ?? {};
}
const dl = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, Bu = {
  ...dl,
  willChange: "transform"
}, Nu = Le(function({
  background: e
}) {
  const o = Fn(e), { staticDefs: n, staticLayers: r } = Wu(e);
  return /* @__PURE__ */ S("svg", { style: Bu, children: [
    n && /* @__PURE__ */ u("defs", { children: n }),
    /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    r
  ] });
});
function Fu({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: n = !0
}) {
  const r = e * t.zoom, s = t.x % r, i = t.y % r, h = Fn(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(Nu, { background: o }),
    n && /* @__PURE__ */ S("svg", { style: dl, children: [
      /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ u(
        "pattern",
        {
          id: "grid-dots",
          x: s,
          y: i,
          width: r,
          height: r,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ u("circle", { cx: r / 2, cy: r / 2, r: 1.5, fill: h })
        }
      ) }),
      /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: "url(#grid-dots)" })
    ] })
  ] });
}
const Ps = {
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
}, hl = vr(Ps);
function ee() {
  return Ke(hl);
}
const As = {
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
}, ul = vr({
  dir: "ltr",
  isRTL: !1,
  labels: As
});
function Hu(t) {
  var e;
  return t === "rtl" || t === "ltr" ? t : typeof document < "u" && ((e = document.dir) == null ? void 0 : e.toLowerCase()) === "rtl" ? "rtl" : "ltr";
}
function Ou(t, e) {
  return Ut(() => {
    const o = Hu(t), { customNodeDocs: n, ...r } = e ?? {};
    return {
      dir: o,
      isRTL: o === "rtl",
      labels: {
        ...As,
        ...r,
        customNodeDocs: {
          ...As.customNodeDocs,
          ...n ?? {}
        }
      }
    };
  }, [t, e]);
}
function Jt() {
  return Ke(ul);
}
const Pn = 168, An = 112, un = 6, sr = Pn - un * 2, ir = An - un * 2;
function pl(t, e) {
  return t.h === "auto" ? e[t.id] ?? 100 : t.h;
}
function Xu(t, e, o, n, r) {
  let s = 1 / 0, i = 1 / 0, a = -1 / 0, h = -1 / 0;
  for (const m of t) {
    if (m.type === "edge") continue;
    const y = pl(m, e);
    s = Math.min(s, m.x), i = Math.min(i, m.y), a = Math.max(a, m.x + m.w), h = Math.max(h, m.y + y);
  }
  const c = o.zoom, l = (0 - o.x) / c, p = (0 - o.y) / c, d = (n - o.x) / c, f = (r - o.y) / c;
  if (!Number.isFinite(s))
    return {
      minX: Math.min(l, d) - 80,
      minY: Math.min(p, f) - 80,
      maxX: Math.max(l, d) + 80,
      maxY: Math.max(p, f) + 80
    };
  const g = 48;
  return s -= g, i -= g, a += g, h += g, s = Math.min(s, l, d), i = Math.min(i, p, f), a = Math.max(a, l, d), h = Math.max(h, p, f), { minX: s, minY: i, maxX: a, maxY: h };
}
function Yu({
  engine: t,
  nodes: e,
  viewport: o,
  containerSize: n,
  measuredHeights: r
}) {
  const s = ee(), { labels: i } = Jt(), [a, h] = et(() => t.presentationMode), c = pt(null), l = pt(!1), [p, d] = et(!1);
  Mt(() => {
    const Q = () => h(t.presentationMode);
    return t.on("presentation", Q), () => t.off("presentation", Q);
  }, [t]);
  const { minX: f, minY: g, maxX: m, maxY: y, scale: x, offsetX: b, offsetY: w } = Ut(() => {
    const { w: Q, h: ct } = n;
    if (Q <= 0 || ct <= 0)
      return { minX: 0, minY: 0, maxX: 1, maxY: 1, scale: 1, offsetX: 0, offsetY: 0 };
    const yt = Xu(e, r, o, Q, ct), J = Math.max(yt.maxX - yt.minX, 1e-6), dt = Math.max(yt.maxY - yt.minY, 1e-6), wt = Math.min(sr / J, ir / dt), gt = J * wt, mt = dt * wt;
    return {
      minX: yt.minX,
      minY: yt.minY,
      maxX: yt.maxX,
      maxY: yt.maxY,
      scale: wt,
      offsetX: (sr - gt) / 2,
      offsetY: (ir - mt) / 2
    };
  }, [e, r, o, n]), v = lt(
    (Q, ct) => {
      const { w: yt, h: J } = n;
      if (yt <= 0 || J <= 0) return;
      const dt = t.viewport.zoom, { x: wt, y: gt } = t.viewport, mt = yt / 2 - Q * dt, At = J / 2 - ct * dt;
      t.pan(mt - wt, At - gt);
    },
    [n, t]
  ), M = lt((Q, ct) => {
    const yt = c.current;
    if (!yt) return null;
    const J = yt.getBoundingClientRect();
    if (J.width <= 0 || J.height <= 0) return null;
    const dt = (Q - J.left) / J.width * Pn, wt = (ct - J.top) / J.height * An, gt = dt - un, mt = wt - un;
    return gt < -0.5 || mt < -0.5 || gt > sr + 0.5 || mt > ir + 0.5 ? null : { ix: gt, iy: mt };
  }, []), C = lt(
    (Q, ct) => ({
      wx: f + (Q - b) / x,
      wy: g + (ct - w) / x
    }),
    [f, g, b, w, x]
  ), z = lt(
    (Q, ct) => {
      const yt = M(Q, ct);
      if (!yt) return;
      const { wx: J, wy: dt } = C(yt.ix, yt.iy);
      v(J, dt);
    },
    [M, C, v]
  ), A = lt(
    (Q) => {
      Q.stopPropagation(), Q.button === 0 && (l.current = !0, d(!0), Q.currentTarget.setPointerCapture(Q.pointerId), z(Q.clientX, Q.clientY));
    },
    [z]
  ), P = lt(
    (Q) => {
      l.current && z(Q.clientX, Q.clientY);
    },
    [z]
  ), Y = lt((Q) => {
    l.current = !1, d(!1);
    try {
      Q.currentTarget.releasePointerCapture(Q.pointerId);
    } catch {
    }
  }, []);
  if (a || n.w <= 0 || n.h <= 0)
    return null;
  const G = o.zoom, rt = n.w, st = n.h, at = (0 - o.x) / G, xt = (0 - o.y) / G, O = (rt - o.x) / G, _ = (st - o.y) / G, W = b + (at - f) * x, Z = w + (xt - g) * x, tt = Math.max(2, (O - at) * x), K = Math.max(2, (_ - xt) * x), H = [];
  for (const Q of e) {
    if (Q.type === "edge") continue;
    const ct = pl(Q, r), yt = b + (Q.x - f) * x, J = w + (Q.y - g) * x, dt = Math.max(1.5, Q.w * x), wt = Math.max(1.5, ct * x);
    H.push(
      /* @__PURE__ */ u(
        "rect",
        {
          x: yt,
          y: J,
          width: dt,
          height: wt,
          rx: 1,
          fill: s.accentColor,
          fillOpacity: 0.45,
          stroke: "none"
        },
        Q.id
      )
    );
  }
  const $ = s.border, ot = s.controlBg, it = s.accentColor;
  return /* @__PURE__ */ u(
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
      onPointerDown: (Q) => Q.stopPropagation(),
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
            cursor: p ? "grabbing" : "grab",
            borderRadius: s.controlBorderRadius,
            overflow: "hidden"
          },
          onPointerDown: A,
          onPointerMove: P,
          onPointerUp: Y,
          onPointerCancel: Y,
          children: [
            /* @__PURE__ */ u("rect", { x: 0, y: 0, width: Pn, height: An, fill: ot, stroke: $, strokeWidth: 1 }),
            /* @__PURE__ */ S("g", { transform: `translate(${un}, ${un})`, children: [
              /* @__PURE__ */ u(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: sr,
                  height: ir,
                  fill: "rgba(255,255,255,0.04)",
                  stroke: $,
                  strokeOpacity: 0.5,
                  strokeWidth: 0.5
                }
              ),
              H,
              /* @__PURE__ */ u(
                "rect",
                {
                  x: W,
                  y: Z,
                  width: tt,
                  height: K,
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
const fl = "sb-excalib-index", Js = "sb-excalib-";
function Pr() {
  try {
    const t = localStorage.getItem(fl);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function yl(t) {
  localStorage.setItem(fl, JSON.stringify(t));
}
function Gu(t) {
  try {
    const e = localStorage.getItem(Js + t);
    return e ? $s(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function $s(t) {
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
function gl() {
  return Pr();
}
function _s(t) {
  const e = Gu(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function ti(t, e) {
  const o = $s(t), n = Rt(10), r = o.libraryItems.map((a) => a.name || "Untitled"), s = {
    id: n,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: r
  };
  localStorage.setItem(Js + n, JSON.stringify(o));
  const i = Pr();
  return i.push(s), yl(i), s;
}
function ju(t) {
  localStorage.removeItem(Js + t);
  const e = Pr().filter((o) => o.id !== t);
  yl(e);
}
function Vu(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], n = Pr();
  for (const r of n) {
    if (!r.itemNames.some((a) => a.toLowerCase().includes(e)) && !r.name.toLowerCase().includes(e)) continue;
    const i = _s(r.id);
    for (const a of i)
      ((a.name || "").toLowerCase().includes(e) || r.name.toLowerCase().includes(e)) && o.push({ library: r, item: a });
  }
  return o;
}
async function Ku(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const n = await o.json();
  if (n.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const r = $s(n);
  return ti(r, { name: e, source: t });
}
function ml(t) {
  const e = t.visualViewport;
  return {
    vw: (e == null ? void 0 : e.width) ?? t.innerWidth,
    vh: (e == null ? void 0 : e.height) ?? t.innerHeight
  };
}
const bl = 8;
function xl(t, e, o, n, r, s = bl) {
  const { vw: i, vh: a } = ml(r);
  let h = t;
  h + o + s > i && (h = t - o), h = Math.max(s, Math.min(h, i - o - s));
  let c = e;
  if (n + s * 2 <= a) {
    if (c + n + s > a) {
      const d = e - n;
      e - s >= n ? c = d : c = a - n - s;
    }
    c < s && (c = s);
  } else
    c = s;
  const p = Math.max(s, a - n - s);
  return c = Math.max(s, Math.min(c, p)), { left: h, top: c };
}
function wl(t, e, o, n, r) {
  const i = bl, { vw: a, vh: h } = ml(n);
  let c = t.right + 8;
  c + e + i > a && (c = t.left - e - 8), c < i && (c = i), c = Math.max(i, Math.min(c, a - e - i));
  let l = t.top;
  l + o + i > h && (l = h - o - i), l < i && (l = i);
  const p = Math.max(i, h - o - i);
  return l = Math.max(i, Math.min(l, p)), { left: c, top: l };
}
function kl(t, e, o, n = []) {
  Io(() => {
    if (!t) return;
    const r = o.current;
    if (!r) return;
    const s = r.ownerDocument.defaultView ?? window, i = () => {
      var p;
      const h = (p = e.current) == null ? void 0 : p.getBoundingClientRect();
      if (!h) return;
      const c = r.getBoundingClientRect(), l = wl(h, c.width, c.height, s);
      r.style.left = `${l.left}px`, r.style.top = `${l.top}px`;
    };
    i();
    const a = new ResizeObserver(i);
    return a.observe(r), () => a.disconnect();
  }, [t, e, o, ...n]);
}
function ei(t, e, o, n = []) {
  Io(() => {
    if (!t || !e) return;
    const r = o.current;
    if (!r) return;
    const s = r.ownerDocument.defaultView ?? window, i = () => {
      const h = r.getBoundingClientRect(), c = wl(e, h.width, h.height, s);
      r.style.left = `${c.left}px`, r.style.top = `${c.top}px`;
    };
    i();
    const a = new ResizeObserver(i);
    return a.observe(r), () => a.disconnect();
  }, [t, e, o, ...n]);
}
function Hn(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function Yo(t) {
  if (t)
    return t * (180 / Math.PI);
}
function vl(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function Sl(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function Ml(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function Cl(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function Il(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function qu(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function ns(t, e) {
  return {
    id: Rt(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: Yo(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: vl(t.backgroundColor),
      fillStyle: Sl(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Ml(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: Hn(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? qu(t) : void 0
    }
  };
}
function ea(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const n = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Ml(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: Hn(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [a, h] = o, c = Math.min(a[0], h[0]), l = Math.min(a[1], h[1]), p = Math.max(a[0], h[0]), d = Math.max(a[1], h[1]), f = Math.max(p - c, 1), g = Math.max(d - l, 1);
    return [
      {
        id: Rt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + l,
        w: f,
        h: g,
        z: 0,
        rotation: Yo(t.angle),
        locked: t.locked || void 0,
        data: {
          ...n,
          shape: e ? "arrow" : "line",
          startPoint: [a[0] - c, a[1] - l],
          endPoint: [h[0] - c, h[1] - l]
        }
      }
    ];
  }
  if (t.backgroundColor && t.backgroundColor !== "transparent") {
    const a = Uu(t);
    if (a) return [a];
  }
  const s = Rt(10), i = [];
  for (let a = 0; a < o.length - 1; a++) {
    const h = o[a], c = o[a + 1], l = Math.min(h[0], c[0]), p = Math.min(h[1], c[1]), d = Math.max(h[0], c[0]), f = Math.max(h[1], c[1]), g = Math.max(d - l, 1), m = Math.max(f - p, 1), y = a === o.length - 2;
    i.push({
      id: Rt(10),
      type: "shape",
      x: t.x + l,
      y: t.y + p,
      w: g,
      h: m,
      z: 0,
      rotation: Yo(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...n,
        shape: e && y ? "arrow" : "line",
        startPoint: [h[0] - l, h[1] - p],
        endPoint: [c[0] - l, c[1] - p]
      }
    });
  }
  return i;
}
function Uu(t) {
  const e = t.points ?? [];
  if (e.length < 3) return null;
  let o = 1 / 0, n = 1 / 0, r = -1 / 0, s = -1 / 0;
  for (const [a, h] of e)
    a < o && (o = a), h < n && (n = h), a > r && (r = a), h > s && (s = h);
  if (!isFinite(o)) return null;
  const i = e.map(([a, h]) => [
    a - o,
    h - n,
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
    rotation: Yo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: Hn(t.opacity ?? 100),
      fill: vl(t.backgroundColor),
      fillStyle: Sl(t.fillStyle)
    }
  };
}
function Zu(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, n = t.simulatePressure !== !1, r = e.map((l, p) => {
    const d = !n && o && p < o.length ? o[p] : 0.5;
    return [l[0], l[1], d];
  });
  let s = 1 / 0, i = 1 / 0, a = -1 / 0, h = -1 / 0;
  for (const [l, p] of r)
    l < s && (s = l), p < i && (i = p), l > a && (a = l), p > h && (h = p);
  isFinite(s) || (s = 0, i = 0, a = 0, h = 0);
  const c = r.map(
    ([l, p, d]) => [l - s, p - i, d]
  );
  return {
    id: Rt(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(a - s, 1),
    h: Math.max(h - i, 1),
    z: 0,
    rotation: Yo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: Hn(t.opacity ?? 100)
    }
  };
}
function Qu(t) {
  return {
    id: Rt(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: Yo(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: Cl(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Il(t.textAlign),
      opacity: Hn(t.opacity ?? 100)
    }
  };
}
function Ju(t) {
  return {
    id: Rt(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: Yo(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function zl(t) {
  return $u(t.elements);
}
function $u(t) {
  const e = [], o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && r.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [ns(s, "rect")];
        break;
      case "ellipse":
        i = [ns(s, "ellipse")];
        break;
      case "diamond":
        i = [ns(s, "diamond")];
        break;
      case "arrow":
        i = ea(s, !0);
        break;
      case "line":
        i = ea(s, !1);
        break;
      case "freedraw": {
        const a = Zu(s);
        a && (i = [a]);
        break;
      }
      case "text":
        i = [Qu(s)];
        break;
      case "frame":
      case "magicframe":
        i = [Ju(s)];
        break;
      case "image":
        continue;
      default:
        continue;
    }
    i.length > 0 && o.set(s.id, i[0].id), e.push(...i);
  }
  for (const [s, i] of r) {
    const a = o.get(s);
    if (!a) continue;
    const h = e.find((l) => l.id === a);
    if (!h || h.type !== "shape") continue;
    const c = h.data;
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = Cl(i.fontFamily), c.labelAlign = Il(i.textAlign);
  }
  return _u(t, e, o, n), tp(e), { nodes: e, groupParent: n };
}
function _u(t, e, o, n) {
  var s;
  const r = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (i.isDeleted || !((s = i.groupIds) != null && s.length)) continue;
    for (let h = 0; h < i.groupIds.length - 1; h++) {
      const c = i.groupIds[h], l = i.groupIds[h + 1];
      r.has(c) || r.set(c, l);
    }
    const a = o.get(i.id);
    if (a) {
      const h = e.find((c) => c.id === a);
      h && (h.groupId = i.groupIds[0]);
    }
  }
  for (const [i, a] of r)
    n.set(i, a);
}
function tp(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const n of t)
    n.x < e && (e = n.x), n.y < o && (o = n.y);
  if (isFinite(e))
    for (const n of t)
      n.x -= e, n.y -= o;
}
function oi(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, n = 1 / 0, r = -1 / 0, s = -1 / 0;
  for (const p of t) {
    const d = p.h === "auto" ? 40 : p.h;
    o = Math.min(o, p.x), n = Math.min(n, p.y), r = Math.max(r, p.x + p.w), s = Math.max(s, p.y + d);
  }
  const i = r - o || 1, a = s - n || 1, h = 4, c = `${o - h} ${n - h} ${i + h * 2} ${a + h * 2}`, l = [];
  for (const p of t)
    switch (p.type) {
      case "shape":
        l.push(ep(p));
        break;
      case "draw":
        l.push(op(p));
        break;
      case "text":
        l.push(np(p));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${l.join("")}</svg>`;
}
function Tl(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function ep(t) {
  var d, f, g, m;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, n = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: no(e.strokeStyle),
    seed: t.id
  }, r = ((d = e.startPoint) == null ? void 0 : d[0]) ?? 0, s = ((f = e.startPoint) == null ? void 0 : f[1]) ?? o / 2, i = ((g = e.endPoint) == null ? void 0 : g[0]) ?? t.w, a = ((m = e.endPoint) == null ? void 0 : m[1]) ?? o / 2;
  let h;
  switch (e.shape) {
    case "rect":
      h = Wn(t.x, t.y, t.w, o, n, e.edgeStyle === "round");
      break;
    case "ellipse":
      h = Ir(t.x + t.w / 2, t.y + o / 2, t.w, o, n);
      break;
    case "diamond":
      h = zr(t.x, t.y, t.w, o, n, e.edgeStyle === "round");
      break;
    case "line":
      h = Ho(t.x + r, t.y + s, t.x + i, t.y + a, n);
      break;
    case "arrow":
      h = Tr(t.x + r, t.y + s, t.x + i, t.y + a, n);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, l = c < 1 ? `<g opacity="${c}">` : "<g>", p = h.map(
    (y) => `<path d="${Tl(y.d)}" fill="${y.fill || "none"}" stroke="${y.stroke}" stroke-width="${y.strokeWidth}"${y.strokeDasharray ? ` stroke-dasharray="${y.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${l}${p.join("")}</g>`;
}
function op(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), n = e.opacity ?? 1, r = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${r}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${n < 1 ? ` opacity="${n}"` : ""}/>`;
}
function np(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), n = e.opacity ?? 1, r = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${n < 1 ? ` opacity="${n}"` : ""}>${Tl(r)}</text>`;
}
const Pl = "sb-personal-library";
function ni() {
  try {
    const t = localStorage.getItem(Pl);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Al(t) {
  localStorage.setItem(Pl, JSON.stringify(t));
}
function El() {
  return ni();
}
function rp(t, e, o) {
  const n = structuredClone(e);
  if (n.length > 0) {
    let h = 1 / 0, c = 1 / 0;
    for (const l of n)
      l.x < h && (h = l.x), l.y < c && (c = l.y);
    if (isFinite(h))
      for (const l of n)
        l.x -= h, l.y -= c;
  }
  const r = new Set(
    n.map((h) => h.groupId).filter(Boolean)
  ), s = [];
  for (const [h, c] of o)
    r.has(h) && s.push([h, c]);
  const i = {
    id: Rt(10),
    name: t.trim() || "Untitled",
    nodes: n,
    groupParent: s,
    createdAt: Date.now()
  }, a = ni();
  return a.unshift(i), Al(a), i;
}
function sp(t) {
  const e = ni().filter((o) => o.id !== t);
  Al(e);
}
function Ll(t, e, o, n) {
  const { nodes: r, groupParent: s } = zl(e);
  if (r.length === 0) return;
  const i = structuredClone(r), a = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  for (const b of i) {
    const w = Rt(10);
    a.set(b.id, w), b.id = w;
  }
  for (const b of i)
    b.groupId && (h.has(b.groupId) || h.set(b.groupId, Rt(10)), b.groupId = h.get(b.groupId));
  let c = 1 / 0, l = 1 / 0, p = -1 / 0, d = -1 / 0;
  for (const b of i) {
    const w = b.h === "auto" ? 100 : b.h;
    c = Math.min(c, b.x), l = Math.min(l, b.y), p = Math.max(p, b.x + b.w), d = Math.max(d, b.y + w);
  }
  const f = o ?? window.innerWidth / 2, g = n ?? window.innerHeight / 2, m = t.screenToCanvas(f, g), y = m.x - (c + p) / 2, x = m.y - (l + d) / 2;
  for (const b of i)
    b.x += y, b.y += x, b.z = t.nextZ();
  t.addNodes(i);
  for (const [b, w] of s) {
    const v = h.get(b) ?? b, M = h.get(w) ?? w;
    t.groupParent.set(v, M);
  }
  t.selectMultiple(i.map((b) => b.id));
}
const Es = "application/x-spatialboard-library-item", Ls = "application/x-spatialboard-personal-item";
function Rl(t, e, o, n) {
  if (e.nodes.length === 0) return;
  const r = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const y of r) {
    const x = Rt(10);
    s.set(y.id, x), y.id = x;
  }
  for (const y of r)
    y.groupId && (i.has(y.groupId) || i.set(y.groupId, Rt(10)), y.groupId = i.get(y.groupId));
  for (const y of r)
    if (y.type === "edge") {
      const x = y.data;
      x.fromId && s.has(x.fromId) && (x.fromId = s.get(x.fromId)), x.toId && s.has(x.toId) && (x.toId = s.get(x.toId));
    }
  let a = 1 / 0, h = 1 / 0, c = -1 / 0, l = -1 / 0;
  for (const y of r) {
    const x = y.h === "auto" ? 100 : y.h;
    a = Math.min(a, y.x), h = Math.min(h, y.y), c = Math.max(c, y.x + y.w), l = Math.max(l, y.y + x);
  }
  const p = o ?? window.innerWidth / 2, d = n ?? window.innerHeight / 2, f = t.screenToCanvas(p, d), g = f.x - (a + c) / 2, m = f.y - (h + l) / 2;
  for (const y of r)
    y.x += g, y.y += m, y.z = t.nextZ();
  t.addNodes(r);
  for (const [y, x] of e.groupParent) {
    const b = i.get(y) ?? y, w = i.get(x) ?? x;
    t.groupParent.set(b, w);
  }
  t.selectMultiple(r.map((y) => y.id));
}
const yn = /* @__PURE__ */ new Map();
function ip({ item: t }) {
  const e = Ut(() => {
    const o = yn.get(t.id);
    if (o) return o;
    const { nodes: n } = zl(t), r = oi(n, 56);
    return yn.set(t.id, r), r;
  }, [t.id]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Dl({
  item: t,
  libId: e,
  onClick: o,
  theme: n
}) {
  const { labels: r } = Jt(), s = lt(
    (i) => {
      i.dataTransfer.setData(
        Es,
        JSON.stringify({ libraryId: e, itemId: t.id })
      ), i.dataTransfer.effectAllowed = "copy";
    },
    [e, t.id]
  );
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ u(ip, { item: t })
    }
  );
}
function ap({ nodes: t }) {
  const e = Ut(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), n = yn.get(o);
    if (n) return n;
    const r = oi(t, 56);
    return yn.set(o, r), r;
  }, [t]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Wl({
  item: t,
  onClick: e,
  onRemove: o,
  theme: n
}) {
  const { labels: r } = Jt(), [s, i] = et(!1), a = lt(
    (h) => {
      h.dataTransfer.setData(
        Ls,
        JSON.stringify({ itemId: t.id })
      ), h.dataTransfer.effectAllowed = "copy";
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
        /* @__PURE__ */ u(
          "button",
          {
            title: t.name,
            onClick: e,
            draggable: !0,
            onDragStart: a,
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
            children: /* @__PURE__ */ u(ap, { nodes: t.nodes })
          }
        ),
        s && /* @__PURE__ */ u(
          "button",
          {
            title: r.librariesRemoveFromPersonal,
            onClick: (h) => {
              h.stopPropagation(), o();
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
function lp({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n,
  onBrowseDirectory: r
}) {
  const s = ee(), { labels: i } = Jt(), a = pt(null), h = pt(null), [c, l] = et([]), [p, d] = et([]), [f, g] = et(""), [m, y] = et(/* @__PURE__ */ new Set());
  ei(e && !!n, n, a, [
    c.length,
    p.length,
    f,
    m.size
  ]);
  const x = lt(() => {
    l(gl()), d(El());
  }, []);
  Mt(() => {
    e && x();
  }, [e, x]), Mt(() => {
    if (!e) return;
    const P = (Y) => {
      a.current && !a.current.contains(Y.target) && o();
    };
    return document.addEventListener("pointerdown", P), () => document.removeEventListener("pointerdown", P);
  }, [e, o]);
  const b = lt(
    (P) => {
      var rt;
      const Y = (rt = P.target.files) == null ? void 0 : rt[0];
      if (!Y) return;
      const G = new FileReader();
      G.onload = () => {
        try {
          const st = JSON.parse(G.result);
          if (st.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const at = Y.name.replace(/\.excalidrawlib$/, "");
          ti(st, { name: at }), x();
        } catch (st) {
          console.error("Failed to parse library file:", st);
        }
      }, G.readAsText(Y), P.target.value = "";
    },
    [x]
  ), w = lt(
    (P) => {
      ju(P), yn.clear(), x();
    },
    [x]
  ), v = lt(
    (P) => {
      Ll(t, P);
    },
    [t]
  ), M = lt(
    (P) => {
      Rl(t, P);
    },
    [t]
  ), C = lt(
    (P) => {
      sp(P), yn.clear(), x();
    },
    [x]
  ), z = lt((P) => {
    y((Y) => {
      const G = new Set(Y);
      return G.has(P) ? G.delete(P) : G.add(P), G;
    });
  }, []), A = Ut(() => {
    if (!f.trim()) return null;
    const P = f.toLowerCase(), Y = Vu(f), G = p.filter(
      (rt) => rt.name.toLowerCase().includes(P)
    );
    return { excalidraw: Y, personal: G };
  }, [f, p]);
  return !e || !n ? null : Ze(
    /* @__PURE__ */ S(
      "div",
      {
        ref: a,
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
        onPointerDown: (P) => P.stopPropagation(),
        children: [
          /* @__PURE__ */ S("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
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
                onChange: (P) => g(P.target.value),
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
              children: A !== null ? A.excalidraw.length === 0 && A.personal.length === 0 ? /* @__PURE__ */ u(
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
                    A.personal.map((P) => /* @__PURE__ */ u(
                      Wl,
                      {
                        item: P,
                        onClick: () => M(P),
                        onRemove: () => C(P.id),
                        theme: s
                      },
                      P.id
                    )),
                    A.excalidraw.map(({ library: P, item: Y }) => /* @__PURE__ */ u(
                      Dl,
                      {
                        item: Y,
                        libId: P.id,
                        onClick: () => v(Y),
                        theme: s
                      },
                      Y.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ S(St, { children: [
                p.length > 0 && /* @__PURE__ */ u(
                  dp,
                  {
                    items: p,
                    onPlace: M,
                    onRemove: C,
                    theme: s
                  }
                ),
                c.length === 0 && p.length === 0 ? /* @__PURE__ */ S(
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
                  const Y = m.has(P.id);
                  return /* @__PURE__ */ u(
                    cp,
                    {
                      lib: P,
                      expanded: Y,
                      onToggle: () => z(P.id),
                      onPlace: v,
                      onUninstall: () => w(P.id),
                      theme: s
                    },
                    P.id
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
                /* @__PURE__ */ u(
                  "button",
                  {
                    onClick: () => {
                      var P;
                      return (P = h.current) == null ? void 0 : P.click();
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
          /* @__PURE__ */ u(
            "input",
            {
              ref: h,
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
function cp({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: n,
  onUninstall: r,
  theme: s
}) {
  const { labels: i } = Jt(), [a, h] = et(null);
  return Mt(() => {
    e && a === null && h(_s(t.id));
  }, [e, a, t.id]), /* @__PURE__ */ S("div", { style: { marginBottom: 4 }, children: [
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
          Dl,
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
function dp({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: n
}) {
  const { labels: r } = Jt(), [s, i] = et(!0);
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
                  stroke: n.textMuted,
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
                color: n.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.03em"
              },
              children: r.librariesPersonal
            }
          ),
          /* @__PURE__ */ u(
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
          Wl,
          {
            item: a,
            onClick: () => e(a),
            onRemove: () => o(a.id),
            theme: n
          },
          a.id
        ))
      }
    )
  ] });
}
async function hp(t, e, o = 1, n = 20, r) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${n}`;
  return (await fetch(s, { signal: r, credentials: "include" })).json();
}
async function oa(t, e = 1, o = 20, n) {
  const r = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(r, { signal: n, credentials: "include" })).json();
}
const Rs = "application/x-spatialboard-gif-item";
function Bl(t, e, o, n) {
  const r = e.file.hd.gif, s = 400, i = 300;
  let a = r.width, h = r.height;
  const c = Math.min(1, s / a, i / h);
  a = Math.round(a * c), h = Math.round(h * c);
  const l = o ?? window.innerWidth / 2, p = n ?? window.innerHeight / 2, d = t.screenToCanvas(l, p), f = {
    id: Rt(10),
    type: "image",
    x: d.x - a / 2,
    y: d.y - h / 2,
    w: a,
    h,
    z: t.nextZ(),
    data: { src: r.url }
  };
  t.addNode(f), t.select(f.id);
}
function up({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n,
  baseUrl: r
}) {
  const s = ee(), { labels: i } = Jt(), a = pt(null), h = pt(null), [c, l] = et(""), [p, d] = et([]), [f, g] = et(!1), [m, y] = et(1), [x, b] = et(!1), w = pt();
  ei(e && !!n, n, a, [
    p.length,
    f
  ]), Mt(() => {
    if (!e) return;
    const A = (P) => {
      a.current && !a.current.contains(P.target) && o();
    };
    return document.addEventListener("pointerdown", A), () => document.removeEventListener("pointerdown", A);
  }, [e, o]), Mt(() => {
    if (!e || c.trim()) return;
    const A = new AbortController();
    return g(!0), oa(r, 1, 30, A.signal).then((P) => {
      d(P.data.data.filter((Y) => Y.type !== "ad")), y(1), b(P.data.has_next);
    }).catch(() => {
    }).finally(() => g(!1)), () => A.abort();
  }, [e, r, c]);
  const v = lt(
    (A, P, Y) => {
      if (!A.trim()) return;
      const G = new AbortController();
      return g(!0), hp(r, A, P, 30, G.signal).then((rt) => {
        const st = rt.data.data.filter((at) => at.type !== "ad");
        d((at) => Y ? [...at, ...st] : st), y(P), b(rt.data.has_next);
      }).catch(() => {
      }).finally(() => g(!1)), G;
    },
    [r]
  ), M = lt(
    (A) => {
      if (l(A), w.current && clearTimeout(w.current), !A.trim()) {
        d([]), y(1), b(!1);
        return;
      }
      w.current = setTimeout(() => {
        v(A, 1, !1);
      }, 350);
    },
    [v]
  ), C = lt(() => {
    const A = h.current;
    !A || f || !x || A.scrollTop + A.clientHeight >= A.scrollHeight - 100 && (c.trim() ? v(c, m + 1, !0) : (g(!0), oa(r, m + 1, 30).then((P) => {
      const Y = P.data.data.filter((G) => G.type !== "ad");
      d((G) => [...G, ...Y]), y(m + 1), b(P.data.has_next);
    }).catch(() => {
    }).finally(() => g(!1))));
  }, [f, x, c, m, v, r]), z = lt(
    (A) => {
      Bl(t, A);
    },
    [t]
  );
  return !e || !n ? null : Ze(
    /* @__PURE__ */ S(
      "div",
      {
        ref: a,
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
        onPointerDown: (A) => A.stopPropagation(),
        children: [
          /* @__PURE__ */ S("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
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
                onChange: (A) => M(A.target.value),
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
              ref: h,
              onScroll: C,
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
                    children: p.map((A) => /* @__PURE__ */ u(
                      pp,
                      {
                        item: A,
                        onClick: () => z(A),
                        engine: t,
                        theme: s
                      },
                      A.id
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
function pp({
  item: t,
  onClick: e,
  engine: o,
  theme: n
}) {
  const r = t.file.sm.webp, s = r.width / r.height, i = pt(0), a = lt(
    (l) => {
      l.dataTransfer.setData(Rs, JSON.stringify(t)), l.dataTransfer.effectAllowed = "copy";
    },
    [t]
  ), h = lt((l) => {
    l.dataTransfer.dropEffect !== "none" && (i.current = performance.now() + 450);
  }, []), c = lt(
    (l) => {
      if (performance.now() < i.current) {
        l.preventDefault(), l.stopPropagation();
        return;
      }
      e();
    },
    [e]
  );
  return /* @__PURE__ */ u(
    "button",
    {
      title: t.title,
      onClick: c,
      draggable: !0,
      onDragStart: a,
      onDragEnd: h,
      style: {
        border: `1px solid ${n.border}`,
        borderRadius: n.controlBorderRadius,
        background: n.controlBg,
        cursor: "grab",
        padding: 0,
        overflow: "hidden",
        aspectRatio: s > 1.5 ? "16/9" : s < 0.7 ? "3/4" : "1"
      },
      children: /* @__PURE__ */ u(
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
function fp({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [n, r] = et(""), s = pt(null), i = pt(null);
  Mt(() => {
    var p;
    (p = s.current) == null || p.focus();
  }, []);
  const a = Ut(() => oi(t, 56), [t]), h = lt(() => {
    e(n.trim() || "Untitled");
  }, [n, e]), c = lt(
    (p) => {
      p.key === "Enter" ? (p.preventDefault(), h()) : p.key === "Escape" && (p.preventDefault(), o());
    },
    [h, o]
  ), l = lt(
    (p) => {
      i.current && !i.current.contains(p.target) && o();
    },
    [o]
  );
  return Ze(
    /* @__PURE__ */ u(
      "div",
      {
        onClick: l,
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
                  value: n,
                  onChange: (p) => r(p.target.value),
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
                    onClick: h,
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
const mn = vr(
  null
);
function Ar(t, e) {
  const o = pt(null), n = pt(0), r = lt(() => (o.current || (o.current = `${e}:${++n.current}`), o.current), [e]);
  return Mt(() => {
    o.current = null, t.endHistoryCoalesce();
  }, [e, t]), Mt(() => {
    const s = () => {
      o.current = null, t.endHistoryCoalesce();
    }, i = typeof document < "u" ? document : null;
    if (i)
      return i.addEventListener("pointerup", s), i.addEventListener("pointercancel", s), () => {
        i.removeEventListener("pointerup", s), i.removeEventListener("pointercancel", s);
      };
  }, [t]), r;
}
function Ds(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function yp(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Nl(t, e, o, n) {
  return new Promise((r) => {
    const s = yp(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, l = i.naturalHeight || 200;
      if (c <= 1 || l <= 1) {
        const p = t.match(/viewBox=["']([^"']+)["']/i);
        if (p) {
          const d = p[1].trim().split(/[\s,]+/).map(Number);
          d.length === 4 && d[2] > 0 && d[3] > 0 && (c = d[2], l = d[3]);
        }
      }
      if (c > 400 || l > 400) {
        const p = Math.min(400 / c, 400 / l);
        c = Math.round(c * p), l = Math.round(l * p);
      }
      r({
        id: Rt(10),
        type: "image",
        x: e,
        y: o,
        w: c,
        h: l,
        z: n,
        data: { src: s }
      });
    }, i.onerror = () => r(null), i.src = s;
  });
}
async function gp(t, e, o, n) {
  const { x: r, y: s } = t.screenToCanvas(o, n), i = await Nl(e, r, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
function mp() {
  if (typeof navigator > "u") return !1;
  const t = navigator.userAgent, e = /iPhone|iPad|iPod/i.test(t);
  return /Chrome|Chromium|EdgA?|OPR|Brave/i.test(t) && !e || /Firefox/i.test(t) ? !1 : e ? !0 : /Safari/i.test(t) && !/Chrome|Chromium|Edg/i.test(t);
}
function bp(t) {
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
function xp(t) {
  return !Number.isFinite(t) || t < 0 ? "" : t < 0.05 ? "<0.05 ms" : t < 10 ? `${t < 1 ? t.toFixed(2) : t.toFixed(1)} ms` : `${Math.round(t)} ms`;
}
function wp(t, e, o) {
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
function kp(t, e, o, n) {
  if (t.length === 0) return null;
  const r = 13 / n, s = 7 / n, i = 5 / n, a = 6 / n, h = Math.max(...t.map((p) => p.text.length), 1), c = Math.min(h * a + s * 2, 280 / n), l = t.length * r + i * 2;
  return {
    w: c,
    h: l,
    x0: e - c / 2,
    y0: o - l / 2
  };
}
const na = {
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
}, vp = Le(function({
  node: e,
  zoom: o,
  showHandles: n = !0,
  measuredHeights: r,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const a = e.h === "auto" ? (r == null ? void 0 : r[e.id]) ?? 100 : e.h, h = e.rotation || 0, c = e.x + e.w / 2, l = e.y + a / 2, p = 8 / o, d = p / 2, f = 25 / o, g = !!e.locked, m = [
    { pos: "nw", cx: e.x, cy: e.y },
    { pos: "n", cx: e.x + e.w / 2, cy: e.y },
    { pos: "ne", cx: e.x + e.w, cy: e.y },
    { pos: "e", cx: e.x + e.w, cy: e.y + a / 2 },
    { pos: "se", cx: e.x + e.w, cy: e.y + a },
    { pos: "s", cx: e.x + e.w / 2, cy: e.y + a },
    { pos: "sw", cx: e.x, cy: e.y + a },
    { pos: "w", cx: e.x, cy: e.y + a / 2 }
  ];
  return /* @__PURE__ */ S("g", { transform: `rotate(${h}, ${c}, ${l})`, children: [
    /* @__PURE__ */ u(
      "rect",
      {
        x: e.x,
        y: e.y,
        width: e.w,
        height: a,
        fill: "none",
        stroke: g ? "#f59e0b" : "#3b82f6",
        strokeWidth: 1.5 / o,
        strokeDasharray: `${4 / o} ${3 / o}`
      }
    ),
    g && (() => {
      const y = 16 / o, x = e.x + e.w - y - 4 / o, b = e.y - y - 4 / o;
      return /* @__PURE__ */ S("g", { transform: `translate(${x}, ${b})`, children: [
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
        /* @__PURE__ */ S("g", { transform: `scale(${y / 24})`, children: [
          /* @__PURE__ */ u("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ u("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    n && !g && m.map(({ pos: y, cx: x, cy: b }) => /* @__PURE__ */ u(
      "rect",
      {
        x: x - d,
        y: b - d,
        width: p,
        height: p,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: Mr(y, h),
          pointerEvents: "auto"
        },
        onPointerDown: (w) => {
          w.stopPropagation(), s == null || s(e.id, y, w);
        }
      },
      y
    )),
    n && !g && /* @__PURE__ */ S(St, { children: [
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
          x: e.x + e.w / 2 - d,
          y: e.y - f - d,
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
}), Sp = Le(function({
  edge: e,
  fromNode: o,
  toNode: n,
  viewport: r,
  selection: s,
  measuredHeights: i,
  registry: a,
  onEdgeEndpointDown: h,
  onKinkHandleDown: c,
  edgeReconnect: l,
  eraserMarkedIds: p,
  cycleNodeIds: d,
  dataFlowEdgeOverlay: f = "off",
  getLastComputeMs: g,
  getDataFlowPortValue: m,
  interactionMode: y
}) {
  const x = e.data.edgeType || "bezier";
  let b, w;
  if (a && e.data.sourcePort) {
    const ft = a.get(o.type);
    ft != null && ft.ports && (b = Te(o, ft.ports, e.data.sourcePort, r.zoom, i, ft.portAnchor ?? "bbox") ?? void 0);
  }
  if (a && e.data.targetPort) {
    const ft = a.get(n.type);
    ft != null && ft.ports && (w = Te(n, ft.ports, e.data.targetPort, r.zoom, i, ft.portAnchor ?? "bbox") ?? void 0);
  }
  const v = Pe(
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
  ), { path: M, x1: C, y1: z, x2: A, y2: P, labelX: Y, labelY: G, arrowAngle: rt, tailAngle: st, kinkHandle: at } = v, xt = s.has(e.id), O = e.data.strokeWidth, _ = e.data.style === "dashed" ? `${8 * O},${4 * O}` : e.data.style === "dotted" ? `${2 * O},${3 * O}` : void 0, W = Math.max(8, O * 3), Z = e.data.arrowHeadSize ?? W, tt = e.data.arrowTailSize ?? W, K = e.data.animated, H = p == null ? void 0 : p.has(e.id), $ = (l == null ? void 0 : l.edgeId) === e.id, ot = !!(d && d.size > 0 && e.data.sourcePort && e.data.targetPort && d.has(e.data.fromId) && d.has(e.data.toId)), it = ot ? "#ef4444" : e.data.color, Q = e.data.roughness ?? 0, ct = Ut(() => Q <= 0 ? null : {
    stroke: it,
    roughness: Q,
    strokeWidth: O,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [it, Q, O, e.data.style, e.id]);
  let yt = null, J = null, dt = null;
  ct && (yt = es(M, ct), e.data.arrowHead === "arrow" && (J = es(go(A, P, rt, Z), { ...ct, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (dt = es(go(C, z, st, tt), { ...ct, strokeLineDash: void 0 })));
  const wt = Ut(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), gt = Ut(() => {
    if (!K) return;
    const ft = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", Xt = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", Gt = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${ft} ${Xt} ${Gt} infinite` };
  }, [K, e.data.animatedDirection]), mt = Ut(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), At = Ut(
    () => H ? { filter: "saturate(0)" } : void 0,
    [H]
  ), Nt = Ut(() => {
    var Kt;
    const ft = f ?? "off", Xt = (Kt = e.data.label) == null ? void 0 : Kt.trim(), Gt = [];
    if (Xt && Gt.push({ text: Xt, primary: !0 }), ft !== "off" && vs(n) && e.data.sourcePort && e.data.targetPort && Gt.push({
      text: `${e.data.sourcePort} → ${e.data.targetPort}`,
      primary: !Xt
    }), ft === "ports+compute" && vs(n) && g && e.data.toId) {
      const $t = g(e.data.toId);
      $t != null && Number.isFinite($t) && Gt.push({ text: `compute ${xp($t)}`, primary: !1 });
    }
    return Gt;
  }, [
    f,
    e.data.label,
    e.data.sourcePort,
    e.data.targetPort,
    e.data.toId,
    g,
    n
  ]), Lt = Ut(
    () => e.data.sourcePort && e.data.targetPort ? wp(a, n, m) : null,
    [
      a,
      n,
      e.data.sourcePort,
      e.data.targetPort,
      m
    ]
  );
  return /* @__PURE__ */ S("g", { opacity: $ ? 0.15 : H ? 0.25 : void 0, style: At, children: [
    /* @__PURE__ */ u(
      "path",
      {
        d: M,
        stroke: "transparent",
        strokeWidth: Math.max(O + 16 / r.zoom, 20 / r.zoom),
        strokeLinecap: "round",
        fill: "none",
        style: {
          pointerEvents: "stroke",
          cursor: y === "select" || y == null ? "move" : "inherit"
        }
      }
    ),
    ot && /* @__PURE__ */ u(
      "path",
      {
        d: M,
        stroke: "#ef4444",
        strokeWidth: O + 6 / r.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: wt
      }
    ),
    xt && /* @__PURE__ */ u(
      "path",
      {
        d: M,
        stroke: "#3b82f6",
        strokeWidth: O + 6 / r.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    yt ? yt.map((ft, Xt) => /* @__PURE__ */ u(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeDasharray: ft.strokeDasharray,
        strokeLinecap: "round",
        fill: ft.fill ?? "none",
        style: K ? gt : void 0
      },
      Xt
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: M,
        stroke: it,
        strokeWidth: O,
        strokeDasharray: K ? "12,8" : ot ? `${6 * O},${4 * O}` : _,
        strokeLinecap: "round",
        fill: "none",
        style: ot ? mt : gt
      }
    ),
    e.data.arrowHead === "arrow" && (J ? J.map((ft, Xt) => /* @__PURE__ */ u(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ft.fill ?? "none"
      },
      `ah${Xt}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: go(A, P, rt, Z),
        fill: "none",
        stroke: it,
        strokeWidth: O,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: fr(A, P, rt, Z),
        fill: it,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: A,
        cy: P,
        r: Z * 0.25,
        fill: it
      }
    ),
    e.data.arrowTail === "arrow" && (dt ? dt.map((ft, Xt) => /* @__PURE__ */ u(
      "path",
      {
        d: ft.d,
        stroke: ft.stroke,
        strokeWidth: ft.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ft.fill ?? "none"
      },
      `at${Xt}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: go(C, z, st, tt),
        fill: "none",
        stroke: it,
        strokeWidth: O,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: fr(C, z, st, tt),
        fill: it,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: C,
        cy: z,
        r: tt * 0.25,
        fill: it
      }
    ),
    (() => {
      const ft = r.zoom, Xt = 13 / ft, Gt = 5 / ft, Kt = 11 / ft, $t = 10 / ft, ht = kp(Nt, Y, G, ft), ae = 9 / ft, he = !!Lt, le = ht ? ht.x0 + ht.w + ae + 4 / ft : Y + ae + 4 / ft, ie = G;
      return /* @__PURE__ */ S(St, { children: [
        ht && /* @__PURE__ */ S(St, { children: [
          /* @__PURE__ */ u(
            "rect",
            {
              x: ht.x0,
              y: ht.y0,
              width: ht.w,
              height: ht.h,
              fill: "white",
              rx: 4 / ft,
              opacity: 0.92
            }
          ),
          Nt.map((be, ve) => /* @__PURE__ */ u(
            "text",
            {
              x: Y,
              y: ht.y0 + Gt + (ve + 0.78) * Xt,
              fill: be.primary ? it : "#64748b",
              fontSize: be.primary ? Kt : $t,
              textAnchor: "middle",
              style: { pointerEvents: "none" },
              children: be.text
            },
            ve
          ))
        ] }),
        he && /* @__PURE__ */ S("g", { style: { pointerEvents: "auto" }, children: [
          /* @__PURE__ */ u("title", { children: Lt }),
          /* @__PURE__ */ u(
            "circle",
            {
              cx: le,
              cy: ie,
              r: ae,
              fill: "#ea580c",
              stroke: "#fff",
              strokeWidth: 1.25 / ft
            }
          ),
          /* @__PURE__ */ u(
            "text",
            {
              x: le,
              y: ie + 3.5 / ft,
              fill: "#fff",
              fontSize: 11 / ft,
              fontWeight: 800,
              textAnchor: "middle",
              style: { pointerEvents: "none" },
              children: "!"
            }
          )
        ] })
      ] });
    })(),
    xt && !$ && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u(
        "circle",
        {
          cx: C,
          cy: z,
          r: 5 / r.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / r.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ft) => {
            ft.stopPropagation(), h == null || h(e.id, "source", ft);
          }
        }
      ),
      /* @__PURE__ */ u(
        "circle",
        {
          cx: A,
          cy: P,
          r: 5 / r.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / r.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ft) => {
            ft.stopPropagation(), h == null || h(e.id, "target", ft);
          }
        }
      )
    ] }),
    xt && !$ && at && /* @__PURE__ */ u(
      "circle",
      {
        cx: at.x,
        cy: at.y,
        r: 5 / r.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / r.zoom,
        style: {
          cursor: at.axis === "xy" ? "move" : at.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (ft) => {
          ft.stopPropagation(), c == null || c(e.id, at.axis, at.min, at.max, ft);
        }
      }
    )
  ] });
});
function Mp({
  nodes: t,
  viewport: e,
  selection: o,
  measuredHeights: n,
  activeStroke: r,
  shapePreview: s,
  shapePreviewStyle: i,
  onResizeHandleDown: a,
  onRotateStart: h,
  onConnectionHandleDown: c,
  onEdgeEndpointDown: l,
  onKinkHandleDown: p,
  edgePreview: d,
  edgeReconnect: f,
  eraserMarkedIds: g,
  eraserTrail: m,
  laserTrail: y,
  mode: x,
  freeFormEdges: b,
  hoveredNodeId: w,
  cursorCanvasPos: v,
  registry: M,
  onPortHandleDown: C,
  cycleNodeIds: z,
  dataFlowEdgeOverlay: A = "off",
  getLastComputeMs: P,
  getDataFlowPortValue: Y,
  containerTypes: G,
  alignGuides: rt,
  suppressNodeOverlayId: st
}) {
  const at = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, xt = t.filter(
    (W) => W.type !== "edge" && W.type !== "content" && W.type !== "image"
  ), O = t.filter((W) => W.type === "edge").sort((W, Z) => W.z - Z.z), _ = Ut(() => new Map(t.map((W) => [W.id, W])), [t]);
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
      children: /* @__PURE__ */ S("g", { transform: at, children: [
        O.map((W) => {
          const Z = _.get(W.data.fromId), tt = _.get(W.data.toId);
          return !Z || !tt ? null : /* @__PURE__ */ u(
            Sp,
            {
              edge: W,
              fromNode: Z,
              toNode: tt,
              viewport: e,
              selection: o,
              measuredHeights: n,
              registry: M,
              onEdgeEndpointDown: l,
              onKinkHandleDown: p,
              edgeReconnect: f,
              eraserMarkedIds: g,
              cycleNodeIds: z,
              dataFlowEdgeOverlay: A,
              getLastComputeMs: P,
              getDataFlowPortValue: Y,
              interactionMode: x
            },
            W.id
          );
        }),
        x === "edge" && !d && w && v && (() => {
          const W = _.get(w);
          if (!W || W.type === "edge") return null;
          const Z = Be(W, v.x, v.y, n), tt = 4 / e.zoom;
          return /* @__PURE__ */ u("circle", { cx: Z.x, cy: Z.y, r: tt, fill: "#3b82f6", stroke: "white", strokeWidth: 1.5 / e.zoom });
        })(),
        (() => {
          var ct, yt;
          const W = !!d || !!f, Z = (d == null ? void 0 : d.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, tt = (d == null ? void 0 : d.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, K = (d == null ? void 0 : d.fromNode.id) ?? (f == null ? void 0 : f.anchorNodeId) ?? null;
          let H = null, $ = null, ot = null;
          const it = /* @__PURE__ */ new Set();
          if (W) {
            let J = 1 / 0, dt = !1;
            const wt = 50 / e.zoom;
            for (const gt of t) {
              if (gt.type === "edge" || gt.id === K || (yt = (ct = M == null ? void 0 : M.get(gt.type)) == null ? void 0 : ct.ports) != null && yt.length) continue;
              const mt = gt.h === "auto" ? (n == null ? void 0 : n[gt.id]) ?? 100 : gt.h, At = gt.w * 0.2, Nt = mt * 0.2;
              Z >= gt.x - At && Z <= gt.x + gt.w + At && tt >= gt.y - Nt && tt <= gt.y + mt + Nt && it.add(gt.id);
              const Lt = ws(gt, n), ft = G ? G.has(gt.type) : gt.type === "frame";
              for (const Xt of Lt) {
                const Gt = Math.hypot(Xt.x - Z, Xt.y - tt);
                Gt >= wt || ft && !dt && H || (!ft && dt || Gt < J) && (J = Gt, dt = ft, H = gt.id, $ = Xt.side);
              }
            }
            if (b && H) {
              const gt = _.get(H);
              if (gt) {
                const mt = Be(gt, Z, tt, n);
                ot = { x: mt.x, y: mt.y };
              }
            }
          }
          const Q = [];
          return b && W && ot && Q.push(
            /* @__PURE__ */ u(
              "circle",
              {
                cx: ot.x,
                cy: ot.y,
                r: 5 / e.zoom,
                fill: "#3b82f6",
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              },
              "freeform-snap-dot"
            )
          ), t.filter((J) => {
            var dt, wt;
            return J.type === "edge" || st && J.id === st || (wt = (dt = M == null ? void 0 : M.get(J.type)) == null ? void 0 : dt.ports) != null && wt.length || b && J.type === "image" ? !1 : o.size <= 1 && o.has(J.id) || !b && W && (J.id === K || it.has(J.id));
          }).forEach((J) => {
            const dt = ws(J, n), wt = 4 / e.zoom, gt = 26 / e.zoom, mt = J.rotation || 0, At = J.h === "auto" ? (n == null ? void 0 : n[J.id]) ?? 100 : J.h, Nt = J.x + J.w / 2, Lt = J.y + At / 2, ft = d && d.fromNode.id === J.id || f && f.anchorNodeId === J.id, Xt = o.has(J.id) && !W;
            b ? Xt && Q.push(
              /* @__PURE__ */ u("g", { transform: mt ? `rotate(${mt}, ${Nt}, ${Lt})` : void 0, children: dt.map(({ side: Gt }) => {
                const Kt = {
                  top: [J.x + J.w / 2, J.y],
                  bottom: [J.x + J.w / 2, J.y + At],
                  left: [J.x, J.y + At / 2],
                  right: [J.x + J.w, J.y + At / 2]
                }, [$t, ht] = Kt[Gt];
                return /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: $t,
                    cy: ht,
                    r: wt,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.8,
                    style: { cursor: "crosshair", pointerEvents: "auto" },
                    onPointerDown: (ae) => {
                      ae.stopPropagation(), c == null || c(J.id, Gt, ae);
                    }
                  },
                  `ch-${J.id}-${Gt}`
                );
              }) }, `conn-${J.id}`)
            ) : Q.push(
              /* @__PURE__ */ u("g", { transform: mt ? `rotate(${mt}, ${Nt}, ${Lt})` : void 0, children: dt.map(({ side: Gt }) => {
                const Kt = {
                  top: [J.x + J.w / 2, J.y],
                  bottom: [J.x + J.w / 2, J.y + At],
                  left: [J.x, J.y + At / 2],
                  right: [J.x + J.w, J.y + At / 2]
                }, [$t, ht] = Kt[Gt], ae = Gt === "top" && o.has(J.id) ? 42 / e.zoom : gt;
                let he = $t, le = ht;
                switch (Gt) {
                  case "top":
                    le = ht - ae;
                    break;
                  case "bottom":
                    le = ht + ae;
                    break;
                  case "left":
                    he = $t - ae;
                    break;
                  case "right":
                    he = $t + ae;
                    break;
                }
                const ie = W && H === J.id && $ === Gt;
                return /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: he,
                    cy: le,
                    r: ie ? 5 / e.zoom : wt,
                    fill: ft || ie ? "#3b82f6" : "white",
                    stroke: ie ? "white" : W && !ft ? "#3b82f6" : "#94a3b8",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: ie || W && !ft ? 1 : 0.8,
                    style: {
                      cursor: Xt ? "crosshair" : "default",
                      pointerEvents: Xt ? "auto" : "none"
                    },
                    onPointerDown: Xt ? (be) => {
                      be.stopPropagation(), c == null || c(J.id, Gt, be);
                    } : void 0
                  },
                  `ch-${J.id}-${Gt}`
                );
              }) }, `conn-${J.id}`)
            );
          }), Q;
        })(),
        M && (() => {
          var it;
          const W = !!d || !!f, Z = (d == null ? void 0 : d.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, tt = (d == null ? void 0 : d.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, K = (d == null ? void 0 : d.fromNode.id) ?? null, H = (d == null ? void 0 : d.sourceDirection) === "output" ? "input" : (d == null ? void 0 : d.sourceDirection) === "input" ? "output" : null;
          let $ = null, ot = null;
          if (W && H) {
            const Q = md / e.zoom;
            let ct = 1 / 0;
            for (const yt of t) {
              if (yt.type === "edge" || yt.id === K) continue;
              const J = M.get(yt.type);
              if (!((it = J == null ? void 0 : J.ports) != null && it.length)) continue;
              const dt = J.ports.filter((wt) => wt.direction === H);
              for (const wt of dt) {
                const gt = Te(
                  yt,
                  J.ports,
                  wt.id,
                  e.zoom,
                  n,
                  J.portAnchor ?? "bbox"
                );
                if (!gt) continue;
                const mt = Math.hypot(gt.x - Z, gt.y - tt);
                mt <= Q && mt < ct && (ct = mt, $ = yt.id, ot = wt.id);
              }
            }
          }
          return t.filter((Q) => {
            var yt;
            if (Q.type === "edge" || st && Q.id === st) return !1;
            const ct = M.get(Q.type);
            return !!((yt = ct == null ? void 0 : ct.ports) != null && yt.length);
          }).map((Q) => {
            const ct = M.get(Q.type), yt = ct.ports, J = Q.h === "auto" ? (n == null ? void 0 : n[Q.id]) ?? 100 : Q.h, dt = Q.rotation || 0, wt = Q.x + Q.w / 2, gt = Q.y + J / 2, mt = 6 / e.zoom, At = ct.portAnchor ?? "bbox", Nt = yt.filter((Kt) => Kt.direction === "input"), Lt = yt.filter((Kt) => Kt.direction === "output"), ft = !W, Xt = (Kt, $t, ht, ae) => {
              const he = ja(
                Q,
                yt,
                Kt.id,
                e.zoom,
                n,
                At
              );
              if (!he) return null;
              const { px: le, py: ie } = he, be = xd(
                Q,
                ae,
                { x: le, y: ie },
                n,
                At
              ), ve = na[Kt.dataType] || na.any, Fe = $ === Q.id && ot === Kt.id, Uo = Fe ? 8 / e.zoom : mt, Je = 2.5 / e.zoom, xe = ae === "input" ? le - mt - Je : le + mt + Je;
              return /* @__PURE__ */ S("g", { children: [
                /* @__PURE__ */ u(
                  "line",
                  {
                    x1: le,
                    y1: ie,
                    x2: be.x,
                    y2: be.y,
                    stroke: ve,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                Fe && /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: le,
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
                    cx: le,
                    cy: ie,
                    r: Uo,
                    fill: Fe ? "white" : ve,
                    stroke: Fe ? ve : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: ft ? "crosshair" : "default",
                      pointerEvents: ft ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: ft ? (I) => {
                      I.stopPropagation(), C == null || C(Q.id, Kt.id, ae, I);
                    } : void 0
                  }
                ),
                (() => {
                  const I = Kt.label || Kt.id, ut = 9 / e.zoom, de = 5 / e.zoom, re = 2.5 / e.zoom, Re = I.length * ut * 0.62 + de * 2, qt = ut + re * 2, Po = ae === "input" ? xe - Re : xe, Ao = ie - qt / 2, je = qt / 2, Eo = Fe ? ve : "#1a1a2e", ro = Fe ? ve : "#2a2a40", bn = Fe ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ u(
                      "rect",
                      {
                        x: Po,
                        y: Ao,
                        width: Re,
                        height: qt,
                        rx: je,
                        ry: je,
                        fill: Eo,
                        fillOpacity: Fe ? 0.9 : 0.85,
                        stroke: ro,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ u(
                      "text",
                      {
                        x: Po + Re / 2,
                        y: ie + ut * 0.35,
                        fill: bn,
                        fontSize: ut,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: I
                      }
                    )
                  ] });
                })()
              ] }, `port-${Q.id}-${Kt.id}`);
            }, Gt = z == null ? void 0 : z.has(Q.id);
            return /* @__PURE__ */ S("g", { transform: dt ? `rotate(${dt}, ${wt}, ${gt})` : void 0, children: [
              Nt.map((Kt, $t) => Xt(Kt, $t, Nt, "input")),
              Lt.map((Kt, $t) => Xt(Kt, $t, Lt, "output")),
              Gt && (() => {
                const Kt = 10 / e.zoom, $t = Q.x + Q.w + Kt * 0.3, ht = Q.y - Kt * 0.3;
                return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: $t,
                      cy: ht,
                      r: Kt,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ u(
                    "text",
                    {
                      x: $t,
                      y: ht + 4 / e.zoom,
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
            ] }, `ports-${Q.id}`);
          });
        })(),
        d && (() => {
          var Kt;
          const W = d.cursorX, Z = d.cursorY, tt = d.edgeColor || "#3b82f6", K = d.edgeStrokeWidth || 2, H = d.edgeStyle || "solid", $ = H === "dashed" ? `${8 * K},${4 * K}` : H === "dotted" ? `${2 * K},${3 * K}` : void 0, ot = Math.max(8, K * 3), it = 4 / e.zoom, Q = M == null ? void 0 : M.get(d.fromNode.type), ct = d.sourcePort && (Q != null && Q.ports) ? Te(
            d.fromNode,
            Q.ports,
            d.sourcePort,
            e.zoom,
            n,
            Q.portAnchor ?? "bbox"
          ) ?? void 0 : void 0, yt = d.sourcePort && (Q != null && Q.ports) ? Q.ports.find(($t) => $t.id === d.sourcePort) : void 0, J = d.sourceDirection === "output" ? "input" : d.sourceDirection === "input" ? "output" : null;
          let dt = null, wt, gt = null;
          if (M && d.sourcePort && J && yt) {
            const $t = Gs / e.zoom;
            let ht = 1 / 0;
            for (const ae of t) {
              if (ae.type === "edge" || ae.id === d.fromNode.id) continue;
              const he = M.get(ae.type);
              if (!((Kt = he == null ? void 0 : he.ports) != null && Kt.length)) continue;
              const le = he.ports.filter((ie) => ie.direction === J);
              for (const ie of le) {
                if (yt.dataType !== "any" && ie.dataType !== "any" && yt.dataType !== ie.dataType)
                  continue;
                const be = Te(
                  ae,
                  he.ports,
                  ie.id,
                  e.zoom,
                  n,
                  he.portAnchor ?? "bbox"
                );
                if (!be) continue;
                const ve = Math.hypot(be.x - W, be.y - Z);
                ve < $t && ve < ht && (ht = ve, dt = ae, gt = ie.id);
              }
            }
          }
          if (!gt) {
            const $t = 50 / e.zoom;
            for (const ht of t) {
              if (ht.type === "edge" || ht.id === d.fromNode.id) continue;
              const ae = ht.h === "auto" ? (n == null ? void 0 : n[ht.id]) ?? 100 : ht.h, he = ht.w * 0.2, le = ae * 0.2;
              if (W >= ht.x - he && W <= ht.x + ht.w + he && Z >= ht.y - le && Z <= ht.y + ae + le) {
                const ie = Be(ht, W, Z, n);
                if (Math.hypot(ie.x - W, ie.y - Z) < $t) {
                  dt = ht, wt = ie.t;
                  break;
                }
              }
            }
          }
          const mt = dt ? M == null ? void 0 : M.get(dt.type) : void 0, At = dt && gt && (mt != null && mt.ports) ? Te(
            dt,
            mt.ports,
            gt,
            e.zoom,
            n,
            mt.portAnchor ?? "bbox"
          ) ?? void 0 : void 0, Nt = ct ? void 0 : d.sourceT, Lt = At ? void 0 : wt;
          let ft;
          if (dt)
            ft = Pe(
              d.fromNode,
              dt,
              d.edgeType || "bezier",
              n,
              d.sourceHandle,
              void 0,
              void 0,
              void 0,
              ct,
              At,
              Nt,
              Lt,
              d.attachmentGap
            );
          else {
            const $t = {
              id: "__preview__",
              type: "shape",
              x: W,
              y: Z,
              w: 0,
              h: 0,
              data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
            };
            ft = Pe(
              d.fromNode,
              $t,
              d.edgeType || "bezier",
              n,
              d.sourceHandle,
              void 0,
              void 0,
              void 0,
              ct,
              void 0,
              Nt,
              void 0,
              d.attachmentGap
            );
          }
          const Xt = !ct, Gt = !!(dt && !At);
          return /* @__PURE__ */ S("g", { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: ft.path,
                stroke: tt,
                strokeWidth: K,
                strokeDasharray: $,
                strokeLinecap: "round",
                fill: "none"
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: go(ft.x2, ft.y2, ft.arrowAngle, ot),
                fill: "none",
                stroke: tt,
                strokeWidth: K,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            Xt && /* @__PURE__ */ u(
              "circle",
              {
                cx: ft.x1,
                cy: ft.y1,
                r: it,
                fill: tt,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            ),
            Gt && /* @__PURE__ */ u(
              "circle",
              {
                cx: ft.x2,
                cy: ft.y2,
                r: it,
                fill: tt,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            )
          ] });
        })(),
        f && (() => {
          const W = _.get(f.anchorNodeId);
          if (!W) return null;
          let Z, tt;
          if (f.anchorHandle) {
            const K = W.h === "auto" ? (n == null ? void 0 : n[W.id]) ?? 100 : W.h, H = {
              top: [W.x + W.w / 2, W.y],
              bottom: [W.x + W.w / 2, W.y + K],
              left: [W.x, W.y + K / 2],
              right: [W.x + W.w, W.y + K / 2]
            }, $ = f.anchorHandle, ot = $ === "top" ? 42 / e.zoom : 26 / e.zoom, [it, Q] = H[$];
            let ct = it, yt = Q;
            switch ($) {
              case "top":
                yt = Q - ot;
                break;
              case "bottom":
                yt = Q + ot;
                break;
              case "left":
                ct = it - ot;
                break;
              case "right":
                ct = it + ot;
                break;
            }
            if (W.rotation) {
              const J = W.x + W.w / 2, dt = W.y + K / 2, wt = W.rotation * Math.PI / 180, gt = Math.cos(wt), mt = Math.sin(wt), At = ct - J, Nt = yt - dt;
              Z = J + At * gt - Nt * mt, tt = dt + At * mt + Nt * gt;
            } else
              Z = ct, tt = yt;
          } else {
            const K = Ed(W, f.cursorX, f.cursorY, n);
            Z = K.x, tt = K.y;
          }
          return /* @__PURE__ */ u(
            "line",
            {
              x1: Z,
              y1: tt,
              x2: f.cursorX,
              y2: f.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && x !== "edge" && !d && !f && xt.filter((W) => o.has(W.id)).map((W) => /* @__PURE__ */ u(
          vp,
          {
            node: W,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: n,
            onHandlePointerDown: a,
            onRotateStart: h
          },
          `sel-${W.id}`
        )),
        r && r.points.length > 1 && (() => {
          const W = r.strokeStyle === "dashed" || r.strokeStyle === "dotted", Z = r.opacity ?? 1;
          if (W) {
            const tt = r.points, K = ["M", tt[0][0], tt[0][1]];
            for (let ot = 1; ot < tt.length; ot++) {
              const [it, Q] = tt[ot], [ct, yt] = tt[ot - 1];
              K.push("Q", ct, yt, (ct + it) / 2, (yt + Q) / 2);
            }
            const H = tt[tt.length - 1];
            K.push("L", H[0], H[1]);
            const $ = no(r.strokeStyle);
            return /* @__PURE__ */ u(
              "path",
              {
                d: K.join(" "),
                fill: "none",
                stroke: r.color,
                strokeWidth: r.width,
                strokeDasharray: $ == null ? void 0 : $.map((ot) => ot * Math.max(r.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: Z
              }
            );
          }
          return /* @__PURE__ */ u(
            "path",
            {
              d: qs(r.points, {
                size: r.width
              }),
              fill: r.color,
              opacity: Z
            }
          );
        })(),
        s && i && (() => {
          const W = Math.min(s.startX, s.endX), Z = Math.min(s.startY, s.endY), tt = Math.abs(s.endX - s.startX), K = Math.abs(s.endY - s.startY);
          if (tt < 2 && K < 2) return null;
          const H = i, $ = H.shapeType || "rect", ot = H.opacity ?? 1, it = no(H.strokeStyle), Q = H.edgeStyle === "round", ct = s.startX, yt = s.startY, J = s.endX, dt = s.endY, wt = {
            stroke: H.stroke,
            fill: H.fill,
            fillStyle: H.fillStyle,
            roughness: H.roughness,
            strokeWidth: H.strokeWidth,
            strokeLineDash: it,
            seed: "__preview__"
          };
          let gt = null;
          if (H.roughness > 0)
            switch ($) {
              case "rect":
                gt = Wn(0, 0, tt, K, wt, Q);
                break;
              case "ellipse":
                gt = Ir(tt / 2, K / 2, tt, K, wt);
                break;
              case "diamond":
                gt = zr(0, 0, tt, K, wt, Q);
                break;
              case "line":
                gt = Ho(0, dt - yt > 0 ? 0 : K, tt, dt - yt > 0 ? K : 0, wt);
                break;
              case "arrow":
                gt = Tr(0, dt - yt > 0 ? 0 : K, tt, dt - yt > 0 ? K : 0, wt);
                break;
            }
          if (gt) {
            const Lt = $ === "line" || $ === "arrow" ? Math.min(ct, J) : W, ft = $ === "line" || $ === "arrow" ? Math.min(yt, dt) : Z;
            return /* @__PURE__ */ u("g", { transform: `translate(${Lt}, ${ft})`, opacity: ot, children: gt.map((Xt, Gt) => /* @__PURE__ */ u(
              "path",
              {
                d: Xt.d,
                stroke: Xt.stroke,
                strokeWidth: Xt.strokeWidth,
                fill: Xt.fill,
                strokeDasharray: Xt.strokeDasharray,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              Gt
            )) });
          }
          const mt = it == null ? void 0 : it.join(","), At = H.fill || "none";
          if ($ === "ellipse")
            return /* @__PURE__ */ u(
              "ellipse",
              {
                cx: W + tt / 2,
                cy: Z + K / 2,
                rx: tt / 2,
                ry: K / 2,
                stroke: H.stroke,
                strokeWidth: H.strokeWidth,
                fill: At,
                strokeDasharray: mt,
                opacity: ot
              }
            );
          if ($ === "diamond")
            return /* @__PURE__ */ u(
              "polygon",
              {
                points: `${W + tt / 2},${Z} ${W + tt},${Z + K / 2} ${W + tt / 2},${Z + K} ${W},${Z + K / 2}`,
                stroke: H.stroke,
                strokeWidth: H.strokeWidth,
                fill: At,
                strokeDasharray: mt,
                opacity: ot
              }
            );
          if ($ === "line" || $ === "arrow")
            return /* @__PURE__ */ S("g", { opacity: ot, children: [
              /* @__PURE__ */ u(
                "line",
                {
                  x1: ct,
                  y1: yt,
                  x2: J,
                  y2: dt,
                  stroke: H.stroke,
                  strokeWidth: H.strokeWidth,
                  strokeDasharray: mt
                }
              ),
              $ === "arrow" && (() => {
                const Lt = Math.atan2(dt - yt, J - ct), ft = Math.max(12, H.strokeWidth * 4), Xt = Math.PI / 6, Gt = J - ft * Math.cos(Lt - Xt), Kt = dt - ft * Math.sin(Lt - Xt), $t = J - ft * Math.cos(Lt + Xt), ht = dt - ft * Math.sin(Lt + Xt);
                return /* @__PURE__ */ u(
                  "polyline",
                  {
                    points: `${Gt},${Kt} ${J},${dt} ${$t},${ht}`,
                    stroke: H.stroke,
                    strokeWidth: H.strokeWidth,
                    fill: "none"
                  }
                );
              })()
            ] });
          const Nt = Q ? qo(tt, K) : 0;
          return /* @__PURE__ */ u(
            "rect",
            {
              x: W,
              y: Z,
              width: tt,
              height: K,
              rx: Nt || void 0,
              ry: Nt || void 0,
              stroke: H.stroke,
              strokeWidth: H.strokeWidth,
              fill: At,
              strokeDasharray: mt,
              opacity: ot
            }
          );
        })(),
        m && m.length > 1 && (() => {
          const W = Date.now(), Z = 400, tt = 6 / e.zoom, K = [`M${m[0][0]},${m[0][1]}`];
          if (m.length === 2)
            K.push(`L${m[1][0]},${m[1][1]}`);
          else {
            for (let J = 0; J < m.length - 1; J++) {
              const dt = (m[J][0] + m[J + 1][0]) / 2, wt = (m[J][1] + m[J + 1][1]) / 2;
              K.push(`Q${m[J][0]},${m[J][1]},${dt},${wt}`);
            }
            const yt = m[m.length - 1];
            K.push(`L${yt[0]},${yt[1]}`);
          }
          const H = K.join(" "), $ = (W - m[m.length - 1][2]) / Z, ot = (W - m[0][2]) / Z, it = Math.max(0, 0.85 * (1 - $)), Q = Math.max(0, 0.85 * (1 - ot)), ct = (it + Q) / 2;
          return ct <= 0 ? null : /* @__PURE__ */ S(St, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: H,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: tt * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ct * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: H,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: tt,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ct
              }
            )
          ] });
        })(),
        y && y.length > 1 && (() => {
          const W = performance.now(), Z = 1560, tt = 6 / e.zoom, K = [];
          let H = !1, $ = !1;
          for (let wt = 0; wt < y.length; wt++) {
            const gt = y[wt];
            if (isNaN(gt[0])) {
              H = !1, $ = !1;
              continue;
            }
            if (!H)
              K.push(`M${gt[0]},${gt[1]}`), H = !0, $ = !0;
            else if ($) {
              const mt = wt + 1 < y.length && !isNaN(y[wt + 1][0]) ? y[wt + 1] : null;
              if (mt) {
                const At = (gt[0] + mt[0]) / 2, Nt = (gt[1] + mt[1]) / 2;
                K.push(`Q${gt[0]},${gt[1]},${At},${Nt}`);
              } else
                K.push(`L${gt[0]},${gt[1]}`);
            }
          }
          if (K.length === 0) return null;
          const ot = K.join(" "), it = y.filter((wt) => !isNaN(wt[0]));
          if (it.length === 0) return null;
          const Q = (W - it[it.length - 1][2]) / Z, ct = (W - it[0][2]) / Z, yt = Math.max(0, 0.85 * (1 - Q)), J = Math.max(0, 0.85 * (1 - ct)), dt = (yt + J) / 2;
          return dt <= 0 ? null : /* @__PURE__ */ S(St, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: ot,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: tt * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: dt * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: ot,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: tt,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: dt
              }
            )
          ] });
        })(),
        rt && rt.length > 0 && rt.map((W, Z) => /* @__PURE__ */ u(
          "line",
          {
            x1: W.axis === "x" ? W.position : W.start,
            y1: W.axis === "x" ? W.start : W.position,
            x2: W.axis === "x" ? W.position : W.end,
            y2: W.axis === "x" ? W.end : W.position,
            stroke: "#f472b6",
            strokeWidth: 1 / e.zoom,
            strokeDasharray: `${3 / e.zoom} ${2 / e.zoom}`,
            opacity: 0.8
          },
          `guide-${Z}`
        ))
      ] })
    }
  );
}
function Cp({
  x: t,
  y: e,
  sections: o,
  onClose: n
}) {
  const r = pt(null);
  Mt(() => {
    var y;
    const f = (x) => {
      r.current && !r.current.contains(x.target) && n();
    }, g = (x) => {
      x.key === "Escape" && n();
    }, m = ((y = r.current) == null ? void 0 : y.ownerDocument) ?? document;
    return m.addEventListener("pointerdown", f, !0), m.addEventListener("keydown", g), () => {
      m.removeEventListener("pointerdown", f, !0), m.removeEventListener("keydown", g);
    };
  }, [n]);
  const s = typeof document < "u" ? document : null;
  Io(() => {
    const f = r.current;
    if (!f) return;
    const g = f.ownerDocument.defaultView ?? window, m = () => {
      const x = f.getBoundingClientRect(), b = xl(t, e, x.width, x.height, g);
      f.style.left = `${b.left}px`, f.style.top = `${b.top}px`;
    };
    m();
    const y = new ResizeObserver(m);
    return y.observe(f), g.addEventListener("resize", m), () => {
      y.disconnect(), g.removeEventListener("resize", m);
    };
  }, [t, e, o]);
  const i = lt(
    (f) => {
      f.kind === "header" || f.disabled || (f.action(), n());
    },
    [n]
  ), a = navigator.platform.includes("Mac"), h = a ? "⌘" : "Ctrl+", c = a ? "⌥" : "Alt+", l = a ? "⇧" : "Shift+", p = (f) => f.replace("Mod+", h).replace("Alt+", c).replace("Shift+", l), d = /* @__PURE__ */ u(
    "div",
    {
      "data-sb-context-menu": !0,
      ref: r,
      onPointerDown: (f) => f.stopPropagation(),
      onContextMenu: (f) => f.preventDefault(),
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
      children: o.map((f, g) => /* @__PURE__ */ S("div", { children: [
        g > 0 && /* @__PURE__ */ u(
          "div",
          {
            style: {
              height: 1,
              background: "#333",
              margin: "4px 0"
            }
          }
        ),
        f.items.map(
          (m, y) => m.kind === "header" ? /* @__PURE__ */ u(
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
              children: m.label
            },
            y
          ) : /* @__PURE__ */ S(
            "div",
            {
              onClick: () => i(m),
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 16px",
                cursor: m.disabled ? "default" : "pointer",
                opacity: m.disabled ? 0.4 : 1,
                color: m.danger ? "#f87171" : "#e0e0e0",
                transition: "background 0.1s"
              },
              onMouseEnter: (x) => {
                m.disabled || (x.currentTarget.style.background = "rgba(255,255,255,0.08)");
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
                      m.icon != null && /* @__PURE__ */ u(
                        "span",
                        {
                          style: {
                            display: "flex",
                            flexShrink: 0,
                            color: "currentColor",
                            opacity: 0.92
                          },
                          children: m.icon
                        }
                      ),
                      m.checked !== void 0 && /* @__PURE__ */ u("span", { style: { display: "inline-block", width: 16, marginRight: -4 }, children: m.checked ? "✓" : "" }),
                      /* @__PURE__ */ u("span", { children: m.label })
                    ]
                  }
                ),
                m.shortcut && /* @__PURE__ */ u(
                  "span",
                  {
                    style: {
                      marginLeft: 32,
                      fontSize: 12,
                      color: "#888"
                    },
                    children: p(m.shortcut)
                  }
                )
              ]
            },
            y
          )
        )
      ] }, g))
    }
  );
  return s != null && s.body ? Ze(d, s.body) : d;
}
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ip = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), zp = (t) => t.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (e, o, n) => n ? n.toUpperCase() : o.toLowerCase()
), ra = (t) => {
  const e = zp(t);
  return e.charAt(0).toUpperCase() + e.slice(1);
}, Fl = (...t) => t.filter((e, o, n) => !!e && e.trim() !== "" && n.indexOf(e) === o).join(" ").trim(), Tp = (t) => {
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
var Pp = {
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
const Ap = La(
  ({
    color: t = "currentColor",
    size: e = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: n,
    className: r = "",
    children: s,
    iconNode: i,
    ...a
  }, h) => fs(
    "svg",
    {
      ref: h,
      ...Pp,
      width: e,
      height: e,
      stroke: t,
      strokeWidth: n ? Number(o) * 24 / Number(e) : o,
      className: Fl("lucide", r),
      ...!s && !Tp(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...i.map(([c, l]) => fs(c, l)),
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
const zo = (t, e) => {
  const o = La(
    ({ className: n, ...r }, s) => fs(Ap, {
      ref: s,
      iconNode: e,
      className: Fl(
        `lucide-${Ip(ra(t))}`,
        `lucide-${t}`,
        n
      ),
      ...r
    })
  );
  return o.displayName = ra(t), o;
};
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ep = [
  ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2", key: "dy24zr" }],
  ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2", key: "13zkjt" }],
  ["path", { d: "M12 2v20", key: "t6zp3m" }]
], Lp = zo(
  "align-horizontal-justify-center",
  Ep
);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rp = [
  ["rect", { width: "6", height: "14", x: "2", y: "5", rx: "2", key: "dy24zr" }],
  ["rect", { width: "6", height: "10", x: "12", y: "7", rx: "2", key: "1ht384" }],
  ["path", { d: "M22 2v20", key: "40qfg1" }]
], Dp = zo("align-horizontal-justify-end", Rp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wp = [
  ["rect", { width: "6", height: "14", x: "6", y: "5", rx: "2", key: "hsirpf" }],
  ["rect", { width: "6", height: "10", x: "16", y: "7", rx: "2", key: "13zkjt" }],
  ["path", { d: "M2 2v20", key: "1ivd8o" }]
], Bp = zo("align-horizontal-justify-start", Wp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Np = [
  ["rect", { width: "6", height: "14", x: "3", y: "5", rx: "2", key: "j77dae" }],
  ["rect", { width: "6", height: "10", x: "15", y: "7", rx: "2", key: "bq30hj" }],
  ["path", { d: "M3 2v20", key: "1d2pfg" }],
  ["path", { d: "M21 2v20", key: "p059bm" }]
], Fp = zo("align-horizontal-space-between", Np);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hp = [
  ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2", key: "1i8z2d" }],
  ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2", key: "ypihtt" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
], Op = zo("align-vertical-justify-center", Hp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xp = [
  ["rect", { width: "14", height: "6", x: "5", y: "12", rx: "2", key: "4l4tp2" }],
  ["rect", { width: "10", height: "6", x: "7", y: "2", rx: "2", key: "ypihtt" }],
  ["path", { d: "M2 22h20", key: "272qi7" }]
], Yp = zo("align-vertical-justify-end", Xp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gp = [
  ["rect", { width: "14", height: "6", x: "5", y: "16", rx: "2", key: "1i8z2d" }],
  ["rect", { width: "10", height: "6", x: "7", y: "6", rx: "2", key: "13squh" }],
  ["path", { d: "M2 2h20", key: "1ennik" }]
], jp = zo("align-vertical-justify-start", Gp);
/**
 * @license lucide-react v0.555.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vp = [
  ["rect", { width: "14", height: "6", x: "5", y: "15", rx: "2", key: "1w91an" }],
  ["rect", { width: "10", height: "6", x: "7", y: "3", rx: "2", key: "17wqzy" }],
  ["path", { d: "M2 21h20", key: "1nyx9w" }],
  ["path", { d: "M2 3h20", key: "91anmk" }]
], Kp = zo("align-vertical-space-between", Vp), uo = {
  size: 16,
  strokeWidth: 2,
  "aria-hidden": !0
}, po = {
  alignHLeft: /* @__PURE__ */ u(Bp, { ...uo }),
  alignHCenter: /* @__PURE__ */ u(Lp, { ...uo }),
  alignHRight: /* @__PURE__ */ u(Dp, { ...uo }),
  distributeH: /* @__PURE__ */ u(Fp, { ...uo }),
  alignVTop: /* @__PURE__ */ u(jp, { ...uo }),
  alignVCenter: /* @__PURE__ */ u(Op, { ...uo }),
  alignVBottom: /* @__PURE__ */ u(Yp, { ...uo }),
  distributeV: /* @__PURE__ */ u(Kp, { ...uo })
}, Ws = "sbd-clipboard", qp = "sbd-nodes:";
function Hl(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let n = "";
  for (let r = 0; r < o.length; r++) n += String.fromCharCode(o[r]);
  return btoa(n);
}
function sa(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let r = 0; r < e.length; r++) o[r] = e.charCodeAt(r);
    const n = new TextDecoder().decode(o);
    return JSON.parse(n);
  } catch {
    return null;
  }
}
function Ol(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return sa(e[1]);
  const o = t.match(
    new RegExp(`<!--${qp}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? sa(o[1]) : null;
}
function ar(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function Xl(t) {
  return t.map((e) => {
    var r;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), n = (r = e.children) != null && r.length ? `
` + Xl(e.children) : "";
    return o + n;
  }).filter(Boolean).join(`
`);
}
function Up(t) {
  var o;
  const e = [];
  for (const n of t)
    switch (n.type) {
      case "content": {
        const r = n.data;
        (o = r.blocks) != null && o.length ? e.push(Xl(r.blocks)) : r.markdown && e.push(r.markdown);
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
function ia(t, e) {
  const o = Up(e), n = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), r = Hl(e);
  return t.setData(
    "text/html",
    `<!--${Ws}--><div data-sbd-nodes="${r}">${n || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function Zp(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, n = o.defaultView ?? window, r = n.innerWidth / 2, s = n.innerHeight / 2, i = null;
  const a = (y) => {
    r = y.clientX, s = y.clientY;
  }, h = (y) => {
    ar(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = ia(
      y.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (y) => {
    ar(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = ia(
      y.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, l = (y) => {
    y.preventDefault(), y.stopImmediatePropagation();
  }, p = async (y) => {
    var P, Y, G;
    if (ar(y.target)) return;
    const { x, y: b } = t.screenToCanvas(r, s), w = ((P = y.clipboardData) == null ? void 0 : P.getData("text/html")) || "", v = ((Y = y.clipboardData) == null ? void 0 : Y.getData("text/plain")) || "";
    if (w.includes(Ws) || w.includes("data-sbd-nodes=") || i !== null && v === i) {
      if (i !== null && v === i && t.hasClipboard()) {
        l(y), t.pasteClipboard(x, b);
        return;
      }
      const st = Ol(w);
      if (st) {
        l(y), t.setClipboard(st), t.pasteClipboard(x, b);
        return;
      }
      if (w.includes(Ws) || w.includes("data-sbd-nodes=")) {
        l(y), t.hasClipboard() && t.pasteClipboard(x, b);
        return;
      }
    }
    const C = (G = y.clipboardData) == null ? void 0 : G.items;
    if (C) {
      for (const rt of Array.from(C))
        if (rt.type.startsWith("image/")) {
          const st = rt.getAsFile();
          if (!st) continue;
          l(y);
          const at = new FileReader();
          at.onload = () => {
            const xt = at.result, O = new Image();
            O.onload = () => {
              const _ = t.screenToCanvas(r, s), W = 400, Z = 300, tt = O.naturalWidth / O.naturalHeight, K = Math.min(O.naturalWidth, W), H = Math.min(O.naturalHeight, Z), $ = tt >= 1 ? K : H * tt, ot = tt >= 1 ? K / tt : H;
              let it = xt;
              if (w) {
                const ct = w.match(/<img[^>]+src=["']([^"']+)["']/i);
                ct && /\.(gif|webp|apng)(\?|#|$)/i.test(ct[1]) && (it = ct[1].replace(/&amp;/g, "&"));
              }
              const Q = {
                id: Rt(10),
                type: "image",
                x: _.x,
                y: _.y,
                w: $,
                h: ot,
                z: t.nextZ(),
                data: { src: it }
              };
              t.addNode(Q), t.select(Q.id);
            }, O.src = xt;
          }, at.readAsDataURL(st);
          return;
        }
    }
    const z = Ds(v) ?? Ds(w);
    if (z) {
      l(y);
      const rt = t.screenToCanvas(r, s), st = await Nl(
        z,
        rt.x,
        rt.y,
        t.nextZ()
      );
      st && (t.addNode(st), t.select(st.id));
      return;
    }
    if (Su(v)) {
      const rt = vu(v);
      if (rt) {
        l(y);
        const st = {
          id: Rt(10),
          type: "youtube",
          x,
          y: b,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: rt, url: v.trim() }
        };
        t.addNode(st), t.select(st.id);
        return;
      }
    }
    const A = w.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (A)
      try {
        const rt = Oa(A);
        if (rt.length > 0) {
          l(y);
          const st = {
            id: Rt(10),
            type: "content",
            x,
            y: b,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: rt, markdown: v, borderColor: "#1e1e2e" }
          };
          t.addNode(st), t.select(st.id);
          return;
        }
      } catch {
      }
    if (v.trim()) {
      l(y);
      const rt = await Ys(v), st = {
        id: Rt(10),
        type: "content",
        x,
        y: b,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: rt, markdown: v, borderColor: "#1e1e2e" }
      };
      t.addNode(st), t.select(st.id);
      return;
    }
    t.hasClipboard() && (l(y), t.pasteClipboard(x, b));
  }, d = (y) => {
    const x = y.target;
    if (ar(x)) return;
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
    const b = y.ctrlKey || y.metaKey;
    if (b && y.key === "c") {
      t.copySelected();
      return;
    }
    if (b && y.key === "x") {
      t.copySelected();
      return;
    }
    if (b && y.key.toLowerCase() === "f") {
      y.preventDefault(), o.dispatchEvent(new CustomEvent("sb:search-open"));
      return;
    }
    if (b && y.key === "d") {
      y.preventDefault(), t.duplicateSelected();
      return;
    }
    if (b && y.key === "g") {
      y.preventDefault(), y.shiftKey ? t.ungroupSelected() : t.groupSelected();
      return;
    }
    if (y.shiftKey && !b && y.key === "H") {
      y.preventDefault(), t.flipSelectedHorizontal();
      return;
    }
    if (y.shiftKey && !b && y.key === "V") {
      y.preventDefault(), t.flipSelectedVertical();
      return;
    }
    if (b && y.key === "]") {
      y.preventDefault();
      const w = Array.from(t.selection);
      y.altKey ? t.bringToFront(w) : t.bringForward(w);
      return;
    }
    if (b && y.key === "[") {
      y.preventDefault();
      const w = Array.from(t.selection);
      y.altKey ? t.sendToBack(w) : t.sendBackward(w);
      return;
    }
    if (!b && !y.altKey && !y.shiftKey) {
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
      if (y.key === "c") {
        t.setMode("edge");
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
    if (b && y.key === "z") {
      y.preventDefault(), y.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (b && y.key === "a") {
      y.preventDefault(), t.selectMultiple(t.getAllNodes().map((w) => w.id));
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
    if (b && (y.key === "=" || y.key === "+")) {
      y.preventDefault(), t.zoomIn();
      return;
    }
    if (b && y.key === "-") {
      y.preventDefault(), t.zoomOut();
      return;
    }
    if (b && y.key === "0") {
      y.preventDefault(), t.fitToContent();
      return;
    }
  };
  function f(y, x) {
    y.addEventListener("pointermove", a), y.addEventListener("copy", h), y.addEventListener("cut", c), y.addEventListener("paste", p), x.addEventListener("keydown", d);
  }
  function g(y, x) {
    y.removeEventListener("pointermove", a), y.removeEventListener("copy", h), y.removeEventListener("cut", c), y.removeEventListener("paste", p), x.removeEventListener("keydown", d);
  }
  f(o, n);
  const m = setInterval(() => {
    if (!e) return;
    const y = e.ownerDocument;
    y !== o && (g(o, n), o = y, n = y.defaultView ?? window, r = n.innerWidth / 2, s = n.innerHeight / 2, f(o, n));
  }, 500);
  return () => {
    clearInterval(m), g(o, n);
  };
}
async function aa(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const n = t.measuredHeights, r = Qp(o, n, t), s = e.padding ?? 40, i = e.background !== !1, a = e.format === "png", h = r.w + s * 2, c = r.h + s * 2, l = r.x - s, p = r.y - s, d = await Yl(o, t, n, l, p, a), f = i ? Fn(t.boardBackground).canvasBg : "transparent", g = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${h}" height="${c}" viewBox="0 0 ${h} ${c}">`,
    `<rect width="${h}" height="${c}" fill="${f}"/>`,
    ...d,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    la(new Blob([g], { type: "image/svg+xml" }), "board.svg");
  else {
    const m = e.scale ?? 4, y = await df(g, h, c, m);
    la(y, "board.png");
  }
}
function Qp(t, e, o) {
  let n = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const h of t) {
    if (h.type === "edge") continue;
    const c = o.resolveHeight(h);
    n = Math.min(n, h.x), r = Math.min(r, h.y), s = Math.max(s, h.x + h.w), i = Math.max(i, h.y + c);
  }
  const a = new Map(t.map((h) => [h.id, h]));
  for (const h of t) {
    if (h.type !== "edge") continue;
    const c = h, l = a.get(c.data.fromId), p = a.get(c.data.toId);
    if (!l || !p) continue;
    const d = Pe(
      l,
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
    n = Math.min(n, d.bounds.x), r = Math.min(r, d.bounds.y), s = Math.max(s, d.bounds.x + d.bounds.w), i = Math.max(i, d.bounds.y + d.bounds.h);
  }
  return isFinite(n) ? { x: n, y: r, w: s - n, h: i - r } : { x: 0, y: 0, w: 100, h: 100 };
}
async function Yl(t, e, o, n, r, s) {
  const i = new Map(t.map((c) => [c.id, c])), a = [...t].sort((c, l) => c.z - l.z), h = [];
  for (const c of a) {
    const l = c.x - n, p = c.y - r, d = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        h.push(Jp(c, l, p, d));
        break;
      case "content":
        h.push($p(c, l, p, c.w, d));
        break;
      case "draw":
        h.push(_p(c, n, r));
        break;
      case "shape":
        h.push(ef(c, l, p, c.w, d));
        break;
      case "text":
        h.push(of(c, l, p, c.w, d));
        break;
      case "sticky":
        h.push(nf(c, l, p, c.w, d));
        break;
      case "image":
        h.push(await rf(c, l, p, c.w, d, s));
        break;
      case "youtube":
        h.push(await sf(c, l, p, c.w, d, s));
        break;
      case "edge": {
        const f = c, g = i.get(f.data.fromId), m = i.get(f.data.toId);
        g && m && h.push(lf(f, g, m, o, n, r));
        break;
      }
    }
  }
  return h;
}
function To(t, e, o, n, r, s, i) {
  const a = [];
  if (s) {
    const h = e + n / 2, c = o + r / 2;
    a.push(`transform="rotate(${s}, ${h}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && a.push(`opacity="${i}"`), `<g ${a.join(" ")}>${t}</g>`;
}
function Jp(t, e, o, n) {
  const r = t.data, s = r.backgroundColor || "rgba(0,0,0,0.02)", i = r.borderColor || "#d1d5db", a = r.borderWidth ?? 1, h = Er(r.borderStyle, a), c = r.label ? gn(r.label) : "";
  let l = `<rect x="${e}" y="${o}" width="${t.w}" height="${n}" rx="4" fill="${s}" stroke="${i}" stroke-width="${a}"` + (h ? ` stroke-dasharray="${h}"` : "") + "/>";
  return c && (l += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), To(l, e, o, t.w, n, t.rotation, r.opacity);
}
function $p(t, e, o, n, r) {
  var p;
  const s = t.data, i = ((p = s.markdown) == null ? void 0 : p.trim()) || "", a = s.borderColor, h = s.borderWidth ?? 0, c = Er(s.borderStyle, h);
  let l = "";
  return a && h > 0 ? l += `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="white" stroke="${a}" stroke-width="${h}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : l += `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="white"/>`, i && (l += ri(i, e + 12, o + 20, n - 24, 14, 1.6, "#374151", "left", "sans-serif")), To(l, e, o, n, r, t.rotation, s.opacity);
}
function _p(t, e, o) {
  const n = t.data, r = n.points.map(
    ([a, h, c]) => [a + t.x - e, h + t.y - o, c]
  );
  if (r.length === 0) return "";
  if (n.tool === "vector")
    return tf(r, n, t);
  const s = no(n.strokeStyle);
  let i = "";
  if (n.fill) {
    const a = r.map(([h, c]) => [h, c]);
    if (a.length > 2) {
      const h = a.map((c, l) => `${l === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ") + " Z";
      i += `<path d="${h}" fill="${n.fill}" fill-opacity="0.4" stroke="none"/>`;
    }
  }
  if (s) {
    const a = r.map((c, l) => `${l === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" "), h = s.map((c) => c * Math.max(n.strokeWidth, 1)).join(" ");
    i += `<path d="${a}" fill="none" stroke="${n.color}" stroke-width="${n.strokeWidth}" stroke-dasharray="${h}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const a = qs(r, { size: n.strokeWidth });
    a && (i += `<path d="${a}" fill="${n.color}" stroke="none"/>`);
  }
  return n.opacity !== void 0 && n.opacity !== 1 ? `<g opacity="${n.opacity}">${i}</g>` : i;
}
function tf(t, e, o) {
  const n = t.map((h, c) => `${c === 0 ? "M" : "L"}${h[0].toFixed(2)},${h[1].toFixed(2)}`).join(" ") + " Z", r = no(e.strokeStyle), s = r ? ` stroke-dasharray="${r.map((h) => h * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${n}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, a = o.h === "auto" ? 0 : o.h;
  return To(i, o.x, o.y, o.w, a, o.rotation, e.opacity);
}
function ef(t, e, o, n, r) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: no(s.strokeStyle),
    seed: t.id
  };
  let a;
  const h = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      a = Wn(e, o, n, r, i, h);
      break;
    case "ellipse":
      a = Ir(e + n / 2, o + r / 2, n, r, i);
      break;
    case "diamond":
      a = zr(e, o, n, r, i, h);
      break;
    case "line": {
      const l = s.startPoint ?? [0, 0], p = s.endPoint ?? [n, r];
      a = Ho(e + l[0], o + l[1], e + p[0], o + p[1], i);
      break;
    }
    case "arrow": {
      const l = s.startPoint ?? [0, 0], p = s.endPoint ?? [n, r];
      a = Tr(e + l[0], o + l[1], e + p[0], o + p[1], i);
      break;
    }
    default:
      a = Wn(e, o, n, r, i);
  }
  const c = a.map(
    (l) => `<path d="${l.d}" fill="${l.fill || "none"}" stroke="${l.stroke}" stroke-width="${l.strokeWidth}"` + (l.strokeDasharray ? ` stroke-dasharray="${l.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return To(c, e, o, n, r, t.rotation, s.opacity);
}
function of(t, e, o, n, r) {
  const s = t.data, i = r || s.text.split(`
`).length * s.fontSize * 1, a = ko(s.fontFamily), h = !!s.borderColor, c = h ? 6 : 0;
  let l = "";
  if (h) {
    const d = s.borderWidth ?? 1, f = Er(s.borderStyle, d);
    l += `<rect x="${e}" y="${o}" width="${n}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${d}"` + (f ? ` stroke-dasharray="${f}"` : "") + "/>";
  }
  const p = s.align === "center" ? e + n / 2 : s.align === "right" ? e + n - c : e + c;
  return l += ri(
    s.text,
    p,
    o + c + s.fontSize,
    n - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    a
  ), To(l, e, o, n, i, t.rotation, s.opacity);
}
function nf(t, e, o, n, r) {
  const s = t.data, i = s.fontSize ?? 16, a = `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="2" fill="${s.color}"/>` + ri(s.text, e + 12, o + 12 + i, n - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return To(a, e, o, n, r, t.rotation, s.opacity);
}
async function rf(t, e, o, n, r, s) {
  const i = t.data;
  let a = i.src;
  if (s && a && !a.startsWith("data:"))
    try {
      a = await wr(a);
    } catch {
    }
  const h = i.borderColor, c = i.borderWidth ?? 0, l = Er(i.borderStyle, c);
  let p = `<image href="${gn(a)}" x="${e}" y="${o}" width="${n}" height="${r}" preserveAspectRatio="xMidYMid slice"/>`;
  return h && c > 0 && (p += `<rect x="${e}" y="${o}" width="${n}" height="${r}" fill="none" stroke="${h}" stroke-width="${c}"` + (l ? ` stroke-dasharray="${l}"` : "") + "/>"), To(p, e, o, n, r, t.rotation, i.opacity);
}
async function sf(t, e, o, n, r, s) {
  const i = t.data;
  let a = Cu(i.videoId);
  if (s)
    try {
      a = await wr(a);
    } catch {
    }
  let h = `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="#1a1a1a"/><image href="${gn(a)}" x="${e}" y="${o}" width="${n}" height="${r}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + n / 2, l = o + r / 2, p = Math.min(n, r) * 0.12;
  return h += `<circle cx="${c}" cy="${l}" r="${p}" fill="rgba(0,0,0,0.6)"/><path d="${af(c, l, p * 0.5)}" fill="white"/>`, To(h, e, o, n, r, t.rotation, i.opacity);
}
function af(t, e, o) {
  const n = o * 0.15, r = t - o * 0.7 + n, s = e - o, i = t + o + n, a = e, h = r, c = e + o;
  return `M${r},${s} L${i},${a} L${h},${c} Z`;
}
function lf(t, e, o, n, r, s) {
  const i = t.data, a = Pe(
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
  ), h = `translate(${-r}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, l = i.strokeWidth;
  let p = `<path d="${a.path}" fill="none" stroke="${i.color}" stroke-width="${l}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const d = i.arrowHeadSize ?? Math.max(8, l * 3), f = i.arrowTailSize ?? Math.max(8, l * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      p += `<path d="${go(a.x2, a.y2, a.arrowAngle, d)}" fill="none" stroke="${i.color}" stroke-width="${l}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      p += `<path d="${fr(a.x2, a.y2, a.arrowAngle, d)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const g = d / 3;
      p += `<circle cx="${a.x2}" cy="${a.y2}" r="${g}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      p += `<path d="${go(a.x1, a.y1, a.tailAngle, f)}" fill="none" stroke="${i.color}" stroke-width="${l}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      p += `<path d="${fr(a.x1, a.y1, a.tailAngle, f)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const g = f / 3;
      p += `<circle cx="${a.x1}" cy="${a.y1}" r="${g}" fill="${i.color}"/>`;
    }
  }
  return i.label && (p += `<text x="${a.labelX}" y="${a.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${gn(i.label)}</text>`), `<g transform="${h}">${p}</g>`;
}
function ri(t, e, o, n, r, s, i, a, h) {
  if (!t) return "";
  const c = a === "center" ? "middle" : a === "right" ? "end" : "start", l = cf(t, n, r), p = r * s, d = l.map(
    (f, g) => `<tspan x="${e}" dy="${g === 0 ? 0 : p}">${gn(f)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${r}" fill="${i}" font-family="${gn(h)}" text-anchor="${c}">${d}</text>`;
}
function cf(t, e, o) {
  const n = o * 0.55, r = Math.max(1, Math.floor(e / n)), s = [];
  for (const i of t.split(`
`)) {
    if (!i.trim()) {
      s.push("");
      continue;
    }
    const a = i.split(/\s+/);
    let h = "";
    for (const c of a) {
      const l = h ? h + " " + c : c;
      l.length > r && h ? (s.push(h), h = c) : h = l;
    }
    h && s.push(h);
  }
  return s;
}
function Er(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function gn(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function wr(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((n, r) => {
    const s = new FileReader();
    s.onloadend = () => n(s.result), s.onerror = r, s.readAsDataURL(o);
  });
}
function df(t, e, o, n) {
  return new Promise((r, s) => {
    const i = new Image(), a = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), h = URL.createObjectURL(a);
    i.onload = () => {
      const c = document.createElement("canvas");
      c.width = e * n, c.height = o * n;
      const l = c.getContext("2d");
      l.scale(n, n), l.drawImage(i, 0, 0, e, o), URL.revokeObjectURL(h), c.toBlob((p) => {
        p ? r(p) : s(new Error("Canvas toBlob failed"));
      }, "image/png");
    }, i.onerror = () => {
      URL.revokeObjectURL(h), s(new Error("Failed to load SVG as image"));
    }, i.src = h;
  });
}
const hf = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), on = /* @__PURE__ */ new Map(), uf = 12;
function pf(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const n = o.data.fontFamily;
      n && !hf.has(n) && e.add(n);
    }
  return [...e];
}
async function ff(t) {
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
        n = await wr(Xa);
      else {
        const a = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!a) continue;
        n = await wr(a[1]);
      }
      const r = `@font-face { font-family: '${o}'; src: url('${n}') format('woff2'); }`;
      if (on.size >= uf) {
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
async function yf(t, e) {
  const o = t.getNode(e);
  if (!o || o.type !== "frame") return "";
  const n = t.resolveHeight(o), r = 0, s = o.w + r * 2, i = n + r * 2, a = o.x - r, h = o.y - r, c = [o], l = /* @__PURE__ */ new Set([e]), p = (b) => {
    l.has(b.id) || b.type === "edge" || (l.add(b.id), c.push(b));
  };
  for (const b of t.getNodesInRect({ x: o.x, y: o.y, w: o.w, h: n }))
    p(b);
  for (const b of t.getFrameChildren(e))
    p(b);
  for (const b of t.getAllNodes())
    if (b.type === "edge") {
      const w = b;
      l.has(w.data.fromId) && l.has(w.data.toId) && c.push(b);
    }
  const d = t.measuredHeights, f = await Yl(c, t, d, a, h, !0), g = pf(c), m = await ff(g), y = Fn(t.boardBackground).canvasBg, x = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    m ? `<defs><style>${m}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${y}"/>`,
    ...f,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(x)}`;
}
function la(t, e) {
  const o = URL.createObjectURL(t), n = document.createElement("a");
  n.href = o, n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(o);
}
const ca = [
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
], da = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function ha(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const Gl = [
  ...ca,
  ...ha(ca, "phone-landscape"),
  ...da,
  ...ha(da, "tablet-landscape"),
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
], gf = new Map(Gl.map((t) => [t.key, t]));
function Bs(t) {
  return gf.get(t);
}
function jl(t) {
  return t.w / t.h;
}
const mf = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function bf() {
  const t = /* @__PURE__ */ new Map();
  for (const e of Gl) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: mf[e] ?? e,
    presets: o
  }));
}
function xf(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, n = parseInt(e.substring(2, 4), 16) || 0, r = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * n + 0.114 * r) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function rs(t, e, o) {
  let n = !1;
  for (let r = 0, s = o.length - 1; r < o.length; s = r++) {
    const [i, a] = o[r], [h, c] = o[s];
    a > e != c > e && t < (h - i) * (e - a) / (c - a) + i && (n = !n);
  }
  return n;
}
function ss(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function wf(t, e, o) {
  try {
    const n = await navigator.clipboard.read();
    let r = null;
    for (const i of n)
      if (i.types.includes("text/html")) {
        const a = await (await i.getType("text/html")).text();
        if (a.includes("sbd-clipboard") || a.includes("data-sbd-nodes=")) {
          const h = Ol(a);
          if (h) {
            t.setClipboard(h), t.pasteClipboard(e, o);
            return;
          }
          if (t.hasClipboard()) {
            t.pasteClipboard(e, o);
            return;
          }
        }
        r = a;
      }
    for (const i of n) {
      const a = i.types.find((h) => h.startsWith("image/"));
      if (a) {
        const h = await i.getType(a), c = await new Promise((b) => {
          const w = new FileReader();
          w.onload = () => b(w.result), w.readAsDataURL(h);
        }), l = new Image();
        await new Promise((b) => {
          l.onload = () => b(), l.src = c;
        });
        const p = l.naturalWidth / l.naturalHeight, d = Math.min(l.naturalWidth, 400), f = Math.min(l.naturalHeight, 300), g = p >= 1 ? d : f * p, m = p >= 1 ? d / p : f;
        let y = c;
        if (r) {
          const b = r.match(/<img[^>]+src=["']([^"']+)["']/i);
          b && /\.(gif|webp|apng)(\?|#|$)/i.test(b[1]) && (y = b[1].replace(/&amp;/g, "&"));
        }
        const x = {
          id: Rt(10),
          type: "image",
          x: e,
          y: o,
          w: g,
          h: m,
          z: t.nextZ(),
          data: { src: y }
        };
        t.addNode(x), t.select(x.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (r) {
      const i = r.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const a = Oa(i);
        if (a.length > 0) {
          const h = {
            id: Rt(10),
            type: "content",
            x: e,
            y: o,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: a, markdown: s || "", borderColor: "#1e1e2e" }
          };
          t.addNode(h), t.select(h.id);
          return;
        }
      } catch {
      }
    }
    if (s != null && s.trim()) {
      const i = await Ys(s), a = {
        id: Rt(10),
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
async function ua(t) {
  const e = t.getClipboardNodes();
  if (e.length === 0) return;
  const o = [];
  for (const a of e)
    if (a.type === "content") {
      const h = a.data;
      h.markdown && o.push(h.markdown);
    } else if (a.type === "text") {
      const h = a.data;
      h.text && o.push(h.text);
    } else if (a.type === "image") {
      const h = a.data;
      o.push(h.src.startsWith("http") ? h.src : h.alt || "[Image]");
    } else if (a.type === "shape") {
      const h = a.data;
      h.label && o.push(h.label);
    } else if (a.type === "sticky") {
      const h = a.data;
      h.text && o.push(h.text);
    } else if (a.type === "edge") {
      const h = a.data;
      h.label && o.push(h.label);
    }
  const n = o.join(`

`), r = n.split(`
`).filter(Boolean).map((a) => `<p>${a}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${Hl(e)}">${r || "<p></p>"}</div>`;
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
function lr(t) {
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
function pa(t, e) {
  const o = e.x - t.x, n = e.y - t.y;
  return { dist: Math.sqrt(o * o + n * n), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const nn = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function kf({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: n,
  observeElement: r,
  unobserveElement: s,
  isContainer: i,
  children: a
}) {
  const h = pt(null);
  Mt(() => {
    if (t.h !== "auto") return;
    const p = h.current;
    if (!p) return;
    const d = p.offsetHeight;
    return d > 0 && n(t.id, d), r(p, () => {
      const f = p.offsetHeight;
      f > 0 && n(t.id, f);
    }), () => s(p);
  }, [t.id, t.h, n, r, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, l = Ut(() => ({
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
      ref: h,
      "data-node-id": t.id,
      className: e ? void 0 : "sb-block-inert",
      style: l,
      children: a
    }
  );
}
function vf({
  node: t,
  engine: e,
  onDone: o
}) {
  const n = pt(null), r = pt(t.data.label ?? ""), s = pt(t);
  s.current = t;
  const i = pt(t.data.label ?? ""), a = pt(!1);
  Mt(() => () => {
    const p = s.current, d = r.current.trim();
    if (d !== i.current) {
      const g = { data: { ...p.data, label: d || void 0 } }, m = n.current;
      if (m && d) {
        const x = p.h === "auto" ? 100 : p.h, b = m.scrollHeight + 24;
        b > x && (g.h = b);
      }
      a.current ? (a.current = !1, e.updateNode(p.id, g)) : e.updateNodeWithHistory(p.id, g);
    }
  }, []);
  const h = t.h === "auto" ? 100 : t.h, c = t.data.labelFontSize ?? 14, l = t.data.fill && t.data.fillStyle === "solid" ? xf(t.data.fill) : t.data.stroke;
  return /* @__PURE__ */ u(
    "div",
    {
      "data-node-id": t.id,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: h,
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
          ref: n,
          autoFocus: !0,
          defaultValue: t.data.label ?? "",
          placeholder: "",
          rows: 1,
          onBlur: () => o(),
          onKeyDown: (p) => {
            p.key === "Escape" && p.currentTarget.blur(), p.stopPropagation();
          },
          onInput: (p) => {
            const d = p.currentTarget;
            a.current || (a.current = !0, e.pushHistorySnapshot()), r.current = d.value;
            const f = s.current;
            e.updateNode(f.id, {
              data: { ...f.data, label: d.value || void 0 }
            }), d.style.height = "auto", d.style.height = d.scrollHeight + "px";
            const m = d.scrollHeight + 24;
            m > h && e.updateNode(t.id, { h: m });
          },
          onPointerDown: (p) => p.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: c,
            fontFamily: ko(t.data.labelFontFamily ?? wo),
            color: l,
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
const fa = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none"
};
function Sf({
  safariWebKitWorkaround: t,
  viewport: e,
  viewportTransform: o,
  children: n
}) {
  return t ? /* @__PURE__ */ u(
    "div",
    {
      style: {
        ...fa,
        transform: `translate3d(${e.x}px, ${e.y}px, 0)`,
        transformOrigin: "0 0",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden"
      },
      children: /* @__PURE__ */ u(
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
  ) : /* @__PURE__ */ u(
    "div",
    {
      style: {
        ...fa,
        transform: o,
        transformOrigin: "0 0"
      },
      children: n
    }
  );
}
function Mf({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: n,
  dataFlowEdgeOverlay: r = "off",
  minimapVisible: s = !0
}) {
  var Si;
  const { labels: i } = Jt(), a = pt(null), h = pt(null), c = () => {
    var k;
    return ((k = a.current) == null ? void 0 : k.ownerDocument) ?? document;
  }, [l, p] = et({ w: 0, h: 0 }), [d, f] = et({ ...t.viewport }), [g, m] = et(t.getAllNodes()), [y, x] = et(
    new Set(t.selection)
  ), [b, w] = et(!1), [v, M] = et(t.mode), [C, z] = et(t.activeGroupId), [A, P] = et(() => t.getSearchState()), [Y, G] = et([]), [rt, st] = et(t.snapToGrid), [at, xt] = et(t.gridSize), [O, _] = et(t.smartGuides), [W, Z] = et([]), [tt, K] = et(t.boardBackground), H = Ut(() => y.size === 1 ? Array.from(y)[0] : y.size > 1 ? [...y].sort().join("\0") : "canvas-none", [y]), $ = Ar(t, H), ot = pt(!1), it = pt(!1), Q = pt(/* @__PURE__ */ new Map()), ct = pt(!1), yt = pt(!1), J = pt(null), dt = pt(null), wt = lt((k) => {
    c().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: k } }));
  }, []);
  Mt(() => {
    const k = (T) => {
      var F, E;
      if (T.key === " " && !T.repeat && !ot.current) {
        const B = (F = T.target) == null ? void 0 : F.tagName;
        if (B === "INPUT" || B === "TEXTAREA" || (E = T.target) != null && E.isContentEditable) return;
        ot.current = !0;
        const R = a.current;
        R && (R.style.cursor = "grab"), T.preventDefault();
      }
    }, L = (T) => {
      if (T.key === " ") {
        ot.current = !1, it.current = !1;
        const F = a.current;
        F && (F.style.cursor = t.lassoSelect ? nn : lr(t.mode));
      }
    };
    return window.addEventListener("keydown", k), window.addEventListener("keyup", L), () => {
      window.removeEventListener("keydown", k), window.removeEventListener("keyup", L);
    };
  }, []), Mt(() => {
    const k = (T) => {
      Q.current.delete(T.pointerId), T.pointerType === "pen" && (yt.current = !1), Q.current.size === 0 && wt(!1), J.current && (clearTimeout(J.current), J.current = null, dt.current = null);
    }, L = c();
    return L.addEventListener("pointerup", k), L.addEventListener("pointercancel", k), () => {
      L.removeEventListener("pointerup", k), L.removeEventListener("pointercancel", k);
    };
  }, [wt]);
  const [gt, mt] = et(null), [At, Nt] = et(null), [Lt, ft] = et(null), Xt = pt(Lt);
  Mt(() => {
    const k = Xt.current;
    Xt.current = Lt, Lt ? t.notifyEdgeProgress(bp(Lt)) : k && t.notifyEdgeEnd();
  }, [Lt, t]);
  const Gt = pt(At);
  Mt(() => {
    if (t.mode !== "frame") {
      Gt.current && t.notifyRectDragEnd(), Gt.current = null;
      return;
    }
    const k = Gt.current;
    Gt.current = At, At ? t.notifyRectDragProgress({
      kind: "frame",
      startX: At.startX,
      startY: At.startY,
      endX: At.endX,
      endY: At.endY
    }) : k && t.notifyRectDragEnd();
  }, [At, t.mode, t]);
  const [Kt, $t] = et(null);
  Mt(() => {
    const k = a.current;
    if (!k) return;
    t.setContainer(k);
    const L = () => {
      const B = k.getBoundingClientRect();
      t.containerOffset = { x: B.left, y: B.top };
    };
    L();
    const T = new ResizeObserver((B) => {
      var j;
      const { width: R, height: D } = ((j = B[0]) == null ? void 0 : j.contentRect) ?? { width: 0, height: 0 };
      p((q) => q.w === R && q.h === D ? q : { w: R, h: D }), t.setContainerSize(R, D), L();
    });
    T.observe(k);
    const F = () => L();
    window.addEventListener("scroll", F, !0), window.addEventListener("resize", F);
    const E = window.visualViewport;
    return E && (E.addEventListener("resize", F), E.addEventListener("scroll", F)), () => {
      T.disconnect(), window.removeEventListener("scroll", F, !0), window.removeEventListener("resize", F), E && (E.removeEventListener("resize", F), E.removeEventListener("scroll", F));
    };
  }, [t]);
  const [ht, ae] = et({}), he = lt((k, L) => {
    ae(
      (T) => T[k] === L ? T : { ...T, [k]: L }
    ), t.updateMeasuredHeight(k, L);
  }, [t]), le = pt(null), ie = pt(/* @__PURE__ */ new Map());
  function be() {
    return le.current || (le.current = new ResizeObserver((k) => {
      var L;
      for (const T of k)
        (L = ie.current.get(T.target)) == null || L(T);
    })), le.current;
  }
  const ve = lt((k, L) => {
    ie.current.set(k, L), be().observe(k);
  }, []), Fe = lt((k) => {
    var L;
    ie.current.delete(k), (L = le.current) == null || L.unobserve(k);
  }, []);
  Mt(() => () => {
    var k;
    (k = le.current) == null || k.disconnect(), le.current = null, ie.current.clear();
  }, []);
  const Uo = Ut(() => new Set(g.map((k) => k.id)), [g]);
  Mt(() => {
    ae((k) => {
      let L = !1;
      const T = {};
      for (const [F, E] of Object.entries(k))
        Uo.has(F) ? T[F] = E : L = !0;
      return L ? T : k;
    });
  }, [Uo]);
  const Je = lt(
    (k, L, T) => {
      let F, E;
      if (o && k.data.sourcePort) {
        const B = o.get(L.type);
        B != null && B.ports && (F = Te(L, B.ports, k.data.sourcePort, d.zoom, ht, B.portAnchor ?? "bbox") ?? void 0);
      }
      if (o && k.data.targetPort) {
        const B = o.get(T.type);
        B != null && B.ports && (E = Te(T, B.ports, k.data.targetPort, d.zoom, ht, B.portAnchor ?? "bbox") ?? void 0);
      }
      return { sourcePortPos: F, targetPortPos: E };
    },
    [o, d.zoom, ht]
  );
  lt(
    (k) => t.zoomToNode(k),
    [t, i]
  );
  const xe = lt(
    (k, L) => {
      if (!k.rotation)
        return { minX: k.x, minY: k.y, maxX: k.x + k.w, maxY: k.y + L };
      const T = k.x + k.w / 2, F = k.y + L / 2, E = k.rotation * Math.PI / 180, B = Math.cos(E), R = Math.sin(E), D = [
        [k.w / 2, L / 2],
        [-k.w / 2, L / 2],
        [-k.w / 2, -L / 2],
        [k.w / 2, -L / 2]
      ];
      let j = 1 / 0, q = 1 / 0, X = -1 / 0, U = -1 / 0;
      for (const [N, V] of D) {
        const nt = T + N * B - V * R, vt = F + N * R + V * B;
        j = Math.min(j, nt), q = Math.min(q, vt), X = Math.max(X, nt), U = Math.max(U, vt);
      }
      return { minX: j, minY: q, maxX: X, maxY: U };
    },
    []
  ), I = 8, ut = lt(
    (k, L) => L.filter((T) => {
      if (T.type === "edge") {
        const B = T.data, R = t.getNode(B.fromId), D = t.getNode(B.toId);
        if (!R || !D) return !1;
        const { x1: j, y1: q, x2: X, y2: U } = Ti(R, D, ht);
        return j >= k.x && j <= k.x + k.w && q >= k.y && q <= k.y + k.h && X >= k.x && X <= k.x + k.w && U >= k.y && U <= k.y + k.h;
      }
      const F = T.h === "auto" ? ht[T.id] ?? 100 : T.h, E = xe(T, F);
      return E.minX >= k.x && E.maxX <= k.x + k.w && E.minY >= k.y && E.maxY <= k.y + k.h;
    }),
    [xe, ht]
  ), de = lt(
    (k, L) => k.length < 3 ? [] : L.filter((T) => {
      if (T.type === "edge") {
        const R = T, D = t.getNode(R.data.fromId), j = t.getNode(R.data.toId);
        if (!D || !j) return !1;
        const { x1: q, y1: X, x2: U, y2: N } = Ti(D, j, ht);
        return rs(q, X, k) && rs(U, N, k);
      }
      const F = T.h === "auto" ? ht[T.id] ?? 100 : T.h, E = T.x + T.w / 2, B = T.y + F / 2;
      return rs(E, B, k);
    }),
    [t, ht]
  ), re = Ut(() => {
    if (y.size < 2) return null;
    let k = 1 / 0, L = 1 / 0, T = -1 / 0, F = -1 / 0;
    for (const E of y) {
      const B = g.find((j) => j.id === E);
      if (!B || B.type === "edge") continue;
      const R = B.h === "auto" ? ht[B.id] ?? 100 : B.h, D = xe(B, R);
      k = Math.min(k, D.minX), L = Math.min(L, D.minY), T = Math.max(T, D.maxX), F = Math.max(F, D.maxY);
    }
    return k === 1 / 0 ? null : {
      x: k - I,
      y: L - I,
      w: T - k + I * 2,
      h: F - L + I * 2
    };
  }, [y, g, ht, xe]), Re = Ut(() => {
    if (!C) return null;
    const k = t.getAllGroupDescendantNodes(C);
    if (k.length === 0) return null;
    let L = 1 / 0, T = 1 / 0, F = -1 / 0, E = -1 / 0;
    for (const R of k) {
      if (R.type === "edge") continue;
      const D = R.h === "auto" ? ht[R.id] ?? 100 : R.h, j = xe(R, D);
      L = Math.min(L, j.minX), T = Math.min(T, j.minY), F = Math.max(F, j.maxX), E = Math.max(E, j.maxY);
    }
    if (L === 1 / 0) return null;
    const B = 8;
    return { x: L - B, y: T - B, w: F - L + B * 2, h: E - T + B * 2 };
  }, [C, g, ht, xe, t]), qt = Ut(() => {
    const k = performance.now();
    if (g.filter(
      (Ct) => {
        if (o) {
          const Pt = o.get(Ct.type);
          return Pt && !Pt.isSVGOnly;
        }
        return Ct.type === "content" || Ct.type === "draw" || Ct.type === "shape" || Ct.type === "image" || Ct.type === "text" || Ct.type === "frame" || Ct.type === "sticky";
      }
    ), l.w <= 0 || l.h <= 0)
      return null;
    const { zoom: L, x: T, y: F } = d, B = Math.min(500, 280 / Math.max(L, 0.1)), R = {
      x: -T / L - B,
      y: -F / L - B,
      w: l.w / L + B * 2,
      h: l.h / L + B * 2
    }, D = t.getNodesInRect(R), j = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set();
    let N = 0, V = 0, nt = 0, vt = 0, zt = 0;
    const Dt = (Ct, Pt = !1) => {
      const bt = t.getNode(Ct);
      if (!bt) return;
      const Tt = j.has(bt.id);
      j.set(bt.id, bt), bt.type === "edge" ? U.add(bt.id) : (Tt || q.add(bt.id), Pt && X.add(bt.id));
    };
    for (const Ct of D) {
      const Pt = X.size;
      Dt(Ct.id, !0), X.size > Pt && (N += 1);
    }
    for (const Ct of y)
      Dt(Ct, !0);
    const It = Kt ? { x: Kt.cursorX, y: Kt.cursorY } : Lt ? { x: Lt.cursorX, y: Lt.cursorY } : null;
    if (It) {
      const Ct = 200 / Math.max(0.2, d.zoom), Pt = t.getNodesInRect({
        x: It.x - Ct,
        y: It.y - Ct,
        w: Ct * 2,
        h: Ct * 2
      });
      for (const bt of Pt)
        bt.type !== "edge" && Dt(bt.id, !0);
    }
    const Et = Array.from(X);
    for (const Ct of Et) {
      const Pt = t.getEdgesForNode(Ct);
      for (const bt of Pt) {
        const Tt = bt.data, Vt = U.has(bt.id);
        j.set(bt.id, bt), U.add(bt.id), Vt || (vt += 1);
        const Bt = q.size;
        Dt(Tt.fromId, !1), q.size > Bt && (V += 1);
        const Wt = q.size;
        Dt(Tt.toId, !1), q.size > Wt && (V += 1);
      }
    }
    if (!b)
      for (const Ct of g) {
        if (Ct.type !== "edge" || U.has(Ct.id)) continue;
        const Pt = Ct.data, bt = t.getNode(Pt.fromId), Tt = t.getNode(Pt.toId);
        if (!bt || !Tt) continue;
        let Vt = X.has(Pt.fromId) || X.has(Pt.toId);
        if (!Vt) {
          const Bt = Pe(
            bt,
            Tt,
            Pt.edgeType || "bezier",
            ht,
            Pt.sourceHandle,
            Pt.targetHandle,
            Pt.midpointOffset,
            Pt.curveOffset,
            void 0,
            void 0,
            Pt.sourceT,
            Pt.targetT,
            Pt.attachmentGap
          );
          Vt = Bt.bounds.x < R.x + R.w && Bt.bounds.x + Bt.bounds.w > R.x && Bt.bounds.y < R.y + R.h && Bt.bounds.y + Bt.bounds.h > R.y;
        }
        if (Vt) {
          j.set(Ct.id, Ct), U.add(Ct.id), zt += 1;
          const Bt = q.size;
          Dt(bt.id, !1), q.size > Bt && (nt += 1);
          const Wt = q.size;
          Dt(Tt.id, !1), q.size > Wt && (nt += 1);
        }
      }
    const oe = Array.from(j.values());
    return {
      domNodes: oe.filter((Ct) => {
        if (Ct.type === "edge" || !X.has(Ct.id)) return !1;
        if (o) {
          const Pt = o.get(Ct.type);
          return !!Pt && !Pt.isSVGOnly;
        }
        return Ct.type === "content" || Ct.type === "draw" || Ct.type === "shape" || Ct.type === "image" || Ct.type === "text" || Ct.type === "frame" || Ct.type === "sticky";
      }),
      svgNodes: oe,
      visibleNodeCount: X.size,
      visibleEdgeCount: U.size,
      seedVisibleNodes: N,
      nodesAddedByAdjacency: V,
      nodesAddedByEdgeEndpoints: nt,
      edgesAddedByAdjacency: vt,
      edgesAddedByCrossing: zt,
      cullingMs: performance.now() - k
    };
  }, [d, l, g, y, t, o, ht, Lt, Kt, b]), Po = b ? (qt == null ? void 0 : qt.svgNodes) ?? g : g;
  Mt(() => {
    if (!ke.isEnabled()) return;
    const k = g.reduce((T, F) => T + (F.type === "edge" ? 1 : 0), 0), L = g.length - k;
    ke.recordCulling((qt == null ? void 0 : qt.cullingMs) ?? 0), ke.setVisibilityCounts({
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
  const Ao = pt(0);
  Mt(() => {
    if (!ke.isEnabled() || !qt) return;
    const k = performance.now();
    if (k - Ao.current < 1e3) return;
    Ao.current = k;
    const L = g.reduce((F, E) => F + (E.type === "edge" ? 1 : 0), 0), T = g.length - L;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: qt.visibleNodeCount,
      totalNodes: T,
      visibleEdges: qt.visibleEdgeCount,
      totalEdges: L,
      seedVisibleNodes: qt.seedVisibleNodes,
      nodesAddedByAdjacency: qt.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: qt.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: qt.edgesAddedByAdjacency,
      edgesAddedByCrossing: qt.edgesAddedByCrossing,
      cullingMs: qt.cullingMs
    });
  }, [g, qt, d]), Mt(() => {
    let k = null;
    const L = () => {
      k === null && (k = requestAnimationFrame(() => {
        k = null, m([...t.getAllNodes()]);
      }));
    };
    let T = null;
    const F = () => {
      T === null && (T = requestAnimationFrame(() => {
        T = null, f({ ...t.viewport });
      }));
    }, E = () => {
      x((N) => {
        const V = new Set(t.selection);
        return N.size !== V.size || [...N].some((nt) => !V.has(nt)) ? (Lo((nt) => {
          if (!nt || V.has(nt)) return nt;
          const vt = Vn.current;
          return vt && vt.id === nt && performance.now() < vt.until ? nt : null;
        }), Jo((nt) => nt && !V.has(nt) ? null : nt), Ro((nt) => nt && !V.has(nt) ? null : nt), $o((nt) => nt && !V.has(nt) ? null : nt), _o((nt) => nt && !V.has(nt) ? null : nt), Gn(null), V) : N;
      });
    }, B = () => {
      M(t.mode), t.mode === "edge" && t.deselectAll();
    }, R = () => K(t.boardBackground), D = () => {
      Z([...t.alignGuides]), st(t.snapToGrid), xt(t.gridSize), _(t.smartGuides);
    }, j = () => P(t.getSearchState());
    t.on("change", L), t.on("viewport", F), t.on("selection", E), t.on("mode", B), t.on("background", R), t.on("guides", D), t.on("search", j);
    const q = (N) => z(N), X = () => z(null), U = () => {
      const N = a.current;
      N && (N.style.cursor = t.lassoSelect ? nn : lr(t.mode));
    };
    return t.on("group:enter", q), t.on("group:exit", X), t.on("lassoToggle", U), () => {
      k !== null && cancelAnimationFrame(k), T !== null && cancelAnimationFrame(T), t.off("change", L), t.off("viewport", F), t.off("selection", E), t.off("mode", B), t.off("background", R), t.off("guides", D), t.off("search", j), t.off("group:enter", q), t.off("group:exit", X), t.off("lassoToggle", U);
    };
  }, [t]), Mt(() => {
    const k = a.current;
    if (!k) return;
    const L = (T) => {
      if (!T.ctrlKey && !T.metaKey) {
        const E = T.target.closest(".sb-editor-wrap");
        if (E && E.scrollHeight > E.clientHeight) {
          const B = E.scrollTop <= 0 && T.deltaY < 0, R = E.scrollTop + E.clientHeight >= E.scrollHeight && T.deltaY > 0;
          if (!B && !R) return;
        }
      }
      T.preventDefault(), T.ctrlKey || T.metaKey ? t.zoomByWheel(T.deltaY, T.clientX, T.clientY) : t.pan(-T.deltaX, -T.deltaY);
    };
    return k.addEventListener("wheel", L, { passive: !1 }), () => k.removeEventListener("wheel", L);
  }, [t]);
  const [je, Eo] = et(null), [ro, bn] = et(null), [Zo, Yn] = et(null), [xn, Gn] = et(null), jn = pt({
    x: 0,
    y: 0,
    index: -1
  }), [me, $e] = et(null), Rr = pt(me);
  Mt(() => {
    const k = Rr.current, L = t.mode === "text" ? "text" : t.mode === "note" ? "note" : t.mode === "sticky" ? "sticky" : null;
    if (!L) {
      k && !me && t.notifyRectDragEnd(), Rr.current = me;
      return;
    }
    Rr.current = me, me ? t.notifyRectDragProgress({
      kind: L,
      startX: me.startX,
      startY: me.startY,
      endX: me.endX,
      endY: me.endY
    }) : k && t.notifyRectDragEnd();
  }, [me, t.mode, t]);
  const [Ql, Dr] = et(null), [Jl, $l] = et(null), wn = pt(null), _l = Ut(() => {
    const k = /* @__PURE__ */ new Set();
    for (const L of g) {
      if (L.type !== "edge") continue;
      const T = L;
      T.data.animated && T.data.animatedDirection === "bop" && (k.add(T.data.fromId), k.add(T.data.toId));
    }
    return k;
  }, [g]), [Qo, Lo] = et(null), Wr = pt(null), [hi, Jo] = et(null), [ui, Ro] = et(null), [kn, $o] = et(null), [_e, _o] = et(null), [tc, pi] = et(null);
  Mt(() => {
    const k = (L) => {
      Rc(() => _o(L));
    };
    return t.on("image:cropRequest", k), () => t.off("image:cropRequest", k);
  }, [t]);
  const fi = Qo || ui || hi || kn || _e || tc, ec = Ut(() => {
    const k = (qt == null ? void 0 : qt.domNodes) ?? g.filter((T) => {
      if (o) {
        const F = o.get(T.type);
        return !!F && !F.isSVGOnly;
      }
      return T.type === "content" || T.type === "draw" || T.type === "shape" || T.type === "image" || T.type === "text" || T.type === "frame" || T.type === "sticky";
    });
    if (!_e || k.some((T) => T.id === _e)) return k;
    const L = g.find((T) => T.id === _e);
    return L ? [...k, L] : k;
  }, [qt, g, o, _e]), Br = pt(null), Vn = pt(null), yi = pt(null), [Nr, Fr] = et(/* @__PURE__ */ new Set()), so = pt(/* @__PURE__ */ new Set()), [gi, vn] = et([]), [Kn, Hr] = et(null), Xe = pt([]), io = pt(null), mi = pt(0), Sn = lt(
    (k = !1) => {
      if (t.mode !== "erase") return;
      const L = performance.now();
      if (!k && L - mi.current < 48) return;
      mi.current = L;
      const T = Xe.current;
      t.notifyEraserProgress({
        trail: T.length > 0 ? [...T] : void 0,
        markedIds: Array.from(so.current)
      });
    },
    [t]
  ), [bi, qn] = et([]), Se = pt([]), tn = pt(null);
  Mt(() => {
    if (!Qo) return;
    const k = c(), L = (q) => q.querySelector(
      `[data-node-id="${Qo}"] [contenteditable="true"]`
    ), T = (q) => !q || !(q instanceof HTMLElement) ? !1 : q.isContentEditable || q instanceof HTMLInputElement || q instanceof HTMLTextAreaElement, F = (q) => q.metaKey || q.ctrlKey || q.altKey ? !1 : q.key.length === 1 ? !0 : q.key === "Backspace" || q.key === "Delete" || q.key === "Enter" || q.key === "Tab" || q.key === " ", E = (q) => !!(q.inputType.startsWith("insert") || q.inputType.startsWith("delete")), B = (q) => {
      const X = a.current;
      if (!X) return;
      const U = q.target;
      if (U && X.contains(U)) return;
      q.preventDefault(), q.stopPropagation(), "stopImmediatePropagation" in q && typeof q.stopImmediatePropagation == "function" && q.stopImmediatePropagation();
      const N = L(X);
      N && N.focus();
    }, R = (q) => {
      F(q) && B(q);
    }, D = (q) => {
      E(q) && B(q);
    }, j = (q) => {
      const X = a.current;
      if (!X) return;
      const U = q.target;
      if (!U || X.contains(U) || !T(U)) return;
      const N = L(X);
      requestAnimationFrame(() => {
        try {
          U.blur();
        } catch {
        }
        N && N.focus();
      });
    };
    return k.addEventListener("keydown", R, !0), k.addEventListener("beforeinput", D, !0), k.addEventListener("focusin", j, !0), () => {
      k.removeEventListener("keydown", R, !0), k.removeEventListener("beforeinput", D, !0), k.removeEventListener("focusin", j, !0);
    };
  }, [Qo]);
  const xi = lt(
    (k, L, T, F = "auto") => {
      const E = Rt(10);
      yi.current = E, t.addNode({
        id: E,
        type: "content",
        x: k,
        y: L,
        w: T,
        h: F,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), Un = lt(
    (k, L, T) => {
      const { x: F, y: E } = t.screenToCanvas(k, L);
      if (T) {
        const X = t.hitTestAll(F, E, ht);
        if (X.length > 0) {
          const U = jn.current, N = Math.abs(F - U.x) + Math.abs(E - U.y);
          let V = 0;
          N < 5 && (V = (U.index + 1) % X.length), jn.current = { x: F, y: E, index: V }, t.select(X[V].id);
        } else
          t.deselectAll();
      } else {
        let X = !1;
        for (const U of t.selection) {
          const N = t.getNode(U);
          if (!N) continue;
          const V = N.h === "auto" ? 100 : N.h;
          if (F >= N.x && F <= N.x + N.w && E >= N.y && E <= N.y + V) {
            X = !0;
            break;
          }
        }
        if (!X && t.selection.size >= 2) {
          let U = 1 / 0, N = 1 / 0, V = -1 / 0, nt = -1 / 0;
          for (const vt of t.selection) {
            const zt = t.getNode(vt);
            if (!zt || zt.type === "edge") continue;
            const Dt = zt.h === "auto" ? 100 : zt.h;
            U = Math.min(U, zt.x), N = Math.min(N, zt.y), V = Math.max(V, zt.x + zt.w), nt = Math.max(nt, zt.y + Dt);
          }
          U !== 1 / 0 && F >= U && F <= V && E >= N && E <= nt && (X = !0);
        }
        if (!X) {
          const U = t.hitTest(F, E, ht);
          U ? t.select(U.id) : t.deselectAll();
        }
      }
      const B = Array.from(t.selection), R = B.length > 0, D = [];
      if (D.push({
        items: [
          {
            label: i.actionCut,
            shortcut: "Mod+X",
            disabled: !R,
            action: () => {
              t.cutSelected(), ua(t);
            }
          },
          {
            label: i.actionCopy,
            shortcut: "Mod+C",
            disabled: !R,
            action: () => {
              t.copySelected(), ua(t);
            }
          },
          {
            label: i.actionPaste,
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              wf(t, F, E);
            }
          }
        ]
      }), D.push({
        items: [
          {
            label: i.actionDuplicate,
            shortcut: "Mod+D",
            disabled: !R,
            action: () => t.duplicateSelected()
          }
        ]
      }), B.filter((X) => {
        const U = t.getNode(X);
        return !!U && U.type !== "edge" && !U.locked;
      }).length >= 2 && (D.push({
        items: [
          {
            label: i.actionArrangeSelection,
            action: () => t.arrangeSelectedNodes(ht, d.zoom)
          }
        ]
      }), D.push({
        items: [
          {
            kind: "header",
            label: i.alignMenuHorizontal,
            action: () => {
            }
          },
          {
            label: i.alignLeft,
            icon: po.alignHLeft,
            action: () => t.alignSelectedNodes("left", ht)
          },
          {
            label: i.alignCenterHorizontal,
            icon: po.alignHCenter,
            action: () => t.alignSelectedNodes("centerH", ht)
          },
          {
            label: i.alignRight,
            icon: po.alignHRight,
            action: () => t.alignSelectedNodes("right", ht)
          },
          {
            label: i.alignDistributeHorizontal,
            icon: po.distributeH,
            action: () => t.distributeSelectedNodes(
              "horizontal",
              ht
            )
          },
          {
            kind: "header",
            label: i.alignMenuVertical,
            action: () => {
            }
          },
          {
            label: i.alignTop,
            icon: po.alignVTop,
            action: () => t.alignSelectedNodes("top", ht)
          },
          {
            label: i.alignCenterVertical,
            icon: po.alignVCenter,
            action: () => t.alignSelectedNodes("centerV", ht)
          },
          {
            label: i.alignBottom,
            icon: po.alignVBottom,
            action: () => t.alignSelectedNodes("bottom", ht)
          },
          {
            label: i.alignDistributeVertical,
            icon: po.distributeV,
            action: () => t.distributeSelectedNodes("vertical", ht)
          }
        ]
      })), R && D.push({
        items: [
          {
            label: i.actionAddToPersonalLibrary,
            action: () => {
              const X = B.map((V) => t.getNode(V)).filter((V) => !!V).map((V) => structuredClone(V)), U = new Set(
                X.map((V) => V.groupId).filter(Boolean)
              ), N = /* @__PURE__ */ new Map();
              for (const [V, nt] of t.groupParent)
                U.has(V) && N.set(V, nt);
              Hr({
                nodes: X,
                groupParent: N
              });
            }
          }
        ]
      }), B.length >= 2 || R && t.selectionHasGroup()) {
        const X = [];
        B.length >= 2 && X.push({
          label: i.actionGroupSelection,
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && X.push({
          label: i.actionUngroupSelection,
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), D.push({ items: X });
      }
      if (R && B.every((U) => {
        const N = t.getNode(U);
        return N && (N.type === "draw" || N.type === "shape");
      }) && D.push({
        items: [
          {
            label: i.actionFlipHorizontal,
            shortcut: "Shift+H",
            action: () => t.flipSelectedHorizontal()
          },
          {
            label: i.actionFlipVertical,
            shortcut: "Shift+V",
            action: () => t.flipSelectedVertical()
          }
        ]
      }), R && D.push({
        items: [
          {
            label: i.actionBringForward,
            shortcut: "Mod+]",
            action: () => t.bringForward(B)
          },
          {
            label: i.actionSendBackward,
            shortcut: "Mod+[",
            action: () => t.sendBackward(B)
          },
          {
            label: i.actionBringToFront,
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(B)
          },
          {
            label: i.actionSendToBack,
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(B)
          }
        ]
      }), R) {
        const X = B.some((V) => {
          var nt;
          return (nt = t.getNode(V)) == null ? void 0 : nt.locked;
        }), U = B.some((V) => {
          var nt;
          return !((nt = t.getNode(V)) != null && nt.locked);
        }), N = [];
        U && N.push({
          label: i.actionLock,
          action: () => {
            for (const V of B) t.updateNode(V, { locked: !0 });
          }
        }), X && N.push({
          label: i.actionUnlock,
          action: () => {
            for (const V of B) t.updateNode(V, { locked: void 0 });
          }
        }), D.push({ items: N });
      }
      R && D.push({
        items: [
          {
            label: i.actionDelete,
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const q = [10, 20, 40, 80];
      return D.push({
        items: [
          {
            label: i.actionToggleGrid,
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), st(t.snapToGrid);
            }
          },
          {
            label: i.actionSmartGuides,
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), _(t.smartGuides);
            }
          },
          ...q.map((X) => ({
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
            label: i.actionExportAsPng,
            action: () => aa(t, { format: "png" })
          },
          {
            label: i.actionExportAsSvg,
            action: () => aa(t, { format: "svg" })
          }
        ]
      }), D;
    },
    [t, i, ht, d.zoom]
  ), oc = lt(
    (k) => {
      if (k.preventDefault(), t.presentationMode) return;
      const L = Un(k.clientX, k.clientY, k.altKey);
      Yn({ x: k.clientX, y: k.clientY, sections: L });
    },
    [t, Un]
  ), Zn = lt(
    (k, L, T) => {
      const F = () => {
        const R = a.current, D = (R == null ? void 0 : R.ownerDocument) ?? document, j = Array.from(
          D.querySelectorAll('input, textarea, [contenteditable="true"]')
        );
        for (const q of j)
          if (!(R != null && R.contains(q)))
            try {
              q.blur();
            } catch {
            }
      };
      F();
      const E = Rt(10);
      t.addNode({
        id: E,
        type: "text",
        x: k,
        y: L,
        w: T,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? wo,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(E), Br.current = E, Vn.current = { id: E, until: performance.now() + 1500 }, Lo(E);
      const B = (R = 0) => {
        const D = a.current;
        if (!D) return;
        const j = D.querySelector(
          `[data-node-id="${E}"] [contenteditable="true"]`
        );
        if (j) {
          F(), j.focus(), Vn.current = null;
          return;
        }
        R < 12 && requestAnimationFrame(() => B(R + 1));
      };
      requestAnimationFrame(() => B(0));
    },
    [t]
  ), nc = lt(
    (k) => {
      if (t.presentationMode || t.mode !== "select") return;
      const { x: L, y: T } = t.screenToCanvas(k.clientX, k.clientY), F = t.hitTestAll(L, T, ht), E = F.find((B) => !t.isContainerType(B.type)) ?? F[0] ?? null;
      if (E != null && E.groupId) {
        const B = [];
        let R = E.groupId;
        for (; R; )
          B.push(R), R = t.groupParent.get(R);
        if (!t.activeGroupId) {
          t.enterGroup(B[B.length - 1]), t.select(E.id);
          return;
        }
        const D = B.indexOf(t.activeGroupId);
        if (D > 0) {
          t.enterGroup(B[D - 1]), t.select(E.id);
          return;
        }
      }
      if (E && E.type === "text") {
        t.select(E.id), Wr.current = { clientX: k.clientX, clientY: k.clientY }, Lo(E.id);
        return;
      }
      if (E && E.type === "sticky") {
        t.select(E.id), Ro(E.id);
        return;
      }
      if (E && E.type === "frame") {
        t.select(E.id), Jo(E.id);
        return;
      }
      if (E && E.type === "shape") {
        const B = E.data, R = B.shape === "line" || B.shape === "arrow";
        t.select(E.id), R || $o(E.id);
        return;
      }
      if (E && E.type === "draw") {
        t.select(E.id);
        return;
      }
      if (!E || E.type === "draw") {
        const R = t.getAllNodes().filter((D) => D.type === "shape").sort((D, j) => j.z - D.z).find((D) => !(D.data.shape === "line" || D.data.shape === "arrow") && Sr(D, L, T, t.viewport.zoom, !0));
        if (R) {
          t.select(R.id), $o(R.id);
          return;
        }
      }
      E || (t.deselectAll(), Zn(L, T, 300));
    },
    [t, ht, Zn]
  ), rc = lt(
    (k) => {
      if (Q.current.set(k.pointerId, { x: k.clientX, y: k.clientY }), k.pointerType === "pen" && (yt.current = !0), k.button !== 2 && wt(!0), k.pointerType === "touch" && (Q.current.size >= 2 || yt.current)) {
        ct.current = !0, J.current && (clearTimeout(J.current), J.current = null, dt.current = null);
        const E = new Map(Q.current), B = [...Q.current.keys()].find((X) => X !== k.pointerId);
        B !== void 0 && c().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: B,
            bubbles: !0,
            clientX: k.clientX,
            clientY: k.clientY
          })
        );
        const R = [...E.values()];
        let D = pa(R[0], R[1] ?? R[0]);
        const j = (X) => {
          if (!E.has(X.pointerId)) return;
          E.set(X.pointerId, { x: X.clientX, y: X.clientY });
          const U = [...E.values()];
          if (U.length < 2) return;
          const N = pa(U[0], U[1]);
          if (t.pan(N.mx - D.mx, N.my - D.my), D.dist > 1) {
            const V = Math.min(Math.max(N.dist / D.dist, 0.9), 1.1);
            t.zoomByFactor(V, N.mx, N.my);
          }
          D = N;
        }, q = (X) => {
          Q.current.delete(X.pointerId), E.delete(X.pointerId), X.pointerType === "pen" && (yt.current = !1), E.size < 2 && !yt.current && (ct.current = !1, c().removeEventListener("pointermove", j), c().removeEventListener("pointerup", q), c().removeEventListener("pointercancel", q));
        };
        c().addEventListener("pointermove", j), c().addEventListener("pointerup", q), c().addEventListener("pointercancel", q);
        return;
      }
      if (ct.current || t.presentationMode && !(k.button === 1 || k.button === 0 && ot.current))
        return;
      if (Zo && Yn(null), k.pointerType === "touch") {
        const E = k.clientX, B = k.clientY, R = k.pointerId;
        dt.current = { clientX: E, clientY: B }, J.current = setTimeout(() => {
          if (J.current = null, !dt.current || ct.current) return;
          const D = Un(E, B, !1);
          Yn({ x: E, y: B, sections: D }), c().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: R,
              bubbles: !0,
              clientX: E,
              clientY: B
            })
          ), dt.current = null;
        }, 500);
      }
      if (k.button === 1 || k.button === 0 && ot.current) {
        k.preventDefault(), it.current = !0;
        const E = t.viewport.x, B = t.viewport.y, R = k.clientX, D = k.clientY, j = a.current;
        j && (j.style.cursor = "grabbing");
        const q = (U) => {
          t.viewport.x = E + (U.clientX - R), t.viewport.y = B + (U.clientY - D), f({ ...t.viewport });
        }, X = () => {
          it.current = !1, j && (j.style.cursor = ot.current ? "grab" : t.lassoSelect ? nn : ""), c().removeEventListener("pointermove", q), c().removeEventListener("pointerup", X);
        };
        c().addEventListener("pointermove", q), c().addEventListener("pointerup", X);
        return;
      }
      const { x: T, y: F } = t.screenToCanvas(k.clientX, k.clientY);
      if (k.pointerType === "touch" && J.current && t.hitTest(T, F, ht) && (clearTimeout(J.current), J.current = null, dt.current = null), t.mode === "select") {
        if (k.button !== 0) return;
        if (k.altKey) {
          const R = t.hitTestAll(T, F, ht);
          if (R.length > 0) {
            const D = jn.current, j = Math.abs(T - D.x) + Math.abs(F - D.y);
            let q = 0;
            j < 5 && (q = (D.index + 1) % R.length), jn.current = { x: T, y: F, index: q }, t.select(R[q].id);
          }
          return;
        }
        let E = !1;
        !t.lassoSelect && t.selection.size >= 2 && re && T >= re.x && T <= re.x + re.w && F >= re.y && F <= re.y + re.h && (E = !0);
        let B = null;
        if (!t.lassoSelect) {
          const R = t.hitTestAll(T, F, ht);
          if (B = R.find((D) => t.selection.has(D.id) && !t.isContainerType(D.type)) ?? R.find((D) => !t.isContainerType(D.type)) ?? R[0] ?? null, !E) {
            const D = Pi(
              t.nodes,
              T,
              F,
              t.viewport.zoom,
              ht,
              Je
            );
            D && (B ? B.type !== "draw" && B.type !== "shape" && !t.isContainerType(B.type) && D.distance < $c(B, T, F, ht) && (B = D.node) : B = D.node);
          }
        }
        if (B || E) {
          B && (t.activeGroupId && !t.isNodeInActiveGroup(B.id) && t.exitAllGroups(), k.shiftKey ? t.toggleSelect(B.id) : t.selection.has(B.id) || t.select(B.id));
          const R = Array.from(t.selection).filter(
            (Bt) => {
              var Wt;
              return !((Wt = t.getNode(Bt)) != null && Wt.locked);
            }
          );
          if (R.length === 0) return;
          const D = k.clientX, j = k.clientY, q = /* @__PURE__ */ new Set(), X = /* @__PURE__ */ new Set();
          for (const Bt of R) {
            const Wt = t.getNode(Bt);
            if (Wt && t.isContainerType(Wt.type)) {
              X.add(Bt);
              for (const Ft of t.getFrameDescendantIds(Bt))
                t.selection.has(Ft) || q.add(Ft);
            }
          }
          const U = [...R, ...q], N = U.map((Bt) => {
            const Wt = t.getNode(Bt);
            return { id: Bt, x: Wt.x, y: Wt.y };
          }), V = t.selectionGroupId(), nt = V ? t.groupRotations.get(V) : null, vt = nt == null ? void 0 : nt.cx, zt = nt == null ? void 0 : nt.cy;
          Gn(null);
          let Dt = !1, It = null, Et = D, oe = j, Zt = !1;
          const Ct = new Set(U), Pt = t.createDragSnapContext(Ct), bt = () => {
            It = null;
            const Bt = (Et - D) / t.viewport.zoom, Wt = (oe - j) / t.viewport.zoom, { finalDx: Ft, finalDy: pe } = t.computeDragSnap(
              N,
              Ct,
              Bt,
              Wt,
              Zt,
              Pt
            ), Yt = N.map((fe) => ({
              id: fe.id,
              patch: { x: fe.x + Ft, y: fe.y + pe }
            }));
            t.updateMany(Yt), nt && V && t.groupRotations.set(V, {
              angle: nt.angle,
              cx: vt + Ft,
              cy: zt + pe
            });
          }, Tt = (Bt) => {
            const Wt = (Bt.clientX - D) / t.viewport.zoom, Ft = (Bt.clientY - j) / t.viewport.zoom;
            if (!Dt)
              if (Math.abs(Wt) > 2 || Math.abs(Ft) > 2)
                Dt = !0, t.pushHistorySnapshot(), w(!0);
              else
                return;
            Et = Bt.clientX, oe = Bt.clientY, Zt = Bt.metaKey || Bt.ctrlKey, It === null && (It = requestAnimationFrame(bt));
          }, Vt = () => {
            if (It !== null && (cancelAnimationFrame(It), bt()), w(!1), t.clearAlignGuides(), c().removeEventListener("pointermove", Tt), c().removeEventListener("pointerup", Vt), Dt) {
              const Bt = R.filter(
                (Wt) => !q.has(Wt)
              );
              Bt.length > 0 && t.updateFrameMembership(Bt);
            }
          };
          c().addEventListener("pointermove", Tt), c().addEventListener("pointerup", Vt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          k.shiftKey || t.deselectAll();
          const R = new Set(t.selection);
          if (t.lassoSelect) {
            const D = [[T, F]];
            bn([...D]);
            let j = null, q = 0;
            const X = (V = !1) => {
              j = null;
              const nt = V || q % 2 === 0;
              if (q++, nt && D.length >= 3) {
                const zt = de(D, t.getAllNodes()).map((It) => It.id), Dt = k.shiftKey ? [.../* @__PURE__ */ new Set([...R, ...zt])] : zt;
                (Dt.length !== t.selection.size || Dt.some((It) => !t.selection.has(It))) && t.selectMultiple(Dt);
              }
              bn([...D]);
            }, U = (V) => {
              const { x: nt, y: vt } = t.screenToCanvas(V.clientX, V.clientY);
              D.push([nt, vt]), j === null && (j = requestAnimationFrame(() => X(!1)));
            }, N = () => {
              j !== null && cancelAnimationFrame(j), X(!0), c().removeEventListener("pointermove", U), c().removeEventListener("pointerup", N), bn(null), t.toggleLassoSelect();
            };
            c().addEventListener("pointermove", U), c().addEventListener("pointerup", N);
          } else {
            const D = { startX: T, startY: F, endX: T, endY: F };
            Eo(D);
            let j = null, q = 0;
            const X = (V = !1, nt = !1) => {
              j = null;
              const vt = Math.min(D.startX, D.endX), zt = Math.min(D.startY, D.endY), Dt = Math.abs(D.endX - D.startX), It = Math.abs(D.endY - D.startY), Et = nt || V || q % 2 === 0;
              if (q++, Et) {
                const Zt = ut(
                  { x: vt, y: zt, w: Dt, h: It },
                  t.getAllNodes()
                ).map((Pt) => Pt.id), Ct = k.shiftKey ? [.../* @__PURE__ */ new Set([...R, ...Zt])] : Zt;
                (Ct.length !== t.selection.size || Ct.some((Pt) => !t.selection.has(Pt))) && t.selectMultiple(Ct);
              }
              Eo({ ...D });
            }, U = (V) => {
              const { x: nt, y: vt } = t.screenToCanvas(V.clientX, V.clientY);
              D.endX = nt, D.endY = vt, j === null && (j = requestAnimationFrame(() => X(!1)));
            }, N = () => {
              j !== null && cancelAnimationFrame(j), X(!0), c().removeEventListener("pointermove", U), c().removeEventListener("pointerup", N), Eo(null);
            };
            c().addEventListener("pointermove", U), c().addEventListener("pointerup", N);
          }
        }
      } else if (t.mode === "text") {
        t.deselectAll();
        const E = T, B = F, R = {
          startX: T,
          startY: F,
          endX: T,
          endY: F
        };
        let D = !1;
        $e(R);
        const j = (X) => {
          const { x: U, y: N } = t.screenToCanvas(X.clientX, X.clientY);
          R.endX = U, R.endY = N;
          const V = Math.abs(R.endX - R.startX), nt = Math.abs(R.endY - R.startY);
          (V > 10 || nt > 10) && (D = !0), $e({ ...R });
        }, q = () => {
          c().removeEventListener("pointermove", j), c().removeEventListener("pointerup", q), $e(null);
          const X = D ? Math.max(Math.abs(R.endX - R.startX), 60) : 300, U = D ? Math.min(R.startX, R.endX) : E, N = D ? Math.min(R.startY, R.endY) : B;
          Zn(U, N, X);
        };
        c().addEventListener("pointermove", j), c().addEventListener("pointerup", q);
      } else if (t.mode === "note") {
        t.deselectAll();
        const E = T, B = F, R = {
          startX: T,
          startY: F,
          endX: T,
          endY: F
        };
        let D = !1;
        $e(R);
        const j = (X) => {
          const { x: U, y: N } = t.screenToCanvas(X.clientX, X.clientY);
          R.endX = U, R.endY = N;
          const V = Math.abs(R.endX - R.startX), nt = Math.abs(R.endY - R.startY);
          (V > 10 || nt > 10) && (D = !0), $e({ ...R });
        }, q = () => {
          c().removeEventListener("pointermove", j), c().removeEventListener("pointerup", q), $e(null);
          const X = D ? Math.max(Math.abs(R.endX - R.startX), 100) : 300, U = D ? Math.max(Math.abs(R.endY - R.startY), 40) : "auto", N = D ? Math.min(R.startX, R.endX) : E, V = D ? Math.min(R.startY, R.endY) : B;
          xi(N, V, X, U), t.setMode("select");
        };
        c().addEventListener("pointermove", j), c().addEventListener("pointerup", q);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const E = T, B = F, R = {
          startX: T,
          startY: F,
          endX: T,
          endY: F
        };
        let D = !1;
        $e(R);
        const j = (X) => {
          const { x: U, y: N } = t.screenToCanvas(X.clientX, X.clientY);
          R.endX = U, R.endY = N, Math.abs(R.endX - R.startX) > 10 && (D = !0), $e({ ...R });
        }, q = () => {
          c().removeEventListener("pointermove", j), c().removeEventListener("pointerup", q), $e(null);
          const X = D ? Math.max(Math.abs(R.endX - R.startX), 100) : 200, U = D ? Math.min(R.startX, R.endX) : E, N = D ? Math.min(R.startY, R.endY) : B, V = Rt(10), nt = D ? Math.max(Math.abs(R.endY - R.startY), 100) : 150;
          t.addNode({
            id: V,
            type: "sticky",
            x: U,
            y: N,
            w: X,
            h: nt,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(V), Ro(V), t.setMode("select");
        };
        c().addEventListener("pointermove", j), c().addEventListener("pointerup", q);
      } else if (t.mode === "draw") {
        const E = k.pressure || 0.5, B = {
          points: [[T, F, E]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle,
          opacity: t.activeTool.opacity
        };
        mt(B), t.notifyDrawProgress(B);
        const R = (j) => {
          const { x: q, y: X } = t.screenToCanvas(j.clientX, j.clientY), U = j.pressure || 0.5;
          B.points.push([q, X, U]), mt({ ...B, points: [...B.points] }), t.notifyDrawProgress({ ...B, points: [...B.points] });
        }, D = () => {
          if (c().removeEventListener("pointermove", R), c().removeEventListener("pointerup", D), B.points.length < 2) {
            t.notifyDrawEnd(), mt(null);
            return;
          }
          let j = 1 / 0, q = 1 / 0, X = -1 / 0, U = -1 / 0;
          for (const [V, nt] of B.points)
            V < j && (j = V), nt < q && (q = nt), V > X && (X = V), nt > U && (U = nt);
          const N = B.points.map(
            ([V, nt, vt]) => [V - j, nt - q, vt]
          );
          t.addNode({
            id: Rt(10),
            type: "draw",
            x: j,
            y: q,
            w: X - j,
            h: U - q,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: N,
              color: B.color,
              strokeWidth: B.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => {
            mt(null), requestAnimationFrame(() => {
              t.notifyDrawEnd();
            });
          });
        };
        c().addEventListener("pointermove", R), c().addEventListener("pointerup", D);
      } else if (t.mode === "shape") {
        const E = {
          startX: T,
          startY: F,
          endX: T,
          endY: F
        };
        Nt(E);
        const B = (D) => {
          const { x: j, y: q } = t.screenToCanvas(D.clientX, D.clientY);
          E.endX = j, E.endY = q, Nt({ ...E }), t.notifyShapeProgress({
            ...E,
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
          c().removeEventListener("pointermove", B), c().removeEventListener("pointerup", R);
          const D = t.activeTool.shapeType || "rect", j = D === "line" || D === "arrow", q = Math.min(E.startX, E.endX);
          let X = Math.min(E.startY, E.endY);
          const U = Math.abs(E.endX - E.startX), N = Math.abs(E.endY - E.startY);
          let V;
          if (j) {
            const zt = t.activeTool.width * 2;
            V = Math.max(N, zt), N < zt && (X -= (zt - N) / 2);
          } else
            V = N;
          if (U < 5 && (j ? U < 5 && Math.abs(E.endY - E.startY) < 5 : V < 5)) {
            t.notifyShapeEnd(), Nt(null);
            return;
          }
          const nt = {};
          j && (nt.startPoint = [
            E.startX - q,
            E.startY - X
          ], nt.endPoint = [
            E.endX - q,
            E.endY - X
          ]);
          const vt = Rt(10);
          t.addNode({
            id: vt,
            type: "shape",
            x: q,
            y: X,
            w: U,
            h: V,
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
              ...nt
            }
          }), requestAnimationFrame(() => {
            Nt(null), requestAnimationFrame(() => {
              t.notifyShapeEnd();
            });
          });
        };
        c().addEventListener("pointermove", B), c().addEventListener("pointerup", R);
      } else if (t.mode === "edge") {
        const E = t.hitTest(T, F, ht);
        if (!E || E.type === "edge") return;
        const B = t.freeFormEdges, R = B ? Be(E, T, F, ht).t : void 0;
        ft({
          fromNode: E,
          cursorX: T,
          cursorY: F,
          sourceT: R,
          edgeColor: t.activeTool.color,
          edgeStrokeWidth: t.activeTool.width || 2,
          edgeStyle: t.activeTool.strokeStyle || "solid",
          edgeType: t.activeTool.edgeType,
          attachmentGap: t.activeTool.attachmentGap
        });
        const D = (q) => {
          const { x: X, y: U } = t.screenToCanvas(q.clientX, q.clientY);
          ft(
            (N) => N ? { ...N, cursorX: X, cursorY: U } : null
          );
        }, j = (q) => {
          c().removeEventListener("pointermove", D), c().removeEventListener("pointerup", j), ft(null);
          const { x: X, y: U } = t.screenToCanvas(q.clientX, q.clientY);
          let N = t.hitTest(X, U, ht);
          if (!N || N.type === "edge" || t.isContainerType(N.type)) {
            const It = 50 / t.viewport.zoom;
            let Et = 1 / 0, oe = !1, Zt = null;
            for (const Ct of t.getAllNodes()) {
              if (Ct.type === "edge" || Ct.id === E.id) continue;
              const Pt = t.isContainerType(Ct.type), bt = Be(Ct, X, U, ht), Tt = Math.hypot(bt.x - X, bt.y - U);
              if (Tt < It) {
                if (Pt && !oe && Zt) continue;
                (!Pt && oe || Tt < Et) && (Et = Tt, oe = Pt, Zt = Ct);
              }
            }
            Zt && (N = Zt);
          }
          if (!N || N.type === "edge" || N.id === E.id)
            return;
          const V = B ? void 0 : _n(E, T, F, ht), nt = B ? void 0 : _n(N, X, U, ht), vt = B ? Be(N, X, U, ht).t : void 0;
          if (t.getAllNodes().some((It) => {
            if (It.type !== "edge") return !1;
            const Et = It.data;
            return B ? Et.fromId === E.id && Et.toId === N.id && Et.sourceT !== void 0 && Et.targetT !== void 0 && Math.abs(Et.sourceT - R) < 0.02 && Math.abs(Et.targetT - vt) < 0.02 : ss(Et, {
              fromId: E.id,
              toId: N.id,
              sourceHandle: V,
              targetHandle: nt
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
              fromId: E.id,
              toId: N.id,
              style: t.activeTool.strokeStyle || "solid",
              color: t.activeTool.color,
              strokeWidth: t.activeTool.width || 2,
              arrowHead: t.activeTool.arrowHead ?? "arrow",
              arrowTail: t.activeTool.arrowTail ?? "none",
              edgeType: t.activeTool.edgeType ?? "bezier",
              roughness: t.activeTool.roughness ?? 0,
              attachmentGap: t.activeTool.attachmentGap,
              sourceHandle: V,
              targetHandle: nt,
              sourceT: R,
              targetT: vt
            }
          };
          t.addNode(Dt);
        };
        c().addEventListener("pointermove", D), c().addEventListener("pointerup", j);
      } else if (t.mode === "frame") {
        const E = {
          startX: T,
          startY: F,
          endX: T,
          endY: F
        };
        Nt(E);
        const B = (D) => {
          const { x: j, y: q } = t.screenToCanvas(D.clientX, D.clientY);
          E.endX = j, E.endY = q, Nt({ ...E });
        }, R = () => {
          c().removeEventListener("pointermove", B), c().removeEventListener("pointerup", R);
          const D = Math.min(E.startX, E.endX), j = Math.min(E.startY, E.endY), q = Math.abs(E.endX - E.startX), X = Math.abs(E.endY - E.startY);
          if (q < 20 || X < 20) {
            Nt(null);
            return;
          }
          const U = Rt(10);
          t.addNode({
            id: U,
            type: "frame",
            x: D,
            y: j,
            w: q,
            h: X,
            z: t.nextZ(),
            data: {
              label: i.typeFrame,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(U), Nt(null), t.select(U), t.setMode("select");
        };
        c().addEventListener("pointermove", B), c().addEventListener("pointerup", R);
      } else if (t.mode === "erase") {
        if (k.button !== 0) return;
        const E = (vt, zt) => {
          const Dt = t.hitTestAll(vt, zt, ht), It = Ld(
            t.nodes,
            vt,
            zt,
            t.viewport.zoom,
            ht,
            Je
          );
          let Et = !1;
          for (const oe of [...Dt, ...It])
            so.current.has(oe.id) || (so.current.add(oe.id), Et = !0);
          Et && Fr(new Set(so.current));
        }, B = 400;
        so.current = /* @__PURE__ */ new Set();
        const R = Date.now();
        Xe.current = [[T, F, R]], vn([[T, F, R]]), E(T, F), Sn(!0);
        let D = T, j = F;
        const q = () => {
          const vt = Date.now(), zt = Xe.current.length;
          Xe.current = Xe.current.filter(
            (Dt) => vt - Dt[2] < B
          ), Xe.current.length !== zt && vn([...Xe.current]), Sn(), io.current = requestAnimationFrame(q);
        };
        io.current = requestAnimationFrame(q);
        const X = (vt) => {
          const { x: zt, y: Dt } = t.screenToCanvas(vt.clientX, vt.clientY);
          D = zt, j = Dt;
          const It = Date.now();
          Xe.current.push([D, j, It]), vn([...Xe.current]), E(D, j), Sn(!0);
        }, U = () => {
          io.current !== null && (cancelAnimationFrame(io.current), io.current = null), t.notifyEraserEnd(), so.current = /* @__PURE__ */ new Set(), Fr(/* @__PURE__ */ new Set()), Xe.current = [], vn([]);
        }, N = () => {
          nt();
          const vt = Array.from(so.current);
          Sn(!0), U(), vt.length > 0 && t.deleteNodes(vt);
        }, V = (vt) => {
          vt.key === "Escape" && (nt(), Sn(!0), U());
        }, nt = () => {
          c().removeEventListener("pointermove", X), c().removeEventListener("pointerup", N), c().removeEventListener("keydown", V);
        };
        c().addEventListener("pointermove", X), c().addEventListener("pointerup", N), c().addEventListener("keydown", V);
      } else if (t.mode === "laser") {
        if (k.button !== 0) return;
        const E = 1560;
        tn.current !== null && (cancelAnimationFrame(tn.current), tn.current = null);
        const B = performance.now();
        Se.current.length > 0 && Se.current.push([NaN, NaN, B]), Se.current.push([T, F, B]), qn([...Se.current]), t.notifyLaserProgress([[T, F]]);
        let R = B;
        const D = () => {
          const X = performance.now(), U = Se.current.length;
          Se.current = Se.current.filter(
            (N) => X - N[2] < E
          ), (Se.current.length !== U || Se.current.length > 0) && qn([...Se.current]), X - R >= 60 && (R = X, Se.current.length > 0 && t.notifyLaserProgress(
            Se.current.map((N) => [N[0], N[1]])
          )), Se.current.length > 0 ? tn.current = requestAnimationFrame(D) : (tn.current = null, qn([]), t.notifyLaserEnd());
        };
        tn.current = requestAnimationFrame(D);
        const j = (X) => {
          const { x: U, y: N } = t.screenToCanvas(X.clientX, X.clientY), V = performance.now();
          Se.current.push([U, N, V]), qn([...Se.current]), t.notifyLaserProgress(
            Se.current.map((nt) => [nt[0], nt[1]])
          );
        }, q = () => {
          c().removeEventListener("pointermove", j), c().removeEventListener("pointerup", q);
        };
        c().addEventListener("pointermove", j), c().addEventListener("pointerup", q);
      } else if (t.mode === "hand") {
        if (k.button !== 0) return;
        k.preventDefault();
        const E = t.viewport.x, B = t.viewport.y, R = k.clientX, D = k.clientY, j = a.current;
        j && (j.style.cursor = "grabbing");
        const q = (U) => {
          t.viewport.x = E + (U.clientX - R), t.viewport.y = B + (U.clientY - D), f({ ...t.viewport });
        }, X = () => {
          j && (j.style.cursor = t.lassoSelect ? nn : lr(t.mode)), c().removeEventListener("pointermove", q), c().removeEventListener("pointerup", X);
        };
        c().addEventListener("pointermove", q), c().addEventListener("pointerup", X);
      }
    },
    [
      t,
      xi,
      Zn,
      Zo,
      Un,
      re,
      ht,
      xe,
      ut,
      wt
    ]
  ), Or = lt(
    (k, L, T) => {
      if (T.preventDefault(), t.presentationMode) return;
      const F = t.getNode(k);
      if (!F || F.locked) return;
      const E = T.clientX, B = T.clientY, R = F.x, D = F.y, j = F.w, q = F.h === "auto", X = q ? ht[k] ?? 100 : F.h, U = F.type === "draw" ? F.data.points.map(
        (It) => [...It]
      ) : null, N = F.type === "shape" ? F.data.startPoint : void 0, V = F.type === "shape" ? F.data.endPoint : void 0, nt = F.type === "text" ? F.data.fontSize : 0;
      let vt = !1;
      const zt = (It) => {
        const Et = (It.clientX - E) / t.viewport.zoom, oe = (It.clientY - B) / t.viewport.zoom;
        vt || (vt = !0, t.pushHistorySnapshot());
        let Zt = R, Ct = D, Pt = j, bt = X;
        if ((L === "nw" || L === "w" || L === "sw") && (Zt = R + Et, Pt = j - Et), (L === "ne" || L === "e" || L === "se") && (Pt = j + Et), (L === "nw" || L === "n" || L === "ne") && (Ct = D + oe, bt = X - oe), (L === "sw" || L === "s" || L === "se") && (bt = X + oe), t.snapToGrid && !(It.metaKey || It.ctrlKey)) {
          const Wt = t.gridSize, Ft = (pe) => Math.round(pe / Wt) * Wt;
          (L === "nw" || L === "w" || L === "sw") && (Zt = Ft(Zt), Pt = R + j - Zt), (L === "ne" || L === "e" || L === "se") && (Pt = Ft(Zt + Pt) - Zt), (L === "nw" || L === "n" || L === "ne") && (Ct = Ft(Ct), bt = D + X - Ct), (L === "sw" || L === "s" || L === "se") && (bt = Ft(Ct + bt) - Ct);
        }
        let Tt = 10, Vt = 10;
        if (F.type === "legacy-voicenote" ? (Tt = 260, Vt = 120) : F.type === "legacy-canvas-link" && (Tt = 220, Vt = 86), Pt < Tt && (Pt = Tt, (L === "nw" || L === "w" || L === "sw") && (Zt = R + j - Tt)), bt < Vt && (bt = Vt, (L === "nw" || L === "n" || L === "ne") && (Ct = D + X - Vt)), It.shiftKey && !(F.type === "frame" && F.data.devicePreset)) {
          const Wt = Ms(
            L,
            R,
            D,
            j,
            X,
            Zt,
            Ct,
            Pt,
            bt
          );
          Zt = Wt.x, Ct = Wt.y, Pt = Wt.w, bt = Wt.h;
        }
        if (F.type === "frame") {
          const Wt = F.data.devicePreset;
          if (Wt) {
            const Ft = Bs(Wt);
            if (Ft) {
              const pe = jl(Ft);
              if (L === "nw" || L === "ne" || L === "sw" || L === "se" || (L === "e" || L === "w")) {
                const ue = Math.round(Pt / pe);
                (L === "nw" || L === "ne") && (Ct = D + X - ue), bt = ue;
              } else
                Pt = Math.round(bt * pe);
            }
          }
        }
        const Bt = {
          x: Zt,
          y: Ct,
          w: Pt,
          h: q ? "auto" : bt
        };
        if (U && F.type === "draw") {
          const Wt = j > 0 ? Pt / j : 1, Ft = X > 0 ? bt / X : 1, pe = U.map(
            ([Yt, fe, ue]) => [Yt * Wt, fe * Ft, ue]
          );
          Bt.data = { ...F.data, points: pe };
        }
        if (F.type === "shape" && (N || V)) {
          const Wt = j > 0 ? Pt / j : 1, Ft = X > 0 ? bt / X : 1, pe = { ...F.data };
          N && (pe.startPoint = [
            N[0] * Wt,
            N[1] * Ft
          ]), V && (pe.endPoint = [
            V[0] * Wt,
            V[1] * Ft
          ]), Bt.data = pe;
        }
        if (F.type === "text" && nt > 0 && L !== "e" && L !== "w") {
          const Wt = L === "n" || L === "s" ? X > 0 ? bt / X : 1 : j > 0 ? Pt / j : 1, Ft = Math.max(8, Math.round(nt * Wt));
          Bt.data = { ...F.data, fontSize: Ft };
        }
        t.updateNode(k, Bt);
      }, Dt = () => {
        c().removeEventListener("pointermove", zt), c().removeEventListener("pointerup", Dt), t.isContainerType(F.type) && t.syncFrameChildrenAfterResize(k);
      };
      c().addEventListener("pointermove", zt), c().addEventListener("pointerup", Dt);
    },
    [t, ht]
  ), sc = lt(
    (k, L) => {
      L.stopPropagation(), L.preventDefault();
      const T = t.getNode(k);
      if (!T || T.locked) return;
      const F = T.h === "auto" ? ht[k] ?? 100 : T.h, E = T.x + T.w / 2, B = T.y + F / 2, R = T.rotation || 0, { x: D, y: j } = t.screenToCanvas(
        L.clientX,
        L.clientY
      ), q = Math.atan2(j - B, D - E);
      let X = !1;
      const U = (V) => {
        X || (X = !0, t.pushHistorySnapshot());
        const { x: nt, y: vt } = t.screenToCanvas(V.clientX, V.clientY), zt = Math.atan2(vt - B, nt - E);
        let Dt = R + (zt - q) * (180 / Math.PI);
        (V.shiftKey || t.snapToGrid) && !(V.metaKey || V.ctrlKey) && (Dt = Math.round(Dt / 15) * 15), t.updateNode(k, { rotation: Dt });
      }, N = () => {
        c().removeEventListener("pointermove", U), c().removeEventListener("pointerup", N);
      };
      c().addEventListener("pointermove", U), c().addEventListener("pointerup", N);
    },
    [t, ht]
  ), wi = lt(
    (k, L, T) => {
      T.stopPropagation(), T.preventDefault();
      const F = t.getNode(k);
      if (!F) return;
      const { x: E, y: B } = t.screenToCanvas(T.clientX, T.clientY), R = t.freeFormEdges, D = R ? Be(F, E, B, ht).t : void 0;
      ft({
        fromNode: F,
        cursorX: E,
        cursorY: B,
        sourceHandle: R ? void 0 : L,
        sourceT: D,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid",
        edgeType: t.activeTool.edgeType,
        attachmentGap: t.activeTool.attachmentGap
      });
      const j = (X) => {
        const { x: U, y: N } = t.screenToCanvas(X.clientX, X.clientY);
        ft(
          (V) => V ? { ...V, cursorX: U, cursorY: N } : null
        );
      }, q = (X) => {
        c().removeEventListener("pointermove", j), c().removeEventListener("pointerup", q), ft(null);
        const { x: U, y: N } = t.screenToCanvas(X.clientX, X.clientY);
        let V = t.hitTest(U, N, ht);
        if (!V || V.type === "edge" || t.isContainerType(V.type)) {
          const It = 50 / t.viewport.zoom;
          let Et = 1 / 0, oe = !1, Zt = null;
          for (const Ct of t.getAllNodes()) {
            if (Ct.type === "edge" || Ct.id === F.id) continue;
            const Pt = t.isContainerType(Ct.type), bt = Be(Ct, U, N, ht), Tt = Math.hypot(bt.x - U, bt.y - N);
            Tt >= It || Pt && !oe && Zt || (!Pt && oe || Tt < Et) && (Et = Tt, oe = Pt, Zt = Ct);
          }
          Zt && (V = Zt);
        }
        if (!V || V.type === "edge" || V.id === F.id)
          return;
        const nt = R ? void 0 : _n(V, U, N, ht), vt = R ? Be(V, U, N, ht).t : void 0;
        if (t.getAllNodes().some((It) => {
          if (It.type !== "edge") return !1;
          const Et = It.data;
          return R ? Et.fromId === F.id && Et.toId === V.id && Et.sourceT !== void 0 && Et.targetT !== void 0 && Math.abs(Et.sourceT - D) < 0.02 && Math.abs(Et.targetT - vt) < 0.02 : ss(Et, {
            fromId: F.id,
            toId: V.id,
            sourceHandle: L,
            targetHandle: nt
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
            fromId: F.id,
            toId: V.id,
            style: t.activeTool.strokeStyle || "solid",
            color: t.activeTool.color,
            strokeWidth: t.activeTool.width || 2,
            arrowHead: t.activeTool.arrowHead ?? "arrow",
            arrowTail: t.activeTool.arrowTail ?? "none",
            edgeType: t.activeTool.edgeType ?? "bezier",
            roughness: t.activeTool.roughness ?? 0,
            attachmentGap: t.activeTool.attachmentGap,
            sourceHandle: R ? void 0 : L,
            targetHandle: nt,
            sourceT: D,
            targetT: vt
          }
        };
        t.addNode(Dt);
      };
      c().addEventListener("pointermove", j), c().addEventListener("pointerup", q);
    },
    [t, ht]
  ), ic = lt(
    (k) => {
      let L = null, T = k === "top" || k === "left" ? 1 / 0 : -1 / 0;
      for (const F of t.selection) {
        const E = t.getNode(F);
        if (!E || E.type === "edge") continue;
        const B = E.h === "auto" ? ht[E.id] ?? 100 : E.h;
        let R;
        switch (k) {
          case "top":
            R = E.y;
            break;
          case "bottom":
            R = E.y + B;
            break;
          case "left":
            R = E.x;
            break;
          case "right":
            R = E.x + E.w;
            break;
        }
        (k === "top" || k === "left" ? R < T : R > T) && (T = R, L = F);
      }
      return L;
    },
    [t, ht]
  ), ac = lt(
    (k, L, T, F) => {
      var N;
      F.stopPropagation(), F.preventDefault();
      const E = t.getNode(k);
      if (!E || !o) return;
      const B = o.get(E.type), R = (N = B == null ? void 0 : B.ports) == null ? void 0 : N.find((V) => V.id === L);
      if (!R) return;
      const D = T === "input" ? "left" : "right", { x: j, y: q } = t.screenToCanvas(F.clientX, F.clientY);
      ft({
        fromNode: E,
        cursorX: j,
        cursorY: q,
        sourceHandle: D,
        sourcePort: L,
        sourceDirection: T,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid",
        edgeType: t.activeTool.edgeType,
        attachmentGap: t.activeTool.attachmentGap
      });
      const X = (V) => {
        const { x: nt, y: vt } = t.screenToCanvas(V.clientX, V.clientY);
        ft(
          (zt) => zt ? { ...zt, cursorX: nt, cursorY: vt } : null
        );
      }, U = (V) => {
        var fe;
        c().removeEventListener("pointermove", X), c().removeEventListener("pointerup", U), ft(null);
        const { x: nt, y: vt } = t.screenToCanvas(V.clientX, V.clientY), zt = T === "output" ? "input" : "output", Dt = Gs / t.viewport.zoom;
        let It = null, Et = null, oe = 1 / 0;
        for (const ue of t.getAllNodes()) {
          if (ue.type === "edge" || ue.id === E.id) continue;
          const ye = o.get(ue.type);
          if ((fe = ye == null ? void 0 : ye.ports) != null && fe.length)
            for (const Me of ye.ports) {
              if (Me.direction !== zt || R.dataType !== "any" && Me.dataType !== "any" && R.dataType !== Me.dataType) continue;
              const Ie = Te(
                ue,
                ye.ports,
                Me.id,
                t.viewport.zoom,
                t.measuredHeights,
                ye.portAnchor ?? "bbox"
              );
              if (!Ie) continue;
              const to = Math.hypot(Ie.x - nt, Ie.y - vt);
              to < Dt && to < oe && (oe = to, It = ue, Et = Me);
            }
        }
        if (!It || !Et) return;
        const Zt = Et.id, Ct = T === "output" ? It.id : E.id, Pt = T === "output" ? Zt : L;
        if (t.getAllNodes().some((ue) => {
          if (ue.type !== "edge") return !1;
          const ye = ue.data;
          return ye.toId === Ct && ye.targetPort === Pt;
        })) return;
        const Tt = T === "output" ? E.id : It.id, Vt = T === "output" ? It.id : E.id, Bt = T === "output" ? L : Zt, Wt = T === "output" ? Zt : L, Yt = {
          id: Rt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Tt,
            toId: Vt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: Bt,
            targetPort: Wt
          }
        };
        t.addNode(Yt), t.select(Yt.id);
      };
      c().addEventListener("pointermove", X), c().addEventListener("pointerup", U);
    },
    [t, o, ht]
  ), [Qn, lc] = et(0);
  Mt(() => {
    if (n)
      return n.onChange(() => lc((k) => k + 1));
  }, [n]);
  const cc = lt(
    (k) => n == null ? void 0 : n.getLastComputeMs(k),
    [n, Qn]
  ), dc = lt(
    (k, L) => n ? n.getPortValue(k, L) : null,
    [n, Qn]
  ), hc = lt(
    (k, L, T, F, E) => {
      E.stopPropagation(), E.preventDefault();
      const B = t.getNode(k);
      if (!B || B.type !== "edge") return;
      let R = !1;
      const D = (q) => {
        R || (R = !0, t.pushHistorySnapshot());
        const X = t.screenToCanvas(q.clientX, q.clientY), U = t.getNode(k);
        if (!U) return;
        const N = t.getNode(U.data.fromId), V = t.getNode(U.data.toId);
        if (!(!N || !V))
          if (L === "xy") {
            const nt = Pe(
              N,
              V,
              U.data.edgeType || "bezier",
              ht,
              U.data.sourceHandle,
              U.data.targetHandle,
              void 0,
              void 0,
              // no offsets → natural midpoint
              void 0,
              void 0,
              U.data.sourceT,
              U.data.targetT,
              U.data.attachmentGap
            );
            if (!nt.kinkHandle) return;
            const vt = X.x - nt.kinkHandle.x, zt = X.y - nt.kinkHandle.y;
            t.updateNode(k, {
              data: { ...U.data, curveOffset: [vt, zt] }
            });
          } else {
            const nt = L === "x" ? X.x : X.y, vt = Pe(
              N,
              V,
              U.data.edgeType || "bezier",
              ht,
              U.data.sourceHandle,
              U.data.targetHandle,
              0.5,
              void 0,
              // default to get range
              void 0,
              void 0,
              U.data.sourceT,
              U.data.targetT,
              U.data.attachmentGap
            );
            if (!vt.kinkHandle) return;
            const zt = vt.kinkHandle.min, Dt = vt.kinkHandle.max, It = Dt - zt;
            if (It === 0) return;
            const oe = (Math.max(zt, Math.min(Dt, nt)) - zt) / It;
            t.updateNode(k, {
              data: { ...U.data, midpointOffset: oe }
            });
          }
      }, j = () => {
        c().removeEventListener("pointermove", D), c().removeEventListener("pointerup", j);
      };
      c().addEventListener("pointermove", D), c().addEventListener("pointerup", j);
    },
    [t, ht]
  ), uc = lt(
    (k, L, T) => {
      T.stopPropagation(), T.preventDefault();
      const F = t.getNode(k);
      if (!F || F.type !== "edge") return;
      const { fromId: E, toId: B, sourceHandle: R, targetHandle: D } = F.data, j = L === "source" ? B : E, q = L === "source" ? D : R, X = t.getNode(E), U = t.getNode(B);
      if (!X || !U) return;
      const N = Pe(
        X,
        U,
        F.data.edgeType || "bezier",
        ht,
        R,
        D,
        void 0,
        void 0,
        void 0,
        void 0,
        F.data.sourceT,
        F.data.targetT,
        F.data.attachmentGap
      ), V = L === "source" ? { x: N.x1, y: N.y1 } : { x: N.x2, y: N.y2 };
      $t({
        edgeId: k,
        endpoint: L,
        anchorNodeId: j,
        anchorHandle: q,
        cursorX: V.x,
        cursorY: V.y
      });
      const nt = (zt) => {
        const { x: Dt, y: It } = t.screenToCanvas(zt.clientX, zt.clientY);
        $t(
          (Et) => Et ? { ...Et, cursorX: Dt, cursorY: It } : null
        );
      }, vt = (zt) => {
        c().removeEventListener("pointermove", nt), c().removeEventListener("pointerup", vt), $t(null);
        const { x: Dt, y: It } = t.screenToCanvas(zt.clientX, zt.clientY);
        let Et = t.hitTest(Dt, It, ht);
        if (!Et || Et.type === "edge" || t.isContainerType(Et.type)) {
          const Ft = 50 / t.viewport.zoom;
          let pe = 1 / 0, Yt = !1, fe = null;
          for (const ue of t.getAllNodes()) {
            if (ue.type === "edge") continue;
            const ye = t.isContainerType(ue.type), Me = Be(ue, Dt, It, ht), Ie = Math.hypot(Me.x - Dt, Me.y - It);
            Ie >= Ft || ye && !Yt && fe || (!ye && Yt || Ie < pe) && (pe = Ie, Yt = ye, fe = ue);
          }
          fe && (Et = fe);
        }
        if (!Et || Et.type === "edge") return;
        const oe = L === "source" ? Et.id : E, Zt = L === "target" ? Et.id : B;
        if (oe === Zt) return;
        const Ct = L === "source" ? E : B;
        if (Et.id === Ct) return;
        const Pt = F.data.sourceT !== void 0 || F.data.targetT !== void 0, bt = Pt ? void 0 : _n(Et, Dt, It, ht), Tt = Pt ? Be(Et, Dt, It, ht).t : void 0, Vt = L === "source" ? {
          fromId: oe,
          toId: Zt,
          sourceHandle: bt ?? R,
          targetHandle: D,
          sourcePort: F.data.sourcePort,
          targetPort: F.data.targetPort
        } : {
          fromId: oe,
          toId: Zt,
          sourceHandle: R,
          targetHandle: bt ?? D,
          sourcePort: F.data.sourcePort,
          targetPort: F.data.targetPort
        };
        if (t.getAllNodes().some((Ft) => Ft.type !== "edge" || Ft.id === k ? !1 : ss(Ft.data, Vt))) return;
        let Wt;
        Pt ? Wt = L === "source" ? { fromId: Et.id, sourceT: Tt, sourceHandle: void 0 } : { toId: Et.id, targetT: Tt, targetHandle: void 0 } : Wt = L === "source" ? { fromId: Et.id, sourceHandle: bt } : { toId: Et.id, targetHandle: bt }, t.updateNodeWithHistory(k, { data: Wt });
      };
      c().addEventListener("pointermove", nt), c().addEventListener("pointerup", vt);
    },
    [t, ht]
  ), pc = lt(
    (k) => {
      if (k.stopPropagation(), k.preventDefault(), t.presentationMode) return;
      const L = Array.from(t.selection).map((Tt) => t.getNode(Tt)).filter(Boolean);
      if (L.length < 2) return;
      const F = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, E = F ? t.groupRotations.get(F) : null;
      let B, R;
      if (E)
        B = E.cx, R = E.cy;
      else {
        let Tt = 1 / 0, Vt = 1 / 0, Bt = -1 / 0, Wt = -1 / 0;
        for (const Ft of L) {
          const pe = Ft.h === "auto" ? ht[Ft.id] ?? 100 : Ft.h, Yt = xe(Ft, pe);
          Tt = Math.min(Tt, Yt.minX), Vt = Math.min(Vt, Yt.minY), Bt = Math.max(Bt, Yt.maxX), Wt = Math.max(Wt, Yt.maxY);
        }
        B = (Tt + Bt) / 2, R = (Vt + Wt) / 2;
      }
      const D = (E == null ? void 0 : E.angle) ?? 0, q = L.filter((Tt) => !Tt.locked).map((Tt) => {
        const Vt = Tt.h === "auto" ? ht[Tt.id] ?? 100 : Tt.h;
        return {
          id: Tt.id,
          cx: Tt.x + Tt.w / 2,
          cy: Tt.y + Vt / 2,
          w: Tt.w,
          h: Vt,
          rotation: Tt.rotation || 0
        };
      }), X = -D * Math.PI / 180, U = Math.cos(X), N = Math.sin(X);
      let V = 1 / 0, nt = 1 / 0, vt = -1 / 0, zt = -1 / 0;
      for (const Tt of q) {
        const Vt = Tt.cx - B, Bt = Tt.cy - R, Wt = B + Vt * U - Bt * N, Ft = R + Vt * N + Bt * U;
        V = Math.min(V, Wt - Tt.w / 2), nt = Math.min(nt, Ft - Tt.h / 2), vt = Math.max(vt, Wt + Tt.w / 2), zt = Math.max(zt, Ft + Tt.h / 2);
      }
      const Dt = {
        x: V - I,
        y: nt - I,
        w: vt - V + I * 2,
        h: zt - nt + I * 2
      }, { x: It, y: Et } = t.screenToCanvas(k.clientX, k.clientY), oe = Math.atan2(Et - R, It - B);
      let Zt = !1, Ct = D;
      const Pt = (Tt) => {
        Zt || (Zt = !0, t.pushHistorySnapshot());
        const { x: Vt, y: Bt } = t.screenToCanvas(Tt.clientX, Tt.clientY);
        let Ft = (Math.atan2(Bt - R, Vt - B) - oe) * (180 / Math.PI);
        (Tt.shiftKey || t.snapToGrid) && !(Tt.metaKey || Tt.ctrlKey) && (Ft = Math.round(Ft / 15) * 15), Ct = D + Ft, Gn({ angle: Ct, cx: B, cy: R, bounds: Dt });
        const pe = Ft * Math.PI / 180, Yt = Math.cos(pe), fe = Math.sin(pe), ue = q.map((ye) => {
          const Me = ye.cx - B, Ie = ye.cy - R, to = B + Me * Yt - Ie * fe, Mn = R + Me * fe + Ie * Yt;
          return {
            id: ye.id,
            patch: {
              x: to - ye.w / 2,
              y: Mn - ye.h / 2,
              rotation: Ct
            }
          };
        });
        t.updateMany(ue);
      }, bt = () => {
        F && t.groupRotations.set(F, { angle: Ct, cx: B, cy: R }), Gn({ angle: Ct, cx: B, cy: R, bounds: Dt }), c().removeEventListener("pointermove", Pt), c().removeEventListener("pointerup", bt);
      };
      c().addEventListener("pointermove", Pt), c().addEventListener("pointerup", bt);
    },
    [t, ht, xe]
  ), fc = lt(
    (k, L) => {
      if (L.stopPropagation(), L.preventDefault(), t.presentationMode) return;
      const T = Array.from(t.selection).map((bt) => t.getNode(bt)).filter(Boolean);
      if (T.length < 2) return;
      const F = (bt) => bt.h === "auto" ? ht[bt.id] ?? 100 : bt.h;
      let E = 1 / 0, B = 1 / 0, R = -1 / 0, D = -1 / 0;
      for (const bt of T) {
        const Tt = F(bt), Vt = xe(bt, Tt);
        E = Math.min(E, Vt.minX), B = Math.min(B, Vt.minY), R = Math.max(R, Vt.maxX), D = Math.max(D, Vt.maxY);
      }
      const j = { x: E, y: B, w: R - E, h: D - B }, q = j.w || 1, X = j.h || 1, N = T.filter((bt) => !bt.locked).map((bt) => {
        const Tt = F(bt);
        return {
          id: bt.id,
          type: bt.type,
          isAutoH: bt.h === "auto",
          relX: (bt.x - j.x) / q,
          relY: (bt.y - j.y) / X,
          relW: bt.w / q,
          relH: Tt / X,
          origW: bt.w,
          origH: Tt,
          origPoints: bt.type === "draw" ? bt.data.points.map((Vt) => [...Vt]) : null,
          drawData: bt.type === "draw" ? { ...bt.data } : null,
          origFontSize: bt.type === "text" ? bt.data.fontSize : 0,
          textData: bt.type === "text" ? { ...bt.data } : null
        };
      }), V = L.clientX, nt = L.clientY;
      let vt = !1, zt = null, Dt = V, It = nt, Et = !1, oe = L.shiftKey;
      const Zt = () => {
        zt = null;
        const bt = (Dt - V) / t.viewport.zoom, Tt = (It - nt) / t.viewport.zoom;
        !vt && (bt !== 0 || Tt !== 0) && (vt = !0, t.pushHistorySnapshot());
        let Vt = j.x, Bt = j.y, Wt = j.w, Ft = j.h;
        if ((k === "nw" || k === "w" || k === "sw") && (Vt = j.x + bt, Wt = j.w - bt), (k === "ne" || k === "e" || k === "se") && (Wt = j.w + bt), (k === "nw" || k === "n" || k === "ne") && (Bt = j.y + Tt, Ft = j.h - Tt), (k === "sw" || k === "s" || k === "se") && (Ft = j.h + Tt), t.snapToGrid && !Et) {
          const Yt = t.gridSize, fe = (ue) => Math.round(ue / Yt) * Yt;
          (k === "nw" || k === "w" || k === "sw") && (Vt = fe(Vt), Wt = j.x + j.w - Vt), (k === "ne" || k === "e" || k === "se") && (Wt = fe(Vt + Wt) - Vt), (k === "nw" || k === "n" || k === "ne") && (Bt = fe(Bt), Ft = j.y + j.h - Bt), (k === "sw" || k === "s" || k === "se") && (Ft = fe(Bt + Ft) - Bt);
        }
        if (Wt < 20 && (Wt = 20, (k === "nw" || k === "w" || k === "sw") && (Vt = j.x + j.w - 20)), Ft < 20 && (Ft = 20, (k === "nw" || k === "n" || k === "ne") && (Bt = j.y + j.h - 20)), oe && j.w > 0 && j.h > 0) {
          const Yt = Ms(
            k,
            j.x,
            j.y,
            j.w,
            j.h,
            Vt,
            Bt,
            Wt,
            Ft
          );
          Vt = Yt.x, Bt = Yt.y, Wt = Yt.w, Ft = Yt.h;
        }
        const pe = N.map((Yt) => {
          const fe = Vt + Yt.relX * Wt, ue = Bt + Yt.relY * Ft, ye = Yt.relW * Wt, Me = Yt.relH * Ft, Ie = {
            x: fe,
            y: ue,
            w: ye,
            h: Yt.isAutoH ? "auto" : Me
          };
          if (Yt.origPoints && Yt.drawData) {
            const to = Yt.origW > 0 ? ye / Yt.origW : 1, Mn = Yt.origH > 0 ? Me / Yt.origH : 1;
            Ie.data = {
              ...Yt.drawData,
              points: Yt.origPoints.map(
                ([xc, wc, kc]) => [xc * to, wc * Mn, kc]
              )
            };
          }
          if (Yt.type === "text" && Yt.origFontSize > 0 && Yt.textData && k !== "e" && k !== "w") {
            const to = k === "n" || k === "s" ? Yt.origH > 0 ? Me / Yt.origH : 1 : Yt.origW > 0 ? ye / Yt.origW : 1, Mn = Math.max(8, Math.round(Yt.origFontSize * to));
            Ie.data = { ...Yt.textData, fontSize: Mn };
          }
          return { id: Yt.id, patch: Ie };
        });
        t.updateMany(pe);
      }, Ct = (bt) => {
        Dt = bt.clientX, It = bt.clientY, Et = bt.metaKey || bt.ctrlKey, oe = bt.shiftKey, zt === null && (zt = requestAnimationFrame(Zt));
      }, Pt = () => {
        zt !== null && (cancelAnimationFrame(zt), Zt()), c().removeEventListener("pointermove", Ct), c().removeEventListener("pointerup", Pt);
        for (const bt of T)
          t.isContainerType(bt.type) && t.syncFrameChildrenAfterResize(bt.id);
      };
      c().addEventListener("pointermove", Ct), c().addEventListener("pointerup", Pt);
    },
    [t, ht, xe]
  );
  Mt(() => {
    a.current && (a.current.style.cursor = t.lassoSelect ? nn : lr(v)), v !== "select" && v !== "edge" && (wn.current = null, Dr(null)), v !== "erase" && (io.current !== null && (cancelAnimationFrame(io.current), io.current = null), so.current = /* @__PURE__ */ new Set(), Fr(/* @__PURE__ */ new Set()), Xe.current = [], vn([]), t.notifyEraserEnd());
  }, [v, t]);
  const Xr = pt(null), ki = pt(null), yc = lt(
    (k) => {
      if (J.current && k.pointerType === "touch" && dt.current) {
        const L = k.clientX - dt.current.clientX, T = k.clientY - dt.current.clientY;
        Math.sqrt(L * L + T * T) > 8 && (clearTimeout(J.current), J.current = null, dt.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (ki.current = { clientX: k.clientX, clientY: k.clientY }, Xr.current === null && (Xr.current = requestAnimationFrame(() => {
        Xr.current = null;
        const L = a.current, T = ki.current;
        if (!L || !T) return;
        const { x: F, y: E } = t.screenToCanvas(T.clientX, T.clientY);
        if (t.lassoSelect) {
          L.style.cursor = nn;
          return;
        }
        if (t.mode === "edge") {
          const D = 50 / t.viewport.zoom;
          let j = null, q = D;
          for (const X of t.getAllNodes()) {
            if (X.type === "edge") continue;
            const U = Be(X, F, E, ht), N = Math.hypot(U.x - F, U.y - E);
            N < q && (q = N, j = X.id);
          }
          j !== wn.current && (wn.current = j, Dr(j)), $l({ x: F, y: E });
          return;
        }
        if (t.selection.size >= 2 && re && F >= re.x && F <= re.x + re.w && E >= re.y && E <= re.y + re.h) {
          L.style.cursor = "move";
          return;
        }
        const B = t.hitTest(F, E, ht), R = B ? B.id : null;
        if (R !== wn.current && (wn.current = R, Dr(R)), B) {
          L.style.cursor = "move";
          return;
        }
        if (Pi(
          t.nodes,
          F,
          E,
          t.viewport.zoom,
          ht,
          Je
        )) {
          L.style.cursor = "move";
          return;
        }
        L.style.cursor = "default";
      })));
    },
    [t, re, ht, xe, Je]
  ), gc = lt((k) => {
    (k.dataTransfer.types.includes("Files") || k.dataTransfer.types.includes(Es) || k.dataTransfer.types.includes(Ls) || k.dataTransfer.types.includes(Rs)) && (k.preventDefault(), k.dataTransfer.dropEffect = "copy");
  }, []), mc = lt(
    (k) => {
      if (k.preventDefault(), t.presentationMode) return;
      const L = k.dataTransfer.getData(Rs);
      if (L) {
        try {
          const N = JSON.parse(L);
          Bl(t, N, k.clientX, k.clientY);
        } catch (N) {
          console.error("Failed to place GIF:", N);
        }
        return;
      }
      const T = k.dataTransfer.getData(Ls);
      if (T) {
        try {
          const { itemId: N } = JSON.parse(T), nt = El().find((vt) => vt.id === N);
          nt && Rl(t, nt, k.clientX, k.clientY);
        } catch (N) {
          console.error("Failed to place personal library item:", N);
        }
        return;
      }
      const F = k.dataTransfer.getData(Es);
      if (F) {
        try {
          const { libraryId: N, itemId: V } = JSON.parse(F), vt = _s(N).find((zt) => zt.id === V);
          vt && Ll(t, vt, k.clientX, k.clientY);
        } catch (N) {
          console.error("Failed to place library item:", N);
        }
        return;
      }
      const E = k.dataTransfer.files[0];
      if (!E) return;
      const B = `${E.name}|${E.size}|${E.lastModified}|${Math.round(k.clientX)}|${Math.round(k.clientY)}`, R = performance.now(), D = h.current;
      if (D && D.sig === B && R - D.at < 150)
        return;
      h.current = { sig: B, at: R }, k.stopPropagation();
      const j = k.nativeEvent;
      if (typeof j.stopImmediatePropagation == "function" && j.stopImmediatePropagation(), E.name.endsWith(".excalidrawlib") || E.name.endsWith(".excalidrawlib.json")) {
        const N = new FileReader();
        N.onload = () => {
          try {
            const V = JSON.parse(N.result);
            if (V.type === "excalidrawlib") {
              const nt = E.name.replace(/\.excalidrawlib(\.json)?$/, "");
              ti(V, { name: nt });
            }
          } catch (V) {
            console.error("Failed to import library:", V);
          }
        }, N.readAsText(E);
        return;
      }
      if (E.type === "image/svg+xml" || E.name.endsWith(".svg")) {
        const N = new FileReader();
        N.onload = () => {
          const V = N.result, nt = Ds(V);
          nt && gp(t, nt, k.clientX, k.clientY);
        }, N.readAsText(E);
        return;
      }
      if (!E.type.startsWith("image/")) return;
      const { x: q, y: X } = t.screenToCanvas(k.clientX, k.clientY), U = new FileReader();
      U.onload = () => {
        const N = U.result, V = new Image();
        V.onload = () => {
          const nt = Math.min(V.naturalWidth, 400), vt = Math.min(V.naturalHeight, 300), zt = V.naturalWidth / V.naturalHeight, Dt = zt >= 1 ? nt : vt * zt, It = zt >= 1 ? nt / zt : vt;
          t.addNode({
            id: Rt(10),
            type: "image",
            x: q,
            y: X,
            w: Dt,
            h: It,
            z: t.nextZ(),
            data: { src: N }
          });
        }, V.src = N;
      }, U.readAsDataURL(E);
    },
    [t]
  ), bc = `translate(${d.x}px, ${d.y}px) scale(${d.zoom})`, Yr = A.activeIndex >= 0 ? ((Si = A.matches[A.activeIndex]) == null ? void 0 : Si.nodeId) ?? null : null, vi = Ut(() => {
    if (!A.query || A.matches.length === 0) return /* @__PURE__ */ new Set();
    const k = /* @__PURE__ */ new Set();
    for (const L of A.matches)
      L.nodeType !== "edge" && k.add(L.nodeId);
    return k;
  }, [A]);
  return Io(() => {
    const k = a.current;
    if (b || !k || !A.query || A.matches.length === 0) {
      G((R) => R.length === 0 ? R : []);
      return;
    }
    const L = k.getBoundingClientRect(), T = A.query.toLocaleLowerCase(), F = Array.from(new Set(A.matches.map((R) => R.nodeId))), E = [], B = 900;
    for (const R of F) {
      if (E.length >= B) break;
      const D = R.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), j = k.querySelector(`[data-node-id="${D}"]`);
      if (!j) continue;
      const q = document.createTreeWalker(
        j,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(U) {
            const N = U.parentElement;
            return !N || N.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']") || !U.nodeValue || !U.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let X = q.nextNode();
      for (; X && E.length < B; ) {
        const U = X, V = (U.nodeValue ?? "").toLocaleLowerCase();
        let nt = 0;
        for (; nt <= V.length - T.length && E.length < B; ) {
          const vt = V.indexOf(T, nt);
          if (vt < 0) break;
          const zt = document.createRange();
          zt.setStart(U, vt), zt.setEnd(U, vt + T.length);
          const Dt = zt.getClientRects();
          for (const It of Dt)
            It.width <= 0 || It.height <= 0 || E.push({
              x: It.left - L.left,
              y: It.top - L.top,
              w: It.width,
              h: It.height,
              active: R === Yr
            });
          nt = vt + T.length;
        }
        X = q.nextNode();
      }
    }
    G((R) => R.length === E.length && R.every((D, j) => {
      const q = E[j];
      return D.x === q.x && D.y === q.y && D.w === q.w && D.h === q.h && D.active === q.active;
    }) ? R : E);
  }, [A, g, d, Yr, b]), /* @__PURE__ */ u(mn.Provider, { value: $, children: /* @__PURE__ */ S(
    "div",
    {
      ref: a,
      "data-sb-canvas": !0,
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        touchAction: "none",
        background: Fn(tt).canvasBg
      },
      onPointerDown: rc,
      onPointerMove: yc,
      onDoubleClick: nc,
      onContextMenu: oc,
      onDragOver: gc,
      onDrop: mc,
      children: [
        /* @__PURE__ */ u(Fu, { viewport: d, gridSize: at, background: tt, gridVisible: rt }),
        /* @__PURE__ */ S(
          Sf,
          {
            safariWebKitWorkaround: mp(),
            viewport: d,
            viewportTransform: bc,
            children: [
              ec.sort((k, L) => k.z - L.z).map((k) => {
                var R;
                const L = Nr.has(k.id), T = _l.has(k.id), E = -(k.id.split("").reduce((D, j) => D + j.charCodeAt(0), 0) % 240 / 100);
                let B;
                if (o) {
                  const D = o.get(k.type);
                  if (D) {
                    const j = D.component, q = y.has(k.id) && v !== "edge", X = v === "select" || v === "text" || v === "note" || v === "sticky", U = /* @__PURE__ */ u(
                      j,
                      {
                        node: k,
                        data: k.data,
                        isSelected: q,
                        multiSelected: y.size > 1 && q && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: X,
                        zoom: d.zoom,
                        editing: fi === k.id,
                        cropping: _e === k.id,
                        editClickPos: fi === k.id ? Wr.current : null,
                        callbacks: {
                          onMeasuredHeight: he,
                          onResizeHandleDown: Or,
                          onEditStart: (N) => {
                            const V = t.getNode(N);
                            V && (V.type === "text" ? Lo(N) : V.type === "sticky" ? Ro(N) : V.type === "frame" ? Jo(N) : V.type === "shape" ? $o(N) : V.type === "image" ? _o(N) : V.type === "youtube" && pi(N));
                          },
                          onEditEnd: () => {
                            k.type === "text" ? Lo((N) => {
                              if (N !== k.id) return N;
                              const V = Vn.current;
                              return V && V.id === N && performance.now() < V.until ? N : null;
                            }) : k.type === "sticky" ? Ro((N) => N === k.id ? null : N) : k.type === "frame" ? Jo((N) => N === k.id ? null : N) : k.type === "shape" ? $o((N) => N === k.id ? null : N) : k.type === "image" ? _o((N) => N === k.id ? null : N) : k.type === "youtube" && pi((N) => N === k.id ? null : N);
                          }
                        },
                        portValues: n && ((R = D.ports) != null && R.length) && Qn >= 0 ? n.getAllPortValues(k.id) : void 0,
                        updateData: (N) => {
                          const V = $();
                          t.updateNodeWithHistoryCoalesced(
                            k.id,
                            {
                              data: { ...k.data, ...N }
                            },
                            `${V}:registry:${k.id}`
                          );
                        }
                      },
                      D.handlesOwnLayout ? k.id : void 0
                    );
                    D.handlesOwnLayout ? B = U : B = /* @__PURE__ */ u(
                      kf,
                      {
                        node: k,
                        isInteractive: X,
                        measuredH: ht[k.id],
                        onMeasuredHeight: he,
                        observeElement: ve,
                        unobserveElement: Fe,
                        isContainer: D.isContainer,
                        children: U
                      },
                      k.id
                    );
                  }
                } else if (k.type === "content") {
                  const D = k;
                  B = /* @__PURE__ */ u(
                    Ua,
                    {
                      node: D,
                      isSelected: y.has(k.id) && v !== "edge",
                      multiSelected: y.size > 1 && y.has(k.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: v === "select" || v === "text" || v === "note",
                      zoom: d.zoom,
                      onMeasuredHeight: he,
                      autoEdit: yi.current === D.id
                    },
                    k.id
                  );
                } else if (k.type === "text")
                  B = /* @__PURE__ */ u(
                    al,
                    {
                      node: k,
                      engine: t,
                      editing: Qo === k.id,
                      editClickPos: Qo === k.id ? Wr.current : null,
                      onStopEdit: () => {
                        if (Br.current === k.id) {
                          Br.current = null;
                          const D = t.getNode(k.id);
                          if (!D || !D.data.text.trim()) {
                            t.deleteNode(k.id), Lo((j) => j === k.id ? null : j);
                            return;
                          }
                        }
                        Lo((D) => D === k.id ? null : D);
                      },
                      onMeasuredHeight: he
                    },
                    k.id
                  );
                else if (k.type === "image")
                  B = /* @__PURE__ */ u(
                    il,
                    {
                      node: k,
                      isSelected: y.has(k.id) && v !== "edge",
                      engine: t,
                      interactive: v === "select",
                      zoom: d.zoom,
                      onResizeHandleDown: Or,
                      cropping: _e === k.id,
                      onCropStart: () => _o(k.id),
                      onCropEnd: () => _o(null)
                    },
                    k.id
                  );
                else if (k.type === "sticky")
                  B = /* @__PURE__ */ u(
                    ll,
                    {
                      node: k,
                      isSelected: y.has(k.id) && v !== "edge",
                      engine: t,
                      interactive: v === "select" || v === "sticky",
                      zoom: d.zoom,
                      editing: ui === k.id,
                      onEditStart: Ro,
                      onEditEnd: () => Ro(null)
                    },
                    k.id
                  );
                else if (k.type === "frame") {
                  const D = k, j = D.h === "auto" ? 100 : D.h;
                  B = /* @__PURE__ */ u(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: D.x,
                        top: D.y,
                        width: D.w,
                        height: j,
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
                      children: hi === k.id ? /* @__PURE__ */ u(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: D.data.label ?? "",
                          placeholder: i.frameLabelPlaceholder,
                          onBlur: (q) => {
                            const X = q.currentTarget.value.trim();
                            t.updateNodeWithHistory(k.id, {
                              data: { ...D.data, label: X || void 0 }
                            }), Jo(null);
                          },
                          onKeyDown: (q) => {
                            (q.key === "Enter" || q.key === "Escape") && q.currentTarget.blur(), q.stopPropagation();
                          },
                          onPointerDown: (q) => q.stopPropagation(),
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
                      ) : D.data.label ? /* @__PURE__ */ u(
                        "div",
                        {
                          onDoubleClick: (q) => {
                            q.stopPropagation(), t.select(k.id), Jo(k.id);
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
                  D.type === "draw" ? B = /* @__PURE__ */ u(xr, { node: D }, k.id) : B = /* @__PURE__ */ u(xr, { node: D, editingLabel: kn === k.id }, k.id);
                }
                return L || T ? /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      opacity: L ? 0.25 : void 0,
                      filter: L ? "saturate(0)" : void 0,
                      animation: T ? "sb-node-bop 3.4s ease-in-out infinite" : void 0,
                      animationDelay: T ? `${E}s` : void 0,
                      transformOrigin: "center center",
                      willChange: T ? "transform" : void 0
                    },
                    children: B
                  },
                  k.id
                ) : B;
              }),
              vi.size > 0 && Array.from(vi).map((k) => {
                const L = t.getNode(k);
                if (!L || L.type === "edge") return null;
                const T = L.h === "auto" ? ht[L.id] ?? 100 : L.h, F = Yr === k;
                return /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: L.x - 5,
                      top: L.y - 5,
                      width: L.w + 10,
                      height: T + 10,
                      borderRadius: 10,
                      border: `2px solid ${F ? "#f59e0b" : "#60a5fa"}`,
                      boxShadow: F ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
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
                return L.shape === "line" || L.shape === "arrow" ? null : /* @__PURE__ */ u(
                  vf,
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
        /* @__PURE__ */ u(
          Mp,
          {
            nodes: Po,
            viewport: d,
            selection: y,
            measuredHeights: ht,
            activeStroke: gt,
            shapePreview: At,
            shapePreviewStyle: At ? {
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
            onResizeHandleDown: Or,
            onRotateStart: sc,
            onConnectionHandleDown: wi,
            onEdgeEndpointDown: uc,
            onKinkHandleDown: hc,
            edgePreview: Lt,
            edgeReconnect: Kt,
            eraserMarkedIds: Nr.size > 0 ? Nr : void 0,
            eraserTrail: gi.length > 1 ? gi : void 0,
            laserTrail: bi.length > 1 ? bi : void 0,
            mode: v,
            freeFormEdges: t.freeFormEdges,
            hoveredNodeId: Ql,
            cursorCanvasPos: Jl,
            registry: o,
            onPortHandleDown: ac,
            cycleNodeIds: n && Qn >= 0 ? n.cycleNodeIds : void 0,
            dataFlowEdgeOverlay: n ? r : "off",
            getLastComputeMs: n ? cc : void 0,
            getDataFlowPortValue: n ? dc : void 0,
            containerTypes: t.containerTypes,
            alignGuides: W,
            suppressNodeOverlayId: _e
          }
        ),
        re && !_e && v !== "edge" && !Lt && !Kt && (() => {
          const k = t.selectionGroupId(), L = k ? t.groupRotations.get(k) : void 0;
          let T, F, E, B;
          if (xn)
            T = xn.bounds, F = xn.angle, E = xn.cx, B = xn.cy;
          else if (L && L.angle !== 0) {
            const X = -L.angle * Math.PI / 180, U = Math.cos(X), N = Math.sin(X);
            let V = 1 / 0, nt = 1 / 0, vt = -1 / 0, zt = -1 / 0;
            for (const Dt of t.selection) {
              const It = t.getNode(Dt);
              if (!It || It.type === "edge") continue;
              const Et = It.h === "auto" ? ht[It.id] ?? 100 : It.h, oe = It.x + It.w / 2, Zt = It.y + Et / 2, Ct = oe - L.cx, Pt = Zt - L.cy, bt = L.cx + Ct * U - Pt * N, Tt = L.cy + Ct * N + Pt * U;
              V = Math.min(V, bt - It.w / 2), nt = Math.min(nt, Tt - Et / 2), vt = Math.max(vt, bt + It.w / 2), zt = Math.max(zt, Tt + Et / 2);
            }
            T = {
              x: V - I,
              y: nt - I,
              w: vt - V + I * 2,
              h: zt - nt + I * 2
            }, F = L.angle, E = L.cx, B = L.cy;
          } else
            T = re, F = 0, E = 0, B = 0;
          const R = 8 / d.zoom, D = R / 2, j = [
            { pos: "nw", cx: T.x, cy: T.y },
            { pos: "n", cx: T.x + T.w / 2, cy: T.y },
            { pos: "ne", cx: T.x + T.w, cy: T.y },
            { pos: "e", cx: T.x + T.w, cy: T.y + T.h / 2 },
            { pos: "se", cx: T.x + T.w, cy: T.y + T.h },
            { pos: "s", cx: T.x + T.w / 2, cy: T.y + T.h },
            { pos: "sw", cx: T.x, cy: T.y + T.h },
            { pos: "w", cx: T.x, cy: T.y + T.h / 2 }
          ], q = F !== 0 ? ` rotate(${F}, ${E}, ${B})` : "";
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${d.x}, ${d.y}) scale(${d.zoom})`, children: /* @__PURE__ */ S("g", { transform: q, children: [
                /* @__PURE__ */ u(
                  "rect",
                  {
                    x: T.x,
                    y: T.y,
                    width: T.w,
                    height: T.h,
                    fill: "none",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / d.zoom
                  }
                ),
                F === 0 && j.map(({ pos: X, cx: U, cy: N }) => /* @__PURE__ */ u(
                  "rect",
                  {
                    x: U - D,
                    y: N - D,
                    width: R,
                    height: R,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / d.zoom,
                    style: { cursor: Mr(X, F), pointerEvents: "auto" },
                    onPointerDown: (V) => {
                      V.stopPropagation(), fc(X, V);
                    }
                  },
                  X
                )),
                (() => {
                  const X = 25 / d.zoom, U = T.x + T.w / 2, N = T.y;
                  return /* @__PURE__ */ S(St, { children: [
                    /* @__PURE__ */ u(
                      "line",
                      {
                        x1: U,
                        y1: N,
                        x2: U,
                        y2: N - X,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / d.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const V = 8 / d.zoom, nt = V / 2;
                      return /* @__PURE__ */ u(
                        "rect",
                        {
                          x: U - nt,
                          y: N - X - nt,
                          width: V,
                          height: V,
                          rx: 1.5 / d.zoom,
                          transform: `rotate(45, ${U}, ${N - X})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / d.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (vt) => pc(vt)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const X = 26 / d.zoom, U = 42 / d.zoom, N = 4 / d.zoom;
                  return [
                    { side: "top", cx: T.x + T.w / 2, cy: T.y - U },
                    { side: "right", cx: T.x + T.w + X, cy: T.y + T.h / 2 },
                    { side: "bottom", cx: T.x + T.w / 2, cy: T.y + T.h + X },
                    { side: "left", cx: T.x - X, cy: T.y + T.h / 2 }
                  ].map(({ side: nt, cx: vt, cy: zt }) => /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: vt,
                      cy: zt,
                      r: N,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / d.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (Dt) => {
                        Dt.stopPropagation();
                        const It = ic(nt);
                        It && wi(It, nt, Dt);
                      }
                    },
                    `conn-${nt}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Re && /* @__PURE__ */ u(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ u("g", { transform: `translate(${d.x}, ${d.y}) scale(${d.zoom})`, children: /* @__PURE__ */ u(
              "rect",
              {
                x: Re.x,
                y: Re.y,
                width: Re.w,
                height: Re.h,
                fill: "none",
                stroke: "#6366f1",
                strokeWidth: 1.5 / d.zoom,
                strokeDasharray: `${5 / d.zoom} ${3 / d.zoom}`,
                rx: 4 / d.zoom,
                opacity: 0.5
              }
            ) })
          }
        ),
        je && (() => {
          const k = t.canvasToScreen(je.startX, je.startY), L = t.canvasToScreen(je.endX, je.endY), T = Math.min(k.x, L.x), F = Math.min(k.y, L.y), E = Math.abs(L.x - k.x), B = Math.abs(L.y - k.y);
          return E < 2 && B < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
                "rect",
                {
                  x: T,
                  y: F,
                  width: E,
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
        ro && ro.length > 2 && (() => {
          const L = ro.map(([T, F]) => t.canvasToScreen(T, F)).map((T) => `${T.x},${T.y}`).join(" ");
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
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
        me && (() => {
          const k = Math.min(me.startX, me.endX), L = Math.min(me.startY, me.endY), T = Math.abs(me.endX - me.startX), F = Math.abs(me.endY - me.startY);
          return T < 2 && F < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${d.x}, ${d.y}) scale(${d.zoom})`, children: /* @__PURE__ */ u(
                "rect",
                {
                  x: k,
                  y: L,
                  width: T,
                  height: F,
                  fill: "rgba(59,130,246,0.06)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5 / d.zoom,
                  strokeDasharray: `${4 / d.zoom}`,
                  rx: 8 / d.zoom
                }
              ) })
            }
          );
        })(),
        Y.length > 0 && /* @__PURE__ */ u(
          "div",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: Y.map((k, L) => /* @__PURE__ */ u(
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
        s && /* @__PURE__ */ u(
          Yu,
          {
            engine: t,
            nodes: g,
            viewport: d,
            containerSize: l,
            measuredHeights: ht
          }
        ),
        Zo && /* @__PURE__ */ u(
          Cp,
          {
            x: Zo.x,
            y: Zo.y,
            sections: Zo.sections,
            onClose: () => Yn(null)
          }
        ),
        Kn && /* @__PURE__ */ u(
          fp,
          {
            nodes: Kn.nodes,
            onSave: (k) => {
              rp(k, Kn.nodes, Kn.groupParent), Hr(null);
            },
            onCancel: () => Hr(null)
          }
        )
      ]
    }
  ) });
}
const eo = 52, dn = 300, P0 = eo + dn, Cf = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], si = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], If = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], kr = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Vl = [1, 2, 3, 5, 8, 12], ii = [1, 2, 3, 4, 6, 8], Kl = [1, 2, 3, 4, 6], zf = ii, ql = [14, 20, 28, 36], ai = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Tf = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Oe = [
  { name: "Standard", colors: Cf },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], li = Oe, Pf = [
  { name: "Standard", colors: Tf },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Ot = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Ht = {
  width: 64,
  fontSize: 10,
  flexShrink: 0
}, ne = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
}, Af = "https://libraries.excalidraw.com/libraries.json", Ns = "https://libraries.excalidraw.com/libraries";
function Ef({
  onClose: t,
  onInstalled: e
}) {
  const o = ee(), { labels: n } = Jt(), [r, s] = et([]), [i, a] = et(!0), [h, c] = et(null), [l, p] = et(""), [d, f] = et(null), [g, m] = et(/* @__PURE__ */ new Set()), y = lt(() => {
    const w = gl(), v = new Set(w.map((M) => M.source));
    m(v);
  }, []);
  Mt(() => {
    let w = !1;
    return (async () => {
      try {
        const v = await fetch(Af);
        if (!v.ok) throw new Error(`HTTP ${v.status}`);
        const M = await v.json();
        w || (s(M), a(!1));
      } catch (v) {
        w || (c(String(v)), a(!1));
      }
    })(), y(), () => {
      w = !0;
    };
  }, [y]);
  const x = Ut(() => {
    if (!l.trim()) return r;
    const w = l.toLowerCase();
    return r.filter(
      (v) => {
        var M, C;
        return v.name.toLowerCase().includes(w) || ((M = v.description) == null ? void 0 : M.toLowerCase().includes(w)) || ((C = v.itemNames) == null ? void 0 : C.some((z) => z.toLowerCase().includes(w)));
      }
    );
  }, [r, l]), b = lt(
    async (w) => {
      f(w.id);
      try {
        const v = `${Ns}/${w.source}`;
        await Ku(v, w.name), y(), e();
      } catch (v) {
        console.error("Failed to install library:", v);
      } finally {
        f(null);
      }
    },
    [e, y]
  );
  return Ze(
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
                          /* @__PURE__ */ u(
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
                        placeholder: n.libraryDirectorySearchPlaceholder,
                        value: l,
                        onChange: (w) => p(w.target.value),
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
                    i && /* @__PURE__ */ u(
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
                    h && /* @__PURE__ */ S(
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
                          h
                        ]
                      }
                    ),
                    !i && !h && x.length === 0 && /* @__PURE__ */ u(
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
                    x.map((w, v) => {
                      const M = g.has(
                        `${Ns}/${w.source}`
                      ), C = d === w.id;
                      return /* @__PURE__ */ u(
                        Lf,
                        {
                          entry: w,
                          isInstalled: M,
                          isInstalling: C,
                          onInstall: () => b(w),
                          theme: o
                        },
                        w.id || `dir-${v}`
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
function Lf({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: n,
  theme: r
}) {
  var a;
  const { labels: s } = Jt(), i = t.preview ? `${Ns}/${t.preview}` : null;
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
              border: `1px solid ${r.border}`,
              flexShrink: 0,
              background: "#fff"
            }
          }
        ),
        /* @__PURE__ */ S("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ u(
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
          ((a = t.authors) == null ? void 0 : a.length) > 0 && /* @__PURE__ */ S(
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
                t.authors.map((h) => h.name).join(", ")
              ]
            }
          ),
          t.description && /* @__PURE__ */ u(
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
        /* @__PURE__ */ u(
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
const Rf = /^[A-Za-z][A-Za-z0-9_:-]*$/, ya = /^[A-Za-z][A-Za-z0-9_]*$/;
function Df(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function Ye(t) {
  return Df(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function is(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function Fo(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: Ye(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: Ye(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: Ye(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: Ye(o[2]), shape: "rect" } : Rf.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function Wf(t) {
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
function Bf(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function Nf(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const n = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return n ? { label: Ye(n[1]) } : { label: Ye(o) };
}
function Ff(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, n = t.replace(/\r\n/g, `
`).split(`
`).map((h) => h.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (n.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const r = n[0];
  /^(flowchart|graph)\b/i.test(r) && (o.direction = Bf(r), n.shift());
  const i = [], a = (h) => {
    for (const c of i) c.nodeKeys.add(h);
  };
  for (const h of n) {
    const c = h.split(";").map((l) => l.trim()).filter(Boolean);
    for (const l of c) {
      const p = Nf(l);
      if (p) {
        i.push({ label: p.label, nodeKeys: /* @__PURE__ */ new Set() });
        continue;
      }
      if (/^end\b/i.test(l)) {
        const g = i.pop();
        g && o.groups.push({
          label: g.label,
          nodeKeys: Array.from(g.nodeKeys)
        });
        continue;
      }
      const d = Wf(l);
      if (d) {
        const g = is(o, d.from), m = is(o, d.to);
        a(g.key), a(m.key), o.edges.push({ fromKey: g.key, toKey: m.key, label: d.label });
        continue;
      }
      const f = Fo(l);
      if (f) {
        const g = is(o, f);
        a(g.key);
      }
    }
  }
  for (; i.length > 0; ) {
    const h = i.pop();
    o.groups.push({
      label: h.label,
      nodeKeys: Array.from(h.nodeKeys)
    });
  }
  if (o.nodes.size === 0)
    throw new Error("Could not parse Mermaid nodes. Try simple flowchart syntax like A-->B.");
  return o;
}
function Hf(t) {
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
    const a = o.slice(0, i).trim(), h = o.slice(i + s.length).trim();
    if (!(!ya.test(a) || !ya.test(h)))
      return {
        from: a,
        arrow: s,
        to: h,
        label: Ye(n)
      };
  }
  return null;
}
function Of(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: Ye(e[3])
  } : null;
}
function Xf(t) {
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
function Yf(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const n = o.indexOf(" "), r = n >= 0 ? o.slice(0, n) : o, s = n >= 0 ? o.slice(n + 1).trim() : "";
  return Xf(r) ? { color: r, label: s || void 0 } : { label: o };
}
function Gf(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`).map((d) => d.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (e.length === 0)
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  if (!/^sequenceDiagram\b/i.test(e[0]))
    throw new Error("Not a Mermaid sequence diagram.");
  const o = /* @__PURE__ */ new Set(), n = [], r = [], s = [], i = [], a = [], h = [];
  let c = 0;
  const l = (d) => {
    o.has(d) || (o.add(d), n.push(d));
    for (const f of h) f.participants.add(d);
  };
  for (let d = 1; d < e.length; d++) {
    const f = e[d];
    if (/^autonumber\b/i.test(f)) continue;
    const g = Yf(f);
    if (g) {
      h.push({ type: "box", label: g.label, color: g.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const m = f.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (m) {
      h.push({
        type: "loop",
        label: m[1] ? Ye(m[1]) : void 0,
        startStep: c,
        participants: /* @__PURE__ */ new Set()
      });
      continue;
    }
    if (/^end\b/i.test(f)) {
      const w = h.pop();
      (w == null ? void 0 : w.type) === "box" ? a.push(w) : (w == null ? void 0 : w.type) === "loop" && i.push({
        label: w.label,
        startStep: w.startStep,
        endStep: c,
        participants: w.participants
      });
      continue;
    }
    const y = f.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (y) {
      l(y[1]);
      continue;
    }
    const x = Of(f);
    if (x) {
      l(x.of), s.push({ step: c, note: x });
      continue;
    }
    const b = Hf(f);
    if (b) {
      l(b.from), l(b.to), r.push(b), c += 1;
      continue;
    }
  }
  for (; h.length > 0; ) {
    const d = h.pop();
    d.type === "box" ? a.push(d) : i.push({
      label: d.label,
      startStep: d.startStep,
      endStep: c,
      participants: d.participants
    });
  }
  const p = n;
  if (p.length === 0)
    throw new Error("No participants found in sequenceDiagram.");
  if (r.length === 0 && s.length === 0)
    throw new Error("No messages/notes found in sequenceDiagram.");
  return {
    participants: p,
    messages: r,
    notes: s,
    loops: i.map((d) => ({
      label: d.label,
      startStep: d.startStep,
      endStep: d.endStep,
      participants: Array.from(d.participants)
    })).filter((d) => d.endStep >= d.startStep),
    groups: a.map((d) => ({
      label: d.label,
      color: d.color,
      participants: Array.from(d.participants)
    })).filter((d) => d.participants.length > 0)
  };
}
function cr(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function jf(t) {
  const e = Array.from(t.nodes.keys()).sort(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const c of e)
    o.set(c, 0), n.set(c, []);
  for (const c of t.edges)
    !o.has(c.fromKey) || !o.has(c.toKey) || (n.get(c.fromKey).push(c.toKey), o.set(c.toKey, (o.get(c.toKey) ?? 0) + 1));
  const r = e.filter((c) => (o.get(c) ?? 0) === 0), s = /* @__PURE__ */ new Map();
  for (const c of r) s.set(c, 0);
  const i = [...r];
  for (; i.length > 0; ) {
    const c = i.shift(), l = s.get(c) ?? 0;
    for (const p of n.get(c) ?? []) {
      const d = Math.max(s.get(p) ?? 0, l + 1);
      s.set(p, d), o.set(p, (o.get(p) ?? 0) - 1), (o.get(p) ?? 0) <= 0 && i.push(p);
    }
  }
  let a = 0;
  for (const c of s.values()) a = Math.max(a, c);
  for (const c of e)
    s.has(c) || (a += 1, s.set(c, a));
  const h = /* @__PURE__ */ new Map();
  for (const c of e) {
    const l = s.get(c) ?? 0;
    h.has(l) || h.set(l, []), h.get(l).push(c);
  }
  return Array.from(h.entries()).sort((c, l) => c[0] - l[0]).map(([, c]) => c.sort());
}
function Vf(t, e, o, n) {
  const r = Gf(t), s = [], i = [], a = 6, h = "#94a3b8", c = 3, l = "#475569", p = 180, d = 64, f = 270, g = o - 140, m = g + d + 8, y = 88, x = Math.max(1, r.messages.length), b = m + x * y + 40, w = b + 12, v = w + d, M = /* @__PURE__ */ new Map();
  for (const C of r.groups) {
    const z = C.participants.map((st) => M.get(st)).filter((st) => typeof st == "number");
    if (z.length === 0)
      for (const st of C.participants) {
        const at = r.participants.indexOf(st);
        at >= 0 && z.push(e + (at - (r.participants.length - 1) / 2) * f);
      }
    if (z.length === 0) continue;
    const A = Math.min(...z) - p / 2 - 24, P = Math.max(...z) + p / 2 + 24, Y = g - 22, G = v - Y + 18, rt = {
      id: Rt(10),
      type: "shape",
      x: A,
      y: Y,
      w: P - A,
      h: G,
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
    if (s.push(rt), i.push(rt.id), C.label) {
      const st = {
        id: Rt(10),
        type: "text",
        x: A + 10,
        y: Y + 8,
        w: Math.max(120, P - A - 20),
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
      s.push(st);
    }
  }
  for (let C = 0; C < r.participants.length; C++) {
    const z = r.participants[C], A = e + (C - (r.participants.length - 1) / 2) * f;
    M.set(z, A);
    const P = {
      id: Rt(10),
      type: "shape",
      x: A - p / 2,
      y: g,
      w: p,
      h: d,
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
        label: z,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(P), i.push(P.id);
    const Y = {
      id: Rt(10),
      type: "shape",
      x: A - a / 2,
      y: m,
      w: a,
      h: b - m,
      z: n(),
      data: {
        shape: "rect",
        stroke: h,
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 0,
        fill: h,
        fillStyle: "solid",
        opacity: 0.3,
        edgeStyle: "round"
      }
    };
    s.push(Y);
    const G = {
      id: Rt(10),
      type: "shape",
      x: A - p / 2,
      y: w,
      w: p,
      h: d,
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
        label: z,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(G), i.push(G.id);
  }
  for (const C of r.loops) {
    const z = C.participants.map((_) => M.get(_)).filter((_) => typeof _ == "number");
    if (z.length === 0) continue;
    const A = Math.min(...z) - 130, P = Math.max(...z) + 130, Y = C.startStep + 1, G = Math.max(Y, C.endStep), rt = m + (Y - 1) * y + 16, st = m + G * y + 34, at = {
      id: Rt(10),
      type: "shape",
      x: A,
      y: rt,
      w: P - A,
      h: Math.max(90, st - rt),
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
    s.push(at);
    const xt = `loop${C.label ? ` [${C.label}]` : ""}`, O = {
      id: Rt(10),
      type: "text",
      x: A + 10,
      y: rt + 8,
      w: P - A - 20,
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
    s.push(O);
  }
  for (let C = 0; C < r.messages.length; C++) {
    const z = r.messages[C], A = m + (C + 1) * y, P = M.get(z.from), Y = M.get(z.to);
    if (P == null || Y == null) continue;
    const G = P === Y, rt = Math.min(P, Y), st = Math.max(P, Y), at = Math.max(st - rt, 40), xt = P <= Y ? 0 : at, O = P <= Y ? at : 0, _ = z.arrow.includes("--") || z.arrow === "-.->", W = z.arrow.toLowerCase().includes("x"), Z = z.arrow.includes(">") || z.arrow.includes(")");
    if (G) {
      const $ = P + 6, ot = A - 16, it = 92, Q = 48, ct = _ ? "dashed" : "solid", yt = {
        id: Rt(10),
        type: "shape",
        x: $,
        y: ot,
        w: it,
        h: c,
        z: n(),
        data: {
          shape: "rect",
          stroke: l,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: l,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, J = {
        id: Rt(10),
        type: "shape",
        x: $ + it - c,
        y: ot,
        w: c,
        h: Q,
        z: n(),
        data: {
          shape: "rect",
          stroke: l,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: l,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, dt = {
        id: Rt(10),
        type: "shape",
        x: $,
        y: ot + Q - c,
        w: it,
        h: c,
        z: n(),
        data: {
          shape: Z ? "arrow" : "line",
          stroke: l,
          strokeWidth: c,
          strokeStyle: ct,
          roughness: 0,
          startPoint: [it, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(yt, J, dt);
    } else {
      const $ = {
        id: Rt(10),
        type: "shape",
        x: rt,
        y: A - 14,
        w: at,
        h: 28,
        z: n(),
        data: {
          shape: Z ? "arrow" : "line",
          stroke: l,
          strokeWidth: c,
          strokeStyle: _ ? "dashed" : "solid",
          roughness: 0,
          startPoint: [xt, 14],
          endPoint: [O, 14]
        }
      };
      s.push($);
    }
    const tt = G ? P + 18 : rt, K = G ? 170 : at, H = {
      id: Rt(10),
      type: "text",
      x: tt,
      y: A - 46,
      w: K,
      h: "auto",
      z: n(),
      data: {
        text: z.label,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "center"
      }
    };
    if (s.push(H), W) {
      const $ = P <= Y ? rt + at - 14 : rt + 8, ot = {
        id: Rt(10),
        type: "text",
        x: $,
        y: A - 20,
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
      s.push(ot);
    }
  }
  for (const C of r.notes) {
    const z = m + (C.step + 1) * y, A = M.get(C.note.of);
    if (A == null) continue;
    let P = A;
    C.note.side === "right" && (P += 130), C.note.side === "left" && (P -= 300), C.note.side === "over" && (P -= 110);
    const Y = {
      id: Rt(10),
      type: "text",
      x: P,
      y: z - 8,
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
    s.push(Y);
  }
  return { nodes: s, shapeNodeIds: i };
}
function Kf(t, e, o, n) {
  const r = t.trimStart();
  if (/^sequenceDiagram\b/i.test(r))
    return Vf(t, e, o, n);
  const s = Ff(t), i = jf(s), a = Array.from(s.nodes.values()).map((y) => cr(y.shape)), h = a.length > 0 ? Math.max(...a.map((y) => y.h)) : 96, c = Math.max(h + 130, 260), l = /* @__PURE__ */ new Map(), p = i.length;
  for (let y = 0; y < i.length; y++) {
    const x = i[y], b = x.length, w = (y - (p - 1) / 2) * c, v = x.length > 0 ? Math.max(
      ...x.map((C) => {
        const z = s.nodes.get(C);
        return z ? cr(z.shape).w : 200;
      })
    ) : 200, M = Math.max(v + 90, 260);
    for (let C = 0; C < x.length; C++) {
      const z = x[C], A = (C - (b - 1) / 2) * M;
      if (s.direction === "LR" || s.direction === "RL") {
        const P = s.direction === "LR" ? e + w : e - w, Y = o + A;
        l.set(z, { x: P, y: Y });
      } else {
        const P = e + A, Y = s.direction === "TB" ? o + w : o - w;
        l.set(z, { x: P, y: Y });
      }
    }
  }
  const d = /* @__PURE__ */ new Map(), f = [], g = [], m = /* @__PURE__ */ new Map();
  for (const y of s.groups) {
    if (!y.nodeKeys.length) continue;
    const x = y.nodeKeys.map((z) => {
      const A = s.nodes.get(z), P = l.get(z);
      if (!A || !P) return null;
      const Y = cr(A.shape);
      return { x: P.x - Y.w / 2, y: P.y - Y.h / 2, w: Y.w, h: Y.h };
    }).filter((z) => !!z);
    if (!x.length) continue;
    const b = Math.min(...x.map((z) => z.x)) - 30, w = Math.max(...x.map((z) => z.x + z.w)) + 30, v = Math.min(...x.map((z) => z.y)) - 34, M = Math.max(...x.map((z) => z.y + z.h)) + 24, C = {
      id: Rt(10),
      type: "shape",
      x: b,
      y: v,
      w: w - b,
      h: M - v,
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
    if (f.push(C), g.push(C.id), y.label) {
      const z = {
        id: Rt(10),
        type: "text",
        x: b + 10,
        y: v + 8,
        w: Math.max(120, w - b - 20),
        h: "auto",
        z: n(),
        data: {
          text: y.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      f.push(z);
    }
  }
  for (const [y, x] of s.nodes) {
    const b = l.get(y) ?? { x: e, y: o }, w = cr(x.shape), v = {
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
    f.push(v), g.push(v.id), d.set(y, v.id), m.set(y, { x: v.x, y: v.y, w: w.w, h: w.h });
  }
  for (const y of s.edges) {
    const x = d.get(y.fromKey), b = d.get(y.toKey);
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
        label: y.label,
        style: "solid",
        color: "#64748b",
        strokeWidth: 2,
        arrowHead: "arrow",
        edgeType: "bezier"
      }
    };
    f.push(w);
  }
  return { nodes: f, shapeNodeIds: g };
}
const ga = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function qf({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n
}) {
  const r = ee(), { labels: s } = Jt(), i = pt(null), [a, h] = et(ga), [c, l] = et(null), [p, d] = et(null);
  ei(e && !!n, n, i, [
    a.length,
    c,
    p
  ]), Mt(() => {
    if (!e) return;
    const m = (y) => {
      i.current && !i.current.contains(y.target) && o();
    };
    return document.addEventListener("pointerdown", m), () => document.removeEventListener("pointerdown", m);
  }, [e, o]);
  const f = Ut(
    () => s.mermaidSupportedHint,
    [s.mermaidSupportedHint]
  ), g = lt(() => {
    try {
      const m = window.innerWidth / 2, y = window.innerHeight / 2, x = t.screenToCanvas(m, y), { nodes: b, shapeNodeIds: w } = Kf(a, x.x, x.y, () => t.nextZ());
      if (b.length === 0)
        throw new Error(s.mermaidNoNodesParsed);
      t.addNodes(b), w.length > 0 && t.selectMultiple(w), l(null), d(
        s.mermaidInsertedSummary.replace("{nodes}", String(w.length)).replace("{edges}", String(b.length - w.length))
      );
    } catch (m) {
      d(null), l(m instanceof Error ? m.message : s.mermaidParseFailed);
    }
  }, [t, s.mermaidInsertedSummary, s.mermaidNoNodesParsed, s.mermaidParseFailed, a]);
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
        onPointerDown: (m) => m.stopPropagation(),
        children: [
          /* @__PURE__ */ S("div", { style: { padding: "10px 12px 8px", borderBottom: `1px solid ${r.border}` }, children: [
            /* @__PURE__ */ u("div", { style: { fontSize: 12, fontWeight: 700, color: r.text }, children: s.mermaidSketchTitle }),
            /* @__PURE__ */ u("div", { style: { marginTop: 4, fontSize: 10, color: r.textMuted, lineHeight: 1.45 }, children: f })
          ] }),
          /* @__PURE__ */ S("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ u(
              "textarea",
              {
                value: a,
                onChange: (m) => h(m.target.value),
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
            c && /* @__PURE__ */ u("div", { style: { fontSize: 10, color: "#ef4444" }, children: c }),
            p && /* @__PURE__ */ u("div", { style: { fontSize: 10, color: "#16a34a" }, children: p }),
            /* @__PURE__ */ S("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => h(ga),
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
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: g,
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
const Uf = [
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
], Go = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, Qt = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function jo({ name: t, size: e = 18, textGlyph: o = "T" }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ...Qt })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...Qt }),
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
    t === "note" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...Qt }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...Qt, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...Qt, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...Qt, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...Qt })
    ] }),
    t === "edge" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("circle", { cx: "5", cy: "5", r: "2.5", ...Qt, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ u("circle", { cx: "19", cy: "19", r: "2.5", ...Qt, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "7", x2: "17", y2: "17", ...Qt }),
      /* @__PURE__ */ u("polyline", { points: "14,17 17,17 17,14", ...Qt, fill: "none" })
    ] }),
    t === "erase" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ...Qt })
    ] }),
    t === "laser" && /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ u("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...Qt, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...Qt, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...Qt, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...Qt, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...Qt, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...Qt }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...Qt })
    ] }),
    t === "fit" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...Qt })
    ] }),
    t === "paper" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...Qt }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...Qt, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...Qt, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...Qt, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...Qt }),
      /* @__PURE__ */ u("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...Qt }),
      /* @__PURE__ */ u("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...Qt }),
      /* @__PURE__ */ u("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...Qt })
    ] }),
    t === "library" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M8 7h6", ...Qt, opacity: 0.5 }),
      /* @__PURE__ */ u("path", { d: "M8 11h4", ...Qt, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...Qt }),
      /* @__PURE__ */ u("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ...Qt }),
      /* @__PURE__ */ u("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ...Qt }),
      /* @__PURE__ */ u("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
function Zf({
  engine: t,
  background: e
}) {
  const o = ee(), { labels: n } = Jt(), [r, s] = et(!1), i = {
    light: n.paperGroupLight,
    dark: n.paperGroupDark,
    textured: n.paperGroupTextured
  }, a = {
    "plain-white": n.paperWhite,
    "dot-grid": n.paperCream,
    engineering: n.paperWarm,
    blueprint: n.paperBlueprint,
    "dark-grid": n.paperNight,
    "japanese-stationery": n.paperJapaneseStationery,
    kraft: n.paperKraftPaper
  }, h = pt(null), c = pt(null);
  kl(r, h, c, []), Mt(() => {
    if (!r) return;
    const d = (f) => {
      c.current && !c.current.contains(f.target) && h.current && !h.current.contains(f.target) && s(!1);
    };
    return document.addEventListener("pointerdown", d), () => document.removeEventListener("pointerdown", d);
  }, [r]);
  const l = fn.find((d) => d.key === e) ?? fn[1], p = r && h.current ? (() => {
    const d = h.current.getBoundingClientRect();
    return Ze(
      /* @__PURE__ */ u(
        "div",
        {
          ref: c,
          style: {
            position: "fixed",
            left: d.right + 8,
            top: d.top,
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
            const g = fn.filter((m) => m.group === f);
            return g.length === 0 ? null : /* @__PURE__ */ S("div", { style: { marginBottom: 6 }, children: [
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
              g.map((m) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    t.setBoardBackground(m.key), s(!1);
                  },
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "5px 6px",
                    border: "none",
                    borderRadius: o.controlBorderRadius,
                    background: e === m.key ? o.controlBgActive : "transparent",
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
                          background: m.swatchColor,
                          border: `1.5px solid ${o.border}`,
                          flexShrink: 0
                        }
                      }
                    ),
                    a[m.key] ?? m.label
                  ]
                },
                m.key
              ))
            ] }, f);
          })
        }
      ),
      document.body
    );
  })() : null;
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ S(
      "button",
      {
        ref: h,
        title: n.paperType,
        onClick: () => s((d) => !d),
        style: {
          ...Go,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: r ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ u(jo, { name: "paper" }),
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
                background: l.swatchColor,
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
function Qf({ engine: t }) {
  const e = ee(), { labels: o } = Jt(), [n, r] = et(!1), s = pt(null), i = pt(null);
  kl(n, s, i, []), Mt(() => {
    if (!n) return;
    const h = (c) => {
      i.current && !i.current.contains(c.target) && s.current && !s.current.contains(c.target) && r(!1);
    };
    return document.addEventListener("pointerdown", h), () => document.removeEventListener("pointerdown", h);
  }, [n]);
  const a = n && s.current ? (() => {
    const h = s.current.getBoundingClientRect();
    return Ze(
      /* @__PURE__ */ S(
        "div",
        {
          ref: i,
          style: {
            position: "fixed",
            left: h.right + 8,
            top: h.top,
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
            Ra.map((c) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => {
                  const l = typeof window < "u" ? window : void 0;
                  if (!l) return;
                  const p = l.innerWidth / 2, d = l.innerHeight / 2, f = pn(t.viewport, p, d);
                  t.applyTemplate(c.id, f.x, f.y), r(!1);
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
                onMouseEnter: (l) => {
                  l.currentTarget.style.background = e.controlBgActive;
                },
                onMouseLeave: (l) => {
                  l.currentTarget.style.background = "transparent";
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
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: s,
        title: o.templatesTitle,
        onClick: () => r((h) => !h),
        style: {
          ...Go,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: n ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(jo, { name: "template" })
      }
    ),
    a
  ] });
}
function Jf({ engine: t }) {
  const e = ee(), { labels: o } = Jt(), [n, r] = et(!1), [s, i] = et(!1), a = pt(null), [h, c] = et(null), l = lt(() => {
    r((f) => (!f && a.current && c(a.current.getBoundingClientRect()), !f));
  }, []), p = lt(() => r(!1), []), d = lt(() => {
    i(!0);
  }, []);
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: a,
        title: o.librariesTitle,
        onClick: l,
        style: {
          ...Go,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: n ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(jo, { name: "library" })
      }
    ),
    /* @__PURE__ */ u(
      lp,
      {
        engine: t,
        open: n,
        onClose: p,
        triggerRect: h,
        onBrowseDirectory: d
      }
    ),
    s && /* @__PURE__ */ u(
      Ef,
      {
        onClose: () => i(!1),
        onInstalled: () => {
          r(!1), setTimeout(() => {
            a.current && c(a.current.getBoundingClientRect()), r(!0);
          }, 100);
        }
      }
    )
  ] });
}
function $f({ engine: t, baseUrl: e }) {
  const o = ee(), { labels: n } = Jt(), [r, s] = et(!1), i = pt(null), [a, h] = et(null), c = lt(() => {
    s((p) => (!p && i.current && h(i.current.getBoundingClientRect()), !p));
  }, []), l = lt(() => s(!1), []);
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: i,
        title: n.gifSearchTitle,
        onClick: c,
        style: {
          ...Go,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: r ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ u(jo, { name: "gif" })
      }
    ),
    /* @__PURE__ */ u(
      up,
      {
        engine: t,
        open: r,
        onClose: l,
        triggerRect: a,
        baseUrl: e
      }
    )
  ] });
}
function _f({ engine: t }) {
  const e = ee(), { labels: o } = Jt(), [n, r] = et(!1), s = pt(null), [i, a] = et(null), h = lt(() => {
    r((l) => (!l && s.current && a(s.current.getBoundingClientRect()), !l));
  }, []), c = lt(() => r(!1), []);
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: s,
        title: o.mermaidSketchTitle,
        onClick: h,
        style: {
          ...Go,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: n ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(jo, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ u(
      qf,
      {
        engine: t,
        open: n,
        onClose: c,
        triggerRect: i
      }
    )
  ] });
}
function ty({ engine: t, gifApiBaseUrl: e }) {
  const o = ee(), { labels: n } = Jt(), [r, s] = et(t.mode), [i, a] = et(t.boardBackground), [h, c] = et(t.lassoSelect);
  Mt(() => {
    const p = () => s(t.mode), d = () => a(t.boardBackground), f = () => c(t.lassoSelect);
    return t.on("mode", p), t.on("background", d), t.on("lassoToggle", f), () => {
      t.off("mode", p), t.off("background", d), t.off("lassoToggle", f);
    };
  }, [t]);
  const l = Uf.map((p) => ({
    ...p,
    label: p.key === "select" ? n.toolSelect : p.key === "hand" ? n.toolHand : p.key === "draw" ? n.toolDraw : p.key === "shape" ? n.toolShape : p.key === "text" ? n.toolText : p.key === "note" ? n.toolNote : p.key === "sticky" ? n.toolSticky : p.key === "frame" ? n.toolFrame : p.key === "erase" ? n.toolEraser : n.toolLaser
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
        l.map((p) => {
          const d = r === p.key && !(p.key === "select" && h);
          return /* @__PURE__ */ S(
            "button",
            {
              title: `${p.label} (${p.shortcut}${p.num ? ` / ${p.num}` : ""})`,
              onClick: () => {
                h && (t.toggleLassoSelect(), c(!1)), t.setMode(p.key);
              },
              style: {
                ...Go,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: d ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ u(jo, { name: p.key, textGlyph: n.toolTextGlyph }),
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
        /* @__PURE__ */ S(
          "button",
          {
            title: `${n.toolLassoSelect} (L)`,
            onClick: () => {
              h ? (t.toggleLassoSelect(), c(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), c(!0));
            },
            style: {
              ...Go,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: h ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ u(jo, { name: "lasso" }),
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
        /* @__PURE__ */ u(Zf, { engine: t, background: i }),
        /* @__PURE__ */ u(Qf, { engine: t }),
        /* @__PURE__ */ u(Jf, { engine: t }),
        /* @__PURE__ */ u(_f, { engine: t }),
        e && /* @__PURE__ */ u($f, { engine: t, baseUrl: e })
      ]
    }
  );
}
const ey = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), oy = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function ma(t) {
  return t.data.opacity ?? 1;
}
function rn(t, e) {
  return t.data[e];
}
function ny(t) {
  const e = {}, o = t.filter((r) => ey.has(r.type));
  if (o.length > 0) {
    const r = ma(o[0]), s = o.every((i) => ma(i) === r);
    e.opacity = s ? r : "mixed";
  }
  const n = t.filter((r) => oy.has(r.type));
  if (n.length > 0) {
    const r = rn(n[0], "borderColor"), s = n.every(
      (l) => rn(l, "borderColor") === r
    );
    e.borderColor = s ? r ?? null : "mixed";
    const i = rn(n[0], "borderWidth") ?? 1, a = n.every(
      (l) => (rn(l, "borderWidth") ?? 1) === i
    );
    e.borderWidth = a ? i : "mixed";
    const h = rn(n[0], "borderStyle") ?? "solid", c = n.every(
      (l) => (rn(l, "borderStyle") ?? "solid") === h
    );
    e.borderStyle = c ? h : "mixed";
  }
  return e;
}
function ry(t) {
  const [e, o] = et(t.mode), [n, r] = et(new Set(t.selection)), [, s] = et(0);
  if (Mt(() => {
    const l = () => o(t.mode), p = () => {
      r(new Set(t.selection)), s((f) => f + 1);
    }, d = () => s((f) => f + 1);
    return t.on("mode", l), t.on("selection", p), t.on("change", d), () => {
      t.off("mode", l), t.off("selection", p), t.off("change", d);
    };
  }, [t]), n.size === 0)
    return e === "draw" || e === "shape" || e === "text" || e === "edge" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
  const i = [];
  for (const l of n) {
    const p = t.getNode(l);
    p && i.push(p);
  }
  if (i.length === 0)
    return { target: { kind: "none" }, commonProps: {} };
  if (i.length === 1)
    return { target: { kind: "single", node: i[0] }, commonProps: {} };
  const a = /* @__PURE__ */ new Map();
  for (const l of i) {
    const p = a.get(l.type);
    p ? p.push(l) : a.set(l.type, [l]);
  }
  const h = [];
  for (const [l, p] of a)
    h.push({ type: l, nodes: p });
  const c = ny(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: h },
    commonProps: c
  };
}
const On = vr(null);
function Qe(t, e) {
  const o = Ke(On), n = Ke(mn);
  return lt(
    (r) => {
      const s = n == null ? void 0 : n(), i = {
        ...e.data,
        ...r
      };
      if (s) {
        if (o && o.length > 1) {
          const a = o.map((h) => ({
            id: h.id,
            patch: {
              data: { ...h.data, ...r }
            }
          }));
          t.batchUpdateWithHistoryCoalesced(a, s);
        } else
          t.updateNodeWithHistoryCoalesced(
            e.id,
            { data: i },
            s
          );
        return;
      }
      if (o && o.length > 1) {
        const a = o.map((h) => ({
          id: h.id,
          patch: {
            data: { ...h.data, ...r }
          }
        }));
        t.batchUpdateWithHistory(a);
      } else
        t.updateNodeWithHistory(e.id, {
          data: i
        });
    },
    [t, e, o, n]
  );
}
function Ge({
  value: t,
  onChange: e,
  mixed: o
}) {
  const n = ee(), { labels: r } = Jt(), s = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ S("div", { style: Ot, children: [
    /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorOpacity }),
    /* @__PURE__ */ u(
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
    /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10, color: o ? n.textFaint : n.text }, children: o ? "--" : s })
  ] });
}
const sy = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function Ae({
  label: t,
  palettes: e,
  value: o,
  onChange: n,
  allowNull: r,
  mixed: s
}) {
  const i = ee(), { labels: a } = Jt(), [h, c] = et(""), [l, p] = et(0), [d, f] = et(!1), g = pt(null), m = pt(null), [y, x] = et(null), [b, w] = et("bottom"), v = e[l] ?? e[0], M = v.name === "Standard" ? a.paletteStandard : v.name, C = o == null ? void 0 : o.toLowerCase();
  Mt(() => {
    if (!d) return;
    const P = (Y) => {
      g.current && !g.current.contains(Y.target) && f(!1);
    };
    return document.addEventListener("mousedown", P), () => document.removeEventListener("mousedown", P);
  }, [d]), Mt(() => {
    if (!d) return;
    const P = () => {
      const Y = m.current;
      if (!Y) return;
      const G = Y.getBoundingClientRect(), st = e.length * 30 + 10, at = window.innerHeight - G.bottom, xt = G.top, O = at < st && xt > at;
      w(O ? "top" : "bottom"), x({
        top: O ? G.top - 4 : G.bottom + 4,
        left: G.right
      });
    };
    return P(), window.addEventListener("resize", P), window.addEventListener("scroll", P, !0), () => {
      window.removeEventListener("resize", P), window.removeEventListener("scroll", P, !0);
    };
  }, [d]);
  const z = () => {
    const P = h.trim();
    if (!P) return;
    const Y = P.startsWith("#") ? P : `#${P}`;
    sy.test(Y) && (n(Y), c(""));
  }, A = e.some(
    (P) => P.colors.some((Y) => Y.toLowerCase() === C)
  );
  return /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 }, children: [
    /* @__PURE__ */ u("span", { style: { ...Ht, color: i.textMuted, paddingTop: 2 }, children: t }),
    /* @__PURE__ */ S("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }, children: [
        r && /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n(null),
            title: a.inspectorNone,
            style: {
              ...ne,
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
        v.colors.map((P) => {
          const Y = !s && C === P.toLowerCase();
          return /* @__PURE__ */ u(
            "button",
            {
              onClick: () => n(P),
              style: {
                ...ne,
                width: 20,
                height: 20,
                background: P,
                border: Y ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
                borderRadius: "50%"
              }
            },
            P
          );
        }),
        o && !A && !s && /* @__PURE__ */ u(
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
      e.length > 1 && /* @__PURE__ */ u("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ S("div", { ref: m, style: { position: "relative" }, children: [
        /* @__PURE__ */ S(
          "button",
          {
            onClick: () => f((P) => !P),
            title: a.inspectorSwitchPalette,
            style: {
              ...ne,
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
              /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: d ? "▲" : "▼" })
            ]
          }
        ),
        d && y && Ze(
          /* @__PURE__ */ u(
            "div",
            {
              ref: g,
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
              children: e.map((P, Y) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    p(Y), f(!1);
                  },
                  style: {
                    ...ne,
                    height: 28,
                    padding: "0 8px",
                    background: Y === l ? i.controlBgActive : "transparent",
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
                    /* @__PURE__ */ u("span", { style: { display: "flex", gap: 2 }, children: P.colors.slice(0, 6).map((G) => /* @__PURE__ */ u(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: G,
                          display: "inline-block"
                        }
                      },
                      G
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
          value: h,
          onChange: (P) => c(P.target.value),
          onKeyDown: (P) => {
            P.key === "Enter" && z();
          },
          onBlur: z,
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
function Vo({
  label: t,
  value: e,
  onChange: o,
  mixed: n
}) {
  const r = ee();
  return /* @__PURE__ */ S("div", { style: Ot, children: [
    /* @__PURE__ */ u("span", { style: { ...Ht, color: r.textMuted }, children: t }),
    If.map((s) => /* @__PURE__ */ u(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...ne,
          width: 36,
          height: 28,
          background: !n && e === s.key ? r.controlBgActive : r.controlBg,
          borderRadius: r.controlBorderRadius
        },
        children: /* @__PURE__ */ u("svg", { width: 24, height: 12, children: /* @__PURE__ */ u(
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
function Ko({
  label: t,
  widths: e = zf,
  value: o,
  onChange: n,
  mixed: r
}) {
  const s = ee();
  return /* @__PURE__ */ S("div", { style: Ot, children: [
    /* @__PURE__ */ u("span", { style: { ...Ht, color: s.textMuted }, children: t }),
    /* @__PURE__ */ u("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }, children: e.map((i) => /* @__PURE__ */ u(
      "button",
      {
        title: `${i}px`,
        onClick: () => n(i),
        style: {
          ...ne,
          width: 30,
          height: 24,
          background: !r && o === i ? s.controlBgActive : s.controlBg,
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
function Xn({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: n,
  onChange: r
}) {
  const { labels: s } = Jt();
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      Ae,
      {
        label: s.inspectorBorder,
        palettes: Oe,
        value: t,
        onChange: (i) => r("borderColor", i ?? void 0),
        allowNull: !0,
        mixed: n == null ? void 0 : n.color
      }
    ),
    (t || (n == null ? void 0 : n.color)) && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u(
        Vo,
        {
          label: s.inspectorStyle,
          value: e ?? "solid",
          onChange: (i) => r("borderStyle", i),
          mixed: n == null ? void 0 : n.style
        }
      ),
      /* @__PURE__ */ u(
        Ko,
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
const as = /* @__PURE__ */ new Map();
function Ee({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: n,
  onToggle: r,
  persistKey: s,
  children: i
}) {
  const a = ee(), [h, c] = et(() => s && as.has(s) ? !!as.get(s) : e), l = n ?? h, p = o === "group", d = pt(null), [f, g] = et(0);
  return Mt(() => {
    !s || n !== void 0 || as.set(s, l);
  }, [s, n, l]), Io(() => {
    const m = d.current;
    if (!m) return;
    const y = () => g(m.scrollHeight);
    y();
    const x = new ResizeObserver(() => y());
    return x.observe(m), () => x.disconnect();
  }, [i]), /* @__PURE__ */ S(
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
        /* @__PURE__ */ S(
          "button",
          {
            type: "button",
            onClick: () => {
              r ? r() : c((m) => !m);
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
                    transform: l ? "rotate(90deg)" : "rotate(0deg)",
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
              maxHeight: l ? f : 0,
              opacity: l ? 1 : 0,
              transition: "max-height 200ms ease, opacity 140ms ease",
              overflow: "hidden",
              pointerEvents: l ? "auto" : "none"
            },
            children: /* @__PURE__ */ u(
              "div",
              {
                ref: d,
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
function ci({ style: t }) {
  const e = ee();
  return t === "hachure" ? /* @__PURE__ */ S("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ S("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: e.text, strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ u("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ u("rect", { x: 2, y: 2, width: 16, height: 12, fill: e.text, rx: 2 }) });
}
const iy = /* @__PURE__ */ S("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ u("path", { d: "m21 21-4.35-4.35" })
] });
function Lr({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: n
}) {
  var x, b;
  const r = ee(), [s, i] = et(!1), [a, h] = et(""), c = pt(null), l = pt(null), p = pt(null), d = a.trim().toLowerCase(), f = Ut(
    () => o.filter((w) => w.toLowerCase().includes(d)),
    [o, d]
  ), g = Ut(
    () => dr.filter(
      (w) => !o.includes(w.key) && (w.key.toLowerCase().includes(d) || w.label.toLowerCase().includes(d))
    ),
    [o, d]
  );
  Io(() => {
    if (!s || !p.current) return;
    const w = p.current, v = w.ownerDocument.defaultView ?? window, M = 260, C = 16, z = () => {
      var at;
      const P = (at = l.current) == null ? void 0 : at.getBoundingClientRect();
      if (!P) return;
      let Y = P.left;
      Y + M > v.innerWidth - C && (Y = v.innerWidth - M - C), Y < C && (Y = C);
      const G = P.bottom + 4, rt = w.getBoundingClientRect(), st = xl(Y, G, rt.width, rt.height, v, C);
      w.style.left = `${st.left}px`, w.style.top = `${st.top}px`;
    };
    z();
    const A = new ResizeObserver(z);
    return A.observe(w), () => A.disconnect();
  }, [s, a, f.length, g.length]), Mt(() => {
    var M;
    if (!s) return;
    const w = (C) => {
      var Y, G;
      const z = C.target;
      if ((Y = c.current) != null && Y.contains(z)) return;
      const P = (((G = c.current) == null ? void 0 : G.ownerDocument) ?? document).getElementById("font-picker-popover");
      P != null && P.contains(z) || i(!1);
    }, v = ((M = c.current) == null ? void 0 : M.ownerDocument) ?? document;
    return v.addEventListener("mousedown", w), () => v.removeEventListener("mousedown", w);
  }, [s]);
  const m = (w) => {
    e(w), i(!1), h("");
  }, y = (w, v) => {
    const M = (v == null ? void 0 : v.label) ?? w, C = v == null ? void 0 : v.category, z = t === w;
    return /* @__PURE__ */ S(
      "button",
      {
        type: "button",
        onClick: () => m(w),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: z ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: ko(w),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (A) => {
          z || (A.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (A) => {
          z || (A.currentTarget.style.background = "transparent");
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
              children: hd(C)
            }
          ),
          /* @__PURE__ */ u("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: M })
        ]
      },
      w
    );
  };
  return /* @__PURE__ */ S("div", { ref: c, style: { position: "relative", flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ S(
      "button",
      {
        ref: l,
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
          fontFamily: ko(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...n
        },
        children: [
          /* @__PURE__ */ u("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((x = dr.find((w) => w.key === t)) == null ? void 0 : x.label) ?? t }),
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
    s && Ze(
      /* @__PURE__ */ S(
        "div",
        {
          ref: p,
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
                  /* @__PURE__ */ u("span", { style: { color: "#64748b", display: "flex" }, children: iy }),
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "text",
                      placeholder: "Quick search",
                      value: a,
                      onChange: (w) => h(w.target.value),
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
              f.length > 0 && /* @__PURE__ */ S("div", { style: { marginBottom: 12 }, children: [
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
                f.map((w) => y(w, dr.find((v) => v.key === w)))
              ] }),
              /* @__PURE__ */ S("div", { children: [
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
                g.length > 0 ? g.map((w) => y(w.key, w)) : /* @__PURE__ */ u(
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
      (((b = c.current) == null ? void 0 : b.ownerDocument) ?? document).body
    )
  ] });
}
function di({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "sharp" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", ...o }),
    t === "round" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4", ...o })
  ] });
}
const ay = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], ly = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function cy({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function Wo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((n) => e(n) === o);
}
function dy({ engine: t, node: e, fontsInScene: o }) {
  const n = ee(), { labels: r } = Jt(), s = Qe(t, e), i = Ke(On) ?? [e], { data: a } = e, h = a.fill ?? null, c = a.fillStyle ?? "hachure", l = a.strokeStyle ?? "solid", p = Wo(i, (b) => b.data.stroke), d = Wo(i, (b) => b.data.fill ?? null), f = Wo(i, (b) => b.data.fillStyle ?? "hachure"), g = Wo(i, (b) => b.data.strokeStyle ?? "solid"), m = Wo(i, (b) => b.data.strokeWidth), y = Wo(i, (b) => b.data.roughness), x = Wo(i, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ S(Ee, { title: r.inspectorStructure, persistKey: "shape.structure", children: [
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorShape }),
        ly.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => s({ shape: b.key }),
            style: {
              ...ne,
              width: 28,
              height: 28,
              background: a.shape === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ u(cy, { name: b.key })
          },
          b.key
        ))
      ] }),
      (a.shape === "rect" || a.shape === "diamond") && /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorEdges }),
        [
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" }
        ].map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => s({ edgeStyle: b.key === "sharp" ? void 0 : b.key }),
            style: {
              ...ne,
              width: 28,
              height: 28,
              background: (a.edgeStyle ?? "sharp") === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ u(di, { name: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorLabel }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "text",
            value: a.label ?? "",
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
    a.label && /* @__PURE__ */ S(Ee, { title: r.inspectorTypography, defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorFont }),
        /* @__PURE__ */ u(
          Lr,
          {
            value: a.labelFontFamily ?? "Excalifont",
            onChange: (b) => s({ labelFontFamily: b === "Excalifont" ? void 0 : b }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorSize }),
        ay.map((b) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => s({ labelFontSize: b.size === 14 ? void 0 : b.size }),
            style: {
              ...ne,
              width: 36,
              height: 28,
              background: (a.labelFontSize ?? 14) === b.size ? n.controlBgActive : n.controlBg,
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
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorAlign }),
        ai.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.key,
            onClick: () => s({ labelAlign: b.key === "center" ? void 0 : b.key }),
            style: {
              ...ne,
              width: 36,
              height: 28,
              background: (a.labelAlign ?? "center") === b.key ? n.controlBgActive : n.controlBg,
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
      /* @__PURE__ */ u(
        Ae,
        {
          label: r.inspectorStroke,
          palettes: Oe,
          value: p ? void 0 : a.stroke,
          mixed: p,
          onChange: (b) => s({ stroke: b })
        }
      ),
      /* @__PURE__ */ u(
        Ae,
        {
          label: r.inspectorFill,
          palettes: li,
          value: d ? void 0 : h,
          mixed: d,
          onChange: (b) => s({ fill: b ?? void 0 }),
          allowNull: !0
        }
      ),
      h && !d && /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorFillPattern }),
        si.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => s({ fillStyle: b.key }),
            style: {
              ...ne,
              width: 36,
              height: 28,
              background: !f && c === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 9,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ u(ci, { style: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ u(
        Vo,
        {
          label: r.inspectorStrokeStyle,
          value: l,
          mixed: g,
          onChange: (b) => s({ strokeStyle: b })
        }
      ),
      /* @__PURE__ */ u(
        Ko,
        {
          label: r.inspectorStrokeWidth,
          widths: ii,
          value: a.strokeWidth,
          mixed: m,
          onChange: (b) => s({ strokeWidth: b })
        }
      ),
      /* @__PURE__ */ u(
        Ge,
        {
          value: a.opacity ?? 1,
          mixed: x,
          onChange: (b) => s({ opacity: b })
        }
      )
    ] }),
    /* @__PURE__ */ u(Ee, { title: r.inspectorSketch, defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorRoughness }),
      kr.map((b) => {
        const w = b.value === 0 ? r.roughnessArchitect : b.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
        return /* @__PURE__ */ u(
          "button",
          {
            title: w,
            onClick: () => s({ roughness: b.value }),
            style: {
              ...ne,
              height: 28,
              padding: "0 8px",
              background: !y && a.roughness === b.value ? n.controlBgActive : n.controlBg,
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
function hy({ engine: t, node: e }) {
  const o = ee(), { labels: n } = Jt(), r = Qe(t, e), s = Ke(On) ?? [e], { data: i } = e, a = i.fill ?? null, h = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", l = sn(s, (y) => y.data.color), p = sn(s, (y) => y.data.fill ?? null), d = sn(s, (y) => y.data.fillStyle ?? "hachure"), f = sn(s, (y) => y.data.strokeStyle ?? "solid"), g = sn(s, (y) => y.data.strokeWidth), m = sn(s, (y) => y.data.opacity ?? 1);
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      Ae,
      {
        label: n.inspectorStroke,
        palettes: Oe,
        value: l ? void 0 : i.color,
        mixed: l,
        onChange: (y) => r({ color: y })
      }
    ),
    /* @__PURE__ */ u(
      Ae,
      {
        label: n.inspectorFill,
        palettes: li,
        value: p ? void 0 : a,
        mixed: p,
        onChange: (y) => r({ fill: y ?? void 0 }),
        allowNull: !0
      }
    ),
    a && !p && /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.inspectorFillPattern }),
      si.map((y) => /* @__PURE__ */ u(
        "button",
        {
          title: y.label,
          onClick: () => r({ fillStyle: y.key }),
          style: {
            ...ne,
            width: 36,
            height: 28,
            background: !d && h === y.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(ci, { style: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Vo,
      {
        label: n.inspectorStrokeStyle,
        value: c,
        mixed: f,
        onChange: (y) => r({ strokeStyle: y })
      }
    ),
    /* @__PURE__ */ u(
      Ko,
      {
        label: n.inspectorStrokeWidth,
        widths: Vl,
        value: i.strokeWidth,
        mixed: g,
        onChange: (y) => r({ strokeWidth: y })
      }
    ),
    /* @__PURE__ */ u(
      Ge,
      {
        value: i.opacity ?? 1,
        mixed: m,
        onChange: (y) => r({ opacity: y })
      }
    )
  ] });
}
function uy({ engine: t, node: e, fontsInScene: o }) {
  const n = ee(), { labels: r } = Jt(), s = Qe(t, e), { data: i } = e;
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ S(Ee, { title: r.inspectorTypography, persistKey: "text.typography", children: [
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorFont }),
        /* @__PURE__ */ u(
          Lr,
          {
            value: i.fontFamily,
            onChange: (a) => s({ fontFamily: a }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorSize }),
        ql.map((a) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => s({ fontSize: a }),
            style: {
              ...ne,
              width: 36,
              height: 28,
              background: i.fontSize === a ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 10,
              borderRadius: n.controlBorderRadius
            },
            children: a
          },
          a
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorAlign }),
        ai.map((a) => /* @__PURE__ */ u(
          "button",
          {
            title: a.key,
            onClick: () => s({ align: a.key }),
            style: {
              ...ne,
              width: 36,
              height: 28,
              background: i.align === a.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 12,
              borderRadius: n.controlBorderRadius
            },
            children: a.label
          },
          a.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ S(Ee, { title: r.inspectorAppearance, persistKey: "text.appearance", children: [
      /* @__PURE__ */ u(
        Ae,
        {
          label: r.inspectorStroke,
          palettes: Oe,
          value: i.color,
          onChange: (a) => s({ color: a })
        }
      ),
      /* @__PURE__ */ u(
        Xn,
        {
          borderColor: i.borderColor ?? null,
          borderStyle: i.borderStyle,
          borderWidth: i.borderWidth,
          onChange: (a, h) => s({ [a]: h })
        }
      ),
      /* @__PURE__ */ u(
        Ge,
        {
          value: i.opacity ?? 1,
          onChange: (a) => s({ opacity: a })
        }
      )
    ] })
  ] });
}
const ba = { top: 0, right: 0.25, bottom: 0.5, left: 0.75 }, py = [[0, "top"], [0.25, "right"], [0.5, "bottom"], [0.75, "left"]];
function xa(t) {
  let e = "top", o = 1 / 0;
  for (const [n, r] of py) {
    const s = Math.min(Math.abs(t - n), Math.abs(t - n - 1), Math.abs(t - n + 1));
    s < o && (o = s, e = r);
  }
  return e;
}
const fy = ["forward"], yy = ["forward", "reverse", "both", "bop"];
function gy({ engine: t, node: e }) {
  const o = ee(), { labels: n } = Jt(), r = Qe(t, e), s = Ke(On), { data: i } = e, a = !!(i.sourcePort && i.targetPort), h = a ? fy : yy, c = Ut(() => !(s != null && s.length) || !s.every((l) => l.type === "edge") ? null : [...s].map((l) => l.id).sort().join("|"), [s]);
  return Mt(() => {
    const l = c !== null ? c.split("|") : [e.id];
    for (const p of l) {
      const d = t.getNode(p);
      if (!d || d.type !== "edge") continue;
      const f = d.data;
      !f.sourcePort || !f.targetPort || !f.animated || (f.animatedDirection ?? "forward") !== "forward" && t.updateNode(p, { data: { ...f, animatedDirection: "forward" } });
    }
  }, [t, c, e.id]), /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ S(Ee, { title: n.edgeLineSection, persistKey: "edge.line", children: [
      /* @__PURE__ */ u(
        Ae,
        {
          label: n.edgeColor,
          palettes: Oe,
          value: i.color,
          onChange: (l) => r({ color: l })
        }
      ),
      /* @__PURE__ */ u(
        Vo,
        {
          label: n.inspectorStyle,
          value: i.style,
          onChange: (l) => r({ style: l })
        }
      ),
      /* @__PURE__ */ u(
        Ko,
        {
          label: n.inspectorWidth,
          widths: Kl,
          value: i.strokeWidth,
          onChange: (l) => r({ strokeWidth: l })
        }
      ),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: "Connect" }),
        ["fixed", "free"].map((l) => {
          const p = i.sourceT !== void 0 || i.targetT !== void 0;
          return /* @__PURE__ */ u(
            "button",
            {
              onClick: () => {
                l === "free" && !p ? r({
                  sourceT: i.sourceHandle ? ba[i.sourceHandle] : 0,
                  targetT: i.targetHandle ? ba[i.targetHandle] : 0.5,
                  sourceHandle: void 0,
                  targetHandle: void 0
                }) : l === "fixed" && p && r({
                  sourceHandle: i.sourceT !== void 0 ? xa(i.sourceT) : "right",
                  targetHandle: i.targetT !== void 0 ? xa(i.targetT) : "left",
                  sourceT: void 0,
                  targetT: void 0
                });
              },
              style: {
                ...ne,
                height: 28,
                padding: "0 8px",
                background: (l === "free" ? p : !p) ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 10,
                borderRadius: o.controlBorderRadius
              },
              children: l === "fixed" ? "Fixed" : "Free"
            },
            l
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ S(Ee, { title: n.edgeArrowsSection, persistKey: "edge.arrows", children: [
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((l) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => r({ arrowHead: l }),
            style: {
              ...ne,
              height: 28,
              padding: "0 6px",
              background: (i.arrowHead ?? "none") === l ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: l === "none" ? n.inspectorNone : l === "arrow" ? "▷" : l === "filled" ? "▶" : "●"
          },
          l
        ))
      ] }),
      (i.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.edgeHeadSize }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: i.arrowHeadSize ?? Math.max(8, i.strokeWidth * 3),
            onChange: (l) => r({ arrowHeadSize: Number(l.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ u("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: i.arrowHeadSize ?? Math.max(8, i.strokeWidth * 3) })
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((l) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => r({ arrowTail: l }),
            style: {
              ...ne,
              height: 28,
              padding: "0 6px",
              background: (i.arrowTail ?? "none") === l ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: l === "none" ? n.inspectorNone : l === "arrow" ? "◁" : l === "filled" ? "◀" : "●"
          },
          l
        ))
      ] }),
      (i.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.edgeTailSize }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: i.arrowTailSize ?? Math.max(8, i.strokeWidth * 3),
            onChange: (l) => r({ arrowTailSize: Number(l.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ u("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: i.arrowTailSize ?? Math.max(8, i.strokeWidth * 3) })
      ] })
    ] }),
    /* @__PURE__ */ S(Ee, { title: n.edgePathMotionSection, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.edgePath }),
        [
          { key: "bezier", label: n.edgeBezier },
          { key: "straight", label: n.edgeStraight },
          { key: "smoothstep", label: n.edgeSmooth },
          { key: "step", label: n.edgeStep }
        ].map((l) => /* @__PURE__ */ u(
          "button",
          {
            title: l.label,
            onClick: () => r({ edgeType: l.key }),
            style: {
              ...ne,
              height: 28,
              padding: "0 6px",
              background: (i.edgeType ?? "bezier") === l.key ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 9,
              borderRadius: o.controlBorderRadius
            },
            children: l.label
          },
          l.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.edgeAnimate }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: () => r({ animated: !i.animated }),
            style: {
              ...ne,
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
        /* @__PURE__ */ S("div", { style: Ot, children: [
          /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.edgeDirection }),
          h.map((l) => /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => r({ animatedDirection: l }),
              style: {
                ...ne,
                height: 28,
                padding: "0 6px",
                background: (i.animatedDirection ?? "forward") === l ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 10,
                borderRadius: o.controlBorderRadius
              },
              children: l === "forward" ? "→" : l === "reverse" ? "←" : l === "both" ? "⇆" : "~"
            },
            l
          ))
        ] }),
        a && /* @__PURE__ */ u(
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
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.inspectorRoughness }),
        kr.map((l) => {
          const p = l.value === 0 ? n.roughnessArchitect : l.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
          return /* @__PURE__ */ u(
            "button",
            {
              title: p,
              onClick: () => r({ roughness: l.value }),
              style: {
                ...ne,
                height: 28,
                padding: "0 8px",
                background: (i.roughness ?? 0) === l.value ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 9,
                borderRadius: o.controlBorderRadius
              },
              children: p
            },
            l.value
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ u(Ee, { title: n.inspectorLabel, defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.edgeText }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          value: i.label ?? "",
          onChange: (l) => r({ label: l.target.value || void 0 }),
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
function my({ engine: t, node: e }) {
  const o = ee(), { labels: n } = Jt(), r = Qe(t, e), { data: s } = e, i = !!s.crop;
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      Xn,
      {
        borderColor: s.borderColor ?? null,
        borderStyle: s.borderStyle,
        borderWidth: s.borderWidth,
        onChange: (a, h) => r({ [a]: h })
      }
    ),
    /* @__PURE__ */ S("div", { style: { ...Ot, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.inspectorCrop }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => t.requestImageCrop(e.id),
          style: {
            ...ne,
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
      i && /* @__PURE__ */ u(
        "button",
        {
          onClick: () => r({ crop: void 0 }),
          style: {
            ...ne,
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
    /* @__PURE__ */ u(
      Ge,
      {
        value: s.opacity ?? 1,
        onChange: (a) => r({ opacity: a })
      }
    )
  ] });
}
function by({ engine: t, node: e }) {
  const o = ee(), n = Qe(t, e), { data: r } = e;
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      Xn,
      {
        borderColor: r.borderColor ?? null,
        borderStyle: r.borderStyle,
        borderWidth: r.borderWidth,
        onChange: (s, i) => n({ [s]: i })
      }
    ),
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ u(
        "button",
        {
          title: s.label,
          onClick: () => n({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...ne,
            width: 28,
            height: 28,
            background: (r.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(di, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Ge,
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
}, xy = bf();
function wy({
  value: t,
  onChange: e,
  theme: o,
  durationLabel: n,
  msLabel: r
}) {
  const [s, i] = et(String(t));
  Mt(() => i(String(t)), [t]);
  const a = () => {
    const h = parseInt(s, 10);
    !isNaN(h) && h >= 100 && h <= 5e3 ? e(h) : i(String(t));
  };
  return /* @__PURE__ */ S("div", { style: Ot, children: [
    /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n }),
    /* @__PURE__ */ u(
      "input",
      {
        type: "number",
        min: 100,
        max: 5e3,
        step: 50,
        value: s,
        onChange: (h) => i(h.target.value),
        onBlur: a,
        onKeyDown: (h) => {
          h.key === "Enter" && a();
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
    /* @__PURE__ */ u("span", { style: { fontSize: 10, color: o.textMuted }, children: r })
  ] });
}
function ky({ engine: t, node: e }) {
  const o = ee(), { labels: n } = Jt(), r = Qe(t, e), s = Ke(mn), { data: i } = e, a = lt(
    (p) => {
      var b;
      if (!p) {
        r({ devicePreset: void 0 });
        return;
      }
      const d = Bs(p);
      if (!d) return;
      const f = jl(d), g = Math.round(e.w / f), m = { devicePreset: p };
      (!i.label || ((b = Bs(i.devicePreset ?? "")) == null ? void 0 : b.label) === i.label) && (m.label = d.label);
      const y = { ...e.data, ...m }, x = s == null ? void 0 : s();
      x ? t.updateNodeWithHistoryCoalesced(
        e.id,
        { h: g, data: y },
        x
      ) : t.updateNodeWithHistory(e.id, {
        h: g,
        data: y
      });
    },
    [t, e, i.label, i.devicePreset, r, s]
  ), h = Ut(() => {
    const p = t.getAllNodes().filter((y) => y.type === "frame"), d = p.length, f = /* @__PURE__ */ new Set();
    for (const y of p)
      y.id !== e.id && y.data.slideOrder != null && f.add(y.data.slideOrder);
    const g = [];
    for (let y = 1; y <= d; y++)
      f.has(y) || g.push(y);
    const m = e.data.slideOrder;
    return m != null && !g.includes(m) && (g.push(m), g.sort((y, x) => y - x)), g;
  }, [t, e]), c = {
    pan: n.transitionPan,
    fade: n.transitionFadeToBlack,
    dissolve: n.transitionDissolve,
    zoom: n.transitionZoom,
    fold: n.transitionFold,
    cube: n.transitionCube,
    none: n.transitionNoneInstant
  }, l = {
    Phones: n.deviceGroupPhones,
    "Phones (Landscape)": n.deviceGroupPhonesLandscape,
    Tablets: n.deviceGroupTablets,
    "Tablets (Landscape)": n.deviceGroupTabletsLandscape,
    Devices: n.deviceGroupDevices,
    Standard: n.deviceGroupStandard
  };
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.inspectorLabel }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          value: i.label ?? "",
          onChange: (p) => r({ label: p.target.value || void 0 }),
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
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.frameDevice }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.devicePreset ?? "",
          onChange: (p) => a(p.target.value),
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
            /* @__PURE__ */ u("option", { value: "", children: n.frameFreeform }),
            xy.map((p) => /* @__PURE__ */ u("optgroup", { label: l[p.label] ?? p.label, children: p.presets.map((d) => /* @__PURE__ */ S("option", { value: d.key, children: [
              d.label,
              " (",
              d.w,
              "×",
              d.h,
              ")"
            ] }, d.key)) }, p.label))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ u(
      Ae,
      {
        label: n.inspectorBackground,
        palettes: Oe,
        value: (() => {
          const p = i.backgroundColor;
          if (!p) return null;
          for (const d of Oe) {
            const f = d.colors.find((g) => p === `${g}15`);
            if (f) return f;
          }
          return p.length === 9 && p.endsWith("15") ? p.slice(0, 7) : null;
        })(),
        onChange: (p) => r({ backgroundColor: p ? `${p}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ u(
      Ae,
      {
        label: n.inspectorBorder,
        palettes: Oe,
        value: i.borderColor,
        onChange: (p) => r({ borderColor: p })
      }
    ),
    /* @__PURE__ */ u(
      Vo,
      {
        label: n.inspectorStyle,
        value: i.borderStyle ?? "dashed",
        onChange: (p) => r({ borderStyle: p })
      }
    ),
    /* @__PURE__ */ u(
      Ko,
      {
        label: n.inspectorWidth,
        value: i.borderWidth ?? 1,
        onChange: (p) => r({ borderWidth: p })
      }
    ),
    /* @__PURE__ */ u(
      Ge,
      {
        value: i.opacity ?? 1,
        onChange: (p) => r({ opacity: p })
      }
    ),
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.frameSlideNumber }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.slideOrder ?? "",
          onChange: (p) => {
            const d = p.target.value;
            r({ slideOrder: d ? parseInt(d, 10) : void 0 });
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
            /* @__PURE__ */ u("option", { value: "", children: n.frameAuto }),
            h.map((p) => /* @__PURE__ */ u("option", { value: p, children: p }, p))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.frameTransition }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.transition ?? "pan",
          onChange: (p) => {
            const d = p.target.value;
            r({ transition: d === "pan" ? void 0 : d, transitionDuration: void 0 });
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
            /* @__PURE__ */ u("option", { value: "pan", children: c.pan }),
            /* @__PURE__ */ u("option", { value: "fade", children: c.fade }),
            /* @__PURE__ */ u("option", { value: "dissolve", children: c.dissolve }),
            /* @__PURE__ */ u("option", { value: "zoom", children: c.zoom }),
            /* @__PURE__ */ u("option", { value: "fold", children: c.fold }),
            /* @__PURE__ */ u("option", { value: "cube", children: c.cube }),
            /* @__PURE__ */ u("option", { value: "none", children: c.none })
          ]
        }
      )
    ] }),
    (i.transition ?? "pan") !== "none" && /* @__PURE__ */ u(
      wy,
      {
        value: i.transitionDuration ?? En[i.transition ?? "pan"],
        onChange: (p) => r({ transitionDuration: p === En[i.transition ?? "pan"] ? void 0 : p }),
        theme: o,
        durationLabel: n.frameDuration,
        msLabel: n.frameMilliseconds
      }
    )
  ] });
}
function vy({ engine: t, node: e }) {
  const o = ee(), { labels: n } = Jt(), r = Qe(t, e), { data: s } = e;
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
      Ae,
      {
        label: n.inspectorStroke,
        palettes: Pf,
        value: s.color,
        onChange: (i) => {
          i && r({ color: i });
        }
      }
    ),
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.inspectorSize }),
      [12, 14, 16, 20, 24].map((i) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => r({ fontSize: i }),
          style: {
            ...ne,
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
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.inspectorEdges }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((i) => /* @__PURE__ */ u(
        "button",
        {
          title: i.label,
          onClick: () => r({ edgeStyle: i.key === "sharp" ? void 0 : i.key }),
          style: {
            ...ne,
            width: 28,
            height: 28,
            background: (s.edgeStyle ?? "sharp") === i.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(di, { name: i.key })
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Ge,
      {
        value: s.opacity ?? 1,
        onChange: (i) => r({ opacity: i })
      }
    )
  ] });
}
function Sy({ engine: t, node: e }) {
  const o = ee(), n = Qe(t, e), { data: r } = e;
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: "URL" }),
      /* @__PURE__ */ u(
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
    /* @__PURE__ */ u(
      Xn,
      {
        borderColor: r.borderColor ?? null,
        borderStyle: r.borderStyle,
        borderWidth: r.borderWidth,
        onChange: (s, i) => n({ [s]: i })
      }
    ),
    /* @__PURE__ */ u(
      Ge,
      {
        value: r.opacity ?? 1,
        onChange: (s) => n({ opacity: s })
      }
    )
  ] });
}
function My({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const Cy = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Iy({ engine: t, mode: e, fontsInScene: o }) {
  const n = ee(), { labels: r } = Jt(), [, s] = et(0), i = lt(() => s((m) => m + 1), []), a = t.activeTool;
  if (e === "text") {
    const m = a.fontFamily ?? wo, y = a.fontSize ?? 20, x = a.textAlign ?? "left", b = a.color;
    return /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorFont }),
        /* @__PURE__ */ u(
          Lr,
          {
            value: m,
            onChange: (w) => {
              a.fontFamily = w, i();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorSize }),
        ql.map((w) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => {
              a.fontSize = w, i();
            },
            style: {
              ...ne,
              width: 36,
              height: 28,
              background: y === w ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 10,
              borderRadius: n.controlBorderRadius
            },
            children: w
          },
          w
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorAlign }),
        ai.map((w) => /* @__PURE__ */ u(
          "button",
          {
            title: w.key,
            onClick: () => {
              a.textAlign = w.key, i();
            },
            style: {
              ...ne,
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
      /* @__PURE__ */ u(
        Ae,
        {
          label: r.inspectorStroke,
          palettes: Oe,
          value: b,
          onChange: (w) => {
            a.color = w, i();
          }
        }
      ),
      /* @__PURE__ */ u(
        Ge,
        {
          value: a.opacity ?? 1,
          onChange: (w) => {
            a.opacity = w, i();
          }
        }
      )
    ] });
  }
  if (e === "edge") {
    const m = a.roughness ?? 0;
    return /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u(
        Ae,
        {
          label: r.inspectorStroke,
          palettes: Oe,
          value: a.color,
          onChange: (y) => {
            a.color = y, i();
          }
        }
      ),
      /* @__PURE__ */ u(
        Vo,
        {
          label: r.inspectorStrokeStyle,
          value: a.strokeStyle ?? "solid",
          onChange: (y) => {
            a.strokeStyle = y, i();
          }
        }
      ),
      /* @__PURE__ */ u(
        Ko,
        {
          label: r.inspectorStrokeWidth,
          widths: Kl,
          value: a.width,
          onChange: (y) => {
            a.width = y, i();
          }
        }
      ),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((y) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => {
              a.arrowHead = y, i();
            },
            style: {
              ...ne,
              height: 28,
              padding: "0 6px",
              background: (a.arrowHead ?? "arrow") === y ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 11,
              borderRadius: n.controlBorderRadius
            },
            children: y === "none" ? r.inspectorNone : y === "arrow" ? "▷" : y === "filled" ? "▶" : "●"
          },
          y
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((y) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => {
              a.arrowTail = y, i();
            },
            style: {
              ...ne,
              height: 28,
              padding: "0 6px",
              background: (a.arrowTail ?? "none") === y ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 11,
              borderRadius: n.controlBorderRadius
            },
            children: y === "none" ? r.inspectorNone : y === "arrow" ? "◁" : y === "filled" ? "◀" : "●"
          },
          y
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.edgePath }),
        [
          { key: "bezier", label: r.edgeBezier },
          { key: "straight", label: r.edgeStraight },
          { key: "smoothstep", label: r.edgeSmooth },
          { key: "step", label: r.edgeStep }
        ].map((y) => /* @__PURE__ */ u(
          "button",
          {
            title: y.label,
            onClick: () => {
              a.edgeType = y.key, i();
            },
            style: {
              ...ne,
              height: 28,
              padding: "0 6px",
              background: (a.edgeType ?? "bezier") === y.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 9,
              borderRadius: n.controlBorderRadius
            },
            children: y.label
          },
          y.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ot, children: [
        /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorRoughness }),
        kr.map((y) => {
          const x = y.value === 0 ? r.roughnessArchitect : y.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
          return /* @__PURE__ */ u(
            "button",
            {
              title: x,
              onClick: () => {
                a.roughness = y.value, i();
              },
              style: {
                ...ne,
                height: 28,
                padding: "0 8px",
                background: m === y.value ? n.controlBgActive : n.controlBg,
                color: n.text,
                fontSize: 9,
                borderRadius: n.controlBorderRadius
              },
              children: x
            },
            y.value
          );
        })
      ] })
    ] });
  }
  const h = e === "shape", c = a.color, l = a.fillColor ?? null, p = a.fillStyle ?? "hachure", d = a.strokeStyle ?? "solid", f = a.width, g = a.roughness ?? 1;
  return /* @__PURE__ */ S(St, { children: [
    h && /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorShape }),
      Cy.map((m) => /* @__PURE__ */ u(
        "button",
        {
          title: m.label,
          onClick: () => {
            a.shapeType = m.key, i();
          },
          style: {
            ...ne,
            width: 28,
            height: 28,
            background: (a.shapeType ?? "rect") === m.key ? n.controlBgActive : n.controlBg,
            color: n.text,
            borderRadius: n.controlBorderRadius
          },
          children: /* @__PURE__ */ u(My, { name: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Ae,
      {
        label: r.inspectorStroke,
        palettes: Oe,
        value: c,
        onChange: (m) => {
          a.color = m, i();
        }
      }
    ),
    /* @__PURE__ */ u(
      Ae,
      {
        label: r.inspectorFill,
        palettes: li,
        value: l,
        onChange: (m) => {
          a.fillColor = m ?? void 0, i();
        },
        allowNull: !0
      }
    ),
    l && /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorFillPattern }),
      si.map((m) => /* @__PURE__ */ u(
        "button",
        {
          title: m.label,
          onClick: () => {
            a.fillStyle = m.key, i();
          },
          style: {
            ...ne,
            width: 36,
            height: 28,
            background: p === m.key ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 9,
            borderRadius: n.controlBorderRadius
          },
          children: /* @__PURE__ */ u(ci, { style: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Vo,
      {
        label: r.inspectorStrokeStyle,
        value: d,
        onChange: (m) => {
          a.strokeStyle = m, i();
        }
      }
    ),
    /* @__PURE__ */ u(
      Ko,
      {
        label: r.inspectorStrokeWidth,
        widths: h ? ii : Vl,
        value: f,
        onChange: (m) => {
          a.width = m, i();
        }
      }
    ),
    h && /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorRoughness }),
      kr.map((m) => {
        const y = m.value === 0 ? r.roughnessArchitect : m.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
        return /* @__PURE__ */ u(
          "button",
          {
            title: y,
            onClick: () => {
              a.roughness = m.value, i();
            },
            style: {
              ...ne,
              height: 28,
              padding: "0 8px",
              background: g === m.value ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 9,
              borderRadius: n.controlBorderRadius
            },
            children: y
          },
          m.value
        );
      })
    ] }),
    /* @__PURE__ */ u(
      Ge,
      {
        value: a.opacity ?? 1,
        onChange: (m) => {
          a.opacity = m, i();
        }
      }
    )
  ] });
}
function zy(t) {
  return t.split(/[-_]/).filter(Boolean).map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ");
}
function wa({
  engine: t,
  node: e,
  PanelComponent: o,
  docs: n
}) {
  const r = Qe(t, e), s = ee(), { labels: i } = Jt(), [a, h] = et(!1), c = n ? n.id ?? e.type : null, l = c ? i.customNodeDocs[c] : void 0, p = !!(l != null && l.body), d = Ut(
    () => (l == null ? void 0 : l.title) ?? zy(e.type),
    [l == null ? void 0 : l.title, e.type]
  ), f = n != null && p ? /* @__PURE__ */ S("div", { style: { marginBottom: o ? 10 : 0 }, children: [
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
          /* @__PURE__ */ u(
            "span",
            {
              style: {
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.03em",
                textTransform: "uppercase",
                color: s.textSecondary
              },
              children: d
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              type: "button",
              onClick: () => h((g) => !g),
              "aria-expanded": a,
              "aria-label": a ? i.inspectorNodeHelpHide : i.inspectorNodeHelpShow,
              style: {
                flexShrink: 0,
                minWidth: 28,
                height: 28,
                padding: "0 8px",
                borderRadius: s.controlBorderRadius,
                border: `1px solid ${s.border}`,
                background: a ? s.controlBg : "transparent",
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
    a ? /* @__PURE__ */ u(
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
        children: l.body
      }
    ) : null
  ] }) : null;
  return o ? /* @__PURE__ */ S(St, { children: [
    f,
    /* @__PURE__ */ u(o, { node: e, data: e.data, engine: t, updateData: r })
  ] }) : f;
}
const Ty = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), Py = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function Ul(t) {
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
function Ay(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const n of t.getAllNodes()) {
    let r;
    n.type === "text" ? r = n.data.fontFamily : n.type === "shape" && (r = n.data.labelFontFamily), r && !e.has(r) && (e.add(r), o.push(r));
  }
  return o;
}
function Ey({ label: t }) {
  const e = ee();
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
function Ly({
  engine: t,
  open: e,
  onToggle: o
}) {
  const n = ee(), { labels: r } = Jt(), [s, i] = et(t.snapToGrid), [a, h] = et(t.gridSize), [c, l] = et(t.smartGuides), [p, d] = et(t.freeFormEdges), [f, g] = et(t.boardBackground), m = {
    "plain-white": r.paperWhite,
    "dot-grid": r.paperCream,
    engineering: r.paperWarm,
    blueprint: r.paperBlueprint,
    "dark-grid": r.paperNight,
    "japanese-stationery": r.paperJapaneseStationery,
    kraft: r.paperKraftPaper
  };
  Mt(() => {
    const x = () => {
      i(t.snapToGrid), h(t.gridSize), l(t.smartGuides), d(t.freeFormEdges);
    }, b = () => d(t.freeFormEdges);
    t.on("change", b);
    const w = () => g(t.boardBackground);
    return t.on("guides", x), t.on("background", w), () => {
      t.off("guides", x), t.off("background", w), t.off("change", b);
    };
  }, [t]);
  const y = [10, 20, 40, 80];
  return /* @__PURE__ */ S(Ee, { title: r.inspectorCanvas, defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorGrid }),
      /* @__PURE__ */ u(
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
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorGridSize }),
      /* @__PURE__ */ u("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }, children: y.map((x) => /* @__PURE__ */ S(
        "button",
        {
          onClick: () => t.setGridSize(x),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: a === x ? n.controlBgActive : n.controlBg,
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
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorGuides }),
      /* @__PURE__ */ u(
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
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: "Free edges" }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => t.toggleFreeFormEdges(),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: p ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: p ? r.inspectorOn : r.inspectorOff
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Ot, children: [
      /* @__PURE__ */ u("span", { style: { ...Ht, color: n.textMuted }, children: r.inspectorPaper }),
      /* @__PURE__ */ u(
        "select",
        {
          value: f,
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
          children: fn.map((x) => /* @__PURE__ */ u("option", { value: x.key, children: m[x.key] ?? x.label }, x.key))
        }
      )
    ] })
  ] });
}
function Zl({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: n
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ u(dy, { engine: t, node: e, fontsInScene: n });
    case "draw":
      return /* @__PURE__ */ u(hy, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ u(uy, { engine: t, node: e, fontsInScene: n });
    case "edge":
      return /* @__PURE__ */ u(gy, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ u(my, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ u(by, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ u(ky, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ u(vy, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ u(Sy, { engine: t, node: e });
    default: {
      const r = o == null ? void 0 : o.get(e.type);
      return r != null && r.propertiesPanel ? /* @__PURE__ */ u(
        wa,
        {
          engine: t,
          node: e,
          PanelComponent: r.propertiesPanel,
          docs: r.docs
        }
      ) : r != null && r.docs ? /* @__PURE__ */ u(wa, { engine: t, node: e, docs: r.docs }) : null;
    }
  }
}
function ka({
  engine: t,
  nodes: e
}) {
  const o = ee(), { labels: n } = Jt(), r = Ke(mn), s = Math.round(e[0].rotation ?? 0), a = e.every(
    (p) => Math.round(p.rotation ?? 0) === s
  ) ? s : null, [h, c] = et(null), l = lt(
    (p) => {
      c(null);
      const d = parseFloat(p);
      if (isNaN(d)) return;
      const f = Math.max(-360, Math.min(360, d)), g = e.map((y) => ({
        id: y.id,
        patch: { rotation: f }
      })), m = r == null ? void 0 : r();
      m ? t.batchUpdateWithHistoryCoalesced(g, m) : t.batchUpdateWithHistory(g);
    },
    [t, e, r]
  );
  return /* @__PURE__ */ S("div", { style: Ot, children: [
    /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.inspectorRotation }),
    /* @__PURE__ */ u(
      "input",
      {
        type: "number",
        min: -360,
        max: 360,
        value: h ?? (a !== null ? String(a) : ""),
        placeholder: a === null ? "Mixed" : void 0,
        onChange: (p) => c(p.target.value),
        onBlur: (p) => l(p.target.value),
        onKeyDown: (p) => {
          p.key === "Enter" && l(p.target.value), p.key === "Escape" && c(null);
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
function va({
  engine: t,
  nodes: e
}) {
  const o = ee(), { labels: n } = Jt(), r = e.map((i) => i.id);
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
  return /* @__PURE__ */ S("div", { style: Ot, children: [
    /* @__PURE__ */ u("span", { style: { ...Ht, color: o.textMuted }, children: n.inspectorStack }),
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
function Ry({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const n = Ke(mn), r = lt(
    (s, i) => {
      const a = s === "opacity" ? Ty : Py, h = e.filter((l) => a.has(l.type)).map((l) => ({
        id: l.id,
        patch: {
          data: { ...l.data, [s]: i }
        }
      })), c = n == null ? void 0 : n();
      c ? t.batchUpdateWithHistoryCoalesced(h, c) : t.batchUpdateWithHistory(h);
    },
    [t, e, n]
  );
  return /* @__PURE__ */ S(St, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ u(
      Ge,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (s) => r("opacity", s)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ u(
      Xn,
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
function Dy({
  engine: t,
  target: e
}) {
  const o = ee(), { labels: n } = Jt();
  if (e.kind !== "single" && e.kind !== "multi") return null;
  const r = Array.from(t.selection), s = r.length > 0, i = r.length >= 2 || t.selectionHasGroup(), a = r.some((l) => {
    var p;
    return (p = t.getNode(l)) == null ? void 0 : p.locked;
  }), h = r.some((l) => {
    var p;
    return !((p = t.getNode(l)) != null && p.locked);
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
      disabled: !h,
      action: () => {
        for (const l of r) t.updateNode(l, { locked: !0 });
      }
    },
    {
      label: n.actionUnlock,
      disabled: !a,
      action: () => {
        for (const l of r) t.updateNode(l, { locked: void 0 });
      }
    },
    {
      label: n.actionDelete,
      disabled: !s,
      danger: !0,
      action: () => t.deleteSelected()
    }
  ];
  return /* @__PURE__ */ u(Ee, { title: n.inspectorActions, defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ u("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: c.map((l) => /* @__PURE__ */ u(
    "button",
    {
      type: "button",
      disabled: l.disabled,
      onClick: l.action,
      style: {
        border: `1px solid ${o.border}`,
        borderRadius: 999,
        background: l.disabled ? o.controlBg : o.controlBgActive,
        color: l.danger ? "#fecaca" : o.text,
        opacity: l.disabled ? 0.45 : 0.95,
        padding: "5px 10px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.01em",
        cursor: l.disabled ? "default" : "pointer",
        whiteSpace: "nowrap"
      },
      children: l.label
    },
    l.label
  )) }) });
}
function Wy({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: n,
  open: r,
  onToggle: s
}) {
  const { labels: i } = Jt(), h = Ul(i)[e.type] ?? e.type, c = e.nodes.length, l = e.nodes[0], p = `${h} (${c})`;
  return /* @__PURE__ */ u(Ee, { title: p, defaultOpen: !1, variant: "group", open: r, onToggle: s, children: /* @__PURE__ */ u(On.Provider, { value: e.nodes, children: /* @__PURE__ */ u(
    Zl,
    {
      engine: t,
      node: l,
      registry: o,
      fontsInScene: n
    }
  ) }) });
}
function By(t, e) {
  const o = Ul(e);
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
function Sa({
  engine: t,
  registry: e,
  target: o,
  commonProps: n
}) {
  const { labels: r } = Jt(), s = Ut(() => Ay(t), [t, o]), i = By(o, r), [a, h] = et("shared"), [c, l] = et(!1), p = Ut(() => {
    switch (o.kind) {
      case "single":
        return o.node.id;
      case "multi":
        return [...o.nodes].map((f) => f.id).sort().join("\0");
      case "tool":
        return "tool";
      default:
        return "none";
    }
  }, [o]), d = Ar(t, p);
  return Mt(() => {
    const f = () => {
      l(
        window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0
      );
    };
    return f(), window.addEventListener("resize", f), () => window.removeEventListener("resize", f);
  }, []), Mt(() => {
    if (o.kind !== "multi") {
      h("shared");
      return;
    }
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((g) => g.type)])).has(a) || h("shared");
  }, [o, a]), /* @__PURE__ */ S(mn.Provider, { value: d, children: [
    /* @__PURE__ */ u(Ey, { label: i }),
    /* @__PURE__ */ u(
      Ly,
      {
        engine: t,
        open: o.kind === "multi" ? a === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => h((f) => f === "canvas" ? "" : "canvas") : void 0
      }
    ),
    c && /* @__PURE__ */ u(Dy, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ u(Iy, { engine: t, mode: o.mode, fontsInScene: s }),
    o.kind === "single" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u(
        Zl,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: s
        }
      ),
      /* @__PURE__ */ u(ka, { engine: t, nodes: [o.node] }),
      /* @__PURE__ */ u(va, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ S(
        Ee,
        {
          title: r.inspectorShared,
          defaultOpen: !0,
          variant: "group",
          open: a === "shared",
          onToggle: () => h((f) => f === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ u(Ry, { engine: t, nodes: o.nodes, commonProps: n }),
            /* @__PURE__ */ u(ka, { engine: t, nodes: o.nodes }),
            /* @__PURE__ */ u(va, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((f) => /* @__PURE__ */ u(
        Wy,
        {
          engine: t,
          group: f,
          registry: e,
          fontsInScene: s,
          open: a === f.type,
          onToggle: () => h((g) => g === f.type ? "" : f.type)
        },
        f.type
      ))
    ] })
  ] });
}
function Ny({ engine: t, registry: e }) {
  const o = ee(), { isRTL: n, labels: r } = Jt(), { target: s, commonProps: i } = ry(t), a = s.kind !== "none";
  lt((K, H) => {
    const $ = K.trim();
    if ($.startsWith("#")) {
      const ot = $.slice(1), it = ot.length === 3 ? ot.split("").map((Q) => Q + Q).join("") : ot;
      if (it.length === 6) {
        const Q = parseInt(it.slice(0, 2), 16), ct = parseInt(it.slice(2, 4), 16), yt = parseInt(it.slice(4, 6), 16);
        return `rgba(${Q}, ${ct}, ${yt}, ${H})`;
      }
    }
    return $.startsWith("rgb(") ? `rgba(${$.slice(4, -1)}, ${H})` : ($.startsWith("rgba("), $);
  }, []);
  const [h, c] = et(!1), [l, p] = et(!1), [d, f] = et(!1), [g, m] = et(!1), y = pt(null), x = pt(!1), b = lt(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), w = lt(
    (K) => {
      const H = b() ? 1366 : 1024;
      return K <= H;
    },
    [b]
  ), v = pt(null), [M, C] = et(null), z = pt(null), [A, P] = et(!1), Y = lt(() => {
    var $, ot;
    const K = ($ = v.current) == null ? void 0 : $.offsetParent;
    if (K) return { width: K.clientWidth, height: K.clientHeight };
    const H = ((ot = v.current) == null ? void 0 : ot.ownerDocument.defaultView) ?? window;
    return { width: H.innerWidth, height: H.innerHeight };
  }, []), G = lt(() => {
    const { width: K } = Y();
    return n ? { x: eo + 16, y: 12 } : { x: K - dn - 16, y: 12 };
  }, [Y, n]), rt = M ?? G(), st = pt(!1);
  Io(() => {
    if (!st.current && v.current && !M) {
      st.current = !0;
      const K = v.current.offsetParent;
      K && C(
        n ? { x: eo + 16, y: 12 } : { x: K.clientWidth - dn - 16, y: 12 }
      );
    }
  }, [M, n]), Mt(() => {
    var ot, it;
    const K = ((ot = v.current) == null ? void 0 : ot.offsetParent) ?? ((it = v.current) == null ? void 0 : it.ownerDocument.body);
    if (!K) return;
    const H = new ResizeObserver((Q) => {
      var J;
      const ct = ((J = Q[0]) == null ? void 0 : J.contentRect.width) ?? K.clientWidth;
      c(ct < 600);
      const yt = w(ct);
      p(yt), x.current || (m(yt), x.current = !0);
    });
    H.observe(K), c(K.clientWidth < 600);
    const $ = w(K.clientWidth);
    return p($), x.current || (m($), x.current = !0), () => H.disconnect();
  }, [w]), Mt(() => {
    var wt;
    const K = ((wt = v.current) == null ? void 0 : wt.ownerDocument) ?? document, H = () => {
      y.current !== null && window.clearTimeout(y.current), y.current = window.setTimeout(() => {
        f(!1), y.current = null;
      }, 200);
    }, $ = () => {
      y.current !== null && (window.clearTimeout(y.current), y.current = null), f(!0);
    }, ot = (gt) => !!(gt instanceof Element && gt.closest("[data-sb-canvas]")), it = (gt) => {
      gt.button !== 2 && ot(gt.target) && $();
    }, Q = () => H(), ct = () => H(), yt = (gt) => {
      ot(gt.target) && $();
    }, J = () => H(), dt = (gt) => {
      var At;
      ((At = gt.detail) == null ? void 0 : At.active) ? $() : H();
    };
    return K.addEventListener("pointerdown", it, !0), K.addEventListener("pointerup", Q, !0), K.addEventListener("pointercancel", ct, !0), K.addEventListener("focusin", yt, !0), K.addEventListener("focusout", J, !0), K.addEventListener("sb:canvas-interaction", dt), () => {
      K.removeEventListener("pointerdown", it, !0), K.removeEventListener("pointerup", Q, !0), K.removeEventListener("pointercancel", ct, !0), K.removeEventListener("focusin", yt, !0), K.removeEventListener("focusout", J, !0), K.removeEventListener("sb:canvas-interaction", dt), y.current !== null && (window.clearTimeout(y.current), y.current = null);
    };
  }, []);
  const at = lt(
    (K, H) => {
      P(!0);
      const $ = M ? M.x : G().x, ot = M ? M.y : G().y;
      z.current = {
        startX: K.clientX,
        startY: K.clientY,
        startLeft: $,
        startTop: ot
      }, (H ?? K.currentTarget).setPointerCapture(K.pointerId);
    },
    [M, G]
  ), xt = lt((K) => K instanceof Element ? !!K.closest(
    'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
  ) : !1, []), O = lt(
    (K) => {
      h || K.button === 0 && (xt(K.target) || (K.stopPropagation(), at(K, K.currentTarget)));
    },
    [h, xt, at]
  ), _ = lt(
    (K) => {
      if (!z.current) return;
      K.stopPropagation();
      const H = K.clientX - z.current.startX, $ = K.clientY - z.current.startY, { width: ot, height: it } = Y(), Q = n ? 8 : eo, ct = n ? ot - dn - eo - 8 : ot - dn - 8, yt = Math.max(
        Q,
        Math.min(ct, z.current.startLeft + H)
      ), J = Math.max(
        8,
        Math.min(it - 100, z.current.startTop + $)
      );
      C({ x: yt, y: J });
    },
    [Y, n]
  ), W = lt(() => {
    z.current = null, P(!1);
  }, []), Z = g && d, tt = o.panelBg;
  return a ? h ? /* @__PURE__ */ S(
    "div",
    {
      ref: v,
      "data-sb-props-panel": !0,
      onPointerDown: (K) => K.stopPropagation(),
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "45vh",
        minHeight: 200,
        background: tt,
        borderRadius: "12px 12px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        color: o.text,
        fontSize: 12,
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        opacity: Z ? 0 : 1,
        transform: Z ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: Z ? "none" : "auto"
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
                  onPointerDown: (K) => K.stopPropagation(),
                  children: [
                    /* @__PURE__ */ u("span", { children: r.autoHide }),
                    /* @__PURE__ */ u(
                      "input",
                      {
                        type: "checkbox",
                        checked: g,
                        onChange: (K) => m(K.target.checked),
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
              Sa,
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
      ref: v,
      "data-sb-props-panel": !0,
      style: {
        position: "absolute",
        left: rt.x,
        top: rt.y,
        width: dn,
        background: tt,
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
        opacity: Z ? 0 : 1,
        transform: Z ? "translateY(-4px) scale(0.995)" : "translateY(0) scale(1)",
        transformOrigin: n ? "top left" : "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: Z ? "none" : "auto",
        cursor: A ? "grabbing" : "grab"
      },
      onPointerDownCapture: O,
      onPointerDown: (K) => K.stopPropagation(),
      onPointerMove: _,
      onPointerUp: W,
      onPointerCancel: W,
      children: [
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              cursor: A ? "grabbing" : "grab",
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
              /* @__PURE__ */ u("span", { style: { fontWeight: 600, letterSpacing: "0.02em" }, children: r.inspectorTitle }),
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
                  onPointerDown: (K) => K.stopPropagation(),
                  children: [
                    /* @__PURE__ */ u("span", { children: r.autoHide }),
                    /* @__PURE__ */ u(
                      "input",
                      {
                        type: "checkbox",
                        checked: g,
                        onChange: (K) => m(K.target.checked),
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
              Sa,
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
function Fy({ engine: t, registry: e, gifApiBaseUrl: o }) {
  const { isRTL: n } = Jt();
  return /* @__PURE__ */ S(St, { children: [
    /* @__PURE__ */ u(
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
        children: /* @__PURE__ */ u(ty, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ u(Ny, { engine: t, registry: e })
  ] });
}
const Ln = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function Hy(t) {
  const e = t.viewport.zoom, o = Ln.find((n) => n > e + 1e-3) ?? Ln[Ln.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function Oy(t) {
  const e = t.viewport.zoom, o = [...Ln].reverse().find((n) => n < e - 1e-3) ?? Ln[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const Xy = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
}, We = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, ge = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function He({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ u("path", { d: "M5 12h14", ...ge }),
    t === "plus" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M12 5v14", ...ge }),
      /* @__PURE__ */ u("path", { d: "M5 12h14", ...ge })
    ] }),
    t === "undo" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ge, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...ge, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ge, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...ge, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...ge }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...ge })
    ] }),
    t === "play" && /* @__PURE__ */ u("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...ge }),
      /* @__PURE__ */ u("path", { d: "M6 6V18M18 6V18", ...ge }),
      /* @__PURE__ */ u("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...ge })
    ] }),
    t === "gauge" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M4 15a8 8 0 1 1 16 0", ...ge }),
      /* @__PURE__ */ u("path", { d: "M12 15l4-4", ...ge }),
      /* @__PURE__ */ u("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "minimap" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "3.5", y: "3.5", width: "17", height: "17", rx: "2", ...ge, fill: "none" }),
      /* @__PURE__ */ u(
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
    t === "search" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "6", ...ge }),
      /* @__PURE__ */ u("path", { d: "M16 16l5 5", ...ge })
    ] }),
    t === "home" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M3 12l9-8 9 8", ...ge, fill: "none" }),
      /* @__PURE__ */ u("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...ge, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...ge, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function Yy({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showMinimap: n,
  onToggleMinimap: r,
  showPerfOverlay: s,
  onTogglePerfOverlay: i
}) {
  const a = ee(), { labels: h } = Jt(), [c, l] = et(t.viewport.zoom), [p, d] = et(!1), [f, g] = et(!1), [m, y] = et(() => t.originView != null), [x, b] = et(
    () => t.getAllNodes().filter((z) => z.type === "frame").length
  );
  Mt(() => {
    const z = () => l(t.viewport.zoom), A = () => {
      d(t.canUndo()), g(t.canRedo());
    }, P = () => {
      b(t.getAllNodes().filter((Y) => Y.type === "frame").length), y(t.originView != null);
    };
    return t.on("viewport", z), t.on("history", A), t.on("change", P), t.on("node:create", P), t.on("node:delete", P), () => {
      t.off("viewport", z), t.off("history", A), t.off("change", P), t.off("node:create", P), t.off("node:delete", P);
    };
  }, [t]);
  const w = a.panelBg, v = `1px solid ${a.border}`, M = {
    ...Xy,
    borderRadius: a.panelBorderRadius
  }, C = {
    width: 1,
    height: 20,
    background: a.separator,
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
      onPointerDown: (z) => z.stopPropagation(),
      children: [
        /* @__PURE__ */ S("div", { style: { ...M, background: w, border: v, boxShadow: a.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: h.zoomOut,
              onClick: () => Oy(t),
              style: { ...We, width: 32, height: 32, color: a.text },
              children: /* @__PURE__ */ u(He, { name: "minus" })
            }
          ),
          /* @__PURE__ */ u("div", { style: C }),
          /* @__PURE__ */ S(
            "button",
            {
              title: h.resetZoom,
              onClick: () => {
                t.viewport.zoom = 1, t.pan(0, 0);
              },
              style: {
                ...We,
                minWidth: 48,
                height: 32,
                color: a.text,
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
          /* @__PURE__ */ u("div", { style: C }),
          /* @__PURE__ */ u(
            "button",
            {
              title: h.zoomIn,
              onClick: () => Hy(t),
              style: { ...We, width: 32, height: 32, color: a.text },
              children: /* @__PURE__ */ u(He, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { style: { ...M, background: w, border: v, boxShadow: a.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: h.fitToContent,
              onClick: () => t.fitToContent(),
              style: { ...We, width: 32, height: 32, color: a.text },
              children: /* @__PURE__ */ u(He, { name: "fit" })
            }
          ),
          /* @__PURE__ */ u("div", { style: C }),
          /* @__PURE__ */ u(
            "button",
            {
              title: h.canvasSearchOpen,
              onClick: () => {
                document.dispatchEvent(new CustomEvent("sb:search-open"));
              },
              style: {
                ...We,
                width: 32,
                height: 32,
                color: a.textMuted
              },
              children: /* @__PURE__ */ u(He, { name: "search" })
            }
          ),
          /* @__PURE__ */ u("div", { style: C }),
          /* @__PURE__ */ u(
            "button",
            {
              title: m ? h.clearOriginView : h.saveOriginView,
              onClick: () => {
                m ? (t.clearOriginView(), y(!1)) : (t.setOriginView(), y(!0));
              },
              style: { ...We, width: 32, height: 32, color: m ? a.accentColor : a.textFaint },
              children: /* @__PURE__ */ u(He, { name: m ? "bookmark-fill" : "bookmark" })
            }
          ),
          /* @__PURE__ */ u("div", { style: C }),
          /* @__PURE__ */ u(
            "button",
            {
              title: h.goToOriginView,
              onClick: () => {
                m && t.goToOriginView();
              },
              disabled: !m,
              style: { ...We, width: 32, height: 32, color: m ? a.text : a.textFaint },
              children: /* @__PURE__ */ u(He, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { style: { ...M, overflow: "visible", background: w, border: v, boxShadow: a.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: h.presentSlides,
              onClick: () => t.enterPresentation(),
              style: { ...We, width: 32, height: 32, color: a.text },
              children: /* @__PURE__ */ u(He, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ S(St, { children: [
            /* @__PURE__ */ u("div", { style: C }),
            /* @__PURE__ */ S(
              "button",
              {
                title: h.toggleSlidesPanel,
                onClick: o,
                style: {
                  ...We,
                  width: 32,
                  height: 32,
                  color: e ? a.text : a.textMuted,
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ u(He, { name: "slides" }),
                  x > 0 && /* @__PURE__ */ u(
                    "span",
                    {
                      style: {
                        position: "absolute",
                        top: -4,
                        right: -4,
                        minWidth: 14,
                        height: 14,
                        borderRadius: 7,
                        background: a.accentColor,
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
          r && /* @__PURE__ */ S(St, { children: [
            /* @__PURE__ */ u("div", { style: C }),
            /* @__PURE__ */ u(
              "button",
              {
                title: h.toggleMinimap,
                onClick: r,
                style: {
                  ...We,
                  width: 32,
                  height: 32,
                  color: n ? a.accentColor : a.textMuted
                },
                children: /* @__PURE__ */ u(He, { name: "minimap" })
              }
            )
          ] }),
          i && /* @__PURE__ */ S(St, { children: [
            /* @__PURE__ */ u("div", { style: C }),
            /* @__PURE__ */ u(
              "button",
              {
                title: h.togglePerformanceOverlay,
                onClick: i,
                style: {
                  ...We,
                  width: 32,
                  height: 32,
                  color: s ? a.accentColor : a.textMuted
                },
                children: /* @__PURE__ */ u(He, { name: "gauge" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ S("div", { style: { ...M, background: w, border: v, boxShadow: a.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: h.undo,
              onClick: () => t.undo(),
              disabled: !p,
              style: { ...We, width: 32, height: 32, color: p ? a.text : a.textFaint },
              children: /* @__PURE__ */ u(He, { name: "undo" })
            }
          ),
          /* @__PURE__ */ u("div", { style: C }),
          /* @__PURE__ */ u(
            "button",
            {
              title: h.redo,
              onClick: () => t.redo(),
              disabled: !f,
              style: { ...We, width: 32, height: 32, color: f ? a.text : a.textFaint },
              children: /* @__PURE__ */ u(He, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
function Gy(t) {
  return t.matches.length === 0 ? "0/0" : `${t.activeIndex >= 0 ? t.activeIndex + 1 : 0}/${t.matches.length}`;
}
function jy({ engine: t }) {
  const e = ee(), { labels: o } = Jt(), [n, r] = et(!1), [s, i] = et(() => t.getSearchState()), a = pt(null), h = Ut(() => Gy(s), [s]);
  return Mt(() => {
    const c = () => i(t.getSearchState()), l = () => {
      r(!0), requestAnimationFrame(() => {
        var d;
        return (d = a.current) == null ? void 0 : d.focus();
      });
    }, p = document;
    return t.on("search", c), p.addEventListener("sb:search-open", l), () => {
      t.off("search", c), p.removeEventListener("sb:search-open", l);
    };
  }, [t]), Mt(() => {
    const c = (l) => {
      (l.ctrlKey || l.metaKey) && l.key.toLowerCase() === "f" && (l.preventDefault(), r(!0), requestAnimationFrame(() => {
        var d;
        return (d = a.current) == null ? void 0 : d.focus();
      }));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, []), Mt(() => {
    if (!n) return;
    const c = (l) => {
      var d;
      (l.ctrlKey || l.metaKey) && l.key.toLowerCase() === "f" ? (l.preventDefault(), (d = a.current) == null || d.focus()) : l.key === "Escape" && (l.preventDefault(), s.query ? t.clearSearch() : r(!1));
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
        /* @__PURE__ */ u("span", { style: { minWidth: 42, textAlign: "center", color: e.textMuted, fontSize: 12 }, children: h }),
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
const ls = 240, Ma = 6;
function cs(t) {
  const o = t.getAllNodes().filter((l) => l.type === "frame");
  if (o.length === 0) return [];
  const n = o.map((l) => ({
    id: l.id,
    x: l.x,
    y: l.y,
    slideOrder: l.data.slideOrder,
    label: l.data.label || "",
    borderColor: l.data.borderColor,
    transition: l.data.transition,
    transitionDuration: l.data.transitionDuration
  })), r = n.filter((l) => l.slideOrder != null).sort((l, p) => l.slideOrder - p.slideOrder), s = n.filter((l) => l.slideOrder == null), i = 100;
  s.sort((l, p) => l.y - p.y);
  const a = [];
  for (const l of s) {
    const p = a[a.length - 1];
    p && Math.abs(l.y - p[0].y) < i ? p.push(l) : a.push([l]);
  }
  const h = a.flatMap((l) => l.sort((p, d) => p.x - d.x));
  return [...r, ...h].map((l, p) => ({
    id: l.id,
    label: l.label || `Frame ${p + 1}`,
    order: p + 1,
    slideOrder: l.slideOrder,
    borderColor: l.borderColor,
    transition: l.transition,
    transitionDuration: l.transitionDuration
  }));
}
const Vy = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Ky() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...Vy }) });
}
function qy(t, e, o) {
  const [n, r] = et("");
  return Mt(() => {
    let s = !1;
    return yf(t, e).then((i) => {
      s || r(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), n;
}
function Uy({ engine: t, frameId: e, tick: o }) {
  const n = qy(t, e, o);
  return n ? /* @__PURE__ */ u(
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
const Zy = ["pan", "fade", "dissolve", "zoom", "fold", "cube", "none"];
function Ca({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ u("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ u("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ u("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ u("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ u("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ u("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const Qy = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function Jy({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: n,
  theme: r,
  labels: s
}) {
  const [i, a] = et(!1), [h, c] = et(!1), l = pt(null), p = pt(null), d = t !== "none", f = e ?? En[t], g = {
    pan: s.transitionPan,
    fade: s.transitionFadeToBlack,
    dissolve: s.transitionDissolve,
    zoom: s.transitionZoom,
    fold: s.transitionFold,
    cube: s.transitionCube,
    none: s.transitionNoneInstant
  };
  Mt(() => {
    if (!i && !h) return;
    const y = (x) => {
      i && l.current && !l.current.contains(x.target) && a(!1), h && p.current && !p.current.contains(x.target) && c(!1);
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [i, h]);
  const m = {
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
        zIndex: i || h ? 50 : void 0
      },
      children: [
        /* @__PURE__ */ u("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: r.border } }),
        /* @__PURE__ */ S("div", { ref: l, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            a((y) => !y), c(!1);
          }, style: m, children: [
            /* @__PURE__ */ u(Ca, { type: t }),
            /* @__PURE__ */ u("span", { children: g[t] ?? s.transitionPan }),
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
              children: Zy.map((y) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    o(y), a(!1);
                  },
                  style: {
                    border: "none",
                    background: y === t ? r.controlBgActive : "transparent",
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
                    /* @__PURE__ */ u(Ca, { type: y }),
                    g[y]
                  ]
                },
                y
              ))
            }
          )
        ] }),
        d && /* @__PURE__ */ S("div", { ref: p, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            c((y) => !y), a(!1);
          }, style: m, children: [
            /* @__PURE__ */ S("span", { children: [
              f,
              "ms"
            ] }),
            /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: h ? "▲" : "▼" })
          ] }),
          h && /* @__PURE__ */ u(
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
              children: Qy.map((y) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    n(y === En[t] ? void 0 : y), c(!1);
                  },
                  style: {
                    border: "none",
                    background: y === f ? r.controlBgActive : "transparent",
                    color: r.text,
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
                    y === En[t] ? " •" : ""
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
function $y({ engine: t, open: e, onClose: o }) {
  const n = ee(), { isRTL: r, labels: s } = Jt(), [i, a] = et(() => cs(t)), [h, c] = et(() => new Set(t.selection)), [l, p] = et(0), d = Ar(t, "frames-panel"), f = pt(null), g = pt(null), m = pt(0), y = pt(!1), x = pt(i);
  x.current = i;
  const b = pt(!1), w = pt(!1), [v, M] = et(null), [C, z] = et(null), [A, P] = et(0), Y = pt([]), G = pt(null), rt = lt(() => {
    if (b.current) return;
    const W = cs(t);
    a(W);
  }, [t]), st = lt(() => {
    c(new Set(t.selection));
  }, [t]), at = pt(null), xt = lt(() => {
    at.current && clearTimeout(at.current), at.current = setTimeout(() => p((W) => W + 1), 500);
  }, []);
  Mt(() => {
    rt(), st();
    const W = setTimeout(() => p((tt) => tt + 1), 200), Z = () => {
      rt(), xt();
    };
    return t.on("change", Z), t.on("node:create", Z), t.on("node:delete", Z), t.on("node:data", Z), t.on("selection", st), t.on("history", Z), () => {
      clearTimeout(W), t.off("change", Z), t.off("node:create", Z), t.off("node:delete", Z), t.off("node:data", Z), t.off("selection", st), t.off("history", Z), at.current && clearTimeout(at.current);
    };
  }, [t, rt, st, xt]), Mt(() => {
    if (!G.current) return;
    const W = G.current.querySelectorAll("[data-frame-card]");
    Y.current = Array.from(W).map((Z) => Z.offsetHeight + Ma);
  }, [i]);
  const O = lt(
    (W) => {
      t.select(W), t.zoomToNode(W, 0.8);
    },
    [t]
  ), _ = lt(
    (W, Z) => {
      W.preventDefault(), W.stopPropagation(), m.current = W.clientY, f.current = Z, g.current = Z, y.current = !1;
    },
    []
  );
  return Mt(() => {
    const W = (tt) => {
      if (f.current === null) return;
      const K = tt.clientY - m.current;
      if (!y.current) {
        if (Math.abs(K) < 4) return;
        y.current = !0, M(f.current), z(f.current);
      }
      P(K);
      const H = Y.current, $ = f.current;
      let ot = $;
      if (K > 0) {
        let it = 0;
        for (let Q = $ + 1; Q < x.current.length && (it += H[Q] || 0, K > it - (H[Q] || 0) / 2); Q++)
          ot = Q;
      } else if (K < 0) {
        let it = 0;
        for (let Q = $ - 1; Q >= 0 && (it -= H[Q] || 0, K < it + (H[Q] || 0) / 2); Q--)
          ot = Q;
      }
      g.current = ot, z(ot);
    }, Z = () => {
      const tt = f.current, K = g.current;
      if (tt !== null && K !== null && tt !== K) {
        b.current = !0;
        const H = [...x.current], [$] = H.splice(tt, 1);
        H.splice(K, 0, $);
        let ot = !0;
        for (let it = 0; it < H.length; it++) {
          const Q = H[it], ct = t.getNode(Q.id);
          ct && (ot ? (t.updateNodeWithHistory(Q.id, {
            data: { ...ct.data, slideOrder: it + 1 }
          }), ot = !1) : t.updateNode(Q.id, {
            data: { ...ct.data, slideOrder: it + 1 }
          }));
        }
        b.current = !1, w.current = !0, a(cs(t)), p((it) => it + 1);
      }
      f.current = null, g.current = null, y.current = !1, M(null), z(null), P(0), w.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          w.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", W), document.addEventListener("pointerup", Z), document.addEventListener("pointercancel", Z), () => {
      document.removeEventListener("pointermove", W), document.removeEventListener("pointerup", Z), document.removeEventListener("pointercancel", Z);
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
        width: ls,
        background: n.panelBg,
        borderLeft: r ? void 0 : `1px solid ${n.border}`,
        borderRight: r ? `1px solid ${n.border}` : void 0,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : r ? `translateX(-${ls}px)` : `translateX(${ls}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (W) => W.stopPropagation(),
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
                    color: n.textMuted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    padding: 0
                  },
                  children: /* @__PURE__ */ u(Ky, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ S(
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
              gap: Ma
            },
            children: [
              i.length === 0 && /* @__PURE__ */ u("div", { style: { padding: "20px 8px", textAlign: "center", color: n.textMuted, fontSize: 11 }, children: s.noFramesYet }),
              i.map((W, Z) => {
                const tt = h.has(W.id), K = v === Z;
                let H = 0;
                if (K)
                  H = A;
                else if (v !== null && C !== null) {
                  const it = Y.current;
                  v < C ? Z > v && Z <= C && (H = -(it[v] || 0)) : v > C && Z >= C && Z < v && (H = it[v] || 0);
                }
                const $ = (it) => {
                  const Q = t.getNode(W.id);
                  if (!Q) return;
                  const ct = `${d()}:${W.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    W.id,
                    {
                      data: {
                        ...Q.data,
                        transition: it === "pan" ? void 0 : it,
                        transitionDuration: void 0
                      }
                    },
                    ct
                  );
                }, ot = (it) => {
                  const Q = t.getNode(W.id);
                  if (!Q) return;
                  const ct = `${d()}:${W.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    W.id,
                    {
                      data: { ...Q.data, transitionDuration: it }
                    },
                    ct
                  );
                };
                return /* @__PURE__ */ S(zc.Fragment, { children: [
                  v === null && /* @__PURE__ */ u(
                    Jy,
                    {
                      value: W.transition ?? "pan",
                      durationMs: W.transitionDuration,
                      onChange: $,
                      onDurationChange: ot,
                      theme: n,
                      labels: s
                    }
                  ),
                  /* @__PURE__ */ u(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: (it) => _(it, Z),
                      onDoubleClick: () => O(W.id),
                      style: {
                        borderRadius: 6,
                        border: tt ? `2px solid ${W.borderColor || n.text}` : `1px solid ${n.border}`,
                        background: tt ? n.controlBgActive : "transparent",
                        cursor: K ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transition: K || w.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${H}px)`,
                        zIndex: K ? 10 : 1,
                        opacity: K ? 0.92 : 1,
                        boxShadow: K ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ u(Uy, { engine: t, frameId: W.id, tick: l })
                    }
                  )
                ] }, W.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const Bo = 50, ds = 30, _y = `
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
`, t0 = `
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
function Ia(t, e, o) {
  const n = t.createShader(e);
  return n ? (t.shaderSource(n, o), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) ? n : (t.deleteShader(n), null)) : null;
}
function e0(t, e, o) {
  const n = Ia(t, t.VERTEX_SHADER, e), r = Ia(t, t.FRAGMENT_SHADER, o);
  if (!n || !r) return null;
  const s = t.createProgram();
  return t.attachShader(s, n), t.attachShader(s, r), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function o0() {
  const t = [], e = [];
  for (let o = 0; o <= ds; o++)
    for (let n = 0; n <= Bo; n++)
      t.push(n / Bo, o / ds * 2 - 1);
  for (let o = 0; o < ds; o++)
    for (let n = 0; n < Bo; n++) {
      const r = o * (Bo + 1) + n;
      e.push(r, r + Bo + 1, r + 1, r + 1, r + Bo + 1, r + Bo + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function n0({ phase: t, progress: e }) {
  const o = pt(null), n = pt(null);
  return Mt(() => {
    const r = o.current;
    if (!r) return;
    const s = window.devicePixelRatio || 1;
    r.width = r.clientWidth * s, r.height = r.clientHeight * s;
    const i = r.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const a = e0(i, _y, t0);
    if (!a) return;
    i.useProgram(a);
    const { vertices: h, indices: c } = o0(), l = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, l), i.bufferData(i.ARRAY_BUFFER, h, i.STATIC_DRAW);
    const p = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, p), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const d = i.getAttribLocation(a, "aUV");
    i.enableVertexAttribArray(d), i.vertexAttribPointer(d, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const f = (g) => i.getUniformLocation(a, g);
    return n.current = {
      gl: i,
      locs: { uLayPos: f("uLayPos"), uRadius: f("uRadius"), uSide: f("uSide"), uColor: f("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(a), i.deleteBuffer(l), i.deleteBuffer(p), n.current = null;
    };
  }, []), Mt(() => {
    const r = n.current;
    if (!r) return;
    const { gl: s, locs: i, count: a } = r, h = t === "out" ? 1 - Math.pow(1 - e, 3) : Math.pow(e, 3), c = t === "out" ? 1 - h : h, l = 0.07 + 0.16 * c;
    s.viewport(0, 0, s.canvas.width, s.canvas.height), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.uniform1f(i.uLayPos, c), s.uniform1f(i.uRadius, l), s.uniform1f(i.uSide, 1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, a, s.UNSIGNED_SHORT, 0), s.uniform1f(i.uSide, -1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, a, s.UNSIGNED_SHORT, 0);
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
const r0 = {
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
}, hs = {
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
}, Fs = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function za({ dir: t }) {
  return /* @__PURE__ */ S("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ u("polyline", { points: "15,18 9,12 15,6", ...Fs }),
    t === "right" && /* @__PURE__ */ u("polyline", { points: "9,6 15,12 9,18", ...Fs })
  ] });
}
function s0() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...Fs }) });
}
function Ta(t) {
  return 1 - Math.pow(1 - t, 3);
}
function Pa(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Aa(t, e) {
  let n;
  t <= 0.2 ? n = 1 + (0.55 - 1) * Ta(t / 0.2) : t >= 0.8 ? n = 0.55 + (1 - 0.55) * Ta((t - 0.8) / 0.2) : n = 0.55;
  let r;
  return t <= 0.1 ? r = 0 : t <= 0.5 ? r = -e * 90 * Pa((t - 0.1) / 0.4) : t <= 0.9 ? r = e * 90 * (1 - Pa((t - 0.5) / 0.4)) : r = 0, { zoom: n, angle: r };
}
function i0(t, e, o, n) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${n}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function Ea(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function a0({ engine: t }) {
  const [e, o] = et(t.presentationMode), [n, r] = et(t.presentationIndex), [s, i] = et(t.presentationSlides.length), [a, h] = et(""), [c, l] = et(t.transitionOverlay), p = pt(null), d = pt(null);
  if (Mt(() => {
    const g = document.querySelector("[data-sb-canvas]");
    p.current = g, d.current = (g == null ? void 0 : g.parentElement) ?? null;
    const m = () => {
      var w;
      if (o(t.presentationMode), r(t.presentationIndex), i(t.presentationSlides.length), l(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const v = t.presentationSlides[t.presentationIndex], M = t.getNode(v);
        h(((w = M == null ? void 0 : M.data) == null ? void 0 : w.label) || "");
      } else
        h("");
      const y = t.transitionOverlay, x = p.current, b = d.current;
      if (x && b && y && y.type === "cube" && y.t != null) {
        const v = y.direction ?? 1, { zoom: M, angle: C } = Aa(y.t, v);
        i0(x, b, M, C);
      } else x && b && Ea(x, b);
    };
    return t.on("presentation", m), () => {
      t.off("presentation", m);
      const y = p.current, x = d.current;
      y && x && Ea(y, x);
    };
  }, [t]), !e || s === 0) return null;
  const f = c && c.type === "cube" && c.t != null ? (() => {
    const g = c.direction ?? 1, { angle: m } = Aa(c.t, g);
    return Math.abs(m) / 90 * 0.4;
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
        c && c.type === "fold" && /* @__PURE__ */ u(n0, { phase: c.phase, progress: c.progress }),
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
        /* @__PURE__ */ S("div", { style: r0, onPointerDown: (g) => g.stopPropagation(), children: [
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...hs, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ u(s0, {})
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...hs, opacity: n <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: n <= 0,
              children: /* @__PURE__ */ u(za, { dir: "left" })
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
                a && /* @__PURE__ */ S("span", { style: { opacity: 0.6, marginLeft: 8 }, children: [
                  "— ",
                  a
                ] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...hs, opacity: n >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: n >= s - 1,
              children: /* @__PURE__ */ u(za, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
function fo(t) {
  return `${t.toFixed(2)} ms`;
}
function Ce(t, e) {
  return { label: t, value: e };
}
function l0() {
  const t = ee(), { labels: e } = Jt(), [o, n] = et(() => ke.getSnapshot());
  Mt(() => {
    let s = 0;
    const i = (h) => {
      ke.tick(h), s = requestAnimationFrame(i);
    };
    s = requestAnimationFrame(i);
    const a = ke.subscribe(() => n(ke.getSnapshot()));
    return () => {
      cancelAnimationFrame(s), a();
    };
  }, []);
  const r = Ut(
    () => [
      Ce(e.perfVirtualization, o.virtualizationActive ? e.perfOn : e.perfOff),
      Ce(e.perfFps, o.fps.toFixed(1)),
      Ce(e.perfFrameP50P95, `${fo(o.frameMsP50)} / ${fo(o.frameMsP95)}`),
      Ce(e.perfCullingP50P95, `${fo(o.cullingMsP50)} / ${fo(o.cullingMsP95)}`),
      Ce(e.perfHitTestP50P95, `${fo(o.hitTestMsP50)} / ${fo(o.hitTestMsP95)}`),
      Ce(e.perfEdgeHitP50P95, `${fo(o.edgeHitMsP50)} / ${fo(o.edgeHitMsP95)}`),
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
        /* @__PURE__ */ u("div", { style: { padding: "8px 10px", display: "grid", rowGap: 4 }, children: r.map((s) => /* @__PURE__ */ S("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
          /* @__PURE__ */ u("span", { style: { color: t.textMuted }, children: s.label }),
          /* @__PURE__ */ u("span", { children: s.value })
        ] }, s.label)) })
      ]
    }
  );
}
const c0 = Ac(() => import("./DebugPanel-Cg03bwav.js"));
function A0({
  nodeTypes: t = Au,
  engine: e,
  keyboardShortcuts: o = !0,
  style: n,
  initialData: r,
  toolbar: s = !0,
  debugPanel: i = !1,
  debugBoards: a,
  theme: h,
  onPresentationChange: c,
  gifApiBaseUrl: l,
  direction: p,
  localization: d,
  dataFlowEdgeOverlay: f = "off",
  initialFramesPanelOpen: g = !1
}) {
  const m = Ut(
    () => e ?? new Zd(),
    [e]
  ), y = Ut(() => new $d(t), [t]);
  Mt(() => ud(), []), Mt(() => {
    m.setRegistry(y);
  }, [m, y]), Mt(() => {
    for (const at of t)
      at.isContainer && m.registerContainerType(at.type);
  }, [m, t]);
  const x = pt(!1);
  Mt(() => {
    r && !x.current && (x.current = !0, m.fromSBD(r));
  }, [m, r]);
  const b = pt(null);
  Mt(() => {
    if (o)
      return Zp(m, b.current);
  }, [m, o]);
  const w = Ut(() => t.some((xt) => {
    var O;
    return (O = xt.ports) == null ? void 0 : O.length;
  }) ? new Eu(m, y) : null, [m, y, t]);
  Mt(() => {
    if (w)
      return w.connect();
  }, [w]);
  const v = Ut(
    () => h ? { ...Ps, ...h } : Ps,
    [h]
  ), M = Ou(p, d), [C, z] = et(!1), [A, P] = et(g), [Y, G] = et(!0), [rt, st] = et(!1);
  return Mt(() => {
    ke.setEnabled(rt);
  }, [rt]), Mt(() => {
    const at = () => {
      const xt = m.presentationMode;
      z(xt), c == null || c(xt);
    };
    return m.on("presentation", at), () => m.off("presentation", at);
  }, [m, c]), /* @__PURE__ */ u(ul.Provider, { value: M, children: /* @__PURE__ */ u(hl.Provider, { value: v, children: /* @__PURE__ */ S(
    "div",
    {
      ref: b,
      dir: M.dir,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        ...n
      },
      children: [
        s && !C && /* @__PURE__ */ u(Fy, { engine: m, registry: y, gifApiBaseUrl: l }),
        i && /* @__PURE__ */ u(Pc, { fallback: null, children: /* @__PURE__ */ u(c0, { engine: m, extraBoards: a }) }),
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !C && !M.isRTL ? eo : 0,
              top: 0,
              right: s && !C && M.isRTL ? eo : 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ u(
                Mf,
                {
                  engine: m,
                  schema: Os,
                  registry: y,
                  dataFlow: w,
                  dataFlowEdgeOverlay: f,
                  minimapVisible: Y
                }
              ),
              !C && /* @__PURE__ */ u(jy, { engine: m }),
              !C && /* @__PURE__ */ u(
                Yy,
                {
                  engine: m,
                  framesPanelOpen: A,
                  onToggleFramesPanel: () => P((at) => !at),
                  showMinimap: Y,
                  onToggleMinimap: () => G((at) => !at),
                  showPerfOverlay: rt,
                  onTogglePerfOverlay: () => st((at) => !at)
                }
              ),
              !C && rt && /* @__PURE__ */ u(l0, {}),
              !C && /* @__PURE__ */ u(
                $y,
                {
                  engine: m,
                  open: A,
                  onClose: () => P(!1)
                }
              ),
              /* @__PURE__ */ u(a0, { engine: m })
            ]
          }
        )
      ]
    }
  ) }) });
}
const d0 = [
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
}, ce = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Tn({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...ce }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ...ce })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...ce }),
    t === "text" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M7 4h10", ...ce }),
      /* @__PURE__ */ u("path", { d: "M12 4v16", ...ce })
    ] }),
    t === "note" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ...ce }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...ce }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...ce, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...ce, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...ce, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...ce }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ...ce })
    ] }),
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...ce }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...ce }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...ce }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...ce }),
    t === "arrow" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...ce }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...ce, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ce, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...ce, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ce, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...ce, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ...ce }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...ce }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...ce })
    ] }),
    t === "fit" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...ce }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...ce })
    ] })
  ] });
}
function E0({ engine: t }) {
  const [e, o] = et(t.mode), [n, r] = et(!1), [s, i] = et(!1), [a, h] = et(t.boardBackground);
  return Mt(() => {
    const c = () => o(t.mode), l = () => {
      r(t.canUndo()), i(t.canRedo());
    }, p = () => h(t.boardBackground);
    return t.on("mode", c), t.on("history", l), t.on("background", p), () => {
      t.off("mode", c), t.off("history", l), t.off("background", p);
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
        d0.map((c) => /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(Tn, { name: c.key })
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
              ...an,
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
              ...an,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(Tn, { name: "print" })
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
            disabled: !n,
            style: {
              ...an,
              width: 36,
              height: 36,
              background: "transparent",
              color: n ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(Tn, { name: "undo" })
          }
        ),
        /* @__PURE__ */ u(
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
            children: /* @__PURE__ */ u(Tn, { name: "redo" })
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
              ...an,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(Tn, { name: "fit" })
          }
        )
      ]
    }
  );
}
const yo = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], h0 = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], u0 = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], ln = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], p0 = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], cn = [1, 2.5, 5, 10, 20], f0 = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], y0 = [14, 20, 28, 36], g0 = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], us = 300, _t = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, te = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0
}, se = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
};
function L0({
  engine: t,
  registry: e
}) {
  const [o, n] = et(t.mode), [r, s] = et(t.selection), [, i] = et(0), [a, h] = et(null), c = pt(null), l = pt(null), [p, d] = et(!1), f = lt(() => {
    var ut;
    return { x: (((ut = c.current) == null ? void 0 : ut.ownerDocument.defaultView) ?? window).innerWidth - us - 12, y: 12 };
  }, []), g = a ?? f();
  Mt(() => {
    const I = () => n(t.mode), ut = () => {
      s(new Set(t.selection)), i((re) => re + 1);
    }, de = () => i((re) => re + 1);
    return t.on("mode", I), t.on("selection", ut), t.on("change", de), () => {
      t.off("mode", I), t.off("selection", ut), t.off("change", de);
    };
  }, [t]);
  const m = lt((I) => {
    I.stopPropagation(), d(!0);
    const ut = a ? a.x : f().x, de = a ? a.y : f().y;
    l.current = { startX: I.clientX, startY: I.clientY, startLeft: ut, startTop: de }, I.currentTarget.setPointerCapture(I.pointerId);
  }, [a, f]);
  Mt(() => {
    var re;
    const I = (Re) => {
      var ro;
      if (!l.current) return;
      const qt = Re.clientX - l.current.startX, Po = Re.clientY - l.current.startY, Ao = ((ro = c.current) == null ? void 0 : ro.ownerDocument.defaultView) ?? window, je = Math.max(48, Math.min(Ao.innerWidth - us - 8, l.current.startLeft + qt)), Eo = Math.max(8, Math.min(Ao.innerHeight - 100, l.current.startTop + Po));
      h({ x: je, y: Eo });
    }, ut = () => {
      l.current = null, d(!1);
    }, de = ((re = c.current) == null ? void 0 : re.ownerDocument) ?? document;
    return de.addEventListener("pointermove", I), de.addEventListener("pointerup", ut), de.addEventListener("pointercancel", ut), () => {
      de.removeEventListener("pointermove", I), de.removeEventListener("pointerup", ut), de.removeEventListener("pointercancel", ut);
    };
  }, []);
  const y = Ut(() => r.size === 1 ? Array.from(r)[0] : o === "draw" || o === "shape" || o === "text" || o === "edge" ? "tool" : "none", [r, o]), x = Ar(t, y), b = (() => {
    if (r.size === 1) {
      const I = Array.from(r)[0], ut = t.getNode(I);
      if ((ut == null ? void 0 : ut.type) === "shape") return { kind: "shape", node: ut };
      if ((ut == null ? void 0 : ut.type) === "draw") return { kind: "draw", node: ut };
      if ((ut == null ? void 0 : ut.type) === "text") return { kind: "text", node: ut };
      if ((ut == null ? void 0 : ut.type) === "edge") return { kind: "edge", node: ut };
      if ((ut == null ? void 0 : ut.type) === "image") return { kind: "image", node: ut };
      if ((ut == null ? void 0 : ut.type) === "content") return { kind: "content", node: ut };
      if ((ut == null ? void 0 : ut.type) === "frame") return { kind: "frame", node: ut };
      if ((ut == null ? void 0 : ut.type) === "sticky") return { kind: "sticky", node: ut };
      if (ut && e) {
        const de = e.get(ut.type);
        if (de != null && de.propertiesPanel)
          return { kind: "custom", node: ut, PanelComponent: de.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" || o === "edge" ? { kind: "tool" } : null;
  })(), w = lt(
    (I) => {
      if (!b || b.kind !== "shape") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  ), v = lt(
    (I) => {
      if (!b || b.kind !== "draw") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  ), M = lt(
    (I) => {
      if (!b || b.kind !== "text") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  ), C = lt(
    (I) => {
      if (!b || b.kind !== "edge") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  ), z = lt(
    (I) => {
      if (!b || b.kind !== "image") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  ), A = lt(
    (I) => {
      if (!b || b.kind !== "content") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  ), P = lt(
    (I) => {
      if (!b || b.kind !== "frame") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  ), Y = lt(
    (I) => {
      if (!b || b.kind !== "sticky") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  ), G = lt(
    (I) => {
      if (!b || b.kind !== "custom") return;
      const ut = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        ut
      );
    },
    [t, b, x]
  );
  if (!b) return null;
  const rt = b.kind === "custom", st = b.kind === "shape", at = b.kind === "draw", xt = b.kind === "text", O = b.kind === "edge", _ = b.kind === "image", W = b.kind === "content", Z = b.kind === "frame", tt = b.kind === "sticky", K = b.kind === "tool", H = K && o === "shape", $ = K && o === "text", ot = xt ? b.node.data.fontFamily : t.activeTool.fontFamily ?? wo, it = xt ? b.node.data.fontSize : t.activeTool.fontSize ?? 20, Q = xt ? b.node.data.align : t.activeTool.textAlign ?? "left", ct = xt ? b.node.data.color : t.activeTool.color, yt = st ? b.node.data.stroke : at ? b.node.data.color : t.activeTool.color, J = st || at ? b.node.data.fill ?? null : t.activeTool.fillColor ?? null, dt = st || at ? b.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", wt = st || at ? b.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", gt = st || at ? b.node.data.strokeWidth : t.activeTool.width, mt = st ? b.node.data.roughness : t.activeTool.roughness ?? 1, At = st || at || xt || _ || W || Z || tt ? b.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Nt = (() => {
    const I = /* @__PURE__ */ new Set(), ut = [];
    for (const de of t.getAllNodes())
      if (de.type === "text") {
        const re = de.data.fontFamily;
        re && !I.has(re) && (I.add(re), ut.push(re));
      }
    return ut;
  })(), Lt = !xt && !$ && !O && !_ && !W && !Z && !tt && !rt, ft = Lt, Xt = Lt, Gt = st || H, Kt = xt || $, $t = (I) => {
    st ? w({ stroke: I }) : at ? v({ color: I }) : (t.activeTool.color = I, i((ut) => ut + 1));
  }, ht = (I) => {
    st ? w({ fill: I ?? void 0 }) : at ? v({ fill: I ?? void 0 }) : (t.activeTool.fillColor = I ?? void 0, i((ut) => ut + 1));
  }, ae = (I) => {
    st ? w({ fillStyle: I }) : at ? v({ fillStyle: I }) : (t.activeTool.fillStyle = I, i((ut) => ut + 1));
  }, he = (I) => {
    st ? w({ strokeStyle: I }) : at ? v({ strokeStyle: I }) : (t.activeTool.strokeStyle = I, i((ut) => ut + 1));
  }, le = (I) => {
    st ? w({ strokeWidth: I }) : at ? v({ strokeWidth: I }) : (t.activeTool.width = I, i((ut) => ut + 1));
  }, ie = (I) => {
    st ? w({ roughness: I }) : (t.activeTool.roughness = I, i((ut) => ut + 1));
  }, be = (I) => {
    st ? w({ opacity: I }) : at ? v({ opacity: I }) : xt ? M({ opacity: I }) : _ ? z({ opacity: I }) : W ? A({ opacity: I }) : Z ? P({ opacity: I }) : tt ? Y({ opacity: I }) : (t.activeTool.opacity = I, i((ut) => ut + 1));
  }, ve = (I) => {
    xt ? M({ fontFamily: I }) : (t.activeTool.fontFamily = I, i((ut) => ut + 1));
  }, Fe = (I) => {
    xt ? M({ fontSize: I }) : (t.activeTool.fontSize = I, i((ut) => ut + 1));
  }, Uo = (I) => {
    xt ? M({ align: I }) : (t.activeTool.textAlign = I, i((ut) => ut + 1));
  }, Je = (I) => {
    xt ? M({ color: I }) : (t.activeTool.color = I, i((ut) => ut + 1));
  }, xe = {
    position: "fixed",
    left: g.x,
    top: g.y,
    width: us,
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
      style: xe,
      onPointerDown: (I) => I.stopPropagation(),
      children: [
        /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: m,
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
        Kt && /* @__PURE__ */ S(St, { children: [
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Font" }),
            /* @__PURE__ */ u(
              Lr,
              {
                value: ot,
                onChange: ve,
                fontsInScene: Nt
              }
            )
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Size" }),
            y0.map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Fe(I),
                style: {
                  ...se,
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
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Align" }),
            g0.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.key,
                onClick: () => Uo(I.key),
                style: {
                  ...se,
                  width: 36,
                  height: 28,
                  background: Q === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: I.label
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Color" }),
            yo.map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Je(I),
                style: {
                  ...se,
                  width: 20,
                  height: 20,
                  background: I,
                  border: ct === I ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          xt && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Border" }),
            [null, ...yo].map((I, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => M({ borderColor: I ?? void 0 }),
                style: {
                  ...se,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
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
              I ?? "none"
            ))
          ] }),
          xt && b.node.data.borderColor && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => M({ borderStyle: I.key }),
                style: {
                  ...se,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          xt && b.node.data.borderColor && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: `${I}px`,
                onClick: () => M({ borderWidth: I }),
                style: {
                  ...se,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
        Lt && /* @__PURE__ */ S(St, { children: [
          H && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Shape" }),
            f0.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => {
                  t.activeTool.shapeType = I.key, i((ut) => ut + 1);
                },
                style: {
                  ...se,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(m0, { name: I.key })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Stroke" }),
            yo.map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => $t(I),
                style: {
                  ...se,
                  width: 20,
                  height: 20,
                  background: I,
                  border: yt === I ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          ft && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Fill" }),
            h0.map((I, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => ht(I),
                style: {
                  ...se,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: J === I ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
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
              I ?? "none"
            ))
          ] }),
          ft && J && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Fill pattern" }),
            u0.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => ae(I.key),
                style: {
                  ...se,
                  width: 36,
                  height: 28,
                  background: dt === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(b0, { style: I.key })
              },
              I.key
            ))
          ] }),
          Xt && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Stroke style" }),
            ln.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => he(I.key),
                style: {
                  ...se,
                  width: 36,
                  height: 28,
                  background: wt === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Stroke width" }),
            cn.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: `${I}px`,
                onClick: () => le(I),
                style: {
                  ...se,
                  width: 36,
                  height: 24,
                  background: gt === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
          Gt && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Roughness" }),
            p0.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => ie(I.value),
                style: {
                  ...se,
                  height: 28,
                  padding: "0 8px",
                  background: mt === I.value ? "#3b82f6" : "#2a2a3e",
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
        O && /* @__PURE__ */ S(St, { children: [
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Color" }),
            yo.map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => C({ color: I }),
                style: {
                  ...se,
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
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => C({ style: I.key }),
                style: {
                  ...se,
                  width: 36,
                  height: 28,
                  background: b.node.data.style === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: `${I}px`,
                onClick: () => C({ strokeWidth: I }),
                style: {
                  ...se,
                  width: 36,
                  height: 24,
                  background: b.node.data.strokeWidth === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => C({ arrowHead: I }),
                style: {
                  ...se,
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
          (b.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Head size" }),
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => C({ arrowTail: I }),
                style: {
                  ...se,
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
          (b.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Tail size" }),
            /* @__PURE__ */ u(
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
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Label" }),
            /* @__PURE__ */ u(
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
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => C({ edgeType: I.key }),
                style: {
                  ...se,
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
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Animate" }),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: () => C({ animated: !b.node.data.animated }),
                style: {
                  ...se,
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
          b.node.data.animated && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Direction" }),
            ["forward", "reverse", "both"].map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => C({ animatedDirection: I }),
                style: {
                  ...se,
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
        _ && /* @__PURE__ */ S(St, { children: [
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Border" }),
            [null, ...yo].map((I, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => z({ borderColor: I ?? void 0 }),
                style: {
                  ...se,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
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
              I ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => z({ borderStyle: I.key }),
                style: {
                  ...se,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: `${I}px`,
                onClick: () => z({ borderWidth: I }),
                style: {
                  ...se,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
        W && /* @__PURE__ */ S(St, { children: [
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Border" }),
            [null, ...yo].map((I, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => A({ borderColor: I ?? void 0 }),
                style: {
                  ...se,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`,
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
              I ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => A({ borderStyle: I.key }),
                style: {
                  ...se,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: `${I}px`,
                onClick: () => A({ borderWidth: I }),
                style: {
                  ...se,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
        Z && /* @__PURE__ */ S(St, { children: [
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Label" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (I) => P({ label: I.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Background" }),
            [null, ...yo].map((I, ut) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => P({ backgroundColor: I ? `${I}15` : void 0 }),
                style: {
                  ...se,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (() => {
                    const de = b.node.data.backgroundColor;
                    return (I === null ? !de : de === `${I}15`) ? "2px solid white" : `2px solid ${ut === 0 ? "#555" : "transparent"}`;
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
              I ?? "none"
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Border" }),
            yo.map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => P({ borderColor: I }),
                style: {
                  ...se,
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
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Style" }),
            ln.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: I.label,
                onClick: () => P({ borderStyle: I.key }),
                style: {
                  ...se,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "dashed") === I.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: I.dash
                  }
                ) })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Width" }),
            cn.map((I) => /* @__PURE__ */ u(
              "button",
              {
                title: `${I}px`,
                onClick: () => P({ borderWidth: I }),
                style: {
                  ...se,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === I ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
        tt && /* @__PURE__ */ S(St, { children: [
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Y({ color: I }),
                style: {
                  ...se,
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
          /* @__PURE__ */ S("div", { style: _t, children: [
            /* @__PURE__ */ u("span", { style: te, children: "Size" }),
            [12, 14, 16, 20, 24].map((I) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Y({ fontSize: I }),
                style: {
                  ...se,
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
        rt && (() => {
          const { node: I, PanelComponent: ut } = b;
          return /* @__PURE__ */ u(ut, { node: I, data: I.data, engine: t, updateData: G });
        })(),
        !O && !rt && /* @__PURE__ */ S("div", { style: _t, children: [
          /* @__PURE__ */ u("span", { style: te, children: "Opacity" }),
          /* @__PURE__ */ u(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(At * 100),
              onChange: (I) => be(parseInt(I.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(At * 100) })
        ] })
      ]
    }
  );
}
function m0({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function b0({ style: t }) {
  return t === "hachure" ? /* @__PURE__ */ S("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ S("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ u("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ u("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: "white", strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ u("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ u("rect", { x: 2, y: 2, width: 16, height: 12, fill: "white", rx: 2 }) });
}
function R0({
  preview: t,
  engine: e,
  zoom: o
}) {
  var at;
  const n = e.getNode(t.fromNodeId);
  if (!n) return null;
  const r = e.getRegistry(), s = e.getAllNodes(), i = e.measuredHeights, a = t.cursorX, h = t.cursorY, c = t.edgeColor || "#3b82f6", l = t.edgeStrokeWidth || 2, p = t.edgeStyle || "solid", d = p === "dashed" ? `${8 * l},${4 * l}` : p === "dotted" ? `${2 * l},${3 * l}` : void 0, f = Math.max(8, l * 3), g = 4 / o, m = {
    fromNode: n,
    sourceHandle: t.sourceHandle,
    sourceT: t.sourceT,
    sourcePort: t.sourcePort,
    sourceDirection: t.sourceDirection,
    edgeType: t.edgeType,
    attachmentGap: t.attachmentGap
  }, y = r == null ? void 0 : r.get(m.fromNode.type), x = m.sourcePort && (y != null && y.ports) ? Te(
    m.fromNode,
    y.ports,
    m.sourcePort,
    o,
    i,
    y.portAnchor ?? "bbox"
  ) ?? void 0 : void 0, b = m.sourcePort && (y != null && y.ports) ? y.ports.find((xt) => xt.id === m.sourcePort) : void 0, w = m.sourceDirection === "output" ? "input" : m.sourceDirection === "input" ? "output" : null;
  let v = null, M, C = null;
  if (r && m.sourcePort && w && b) {
    const xt = Gs / o;
    let O = 1 / 0;
    for (const _ of s) {
      if (_.type === "edge" || _.id === m.fromNode.id) continue;
      const W = r.get(_.type);
      if (!((at = W == null ? void 0 : W.ports) != null && at.length)) continue;
      const Z = W.ports.filter((tt) => tt.direction === w);
      for (const tt of Z) {
        if (b.dataType !== "any" && tt.dataType !== "any" && b.dataType !== tt.dataType)
          continue;
        const K = Te(_, W.ports, tt.id, o, i, W.portAnchor ?? "bbox");
        if (!K) continue;
        const H = Math.hypot(K.x - a, K.y - h);
        H < xt && H < O && (O = H, v = _, C = tt.id);
      }
    }
  }
  if (!C) {
    const xt = 50 / o;
    for (const O of s) {
      if (O.type === "edge" || O.id === m.fromNode.id) continue;
      const _ = O.h === "auto" ? (i == null ? void 0 : i[O.id]) ?? 100 : O.h, W = O.w * 0.2, Z = _ * 0.2;
      if (a >= O.x - W && a <= O.x + O.w + W && h >= O.y - Z && h <= O.y + _ + Z) {
        const tt = Be(O, a, h, i);
        if (Math.hypot(tt.x - a, tt.y - h) < xt) {
          v = O, M = tt.t;
          break;
        }
      }
    }
  }
  const z = v ? r == null ? void 0 : r.get(v.type) : void 0, A = v && C && (z != null && z.ports) ? Te(
    v,
    z.ports,
    C,
    o,
    i,
    z.portAnchor ?? "bbox"
  ) ?? void 0 : void 0, P = x ? void 0 : m.sourceT, Y = A ? void 0 : M;
  let G;
  if (v)
    G = Pe(
      m.fromNode,
      v,
      m.edgeType || "bezier",
      i,
      m.sourceHandle,
      void 0,
      void 0,
      void 0,
      x,
      A,
      P,
      Y,
      m.attachmentGap
    );
  else {
    const xt = {
      id: "__preview__",
      type: "shape",
      x: a,
      y: h,
      w: 0,
      h: 0,
      data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
    };
    G = Pe(
      m.fromNode,
      xt,
      m.edgeType || "bezier",
      i,
      m.sourceHandle,
      void 0,
      void 0,
      void 0,
      x,
      void 0,
      P,
      void 0,
      m.attachmentGap
    );
  }
  const rt = !x, st = !!(v && !A);
  return /* @__PURE__ */ S("g", { children: [
    /* @__PURE__ */ u(
      "path",
      {
        d: G.path,
        stroke: c,
        strokeWidth: l,
        strokeDasharray: d,
        strokeLinecap: "round",
        fill: "none"
      }
    ),
    /* @__PURE__ */ u(
      "path",
      {
        d: go(G.x2, G.y2, G.arrowAngle, f),
        fill: "none",
        stroke: c,
        strokeWidth: l,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    rt && /* @__PURE__ */ u(
      "circle",
      {
        cx: G.x1,
        cy: G.y1,
        r: g,
        fill: c,
        stroke: "white",
        strokeWidth: 1.5 / o
      }
    ),
    st && /* @__PURE__ */ u(
      "circle",
      {
        cx: G.x2,
        cy: G.y2,
        r: g,
        fill: c,
        stroke: "white",
        strokeWidth: 1.5 / o
      }
    )
  ] });
}
function D0({
  preview: t,
  zoom: e
}) {
  const o = Math.min(t.startX, t.endX), n = Math.min(t.startY, t.endY), r = Math.abs(t.endX - t.startX), s = Math.abs(t.endY - t.startY);
  return r < 2 && s < 2 ? null : t.kind === "frame" ? /* @__PURE__ */ u(
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
  ) : /* @__PURE__ */ u(
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
const ps = 400;
function x0(t, e) {
  return t.h !== "auto" ? t.h : e[t.id] ?? 100;
}
function W0({
  eraser: t,
  engine: e,
  zoom: o
}) {
  var l;
  const [, n] = et(0);
  Mt(() => {
    const p = t.trail && t.trail.length > 0, d = t.markedIds && t.markedIds.length > 0;
    if (!p && !d) return;
    let f = 0;
    const g = () => {
      n(performance.now()), f = requestAnimationFrame(g);
    };
    return f = requestAnimationFrame(g), () => cancelAnimationFrame(f);
  }, [t.trail, t.markedIds]);
  const r = Date.now(), s = ((l = t.trail) == null ? void 0 : l.filter((p) => r - p[2] < ps)) ?? [], i = e.measuredHeights, a = 6 / o;
  let h = null;
  if (s.length > 1) {
    const p = [`M${s[0][0]},${s[0][1]}`];
    if (s.length === 2)
      p.push(`L${s[1][0]},${s[1][1]}`);
    else {
      for (let w = 0; w < s.length - 1; w++) {
        const v = (s[w][0] + s[w + 1][0]) / 2, M = (s[w][1] + s[w + 1][1]) / 2;
        p.push(`Q${s[w][0]},${s[w][1]},${v},${M}`);
      }
      const b = s[s.length - 1];
      p.push(`L${b[0]},${b[1]}`);
    }
    const d = p.join(" "), f = (r - s[s.length - 1][2]) / ps, g = (r - s[0][2]) / ps, m = Math.max(0, 0.85 * (1 - f)), y = Math.max(0, 0.85 * (1 - g)), x = (m + y) / 2;
    x > 0 && (h = /* @__PURE__ */ S(St, { children: [
      /* @__PURE__ */ u(
        "path",
        {
          d,
          fill: "none",
          stroke: "#9ca3af",
          strokeWidth: a * 3,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: x * 0.35
        }
      ),
      /* @__PURE__ */ u(
        "path",
        {
          d,
          fill: "none",
          stroke: "#d1d5db",
          strokeWidth: a,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          opacity: x
        }
      )
    ] }));
  }
  const c = [];
  for (const p of t.markedIds ?? []) {
    const d = e.getNode(p);
    if (!d || d.type === "edge") continue;
    const f = x0(d, i);
    if (d.w < 1 || f < 1) continue;
    const g = d.rotation ?? 0, m = d.x + d.w / 2, y = d.y + f / 2;
    c.push(
      /* @__PURE__ */ u("g", { transform: g ? `rotate(${g}, ${m}, ${y})` : void 0, children: /* @__PURE__ */ u(
        "rect",
        {
          x: d.x,
          y: d.y,
          width: d.w,
          height: f,
          fill: "rgba(0,0,0,0.2)",
          stroke: "rgba(100,100,100,0.35)",
          strokeWidth: 1 / o,
          rx: 4 / o
        }
      ) }, p)
    );
  }
  return !h && c.length === 0 ? null : /* @__PURE__ */ S("g", { children: [
    h,
    c
  ] });
}
export {
  fd as A,
  Do as B,
  mp as C,
  wo as D,
  qo as E,
  bp as F,
  ld as G,
  Zp as H,
  iu as I,
  ku as J,
  no as K,
  yu as L,
  Jt as M,
  $d as N,
  ee as O,
  fn as P,
  R0 as R,
  P0 as S,
  E0 as T,
  As as a,
  Ps as b,
  Eu as c,
  L0 as d,
  W0 as e,
  D0 as f,
  Fy as g,
  A0 as h,
  Mf as i,
  Zd as j,
  Au as k,
  ih as l,
  ru as m,
  Rt as n,
  lu as o,
  mu as p,
  Fn as q,
  Tr as r,
  zr as s,
  Ir as t,
  Ho as u,
  Wn as v,
  qs as w,
  uu as x,
  Ys as y,
  vs as z
};
