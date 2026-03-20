var Ll = Object.defineProperty;
var Rl = (t, e, o) => e in t ? Ll(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var xt = (t, e, o) => Rl(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as Dl, defaultBlockSpecs as Wl, BlockNoteEditor as Fl } from "@blocknote/core";
import { jsxs as S, jsx as h, Fragment as kt } from "react/jsx-runtime";
import Bl, { memo as Me, useRef as ht, useState as ot, useEffect as vt, useCallback as dt, Component as Nl, useMemo as Vt, useLayoutEffect as nn, useContext as qe, createContext as sn, Suspense as Hl, lazy as Ol } from "react";
import { useCreateBlockNote as Xl } from "@blocknote/react";
import { BlockNoteView as Gl } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as Qe, flushSync as Yl } from "react-dom";
const jl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Pt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += jl[o[t] & 63];
  return e;
};
const Vl = {
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
}, Kl = {
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
}, ql = {
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
}, Ul = {
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
}, Zl = {
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
}, Ql = {
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
}, Jl = {
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
}, $l = {
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
}, _l = {
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
}, tc = {
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
}, ec = {
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
}, oc = {
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
}, oa = [
  Vl,
  Kl,
  ql,
  Ul,
  Zl,
  Ql,
  Jl,
  $l,
  _l,
  tc,
  ec,
  oc
];
class rc {
  constructor() {
    xt(this, "undoStack", []);
    xt(this, "redoStack", []);
    xt(this, "maxSize", 50);
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
const ra = 4, nc = 8, na = 6, sa = 6, sc = 10, ic = 14, ac = 24;
function Eo(t, e, o, r) {
  if (!t.rotation) return [e, o];
  const n = t.x + t.w / 2, s = t.y + r / 2, i = -t.rotation * Math.PI / 180, a = Math.cos(i), l = Math.sin(i), c = e - n, u = o - s;
  return [n + c * a - u * l, s + c * l + u * a];
}
function qr(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function lc(t) {
  return Math.max(0.01, t);
}
function kr(t, e) {
  return t / lc(e);
}
function cc(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, u) => u.z - c.z);
  let a = null, l = null;
  for (const c of i)
    if (c.type === "draw") {
      if (ms(c, e, o, r))
        return c;
    } else if (c.type === "shape") {
      if (an(c, e, o, r)) return c;
      if (!l && c.data.label) {
        const u = c.h === "auto" ? 100 : c.h, [p, d] = Eo(c, e, o, u), f = la(c, u);
        f && p >= f.lx && p <= f.rx && d >= f.ly && d <= f.ry && (l = c);
      }
    } else if (s && s.has(c.type)) {
      const u = qr(c, n);
      ia(c, e, o, r, u) && (a || (a = c));
    } else {
      const u = qr(c, n), p = kr(Math.max(ra, sa), r), [d, f] = Eo(c, e, o, u);
      d >= c.x - p && d <= c.x + c.w + p && f >= c.y - p && f <= c.y + u + p && (l || (l = c));
    }
  return l ?? a;
}
function ia(t, e, o, r, n) {
  const s = n ?? (t.h === "auto" ? 100 : t.h), [i, a] = Eo(t, e, o, s), l = r < 0.8 ? ic : sc, c = kr(Math.max(nc, l), r);
  if (t.data.label && i >= t.x && i <= t.x + t.w && a >= t.y - ac && a <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || a < t.y - c || a > t.y + s + c)
    return !1;
  const p = Math.abs(i - t.x), d = Math.abs(i - (t.x + t.w)), f = Math.abs(a - t.y), m = Math.abs(a - (t.y + s)), y = i >= t.x - c && i <= t.x + t.w + c;
  return a >= t.y - c && a <= t.y + s + c && (p <= c || d <= c) || y && (f <= c || m <= c);
}
function aa(t, e, o, r, n, s) {
  const i = n - o, a = s - r, l = i * i + a * a;
  if (l === 0) return (t - o) ** 2 + (e - r) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * a) / l)), u = o + c * i, p = r + c * a;
  return (t - u) ** 2 + (e - p) ** 2;
}
function la(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const r = o.labelFontSize ?? 14, n = r * 1.3, s = r * 0.55, a = t.w - 12 * 2, l = o.label.split(`
`);
  let c = 0;
  for (const m of l) {
    const y = m.length * s;
    c += Math.max(1, Math.ceil(y / Math.max(a, 1)));
  }
  const u = c * n, p = Math.min(a, Math.max(...l.map((m) => m.length)) * s), d = t.x + t.w / 2, f = t.y + e / 2;
  return {
    lx: d - p / 2 - 4,
    ly: f - u / 2 - 4,
    rx: d + p / 2 + 4,
    ry: f + u / 2 + 4
  };
}
function an(t, e, o, r, n) {
  const s = t.h === "auto" ? 100 : t.h, [i, a] = Eo(t, e, o, s), l = t.data, c = l.strokeWidth ?? 2, u = kr(Math.max(c / 2, na), r), p = !!l.fill || !!n;
  switch (l.shape) {
    case "rect": {
      if (p)
        return i >= t.x - u && i <= t.x + t.w + u && a >= t.y - u && a <= t.y + s + u;
      const d = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), m = Math.abs(a - t.y), y = Math.abs(a - (t.y + s)), b = i >= t.x - u && i <= t.x + t.w + u;
      return a >= t.y - u && a <= t.y + s + u && (d <= u || f <= u) || b && (m <= u || y <= u);
    }
    case "ellipse": {
      const d = t.x + t.w / 2, f = t.y + s / 2, m = t.w / 2, y = s / 2;
      if (m === 0 || y === 0) return !1;
      const b = (i - d) / m, x = (a - f) / y, g = b * b + x * x;
      if (p) {
        const M = ((m + u) / m) ** 2;
        return g <= M;
      }
      const k = u / Math.min(m, y);
      return Math.abs(Math.sqrt(g) - 1) <= k;
    }
    case "diamond": {
      const d = t.x + t.w / 2, f = t.y + s / 2, m = t.w / 2, y = s / 2;
      if (m === 0 || y === 0) return !1;
      const b = Math.abs(i - d) / m, x = Math.abs(a - f) / y, g = b + x;
      if (p) {
        const M = u / Math.min(m, y);
        return g <= 1 + M;
      }
      const k = u / Math.min(m, y);
      return Math.abs(g - 1) <= k;
    }
    case "line":
    case "arrow": {
      const d = l.startPoint ?? [0, 0], f = l.endPoint ?? [t.w, s], m = t.x + d[0], y = t.y + d[1], b = t.x + f[0], x = t.y + f[1];
      return aa(i, a, m, y, b, x) <= u * u;
    }
    default:
      return i >= t.x - u && i <= t.x + t.w + u && a >= t.y - u && a <= t.y + s + u;
  }
}
function dc(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const i = o[n][0], a = o[n][1], l = o[s][0], c = o[s][1];
    a > e != c > e && t < (l - i) * (e - a) / (c - a) + i && (r = !r);
  }
  return r;
}
function ms(t, e, o, r) {
  const n = t.data.strokeWidth, s = kr(Math.max(n / 2, na), r), i = s * s, a = t.h === "auto" ? 100 : t.h, [l, c] = Eo(t, e, o, a);
  if (l < t.x - s || l > t.x + t.w + s || c < t.y - s || c > t.y + a + s)
    return !1;
  const u = t.data.points;
  if (!u || u.length === 0) return !1;
  const p = l - t.x, d = c - t.y;
  if (u.length === 1) {
    const f = p - u[0][0], m = d - u[0][1];
    return f * f + m * m <= i;
  }
  if (t.data.fill && u.length >= 3 && dc(p, d, u))
    return !0;
  for (let f = 0; f < u.length - 1; f++)
    if (aa(p, d, u[f][0], u[f][1], u[f + 1][0], u[f + 1][1]) <= i)
      return !0;
  return !1;
}
function hc(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, u) => u.z - c.z), a = [], l = [];
  for (const c of i)
    if (c.type === "draw")
      ms(c, e, o, r) && a.push(c);
    else if (c.type === "shape") {
      if (an(c, e, o, r))
        a.push(c);
      else if (c.data.label) {
        const u = c.h === "auto" ? 100 : c.h, [p, d] = Eo(c, e, o, u), f = la(c, u);
        f && p >= f.lx && p <= f.rx && d >= f.ly && d <= f.ry && l.push(c);
      }
    } else if (s && s.has(c.type)) {
      const u = qr(c, n);
      ia(c, e, o, r, u) && l.push(c);
    } else {
      const u = qr(c, n), p = kr(Math.max(ra, sa), r), [d, f] = Eo(c, e, o, u);
      d >= c.x - p && d <= c.x + c.w + p && f >= c.y - p && f <= c.y + u + p && l.push(c);
    }
  return [...a, ...l];
}
function Rr(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, r = t.y + e / 2, n = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, a = Math.abs(Math.cos(i)), l = Math.abs(Math.sin(i)), c = n * a + s * l, u = n * l + s * a;
  return {
    x: o - c,
    y: r - u,
    w: c * 2,
    h: u * 2
  };
}
const Ne = class Ne {
  constructor(e, o = 0, r) {
    // Increased depth for potentially large boards
    xt(this, "level");
    xt(this, "bounds");
    xt(this, "objects");
    xt(this, "nodes");
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    xt(this, "heightMap");
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
    this.nodes[0] = new Ne({ x: r + e, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new Ne({ x: r, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new Ne({ x: r, y: n + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new Ne({ x: r + e, y: n + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const n = Rr(e, r);
    if (this.nodes.length) {
      const s = this.getIndex(n);
      if (s !== -1) {
        this.nodes[s].insert(e, r);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > Ne.MAX_OBJECTS && this.level < Ne.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], a = this.resolveH(i), l = Rr(i, a), c = this.getIndex(l);
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
      const r = this.resolveH(e), n = this.getIndex(Rr(e, r));
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
      const s = this.resolveH(n), i = Rr(n, s);
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
xt(Ne, "MAX_OBJECTS", 10), // Max depth of the tree
xt(Ne, "MAX_LEVELS", 8);
let $n = Ne;
function or(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function rr(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function uc(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function pc(t, e, o, r) {
  const n = e > 0 ? 0.95 : 1.05, s = or(t.zoom * n, 0.1, 5), i = rr(t, o, r);
  return {
    x: o - i.x * s,
    y: r - i.y * s,
    zoom: s
  };
}
function fc(t, e, o, r) {
  const n = or(t.zoom * e, 0.1, 5), s = rr(t, o, r);
  return {
    x: o - s.x * n,
    y: r - s.y * n,
    zoom: n
  };
}
const bs = Dl.create({
  blockSpecs: {
    ...Wl
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let An = null;
function xs() {
  return An || (An = Fl.create({ schema: bs })), An;
}
async function yc(t) {
  return await xs().blocksToMarkdownLossy(t);
}
async function ws(t) {
  return await xs().tryParseMarkdownToBlocks(t);
}
function ca(t) {
  return xs().tryParseHTMLToBlocks(t);
}
function gc(t, e, o) {
  const [r, n] = t, [s, i] = e, [a, l] = o, c = a - s, u = l - i, p = c * c + u * u;
  if (p === 0)
    return (r - s) ** 2 + (n - i) ** 2;
  let d = ((r - s) * c + (n - i) * u) / p;
  d = Math.max(0, Math.min(1, d));
  const f = s + d * c, m = i + d * u;
  return (r - f) ** 2 + (n - m) ** 2;
}
function _n(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, r = 0;
  const n = t[0], s = t[t.length - 1];
  for (let l = 1; l < t.length - 1; l++) {
    const c = gc(t[l], n, s);
    c > o && (o = c, r = l);
  }
  if (o <= e)
    return [n, s];
  const i = _n(t.slice(0, r + 1), e), a = _n(t.slice(r), e);
  return [...i.slice(0, -1), ...a];
}
async function mc(t, e) {
  const o = [], r = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (e != null && e.background && e.background !== "dot-grid" && r.push(`background="${e.background}"`), e != null && e.originView) {
    const d = e.originView;
    r.push(`originView="${d.x},${d.y},${d.zoom}"`);
  }
  o.push(`<!--@meta ${r.join(" ")} -->`), o.push("");
  const n = t.filter((d) => d.type === "frame").sort((d, f) => d.z - f.z || d.y - f.y || d.x - f.x);
  for (const d of n) {
    const f = d.h === "auto" ? "auto" : Math.round(d.h), m = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${f}"`,
      `z="${d.z}"`
    ];
    d.data.label && m.push(`label="${d.data.label.replace(/"/g, "&quot;")}"`), d.data.backgroundColor && m.push(`backgroundColor="${d.data.backgroundColor}"`), d.data.borderColor && m.push(`borderColor="${d.data.borderColor}"`), d.data.borderWidth != null && m.push(`borderWidth="${d.data.borderWidth}"`), d.data.borderStyle && d.data.borderStyle !== "solid" && m.push(`borderStyle="${d.data.borderStyle}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && m.push(`opacity="${d.data.opacity}"`), d.data.slideOrder != null && m.push(`slideOrder="${d.data.slideOrder}"`), d.data.transition && d.data.transition !== "pan" && m.push(`transition="${d.data.transition}"`), d.data.transitionDuration != null && m.push(`transitionDuration="${d.data.transitionDuration}"`), d.rotation && m.push(`rotation="${d.rotation}"`), d.locked && m.push('locked="true"'), d.groupId && m.push(`group="${d.groupId}"`), o.push(`<!--@frame ${m.join(" ")} -->`), o.push("");
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
    const m = d.data.blocks.length > 0 ? await yc(d.data.blocks) : "";
    o.push(m), o.push("");
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
    const y = _n([...d.data.points], 1).map(
      ([b, x, g]) => `${(b + d.x).toFixed(1)},${(x + d.y).toFixed(1)},${g.toFixed(2)}`
    ).join(" ");
    o.push(y), o.push("");
  }
  const a = t.filter((d) => d.type === "shape");
  for (const d of a) {
    const f = d.h === "auto" ? "auto" : Math.round(d.h), m = [
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
    d.data.fill && m.push(`fill="${d.data.fill}"`), d.data.fillStyle && d.data.fillStyle !== "hachure" && m.push(`fillStyle="${d.data.fillStyle}"`), d.data.strokeStyle && d.data.strokeStyle !== "solid" && m.push(`strokeStyle="${d.data.strokeStyle}"`), d.data.edgeStyle && d.data.edgeStyle !== "sharp" && m.push(`edgeStyle="${d.data.edgeStyle}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && m.push(`opacity="${d.data.opacity}"`), d.data.startPoint && m.push(`startPt="${d.data.startPoint[0].toFixed(1)},${d.data.startPoint[1].toFixed(1)}"`), d.data.endPoint && m.push(`endPt="${d.data.endPoint[0].toFixed(1)},${d.data.endPoint[1].toFixed(1)}"`), d.data.label && m.push(`label="${d.data.label.replace(/"/g, "&quot;")}"`), d.data.labelFontSize && m.push(`labelFontSize="${d.data.labelFontSize}"`), d.data.labelFontFamily && d.data.labelFontFamily !== "Excalifont" && m.push(`labelFontFamily="${d.data.labelFontFamily}"`), d.data.labelAlign && d.data.labelAlign !== "center" && m.push(`labelAlign="${d.data.labelAlign}"`), d.rotation && m.push(`rotation="${d.rotation}"`), d.locked && m.push('locked="true"'), d.groupId && m.push(`group="${d.groupId}"`), o.push(`<!--@draw ${m.join(" ")} -->`), o.push("");
  }
  const l = t.filter((d) => d.type === "text");
  for (const d of l) {
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
  const u = t.filter((d) => d.type === "edge");
  for (const d of u) {
    const f = [
      `id="${d.id}"`,
      `from="${d.data.fromId}"`,
      `to="${d.data.toId}"`,
      `style="${d.data.style}"`,
      `color="${d.data.color}"`
    ];
    d.data.label && f.push(`label="${d.data.label}"`), d.data.strokeWidth && d.data.strokeWidth !== 1 && f.push(`strokeWidth="${d.data.strokeWidth}"`), d.data.arrowHead && d.data.arrowHead !== "none" && f.push(`arrowHead="${d.data.arrowHead}"`), d.data.arrowTail && d.data.arrowTail !== "none" && f.push(`arrowTail="${d.data.arrowTail}"`), d.data.arrowHeadSize && f.push(`arrowHeadSize="${d.data.arrowHeadSize}"`), d.data.arrowTailSize && f.push(`arrowTailSize="${d.data.arrowTailSize}"`), d.data.edgeType && d.data.edgeType !== "bezier" && f.push(`edgeType="${d.data.edgeType}"`), d.data.animated && f.push('animated="true"'), d.data.animatedDirection && d.data.animatedDirection !== "forward" && f.push(`animatedDirection="${d.data.animatedDirection}"`), d.data.sourceHandle && f.push(`sourceHandle="${d.data.sourceHandle}"`), d.data.targetHandle && f.push(`targetHandle="${d.data.targetHandle}"`), d.data.midpointOffset != null && d.data.midpointOffset !== 0.5 && f.push(`midpointOffset="${d.data.midpointOffset}"`), d.data.curveOffset && (d.data.curveOffset[0] !== 0 || d.data.curveOffset[1] !== 0) && f.push(`curveOffset="${d.data.curveOffset[0]},${d.data.curveOffset[1]}"`), d.locked && f.push('locked="true"'), d.groupId && f.push(`group="${d.groupId}"`), o.push(`<!--@edge ${f.join(" ")} -->`), o.push("");
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
const da = "data:font/woff2;base64,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", lo = "Excalifont", jr = [
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
], ha = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), bc = /* @__PURE__ */ new Set(["Excalifont"]), xc = /* @__PURE__ */ new Set([...ha, ...bc]);
function wc(t) {
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
  return ha.has(t) ? t : `'${t}', sans-serif`;
}
let ti = !1;
function kc(t = document) {
  if (ti) return;
  ti = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${da}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = jr.filter((n) => !xc.has(n.key)).map((n) => "family=" + n.key.replace(/ /g, "+")).join("&"), r = t.createElement("link");
  r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(r);
}
function to(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let r;
  for (; (r = o.exec(t)) !== null; )
    e[r[1]] = r[2];
  return e;
}
const vc = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function Sc(t) {
  var s, i;
  const e = [], o = {}, r = t.split(`
`);
  let n = 0;
  for (; n < r.length; ) {
    const a = r[n].trim();
    if (a.startsWith("<!--@meta")) {
      const l = to(a);
      if (l.background) {
        const c = vc[l.background] ?? l.background;
        o.background = c;
      }
      if (l.originView) {
        const c = l.originView.split(",").map(Number);
        c.length === 3 && c.every((u) => !isNaN(u)) && (o.originView = { x: c[0], y: c[1], zoom: c[2] });
      }
      n++;
      continue;
    }
    if (a.startsWith("<!--@frame")) {
      const l = to(a);
      for (n++; n < r.length && r[n].trim() === ""; ) n++;
      e.push({
        id: l.id || Pt(10),
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
      const u = c.join(`
`), p = u.trim().length > 0 ? await ws(u) : [];
      e.push({
        id: l.id || Pt(10),
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
          markdown: u,
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
          id: l.id || Pt(10),
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
        const u = c ? c.split(" ").filter(Boolean).map((b) => {
          const x = b.split(",").map(Number);
          return [
            x[0] || 0,
            x[1] || 0,
            x[2] || 0.5
          ];
        }) : [];
        let p = 1 / 0, d = 1 / 0, f = -1 / 0, m = -1 / 0;
        for (const [b, x] of u)
          b < p && (p = b), x < d && (d = x), b > f && (f = b), x > m && (m = x);
        isFinite(p) || (p = parseFloat(l.x || "0"), d = parseFloat(l.y || "0"), f = p, m = d);
        const y = u.map(
          ([b, x, g]) => [b - p, x - d, g]
        );
        for (e.push({
          id: l.id || Pt(10),
          type: "draw",
          x: p,
          y: d,
          w: f - p,
          h: m - d,
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
      const l = to(a);
      n++, e.push({
        id: l.id || Pt(10),
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
        id: l.id || Pt(10),
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
        id: l.id || Pt(10),
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
        id: l.id || Pt(10),
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
const Mc = 180;
function Dr(t, e) {
  t.push(e), t.length > Mc && t.shift();
}
function eo(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((n, s) => n - s), r = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[r];
}
class Cc {
  constructor() {
    xt(this, "enabled", !1);
    xt(this, "listeners", /* @__PURE__ */ new Set());
    xt(this, "lastTick", 0);
    xt(this, "lastRatesTs", 0);
    xt(this, "frameMs", []);
    xt(this, "cullingMs", []);
    xt(this, "hitTestMs", []);
    xt(this, "edgeHitMs", []);
    xt(this, "pendingCullingMs", 0);
    xt(this, "pendingHitTestMs", 0);
    xt(this, "pendingEdgeHitMs", 0);
    xt(this, "pendingHitTestCalls", 0);
    xt(this, "pendingEdgeHitCalls", 0);
    xt(this, "hitTestCallsPerSec", 0);
    xt(this, "edgeHitCallsPerSec", 0);
    xt(this, "visibleNodes", 0);
    xt(this, "totalNodes", 0);
    xt(this, "visibleEdges", 0);
    xt(this, "totalEdges", 0);
    xt(this, "virtualizationActive", !1);
    xt(this, "seedVisibleNodes", 0);
    xt(this, "nodesAddedByAdjacency", 0);
    xt(this, "nodesAddedByEdgeEndpoints", 0);
    xt(this, "edgesAddedByAdjacency", 0);
    xt(this, "edgesAddedByCrossing", 0);
    xt(this, "lastPublishedAt", 0);
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
      Dr(this.frameMs, r);
    }
    this.lastTick = e, Dr(this.cullingMs, this.pendingCullingMs), Dr(this.hitTestMs, this.pendingHitTestMs), Dr(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
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
const ge = new Cc();
function ho(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const Ic = 14;
function mr(t, e, o, r, n) {
  const s = e.find((d) => d.id === o);
  if (!s) return null;
  const i = ho(t, n), a = Ic / r, l = e.filter((d) => d.direction === s.direction), c = l.indexOf(s);
  if (c < 0) return null;
  const u = t.y + i / (l.length + 1) * (c + 1), p = s.direction === "input" ? t.x - a : t.x + t.w + a;
  if (t.rotation) {
    const d = t.x + t.w / 2, f = t.y + i / 2, m = t.rotation * Math.PI / 180, y = Math.cos(m), b = Math.sin(m), x = p - d, g = u - f;
    return { x: d + x * y - g * b, y: f + x * b + g * y };
  }
  return { x: p, y: u };
}
function ei(t, e, o, r, n, s, i, a) {
  const l = i - n, c = a - s;
  if (l === 0 && c === 0) return { x: n, y: s, side: "right" };
  let u = 1 / 0, p = n, d = s, f = "right";
  if (l !== 0) {
    const m = (t + o - n) / l;
    if (m > 0 && m < u) {
      const y = s + m * c;
      y >= e && y <= e + r && (u = m, p = t + o, d = y, f = "right");
    }
  }
  if (l !== 0) {
    const m = (t - n) / l;
    if (m > 0 && m < u) {
      const y = s + m * c;
      y >= e && y <= e + r && (u = m, p = t, d = y, f = "left");
    }
  }
  if (c !== 0) {
    const m = (e + r - s) / c;
    if (m > 0 && m < u) {
      const y = n + m * l;
      y >= t && y <= t + o && (u = m, p = y, d = e + r, f = "bottom");
    }
  }
  if (c !== 0) {
    const m = (e - s) / c;
    if (m > 0 && m < u) {
      const y = n + m * l;
      y >= t && y <= t + o && (u = m, p = y, d = e, f = "top");
    }
  }
  return { x: p, y: d, side: f };
}
function ze(t, e, o, r, n) {
  const s = Math.cos(n), i = Math.sin(n), a = t - o, l = e - r;
  return [o + a * s - l * i, r + a * i + l * s];
}
function ts(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return ei(t.x, t.y, t.w, e, n, s, o, r);
  const i = -t.rotation * Math.PI / 180, [a, l] = ze(o, r, n, s, i), c = ei(t.x, t.y, t.w, e, n, s, a, l), [u, p] = ze(c.x, c.y, n, s, -i);
  return { x: u, y: p, side: c.side };
}
function br(t, e, o, r) {
  return Math.abs(t) / o >= Math.abs(e) / r ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function zc(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, u] = t.rotation ? ze(o, r, n, s, l) : [o, r], p = c - n, d = u - s;
  if (p === 0 && d === 0)
    return { x: n + i, y: s, side: "right" };
  const f = 1 / Math.sqrt((p / i) ** 2 + (d / a) ** 2);
  let m = n + p * f, y = s + d * f;
  const b = br(p, d, i, a);
  return t.rotation && ([m, y] = ze(m, y, n, s, -l)), { x: m, y, side: b };
}
function Tc(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, a = e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, u] = t.rotation ? ze(o, r, n, s, l) : [o, r], p = c - n, d = u - s;
  if (p === 0 && d === 0)
    return { x: n + i, y: s, side: "right" };
  const f = 1 / (Math.abs(p) / i + Math.abs(d) / a);
  let m = n + p * f, y = s + d * f;
  const b = br(p, d, i, a);
  return t.rotation && ([m, y] = ze(m, y, n, s, -l)), { x: m, y, side: b };
}
function Pc(t, e, o, r) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return ts(t, e, o, r);
  const s = t.x + t.w / 2, i = t.y + e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [l, c] = t.rotation ? ze(o, r, s, i, a) : [o, r], u = l - s, p = c - i, d = Math.hypot(u, p);
  if (d === 0)
    return ts(t, e, o, r);
  const f = u / d, m = p / d;
  let y = t.x + n[0][0], b = t.y + n[0][1], x = (y - s) * f + (b - i) * m;
  for (let z = 1; z < n.length; z++) {
    const L = t.x + n[z][0], D = t.y + n[z][1], E = (L - s) * f + (D - i) * m;
    E > x && (x = E, y = L, b = D);
  }
  const g = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let k = y + f * g, M = b + m * g;
  const C = br(u, p, t.w / 2, e / 2);
  return t.rotation && ([k, M] = ze(k, M, s, i, -a)), { x: k, y: M, side: C };
}
function oi(t, e, o) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return Ur(t, e, o);
  const n = t.x + t.w / 2, s = t.y + e / 2, i = Lo(o), a = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, l = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (b, x, g, k, M, C) => {
    const z = M - g, L = C - k, D = z * z + L * L;
    if (D === 0) return [g, k];
    const E = Math.max(0, Math.min(1, ((b - g) * z + (x - k) * L) / D));
    return [g + E * z, k + E * L];
  };
  let u = t.x + r[0][0], p = t.y + r[0][1], d = (u - a) ** 2 + (p - l) ** 2;
  if (r.length === 1)
    u = t.x + r[0][0], p = t.y + r[0][1];
  else
    for (let b = 0; b < r.length - 1; b++) {
      const x = t.x + r[b][0], g = t.y + r[b][1], k = t.x + r[b + 1][0], M = t.y + r[b + 1][1], [C, z] = c(a, l, x, g, k, M), L = (C - a) ** 2 + (z - l) ** 2;
      L < d && (d = L, u = C, p = z);
    }
  const f = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let m = u + i.dx * f, y = p + i.dy * f;
  if (t.rotation) {
    const b = t.rotation * Math.PI / 180;
    [m, y] = ze(m, y, n, s, b);
  }
  return { x: m, y };
}
function es(t, e, o, r) {
  var n;
  if (t.type === "draw")
    return Pc(t, e, o, r);
  if (t.type === "shape") {
    const s = (n = t.data) == null ? void 0 : n.shape;
    if (s === "ellipse") return zc(t, e, o, r);
    if (s === "diamond") return Tc(t, e, o, r);
  }
  return ts(t, e, o, r);
}
function os(t, e, o, r) {
  const n = es(t, e, o, r);
  return { x: n.x, y: n.y };
}
function Ur(t, e, o) {
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
  const a = t.rotation * Math.PI / 180, [l, c] = ze(s, i, r, n, a);
  return { x: l, y: c };
}
function Lo(t) {
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
function ri(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function De(t, e, o = "bezier", r, n, s, i, a, l, c, u, p, d) {
  const f = ho(t, r), m = ho(e, r), y = t.x + t.w / 2, b = t.y + f / 2, x = e.x + e.w / 2, g = e.y + m / 2;
  let k, M, C, z;
  if (l)
    k = l.x, M = l.y, C = n ?? "right";
  else if (u !== void 0) {
    const J = Qr(t, f, u);
    k = J.x, M = J.y, C = J.side;
    const nt = Math.hypot(k - y, M - b);
    nt > 0 && (z = { dx: (k - y) / nt, dy: (M - b) / nt });
  } else if (n) {
    const J = t.type === "draw" ? oi(t, f, n) : Ur(t, f, n);
    k = J.x, M = J.y, C = n;
  } else {
    const J = es(t, f, x, g);
    if (k = J.x, M = J.y, C = J.side, ri(t)) {
      const nt = Math.hypot(x - y, g - b);
      nt > 0 && (z = { dx: (x - y) / nt, dy: (g - b) / nt });
    }
  }
  let L, D, E, V;
  if (c)
    L = c.x, D = c.y, E = s ?? "left";
  else if (p !== void 0) {
    const J = Qr(e, m, p);
    L = J.x, D = J.y, E = J.side;
    const nt = Math.hypot(L - x, D - g);
    nt > 0 && (V = { dx: (L - x) / nt, dy: (D - g) / nt });
  } else if (s) {
    const J = e.type === "draw" ? oi(e, m, s) : Ur(e, m, s);
    L = J.x, D = J.y, E = s;
  } else {
    const J = es(e, m, y, b);
    if (L = J.x, D = J.y, E = J.side, ri(e)) {
      const nt = Math.hypot(y - x, b - g);
      nt > 0 && (V = { dx: (y - x) / nt, dy: (b - g) / nt });
    }
  }
  if (d && d > 0) {
    const J = Math.hypot(k - y, M - b);
    J > 0 && (k += (k - y) / J * d, M += (M - b) / J * d);
    const nt = Math.hypot(L - x, D - g);
    nt > 0 && (L += (L - x) / nt * d, D += (D - g) / nt * d);
  }
  switch (o) {
    case "straight":
      return Ac(k, M, L, D, C, E);
    case "bezier":
      return Ec(k, M, L, D, C, E, a, z, V);
    case "smoothstep":
      return Lc(k, M, L, D, C, E, i);
    case "step":
      return Rc(k, M, L, D, C, E, i);
  }
}
function Ac(t, e, o, r, n, s) {
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
function Ec(t, e, o, r, n, s, i, a, l) {
  const c = Math.hypot(o - t, r - e), u = Math.min(c * 0.5, Math.max(50, c * 0.25)), p = a ?? Lo(n), d = l ?? Lo(s), f = i ? i[0] * (4 / 3) : 0, m = i ? i[1] * (4 / 3) : 0, y = t + p.dx * u + f, b = e + p.dy * u + m, x = o + d.dx * u + f, g = r + d.dy * u + m, k = 0.125 * t + 0.375 * y + 0.375 * x + 0.125 * o, M = 0.125 * e + 0.375 * b + 0.375 * g + 0.125 * r, C = Math.atan2(r - g, o - x), z = Math.atan2(e - b, t - y), L = {
    x: k,
    y: M,
    axis: "xy",
    min: 0,
    max: 0
  }, D = Math.min(t, o, y, x), E = Math.min(e, r, b, g), V = Math.max(t, o, y, x), J = Math.max(e, r, b, g);
  return {
    path: `M${t},${e} C${y},${b} ${x},${g} ${o},${r}`,
    labelX: k,
    labelY: M,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: C,
    tailAngle: z,
    sourceSide: n,
    targetSide: s,
    kinkHandle: L,
    bounds: { x: D, y: E, w: V - D, h: J - E }
  };
}
function Lc(t, e, o, r, n, s, i) {
  const { points: c, kinkHandle: u } = ks(t, e, o, r, n, s, 20, i), p = Dc(c, 8), d = Math.floor(c.length / 2), f = (c[d - 1][0] + c[d][0]) / 2, m = (c[d - 1][1] + c[d][1]) / 2, y = c[c.length - 1], b = c[c.length - 2], x = Math.atan2(y[1] - b[1], y[0] - b[0]), g = c[0], k = c[1], M = Math.atan2(g[1] - k[1], g[0] - k[0]);
  let C = 1 / 0, z = 1 / 0, L = -1 / 0, D = -1 / 0;
  for (const [E, V] of c)
    E < C && (C = E), V < z && (z = V), E > L && (L = E), V > D && (D = V);
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
    kinkHandle: u,
    bounds: { x: C, y: z, w: L - C, h: D - z }
  };
}
function Rc(t, e, o, r, n, s, i) {
  const { points: l, kinkHandle: c } = ks(t, e, o, r, n, s, 20, i), u = [`M${l[0][0]},${l[0][1]}`];
  for (let D = 1; D < l.length; D++)
    u.push(`L${l[D][0]},${l[D][1]}`);
  const p = Math.floor(l.length / 2), d = (l[p - 1][0] + l[p][0]) / 2, f = (l[p - 1][1] + l[p][1]) / 2, m = l[l.length - 1], y = l[l.length - 2], b = Math.atan2(m[1] - y[1], m[0] - y[0]), x = l[0], g = l[1], k = Math.atan2(x[1] - g[1], x[0] - g[0]);
  let M = 1 / 0, C = 1 / 0, z = -1 / 0, L = -1 / 0;
  for (const [D, E] of l)
    D < M && (M = D), E < C && (C = E), D > z && (z = D), E > L && (L = E);
  return {
    path: u.join(" "),
    labelX: d,
    labelY: f,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: b,
    tailAngle: k,
    sourceSide: n,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: M, y: C, w: z - M, h: L - C }
  };
}
function ks(t, e, o, r, n, s, i, a) {
  const l = Lo(n), c = Lo(s), u = t + l.dx * i, p = e + l.dy * i, d = o + c.dx * i, f = r + c.dy * i, m = n === "left" || n === "right", y = s === "left" || s === "right", b = [[t, e], [u, p]], x = a ?? 0.5;
  let g;
  if (m && y) {
    const k = u + (d - u) * x;
    b.push([k, p], [k, f]);
    const M = Math.min(u, d), C = Math.max(u, d);
    g = { x: k, y: (p + f) / 2, axis: "x", min: M, max: C };
  } else if (!m && !y) {
    const k = p + (f - p) * x;
    b.push([u, k], [d, k]);
    const M = Math.min(p, f), C = Math.max(p, f);
    g = { x: (u + d) / 2, y: k, axis: "y", min: M, max: C };
  } else m && !y ? b.push([d, p]) : b.push([u, f]);
  return b.push([d, f], [o, r]), { points: b, kinkHandle: g };
}
function Dc(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let n = 1; n < t.length - 1; n++) {
    const s = t[n - 1], i = t[n], a = t[n + 1], l = i[0] - s[0], c = i[1] - s[1], u = a[0] - i[0], p = a[1] - i[1], d = Math.hypot(l, c), f = Math.hypot(u, p);
    if (d === 0 || f === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const m = Math.min(e, d / 2, f / 2), y = i[0] - l / d * m, b = i[1] - c / d * m, x = i[0] + u / f * m, g = i[1] + p / f * m;
    o.push(`L${y},${b}`), o.push(`Q${i[0]},${i[1]} ${x},${g}`);
  }
  const r = t[t.length - 1];
  return o.push(`L${r[0]},${r[1]}`), o.join(" ");
}
function Wc(t, e, o, r, n, s, i, a, l) {
  const c = 1 - l, u = c * c, p = u * c, d = l * l, f = d * l;
  return [
    p * t + 3 * u * l * o + 3 * c * d * n + f * i,
    p * e + 3 * u * l * r + 3 * c * d * s + f * a
  ];
}
function Fc(t, e, o, r, n, s, i, a, l, c, u = 24) {
  let p = 1 / 0, d = o, f = r;
  for (let m = 1; m <= u; m++) {
    const y = m / u, [b, x] = Wc(o, r, n, s, i, a, l, c, y), g = vs(t, e, d, f, b, x);
    g < p && (p = g), d = b, f = x;
  }
  return p;
}
function Bc(t, e, o) {
  let r = 1 / 0;
  for (let n = 1; n < o.length; n++) {
    const s = vs(t, e, o[n - 1][0], o[n - 1][1], o[n][0], o[n][1]);
    s < r && (r = s);
  }
  return r;
}
function ua(t, e, o, r, n, s, i, a) {
  const l = n.data.edgeType || "bezier", c = De(
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
  ), { x1: u, y1: p, x2: d, y2: f } = c;
  if (l === "straight")
    return vs(t, e, u, p, d, f);
  if (l === "bezier") {
    const b = Math.hypot(d - u, f - p), x = Math.min(b * 0.5, Math.max(50, b * 0.25)), g = Lo(c.sourceSide), k = Lo(c.targetSide), M = n.data.curveOffset ? n.data.curveOffset[0] * (4 / 3) : 0, C = n.data.curveOffset ? n.data.curveOffset[1] * (4 / 3) : 0, z = u + g.dx * x + M, L = p + g.dy * x + C, D = d + k.dx * x + M, E = f + k.dy * x + C;
    return Fc(t, e, u, p, z, L, D, E, d, f);
  }
  const m = 20, { points: y } = ks(u, p, d, f, c.sourceSide, c.targetSide, m, n.data.midpointOffset);
  return Bc(t, e, y);
}
function ni(t, e, o) {
  const r = ho(t, o), n = ho(e, o), s = t.x + t.w / 2, i = t.y + r / 2, a = e.x + e.w / 2, l = e.y + n / 2, c = os(t, r, a, l), u = os(e, n, s, i);
  return { x1: c.x, y1: c.y, x2: u.x, y2: u.y };
}
function En(t, e, o, r) {
  const n = ho(t, r);
  return os(t, n, e, o);
}
function vs(t, e, o, r, n, s) {
  const i = n - o, a = s - r, l = i * i + a * a;
  if (l === 0) return Math.hypot(t - o, e - r);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * a) / l)), u = o + c * i, p = r + c * a;
  return Math.hypot(t - u, e - p);
}
function Po(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, a = n, l = r / 2, c = t + n * l, u = e + s * l, p = t - n * l, d = e - s * l, f = r * 0.4;
  return `M${p + i * f},${d + a * f} L${c},${u} L${p - i * f},${d - a * f}`;
}
function Zr(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, a = n, l = r / 2, c = t + n * l, u = e + s * l, p = t - n * l, d = e - s * l, f = r * 0.4;
  return `M${c},${u} L${p + i * f},${d + a * f} L${p - i * f},${d - a * f} Z`;
}
function rs(t, e) {
  const o = ho(t, e);
  return ["top", "right", "bottom", "left"].map((n) => {
    const s = Ur(t, o, n);
    return { side: n, x: s.x, y: s.y };
  });
}
function Wr(t, e, o, r) {
  const n = rs(t, r);
  let s = n[0], i = 1 / 0;
  for (const a of n) {
    const l = Math.hypot(a.x - e, a.y - o);
    l < i && (i = l, s = a);
  }
  return s.side;
}
function Nc(t, e, o, r, n, s) {
  const i = ge.isEnabled(), a = i ? performance.now() : 0, l = 16 / r, c = [];
  for (const u of t.values()) {
    if (u.type !== "edge") continue;
    const p = u, d = t.get(p.data.fromId), f = t.get(p.data.toId);
    if (!d || !f) continue;
    const m = s == null ? void 0 : s(p, d, f);
    ua(e, o, d, f, p, n, m == null ? void 0 : m.sourcePortPos, m == null ? void 0 : m.targetPortPos) < l && c.push(u);
  }
  return i && ge.recordEdgeHit(performance.now() - a), c;
}
function Hc(t, e, o, r, n, s) {
  const i = ge.isEnabled(), a = i ? performance.now() : 0, l = 16 / r;
  let c = null, u = l;
  for (const p of t.values()) {
    if (p.type !== "edge") continue;
    const d = p, f = t.get(d.data.fromId), m = t.get(d.data.toId);
    if (!f || !m) continue;
    const y = s == null ? void 0 : s(d, f, m), b = ua(e, o, f, m, d, n, y == null ? void 0 : y.sourcePortPos, y == null ? void 0 : y.targetPortPos);
    b < u && (u = b, c = p);
  }
  return i && ge.recordEdgeHit(performance.now() - a), c;
}
function Qr(t, e, o) {
  var c;
  o = (o % 1 + 1) % 1;
  const r = t.x + t.w / 2, n = t.y + e / 2;
  if (t.type === "draw") {
    const u = t.data.points;
    if (u && u.length >= 2) {
      const p = [0];
      for (let f = 1; f < u.length; f++)
        p.push(p[f - 1] + Math.hypot(u[f][0] - u[f - 1][0], u[f][1] - u[f - 1][1]));
      const d = p[p.length - 1];
      if (d > 0) {
        const f = o * d;
        let m = 0;
        for (let D = 1; D < p.length; D++) {
          if (p[D] >= f) {
            m = D - 1;
            break;
          }
          D === p.length - 1 && (m = D - 1);
        }
        const y = p[m + 1] - p[m], b = y > 0 ? (f - p[m]) / y : 0;
        let x = t.x + u[m][0] + (u[m + 1][0] - u[m][0]) * b, g = t.y + u[m][1] + (u[m + 1][1] - u[m][1]) * b;
        const k = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2), M = x - r, C = g - n, z = Math.hypot(M, C);
        z > 0 && (x += M / z * k, g += C / z * k);
        const L = br(x - r, g - n, t.w / 2, e / 2);
        if (t.rotation) {
          const D = t.rotation * Math.PI / 180, [E, V] = ze(x, g, r, n, D);
          return { x: E, y: V, side: L };
        }
        return { x, y: g, side: L };
      }
    }
  }
  const s = t.type === "shape" ? (c = t.data) == null ? void 0 : c.shape : void 0;
  let i, a, l;
  if (s === "ellipse") {
    const u = o * 2 * Math.PI - Math.PI / 2, p = t.w / 2, d = e / 2;
    i = r + p * Math.cos(u), a = n + d * Math.sin(u), l = br(i - r, a - n, p, d);
  } else if (s === "diamond") {
    const u = r, p = t.y, d = t.x + t.w, f = n, m = r, y = t.y + e, b = t.x, x = n;
    if (o < 0.25) {
      const g = o / 0.25;
      i = u + (d - u) * g, a = p + (f - p) * g, l = o < 0.125 ? "top" : "right";
    } else if (o < 0.5) {
      const g = (o - 0.25) / 0.25;
      i = d + (m - d) * g, a = f + (y - f) * g, l = o < 0.375 ? "right" : "bottom";
    } else if (o < 0.75) {
      const g = (o - 0.5) / 0.25;
      i = m + (b - m) * g, a = y + (x - y) * g, l = o < 0.625 ? "bottom" : "left";
    } else {
      const g = (o - 0.75) / 0.25;
      i = b + (u - b) * g, a = x + (p - x) * g, l = o < 0.875 ? "left" : "top";
    }
  } else {
    const u = t.w, p = 2 * (u + e);
    let d = o * p;
    const f = u / 2;
    d < f ? (i = r + d, a = t.y, l = "top") : d < f + e ? (d -= f, i = t.x + u, a = t.y + d, l = "right") : d < f + e + u ? (d -= f + e, i = t.x + u - d, a = t.y + e, l = "bottom") : d < f + e + u + e ? (d -= f + e + u, i = t.x, a = t.y + e - d, l = "left") : (d -= f + e + u + e, i = t.x + d, a = t.y, l = "top");
  }
  if (t.rotation) {
    const u = t.rotation * Math.PI / 180, [p, d] = ze(i, a, r, n, u);
    return { x: p, y: d, side: l };
  }
  return { x: i, y: a, side: l };
}
function Oc(t, e, o, r) {
  var x;
  const n = t.x + t.w / 2, s = t.y + e / 2;
  let i = o, a = r;
  if (t.rotation) {
    const g = -t.rotation * Math.PI / 180;
    [i, a] = ze(o, r, n, s, g);
  }
  if (t.type === "draw") {
    const g = t.data.points;
    if (g && g.length >= 2) {
      const k = [0];
      for (let C = 1; C < g.length; C++)
        k.push(k[C - 1] + Math.hypot(g[C][0] - g[C - 1][0], g[C][1] - g[C - 1][1]));
      const M = k[k.length - 1];
      if (M > 0) {
        const C = i - t.x, z = a - t.y;
        let L = 1 / 0, D = 0;
        for (let E = 0; E < g.length - 1; E++) {
          const V = g[E][0], J = g[E][1], nt = g[E + 1][0], mt = g[E + 1][1], ft = nt - V, Z = mt - J, G = ft * ft + Z * Z, K = G === 0 ? 0 : Math.max(0, Math.min(1, ((C - V) * ft + (z - J) * Z) / G)), $ = V + K * ft, Q = J + K * Z, lt = Math.hypot(C - $, z - Q);
          lt < L && (L = lt, D = k[E] + K * (k[E + 1] - k[E]));
        }
        return D / M;
      }
    }
  }
  const l = t.type === "shape" ? (x = t.data) == null ? void 0 : x.shape : void 0;
  if (l === "ellipse")
    return ((Math.atan2(a - s, i - n) + Math.PI / 2) / (2 * Math.PI) % 1 + 1) % 1;
  if (l === "diamond") {
    const g = n, k = t.y, M = t.x + t.w, C = s, z = n, L = t.y + e, D = t.x, E = s, V = [
      { ax: g, ay: k, bx: M, by: C, tStart: 0 },
      { ax: M, ay: C, bx: z, by: L, tStart: 0.25 },
      { ax: z, ay: L, bx: D, by: E, tStart: 0.5 },
      { ax: D, ay: E, bx: g, by: k, tStart: 0.75 }
    ];
    let J = 0, nt = 1 / 0;
    for (const mt of V) {
      const ft = mt.bx - mt.ax, Z = mt.by - mt.ay, G = ft * ft + Z * Z, K = G === 0 ? 0 : Math.max(0, Math.min(1, ((i - mt.ax) * ft + (a - mt.ay) * Z) / G)), $ = mt.ax + K * ft, Q = mt.ay + K * Z, lt = Math.hypot(i - $, a - Q);
      lt < nt && (nt = lt, J = mt.tStart + K * 0.25);
    }
    return (J % 1 + 1) % 1;
  }
  const c = t.w, u = t.x, p = t.y, d = 2 * (c + e), f = c / 2, m = [
    // Top edge right half: top-center → top-right
    { ax: n, ay: p, bx: u + c, by: p, dStart: 0, len: f },
    // Right edge: top-right → bottom-right
    { ax: u + c, ay: p, bx: u + c, by: p + e, dStart: f, len: e },
    // Bottom edge: bottom-right → bottom-left
    { ax: u + c, ay: p + e, bx: u, by: p + e, dStart: f + e, len: c },
    // Left edge: bottom-left → top-left
    { ax: u, ay: p + e, bx: u, by: p, dStart: f + e + c, len: e },
    // Top edge left half: top-left → top-center
    { ax: u, ay: p, bx: n, by: p, dStart: f + e + c + e, len: f }
  ];
  let y = 0, b = 1 / 0;
  for (const g of m) {
    const k = g.bx - g.ax, M = g.by - g.ay, C = k * k + M * M, z = C === 0 ? 0 : Math.max(0, Math.min(1, ((i - g.ax) * k + (a - g.ay) * M) / C)), L = g.ax + z * k, D = g.ay + z * M, E = Math.hypot(i - L, a - D);
    E < b && (b = E, y = (g.dStart + z * g.len) / d);
  }
  return (y % 1 + 1) % 1;
}
function Ae(t, e, o, r) {
  const n = ho(t, r), s = Oc(t, n, e, o), i = Qr(t, n, s);
  return { t: s, x: i.x, y: i.y };
}
function Xc(t, e, o) {
  const r = t.x, n = t.x + t.w / 2, s = t.x + t.w, i = t.y, a = t.y + t.h / 2, l = t.y + t.h, c = [r, n, s], u = [i, a, l];
  let p = 1 / 0, d = 1 / 0;
  const f = [];
  for (const y of e) {
    const b = y.x, x = y.x + y.w / 2, g = y.x + y.w, k = y.y, M = y.y + y.h / 2, C = y.y + y.h, z = [b, x, g], L = [k, M, C];
    for (const D of c)
      for (const E of z) {
        const V = E - D;
        Math.abs(V) <= o && (Math.abs(V) < Math.abs(p) && (p = V), f.push({
          axis: "x",
          position: E,
          start: Math.min(t.y, t.y + t.h, y.y, y.y + y.h),
          end: Math.max(t.y, t.y + t.h, y.y, y.y + y.h)
        }));
      }
    for (const D of u)
      for (const E of L) {
        const V = E - D;
        Math.abs(V) <= o && (Math.abs(V) < Math.abs(d) && (d = V), f.push({
          axis: "y",
          position: E,
          start: Math.min(t.x, t.x + t.w, y.x, y.x + y.w),
          end: Math.max(t.x, t.x + t.w, y.x, y.x + y.w)
        }));
      }
  }
  const m = /* @__PURE__ */ new Map();
  for (const y of f) {
    const b = `${y.axis}:${y.position.toFixed(1)}`, x = m.get(b);
    x ? (x.start = Math.min(x.start, y.start), x.end = Math.max(x.end, y.end)) : m.set(b, { ...y });
  }
  return {
    guides: Array.from(m.values()),
    snapDx: Math.abs(p) <= o ? p : 0,
    snapDy: Math.abs(d) <= o ? d : 0
  };
}
class Gc {
  constructor() {
    xt(this, "nodes", /* @__PURE__ */ new Map());
    xt(this, "viewport", { x: 0, y: 0, zoom: 1 });
    xt(this, "selection", /* @__PURE__ */ new Set());
    xt(this, "activeGroupId", null);
    xt(this, "groupRotations", /* @__PURE__ */ new Map());
    /** Maps child groupId → parent groupId for nested groups. */
    xt(this, "groupParent", /* @__PURE__ */ new Map());
    /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
    xt(this, "groupChildren", /* @__PURE__ */ new Map());
    xt(this, "mode", "select");
    xt(this, "activeTool", {
      tool: "pen",
      color: "#1e1e2e",
      width: 3,
      shapeType: "rect",
      strokeStyle: "solid",
      roughness: 1,
      opacity: 1
    });
    xt(this, "containerOffset", { x: 0, y: 0 });
    /** DOM element that hosts the canvas — used to derive the correct window in pop-out scenarios. */
    xt(this, "_container", null);
    xt(this, "snapToGrid", !1);
    xt(this, "smartGuides", !0);
    xt(this, "lassoSelect", !1);
    xt(this, "freeFormEdges", !0);
    xt(this, "presentationMode", !1);
    xt(this, "presentationSlides", []);
    xt(this, "presentationIndex", 0);
    xt(this, "_presentationAnimId", null);
    /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
    xt(this, "_transitionOverlay", null);
    xt(this, "gridSize", 20);
    xt(this, "boardBackground", "dot-grid");
    /** Saved "origin" viewport position restored on next load. */
    xt(this, "originView", null);
    /** Current alignment guides (set during drag). */
    xt(this, "alignGuides", []);
    /** Container dimensions for viewport bounds computation. */
    xt(this, "_containerWidth", 2e3);
    xt(this, "_containerHeight", 1500);
    xt(this, "history", new rc());
    /** When set, `updateNodeWithHistoryCoalesced` reuses one undo step until `endHistoryCoalesce()`. */
    xt(this, "_historyCoalesceKey", null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xt(this, "listeners", {});
    xt(this, "_suppressEvents", !1);
    xt(this, "_collabMode", !1);
    xt(this, "clipboard", []);
    xt(this, "pasteCount", 0);
    xt(this, "nextZValue", 1);
    xt(this, "_minZ", 0);
    xt(this, "quadTree", new $n({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    xt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    xt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    xt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    xt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    xt(this, "_measuredHeights", {});
    xt(this, "_search", {
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
    const i = s.flatMap((l) => l.sort((c, u) => c.x - u.x)), a = [...o, ...i];
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
    const o = this.resolveHeight(e), r = 40, n = e.x - r, s = e.y - r, i = e.w + r * 2, a = o + r * 2, l = this._containerWidth, c = this._containerHeight, u = or(Math.min(l / i, c / a), 0.1, 5);
    return {
      x: (l - i * u) / 2 - n * u,
      y: (c - a * u) / 2 - s * u,
      zoom: u
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
        const l = performance.now(), c = (u) => {
          const p = Math.min((u - l) / r, 1);
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
    const r = o ?? 600, n = performance.now(), s = { ...this.viewport }, i = Math.max(0.1, Math.min(s.zoom, e.zoom) * 0.35), a = (s.x + e.x) / 2, l = (s.y + e.y) / 2, c = (u) => {
      const p = Math.min((u - n) / r, 1);
      if (p < 0.5) {
        const d = p * 2, f = 1 - Math.pow(1 - d, 3);
        this.viewport.x = s.x + (a - s.x) * f, this.viewport.y = s.y + (l - s.y) * f, this.viewport.zoom = s.zoom + (i - s.zoom) * f;
      } else {
        const d = (p - 0.5) * 2, f = 1 - Math.pow(1 - d, 3);
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
      const u = this.resolveHeight(c);
      a.push({ x: c.x, y: c.y, w: c.w, h: u });
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
    let c = r, u = n, p = [];
    const d = o instanceof Set ? o : new Set(o);
    if (l) {
      let f = 1 / 0, m = 1 / 0, y = -1 / 0, b = -1 / 0;
      for (const M of e) {
        const C = this.getNode(M.id);
        if (!C) continue;
        const z = M.x + r, L = M.y + n, D = this.resolveHeight(C);
        f = Math.min(f, z), m = Math.min(m, L), y = Math.max(y, z + C.w), b = Math.max(b, L + D);
      }
      const x = { x: f, y: m, w: y - f, h: b - m }, g = (i == null ? void 0 : i.staticNodes) ?? this.createDragSnapContext(d).staticNodes, k = Xc(x, g, 5);
      if (p = k.guides, a) {
        const M = e[0].x + r, C = e[0].y + n, z = this.snap(M, C), L = z.x - M, D = z.y - C, E = k.snapDx !== 0 && Math.abs(k.snapDx) <= Math.abs(L), V = k.snapDy !== 0 && Math.abs(k.snapDy) <= Math.abs(D);
        c = r + (E ? k.snapDx : L), u = n + (V ? k.snapDy : D), E || (p = p.filter((J) => J.axis !== "x")), V || (p = p.filter((J) => J.axis !== "y"));
      } else
        c = r + k.snapDx, u = n + k.snapDy;
    } else if (a) {
      const f = this.snap(e[0].x + r, e[0].y + n);
      c = f.x - e[0].x, u = f.y - e[0].y;
    }
    return this.alignGuides = p, this.emit("guides"), { finalDx: c, finalDy: u };
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
    this.viewport = pc(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, r) {
    this.viewport = fc(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const r = or(e, 0.1, 5);
    if (o) {
      const n = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = rr(this.viewport, n, s);
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
    const n = r.h === "auto" ? 100 : r.h, s = r.x + r.w / 2, i = r.y + n / 2, a = this.getWindow(), l = a.innerWidth, c = a.innerHeight, u = or(o, 0.2, 5);
    this.viewport = {
      x: l / 2 - s * u,
      y: c / 2 - i * u,
      zoom: u
    }, this.emit("viewport");
  }
  fitToContent() {
    if (this.nodes.size === 0) return;
    let e = 1 / 0, o = 1 / 0, r = -1 / 0, n = -1 / 0;
    for (const p of this.nodes.values()) {
      const d = p.h === "auto" ? 100 : p.h;
      p.x < e && (e = p.x), p.y < o && (o = p.y), p.x + p.w > r && (r = p.x + p.w), p.y + d > n && (n = p.y + d);
    }
    const s = 50;
    e -= s, o -= s, r += s, n += s;
    const i = r - e, a = n - o, l = this._containerWidth, c = this._containerHeight, u = or(
      Math.min(l / i, c / a),
      0.1,
      5
    );
    this.viewport = {
      x: (l - i * u) / 2 - e * u,
      y: (c - a * u) / 2 - o * u,
      zoom: u
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
    return rr(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return uc(this.viewport, e, o);
  }
  // --- Node CRUD ---
  addNode(e) {
    var o, r, n;
    if (this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent), this.nodes.set(e.id, e), this.quadTree.insert(e), e.z < this._minZ && (this._minZ = e.z), e.type === "edge") {
      const s = e, { fromId: i, toId: a } = s.data;
      this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.has(a) || this.adjacency.set(a, /* @__PURE__ */ new Set()), this.adjacency.get(i).add(e.id), this.adjacency.get(a).add(e.id);
    }
    e.type !== "edge" && this.updateFrameMembership([e.id]), (n = (r = (o = this.registry) == null ? void 0 : o.get(e.type)) == null ? void 0 : r.onCreate) == null || n.call(r, e, this), this.emit("node:create", e), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
  }
  addNodes(e) {
    if (e.length === 0) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    for (const r of e)
      if (this.nodes.set(r.id, r), this.quadTree.insert(r), r.type === "edge") {
        const n = r, { fromId: s, toId: i } = n.data;
        this.adjacency.has(s) || this.adjacency.set(s, /* @__PURE__ */ new Set()), this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.get(s).add(r.id), this.adjacency.get(i).add(r.id);
      }
    const o = e.filter((r) => r.type !== "edge").map((r) => r.id);
    o.length > 0 && this.updateFrameMembership(o), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
  }
  updateNode(e, o) {
    var s, i, a, l, c, u, p, d, f;
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
      const m = r.w !== 0 ? n.w / r.w : 1, y = r.h === "auto" ? 0 : r.h, b = n.h === "auto" ? 0 : n.h, x = y !== 0 ? b / y : 1;
      this.emit("node:resize", n, m, x);
    }
    (r.rotation ?? 0) !== (n.rotation ?? 0) && ((u = (c = (l = this.registry) == null ? void 0 : l.get(n.type)) == null ? void 0 : c.onRotate) == null || u.call(c, n, n.rotation ?? 0, this), this.emit("node:rotate", n, n.rotation ?? 0)), o.data && r.data !== n.data && ((f = (d = (p = this.registry) == null ? void 0 : p.get(n.type)) == null ? void 0 : d.onDataChange) == null || f.call(d, n, r.data, n.data, this), this.emit("node:data", n, r.data, n.data), this.refreshSearchIfNeeded()), this.emit("change");
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
          const l = De(
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
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent), this.updateNode(e, o), this.emit("history");
  }
  /**
   * Like `updateNodeWithHistory`, but multiple calls with the same `sessionKey` share one undo step
   * (e.g. dragging an inspector slider). Call `endHistoryCoalesce()` when the gesture ends.
   */
  updateNodeWithHistoryCoalesced(e, o, r) {
    if (this._collabMode) {
      this.updateNode(e, o);
      return;
    }
    this._historyCoalesceKey !== r && (this.history.pushSnapshot(this.nodes, this.groupParent), this._historyCoalesceKey = r, this.emit("history")), this.updateNode(e, o);
  }
  /** Update multiple nodes in a single undo step. */
  batchUpdateWithHistory(e) {
    if (e.length !== 0) {
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const { id: o, patch: r } of e)
        this.updateNode(o, r);
      this.emit("history");
    }
  }
  /**
   * Like `batchUpdateWithHistory`, but shares one undo step with other calls using the same `sessionKey`.
   */
  batchUpdateWithHistoryCoalesced(e, o) {
    if (e.length !== 0) {
      if (this._collabMode) {
        for (const { id: r, patch: n } of e)
          this.updateNode(r, n);
        return;
      }
      this._historyCoalesceKey !== o && (this.history.pushSnapshot(this.nodes, this.groupParent), this._historyCoalesceKey = o, this.emit("history"));
      for (const { id: r, patch: n } of e)
        this.updateNode(r, n);
    }
  }
  deleteNode(e) {
    var r, n, s, i, a;
    if (!this.nodes.has(e) || (r = this.nodes.get(e)) != null && r.locked) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = this.nodes.get(e);
    o && ((i = (s = (n = this.registry) == null ? void 0 : n.get(o.type)) == null ? void 0 : s.onDelete) == null || i.call(s, o, this), this.emit("node:delete", o), this.quadTree.remove(o)), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
    for (const l of this.frameChildren.values()) l.delete(e);
    for (const [l, c] of this.nodes)
      if (c.type === "edge") {
        const u = c.data;
        if (u.fromId === e || u.toId === e) {
          const p = this.nodes.get(l);
          p && this.quadTree.remove(p), this.nodes.delete(l), this.selection.delete(l);
          const d = u.fromId === e ? u.toId : u.fromId;
          (a = this.adjacency.get(d)) == null || a.delete(l);
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
      for (const [c, u] of this.frameChildren) {
        if (!u.has(o)) continue;
        const p = this.nodes.get(c);
        if (!p) {
          u.delete(o);
          continue;
        }
        const d = this.resolveHeight(p);
        r.x >= p.x && r.y >= p.y && r.x + r.w <= p.x + p.w && r.y + n <= p.y + d || u.delete(o);
      }
      let s;
      this._containerTypes.has(r.type) && (s = this.getFrameDescendantIds(o));
      let i = null, a = 1 / 0;
      const l = this.quadTree.retrieve([], { x: r.x, y: r.y, w: r.w, h: n });
      for (const c of l) {
        if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
        const u = this.resolveHeight(c);
        if (r.x >= c.x && r.y >= c.y && r.x + r.w <= c.x + c.w && r.y + n <= c.y + u) {
          const d = c.w * u;
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
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const r = this.nodes.get(o);
        r && !r.locked && this.nodes.set(o, { ...r, z: this.nextZValue++ });
      }
      this.emit("change"), this.emit("history");
    }
  }
  sendToBack(e) {
    if (e.length !== 0) {
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
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
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const r = this.nodes.get(o);
        if (!r || r.locked) continue;
        const n = r.type === "edge", s = [];
        for (const u of this.nodes.values())
          u.id !== o && (n ? u.type === "edge" : u.type !== "edge") && u.z >= r.z && this._nodesOverlap(r, u) && s.push(u);
        if (s.length === 0) continue;
        s.sort((u, p) => u.z - p.z);
        const i = s[0], a = this.nodes.get(i.id), l = r.z, c = a.z;
        l === c ? this.nodes.set(o, { ...r, z: c + 1 }) : (this.nodes.set(o, { ...r, z: c }), this.nodes.set(i.id, { ...a, z: l }));
      }
      this.emit("change"), this.emit("history");
    }
  }
  sendBackward(e) {
    if (e.length !== 0) {
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const r = this.nodes.get(o);
        if (!r || r.locked) continue;
        const n = r.type === "edge", s = [];
        for (const u of this.nodes.values())
          u.id !== o && (n ? u.type === "edge" : u.type !== "edge") && u.z <= r.z && this._nodesOverlap(r, u) && s.push(u);
        if (s.length === 0) continue;
        s.sort((u, p) => p.z - u.z);
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
    const n = ge.isEnabled(), s = n ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), l = /* @__PURE__ */ new Map();
    for (const u of a) l.set(u.id, u);
    const c = cc(l, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && ge.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, r) {
    const n = ge.isEnabled(), s = n ? performance.now() : 0, i = 50, a = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), l = /* @__PURE__ */ new Map();
    for (const u of a) l.set(u.id, u);
    const c = hc(l, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && ge.recordHitTest(performance.now() - s), c;
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
    this.activeGroupId && this.getGroupMembers(this.activeGroupId).filter((a) => !e.has(a.id)).length === 0 && (this.activeGroupId = null, this.emit("group:exit")), this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
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
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
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
      this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
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
              ([c, u, p]) => [a.w - c, u, p]
            );
            s = { ...a, data: { ...a.data, points: l } };
          } else {
            const l = a.h === "auto" ? 0 : a.h, c = a.data.points.map(
              ([u, p, d]) => [u, l - p, d]
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
                const l = a.h === "auto" ? 0 : a.h, c = [a.data.startPoint[0], l - a.data.startPoint[1]], u = [a.data.endPoint[0], l - a.data.endPoint[1]];
                s = { ...a, data: { ...a.data, startPoint: c, endPoint: u } };
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
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = Pt(10), o = /* @__PURE__ */ new Set();
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
      this.activeGroupId && e.has(this.activeGroupId) && (this.activeGroupId = null, this.emit("group:exit")), this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
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
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = 20, o = /* @__PURE__ */ new Map(), r = [];
    for (const s of this.selection) {
      const i = this.nodes.get(s);
      if (!i) continue;
      const a = Pt();
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
      s.groupId && (n.has(s.groupId) || n.set(s.groupId, Pt(10)), s.groupId = n.get(s.groupId));
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
      const g = x.h === "auto" ? 100 : x.h;
      x.x < r && (r = x.x), x.y < n && (n = x.y), x.x + x.w > s && (s = x.x + x.w), x.y + g > i && (i = x.y + g);
    }
    const a = (r + s) / 2, l = (n + i) / 2;
    let c, u;
    if (e !== void 0 && o !== void 0)
      c = e, u = o;
    else {
      const x = this.getWindow(), g = x.innerWidth / 2, k = x.innerHeight / 2, M = rr(this.viewport, g, k);
      c = M.x, u = M.y;
    }
    const p = this.pasteCount * 20, d = c - a + p, f = u - l + p, m = /* @__PURE__ */ new Map(), y = this.clipboard.map((x) => {
      const g = Pt();
      return m.set(x.id, g), {
        ...structuredClone(x),
        id: g,
        x: x.x + d,
        y: x.y + f,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const x of y)
      if (x.type === "edge" && x.data) {
        const g = x.data;
        m.has(g.fromId) && (g.fromId = m.get(g.fromId)), m.has(g.toId) && (g.toId = m.get(g.toId));
      }
    const b = /* @__PURE__ */ new Map();
    for (const x of y)
      x.groupId && (b.has(x.groupId) || b.set(x.groupId, Pt(10)), x.groupId = b.get(x.groupId));
    for (const [x, g] of this.groupParent)
      b.has(x) && b.has(g) && this.linkGroupParent(b.get(x), b.get(g));
    this.addNodes(y), this.selectMultiple(y.map((x) => x.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, r) {
    const n = oa.find((f) => f.id === e);
    if (!n) return;
    const s = structuredClone(n.nodes), i = /* @__PURE__ */ new Map();
    for (const f of s) {
      const m = Pt(10);
      i.set(f.id, m), f.id = m;
    }
    for (const f of s) {
      if (f.type === "edge" && f.data) {
        const m = f.data;
        i.has(m.fromId) && (m.fromId = i.get(m.fromId)), i.has(m.toId) && (m.toId = i.get(m.toId));
      }
      f.groupId && i.has(f.groupId) && (f.groupId = i.get(f.groupId));
    }
    let a = 1 / 0, l = 1 / 0, c = -1 / 0, u = -1 / 0;
    for (const f of s) {
      if (f.type === "edge") continue;
      const m = f.h === "auto" ? 100 : f.h;
      a = Math.min(a, f.x), l = Math.min(l, f.y), c = Math.max(c, f.x + f.w), u = Math.max(u, f.y + m);
    }
    const p = o - (a + c) / 2, d = r - (l + u) / 2;
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
    for (const r of this.nodes.values())
      if (this.quadTree.insert(r), r.z < e && (e = r.z), r.z > o && (o = r.z), r.type === "edge") {
        const n = r, { fromId: s, toId: i } = n.data;
        this.adjacency.has(s) || this.adjacency.set(s, /* @__PURE__ */ new Set()), this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.get(s).add(r.id), this.adjacency.get(i).add(r.id);
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
    return mc(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: r } = await Sc(e);
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
class Yc {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xt(this, "types", /* @__PURE__ */ new Map());
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
const si = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], jc = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function ln(t, e) {
  const o = si.indexOf(t);
  if (o === -1) return "default";
  const r = (e % 360 + 360) % 360, n = Math.round(r / 45) % 8, s = (o + n) % 8;
  return jc[si[s]];
}
function ns(t, e, o, r, n, s, i, a, l) {
  if (!(t === "nw" || t === "ne" || t === "sw" || t === "se") || r <= 0 || n <= 0 || a <= 0 || l <= 0)
    return { x: s, y: i, w: a, h: l };
  const u = r / n;
  let p = a, d = l;
  p / d > u ? p = d * u : d = p / u;
  let f = s, m = i;
  return t === "se" ? (f = e, m = o) : t === "ne" ? (f = e, m = o + n - d) : t === "sw" ? (f = e + r - p, m = o) : (f = e + r - p, m = o + n - d), { x: f, y: m, w: p, h: d };
}
class Vc extends Nl {
  constructor() {
    super(...arguments);
    xt(this, "state", { hasError: !1 });
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
function ii({ markdown: t }) {
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
const Kc = 0, qc = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function Uc(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function Zc({
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
  const c = ht(null), u = ht(l === !0), p = ht(!1), d = ht(!1), f = ht(!1), m = ht(!1), y = ht(t.data.blocks), [b, x] = ot(!1), [g, k] = ot(!1), M = ht(null), C = Xl({ schema: n }), z = ht(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  vt(() => {
    const G = z.current;
    if (!G) return;
    z.current = null;
    const K = requestAnimationFrame(() => {
      try {
        C.replaceBlocks(C.document, G);
        return;
      } catch {
      }
      try {
        const $ = C.blocksToHTMLLossy(G);
        C._tiptapEditor.commands.setContent($);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), k(!0);
    });
    return () => cancelAnimationFrame(K);
  }, [C]), vt(() => {
    (!e || o) && x(!1);
  }, [e, o]), vt(() => {
    u.current && (u.current = !1, p.current = !0, x(!0));
  }, [C]), vt(() => {
    if (!b || !p.current && !M.current) return;
    const G = M.current;
    M.current = null, p.current = !1;
    const K = requestAnimationFrame(() => {
      if (C.focus(), G)
        try {
          const $ = C._tiptapEditor, lt = $.view.posAtCoords({ left: G.x, top: G.y });
          lt && $.commands.setTextSelection(lt.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(K);
  }, [b, C]);
  const L = dt(() => {
    if (d.current || f.current) return;
    const G = r.getNode(t.id), K = C.document;
    y.current = K, r.updateNode(t.id, {
      data: { ...G == null ? void 0 : G.data, blocks: K }
    });
  }, [C, r, t.id]);
  vt(() => {
    if (!C) return;
    const G = () => {
      var X, et;
      if (d.current || f.current || m.current) return;
      const Q = C.document.length, lt = r.getNode(t.id), U = ((et = (X = lt == null ? void 0 : lt.data) == null ? void 0 : X.blocks) == null ? void 0 : et.length) ?? 0;
      if (Q < U) return;
      const q = setTimeout(L, 100);
      return () => clearTimeout(q);
    };
    let K;
    const $ = C.onChange(() => {
      K == null || K(), K = G();
    });
    return () => {
      $ == null || $(), K == null || K();
    };
  }, [C, L]), vt(() => {
    const G = c.current;
    if (!G) return;
    const K = ($) => {
      const Q = $.relatedTarget;
      Q && G.contains(Q) || L();
    };
    return G.addEventListener("focusout", K), () => G.removeEventListener("focusout", K);
  }, [L]), vt(() => {
    if (b || t.data.blocks === y.current) return;
    const G = JSON.stringify(t.data.blocks), K = JSON.stringify(y.current);
    if (G !== K) {
      if (t.data.blocks.length > 0 && C.document.length > 0) {
        m.current = !0;
        try {
          C.replaceBlocks(C.document, t.data.blocks);
        } catch {
          try {
            const $ = C.blocksToHTMLLossy(t.data.blocks);
            C._tiptapEditor.commands.setContent($);
          } catch {
          }
        }
        m.current = !1;
      }
      y.current = t.data.blocks;
    }
  }, [t.data.blocks, b, C]), vt(() => {
    if (t.h !== "auto" || !a) return;
    const G = c.current;
    if (!G) return;
    const K = () => {
      const Q = G.offsetHeight;
      Q > 0 && a(t.id, Q);
    };
    K();
    const $ = new ResizeObserver(K);
    return $.observe(G), () => $.disconnect();
  }, [t.id, t.h, a]);
  const D = dt(() => {
    const G = r.getNode(t.id);
    if (!G || G.h === "auto" || !C || !c.current)
      return;
    const K = G.h - Kc, $ = c.current.querySelector(".bn-editor");
    if (!$) return;
    const Q = C.document;
    if (Q.length === 0) return;
    let lt = 0;
    for (let et = Q.length - 1; et >= 1 && Uc(Q[et]); et--)
      lt++;
    const U = $.scrollHeight, q = Q.length > 0 ? U / Q.length : 36;
    if (d.current = !0, U < K) {
      const et = K - U, rt = Math.max(0, Math.floor(et / q));
      if (rt > 0) {
        const j = Q[Q.length - 1];
        C.insertBlocks(
          Array.from({ length: rt }, () => ({
            type: "paragraph",
            content: []
          })),
          j,
          "after"
        );
      }
    } else if (U > K && lt > 0) {
      const et = U - K, rt = Math.min(lt, Math.ceil(et / q));
      if (rt > 0) {
        const j = Q.slice(Q.length - rt);
        C.removeBlocks(j);
      }
    }
    const X = r.getNode(t.id);
    X && r.updateNode(t.id, {
      data: { ...X.data, blocks: C.document }
    }), d.current = !1;
  }, [C, r, t.id]), E = ht(D);
  E.current = D, vt(() => {
    if (t.h === "auto") return;
    const G = setTimeout(() => E.current(), 60);
    return () => clearTimeout(G);
  }, []);
  const V = dt(
    (G) => {
      const K = G.currentTarget.ownerDocument;
      if (G.altKey) return;
      if (!r.selection.has(t.id) && r.selection.size > 0) {
        const { x: gt, y: ut } = r.screenToCanvas(G.clientX, G.clientY);
        for (const St of r.selection) {
          const Ct = r.getNode(St);
          if (!Ct) continue;
          const Wt = Ct.h === "auto" ? 100 : Ct.h;
          if (gt >= Ct.x && gt <= Ct.x + Ct.w && ut >= Ct.y && ut <= Ct.y + Wt)
            return;
        }
      }
      G.stopPropagation(), G.preventDefault(), G.currentTarget.setPointerCapture(G.pointerId), G.shiftKey ? r.toggleSelect(t.id) : r.selection.has(t.id) || r.select(t.id);
      const $ = G.clientX, Q = G.clientY, lt = Array.from(r.selection), U = lt.map((gt) => {
        const ut = r.getNode(gt);
        return { id: gt, x: ut.x, y: ut.y };
      });
      let q = !1, X = null, et = $, rt = Q, j = !1;
      const tt = () => {
        X = null;
        const gt = (et - $) / r.viewport.zoom, ut = (rt - Q) / r.viewport.zoom, { finalDx: St, finalDy: Ct } = r.computeDragSnap(
          U,
          lt,
          gt,
          ut,
          j
        ), Wt = U.map((Ft) => ({
          id: Ft.id,
          patch: { x: Ft.x + St, y: Ft.y + Ct }
        }));
        r.updateMany(Wt);
      }, yt = (gt) => {
        const ut = (gt.clientX - $) / r.viewport.zoom, St = (gt.clientY - Q) / r.viewport.zoom;
        if (!q)
          if (Math.abs(ut) > 2 || Math.abs(St) > 2)
            q = !0, f.current = !0, r.pushHistorySnapshot();
          else
            return;
        et = gt.clientX, rt = gt.clientY, j = gt.metaKey || gt.ctrlKey, X === null && (X = requestAnimationFrame(tt));
      }, it = () => {
        f.current = !1, X !== null && (cancelAnimationFrame(X), tt()), r.clearAlignGuides(), K.removeEventListener("pointermove", yt), K.removeEventListener("pointerup", it);
      };
      K.addEventListener("pointermove", yt), K.addEventListener("pointerup", it);
    },
    [r, t.id]
  ), J = dt(
    (G) => {
      var yt;
      const K = G.currentTarget.ownerDocument;
      G.stopPropagation(), G.preventDefault();
      const $ = t.h === "auto" ? (((yt = c.current) == null ? void 0 : yt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h, Q = t.x + t.w / 2, lt = t.y + $ / 2, U = t.rotation || 0, { x: q, y: X } = r.screenToCanvas(
        G.clientX,
        G.clientY
      ), et = Math.atan2(X - lt, q - Q);
      let rt = !1;
      const j = (it) => {
        rt || (rt = !0, r.pushHistorySnapshot());
        const { x: gt, y: ut } = r.screenToCanvas(it.clientX, it.clientY), St = Math.atan2(ut - lt, gt - Q);
        let Ct = U + (St - et) * (180 / Math.PI);
        (it.shiftKey || r.snapToGrid) && !(it.metaKey || it.ctrlKey) && (Ct = Math.round(Ct / 15) * 15), r.updateNode(t.id, { rotation: Ct });
      }, tt = () => {
        K.removeEventListener("pointermove", j), K.removeEventListener("pointerup", tt);
      };
      K.addEventListener("pointermove", j), K.addEventListener("pointerup", tt);
    },
    [r, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), nt = dt(
    (G, K) => {
      var yt;
      const $ = K.currentTarget.ownerDocument;
      K.stopPropagation(), K.preventDefault();
      const Q = K.clientX, lt = K.clientY, U = t.x, q = t.y, X = t.w, et = t.h === "auto" ? (((yt = c.current) == null ? void 0 : yt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h;
      let rt = !1;
      const j = (it) => {
        const gt = (it.clientX - Q) / r.viewport.zoom, ut = (it.clientY - lt) / r.viewport.zoom;
        rt || (rt = !0, r.pushHistorySnapshot());
        let St = U, Ct = q, Wt = X, Ft = et;
        if ((G === "nw" || G === "w" || G === "sw") && (St = U + gt, Wt = X - gt), (G === "ne" || G === "e" || G === "se") && (Wt = X + gt), (G === "nw" || G === "n" || G === "ne") && (Ct = q + ut, Ft = et - ut), (G === "sw" || G === "s" || G === "se") && (Ft = et + ut), r.snapToGrid && !(it.metaKey || it.ctrlKey)) {
          const Rt = r.gridSize, ct = (ee) => Math.round(ee / Rt) * Rt;
          (G === "nw" || G === "w" || G === "sw") && (St = ct(St), Wt = U + X - St), (G === "ne" || G === "e" || G === "se") && (Wt = ct(St + Wt) - St), (G === "nw" || G === "n" || G === "ne") && (Ct = ct(Ct), Ft = q + et - Ct), (G === "sw" || G === "s" || G === "se") && (Ft = ct(Ct + Ft) - Ct);
        }
        if (Wt < 100 && (Wt = 100, (G === "nw" || G === "w" || G === "sw") && (St = U + X - 100)), Ft < 60 && (Ft = 60, (G === "nw" || G === "n" || G === "ne") && (Ct = q + et - 60)), it.shiftKey) {
          const Rt = ns(
            G,
            U,
            q,
            X,
            et,
            St,
            Ct,
            Wt,
            Ft
          );
          St = Rt.x, Ct = Rt.y, Wt = Rt.w, Ft = Rt.h;
        }
        r.updateNode(t.id, { x: St, y: Ct, w: Wt, h: Ft });
      }, tt = () => {
        $.removeEventListener("pointermove", j), $.removeEventListener("pointerup", tt), requestAnimationFrame(() => E.current());
      };
      $.addEventListener("pointermove", j), $.addEventListener("pointerup", tt);
    },
    [r, t.id, t.x, t.y, t.w, t.h]
  ), mt = dt(
    (G) => {
      if (!G.altKey) {
        if (b) {
          G.stopPropagation();
          return;
        }
        if (e) {
          V(G);
          return;
        }
        V(G);
      }
    },
    [b, e, V, r, t.id]
  ), ft = dt(
    (G) => {
      if (G.stopPropagation(), !b) {
        if (t.groupId) {
          const K = [];
          let $ = t.groupId;
          for (; $; )
            K.push($), $ = r.groupParent.get($);
          if (!r.activeGroupId) {
            r.enterGroup(K[K.length - 1]), r.select(t.id);
            return;
          }
          const Q = K.indexOf(r.activeGroupId);
          if (Q > 0) {
            r.enterGroup(K[Q - 1]), r.select(t.id);
            return;
          }
        }
        r.select(t.id), M.current = { x: G.clientX, y: G.clientY }, x(!0);
      }
    },
    [b, r, t.id, t.groupId, C]
  ), Z = e && !o;
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
            onDoubleClick: ft,
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
                onPointerDown: mt,
                onKeyDown: b ? (G) => {
                  G.key === "Escape" && (G.stopPropagation(), x(!1));
                } : void 0,
                style: b ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: g ? /* @__PURE__ */ h(ii, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ h(Vc, { fallback: /* @__PURE__ */ h(ii, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ h(
                  Gl,
                  {
                    editor: C,
                    theme: "light",
                    editable: s && b
                  }
                ) })
              }
            )
          }
        ),
        Z && qc.map(({ pos: G, top: K, left: $ }) => {
          const Q = 8 / i;
          return /* @__PURE__ */ h(
            "div",
            {
              onPointerDown: (lt) => nt(G, lt),
              style: {
                position: "absolute",
                top: K,
                left: $,
                width: Q,
                height: Q,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: ln(G, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            G
          );
        }),
        Z && (() => {
          const G = 25 / i, K = 10 / i;
          return /* @__PURE__ */ S(kt, { children: [
            /* @__PURE__ */ h(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -G,
                  left: "50%",
                  width: 1.5 / i,
                  height: G,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ h(
              "div",
              {
                onPointerDown: J,
                style: {
                  position: "absolute",
                  top: -(G + K / 2),
                  left: "50%",
                  width: K,
                  height: K,
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
const pa = Me(Zc);
function Qc(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    pa,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: bs,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const Jc = {
  type: "content",
  component: Qc,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: $c } = Math, xr = $c + 1e-4, ai = 0.5, li = [1, 1];
function ci(t, e, o, r = (n) => n) {
  return t * r(0.5 - e * (0.5 - o));
}
const { min: Ln } = Math;
function fa(t, e, o) {
  let r = Ln(1, e / o);
  return Ln(1, t + (Ln(1, 1 - r) - t) * (r * 0.275));
}
function _c(t) {
  return [-t[0], -t[1]];
}
function He(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function di(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function ao(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function ss(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function io(t, e) {
  return [t[0] * e, t[1] * e];
}
function Rn(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function td(t, e) {
  return [t[0] / e, t[1] / e];
}
function ya(t) {
  return [t[1], -t[0]];
}
function Dn(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function hi(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function ed(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function od(t) {
  return Math.hypot(t[0], t[1]);
}
function ui(t, e) {
  let o = t[0] - e[0], r = t[1] - e[1];
  return o * o + r * r;
}
function ga(t) {
  return td(t, od(t));
}
function rd(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function Ss(t, e, o) {
  let r = Math.sin(o), n = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], a = s * n - i * r, l = s * r + i * n;
  return [a + e[0], l + e[1]];
}
function pi(t, e, o, r) {
  let n = Math.sin(r), s = Math.cos(r), i = e[0] - o[0], a = e[1] - o[1], l = i * s - a * n, c = i * n + a * s;
  return t[0] = l + o[0], t[1] = c + o[1], t;
}
function fi(t, e, o) {
  return He(t, io(ao(e, t), o));
}
function nd(t, e, o, r) {
  let n = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + n * r, t[1] = e[1] + s * r, t;
}
function ma(t, e, o) {
  return He(t, io(e, o));
}
const ye = [0, 0], oo = [0, 0], ro = [0, 0];
function sd(t, e) {
  let o = ma(t, ga(ya(ao(t, He(t, [1, 1])))), -e), r = [], n = 1 / 13;
  for (let s = n; s <= 1; s += n) r.push(Ss(o, t, xr * 2 * s));
  return r;
}
function id(t, e, o) {
  let r = [], n = 1 / o;
  for (let s = n; s <= 1; s += n) r.push(Ss(e, t, xr * s));
  return r;
}
function ad(t, e, o) {
  let r = ao(e, o), n = io(r, 0.5), s = io(r, 0.51);
  return [ao(t, n), ao(t, s), He(t, s), He(t, n)];
}
function ld(t, e, o, r) {
  let n = [], s = ma(t, e, o), i = 1 / r;
  for (let a = i; a < 1; a += i) n.push(Ss(s, t, xr * 3 * a));
  return n;
}
function cd(t, e, o) {
  return [He(t, io(e, o)), He(t, io(e, o * 0.99)), ao(t, io(e, o * 0.99)), ao(t, io(e, o))];
}
function yi(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function dd(t, e, o) {
  return t.slice(0, 10).reduce((r, n) => {
    let s = n.pressure;
    return e && (s = fa(r, n.distance, o)), (r + s) / 2;
  }, t[0].pressure);
}
function hd(t, e = {}) {
  let { size: o = 16, smoothing: r = 0.5, thinning: n = 0.5, simulatePressure: s = !0, easing: i = (K) => K, start: a = {}, end: l = {}, last: c = !1 } = e, { cap: u = !0, easing: p = (K) => K * (2 - K) } = a, { cap: d = !0, easing: f = (K) => --K * K * K + 1 } = l;
  if (t.length === 0 || o <= 0) return [];
  let m = t[t.length - 1].runningLength, y = yi(a.taper, o, m), b = yi(l.taper, o, m), x = (o * r) ** 2, g = [], k = [], M = dd(t, s, o), C = ci(o, n, t[t.length - 1].pressure, i), z, L = t[0].vector, D = t[0].point, E = D, V = D, J = E, nt = !1;
  for (let K = 0; K < t.length; K++) {
    let { pressure: $ } = t[K], { point: Q, vector: lt, distance: U, runningLength: q } = t[K], X = K === t.length - 1;
    if (!X && m - q < 3) continue;
    n ? (s && ($ = fa(M, U, o)), C = ci(o, n, $, i)) : C = o / 2, z === void 0 && (z = C);
    let et = q < y ? p(q / y) : 1, rt = m - q < b ? f((m - q) / b) : 1;
    C = Math.max(0.01, C * Math.min(et, rt));
    let j = (X ? t[K] : t[K + 1]).vector, tt = X ? 1 : hi(lt, j), yt = hi(lt, L) < 0 && !nt, it = tt !== null && tt < 0;
    if (yt || it) {
      Dn(ye, L), Rn(ye, ye, C);
      for (let gt = 0; gt <= 1; gt += 0.07692307692307693) ss(oo, Q, ye), pi(oo, oo, Q, xr * gt), V = [oo[0], oo[1]], g.push(V), di(ro, Q, ye), pi(ro, ro, Q, xr * -gt), J = [ro[0], ro[1]], k.push(J);
      D = V, E = J, it && (nt = !0);
      continue;
    }
    if (nt = !1, X) {
      Dn(ye, lt), Rn(ye, ye, C), g.push(ao(Q, ye)), k.push(He(Q, ye));
      continue;
    }
    nd(ye, j, lt, tt), Dn(ye, ye), Rn(ye, ye, C), ss(oo, Q, ye), V = [oo[0], oo[1]], (K <= 1 || ui(D, V) > x) && (g.push(V), D = V), di(ro, Q, ye), J = [ro[0], ro[1]], (K <= 1 || ui(E, J) > x) && (k.push(J), E = J), M = $, L = lt;
  }
  let mt = [t[0].point[0], t[0].point[1]], ft = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : He(t[0].point, [1, 1]), Z = [], G = [];
  if (t.length === 1) {
    if (!(y || b) || c) return sd(mt, z || C);
  } else {
    y || b && t.length === 1 || (u ? Z.push(...id(mt, k[0], 13)) : Z.push(...ad(mt, g[0], k[0])));
    let K = ya(_c(t[t.length - 1].vector));
    b || y && t.length === 1 ? G.push(ft) : d ? G.push(...ld(ft, K, C, 29)) : G.push(...cd(ft, K, C));
  }
  return g.concat(G, k.reverse(), Z);
}
const gi = [0, 0];
function mi(t) {
  return t != null && t >= 0;
}
function ud(t, e = {}) {
  var d;
  let { streamline: o = 0.5, size: r = 16, last: n = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: f, y: m, pressure: y = ai }) => [f, m, y]);
  if (i.length === 2) {
    let f = i[1];
    i = i.slice(0, -1);
    for (let m = 1; m < 5; m++) i.push(fi(i[0], f, m / 4));
  }
  i.length === 1 && (i = [...i, [...He(i[0], li), ...i[0].slice(2)]]);
  let a = [{ point: [i[0][0], i[0][1]], pressure: mi(i[0][2]) ? i[0][2] : 0.25, vector: [...li], distance: 0, runningLength: 0 }], l = !1, c = 0, u = a[0], p = i.length - 1;
  for (let f = 1; f < i.length; f++) {
    let m = n && f === p ? [i[f][0], i[f][1]] : fi(u.point, i[f], s);
    if (ed(u.point, m)) continue;
    let y = rd(m, u.point);
    if (c += y, f < p && !l) {
      if (c < r) continue;
      l = !0;
    }
    ss(gi, u.point, m), u = { point: m, pressure: mi(i[f][2]) ? i[f][2] : ai, vector: ga(gi), distance: y, runningLength: c }, a.push(u);
  }
  return a[0].vector = ((d = a[1]) == null ? void 0 : d.vector) || [0, 0], a;
}
function pd(t, e = {}) {
  return hd(ud(t, e), e);
}
var fd = pd;
function Ms(t, e = {}) {
  const o = fd(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return yd(o);
}
function yd(t) {
  if (!t.length) return "";
  const e = [], [o, r] = t[0];
  e.push("M", o, r);
  for (let n = 0; n < t.length; n++) {
    const [s, i] = t[n], [a, l] = t[(n + 1) % t.length];
    e.push("Q", s, i, (s + a) / 2, (i + l) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function ba(t, e = 0.5) {
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
function gd(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = ba(t, e), r = o.length, n = [];
  n.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < r; s++) {
    const [i, a] = o[s], [l, c] = o[(s + 1) % r];
    n.push("Q", i, a, (i + l) / 2, (a + c) / 2);
  }
  return n.push("Z"), n.join(" ");
}
function md(t, e, o, r) {
  const n = e[0] - t[0], s = e[1] - t[1], i = r[0] - o[0], a = r[1] - o[1], l = n * a - s * i;
  if (Math.abs(l) < 1e-10) return null;
  const c = ((o[0] - t[0]) * a - (o[1] - t[1]) * i) / l, u = ((o[0] - t[0]) * s - (o[1] - t[1]) * n) / l;
  return c <= 0 || c >= 1 || u <= 0 || u >= 1 ? null : [t[0] + c * n, t[1] + c * s];
}
function bd(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function bi(t) {
  let e = 0;
  for (let o = 0, r = t.length - 1; o < t.length; r = o++)
    e += (t[r][0] + t[o][0]) * (t[r][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function xd(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let a = i + 2; a < e - 1; a++) {
      const l = md(
        t[i],
        t[i + 1],
        t[a],
        t[a + 1]
      );
      if (!l) continue;
      const c = [l];
      for (let u = i + 1; u <= a; u++)
        c.push(t[u]);
      bi(c) < 100 || o.push({
        pathD: bd(c),
        points: c.map((u) => [u[0], u[1]])
      });
    }
  if (o.length === 0) return [];
  const r = o.map((i) => bi(i.points)), s = Math.max(...r) * 0.05;
  return o.filter((i, a) => r[a] >= s);
}
function Wn(t, e, o) {
  if (t && t.length) {
    const [r, n] = e, s = Math.PI / 180 * o, i = Math.cos(s), a = Math.sin(s);
    for (const l of t) {
      const [c, u] = l;
      l[0] = (c - r) * i - (u - n) * a + r, l[1] = (c - r) * a + (u - n) * i + n;
    }
  }
}
function wd(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function kd(t, e, o, r = 1) {
  const n = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, a = [0, 0];
  if (n) for (const c of i) Wn(c, a, n);
  const l = function(c, u, p) {
    const d = [];
    for (const g of c) {
      const k = [...g];
      wd(k[0], k[k.length - 1]) || k.push([k[0][0], k[0][1]]), k.length > 2 && d.push(k);
    }
    const f = [];
    u = Math.max(u, 0.1);
    const m = [];
    for (const g of d) for (let k = 0; k < g.length - 1; k++) {
      const M = g[k], C = g[k + 1];
      if (M[1] !== C[1]) {
        const z = Math.min(M[1], C[1]);
        m.push({ ymin: z, ymax: Math.max(M[1], C[1]), x: z === M[1] ? M[0] : C[0], islope: (C[0] - M[0]) / (C[1] - M[1]) });
      }
    }
    if (m.sort((g, k) => g.ymin < k.ymin ? -1 : g.ymin > k.ymin ? 1 : g.x < k.x ? -1 : g.x > k.x ? 1 : g.ymax === k.ymax ? 0 : (g.ymax - k.ymax) / Math.abs(g.ymax - k.ymax)), !m.length) return f;
    let y = [], b = m[0].ymin, x = 0;
    for (; y.length || m.length; ) {
      if (m.length) {
        let g = -1;
        for (let k = 0; k < m.length && !(m[k].ymin > b); k++) g = k;
        m.splice(0, g + 1).forEach((k) => {
          y.push({ s: b, edge: k });
        });
      }
      if (y = y.filter((g) => !(g.edge.ymax <= b)), y.sort((g, k) => g.edge.x === k.edge.x ? 0 : (g.edge.x - k.edge.x) / Math.abs(g.edge.x - k.edge.x)), (p !== 1 || x % u == 0) && y.length > 1) for (let g = 0; g < y.length; g += 2) {
        const k = g + 1;
        if (k >= y.length) break;
        const M = y[g].edge, C = y[k].edge;
        f.push([[Math.round(M.x), b], [Math.round(C.x), b]]);
      }
      b += p, y.forEach((g) => {
        g.edge.x = g.edge.x + p * g.edge.islope;
      }), x++;
    }
    return f;
  }(i, s, r);
  if (n) {
    for (const c of i) Wn(c, a, -n);
    (function(c, u, p) {
      const d = [];
      c.forEach((f) => d.push(...f)), Wn(d, u, p);
    })(l, a, -n);
  }
  return l;
}
function vr(t, e) {
  var o;
  const r = e.hachureAngle + 90;
  let n = e.hachureGap;
  n < 0 && (n = 4 * e.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = n), kd(t, n, r, s || 1);
}
class Cs {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const r = vr(e, o);
    return { type: "fillSketch", ops: this.renderLines(r, o) };
  }
  renderLines(e, o) {
    const r = [];
    for (const n of e) r.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], o));
    return r;
  }
}
function cn(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class vd extends Cs {
  fillPolygons(e, o) {
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    const n = vr(e, Object.assign({}, o, { hachureGap: r })), s = Math.PI / 180 * o.hachureAngle, i = [], a = 0.5 * r * Math.cos(s), l = 0.5 * r * Math.sin(s);
    for (const [c, u] of n) cn([c, u]) && i.push([[c[0] - a, c[1] + l], [...u]], [[c[0] + a, c[1] - l], [...u]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class Sd extends Cs {
  fillPolygons(e, o) {
    const r = this._fillPolygons(e, o), n = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, n);
    return r.ops = r.ops.concat(s.ops), r;
  }
}
class Md {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = vr(e, o = Object.assign({}, o, { hachureAngle: 0 }));
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
      const l = cn(a), c = l / n, u = Math.ceil(c) - 1, p = l - u * n, d = (a[0][0] + a[1][0]) / 2 - n / 4, f = Math.min(a[0][1], a[1][1]);
      for (let m = 0; m < u; m++) {
        const y = f + p + m * n, b = d - i + 2 * Math.random() * i, x = y - i + 2 * Math.random() * i, g = this.helper.ellipse(b, x, s, s, o);
        r.push(...g.ops);
      }
    }
    return { type: "fillSketch", ops: r };
  }
}
class Cd {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = vr(e, o);
    return { type: "fillSketch", ops: this.dashedLine(r, o) };
  }
  dashedLine(e, o) {
    const r = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, n = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const a = cn(i), l = Math.floor(a / (r + n)), c = (a + n - l * (r + n)) / 2;
      let u = i[0], p = i[1];
      u[0] > p[0] && (u = i[1], p = i[0]);
      const d = Math.atan((p[1] - u[1]) / (p[0] - u[0]));
      for (let f = 0; f < l; f++) {
        const m = f * (r + n), y = m + r, b = [u[0] + m * Math.cos(d) + c * Math.cos(d), u[1] + m * Math.sin(d) + c * Math.sin(d)], x = [u[0] + y * Math.cos(d) + c * Math.cos(d), u[1] + y * Math.sin(d) + c * Math.sin(d)];
        s.push(...this.helper.doubleLineOps(b[0], b[1], x[0], x[1], o));
      }
    }), s;
  }
}
class Id {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, n = o.zigzagOffset < 0 ? r : o.zigzagOffset, s = vr(e, o = Object.assign({}, o, { hachureGap: r + n }));
    return { type: "fillSketch", ops: this.zigzagLines(s, n, o) };
  }
  zigzagLines(e, o, r) {
    const n = [];
    return e.forEach((s) => {
      const i = cn(s), a = Math.round(i / (2 * o));
      let l = s[0], c = s[1];
      l[0] > c[0] && (l = s[1], c = s[0]);
      const u = Math.atan((c[1] - l[1]) / (c[0] - l[0]));
      for (let p = 0; p < a; p++) {
        const d = 2 * p * o, f = 2 * (p + 1) * o, m = Math.sqrt(2 * Math.pow(o, 2)), y = [l[0] + d * Math.cos(u), l[1] + d * Math.sin(u)], b = [l[0] + f * Math.cos(u), l[1] + f * Math.sin(u)], x = [y[0] + m * Math.cos(u + Math.PI / 4), y[1] + m * Math.sin(u + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(y[0], y[1], x[0], x[1], r), ...this.helper.doubleLineOps(x[0], x[1], b[0], b[1], r));
      }
    }), n;
  }
}
const ke = {};
class zd {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const Td = 0, Fn = 1, xi = 2, Fr = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function Bn(t, e) {
  return t.type === e;
}
function Is(t) {
  const e = [], o = function(i) {
    const a = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) a[a.length] = { type: Td, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      a[a.length] = { type: Fn, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return a[a.length] = { type: xi, text: "" }, a;
  }(t);
  let r = "BOD", n = 0, s = o[n];
  for (; !Bn(s, xi); ) {
    let i = 0;
    const a = [];
    if (r === "BOD") {
      if (s.text !== "M" && s.text !== "m") return Is("M0,0" + t);
      n++, i = Fr[s.text], r = s.text;
    } else Bn(s, Fn) ? i = Fr[r] : (n++, i = Fr[s.text], r = s.text);
    if (!(n + i < o.length)) throw new Error("Path data ended short");
    for (let l = n; l < n + i; l++) {
      const c = o[l];
      if (!Bn(c, Fn)) throw new Error("Param not a number: " + r + "," + c.text);
      a[a.length] = +c.text;
    }
    if (typeof Fr[r] != "number") throw new Error("Bad segment: " + r);
    {
      const l = { key: r, data: a };
      e.push(l), n += i, s = o[n], r === "M" && (r = "L"), r === "m" && (r = "l");
    }
  }
  return e;
}
function xa(t) {
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
      const l = a.map((c, u) => u % 2 ? c + o : c + e);
      s.push({ key: "C", data: l }), e = l[4], o = l[5];
      break;
    }
    case "Q":
      s.push({ key: "Q", data: [...a] }), e = a[2], o = a[3];
      break;
    case "q": {
      const l = a.map((c, u) => u % 2 ? c + o : c + e);
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
      const l = a.map((c, u) => u % 2 ? c + o : c + e);
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
function wa(t) {
  const e = [];
  let o = "", r = 0, n = 0, s = 0, i = 0, a = 0, l = 0;
  for (const { key: c, data: u } of t) {
    switch (c) {
      case "M":
        e.push({ key: "M", data: [...u] }), [r, n] = u, [s, i] = u;
        break;
      case "C":
        e.push({ key: "C", data: [...u] }), r = u[4], n = u[5], a = u[2], l = u[3];
        break;
      case "L":
        e.push({ key: "L", data: [...u] }), [r, n] = u;
        break;
      case "H":
        r = u[0], e.push({ key: "L", data: [r, n] });
        break;
      case "V":
        n = u[0], e.push({ key: "L", data: [r, n] });
        break;
      case "S": {
        let p = 0, d = 0;
        o === "C" || o === "S" ? (p = r + (r - a), d = n + (n - l)) : (p = r, d = n), e.push({ key: "C", data: [p, d, ...u] }), a = u[0], l = u[1], r = u[2], n = u[3];
        break;
      }
      case "T": {
        const [p, d] = u;
        let f = 0, m = 0;
        o === "Q" || o === "T" ? (f = r + (r - a), m = n + (n - l)) : (f = r, m = n);
        const y = r + 2 * (f - r) / 3, b = n + 2 * (m - n) / 3, x = p + 2 * (f - p) / 3, g = d + 2 * (m - d) / 3;
        e.push({ key: "C", data: [y, b, x, g, p, d] }), a = f, l = m, r = p, n = d;
        break;
      }
      case "Q": {
        const [p, d, f, m] = u, y = r + 2 * (p - r) / 3, b = n + 2 * (d - n) / 3, x = f + 2 * (p - f) / 3, g = m + 2 * (d - m) / 3;
        e.push({ key: "C", data: [y, b, x, g, f, m] }), a = p, l = d, r = f, n = m;
        break;
      }
      case "A": {
        const p = Math.abs(u[0]), d = Math.abs(u[1]), f = u[2], m = u[3], y = u[4], b = u[5], x = u[6];
        p === 0 || d === 0 ? (e.push({ key: "C", data: [r, n, b, x, b, x] }), r = b, n = x) : (r !== b || n !== x) && (ka(r, n, b, x, p, d, f, m, y).forEach(function(g) {
          e.push({ key: "C", data: g });
        }), r = b, n = x);
        break;
      }
      case "Z":
        e.push({ key: "Z", data: [] }), r = s, n = i;
    }
    o = c;
  }
  return e;
}
function ur(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function ka(t, e, o, r, n, s, i, a, l, c) {
  const u = (p = i, Math.PI * p / 180);
  var p;
  let d = [], f = 0, m = 0, y = 0, b = 0;
  if (c) [f, m, y, b] = c;
  else {
    [t, e] = ur(t, e, -u), [o, r] = ur(o, r, -u);
    const mt = (t - o) / 2, ft = (e - r) / 2;
    let Z = mt * mt / (n * n) + ft * ft / (s * s);
    Z > 1 && (Z = Math.sqrt(Z), n *= Z, s *= Z);
    const G = n * n, K = s * s, $ = G * K - G * ft * ft - K * mt * mt, Q = G * ft * ft + K * mt * mt, lt = (a === l ? -1 : 1) * Math.sqrt(Math.abs($ / Q));
    y = lt * n * ft / s + (t + o) / 2, b = lt * -s * mt / n + (e + r) / 2, f = Math.asin(parseFloat(((e - b) / s).toFixed(9))), m = Math.asin(parseFloat(((r - b) / s).toFixed(9))), t < y && (f = Math.PI - f), o < y && (m = Math.PI - m), f < 0 && (f = 2 * Math.PI + f), m < 0 && (m = 2 * Math.PI + m), l && f > m && (f -= 2 * Math.PI), !l && m > f && (m -= 2 * Math.PI);
  }
  let x = m - f;
  if (Math.abs(x) > 120 * Math.PI / 180) {
    const mt = m, ft = o, Z = r;
    m = l && m > f ? f + 120 * Math.PI / 180 * 1 : f + 120 * Math.PI / 180 * -1, d = ka(o = y + n * Math.cos(m), r = b + s * Math.sin(m), ft, Z, n, s, i, 0, l, [m, mt, y, b]);
  }
  x = m - f;
  const g = Math.cos(f), k = Math.sin(f), M = Math.cos(m), C = Math.sin(m), z = Math.tan(x / 4), L = 4 / 3 * n * z, D = 4 / 3 * s * z, E = [t, e], V = [t + L * k, e - D * g], J = [o + L * C, r - D * M], nt = [o, r];
  if (V[0] = 2 * E[0] - V[0], V[1] = 2 * E[1] - V[1], c) return [V, J, nt].concat(d);
  {
    d = [V, J, nt].concat(d);
    const mt = [];
    for (let ft = 0; ft < d.length; ft += 3) {
      const Z = ur(d[ft][0], d[ft][1], u), G = ur(d[ft + 1][0], d[ft + 1][1], u), K = ur(d[ft + 2][0], d[ft + 2][1], u);
      mt.push([Z[0], Z[1], G[0], G[1], K[0], K[1]]);
    }
    return mt;
  }
}
const Pd = { randOffset: function(t, e) {
  return Xt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return Jr(t, e, o);
}, ellipse: function(t, e, o, r, n) {
  const s = Sa(o, r, n);
  return is(t, e, n, s).opset;
}, doubleLineOps: function(t, e, o, r, n) {
  return uo(t, e, o, r, n, !0);
} };
function va(t, e, o, r, n) {
  return { type: "path", ops: uo(t, e, o, r, n) };
}
function Vr(t, e, o) {
  const r = (t || []).length;
  if (r > 2) {
    const n = [];
    for (let s = 0; s < r - 1; s++) n.push(...uo(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && n.push(...uo(t[r - 1][0], t[r - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: n };
  }
  return r === 2 ? va(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function Ad(t, e, o, r, n) {
  return function(s, i) {
    return Vr(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + r], [t, e + r]], n);
}
function wi(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, r = Br(o[0], 1 * (1 + 0.2 * e.roughness), e), n = e.disableMultiStroke ? [] : Br(o[0], 1.5 * (1 + 0.22 * e.roughness), Si(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const a = Br(i, 1 * (1 + 0.2 * e.roughness), e), l = e.disableMultiStroke ? [] : Br(i, 1.5 * (1 + 0.22 * e.roughness), Si(e));
        for (const c of a) c.op !== "move" && r.push(c);
        for (const c of l) c.op !== "move" && n.push(c);
      }
    }
    return { type: "path", ops: r.concat(n) };
  }
  return { type: "path", ops: [] };
}
function Sa(t, e, o) {
  const r = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), n = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * r)), s = 2 * Math.PI / n;
  let i = Math.abs(t / 2), a = Math.abs(e / 2);
  const l = 1 - o.curveFitting;
  return i += Xt(i * l, o), a += Xt(a * l, o), { increment: s, rx: i, ry: a };
}
function is(t, e, o, r) {
  const [n, s] = Mi(r.increment, t, e, r.rx, r.ry, 1, r.increment * Jr(0.1, Jr(0.4, 1, o), o), o);
  let i = $r(n, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [a] = Mi(r.increment, t, e, r.rx, r.ry, 1.5, 0, o), l = $r(a, null, o);
    i = i.concat(l);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function ki(t, e, o, r, n, s, i, a, l) {
  const c = t, u = e;
  let p = Math.abs(o / 2), d = Math.abs(r / 2);
  p += Xt(0.01 * p, l), d += Xt(0.01 * d, l);
  let f = n, m = s;
  for (; f < 0; ) f += 2 * Math.PI, m += 2 * Math.PI;
  m - f > 2 * Math.PI && (f = 0, m = 2 * Math.PI);
  const y = 2 * Math.PI / l.curveStepCount, b = Math.min(y / 2, (m - f) / 2), x = Ci(b, c, u, p, d, f, m, 1, l);
  if (!l.disableMultiStroke) {
    const g = Ci(b, c, u, p, d, f, m, 1.5, l);
    x.push(...g);
  }
  return i && (a ? x.push(...uo(c, u, c + p * Math.cos(f), u + d * Math.sin(f), l), ...uo(c, u, c + p * Math.cos(m), u + d * Math.sin(m), l)) : x.push({ op: "lineTo", data: [c, u] }, { op: "lineTo", data: [c + p * Math.cos(f), u + d * Math.sin(f)] })), { type: "path", ops: x };
}
function vi(t, e) {
  const o = wa(xa(Is(t))), r = [];
  let n = [0, 0], s = [0, 0];
  for (const { key: i, data: a } of o) switch (i) {
    case "M":
      s = [a[0], a[1]], n = [a[0], a[1]];
      break;
    case "L":
      r.push(...uo(s[0], s[1], a[0], a[1], e)), s = [a[0], a[1]];
      break;
    case "C": {
      const [l, c, u, p, d, f] = a;
      r.push(...Ed(l, c, u, p, d, f, s, e)), s = [d, f];
      break;
    }
    case "Z":
      r.push(...uo(s[0], s[1], n[0], n[1], e)), s = [n[0], n[1]];
  }
  return { type: "path", ops: r };
}
function Nn(t, e) {
  const o = [];
  for (const r of t) if (r.length) {
    const n = e.maxRandomnessOffset || 0, s = r.length;
    if (s > 2) {
      o.push({ op: "move", data: [r[0][0] + Xt(n, e), r[0][1] + Xt(n, e)] });
      for (let i = 1; i < s; i++) o.push({ op: "lineTo", data: [r[i][0] + Xt(n, e), r[i][1] + Xt(n, e)] });
    }
  }
  return { type: "fillPath", ops: o };
}
function qo(t, e) {
  return function(o, r) {
    let n = o.fillStyle || "hachure";
    if (!ke[n]) switch (n) {
      case "zigzag":
        ke[n] || (ke[n] = new vd(r));
        break;
      case "cross-hatch":
        ke[n] || (ke[n] = new Sd(r));
        break;
      case "dots":
        ke[n] || (ke[n] = new Md(r));
        break;
      case "dashed":
        ke[n] || (ke[n] = new Cd(r));
        break;
      case "zigzag-line":
        ke[n] || (ke[n] = new Id(r));
        break;
      default:
        n = "hachure", ke[n] || (ke[n] = new Cs(r));
    }
    return ke[n];
  }(e, Pd).fillPolygons(t, e);
}
function Si(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function Ma(t) {
  return t.randomizer || (t.randomizer = new zd(t.seed || 0)), t.randomizer.next();
}
function Jr(t, e, o, r = 1) {
  return o.roughness * r * (Ma(o) * (e - t) + t);
}
function Xt(t, e, o = 1) {
  return Jr(-t, t, e, o);
}
function uo(t, e, o, r, n, s = !1) {
  const i = s ? n.disableMultiStrokeFill : n.disableMultiStroke, a = as(t, e, o, r, n, !0, !1);
  if (i) return a;
  const l = as(t, e, o, r, n, !0, !0);
  return a.concat(l);
}
function as(t, e, o, r, n, s, i) {
  const a = Math.pow(t - o, 2) + Math.pow(e - r, 2), l = Math.sqrt(a);
  let c = 1;
  c = l < 200 ? 1 : l > 500 ? 0.4 : -16668e-7 * l + 1.233334;
  let u = n.maxRandomnessOffset || 0;
  u * u * 100 > a && (u = l / 10);
  const p = u / 2, d = 0.2 + 0.2 * Ma(n);
  let f = n.bowing * n.maxRandomnessOffset * (r - e) / 200, m = n.bowing * n.maxRandomnessOffset * (t - o) / 200;
  f = Xt(f, n, c), m = Xt(m, n, c);
  const y = [], b = () => Xt(p, n, c), x = () => Xt(u, n, c), g = n.preserveVertices;
  return i ? y.push({ op: "move", data: [t + (g ? 0 : b()), e + (g ? 0 : b())] }) : y.push({ op: "move", data: [t + (g ? 0 : Xt(u, n, c)), e + (g ? 0 : Xt(u, n, c))] }), i ? y.push({ op: "bcurveTo", data: [f + t + (o - t) * d + b(), m + e + (r - e) * d + b(), f + t + 2 * (o - t) * d + b(), m + e + 2 * (r - e) * d + b(), o + (g ? 0 : b()), r + (g ? 0 : b())] }) : y.push({ op: "bcurveTo", data: [f + t + (o - t) * d + x(), m + e + (r - e) * d + x(), f + t + 2 * (o - t) * d + x(), m + e + 2 * (r - e) * d + x(), o + (g ? 0 : x()), r + (g ? 0 : x())] }), y;
}
function Br(t, e, o) {
  if (!t.length) return [];
  const r = [];
  r.push([t[0][0] + Xt(e, o), t[0][1] + Xt(e, o)]), r.push([t[0][0] + Xt(e, o), t[0][1] + Xt(e, o)]);
  for (let n = 1; n < t.length; n++) r.push([t[n][0] + Xt(e, o), t[n][1] + Xt(e, o)]), n === t.length - 1 && r.push([t[n][0] + Xt(e, o), t[n][1] + Xt(e, o)]);
  return $r(r, null, o);
}
function $r(t, e, o) {
  const r = t.length, n = [];
  if (r > 3) {
    const s = [], i = 1 - o.curveTightness;
    n.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let a = 1; a + 2 < r; a++) {
      const l = t[a];
      s[0] = [l[0], l[1]], s[1] = [l[0] + (i * t[a + 1][0] - i * t[a - 1][0]) / 6, l[1] + (i * t[a + 1][1] - i * t[a - 1][1]) / 6], s[2] = [t[a + 1][0] + (i * t[a][0] - i * t[a + 2][0]) / 6, t[a + 1][1] + (i * t[a][1] - i * t[a + 2][1]) / 6], s[3] = [t[a + 1][0], t[a + 1][1]], n.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else r === 3 ? (n.push({ op: "move", data: [t[1][0], t[1][1]] }), n.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : r === 2 && n.push(...as(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return n;
}
function Mi(t, e, o, r, n, s, i, a) {
  const l = [], c = [];
  if (a.roughness === 0) {
    t /= 4, c.push([e + r * Math.cos(-t), o + n * Math.sin(-t)]);
    for (let u = 0; u <= 2 * Math.PI; u += t) {
      const p = [e + r * Math.cos(u), o + n * Math.sin(u)];
      l.push(p), c.push(p);
    }
    c.push([e + r * Math.cos(0), o + n * Math.sin(0)]), c.push([e + r * Math.cos(t), o + n * Math.sin(t)]);
  } else {
    const u = Xt(0.5, a) - Math.PI / 2;
    c.push([Xt(s, a) + e + 0.9 * r * Math.cos(u - t), Xt(s, a) + o + 0.9 * n * Math.sin(u - t)]);
    const p = 2 * Math.PI + u - 0.01;
    for (let d = u; d < p; d += t) {
      const f = [Xt(s, a) + e + r * Math.cos(d), Xt(s, a) + o + n * Math.sin(d)];
      l.push(f), c.push(f);
    }
    c.push([Xt(s, a) + e + r * Math.cos(u + 2 * Math.PI + 0.5 * i), Xt(s, a) + o + n * Math.sin(u + 2 * Math.PI + 0.5 * i)]), c.push([Xt(s, a) + e + 0.98 * r * Math.cos(u + i), Xt(s, a) + o + 0.98 * n * Math.sin(u + i)]), c.push([Xt(s, a) + e + 0.9 * r * Math.cos(u + 0.5 * i), Xt(s, a) + o + 0.9 * n * Math.sin(u + 0.5 * i)]);
  }
  return [c, l];
}
function Ci(t, e, o, r, n, s, i, a, l) {
  const c = s + Xt(0.1, l), u = [];
  u.push([Xt(a, l) + e + 0.9 * r * Math.cos(c - t), Xt(a, l) + o + 0.9 * n * Math.sin(c - t)]);
  for (let p = c; p <= i; p += t) u.push([Xt(a, l) + e + r * Math.cos(p), Xt(a, l) + o + n * Math.sin(p)]);
  return u.push([e + r * Math.cos(i), o + n * Math.sin(i)]), u.push([e + r * Math.cos(i), o + n * Math.sin(i)]), $r(u, null, l);
}
function Ed(t, e, o, r, n, s, i, a) {
  const l = [], c = [a.maxRandomnessOffset || 1, (a.maxRandomnessOffset || 1) + 0.3];
  let u = [0, 0];
  const p = a.disableMultiStroke ? 1 : 2, d = a.preserveVertices;
  for (let f = 0; f < p; f++) f === 0 ? l.push({ op: "move", data: [i[0], i[1]] }) : l.push({ op: "move", data: [i[0] + (d ? 0 : Xt(c[0], a)), i[1] + (d ? 0 : Xt(c[0], a))] }), u = d ? [n, s] : [n + Xt(c[f], a), s + Xt(c[f], a)], l.push({ op: "bcurveTo", data: [t + Xt(c[f], a), e + Xt(c[f], a), o + Xt(c[f], a), r + Xt(c[f], a), u[0], u[1]] });
  return l;
}
function pr(t) {
  return [...t];
}
function Ii(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const r = [];
  if (o === 3) r.push(pr(t[0]), pr(t[1]), pr(t[2]), pr(t[2]));
  else {
    const n = [];
    n.push(t[0], t[0]);
    for (let a = 1; a < t.length; a++) n.push(t[a]), a === t.length - 1 && n.push(t[a]);
    const s = [], i = 1 - e;
    r.push(pr(n[0]));
    for (let a = 1; a + 2 < n.length; a++) {
      const l = n[a];
      s[0] = [l[0], l[1]], s[1] = [l[0] + (i * n[a + 1][0] - i * n[a - 1][0]) / 6, l[1] + (i * n[a + 1][1] - i * n[a - 1][1]) / 6], s[2] = [n[a + 1][0] + (i * n[a][0] - i * n[a + 2][0]) / 6, n[a + 1][1] + (i * n[a][1] - i * n[a + 2][1]) / 6], s[3] = [n[a + 1][0], n[a + 1][1]], r.push(s[1], s[2], s[3]);
    }
  }
  return r;
}
function Kr(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function Ld(t, e, o) {
  const r = Kr(e, o);
  if (r === 0) return Kr(t, e);
  let n = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / r;
  return n = Math.max(0, Math.min(1, n)), Kr(t, zo(e, o, n));
}
function zo(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function ls(t, e, o, r) {
  const n = r || [];
  if (function(a, l) {
    const c = a[l + 0], u = a[l + 1], p = a[l + 2], d = a[l + 3];
    let f = 3 * u[0] - 2 * c[0] - d[0];
    f *= f;
    let m = 3 * u[1] - 2 * c[1] - d[1];
    m *= m;
    let y = 3 * p[0] - 2 * d[0] - c[0];
    y *= y;
    let b = 3 * p[1] - 2 * d[1] - c[1];
    return b *= b, f < y && (f = y), m < b && (m = b), f + m;
  }(t, e) < o) {
    const a = t[e + 0];
    n.length ? (s = n[n.length - 1], i = a, Math.sqrt(Kr(s, i)) > 1 && n.push(a)) : n.push(a), n.push(t[e + 3]);
  } else {
    const l = t[e + 0], c = t[e + 1], u = t[e + 2], p = t[e + 3], d = zo(l, c, 0.5), f = zo(c, u, 0.5), m = zo(u, p, 0.5), y = zo(d, f, 0.5), b = zo(f, m, 0.5), x = zo(y, b, 0.5);
    ls([l, d, y, x], 0, o, n), ls([x, b, m, p], 0, o, n);
  }
  var s, i;
  return n;
}
function Rd(t, e) {
  return _r(t, 0, t.length, e);
}
function _r(t, e, o, r, n) {
  const s = n || [], i = t[e], a = t[o - 1];
  let l = 0, c = 1;
  for (let u = e + 1; u < o - 1; ++u) {
    const p = Ld(t[u], i, a);
    p > l && (l = p, c = u);
  }
  return Math.sqrt(l) > r ? (_r(t, e, c + 1, r, s), _r(t, c, o, r, s)) : (s.length || s.push(i), s.push(a)), s;
}
function Hn(t, e = 0.15, o) {
  const r = [], n = (t.length - 1) / 3;
  for (let s = 0; s < n; s++)
    ls(t, 3 * s, e, r);
  return o && o > 0 ? _r(r, 0, r.length, o) : r;
}
const Ie = "none";
class tn {
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
    return this._d("line", [va(e, o, r, n, i)], i);
  }
  rectangle(e, o, r, n, s) {
    const i = this._o(s), a = [], l = Ad(e, o, r, n, i);
    if (i.fill) {
      const c = [[e, o], [e + r, o], [e + r, o + n], [e, o + n]];
      i.fillStyle === "solid" ? a.push(Nn([c], i)) : a.push(qo([c], i));
    }
    return i.stroke !== Ie && a.push(l), this._d("rectangle", a, i);
  }
  ellipse(e, o, r, n, s) {
    const i = this._o(s), a = [], l = Sa(r, n, i), c = is(e, o, i, l);
    if (i.fill) if (i.fillStyle === "solid") {
      const u = is(e, o, i, l).opset;
      u.type = "fillPath", a.push(u);
    } else a.push(qo([c.estimatedPoints], i));
    return i.stroke !== Ie && a.push(c.opset), this._d("ellipse", a, i);
  }
  circle(e, o, r, n) {
    const s = this.ellipse(e, o, r, r, n);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const r = this._o(o);
    return this._d("linearPath", [Vr(e, !1, r)], r);
  }
  arc(e, o, r, n, s, i, a = !1, l) {
    const c = this._o(l), u = [], p = ki(e, o, r, n, s, i, a, !0, c);
    if (a && c.fill) if (c.fillStyle === "solid") {
      const d = Object.assign({}, c);
      d.disableMultiStroke = !0;
      const f = ki(e, o, r, n, s, i, !0, !1, d);
      f.type = "fillPath", u.push(f);
    } else u.push(function(d, f, m, y, b, x, g) {
      const k = d, M = f;
      let C = Math.abs(m / 2), z = Math.abs(y / 2);
      C += Xt(0.01 * C, g), z += Xt(0.01 * z, g);
      let L = b, D = x;
      for (; L < 0; ) L += 2 * Math.PI, D += 2 * Math.PI;
      D - L > 2 * Math.PI && (L = 0, D = 2 * Math.PI);
      const E = (D - L) / g.curveStepCount, V = [];
      for (let J = L; J <= D; J += E) V.push([k + C * Math.cos(J), M + z * Math.sin(J)]);
      return V.push([k + C * Math.cos(D), M + z * Math.sin(D)]), V.push([k, M]), qo([V], g);
    }(e, o, r, n, s, i, c));
    return c.stroke !== Ie && u.push(p), this._d("arc", u, c);
  }
  curve(e, o) {
    const r = this._o(o), n = [], s = wi(e, r);
    if (r.fill && r.fill !== Ie) if (r.fillStyle === "solid") {
      const i = wi(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], a = e;
      if (a.length) {
        const l = typeof a[0][0] == "number" ? [a] : a;
        for (const c of l) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...Hn(Ii([c[0], c[0], c[1], c[2]]), 10, (1 + r.roughness) / 2)) : i.push(...Hn(Ii(c), 10, (1 + r.roughness) / 2));
      }
      i.length && n.push(qo([i], r));
    }
    return r.stroke !== Ie && n.push(s), this._d("curve", n, r);
  }
  polygon(e, o) {
    const r = this._o(o), n = [], s = Vr(e, !0, r);
    return r.fill && (r.fillStyle === "solid" ? n.push(Nn([e], r)) : n.push(qo([e], r))), r.stroke !== Ie && n.push(s), this._d("polygon", n, r);
  }
  path(e, o) {
    const r = this._o(o), n = [];
    if (!e) return this._d("path", n, r);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = r.fill && r.fill !== "transparent" && r.fill !== Ie, i = r.stroke !== Ie, a = !!(r.simplification && r.simplification < 1), l = function(u, p, d) {
      const f = wa(xa(Is(u))), m = [];
      let y = [], b = [0, 0], x = [];
      const g = () => {
        x.length >= 4 && y.push(...Hn(x, p)), x = [];
      }, k = () => {
        g(), y.length && (m.push(y), y = []);
      };
      for (const { key: C, data: z } of f) switch (C) {
        case "M":
          k(), b = [z[0], z[1]], y.push(b);
          break;
        case "L":
          g(), y.push([z[0], z[1]]);
          break;
        case "C":
          if (!x.length) {
            const L = y.length ? y[y.length - 1] : b;
            x.push([L[0], L[1]]);
          }
          x.push([z[0], z[1]]), x.push([z[2], z[3]]), x.push([z[4], z[5]]);
          break;
        case "Z":
          g(), y.push([b[0], b[1]]);
      }
      if (k(), !d) return m;
      const M = [];
      for (const C of m) {
        const z = Rd(C, d);
        z.length && M.push(z);
      }
      return M;
    }(e, 1, a ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2), c = vi(e, r);
    if (s) if (r.fillStyle === "solid") if (l.length === 1) {
      const u = vi(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(u.ops) });
    } else n.push(Nn(l, r));
    else n.push(qo(l, r));
    return i && (a ? l.forEach((u) => {
      n.push(Vr(u, !1, r));
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
          i = { d: this.opsToPath(s), stroke: r.stroke, strokeWidth: r.strokeWidth, fill: Ie };
          break;
        case "fillPath":
          i = { d: this.opsToPath(s), stroke: Ie, strokeWidth: 0, fill: r.fill || Ie };
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
    return r < 0 && (r = o.strokeWidth / 2), { d: this.opsToPath(e), stroke: o.fill || Ie, strokeWidth: r, fill: Ie };
  }
  _mergedShape(e) {
    return e.filter((o, r) => r === 0 || o.op !== "move");
  }
}
class Dd {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new tn(o);
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
const Nr = "http://www.w3.org/2000/svg";
class Wd {
  constructor(e, o) {
    this.svg = e, this.gen = new tn(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, s = n.createElementNS(Nr, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const a of o) {
      let l = null;
      switch (a.type) {
        case "path":
          l = n.createElementNS(Nr, "path"), l.setAttribute("d", this.opsToPath(a, i)), l.setAttribute("stroke", r.stroke), l.setAttribute("stroke-width", r.strokeWidth + ""), l.setAttribute("fill", "none"), r.strokeLineDash && l.setAttribute("stroke-dasharray", r.strokeLineDash.join(" ").trim()), r.strokeLineDashOffset && l.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
          break;
        case "fillPath":
          l = n.createElementNS(Nr, "path"), l.setAttribute("d", this.opsToPath(a, i)), l.setAttribute("stroke", "none"), l.setAttribute("stroke-width", "0"), l.setAttribute("fill", r.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || l.setAttribute("fill-rule", "evenodd");
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
    const s = e.createElementNS(Nr, "path");
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
var Fd = { canvas: (t, e) => new Dd(t, e), svg: (t, e) => new Wd(t, e), generator: (t) => new tn(t), newSeed: () => tn.newSeed() };
const Ue = Fd.generator();
function Bd(t) {
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
    seed: t.seed ? Bd(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function fo(t) {
  var r;
  const e = t.options, o = (r = e == null ? void 0 : e.strokeLineDash) != null && r.length ? e.strokeLineDash.join(" ") : void 0;
  return Ue.toPaths(t).map((n) => ({
    d: n.d,
    stroke: n.stroke,
    strokeWidth: n.strokeWidth,
    fill: n.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: n.stroke !== "none" && n.strokeWidth > 0 ? o : void 0
  }));
}
function No(t, e) {
  return Math.min(t, e) * 0.25;
}
function Nd(t, e, o, r, n) {
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
function wr(t, e, o, r, n, s) {
  if (s) {
    const i = No(o, r);
    return fo(Ue.path(Nd(t, e, o, r, i), po(n)));
  }
  return fo(Ue.rectangle(t, e, o, r, po(n)));
}
function dn(t, e, o, r, n) {
  return fo(Ue.ellipse(t, e, o, r, po(n)));
}
function Hd(t, e, o, r, n) {
  const s = t + o / 2, i = e + r / 2, a = [s, e], l = [t + o, i], c = [s, e + r], u = [t, i], p = Math.hypot(o / 2, r / 2), d = Math.min(n, p / 2) / p, f = (z, L, D) => [
    z[0] + D * (L[0] - z[0]),
    z[1] + D * (L[1] - z[1])
  ], m = f(u, a, 1 - d), y = f(a, l, d), b = f(a, l, 1 - d), x = f(l, c, d), g = f(l, c, 1 - d), k = f(c, u, d), M = f(c, u, 1 - d), C = f(u, a, d);
  return [
    `M${y[0]},${y[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${l[0]},${l[1]} ${x[0]},${x[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${c[0]},${c[1]} ${k[0]},${k[1]}`,
    `L${M[0]},${M[1]}`,
    `Q${u[0]},${u[1]} ${C[0]},${C[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${a[0]},${a[1]} ${y[0]},${y[1]}`,
    "Z"
  ].join(" ");
}
function hn(t, e, o, r, n, s) {
  if (s) {
    const a = No(o, r);
    return fo(Ue.path(Hd(t, e, o, r, a), po(n)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + r / 2],
    [t + o / 2, e + r],
    [t, e + r / 2]
  ];
  return fo(Ue.polygon(i, po(n)));
}
function Ao(t, e, o, r, n) {
  return fo(Ue.line(t, e, o, r, po(n)));
}
function un(t, e, o, r, n) {
  const s = Ao(t, e, o, r, n), i = Math.atan2(r - e, o - t), a = Math.max(12, n.strokeWidth * 4), l = Math.PI / 6, c = o - a * Math.cos(i - l), u = r - a * Math.sin(i - l), p = o - a * Math.cos(i + l), d = r - a * Math.sin(i + l), f = Ao(o, r, c, u, n), m = Ao(o, r, p, d, n);
  return [...s, ...f, ...m];
}
function zi(t, e) {
  const o = {
    ...po(e),
    stroke: "none"
  };
  return fo(Ue.polygon(t, o));
}
function On(t, e) {
  return fo(Ue.path(t, po(e)));
}
function Ze(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function Od(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function Xd({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ h(Yd, { node: o }) : /* @__PURE__ */ h(Gd, { node: o });
  }
  return /* @__PURE__ */ h(jd, { node: t, editingLabel: e });
}
const en = Me(Xd), Gd = Me(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", r = Ze(e.data.strokeStyle), n = Vt(
    () => o ? null : Ms(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Vt(() => {
    const u = e.data.points;
    if (!u || u.length === 0) return "";
    if (u.length === 1) return `M${u[0][0]},${u[0][1]}L${u[0][0]},${u[0][1]}`;
    const p = [`M${u[0][0]},${u[0][1]}`];
    for (let d = 1; d < u.length; d++)
      p.push(`L${u[d][0]},${u[d][1]}`);
    return p.join("");
  }, [e.data.points]), i = Vt(() => {
    if (!o) return null;
    const u = e.data.points;
    if (u.length < 2) return "";
    const p = ["M", u[0][0], u[0][1]];
    for (let f = 1; f < u.length; f++) {
      const [m, y] = u[f], [b, x] = u[f - 1];
      p.push("Q", b, x, (b + m) / 2, (x + y) / 2);
    }
    const d = u[u.length - 1];
    return p.push("L", d[0], d[1]), p.join(" ");
  }, [e.data.points, o]), a = Vt(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const u = e.data.points.map((M) => [M[0], M[1]]), p = ba(u), d = p[0], f = p[p.length - 1], m = Math.hypot(d[0] - f[0], d[1] - f[1]);
    let y = 0;
    for (let M = 1; M < p.length; M++)
      y += Math.hypot(p[M][0] - p[M - 1][0], p[M][1] - p[M - 1][1]);
    const b = y >= 1 && m <= Math.max(e.data.strokeWidth * 4, 20) && m <= y * 0.1, x = e.data.fillStyle || "solid";
    if (b) {
      const M = gd(p, 0);
      return x === "solid" ? { kind: "solid", d: M, fill: e.data.fill } : { kind: "rough", paths: zi(p, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: x,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const g = xd(p);
    if (g.length === 0) return null;
    if (x === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: g
      };
    const k = [];
    for (const { points: M } of g)
      M.length >= 3 && k.push(
        ...zi(M, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: x,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: k, regions: g };
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
          children: /* @__PURE__ */ S("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
            (a == null ? void 0 : a.kind) === "solid" && (a.regions ? a.regions.map((u, p) => /* @__PURE__ */ h(
              "path",
              {
                d: u.pathD,
                fill: a.fill,
                stroke: "none"
              },
              p
            )) : /* @__PURE__ */ h("path", { d: a.d, fill: a.fill, stroke: "none" })),
            (a == null ? void 0 : a.kind) === "rough" && a.paths.map((u, p) => /* @__PURE__ */ h(
              "path",
              {
                d: u.d,
                stroke: u.stroke,
                strokeWidth: u.strokeWidth,
                fill: u.fill,
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
                strokeDasharray: r == null ? void 0 : r.map((u) => u * Math.max(e.data.strokeWidth, 1)).join(" "),
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
}), Yd = Me(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, r = e.data.strokeWidth * 2, n = Vt(() => {
    const a = e.data.points;
    if (!a || a.length === 0) return "";
    const l = [`M${a[0][0]},${a[0][1]}`];
    for (let c = 1; c < a.length; c++)
      l.push(`L${a[c][0]},${a[c][1]}`);
    return l.push("Z"), l.join("");
  }, [e.data.points]), s = Ze(e.data.strokeStyle), i = s == null ? void 0 : s.map((a) => a * Math.max(e.data.strokeWidth, 1)).join(" ");
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
          children: /* @__PURE__ */ S("g", { transform: `translate(${r}, ${r})`, opacity: e.data.opacity ?? 1, children: [
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
}), jd = Me(function({ node: e, editingLabel: o }) {
  var b, x, g, k;
  const r = e.h === "auto" ? 100 : e.h, n = e.data.strokeWidth * 2, s = Ze(e.data.strokeStyle), i = ((b = e.data.startPoint) == null ? void 0 : b[0]) ?? 0, a = ((x = e.data.startPoint) == null ? void 0 : x[1]) ?? r / 2, l = ((g = e.data.endPoint) == null ? void 0 : g[0]) ?? e.w, c = ((k = e.data.endPoint) == null ? void 0 : k[1]) ?? r / 2, u = Vt(() => {
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
        return wr(0, 0, e.w, r, M, C);
      case "ellipse":
        return dn(e.w / 2, r / 2, e.w, r, M);
      case "diamond":
        return hn(0, 0, e.w, r, M, C);
      case "line":
        return Ao(i, a, l, c, M);
      case "arrow":
        return un(i, a, l, c, M);
      default:
        return null;
    }
  }, [e, s, i, a, l, c, r]), p = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, d = e.data.opacity ?? 1, f = e.data.shape === "line" || e.data.shape === "arrow", m = e.data.label, y = e.data.labelFontSize ?? 14;
  return /* @__PURE__ */ S(
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
            children: /* @__PURE__ */ S("g", { transform: `translate(${n}, ${n})`, opacity: d, children: [
              p && /* @__PURE__ */ h(
                qd,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              u ? u.map((M, C) => p && M.fill && M.fill !== "none" ? null : /* @__PURE__ */ h(
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
                Vd,
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
                Kd,
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
                  fontFamily: co(e.data.labelFontFamily ?? lo),
                  fontSize: y,
                  color: e.data.fill && e.data.fillStyle === "solid" ? Od(e.data.fill) : e.data.stroke,
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
function zs(t, e) {
  const o = No(t, e), r = t / 2, n = e / 2, s = [r, 0], i = [t, n], a = [r, e], l = [0, n], c = Math.hypot(t / 2, e / 2), u = Math.min(o, c / 2) / c, p = (M, C, z) => [
    M[0] + z * (C[0] - M[0]),
    M[1] + z * (C[1] - M[1])
  ], d = p(s, i, u), f = p(s, i, 1 - u), m = p(i, a, u), y = p(i, a, 1 - u), b = p(a, l, u), x = p(a, l, 1 - u), g = p(l, s, u), k = p(l, s, 1 - u);
  return [
    `M${d[0]},${d[1]}`,
    `L${f[0]},${f[1]}`,
    `Q${i[0]},${i[1]} ${m[0]},${m[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${a[0]},${a[1]} ${b[0]},${b[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${l[0]},${l[1]} ${g[0]},${g[1]}`,
    `L${k[0]},${k[1]}`,
    `Q${s[0]},${s[1]} ${d[0]},${d[1]}`,
    "Z"
  ].join(" ");
}
function Vd({
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
  dashArray: u,
  rounded: p
}) {
  const d = u == null ? void 0 : u.join(",");
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
            strokeDasharray: d
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
            strokeDasharray: d
          }
        );
      const b = p ? No(e, o) : 0;
      return /* @__PURE__ */ h(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: b || void 0,
          ry: b || void 0,
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: d
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
          strokeDasharray: d
        }
      );
    case "diamond":
      return p ? /* @__PURE__ */ h(
        "path",
        {
          d: zs(e, o),
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: d
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: a,
          fill: l || "none",
          strokeWidth: c,
          strokeDasharray: d
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
          strokeDasharray: d
        }
      );
    case "arrow": {
      const f = Math.atan2(i - n, s - r), m = Math.max(12, c * 4), y = Math.PI / 6, b = s - m * Math.cos(f - y), x = i - m * Math.sin(f - y), g = s - m * Math.cos(f + y), k = i - m * Math.sin(f + y);
      return /* @__PURE__ */ S(kt, { children: [
        /* @__PURE__ */ h(
          "line",
          {
            x1: r,
            y1: n,
            x2: s,
            y2: i,
            stroke: a,
            strokeWidth: c,
            strokeDasharray: d
          }
        ),
        /* @__PURE__ */ h(
          "polyline",
          {
            points: `${b},${x} ${s},${i} ${g},${k}`,
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
function Kd({
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
  const u = a ? "painted" : "stroke", p = a ? "transparent" : "none";
  switch (t) {
    case "rect": {
      const d = c ? No(e, o) : 0;
      return /* @__PURE__ */ h(
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
          strokeWidth: l,
          pointerEvents: u
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
          pointerEvents: u
        }
      );
    case "diamond":
      return c ? /* @__PURE__ */ h(
        "path",
        {
          d: zs(e, o),
          fill: p,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: u
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: p,
          stroke: "transparent",
          strokeWidth: l,
          pointerEvents: u
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
function qd({
  shape: t,
  w: e,
  h: o,
  fill: r,
  rounded: n
}) {
  switch (t) {
    case "rect": {
      const s = n ? No(e, o) : 0;
      return /* @__PURE__ */ h("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: r, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ h("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: r, stroke: "none" });
    case "diamond":
      return n ? /* @__PURE__ */ h(
        "path",
        {
          d: zs(e, o),
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
const Ud = Me(function(e) {
  return /* @__PURE__ */ h(en, { node: e.node });
}), Zd = {
  type: "draw",
  component: Ud,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => ms(t, e, o, r),
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
}, Qd = Me(function(e) {
  const o = e.node;
  return /* @__PURE__ */ h(en, { node: o, editingLabel: e.editing });
}), Jd = {
  type: "shape",
  component: Qd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => an(t, e, o, r),
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
function $d(t) {
  return null;
}
const _d = {
  type: "edge",
  component: $d,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, Hr = 0.05, Or = 10, th = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function eh({
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
  const c = t.h, u = t.data.crop, p = ht(!1);
  p.current = !!i;
  const d = ht(null), f = ht(!1), m = ht(null), [y, b] = ot(null), x = dt(() => {
    m.current && m.current.naturalWidth > 0 && b({ w: m.current.naturalWidth, h: m.current.naturalHeight });
  }, []);
  vt(() => {
    m.current && m.current.naturalWidth > 0 && b({ w: m.current.naturalWidth, h: m.current.naturalHeight });
  }, [t.data.src]);
  const [g, k] = ot({ x: 0, y: 0, w: 1, h: 1 });
  vt(() => {
    i && (d.current = null, k(u ?? { x: 0, y: 0, w: 1, h: 1 }), !y && m.current && m.current.naturalWidth > 0 && b({ w: m.current.naturalWidth, h: m.current.naturalHeight }));
  }, [i]);
  const M = Vt(() => {
    if (y) {
      const q = y.w / y.h, X = t.w / c;
      let et, rt;
      return q > X ? (et = t.w, rt = t.w / q) : (rt = c, et = c * q), { x: (t.w - et) / 2, y: (c - rt) / 2, w: et, h: rt };
    }
    return i ? { x: 0, y: 0, w: t.w, h: c } : null;
  }, [y, i, t.w, c]), C = dt(
    (q) => {
      const X = o.getNode(t.id);
      if (!X || X.type !== "image") return;
      const et = X.data;
      if (q.x < 1e-3 && q.y < 1e-3 && q.w > 0.999 && q.h > 0.999) {
        o.updateNodeWithHistory(t.id, {
          data: { ...et, crop: void 0 }
        });
        return;
      }
      const j = X.h === "auto" ? c : X.h, tt = X.rotation || 0;
      let yt, it, gt, ut;
      if (M)
        if (yt = Math.max(Or, q.w * M.w), it = Math.max(Or, q.h * M.h), !tt)
          gt = X.x + M.x + q.x * M.w, ut = X.y + M.y + q.y * M.h;
        else {
          const St = X.x + X.w / 2, Ct = X.y + j / 2;
          gt = St - yt / 2, ut = Ct - it / 2;
        }
      else if (yt = Math.max(Or, q.w * X.w), it = Math.max(Or, q.h * j), !tt)
        gt = X.x + q.x * X.w, ut = X.y + q.y * j;
      else {
        const St = X.x + X.w / 2, Ct = X.y + j / 2;
        gt = St - yt / 2, ut = Ct - it / 2;
      }
      o.updateNodeWithHistory(t.id, {
        x: gt,
        y: ut,
        w: yt,
        h: it,
        data: {
          ...et,
          crop: { x: q.x, y: q.y, w: q.w, h: q.h }
        }
      });
    },
    [o, t.id, M, c]
  ), z = dt(() => {
    d.current = "apply", C(g), l == null || l();
  }, [C, g, l]), L = dt(() => {
    d.current = "cancel", l == null || l();
  }, [l]);
  vt(() => {
    if (i) {
      f.current = !0;
      return;
    }
    if (!f.current) return;
    f.current = !1;
    const q = d.current;
    d.current = null, !(q === "cancel" || q === "apply") && (C(g), l == null || l());
  }, [i, g, C, l]), vt(() => {
    if (!i) return;
    const q = (X) => {
      X.key === "Enter" ? (z(), X.preventDefault(), X.stopPropagation()) : X.key === "Escape" && (L(), X.preventDefault(), X.stopPropagation());
    };
    return document.addEventListener("keydown", q, !0), () => document.removeEventListener("keydown", q, !0);
  }, [i, z, L]);
  const D = dt(
    (q, X) => {
      if (X.stopPropagation(), X.preventDefault(), !M) return;
      const et = X.currentTarget.ownerDocument, rt = X.clientX, j = X.clientY, tt = { ...g }, yt = (gt) => {
        const ut = (gt.clientX - rt) / n / M.w, St = (gt.clientY - j) / n / M.h, Ct = { ...tt }, Wt = tt.x + tt.w, Ft = tt.y + tt.h;
        if (q.includes("left")) {
          const Rt = Math.max(0, Math.min(Wt - Hr, tt.x + ut));
          Ct.x = Rt, Ct.w = Wt - Rt;
        }
        if (q.includes("right") && (Ct.w = Math.max(
          Hr,
          Math.min(1 - tt.x, tt.w + ut)
        )), q.includes("top")) {
          const Rt = Math.max(0, Math.min(Ft - Hr, tt.y + St));
          Ct.y = Rt, Ct.h = Ft - Rt;
        }
        q.includes("bottom") && (Ct.h = Math.max(
          Hr,
          Math.min(1 - tt.y, tt.h + St)
        )), k(Ct);
      }, it = () => {
        et.removeEventListener("pointermove", yt), et.removeEventListener("pointerup", it);
      };
      et.addEventListener("pointermove", yt), et.addEventListener("pointerup", it);
    },
    [g, M, n]
  ), E = dt(
    (q) => {
      if (q.stopPropagation(), q.preventDefault(), !M) return;
      const X = q.currentTarget.ownerDocument, et = q.clientX, rt = q.clientY, j = { ...g }, tt = (it) => {
        const gt = (it.clientX - et) / n / M.w, ut = (it.clientY - rt) / n / M.h;
        k({
          ...j,
          x: Math.max(0, Math.min(1 - j.w, j.x + gt)),
          y: Math.max(0, Math.min(1 - j.h, j.y + ut))
        });
      }, yt = () => {
        X.removeEventListener("pointermove", tt), X.removeEventListener("pointerup", yt);
      };
      X.addEventListener("pointermove", tt), X.addEventListener("pointerup", yt);
    },
    [g, M, n]
  ), V = dt(
    (q) => {
      if (p.current) {
        q.stopPropagation();
        return;
      }
      const X = q.currentTarget.ownerDocument;
      if (q.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: Rt, y: ct } = o.screenToCanvas(
          q.clientX,
          q.clientY
        );
        for (const ee of o.selection) {
          const te = o.getNode(ee);
          if (!te) continue;
          const oe = te.h === "auto" ? 100 : te.h;
          if (Rt >= te.x && Rt <= te.x + te.w && ct >= te.y && ct <= te.y + oe)
            return;
        }
      }
      q.stopPropagation(), q.preventDefault(), q.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const et = q.clientX, rt = q.clientY, j = Array.from(o.selection), tt = j.map((Rt) => {
        const ct = o.getNode(Rt);
        return { id: Rt, x: ct.x, y: ct.y };
      });
      let yt = !1, it = null, gt = et, ut = rt, St = !1;
      const Ct = () => {
        it = null;
        const Rt = (gt - et) / o.viewport.zoom, ct = (ut - rt) / o.viewport.zoom, { finalDx: ee, finalDy: te } = o.computeDragSnap(
          tt,
          j,
          Rt,
          ct,
          St
        ), oe = tt.map((ce) => ({
          id: ce.id,
          patch: { x: ce.x + ee, y: ce.y + te }
        }));
        o.updateMany(oe);
      }, Wt = (Rt) => {
        const ct = (Rt.clientX - et) / o.viewport.zoom, ee = (Rt.clientY - rt) / o.viewport.zoom;
        if (!yt)
          if (Math.abs(ct) > 2 || Math.abs(ee) > 2)
            yt = !0, o.pushHistorySnapshot();
          else
            return;
        gt = Rt.clientX, ut = Rt.clientY, St = Rt.metaKey || Rt.ctrlKey, it === null && (it = requestAnimationFrame(Ct));
      }, Ft = () => {
        it !== null && (cancelAnimationFrame(it), Ct()), o.clearAlignGuides(), X.removeEventListener("pointermove", Wt), X.removeEventListener("pointerup", Ft);
      };
      X.addEventListener("pointermove", Wt), X.addEventListener("pointerup", Ft);
    },
    [o, t.id]
  ), J = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], nt = 8 / n, mt = nt / 2, ft = 25 / n, Z = e && s && !i, G = dt(
    (q) => {
      const X = q.currentTarget.ownerDocument;
      q.stopPropagation(), q.preventDefault();
      const et = t.x + t.w / 2, rt = t.y + c / 2, j = t.rotation || 0, { x: tt, y: yt } = o.screenToCanvas(
        q.clientX,
        q.clientY
      ), it = Math.atan2(yt - rt, tt - et);
      let gt = !1;
      const ut = (Ct) => {
        gt || (gt = !0, o.pushHistorySnapshot());
        const { x: Wt, y: Ft } = o.screenToCanvas(
          Ct.clientX,
          Ct.clientY
        ), Rt = Math.atan2(Ft - rt, Wt - et);
        let ct = j + (Rt - it) * (180 / Math.PI);
        (Ct.shiftKey || o.snapToGrid) && !(Ct.metaKey || Ct.ctrlKey) && (ct = Math.round(ct / 15) * 15), o.updateNode(t.id, { rotation: ct });
      }, St = () => {
        X.removeEventListener("pointermove", ut), X.removeEventListener("pointerup", St);
      };
      X.addEventListener("pointermove", ut), X.addEventListener("pointerup", St);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), K = i && M ? {
    left: M.x + g.x * M.w,
    top: M.y + g.y * M.h,
    width: g.w * M.w,
    height: g.h * M.h
  } : null, $ = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, Q = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: $
  };
  if (!i && u) {
    const q = u.y * 100, X = (1 - u.x - u.w) * 100, et = (1 - u.y - u.h) * 100, rt = u.x * 100;
    Q.objectViewBox = `inset(${q}% ${X}% ${et}% ${rt}%)`;
  }
  const lt = 8 / n, U = lt / 2;
  return /* @__PURE__ */ S(
    "div",
    {
      onPointerDown: V,
      onDoubleClick: !i && r ? (q) => {
        q.stopPropagation(), a == null || a();
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
        pointerEvents: r || i ? "auto" : "none",
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
                  ref: m,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: x,
                  style: Q,
                  draggable: !1
                }
              ),
              i && K && /* @__PURE__ */ h(
                "div",
                {
                  onPointerDown: E,
                  style: {
                    position: "absolute",
                    left: K.left,
                    top: K.top,
                    width: K.width,
                    height: K.height,
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
        i && K && th.map(({ pos: q, edges: X, cx: et, cy: rt, cursor: j }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (tt) => D(X, tt),
            style: {
              position: "absolute",
              left: K.left + et * K.width - U,
              top: K.top + rt * K.height - U,
              width: lt,
              height: lt,
              background: "white",
              border: `${1.5 / n}px solid #3b82f6`,
              borderRadius: 2,
              cursor: j,
              zIndex: 11
            }
          },
          q
        )),
        e && !i && /* @__PURE__ */ S(kt, { children: [
          /* @__PURE__ */ h(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: -ft,
                width: 1,
                height: ft,
                background: "#3b82f6",
                marginLeft: -0.5,
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ h(
            "div",
            {
              onPointerDown: G,
              style: {
                position: "absolute",
                left: "50%",
                top: -(ft + nt / 2),
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
        Z && J.map(({ pos: q, cx: X, cy: et }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (rt) => {
              rt.stopPropagation(), s == null || s(t.id, q, rt);
            },
            style: {
              position: "absolute",
              left: `calc(${X * 100}% - ${mt}px)`,
              top: `calc(${et * 100}% - ${mt}px)`,
              width: nt,
              height: nt,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: ln(q, t.rotation || 0)
            }
          },
          q
        ))
      ]
    }
  );
}
const Ca = Me(eh);
function oh(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    Ca,
    {
      node: e,
      isSelected: t.isSelected,
      engine: t.engine,
      interactive: t.interactive,
      zoom: t.zoom,
      onResizeHandleDown: t.callbacks.onResizeHandleDown,
      cropping: !!t.cropping,
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
const rh = {
  type: "image",
  component: oh,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function nh({
  node: t,
  engine: e,
  editing: o,
  editClickPos: r,
  onStopEdit: n,
  onMeasuredHeight: s
}) {
  const i = ht(null), [a, l] = ot(t.data.text), c = ht(!1), u = ht(t.data.text), p = ht(null), d = ht(e);
  d.current = e;
  const f = ht(t);
  f.current = t;
  const m = ht(!1);
  vt(() => {
    o || l(t.data.text);
  }, [t.data.text]), nn(() => {
    var z, L;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const D = i.current.ownerDocument;
      let E = !1;
      if (r) {
        const V = D.caretRangeFromPoint(r.clientX, r.clientY);
        if (V && i.current.contains(V.startContainer)) {
          const J = (z = D.defaultView) == null ? void 0 : z.getSelection();
          J == null || J.removeAllRanges(), J == null || J.addRange(V), E = !0;
        }
      }
      if (!E) {
        const V = D.createRange(), J = (L = D.defaultView) == null ? void 0 : L.getSelection();
        i.current.childNodes.length > 0 && (V.selectNodeContents(i.current), V.collapse(!1)), J == null || J.removeAllRanges(), J == null || J.addRange(V);
      }
      u.current = t.data.text, c.current = !1, m.current = !1;
    }
  }, [o]), vt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const z = u.current, L = e.getNode(t.id);
        if (L && L.type === "text") {
          const D = L.data;
          z !== D.text && (m.current ? (m.current = !1, e.updateNode(t.id, {
            data: { ...D, text: z }
          })) : e.updateNodeWithHistory(t.id, {
            data: { ...D, text: z }
          }));
        }
      };
  }, [o, e, t.id]), vt(() => {
    if (!i.current || !s) return;
    const z = new ResizeObserver(() => {
      var D;
      const L = ((D = i.current) == null ? void 0 : D.offsetHeight) ?? 0;
      L > 0 && s(t.id, L);
    });
    return z.observe(i.current), () => z.disconnect();
  }, [t.id, s, o]);
  const y = dt(() => {
    var L;
    if (c.current) return;
    c.current = !0, p.current && (clearTimeout(p.current), p.current = null);
    const z = ((L = i.current) == null ? void 0 : L.innerText) ?? "";
    l(z), u.current = z, z !== t.data.text && (m.current ? (m.current = !1, e.updateNode(t.id, {
      data: { ...t.data, text: z }
    })) : e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: z }
    })), n();
  }, [e, t, n]), b = dt(
    (z) => {
      var L;
      z.key === "Escape" && (z.preventDefault(), y(), (L = i.current) == null || L.blur()), z.stopPropagation();
    },
    [y]
  ), x = dt(() => {
    y();
  }, [y]), g = dt(() => {
    if (i.current) {
      const z = i.current.innerText;
      l(z), u.current = z, z !== f.current.data.text && !m.current && (m.current = !0, d.current.pushHistorySnapshot()), p.current && clearTimeout(p.current), p.current = setTimeout(() => {
        const L = f.current;
        z !== L.data.text && d.current.updateNode(L.id, {
          data: { ...L.data, text: z }
        });
      }, 0);
    }
  }, []), k = t.h === "auto" ? void 0 : t.h, M = t.data.opacity ?? 1, C = {
    fontFamily: co(t.data.fontFamily),
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
        height: k,
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
          onKeyDown: b,
          onBlur: x,
          onInput: g,
          onPointerDown: (z) => z.stopPropagation(),
          style: { ...C, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ h("div", { ref: i, style: C, children: a || " " })
    }
  );
}
const Ia = Me(nh);
function sh(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    Ia,
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
const ih = {
  type: "text",
  component: sh,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function ah(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, r = dt(
    (s) => {
      var a, l;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (l = (a = t.callbacks).onEditEnd) == null || l.call(a);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), n = dt(
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
const lh = {
  type: "frame",
  component: ah,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, ch = 100;
function dh({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onEditStart: i,
  onEditEnd: a
}) {
  const l = ht(null), c = ht(null), u = ht(""), p = ht(null), d = ht(null), f = ht(t);
  f.current = t;
  const m = ht(o);
  m.current = o;
  const y = ht(!1);
  vt(() => {
    var C;
    if (s && c.current) {
      const z = c.current;
      z.innerText = t.data.text || "", u.current = t.data.text || "", z.focus();
      const L = z.ownerDocument, D = (C = L.defaultView) == null ? void 0 : C.getSelection(), E = p.current;
      p.current = null;
      let V = !1;
      if (E && D && L.caretRangeFromPoint) {
        const J = L.caretRangeFromPoint(E.x, E.y);
        J && z.contains(J.startContainer) && (D.removeAllRanges(), D.addRange(J), V = !0);
      }
      if (!V && D) {
        const J = L.createRange();
        z.childNodes.length > 0 && (J.selectNodeContents(z), J.collapse(!1)), D.removeAllRanges(), D.addRange(J);
      }
      y.current = !1;
    }
  }, [s]), vt(() => {
    if (s)
      return () => {
        const C = f.current, z = u.current;
        z !== C.data.text && (y.current ? (y.current = !1, m.current.updateNode(C.id, {
          data: { ...C.data, text: z }
        })) : m.current.updateNodeWithHistory(C.id, {
          data: { ...C.data, text: z }
        }));
      };
  }, [s]);
  const b = dt(() => {
    d.current && (clearTimeout(d.current), d.current = null), c.current && (u.current = c.current.innerText), a();
  }, [a]), x = dt(
    (C) => {
      const z = C.currentTarget.ownerDocument;
      if (C.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: Q, y: lt } = o.screenToCanvas(C.clientX, C.clientY);
        for (const U of o.selection) {
          const q = o.getNode(U);
          if (!q) continue;
          const X = q.h === "auto" ? 100 : q.h;
          if (Q >= q.x && Q <= q.x + q.w && lt >= q.y && lt <= q.y + X)
            return;
        }
      }
      if (C.stopPropagation(), s) return;
      C.currentTarget.setPointerCapture(C.pointerId), C.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const L = C.clientX, D = C.clientY, E = Array.from(o.selection), V = [];
      for (const Q of E) {
        const lt = o.getNode(Q);
        lt && V.push({ id: Q, x: lt.x, y: lt.y });
      }
      if (V.length === 0) return;
      let J = !1, nt = null, mt = L, ft = D, Z = !1;
      const G = () => {
        nt = null;
        const Q = (mt - L) / o.viewport.zoom, lt = (ft - D) / o.viewport.zoom, { finalDx: U, finalDy: q } = o.computeDragSnap(
          V,
          E,
          Q,
          lt,
          Z
        ), X = V.map((et) => ({
          id: et.id,
          patch: { x: et.x + U, y: et.y + q }
        }));
        o.updateMany(X);
      }, K = (Q) => {
        const lt = (Q.clientX - L) / o.viewport.zoom, U = (Q.clientY - D) / o.viewport.zoom;
        if (!J)
          if (Math.abs(lt) > 2 || Math.abs(U) > 2)
            J = !0, o.pushHistorySnapshot();
          else
            return;
        mt = Q.clientX, ft = Q.clientY, Z = Q.metaKey || Q.ctrlKey, nt === null && (nt = requestAnimationFrame(G));
      }, $ = () => {
        nt !== null && (cancelAnimationFrame(nt), G()), o.clearAlignGuides(), z.removeEventListener("pointermove", K), z.removeEventListener("pointerup", $);
      };
      z.addEventListener("pointermove", K), z.addEventListener("pointerup", $);
    },
    [o, t.id, s]
  ), g = dt(
    (C) => {
      if (r) {
        if (C.stopPropagation(), t.groupId) {
          const z = [];
          let L = t.groupId;
          for (; L; )
            z.push(L), L = o.groupParent.get(L);
          if (!o.activeGroupId) {
            o.enterGroup(z[z.length - 1]), o.select(t.id);
            return;
          }
          const D = z.indexOf(o.activeGroupId);
          if (D > 0) {
            o.enterGroup(z[D - 1]), o.select(t.id);
            return;
          }
        }
        s || (p.current = { x: C.clientX, y: C.clientY }, o.select(t.id), i(t.id));
      }
    },
    [r, s, o, t.id, t.groupId, i]
  ), k = t.data.fontSize ?? 16, M = t.h === "auto" ? ch : t.h;
  return /* @__PURE__ */ h(
    "div",
    {
      ref: l,
      "data-node-id": t.id,
      className: r ? void 0 : "sb-block-inert",
      onPointerDown: r ? x : void 0,
      onDoubleClick: g,
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
              onBlur: b,
              onInput: () => {
                c.current && (u.current = c.current.innerText, u.current !== f.current.data.text && !y.current && (y.current = !0, m.current.pushHistorySnapshot()), d.current && clearTimeout(d.current), d.current = setTimeout(() => {
                  const z = f.current, L = u.current;
                  L !== z.data.text && m.current.updateNode(z.id, {
                    data: { ...z.data, text: L }
                  });
                }, 0));
              },
              onKeyDown: (C) => {
                C.key === "Escape" && (C.stopPropagation(), b()), C.stopPropagation();
              },
              onPointerDown: (C) => C.stopPropagation(),
              style: {
                fontSize: k,
                fontFamily: co(lo),
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
                fontSize: k,
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
const za = Me(dh);
function hh(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    za,
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
const uh = {
  type: "sticky",
  component: hh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, Ta = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function ph(t) {
  const e = t.match(Ta);
  return e ? e[1] : null;
}
function fh(t) {
  return Ta.test(t);
}
function yh(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function gh(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function mh({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onResizeHandleDown: i,
  onEditStart: a
}) {
  const l = t.h, { data: c } = t, u = (m) => {
    if (r && s) {
      m.stopPropagation();
      return;
    }
  }, p = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", d = Math.max(6, 8 / n), f = [
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
      onPointerDown: u,
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
              /* @__PURE__ */ h(
                "iframe",
                {
                  src: yh(c.videoId),
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
              width: d,
              height: d,
              marginLeft: -d / 2,
              marginTop: -d / 2,
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
const bh = Me(mh);
function xh(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    bh,
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
const wh = {
  type: "youtube",
  component: xh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, kh = [
  Jc,
  Zd,
  Jd,
  _d,
  rh,
  ih,
  lh,
  uh,
  wh
];
function Mo(t, e) {
  return `${t}:${e}`;
}
class vh {
  constructor(e, o) {
    xt(this, "spatial");
    xt(this, "registry");
    /** Current resolved port values. */
    xt(this, "values", /* @__PURE__ */ new Map());
    /** Node IDs that need recomputation. */
    xt(this, "dirty", /* @__PURE__ */ new Set());
    /** Whether a microtask flush is already scheduled. */
    xt(this, "scheduled", !1);
    /** Generation counter for canceling stale async results. */
    xt(this, "generation", 0);
    /** Change subscribers. */
    xt(this, "listeners", /* @__PURE__ */ new Set());
    /** Node IDs that are part of a cycle (updated after each topoSort). */
    xt(this, "_cycleNodeIds", /* @__PURE__ */ new Set());
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
    return this.values.get(Mo(e, o)) ?? null;
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
        const u = c.data;
        if (u.toId === e && u.targetPort === i.id) {
          const p = this.values.get(
            Mo(u.fromId, u.sourcePort ?? "")
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
      s.direction === "output" && (r[s.id] = this.values.get(Mo(e, s.id)) ?? null);
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
            r[s.id] = this.values.get(Mo(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, a = !0;
            break;
          }
        }
        a || (r[s.id] = s.defaultValue ?? null);
      } else
        r[s.id] = this.values.get(Mo(e, s.id)) ?? null;
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
            this.values.delete(Mo(n.id, i.id));
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
        for (const b of y)
          s.add(b), a(b);
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
    const u = [];
    for (; c.length > 0; ) {
      const m = c.shift();
      u.push(m);
      const y = o.get(m);
      if (y)
        for (const b of y) {
          if (!s.has(b)) continue;
          const x = (l.get(b) ?? 1) - 1;
          l.set(b, x), x === 0 && c.push(b);
        }
    }
    const p = new Set(u), d = /* @__PURE__ */ new Set();
    for (const m of s)
      p.has(m) || d.add(m);
    let f = !1;
    return (d.size !== this._cycleNodeIds.size || [...d].some((m) => !this._cycleNodeIds.has(m))) && (this._cycleNodeIds = d, f = !0), { sorted: u, cyclesChanged: f };
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
      const i = Mo(e, s.id), a = r[s.id] ?? null, l = this.values.get(i) ?? null;
      Sh(l, a) || (this.values.set(i, a), n = !0);
    }
    return n && this.markDownstream(e), n;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function Sh(t, e) {
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
const nr = [
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
function Sr(t) {
  return nr.find((e) => e.key === t) ?? nr[1];
}
function Mh() {
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
function Ch() {
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
const Xn = {
  "japanese-stationery": Mh,
  kraft: Ch
};
function Ih(t) {
  var e;
  return ((e = Xn[t]) == null ? void 0 : e.call(Xn)) ?? {};
}
const Pa = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, zh = {
  ...Pa,
  willChange: "transform"
}, Th = Me(function({
  background: e
}) {
  const o = Sr(e), { staticDefs: r, staticLayers: n } = Ih(e);
  return /* @__PURE__ */ S("svg", { style: zh, children: [
    r && /* @__PURE__ */ h("defs", { children: r }),
    /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    n
  ] });
});
function Ph({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: r = !0
}) {
  const n = e * t.zoom, s = t.x % n, i = t.y % n, l = Sr(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(Th, { background: o }),
    r && /* @__PURE__ */ S("svg", { style: Pa, children: [
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
const Aa = "sb-excalib-index", Ts = "sb-excalib-";
function pn() {
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
function Ah(t) {
  try {
    const e = localStorage.getItem(Ts + t);
    return e ? Ps(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function Ps(t) {
  if (t.libraryItems)
    return t;
  const o = (t.library ?? []).map((r, n) => ({
    id: Pt(10),
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
function La() {
  return pn();
}
function As(t) {
  const e = Ah(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function Es(t, e) {
  const o = Ps(t), r = Pt(10), n = o.libraryItems.map((a) => a.name || "Untitled"), s = {
    id: r,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: n
  };
  localStorage.setItem(Ts + r, JSON.stringify(o));
  const i = pn();
  return i.push(s), Ea(i), s;
}
function Eh(t) {
  localStorage.removeItem(Ts + t);
  const e = pn().filter((o) => o.id !== t);
  Ea(e);
}
function Lh(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], r = pn();
  for (const n of r) {
    if (!n.itemNames.some((a) => a.toLowerCase().includes(e)) && !n.name.toLowerCase().includes(e)) continue;
    const i = As(n.id);
    for (const a of i)
      ((a.name || "").toLowerCase().includes(e) || n.name.toLowerCase().includes(e)) && o.push({ library: n, item: a });
  }
  return o;
}
async function Rh(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const r = await o.json();
  if (r.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const n = Ps(r);
  return Es(n, { name: e, source: t });
}
const cs = {
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
}, Ra = sn(cs);
function Qt() {
  return qe(Ra);
}
function Mr(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function Ro(t) {
  if (t)
    return t * (180 / Math.PI);
}
function Da(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function Wa(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function Fa(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function Ba(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function Na(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function Dh(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function Gn(t, e) {
  return {
    id: Pt(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: Ro(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: Da(t.backgroundColor),
      fillStyle: Wa(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Fa(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: Mr(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? Dh(t) : void 0
    }
  };
}
function Ti(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const r = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Fa(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: Mr(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [a, l] = o, c = Math.min(a[0], l[0]), u = Math.min(a[1], l[1]), p = Math.max(a[0], l[0]), d = Math.max(a[1], l[1]), f = Math.max(p - c, 1), m = Math.max(d - u, 1);
    return [
      {
        id: Pt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + u,
        w: f,
        h: m,
        z: 0,
        rotation: Ro(t.angle),
        locked: t.locked || void 0,
        data: {
          ...r,
          shape: e ? "arrow" : "line",
          startPoint: [a[0] - c, a[1] - u],
          endPoint: [l[0] - c, l[1] - u]
        }
      }
    ];
  }
  if (t.backgroundColor && t.backgroundColor !== "transparent") {
    const a = Wh(t);
    if (a) return [a];
  }
  const s = Pt(10), i = [];
  for (let a = 0; a < o.length - 1; a++) {
    const l = o[a], c = o[a + 1], u = Math.min(l[0], c[0]), p = Math.min(l[1], c[1]), d = Math.max(l[0], c[0]), f = Math.max(l[1], c[1]), m = Math.max(d - u, 1), y = Math.max(f - p, 1), b = a === o.length - 2;
    i.push({
      id: Pt(10),
      type: "shape",
      x: t.x + u,
      y: t.y + p,
      w: m,
      h: y,
      z: 0,
      rotation: Ro(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...r,
        shape: e && b ? "arrow" : "line",
        startPoint: [l[0] - u, l[1] - p],
        endPoint: [c[0] - u, c[1] - p]
      }
    });
  }
  return i;
}
function Wh(t) {
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
    id: Pt(10),
    type: "draw",
    x: t.x + o,
    y: t.y + r,
    w: Math.max(n - o, 1),
    h: Math.max(s - r, 1),
    z: 0,
    rotation: Ro(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: Mr(t.opacity ?? 100),
      fill: Da(t.backgroundColor),
      fillStyle: Wa(t.fillStyle)
    }
  };
}
function Fh(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, r = t.simulatePressure !== !1, n = e.map((u, p) => {
    const d = !r && o && p < o.length ? o[p] : 0.5;
    return [u[0], u[1], d];
  });
  let s = 1 / 0, i = 1 / 0, a = -1 / 0, l = -1 / 0;
  for (const [u, p] of n)
    u < s && (s = u), p < i && (i = p), u > a && (a = u), p > l && (l = p);
  isFinite(s) || (s = 0, i = 0, a = 0, l = 0);
  const c = n.map(
    ([u, p, d]) => [u - s, p - i, d]
  );
  return {
    id: Pt(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(a - s, 1),
    h: Math.max(l - i, 1),
    z: 0,
    rotation: Ro(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: Mr(t.opacity ?? 100)
    }
  };
}
function Bh(t) {
  return {
    id: Pt(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: Ro(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: Ba(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Na(t.textAlign),
      opacity: Mr(t.opacity ?? 100)
    }
  };
}
function Nh(t) {
  return {
    id: Pt(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: Ro(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function Ha(t) {
  return Hh(t.elements);
}
function Hh(t) {
  const e = [], o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && n.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [Gn(s, "rect")];
        break;
      case "ellipse":
        i = [Gn(s, "ellipse")];
        break;
      case "diamond":
        i = [Gn(s, "diamond")];
        break;
      case "arrow":
        i = Ti(s, !0);
        break;
      case "line":
        i = Ti(s, !1);
        break;
      case "freedraw": {
        const a = Fh(s);
        a && (i = [a]);
        break;
      }
      case "text":
        i = [Bh(s)];
        break;
      case "frame":
      case "magicframe":
        i = [Nh(s)];
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
    const l = e.find((u) => u.id === a);
    if (!l || l.type !== "shape") continue;
    const c = l.data;
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = Ba(i.fontFamily), c.labelAlign = Na(i.textAlign);
  }
  return Oh(t, e, o, r), Xh(e), { nodes: e, groupParent: r };
}
function Oh(t, e, o, r) {
  var s;
  const n = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (i.isDeleted || !((s = i.groupIds) != null && s.length)) continue;
    for (let l = 0; l < i.groupIds.length - 1; l++) {
      const c = i.groupIds[l], u = i.groupIds[l + 1];
      n.has(c) || n.set(c, u);
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
function Xh(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const r of t)
    r.x < e && (e = r.x), r.y < o && (o = r.y);
  if (isFinite(e))
    for (const r of t)
      r.x -= e, r.y -= o;
}
function Ls(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const p of t) {
    const d = p.h === "auto" ? 40 : p.h;
    o = Math.min(o, p.x), r = Math.min(r, p.y), n = Math.max(n, p.x + p.w), s = Math.max(s, p.y + d);
  }
  const i = n - o || 1, a = s - r || 1, l = 4, c = `${o - l} ${r - l} ${i + l * 2} ${a + l * 2}`, u = [];
  for (const p of t)
    switch (p.type) {
      case "shape":
        u.push(Gh(p));
        break;
      case "draw":
        u.push(Yh(p));
        break;
      case "text":
        u.push(jh(p));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${u.join("")}</svg>`;
}
function Oa(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Gh(t) {
  var d, f, m, y;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, r = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: Ze(e.strokeStyle),
    seed: t.id
  }, n = ((d = e.startPoint) == null ? void 0 : d[0]) ?? 0, s = ((f = e.startPoint) == null ? void 0 : f[1]) ?? o / 2, i = ((m = e.endPoint) == null ? void 0 : m[0]) ?? t.w, a = ((y = e.endPoint) == null ? void 0 : y[1]) ?? o / 2;
  let l;
  switch (e.shape) {
    case "rect":
      l = wr(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "ellipse":
      l = dn(t.x + t.w / 2, t.y + o / 2, t.w, o, r);
      break;
    case "diamond":
      l = hn(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "line":
      l = Ao(t.x + n, t.y + s, t.x + i, t.y + a, r);
      break;
    case "arrow":
      l = un(t.x + n, t.y + s, t.x + i, t.y + a, r);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, u = c < 1 ? `<g opacity="${c}">` : "<g>", p = l.map(
    (b) => `<path d="${Oa(b.d)}" fill="${b.fill || "none"}" stroke="${b.stroke}" stroke-width="${b.strokeWidth}"${b.strokeDasharray ? ` stroke-dasharray="${b.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${u}${p.join("")}</g>`;
}
function Yh(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), r = e.opacity ?? 1, n = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${n}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${r < 1 ? ` opacity="${r}"` : ""}/>`;
}
function jh(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), r = e.opacity ?? 1, n = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${r < 1 ? ` opacity="${r}"` : ""}>${Oa(n)}</text>`;
}
const Xa = "sb-personal-library";
function Rs() {
  try {
    const t = localStorage.getItem(Xa);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Ga(t) {
  localStorage.setItem(Xa, JSON.stringify(t));
}
function Ya() {
  return Rs();
}
function Vh(t, e, o) {
  const r = structuredClone(e);
  if (r.length > 0) {
    let l = 1 / 0, c = 1 / 0;
    for (const u of r)
      u.x < l && (l = u.x), u.y < c && (c = u.y);
    if (isFinite(l))
      for (const u of r)
        u.x -= l, u.y -= c;
  }
  const n = new Set(
    r.map((l) => l.groupId).filter(Boolean)
  ), s = [];
  for (const [l, c] of o)
    n.has(l) && s.push([l, c]);
  const i = {
    id: Pt(10),
    name: t.trim() || "Untitled",
    nodes: r,
    groupParent: s,
    createdAt: Date.now()
  }, a = Rs();
  return a.unshift(i), Ga(a), i;
}
function Kh(t) {
  const e = Rs().filter((o) => o.id !== t);
  Ga(e);
}
const ja = {
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
}, Va = sn({
  dir: "ltr",
  isRTL: !1,
  labels: ja
});
function qh(t) {
  var e;
  return t === "rtl" || t === "ltr" ? t : typeof document < "u" && ((e = document.dir) == null ? void 0 : e.toLowerCase()) === "rtl" ? "rtl" : "ltr";
}
function Uh(t, e) {
  return Vt(() => {
    const o = qh(t);
    return {
      dir: o,
      isRTL: o === "rtl",
      labels: { ...ja, ...e ?? {} }
    };
  }, [t, e]);
}
function Ut() {
  return qe(Va);
}
function Ka(t, e, o, r) {
  const { nodes: n, groupParent: s } = Ha(e);
  if (n.length === 0) return;
  const i = structuredClone(n), a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (const g of i) {
    const k = Pt(10);
    a.set(g.id, k), g.id = k;
  }
  for (const g of i)
    g.groupId && (l.has(g.groupId) || l.set(g.groupId, Pt(10)), g.groupId = l.get(g.groupId));
  let c = 1 / 0, u = 1 / 0, p = -1 / 0, d = -1 / 0;
  for (const g of i) {
    const k = g.h === "auto" ? 100 : g.h;
    c = Math.min(c, g.x), u = Math.min(u, g.y), p = Math.max(p, g.x + g.w), d = Math.max(d, g.y + k);
  }
  const f = o ?? window.innerWidth / 2, m = r ?? window.innerHeight / 2, y = t.screenToCanvas(f, m), b = y.x - (c + p) / 2, x = y.y - (u + d) / 2;
  for (const g of i)
    g.x += b, g.y += x, g.z = t.nextZ();
  t.addNodes(i);
  for (const [g, k] of s) {
    const M = l.get(g) ?? g, C = l.get(k) ?? k;
    t.groupParent.set(M, C);
  }
  t.selectMultiple(i.map((g) => g.id));
}
const ds = "application/x-spatialboard-library-item", hs = "application/x-spatialboard-personal-item";
function qa(t, e, o, r) {
  if (e.nodes.length === 0) return;
  const n = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const b of n) {
    const x = Pt(10);
    s.set(b.id, x), b.id = x;
  }
  for (const b of n)
    b.groupId && (i.has(b.groupId) || i.set(b.groupId, Pt(10)), b.groupId = i.get(b.groupId));
  for (const b of n)
    if (b.type === "edge") {
      const x = b.data;
      x.fromId && s.has(x.fromId) && (x.fromId = s.get(x.fromId)), x.toId && s.has(x.toId) && (x.toId = s.get(x.toId));
    }
  let a = 1 / 0, l = 1 / 0, c = -1 / 0, u = -1 / 0;
  for (const b of n) {
    const x = b.h === "auto" ? 100 : b.h;
    a = Math.min(a, b.x), l = Math.min(l, b.y), c = Math.max(c, b.x + b.w), u = Math.max(u, b.y + x);
  }
  const p = o ?? window.innerWidth / 2, d = r ?? window.innerHeight / 2, f = t.screenToCanvas(p, d), m = f.x - (a + c) / 2, y = f.y - (l + u) / 2;
  for (const b of n)
    b.x += m, b.y += y, b.z = t.nextZ();
  t.addNodes(n);
  for (const [b, x] of e.groupParent) {
    const g = i.get(b) ?? b, k = i.get(x) ?? x;
    t.groupParent.set(g, k);
  }
  t.selectMultiple(n.map((b) => b.id));
}
const sr = /* @__PURE__ */ new Map();
function Zh({ item: t }) {
  const e = Vt(() => {
    const o = sr.get(t.id);
    if (o) return o;
    const { nodes: r } = Ha(t), n = Ls(r, 56);
    return sr.set(t.id, n), n;
  }, [t.id]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Ua({
  item: t,
  libId: e,
  onClick: o,
  theme: r
}) {
  const { labels: n } = Ut(), s = dt(
    (i) => {
      i.dataTransfer.setData(
        ds,
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
      children: /* @__PURE__ */ h(Zh, { item: t })
    }
  );
}
function Qh({ nodes: t }) {
  const e = Vt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), r = sr.get(o);
    if (r) return r;
    const n = Ls(t, 56);
    return sr.set(o, n), n;
  }, [t]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Za({
  item: t,
  onClick: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = Ut(), [s, i] = ot(!1), a = dt(
    (l) => {
      l.dataTransfer.setData(
        hs,
        JSON.stringify({ itemId: t.id })
      ), l.dataTransfer.effectAllowed = "copy";
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
            children: /* @__PURE__ */ h(Qh, { nodes: t.nodes })
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
function Jh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  onBrowseDirectory: n
}) {
  const s = Qt(), { labels: i } = Ut(), a = ht(null), l = ht(null), [c, u] = ot([]), [p, d] = ot([]), [f, m] = ot(""), [y, b] = ot(/* @__PURE__ */ new Set()), x = dt(() => {
    u(La()), d(Ya());
  }, []);
  vt(() => {
    e && x();
  }, [e, x]), vt(() => {
    if (!e) return;
    const E = (V) => {
      a.current && !a.current.contains(V.target) && o();
    };
    return document.addEventListener("pointerdown", E), () => document.removeEventListener("pointerdown", E);
  }, [e, o]);
  const g = dt(
    (E) => {
      var nt;
      const V = (nt = E.target.files) == null ? void 0 : nt[0];
      if (!V) return;
      const J = new FileReader();
      J.onload = () => {
        try {
          const mt = JSON.parse(J.result);
          if (mt.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const ft = V.name.replace(/\.excalidrawlib$/, "");
          Es(mt, { name: ft }), x();
        } catch (mt) {
          console.error("Failed to parse library file:", mt);
        }
      }, J.readAsText(V), E.target.value = "";
    },
    [x]
  ), k = dt(
    (E) => {
      Eh(E), sr.clear(), x();
    },
    [x]
  ), M = dt(
    (E) => {
      Ka(t, E);
    },
    [t]
  ), C = dt(
    (E) => {
      qa(t, E);
    },
    [t]
  ), z = dt(
    (E) => {
      Kh(E), sr.clear(), x();
    },
    [x]
  ), L = dt((E) => {
    b((V) => {
      const J = new Set(V);
      return J.has(E) ? J.delete(E) : J.add(E), J;
    });
  }, []), D = Vt(() => {
    if (!f.trim()) return null;
    const E = f.toLowerCase(), V = Lh(f), J = p.filter(
      (nt) => nt.name.toLowerCase().includes(E)
    );
    return { excalidraw: V, personal: J };
  }, [f, p]);
  return !e || !r ? null : Qe(
    /* @__PURE__ */ S(
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
              children: D !== null ? D.excalidraw.length === 0 && D.personal.length === 0 ? /* @__PURE__ */ h(
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
                    D.personal.map((E) => /* @__PURE__ */ h(
                      Za,
                      {
                        item: E,
                        onClick: () => C(E),
                        onRemove: () => z(E.id),
                        theme: s
                      },
                      E.id
                    )),
                    D.excalidraw.map(({ library: E, item: V }) => /* @__PURE__ */ h(
                      Ua,
                      {
                        item: V,
                        libId: E.id,
                        onClick: () => M(V),
                        theme: s
                      },
                      V.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ S(kt, { children: [
                p.length > 0 && /* @__PURE__ */ h(
                  _h,
                  {
                    items: p,
                    onPlace: C,
                    onRemove: z,
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
                      /* @__PURE__ */ h("br", {}),
                      i.librariesImportHint,
                      /* @__PURE__ */ h("br", {}),
                      i.librariesBrowseHint
                    ]
                  }
                ) : c.map((E) => {
                  const V = y.has(E.id);
                  return /* @__PURE__ */ h(
                    $h,
                    {
                      lib: E,
                      expanded: V,
                      onToggle: () => L(E.id),
                      onPlace: M,
                      onUninstall: () => k(E.id),
                      theme: s
                    },
                    E.id
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
              onChange: g
            }
          )
        ]
      }
    ),
    document.body
  );
}
function $h({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: r,
  onUninstall: n,
  theme: s
}) {
  const { labels: i } = Ut(), [a, l] = ot(null);
  return vt(() => {
    e && a === null && l(As(t.id));
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
          Ua,
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
function _h({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = Ut(), [s, i] = ot(!0);
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
          Za,
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
async function tu(t, e, o = 1, r = 20, n) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${r}`;
  return (await fetch(s, { signal: n, credentials: "include" })).json();
}
async function Pi(t, e = 1, o = 20, r) {
  const n = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(n, { signal: r, credentials: "include" })).json();
}
const us = "application/x-spatialboard-gif-item";
function Qa(t, e, o, r) {
  const n = e.file.hd.gif, s = 400, i = 300;
  let a = n.width, l = n.height;
  const c = Math.min(1, s / a, i / l);
  a = Math.round(a * c), l = Math.round(l * c);
  const u = o ?? window.innerWidth / 2, p = r ?? window.innerHeight / 2, d = t.screenToCanvas(u, p), f = {
    id: Pt(10),
    type: "image",
    x: d.x - a / 2,
    y: d.y - l / 2,
    w: a,
    h: l,
    z: t.nextZ(),
    data: { src: n.url }
  };
  t.addNode(f), t.select(f.id);
}
function eu({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  baseUrl: n
}) {
  const s = Qt(), { labels: i } = Ut(), a = ht(null), l = ht(null), [c, u] = ot(""), [p, d] = ot([]), [f, m] = ot(!1), [y, b] = ot(1), [x, g] = ot(!1), k = ht();
  vt(() => {
    if (!e) return;
    const D = (E) => {
      a.current && !a.current.contains(E.target) && o();
    };
    return document.addEventListener("pointerdown", D), () => document.removeEventListener("pointerdown", D);
  }, [e, o]), vt(() => {
    if (!e || c.trim()) return;
    const D = new AbortController();
    return m(!0), Pi(n, 1, 30, D.signal).then((E) => {
      d(E.data.data.filter((V) => V.type !== "ad")), b(1), g(E.data.has_next);
    }).catch(() => {
    }).finally(() => m(!1)), () => D.abort();
  }, [e, n, c]);
  const M = dt(
    (D, E, V) => {
      if (!D.trim()) return;
      const J = new AbortController();
      return m(!0), tu(n, D, E, 30, J.signal).then((nt) => {
        const mt = nt.data.data.filter((ft) => ft.type !== "ad");
        d((ft) => V ? [...ft, ...mt] : mt), b(E), g(nt.data.has_next);
      }).catch(() => {
      }).finally(() => m(!1)), J;
    },
    [n]
  ), C = dt(
    (D) => {
      if (u(D), k.current && clearTimeout(k.current), !D.trim()) {
        d([]), b(1), g(!1);
        return;
      }
      k.current = setTimeout(() => {
        M(D, 1, !1);
      }, 350);
    },
    [M]
  ), z = dt(() => {
    const D = l.current;
    !D || f || !x || D.scrollTop + D.clientHeight >= D.scrollHeight - 100 && (c.trim() ? M(c, y + 1, !0) : (m(!0), Pi(n, y + 1, 30).then((E) => {
      const V = E.data.data.filter((J) => J.type !== "ad");
      d((J) => [...J, ...V]), b(y + 1), g(E.data.has_next);
    }).catch(() => {
    }).finally(() => m(!1))));
  }, [f, x, c, y, M, n]), L = dt(
    (D) => {
      Qa(t, D);
    },
    [t]
  );
  return !e || !r ? null : Qe(
    /* @__PURE__ */ S(
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
          /* @__PURE__ */ S(
            "div",
            {
              ref: l,
              onScroll: z,
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
                    children: p.map((D) => /* @__PURE__ */ h(
                      ou,
                      {
                        item: D,
                        onClick: () => L(D),
                        engine: t,
                        theme: s
                      },
                      D.id
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
function ou({
  item: t,
  onClick: e,
  engine: o,
  theme: r
}) {
  const n = t.file.sm.webp, s = n.width / n.height, i = dt(
    (a) => {
      a.dataTransfer.setData(us, JSON.stringify(t)), a.dataTransfer.effectAllowed = "copy";
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
function ru({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [r, n] = ot(""), s = ht(null), i = ht(null);
  vt(() => {
    var p;
    (p = s.current) == null || p.focus();
  }, []);
  const a = Vt(() => Ls(t, 56), [t]), l = dt(() => {
    e(r.trim() || "Untitled");
  }, [r, e]), c = dt(
    (p) => {
      p.key === "Enter" ? (p.preventDefault(), l()) : p.key === "Escape" && (p.preventDefault(), o());
    },
    [l, o]
  ), u = dt(
    (p) => {
      i.current && !i.current.contains(p.target) && o();
    },
    [o]
  );
  return Qe(
    /* @__PURE__ */ h(
      "div",
      {
        onClick: u,
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
const ar = sn(
  null
);
function fn(t, e) {
  const o = ht(null), r = ht(0), n = dt(() => (o.current || (o.current = `${e}:${++r.current}`), o.current), [e]);
  return vt(() => {
    o.current = null, t.endHistoryCoalesce();
  }, [e, t]), vt(() => {
    const s = () => {
      o.current = null, t.endHistoryCoalesce();
    }, i = typeof document < "u" ? document : null;
    if (i)
      return i.addEventListener("pointerup", s), i.addEventListener("pointercancel", s), () => {
        i.removeEventListener("pointerup", s), i.removeEventListener("pointercancel", s);
      };
  }, [t]), n;
}
function ps(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function nu(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Ja(t, e, o, r) {
  return new Promise((n) => {
    const s = nu(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, u = i.naturalHeight || 200;
      if (c <= 1 || u <= 1) {
        const p = t.match(/viewBox=["']([^"']+)["']/i);
        if (p) {
          const d = p[1].trim().split(/[\s,]+/).map(Number);
          d.length === 4 && d[2] > 0 && d[3] > 0 && (c = d[2], u = d[3]);
        }
      }
      if (c > 400 || u > 400) {
        const p = Math.min(400 / c, 400 / u);
        c = Math.round(c * p), u = Math.round(u * p);
      }
      n({
        id: Pt(10),
        type: "image",
        x: e,
        y: o,
        w: c,
        h: u,
        z: r,
        data: { src: s }
      });
    }, i.onerror = () => n(null), i.src = s;
  });
}
async function su(t, e, o, r) {
  const { x: n, y: s } = t.screenToCanvas(o, r), i = await Ja(e, n, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
const Ai = {
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
}, iu = Me(function({
  node: e,
  zoom: o,
  showHandles: r = !0,
  measuredHeights: n,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const a = e.h === "auto" ? (n == null ? void 0 : n[e.id]) ?? 100 : e.h, l = e.rotation || 0, c = e.x + e.w / 2, u = e.y + a / 2, p = 8 / o, d = p / 2, f = 25 / o, m = !!e.locked, y = [
    { pos: "nw", cx: e.x, cy: e.y },
    { pos: "n", cx: e.x + e.w / 2, cy: e.y },
    { pos: "ne", cx: e.x + e.w, cy: e.y },
    { pos: "e", cx: e.x + e.w, cy: e.y + a / 2 },
    { pos: "se", cx: e.x + e.w, cy: e.y + a },
    { pos: "s", cx: e.x + e.w / 2, cy: e.y + a },
    { pos: "sw", cx: e.x, cy: e.y + a },
    { pos: "w", cx: e.x, cy: e.y + a / 2 }
  ];
  return /* @__PURE__ */ S("g", { transform: `rotate(${l}, ${c}, ${u})`, children: [
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
      const b = 16 / o, x = e.x + e.w - b - 4 / o, g = e.y - b - 4 / o;
      return /* @__PURE__ */ S("g", { transform: `translate(${x}, ${g})`, children: [
        /* @__PURE__ */ h(
          "rect",
          {
            x: 0,
            y: 0,
            width: b,
            height: b,
            rx: 3 / o,
            fill: "#f59e0b"
          }
        ),
        /* @__PURE__ */ S("g", { transform: `scale(${b / 24})`, children: [
          /* @__PURE__ */ h("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ h("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    r && !m && y.map(({ pos: b, cx: x, cy: g }) => /* @__PURE__ */ h(
      "rect",
      {
        x: x - d,
        y: g - d,
        width: p,
        height: p,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: ln(b, l),
          pointerEvents: "auto"
        },
        onPointerDown: (k) => {
          k.stopPropagation(), s == null || s(e.id, b, k);
        }
      },
      b
    )),
    r && !m && /* @__PURE__ */ S(kt, { children: [
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
          onPointerDown: (b) => {
            b.stopPropagation(), i == null || i(e.id, b);
          }
        }
      )
    ] })
  ] });
}), au = Me(function({
  edge: e,
  fromNode: o,
  toNode: r,
  viewport: n,
  selection: s,
  measuredHeights: i,
  registry: a,
  onEdgeEndpointDown: l,
  onKinkHandleDown: c,
  edgeReconnect: u,
  eraserMarkedIds: p,
  cycleNodeIds: d
}) {
  const f = e.data.edgeType || "bezier";
  let m, y;
  if (a && e.data.sourcePort) {
    const ut = a.get(o.type);
    ut != null && ut.ports && (m = mr(o, ut.ports, e.data.sourcePort, n.zoom, i) ?? void 0);
  }
  if (a && e.data.targetPort) {
    const ut = a.get(r.type);
    ut != null && ut.ports && (y = mr(r, ut.ports, e.data.targetPort, n.zoom, i) ?? void 0);
  }
  const b = De(
    o,
    r,
    f,
    i,
    e.data.sourceHandle,
    e.data.targetHandle,
    e.data.midpointOffset,
    e.data.curveOffset,
    m,
    y,
    e.data.sourceT,
    e.data.targetT,
    e.data.attachmentGap
  ), { path: x, x1: g, y1: k, x2: M, y2: C, labelX: z, labelY: L, arrowAngle: D, tailAngle: E, kinkHandle: V } = b, J = s.has(e.id), nt = e.data.strokeWidth, mt = e.data.style === "dashed" ? `${8 * nt},${4 * nt}` : e.data.style === "dotted" ? `${2 * nt},${3 * nt}` : void 0, ft = Math.max(8, nt * 3), Z = e.data.arrowHeadSize ?? ft, G = e.data.arrowTailSize ?? ft, K = e.data.animated, $ = p == null ? void 0 : p.has(e.id), Q = (u == null ? void 0 : u.edgeId) === e.id, lt = !!(d && d.size > 0 && e.data.sourcePort && e.data.targetPort && d.has(e.data.fromId) && d.has(e.data.toId)), U = lt ? "#ef4444" : e.data.color, q = e.data.roughness ?? 0, X = Vt(() => q <= 0 ? null : {
    stroke: U,
    roughness: q,
    strokeWidth: nt,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [U, q, nt, e.data.style, e.id]);
  let et = null, rt = null, j = null;
  X && (et = On(x, X), e.data.arrowHead === "arrow" && (rt = On(Po(M, C, D, Z), { ...X, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (j = On(Po(g, k, E, G), { ...X, strokeLineDash: void 0 })));
  const tt = Vt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), yt = Vt(() => {
    if (!K) return;
    const ut = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", St = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", Ct = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${ut} ${St} ${Ct} infinite` };
  }, [K, e.data.animatedDirection]), it = Vt(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), gt = Vt(
    () => $ ? { filter: "saturate(0)" } : void 0,
    [$]
  );
  return /* @__PURE__ */ S("g", { opacity: Q ? 0.15 : $ ? 0.25 : void 0, style: gt, children: [
    /* @__PURE__ */ h(
      "path",
      {
        d: x,
        stroke: "transparent",
        strokeWidth: Math.max(nt + 16 / n.zoom, 20 / n.zoom),
        strokeLinecap: "round",
        fill: "none",
        style: { pointerEvents: "stroke", cursor: "pointer" }
      }
    ),
    lt && /* @__PURE__ */ h(
      "path",
      {
        d: x,
        stroke: "#ef4444",
        strokeWidth: nt + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: tt
      }
    ),
    J && /* @__PURE__ */ h(
      "path",
      {
        d: x,
        stroke: "#3b82f6",
        strokeWidth: nt + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    et ? et.map((ut, St) => /* @__PURE__ */ h(
      "path",
      {
        d: ut.d,
        stroke: ut.stroke,
        strokeWidth: ut.strokeWidth,
        strokeDasharray: ut.strokeDasharray,
        strokeLinecap: "round",
        fill: ut.fill ?? "none",
        style: K ? yt : void 0
      },
      St
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: x,
        stroke: U,
        strokeWidth: nt,
        strokeDasharray: K ? "12,8" : lt ? `${6 * nt},${4 * nt}` : mt,
        strokeLinecap: "round",
        fill: "none",
        style: lt ? it : yt
      }
    ),
    e.data.arrowHead === "arrow" && (rt ? rt.map((ut, St) => /* @__PURE__ */ h(
      "path",
      {
        d: ut.d,
        stroke: ut.stroke,
        strokeWidth: ut.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ut.fill ?? "none"
      },
      `ah${St}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: Po(M, C, D, Z),
        fill: "none",
        stroke: U,
        strokeWidth: nt,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: Zr(M, C, D, Z),
        fill: U,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: M,
        cy: C,
        r: Z * 0.25,
        fill: U
      }
    ),
    e.data.arrowTail === "arrow" && (j ? j.map((ut, St) => /* @__PURE__ */ h(
      "path",
      {
        d: ut.d,
        stroke: ut.stroke,
        strokeWidth: ut.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ut.fill ?? "none"
      },
      `at${St}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: Po(g, k, E, G),
        fill: "none",
        stroke: U,
        strokeWidth: nt,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: Zr(g, k, E, G),
        fill: U,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: g,
        cy: k,
        r: G * 0.25,
        fill: U
      }
    ),
    e.data.label && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h(
        "rect",
        {
          x: z - (e.data.label.length * 3.5 + 6) / n.zoom,
          y: L - 8 / n.zoom,
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
          x: z,
          y: L + 4 / n.zoom,
          fill: U,
          fontSize: 12 / n.zoom,
          textAnchor: "middle",
          style: { pointerEvents: "none" },
          children: e.data.label
        }
      )
    ] }),
    J && !Q && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h(
        "circle",
        {
          cx: g,
          cy: k,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ut) => {
            ut.stopPropagation(), l == null || l(e.id, "source", ut);
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
          onPointerDown: (ut) => {
            ut.stopPropagation(), l == null || l(e.id, "target", ut);
          }
        }
      )
    ] }),
    J && !Q && V && /* @__PURE__ */ h(
      "circle",
      {
        cx: V.x,
        cy: V.y,
        r: 5 / n.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / n.zoom,
        style: {
          cursor: V.axis === "xy" ? "move" : V.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (ut) => {
          ut.stopPropagation(), c == null || c(e.id, V.axis, V.min, V.max, ut);
        }
      }
    )
  ] });
});
function lu({
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
  onEdgeEndpointDown: u,
  onKinkHandleDown: p,
  edgePreview: d,
  edgeReconnect: f,
  eraserMarkedIds: m,
  eraserTrail: y,
  laserTrail: b,
  mode: x,
  freeFormEdges: g,
  hoveredNodeId: k,
  cursorCanvasPos: M,
  registry: C,
  onPortHandleDown: z,
  cycleNodeIds: L,
  containerTypes: D,
  alignGuides: E,
  suppressNodeOverlayId: V
}) {
  const J = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, nt = t.filter(
    (Z) => Z.type !== "edge" && Z.type !== "content" && Z.type !== "image"
  ), mt = t.filter((Z) => Z.type === "edge").sort((Z, G) => Z.z - G.z), ft = Vt(() => new Map(t.map((Z) => [Z.id, Z])), [t]);
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
      children: /* @__PURE__ */ S("g", { transform: J, children: [
        mt.map((Z) => {
          const G = ft.get(Z.data.fromId), K = ft.get(Z.data.toId);
          return !G || !K ? null : /* @__PURE__ */ h(
            au,
            {
              edge: Z,
              fromNode: G,
              toNode: K,
              viewport: e,
              selection: o,
              measuredHeights: r,
              registry: C,
              onEdgeEndpointDown: u,
              onKinkHandleDown: p,
              edgeReconnect: f,
              eraserMarkedIds: m,
              cycleNodeIds: L
            },
            Z.id
          );
        }),
        x === "edge" && !d && k && M && (() => {
          const Z = ft.get(k);
          if (!Z || Z.type === "edge") return null;
          const G = Ae(Z, M.x, M.y, r), K = 4 / e.zoom;
          return /* @__PURE__ */ h("circle", { cx: G.x, cy: G.y, r: K, fill: "#3b82f6", stroke: "white", strokeWidth: 1.5 / e.zoom });
        })(),
        (() => {
          var et, rt;
          const Z = !!d || !!f, G = (d == null ? void 0 : d.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, K = (d == null ? void 0 : d.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, $ = (d == null ? void 0 : d.fromNode.id) ?? (f == null ? void 0 : f.anchorNodeId) ?? null;
          let Q = null, lt = null, U = null;
          const q = /* @__PURE__ */ new Set();
          if (Z) {
            let j = 1 / 0, tt = !1;
            const yt = 50 / e.zoom;
            for (const it of t) {
              if (it.type === "edge" || it.id === $ || (rt = (et = C == null ? void 0 : C.get(it.type)) == null ? void 0 : et.ports) != null && rt.length) continue;
              const gt = it.h === "auto" ? (r == null ? void 0 : r[it.id]) ?? 100 : it.h, ut = it.w * 0.2, St = gt * 0.2;
              G >= it.x - ut && G <= it.x + it.w + ut && K >= it.y - St && K <= it.y + gt + St && q.add(it.id);
              const Ct = rs(it, r), Wt = D ? D.has(it.type) : it.type === "frame";
              for (const Ft of Ct) {
                const Rt = Math.hypot(Ft.x - G, Ft.y - K);
                Rt >= yt || Wt && !tt && Q || (!Wt && tt || Rt < j) && (j = Rt, tt = Wt, Q = it.id, lt = Ft.side);
              }
            }
            if (g && Q) {
              const it = ft.get(Q);
              if (it) {
                const gt = Ae(it, G, K, r);
                U = { x: gt.x, y: gt.y };
              }
            }
          }
          const X = [];
          return g && Z && U && X.push(
            /* @__PURE__ */ h(
              "circle",
              {
                cx: U.x,
                cy: U.y,
                r: 5 / e.zoom,
                fill: "#3b82f6",
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              },
              "freeform-snap-dot"
            )
          ), t.filter((j) => {
            var tt, yt;
            return j.type === "edge" || V && j.id === V || (yt = (tt = C == null ? void 0 : C.get(j.type)) == null ? void 0 : tt.ports) != null && yt.length || g && j.type === "image" ? !1 : o.size <= 1 && o.has(j.id) || !g && Z && (j.id === $ || q.has(j.id));
          }).forEach((j) => {
            const tt = rs(j, r), yt = 4 / e.zoom, it = 26 / e.zoom, gt = j.rotation || 0, ut = j.h === "auto" ? (r == null ? void 0 : r[j.id]) ?? 100 : j.h, St = j.x + j.w / 2, Ct = j.y + ut / 2, Wt = d && d.fromNode.id === j.id || f && f.anchorNodeId === j.id, Ft = o.has(j.id) && !Z;
            g ? Ft && X.push(
              /* @__PURE__ */ h("g", { transform: gt ? `rotate(${gt}, ${St}, ${Ct})` : void 0, children: tt.map(({ side: Rt }) => {
                const ct = {
                  top: [j.x + j.w / 2, j.y],
                  bottom: [j.x + j.w / 2, j.y + ut],
                  left: [j.x, j.y + ut / 2],
                  right: [j.x + j.w, j.y + ut / 2]
                }, [ee, te] = ct[Rt];
                return /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: ee,
                    cy: te,
                    r: yt,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.8,
                    style: { cursor: "crosshair", pointerEvents: "auto" },
                    onPointerDown: (oe) => {
                      oe.stopPropagation(), c == null || c(j.id, Rt, oe);
                    }
                  },
                  `ch-${j.id}-${Rt}`
                );
              }) }, `conn-${j.id}`)
            ) : X.push(
              /* @__PURE__ */ h("g", { transform: gt ? `rotate(${gt}, ${St}, ${Ct})` : void 0, children: tt.map(({ side: Rt }) => {
                const ct = {
                  top: [j.x + j.w / 2, j.y],
                  bottom: [j.x + j.w / 2, j.y + ut],
                  left: [j.x, j.y + ut / 2],
                  right: [j.x + j.w, j.y + ut / 2]
                }, [ee, te] = ct[Rt], oe = Rt === "top" && o.has(j.id) ? 42 / e.zoom : it;
                let ce = ee, Ce = te;
                switch (Rt) {
                  case "top":
                    Ce = te - oe;
                    break;
                  case "bottom":
                    Ce = te + oe;
                    break;
                  case "left":
                    ce = ee - oe;
                    break;
                  case "right":
                    ce = ee + oe;
                    break;
                }
                const we = Z && Q === j.id && lt === Rt;
                return /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: ce,
                    cy: Ce,
                    r: we ? 5 / e.zoom : yt,
                    fill: Wt || we ? "#3b82f6" : "white",
                    stroke: we ? "white" : Z && !Wt ? "#3b82f6" : "#94a3b8",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: we || Z && !Wt ? 1 : 0.8,
                    style: {
                      cursor: Ft ? "crosshair" : "default",
                      pointerEvents: Ft ? "auto" : "none"
                    },
                    onPointerDown: Ft ? (be) => {
                      be.stopPropagation(), c == null || c(j.id, Rt, be);
                    } : void 0
                  },
                  `ch-${j.id}-${Rt}`
                );
              }) }, `conn-${j.id}`)
            );
          }), X;
        })(),
        C && (() => {
          var q;
          const Z = !!d || !!f, G = (d == null ? void 0 : d.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, K = (d == null ? void 0 : d.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, $ = (d == null ? void 0 : d.fromNode.id) ?? null, Q = (d == null ? void 0 : d.sourceDirection) === "output" ? "input" : (d == null ? void 0 : d.sourceDirection) === "input" ? "output" : null;
          let lt = null, U = null;
          if (Z && Q) {
            let X = 40 / e.zoom;
            for (const et of t) {
              if (et.type === "edge" || et.id === $) continue;
              const rt = C.get(et.type);
              if (!((q = rt == null ? void 0 : rt.ports) != null && q.length)) continue;
              const j = et.h === "auto" ? (r == null ? void 0 : r[et.id]) ?? 100 : et.h, tt = 14 / e.zoom, yt = rt.ports.filter((it) => it.direction === Q);
              for (let it = 0; it < yt.length; it++) {
                const gt = yt[it], ut = et.y + j / (yt.length + 1) * (it + 1), St = gt.direction === "input" ? et.x - tt : et.x + et.w + tt, Ct = Math.hypot(St - G, ut - K);
                Ct < X && (X = Ct, lt = et.id, U = gt.id);
              }
            }
          }
          return t.filter((X) => {
            var rt;
            if (X.type === "edge" || V && X.id === V) return !1;
            const et = C.get(X.type);
            return !!((rt = et == null ? void 0 : et.ports) != null && rt.length);
          }).map((X) => {
            const rt = C.get(X.type).ports, j = X.h === "auto" ? (r == null ? void 0 : r[X.id]) ?? 100 : X.h, tt = X.rotation || 0, yt = X.x + X.w / 2, it = X.y + j / 2, gt = 6 / e.zoom, ut = 14 / e.zoom, St = rt.filter((ct) => ct.direction === "input"), Ct = rt.filter((ct) => ct.direction === "output"), Wt = !Z, Ft = (ct, ee, te, oe) => {
              const ce = X.y + j / (te.length + 1) * (ee + 1), Ce = oe === "input" ? X.x - ut : X.x + X.w + ut, we = Ai[ct.dataType] || Ai.any, be = lt === X.id && U === ct.id, Ho = be ? 8 / e.zoom : gt, Oo = oe === "input" ? X.x : X.x + X.w, fe = oe === "input" ? Ce - gt - 4 / e.zoom : Ce + gt + 4 / e.zoom;
              return /* @__PURE__ */ S("g", { children: [
                /* @__PURE__ */ h(
                  "line",
                  {
                    x1: Ce,
                    y1: ce,
                    x2: Oo,
                    y2: ce,
                    stroke: we,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                be && /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: Ce,
                    cy: ce,
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
                    cx: Ce,
                    cy: ce,
                    r: Ho,
                    fill: be ? "white" : we,
                    stroke: be ? we : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: Wt ? "crosshair" : "default",
                      pointerEvents: Wt ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: Wt ? (he) => {
                      he.stopPropagation(), z == null || z(X.id, ct.id, oe, he);
                    } : void 0
                  }
                ),
                (() => {
                  const he = ct.label || ct.id, Xe = 9 / e.zoom, lr = 5 / e.zoom, ae = 2.5 / e.zoom, Te = he.length * Xe * 0.62 + lr * 2, v = Xe + ae * 2, at = oe === "input" ? fe - Te : fe, re = ce - v / 2, de = v / 2, Je = be ? we : "#1a1a2e", go = be ? we : "#2a2a40", mo = be ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ h(
                      "rect",
                      {
                        x: at,
                        y: re,
                        width: Te,
                        height: v,
                        rx: de,
                        ry: de,
                        fill: Je,
                        fillOpacity: be ? 0.9 : 0.85,
                        stroke: go,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ h(
                      "text",
                      {
                        x: at + Te / 2,
                        y: ce + Xe * 0.35,
                        fill: mo,
                        fontSize: Xe,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: he
                      }
                    )
                  ] });
                })()
              ] }, `port-${X.id}-${ct.id}`);
            }, Rt = L == null ? void 0 : L.has(X.id);
            return /* @__PURE__ */ S("g", { transform: tt ? `rotate(${tt}, ${yt}, ${it})` : void 0, children: [
              St.map((ct, ee) => Ft(ct, ee, St, "input")),
              Ct.map((ct, ee) => Ft(ct, ee, Ct, "output")),
              Rt && (() => {
                const ct = 10 / e.zoom, ee = X.x + X.w + ct * 0.3, te = X.y - ct * 0.3;
                return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: ee,
                      cy: te,
                      r: ct,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ h(
                    "text",
                    {
                      x: ee,
                      y: te + 4 / e.zoom,
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
            ] }, `ports-${X.id}`);
          });
        })(),
        d && (() => {
          if (d.sourcePort && C) {
            const tt = d.fromNode, yt = C.get(tt.type), it = yt != null && yt.ports ? mr(tt, yt.ports, d.sourcePort, e.zoom, r) : null;
            it ? (it.x, it.y) : En(tt, d.cursorX, d.cursorY, r);
          } else if (d.sourceT !== void 0) {
            const tt = d.fromNode, yt = tt.h === "auto" ? (r == null ? void 0 : r[tt.id]) ?? 100 : tt.h, it = Qr(tt, yt, d.sourceT);
            it.x, it.y;
          } else if (d.sourceHandle) {
            const tt = d.fromNode, yt = tt.h === "auto" ? (r == null ? void 0 : r[tt.id]) ?? 100 : tt.h, it = {
              top: [tt.x + tt.w / 2, tt.y],
              bottom: [tt.x + tt.w / 2, tt.y + yt],
              left: [tt.x, tt.y + yt / 2],
              right: [tt.x + tt.w, tt.y + yt / 2]
            }, gt = d.sourceHandle;
            gt === "top" ? 42 / e.zoom : 26 / e.zoom;
            const [ut, St] = it[gt];
            tt.rotation && (tt.x + tt.w / 2, tt.y + yt / 2, tt.rotation * Math.PI / 180);
          } else
            En(d.fromNode, d.cursorX, d.cursorY, r);
          const Z = d.cursorX, G = d.cursorY, K = d.edgeColor || "#3b82f6", $ = d.edgeStrokeWidth || 2, Q = d.edgeStyle || "solid", lt = Q === "dashed" ? `${8 * $},${4 * $}` : Q === "dotted" ? `${2 * $},${3 * $}` : void 0, U = Math.max(8, $ * 3), q = 4 / e.zoom;
          let X = null, et;
          const rt = 50 / e.zoom;
          for (const tt of t) {
            if (tt.type === "edge" || tt.id === d.fromNode.id) continue;
            const yt = tt.h === "auto" ? (r == null ? void 0 : r[tt.id]) ?? 100 : tt.h, it = tt.w * 0.2, gt = yt * 0.2;
            if (Z >= tt.x - it && Z <= tt.x + tt.w + it && G >= tt.y - gt && G <= tt.y + yt + gt) {
              const ut = Ae(tt, Z, G, r);
              if (Math.hypot(ut.x - Z, ut.y - G) < rt) {
                X = tt, et = ut.t;
                break;
              }
            }
          }
          let j;
          if (X)
            j = De(
              d.fromNode,
              X,
              d.edgeType || "bezier",
              r,
              d.sourceHandle,
              void 0,
              void 0,
              void 0,
              void 0,
              void 0,
              d.sourceT,
              et,
              d.attachmentGap
            );
          else {
            const tt = {
              id: "__preview__",
              type: "shape",
              x: Z,
              y: G,
              w: 0,
              h: 0,
              data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
            };
            j = De(
              d.fromNode,
              tt,
              d.edgeType || "bezier",
              r,
              d.sourceHandle,
              void 0,
              void 0,
              void 0,
              void 0,
              void 0,
              d.sourceT,
              void 0,
              d.attachmentGap
            );
          }
          return /* @__PURE__ */ S("g", { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: j.path,
                stroke: K,
                strokeWidth: $,
                strokeDasharray: lt,
                strokeLinecap: "round",
                fill: "none"
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: Po(j.x2, j.y2, j.arrowAngle, U),
                fill: "none",
                stroke: K,
                strokeWidth: $,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            /* @__PURE__ */ h(
              "circle",
              {
                cx: j.x1,
                cy: j.y1,
                r: q,
                fill: K,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            ),
            X && /* @__PURE__ */ h(
              "circle",
              {
                cx: j.x2,
                cy: j.y2,
                r: q,
                fill: K,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            )
          ] });
        })(),
        f && (() => {
          const Z = ft.get(f.anchorNodeId);
          if (!Z) return null;
          let G, K;
          if (f.anchorHandle) {
            const $ = Z.h === "auto" ? (r == null ? void 0 : r[Z.id]) ?? 100 : Z.h, Q = {
              top: [Z.x + Z.w / 2, Z.y],
              bottom: [Z.x + Z.w / 2, Z.y + $],
              left: [Z.x, Z.y + $ / 2],
              right: [Z.x + Z.w, Z.y + $ / 2]
            }, lt = f.anchorHandle, U = lt === "top" ? 42 / e.zoom : 26 / e.zoom, [q, X] = Q[lt];
            let et = q, rt = X;
            switch (lt) {
              case "top":
                rt = X - U;
                break;
              case "bottom":
                rt = X + U;
                break;
              case "left":
                et = q - U;
                break;
              case "right":
                et = q + U;
                break;
            }
            if (Z.rotation) {
              const j = Z.x + Z.w / 2, tt = Z.y + $ / 2, yt = Z.rotation * Math.PI / 180, it = Math.cos(yt), gt = Math.sin(yt), ut = et - j, St = rt - tt;
              G = j + ut * it - St * gt, K = tt + ut * gt + St * it;
            } else
              G = et, K = rt;
          } else {
            const $ = En(Z, f.cursorX, f.cursorY, r);
            G = $.x, K = $.y;
          }
          return /* @__PURE__ */ h(
            "line",
            {
              x1: G,
              y1: K,
              x2: f.cursorX,
              y2: f.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && x !== "edge" && !d && !f && nt.filter((Z) => o.has(Z.id)).map((Z) => /* @__PURE__ */ h(
          iu,
          {
            node: Z,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: r,
            onHandlePointerDown: a,
            onRotateStart: l
          },
          `sel-${Z.id}`
        )),
        n && n.points.length > 1 && (() => {
          const Z = n.strokeStyle === "dashed" || n.strokeStyle === "dotted", G = n.opacity ?? 1;
          if (Z) {
            const K = n.points, $ = ["M", K[0][0], K[0][1]];
            for (let U = 1; U < K.length; U++) {
              const [q, X] = K[U], [et, rt] = K[U - 1];
              $.push("Q", et, rt, (et + q) / 2, (rt + X) / 2);
            }
            const Q = K[K.length - 1];
            $.push("L", Q[0], Q[1]);
            const lt = Ze(n.strokeStyle);
            return /* @__PURE__ */ h(
              "path",
              {
                d: $.join(" "),
                fill: "none",
                stroke: n.color,
                strokeWidth: n.width,
                strokeDasharray: lt == null ? void 0 : lt.map((U) => U * Math.max(n.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: G
              }
            );
          }
          return /* @__PURE__ */ h(
            "path",
            {
              d: Ms(n.points, {
                size: n.width
              }),
              fill: n.color,
              opacity: G
            }
          );
        })(),
        s && i && (() => {
          const Z = Math.min(s.startX, s.endX), G = Math.min(s.startY, s.endY), K = Math.abs(s.endX - s.startX), $ = Math.abs(s.endY - s.startY);
          if (K < 2 && $ < 2) return null;
          const Q = i, lt = Q.shapeType || "rect", U = Q.opacity ?? 1, q = Ze(Q.strokeStyle), X = Q.edgeStyle === "round", et = s.startX, rt = s.startY, j = s.endX, tt = s.endY, yt = {
            stroke: Q.stroke,
            fill: Q.fill,
            fillStyle: Q.fillStyle,
            roughness: Q.roughness,
            strokeWidth: Q.strokeWidth,
            strokeLineDash: q,
            seed: "__preview__"
          };
          let it = null;
          if (Q.roughness > 0)
            switch (lt) {
              case "rect":
                it = wr(0, 0, K, $, yt, X);
                break;
              case "ellipse":
                it = dn(K / 2, $ / 2, K, $, yt);
                break;
              case "diamond":
                it = hn(0, 0, K, $, yt, X);
                break;
              case "line":
                it = Ao(0, tt - rt > 0 ? 0 : $, K, tt - rt > 0 ? $ : 0, yt);
                break;
              case "arrow":
                it = un(0, tt - rt > 0 ? 0 : $, K, tt - rt > 0 ? $ : 0, yt);
                break;
            }
          if (it) {
            const Ct = lt === "line" || lt === "arrow" ? Math.min(et, j) : Z, Wt = lt === "line" || lt === "arrow" ? Math.min(rt, tt) : G;
            return /* @__PURE__ */ h("g", { transform: `translate(${Ct}, ${Wt})`, opacity: U, children: it.map((Ft, Rt) => /* @__PURE__ */ h(
              "path",
              {
                d: Ft.d,
                stroke: Ft.stroke,
                strokeWidth: Ft.strokeWidth,
                fill: Ft.fill,
                strokeDasharray: Ft.strokeDasharray,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              Rt
            )) });
          }
          const gt = q == null ? void 0 : q.join(","), ut = Q.fill || "none";
          if (lt === "ellipse")
            return /* @__PURE__ */ h(
              "ellipse",
              {
                cx: Z + K / 2,
                cy: G + $ / 2,
                rx: K / 2,
                ry: $ / 2,
                stroke: Q.stroke,
                strokeWidth: Q.strokeWidth,
                fill: ut,
                strokeDasharray: gt,
                opacity: U
              }
            );
          if (lt === "diamond")
            return /* @__PURE__ */ h(
              "polygon",
              {
                points: `${Z + K / 2},${G} ${Z + K},${G + $ / 2} ${Z + K / 2},${G + $} ${Z},${G + $ / 2}`,
                stroke: Q.stroke,
                strokeWidth: Q.strokeWidth,
                fill: ut,
                strokeDasharray: gt,
                opacity: U
              }
            );
          if (lt === "line" || lt === "arrow")
            return /* @__PURE__ */ S("g", { opacity: U, children: [
              /* @__PURE__ */ h(
                "line",
                {
                  x1: et,
                  y1: rt,
                  x2: j,
                  y2: tt,
                  stroke: Q.stroke,
                  strokeWidth: Q.strokeWidth,
                  strokeDasharray: gt
                }
              ),
              lt === "arrow" && (() => {
                const Ct = Math.atan2(tt - rt, j - et), Wt = Math.max(12, Q.strokeWidth * 4), Ft = Math.PI / 6, Rt = j - Wt * Math.cos(Ct - Ft), ct = tt - Wt * Math.sin(Ct - Ft), ee = j - Wt * Math.cos(Ct + Ft), te = tt - Wt * Math.sin(Ct + Ft);
                return /* @__PURE__ */ h(
                  "polyline",
                  {
                    points: `${Rt},${ct} ${j},${tt} ${ee},${te}`,
                    stroke: Q.stroke,
                    strokeWidth: Q.strokeWidth,
                    fill: "none"
                  }
                );
              })()
            ] });
          const St = X ? No(K, $) : 0;
          return /* @__PURE__ */ h(
            "rect",
            {
              x: Z,
              y: G,
              width: K,
              height: $,
              rx: St || void 0,
              ry: St || void 0,
              stroke: Q.stroke,
              strokeWidth: Q.strokeWidth,
              fill: ut,
              strokeDasharray: gt,
              opacity: U
            }
          );
        })(),
        y && y.length > 1 && (() => {
          const Z = performance.now(), G = 400, K = 6 / e.zoom, $ = [`M${y[0][0]},${y[0][1]}`];
          if (y.length === 2)
            $.push(`L${y[1][0]},${y[1][1]}`);
          else {
            for (let j = 0; j < y.length - 1; j++) {
              const tt = (y[j][0] + y[j + 1][0]) / 2, yt = (y[j][1] + y[j + 1][1]) / 2;
              $.push(`Q${y[j][0]},${y[j][1]},${tt},${yt}`);
            }
            const rt = y[y.length - 1];
            $.push(`L${rt[0]},${rt[1]}`);
          }
          const Q = $.join(" "), lt = (Z - y[y.length - 1][2]) / G, U = (Z - y[0][2]) / G, q = Math.max(0, 0.85 * (1 - lt)), X = Math.max(0, 0.85 * (1 - U)), et = (q + X) / 2;
          return et <= 0 ? null : /* @__PURE__ */ S(kt, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: Q,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: K * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: et * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: Q,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: K,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: et
              }
            )
          ] });
        })(),
        b && b.length > 1 && (() => {
          const Z = performance.now(), G = 1560, K = 6 / e.zoom, $ = [];
          let Q = !1, lt = !1;
          for (let yt = 0; yt < b.length; yt++) {
            const it = b[yt];
            if (isNaN(it[0])) {
              Q = !1, lt = !1;
              continue;
            }
            if (!Q)
              $.push(`M${it[0]},${it[1]}`), Q = !0, lt = !0;
            else if (lt) {
              const gt = yt + 1 < b.length && !isNaN(b[yt + 1][0]) ? b[yt + 1] : null;
              if (gt) {
                const ut = (it[0] + gt[0]) / 2, St = (it[1] + gt[1]) / 2;
                $.push(`Q${it[0]},${it[1]},${ut},${St}`);
              } else
                $.push(`L${it[0]},${it[1]}`);
            }
          }
          if ($.length === 0) return null;
          const U = $.join(" "), q = b.filter((yt) => !isNaN(yt[0]));
          if (q.length === 0) return null;
          const X = (Z - q[q.length - 1][2]) / G, et = (Z - q[0][2]) / G, rt = Math.max(0, 0.85 * (1 - X)), j = Math.max(0, 0.85 * (1 - et)), tt = (rt + j) / 2;
          return tt <= 0 ? null : /* @__PURE__ */ S(kt, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: U,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: K * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: tt * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: U,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: K,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: tt
              }
            )
          ] });
        })(),
        E && E.length > 0 && E.map((Z, G) => /* @__PURE__ */ h(
          "line",
          {
            x1: Z.axis === "x" ? Z.position : Z.start,
            y1: Z.axis === "x" ? Z.start : Z.position,
            x2: Z.axis === "x" ? Z.position : Z.end,
            y2: Z.axis === "x" ? Z.end : Z.position,
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
function cu({
  x: t,
  y: e,
  sections: o,
  onClose: r
}) {
  const n = ht(null);
  vt(() => {
    var m;
    const p = (y) => {
      n.current && !n.current.contains(y.target) && r();
    }, d = (y) => {
      y.key === "Escape" && r();
    }, f = ((m = n.current) == null ? void 0 : m.ownerDocument) ?? document;
    return f.addEventListener("pointerdown", p, !0), f.addEventListener("keydown", d), () => {
      f.removeEventListener("pointerdown", p, !0), f.removeEventListener("keydown", d);
    };
  }, [r]), vt(() => {
    const p = n.current;
    if (!p) return;
    const d = p.getBoundingClientRect(), f = p.ownerDocument.defaultView ?? window;
    let m = t, y = e;
    d.right > f.innerWidth && (m = t - d.width), d.bottom > f.innerHeight && (y = e - d.height), m = Math.max(0, m), y = Math.max(0, y), p.style.left = `${m}px`, p.style.top = `${y}px`;
  }, [t, e]);
  const s = dt(
    (p) => {
      p.disabled || (p.action(), r());
    },
    [r]
  ), i = navigator.platform.includes("Mac"), a = i ? "⌘" : "Ctrl+", l = i ? "⌥" : "Alt+", c = i ? "⇧" : "Shift+", u = (p) => p.replace("Mod+", a).replace("Alt+", l).replace("Shift+", c);
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
        zIndex: 10002,
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
      children: o.map((p, d) => /* @__PURE__ */ S("div", { children: [
        d > 0 && /* @__PURE__ */ h(
          "div",
          {
            style: {
              height: 1,
              background: "#333",
              margin: "4px 0"
            }
          }
        ),
        p.items.map((f, m) => /* @__PURE__ */ S(
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
              /* @__PURE__ */ S("span", { children: [
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
                  children: u(f.shortcut)
                }
              )
            ]
          },
          m
        ))
      ] }, d))
    }
  );
}
const $a = "sbd-clipboard", du = "sbd-nodes:";
function _a(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let r = "";
  for (let n = 0; n < o.length; n++) r += String.fromCharCode(o[n]);
  return btoa(r);
}
function Ei(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) o[n] = e.charCodeAt(n);
    const r = new TextDecoder().decode(o);
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function tl(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return Ei(e[1]);
  const o = t.match(
    new RegExp(`<!--${du}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? Ei(o[1]) : null;
}
function Xr(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function el(t) {
  return t.map((e) => {
    var n;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), r = (n = e.children) != null && n.length ? `
` + el(e.children) : "";
    return o + r;
  }).filter(Boolean).join(`
`);
}
function hu(t) {
  var o;
  const e = [];
  for (const r of t)
    switch (r.type) {
      case "content": {
        const n = r.data;
        (o = n.blocks) != null && o.length ? e.push(el(n.blocks)) : n.markdown && e.push(n.markdown);
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
function Li(t, e) {
  const o = hu(e), r = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), n = _a(e);
  return t.setData(
    "text/html",
    `<!--${$a}--><div data-sbd-nodes="${n}">${r || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function uu(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, r = o.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, i = null;
  const a = (y) => {
    n = y.clientX, s = y.clientY;
  }, l = (y) => {
    Xr(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = Li(
      y.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (y) => {
    Xr(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = Li(
      y.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, u = async (y) => {
    var D, E, V;
    if (Xr(y.target)) return;
    const { x: b, y: x } = t.screenToCanvas(n, s), g = ((D = y.clipboardData) == null ? void 0 : D.getData("text/html")) || "", k = ((E = y.clipboardData) == null ? void 0 : E.getData("text/plain")) || "";
    if (g.includes($a) || g.includes("data-sbd-nodes=") || i !== null && k === i) {
      if (i !== null && k === i && t.hasClipboard()) {
        y.preventDefault(), t.pasteClipboard(b, x);
        return;
      }
      const nt = tl(g);
      if (nt) {
        y.preventDefault(), t.setClipboard(nt), t.pasteClipboard(b, x);
        return;
      }
    }
    const C = (V = y.clipboardData) == null ? void 0 : V.items;
    if (C) {
      for (const J of Array.from(C))
        if (J.type.startsWith("image/")) {
          y.preventDefault();
          const nt = J.getAsFile();
          if (!nt) continue;
          const mt = new FileReader();
          mt.onload = () => {
            const ft = mt.result, Z = new Image();
            Z.onload = () => {
              const G = t.screenToCanvas(n, s), K = 400, $ = 300, Q = Z.naturalWidth / Z.naturalHeight, lt = Math.min(Z.naturalWidth, K), U = Math.min(Z.naturalHeight, $), q = Q >= 1 ? lt : U * Q, X = Q >= 1 ? lt / Q : U;
              let et = ft;
              if (g) {
                const j = g.match(/<img[^>]+src=["']([^"']+)["']/i);
                j && /\.(gif|webp|apng)(\?|#|$)/i.test(j[1]) && (et = j[1].replace(/&amp;/g, "&"));
              }
              const rt = {
                id: Pt(10),
                type: "image",
                x: G.x,
                y: G.y,
                w: q,
                h: X,
                z: t.nextZ(),
                data: { src: et }
              };
              t.addNode(rt), t.select(rt.id);
            }, Z.src = ft;
          }, mt.readAsDataURL(nt);
          return;
        }
    }
    const z = ps(k) ?? ps(g);
    if (z) {
      y.preventDefault();
      const J = t.screenToCanvas(n, s), nt = await Ja(
        z,
        J.x,
        J.y,
        t.nextZ()
      );
      nt && (t.addNode(nt), t.select(nt.id));
      return;
    }
    if (fh(k)) {
      const J = ph(k);
      if (J) {
        y.preventDefault();
        const nt = {
          id: Pt(10),
          type: "youtube",
          x: b,
          y: x,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: J, url: k.trim() }
        };
        t.addNode(nt), t.select(nt.id);
        return;
      }
    }
    const L = g.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (L)
      try {
        const J = ca(L);
        if (J.length > 0) {
          y.preventDefault();
          const nt = {
            id: Pt(10),
            type: "content",
            x: b,
            y: x,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: J, markdown: k, borderColor: "#1e1e2e" }
          };
          t.addNode(nt), t.select(nt.id);
          return;
        }
      } catch {
      }
    if (k.trim()) {
      y.preventDefault();
      const J = await ws(k), nt = {
        id: Pt(10),
        type: "content",
        x: b,
        y: x,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: J, markdown: k, borderColor: "#1e1e2e" }
      };
      t.addNode(nt), t.select(nt.id);
      return;
    }
    t.hasClipboard() && (y.preventDefault(), t.pasteClipboard(b, x));
  }, p = (y) => {
    const b = y.target;
    if (Xr(b)) return;
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
      const g = Array.from(t.selection);
      y.altKey ? t.bringToFront(g) : t.bringForward(g);
      return;
    }
    if (x && y.key === "[") {
      y.preventDefault();
      const g = Array.from(t.selection);
      y.altKey ? t.sendToBack(g) : t.sendBackward(g);
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
    if (x && y.key === "z") {
      y.preventDefault(), y.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (x && y.key === "a") {
      y.preventDefault(), t.selectMultiple(t.getAllNodes().map((g) => g.id));
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
  function d(y, b) {
    y.addEventListener("pointermove", a), y.addEventListener("copy", l), y.addEventListener("cut", c), y.addEventListener("paste", u), b.addEventListener("keydown", p);
  }
  function f(y, b) {
    y.removeEventListener("pointermove", a), y.removeEventListener("copy", l), y.removeEventListener("cut", c), y.removeEventListener("paste", u), b.removeEventListener("keydown", p);
  }
  d(o, r);
  const m = setInterval(() => {
    if (!e) return;
    const y = e.ownerDocument;
    y !== o && (f(o, r), o = y, r = y.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, d(o, r));
  }, 500);
  return () => {
    clearInterval(m), f(o, r);
  };
}
async function Ri(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const r = t.measuredHeights, n = pu(o, r, t), s = e.padding ?? 40, i = e.background !== !1, a = e.format === "png", l = n.w + s * 2, c = n.h + s * 2, u = n.x - s, p = n.y - s, d = await ol(o, t, r, u, p, a), f = i ? Sr(t.boardBackground).canvasBg : "transparent", m = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${l}" height="${c}" viewBox="0 0 ${l} ${c}">`,
    `<rect width="${l}" height="${c}" fill="${f}"/>`,
    ...d,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    Di(new Blob([m], { type: "image/svg+xml" }), "board.svg");
  else {
    const y = e.scale ?? 4, b = await Iu(m, l, c, y);
    Di(b, "board.png");
  }
}
function pu(t, e, o) {
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const l of t) {
    if (l.type === "edge") continue;
    const c = o.resolveHeight(l);
    r = Math.min(r, l.x), n = Math.min(n, l.y), s = Math.max(s, l.x + l.w), i = Math.max(i, l.y + c);
  }
  const a = new Map(t.map((l) => [l.id, l]));
  for (const l of t) {
    if (l.type !== "edge") continue;
    const c = l, u = a.get(c.data.fromId), p = a.get(c.data.toId);
    if (!u || !p) continue;
    const d = De(
      u,
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
    r = Math.min(r, d.bounds.x), n = Math.min(n, d.bounds.y), s = Math.max(s, d.bounds.x + d.bounds.w), i = Math.max(i, d.bounds.y + d.bounds.h);
  }
  return isFinite(r) ? { x: r, y: n, w: s - r, h: i - n } : { x: 0, y: 0, w: 100, h: 100 };
}
async function ol(t, e, o, r, n, s) {
  const i = new Map(t.map((c) => [c.id, c])), a = [...t].sort((c, u) => c.z - u.z), l = [];
  for (const c of a) {
    const u = c.x - r, p = c.y - n, d = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        l.push(fu(c, u, p, d));
        break;
      case "content":
        l.push(yu(c, u, p, c.w, d));
        break;
      case "draw":
        l.push(gu(c, r, n));
        break;
      case "shape":
        l.push(bu(c, u, p, c.w, d));
        break;
      case "text":
        l.push(xu(c, u, p, c.w, d));
        break;
      case "sticky":
        l.push(wu(c, u, p, c.w, d));
        break;
      case "image":
        l.push(await ku(c, u, p, c.w, d, s));
        break;
      case "youtube":
        l.push(await vu(c, u, p, c.w, d, s));
        break;
      case "edge": {
        const f = c, m = i.get(f.data.fromId), y = i.get(f.data.toId);
        m && y && l.push(Mu(f, m, y, o, r, n));
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
function fu(t, e, o, r) {
  const n = t.data, s = n.backgroundColor || "rgba(0,0,0,0.02)", i = n.borderColor || "#d1d5db", a = n.borderWidth ?? 1, l = yn(n.borderStyle, a), c = n.label ? ir(n.label) : "";
  let u = `<rect x="${e}" y="${o}" width="${t.w}" height="${r}" rx="4" fill="${s}" stroke="${i}" stroke-width="${a}"` + (l ? ` stroke-dasharray="${l}"` : "") + "/>";
  return c && (u += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), yo(u, e, o, t.w, r, t.rotation, n.opacity);
}
function yu(t, e, o, r, n) {
  var p;
  const s = t.data, i = ((p = s.markdown) == null ? void 0 : p.trim()) || "", a = s.borderColor, l = s.borderWidth ?? 0, c = yn(s.borderStyle, l);
  let u = "";
  return a && l > 0 ? u += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white" stroke="${a}" stroke-width="${l}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : u += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white"/>`, i && (u += Ds(i, e + 12, o + 20, r - 24, 14, 1.6, "#374151", "left", "sans-serif")), yo(u, e, o, r, n, t.rotation, s.opacity);
}
function gu(t, e, o) {
  const r = t.data, n = r.points.map(
    ([a, l, c]) => [a + t.x - e, l + t.y - o, c]
  );
  if (n.length === 0) return "";
  if (r.tool === "vector")
    return mu(n, r, t);
  const s = Ze(r.strokeStyle);
  let i = "";
  if (r.fill) {
    const a = n.map(([l, c]) => [l, c]);
    if (a.length > 2) {
      const l = a.map((c, u) => `${u === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ") + " Z";
      i += `<path d="${l}" fill="${r.fill}" fill-opacity="0.4" stroke="none"/>`;
    }
  }
  if (s) {
    const a = n.map((c, u) => `${u === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" "), l = s.map((c) => c * Math.max(r.strokeWidth, 1)).join(" ");
    i += `<path d="${a}" fill="none" stroke="${r.color}" stroke-width="${r.strokeWidth}" stroke-dasharray="${l}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const a = Ms(n, { size: r.strokeWidth });
    a && (i += `<path d="${a}" fill="${r.color}" stroke="none"/>`);
  }
  return r.opacity !== void 0 && r.opacity !== 1 ? `<g opacity="${r.opacity}">${i}</g>` : i;
}
function mu(t, e, o) {
  const r = t.map((l, c) => `${c === 0 ? "M" : "L"}${l[0].toFixed(2)},${l[1].toFixed(2)}`).join(" ") + " Z", n = Ze(e.strokeStyle), s = n ? ` stroke-dasharray="${n.map((l) => l * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${r}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, a = o.h === "auto" ? 0 : o.h;
  return yo(i, o.x, o.y, o.w, a, o.rotation, e.opacity);
}
function bu(t, e, o, r, n) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: Ze(s.strokeStyle),
    seed: t.id
  };
  let a;
  const l = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      a = wr(e, o, r, n, i, l);
      break;
    case "ellipse":
      a = dn(e + r / 2, o + n / 2, r, n, i);
      break;
    case "diamond":
      a = hn(e, o, r, n, i, l);
      break;
    case "line": {
      const u = s.startPoint ?? [0, 0], p = s.endPoint ?? [r, n];
      a = Ao(e + u[0], o + u[1], e + p[0], o + p[1], i);
      break;
    }
    case "arrow": {
      const u = s.startPoint ?? [0, 0], p = s.endPoint ?? [r, n];
      a = un(e + u[0], o + u[1], e + p[0], o + p[1], i);
      break;
    }
    default:
      a = wr(e, o, r, n, i);
  }
  const c = a.map(
    (u) => `<path d="${u.d}" fill="${u.fill || "none"}" stroke="${u.stroke}" stroke-width="${u.strokeWidth}"` + (u.strokeDasharray ? ` stroke-dasharray="${u.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return yo(c, e, o, r, n, t.rotation, s.opacity);
}
function xu(t, e, o, r, n) {
  const s = t.data, i = n || s.text.split(`
`).length * s.fontSize * 1, a = co(s.fontFamily), l = !!s.borderColor, c = l ? 6 : 0;
  let u = "";
  if (l) {
    const d = s.borderWidth ?? 1, f = yn(s.borderStyle, d);
    u += `<rect x="${e}" y="${o}" width="${r}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${d}"` + (f ? ` stroke-dasharray="${f}"` : "") + "/>";
  }
  const p = s.align === "center" ? e + r / 2 : s.align === "right" ? e + r - c : e + c;
  return u += Ds(
    s.text,
    p,
    o + c + s.fontSize,
    r - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    a
  ), yo(u, e, o, r, i, t.rotation, s.opacity);
}
function wu(t, e, o, r, n) {
  const s = t.data, i = s.fontSize ?? 16, a = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="2" fill="${s.color}"/>` + Ds(s.text, e + 12, o + 12 + i, r - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return yo(a, e, o, r, n, t.rotation, s.opacity);
}
async function ku(t, e, o, r, n, s) {
  const i = t.data;
  let a = i.src;
  if (s && a && !a.startsWith("data:"))
    try {
      a = await on(a);
    } catch {
    }
  const l = i.borderColor, c = i.borderWidth ?? 0, u = yn(i.borderStyle, c);
  let p = `<image href="${ir(a)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  return l && c > 0 && (p += `<rect x="${e}" y="${o}" width="${r}" height="${n}" fill="none" stroke="${l}" stroke-width="${c}"` + (u ? ` stroke-dasharray="${u}"` : "") + "/>"), yo(p, e, o, r, n, t.rotation, i.opacity);
}
async function vu(t, e, o, r, n, s) {
  const i = t.data;
  let a = gh(i.videoId);
  if (s)
    try {
      a = await on(a);
    } catch {
    }
  let l = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="#1a1a1a"/><image href="${ir(a)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + r / 2, u = o + n / 2, p = Math.min(r, n) * 0.12;
  return l += `<circle cx="${c}" cy="${u}" r="${p}" fill="rgba(0,0,0,0.6)"/><path d="${Su(c, u, p * 0.5)}" fill="white"/>`, yo(l, e, o, r, n, t.rotation, i.opacity);
}
function Su(t, e, o) {
  const r = o * 0.15, n = t - o * 0.7 + r, s = e - o, i = t + o + r, a = e, l = n, c = e + o;
  return `M${n},${s} L${i},${a} L${l},${c} Z`;
}
function Mu(t, e, o, r, n, s) {
  const i = t.data, a = De(
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
  ), l = `translate(${-n}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, u = i.strokeWidth;
  let p = `<path d="${a.path}" fill="none" stroke="${i.color}" stroke-width="${u}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const d = i.arrowHeadSize ?? Math.max(8, u * 3), f = i.arrowTailSize ?? Math.max(8, u * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      p += `<path d="${Po(a.x2, a.y2, a.arrowAngle, d)}" fill="none" stroke="${i.color}" stroke-width="${u}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      p += `<path d="${Zr(a.x2, a.y2, a.arrowAngle, d)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const m = d / 3;
      p += `<circle cx="${a.x2}" cy="${a.y2}" r="${m}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      p += `<path d="${Po(a.x1, a.y1, a.tailAngle, f)}" fill="none" stroke="${i.color}" stroke-width="${u}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      p += `<path d="${Zr(a.x1, a.y1, a.tailAngle, f)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const m = f / 3;
      p += `<circle cx="${a.x1}" cy="${a.y1}" r="${m}" fill="${i.color}"/>`;
    }
  }
  return i.label && (p += `<text x="${a.labelX}" y="${a.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${ir(i.label)}</text>`), `<g transform="${l}">${p}</g>`;
}
function Ds(t, e, o, r, n, s, i, a, l) {
  if (!t) return "";
  const c = a === "center" ? "middle" : a === "right" ? "end" : "start", u = Cu(t, r, n), p = n * s, d = u.map(
    (f, m) => `<tspan x="${e}" dy="${m === 0 ? 0 : p}">${ir(f)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${n}" fill="${i}" font-family="${ir(l)}" text-anchor="${c}">${d}</text>`;
}
function Cu(t, e, o) {
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
      const u = l ? l + " " + c : c;
      u.length > n && l ? (s.push(l), l = c) : l = u;
    }
    l && s.push(l);
  }
  return s;
}
function yn(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function ir(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function on(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((r, n) => {
    const s = new FileReader();
    s.onloadend = () => r(s.result), s.onerror = n, s.readAsDataURL(o);
  });
}
function Iu(t, e, o, r) {
  return new Promise((n, s) => {
    const i = new Image(), a = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), l = URL.createObjectURL(a);
    i.onload = () => {
      const c = document.createElement("canvas");
      c.width = e * r, c.height = o * r;
      const u = c.getContext("2d");
      u.scale(r, r), u.drawImage(i, 0, 0, e, o), URL.revokeObjectURL(l), c.toBlob((p) => {
        p ? n(p) : s(new Error("Canvas toBlob failed"));
      }, "image/png");
    }, i.onerror = () => {
      URL.revokeObjectURL(l), s(new Error("Failed to load SVG as image"));
    }, i.src = l;
  });
}
const zu = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), Uo = /* @__PURE__ */ new Map(), Tu = 12;
function Pu(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const r = o.data.fontFamily;
      r && !zu.has(r) && e.add(r);
    }
  return [...e];
}
async function Au(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (Uo.has(o)) {
      e.push(Uo.get(o));
      continue;
    }
    try {
      let r;
      if (o === "Excalifont")
        r = await on(da);
      else {
        const a = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!a) continue;
        r = await on(a[1]);
      }
      const n = `@font-face { font-family: '${o}'; src: url('${r}') format('woff2'); }`;
      if (Uo.size >= Tu) {
        const s = Uo.keys().next().value;
        s !== void 0 && Uo.delete(s);
      }
      Uo.set(o, n), e.push(n);
    } catch {
    }
  }
  return e.join(`
`);
}
async function Eu(t, e) {
  const o = t.getNode(e);
  if (!o || o.type !== "frame") return "";
  const r = t.resolveHeight(o), n = 0, s = o.w + n * 2, i = r + n * 2, a = o.x - n, l = o.y - n, c = [o], u = /* @__PURE__ */ new Set([e]), p = (g) => {
    u.has(g.id) || g.type === "edge" || (u.add(g.id), c.push(g));
  };
  for (const g of t.getNodesInRect({ x: o.x, y: o.y, w: o.w, h: r }))
    p(g);
  for (const g of t.getFrameChildren(e))
    p(g);
  for (const g of t.getAllNodes())
    if (g.type === "edge") {
      const k = g;
      u.has(k.data.fromId) && u.has(k.data.toId) && c.push(g);
    }
  const d = t.measuredHeights, f = await ol(c, t, d, a, l, !0), m = Pu(c), y = await Au(m), b = Sr(t.boardBackground).canvasBg, x = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    y ? `<defs><style>${y}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${b}"/>`,
    ...f,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(x)}`;
}
function Di(t, e) {
  const o = URL.createObjectURL(t), r = document.createElement("a");
  r.href = o, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o);
}
const Wi = [
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
], Fi = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function Bi(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const rl = [
  ...Wi,
  ...Bi(Wi, "phone-landscape"),
  ...Fi,
  ...Bi(Fi, "tablet-landscape"),
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
], Lu = new Map(rl.map((t) => [t.key, t]));
function fs(t) {
  return Lu.get(t);
}
function nl(t) {
  return t.w / t.h;
}
const Ru = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function Du() {
  const t = /* @__PURE__ */ new Map();
  for (const e of rl) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: Ru[e] ?? e,
    presets: o
  }));
}
function Wu(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function Yn(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const [i, a] = o[n], [l, c] = o[s];
    a > e != c > e && t < (l - i) * (e - a) / (c - a) + i && (r = !r);
  }
  return r;
}
function jn(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function Fu(t, e, o) {
  try {
    const r = await navigator.clipboard.read();
    let n = null;
    for (const i of r)
      if (i.types.includes("text/html")) {
        const a = await (await i.getType("text/html")).text();
        if (a.includes("sbd-clipboard") || a.includes("data-sbd-nodes=")) {
          const l = tl(a);
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
        const l = await i.getType(a), c = await new Promise((g) => {
          const k = new FileReader();
          k.onload = () => g(k.result), k.readAsDataURL(l);
        }), u = new Image();
        await new Promise((g) => {
          u.onload = () => g(), u.src = c;
        });
        const p = u.naturalWidth / u.naturalHeight, d = Math.min(u.naturalWidth, 400), f = Math.min(u.naturalHeight, 300), m = p >= 1 ? d : f * p, y = p >= 1 ? d / p : f;
        let b = c;
        if (n) {
          const g = n.match(/<img[^>]+src=["']([^"']+)["']/i);
          g && /\.(gif|webp|apng)(\?|#|$)/i.test(g[1]) && (b = g[1].replace(/&amp;/g, "&"));
        }
        const x = {
          id: Pt(10),
          type: "image",
          x: e,
          y: o,
          w: m,
          h: y,
          z: t.nextZ(),
          data: { src: b }
        };
        t.addNode(x), t.select(x.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (n) {
      const i = n.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const a = ca(i);
        if (a.length > 0) {
          const l = {
            id: Pt(10),
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
      const i = await ws(s), a = {
        id: Pt(10),
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
async function Ni(t) {
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
`).filter(Boolean).map((a) => `<p>${a}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${_a(e)}">${n || "<p></p>"}</div>`;
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
function Gr(t) {
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
function Hi(t, e) {
  const o = e.x - t.x, r = e.y - t.y;
  return { dist: Math.sqrt(o * o + r * r), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const Zo = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function Bu({
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
  vt(() => {
    if (t.h !== "auto") return;
    const p = l.current;
    if (!p) return;
    const d = p.offsetHeight;
    return d > 0 && r(t.id, d), n(p, () => {
      const f = p.offsetHeight;
      f > 0 && r(t.id, f);
    }), () => s(p);
  }, [t.id, t.h, r, n, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, u = Vt(() => ({
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
      style: u,
      children: a
    }
  );
}
function Nu({
  node: t,
  engine: e,
  onDone: o
}) {
  const r = ht(null), n = ht(t.data.label ?? ""), s = ht(t);
  s.current = t;
  const i = ht(t.data.label ?? ""), a = ht(!1);
  vt(() => () => {
    const p = s.current, d = n.current.trim();
    if (d !== i.current) {
      const m = { data: { ...p.data, label: d || void 0 } }, y = r.current;
      if (y && d) {
        const x = p.h === "auto" ? 100 : p.h, g = y.scrollHeight + 24;
        g > x && (m.h = g);
      }
      a.current ? (a.current = !1, e.updateNode(p.id, m)) : e.updateNodeWithHistory(p.id, m);
    }
  }, []);
  const l = t.h === "auto" ? 100 : t.h, c = t.data.labelFontSize ?? 14, u = t.data.fill && t.data.fillStyle === "solid" ? Wu(t.data.fill) : t.data.stroke;
  return /* @__PURE__ */ h(
    "div",
    {
      "data-node-id": t.id,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: l,
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
          onKeyDown: (p) => {
            p.key === "Escape" && p.currentTarget.blur(), p.stopPropagation();
          },
          onInput: (p) => {
            const d = p.currentTarget;
            a.current || (a.current = !0, e.pushHistorySnapshot()), n.current = d.value;
            const f = s.current;
            e.updateNode(f.id, {
              data: { ...f.data, label: d.value || void 0 }
            }), d.style.height = "auto", d.style.height = d.scrollHeight + "px";
            const y = d.scrollHeight + 24;
            y > l && e.updateNode(t.id, { h: y });
          },
          onPointerDown: (p) => p.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: c,
            fontFamily: co(t.data.labelFontFamily ?? lo),
            color: u,
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
function Hu({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: r
}) {
  var _s;
  const { labels: n } = Ut(), s = ht(null), i = () => {
    var w;
    return ((w = s.current) == null ? void 0 : w.ownerDocument) ?? document;
  }, [a, l] = ot({ w: 0, h: 0 }), [c, u] = ot({ ...t.viewport }), [p, d] = ot(t.getAllNodes()), [f, m] = ot(
    new Set(t.selection)
  ), [y, b] = ot(!1), [x, g] = ot(t.mode), [k, M] = ot(t.activeGroupId), [C, z] = ot(() => t.getSearchState()), [L, D] = ot([]), [E, V] = ot(t.snapToGrid), [J, nt] = ot(t.gridSize), [mt, ft] = ot(t.smartGuides), [Z, G] = ot([]), [K, $] = ot(t.boardBackground), Q = Vt(() => f.size === 1 ? Array.from(f)[0] : f.size > 1 ? [...f].sort().join("\0") : "canvas-none", [f]), lt = fn(t, Q), U = ht(!1), q = ht(!1), X = ht(/* @__PURE__ */ new Map()), et = ht(!1), rt = ht(!1), j = ht(null), tt = ht(null), yt = dt((w) => {
    i().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: w } }));
  }, []);
  vt(() => {
    const w = (I) => {
      var N, T;
      if (I.key === " " && !I.repeat && !U.current) {
        const B = (N = I.target) == null ? void 0 : N.tagName;
        if (B === "INPUT" || B === "TEXTAREA" || (T = I.target) != null && T.isContentEditable) return;
        U.current = !0;
        const A = s.current;
        A && (A.style.cursor = "grab"), I.preventDefault();
      }
    }, P = (I) => {
      if (I.key === " ") {
        U.current = !1, q.current = !1;
        const N = s.current;
        N && (N.style.cursor = t.lassoSelect ? Zo : Gr(t.mode));
      }
    };
    return window.addEventListener("keydown", w), window.addEventListener("keyup", P), () => {
      window.removeEventListener("keydown", w), window.removeEventListener("keyup", P);
    };
  }, []), vt(() => {
    const w = (I) => {
      X.current.delete(I.pointerId), I.pointerType === "pen" && (rt.current = !1), X.current.size === 0 && yt(!1), j.current && (clearTimeout(j.current), j.current = null, tt.current = null);
    }, P = i();
    return P.addEventListener("pointerup", w), P.addEventListener("pointercancel", w), () => {
      P.removeEventListener("pointerup", w), P.removeEventListener("pointercancel", w);
    };
  }, [yt]);
  const [it, gt] = ot(null), [ut, St] = ot(null), [Ct, Wt] = ot(null), [Ft, Rt] = ot(null);
  vt(() => {
    const w = s.current;
    if (!w) return;
    t.setContainer(w);
    const P = () => {
      const N = w.getBoundingClientRect();
      t.containerOffset = { x: N.left, y: N.top };
    };
    P();
    const I = new ResizeObserver((N) => {
      var A;
      const { width: T, height: B } = ((A = N[0]) == null ? void 0 : A.contentRect) ?? { width: 0, height: 0 };
      l((R) => R.w === T && R.h === B ? R : { w: T, h: B }), t.setContainerSize(T, B), P();
    });
    return I.observe(w), () => I.disconnect();
  }, [t]);
  const [ct, ee] = ot({}), te = dt((w, P) => {
    ee(
      (I) => I[w] === P ? I : { ...I, [w]: P }
    ), t.updateMeasuredHeight(w, P);
  }, [t]), oe = ht(null), ce = ht(/* @__PURE__ */ new Map());
  function Ce() {
    return oe.current || (oe.current = new ResizeObserver((w) => {
      var P;
      for (const I of w)
        (P = ce.current.get(I.target)) == null || P(I);
    })), oe.current;
  }
  const we = dt((w, P) => {
    ce.current.set(w, P), Ce().observe(w);
  }, []), be = dt((w) => {
    var P;
    ce.current.delete(w), (P = oe.current) == null || P.unobserve(w);
  }, []);
  vt(() => () => {
    var w;
    (w = oe.current) == null || w.disconnect(), oe.current = null, ce.current.clear();
  }, []);
  const Ho = Vt(() => new Set(p.map((w) => w.id)), [p]);
  vt(() => {
    ee((w) => {
      let P = !1;
      const I = {};
      for (const [N, T] of Object.entries(w))
        Ho.has(N) ? I[N] = T : P = !0;
      return P ? I : w;
    });
  }, [Ho]);
  const Oo = dt(
    (w, P, I) => {
      let N, T;
      if (o && w.data.sourcePort) {
        const B = o.get(P.type);
        B != null && B.ports && (N = mr(P, B.ports, w.data.sourcePort, c.zoom, ct) ?? void 0);
      }
      if (o && w.data.targetPort) {
        const B = o.get(I.type);
        B != null && B.ports && (T = mr(I, B.ports, w.data.targetPort, c.zoom, ct) ?? void 0);
      }
      return { sourcePortPos: N, targetPortPos: T };
    },
    [o, c.zoom, ct]
  );
  dt(
    (w) => t.zoomToNode(w),
    [t, n]
  );
  const fe = dt(
    (w, P) => {
      if (!w.rotation)
        return { minX: w.x, minY: w.y, maxX: w.x + w.w, maxY: w.y + P };
      const I = w.x + w.w / 2, N = w.y + P / 2, T = w.rotation * Math.PI / 180, B = Math.cos(T), A = Math.sin(T), R = [
        [w.w / 2, P / 2],
        [-w.w / 2, P / 2],
        [-w.w / 2, -P / 2],
        [w.w / 2, -P / 2]
      ];
      let F = 1 / 0, W = 1 / 0, H = -1 / 0, Y = -1 / 0;
      for (const [O, _] of R) {
        const st = I + O * B - _ * A, bt = N + O * A + _ * B;
        F = Math.min(F, st), W = Math.min(W, bt), H = Math.max(H, st), Y = Math.max(Y, bt);
      }
      return { minX: F, minY: W, maxX: H, maxY: Y };
    },
    []
  ), he = 8, Xe = dt(
    (w, P) => P.filter((I) => {
      if (I.type === "edge") {
        const B = I.data, A = t.getNode(B.fromId), R = t.getNode(B.toId);
        if (!A || !R) return !1;
        const { x1: F, y1: W, x2: H, y2: Y } = ni(A, R, ct);
        return F >= w.x && F <= w.x + w.w && W >= w.y && W <= w.y + w.h && H >= w.x && H <= w.x + w.w && Y >= w.y && Y <= w.y + w.h;
      }
      const N = I.h === "auto" ? ct[I.id] ?? 100 : I.h, T = fe(I, N);
      return T.minX >= w.x && T.maxX <= w.x + w.w && T.minY >= w.y && T.maxY <= w.y + w.h;
    }),
    [fe, ct]
  ), lr = dt(
    (w, P) => w.length < 3 ? [] : P.filter((I) => {
      if (I.type === "edge") {
        const A = I, R = t.getNode(A.data.fromId), F = t.getNode(A.data.toId);
        if (!R || !F) return !1;
        const { x1: W, y1: H, x2: Y, y2: O } = ni(R, F, ct);
        return Yn(W, H, w) && Yn(Y, O, w);
      }
      const N = I.h === "auto" ? ct[I.id] ?? 100 : I.h, T = I.x + I.w / 2, B = I.y + N / 2;
      return Yn(T, B, w);
    }),
    [t, ct]
  ), ae = Vt(() => {
    if (f.size < 2) return null;
    let w = 1 / 0, P = 1 / 0, I = -1 / 0, N = -1 / 0;
    for (const T of f) {
      const B = p.find((F) => F.id === T);
      if (!B || B.type === "edge") continue;
      const A = B.h === "auto" ? ct[B.id] ?? 100 : B.h, R = fe(B, A);
      w = Math.min(w, R.minX), P = Math.min(P, R.minY), I = Math.max(I, R.maxX), N = Math.max(N, R.maxY);
    }
    return w === 1 / 0 ? null : {
      x: w - he,
      y: P - he,
      w: I - w + he * 2,
      h: N - P + he * 2
    };
  }, [f, p, ct, fe]), Te = Vt(() => {
    if (!k) return null;
    const w = t.getAllGroupDescendantNodes(k);
    if (w.length === 0) return null;
    let P = 1 / 0, I = 1 / 0, N = -1 / 0, T = -1 / 0;
    for (const A of w) {
      if (A.type === "edge") continue;
      const R = A.h === "auto" ? ct[A.id] ?? 100 : A.h, F = fe(A, R);
      P = Math.min(P, F.minX), I = Math.min(I, F.minY), N = Math.max(N, F.maxX), T = Math.max(T, F.maxY);
    }
    if (P === 1 / 0) return null;
    const B = 8;
    return { x: P - B, y: I - B, w: N - P + B * 2, h: T - I + B * 2 };
  }, [k, p, ct, fe, t]), v = Vt(() => {
    const w = performance.now();
    if (p.filter(
      (wt) => {
        if (o) {
          const zt = o.get(wt.type);
          return zt && !zt.isSVGOnly;
        }
        return wt.type === "content" || wt.type === "draw" || wt.type === "shape" || wt.type === "image" || wt.type === "text" || wt.type === "frame" || wt.type === "sticky";
      }
    ), a.w <= 0 || a.h <= 0)
      return null;
    const { zoom: P, x: I, y: N } = c, B = Math.min(500, 280 / Math.max(P, 0.1)), A = {
      x: -I / P - B,
      y: -N / P - B,
      w: a.w / P + B * 2,
      h: a.h / P + B * 2
    }, R = t.getNodesInRect(A), F = /* @__PURE__ */ new Map(), W = /* @__PURE__ */ new Set(), H = /* @__PURE__ */ new Set(), Y = /* @__PURE__ */ new Set();
    let O = 0, _ = 0, st = 0, bt = 0, At = 0;
    const Et = (wt, zt = !1) => {
      const pt = t.getNode(wt);
      if (!pt) return;
      const It = F.has(pt.id);
      F.set(pt.id, pt), pt.type === "edge" ? Y.add(pt.id) : (It || W.add(pt.id), zt && H.add(pt.id));
    };
    for (const wt of R) {
      const zt = H.size;
      Et(wt.id, !0), H.size > zt && (O += 1);
    }
    for (const wt of f)
      Et(wt, !0);
    const Mt = Ft ? { x: Ft.cursorX, y: Ft.cursorY } : Ct ? { x: Ct.cursorX, y: Ct.cursorY } : null;
    if (Mt) {
      const wt = 200 / Math.max(0.2, c.zoom), zt = t.getNodesInRect({
        x: Mt.x - wt,
        y: Mt.y - wt,
        w: wt * 2,
        h: wt * 2
      });
      for (const pt of zt)
        pt.type !== "edge" && Et(pt.id, !0);
    }
    const Tt = Array.from(H);
    for (const wt of Tt) {
      const zt = t.getEdgesForNode(wt);
      for (const pt of zt) {
        const It = pt.data, Gt = Y.has(pt.id);
        F.set(pt.id, pt), Y.add(pt.id), Gt || (bt += 1);
        const Dt = W.size;
        Et(It.fromId, !1), W.size > Dt && (_ += 1);
        const Lt = W.size;
        Et(It.toId, !1), W.size > Lt && (_ += 1);
      }
    }
    if (!y)
      for (const wt of p) {
        if (wt.type !== "edge" || Y.has(wt.id)) continue;
        const zt = wt.data, pt = t.getNode(zt.fromId), It = t.getNode(zt.toId);
        if (!pt || !It) continue;
        let Gt = H.has(zt.fromId) || H.has(zt.toId);
        if (!Gt) {
          const Dt = De(
            pt,
            It,
            zt.edgeType || "bezier",
            ct,
            zt.sourceHandle,
            zt.targetHandle,
            zt.midpointOffset,
            zt.curveOffset,
            void 0,
            void 0,
            zt.sourceT,
            zt.targetT,
            zt.attachmentGap
          );
          Gt = Dt.bounds.x < A.x + A.w && Dt.bounds.x + Dt.bounds.w > A.x && Dt.bounds.y < A.y + A.h && Dt.bounds.y + Dt.bounds.h > A.y;
        }
        if (Gt) {
          F.set(wt.id, wt), Y.add(wt.id), At += 1;
          const Dt = W.size;
          Et(pt.id, !1), W.size > Dt && (st += 1);
          const Lt = W.size;
          Et(It.id, !1), W.size > Lt && (st += 1);
        }
      }
    const Zt = Array.from(F.values());
    return {
      domNodes: Zt.filter((wt) => {
        if (wt.type === "edge" || !H.has(wt.id)) return !1;
        if (o) {
          const zt = o.get(wt.type);
          return !!zt && !zt.isSVGOnly;
        }
        return wt.type === "content" || wt.type === "draw" || wt.type === "shape" || wt.type === "image" || wt.type === "text" || wt.type === "frame" || wt.type === "sticky";
      }),
      svgNodes: Zt,
      visibleNodeCount: H.size,
      visibleEdgeCount: Y.size,
      seedVisibleNodes: O,
      nodesAddedByAdjacency: _,
      nodesAddedByEdgeEndpoints: st,
      edgesAddedByAdjacency: bt,
      edgesAddedByCrossing: At,
      cullingMs: performance.now() - w
    };
  }, [c, a, p, f, t, o, ct, Ct, Ft, y]), at = y ? (v == null ? void 0 : v.svgNodes) ?? p : p;
  vt(() => {
    if (!ge.isEnabled()) return;
    const w = p.reduce((I, N) => I + (N.type === "edge" ? 1 : 0), 0), P = p.length - w;
    ge.recordCulling((v == null ? void 0 : v.cullingMs) ?? 0), ge.setVisibilityCounts({
      visibleNodes: (v == null ? void 0 : v.visibleNodeCount) ?? P,
      totalNodes: P,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: w,
      totalEdges: w,
      virtualizationActive: !!v,
      seedVisibleNodes: (v == null ? void 0 : v.seedVisibleNodes) ?? P,
      nodesAddedByAdjacency: (v == null ? void 0 : v.nodesAddedByAdjacency) ?? 0,
      nodesAddedByEdgeEndpoints: (v == null ? void 0 : v.nodesAddedByEdgeEndpoints) ?? 0,
      edgesAddedByAdjacency: (v == null ? void 0 : v.edgesAddedByAdjacency) ?? 0,
      edgesAddedByCrossing: (v == null ? void 0 : v.edgesAddedByCrossing) ?? 0
    });
  }, [p, v]);
  const re = ht(0);
  vt(() => {
    if (!ge.isEnabled() || !v) return;
    const w = performance.now();
    if (w - re.current < 1e3) return;
    re.current = w;
    const P = p.reduce((N, T) => N + (T.type === "edge" ? 1 : 0), 0), I = p.length - P;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: v.visibleNodeCount,
      totalNodes: I,
      visibleEdges: v.visibleEdgeCount,
      totalEdges: P,
      seedVisibleNodes: v.seedVisibleNodes,
      nodesAddedByAdjacency: v.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: v.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: v.edgesAddedByAdjacency,
      edgesAddedByCrossing: v.edgesAddedByCrossing,
      cullingMs: v.cullingMs
    });
  }, [p, v, c]), vt(() => {
    let w = null;
    const P = () => {
      w === null && (w = requestAnimationFrame(() => {
        w = null, d([...t.getAllNodes()]);
      }));
    };
    let I = null;
    const N = () => {
      I === null && (I = requestAnimationFrame(() => {
        I = null, u({ ...t.viewport });
      }));
    }, T = () => {
      m((O) => {
        const _ = new Set(t.selection);
        return O.size !== _.size || [...O].some((st) => !_.has(st)) ? (wo((st) => {
          if (!st || _.has(st)) return st;
          const bt = zr.current;
          return bt && bt.id === st && performance.now() < bt.until ? st : null;
        }), Yo((st) => st && !_.has(st) ? null : st), ko((st) => st && !_.has(st) ? null : st), jo((st) => st && !_.has(st) ? null : st), Vo((st) => st && !_.has(st) ? null : st), xo(null), _) : O;
      });
    }, B = () => {
      g(t.mode), t.mode === "edge" && t.deselectAll();
    }, A = () => $(t.boardBackground), R = () => {
      G([...t.alignGuides]), V(t.snapToGrid), nt(t.gridSize), ft(t.smartGuides);
    }, F = () => z(t.getSearchState());
    t.on("change", P), t.on("viewport", N), t.on("selection", T), t.on("mode", B), t.on("background", A), t.on("guides", R), t.on("search", F);
    const W = (O) => M(O), H = () => M(null), Y = () => {
      const O = s.current;
      O && (O.style.cursor = t.lassoSelect ? Zo : Gr(t.mode));
    };
    return t.on("group:enter", W), t.on("group:exit", H), t.on("lassoToggle", Y), () => {
      w !== null && cancelAnimationFrame(w), I !== null && cancelAnimationFrame(I), t.off("change", P), t.off("viewport", N), t.off("selection", T), t.off("mode", B), t.off("background", A), t.off("guides", R), t.off("search", F), t.off("group:enter", W), t.off("group:exit", H), t.off("lassoToggle", Y);
    };
  }, [t]), vt(() => {
    const w = s.current;
    if (!w) return;
    const P = (I) => {
      if (!I.ctrlKey && !I.metaKey) {
        const T = I.target.closest(".sb-editor-wrap");
        if (T && T.scrollHeight > T.clientHeight) {
          const B = T.scrollTop <= 0 && I.deltaY < 0, A = T.scrollTop + T.clientHeight >= T.scrollHeight && I.deltaY > 0;
          if (!B && !A) return;
        }
      }
      I.preventDefault(), I.ctrlKey || I.metaKey ? t.zoomByWheel(I.deltaY, I.clientX, I.clientY) : t.pan(-I.deltaX, -I.deltaY);
    };
    return w.addEventListener("wheel", P, { passive: !1 }), () => w.removeEventListener("wheel", P);
  }, [t]);
  const [de, Je] = ot(null), [go, mo] = ot(null), [Ge, Xo] = ot(null), [bo, xo] = ot(null), Ir = ht({
    x: 0,
    y: 0,
    index: -1
  }), [Ye, je] = ot(null), [dl, bn] = ot(null), [hl, ul] = ot(null), cr = ht(null), pl = Vt(() => {
    const w = /* @__PURE__ */ new Set();
    for (const P of p) {
      if (P.type !== "edge") continue;
      const I = P;
      I.data.animated && I.data.animatedDirection === "bop" && (w.add(I.data.fromId), w.add(I.data.toId));
    }
    return w;
  }, [p]), [Go, wo] = ot(null), xn = ht(null), [Xs, Yo] = ot(null), [Gs, ko] = ot(null), [dr, jo] = ot(null), [Ve, Vo] = ot(null), [fl, Ys] = ot(null);
  vt(() => {
    const w = (P) => {
      Yl(() => Vo(P));
    };
    return t.on("image:cropRequest", w), () => t.off("image:cropRequest", w);
  }, [t]);
  const js = Go || Gs || Xs || dr || Ve || fl, yl = Vt(() => {
    const w = (v == null ? void 0 : v.domNodes) ?? p.filter((I) => {
      if (o) {
        const N = o.get(I.type);
        return !!N && !N.isSVGOnly;
      }
      return I.type === "content" || I.type === "draw" || I.type === "shape" || I.type === "image" || I.type === "text" || I.type === "frame" || I.type === "sticky";
    });
    if (!Ve || w.some((I) => I.id === Ve)) return w;
    const P = p.find((I) => I.id === Ve);
    return P ? [...w, P] : w;
  }, [v, p, o, Ve]), wn = ht(null), zr = ht(null), Vs = ht(null), [kn, vn] = ot(/* @__PURE__ */ new Set()), vo = ht(/* @__PURE__ */ new Set()), [Ks, hr] = ot([]), [Tr, Sn] = ot(null), Be = ht([]), $e = ht(null), [qs, Pr] = ot([]), me = ht([]), Ko = ht(null);
  vt(() => {
    if (!Go) return;
    const w = i(), P = (W) => W.querySelector(
      `[data-node-id="${Go}"] [contenteditable="true"]`
    ), I = (W) => !W || !(W instanceof HTMLElement) ? !1 : W.isContentEditable || W instanceof HTMLInputElement || W instanceof HTMLTextAreaElement, N = (W) => W.metaKey || W.ctrlKey || W.altKey ? !1 : W.key.length === 1 ? !0 : W.key === "Backspace" || W.key === "Delete" || W.key === "Enter" || W.key === "Tab" || W.key === " ", T = (W) => !!(W.inputType.startsWith("insert") || W.inputType.startsWith("delete")), B = (W) => {
      const H = s.current;
      if (!H) return;
      const Y = W.target;
      if (Y && H.contains(Y)) return;
      W.preventDefault(), W.stopPropagation(), "stopImmediatePropagation" in W && typeof W.stopImmediatePropagation == "function" && W.stopImmediatePropagation();
      const O = P(H);
      O && O.focus();
    }, A = (W) => {
      N(W) && B(W);
    }, R = (W) => {
      T(W) && B(W);
    }, F = (W) => {
      const H = s.current;
      if (!H) return;
      const Y = W.target;
      if (!Y || H.contains(Y) || !I(Y)) return;
      const O = P(H);
      requestAnimationFrame(() => {
        try {
          Y.blur();
        } catch {
        }
        O && O.focus();
      });
    };
    return w.addEventListener("keydown", A, !0), w.addEventListener("beforeinput", R, !0), w.addEventListener("focusin", F, !0), () => {
      w.removeEventListener("keydown", A, !0), w.removeEventListener("beforeinput", R, !0), w.removeEventListener("focusin", F, !0);
    };
  }, [Go]);
  const Us = dt(
    (w, P, I, N = "auto") => {
      const T = Pt(10);
      Vs.current = T, t.addNode({
        id: T,
        type: "content",
        x: w,
        y: P,
        w: I,
        h: N,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), Ar = dt(
    (w, P, I) => {
      const { x: N, y: T } = t.screenToCanvas(w, P);
      if (I) {
        const W = t.hitTestAll(N, T, ct);
        if (W.length > 0) {
          const H = Ir.current, Y = Math.abs(N - H.x) + Math.abs(T - H.y);
          let O = 0;
          Y < 5 && (O = (H.index + 1) % W.length), Ir.current = { x: N, y: T, index: O }, t.select(W[O].id);
        } else
          t.deselectAll();
      } else {
        let W = !1;
        for (const H of t.selection) {
          const Y = t.getNode(H);
          if (!Y) continue;
          const O = Y.h === "auto" ? 100 : Y.h;
          if (N >= Y.x && N <= Y.x + Y.w && T >= Y.y && T <= Y.y + O) {
            W = !0;
            break;
          }
        }
        if (!W && t.selection.size >= 2) {
          let H = 1 / 0, Y = 1 / 0, O = -1 / 0, _ = -1 / 0;
          for (const st of t.selection) {
            const bt = t.getNode(st);
            if (!bt || bt.type === "edge") continue;
            const At = bt.h === "auto" ? 100 : bt.h;
            H = Math.min(H, bt.x), Y = Math.min(Y, bt.y), O = Math.max(O, bt.x + bt.w), _ = Math.max(_, bt.y + At);
          }
          H !== 1 / 0 && N >= H && N <= O && T >= Y && T <= _ && (W = !0);
        }
        if (!W) {
          const H = t.hitTest(N, T, ct);
          H ? t.select(H.id) : t.deselectAll();
        }
      }
      const B = Array.from(t.selection), A = B.length > 0, R = [];
      if (R.push({
        items: [
          {
            label: n.actionCut,
            shortcut: "Mod+X",
            disabled: !A,
            action: () => {
              t.cutSelected(), Ni(t);
            }
          },
          {
            label: n.actionCopy,
            shortcut: "Mod+C",
            disabled: !A,
            action: () => {
              t.copySelected(), Ni(t);
            }
          },
          {
            label: n.actionPaste,
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              Fu(t, N, T);
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
              const W = B.map((O) => t.getNode(O)).filter((O) => !!O).map((O) => structuredClone(O)), H = new Set(
                W.map((O) => O.groupId).filter(Boolean)
              ), Y = /* @__PURE__ */ new Map();
              for (const [O, _] of t.groupParent)
                H.has(O) && Y.set(O, _);
              Sn({
                nodes: W,
                groupParent: Y
              });
            }
          }
        ]
      }), B.length >= 2 || A && t.selectionHasGroup()) {
        const W = [];
        B.length >= 2 && W.push({
          label: n.actionGroupSelection,
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && W.push({
          label: n.actionUngroupSelection,
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), R.push({ items: W });
      }
      if (A && B.every((H) => {
        const Y = t.getNode(H);
        return Y && (Y.type === "draw" || Y.type === "shape");
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
      }), A) {
        const W = B.some((O) => {
          var _;
          return (_ = t.getNode(O)) == null ? void 0 : _.locked;
        }), H = B.some((O) => {
          var _;
          return !((_ = t.getNode(O)) != null && _.locked);
        }), Y = [];
        H && Y.push({
          label: n.actionLock,
          action: () => {
            for (const O of B) t.updateNode(O, { locked: !0 });
          }
        }), W && Y.push({
          label: n.actionUnlock,
          action: () => {
            for (const O of B) t.updateNode(O, { locked: void 0 });
          }
        }), R.push({ items: Y });
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
      const F = [10, 20, 40, 80];
      return R.push({
        items: [
          {
            label: n.actionToggleGrid,
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), V(t.snapToGrid);
            }
          },
          {
            label: n.actionSmartGuides,
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), ft(t.smartGuides);
            }
          },
          ...F.map((W) => ({
            label: `${W}px`,
            checked: t.gridSize === W,
            action: () => {
              t.setGridSize(W);
            }
          }))
        ]
      }), R.push({
        items: [
          {
            label: n.actionExportAsPng,
            action: () => Ri(t, { format: "png" })
          },
          {
            label: n.actionExportAsSvg,
            action: () => Ri(t, { format: "svg" })
          }
        ]
      }), R;
    },
    [t]
  ), gl = dt(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const P = Ar(w.clientX, w.clientY, w.altKey);
      Xo({ x: w.clientX, y: w.clientY, sections: P });
    },
    [t, Ar]
  ), Er = dt(
    (w, P, I) => {
      const N = () => {
        const A = s.current, R = (A == null ? void 0 : A.ownerDocument) ?? document, F = Array.from(
          R.querySelectorAll('input, textarea, [contenteditable="true"]')
        );
        for (const W of F)
          if (!(A != null && A.contains(W)))
            try {
              W.blur();
            } catch {
            }
      };
      N();
      const T = Pt(10);
      t.addNode({
        id: T,
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
      }), t.select(T), wn.current = T, zr.current = { id: T, until: performance.now() + 1500 }, wo(T);
      const B = (A = 0) => {
        const R = s.current;
        if (!R) return;
        const F = R.querySelector(
          `[data-node-id="${T}"] [contenteditable="true"]`
        );
        if (F) {
          N(), F.focus(), zr.current = null;
          return;
        }
        A < 12 && requestAnimationFrame(() => B(A + 1));
      };
      requestAnimationFrame(() => B(0));
    },
    [t]
  ), ml = dt(
    (w) => {
      if (t.presentationMode || t.mode !== "select") return;
      const { x: P, y: I } = t.screenToCanvas(w.clientX, w.clientY), N = t.hitTestAll(P, I, ct), T = N.find((B) => !t.isContainerType(B.type)) ?? N[0] ?? null;
      if (T != null && T.groupId) {
        const B = [];
        let A = T.groupId;
        for (; A; )
          B.push(A), A = t.groupParent.get(A);
        if (!t.activeGroupId) {
          t.enterGroup(B[B.length - 1]), t.select(T.id);
          return;
        }
        const R = B.indexOf(t.activeGroupId);
        if (R > 0) {
          t.enterGroup(B[R - 1]), t.select(T.id);
          return;
        }
      }
      if (T && T.type === "text") {
        t.select(T.id), xn.current = { clientX: w.clientX, clientY: w.clientY }, wo(T.id);
        return;
      }
      if (T && T.type === "sticky") {
        t.select(T.id), ko(T.id);
        return;
      }
      if (T && T.type === "frame") {
        t.select(T.id), Yo(T.id);
        return;
      }
      if (T && T.type === "shape") {
        const B = T.data, A = B.shape === "line" || B.shape === "arrow";
        t.select(T.id), A || jo(T.id);
        return;
      }
      if (T && T.type === "draw") {
        t.select(T.id);
        return;
      }
      if (!T || T.type === "draw") {
        const A = t.getAllNodes().filter((R) => R.type === "shape").sort((R, F) => F.z - R.z).find((R) => !(R.data.shape === "line" || R.data.shape === "arrow") && an(R, P, I, t.viewport.zoom, !0));
        if (A) {
          t.select(A.id), jo(A.id);
          return;
        }
      }
      T || (t.deselectAll(), Er(P, I, 300));
    },
    [t, ct, Er]
  ), bl = dt(
    (w) => {
      if (X.current.set(w.pointerId, { x: w.clientX, y: w.clientY }), w.pointerType === "pen" && (rt.current = !0), w.button !== 2 && yt(!0), w.pointerType === "touch" && (X.current.size >= 2 || rt.current)) {
        et.current = !0, j.current && (clearTimeout(j.current), j.current = null, tt.current = null);
        const T = new Map(X.current), B = [...X.current.keys()].find((H) => H !== w.pointerId);
        B !== void 0 && i().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: B,
            bubbles: !0,
            clientX: w.clientX,
            clientY: w.clientY
          })
        );
        const A = [...T.values()];
        let R = Hi(A[0], A[1] ?? A[0]);
        const F = (H) => {
          if (!T.has(H.pointerId)) return;
          T.set(H.pointerId, { x: H.clientX, y: H.clientY });
          const Y = [...T.values()];
          if (Y.length < 2) return;
          const O = Hi(Y[0], Y[1]);
          if (t.pan(O.mx - R.mx, O.my - R.my), R.dist > 1) {
            const _ = Math.min(Math.max(O.dist / R.dist, 0.9), 1.1);
            t.zoomByFactor(_, O.mx, O.my);
          }
          R = O;
        }, W = (H) => {
          X.current.delete(H.pointerId), T.delete(H.pointerId), H.pointerType === "pen" && (rt.current = !1), T.size < 2 && !rt.current && (et.current = !1, i().removeEventListener("pointermove", F), i().removeEventListener("pointerup", W), i().removeEventListener("pointercancel", W));
        };
        i().addEventListener("pointermove", F), i().addEventListener("pointerup", W), i().addEventListener("pointercancel", W);
        return;
      }
      if (et.current || t.presentationMode && !(w.button === 1 || w.button === 0 && U.current))
        return;
      if (Ge && Xo(null), w.pointerType === "touch") {
        const T = w.clientX, B = w.clientY, A = w.pointerId;
        tt.current = { clientX: T, clientY: B }, j.current = setTimeout(() => {
          if (j.current = null, !tt.current || et.current) return;
          const R = Ar(T, B, !1);
          Xo({ x: T, y: B, sections: R }), i().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: A,
              bubbles: !0,
              clientX: T,
              clientY: B
            })
          ), tt.current = null;
        }, 500);
      }
      if (w.button === 1 || w.button === 0 && U.current) {
        w.preventDefault(), q.current = !0;
        const T = t.viewport.x, B = t.viewport.y, A = w.clientX, R = w.clientY, F = s.current;
        F && (F.style.cursor = "grabbing");
        const W = (Y) => {
          t.viewport.x = T + (Y.clientX - A), t.viewport.y = B + (Y.clientY - R), u({ ...t.viewport });
        }, H = () => {
          q.current = !1, F && (F.style.cursor = U.current ? "grab" : t.lassoSelect ? Zo : ""), i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", H);
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", H);
        return;
      }
      const { x: I, y: N } = t.screenToCanvas(w.clientX, w.clientY);
      if (w.pointerType === "touch" && j.current && t.hitTest(I, N, ct) && (clearTimeout(j.current), j.current = null, tt.current = null), t.mode === "select") {
        if (w.button !== 0) return;
        if (w.altKey) {
          const A = t.hitTestAll(I, N, ct);
          if (A.length > 0) {
            const R = Ir.current, F = Math.abs(I - R.x) + Math.abs(N - R.y);
            let W = 0;
            F < 5 && (W = (R.index + 1) % A.length), Ir.current = { x: I, y: N, index: W }, t.select(A[W].id);
          }
          return;
        }
        let T = !1;
        !t.lassoSelect && t.selection.size >= 2 && ae && I >= ae.x && I <= ae.x + ae.w && N >= ae.y && N <= ae.y + ae.h && (T = !0);
        let B = null;
        if (!t.lassoSelect) {
          const A = t.hitTestAll(I, N, ct);
          B = A.find((R) => t.selection.has(R.id) && !t.isContainerType(R.type)) ?? A.find((R) => !t.isContainerType(R.type)) ?? A[0] ?? null, !B && !T && (B = Hc(t.nodes, I, N, t.viewport.zoom, ct, Oo));
        }
        if (B || T) {
          B && (t.activeGroupId && !t.isNodeInActiveGroup(B.id) && t.exitAllGroups(), w.shiftKey ? t.toggleSelect(B.id) : t.selection.has(B.id) || t.select(B.id));
          const A = Array.from(t.selection).filter(
            (Dt) => {
              var Lt;
              return !((Lt = t.getNode(Dt)) != null && Lt.locked);
            }
          );
          if (A.length === 0) return;
          const R = w.clientX, F = w.clientY, W = /* @__PURE__ */ new Set(), H = /* @__PURE__ */ new Set();
          for (const Dt of A) {
            const Lt = t.getNode(Dt);
            if (Lt && t.isContainerType(Lt.type)) {
              H.add(Dt);
              for (const Bt of t.getFrameDescendantIds(Dt))
                t.selection.has(Bt) || W.add(Bt);
            }
          }
          const Y = [...A, ...W], O = Y.map((Dt) => {
            const Lt = t.getNode(Dt);
            return { id: Dt, x: Lt.x, y: Lt.y };
          }), _ = t.selectionGroupId(), st = _ ? t.groupRotations.get(_) : null, bt = st == null ? void 0 : st.cx, At = st == null ? void 0 : st.cy;
          xo(null);
          let Et = !1, Mt = null, Tt = R, Zt = F, Yt = !1;
          const wt = new Set(Y), zt = t.createDragSnapContext(wt), pt = () => {
            Mt = null;
            const Dt = (Tt - R) / t.viewport.zoom, Lt = (Zt - F) / t.viewport.zoom, { finalDx: Bt, finalDy: se } = t.computeDragSnap(
              O,
              wt,
              Dt,
              Lt,
              Yt,
              zt
            ), Ot = O.map((ie) => ({
              id: ie.id,
              patch: { x: ie.x + Bt, y: ie.y + se }
            }));
            t.updateMany(Ot), st && _ && t.groupRotations.set(_, {
              angle: st.angle,
              cx: bt + Bt,
              cy: At + se
            });
          }, It = (Dt) => {
            const Lt = (Dt.clientX - R) / t.viewport.zoom, Bt = (Dt.clientY - F) / t.viewport.zoom;
            if (!Et)
              if (Math.abs(Lt) > 2 || Math.abs(Bt) > 2)
                Et = !0, t.pushHistorySnapshot(), b(!0);
              else
                return;
            Tt = Dt.clientX, Zt = Dt.clientY, Yt = Dt.metaKey || Dt.ctrlKey, Mt === null && (Mt = requestAnimationFrame(pt));
          }, Gt = () => {
            if (Mt !== null && (cancelAnimationFrame(Mt), pt()), b(!1), t.clearAlignGuides(), i().removeEventListener("pointermove", It), i().removeEventListener("pointerup", Gt), Et) {
              const Dt = A.filter(
                (Lt) => !W.has(Lt)
              );
              Dt.length > 0 && t.updateFrameMembership(Dt);
            }
          };
          i().addEventListener("pointermove", It), i().addEventListener("pointerup", Gt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          w.shiftKey || t.deselectAll();
          const A = new Set(t.selection);
          if (t.lassoSelect) {
            const R = [[I, N]];
            mo([...R]);
            let F = null, W = 0;
            const H = (_ = !1) => {
              F = null;
              const st = _ || W % 2 === 0;
              if (W++, st && R.length >= 3) {
                const At = lr(R, t.getAllNodes()).map((Mt) => Mt.id), Et = w.shiftKey ? [.../* @__PURE__ */ new Set([...A, ...At])] : At;
                (Et.length !== t.selection.size || Et.some((Mt) => !t.selection.has(Mt))) && t.selectMultiple(Et);
              }
              mo([...R]);
            }, Y = (_) => {
              const { x: st, y: bt } = t.screenToCanvas(_.clientX, _.clientY);
              R.push([st, bt]), F === null && (F = requestAnimationFrame(() => H(!1)));
            }, O = () => {
              F !== null && cancelAnimationFrame(F), H(!0), i().removeEventListener("pointermove", Y), i().removeEventListener("pointerup", O), mo(null), t.toggleLassoSelect();
            };
            i().addEventListener("pointermove", Y), i().addEventListener("pointerup", O);
          } else {
            const R = { startX: I, startY: N, endX: I, endY: N };
            Je(R);
            let F = null, W = 0;
            const H = (_ = !1, st = !1) => {
              F = null;
              const bt = Math.min(R.startX, R.endX), At = Math.min(R.startY, R.endY), Et = Math.abs(R.endX - R.startX), Mt = Math.abs(R.endY - R.startY), Tt = st || _ || W % 2 === 0;
              if (W++, Tt) {
                const Yt = Xe(
                  { x: bt, y: At, w: Et, h: Mt },
                  t.getAllNodes()
                ).map((zt) => zt.id), wt = w.shiftKey ? [.../* @__PURE__ */ new Set([...A, ...Yt])] : Yt;
                (wt.length !== t.selection.size || wt.some((zt) => !t.selection.has(zt))) && t.selectMultiple(wt);
              }
              Je({ ...R });
            }, Y = (_) => {
              const { x: st, y: bt } = t.screenToCanvas(_.clientX, _.clientY);
              R.endX = st, R.endY = bt, F === null && (F = requestAnimationFrame(() => H(!1)));
            }, O = () => {
              F !== null && cancelAnimationFrame(F), H(!0), i().removeEventListener("pointermove", Y), i().removeEventListener("pointerup", O), Je(null);
            };
            i().addEventListener("pointermove", Y), i().addEventListener("pointerup", O);
          }
        }
      } else if (t.mode === "text") {
        t.deselectAll();
        const T = I, B = N, A = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        let R = !1;
        je(A);
        const F = (H) => {
          const { x: Y, y: O } = t.screenToCanvas(H.clientX, H.clientY);
          A.endX = Y, A.endY = O;
          const _ = Math.abs(A.endX - A.startX), st = Math.abs(A.endY - A.startY);
          (_ > 10 || st > 10) && (R = !0), je({ ...A });
        }, W = () => {
          i().removeEventListener("pointermove", F), i().removeEventListener("pointerup", W), je(null);
          const H = R ? Math.max(Math.abs(A.endX - A.startX), 60) : 300, Y = R ? Math.min(A.startX, A.endX) : T, O = R ? Math.min(A.startY, A.endY) : B;
          Er(Y, O, H);
        };
        i().addEventListener("pointermove", F), i().addEventListener("pointerup", W);
      } else if (t.mode === "note") {
        t.deselectAll();
        const T = I, B = N, A = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        let R = !1;
        je(A);
        const F = (H) => {
          const { x: Y, y: O } = t.screenToCanvas(H.clientX, H.clientY);
          A.endX = Y, A.endY = O;
          const _ = Math.abs(A.endX - A.startX), st = Math.abs(A.endY - A.startY);
          (_ > 10 || st > 10) && (R = !0), je({ ...A });
        }, W = () => {
          i().removeEventListener("pointermove", F), i().removeEventListener("pointerup", W), je(null);
          const H = R ? Math.max(Math.abs(A.endX - A.startX), 100) : 300, Y = R ? Math.max(Math.abs(A.endY - A.startY), 40) : "auto", O = R ? Math.min(A.startX, A.endX) : T, _ = R ? Math.min(A.startY, A.endY) : B;
          Us(O, _, H, Y), t.setMode("select");
        };
        i().addEventListener("pointermove", F), i().addEventListener("pointerup", W);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const T = I, B = N, A = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        let R = !1;
        je(A);
        const F = (H) => {
          const { x: Y, y: O } = t.screenToCanvas(H.clientX, H.clientY);
          A.endX = Y, A.endY = O, Math.abs(A.endX - A.startX) > 10 && (R = !0), je({ ...A });
        }, W = () => {
          i().removeEventListener("pointermove", F), i().removeEventListener("pointerup", W), je(null);
          const H = R ? Math.max(Math.abs(A.endX - A.startX), 100) : 200, Y = R ? Math.min(A.startX, A.endX) : T, O = R ? Math.min(A.startY, A.endY) : B, _ = Pt(10), st = R ? Math.max(Math.abs(A.endY - A.startY), 100) : 150;
          t.addNode({
            id: _,
            type: "sticky",
            x: Y,
            y: O,
            w: H,
            h: st,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(_), ko(_), t.setMode("select");
        };
        i().addEventListener("pointermove", F), i().addEventListener("pointerup", W);
      } else if (t.mode === "draw") {
        const T = w.pressure || 0.5, B = {
          points: [[I, N, T]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle,
          opacity: t.activeTool.opacity
        };
        gt(B), t.notifyDrawProgress(B);
        const A = (F) => {
          const { x: W, y: H } = t.screenToCanvas(F.clientX, F.clientY), Y = F.pressure || 0.5;
          B.points.push([W, H, Y]), gt({ ...B, points: [...B.points] }), t.notifyDrawProgress({ ...B, points: [...B.points] });
        }, R = () => {
          if (i().removeEventListener("pointermove", A), i().removeEventListener("pointerup", R), t.notifyDrawEnd(), B.points.length < 2) {
            gt(null);
            return;
          }
          let F = 1 / 0, W = 1 / 0, H = -1 / 0, Y = -1 / 0;
          for (const [_, st] of B.points)
            _ < F && (F = _), st < W && (W = st), _ > H && (H = _), st > Y && (Y = st);
          const O = B.points.map(
            ([_, st, bt]) => [_ - F, st - W, bt]
          );
          t.addNode({
            id: Pt(10),
            type: "draw",
            x: F,
            y: W,
            w: H - F,
            h: Y - W,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: O,
              color: B.color,
              strokeWidth: B.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => gt(null));
        };
        i().addEventListener("pointermove", A), i().addEventListener("pointerup", R);
      } else if (t.mode === "shape") {
        const T = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        St(T);
        const B = {
          shapeType: t.activeTool.shapeType || "rect",
          stroke: t.activeTool.color,
          strokeWidth: t.activeTool.width
        }, A = (F) => {
          const { x: W, y: H } = t.screenToCanvas(F.clientX, F.clientY);
          T.endX = W, T.endY = H, St({ ...T }), t.notifyShapeProgress({ ...T, ...B });
        }, R = () => {
          i().removeEventListener("pointermove", A), i().removeEventListener("pointerup", R), t.notifyShapeEnd();
          const F = t.activeTool.shapeType || "rect", W = F === "line" || F === "arrow", H = Math.min(T.startX, T.endX);
          let Y = Math.min(T.startY, T.endY);
          const O = Math.abs(T.endX - T.startX), _ = Math.abs(T.endY - T.startY);
          let st;
          if (W) {
            const Et = t.activeTool.width * 2;
            st = Math.max(_, Et), _ < Et && (Y -= (Et - _) / 2);
          } else
            st = _;
          if (O < 5 && (W ? O < 5 && Math.abs(T.endY - T.startY) < 5 : st < 5)) {
            St(null);
            return;
          }
          const bt = {};
          W && (bt.startPoint = [
            T.startX - H,
            T.startY - Y
          ], bt.endPoint = [
            T.endX - H,
            T.endY - Y
          ]);
          const At = Pt(10);
          t.addNode({
            id: At,
            type: "shape",
            x: H,
            y: Y,
            w: O,
            h: st,
            z: t.nextZ(),
            data: {
              shape: F,
              stroke: t.activeTool.color,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle,
              strokeWidth: t.activeTool.width,
              strokeStyle: t.activeTool.strokeStyle,
              roughness: t.activeTool.roughness ?? 1,
              opacity: t.activeTool.opacity ?? 1,
              ...bt
            }
          }), St(null);
        };
        i().addEventListener("pointermove", A), i().addEventListener("pointerup", R);
      } else if (t.mode === "edge") {
        const T = t.hitTest(I, N, ct);
        if (!T || T.type === "edge") return;
        const B = t.freeFormEdges, A = B ? Ae(T, I, N, ct).t : void 0;
        Wt({
          fromNode: T,
          cursorX: I,
          cursorY: N,
          sourceT: A,
          edgeColor: t.activeTool.color,
          edgeStrokeWidth: t.activeTool.width || 2,
          edgeStyle: t.activeTool.strokeStyle || "solid",
          edgeType: t.activeTool.edgeType,
          attachmentGap: t.activeTool.attachmentGap
        });
        const R = (W) => {
          const { x: H, y: Y } = t.screenToCanvas(W.clientX, W.clientY);
          Wt(
            (O) => O ? { ...O, cursorX: H, cursorY: Y } : null
          );
        }, F = (W) => {
          i().removeEventListener("pointermove", R), i().removeEventListener("pointerup", F), Wt(null);
          const { x: H, y: Y } = t.screenToCanvas(W.clientX, W.clientY);
          let O = t.hitTest(H, Y, ct);
          if (!O || O.type === "edge" || t.isContainerType(O.type)) {
            const Mt = 50 / t.viewport.zoom;
            let Tt = 1 / 0, Zt = !1, Yt = null;
            for (const wt of t.getAllNodes()) {
              if (wt.type === "edge" || wt.id === T.id) continue;
              const zt = t.isContainerType(wt.type), pt = Ae(wt, H, Y, ct), It = Math.hypot(pt.x - H, pt.y - Y);
              if (It < Mt) {
                if (zt && !Zt && Yt) continue;
                (!zt && Zt || It < Tt) && (Tt = It, Zt = zt, Yt = wt);
              }
            }
            Yt && (O = Yt);
          }
          if (!O || O.type === "edge" || O.id === T.id)
            return;
          const _ = B ? void 0 : Wr(T, I, N, ct), st = B ? void 0 : Wr(O, H, Y, ct), bt = B ? Ae(O, H, Y, ct).t : void 0;
          if (t.getAllNodes().some((Mt) => {
            if (Mt.type !== "edge") return !1;
            const Tt = Mt.data;
            return B ? Tt.fromId === T.id && Tt.toId === O.id && Tt.sourceT !== void 0 && Tt.targetT !== void 0 && Math.abs(Tt.sourceT - A) < 0.02 && Math.abs(Tt.targetT - bt) < 0.02 : jn(Tt, {
              fromId: T.id,
              toId: O.id,
              sourceHandle: _,
              targetHandle: st
            });
          })) return;
          const Et = {
            id: Pt(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: T.id,
              toId: O.id,
              style: t.activeTool.strokeStyle || "solid",
              color: t.activeTool.color,
              strokeWidth: t.activeTool.width || 2,
              arrowHead: t.activeTool.arrowHead ?? "arrow",
              arrowTail: t.activeTool.arrowTail ?? "none",
              edgeType: t.activeTool.edgeType ?? "bezier",
              roughness: t.activeTool.roughness ?? 0,
              attachmentGap: t.activeTool.attachmentGap,
              sourceHandle: _,
              targetHandle: st,
              sourceT: A,
              targetT: bt
            }
          };
          t.addNode(Et);
        };
        i().addEventListener("pointermove", R), i().addEventListener("pointerup", F);
      } else if (t.mode === "frame") {
        const T = {
          startX: I,
          startY: N,
          endX: I,
          endY: N
        };
        St(T);
        const B = (R) => {
          const { x: F, y: W } = t.screenToCanvas(R.clientX, R.clientY);
          T.endX = F, T.endY = W, St({ ...T });
        }, A = () => {
          i().removeEventListener("pointermove", B), i().removeEventListener("pointerup", A);
          const R = Math.min(T.startX, T.endX), F = Math.min(T.startY, T.endY), W = Math.abs(T.endX - T.startX), H = Math.abs(T.endY - T.startY);
          if (W < 20 || H < 20) {
            St(null);
            return;
          }
          const Y = Pt(10);
          t.addNode({
            id: Y,
            type: "frame",
            x: R,
            y: F,
            w: W,
            h: H,
            z: t.nextZ(),
            data: {
              label: n.typeFrame,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(Y), St(null), t.select(Y), t.setMode("select");
        };
        i().addEventListener("pointermove", B), i().addEventListener("pointerup", A);
      } else if (t.mode === "erase") {
        if (w.button !== 0) return;
        const T = (bt, At) => {
          const Et = t.hitTestAll(bt, At, ct), Mt = Nc(
            t.nodes,
            bt,
            At,
            t.viewport.zoom,
            ct,
            Oo
          );
          let Tt = !1;
          for (const Zt of [...Et, ...Mt])
            vo.current.has(Zt.id) || (vo.current.add(Zt.id), Tt = !0);
          Tt && vn(new Set(vo.current));
        }, B = 400;
        vo.current = /* @__PURE__ */ new Set();
        const A = performance.now();
        Be.current = [[I, N, A]], hr([[I, N, A]]), T(I, N);
        let R = I, F = N;
        const W = () => {
          const bt = performance.now(), At = Be.current.length;
          Be.current = Be.current.filter(
            (Et) => bt - Et[2] < B
          ), Be.current.length !== At && hr([...Be.current]), $e.current = requestAnimationFrame(W);
        };
        $e.current = requestAnimationFrame(W);
        const H = (bt) => {
          const { x: At, y: Et } = t.screenToCanvas(bt.clientX, bt.clientY);
          R = At, F = Et;
          const Mt = performance.now();
          Be.current.push([R, F, Mt]), hr([...Be.current]), T(R, F);
        }, Y = () => {
          $e.current !== null && (cancelAnimationFrame($e.current), $e.current = null), vo.current = /* @__PURE__ */ new Set(), vn(/* @__PURE__ */ new Set()), Be.current = [], hr([]);
        }, O = () => {
          st();
          const bt = Array.from(vo.current);
          Y(), bt.length > 0 && t.deleteNodes(bt);
        }, _ = (bt) => {
          bt.key === "Escape" && (st(), Y());
        }, st = () => {
          i().removeEventListener("pointermove", H), i().removeEventListener("pointerup", O), i().removeEventListener("keydown", _);
        };
        i().addEventListener("pointermove", H), i().addEventListener("pointerup", O), i().addEventListener("keydown", _);
      } else if (t.mode === "laser") {
        if (w.button !== 0) return;
        const T = 1560;
        Ko.current !== null && (cancelAnimationFrame(Ko.current), Ko.current = null);
        const B = performance.now();
        me.current.length > 0 && me.current.push([NaN, NaN, B]), me.current.push([I, N, B]), Pr([...me.current]), t.notifyLaserProgress([[I, N]]);
        let A = B;
        const R = () => {
          const H = performance.now(), Y = me.current.length;
          me.current = me.current.filter(
            (O) => H - O[2] < T
          ), (me.current.length !== Y || me.current.length > 0) && Pr([...me.current]), H - A >= 60 && (A = H, me.current.length > 0 && t.notifyLaserProgress(
            me.current.map((O) => [O[0], O[1]])
          )), me.current.length > 0 ? Ko.current = requestAnimationFrame(R) : (Ko.current = null, Pr([]), t.notifyLaserEnd());
        };
        Ko.current = requestAnimationFrame(R);
        const F = (H) => {
          const { x: Y, y: O } = t.screenToCanvas(H.clientX, H.clientY), _ = performance.now();
          me.current.push([Y, O, _]), Pr([...me.current]), t.notifyLaserProgress(
            me.current.map((st) => [st[0], st[1]])
          );
        }, W = () => {
          i().removeEventListener("pointermove", F), i().removeEventListener("pointerup", W);
        };
        i().addEventListener("pointermove", F), i().addEventListener("pointerup", W);
      } else if (t.mode === "hand") {
        if (w.button !== 0) return;
        w.preventDefault();
        const T = t.viewport.x, B = t.viewport.y, A = w.clientX, R = w.clientY, F = s.current;
        F && (F.style.cursor = "grabbing");
        const W = (Y) => {
          t.viewport.x = T + (Y.clientX - A), t.viewport.y = B + (Y.clientY - R), u({ ...t.viewport });
        }, H = () => {
          F && (F.style.cursor = t.lassoSelect ? Zo : Gr(t.mode)), i().removeEventListener("pointermove", W), i().removeEventListener("pointerup", H);
        };
        i().addEventListener("pointermove", W), i().addEventListener("pointerup", H);
      }
    },
    [
      t,
      Us,
      Er,
      Ge,
      Ar,
      ae,
      ct,
      fe,
      Xe,
      yt
    ]
  ), Mn = dt(
    (w, P, I) => {
      if (I.preventDefault(), t.presentationMode) return;
      const N = t.getNode(w);
      if (!N || N.locked) return;
      const T = I.clientX, B = I.clientY, A = N.x, R = N.y, F = N.w, W = N.h === "auto", H = W ? ct[w] ?? 100 : N.h, Y = N.type === "draw" ? N.data.points.map(
        (Mt) => [...Mt]
      ) : null, O = N.type === "shape" ? N.data.startPoint : void 0, _ = N.type === "shape" ? N.data.endPoint : void 0, st = N.type === "text" ? N.data.fontSize : 0;
      let bt = !1;
      const At = (Mt) => {
        const Tt = (Mt.clientX - T) / t.viewport.zoom, Zt = (Mt.clientY - B) / t.viewport.zoom;
        bt || (bt = !0, t.pushHistorySnapshot());
        let Yt = A, wt = R, zt = F, pt = H;
        if ((P === "nw" || P === "w" || P === "sw") && (Yt = A + Tt, zt = F - Tt), (P === "ne" || P === "e" || P === "se") && (zt = F + Tt), (P === "nw" || P === "n" || P === "ne") && (wt = R + Zt, pt = H - Zt), (P === "sw" || P === "s" || P === "se") && (pt = H + Zt), t.snapToGrid && !(Mt.metaKey || Mt.ctrlKey)) {
          const Lt = t.gridSize, Bt = (se) => Math.round(se / Lt) * Lt;
          (P === "nw" || P === "w" || P === "sw") && (Yt = Bt(Yt), zt = A + F - Yt), (P === "ne" || P === "e" || P === "se") && (zt = Bt(Yt + zt) - Yt), (P === "nw" || P === "n" || P === "ne") && (wt = Bt(wt), pt = R + H - wt), (P === "sw" || P === "s" || P === "se") && (pt = Bt(wt + pt) - wt);
        }
        let It = 10, Gt = 10;
        if (N.type === "legacy-voicenote" ? (It = 260, Gt = 120) : N.type === "legacy-canvas-link" && (It = 220, Gt = 86), zt < It && (zt = It, (P === "nw" || P === "w" || P === "sw") && (Yt = A + F - It)), pt < Gt && (pt = Gt, (P === "nw" || P === "n" || P === "ne") && (wt = R + H - Gt)), Mt.shiftKey && !(N.type === "frame" && N.data.devicePreset)) {
          const Lt = ns(
            P,
            A,
            R,
            F,
            H,
            Yt,
            wt,
            zt,
            pt
          );
          Yt = Lt.x, wt = Lt.y, zt = Lt.w, pt = Lt.h;
        }
        if (N.type === "frame") {
          const Lt = N.data.devicePreset;
          if (Lt) {
            const Bt = fs(Lt);
            if (Bt) {
              const se = nl(Bt);
              if (P === "nw" || P === "ne" || P === "sw" || P === "se" || (P === "e" || P === "w")) {
                const _t = Math.round(zt / se);
                (P === "nw" || P === "ne") && (wt = R + H - _t), pt = _t;
              } else
                zt = Math.round(pt * se);
            }
          }
        }
        const Dt = {
          x: Yt,
          y: wt,
          w: zt,
          h: W ? "auto" : pt
        };
        if (Y && N.type === "draw") {
          const Lt = F > 0 ? zt / F : 1, Bt = H > 0 ? pt / H : 1, se = Y.map(
            ([Ot, ie, _t]) => [Ot * Lt, ie * Bt, _t]
          );
          Dt.data = { ...N.data, points: se };
        }
        if (N.type === "shape" && (O || _)) {
          const Lt = F > 0 ? zt / F : 1, Bt = H > 0 ? pt / H : 1, se = { ...N.data };
          O && (se.startPoint = [
            O[0] * Lt,
            O[1] * Bt
          ]), _ && (se.endPoint = [
            _[0] * Lt,
            _[1] * Bt
          ]), Dt.data = se;
        }
        if (N.type === "text" && st > 0 && P !== "e" && P !== "w") {
          const Lt = P === "n" || P === "s" ? H > 0 ? pt / H : 1 : F > 0 ? zt / F : 1, Bt = Math.max(8, Math.round(st * Lt));
          Dt.data = { ...N.data, fontSize: Bt };
        }
        t.updateNode(w, Dt);
      }, Et = () => {
        i().removeEventListener("pointermove", At), i().removeEventListener("pointerup", Et), t.isContainerType(N.type) && t.syncFrameChildrenAfterResize(w);
      };
      i().addEventListener("pointermove", At), i().addEventListener("pointerup", Et);
    },
    [t, ct]
  ), xl = dt(
    (w, P) => {
      P.stopPropagation(), P.preventDefault();
      const I = t.getNode(w);
      if (!I || I.locked) return;
      const N = I.h === "auto" ? ct[w] ?? 100 : I.h, T = I.x + I.w / 2, B = I.y + N / 2, A = I.rotation || 0, { x: R, y: F } = t.screenToCanvas(
        P.clientX,
        P.clientY
      ), W = Math.atan2(F - B, R - T);
      let H = !1;
      const Y = (_) => {
        H || (H = !0, t.pushHistorySnapshot());
        const { x: st, y: bt } = t.screenToCanvas(_.clientX, _.clientY), At = Math.atan2(bt - B, st - T);
        let Et = A + (At - W) * (180 / Math.PI);
        (_.shiftKey || t.snapToGrid) && !(_.metaKey || _.ctrlKey) && (Et = Math.round(Et / 15) * 15), t.updateNode(w, { rotation: Et });
      }, O = () => {
        i().removeEventListener("pointermove", Y), i().removeEventListener("pointerup", O);
      };
      i().addEventListener("pointermove", Y), i().addEventListener("pointerup", O);
    },
    [t, ct]
  ), Zs = dt(
    (w, P, I) => {
      I.stopPropagation(), I.preventDefault();
      const N = t.getNode(w);
      if (!N) return;
      const { x: T, y: B } = t.screenToCanvas(I.clientX, I.clientY), A = t.freeFormEdges, R = A ? Ae(N, T, B, ct).t : void 0;
      Wt({
        fromNode: N,
        cursorX: T,
        cursorY: B,
        sourceHandle: A ? void 0 : P,
        sourceT: R,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid"
      });
      const F = (H) => {
        const { x: Y, y: O } = t.screenToCanvas(H.clientX, H.clientY);
        Wt(
          (_) => _ ? { ..._, cursorX: Y, cursorY: O } : null
        );
      }, W = (H) => {
        i().removeEventListener("pointermove", F), i().removeEventListener("pointerup", W), Wt(null);
        const { x: Y, y: O } = t.screenToCanvas(H.clientX, H.clientY);
        let _ = t.hitTest(Y, O, ct);
        if (!_ || _.type === "edge" || t.isContainerType(_.type)) {
          const Mt = 50 / t.viewport.zoom;
          let Tt = 1 / 0, Zt = !1, Yt = null;
          for (const wt of t.getAllNodes()) {
            if (wt.type === "edge" || wt.id === N.id) continue;
            const zt = t.isContainerType(wt.type), pt = Ae(wt, Y, O, ct), It = Math.hypot(pt.x - Y, pt.y - O);
            It >= Mt || zt && !Zt && Yt || (!zt && Zt || It < Tt) && (Tt = It, Zt = zt, Yt = wt);
          }
          Yt && (_ = Yt);
        }
        if (!_ || _.type === "edge" || _.id === N.id)
          return;
        const st = A ? void 0 : Wr(_, Y, O, ct), bt = A ? Ae(_, Y, O, ct).t : void 0;
        if (t.getAllNodes().some((Mt) => {
          if (Mt.type !== "edge") return !1;
          const Tt = Mt.data;
          return A ? Tt.fromId === N.id && Tt.toId === _.id && Tt.sourceT !== void 0 && Tt.targetT !== void 0 && Math.abs(Tt.sourceT - R) < 0.02 && Math.abs(Tt.targetT - bt) < 0.02 : jn(Tt, {
            fromId: N.id,
            toId: _.id,
            sourceHandle: P,
            targetHandle: st
          });
        })) return;
        const Et = {
          id: Pt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: N.id,
            toId: _.id,
            style: t.activeTool.strokeStyle || "solid",
            color: t.activeTool.color,
            strokeWidth: t.activeTool.width || 2,
            arrowHead: t.activeTool.arrowHead ?? "arrow",
            arrowTail: t.activeTool.arrowTail ?? "none",
            edgeType: t.activeTool.edgeType ?? "bezier",
            roughness: t.activeTool.roughness ?? 0,
            attachmentGap: t.activeTool.attachmentGap,
            sourceHandle: A ? void 0 : P,
            targetHandle: st,
            sourceT: R,
            targetT: bt
          }
        };
        t.addNode(Et);
      };
      i().addEventListener("pointermove", F), i().addEventListener("pointerup", W);
    },
    [t, ct]
  ), wl = dt(
    (w) => {
      let P = null, I = w === "top" || w === "left" ? 1 / 0 : -1 / 0;
      for (const N of t.selection) {
        const T = t.getNode(N);
        if (!T || T.type === "edge") continue;
        const B = T.h === "auto" ? ct[T.id] ?? 100 : T.h;
        let A;
        switch (w) {
          case "top":
            A = T.y;
            break;
          case "bottom":
            A = T.y + B;
            break;
          case "left":
            A = T.x;
            break;
          case "right":
            A = T.x + T.w;
            break;
        }
        (w === "top" || w === "left" ? A < I : A > I) && (I = A, P = N);
      }
      return P;
    },
    [t, ct]
  ), kl = dt(
    (w, P, I, N) => {
      var O;
      N.stopPropagation(), N.preventDefault();
      const T = t.getNode(w);
      if (!T || !o) return;
      const B = o.get(T.type), A = (O = B == null ? void 0 : B.ports) == null ? void 0 : O.find((_) => _.id === P);
      if (!A) return;
      const R = I === "input" ? "left" : "right", { x: F, y: W } = t.screenToCanvas(N.clientX, N.clientY);
      Wt({
        fromNode: T,
        cursorX: F,
        cursorY: W,
        sourceHandle: R,
        sourcePort: P,
        sourceDirection: I,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid"
      });
      const H = (_) => {
        const { x: st, y: bt } = t.screenToCanvas(_.clientX, _.clientY);
        Wt(
          (At) => At ? { ...At, cursorX: st, cursorY: bt } : null
        );
      }, Y = (_) => {
        var ie;
        i().removeEventListener("pointermove", H), i().removeEventListener("pointerup", Y), Wt(null);
        const { x: st, y: bt } = t.screenToCanvas(_.clientX, _.clientY), At = I === "output" ? "input" : "output", Et = 40 / t.viewport.zoom;
        let Mt = null, Tt = null, Zt = 1 / 0;
        for (const _t of t.getAllNodes()) {
          if (_t.type === "edge" || _t.id === T.id) continue;
          const le = o.get(_t.type);
          if (!((ie = le == null ? void 0 : le.ports) != null && ie.length)) continue;
          const Le = _t.h === "auto" ? t.measuredHeights[_t.id] ?? 100 : _t.h;
          for (const pe of le.ports) {
            if (pe.direction !== At || A.dataType !== "any" && pe.dataType !== "any" && A.dataType !== pe.dataType) continue;
            const _e = le.ports.filter((El) => El.direction === pe.direction), So = _e.indexOf(pe), Lr = 14 / t.viewport.zoom, zn = _t.y + Le / (_e.length + 1) * (So + 1), Tn = pe.direction === "input" ? _t.x - Lr : _t.x + _t.w + Lr, Pn = Math.hypot(Tn - st, zn - bt);
            Pn < Et && Pn < Zt && (Zt = Pn, Mt = _t, Tt = pe);
          }
        }
        if (!Mt || !Tt) return;
        const Yt = Tt.id, wt = I === "output" ? Mt.id : T.id, zt = I === "output" ? Yt : P;
        if (t.getAllNodes().some((_t) => {
          if (_t.type !== "edge") return !1;
          const le = _t.data;
          return le.toId === wt && le.targetPort === zt;
        })) return;
        const It = I === "output" ? T.id : Mt.id, Gt = I === "output" ? Mt.id : T.id, Dt = I === "output" ? P : Yt, Lt = I === "output" ? Yt : P, Ot = {
          id: Pt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: It,
            toId: Gt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: Dt,
            targetPort: Lt
          }
        };
        t.addNode(Ot), t.select(Ot.id);
      };
      i().addEventListener("pointermove", H), i().addEventListener("pointerup", Y);
    },
    [t, o, ct]
  ), [Qs, vl] = ot(0);
  vt(() => {
    if (r)
      return r.onChange(() => vl((w) => w + 1));
  }, [r]);
  const Sl = dt(
    (w, P, I, N, T) => {
      T.stopPropagation(), T.preventDefault();
      const B = t.getNode(w);
      if (!B || B.type !== "edge") return;
      let A = !1;
      const R = (W) => {
        A || (A = !0, t.pushHistorySnapshot());
        const H = t.screenToCanvas(W.clientX, W.clientY), Y = t.getNode(w);
        if (!Y) return;
        const O = t.getNode(Y.data.fromId), _ = t.getNode(Y.data.toId);
        if (!(!O || !_))
          if (P === "xy") {
            const st = De(
              O,
              _,
              Y.data.edgeType || "bezier",
              ct,
              Y.data.sourceHandle,
              Y.data.targetHandle,
              void 0,
              void 0,
              // no offsets → natural midpoint
              void 0,
              void 0,
              Y.data.sourceT,
              Y.data.targetT,
              Y.data.attachmentGap
            );
            if (!st.kinkHandle) return;
            const bt = H.x - st.kinkHandle.x, At = H.y - st.kinkHandle.y;
            t.updateNode(w, {
              data: { ...Y.data, curveOffset: [bt, At] }
            });
          } else {
            const st = P === "x" ? H.x : H.y, bt = De(
              O,
              _,
              Y.data.edgeType || "bezier",
              ct,
              Y.data.sourceHandle,
              Y.data.targetHandle,
              0.5,
              void 0,
              // default to get range
              void 0,
              void 0,
              Y.data.sourceT,
              Y.data.targetT,
              Y.data.attachmentGap
            );
            if (!bt.kinkHandle) return;
            const At = bt.kinkHandle.min, Et = bt.kinkHandle.max, Mt = Et - At;
            if (Mt === 0) return;
            const Zt = (Math.max(At, Math.min(Et, st)) - At) / Mt;
            t.updateNode(w, {
              data: { ...Y.data, midpointOffset: Zt }
            });
          }
      }, F = () => {
        i().removeEventListener("pointermove", R), i().removeEventListener("pointerup", F);
      };
      i().addEventListener("pointermove", R), i().addEventListener("pointerup", F);
    },
    [t, ct]
  ), Ml = dt(
    (w, P, I) => {
      I.stopPropagation(), I.preventDefault();
      const N = t.getNode(w);
      if (!N || N.type !== "edge") return;
      const { fromId: T, toId: B, sourceHandle: A, targetHandle: R } = N.data, F = P === "source" ? B : T, W = P === "source" ? R : A, H = t.getNode(T), Y = t.getNode(B);
      if (!H || !Y) return;
      const O = De(
        H,
        Y,
        N.data.edgeType || "bezier",
        ct,
        A,
        R,
        void 0,
        void 0,
        void 0,
        void 0,
        N.data.sourceT,
        N.data.targetT,
        N.data.attachmentGap
      ), _ = P === "source" ? { x: O.x1, y: O.y1 } : { x: O.x2, y: O.y2 };
      Rt({
        edgeId: w,
        endpoint: P,
        anchorNodeId: F,
        anchorHandle: W,
        cursorX: _.x,
        cursorY: _.y
      });
      const st = (At) => {
        const { x: Et, y: Mt } = t.screenToCanvas(At.clientX, At.clientY);
        Rt(
          (Tt) => Tt ? { ...Tt, cursorX: Et, cursorY: Mt } : null
        );
      }, bt = (At) => {
        i().removeEventListener("pointermove", st), i().removeEventListener("pointerup", bt), Rt(null);
        const { x: Et, y: Mt } = t.screenToCanvas(At.clientX, At.clientY);
        let Tt = t.hitTest(Et, Mt, ct);
        if (!Tt || Tt.type === "edge" || t.isContainerType(Tt.type)) {
          const Bt = 50 / t.viewport.zoom;
          let se = 1 / 0, Ot = !1, ie = null;
          for (const _t of t.getAllNodes()) {
            if (_t.type === "edge") continue;
            const le = t.isContainerType(_t.type), Le = Ae(_t, Et, Mt, ct), pe = Math.hypot(Le.x - Et, Le.y - Mt);
            pe >= Bt || le && !Ot && ie || (!le && Ot || pe < se) && (se = pe, Ot = le, ie = _t);
          }
          ie && (Tt = ie);
        }
        if (!Tt || Tt.type === "edge") return;
        const Zt = P === "source" ? Tt.id : T, Yt = P === "target" ? Tt.id : B;
        if (Zt === Yt) return;
        const wt = P === "source" ? T : B;
        if (Tt.id === wt) return;
        const zt = N.data.sourceT !== void 0 || N.data.targetT !== void 0, pt = zt ? void 0 : Wr(Tt, Et, Mt, ct), It = zt ? Ae(Tt, Et, Mt, ct).t : void 0, Gt = P === "source" ? {
          fromId: Zt,
          toId: Yt,
          sourceHandle: pt ?? A,
          targetHandle: R,
          sourcePort: N.data.sourcePort,
          targetPort: N.data.targetPort
        } : {
          fromId: Zt,
          toId: Yt,
          sourceHandle: A,
          targetHandle: pt ?? R,
          sourcePort: N.data.sourcePort,
          targetPort: N.data.targetPort
        };
        if (t.getAllNodes().some((Bt) => Bt.type !== "edge" || Bt.id === w ? !1 : jn(Bt.data, Gt))) return;
        let Lt;
        zt ? Lt = P === "source" ? { fromId: Tt.id, sourceT: It, sourceHandle: void 0 } : { toId: Tt.id, targetT: It, targetHandle: void 0 } : Lt = P === "source" ? { fromId: Tt.id, sourceHandle: pt } : { toId: Tt.id, targetHandle: pt }, t.updateNodeWithHistory(w, { data: Lt });
      };
      i().addEventListener("pointermove", st), i().addEventListener("pointerup", bt);
    },
    [t, ct]
  ), Cl = dt(
    (w) => {
      if (w.stopPropagation(), w.preventDefault(), t.presentationMode) return;
      const P = Array.from(t.selection).map((It) => t.getNode(It)).filter(Boolean);
      if (P.length < 2) return;
      const N = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, T = N ? t.groupRotations.get(N) : null;
      let B, A;
      if (T)
        B = T.cx, A = T.cy;
      else {
        let It = 1 / 0, Gt = 1 / 0, Dt = -1 / 0, Lt = -1 / 0;
        for (const Bt of P) {
          const se = Bt.h === "auto" ? ct[Bt.id] ?? 100 : Bt.h, Ot = fe(Bt, se);
          It = Math.min(It, Ot.minX), Gt = Math.min(Gt, Ot.minY), Dt = Math.max(Dt, Ot.maxX), Lt = Math.max(Lt, Ot.maxY);
        }
        B = (It + Dt) / 2, A = (Gt + Lt) / 2;
      }
      const R = (T == null ? void 0 : T.angle) ?? 0, W = P.filter((It) => !It.locked).map((It) => {
        const Gt = It.h === "auto" ? ct[It.id] ?? 100 : It.h;
        return {
          id: It.id,
          cx: It.x + It.w / 2,
          cy: It.y + Gt / 2,
          w: It.w,
          h: Gt,
          rotation: It.rotation || 0
        };
      }), H = -R * Math.PI / 180, Y = Math.cos(H), O = Math.sin(H);
      let _ = 1 / 0, st = 1 / 0, bt = -1 / 0, At = -1 / 0;
      for (const It of W) {
        const Gt = It.cx - B, Dt = It.cy - A, Lt = B + Gt * Y - Dt * O, Bt = A + Gt * O + Dt * Y;
        _ = Math.min(_, Lt - It.w / 2), st = Math.min(st, Bt - It.h / 2), bt = Math.max(bt, Lt + It.w / 2), At = Math.max(At, Bt + It.h / 2);
      }
      const Et = {
        x: _ - he,
        y: st - he,
        w: bt - _ + he * 2,
        h: At - st + he * 2
      }, { x: Mt, y: Tt } = t.screenToCanvas(w.clientX, w.clientY), Zt = Math.atan2(Tt - A, Mt - B);
      let Yt = !1, wt = R;
      const zt = (It) => {
        Yt || (Yt = !0, t.pushHistorySnapshot());
        const { x: Gt, y: Dt } = t.screenToCanvas(It.clientX, It.clientY);
        let Bt = (Math.atan2(Dt - A, Gt - B) - Zt) * (180 / Math.PI);
        (It.shiftKey || t.snapToGrid) && !(It.metaKey || It.ctrlKey) && (Bt = Math.round(Bt / 15) * 15), wt = R + Bt, xo({ angle: wt, cx: B, cy: A, bounds: Et });
        const se = Bt * Math.PI / 180, Ot = Math.cos(se), ie = Math.sin(se), _t = W.map((le) => {
          const Le = le.cx - B, pe = le.cy - A, _e = B + Le * Ot - pe * ie, So = A + Le * ie + pe * Ot;
          return {
            id: le.id,
            patch: {
              x: _e - le.w / 2,
              y: So - le.h / 2,
              rotation: wt
            }
          };
        });
        t.updateMany(_t);
      }, pt = () => {
        N && t.groupRotations.set(N, { angle: wt, cx: B, cy: A }), xo({ angle: wt, cx: B, cy: A, bounds: Et }), i().removeEventListener("pointermove", zt), i().removeEventListener("pointerup", pt);
      };
      i().addEventListener("pointermove", zt), i().addEventListener("pointerup", pt);
    },
    [t, ct, fe]
  ), Il = dt(
    (w, P) => {
      if (P.stopPropagation(), P.preventDefault(), t.presentationMode) return;
      const I = Array.from(t.selection).map((pt) => t.getNode(pt)).filter(Boolean);
      if (I.length < 2) return;
      const N = (pt) => pt.h === "auto" ? ct[pt.id] ?? 100 : pt.h;
      let T = 1 / 0, B = 1 / 0, A = -1 / 0, R = -1 / 0;
      for (const pt of I) {
        const It = N(pt), Gt = fe(pt, It);
        T = Math.min(T, Gt.minX), B = Math.min(B, Gt.minY), A = Math.max(A, Gt.maxX), R = Math.max(R, Gt.maxY);
      }
      const F = { x: T, y: B, w: A - T, h: R - B }, W = F.w || 1, H = F.h || 1, O = I.filter((pt) => !pt.locked).map((pt) => {
        const It = N(pt);
        return {
          id: pt.id,
          type: pt.type,
          isAutoH: pt.h === "auto",
          relX: (pt.x - F.x) / W,
          relY: (pt.y - F.y) / H,
          relW: pt.w / W,
          relH: It / H,
          origW: pt.w,
          origH: It,
          origPoints: pt.type === "draw" ? pt.data.points.map((Gt) => [...Gt]) : null,
          drawData: pt.type === "draw" ? { ...pt.data } : null,
          origFontSize: pt.type === "text" ? pt.data.fontSize : 0,
          textData: pt.type === "text" ? { ...pt.data } : null
        };
      }), _ = P.clientX, st = P.clientY;
      let bt = !1, At = null, Et = _, Mt = st, Tt = !1, Zt = P.shiftKey;
      const Yt = () => {
        At = null;
        const pt = (Et - _) / t.viewport.zoom, It = (Mt - st) / t.viewport.zoom;
        !bt && (pt !== 0 || It !== 0) && (bt = !0, t.pushHistorySnapshot());
        let Gt = F.x, Dt = F.y, Lt = F.w, Bt = F.h;
        if ((w === "nw" || w === "w" || w === "sw") && (Gt = F.x + pt, Lt = F.w - pt), (w === "ne" || w === "e" || w === "se") && (Lt = F.w + pt), (w === "nw" || w === "n" || w === "ne") && (Dt = F.y + It, Bt = F.h - It), (w === "sw" || w === "s" || w === "se") && (Bt = F.h + It), t.snapToGrid && !Tt) {
          const Ot = t.gridSize, ie = (_t) => Math.round(_t / Ot) * Ot;
          (w === "nw" || w === "w" || w === "sw") && (Gt = ie(Gt), Lt = F.x + F.w - Gt), (w === "ne" || w === "e" || w === "se") && (Lt = ie(Gt + Lt) - Gt), (w === "nw" || w === "n" || w === "ne") && (Dt = ie(Dt), Bt = F.y + F.h - Dt), (w === "sw" || w === "s" || w === "se") && (Bt = ie(Dt + Bt) - Dt);
        }
        if (Lt < 20 && (Lt = 20, (w === "nw" || w === "w" || w === "sw") && (Gt = F.x + F.w - 20)), Bt < 20 && (Bt = 20, (w === "nw" || w === "n" || w === "ne") && (Dt = F.y + F.h - 20)), Zt && F.w > 0 && F.h > 0) {
          const Ot = ns(
            w,
            F.x,
            F.y,
            F.w,
            F.h,
            Gt,
            Dt,
            Lt,
            Bt
          );
          Gt = Ot.x, Dt = Ot.y, Lt = Ot.w, Bt = Ot.h;
        }
        const se = O.map((Ot) => {
          const ie = Gt + Ot.relX * Lt, _t = Dt + Ot.relY * Bt, le = Ot.relW * Lt, Le = Ot.relH * Bt, pe = {
            x: ie,
            y: _t,
            w: le,
            h: Ot.isAutoH ? "auto" : Le
          };
          if (Ot.origPoints && Ot.drawData) {
            const _e = Ot.origW > 0 ? le / Ot.origW : 1, So = Ot.origH > 0 ? Le / Ot.origH : 1;
            pe.data = {
              ...Ot.drawData,
              points: Ot.origPoints.map(
                ([Lr, zn, Tn]) => [Lr * _e, zn * So, Tn]
              )
            };
          }
          if (Ot.type === "text" && Ot.origFontSize > 0 && Ot.textData && w !== "e" && w !== "w") {
            const _e = w === "n" || w === "s" ? Ot.origH > 0 ? Le / Ot.origH : 1 : Ot.origW > 0 ? le / Ot.origW : 1, So = Math.max(8, Math.round(Ot.origFontSize * _e));
            pe.data = { ...Ot.textData, fontSize: So };
          }
          return { id: Ot.id, patch: pe };
        });
        t.updateMany(se);
      }, wt = (pt) => {
        Et = pt.clientX, Mt = pt.clientY, Tt = pt.metaKey || pt.ctrlKey, Zt = pt.shiftKey, At === null && (At = requestAnimationFrame(Yt));
      }, zt = () => {
        At !== null && (cancelAnimationFrame(At), Yt()), i().removeEventListener("pointermove", wt), i().removeEventListener("pointerup", zt);
        for (const pt of I)
          t.isContainerType(pt.type) && t.syncFrameChildrenAfterResize(pt.id);
      };
      i().addEventListener("pointermove", wt), i().addEventListener("pointerup", zt);
    },
    [t, ct, fe]
  );
  vt(() => {
    s.current && (s.current.style.cursor = t.lassoSelect ? Zo : Gr(x)), x !== "select" && x !== "edge" && (cr.current = null, bn(null)), x !== "erase" && ($e.current !== null && (cancelAnimationFrame($e.current), $e.current = null), vo.current = /* @__PURE__ */ new Set(), vn(/* @__PURE__ */ new Set()), Be.current = [], hr([]));
  }, [x]);
  const Cn = ht(null), Js = ht(null), zl = dt(
    (w) => {
      if (j.current && w.pointerType === "touch" && tt.current) {
        const P = w.clientX - tt.current.clientX, I = w.clientY - tt.current.clientY;
        Math.sqrt(P * P + I * I) > 8 && (clearTimeout(j.current), j.current = null, tt.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (Js.current = { clientX: w.clientX, clientY: w.clientY }, Cn.current === null && (Cn.current = requestAnimationFrame(() => {
        Cn.current = null;
        const P = s.current, I = Js.current;
        if (!P || !I) return;
        const { x: N, y: T } = t.screenToCanvas(I.clientX, I.clientY);
        if (t.lassoSelect) {
          P.style.cursor = Zo;
          return;
        }
        if (t.mode === "edge") {
          const R = 50 / t.viewport.zoom;
          let F = null, W = R;
          for (const H of t.getAllNodes()) {
            if (H.type === "edge") continue;
            const Y = Ae(H, N, T, ct), O = Math.hypot(Y.x - N, Y.y - T);
            O < W && (W = O, F = H.id);
          }
          F !== cr.current && (cr.current = F, bn(F)), ul({ x: N, y: T });
          return;
        }
        if (t.selection.size >= 2 && ae && N >= ae.x && N <= ae.x + ae.w && T >= ae.y && T <= ae.y + ae.h) {
          P.style.cursor = "move";
          return;
        }
        const B = t.hitTest(N, T, ct), A = B ? B.id : null;
        if (A !== cr.current && (cr.current = A, bn(A)), B) {
          P.style.cursor = "move";
          return;
        }
        P.style.cursor = "default";
      })));
    },
    [t, ae, ct, fe]
  ), Tl = dt((w) => {
    (w.dataTransfer.types.includes("Files") || w.dataTransfer.types.includes(ds) || w.dataTransfer.types.includes(hs) || w.dataTransfer.types.includes(us)) && (w.preventDefault(), w.dataTransfer.dropEffect = "copy");
  }, []), Pl = dt(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const P = w.dataTransfer.getData(us);
      if (P) {
        try {
          const F = JSON.parse(P);
          Qa(t, F, w.clientX, w.clientY);
        } catch (F) {
          console.error("Failed to place GIF:", F);
        }
        return;
      }
      const I = w.dataTransfer.getData(hs);
      if (I) {
        try {
          const { itemId: F } = JSON.parse(I), H = Ya().find((Y) => Y.id === F);
          H && qa(t, H, w.clientX, w.clientY);
        } catch (F) {
          console.error("Failed to place personal library item:", F);
        }
        return;
      }
      const N = w.dataTransfer.getData(ds);
      if (N) {
        try {
          const { libraryId: F, itemId: W } = JSON.parse(N), Y = As(F).find((O) => O.id === W);
          Y && Ka(t, Y, w.clientX, w.clientY);
        } catch (F) {
          console.error("Failed to place library item:", F);
        }
        return;
      }
      const T = w.dataTransfer.files[0];
      if (!T) return;
      if (T.name.endsWith(".excalidrawlib") || T.name.endsWith(".excalidrawlib.json")) {
        const F = new FileReader();
        F.onload = () => {
          try {
            const W = JSON.parse(F.result);
            if (W.type === "excalidrawlib") {
              const H = T.name.replace(/\.excalidrawlib(\.json)?$/, "");
              Es(W, { name: H });
            }
          } catch (W) {
            console.error("Failed to import library:", W);
          }
        }, F.readAsText(T);
        return;
      }
      if (T.type === "image/svg+xml" || T.name.endsWith(".svg")) {
        const F = new FileReader();
        F.onload = () => {
          const W = F.result, H = ps(W);
          H && su(t, H, w.clientX, w.clientY);
        }, F.readAsText(T);
        return;
      }
      if (!T.type.startsWith("image/")) return;
      const { x: B, y: A } = t.screenToCanvas(w.clientX, w.clientY), R = new FileReader();
      R.onload = () => {
        const F = R.result, W = new Image();
        W.onload = () => {
          const H = Math.min(W.naturalWidth, 400), Y = Math.min(W.naturalHeight, 300), O = W.naturalWidth / W.naturalHeight, _ = O >= 1 ? H : Y * O, st = O >= 1 ? H / O : Y;
          t.addNode({
            id: Pt(10),
            type: "image",
            x: B,
            y: A,
            w: _,
            h: st,
            z: t.nextZ(),
            data: { src: F }
          });
        }, W.src = F;
      }, R.readAsDataURL(T);
    },
    [t]
  ), Al = `translate(${c.x}px, ${c.y}px) scale(${c.zoom})`, In = C.activeIndex >= 0 ? ((_s = C.matches[C.activeIndex]) == null ? void 0 : _s.nodeId) ?? null : null, $s = Vt(() => {
    if (!C.query || C.matches.length === 0) return /* @__PURE__ */ new Set();
    const w = /* @__PURE__ */ new Set();
    for (const P of C.matches)
      P.nodeType !== "edge" && w.add(P.nodeId);
    return w;
  }, [C]);
  return nn(() => {
    const w = s.current;
    if (y || !w || !C.query || C.matches.length === 0) {
      D((A) => A.length === 0 ? A : []);
      return;
    }
    const P = w.getBoundingClientRect(), I = C.query.toLocaleLowerCase(), N = Array.from(new Set(C.matches.map((A) => A.nodeId))), T = [], B = 900;
    for (const A of N) {
      if (T.length >= B) break;
      const R = A.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), F = w.querySelector(`[data-node-id="${R}"]`);
      if (!F) continue;
      const W = document.createTreeWalker(
        F,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(Y) {
            const O = Y.parentElement;
            return !O || O.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']") || !Y.nodeValue || !Y.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let H = W.nextNode();
      for (; H && T.length < B; ) {
        const Y = H, _ = (Y.nodeValue ?? "").toLocaleLowerCase();
        let st = 0;
        for (; st <= _.length - I.length && T.length < B; ) {
          const bt = _.indexOf(I, st);
          if (bt < 0) break;
          const At = document.createRange();
          At.setStart(Y, bt), At.setEnd(Y, bt + I.length);
          const Et = At.getClientRects();
          for (const Mt of Et)
            Mt.width <= 0 || Mt.height <= 0 || T.push({
              x: Mt.left - P.left,
              y: Mt.top - P.top,
              w: Mt.width,
              h: Mt.height,
              active: A === In
            });
          st = bt + I.length;
        }
        H = W.nextNode();
      }
    }
    D((A) => A.length === T.length && A.every((R, F) => {
      const W = T[F];
      return R.x === W.x && R.y === W.y && R.w === W.w && R.h === W.h && R.active === W.active;
    }) ? A : T);
  }, [C, p, c, In, y]), /* @__PURE__ */ h(ar.Provider, { value: lt, children: /* @__PURE__ */ S(
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
        background: Sr(K).canvasBg
      },
      onPointerDown: bl,
      onPointerMove: zl,
      onDoubleClick: ml,
      onContextMenu: gl,
      onDragOver: Tl,
      onDrop: Pl,
      children: [
        /* @__PURE__ */ h(Ph, { viewport: c, gridSize: J, background: K, gridVisible: E }),
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              transform: Al,
              transformOrigin: "0 0",
              pointerEvents: "none"
            },
            children: [
              yl.sort((w, P) => w.z - P.z).map((w) => {
                var A;
                const P = kn.has(w.id), I = pl.has(w.id), T = -(w.id.split("").reduce((R, F) => R + F.charCodeAt(0), 0) % 240 / 100);
                let B;
                if (o) {
                  const R = o.get(w.type);
                  if (R) {
                    const F = R.component, W = f.has(w.id) && x !== "edge", H = x === "select" || x === "text" || x === "note" || x === "sticky", Y = /* @__PURE__ */ h(
                      F,
                      {
                        node: w,
                        data: w.data,
                        isSelected: W,
                        multiSelected: f.size > 1 && W && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: H,
                        zoom: c.zoom,
                        editing: js === w.id,
                        cropping: Ve === w.id,
                        editClickPos: js === w.id ? xn.current : null,
                        callbacks: {
                          onMeasuredHeight: te,
                          onResizeHandleDown: Mn,
                          onEditStart: (O) => {
                            const _ = t.getNode(O);
                            _ && (_.type === "text" ? wo(O) : _.type === "sticky" ? ko(O) : _.type === "frame" ? Yo(O) : _.type === "shape" ? jo(O) : _.type === "image" ? Vo(O) : _.type === "youtube" && Ys(O));
                          },
                          onEditEnd: () => {
                            w.type === "text" ? wo((O) => {
                              if (O !== w.id) return O;
                              const _ = zr.current;
                              return _ && _.id === O && performance.now() < _.until ? O : null;
                            }) : w.type === "sticky" ? ko((O) => O === w.id ? null : O) : w.type === "frame" ? Yo((O) => O === w.id ? null : O) : w.type === "shape" ? jo((O) => O === w.id ? null : O) : w.type === "image" ? Vo((O) => O === w.id ? null : O) : w.type === "youtube" && Ys((O) => O === w.id ? null : O);
                          }
                        },
                        portValues: r && ((A = R.ports) != null && A.length) && Qs >= 0 ? r.getAllPortValues(w.id) : void 0,
                        updateData: (O) => {
                          const _ = lt();
                          t.updateNodeWithHistoryCoalesced(
                            w.id,
                            {
                              data: { ...w.data, ...O }
                            },
                            `${_}:registry:${w.id}`
                          );
                        }
                      },
                      R.handlesOwnLayout ? w.id : void 0
                    );
                    R.handlesOwnLayout ? B = Y : B = /* @__PURE__ */ h(
                      Bu,
                      {
                        node: w,
                        isInteractive: H,
                        measuredH: ct[w.id],
                        onMeasuredHeight: te,
                        observeElement: we,
                        unobserveElement: be,
                        isContainer: R.isContainer,
                        children: Y
                      },
                      w.id
                    );
                  }
                } else if (w.type === "content") {
                  const R = w;
                  B = /* @__PURE__ */ h(
                    pa,
                    {
                      node: R,
                      isSelected: f.has(w.id) && x !== "edge",
                      multiSelected: f.size > 1 && f.has(w.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: x === "select" || x === "text" || x === "note",
                      zoom: c.zoom,
                      onMeasuredHeight: te,
                      autoEdit: Vs.current === R.id
                    },
                    w.id
                  );
                } else if (w.type === "text")
                  B = /* @__PURE__ */ h(
                    Ia,
                    {
                      node: w,
                      engine: t,
                      editing: Go === w.id,
                      editClickPos: Go === w.id ? xn.current : null,
                      onStopEdit: () => {
                        if (wn.current === w.id) {
                          wn.current = null;
                          const R = t.getNode(w.id);
                          if (!R || !R.data.text.trim()) {
                            t.deleteNode(w.id), wo((F) => F === w.id ? null : F);
                            return;
                          }
                        }
                        wo((R) => R === w.id ? null : R);
                      },
                      onMeasuredHeight: te
                    },
                    w.id
                  );
                else if (w.type === "image")
                  B = /* @__PURE__ */ h(
                    Ca,
                    {
                      node: w,
                      isSelected: f.has(w.id) && x !== "edge",
                      engine: t,
                      interactive: x === "select",
                      zoom: c.zoom,
                      onResizeHandleDown: Mn,
                      cropping: Ve === w.id,
                      onCropStart: () => Vo(w.id),
                      onCropEnd: () => Vo(null)
                    },
                    w.id
                  );
                else if (w.type === "sticky")
                  B = /* @__PURE__ */ h(
                    za,
                    {
                      node: w,
                      isSelected: f.has(w.id) && x !== "edge",
                      engine: t,
                      interactive: x === "select" || x === "sticky",
                      zoom: c.zoom,
                      editing: Gs === w.id,
                      onEditStart: ko,
                      onEditEnd: () => ko(null)
                    },
                    w.id
                  );
                else if (w.type === "frame") {
                  const R = w, F = R.h === "auto" ? 100 : R.h;
                  B = /* @__PURE__ */ h(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: R.x,
                        top: R.y,
                        width: R.w,
                        height: F,
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
                      children: Xs === w.id ? /* @__PURE__ */ h(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: R.data.label ?? "",
                          placeholder: n.frameLabelPlaceholder,
                          onBlur: (W) => {
                            const H = W.currentTarget.value.trim();
                            t.updateNodeWithHistory(w.id, {
                              data: { ...R.data, label: H || void 0 }
                            }), Yo(null);
                          },
                          onKeyDown: (W) => {
                            (W.key === "Enter" || W.key === "Escape") && W.currentTarget.blur(), W.stopPropagation();
                          },
                          onPointerDown: (W) => W.stopPropagation(),
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
                          onDoubleClick: (W) => {
                            W.stopPropagation(), t.select(w.id), Yo(w.id);
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
                  R.type === "draw" ? B = /* @__PURE__ */ h(en, { node: R }, w.id) : B = /* @__PURE__ */ h(en, { node: R, editingLabel: dr === w.id }, w.id);
                }
                return P || I ? /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      opacity: P ? 0.25 : void 0,
                      filter: P ? "saturate(0)" : void 0,
                      animation: I ? "sb-node-bop 3.4s ease-in-out infinite" : void 0,
                      animationDelay: I ? `${T}s` : void 0,
                      transformOrigin: "center center",
                      willChange: I ? "transform" : void 0
                    },
                    children: B
                  },
                  w.id
                ) : B;
              }),
              $s.size > 0 && Array.from($s).map((w) => {
                const P = t.getNode(w);
                if (!P || P.type === "edge") return null;
                const I = P.h === "auto" ? ct[P.id] ?? 100 : P.h, N = In === w;
                return /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: P.x - 5,
                      top: P.y - 5,
                      width: P.w + 10,
                      height: I + 10,
                      borderRadius: 10,
                      border: `2px solid ${N ? "#f59e0b" : "#60a5fa"}`,
                      boxShadow: N ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
                      pointerEvents: "none",
                      transform: P.rotation ? `rotate(${P.rotation}deg)` : void 0,
                      transformOrigin: "center center"
                    }
                  },
                  `search-highlight-${w}`
                );
              }),
              dr && (() => {
                const w = t.getNode(dr);
                if (!w || w.type !== "shape") return null;
                const P = w.data;
                return P.shape === "line" || P.shape === "arrow" ? null : /* @__PURE__ */ h(
                  Nu,
                  {
                    node: w,
                    engine: t,
                    onDone: () => jo(null)
                  },
                  dr
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ h(
          lu,
          {
            nodes: at,
            viewport: c,
            selection: f,
            measuredHeights: ct,
            activeStroke: it,
            shapePreview: ut,
            shapePreviewStyle: ut ? {
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
            onResizeHandleDown: Mn,
            onRotateStart: xl,
            onConnectionHandleDown: Zs,
            onEdgeEndpointDown: Ml,
            onKinkHandleDown: Sl,
            edgePreview: Ct,
            edgeReconnect: Ft,
            eraserMarkedIds: kn.size > 0 ? kn : void 0,
            eraserTrail: Ks.length > 1 ? Ks : void 0,
            laserTrail: qs.length > 1 ? qs : void 0,
            mode: x,
            freeFormEdges: t.freeFormEdges,
            hoveredNodeId: dl,
            cursorCanvasPos: hl,
            registry: o,
            onPortHandleDown: kl,
            cycleNodeIds: r && Qs >= 0 ? r.cycleNodeIds : void 0,
            containerTypes: t.containerTypes,
            alignGuides: Z,
            suppressNodeOverlayId: Ve
          }
        ),
        ae && !Ve && x !== "edge" && !Ct && !Ft && (() => {
          const w = t.selectionGroupId(), P = w ? t.groupRotations.get(w) : void 0;
          let I, N, T, B;
          if (bo)
            I = bo.bounds, N = bo.angle, T = bo.cx, B = bo.cy;
          else if (P && P.angle !== 0) {
            const H = -P.angle * Math.PI / 180, Y = Math.cos(H), O = Math.sin(H);
            let _ = 1 / 0, st = 1 / 0, bt = -1 / 0, At = -1 / 0;
            for (const Et of t.selection) {
              const Mt = t.getNode(Et);
              if (!Mt || Mt.type === "edge") continue;
              const Tt = Mt.h === "auto" ? ct[Mt.id] ?? 100 : Mt.h, Zt = Mt.x + Mt.w / 2, Yt = Mt.y + Tt / 2, wt = Zt - P.cx, zt = Yt - P.cy, pt = P.cx + wt * Y - zt * O, It = P.cy + wt * O + zt * Y;
              _ = Math.min(_, pt - Mt.w / 2), st = Math.min(st, It - Tt / 2), bt = Math.max(bt, pt + Mt.w / 2), At = Math.max(At, It + Tt / 2);
            }
            I = {
              x: _ - he,
              y: st - he,
              w: bt - _ + he * 2,
              h: At - st + he * 2
            }, N = P.angle, T = P.cx, B = P.cy;
          } else
            I = ae, N = 0, T = 0, B = 0;
          const A = 8 / c.zoom, R = A / 2, F = [
            { pos: "nw", cx: I.x, cy: I.y },
            { pos: "n", cx: I.x + I.w / 2, cy: I.y },
            { pos: "ne", cx: I.x + I.w, cy: I.y },
            { pos: "e", cx: I.x + I.w, cy: I.y + I.h / 2 },
            { pos: "se", cx: I.x + I.w, cy: I.y + I.h },
            { pos: "s", cx: I.x + I.w / 2, cy: I.y + I.h },
            { pos: "sw", cx: I.x, cy: I.y + I.h },
            { pos: "w", cx: I.x, cy: I.y + I.h / 2 }
          ], W = N !== 0 ? ` rotate(${N}, ${T}, ${B})` : "";
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ S("g", { transform: W, children: [
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
                N === 0 && F.map(({ pos: H, cx: Y, cy: O }) => /* @__PURE__ */ h(
                  "rect",
                  {
                    x: Y - R,
                    y: O - R,
                    width: A,
                    height: A,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / c.zoom,
                    style: { cursor: ln(H, N), pointerEvents: "auto" },
                    onPointerDown: (_) => {
                      _.stopPropagation(), Il(H, _);
                    }
                  },
                  H
                )),
                (() => {
                  const H = 25 / c.zoom, Y = I.x + I.w / 2, O = I.y;
                  return /* @__PURE__ */ S(kt, { children: [
                    /* @__PURE__ */ h(
                      "line",
                      {
                        x1: Y,
                        y1: O,
                        x2: Y,
                        y2: O - H,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / c.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const _ = 8 / c.zoom, st = _ / 2;
                      return /* @__PURE__ */ h(
                        "rect",
                        {
                          x: Y - st,
                          y: O - H - st,
                          width: _,
                          height: _,
                          rx: 1.5 / c.zoom,
                          transform: `rotate(45, ${Y}, ${O - H})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / c.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (bt) => Cl(bt)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const H = 26 / c.zoom, Y = 42 / c.zoom, O = 4 / c.zoom;
                  return [
                    { side: "top", cx: I.x + I.w / 2, cy: I.y - Y },
                    { side: "right", cx: I.x + I.w + H, cy: I.y + I.h / 2 },
                    { side: "bottom", cx: I.x + I.w / 2, cy: I.y + I.h + H },
                    { side: "left", cx: I.x - H, cy: I.y + I.h / 2 }
                  ].map(({ side: st, cx: bt, cy: At }) => /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: bt,
                      cy: At,
                      r: O,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / c.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (Et) => {
                        Et.stopPropagation();
                        const Mt = wl(st);
                        Mt && Zs(Mt, st, Et);
                      }
                    },
                    `conn-${st}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Te && /* @__PURE__ */ h(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ h("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ h(
              "rect",
              {
                x: Te.x,
                y: Te.y,
                width: Te.w,
                height: Te.h,
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
        de && (() => {
          const w = t.canvasToScreen(de.startX, de.startY), P = t.canvasToScreen(de.endX, de.endY), I = Math.min(w.x, P.x), N = Math.min(w.y, P.y), T = Math.abs(P.x - w.x), B = Math.abs(P.y - w.y);
          return T < 2 && B < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "rect",
                {
                  x: I,
                  y: N,
                  width: T,
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
        go && go.length > 2 && (() => {
          const P = go.map(([I, N]) => t.canvasToScreen(I, N)).map((I) => `${I.x},${I.y}`).join(" ");
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
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
        Ye && (() => {
          const w = Math.min(Ye.startX, Ye.endX), P = Math.min(Ye.startY, Ye.endY), I = Math.abs(Ye.endX - Ye.startX), N = Math.abs(Ye.endY - Ye.startY);
          return I < 2 && N < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${c.x}, ${c.y}) scale(${c.zoom})`, children: /* @__PURE__ */ h(
                "rect",
                {
                  x: w,
                  y: P,
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
        L.length > 0 && /* @__PURE__ */ h(
          "div",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: L.map((w, P) => /* @__PURE__ */ h(
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
        Ge && /* @__PURE__ */ h(
          cu,
          {
            x: Ge.x,
            y: Ge.y,
            sections: Ge.sections,
            onClose: () => Xo(null)
          }
        ),
        Tr && /* @__PURE__ */ h(
          ru,
          {
            nodes: Tr.nodes,
            onSave: (w) => {
              Vh(w, Tr.nodes, Tr.groupParent), Sn(null);
            },
            onCancel: () => Sn(null)
          }
        )
      ]
    }
  ) });
}
const Ke = 52, er = 300, Xf = Ke + er, Ou = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], Ws = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Xu = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], rn = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], sl = [1, 2, 3, 5, 8, 12], Fs = [1, 2, 3, 4, 6, 8], il = [1, 2, 3, 4, 6], Gu = Fs, al = [14, 20, 28, 36], Bs = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Yu = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Ee = [
  { name: "Standard", colors: Ou },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], Ns = Ee, ju = [
  { name: "Standard", colors: Yu },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Ht = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Nt = {
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
}, Vu = "https://libraries.excalidraw.com/libraries.json", ys = "https://libraries.excalidraw.com/libraries";
function Ku({
  onClose: t,
  onInstalled: e
}) {
  const o = Qt(), { labels: r } = Ut(), [n, s] = ot([]), [i, a] = ot(!0), [l, c] = ot(null), [u, p] = ot(""), [d, f] = ot(null), [m, y] = ot(/* @__PURE__ */ new Set()), b = dt(() => {
    const k = La(), M = new Set(k.map((C) => C.source));
    y(M);
  }, []);
  vt(() => {
    let k = !1;
    return (async () => {
      try {
        const M = await fetch(Vu);
        if (!M.ok) throw new Error(`HTTP ${M.status}`);
        const C = await M.json();
        k || (s(C), a(!1));
      } catch (M) {
        k || (c(String(M)), a(!1));
      }
    })(), b(), () => {
      k = !0;
    };
  }, [b]);
  const x = Vt(() => {
    if (!u.trim()) return n;
    const k = u.toLowerCase();
    return n.filter(
      (M) => {
        var C, z;
        return M.name.toLowerCase().includes(k) || ((C = M.description) == null ? void 0 : C.toLowerCase().includes(k)) || ((z = M.itemNames) == null ? void 0 : z.some((L) => L.toLowerCase().includes(k)));
      }
    );
  }, [n, u]), g = dt(
    async (k) => {
      f(k.id);
      try {
        const M = `${ys}/${k.source}`;
        await Rh(M, k.name), b(), e();
      } catch (M) {
        console.error("Failed to install library:", M);
      } finally {
        f(null);
      }
    },
    [e, b]
  );
  return Qe(
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
        onPointerDown: (k) => {
          k.target === k.currentTarget && t();
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
            onPointerDown: (k) => k.stopPropagation(),
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
                        value: u,
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
                        children: r.libraryDirectoryLoading
                      }
                    ),
                    l && /* @__PURE__ */ S(
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
                    x.map((k, M) => {
                      const C = m.has(
                        `${ys}/${k.source}`
                      ), z = d === k.id;
                      return /* @__PURE__ */ h(
                        qu,
                        {
                          entry: k,
                          isInstalled: C,
                          isInstalling: z,
                          onInstall: () => g(k),
                          theme: o
                        },
                        k.id || `dir-${M}`
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
function qu({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: r,
  theme: n
}) {
  var a;
  const { labels: s } = Ut(), i = t.preview ? `${ys}/${t.preview}` : null;
  return /* @__PURE__ */ S(
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
        /* @__PURE__ */ S("div", { style: { flex: 1, minWidth: 0 }, children: [
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
          ((a = t.authors) == null ? void 0 : a.length) > 0 && /* @__PURE__ */ S(
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
const Uu = /^[A-Za-z][A-Za-z0-9_:-]*$/, Oi = /^[A-Za-z][A-Za-z0-9_]*$/;
function Zu(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function We(t) {
  return Zu(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function Vn(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function To(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: We(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: We(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: We(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: We(o[2]), shape: "rect" } : Uu.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function Qu(t) {
  let e = t.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (e) {
    const o = To(e[1]), r = To(e[3]);
    return !o || !r ? null : { from: o, to: r, label: We(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/), e) {
    const o = To(e[1]), r = To(e[3]);
    return !o || !r ? null : { from: o, to: r, label: We(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/), e) {
    const o = To(e[1]), r = To(e[2]);
    return !o || !r ? null : { from: o, to: r };
  }
  return null;
}
function Ju(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function $u(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return r ? { label: We(r[1]) } : { label: We(o) };
}
function _u(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, r = t.replace(/\r\n/g, `
`).split(`
`).map((l) => l.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (r.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const n = r[0];
  /^(flowchart|graph)\b/i.test(n) && (o.direction = Ju(n), r.shift());
  const i = [], a = (l) => {
    for (const c of i) c.nodeKeys.add(l);
  };
  for (const l of r) {
    const c = l.split(";").map((u) => u.trim()).filter(Boolean);
    for (const u of c) {
      const p = $u(u);
      if (p) {
        i.push({ label: p.label, nodeKeys: /* @__PURE__ */ new Set() });
        continue;
      }
      if (/^end\b/i.test(u)) {
        const m = i.pop();
        m && o.groups.push({
          label: m.label,
          nodeKeys: Array.from(m.nodeKeys)
        });
        continue;
      }
      const d = Qu(u);
      if (d) {
        const m = Vn(o, d.from), y = Vn(o, d.to);
        a(m.key), a(y.key), o.edges.push({ fromKey: m.key, toKey: y.key, label: d.label });
        continue;
      }
      const f = To(u);
      if (f) {
        const m = Vn(o, f);
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
function tp(t) {
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
    if (!(!Oi.test(a) || !Oi.test(l)))
      return {
        from: a,
        arrow: s,
        to: l,
        label: We(r)
      };
  }
  return null;
}
function ep(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: We(e[3])
  } : null;
}
function op(t) {
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
function rp(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.indexOf(" "), n = r >= 0 ? o.slice(0, r) : o, s = r >= 0 ? o.slice(r + 1).trim() : "";
  return op(n) ? { color: n, label: s || void 0 } : { label: o };
}
function np(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`).map((d) => d.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (e.length === 0)
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  if (!/^sequenceDiagram\b/i.test(e[0]))
    throw new Error("Not a Mermaid sequence diagram.");
  const o = /* @__PURE__ */ new Set(), r = [], n = [], s = [], i = [], a = [], l = [];
  let c = 0;
  const u = (d) => {
    o.has(d) || (o.add(d), r.push(d));
    for (const f of l) f.participants.add(d);
  };
  for (let d = 1; d < e.length; d++) {
    const f = e[d];
    if (/^autonumber\b/i.test(f)) continue;
    const m = rp(f);
    if (m) {
      l.push({ type: "box", label: m.label, color: m.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const y = f.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (y) {
      l.push({
        type: "loop",
        label: y[1] ? We(y[1]) : void 0,
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
    const b = f.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (b) {
      u(b[1]);
      continue;
    }
    const x = ep(f);
    if (x) {
      u(x.of), s.push({ step: c, note: x });
      continue;
    }
    const g = tp(f);
    if (g) {
      u(g.from), u(g.to), n.push(g), c += 1;
      continue;
    }
  }
  for (; l.length > 0; ) {
    const d = l.pop();
    d.type === "box" ? a.push(d) : i.push({
      label: d.label,
      startStep: d.startStep,
      endStep: c,
      participants: d.participants
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
function Yr(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function sp(t) {
  const e = Array.from(t.nodes.keys()).sort(), o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const c of e)
    o.set(c, 0), r.set(c, []);
  for (const c of t.edges)
    !o.has(c.fromKey) || !o.has(c.toKey) || (r.get(c.fromKey).push(c.toKey), o.set(c.toKey, (o.get(c.toKey) ?? 0) + 1));
  const n = e.filter((c) => (o.get(c) ?? 0) === 0), s = /* @__PURE__ */ new Map();
  for (const c of n) s.set(c, 0);
  const i = [...n];
  for (; i.length > 0; ) {
    const c = i.shift(), u = s.get(c) ?? 0;
    for (const p of r.get(c) ?? []) {
      const d = Math.max(s.get(p) ?? 0, u + 1);
      s.set(p, d), o.set(p, (o.get(p) ?? 0) - 1), (o.get(p) ?? 0) <= 0 && i.push(p);
    }
  }
  let a = 0;
  for (const c of s.values()) a = Math.max(a, c);
  for (const c of e)
    s.has(c) || (a += 1, s.set(c, a));
  const l = /* @__PURE__ */ new Map();
  for (const c of e) {
    const u = s.get(c) ?? 0;
    l.has(u) || l.set(u, []), l.get(u).push(c);
  }
  return Array.from(l.entries()).sort((c, u) => c[0] - u[0]).map(([, c]) => c.sort());
}
function ip(t, e, o, r) {
  const n = np(t), s = [], i = [], a = 6, l = "#94a3b8", c = 3, u = "#475569", p = 180, d = 64, f = 270, m = o - 140, y = m + d + 8, b = 88, x = Math.max(1, n.messages.length), g = y + x * b + 40, k = g + 12, M = k + d, C = /* @__PURE__ */ new Map();
  for (const z of n.groups) {
    const L = z.participants.map((mt) => C.get(mt)).filter((mt) => typeof mt == "number");
    if (L.length === 0)
      for (const mt of z.participants) {
        const ft = n.participants.indexOf(mt);
        ft >= 0 && L.push(e + (ft - (n.participants.length - 1) / 2) * f);
      }
    if (L.length === 0) continue;
    const D = Math.min(...L) - p / 2 - 24, E = Math.max(...L) + p / 2 + 24, V = m - 22, J = M - V + 18, nt = {
      id: Pt(10),
      type: "shape",
      x: D,
      y: V,
      w: E - D,
      h: J,
      z: r(),
      data: {
        shape: "rect",
        stroke: z.color ? z.color : "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: z.color ? z.color : "#334155",
        fillStyle: "solid",
        opacity: z.color ? 0.2 : 0.08,
        edgeStyle: "sharp"
      }
    };
    if (s.push(nt), i.push(nt.id), z.label) {
      const mt = {
        id: Pt(10),
        type: "text",
        x: D + 10,
        y: V + 8,
        w: Math.max(120, E - D - 20),
        h: "auto",
        z: r(),
        data: {
          text: z.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      s.push(mt);
    }
  }
  for (let z = 0; z < n.participants.length; z++) {
    const L = n.participants[z], D = e + (z - (n.participants.length - 1) / 2) * f;
    C.set(L, D);
    const E = {
      id: Pt(10),
      type: "shape",
      x: D - p / 2,
      y: m,
      w: p,
      h: d,
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
        label: L,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(E), i.push(E.id);
    const V = {
      id: Pt(10),
      type: "shape",
      x: D - a / 2,
      y,
      w: a,
      h: g - y,
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
    s.push(V);
    const J = {
      id: Pt(10),
      type: "shape",
      x: D - p / 2,
      y: k,
      w: p,
      h: d,
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
        label: L,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(J), i.push(J.id);
  }
  for (const z of n.loops) {
    const L = z.participants.map((K) => C.get(K)).filter((K) => typeof K == "number");
    if (L.length === 0) continue;
    const D = Math.min(...L) - 130, E = Math.max(...L) + 130, V = z.startStep + 1, J = Math.max(V, z.endStep), nt = y + (V - 1) * b + 16, mt = y + J * b + 34, ft = {
      id: Pt(10),
      type: "shape",
      x: D,
      y: nt,
      w: E - D,
      h: Math.max(90, mt - nt),
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
    s.push(ft);
    const Z = `loop${z.label ? ` [${z.label}]` : ""}`, G = {
      id: Pt(10),
      type: "text",
      x: D + 10,
      y: nt + 8,
      w: E - D - 20,
      h: "auto",
      z: r(),
      data: {
        text: Z,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#1f2937",
        align: "left"
      }
    };
    s.push(G);
  }
  for (let z = 0; z < n.messages.length; z++) {
    const L = n.messages[z], D = y + (z + 1) * b, E = C.get(L.from), V = C.get(L.to);
    if (E == null || V == null) continue;
    const J = E === V, nt = Math.min(E, V), mt = Math.max(E, V), ft = Math.max(mt - nt, 40), Z = E <= V ? 0 : ft, G = E <= V ? ft : 0, K = L.arrow.includes("--") || L.arrow === "-.->", $ = L.arrow.toLowerCase().includes("x"), Q = L.arrow.includes(">") || L.arrow.includes(")");
    if (J) {
      const X = E + 6, et = D - 16, rt = 92, j = 48, tt = K ? "dashed" : "solid", yt = {
        id: Pt(10),
        type: "shape",
        x: X,
        y: et,
        w: rt,
        h: c,
        z: r(),
        data: {
          shape: "rect",
          stroke: u,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: u,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, it = {
        id: Pt(10),
        type: "shape",
        x: X + rt - c,
        y: et,
        w: c,
        h: j,
        z: r(),
        data: {
          shape: "rect",
          stroke: u,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: u,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, gt = {
        id: Pt(10),
        type: "shape",
        x: X,
        y: et + j - c,
        w: rt,
        h: c,
        z: r(),
        data: {
          shape: Q ? "arrow" : "line",
          stroke: u,
          strokeWidth: c,
          strokeStyle: tt,
          roughness: 0,
          startPoint: [rt, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(yt, it, gt);
    } else {
      const X = {
        id: Pt(10),
        type: "shape",
        x: nt,
        y: D - 14,
        w: ft,
        h: 28,
        z: r(),
        data: {
          shape: Q ? "arrow" : "line",
          stroke: u,
          strokeWidth: c,
          strokeStyle: K ? "dashed" : "solid",
          roughness: 0,
          startPoint: [Z, 14],
          endPoint: [G, 14]
        }
      };
      s.push(X);
    }
    const lt = J ? E + 18 : nt, U = J ? 170 : ft, q = {
      id: Pt(10),
      type: "text",
      x: lt,
      y: D - 46,
      w: U,
      h: "auto",
      z: r(),
      data: {
        text: L.label,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "center"
      }
    };
    if (s.push(q), $) {
      const X = E <= V ? nt + ft - 14 : nt + 8, et = {
        id: Pt(10),
        type: "text",
        x: X,
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
      s.push(et);
    }
  }
  for (const z of n.notes) {
    const L = y + (z.step + 1) * b, D = C.get(z.note.of);
    if (D == null) continue;
    let E = D;
    z.note.side === "right" && (E += 130), z.note.side === "left" && (E -= 300), z.note.side === "over" && (E -= 110);
    const V = {
      id: Pt(10),
      type: "text",
      x: E,
      y: L - 8,
      w: 260,
      h: "auto",
      z: r(),
      data: {
        text: z.note.text,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "left"
      }
    };
    s.push(V);
  }
  return { nodes: s, shapeNodeIds: i };
}
function ap(t, e, o, r) {
  const n = t.trimStart();
  if (/^sequenceDiagram\b/i.test(n))
    return ip(t, e, o, r);
  const s = _u(t), i = sp(s), a = Array.from(s.nodes.values()).map((b) => Yr(b.shape)), l = a.length > 0 ? Math.max(...a.map((b) => b.h)) : 96, c = Math.max(l + 130, 260), u = /* @__PURE__ */ new Map(), p = i.length;
  for (let b = 0; b < i.length; b++) {
    const x = i[b], g = x.length, k = (b - (p - 1) / 2) * c, M = x.length > 0 ? Math.max(
      ...x.map((z) => {
        const L = s.nodes.get(z);
        return L ? Yr(L.shape).w : 200;
      })
    ) : 200, C = Math.max(M + 90, 260);
    for (let z = 0; z < x.length; z++) {
      const L = x[z], D = (z - (g - 1) / 2) * C;
      if (s.direction === "LR" || s.direction === "RL") {
        const E = s.direction === "LR" ? e + k : e - k, V = o + D;
        u.set(L, { x: E, y: V });
      } else {
        const E = e + D, V = s.direction === "TB" ? o + k : o - k;
        u.set(L, { x: E, y: V });
      }
    }
  }
  const d = /* @__PURE__ */ new Map(), f = [], m = [], y = /* @__PURE__ */ new Map();
  for (const b of s.groups) {
    if (!b.nodeKeys.length) continue;
    const x = b.nodeKeys.map((L) => {
      const D = s.nodes.get(L), E = u.get(L);
      if (!D || !E) return null;
      const V = Yr(D.shape);
      return { x: E.x - V.w / 2, y: E.y - V.h / 2, w: V.w, h: V.h };
    }).filter((L) => !!L);
    if (!x.length) continue;
    const g = Math.min(...x.map((L) => L.x)) - 30, k = Math.max(...x.map((L) => L.x + L.w)) + 30, M = Math.min(...x.map((L) => L.y)) - 34, C = Math.max(...x.map((L) => L.y + L.h)) + 24, z = {
      id: Pt(10),
      type: "shape",
      x: g,
      y: M,
      w: k - g,
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
    if (f.push(z), m.push(z.id), b.label) {
      const L = {
        id: Pt(10),
        type: "text",
        x: g + 10,
        y: M + 8,
        w: Math.max(120, k - g - 20),
        h: "auto",
        z: r(),
        data: {
          text: b.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      f.push(L);
    }
  }
  for (const [b, x] of s.nodes) {
    const g = u.get(b) ?? { x: e, y: o }, k = Yr(x.shape), M = {
      id: Pt(10),
      type: "shape",
      x: g.x - k.w / 2,
      y: g.y - k.h / 2,
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
    f.push(M), m.push(M.id), d.set(b, M.id), y.set(b, { x: M.x, y: M.y, w: k.w, h: k.h });
  }
  for (const b of s.edges) {
    const x = d.get(b.fromKey), g = d.get(b.toKey);
    if (!x || !g || x === g) continue;
    const k = {
      id: Pt(10),
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: r(),
      data: {
        fromId: x,
        toId: g,
        label: b.label,
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
const Xi = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function lp({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r
}) {
  const n = Qt(), { labels: s } = Ut(), i = ht(null), [a, l] = ot(Xi), [c, u] = ot(null), [p, d] = ot(null);
  vt(() => {
    if (!e) return;
    const y = (b) => {
      i.current && !i.current.contains(b.target) && o();
    };
    return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
  }, [e, o]);
  const f = Vt(
    () => s.mermaidSupportedHint,
    [s.mermaidSupportedHint]
  ), m = dt(() => {
    try {
      const y = window.innerWidth / 2, b = window.innerHeight / 2, x = t.screenToCanvas(y, b), { nodes: g, shapeNodeIds: k } = ap(a, x.x, x.y, () => t.nextZ());
      if (g.length === 0)
        throw new Error(s.mermaidNoNodesParsed);
      t.addNodes(g), k.length > 0 && t.selectMultiple(k), u(null), d(
        s.mermaidInsertedSummary.replace("{nodes}", String(k.length)).replace("{edges}", String(g.length - k.length))
      );
    } catch (y) {
      d(null), u(y instanceof Error ? y.message : s.mermaidParseFailed);
    }
  }, [t, s.mermaidInsertedSummary, s.mermaidNoNodesParsed, s.mermaidParseFailed, a]);
  return !e || !r ? null : Qe(
    /* @__PURE__ */ S(
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
          /* @__PURE__ */ S("div", { style: { padding: "10px 12px 8px", borderBottom: `1px solid ${n.border}` }, children: [
            /* @__PURE__ */ h("div", { style: { fontSize: 12, fontWeight: 700, color: n.text }, children: s.mermaidSketchTitle }),
            /* @__PURE__ */ h("div", { style: { marginTop: 4, fontSize: 10, color: n.textMuted, lineHeight: 1.45 }, children: f })
          ] }),
          /* @__PURE__ */ S("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
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
            /* @__PURE__ */ S("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => l(Xi),
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
const cp = [
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
], Do = {
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
function Wo({ name: t, size: e = 18, textGlyph: o = "T" }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...jt }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ...jt })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...jt }),
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
    t === "note" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ...jt }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...jt }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...jt, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...jt, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...jt, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...jt }),
      /* @__PURE__ */ h("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...jt }),
      /* @__PURE__ */ h("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...jt }),
      /* @__PURE__ */ h("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...jt })
    ] }),
    t === "edge" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("circle", { cx: "5", cy: "5", r: "2.5", ...jt, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ h("circle", { cx: "19", cy: "19", r: "2.5", ...jt, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "7", x2: "17", y2: "17", ...jt }),
      /* @__PURE__ */ h("polyline", { points: "14,17 17,17 17,14", ...jt, fill: "none" })
    ] }),
    t === "erase" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...jt }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ...jt })
    ] }),
    t === "laser" && /* @__PURE__ */ h("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ h("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...jt, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...jt, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...jt, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...jt, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...jt, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ...jt }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...jt }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...jt })
    ] }),
    t === "fit" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...jt }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...jt })
    ] }),
    t === "paper" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...jt }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...jt, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...jt, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...jt, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...jt }),
      /* @__PURE__ */ h("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...jt }),
      /* @__PURE__ */ h("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...jt }),
      /* @__PURE__ */ h("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...jt })
    ] }),
    t === "library" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...jt }),
      /* @__PURE__ */ h("path", { d: "M8 7h6", ...jt, opacity: 0.5 }),
      /* @__PURE__ */ h("path", { d: "M8 11h4", ...jt, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...jt }),
      /* @__PURE__ */ h("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ...jt }),
      /* @__PURE__ */ h("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ...jt }),
      /* @__PURE__ */ h("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
function dp({
  engine: t,
  background: e
}) {
  const o = Qt(), { labels: r } = Ut(), [n, s] = ot(!1), i = {
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
  vt(() => {
    if (!n) return;
    const d = (f) => {
      c.current && !c.current.contains(f.target) && l.current && !l.current.contains(f.target) && s(!1);
    };
    return document.addEventListener("pointerdown", d), () => document.removeEventListener("pointerdown", d);
  }, [n]);
  const u = nr.find((d) => d.key === e) ?? nr[1], p = n && l.current ? (() => {
    const d = l.current.getBoundingClientRect();
    return Qe(
      /* @__PURE__ */ h(
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
            const m = nr.filter((y) => y.group === f);
            return m.length === 0 ? null : /* @__PURE__ */ S("div", { style: { marginBottom: 6 }, children: [
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
              m.map((y) => /* @__PURE__ */ S(
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
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ S(
      "button",
      {
        ref: l,
        title: r.paperType,
        onClick: () => s((d) => !d),
        style: {
          ...Do,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ h(Wo, { name: "paper" }),
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
                background: u.swatchColor,
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
function hp({ engine: t }) {
  const e = Qt(), { labels: o } = Ut(), [r, n] = ot(!1), s = ht(null), i = ht(null);
  vt(() => {
    if (!r) return;
    const l = (c) => {
      i.current && !i.current.contains(c.target) && s.current && !s.current.contains(c.target) && n(!1);
    };
    return document.addEventListener("pointerdown", l), () => document.removeEventListener("pointerdown", l);
  }, [r]);
  const a = r && s.current ? (() => {
    const l = s.current.getBoundingClientRect();
    return Qe(
      /* @__PURE__ */ S(
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
            oa.map((c) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => {
                  const u = typeof window < "u" ? window : void 0;
                  if (!u) return;
                  const p = u.innerWidth / 2, d = u.innerHeight / 2, f = rr(t.viewport, p, d);
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
                onMouseEnter: (u) => {
                  u.currentTarget.style.background = e.controlBgActive;
                },
                onMouseLeave: (u) => {
                  u.currentTarget.style.background = "transparent";
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
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: s,
        title: o.templatesTitle,
        onClick: () => n((l) => !l),
        style: {
          ...Do,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Wo, { name: "template" })
      }
    ),
    a
  ] });
}
function up({ engine: t }) {
  const e = Qt(), { labels: o } = Ut(), [r, n] = ot(!1), [s, i] = ot(!1), a = ht(null), [l, c] = ot(null), u = dt(() => {
    n((f) => (!f && a.current && c(a.current.getBoundingClientRect()), !f));
  }, []), p = dt(() => n(!1), []), d = dt(() => {
    i(!0);
  }, []);
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: a,
        title: o.librariesTitle,
        onClick: u,
        style: {
          ...Do,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Wo, { name: "library" })
      }
    ),
    /* @__PURE__ */ h(
      Jh,
      {
        engine: t,
        open: r,
        onClose: p,
        triggerRect: l,
        onBrowseDirectory: d
      }
    ),
    s && /* @__PURE__ */ h(
      Ku,
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
function pp({ engine: t, baseUrl: e }) {
  const o = Qt(), { labels: r } = Ut(), [n, s] = ot(!1), i = ht(null), [a, l] = ot(null), c = dt(() => {
    s((p) => (!p && i.current && l(i.current.getBoundingClientRect()), !p));
  }, []), u = dt(() => s(!1), []);
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: i,
        title: r.gifSearchTitle,
        onClick: c,
        style: {
          ...Do,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ h(Wo, { name: "gif" })
      }
    ),
    /* @__PURE__ */ h(
      eu,
      {
        engine: t,
        open: n,
        onClose: u,
        triggerRect: a,
        baseUrl: e
      }
    )
  ] });
}
function fp({ engine: t }) {
  const e = Qt(), { labels: o } = Ut(), [r, n] = ot(!1), s = ht(null), [i, a] = ot(null), l = dt(() => {
    n((u) => (!u && s.current && a(s.current.getBoundingClientRect()), !u));
  }, []), c = dt(() => n(!1), []);
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: s,
        title: o.mermaidSketchTitle,
        onClick: l,
        style: {
          ...Do,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Wo, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ h(
      lp,
      {
        engine: t,
        open: r,
        onClose: c,
        triggerRect: i
      }
    )
  ] });
}
function yp({ engine: t, gifApiBaseUrl: e }) {
  const o = Qt(), { labels: r } = Ut(), [n, s] = ot(t.mode), [i, a] = ot(t.boardBackground), [l, c] = ot(t.lassoSelect);
  vt(() => {
    const p = () => s(t.mode), d = () => a(t.boardBackground), f = () => c(t.lassoSelect);
    return t.on("mode", p), t.on("background", d), t.on("lassoToggle", f), () => {
      t.off("mode", p), t.off("background", d), t.off("lassoToggle", f);
    };
  }, [t]);
  const u = cp.map((p) => ({
    ...p,
    label: p.key === "select" ? r.toolSelect : p.key === "hand" ? r.toolHand : p.key === "draw" ? r.toolDraw : p.key === "shape" ? r.toolShape : p.key === "text" ? r.toolText : p.key === "note" ? r.toolNote : p.key === "sticky" ? r.toolSticky : p.key === "frame" ? r.toolFrame : p.key === "erase" ? r.toolEraser : r.toolLaser
  }));
  return /* @__PURE__ */ S(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: Ke,
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
        u.map((p) => {
          const d = n === p.key && !(p.key === "select" && l);
          return /* @__PURE__ */ S(
            "button",
            {
              title: `${p.label} (${p.shortcut}${p.num ? ` / ${p.num}` : ""})`,
              onClick: () => {
                l && (t.toggleLassoSelect(), c(!1)), t.setMode(p.key);
              },
              style: {
                ...Do,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: d ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ h(Wo, { name: p.key, textGlyph: r.toolTextGlyph }),
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
        /* @__PURE__ */ S(
          "button",
          {
            title: `${r.toolLassoSelect} (L)`,
            onClick: () => {
              l ? (t.toggleLassoSelect(), c(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), c(!0));
            },
            style: {
              ...Do,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: l ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ h(Wo, { name: "lasso" }),
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
        /* @__PURE__ */ h(dp, { engine: t, background: i }),
        /* @__PURE__ */ h(hp, { engine: t }),
        /* @__PURE__ */ h(up, { engine: t }),
        /* @__PURE__ */ h(fp, { engine: t }),
        e && /* @__PURE__ */ h(pp, { engine: t, baseUrl: e })
      ]
    }
  );
}
const gp = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), mp = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function Gi(t) {
  return t.data.opacity ?? 1;
}
function Qo(t, e) {
  return t.data[e];
}
function bp(t) {
  const e = {}, o = t.filter((n) => gp.has(n.type));
  if (o.length > 0) {
    const n = Gi(o[0]), s = o.every((i) => Gi(i) === n);
    e.opacity = s ? n : "mixed";
  }
  const r = t.filter((n) => mp.has(n.type));
  if (r.length > 0) {
    const n = Qo(r[0], "borderColor"), s = r.every(
      (u) => Qo(u, "borderColor") === n
    );
    e.borderColor = s ? n ?? null : "mixed";
    const i = Qo(r[0], "borderWidth") ?? 1, a = r.every(
      (u) => (Qo(u, "borderWidth") ?? 1) === i
    );
    e.borderWidth = a ? i : "mixed";
    const l = Qo(r[0], "borderStyle") ?? "solid", c = r.every(
      (u) => (Qo(u, "borderStyle") ?? "solid") === l
    );
    e.borderStyle = c ? l : "mixed";
  }
  return e;
}
function xp(t) {
  const [e, o] = ot(t.mode), [r, n] = ot(new Set(t.selection)), [, s] = ot(0);
  if (vt(() => {
    const u = () => o(t.mode), p = () => {
      n(new Set(t.selection)), s((f) => f + 1);
    }, d = () => s((f) => f + 1);
    return t.on("mode", u), t.on("selection", p), t.on("change", d), () => {
      t.off("mode", u), t.off("selection", p), t.off("change", d);
    };
  }, [t]), r.size === 0)
    return e === "draw" || e === "shape" || e === "text" || e === "edge" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
  const i = [];
  for (const u of r) {
    const p = t.getNode(u);
    p && i.push(p);
  }
  if (i.length === 0)
    return { target: { kind: "none" }, commonProps: {} };
  if (i.length === 1)
    return { target: { kind: "single", node: i[0] }, commonProps: {} };
  const a = /* @__PURE__ */ new Map();
  for (const u of i) {
    const p = a.get(u.type);
    p ? p.push(u) : a.set(u.type, [u]);
  }
  const l = [];
  for (const [u, p] of a)
    l.push({ type: u, nodes: p });
  const c = bp(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: l },
    commonProps: c
  };
}
const gn = sn(null);
function Oe(t, e) {
  const o = qe(gn), r = qe(ar);
  return dt(
    (n) => {
      const s = r == null ? void 0 : r(), i = {
        ...e.data,
        ...n
      };
      if (s) {
        if (o && o.length > 1) {
          const a = o.map((l) => ({
            id: l.id,
            patch: {
              data: { ...l.data, ...n }
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
        const a = o.map((l) => ({
          id: l.id,
          patch: {
            data: { ...l.data, ...n }
          }
        }));
        t.batchUpdateWithHistory(a);
      } else
        t.updateNodeWithHistory(e.id, {
          data: i
        });
    },
    [t, e, o, r]
  );
}
function Fe({
  value: t,
  onChange: e,
  mixed: o
}) {
  const r = Qt(), { labels: n } = Ut(), s = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ S("div", { style: Ht, children: [
    /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorOpacity }),
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
const wp = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function ve({
  label: t,
  palettes: e,
  value: o,
  onChange: r,
  allowNull: n,
  mixed: s
}) {
  const i = Qt(), { labels: a } = Ut(), [l, c] = ot(""), [u, p] = ot(0), [d, f] = ot(!1), m = ht(null), y = ht(null), [b, x] = ot(null), [g, k] = ot("bottom"), M = e[u] ?? e[0], C = M.name === "Standard" ? a.paletteStandard : M.name, z = o == null ? void 0 : o.toLowerCase();
  vt(() => {
    if (!d) return;
    const E = (V) => {
      m.current && !m.current.contains(V.target) && f(!1);
    };
    return document.addEventListener("mousedown", E), () => document.removeEventListener("mousedown", E);
  }, [d]), vt(() => {
    if (!d) return;
    const E = () => {
      const V = y.current;
      if (!V) return;
      const J = V.getBoundingClientRect(), mt = e.length * 30 + 10, ft = window.innerHeight - J.bottom, Z = J.top, G = ft < mt && Z > ft;
      k(G ? "top" : "bottom"), x({
        top: G ? J.top - 4 : J.bottom + 4,
        left: J.right
      });
    };
    return E(), window.addEventListener("resize", E), window.addEventListener("scroll", E, !0), () => {
      window.removeEventListener("resize", E), window.removeEventListener("scroll", E, !0);
    };
  }, [d]);
  const L = () => {
    const E = l.trim();
    if (!E) return;
    const V = E.startsWith("#") ? E : `#${E}`;
    wp.test(V) && (r(V), c(""));
  }, D = e.some(
    (E) => E.colors.some((V) => V.toLowerCase() === z)
  );
  return /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 }, children: [
    /* @__PURE__ */ h("span", { style: { ...Nt, color: i.textMuted, paddingTop: 2 }, children: t }),
    /* @__PURE__ */ S("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }, children: [
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
          const V = !s && z === E.toLowerCase();
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => r(E),
              style: {
                ...Jt,
                width: 20,
                height: 20,
                background: E,
                border: V ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
                borderRadius: "50%"
              }
            },
            E
          );
        }),
        o && !D && !s && /* @__PURE__ */ h(
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
      e.length > 1 && /* @__PURE__ */ h("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ S("div", { ref: y, style: { position: "relative" }, children: [
        /* @__PURE__ */ S(
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
              /* @__PURE__ */ h("span", { style: { fontSize: 7 }, children: d ? "▲" : "▼" })
            ]
          }
        ),
        d && b && Qe(
          /* @__PURE__ */ h(
            "div",
            {
              ref: m,
              style: {
                position: "fixed",
                top: b.top,
                left: b.left,
                transform: g === "top" ? "translate(-100%, -100%)" : "translateX(-100%)",
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
              children: e.map((E, V) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    p(V), f(!1);
                  },
                  style: {
                    ...Jt,
                    height: 28,
                    padding: "0 8px",
                    background: V === u ? i.controlBgActive : "transparent",
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
                    /* @__PURE__ */ h("span", { style: { display: "flex", gap: 2 }, children: E.colors.slice(0, 6).map((J) => /* @__PURE__ */ h(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: J,
                          display: "inline-block"
                        }
                      },
                      J
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
            E.key === "Enter" && L();
          },
          onBlur: L,
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
function Fo({
  label: t,
  value: e,
  onChange: o,
  mixed: r
}) {
  const n = Qt();
  return /* @__PURE__ */ S("div", { style: Ht, children: [
    /* @__PURE__ */ h("span", { style: { ...Nt, color: n.textMuted }, children: t }),
    Xu.map((s) => /* @__PURE__ */ h(
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
function Bo({
  label: t,
  widths: e = Gu,
  value: o,
  onChange: r,
  mixed: n
}) {
  const s = Qt();
  return /* @__PURE__ */ S("div", { style: Ht, children: [
    /* @__PURE__ */ h("span", { style: { ...Nt, color: s.textMuted }, children: t }),
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
function Cr({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: r,
  onChange: n
}) {
  const { labels: s } = Ut();
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
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
    (t || (r == null ? void 0 : r.color)) && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h(
        Fo,
        {
          label: s.inspectorStyle,
          value: e ?? "solid",
          onChange: (i) => n("borderStyle", i),
          mixed: r == null ? void 0 : r.style
        }
      ),
      /* @__PURE__ */ h(
        Bo,
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
const Kn = /* @__PURE__ */ new Map();
function Se({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: r,
  onToggle: n,
  persistKey: s,
  children: i
}) {
  const a = Qt(), [l, c] = ot(() => s && Kn.has(s) ? !!Kn.get(s) : e), u = r ?? l, p = o === "group", d = ht(null), [f, m] = ot(0);
  return vt(() => {
    !s || r !== void 0 || Kn.set(s, u);
  }, [s, r, u]), nn(() => {
    const y = d.current;
    if (!y) return;
    const b = () => m(y.scrollHeight);
    b();
    const x = new ResizeObserver(() => b());
    return x.observe(y), () => x.disconnect();
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
                    transform: u ? "rotate(90deg)" : "rotate(0deg)",
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
              maxHeight: u ? f : 0,
              opacity: u ? 1 : 0,
              transition: "max-height 200ms ease, opacity 140ms ease",
              overflow: "hidden",
              pointerEvents: u ? "auto" : "none"
            },
            children: /* @__PURE__ */ h(
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
function Hs({ style: t }) {
  const e = Qt();
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
const kp = /* @__PURE__ */ S("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ h("path", { d: "m21 21-4.35-4.35" })
] });
function mn({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: r
}) {
  var g, k;
  const n = Qt(), [s, i] = ot(!1), [a, l] = ot(""), c = ht(null), u = ht(null), [p, d] = ot(null), f = a.trim().toLowerCase(), m = Vt(
    () => o.filter((M) => M.toLowerCase().includes(f)),
    [o, f]
  ), y = Vt(
    () => jr.filter(
      (M) => !o.includes(M.key) && (M.key.toLowerCase().includes(f) || M.label.toLowerCase().includes(f))
    ),
    [o, f]
  );
  vt(() => {
    if (!s || !u.current) return;
    const M = u.current.getBoundingClientRect(), C = 260, z = 16;
    let L = M.left;
    L + C > window.innerWidth - z && (L = window.innerWidth - C - z), L < z && (L = z), d({ top: M.bottom + 4, left: L });
  }, [s]), vt(() => {
    var z;
    if (!s) return;
    const M = (L) => {
      var J, nt;
      const D = L.target;
      if ((J = c.current) != null && J.contains(D)) return;
      const V = (((nt = c.current) == null ? void 0 : nt.ownerDocument) ?? document).getElementById("font-picker-popover");
      V != null && V.contains(D) || i(!1);
    }, C = ((z = c.current) == null ? void 0 : z.ownerDocument) ?? document;
    return C.addEventListener("mousedown", M), () => C.removeEventListener("mousedown", M);
  }, [s]);
  const b = (M) => {
    e(M), i(!1), l("");
  }, x = (M, C) => {
    const z = (C == null ? void 0 : C.label) ?? M, L = C == null ? void 0 : C.category, D = t === M;
    return /* @__PURE__ */ S(
      "button",
      {
        type: "button",
        onClick: () => b(M),
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
          fontFamily: co(M),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (E) => {
          D || (E.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (E) => {
          D || (E.currentTarget.style.background = "transparent");
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
              children: wc(L)
            }
          ),
          /* @__PURE__ */ h("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: z })
        ]
      },
      M
    );
  };
  return /* @__PURE__ */ S("div", { ref: c, style: { position: "relative", flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ S(
      "button",
      {
        ref: u,
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
          fontFamily: co(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...r
        },
        children: [
          /* @__PURE__ */ h("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((g = jr.find((M) => M.key === t)) == null ? void 0 : g.label) ?? t }),
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
    s && p && Qe(
      /* @__PURE__ */ S(
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
                  /* @__PURE__ */ h("span", { style: { color: "#64748b", display: "flex" }, children: kp }),
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
            /* @__PURE__ */ S("div", { style: { overflowY: "auto", padding: 8, flex: 1 }, children: [
              m.length > 0 && /* @__PURE__ */ S("div", { style: { marginBottom: 12 }, children: [
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
                m.map((M) => x(M, jr.find((C) => C.key === M)))
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
      (((k = c.current) == null ? void 0 : k.ownerDocument) ?? document).body
    )
  ] });
}
function Os({ name: t, size: e = 16 }) {
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
const vp = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], Sp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Mp({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function Co(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function Cp({ engine: t, node: e, fontsInScene: o }) {
  const r = Qt(), { labels: n } = Ut(), s = Oe(t, e), i = qe(gn) ?? [e], { data: a } = e, l = a.fill ?? null, c = a.fillStyle ?? "hachure", u = a.strokeStyle ?? "solid", p = Co(i, (g) => g.data.stroke), d = Co(i, (g) => g.data.fill ?? null), f = Co(i, (g) => g.data.fillStyle ?? "hachure"), m = Co(i, (g) => g.data.strokeStyle ?? "solid"), y = Co(i, (g) => g.data.strokeWidth), b = Co(i, (g) => g.data.roughness), x = Co(i, (g) => g.data.opacity ?? 1);
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ S(Se, { title: n.inspectorStructure, persistKey: "shape.structure", children: [
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorShape }),
        Sp.map((g) => /* @__PURE__ */ h(
          "button",
          {
            title: g.label,
            onClick: () => s({ shape: g.key }),
            style: {
              ...Jt,
              width: 28,
              height: 28,
              background: a.shape === g.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(Mp, { name: g.key })
          },
          g.key
        ))
      ] }),
      (a.shape === "rect" || a.shape === "diamond") && /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorEdges }),
        [
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" }
        ].map((g) => /* @__PURE__ */ h(
          "button",
          {
            title: g.label,
            onClick: () => s({ edgeStyle: g.key === "sharp" ? void 0 : g.key }),
            style: {
              ...Jt,
              width: 28,
              height: 28,
              background: (a.edgeStyle ?? "sharp") === g.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(Os, { name: g.key })
          },
          g.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorLabel }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "text",
            value: a.label ?? "",
            placeholder: n.inspectorLabel,
            onChange: (g) => s({ label: g.target.value || void 0 }),
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
    a.label && /* @__PURE__ */ S(Se, { title: n.inspectorTypography, defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          mn,
          {
            value: a.labelFontFamily ?? "Excalifont",
            onChange: (g) => s({ labelFontFamily: g === "Excalifont" ? void 0 : g }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorSize }),
        vp.map((g) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ labelFontSize: g.size === 14 ? void 0 : g.size }),
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: (a.labelFontSize ?? 14) === g.size ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              fontWeight: 600,
              borderRadius: r.controlBorderRadius
            },
            children: g.label
          },
          g.size
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorAlign }),
        Bs.map((g) => /* @__PURE__ */ h(
          "button",
          {
            title: g.key,
            onClick: () => s({ labelAlign: g.key === "center" ? void 0 : g.key }),
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: (a.labelAlign ?? "center") === g.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: g.label
          },
          g.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ S(Se, { title: n.inspectorAppearance, persistKey: "shape.appearance", children: [
      /* @__PURE__ */ h(
        ve,
        {
          label: n.inspectorStroke,
          palettes: Ee,
          value: p ? void 0 : a.stroke,
          mixed: p,
          onChange: (g) => s({ stroke: g })
        }
      ),
      /* @__PURE__ */ h(
        ve,
        {
          label: n.inspectorFill,
          palettes: Ns,
          value: d ? void 0 : l,
          mixed: d,
          onChange: (g) => s({ fill: g ?? void 0 }),
          allowNull: !0
        }
      ),
      l && !d && /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorFillPattern }),
        Ws.map((g) => /* @__PURE__ */ h(
          "button",
          {
            title: g.label,
            onClick: () => s({ fillStyle: g.key }),
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: !f && c === g.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(Hs, { style: g.key })
          },
          g.key
        ))
      ] }),
      /* @__PURE__ */ h(
        Fo,
        {
          label: n.inspectorStrokeStyle,
          value: u,
          mixed: m,
          onChange: (g) => s({ strokeStyle: g })
        }
      ),
      /* @__PURE__ */ h(
        Bo,
        {
          label: n.inspectorStrokeWidth,
          widths: Fs,
          value: a.strokeWidth,
          mixed: y,
          onChange: (g) => s({ strokeWidth: g })
        }
      ),
      /* @__PURE__ */ h(
        Fe,
        {
          value: a.opacity ?? 1,
          mixed: x,
          onChange: (g) => s({ opacity: g })
        }
      )
    ] }),
    /* @__PURE__ */ h(Se, { title: n.inspectorSketch, defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorRoughness }),
      rn.map((g) => {
        const k = g.value === 0 ? n.roughnessArchitect : g.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: k,
            onClick: () => s({ roughness: g.value }),
            style: {
              ...Jt,
              height: 28,
              padding: "0 8px",
              background: !b && a.roughness === g.value ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: k
          },
          g.value
        );
      })
    ] }) })
  ] });
}
function Jo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function Ip({ engine: t, node: e }) {
  const o = Qt(), { labels: r } = Ut(), n = Oe(t, e), s = qe(gn) ?? [e], { data: i } = e, a = i.fill ?? null, l = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", u = Jo(s, (b) => b.data.color), p = Jo(s, (b) => b.data.fill ?? null), d = Jo(s, (b) => b.data.fillStyle ?? "hachure"), f = Jo(s, (b) => b.data.strokeStyle ?? "solid"), m = Jo(s, (b) => b.data.strokeWidth), y = Jo(s, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
      ve,
      {
        label: r.inspectorStroke,
        palettes: Ee,
        value: u ? void 0 : i.color,
        mixed: u,
        onChange: (b) => n({ color: b })
      }
    ),
    /* @__PURE__ */ h(
      ve,
      {
        label: r.inspectorFill,
        palettes: Ns,
        value: p ? void 0 : a,
        mixed: p,
        onChange: (b) => n({ fill: b ?? void 0 }),
        allowNull: !0
      }
    ),
    a && !p && /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.inspectorFillPattern }),
      Ws.map((b) => /* @__PURE__ */ h(
        "button",
        {
          title: b.label,
          onClick: () => n({ fillStyle: b.key }),
          style: {
            ...Jt,
            width: 36,
            height: 28,
            background: !d && l === b.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(Hs, { style: b.key })
        },
        b.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Fo,
      {
        label: r.inspectorStrokeStyle,
        value: c,
        mixed: f,
        onChange: (b) => n({ strokeStyle: b })
      }
    ),
    /* @__PURE__ */ h(
      Bo,
      {
        label: r.inspectorStrokeWidth,
        widths: sl,
        value: i.strokeWidth,
        mixed: m,
        onChange: (b) => n({ strokeWidth: b })
      }
    ),
    /* @__PURE__ */ h(
      Fe,
      {
        value: i.opacity ?? 1,
        mixed: y,
        onChange: (b) => n({ opacity: b })
      }
    )
  ] });
}
function zp({ engine: t, node: e, fontsInScene: o }) {
  const r = Qt(), { labels: n } = Ut(), s = Oe(t, e), { data: i } = e;
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ S(Se, { title: n.inspectorTypography, persistKey: "text.typography", children: [
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          mn,
          {
            value: i.fontFamily,
            onChange: (a) => s({ fontFamily: a }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorSize }),
        al.map((a) => /* @__PURE__ */ h(
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
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorAlign }),
        Bs.map((a) => /* @__PURE__ */ h(
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
    /* @__PURE__ */ S(Se, { title: n.inspectorAppearance, persistKey: "text.appearance", children: [
      /* @__PURE__ */ h(
        ve,
        {
          label: n.inspectorStroke,
          palettes: Ee,
          value: i.color,
          onChange: (a) => s({ color: a })
        }
      ),
      /* @__PURE__ */ h(
        Cr,
        {
          borderColor: i.borderColor ?? null,
          borderStyle: i.borderStyle,
          borderWidth: i.borderWidth,
          onChange: (a, l) => s({ [a]: l })
        }
      ),
      /* @__PURE__ */ h(
        Fe,
        {
          value: i.opacity ?? 1,
          onChange: (a) => s({ opacity: a })
        }
      )
    ] })
  ] });
}
const Yi = { top: 0, right: 0.25, bottom: 0.5, left: 0.75 }, Tp = [[0, "top"], [0.25, "right"], [0.5, "bottom"], [0.75, "left"]];
function ji(t) {
  let e = "top", o = 1 / 0;
  for (const [r, n] of Tp) {
    const s = Math.min(Math.abs(t - r), Math.abs(t - r - 1), Math.abs(t - r + 1));
    s < o && (o = s, e = n);
  }
  return e;
}
function Pp({ engine: t, node: e }) {
  const o = Qt(), { labels: r } = Ut(), n = Oe(t, e), { data: s } = e;
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ S(Se, { title: r.edgeLineSection, persistKey: "edge.line", children: [
      /* @__PURE__ */ h(
        ve,
        {
          label: r.edgeColor,
          palettes: Ee,
          value: s.color,
          onChange: (i) => n({ color: i })
        }
      ),
      /* @__PURE__ */ h(
        Fo,
        {
          label: r.inspectorStyle,
          value: s.style,
          onChange: (i) => n({ style: i })
        }
      ),
      /* @__PURE__ */ h(
        Bo,
        {
          label: r.inspectorWidth,
          widths: il,
          value: s.strokeWidth,
          onChange: (i) => n({ strokeWidth: i })
        }
      ),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: "Connect" }),
        ["fixed", "free"].map((i) => {
          const a = s.sourceT !== void 0 || s.targetT !== void 0;
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                i === "free" && !a ? n({
                  sourceT: s.sourceHandle ? Yi[s.sourceHandle] : 0,
                  targetT: s.targetHandle ? Yi[s.targetHandle] : 0.5,
                  sourceHandle: void 0,
                  targetHandle: void 0
                }) : i === "fixed" && a && n({
                  sourceHandle: s.sourceT !== void 0 ? ji(s.sourceT) : "right",
                  targetHandle: s.targetT !== void 0 ? ji(s.targetT) : "left",
                  sourceT: void 0,
                  targetT: void 0
                });
              },
              style: {
                ...Jt,
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
    /* @__PURE__ */ S(Se, { title: r.edgeArrowsSection, persistKey: "edge.arrows", children: [
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.edgeHead }),
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
      (s.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.edgeHeadSize }),
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
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.edgeTail }),
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
      (s.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.edgeTailSize }),
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
    /* @__PURE__ */ S(Se, { title: r.edgePathMotionSection, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.edgePath }),
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
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.edgeAnimate }),
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
      s.animated && /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.edgeDirection }),
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
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.inspectorRoughness }),
        rn.map((i) => {
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
    /* @__PURE__ */ h(Se, { title: r.inspectorLabel, defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.edgeText }),
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
function Ap({ engine: t, node: e }) {
  const o = Qt(), { labels: r } = Ut(), n = Oe(t, e), { data: s } = e, i = !!s.crop;
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
      Cr,
      {
        borderColor: s.borderColor ?? null,
        borderStyle: s.borderStyle,
        borderWidth: s.borderWidth,
        onChange: (a, l) => n({ [a]: l })
      }
    ),
    /* @__PURE__ */ S("div", { style: { ...Ht, marginTop: 4 }, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.inspectorCrop }),
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
      i && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => n({ crop: void 0 }),
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
    /* @__PURE__ */ h(
      Fe,
      {
        value: s.opacity ?? 1,
        onChange: (a) => n({ opacity: a })
      }
    )
  ] });
}
function Ep({ engine: t, node: e }) {
  const o = Qt(), r = Oe(t, e), { data: n } = e;
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
      Cr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: "Edges" }),
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
          children: /* @__PURE__ */ h(Os, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Fe,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
const yr = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, Lp = Du();
function Rp({
  value: t,
  onChange: e,
  theme: o,
  durationLabel: r,
  msLabel: n
}) {
  const [s, i] = ot(String(t));
  vt(() => i(String(t)), [t]);
  const a = () => {
    const l = parseInt(s, 10);
    !isNaN(l) && l >= 100 && l <= 5e3 ? e(l) : i(String(t));
  };
  return /* @__PURE__ */ S("div", { style: Ht, children: [
    /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r }),
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
function Dp({ engine: t, node: e }) {
  const o = Qt(), { labels: r } = Ut(), n = Oe(t, e), s = qe(ar), { data: i } = e, a = dt(
    (p) => {
      var g;
      if (!p) {
        n({ devicePreset: void 0 });
        return;
      }
      const d = fs(p);
      if (!d) return;
      const f = nl(d), m = Math.round(e.w / f), y = { devicePreset: p };
      (!i.label || ((g = fs(i.devicePreset ?? "")) == null ? void 0 : g.label) === i.label) && (y.label = d.label);
      const b = { ...e.data, ...y }, x = s == null ? void 0 : s();
      x ? t.updateNodeWithHistoryCoalesced(
        e.id,
        { h: m, data: b },
        x
      ) : t.updateNodeWithHistory(e.id, {
        h: m,
        data: b
      });
    },
    [t, e, i.label, i.devicePreset, n, s]
  ), l = Vt(() => {
    const p = t.getAllNodes().filter((b) => b.type === "frame"), d = p.length, f = /* @__PURE__ */ new Set();
    for (const b of p)
      b.id !== e.id && b.data.slideOrder != null && f.add(b.data.slideOrder);
    const m = [];
    for (let b = 1; b <= d; b++)
      f.has(b) || m.push(b);
    const y = e.data.slideOrder;
    return y != null && !m.includes(y) && (m.push(y), m.sort((b, x) => b - x)), m;
  }, [t, e]), c = {
    pan: r.transitionPan,
    fade: r.transitionFadeToBlack,
    dissolve: r.transitionDissolve,
    zoom: r.transitionZoom,
    fold: r.transitionFold,
    cube: r.transitionCube,
    none: r.transitionNoneInstant
  }, u = {
    Phones: r.deviceGroupPhones,
    "Phones (Landscape)": r.deviceGroupPhonesLandscape,
    Tablets: r.deviceGroupTablets,
    "Tablets (Landscape)": r.deviceGroupTabletsLandscape,
    Devices: r.deviceGroupDevices,
    Standard: r.deviceGroupStandard
  };
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.inspectorLabel }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: i.label ?? "",
          onChange: (p) => n({ label: p.target.value || void 0 }),
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
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.frameDevice }),
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
            /* @__PURE__ */ h("option", { value: "", children: r.frameFreeform }),
            Lp.map((p) => /* @__PURE__ */ h("optgroup", { label: u[p.label] ?? p.label, children: p.presets.map((d) => /* @__PURE__ */ S("option", { value: d.key, children: [
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
    /* @__PURE__ */ h(
      ve,
      {
        label: r.inspectorBackground,
        palettes: Ee,
        value: (() => {
          const p = i.backgroundColor;
          if (!p) return null;
          for (const d of Ee) {
            const f = d.colors.find((m) => p === `${m}15`);
            if (f) return f;
          }
          return p.length === 9 && p.endsWith("15") ? p.slice(0, 7) : null;
        })(),
        onChange: (p) => n({ backgroundColor: p ? `${p}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ h(
      ve,
      {
        label: r.inspectorBorder,
        palettes: Ee,
        value: i.borderColor,
        onChange: (p) => n({ borderColor: p })
      }
    ),
    /* @__PURE__ */ h(
      Fo,
      {
        label: r.inspectorStyle,
        value: i.borderStyle ?? "dashed",
        onChange: (p) => n({ borderStyle: p })
      }
    ),
    /* @__PURE__ */ h(
      Bo,
      {
        label: r.inspectorWidth,
        value: i.borderWidth ?? 1,
        onChange: (p) => n({ borderWidth: p })
      }
    ),
    /* @__PURE__ */ h(
      Fe,
      {
        value: i.opacity ?? 1,
        onChange: (p) => n({ opacity: p })
      }
    ),
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.frameSlideNumber }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.slideOrder ?? "",
          onChange: (p) => {
            const d = p.target.value;
            n({ slideOrder: d ? parseInt(d, 10) : void 0 });
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
            l.map((p) => /* @__PURE__ */ h("option", { value: p, children: p }, p))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.frameTransition }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.transition ?? "pan",
          onChange: (p) => {
            const d = p.target.value;
            n({ transition: d === "pan" ? void 0 : d, transitionDuration: void 0 });
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
      Rp,
      {
        value: i.transitionDuration ?? yr[i.transition ?? "pan"],
        onChange: (p) => n({ transitionDuration: p === yr[i.transition ?? "pan"] ? void 0 : p }),
        theme: o,
        durationLabel: r.frameDuration,
        msLabel: r.frameMilliseconds
      }
    )
  ] });
}
function Wp({ engine: t, node: e }) {
  const o = Qt(), { labels: r } = Ut(), n = Oe(t, e), { data: s } = e;
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ h(
      ve,
      {
        label: r.inspectorStroke,
        palettes: ju,
        value: s.color,
        onChange: (i) => {
          i && n({ color: i });
        }
      }
    ),
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.inspectorSize }),
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
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.inspectorEdges }),
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
          children: /* @__PURE__ */ h(Os, { name: i.key })
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Fe,
      {
        value: s.opacity ?? 1,
        onChange: (i) => n({ opacity: i })
      }
    )
  ] });
}
function Fp({ engine: t, node: e }) {
  const o = Qt(), r = Oe(t, e), { data: n } = e;
  return /* @__PURE__ */ S(kt, { children: [
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: "URL" }),
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
      Cr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ h(
      Fe,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function Bp({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const Np = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Hp({ engine: t, mode: e, fontsInScene: o }) {
  const r = Qt(), { labels: n } = Ut(), [, s] = ot(0), i = dt(() => s((y) => y + 1), []), a = t.activeTool;
  if (e === "text") {
    const y = a.fontFamily ?? lo, b = a.fontSize ?? 20, x = a.textAlign ?? "left", g = a.color;
    return /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          mn,
          {
            value: y,
            onChange: (k) => {
              a.fontFamily = k, i();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorSize }),
        al.map((k) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              a.fontSize = k, i();
            },
            style: {
              ...Jt,
              width: 36,
              height: 28,
              background: b === k ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              borderRadius: r.controlBorderRadius
            },
            children: k
          },
          k
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorAlign }),
        Bs.map((k) => /* @__PURE__ */ h(
          "button",
          {
            title: k.key,
            onClick: () => {
              a.textAlign = k.key, i();
            },
            style: {
              ...Jt,
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
      /* @__PURE__ */ h(
        ve,
        {
          label: n.inspectorStroke,
          palettes: Ee,
          value: g,
          onChange: (k) => {
            a.color = k, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        Fe,
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
    const y = a.roughness ?? 0;
    return /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h(
        ve,
        {
          label: n.inspectorStroke,
          palettes: Ee,
          value: a.color,
          onChange: (b) => {
            a.color = b, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        Fo,
        {
          label: n.inspectorStrokeStyle,
          value: a.strokeStyle ?? "solid",
          onChange: (b) => {
            a.strokeStyle = b, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        Bo,
        {
          label: n.inspectorStrokeWidth,
          widths: il,
          value: a.width,
          onChange: (b) => {
            a.width = b, i();
          }
        }
      ),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((b) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              a.arrowHead = b, i();
            },
            style: {
              ...Jt,
              height: 28,
              padding: "0 6px",
              background: (a.arrowHead ?? "arrow") === b ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 11,
              borderRadius: r.controlBorderRadius
            },
            children: b === "none" ? n.inspectorNone : b === "arrow" ? "▷" : b === "filled" ? "▶" : "●"
          },
          b
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((b) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              a.arrowTail = b, i();
            },
            style: {
              ...Jt,
              height: 28,
              padding: "0 6px",
              background: (a.arrowTail ?? "none") === b ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 11,
              borderRadius: r.controlBorderRadius
            },
            children: b === "none" ? n.inspectorNone : b === "arrow" ? "◁" : b === "filled" ? "◀" : "●"
          },
          b
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.edgePath }),
        [
          { key: "bezier", label: n.edgeBezier },
          { key: "straight", label: n.edgeStraight },
          { key: "smoothstep", label: n.edgeSmooth },
          { key: "step", label: n.edgeStep }
        ].map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => {
              a.edgeType = b.key, i();
            },
            style: {
              ...Jt,
              height: 28,
              padding: "0 6px",
              background: (a.edgeType ?? "bezier") === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: b.label
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Ht, children: [
        /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorRoughness }),
        rn.map((b) => {
          const x = b.value === 0 ? n.roughnessArchitect : b.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
          return /* @__PURE__ */ h(
            "button",
            {
              title: x,
              onClick: () => {
                a.roughness = b.value, i();
              },
              style: {
                ...Jt,
                height: 28,
                padding: "0 8px",
                background: y === b.value ? r.controlBgActive : r.controlBg,
                color: r.text,
                fontSize: 9,
                borderRadius: r.controlBorderRadius
              },
              children: x
            },
            b.value
          );
        })
      ] })
    ] });
  }
  const l = e === "shape", c = a.color, u = a.fillColor ?? null, p = a.fillStyle ?? "hachure", d = a.strokeStyle ?? "solid", f = a.width, m = a.roughness ?? 1;
  return /* @__PURE__ */ S(kt, { children: [
    l && /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorShape }),
      Np.map((y) => /* @__PURE__ */ h(
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
          children: /* @__PURE__ */ h(Bp, { name: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ h(
      ve,
      {
        label: n.inspectorStroke,
        palettes: Ee,
        value: c,
        onChange: (y) => {
          a.color = y, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      ve,
      {
        label: n.inspectorFill,
        palettes: Ns,
        value: u,
        onChange: (y) => {
          a.fillColor = y ?? void 0, i();
        },
        allowNull: !0
      }
    ),
    u && /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorFillPattern }),
      Ws.map((y) => /* @__PURE__ */ h(
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
          children: /* @__PURE__ */ h(Hs, { style: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Fo,
      {
        label: n.inspectorStrokeStyle,
        value: d,
        onChange: (y) => {
          a.strokeStyle = y, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      Bo,
      {
        label: n.inspectorStrokeWidth,
        widths: l ? Fs : sl,
        value: f,
        onChange: (y) => {
          a.width = y, i();
        }
      }
    ),
    l && /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorRoughness }),
      rn.map((y) => {
        const b = y.value === 0 ? n.roughnessArchitect : y.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: b,
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
            children: b
          },
          y.value
        );
      })
    ] }),
    /* @__PURE__ */ h(
      Fe,
      {
        value: a.opacity ?? 1,
        onChange: (y) => {
          a.opacity = y, i();
        }
      }
    )
  ] });
}
function Op({ engine: t, node: e, PanelComponent: o }) {
  const r = Oe(t, e);
  return /* @__PURE__ */ h(o, { node: e, data: e.data, engine: t, updateData: r });
}
const Xp = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), Gp = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function ll(t) {
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
function Yp(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t.getAllNodes()) {
    let n;
    r.type === "text" ? n = r.data.fontFamily : r.type === "shape" && (n = r.data.labelFontFamily), n && !e.has(n) && (e.add(n), o.push(n));
  }
  return o;
}
function jp({ label: t }) {
  const e = Qt();
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
function Vp({
  engine: t,
  open: e,
  onToggle: o
}) {
  const r = Qt(), { labels: n } = Ut(), [s, i] = ot(t.snapToGrid), [a, l] = ot(t.gridSize), [c, u] = ot(t.smartGuides), [p, d] = ot(t.freeFormEdges), [f, m] = ot(t.boardBackground), y = {
    "plain-white": n.paperWhite,
    "dot-grid": n.paperCream,
    engineering: n.paperWarm,
    blueprint: n.paperBlueprint,
    "dark-grid": n.paperNight,
    "japanese-stationery": n.paperJapaneseStationery,
    kraft: n.paperKraftPaper
  };
  vt(() => {
    const x = () => {
      i(t.snapToGrid), l(t.gridSize), u(t.smartGuides), d(t.freeFormEdges);
    }, g = () => d(t.freeFormEdges);
    t.on("change", g);
    const k = () => m(t.boardBackground);
    return t.on("guides", x), t.on("background", k), () => {
      t.off("guides", x), t.off("background", k), t.off("change", g);
    };
  }, [t]);
  const b = [10, 20, 40, 80];
  return /* @__PURE__ */ S(Se, { title: n.inspectorCanvas, defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorGrid }),
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
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorGridSize }),
      /* @__PURE__ */ h("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }, children: b.map((x) => /* @__PURE__ */ S(
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
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorGuides }),
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
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: "Free edges" }),
      /* @__PURE__ */ h(
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
    /* @__PURE__ */ S("div", { style: Ht, children: [
      /* @__PURE__ */ h("span", { style: { ...Nt, color: r.textMuted }, children: n.inspectorPaper }),
      /* @__PURE__ */ h(
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
          children: nr.map((x) => /* @__PURE__ */ h("option", { value: x.key, children: y[x.key] ?? x.label }, x.key))
        }
      )
    ] })
  ] });
}
function cl({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: r
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ h(Cp, { engine: t, node: e, fontsInScene: r });
    case "draw":
      return /* @__PURE__ */ h(Ip, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ h(zp, { engine: t, node: e, fontsInScene: r });
    case "edge":
      return /* @__PURE__ */ h(Pp, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ h(Ap, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ h(Ep, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ h(Dp, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ h(Wp, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ h(Fp, { engine: t, node: e });
    default: {
      const n = o == null ? void 0 : o.get(e.type);
      return n != null && n.propertiesPanel ? /* @__PURE__ */ h(Op, { engine: t, node: e, PanelComponent: n.propertiesPanel }) : null;
    }
  }
}
function Vi({
  engine: t,
  nodes: e
}) {
  const o = Qt(), { labels: r } = Ut(), n = qe(ar), s = Math.round(e[0].rotation ?? 0), a = e.every(
    (p) => Math.round(p.rotation ?? 0) === s
  ) ? s : null, [l, c] = ot(null), u = dt(
    (p) => {
      c(null);
      const d = parseFloat(p);
      if (isNaN(d)) return;
      const f = Math.max(-360, Math.min(360, d)), m = e.map((b) => ({
        id: b.id,
        patch: { rotation: f }
      })), y = n == null ? void 0 : n();
      y ? t.batchUpdateWithHistoryCoalesced(m, y) : t.batchUpdateWithHistory(m);
    },
    [t, e, n]
  );
  return /* @__PURE__ */ S("div", { style: Ht, children: [
    /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.inspectorRotation }),
    /* @__PURE__ */ h(
      "input",
      {
        type: "number",
        min: -360,
        max: 360,
        value: l ?? (a !== null ? String(a) : ""),
        placeholder: a === null ? "Mixed" : void 0,
        onChange: (p) => c(p.target.value),
        onBlur: (p) => u(p.target.value),
        onKeyDown: (p) => {
          p.key === "Enter" && u(p.target.value), p.key === "Escape" && c(null);
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
function Ki({
  engine: t,
  nodes: e
}) {
  const o = Qt(), { labels: r } = Ut(), n = e.map((i) => i.id);
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
  return /* @__PURE__ */ S("div", { style: Ht, children: [
    /* @__PURE__ */ h("span", { style: { ...Nt, color: o.textMuted }, children: r.inspectorStack }),
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
function Kp({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const r = qe(ar), n = dt(
    (s, i) => {
      const a = s === "opacity" ? Xp : Gp, l = e.filter((u) => a.has(u.type)).map((u) => ({
        id: u.id,
        patch: {
          data: { ...u.data, [s]: i }
        }
      })), c = r == null ? void 0 : r();
      c ? t.batchUpdateWithHistoryCoalesced(l, c) : t.batchUpdateWithHistory(l);
    },
    [t, e, r]
  );
  return /* @__PURE__ */ S(kt, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ h(
      Fe,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (s) => n("opacity", s)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ h(
      Cr,
      {
        borderColor: o.borderColor === "mixed" ? void 0 : o.borderColor,
        borderStyle: o.borderStyle === "mixed" ? void 0 : o.borderStyle,
        borderWidth: o.borderWidth === "mixed" ? void 0 : o.borderWidth,
        mixed: {
          color: o.borderColor === "mixed",
          style: o.borderStyle === "mixed",
          width: o.borderWidth === "mixed"
        },
        onChange: (s, i) => n(s, i)
      }
    )
  ] });
}
function qp({
  engine: t,
  target: e
}) {
  const o = Qt(), { labels: r } = Ut();
  if (e.kind !== "single" && e.kind !== "multi") return null;
  const n = Array.from(t.selection), s = n.length > 0, i = n.length >= 2 || t.selectionHasGroup(), a = n.some((u) => {
    var p;
    return (p = t.getNode(u)) == null ? void 0 : p.locked;
  }), l = n.some((u) => {
    var p;
    return !((p = t.getNode(u)) != null && p.locked);
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
        for (const u of n) t.updateNode(u, { locked: !0 });
      }
    },
    {
      label: r.actionUnlock,
      disabled: !a,
      action: () => {
        for (const u of n) t.updateNode(u, { locked: void 0 });
      }
    },
    {
      label: r.actionDelete,
      disabled: !s,
      danger: !0,
      action: () => t.deleteSelected()
    }
  ];
  return /* @__PURE__ */ h(Se, { title: r.inspectorActions, defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: c.map((u) => /* @__PURE__ */ h(
    "button",
    {
      type: "button",
      disabled: u.disabled,
      onClick: u.action,
      style: {
        border: `1px solid ${o.border}`,
        borderRadius: 999,
        background: u.disabled ? o.controlBg : o.controlBgActive,
        color: u.danger ? "#fecaca" : o.text,
        opacity: u.disabled ? 0.45 : 0.95,
        padding: "5px 10px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.01em",
        cursor: u.disabled ? "default" : "pointer",
        whiteSpace: "nowrap"
      },
      children: u.label
    },
    u.label
  )) }) });
}
function Up({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: r,
  open: n,
  onToggle: s
}) {
  const { labels: i } = Ut(), l = ll(i)[e.type] ?? e.type, c = e.nodes.length, u = e.nodes[0], p = `${l} (${c})`;
  return /* @__PURE__ */ h(Se, { title: p, defaultOpen: !1, variant: "group", open: n, onToggle: s, children: /* @__PURE__ */ h(gn.Provider, { value: e.nodes, children: /* @__PURE__ */ h(
    cl,
    {
      engine: t,
      node: u,
      registry: o,
      fontsInScene: r
    }
  ) }) });
}
function Zp(t, e) {
  const o = ll(e);
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
function qi({
  engine: t,
  registry: e,
  target: o,
  commonProps: r
}) {
  const { labels: n } = Ut(), s = Vt(() => Yp(t), [t, o]), i = Zp(o, n), [a, l] = ot("shared"), [c, u] = ot(!1), p = Vt(() => {
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
  }, [o]), d = fn(t, p);
  return vt(() => {
    const f = () => {
      u(
        window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0
      );
    };
    return f(), window.addEventListener("resize", f), () => window.removeEventListener("resize", f);
  }, []), vt(() => {
    if (o.kind !== "multi") {
      l("shared");
      return;
    }
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((m) => m.type)])).has(a) || l("shared");
  }, [o, a]), /* @__PURE__ */ S(ar.Provider, { value: d, children: [
    /* @__PURE__ */ h(jp, { label: i }),
    /* @__PURE__ */ h(
      Vp,
      {
        engine: t,
        open: o.kind === "multi" ? a === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => l((f) => f === "canvas" ? "" : "canvas") : void 0
      }
    ),
    c && /* @__PURE__ */ h(qp, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ h(Hp, { engine: t, mode: o.mode, fontsInScene: s }),
    o.kind === "single" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h(
        cl,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: s
        }
      ),
      /* @__PURE__ */ h(Vi, { engine: t, nodes: [o.node] }),
      /* @__PURE__ */ h(Ki, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ S(
        Se,
        {
          title: n.inspectorShared,
          defaultOpen: !0,
          variant: "group",
          open: a === "shared",
          onToggle: () => l((f) => f === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ h(Kp, { engine: t, nodes: o.nodes, commonProps: r }),
            /* @__PURE__ */ h(Vi, { engine: t, nodes: o.nodes }),
            /* @__PURE__ */ h(Ki, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((f) => /* @__PURE__ */ h(
        Up,
        {
          engine: t,
          group: f,
          registry: e,
          fontsInScene: s,
          open: a === f.type,
          onToggle: () => l((m) => m === f.type ? "" : f.type)
        },
        f.type
      ))
    ] })
  ] });
}
function Qp({ engine: t, registry: e }) {
  const o = Qt(), { isRTL: r, labels: n } = Ut(), { target: s, commonProps: i } = xp(t), a = s.kind !== "none";
  dt((U, q) => {
    const X = U.trim();
    if (X.startsWith("#")) {
      const et = X.slice(1), rt = et.length === 3 ? et.split("").map((j) => j + j).join("") : et;
      if (rt.length === 6) {
        const j = parseInt(rt.slice(0, 2), 16), tt = parseInt(rt.slice(2, 4), 16), yt = parseInt(rt.slice(4, 6), 16);
        return `rgba(${j}, ${tt}, ${yt}, ${q})`;
      }
    }
    return X.startsWith("rgb(") ? `rgba(${X.slice(4, -1)}, ${q})` : (X.startsWith("rgba("), X);
  }, []);
  const [l, c] = ot(!1), [u, p] = ot(!1), [d, f] = ot(!1), [m, y] = ot(!1), b = ht(null), x = ht(!1), g = dt(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), k = dt(
    (U) => {
      const q = g() ? 1366 : 1024;
      return U <= q;
    },
    [g]
  ), M = ht(null), [C, z] = ot(null), L = ht(null), [D, E] = ot(!1), V = dt(() => {
    var X, et;
    const U = (X = M.current) == null ? void 0 : X.offsetParent;
    if (U) return { width: U.clientWidth, height: U.clientHeight };
    const q = ((et = M.current) == null ? void 0 : et.ownerDocument.defaultView) ?? window;
    return { width: q.innerWidth, height: q.innerHeight };
  }, []), J = dt(() => {
    const { width: U } = V();
    return r ? { x: Ke + 16, y: 12 } : { x: U - er - 16, y: 12 };
  }, [V, r]), nt = C ?? J(), mt = ht(!1);
  nn(() => {
    if (!mt.current && M.current && !C) {
      mt.current = !0;
      const U = M.current.offsetParent;
      U && z(
        r ? { x: Ke + 16, y: 12 } : { x: U.clientWidth - er - 16, y: 12 }
      );
    }
  }, [C, r]), vt(() => {
    var et, rt;
    const U = ((et = M.current) == null ? void 0 : et.offsetParent) ?? ((rt = M.current) == null ? void 0 : rt.ownerDocument.body);
    if (!U) return;
    const q = new ResizeObserver((j) => {
      var it;
      const tt = ((it = j[0]) == null ? void 0 : it.contentRect.width) ?? U.clientWidth;
      c(tt < 600);
      const yt = k(tt);
      p(yt), x.current || (y(yt), x.current = !0);
    });
    q.observe(U), c(U.clientWidth < 600);
    const X = k(U.clientWidth);
    return p(X), x.current || (y(X), x.current = !0), () => q.disconnect();
  }, [k]), vt(() => {
    var ut;
    const U = ((ut = M.current) == null ? void 0 : ut.ownerDocument) ?? document, q = () => {
      b.current !== null && window.clearTimeout(b.current), b.current = window.setTimeout(() => {
        f(!1), b.current = null;
      }, 200);
    }, X = () => {
      b.current !== null && (window.clearTimeout(b.current), b.current = null), f(!0);
    }, et = (St) => !!(St instanceof Element && St.closest("[data-sb-canvas]")), rt = (St) => {
      St.button !== 2 && et(St.target) && X();
    }, j = () => q(), tt = () => q(), yt = (St) => {
      et(St.target) && X();
    }, it = () => q(), gt = (St) => {
      var Wt;
      ((Wt = St.detail) == null ? void 0 : Wt.active) ? X() : q();
    };
    return U.addEventListener("pointerdown", rt, !0), U.addEventListener("pointerup", j, !0), U.addEventListener("pointercancel", tt, !0), U.addEventListener("focusin", yt, !0), U.addEventListener("focusout", it, !0), U.addEventListener("sb:canvas-interaction", gt), () => {
      U.removeEventListener("pointerdown", rt, !0), U.removeEventListener("pointerup", j, !0), U.removeEventListener("pointercancel", tt, !0), U.removeEventListener("focusin", yt, !0), U.removeEventListener("focusout", it, !0), U.removeEventListener("sb:canvas-interaction", gt), b.current !== null && (window.clearTimeout(b.current), b.current = null);
    };
  }, []);
  const ft = dt(
    (U, q) => {
      E(!0);
      const X = C ? C.x : J().x, et = C ? C.y : J().y;
      L.current = {
        startX: U.clientX,
        startY: U.clientY,
        startLeft: X,
        startTop: et
      }, (q ?? U.currentTarget).setPointerCapture(U.pointerId);
    },
    [C, J]
  ), Z = dt((U) => U instanceof Element ? !!U.closest(
    'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
  ) : !1, []), G = dt(
    (U) => {
      l || U.button === 0 && (Z(U.target) || (U.stopPropagation(), ft(U, U.currentTarget)));
    },
    [l, Z, ft]
  ), K = dt(
    (U) => {
      if (!L.current) return;
      U.stopPropagation();
      const q = U.clientX - L.current.startX, X = U.clientY - L.current.startY, { width: et, height: rt } = V(), j = r ? 8 : Ke, tt = r ? et - er - Ke - 8 : et - er - 8, yt = Math.max(
        j,
        Math.min(tt, L.current.startLeft + q)
      ), it = Math.max(
        8,
        Math.min(rt - 100, L.current.startTop + X)
      );
      z({ x: yt, y: it });
    },
    [V, r]
  ), $ = dt(() => {
    L.current = null, E(!1);
  }, []), Q = m && d, lt = o.panelBg;
  return a ? l ? /* @__PURE__ */ S(
    "div",
    {
      ref: M,
      "data-sb-props-panel": !0,
      onPointerDown: (U) => U.stopPropagation(),
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "45vh",
        minHeight: 200,
        background: lt,
        borderRadius: "12px 12px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        color: o.text,
        fontSize: 12,
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        opacity: Q ? 0 : 1,
        transform: Q ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: Q ? "none" : "auto"
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
                  onPointerDown: (U) => U.stopPropagation(),
                  children: [
                    /* @__PURE__ */ h("span", { children: n.autoHide }),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: m,
                        onChange: (U) => y(U.target.checked),
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
              qi,
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
        width: er,
        background: lt,
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
        opacity: Q ? 0 : 1,
        transform: Q ? "translateY(-4px) scale(0.995)" : "translateY(0) scale(1)",
        transformOrigin: r ? "top left" : "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: Q ? "none" : "auto",
        cursor: D ? "grabbing" : "grab"
      },
      onPointerDownCapture: G,
      onPointerDown: (U) => U.stopPropagation(),
      onPointerMove: K,
      onPointerUp: $,
      onPointerCancel: $,
      children: [
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              cursor: D ? "grabbing" : "grab",
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
                  onPointerDown: (U) => U.stopPropagation(),
                  children: [
                    /* @__PURE__ */ h("span", { children: n.autoHide }),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: m,
                        onChange: (U) => y(U.target.checked),
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
              qi,
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
function Jp({ engine: t, registry: e, gifApiBaseUrl: o }) {
  const { isRTL: r } = Ut();
  return /* @__PURE__ */ S(kt, { children: [
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
          width: Ke,
          zIndex: 100
        },
        onPointerDown: (n) => n.stopPropagation(),
        children: /* @__PURE__ */ h(yp, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ h(Qp, { engine: t, registry: e })
  ] });
}
const gr = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function $p(t) {
  const e = t.viewport.zoom, o = gr.find((r) => r > e + 1e-3) ?? gr[gr.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function _p(t) {
  const e = t.viewport.zoom, o = [...gr].reverse().find((r) => r < e - 1e-3) ?? gr[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const tf = {
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
}, ue = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Re({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ h("path", { d: "M5 12h14", ...ue }),
    t === "plus" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M12 5v14", ...ue }),
      /* @__PURE__ */ h("path", { d: "M5 12h14", ...ue })
    ] }),
    t === "undo" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ue, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...ue, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ue, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...ue, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...ue }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...ue })
    ] }),
    t === "play" && /* @__PURE__ */ h("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...ue }),
      /* @__PURE__ */ h("path", { d: "M6 6V18M18 6V18", ...ue }),
      /* @__PURE__ */ h("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...ue })
    ] }),
    t === "gauge" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 15a8 8 0 1 1 16 0", ...ue }),
      /* @__PURE__ */ h("path", { d: "M12 15l4-4", ...ue }),
      /* @__PURE__ */ h("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "search" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "6", ...ue }),
      /* @__PURE__ */ h("path", { d: "M16 16l5 5", ...ue })
    ] }),
    t === "home" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M3 12l9-8 9 8", ...ue, fill: "none" }),
      /* @__PURE__ */ h("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...ue, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...ue, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function ef({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showPerfOverlay: r,
  onTogglePerfOverlay: n
}) {
  const s = Qt(), { labels: i } = Ut(), [a, l] = ot(t.viewport.zoom), [c, u] = ot(!1), [p, d] = ot(!1), [f, m] = ot(() => t.originView != null), [y, b] = ot(
    () => t.getAllNodes().filter((C) => C.type === "frame").length
  );
  vt(() => {
    const C = () => l(t.viewport.zoom), z = () => {
      u(t.canUndo()), d(t.canRedo());
    }, L = () => {
      b(t.getAllNodes().filter((D) => D.type === "frame").length), m(t.originView != null);
    };
    return t.on("viewport", C), t.on("history", z), t.on("change", L), t.on("node:create", L), t.on("node:delete", L), () => {
      t.off("viewport", C), t.off("history", z), t.off("change", L), t.off("node:create", L), t.off("node:delete", L);
    };
  }, [t]);
  const x = s.panelBg, g = `1px solid ${s.border}`, k = {
    ...tf,
    borderRadius: s.panelBorderRadius
  }, M = {
    width: 1,
    height: 20,
    background: s.separator,
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
      onPointerDown: (C) => C.stopPropagation(),
      children: [
        /* @__PURE__ */ S("div", { style: { ...k, background: x, border: g, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: i.zoomOut,
              onClick: () => _p(t),
              style: { ...Pe, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ h(Re, { name: "minus" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ S(
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
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: i.zoomIn,
              onClick: () => $p(t),
              style: { ...Pe, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ h(Re, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { style: { ...k, background: x, border: g, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: i.fitToContent,
              onClick: () => t.fitToContent(),
              style: { ...Pe, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ h(Re, { name: "fit" })
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
                ...Pe,
                width: 32,
                height: 32,
                color: s.textMuted
              },
              children: /* @__PURE__ */ h(Re, { name: "search" })
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
              style: { ...Pe, width: 32, height: 32, color: f ? s.accentColor : s.textFaint },
              children: /* @__PURE__ */ h(Re, { name: f ? "bookmark-fill" : "bookmark" })
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
              style: { ...Pe, width: 32, height: 32, color: f ? s.text : s.textFaint },
              children: /* @__PURE__ */ h(Re, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { style: { ...k, overflow: "visible", background: x, border: g, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: i.presentSlides,
              onClick: () => t.enterPresentation(),
              style: { ...Pe, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ h(Re, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ S(kt, { children: [
            /* @__PURE__ */ h("div", { style: M }),
            /* @__PURE__ */ S(
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
                  /* @__PURE__ */ h(Re, { name: "slides" }),
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
          n && /* @__PURE__ */ S(kt, { children: [
            /* @__PURE__ */ h("div", { style: M }),
            /* @__PURE__ */ h(
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
                children: /* @__PURE__ */ h(Re, { name: "gauge" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ S("div", { style: { ...k, background: x, border: g, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: i.undo,
              onClick: () => t.undo(),
              disabled: !c,
              style: { ...Pe, width: 32, height: 32, color: c ? s.text : s.textFaint },
              children: /* @__PURE__ */ h(Re, { name: "undo" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: i.redo,
              onClick: () => t.redo(),
              disabled: !p,
              style: { ...Pe, width: 32, height: 32, color: p ? s.text : s.textFaint },
              children: /* @__PURE__ */ h(Re, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
function of(t) {
  return t.matches.length === 0 ? "0/0" : `${t.activeIndex >= 0 ? t.activeIndex + 1 : 0}/${t.matches.length}`;
}
function rf({ engine: t }) {
  const e = Qt(), { labels: o } = Ut(), [r, n] = ot(!1), [s, i] = ot(() => t.getSearchState()), a = ht(null), l = Vt(() => of(s), [s]);
  return vt(() => {
    const c = () => i(t.getSearchState()), u = () => {
      n(!0), requestAnimationFrame(() => {
        var d;
        return (d = a.current) == null ? void 0 : d.focus();
      });
    }, p = document;
    return t.on("search", c), p.addEventListener("sb:search-open", u), () => {
      t.off("search", c), p.removeEventListener("sb:search-open", u);
    };
  }, [t]), vt(() => {
    const c = (u) => {
      (u.ctrlKey || u.metaKey) && u.key.toLowerCase() === "f" && (u.preventDefault(), n(!0), requestAnimationFrame(() => {
        var d;
        return (d = a.current) == null ? void 0 : d.focus();
      }));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, []), vt(() => {
    if (!r) return;
    const c = (u) => {
      var d;
      (u.ctrlKey || u.metaKey) && u.key.toLowerCase() === "f" ? (u.preventDefault(), (d = a.current) == null || d.focus()) : u.key === "Escape" && (u.preventDefault(), s.query ? t.clearSearch() : n(!1));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, [t, r, s.query]), r ? /* @__PURE__ */ S(
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
const qn = 240, Ui = 6;
function Un(t) {
  const o = t.getAllNodes().filter((u) => u.type === "frame");
  if (o.length === 0) return [];
  const r = o.map((u) => ({
    id: u.id,
    x: u.x,
    y: u.y,
    slideOrder: u.data.slideOrder,
    label: u.data.label || "",
    borderColor: u.data.borderColor,
    transition: u.data.transition,
    transitionDuration: u.data.transitionDuration
  })), n = r.filter((u) => u.slideOrder != null).sort((u, p) => u.slideOrder - p.slideOrder), s = r.filter((u) => u.slideOrder == null), i = 100;
  s.sort((u, p) => u.y - p.y);
  const a = [];
  for (const u of s) {
    const p = a[a.length - 1];
    p && Math.abs(u.y - p[0].y) < i ? p.push(u) : a.push([u]);
  }
  const l = a.flatMap((u) => u.sort((p, d) => p.x - d.x));
  return [...n, ...l].map((u, p) => ({
    id: u.id,
    label: u.label || `Frame ${p + 1}`,
    order: p + 1,
    slideOrder: u.slideOrder,
    borderColor: u.borderColor,
    transition: u.transition,
    transitionDuration: u.transitionDuration
  }));
}
const nf = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function sf() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...nf }) });
}
function af(t, e, o) {
  const [r, n] = ot("");
  return vt(() => {
    let s = !1;
    return Eu(t, e).then((i) => {
      s || n(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), r;
}
function lf({ engine: t, frameId: e, tick: o }) {
  const r = af(t, e, o);
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
const cf = ["pan", "fade", "dissolve", "zoom", "fold", "cube", "none"];
function Zi({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ h("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ h("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ h("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ h("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ h("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ h("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ h("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ h("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const df = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function hf({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: r,
  theme: n,
  labels: s
}) {
  const [i, a] = ot(!1), [l, c] = ot(!1), u = ht(null), p = ht(null), d = t !== "none", f = e ?? yr[t], m = {
    pan: s.transitionPan,
    fade: s.transitionFadeToBlack,
    dissolve: s.transitionDissolve,
    zoom: s.transitionZoom,
    fold: s.transitionFold,
    cube: s.transitionCube,
    none: s.transitionNoneInstant
  };
  vt(() => {
    if (!i && !l) return;
    const b = (x) => {
      i && u.current && !u.current.contains(x.target) && a(!1), l && p.current && !p.current.contains(x.target) && c(!1);
    };
    return document.addEventListener("mousedown", b), () => document.removeEventListener("mousedown", b);
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
        zIndex: i || l ? 50 : void 0
      },
      children: [
        /* @__PURE__ */ h("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: n.border } }),
        /* @__PURE__ */ S("div", { ref: u, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            a((b) => !b), c(!1);
          }, style: y, children: [
            /* @__PURE__ */ h(Zi, { type: t }),
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
              children: cf.map((b) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    o(b), a(!1);
                  },
                  style: {
                    border: "none",
                    background: b === t ? n.controlBgActive : "transparent",
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
                    /* @__PURE__ */ h(Zi, { type: b }),
                    m[b]
                  ]
                },
                b
              ))
            }
          )
        ] }),
        d && /* @__PURE__ */ S("div", { ref: p, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            c((b) => !b), a(!1);
          }, style: y, children: [
            /* @__PURE__ */ S("span", { children: [
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
              children: df.map((b) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    r(b === yr[t] ? void 0 : b), c(!1);
                  },
                  style: {
                    border: "none",
                    background: b === f ? n.controlBgActive : "transparent",
                    color: n.text,
                    borderRadius: 4,
                    padding: "4px 8px",
                    fontSize: 10,
                    cursor: "pointer",
                    textAlign: "center",
                    width: "100%"
                  },
                  children: [
                    b,
                    "ms",
                    b === yr[t] ? " •" : ""
                  ]
                },
                b
              ))
            }
          )
        ] })
      ]
    }
  );
}
function uf({ engine: t, open: e, onClose: o }) {
  const r = Qt(), { isRTL: n, labels: s } = Ut(), [i, a] = ot(() => Un(t)), [l, c] = ot(() => new Set(t.selection)), [u, p] = ot(0), d = fn(t, "frames-panel"), f = ht(null), m = ht(null), y = ht(0), b = ht(!1), x = ht(i);
  x.current = i;
  const g = ht(!1), k = ht(!1), [M, C] = ot(null), [z, L] = ot(null), [D, E] = ot(0), V = ht([]), J = ht(null), nt = dt(() => {
    if (g.current) return;
    const $ = Un(t);
    a($);
  }, [t]), mt = dt(() => {
    c(new Set(t.selection));
  }, [t]), ft = ht(null), Z = dt(() => {
    ft.current && clearTimeout(ft.current), ft.current = setTimeout(() => p(($) => $ + 1), 500);
  }, []);
  vt(() => {
    nt(), mt();
    const $ = setTimeout(() => p((lt) => lt + 1), 200), Q = () => {
      nt(), Z();
    };
    return t.on("change", Q), t.on("node:create", Q), t.on("node:delete", Q), t.on("node:data", Q), t.on("selection", mt), t.on("history", Q), () => {
      clearTimeout($), t.off("change", Q), t.off("node:create", Q), t.off("node:delete", Q), t.off("node:data", Q), t.off("selection", mt), t.off("history", Q), ft.current && clearTimeout(ft.current);
    };
  }, [t, nt, mt, Z]), vt(() => {
    if (!J.current) return;
    const $ = J.current.querySelectorAll("[data-frame-card]");
    V.current = Array.from($).map((Q) => Q.offsetHeight + Ui);
  }, [i]);
  const G = dt(
    ($) => {
      t.select($), t.zoomToNode($, 0.8);
    },
    [t]
  ), K = dt(
    ($, Q) => {
      $.preventDefault(), $.stopPropagation(), y.current = $.clientY, f.current = Q, m.current = Q, b.current = !1;
    },
    []
  );
  return vt(() => {
    const $ = (lt) => {
      if (f.current === null) return;
      const U = lt.clientY - y.current;
      if (!b.current) {
        if (Math.abs(U) < 4) return;
        b.current = !0, C(f.current), L(f.current);
      }
      E(U);
      const q = V.current, X = f.current;
      let et = X;
      if (U > 0) {
        let rt = 0;
        for (let j = X + 1; j < x.current.length && (rt += q[j] || 0, U > rt - (q[j] || 0) / 2); j++)
          et = j;
      } else if (U < 0) {
        let rt = 0;
        for (let j = X - 1; j >= 0 && (rt -= q[j] || 0, U < rt + (q[j] || 0) / 2); j--)
          et = j;
      }
      m.current = et, L(et);
    }, Q = () => {
      const lt = f.current, U = m.current;
      if (lt !== null && U !== null && lt !== U) {
        g.current = !0;
        const q = [...x.current], [X] = q.splice(lt, 1);
        q.splice(U, 0, X);
        let et = !0;
        for (let rt = 0; rt < q.length; rt++) {
          const j = q[rt], tt = t.getNode(j.id);
          tt && (et ? (t.updateNodeWithHistory(j.id, {
            data: { ...tt.data, slideOrder: rt + 1 }
          }), et = !1) : t.updateNode(j.id, {
            data: { ...tt.data, slideOrder: rt + 1 }
          }));
        }
        g.current = !1, k.current = !0, a(Un(t)), p((rt) => rt + 1);
      }
      f.current = null, m.current = null, b.current = !1, C(null), L(null), E(0), k.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          k.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", $), document.addEventListener("pointerup", Q), document.addEventListener("pointercancel", Q), () => {
      document.removeEventListener("pointermove", $), document.removeEventListener("pointerup", Q), document.removeEventListener("pointercancel", Q);
    };
  }, [t]), /* @__PURE__ */ S(
    "div",
    {
      "data-sb-frames-panel": !0,
      style: {
        position: "absolute",
        top: 0,
        right: n ? void 0 : 0,
        left: n ? 0 : void 0,
        bottom: 0,
        width: qn,
        background: r.panelBg,
        borderLeft: n ? void 0 : `1px solid ${r.border}`,
        borderRight: n ? `1px solid ${r.border}` : void 0,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : n ? `translateX(-${qn}px)` : `translateX(${qn}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: ($) => $.stopPropagation(),
      children: [
        /* @__PURE__ */ S(
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
              /* @__PURE__ */ S("span", { style: { fontSize: 12, fontWeight: 600, color: r.text, letterSpacing: "0.02em" }, children: [
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
                  children: /* @__PURE__ */ h(sf, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ S(
          "div",
          {
            ref: J,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: Ui
            },
            children: [
              i.length === 0 && /* @__PURE__ */ h("div", { style: { padding: "20px 8px", textAlign: "center", color: r.textMuted, fontSize: 11 }, children: s.noFramesYet }),
              i.map(($, Q) => {
                const lt = l.has($.id), U = M === Q;
                let q = 0;
                if (U)
                  q = D;
                else if (M !== null && z !== null) {
                  const rt = V.current;
                  M < z ? Q > M && Q <= z && (q = -(rt[M] || 0)) : M > z && Q >= z && Q < M && (q = rt[M] || 0);
                }
                const X = (rt) => {
                  const j = t.getNode($.id);
                  if (!j) return;
                  const tt = `${d()}:${$.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    $.id,
                    {
                      data: {
                        ...j.data,
                        transition: rt === "pan" ? void 0 : rt,
                        transitionDuration: void 0
                      }
                    },
                    tt
                  );
                }, et = (rt) => {
                  const j = t.getNode($.id);
                  if (!j) return;
                  const tt = `${d()}:${$.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    $.id,
                    {
                      data: { ...j.data, transitionDuration: rt }
                    },
                    tt
                  );
                };
                return /* @__PURE__ */ S(Bl.Fragment, { children: [
                  M === null && /* @__PURE__ */ h(
                    hf,
                    {
                      value: $.transition ?? "pan",
                      durationMs: $.transitionDuration,
                      onChange: X,
                      onDurationChange: et,
                      theme: r,
                      labels: s
                    }
                  ),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: (rt) => K(rt, Q),
                      onDoubleClick: () => G($.id),
                      style: {
                        borderRadius: 6,
                        border: lt ? `2px solid ${$.borderColor || r.text}` : `1px solid ${r.border}`,
                        background: lt ? r.controlBgActive : "transparent",
                        cursor: U ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transition: U || k.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${q}px)`,
                        zIndex: U ? 10 : 1,
                        opacity: U ? 0.92 : 1,
                        boxShadow: U ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ h(lf, { engine: t, frameId: $.id, tick: u })
                    }
                  )
                ] }, $.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const Io = 50, Zn = 30, pf = `
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
`, ff = `
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
function Qi(t, e, o) {
  const r = t.createShader(e);
  return r ? (t.shaderSource(r, o), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (t.deleteShader(r), null)) : null;
}
function yf(t, e, o) {
  const r = Qi(t, t.VERTEX_SHADER, e), n = Qi(t, t.FRAGMENT_SHADER, o);
  if (!r || !n) return null;
  const s = t.createProgram();
  return t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function gf() {
  const t = [], e = [];
  for (let o = 0; o <= Zn; o++)
    for (let r = 0; r <= Io; r++)
      t.push(r / Io, o / Zn * 2 - 1);
  for (let o = 0; o < Zn; o++)
    for (let r = 0; r < Io; r++) {
      const n = o * (Io + 1) + r;
      e.push(n, n + Io + 1, n + 1, n + 1, n + Io + 1, n + Io + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function mf({ phase: t, progress: e }) {
  const o = ht(null), r = ht(null);
  return vt(() => {
    const n = o.current;
    if (!n) return;
    const s = window.devicePixelRatio || 1;
    n.width = n.clientWidth * s, n.height = n.clientHeight * s;
    const i = n.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const a = yf(i, pf, ff);
    if (!a) return;
    i.useProgram(a);
    const { vertices: l, indices: c } = gf(), u = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, u), i.bufferData(i.ARRAY_BUFFER, l, i.STATIC_DRAW);
    const p = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, p), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const d = i.getAttribLocation(a, "aUV");
    i.enableVertexAttribArray(d), i.vertexAttribPointer(d, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const f = (m) => i.getUniformLocation(a, m);
    return r.current = {
      gl: i,
      locs: { uLayPos: f("uLayPos"), uRadius: f("uRadius"), uSide: f("uSide"), uColor: f("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(a), i.deleteBuffer(u), i.deleteBuffer(p), r.current = null;
    };
  }, []), vt(() => {
    const n = r.current;
    if (!n) return;
    const { gl: s, locs: i, count: a } = n, l = t === "out" ? 1 - Math.pow(1 - e, 3) : Math.pow(e, 3), c = t === "out" ? 1 - l : l, u = 0.07 + 0.16 * c;
    s.viewport(0, 0, s.canvas.width, s.canvas.height), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.uniform1f(i.uLayPos, c), s.uniform1f(i.uRadius, u), s.uniform1f(i.uSide, 1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, a, s.UNSIGNED_SHORT, 0), s.uniform1f(i.uSide, -1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, a, s.UNSIGNED_SHORT, 0);
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
const bf = {
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
}, Qn = {
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
}, gs = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Ji({ dir: t }) {
  return /* @__PURE__ */ S("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ h("polyline", { points: "15,18 9,12 15,6", ...gs }),
    t === "right" && /* @__PURE__ */ h("polyline", { points: "9,6 15,12 9,18", ...gs })
  ] });
}
function xf() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...gs }) });
}
function $i(t) {
  return 1 - Math.pow(1 - t, 3);
}
function _i(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function ta(t, e) {
  let r;
  t <= 0.2 ? r = 1 + (0.55 - 1) * $i(t / 0.2) : t >= 0.8 ? r = 0.55 + (1 - 0.55) * $i((t - 0.8) / 0.2) : r = 0.55;
  let n;
  return t <= 0.1 ? n = 0 : t <= 0.5 ? n = -e * 90 * _i((t - 0.1) / 0.4) : t <= 0.9 ? n = e * 90 * (1 - _i((t - 0.5) / 0.4)) : n = 0, { zoom: r, angle: n };
}
function wf(t, e, o, r) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${r}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function ea(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function kf({ engine: t }) {
  const [e, o] = ot(t.presentationMode), [r, n] = ot(t.presentationIndex), [s, i] = ot(t.presentationSlides.length), [a, l] = ot(""), [c, u] = ot(t.transitionOverlay), p = ht(null), d = ht(null);
  if (vt(() => {
    const m = document.querySelector("[data-sb-canvas]");
    p.current = m, d.current = (m == null ? void 0 : m.parentElement) ?? null;
    const y = () => {
      var k;
      if (o(t.presentationMode), n(t.presentationIndex), i(t.presentationSlides.length), u(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const M = t.presentationSlides[t.presentationIndex], C = t.getNode(M);
        l(((k = C == null ? void 0 : C.data) == null ? void 0 : k.label) || "");
      } else
        l("");
      const b = t.transitionOverlay, x = p.current, g = d.current;
      if (x && g && b && b.type === "cube" && b.t != null) {
        const M = b.direction ?? 1, { zoom: C, angle: z } = ta(b.t, M);
        wf(x, g, C, z);
      } else x && g && ea(x, g);
    };
    return t.on("presentation", y), () => {
      t.off("presentation", y);
      const b = p.current, x = d.current;
      b && x && ea(b, x);
    };
  }, [t]), !e || s === 0) return null;
  const f = c && c.type === "cube" && c.t != null ? (() => {
    const m = c.direction ?? 1, { angle: y } = ta(c.t, m);
    return Math.abs(y) / 90 * 0.4;
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
        c && c.type === "fold" && /* @__PURE__ */ h(mf, { phase: c.phase, progress: c.progress }),
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
        /* @__PURE__ */ S("div", { style: bf, onPointerDown: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...Qn, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ h(xf, {})
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...Qn, opacity: r <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: r <= 0,
              children: /* @__PURE__ */ h(Ji, { dir: "left" })
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
                r + 1,
                " / ",
                s,
                a && /* @__PURE__ */ S("span", { style: { opacity: 0.6, marginLeft: 8 }, children: [
                  "— ",
                  a
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...Qn, opacity: r >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: r >= s - 1,
              children: /* @__PURE__ */ h(Ji, { dir: "right" })
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
function xe(t, e) {
  return { label: t, value: e };
}
function vf() {
  const t = Qt(), { labels: e } = Ut(), [o, r] = ot(() => ge.getSnapshot());
  vt(() => {
    let s = 0;
    const i = (l) => {
      ge.tick(l), s = requestAnimationFrame(i);
    };
    s = requestAnimationFrame(i);
    const a = ge.subscribe(() => r(ge.getSnapshot()));
    return () => {
      cancelAnimationFrame(s), a();
    };
  }, []);
  const n = Vt(
    () => [
      xe(e.perfVirtualization, o.virtualizationActive ? e.perfOn : e.perfOff),
      xe(e.perfFps, o.fps.toFixed(1)),
      xe(e.perfFrameP50P95, `${no(o.frameMsP50)} / ${no(o.frameMsP95)}`),
      xe(e.perfCullingP50P95, `${no(o.cullingMsP50)} / ${no(o.cullingMsP95)}`),
      xe(e.perfHitTestP50P95, `${no(o.hitTestMsP50)} / ${no(o.hitTestMsP95)}`),
      xe(e.perfEdgeHitP50P95, `${no(o.edgeHitMsP50)} / ${no(o.edgeHitMsP95)}`),
      xe(e.perfHitTestCalls, o.hitTestCallsPerSec.toFixed(1)),
      xe(e.perfEdgeHitCalls, o.edgeHitCallsPerSec.toFixed(1)),
      xe(e.perfVisibleNodes, `${o.visibleNodes} / ${o.totalNodes}`),
      xe(e.perfVisibleEdges, `${o.visibleEdges} / ${o.totalEdges}`),
      xe(e.perfSeedVisibleNodes, String(o.seedVisibleNodes)),
      xe(e.perfNodesAdjacency, String(o.nodesAddedByAdjacency)),
      xe(e.perfNodesEdgeEndpoints, String(o.nodesAddedByEdgeEndpoints)),
      xe(e.perfEdgesAdjacency, String(o.edgesAddedByAdjacency)),
      xe(e.perfEdgesCrossing, String(o.edgesAddedByCrossing))
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
        /* @__PURE__ */ h("div", { style: { padding: "8px 10px", display: "grid", rowGap: 4 }, children: n.map((s) => /* @__PURE__ */ S("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
          /* @__PURE__ */ h("span", { style: { color: t.textMuted }, children: s.label }),
          /* @__PURE__ */ h("span", { children: s.value })
        ] }, s.label)) })
      ]
    }
  );
}
const Sf = Ol(() => import("./DebugPanel-BocJYJkC.js"));
function Gf({
  nodeTypes: t = kh,
  engine: e,
  keyboardShortcuts: o = !0,
  style: r,
  initialData: n,
  toolbar: s = !0,
  debugPanel: i = !1,
  debugBoards: a,
  theme: l,
  onPresentationChange: c,
  gifApiBaseUrl: u,
  direction: p,
  localization: d
}) {
  const f = Vt(
    () => e ?? new Gc(),
    [e]
  ), m = Vt(() => new Yc(t), [t]);
  vt(() => kc(), []), vt(() => {
    f.setRegistry(m);
  }, [f, m]), vt(() => {
    for (const V of t)
      V.isContainer && f.registerContainerType(V.type);
  }, [f, t]);
  const y = ht(!1);
  vt(() => {
    n && !y.current && (y.current = !0, f.fromSBD(n));
  }, [f, n]);
  const b = ht(null);
  vt(() => {
    if (o)
      return uu(f, b.current);
  }, [f, o]);
  const x = Vt(() => t.some((J) => {
    var nt;
    return (nt = J.ports) == null ? void 0 : nt.length;
  }) ? new vh(f, m) : null, [f, m, t]);
  vt(() => {
    if (x)
      return x.connect();
  }, [x]);
  const g = Vt(
    () => l ? { ...cs, ...l } : cs,
    [l]
  ), k = Uh(p, d), [M, C] = ot(!1), [z, L] = ot(!1), [D, E] = ot(!1);
  return vt(() => {
    ge.setEnabled(D);
  }, [D]), vt(() => {
    const V = () => {
      const J = f.presentationMode;
      C(J), c == null || c(J);
    };
    return f.on("presentation", V), () => f.off("presentation", V);
  }, [f, c]), /* @__PURE__ */ h(Va.Provider, { value: k, children: /* @__PURE__ */ h(Ra.Provider, { value: g, children: /* @__PURE__ */ S(
    "div",
    {
      ref: b,
      dir: k.dir,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        ...r
      },
      children: [
        s && !M && /* @__PURE__ */ h(Jp, { engine: f, registry: m, gifApiBaseUrl: u }),
        i && /* @__PURE__ */ h(Hl, { fallback: null, children: /* @__PURE__ */ h(Sf, { engine: f, extraBoards: a }) }),
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !M && !k.isRTL ? Ke : 0,
              top: 0,
              right: s && !M && k.isRTL ? Ke : 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ h(Hu, { engine: f, schema: bs, registry: m, dataFlow: x }),
              !M && /* @__PURE__ */ h(rf, { engine: f }),
              !M && /* @__PURE__ */ h(
                ef,
                {
                  engine: f,
                  framesPanelOpen: z,
                  onToggleFramesPanel: () => L((V) => !V),
                  showPerfOverlay: D,
                  onTogglePerfOverlay: () => E((V) => !V)
                }
              ),
              !M && D && /* @__PURE__ */ h(vf, {}),
              !M && /* @__PURE__ */ h(
                uf,
                {
                  engine: f,
                  open: z,
                  onClose: () => L(!1)
                }
              ),
              /* @__PURE__ */ h(kf, { engine: f })
            ]
          }
        )
      ]
    }
  ) }) });
}
const Mf = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], $o = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, ne = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function fr({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...ne }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ...ne })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...ne }),
    t === "text" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M7 4h10", ...ne }),
      /* @__PURE__ */ h("path", { d: "M12 4v16", ...ne })
    ] }),
    t === "note" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ...ne }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...ne }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...ne, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...ne, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...ne, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...ne }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ...ne })
    ] }),
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...ne }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...ne }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...ne }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...ne }),
    t === "arrow" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...ne }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...ne, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ne, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...ne, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ne, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...ne, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ...ne }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...ne }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...ne })
    ] }),
    t === "fit" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...ne }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...ne })
    ] })
  ] });
}
function Yf({ engine: t }) {
  const [e, o] = ot(t.mode), [r, n] = ot(!1), [s, i] = ot(!1), [a, l] = ot(t.boardBackground);
  return vt(() => {
    const c = () => o(t.mode), u = () => {
      n(t.canUndo()), i(t.canRedo());
    }, p = () => l(t.boardBackground);
    return t.on("mode", c), t.on("history", u), t.on("background", p), () => {
      t.off("mode", c), t.off("history", u), t.off("background", p);
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
        Mf.map((c) => /* @__PURE__ */ h(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...$o,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(fr, { name: c.key })
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
              ...$o,
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
              ...$o,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(fr, { name: "print" })
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
              ...$o,
              width: 36,
              height: 36,
              background: "transparent",
              color: r ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(fr, { name: "undo" })
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...$o,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(fr, { name: "redo" })
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
              ...$o,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(fr, { name: "fit" })
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
], Cf = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], If = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], _o = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], zf = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], tr = [1, 2.5, 5, 10, 20], Tf = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], Pf = [14, 20, 28, 36], Af = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Jn = 300, Kt = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, qt = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0
}, $t = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
};
function jf({
  engine: t,
  registry: e
}) {
  const [o, r] = ot(t.mode), [n, s] = ot(t.selection), [, i] = ot(0), [a, l] = ot(null), c = ht(null), u = ht(null), [p, d] = ot(!1), f = dt(() => {
    var at;
    return { x: (((at = c.current) == null ? void 0 : at.ownerDocument.defaultView) ?? window).innerWidth - Jn - 12, y: 12 };
  }, []), m = a ?? f();
  vt(() => {
    const v = () => r(t.mode), at = () => {
      s(new Set(t.selection)), i((de) => de + 1);
    }, re = () => i((de) => de + 1);
    return t.on("mode", v), t.on("selection", at), t.on("change", re), () => {
      t.off("mode", v), t.off("selection", at), t.off("change", re);
    };
  }, [t]);
  const y = dt((v) => {
    v.stopPropagation(), d(!0);
    const at = a ? a.x : f().x, re = a ? a.y : f().y;
    u.current = { startX: v.clientX, startY: v.clientY, startLeft: at, startTop: re }, v.currentTarget.setPointerCapture(v.pointerId);
  }, [a, f]);
  vt(() => {
    var de;
    const v = (Je) => {
      var xo;
      if (!u.current) return;
      const go = Je.clientX - u.current.startX, mo = Je.clientY - u.current.startY, Ge = ((xo = c.current) == null ? void 0 : xo.ownerDocument.defaultView) ?? window, Xo = Math.max(48, Math.min(Ge.innerWidth - Jn - 8, u.current.startLeft + go)), bo = Math.max(8, Math.min(Ge.innerHeight - 100, u.current.startTop + mo));
      l({ x: Xo, y: bo });
    }, at = () => {
      u.current = null, d(!1);
    }, re = ((de = c.current) == null ? void 0 : de.ownerDocument) ?? document;
    return re.addEventListener("pointermove", v), re.addEventListener("pointerup", at), re.addEventListener("pointercancel", at), () => {
      re.removeEventListener("pointermove", v), re.removeEventListener("pointerup", at), re.removeEventListener("pointercancel", at);
    };
  }, []);
  const b = Vt(() => n.size === 1 ? Array.from(n)[0] : o === "draw" || o === "shape" || o === "text" || o === "edge" ? "tool" : "none", [n, o]), x = fn(t, b), g = (() => {
    if (n.size === 1) {
      const v = Array.from(n)[0], at = t.getNode(v);
      if ((at == null ? void 0 : at.type) === "shape") return { kind: "shape", node: at };
      if ((at == null ? void 0 : at.type) === "draw") return { kind: "draw", node: at };
      if ((at == null ? void 0 : at.type) === "text") return { kind: "text", node: at };
      if ((at == null ? void 0 : at.type) === "edge") return { kind: "edge", node: at };
      if ((at == null ? void 0 : at.type) === "image") return { kind: "image", node: at };
      if ((at == null ? void 0 : at.type) === "content") return { kind: "content", node: at };
      if ((at == null ? void 0 : at.type) === "frame") return { kind: "frame", node: at };
      if ((at == null ? void 0 : at.type) === "sticky") return { kind: "sticky", node: at };
      if (at && e) {
        const re = e.get(at.type);
        if (re != null && re.propertiesPanel)
          return { kind: "custom", node: at, PanelComponent: re.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" || o === "edge" ? { kind: "tool" } : null;
  })(), k = dt(
    (v) => {
      if (!g || g.kind !== "shape") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  ), M = dt(
    (v) => {
      if (!g || g.kind !== "draw") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  ), C = dt(
    (v) => {
      if (!g || g.kind !== "text") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  ), z = dt(
    (v) => {
      if (!g || g.kind !== "edge") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  ), L = dt(
    (v) => {
      if (!g || g.kind !== "image") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  ), D = dt(
    (v) => {
      if (!g || g.kind !== "content") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  ), E = dt(
    (v) => {
      if (!g || g.kind !== "frame") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  ), V = dt(
    (v) => {
      if (!g || g.kind !== "sticky") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  ), J = dt(
    (v) => {
      if (!g || g.kind !== "custom") return;
      const at = x();
      t.updateNodeWithHistoryCoalesced(
        g.node.id,
        {
          data: { ...g.node.data, ...v }
        },
        at
      );
    },
    [t, g, x]
  );
  if (!g) return null;
  const nt = g.kind === "custom", mt = g.kind === "shape", ft = g.kind === "draw", Z = g.kind === "text", G = g.kind === "edge", K = g.kind === "image", $ = g.kind === "content", Q = g.kind === "frame", lt = g.kind === "sticky", U = g.kind === "tool", q = U && o === "shape", X = U && o === "text", et = Z ? g.node.data.fontFamily : t.activeTool.fontFamily ?? lo, rt = Z ? g.node.data.fontSize : t.activeTool.fontSize ?? 20, j = Z ? g.node.data.align : t.activeTool.textAlign ?? "left", tt = Z ? g.node.data.color : t.activeTool.color, yt = mt ? g.node.data.stroke : ft ? g.node.data.color : t.activeTool.color, it = mt || ft ? g.node.data.fill ?? null : t.activeTool.fillColor ?? null, gt = mt || ft ? g.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", ut = mt || ft ? g.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", St = mt || ft ? g.node.data.strokeWidth : t.activeTool.width, Ct = mt ? g.node.data.roughness : t.activeTool.roughness ?? 1, Wt = mt || ft || Z || K || $ || Q || lt ? g.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Ft = (() => {
    const v = /* @__PURE__ */ new Set(), at = [];
    for (const re of t.getAllNodes())
      if (re.type === "text") {
        const de = re.data.fontFamily;
        de && !v.has(de) && (v.add(de), at.push(de));
      }
    return at;
  })(), Rt = !Z && !X && !G && !K && !$ && !Q && !lt && !nt, ct = Rt, ee = Rt, te = mt || q, oe = Z || X, ce = (v) => {
    mt ? k({ stroke: v }) : ft ? M({ color: v }) : (t.activeTool.color = v, i((at) => at + 1));
  }, Ce = (v) => {
    mt ? k({ fill: v ?? void 0 }) : ft ? M({ fill: v ?? void 0 }) : (t.activeTool.fillColor = v ?? void 0, i((at) => at + 1));
  }, we = (v) => {
    mt ? k({ fillStyle: v }) : ft ? M({ fillStyle: v }) : (t.activeTool.fillStyle = v, i((at) => at + 1));
  }, be = (v) => {
    mt ? k({ strokeStyle: v }) : ft ? M({ strokeStyle: v }) : (t.activeTool.strokeStyle = v, i((at) => at + 1));
  }, Ho = (v) => {
    mt ? k({ strokeWidth: v }) : ft ? M({ strokeWidth: v }) : (t.activeTool.width = v, i((at) => at + 1));
  }, Oo = (v) => {
    mt ? k({ roughness: v }) : (t.activeTool.roughness = v, i((at) => at + 1));
  }, fe = (v) => {
    mt ? k({ opacity: v }) : ft ? M({ opacity: v }) : Z ? C({ opacity: v }) : K ? L({ opacity: v }) : $ ? D({ opacity: v }) : Q ? E({ opacity: v }) : lt ? V({ opacity: v }) : (t.activeTool.opacity = v, i((at) => at + 1));
  }, he = (v) => {
    Z ? C({ fontFamily: v }) : (t.activeTool.fontFamily = v, i((at) => at + 1));
  }, Xe = (v) => {
    Z ? C({ fontSize: v }) : (t.activeTool.fontSize = v, i((at) => at + 1));
  }, lr = (v) => {
    Z ? C({ align: v }) : (t.activeTool.textAlign = v, i((at) => at + 1));
  }, ae = (v) => {
    Z ? C({ color: v }) : (t.activeTool.color = v, i((at) => at + 1));
  }, Te = {
    position: "fixed",
    left: m.x,
    top: m.y,
    width: Jn,
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
      style: Te,
      onPointerDown: (v) => v.stopPropagation(),
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
        oe && /* @__PURE__ */ S(kt, { children: [
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Font" }),
            /* @__PURE__ */ h(
              mn,
              {
                value: et,
                onChange: he,
                fontsInScene: Ft
              }
            )
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Size" }),
            Pf.map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Xe(v),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: rt === v ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: v
              },
              v
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Align" }),
            Af.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.key,
                onClick: () => lr(v.key),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: j === v.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: v.label
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Color" }),
            so.map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => ae(v),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v,
                  border: tt === v ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          Z && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Border" }),
            [null, ...so].map((v, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ borderColor: v ?? void 0 }),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === v ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
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
              v ?? "none"
            ))
          ] }),
          Z && g.node.data.borderColor && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Style" }),
            _o.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => C({ borderStyle: v.key }),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "solid") === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          Z && g.node.data.borderColor && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Width" }),
            tr.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: `${v}px`,
                onClick: () => C({ borderWidth: v }),
                style: {
                  ...$t,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(v, 1),
                      background: "white",
                      borderRadius: v / 2
                    }
                  }
                )
              },
              v
            ))
          ] })
        ] }),
        Rt && /* @__PURE__ */ S(kt, { children: [
          q && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Shape" }),
            Tf.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => {
                  t.activeTool.shapeType = v.key, i((at) => at + 1);
                },
                style: {
                  ...$t,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === v.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(Ef, { name: v.key })
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Stroke" }),
            so.map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => ce(v),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v,
                  border: yt === v ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          ct && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Fill" }),
            Cf.map((v, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Ce(v),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: it === v ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
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
              v ?? "none"
            ))
          ] }),
          ct && it && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Fill pattern" }),
            If.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => we(v.key),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: gt === v.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(Lf, { style: v.key })
              },
              v.key
            ))
          ] }),
          ee && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Stroke style" }),
            _o.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => be(v.key),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: ut === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Stroke width" }),
            tr.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: `${v}px`,
                onClick: () => Ho(v),
                style: {
                  ...$t,
                  width: 36,
                  height: 24,
                  background: St === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(v, 1),
                      background: "white",
                      borderRadius: v / 2
                    }
                  }
                )
              },
              v
            ))
          ] }),
          te && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Roughness" }),
            zf.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => Oo(v.value),
                style: {
                  ...$t,
                  height: 28,
                  padding: "0 8px",
                  background: Ct === v.value ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: v.label
              },
              v.value
            ))
          ] })
        ] }),
        G && /* @__PURE__ */ S(kt, { children: [
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Color" }),
            so.map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => z({ color: v }),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v,
                  border: g.node.data.color === v ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Style" }),
            _o.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => z({ style: v.key }),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: g.node.data.style === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Width" }),
            tr.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: `${v}px`,
                onClick: () => z({ strokeWidth: v }),
                style: {
                  ...$t,
                  width: 36,
                  height: 24,
                  background: g.node.data.strokeWidth === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(v, 1),
                      background: "white",
                      borderRadius: v / 2
                    }
                  }
                )
              },
              v
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => z({ arrowHead: v }),
                style: {
                  ...$t,
                  height: 28,
                  padding: "0 8px",
                  background: (g.node.data.arrowHead ?? "none") === v ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: v === "none" ? "None" : v === "arrow" ? "▷" : v === "filled" ? "▶" : "●"
              },
              v
            ))
          ] }),
          (g.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Head size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: g.node.data.arrowHeadSize ?? Math.max(8, g.node.data.strokeWidth * 3),
                onChange: (v) => z({ arrowHeadSize: Number(v.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: g.node.data.arrowHeadSize ?? Math.max(8, g.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => z({ arrowTail: v }),
                style: {
                  ...$t,
                  height: 28,
                  padding: "0 8px",
                  background: (g.node.data.arrowTail ?? "none") === v ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: v === "none" ? "None" : v === "arrow" ? "◁" : v === "filled" ? "◀" : "●"
              },
              v
            ))
          ] }),
          (g.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Tail size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: g.node.data.arrowTailSize ?? Math.max(8, g.node.data.strokeWidth * 3),
                onChange: (v) => z({ arrowTailSize: Number(v.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: g.node.data.arrowTailSize ?? Math.max(8, g.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: g.node.data.label ?? "",
                onChange: (v) => z({ label: v.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => z({ edgeType: v.key }),
                style: {
                  ...$t,
                  height: 28,
                  padding: "0 8px",
                  background: (g.node.data.edgeType ?? "bezier") === v.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: v.label
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Animate" }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => z({ animated: !g.node.data.animated }),
                style: {
                  ...$t,
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
          g.node.data.animated && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Direction" }),
            ["forward", "reverse", "both"].map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => z({ animatedDirection: v }),
                style: {
                  ...$t,
                  height: 28,
                  padding: "0 8px",
                  background: (g.node.data.animatedDirection ?? "forward") === v ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: v === "forward" ? "→" : v === "reverse" ? "←" : "⇆"
              },
              v
            ))
          ] })
        ] }),
        K && /* @__PURE__ */ S(kt, { children: [
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Border" }),
            [null, ...so].map((v, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => L({ borderColor: v ?? void 0 }),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === v ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
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
              v ?? "none"
            ))
          ] }),
          g.node.data.borderColor && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Style" }),
            _o.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => L({ borderStyle: v.key }),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "solid") === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          g.node.data.borderColor && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Width" }),
            tr.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: `${v}px`,
                onClick: () => L({ borderWidth: v }),
                style: {
                  ...$t,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(v, 1),
                      background: "white",
                      borderRadius: v / 2
                    }
                  }
                )
              },
              v
            ))
          ] })
        ] }),
        $ && /* @__PURE__ */ S(kt, { children: [
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Border" }),
            [null, ...so].map((v, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => D({ borderColor: v ?? void 0 }),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: (g.node.data.borderColor ?? null) === v ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
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
              v ?? "none"
            ))
          ] }),
          g.node.data.borderColor && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Style" }),
            _o.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => D({ borderStyle: v.key }),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "solid") === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          g.node.data.borderColor && /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Width" }),
            tr.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: `${v}px`,
                onClick: () => D({ borderWidth: v }),
                style: {
                  ...$t,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(v, 1),
                      background: "white",
                      borderRadius: v / 2
                    }
                  }
                )
              },
              v
            ))
          ] })
        ] }),
        Q && /* @__PURE__ */ S(kt, { children: [
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: g.node.data.label ?? "",
                onChange: (v) => E({ label: v.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Background" }),
            [null, ...so].map((v, at) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => E({ backgroundColor: v ? `${v}15` : void 0 }),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: (() => {
                    const re = g.node.data.backgroundColor;
                    return (v === null ? !re : re === `${v}15`) ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`;
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
              v ?? "none"
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Border" }),
            so.map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => E({ borderColor: v }),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v,
                  border: g.node.data.borderColor === v ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Style" }),
            _o.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: v.label,
                onClick: () => E({ borderStyle: v.key }),
                style: {
                  ...$t,
                  width: 36,
                  height: 28,
                  background: (g.node.data.borderStyle ?? "dashed") === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Width" }),
            tr.map((v) => /* @__PURE__ */ h(
              "button",
              {
                title: `${v}px`,
                onClick: () => E({ borderWidth: v }),
                style: {
                  ...$t,
                  width: 36,
                  height: 24,
                  background: (g.node.data.borderWidth ?? 1) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(v, 1),
                      background: "white",
                      borderRadius: v / 2
                    }
                  }
                )
              },
              v
            ))
          ] })
        ] }),
        lt && /* @__PURE__ */ S(kt, { children: [
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => V({ color: v }),
                style: {
                  ...$t,
                  width: 20,
                  height: 20,
                  background: v,
                  border: g.node.data.color === v ? "2px solid #1e1e2e" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: Kt, children: [
            /* @__PURE__ */ h("span", { style: qt, children: "Size" }),
            [12, 14, 16, 20, 24].map((v) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => V({ fontSize: v }),
                style: {
                  ...$t,
                  width: 32,
                  height: 24,
                  background: (g.node.data.fontSize ?? 16) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                  fontSize: 10,
                  color: "white"
                },
                children: v
              },
              v
            ))
          ] })
        ] }),
        nt && (() => {
          const { node: v, PanelComponent: at } = g;
          return /* @__PURE__ */ h(at, { node: v, data: v.data, engine: t, updateData: J });
        })(),
        !G && !nt && /* @__PURE__ */ S("div", { style: Kt, children: [
          /* @__PURE__ */ h("span", { style: qt, children: "Opacity" }),
          /* @__PURE__ */ h(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(Wt * 100),
              onChange: (v) => fe(parseInt(v.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ h("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(Wt * 100) })
        ] })
      ]
    }
  );
}
function Ef({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ S(kt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function Lf({ style: t }) {
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
export {
  Qt as A,
  lo as D,
  Yc as N,
  nr as P,
  Xf as S,
  Yf as T,
  ja as a,
  cs as b,
  vh as c,
  jf as d,
  Jp as e,
  Gf as f,
  Hu as g,
  Gc as h,
  kh as i,
  Jc as j,
  Zd as k,
  _d as l,
  lh as m,
  Pt as n,
  Sr as o,
  Ms as p,
  rh as q,
  ws as r,
  Sc as s,
  Mo as t,
  mc as u,
  uu as v,
  Jd as w,
  uh as x,
  ih as y,
  Ut as z
};
