var Lc = Object.defineProperty;
var Rc = (t, e, o) => e in t ? Lc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var vt = (t, e, o) => Rc(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as Dc, defaultBlockSpecs as Wc, BlockNoteEditor as Fc } from "@blocknote/core";
import { jsxs as S, jsx as h, Fragment as Ct } from "react/jsx-runtime";
import * as $ from "react";
import Bc, { memo as Le, useRef as ft, useState as rt, useEffect as Mt, useCallback as ct, Component as Nc, useMemo as Kt, useLayoutEffect as zo, useContext as Ye, createContext as mr, Suspense as Oc, lazy as Vc } from "react";
import { useCreateBlockNote as Xc } from "@blocknote/react";
import { BlockNoteView as Gc } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as Qe, flushSync as Yc } from "react-dom";
const jc = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Pt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += jc[o[t] & 63];
  return e;
};
const Zc = {
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
}, Kc = {
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
}, qc = {
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
}, Uc = {
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
}, Qc = {
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
}, Jc = {
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
}, $c = {
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
}, _c = {
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
}, td = {
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
}, ed = {
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
}, od = {
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
}, rd = {
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
}, Wa = [
  Zc,
  Kc,
  qc,
  Uc,
  Qc,
  Jc,
  $c,
  _c,
  td,
  ed,
  od,
  rd
];
class nd {
  constructor() {
    vt(this, "undoStack", []);
    vt(this, "redoStack", []);
    vt(this, "maxSize", 50);
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
const Fa = 4, sd = 8, Ba = 6, Na = 6, id = 10, ad = 14, ld = 24;
function vo(t, e, o, r) {
  if (!t.rotation) return [e, o];
  const n = t.x + t.w / 2, s = t.y + r / 2, i = -t.rotation * Math.PI / 180, l = Math.cos(i), d = Math.sin(i), c = e - n, a = o - s;
  return [n + c * l - a * d, s + c * d + a * l];
}
function Dr(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function cd(t, e, o, r) {
  const n = Dr(t, r), [s, i] = vo(t, e, o, n), l = t.x, d = t.y, c = t.w, a = n, f = s < l ? l - s : s > l + c ? s - (l + c) : 0, y = i < d ? d - i : i > d + a ? i - (d + a) : 0;
  return f === 0 && y === 0 ? Math.min(s - l, l + c - s, i - d, d + a - i) : Math.hypot(f, y);
}
function dd(t) {
  return Math.max(0.01, t);
}
function Br(t, e) {
  return t / dd(e);
}
function hd(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, a) => a.z - c.z);
  let l = null, d = null;
  for (const c of i)
    if (c.type === "draw") {
      if (Ys(c, e, o, r))
        return c;
    } else if (c.type === "shape") {
      if (Cn(c, e, o, r)) return c;
      if (!d && c.data.label) {
        const a = c.h === "auto" ? 100 : c.h, [f, y] = vo(c, e, o, a), p = Xa(c, a);
        p && f >= p.lx && f <= p.rx && y >= p.ly && y <= p.ry && (d = c);
      }
    } else if (s && s.has(c.type)) {
      const a = Dr(c, n);
      Oa(c, e, o, r, a) && (l || (l = c));
    } else {
      const a = Dr(c, n), f = Br(Math.max(Fa, Na), r), [y, p] = vo(c, e, o, a);
      y >= c.x - f && y <= c.x + c.w + f && p >= c.y - f && p <= c.y + a + f && (d || (d = c));
    }
  return d ?? l;
}
function Oa(t, e, o, r, n) {
  const s = n ?? (t.h === "auto" ? 100 : t.h), [i, l] = vo(t, e, o, s), d = r < 0.8 ? ad : id, c = Br(Math.max(sd, d), r);
  if (t.data.label && i >= t.x && i <= t.x + t.w && l >= t.y - ld && l <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || l < t.y - c || l > t.y + s + c)
    return !1;
  const f = Math.abs(i - t.x), y = Math.abs(i - (t.x + t.w)), p = Math.abs(l - t.y), u = Math.abs(l - (t.y + s)), m = i >= t.x - c && i <= t.x + t.w + c;
  return l >= t.y - c && l <= t.y + s + c && (f <= c || y <= c) || m && (p <= c || u <= c);
}
function Va(t, e, o, r, n, s) {
  const i = n - o, l = s - r, d = i * i + l * l;
  if (d === 0) return (t - o) ** 2 + (e - r) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * l) / d)), a = o + c * i, f = r + c * l;
  return (t - a) ** 2 + (e - f) ** 2;
}
function Xa(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const r = o.labelFontSize ?? 14, n = r * 1.3, s = r * 0.55, l = t.w - 12 * 2, d = o.label.split(`
`);
  let c = 0;
  for (const u of d) {
    const m = u.length * s;
    c += Math.max(1, Math.ceil(m / Math.max(l, 1)));
  }
  const a = c * n, f = Math.min(l, Math.max(...d.map((u) => u.length)) * s), y = t.x + t.w / 2, p = t.y + e / 2;
  return {
    lx: y - f / 2 - 4,
    ly: p - a / 2 - 4,
    rx: y + f / 2 + 4,
    ry: p + a / 2 + 4
  };
}
function Cn(t, e, o, r, n) {
  const s = t.h === "auto" ? 100 : t.h, [i, l] = vo(t, e, o, s), d = t.data, c = d.strokeWidth ?? 2, a = Br(Math.max(c / 2, Ba), r), f = !!d.fill || !!n;
  switch (d.shape) {
    case "rect": {
      if (f)
        return i >= t.x - a && i <= t.x + t.w + a && l >= t.y - a && l <= t.y + s + a;
      const y = Math.abs(i - t.x), p = Math.abs(i - (t.x + t.w)), u = Math.abs(l - t.y), m = Math.abs(l - (t.y + s)), g = i >= t.x - a && i <= t.x + t.w + a;
      return l >= t.y - a && l <= t.y + s + a && (y <= a || p <= a) || g && (u <= a || m <= a);
    }
    case "ellipse": {
      const y = t.x + t.w / 2, p = t.y + s / 2, u = t.w / 2, m = s / 2;
      if (u === 0 || m === 0) return !1;
      const g = (i - y) / u, x = (l - p) / m, b = g * g + x * x;
      if (f) {
        const I = ((u + a) / u) ** 2;
        return b <= I;
      }
      const w = a / Math.min(u, m);
      return Math.abs(Math.sqrt(b) - 1) <= w;
    }
    case "diamond": {
      const y = t.x + t.w / 2, p = t.y + s / 2, u = t.w / 2, m = s / 2;
      if (u === 0 || m === 0) return !1;
      const g = Math.abs(i - y) / u, x = Math.abs(l - p) / m, b = g + x;
      if (f) {
        const I = a / Math.min(u, m);
        return b <= 1 + I;
      }
      const w = a / Math.min(u, m);
      return Math.abs(b - 1) <= w;
    }
    case "line":
    case "arrow": {
      const y = d.startPoint ?? [0, 0], p = d.endPoint ?? [t.w, s], u = t.x + y[0], m = t.y + y[1], g = t.x + p[0], x = t.y + p[1];
      return Va(i, l, u, m, g, x) <= a * a;
    }
    default:
      return i >= t.x - a && i <= t.x + t.w + a && l >= t.y - a && l <= t.y + s + a;
  }
}
function ud(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const i = o[n][0], l = o[n][1], d = o[s][0], c = o[s][1];
    l > e != c > e && t < (d - i) * (e - l) / (c - l) + i && (r = !r);
  }
  return r;
}
function Ys(t, e, o, r) {
  const n = t.data.strokeWidth, s = Br(Math.max(n / 2, Ba), r), i = s * s, l = t.h === "auto" ? 100 : t.h, [d, c] = vo(t, e, o, l);
  if (d < t.x - s || d > t.x + t.w + s || c < t.y - s || c > t.y + l + s)
    return !1;
  const a = t.data.points;
  if (!a || a.length === 0) return !1;
  const f = d - t.x, y = c - t.y;
  if (a.length === 1) {
    const p = f - a[0][0], u = y - a[0][1];
    return p * p + u * u <= i;
  }
  if (t.data.fill && a.length >= 3 && ud(f, y, a))
    return !0;
  for (let p = 0; p < a.length - 1; p++)
    if (Va(f, y, a[p][0], a[p][1], a[p + 1][0], a[p + 1][1]) <= i)
      return !0;
  return !1;
}
function fd(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, a) => a.z - c.z), l = [], d = [];
  for (const c of i)
    if (c.type === "draw")
      Ys(c, e, o, r) && l.push(c);
    else if (c.type === "shape") {
      if (Cn(c, e, o, r))
        l.push(c);
      else if (c.data.label) {
        const a = c.h === "auto" ? 100 : c.h, [f, y] = vo(c, e, o, a), p = Xa(c, a);
        p && f >= p.lx && f <= p.rx && y >= p.ly && y <= p.ry && d.push(c);
      }
    } else if (s && s.has(c.type)) {
      const a = Dr(c, n);
      Oa(c, e, o, r, a) && d.push(c);
    } else {
      const a = Dr(c, n), f = Br(Math.max(Fa, Na), r), [y, p] = vo(c, e, o, a);
      y >= c.x - f && y <= c.x + c.w + f && p >= c.y - f && p <= c.y + a + f && d.push(c);
    }
  return [...l, ...d];
}
function _r(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, r = t.y + e / 2, n = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, l = Math.abs(Math.cos(i)), d = Math.abs(Math.sin(i)), c = n * l + s * d, a = n * d + s * l;
  return {
    x: o - c,
    y: r - a,
    w: c * 2,
    h: a * 2
  };
}
const Ke = class Ke {
  constructor(e, o = 0, r) {
    // Increased depth for potentially large boards
    vt(this, "level");
    vt(this, "bounds");
    vt(this, "objects");
    vt(this, "nodes");
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    vt(this, "heightMap");
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
    this.nodes[0] = new Ke({ x: r + e, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new Ke({ x: r, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new Ke({ x: r, y: n + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new Ke({ x: r + e, y: n + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const n = _r(e, r);
    if (this.nodes.length) {
      const s = this.getIndex(n);
      if (s !== -1) {
        this.nodes[s].insert(e, r);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > Ke.MAX_OBJECTS && this.level < Ke.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], l = this.resolveH(i), d = _r(i, l), c = this.getIndex(d);
        c !== -1 ? (this.nodes[c].insert(i, l), this.objects.splice(s, 1)) : s++;
      }
    }
  }
  // Remove an object. Requires the node (with its coordinates) to find it efficiently.
  remove(e) {
    const o = this.objects.findIndex((r) => r.id === e.id);
    if (o !== -1)
      return this.objects.splice(o, 1), !0;
    if (this.nodes.length) {
      const r = this.resolveH(e), n = this.getIndex(_r(e, r));
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
      const s = this.resolveH(n), i = _r(n, s);
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
vt(Ke, "MAX_OBJECTS", 10), // Max depth of the tree
vt(Ke, "MAX_LEVELS", 8);
let xs = Ke;
function oo(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function ur(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function pd(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function yd(t, e, o, r) {
  const n = e > 0 ? 0.95 : 1.05, s = oo(t.zoom * n, 0.1, 5), i = ur(t, o, r);
  return {
    x: o - i.x * s,
    y: r - i.y * s,
    zoom: s
  };
}
function md(t, e, o, r) {
  const n = oo(t.zoom * e, 0.1, 5), s = ur(t, o, r);
  return {
    x: o - s.x * n,
    y: r - s.y * n,
    zoom: n
  };
}
const js = Dc.create({
  blockSpecs: {
    ...Wc
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let qn = null;
function Zs() {
  return qn || (qn = Fc.create({ schema: js })), qn;
}
async function gd(t) {
  return await Zs().blocksToMarkdownLossy(t);
}
async function Ks(t) {
  return await Zs().tryParseMarkdownToBlocks(t);
}
function Ga(t) {
  return Zs().tryParseHTMLToBlocks(t);
}
function bd(t, e, o) {
  const [r, n] = t, [s, i] = e, [l, d] = o, c = l - s, a = d - i, f = c * c + a * a;
  if (f === 0)
    return (r - s) ** 2 + (n - i) ** 2;
  let y = ((r - s) * c + (n - i) * a) / f;
  y = Math.max(0, Math.min(1, y));
  const p = s + y * c, u = i + y * a;
  return (r - p) ** 2 + (n - u) ** 2;
}
function ws(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, r = 0;
  const n = t[0], s = t[t.length - 1];
  for (let d = 1; d < t.length - 1; d++) {
    const c = bd(t[d], n, s);
    c > o && (o = c, r = d);
  }
  if (o <= e)
    return [n, s];
  const i = ws(t.slice(0, r + 1), e), l = ws(t.slice(r), e);
  return [...i.slice(0, -1), ...l];
}
async function xd(t, e) {
  const o = [], r = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (e != null && e.background && e.background !== "dot-grid" && r.push(`background="${e.background}"`), e != null && e.originView) {
    const u = e.originView;
    r.push(`originView="${u.x},${u.y},${u.zoom}"`);
  }
  o.push(`<!--@meta ${r.join(" ")} -->`), o.push("");
  const n = t.filter((u) => u.type === "frame").sort((u, m) => u.z - m.z || u.y - m.y || u.x - m.x);
  for (const u of n) {
    const m = u.h === "auto" ? "auto" : Math.round(u.h), g = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${m}"`,
      `z="${u.z}"`
    ];
    u.data.label && g.push(`label="${u.data.label.replace(/"/g, "&quot;")}"`), u.data.backgroundColor && g.push(`backgroundColor="${u.data.backgroundColor}"`), u.data.borderColor && g.push(`borderColor="${u.data.borderColor}"`), u.data.borderWidth != null && g.push(`borderWidth="${u.data.borderWidth}"`), u.data.borderStyle && u.data.borderStyle !== "solid" && g.push(`borderStyle="${u.data.borderStyle}"`), u.data.opacity !== void 0 && u.data.opacity !== 1 && g.push(`opacity="${u.data.opacity}"`), u.data.slideOrder != null && g.push(`slideOrder="${u.data.slideOrder}"`), u.data.transition && u.data.transition !== "pan" && g.push(`transition="${u.data.transition}"`), u.data.transitionDuration != null && g.push(`transitionDuration="${u.data.transitionDuration}"`), u.rotation && g.push(`rotation="${u.rotation}"`), u.locked && g.push('locked="true"'), u.groupId && g.push(`group="${u.groupId}"`), o.push(`<!--@frame ${g.join(" ")} -->`), o.push("");
  }
  const s = t.filter((u) => u.type === "content").sort((u, m) => u.z - m.z || u.y - m.y || u.x - m.x);
  for (const u of s) {
    const m = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${u.h}"`,
      `z="${u.z}"`
    ];
    u.rotation && m.push(`rotation="${u.rotation}"`), u.locked && m.push('locked="true"'), u.groupId && m.push(`group="${u.groupId}"`), u.data.borderColor && m.push(`borderColor="${u.data.borderColor}"`), u.data.borderWidth != null && m.push(`borderWidth="${u.data.borderWidth}"`), u.data.borderStyle && u.data.borderStyle !== "solid" && m.push(`borderStyle="${u.data.borderStyle}"`), u.data.opacity !== void 0 && u.data.opacity !== 1 && m.push(`opacity="${u.data.opacity}"`), o.push(`<!--@block ${m.join(" ")} -->`);
    const g = u.data.blocks.length > 0 ? await gd(u.data.blocks) : "";
    o.push(g), o.push("");
  }
  const i = t.filter((u) => u.type === "draw");
  for (const u of i) {
    const m = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `z="${u.z}"`,
      `tool="${u.data.tool}"`,
      `color="${u.data.color}"`,
      `width="${u.data.strokeWidth}"`
    ];
    u.data.opacity !== void 0 && u.data.opacity !== 1 && m.push(`opacity="${u.data.opacity}"`), u.data.fill && m.push(`fill="${u.data.fill}"`), u.data.fillStyle && u.data.fillStyle !== "hachure" && m.push(`fillStyle="${u.data.fillStyle}"`), u.rotation && m.push(`rotation="${u.rotation}"`), u.locked && m.push('locked="true"'), u.groupId && m.push(`group="${u.groupId}"`), o.push(`<!--@draw ${m.join(" ")} -->`);
    const x = ws([...u.data.points], 1).map(
      ([b, w, I]) => `${(b + u.x).toFixed(1)},${(w + u.y).toFixed(1)},${I.toFixed(2)}`
    ).join(" ");
    o.push(x), o.push("");
  }
  const l = t.filter((u) => u.type === "shape");
  for (const u of l) {
    const m = u.h === "auto" ? "auto" : Math.round(u.h), g = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${m}"`,
      `z="${u.z}"`,
      'tool="shape"',
      `shape="${u.data.shape}"`,
      `color="${u.data.stroke}"`,
      `stroke="${u.data.strokeWidth}"`,
      `roughness="${u.data.roughness}"`
    ];
    u.data.fill && g.push(`fill="${u.data.fill}"`), u.data.fillStyle && u.data.fillStyle !== "hachure" && g.push(`fillStyle="${u.data.fillStyle}"`), u.data.strokeStyle && u.data.strokeStyle !== "solid" && g.push(`strokeStyle="${u.data.strokeStyle}"`), u.data.edgeStyle && u.data.edgeStyle !== "sharp" && g.push(`edgeStyle="${u.data.edgeStyle}"`), u.data.opacity !== void 0 && u.data.opacity !== 1 && g.push(`opacity="${u.data.opacity}"`), u.data.startPoint && g.push(`startPt="${u.data.startPoint[0].toFixed(1)},${u.data.startPoint[1].toFixed(1)}"`), u.data.endPoint && g.push(`endPt="${u.data.endPoint[0].toFixed(1)},${u.data.endPoint[1].toFixed(1)}"`), u.data.label && g.push(`label="${u.data.label.replace(/"/g, "&quot;")}"`), u.data.labelFontSize && g.push(`labelFontSize="${u.data.labelFontSize}"`), u.data.labelFontFamily && u.data.labelFontFamily !== "Excalifont" && g.push(`labelFontFamily="${u.data.labelFontFamily}"`), u.data.labelAlign && u.data.labelAlign !== "center" && g.push(`labelAlign="${u.data.labelAlign}"`), u.rotation && g.push(`rotation="${u.rotation}"`), u.locked && g.push('locked="true"'), u.groupId && g.push(`group="${u.groupId}"`), o.push(`<!--@draw ${g.join(" ")} -->`), o.push("");
  }
  const d = t.filter((u) => u.type === "text");
  for (const u of d) {
    const m = [
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
    u.data.opacity !== void 0 && u.data.opacity !== 1 && m.push(`opacity="${u.data.opacity}"`), u.rotation && m.push(`rotation="${u.rotation}"`), u.locked && m.push('locked="true"'), u.groupId && m.push(`group="${u.groupId}"`), o.push(`<!--@text ${m.join(" ")} -->`), o.push(u.data.text), o.push("");
  }
  const c = t.filter((u) => u.type === "image");
  for (const u of c) {
    const m = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${Math.round(u.h)}"`,
      `z="${u.z}"`,
      `src="${u.data.src.replace(/"/g, "&quot;")}"`
    ];
    u.rotation && m.push(`rotation="${u.rotation}"`), u.locked && m.push('locked="true"'), u.groupId && m.push(`group="${u.groupId}"`), u.data.alt && m.push(`alt="${u.data.alt.replace(/"/g, "&quot;")}"`), u.data.opacity != null && u.data.opacity !== 1 && m.push(`opacity="${u.data.opacity}"`), u.data.borderColor && m.push(`borderColor="${u.data.borderColor}"`), u.data.borderWidth != null && m.push(`borderWidth="${u.data.borderWidth}"`), u.data.borderStyle && u.data.borderStyle !== "solid" && m.push(`borderStyle="${u.data.borderStyle}"`), o.push(`<!--@image ${m.join(" ")} -->`), o.push("");
  }
  const a = t.filter((u) => u.type === "edge");
  for (const u of a) {
    const m = [
      `id="${u.id}"`,
      `from="${u.data.fromId}"`,
      `to="${u.data.toId}"`,
      `style="${u.data.style}"`,
      `color="${u.data.color}"`
    ];
    u.data.label && m.push(`label="${u.data.label}"`), u.data.strokeWidth && u.data.strokeWidth !== 1 && m.push(`strokeWidth="${u.data.strokeWidth}"`), u.data.arrowHead && u.data.arrowHead !== "none" && m.push(`arrowHead="${u.data.arrowHead}"`), u.data.arrowTail && u.data.arrowTail !== "none" && m.push(`arrowTail="${u.data.arrowTail}"`), u.data.arrowHeadSize && m.push(`arrowHeadSize="${u.data.arrowHeadSize}"`), u.data.arrowTailSize && m.push(`arrowTailSize="${u.data.arrowTailSize}"`), u.data.edgeType && u.data.edgeType !== "bezier" && m.push(`edgeType="${u.data.edgeType}"`), u.data.animated && m.push('animated="true"'), u.data.animatedDirection && u.data.animatedDirection !== "forward" && m.push(`animatedDirection="${u.data.animatedDirection}"`), u.data.sourceHandle && m.push(`sourceHandle="${u.data.sourceHandle}"`), u.data.targetHandle && m.push(`targetHandle="${u.data.targetHandle}"`), u.data.sourcePort && m.push(`sourcePort="${u.data.sourcePort.replace(/"/g, "&quot;")}"`), u.data.targetPort && m.push(`targetPort="${u.data.targetPort.replace(/"/g, "&quot;")}"`), u.data.sourceT != null && m.push(`sourceT="${u.data.sourceT}"`), u.data.targetT != null && m.push(`targetT="${u.data.targetT}"`), u.data.attachmentGap != null && u.data.attachmentGap !== 0 && m.push(`attachmentGap="${u.data.attachmentGap}"`), u.data.roughness != null && u.data.roughness !== 0 && m.push(`roughness="${u.data.roughness}"`), u.data.midpointOffset != null && u.data.midpointOffset !== 0.5 && m.push(`midpointOffset="${u.data.midpointOffset}"`), u.data.curveOffset && (u.data.curveOffset[0] !== 0 || u.data.curveOffset[1] !== 0) && m.push(`curveOffset="${u.data.curveOffset[0]},${u.data.curveOffset[1]}"`), u.locked && m.push('locked="true"'), u.groupId && m.push(`group="${u.groupId}"`), o.push(`<!--@edge ${m.join(" ")} -->`), o.push("");
  }
  const f = t.filter((u) => u.type === "sticky");
  for (const u of f) {
    const m = [
      `id="${u.id}"`,
      `x="${Math.round(u.x)}"`,
      `y="${Math.round(u.y)}"`,
      `w="${Math.round(u.w)}"`,
      `h="${u.h}"`,
      `z="${u.z}"`,
      `color="${u.data.color}"`
    ];
    u.data.fontSize && u.data.fontSize !== 16 && m.push(`fontSize="${u.data.fontSize}"`), u.data.opacity !== void 0 && u.data.opacity !== 1 && m.push(`opacity="${u.data.opacity}"`), u.rotation && m.push(`rotation="${u.rotation}"`), u.locked && m.push('locked="true"'), u.groupId && m.push(`group="${u.groupId}"`), o.push(`<!--@sticky ${m.join(" ")} -->`), o.push(u.data.text), o.push("");
  }
  const y = /* @__PURE__ */ new Set(["frame", "content", "draw", "shape", "image", "text", "youtube", "edge", "sticky"]), p = t.filter((u) => !y.has(u.type));
  for (const u of p)
    o.push(`<!--@custom ${JSON.stringify(u)} -->`), o.push("");
  return o.join(`
`);
}
const Ya = "data:font/woff2;base64,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", ko = "Excalifont", fn = [
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
], ja = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), wd = /* @__PURE__ */ new Set(["Excalifont"]), vd = /* @__PURE__ */ new Set([...ja, ...wd]);
function kd(t) {
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
function So(t) {
  return ja.has(t) ? t : `'${t}', sans-serif`;
}
let Ai = !1;
function Sd(t = document) {
  if (Ai) return;
  Ai = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${Ya}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = fn.filter((n) => !vd.has(n.key)).map((n) => "family=" + n.key.replace(/ /g, "+")).join("&"), r = t.createElement("link");
  r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(r);
}
function co(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let r;
  for (; (r = o.exec(t)) !== null; )
    e[r[1]] = r[2];
  return e;
}
function Ir(t) {
  if (t == null || t === "") return;
  const e = parseFloat(t);
  return Number.isFinite(e) ? e : void 0;
}
const Md = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function Cd(t) {
  var s, i, l, d;
  const e = [], o = {}, r = t.split(`
`);
  let n = 0;
  for (; n < r.length; ) {
    const c = r[n].trim();
    if (c.startsWith("<!--@meta")) {
      const a = co(c);
      if (a.background) {
        const f = Md[a.background] ?? a.background;
        o.background = f;
      }
      if (a.originView) {
        const f = a.originView.split(",").map(Number);
        f.length === 3 && f.every((y) => !isNaN(y)) && (o.originView = { x: f[0], y: f[1], zoom: f[2] });
      }
      n++;
      continue;
    }
    if (c.startsWith("<!--@frame")) {
      const a = co(c);
      for (n++; n < r.length && r[n].trim() === ""; ) n++;
      e.push({
        id: a.id || Pt(10),
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
      const a = co(c);
      n++;
      const f = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        f.push(r[n]), n++;
      for (; f.length > 0 && f[f.length - 1].trim() === ""; )
        f.pop();
      const y = f.join(`
`), p = y.trim().length > 0 ? await Ks(y) : [];
      e.push({
        id: a.id || Pt(10),
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
          blocks: p,
          markdown: y,
          borderColor: a.borderColor || void 0,
          borderWidth: a.borderWidth ? parseFloat(a.borderWidth) : void 0,
          borderStyle: a.borderStyle || void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@draw")) {
      const a = co(c);
      if (n++, a.tool === "shape")
        for (e.push({
          id: a.id || Pt(10),
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
        }); n < r.length && r[n].trim() === ""; ) n++;
      else {
        let f = "";
        n < r.length && !r[n].trim().startsWith("<!--@") && (f = r[n].trim(), n++);
        const y = f ? f.split(" ").filter(Boolean).map((b) => {
          const w = b.split(",").map(Number);
          return [
            w[0] || 0,
            w[1] || 0,
            w[2] || 0.5
          ];
        }) : [];
        let p = 1 / 0, u = 1 / 0, m = -1 / 0, g = -1 / 0;
        for (const [b, w] of y)
          b < p && (p = b), w < u && (u = w), b > m && (m = b), w > g && (g = w);
        isFinite(p) || (p = parseFloat(a.x || "0"), u = parseFloat(a.y || "0"), m = p, g = u);
        const x = y.map(
          ([b, w, I]) => [b - p, w - u, I]
        );
        for (e.push({
          id: a.id || Pt(10),
          type: "draw",
          x: p,
          y: u,
          w: m - p,
          h: g - u,
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
        }); n < r.length && r[n].trim() === ""; ) n++;
      }
      continue;
    }
    if (c.startsWith("<!--@image")) {
      const a = co(c);
      n++, e.push({
        id: a.id || Pt(10),
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
      const a = co(c);
      for (n++, e.push({
        id: a.id || Pt(10),
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
          sourceT: Ir(a.sourceT),
          targetT: Ir(a.targetT),
          attachmentGap: Ir(a.attachmentGap),
          roughness: Ir(a.roughness),
          midpointOffset: Ir(a.midpointOffset),
          curveOffset: a.curveOffset ? a.curveOffset.split(",").map(Number) : void 0
        }
      }); n < r.length && r[n].trim() === ""; ) n++;
      continue;
    }
    if (c.startsWith("<!--@text")) {
      const a = co(c);
      n++;
      const f = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        f.push(r[n]), n++;
      for (; f.length > 0 && f[f.length - 1].trim() === ""; )
        f.pop();
      e.push({
        id: a.id || Pt(10),
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
          text: f.join(`
`),
          fontSize: parseFloat(a.fontSize || "20"),
          fontFamily: a.fontFamily || ko,
          color: a.color || "#1e1e2e",
          align: a.align || "left",
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@sticky")) {
      const a = co(c);
      n++;
      const f = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        f.push(r[n]), n++;
      for (; f.length > 0 && f[f.length - 1].trim() === ""; )
        f.pop();
      e.push({
        id: a.id || Pt(10),
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
          text: f.join(`
`),
          color: a.color || "#FEF3C7",
          fontSize: a.fontSize ? parseFloat(a.fontSize) : void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@custom")) {
      const a = c.indexOf("{"), f = c.lastIndexOf("}");
      if (a >= 0 && f > a)
        try {
          const y = JSON.parse(c.slice(a, f + 1));
          y.id && y.type && e.push(y);
        } catch {
        }
      n++;
      continue;
    }
    n++;
  }
  return { nodes: e, meta: o };
}
const Id = 180;
function tn(t, e) {
  t.push(e), t.length > Id && t.shift();
}
function ho(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((n, s) => n - s), r = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[r];
}
class Td {
  constructor() {
    vt(this, "enabled", !1);
    vt(this, "listeners", /* @__PURE__ */ new Set());
    vt(this, "lastTick", 0);
    vt(this, "lastRatesTs", 0);
    vt(this, "frameMs", []);
    vt(this, "cullingMs", []);
    vt(this, "hitTestMs", []);
    vt(this, "edgeHitMs", []);
    vt(this, "pendingCullingMs", 0);
    vt(this, "pendingHitTestMs", 0);
    vt(this, "pendingEdgeHitMs", 0);
    vt(this, "pendingHitTestCalls", 0);
    vt(this, "pendingEdgeHitCalls", 0);
    vt(this, "hitTestCallsPerSec", 0);
    vt(this, "edgeHitCallsPerSec", 0);
    vt(this, "visibleNodes", 0);
    vt(this, "totalNodes", 0);
    vt(this, "visibleEdges", 0);
    vt(this, "totalEdges", 0);
    vt(this, "virtualizationActive", !1);
    vt(this, "seedVisibleNodes", 0);
    vt(this, "nodesAddedByAdjacency", 0);
    vt(this, "nodesAddedByEdgeEndpoints", 0);
    vt(this, "edgesAddedByAdjacency", 0);
    vt(this, "edgesAddedByCrossing", 0);
    vt(this, "lastPublishedAt", 0);
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
      tn(this.frameMs, r);
    }
    this.lastTick = e, tn(this.cullingMs, this.pendingCullingMs), tn(this.hitTestMs, this.pendingHitTestMs), tn(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
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
      frameMsP50: ho(this.frameMs, 0.5),
      frameMsP95: ho(this.frameMs, 0.95),
      cullingMsP50: ho(this.cullingMs, 0.5),
      cullingMsP95: ho(this.cullingMs, 0.95),
      hitTestMsP50: ho(this.hitTestMs, 0.5),
      hitTestMsP95: ho(this.hitTestMs, 0.95),
      edgeHitMsP50: ho(this.edgeHitMs, 0.5),
      edgeHitMsP95: ho(this.edgeHitMs, 0.95),
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
const ve = new Td();
function qe(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const Za = 7, qs = 52, zd = 8;
function Ad(t, e, o, r) {
  const n = qe(t, r);
  if (!t.rotation) return { x: e, y: o };
  const s = t.x + t.w / 2, i = t.y + n / 2, l = t.rotation * Math.PI / 180, d = Math.cos(l), c = Math.sin(l), a = e - s, f = o - i;
  return { x: s + a * d - f * c, y: i + a * c + f * d };
}
function Ka(t, e, o, r, n, s = "bbox") {
  const i = e.find((p) => p.id === o);
  if (!i) return null;
  const l = qe(t, n), d = Za / r, c = e.filter((p) => p.direction === i.direction), a = c.indexOf(i);
  if (a < 0) return null;
  const f = t.y + l / (c.length + 1) * (a + 1);
  let y;
  if (s === "inscribed-circle") {
    const p = Math.min(t.w, l) / 2, u = t.x + t.w / 2;
    y = i.direction === "input" ? u - p - d : u + p + d;
  } else
    y = i.direction === "input" ? t.x - d : t.x + t.w + d;
  return { px: y, py: f, direction: i.direction };
}
function Ed(t, e, o, r, n = "bbox") {
  const s = qe(t, r);
  if (n === "bbox")
    return e === "input" ? { x: t.x, y: o.y } : { x: t.x + t.w, y: o.y };
  const i = Math.min(t.w, s) / 2, l = t.x + t.w / 2, d = t.y + s / 2;
  let c = o.x - l, a = o.y - d, f = Math.hypot(c, a);
  return f < 1e-6 && (c = e === "input" ? -1 : 1, a = 0, f = 1), { x: l + c / f * i, y: d + a / f * i };
}
function Ae(t, e, o, r, n, s = "bbox") {
  const i = Ka(
    t,
    e,
    o,
    r,
    n,
    s
  );
  return i ? Ad(t, i.px, i.py, n) : null;
}
function Ei(t, e, o, r, n, s, i, l) {
  const d = i - n, c = l - s;
  if (d === 0 && c === 0) return { x: n, y: s, side: "right" };
  let a = 1 / 0, f = n, y = s, p = "right";
  if (d !== 0) {
    const u = (t + o - n) / d;
    if (u > 0 && u < a) {
      const m = s + u * c;
      m >= e && m <= e + r && (a = u, f = t + o, y = m, p = "right");
    }
  }
  if (d !== 0) {
    const u = (t - n) / d;
    if (u > 0 && u < a) {
      const m = s + u * c;
      m >= e && m <= e + r && (a = u, f = t, y = m, p = "left");
    }
  }
  if (c !== 0) {
    const u = (e + r - s) / c;
    if (u > 0 && u < a) {
      const m = n + u * d;
      m >= t && m <= t + o && (a = u, f = m, y = e + r, p = "bottom");
    }
  }
  if (c !== 0) {
    const u = (e - s) / c;
    if (u > 0 && u < a) {
      const m = n + u * d;
      m >= t && m <= t + o && (a = u, f = m, y = e, p = "top");
    }
  }
  return { x: f, y, side: p };
}
function Fe(t, e, o, r, n) {
  const s = Math.cos(n), i = Math.sin(n), l = t - o, d = e - r;
  return [o + l * s - d * i, r + l * i + d * s];
}
function vs(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return Ei(t.x, t.y, t.w, e, n, s, o, r);
  const i = -t.rotation * Math.PI / 180, [l, d] = Fe(o, r, n, s, i), c = Ei(t.x, t.y, t.w, e, n, s, l, d), [a, f] = Fe(c.x, c.y, n, s, -i);
  return { x: a, y: f, side: c.side };
}
function Xo(t, e, o, r) {
  return Math.abs(t) / o >= Math.abs(e) / r ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function Pd(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, d = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, a] = t.rotation ? Fe(o, r, n, s, d) : [o, r], f = c - n, y = a - s;
  if (f === 0 && y === 0)
    return { x: n + i, y: s, side: "right" };
  const p = 1 / Math.sqrt((f / i) ** 2 + (y / l) ** 2);
  let u = n + f * p, m = s + y * p;
  const g = Xo(f, y, i, l);
  return t.rotation && ([u, m] = Fe(u, m, n, s, -d)), { x: u, y: m, side: g };
}
function Hd(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, d = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, a] = t.rotation ? Fe(o, r, n, s, d) : [o, r], f = c - n, y = a - s;
  if (f === 0 && y === 0)
    return { x: n + i, y: s, side: "right" };
  const p = 1 / (Math.abs(f) / i + Math.abs(y) / l);
  let u = n + f * p, m = s + y * p;
  const g = Xo(f, y, i, l);
  return t.rotation && ([u, m] = Fe(u, m, n, s, -d)), { x: u, y: m, side: g };
}
function Ld(t, e, o, r) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return vs(t, e, o, r);
  const s = t.x + t.w / 2, i = t.y + e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [d, c] = t.rotation ? Fe(o, r, s, i, l) : [o, r], a = d - s, f = c - i, y = Math.hypot(a, f);
  if (y === 0)
    return vs(t, e, o, r);
  const p = a / y, u = f / y;
  let m = t.x + n[0][0], g = t.y + n[0][1], x = (m - s) * p + (g - i) * u;
  for (let M = 1; M < n.length; M++) {
    const C = t.x + n[M][0], A = t.y + n[M][1], P = (C - s) * p + (A - i) * u;
    P > x && (x = P, m = C, g = A);
  }
  const b = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let w = m + p * b, I = g + u * b;
  const k = Xo(a, f, t.w / 2, e / 2);
  return t.rotation && ([w, I] = Fe(w, I, s, i, -l)), { x: w, y: I, side: k };
}
function Pi(t, e, o) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return mn(t, e, o);
  const n = t.x + t.w / 2, s = t.y + e / 2, i = Go(o), l = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, d = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (g, x, b, w, I, k) => {
    const M = I - b, C = k - w, A = M * M + C * C;
    if (A === 0) return [b, w];
    const P = Math.max(0, Math.min(1, ((g - b) * M + (x - w) * C) / A));
    return [b + P * M, w + P * C];
  };
  let a = t.x + r[0][0], f = t.y + r[0][1], y = (a - l) ** 2 + (f - d) ** 2;
  if (r.length === 1)
    a = t.x + r[0][0], f = t.y + r[0][1];
  else
    for (let g = 0; g < r.length - 1; g++) {
      const x = t.x + r[g][0], b = t.y + r[g][1], w = t.x + r[g + 1][0], I = t.y + r[g + 1][1], [k, M] = c(l, d, x, b, w, I), C = (k - l) ** 2 + (M - d) ** 2;
      C < y && (y = C, a = k, f = M);
    }
  const p = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let u = a + i.dx * p, m = f + i.dy * p;
  if (t.rotation) {
    const g = t.rotation * Math.PI / 180;
    [u, m] = Fe(u, m, n, s, g);
  }
  return { x: u, y: m };
}
function ks(t, e, o, r) {
  var n;
  if (t.type === "draw")
    return Ld(t, e, o, r);
  if (t.type === "shape") {
    const s = (n = t.data) == null ? void 0 : n.shape;
    if (s === "ellipse") return Pd(t, e, o, r);
    if (s === "diamond") return Hd(t, e, o, r);
  }
  return vs(t, e, o, r);
}
function Ss(t, e, o, r) {
  const n = ks(t, e, o, r);
  return { x: n.x, y: n.y };
}
function mn(t, e, o) {
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
  const l = t.rotation * Math.PI / 180, [d, c] = Fe(s, i, r, n, l);
  return { x: d, y: c };
}
function Go(t) {
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
function Hi(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Ee(t, e, o = "bezier", r, n, s, i, l, d, c, a, f, y) {
  const p = qe(t, r), u = qe(e, r), m = t.x + t.w / 2, g = t.y + p / 2, x = e.x + e.w / 2, b = e.y + u / 2;
  let w, I, k, M;
  if (d) {
    w = d.x, I = d.y;
    const X = w - m, et = I - g, it = Math.hypot(X, et);
    it > 1e-6 && (M = { dx: X / it, dy: et / it }), k = Xo(X, et, t.w / 2, p / 2);
  } else if (a !== void 0) {
    const X = Cs(t, p, a);
    w = X.x, I = X.y, k = X.side;
    const et = Math.hypot(w - m, I - g);
    et > 0 && (M = { dx: (w - m) / et, dy: (I - g) / et });
  } else if (n) {
    const X = t.type === "draw" ? Pi(t, p, n) : mn(t, p, n);
    w = X.x, I = X.y, k = n;
  } else {
    const X = ks(t, p, x, b);
    if (w = X.x, I = X.y, k = X.side, Hi(t)) {
      const et = Math.hypot(x - m, b - g);
      et > 0 && (M = { dx: (x - m) / et, dy: (b - g) / et });
    }
  }
  let C, A, P, V;
  if (c) {
    C = c.x, A = c.y;
    const X = C - x, et = A - b, it = Math.hypot(X, et);
    it > 1e-6 && (V = { dx: X / it, dy: et / it }), P = Xo(X, et, e.w / 2, u / 2);
  } else if (f !== void 0) {
    const X = Cs(e, u, f);
    C = X.x, A = X.y, P = X.side;
    const et = Math.hypot(C - x, A - b);
    et > 0 && (V = { dx: (C - x) / et, dy: (A - b) / et });
  } else if (s) {
    const X = e.type === "draw" ? Pi(e, u, s) : mn(e, u, s);
    C = X.x, A = X.y, P = s;
  } else {
    const X = ks(e, u, m, g);
    if (C = X.x, A = X.y, P = X.side, Hi(e)) {
      const et = Math.hypot(m - x, g - b);
      et > 0 && (V = { dx: (m - x) / et, dy: (g - b) / et });
    }
  }
  if (y && y > 0) {
    const X = Math.hypot(w - m, I - g);
    X > 0 && (w += (w - m) / X * y, I += (I - g) / X * y);
    const et = Math.hypot(C - x, A - b);
    et > 0 && (C += (C - x) / et * y, A += (A - b) / et * y);
  }
  switch (o) {
    case "straight":
      return Rd(w, I, C, A, k, P);
    case "bezier":
      return Dd(w, I, C, A, k, P, l, M, V);
    case "smoothstep":
      return Wd(w, I, C, A, k, P, i);
    case "step":
      return Fd(w, I, C, A, k, P, i);
  }
}
function Rd(t, e, o, r, n, s) {
  const i = Math.min(t, o), l = Math.min(e, r), d = Math.abs(o - t), c = Math.abs(r - e);
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
    bounds: { x: i, y: l, w: d, h: c }
  };
}
function Dd(t, e, o, r, n, s, i, l, d) {
  const c = Math.hypot(o - t, r - e), a = Math.min(c * 0.5, Math.max(50, c * 0.25)), f = l ?? Go(n), y = d ?? Go(s), p = i ? i[0] * (4 / 3) : 0, u = i ? i[1] * (4 / 3) : 0, m = t + f.dx * a + p, g = e + f.dy * a + u, x = o + y.dx * a + p, b = r + y.dy * a + u, w = 0.125 * t + 0.375 * m + 0.375 * x + 0.125 * o, I = 0.125 * e + 0.375 * g + 0.375 * b + 0.125 * r, k = Math.atan2(r - b, o - x), M = Math.atan2(e - g, t - m), C = {
    x: w,
    y: I,
    axis: "xy",
    min: 0,
    max: 0
  }, A = Math.min(t, o, m, x), P = Math.min(e, r, g, b), V = Math.max(t, o, m, x), X = Math.max(e, r, g, b);
  return {
    path: `M${t},${e} C${m},${g} ${x},${b} ${o},${r}`,
    labelX: w,
    labelY: I,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: k,
    tailAngle: M,
    sourceSide: n,
    targetSide: s,
    kinkHandle: C,
    bounds: { x: A, y: P, w: V - A, h: X - P }
  };
}
function Wd(t, e, o, r, n, s, i) {
  const { points: c, kinkHandle: a } = Us(t, e, o, r, n, s, 20, i), f = Bd(c, 8), y = Math.floor(c.length / 2), p = (c[y - 1][0] + c[y][0]) / 2, u = (c[y - 1][1] + c[y][1]) / 2, m = c[c.length - 1], g = c[c.length - 2], x = Math.atan2(m[1] - g[1], m[0] - g[0]), b = c[0], w = c[1], I = Math.atan2(b[1] - w[1], b[0] - w[0]);
  let k = 1 / 0, M = 1 / 0, C = -1 / 0, A = -1 / 0;
  for (const [P, V] of c)
    P < k && (k = P), V < M && (M = V), P > C && (C = P), V > A && (A = V);
  return {
    path: f,
    labelX: p,
    labelY: u,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: x,
    tailAngle: I,
    sourceSide: n,
    targetSide: s,
    kinkHandle: a,
    bounds: { x: k, y: M, w: C - k, h: A - M }
  };
}
function Fd(t, e, o, r, n, s, i) {
  const { points: d, kinkHandle: c } = Us(t, e, o, r, n, s, 20, i), a = [`M${d[0][0]},${d[0][1]}`];
  for (let A = 1; A < d.length; A++)
    a.push(`L${d[A][0]},${d[A][1]}`);
  const f = Math.floor(d.length / 2), y = (d[f - 1][0] + d[f][0]) / 2, p = (d[f - 1][1] + d[f][1]) / 2, u = d[d.length - 1], m = d[d.length - 2], g = Math.atan2(u[1] - m[1], u[0] - m[0]), x = d[0], b = d[1], w = Math.atan2(x[1] - b[1], x[0] - b[0]);
  let I = 1 / 0, k = 1 / 0, M = -1 / 0, C = -1 / 0;
  for (const [A, P] of d)
    A < I && (I = A), P < k && (k = P), A > M && (M = A), P > C && (C = P);
  return {
    path: a.join(" "),
    labelX: y,
    labelY: p,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: g,
    tailAngle: w,
    sourceSide: n,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: I, y: k, w: M - I, h: C - k }
  };
}
function Us(t, e, o, r, n, s, i, l) {
  const d = Go(n), c = Go(s), a = t + d.dx * i, f = e + d.dy * i, y = o + c.dx * i, p = r + c.dy * i, u = n === "left" || n === "right", m = s === "left" || s === "right", g = [[t, e], [a, f]], x = l ?? 0.5;
  let b;
  if (u && m) {
    const w = a + (y - a) * x;
    g.push([w, f], [w, p]);
    const I = Math.min(a, y), k = Math.max(a, y);
    b = { x: w, y: (f + p) / 2, axis: "x", min: I, max: k };
  } else if (!u && !m) {
    const w = f + (p - f) * x;
    g.push([a, w], [y, w]);
    const I = Math.min(f, p), k = Math.max(f, p);
    b = { x: (a + y) / 2, y: w, axis: "y", min: I, max: k };
  } else u && !m ? g.push([y, f]) : g.push([a, p]);
  return g.push([y, p], [o, r]), { points: g, kinkHandle: b };
}
function Bd(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let n = 1; n < t.length - 1; n++) {
    const s = t[n - 1], i = t[n], l = t[n + 1], d = i[0] - s[0], c = i[1] - s[1], a = l[0] - i[0], f = l[1] - i[1], y = Math.hypot(d, c), p = Math.hypot(a, f);
    if (y === 0 || p === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const u = Math.min(e, y / 2, p / 2), m = i[0] - d / y * u, g = i[1] - c / y * u, x = i[0] + a / p * u, b = i[1] + f / p * u;
    o.push(`L${m},${g}`), o.push(`Q${i[0]},${i[1]} ${x},${b}`);
  }
  const r = t[t.length - 1];
  return o.push(`L${r[0]},${r[1]}`), o.join(" ");
}
function Nd(t, e, o, r, n, s, i, l, d) {
  const c = 1 - d, a = c * c, f = a * c, y = d * d, p = y * d;
  return [
    f * t + 3 * a * d * o + 3 * c * y * n + p * i,
    f * e + 3 * a * d * r + 3 * c * y * s + p * l
  ];
}
function Od(t, e, o, r, n, s, i, l, d, c, a = 40) {
  let f = 1 / 0, y = o, p = r;
  for (let u = 1; u <= a; u++) {
    const m = u / a, [g, x] = Nd(o, r, n, s, i, l, d, c, m), b = Qs(t, e, y, p, g, x);
    b < f && (f = b), y = g, p = x;
  }
  return f;
}
function Vd(t, e, o) {
  let r = 1 / 0;
  for (let n = 1; n < o.length; n++) {
    const s = Qs(t, e, o[n - 1][0], o[n - 1][1], o[n][0], o[n][1]);
    s < r && (r = s);
  }
  return r;
}
function qa(t, e, o, r, n, s, i, l) {
  const d = n.data.edgeType || "bezier", c = Ee(
    o,
    r,
    d,
    s,
    n.data.sourceHandle,
    n.data.targetHandle,
    n.data.midpointOffset,
    n.data.curveOffset,
    i,
    l,
    n.data.sourceT,
    n.data.targetT,
    n.data.attachmentGap
  ), { x1: a, y1: f, x2: y, y2: p } = c;
  if (d === "straight")
    return Qs(t, e, a, f, y, p);
  if (d === "bezier") {
    const g = Math.hypot(y - a, p - f), x = Math.min(g * 0.5, Math.max(50, g * 0.25)), b = Go(c.sourceSide), w = Go(c.targetSide), I = n.data.curveOffset ? n.data.curveOffset[0] * (4 / 3) : 0, k = n.data.curveOffset ? n.data.curveOffset[1] * (4 / 3) : 0, M = a + b.dx * x + I, C = f + b.dy * x + k, A = y + w.dx * x + I, P = p + w.dy * x + k;
    return Od(t, e, a, f, M, C, A, P, y, p);
  }
  const u = 20, { points: m } = Us(a, f, y, p, c.sourceSide, c.targetSide, u, n.data.midpointOffset);
  return Vd(t, e, m);
}
function Li(t, e, o) {
  const r = qe(t, o), n = qe(e, o), s = t.x + t.w / 2, i = t.y + r / 2, l = e.x + e.w / 2, d = e.y + n / 2, c = Ss(t, r, l, d), a = Ss(e, n, s, i);
  return { x1: c.x, y1: c.y, x2: a.x, y2: a.y };
}
function Xd(t, e, o, r) {
  const n = qe(t, r);
  return Ss(t, n, e, o);
}
function Qs(t, e, o, r, n, s) {
  const i = n - o, l = s - r, d = i * i + l * l;
  if (d === 0) return Math.hypot(t - o, e - r);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * l) / d)), a = o + c * i, f = r + c * l;
  return Math.hypot(t - a, e - f);
}
function bo(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, l = n, d = r / 2, c = t + n * d, a = e + s * d, f = t - n * d, y = e - s * d, p = r * 0.4;
  return `M${f + i * p},${y + l * p} L${c},${a} L${f - i * p},${y - l * p}`;
}
function gn(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, l = n, d = r / 2, c = t + n * d, a = e + s * d, f = t - n * d, y = e - s * d, p = r * 0.4;
  return `M${c},${a} L${f + i * p},${y + l * p} L${f - i * p},${y - l * p} Z`;
}
function Ms(t, e) {
  const o = qe(t, e);
  return ["top", "right", "bottom", "left"].map((n) => {
    const s = mn(t, o, n);
    return { side: n, x: s.x, y: s.y };
  });
}
function en(t, e, o, r) {
  const n = Ms(t, r);
  let s = n[0], i = 1 / 0;
  for (const l of n) {
    const d = Math.hypot(l.x - e, l.y - o);
    d < i && (i = d, s = l);
  }
  return s.side;
}
function Ua(t, e) {
  const o = Math.max(0.01, e), r = t.data.strokeWidth ?? 2;
  return Math.max(r / 2 + 8 / o, 10 / o);
}
function Ri(t, e, o, r, n, s) {
  const i = ve.isEnabled(), l = i ? performance.now() : 0;
  let d = null;
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const a = c, f = t.get(a.data.fromId), y = t.get(a.data.toId);
    if (!f || !y) continue;
    const p = s == null ? void 0 : s(a, f, y), u = qa(e, o, f, y, a, n, p == null ? void 0 : p.sourcePortPos, p == null ? void 0 : p.targetPortPos), m = Ua(a, r);
    u < m && (!d || u < d.distance) && (d = { node: c, distance: u });
  }
  return i && ve.recordEdgeHit(performance.now() - l), d;
}
function Gd(t, e, o, r, n, s) {
  const i = ve.isEnabled(), l = i ? performance.now() : 0, d = [];
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const a = c, f = t.get(a.data.fromId), y = t.get(a.data.toId);
    if (!f || !y) continue;
    const p = s == null ? void 0 : s(a, f, y);
    qa(e, o, f, y, a, n, p == null ? void 0 : p.sourcePortPos, p == null ? void 0 : p.targetPortPos) < Ua(a, r) && d.push(c);
  }
  return i && ve.recordEdgeHit(performance.now() - l), d;
}
function Cs(t, e, o) {
  var c;
  o = (o % 1 + 1) % 1;
  const r = t.x + t.w / 2, n = t.y + e / 2;
  if (t.type === "draw") {
    const a = t.data.points;
    if (a && a.length >= 2) {
      const f = [0];
      for (let p = 1; p < a.length; p++)
        f.push(f[p - 1] + Math.hypot(a[p][0] - a[p - 1][0], a[p][1] - a[p - 1][1]));
      const y = f[f.length - 1];
      if (y > 0) {
        const p = o * y;
        let u = 0;
        for (let A = 1; A < f.length; A++) {
          if (f[A] >= p) {
            u = A - 1;
            break;
          }
          A === f.length - 1 && (u = A - 1);
        }
        const m = f[u + 1] - f[u], g = m > 0 ? (p - f[u]) / m : 0;
        let x = t.x + a[u][0] + (a[u + 1][0] - a[u][0]) * g, b = t.y + a[u][1] + (a[u + 1][1] - a[u][1]) * g;
        const w = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2), I = x - r, k = b - n, M = Math.hypot(I, k);
        M > 0 && (x += I / M * w, b += k / M * w);
        const C = Xo(x - r, b - n, t.w / 2, e / 2);
        if (t.rotation) {
          const A = t.rotation * Math.PI / 180, [P, V] = Fe(x, b, r, n, A);
          return { x: P, y: V, side: C };
        }
        return { x, y: b, side: C };
      }
    }
  }
  const s = t.type === "shape" ? (c = t.data) == null ? void 0 : c.shape : void 0;
  let i, l, d;
  if (s === "ellipse") {
    const a = o * 2 * Math.PI - Math.PI / 2, f = t.w / 2, y = e / 2;
    i = r + f * Math.cos(a), l = n + y * Math.sin(a), d = Xo(i - r, l - n, f, y);
  } else if (s === "diamond") {
    const a = r, f = t.y, y = t.x + t.w, p = n, u = r, m = t.y + e, g = t.x, x = n;
    if (o < 0.25) {
      const b = o / 0.25;
      i = a + (y - a) * b, l = f + (p - f) * b, d = o < 0.125 ? "top" : "right";
    } else if (o < 0.5) {
      const b = (o - 0.25) / 0.25;
      i = y + (u - y) * b, l = p + (m - p) * b, d = o < 0.375 ? "right" : "bottom";
    } else if (o < 0.75) {
      const b = (o - 0.5) / 0.25;
      i = u + (g - u) * b, l = m + (x - m) * b, d = o < 0.625 ? "bottom" : "left";
    } else {
      const b = (o - 0.75) / 0.25;
      i = g + (a - g) * b, l = x + (f - x) * b, d = o < 0.875 ? "left" : "top";
    }
  } else {
    const a = t.w, f = 2 * (a + e);
    let y = o * f;
    const p = a / 2;
    y < p ? (i = r + y, l = t.y, d = "top") : y < p + e ? (y -= p, i = t.x + a, l = t.y + y, d = "right") : y < p + e + a ? (y -= p + e, i = t.x + a - y, l = t.y + e, d = "bottom") : y < p + e + a + e ? (y -= p + e + a, i = t.x, l = t.y + e - y, d = "left") : (y -= p + e + a + e, i = t.x + y, l = t.y, d = "top");
  }
  if (t.rotation) {
    const a = t.rotation * Math.PI / 180, [f, y] = Fe(i, l, r, n, a);
    return { x: f, y, side: d };
  }
  return { x: i, y: l, side: d };
}
function Yd(t, e, o, r) {
  var x;
  const n = t.x + t.w / 2, s = t.y + e / 2;
  let i = o, l = r;
  if (t.rotation) {
    const b = -t.rotation * Math.PI / 180;
    [i, l] = Fe(o, r, n, s, b);
  }
  if (t.type === "draw") {
    const b = t.data.points;
    if (b && b.length >= 2) {
      const w = [0];
      for (let k = 1; k < b.length; k++)
        w.push(w[k - 1] + Math.hypot(b[k][0] - b[k - 1][0], b[k][1] - b[k - 1][1]));
      const I = w[w.length - 1];
      if (I > 0) {
        const k = i - t.x, M = l - t.y;
        let C = 1 / 0, A = 0;
        for (let P = 0; P < b.length - 1; P++) {
          const V = b[P][0], X = b[P][1], et = b[P + 1][0], it = b[P + 1][1], pt = et - V, wt = it - X, xt = pt * pt + wt * wt, D = xt === 0 ? 0 : Math.max(0, Math.min(1, ((k - V) * pt + (M - X) * wt) / xt)), W = V + D * pt, G = X + D * wt, K = Math.hypot(k - W, M - G);
          K < C && (C = K, A = w[P] + D * (w[P + 1] - w[P]));
        }
        return A / I;
      }
    }
  }
  const d = t.type === "shape" ? (x = t.data) == null ? void 0 : x.shape : void 0;
  if (d === "ellipse")
    return ((Math.atan2(l - s, i - n) + Math.PI / 2) / (2 * Math.PI) % 1 + 1) % 1;
  if (d === "diamond") {
    const b = n, w = t.y, I = t.x + t.w, k = s, M = n, C = t.y + e, A = t.x, P = s, V = [
      { ax: b, ay: w, bx: I, by: k, tStart: 0 },
      { ax: I, ay: k, bx: M, by: C, tStart: 0.25 },
      { ax: M, ay: C, bx: A, by: P, tStart: 0.5 },
      { ax: A, ay: P, bx: b, by: w, tStart: 0.75 }
    ];
    let X = 0, et = 1 / 0;
    for (const it of V) {
      const pt = it.bx - it.ax, wt = it.by - it.ay, xt = pt * pt + wt * wt, D = xt === 0 ? 0 : Math.max(0, Math.min(1, ((i - it.ax) * pt + (l - it.ay) * wt) / xt)), W = it.ax + D * pt, G = it.ay + D * wt, K = Math.hypot(i - W, l - G);
      K < et && (et = K, X = it.tStart + D * 0.25);
    }
    return (X % 1 + 1) % 1;
  }
  const c = t.w, a = t.x, f = t.y, y = 2 * (c + e), p = c / 2, u = [
    // Top edge right half: top-center → top-right
    { ax: n, ay: f, bx: a + c, by: f, dStart: 0, len: p },
    // Right edge: top-right → bottom-right
    { ax: a + c, ay: f, bx: a + c, by: f + e, dStart: p, len: e },
    // Bottom edge: bottom-right → bottom-left
    { ax: a + c, ay: f + e, bx: a, by: f + e, dStart: p + e, len: c },
    // Left edge: bottom-left → top-left
    { ax: a, ay: f + e, bx: a, by: f, dStart: p + e + c, len: e },
    // Top edge left half: top-left → top-center
    { ax: a, ay: f, bx: n, by: f, dStart: p + e + c + e, len: p }
  ];
  let m = 0, g = 1 / 0;
  for (const b of u) {
    const w = b.bx - b.ax, I = b.by - b.ay, k = w * w + I * I, M = k === 0 ? 0 : Math.max(0, Math.min(1, ((i - b.ax) * w + (l - b.ay) * I) / k)), C = b.ax + M * w, A = b.ay + M * I, P = Math.hypot(i - C, l - A);
    P < g && (g = P, m = (b.dStart + M * b.len) / y);
  }
  return (m % 1 + 1) % 1;
}
function We(t, e, o, r) {
  const n = qe(t, r), s = Yd(t, n, e, o), i = Cs(t, n, s);
  return { t: s, x: i.x, y: i.y };
}
function Is(t) {
  const e = t.data;
  return (e == null ? void 0 : e.showEdgeComputeOverlay) === !0;
}
function Wo(t, e) {
  return `${t}:${e}`;
}
function Mo(t, e) {
  return t.h === "auto" ? (e == null ? void 0 : e[t.id]) ?? 100 : t.h;
}
function jd(t, e) {
  const o = new Set(t), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const l of t)
    r.set(l, 0), n.set(l, []);
  for (const { from: l, to: d } of e)
    !o.has(l) || !o.has(d) || (n.get(l).push(d), r.set(d, (r.get(d) ?? 0) + 1));
  const s = t.filter((l) => (r.get(l) ?? 0) === 0);
  let i = 0;
  for (; s.length; ) {
    const l = s.pop();
    i++;
    for (const d of n.get(l) ?? []) {
      const c = (r.get(d) ?? 0) - 1;
      r.set(d, c), c === 0 && s.push(d);
    }
  }
  return i === t.length;
}
function Zd(t, e) {
  const o = new Set(t), r = /* @__PURE__ */ new Map();
  for (const i of t) r.set(i, /* @__PURE__ */ new Set());
  for (const { from: i, to: l } of e)
    o.has(i) && o.has(l) && (r.get(i).add(l), r.get(l).add(i));
  const n = /* @__PURE__ */ new Set(), s = [];
  for (const i of [...t].sort()) {
    if (n.has(i)) continue;
    const l = [i];
    n.add(i);
    const d = [];
    for (; l.length; ) {
      const c = l.pop();
      d.push(c);
      for (const a of r.get(c) ?? [])
        n.has(a) || (n.add(a), l.push(a));
    }
    s.push(d);
  }
  return s;
}
function Kd(t, e) {
  const o = [];
  for (const r of t) {
    if (r.type !== "edge") continue;
    const n = r, { fromId: s, toId: i } = n.data;
    e.has(s) && e.has(i) && o.push(n);
  }
  return o;
}
function qd(t) {
  return t.map((e) => ({
    from: e.data.fromId,
    to: e.data.toId
  }));
}
function Ud(t, e, o, r) {
  const n = [...t].sort(
    (y, p) => y.y === p.y ? y.x - p.x : y.y - p.y
  ), s = n.length;
  if (s === 0) return /* @__PURE__ */ new Map();
  const i = Math.max(1, Math.ceil(Math.sqrt(s))), l = Math.max(1, ...n.map((y) => y.w)), d = Math.max(
    1,
    ...n.map((y) => Mo(y, e))
  ), c = l + o, a = d + r, f = /* @__PURE__ */ new Map();
  for (let y = 0; y < s; y++) {
    const p = Math.floor(y / i), u = y % i;
    f.set(n[y].id, { x: u * c, y: p * a });
  }
  return f;
}
function Qd(t, e) {
  const o = /* @__PURE__ */ new Map();
  for (const n of t) o.set(n, 0);
  const r = Math.max(t.length, e.length) + 2;
  for (let n = 0; n < r; n++)
    for (const { from: s, to: i } of e)
      o.set(i, Math.max(o.get(i), o.get(s) + 1));
  return o;
}
function Di(t, e, o, r) {
  if (e.length === 0) return [...t];
  const n = new Map(e.map((i, l) => [i, l])), s = t.map((i) => {
    let l = 0, d = 0;
    for (const { from: c, to: a } of o)
      r === "backward" ? a === i && n.has(c) && (l += n.get(c), d++) : c === i && n.has(a) && (l += n.get(a), d++);
    return { id: i, score: d > 0 ? l / d : 1e9 };
  });
  return s.sort((i, l) => i.score - l.score || i.id.localeCompare(l.id)), s.map((i) => i.id);
}
function Jd(t, e, o, r, n) {
  const s = t.map((u) => u.id), i = new Set(s), l = e.filter(
    (u) => i.has(u.from) && i.has(u.to)
  ), d = Qd(s, l), c = Math.max(0, ...s.map((u) => d.get(u) ?? 0)), a = [];
  for (let u = 0; u <= c; u++) a[u] = [];
  for (const u of s) {
    const m = d.get(u) ?? 0;
    a[m].push(u);
  }
  const f = new Map(t.map((u) => [u.id, u]));
  for (let u = 0; u <= c; u++)
    a[u].sort((m, g) => {
      const x = f.get(m), b = f.get(g);
      return x.y - b.y || x.x - b.x;
    });
  for (let u = 0; u < 2; u++) {
    for (let m = 1; m <= c; m++)
      a[m] = Di(
        a[m],
        a[m - 1],
        l,
        "backward"
      );
    for (let m = c - 1; m >= 0; m--)
      a[m] = Di(
        a[m],
        a[m + 1],
        l,
        "forward"
      );
  }
  const y = /* @__PURE__ */ new Map();
  let p = 0;
  for (let u = 0; u <= c; u++) {
    const m = a[u], g = Math.max(1, ...m.map((b) => f.get(b).w));
    let x = 0;
    for (const b of m) {
      const w = f.get(b);
      y.set(b, { x: p, y: x }), x += Mo(w, o) + n;
    }
    p += g + r;
  }
  return y;
}
function Ts(t, e, o) {
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  const l = new Map(e.map((d) => [d.id, d]));
  for (const [d, c] of t) {
    const a = l.get(d);
    if (!a) continue;
    const f = Mo(a, o);
    r = Math.min(r, c.x), n = Math.min(n, c.y), s = Math.max(s, c.x + a.w), i = Math.max(i, c.y + f);
  }
  return Number.isFinite(r) ? { minX: r, minY: n, maxX: s, maxY: i } : { minX: 0, minY: 0, maxX: 0, maxY: 0 };
}
function $d(t, e, o) {
  const r = Ts(t, e, o), n = -r.minX, s = -r.minY, i = /* @__PURE__ */ new Map();
  for (const [l, d] of t)
    i.set(l, { x: d.x + n, y: d.y + s });
  return i;
}
function Un(t, e) {
  const o = t.x + t.w / 2, r = t.y + t.h / 2, n = e.x + e.w / 2, s = e.y + e.h / 2, i = Math.min(t.x + t.w, e.x + e.w) - Math.max(t.x, e.x), l = Math.min(t.y + t.h, e.y + e.h) - Math.max(t.y, e.y);
  return i <= 0 || l <= 0 ? null : i < l ? o < n ? { dx: -i, dy: 0 } : { dx: i, dy: 0 } : r < s ? { dx: 0, dy: -l } : { dx: 0, dy: l };
}
function Qn(t, e, o, r, n) {
  var c;
  const s = Mo(t, o);
  let i = 0, l = 0;
  const d = r == null ? void 0 : r.get(t.type);
  if ((c = d == null ? void 0 : d.ports) != null && c.length) {
    const a = (Za + 12) / Math.max(0.35, n);
    d.ports.some((f) => f.direction === "input") && (i = a), d.ports.some((f) => f.direction === "output") && (l = a);
  }
  return {
    x: e.x - i,
    y: e.y,
    w: t.w + i + l,
    h: s
  };
}
function Qa(t, e, o, r) {
  const n = 14 + 10 / Math.max(0.35, r);
  for (let s = 0; s < 40; s++)
    for (let i = 0; i < e.length; i++)
      for (let l = i + 1; l < e.length; l++) {
        const d = e[i], c = e[l], a = t.get(d.id), f = t.get(c.id), y = Mo(d, o), p = Mo(c, o), u = a.x + d.w / 2, m = a.y + y / 2, g = f.x + c.w / 2, x = f.y + p / 2;
        let b = u - g, w = m - x, I = Math.hypot(b, w);
        if (I >= n) continue;
        if (I < 1e-4) {
          const M = (i * 2.17 + l * 3.91 + s * 0.37) % (Math.PI * 2);
          b = Math.cos(M), w = Math.sin(M), I = 0;
        } else
          b /= I, w /= I;
        const k = (n - I) * 0.62 + 6 / Math.max(0.35, r);
        a.x += b * k, a.y += w * k, f.x -= b * k, f.y -= w * k;
      }
}
function _d(t, e, o, r, n) {
  const s = Mo(t, o), i = Mo(e, o), l = t.x + t.w / 2, d = t.y + s / 2, c = e.x + e.w / 2, a = e.y + i / 2;
  let f = c - l, y = a - d, p = Math.hypot(f, y);
  p < 1e-4 && (f = 1, y = 0, p = 1);
  const u = -y / p, m = f / p, g = Math.floor(r / 2) + 1, b = (r % 2 === 0 ? 1 : -1) * (18 / Math.max(0.35, n)) * Math.min(3, g) * (1 + g * 0.12);
  return { dx: u * b, dy: m * b };
}
function Jn(t, e, o, r, n = 0) {
  const s = 13 / r, i = 7 / r, l = 5 / r, d = 6 / r, c = Math.max(...t.map((y) => y.text.length), 1), a = Math.min(c * d + i * 2, 280 / r) + n, f = t.length * s + l * 2;
  return {
    x: e - a / 2,
    y: o - f / 2,
    w: a,
    h: f
  };
}
function th(t, e, o, r, n, s) {
  var f, y;
  const i = o.data, l = Ee(
    t,
    e,
    i.edgeType ?? "bezier",
    n,
    i.sourceHandle,
    i.targetHandle,
    i.midpointOffset,
    i.curveOffset,
    (() => {
      if (!i.sourcePort || !r) return;
      const p = r.get(t.type);
      if (p != null && p.ports)
        return Ae(
          t,
          p.ports,
          i.sourcePort,
          s,
          n,
          p.portAnchor ?? "bbox"
        ) ?? void 0;
    })(),
    (() => {
      if (!i.targetPort || !r) return;
      const p = r.get(e.type);
      if (p != null && p.ports)
        return Ae(
          e,
          p.ports,
          i.targetPort,
          s,
          n,
          p.portAnchor ?? "bbox"
        ) ?? void 0;
    })(),
    i.sourceT,
    i.targetT,
    i.attachmentGap
  ), d = l.labelX, c = l.labelY;
  if (i.sourcePort && i.targetPort) {
    const p = (f = i.label) == null ? void 0 : f.trim();
    if (!Is(e))
      return p ? Jn([{ text: p }], d, c, s, 0) : null;
    const u = [];
    p && u.push({ text: p }), u.push({
      text: `${i.sourcePort} → ${i.targetPort}`
    }), u.push({ text: "compute 999 ms" });
    const m = 9 / s;
    return Jn(
      u,
      d,
      c,
      s,
      m * 2 + 6 / s
    );
  }
  const a = (y = i.label) == null ? void 0 : y.trim();
  return a ? Jn(
    [{ text: a }],
    d,
    c,
    s,
    0
  ) : null;
}
function Wi(t, e, o, r, n, s) {
  const i = _d(e, o, r, n, s);
  return { ...t, x: t.x + i.dx, y: t.y + i.dy };
}
function eh(t, e) {
  const o = Math.hypot(t.x, t.y);
  if (o > e && o > 1e-9) {
    const r = e / o;
    t.x *= r, t.y *= r;
  }
}
function oh(t) {
  return [...t].sort(
    (e, o) => e.data.fromId.localeCompare(o.data.fromId) || e.data.toId.localeCompare(o.data.toId) || e.id.localeCompare(o.id)
  );
}
function rh(t, e, o, r, n, s) {
  if (e.length < 2) return;
  const i = new Map(e.map((f) => [f.id, f])), l = new Set(e.map((f) => f.id)), d = 78, c = (f, y, p, u) => {
    const m = u.get(f) ?? { x: 0, y: 0 };
    m.x += y, m.y += p, u.set(f, m);
  }, a = Math.max(0.35, s);
  for (let f = 0; f < d; f++) {
    const y = /* @__PURE__ */ new Map(), p = 0.36 + f * 9e-3, u = 34, m = (w) => {
      const I = i.get(w), k = t.get(w);
      return { ...I, x: k.x, y: k.y };
    };
    for (let w = 0; w < e.length; w++)
      for (let I = w + 1; I < e.length; I++) {
        const k = e[w], M = e[I], C = Qn(
          k,
          t.get(k.id),
          n,
          r,
          a
        ), A = Qn(
          M,
          t.get(M.id),
          n,
          r,
          a
        ), P = Un(C, A);
        if (!P) continue;
        const V = 1.08 + (f < 24 ? 0.12 : 0), X = P.dx * 0.5 * V, et = P.dy * 0.5 * V;
        c(k.id, X, et, y), c(M.id, -X, -et, y);
      }
    const g = [], x = oh(o);
    let b = 0;
    for (const w of x) {
      const { fromId: I, toId: k } = w.data;
      if (!l.has(I) || !l.has(k)) continue;
      const M = th(
        m(I),
        m(k),
        w,
        r,
        n,
        s
      );
      M && g.push({ rect: M, fromId: I, toId: k, idx: b++ });
    }
    for (const { rect: w, fromId: I, toId: k } of g)
      for (const M of e) {
        const C = Qn(
          M,
          t.get(M.id),
          n,
          r,
          a
        ), A = Un(w, C);
        if (!A) continue;
        const P = M.id === I || M.id === k ? 0.58 : 0.44;
        c(I, A.dx * P, A.dy * P, y), c(k, A.dx * P, A.dy * P, y), M.id !== I && M.id !== k && c(M.id, -A.dx * P * 0.9, -A.dy * P * 0.9, y);
      }
    for (let w = 0; w < g.length; w++)
      for (let I = w + 1; I < g.length; I++) {
        const k = g[w], M = g[I], C = Wi(
          k.rect,
          m(k.fromId),
          m(k.toId),
          n,
          k.idx * 2,
          s
        ), A = Wi(
          M.rect,
          m(M.fromId),
          m(M.toId),
          n,
          M.idx * 2 + 1,
          s
        );
        let P = Un(C, A);
        if (!P) {
          const it = C.x + C.w / 2, pt = C.y + C.h / 2, wt = A.x + A.w / 2, xt = A.y + A.h / 2;
          let D = it - wt, W = pt - xt, G = Math.hypot(D, W);
          if (G < 1e-4) {
            const K = (w * 1.7 + I * 2.3 + f * 0.11) % (Math.PI * 2);
            D = Math.cos(K), W = Math.sin(K), G = 1;
          } else
            D /= G, W /= G;
          P = { dx: D * 14, dy: W * 14 };
        }
        const V = 0.5 + (f < 30 ? 0.12 : 0), X = P.dx * V, et = P.dy * V;
        c(k.fromId, X, et, y), c(k.toId, X, et, y), c(M.fromId, -X, -et, y), c(M.toId, -X, -et, y);
      }
    for (const [w, I] of y) {
      const k = { x: I.x * p, y: I.y * p };
      eh(k, u);
      const M = t.get(w);
      M && (M.x += k.x, M.y += k.y);
    }
    (f === 20 || f === 45) && Qa(t, e, n, s);
  }
}
function nh(t, e, o, r, n, s = 1) {
  const i = Math.max(24, r ?? 32), l = Math.max(16, Math.round((r ?? 32) * 0.5)), d = Math.max(32, i), c = new Map(t.map((C) => [C.id, C])), a = [...e].map((C) => c.get(C)).filter(
    (C) => !!C && C.type !== "edge" && !C.locked
  );
  if (a.length < 2) return [];
  const f = new Set(a.map((C) => C.id)), y = Kd(t, f), p = qd(y), u = Zd(
    a.map((C) => C.id),
    p
  );
  u.sort((C, A) => {
    const P = Math.min(...C.map((X) => {
      var et;
      return ((et = c.get(X)) == null ? void 0 : et.x) ?? 0;
    })), V = Math.min(...A.map((X) => {
      var et;
      return ((et = c.get(X)) == null ? void 0 : et.x) ?? 0;
    }));
    return P - V;
  });
  const m = /* @__PURE__ */ new Map();
  let g = 0;
  for (const C of u) {
    const A = C.map((W) => c.get(W)).filter((W) => !!W), P = new Set(C), V = y.filter(
      (W) => P.has(W.data.fromId) && P.has(W.data.toId)
    ), X = p.filter(
      (W) => P.has(W.from) && P.has(W.to)
    ), it = V.some(
      (W) => W.data.sourcePort && W.data.targetPort
    ) ? 1.72 : 1.18, pt = i * it, wt = l * it;
    let xt;
    X.length === 0 || !jd(C, X) ? xt = Ud(A, o, pt, wt) : xt = Jd(
      A,
      X,
      o,
      pt,
      wt
    ), Qa(
      xt,
      A,
      o,
      Math.max(0.25, s)
    ), rh(
      xt,
      A,
      V,
      n,
      o,
      Math.max(0.25, s)
    ), xt = $d(xt, A, o);
    const D = Ts(xt, A, o);
    for (const [W, G] of xt)
      m.set(W, { x: G.x + g, y: G.y });
    g += D.maxX - D.minX + d;
  }
  const x = Math.min(...a.map((C) => C.x)), b = Math.min(...a.map((C) => C.y)), w = Ts(m, a, o), I = x - w.minX, k = b - w.minY, M = [];
  for (const C of a) {
    const A = m.get(C.id);
    A && M.push({ id: C.id, x: A.x + I, y: A.y + k });
  }
  return M;
}
function sh(t, e, o) {
  const r = t.x, n = t.x + t.w / 2, s = t.x + t.w, i = t.y, l = t.y + t.h / 2, d = t.y + t.h, c = [r, n, s], a = [i, l, d];
  let f = 1 / 0, y = 1 / 0;
  const p = [];
  for (const m of e) {
    const g = m.x, x = m.x + m.w / 2, b = m.x + m.w, w = m.y, I = m.y + m.h / 2, k = m.y + m.h, M = [g, x, b], C = [w, I, k];
    for (const A of c)
      for (const P of M) {
        const V = P - A;
        Math.abs(V) <= o && (Math.abs(V) < Math.abs(f) && (f = V), p.push({
          axis: "x",
          position: P,
          start: Math.min(t.y, t.y + t.h, m.y, m.y + m.h),
          end: Math.max(t.y, t.y + t.h, m.y, m.y + m.h)
        }));
      }
    for (const A of a)
      for (const P of C) {
        const V = P - A;
        Math.abs(V) <= o && (Math.abs(V) < Math.abs(y) && (y = V), p.push({
          axis: "y",
          position: P,
          start: Math.min(t.x, t.x + t.w, m.x, m.x + m.w),
          end: Math.max(t.x, t.x + t.w, m.x, m.x + m.w)
        }));
      }
  }
  const u = /* @__PURE__ */ new Map();
  for (const m of p) {
    const g = `${m.axis}:${m.position.toFixed(1)}`, x = u.get(g);
    x ? (x.start = Math.min(x.start, m.start), x.end = Math.max(x.end, m.end)) : u.set(g, { ...m });
  }
  return {
    guides: Array.from(u.values()),
    snapDx: Math.abs(f) <= o ? f : 0,
    snapDy: Math.abs(y) <= o ? y : 0
  };
}
const Rr = class Rr {
  constructor() {
    vt(this, "nodes", /* @__PURE__ */ new Map());
    vt(this, "viewport", { x: 0, y: 0, zoom: 1 });
    vt(this, "selection", /* @__PURE__ */ new Set());
    vt(this, "activeGroupId", null);
    vt(this, "groupRotations", /* @__PURE__ */ new Map());
    /** Maps child groupId → parent groupId for nested groups. */
    vt(this, "groupParent", /* @__PURE__ */ new Map());
    /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
    vt(this, "groupChildren", /* @__PURE__ */ new Map());
    vt(this, "mode", "select");
    vt(this, "activeTool", {
      tool: "pen",
      color: "#1e1e2e",
      width: 3,
      shapeType: "rect",
      strokeStyle: "solid",
      roughness: 1,
      opacity: 1
    });
    vt(this, "containerOffset", { x: 0, y: 0 });
    /** DOM element that hosts the canvas — used to derive the correct window in pop-out scenarios. */
    vt(this, "_container", null);
    vt(this, "snapToGrid", !1);
    vt(this, "smartGuides", !0);
    vt(this, "lassoSelect", !1);
    vt(this, "freeFormEdges", !0);
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
    vt(this, "readOnly", !1);
    vt(this, "presentationMode", !1);
    vt(this, "presentationSlides", []);
    vt(this, "presentationIndex", 0);
    vt(this, "_presentationAnimId", null);
    /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
    vt(this, "_transitionOverlay", null);
    vt(this, "gridSize", 20);
    vt(this, "boardBackground", "dot-grid");
    /** Saved "origin" viewport position restored on next load. */
    vt(this, "originView", null);
    /** Current alignment guides (set during drag). */
    vt(this, "alignGuides", []);
    /** Container dimensions for viewport bounds computation. */
    vt(this, "_containerWidth", 2e3);
    vt(this, "_containerHeight", 1500);
    vt(this, "history", new nd());
    /** When set, `updateNodeWithHistoryCoalesced` reuses one undo step until `endHistoryCoalesce()`. */
    vt(this, "_historyCoalesceKey", null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vt(this, "listeners", {});
    vt(this, "_suppressEvents", !1);
    vt(this, "_collabMode", !1);
    /** When > 0, `addNode`/`addNodes` skip their own history snapshot push
     *  so a single `beginAgentAction()` snapshot covers multiple operations. */
    vt(this, "_agentActionDepth", 0);
    /** Auto-reset timer for `beginAgentAction()` when no matching `endAgentAction()`
     *  arrives in time (cross-process MCP callers can crash between begin/end). */
    vt(this, "_agentActionTimer", null);
    vt(this, "clipboard", []);
    vt(this, "pasteCount", 0);
    vt(this, "nextZValue", 1);
    vt(this, "_minZ", 0);
    vt(this, "quadTree", new xs({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    vt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    vt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    vt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    vt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    vt(this, "_measuredHeights", {});
    vt(this, "_search", {
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
      for (const l of i) {
        const d = this.countOccurrences(l.text.toLocaleLowerCase(), o);
        d > 0 && r.push({
          nodeId: s.id,
          nodeType: s.type,
          field: l.field,
          text: l.text,
          matchCount: d
        });
      }
    }
    return r;
  }
  getNodeSearchCandidates(e) {
    if (!e.data || typeof e.data != "object") return [];
    const o = e.data, r = [], n = (s, i) => {
      if (typeof i != "string") return;
      const l = i.trim();
      l && r.push({ field: s, text: l });
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
      const s = n, i = Array.isArray(s.content) ? s.content.filter((d) => d && typeof d == "object" && (d.type ?? "text") === "text").map((d) => typeof d.text == "string" ? d.text : "").join("") : "", l = Array.isArray(s.children) && s.children.length > 0 ? o(s.children) : "";
      return l ? `${i}
${l}` : i;
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
    for (const d of this.nodes.values())
      if (d.type === "frame") {
        const c = d.data;
        e.push({ id: d.id, x: d.x, y: d.y, order: c.slideOrder });
      }
    if (e.length === 0) return;
    const o = e.filter((d) => d.order != null).sort((d, c) => d.order - c.order), r = e.filter((d) => d.order == null), n = 100;
    r.sort((d, c) => d.y - c.y);
    const s = [];
    for (const d of r) {
      const c = s[s.length - 1];
      c && Math.abs(d.y - c[0].y) < n ? c.push(d) : s.push([d]);
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
    const o = this.presentationSlides[e], r = this.nodes.get(o);
    if (!r) {
      this.exitPresentation();
      return;
    }
    const n = this.presentationIndex;
    this.presentationIndex = e, this.emit("presentation"), this._presentationAnimId != null && (cancelAnimationFrame(this._presentationAnimId), this._presentationAnimId = null), this._transitionOverlay = null;
    const s = this._computeSlideViewport(r), i = r.data, l = i.transition ?? "pan", d = i.transitionDuration, c = e >= n ? 1 : -1;
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
    const o = this.resolveHeight(e), r = 40, n = e.x - r, s = e.y - r, i = e.w + r * 2, l = o + r * 2, d = this._containerWidth, c = this._containerHeight, a = oo(Math.min(d / i, c / l), 0.1, 5);
    return {
      x: (d - i * a) / 2 - n * a,
      y: (c - l * a) / 2 - s * a,
      zoom: a
    };
  }
  /** Pan transition: smooth viewport interpolation (default). */
  _transitionPan(e, o) {
    const r = o ?? 400, n = performance.now(), s = { ...this.viewport }, i = (l) => {
      const d = Math.min((l - n) / r, 1), c = 1 - Math.pow(1 - d, 3);
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
    const r = (o ?? 500) / 2, n = performance.now(), s = (i) => {
      const l = Math.min((i - n) / r, 1);
      if (this._transitionOverlay = { type: "fade", phase: "out", progress: l }, this.emit("presentation"), l < 1)
        this._presentationAnimId = requestAnimationFrame(s);
      else {
        this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport");
        const d = performance.now(), c = (a) => {
          const f = Math.min((a - d) / r, 1);
          this._transitionOverlay = { type: "fade", phase: "in", progress: f }, this.emit("presentation"), f < 1 ? this._presentationAnimId = requestAnimationFrame(c) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
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
    const i = (l) => {
      const d = Math.min((l - n) / r, 1);
      d < 0.5 ? this._transitionOverlay = { type: "dissolve", phase: "out", progress: d * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "dissolve", phase: "in", progress: (d - 0.5) * 2 }), this.emit("presentation"), d < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Zoom transition: zoom out from current, zoom into target. */
  _transitionZoom(e, o) {
    const r = o ?? 600, n = performance.now(), s = { ...this.viewport }, i = Math.max(0.1, Math.min(s.zoom, e.zoom) * 0.35), l = (s.x + e.x) / 2, d = (s.y + e.y) / 2, c = (a) => {
      const f = Math.min((a - n) / r, 1);
      if (f < 0.5) {
        const y = f * 2, p = 1 - Math.pow(1 - y, 3);
        this.viewport.x = s.x + (l - s.x) * p, this.viewport.y = s.y + (d - s.y) * p, this.viewport.zoom = s.zoom + (i - s.zoom) * p;
      } else {
        const y = (f - 0.5) * 2, p = 1 - Math.pow(1 - y, 3);
        this.viewport.x = l + (e.x - l) * p, this.viewport.y = d + (e.y - d) * p, this.viewport.zoom = i + (e.zoom - i) * p;
      }
      this.emit("viewport"), f < 1 ? this._presentationAnimId = requestAnimationFrame(c) : this._presentationAnimId = null;
    };
    this._presentationAnimId = requestAnimationFrame(c);
  }
  /** Fold transition: two halves fold shut like a book, snap viewport, unfold to reveal. */
  _transitionFold(e, o) {
    const r = o ?? 700, n = performance.now();
    let s = !1;
    const i = (l) => {
      const d = Math.min((l - n) / r, 1);
      d < 0.5 ? this._transitionOverlay = { type: "fold", phase: "out", progress: d * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "fold", phase: "in", progress: (d - 0.5) * 2 }), this.emit("presentation"), d < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
  _transitionCube(e, o, r = 1) {
    const n = o ?? 1200, s = performance.now();
    let i = !1;
    const l = (d) => {
      const c = Math.min((d - s) / n, 1);
      c >= 0.5 && !i && (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), i = !0), this._transitionOverlay = {
        type: "cube",
        phase: c < 0.5 ? "out" : "in",
        progress: c < 0.5 ? c * 2 : (c - 0.5) * 2,
        direction: r,
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
    const r = this._containerWidth, n = this._containerHeight;
    this._containerWidth = e, this._containerHeight = o, this.presentationMode && this.presentationSlides.length > 0 ? this.presentationGoTo(this.presentationIndex) : r > 0 && n > 0 && (this.viewport.x += (e - r) / 2, this.viewport.y += (o - n) / 2, this.emit("viewport"));
  }
  /**
   * Precompute static guide candidates for a drag gesture.
   * Reuse this context across pointermove frames to reduce QuadTree work.
   */
  createDragSnapContext(e) {
    const o = e instanceof Set ? e : new Set(e), r = -this.viewport.x / this.viewport.zoom, n = -this.viewport.y / this.viewport.zoom, s = this._containerWidth / this.viewport.zoom, i = this._containerHeight / this.viewport.zoom, l = [], d = this.quadTree.retrieve([], { x: r, y: n, w: s, h: i });
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
  computeDragSnap(e, o, r, n, s, i) {
    const l = this.snapToGrid && !s, d = this.smartGuides && !s;
    let c = r, a = n, f = [];
    const y = o instanceof Set ? o : new Set(o);
    if (d) {
      let p = 1 / 0, u = 1 / 0, m = -1 / 0, g = -1 / 0;
      for (const I of e) {
        const k = this.getNode(I.id);
        if (!k) continue;
        const M = I.x + r, C = I.y + n, A = this.resolveHeight(k);
        p = Math.min(p, M), u = Math.min(u, C), m = Math.max(m, M + k.w), g = Math.max(g, C + A);
      }
      const x = { x: p, y: u, w: m - p, h: g - u }, b = (i == null ? void 0 : i.staticNodes) ?? this.createDragSnapContext(y).staticNodes, w = sh(x, b, 5);
      if (f = w.guides, l) {
        const I = e[0].x + r, k = e[0].y + n, M = this.snap(I, k), C = M.x - I, A = M.y - k, P = w.snapDx !== 0 && Math.abs(w.snapDx) <= Math.abs(C), V = w.snapDy !== 0 && Math.abs(w.snapDy) <= Math.abs(A);
        c = r + (P ? w.snapDx : C), a = n + (V ? w.snapDy : A), P || (f = f.filter((X) => X.axis !== "x")), V || (f = f.filter((X) => X.axis !== "y"));
      } else
        c = r + w.snapDx, a = n + w.snapDy;
    } else if (l) {
      const p = this.snap(e[0].x + r, e[0].y + n);
      c = p.x - e[0].x, a = p.y - e[0].y;
    }
    return this.alignGuides = f, this.emit("guides"), { finalDx: c, finalDy: a };
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
  zoomByWheel(e, o, r) {
    this.viewport = yd(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, r) {
    this.viewport = md(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const r = oo(e, 0.1, 5);
    if (o) {
      const n = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = ur(this.viewport, n, s);
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
    const n = r.h === "auto" ? 100 : r.h, s = r.x + r.w / 2, i = r.y + n / 2, l = this.getWindow(), d = l.innerWidth, c = l.innerHeight, a = oo(o, 0.2, 5);
    this.viewport = {
      x: d / 2 - s * a,
      y: c / 2 - i * a,
      zoom: a
    }, this.emit("viewport");
  }
  fitToContent() {
    if (this.nodes.size === 0) return;
    let e = 1 / 0, o = 1 / 0, r = -1 / 0, n = -1 / 0;
    for (const f of this.nodes.values()) {
      const y = f.h === "auto" ? 100 : f.h;
      f.x < e && (e = f.x), f.y < o && (o = f.y), f.x + f.w > r && (r = f.x + f.w), f.y + y > n && (n = f.y + y);
    }
    const s = 50;
    e -= s, o -= s, r += s, n += s;
    const i = r - e, l = n - o, d = this._containerWidth, c = this._containerHeight, a = oo(
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
    const r = o.h === "auto" ? 100 : o.h, n = 20, s = o.w + n * 2, i = r + n * 2, l = this._containerWidth, d = this._containerHeight, c = oo(
      Math.min(l / s, d / i),
      0.1,
      5
    );
    this.viewport = {
      x: (l - s * c) / 2 - (o.x - n) * c,
      y: (d - i * c) / 2 - (o.y - n) * c,
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
    return ur(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return pd(this.viewport, e, o);
  }
  // --- Node CRUD ---
  addNode(e) {
    var o, r, n;
    if (!this.readOnly) {
      if (this._agentActionDepth === 0 && (this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent)), this.nodes.set(e.id, e), this.quadTree.insert(e), e.z < this._minZ && (this._minZ = e.z), e.type === "edge") {
        const s = e, { fromId: i, toId: l } = s.data;
        this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.has(l) || this.adjacency.set(l, /* @__PURE__ */ new Set()), this.adjacency.get(i).add(e.id), this.adjacency.get(l).add(e.id);
      }
      e.type !== "edge" && this.updateFrameMembership([e.id]), (n = (r = (o = this.registry) == null ? void 0 : o.get(e.type)) == null ? void 0 : r.onCreate) == null || n.call(r, e, this), this.emit("node:create", e), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
    }
  }
  addNodes(e) {
    if (this.readOnly || e.length === 0) return;
    this._agentActionDepth === 0 && (this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent));
    for (const r of e)
      if (this.nodes.set(r.id, r), this.quadTree.insert(r), r.type === "edge") {
        const n = r, { fromId: s, toId: i } = n.data;
        this.adjacency.has(s) || this.adjacency.set(s, /* @__PURE__ */ new Set()), this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.get(s).add(r.id), this.adjacency.get(i).add(r.id);
      }
    const o = e.filter((r) => r.type !== "edge").map((r) => r.id);
    o.length > 0 && this.updateFrameMembership(o), this.refreshSearchIfNeeded(), this.emit("change"), this.emit("history");
  }
  updateNode(e, o) {
    var s, i, l, d, c, a, f, y, p;
    if (this.readOnly) return;
    const r = this.nodes.get(e);
    if (!r) return;
    const n = { ...r, ...o };
    if (o.data && typeof o.data == "object" && r.data && typeof r.data == "object" && (n.data = {
      ...r.data,
      ...o.data
    }), this.nodes.set(e, n), (r.x !== n.x || r.y !== n.y || r.w !== n.w || r.h !== n.h || (r.rotation ?? 0) !== (n.rotation ?? 0)) && (this.quadTree.remove(r), this.quadTree.insert(n), this.updateConnectedEdges(e)), r.x !== n.x || r.y !== n.y) {
      const u = n.x - r.x, m = n.y - r.y;
      (l = (i = (s = this.registry) == null ? void 0 : s.get(n.type)) == null ? void 0 : i.onMove) == null || l.call(i, n, u, m, this), this.emit("node:move", n, u, m);
    }
    if (r.w !== n.w || r.h !== n.h) {
      const u = r.w !== 0 ? n.w / r.w : 1, m = r.h === "auto" ? 0 : r.h, g = n.h === "auto" ? 0 : n.h, x = m !== 0 ? g / m : 1;
      this.emit("node:resize", n, u, x);
    }
    (r.rotation ?? 0) !== (n.rotation ?? 0) && ((a = (c = (d = this.registry) == null ? void 0 : d.get(n.type)) == null ? void 0 : c.onRotate) == null || a.call(c, n, n.rotation ?? 0, this), this.emit("node:rotate", n, n.rotation ?? 0)), o.data && r.data !== n.data && ((p = (y = (f = this.registry) == null ? void 0 : f.get(n.type)) == null ? void 0 : y.onDataChange) == null || p.call(y, n, r.data, n.data, this), this.emit("node:data", n, r.data, n.data), this.refreshSearchIfNeeded()), this.emit("change");
  }
  /**
   * Batch update multiple nodes with a single change emit.
   * Use during drag/resize to avoid N re-renders per frame.
   */
  updateMany(e) {
    if (this.readOnly) return;
    let o = !1, r = !1;
    for (const { id: n, patch: s } of e) {
      const i = this.nodes.get(n);
      if (!i) continue;
      const l = { ...i, ...s };
      s.data && typeof s.data == "object" && i.data && typeof i.data == "object" && (l.data = {
        ...i.data,
        ...s.data
      }, r = !0), this.nodes.set(n, l), (i.x !== l.x || i.y !== l.y || i.w !== l.w || i.h !== l.h || (i.rotation ?? 0) !== (l.rotation ?? 0)) && (this.quadTree.remove(i), this.quadTree.insert(l), this.updateConnectedEdges(n)), o = !0;
    }
    o && r && this.refreshSearchIfNeeded(), o && this.emit("change");
  }
  updateConnectedEdges(e) {
    const o = this.adjacency.get(e);
    if (o)
      for (const r of o) {
        const n = this.nodes.get(r);
        if (!n || n.type !== "edge") continue;
        const s = n, i = this.nodes.get(s.data.fromId), l = this.nodes.get(s.data.toId);
        if (i && l) {
          const d = Ee(
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
          this.nodes.set(r, c), this.quadTree.remove(s), this.quadTree.insert(c);
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
  updateNodeWithHistoryCoalesced(e, o, r) {
    if (!this.readOnly) {
      if (this._collabMode) {
        this.updateNode(e, o);
        return;
      }
      this._historyCoalesceKey !== r && (this.history.pushSnapshot(this.nodes, this.groupParent), this._historyCoalesceKey = r, this.emit("history")), this.updateNode(e, o);
    }
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
    var r, n, s, i, l;
    if (this.readOnly || !this.nodes.has(e) || (r = this.nodes.get(e)) != null && r.locked) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = this.nodes.get(e);
    o && ((i = (s = (n = this.registry) == null ? void 0 : n.get(o.type)) == null ? void 0 : s.onDelete) == null || i.call(s, o, this), this.emit("node:delete", o), this.quadTree.remove(o)), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
    for (const d of this.frameChildren.values()) d.delete(e);
    for (const [d, c] of this.nodes)
      if (c.type === "edge") {
        const a = c.data;
        if (a.fromId === e || a.toId === e) {
          const f = this.nodes.get(d);
          f && this.quadTree.remove(f), this.nodes.delete(d), this.selection.delete(d);
          const y = a.fromId === e ? a.toId : a.fromId;
          (l = this.adjacency.get(y)) == null || l.delete(d);
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
          const l = this.nodes.get(i);
          l && this._containerTypes.has(l.type) && r(i);
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
        for (const l of s)
          i.add(l.id), o.add(l.id);
        this.frameChildren.set(r.id, i);
      }
    }
  }
  /** After nodes are moved, update which frames they belong to.
   *  Each node is assigned only to its smallest containing frame.
   *  Frames can be nested inside other frames (but not inside themselves or their descendants). */
  updateFrameMembership(e) {
    if (!this.readOnly)
      for (const o of e) {
        const r = this.nodes.get(o);
        if (!r || r.type === "edge") continue;
        const n = this.resolveHeight(r);
        for (const [c, a] of this.frameChildren) {
          if (!a.has(o)) continue;
          const f = this.nodes.get(c);
          if (!f) {
            a.delete(o);
            continue;
          }
          const y = this.resolveHeight(f);
          r.x >= f.x && r.y >= f.y && r.x + r.w <= f.x + f.w && r.y + n <= f.y + y || a.delete(o);
        }
        let s;
        this._containerTypes.has(r.type) && (s = this.getFrameDescendantIds(o));
        let i = null, l = 1 / 0;
        const d = this.quadTree.retrieve([], { x: r.x, y: r.y, w: r.w, h: n });
        for (const c of d) {
          if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
          const a = this.resolveHeight(c);
          if (r.x >= c.x && r.y >= c.y && r.x + r.w <= c.x + c.w && r.y + n <= c.y + a) {
            const y = c.w * a;
            y < l && (l = y, i = c);
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
        for (const a of this.nodes.values())
          a.id !== o && (n ? a.type === "edge" : a.type !== "edge") && a.z >= r.z && this._nodesOverlap(r, a) && s.push(a);
        if (s.length === 0) continue;
        s.sort((a, f) => a.z - f.z);
        const i = s[0], l = this.nodes.get(i.id), d = r.z, c = l.z;
        d === c ? this.nodes.set(o, { ...r, z: c + 1 }) : (this.nodes.set(o, { ...r, z: c }), this.nodes.set(i.id, { ...l, z: d }));
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
        for (const a of this.nodes.values())
          a.id !== o && (n ? a.type === "edge" : a.type !== "edge") && a.z <= r.z && this._nodesOverlap(r, a) && s.push(a);
        if (s.length === 0) continue;
        s.sort((a, f) => f.z - a.z);
        const i = s[0], l = this.nodes.get(i.id), d = r.z, c = l.z;
        d === c ? this.nodes.set(o, { ...r, z: c - 1 }) : (this.nodes.set(o, { ...r, z: c }), this.nodes.set(i.id, { ...l, z: d }));
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
    const n = ve.isEnabled(), s = n ? performance.now() : 0, i = 50, l = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), d = /* @__PURE__ */ new Map();
    for (const a of l) d.set(a.id, a);
    const c = hd(d, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && ve.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, r) {
    const n = ve.isEnabled(), s = n ? performance.now() : 0, i = 50, l = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), d = /* @__PURE__ */ new Map();
    for (const a of l) d.set(a.id, a);
    const c = fd(d, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && ve.recordHitTest(performance.now() - s), c;
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
        const l = this.groupParent.get(i);
        if (!l || this.activeGroupId && l === this.activeGroupId) break;
        i = l;
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
    var o, r, n, s, i, l;
    for (const d of this.selection) {
      const c = this.nodes.get(d);
      c && ((n = (r = (o = this.registry) == null ? void 0 : o.get(c.type)) == null ? void 0 : r.onDeselect) == null || n.call(r, c, this), this.emit("node:deselect", c));
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
      l && ((s = (n = (r = this.registry) == null ? void 0 : r.get(l.type)) == null ? void 0 : n.onDelete) == null || s.call(n, l, this), this.emit("node:delete", l), this.quadTree.remove(l), this.nodes.delete(i));
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
    if (this.readOnly || e.length === 0) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = new Set(e);
    for (const i of e) {
      const l = this.nodes.get(i);
      if (l) {
        (s = (n = (r = this.registry) == null ? void 0 : r.get(l.type)) == null ? void 0 : n.onDelete) == null || s.call(n, l, this), this.emit("node:delete", l), this.quadTree.remove(l), this.nodes.delete(i), this.frameChildren.delete(i);
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
      for (const r of this.selection) {
        const n = this.nodes.get(r);
        if (!n) continue;
        this.quadTree.remove(n);
        let s = null;
        const i = (o = this.registry) == null ? void 0 : o.get(n.type);
        if (i != null && i.onFlip) {
          const l = i.onFlip(n, e, this);
          l && Object.keys(l).length > 0 && (s = {
            ...n,
            data: { ...n.data, ...l }
          });
        } else if (n.type === "draw") {
          const l = n;
          if (e === "h") {
            const d = l.data.points.map(
              ([c, a, f]) => [l.w - c, a, f]
            );
            s = { ...l, data: { ...l.data, points: d } };
          } else {
            const d = l.h === "auto" ? 0 : l.h, c = l.data.points.map(
              ([a, f, y]) => [a, d - f, y]
            );
            s = { ...l, data: { ...l.data, points: c } };
          }
        } else if (n.type === "shape") {
          const l = n;
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
        } else if (n.type === "image") {
          const l = n;
          s = e === "h" ? { ...l, data: { ...l.data, flipH: !l.data.flipH } } : { ...l, data: { ...l.data, flipV: !l.data.flipV } };
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
  /**
   * Re-layout selected nodes in one undo step: layered left-to-right flow when
   * selected edges form a DAG (with barycenter crossing reduction), otherwise a
   * tidy reading-order grid; then overlap refinement for nodes and estimated
   * wire labels. Skips edges and locked nodes.
   */
  arrangeSelectedNodes(e, o = 1) {
    const r = nh(
      this.getAllNodes(),
      this.selection,
      e,
      this.gridSize,
      this.registry,
      o
    );
    r.length !== 0 && this.batchUpdateWithHistory(
      r.map((n) => ({ id: n.id, patch: { x: n.x, y: n.y } }))
    );
  }
  /** Axis alignment for multi-select (union bbox reference). Skips edges and locked nodes. */
  alignSelectedNodes(e, o) {
    const r = [];
    for (const y of this.selection) {
      const p = this.nodes.get(y);
      !p || p.type === "edge" || p.locked || r.push(p);
    }
    if (r.length < 2) return;
    const n = (y) => y.h === "auto" ? (o == null ? void 0 : o[y.id]) ?? 100 : y.h;
    let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
    for (const y of r) {
      const p = n(y);
      s = Math.min(s, y.x), i = Math.min(i, y.y), l = Math.max(l, y.x + y.w), d = Math.max(d, y.y + p);
    }
    const c = (s + l) / 2, a = (i + d) / 2, f = [];
    for (const y of r) {
      const p = n(y);
      let u = y.x, m = y.y;
      switch (e) {
        case "left":
          u = s;
          break;
        case "right":
          u = l - y.w;
          break;
        case "centerH":
          u = c - y.w / 2;
          break;
        case "top":
          m = i;
          break;
        case "bottom":
          m = d - p;
          break;
        case "centerV":
          m = a - p / 2;
          break;
      }
      (u !== y.x || m !== y.y) && f.push({ id: y.id, patch: { x: u, y: m } });
    }
    f.length !== 0 && this.batchUpdateWithHistory(f);
  }
  /**
   * Even spacing between adjacent items along `axis` (sort by min edge on that axis).
   * Gaps are never negative: if the union bbox is narrower than the sum of sizes,
   * uses zero gap and centers the packed strip on the original bbox so nothing overlaps.
   * Skips edges and locked nodes.
   */
  distributeSelectedNodes(e, o) {
    const r = [];
    for (const i of this.selection) {
      const l = this.nodes.get(i);
      !l || l.type === "edge" || l.locked || r.push(l);
    }
    if (r.length < 2) return;
    const n = (i) => i.h === "auto" ? (o == null ? void 0 : o[i.id]) ?? 100 : i.h, s = [];
    if (e === "horizontal") {
      const i = [...r].sort((m, g) => m.x - g.x || m.id.localeCompare(g.id));
      let l = 1 / 0, d = -1 / 0, c = 0;
      for (const m of i)
        l = Math.min(l, m.x), d = Math.max(d, m.x + m.w), c += m.w;
      const a = d - l, f = a - c, y = f >= 0 ? f / (i.length - 1) : 0;
      let u = f >= 0 ? l : l + (a - c) / 2;
      for (const m of i) {
        const g = u;
        u += m.w + y, g !== m.x && s.push({ id: m.id, patch: { x: g } });
      }
    } else {
      const i = [...r].sort(
        (m, g) => m.y - g.y || m.id.localeCompare(g.id)
      );
      let l = 1 / 0, d = -1 / 0, c = 0;
      for (const m of i) {
        const g = n(m);
        l = Math.min(l, m.y), d = Math.max(d, m.y + g), c += g;
      }
      const a = d - l, f = a - c, y = f >= 0 ? f / (i.length - 1) : 0;
      let u = f >= 0 ? l : l + (a - c) / 2;
      for (const m of i) {
        const g = n(m), x = u;
        u += g + y, x !== m.y && s.push({ id: m.id, patch: { y: x } });
      }
    }
    s.length !== 0 && this.batchUpdateWithHistory(s);
  }
  // --- Grouping ---
  groupSelected() {
    if (this.readOnly || this.selection.size < 2 || this.activeGroupId) return;
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
    if (this.readOnly || this.selection.size === 0) return;
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
              const { groupId: i, ...l } = s;
              this.nodes.set(s.id, l);
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
        for (const l of i)
          o.has(l) || (o.add(l), r(l));
    };
    r(e);
    const n = [];
    for (const s of this.nodes.values())
      s.groupId && o.has(s.groupId) && n.push(s);
    return n;
  }
  duplicateSelected() {
    if (this.readOnly || this.selection.size === 0) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = 20, o = /* @__PURE__ */ new Map(), r = [];
    for (const s of this.selection) {
      const i = this.nodes.get(s);
      if (!i) continue;
      const l = Pt();
      o.set(i.id, l), r.push({
        ...JSON.parse(JSON.stringify(i)),
        id: l,
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
    if (this.readOnly || this.clipboard.length === 0) return;
    this.pasteCount++;
    let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
    for (const x of this.clipboard) {
      const b = x.h === "auto" ? 100 : x.h;
      x.x < r && (r = x.x), x.y < n && (n = x.y), x.x + x.w > s && (s = x.x + x.w), x.y + b > i && (i = x.y + b);
    }
    const l = (r + s) / 2, d = (n + i) / 2;
    let c, a;
    if (e !== void 0 && o !== void 0)
      c = e, a = o;
    else {
      const x = this.getWindow(), b = x.innerWidth / 2, w = x.innerHeight / 2, I = ur(this.viewport, b, w);
      c = I.x, a = I.y;
    }
    const f = this.pasteCount * 20, y = c - l + f, p = a - d + f, u = /* @__PURE__ */ new Map(), m = this.clipboard.map((x) => {
      const b = Pt();
      return u.set(x.id, b), {
        ...structuredClone(x),
        id: b,
        x: x.x + y,
        y: x.y + p,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const x of m)
      if (x.type === "edge" && x.data) {
        const b = x.data;
        u.has(b.fromId) && (b.fromId = u.get(b.fromId)), u.has(b.toId) && (b.toId = u.get(b.toId));
      }
    const g = /* @__PURE__ */ new Map();
    for (const x of m)
      x.groupId && (g.has(x.groupId) || g.set(x.groupId, Pt(10)), x.groupId = g.get(x.groupId));
    for (const [x, b] of this.groupParent)
      g.has(x) && g.has(b) && this.linkGroupParent(g.get(x), g.get(b));
    this.addNodes(m), this.selectMultiple(m.map((x) => x.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, r) {
    const n = Wa.find((p) => p.id === e);
    if (!n) return;
    const s = structuredClone(n.nodes), i = /* @__PURE__ */ new Map();
    for (const p of s) {
      const u = Pt(10);
      i.set(p.id, u), p.id = u;
    }
    for (const p of s) {
      if (p.type === "edge" && p.data) {
        const u = p.data;
        i.has(u.fromId) && (u.fromId = i.get(u.fromId)), i.has(u.toId) && (u.toId = i.get(u.toId));
      }
      p.groupId && i.has(p.groupId) && (p.groupId = i.get(p.groupId));
    }
    let l = 1 / 0, d = 1 / 0, c = -1 / 0, a = -1 / 0;
    for (const p of s) {
      if (p.type === "edge") continue;
      const u = p.h === "auto" ? 100 : p.h;
      l = Math.min(l, p.x), d = Math.min(d, p.y), c = Math.max(c, p.x + p.w), a = Math.max(a, p.y + u);
    }
    const f = o - (l + c) / 2, y = r - (d + a) / 2;
    for (const p of s)
      p.type !== "edge" && (p.x += f, p.y += y), p.z = this.nextZValue++;
    this.addNodes(s), this.selectMultiple(s.map((p) => p.id));
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
            const l = this.nodes.get(n);
            l && this.quadTree.remove(l), this.nodes.delete(n), this.selection.delete(n);
            const d = i.fromId === e ? i.toId : i.fromId;
            (r = this.adjacency.get(d)) == null || r.delete(n);
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
    return xd(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: r } = await Cd(e);
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
  // ═══════════════════════════════════════════════════════════════
  //  Agent API
  // ═══════════════════════════════════════════════════════════════
  // ── History grouping ─────────────────────────────────────────
  /** Begin a grouped agent action. All subsequent `addNode`/`addNodes` calls
   *  share one undo snapshot until `endAgentAction()` is called.
   *  Calling this while already inside a group is a no-op (idempotent).
   *
   *  Safety: if `endAgentAction()` is not called within `AGENT_ACTION_TIMEOUT_MS`
   *  (default 60s), the depth is force-reset to 0 so a crashed MCP client can't
   *  permanently disable per-op undo snapshots. In-process JS callers should
   *  prefer `runAgentAction(fn)` which handles begin/end via try/finally. */
  beginAgentAction() {
    this._agentActionDepth === 0 && (this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent), this.emit("history")), this._agentActionDepth++, this._agentActionTimer && clearTimeout(this._agentActionTimer), this._agentActionTimer = setTimeout(() => {
      console.warn(
        `[SpatialEngine] Agent action timed out after ${Rr.AGENT_ACTION_TIMEOUT_MS}ms — force-resetting depth (was ${this._agentActionDepth}).`
      ), this._agentActionDepth = 0, this._agentActionTimer = null;
    }, Rr.AGENT_ACTION_TIMEOUT_MS);
  }
  /** End a grouped agent action. The undo snapshot pushed by `beginAgentAction()`
   *  now covers all intermediate mutations. */
  endAgentAction() {
    this._agentActionDepth > 0 && this._agentActionDepth--, this._agentActionDepth === 0 && this._agentActionTimer && (clearTimeout(this._agentActionTimer), this._agentActionTimer = null);
  }
  /** Run a callback inside a `begin/end` agent action with try/finally semantics.
   *  Use this from in-process JS callers (the dev-app demo, tests, etc.) so a
   *  thrown exception can never leak `_agentActionDepth`. Supports sync + async. */
  runAgentAction(e) {
    this.beginAgentAction();
    try {
      const o = e();
      return o && typeof o.then == "function" ? o.finally(() => this.endAgentAction()) : (this.endAgentAction(), o);
    } catch (o) {
      throw this.endAgentAction(), o;
    }
  }
  /** Whether the engine is inside a `beginAgentAction()` / `endAgentAction()` block. */
  get isInAgentAction() {
    return this._agentActionDepth > 0;
  }
  // ── Mode + tool bundling ────────────────────────────────────
  /** Set mode and active tool in a single call — reduces agent round-trips. */
  activateTool(e) {
    this.setMode(e.mode), e.color !== void 0 && (this.activeTool.color = e.color), e.width !== void 0 && (this.activeTool.width = e.width), e.shapeType !== void 0 && (this.activeTool.shapeType = e.shapeType), e.fillColor !== void 0 && (this.activeTool.fillColor = e.fillColor), e.fillStyle !== void 0 && (this.activeTool.fillStyle = e.fillStyle), e.strokeStyle !== void 0 && (this.activeTool.strokeStyle = e.strokeStyle), e.roughness !== void 0 && (this.activeTool.roughness = e.roughness), e.opacity !== void 0 && (this.activeTool.opacity = e.opacity), e.fontSize !== void 0 && (this.activeTool.fontSize = e.fontSize), e.fontFamily !== void 0 && (this.activeTool.fontFamily = e.fontFamily), e.textAlign !== void 0 && (this.activeTool.textAlign = e.textAlign), e.edgeType !== void 0 && (this.activeTool.edgeType = e.edgeType), e.arrowHead !== void 0 && (this.activeTool.arrowHead = e.arrowHead), e.arrowTail !== void 0 && (this.activeTool.arrowTail = e.arrowTail), this.emit("change");
  }
  // ── Convenience creation methods ────────────────────────────
  /** Create a shape node (rect, ellipse, diamond, line, arrow).
   *  Returns the new node id. */
  createShape(e, o, r, n, s, i) {
    const l = e === "line" || e === "arrow", d = {
      shape: e,
      stroke: (i == null ? void 0 : i.stroke) ?? this.activeTool.color,
      strokeWidth: (i == null ? void 0 : i.strokeWidth) ?? this.activeTool.width,
      fill: (i == null ? void 0 : i.fill) ?? this.activeTool.fillColor ?? void 0,
      fillStyle: (i == null ? void 0 : i.fillStyle) ?? this.activeTool.fillStyle ?? void 0,
      strokeStyle: (i == null ? void 0 : i.strokeStyle) ?? this.activeTool.strokeStyle ?? void 0,
      roughness: (i == null ? void 0 : i.roughness) ?? this.activeTool.roughness ?? 1,
      opacity: (i == null ? void 0 : i.opacity) ?? this.activeTool.opacity ?? 1,
      label: (i == null ? void 0 : i.label) ?? void 0,
      labelFontSize: (i == null ? void 0 : i.labelFontSize) ?? void 0,
      edgeStyle: (i == null ? void 0 : i.edgeStyle) ?? void 0
    };
    l && (d.startPoint = [0, 0], d.endPoint = [n, s]);
    const c = Pt(10);
    return this.addNode({
      id: c,
      type: "shape",
      x: o,
      y: r,
      w: n,
      h: s,
      z: this.nextZ(),
      data: d
    }), c;
  }
  /** Create a text node. Returns the new node id. */
  createText(e, o, r, n) {
    const s = Pt(10), i = (n == null ? void 0 : n.w) ?? 200, l = this.estimateTextBlockHeight(e, (n == null ? void 0 : n.fontSize) ?? 16, i);
    return this.addNode({
      id: s,
      type: "text",
      x: o,
      y: r,
      w: i,
      h: l,
      z: this.nextZ(),
      data: {
        text: e,
        fontSize: (n == null ? void 0 : n.fontSize) ?? 16,
        fontFamily: (n == null ? void 0 : n.fontFamily) ?? "sans-serif",
        color: (n == null ? void 0 : n.color) ?? "#1e1e2e",
        align: (n == null ? void 0 : n.align) ?? "left",
        opacity: (n == null ? void 0 : n.opacity) ?? 1,
        borderColor: (n == null ? void 0 : n.borderColor) ?? void 0,
        borderWidth: (n == null ? void 0 : n.borderWidth) ?? void 0,
        borderStyle: (n == null ? void 0 : n.borderStyle) ?? void 0
      }
    }), s;
  }
  /** Estimate text block height from rough line count. */
  estimateTextBlockHeight(e, o, r) {
    const n = o * 0.6, s = Math.max(1, Math.floor(r / n));
    return e.split(`
`).reduce((l, d) => l + Math.max(1, Math.ceil(d.length / s)), 0) * o * 1.4 + 16;
  }
  /** Create a sticky note. Returns the new node id. */
  createSticky(e, o, r, n) {
    const s = Pt(10);
    return this.addNode({
      id: s,
      type: "sticky",
      x: o,
      y: r,
      w: (n == null ? void 0 : n.w) ?? 200,
      h: (n == null ? void 0 : n.h) ?? 150,
      z: this.nextZ(),
      data: {
        text: e,
        color: (n == null ? void 0 : n.color) ?? "#FEF3C7",
        fontSize: (n == null ? void 0 : n.fontSize) ?? 14,
        opacity: (n == null ? void 0 : n.opacity) ?? 1,
        edgeStyle: (n == null ? void 0 : n.edgeStyle) ?? void 0
      }
    }), s;
  }
  /** Create a rich-content block (BlockNote). Returns the new node id. */
  createContentBlock(e, o, r, n) {
    const s = Pt(10);
    return this.addNode({
      id: s,
      type: "content",
      x: o,
      y: r,
      w: (n == null ? void 0 : n.w) ?? 300,
      h: (n == null ? void 0 : n.h) ?? "auto",
      z: this.nextZ(),
      data: {
        blocks: e,
        markdown: (n == null ? void 0 : n.markdown) ?? void 0,
        borderColor: (n == null ? void 0 : n.borderColor) ?? void 0,
        borderWidth: (n == null ? void 0 : n.borderWidth) ?? void 0,
        borderStyle: (n == null ? void 0 : n.borderStyle) ?? void 0,
        opacity: (n == null ? void 0 : n.opacity) ?? void 0,
        edgeStyle: (n == null ? void 0 : n.edgeStyle) ?? void 0
      }
    }), s;
  }
  /** Create a frame node. Returns the new node id. */
  createFrame(e, o, r, n, s) {
    const i = Pt(10);
    return this.addNode({
      id: i,
      type: "frame",
      x: e,
      y: o,
      w: r,
      h: n,
      z: this.nextZ(),
      data: {
        label: (s == null ? void 0 : s.label) ?? void 0,
        backgroundColor: (s == null ? void 0 : s.backgroundColor) ?? void 0,
        borderColor: (s == null ? void 0 : s.borderColor) ?? void 0,
        borderWidth: (s == null ? void 0 : s.borderWidth) ?? void 0,
        borderStyle: (s == null ? void 0 : s.borderStyle) ?? void 0,
        opacity: (s == null ? void 0 : s.opacity) ?? void 0,
        slideOrder: (s == null ? void 0 : s.slideOrder) ?? void 0,
        devicePreset: (s == null ? void 0 : s.devicePreset) ?? void 0
      }
    }), i;
  }
  /** Create an image node. Returns the new node id. */
  createImage(e, o, r, n) {
    const s = Pt(10);
    return this.addNode({
      id: s,
      type: "image",
      x: o,
      y: r,
      w: (n == null ? void 0 : n.w) ?? 200,
      h: (n == null ? void 0 : n.h) ?? 150,
      z: this.nextZ(),
      data: {
        src: e,
        alt: (n == null ? void 0 : n.alt) ?? void 0,
        opacity: (n == null ? void 0 : n.opacity) ?? 1,
        flipH: (n == null ? void 0 : n.flipH) ?? void 0,
        flipV: (n == null ? void 0 : n.flipV) ?? void 0,
        borderColor: (n == null ? void 0 : n.borderColor) ?? void 0,
        borderWidth: (n == null ? void 0 : n.borderWidth) ?? void 0,
        borderStyle: (n == null ? void 0 : n.borderStyle) ?? void 0
      }
    }), s;
  }
  /** Create a draw stroke (freehand drawing). Returns the new node id.
   *  Points are in canvas coordinates; they are normalized relative to the
   *  computed bounding box internally. */
  createDrawStroke(e, o) {
    if (e.length === 0) throw new Error("createDrawStroke: must provide at least one point");
    let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
    for (const [c, a] of e)
      c < r && (r = c), a < n && (n = a), c > s && (s = c), a > i && (i = a);
    const l = e.map(
      ([c, a, f]) => [c - r, a - n, f ?? 0.5]
    ), d = Pt(10);
    return this.addNode({
      id: d,
      type: "draw",
      x: r,
      y: n,
      w: Math.max(s - r, 1),
      h: Math.max(i - n, 1),
      z: this.nextZ(),
      data: {
        tool: (o == null ? void 0 : o.tool) ?? "pen",
        points: l,
        color: (o == null ? void 0 : o.color) ?? this.activeTool.color,
        strokeWidth: (o == null ? void 0 : o.width) ?? this.activeTool.width,
        opacity: (o == null ? void 0 : o.opacity) ?? this.activeTool.opacity ?? 1,
        fill: (o == null ? void 0 : o.fill) ?? void 0,
        fillStyle: (o == null ? void 0 : o.fillStyle) ?? void 0,
        strokeStyle: (o == null ? void 0 : o.strokeStyle) ?? void 0
      }
    }), d;
  }
  /** Create an edge connecting two nodes. Returns the new node id. */
  createEdge(e, o, r) {
    if (!this.nodes.has(e)) throw new Error(`createEdge: source node "${e}" not found`);
    if (!this.nodes.has(o)) throw new Error(`createEdge: target node "${o}" not found`);
    const n = Pt(10);
    return this.addNode({
      id: n,
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: this.nextZ(),
      data: {
        fromId: e,
        toId: o,
        label: (r == null ? void 0 : r.label) ?? void 0,
        style: (r == null ? void 0 : r.style) ?? "solid",
        color: (r == null ? void 0 : r.color) ?? this.activeTool.color,
        strokeWidth: (r == null ? void 0 : r.strokeWidth) ?? this.activeTool.width,
        arrowHead: (r == null ? void 0 : r.arrowHead) ?? "arrow",
        arrowTail: (r == null ? void 0 : r.arrowTail) ?? "none",
        edgeType: (r == null ? void 0 : r.edgeType) ?? this.activeTool.edgeType ?? "bezier",
        animated: (r == null ? void 0 : r.animated) ?? void 0,
        animatedDirection: (r == null ? void 0 : r.animatedDirection) ?? void 0,
        sourceHandle: (r == null ? void 0 : r.sourceHandle) ?? void 0,
        targetHandle: (r == null ? void 0 : r.targetHandle) ?? void 0,
        sourcePort: (r == null ? void 0 : r.sourcePort) ?? void 0,
        targetPort: (r == null ? void 0 : r.targetPort) ?? void 0,
        roughness: (r == null ? void 0 : r.roughness) ?? void 0,
        attachmentGap: (r == null ? void 0 : r.attachmentGap) ?? void 0
      }
    }), n;
  }
  // ── State observation ───────────────────────────────────────
  /** Full structured snapshot of the engine for agent/LLM consumption.
   *
   *  Defaults to a 200-node cap to keep LLM context manageable on large boards.
   *  Pass `limit: 0` to disable the cap (caller takes responsibility for size).
   *  Use `nodeIds` / `types` / `region` to narrow before truncation. */
  getAgentState(e) {
    const o = (e == null ? void 0 : e.limit) ?? 200, r = e != null && e.nodeIds ? new Set(e.nodeIds) : null, n = e != null && e.types ? new Set(e.types) : null, s = e == null ? void 0 : e.region, i = this.getAllNodes(), l = [];
    for (const a of i)
      if (!(r && !r.has(a.id)) && !(n && !n.has(a.type))) {
        if (s) {
          const f = this.resolveHeight(a);
          if (a.x + a.w < s.x || a.y + f < s.y || a.x > s.x + s.w || a.y > s.y + s.h) continue;
        }
        l.push(a);
      }
    const d = o > 0 && l.length > o, c = d ? l.slice(0, o) : l;
    return {
      mode: this.mode,
      viewport: { ...this.viewport },
      selection: Array.from(this.selection),
      activeTool: { ...this.activeTool },
      nodeCount: this.nodes.size,
      returnedCount: c.length,
      truncated: d,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
      nodes: c.map((a) => {
        const f = a.data;
        let y, p, u;
        if (a.type === "text" && f)
          y = f.text, u = f.color;
        else if (a.type === "sticky" && f)
          y = f.text, u = f.color;
        else if (a.type === "shape" && f)
          p = f.label, u = f.stroke;
        else if (a.type === "edge" && f)
          p = f.label, u = f.color;
        else if (a.type === "frame" && f)
          p = f.label;
        else if (a.type === "content" && f) {
          const m = f.markdown;
          m && (y = m.length > 200 ? m.slice(0, 197) + "..." : m);
        }
        return {
          id: a.id,
          type: a.type,
          x: a.x,
          y: a.y,
          w: a.w,
          h: a.h,
          rotation: a.rotation,
          locked: a.locked,
          groupId: a.groupId,
          text: y,
          label: p,
          color: u
        };
      })
    };
  }
  /** Human-readable markdown summary of the current canvas, optimized for LLM prompts. */
  getAgentStateMarkdown(e) {
    const o = this.getAgentState(e), r = [];
    r.push(`**Mode:** ${o.mode}  **Nodes:** ${o.nodeCount}  **Selected:** ${o.selection.length}`), r.push(`**Viewport:** center (${Math.round(o.viewport.x)} ${Math.round(o.viewport.y)}), zoom ${o.viewport.zoom.toFixed(2)}`), o.truncated && r.push(`**Showing:** first ${o.returnedCount} of ${o.nodeCount} nodes (truncated — pass \`limit\` / \`region\` / \`types\` to narrow).`), o.canUndo && r.push("**Undo available:** yes"), o.canRedo && r.push("**Redo available:** yes");
    const n = /* @__PURE__ */ new Map();
    for (const s of o.nodes) {
      const i = n.get(s.type) || [];
      i.push(s), n.set(s.type, i);
    }
    for (const [s, i] of n) {
      r.push(`
**${s}** (${i.length}):`);
      for (const l of i.slice(0, 20)) {
        const d = `(${Math.round(l.x)}, ${Math.round(l.y)})`, c = `${Math.round(l.w)}×${l.h === "auto" ? "auto" : Math.round(l.h)}`, a = [l.label, l.text].filter(Boolean).join(" — ");
        r.push(`  • \`${l.id.slice(0, 8)}\` ${s} at ${d} ${c}${a ? ` — ${a.slice(0, 80)}` : ""}`);
      }
      i.length > 20 && r.push(`  … and ${i.length - 20} more`);
    }
    return r.join(`
`);
  }
  // ── Viewport animation ──────────────────────────────────────
  /** Smoothly animate the viewport to a target position/zoom.
   *  Returns a Promise that resolves when the animation completes. */
  animateViewport(e, o) {
    const r = (o == null ? void 0 : o.duration) ?? 400, n = { ...this.viewport }, s = {
      x: e.x ?? this.viewport.x,
      y: e.y ?? this.viewport.y,
      zoom: e.zoom ?? this.viewport.zoom
    };
    return new Promise((i) => {
      const l = performance.now(), d = (c) => {
        const a = Math.min((c - l) / r, 1), f = 1 - Math.pow(1 - a, 3);
        this.viewport.x = n.x + (s.x - n.x) * f, this.viewport.y = n.y + (s.y - n.y) * f, this.viewport.zoom = n.zoom + (s.zoom - n.zoom) * f, this.emit("viewport"), a < 1 ? requestAnimationFrame(d) : i();
      };
      requestAnimationFrame(d);
    });
  }
  /** Smoothly pan so the canvas point (cx, cy) is centered.
   *  Returns a Promise that resolves when the animation completes. */
  animatePanTo(e, o, r) {
    const n = this._containerWidth, s = this._containerHeight;
    return this.animateViewport(
      { x: n / 2 - e * this.viewport.zoom, y: s / 2 - o * this.viewport.zoom },
      { duration: r }
    );
  }
  /** Smoothly zoom to a level. Returns a Promise that resolves when done. */
  animateZoomTo(e, o) {
    const r = oo(e, 0.1, 5);
    return this.animateViewport({ zoom: r }, { duration: o });
  }
  /** Smoothly zoom and center on a specific node, sized to fit with padding.
   *  Returns a Promise that resolves when the animation completes. */
  animateZoomToNode(e, o) {
    const r = this.nodes.get(e);
    if (!r) return Promise.reject(new Error(`Node "${e}" not found`));
    const n = this.resolveHeight(r), s = r.x + r.w / 2, i = r.y + n / 2, l = this._containerWidth, d = this._containerHeight, c = 80, a = oo(
      Math.min(
        (l - c * 2) / Math.max(r.w, 1),
        (d - c * 2) / Math.max(n, 1)
      ),
      0.2,
      5
    );
    return this.animateViewport({
      x: l / 2 - s * a,
      y: d / 2 - i * a,
      zoom: a
    }, { duration: o });
  }
};
/** Max ms between begin/end before depth is force-reset to 0. */
vt(Rr, "AGENT_ACTION_TIMEOUT_MS", 6e4);
let zs = Rr;
const ih = /* @__PURE__ */ new Set([
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
function ah(t) {
  var o, r;
  const e = ((o = t.docs) == null ? void 0 : o.id) ?? t.type;
  return {
    type: t.type,
    origin: ih.has(t.type) ? "builtin" : "custom",
    docsLocalizationKey: e,
    isDataFlow: !!((r = t.ports) != null && r.length),
    ports: (t.ports ?? []).map((n) => ({
      id: n.id,
      label: n.label,
      direction: n.direction,
      dataType: n.dataType,
      defaultValue: n.defaultValue
    })),
    portAnchor: t.portAnchor,
    hasCompute: typeof t.compute == "function",
    isContainer: !!t.isContainer,
    isSVGOnly: !!t.isSVGOnly,
    handlesOwnLayout: !!t.handlesOwnLayout,
    hasPropertiesPanel: typeof t.propertiesPanel == "function"
  };
}
class lh {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vt(this, "types", /* @__PURE__ */ new Map());
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
    return this.getAll().map((e) => ah(e)).sort((e, o) => e.type.localeCompare(o.type));
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
const Fi = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], ch = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function In(t, e) {
  const o = Fi.indexOf(t);
  if (o === -1) return "default";
  const r = (e % 360 + 360) % 360, n = Math.round(r / 45) % 8, s = (o + n) % 8;
  return ch[Fi[s]];
}
function As(t, e, o, r, n, s, i, l, d) {
  if (!(t === "nw" || t === "ne" || t === "sw" || t === "se") || r <= 0 || n <= 0 || l <= 0 || d <= 0)
    return { x: s, y: i, w: l, h: d };
  const a = r / n;
  let f = l, y = d;
  f / y > a ? f = y * a : y = f / a;
  let p = s, u = i;
  return t === "se" ? (p = e, u = o) : t === "ne" ? (p = e, u = o + n - y) : t === "sw" ? (p = e + r - f, u = o) : (p = e + r - f, u = o + n - y), { x: p, y: u, w: f, h: y };
}
class dh extends Nc {
  constructor() {
    super(...arguments);
    vt(this, "state", { hasError: !1 });
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
const hh = 0, uh = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function fh(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function ph({
  node: t,
  isSelected: e,
  multiSelected: o,
  engine: r,
  schema: n,
  interactive: s,
  zoom: i,
  onMeasuredHeight: l,
  autoEdit: d
}) {
  const c = ft(null), a = ft(d === !0), f = ft(!1), y = ft(!1), p = ft(!1), u = ft(!1), m = ft(JSON.stringify(t.data.blocks ?? [])), [g, x] = rt(!1), [b, w] = rt(!1), I = ft(null), k = Xc({ schema: n }), M = ft(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  Mt(() => {
    const D = M.current;
    if (!D) return;
    M.current = null;
    const W = requestAnimationFrame(() => {
      try {
        k.replaceBlocks(k.document, D), m.current = JSON.stringify(k.document);
        return;
      } catch {
      }
      try {
        const G = k.blocksToHTMLLossy(D);
        k._tiptapEditor.commands.setContent(G), m.current = JSON.stringify(k.document);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), w(!0);
    });
    return () => cancelAnimationFrame(W);
  }, [k]), Mt(() => {
    (!e || o) && x(!1);
  }, [e, o]), Mt(() => {
    a.current && (a.current = !1, f.current = !0, x(!0));
  }, [k]), Mt(() => {
    if (!g || !f.current && !I.current) return;
    const D = I.current;
    I.current = null, f.current = !1;
    const W = requestAnimationFrame(() => {
      if (k.focus(), D)
        try {
          const G = k._tiptapEditor, J = G.view.posAtCoords({ left: D.x, top: D.y });
          J && G.commands.setTextSelection(J.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(W);
  }, [g, k]);
  const C = ct(() => {
    if (y.current || p.current) return;
    const D = r.getNode(t.id), W = k.document;
    m.current = JSON.stringify(W), r.updateNode(t.id, {
      data: { ...D == null ? void 0 : D.data, blocks: W }
    });
  }, [k, r, t.id]), A = 100;
  Mt(() => {
    if (!k) return;
    let D = null, W = 0;
    const G = () => {
      var q, ot;
      if (y.current || p.current || u.current) return;
      const J = k.document.length, N = r.getNode(t.id), _ = ((ot = (q = N == null ? void 0 : N.data) == null ? void 0 : q.blocks) == null ? void 0 : ot.length) ?? 0;
      if (J < _) return;
      const st = Date.now(), at = st - W;
      if (at >= A) {
        W = st, C();
        return;
      }
      D && clearTimeout(D), D = setTimeout(() => {
        D = null, W = Date.now(), C();
      }, A - at);
    }, K = k.onChange(G);
    return () => {
      K == null || K(), D && clearTimeout(D);
    };
  }, [k, C, r, t.id]), Mt(() => {
    const D = c.current;
    if (!D) return;
    const W = (G) => {
      const K = G.relatedTarget;
      K && D.contains(K) || C();
    };
    return D.addEventListener("focusout", W), () => D.removeEventListener("focusout", W);
  }, [C]), Mt(() => {
    if (g) return;
    const D = t.data.blocks;
    if (!Array.isArray(D)) return;
    const W = D.length > 0 ? D : [{ type: "paragraph", content: [] }], G = JSON.stringify(W);
    if (G !== m.current) {
      u.current = !0;
      try {
        k.replaceBlocks(k.document, W);
      } catch {
        try {
          const K = k.blocksToHTMLLossy(W);
          k._tiptapEditor.commands.setContent(K);
        } catch {
          u.current = !1;
          return;
        }
      }
      u.current = !1, m.current = G;
    }
  }, [t.data.blocks, g, k]), Mt(() => {
    if (t.h !== "auto" || !l) return;
    const D = c.current;
    if (!D) return;
    const W = () => {
      const K = D.offsetHeight;
      K > 0 && l(t.id, K);
    };
    W();
    const G = new ResizeObserver(W);
    return G.observe(D), () => G.disconnect();
  }, [t.id, t.h, l]);
  const P = ct(() => {
    const D = r.getNode(t.id);
    if (!D || D.h === "auto" || !k || !c.current)
      return;
    const W = D.h - hh, G = c.current.querySelector(".bn-editor");
    if (!G) return;
    const K = k.document;
    if (K.length === 0) return;
    let J = 0;
    for (let at = K.length - 1; at >= 1 && fh(K[at]); at--)
      J++;
    const N = G.scrollHeight, _ = K.length > 0 ? N / K.length : 36;
    if (y.current = !0, N < W) {
      const at = W - N, q = Math.max(0, Math.floor(at / _));
      if (q > 0) {
        const ot = K[K.length - 1];
        k.insertBlocks(
          Array.from({ length: q }, () => ({
            type: "paragraph",
            content: []
          })),
          ot,
          "after"
        );
      }
    } else if (N > W && J > 0) {
      const at = N - W, q = Math.min(J, Math.ceil(at / _));
      if (q > 0) {
        const ot = K.slice(K.length - q);
        k.removeBlocks(ot);
      }
    }
    const st = r.getNode(t.id);
    st && (r.updateNode(t.id, {
      data: { ...st.data, blocks: k.document }
    }), m.current = JSON.stringify(k.document)), y.current = !1;
  }, [k, r, t.id]), V = ft(P);
  V.current = P, Mt(() => {
    if (t.h === "auto") return;
    const D = setTimeout(() => V.current(), 60);
    return () => clearTimeout(D);
  }, []);
  const X = ct(
    (D) => {
      const W = D.currentTarget.ownerDocument;
      if (D.altKey) return;
      if (!r.selection.has(t.id) && r.selection.size > 0) {
        const { x: gt, y: yt } = r.screenToCanvas(D.clientX, D.clientY);
        for (const kt of r.selection) {
          const At = r.getNode(kt);
          if (!At) continue;
          const Nt = At.h === "auto" ? 100 : At.h;
          if (gt >= At.x && gt <= At.x + At.w && yt >= At.y && yt <= At.y + Nt)
            return;
        }
      }
      D.stopPropagation(), D.preventDefault(), D.currentTarget.setPointerCapture(D.pointerId), D.shiftKey ? r.toggleSelect(t.id) : r.selection.has(t.id) || r.select(t.id);
      const G = D.clientX, K = D.clientY, J = Array.from(r.selection), N = J.map((gt) => {
        const yt = r.getNode(gt);
        return { id: gt, x: yt.x, y: yt.y };
      });
      let _ = !1, st = null, at = G, q = K, ot = !1;
      const ht = () => {
        st = null;
        const gt = (at - G) / r.viewport.zoom, yt = (q - K) / r.viewport.zoom, { finalDx: kt, finalDy: At } = r.computeDragSnap(
          N,
          J,
          gt,
          yt,
          ot
        ), Nt = N.map((Lt) => ({
          id: Lt.id,
          patch: { x: Lt.x + kt, y: Lt.y + At }
        }));
        r.updateMany(Nt);
      }, tt = (gt) => {
        const yt = (gt.clientX - G) / r.viewport.zoom, kt = (gt.clientY - K) / r.viewport.zoom;
        if (!_)
          if (Math.abs(yt) > 2 || Math.abs(kt) > 2)
            _ = !0, p.current = !0, r.pushHistorySnapshot();
          else
            return;
        at = gt.clientX, q = gt.clientY, ot = gt.metaKey || gt.ctrlKey, st === null && (st = requestAnimationFrame(ht));
      }, ut = () => {
        p.current = !1, st !== null && (cancelAnimationFrame(st), ht()), r.clearAlignGuides(), W.removeEventListener("pointermove", tt), W.removeEventListener("pointerup", ut);
      };
      W.addEventListener("pointermove", tt), W.addEventListener("pointerup", ut);
    },
    [r, t.id]
  ), et = ct(
    (D) => {
      var tt;
      const W = D.currentTarget.ownerDocument;
      D.stopPropagation(), D.preventDefault();
      const G = t.h === "auto" ? (((tt = c.current) == null ? void 0 : tt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h, K = t.x + t.w / 2, J = t.y + G / 2, N = t.rotation || 0, { x: _, y: st } = r.screenToCanvas(
        D.clientX,
        D.clientY
      ), at = Math.atan2(st - J, _ - K);
      let q = !1;
      const ot = (ut) => {
        q || (q = !0, r.pushHistorySnapshot());
        const { x: gt, y: yt } = r.screenToCanvas(ut.clientX, ut.clientY), kt = Math.atan2(yt - J, gt - K);
        let At = N + (kt - at) * (180 / Math.PI);
        (ut.shiftKey || r.snapToGrid) && !(ut.metaKey || ut.ctrlKey) && (At = Math.round(At / 15) * 15), r.updateNode(t.id, { rotation: At });
      }, ht = () => {
        W.removeEventListener("pointermove", ot), W.removeEventListener("pointerup", ht);
      };
      W.addEventListener("pointermove", ot), W.addEventListener("pointerup", ht);
    },
    [r, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), it = ct(
    (D, W) => {
      var tt;
      const G = W.currentTarget.ownerDocument;
      W.stopPropagation(), W.preventDefault();
      const K = W.clientX, J = W.clientY, N = t.x, _ = t.y, st = t.w, at = t.h === "auto" ? (((tt = c.current) == null ? void 0 : tt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h;
      let q = !1;
      const ot = (ut) => {
        const gt = (ut.clientX - K) / r.viewport.zoom, yt = (ut.clientY - J) / r.viewport.zoom;
        q || (q = !0, r.pushHistorySnapshot());
        let kt = N, At = _, Nt = st, Lt = at;
        if ((D === "nw" || D === "w" || D === "sw") && (kt = N + gt, Nt = st - gt), (D === "ne" || D === "e" || D === "se") && (Nt = st + gt), (D === "nw" || D === "n" || D === "ne") && (At = _ + yt, Lt = at - yt), (D === "sw" || D === "s" || D === "se") && (Lt = at + yt), r.snapToGrid && !(ut.metaKey || ut.ctrlKey)) {
          const dt = r.gridSize, Ft = (Yt) => Math.round(Yt / dt) * dt;
          (D === "nw" || D === "w" || D === "sw") && (kt = Ft(kt), Nt = N + st - kt), (D === "ne" || D === "e" || D === "se") && (Nt = Ft(kt + Nt) - kt), (D === "nw" || D === "n" || D === "ne") && (At = Ft(At), Lt = _ + at - At), (D === "sw" || D === "s" || D === "se") && (Lt = Ft(At + Lt) - At);
        }
        if (Nt < 100 && (Nt = 100, (D === "nw" || D === "w" || D === "sw") && (kt = N + st - 100)), Lt < 60 && (Lt = 60, (D === "nw" || D === "n" || D === "ne") && (At = _ + at - 60)), ut.shiftKey) {
          const dt = As(
            D,
            N,
            _,
            st,
            at,
            kt,
            At,
            Nt,
            Lt
          );
          kt = dt.x, At = dt.y, Nt = dt.w, Lt = dt.h;
        }
        r.updateNode(t.id, { x: kt, y: At, w: Nt, h: Lt });
      }, ht = () => {
        G.removeEventListener("pointermove", ot), G.removeEventListener("pointerup", ht), requestAnimationFrame(() => V.current());
      };
      G.addEventListener("pointermove", ot), G.addEventListener("pointerup", ht);
    },
    [r, t.id, t.x, t.y, t.w, t.h]
  ), pt = ct(
    (D) => {
      if (!D.altKey) {
        if (g) {
          D.stopPropagation();
          return;
        }
        if (e) {
          X(D);
          return;
        }
        X(D);
      }
    },
    [g, e, X, r, t.id]
  ), wt = ct(
    (D) => {
      if (D.stopPropagation(), !g) {
        if (t.groupId) {
          const W = [];
          let G = t.groupId;
          for (; G; )
            W.push(G), G = r.groupParent.get(G);
          if (!r.activeGroupId) {
            r.enterGroup(W[W.length - 1]), r.select(t.id);
            return;
          }
          const K = W.indexOf(r.activeGroupId);
          if (K > 0) {
            r.enterGroup(W[K - 1]), r.select(t.id);
            return;
          }
        }
        r.select(t.id), I.current = { x: D.clientX, y: D.clientY }, x(!0);
      }
    },
    [g, r, t.id, t.groupId, k]
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
        /* @__PURE__ */ h(
          "div",
          {
            onDoubleClick: wt,
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
                onKeyDown: g ? (D) => {
                  D.key === "Escape" && (D.stopPropagation(), x(!1));
                } : void 0,
                style: g ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: b ? /* @__PURE__ */ h(Bi, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ h(dh, { fallback: /* @__PURE__ */ h(Bi, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ h(
                  Gc,
                  {
                    editor: k,
                    theme: "light",
                    editable: s && g
                  }
                ) })
              }
            )
          }
        ),
        xt && uh.map(({ pos: D, top: W, left: G }) => {
          const K = 8 / i;
          return /* @__PURE__ */ h(
            "div",
            {
              onPointerDown: (J) => it(D, J),
              style: {
                position: "absolute",
                top: W,
                left: G,
                width: K,
                height: K,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: In(D, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            D
          );
        }),
        xt && (() => {
          const D = 25 / i, W = 10 / i;
          return /* @__PURE__ */ S(Ct, { children: [
            /* @__PURE__ */ h(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -D,
                  left: "50%",
                  width: 1.5 / i,
                  height: D,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ h(
              "div",
              {
                onPointerDown: et,
                style: {
                  position: "absolute",
                  top: -(D + W / 2),
                  left: "50%",
                  width: W,
                  height: W,
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
const Ja = Le(ph);
function yh(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    Ja,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: js,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const mh = {
  type: "content",
  component: yh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: gh } = Math, Wr = gh + 1e-4, Ni = 0.5, Oi = [1, 1];
function Vi(t, e, o, r = (n) => n) {
  return t * r(0.5 - e * (0.5 - o));
}
const { min: $n } = Math;
function $a(t, e, o) {
  let r = $n(1, e / o);
  return $n(1, t + ($n(1, 1 - r) - t) * (r * 0.275));
}
function bh(t) {
  return [-t[0], -t[1]];
}
function Ue(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function Xi(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function wo(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function Es(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function xo(t, e) {
  return [t[0] * e, t[1] * e];
}
function _n(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function xh(t, e) {
  return [t[0] / e, t[1] / e];
}
function _a(t) {
  return [t[1], -t[0]];
}
function ts(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function Gi(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function wh(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function vh(t) {
  return Math.hypot(t[0], t[1]);
}
function Yi(t, e) {
  let o = t[0] - e[0], r = t[1] - e[1];
  return o * o + r * r;
}
function tl(t) {
  return xh(t, vh(t));
}
function kh(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function Js(t, e, o) {
  let r = Math.sin(o), n = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], l = s * n - i * r, d = s * r + i * n;
  return [l + e[0], d + e[1]];
}
function ji(t, e, o, r) {
  let n = Math.sin(r), s = Math.cos(r), i = e[0] - o[0], l = e[1] - o[1], d = i * s - l * n, c = i * n + l * s;
  return t[0] = d + o[0], t[1] = c + o[1], t;
}
function Zi(t, e, o) {
  return Ue(t, xo(wo(e, t), o));
}
function Sh(t, e, o, r) {
  let n = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + n * r, t[1] = e[1] + s * r, t;
}
function el(t, e, o) {
  return Ue(t, xo(e, o));
}
const we = [0, 0], uo = [0, 0], fo = [0, 0];
function Mh(t, e) {
  let o = el(t, tl(_a(wo(t, Ue(t, [1, 1])))), -e), r = [], n = 1 / 13;
  for (let s = n; s <= 1; s += n) r.push(Js(o, t, Wr * 2 * s));
  return r;
}
function Ch(t, e, o) {
  let r = [], n = 1 / o;
  for (let s = n; s <= 1; s += n) r.push(Js(e, t, Wr * s));
  return r;
}
function Ih(t, e, o) {
  let r = wo(e, o), n = xo(r, 0.5), s = xo(r, 0.51);
  return [wo(t, n), wo(t, s), Ue(t, s), Ue(t, n)];
}
function Th(t, e, o, r) {
  let n = [], s = el(t, e, o), i = 1 / r;
  for (let l = i; l < 1; l += i) n.push(Js(s, t, Wr * 3 * l));
  return n;
}
function zh(t, e, o) {
  return [Ue(t, xo(e, o)), Ue(t, xo(e, o * 0.99)), wo(t, xo(e, o * 0.99)), wo(t, xo(e, o))];
}
function Ki(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function Ah(t, e, o) {
  return t.slice(0, 10).reduce((r, n) => {
    let s = n.pressure;
    return e && (s = $a(r, n.distance, o)), (r + s) / 2;
  }, t[0].pressure);
}
function Eh(t, e = {}) {
  let { size: o = 16, smoothing: r = 0.5, thinning: n = 0.5, simulatePressure: s = !0, easing: i = (D) => D, start: l = {}, end: d = {}, last: c = !1 } = e, { cap: a = !0, easing: f = (D) => D * (2 - D) } = l, { cap: y = !0, easing: p = (D) => --D * D * D + 1 } = d;
  if (t.length === 0 || o <= 0) return [];
  let u = t[t.length - 1].runningLength, m = Ki(l.taper, o, u), g = Ki(d.taper, o, u), x = (o * r) ** 2, b = [], w = [], I = Ah(t, s, o), k = Vi(o, n, t[t.length - 1].pressure, i), M, C = t[0].vector, A = t[0].point, P = A, V = A, X = P, et = !1;
  for (let D = 0; D < t.length; D++) {
    let { pressure: W } = t[D], { point: G, vector: K, distance: J, runningLength: N } = t[D], _ = D === t.length - 1;
    if (!_ && u - N < 3) continue;
    n ? (s && (W = $a(I, J, o)), k = Vi(o, n, W, i)) : k = o / 2, M === void 0 && (M = k);
    let st = N < m ? f(N / m) : 1, at = u - N < g ? p((u - N) / g) : 1;
    k = Math.max(0.01, k * Math.min(st, at));
    let q = (_ ? t[D] : t[D + 1]).vector, ot = _ ? 1 : Gi(K, q), ht = Gi(K, C) < 0 && !et, tt = ot !== null && ot < 0;
    if (ht || tt) {
      ts(we, C), _n(we, we, k);
      for (let ut = 0; ut <= 1; ut += 0.07692307692307693) Es(uo, G, we), ji(uo, uo, G, Wr * ut), V = [uo[0], uo[1]], b.push(V), Xi(fo, G, we), ji(fo, fo, G, Wr * -ut), X = [fo[0], fo[1]], w.push(X);
      A = V, P = X, tt && (et = !0);
      continue;
    }
    if (et = !1, _) {
      ts(we, K), _n(we, we, k), b.push(wo(G, we)), w.push(Ue(G, we));
      continue;
    }
    Sh(we, q, K, ot), ts(we, we), _n(we, we, k), Es(uo, G, we), V = [uo[0], uo[1]], (D <= 1 || Yi(A, V) > x) && (b.push(V), A = V), Xi(fo, G, we), X = [fo[0], fo[1]], (D <= 1 || Yi(P, X) > x) && (w.push(X), P = X), I = W, C = K;
  }
  let it = [t[0].point[0], t[0].point[1]], pt = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : Ue(t[0].point, [1, 1]), wt = [], xt = [];
  if (t.length === 1) {
    if (!(m || g) || c) return Mh(it, M || k);
  } else {
    m || g && t.length === 1 || (a ? wt.push(...Ch(it, w[0], 13)) : wt.push(...Ih(it, b[0], w[0])));
    let D = _a(bh(t[t.length - 1].vector));
    g || m && t.length === 1 ? xt.push(pt) : y ? xt.push(...Th(pt, D, k, 29)) : xt.push(...zh(pt, D, k));
  }
  return b.concat(xt, w.reverse(), wt);
}
const qi = [0, 0];
function Ui(t) {
  return t != null && t >= 0;
}
function Ph(t, e = {}) {
  var y;
  let { streamline: o = 0.5, size: r = 16, last: n = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: p, y: u, pressure: m = Ni }) => [p, u, m]);
  if (i.length === 2) {
    let p = i[1];
    i = i.slice(0, -1);
    for (let u = 1; u < 5; u++) i.push(Zi(i[0], p, u / 4));
  }
  i.length === 1 && (i = [...i, [...Ue(i[0], Oi), ...i[0].slice(2)]]);
  let l = [{ point: [i[0][0], i[0][1]], pressure: Ui(i[0][2]) ? i[0][2] : 0.25, vector: [...Oi], distance: 0, runningLength: 0 }], d = !1, c = 0, a = l[0], f = i.length - 1;
  for (let p = 1; p < i.length; p++) {
    let u = n && p === f ? [i[p][0], i[p][1]] : Zi(a.point, i[p], s);
    if (wh(a.point, u)) continue;
    let m = kh(u, a.point);
    if (c += m, p < f && !d) {
      if (c < r) continue;
      d = !0;
    }
    Es(qi, a.point, u), a = { point: u, pressure: Ui(i[p][2]) ? i[p][2] : Ni, vector: tl(qi), distance: m, runningLength: c }, l.push(a);
  }
  return l[0].vector = ((y = l[1]) == null ? void 0 : y.vector) || [0, 0], l;
}
function Hh(t, e = {}) {
  return Eh(Ph(t, e), e);
}
var Lh = Hh;
function $s(t, e = {}) {
  if (!Array.isArray(t) || t.length === 0) return "";
  const o = Lh(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return Rh(o);
}
function Rh(t) {
  if (!t.length) return "";
  const e = [], [o, r] = t[0];
  e.push("M", o, r);
  for (let n = 0; n < t.length; n++) {
    const [s, i] = t[n], [l, d] = t[(n + 1) % t.length];
    e.push("Q", s, i, (s + l) / 2, (i + d) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function ol(t, e = 0.5) {
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
function Dh(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = ol(t, e), r = o.length, n = [];
  n.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < r; s++) {
    const [i, l] = o[s], [d, c] = o[(s + 1) % r];
    n.push("Q", i, l, (i + d) / 2, (l + c) / 2);
  }
  return n.push("Z"), n.join(" ");
}
function Wh(t, e, o, r) {
  const n = e[0] - t[0], s = e[1] - t[1], i = r[0] - o[0], l = r[1] - o[1], d = n * l - s * i;
  if (Math.abs(d) < 1e-10) return null;
  const c = ((o[0] - t[0]) * l - (o[1] - t[1]) * i) / d, a = ((o[0] - t[0]) * s - (o[1] - t[1]) * n) / d;
  return c <= 0 || c >= 1 || a <= 0 || a >= 1 ? null : [t[0] + c * n, t[1] + c * s];
}
function Fh(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function Qi(t) {
  let e = 0;
  for (let o = 0, r = t.length - 1; o < t.length; r = o++)
    e += (t[r][0] + t[o][0]) * (t[r][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function Bh(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let l = i + 2; l < e - 1; l++) {
      const d = Wh(
        t[i],
        t[i + 1],
        t[l],
        t[l + 1]
      );
      if (!d) continue;
      const c = [d];
      for (let a = i + 1; a <= l; a++)
        c.push(t[a]);
      Qi(c) < 100 || o.push({
        pathD: Fh(c),
        points: c.map((a) => [a[0], a[1]])
      });
    }
  if (o.length === 0) return [];
  const r = o.map((i) => Qi(i.points)), s = Math.max(...r) * 0.05;
  return o.filter((i, l) => r[l] >= s);
}
function es(t, e, o) {
  if (t && t.length) {
    const [r, n] = e, s = Math.PI / 180 * o, i = Math.cos(s), l = Math.sin(s);
    for (const d of t) {
      const [c, a] = d;
      d[0] = (c - r) * i - (a - n) * l + r, d[1] = (c - r) * l + (a - n) * i + n;
    }
  }
}
function Nh(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Oh(t, e, o, r = 1) {
  const n = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, l = [0, 0];
  if (n) for (const c of i) es(c, l, n);
  const d = function(c, a, f) {
    const y = [];
    for (const b of c) {
      const w = [...b];
      Nh(w[0], w[w.length - 1]) || w.push([w[0][0], w[0][1]]), w.length > 2 && y.push(w);
    }
    const p = [];
    a = Math.max(a, 0.1);
    const u = [];
    for (const b of y) for (let w = 0; w < b.length - 1; w++) {
      const I = b[w], k = b[w + 1];
      if (I[1] !== k[1]) {
        const M = Math.min(I[1], k[1]);
        u.push({ ymin: M, ymax: Math.max(I[1], k[1]), x: M === I[1] ? I[0] : k[0], islope: (k[0] - I[0]) / (k[1] - I[1]) });
      }
    }
    if (u.sort((b, w) => b.ymin < w.ymin ? -1 : b.ymin > w.ymin ? 1 : b.x < w.x ? -1 : b.x > w.x ? 1 : b.ymax === w.ymax ? 0 : (b.ymax - w.ymax) / Math.abs(b.ymax - w.ymax)), !u.length) return p;
    let m = [], g = u[0].ymin, x = 0;
    for (; m.length || u.length; ) {
      if (u.length) {
        let b = -1;
        for (let w = 0; w < u.length && !(u[w].ymin > g); w++) b = w;
        u.splice(0, b + 1).forEach((w) => {
          m.push({ s: g, edge: w });
        });
      }
      if (m = m.filter((b) => !(b.edge.ymax <= g)), m.sort((b, w) => b.edge.x === w.edge.x ? 0 : (b.edge.x - w.edge.x) / Math.abs(b.edge.x - w.edge.x)), (f !== 1 || x % a == 0) && m.length > 1) for (let b = 0; b < m.length; b += 2) {
        const w = b + 1;
        if (w >= m.length) break;
        const I = m[b].edge, k = m[w].edge;
        p.push([[Math.round(I.x), g], [Math.round(k.x), g]]);
      }
      g += f, m.forEach((b) => {
        b.edge.x = b.edge.x + f * b.edge.islope;
      }), x++;
    }
    return p;
  }(i, s, r);
  if (n) {
    for (const c of i) es(c, l, -n);
    (function(c, a, f) {
      const y = [];
      c.forEach((p) => y.push(...p)), es(y, a, f);
    })(d, l, -n);
  }
  return d;
}
function Nr(t, e) {
  var o;
  const r = e.hachureAngle + 90;
  let n = e.hachureGap;
  n < 0 && (n = 4 * e.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = n), Oh(t, n, r, s || 1);
}
let _s = class {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const r = Nr(e, o);
    return { type: "fillSketch", ops: this.renderLines(r, o) };
  }
  renderLines(e, o) {
    const r = [];
    for (const n of e) r.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], o));
    return r;
  }
};
function Tn(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class Vh extends _s {
  fillPolygons(e, o) {
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    const n = Nr(e, Object.assign({}, o, { hachureGap: r })), s = Math.PI / 180 * o.hachureAngle, i = [], l = 0.5 * r * Math.cos(s), d = 0.5 * r * Math.sin(s);
    for (const [c, a] of n) Tn([c, a]) && i.push([[c[0] - l, c[1] + d], [...a]], [[c[0] + l, c[1] - d], [...a]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
let Xh = class extends _s {
  fillPolygons(e, o) {
    const r = this._fillPolygons(e, o), n = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, n);
    return r.ops = r.ops.concat(s.ops), r;
  }
};
class Gh {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = Nr(e, o = Object.assign({}, o, { hachureAngle: 0 }));
    return this.dotsOnLines(r, o);
  }
  dotsOnLines(e, o) {
    const r = [];
    let n = o.hachureGap;
    n < 0 && (n = 4 * o.strokeWidth), n = Math.max(n, 0.1);
    let s = o.fillWeight;
    s < 0 && (s = o.strokeWidth / 2);
    const i = n / 4;
    for (const l of e) {
      const d = Tn(l), c = d / n, a = Math.ceil(c) - 1, f = d - a * n, y = (l[0][0] + l[1][0]) / 2 - n / 4, p = Math.min(l[0][1], l[1][1]);
      for (let u = 0; u < a; u++) {
        const m = p + f + u * n, g = y - i + 2 * Math.random() * i, x = m - i + 2 * Math.random() * i, b = this.helper.ellipse(g, x, s, s, o);
        r.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: r };
  }
}
let Yh = class {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = Nr(e, o);
    return { type: "fillSketch", ops: this.dashedLine(r, o) };
  }
  dashedLine(e, o) {
    const r = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, n = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const l = Tn(i), d = Math.floor(l / (r + n)), c = (l + n - d * (r + n)) / 2;
      let a = i[0], f = i[1];
      a[0] > f[0] && (a = i[1], f = i[0]);
      const y = Math.atan((f[1] - a[1]) / (f[0] - a[0]));
      for (let p = 0; p < d; p++) {
        const u = p * (r + n), m = u + r, g = [a[0] + u * Math.cos(y) + c * Math.cos(y), a[1] + u * Math.sin(y) + c * Math.sin(y)], x = [a[0] + m * Math.cos(y) + c * Math.cos(y), a[1] + m * Math.sin(y) + c * Math.sin(y)];
        s.push(...this.helper.doubleLineOps(g[0], g[1], x[0], x[1], o));
      }
    }), s;
  }
}, jh = class {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, n = o.zigzagOffset < 0 ? r : o.zigzagOffset, s = Nr(e, o = Object.assign({}, o, { hachureGap: r + n }));
    return { type: "fillSketch", ops: this.zigzagLines(s, n, o) };
  }
  zigzagLines(e, o, r) {
    const n = [];
    return e.forEach((s) => {
      const i = Tn(s), l = Math.round(i / (2 * o));
      let d = s[0], c = s[1];
      d[0] > c[0] && (d = s[1], c = s[0]);
      const a = Math.atan((c[1] - d[1]) / (c[0] - d[0]));
      for (let f = 0; f < l; f++) {
        const y = 2 * f * o, p = 2 * (f + 1) * o, u = Math.sqrt(2 * Math.pow(o, 2)), m = [d[0] + y * Math.cos(a), d[1] + y * Math.sin(a)], g = [d[0] + p * Math.cos(a), d[1] + p * Math.sin(a)], x = [m[0] + u * Math.cos(a + Math.PI / 4), m[1] + u * Math.sin(a + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(m[0], m[1], x[0], x[1], r), ...this.helper.doubleLineOps(x[0], x[1], g[0], g[1], r));
      }
    }), n;
  }
};
const ze = {};
let Zh = class {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
};
const Kh = 0, os = 1, Ji = 2, on = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function rs(t, e) {
  return t.type === e;
}
function ti(t) {
  const e = [], o = function(i) {
    const l = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) l[l.length] = { type: Kh, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      l[l.length] = { type: os, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return l[l.length] = { type: Ji, text: "" }, l;
  }(t);
  let r = "BOD", n = 0, s = o[n];
  for (; !rs(s, Ji); ) {
    let i = 0;
    const l = [];
    if (r === "BOD") {
      if (s.text !== "M" && s.text !== "m") return ti("M0,0" + t);
      n++, i = on[s.text], r = s.text;
    } else rs(s, os) ? i = on[r] : (n++, i = on[s.text], r = s.text);
    if (!(n + i < o.length)) throw new Error("Path data ended short");
    for (let d = n; d < n + i; d++) {
      const c = o[d];
      if (!rs(c, os)) throw new Error("Param not a number: " + r + "," + c.text);
      l[l.length] = +c.text;
    }
    if (typeof on[r] != "number") throw new Error("Bad segment: " + r);
    {
      const d = { key: r, data: l };
      e.push(d), n += i, s = o[n], r === "M" && (r = "L"), r === "m" && (r = "l");
    }
  }
  return e;
}
function rl(t) {
  let e = 0, o = 0, r = 0, n = 0;
  const s = [];
  for (const { key: i, data: l } of t) switch (i) {
    case "M":
      s.push({ key: "M", data: [...l] }), [e, o] = l, [r, n] = l;
      break;
    case "m":
      e += l[0], o += l[1], s.push({ key: "M", data: [e, o] }), r = e, n = o;
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
      s.push({ key: "Z", data: [] }), e = r, o = n;
  }
  return s;
}
function nl(t) {
  const e = [];
  let o = "", r = 0, n = 0, s = 0, i = 0, l = 0, d = 0;
  for (const { key: c, data: a } of t) {
    switch (c) {
      case "M":
        e.push({ key: "M", data: [...a] }), [r, n] = a, [s, i] = a;
        break;
      case "C":
        e.push({ key: "C", data: [...a] }), r = a[4], n = a[5], l = a[2], d = a[3];
        break;
      case "L":
        e.push({ key: "L", data: [...a] }), [r, n] = a;
        break;
      case "H":
        r = a[0], e.push({ key: "L", data: [r, n] });
        break;
      case "V":
        n = a[0], e.push({ key: "L", data: [r, n] });
        break;
      case "S": {
        let f = 0, y = 0;
        o === "C" || o === "S" ? (f = r + (r - l), y = n + (n - d)) : (f = r, y = n), e.push({ key: "C", data: [f, y, ...a] }), l = a[0], d = a[1], r = a[2], n = a[3];
        break;
      }
      case "T": {
        const [f, y] = a;
        let p = 0, u = 0;
        o === "Q" || o === "T" ? (p = r + (r - l), u = n + (n - d)) : (p = r, u = n);
        const m = r + 2 * (p - r) / 3, g = n + 2 * (u - n) / 3, x = f + 2 * (p - f) / 3, b = y + 2 * (u - y) / 3;
        e.push({ key: "C", data: [m, g, x, b, f, y] }), l = p, d = u, r = f, n = y;
        break;
      }
      case "Q": {
        const [f, y, p, u] = a, m = r + 2 * (f - r) / 3, g = n + 2 * (y - n) / 3, x = p + 2 * (f - p) / 3, b = u + 2 * (y - u) / 3;
        e.push({ key: "C", data: [m, g, x, b, p, u] }), l = f, d = y, r = p, n = u;
        break;
      }
      case "A": {
        const f = Math.abs(a[0]), y = Math.abs(a[1]), p = a[2], u = a[3], m = a[4], g = a[5], x = a[6];
        f === 0 || y === 0 ? (e.push({ key: "C", data: [r, n, g, x, g, x] }), r = g, n = x) : (r !== g || n !== x) && (sl(r, n, g, x, f, y, p, u, m).forEach(function(b) {
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
function Tr(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function sl(t, e, o, r, n, s, i, l, d, c) {
  const a = (f = i, Math.PI * f / 180);
  var f;
  let y = [], p = 0, u = 0, m = 0, g = 0;
  if (c) [p, u, m, g] = c;
  else {
    [t, e] = Tr(t, e, -a), [o, r] = Tr(o, r, -a);
    const it = (t - o) / 2, pt = (e - r) / 2;
    let wt = it * it / (n * n) + pt * pt / (s * s);
    wt > 1 && (wt = Math.sqrt(wt), n *= wt, s *= wt);
    const xt = n * n, D = s * s, W = xt * D - xt * pt * pt - D * it * it, G = xt * pt * pt + D * it * it, K = (l === d ? -1 : 1) * Math.sqrt(Math.abs(W / G));
    m = K * n * pt / s + (t + o) / 2, g = K * -s * it / n + (e + r) / 2, p = Math.asin(parseFloat(((e - g) / s).toFixed(9))), u = Math.asin(parseFloat(((r - g) / s).toFixed(9))), t < m && (p = Math.PI - p), o < m && (u = Math.PI - u), p < 0 && (p = 2 * Math.PI + p), u < 0 && (u = 2 * Math.PI + u), d && p > u && (p -= 2 * Math.PI), !d && u > p && (u -= 2 * Math.PI);
  }
  let x = u - p;
  if (Math.abs(x) > 120 * Math.PI / 180) {
    const it = u, pt = o, wt = r;
    u = d && u > p ? p + 120 * Math.PI / 180 * 1 : p + 120 * Math.PI / 180 * -1, y = sl(o = m + n * Math.cos(u), r = g + s * Math.sin(u), pt, wt, n, s, i, 0, d, [u, it, m, g]);
  }
  x = u - p;
  const b = Math.cos(p), w = Math.sin(p), I = Math.cos(u), k = Math.sin(u), M = Math.tan(x / 4), C = 4 / 3 * n * M, A = 4 / 3 * s * M, P = [t, e], V = [t + C * w, e - A * b], X = [o + C * k, r - A * I], et = [o, r];
  if (V[0] = 2 * P[0] - V[0], V[1] = 2 * P[1] - V[1], c) return [V, X, et].concat(y);
  {
    y = [V, X, et].concat(y);
    const it = [];
    for (let pt = 0; pt < y.length; pt += 3) {
      const wt = Tr(y[pt][0], y[pt][1], a), xt = Tr(y[pt + 1][0], y[pt + 1][1], a), D = Tr(y[pt + 2][0], y[pt + 2][1], a);
      it.push([wt[0], wt[1], xt[0], xt[1], D[0], D[1]]);
    }
    return it;
  }
}
const qh = { randOffset: function(t, e) {
  return jt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return bn(t, e, o);
}, ellipse: function(t, e, o, r, n) {
  const s = al(o, r, n);
  return Ps(t, e, n, s).opset;
}, doubleLineOps: function(t, e, o, r, n) {
  return Co(t, e, o, r, n, !0);
} };
function il(t, e, o, r, n) {
  return { type: "path", ops: Co(t, e, o, r, n) };
}
function pn(t, e, o) {
  const r = (t || []).length;
  if (r > 2) {
    const n = [];
    for (let s = 0; s < r - 1; s++) n.push(...Co(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && n.push(...Co(t[r - 1][0], t[r - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: n };
  }
  return r === 2 ? il(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function Uh(t, e, o, r, n) {
  return function(s, i) {
    return pn(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + r], [t, e + r]], n);
}
function $i(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, r = rn(o[0], 1 * (1 + 0.2 * e.roughness), e), n = e.disableMultiStroke ? [] : rn(o[0], 1.5 * (1 + 0.22 * e.roughness), ea(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const l = rn(i, 1 * (1 + 0.2 * e.roughness), e), d = e.disableMultiStroke ? [] : rn(i, 1.5 * (1 + 0.22 * e.roughness), ea(e));
        for (const c of l) c.op !== "move" && r.push(c);
        for (const c of d) c.op !== "move" && n.push(c);
      }
    }
    return { type: "path", ops: r.concat(n) };
  }
  return { type: "path", ops: [] };
}
function al(t, e, o) {
  const r = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), n = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * r)), s = 2 * Math.PI / n;
  let i = Math.abs(t / 2), l = Math.abs(e / 2);
  const d = 1 - o.curveFitting;
  return i += jt(i * d, o), l += jt(l * d, o), { increment: s, rx: i, ry: l };
}
function Ps(t, e, o, r) {
  const [n, s] = oa(r.increment, t, e, r.rx, r.ry, 1, r.increment * bn(0.1, bn(0.4, 1, o), o), o);
  let i = xn(n, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [l] = oa(r.increment, t, e, r.rx, r.ry, 1.5, 0, o), d = xn(l, null, o);
    i = i.concat(d);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function _i(t, e, o, r, n, s, i, l, d) {
  const c = t, a = e;
  let f = Math.abs(o / 2), y = Math.abs(r / 2);
  f += jt(0.01 * f, d), y += jt(0.01 * y, d);
  let p = n, u = s;
  for (; p < 0; ) p += 2 * Math.PI, u += 2 * Math.PI;
  u - p > 2 * Math.PI && (p = 0, u = 2 * Math.PI);
  const m = 2 * Math.PI / d.curveStepCount, g = Math.min(m / 2, (u - p) / 2), x = ra(g, c, a, f, y, p, u, 1, d);
  if (!d.disableMultiStroke) {
    const b = ra(g, c, a, f, y, p, u, 1.5, d);
    x.push(...b);
  }
  return i && (l ? x.push(...Co(c, a, c + f * Math.cos(p), a + y * Math.sin(p), d), ...Co(c, a, c + f * Math.cos(u), a + y * Math.sin(u), d)) : x.push({ op: "lineTo", data: [c, a] }, { op: "lineTo", data: [c + f * Math.cos(p), a + y * Math.sin(p)] })), { type: "path", ops: x };
}
function ta(t, e) {
  const o = nl(rl(ti(t))), r = [];
  let n = [0, 0], s = [0, 0];
  for (const { key: i, data: l } of o) switch (i) {
    case "M":
      s = [l[0], l[1]], n = [l[0], l[1]];
      break;
    case "L":
      r.push(...Co(s[0], s[1], l[0], l[1], e)), s = [l[0], l[1]];
      break;
    case "C": {
      const [d, c, a, f, y, p] = l;
      r.push(...Qh(d, c, a, f, y, p, s, e)), s = [y, p];
      break;
    }
    case "Z":
      r.push(...Co(s[0], s[1], n[0], n[1], e)), s = [n[0], n[1]];
  }
  return { type: "path", ops: r };
}
function ns(t, e) {
  const o = [];
  for (const r of t) if (r.length) {
    const n = e.maxRandomnessOffset || 0, s = r.length;
    if (s > 2) {
      o.push({ op: "move", data: [r[0][0] + jt(n, e), r[0][1] + jt(n, e)] });
      for (let i = 1; i < s; i++) o.push({ op: "lineTo", data: [r[i][0] + jt(n, e), r[i][1] + jt(n, e)] });
    }
  }
  return { type: "fillPath", ops: o };
}
function or(t, e) {
  return function(o, r) {
    let n = o.fillStyle || "hachure";
    if (!ze[n]) switch (n) {
      case "zigzag":
        ze[n] || (ze[n] = new Vh(r));
        break;
      case "cross-hatch":
        ze[n] || (ze[n] = new Xh(r));
        break;
      case "dots":
        ze[n] || (ze[n] = new Gh(r));
        break;
      case "dashed":
        ze[n] || (ze[n] = new Yh(r));
        break;
      case "zigzag-line":
        ze[n] || (ze[n] = new jh(r));
        break;
      default:
        n = "hachure", ze[n] || (ze[n] = new _s(r));
    }
    return ze[n];
  }(e, qh).fillPolygons(t, e);
}
function ea(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function ll(t) {
  return t.randomizer || (t.randomizer = new Zh(t.seed || 0)), t.randomizer.next();
}
function bn(t, e, o, r = 1) {
  return o.roughness * r * (ll(o) * (e - t) + t);
}
function jt(t, e, o = 1) {
  return bn(-t, t, e, o);
}
function Co(t, e, o, r, n, s = !1) {
  const i = s ? n.disableMultiStrokeFill : n.disableMultiStroke, l = Hs(t, e, o, r, n, !0, !1);
  if (i) return l;
  const d = Hs(t, e, o, r, n, !0, !0);
  return l.concat(d);
}
function Hs(t, e, o, r, n, s, i) {
  const l = Math.pow(t - o, 2) + Math.pow(e - r, 2), d = Math.sqrt(l);
  let c = 1;
  c = d < 200 ? 1 : d > 500 ? 0.4 : -16668e-7 * d + 1.233334;
  let a = n.maxRandomnessOffset || 0;
  a * a * 100 > l && (a = d / 10);
  const f = a / 2, y = 0.2 + 0.2 * ll(n);
  let p = n.bowing * n.maxRandomnessOffset * (r - e) / 200, u = n.bowing * n.maxRandomnessOffset * (t - o) / 200;
  p = jt(p, n, c), u = jt(u, n, c);
  const m = [], g = () => jt(f, n, c), x = () => jt(a, n, c), b = n.preserveVertices;
  return i ? m.push({ op: "move", data: [t + (b ? 0 : g()), e + (b ? 0 : g())] }) : m.push({ op: "move", data: [t + (b ? 0 : jt(a, n, c)), e + (b ? 0 : jt(a, n, c))] }), i ? m.push({ op: "bcurveTo", data: [p + t + (o - t) * y + g(), u + e + (r - e) * y + g(), p + t + 2 * (o - t) * y + g(), u + e + 2 * (r - e) * y + g(), o + (b ? 0 : g()), r + (b ? 0 : g())] }) : m.push({ op: "bcurveTo", data: [p + t + (o - t) * y + x(), u + e + (r - e) * y + x(), p + t + 2 * (o - t) * y + x(), u + e + 2 * (r - e) * y + x(), o + (b ? 0 : x()), r + (b ? 0 : x())] }), m;
}
function rn(t, e, o) {
  if (!t.length) return [];
  const r = [];
  r.push([t[0][0] + jt(e, o), t[0][1] + jt(e, o)]), r.push([t[0][0] + jt(e, o), t[0][1] + jt(e, o)]);
  for (let n = 1; n < t.length; n++) r.push([t[n][0] + jt(e, o), t[n][1] + jt(e, o)]), n === t.length - 1 && r.push([t[n][0] + jt(e, o), t[n][1] + jt(e, o)]);
  return xn(r, null, o);
}
function xn(t, e, o) {
  const r = t.length, n = [];
  if (r > 3) {
    const s = [], i = 1 - o.curveTightness;
    n.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let l = 1; l + 2 < r; l++) {
      const d = t[l];
      s[0] = [d[0], d[1]], s[1] = [d[0] + (i * t[l + 1][0] - i * t[l - 1][0]) / 6, d[1] + (i * t[l + 1][1] - i * t[l - 1][1]) / 6], s[2] = [t[l + 1][0] + (i * t[l][0] - i * t[l + 2][0]) / 6, t[l + 1][1] + (i * t[l][1] - i * t[l + 2][1]) / 6], s[3] = [t[l + 1][0], t[l + 1][1]], n.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else r === 3 ? (n.push({ op: "move", data: [t[1][0], t[1][1]] }), n.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : r === 2 && n.push(...Hs(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return n;
}
function oa(t, e, o, r, n, s, i, l) {
  const d = [], c = [];
  if (l.roughness === 0) {
    t /= 4, c.push([e + r * Math.cos(-t), o + n * Math.sin(-t)]);
    for (let a = 0; a <= 2 * Math.PI; a += t) {
      const f = [e + r * Math.cos(a), o + n * Math.sin(a)];
      d.push(f), c.push(f);
    }
    c.push([e + r * Math.cos(0), o + n * Math.sin(0)]), c.push([e + r * Math.cos(t), o + n * Math.sin(t)]);
  } else {
    const a = jt(0.5, l) - Math.PI / 2;
    c.push([jt(s, l) + e + 0.9 * r * Math.cos(a - t), jt(s, l) + o + 0.9 * n * Math.sin(a - t)]);
    const f = 2 * Math.PI + a - 0.01;
    for (let y = a; y < f; y += t) {
      const p = [jt(s, l) + e + r * Math.cos(y), jt(s, l) + o + n * Math.sin(y)];
      d.push(p), c.push(p);
    }
    c.push([jt(s, l) + e + r * Math.cos(a + 2 * Math.PI + 0.5 * i), jt(s, l) + o + n * Math.sin(a + 2 * Math.PI + 0.5 * i)]), c.push([jt(s, l) + e + 0.98 * r * Math.cos(a + i), jt(s, l) + o + 0.98 * n * Math.sin(a + i)]), c.push([jt(s, l) + e + 0.9 * r * Math.cos(a + 0.5 * i), jt(s, l) + o + 0.9 * n * Math.sin(a + 0.5 * i)]);
  }
  return [c, d];
}
function ra(t, e, o, r, n, s, i, l, d) {
  const c = s + jt(0.1, d), a = [];
  a.push([jt(l, d) + e + 0.9 * r * Math.cos(c - t), jt(l, d) + o + 0.9 * n * Math.sin(c - t)]);
  for (let f = c; f <= i; f += t) a.push([jt(l, d) + e + r * Math.cos(f), jt(l, d) + o + n * Math.sin(f)]);
  return a.push([e + r * Math.cos(i), o + n * Math.sin(i)]), a.push([e + r * Math.cos(i), o + n * Math.sin(i)]), xn(a, null, d);
}
function Qh(t, e, o, r, n, s, i, l) {
  const d = [], c = [l.maxRandomnessOffset || 1, (l.maxRandomnessOffset || 1) + 0.3];
  let a = [0, 0];
  const f = l.disableMultiStroke ? 1 : 2, y = l.preserveVertices;
  for (let p = 0; p < f; p++) p === 0 ? d.push({ op: "move", data: [i[0], i[1]] }) : d.push({ op: "move", data: [i[0] + (y ? 0 : jt(c[0], l)), i[1] + (y ? 0 : jt(c[0], l))] }), a = y ? [n, s] : [n + jt(c[p], l), s + jt(c[p], l)], d.push({ op: "bcurveTo", data: [t + jt(c[p], l), e + jt(c[p], l), o + jt(c[p], l), r + jt(c[p], l), a[0], a[1]] });
  return d;
}
function zr(t) {
  return [...t];
}
function na(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const r = [];
  if (o === 3) r.push(zr(t[0]), zr(t[1]), zr(t[2]), zr(t[2]));
  else {
    const n = [];
    n.push(t[0], t[0]);
    for (let l = 1; l < t.length; l++) n.push(t[l]), l === t.length - 1 && n.push(t[l]);
    const s = [], i = 1 - e;
    r.push(zr(n[0]));
    for (let l = 1; l + 2 < n.length; l++) {
      const d = n[l];
      s[0] = [d[0], d[1]], s[1] = [d[0] + (i * n[l + 1][0] - i * n[l - 1][0]) / 6, d[1] + (i * n[l + 1][1] - i * n[l - 1][1]) / 6], s[2] = [n[l + 1][0] + (i * n[l][0] - i * n[l + 2][0]) / 6, n[l + 1][1] + (i * n[l][1] - i * n[l + 2][1]) / 6], s[3] = [n[l + 1][0], n[l + 1][1]], r.push(s[1], s[2], s[3]);
    }
  }
  return r;
}
function yn(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function Jh(t, e, o) {
  const r = yn(e, o);
  if (r === 0) return yn(t, e);
  let n = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / r;
  return n = Math.max(0, Math.min(1, n)), yn(t, No(e, o, n));
}
function No(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function Ls(t, e, o, r) {
  const n = r || [];
  if (function(l, d) {
    const c = l[d + 0], a = l[d + 1], f = l[d + 2], y = l[d + 3];
    let p = 3 * a[0] - 2 * c[0] - y[0];
    p *= p;
    let u = 3 * a[1] - 2 * c[1] - y[1];
    u *= u;
    let m = 3 * f[0] - 2 * y[0] - c[0];
    m *= m;
    let g = 3 * f[1] - 2 * y[1] - c[1];
    return g *= g, p < m && (p = m), u < g && (u = g), p + u;
  }(t, e) < o) {
    const l = t[e + 0];
    n.length ? (s = n[n.length - 1], i = l, Math.sqrt(yn(s, i)) > 1 && n.push(l)) : n.push(l), n.push(t[e + 3]);
  } else {
    const d = t[e + 0], c = t[e + 1], a = t[e + 2], f = t[e + 3], y = No(d, c, 0.5), p = No(c, a, 0.5), u = No(a, f, 0.5), m = No(y, p, 0.5), g = No(p, u, 0.5), x = No(m, g, 0.5);
    Ls([d, y, m, x], 0, o, n), Ls([x, g, u, f], 0, o, n);
  }
  var s, i;
  return n;
}
function $h(t, e) {
  return wn(t, 0, t.length, e);
}
function wn(t, e, o, r, n) {
  const s = n || [], i = t[e], l = t[o - 1];
  let d = 0, c = 1;
  for (let a = e + 1; a < o - 1; ++a) {
    const f = Jh(t[a], i, l);
    f > d && (d = f, c = a);
  }
  return Math.sqrt(d) > r ? (wn(t, e, c + 1, r, s), wn(t, c, o, r, s)) : (s.length || s.push(i), s.push(l)), s;
}
function ss(t, e = 0.15, o) {
  const r = [], n = (t.length - 1) / 3;
  for (let s = 0; s < n; s++)
    Ls(t, 3 * s, e, r);
  return o && o > 0 ? wn(r, 0, r.length, o) : r;
}
const Re = "none";
class vn {
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
    return this._d("line", [il(e, o, r, n, i)], i);
  }
  rectangle(e, o, r, n, s) {
    const i = this._o(s), l = [], d = Uh(e, o, r, n, i);
    if (i.fill) {
      const c = [[e, o], [e + r, o], [e + r, o + n], [e, o + n]];
      i.fillStyle === "solid" ? l.push(ns([c], i)) : l.push(or([c], i));
    }
    return i.stroke !== Re && l.push(d), this._d("rectangle", l, i);
  }
  ellipse(e, o, r, n, s) {
    const i = this._o(s), l = [], d = al(r, n, i), c = Ps(e, o, i, d);
    if (i.fill) if (i.fillStyle === "solid") {
      const a = Ps(e, o, i, d).opset;
      a.type = "fillPath", l.push(a);
    } else l.push(or([c.estimatedPoints], i));
    return i.stroke !== Re && l.push(c.opset), this._d("ellipse", l, i);
  }
  circle(e, o, r, n) {
    const s = this.ellipse(e, o, r, r, n);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const r = this._o(o);
    return this._d("linearPath", [pn(e, !1, r)], r);
  }
  arc(e, o, r, n, s, i, l = !1, d) {
    const c = this._o(d), a = [], f = _i(e, o, r, n, s, i, l, !0, c);
    if (l && c.fill) if (c.fillStyle === "solid") {
      const y = Object.assign({}, c);
      y.disableMultiStroke = !0;
      const p = _i(e, o, r, n, s, i, !0, !1, y);
      p.type = "fillPath", a.push(p);
    } else a.push(function(y, p, u, m, g, x, b) {
      const w = y, I = p;
      let k = Math.abs(u / 2), M = Math.abs(m / 2);
      k += jt(0.01 * k, b), M += jt(0.01 * M, b);
      let C = g, A = x;
      for (; C < 0; ) C += 2 * Math.PI, A += 2 * Math.PI;
      A - C > 2 * Math.PI && (C = 0, A = 2 * Math.PI);
      const P = (A - C) / b.curveStepCount, V = [];
      for (let X = C; X <= A; X += P) V.push([w + k * Math.cos(X), I + M * Math.sin(X)]);
      return V.push([w + k * Math.cos(A), I + M * Math.sin(A)]), V.push([w, I]), or([V], b);
    }(e, o, r, n, s, i, c));
    return c.stroke !== Re && a.push(f), this._d("arc", a, c);
  }
  curve(e, o) {
    const r = this._o(o), n = [], s = $i(e, r);
    if (r.fill && r.fill !== Re) if (r.fillStyle === "solid") {
      const i = $i(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], l = e;
      if (l.length) {
        const d = typeof l[0][0] == "number" ? [l] : l;
        for (const c of d) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...ss(na([c[0], c[0], c[1], c[2]]), 10, (1 + r.roughness) / 2)) : i.push(...ss(na(c), 10, (1 + r.roughness) / 2));
      }
      i.length && n.push(or([i], r));
    }
    return r.stroke !== Re && n.push(s), this._d("curve", n, r);
  }
  polygon(e, o) {
    const r = this._o(o), n = [], s = pn(e, !0, r);
    return r.fill && (r.fillStyle === "solid" ? n.push(ns([e], r)) : n.push(or([e], r))), r.stroke !== Re && n.push(s), this._d("polygon", n, r);
  }
  path(e, o) {
    const r = this._o(o), n = [];
    if (!e) return this._d("path", n, r);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = r.fill && r.fill !== "transparent" && r.fill !== Re, i = r.stroke !== Re, l = !!(r.simplification && r.simplification < 1), d = function(a, f, y) {
      const p = nl(rl(ti(a))), u = [];
      let m = [], g = [0, 0], x = [];
      const b = () => {
        x.length >= 4 && m.push(...ss(x, f)), x = [];
      }, w = () => {
        b(), m.length && (u.push(m), m = []);
      };
      for (const { key: k, data: M } of p) switch (k) {
        case "M":
          w(), g = [M[0], M[1]], m.push(g);
          break;
        case "L":
          b(), m.push([M[0], M[1]]);
          break;
        case "C":
          if (!x.length) {
            const C = m.length ? m[m.length - 1] : g;
            x.push([C[0], C[1]]);
          }
          x.push([M[0], M[1]]), x.push([M[2], M[3]]), x.push([M[4], M[5]]);
          break;
        case "Z":
          b(), m.push([g[0], g[1]]);
      }
      if (w(), !y) return u;
      const I = [];
      for (const k of u) {
        const M = $h(k, y);
        M.length && I.push(M);
      }
      return I;
    }(e, 1, l ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2), c = ta(e, r);
    if (s) if (r.fillStyle === "solid") if (d.length === 1) {
      const a = ta(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(a.ops) });
    } else n.push(ns(d, r));
    else n.push(or(d, r));
    return i && (l ? d.forEach((a) => {
      n.push(pn(a, !1, r));
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
          i = { d: this.opsToPath(s), stroke: r.stroke, strokeWidth: r.strokeWidth, fill: Re };
          break;
        case "fillPath":
          i = { d: this.opsToPath(s), stroke: Re, strokeWidth: 0, fill: r.fill || Re };
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
    return r < 0 && (r = o.strokeWidth / 2), { d: this.opsToPath(e), stroke: o.fill || Re, strokeWidth: r, fill: Re };
  }
  _mergedShape(e) {
    return e.filter((o, r) => r === 0 || o.op !== "move");
  }
}
class _h {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new vn(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.ctx, s = e.options.fixedDecimalPlaceDigits;
    for (const i of o) switch (i.type) {
      case "path":
        n.save(), n.strokeStyle = r.stroke === "none" ? "transparent" : r.stroke, n.lineWidth = r.strokeWidth, r.strokeLineDash && n.setLineDash(r.strokeLineDash), r.strokeLineDashOffset && (n.lineDashOffset = r.strokeLineDashOffset), this._drawToContext(n, i, s), n.restore();
        break;
      case "fillPath": {
        n.save(), n.fillStyle = r.fill || "";
        const l = e.shape === "curve" || e.shape === "polygon" || e.shape === "path" ? "evenodd" : "nonzero";
        this._drawToContext(n, i, s, l), n.restore();
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
      const i = typeof r == "number" && r >= 0 ? s.data.map((l) => +l.toFixed(r)) : s.data;
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
  arc(e, o, r, n, s, i, l = !1, d) {
    const c = this.gen.arc(e, o, r, n, s, i, l, d);
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
const nn = "http://www.w3.org/2000/svg";
class tu {
  constructor(e, o) {
    this.svg = e, this.gen = new vn(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, s = n.createElementNS(nn, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const l of o) {
      let d = null;
      switch (l.type) {
        case "path":
          d = n.createElementNS(nn, "path"), d.setAttribute("d", this.opsToPath(l, i)), d.setAttribute("stroke", r.stroke), d.setAttribute("stroke-width", r.strokeWidth + ""), d.setAttribute("fill", "none"), r.strokeLineDash && d.setAttribute("stroke-dasharray", r.strokeLineDash.join(" ").trim()), r.strokeLineDashOffset && d.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
          break;
        case "fillPath":
          d = n.createElementNS(nn, "path"), d.setAttribute("d", this.opsToPath(l, i)), d.setAttribute("stroke", "none"), d.setAttribute("stroke-width", "0"), d.setAttribute("fill", r.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || d.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          d = this.fillSketch(n, l, r);
      }
      d && s.appendChild(d);
    }
    return s;
  }
  fillSketch(e, o, r) {
    let n = r.fillWeight;
    n < 0 && (n = r.strokeWidth / 2);
    const s = e.createElementNS(nn, "path");
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
  arc(e, o, r, n, s, i, l = !1, d) {
    const c = this.gen.arc(e, o, r, n, s, i, l, d);
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
var eu = { canvas: (t, e) => new _h(t, e), svg: (t, e) => new tu(t, e), generator: (t) => new vn(t), newSeed: () => vn.newSeed() };
const no = eu.generator();
function ou(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t.charCodeAt(o);
    e = (e << 5) - e + r, e |= 0;
  }
  return Math.abs(e);
}
function Io(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? ou(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function To(t) {
  var r;
  const e = t.options, o = (r = e == null ? void 0 : e.strokeLineDash) != null && r.length ? e.strokeLineDash.join(" ") : void 0;
  return no.toPaths(t).map((n) => ({
    d: n.d,
    stroke: n.stroke,
    strokeWidth: n.strokeWidth,
    fill: n.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: n.stroke !== "none" && n.strokeWidth > 0 ? o : void 0
  }));
}
function Uo(t, e) {
  return Math.min(t, e) * 0.25;
}
function ru(t, e, o, r, n) {
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
function Fr(t, e, o, r, n, s) {
  if (s) {
    const i = Uo(o, r);
    return To(no.path(ru(t, e, o, r, i), Io(n)));
  }
  return To(no.rectangle(t, e, o, r, Io(n)));
}
function zn(t, e, o, r, n) {
  return To(no.ellipse(t, e, o, r, Io(n)));
}
function nu(t, e, o, r, n) {
  const s = t + o / 2, i = e + r / 2, l = [s, e], d = [t + o, i], c = [s, e + r], a = [t, i], f = Math.hypot(o / 2, r / 2), y = Math.min(n, f / 2) / f, p = (M, C, A) => [
    M[0] + A * (C[0] - M[0]),
    M[1] + A * (C[1] - M[1])
  ], u = p(a, l, 1 - y), m = p(l, d, y), g = p(l, d, 1 - y), x = p(d, c, y), b = p(d, c, 1 - y), w = p(c, a, y), I = p(c, a, 1 - y), k = p(a, l, y);
  return [
    `M${m[0]},${m[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${d[0]},${d[1]} ${x[0]},${x[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${c[0]},${c[1]} ${w[0]},${w[1]}`,
    `L${I[0]},${I[1]}`,
    `Q${a[0]},${a[1]} ${k[0]},${k[1]}`,
    `L${u[0]},${u[1]}`,
    `Q${l[0]},${l[1]} ${m[0]},${m[1]}`,
    "Z"
  ].join(" ");
}
function An(t, e, o, r, n, s) {
  if (s) {
    const l = Uo(o, r);
    return To(no.path(nu(t, e, o, r, l), Io(n)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + r / 2],
    [t + o / 2, e + r],
    [t, e + r / 2]
  ];
  return To(no.polygon(i, Io(n)));
}
function Vo(t, e, o, r, n) {
  return To(no.line(t, e, o, r, Io(n)));
}
function En(t, e, o, r, n) {
  const s = Vo(t, e, o, r, n), i = Math.atan2(r - e, o - t), l = Math.max(12, n.strokeWidth * 4), d = Math.PI / 6, c = o - l * Math.cos(i - d), a = r - l * Math.sin(i - d), f = o - l * Math.cos(i + d), y = r - l * Math.sin(i + d), p = Vo(o, r, c, a, n), u = Vo(o, r, f, y, n);
  return [...s, ...p, ...u];
}
function sa(t, e) {
  const o = {
    ...Io(e),
    stroke: "none"
  };
  return To(no.polygon(t, o));
}
function is(t, e) {
  return To(no.path(t, Io(e)));
}
function so(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function su(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function iu({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ h(lu, { node: o }) : /* @__PURE__ */ h(au, { node: o });
  }
  return /* @__PURE__ */ h(cu, { node: t, editingLabel: e });
}
const kn = Le(iu), au = Le(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", r = so(e.data.strokeStyle), n = Kt(
    () => o ? null : $s(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Kt(() => {
    const p = e.data.points;
    if (!p || p.length === 0) return "";
    if (p.length === 1) return `M${p[0][0]},${p[0][1]}L${p[0][0]},${p[0][1]}`;
    const u = [`M${p[0][0]},${p[0][1]}`];
    for (let m = 1; m < p.length; m++)
      u.push(`L${p[m][0]},${p[m][1]}`);
    return u.join("");
  }, [e.data.points]), i = Kt(() => {
    if (!o) return null;
    const p = e.data.points;
    if (!p || p.length < 2) return "";
    const u = ["M", p[0][0], p[0][1]];
    for (let g = 1; g < p.length; g++) {
      const [x, b] = p[g], [w, I] = p[g - 1];
      u.push("Q", w, I, (w + x) / 2, (I + b) / 2);
    }
    const m = p[p.length - 1];
    return u.push("L", m[0], m[1]), u.join(" ");
  }, [e.data.points, o]), l = Kt(() => {
    if (!e.data.fill || !e.data.points || e.data.points.length < 3) return null;
    const p = e.data.points.map((C) => [C[0], C[1]]), u = ol(p), m = u[0], g = u[u.length - 1], x = Math.hypot(m[0] - g[0], m[1] - g[1]);
    let b = 0;
    for (let C = 1; C < u.length; C++)
      b += Math.hypot(u[C][0] - u[C - 1][0], u[C][1] - u[C - 1][1]);
    const w = b >= 1 && x <= Math.max(e.data.strokeWidth * 4, 20) && x <= b * 0.1, I = e.data.fillStyle || "solid";
    if (w) {
      const C = Dh(u, 0);
      return I === "solid" ? { kind: "solid", d: C, fill: e.data.fill } : { kind: "rough", paths: sa(u, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: I,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const k = Bh(u);
    if (k.length === 0) return null;
    if (I === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: k
      };
    const M = [];
    for (const { points: C } of k)
      C.length >= 3 && M.push(
        ...sa(C, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: I,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: M, regions: k };
  }, [e.data.fill, e.data.fillStyle, e.data.points, e.data.strokeWidth]), d = e.h === "auto" ? 0 : e.h, c = Number.isFinite(e.w) ? e.w : 0, a = Number.isFinite(d) ? d : 0, y = (Number.isFinite(e.data.strokeWidth) ? e.data.strokeWidth : 0) * 4;
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - y,
        top: e.y - y,
        width: c + y * 2,
        height: a + y * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: c + y * 2,
          height: a + y * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ S("g", { transform: `translate(${y}, ${y})`, opacity: e.data.opacity ?? 1, children: [
            (l == null ? void 0 : l.kind) === "solid" && (l.regions ? l.regions.map((p, u) => /* @__PURE__ */ h(
              "path",
              {
                d: p.pathD,
                fill: l.fill,
                stroke: "none"
              },
              u
            )) : /* @__PURE__ */ h("path", { d: l.d, fill: l.fill, stroke: "none" })),
            (l == null ? void 0 : l.kind) === "rough" && l.paths.map((p, u) => /* @__PURE__ */ h(
              "path",
              {
                d: p.d,
                stroke: p.stroke,
                strokeWidth: p.strokeWidth,
                fill: p.fill,
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
                strokeDasharray: r == null ? void 0 : r.map((p) => p * Math.max(e.data.strokeWidth, 1)).join(" "),
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
}), lu = Le(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, r = Number.isFinite(e.w) ? e.w : 0, n = Number.isFinite(o) ? o : 0, i = (Number.isFinite(e.data.strokeWidth) ? e.data.strokeWidth : 0) * 2, l = Kt(() => {
    const a = e.data.points;
    if (!a || a.length === 0) return "";
    const f = [`M${a[0][0]},${a[0][1]}`];
    for (let y = 1; y < a.length; y++)
      f.push(`L${a[y][0]},${a[y][1]}`);
    return f.push("Z"), f.join("");
  }, [e.data.points]), d = so(e.data.strokeStyle), c = d == null ? void 0 : d.map((a) => a * Math.max(e.data.strokeWidth, 1)).join(" ");
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - i,
        top: e.y - i,
        width: r + i * 2,
        height: n + i * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: r + i * 2,
          height: n + i * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ S("g", { transform: `translate(${i}, ${i})`, opacity: e.data.opacity ?? 1, children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: l,
                fill: e.data.fill || "none",
                stroke: e.data.color,
                strokeWidth: e.data.strokeWidth,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeDasharray: c
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: l,
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
}), cu = Le(function({ node: e, editingLabel: o }) {
  var w, I, k, M;
  const r = e.h === "auto" ? 100 : e.h, n = Number.isFinite(e.w) ? e.w : 0, s = Number.isFinite(r) ? r : 100, l = (Number.isFinite(e.data.strokeWidth) ? e.data.strokeWidth : 0) * 2, d = so(e.data.strokeStyle), c = ((w = e.data.startPoint) == null ? void 0 : w[0]) ?? 0, a = ((I = e.data.startPoint) == null ? void 0 : I[1]) ?? s / 2, f = ((k = e.data.endPoint) == null ? void 0 : k[0]) ?? n, y = ((M = e.data.endPoint) == null ? void 0 : M[1]) ?? s / 2, p = Kt(() => {
    if (e.data.roughness === 0) return null;
    const C = {
      stroke: e.data.stroke,
      fill: e.data.fill,
      fillStyle: e.data.fillStyle,
      roughness: e.data.roughness,
      strokeWidth: e.data.strokeWidth,
      strokeLineDash: d,
      seed: e.id
    }, A = e.data.edgeStyle === "round";
    switch (e.data.shape) {
      case "rect":
        return Fr(0, 0, n, s, C, A);
      case "ellipse":
        return zn(n / 2, s / 2, n, s, C);
      case "diamond":
        return An(0, 0, n, s, C, A);
      case "line":
        return Vo(c, a, f, y, C);
      case "arrow":
        return En(c, a, f, y, C);
      default:
        return null;
    }
  }, [e, d, c, a, f, y, n, s]), u = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, m = e.data.opacity ?? 1, g = e.data.shape === "line" || e.data.shape === "arrow", x = e.data.label, b = e.data.labelFontSize ?? 14;
  return /* @__PURE__ */ S(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x,
        top: e.y,
        width: n,
        height: s,
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
            width: n + l * 2,
            height: s + l * 2,
            style: { overflow: "visible", marginLeft: -l, marginTop: -l },
            children: /* @__PURE__ */ S("g", { transform: `translate(${l}, ${l})`, opacity: m, children: [
              u && /* @__PURE__ */ h(
                uu,
                {
                  shape: e.data.shape,
                  w: n,
                  h: s,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              p ? p.map((C, A) => u && C.fill && C.fill !== "none" ? null : /* @__PURE__ */ h(
                "path",
                {
                  d: C.d,
                  stroke: C.stroke,
                  strokeWidth: C.strokeWidth,
                  fill: C.fill,
                  strokeDasharray: C.strokeDasharray,
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                A
              )) : /* @__PURE__ */ h(
                du,
                {
                  shape: e.data.shape,
                  w: n,
                  h: s,
                  x1: c,
                  y1: a,
                  x2: f,
                  y2: y,
                  stroke: e.data.stroke,
                  fill: e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  dashArray: d,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              /* @__PURE__ */ h(
                hu,
                {
                  shape: e.data.shape,
                  w: n,
                  h: s,
                  x1: c,
                  y1: a,
                  x2: f,
                  y2: y,
                  hasFill: !!e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  rounded: e.data.edgeStyle === "round"
                }
              )
            ] })
          }
        ),
        !g && x && !o && /* @__PURE__ */ h(
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
                  fontFamily: So(e.data.labelFontFamily ?? ko),
                  fontSize: b,
                  color: e.data.fill && e.data.fillStyle === "solid" ? su(e.data.fill) : e.data.stroke,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  width: "100%"
                },
                children: x
              }
            )
          }
        )
      ]
    }
  );
});
function ei(t, e) {
  const o = Uo(t, e), r = t / 2, n = e / 2, s = [r, 0], i = [t, n], l = [r, e], d = [0, n], c = Math.hypot(t / 2, e / 2), a = Math.min(o, c / 2) / c, f = (I, k, M) => [
    I[0] + M * (k[0] - I[0]),
    I[1] + M * (k[1] - I[1])
  ], y = f(s, i, a), p = f(s, i, 1 - a), u = f(i, l, a), m = f(i, l, 1 - a), g = f(l, d, a), x = f(l, d, 1 - a), b = f(d, s, a), w = f(d, s, 1 - a);
  return [
    `M${y[0]},${y[1]}`,
    `L${p[0]},${p[1]}`,
    `Q${i[0]},${i[1]} ${u[0]},${u[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${l[0]},${l[1]} ${g[0]},${g[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${d[0]},${d[1]} ${b[0]},${b[1]}`,
    `L${w[0]},${w[1]}`,
    `Q${s[0]},${s[1]} ${y[0]},${y[1]}`,
    "Z"
  ].join(" ");
}
function du({
  shape: t,
  w: e,
  h: o,
  x1: r,
  y1: n,
  x2: s,
  y2: i,
  stroke: l,
  fill: d,
  strokeWidth: c,
  dashArray: a,
  rounded: f
}) {
  const y = a == null ? void 0 : a.join(",");
  switch (t) {
    case "rect": {
      const p = !!d && d !== "none", u = o <= Math.max(c * 2, 4), m = e <= Math.max(c * 2, 4);
      if (!p && (u || m))
        return u && e >= o ? /* @__PURE__ */ h(
          "line",
          {
            x1: 0,
            y1: o / 2,
            x2: e,
            y2: o / 2,
            stroke: l,
            strokeWidth: Math.max(c, o),
            strokeDasharray: y
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
            strokeDasharray: y
          }
        );
      const g = f ? Uo(e, o) : 0;
      return /* @__PURE__ */ h(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: g || void 0,
          ry: g || void 0,
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: y
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
          strokeDasharray: y
        }
      );
    case "diamond":
      return f ? /* @__PURE__ */ h(
        "path",
        {
          d: ei(e, o),
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: y
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: y
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
          stroke: l,
          strokeWidth: c,
          strokeDasharray: y
        }
      );
    case "arrow": {
      const p = Math.atan2(i - n, s - r), u = Math.max(12, c * 4), m = Math.PI / 6, g = s - u * Math.cos(p - m), x = i - u * Math.sin(p - m), b = s - u * Math.cos(p + m), w = i - u * Math.sin(p + m);
      return /* @__PURE__ */ S(Ct, { children: [
        /* @__PURE__ */ h(
          "line",
          {
            x1: r,
            y1: n,
            x2: s,
            y2: i,
            stroke: l,
            strokeWidth: c,
            strokeDasharray: y
          }
        ),
        /* @__PURE__ */ h(
          "polyline",
          {
            points: `${g},${x} ${s},${i} ${b},${w}`,
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
function hu({
  shape: t,
  w: e,
  h: o,
  x1: r,
  y1: n,
  x2: s,
  y2: i,
  hasFill: l,
  strokeWidth: d,
  rounded: c
}) {
  const a = l ? "painted" : "stroke", f = l ? "transparent" : "none";
  switch (t) {
    case "rect": {
      const y = c ? Uo(e, o) : 0;
      return /* @__PURE__ */ h(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: y || void 0,
          ry: y || void 0,
          fill: f,
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
          fill: f,
          stroke: "transparent",
          strokeWidth: d,
          pointerEvents: a
        }
      );
    case "diamond":
      return c ? /* @__PURE__ */ h(
        "path",
        {
          d: ei(e, o),
          fill: f,
          stroke: "transparent",
          strokeWidth: d,
          pointerEvents: a
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: f,
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
          x1: r,
          y1: n,
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
function uu({
  shape: t,
  w: e,
  h: o,
  fill: r,
  rounded: n
}) {
  switch (t) {
    case "rect": {
      const s = n ? Uo(e, o) : 0;
      return /* @__PURE__ */ h("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: r, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ h("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: r, stroke: "none" });
    case "diamond":
      return n ? /* @__PURE__ */ h(
        "path",
        {
          d: ei(e, o),
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
const fu = Le(function(e) {
  return /* @__PURE__ */ h(kn, { node: e.node });
}), pu = {
  type: "draw",
  component: fu,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => Ys(t, e, o, r),
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
}, yu = Le(function(e) {
  const o = e.node;
  return /* @__PURE__ */ h(kn, { node: o, editingLabel: e.editing });
}), mu = {
  type: "shape",
  component: yu,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => Cn(t, e, o, r),
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
function gu(t) {
  return null;
}
const bu = {
  type: "edge",
  component: gu,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, sn = 0.05, an = 10, xu = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function wu({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  onResizeHandleDown: s,
  cropping: i,
  onCropStart: l,
  onCropEnd: d
}) {
  const c = t.h, a = t.data.crop, f = ft(!1);
  f.current = !!i;
  const y = ft(null), p = ft(!1), u = ft(null), [m, g] = rt(null), x = ct(() => {
    u.current && u.current.naturalWidth > 0 && g({ w: u.current.naturalWidth, h: u.current.naturalHeight });
  }, []);
  Mt(() => {
    u.current && u.current.naturalWidth > 0 && g({ w: u.current.naturalWidth, h: u.current.naturalHeight });
  }, [t.data.src]);
  const [b, w] = rt({ x: 0, y: 0, w: 1, h: 1 });
  Mt(() => {
    i && (y.current = null, w(a ?? { x: 0, y: 0, w: 1, h: 1 }), !m && u.current && u.current.naturalWidth > 0 && g({ w: u.current.naturalWidth, h: u.current.naturalHeight }));
  }, [i]);
  const I = Kt(() => {
    if (m) {
      const N = m.w / m.h, _ = t.w / c;
      let st, at;
      return N > _ ? (st = t.w, at = t.w / N) : (at = c, st = c * N), { x: (t.w - st) / 2, y: (c - at) / 2, w: st, h: at };
    }
    return i ? { x: 0, y: 0, w: t.w, h: c } : null;
  }, [m, i, t.w, c]), k = ct(
    (N) => {
      const _ = o.getNode(t.id);
      if (!_ || _.type !== "image") return;
      const st = _.data;
      if (N.x < 1e-3 && N.y < 1e-3 && N.w > 0.999 && N.h > 0.999) {
        o.updateNodeWithHistory(t.id, {
          data: { ...st, crop: void 0 }
        });
        return;
      }
      const q = _.h === "auto" ? c : _.h, ot = _.rotation || 0;
      let ht, tt, ut, gt;
      if (I)
        if (ht = Math.max(an, N.w * I.w), tt = Math.max(an, N.h * I.h), !ot)
          ut = _.x + I.x + N.x * I.w, gt = _.y + I.y + N.y * I.h;
        else {
          const yt = _.x + _.w / 2, kt = _.y + q / 2;
          ut = yt - ht / 2, gt = kt - tt / 2;
        }
      else if (ht = Math.max(an, N.w * _.w), tt = Math.max(an, N.h * q), !ot)
        ut = _.x + N.x * _.w, gt = _.y + N.y * q;
      else {
        const yt = _.x + _.w / 2, kt = _.y + q / 2;
        ut = yt - ht / 2, gt = kt - tt / 2;
      }
      o.updateNodeWithHistory(t.id, {
        x: ut,
        y: gt,
        w: ht,
        h: tt,
        data: {
          ...st,
          crop: { x: N.x, y: N.y, w: N.w, h: N.h }
        }
      });
    },
    [o, t.id, I, c]
  ), M = ct(() => {
    y.current = "apply", k(b), d == null || d();
  }, [k, b, d]), C = ct(() => {
    y.current = "cancel", d == null || d();
  }, [d]);
  Mt(() => {
    if (i) {
      p.current = !0;
      return;
    }
    if (!p.current) return;
    p.current = !1;
    const N = y.current;
    y.current = null, !(N === "cancel" || N === "apply") && (k(b), d == null || d());
  }, [i, b, k, d]), Mt(() => {
    if (!i) return;
    const N = (_) => {
      _.key === "Enter" ? (M(), _.preventDefault(), _.stopPropagation()) : _.key === "Escape" && (C(), _.preventDefault(), _.stopPropagation());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [i, M, C]);
  const A = ct(
    (N, _) => {
      if (_.stopPropagation(), _.preventDefault(), !I) return;
      const st = _.currentTarget.ownerDocument, at = _.clientX, q = _.clientY, ot = { ...b }, ht = (ut) => {
        const gt = (ut.clientX - at) / n / I.w, yt = (ut.clientY - q) / n / I.h, kt = { ...ot }, At = ot.x + ot.w, Nt = ot.y + ot.h;
        if (N.includes("left")) {
          const Lt = Math.max(0, Math.min(At - sn, ot.x + gt));
          kt.x = Lt, kt.w = At - Lt;
        }
        if (N.includes("right") && (kt.w = Math.max(
          sn,
          Math.min(1 - ot.x, ot.w + gt)
        )), N.includes("top")) {
          const Lt = Math.max(0, Math.min(Nt - sn, ot.y + yt));
          kt.y = Lt, kt.h = Nt - Lt;
        }
        N.includes("bottom") && (kt.h = Math.max(
          sn,
          Math.min(1 - ot.y, ot.h + yt)
        )), w(kt);
      }, tt = () => {
        st.removeEventListener("pointermove", ht), st.removeEventListener("pointerup", tt);
      };
      st.addEventListener("pointermove", ht), st.addEventListener("pointerup", tt);
    },
    [b, I, n]
  ), P = ct(
    (N) => {
      if (N.stopPropagation(), N.preventDefault(), !I) return;
      const _ = N.currentTarget.ownerDocument, st = N.clientX, at = N.clientY, q = { ...b }, ot = (tt) => {
        const ut = (tt.clientX - st) / n / I.w, gt = (tt.clientY - at) / n / I.h;
        w({
          ...q,
          x: Math.max(0, Math.min(1 - q.w, q.x + ut)),
          y: Math.max(0, Math.min(1 - q.h, q.y + gt))
        });
      }, ht = () => {
        _.removeEventListener("pointermove", ot), _.removeEventListener("pointerup", ht);
      };
      _.addEventListener("pointermove", ot), _.addEventListener("pointerup", ht);
    },
    [b, I, n]
  ), V = ct(
    (N) => {
      if (f.current) {
        N.stopPropagation();
        return;
      }
      const _ = N.currentTarget.ownerDocument;
      if (N.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: Lt, y: dt } = o.screenToCanvas(
          N.clientX,
          N.clientY
        );
        for (const Ft of o.selection) {
          const Yt = o.getNode(Ft);
          if (!Yt) continue;
          const Ut = Yt.h === "auto" ? 100 : Yt.h;
          if (Lt >= Yt.x && Lt <= Yt.x + Yt.w && dt >= Yt.y && dt <= Yt.y + Ut)
            return;
        }
      }
      N.stopPropagation(), N.preventDefault(), N.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const st = N.clientX, at = N.clientY, q = Array.from(o.selection), ot = q.map((Lt) => {
        const dt = o.getNode(Lt);
        return { id: Lt, x: dt.x, y: dt.y };
      });
      let ht = !1, tt = null, ut = st, gt = at, yt = !1;
      const kt = () => {
        tt = null;
        const Lt = (ut - st) / o.viewport.zoom, dt = (gt - at) / o.viewport.zoom, { finalDx: Ft, finalDy: Yt } = o.computeDragSnap(
          ot,
          q,
          Lt,
          dt,
          yt
        ), Ut = ot.map(($t) => ({
          id: $t.id,
          patch: { x: $t.x + Ft, y: $t.y + Yt }
        }));
        o.updateMany(Ut);
      }, At = (Lt) => {
        const dt = (Lt.clientX - st) / o.viewport.zoom, Ft = (Lt.clientY - at) / o.viewport.zoom;
        if (!ht)
          if (Math.abs(dt) > 2 || Math.abs(Ft) > 2)
            ht = !0, o.pushHistorySnapshot();
          else
            return;
        ut = Lt.clientX, gt = Lt.clientY, yt = Lt.metaKey || Lt.ctrlKey, tt === null && (tt = requestAnimationFrame(kt));
      }, Nt = () => {
        tt !== null && (cancelAnimationFrame(tt), kt()), o.clearAlignGuides(), _.removeEventListener("pointermove", At), _.removeEventListener("pointerup", Nt);
      };
      _.addEventListener("pointermove", At), _.addEventListener("pointerup", Nt);
    },
    [o, t.id]
  ), X = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], et = 8 / n, it = et / 2, pt = 25 / n, wt = e && s && !i, xt = ct(
    (N) => {
      const _ = N.currentTarget.ownerDocument;
      N.stopPropagation(), N.preventDefault();
      const st = t.x + t.w / 2, at = t.y + c / 2, q = t.rotation || 0, { x: ot, y: ht } = o.screenToCanvas(
        N.clientX,
        N.clientY
      ), tt = Math.atan2(ht - at, ot - st);
      let ut = !1;
      const gt = (kt) => {
        ut || (ut = !0, o.pushHistorySnapshot());
        const { x: At, y: Nt } = o.screenToCanvas(
          kt.clientX,
          kt.clientY
        ), Lt = Math.atan2(Nt - at, At - st);
        let dt = q + (Lt - tt) * (180 / Math.PI);
        (kt.shiftKey || o.snapToGrid) && !(kt.metaKey || kt.ctrlKey) && (dt = Math.round(dt / 15) * 15), o.updateNode(t.id, { rotation: dt });
      }, yt = () => {
        _.removeEventListener("pointermove", gt), _.removeEventListener("pointerup", yt);
      };
      _.addEventListener("pointermove", gt), _.addEventListener("pointerup", yt);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), D = i && I ? {
    left: I.x + b.x * I.w,
    top: I.y + b.y * I.h,
    width: b.w * I.w,
    height: b.h * I.h
  } : null, W = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, G = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: W
  };
  if (!i && a) {
    const N = a.y * 100, _ = (1 - a.x - a.w) * 100, st = (1 - a.y - a.h) * 100, at = a.x * 100;
    G.objectViewBox = `inset(${N}% ${_}% ${st}% ${at}%)`;
  }
  const K = 8 / n, J = K / 2;
  return /* @__PURE__ */ S(
    "div",
    {
      onPointerDown: V,
      onDoubleClick: !i && r ? (N) => {
        N.stopPropagation(), l == null || l();
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
                  ref: u,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: x,
                  style: G,
                  draggable: !1
                }
              ),
              i && D && /* @__PURE__ */ h(
                "div",
                {
                  onPointerDown: P,
                  style: {
                    position: "absolute",
                    left: D.left,
                    top: D.top,
                    width: D.width,
                    height: D.height,
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
        i && D && xu.map(({ pos: N, edges: _, cx: st, cy: at, cursor: q }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (ot) => A(_, ot),
            style: {
              position: "absolute",
              left: D.left + st * D.width - J,
              top: D.top + at * D.height - J,
              width: K,
              height: K,
              background: "white",
              border: `${1.5 / n}px solid #3b82f6`,
              borderRadius: 2,
              cursor: q,
              zIndex: 11
            }
          },
          N
        )),
        e && !i && /* @__PURE__ */ S(Ct, { children: [
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
              onPointerDown: xt,
              style: {
                position: "absolute",
                left: "50%",
                top: -(pt + et / 2),
                width: et,
                height: et,
                marginLeft: -et / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        wt && X.map(({ pos: N, cx: _, cy: st }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (at) => {
              at.stopPropagation(), s == null || s(t.id, N, at);
            },
            style: {
              position: "absolute",
              left: `calc(${_ * 100}% - ${it}px)`,
              top: `calc(${st * 100}% - ${it}px)`,
              width: et,
              height: et,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: In(N, t.rotation || 0)
            }
          },
          N
        ))
      ]
    }
  );
}
const cl = Le(wu);
function vu(t) {
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
const ku = {
  type: "image",
  component: vu,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function Su({
  node: t,
  engine: e,
  editing: o,
  editClickPos: r,
  onStopEdit: n,
  onMeasuredHeight: s
}) {
  const i = ft(null), [l, d] = rt(t.data.text), c = ft(!1), a = ft(t.data.text), f = ft(null), y = ft(e);
  y.current = e;
  const p = ft(t);
  p.current = t;
  const u = ft(!1);
  Mt(() => {
    o || d(t.data.text);
  }, [t.data.text]), zo(() => {
    var M, C;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const A = i.current.ownerDocument;
      let P = !1;
      if (r) {
        const V = A.caretRangeFromPoint(r.clientX, r.clientY);
        if (V && i.current.contains(V.startContainer)) {
          const X = (M = A.defaultView) == null ? void 0 : M.getSelection();
          X == null || X.removeAllRanges(), X == null || X.addRange(V), P = !0;
        }
      }
      if (!P) {
        const V = A.createRange(), X = (C = A.defaultView) == null ? void 0 : C.getSelection();
        i.current.childNodes.length > 0 && (V.selectNodeContents(i.current), V.collapse(!1)), X == null || X.removeAllRanges(), X == null || X.addRange(V);
      }
      a.current = t.data.text, c.current = !1, u.current = !1;
    }
  }, [o]), Mt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const M = a.current, C = e.getNode(t.id);
        if (C && C.type === "text") {
          const A = C.data;
          M !== A.text && (u.current ? (u.current = !1, e.updateNode(t.id, {
            data: { ...A, text: M }
          })) : e.updateNodeWithHistory(t.id, {
            data: { ...A, text: M }
          }));
        }
      };
  }, [o, e, t.id]), Mt(() => {
    if (!i.current || !s) return;
    const M = new ResizeObserver(() => {
      var A;
      const C = ((A = i.current) == null ? void 0 : A.offsetHeight) ?? 0;
      C > 0 && s(t.id, C);
    });
    return M.observe(i.current), () => M.disconnect();
  }, [t.id, s, o]);
  const m = ct(() => {
    var C;
    if (c.current) return;
    c.current = !0, f.current && (clearTimeout(f.current), f.current = null);
    const M = ((C = i.current) == null ? void 0 : C.innerText) ?? "";
    d(M), a.current = M, M !== t.data.text && (u.current ? (u.current = !1, e.updateNode(t.id, {
      data: { ...t.data, text: M }
    })) : e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: M }
    })), n();
  }, [e, t, n]), g = ct(
    (M) => {
      var C;
      M.key === "Escape" && (M.preventDefault(), m(), (C = i.current) == null || C.blur()), M.stopPropagation();
    },
    [m]
  ), x = ct(() => {
    m();
  }, [m]), b = ct(() => {
    if (i.current) {
      const M = i.current.innerText;
      d(M), a.current = M, M !== p.current.data.text && !u.current && (u.current = !0, y.current.pushHistorySnapshot()), f.current && clearTimeout(f.current), f.current = setTimeout(() => {
        const C = p.current;
        M !== C.data.text && y.current.updateNode(C.id, {
          data: { ...C.data, text: M }
        });
      }, 0);
    }
  }, []), w = t.h === "auto" ? void 0 : t.h, I = t.data.opacity ?? 1, k = {
    fontFamily: So(t.data.fontFamily),
    fontSize: t.data.fontSize,
    color: t.data.color,
    textAlign: t.data.align,
    opacity: I,
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
          onKeyDown: g,
          onBlur: x,
          onInput: b,
          onPointerDown: (M) => M.stopPropagation(),
          style: { ...k, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ h("div", { ref: i, style: k, children: l || " " })
    }
  );
}
const dl = Le(Su);
function Mu(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    dl,
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
const Cu = {
  type: "text",
  component: Mu,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function Iu(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, r = ct(
    (s) => {
      var l, d;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (d = (l = t.callbacks).onEditEnd) == null || d.call(l);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), n = ct(
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
const Tu = {
  type: "frame",
  component: Iu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, zu = 100;
function Au({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onEditStart: i,
  onEditEnd: l
}) {
  const d = ft(null), c = ft(null), a = ft(""), f = ft(null), y = ft(null), p = ft(t);
  p.current = t;
  const u = ft(o);
  u.current = o;
  const m = ft(!1);
  Mt(() => {
    var k;
    if (s && c.current) {
      const M = c.current;
      M.innerText = t.data.text || "", a.current = t.data.text || "", M.focus();
      const C = M.ownerDocument, A = (k = C.defaultView) == null ? void 0 : k.getSelection(), P = f.current;
      f.current = null;
      let V = !1;
      if (P && A && C.caretRangeFromPoint) {
        const X = C.caretRangeFromPoint(P.x, P.y);
        X && M.contains(X.startContainer) && (A.removeAllRanges(), A.addRange(X), V = !0);
      }
      if (!V && A) {
        const X = C.createRange();
        M.childNodes.length > 0 && (X.selectNodeContents(M), X.collapse(!1)), A.removeAllRanges(), A.addRange(X);
      }
      m.current = !1;
    }
  }, [s]), Mt(() => {
    if (s)
      return () => {
        const k = p.current, M = a.current;
        M !== k.data.text && (m.current ? (m.current = !1, u.current.updateNode(k.id, {
          data: { ...k.data, text: M }
        })) : u.current.updateNodeWithHistory(k.id, {
          data: { ...k.data, text: M }
        }));
      };
  }, [s]);
  const g = ct(() => {
    y.current && (clearTimeout(y.current), y.current = null), c.current && (a.current = c.current.innerText), l();
  }, [l]), x = ct(
    (k) => {
      const M = k.currentTarget.ownerDocument;
      if (k.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: G, y: K } = o.screenToCanvas(k.clientX, k.clientY);
        for (const J of o.selection) {
          const N = o.getNode(J);
          if (!N) continue;
          const _ = N.h === "auto" ? 100 : N.h;
          if (G >= N.x && G <= N.x + N.w && K >= N.y && K <= N.y + _)
            return;
        }
      }
      if (k.stopPropagation(), s) return;
      k.currentTarget.setPointerCapture(k.pointerId), k.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const C = k.clientX, A = k.clientY, P = Array.from(o.selection), V = [];
      for (const G of P) {
        const K = o.getNode(G);
        K && V.push({ id: G, x: K.x, y: K.y });
      }
      if (V.length === 0) return;
      let X = !1, et = null, it = C, pt = A, wt = !1;
      const xt = () => {
        et = null;
        const G = (it - C) / o.viewport.zoom, K = (pt - A) / o.viewport.zoom, { finalDx: J, finalDy: N } = o.computeDragSnap(
          V,
          P,
          G,
          K,
          wt
        ), _ = V.map((st) => ({
          id: st.id,
          patch: { x: st.x + J, y: st.y + N }
        }));
        o.updateMany(_);
      }, D = (G) => {
        const K = (G.clientX - C) / o.viewport.zoom, J = (G.clientY - A) / o.viewport.zoom;
        if (!X)
          if (Math.abs(K) > 2 || Math.abs(J) > 2)
            X = !0, o.pushHistorySnapshot();
          else
            return;
        it = G.clientX, pt = G.clientY, wt = G.metaKey || G.ctrlKey, et === null && (et = requestAnimationFrame(xt));
      }, W = () => {
        et !== null && (cancelAnimationFrame(et), xt()), o.clearAlignGuides(), M.removeEventListener("pointermove", D), M.removeEventListener("pointerup", W);
      };
      M.addEventListener("pointermove", D), M.addEventListener("pointerup", W);
    },
    [o, t.id, s]
  ), b = ct(
    (k) => {
      if (r) {
        if (k.stopPropagation(), t.groupId) {
          const M = [];
          let C = t.groupId;
          for (; C; )
            M.push(C), C = o.groupParent.get(C);
          if (!o.activeGroupId) {
            o.enterGroup(M[M.length - 1]), o.select(t.id);
            return;
          }
          const A = M.indexOf(o.activeGroupId);
          if (A > 0) {
            o.enterGroup(M[A - 1]), o.select(t.id);
            return;
          }
        }
        s || (f.current = { x: k.clientX, y: k.clientY }, o.select(t.id), i(t.id));
      }
    },
    [r, s, o, t.id, t.groupId, i]
  ), w = t.data.fontSize ?? 16, I = t.h === "auto" ? zu : t.h;
  return /* @__PURE__ */ h(
    "div",
    {
      ref: d,
      "data-node-id": t.id,
      className: r ? void 0 : "sb-block-inert",
      onPointerDown: r ? x : void 0,
      onDoubleClick: b,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: I,
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
              onBlur: g,
              onInput: () => {
                c.current && (a.current = c.current.innerText, a.current !== p.current.data.text && !m.current && (m.current = !0, u.current.pushHistorySnapshot()), y.current && clearTimeout(y.current), y.current = setTimeout(() => {
                  const M = p.current, C = a.current;
                  C !== M.data.text && u.current.updateNode(M.id, {
                    data: { ...M.data, text: C }
                  });
                }, 0));
              },
              onKeyDown: (k) => {
                k.key === "Escape" && (k.stopPropagation(), g()), k.stopPropagation();
              },
              onPointerDown: (k) => k.stopPropagation(),
              style: {
                fontSize: w,
                fontFamily: So(ko),
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
                fontFamily: So(ko),
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
const hl = Le(Au);
function Eu(t) {
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
const Pu = {
  type: "sticky",
  component: Eu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, ul = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function Hu(t) {
  const e = t.match(ul);
  return e ? e[1] : null;
}
function Lu(t) {
  return ul.test(t);
}
function Ru(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function Du(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function Wu({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onResizeHandleDown: i,
  onEditStart: l
}) {
  const d = t.h, { data: c } = t, a = (u) => {
    if (r && s) {
      u.stopPropagation();
      return;
    }
  }, f = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", y = Math.max(6, 8 / n), p = [
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
      onDoubleClick: !s && r ? (u) => {
        u.stopPropagation(), l == null || l();
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
              border: f,
              boxSizing: "border-box",
              opacity: c.opacity ?? 1
            },
            children: [
              /* @__PURE__ */ h(
                "iframe",
                {
                  src: Ru(c.videoId),
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
        e && r && !s && p.map((u) => /* @__PURE__ */ h(
          "div",
          {
            "data-handle": u.key,
            onPointerDown: (m) => {
              m.stopPropagation(), i == null || i(t.id, u.key, m);
            },
            style: {
              position: "absolute",
              left: u.x,
              top: u.y,
              width: y,
              height: y,
              marginLeft: -y / 2,
              marginTop: -y / 2,
              background: "#fff",
              border: "1px solid #3b82f6",
              borderRadius: 2,
              cursor: u.cursor,
              zIndex: 1
            }
          },
          u.key
        ))
      ]
    }
  );
}
const Fu = Le(Wu);
function Bu(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    Fu,
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
const Nu = {
  type: "youtube",
  component: Bu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, Ou = [
  mh,
  pu,
  mu,
  bu,
  ku,
  Cu,
  Tu,
  Pu,
  Nu
];
class Vu {
  constructor(e, o) {
    vt(this, "spatial");
    vt(this, "registry");
    /** Current resolved port values. */
    vt(this, "values", /* @__PURE__ */ new Map());
    /** Node IDs that need recomputation. */
    vt(this, "dirty", /* @__PURE__ */ new Set());
    /** Whether a microtask flush is already scheduled. */
    vt(this, "scheduled", !1);
    /** Generation counter for canceling stale async results. */
    vt(this, "generation", 0);
    /** Change subscribers. */
    vt(this, "listeners", /* @__PURE__ */ new Set());
    /** Node IDs that are part of a cycle (updated after each topoSort). */
    vt(this, "_cycleNodeIds", /* @__PURE__ */ new Set());
    /** Wall time of the last `compute` run per node (sync or async resolution), in ms. */
    vt(this, "lastComputeMs", /* @__PURE__ */ new Map());
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
    return this.values.get(Wo(e, o)) ?? null;
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
      const l = this.spatial.getEdgesForNode(e);
      let d = !1;
      for (const c of l) {
        const a = c.data;
        if (a.toId === e && a.targetPort === i.id) {
          const f = this.values.get(
            Wo(a.fromId, a.sourcePort ?? "")
          );
          r[i.id] = f ?? i.defaultValue ?? null, d = !0;
          break;
        }
      }
      d || (r[i.id] = i.defaultValue ?? null);
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
      s.direction === "output" && (r[s.id] = this.values.get(Wo(e, s.id)) ?? null);
    return r;
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
    var n;
    const o = this.registry.get(
      ((n = this.spatial.nodes.get(e)) == null ? void 0 : n.type) ?? ""
    );
    if (!(o != null && o.ports)) return {};
    const r = {};
    for (const s of o.ports)
      if (s.direction === "input") {
        const i = this.spatial.getEdgesForNode(e);
        let l = !1;
        for (const d of i) {
          const c = d.data;
          if (c.toId === e && c.targetPort === s.id) {
            r[s.id] = this.values.get(Wo(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, l = !0;
            break;
          }
        }
        l || (r[s.id] = s.defaultValue ?? null);
      } else
        r[s.id] = this.values.get(Wo(e, s.id)) ?? null;
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
            this.values.delete(Wo(n.id, i.id));
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
    for (const r of o) {
      const n = r.data;
      n.fromId === e && n.targetPort && this.dirty.add(n.toId);
    }
  }
  /** Topological sort of dirty nodes + their downstream dependents. */
  topoSort() {
    const e = /* @__PURE__ */ new Set();
    for (const u of this.spatial.nodes.values()) {
      const m = this.registry.get(u.type);
      m != null && m.ports && m.compute && e.add(u.id);
    }
    if (e.size === 0) {
      const u = this._cycleNodeIds.size > 0;
      return u && (this._cycleNodeIds = /* @__PURE__ */ new Set()), { sorted: [], cyclesChanged: u };
    }
    const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const u of e)
      o.set(u, /* @__PURE__ */ new Set()), r.set(u, 0);
    const n = this.spatial.getAllEdges();
    for (const u of n) {
      const m = u.data;
      m.sourcePort && m.targetPort && e.has(m.fromId) && e.has(m.toId) && (o.get(m.fromId).add(m.toId), r.set(m.toId, (r.get(m.toId) ?? 0) + 1));
    }
    const s = new Set(this.dirty), i = /* @__PURE__ */ new Set(), l = (u) => {
      if (i.has(u)) return;
      i.add(u);
      const m = o.get(u);
      if (m)
        for (const g of m)
          s.add(g), l(g);
    };
    for (const u of [...this.dirty])
      l(u);
    const d = /* @__PURE__ */ new Map();
    for (const u of s)
      d.set(u, 0);
    for (const u of n) {
      const m = u.data;
      m.sourcePort && m.targetPort && s.has(m.fromId) && s.has(m.toId) && d.set(
        m.toId,
        (d.get(m.toId) ?? 0) + 1
      );
    }
    const c = [];
    for (const [u, m] of d)
      m === 0 && c.push(u);
    const a = [];
    for (; c.length > 0; ) {
      const u = c.shift();
      a.push(u);
      const m = o.get(u);
      if (m)
        for (const g of m) {
          if (!s.has(g)) continue;
          const x = (d.get(g) ?? 1) - 1;
          d.set(g, x), x === 0 && c.push(g);
        }
    }
    const f = new Set(a), y = /* @__PURE__ */ new Set();
    for (const u of s)
      f.has(u) || y.add(u);
    let p = !1;
    return (y.size !== this._cycleNodeIds.size || [...y].some((u) => !this._cycleNodeIds.has(u))) && (this._cycleNodeIds = y, p = !0), { sorted: a, cyclesChanged: p };
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
    const n = this.getInputs(e), s = typeof performance < "u" ? performance.now() : 0, i = r.compute(n, o.data);
    if (i instanceof Promise) {
      const d = ++this.generation;
      return i.then((c) => {
        if (d !== this.generation) return;
        const a = typeof performance < "u" ? performance.now() : 0;
        this.lastComputeMs.set(e, a - s), this.applyOutputs(e, r.ports, c) && (this.markDownstream(e), this.notifyListeners(), this.dirty.size > 0 && this.scheduleFlush());
      }), !1;
    }
    const l = typeof performance < "u" ? performance.now() : 0;
    return this.lastComputeMs.set(e, l - s), this.applyOutputs(e, r.ports, i);
  }
  /** Apply computed outputs to the values map. Returns true if any value changed. */
  applyOutputs(e, o, r) {
    let n = !1;
    for (const s of o) {
      if (s.direction !== "output") continue;
      const i = Wo(e, s.id), l = r[s.id] ?? null, d = this.values.get(i) ?? null;
      Xu(d, l) || (this.values.set(i, l), n = !0);
    }
    return n && this.markDownstream(e), n;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function Xu(t, e) {
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
const fr = [
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
function Or(t) {
  return fr.find((e) => e.key === t) ?? fr[1];
}
function Gu() {
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
function Yu() {
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
const as = {
  "japanese-stationery": Gu,
  kraft: Yu
};
function ju(t) {
  var e;
  return ((e = as[t]) == null ? void 0 : e.call(as)) ?? {};
}
const fl = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, Zu = {
  ...fl,
  willChange: "transform"
}, Ku = Le(function({
  background: e
}) {
  const o = Or(e), { staticDefs: r, staticLayers: n } = ju(e);
  return /* @__PURE__ */ S("svg", { style: Zu, children: [
    r && /* @__PURE__ */ h("defs", { children: r }),
    /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    n
  ] });
});
function qu({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: r = !0
}) {
  const n = e * t.zoom, s = t.x % n, i = t.y % n, d = Or(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ h(Ku, { background: o }),
    r && /* @__PURE__ */ S("svg", { style: fl, children: [
      /* @__PURE__ */ h("defs", { children: /* @__PURE__ */ h(
        "pattern",
        {
          id: "grid-dots",
          x: s,
          y: i,
          width: n,
          height: n,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ h("circle", { cx: n / 2, cy: n / 2, r: 1.5, fill: d })
        }
      ) }),
      /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: "url(#grid-dots)" })
    ] })
  ] });
}
const Rs = {
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
}, pl = mr(Rs);
function re() {
  return Ye(pl);
}
const Ds = {
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
}, yl = mr({
  dir: "ltr",
  isRTL: !1,
  labels: Ds
});
function Uu(t) {
  var e;
  return t === "rtl" || t === "ltr" ? t : typeof document < "u" && ((e = document.dir) == null ? void 0 : e.toLowerCase()) === "rtl" ? "rtl" : "ltr";
}
function Qu(t, e) {
  return Kt(() => {
    const o = Uu(t), { customNodeDocs: r, ...n } = e ?? {};
    return {
      dir: o,
      isRTL: o === "rtl",
      labels: {
        ...Ds,
        ...n,
        customNodeDocs: {
          ...Ds.customNodeDocs,
          ...r ?? {}
        }
      }
    };
  }, [t, e]);
}
function te() {
  return Ye(yl);
}
const Er = 168, Pr = 112, hr = 6, ln = Er - hr * 2, cn = Pr - hr * 2;
function ml(t, e) {
  return t.h === "auto" ? e[t.id] ?? 100 : t.h;
}
function Ju(t, e, o, r, n) {
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
  for (const m of t) {
    if (m.type === "edge") continue;
    const g = ml(m, e);
    s = Math.min(s, m.x), i = Math.min(i, m.y), l = Math.max(l, m.x + m.w), d = Math.max(d, m.y + g);
  }
  const c = o.zoom, a = (0 - o.x) / c, f = (0 - o.y) / c, y = (r - o.x) / c, p = (n - o.y) / c;
  if (!Number.isFinite(s))
    return {
      minX: Math.min(a, y) - 80,
      minY: Math.min(f, p) - 80,
      maxX: Math.max(a, y) + 80,
      maxY: Math.max(f, p) + 80
    };
  const u = 48;
  return s -= u, i -= u, l += u, d += u, s = Math.min(s, a, y), i = Math.min(i, f, p), l = Math.max(l, a, y), d = Math.max(d, f, p), { minX: s, minY: i, maxX: l, maxY: d };
}
function $u({
  engine: t,
  nodes: e,
  viewport: o,
  containerSize: r,
  measuredHeights: n
}) {
  const s = re(), { labels: i } = te(), [l, d] = rt(() => t.presentationMode), c = ft(null), a = ft(!1), [f, y] = rt(!1);
  Mt(() => {
    const q = () => d(t.presentationMode);
    return t.on("presentation", q), () => t.off("presentation", q);
  }, [t]);
  const { minX: p, minY: u, maxX: m, maxY: g, scale: x, offsetX: b, offsetY: w } = Kt(() => {
    const { w: q, h: ot } = r;
    if (q <= 0 || ot <= 0)
      return { minX: 0, minY: 0, maxX: 1, maxY: 1, scale: 1, offsetX: 0, offsetY: 0 };
    const ht = Ju(e, n, o, q, ot), tt = Math.max(ht.maxX - ht.minX, 1e-6), ut = Math.max(ht.maxY - ht.minY, 1e-6), gt = Math.min(ln / tt, cn / ut), yt = tt * gt, kt = ut * gt;
    return {
      minX: ht.minX,
      minY: ht.minY,
      maxX: ht.maxX,
      maxY: ht.maxY,
      scale: gt,
      offsetX: (ln - yt) / 2,
      offsetY: (cn - kt) / 2
    };
  }, [e, n, o, r]), I = ct(
    (q, ot) => {
      const { w: ht, h: tt } = r;
      if (ht <= 0 || tt <= 0) return;
      const ut = t.viewport.zoom, { x: gt, y: yt } = t.viewport, kt = ht / 2 - q * ut, At = tt / 2 - ot * ut;
      t.pan(kt - gt, At - yt);
    },
    [r, t]
  ), k = ct((q, ot) => {
    const ht = c.current;
    if (!ht) return null;
    const tt = ht.getBoundingClientRect();
    if (tt.width <= 0 || tt.height <= 0) return null;
    const ut = (q - tt.left) / tt.width * Er, gt = (ot - tt.top) / tt.height * Pr, yt = ut - hr, kt = gt - hr;
    return yt < -0.5 || kt < -0.5 || yt > ln + 0.5 || kt > cn + 0.5 ? null : { ix: yt, iy: kt };
  }, []), M = ct(
    (q, ot) => ({
      wx: p + (q - b) / x,
      wy: u + (ot - w) / x
    }),
    [p, u, b, w, x]
  ), C = ct(
    (q, ot) => {
      const ht = k(q, ot);
      if (!ht) return;
      const { wx: tt, wy: ut } = M(ht.ix, ht.iy);
      I(tt, ut);
    },
    [k, M, I]
  ), A = ct(
    (q) => {
      q.stopPropagation(), q.button === 0 && (a.current = !0, y(!0), q.currentTarget.setPointerCapture(q.pointerId), C(q.clientX, q.clientY));
    },
    [C]
  ), P = ct(
    (q) => {
      a.current && C(q.clientX, q.clientY);
    },
    [C]
  ), V = ct((q) => {
    a.current = !1, y(!1);
    try {
      q.currentTarget.releasePointerCapture(q.pointerId);
    } catch {
    }
  }, []);
  if (l || r.w <= 0 || r.h <= 0)
    return null;
  const X = o.zoom, et = r.w, it = r.h, pt = (0 - o.x) / X, wt = (0 - o.y) / X, xt = (et - o.x) / X, D = (it - o.y) / X, W = b + (pt - p) * x, G = w + (wt - u) * x, K = Math.max(2, (xt - pt) * x), J = Math.max(2, (D - wt) * x), N = [];
  for (const q of e) {
    if (q.type === "edge") continue;
    const ot = ml(q, n), ht = b + (q.x - p) * x, tt = w + (q.y - u) * x, ut = Math.max(1.5, q.w * x), gt = Math.max(1.5, ot * x);
    N.push(
      /* @__PURE__ */ h(
        "rect",
        {
          x: ht,
          y: tt,
          width: ut,
          height: gt,
          rx: 1,
          fill: s.accentColor,
          fillOpacity: 0.45,
          stroke: "none"
        },
        q.id
      )
    );
  }
  const _ = s.border, st = s.controlBg, at = s.accentColor;
  return /* @__PURE__ */ h(
    "div",
    {
      "data-sb-minimap": !0,
      style: {
        position: "absolute",
        insetInlineEnd: 12,
        bottom: 56,
        width: Er,
        height: Pr,
        zIndex: 9998,
        pointerEvents: "auto",
        touchAction: "none",
        borderRadius: s.controlBorderRadius,
        boxShadow: s.panelShadow
      },
      onPointerDown: (q) => q.stopPropagation(),
      children: /* @__PURE__ */ S(
        "svg",
        {
          ref: c,
          width: Er,
          height: Pr,
          role: "img",
          "aria-label": i.minimapTitle,
          style: {
            display: "block",
            cursor: f ? "grabbing" : "grab",
            borderRadius: s.controlBorderRadius,
            overflow: "hidden"
          },
          onPointerDown: A,
          onPointerMove: P,
          onPointerUp: V,
          onPointerCancel: V,
          children: [
            /* @__PURE__ */ h("rect", { x: 0, y: 0, width: Er, height: Pr, fill: st, stroke: _, strokeWidth: 1 }),
            /* @__PURE__ */ S("g", { transform: `translate(${hr}, ${hr})`, children: [
              /* @__PURE__ */ h(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: ln,
                  height: cn,
                  fill: "rgba(255,255,255,0.04)",
                  stroke: _,
                  strokeOpacity: 0.5,
                  strokeWidth: 0.5
                }
              ),
              N,
              /* @__PURE__ */ h(
                "rect",
                {
                  x: W,
                  y: G,
                  width: K,
                  height: J,
                  fill: at,
                  fillOpacity: 0.12,
                  stroke: at,
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
const gl = "sb-excalib-index", oi = "sb-excalib-";
function Pn() {
  try {
    const t = localStorage.getItem(gl);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function bl(t) {
  localStorage.setItem(gl, JSON.stringify(t));
}
function _u(t) {
  try {
    const e = localStorage.getItem(oi + t);
    return e ? ri(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function ri(t) {
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
function xl() {
  return Pn();
}
function ni(t) {
  const e = _u(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function si(t, e) {
  const o = ri(t), r = Pt(10), n = o.libraryItems.map((l) => l.name || "Untitled"), s = {
    id: r,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: n
  };
  localStorage.setItem(oi + r, JSON.stringify(o));
  const i = Pn();
  return i.push(s), bl(i), s;
}
function tf(t) {
  localStorage.removeItem(oi + t);
  const e = Pn().filter((o) => o.id !== t);
  bl(e);
}
function ef(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], r = Pn();
  for (const n of r) {
    if (!n.itemNames.some((l) => l.toLowerCase().includes(e)) && !n.name.toLowerCase().includes(e)) continue;
    const i = ni(n.id);
    for (const l of i)
      ((l.name || "").toLowerCase().includes(e) || n.name.toLowerCase().includes(e)) && o.push({ library: n, item: l });
  }
  return o;
}
async function of(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const r = await o.json();
  if (r.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const n = ri(r);
  return si(n, { name: e, source: t });
}
function wl(t) {
  const e = t.visualViewport;
  return {
    vw: (e == null ? void 0 : e.width) ?? t.innerWidth,
    vh: (e == null ? void 0 : e.height) ?? t.innerHeight
  };
}
const vl = 8;
function kl(t, e, o, r, n, s = vl) {
  const { vw: i, vh: l } = wl(n);
  let d = t;
  d + o + s > i && (d = t - o), d = Math.max(s, Math.min(d, i - o - s));
  let c = e;
  if (r + s * 2 <= l) {
    if (c + r + s > l) {
      const y = e - r;
      e - s >= r ? c = y : c = l - r - s;
    }
    c < s && (c = s);
  } else
    c = s;
  const f = Math.max(s, l - r - s);
  return c = Math.max(s, Math.min(c, f)), { left: d, top: c };
}
function Sl(t, e, o, r, n) {
  const i = vl, { vw: l, vh: d } = wl(r);
  let c = t.right + 8;
  c + e + i > l && (c = t.left - e - 8), c < i && (c = i), c = Math.max(i, Math.min(c, l - e - i));
  let a = t.top;
  a + o + i > d && (a = d - o - i), a < i && (a = i);
  const f = Math.max(i, d - o - i);
  return a = Math.max(i, Math.min(a, f)), { left: c, top: a };
}
function Ml(t, e, o, r = []) {
  zo(() => {
    if (!t) return;
    const n = o.current;
    if (!n) return;
    const s = n.ownerDocument.defaultView ?? window, i = () => {
      var f;
      const d = (f = e.current) == null ? void 0 : f.getBoundingClientRect();
      if (!d) return;
      const c = n.getBoundingClientRect(), a = Sl(d, c.width, c.height, s);
      n.style.left = `${a.left}px`, n.style.top = `${a.top}px`;
    };
    i();
    const l = new ResizeObserver(i);
    return l.observe(n), () => l.disconnect();
  }, [t, e, o, ...r]);
}
function ii(t, e, o, r = []) {
  zo(() => {
    if (!t || !e) return;
    const n = o.current;
    if (!n) return;
    const s = n.ownerDocument.defaultView ?? window, i = () => {
      const d = n.getBoundingClientRect(), c = Sl(e, d.width, d.height, s);
      n.style.left = `${c.left}px`, n.style.top = `${c.top}px`;
    };
    i();
    const l = new ResizeObserver(i);
    return l.observe(n), () => l.disconnect();
  }, [t, e, o, ...r]);
}
function Vr(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function Yo(t) {
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
function Al(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function rf(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function ls(t, e) {
  return {
    id: Pt(10),
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
      fill: Cl(t.backgroundColor),
      fillStyle: Il(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Tl(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: Vr(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? rf(t) : void 0
    }
  };
}
function ia(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const r = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Tl(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: Vr(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [l, d] = o, c = Math.min(l[0], d[0]), a = Math.min(l[1], d[1]), f = Math.max(l[0], d[0]), y = Math.max(l[1], d[1]), p = Math.max(f - c, 1), u = Math.max(y - a, 1);
    return [
      {
        id: Pt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + a,
        w: p,
        h: u,
        z: 0,
        rotation: Yo(t.angle),
        locked: t.locked || void 0,
        data: {
          ...r,
          shape: e ? "arrow" : "line",
          startPoint: [l[0] - c, l[1] - a],
          endPoint: [d[0] - c, d[1] - a]
        }
      }
    ];
  }
  if (t.backgroundColor && t.backgroundColor !== "transparent") {
    const l = nf(t);
    if (l) return [l];
  }
  const s = Pt(10), i = [];
  for (let l = 0; l < o.length - 1; l++) {
    const d = o[l], c = o[l + 1], a = Math.min(d[0], c[0]), f = Math.min(d[1], c[1]), y = Math.max(d[0], c[0]), p = Math.max(d[1], c[1]), u = Math.max(y - a, 1), m = Math.max(p - f, 1), g = l === o.length - 2;
    i.push({
      id: Pt(10),
      type: "shape",
      x: t.x + a,
      y: t.y + f,
      w: u,
      h: m,
      z: 0,
      rotation: Yo(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...r,
        shape: e && g ? "arrow" : "line",
        startPoint: [d[0] - a, d[1] - f],
        endPoint: [c[0] - a, c[1] - f]
      }
    });
  }
  return i;
}
function nf(t) {
  const e = t.points ?? [];
  if (e.length < 3) return null;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const [l, d] of e)
    l < o && (o = l), d < r && (r = d), l > n && (n = l), d > s && (s = d);
  if (!isFinite(o)) return null;
  const i = e.map(([l, d]) => [
    l - o,
    d - r,
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
    rotation: Yo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: Vr(t.opacity ?? 100),
      fill: Cl(t.backgroundColor),
      fillStyle: Il(t.fillStyle)
    }
  };
}
function sf(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, r = t.simulatePressure !== !1, n = e.map((a, f) => {
    const y = !r && o && f < o.length ? o[f] : 0.5;
    return [a[0], a[1], y];
  });
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
  for (const [a, f] of n)
    a < s && (s = a), f < i && (i = f), a > l && (l = a), f > d && (d = f);
  isFinite(s) || (s = 0, i = 0, l = 0, d = 0);
  const c = n.map(
    ([a, f, y]) => [a - s, f - i, y]
  );
  return {
    id: Pt(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(l - s, 1),
    h: Math.max(d - i, 1),
    z: 0,
    rotation: Yo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: Vr(t.opacity ?? 100)
    }
  };
}
function af(t) {
  return {
    id: Pt(10),
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
      fontFamily: zl(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Al(t.textAlign),
      opacity: Vr(t.opacity ?? 100)
    }
  };
}
function lf(t) {
  return {
    id: Pt(10),
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
function El(t) {
  return cf(t.elements);
}
function cf(t) {
  const e = [], o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && n.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [ls(s, "rect")];
        break;
      case "ellipse":
        i = [ls(s, "ellipse")];
        break;
      case "diamond":
        i = [ls(s, "diamond")];
        break;
      case "arrow":
        i = ia(s, !0);
        break;
      case "line":
        i = ia(s, !1);
        break;
      case "freedraw": {
        const l = sf(s);
        l && (i = [l]);
        break;
      }
      case "text":
        i = [af(s)];
        break;
      case "frame":
      case "magicframe":
        i = [lf(s)];
        break;
      case "image":
        continue;
      default:
        continue;
    }
    i.length > 0 && o.set(s.id, i[0].id), e.push(...i);
  }
  for (const [s, i] of n) {
    const l = o.get(s);
    if (!l) continue;
    const d = e.find((a) => a.id === l);
    if (!d || d.type !== "shape") continue;
    const c = d.data;
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = zl(i.fontFamily), c.labelAlign = Al(i.textAlign);
  }
  return df(t, e, o, r), hf(e), { nodes: e, groupParent: r };
}
function df(t, e, o, r) {
  var s;
  const n = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (i.isDeleted || !((s = i.groupIds) != null && s.length)) continue;
    for (let d = 0; d < i.groupIds.length - 1; d++) {
      const c = i.groupIds[d], a = i.groupIds[d + 1];
      n.has(c) || n.set(c, a);
    }
    const l = o.get(i.id);
    if (l) {
      const d = e.find((c) => c.id === l);
      d && (d.groupId = i.groupIds[0]);
    }
  }
  for (const [i, l] of n)
    r.set(i, l);
}
function hf(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const r of t)
    r.x < e && (e = r.x), r.y < o && (o = r.y);
  if (isFinite(e))
    for (const r of t)
      r.x -= e, r.y -= o;
}
function ai(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const f of t) {
    const y = f.h === "auto" ? 40 : f.h;
    o = Math.min(o, f.x), r = Math.min(r, f.y), n = Math.max(n, f.x + f.w), s = Math.max(s, f.y + y);
  }
  const i = n - o || 1, l = s - r || 1, d = 4, c = `${o - d} ${r - d} ${i + d * 2} ${l + d * 2}`, a = [];
  for (const f of t)
    switch (f.type) {
      case "shape":
        a.push(uf(f));
        break;
      case "draw":
        a.push(ff(f));
        break;
      case "text":
        a.push(pf(f));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${a.join("")}</svg>`;
}
function Pl(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function uf(t) {
  var y, p, u, m;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, r = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: so(e.strokeStyle),
    seed: t.id
  }, n = ((y = e.startPoint) == null ? void 0 : y[0]) ?? 0, s = ((p = e.startPoint) == null ? void 0 : p[1]) ?? o / 2, i = ((u = e.endPoint) == null ? void 0 : u[0]) ?? t.w, l = ((m = e.endPoint) == null ? void 0 : m[1]) ?? o / 2;
  let d;
  switch (e.shape) {
    case "rect":
      d = Fr(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "ellipse":
      d = zn(t.x + t.w / 2, t.y + o / 2, t.w, o, r);
      break;
    case "diamond":
      d = An(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "line":
      d = Vo(t.x + n, t.y + s, t.x + i, t.y + l, r);
      break;
    case "arrow":
      d = En(t.x + n, t.y + s, t.x + i, t.y + l, r);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, a = c < 1 ? `<g opacity="${c}">` : "<g>", f = d.map(
    (g) => `<path d="${Pl(g.d)}" fill="${g.fill || "none"}" stroke="${g.stroke}" stroke-width="${g.strokeWidth}"${g.strokeDasharray ? ` stroke-dasharray="${g.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${a}${f.join("")}</g>`;
}
function ff(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), r = e.opacity ?? 1, n = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${n}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${r < 1 ? ` opacity="${r}"` : ""}/>`;
}
function pf(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), r = e.opacity ?? 1, n = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${r < 1 ? ` opacity="${r}"` : ""}>${Pl(n)}</text>`;
}
const Hl = "sb-personal-library";
function li() {
  try {
    const t = localStorage.getItem(Hl);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Ll(t) {
  localStorage.setItem(Hl, JSON.stringify(t));
}
function Rl() {
  return li();
}
function yf(t, e, o) {
  const r = structuredClone(e);
  if (r.length > 0) {
    let d = 1 / 0, c = 1 / 0;
    for (const a of r)
      a.x < d && (d = a.x), a.y < c && (c = a.y);
    if (isFinite(d))
      for (const a of r)
        a.x -= d, a.y -= c;
  }
  const n = new Set(
    r.map((d) => d.groupId).filter(Boolean)
  ), s = [];
  for (const [d, c] of o)
    n.has(d) && s.push([d, c]);
  const i = {
    id: Pt(10),
    name: t.trim() || "Untitled",
    nodes: r,
    groupParent: s,
    createdAt: Date.now()
  }, l = li();
  return l.unshift(i), Ll(l), i;
}
function mf(t) {
  const e = li().filter((o) => o.id !== t);
  Ll(e);
}
function Dl(t, e, o, r) {
  const { nodes: n, groupParent: s } = El(e);
  if (n.length === 0) return;
  const i = structuredClone(n), l = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const b of i) {
    const w = Pt(10);
    l.set(b.id, w), b.id = w;
  }
  for (const b of i)
    b.groupId && (d.has(b.groupId) || d.set(b.groupId, Pt(10)), b.groupId = d.get(b.groupId));
  let c = 1 / 0, a = 1 / 0, f = -1 / 0, y = -1 / 0;
  for (const b of i) {
    const w = b.h === "auto" ? 100 : b.h;
    c = Math.min(c, b.x), a = Math.min(a, b.y), f = Math.max(f, b.x + b.w), y = Math.max(y, b.y + w);
  }
  const p = o ?? window.innerWidth / 2, u = r ?? window.innerHeight / 2, m = t.screenToCanvas(p, u), g = m.x - (c + f) / 2, x = m.y - (a + y) / 2;
  for (const b of i)
    b.x += g, b.y += x, b.z = t.nextZ();
  t.addNodes(i);
  for (const [b, w] of s) {
    const I = d.get(b) ?? b, k = d.get(w) ?? w;
    t.groupParent.set(I, k);
  }
  t.selectMultiple(i.map((b) => b.id));
}
const Ws = "application/x-spatialboard-library-item", Fs = "application/x-spatialboard-personal-item";
function Wl(t, e, o, r) {
  if (e.nodes.length === 0) return;
  const n = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const g of n) {
    const x = Pt(10);
    s.set(g.id, x), g.id = x;
  }
  for (const g of n)
    g.groupId && (i.has(g.groupId) || i.set(g.groupId, Pt(10)), g.groupId = i.get(g.groupId));
  for (const g of n)
    if (g.type === "edge") {
      const x = g.data;
      x.fromId && s.has(x.fromId) && (x.fromId = s.get(x.fromId)), x.toId && s.has(x.toId) && (x.toId = s.get(x.toId));
    }
  let l = 1 / 0, d = 1 / 0, c = -1 / 0, a = -1 / 0;
  for (const g of n) {
    const x = g.h === "auto" ? 100 : g.h;
    l = Math.min(l, g.x), d = Math.min(d, g.y), c = Math.max(c, g.x + g.w), a = Math.max(a, g.y + x);
  }
  const f = o ?? window.innerWidth / 2, y = r ?? window.innerHeight / 2, p = t.screenToCanvas(f, y), u = p.x - (l + c) / 2, m = p.y - (d + a) / 2;
  for (const g of n)
    g.x += u, g.y += m, g.z = t.nextZ();
  t.addNodes(n);
  for (const [g, x] of e.groupParent) {
    const b = i.get(g) ?? g, w = i.get(x) ?? x;
    t.groupParent.set(b, w);
  }
  t.selectMultiple(n.map((g) => g.id));
}
const pr = /* @__PURE__ */ new Map();
function gf({ item: t }) {
  const e = Kt(() => {
    const o = pr.get(t.id);
    if (o) return o;
    const { nodes: r } = El(t), n = ai(r, 56);
    return pr.set(t.id, n), n;
  }, [t.id]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Fl({
  item: t,
  libId: e,
  onClick: o,
  theme: r
}) {
  const { labels: n } = te(), s = ct(
    (i) => {
      i.dataTransfer.setData(
        Ws,
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
      children: /* @__PURE__ */ h(gf, { item: t })
    }
  );
}
function bf({ nodes: t }) {
  const e = Kt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), r = pr.get(o);
    if (r) return r;
    const n = ai(t, 56);
    return pr.set(o, n), n;
  }, [t]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Bl({
  item: t,
  onClick: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = te(), [s, i] = rt(!1), l = ct(
    (d) => {
      d.dataTransfer.setData(
        Fs,
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
            children: /* @__PURE__ */ h(bf, { nodes: t.nodes })
          }
        ),
        s && /* @__PURE__ */ h(
          "button",
          {
            title: n.librariesRemoveFromPersonal,
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
function xf({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  onBrowseDirectory: n
}) {
  const s = re(), { labels: i } = te(), l = ft(null), d = ft(null), [c, a] = rt([]), [f, y] = rt([]), [p, u] = rt(""), [m, g] = rt(/* @__PURE__ */ new Set());
  ii(e && !!r, r, l, [
    c.length,
    f.length,
    p,
    m.size
  ]);
  const x = ct(() => {
    a(xl()), y(Rl());
  }, []);
  Mt(() => {
    e && x();
  }, [e, x]), Mt(() => {
    if (!e) return;
    const P = (V) => {
      l.current && !l.current.contains(V.target) && o();
    };
    return document.addEventListener("pointerdown", P), () => document.removeEventListener("pointerdown", P);
  }, [e, o]);
  const b = ct(
    (P) => {
      var et;
      const V = (et = P.target.files) == null ? void 0 : et[0];
      if (!V) return;
      const X = new FileReader();
      X.onload = () => {
        try {
          const it = JSON.parse(X.result);
          if (it.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const pt = V.name.replace(/\.excalidrawlib$/, "");
          si(it, { name: pt }), x();
        } catch (it) {
          console.error("Failed to parse library file:", it);
        }
      }, X.readAsText(V), P.target.value = "";
    },
    [x]
  ), w = ct(
    (P) => {
      tf(P), pr.clear(), x();
    },
    [x]
  ), I = ct(
    (P) => {
      Dl(t, P);
    },
    [t]
  ), k = ct(
    (P) => {
      Wl(t, P);
    },
    [t]
  ), M = ct(
    (P) => {
      mf(P), pr.clear(), x();
    },
    [x]
  ), C = ct((P) => {
    g((V) => {
      const X = new Set(V);
      return X.has(P) ? X.delete(P) : X.add(P), X;
    });
  }, []), A = Kt(() => {
    if (!p.trim()) return null;
    const P = p.toLowerCase(), V = ef(p), X = f.filter(
      (et) => et.name.toLowerCase().includes(P)
    );
    return { excalidraw: V, personal: X };
  }, [p, f]);
  return !e || !r ? null : Qe(
    /* @__PURE__ */ S(
      "div",
      {
        ref: l,
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
          maxHeight: "min(480px, calc(100dvh - 16px))",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (P) => P.stopPropagation(),
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
                value: p,
                onChange: (P) => u(P.target.value),
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
              children: A !== null ? A.excalidraw.length === 0 && A.personal.length === 0 ? /* @__PURE__ */ h(
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
                    A.personal.map((P) => /* @__PURE__ */ h(
                      Bl,
                      {
                        item: P,
                        onClick: () => k(P),
                        onRemove: () => M(P.id),
                        theme: s
                      },
                      P.id
                    )),
                    A.excalidraw.map(({ library: P, item: V }) => /* @__PURE__ */ h(
                      Fl,
                      {
                        item: V,
                        libId: P.id,
                        onClick: () => I(V),
                        theme: s
                      },
                      V.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ S(Ct, { children: [
                f.length > 0 && /* @__PURE__ */ h(
                  vf,
                  {
                    items: f,
                    onPlace: k,
                    onRemove: M,
                    theme: s
                  }
                ),
                c.length === 0 && f.length === 0 ? /* @__PURE__ */ S(
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
                ) : c.map((P) => {
                  const V = m.has(P.id);
                  return /* @__PURE__ */ h(
                    wf,
                    {
                      lib: P,
                      expanded: V,
                      onToggle: () => C(P.id),
                      onPlace: I,
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
                /* @__PURE__ */ h(
                  "button",
                  {
                    onClick: () => {
                      var P;
                      return (P = d.current) == null ? void 0 : P.click();
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
function wf({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: r,
  onUninstall: n,
  theme: s
}) {
  const { labels: i } = te(), [l, d] = rt(null);
  return Mt(() => {
    e && l === null && d(ni(t.id));
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
          Fl,
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
function vf({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = te(), [s, i] = rt(!0);
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
        children: t.map((l) => /* @__PURE__ */ h(
          Bl,
          {
            item: l,
            onClick: () => e(l),
            onRemove: () => o(l.id),
            theme: r
          },
          l.id
        ))
      }
    )
  ] });
}
async function kf(t, e, o = 1, r = 20, n) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${r}`;
  return (await fetch(s, { signal: n, credentials: "include" })).json();
}
async function aa(t, e = 1, o = 20, r) {
  const n = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(n, { signal: r, credentials: "include" })).json();
}
const Bs = "application/x-spatialboard-gif-item";
function Nl(t, e, o, r) {
  const n = e.file.hd.gif, s = 400, i = 300;
  let l = n.width, d = n.height;
  const c = Math.min(1, s / l, i / d);
  l = Math.round(l * c), d = Math.round(d * c);
  const a = o ?? window.innerWidth / 2, f = r ?? window.innerHeight / 2, y = t.screenToCanvas(a, f), p = {
    id: Pt(10),
    type: "image",
    x: y.x - l / 2,
    y: y.y - d / 2,
    w: l,
    h: d,
    z: t.nextZ(),
    data: { src: n.url }
  };
  t.addNode(p), t.select(p.id);
}
function Sf({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  baseUrl: n
}) {
  const s = re(), { labels: i } = te(), l = ft(null), d = ft(null), [c, a] = rt(""), [f, y] = rt([]), [p, u] = rt(!1), [m, g] = rt(1), [x, b] = rt(!1), w = ft();
  ii(e && !!r, r, l, [
    f.length,
    p
  ]), Mt(() => {
    if (!e) return;
    const A = (P) => {
      l.current && !l.current.contains(P.target) && o();
    };
    return document.addEventListener("pointerdown", A), () => document.removeEventListener("pointerdown", A);
  }, [e, o]), Mt(() => {
    if (!e || c.trim()) return;
    const A = new AbortController();
    return u(!0), aa(n, 1, 30, A.signal).then((P) => {
      y(P.data.data.filter((V) => V.type !== "ad")), g(1), b(P.data.has_next);
    }).catch(() => {
    }).finally(() => u(!1)), () => A.abort();
  }, [e, n, c]);
  const I = ct(
    (A, P, V) => {
      if (!A.trim()) return;
      const X = new AbortController();
      return u(!0), kf(n, A, P, 30, X.signal).then((et) => {
        const it = et.data.data.filter((pt) => pt.type !== "ad");
        y((pt) => V ? [...pt, ...it] : it), g(P), b(et.data.has_next);
      }).catch(() => {
      }).finally(() => u(!1)), X;
    },
    [n]
  ), k = ct(
    (A) => {
      if (a(A), w.current && clearTimeout(w.current), !A.trim()) {
        y([]), g(1), b(!1);
        return;
      }
      w.current = setTimeout(() => {
        I(A, 1, !1);
      }, 350);
    },
    [I]
  ), M = ct(() => {
    const A = d.current;
    !A || p || !x || A.scrollTop + A.clientHeight >= A.scrollHeight - 100 && (c.trim() ? I(c, m + 1, !0) : (u(!0), aa(n, m + 1, 30).then((P) => {
      const V = P.data.data.filter((X) => X.type !== "ad");
      y((X) => [...X, ...V]), g(m + 1), b(P.data.has_next);
    }).catch(() => {
    }).finally(() => u(!1))));
  }, [p, x, c, m, I, n]), C = ct(
    (A) => {
      Nl(t, A);
    },
    [t]
  );
  return !e || !r ? null : Qe(
    /* @__PURE__ */ S(
      "div",
      {
        ref: l,
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
          maxHeight: "min(420px, calc(100dvh - 16px))",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (A) => A.stopPropagation(),
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
                onChange: (A) => k(A.target.value),
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
              onScroll: M,
              style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "4px 12px",
                minHeight: 200
              },
              children: [
                f.length === 0 && !p ? /* @__PURE__ */ h(
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
                    children: f.map((A) => /* @__PURE__ */ h(
                      Mf,
                      {
                        item: A,
                        onClick: () => C(A),
                        engine: t,
                        theme: s
                      },
                      A.id
                    ))
                  }
                ),
                p && /* @__PURE__ */ h(
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
function Mf({
  item: t,
  onClick: e,
  engine: o,
  theme: r
}) {
  const n = t.file.sm.webp, s = n.width / n.height, i = ft(0), l = ct(
    (a) => {
      a.dataTransfer.setData(Bs, JSON.stringify(t)), a.dataTransfer.effectAllowed = "copy";
    },
    [t]
  ), d = ct((a) => {
    a.dataTransfer.dropEffect !== "none" && (i.current = performance.now() + 450);
  }, []), c = ct(
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
function Cf({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [r, n] = rt(""), s = ft(null), i = ft(null);
  Mt(() => {
    var f;
    (f = s.current) == null || f.focus();
  }, []);
  const l = Kt(() => ai(t, 56), [t]), d = ct(() => {
    e(r.trim() || "Untitled");
  }, [r, e]), c = ct(
    (f) => {
      f.key === "Enter" ? (f.preventDefault(), d()) : f.key === "Escape" && (f.preventDefault(), o());
    },
    [d, o]
  ), a = ct(
    (f) => {
      i.current && !i.current.contains(f.target) && o();
    },
    [o]
  );
  return Qe(
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
            onPointerDown: (f) => f.stopPropagation(),
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
                  value: r,
                  onChange: (f) => n(f.target.value),
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
const gr = mr(
  null
);
function Hn(t, e) {
  const o = ft(null), r = ft(0), n = ct(() => (o.current || (o.current = `${e}:${++r.current}`), o.current), [e]);
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
  }, [t]), n;
}
function Ns(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function If(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Ol(t, e, o, r) {
  return new Promise((n) => {
    const s = If(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, a = i.naturalHeight || 200;
      if (c <= 1 || a <= 1) {
        const f = t.match(/viewBox=["']([^"']+)["']/i);
        if (f) {
          const y = f[1].trim().split(/[\s,]+/).map(Number);
          y.length === 4 && y[2] > 0 && y[3] > 0 && (c = y[2], a = y[3]);
        }
      }
      if (c > 400 || a > 400) {
        const f = Math.min(400 / c, 400 / a);
        c = Math.round(c * f), a = Math.round(a * f);
      }
      n({
        id: Pt(10),
        type: "image",
        x: e,
        y: o,
        w: c,
        h: a,
        z: r,
        data: { src: s }
      });
    }, i.onerror = () => n(null), i.src = s;
  });
}
async function Tf(t, e, o, r) {
  const { x: n, y: s } = t.screenToCanvas(o, r), i = await Ol(e, n, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
function zf() {
  if (typeof navigator > "u") return !1;
  const t = navigator.userAgent, e = /iPhone|iPad|iPod/i.test(t);
  return /Chrome|Chromium|EdgA?|OPR|Brave/i.test(t) && !e || /Firefox/i.test(t) ? !1 : e ? !0 : /Safari/i.test(t) && !/Chrome|Chromium|Edg/i.test(t);
}
function Af(t) {
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
function Ef(t) {
  return !Number.isFinite(t) || t < 0 ? "" : t < 0.05 ? "<0.05 ms" : t < 10 ? `${t < 1 ? t.toFixed(2) : t.toFixed(1)} ms` : `${Math.round(t)} ms`;
}
function Pf(t, e, o) {
  if (!t || !o || !e.id) return null;
  const r = t.get(e.type);
  if (!(r != null && r.ports)) return null;
  for (const n of r.ports) {
    if (n.direction !== "output" || n.id !== "error" && n.id !== "err") continue;
    const s = o(e.id, n.id), i = s != null && s !== void 0 ? String(s).trim() : "";
    if (i) return i.length > 200 ? `${i.slice(0, 197)}…` : i;
  }
  return null;
}
function Hf(t, e, o, r) {
  if (t.length === 0) return null;
  const n = 13 / r, s = 7 / r, i = 5 / r, l = 6 / r, d = Math.max(...t.map((f) => f.text.length), 1), c = Math.min(d * l + s * 2, 280 / r), a = t.length * n + i * 2;
  return {
    w: c,
    h: a,
    x0: e - c / 2,
    y0: o - a / 2
  };
}
const la = {
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
}, Lf = Le(function({
  node: e,
  zoom: o,
  showHandles: r = !0,
  measuredHeights: n,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const l = e.h === "auto" ? (n == null ? void 0 : n[e.id]) ?? 100 : e.h, d = e.rotation || 0, c = e.x + e.w / 2, a = e.y + l / 2, f = 8 / o, y = f / 2, p = 25 / o, u = !!e.locked, m = [
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
        stroke: u ? "#f59e0b" : "#3b82f6",
        strokeWidth: 1.5 / o,
        strokeDasharray: `${4 / o} ${3 / o}`
      }
    ),
    u && (() => {
      const g = 16 / o, x = e.x + e.w - g - 4 / o, b = e.y - g - 4 / o;
      return /* @__PURE__ */ S("g", { transform: `translate(${x}, ${b})`, children: [
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
        /* @__PURE__ */ S("g", { transform: `scale(${g / 24})`, children: [
          /* @__PURE__ */ h("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ h("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    r && !u && m.map(({ pos: g, cx: x, cy: b }) => /* @__PURE__ */ h(
      "rect",
      {
        x: x - y,
        y: b - y,
        width: f,
        height: f,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: In(g, d),
          pointerEvents: "auto"
        },
        onPointerDown: (w) => {
          w.stopPropagation(), s == null || s(e.id, g, w);
        }
      },
      g
    )),
    r && !u && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h(
        "line",
        {
          x1: e.x + e.w / 2,
          y1: e.y,
          x2: e.x + e.w / 2,
          y2: e.y - p,
          stroke: "#3b82f6",
          strokeWidth: 1.5 / o
        }
      ),
      /* @__PURE__ */ h(
        "rect",
        {
          x: e.x + e.w / 2 - y,
          y: e.y - p - y,
          width: f,
          height: f,
          rx: 1.5 / o,
          transform: `rotate(45, ${e.x + e.w / 2}, ${e.y - p})`,
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
}), Rf = Le(function({
  edge: e,
  fromNode: o,
  toNode: r,
  viewport: n,
  selection: s,
  measuredHeights: i,
  registry: l,
  onEdgeEndpointDown: d,
  onKinkHandleDown: c,
  edgeReconnect: a,
  eraserMarkedIds: f,
  cycleNodeIds: y,
  dataFlowEdgeOverlay: p = "off",
  getLastComputeMs: u,
  getDataFlowPortValue: m,
  interactionMode: g
}) {
  const x = e.data.edgeType || "bezier";
  let b, w;
  if (l && e.data.sourcePort) {
    const dt = l.get(o.type);
    dt != null && dt.ports && (b = Ae(o, dt.ports, e.data.sourcePort, n.zoom, i, dt.portAnchor ?? "bbox") ?? void 0);
  }
  if (l && e.data.targetPort) {
    const dt = l.get(r.type);
    dt != null && dt.ports && (w = Ae(r, dt.ports, e.data.targetPort, n.zoom, i, dt.portAnchor ?? "bbox") ?? void 0);
  }
  const I = Ee(
    o,
    r,
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
  ), { path: k, x1: M, y1: C, x2: A, y2: P, labelX: V, labelY: X, arrowAngle: et, tailAngle: it, kinkHandle: pt } = I, wt = s.has(e.id), xt = e.data.strokeWidth, D = e.data.style === "dashed" ? `${8 * xt},${4 * xt}` : e.data.style === "dotted" ? `${2 * xt},${3 * xt}` : void 0, W = Math.max(8, xt * 3), G = e.data.arrowHeadSize ?? W, K = e.data.arrowTailSize ?? W, J = e.data.animated, N = f == null ? void 0 : f.has(e.id), _ = (a == null ? void 0 : a.edgeId) === e.id, st = !!(y && y.size > 0 && e.data.sourcePort && e.data.targetPort && y.has(e.data.fromId) && y.has(e.data.toId)), at = st ? "#ef4444" : e.data.color, q = e.data.roughness ?? 0, ot = Kt(() => q <= 0 ? null : {
    stroke: at,
    roughness: q,
    strokeWidth: xt,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [at, q, xt, e.data.style, e.id]);
  let ht = null, tt = null, ut = null;
  ot && (ht = is(k, ot), e.data.arrowHead === "arrow" && (tt = is(bo(A, P, et, G), { ...ot, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (ut = is(bo(M, C, it, K), { ...ot, strokeLineDash: void 0 })));
  const gt = Kt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), yt = Kt(() => {
    if (!J) return;
    const dt = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", Ft = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", Yt = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${dt} ${Ft} ${Yt} infinite` };
  }, [J, e.data.animatedDirection]), kt = Kt(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), At = Kt(
    () => N ? { filter: "saturate(0)" } : void 0,
    [N]
  ), Nt = Kt(() => {
    var Ut;
    const dt = p ?? "off", Ft = (Ut = e.data.label) == null ? void 0 : Ut.trim(), Yt = [];
    if (Ft && Yt.push({ text: Ft, primary: !0 }), dt !== "off" && Is(r) && e.data.sourcePort && e.data.targetPort && Yt.push({
      text: `${e.data.sourcePort} → ${e.data.targetPort}`,
      primary: !Ft
    }), dt === "ports+compute" && Is(r) && u && e.data.toId) {
      const $t = u(e.data.toId);
      $t != null && Number.isFinite($t) && Yt.push({ text: `compute ${Ef($t)}`, primary: !1 });
    }
    return Yt;
  }, [
    p,
    e.data.label,
    e.data.sourcePort,
    e.data.targetPort,
    e.data.toId,
    u,
    r
  ]), Lt = Kt(
    () => e.data.sourcePort && e.data.targetPort ? Pf(l, r, m) : null,
    [
      l,
      r,
      e.data.sourcePort,
      e.data.targetPort,
      m
    ]
  );
  return /* @__PURE__ */ S("g", { opacity: _ ? 0.15 : N ? 0.25 : void 0, style: At, children: [
    /* @__PURE__ */ h(
      "path",
      {
        d: k,
        stroke: "transparent",
        strokeWidth: Math.max(xt + 16 / n.zoom, 20 / n.zoom),
        strokeLinecap: "round",
        fill: "none",
        style: {
          pointerEvents: "stroke",
          cursor: g === "select" || g == null ? "move" : "inherit"
        }
      }
    ),
    st && /* @__PURE__ */ h(
      "path",
      {
        d: k,
        stroke: "#ef4444",
        strokeWidth: xt + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: gt
      }
    ),
    wt && /* @__PURE__ */ h(
      "path",
      {
        d: k,
        stroke: "#3b82f6",
        strokeWidth: xt + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    ht ? ht.map((dt, Ft) => /* @__PURE__ */ h(
      "path",
      {
        d: dt.d,
        stroke: dt.stroke,
        strokeWidth: dt.strokeWidth,
        strokeDasharray: dt.strokeDasharray,
        strokeLinecap: "round",
        fill: dt.fill ?? "none",
        style: J ? yt : void 0
      },
      Ft
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: k,
        stroke: at,
        strokeWidth: xt,
        strokeDasharray: J ? "12,8" : st ? `${6 * xt},${4 * xt}` : D,
        strokeLinecap: "round",
        fill: "none",
        style: st ? kt : yt
      }
    ),
    e.data.arrowHead === "arrow" && (tt ? tt.map((dt, Ft) => /* @__PURE__ */ h(
      "path",
      {
        d: dt.d,
        stroke: dt.stroke,
        strokeWidth: dt.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: dt.fill ?? "none"
      },
      `ah${Ft}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: bo(A, P, et, G),
        fill: "none",
        stroke: at,
        strokeWidth: xt,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: gn(A, P, et, G),
        fill: at,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: A,
        cy: P,
        r: G * 0.25,
        fill: at
      }
    ),
    e.data.arrowTail === "arrow" && (ut ? ut.map((dt, Ft) => /* @__PURE__ */ h(
      "path",
      {
        d: dt.d,
        stroke: dt.stroke,
        strokeWidth: dt.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: dt.fill ?? "none"
      },
      `at${Ft}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: bo(M, C, it, K),
        fill: "none",
        stroke: at,
        strokeWidth: xt,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: gn(M, C, it, K),
        fill: at,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: M,
        cy: C,
        r: K * 0.25,
        fill: at
      }
    ),
    (() => {
      const dt = n.zoom, Ft = 13 / dt, Yt = 5 / dt, Ut = 11 / dt, $t = 10 / dt, Qt = Hf(Nt, V, X, dt), mt = 9 / dt, ye = !!Lt, he = Qt ? Qt.x0 + Qt.w + mt + 4 / dt : V + mt + 4 / dt, ie = X;
      return /* @__PURE__ */ S(Ct, { children: [
        Qt && /* @__PURE__ */ S(Ct, { children: [
          /* @__PURE__ */ h(
            "rect",
            {
              x: Qt.x0,
              y: Qt.y0,
              width: Qt.w,
              height: Qt.h,
              fill: "white",
              rx: 4 / dt,
              opacity: 0.92
            }
          ),
          Nt.map((ge, ke) => /* @__PURE__ */ h(
            "text",
            {
              x: V,
              y: Qt.y0 + Yt + (ke + 0.78) * Ft,
              fill: ge.primary ? at : "#64748b",
              fontSize: ge.primary ? Ut : $t,
              textAnchor: "middle",
              style: { pointerEvents: "none" },
              children: ge.text
            },
            ke
          ))
        ] }),
        ye && /* @__PURE__ */ S("g", { style: { pointerEvents: "auto" }, children: [
          /* @__PURE__ */ h("title", { children: Lt }),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: he,
              cy: ie,
              r: mt,
              fill: "#ea580c",
              stroke: "#fff",
              strokeWidth: 1.25 / dt
            }
          ),
          /* @__PURE__ */ h(
            "text",
            {
              x: he,
              y: ie + 3.5 / dt,
              fill: "#fff",
              fontSize: 11 / dt,
              fontWeight: 800,
              textAnchor: "middle",
              style: { pointerEvents: "none" },
              children: "!"
            }
          )
        ] })
      ] });
    })(),
    wt && !_ && /* @__PURE__ */ S(Ct, { children: [
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
          onPointerDown: (dt) => {
            dt.stopPropagation(), d == null || d(e.id, "source", dt);
          }
        }
      ),
      /* @__PURE__ */ h(
        "circle",
        {
          cx: A,
          cy: P,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (dt) => {
            dt.stopPropagation(), d == null || d(e.id, "target", dt);
          }
        }
      )
    ] }),
    wt && !_ && pt && /* @__PURE__ */ h(
      "circle",
      {
        cx: pt.x,
        cy: pt.y,
        r: 5 / n.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / n.zoom,
        style: {
          cursor: pt.axis === "xy" ? "move" : pt.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (dt) => {
          dt.stopPropagation(), c == null || c(e.id, pt.axis, pt.min, pt.max, dt);
        }
      }
    )
  ] });
});
function Df({
  nodes: t,
  viewport: e,
  selection: o,
  measuredHeights: r,
  activeStroke: n,
  shapePreview: s,
  shapePreviewStyle: i,
  onResizeHandleDown: l,
  onRotateStart: d,
  onConnectionHandleDown: c,
  onEdgeEndpointDown: a,
  onKinkHandleDown: f,
  edgePreview: y,
  edgeReconnect: p,
  eraserMarkedIds: u,
  eraserTrail: m,
  laserTrail: g,
  mode: x,
  freeFormEdges: b,
  hoveredNodeId: w,
  cursorCanvasPos: I,
  registry: k,
  onPortHandleDown: M,
  cycleNodeIds: C,
  dataFlowEdgeOverlay: A = "off",
  getLastComputeMs: P,
  getDataFlowPortValue: V,
  containerTypes: X,
  alignGuides: et,
  suppressNodeOverlayId: it
}) {
  const pt = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, wt = t.filter(
    (W) => W.type !== "edge" && W.type !== "content" && W.type !== "image"
  ), xt = t.filter((W) => W.type === "edge").sort((W, G) => W.z - G.z), D = Kt(() => new Map(t.map((W) => [W.id, W])), [t]);
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
        xt.map((W) => {
          const G = D.get(W.data.fromId), K = D.get(W.data.toId);
          return !G || !K ? null : /* @__PURE__ */ h(
            Rf,
            {
              edge: W,
              fromNode: G,
              toNode: K,
              viewport: e,
              selection: o,
              measuredHeights: r,
              registry: k,
              onEdgeEndpointDown: a,
              onKinkHandleDown: f,
              edgeReconnect: p,
              eraserMarkedIds: u,
              cycleNodeIds: C,
              dataFlowEdgeOverlay: A,
              getLastComputeMs: P,
              getDataFlowPortValue: V,
              interactionMode: x
            },
            W.id
          );
        }),
        x === "edge" && !y && w && I && (() => {
          const W = D.get(w);
          if (!W || W.type === "edge") return null;
          const G = We(W, I.x, I.y, r), K = 4 / e.zoom;
          return /* @__PURE__ */ h("circle", { cx: G.x, cy: G.y, r: K, fill: "#3b82f6", stroke: "white", strokeWidth: 1.5 / e.zoom });
        })(),
        (() => {
          var ot, ht;
          const W = !!y || !!p, G = (y == null ? void 0 : y.cursorX) ?? (p == null ? void 0 : p.cursorX) ?? 0, K = (y == null ? void 0 : y.cursorY) ?? (p == null ? void 0 : p.cursorY) ?? 0, J = (y == null ? void 0 : y.fromNode.id) ?? (p == null ? void 0 : p.anchorNodeId) ?? null;
          let N = null, _ = null, st = null;
          const at = /* @__PURE__ */ new Set();
          if (W) {
            let tt = 1 / 0, ut = !1;
            const gt = 50 / e.zoom;
            for (const yt of t) {
              if (yt.type === "edge" || yt.id === J || (ht = (ot = k == null ? void 0 : k.get(yt.type)) == null ? void 0 : ot.ports) != null && ht.length) continue;
              const kt = yt.h === "auto" ? (r == null ? void 0 : r[yt.id]) ?? 100 : yt.h, At = yt.w * 0.2, Nt = kt * 0.2;
              G >= yt.x - At && G <= yt.x + yt.w + At && K >= yt.y - Nt && K <= yt.y + kt + Nt && at.add(yt.id);
              const Lt = Ms(yt, r), dt = X ? X.has(yt.type) : yt.type === "frame";
              for (const Ft of Lt) {
                const Yt = Math.hypot(Ft.x - G, Ft.y - K);
                Yt >= gt || dt && !ut && N || (!dt && ut || Yt < tt) && (tt = Yt, ut = dt, N = yt.id, _ = Ft.side);
              }
            }
            if (b && N) {
              const yt = D.get(N);
              if (yt) {
                const kt = We(yt, G, K, r);
                st = { x: kt.x, y: kt.y };
              }
            }
          }
          const q = [];
          return b && W && st && q.push(
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
          ), t.filter((tt) => {
            var ut, gt;
            return tt.type === "edge" || it && tt.id === it || (gt = (ut = k == null ? void 0 : k.get(tt.type)) == null ? void 0 : ut.ports) != null && gt.length || b && tt.type === "image" ? !1 : o.size <= 1 && o.has(tt.id) || !b && W && (tt.id === J || at.has(tt.id));
          }).forEach((tt) => {
            const ut = Ms(tt, r), gt = 4 / e.zoom, yt = 26 / e.zoom, kt = tt.rotation || 0, At = tt.h === "auto" ? (r == null ? void 0 : r[tt.id]) ?? 100 : tt.h, Nt = tt.x + tt.w / 2, Lt = tt.y + At / 2, dt = y && y.fromNode.id === tt.id || p && p.anchorNodeId === tt.id, Ft = o.has(tt.id) && !W;
            b ? Ft && q.push(
              /* @__PURE__ */ h("g", { transform: kt ? `rotate(${kt}, ${Nt}, ${Lt})` : void 0, children: ut.map(({ side: Yt }) => {
                const Ut = {
                  top: [tt.x + tt.w / 2, tt.y],
                  bottom: [tt.x + tt.w / 2, tt.y + At],
                  left: [tt.x, tt.y + At / 2],
                  right: [tt.x + tt.w, tt.y + At / 2]
                }, [$t, Qt] = Ut[Yt];
                return /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: $t,
                    cy: Qt,
                    r: gt,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.8,
                    style: { cursor: "crosshair", pointerEvents: "auto" },
                    onPointerDown: (mt) => {
                      mt.stopPropagation(), c == null || c(tt.id, Yt, mt);
                    }
                  },
                  `ch-${tt.id}-${Yt}`
                );
              }) }, `conn-${tt.id}`)
            ) : q.push(
              /* @__PURE__ */ h("g", { transform: kt ? `rotate(${kt}, ${Nt}, ${Lt})` : void 0, children: ut.map(({ side: Yt }) => {
                const Ut = {
                  top: [tt.x + tt.w / 2, tt.y],
                  bottom: [tt.x + tt.w / 2, tt.y + At],
                  left: [tt.x, tt.y + At / 2],
                  right: [tt.x + tt.w, tt.y + At / 2]
                }, [$t, Qt] = Ut[Yt], mt = Yt === "top" && o.has(tt.id) ? 42 / e.zoom : yt;
                let ye = $t, he = Qt;
                switch (Yt) {
                  case "top":
                    he = Qt - mt;
                    break;
                  case "bottom":
                    he = Qt + mt;
                    break;
                  case "left":
                    ye = $t - mt;
                    break;
                  case "right":
                    ye = $t + mt;
                    break;
                }
                const ie = W && N === tt.id && _ === Yt;
                return /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: ye,
                    cy: he,
                    r: ie ? 5 / e.zoom : gt,
                    fill: dt || ie ? "#3b82f6" : "white",
                    stroke: ie ? "white" : W && !dt ? "#3b82f6" : "#94a3b8",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: ie || W && !dt ? 1 : 0.8,
                    style: {
                      cursor: Ft ? "crosshair" : "default",
                      pointerEvents: Ft ? "auto" : "none"
                    },
                    onPointerDown: Ft ? (ge) => {
                      ge.stopPropagation(), c == null || c(tt.id, Yt, ge);
                    } : void 0
                  },
                  `ch-${tt.id}-${Yt}`
                );
              }) }, `conn-${tt.id}`)
            );
          }), q;
        })(),
        k && (() => {
          var at;
          const W = !!y || !!p, G = (y == null ? void 0 : y.cursorX) ?? (p == null ? void 0 : p.cursorX) ?? 0, K = (y == null ? void 0 : y.cursorY) ?? (p == null ? void 0 : p.cursorY) ?? 0, J = (y == null ? void 0 : y.fromNode.id) ?? null, N = (y == null ? void 0 : y.sourceDirection) === "output" ? "input" : (y == null ? void 0 : y.sourceDirection) === "input" ? "output" : null;
          let _ = null, st = null;
          if (W && N) {
            const q = zd / e.zoom;
            let ot = 1 / 0;
            for (const ht of t) {
              if (ht.type === "edge" || ht.id === J) continue;
              const tt = k.get(ht.type);
              if (!((at = tt == null ? void 0 : tt.ports) != null && at.length)) continue;
              const ut = tt.ports.filter((gt) => gt.direction === N);
              for (const gt of ut) {
                const yt = Ae(
                  ht,
                  tt.ports,
                  gt.id,
                  e.zoom,
                  r,
                  tt.portAnchor ?? "bbox"
                );
                if (!yt) continue;
                const kt = Math.hypot(yt.x - G, yt.y - K);
                kt <= q && kt < ot && (ot = kt, _ = ht.id, st = gt.id);
              }
            }
          }
          return t.filter((q) => {
            var ht;
            if (q.type === "edge" || it && q.id === it) return !1;
            const ot = k.get(q.type);
            return !!((ht = ot == null ? void 0 : ot.ports) != null && ht.length);
          }).map((q) => {
            const ot = k.get(q.type), ht = ot.ports, tt = q.h === "auto" ? (r == null ? void 0 : r[q.id]) ?? 100 : q.h, ut = q.rotation || 0, gt = q.x + q.w / 2, yt = q.y + tt / 2, kt = 6 / e.zoom, At = ot.portAnchor ?? "bbox", Nt = ht.filter((Ut) => Ut.direction === "input"), Lt = ht.filter((Ut) => Ut.direction === "output"), dt = !W, Ft = (Ut, $t, Qt, mt) => {
              const ye = Ka(
                q,
                ht,
                Ut.id,
                e.zoom,
                r,
                At
              );
              if (!ye) return null;
              const { px: he, py: ie } = ye, ge = Ed(
                q,
                mt,
                { x: he, y: ie },
                r,
                At
              ), ke = la[Ut.dataType] || la.any, Be = _ === q.id && st === Ut.id, br = Be ? 8 / e.zoom : kt, Eo = 2.5 / e.zoom, $e = mt === "input" ? he - kt - Eo : he + kt + Eo;
              return /* @__PURE__ */ S("g", { children: [
                /* @__PURE__ */ h(
                  "line",
                  {
                    x1: he,
                    y1: ie,
                    x2: ge.x,
                    y2: ge.y,
                    stroke: ke,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                Be && /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: he,
                    cy: ie,
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
                    cx: he,
                    cy: ie,
                    r: br,
                    fill: Be ? "white" : ke,
                    stroke: Be ? ke : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: dt ? "crosshair" : "default",
                      pointerEvents: dt ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: dt ? (T) => {
                      T.stopPropagation(), M == null || M(q.id, Ut.id, mt, T);
                    } : void 0
                  }
                ),
                (() => {
                  const T = Ut.label || Ut.id, lt = 9 / e.zoom, le = 5 / e.zoom, Se = 2.5 / e.zoom, de = T.length * lt * 0.62 + le * 2, Ve = lt + Se * 2, qt = mt === "input" ? $e - de : $e, Ze = ie - Ve / 2, Po = Ve / 2, xr = Be ? ke : "#1a1a2e", Ho = Be ? ke : "#2a2a40", Lo = Be ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ h(
                      "rect",
                      {
                        x: qt,
                        y: Ze,
                        width: de,
                        height: Ve,
                        rx: Po,
                        ry: Po,
                        fill: xr,
                        fillOpacity: Be ? 0.9 : 0.85,
                        stroke: Ho,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ h(
                      "text",
                      {
                        x: qt + de / 2,
                        y: ie + lt * 0.35,
                        fill: Lo,
                        fontSize: lt,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: T
                      }
                    )
                  ] });
                })()
              ] }, `port-${q.id}-${Ut.id}`);
            }, Yt = C == null ? void 0 : C.has(q.id);
            return /* @__PURE__ */ S("g", { transform: ut ? `rotate(${ut}, ${gt}, ${yt})` : void 0, children: [
              Nt.map((Ut, $t) => Ft(Ut, $t, Nt, "input")),
              Lt.map((Ut, $t) => Ft(Ut, $t, Lt, "output")),
              Yt && (() => {
                const Ut = 10 / e.zoom, $t = q.x + q.w + Ut * 0.3, Qt = q.y - Ut * 0.3;
                return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: $t,
                      cy: Qt,
                      r: Ut,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ h(
                    "text",
                    {
                      x: $t,
                      y: Qt + 4 / e.zoom,
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
        y && (() => {
          var Ut;
          const W = y.cursorX, G = y.cursorY, K = y.edgeColor || "#3b82f6", J = y.edgeStrokeWidth || 2, N = y.edgeStyle || "solid", _ = N === "dashed" ? `${8 * J},${4 * J}` : N === "dotted" ? `${2 * J},${3 * J}` : void 0, st = Math.max(8, J * 3), at = 4 / e.zoom, q = k == null ? void 0 : k.get(y.fromNode.type), ot = y.sourcePort && (q != null && q.ports) ? Ae(
            y.fromNode,
            q.ports,
            y.sourcePort,
            e.zoom,
            r,
            q.portAnchor ?? "bbox"
          ) ?? void 0 : void 0, ht = y.sourcePort && (q != null && q.ports) ? q.ports.find(($t) => $t.id === y.sourcePort) : void 0, tt = y.sourceDirection === "output" ? "input" : y.sourceDirection === "input" ? "output" : null;
          let ut = null, gt, yt = null;
          if (k && y.sourcePort && tt && ht) {
            const $t = qs / e.zoom;
            let Qt = 1 / 0;
            for (const mt of t) {
              if (mt.type === "edge" || mt.id === y.fromNode.id) continue;
              const ye = k.get(mt.type);
              if (!((Ut = ye == null ? void 0 : ye.ports) != null && Ut.length)) continue;
              const he = ye.ports.filter((ie) => ie.direction === tt);
              for (const ie of he) {
                if (ht.dataType !== "any" && ie.dataType !== "any" && ht.dataType !== ie.dataType)
                  continue;
                const ge = Ae(
                  mt,
                  ye.ports,
                  ie.id,
                  e.zoom,
                  r,
                  ye.portAnchor ?? "bbox"
                );
                if (!ge) continue;
                const ke = Math.hypot(ge.x - W, ge.y - G);
                ke < $t && ke < Qt && (Qt = ke, ut = mt, yt = ie.id);
              }
            }
          }
          if (!yt) {
            const $t = 50 / e.zoom;
            for (const Qt of t) {
              if (Qt.type === "edge" || Qt.id === y.fromNode.id) continue;
              const mt = Qt.h === "auto" ? (r == null ? void 0 : r[Qt.id]) ?? 100 : Qt.h, ye = Qt.w * 0.2, he = mt * 0.2;
              if (W >= Qt.x - ye && W <= Qt.x + Qt.w + ye && G >= Qt.y - he && G <= Qt.y + mt + he) {
                const ie = We(Qt, W, G, r);
                if (Math.hypot(ie.x - W, ie.y - G) < $t) {
                  ut = Qt, gt = ie.t;
                  break;
                }
              }
            }
          }
          const kt = ut ? k == null ? void 0 : k.get(ut.type) : void 0, At = ut && yt && (kt != null && kt.ports) ? Ae(
            ut,
            kt.ports,
            yt,
            e.zoom,
            r,
            kt.portAnchor ?? "bbox"
          ) ?? void 0 : void 0, Nt = ot ? void 0 : y.sourceT, Lt = At ? void 0 : gt;
          let dt;
          if (ut)
            dt = Ee(
              y.fromNode,
              ut,
              y.edgeType || "bezier",
              r,
              y.sourceHandle,
              void 0,
              void 0,
              void 0,
              ot,
              At,
              Nt,
              Lt,
              y.attachmentGap
            );
          else {
            const $t = {
              id: "__preview__",
              type: "shape",
              x: W,
              y: G,
              w: 0,
              h: 0,
              data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
            };
            dt = Ee(
              y.fromNode,
              $t,
              y.edgeType || "bezier",
              r,
              y.sourceHandle,
              void 0,
              void 0,
              void 0,
              ot,
              void 0,
              Nt,
              void 0,
              y.attachmentGap
            );
          }
          const Ft = !ot, Yt = !!(ut && !At);
          return /* @__PURE__ */ S("g", { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: dt.path,
                stroke: K,
                strokeWidth: J,
                strokeDasharray: _,
                strokeLinecap: "round",
                fill: "none"
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: bo(dt.x2, dt.y2, dt.arrowAngle, st),
                fill: "none",
                stroke: K,
                strokeWidth: J,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            Ft && /* @__PURE__ */ h(
              "circle",
              {
                cx: dt.x1,
                cy: dt.y1,
                r: at,
                fill: K,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            ),
            Yt && /* @__PURE__ */ h(
              "circle",
              {
                cx: dt.x2,
                cy: dt.y2,
                r: at,
                fill: K,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            )
          ] });
        })(),
        p && (() => {
          const W = D.get(p.anchorNodeId);
          if (!W) return null;
          let G, K;
          if (p.anchorHandle) {
            const J = W.h === "auto" ? (r == null ? void 0 : r[W.id]) ?? 100 : W.h, N = {
              top: [W.x + W.w / 2, W.y],
              bottom: [W.x + W.w / 2, W.y + J],
              left: [W.x, W.y + J / 2],
              right: [W.x + W.w, W.y + J / 2]
            }, _ = p.anchorHandle, st = _ === "top" ? 42 / e.zoom : 26 / e.zoom, [at, q] = N[_];
            let ot = at, ht = q;
            switch (_) {
              case "top":
                ht = q - st;
                break;
              case "bottom":
                ht = q + st;
                break;
              case "left":
                ot = at - st;
                break;
              case "right":
                ot = at + st;
                break;
            }
            if (W.rotation) {
              const tt = W.x + W.w / 2, ut = W.y + J / 2, gt = W.rotation * Math.PI / 180, yt = Math.cos(gt), kt = Math.sin(gt), At = ot - tt, Nt = ht - ut;
              G = tt + At * yt - Nt * kt, K = ut + At * kt + Nt * yt;
            } else
              G = ot, K = ht;
          } else {
            const J = Xd(W, p.cursorX, p.cursorY, r);
            G = J.x, K = J.y;
          }
          return /* @__PURE__ */ h(
            "line",
            {
              x1: G,
              y1: K,
              x2: p.cursorX,
              y2: p.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && x !== "edge" && !y && !p && wt.filter((W) => o.has(W.id)).map((W) => /* @__PURE__ */ h(
          Lf,
          {
            node: W,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: r,
            onHandlePointerDown: l,
            onRotateStart: d
          },
          `sel-${W.id}`
        )),
        n && n.points.length > 1 && (() => {
          const W = n.strokeStyle === "dashed" || n.strokeStyle === "dotted", G = n.opacity ?? 1;
          if (W) {
            const K = n.points, J = ["M", K[0][0], K[0][1]];
            for (let st = 1; st < K.length; st++) {
              const [at, q] = K[st], [ot, ht] = K[st - 1];
              J.push("Q", ot, ht, (ot + at) / 2, (ht + q) / 2);
            }
            const N = K[K.length - 1];
            J.push("L", N[0], N[1]);
            const _ = so(n.strokeStyle);
            return /* @__PURE__ */ h(
              "path",
              {
                d: J.join(" "),
                fill: "none",
                stroke: n.color,
                strokeWidth: n.width,
                strokeDasharray: _ == null ? void 0 : _.map((st) => st * Math.max(n.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: G
              }
            );
          }
          return /* @__PURE__ */ h(
            "path",
            {
              d: $s(n.points, {
                size: n.width
              }),
              fill: n.color,
              opacity: G
            }
          );
        })(),
        s && i && (() => {
          const W = Math.min(s.startX, s.endX), G = Math.min(s.startY, s.endY), K = Math.abs(s.endX - s.startX), J = Math.abs(s.endY - s.startY);
          if (K < 2 && J < 2) return null;
          const N = i, _ = N.shapeType || "rect", st = N.opacity ?? 1, at = so(N.strokeStyle), q = N.edgeStyle === "round", ot = s.startX, ht = s.startY, tt = s.endX, ut = s.endY, gt = {
            stroke: N.stroke,
            fill: N.fill,
            fillStyle: N.fillStyle,
            roughness: N.roughness,
            strokeWidth: N.strokeWidth,
            strokeLineDash: at,
            seed: "__preview__"
          };
          let yt = null;
          if (N.roughness > 0)
            switch (_) {
              case "rect":
                yt = Fr(0, 0, K, J, gt, q);
                break;
              case "ellipse":
                yt = zn(K / 2, J / 2, K, J, gt);
                break;
              case "diamond":
                yt = An(0, 0, K, J, gt, q);
                break;
              case "line":
                yt = Vo(0, ut - ht > 0 ? 0 : J, K, ut - ht > 0 ? J : 0, gt);
                break;
              case "arrow":
                yt = En(0, ut - ht > 0 ? 0 : J, K, ut - ht > 0 ? J : 0, gt);
                break;
            }
          if (yt) {
            const Lt = _ === "line" || _ === "arrow" ? Math.min(ot, tt) : W, dt = _ === "line" || _ === "arrow" ? Math.min(ht, ut) : G;
            return /* @__PURE__ */ h("g", { transform: `translate(${Lt}, ${dt})`, opacity: st, children: yt.map((Ft, Yt) => /* @__PURE__ */ h(
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
              Yt
            )) });
          }
          const kt = at == null ? void 0 : at.join(","), At = N.fill || "none";
          if (_ === "ellipse")
            return /* @__PURE__ */ h(
              "ellipse",
              {
                cx: W + K / 2,
                cy: G + J / 2,
                rx: K / 2,
                ry: J / 2,
                stroke: N.stroke,
                strokeWidth: N.strokeWidth,
                fill: At,
                strokeDasharray: kt,
                opacity: st
              }
            );
          if (_ === "diamond")
            return /* @__PURE__ */ h(
              "polygon",
              {
                points: `${W + K / 2},${G} ${W + K},${G + J / 2} ${W + K / 2},${G + J} ${W},${G + J / 2}`,
                stroke: N.stroke,
                strokeWidth: N.strokeWidth,
                fill: At,
                strokeDasharray: kt,
                opacity: st
              }
            );
          if (_ === "line" || _ === "arrow")
            return /* @__PURE__ */ S("g", { opacity: st, children: [
              /* @__PURE__ */ h(
                "line",
                {
                  x1: ot,
                  y1: ht,
                  x2: tt,
                  y2: ut,
                  stroke: N.stroke,
                  strokeWidth: N.strokeWidth,
                  strokeDasharray: kt
                }
              ),
              _ === "arrow" && (() => {
                const Lt = Math.atan2(ut - ht, tt - ot), dt = Math.max(12, N.strokeWidth * 4), Ft = Math.PI / 6, Yt = tt - dt * Math.cos(Lt - Ft), Ut = ut - dt * Math.sin(Lt - Ft), $t = tt - dt * Math.cos(Lt + Ft), Qt = ut - dt * Math.sin(Lt + Ft);
                return /* @__PURE__ */ h(
                  "polyline",
                  {
                    points: `${Yt},${Ut} ${tt},${ut} ${$t},${Qt}`,
                    stroke: N.stroke,
                    strokeWidth: N.strokeWidth,
                    fill: "none"
                  }
                );
              })()
            ] });
          const Nt = q ? Uo(K, J) : 0;
          return /* @__PURE__ */ h(
            "rect",
            {
              x: W,
              y: G,
              width: K,
              height: J,
              rx: Nt || void 0,
              ry: Nt || void 0,
              stroke: N.stroke,
              strokeWidth: N.strokeWidth,
              fill: At,
              strokeDasharray: kt,
              opacity: st
            }
          );
        })(),
        m && m.length > 1 && (() => {
          const W = Date.now(), G = 400, K = 6 / e.zoom, J = [`M${m[0][0]},${m[0][1]}`];
          if (m.length === 2)
            J.push(`L${m[1][0]},${m[1][1]}`);
          else {
            for (let tt = 0; tt < m.length - 1; tt++) {
              const ut = (m[tt][0] + m[tt + 1][0]) / 2, gt = (m[tt][1] + m[tt + 1][1]) / 2;
              J.push(`Q${m[tt][0]},${m[tt][1]},${ut},${gt}`);
            }
            const ht = m[m.length - 1];
            J.push(`L${ht[0]},${ht[1]}`);
          }
          const N = J.join(" "), _ = (W - m[m.length - 1][2]) / G, st = (W - m[0][2]) / G, at = Math.max(0, 0.85 * (1 - _)), q = Math.max(0, 0.85 * (1 - st)), ot = (at + q) / 2;
          return ot <= 0 ? null : /* @__PURE__ */ S(Ct, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: N,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: K * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ot * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: N,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: K,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ot
              }
            )
          ] });
        })(),
        g && g.length > 1 && (() => {
          const W = performance.now(), G = 1560, K = 6 / e.zoom, J = [];
          let N = !1, _ = !1;
          for (let gt = 0; gt < g.length; gt++) {
            const yt = g[gt];
            if (isNaN(yt[0])) {
              N = !1, _ = !1;
              continue;
            }
            if (!N)
              J.push(`M${yt[0]},${yt[1]}`), N = !0, _ = !0;
            else if (_) {
              const kt = gt + 1 < g.length && !isNaN(g[gt + 1][0]) ? g[gt + 1] : null;
              if (kt) {
                const At = (yt[0] + kt[0]) / 2, Nt = (yt[1] + kt[1]) / 2;
                J.push(`Q${yt[0]},${yt[1]},${At},${Nt}`);
              } else
                J.push(`L${yt[0]},${yt[1]}`);
            }
          }
          if (J.length === 0) return null;
          const st = J.join(" "), at = g.filter((gt) => !isNaN(gt[0]));
          if (at.length === 0) return null;
          const q = (W - at[at.length - 1][2]) / G, ot = (W - at[0][2]) / G, ht = Math.max(0, 0.85 * (1 - q)), tt = Math.max(0, 0.85 * (1 - ot)), ut = (ht + tt) / 2;
          return ut <= 0 ? null : /* @__PURE__ */ S(Ct, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: st,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: K * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ut * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: st,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: K,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ut
              }
            )
          ] });
        })(),
        et && et.length > 0 && et.map((W, G) => /* @__PURE__ */ h(
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
          `guide-${G}`
        ))
      ] })
    }
  );
}
function Wf({
  x: t,
  y: e,
  sections: o,
  onClose: r
}) {
  const n = ft(null);
  Mt(() => {
    var g;
    const p = (x) => {
      n.current && !n.current.contains(x.target) && r();
    }, u = (x) => {
      x.key === "Escape" && r();
    }, m = ((g = n.current) == null ? void 0 : g.ownerDocument) ?? document;
    return m.addEventListener("pointerdown", p, !0), m.addEventListener("keydown", u), () => {
      m.removeEventListener("pointerdown", p, !0), m.removeEventListener("keydown", u);
    };
  }, [r]);
  const s = typeof document < "u" ? document : null;
  zo(() => {
    const p = n.current;
    if (!p) return;
    const u = p.ownerDocument.defaultView ?? window, m = () => {
      const x = p.getBoundingClientRect(), b = kl(t, e, x.width, x.height, u);
      p.style.left = `${b.left}px`, p.style.top = `${b.top}px`;
    };
    m();
    const g = new ResizeObserver(m);
    return g.observe(p), u.addEventListener("resize", m), () => {
      g.disconnect(), u.removeEventListener("resize", m);
    };
  }, [t, e, o]);
  const i = ct(
    (p) => {
      p.kind === "header" || p.disabled || (p.action(), r());
    },
    [r]
  ), l = navigator.platform.includes("Mac"), d = l ? "⌘" : "Ctrl+", c = l ? "⌥" : "Alt+", a = l ? "⇧" : "Shift+", f = (p) => p.replace("Mod+", d).replace("Alt+", c).replace("Shift+", a), y = /* @__PURE__ */ h(
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
      children: o.map((p, u) => /* @__PURE__ */ S("div", { children: [
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
        p.items.map(
          (m, g) => m.kind === "header" ? /* @__PURE__ */ h(
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
            g
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
                      m.icon != null && /* @__PURE__ */ h(
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
                      m.checked !== void 0 && /* @__PURE__ */ h("span", { style: { display: "inline-block", width: 16, marginRight: -4 }, children: m.checked ? "✓" : "" }),
                      /* @__PURE__ */ h("span", { children: m.label })
                    ]
                  }
                ),
                m.shortcut && /* @__PURE__ */ h(
                  "span",
                  {
                    style: {
                      marginLeft: 32,
                      fontSize: 12,
                      color: "#888"
                    },
                    children: f(m.shortcut)
                  }
                )
              ]
            },
            g
          )
        )
      ] }, u))
    }
  );
  return s != null && s.body ? Qe(y, s.body) : y;
}
const Ff = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M228,216a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,216Zm-92-48V80a20,20,0,0,1,20-20h36a20,20,0,0,1,20,20v88a20,20,0,0,1-20,20H156A20,20,0,0,1,136,168Zm24-4h28V84H160ZM44,168V40A20,20,0,0,1,64,20h36a20,20,0,0,1,20,20V168a20,20,0,0,1-20,20H64A20,20,0,0,1,44,168Zm24-4H96V44H68Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement(
      "path",
      {
        d: "M200,80v96a8,8,0,0,1-8,8H152a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h40A8,8,0,0,1,200,80ZM104,32H64a8,8,0,0,0-8,8V176a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V40A8,8,0,0,0,104,32Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ $.createElement("path", { d: "M64,192h40a16,16,0,0,0,16-16V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V176A16,16,0,0,0,64,192ZM64,40h40V176H64ZM224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Zm-72-24h40a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v96A16,16,0,0,0,152,192Zm0-112h40v96H152Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Zm-72-24h40a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v96A16,16,0,0,0,152,192Zm-88,0h40a16,16,0,0,0,16-16V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V176A16,16,0,0,0,64,192Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M222,216a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,216Zm-84-40V80a14,14,0,0,1,14-14h40a14,14,0,0,1,14,14v96a14,14,0,0,1-14,14H152A14,14,0,0,1,138,176Zm12,0a2,2,0,0,0,2,2h40a2,2,0,0,0,2-2V80a2,2,0,0,0-2-2H152a2,2,0,0,0-2,2ZM50,176V40A14,14,0,0,1,64,26h40a14,14,0,0,1,14,14V176a14,14,0,0,1-14,14H64A14,14,0,0,1,50,176Zm12,0a2,2,0,0,0,2,2h40a2,2,0,0,0,2-2V40a2,2,0,0,0-2-2H64a2,2,0,0,0-2,2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Zm-88-40V80a16,16,0,0,1,16-16h40a16,16,0,0,1,16,16v96a16,16,0,0,1-16,16H152A16,16,0,0,1,136,176Zm16,0h40V80H152ZM48,176V40A16,16,0,0,1,64,24h40a16,16,0,0,1,16,16V176a16,16,0,0,1-16,16H64A16,16,0,0,1,48,176Zm16,0h40V40H64Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M220,216a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,216Zm-80-40V80a12,12,0,0,1,12-12h40a12,12,0,0,1,12,12v96a12,12,0,0,1-12,12H152A12,12,0,0,1,140,176Zm8,0a4,4,0,0,0,4,4h40a4,4,0,0,0,4-4V80a4,4,0,0,0-4-4H152a4,4,0,0,0-4,4Zm-96,0V40A12,12,0,0,1,64,28h40a12,12,0,0,1,12,12V176a12,12,0,0,1-12,12H64A12,12,0,0,1,52,176Zm8,0a4,4,0,0,0,4,4h40a4,4,0,0,0,4-4V40a4,4,0,0,0-4-4H64a4,4,0,0,0-4,4Z" }))
  ]
]), Bf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M208,136H140V120h44a20,20,0,0,0,20-20V60a20,20,0,0,0-20-20H140V32a12,12,0,0,0-24,0v8H72A20,20,0,0,0,52,60v40a20,20,0,0,0,20,20h44v16H48a20,20,0,0,0-20,20v40a20,20,0,0,0,20,20h68v8a12,12,0,0,0,24,0v-8h68a20,20,0,0,0,20-20V156A20,20,0,0,0,208,136ZM76,64H180V96H76ZM204,192H52V160H204Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement(
      "path",
      {
        d: "M64,104V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H72A8,8,0,0,1,64,104Zm144,40H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V152A8,8,0,0,0,208,144Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ $.createElement("path", { d: "M208,136H136V120h48a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H136V32a8,8,0,0,0-16,0V48H72A16,16,0,0,0,56,64v40a16,16,0,0,0,16,16h48v16H48a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16h72v16a8,8,0,0,0,16,0V208h72a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136ZM72,64H184v40H72ZM208,192H48V152H208v40Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,152v40a16,16,0,0,1-16,16H136v16a8,8,0,0,1-16,0V208H48a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16h72V120H72a16,16,0,0,1-16-16V64A16,16,0,0,1,72,48h48V32a8,8,0,0,1,16,0V48h48a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H136v16h72A16,16,0,0,1,224,152Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M208,138H134V118h50a14,14,0,0,0,14-14V64a14,14,0,0,0-14-14H134V32a6,6,0,0,0-12,0V50H72A14,14,0,0,0,58,64v40a14,14,0,0,0,14,14h50v20H48a14,14,0,0,0-14,14v40a14,14,0,0,0,14,14h74v18a6,6,0,0,0,12,0V206h74a14,14,0,0,0,14-14V152A14,14,0,0,0,208,138ZM70,104V64a2,2,0,0,1,2-2H184a2,2,0,0,1,2,2v40a2,2,0,0,1-2,2H72A2,2,0,0,1,70,104Zm140,88a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V152a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M208,136H136V120h48a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H136V32a8,8,0,0,0-16,0V48H72A16,16,0,0,0,56,64v40a16,16,0,0,0,16,16h48v16H48a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16h72v16a8,8,0,0,0,16,0V208h72a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136ZM72,64H184v40H72ZM208,192H48V152H208v40Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M208,140H132V116h52a12,12,0,0,0,12-12V64a12,12,0,0,0-12-12H132V32a4,4,0,0,0-8,0V52H72A12,12,0,0,0,60,64v40a12,12,0,0,0,12,12h52v24H48a12,12,0,0,0-12,12v40a12,12,0,0,0,12,12h76v20a4,4,0,0,0,8,0V204h76a12,12,0,0,0,12-12V152A12,12,0,0,0,208,140ZM68,104V64a4,4,0,0,1,4-4H184a4,4,0,0,1,4,4v40a4,4,0,0,1-4,4H72A4,4,0,0,1,68,104Zm144,88a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V152a4,4,0,0,1,4-4H208a4,4,0,0,1,4,4Z" }))
  ]
]), Nf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,116h-8V72a20,20,0,0,0-20-20H156a20,20,0,0,0-20,20v44H120V48a20,20,0,0,0-20-20H60A20,20,0,0,0,40,48v68H32a12,12,0,0,0,0,24h8v68a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V140h16v44a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V140h8a12,12,0,0,0,0-24ZM96,204H64V52H96Zm96-24H160V76h32Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement(
      "path",
      {
        d: "M200,72V184a8,8,0,0,1-8,8H152a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h40A8,8,0,0,1,200,72ZM104,40H64a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V48A8,8,0,0,0,104,40Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ $.createElement("path", { d: "M224,120H208V72a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v48H120V48a16,16,0,0,0-16-16H64A16,16,0,0,0,48,48v72H32a8,8,0,0,0,0,16H48v72a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16v48a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16a8,8,0,0,0,0-16ZM104,208H64V48h40Zm88-24H152V72h40Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M232,128a8,8,0,0,1-8,8H208v48a16,16,0,0,1-16,16H152a16,16,0,0,1-16-16V136H120v72a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V136H32a8,8,0,0,1,0-16H48V48A16,16,0,0,1,64,32h40a16,16,0,0,1,16,16v72h16V72a16,16,0,0,1,16-16h40a16,16,0,0,1,16,16v48h16A8,8,0,0,1,232,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,122H206V72a14,14,0,0,0-14-14H152a14,14,0,0,0-14,14v50H118V48a14,14,0,0,0-14-14H64A14,14,0,0,0,50,48v74H32a6,6,0,0,0,0,12H50v74a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V134h20v50a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V134h18a6,6,0,0,0,0-12ZM106,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2Zm88-24a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V72a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,120H208V72a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v48H120V48a16,16,0,0,0-16-16H64A16,16,0,0,0,48,48v72H32a8,8,0,0,0,0,16H48v72a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16v48a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16a8,8,0,0,0,0-16ZM104,208H64V48h40Zm88-24H152V72h40Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,124H204V72a12,12,0,0,0-12-12H152a12,12,0,0,0-12,12v52H116V48a12,12,0,0,0-12-12H64A12,12,0,0,0,52,48v76H32a4,4,0,0,0,0,8H52v76a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V132h24v52a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V132h20a4,4,0,0,0,0-8ZM108,208a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4Zm88-24a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V72a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4Z" }))
  ]
]), Of = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M52,40V216a12,12,0,0,1-24,0V40a12,12,0,0,1,24,0Zm16,60V64A20,20,0,0,1,88,44h88a20,20,0,0,1,20,20v36a20,20,0,0,1-20,20H88A20,20,0,0,1,68,100Zm24-4h80V68H92Zm144,60v36a20,20,0,0,1-20,20H88a20,20,0,0,1-20-20V156a20,20,0,0,1,20-20H216A20,20,0,0,1,236,156Zm-24,4H92v28H212Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement(
      "path",
      {
        d: "M72,104V64a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H80A8,8,0,0,1,72,104Zm144,40H80a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V152A8,8,0,0,0,216,144Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ $.createElement("path", { d: "M216,136H80a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V152A16,16,0,0,0,216,136Zm0,56H80V152H216v40ZM48,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm32,80h96a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H80A16,16,0,0,0,64,64v40A16,16,0,0,0,80,120Zm0-56h96v40H80Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M232,152v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H216A16,16,0,0,1,232,152ZM40,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,40,32Zm40,88h96a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H80A16,16,0,0,0,64,64v40A16,16,0,0,0,80,120Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M46,40V216a6,6,0,0,1-12,0V40a6,6,0,0,1,12,0Zm20,64V64A14,14,0,0,1,80,50h96a14,14,0,0,1,14,14v40a14,14,0,0,1-14,14H80A14,14,0,0,1,66,104Zm12,0a2,2,0,0,0,2,2h96a2,2,0,0,0,2-2V64a2,2,0,0,0-2-2H80a2,2,0,0,0-2,2Zm152,48v40a14,14,0,0,1-14,14H80a14,14,0,0,1-14-14V152a14,14,0,0,1,14-14H216A14,14,0,0,1,230,152Zm-12,0a2,2,0,0,0-2-2H80a2,2,0,0,0-2,2v40a2,2,0,0,0,2,2H216a2,2,0,0,0,2-2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M48,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm16,64V64A16,16,0,0,1,80,48h96a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H80A16,16,0,0,1,64,104Zm16,0h96V64H80Zm152,48v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H216A16,16,0,0,1,232,152Zm-16,40V152H80v40H216Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M44,40V216a4,4,0,0,1-8,0V40a4,4,0,0,1,8,0Zm24,64V64A12,12,0,0,1,80,52h96a12,12,0,0,1,12,12v40a12,12,0,0,1-12,12H80A12,12,0,0,1,68,104Zm8,0a4,4,0,0,0,4,4h96a4,4,0,0,0,4-4V64a4,4,0,0,0-4-4H80a4,4,0,0,0-4,4Zm152,48v40a12,12,0,0,1-12,12H80a12,12,0,0,1-12-12V152a12,12,0,0,1,12-12H216A12,12,0,0,1,228,152Zm-8,0a4,4,0,0,0-4-4H80a4,4,0,0,0-4,4v40a4,4,0,0,0,4,4H216a4,4,0,0,0,4-4Z" }))
  ]
]), Vf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M228,40V216a12,12,0,0,1-24,0V40a12,12,0,0,1,24,0ZM188,64v36a20,20,0,0,1-20,20H80a20,20,0,0,1-20-20V64A20,20,0,0,1,80,44h88A20,20,0,0,1,188,64Zm-24,4H84V96h80Zm24,88v36a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V156a20,20,0,0,1,20-20H168A20,20,0,0,1,188,156Zm-24,4H44v28H164Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement(
      "path",
      {
        d: "M184,64v40a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8h96A8,8,0,0,1,184,64Zm-8,80H40a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H176a8,8,0,0,0,8-8V152A8,8,0,0,0,176,144Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ $.createElement("path", { d: "M224,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM192,64v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V64A16,16,0,0,1,80,48h96A16,16,0,0,1,192,64Zm-16,0H80v40h96Zm16,88v40a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H176A16,16,0,0,1,192,152Zm-16,0H40v40H176Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm-48,8H80A16,16,0,0,0,64,64v40a16,16,0,0,0,16,16h96a16,16,0,0,0,16-16V64A16,16,0,0,0,176,48Zm0,88H40a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V152A16,16,0,0,0,176,136Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M222,40V216a6,6,0,0,1-12,0V40a6,6,0,0,1,12,0ZM190,64v40a14,14,0,0,1-14,14H80a14,14,0,0,1-14-14V64A14,14,0,0,1,80,50h96A14,14,0,0,1,190,64Zm-12,0a2,2,0,0,0-2-2H80a2,2,0,0,0-2,2v40a2,2,0,0,0,2,2h96a2,2,0,0,0,2-2Zm12,88v40a14,14,0,0,1-14,14H40a14,14,0,0,1-14-14V152a14,14,0,0,1,14-14H176A14,14,0,0,1,190,152Zm-12,0a2,2,0,0,0-2-2H40a2,2,0,0,0-2,2v40a2,2,0,0,0,2,2H176a2,2,0,0,0,2-2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM192,64v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V64A16,16,0,0,1,80,48h96A16,16,0,0,1,192,64Zm-16,0H80v40h96Zm16,88v40a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H176A16,16,0,0,1,192,152Zm-16,0H40v40H176Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M220,40V216a4,4,0,0,1-8,0V40a4,4,0,0,1,8,0ZM188,64v40a12,12,0,0,1-12,12H80a12,12,0,0,1-12-12V64A12,12,0,0,1,80,52h96A12,12,0,0,1,188,64Zm-8,0a4,4,0,0,0-4-4H80a4,4,0,0,0-4,4v40a4,4,0,0,0,4,4h96a4,4,0,0,0,4-4Zm8,88v40a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V152a12,12,0,0,1,12-12H176A12,12,0,0,1,188,152Zm-8,0a4,4,0,0,0-4-4H40a4,4,0,0,0-4,4v40a4,4,0,0,0,4,4H176a4,4,0,0,0,4-4Z" }))
  ]
]), Xf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M228,40a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,40ZM212,88v88a20,20,0,0,1-20,20H156a20,20,0,0,1-20-20V88a20,20,0,0,1,20-20h36A20,20,0,0,1,212,88Zm-24,4H160v80h28Zm-68-4V216a20,20,0,0,1-20,20H64a20,20,0,0,1-20-20V88A20,20,0,0,1,64,68h36A20,20,0,0,1,120,88ZM96,92H68V212H96Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement(
      "path",
      {
        d: "M200,80v96a8,8,0,0,1-8,8H152a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h40A8,8,0,0,1,200,80Zm-96-8H64a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V80A8,8,0,0,0,104,72Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ $.createElement("path", { d: "M224,40a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40ZM208,80v96a16,16,0,0,1-16,16H152a16,16,0,0,1-16-16V80a16,16,0,0,1,16-16h40A16,16,0,0,1,208,80Zm-16,0H152v96h40Zm-72,0V216a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V80A16,16,0,0,1,64,64h40A16,16,0,0,1,120,80Zm-16,0H64V216h40Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,40a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40ZM192,64H152a16,16,0,0,0-16,16v96a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V80A16,16,0,0,0,192,64Zm-88,0H64A16,16,0,0,0,48,80V216a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V80A16,16,0,0,0,104,64Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M222,40a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,40ZM206,80v96a14,14,0,0,1-14,14H152a14,14,0,0,1-14-14V80a14,14,0,0,1,14-14h40A14,14,0,0,1,206,80Zm-12,0a2,2,0,0,0-2-2H152a2,2,0,0,0-2,2v96a2,2,0,0,0,2,2h40a2,2,0,0,0,2-2Zm-76,0V216a14,14,0,0,1-14,14H64a14,14,0,0,1-14-14V80A14,14,0,0,1,64,66h40A14,14,0,0,1,118,80Zm-12,0a2,2,0,0,0-2-2H64a2,2,0,0,0-2,2V216a2,2,0,0,0,2,2h40a2,2,0,0,0,2-2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,40a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40ZM208,80v96a16,16,0,0,1-16,16H152a16,16,0,0,1-16-16V80a16,16,0,0,1,16-16h40A16,16,0,0,1,208,80Zm-16,0H152v96h40Zm-72,0V216a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V80A16,16,0,0,1,64,64h40A16,16,0,0,1,120,80Zm-16,0H64V216h40Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M220,40a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,40ZM204,80v96a12,12,0,0,1-12,12H152a12,12,0,0,1-12-12V80a12,12,0,0,1,12-12h40A12,12,0,0,1,204,80Zm-8,0a4,4,0,0,0-4-4H152a4,4,0,0,0-4,4v96a4,4,0,0,0,4,4h40a4,4,0,0,0,4-4Zm-80,0V216a12,12,0,0,1-12,12H64a12,12,0,0,1-12-12V80A12,12,0,0,1,64,68h40A12,12,0,0,1,116,80Zm-8,0a4,4,0,0,0-4-4H64a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4h40a4,4,0,0,0,4-4Z" }))
  ]
]), Gf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M140,40V216a12,12,0,0,1-24,0V40a12,12,0,0,1,24,0ZM88,116H45l11.52-11.51a12,12,0,0,0-17-17l-32,32a12,12,0,0,0,0,17l32,32a12,12,0,0,0,17-17L45,140H88a12,12,0,0,0,0-24Zm160.49,3.51-32-32a12,12,0,0,0-17,17L211,116H168a12,12,0,0,0,0,24h43l-11.52,11.51a12,12,0,0,0,17,17l32-32A12,12,0,0,0,248.49,119.51Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement(
      "path",
      {
        d: "M240,56V200a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V56A16,16,0,0,1,32,40H224A16,16,0,0,1,240,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ $.createElement("path", { d: "M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM96,120H35.31l18.35-18.34A8,8,0,0,0,42.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L35.31,136H96a8,8,0,0,0,0-16Zm149.66,2.34-32-32a8,8,0,0,0-11.32,11.32L220.69,120H160a8,8,0,0,0,0,16h60.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,122.34Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M104,128a8,8,0,0,1-8,8H56v24a8,8,0,0,1-13.66,5.66l-32-32a8,8,0,0,1,0-11.32l32-32A8,8,0,0,1,56,96v24H96A8,8,0,0,1,104,128Zm141.66-5.66-32-32A8,8,0,0,0,200,96v24H160a8,8,0,0,0,0,16h40v24a8,8,0,0,0,13.66,5.66l32-32A8,8,0,0,0,245.66,122.34ZM128,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,128,32Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M134,40V216a6,6,0,0,1-12,0V40a6,6,0,0,1,12,0ZM96,122H30.49l21.75-21.76a6,6,0,0,0-8.48-8.48l-32,32a6,6,0,0,0,0,8.48l32,32a6,6,0,0,0,8.48-8.48L30.49,134H96a6,6,0,0,0,0-12Zm148.24,1.76-32-32a6,6,0,0,0-8.48,8.48L225.51,122H160a6,6,0,0,0,0,12h65.51l-21.75,21.76a6,6,0,1,0,8.48,8.48l32-32A6,6,0,0,0,244.24,123.76Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM96,120H35.31l18.35-18.34A8,8,0,0,0,42.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L35.31,136H96a8,8,0,0,0,0-16Zm149.66,2.34-32-32a8,8,0,0,0-11.32,11.32L220.69,120H160a8,8,0,0,0,0,16h60.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,122.34Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M132,40V216a4,4,0,0,1-8,0V40a4,4,0,0,1,8,0ZM96,124H25.66L50.83,98.83a4,4,0,0,0-5.66-5.66l-32,32a4,4,0,0,0,0,5.66l32,32a4,4,0,1,0,5.66-5.66L25.66,132H96a4,4,0,0,0,0-8Zm146.83,1.17-32-32a4,4,0,0,0-5.66,5.66L230.34,124H160a4,4,0,0,0,0,8h70.34l-25.17,25.17a4,4,0,0,0,5.66,5.66l32-32A4,4,0,0,0,242.83,125.17Z" }))
  ]
]), Yf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM104.49,56.48,116,45V88a12,12,0,0,0,24,0V45l11.51,11.51a12,12,0,0,0,17-17l-32-32a12,12,0,0,0-17,0l-32,32a12,12,0,0,0,17,17Zm47,143L140,211V168a12,12,0,0,0-24,0v43l-11.51-11.52a12,12,0,0,0-17,17l32,32a12,12,0,0,0,17,0l32-32a12,12,0,0,0-17-17Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement(
      "path",
      {
        d: "M216,32V224a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V32A16,16,0,0,1,56,16H200A16,16,0,0,1,216,32Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ $.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM101.66,53.66,120,35.31V96a8,8,0,0,0,16,0V35.31l18.34,18.35a8,8,0,0,0,11.32-11.32l-32-32a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32Zm52.68,148.68L136,220.69V160a8,8,0,0,0-16,0v60.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M88.61,51.06a8,8,0,0,1,1.73-8.72l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,160,56H136V96a8,8,0,0,1-16,0V56H96A8,8,0,0,1,88.61,51.06ZM216,120H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm-56,80H136V160a8,8,0,0,0-16,0v40H96a8,8,0,0,0-5.66,13.66l32,32a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,160,200Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128ZM100.24,52.24,122,30.49V96a6,6,0,0,0,12,0V30.49l21.76,21.75a6,6,0,0,0,8.48-8.48l-32-32a6,6,0,0,0-8.48,0l-32,32a6,6,0,0,0,8.48,8.48Zm55.52,151.52L134,225.51V160a6,6,0,0,0-12,0v65.51l-21.76-21.75a6,6,0,0,0-8.48,8.48l32,32a6,6,0,0,0,8.48,0l32-32a6,6,0,0,0-8.48-8.48Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM101.66,53.66,120,35.31V96a8,8,0,0,0,16,0V35.31l18.34,18.35a8,8,0,0,0,11.32-11.32l-32-32a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32Zm52.68,148.68L136,220.69V160a8,8,0,0,0-16,0v60.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ $.createElement($.Fragment, null, /* @__PURE__ */ $.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128ZM98.83,50.83,124,25.66V96a4,4,0,0,0,8,0V25.66l25.17,25.17a4,4,0,1,0,5.66-5.66l-32-32a4,4,0,0,0-5.66,0l-32,32a4,4,0,0,0,5.66,5.66Zm58.34,154.34L132,230.34V160a4,4,0,0,0-8,0v70.34L98.83,205.17a4,4,0,0,0-5.66,5.66l32,32a4,4,0,0,0,5.66,0l32-32a4,4,0,0,0-5.66-5.66Z" }))
  ]
]), jf = mr({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), io = $.forwardRef(
  (t, e) => {
    const {
      alt: o,
      color: r,
      size: n,
      weight: s,
      mirrored: i,
      children: l,
      weights: d,
      ...c
    } = t, {
      color: a = "currentColor",
      size: f,
      weight: y = "regular",
      mirrored: p = !1,
      ...u
    } = $.useContext(jf);
    return /* @__PURE__ */ $.createElement(
      "svg",
      {
        ref: e,
        xmlns: "http://www.w3.org/2000/svg",
        width: n ?? f,
        height: n ?? f,
        fill: r ?? a,
        viewBox: "0 0 256 256",
        transform: i || p ? "scale(-1, 1)" : void 0,
        ...u,
        ...c
      },
      !!o && /* @__PURE__ */ $.createElement("title", null, o),
      l,
      d.get(s ?? y)
    );
  }
);
io.displayName = "IconBase";
const Vl = $.forwardRef((t, e) => /* @__PURE__ */ $.createElement(io, { ref: e, ...t, weights: Ff }));
Vl.displayName = "AlignBottomIcon";
const Zf = Vl, Xl = $.forwardRef((t, e) => /* @__PURE__ */ $.createElement(io, { ref: e, ...t, weights: Bf }));
Xl.displayName = "AlignCenterHorizontalIcon";
const Kf = Xl, Gl = $.forwardRef((t, e) => /* @__PURE__ */ $.createElement(io, { ref: e, ...t, weights: Nf }));
Gl.displayName = "AlignCenterVerticalIcon";
const qf = Gl, Yl = $.forwardRef((t, e) => /* @__PURE__ */ $.createElement(io, { ref: e, ...t, weights: Of }));
Yl.displayName = "AlignLeftIcon";
const Uf = Yl, jl = $.forwardRef((t, e) => /* @__PURE__ */ $.createElement(io, { ref: e, ...t, weights: Vf }));
jl.displayName = "AlignRightIcon";
const Qf = jl, Zl = $.forwardRef((t, e) => /* @__PURE__ */ $.createElement(io, { ref: e, ...t, weights: Xf }));
Zl.displayName = "AlignTopIcon";
const Jf = Zl, Kl = $.forwardRef((t, e) => /* @__PURE__ */ $.createElement(io, { ref: e, ...t, weights: Gf }));
Kl.displayName = "ArrowsOutLineHorizontalIcon";
const $f = Kl, ql = $.forwardRef((t, e) => /* @__PURE__ */ $.createElement(io, { ref: e, ...t, weights: Yf }));
ql.displayName = "ArrowsOutLineVerticalIcon";
const _f = ql, po = {
  size: 16,
  weight: "duotone",
  "aria-hidden": !0
}, yo = {
  alignHLeft: /* @__PURE__ */ h(Uf, { ...po }),
  alignHCenter: /* @__PURE__ */ h(Kf, { ...po }),
  alignHRight: /* @__PURE__ */ h(Qf, { ...po }),
  distributeH: /* @__PURE__ */ h($f, { ...po }),
  alignVTop: /* @__PURE__ */ h(Jf, { ...po }),
  alignVCenter: /* @__PURE__ */ h(qf, { ...po }),
  alignVBottom: /* @__PURE__ */ h(Zf, { ...po }),
  distributeV: /* @__PURE__ */ h(_f, { ...po })
}, Os = "sbd-clipboard", tp = "sbd-nodes:";
function Ul(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let r = "";
  for (let n = 0; n < o.length; n++) r += String.fromCharCode(o[n]);
  return btoa(r);
}
function ca(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) o[n] = e.charCodeAt(n);
    const r = new TextDecoder().decode(o);
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function Ql(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return ca(e[1]);
  const o = t.match(
    new RegExp(`<!--${tp}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? ca(o[1]) : null;
}
function dn(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function Jl(t) {
  return t.map((e) => {
    var n;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), r = (n = e.children) != null && n.length ? `
` + Jl(e.children) : "";
    return o + r;
  }).filter(Boolean).join(`
`);
}
function ep(t) {
  var o;
  const e = [];
  for (const r of t)
    switch (r.type) {
      case "content": {
        const n = r.data;
        (o = n.blocks) != null && o.length ? e.push(Jl(n.blocks)) : n.markdown && e.push(n.markdown);
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
function da(t, e) {
  const o = ep(e), r = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), n = Ul(e);
  return t.setData(
    "text/html",
    `<!--${Os}--><div data-sbd-nodes="${n}">${r || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function op(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, r = o.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, i = null;
  const l = (g) => {
    n = g.clientX, s = g.clientY;
  }, d = (g) => {
    dn(g.target) || t.selection.size !== 0 && (g.preventDefault(), t.copySelected(), i = da(
      g.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (g) => {
    dn(g.target) || t.selection.size !== 0 && (g.preventDefault(), t.copySelected(), i = da(
      g.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, a = (g) => {
    g.preventDefault(), g.stopImmediatePropagation();
  }, f = async (g) => {
    var P, V, X;
    if (dn(g.target)) return;
    const { x, y: b } = t.screenToCanvas(n, s), w = ((P = g.clipboardData) == null ? void 0 : P.getData("text/html")) || "", I = ((V = g.clipboardData) == null ? void 0 : V.getData("text/plain")) || "";
    if (w.includes(Os) || w.includes("data-sbd-nodes=") || i !== null && I === i) {
      if (i !== null && I === i && t.hasClipboard()) {
        a(g), t.pasteClipboard(x, b);
        return;
      }
      const it = Ql(w);
      if (it) {
        a(g), t.setClipboard(it), t.pasteClipboard(x, b);
        return;
      }
      if (w.includes(Os) || w.includes("data-sbd-nodes=")) {
        a(g), t.hasClipboard() && t.pasteClipboard(x, b);
        return;
      }
    }
    const M = (X = g.clipboardData) == null ? void 0 : X.items;
    if (M) {
      for (const et of Array.from(M))
        if (et.type.startsWith("image/")) {
          const it = et.getAsFile();
          if (!it) continue;
          a(g);
          const pt = new FileReader();
          pt.onload = () => {
            const wt = pt.result, xt = new Image();
            xt.onload = () => {
              const D = t.screenToCanvas(n, s), W = 400, G = 300, K = xt.naturalWidth / xt.naturalHeight, J = Math.min(xt.naturalWidth, W), N = Math.min(xt.naturalHeight, G), _ = K >= 1 ? J : N * K, st = K >= 1 ? J / K : N;
              let at = wt;
              if (w) {
                const ot = w.match(/<img[^>]+src=["']([^"']+)["']/i);
                ot && /\.(gif|webp|apng)(\?|#|$)/i.test(ot[1]) && (at = ot[1].replace(/&amp;/g, "&"));
              }
              const q = {
                id: Pt(10),
                type: "image",
                x: D.x,
                y: D.y,
                w: _,
                h: st,
                z: t.nextZ(),
                data: { src: at }
              };
              t.addNode(q), t.select(q.id);
            }, xt.src = wt;
          }, pt.readAsDataURL(it);
          return;
        }
    }
    const C = Ns(I) ?? Ns(w);
    if (C) {
      a(g);
      const et = t.screenToCanvas(n, s), it = await Ol(
        C,
        et.x,
        et.y,
        t.nextZ()
      );
      it && (t.addNode(it), t.select(it.id));
      return;
    }
    if (Lu(I)) {
      const et = Hu(I);
      if (et) {
        a(g);
        const it = {
          id: Pt(10),
          type: "youtube",
          x,
          y: b,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: et, url: I.trim() }
        };
        t.addNode(it), t.select(it.id);
        return;
      }
    }
    const A = w.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (A)
      try {
        const et = Ga(A);
        if (et.length > 0) {
          a(g);
          const it = {
            id: Pt(10),
            type: "content",
            x,
            y: b,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: et, markdown: I, borderColor: "#1e1e2e" }
          };
          t.addNode(it), t.select(it.id);
          return;
        }
      } catch {
      }
    if (I.trim()) {
      a(g);
      const et = await Ks(I), it = {
        id: Pt(10),
        type: "content",
        x,
        y: b,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: et, markdown: I, borderColor: "#1e1e2e" }
      };
      t.addNode(it), t.select(it.id);
      return;
    }
    t.hasClipboard() && (a(g), t.pasteClipboard(x, b));
  }, y = (g) => {
    const x = g.target;
    if (dn(x) || e && !e.contains(o.activeElement)) return;
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
    const b = g.ctrlKey || g.metaKey;
    if (b && g.key === "c") {
      t.copySelected();
      return;
    }
    if (b && g.key === "x") {
      t.copySelected();
      return;
    }
    if (b && g.key.toLowerCase() === "f") {
      g.preventDefault(), o.dispatchEvent(new CustomEvent("sb:search-open"));
      return;
    }
    if (b && g.key === "d") {
      g.preventDefault(), t.duplicateSelected();
      return;
    }
    if (b && g.key === "g") {
      g.preventDefault(), g.shiftKey ? t.ungroupSelected() : t.groupSelected();
      return;
    }
    if (g.shiftKey && !b && g.key === "H") {
      g.preventDefault(), t.flipSelectedHorizontal();
      return;
    }
    if (g.shiftKey && !b && g.key === "V") {
      g.preventDefault(), t.flipSelectedVertical();
      return;
    }
    if (b && g.key === "]") {
      g.preventDefault();
      const w = Array.from(t.selection);
      g.altKey ? t.bringToFront(w) : t.bringForward(w);
      return;
    }
    if (b && g.key === "[") {
      g.preventDefault();
      const w = Array.from(t.selection);
      g.altKey ? t.sendToBack(w) : t.sendBackward(w);
      return;
    }
    if (!b && !g.altKey && !g.shiftKey) {
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
    if (b && g.key === "z") {
      g.preventDefault(), g.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (b && g.key === "a") {
      g.preventDefault(), t.selectMultiple(t.getAllNodes().map((w) => w.id));
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
    if (b && (g.key === "=" || g.key === "+")) {
      g.preventDefault(), t.zoomIn();
      return;
    }
    if (b && g.key === "-") {
      g.preventDefault(), t.zoomOut();
      return;
    }
    if (b && g.key === "0") {
      g.preventDefault(), t.fitToContent();
      return;
    }
  };
  function p(g, x) {
    g.addEventListener("pointermove", l), g.addEventListener("copy", d), g.addEventListener("cut", c), g.addEventListener("paste", f), x.addEventListener("keydown", y);
  }
  function u(g, x) {
    g.removeEventListener("pointermove", l), g.removeEventListener("copy", d), g.removeEventListener("cut", c), g.removeEventListener("paste", f), x.removeEventListener("keydown", y);
  }
  p(o, r);
  const m = setInterval(() => {
    if (!e) return;
    const g = e.ownerDocument;
    g !== o && (u(o, r), o = g, r = g.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, p(o, r));
  }, 500);
  return () => {
    clearInterval(m), u(o, r);
  };
}
async function ha(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const r = t.measuredHeights, n = rp(o, r, t), s = e.padding ?? 40, i = e.background !== !1, l = e.format === "png", d = n.w + s * 2, c = n.h + s * 2, a = n.x - s, f = n.y - s, y = await $l(o, t, r, a, f, l), p = i ? Or(t.boardBackground).canvasBg : "transparent", u = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${d}" height="${c}" viewBox="0 0 ${d} ${c}">`,
    `<rect width="${d}" height="${c}" fill="${p}"/>`,
    ...y,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    ua(new Blob([u], { type: "image/svg+xml" }), "board.svg");
  else {
    const m = e.scale ?? 4, g = await mp(u, d, c, m);
    ua(g, "board.png");
  }
}
function rp(t, e, o) {
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const d of t) {
    if (d.type === "edge") continue;
    const c = o.resolveHeight(d);
    r = Math.min(r, d.x), n = Math.min(n, d.y), s = Math.max(s, d.x + d.w), i = Math.max(i, d.y + c);
  }
  const l = new Map(t.map((d) => [d.id, d]));
  for (const d of t) {
    if (d.type !== "edge") continue;
    const c = d, a = l.get(c.data.fromId), f = l.get(c.data.toId);
    if (!a || !f) continue;
    const y = Ee(
      a,
      f,
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
    r = Math.min(r, y.bounds.x), n = Math.min(n, y.bounds.y), s = Math.max(s, y.bounds.x + y.bounds.w), i = Math.max(i, y.bounds.y + y.bounds.h);
  }
  return isFinite(r) ? { x: r, y: n, w: s - r, h: i - n } : { x: 0, y: 0, w: 100, h: 100 };
}
async function $l(t, e, o, r, n, s) {
  const i = new Map(t.map((c) => [c.id, c])), l = [...t].sort((c, a) => c.z - a.z), d = [];
  for (const c of l) {
    const a = c.x - r, f = c.y - n, y = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        d.push(np(c, a, f, y));
        break;
      case "content":
        d.push(sp(c, a, f, c.w, y));
        break;
      case "draw":
        d.push(ip(c, r, n));
        break;
      case "shape":
        d.push(lp(c, a, f, c.w, y));
        break;
      case "text":
        d.push(cp(c, a, f, c.w, y));
        break;
      case "sticky":
        d.push(dp(c, a, f, c.w, y));
        break;
      case "image":
        d.push(await hp(c, a, f, c.w, y, s));
        break;
      case "youtube":
        d.push(await up(c, a, f, c.w, y, s));
        break;
      case "edge": {
        const p = c, u = i.get(p.data.fromId), m = i.get(p.data.toId);
        u && m && d.push(pp(p, u, m, o, r, n));
        break;
      }
    }
  }
  return d;
}
function Ao(t, e, o, r, n, s, i) {
  const l = [];
  if (s) {
    const d = e + r / 2, c = o + n / 2;
    l.push(`transform="rotate(${s}, ${d}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && l.push(`opacity="${i}"`), `<g ${l.join(" ")}>${t}</g>`;
}
function np(t, e, o, r) {
  const n = t.data, s = n.backgroundColor || "rgba(0,0,0,0.02)", i = n.borderColor || "#d1d5db", l = n.borderWidth ?? 1, d = Ln(n.borderStyle, l), c = n.label ? yr(n.label) : "";
  let a = `<rect x="${e}" y="${o}" width="${t.w}" height="${r}" rx="4" fill="${s}" stroke="${i}" stroke-width="${l}"` + (d ? ` stroke-dasharray="${d}"` : "") + "/>";
  return c && (a += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), Ao(a, e, o, t.w, r, t.rotation, n.opacity);
}
function sp(t, e, o, r, n) {
  var f;
  const s = t.data, i = ((f = s.markdown) == null ? void 0 : f.trim()) || "", l = s.borderColor, d = s.borderWidth ?? 0, c = Ln(s.borderStyle, d);
  let a = "";
  return l && d > 0 ? a += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white" stroke="${l}" stroke-width="${d}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : a += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white"/>`, i && (a += ci(i, e + 12, o + 20, r - 24, 14, 1.6, "#374151", "left", "sans-serif")), Ao(a, e, o, r, n, t.rotation, s.opacity);
}
function ip(t, e, o) {
  const r = t.data, n = r.points.map(
    ([l, d, c]) => [l + t.x - e, d + t.y - o, c]
  );
  if (n.length === 0) return "";
  if (r.tool === "vector")
    return ap(n, r, t);
  const s = so(r.strokeStyle);
  let i = "";
  if (r.fill) {
    const l = n.map(([d, c]) => [d, c]);
    if (l.length > 2) {
      const d = l.map((c, a) => `${a === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ") + " Z";
      i += `<path d="${d}" fill="${r.fill}" fill-opacity="0.4" stroke="none"/>`;
    }
  }
  if (s) {
    const l = n.map((c, a) => `${a === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" "), d = s.map((c) => c * Math.max(r.strokeWidth, 1)).join(" ");
    i += `<path d="${l}" fill="none" stroke="${r.color}" stroke-width="${r.strokeWidth}" stroke-dasharray="${d}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const l = $s(n, { size: r.strokeWidth });
    l && (i += `<path d="${l}" fill="${r.color}" stroke="none"/>`);
  }
  return r.opacity !== void 0 && r.opacity !== 1 ? `<g opacity="${r.opacity}">${i}</g>` : i;
}
function ap(t, e, o) {
  const r = t.map((d, c) => `${c === 0 ? "M" : "L"}${d[0].toFixed(2)},${d[1].toFixed(2)}`).join(" ") + " Z", n = so(e.strokeStyle), s = n ? ` stroke-dasharray="${n.map((d) => d * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${r}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, l = o.h === "auto" ? 0 : o.h;
  return Ao(i, o.x, o.y, o.w, l, o.rotation, e.opacity);
}
function lp(t, e, o, r, n) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: so(s.strokeStyle),
    seed: t.id
  };
  let l;
  const d = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      l = Fr(e, o, r, n, i, d);
      break;
    case "ellipse":
      l = zn(e + r / 2, o + n / 2, r, n, i);
      break;
    case "diamond":
      l = An(e, o, r, n, i, d);
      break;
    case "line": {
      const a = s.startPoint ?? [0, 0], f = s.endPoint ?? [r, n];
      l = Vo(e + a[0], o + a[1], e + f[0], o + f[1], i);
      break;
    }
    case "arrow": {
      const a = s.startPoint ?? [0, 0], f = s.endPoint ?? [r, n];
      l = En(e + a[0], o + a[1], e + f[0], o + f[1], i);
      break;
    }
    default:
      l = Fr(e, o, r, n, i);
  }
  const c = l.map(
    (a) => `<path d="${a.d}" fill="${a.fill || "none"}" stroke="${a.stroke}" stroke-width="${a.strokeWidth}"` + (a.strokeDasharray ? ` stroke-dasharray="${a.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return Ao(c, e, o, r, n, t.rotation, s.opacity);
}
function cp(t, e, o, r, n) {
  const s = t.data, i = n || s.text.split(`
`).length * s.fontSize * 1, l = So(s.fontFamily), d = !!s.borderColor, c = d ? 6 : 0;
  let a = "";
  if (d) {
    const y = s.borderWidth ?? 1, p = Ln(s.borderStyle, y);
    a += `<rect x="${e}" y="${o}" width="${r}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${y}"` + (p ? ` stroke-dasharray="${p}"` : "") + "/>";
  }
  const f = s.align === "center" ? e + r / 2 : s.align === "right" ? e + r - c : e + c;
  return a += ci(
    s.text,
    f,
    o + c + s.fontSize,
    r - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    l
  ), Ao(a, e, o, r, i, t.rotation, s.opacity);
}
function dp(t, e, o, r, n) {
  const s = t.data, i = s.fontSize ?? 16, l = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="2" fill="${s.color}"/>` + ci(s.text, e + 12, o + 12 + i, r - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return Ao(l, e, o, r, n, t.rotation, s.opacity);
}
async function hp(t, e, o, r, n, s) {
  const i = t.data;
  let l = i.src;
  if (s && l && !l.startsWith("data:"))
    try {
      l = await Sn(l);
    } catch {
    }
  const d = i.borderColor, c = i.borderWidth ?? 0, a = Ln(i.borderStyle, c);
  let f = `<image href="${yr(l)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  return d && c > 0 && (f += `<rect x="${e}" y="${o}" width="${r}" height="${n}" fill="none" stroke="${d}" stroke-width="${c}"` + (a ? ` stroke-dasharray="${a}"` : "") + "/>"), Ao(f, e, o, r, n, t.rotation, i.opacity);
}
async function up(t, e, o, r, n, s) {
  const i = t.data;
  let l = Du(i.videoId);
  if (s)
    try {
      l = await Sn(l);
    } catch {
    }
  let d = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="#1a1a1a"/><image href="${yr(l)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + r / 2, a = o + n / 2, f = Math.min(r, n) * 0.12;
  return d += `<circle cx="${c}" cy="${a}" r="${f}" fill="rgba(0,0,0,0.6)"/><path d="${fp(c, a, f * 0.5)}" fill="white"/>`, Ao(d, e, o, r, n, t.rotation, i.opacity);
}
function fp(t, e, o) {
  const r = o * 0.15, n = t - o * 0.7 + r, s = e - o, i = t + o + r, l = e, d = n, c = e + o;
  return `M${n},${s} L${i},${l} L${d},${c} Z`;
}
function pp(t, e, o, r, n, s) {
  const i = t.data, l = Ee(
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
  ), d = `translate(${-n}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, a = i.strokeWidth;
  let f = `<path d="${l.path}" fill="none" stroke="${i.color}" stroke-width="${a}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const y = i.arrowHeadSize ?? Math.max(8, a * 3), p = i.arrowTailSize ?? Math.max(8, a * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      f += `<path d="${bo(l.x2, l.y2, l.arrowAngle, y)}" fill="none" stroke="${i.color}" stroke-width="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      f += `<path d="${gn(l.x2, l.y2, l.arrowAngle, y)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const u = y / 3;
      f += `<circle cx="${l.x2}" cy="${l.y2}" r="${u}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      f += `<path d="${bo(l.x1, l.y1, l.tailAngle, p)}" fill="none" stroke="${i.color}" stroke-width="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      f += `<path d="${gn(l.x1, l.y1, l.tailAngle, p)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const u = p / 3;
      f += `<circle cx="${l.x1}" cy="${l.y1}" r="${u}" fill="${i.color}"/>`;
    }
  }
  return i.label && (f += `<text x="${l.labelX}" y="${l.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${yr(i.label)}</text>`), `<g transform="${d}">${f}</g>`;
}
function ci(t, e, o, r, n, s, i, l, d) {
  if (!t) return "";
  const c = l === "center" ? "middle" : l === "right" ? "end" : "start", a = yp(t, r, n), f = n * s, y = a.map(
    (p, u) => `<tspan x="${e}" dy="${u === 0 ? 0 : f}">${yr(p)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${n}" fill="${i}" font-family="${yr(d)}" text-anchor="${c}">${y}</text>`;
}
function yp(t, e, o) {
  const r = o * 0.55, n = Math.max(1, Math.floor(e / r)), s = [];
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
      a.length > n && d ? (s.push(d), d = c) : d = a;
    }
    d && s.push(d);
  }
  return s;
}
function Ln(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function yr(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Sn(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((r, n) => {
    const s = new FileReader();
    s.onloadend = () => r(s.result), s.onerror = n, s.readAsDataURL(o);
  });
}
function mp(t, e, o, r) {
  return new Promise((n, s) => {
    const i = new Image(), l = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), d = URL.createObjectURL(l);
    i.onload = () => {
      const c = document.createElement("canvas");
      c.width = e * r, c.height = o * r;
      const a = c.getContext("2d");
      a.scale(r, r), a.drawImage(i, 0, 0, e, o), URL.revokeObjectURL(d), c.toBlob((f) => {
        f ? n(f) : s(new Error("Canvas toBlob failed"));
      }, "image/png");
    }, i.onerror = () => {
      URL.revokeObjectURL(d), s(new Error("Failed to load SVG as image"));
    }, i.src = d;
  });
}
const gp = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), rr = /* @__PURE__ */ new Map(), bp = 12;
function xp(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const r = o.data.fontFamily;
      r && !gp.has(r) && e.add(r);
    }
  return [...e];
}
async function wp(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (rr.has(o)) {
      e.push(rr.get(o));
      continue;
    }
    try {
      let r;
      if (o === "Excalifont")
        r = await Sn(Ya);
      else {
        const l = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!l) continue;
        r = await Sn(l[1]);
      }
      const n = `@font-face { font-family: '${o}'; src: url('${r}') format('woff2'); }`;
      if (rr.size >= bp) {
        const s = rr.keys().next().value;
        s !== void 0 && rr.delete(s);
      }
      rr.set(o, n), e.push(n);
    } catch {
    }
  }
  return e.join(`
`);
}
async function vp(t, e) {
  const o = t.getNode(e);
  if (!o || o.type !== "frame") return "";
  const r = t.resolveHeight(o), n = 0, s = o.w + n * 2, i = r + n * 2, l = o.x - n, d = o.y - n, c = [o], a = /* @__PURE__ */ new Set([e]), f = (b) => {
    a.has(b.id) || b.type === "edge" || (a.add(b.id), c.push(b));
  };
  for (const b of t.getNodesInRect({ x: o.x, y: o.y, w: o.w, h: r }))
    f(b);
  for (const b of t.getFrameChildren(e))
    f(b);
  for (const b of t.getAllNodes())
    if (b.type === "edge") {
      const w = b;
      a.has(w.data.fromId) && a.has(w.data.toId) && c.push(b);
    }
  const y = t.measuredHeights, p = await $l(c, t, y, l, d, !0), u = xp(c), m = await wp(u), g = Or(t.boardBackground).canvasBg, x = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    m ? `<defs><style>${m}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${g}"/>`,
    ...p,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(x)}`;
}
function ua(t, e) {
  const o = URL.createObjectURL(t), r = document.createElement("a");
  r.href = o, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o);
}
const fa = [
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
function ya(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const _l = [
  ...fa,
  ...ya(fa, "phone-landscape"),
  ...pa,
  ...ya(pa, "tablet-landscape"),
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
], kp = new Map(_l.map((t) => [t.key, t]));
function Vs(t) {
  return kp.get(t);
}
function tc(t) {
  return t.w / t.h;
}
const Sp = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function Mp() {
  const t = /* @__PURE__ */ new Map();
  for (const e of _l) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: Sp[e] ?? e,
    presets: o
  }));
}
function Cp(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function cs(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const [i, l] = o[n], [d, c] = o[s];
    l > e != c > e && t < (d - i) * (e - l) / (c - l) + i && (r = !r);
  }
  return r;
}
function ds(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function Ip(t, e, o) {
  try {
    const r = await navigator.clipboard.read();
    let n = null;
    for (const i of r)
      if (i.types.includes("text/html")) {
        const l = await (await i.getType("text/html")).text();
        if (l.includes("sbd-clipboard") || l.includes("data-sbd-nodes=")) {
          const d = Ql(l);
          if (d) {
            t.setClipboard(d), t.pasteClipboard(e, o);
            return;
          }
          if (t.hasClipboard()) {
            t.pasteClipboard(e, o);
            return;
          }
        }
        n = l;
      }
    for (const i of r) {
      const l = i.types.find((d) => d.startsWith("image/"));
      if (l) {
        const d = await i.getType(l), c = await new Promise((b) => {
          const w = new FileReader();
          w.onload = () => b(w.result), w.readAsDataURL(d);
        }), a = new Image();
        await new Promise((b) => {
          a.onload = () => b(), a.src = c;
        });
        const f = a.naturalWidth / a.naturalHeight, y = Math.min(a.naturalWidth, 400), p = Math.min(a.naturalHeight, 300), u = f >= 1 ? y : p * f, m = f >= 1 ? y / f : p;
        let g = c;
        if (n) {
          const b = n.match(/<img[^>]+src=["']([^"']+)["']/i);
          b && /\.(gif|webp|apng)(\?|#|$)/i.test(b[1]) && (g = b[1].replace(/&amp;/g, "&"));
        }
        const x = {
          id: Pt(10),
          type: "image",
          x: e,
          y: o,
          w: u,
          h: m,
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
        const l = Ga(i);
        if (l.length > 0) {
          const d = {
            id: Pt(10),
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
      const i = await Ks(s), l = {
        id: Pt(10),
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
async function ma(t) {
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
  const r = o.join(`

`), n = r.split(`
`).filter(Boolean).map((l) => `<p>${l}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${Ul(e)}">${n || "<p></p>"}</div>`;
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
function hn(t) {
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
  const o = e.x - t.x, r = e.y - t.y;
  return { dist: Math.sqrt(o * o + r * r), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const nr = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function Tp({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: r,
  observeElement: n,
  unobserveElement: s,
  isContainer: i,
  children: l
}) {
  const d = ft(null);
  Mt(() => {
    if (t.h !== "auto") return;
    const f = d.current;
    if (!f) return;
    const y = f.offsetHeight;
    return y > 0 && r(t.id, y), n(f, () => {
      const p = f.offsetHeight;
      p > 0 && r(t.id, p);
    }), () => s(f);
  }, [t.id, t.h, r, n, s]);
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
function zp({
  node: t,
  engine: e,
  onDone: o
}) {
  const r = ft(null), n = ft(t.data.label ?? ""), s = ft(t);
  s.current = t;
  const i = ft(t.data.label ?? ""), l = ft(!1);
  Mt(() => () => {
    const f = s.current, y = n.current.trim();
    if (y !== i.current) {
      const u = { data: { ...f.data, label: y || void 0 } }, m = r.current;
      if (m && y) {
        const x = f.h === "auto" ? 100 : f.h, b = m.scrollHeight + 24;
        b > x && (u.h = b);
      }
      l.current ? (l.current = !1, e.updateNode(f.id, u)) : e.updateNodeWithHistory(f.id, u);
    }
  }, []);
  const d = t.h === "auto" ? 100 : t.h, c = t.data.labelFontSize ?? 14, a = t.data.fill && t.data.fillStyle === "solid" ? Cp(t.data.fill) : t.data.stroke;
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
          ref: r,
          autoFocus: !0,
          defaultValue: t.data.label ?? "",
          placeholder: "",
          rows: 1,
          onBlur: () => o(),
          onKeyDown: (f) => {
            f.key === "Escape" && f.currentTarget.blur(), f.stopPropagation();
          },
          onInput: (f) => {
            const y = f.currentTarget;
            l.current || (l.current = !0, e.pushHistorySnapshot()), n.current = y.value;
            const p = s.current;
            e.updateNode(p.id, {
              data: { ...p.data, label: y.value || void 0 }
            }), y.style.height = "auto", y.style.height = y.scrollHeight + "px";
            const m = y.scrollHeight + 24;
            m > d && e.updateNode(t.id, { h: m });
          },
          onPointerDown: (f) => f.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: c,
            fontFamily: So(t.data.labelFontFamily ?? ko),
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
const ba = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none"
};
function Ap({
  safariWebKitWorkaround: t,
  viewport: e,
  viewportTransform: o,
  children: r
}) {
  return t ? /* @__PURE__ */ h(
    "div",
    {
      style: {
        ...ba,
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
          children: r
        }
      )
    }
  ) : /* @__PURE__ */ h(
    "div",
    {
      style: {
        ...ba,
        transform: o,
        transformOrigin: "0 0"
      },
      children: r
    }
  );
}
function Ep({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: r,
  dataFlowEdgeOverlay: n = "off",
  minimapVisible: s = !0,
  singleFrameId: i
}) {
  var zi;
  const { labels: l } = te(), d = ft(null), c = ft(null), a = () => {
    var v;
    return ((v = d.current) == null ? void 0 : v.ownerDocument) ?? document;
  }, [f, y] = rt({ w: 0, h: 0 }), [p, u] = rt({ ...t.viewport }), [m, g] = rt(t.getAllNodes()), [x, b] = rt(
    new Set(t.selection)
  ), [w, I] = rt(!1), [k, M] = rt(t.mode), [C, A] = rt(t.activeGroupId), [P, V] = rt(() => t.getSearchState()), [X, et] = rt([]), [it, pt] = rt(t.snapToGrid), [wt, xt] = rt(t.gridSize), [D, W] = rt(t.smartGuides), [G, K] = rt([]), [J, N] = rt(t.boardBackground), _ = Kt(() => x.size === 1 ? Array.from(x)[0] : x.size > 1 ? [...x].sort().join("\0") : "canvas-none", [x]), st = Hn(t, _), at = ft(!1), q = ft(!1), ot = ft(/* @__PURE__ */ new Map()), ht = ft(!1), tt = ft(!1), ut = ft(null), gt = ft(null), yt = ct((v) => {
    a().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: v } }));
  }, []);
  Mt(() => {
    const v = (z) => {
      var O, E;
      if (z.key === " " && !z.repeat && !at.current) {
        const F = (O = z.target) == null ? void 0 : O.tagName;
        if (F === "INPUT" || F === "TEXTAREA" || (E = z.target) != null && E.isContentEditable) return;
        at.current = !0;
        const L = d.current;
        L && (L.style.cursor = "grab"), z.preventDefault();
      }
    }, H = (z) => {
      if (z.key === " ") {
        at.current = !1, q.current = !1;
        const O = d.current;
        O && (O.style.cursor = t.lassoSelect ? nr : hn(t.mode));
      }
    };
    return window.addEventListener("keydown", v), window.addEventListener("keyup", H), () => {
      window.removeEventListener("keydown", v), window.removeEventListener("keyup", H);
    };
  }, []), Mt(() => {
    const v = (z) => {
      ot.current.delete(z.pointerId), z.pointerType === "pen" && (tt.current = !1), ot.current.size === 0 && yt(!1), ut.current && (clearTimeout(ut.current), ut.current = null, gt.current = null);
    }, H = a();
    return H.addEventListener("pointerup", v), H.addEventListener("pointercancel", v), () => {
      H.removeEventListener("pointerup", v), H.removeEventListener("pointercancel", v);
    };
  }, [yt]);
  const [kt, At] = rt(null), [Nt, Lt] = rt(null), [dt, Ft] = rt(null), Yt = ft(dt);
  Mt(() => {
    const v = Yt.current;
    Yt.current = dt, dt ? t.notifyEdgeProgress(Af(dt)) : v && t.notifyEdgeEnd();
  }, [dt, t]);
  const Ut = ft(Nt);
  Mt(() => {
    if (t.mode !== "frame") {
      Ut.current && t.notifyRectDragEnd(), Ut.current = null;
      return;
    }
    const v = Ut.current;
    Ut.current = Nt, Nt ? t.notifyRectDragProgress({
      kind: "frame",
      startX: Nt.startX,
      startY: Nt.startY,
      endX: Nt.endX,
      endY: Nt.endY
    }) : v && t.notifyRectDragEnd();
  }, [Nt, t.mode, t]);
  const [$t, Qt] = rt(null);
  Mt(() => {
    const v = d.current;
    if (!v) return;
    t.setContainer(v);
    const H = () => {
      const F = v.getBoundingClientRect();
      t.containerOffset = { x: F.left, y: F.top };
    };
    H();
    const z = new ResizeObserver((F) => {
      var j;
      const { width: L, height: R } = ((j = F[0]) == null ? void 0 : j.contentRect) ?? { width: 0, height: 0 };
      y((U) => U.w === L && U.h === R ? U : { w: L, h: R }), t.setContainerSize(L, R), H();
    });
    z.observe(v);
    const O = () => H();
    window.addEventListener("scroll", O, !0), window.addEventListener("resize", O);
    const E = window.visualViewport;
    return E && (E.addEventListener("resize", O), E.addEventListener("scroll", O)), () => {
      z.disconnect(), window.removeEventListener("scroll", O, !0), window.removeEventListener("resize", O), E && (E.removeEventListener("resize", O), E.removeEventListener("scroll", O));
    };
  }, [t]);
  const [mt, ye] = rt({}), he = ct((v, H) => {
    ye(
      (z) => z[v] === H ? z : { ...z, [v]: H }
    ), t.updateMeasuredHeight(v, H);
  }, [t]), ie = ft(null), ge = ft(/* @__PURE__ */ new Map());
  function ke() {
    return ie.current || (ie.current = new ResizeObserver((v) => {
      var H;
      for (const z of v)
        (H = ge.current.get(z.target)) == null || H(z);
    })), ie.current;
  }
  const Be = ct((v, H) => {
    ge.current.set(v, H), ke().observe(v);
  }, []), br = ct((v) => {
    var H;
    ge.current.delete(v), (H = ie.current) == null || H.unobserve(v);
  }, []);
  Mt(() => () => {
    var v;
    (v = ie.current) == null || v.disconnect(), ie.current = null, ge.current.clear();
  }, []);
  const Eo = Kt(() => new Set(m.map((v) => v.id)), [m]);
  Mt(() => {
    ye((v) => {
      let H = !1;
      const z = {};
      for (const [O, E] of Object.entries(v))
        Eo.has(O) ? z[O] = E : H = !0;
      return H ? z : v;
    });
  }, [Eo]);
  const $e = ct(
    (v, H, z) => {
      let O, E;
      if (o && v.data.sourcePort) {
        const F = o.get(H.type);
        F != null && F.ports && (O = Ae(H, F.ports, v.data.sourcePort, p.zoom, mt, F.portAnchor ?? "bbox") ?? void 0);
      }
      if (o && v.data.targetPort) {
        const F = o.get(z.type);
        F != null && F.ports && (E = Ae(z, F.ports, v.data.targetPort, p.zoom, mt, F.portAnchor ?? "bbox") ?? void 0);
      }
      return { sourcePortPos: O, targetPortPos: E };
    },
    [o, p.zoom, mt]
  );
  ct(
    (v) => t.zoomToNode(v),
    [t, l]
  );
  const T = ct(
    (v, H) => {
      if (!v.rotation)
        return { minX: v.x, minY: v.y, maxX: v.x + v.w, maxY: v.y + H };
      const z = v.x + v.w / 2, O = v.y + H / 2, E = v.rotation * Math.PI / 180, F = Math.cos(E), L = Math.sin(E), R = [
        [v.w / 2, H / 2],
        [-v.w / 2, H / 2],
        [-v.w / 2, -H / 2],
        [v.w / 2, -H / 2]
      ];
      let j = 1 / 0, U = 1 / 0, Y = -1 / 0, Q = -1 / 0;
      for (const [B, Z] of R) {
        const nt = z + B * F - Z * L, St = O + B * L + Z * F;
        j = Math.min(j, nt), U = Math.min(U, St), Y = Math.max(Y, nt), Q = Math.max(Q, St);
      }
      return { minX: j, minY: U, maxX: Y, maxY: Q };
    },
    []
  ), lt = 8, le = ct(
    (v, H) => H.filter((z) => {
      if (z.type === "edge") {
        const F = z.data, L = t.getNode(F.fromId), R = t.getNode(F.toId);
        if (!L || !R) return !1;
        const { x1: j, y1: U, x2: Y, y2: Q } = Li(L, R, mt);
        return j >= v.x && j <= v.x + v.w && U >= v.y && U <= v.y + v.h && Y >= v.x && Y <= v.x + v.w && Q >= v.y && Q <= v.y + v.h;
      }
      const O = z.h === "auto" ? mt[z.id] ?? 100 : z.h, E = T(z, O);
      return E.minX >= v.x && E.maxX <= v.x + v.w && E.minY >= v.y && E.maxY <= v.y + v.h;
    }),
    [T, mt]
  ), Se = ct(
    (v, H) => v.length < 3 ? [] : H.filter((z) => {
      if (z.type === "edge") {
        const L = z, R = t.getNode(L.data.fromId), j = t.getNode(L.data.toId);
        if (!R || !j) return !1;
        const { x1: U, y1: Y, x2: Q, y2: B } = Li(R, j, mt);
        return cs(U, Y, v) && cs(Q, B, v);
      }
      const O = z.h === "auto" ? mt[z.id] ?? 100 : z.h, E = z.x + z.w / 2, F = z.y + O / 2;
      return cs(E, F, v);
    }),
    [t, mt]
  ), de = Kt(() => {
    if (x.size < 2) return null;
    let v = 1 / 0, H = 1 / 0, z = -1 / 0, O = -1 / 0;
    for (const E of x) {
      const F = m.find((j) => j.id === E);
      if (!F || F.type === "edge") continue;
      const L = F.h === "auto" ? mt[F.id] ?? 100 : F.h, R = T(F, L);
      v = Math.min(v, R.minX), H = Math.min(H, R.minY), z = Math.max(z, R.maxX), O = Math.max(O, R.maxY);
    }
    return v === 1 / 0 ? null : {
      x: v - lt,
      y: H - lt,
      w: z - v + lt * 2,
      h: O - H + lt * 2
    };
  }, [x, m, mt, T]), Ve = Kt(() => {
    if (!C) return null;
    const v = t.getAllGroupDescendantNodes(C);
    if (v.length === 0) return null;
    let H = 1 / 0, z = 1 / 0, O = -1 / 0, E = -1 / 0;
    for (const L of v) {
      if (L.type === "edge") continue;
      const R = L.h === "auto" ? mt[L.id] ?? 100 : L.h, j = T(L, R);
      H = Math.min(H, j.minX), z = Math.min(z, j.minY), O = Math.max(O, j.maxX), E = Math.max(E, j.maxY);
    }
    if (H === 1 / 0) return null;
    const F = 8;
    return { x: H - F, y: z - F, w: O - H + F * 2, h: E - z + F * 2 };
  }, [C, m, mt, T, t]), qt = Kt(() => {
    const v = performance.now();
    if (m.filter(
      (It) => {
        if (o) {
          const Ht = o.get(It.type);
          return Ht && !Ht.isSVGOnly;
        }
        return It.type === "content" || It.type === "draw" || It.type === "shape" || It.type === "image" || It.type === "text" || It.type === "frame" || It.type === "sticky";
      }
    ), f.w <= 0 || f.h <= 0)
      return null;
    const { zoom: H, x: z, y: O } = p, F = Math.min(500, 280 / Math.max(H, 0.1)), L = {
      x: -z / H - F,
      y: -O / H - F,
      w: f.w / H + F * 2,
      h: f.h / H + F * 2
    }, R = t.getNodesInRect(L), j = /* @__PURE__ */ new Map(), U = /* @__PURE__ */ new Set(), Y = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set();
    let B = 0, Z = 0, nt = 0, St = 0, zt = 0;
    const Dt = (It, Ht = !1) => {
      const bt = t.getNode(It);
      if (!bt) return;
      const Et = j.has(bt.id);
      j.set(bt.id, bt), bt.type === "edge" ? Q.add(bt.id) : (Et || U.add(bt.id), Ht && Y.add(bt.id));
    };
    for (const It of R) {
      const Ht = Y.size;
      Dt(It.id, !0), Y.size > Ht && (B += 1);
    }
    for (const It of x)
      Dt(It, !0);
    const Tt = $t ? { x: $t.cursorX, y: $t.cursorY } : dt ? { x: dt.cursorX, y: dt.cursorY } : null;
    if (Tt) {
      const It = 200 / Math.max(0.2, p.zoom), Ht = t.getNodesInRect({
        x: Tt.x - It,
        y: Tt.y - It,
        w: It * 2,
        h: It * 2
      });
      for (const bt of Ht)
        bt.type !== "edge" && Dt(bt.id, !0);
    }
    const Rt = Array.from(Y);
    for (const It of Rt) {
      const Ht = t.getEdgesForNode(It);
      for (const bt of Ht) {
        const Et = bt.data, Zt = Q.has(bt.id);
        j.set(bt.id, bt), Q.add(bt.id), Zt || (St += 1);
        const Bt = U.size;
        Dt(Et.fromId, !1), U.size > Bt && (Z += 1);
        const Wt = U.size;
        Dt(Et.toId, !1), U.size > Wt && (Z += 1);
      }
    }
    if (!w)
      for (const It of m) {
        if (It.type !== "edge" || Q.has(It.id)) continue;
        const Ht = It.data, bt = t.getNode(Ht.fromId), Et = t.getNode(Ht.toId);
        if (!bt || !Et) continue;
        let Zt = Y.has(Ht.fromId) || Y.has(Ht.toId);
        if (!Zt) {
          const Bt = Ee(
            bt,
            Et,
            Ht.edgeType || "bezier",
            mt,
            Ht.sourceHandle,
            Ht.targetHandle,
            Ht.midpointOffset,
            Ht.curveOffset,
            void 0,
            void 0,
            Ht.sourceT,
            Ht.targetT,
            Ht.attachmentGap
          );
          Zt = Bt.bounds.x < L.x + L.w && Bt.bounds.x + Bt.bounds.w > L.x && Bt.bounds.y < L.y + L.h && Bt.bounds.y + Bt.bounds.h > L.y;
        }
        if (Zt) {
          j.set(It.id, It), Q.add(It.id), zt += 1;
          const Bt = U.size;
          Dt(bt.id, !1), U.size > Bt && (nt += 1);
          const Wt = U.size;
          Dt(Et.id, !1), U.size > Wt && (nt += 1);
        }
      }
    const ne = Array.from(j.values());
    return {
      domNodes: ne.filter((It) => {
        if (It.type === "edge" || !Y.has(It.id)) return !1;
        if (o) {
          const Ht = o.get(It.type);
          return !!Ht && !Ht.isSVGOnly;
        }
        return It.type === "content" || It.type === "draw" || It.type === "shape" || It.type === "image" || It.type === "text" || It.type === "frame" || It.type === "sticky";
      }),
      svgNodes: ne,
      visibleNodeCount: Y.size,
      visibleEdgeCount: Q.size,
      seedVisibleNodes: B,
      nodesAddedByAdjacency: Z,
      nodesAddedByEdgeEndpoints: nt,
      edgesAddedByAdjacency: St,
      edgesAddedByCrossing: zt,
      cullingMs: performance.now() - v
    };
  }, [p, f, m, x, t, o, mt, dt, $t, w]), Ze = Kt(() => {
    if (!i) return null;
    const v = /* @__PURE__ */ new Set();
    v.add(i);
    const H = t.getFrameDescendantIds(i);
    for (const z of H) v.add(z);
    return v;
  }, [i, t, m]), Po = w ? (qt == null ? void 0 : qt.svgNodes) ?? m : m, xr = Ze ? Po.filter((v) => Ze.has(v.id)) : Po;
  Mt(() => {
    if (!ve.isEnabled()) return;
    const v = m.reduce((z, O) => z + (O.type === "edge" ? 1 : 0), 0), H = m.length - v;
    ve.recordCulling((qt == null ? void 0 : qt.cullingMs) ?? 0), ve.setVisibilityCounts({
      visibleNodes: (qt == null ? void 0 : qt.visibleNodeCount) ?? H,
      totalNodes: H,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: v,
      totalEdges: v,
      virtualizationActive: !!qt,
      seedVisibleNodes: (qt == null ? void 0 : qt.seedVisibleNodes) ?? H,
      nodesAddedByAdjacency: (qt == null ? void 0 : qt.nodesAddedByAdjacency) ?? 0,
      nodesAddedByEdgeEndpoints: (qt == null ? void 0 : qt.nodesAddedByEdgeEndpoints) ?? 0,
      edgesAddedByAdjacency: (qt == null ? void 0 : qt.edgesAddedByAdjacency) ?? 0,
      edgesAddedByCrossing: (qt == null ? void 0 : qt.edgesAddedByCrossing) ?? 0
    });
  }, [m, qt]);
  const Ho = ft(0);
  Mt(() => {
    if (!ve.isEnabled() || !qt) return;
    const v = performance.now();
    if (v - Ho.current < 1e3) return;
    Ho.current = v;
    const H = m.reduce((O, E) => O + (E.type === "edge" ? 1 : 0), 0), z = m.length - H;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: qt.visibleNodeCount,
      totalNodes: z,
      visibleEdges: qt.visibleEdgeCount,
      totalEdges: H,
      seedVisibleNodes: qt.seedVisibleNodes,
      nodesAddedByAdjacency: qt.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: qt.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: qt.edgesAddedByAdjacency,
      edgesAddedByCrossing: qt.edgesAddedByCrossing,
      cullingMs: qt.cullingMs
    });
  }, [m, qt, p]), Mt(() => {
    let v = null;
    const H = () => {
      v === null && (v = requestAnimationFrame(() => {
        v = null, g([...t.getAllNodes()]);
      }));
    };
    let z = null;
    const O = () => {
      z === null && (z = requestAnimationFrame(() => {
        z = null, u({ ...t.viewport });
      }));
    }, E = () => {
      b((B) => {
        const Z = new Set(t.selection);
        return B.size !== Z.size || [...B].some((nt) => !Z.has(nt)) ? (Ro((nt) => {
          if (!nt || Z.has(nt)) return nt;
          const St = Kr.current;
          return St && St.id === nt && performance.now() < St.until ? nt : null;
        }), $o((nt) => nt && !Z.has(nt) ? null : nt), Do((nt) => nt && !Z.has(nt) ? null : nt), _o((nt) => nt && !Z.has(nt) ? null : nt), tr((nt) => nt && !Z.has(nt) ? null : nt), jr(null), Z) : B;
      });
    }, F = () => {
      M(t.mode), t.mode === "edge" && t.deselectAll();
    }, L = () => N(t.boardBackground), R = () => {
      K([...t.alignGuides]), pt(t.snapToGrid), xt(t.gridSize), W(t.smartGuides);
    }, j = () => V(t.getSearchState());
    t.on("change", H), t.on("viewport", O), t.on("selection", E), t.on("mode", F), t.on("background", L), t.on("guides", R), t.on("search", j);
    const U = (B) => A(B), Y = () => A(null), Q = () => {
      const B = d.current;
      B && (B.style.cursor = t.lassoSelect ? nr : hn(t.mode));
    };
    return t.on("group:enter", U), t.on("group:exit", Y), t.on("lassoToggle", Q), () => {
      v !== null && cancelAnimationFrame(v), z !== null && cancelAnimationFrame(z), t.off("change", H), t.off("viewport", O), t.off("selection", E), t.off("mode", F), t.off("background", L), t.off("guides", R), t.off("search", j), t.off("group:enter", U), t.off("group:exit", Y), t.off("lassoToggle", Q);
    };
  }, [t]), Mt(() => {
    const v = d.current;
    if (!v) return;
    const H = (z) => {
      if (!z.ctrlKey && !z.metaKey) {
        const E = z.target.closest(".sb-editor-wrap");
        if (E && E.scrollHeight > E.clientHeight) {
          const F = E.scrollTop <= 0 && z.deltaY < 0, L = E.scrollTop + E.clientHeight >= E.scrollHeight && z.deltaY > 0;
          if (!F && !L) return;
        }
      }
      z.preventDefault(), z.ctrlKey || z.metaKey ? t.zoomByWheel(z.deltaY, z.clientX, z.clientY) : t.pan(-z.deltaX, -z.deltaY);
    };
    return v.addEventListener("wheel", H, { passive: !1 }), () => v.removeEventListener("wheel", H);
  }, [t]);
  const [Lo, Dn] = rt(null), [Wn, Fn] = rt(null), [Qo, Yr] = rt(null), [wr, jr] = rt(null), Zr = ft({
    x: 0,
    y: 0,
    index: -1
  }), [xe, _e] = rt(null), Bn = ft(xe);
  Mt(() => {
    const v = Bn.current, H = t.mode === "text" ? "text" : t.mode === "note" ? "note" : t.mode === "sticky" ? "sticky" : null;
    if (!H) {
      v && !xe && t.notifyRectDragEnd(), Bn.current = xe;
      return;
    }
    Bn.current = xe, xe ? t.notifyRectDragProgress({
      kind: H,
      startX: xe.startX,
      startY: xe.startY,
      endX: xe.endX,
      endY: xe.endY
    }) : v && t.notifyRectDragEnd();
  }, [xe, t.mode, t]);
  const [ac, Nn] = rt(null), [lc, cc] = rt(null), vr = ft(null), dc = Kt(() => {
    const v = /* @__PURE__ */ new Set();
    for (const H of m) {
      if (H.type !== "edge") continue;
      const z = H;
      z.data.animated && z.data.animatedDirection === "bop" && (v.add(z.data.fromId), v.add(z.data.toId));
    }
    return v;
  }, [m]), [Jo, Ro] = rt(null), On = ft(null), [mi, $o] = rt(null), [gi, Do] = rt(null), [kr, _o] = rt(null), [to, tr] = rt(null), [hc, bi] = rt(null);
  Mt(() => {
    const v = (H) => {
      Yc(() => tr(H));
    };
    return t.on("image:cropRequest", v), () => t.off("image:cropRequest", v);
  }, [t]);
  const xi = Jo || gi || mi || kr || to || hc, uc = Kt(() => {
    const v = (qt == null ? void 0 : qt.domNodes) ?? m.filter((z) => {
      if (Ze && (z.id === i || !Ze.has(z.id)))
        return !1;
      if (o) {
        const O = o.get(z.type);
        return !!O && !O.isSVGOnly;
      }
      return z.type === "content" || z.type === "draw" || z.type === "shape" || z.type === "image" || z.type === "text" || z.type === "frame" || z.type === "sticky";
    });
    if (!to || v.some((z) => z.id === to)) return v;
    const H = m.find((z) => z.id === to);
    return H ? [...v, H] : v;
  }, [qt, m, o, to, Ze]), Vn = ft(null), Kr = ft(null), wi = ft(null), [Xn, Gn] = rt(/* @__PURE__ */ new Set()), ao = ft(/* @__PURE__ */ new Set()), [vi, Sr] = rt([]), [qr, Yn] = rt(null), Xe = ft([]), lo = ft(null), ki = ft(0), Mr = ct(
    (v = !1) => {
      if (t.mode !== "erase") return;
      const H = performance.now();
      if (!v && H - ki.current < 48) return;
      ki.current = H;
      const z = Xe.current;
      t.notifyEraserProgress({
        trail: z.length > 0 ? [...z] : void 0,
        markedIds: Array.from(ao.current)
      });
    },
    [t]
  ), [Si, Ur] = rt([]), Me = ft([]), er = ft(null);
  Mt(() => {
    if (!Jo) return;
    const v = a(), H = (U) => U.querySelector(
      `[data-node-id="${Jo}"] [contenteditable="true"]`
    ), z = (U) => !U || !(U instanceof HTMLElement) ? !1 : U.isContentEditable || U instanceof HTMLInputElement || U instanceof HTMLTextAreaElement, O = (U) => U.metaKey || U.ctrlKey || U.altKey ? !1 : U.key.length === 1 ? !0 : U.key === "Backspace" || U.key === "Delete" || U.key === "Enter" || U.key === "Tab" || U.key === " ", E = (U) => !!(U.inputType.startsWith("insert") || U.inputType.startsWith("delete")), F = (U) => {
      const Y = d.current;
      if (!Y) return;
      const Q = U.target;
      if (Q && Y.contains(Q)) return;
      U.preventDefault(), U.stopPropagation(), "stopImmediatePropagation" in U && typeof U.stopImmediatePropagation == "function" && U.stopImmediatePropagation();
      const B = H(Y);
      B && B.focus();
    }, L = (U) => {
      O(U) && F(U);
    }, R = (U) => {
      E(U) && F(U);
    }, j = (U) => {
      const Y = d.current;
      if (!Y) return;
      const Q = U.target;
      if (!Q || Y.contains(Q) || !z(Q)) return;
      const B = H(Y);
      requestAnimationFrame(() => {
        try {
          Q.blur();
        } catch {
        }
        B && B.focus();
      });
    };
    return v.addEventListener("keydown", L, !0), v.addEventListener("beforeinput", R, !0), v.addEventListener("focusin", j, !0), () => {
      v.removeEventListener("keydown", L, !0), v.removeEventListener("beforeinput", R, !0), v.removeEventListener("focusin", j, !0);
    };
  }, [Jo]);
  const Mi = ct(
    (v, H, z, O = "auto") => {
      const E = Pt(10);
      wi.current = E, t.addNode({
        id: E,
        type: "content",
        x: v,
        y: H,
        w: z,
        h: O,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), Qr = ct(
    (v, H, z) => {
      const { x: O, y: E } = t.screenToCanvas(v, H);
      if (z) {
        const Y = t.hitTestAll(O, E, mt);
        if (Y.length > 0) {
          const Q = Zr.current, B = Math.abs(O - Q.x) + Math.abs(E - Q.y);
          let Z = 0;
          B < 5 && (Z = (Q.index + 1) % Y.length), Zr.current = { x: O, y: E, index: Z }, t.select(Y[Z].id);
        } else
          t.deselectAll();
      } else {
        let Y = !1;
        for (const Q of t.selection) {
          const B = t.getNode(Q);
          if (!B) continue;
          const Z = B.h === "auto" ? 100 : B.h;
          if (O >= B.x && O <= B.x + B.w && E >= B.y && E <= B.y + Z) {
            Y = !0;
            break;
          }
        }
        if (!Y && t.selection.size >= 2) {
          let Q = 1 / 0, B = 1 / 0, Z = -1 / 0, nt = -1 / 0;
          for (const St of t.selection) {
            const zt = t.getNode(St);
            if (!zt || zt.type === "edge") continue;
            const Dt = zt.h === "auto" ? 100 : zt.h;
            Q = Math.min(Q, zt.x), B = Math.min(B, zt.y), Z = Math.max(Z, zt.x + zt.w), nt = Math.max(nt, zt.y + Dt);
          }
          Q !== 1 / 0 && O >= Q && O <= Z && E >= B && E <= nt && (Y = !0);
        }
        if (!Y) {
          const Q = t.hitTest(O, E, mt);
          Q ? t.select(Q.id) : t.deselectAll();
        }
      }
      const F = Array.from(t.selection), L = F.length > 0, R = [];
      if (R.push({
        items: [
          {
            label: l.actionCut,
            shortcut: "Mod+X",
            disabled: !L,
            action: () => {
              t.cutSelected(), ma(t);
            }
          },
          {
            label: l.actionCopy,
            shortcut: "Mod+C",
            disabled: !L,
            action: () => {
              t.copySelected(), ma(t);
            }
          },
          {
            label: l.actionPaste,
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              Ip(t, O, E);
            }
          }
        ]
      }), R.push({
        items: [
          {
            label: l.actionDuplicate,
            shortcut: "Mod+D",
            disabled: !L,
            action: () => t.duplicateSelected()
          }
        ]
      }), F.filter((Y) => {
        const Q = t.getNode(Y);
        return !!Q && Q.type !== "edge" && !Q.locked;
      }).length >= 2 && (R.push({
        items: [
          {
            label: l.actionArrangeSelection,
            action: () => t.arrangeSelectedNodes(mt, p.zoom)
          }
        ]
      }), R.push({
        items: [
          {
            kind: "header",
            label: l.alignMenuHorizontal,
            action: () => {
            }
          },
          {
            label: l.alignLeft,
            icon: yo.alignHLeft,
            action: () => t.alignSelectedNodes("left", mt)
          },
          {
            label: l.alignCenterHorizontal,
            icon: yo.alignHCenter,
            action: () => t.alignSelectedNodes("centerH", mt)
          },
          {
            label: l.alignRight,
            icon: yo.alignHRight,
            action: () => t.alignSelectedNodes("right", mt)
          },
          {
            label: l.alignDistributeHorizontal,
            icon: yo.distributeH,
            action: () => t.distributeSelectedNodes(
              "horizontal",
              mt
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
            icon: yo.alignVTop,
            action: () => t.alignSelectedNodes("top", mt)
          },
          {
            label: l.alignCenterVertical,
            icon: yo.alignVCenter,
            action: () => t.alignSelectedNodes("centerV", mt)
          },
          {
            label: l.alignBottom,
            icon: yo.alignVBottom,
            action: () => t.alignSelectedNodes("bottom", mt)
          },
          {
            label: l.alignDistributeVertical,
            icon: yo.distributeV,
            action: () => t.distributeSelectedNodes("vertical", mt)
          }
        ]
      })), L && R.push({
        items: [
          {
            label: l.actionAddToPersonalLibrary,
            action: () => {
              const Y = F.map((Z) => t.getNode(Z)).filter((Z) => !!Z).map((Z) => structuredClone(Z)), Q = new Set(
                Y.map((Z) => Z.groupId).filter(Boolean)
              ), B = /* @__PURE__ */ new Map();
              for (const [Z, nt] of t.groupParent)
                Q.has(Z) && B.set(Z, nt);
              Yn({
                nodes: Y,
                groupParent: B
              });
            }
          }
        ]
      }), F.length >= 2 || L && t.selectionHasGroup()) {
        const Y = [];
        F.length >= 2 && Y.push({
          label: l.actionGroupSelection,
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && Y.push({
          label: l.actionUngroupSelection,
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), R.push({ items: Y });
      }
      if (L && F.every((Q) => {
        const B = t.getNode(Q);
        return B && (B.type === "draw" || B.type === "shape");
      }) && R.push({
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
      }), L && R.push({
        items: [
          {
            label: l.actionBringForward,
            shortcut: "Mod+]",
            action: () => t.bringForward(F)
          },
          {
            label: l.actionSendBackward,
            shortcut: "Mod+[",
            action: () => t.sendBackward(F)
          },
          {
            label: l.actionBringToFront,
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(F)
          },
          {
            label: l.actionSendToBack,
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(F)
          }
        ]
      }), L) {
        const Y = F.some((Z) => {
          var nt;
          return (nt = t.getNode(Z)) == null ? void 0 : nt.locked;
        }), Q = F.some((Z) => {
          var nt;
          return !((nt = t.getNode(Z)) != null && nt.locked);
        }), B = [];
        Q && B.push({
          label: l.actionLock,
          action: () => {
            for (const Z of F) t.updateNode(Z, { locked: !0 });
          }
        }), Y && B.push({
          label: l.actionUnlock,
          action: () => {
            for (const Z of F) t.updateNode(Z, { locked: void 0 });
          }
        }), R.push({ items: B });
      }
      L && R.push({
        items: [
          {
            label: l.actionDelete,
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const U = [10, 20, 40, 80];
      return R.push({
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
              t.toggleSmartGuides(), W(t.smartGuides);
            }
          },
          ...U.map((Y) => ({
            label: `${Y}px`,
            checked: t.gridSize === Y,
            action: () => {
              t.setGridSize(Y);
            }
          }))
        ]
      }), R.push({
        items: [
          {
            label: l.actionExportAsPng,
            action: () => ha(t, { format: "png" })
          },
          {
            label: l.actionExportAsSvg,
            action: () => ha(t, { format: "svg" })
          }
        ]
      }), R;
    },
    [t, l, mt, p.zoom]
  ), fc = ct(
    (v) => {
      if (v.preventDefault(), t.presentationMode) return;
      const H = Qr(v.clientX, v.clientY, v.altKey);
      Yr({ x: v.clientX, y: v.clientY, sections: H });
    },
    [t, Qr]
  ), Jr = ct(
    (v, H, z) => {
      const O = () => {
        const L = d.current, R = (L == null ? void 0 : L.ownerDocument) ?? document, j = Array.from(
          R.querySelectorAll('input, textarea, [contenteditable="true"]')
        );
        for (const U of j)
          if (!(L != null && L.contains(U)))
            try {
              U.blur();
            } catch {
            }
      };
      O();
      const E = Pt(10);
      t.addNode({
        id: E,
        type: "text",
        x: v,
        y: H,
        w: z,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? ko,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(E), Vn.current = E, Kr.current = { id: E, until: performance.now() + 1500 }, Ro(E);
      const F = (L = 0) => {
        const R = d.current;
        if (!R) return;
        const j = R.querySelector(
          `[data-node-id="${E}"] [contenteditable="true"]`
        );
        if (j) {
          O(), j.focus(), Kr.current = null;
          return;
        }
        L < 12 && requestAnimationFrame(() => F(L + 1));
      };
      requestAnimationFrame(() => F(0));
    },
    [t]
  ), pc = ct(
    (v) => {
      if (t.presentationMode || t.mode !== "select") return;
      const { x: H, y: z } = t.screenToCanvas(v.clientX, v.clientY), O = t.hitTestAll(H, z, mt), E = O.find((F) => !t.isContainerType(F.type)) ?? O[0] ?? null;
      if (E != null && E.groupId) {
        const F = [];
        let L = E.groupId;
        for (; L; )
          F.push(L), L = t.groupParent.get(L);
        if (!t.activeGroupId) {
          t.enterGroup(F[F.length - 1]), t.select(E.id);
          return;
        }
        const R = F.indexOf(t.activeGroupId);
        if (R > 0) {
          t.enterGroup(F[R - 1]), t.select(E.id);
          return;
        }
      }
      if (E && E.type === "text") {
        t.select(E.id), On.current = { clientX: v.clientX, clientY: v.clientY }, Ro(E.id);
        return;
      }
      if (E && E.type === "sticky") {
        t.select(E.id), Do(E.id);
        return;
      }
      if (E && E.type === "frame") {
        t.select(E.id), $o(E.id);
        return;
      }
      if (E && E.type === "shape") {
        const F = E.data, L = F.shape === "line" || F.shape === "arrow";
        t.select(E.id), L || _o(E.id);
        return;
      }
      if (E && E.type === "draw") {
        t.select(E.id);
        return;
      }
      if (!E || E.type === "draw") {
        const L = t.getAllNodes().filter((R) => R.type === "shape").sort((R, j) => j.z - R.z).find((R) => !(R.data.shape === "line" || R.data.shape === "arrow") && Cn(R, H, z, t.viewport.zoom, !0));
        if (L) {
          t.select(L.id), _o(L.id);
          return;
        }
      }
      E || (t.deselectAll(), Jr(H, z, 300));
    },
    [t, mt, Jr]
  ), yc = ct(
    (v) => {
      if (ot.current.set(v.pointerId, { x: v.clientX, y: v.clientY }), v.pointerType === "pen" && (tt.current = !0), v.button !== 2 && yt(!0), v.pointerType === "touch" && (ot.current.size >= 2 || tt.current)) {
        ht.current = !0, ut.current && (clearTimeout(ut.current), ut.current = null, gt.current = null);
        const E = new Map(ot.current), F = [...ot.current.keys()].find((Y) => Y !== v.pointerId);
        F !== void 0 && a().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: F,
            bubbles: !0,
            clientX: v.clientX,
            clientY: v.clientY
          })
        );
        const L = [...E.values()];
        let R = ga(L[0], L[1] ?? L[0]);
        const j = (Y) => {
          if (!E.has(Y.pointerId)) return;
          E.set(Y.pointerId, { x: Y.clientX, y: Y.clientY });
          const Q = [...E.values()];
          if (Q.length < 2) return;
          const B = ga(Q[0], Q[1]);
          if (t.pan(B.mx - R.mx, B.my - R.my), R.dist > 1) {
            const Z = Math.min(Math.max(B.dist / R.dist, 0.9), 1.1);
            t.zoomByFactor(Z, B.mx, B.my);
          }
          R = B;
        }, U = (Y) => {
          ot.current.delete(Y.pointerId), E.delete(Y.pointerId), Y.pointerType === "pen" && (tt.current = !1), E.size < 2 && !tt.current && (ht.current = !1, a().removeEventListener("pointermove", j), a().removeEventListener("pointerup", U), a().removeEventListener("pointercancel", U));
        };
        a().addEventListener("pointermove", j), a().addEventListener("pointerup", U), a().addEventListener("pointercancel", U);
        return;
      }
      if (ht.current || t.presentationMode && !(v.button === 1 || v.button === 0 && at.current))
        return;
      if (Qo && Yr(null), v.pointerType === "touch") {
        const E = v.clientX, F = v.clientY, L = v.pointerId;
        gt.current = { clientX: E, clientY: F }, ut.current = setTimeout(() => {
          if (ut.current = null, !gt.current || ht.current) return;
          const R = Qr(E, F, !1);
          Yr({ x: E, y: F, sections: R }), a().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: L,
              bubbles: !0,
              clientX: E,
              clientY: F
            })
          ), gt.current = null;
        }, 500);
      }
      if (v.button === 1 || v.button === 0 && at.current) {
        v.preventDefault(), q.current = !0;
        const E = t.viewport.x, F = t.viewport.y, L = v.clientX, R = v.clientY, j = d.current;
        j && (j.style.cursor = "grabbing");
        const U = (Q) => {
          t.viewport.x = E + (Q.clientX - L), t.viewport.y = F + (Q.clientY - R), u({ ...t.viewport });
        }, Y = () => {
          q.current = !1, j && (j.style.cursor = at.current ? "grab" : t.lassoSelect ? nr : ""), a().removeEventListener("pointermove", U), a().removeEventListener("pointerup", Y);
        };
        a().addEventListener("pointermove", U), a().addEventListener("pointerup", Y);
        return;
      }
      const { x: z, y: O } = t.screenToCanvas(v.clientX, v.clientY);
      if (v.pointerType === "touch" && ut.current && t.hitTest(z, O, mt) && (clearTimeout(ut.current), ut.current = null, gt.current = null), t.mode === "select") {
        if (v.button !== 0) return;
        if (v.altKey) {
          const L = t.hitTestAll(z, O, mt);
          if (L.length > 0) {
            const R = Zr.current, j = Math.abs(z - R.x) + Math.abs(O - R.y);
            let U = 0;
            j < 5 && (U = (R.index + 1) % L.length), Zr.current = { x: z, y: O, index: U }, t.select(L[U].id);
          }
          return;
        }
        let E = !1;
        !t.lassoSelect && t.selection.size >= 2 && de && z >= de.x && z <= de.x + de.w && O >= de.y && O <= de.y + de.h && (E = !0);
        let F = null;
        if (!t.lassoSelect) {
          const L = t.hitTestAll(z, O, mt);
          if (F = L.find((R) => t.selection.has(R.id) && !t.isContainerType(R.type)) ?? L.find((R) => !t.isContainerType(R.type)) ?? L[0] ?? null, !E) {
            const R = Ri(
              t.nodes,
              z,
              O,
              t.viewport.zoom,
              mt,
              $e
            );
            R && (F ? F.type !== "draw" && F.type !== "shape" && !t.isContainerType(F.type) && R.distance < cd(F, z, O, mt) && (F = R.node) : F = R.node);
          }
        }
        if (F || E) {
          F && (t.activeGroupId && !t.isNodeInActiveGroup(F.id) && t.exitAllGroups(), v.shiftKey ? t.toggleSelect(F.id) : t.selection.has(F.id) || t.select(F.id));
          const L = Array.from(t.selection).filter(
            (Bt) => {
              var Wt;
              return !((Wt = t.getNode(Bt)) != null && Wt.locked);
            }
          );
          if (L.length === 0) return;
          const R = v.clientX, j = v.clientY, U = /* @__PURE__ */ new Set(), Y = /* @__PURE__ */ new Set();
          for (const Bt of L) {
            const Wt = t.getNode(Bt);
            if (Wt && t.isContainerType(Wt.type)) {
              Y.add(Bt);
              for (const Ot of t.getFrameDescendantIds(Bt))
                t.selection.has(Ot) || U.add(Ot);
            }
          }
          const Q = [...L, ...U], B = Q.map((Bt) => {
            const Wt = t.getNode(Bt);
            return { id: Bt, x: Wt.x, y: Wt.y };
          }), Z = t.selectionGroupId(), nt = Z ? t.groupRotations.get(Z) : null, St = nt == null ? void 0 : nt.cx, zt = nt == null ? void 0 : nt.cy;
          jr(null);
          let Dt = !1, Tt = null, Rt = R, ne = j, Jt = !1;
          const It = new Set(Q), Ht = t.createDragSnapContext(It), bt = () => {
            Tt = null;
            const Bt = (Rt - R) / t.viewport.zoom, Wt = (ne - j) / t.viewport.zoom, { finalDx: Ot, finalDy: fe } = t.computeDragSnap(
              B,
              It,
              Bt,
              Wt,
              Jt,
              Ht
            ), Gt = B.map((pe) => ({
              id: pe.id,
              patch: { x: pe.x + Ot, y: pe.y + fe }
            }));
            t.updateMany(Gt), nt && Z && t.groupRotations.set(Z, {
              angle: nt.angle,
              cx: St + Ot,
              cy: zt + fe
            });
          }, Et = (Bt) => {
            const Wt = (Bt.clientX - R) / t.viewport.zoom, Ot = (Bt.clientY - j) / t.viewport.zoom;
            if (!Dt)
              if (Math.abs(Wt) > 2 || Math.abs(Ot) > 2)
                Dt = !0, t.pushHistorySnapshot(), I(!0);
              else
                return;
            Rt = Bt.clientX, ne = Bt.clientY, Jt = Bt.metaKey || Bt.ctrlKey, Tt === null && (Tt = requestAnimationFrame(bt));
          }, Zt = () => {
            if (Tt !== null && (cancelAnimationFrame(Tt), bt()), I(!1), t.clearAlignGuides(), a().removeEventListener("pointermove", Et), a().removeEventListener("pointerup", Zt), Dt) {
              const Bt = L.filter(
                (Wt) => !U.has(Wt)
              );
              Bt.length > 0 && t.updateFrameMembership(Bt);
            }
          };
          a().addEventListener("pointermove", Et), a().addEventListener("pointerup", Zt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          v.shiftKey || t.deselectAll();
          const L = new Set(t.selection);
          if (t.lassoSelect) {
            const R = [[z, O]];
            Fn([...R]);
            let j = null, U = 0;
            const Y = (Z = !1) => {
              j = null;
              const nt = Z || U % 2 === 0;
              if (U++, nt && R.length >= 3) {
                const zt = Se(R, t.getAllNodes()).map((Tt) => Tt.id), Dt = v.shiftKey ? [.../* @__PURE__ */ new Set([...L, ...zt])] : zt;
                (Dt.length !== t.selection.size || Dt.some((Tt) => !t.selection.has(Tt))) && t.selectMultiple(Dt);
              }
              Fn([...R]);
            }, Q = (Z) => {
              const { x: nt, y: St } = t.screenToCanvas(Z.clientX, Z.clientY);
              R.push([nt, St]), j === null && (j = requestAnimationFrame(() => Y(!1)));
            }, B = () => {
              j !== null && cancelAnimationFrame(j), Y(!0), a().removeEventListener("pointermove", Q), a().removeEventListener("pointerup", B), Fn(null), t.toggleLassoSelect();
            };
            a().addEventListener("pointermove", Q), a().addEventListener("pointerup", B);
          } else {
            const R = { startX: z, startY: O, endX: z, endY: O };
            Dn(R);
            let j = null, U = 0;
            const Y = (Z = !1, nt = !1) => {
              j = null;
              const St = Math.min(R.startX, R.endX), zt = Math.min(R.startY, R.endY), Dt = Math.abs(R.endX - R.startX), Tt = Math.abs(R.endY - R.startY), Rt = nt || Z || U % 2 === 0;
              if (U++, Rt) {
                const Jt = le(
                  { x: St, y: zt, w: Dt, h: Tt },
                  t.getAllNodes()
                ).map((Ht) => Ht.id), It = v.shiftKey ? [.../* @__PURE__ */ new Set([...L, ...Jt])] : Jt;
                (It.length !== t.selection.size || It.some((Ht) => !t.selection.has(Ht))) && t.selectMultiple(It);
              }
              Dn({ ...R });
            }, Q = (Z) => {
              const { x: nt, y: St } = t.screenToCanvas(Z.clientX, Z.clientY);
              R.endX = nt, R.endY = St, j === null && (j = requestAnimationFrame(() => Y(!1)));
            }, B = () => {
              j !== null && cancelAnimationFrame(j), Y(!0), a().removeEventListener("pointermove", Q), a().removeEventListener("pointerup", B), Dn(null);
            };
            a().addEventListener("pointermove", Q), a().addEventListener("pointerup", B);
          }
        }
      } else if (t.mode === "text") {
        t.deselectAll();
        const E = z, F = O, L = {
          startX: z,
          startY: O,
          endX: z,
          endY: O
        };
        let R = !1;
        _e(L);
        const j = (Y) => {
          const { x: Q, y: B } = t.screenToCanvas(Y.clientX, Y.clientY);
          L.endX = Q, L.endY = B;
          const Z = Math.abs(L.endX - L.startX), nt = Math.abs(L.endY - L.startY);
          (Z > 10 || nt > 10) && (R = !0), _e({ ...L });
        }, U = () => {
          a().removeEventListener("pointermove", j), a().removeEventListener("pointerup", U), _e(null);
          const Y = R ? Math.max(Math.abs(L.endX - L.startX), 60) : 300, Q = R ? Math.min(L.startX, L.endX) : E, B = R ? Math.min(L.startY, L.endY) : F;
          Jr(Q, B, Y);
        };
        a().addEventListener("pointermove", j), a().addEventListener("pointerup", U);
      } else if (t.mode === "note") {
        t.deselectAll();
        const E = z, F = O, L = {
          startX: z,
          startY: O,
          endX: z,
          endY: O
        };
        let R = !1;
        _e(L);
        const j = (Y) => {
          const { x: Q, y: B } = t.screenToCanvas(Y.clientX, Y.clientY);
          L.endX = Q, L.endY = B;
          const Z = Math.abs(L.endX - L.startX), nt = Math.abs(L.endY - L.startY);
          (Z > 10 || nt > 10) && (R = !0), _e({ ...L });
        }, U = () => {
          a().removeEventListener("pointermove", j), a().removeEventListener("pointerup", U), _e(null);
          const Y = R ? Math.max(Math.abs(L.endX - L.startX), 100) : 300, Q = R ? Math.max(Math.abs(L.endY - L.startY), 40) : "auto", B = R ? Math.min(L.startX, L.endX) : E, Z = R ? Math.min(L.startY, L.endY) : F;
          Mi(B, Z, Y, Q), t.setMode("select");
        };
        a().addEventListener("pointermove", j), a().addEventListener("pointerup", U);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const E = z, F = O, L = {
          startX: z,
          startY: O,
          endX: z,
          endY: O
        };
        let R = !1;
        _e(L);
        const j = (Y) => {
          const { x: Q, y: B } = t.screenToCanvas(Y.clientX, Y.clientY);
          L.endX = Q, L.endY = B, Math.abs(L.endX - L.startX) > 10 && (R = !0), _e({ ...L });
        }, U = () => {
          a().removeEventListener("pointermove", j), a().removeEventListener("pointerup", U), _e(null);
          const Y = R ? Math.max(Math.abs(L.endX - L.startX), 100) : 200, Q = R ? Math.min(L.startX, L.endX) : E, B = R ? Math.min(L.startY, L.endY) : F, Z = Pt(10), nt = R ? Math.max(Math.abs(L.endY - L.startY), 100) : 150;
          t.addNode({
            id: Z,
            type: "sticky",
            x: Q,
            y: B,
            w: Y,
            h: nt,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(Z), Do(Z), t.setMode("select");
        };
        a().addEventListener("pointermove", j), a().addEventListener("pointerup", U);
      } else if (t.mode === "draw") {
        const E = v.pressure || 0.5, F = {
          points: [[z, O, E]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle,
          opacity: t.activeTool.opacity
        };
        At(F), t.notifyDrawProgress(F);
        const L = (j) => {
          const { x: U, y: Y } = t.screenToCanvas(j.clientX, j.clientY), Q = j.pressure || 0.5;
          F.points.push([U, Y, Q]), At({ ...F, points: [...F.points] }), t.notifyDrawProgress({ ...F, points: [...F.points] });
        }, R = () => {
          if (a().removeEventListener("pointermove", L), a().removeEventListener("pointerup", R), F.points.length < 2) {
            t.notifyDrawEnd(), At(null);
            return;
          }
          let j = 1 / 0, U = 1 / 0, Y = -1 / 0, Q = -1 / 0;
          for (const [Z, nt] of F.points)
            Z < j && (j = Z), nt < U && (U = nt), Z > Y && (Y = Z), nt > Q && (Q = nt);
          const B = F.points.map(
            ([Z, nt, St]) => [Z - j, nt - U, St]
          );
          t.addNode({
            id: Pt(10),
            type: "draw",
            x: j,
            y: U,
            w: Y - j,
            h: Q - U,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: B,
              color: F.color,
              strokeWidth: F.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => {
            At(null), requestAnimationFrame(() => {
              t.notifyDrawEnd();
            });
          });
        };
        a().addEventListener("pointermove", L), a().addEventListener("pointerup", R);
      } else if (t.mode === "shape") {
        const E = {
          startX: z,
          startY: O,
          endX: z,
          endY: O
        };
        Lt(E);
        const F = (R) => {
          const { x: j, y: U } = t.screenToCanvas(R.clientX, R.clientY);
          E.endX = j, E.endY = U, Lt({ ...E }), t.notifyShapeProgress({
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
        }, L = () => {
          a().removeEventListener("pointermove", F), a().removeEventListener("pointerup", L);
          const R = t.activeTool.shapeType || "rect", j = R === "line" || R === "arrow", U = Math.min(E.startX, E.endX);
          let Y = Math.min(E.startY, E.endY);
          const Q = Math.abs(E.endX - E.startX), B = Math.abs(E.endY - E.startY);
          let Z;
          if (j) {
            const zt = t.activeTool.width * 2;
            Z = Math.max(B, zt), B < zt && (Y -= (zt - B) / 2);
          } else
            Z = B;
          if (Q < 5 && (j ? Q < 5 && Math.abs(E.endY - E.startY) < 5 : Z < 5)) {
            t.notifyShapeEnd(), Lt(null);
            return;
          }
          const nt = {};
          j && (nt.startPoint = [
            E.startX - U,
            E.startY - Y
          ], nt.endPoint = [
            E.endX - U,
            E.endY - Y
          ]);
          const St = Pt(10);
          t.addNode({
            id: St,
            type: "shape",
            x: U,
            y: Y,
            w: Q,
            h: Z,
            z: t.nextZ(),
            data: {
              shape: R,
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
            Lt(null), requestAnimationFrame(() => {
              t.notifyShapeEnd();
            });
          });
        };
        a().addEventListener("pointermove", F), a().addEventListener("pointerup", L);
      } else if (t.mode === "edge") {
        const E = t.hitTest(z, O, mt);
        if (!E || E.type === "edge") return;
        const F = t.freeFormEdges, L = F ? We(E, z, O, mt).t : void 0;
        Ft({
          fromNode: E,
          cursorX: z,
          cursorY: O,
          sourceT: L,
          edgeColor: t.activeTool.color,
          edgeStrokeWidth: t.activeTool.width || 2,
          edgeStyle: t.activeTool.strokeStyle || "solid",
          edgeType: t.activeTool.edgeType,
          attachmentGap: t.activeTool.attachmentGap
        });
        const R = (U) => {
          const { x: Y, y: Q } = t.screenToCanvas(U.clientX, U.clientY);
          Ft(
            (B) => B ? { ...B, cursorX: Y, cursorY: Q } : null
          );
        }, j = (U) => {
          a().removeEventListener("pointermove", R), a().removeEventListener("pointerup", j), Ft(null);
          const { x: Y, y: Q } = t.screenToCanvas(U.clientX, U.clientY);
          let B = t.hitTest(Y, Q, mt);
          if (!B || B.type === "edge" || t.isContainerType(B.type)) {
            const Tt = 50 / t.viewport.zoom;
            let Rt = 1 / 0, ne = !1, Jt = null;
            for (const It of t.getAllNodes()) {
              if (It.type === "edge" || It.id === E.id) continue;
              const Ht = t.isContainerType(It.type), bt = We(It, Y, Q, mt), Et = Math.hypot(bt.x - Y, bt.y - Q);
              if (Et < Tt) {
                if (Ht && !ne && Jt) continue;
                (!Ht && ne || Et < Rt) && (Rt = Et, ne = Ht, Jt = It);
              }
            }
            Jt && (B = Jt);
          }
          if (!B || B.type === "edge" || B.id === E.id)
            return;
          const Z = F ? void 0 : en(E, z, O, mt), nt = F ? void 0 : en(B, Y, Q, mt), St = F ? We(B, Y, Q, mt).t : void 0;
          if (t.getAllNodes().some((Tt) => {
            if (Tt.type !== "edge") return !1;
            const Rt = Tt.data;
            return F ? Rt.fromId === E.id && Rt.toId === B.id && Rt.sourceT !== void 0 && Rt.targetT !== void 0 && Math.abs(Rt.sourceT - L) < 0.02 && Math.abs(Rt.targetT - St) < 0.02 : ds(Rt, {
              fromId: E.id,
              toId: B.id,
              sourceHandle: Z,
              targetHandle: nt
            });
          })) return;
          const Dt = {
            id: Pt(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: E.id,
              toId: B.id,
              style: t.activeTool.strokeStyle || "solid",
              color: t.activeTool.color,
              strokeWidth: t.activeTool.width || 2,
              arrowHead: t.activeTool.arrowHead ?? "arrow",
              arrowTail: t.activeTool.arrowTail ?? "none",
              edgeType: t.activeTool.edgeType ?? "bezier",
              roughness: t.activeTool.roughness ?? 0,
              attachmentGap: t.activeTool.attachmentGap,
              sourceHandle: Z,
              targetHandle: nt,
              sourceT: L,
              targetT: St
            }
          };
          t.addNode(Dt);
        };
        a().addEventListener("pointermove", R), a().addEventListener("pointerup", j);
      } else if (t.mode === "frame") {
        const E = {
          startX: z,
          startY: O,
          endX: z,
          endY: O
        };
        Lt(E);
        const F = (R) => {
          const { x: j, y: U } = t.screenToCanvas(R.clientX, R.clientY);
          E.endX = j, E.endY = U, Lt({ ...E });
        }, L = () => {
          a().removeEventListener("pointermove", F), a().removeEventListener("pointerup", L);
          const R = Math.min(E.startX, E.endX), j = Math.min(E.startY, E.endY), U = Math.abs(E.endX - E.startX), Y = Math.abs(E.endY - E.startY);
          if (U < 20 || Y < 20) {
            Lt(null);
            return;
          }
          const Q = Pt(10);
          t.addNode({
            id: Q,
            type: "frame",
            x: R,
            y: j,
            w: U,
            h: Y,
            z: t.nextZ(),
            data: {
              label: l.typeFrame,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(Q), Lt(null), t.select(Q), t.setMode("select");
        };
        a().addEventListener("pointermove", F), a().addEventListener("pointerup", L);
      } else if (t.mode === "erase") {
        if (v.button !== 0) return;
        const E = (St, zt) => {
          const Dt = t.hitTestAll(St, zt, mt), Tt = Gd(
            t.nodes,
            St,
            zt,
            t.viewport.zoom,
            mt,
            $e
          );
          let Rt = !1;
          for (const ne of [...Dt, ...Tt])
            ao.current.has(ne.id) || (ao.current.add(ne.id), Rt = !0);
          Rt && Gn(new Set(ao.current));
        }, F = 400;
        ao.current = /* @__PURE__ */ new Set();
        const L = Date.now();
        Xe.current = [[z, O, L]], Sr([[z, O, L]]), E(z, O), Mr(!0);
        let R = z, j = O;
        const U = () => {
          const St = Date.now(), zt = Xe.current.length;
          Xe.current = Xe.current.filter(
            (Dt) => St - Dt[2] < F
          ), Xe.current.length !== zt && Sr([...Xe.current]), Mr(), lo.current = requestAnimationFrame(U);
        };
        lo.current = requestAnimationFrame(U);
        const Y = (St) => {
          const { x: zt, y: Dt } = t.screenToCanvas(St.clientX, St.clientY);
          R = zt, j = Dt;
          const Tt = Date.now();
          Xe.current.push([R, j, Tt]), Sr([...Xe.current]), E(R, j), Mr(!0);
        }, Q = () => {
          lo.current !== null && (cancelAnimationFrame(lo.current), lo.current = null), t.notifyEraserEnd(), ao.current = /* @__PURE__ */ new Set(), Gn(/* @__PURE__ */ new Set()), Xe.current = [], Sr([]);
        }, B = () => {
          nt();
          const St = Array.from(ao.current);
          Mr(!0), Q(), St.length > 0 && t.deleteNodes(St);
        }, Z = (St) => {
          St.key === "Escape" && (nt(), Mr(!0), Q());
        }, nt = () => {
          a().removeEventListener("pointermove", Y), a().removeEventListener("pointerup", B), a().removeEventListener("keydown", Z);
        };
        a().addEventListener("pointermove", Y), a().addEventListener("pointerup", B), a().addEventListener("keydown", Z);
      } else if (t.mode === "laser") {
        if (v.button !== 0) return;
        const E = 1560;
        er.current !== null && (cancelAnimationFrame(er.current), er.current = null);
        const F = performance.now();
        Me.current.length > 0 && Me.current.push([NaN, NaN, F]), Me.current.push([z, O, F]), Ur([...Me.current]), t.notifyLaserProgress([[z, O]]);
        let L = F;
        const R = () => {
          const Y = performance.now(), Q = Me.current.length;
          Me.current = Me.current.filter(
            (B) => Y - B[2] < E
          ), (Me.current.length !== Q || Me.current.length > 0) && Ur([...Me.current]), Y - L >= 60 && (L = Y, Me.current.length > 0 && t.notifyLaserProgress(
            Me.current.map((B) => [B[0], B[1]])
          )), Me.current.length > 0 ? er.current = requestAnimationFrame(R) : (er.current = null, Ur([]), t.notifyLaserEnd());
        };
        er.current = requestAnimationFrame(R);
        const j = (Y) => {
          const { x: Q, y: B } = t.screenToCanvas(Y.clientX, Y.clientY), Z = performance.now();
          Me.current.push([Q, B, Z]), Ur([...Me.current]), t.notifyLaserProgress(
            Me.current.map((nt) => [nt[0], nt[1]])
          );
        }, U = () => {
          a().removeEventListener("pointermove", j), a().removeEventListener("pointerup", U);
        };
        a().addEventListener("pointermove", j), a().addEventListener("pointerup", U);
      } else if (t.mode === "hand") {
        if (v.button !== 0) return;
        v.preventDefault();
        const E = t.viewport.x, F = t.viewport.y, L = v.clientX, R = v.clientY, j = d.current;
        j && (j.style.cursor = "grabbing");
        const U = (Q) => {
          t.viewport.x = E + (Q.clientX - L), t.viewport.y = F + (Q.clientY - R), u({ ...t.viewport });
        }, Y = () => {
          j && (j.style.cursor = t.lassoSelect ? nr : hn(t.mode)), a().removeEventListener("pointermove", U), a().removeEventListener("pointerup", Y);
        };
        a().addEventListener("pointermove", U), a().addEventListener("pointerup", Y);
      }
    },
    [
      t,
      Mi,
      Jr,
      Qo,
      Qr,
      de,
      mt,
      T,
      le,
      yt
    ]
  ), jn = ct(
    (v, H, z) => {
      if (z.preventDefault(), t.presentationMode) return;
      const O = t.getNode(v);
      if (!O || O.locked) return;
      const E = z.clientX, F = z.clientY, L = O.x, R = O.y, j = O.w, U = O.h === "auto", Y = U ? mt[v] ?? 100 : O.h, Q = O.type === "draw" ? O.data.points.map(
        (Tt) => [...Tt]
      ) : null, B = O.type === "shape" ? O.data.startPoint : void 0, Z = O.type === "shape" ? O.data.endPoint : void 0, nt = O.type === "text" ? O.data.fontSize : 0;
      let St = !1;
      const zt = (Tt) => {
        const Rt = (Tt.clientX - E) / t.viewport.zoom, ne = (Tt.clientY - F) / t.viewport.zoom;
        St || (St = !0, t.pushHistorySnapshot());
        let Jt = L, It = R, Ht = j, bt = Y;
        if ((H === "nw" || H === "w" || H === "sw") && (Jt = L + Rt, Ht = j - Rt), (H === "ne" || H === "e" || H === "se") && (Ht = j + Rt), (H === "nw" || H === "n" || H === "ne") && (It = R + ne, bt = Y - ne), (H === "sw" || H === "s" || H === "se") && (bt = Y + ne), t.snapToGrid && !(Tt.metaKey || Tt.ctrlKey)) {
          const Wt = t.gridSize, Ot = (fe) => Math.round(fe / Wt) * Wt;
          (H === "nw" || H === "w" || H === "sw") && (Jt = Ot(Jt), Ht = L + j - Jt), (H === "ne" || H === "e" || H === "se") && (Ht = Ot(Jt + Ht) - Jt), (H === "nw" || H === "n" || H === "ne") && (It = Ot(It), bt = R + Y - It), (H === "sw" || H === "s" || H === "se") && (bt = Ot(It + bt) - It);
        }
        let Et = 10, Zt = 10;
        if (O.type === "legacy-voicenote" ? (Et = 260, Zt = 120) : O.type === "legacy-canvas-link" && (Et = 220, Zt = 86), Ht < Et && (Ht = Et, (H === "nw" || H === "w" || H === "sw") && (Jt = L + j - Et)), bt < Zt && (bt = Zt, (H === "nw" || H === "n" || H === "ne") && (It = R + Y - Zt)), Tt.shiftKey && !(O.type === "frame" && O.data.devicePreset)) {
          const Wt = As(
            H,
            L,
            R,
            j,
            Y,
            Jt,
            It,
            Ht,
            bt
          );
          Jt = Wt.x, It = Wt.y, Ht = Wt.w, bt = Wt.h;
        }
        if (O.type === "frame") {
          const Wt = O.data.devicePreset;
          if (Wt) {
            const Ot = Vs(Wt);
            if (Ot) {
              const fe = tc(Ot);
              if (H === "nw" || H === "ne" || H === "sw" || H === "se" || (H === "e" || H === "w")) {
                const ue = Math.round(Ht / fe);
                (H === "nw" || H === "ne") && (It = R + Y - ue), bt = ue;
              } else
                Ht = Math.round(bt * fe);
            }
          }
        }
        const Bt = {
          x: Jt,
          y: It,
          w: Ht,
          h: U ? "auto" : bt
        };
        if (Q && O.type === "draw") {
          const Wt = j > 0 ? Ht / j : 1, Ot = Y > 0 ? bt / Y : 1, fe = Q.map(
            ([Gt, pe, ue]) => [Gt * Wt, pe * Ot, ue]
          );
          Bt.data = { ...O.data, points: fe };
        }
        if (O.type === "shape" && (B || Z)) {
          const Wt = j > 0 ? Ht / j : 1, Ot = Y > 0 ? bt / Y : 1, fe = { ...O.data };
          B && (fe.startPoint = [
            B[0] * Wt,
            B[1] * Ot
          ]), Z && (fe.endPoint = [
            Z[0] * Wt,
            Z[1] * Ot
          ]), Bt.data = fe;
        }
        if (O.type === "text" && nt > 0 && H !== "e" && H !== "w") {
          const Wt = H === "n" || H === "s" ? Y > 0 ? bt / Y : 1 : j > 0 ? Ht / j : 1, Ot = Math.max(8, Math.round(nt * Wt));
          Bt.data = { ...O.data, fontSize: Ot };
        }
        t.updateNode(v, Bt);
      }, Dt = () => {
        a().removeEventListener("pointermove", zt), a().removeEventListener("pointerup", Dt), t.isContainerType(O.type) && t.syncFrameChildrenAfterResize(v);
      };
      a().addEventListener("pointermove", zt), a().addEventListener("pointerup", Dt);
    },
    [t, mt]
  ), mc = ct(
    (v, H) => {
      H.stopPropagation(), H.preventDefault();
      const z = t.getNode(v);
      if (!z || z.locked) return;
      const O = z.h === "auto" ? mt[v] ?? 100 : z.h, E = z.x + z.w / 2, F = z.y + O / 2, L = z.rotation || 0, { x: R, y: j } = t.screenToCanvas(
        H.clientX,
        H.clientY
      ), U = Math.atan2(j - F, R - E);
      let Y = !1;
      const Q = (Z) => {
        Y || (Y = !0, t.pushHistorySnapshot());
        const { x: nt, y: St } = t.screenToCanvas(Z.clientX, Z.clientY), zt = Math.atan2(St - F, nt - E);
        let Dt = L + (zt - U) * (180 / Math.PI);
        (Z.shiftKey || t.snapToGrid) && !(Z.metaKey || Z.ctrlKey) && (Dt = Math.round(Dt / 15) * 15), t.updateNode(v, { rotation: Dt });
      }, B = () => {
        a().removeEventListener("pointermove", Q), a().removeEventListener("pointerup", B);
      };
      a().addEventListener("pointermove", Q), a().addEventListener("pointerup", B);
    },
    [t, mt]
  ), Ci = ct(
    (v, H, z) => {
      z.stopPropagation(), z.preventDefault();
      const O = t.getNode(v);
      if (!O) return;
      const { x: E, y: F } = t.screenToCanvas(z.clientX, z.clientY), L = t.freeFormEdges, R = L ? We(O, E, F, mt).t : void 0;
      Ft({
        fromNode: O,
        cursorX: E,
        cursorY: F,
        sourceHandle: L ? void 0 : H,
        sourceT: R,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid",
        edgeType: t.activeTool.edgeType,
        attachmentGap: t.activeTool.attachmentGap
      });
      const j = (Y) => {
        const { x: Q, y: B } = t.screenToCanvas(Y.clientX, Y.clientY);
        Ft(
          (Z) => Z ? { ...Z, cursorX: Q, cursorY: B } : null
        );
      }, U = (Y) => {
        a().removeEventListener("pointermove", j), a().removeEventListener("pointerup", U), Ft(null);
        const { x: Q, y: B } = t.screenToCanvas(Y.clientX, Y.clientY);
        let Z = t.hitTest(Q, B, mt);
        if (!Z || Z.type === "edge" || t.isContainerType(Z.type)) {
          const Tt = 50 / t.viewport.zoom;
          let Rt = 1 / 0, ne = !1, Jt = null;
          for (const It of t.getAllNodes()) {
            if (It.type === "edge" || It.id === O.id) continue;
            const Ht = t.isContainerType(It.type), bt = We(It, Q, B, mt), Et = Math.hypot(bt.x - Q, bt.y - B);
            Et >= Tt || Ht && !ne && Jt || (!Ht && ne || Et < Rt) && (Rt = Et, ne = Ht, Jt = It);
          }
          Jt && (Z = Jt);
        }
        if (!Z || Z.type === "edge" || Z.id === O.id)
          return;
        const nt = L ? void 0 : en(Z, Q, B, mt), St = L ? We(Z, Q, B, mt).t : void 0;
        if (t.getAllNodes().some((Tt) => {
          if (Tt.type !== "edge") return !1;
          const Rt = Tt.data;
          return L ? Rt.fromId === O.id && Rt.toId === Z.id && Rt.sourceT !== void 0 && Rt.targetT !== void 0 && Math.abs(Rt.sourceT - R) < 0.02 && Math.abs(Rt.targetT - St) < 0.02 : ds(Rt, {
            fromId: O.id,
            toId: Z.id,
            sourceHandle: H,
            targetHandle: nt
          });
        })) return;
        const Dt = {
          id: Pt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: O.id,
            toId: Z.id,
            style: t.activeTool.strokeStyle || "solid",
            color: t.activeTool.color,
            strokeWidth: t.activeTool.width || 2,
            arrowHead: t.activeTool.arrowHead ?? "arrow",
            arrowTail: t.activeTool.arrowTail ?? "none",
            edgeType: t.activeTool.edgeType ?? "bezier",
            roughness: t.activeTool.roughness ?? 0,
            attachmentGap: t.activeTool.attachmentGap,
            sourceHandle: L ? void 0 : H,
            targetHandle: nt,
            sourceT: R,
            targetT: St
          }
        };
        t.addNode(Dt);
      };
      a().addEventListener("pointermove", j), a().addEventListener("pointerup", U);
    },
    [t, mt]
  ), gc = ct(
    (v) => {
      let H = null, z = v === "top" || v === "left" ? 1 / 0 : -1 / 0;
      for (const O of t.selection) {
        const E = t.getNode(O);
        if (!E || E.type === "edge") continue;
        const F = E.h === "auto" ? mt[E.id] ?? 100 : E.h;
        let L;
        switch (v) {
          case "top":
            L = E.y;
            break;
          case "bottom":
            L = E.y + F;
            break;
          case "left":
            L = E.x;
            break;
          case "right":
            L = E.x + E.w;
            break;
        }
        (v === "top" || v === "left" ? L < z : L > z) && (z = L, H = O);
      }
      return H;
    },
    [t, mt]
  ), bc = ct(
    (v, H, z, O) => {
      var B;
      O.stopPropagation(), O.preventDefault();
      const E = t.getNode(v);
      if (!E || !o) return;
      const F = o.get(E.type), L = (B = F == null ? void 0 : F.ports) == null ? void 0 : B.find((Z) => Z.id === H);
      if (!L) return;
      const R = z === "input" ? "left" : "right", { x: j, y: U } = t.screenToCanvas(O.clientX, O.clientY);
      Ft({
        fromNode: E,
        cursorX: j,
        cursorY: U,
        sourceHandle: R,
        sourcePort: H,
        sourceDirection: z,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid",
        edgeType: t.activeTool.edgeType,
        attachmentGap: t.activeTool.attachmentGap
      });
      const Y = (Z) => {
        const { x: nt, y: St } = t.screenToCanvas(Z.clientX, Z.clientY);
        Ft(
          (zt) => zt ? { ...zt, cursorX: nt, cursorY: St } : null
        );
      }, Q = (Z) => {
        var pe;
        a().removeEventListener("pointermove", Y), a().removeEventListener("pointerup", Q), Ft(null);
        const { x: nt, y: St } = t.screenToCanvas(Z.clientX, Z.clientY), zt = z === "output" ? "input" : "output", Dt = qs / t.viewport.zoom;
        let Tt = null, Rt = null, ne = 1 / 0;
        for (const ue of t.getAllNodes()) {
          if (ue.type === "edge" || ue.id === E.id) continue;
          const me = o.get(ue.type);
          if ((pe = me == null ? void 0 : me.ports) != null && pe.length)
            for (const Ce of me.ports) {
              if (Ce.direction !== zt || L.dataType !== "any" && Ce.dataType !== "any" && L.dataType !== Ce.dataType) continue;
              const Te = Ae(
                ue,
                me.ports,
                Ce.id,
                t.viewport.zoom,
                t.measuredHeights,
                me.portAnchor ?? "bbox"
              );
              if (!Te) continue;
              const eo = Math.hypot(Te.x - nt, Te.y - St);
              eo < Dt && eo < ne && (ne = eo, Tt = ue, Rt = Ce);
            }
        }
        if (!Tt || !Rt) return;
        const Jt = Rt.id, It = z === "output" ? Tt.id : E.id, Ht = z === "output" ? Jt : H;
        if (t.getAllNodes().some((ue) => {
          if (ue.type !== "edge") return !1;
          const me = ue.data;
          return me.toId === It && me.targetPort === Ht;
        })) return;
        const Et = z === "output" ? E.id : Tt.id, Zt = z === "output" ? Tt.id : E.id, Bt = z === "output" ? H : Jt, Wt = z === "output" ? Jt : H, Gt = {
          id: Pt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Et,
            toId: Zt,
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
        t.addNode(Gt), t.select(Gt.id);
      };
      a().addEventListener("pointermove", Y), a().addEventListener("pointerup", Q);
    },
    [t, o, mt]
  ), [$r, xc] = rt(0);
  Mt(() => {
    if (r)
      return r.onChange(() => xc((v) => v + 1));
  }, [r]);
  const wc = ct(
    (v) => r == null ? void 0 : r.getLastComputeMs(v),
    [r, $r]
  ), vc = ct(
    (v, H) => r ? r.getPortValue(v, H) : null,
    [r, $r]
  ), kc = ct(
    (v, H, z, O, E) => {
      E.stopPropagation(), E.preventDefault();
      const F = t.getNode(v);
      if (!F || F.type !== "edge") return;
      let L = !1;
      const R = (U) => {
        L || (L = !0, t.pushHistorySnapshot());
        const Y = t.screenToCanvas(U.clientX, U.clientY), Q = t.getNode(v);
        if (!Q) return;
        const B = t.getNode(Q.data.fromId), Z = t.getNode(Q.data.toId);
        if (!(!B || !Z))
          if (H === "xy") {
            const nt = Ee(
              B,
              Z,
              Q.data.edgeType || "bezier",
              mt,
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
            if (!nt.kinkHandle) return;
            const St = Y.x - nt.kinkHandle.x, zt = Y.y - nt.kinkHandle.y;
            t.updateNode(v, {
              data: { ...Q.data, curveOffset: [St, zt] }
            });
          } else {
            const nt = H === "x" ? Y.x : Y.y, St = Ee(
              B,
              Z,
              Q.data.edgeType || "bezier",
              mt,
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
            if (!St.kinkHandle) return;
            const zt = St.kinkHandle.min, Dt = St.kinkHandle.max, Tt = Dt - zt;
            if (Tt === 0) return;
            const ne = (Math.max(zt, Math.min(Dt, nt)) - zt) / Tt;
            t.updateNode(v, {
              data: { ...Q.data, midpointOffset: ne }
            });
          }
      }, j = () => {
        a().removeEventListener("pointermove", R), a().removeEventListener("pointerup", j);
      };
      a().addEventListener("pointermove", R), a().addEventListener("pointerup", j);
    },
    [t, mt]
  ), Sc = ct(
    (v, H, z) => {
      z.stopPropagation(), z.preventDefault();
      const O = t.getNode(v);
      if (!O || O.type !== "edge") return;
      const { fromId: E, toId: F, sourceHandle: L, targetHandle: R } = O.data, j = H === "source" ? F : E, U = H === "source" ? R : L, Y = t.getNode(E), Q = t.getNode(F);
      if (!Y || !Q) return;
      const B = Ee(
        Y,
        Q,
        O.data.edgeType || "bezier",
        mt,
        L,
        R,
        void 0,
        void 0,
        void 0,
        void 0,
        O.data.sourceT,
        O.data.targetT,
        O.data.attachmentGap
      ), Z = H === "source" ? { x: B.x1, y: B.y1 } : { x: B.x2, y: B.y2 };
      Qt({
        edgeId: v,
        endpoint: H,
        anchorNodeId: j,
        anchorHandle: U,
        cursorX: Z.x,
        cursorY: Z.y
      });
      const nt = (zt) => {
        const { x: Dt, y: Tt } = t.screenToCanvas(zt.clientX, zt.clientY);
        Qt(
          (Rt) => Rt ? { ...Rt, cursorX: Dt, cursorY: Tt } : null
        );
      }, St = (zt) => {
        a().removeEventListener("pointermove", nt), a().removeEventListener("pointerup", St), Qt(null);
        const { x: Dt, y: Tt } = t.screenToCanvas(zt.clientX, zt.clientY);
        let Rt = t.hitTest(Dt, Tt, mt);
        if (!Rt || Rt.type === "edge" || t.isContainerType(Rt.type)) {
          const Ot = 50 / t.viewport.zoom;
          let fe = 1 / 0, Gt = !1, pe = null;
          for (const ue of t.getAllNodes()) {
            if (ue.type === "edge") continue;
            const me = t.isContainerType(ue.type), Ce = We(ue, Dt, Tt, mt), Te = Math.hypot(Ce.x - Dt, Ce.y - Tt);
            Te >= Ot || me && !Gt && pe || (!me && Gt || Te < fe) && (fe = Te, Gt = me, pe = ue);
          }
          pe && (Rt = pe);
        }
        if (!Rt || Rt.type === "edge") return;
        const ne = H === "source" ? Rt.id : E, Jt = H === "target" ? Rt.id : F;
        if (ne === Jt) return;
        const It = H === "source" ? E : F;
        if (Rt.id === It) return;
        const Ht = O.data.sourceT !== void 0 || O.data.targetT !== void 0, bt = Ht ? void 0 : en(Rt, Dt, Tt, mt), Et = Ht ? We(Rt, Dt, Tt, mt).t : void 0, Zt = H === "source" ? {
          fromId: ne,
          toId: Jt,
          sourceHandle: bt ?? L,
          targetHandle: R,
          sourcePort: O.data.sourcePort,
          targetPort: O.data.targetPort
        } : {
          fromId: ne,
          toId: Jt,
          sourceHandle: L,
          targetHandle: bt ?? R,
          sourcePort: O.data.sourcePort,
          targetPort: O.data.targetPort
        };
        if (t.getAllNodes().some((Ot) => Ot.type !== "edge" || Ot.id === v ? !1 : ds(Ot.data, Zt))) return;
        let Wt;
        Ht ? Wt = H === "source" ? { fromId: Rt.id, sourceT: Et, sourceHandle: void 0 } : { toId: Rt.id, targetT: Et, targetHandle: void 0 } : Wt = H === "source" ? { fromId: Rt.id, sourceHandle: bt } : { toId: Rt.id, targetHandle: bt }, t.updateNodeWithHistory(v, { data: Wt });
      };
      a().addEventListener("pointermove", nt), a().addEventListener("pointerup", St);
    },
    [t, mt]
  ), Mc = ct(
    (v) => {
      if (v.stopPropagation(), v.preventDefault(), t.presentationMode) return;
      const H = Array.from(t.selection).map((Et) => t.getNode(Et)).filter(Boolean);
      if (H.length < 2) return;
      const O = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, E = O ? t.groupRotations.get(O) : null;
      let F, L;
      if (E)
        F = E.cx, L = E.cy;
      else {
        let Et = 1 / 0, Zt = 1 / 0, Bt = -1 / 0, Wt = -1 / 0;
        for (const Ot of H) {
          const fe = Ot.h === "auto" ? mt[Ot.id] ?? 100 : Ot.h, Gt = T(Ot, fe);
          Et = Math.min(Et, Gt.minX), Zt = Math.min(Zt, Gt.minY), Bt = Math.max(Bt, Gt.maxX), Wt = Math.max(Wt, Gt.maxY);
        }
        F = (Et + Bt) / 2, L = (Zt + Wt) / 2;
      }
      const R = (E == null ? void 0 : E.angle) ?? 0, U = H.filter((Et) => !Et.locked).map((Et) => {
        const Zt = Et.h === "auto" ? mt[Et.id] ?? 100 : Et.h;
        return {
          id: Et.id,
          cx: Et.x + Et.w / 2,
          cy: Et.y + Zt / 2,
          w: Et.w,
          h: Zt,
          rotation: Et.rotation || 0
        };
      }), Y = -R * Math.PI / 180, Q = Math.cos(Y), B = Math.sin(Y);
      let Z = 1 / 0, nt = 1 / 0, St = -1 / 0, zt = -1 / 0;
      for (const Et of U) {
        const Zt = Et.cx - F, Bt = Et.cy - L, Wt = F + Zt * Q - Bt * B, Ot = L + Zt * B + Bt * Q;
        Z = Math.min(Z, Wt - Et.w / 2), nt = Math.min(nt, Ot - Et.h / 2), St = Math.max(St, Wt + Et.w / 2), zt = Math.max(zt, Ot + Et.h / 2);
      }
      const Dt = {
        x: Z - lt,
        y: nt - lt,
        w: St - Z + lt * 2,
        h: zt - nt + lt * 2
      }, { x: Tt, y: Rt } = t.screenToCanvas(v.clientX, v.clientY), ne = Math.atan2(Rt - L, Tt - F);
      let Jt = !1, It = R;
      const Ht = (Et) => {
        Jt || (Jt = !0, t.pushHistorySnapshot());
        const { x: Zt, y: Bt } = t.screenToCanvas(Et.clientX, Et.clientY);
        let Ot = (Math.atan2(Bt - L, Zt - F) - ne) * (180 / Math.PI);
        (Et.shiftKey || t.snapToGrid) && !(Et.metaKey || Et.ctrlKey) && (Ot = Math.round(Ot / 15) * 15), It = R + Ot, jr({ angle: It, cx: F, cy: L, bounds: Dt });
        const fe = Ot * Math.PI / 180, Gt = Math.cos(fe), pe = Math.sin(fe), ue = U.map((me) => {
          const Ce = me.cx - F, Te = me.cy - L, eo = F + Ce * Gt - Te * pe, Cr = L + Ce * pe + Te * Gt;
          return {
            id: me.id,
            patch: {
              x: eo - me.w / 2,
              y: Cr - me.h / 2,
              rotation: It
            }
          };
        });
        t.updateMany(ue);
      }, bt = () => {
        O && t.groupRotations.set(O, { angle: It, cx: F, cy: L }), jr({ angle: It, cx: F, cy: L, bounds: Dt }), a().removeEventListener("pointermove", Ht), a().removeEventListener("pointerup", bt);
      };
      a().addEventListener("pointermove", Ht), a().addEventListener("pointerup", bt);
    },
    [t, mt, T]
  ), Cc = ct(
    (v, H) => {
      if (H.stopPropagation(), H.preventDefault(), t.presentationMode) return;
      const z = Array.from(t.selection).map((bt) => t.getNode(bt)).filter(Boolean);
      if (z.length < 2) return;
      const O = (bt) => bt.h === "auto" ? mt[bt.id] ?? 100 : bt.h;
      let E = 1 / 0, F = 1 / 0, L = -1 / 0, R = -1 / 0;
      for (const bt of z) {
        const Et = O(bt), Zt = T(bt, Et);
        E = Math.min(E, Zt.minX), F = Math.min(F, Zt.minY), L = Math.max(L, Zt.maxX), R = Math.max(R, Zt.maxY);
      }
      const j = { x: E, y: F, w: L - E, h: R - F }, U = j.w || 1, Y = j.h || 1, B = z.filter((bt) => !bt.locked).map((bt) => {
        const Et = O(bt);
        return {
          id: bt.id,
          type: bt.type,
          isAutoH: bt.h === "auto",
          relX: (bt.x - j.x) / U,
          relY: (bt.y - j.y) / Y,
          relW: bt.w / U,
          relH: Et / Y,
          origW: bt.w,
          origH: Et,
          origPoints: bt.type === "draw" ? bt.data.points.map((Zt) => [...Zt]) : null,
          drawData: bt.type === "draw" ? { ...bt.data } : null,
          origFontSize: bt.type === "text" ? bt.data.fontSize : 0,
          textData: bt.type === "text" ? { ...bt.data } : null
        };
      }), Z = H.clientX, nt = H.clientY;
      let St = !1, zt = null, Dt = Z, Tt = nt, Rt = !1, ne = H.shiftKey;
      const Jt = () => {
        zt = null;
        const bt = (Dt - Z) / t.viewport.zoom, Et = (Tt - nt) / t.viewport.zoom;
        !St && (bt !== 0 || Et !== 0) && (St = !0, t.pushHistorySnapshot());
        let Zt = j.x, Bt = j.y, Wt = j.w, Ot = j.h;
        if ((v === "nw" || v === "w" || v === "sw") && (Zt = j.x + bt, Wt = j.w - bt), (v === "ne" || v === "e" || v === "se") && (Wt = j.w + bt), (v === "nw" || v === "n" || v === "ne") && (Bt = j.y + Et, Ot = j.h - Et), (v === "sw" || v === "s" || v === "se") && (Ot = j.h + Et), t.snapToGrid && !Rt) {
          const Gt = t.gridSize, pe = (ue) => Math.round(ue / Gt) * Gt;
          (v === "nw" || v === "w" || v === "sw") && (Zt = pe(Zt), Wt = j.x + j.w - Zt), (v === "ne" || v === "e" || v === "se") && (Wt = pe(Zt + Wt) - Zt), (v === "nw" || v === "n" || v === "ne") && (Bt = pe(Bt), Ot = j.y + j.h - Bt), (v === "sw" || v === "s" || v === "se") && (Ot = pe(Bt + Ot) - Bt);
        }
        if (Wt < 20 && (Wt = 20, (v === "nw" || v === "w" || v === "sw") && (Zt = j.x + j.w - 20)), Ot < 20 && (Ot = 20, (v === "nw" || v === "n" || v === "ne") && (Bt = j.y + j.h - 20)), ne && j.w > 0 && j.h > 0) {
          const Gt = As(
            v,
            j.x,
            j.y,
            j.w,
            j.h,
            Zt,
            Bt,
            Wt,
            Ot
          );
          Zt = Gt.x, Bt = Gt.y, Wt = Gt.w, Ot = Gt.h;
        }
        const fe = B.map((Gt) => {
          const pe = Zt + Gt.relX * Wt, ue = Bt + Gt.relY * Ot, me = Gt.relW * Wt, Ce = Gt.relH * Ot, Te = {
            x: pe,
            y: ue,
            w: me,
            h: Gt.isAutoH ? "auto" : Ce
          };
          if (Gt.origPoints && Gt.drawData) {
            const eo = Gt.origW > 0 ? me / Gt.origW : 1, Cr = Gt.origH > 0 ? Ce / Gt.origH : 1;
            Te.data = {
              ...Gt.drawData,
              points: Gt.origPoints.map(
                ([Ec, Pc, Hc]) => [Ec * eo, Pc * Cr, Hc]
              )
            };
          }
          if (Gt.type === "text" && Gt.origFontSize > 0 && Gt.textData && v !== "e" && v !== "w") {
            const eo = v === "n" || v === "s" ? Gt.origH > 0 ? Ce / Gt.origH : 1 : Gt.origW > 0 ? me / Gt.origW : 1, Cr = Math.max(8, Math.round(Gt.origFontSize * eo));
            Te.data = { ...Gt.textData, fontSize: Cr };
          }
          return { id: Gt.id, patch: Te };
        });
        t.updateMany(fe);
      }, It = (bt) => {
        Dt = bt.clientX, Tt = bt.clientY, Rt = bt.metaKey || bt.ctrlKey, ne = bt.shiftKey, zt === null && (zt = requestAnimationFrame(Jt));
      }, Ht = () => {
        zt !== null && (cancelAnimationFrame(zt), Jt()), a().removeEventListener("pointermove", It), a().removeEventListener("pointerup", Ht);
        for (const bt of z)
          t.isContainerType(bt.type) && t.syncFrameChildrenAfterResize(bt.id);
      };
      a().addEventListener("pointermove", It), a().addEventListener("pointerup", Ht);
    },
    [t, mt, T]
  );
  Mt(() => {
    d.current && (d.current.style.cursor = t.lassoSelect ? nr : hn(k)), k !== "select" && k !== "edge" && (vr.current = null, Nn(null)), k !== "erase" && (lo.current !== null && (cancelAnimationFrame(lo.current), lo.current = null), ao.current = /* @__PURE__ */ new Set(), Gn(/* @__PURE__ */ new Set()), Xe.current = [], Sr([]), t.notifyEraserEnd());
  }, [k, t]);
  const Zn = ft(null), Ii = ft(null), Ic = ct(
    (v) => {
      if (ut.current && v.pointerType === "touch" && gt.current) {
        const H = v.clientX - gt.current.clientX, z = v.clientY - gt.current.clientY;
        Math.sqrt(H * H + z * z) > 8 && (clearTimeout(ut.current), ut.current = null, gt.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (Ii.current = { clientX: v.clientX, clientY: v.clientY }, Zn.current === null && (Zn.current = requestAnimationFrame(() => {
        Zn.current = null;
        const H = d.current, z = Ii.current;
        if (!H || !z) return;
        const { x: O, y: E } = t.screenToCanvas(z.clientX, z.clientY);
        if (t.lassoSelect) {
          H.style.cursor = nr;
          return;
        }
        if (t.mode === "edge") {
          const R = 50 / t.viewport.zoom;
          let j = null, U = R;
          for (const Y of t.getAllNodes()) {
            if (Y.type === "edge") continue;
            const Q = We(Y, O, E, mt), B = Math.hypot(Q.x - O, Q.y - E);
            B < U && (U = B, j = Y.id);
          }
          j !== vr.current && (vr.current = j, Nn(j)), cc({ x: O, y: E });
          return;
        }
        if (t.selection.size >= 2 && de && O >= de.x && O <= de.x + de.w && E >= de.y && E <= de.y + de.h) {
          H.style.cursor = "move";
          return;
        }
        const F = t.hitTest(O, E, mt), L = F ? F.id : null;
        if (L !== vr.current && (vr.current = L, Nn(L)), F) {
          H.style.cursor = "move";
          return;
        }
        if (Ri(
          t.nodes,
          O,
          E,
          t.viewport.zoom,
          mt,
          $e
        )) {
          H.style.cursor = "move";
          return;
        }
        H.style.cursor = "default";
      })));
    },
    [t, de, mt, T, $e]
  ), Tc = ct((v) => {
    (v.dataTransfer.types.includes("Files") || v.dataTransfer.types.includes(Ws) || v.dataTransfer.types.includes(Fs) || v.dataTransfer.types.includes(Bs)) && (v.preventDefault(), v.dataTransfer.dropEffect = "copy");
  }, []), zc = ct(
    (v) => {
      if (v.preventDefault(), t.presentationMode) return;
      const H = v.dataTransfer.getData(Bs);
      if (H) {
        try {
          const B = JSON.parse(H);
          Nl(t, B, v.clientX, v.clientY);
        } catch (B) {
          console.error("Failed to place GIF:", B);
        }
        return;
      }
      const z = v.dataTransfer.getData(Fs);
      if (z) {
        try {
          const { itemId: B } = JSON.parse(z), nt = Rl().find((St) => St.id === B);
          nt && Wl(t, nt, v.clientX, v.clientY);
        } catch (B) {
          console.error("Failed to place personal library item:", B);
        }
        return;
      }
      const O = v.dataTransfer.getData(Ws);
      if (O) {
        try {
          const { libraryId: B, itemId: Z } = JSON.parse(O), St = ni(B).find((zt) => zt.id === Z);
          St && Dl(t, St, v.clientX, v.clientY);
        } catch (B) {
          console.error("Failed to place library item:", B);
        }
        return;
      }
      const E = v.dataTransfer.files[0];
      if (!E) return;
      const F = `${E.name}|${E.size}|${E.lastModified}|${Math.round(v.clientX)}|${Math.round(v.clientY)}`, L = performance.now(), R = c.current;
      if (R && R.sig === F && L - R.at < 150)
        return;
      c.current = { sig: F, at: L }, v.stopPropagation();
      const j = v.nativeEvent;
      if (typeof j.stopImmediatePropagation == "function" && j.stopImmediatePropagation(), E.name.endsWith(".excalidrawlib") || E.name.endsWith(".excalidrawlib.json")) {
        const B = new FileReader();
        B.onload = () => {
          try {
            const Z = JSON.parse(B.result);
            if (Z.type === "excalidrawlib") {
              const nt = E.name.replace(/\.excalidrawlib(\.json)?$/, "");
              si(Z, { name: nt });
            }
          } catch (Z) {
            console.error("Failed to import library:", Z);
          }
        }, B.readAsText(E);
        return;
      }
      if (E.type === "image/svg+xml" || E.name.endsWith(".svg")) {
        const B = new FileReader();
        B.onload = () => {
          const Z = B.result, nt = Ns(Z);
          nt && Tf(t, nt, v.clientX, v.clientY);
        }, B.readAsText(E);
        return;
      }
      if (!E.type.startsWith("image/")) return;
      const { x: U, y: Y } = t.screenToCanvas(v.clientX, v.clientY), Q = new FileReader();
      Q.onload = () => {
        const B = Q.result, Z = new Image();
        Z.onload = () => {
          const nt = Math.min(Z.naturalWidth, 400), St = Math.min(Z.naturalHeight, 300), zt = Z.naturalWidth / Z.naturalHeight, Dt = zt >= 1 ? nt : St * zt, Tt = zt >= 1 ? nt / zt : St;
          t.addNode({
            id: Pt(10),
            type: "image",
            x: U,
            y: Y,
            w: Dt,
            h: Tt,
            z: t.nextZ(),
            data: { src: B }
          });
        }, Z.src = B;
      }, Q.readAsDataURL(E);
    },
    [t]
  ), Ac = `translate(${p.x}px, ${p.y}px) scale(${p.zoom})`, Kn = P.activeIndex >= 0 ? ((zi = P.matches[P.activeIndex]) == null ? void 0 : zi.nodeId) ?? null : null, Ti = Kt(() => {
    if (!P.query || P.matches.length === 0) return /* @__PURE__ */ new Set();
    const v = /* @__PURE__ */ new Set();
    for (const H of P.matches)
      H.nodeType !== "edge" && v.add(H.nodeId);
    return v;
  }, [P]);
  return zo(() => {
    const v = d.current;
    if (w || !v || !P.query || P.matches.length === 0) {
      et((L) => L.length === 0 ? L : []);
      return;
    }
    const H = v.getBoundingClientRect(), z = P.query.toLocaleLowerCase(), O = Array.from(new Set(P.matches.map((L) => L.nodeId))), E = [], F = 900;
    for (const L of O) {
      if (E.length >= F) break;
      const R = L.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), j = v.querySelector(`[data-node-id="${R}"]`);
      if (!j) continue;
      const U = document.createTreeWalker(
        j,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(Q) {
            const B = Q.parentElement;
            return !B || B.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']") || !Q.nodeValue || !Q.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let Y = U.nextNode();
      for (; Y && E.length < F; ) {
        const Q = Y, Z = (Q.nodeValue ?? "").toLocaleLowerCase();
        let nt = 0;
        for (; nt <= Z.length - z.length && E.length < F; ) {
          const St = Z.indexOf(z, nt);
          if (St < 0) break;
          const zt = document.createRange();
          zt.setStart(Q, St), zt.setEnd(Q, St + z.length);
          const Dt = zt.getClientRects();
          for (const Tt of Dt)
            Tt.width <= 0 || Tt.height <= 0 || E.push({
              x: Tt.left - H.left,
              y: Tt.top - H.top,
              w: Tt.width,
              h: Tt.height,
              active: L === Kn
            });
          nt = St + z.length;
        }
        Y = U.nextNode();
      }
    }
    et((L) => L.length === E.length && L.every((R, j) => {
      const U = E[j];
      return R.x === U.x && R.y === U.y && R.w === U.w && R.h === U.h && R.active === U.active;
    }) ? L : E);
  }, [P, m, p, Kn, w]), /* @__PURE__ */ h(gr.Provider, { value: st, children: /* @__PURE__ */ S(
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
        background: Or(J).canvasBg
      },
      onPointerDown: yc,
      onPointerMove: Ic,
      onDoubleClick: pc,
      onContextMenu: fc,
      onDragOver: Tc,
      onDrop: zc,
      children: [
        /* @__PURE__ */ h(qu, { viewport: p, gridSize: wt, background: J, gridVisible: it }),
        /* @__PURE__ */ S(
          Ap,
          {
            safariWebKitWorkaround: zf(),
            viewport: p,
            viewportTransform: Ac,
            children: [
              uc.sort((v, H) => v.z - H.z).map((v) => {
                var L;
                const H = Xn.has(v.id), z = dc.has(v.id), E = -(v.id.split("").reduce((R, j) => R + j.charCodeAt(0), 0) % 240 / 100);
                let F;
                if (o) {
                  const R = o.get(v.type);
                  if (R) {
                    const j = R.component, U = x.has(v.id) && k !== "edge", Y = !t.readOnly && (k === "select" || k === "text" || k === "note" || k === "sticky"), Q = /* @__PURE__ */ h(
                      j,
                      {
                        node: v,
                        data: v.data,
                        isSelected: U,
                        multiSelected: x.size > 1 && U && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: Y,
                        zoom: p.zoom,
                        editing: xi === v.id,
                        cropping: to === v.id,
                        editClickPos: xi === v.id ? On.current : null,
                        callbacks: {
                          onMeasuredHeight: he,
                          // drop resize-handle starts in readOnly. The
                          // canvas selection-frame is hidden in that mode but a
                          // node-internal resize handle (if any) shouldn't fire
                          // either.
                          onResizeHandleDown: t.readOnly ? void 0 : jn,
                          onEditStart: (B) => {
                            if (t.readOnly) return;
                            const Z = t.getNode(B);
                            Z && (Z.type === "text" ? Ro(B) : Z.type === "sticky" ? Do(B) : Z.type === "frame" ? $o(B) : Z.type === "shape" ? _o(B) : Z.type === "image" ? tr(B) : Z.type === "youtube" && bi(B));
                          },
                          onEditEnd: () => {
                            v.type === "text" ? Ro((B) => {
                              if (B !== v.id) return B;
                              const Z = Kr.current;
                              return Z && Z.id === B && performance.now() < Z.until ? B : null;
                            }) : v.type === "sticky" ? Do((B) => B === v.id ? null : B) : v.type === "frame" ? $o((B) => B === v.id ? null : B) : v.type === "shape" ? _o((B) => B === v.id ? null : B) : v.type === "image" ? tr((B) => B === v.id ? null : B) : v.type === "youtube" && bi((B) => B === v.id ? null : B);
                          }
                        },
                        portValues: r && ((L = R.ports) != null && L.length) && $r >= 0 ? r.getAllPortValues(v.id) : void 0,
                        updateData: (B) => {
                          const Z = st();
                          t.updateNodeWithHistoryCoalesced(
                            v.id,
                            {
                              data: { ...v.data, ...B }
                            },
                            `${Z}:registry:${v.id}`
                          );
                        }
                      },
                      R.handlesOwnLayout ? v.id : void 0
                    );
                    R.handlesOwnLayout ? F = Q : F = /* @__PURE__ */ h(
                      Tp,
                      {
                        node: v,
                        isInteractive: Y,
                        measuredH: mt[v.id],
                        onMeasuredHeight: he,
                        observeElement: Be,
                        unobserveElement: br,
                        isContainer: R.isContainer,
                        children: Q
                      },
                      v.id
                    );
                  }
                } else if (v.type === "content") {
                  const R = v;
                  F = /* @__PURE__ */ h(
                    Ja,
                    {
                      node: R,
                      isSelected: x.has(v.id) && k !== "edge",
                      multiSelected: x.size > 1 && x.has(v.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: k === "select" || k === "text" || k === "note",
                      zoom: p.zoom,
                      onMeasuredHeight: he,
                      autoEdit: wi.current === R.id
                    },
                    v.id
                  );
                } else if (v.type === "text")
                  F = /* @__PURE__ */ h(
                    dl,
                    {
                      node: v,
                      engine: t,
                      editing: Jo === v.id,
                      editClickPos: Jo === v.id ? On.current : null,
                      onStopEdit: () => {
                        if (Vn.current === v.id) {
                          Vn.current = null;
                          const R = t.getNode(v.id);
                          if (!R || !R.data.text.trim()) {
                            t.deleteNode(v.id), Ro((j) => j === v.id ? null : j);
                            return;
                          }
                        }
                        Ro((R) => R === v.id ? null : R);
                      },
                      onMeasuredHeight: he
                    },
                    v.id
                  );
                else if (v.type === "image")
                  F = /* @__PURE__ */ h(
                    cl,
                    {
                      node: v,
                      isSelected: x.has(v.id) && k !== "edge",
                      engine: t,
                      interactive: k === "select",
                      zoom: p.zoom,
                      onResizeHandleDown: jn,
                      cropping: to === v.id,
                      onCropStart: () => tr(v.id),
                      onCropEnd: () => tr(null)
                    },
                    v.id
                  );
                else if (v.type === "sticky")
                  F = /* @__PURE__ */ h(
                    hl,
                    {
                      node: v,
                      isSelected: x.has(v.id) && k !== "edge",
                      engine: t,
                      interactive: k === "select" || k === "sticky",
                      zoom: p.zoom,
                      editing: gi === v.id,
                      onEditStart: Do,
                      onEditEnd: () => Do(null)
                    },
                    v.id
                  );
                else if (v.type === "frame") {
                  const R = v, j = R.h === "auto" ? 100 : R.h;
                  F = /* @__PURE__ */ h(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: R.x,
                        top: R.y,
                        width: R.w,
                        height: j,
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
                      children: mi === v.id ? /* @__PURE__ */ h(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: R.data.label ?? "",
                          placeholder: l.frameLabelPlaceholder,
                          onBlur: (U) => {
                            const Y = U.currentTarget.value.trim();
                            t.updateNodeWithHistory(v.id, {
                              data: { ...R.data, label: Y || void 0 }
                            }), $o(null);
                          },
                          onKeyDown: (U) => {
                            (U.key === "Enter" || U.key === "Escape") && U.currentTarget.blur(), U.stopPropagation();
                          },
                          onPointerDown: (U) => U.stopPropagation(),
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
                          onDoubleClick: (U) => {
                            U.stopPropagation(), t.select(v.id), $o(v.id);
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
                    v.id
                  );
                } else {
                  const R = v;
                  R.type === "draw" ? F = /* @__PURE__ */ h(kn, { node: R }, v.id) : F = /* @__PURE__ */ h(kn, { node: R, editingLabel: kr === v.id }, v.id);
                }
                return H || z ? /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      opacity: H ? 0.25 : void 0,
                      filter: H ? "saturate(0)" : void 0,
                      animation: z ? "sb-node-bop 3.4s ease-in-out infinite" : void 0,
                      animationDelay: z ? `${E}s` : void 0,
                      transformOrigin: "center center",
                      willChange: z ? "transform" : void 0
                    },
                    children: F
                  },
                  v.id
                ) : F;
              }),
              Ti.size > 0 && Array.from(Ti).map((v) => {
                const H = t.getNode(v);
                if (!H || H.type === "edge") return null;
                const z = H.h === "auto" ? mt[H.id] ?? 100 : H.h, O = Kn === v;
                return /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: H.x - 5,
                      top: H.y - 5,
                      width: H.w + 10,
                      height: z + 10,
                      borderRadius: 10,
                      border: `2px solid ${O ? "#f59e0b" : "#60a5fa"}`,
                      boxShadow: O ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
                      pointerEvents: "none",
                      transform: H.rotation ? `rotate(${H.rotation}deg)` : void 0,
                      transformOrigin: "center center"
                    }
                  },
                  `search-highlight-${v}`
                );
              }),
              kr && (() => {
                const v = t.getNode(kr);
                if (!v || v.type !== "shape") return null;
                const H = v.data;
                return H.shape === "line" || H.shape === "arrow" ? null : /* @__PURE__ */ h(
                  zp,
                  {
                    node: v,
                    engine: t,
                    onDone: () => _o(null)
                  },
                  kr
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ h(
          Df,
          {
            nodes: xr,
            viewport: p,
            selection: x,
            measuredHeights: mt,
            activeStroke: kt,
            shapePreview: Nt,
            shapePreviewStyle: Nt ? {
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
            onResizeHandleDown: jn,
            onRotateStart: mc,
            onConnectionHandleDown: Ci,
            onEdgeEndpointDown: Sc,
            onKinkHandleDown: kc,
            edgePreview: dt,
            edgeReconnect: $t,
            eraserMarkedIds: Xn.size > 0 ? Xn : void 0,
            eraserTrail: vi.length > 1 ? vi : void 0,
            laserTrail: Si.length > 1 ? Si : void 0,
            mode: k,
            freeFormEdges: t.freeFormEdges,
            hoveredNodeId: ac,
            cursorCanvasPos: lc,
            registry: o,
            onPortHandleDown: bc,
            cycleNodeIds: r && $r >= 0 ? r.cycleNodeIds : void 0,
            dataFlowEdgeOverlay: r ? n : "off",
            getLastComputeMs: r ? wc : void 0,
            getDataFlowPortValue: r ? vc : void 0,
            containerTypes: t.containerTypes,
            alignGuides: G,
            suppressNodeOverlayId: to
          }
        ),
        de && !to && k !== "edge" && !dt && !$t && !t.readOnly && (() => {
          const v = t.selectionGroupId(), H = v ? t.groupRotations.get(v) : void 0;
          let z, O, E, F;
          if (wr)
            z = wr.bounds, O = wr.angle, E = wr.cx, F = wr.cy;
          else if (H && H.angle !== 0) {
            const Y = -H.angle * Math.PI / 180, Q = Math.cos(Y), B = Math.sin(Y);
            let Z = 1 / 0, nt = 1 / 0, St = -1 / 0, zt = -1 / 0;
            for (const Dt of t.selection) {
              const Tt = t.getNode(Dt);
              if (!Tt || Tt.type === "edge") continue;
              const Rt = Tt.h === "auto" ? mt[Tt.id] ?? 100 : Tt.h, ne = Tt.x + Tt.w / 2, Jt = Tt.y + Rt / 2, It = ne - H.cx, Ht = Jt - H.cy, bt = H.cx + It * Q - Ht * B, Et = H.cy + It * B + Ht * Q;
              Z = Math.min(Z, bt - Tt.w / 2), nt = Math.min(nt, Et - Rt / 2), St = Math.max(St, bt + Tt.w / 2), zt = Math.max(zt, Et + Rt / 2);
            }
            z = {
              x: Z - lt,
              y: nt - lt,
              w: St - Z + lt * 2,
              h: zt - nt + lt * 2
            }, O = H.angle, E = H.cx, F = H.cy;
          } else
            z = de, O = 0, E = 0, F = 0;
          const L = 8 / p.zoom, R = L / 2, j = [
            { pos: "nw", cx: z.x, cy: z.y },
            { pos: "n", cx: z.x + z.w / 2, cy: z.y },
            { pos: "ne", cx: z.x + z.w, cy: z.y },
            { pos: "e", cx: z.x + z.w, cy: z.y + z.h / 2 },
            { pos: "se", cx: z.x + z.w, cy: z.y + z.h },
            { pos: "s", cx: z.x + z.w / 2, cy: z.y + z.h },
            { pos: "sw", cx: z.x, cy: z.y + z.h },
            { pos: "w", cx: z.x, cy: z.y + z.h / 2 }
          ], U = O !== 0 ? ` rotate(${O}, ${E}, ${F})` : "";
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${p.x}, ${p.y}) scale(${p.zoom})`, children: /* @__PURE__ */ S("g", { transform: U, children: [
                /* @__PURE__ */ h(
                  "rect",
                  {
                    x: z.x,
                    y: z.y,
                    width: z.w,
                    height: z.h,
                    fill: "none",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / p.zoom
                  }
                ),
                O === 0 && j.map(({ pos: Y, cx: Q, cy: B }) => /* @__PURE__ */ h(
                  "rect",
                  {
                    x: Q - R,
                    y: B - R,
                    width: L,
                    height: L,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / p.zoom,
                    style: { cursor: In(Y, O), pointerEvents: "auto" },
                    onPointerDown: (Z) => {
                      Z.stopPropagation(), Cc(Y, Z);
                    }
                  },
                  Y
                )),
                (() => {
                  const Y = 25 / p.zoom, Q = z.x + z.w / 2, B = z.y;
                  return /* @__PURE__ */ S(Ct, { children: [
                    /* @__PURE__ */ h(
                      "line",
                      {
                        x1: Q,
                        y1: B,
                        x2: Q,
                        y2: B - Y,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / p.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const Z = 8 / p.zoom, nt = Z / 2;
                      return /* @__PURE__ */ h(
                        "rect",
                        {
                          x: Q - nt,
                          y: B - Y - nt,
                          width: Z,
                          height: Z,
                          rx: 1.5 / p.zoom,
                          transform: `rotate(45, ${Q}, ${B - Y})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / p.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (St) => Mc(St)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const Y = 26 / p.zoom, Q = 42 / p.zoom, B = 4 / p.zoom;
                  return [
                    { side: "top", cx: z.x + z.w / 2, cy: z.y - Q },
                    { side: "right", cx: z.x + z.w + Y, cy: z.y + z.h / 2 },
                    { side: "bottom", cx: z.x + z.w / 2, cy: z.y + z.h + Y },
                    { side: "left", cx: z.x - Y, cy: z.y + z.h / 2 }
                  ].map(({ side: nt, cx: St, cy: zt }) => /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: St,
                      cy: zt,
                      r: B,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / p.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (Dt) => {
                        Dt.stopPropagation();
                        const Tt = gc(nt);
                        Tt && Ci(Tt, nt, Dt);
                      }
                    },
                    `conn-${nt}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Ve && /* @__PURE__ */ h(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ h("g", { transform: `translate(${p.x}, ${p.y}) scale(${p.zoom})`, children: /* @__PURE__ */ h(
              "rect",
              {
                x: Ve.x,
                y: Ve.y,
                width: Ve.w,
                height: Ve.h,
                fill: "none",
                stroke: "#6366f1",
                strokeWidth: 1.5 / p.zoom,
                strokeDasharray: `${5 / p.zoom} ${3 / p.zoom}`,
                rx: 4 / p.zoom,
                opacity: 0.5
              }
            ) })
          }
        ),
        Lo && (() => {
          const v = t.canvasToScreen(Lo.startX, Lo.startY), H = t.canvasToScreen(Lo.endX, Lo.endY), z = Math.min(v.x, H.x), O = Math.min(v.y, H.y), E = Math.abs(H.x - v.x), F = Math.abs(H.y - v.y);
          return E < 2 && F < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "rect",
                {
                  x: z,
                  y: O,
                  width: E,
                  height: F,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        Wn && Wn.length > 2 && (() => {
          const H = Wn.map(([z, O]) => t.canvasToScreen(z, O)).map((z) => `${z.x},${z.y}`).join(" ");
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "polygon",
                {
                  points: H,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        xe && (() => {
          const v = Math.min(xe.startX, xe.endX), H = Math.min(xe.startY, xe.endY), z = Math.abs(xe.endX - xe.startX), O = Math.abs(xe.endY - xe.startY);
          return z < 2 && O < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${p.x}, ${p.y}) scale(${p.zoom})`, children: /* @__PURE__ */ h(
                "rect",
                {
                  x: v,
                  y: H,
                  width: z,
                  height: O,
                  fill: "rgba(59,130,246,0.06)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5 / p.zoom,
                  strokeDasharray: `${4 / p.zoom}`,
                  rx: 8 / p.zoom
                }
              ) })
            }
          );
        })(),
        X.length > 0 && /* @__PURE__ */ h(
          "div",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: X.map((v, H) => /* @__PURE__ */ h(
              "div",
              {
                style: {
                  position: "absolute",
                  left: v.x,
                  top: v.y,
                  width: v.w,
                  height: v.h,
                  borderRadius: 3,
                  background: v.active ? "rgba(250, 204, 21, 0.62)" : "rgba(250, 204, 21, 0.44)",
                  boxShadow: v.active ? "0 0 0 1px rgba(202, 138, 4, 0.85)" : "0 0 0 1px rgba(202, 138, 4, 0.45)"
                }
              },
              `search-text-rect-${H}`
            ))
          }
        ),
        s && /* @__PURE__ */ h(
          $u,
          {
            engine: t,
            nodes: m,
            viewport: p,
            containerSize: f,
            measuredHeights: mt
          }
        ),
        Qo && /* @__PURE__ */ h(
          Wf,
          {
            x: Qo.x,
            y: Qo.y,
            sections: Qo.sections,
            onClose: () => Yr(null)
          }
        ),
        qr && /* @__PURE__ */ h(
          Cf,
          {
            nodes: qr.nodes,
            onSave: (v) => {
              yf(v, qr.nodes, qr.groupParent), Yn(null);
            },
            onCancel: () => Yn(null)
          }
        )
      ]
    }
  ) });
}
const ro = 52, dr = 300, Oy = ro + dr, Pp = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], di = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Hp = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], Mn = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], ec = [1, 2, 3, 5, 8, 12], hi = [1, 2, 3, 4, 6, 8], oc = [1, 2, 3, 4, 6], Lp = hi, rc = [14, 20, 28, 36], ui = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Rp = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Oe = [
  { name: "Standard", colors: Pp },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], fi = Oe, Dp = [
  { name: "Standard", colors: Rp },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Xt = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Vt = {
  width: 64,
  fontSize: 10,
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
}, Wp = "https://libraries.excalidraw.com/libraries.json", Xs = "https://libraries.excalidraw.com/libraries";
function Fp({
  onClose: t,
  onInstalled: e
}) {
  const o = re(), { labels: r } = te(), [n, s] = rt([]), [i, l] = rt(!0), [d, c] = rt(null), [a, f] = rt(""), [y, p] = rt(null), [u, m] = rt(/* @__PURE__ */ new Set()), g = ct(() => {
    const w = xl(), I = new Set(w.map((k) => k.source));
    m(I);
  }, []);
  Mt(() => {
    let w = !1;
    return (async () => {
      try {
        const I = await fetch(Wp);
        if (!I.ok) throw new Error(`HTTP ${I.status}`);
        const k = await I.json();
        w || (s(k), l(!1));
      } catch (I) {
        w || (c(String(I)), l(!1));
      }
    })(), g(), () => {
      w = !0;
    };
  }, [g]);
  const x = Kt(() => {
    if (!a.trim()) return n;
    const w = a.toLowerCase();
    return n.filter(
      (I) => {
        var k, M;
        return I.name.toLowerCase().includes(w) || ((k = I.description) == null ? void 0 : k.toLowerCase().includes(w)) || ((M = I.itemNames) == null ? void 0 : M.some((C) => C.toLowerCase().includes(w)));
      }
    );
  }, [n, a]), b = ct(
    async (w) => {
      p(w.id);
      try {
        const I = `${Xs}/${w.source}`;
        await of(I, w.name), g(), e();
      } catch (I) {
        console.error("Failed to install library:", I);
      } finally {
        p(null);
      }
    },
    [e, g]
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
                        value: a,
                        onChange: (w) => f(w.target.value),
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
                          r.libraryDirectoryFailedPrefix,
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
                        children: r.libraryDirectoryNoMatches
                      }
                    ),
                    x.map((w, I) => {
                      const k = u.has(
                        `${Xs}/${w.source}`
                      ), M = y === w.id;
                      return /* @__PURE__ */ h(
                        Bp,
                        {
                          entry: w,
                          isInstalled: k,
                          isInstalling: M,
                          onInstall: () => b(w),
                          theme: o
                        },
                        w.id || `dir-${I}`
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
function Bp({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: r,
  theme: n
}) {
  var l;
  const { labels: s } = te(), i = t.preview ? `${Xs}/${t.preview}` : null;
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
          ((l = t.authors) == null ? void 0 : l.length) > 0 && /* @__PURE__ */ S(
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
                t.authors.map((d) => d.name).join(", ")
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
const Np = /^[A-Za-z][A-Za-z0-9_:-]*$/, xa = /^[A-Za-z][A-Za-z0-9_]*$/;
function Op(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function Ge(t) {
  return Op(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function hs(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function Oo(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: Ge(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: Ge(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: Ge(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: Ge(o[2]), shape: "rect" } : Np.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function Vp(t) {
  let e = t.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (e) {
    const o = Oo(e[1]), r = Oo(e[3]);
    return !o || !r ? null : { from: o, to: r, label: Ge(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/), e) {
    const o = Oo(e[1]), r = Oo(e[3]);
    return !o || !r ? null : { from: o, to: r, label: Ge(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/), e) {
    const o = Oo(e[1]), r = Oo(e[2]);
    return !o || !r ? null : { from: o, to: r };
  }
  return null;
}
function Xp(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function Gp(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return r ? { label: Ge(r[1]) } : { label: Ge(o) };
}
function Yp(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, r = t.replace(/\r\n/g, `
`).split(`
`).map((d) => d.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (r.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const n = r[0];
  /^(flowchart|graph)\b/i.test(n) && (o.direction = Xp(n), r.shift());
  const i = [], l = (d) => {
    for (const c of i) c.nodeKeys.add(d);
  };
  for (const d of r) {
    const c = d.split(";").map((a) => a.trim()).filter(Boolean);
    for (const a of c) {
      const f = Gp(a);
      if (f) {
        i.push({ label: f.label, nodeKeys: /* @__PURE__ */ new Set() });
        continue;
      }
      if (/^end\b/i.test(a)) {
        const u = i.pop();
        u && o.groups.push({
          label: u.label,
          nodeKeys: Array.from(u.nodeKeys)
        });
        continue;
      }
      const y = Vp(a);
      if (y) {
        const u = hs(o, y.from), m = hs(o, y.to);
        l(u.key), l(m.key), o.edges.push({ fromKey: u.key, toKey: m.key, label: y.label });
        continue;
      }
      const p = Oo(a);
      if (p) {
        const u = hs(o, p);
        l(u.key);
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
function jp(t) {
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
    const l = o.slice(0, i).trim(), d = o.slice(i + s.length).trim();
    if (!(!xa.test(l) || !xa.test(d)))
      return {
        from: l,
        arrow: s,
        to: d,
        label: Ge(r)
      };
  }
  return null;
}
function Zp(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: Ge(e[3])
  } : null;
}
function Kp(t) {
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
function qp(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.indexOf(" "), n = r >= 0 ? o.slice(0, r) : o, s = r >= 0 ? o.slice(r + 1).trim() : "";
  return Kp(n) ? { color: n, label: s || void 0 } : { label: o };
}
function Up(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`).map((y) => y.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (e.length === 0)
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  if (!/^sequenceDiagram\b/i.test(e[0]))
    throw new Error("Not a Mermaid sequence diagram.");
  const o = /* @__PURE__ */ new Set(), r = [], n = [], s = [], i = [], l = [], d = [];
  let c = 0;
  const a = (y) => {
    o.has(y) || (o.add(y), r.push(y));
    for (const p of d) p.participants.add(y);
  };
  for (let y = 1; y < e.length; y++) {
    const p = e[y];
    if (/^autonumber\b/i.test(p)) continue;
    const u = qp(p);
    if (u) {
      d.push({ type: "box", label: u.label, color: u.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const m = p.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (m) {
      d.push({
        type: "loop",
        label: m[1] ? Ge(m[1]) : void 0,
        startStep: c,
        participants: /* @__PURE__ */ new Set()
      });
      continue;
    }
    if (/^end\b/i.test(p)) {
      const w = d.pop();
      (w == null ? void 0 : w.type) === "box" ? l.push(w) : (w == null ? void 0 : w.type) === "loop" && i.push({
        label: w.label,
        startStep: w.startStep,
        endStep: c,
        participants: w.participants
      });
      continue;
    }
    const g = p.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (g) {
      a(g[1]);
      continue;
    }
    const x = Zp(p);
    if (x) {
      a(x.of), s.push({ step: c, note: x });
      continue;
    }
    const b = jp(p);
    if (b) {
      a(b.from), a(b.to), n.push(b), c += 1;
      continue;
    }
  }
  for (; d.length > 0; ) {
    const y = d.pop();
    y.type === "box" ? l.push(y) : i.push({
      label: y.label,
      startStep: y.startStep,
      endStep: c,
      participants: y.participants
    });
  }
  const f = r;
  if (f.length === 0)
    throw new Error("No participants found in sequenceDiagram.");
  if (n.length === 0 && s.length === 0)
    throw new Error("No messages/notes found in sequenceDiagram.");
  return {
    participants: f,
    messages: n,
    notes: s,
    loops: i.map((y) => ({
      label: y.label,
      startStep: y.startStep,
      endStep: y.endStep,
      participants: Array.from(y.participants)
    })).filter((y) => y.endStep >= y.startStep),
    groups: l.map((y) => ({
      label: y.label,
      color: y.color,
      participants: Array.from(y.participants)
    })).filter((y) => y.participants.length > 0)
  };
}
function un(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function Qp(t) {
  const e = Array.from(t.nodes.keys()).sort(), o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const c of e)
    o.set(c, 0), r.set(c, []);
  for (const c of t.edges)
    !o.has(c.fromKey) || !o.has(c.toKey) || (r.get(c.fromKey).push(c.toKey), o.set(c.toKey, (o.get(c.toKey) ?? 0) + 1));
  const n = e.filter((c) => (o.get(c) ?? 0) === 0), s = /* @__PURE__ */ new Map();
  for (const c of n) s.set(c, 0);
  const i = [...n];
  for (; i.length > 0; ) {
    const c = i.shift(), a = s.get(c) ?? 0;
    for (const f of r.get(c) ?? []) {
      const y = Math.max(s.get(f) ?? 0, a + 1);
      s.set(f, y), o.set(f, (o.get(f) ?? 0) - 1), (o.get(f) ?? 0) <= 0 && i.push(f);
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
function Jp(t, e, o, r) {
  const n = Up(t), s = [], i = [], l = 6, d = "#94a3b8", c = 3, a = "#475569", f = 180, y = 64, p = 270, u = o - 140, m = u + y + 8, g = 88, x = Math.max(1, n.messages.length), b = m + x * g + 40, w = b + 12, I = w + y, k = /* @__PURE__ */ new Map();
  for (const M of n.groups) {
    const C = M.participants.map((it) => k.get(it)).filter((it) => typeof it == "number");
    if (C.length === 0)
      for (const it of M.participants) {
        const pt = n.participants.indexOf(it);
        pt >= 0 && C.push(e + (pt - (n.participants.length - 1) / 2) * p);
      }
    if (C.length === 0) continue;
    const A = Math.min(...C) - f / 2 - 24, P = Math.max(...C) + f / 2 + 24, V = u - 22, X = I - V + 18, et = {
      id: Pt(10),
      type: "shape",
      x: A,
      y: V,
      w: P - A,
      h: X,
      z: r(),
      data: {
        shape: "rect",
        stroke: M.color ? M.color : "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: M.color ? M.color : "#334155",
        fillStyle: "solid",
        opacity: M.color ? 0.2 : 0.08,
        edgeStyle: "sharp"
      }
    };
    if (s.push(et), i.push(et.id), M.label) {
      const it = {
        id: Pt(10),
        type: "text",
        x: A + 10,
        y: V + 8,
        w: Math.max(120, P - A - 20),
        h: "auto",
        z: r(),
        data: {
          text: M.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      s.push(it);
    }
  }
  for (let M = 0; M < n.participants.length; M++) {
    const C = n.participants[M], A = e + (M - (n.participants.length - 1) / 2) * p;
    k.set(C, A);
    const P = {
      id: Pt(10),
      type: "shape",
      x: A - f / 2,
      y: u,
      w: f,
      h: y,
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
        label: C,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(P), i.push(P.id);
    const V = {
      id: Pt(10),
      type: "shape",
      x: A - l / 2,
      y: m,
      w: l,
      h: b - m,
      z: r(),
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
    s.push(V);
    const X = {
      id: Pt(10),
      type: "shape",
      x: A - f / 2,
      y: w,
      w: f,
      h: y,
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
        label: C,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(X), i.push(X.id);
  }
  for (const M of n.loops) {
    const C = M.participants.map((D) => k.get(D)).filter((D) => typeof D == "number");
    if (C.length === 0) continue;
    const A = Math.min(...C) - 130, P = Math.max(...C) + 130, V = M.startStep + 1, X = Math.max(V, M.endStep), et = m + (V - 1) * g + 16, it = m + X * g + 34, pt = {
      id: Pt(10),
      type: "shape",
      x: A,
      y: et,
      w: P - A,
      h: Math.max(90, it - et),
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
    s.push(pt);
    const wt = `loop${M.label ? ` [${M.label}]` : ""}`, xt = {
      id: Pt(10),
      type: "text",
      x: A + 10,
      y: et + 8,
      w: P - A - 20,
      h: "auto",
      z: r(),
      data: {
        text: wt,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#1f2937",
        align: "left"
      }
    };
    s.push(xt);
  }
  for (let M = 0; M < n.messages.length; M++) {
    const C = n.messages[M], A = m + (M + 1) * g, P = k.get(C.from), V = k.get(C.to);
    if (P == null || V == null) continue;
    const X = P === V, et = Math.min(P, V), it = Math.max(P, V), pt = Math.max(it - et, 40), wt = P <= V ? 0 : pt, xt = P <= V ? pt : 0, D = C.arrow.includes("--") || C.arrow === "-.->", W = C.arrow.toLowerCase().includes("x"), G = C.arrow.includes(">") || C.arrow.includes(")");
    if (X) {
      const _ = P + 6, st = A - 16, at = 92, q = 48, ot = D ? "dashed" : "solid", ht = {
        id: Pt(10),
        type: "shape",
        x: _,
        y: st,
        w: at,
        h: c,
        z: r(),
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
      }, tt = {
        id: Pt(10),
        type: "shape",
        x: _ + at - c,
        y: st,
        w: c,
        h: q,
        z: r(),
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
      }, ut = {
        id: Pt(10),
        type: "shape",
        x: _,
        y: st + q - c,
        w: at,
        h: c,
        z: r(),
        data: {
          shape: G ? "arrow" : "line",
          stroke: a,
          strokeWidth: c,
          strokeStyle: ot,
          roughness: 0,
          startPoint: [at, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(ht, tt, ut);
    } else {
      const _ = {
        id: Pt(10),
        type: "shape",
        x: et,
        y: A - 14,
        w: pt,
        h: 28,
        z: r(),
        data: {
          shape: G ? "arrow" : "line",
          stroke: a,
          strokeWidth: c,
          strokeStyle: D ? "dashed" : "solid",
          roughness: 0,
          startPoint: [wt, 14],
          endPoint: [xt, 14]
        }
      };
      s.push(_);
    }
    const K = X ? P + 18 : et, J = X ? 170 : pt, N = {
      id: Pt(10),
      type: "text",
      x: K,
      y: A - 46,
      w: J,
      h: "auto",
      z: r(),
      data: {
        text: C.label,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "center"
      }
    };
    if (s.push(N), W) {
      const _ = P <= V ? et + pt - 14 : et + 8, st = {
        id: Pt(10),
        type: "text",
        x: _,
        y: A - 20,
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
      s.push(st);
    }
  }
  for (const M of n.notes) {
    const C = m + (M.step + 1) * g, A = k.get(M.note.of);
    if (A == null) continue;
    let P = A;
    M.note.side === "right" && (P += 130), M.note.side === "left" && (P -= 300), M.note.side === "over" && (P -= 110);
    const V = {
      id: Pt(10),
      type: "text",
      x: P,
      y: C - 8,
      w: 260,
      h: "auto",
      z: r(),
      data: {
        text: M.note.text,
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
function $p(t, e, o, r) {
  const n = t.trimStart();
  if (/^sequenceDiagram\b/i.test(n))
    return Jp(t, e, o, r);
  const s = Yp(t), i = Qp(s), l = Array.from(s.nodes.values()).map((g) => un(g.shape)), d = l.length > 0 ? Math.max(...l.map((g) => g.h)) : 96, c = Math.max(d + 130, 260), a = /* @__PURE__ */ new Map(), f = i.length;
  for (let g = 0; g < i.length; g++) {
    const x = i[g], b = x.length, w = (g - (f - 1) / 2) * c, I = x.length > 0 ? Math.max(
      ...x.map((M) => {
        const C = s.nodes.get(M);
        return C ? un(C.shape).w : 200;
      })
    ) : 200, k = Math.max(I + 90, 260);
    for (let M = 0; M < x.length; M++) {
      const C = x[M], A = (M - (b - 1) / 2) * k;
      if (s.direction === "LR" || s.direction === "RL") {
        const P = s.direction === "LR" ? e + w : e - w, V = o + A;
        a.set(C, { x: P, y: V });
      } else {
        const P = e + A, V = s.direction === "TB" ? o + w : o - w;
        a.set(C, { x: P, y: V });
      }
    }
  }
  const y = /* @__PURE__ */ new Map(), p = [], u = [], m = /* @__PURE__ */ new Map();
  for (const g of s.groups) {
    if (!g.nodeKeys.length) continue;
    const x = g.nodeKeys.map((C) => {
      const A = s.nodes.get(C), P = a.get(C);
      if (!A || !P) return null;
      const V = un(A.shape);
      return { x: P.x - V.w / 2, y: P.y - V.h / 2, w: V.w, h: V.h };
    }).filter((C) => !!C);
    if (!x.length) continue;
    const b = Math.min(...x.map((C) => C.x)) - 30, w = Math.max(...x.map((C) => C.x + C.w)) + 30, I = Math.min(...x.map((C) => C.y)) - 34, k = Math.max(...x.map((C) => C.y + C.h)) + 24, M = {
      id: Pt(10),
      type: "shape",
      x: b,
      y: I,
      w: w - b,
      h: k - I,
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
    if (p.push(M), u.push(M.id), g.label) {
      const C = {
        id: Pt(10),
        type: "text",
        x: b + 10,
        y: I + 8,
        w: Math.max(120, w - b - 20),
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
      p.push(C);
    }
  }
  for (const [g, x] of s.nodes) {
    const b = a.get(g) ?? { x: e, y: o }, w = un(x.shape), I = {
      id: Pt(10),
      type: "shape",
      x: b.x - w.w / 2,
      y: b.y - w.h / 2,
      w: w.w,
      h: w.h,
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
    p.push(I), u.push(I.id), y.set(g, I.id), m.set(g, { x: I.x, y: I.y, w: w.w, h: w.h });
  }
  for (const g of s.edges) {
    const x = y.get(g.fromKey), b = y.get(g.toKey);
    if (!x || !b || x === b) continue;
    const w = {
      id: Pt(10),
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
    p.push(w);
  }
  return { nodes: p, shapeNodeIds: u };
}
const wa = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function _p({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r
}) {
  const n = re(), { labels: s } = te(), i = ft(null), [l, d] = rt(wa), [c, a] = rt(null), [f, y] = rt(null);
  ii(e && !!r, r, i, [
    l.length,
    c,
    f
  ]), Mt(() => {
    if (!e) return;
    const m = (g) => {
      i.current && !i.current.contains(g.target) && o();
    };
    return document.addEventListener("pointerdown", m), () => document.removeEventListener("pointerdown", m);
  }, [e, o]);
  const p = Kt(
    () => s.mermaidSupportedHint,
    [s.mermaidSupportedHint]
  ), u = ct(() => {
    try {
      const m = window.innerWidth / 2, g = window.innerHeight / 2, x = t.screenToCanvas(m, g), { nodes: b, shapeNodeIds: w } = $p(l, x.x, x.y, () => t.nextZ());
      if (b.length === 0)
        throw new Error(s.mermaidNoNodesParsed);
      t.addNodes(b), w.length > 0 && t.selectMultiple(w), a(null), y(
        s.mermaidInsertedSummary.replace("{nodes}", String(w.length)).replace("{edges}", String(b.length - w.length))
      );
    } catch (m) {
      y(null), a(m instanceof Error ? m.message : s.mermaidParseFailed);
    }
  }, [t, s.mermaidInsertedSummary, s.mermaidNoNodesParsed, s.mermaidParseFailed, l]);
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
          maxHeight: "min(520px, calc(100dvh - 16px))",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          zIndex: 99999
        },
        onPointerDown: (m) => m.stopPropagation(),
        children: [
          /* @__PURE__ */ S("div", { style: { padding: "10px 12px 8px", borderBottom: `1px solid ${n.border}` }, children: [
            /* @__PURE__ */ h("div", { style: { fontSize: 12, fontWeight: 700, color: n.text }, children: s.mermaidSketchTitle }),
            /* @__PURE__ */ h("div", { style: { marginTop: 4, fontSize: 10, color: n.textMuted, lineHeight: 1.45 }, children: p })
          ] }),
          /* @__PURE__ */ S("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ h(
              "textarea",
              {
                value: l,
                onChange: (m) => d(m.target.value),
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
            f && /* @__PURE__ */ h("div", { style: { fontSize: 10, color: "#16a34a" }, children: f }),
            /* @__PURE__ */ S("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
              /* @__PURE__ */ h(
                "button",
                {
                  onClick: () => d(wa),
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
                  onClick: u,
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
const t0 = [
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
}, _t = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Zo({ name: t, size: e = 18, textGlyph: o = "T" }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ..._t }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ..._t })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ..._t }),
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
    t === "note" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ..._t }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ..._t }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ..._t, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ..._t, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ..._t, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ..._t }),
      /* @__PURE__ */ h("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ..._t }),
      /* @__PURE__ */ h("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ..._t }),
      /* @__PURE__ */ h("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ..._t })
    ] }),
    t === "edge" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("circle", { cx: "5", cy: "5", r: "2.5", ..._t, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ h("circle", { cx: "19", cy: "19", r: "2.5", ..._t, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "7", x2: "17", y2: "17", ..._t }),
      /* @__PURE__ */ h("polyline", { points: "14,17 17,17 17,14", ..._t, fill: "none" })
    ] }),
    t === "erase" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ..._t }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ..._t })
    ] }),
    t === "laser" && /* @__PURE__ */ h("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ h("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ..._t, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ..._t, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ..._t, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ..._t, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ..._t, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ..._t }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ..._t }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ..._t })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ..._t }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ..._t })
    ] }),
    t === "paper" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ..._t }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "7", x2: "16", y2: "7", ..._t, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "11", x2: "16", y2: "11", ..._t, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "15", x2: "13", y2: "15", ..._t, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ..._t }),
      /* @__PURE__ */ h("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ..._t }),
      /* @__PURE__ */ h("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ..._t }),
      /* @__PURE__ */ h("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ..._t })
    ] }),
    t === "library" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ..._t }),
      /* @__PURE__ */ h("path", { d: "M8 7h6", ..._t, opacity: 0.5 }),
      /* @__PURE__ */ h("path", { d: "M8 11h4", ..._t, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ..._t }),
      /* @__PURE__ */ h("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ..._t }),
      /* @__PURE__ */ h("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ..._t }),
      /* @__PURE__ */ h("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
function e0({
  engine: t,
  background: e
}) {
  const o = re(), { labels: r } = te(), [n, s] = rt(!1), i = {
    light: r.paperGroupLight,
    dark: r.paperGroupDark,
    textured: r.paperGroupTextured
  }, l = {
    "plain-white": r.paperWhite,
    "dot-grid": r.paperCream,
    engineering: r.paperWarm,
    blueprint: r.paperBlueprint,
    "dark-grid": r.paperNight,
    "japanese-stationery": r.paperJapaneseStationery,
    kraft: r.paperKraftPaper
  }, d = ft(null), c = ft(null);
  Ml(n, d, c, []), Mt(() => {
    if (!n) return;
    const y = (p) => {
      c.current && !c.current.contains(p.target) && d.current && !d.current.contains(p.target) && s(!1);
    };
    return document.addEventListener("pointerdown", y), () => document.removeEventListener("pointerdown", y);
  }, [n]);
  const a = fr.find((y) => y.key === e) ?? fr[1], f = n && d.current ? (() => {
    const y = d.current.getBoundingClientRect();
    return Qe(
      /* @__PURE__ */ h(
        "div",
        {
          ref: c,
          style: {
            position: "fixed",
            left: y.right + 8,
            top: y.top,
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
          onPointerDown: (p) => p.stopPropagation(),
          children: ["light", "dark", "textured"].map((p) => {
            const u = fr.filter((m) => m.group === p);
            return u.length === 0 ? null : /* @__PURE__ */ S("div", { style: { marginBottom: 6 }, children: [
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
                  children: i[p]
                }
              ),
              u.map((m) => /* @__PURE__ */ S(
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
                    /* @__PURE__ */ h(
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
                    l[m.key] ?? m.label
                  ]
                },
                m.key
              ))
            ] }, p);
          })
        }
      ),
      document.body
    );
  })() : null;
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ S(
      "button",
      {
        ref: d,
        title: r.paperType,
        onClick: () => s((y) => !y),
        style: {
          ...jo,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ h(Zo, { name: "paper" }),
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
    f
  ] });
}
function o0({ engine: t }) {
  const e = re(), { labels: o } = te(), [r, n] = rt(!1), s = ft(null), i = ft(null);
  Ml(r, s, i, []), Mt(() => {
    if (!r) return;
    const d = (c) => {
      i.current && !i.current.contains(c.target) && s.current && !s.current.contains(c.target) && n(!1);
    };
    return document.addEventListener("pointerdown", d), () => document.removeEventListener("pointerdown", d);
  }, [r]);
  const l = r && s.current ? (() => {
    const d = s.current.getBoundingClientRect();
    return Qe(
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
            Wa.map((c) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => {
                  const a = typeof window < "u" ? window : void 0;
                  if (!a) return;
                  const f = a.innerWidth / 2, y = a.innerHeight / 2, p = ur(t.viewport, f, y);
                  t.applyTemplate(c.id, p.x, p.y), n(!1);
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
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: s,
        title: o.templatesTitle,
        onClick: () => n((d) => !d),
        style: {
          ...jo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Zo, { name: "template" })
      }
    ),
    l
  ] });
}
function r0({ engine: t }) {
  const e = re(), { labels: o } = te(), [r, n] = rt(!1), [s, i] = rt(!1), l = ft(null), [d, c] = rt(null), a = ct(() => {
    n((p) => (!p && l.current && c(l.current.getBoundingClientRect()), !p));
  }, []), f = ct(() => n(!1), []), y = ct(() => {
    i(!0);
  }, []);
  return /* @__PURE__ */ S(Ct, { children: [
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
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Zo, { name: "library" })
      }
    ),
    /* @__PURE__ */ h(
      xf,
      {
        engine: t,
        open: r,
        onClose: f,
        triggerRect: d,
        onBrowseDirectory: y
      }
    ),
    s && /* @__PURE__ */ h(
      Fp,
      {
        onClose: () => i(!1),
        onInstalled: () => {
          n(!1), setTimeout(() => {
            l.current && c(l.current.getBoundingClientRect()), n(!0);
          }, 100);
        }
      }
    )
  ] });
}
function n0({ engine: t, baseUrl: e }) {
  const o = re(), { labels: r } = te(), [n, s] = rt(!1), i = ft(null), [l, d] = rt(null), c = ct(() => {
    s((f) => (!f && i.current && d(i.current.getBoundingClientRect()), !f));
  }, []), a = ct(() => s(!1), []);
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: i,
        title: r.gifSearchTitle,
        onClick: c,
        style: {
          ...jo,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ h(Zo, { name: "gif" })
      }
    ),
    /* @__PURE__ */ h(
      Sf,
      {
        engine: t,
        open: n,
        onClose: a,
        triggerRect: l,
        baseUrl: e
      }
    )
  ] });
}
function s0({ engine: t }) {
  const e = re(), { labels: o } = te(), [r, n] = rt(!1), s = ft(null), [i, l] = rt(null), d = ct(() => {
    n((a) => (!a && s.current && l(s.current.getBoundingClientRect()), !a));
  }, []), c = ct(() => n(!1), []);
  return /* @__PURE__ */ S(Ct, { children: [
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
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Zo, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ h(
      _p,
      {
        engine: t,
        open: r,
        onClose: c,
        triggerRect: i
      }
    )
  ] });
}
function i0({ engine: t, gifApiBaseUrl: e }) {
  const o = re(), { labels: r } = te(), [n, s] = rt(t.mode), [i, l] = rt(t.boardBackground), [d, c] = rt(t.lassoSelect);
  Mt(() => {
    const f = () => s(t.mode), y = () => l(t.boardBackground), p = () => c(t.lassoSelect);
    return t.on("mode", f), t.on("background", y), t.on("lassoToggle", p), () => {
      t.off("mode", f), t.off("background", y), t.off("lassoToggle", p);
    };
  }, [t]);
  const a = t0.map((f) => ({
    ...f,
    label: f.key === "select" ? r.toolSelect : f.key === "hand" ? r.toolHand : f.key === "draw" ? r.toolDraw : f.key === "shape" ? r.toolShape : f.key === "text" ? r.toolText : f.key === "note" ? r.toolNote : f.key === "sticky" ? r.toolSticky : f.key === "frame" ? r.toolFrame : f.key === "erase" ? r.toolEraser : r.toolLaser
  }));
  return /* @__PURE__ */ S(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: ro,
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
        a.map((f) => {
          const y = n === f.key && !(f.key === "select" && d);
          return /* @__PURE__ */ S(
            "button",
            {
              title: `${f.label} (${f.shortcut}${f.num ? ` / ${f.num}` : ""})`,
              onClick: () => {
                d && (t.toggleLassoSelect(), c(!1)), t.setMode(f.key);
              },
              style: {
                ...jo,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: y ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ h(Zo, { name: f.key, textGlyph: r.toolTextGlyph }),
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
                    children: f.num || f.shortcut
                  }
                )
              ]
            },
            f.key
          );
        }),
        /* @__PURE__ */ h("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ S(
          "button",
          {
            title: `${r.toolLassoSelect} (L)`,
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
              /* @__PURE__ */ h(Zo, { name: "lasso" }),
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
        /* @__PURE__ */ h(e0, { engine: t, background: i }),
        /* @__PURE__ */ h(o0, { engine: t }),
        /* @__PURE__ */ h(r0, { engine: t }),
        /* @__PURE__ */ h(s0, { engine: t }),
        e && /* @__PURE__ */ h(n0, { engine: t, baseUrl: e })
      ]
    }
  );
}
const a0 = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), l0 = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function va(t) {
  return t.data.opacity ?? 1;
}
function sr(t, e) {
  return t.data[e];
}
function c0(t) {
  const e = {}, o = t.filter((n) => a0.has(n.type));
  if (o.length > 0) {
    const n = va(o[0]), s = o.every((i) => va(i) === n);
    e.opacity = s ? n : "mixed";
  }
  const r = t.filter((n) => l0.has(n.type));
  if (r.length > 0) {
    const n = sr(r[0], "borderColor"), s = r.every(
      (a) => sr(a, "borderColor") === n
    );
    e.borderColor = s ? n ?? null : "mixed";
    const i = sr(r[0], "borderWidth") ?? 1, l = r.every(
      (a) => (sr(a, "borderWidth") ?? 1) === i
    );
    e.borderWidth = l ? i : "mixed";
    const d = sr(r[0], "borderStyle") ?? "solid", c = r.every(
      (a) => (sr(a, "borderStyle") ?? "solid") === d
    );
    e.borderStyle = c ? d : "mixed";
  }
  return e;
}
function d0(t) {
  const [e, o] = rt(t.mode), [r, n] = rt(new Set(t.selection)), [, s] = rt(0);
  if (Mt(() => {
    const a = () => o(t.mode), f = () => {
      n(new Set(t.selection)), s((p) => p + 1);
    }, y = () => s((p) => p + 1);
    return t.on("mode", a), t.on("selection", f), t.on("change", y), () => {
      t.off("mode", a), t.off("selection", f), t.off("change", y);
    };
  }, [t]), r.size === 0)
    return e === "draw" || e === "shape" || e === "text" || e === "edge" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
  const i = [];
  for (const a of r) {
    const f = t.getNode(a);
    f && i.push(f);
  }
  if (i.length === 0)
    return { target: { kind: "none" }, commonProps: {} };
  if (i.length === 1)
    return { target: { kind: "single", node: i[0] }, commonProps: {} };
  const l = /* @__PURE__ */ new Map();
  for (const a of i) {
    const f = l.get(a.type);
    f ? f.push(a) : l.set(a.type, [a]);
  }
  const d = [];
  for (const [a, f] of l)
    d.push({ type: a, nodes: f });
  const c = c0(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: d },
    commonProps: c
  };
}
const Xr = mr(null);
function Je(t, e) {
  const o = Ye(Xr), r = Ye(gr);
  return ct(
    (n) => {
      const s = r == null ? void 0 : r(), i = {
        ...e.data,
        ...n
      };
      if (s) {
        if (o && o.length > 1) {
          const l = o.map((d) => ({
            id: d.id,
            patch: {
              data: { ...d.data, ...n }
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
            data: { ...d.data, ...n }
          }
        }));
        t.batchUpdateWithHistory(l);
      } else
        t.updateNodeWithHistory(e.id, {
          data: i
        });
    },
    [t, e, o, r]
  );
}
function je({
  value: t,
  onChange: e,
  mixed: o
}) {
  const r = re(), { labels: n } = te(), s = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorOpacity }),
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
const h0 = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function Pe({
  label: t,
  palettes: e,
  value: o,
  onChange: r,
  allowNull: n,
  mixed: s
}) {
  const i = re(), { labels: l } = te(), [d, c] = rt(""), [a, f] = rt(0), [y, p] = rt(!1), u = ft(null), m = ft(null), [g, x] = rt(null), [b, w] = rt("bottom"), I = e[a] ?? e[0], k = I.name === "Standard" ? l.paletteStandard : I.name, M = typeof o == "string" ? o : void 0, C = M == null ? void 0 : M.toLowerCase();
  Mt(() => {
    if (!y) return;
    const V = (X) => {
      u.current && !u.current.contains(X.target) && p(!1);
    };
    return document.addEventListener("mousedown", V), () => document.removeEventListener("mousedown", V);
  }, [y]), Mt(() => {
    if (!y) return;
    const V = () => {
      const X = m.current;
      if (!X) return;
      const et = X.getBoundingClientRect(), pt = e.length * 30 + 10, wt = window.innerHeight - et.bottom, xt = et.top, D = wt < pt && xt > wt;
      w(D ? "top" : "bottom"), x({
        top: D ? et.top - 4 : et.bottom + 4,
        left: et.right
      });
    };
    return V(), window.addEventListener("resize", V), window.addEventListener("scroll", V, !0), () => {
      window.removeEventListener("resize", V), window.removeEventListener("scroll", V, !0);
    };
  }, [y]);
  const A = () => {
    const V = d.trim();
    if (!V) return;
    const X = V.startsWith("#") ? V : `#${V}`;
    h0.test(X) && (r(X), c(""));
  }, P = e.some(
    (V) => V.colors.some((X) => X.toLowerCase() === C)
  );
  return /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 }, children: [
    /* @__PURE__ */ h("span", { style: { ...Vt, color: i.textMuted, paddingTop: 2 }, children: t }),
    /* @__PURE__ */ S("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }, children: [
        n && /* @__PURE__ */ h(
          "button",
          {
            onClick: () => r(null),
            title: l.inspectorNone,
            style: {
              ...se,
              width: 20,
              height: 20,
              background: "transparent",
              border: !s && M == null ? `2px solid ${i.swatchBorderActive}` : `2px solid ${i.textDisabled}`,
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
        I.colors.map((V) => {
          const X = !s && C === V.toLowerCase();
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => r(V),
              style: {
                ...se,
                width: 20,
                height: 20,
                background: V,
                border: X ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
                borderRadius: "50%"
              }
            },
            V
          );
        }),
        M && !P && !s && /* @__PURE__ */ h(
          "div",
          {
            style: {
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: M,
              border: `2px solid ${i.swatchBorderActive}`,
              flexShrink: 0
            }
          }
        ),
        s && /* @__PURE__ */ h("span", { style: { fontSize: 9, color: i.textMuted, fontStyle: "italic" }, children: l.inspectorMixed })
      ] }),
      e.length > 1 && /* @__PURE__ */ h("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ S("div", { ref: m, style: { position: "relative" }, children: [
        /* @__PURE__ */ S(
          "button",
          {
            onClick: () => p((V) => !V),
            title: l.inspectorSwitchPalette,
            style: {
              ...se,
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
              k,
              /* @__PURE__ */ h("span", { style: { fontSize: 7 }, children: y ? "▲" : "▼" })
            ]
          }
        ),
        y && g && Qe(
          /* @__PURE__ */ h(
            "div",
            {
              ref: u,
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
              children: e.map((V, X) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    f(X), p(!1);
                  },
                  style: {
                    ...se,
                    height: 28,
                    padding: "0 8px",
                    background: X === a ? i.controlBgActive : "transparent",
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
                    /* @__PURE__ */ h("span", { style: { display: "flex", gap: 2 }, children: V.colors.slice(0, 6).map((et) => /* @__PURE__ */ h(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: et,
                          display: "inline-block"
                        }
                      },
                      et
                    )) }),
                    /* @__PURE__ */ h("span", { children: V.name === "Standard" ? l.paletteStandard : V.name })
                  ]
                },
                V.name
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
          onChange: (V) => c(V.target.value),
          onKeyDown: (V) => {
            V.key === "Enter" && A();
          },
          onBlur: A,
          placeholder: M ?? "#000000",
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
  mixed: r
}) {
  const n = re();
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Vt, color: n.textMuted }, children: t }),
    Hp.map((s) => /* @__PURE__ */ h(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...se,
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
function qo({
  label: t,
  widths: e = Lp,
  value: o,
  onChange: r,
  mixed: n
}) {
  const s = re();
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Vt, color: s.textMuted }, children: t }),
    /* @__PURE__ */ h("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }, children: e.map((i) => /* @__PURE__ */ h(
      "button",
      {
        title: `${i}px`,
        onClick: () => r(i),
        style: {
          ...se,
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
function Gr({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: r,
  onChange: n
}) {
  const { labels: s } = te();
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ h(
      Pe,
      {
        label: s.inspectorBorder,
        palettes: Oe,
        value: t,
        onChange: (i) => n("borderColor", i ?? void 0),
        allowNull: !0,
        mixed: r == null ? void 0 : r.color
      }
    ),
    (t || (r == null ? void 0 : r.color)) && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h(
        Ko,
        {
          label: s.inspectorStyle,
          value: e ?? "solid",
          onChange: (i) => n("borderStyle", i),
          mixed: r == null ? void 0 : r.style
        }
      ),
      /* @__PURE__ */ h(
        qo,
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
const us = /* @__PURE__ */ new Map();
function He({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: r,
  onToggle: n,
  persistKey: s,
  children: i
}) {
  const l = re(), [d, c] = rt(() => s && us.has(s) ? !!us.get(s) : e), a = r ?? d, f = o === "group", y = ft(null), [p, u] = rt(0);
  return Mt(() => {
    !s || r !== void 0 || us.set(s, a);
  }, [s, r, a]), zo(() => {
    const m = y.current;
    if (!m) return;
    const g = () => u(m.scrollHeight);
    g();
    const x = new ResizeObserver(() => g());
    return x.observe(m), () => x.disconnect();
  }, [i]), /* @__PURE__ */ S(
    "section",
    {
      style: {
        border: `1px solid ${l.border}`,
        borderRadius: l.controlBorderRadius,
        background: f ? l.panelBg : l.controlBg,
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
              n ? n() : c((m) => !m);
            },
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "transparent",
              border: "none",
              color: f ? l.textMuted : l.textSecondary,
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
              maxHeight: a ? p : 0,
              opacity: a ? 1 : 0,
              transition: "max-height 200ms ease, opacity 140ms ease",
              overflow: "hidden",
              pointerEvents: a ? "auto" : "none"
            },
            children: /* @__PURE__ */ h(
              "div",
              {
                ref: y,
                style: {
                  padding: "8px 10px 10px",
                  borderTop: `1px solid ${l.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: f ? "transparent" : l.controlBg
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
function pi({ style: t }) {
  const e = re();
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
const u0 = /* @__PURE__ */ S("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ h("path", { d: "m21 21-4.35-4.35" })
] });
function Rn({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: r
}) {
  var x, b;
  const n = re(), [s, i] = rt(!1), [l, d] = rt(""), c = ft(null), a = ft(null), f = ft(null), y = l.trim().toLowerCase(), p = Kt(
    () => o.filter((w) => w.toLowerCase().includes(y)),
    [o, y]
  ), u = Kt(
    () => fn.filter(
      (w) => !o.includes(w.key) && (w.key.toLowerCase().includes(y) || w.label.toLowerCase().includes(y))
    ),
    [o, y]
  );
  zo(() => {
    if (!s || !f.current) return;
    const w = f.current, I = w.ownerDocument.defaultView ?? window, k = 260, M = 16, C = () => {
      var pt;
      const P = (pt = a.current) == null ? void 0 : pt.getBoundingClientRect();
      if (!P) return;
      let V = P.left;
      V + k > I.innerWidth - M && (V = I.innerWidth - k - M), V < M && (V = M);
      const X = P.bottom + 4, et = w.getBoundingClientRect(), it = kl(V, X, et.width, et.height, I, M);
      w.style.left = `${it.left}px`, w.style.top = `${it.top}px`;
    };
    C();
    const A = new ResizeObserver(C);
    return A.observe(w), () => A.disconnect();
  }, [s, l, p.length, u.length]), Mt(() => {
    var k;
    if (!s) return;
    const w = (M) => {
      var V, X;
      const C = M.target;
      if ((V = c.current) != null && V.contains(C)) return;
      const P = (((X = c.current) == null ? void 0 : X.ownerDocument) ?? document).getElementById("font-picker-popover");
      P != null && P.contains(C) || i(!1);
    }, I = ((k = c.current) == null ? void 0 : k.ownerDocument) ?? document;
    return I.addEventListener("mousedown", w), () => I.removeEventListener("mousedown", w);
  }, [s]);
  const m = (w) => {
    e(w), i(!1), d("");
  }, g = (w, I) => {
    const k = (I == null ? void 0 : I.label) ?? w, M = I == null ? void 0 : I.category, C = t === w;
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
          background: C ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: So(w),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (A) => {
          C || (A.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (A) => {
          C || (A.currentTarget.style.background = "transparent");
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
              children: kd(M)
            }
          ),
          /* @__PURE__ */ h("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: k })
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
          background: n.controlBg,
          color: n.text,
          border: `1px solid ${n.separator}`,
          borderRadius: n.controlBorderRadius,
          fontSize: 11,
          fontFamily: So(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...r
        },
        children: [
          /* @__PURE__ */ h("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((x = fn.find((w) => w.key === t)) == null ? void 0 : x.label) ?? t }),
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
    s && Qe(
      /* @__PURE__ */ S(
        "div",
        {
          ref: f,
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
                  /* @__PURE__ */ h("span", { style: { color: "#64748b", display: "flex" }, children: u0 }),
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
              p.length > 0 && /* @__PURE__ */ S("div", { style: { marginBottom: 12 }, children: [
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
                p.map((w) => g(w, fn.find((I) => I.key === w)))
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
                u.length > 0 ? u.map((w) => g(w.key, w)) : /* @__PURE__ */ h(
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
function yi({ name: t, size: e = 16 }) {
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
const f0 = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], p0 = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function y0({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function Fo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function m0({ engine: t, node: e, fontsInScene: o }) {
  const r = re(), { labels: n } = te(), s = Je(t, e), i = Ye(Xr) ?? [e], { data: l } = e, d = l.fill ?? null, c = l.fillStyle ?? "hachure", a = l.strokeStyle ?? "solid", f = Fo(i, (b) => b.data.stroke), y = Fo(i, (b) => b.data.fill ?? null), p = Fo(i, (b) => b.data.fillStyle ?? "hachure"), u = Fo(i, (b) => b.data.strokeStyle ?? "solid"), m = Fo(i, (b) => b.data.strokeWidth), g = Fo(i, (b) => b.data.roughness), x = Fo(i, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ S(He, { title: n.inspectorStructure, persistKey: "shape.structure", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorShape }),
        p0.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ shape: b.key }),
            style: {
              ...se,
              width: 28,
              height: 28,
              background: l.shape === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(y0, { name: b.key })
          },
          b.key
        ))
      ] }),
      (l.shape === "rect" || l.shape === "diamond") && /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorEdges }),
        [
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" }
        ].map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ edgeStyle: b.key === "sharp" ? void 0 : b.key }),
            style: {
              ...se,
              width: 28,
              height: 28,
              background: (l.edgeStyle ?? "sharp") === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(yi, { name: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorLabel }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "text",
            value: l.label ?? "",
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
    l.label && /* @__PURE__ */ S(He, { title: n.inspectorTypography, defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          Rn,
          {
            value: l.labelFontFamily ?? "Excalifont",
            onChange: (b) => s({ labelFontFamily: b === "Excalifont" ? void 0 : b }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorSize }),
        f0.map((b) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ labelFontSize: b.size === 14 ? void 0 : b.size }),
            style: {
              ...se,
              width: 36,
              height: 28,
              background: (l.labelFontSize ?? 14) === b.size ? r.controlBgActive : r.controlBg,
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
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorAlign }),
        ui.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.key,
            onClick: () => s({ labelAlign: b.key === "center" ? void 0 : b.key }),
            style: {
              ...se,
              width: 36,
              height: 28,
              background: (l.labelAlign ?? "center") === b.key ? r.controlBgActive : r.controlBg,
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
    /* @__PURE__ */ S(He, { title: n.inspectorAppearance, persistKey: "shape.appearance", children: [
      /* @__PURE__ */ h(
        Pe,
        {
          label: n.inspectorStroke,
          palettes: Oe,
          value: f ? void 0 : l.stroke,
          mixed: f,
          onChange: (b) => s({ stroke: b })
        }
      ),
      /* @__PURE__ */ h(
        Pe,
        {
          label: n.inspectorFill,
          palettes: fi,
          value: y ? void 0 : d,
          mixed: y,
          onChange: (b) => s({ fill: b ?? void 0 }),
          allowNull: !0
        }
      ),
      d && !y && /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorFillPattern }),
        di.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ fillStyle: b.key }),
            style: {
              ...se,
              width: 36,
              height: 28,
              background: !p && c === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(pi, { style: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ h(
        Ko,
        {
          label: n.inspectorStrokeStyle,
          value: a,
          mixed: u,
          onChange: (b) => s({ strokeStyle: b })
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: n.inspectorStrokeWidth,
          widths: hi,
          value: l.strokeWidth,
          mixed: m,
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
    /* @__PURE__ */ h(He, { title: n.inspectorSketch, defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorRoughness }),
      Mn.map((b) => {
        const w = b.value === 0 ? n.roughnessArchitect : b.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: w,
            onClick: () => s({ roughness: b.value }),
            style: {
              ...se,
              height: 28,
              padding: "0 8px",
              background: !g && l.roughness === b.value ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: w
          },
          b.value
        );
      })
    ] }) })
  ] });
}
function ir(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function g0({ engine: t, node: e }) {
  const o = re(), { labels: r } = te(), n = Je(t, e), s = Ye(Xr) ?? [e], { data: i } = e, l = i.fill ?? null, d = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", a = ir(s, (g) => g.data.color), f = ir(s, (g) => g.data.fill ?? null), y = ir(s, (g) => g.data.fillStyle ?? "hachure"), p = ir(s, (g) => g.data.strokeStyle ?? "solid"), u = ir(s, (g) => g.data.strokeWidth), m = ir(s, (g) => g.data.opacity ?? 1);
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ h(
      Pe,
      {
        label: r.inspectorStroke,
        palettes: Oe,
        value: a ? void 0 : i.color,
        mixed: a,
        onChange: (g) => n({ color: g })
      }
    ),
    /* @__PURE__ */ h(
      Pe,
      {
        label: r.inspectorFill,
        palettes: fi,
        value: f ? void 0 : l,
        mixed: f,
        onChange: (g) => n({ fill: g ?? void 0 }),
        allowNull: !0
      }
    ),
    l && !f && /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.inspectorFillPattern }),
      di.map((g) => /* @__PURE__ */ h(
        "button",
        {
          title: g.label,
          onClick: () => n({ fillStyle: g.key }),
          style: {
            ...se,
            width: 36,
            height: 28,
            background: !y && d === g.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(pi, { style: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Ko,
      {
        label: r.inspectorStrokeStyle,
        value: c,
        mixed: p,
        onChange: (g) => n({ strokeStyle: g })
      }
    ),
    /* @__PURE__ */ h(
      qo,
      {
        label: r.inspectorStrokeWidth,
        widths: ec,
        value: i.strokeWidth,
        mixed: u,
        onChange: (g) => n({ strokeWidth: g })
      }
    ),
    /* @__PURE__ */ h(
      je,
      {
        value: i.opacity ?? 1,
        mixed: m,
        onChange: (g) => n({ opacity: g })
      }
    )
  ] });
}
function b0({ engine: t, node: e, fontsInScene: o }) {
  const r = re(), { labels: n } = te(), s = Je(t, e), { data: i } = e;
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ S(He, { title: n.inspectorTypography, persistKey: "text.typography", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          Rn,
          {
            value: i.fontFamily,
            onChange: (l) => s({ fontFamily: l }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorSize }),
        rc.map((l) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ fontSize: l }),
            style: {
              ...se,
              width: 36,
              height: 28,
              background: i.fontSize === l ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              borderRadius: r.controlBorderRadius
            },
            children: l
          },
          l
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorAlign }),
        ui.map((l) => /* @__PURE__ */ h(
          "button",
          {
            title: l.key,
            onClick: () => s({ align: l.key }),
            style: {
              ...se,
              width: 36,
              height: 28,
              background: i.align === l.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: l.label
          },
          l.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ S(He, { title: n.inspectorAppearance, persistKey: "text.appearance", children: [
      /* @__PURE__ */ h(
        Pe,
        {
          label: n.inspectorStroke,
          palettes: Oe,
          value: i.color,
          onChange: (l) => s({ color: l })
        }
      ),
      /* @__PURE__ */ h(
        Gr,
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
const ka = { top: 0, right: 0.25, bottom: 0.5, left: 0.75 }, x0 = [[0, "top"], [0.25, "right"], [0.5, "bottom"], [0.75, "left"]];
function Sa(t) {
  let e = "top", o = 1 / 0;
  for (const [r, n] of x0) {
    const s = Math.min(Math.abs(t - r), Math.abs(t - r - 1), Math.abs(t - r + 1));
    s < o && (o = s, e = n);
  }
  return e;
}
const w0 = ["forward"], v0 = ["forward", "reverse", "both", "bop"];
function k0({ engine: t, node: e }) {
  const o = re(), { labels: r } = te(), n = Je(t, e), s = Ye(Xr), { data: i } = e, l = !!(i.sourcePort && i.targetPort), d = l ? w0 : v0, c = Kt(() => !(s != null && s.length) || !s.every((a) => a.type === "edge") ? null : [...s].map((a) => a.id).sort().join("|"), [s]);
  return Mt(() => {
    const a = c !== null ? c.split("|") : [e.id];
    for (const f of a) {
      const y = t.getNode(f);
      if (!y || y.type !== "edge") continue;
      const p = y.data;
      !p.sourcePort || !p.targetPort || !p.animated || (p.animatedDirection ?? "forward") !== "forward" && t.updateNode(f, { data: { ...p, animatedDirection: "forward" } });
    }
  }, [t, c, e.id]), /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ S(He, { title: r.edgeLineSection, persistKey: "edge.line", children: [
      /* @__PURE__ */ h(
        Pe,
        {
          label: r.edgeColor,
          palettes: Oe,
          value: i.color,
          onChange: (a) => n({ color: a })
        }
      ),
      /* @__PURE__ */ h(
        Ko,
        {
          label: r.inspectorStyle,
          value: i.style,
          onChange: (a) => n({ style: a })
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: r.inspectorWidth,
          widths: oc,
          value: i.strokeWidth,
          onChange: (a) => n({ strokeWidth: a })
        }
      ),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: "Connect" }),
        ["fixed", "free"].map((a) => {
          const f = i.sourceT !== void 0 || i.targetT !== void 0;
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                a === "free" && !f ? n({
                  sourceT: i.sourceHandle ? ka[i.sourceHandle] : 0,
                  targetT: i.targetHandle ? ka[i.targetHandle] : 0.5,
                  sourceHandle: void 0,
                  targetHandle: void 0
                }) : a === "fixed" && f && n({
                  sourceHandle: i.sourceT !== void 0 ? Sa(i.sourceT) : "right",
                  targetHandle: i.targetT !== void 0 ? Sa(i.targetT) : "left",
                  sourceT: void 0,
                  targetT: void 0
                });
              },
              style: {
                ...se,
                height: 28,
                padding: "0 8px",
                background: (a === "free" ? f : !f) ? o.controlBgActive : o.controlBg,
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
    /* @__PURE__ */ S(He, { title: r.edgeArrowsSection, persistKey: "edge.arrows", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((a) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ arrowHead: a }),
            style: {
              ...se,
              height: 28,
              padding: "0 6px",
              background: (i.arrowHead ?? "none") === a ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: a === "none" ? r.inspectorNone : a === "arrow" ? "▷" : a === "filled" ? "▶" : "●"
          },
          a
        ))
      ] }),
      (i.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.edgeHeadSize }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: i.arrowHeadSize ?? Math.max(8, i.strokeWidth * 3),
            onChange: (a) => n({ arrowHeadSize: Number(a.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ h("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: i.arrowHeadSize ?? Math.max(8, i.strokeWidth * 3) })
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((a) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ arrowTail: a }),
            style: {
              ...se,
              height: 28,
              padding: "0 6px",
              background: (i.arrowTail ?? "none") === a ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: a === "none" ? r.inspectorNone : a === "arrow" ? "◁" : a === "filled" ? "◀" : "●"
          },
          a
        ))
      ] }),
      (i.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.edgeTailSize }),
        /* @__PURE__ */ h(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: i.arrowTailSize ?? Math.max(8, i.strokeWidth * 3),
            onChange: (a) => n({ arrowTailSize: Number(a.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ h("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: i.arrowTailSize ?? Math.max(8, i.strokeWidth * 3) })
      ] })
    ] }),
    /* @__PURE__ */ S(He, { title: r.edgePathMotionSection, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.edgePath }),
        [
          { key: "bezier", label: r.edgeBezier },
          { key: "straight", label: r.edgeStraight },
          { key: "smoothstep", label: r.edgeSmooth },
          { key: "step", label: r.edgeStep }
        ].map((a) => /* @__PURE__ */ h(
          "button",
          {
            title: a.label,
            onClick: () => n({ edgeType: a.key }),
            style: {
              ...se,
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
        /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.edgeAnimate }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ animated: !i.animated }),
            style: {
              ...se,
              height: 28,
              padding: "0 12px",
              background: i.animated ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: i.animated ? r.inspectorOn : r.inspectorOff
          }
        )
      ] }),
      i.animated && /* @__PURE__ */ S("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
        /* @__PURE__ */ S("div", { style: Xt, children: [
          /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.edgeDirection }),
          d.map((a) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => n({ animatedDirection: a }),
              style: {
                ...se,
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
            children: r.edgeAnimationPortHint
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.inspectorRoughness }),
        Mn.map((a) => {
          const f = a.value === 0 ? r.roughnessArchitect : a.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
          return /* @__PURE__ */ h(
            "button",
            {
              title: f,
              onClick: () => n({ roughness: a.value }),
              style: {
                ...se,
                height: 28,
                padding: "0 8px",
                background: (i.roughness ?? 0) === a.value ? o.controlBgActive : o.controlBg,
                color: o.text,
                fontSize: 9,
                borderRadius: o.controlBorderRadius
              },
              children: f
            },
            a.value
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ h(He, { title: r.inspectorLabel, defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.edgeText }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: i.label ?? "",
          onChange: (a) => n({ label: a.target.value || void 0 }),
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
function S0({ engine: t, node: e }) {
  const o = re(), { labels: r } = te(), n = Je(t, e), { data: s } = e, i = !!s.crop;
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ h(
      Gr,
      {
        borderColor: s.borderColor ?? null,
        borderStyle: s.borderStyle,
        borderWidth: s.borderWidth,
        onChange: (l, d) => n({ [l]: d })
      }
    ),
    /* @__PURE__ */ S("div", { style: { ...Xt, marginTop: 4 }, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.inspectorCrop }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.requestImageCrop(e.id),
          style: {
            ...se,
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
            ...se,
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
      je,
      {
        value: s.opacity ?? 1,
        onChange: (l) => n({ opacity: l })
      }
    )
  ] });
}
function M0({ engine: t, node: e }) {
  const o = re(), r = Je(t, e), { data: n } = e;
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ h(
      Gr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ h(
        "button",
        {
          title: s.label,
          onClick: () => r({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...se,
            width: 28,
            height: 28,
            background: (n.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(yi, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ h(
      je,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
const Hr = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, C0 = Mp();
function I0({
  value: t,
  onChange: e,
  theme: o,
  durationLabel: r,
  msLabel: n
}) {
  const [s, i] = rt(String(t));
  Mt(() => i(String(t)), [t]);
  const l = () => {
    const d = parseInt(s, 10);
    !isNaN(d) && d >= 100 && d <= 5e3 ? e(d) : i(String(t));
  };
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r }),
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
    /* @__PURE__ */ h("span", { style: { fontSize: 10, color: o.textMuted }, children: n })
  ] });
}
function T0({ engine: t, node: e }) {
  const o = re(), { labels: r } = te(), n = Je(t, e), s = Ye(gr), { data: i } = e, l = ct(
    (f) => {
      var b;
      if (!f) {
        n({ devicePreset: void 0 });
        return;
      }
      const y = Vs(f);
      if (!y) return;
      const p = tc(y), u = Math.round(e.w / p), m = { devicePreset: f };
      (!i.label || ((b = Vs(i.devicePreset ?? "")) == null ? void 0 : b.label) === i.label) && (m.label = y.label);
      const g = { ...e.data, ...m }, x = s == null ? void 0 : s();
      x ? t.updateNodeWithHistoryCoalesced(
        e.id,
        { h: u, data: g },
        x
      ) : t.updateNodeWithHistory(e.id, {
        h: u,
        data: g
      });
    },
    [t, e, i.label, i.devicePreset, n, s]
  ), d = Kt(() => {
    const f = t.getAllNodes().filter((g) => g.type === "frame"), y = f.length, p = /* @__PURE__ */ new Set();
    for (const g of f)
      g.id !== e.id && g.data.slideOrder != null && p.add(g.data.slideOrder);
    const u = [];
    for (let g = 1; g <= y; g++)
      p.has(g) || u.push(g);
    const m = e.data.slideOrder;
    return m != null && !u.includes(m) && (u.push(m), u.sort((g, x) => g - x)), u;
  }, [t, e]), c = {
    pan: r.transitionPan,
    fade: r.transitionFadeToBlack,
    dissolve: r.transitionDissolve,
    zoom: r.transitionZoom,
    fold: r.transitionFold,
    cube: r.transitionCube,
    none: r.transitionNoneInstant
  }, a = {
    Phones: r.deviceGroupPhones,
    "Phones (Landscape)": r.deviceGroupPhonesLandscape,
    Tablets: r.deviceGroupTablets,
    "Tablets (Landscape)": r.deviceGroupTabletsLandscape,
    Devices: r.deviceGroupDevices,
    Standard: r.deviceGroupStandard
  };
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.inspectorLabel }),
      /* @__PURE__ */ h(
        "input",
        {
          type: "text",
          value: i.label ?? "",
          onChange: (f) => n({ label: f.target.value || void 0 }),
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
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.frameDevice }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.devicePreset ?? "",
          onChange: (f) => l(f.target.value),
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
            C0.map((f) => /* @__PURE__ */ h("optgroup", { label: a[f.label] ?? f.label, children: f.presets.map((y) => /* @__PURE__ */ S("option", { value: y.key, children: [
              y.label,
              " (",
              y.w,
              "×",
              y.h,
              ")"
            ] }, y.key)) }, f.label))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ h(
      Pe,
      {
        label: r.inspectorBackground,
        palettes: Oe,
        value: (() => {
          const f = i.backgroundColor;
          if (!f) return null;
          for (const y of Oe) {
            const p = y.colors.find((u) => f === `${u}15`);
            if (p) return p;
          }
          return f.length === 9 && f.endsWith("15") ? f.slice(0, 7) : null;
        })(),
        onChange: (f) => n({ backgroundColor: f ? `${f}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ h(
      Pe,
      {
        label: r.inspectorBorder,
        palettes: Oe,
        value: i.borderColor,
        onChange: (f) => n({ borderColor: f })
      }
    ),
    /* @__PURE__ */ h(
      Ko,
      {
        label: r.inspectorStyle,
        value: i.borderStyle ?? "dashed",
        onChange: (f) => n({ borderStyle: f })
      }
    ),
    /* @__PURE__ */ h(
      qo,
      {
        label: r.inspectorWidth,
        value: i.borderWidth ?? 1,
        onChange: (f) => n({ borderWidth: f })
      }
    ),
    /* @__PURE__ */ h(
      je,
      {
        value: i.opacity ?? 1,
        onChange: (f) => n({ opacity: f })
      }
    ),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.frameSlideNumber }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.slideOrder ?? "",
          onChange: (f) => {
            const y = f.target.value;
            n({ slideOrder: y ? parseInt(y, 10) : void 0 });
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
            d.map((f) => /* @__PURE__ */ h("option", { value: f, children: f }, f))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.frameTransition }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.transition ?? "pan",
          onChange: (f) => {
            const y = f.target.value;
            n({ transition: y === "pan" ? void 0 : y, transitionDuration: void 0 });
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
      I0,
      {
        value: i.transitionDuration ?? Hr[i.transition ?? "pan"],
        onChange: (f) => n({ transitionDuration: f === Hr[i.transition ?? "pan"] ? void 0 : f }),
        theme: o,
        durationLabel: r.frameDuration,
        msLabel: r.frameMilliseconds
      }
    )
  ] });
}
function z0({ engine: t, node: e }) {
  const o = re(), { labels: r } = te(), n = Je(t, e), { data: s } = e;
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ h(
      Pe,
      {
        label: r.inspectorStroke,
        palettes: Dp,
        value: s.color,
        onChange: (i) => {
          i && n({ color: i });
        }
      }
    ),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.inspectorSize }),
      [12, 14, 16, 20, 24].map((i) => /* @__PURE__ */ h(
        "button",
        {
          onClick: () => n({ fontSize: i }),
          style: {
            ...se,
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
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.inspectorEdges }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((i) => /* @__PURE__ */ h(
        "button",
        {
          title: i.label,
          onClick: () => n({ edgeStyle: i.key === "sharp" ? void 0 : i.key }),
          style: {
            ...se,
            width: 28,
            height: 28,
            background: (s.edgeStyle ?? "sharp") === i.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(yi, { name: i.key })
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ h(
      je,
      {
        value: s.opacity ?? 1,
        onChange: (i) => n({ opacity: i })
      }
    )
  ] });
}
function A0({ engine: t, node: e }) {
  const o = re(), r = Je(t, e), { data: n } = e;
  return /* @__PURE__ */ S(Ct, { children: [
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: "URL" }),
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
      Gr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ h(
      je,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function E0({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const P0 = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function H0({ engine: t, mode: e, fontsInScene: o }) {
  const r = re(), { labels: n } = te(), [, s] = rt(0), i = ct(() => s((m) => m + 1), []), l = t.activeTool;
  if (e === "text") {
    const m = l.fontFamily ?? ko, g = l.fontSize ?? 20, x = l.textAlign ?? "left", b = l.color;
    return /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          Rn,
          {
            value: m,
            onChange: (w) => {
              l.fontFamily = w, i();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorSize }),
        rc.map((w) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.fontSize = w, i();
            },
            style: {
              ...se,
              width: 36,
              height: 28,
              background: g === w ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              borderRadius: r.controlBorderRadius
            },
            children: w
          },
          w
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorAlign }),
        ui.map((w) => /* @__PURE__ */ h(
          "button",
          {
            title: w.key,
            onClick: () => {
              l.textAlign = w.key, i();
            },
            style: {
              ...se,
              width: 36,
              height: 28,
              background: x === w.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: w.label
          },
          w.key
        ))
      ] }),
      /* @__PURE__ */ h(
        Pe,
        {
          label: n.inspectorStroke,
          palettes: Oe,
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
    const m = l.roughness ?? 0;
    return /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h(
        Pe,
        {
          label: n.inspectorStroke,
          palettes: Oe,
          value: l.color,
          onChange: (g) => {
            l.color = g, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        Ko,
        {
          label: n.inspectorStrokeStyle,
          value: l.strokeStyle ?? "solid",
          onChange: (g) => {
            l.strokeStyle = g, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: n.inspectorStrokeWidth,
          widths: oc,
          value: l.width,
          onChange: (g) => {
            l.width = g, i();
          }
        }
      ),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((g) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.arrowHead = g, i();
            },
            style: {
              ...se,
              height: 28,
              padding: "0 6px",
              background: (l.arrowHead ?? "arrow") === g ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 11,
              borderRadius: r.controlBorderRadius
            },
            children: g === "none" ? n.inspectorNone : g === "arrow" ? "▷" : g === "filled" ? "▶" : "●"
          },
          g
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((g) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.arrowTail = g, i();
            },
            style: {
              ...se,
              height: 28,
              padding: "0 6px",
              background: (l.arrowTail ?? "none") === g ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 11,
              borderRadius: r.controlBorderRadius
            },
            children: g === "none" ? n.inspectorNone : g === "arrow" ? "◁" : g === "filled" ? "◀" : "●"
          },
          g
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.edgePath }),
        [
          { key: "bezier", label: n.edgeBezier },
          { key: "straight", label: n.edgeStraight },
          { key: "smoothstep", label: n.edgeSmooth },
          { key: "step", label: n.edgeStep }
        ].map((g) => /* @__PURE__ */ h(
          "button",
          {
            title: g.label,
            onClick: () => {
              l.edgeType = g.key, i();
            },
            style: {
              ...se,
              height: 28,
              padding: "0 6px",
              background: (l.edgeType ?? "bezier") === g.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: g.label
          },
          g.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Xt, children: [
        /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorRoughness }),
        Mn.map((g) => {
          const x = g.value === 0 ? n.roughnessArchitect : g.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
          return /* @__PURE__ */ h(
            "button",
            {
              title: x,
              onClick: () => {
                l.roughness = g.value, i();
              },
              style: {
                ...se,
                height: 28,
                padding: "0 8px",
                background: m === g.value ? r.controlBgActive : r.controlBg,
                color: r.text,
                fontSize: 9,
                borderRadius: r.controlBorderRadius
              },
              children: x
            },
            g.value
          );
        })
      ] })
    ] });
  }
  const d = e === "shape", c = l.color, a = l.fillColor ?? null, f = l.fillStyle ?? "hachure", y = l.strokeStyle ?? "solid", p = l.width, u = l.roughness ?? 1;
  return /* @__PURE__ */ S(Ct, { children: [
    d && /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorShape }),
      P0.map((m) => /* @__PURE__ */ h(
        "button",
        {
          title: m.label,
          onClick: () => {
            l.shapeType = m.key, i();
          },
          style: {
            ...se,
            width: 28,
            height: 28,
            background: (l.shapeType ?? "rect") === m.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ h(E0, { name: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Pe,
      {
        label: n.inspectorStroke,
        palettes: Oe,
        value: c,
        onChange: (m) => {
          l.color = m, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      Pe,
      {
        label: n.inspectorFill,
        palettes: fi,
        value: a,
        onChange: (m) => {
          l.fillColor = m ?? void 0, i();
        },
        allowNull: !0
      }
    ),
    a && /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorFillPattern }),
      di.map((m) => /* @__PURE__ */ h(
        "button",
        {
          title: m.label,
          onClick: () => {
            l.fillStyle = m.key, i();
          },
          style: {
            ...se,
            width: 36,
            height: 28,
            background: f === m.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ h(pi, { style: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ h(
      Ko,
      {
        label: n.inspectorStrokeStyle,
        value: y,
        onChange: (m) => {
          l.strokeStyle = m, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      qo,
      {
        label: n.inspectorStrokeWidth,
        widths: d ? hi : ec,
        value: p,
        onChange: (m) => {
          l.width = m, i();
        }
      }
    ),
    d && /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorRoughness }),
      Mn.map((m) => {
        const g = m.value === 0 ? n.roughnessArchitect : m.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: g,
            onClick: () => {
              l.roughness = m.value, i();
            },
            style: {
              ...se,
              height: 28,
              padding: "0 8px",
              background: u === m.value ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: g
          },
          m.value
        );
      })
    ] }),
    /* @__PURE__ */ h(
      je,
      {
        value: l.opacity ?? 1,
        onChange: (m) => {
          l.opacity = m, i();
        }
      }
    )
  ] });
}
function L0(t) {
  return t.split(/[-_]/).filter(Boolean).map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ");
}
function Ma({
  engine: t,
  node: e,
  PanelComponent: o,
  docs: r
}) {
  const n = Je(t, e), s = re(), { labels: i } = te(), [l, d] = rt(!1), c = r ? r.id ?? e.type : null, a = c ? i.customNodeDocs[c] : void 0, f = !!(a != null && a.body), y = Kt(
    () => (a == null ? void 0 : a.title) ?? L0(e.type),
    [a == null ? void 0 : a.title, e.type]
  ), p = r != null && f ? /* @__PURE__ */ S("div", { style: { marginBottom: o ? 10 : 0 }, children: [
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
              children: y
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => d((u) => !u),
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
  return o ? /* @__PURE__ */ S(Ct, { children: [
    p,
    /* @__PURE__ */ h(o, { node: e, data: e.data, engine: t, updateData: n })
  ] }) : p;
}
const R0 = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), D0 = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function nc(t) {
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
function W0(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t.getAllNodes()) {
    let n;
    r.type === "text" ? n = r.data.fontFamily : r.type === "shape" && (n = r.data.labelFontFamily), n && !e.has(n) && (e.add(n), o.push(n));
  }
  return o;
}
function F0({ label: t }) {
  const e = re();
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
function B0({
  engine: t,
  open: e,
  onToggle: o
}) {
  const r = re(), { labels: n } = te(), [s, i] = rt(t.snapToGrid), [l, d] = rt(t.gridSize), [c, a] = rt(t.smartGuides), [f, y] = rt(t.freeFormEdges), [p, u] = rt(t.boardBackground), m = {
    "plain-white": n.paperWhite,
    "dot-grid": n.paperCream,
    engineering: n.paperWarm,
    blueprint: n.paperBlueprint,
    "dark-grid": n.paperNight,
    "japanese-stationery": n.paperJapaneseStationery,
    kraft: n.paperKraftPaper
  };
  Mt(() => {
    const x = () => {
      i(t.snapToGrid), d(t.gridSize), a(t.smartGuides), y(t.freeFormEdges);
    }, b = () => y(t.freeFormEdges);
    t.on("change", b);
    const w = () => u(t.boardBackground);
    return t.on("guides", x), t.on("background", w), () => {
      t.off("guides", x), t.off("background", w), t.off("change", b);
    };
  }, [t]);
  const g = [10, 20, 40, 80];
  return /* @__PURE__ */ S(He, { title: n.inspectorCanvas, defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorGrid }),
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
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorGridSize }),
      /* @__PURE__ */ h("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }, children: g.map((x) => /* @__PURE__ */ S(
        "button",
        {
          onClick: () => t.setGridSize(x),
          style: {
            border: "none",
            borderRadius: r.controlBorderRadius,
            background: l === x ? r.controlBgActive : r.controlBg,
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
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorGuides }),
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
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: "Free edges" }),
      /* @__PURE__ */ h(
        "button",
        {
          onClick: () => t.toggleFreeFormEdges(),
          style: {
            border: "none",
            borderRadius: r.controlBorderRadius,
            background: f ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: f ? n.inspectorOn : n.inspectorOff
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Xt, children: [
      /* @__PURE__ */ h("span", { style: { ...Vt, color: r.textMuted }, children: n.inspectorPaper }),
      /* @__PURE__ */ h(
        "select",
        {
          value: p,
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
          children: fr.map((x) => /* @__PURE__ */ h("option", { value: x.key, children: m[x.key] ?? x.label }, x.key))
        }
      )
    ] })
  ] });
}
function sc({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: r
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ h(m0, { engine: t, node: e, fontsInScene: r });
    case "draw":
      return /* @__PURE__ */ h(g0, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ h(b0, { engine: t, node: e, fontsInScene: r });
    case "edge":
      return /* @__PURE__ */ h(k0, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ h(S0, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ h(M0, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ h(T0, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ h(z0, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ h(A0, { engine: t, node: e });
    default: {
      const n = o == null ? void 0 : o.get(e.type);
      return n != null && n.propertiesPanel ? /* @__PURE__ */ h(
        Ma,
        {
          engine: t,
          node: e,
          PanelComponent: n.propertiesPanel,
          docs: n.docs
        }
      ) : n != null && n.docs ? /* @__PURE__ */ h(Ma, { engine: t, node: e, docs: n.docs }) : null;
    }
  }
}
function Ca({
  engine: t,
  nodes: e
}) {
  const o = re(), { labels: r } = te(), n = Ye(gr), s = Math.round(e[0].rotation ?? 0), l = e.every(
    (f) => Math.round(f.rotation ?? 0) === s
  ) ? s : null, [d, c] = rt(null), a = ct(
    (f) => {
      c(null);
      const y = parseFloat(f);
      if (isNaN(y)) return;
      const p = Math.max(-360, Math.min(360, y)), u = e.map((g) => ({
        id: g.id,
        patch: { rotation: p }
      })), m = n == null ? void 0 : n();
      m ? t.batchUpdateWithHistoryCoalesced(u, m) : t.batchUpdateWithHistory(u);
    },
    [t, e, n]
  );
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.inspectorRotation }),
    /* @__PURE__ */ h(
      "input",
      {
        type: "number",
        min: -360,
        max: 360,
        value: d ?? (l !== null ? String(l) : ""),
        placeholder: l === null ? "Mixed" : void 0,
        onChange: (f) => c(f.target.value),
        onBlur: (f) => a(f.target.value),
        onKeyDown: (f) => {
          f.key === "Enter" && a(f.target.value), f.key === "Escape" && c(null);
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
function Ia({
  engine: t,
  nodes: e
}) {
  const o = re(), { labels: r } = te(), n = e.map((i) => i.id);
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
  return /* @__PURE__ */ S("div", { style: Xt, children: [
    /* @__PURE__ */ h("span", { style: { ...Vt, color: o.textMuted }, children: r.inspectorStack }),
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
function N0({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const r = Ye(gr), n = ct(
    (s, i) => {
      const l = s === "opacity" ? R0 : D0, d = e.filter((a) => l.has(a.type)).map((a) => ({
        id: a.id,
        patch: {
          data: { ...a.data, [s]: i }
        }
      })), c = r == null ? void 0 : r();
      c ? t.batchUpdateWithHistoryCoalesced(d, c) : t.batchUpdateWithHistory(d);
    },
    [t, e, r]
  );
  return /* @__PURE__ */ S(Ct, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ h(
      je,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (s) => n("opacity", s)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ h(
      Gr,
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
function O0({
  engine: t,
  target: e
}) {
  const o = re(), { labels: r } = te();
  if (e.kind !== "single" && e.kind !== "multi") return null;
  const n = Array.from(t.selection), s = n.length > 0, i = n.length >= 2 || t.selectionHasGroup(), l = n.some((a) => {
    var f;
    return (f = t.getNode(a)) == null ? void 0 : f.locked;
  }), d = n.some((a) => {
    var f;
    return !((f = t.getNode(a)) != null && f.locked);
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
      disabled: !d,
      action: () => {
        for (const a of n) t.updateNode(a, { locked: !0 });
      }
    },
    {
      label: r.actionUnlock,
      disabled: !l,
      action: () => {
        for (const a of n) t.updateNode(a, { locked: void 0 });
      }
    },
    {
      label: r.actionDelete,
      disabled: !s,
      danger: !0,
      action: () => t.deleteSelected()
    }
  ];
  return /* @__PURE__ */ h(He, { title: r.inspectorActions, defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: c.map((a) => /* @__PURE__ */ h(
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
function V0({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: r,
  open: n,
  onToggle: s
}) {
  const { labels: i } = te(), d = nc(i)[e.type] ?? e.type, c = e.nodes.length, a = e.nodes[0], f = `${d} (${c})`;
  return /* @__PURE__ */ h(He, { title: f, defaultOpen: !1, variant: "group", open: n, onToggle: s, children: /* @__PURE__ */ h(Xr.Provider, { value: e.nodes, children: /* @__PURE__ */ h(
    sc,
    {
      engine: t,
      node: a,
      registry: o,
      fontsInScene: r
    }
  ) }) });
}
function X0(t, e) {
  const o = nc(e);
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
function Ta({
  engine: t,
  registry: e,
  target: o,
  commonProps: r
}) {
  const { labels: n } = te(), s = Kt(() => W0(t), [t, o]), i = X0(o, n), [l, d] = rt("shared"), [c, a] = rt(!1), f = Kt(() => {
    switch (o.kind) {
      case "single":
        return o.node.id;
      case "multi":
        return [...o.nodes].map((p) => p.id).sort().join("\0");
      case "tool":
        return "tool";
      default:
        return "none";
    }
  }, [o]), y = Hn(t, f);
  return Mt(() => {
    const p = () => {
      a(
        window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0
      );
    };
    return p(), window.addEventListener("resize", p), () => window.removeEventListener("resize", p);
  }, []), Mt(() => {
    if (o.kind !== "multi") {
      d("shared");
      return;
    }
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((u) => u.type)])).has(l) || d("shared");
  }, [o, l]), /* @__PURE__ */ S(gr.Provider, { value: y, children: [
    /* @__PURE__ */ h(F0, { label: i }),
    /* @__PURE__ */ h(
      B0,
      {
        engine: t,
        open: o.kind === "multi" ? l === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => d((p) => p === "canvas" ? "" : "canvas") : void 0
      }
    ),
    c && /* @__PURE__ */ h(O0, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ h(H0, { engine: t, mode: o.mode, fontsInScene: s }),
    o.kind === "single" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h(
        sc,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: s
        }
      ),
      /* @__PURE__ */ h(Ca, { engine: t, nodes: [o.node] }),
      /* @__PURE__ */ h(Ia, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ S(
        He,
        {
          title: n.inspectorShared,
          defaultOpen: !0,
          variant: "group",
          open: l === "shared",
          onToggle: () => d((p) => p === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ h(N0, { engine: t, nodes: o.nodes, commonProps: r }),
            /* @__PURE__ */ h(Ca, { engine: t, nodes: o.nodes }),
            /* @__PURE__ */ h(Ia, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((p) => /* @__PURE__ */ h(
        V0,
        {
          engine: t,
          group: p,
          registry: e,
          fontsInScene: s,
          open: l === p.type,
          onToggle: () => d((u) => u === p.type ? "" : p.type)
        },
        p.type
      ))
    ] })
  ] });
}
function G0({ engine: t, registry: e }) {
  const o = re(), { isRTL: r, labels: n } = te(), { target: s, commonProps: i } = d0(t), l = s.kind !== "none";
  ct((J, N) => {
    const _ = J.trim();
    if (_.startsWith("#")) {
      const st = _.slice(1), at = st.length === 3 ? st.split("").map((q) => q + q).join("") : st;
      if (at.length === 6) {
        const q = parseInt(at.slice(0, 2), 16), ot = parseInt(at.slice(2, 4), 16), ht = parseInt(at.slice(4, 6), 16);
        return `rgba(${q}, ${ot}, ${ht}, ${N})`;
      }
    }
    return _.startsWith("rgb(") ? `rgba(${_.slice(4, -1)}, ${N})` : (_.startsWith("rgba("), _);
  }, []);
  const [d, c] = rt(!1), [a, f] = rt(!1), [y, p] = rt(!1), [u, m] = rt(!1), g = ft(null), x = ft(!1), b = ct(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), w = ct(
    (J) => {
      const N = b() ? 1366 : 1024;
      return J <= N;
    },
    [b]
  ), I = ft(null), [k, M] = rt(null), C = ft(null), [A, P] = rt(!1), V = ct(() => {
    var _, st;
    const J = (_ = I.current) == null ? void 0 : _.offsetParent;
    if (J) return { width: J.clientWidth, height: J.clientHeight };
    const N = ((st = I.current) == null ? void 0 : st.ownerDocument.defaultView) ?? window;
    return { width: N.innerWidth, height: N.innerHeight };
  }, []), X = ct(() => {
    const { width: J } = V();
    return r ? { x: ro + 16, y: 12 } : { x: J - dr - 16, y: 12 };
  }, [V, r]), et = k ?? X(), it = ft(!1);
  zo(() => {
    if (!it.current && I.current && !k) {
      it.current = !0;
      const J = I.current.offsetParent;
      J && M(
        r ? { x: ro + 16, y: 12 } : { x: J.clientWidth - dr - 16, y: 12 }
      );
    }
  }, [k, r]), Mt(() => {
    var st, at;
    const J = ((st = I.current) == null ? void 0 : st.offsetParent) ?? ((at = I.current) == null ? void 0 : at.ownerDocument.body);
    if (!J) return;
    const N = new ResizeObserver((q) => {
      var tt;
      const ot = ((tt = q[0]) == null ? void 0 : tt.contentRect.width) ?? J.clientWidth;
      c(ot < 600);
      const ht = w(ot);
      f(ht), x.current || (m(ht), x.current = !0);
    });
    N.observe(J), c(J.clientWidth < 600);
    const _ = w(J.clientWidth);
    return f(_), x.current || (m(_), x.current = !0), () => N.disconnect();
  }, [w]), Mt(() => {
    var gt;
    const J = ((gt = I.current) == null ? void 0 : gt.ownerDocument) ?? document, N = () => {
      g.current !== null && window.clearTimeout(g.current), g.current = window.setTimeout(() => {
        p(!1), g.current = null;
      }, 200);
    }, _ = () => {
      g.current !== null && (window.clearTimeout(g.current), g.current = null), p(!0);
    }, st = (yt) => !!(yt instanceof Element && yt.closest("[data-sb-canvas]")), at = (yt) => {
      yt.button !== 2 && st(yt.target) && _();
    }, q = () => N(), ot = () => N(), ht = (yt) => {
      st(yt.target) && _();
    }, tt = () => N(), ut = (yt) => {
      var At;
      ((At = yt.detail) == null ? void 0 : At.active) ? _() : N();
    };
    return J.addEventListener("pointerdown", at, !0), J.addEventListener("pointerup", q, !0), J.addEventListener("pointercancel", ot, !0), J.addEventListener("focusin", ht, !0), J.addEventListener("focusout", tt, !0), J.addEventListener("sb:canvas-interaction", ut), () => {
      J.removeEventListener("pointerdown", at, !0), J.removeEventListener("pointerup", q, !0), J.removeEventListener("pointercancel", ot, !0), J.removeEventListener("focusin", ht, !0), J.removeEventListener("focusout", tt, !0), J.removeEventListener("sb:canvas-interaction", ut), g.current !== null && (window.clearTimeout(g.current), g.current = null);
    };
  }, []);
  const pt = ct(
    (J, N) => {
      P(!0);
      const _ = k ? k.x : X().x, st = k ? k.y : X().y;
      C.current = {
        startX: J.clientX,
        startY: J.clientY,
        startLeft: _,
        startTop: st
      }, (N ?? J.currentTarget).setPointerCapture(J.pointerId);
    },
    [k, X]
  ), wt = ct((J) => J instanceof Element ? !!J.closest(
    'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
  ) : !1, []), xt = ct(
    (J) => {
      d || J.button === 0 && (wt(J.target) || (J.stopPropagation(), pt(J, J.currentTarget)));
    },
    [d, wt, pt]
  ), D = ct(
    (J) => {
      if (!C.current) return;
      J.stopPropagation();
      const N = J.clientX - C.current.startX, _ = J.clientY - C.current.startY, { width: st, height: at } = V(), q = r ? 8 : ro, ot = r ? st - dr - ro - 8 : st - dr - 8, ht = Math.max(
        q,
        Math.min(ot, C.current.startLeft + N)
      ), tt = Math.max(
        8,
        Math.min(at - 100, C.current.startTop + _)
      );
      M({ x: ht, y: tt });
    },
    [V, r]
  ), W = ct(() => {
    C.current = null, P(!1);
  }, []), G = u && y, K = o.panelBg;
  return l ? d ? /* @__PURE__ */ S(
    "div",
    {
      ref: I,
      "data-sb-props-panel": !0,
      onPointerDown: (J) => J.stopPropagation(),
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "45vh",
        minHeight: 200,
        background: K,
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
                    /* @__PURE__ */ h("span", { children: n.autoHide }),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: u,
                        onChange: (J) => m(J.target.checked),
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
              Ta,
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
      ref: I,
      "data-sb-props-panel": !0,
      style: {
        position: "absolute",
        left: et.x,
        top: et.y,
        width: dr,
        background: K,
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
        transformOrigin: r ? "top left" : "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: G ? "none" : "auto",
        cursor: A ? "grabbing" : "grab"
      },
      onPointerDownCapture: xt,
      onPointerDown: (J) => J.stopPropagation(),
      onPointerMove: D,
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
                  onPointerDown: (J) => J.stopPropagation(),
                  children: [
                    /* @__PURE__ */ h("span", { children: n.autoHide }),
                    /* @__PURE__ */ h(
                      "input",
                      {
                        type: "checkbox",
                        checked: u,
                        onChange: (J) => m(J.target.checked),
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
              Ta,
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
function Y0({ engine: t, registry: e, gifApiBaseUrl: o }) {
  const { isRTL: r } = te();
  return /* @__PURE__ */ S(Ct, { children: [
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
          width: ro,
          zIndex: 100
        },
        onPointerDown: (n) => n.stopPropagation(),
        children: /* @__PURE__ */ h(i0, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ h(G0, { engine: t, registry: e })
  ] });
}
const Lr = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function j0(t) {
  const e = t.viewport.zoom, o = Lr.find((r) => r > e + 1e-3) ?? Lr[Lr.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function Z0(t) {
  const e = t.viewport.zoom, o = [...Lr].reverse().find((r) => r < e - 1e-3) ?? Lr[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const K0 = {
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
}, be = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Ne({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ h("path", { d: "M5 12h14", ...be }),
    t === "plus" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M12 5v14", ...be }),
      /* @__PURE__ */ h("path", { d: "M5 12h14", ...be })
    ] }),
    t === "undo" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...be, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...be, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...be, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...be, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...be }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...be })
    ] }),
    t === "play" && /* @__PURE__ */ h("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...be }),
      /* @__PURE__ */ h("path", { d: "M6 6V18M18 6V18", ...be }),
      /* @__PURE__ */ h("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...be })
    ] }),
    t === "gauge" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M4 15a8 8 0 1 1 16 0", ...be }),
      /* @__PURE__ */ h("path", { d: "M12 15l4-4", ...be }),
      /* @__PURE__ */ h("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "minimap" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "3.5", y: "3.5", width: "17", height: "17", rx: "2", ...be, fill: "none" }),
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
    t === "search" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "6", ...be }),
      /* @__PURE__ */ h("path", { d: "M16 16l5 5", ...be })
    ] }),
    t === "home" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M3 12l9-8 9 8", ...be, fill: "none" }),
      /* @__PURE__ */ h("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...be, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...be, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function q0({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showMinimap: r,
  onToggleMinimap: n,
  showPerfOverlay: s,
  onTogglePerfOverlay: i
}) {
  const l = re(), { labels: d } = te(), [c, a] = rt(t.viewport.zoom), [f, y] = rt(!1), [p, u] = rt(!1), [m, g] = rt(() => t.originView != null), [x, b] = rt(
    () => t.getAllNodes().filter((C) => C.type === "frame").length
  );
  Mt(() => {
    const C = () => a(t.viewport.zoom), A = () => {
      y(t.canUndo()), u(t.canRedo());
    }, P = () => {
      b(t.getAllNodes().filter((V) => V.type === "frame").length), g(t.originView != null);
    };
    return t.on("viewport", C), t.on("history", A), t.on("change", P), t.on("node:create", P), t.on("node:delete", P), () => {
      t.off("viewport", C), t.off("history", A), t.off("change", P), t.off("node:create", P), t.off("node:delete", P);
    };
  }, [t]);
  const w = l.panelBg, I = `1px solid ${l.border}`, k = {
    ...K0,
    borderRadius: l.panelBorderRadius
  }, M = {
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
      onPointerDown: (C) => C.stopPropagation(),
      children: [
        /* @__PURE__ */ S("div", { "data-sb-bar-zoom": !0, style: { ...k, background: w, border: I, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.zoomOut,
              onClick: () => Z0(t),
              style: { ...De, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Ne, { name: "minus" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
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
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: d.zoomIn,
              onClick: () => j0(t),
              style: { ...De, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Ne, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-nav": !0, style: { ...k, background: w, border: I, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.fitToContent,
              onClick: () => t.fitToContent(),
              style: { ...De, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Ne, { name: "fit" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
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
              children: /* @__PURE__ */ h(Ne, { name: "search" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: m ? d.clearOriginView : d.saveOriginView,
              onClick: () => {
                m ? (t.clearOriginView(), g(!1)) : (t.setOriginView(), g(!0));
              },
              style: { ...De, width: 32, height: 32, color: m ? l.accentColor : l.textFaint },
              children: /* @__PURE__ */ h(Ne, { name: m ? "bookmark-fill" : "bookmark" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: d.goToOriginView,
              onClick: () => {
                m && t.goToOriginView();
              },
              disabled: !m,
              style: { ...De, width: 32, height: 32, color: m ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Ne, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-present": !0, style: { ...k, overflow: "visible", background: w, border: I, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.presentSlides,
              onClick: () => t.enterPresentation(),
              style: { ...De, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Ne, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ S(Ct, { children: [
            /* @__PURE__ */ h("div", { style: M }),
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
                  /* @__PURE__ */ h(Ne, { name: "slides" }),
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
          n && /* @__PURE__ */ S(Ct, { children: [
            /* @__PURE__ */ h("div", { style: M }),
            /* @__PURE__ */ h(
              "button",
              {
                title: d.toggleMinimap,
                onClick: n,
                style: {
                  ...De,
                  width: 32,
                  height: 32,
                  color: r ? l.accentColor : l.textMuted
                },
                children: /* @__PURE__ */ h(Ne, { name: "minimap" })
              }
            )
          ] }),
          i && /* @__PURE__ */ S(Ct, { children: [
            /* @__PURE__ */ h("div", { style: M }),
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
                children: /* @__PURE__ */ h(Ne, { name: "gauge" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-history": !0, style: { ...k, background: w, border: I, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.undo,
              onClick: () => t.undo(),
              disabled: !f,
              style: { ...De, width: 32, height: 32, color: f ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Ne, { name: "undo" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: d.redo,
              onClick: () => t.redo(),
              disabled: !p,
              style: { ...De, width: 32, height: 32, color: p ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Ne, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
function U0(t) {
  return t.matches.length === 0 ? "0/0" : `${t.activeIndex >= 0 ? t.activeIndex + 1 : 0}/${t.matches.length}`;
}
function Q0({ engine: t }) {
  const e = re(), { labels: o } = te(), [r, n] = rt(!1), [s, i] = rt(() => t.getSearchState()), l = ft(null), d = Kt(() => U0(s), [s]);
  return Mt(() => {
    const c = () => i(t.getSearchState()), a = () => {
      n(!0), requestAnimationFrame(() => {
        var y;
        return (y = l.current) == null ? void 0 : y.focus();
      });
    }, f = document;
    return t.on("search", c), f.addEventListener("sb:search-open", a), () => {
      t.off("search", c), f.removeEventListener("sb:search-open", a);
    };
  }, [t]), Mt(() => {
    const c = (a) => {
      (a.ctrlKey || a.metaKey) && a.key.toLowerCase() === "f" && (a.preventDefault(), n(!0), requestAnimationFrame(() => {
        var y;
        return (y = l.current) == null ? void 0 : y.focus();
      }));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, []), Mt(() => {
    if (!r) return;
    const c = (a) => {
      var y;
      (a.ctrlKey || a.metaKey) && a.key.toLowerCase() === "f" ? (a.preventDefault(), (y = l.current) == null || y.focus()) : a.key === "Escape" && (a.preventDefault(), s.query ? t.clearSearch() : n(!1));
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
const ic = mr(!1);
function J0() {
  return Ye(ic);
}
const fs = 240, za = 6;
function ps(t) {
  const o = t.getAllNodes().filter((a) => a.type === "frame");
  if (o.length === 0) return [];
  const r = o.map((a) => ({
    id: a.id,
    x: a.x,
    y: a.y,
    slideOrder: a.data.slideOrder,
    label: a.data.label || "",
    borderColor: a.data.borderColor,
    transition: a.data.transition,
    transitionDuration: a.data.transitionDuration
  })), n = r.filter((a) => a.slideOrder != null).sort((a, f) => a.slideOrder - f.slideOrder), s = r.filter((a) => a.slideOrder == null), i = 100;
  s.sort((a, f) => a.y - f.y);
  const l = [];
  for (const a of s) {
    const f = l[l.length - 1];
    f && Math.abs(a.y - f[0].y) < i ? f.push(a) : l.push([a]);
  }
  const d = l.flatMap((a) => a.sort((f, y) => f.x - y.x));
  return [...n, ...d].map((a, f) => ({
    id: a.id,
    label: a.label || `Frame ${f + 1}`,
    order: f + 1,
    slideOrder: a.slideOrder,
    borderColor: a.borderColor,
    transition: a.transition,
    transitionDuration: a.transitionDuration
  }));
}
const $0 = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function _0() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...$0 }) });
}
function ty(t, e, o) {
  const [r, n] = rt("");
  return Mt(() => {
    let s = !1;
    return vp(t, e).then((i) => {
      s || n(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), r;
}
function ey({ engine: t, frameId: e, tick: o }) {
  const r = ty(t, e, o);
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
const oy = ["pan", "fade", "dissolve", "zoom", "fold", "cube", "none"];
function Aa({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ h("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ h("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ h("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ h("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ h("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ h("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ h("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ h("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const ry = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function ny({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: r,
  theme: n,
  labels: s
}) {
  const [i, l] = rt(!1), [d, c] = rt(!1), a = ft(null), f = ft(null), y = t !== "none", p = e ?? Hr[t], u = {
    pan: s.transitionPan,
    fade: s.transitionFadeToBlack,
    dissolve: s.transitionDissolve,
    zoom: s.transitionZoom,
    fold: s.transitionFold,
    cube: s.transitionCube,
    none: s.transitionNoneInstant
  };
  Mt(() => {
    if (!i && !d) return;
    const g = (x) => {
      i && a.current && !a.current.contains(x.target) && l(!1), d && f.current && !f.current.contains(x.target) && c(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
  }, [i, d]);
  const m = {
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
        zIndex: i || d ? 50 : void 0
      },
      children: [
        /* @__PURE__ */ h("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: n.border } }),
        /* @__PURE__ */ S("div", { ref: a, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            l((g) => !g), c(!1);
          }, style: m, children: [
            /* @__PURE__ */ h(Aa, { type: t }),
            /* @__PURE__ */ h("span", { children: u[t] ?? s.transitionPan }),
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
              children: oy.map((g) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    o(g), l(!1);
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
                    /* @__PURE__ */ h(Aa, { type: g }),
                    u[g]
                  ]
                },
                g
              ))
            }
          )
        ] }),
        y && /* @__PURE__ */ S("div", { ref: f, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            c((g) => !g), l(!1);
          }, style: m, children: [
            /* @__PURE__ */ S("span", { children: [
              p,
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
              children: ry.map((g) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    r(g === Hr[t] ? void 0 : g), c(!1);
                  },
                  style: {
                    border: "none",
                    background: g === p ? n.controlBgActive : "transparent",
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
                    g === Hr[t] ? " •" : ""
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
function sy({ engine: t, open: e, onClose: o }) {
  const r = re(), { isRTL: n, labels: s } = te(), i = J0(), [l, d] = rt(() => ps(t)), [c, a] = rt(() => new Set(t.selection)), [f, y] = rt(0), p = Hn(t, "frames-panel"), u = ft(null), m = ft(null), g = ft(0), x = ft(!1), b = ft(l);
  b.current = l;
  const w = ft(!1), I = ft(!1), [k, M] = rt(null), [C, A] = rt(null), [P, V] = rt(0), X = ft([]), et = ft(null), it = ct(() => {
    if (w.current) return;
    const G = ps(t);
    d(G);
  }, [t]), pt = ct(() => {
    a(new Set(t.selection));
  }, [t]), wt = ft(null), xt = ct(() => {
    wt.current && clearTimeout(wt.current), wt.current = setTimeout(() => y((G) => G + 1), 500);
  }, []);
  Mt(() => {
    it(), pt();
    const G = setTimeout(() => y((J) => J + 1), 200), K = () => {
      it(), xt();
    };
    return t.on("change", K), t.on("node:create", K), t.on("node:delete", K), t.on("node:data", K), t.on("selection", pt), t.on("history", K), () => {
      clearTimeout(G), t.off("change", K), t.off("node:create", K), t.off("node:delete", K), t.off("node:data", K), t.off("selection", pt), t.off("history", K), wt.current && clearTimeout(wt.current);
    };
  }, [t, it, pt, xt]), Mt(() => {
    if (!et.current) return;
    const G = et.current.querySelectorAll("[data-frame-card]");
    X.current = Array.from(G).map((K) => K.offsetHeight + za);
  }, [l]);
  const D = ct(
    (G) => {
      t.select(G), t.zoomToNode(G, 0.8);
    },
    [t]
  ), W = ct(
    (G, K) => {
      G.preventDefault(), G.stopPropagation(), g.current = G.clientY, u.current = K, m.current = K, x.current = !1;
    },
    []
  );
  return Mt(() => {
    const G = (J) => {
      if (u.current === null) return;
      const N = J.clientY - g.current;
      if (!x.current) {
        if (Math.abs(N) < 4) return;
        x.current = !0, M(u.current), A(u.current);
      }
      V(N);
      const _ = X.current, st = u.current;
      let at = st;
      if (N > 0) {
        let q = 0;
        for (let ot = st + 1; ot < b.current.length && (q += _[ot] || 0, N > q - (_[ot] || 0) / 2); ot++)
          at = ot;
      } else if (N < 0) {
        let q = 0;
        for (let ot = st - 1; ot >= 0 && (q -= _[ot] || 0, N < q + (_[ot] || 0) / 2); ot--)
          at = ot;
      }
      m.current = at, A(at);
    }, K = () => {
      const J = u.current, N = m.current;
      if (J !== null && N !== null && J !== N) {
        w.current = !0;
        const _ = [...b.current], [st] = _.splice(J, 1);
        _.splice(N, 0, st);
        let at = !0;
        for (let q = 0; q < _.length; q++) {
          const ot = _[q], ht = t.getNode(ot.id);
          ht && (at ? (t.updateNodeWithHistory(ot.id, {
            data: { ...ht.data, slideOrder: q + 1 }
          }), at = !1) : t.updateNode(ot.id, {
            data: { ...ht.data, slideOrder: q + 1 }
          }));
        }
        w.current = !1, I.current = !0, d(ps(t)), y((q) => q + 1);
      }
      u.current = null, m.current = null, x.current = !1, M(null), A(null), V(0), I.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          I.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", G), document.addEventListener("pointerup", K), document.addEventListener("pointercancel", K), () => {
      document.removeEventListener("pointermove", G), document.removeEventListener("pointerup", K), document.removeEventListener("pointercancel", K);
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
        width: fs,
        background: r.panelBg,
        borderLeft: n ? void 0 : `1px solid ${r.border}`,
        borderRight: n ? `1px solid ${r.border}` : void 0,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : n ? `translateX(-${fs}px)` : `translateX(${fs}px)`,
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
              borderBottom: `1px solid ${r.border}`,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ S("span", { style: { fontSize: 12, fontWeight: 600, color: r.text, letterSpacing: "0.02em" }, children: [
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
                    color: r.textMuted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    padding: 0
                  },
                  children: /* @__PURE__ */ h(_0, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ S(
          "div",
          {
            ref: et,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: za
            },
            children: [
              l.length === 0 && /* @__PURE__ */ h("div", { style: { padding: "20px 8px", textAlign: "center", color: r.textMuted, fontSize: 11 }, children: s.noFramesYet }),
              l.map((G, K) => {
                const J = c.has(G.id), N = k === K;
                let _ = 0;
                if (N)
                  _ = P;
                else if (k !== null && C !== null) {
                  const q = X.current;
                  k < C ? K > k && K <= C && (_ = -(q[k] || 0)) : k > C && K >= C && K < k && (_ = q[k] || 0);
                }
                const st = (q) => {
                  const ot = t.getNode(G.id);
                  if (!ot) return;
                  const ht = `${p()}:${G.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    G.id,
                    {
                      data: {
                        ...ot.data,
                        transition: q === "pan" ? void 0 : q,
                        transitionDuration: void 0
                      }
                    },
                    ht
                  );
                }, at = (q) => {
                  const ot = t.getNode(G.id);
                  if (!ot) return;
                  const ht = `${p()}:${G.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    G.id,
                    {
                      data: { ...ot.data, transitionDuration: q }
                    },
                    ht
                  );
                };
                return /* @__PURE__ */ S(Bc.Fragment, { children: [
                  !i && k === null && /* @__PURE__ */ h(
                    ny,
                    {
                      value: G.transition ?? "pan",
                      durationMs: G.transitionDuration,
                      onChange: st,
                      onDurationChange: at,
                      theme: r,
                      labels: s
                    }
                  ),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: i ? void 0 : (q) => W(q, K),
                      onDoubleClick: () => D(G.id),
                      style: {
                        borderRadius: 6,
                        border: J ? `2px solid ${G.borderColor || r.text}` : `1px solid ${r.border}`,
                        background: J ? r.controlBgActive : "transparent",
                        cursor: i ? "pointer" : N ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: i ? "auto" : "none",
                        transition: N || I.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${_}px)`,
                        zIndex: N ? 10 : 1,
                        opacity: N ? 0.92 : 1,
                        boxShadow: N ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ h(ey, { engine: t, frameId: G.id, tick: f })
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
const Bo = 50, ys = 30, iy = `
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
`, ay = `
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
function Ea(t, e, o) {
  const r = t.createShader(e);
  return r ? (t.shaderSource(r, o), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (t.deleteShader(r), null)) : null;
}
function ly(t, e, o) {
  const r = Ea(t, t.VERTEX_SHADER, e), n = Ea(t, t.FRAGMENT_SHADER, o);
  if (!r || !n) return null;
  const s = t.createProgram();
  return t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function cy() {
  const t = [], e = [];
  for (let o = 0; o <= ys; o++)
    for (let r = 0; r <= Bo; r++)
      t.push(r / Bo, o / ys * 2 - 1);
  for (let o = 0; o < ys; o++)
    for (let r = 0; r < Bo; r++) {
      const n = o * (Bo + 1) + r;
      e.push(n, n + Bo + 1, n + 1, n + 1, n + Bo + 1, n + Bo + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function dy({ phase: t, progress: e }) {
  const o = ft(null), r = ft(null);
  return Mt(() => {
    const n = o.current;
    if (!n) return;
    const s = window.devicePixelRatio || 1;
    n.width = n.clientWidth * s, n.height = n.clientHeight * s;
    const i = n.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const l = ly(i, iy, ay);
    if (!l) return;
    i.useProgram(l);
    const { vertices: d, indices: c } = cy(), a = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, a), i.bufferData(i.ARRAY_BUFFER, d, i.STATIC_DRAW);
    const f = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, f), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const y = i.getAttribLocation(l, "aUV");
    i.enableVertexAttribArray(y), i.vertexAttribPointer(y, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const p = (u) => i.getUniformLocation(l, u);
    return r.current = {
      gl: i,
      locs: { uLayPos: p("uLayPos"), uRadius: p("uRadius"), uSide: p("uSide"), uColor: p("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(l), i.deleteBuffer(a), i.deleteBuffer(f), r.current = null;
    };
  }, []), Mt(() => {
    const n = r.current;
    if (!n) return;
    const { gl: s, locs: i, count: l } = n, d = t === "out" ? 1 - Math.pow(1 - e, 3) : Math.pow(e, 3), c = t === "out" ? 1 - d : d, a = 0.07 + 0.16 * c;
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
const hy = {
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
}, ms = {
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
}, Gs = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Pa({ dir: t }) {
  return /* @__PURE__ */ S("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ h("polyline", { points: "15,18 9,12 15,6", ...Gs }),
    t === "right" && /* @__PURE__ */ h("polyline", { points: "9,6 15,12 9,18", ...Gs })
  ] });
}
function uy() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...Gs }) });
}
function Ha(t) {
  return 1 - Math.pow(1 - t, 3);
}
function La(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Ra(t, e) {
  let r;
  t <= 0.2 ? r = 1 + (0.55 - 1) * Ha(t / 0.2) : t >= 0.8 ? r = 0.55 + (1 - 0.55) * Ha((t - 0.8) / 0.2) : r = 0.55;
  let n;
  return t <= 0.1 ? n = 0 : t <= 0.5 ? n = -e * 90 * La((t - 0.1) / 0.4) : t <= 0.9 ? n = e * 90 * (1 - La((t - 0.5) / 0.4)) : n = 0, { zoom: r, angle: n };
}
function fy(t, e, o, r) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${r}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function Da(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function py({ engine: t }) {
  const [e, o] = rt(t.presentationMode), [r, n] = rt(t.presentationIndex), [s, i] = rt(t.presentationSlides.length), [l, d] = rt(""), [c, a] = rt(t.transitionOverlay), f = ft(null), y = ft(null);
  if (Mt(() => {
    const u = document.querySelector("[data-sb-canvas]");
    f.current = u, y.current = (u == null ? void 0 : u.parentElement) ?? null;
    const m = () => {
      var w;
      if (o(t.presentationMode), n(t.presentationIndex), i(t.presentationSlides.length), a(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const I = t.presentationSlides[t.presentationIndex], k = t.getNode(I);
        d(((w = k == null ? void 0 : k.data) == null ? void 0 : w.label) || "");
      } else
        d("");
      const g = t.transitionOverlay, x = f.current, b = y.current;
      if (x && b && g && g.type === "cube" && g.t != null) {
        const I = g.direction ?? 1, { zoom: k, angle: M } = Ra(g.t, I);
        fy(x, b, k, M);
      } else x && b && Da(x, b);
    };
    return t.on("presentation", m), () => {
      t.off("presentation", m);
      const g = f.current, x = y.current;
      g && x && Da(g, x);
    };
  }, [t]), !e || s === 0) return null;
  const p = c && c.type === "cube" && c.t != null ? (() => {
    const u = c.direction ?? 1, { angle: m } = Ra(c.t, u);
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
        c && c.type === "fold" && /* @__PURE__ */ h(dy, { phase: c.phase, progress: c.progress }),
        p > 0.01 && /* @__PURE__ */ h(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              backgroundColor: "black",
              opacity: p,
              pointerEvents: "none",
              zIndex: 9999
            }
          }
        ),
        /* @__PURE__ */ S("div", { style: hy, onPointerDown: (u) => u.stopPropagation(), children: [
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...ms, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ h(uy, {})
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...ms, opacity: r <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: r <= 0,
              children: /* @__PURE__ */ h(Pa, { dir: "left" })
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
              style: { ...ms, opacity: r >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: r >= s - 1,
              children: /* @__PURE__ */ h(Pa, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
function mo(t) {
  return `${t.toFixed(2)} ms`;
}
function Ie(t, e) {
  return { label: t, value: e };
}
function yy() {
  const t = re(), { labels: e } = te(), [o, r] = rt(() => ve.getSnapshot());
  Mt(() => {
    let s = 0;
    const i = (d) => {
      ve.tick(d), s = requestAnimationFrame(i);
    };
    s = requestAnimationFrame(i);
    const l = ve.subscribe(() => r(ve.getSnapshot()));
    return () => {
      cancelAnimationFrame(s), l();
    };
  }, []);
  const n = Kt(
    () => [
      Ie(e.perfVirtualization, o.virtualizationActive ? e.perfOn : e.perfOff),
      Ie(e.perfFps, o.fps.toFixed(1)),
      Ie(e.perfFrameP50P95, `${mo(o.frameMsP50)} / ${mo(o.frameMsP95)}`),
      Ie(e.perfCullingP50P95, `${mo(o.cullingMsP50)} / ${mo(o.cullingMsP95)}`),
      Ie(e.perfHitTestP50P95, `${mo(o.hitTestMsP50)} / ${mo(o.hitTestMsP95)}`),
      Ie(e.perfEdgeHitP50P95, `${mo(o.edgeHitMsP50)} / ${mo(o.edgeHitMsP95)}`),
      Ie(e.perfHitTestCalls, o.hitTestCallsPerSec.toFixed(1)),
      Ie(e.perfEdgeHitCalls, o.edgeHitCallsPerSec.toFixed(1)),
      Ie(e.perfVisibleNodes, `${o.visibleNodes} / ${o.totalNodes}`),
      Ie(e.perfVisibleEdges, `${o.visibleEdges} / ${o.totalEdges}`),
      Ie(e.perfSeedVisibleNodes, String(o.seedVisibleNodes)),
      Ie(e.perfNodesAdjacency, String(o.nodesAddedByAdjacency)),
      Ie(e.perfNodesEdgeEndpoints, String(o.nodesAddedByEdgeEndpoints)),
      Ie(e.perfEdgesAdjacency, String(o.edgesAddedByAdjacency)),
      Ie(e.perfEdgesCrossing, String(o.edgesAddedByCrossing))
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
const my = Vc(() => import("./DebugPanel-CebSxAXf.js"));
function Vy({
  nodeTypes: t = Ou,
  engine: e,
  keyboardShortcuts: o = !0,
  style: r,
  initialData: n,
  toolbar: s = !0,
  debugPanel: i = !1,
  debugBoards: l,
  theme: d,
  onPresentationChange: c,
  gifApiBaseUrl: a,
  direction: f,
  localization: y,
  dataFlowEdgeOverlay: p = "off",
  initialFramesPanelOpen: u = !1,
  preview: m = !1,
  readOnly: g = !1,
  singleFrameId: x
}) {
  const b = Kt(
    () => e ?? new zs(),
    [e]
  ), w = Kt(() => new lh(t), [t]);
  Mt(() => Sd(), []), Mt(() => {
    b.setRegistry(w);
  }, [b, w]), Mt(() => {
    b.setReadOnly(g);
  }, [b, g]), Mt(() => {
    for (const D of t)
      D.isContainer && b.registerContainerType(D.type);
  }, [b, t]);
  const I = ft(!1);
  Mt(() => {
    if (!n || I.current) return;
    I.current = !0;
    let D = !1;
    return m || x ? (async () => (await b.fromSBD(n), !D && requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        D || (x ? b.fitToFrame(x) : b.fitToContent());
      });
    })))() : b.fromSBD(n), () => {
      D = !0;
    };
  }, [b, n, m, x]);
  const k = ft(null);
  Mt(() => {
    if (o)
      return op(b, k.current);
  }, [b, o]);
  const M = Kt(() => t.some((W) => {
    var G;
    return (G = W.ports) == null ? void 0 : G.length;
  }) ? new Vu(b, w) : null, [b, w, t]);
  Mt(() => {
    if (M)
      return M.connect();
  }, [M]);
  const C = Kt(
    () => d ? { ...Rs, ...d } : Rs,
    [d]
  ), A = Qu(f, y), [P, V] = rt(!1), [X, et] = rt(u), [it, pt] = rt(!m), [wt, xt] = rt(!1);
  return Mt(() => {
    ve.setEnabled(m ? !1 : wt);
  }, [m, wt]), Mt(() => {
    const D = () => {
      const W = b.presentationMode;
      V(W), c == null || c(W);
    };
    return b.on("presentation", D), () => b.off("presentation", D);
  }, [b, c]), /* @__PURE__ */ h(yl.Provider, { value: A, children: /* @__PURE__ */ h(pl.Provider, { value: C, children: /* @__PURE__ */ h(ic.Provider, { value: g, children: /* @__PURE__ */ S(
    "div",
    {
      ref: k,
      dir: A.dir,
      tabIndex: o ? 0 : void 0,
      onPointerDownCapture: o ? (D) => {
        if (D.target.closest('input, textarea, [contenteditable="true"]')) return;
        const G = k.current;
        G && !G.contains(G.ownerDocument.activeElement) && G.focus({ preventScroll: !0 });
      } : void 0,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        outline: "none",
        ...r
      },
      children: [
        s && !P && !g && /* @__PURE__ */ h(Y0, { engine: b, registry: w, gifApiBaseUrl: a }),
        i && /* @__PURE__ */ h(Oc, { fallback: null, children: /* @__PURE__ */ h(my, { engine: b, extraBoards: l }) }),
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !P && !g && !A.isRTL ? ro : 0,
              top: 0,
              right: s && !P && !g && A.isRTL ? ro : 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ h(
                Ep,
                {
                  engine: b,
                  schema: js,
                  registry: w,
                  dataFlow: M,
                  dataFlowEdgeOverlay: p,
                  minimapVisible: m ? !1 : it,
                  singleFrameId: x
                }
              ),
              !m && !P && /* @__PURE__ */ h(Q0, { engine: b }),
              !m && !P && /* @__PURE__ */ h(
                q0,
                {
                  engine: b,
                  framesPanelOpen: X,
                  onToggleFramesPanel: () => et((D) => !D),
                  showMinimap: it,
                  onToggleMinimap: () => pt((D) => !D),
                  showPerfOverlay: wt,
                  onTogglePerfOverlay: () => xt((D) => !D)
                }
              ),
              !m && !P && wt && /* @__PURE__ */ h(yy, {}),
              !m && !P && /* @__PURE__ */ h(
                sy,
                {
                  engine: b,
                  open: X,
                  onClose: () => et(!1)
                }
              ),
              !m && /* @__PURE__ */ h(py, { engine: b }),
              g && !P && !m && /* @__PURE__ */ h(
                "div",
                {
                  "data-sb-readonly-pill": !0,
                  style: {
                    position: "absolute",
                    top: 12,
                    [A.isRTL ? "left" : "right"]: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    background: C.panelBg,
                    color: C.textMuted,
                    border: `1px solid ${C.border}`,
                    boxShadow: C.panelShadow,
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 10
                  },
                  children: A.labels.viewOnly ?? "View only"
                }
              )
            ]
          }
        )
      ]
    }
  ) }) }) });
}
const gy = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], ar = {
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
function Ar({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...ce }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ...ce })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...ce }),
    t === "text" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M7 4h10", ...ce }),
      /* @__PURE__ */ h("path", { d: "M12 4v16", ...ce })
    ] }),
    t === "note" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ...ce }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...ce }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...ce, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...ce, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...ce, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...ce }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ...ce })
    ] }),
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...ce }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...ce }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...ce }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...ce }),
    t === "arrow" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...ce }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...ce, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ce, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...ce, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ce, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...ce, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ...ce }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...ce }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...ce })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...ce }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...ce })
    ] })
  ] });
}
function Xy({ engine: t }) {
  const [e, o] = rt(t.mode), [r, n] = rt(!1), [s, i] = rt(!1), [l, d] = rt(t.boardBackground);
  return Mt(() => {
    const c = () => o(t.mode), a = () => {
      n(t.canUndo()), i(t.canRedo());
    }, f = () => d(t.boardBackground);
    return t.on("mode", c), t.on("history", a), t.on("background", f), () => {
      t.off("mode", c), t.off("history", a), t.off("background", f);
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
        gy.map((c) => /* @__PURE__ */ h(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...ar,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(Ar, { name: c.key })
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
              ...ar,
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
              ...ar,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(Ar, { name: "print" })
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
              ...ar,
              width: 36,
              height: 36,
              background: "transparent",
              color: r ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(Ar, { name: "undo" })
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...ar,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(Ar, { name: "redo" })
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
              ...ar,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(Ar, { name: "fit" })
          }
        )
      ]
    }
  );
}
const go = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], by = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], xy = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], lr = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], wy = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], cr = [1, 2.5, 5, 10, 20], vy = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], ky = [14, 20, 28, 36], Sy = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], gs = 300, ee = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, oe = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0
}, ae = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
};
function Gy({
  engine: t,
  registry: e
}) {
  const [o, r] = rt(t.mode), [n, s] = rt(t.selection), [, i] = rt(0), [l, d] = rt(null), c = ft(null), a = ft(null), [f, y] = rt(!1), p = ct(() => {
    var lt;
    return { x: (((lt = c.current) == null ? void 0 : lt.ownerDocument.defaultView) ?? window).innerWidth - gs - 12, y: 12 };
  }, []), u = l ?? p();
  Mt(() => {
    const T = () => r(t.mode), lt = () => {
      s(new Set(t.selection)), i((Se) => Se + 1);
    }, le = () => i((Se) => Se + 1);
    return t.on("mode", T), t.on("selection", lt), t.on("change", le), () => {
      t.off("mode", T), t.off("selection", lt), t.off("change", le);
    };
  }, [t]);
  const m = ct((T) => {
    T.stopPropagation(), y(!0);
    const lt = l ? l.x : p().x, le = l ? l.y : p().y;
    a.current = { startX: T.clientX, startY: T.clientY, startLeft: lt, startTop: le }, T.currentTarget.setPointerCapture(T.pointerId);
  }, [l, p]);
  Mt(() => {
    var Se;
    const T = (de) => {
      var Ho;
      if (!a.current) return;
      const Ve = de.clientX - a.current.startX, qt = de.clientY - a.current.startY, Ze = ((Ho = c.current) == null ? void 0 : Ho.ownerDocument.defaultView) ?? window, Po = Math.max(48, Math.min(Ze.innerWidth - gs - 8, a.current.startLeft + Ve)), xr = Math.max(8, Math.min(Ze.innerHeight - 100, a.current.startTop + qt));
      d({ x: Po, y: xr });
    }, lt = () => {
      a.current = null, y(!1);
    }, le = ((Se = c.current) == null ? void 0 : Se.ownerDocument) ?? document;
    return le.addEventListener("pointermove", T), le.addEventListener("pointerup", lt), le.addEventListener("pointercancel", lt), () => {
      le.removeEventListener("pointermove", T), le.removeEventListener("pointerup", lt), le.removeEventListener("pointercancel", lt);
    };
  }, []);
  const g = Kt(() => n.size === 1 ? Array.from(n)[0] : o === "draw" || o === "shape" || o === "text" || o === "edge" ? "tool" : "none", [n, o]), x = Hn(t, g), b = (() => {
    if (n.size === 1) {
      const T = Array.from(n)[0], lt = t.getNode(T);
      if ((lt == null ? void 0 : lt.type) === "shape") return { kind: "shape", node: lt };
      if ((lt == null ? void 0 : lt.type) === "draw") return { kind: "draw", node: lt };
      if ((lt == null ? void 0 : lt.type) === "text") return { kind: "text", node: lt };
      if ((lt == null ? void 0 : lt.type) === "edge") return { kind: "edge", node: lt };
      if ((lt == null ? void 0 : lt.type) === "image") return { kind: "image", node: lt };
      if ((lt == null ? void 0 : lt.type) === "content") return { kind: "content", node: lt };
      if ((lt == null ? void 0 : lt.type) === "frame") return { kind: "frame", node: lt };
      if ((lt == null ? void 0 : lt.type) === "sticky") return { kind: "sticky", node: lt };
      if (lt && e) {
        const le = e.get(lt.type);
        if (le != null && le.propertiesPanel)
          return { kind: "custom", node: lt, PanelComponent: le.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" || o === "edge" ? { kind: "tool" } : null;
  })(), w = ct(
    (T) => {
      if (!b || b.kind !== "shape") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  ), I = ct(
    (T) => {
      if (!b || b.kind !== "draw") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  ), k = ct(
    (T) => {
      if (!b || b.kind !== "text") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  ), M = ct(
    (T) => {
      if (!b || b.kind !== "edge") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  ), C = ct(
    (T) => {
      if (!b || b.kind !== "image") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  ), A = ct(
    (T) => {
      if (!b || b.kind !== "content") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  ), P = ct(
    (T) => {
      if (!b || b.kind !== "frame") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  ), V = ct(
    (T) => {
      if (!b || b.kind !== "sticky") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  ), X = ct(
    (T) => {
      if (!b || b.kind !== "custom") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...T }
        },
        lt
      );
    },
    [t, b, x]
  );
  if (!b) return null;
  const et = b.kind === "custom", it = b.kind === "shape", pt = b.kind === "draw", wt = b.kind === "text", xt = b.kind === "edge", D = b.kind === "image", W = b.kind === "content", G = b.kind === "frame", K = b.kind === "sticky", J = b.kind === "tool", N = J && o === "shape", _ = J && o === "text", st = wt ? b.node.data.fontFamily : t.activeTool.fontFamily ?? ko, at = wt ? b.node.data.fontSize : t.activeTool.fontSize ?? 20, q = wt ? b.node.data.align : t.activeTool.textAlign ?? "left", ot = wt ? b.node.data.color : t.activeTool.color, ht = it ? b.node.data.stroke : pt ? b.node.data.color : t.activeTool.color, tt = it || pt ? b.node.data.fill ?? null : t.activeTool.fillColor ?? null, ut = it || pt ? b.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", gt = it || pt ? b.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", yt = it || pt ? b.node.data.strokeWidth : t.activeTool.width, kt = it ? b.node.data.roughness : t.activeTool.roughness ?? 1, At = it || pt || wt || D || W || G || K ? b.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Nt = (() => {
    const T = /* @__PURE__ */ new Set(), lt = [];
    for (const le of t.getAllNodes())
      if (le.type === "text") {
        const Se = le.data.fontFamily;
        Se && !T.has(Se) && (T.add(Se), lt.push(Se));
      }
    return lt;
  })(), Lt = !wt && !_ && !xt && !D && !W && !G && !K && !et, dt = Lt, Ft = Lt, Yt = it || N, Ut = wt || _, $t = (T) => {
    it ? w({ stroke: T }) : pt ? I({ color: T }) : (t.activeTool.color = T, i((lt) => lt + 1));
  }, Qt = (T) => {
    it ? w({ fill: T ?? void 0 }) : pt ? I({ fill: T ?? void 0 }) : (t.activeTool.fillColor = T ?? void 0, i((lt) => lt + 1));
  }, mt = (T) => {
    it ? w({ fillStyle: T }) : pt ? I({ fillStyle: T }) : (t.activeTool.fillStyle = T, i((lt) => lt + 1));
  }, ye = (T) => {
    it ? w({ strokeStyle: T }) : pt ? I({ strokeStyle: T }) : (t.activeTool.strokeStyle = T, i((lt) => lt + 1));
  }, he = (T) => {
    it ? w({ strokeWidth: T }) : pt ? I({ strokeWidth: T }) : (t.activeTool.width = T, i((lt) => lt + 1));
  }, ie = (T) => {
    it ? w({ roughness: T }) : (t.activeTool.roughness = T, i((lt) => lt + 1));
  }, ge = (T) => {
    it ? w({ opacity: T }) : pt ? I({ opacity: T }) : wt ? k({ opacity: T }) : D ? C({ opacity: T }) : W ? A({ opacity: T }) : G ? P({ opacity: T }) : K ? V({ opacity: T }) : (t.activeTool.opacity = T, i((lt) => lt + 1));
  }, ke = (T) => {
    wt ? k({ fontFamily: T }) : (t.activeTool.fontFamily = T, i((lt) => lt + 1));
  }, Be = (T) => {
    wt ? k({ fontSize: T }) : (t.activeTool.fontSize = T, i((lt) => lt + 1));
  }, br = (T) => {
    wt ? k({ align: T }) : (t.activeTool.textAlign = T, i((lt) => lt + 1));
  }, Eo = (T) => {
    wt ? k({ color: T }) : (t.activeTool.color = T, i((lt) => lt + 1));
  }, $e = {
    position: "fixed",
    left: u.x,
    top: u.y,
    width: gs,
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
      style: $e,
      onPointerDown: (T) => T.stopPropagation(),
      children: [
        /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: m,
            style: {
              cursor: f ? "grabbing" : "grab",
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
        Ut && /* @__PURE__ */ S(Ct, { children: [
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Font" }),
            /* @__PURE__ */ h(
              Rn,
              {
                value: st,
                onChange: ke,
                fontsInScene: Nt
              }
            )
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Size" }),
            ky.map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Be(T),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: at === T ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: T
              },
              T
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Align" }),
            Sy.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.key,
                onClick: () => br(T.key),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: q === T.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: T.label
              },
              T.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Color" }),
            go.map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Eo(T),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T,
                  border: ot === T ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              T
            ))
          ] }),
          wt && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Border" }),
            [null, ...go].map((T, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => k({ borderColor: T ?? void 0 }),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === T ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: lt === 0 && /* @__PURE__ */ h(
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
              T ?? "none"
            ))
          ] }),
          wt && b.node.data.borderColor && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Style" }),
            lr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => k({ borderStyle: T.key }),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === T.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: T.dash
                  }
                ) })
              },
              T.key
            ))
          ] }),
          wt && b.node.data.borderColor && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Width" }),
            cr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: `${T}px`,
                onClick: () => k({ borderWidth: T }),
                style: {
                  ...ae,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === T ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(T, 1),
                      background: "white",
                      borderRadius: T / 2
                    }
                  }
                )
              },
              T
            ))
          ] })
        ] }),
        Lt && /* @__PURE__ */ S(Ct, { children: [
          N && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Shape" }),
            vy.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => {
                  t.activeTool.shapeType = T.key, i((lt) => lt + 1);
                },
                style: {
                  ...ae,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === T.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(My, { name: T.key })
              },
              T.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Stroke" }),
            go.map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => $t(T),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T,
                  border: ht === T ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              T
            ))
          ] }),
          dt && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Fill" }),
            by.map((T, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Qt(T),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T ?? "transparent",
                  border: tt === T ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: lt === 0 && /* @__PURE__ */ h(
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
              T ?? "none"
            ))
          ] }),
          dt && tt && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Fill pattern" }),
            xy.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => mt(T.key),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: ut === T.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(Cy, { style: T.key })
              },
              T.key
            ))
          ] }),
          Ft && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Stroke style" }),
            lr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => ye(T.key),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: gt === T.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: T.dash
                  }
                ) })
              },
              T.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Stroke width" }),
            cr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: `${T}px`,
                onClick: () => he(T),
                style: {
                  ...ae,
                  width: 36,
                  height: 24,
                  background: yt === T ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(T, 1),
                      background: "white",
                      borderRadius: T / 2
                    }
                  }
                )
              },
              T
            ))
          ] }),
          Yt && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Roughness" }),
            wy.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => ie(T.value),
                style: {
                  ...ae,
                  height: 28,
                  padding: "0 8px",
                  background: kt === T.value ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: T.label
              },
              T.value
            ))
          ] })
        ] }),
        xt && /* @__PURE__ */ S(Ct, { children: [
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Color" }),
            go.map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ color: T }),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T,
                  border: b.node.data.color === T ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              T
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Style" }),
            lr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => M({ style: T.key }),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: b.node.data.style === T.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: T.dash
                  }
                ) })
              },
              T.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Width" }),
            cr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: `${T}px`,
                onClick: () => M({ strokeWidth: T }),
                style: {
                  ...ae,
                  width: 36,
                  height: 24,
                  background: b.node.data.strokeWidth === T ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(T, 1),
                      background: "white",
                      borderRadius: T / 2
                    }
                  }
                )
              },
              T
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ arrowHead: T }),
                style: {
                  ...ae,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.arrowHead ?? "none") === T ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: T === "none" ? "None" : T === "arrow" ? "▷" : T === "filled" ? "▶" : "●"
              },
              T
            ))
          ] }),
          (b.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Head size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3),
                onChange: (T) => M({ arrowHeadSize: Number(T.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ arrowTail: T }),
                style: {
                  ...ae,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.arrowTail ?? "none") === T ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: T === "none" ? "None" : T === "arrow" ? "◁" : T === "filled" ? "◀" : "●"
              },
              T
            ))
          ] }),
          (b.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Tail size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3),
                onChange: (T) => M({ arrowTailSize: Number(T.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (T) => M({ label: T.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => M({ edgeType: T.key }),
                style: {
                  ...ae,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.edgeType ?? "bezier") === T.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: T.label
              },
              T.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Animate" }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ animated: !b.node.data.animated }),
                style: {
                  ...ae,
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
          b.node.data.animated && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Direction" }),
            ["forward", "reverse", "both"].map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ animatedDirection: T }),
                style: {
                  ...ae,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.animatedDirection ?? "forward") === T ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: T === "forward" ? "→" : T === "reverse" ? "←" : "⇆"
              },
              T
            ))
          ] })
        ] }),
        D && /* @__PURE__ */ S(Ct, { children: [
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Border" }),
            [null, ...go].map((T, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ borderColor: T ?? void 0 }),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === T ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: lt === 0 && /* @__PURE__ */ h(
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
              T ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Style" }),
            lr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => C({ borderStyle: T.key }),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === T.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: T.dash
                  }
                ) })
              },
              T.key
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Width" }),
            cr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: `${T}px`,
                onClick: () => C({ borderWidth: T }),
                style: {
                  ...ae,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === T ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(T, 1),
                      background: "white",
                      borderRadius: T / 2
                    }
                  }
                )
              },
              T
            ))
          ] })
        ] }),
        W && /* @__PURE__ */ S(Ct, { children: [
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Border" }),
            [null, ...go].map((T, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => A({ borderColor: T ?? void 0 }),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === T ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: lt === 0 && /* @__PURE__ */ h(
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
              T ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Style" }),
            lr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => A({ borderStyle: T.key }),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === T.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: T.dash
                  }
                ) })
              },
              T.key
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Width" }),
            cr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: `${T}px`,
                onClick: () => A({ borderWidth: T }),
                style: {
                  ...ae,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === T ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(T, 1),
                      background: "white",
                      borderRadius: T / 2
                    }
                  }
                )
              },
              T
            ))
          ] })
        ] }),
        G && /* @__PURE__ */ S(Ct, { children: [
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (T) => P({ label: T.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Background" }),
            [null, ...go].map((T, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => P({ backgroundColor: T ? `${T}15` : void 0 }),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T ?? "transparent",
                  border: (() => {
                    const le = b.node.data.backgroundColor;
                    return (T === null ? !le : le === `${T}15`) ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`;
                  })(),
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: lt === 0 && /* @__PURE__ */ h(
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
              T ?? "none"
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Border" }),
            go.map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => P({ borderColor: T }),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T,
                  border: b.node.data.borderColor === T ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              T
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Style" }),
            lr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: T.label,
                onClick: () => P({ borderStyle: T.key }),
                style: {
                  ...ae,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "dashed") === T.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: T.dash
                  }
                ) })
              },
              T.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Width" }),
            cr.map((T) => /* @__PURE__ */ h(
              "button",
              {
                title: `${T}px`,
                onClick: () => P({ borderWidth: T }),
                style: {
                  ...ae,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === T ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(T, 1),
                      background: "white",
                      borderRadius: T / 2
                    }
                  }
                )
              },
              T
            ))
          ] })
        ] }),
        K && /* @__PURE__ */ S(Ct, { children: [
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => V({ color: T }),
                style: {
                  ...ae,
                  width: 20,
                  height: 20,
                  background: T,
                  border: b.node.data.color === T ? "2px solid #1e1e2e" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              T
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: ee, children: [
            /* @__PURE__ */ h("span", { style: oe, children: "Size" }),
            [12, 14, 16, 20, 24].map((T) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => V({ fontSize: T }),
                style: {
                  ...ae,
                  width: 32,
                  height: 24,
                  background: (b.node.data.fontSize ?? 16) === T ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                  fontSize: 10,
                  color: "white"
                },
                children: T
              },
              T
            ))
          ] })
        ] }),
        et && (() => {
          const { node: T, PanelComponent: lt } = b;
          return /* @__PURE__ */ h(lt, { node: T, data: T.data, engine: t, updateData: X });
        })(),
        !xt && !et && /* @__PURE__ */ S("div", { style: ee, children: [
          /* @__PURE__ */ h("span", { style: oe, children: "Opacity" }),
          /* @__PURE__ */ h(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(At * 100),
              onChange: (T) => ge(parseInt(T.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ h("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(At * 100) })
        ] })
      ]
    }
  );
}
function My({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function Cy({ style: t }) {
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
function Yy({
  preview: t,
  engine: e,
  zoom: o
}) {
  var pt;
  const r = e.getNode(t.fromNodeId);
  if (!r) return null;
  const n = e.getRegistry(), s = e.getAllNodes(), i = e.measuredHeights, l = t.cursorX, d = t.cursorY, c = t.edgeColor || "#3b82f6", a = t.edgeStrokeWidth || 2, f = t.edgeStyle || "solid", y = f === "dashed" ? `${8 * a},${4 * a}` : f === "dotted" ? `${2 * a},${3 * a}` : void 0, p = Math.max(8, a * 3), u = 4 / o, m = {
    fromNode: r,
    sourceHandle: t.sourceHandle,
    sourceT: t.sourceT,
    sourcePort: t.sourcePort,
    sourceDirection: t.sourceDirection,
    edgeType: t.edgeType,
    attachmentGap: t.attachmentGap
  }, g = n == null ? void 0 : n.get(m.fromNode.type), x = m.sourcePort && (g != null && g.ports) ? Ae(
    m.fromNode,
    g.ports,
    m.sourcePort,
    o,
    i,
    g.portAnchor ?? "bbox"
  ) ?? void 0 : void 0, b = m.sourcePort && (g != null && g.ports) ? g.ports.find((wt) => wt.id === m.sourcePort) : void 0, w = m.sourceDirection === "output" ? "input" : m.sourceDirection === "input" ? "output" : null;
  let I = null, k, M = null;
  if (n && m.sourcePort && w && b) {
    const wt = qs / o;
    let xt = 1 / 0;
    for (const D of s) {
      if (D.type === "edge" || D.id === m.fromNode.id) continue;
      const W = n.get(D.type);
      if (!((pt = W == null ? void 0 : W.ports) != null && pt.length)) continue;
      const G = W.ports.filter((K) => K.direction === w);
      for (const K of G) {
        if (b.dataType !== "any" && K.dataType !== "any" && b.dataType !== K.dataType)
          continue;
        const J = Ae(D, W.ports, K.id, o, i, W.portAnchor ?? "bbox");
        if (!J) continue;
        const N = Math.hypot(J.x - l, J.y - d);
        N < wt && N < xt && (xt = N, I = D, M = K.id);
      }
    }
  }
  if (!M) {
    const wt = 50 / o;
    for (const xt of s) {
      if (xt.type === "edge" || xt.id === m.fromNode.id) continue;
      const D = xt.h === "auto" ? (i == null ? void 0 : i[xt.id]) ?? 100 : xt.h, W = xt.w * 0.2, G = D * 0.2;
      if (l >= xt.x - W && l <= xt.x + xt.w + W && d >= xt.y - G && d <= xt.y + D + G) {
        const K = We(xt, l, d, i);
        if (Math.hypot(K.x - l, K.y - d) < wt) {
          I = xt, k = K.t;
          break;
        }
      }
    }
  }
  const C = I ? n == null ? void 0 : n.get(I.type) : void 0, A = I && M && (C != null && C.ports) ? Ae(
    I,
    C.ports,
    M,
    o,
    i,
    C.portAnchor ?? "bbox"
  ) ?? void 0 : void 0, P = x ? void 0 : m.sourceT, V = A ? void 0 : k;
  let X;
  if (I)
    X = Ee(
      m.fromNode,
      I,
      m.edgeType || "bezier",
      i,
      m.sourceHandle,
      void 0,
      void 0,
      void 0,
      x,
      A,
      P,
      V,
      m.attachmentGap
    );
  else {
    const wt = {
      id: "__preview__",
      type: "shape",
      x: l,
      y: d,
      w: 0,
      h: 0,
      data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
    };
    X = Ee(
      m.fromNode,
      wt,
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
  const et = !x, it = !!(I && !A);
  return /* @__PURE__ */ S("g", { children: [
    /* @__PURE__ */ h(
      "path",
      {
        d: X.path,
        stroke: c,
        strokeWidth: a,
        strokeDasharray: y,
        strokeLinecap: "round",
        fill: "none"
      }
    ),
    /* @__PURE__ */ h(
      "path",
      {
        d: bo(X.x2, X.y2, X.arrowAngle, p),
        fill: "none",
        stroke: c,
        strokeWidth: a,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    et && /* @__PURE__ */ h(
      "circle",
      {
        cx: X.x1,
        cy: X.y1,
        r: u,
        fill: c,
        stroke: "white",
        strokeWidth: 1.5 / o
      }
    ),
    it && /* @__PURE__ */ h(
      "circle",
      {
        cx: X.x2,
        cy: X.y2,
        r: u,
        fill: c,
        stroke: "white",
        strokeWidth: 1.5 / o
      }
    )
  ] });
}
function jy({
  preview: t,
  zoom: e
}) {
  const o = Math.min(t.startX, t.endX), r = Math.min(t.startY, t.endY), n = Math.abs(t.endX - t.startX), s = Math.abs(t.endY - t.startY);
  return n < 2 && s < 2 ? null : t.kind === "frame" ? /* @__PURE__ */ h(
    "rect",
    {
      x: o,
      y: r,
      width: n,
      height: s,
      fill: "none",
      stroke: "#1e1e2e",
      strokeWidth: 1
    }
  ) : /* @__PURE__ */ h(
    "rect",
    {
      x: o,
      y: r,
      width: n,
      height: s,
      fill: "rgba(59,130,246,0.06)",
      stroke: "#3b82f6",
      strokeWidth: 1.5 / e,
      strokeDasharray: `${4 / e}`,
      rx: 8 / e
    }
  );
}
const bs = 400;
function Iy(t, e) {
  return t.h !== "auto" ? t.h : e[t.id] ?? 100;
}
function Zy({
  eraser: t,
  engine: e,
  zoom: o
}) {
  var a;
  const [, r] = rt(0);
  Mt(() => {
    const f = t.trail && t.trail.length > 0, y = t.markedIds && t.markedIds.length > 0;
    if (!f && !y) return;
    let p = 0;
    const u = () => {
      r(performance.now()), p = requestAnimationFrame(u);
    };
    return p = requestAnimationFrame(u), () => cancelAnimationFrame(p);
  }, [t.trail, t.markedIds]);
  const n = Date.now(), s = ((a = t.trail) == null ? void 0 : a.filter((f) => n - f[2] < bs)) ?? [], i = e.measuredHeights, l = 6 / o;
  let d = null;
  if (s.length > 1) {
    const f = [`M${s[0][0]},${s[0][1]}`];
    if (s.length === 2)
      f.push(`L${s[1][0]},${s[1][1]}`);
    else {
      for (let w = 0; w < s.length - 1; w++) {
        const I = (s[w][0] + s[w + 1][0]) / 2, k = (s[w][1] + s[w + 1][1]) / 2;
        f.push(`Q${s[w][0]},${s[w][1]},${I},${k}`);
      }
      const b = s[s.length - 1];
      f.push(`L${b[0]},${b[1]}`);
    }
    const y = f.join(" "), p = (n - s[s.length - 1][2]) / bs, u = (n - s[0][2]) / bs, m = Math.max(0, 0.85 * (1 - p)), g = Math.max(0, 0.85 * (1 - u)), x = (m + g) / 2;
    x > 0 && (d = /* @__PURE__ */ S(Ct, { children: [
      /* @__PURE__ */ h(
        "path",
        {
          d: y,
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
          d: y,
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
  for (const f of t.markedIds ?? []) {
    const y = e.getNode(f);
    if (!y || y.type === "edge") continue;
    const p = Iy(y, i);
    if (y.w < 1 || p < 1) continue;
    const u = y.rotation ?? 0, m = y.x + y.w / 2, g = y.y + p / 2;
    c.push(
      /* @__PURE__ */ h("g", { transform: u ? `rotate(${u}, ${m}, ${g})` : void 0, children: /* @__PURE__ */ h(
        "rect",
        {
          x: y.x,
          y: y.y,
          width: y.w,
          height: p,
          fill: "rgba(0,0,0,0.2)",
          stroke: "rgba(100,100,100,0.35)",
          strokeWidth: 1 / o,
          rx: 4 / o
        }
      ) }, f)
    );
  }
  return !d && c.length === 0 ? null : /* @__PURE__ */ S("g", { children: [
    d,
    c
  ] });
}
export {
  Is as A,
  Cd as B,
  Wo as C,
  ko as D,
  zf as E,
  Uo as F,
  Af as G,
  xd as H,
  op as I,
  mu as J,
  Pu as K,
  so as L,
  Cu as M,
  lh as N,
  te as O,
  fr as P,
  re as Q,
  Yy as R,
  Oy as S,
  Xy as T,
  J0 as U,
  Ds as a,
  Rs as b,
  Vu as c,
  Gy as d,
  Zy as e,
  jy as f,
  Y0 as g,
  Vy as h,
  ic as i,
  Ep as j,
  zs as k,
  Ou as l,
  mh as m,
  Pt as n,
  pu as o,
  bu as p,
  Tu as q,
  Or as r,
  En as s,
  An as t,
  zn as u,
  Vo as v,
  Fr as w,
  $s as x,
  ku as y,
  Ks as z
};
