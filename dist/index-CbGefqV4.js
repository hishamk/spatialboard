var Rc = Object.defineProperty;
var Wc = (t, e, o) => e in t ? Rc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var wt = (t, e, o) => Wc(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as Fc, defaultBlockSpecs as Bc, BlockNoteEditor as Nc } from "@blocknote/core";
import { jsxs as S, jsx as h, Fragment as Mt } from "react/jsx-runtime";
import * as J from "react";
import Oc, { memo as De, useRef as pt, useState as ot, useEffect as St, useCallback as ct, Component as Vc, useMemo as Kt, useLayoutEffect as Eo, useContext as Ke, createContext as br, Suspense as Xc, lazy as Gc } from "react";
import { useCreateBlockNote as Yc } from "@blocknote/react";
import { BlockNoteView as jc } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as Xe, flushSync as Zc } from "react-dom";
const Kc = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Ht = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += Kc[o[t] & 63];
  return e;
};
const qc = {
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
}, Uc = {
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
}, Qc = {
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
}, Jc = {
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
}, $c = {
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
}, _c = {
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
}, td = {
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
}, ed = {
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
}, od = {
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
}, rd = {
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
}, nd = {
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
}, sd = {
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
  qc,
  Uc,
  Qc,
  Jc,
  $c,
  _c,
  td,
  ed,
  od,
  rd,
  nd,
  sd
];
class id {
  constructor() {
    wt(this, "undoStack", []);
    wt(this, "redoStack", []);
    wt(this, "maxSize", 50);
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
const Na = 4, ad = 8, Oa = 6, Va = 6, ld = 10, cd = 14, dd = 24;
function So(t, e, o, r) {
  if (!t.rotation) return [e, o];
  const n = t.x + t.w / 2, s = t.y + r / 2, i = -t.rotation * Math.PI / 180, l = Math.cos(i), d = Math.sin(i), c = e - n, a = o - s;
  return [n + c * l - a * d, s + c * d + a * l];
}
function Fr(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function hd(t, e, o, r) {
  const n = Fr(t, r), [s, i] = So(t, e, o, n), l = t.x, d = t.y, c = t.w, a = n, f = s < l ? l - s : s > l + c ? s - (l + c) : 0, p = i < d ? d - i : i > d + a ? i - (d + a) : 0;
  return f === 0 && p === 0 ? Math.min(s - l, l + c - s, i - d, d + a - i) : Math.hypot(f, p);
}
function ud(t) {
  return Math.max(0.01, t);
}
function Or(t, e) {
  return t / ud(e);
}
function fd(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, a) => a.z - c.z);
  let l = null, d = null;
  for (const c of i)
    if (c.type === "draw") {
      if (Zs(c, e, o, r))
        return c;
    } else if (c.type === "shape") {
      if (Tn(c, e, o, r)) return c;
      if (!d && c.data.label) {
        const a = c.h === "auto" ? 100 : c.h, [f, p] = So(c, e, o, a), y = Ya(c, a);
        y && f >= y.lx && f <= y.rx && p >= y.ly && p <= y.ry && (d = c);
      }
    } else if (s && s.has(c.type)) {
      const a = Fr(c, n);
      Xa(c, e, o, r, a) && (l || (l = c));
    } else {
      const a = Fr(c, n), f = Or(Math.max(Na, Va), r), [p, y] = So(c, e, o, a);
      p >= c.x - f && p <= c.x + c.w + f && y >= c.y - f && y <= c.y + a + f && (d || (d = c));
    }
  return d ?? l;
}
function Xa(t, e, o, r, n) {
  const s = n ?? (t.h === "auto" ? 100 : t.h), [i, l] = So(t, e, o, s), d = r < 0.8 ? cd : ld, c = Or(Math.max(ad, d), r);
  if (t.data.label && i >= t.x && i <= t.x + t.w && l >= t.y - dd && l <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || l < t.y - c || l > t.y + s + c)
    return !1;
  const f = Math.abs(i - t.x), p = Math.abs(i - (t.x + t.w)), y = Math.abs(l - t.y), u = Math.abs(l - (t.y + s)), m = i >= t.x - c && i <= t.x + t.w + c;
  return l >= t.y - c && l <= t.y + s + c && (f <= c || p <= c) || m && (y <= c || u <= c);
}
function Ga(t, e, o, r, n, s) {
  const i = n - o, l = s - r, d = i * i + l * l;
  if (d === 0) return (t - o) ** 2 + (e - r) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * l) / d)), a = o + c * i, f = r + c * l;
  return (t - a) ** 2 + (e - f) ** 2;
}
function Ya(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const r = o.labelFontSize ?? 14, n = r * 1.3, s = r * 0.55, l = t.w - 12 * 2, d = o.label.split(`
`);
  let c = 0;
  for (const u of d) {
    const m = u.length * s;
    c += Math.max(1, Math.ceil(m / Math.max(l, 1)));
  }
  const a = c * n, f = Math.min(l, Math.max(...d.map((u) => u.length)) * s), p = t.x + t.w / 2, y = t.y + e / 2;
  return {
    lx: p - f / 2 - 4,
    ly: y - a / 2 - 4,
    rx: p + f / 2 + 4,
    ry: y + a / 2 + 4
  };
}
function Tn(t, e, o, r, n) {
  const s = t.h === "auto" ? 100 : t.h, [i, l] = So(t, e, o, s), d = t.data, c = d.strokeWidth ?? 2, a = Or(Math.max(c / 2, Oa), r), f = !!d.fill || !!n;
  switch (d.shape) {
    case "rect": {
      if (f)
        return i >= t.x - a && i <= t.x + t.w + a && l >= t.y - a && l <= t.y + s + a;
      const p = Math.abs(i - t.x), y = Math.abs(i - (t.x + t.w)), u = Math.abs(l - t.y), m = Math.abs(l - (t.y + s)), g = i >= t.x - a && i <= t.x + t.w + a;
      return l >= t.y - a && l <= t.y + s + a && (p <= a || y <= a) || g && (u <= a || m <= a);
    }
    case "ellipse": {
      const p = t.x + t.w / 2, y = t.y + s / 2, u = t.w / 2, m = s / 2;
      if (u === 0 || m === 0) return !1;
      const g = (i - p) / u, x = (l - y) / m, b = g * g + x * x;
      if (f) {
        const T = ((u + a) / u) ** 2;
        return b <= T;
      }
      const w = a / Math.min(u, m);
      return Math.abs(Math.sqrt(b) - 1) <= w;
    }
    case "diamond": {
      const p = t.x + t.w / 2, y = t.y + s / 2, u = t.w / 2, m = s / 2;
      if (u === 0 || m === 0) return !1;
      const g = Math.abs(i - p) / u, x = Math.abs(l - y) / m, b = g + x;
      if (f) {
        const T = a / Math.min(u, m);
        return b <= 1 + T;
      }
      const w = a / Math.min(u, m);
      return Math.abs(b - 1) <= w;
    }
    case "line":
    case "arrow": {
      const p = d.startPoint ?? [0, 0], y = d.endPoint ?? [t.w, s], u = t.x + p[0], m = t.y + p[1], g = t.x + y[0], x = t.y + y[1];
      return Ga(i, l, u, m, g, x) <= a * a;
    }
    default:
      return i >= t.x - a && i <= t.x + t.w + a && l >= t.y - a && l <= t.y + s + a;
  }
}
function pd(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const i = o[n][0], l = o[n][1], d = o[s][0], c = o[s][1];
    l > e != c > e && t < (d - i) * (e - l) / (c - l) + i && (r = !r);
  }
  return r;
}
function Zs(t, e, o, r) {
  const n = t.data.strokeWidth, s = Or(Math.max(n / 2, Oa), r), i = s * s, l = t.h === "auto" ? 100 : t.h, [d, c] = So(t, e, o, l);
  if (d < t.x - s || d > t.x + t.w + s || c < t.y - s || c > t.y + l + s)
    return !1;
  const a = t.data.points;
  if (!a || a.length === 0) return !1;
  const f = d - t.x, p = c - t.y;
  if (a.length === 1) {
    const y = f - a[0][0], u = p - a[0][1];
    return y * y + u * u <= i;
  }
  if (t.data.fill && a.length >= 3 && pd(f, p, a))
    return !0;
  for (let y = 0; y < a.length - 1; y++)
    if (Ga(f, p, a[y][0], a[y][1], a[y + 1][0], a[y + 1][1]) <= i)
      return !0;
  return !1;
}
function yd(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, a) => a.z - c.z), l = [], d = [];
  for (const c of i)
    if (c.type === "draw")
      Zs(c, e, o, r) && l.push(c);
    else if (c.type === "shape") {
      if (Tn(c, e, o, r))
        l.push(c);
      else if (c.data.label) {
        const a = c.h === "auto" ? 100 : c.h, [f, p] = So(c, e, o, a), y = Ya(c, a);
        y && f >= y.lx && f <= y.rx && p >= y.ly && p <= y.ry && d.push(c);
      }
    } else if (s && s.has(c.type)) {
      const a = Fr(c, n);
      Xa(c, e, o, r, a) && d.push(c);
    } else {
      const a = Fr(c, n), f = Or(Math.max(Na, Va), r), [p, y] = So(c, e, o, a);
      p >= c.x - f && p <= c.x + c.w + f && y >= c.y - f && y <= c.y + a + f && d.push(c);
    }
  return [...l, ...d];
}
function en(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, r = t.y + e / 2, n = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, l = Math.abs(Math.cos(i)), d = Math.abs(Math.sin(i)), c = n * l + s * d, a = n * d + s * l;
  return {
    x: o - c,
    y: r - a,
    w: c * 2,
    h: a * 2
  };
}
const Qe = class Qe {
  constructor(e, o = 0, r) {
    // Increased depth for potentially large boards
    wt(this, "level");
    wt(this, "bounds");
    wt(this, "objects");
    wt(this, "nodes");
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    wt(this, "heightMap");
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
    this.nodes[0] = new Qe({ x: r + e, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new Qe({ x: r, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new Qe({ x: r, y: n + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new Qe({ x: r + e, y: n + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const n = en(e, r);
    if (this.nodes.length) {
      const s = this.getIndex(n);
      if (s !== -1) {
        this.nodes[s].insert(e, r);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > Qe.MAX_OBJECTS && this.level < Qe.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], l = this.resolveH(i), d = en(i, l), c = this.getIndex(d);
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
      const r = this.resolveH(e), n = this.getIndex(en(e, r));
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
      const s = this.resolveH(n), i = en(n, s);
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
wt(Qe, "MAX_OBJECTS", 10), // Max depth of the tree
wt(Qe, "MAX_LEVELS", 8);
let vs = Qe;
function no(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function fr(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function md(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function gd(t, e, o, r) {
  const n = e > 0 ? 0.95 : 1.05, s = no(t.zoom * n, 0.1, 5), i = fr(t, o, r);
  return {
    x: o - i.x * s,
    y: r - i.y * s,
    zoom: s
  };
}
function bd(t, e, o, r) {
  const n = no(t.zoom * e, 0.1, 5), s = fr(t, o, r);
  return {
    x: o - s.x * n,
    y: r - s.y * n,
    zoom: n
  };
}
const Ks = Fc.create({
  blockSpecs: {
    ...Bc
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let Qn = null;
function qs() {
  return Qn || (Qn = Nc.create({ schema: Ks })), Qn;
}
async function xd(t) {
  return await qs().blocksToMarkdownLossy(t);
}
async function Us(t) {
  return await qs().tryParseMarkdownToBlocks(t);
}
function ja(t) {
  return qs().tryParseHTMLToBlocks(t);
}
function wd(t, e, o) {
  const [r, n] = t, [s, i] = e, [l, d] = o, c = l - s, a = d - i, f = c * c + a * a;
  if (f === 0)
    return (r - s) ** 2 + (n - i) ** 2;
  let p = ((r - s) * c + (n - i) * a) / f;
  p = Math.max(0, Math.min(1, p));
  const y = s + p * c, u = i + p * a;
  return (r - y) ** 2 + (n - u) ** 2;
}
function ks(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, r = 0;
  const n = t[0], s = t[t.length - 1];
  for (let d = 1; d < t.length - 1; d++) {
    const c = wd(t[d], n, s);
    c > o && (o = c, r = d);
  }
  if (o <= e)
    return [n, s];
  const i = ks(t.slice(0, r + 1), e), l = ks(t.slice(r), e);
  return [...i.slice(0, -1), ...l];
}
async function vd(t, e) {
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
    const g = u.data.blocks.length > 0 ? await xd(u.data.blocks) : "";
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
    const x = ks([...u.data.points], 1).map(
      ([b, w, T]) => `${(b + u.x).toFixed(1)},${(w + u.y).toFixed(1)},${T.toFixed(2)}`
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
  const p = /* @__PURE__ */ new Set(["frame", "content", "draw", "shape", "image", "text", "youtube", "edge", "sticky"]), y = t.filter((u) => !p.has(u.type));
  for (const u of y)
    o.push(`<!--@custom ${JSON.stringify(u)} -->`), o.push("");
  return o.join(`
`);
}
const Za = "data:font/woff2;base64,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", Mo = "Excalifont", yn = [
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
], Ka = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), kd = /* @__PURE__ */ new Set(["Excalifont"]), Sd = /* @__PURE__ */ new Set([...Ka, ...kd]);
function Md(t) {
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
function Co(t) {
  return Ka.has(t) ? t : `'${t}', sans-serif`;
}
let Pi = !1;
function Cd(t = document) {
  if (Pi) return;
  Pi = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${Za}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = yn.filter((n) => !Sd.has(n.key)).map((n) => "family=" + n.key.replace(/ /g, "+")).join("&"), r = t.createElement("link");
  r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(r);
}
function uo(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let r;
  for (; (r = o.exec(t)) !== null; )
    e[r[1]] = r[2];
  return e;
}
function zr(t) {
  if (t == null || t === "") return;
  const e = parseFloat(t);
  return Number.isFinite(e) ? e : void 0;
}
const Id = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function Td(t) {
  var s, i, l, d;
  const e = [], o = {}, r = t.split(`
`);
  let n = 0;
  for (; n < r.length; ) {
    const c = r[n].trim();
    if (c.startsWith("<!--@meta")) {
      const a = uo(c);
      if (a.background) {
        const f = Id[a.background] ?? a.background;
        o.background = f;
      }
      if (a.originView) {
        const f = a.originView.split(",").map(Number);
        f.length === 3 && f.every((p) => !isNaN(p)) && (o.originView = { x: f[0], y: f[1], zoom: f[2] });
      }
      n++;
      continue;
    }
    if (c.startsWith("<!--@frame")) {
      const a = uo(c);
      for (n++; n < r.length && r[n].trim() === ""; ) n++;
      e.push({
        id: a.id || Ht(10),
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
      const a = uo(c);
      n++;
      const f = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        f.push(r[n]), n++;
      for (; f.length > 0 && f[f.length - 1].trim() === ""; )
        f.pop();
      const p = f.join(`
`), y = p.trim().length > 0 ? await Us(p) : [];
      e.push({
        id: a.id || Ht(10),
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
          markdown: p,
          borderColor: a.borderColor || void 0,
          borderWidth: a.borderWidth ? parseFloat(a.borderWidth) : void 0,
          borderStyle: a.borderStyle || void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@draw")) {
      const a = uo(c);
      if (n++, a.tool === "shape")
        for (e.push({
          id: a.id || Ht(10),
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
        const p = f ? f.split(" ").filter(Boolean).map((b) => {
          const w = b.split(",").map(Number);
          return [
            w[0] || 0,
            w[1] || 0,
            w[2] || 0.5
          ];
        }) : [];
        let y = 1 / 0, u = 1 / 0, m = -1 / 0, g = -1 / 0;
        for (const [b, w] of p)
          b < y && (y = b), w < u && (u = w), b > m && (m = b), w > g && (g = w);
        isFinite(y) || (y = parseFloat(a.x || "0"), u = parseFloat(a.y || "0"), m = y, g = u);
        const x = p.map(
          ([b, w, T]) => [b - y, w - u, T]
        );
        for (e.push({
          id: a.id || Ht(10),
          type: "draw",
          x: y,
          y: u,
          w: m - y,
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
      const a = uo(c);
      n++, e.push({
        id: a.id || Ht(10),
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
      const a = uo(c);
      for (n++, e.push({
        id: a.id || Ht(10),
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
          sourceT: zr(a.sourceT),
          targetT: zr(a.targetT),
          attachmentGap: zr(a.attachmentGap),
          roughness: zr(a.roughness),
          midpointOffset: zr(a.midpointOffset),
          curveOffset: a.curveOffset ? a.curveOffset.split(",").map(Number) : void 0
        }
      }); n < r.length && r[n].trim() === ""; ) n++;
      continue;
    }
    if (c.startsWith("<!--@text")) {
      const a = uo(c);
      n++;
      const f = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        f.push(r[n]), n++;
      for (; f.length > 0 && f[f.length - 1].trim() === ""; )
        f.pop();
      e.push({
        id: a.id || Ht(10),
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
          fontFamily: a.fontFamily || Mo,
          color: a.color || "#1e1e2e",
          align: a.align || "left",
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (c.startsWith("<!--@sticky")) {
      const a = uo(c);
      n++;
      const f = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        f.push(r[n]), n++;
      for (; f.length > 0 && f[f.length - 1].trim() === ""; )
        f.pop();
      e.push({
        id: a.id || Ht(10),
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
          const p = JSON.parse(c.slice(a, f + 1));
          p.id && p.type && e.push(p);
        } catch {
        }
      n++;
      continue;
    }
    n++;
  }
  return { nodes: e, meta: o };
}
const zd = 180;
function on(t, e) {
  t.push(e), t.length > zd && t.shift();
}
function fo(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((n, s) => n - s), r = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[r];
}
class Ad {
  constructor() {
    wt(this, "enabled", !1);
    wt(this, "listeners", /* @__PURE__ */ new Set());
    wt(this, "lastTick", 0);
    wt(this, "lastRatesTs", 0);
    wt(this, "frameMs", []);
    wt(this, "cullingMs", []);
    wt(this, "hitTestMs", []);
    wt(this, "edgeHitMs", []);
    wt(this, "pendingCullingMs", 0);
    wt(this, "pendingHitTestMs", 0);
    wt(this, "pendingEdgeHitMs", 0);
    wt(this, "pendingHitTestCalls", 0);
    wt(this, "pendingEdgeHitCalls", 0);
    wt(this, "hitTestCallsPerSec", 0);
    wt(this, "edgeHitCallsPerSec", 0);
    wt(this, "visibleNodes", 0);
    wt(this, "totalNodes", 0);
    wt(this, "visibleEdges", 0);
    wt(this, "totalEdges", 0);
    wt(this, "virtualizationActive", !1);
    wt(this, "seedVisibleNodes", 0);
    wt(this, "nodesAddedByAdjacency", 0);
    wt(this, "nodesAddedByEdgeEndpoints", 0);
    wt(this, "edgesAddedByAdjacency", 0);
    wt(this, "edgesAddedByCrossing", 0);
    wt(this, "lastPublishedAt", 0);
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
      on(this.frameMs, r);
    }
    this.lastTick = e, on(this.cullingMs, this.pendingCullingMs), on(this.hitTestMs, this.pendingHitTestMs), on(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
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
      frameMsP50: fo(this.frameMs, 0.5),
      frameMsP95: fo(this.frameMs, 0.95),
      cullingMsP50: fo(this.cullingMs, 0.5),
      cullingMsP95: fo(this.cullingMs, 0.95),
      hitTestMsP50: fo(this.hitTestMs, 0.5),
      hitTestMsP95: fo(this.hitTestMs, 0.95),
      edgeHitMsP50: fo(this.edgeHitMs, 0.5),
      edgeHitMsP95: fo(this.edgeHitMs, 0.95),
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
const Me = new Ad();
function Je(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const qa = 7, Qs = 52, Ed = 8;
function Pd(t, e, o, r) {
  const n = Je(t, r);
  if (!t.rotation) return { x: e, y: o };
  const s = t.x + t.w / 2, i = t.y + n / 2, l = t.rotation * Math.PI / 180, d = Math.cos(l), c = Math.sin(l), a = e - s, f = o - i;
  return { x: s + a * d - f * c, y: i + a * c + f * d };
}
function Ua(t, e, o, r, n, s = "bbox") {
  const i = e.find((y) => y.id === o);
  if (!i) return null;
  const l = Je(t, n), d = qa / r, c = e.filter((y) => y.direction === i.direction), a = c.indexOf(i);
  if (a < 0) return null;
  const f = t.y + l / (c.length + 1) * (a + 1);
  let p;
  if (s === "inscribed-circle") {
    const y = Math.min(t.w, l) / 2, u = t.x + t.w / 2;
    p = i.direction === "input" ? u - y - d : u + y + d;
  } else
    p = i.direction === "input" ? t.x - d : t.x + t.w + d;
  return { px: p, py: f, direction: i.direction };
}
function Hd(t, e, o, r, n = "bbox") {
  const s = Je(t, r);
  if (n === "bbox")
    return e === "input" ? { x: t.x, y: o.y } : { x: t.x + t.w, y: o.y };
  const i = Math.min(t.w, s) / 2, l = t.x + t.w / 2, d = t.y + s / 2;
  let c = o.x - l, a = o.y - d, f = Math.hypot(c, a);
  return f < 1e-6 && (c = e === "input" ? -1 : 1, a = 0, f = 1), { x: l + c / f * i, y: d + a / f * i };
}
function Ee(t, e, o, r, n, s = "bbox") {
  const i = Ua(
    t,
    e,
    o,
    r,
    n,
    s
  );
  return i ? Pd(t, i.px, i.py, n) : null;
}
function Hi(t, e, o, r, n, s, i, l) {
  const d = i - n, c = l - s;
  if (d === 0 && c === 0) return { x: n, y: s, side: "right" };
  let a = 1 / 0, f = n, p = s, y = "right";
  if (d !== 0) {
    const u = (t + o - n) / d;
    if (u > 0 && u < a) {
      const m = s + u * c;
      m >= e && m <= e + r && (a = u, f = t + o, p = m, y = "right");
    }
  }
  if (d !== 0) {
    const u = (t - n) / d;
    if (u > 0 && u < a) {
      const m = s + u * c;
      m >= e && m <= e + r && (a = u, f = t, p = m, y = "left");
    }
  }
  if (c !== 0) {
    const u = (e + r - s) / c;
    if (u > 0 && u < a) {
      const m = n + u * d;
      m >= t && m <= t + o && (a = u, f = m, p = e + r, y = "bottom");
    }
  }
  if (c !== 0) {
    const u = (e - s) / c;
    if (u > 0 && u < a) {
      const m = n + u * d;
      m >= t && m <= t + o && (a = u, f = m, p = e, y = "top");
    }
  }
  return { x: f, y: p, side: y };
}
function Be(t, e, o, r, n) {
  const s = Math.cos(n), i = Math.sin(n), l = t - o, d = e - r;
  return [o + l * s - d * i, r + l * i + d * s];
}
function Ss(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return Hi(t.x, t.y, t.w, e, n, s, o, r);
  const i = -t.rotation * Math.PI / 180, [l, d] = Be(o, r, n, s, i), c = Hi(t.x, t.y, t.w, e, n, s, l, d), [a, f] = Be(c.x, c.y, n, s, -i);
  return { x: a, y: f, side: c.side };
}
function Go(t, e, o, r) {
  return Math.abs(t) / o >= Math.abs(e) / r ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function Ld(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, d = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, a] = t.rotation ? Be(o, r, n, s, d) : [o, r], f = c - n, p = a - s;
  if (f === 0 && p === 0)
    return { x: n + i, y: s, side: "right" };
  const y = 1 / Math.sqrt((f / i) ** 2 + (p / l) ** 2);
  let u = n + f * y, m = s + p * y;
  const g = Go(f, p, i, l);
  return t.rotation && ([u, m] = Be(u, m, n, s, -d)), { x: u, y: m, side: g };
}
function Dd(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, d = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, a] = t.rotation ? Be(o, r, n, s, d) : [o, r], f = c - n, p = a - s;
  if (f === 0 && p === 0)
    return { x: n + i, y: s, side: "right" };
  const y = 1 / (Math.abs(f) / i + Math.abs(p) / l);
  let u = n + f * y, m = s + p * y;
  const g = Go(f, p, i, l);
  return t.rotation && ([u, m] = Be(u, m, n, s, -d)), { x: u, y: m, side: g };
}
function Rd(t, e, o, r) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return Ss(t, e, o, r);
  const s = t.x + t.w / 2, i = t.y + e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [d, c] = t.rotation ? Be(o, r, s, i, l) : [o, r], a = d - s, f = c - i, p = Math.hypot(a, f);
  if (p === 0)
    return Ss(t, e, o, r);
  const y = a / p, u = f / p;
  let m = t.x + n[0][0], g = t.y + n[0][1], x = (m - s) * y + (g - i) * u;
  for (let M = 1; M < n.length; M++) {
    const C = t.x + n[M][0], E = t.y + n[M][1], L = (C - s) * y + (E - i) * u;
    L > x && (x = L, m = C, g = E);
  }
  const b = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let w = m + y * b, T = g + u * b;
  const k = Go(a, f, t.w / 2, e / 2);
  return t.rotation && ([w, T] = Be(w, T, s, i, -l)), { x: w, y: T, side: k };
}
function Li(t, e, o) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return bn(t, e, o);
  const n = t.x + t.w / 2, s = t.y + e / 2, i = Yo(o), l = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, d = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (g, x, b, w, T, k) => {
    const M = T - b, C = k - w, E = M * M + C * C;
    if (E === 0) return [b, w];
    const L = Math.max(0, Math.min(1, ((g - b) * M + (x - w) * C) / E));
    return [b + L * M, w + L * C];
  };
  let a = t.x + r[0][0], f = t.y + r[0][1], p = (a - l) ** 2 + (f - d) ** 2;
  if (r.length === 1)
    a = t.x + r[0][0], f = t.y + r[0][1];
  else
    for (let g = 0; g < r.length - 1; g++) {
      const x = t.x + r[g][0], b = t.y + r[g][1], w = t.x + r[g + 1][0], T = t.y + r[g + 1][1], [k, M] = c(l, d, x, b, w, T), C = (k - l) ** 2 + (M - d) ** 2;
      C < p && (p = C, a = k, f = M);
    }
  const y = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let u = a + i.dx * y, m = f + i.dy * y;
  if (t.rotation) {
    const g = t.rotation * Math.PI / 180;
    [u, m] = Be(u, m, n, s, g);
  }
  return { x: u, y: m };
}
function Ms(t, e, o, r) {
  var n;
  if (t.type === "draw")
    return Rd(t, e, o, r);
  if (t.type === "shape") {
    const s = (n = t.data) == null ? void 0 : n.shape;
    if (s === "ellipse") return Ld(t, e, o, r);
    if (s === "diamond") return Dd(t, e, o, r);
  }
  return Ss(t, e, o, r);
}
function Cs(t, e, o, r) {
  const n = Ms(t, e, o, r);
  return { x: n.x, y: n.y };
}
function bn(t, e, o) {
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
  const l = t.rotation * Math.PI / 180, [d, c] = Be(s, i, r, n, l);
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
function Di(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Pe(t, e, o = "bezier", r, n, s, i, l, d, c, a, f, p) {
  const y = Je(t, r), u = Je(e, r), m = t.x + t.w / 2, g = t.y + y / 2, x = e.x + e.w / 2, b = e.y + u / 2;
  let w, T, k, M;
  if (d) {
    w = d.x, T = d.y;
    const X = w - m, tt = T - g, et = Math.hypot(X, tt);
    et > 1e-6 && (M = { dx: X / et, dy: tt / et }), k = Go(X, tt, t.w / 2, y / 2);
  } else if (a !== void 0) {
    const X = Ts(t, y, a);
    w = X.x, T = X.y, k = X.side;
    const tt = Math.hypot(w - m, T - g);
    tt > 0 && (M = { dx: (w - m) / tt, dy: (T - g) / tt });
  } else if (n) {
    const X = t.type === "draw" ? Li(t, y, n) : bn(t, y, n);
    w = X.x, T = X.y, k = n;
  } else {
    const X = Ms(t, y, x, b);
    if (w = X.x, T = X.y, k = X.side, Di(t)) {
      const tt = Math.hypot(x - m, b - g);
      tt > 0 && (M = { dx: (x - m) / tt, dy: (b - g) / tt });
    }
  }
  let C, E, L, F;
  if (c) {
    C = c.x, E = c.y;
    const X = C - x, tt = E - b, et = Math.hypot(X, tt);
    et > 1e-6 && (F = { dx: X / et, dy: tt / et }), L = Go(X, tt, e.w / 2, u / 2);
  } else if (f !== void 0) {
    const X = Ts(e, u, f);
    C = X.x, E = X.y, L = X.side;
    const tt = Math.hypot(C - x, E - b);
    tt > 0 && (F = { dx: (C - x) / tt, dy: (E - b) / tt });
  } else if (s) {
    const X = e.type === "draw" ? Li(e, u, s) : bn(e, u, s);
    C = X.x, E = X.y, L = s;
  } else {
    const X = Ms(e, u, m, g);
    if (C = X.x, E = X.y, L = X.side, Di(e)) {
      const tt = Math.hypot(m - x, g - b);
      tt > 0 && (F = { dx: (m - x) / tt, dy: (g - b) / tt });
    }
  }
  if (p && p > 0) {
    const X = Math.hypot(w - m, T - g);
    X > 0 && (w += (w - m) / X * p, T += (T - g) / X * p);
    const tt = Math.hypot(C - x, E - b);
    tt > 0 && (C += (C - x) / tt * p, E += (E - b) / tt * p);
  }
  switch (o) {
    case "straight":
      return Wd(w, T, C, E, k, L);
    case "bezier":
      return Fd(w, T, C, E, k, L, l, M, F);
    case "smoothstep":
      return Bd(w, T, C, E, k, L, i);
    case "step":
      return Nd(w, T, C, E, k, L, i);
  }
}
function Wd(t, e, o, r, n, s) {
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
function Fd(t, e, o, r, n, s, i, l, d) {
  const c = Math.hypot(o - t, r - e), a = Math.min(c * 0.5, Math.max(50, c * 0.25)), f = l ?? Yo(n), p = d ?? Yo(s), y = i ? i[0] * (4 / 3) : 0, u = i ? i[1] * (4 / 3) : 0, m = t + f.dx * a + y, g = e + f.dy * a + u, x = o + p.dx * a + y, b = r + p.dy * a + u, w = 0.125 * t + 0.375 * m + 0.375 * x + 0.125 * o, T = 0.125 * e + 0.375 * g + 0.375 * b + 0.125 * r, k = Math.atan2(r - b, o - x), M = Math.atan2(e - g, t - m), C = {
    x: w,
    y: T,
    axis: "xy",
    min: 0,
    max: 0
  }, E = Math.min(t, o, m, x), L = Math.min(e, r, g, b), F = Math.max(t, o, m, x), X = Math.max(e, r, g, b);
  return {
    path: `M${t},${e} C${m},${g} ${x},${b} ${o},${r}`,
    labelX: w,
    labelY: T,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: k,
    tailAngle: M,
    sourceSide: n,
    targetSide: s,
    kinkHandle: C,
    bounds: { x: E, y: L, w: F - E, h: X - L }
  };
}
function Bd(t, e, o, r, n, s, i) {
  const { points: c, kinkHandle: a } = Js(t, e, o, r, n, s, 20, i), f = Od(c, 8), p = Math.floor(c.length / 2), y = (c[p - 1][0] + c[p][0]) / 2, u = (c[p - 1][1] + c[p][1]) / 2, m = c[c.length - 1], g = c[c.length - 2], x = Math.atan2(m[1] - g[1], m[0] - g[0]), b = c[0], w = c[1], T = Math.atan2(b[1] - w[1], b[0] - w[0]);
  let k = 1 / 0, M = 1 / 0, C = -1 / 0, E = -1 / 0;
  for (const [L, F] of c)
    L < k && (k = L), F < M && (M = F), L > C && (C = L), F > E && (E = F);
  return {
    path: f,
    labelX: y,
    labelY: u,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: x,
    tailAngle: T,
    sourceSide: n,
    targetSide: s,
    kinkHandle: a,
    bounds: { x: k, y: M, w: C - k, h: E - M }
  };
}
function Nd(t, e, o, r, n, s, i) {
  const { points: d, kinkHandle: c } = Js(t, e, o, r, n, s, 20, i), a = [`M${d[0][0]},${d[0][1]}`];
  for (let E = 1; E < d.length; E++)
    a.push(`L${d[E][0]},${d[E][1]}`);
  const f = Math.floor(d.length / 2), p = (d[f - 1][0] + d[f][0]) / 2, y = (d[f - 1][1] + d[f][1]) / 2, u = d[d.length - 1], m = d[d.length - 2], g = Math.atan2(u[1] - m[1], u[0] - m[0]), x = d[0], b = d[1], w = Math.atan2(x[1] - b[1], x[0] - b[0]);
  let T = 1 / 0, k = 1 / 0, M = -1 / 0, C = -1 / 0;
  for (const [E, L] of d)
    E < T && (T = E), L < k && (k = L), E > M && (M = E), L > C && (C = L);
  return {
    path: a.join(" "),
    labelX: p,
    labelY: y,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: g,
    tailAngle: w,
    sourceSide: n,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: T, y: k, w: M - T, h: C - k }
  };
}
function Js(t, e, o, r, n, s, i, l) {
  const d = Yo(n), c = Yo(s), a = t + d.dx * i, f = e + d.dy * i, p = o + c.dx * i, y = r + c.dy * i, u = n === "left" || n === "right", m = s === "left" || s === "right", g = [[t, e], [a, f]], x = l ?? 0.5;
  let b;
  if (u && m) {
    const w = a + (p - a) * x;
    g.push([w, f], [w, y]);
    const T = Math.min(a, p), k = Math.max(a, p);
    b = { x: w, y: (f + y) / 2, axis: "x", min: T, max: k };
  } else if (!u && !m) {
    const w = f + (y - f) * x;
    g.push([a, w], [p, w]);
    const T = Math.min(f, y), k = Math.max(f, y);
    b = { x: (a + p) / 2, y: w, axis: "y", min: T, max: k };
  } else u && !m ? g.push([p, f]) : g.push([a, y]);
  return g.push([p, y], [o, r]), { points: g, kinkHandle: b };
}
function Od(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let n = 1; n < t.length - 1; n++) {
    const s = t[n - 1], i = t[n], l = t[n + 1], d = i[0] - s[0], c = i[1] - s[1], a = l[0] - i[0], f = l[1] - i[1], p = Math.hypot(d, c), y = Math.hypot(a, f);
    if (p === 0 || y === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const u = Math.min(e, p / 2, y / 2), m = i[0] - d / p * u, g = i[1] - c / p * u, x = i[0] + a / y * u, b = i[1] + f / y * u;
    o.push(`L${m},${g}`), o.push(`Q${i[0]},${i[1]} ${x},${b}`);
  }
  const r = t[t.length - 1];
  return o.push(`L${r[0]},${r[1]}`), o.join(" ");
}
function Vd(t, e, o, r, n, s, i, l, d) {
  const c = 1 - d, a = c * c, f = a * c, p = d * d, y = p * d;
  return [
    f * t + 3 * a * d * o + 3 * c * p * n + y * i,
    f * e + 3 * a * d * r + 3 * c * p * s + y * l
  ];
}
function Xd(t, e, o, r, n, s, i, l, d, c, a = 40) {
  let f = 1 / 0, p = o, y = r;
  for (let u = 1; u <= a; u++) {
    const m = u / a, [g, x] = Vd(o, r, n, s, i, l, d, c, m), b = $s(t, e, p, y, g, x);
    b < f && (f = b), p = g, y = x;
  }
  return f;
}
function Gd(t, e, o) {
  let r = 1 / 0;
  for (let n = 1; n < o.length; n++) {
    const s = $s(t, e, o[n - 1][0], o[n - 1][1], o[n][0], o[n][1]);
    s < r && (r = s);
  }
  return r;
}
function Qa(t, e, o, r, n, s, i, l) {
  const d = n.data.edgeType || "bezier", c = Pe(
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
  ), { x1: a, y1: f, x2: p, y2: y } = c;
  if (d === "straight")
    return $s(t, e, a, f, p, y);
  if (d === "bezier") {
    const g = Math.hypot(p - a, y - f), x = Math.min(g * 0.5, Math.max(50, g * 0.25)), b = Yo(c.sourceSide), w = Yo(c.targetSide), T = n.data.curveOffset ? n.data.curveOffset[0] * (4 / 3) : 0, k = n.data.curveOffset ? n.data.curveOffset[1] * (4 / 3) : 0, M = a + b.dx * x + T, C = f + b.dy * x + k, E = p + w.dx * x + T, L = y + w.dy * x + k;
    return Xd(t, e, a, f, M, C, E, L, p, y);
  }
  const u = 20, { points: m } = Js(a, f, p, y, c.sourceSide, c.targetSide, u, n.data.midpointOffset);
  return Gd(t, e, m);
}
function Ri(t, e, o) {
  const r = Je(t, o), n = Je(e, o), s = t.x + t.w / 2, i = t.y + r / 2, l = e.x + e.w / 2, d = e.y + n / 2, c = Cs(t, r, l, d), a = Cs(e, n, s, i);
  return { x1: c.x, y1: c.y, x2: a.x, y2: a.y };
}
function Yd(t, e, o, r) {
  const n = Je(t, r);
  return Cs(t, n, e, o);
}
function $s(t, e, o, r, n, s) {
  const i = n - o, l = s - r, d = i * i + l * l;
  if (d === 0) return Math.hypot(t - o, e - r);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * l) / d)), a = o + c * i, f = r + c * l;
  return Math.hypot(t - a, e - f);
}
function wo(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, l = n, d = r / 2, c = t + n * d, a = e + s * d, f = t - n * d, p = e - s * d, y = r * 0.4;
  return `M${f + i * y},${p + l * y} L${c},${a} L${f - i * y},${p - l * y}`;
}
function xn(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, l = n, d = r / 2, c = t + n * d, a = e + s * d, f = t - n * d, p = e - s * d, y = r * 0.4;
  return `M${c},${a} L${f + i * y},${p + l * y} L${f - i * y},${p - l * y} Z`;
}
function Is(t, e) {
  const o = Je(t, e);
  return ["top", "right", "bottom", "left"].map((n) => {
    const s = bn(t, o, n);
    return { side: n, x: s.x, y: s.y };
  });
}
function rn(t, e, o, r) {
  const n = Is(t, r);
  let s = n[0], i = 1 / 0;
  for (const l of n) {
    const d = Math.hypot(l.x - e, l.y - o);
    d < i && (i = d, s = l);
  }
  return s.side;
}
function Ja(t, e) {
  const o = Math.max(0.01, e), r = t.data.strokeWidth ?? 2;
  return Math.max(r / 2 + 8 / o, 10 / o);
}
function Wi(t, e, o, r, n, s) {
  const i = Me.isEnabled(), l = i ? performance.now() : 0;
  let d = null;
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const a = c, f = t.get(a.data.fromId), p = t.get(a.data.toId);
    if (!f || !p) continue;
    const y = s == null ? void 0 : s(a, f, p), u = Qa(e, o, f, p, a, n, y == null ? void 0 : y.sourcePortPos, y == null ? void 0 : y.targetPortPos), m = Ja(a, r);
    u < m && (!d || u < d.distance) && (d = { node: c, distance: u });
  }
  return i && Me.recordEdgeHit(performance.now() - l), d;
}
function jd(t, e, o, r, n, s) {
  const i = Me.isEnabled(), l = i ? performance.now() : 0, d = [];
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const a = c, f = t.get(a.data.fromId), p = t.get(a.data.toId);
    if (!f || !p) continue;
    const y = s == null ? void 0 : s(a, f, p);
    Qa(e, o, f, p, a, n, y == null ? void 0 : y.sourcePortPos, y == null ? void 0 : y.targetPortPos) < Ja(a, r) && d.push(c);
  }
  return i && Me.recordEdgeHit(performance.now() - l), d;
}
function Ts(t, e, o) {
  var c;
  o = (o % 1 + 1) % 1;
  const r = t.x + t.w / 2, n = t.y + e / 2;
  if (t.type === "draw") {
    const a = t.data.points;
    if (a && a.length >= 2) {
      const f = [0];
      for (let y = 1; y < a.length; y++)
        f.push(f[y - 1] + Math.hypot(a[y][0] - a[y - 1][0], a[y][1] - a[y - 1][1]));
      const p = f[f.length - 1];
      if (p > 0) {
        const y = o * p;
        let u = 0;
        for (let E = 1; E < f.length; E++) {
          if (f[E] >= y) {
            u = E - 1;
            break;
          }
          E === f.length - 1 && (u = E - 1);
        }
        const m = f[u + 1] - f[u], g = m > 0 ? (y - f[u]) / m : 0;
        let x = t.x + a[u][0] + (a[u + 1][0] - a[u][0]) * g, b = t.y + a[u][1] + (a[u + 1][1] - a[u][1]) * g;
        const w = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2), T = x - r, k = b - n, M = Math.hypot(T, k);
        M > 0 && (x += T / M * w, b += k / M * w);
        const C = Go(x - r, b - n, t.w / 2, e / 2);
        if (t.rotation) {
          const E = t.rotation * Math.PI / 180, [L, F] = Be(x, b, r, n, E);
          return { x: L, y: F, side: C };
        }
        return { x, y: b, side: C };
      }
    }
  }
  const s = t.type === "shape" ? (c = t.data) == null ? void 0 : c.shape : void 0;
  let i, l, d;
  if (s === "ellipse") {
    const a = o * 2 * Math.PI - Math.PI / 2, f = t.w / 2, p = e / 2;
    i = r + f * Math.cos(a), l = n + p * Math.sin(a), d = Go(i - r, l - n, f, p);
  } else if (s === "diamond") {
    const a = r, f = t.y, p = t.x + t.w, y = n, u = r, m = t.y + e, g = t.x, x = n;
    if (o < 0.25) {
      const b = o / 0.25;
      i = a + (p - a) * b, l = f + (y - f) * b, d = o < 0.125 ? "top" : "right";
    } else if (o < 0.5) {
      const b = (o - 0.25) / 0.25;
      i = p + (u - p) * b, l = y + (m - y) * b, d = o < 0.375 ? "right" : "bottom";
    } else if (o < 0.75) {
      const b = (o - 0.5) / 0.25;
      i = u + (g - u) * b, l = m + (x - m) * b, d = o < 0.625 ? "bottom" : "left";
    } else {
      const b = (o - 0.75) / 0.25;
      i = g + (a - g) * b, l = x + (f - x) * b, d = o < 0.875 ? "left" : "top";
    }
  } else {
    const a = t.w, f = 2 * (a + e);
    let p = o * f;
    const y = a / 2;
    p < y ? (i = r + p, l = t.y, d = "top") : p < y + e ? (p -= y, i = t.x + a, l = t.y + p, d = "right") : p < y + e + a ? (p -= y + e, i = t.x + a - p, l = t.y + e, d = "bottom") : p < y + e + a + e ? (p -= y + e + a, i = t.x, l = t.y + e - p, d = "left") : (p -= y + e + a + e, i = t.x + p, l = t.y, d = "top");
  }
  if (t.rotation) {
    const a = t.rotation * Math.PI / 180, [f, p] = Be(i, l, r, n, a);
    return { x: f, y: p, side: d };
  }
  return { x: i, y: l, side: d };
}
function Zd(t, e, o, r) {
  var x;
  const n = t.x + t.w / 2, s = t.y + e / 2;
  let i = o, l = r;
  if (t.rotation) {
    const b = -t.rotation * Math.PI / 180;
    [i, l] = Be(o, r, n, s, b);
  }
  if (t.type === "draw") {
    const b = t.data.points;
    if (b && b.length >= 2) {
      const w = [0];
      for (let k = 1; k < b.length; k++)
        w.push(w[k - 1] + Math.hypot(b[k][0] - b[k - 1][0], b[k][1] - b[k - 1][1]));
      const T = w[w.length - 1];
      if (T > 0) {
        const k = i - t.x, M = l - t.y;
        let C = 1 / 0, E = 0;
        for (let L = 0; L < b.length - 1; L++) {
          const F = b[L][0], X = b[L][1], tt = b[L + 1][0], et = b[L + 1][1], ft = tt - F, Ct = et - X, xt = ft * ft + Ct * Ct, W = xt === 0 ? 0 : Math.max(0, Math.min(1, ((k - F) * ft + (M - X) * Ct) / xt)), R = F + W * ft, K = X + W * Ct, q = Math.hypot(k - R, M - K);
          q < C && (C = q, E = w[L] + W * (w[L + 1] - w[L]));
        }
        return E / T;
      }
    }
  }
  const d = t.type === "shape" ? (x = t.data) == null ? void 0 : x.shape : void 0;
  if (d === "ellipse")
    return ((Math.atan2(l - s, i - n) + Math.PI / 2) / (2 * Math.PI) % 1 + 1) % 1;
  if (d === "diamond") {
    const b = n, w = t.y, T = t.x + t.w, k = s, M = n, C = t.y + e, E = t.x, L = s, F = [
      { ax: b, ay: w, bx: T, by: k, tStart: 0 },
      { ax: T, ay: k, bx: M, by: C, tStart: 0.25 },
      { ax: M, ay: C, bx: E, by: L, tStart: 0.5 },
      { ax: E, ay: L, bx: b, by: w, tStart: 0.75 }
    ];
    let X = 0, tt = 1 / 0;
    for (const et of F) {
      const ft = et.bx - et.ax, Ct = et.by - et.ay, xt = ft * ft + Ct * Ct, W = xt === 0 ? 0 : Math.max(0, Math.min(1, ((i - et.ax) * ft + (l - et.ay) * Ct) / xt)), R = et.ax + W * ft, K = et.ay + W * Ct, q = Math.hypot(i - R, l - K);
      q < tt && (tt = q, X = et.tStart + W * 0.25);
    }
    return (X % 1 + 1) % 1;
  }
  const c = t.w, a = t.x, f = t.y, p = 2 * (c + e), y = c / 2, u = [
    // Top edge right half: top-center → top-right
    { ax: n, ay: f, bx: a + c, by: f, dStart: 0, len: y },
    // Right edge: top-right → bottom-right
    { ax: a + c, ay: f, bx: a + c, by: f + e, dStart: y, len: e },
    // Bottom edge: bottom-right → bottom-left
    { ax: a + c, ay: f + e, bx: a, by: f + e, dStart: y + e, len: c },
    // Left edge: bottom-left → top-left
    { ax: a, ay: f + e, bx: a, by: f, dStart: y + e + c, len: e },
    // Top edge left half: top-left → top-center
    { ax: a, ay: f, bx: n, by: f, dStart: y + e + c + e, len: y }
  ];
  let m = 0, g = 1 / 0;
  for (const b of u) {
    const w = b.bx - b.ax, T = b.by - b.ay, k = w * w + T * T, M = k === 0 ? 0 : Math.max(0, Math.min(1, ((i - b.ax) * w + (l - b.ay) * T) / k)), C = b.ax + M * w, E = b.ay + M * T, L = Math.hypot(i - C, l - E);
    L < g && (g = L, m = (b.dStart + M * b.len) / p);
  }
  return (m % 1 + 1) % 1;
}
function Fe(t, e, o, r) {
  const n = Je(t, r), s = Zd(t, n, e, o), i = Ts(t, n, s);
  return { t: s, x: i.x, y: i.y };
}
function ye(t, e) {
  const o = t == null ? void 0 : t.ports;
  if (o)
    return typeof o == "function" ? e ? o(e) : [] : o;
}
function pr(t) {
  const e = t == null ? void 0 : t.ports;
  return typeof e == "function" || Array.isArray(e) && e.length > 0;
}
const Kd = /* @__PURE__ */ new Set([
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
function qd(t) {
  var o;
  const e = ((o = t.docs) == null ? void 0 : o.id) ?? t.type;
  return {
    type: t.type,
    origin: Kd.has(t.type) ? "builtin" : "custom",
    docsLocalizationKey: e,
    isDataFlow: pr(t),
    // The catalog is a TYPE-level description; a resolver-valued `ports` has no
    // single instance to resolve against, so it contributes an empty port list
    // (still flagged data-flow via isDataFlow).
    ports: (Array.isArray(t.ports) ? t.ports : []).map((r) => ({
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
class Ud {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wt(this, "types", /* @__PURE__ */ new Map());
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
    return this.getAll().map((e) => qd(e)).sort((e, o) => e.type.localeCompare(o.type));
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
function zs(t) {
  const e = t.data;
  return (e == null ? void 0 : e.showEdgeComputeOverlay) === !0;
}
function Wo(t, e) {
  return `${t}:${e}`;
}
function Io(t, e) {
  return t.h === "auto" ? (e == null ? void 0 : e[t.id]) ?? 100 : t.h;
}
function Qd(t, e) {
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
function Jd(t, e) {
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
function $d(t, e) {
  const o = [];
  for (const r of t) {
    if (r.type !== "edge") continue;
    const n = r, { fromId: s, toId: i } = n.data;
    e.has(s) && e.has(i) && o.push(n);
  }
  return o;
}
function _d(t) {
  return t.map((e) => ({
    from: e.data.fromId,
    to: e.data.toId
  }));
}
function th(t, e, o, r) {
  const n = [...t].sort(
    (p, y) => p.y === y.y ? p.x - y.x : p.y - y.y
  ), s = n.length;
  if (s === 0) return /* @__PURE__ */ new Map();
  const i = Math.max(1, Math.ceil(Math.sqrt(s))), l = Math.max(1, ...n.map((p) => p.w)), d = Math.max(
    1,
    ...n.map((p) => Io(p, e))
  ), c = l + o, a = d + r, f = /* @__PURE__ */ new Map();
  for (let p = 0; p < s; p++) {
    const y = Math.floor(p / i), u = p % i;
    f.set(n[p].id, { x: u * c, y: y * a });
  }
  return f;
}
function eh(t, e) {
  const o = /* @__PURE__ */ new Map();
  for (const n of t) o.set(n, 0);
  const r = Math.max(t.length, e.length) + 2;
  for (let n = 0; n < r; n++)
    for (const { from: s, to: i } of e)
      o.set(i, Math.max(o.get(i), o.get(s) + 1));
  return o;
}
function Fi(t, e, o, r) {
  if (e.length === 0) return [...t];
  const n = new Map(e.map((i, l) => [i, l])), s = t.map((i) => {
    let l = 0, d = 0;
    for (const { from: c, to: a } of o)
      r === "backward" ? a === i && n.has(c) && (l += n.get(c), d++) : c === i && n.has(a) && (l += n.get(a), d++);
    return { id: i, score: d > 0 ? l / d : 1e9 };
  });
  return s.sort((i, l) => i.score - l.score || i.id.localeCompare(l.id)), s.map((i) => i.id);
}
function oh(t, e, o, r, n) {
  const s = t.map((u) => u.id), i = new Set(s), l = e.filter(
    (u) => i.has(u.from) && i.has(u.to)
  ), d = eh(s, l), c = Math.max(0, ...s.map((u) => d.get(u) ?? 0)), a = [];
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
      a[m] = Fi(
        a[m],
        a[m - 1],
        l,
        "backward"
      );
    for (let m = c - 1; m >= 0; m--)
      a[m] = Fi(
        a[m],
        a[m + 1],
        l,
        "forward"
      );
  }
  const p = /* @__PURE__ */ new Map();
  let y = 0;
  for (let u = 0; u <= c; u++) {
    const m = a[u], g = Math.max(1, ...m.map((b) => f.get(b).w));
    let x = 0;
    for (const b of m) {
      const w = f.get(b);
      p.set(b, { x: y, y: x }), x += Io(w, o) + n;
    }
    y += g + r;
  }
  return p;
}
function As(t, e, o) {
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  const l = new Map(e.map((d) => [d.id, d]));
  for (const [d, c] of t) {
    const a = l.get(d);
    if (!a) continue;
    const f = Io(a, o);
    r = Math.min(r, c.x), n = Math.min(n, c.y), s = Math.max(s, c.x + a.w), i = Math.max(i, c.y + f);
  }
  return Number.isFinite(r) ? { minX: r, minY: n, maxX: s, maxY: i } : { minX: 0, minY: 0, maxX: 0, maxY: 0 };
}
function rh(t, e, o) {
  const r = As(t, e, o), n = -r.minX, s = -r.minY, i = /* @__PURE__ */ new Map();
  for (const [l, d] of t)
    i.set(l, { x: d.x + n, y: d.y + s });
  return i;
}
function Jn(t, e) {
  const o = t.x + t.w / 2, r = t.y + t.h / 2, n = e.x + e.w / 2, s = e.y + e.h / 2, i = Math.min(t.x + t.w, e.x + e.w) - Math.max(t.x, e.x), l = Math.min(t.y + t.h, e.y + e.h) - Math.max(t.y, e.y);
  return i <= 0 || l <= 0 ? null : i < l ? o < n ? { dx: -i, dy: 0 } : { dx: i, dy: 0 } : r < s ? { dx: 0, dy: -l } : { dx: 0, dy: l };
}
function $n(t, e, o, r, n) {
  const s = Io(t, o);
  let i = 0, l = 0;
  const d = r == null ? void 0 : r.get(t.type), c = ye(d, t);
  if (c != null && c.length) {
    const a = (qa + 12) / Math.max(0.35, n);
    c.some((f) => f.direction === "input") && (i = a), c.some((f) => f.direction === "output") && (l = a);
  }
  return {
    x: e.x - i,
    y: e.y,
    w: t.w + i + l,
    h: s
  };
}
function $a(t, e, o, r) {
  const n = 14 + 10 / Math.max(0.35, r);
  for (let s = 0; s < 40; s++)
    for (let i = 0; i < e.length; i++)
      for (let l = i + 1; l < e.length; l++) {
        const d = e[i], c = e[l], a = t.get(d.id), f = t.get(c.id), p = Io(d, o), y = Io(c, o), u = a.x + d.w / 2, m = a.y + p / 2, g = f.x + c.w / 2, x = f.y + y / 2;
        let b = u - g, w = m - x, T = Math.hypot(b, w);
        if (T >= n) continue;
        if (T < 1e-4) {
          const M = (i * 2.17 + l * 3.91 + s * 0.37) % (Math.PI * 2);
          b = Math.cos(M), w = Math.sin(M), T = 0;
        } else
          b /= T, w /= T;
        const k = (n - T) * 0.62 + 6 / Math.max(0.35, r);
        a.x += b * k, a.y += w * k, f.x -= b * k, f.y -= w * k;
      }
}
function nh(t, e, o, r, n) {
  const s = Io(t, o), i = Io(e, o), l = t.x + t.w / 2, d = t.y + s / 2, c = e.x + e.w / 2, a = e.y + i / 2;
  let f = c - l, p = a - d, y = Math.hypot(f, p);
  y < 1e-4 && (f = 1, p = 0, y = 1);
  const u = -p / y, m = f / y, g = Math.floor(r / 2) + 1, b = (r % 2 === 0 ? 1 : -1) * (18 / Math.max(0.35, n)) * Math.min(3, g) * (1 + g * 0.12);
  return { dx: u * b, dy: m * b };
}
function _n(t, e, o, r, n = 0) {
  const s = 13 / r, i = 7 / r, l = 5 / r, d = 6 / r, c = Math.max(...t.map((p) => p.text.length), 1), a = Math.min(c * d + i * 2, 280 / r) + n, f = t.length * s + l * 2;
  return {
    x: e - a / 2,
    y: o - f / 2,
    w: a,
    h: f
  };
}
function sh(t, e, o, r, n, s) {
  var f, p;
  const i = o.data, l = Pe(
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
      const y = r.get(t.type), u = ye(y, t);
      if (u)
        return Ee(
          t,
          u,
          i.sourcePort,
          s,
          n,
          y.portAnchor ?? "bbox"
        ) ?? void 0;
    })(),
    (() => {
      if (!i.targetPort || !r) return;
      const y = r.get(e.type), u = ye(y, e);
      if (u)
        return Ee(
          e,
          u,
          i.targetPort,
          s,
          n,
          y.portAnchor ?? "bbox"
        ) ?? void 0;
    })(),
    i.sourceT,
    i.targetT,
    i.attachmentGap
  ), d = l.labelX, c = l.labelY;
  if (i.sourcePort && i.targetPort) {
    const y = (f = i.label) == null ? void 0 : f.trim();
    if (!zs(e))
      return y ? _n([{ text: y }], d, c, s, 0) : null;
    const u = [];
    y && u.push({ text: y }), u.push({
      text: `${i.sourcePort} → ${i.targetPort}`
    }), u.push({ text: "compute 999 ms" });
    const m = 9 / s;
    return _n(
      u,
      d,
      c,
      s,
      m * 2 + 6 / s
    );
  }
  const a = (p = i.label) == null ? void 0 : p.trim();
  return a ? _n(
    [{ text: a }],
    d,
    c,
    s,
    0
  ) : null;
}
function Bi(t, e, o, r, n, s) {
  const i = nh(e, o, r, n, s);
  return { ...t, x: t.x + i.dx, y: t.y + i.dy };
}
function ih(t, e) {
  const o = Math.hypot(t.x, t.y);
  if (o > e && o > 1e-9) {
    const r = e / o;
    t.x *= r, t.y *= r;
  }
}
function ah(t) {
  return [...t].sort(
    (e, o) => e.data.fromId.localeCompare(o.data.fromId) || e.data.toId.localeCompare(o.data.toId) || e.id.localeCompare(o.id)
  );
}
function lh(t, e, o, r, n, s) {
  if (e.length < 2) return;
  const i = new Map(e.map((f) => [f.id, f])), l = new Set(e.map((f) => f.id)), d = 78, c = (f, p, y, u) => {
    const m = u.get(f) ?? { x: 0, y: 0 };
    m.x += p, m.y += y, u.set(f, m);
  }, a = Math.max(0.35, s);
  for (let f = 0; f < d; f++) {
    const p = /* @__PURE__ */ new Map(), y = 0.36 + f * 9e-3, u = 34, m = (w) => {
      const T = i.get(w), k = t.get(w);
      return { ...T, x: k.x, y: k.y };
    };
    for (let w = 0; w < e.length; w++)
      for (let T = w + 1; T < e.length; T++) {
        const k = e[w], M = e[T], C = $n(
          k,
          t.get(k.id),
          n,
          r,
          a
        ), E = $n(
          M,
          t.get(M.id),
          n,
          r,
          a
        ), L = Jn(C, E);
        if (!L) continue;
        const F = 1.08 + (f < 24 ? 0.12 : 0), X = L.dx * 0.5 * F, tt = L.dy * 0.5 * F;
        c(k.id, X, tt, p), c(M.id, -X, -tt, p);
      }
    const g = [], x = ah(o);
    let b = 0;
    for (const w of x) {
      const { fromId: T, toId: k } = w.data;
      if (!l.has(T) || !l.has(k)) continue;
      const M = sh(
        m(T),
        m(k),
        w,
        r,
        n,
        s
      );
      M && g.push({ rect: M, fromId: T, toId: k, idx: b++ });
    }
    for (const { rect: w, fromId: T, toId: k } of g)
      for (const M of e) {
        const C = $n(
          M,
          t.get(M.id),
          n,
          r,
          a
        ), E = Jn(w, C);
        if (!E) continue;
        const L = M.id === T || M.id === k ? 0.58 : 0.44;
        c(T, E.dx * L, E.dy * L, p), c(k, E.dx * L, E.dy * L, p), M.id !== T && M.id !== k && c(M.id, -E.dx * L * 0.9, -E.dy * L * 0.9, p);
      }
    for (let w = 0; w < g.length; w++)
      for (let T = w + 1; T < g.length; T++) {
        const k = g[w], M = g[T], C = Bi(
          k.rect,
          m(k.fromId),
          m(k.toId),
          n,
          k.idx * 2,
          s
        ), E = Bi(
          M.rect,
          m(M.fromId),
          m(M.toId),
          n,
          M.idx * 2 + 1,
          s
        );
        let L = Jn(C, E);
        if (!L) {
          const et = C.x + C.w / 2, ft = C.y + C.h / 2, Ct = E.x + E.w / 2, xt = E.y + E.h / 2;
          let W = et - Ct, R = ft - xt, K = Math.hypot(W, R);
          if (K < 1e-4) {
            const q = (w * 1.7 + T * 2.3 + f * 0.11) % (Math.PI * 2);
            W = Math.cos(q), R = Math.sin(q), K = 1;
          } else
            W /= K, R /= K;
          L = { dx: W * 14, dy: R * 14 };
        }
        const F = 0.5 + (f < 30 ? 0.12 : 0), X = L.dx * F, tt = L.dy * F;
        c(k.fromId, X, tt, p), c(k.toId, X, tt, p), c(M.fromId, -X, -tt, p), c(M.toId, -X, -tt, p);
      }
    for (const [w, T] of p) {
      const k = { x: T.x * y, y: T.y * y };
      ih(k, u);
      const M = t.get(w);
      M && (M.x += k.x, M.y += k.y);
    }
    (f === 20 || f === 45) && $a(t, e, n, s);
  }
}
function ch(t, e, o, r, n, s = 1) {
  const i = Math.max(24, r ?? 32), l = Math.max(16, Math.round((r ?? 32) * 0.5)), d = Math.max(32, i), c = new Map(t.map((C) => [C.id, C])), a = [...e].map((C) => c.get(C)).filter(
    (C) => !!C && C.type !== "edge" && !C.locked
  );
  if (a.length < 2) return [];
  const f = new Set(a.map((C) => C.id)), p = $d(t, f), y = _d(p), u = Jd(
    a.map((C) => C.id),
    y
  );
  u.sort((C, E) => {
    const L = Math.min(...C.map((X) => {
      var tt;
      return ((tt = c.get(X)) == null ? void 0 : tt.x) ?? 0;
    })), F = Math.min(...E.map((X) => {
      var tt;
      return ((tt = c.get(X)) == null ? void 0 : tt.x) ?? 0;
    }));
    return L - F;
  });
  const m = /* @__PURE__ */ new Map();
  let g = 0;
  for (const C of u) {
    const E = C.map((R) => c.get(R)).filter((R) => !!R), L = new Set(C), F = p.filter(
      (R) => L.has(R.data.fromId) && L.has(R.data.toId)
    ), X = y.filter(
      (R) => L.has(R.from) && L.has(R.to)
    ), et = F.some(
      (R) => R.data.sourcePort && R.data.targetPort
    ) ? 1.72 : 1.18, ft = i * et, Ct = l * et;
    let xt;
    X.length === 0 || !Qd(C, X) ? xt = th(E, o, ft, Ct) : xt = oh(
      E,
      X,
      o,
      ft,
      Ct
    ), $a(
      xt,
      E,
      o,
      Math.max(0.25, s)
    ), lh(
      xt,
      E,
      F,
      n,
      o,
      Math.max(0.25, s)
    ), xt = rh(xt, E, o);
    const W = As(xt, E, o);
    for (const [R, K] of xt)
      m.set(R, { x: K.x + g, y: K.y });
    g += W.maxX - W.minX + d;
  }
  const x = Math.min(...a.map((C) => C.x)), b = Math.min(...a.map((C) => C.y)), w = As(m, a, o), T = x - w.minX, k = b - w.minY, M = [];
  for (const C of a) {
    const E = m.get(C.id);
    E && M.push({ id: C.id, x: E.x + T, y: E.y + k });
  }
  return M;
}
function dh(t, e, o) {
  const r = t.x, n = t.x + t.w / 2, s = t.x + t.w, i = t.y, l = t.y + t.h / 2, d = t.y + t.h, c = [r, n, s], a = [i, l, d];
  let f = 1 / 0, p = 1 / 0;
  const y = [];
  for (const m of e) {
    const g = m.x, x = m.x + m.w / 2, b = m.x + m.w, w = m.y, T = m.y + m.h / 2, k = m.y + m.h, M = [g, x, b], C = [w, T, k];
    for (const E of c)
      for (const L of M) {
        const F = L - E;
        Math.abs(F) <= o && (Math.abs(F) < Math.abs(f) && (f = F), y.push({
          axis: "x",
          position: L,
          start: Math.min(t.y, t.y + t.h, m.y, m.y + m.h),
          end: Math.max(t.y, t.y + t.h, m.y, m.y + m.h)
        }));
      }
    for (const E of a)
      for (const L of C) {
        const F = L - E;
        Math.abs(F) <= o && (Math.abs(F) < Math.abs(p) && (p = F), y.push({
          axis: "y",
          position: L,
          start: Math.min(t.x, t.x + t.w, m.x, m.x + m.w),
          end: Math.max(t.x, t.x + t.w, m.x, m.x + m.w)
        }));
      }
  }
  const u = /* @__PURE__ */ new Map();
  for (const m of y) {
    const g = `${m.axis}:${m.position.toFixed(1)}`, x = u.get(g);
    x ? (x.start = Math.min(x.start, m.start), x.end = Math.max(x.end, m.end)) : u.set(g, { ...m });
  }
  return {
    guides: Array.from(u.values()),
    snapDx: Math.abs(f) <= o ? f : 0,
    snapDy: Math.abs(p) <= o ? p : 0
  };
}
const Wr = class Wr {
  constructor() {
    wt(this, "nodes", /* @__PURE__ */ new Map());
    wt(this, "viewport", { x: 0, y: 0, zoom: 1 });
    wt(this, "selection", /* @__PURE__ */ new Set());
    wt(this, "activeGroupId", null);
    wt(this, "groupRotations", /* @__PURE__ */ new Map());
    /** Maps child groupId → parent groupId for nested groups. */
    wt(this, "groupParent", /* @__PURE__ */ new Map());
    /** Reverse index: parent groupId → set of child groupIds. Maintained alongside groupParent. */
    wt(this, "groupChildren", /* @__PURE__ */ new Map());
    wt(this, "mode", "select");
    wt(this, "activeTool", {
      tool: "pen",
      color: "#1e1e2e",
      width: 3,
      shapeType: "rect",
      strokeStyle: "solid",
      roughness: 1,
      opacity: 1
    });
    wt(this, "containerOffset", { x: 0, y: 0 });
    /** DOM element that hosts the canvas — used to derive the correct window in pop-out scenarios. */
    wt(this, "_container", null);
    wt(this, "snapToGrid", !1);
    wt(this, "smartGuides", !0);
    wt(this, "lassoSelect", !1);
    wt(this, "freeFormEdges", !0);
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
    wt(this, "readOnly", !1);
    wt(this, "presentationMode", !1);
    wt(this, "presentationSlides", []);
    wt(this, "presentationIndex", 0);
    wt(this, "_presentationAnimId", null);
    /** Transition overlay state — consumed by PresentationOverlay for visual effects. */
    wt(this, "_transitionOverlay", null);
    wt(this, "gridSize", 20);
    wt(this, "boardBackground", "dot-grid");
    /** Saved "origin" viewport position restored on next load. */
    wt(this, "originView", null);
    /** Current alignment guides (set during drag). */
    wt(this, "alignGuides", []);
    /** Container dimensions for viewport bounds computation. */
    wt(this, "_containerWidth", 2e3);
    wt(this, "_containerHeight", 1500);
    wt(this, "history", new id());
    /** When set, `updateNodeWithHistoryCoalesced` reuses one undo step until `endHistoryCoalesce()`. */
    wt(this, "_historyCoalesceKey", null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wt(this, "listeners", {});
    wt(this, "_suppressEvents", !1);
    wt(this, "_collabMode", !1);
    /** When > 0, `addNode`/`addNodes` skip their own history snapshot push
     *  so a single `beginAgentAction()` snapshot covers multiple operations. */
    wt(this, "_agentActionDepth", 0);
    /** Auto-reset timer for `beginAgentAction()` when no matching `endAgentAction()`
     *  arrives in time (cross-process MCP callers can crash between begin/end). */
    wt(this, "_agentActionTimer", null);
    wt(this, "clipboard", []);
    wt(this, "pasteCount", 0);
    wt(this, "nextZValue", 1);
    wt(this, "_minZ", 0);
    wt(this, "quadTree", new vs({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    wt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    wt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    wt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    wt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    wt(this, "_measuredHeights", {});
    wt(this, "_search", {
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
    const o = this.resolveHeight(e), r = 40, n = e.x - r, s = e.y - r, i = e.w + r * 2, l = o + r * 2, d = this._containerWidth, c = this._containerHeight, a = no(Math.min(d / i, c / l), 0.1, 5);
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
        const p = f * 2, y = 1 - Math.pow(1 - p, 3);
        this.viewport.x = s.x + (l - s.x) * y, this.viewport.y = s.y + (d - s.y) * y, this.viewport.zoom = s.zoom + (i - s.zoom) * y;
      } else {
        const p = (f - 0.5) * 2, y = 1 - Math.pow(1 - p, 3);
        this.viewport.x = l + (e.x - l) * y, this.viewport.y = d + (e.y - d) * y, this.viewport.zoom = i + (e.zoom - i) * y;
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
    const p = o instanceof Set ? o : new Set(o);
    if (d) {
      let y = 1 / 0, u = 1 / 0, m = -1 / 0, g = -1 / 0;
      for (const T of e) {
        const k = this.getNode(T.id);
        if (!k) continue;
        const M = T.x + r, C = T.y + n, E = this.resolveHeight(k);
        y = Math.min(y, M), u = Math.min(u, C), m = Math.max(m, M + k.w), g = Math.max(g, C + E);
      }
      const x = { x: y, y: u, w: m - y, h: g - u }, b = (i == null ? void 0 : i.staticNodes) ?? this.createDragSnapContext(p).staticNodes, w = dh(x, b, 5);
      if (f = w.guides, l) {
        const T = e[0].x + r, k = e[0].y + n, M = this.snap(T, k), C = M.x - T, E = M.y - k, L = w.snapDx !== 0 && Math.abs(w.snapDx) <= Math.abs(C), F = w.snapDy !== 0 && Math.abs(w.snapDy) <= Math.abs(E);
        c = r + (L ? w.snapDx : C), a = n + (F ? w.snapDy : E), L || (f = f.filter((X) => X.axis !== "x")), F || (f = f.filter((X) => X.axis !== "y"));
      } else
        c = r + w.snapDx, a = n + w.snapDy;
    } else if (l) {
      const y = this.snap(e[0].x + r, e[0].y + n);
      c = y.x - e[0].x, a = y.y - e[0].y;
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
    this.viewport = gd(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, r) {
    this.viewport = bd(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const r = no(e, 0.1, 5);
    if (o) {
      const n = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = fr(this.viewport, n, s);
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
    const n = r.h === "auto" ? 100 : r.h, s = r.x + r.w / 2, i = r.y + n / 2, l = this.getWindow(), d = l.innerWidth, c = l.innerHeight, a = no(o, 0.2, 5);
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
      const p = f.h === "auto" ? 100 : f.h;
      f.x < e && (e = f.x), f.y < o && (o = f.y), f.x + f.w > r && (r = f.x + f.w), f.y + p > n && (n = f.y + p);
    }
    const s = 50;
    e -= s, o -= s, r += s, n += s;
    const i = r - e, l = n - o, d = this._containerWidth, c = this._containerHeight, a = no(
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
    const r = o.h === "auto" ? 100 : o.h, n = 20, s = o.w + n * 2, i = r + n * 2, l = this._containerWidth, d = this._containerHeight, c = no(
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
    return fr(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return md(this.viewport, e, o);
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
    var s, i, l, d, c, a, f, p, y;
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
    (r.rotation ?? 0) !== (n.rotation ?? 0) && ((a = (c = (d = this.registry) == null ? void 0 : d.get(n.type)) == null ? void 0 : c.onRotate) == null || a.call(c, n, n.rotation ?? 0, this), this.emit("node:rotate", n, n.rotation ?? 0)), o.data && r.data !== n.data && ((y = (p = (f = this.registry) == null ? void 0 : f.get(n.type)) == null ? void 0 : p.onDataChange) == null || y.call(p, n, r.data, n.data, this), this.emit("node:data", n, r.data, n.data), this.refreshSearchIfNeeded()), this.emit("change");
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
          const p = a.fromId === e ? a.toId : a.fromId;
          (l = this.adjacency.get(p)) == null || l.delete(d);
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
          const p = this.resolveHeight(f);
          r.x >= f.x && r.y >= f.y && r.x + r.w <= f.x + f.w && r.y + n <= f.y + p || a.delete(o);
        }
        let s;
        this._containerTypes.has(r.type) && (s = this.getFrameDescendantIds(o));
        let i = null, l = 1 / 0;
        const d = this.quadTree.retrieve([], { x: r.x, y: r.y, w: r.w, h: n });
        for (const c of d) {
          if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
          const a = this.resolveHeight(c);
          if (r.x >= c.x && r.y >= c.y && r.x + r.w <= c.x + c.w && r.y + n <= c.y + a) {
            const p = c.w * a;
            p < l && (l = p, i = c);
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
    const n = Me.isEnabled(), s = n ? performance.now() : 0, i = 50, l = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), d = /* @__PURE__ */ new Map();
    for (const a of l) d.set(a.id, a);
    const c = fd(d, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && Me.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, r) {
    const n = Me.isEnabled(), s = n ? performance.now() : 0, i = 50, l = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), d = /* @__PURE__ */ new Map();
    for (const a of l) d.set(a.id, a);
    const c = yd(d, e, o, this.viewport.zoom, r, this._containerTypes);
    return n && Me.recordHitTest(performance.now() - s), c;
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
              ([a, f, p]) => [a, d - f, p]
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
    const r = ch(
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
    for (const p of this.selection) {
      const y = this.nodes.get(p);
      !y || y.type === "edge" || y.locked || r.push(y);
    }
    if (r.length < 2) return;
    const n = (p) => p.h === "auto" ? (o == null ? void 0 : o[p.id]) ?? 100 : p.h;
    let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
    for (const p of r) {
      const y = n(p);
      s = Math.min(s, p.x), i = Math.min(i, p.y), l = Math.max(l, p.x + p.w), d = Math.max(d, p.y + y);
    }
    const c = (s + l) / 2, a = (i + d) / 2, f = [];
    for (const p of r) {
      const y = n(p);
      let u = p.x, m = p.y;
      switch (e) {
        case "left":
          u = s;
          break;
        case "right":
          u = l - p.w;
          break;
        case "centerH":
          u = c - p.w / 2;
          break;
        case "top":
          m = i;
          break;
        case "bottom":
          m = d - y;
          break;
        case "centerV":
          m = a - y / 2;
          break;
      }
      (u !== p.x || m !== p.y) && f.push({ id: p.id, patch: { x: u, y: m } });
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
      const a = d - l, f = a - c, p = f >= 0 ? f / (i.length - 1) : 0;
      let u = f >= 0 ? l : l + (a - c) / 2;
      for (const m of i) {
        const g = u;
        u += m.w + p, g !== m.x && s.push({ id: m.id, patch: { x: g } });
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
      const a = d - l, f = a - c, p = f >= 0 ? f / (i.length - 1) : 0;
      let u = f >= 0 ? l : l + (a - c) / 2;
      for (const m of i) {
        const g = n(m), x = u;
        u += g + p, x !== m.y && s.push({ id: m.id, patch: { y: x } });
      }
    }
    s.length !== 0 && this.batchUpdateWithHistory(s);
  }
  // --- Grouping ---
  groupSelected() {
    if (this.readOnly || this.selection.size < 2 || this.activeGroupId) return;
    this._historyCoalesceKey = null, this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = Ht(10), o = /* @__PURE__ */ new Set();
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
      const l = Ht();
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
      s.groupId && (n.has(s.groupId) || n.set(s.groupId, Ht(10)), s.groupId = n.get(s.groupId));
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
      const x = this.getWindow(), b = x.innerWidth / 2, w = x.innerHeight / 2, T = fr(this.viewport, b, w);
      c = T.x, a = T.y;
    }
    const f = this.pasteCount * 20, p = c - l + f, y = a - d + f, u = /* @__PURE__ */ new Map(), m = this.clipboard.map((x) => {
      const b = Ht();
      return u.set(x.id, b), {
        ...structuredClone(x),
        id: b,
        x: x.x + p,
        y: x.y + y,
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
      x.groupId && (g.has(x.groupId) || g.set(x.groupId, Ht(10)), x.groupId = g.get(x.groupId));
    for (const [x, b] of this.groupParent)
      g.has(x) && g.has(b) && this.linkGroupParent(g.get(x), g.get(b));
    this.addNodes(m), this.selectMultiple(m.map((x) => x.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, r) {
    const n = Ba.find((y) => y.id === e);
    if (!n) return;
    const s = structuredClone(n.nodes), i = /* @__PURE__ */ new Map();
    for (const y of s) {
      const u = Ht(10);
      i.set(y.id, u), y.id = u;
    }
    for (const y of s) {
      if (y.type === "edge" && y.data) {
        const u = y.data;
        i.has(u.fromId) && (u.fromId = i.get(u.fromId)), i.has(u.toId) && (u.toId = i.get(u.toId));
      }
      y.groupId && i.has(y.groupId) && (y.groupId = i.get(y.groupId));
    }
    let l = 1 / 0, d = 1 / 0, c = -1 / 0, a = -1 / 0;
    for (const y of s) {
      if (y.type === "edge") continue;
      const u = y.h === "auto" ? 100 : y.h;
      l = Math.min(l, y.x), d = Math.min(d, y.y), c = Math.max(c, y.x + y.w), a = Math.max(a, y.y + u);
    }
    const f = o - (l + c) / 2, p = r - (d + a) / 2;
    for (const y of s)
      y.type !== "edge" && (y.x += f, y.y += p), y.z = this.nextZValue++;
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
    return vd(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: r } = await Td(e);
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
        `[SpatialEngine] Agent action timed out after ${Wr.AGENT_ACTION_TIMEOUT_MS}ms — force-resetting depth (was ${this._agentActionDepth}).`
      ), this._agentActionDepth = 0, this._agentActionTimer = null;
    }, Wr.AGENT_ACTION_TIMEOUT_MS);
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
    const c = Ht(10);
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
    const s = Ht(10), i = (n == null ? void 0 : n.w) ?? 200, l = this.estimateTextBlockHeight(e, (n == null ? void 0 : n.fontSize) ?? 16, i);
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
    const s = Ht(10);
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
    const s = Ht(10);
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
    const i = Ht(10);
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
    const s = Ht(10);
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
    ), d = Ht(10);
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
    const n = Ht(10);
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
        let p, y, u;
        if (a.type === "text" && f)
          p = f.text, u = f.color;
        else if (a.type === "sticky" && f)
          p = f.text, u = f.color;
        else if (a.type === "shape" && f)
          y = f.label, u = f.stroke;
        else if (a.type === "edge" && f)
          y = f.label, u = f.color;
        else if (a.type === "frame" && f)
          y = f.label;
        else if (a.type === "content" && f) {
          const m = f.markdown;
          m && (p = m.length > 200 ? m.slice(0, 197) + "..." : m);
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
          text: p,
          label: y,
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
    const r = no(e, 0.1, 5);
    return this.animateViewport({ zoom: r }, { duration: o });
  }
  /** Smoothly zoom and center on a specific node, sized to fit with padding.
   *  Returns a Promise that resolves when the animation completes. */
  animateZoomToNode(e, o) {
    const r = this.nodes.get(e);
    if (!r) return Promise.reject(new Error(`Node "${e}" not found`));
    const n = this.resolveHeight(r), s = r.x + r.w / 2, i = r.y + n / 2, l = this._containerWidth, d = this._containerHeight, c = 80, a = no(
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
wt(Wr, "AGENT_ACTION_TIMEOUT_MS", 6e4);
let Es = Wr;
const Ni = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], hh = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function zn(t, e) {
  const o = Ni.indexOf(t);
  if (o === -1) return "default";
  const r = (e % 360 + 360) % 360, n = Math.round(r / 45) % 8, s = (o + n) % 8;
  return hh[Ni[s]];
}
function Ps(t, e, o, r, n, s, i, l, d) {
  if (!(t === "nw" || t === "ne" || t === "sw" || t === "se") || r <= 0 || n <= 0 || l <= 0 || d <= 0)
    return { x: s, y: i, w: l, h: d };
  const a = r / n;
  let f = l, p = d;
  f / p > a ? f = p * a : p = f / a;
  let y = s, u = i;
  return t === "se" ? (y = e, u = o) : t === "ne" ? (y = e, u = o + n - p) : t === "sw" ? (y = e + r - f, u = o) : (y = e + r - f, u = o + n - p), { x: y, y: u, w: f, h: p };
}
class uh extends Vc {
  constructor() {
    super(...arguments);
    wt(this, "state", { hasError: !1 });
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
function Oi({ markdown: t }) {
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
const fh = 0, ph = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function yh(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function mh({
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
  const c = pt(null), a = pt(d === !0), f = pt(!1), p = pt(!1), y = pt(!1), u = pt(!1), m = pt(JSON.stringify(t.data.blocks ?? [])), [g, x] = ot(!1), [b, w] = ot(!1), T = pt(null), k = Yc({ schema: n }), M = pt(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  St(() => {
    const W = M.current;
    if (!W) return;
    M.current = null;
    const R = requestAnimationFrame(() => {
      try {
        k.replaceBlocks(k.document, W), m.current = JSON.stringify(k.document);
        return;
      } catch {
      }
      try {
        const K = k.blocksToHTMLLossy(W);
        k._tiptapEditor.commands.setContent(K), m.current = JSON.stringify(k.document);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), w(!0);
    });
    return () => cancelAnimationFrame(R);
  }, [k]), St(() => {
    (!e || o) && x(!1);
  }, [e, o]), St(() => {
    a.current && (a.current = !1, f.current = !0, x(!0));
  }, [k]), St(() => {
    if (!g || !f.current && !T.current) return;
    const W = T.current;
    T.current = null, f.current = !1;
    const R = requestAnimationFrame(() => {
      if (k.focus(), W)
        try {
          const K = k._tiptapEditor, ut = K.view.posAtCoords({ left: W.x, top: W.y });
          ut && K.commands.setTextSelection(ut.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(R);
  }, [g, k]);
  const C = ct(() => {
    if (p.current || y.current) return;
    const W = r.getNode(t.id), R = k.document;
    m.current = JSON.stringify(R), r.updateNode(t.id, {
      data: { ...W == null ? void 0 : W.data, blocks: R }
    });
  }, [k, r, t.id]), E = 100;
  St(() => {
    if (!k) return;
    let W = null, R = 0;
    const K = () => {
      var _, H;
      if (p.current || y.current || u.current) return;
      const ut = k.document.length, j = r.getNode(t.id), $ = ((H = (_ = j == null ? void 0 : j.data) == null ? void 0 : _.blocks) == null ? void 0 : H.length) ?? 0;
      if (ut < $) return;
      const at = Date.now(), rt = at - R;
      if (rt >= E) {
        R = at, C();
        return;
      }
      W && clearTimeout(W), W = setTimeout(() => {
        W = null, R = Date.now(), C();
      }, E - rt);
    }, q = k.onChange(K);
    return () => {
      q == null || q(), W && clearTimeout(W);
    };
  }, [k, C, r, t.id]), St(() => {
    const W = c.current;
    if (!W) return;
    const R = (K) => {
      const q = K.relatedTarget;
      q && W.contains(q) || C();
    };
    return W.addEventListener("focusout", R), () => W.removeEventListener("focusout", R);
  }, [C]), St(() => {
    if (g) return;
    const W = t.data.blocks;
    if (!Array.isArray(W)) return;
    const R = W.length > 0 ? W : [{ type: "paragraph", content: [] }], K = JSON.stringify(R);
    if (K !== m.current) {
      u.current = !0;
      try {
        k.replaceBlocks(k.document, R);
      } catch {
        try {
          const q = k.blocksToHTMLLossy(R);
          k._tiptapEditor.commands.setContent(q);
        } catch {
          u.current = !1;
          return;
        }
      }
      u.current = !1, m.current = K;
    }
  }, [t.data.blocks, g, k]), St(() => {
    if (t.h !== "auto" || !l) return;
    const W = c.current;
    if (!W) return;
    const R = () => {
      const q = W.offsetHeight;
      q > 0 && l(t.id, q);
    };
    R();
    const K = new ResizeObserver(R);
    return K.observe(W), () => K.disconnect();
  }, [t.id, t.h, l]);
  const L = ct(() => {
    const W = r.getNode(t.id);
    if (!W || W.h === "auto" || !k || !c.current)
      return;
    const R = W.h - fh, K = c.current.querySelector(".bn-editor");
    if (!K) return;
    const q = k.document;
    if (q.length === 0) return;
    let ut = 0;
    for (let rt = q.length - 1; rt >= 1 && yh(q[rt]); rt--)
      ut++;
    const j = K.scrollHeight, $ = q.length > 0 ? j / q.length : 36;
    if (p.current = !0, j < R) {
      const rt = R - j, _ = Math.max(0, Math.floor(rt / $));
      if (_ > 0) {
        const H = q[q.length - 1];
        k.insertBlocks(
          Array.from({ length: _ }, () => ({
            type: "paragraph",
            content: []
          })),
          H,
          "after"
        );
      }
    } else if (j > R && ut > 0) {
      const rt = j - R, _ = Math.min(ut, Math.ceil(rt / $));
      if (_ > 0) {
        const H = q.slice(q.length - _);
        k.removeBlocks(H);
      }
    }
    const at = r.getNode(t.id);
    at && (r.updateNode(t.id, {
      data: { ...at.data, blocks: k.document }
    }), m.current = JSON.stringify(k.document)), p.current = !1;
  }, [k, r, t.id]), F = pt(L);
  F.current = L, St(() => {
    if (t.h === "auto") return;
    const W = setTimeout(() => F.current(), 60);
    return () => clearTimeout(W);
  }, []);
  const X = ct(
    (W) => {
      const R = W.currentTarget.ownerDocument;
      if (W.altKey) return;
      if (!r.selection.has(t.id) && r.selection.size > 0) {
        const { x: ht, y: gt } = r.screenToCanvas(W.clientX, W.clientY);
        for (const vt of r.selection) {
          const Et = r.getNode(vt);
          if (!Et) continue;
          const Rt = Et.h === "auto" ? 100 : Et.h;
          if (ht >= Et.x && ht <= Et.x + Et.w && gt >= Et.y && gt <= Et.y + Rt)
            return;
        }
      }
      W.stopPropagation(), W.preventDefault(), W.currentTarget.setPointerCapture(W.pointerId), W.shiftKey ? r.toggleSelect(t.id) : r.selection.has(t.id) || r.select(t.id);
      const K = W.clientX, q = W.clientY, ut = Array.from(r.selection), j = ut.map((ht) => {
        const gt = r.getNode(ht);
        return { id: ht, x: gt.x, y: gt.y };
      });
      let $ = !1, at = null, rt = K, _ = q, H = !1;
      const it = () => {
        at = null;
        const ht = (rt - K) / r.viewport.zoom, gt = (_ - q) / r.viewport.zoom, { finalDx: vt, finalDy: Et } = r.computeDragSnap(
          j,
          ut,
          ht,
          gt,
          H
        ), Rt = j.map((At) => ({
          id: At.id,
          patch: { x: At.x + vt, y: At.y + Et }
        }));
        r.updateMany(Rt);
      }, dt = (ht) => {
        const gt = (ht.clientX - K) / r.viewport.zoom, vt = (ht.clientY - q) / r.viewport.zoom;
        if (!$)
          if (Math.abs(gt) > 2 || Math.abs(vt) > 2)
            $ = !0, y.current = !0, r.pushHistorySnapshot();
          else
            return;
        rt = ht.clientX, _ = ht.clientY, H = ht.metaKey || ht.ctrlKey, at === null && (at = requestAnimationFrame(it));
      }, st = () => {
        y.current = !1, at !== null && (cancelAnimationFrame(at), it()), r.clearAlignGuides(), R.removeEventListener("pointermove", dt), R.removeEventListener("pointerup", st);
      };
      R.addEventListener("pointermove", dt), R.addEventListener("pointerup", st);
    },
    [r, t.id]
  ), tt = ct(
    (W) => {
      var dt;
      const R = W.currentTarget.ownerDocument;
      W.stopPropagation(), W.preventDefault();
      const K = t.h === "auto" ? (((dt = c.current) == null ? void 0 : dt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h, q = t.x + t.w / 2, ut = t.y + K / 2, j = t.rotation || 0, { x: $, y: at } = r.screenToCanvas(
        W.clientX,
        W.clientY
      ), rt = Math.atan2(at - ut, $ - q);
      let _ = !1;
      const H = (st) => {
        _ || (_ = !0, r.pushHistorySnapshot());
        const { x: ht, y: gt } = r.screenToCanvas(st.clientX, st.clientY), vt = Math.atan2(gt - ut, ht - q);
        let Et = j + (vt - rt) * (180 / Math.PI);
        (st.shiftKey || r.snapToGrid) && !(st.metaKey || st.ctrlKey) && (Et = Math.round(Et / 15) * 15), r.updateNode(t.id, { rotation: Et });
      }, it = () => {
        R.removeEventListener("pointermove", H), R.removeEventListener("pointerup", it);
      };
      R.addEventListener("pointermove", H), R.addEventListener("pointerup", it);
    },
    [r, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), et = ct(
    (W, R) => {
      var dt;
      const K = R.currentTarget.ownerDocument;
      R.stopPropagation(), R.preventDefault();
      const q = R.clientX, ut = R.clientY, j = t.x, $ = t.y, at = t.w, rt = t.h === "auto" ? (((dt = c.current) == null ? void 0 : dt.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h;
      let _ = !1;
      const H = (st) => {
        const ht = (st.clientX - q) / r.viewport.zoom, gt = (st.clientY - ut) / r.viewport.zoom;
        _ || (_ = !0, r.pushHistorySnapshot());
        let vt = j, Et = $, Rt = at, At = rt;
        if ((W === "nw" || W === "w" || W === "sw") && (vt = j + ht, Rt = at - ht), (W === "ne" || W === "e" || W === "se") && (Rt = at + ht), (W === "nw" || W === "n" || W === "ne") && (Et = $ + gt, At = rt - gt), (W === "sw" || W === "s" || W === "se") && (At = rt + gt), r.snapToGrid && !(st.metaKey || st.ctrlKey)) {
          const yt = r.gridSize, Lt = (Wt) => Math.round(Wt / yt) * yt;
          (W === "nw" || W === "w" || W === "sw") && (vt = Lt(vt), Rt = j + at - vt), (W === "ne" || W === "e" || W === "se") && (Rt = Lt(vt + Rt) - vt), (W === "nw" || W === "n" || W === "ne") && (Et = Lt(Et), At = $ + rt - Et), (W === "sw" || W === "s" || W === "se") && (At = Lt(Et + At) - Et);
        }
        if (Rt < 100 && (Rt = 100, (W === "nw" || W === "w" || W === "sw") && (vt = j + at - 100)), At < 60 && (At = 60, (W === "nw" || W === "n" || W === "ne") && (Et = $ + rt - 60)), st.shiftKey) {
          const yt = Ps(
            W,
            j,
            $,
            at,
            rt,
            vt,
            Et,
            Rt,
            At
          );
          vt = yt.x, Et = yt.y, Rt = yt.w, At = yt.h;
        }
        r.updateNode(t.id, { x: vt, y: Et, w: Rt, h: At });
      }, it = () => {
        K.removeEventListener("pointermove", H), K.removeEventListener("pointerup", it), requestAnimationFrame(() => F.current());
      };
      K.addEventListener("pointermove", H), K.addEventListener("pointerup", it);
    },
    [r, t.id, t.x, t.y, t.w, t.h]
  ), ft = ct(
    (W) => {
      if (!W.altKey) {
        if (g) {
          W.stopPropagation();
          return;
        }
        if (e) {
          X(W);
          return;
        }
        X(W);
      }
    },
    [g, e, X, r, t.id]
  ), Ct = ct(
    (W) => {
      if (W.stopPropagation(), !g) {
        if (t.groupId) {
          const R = [];
          let K = t.groupId;
          for (; K; )
            R.push(K), K = r.groupParent.get(K);
          if (!r.activeGroupId) {
            r.enterGroup(R[R.length - 1]), r.select(t.id);
            return;
          }
          const q = R.indexOf(r.activeGroupId);
          if (q > 0) {
            r.enterGroup(R[q - 1]), r.select(t.id);
            return;
          }
        }
        r.select(t.id), T.current = { x: W.clientX, y: W.clientY }, x(!0);
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
            onDoubleClick: Ct,
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
                onPointerDown: ft,
                onKeyDown: g ? (W) => {
                  W.key === "Escape" && (W.stopPropagation(), x(!1));
                } : void 0,
                style: g ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: b ? /* @__PURE__ */ h(Oi, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ h(uh, { fallback: /* @__PURE__ */ h(Oi, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ h(
                  jc,
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
        xt && ph.map(({ pos: W, top: R, left: K }) => {
          const q = 8 / i;
          return /* @__PURE__ */ h(
            "div",
            {
              onPointerDown: (ut) => et(W, ut),
              style: {
                position: "absolute",
                top: R,
                left: K,
                width: q,
                height: q,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: zn(W, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            W
          );
        }),
        xt && (() => {
          const W = 25 / i, R = 10 / i;
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
                onPointerDown: tt,
                style: {
                  position: "absolute",
                  top: -(W + R / 2),
                  left: "50%",
                  width: R,
                  height: R,
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
const _a = De(mh);
function gh(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    _a,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: Ks,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const bh = {
  type: "content",
  component: gh,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: xh } = Math, Br = xh + 1e-4, Vi = 0.5, Xi = [1, 1];
function Gi(t, e, o, r = (n) => n) {
  return t * r(0.5 - e * (0.5 - o));
}
const { min: ts } = Math;
function tl(t, e, o) {
  let r = ts(1, e / o);
  return ts(1, t + (ts(1, 1 - r) - t) * (r * 0.275));
}
function wh(t) {
  return [-t[0], -t[1]];
}
function $e(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function Yi(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function ko(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function Hs(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function vo(t, e) {
  return [t[0] * e, t[1] * e];
}
function es(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function vh(t, e) {
  return [t[0] / e, t[1] / e];
}
function el(t) {
  return [t[1], -t[0]];
}
function os(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function ji(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function kh(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Sh(t) {
  return Math.hypot(t[0], t[1]);
}
function Zi(t, e) {
  let o = t[0] - e[0], r = t[1] - e[1];
  return o * o + r * r;
}
function ol(t) {
  return vh(t, Sh(t));
}
function Mh(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function _s(t, e, o) {
  let r = Math.sin(o), n = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], l = s * n - i * r, d = s * r + i * n;
  return [l + e[0], d + e[1]];
}
function Ki(t, e, o, r) {
  let n = Math.sin(r), s = Math.cos(r), i = e[0] - o[0], l = e[1] - o[1], d = i * s - l * n, c = i * n + l * s;
  return t[0] = d + o[0], t[1] = c + o[1], t;
}
function qi(t, e, o) {
  return $e(t, vo(ko(e, t), o));
}
function Ch(t, e, o, r) {
  let n = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + n * r, t[1] = e[1] + s * r, t;
}
function rl(t, e, o) {
  return $e(t, vo(e, o));
}
const Se = [0, 0], po = [0, 0], yo = [0, 0];
function Ih(t, e) {
  let o = rl(t, ol(el(ko(t, $e(t, [1, 1])))), -e), r = [], n = 1 / 13;
  for (let s = n; s <= 1; s += n) r.push(_s(o, t, Br * 2 * s));
  return r;
}
function Th(t, e, o) {
  let r = [], n = 1 / o;
  for (let s = n; s <= 1; s += n) r.push(_s(e, t, Br * s));
  return r;
}
function zh(t, e, o) {
  let r = ko(e, o), n = vo(r, 0.5), s = vo(r, 0.51);
  return [ko(t, n), ko(t, s), $e(t, s), $e(t, n)];
}
function Ah(t, e, o, r) {
  let n = [], s = rl(t, e, o), i = 1 / r;
  for (let l = i; l < 1; l += i) n.push(_s(s, t, Br * 3 * l));
  return n;
}
function Eh(t, e, o) {
  return [$e(t, vo(e, o)), $e(t, vo(e, o * 0.99)), ko(t, vo(e, o * 0.99)), ko(t, vo(e, o))];
}
function Ui(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function Ph(t, e, o) {
  return t.slice(0, 10).reduce((r, n) => {
    let s = n.pressure;
    return e && (s = tl(r, n.distance, o)), (r + s) / 2;
  }, t[0].pressure);
}
function Hh(t, e = {}) {
  let { size: o = 16, smoothing: r = 0.5, thinning: n = 0.5, simulatePressure: s = !0, easing: i = (W) => W, start: l = {}, end: d = {}, last: c = !1 } = e, { cap: a = !0, easing: f = (W) => W * (2 - W) } = l, { cap: p = !0, easing: y = (W) => --W * W * W + 1 } = d;
  if (t.length === 0 || o <= 0) return [];
  let u = t[t.length - 1].runningLength, m = Ui(l.taper, o, u), g = Ui(d.taper, o, u), x = (o * r) ** 2, b = [], w = [], T = Ph(t, s, o), k = Gi(o, n, t[t.length - 1].pressure, i), M, C = t[0].vector, E = t[0].point, L = E, F = E, X = L, tt = !1;
  for (let W = 0; W < t.length; W++) {
    let { pressure: R } = t[W], { point: K, vector: q, distance: ut, runningLength: j } = t[W], $ = W === t.length - 1;
    if (!$ && u - j < 3) continue;
    n ? (s && (R = tl(T, ut, o)), k = Gi(o, n, R, i)) : k = o / 2, M === void 0 && (M = k);
    let at = j < m ? f(j / m) : 1, rt = u - j < g ? y((u - j) / g) : 1;
    k = Math.max(0.01, k * Math.min(at, rt));
    let _ = ($ ? t[W] : t[W + 1]).vector, H = $ ? 1 : ji(q, _), it = ji(q, C) < 0 && !tt, dt = H !== null && H < 0;
    if (it || dt) {
      os(Se, C), es(Se, Se, k);
      for (let st = 0; st <= 1; st += 0.07692307692307693) Hs(po, K, Se), Ki(po, po, K, Br * st), F = [po[0], po[1]], b.push(F), Yi(yo, K, Se), Ki(yo, yo, K, Br * -st), X = [yo[0], yo[1]], w.push(X);
      E = F, L = X, dt && (tt = !0);
      continue;
    }
    if (tt = !1, $) {
      os(Se, q), es(Se, Se, k), b.push(ko(K, Se)), w.push($e(K, Se));
      continue;
    }
    Ch(Se, _, q, H), os(Se, Se), es(Se, Se, k), Hs(po, K, Se), F = [po[0], po[1]], (W <= 1 || Zi(E, F) > x) && (b.push(F), E = F), Yi(yo, K, Se), X = [yo[0], yo[1]], (W <= 1 || Zi(L, X) > x) && (w.push(X), L = X), T = R, C = q;
  }
  let et = [t[0].point[0], t[0].point[1]], ft = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : $e(t[0].point, [1, 1]), Ct = [], xt = [];
  if (t.length === 1) {
    if (!(m || g) || c) return Ih(et, M || k);
  } else {
    m || g && t.length === 1 || (a ? Ct.push(...Th(et, w[0], 13)) : Ct.push(...zh(et, b[0], w[0])));
    let W = el(wh(t[t.length - 1].vector));
    g || m && t.length === 1 ? xt.push(ft) : p ? xt.push(...Ah(ft, W, k, 29)) : xt.push(...Eh(ft, W, k));
  }
  return b.concat(xt, w.reverse(), Ct);
}
const Qi = [0, 0];
function Ji(t) {
  return t != null && t >= 0;
}
function Lh(t, e = {}) {
  var p;
  let { streamline: o = 0.5, size: r = 16, last: n = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: y, y: u, pressure: m = Vi }) => [y, u, m]);
  if (i.length === 2) {
    let y = i[1];
    i = i.slice(0, -1);
    for (let u = 1; u < 5; u++) i.push(qi(i[0], y, u / 4));
  }
  i.length === 1 && (i = [...i, [...$e(i[0], Xi), ...i[0].slice(2)]]);
  let l = [{ point: [i[0][0], i[0][1]], pressure: Ji(i[0][2]) ? i[0][2] : 0.25, vector: [...Xi], distance: 0, runningLength: 0 }], d = !1, c = 0, a = l[0], f = i.length - 1;
  for (let y = 1; y < i.length; y++) {
    let u = n && y === f ? [i[y][0], i[y][1]] : qi(a.point, i[y], s);
    if (kh(a.point, u)) continue;
    let m = Mh(u, a.point);
    if (c += m, y < f && !d) {
      if (c < r) continue;
      d = !0;
    }
    Hs(Qi, a.point, u), a = { point: u, pressure: Ji(i[y][2]) ? i[y][2] : Vi, vector: ol(Qi), distance: m, runningLength: c }, l.push(a);
  }
  return l[0].vector = ((p = l[1]) == null ? void 0 : p.vector) || [0, 0], l;
}
function Dh(t, e = {}) {
  return Hh(Lh(t, e), e);
}
var Rh = Dh;
function ti(t, e = {}) {
  if (!Array.isArray(t) || t.length === 0) return "";
  const o = Rh(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return Wh(o);
}
function Wh(t) {
  if (!t.length) return "";
  const e = [], [o, r] = t[0];
  e.push("M", o, r);
  for (let n = 0; n < t.length; n++) {
    const [s, i] = t[n], [l, d] = t[(n + 1) % t.length];
    e.push("Q", s, i, (s + l) / 2, (i + d) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function nl(t, e = 0.5) {
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
function Fh(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = nl(t, e), r = o.length, n = [];
  n.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < r; s++) {
    const [i, l] = o[s], [d, c] = o[(s + 1) % r];
    n.push("Q", i, l, (i + d) / 2, (l + c) / 2);
  }
  return n.push("Z"), n.join(" ");
}
function Bh(t, e, o, r) {
  const n = e[0] - t[0], s = e[1] - t[1], i = r[0] - o[0], l = r[1] - o[1], d = n * l - s * i;
  if (Math.abs(d) < 1e-10) return null;
  const c = ((o[0] - t[0]) * l - (o[1] - t[1]) * i) / d, a = ((o[0] - t[0]) * s - (o[1] - t[1]) * n) / d;
  return c <= 0 || c >= 1 || a <= 0 || a >= 1 ? null : [t[0] + c * n, t[1] + c * s];
}
function Nh(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function $i(t) {
  let e = 0;
  for (let o = 0, r = t.length - 1; o < t.length; r = o++)
    e += (t[r][0] + t[o][0]) * (t[r][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function Oh(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let l = i + 2; l < e - 1; l++) {
      const d = Bh(
        t[i],
        t[i + 1],
        t[l],
        t[l + 1]
      );
      if (!d) continue;
      const c = [d];
      for (let a = i + 1; a <= l; a++)
        c.push(t[a]);
      $i(c) < 100 || o.push({
        pathD: Nh(c),
        points: c.map((a) => [a[0], a[1]])
      });
    }
  if (o.length === 0) return [];
  const r = o.map((i) => $i(i.points)), s = Math.max(...r) * 0.05;
  return o.filter((i, l) => r[l] >= s);
}
function rs(t, e, o) {
  if (t && t.length) {
    const [r, n] = e, s = Math.PI / 180 * o, i = Math.cos(s), l = Math.sin(s);
    for (const d of t) {
      const [c, a] = d;
      d[0] = (c - r) * i - (a - n) * l + r, d[1] = (c - r) * l + (a - n) * i + n;
    }
  }
}
function Vh(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Xh(t, e, o, r = 1) {
  const n = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, l = [0, 0];
  if (n) for (const c of i) rs(c, l, n);
  const d = function(c, a, f) {
    const p = [];
    for (const b of c) {
      const w = [...b];
      Vh(w[0], w[w.length - 1]) || w.push([w[0][0], w[0][1]]), w.length > 2 && p.push(w);
    }
    const y = [];
    a = Math.max(a, 0.1);
    const u = [];
    for (const b of p) for (let w = 0; w < b.length - 1; w++) {
      const T = b[w], k = b[w + 1];
      if (T[1] !== k[1]) {
        const M = Math.min(T[1], k[1]);
        u.push({ ymin: M, ymax: Math.max(T[1], k[1]), x: M === T[1] ? T[0] : k[0], islope: (k[0] - T[0]) / (k[1] - T[1]) });
      }
    }
    if (u.sort((b, w) => b.ymin < w.ymin ? -1 : b.ymin > w.ymin ? 1 : b.x < w.x ? -1 : b.x > w.x ? 1 : b.ymax === w.ymax ? 0 : (b.ymax - w.ymax) / Math.abs(b.ymax - w.ymax)), !u.length) return y;
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
        const T = m[b].edge, k = m[w].edge;
        y.push([[Math.round(T.x), g], [Math.round(k.x), g]]);
      }
      g += f, m.forEach((b) => {
        b.edge.x = b.edge.x + f * b.edge.islope;
      }), x++;
    }
    return y;
  }(i, s, r);
  if (n) {
    for (const c of i) rs(c, l, -n);
    (function(c, a, f) {
      const p = [];
      c.forEach((y) => p.push(...y)), rs(p, a, f);
    })(d, l, -n);
  }
  return d;
}
function Vr(t, e) {
  var o;
  const r = e.hachureAngle + 90;
  let n = e.hachureGap;
  n < 0 && (n = 4 * e.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = n), Xh(t, n, r, s || 1);
}
let ei = class {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const r = Vr(e, o);
    return { type: "fillSketch", ops: this.renderLines(r, o) };
  }
  renderLines(e, o) {
    const r = [];
    for (const n of e) r.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], o));
    return r;
  }
};
function An(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class Gh extends ei {
  fillPolygons(e, o) {
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    const n = Vr(e, Object.assign({}, o, { hachureGap: r })), s = Math.PI / 180 * o.hachureAngle, i = [], l = 0.5 * r * Math.cos(s), d = 0.5 * r * Math.sin(s);
    for (const [c, a] of n) An([c, a]) && i.push([[c[0] - l, c[1] + d], [...a]], [[c[0] + l, c[1] - d], [...a]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
let Yh = class extends ei {
  fillPolygons(e, o) {
    const r = this._fillPolygons(e, o), n = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, n);
    return r.ops = r.ops.concat(s.ops), r;
  }
};
class jh {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = Vr(e, o = Object.assign({}, o, { hachureAngle: 0 }));
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
      const d = An(l), c = d / n, a = Math.ceil(c) - 1, f = d - a * n, p = (l[0][0] + l[1][0]) / 2 - n / 4, y = Math.min(l[0][1], l[1][1]);
      for (let u = 0; u < a; u++) {
        const m = y + f + u * n, g = p - i + 2 * Math.random() * i, x = m - i + 2 * Math.random() * i, b = this.helper.ellipse(g, x, s, s, o);
        r.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: r };
  }
}
let Zh = class {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = Vr(e, o);
    return { type: "fillSketch", ops: this.dashedLine(r, o) };
  }
  dashedLine(e, o) {
    const r = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, n = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const l = An(i), d = Math.floor(l / (r + n)), c = (l + n - d * (r + n)) / 2;
      let a = i[0], f = i[1];
      a[0] > f[0] && (a = i[1], f = i[0]);
      const p = Math.atan((f[1] - a[1]) / (f[0] - a[0]));
      for (let y = 0; y < d; y++) {
        const u = y * (r + n), m = u + r, g = [a[0] + u * Math.cos(p) + c * Math.cos(p), a[1] + u * Math.sin(p) + c * Math.sin(p)], x = [a[0] + m * Math.cos(p) + c * Math.cos(p), a[1] + m * Math.sin(p) + c * Math.sin(p)];
        s.push(...this.helper.doubleLineOps(g[0], g[1], x[0], x[1], o));
      }
    }), s;
  }
}, Kh = class {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, n = o.zigzagOffset < 0 ? r : o.zigzagOffset, s = Vr(e, o = Object.assign({}, o, { hachureGap: r + n }));
    return { type: "fillSketch", ops: this.zigzagLines(s, n, o) };
  }
  zigzagLines(e, o, r) {
    const n = [];
    return e.forEach((s) => {
      const i = An(s), l = Math.round(i / (2 * o));
      let d = s[0], c = s[1];
      d[0] > c[0] && (d = s[1], c = s[0]);
      const a = Math.atan((c[1] - d[1]) / (c[0] - d[0]));
      for (let f = 0; f < l; f++) {
        const p = 2 * f * o, y = 2 * (f + 1) * o, u = Math.sqrt(2 * Math.pow(o, 2)), m = [d[0] + p * Math.cos(a), d[1] + p * Math.sin(a)], g = [d[0] + y * Math.cos(a), d[1] + y * Math.sin(a)], x = [m[0] + u * Math.cos(a + Math.PI / 4), m[1] + u * Math.sin(a + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(m[0], m[1], x[0], x[1], r), ...this.helper.doubleLineOps(x[0], x[1], g[0], g[1], r));
      }
    }), n;
  }
};
const Ae = {};
let qh = class {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
};
const Uh = 0, ns = 1, _i = 2, nn = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function ss(t, e) {
  return t.type === e;
}
function oi(t) {
  const e = [], o = function(i) {
    const l = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) l[l.length] = { type: Uh, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      l[l.length] = { type: ns, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return l[l.length] = { type: _i, text: "" }, l;
  }(t);
  let r = "BOD", n = 0, s = o[n];
  for (; !ss(s, _i); ) {
    let i = 0;
    const l = [];
    if (r === "BOD") {
      if (s.text !== "M" && s.text !== "m") return oi("M0,0" + t);
      n++, i = nn[s.text], r = s.text;
    } else ss(s, ns) ? i = nn[r] : (n++, i = nn[s.text], r = s.text);
    if (!(n + i < o.length)) throw new Error("Path data ended short");
    for (let d = n; d < n + i; d++) {
      const c = o[d];
      if (!ss(c, ns)) throw new Error("Param not a number: " + r + "," + c.text);
      l[l.length] = +c.text;
    }
    if (typeof nn[r] != "number") throw new Error("Bad segment: " + r);
    {
      const d = { key: r, data: l };
      e.push(d), n += i, s = o[n], r === "M" && (r = "L"), r === "m" && (r = "l");
    }
  }
  return e;
}
function sl(t) {
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
function il(t) {
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
        let f = 0, p = 0;
        o === "C" || o === "S" ? (f = r + (r - l), p = n + (n - d)) : (f = r, p = n), e.push({ key: "C", data: [f, p, ...a] }), l = a[0], d = a[1], r = a[2], n = a[3];
        break;
      }
      case "T": {
        const [f, p] = a;
        let y = 0, u = 0;
        o === "Q" || o === "T" ? (y = r + (r - l), u = n + (n - d)) : (y = r, u = n);
        const m = r + 2 * (y - r) / 3, g = n + 2 * (u - n) / 3, x = f + 2 * (y - f) / 3, b = p + 2 * (u - p) / 3;
        e.push({ key: "C", data: [m, g, x, b, f, p] }), l = y, d = u, r = f, n = p;
        break;
      }
      case "Q": {
        const [f, p, y, u] = a, m = r + 2 * (f - r) / 3, g = n + 2 * (p - n) / 3, x = y + 2 * (f - y) / 3, b = u + 2 * (p - u) / 3;
        e.push({ key: "C", data: [m, g, x, b, y, u] }), l = f, d = p, r = y, n = u;
        break;
      }
      case "A": {
        const f = Math.abs(a[0]), p = Math.abs(a[1]), y = a[2], u = a[3], m = a[4], g = a[5], x = a[6];
        f === 0 || p === 0 ? (e.push({ key: "C", data: [r, n, g, x, g, x] }), r = g, n = x) : (r !== g || n !== x) && (al(r, n, g, x, f, p, y, u, m).forEach(function(b) {
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
function Ar(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function al(t, e, o, r, n, s, i, l, d, c) {
  const a = (f = i, Math.PI * f / 180);
  var f;
  let p = [], y = 0, u = 0, m = 0, g = 0;
  if (c) [y, u, m, g] = c;
  else {
    [t, e] = Ar(t, e, -a), [o, r] = Ar(o, r, -a);
    const et = (t - o) / 2, ft = (e - r) / 2;
    let Ct = et * et / (n * n) + ft * ft / (s * s);
    Ct > 1 && (Ct = Math.sqrt(Ct), n *= Ct, s *= Ct);
    const xt = n * n, W = s * s, R = xt * W - xt * ft * ft - W * et * et, K = xt * ft * ft + W * et * et, q = (l === d ? -1 : 1) * Math.sqrt(Math.abs(R / K));
    m = q * n * ft / s + (t + o) / 2, g = q * -s * et / n + (e + r) / 2, y = Math.asin(parseFloat(((e - g) / s).toFixed(9))), u = Math.asin(parseFloat(((r - g) / s).toFixed(9))), t < m && (y = Math.PI - y), o < m && (u = Math.PI - u), y < 0 && (y = 2 * Math.PI + y), u < 0 && (u = 2 * Math.PI + u), d && y > u && (y -= 2 * Math.PI), !d && u > y && (u -= 2 * Math.PI);
  }
  let x = u - y;
  if (Math.abs(x) > 120 * Math.PI / 180) {
    const et = u, ft = o, Ct = r;
    u = d && u > y ? y + 120 * Math.PI / 180 * 1 : y + 120 * Math.PI / 180 * -1, p = al(o = m + n * Math.cos(u), r = g + s * Math.sin(u), ft, Ct, n, s, i, 0, d, [u, et, m, g]);
  }
  x = u - y;
  const b = Math.cos(y), w = Math.sin(y), T = Math.cos(u), k = Math.sin(u), M = Math.tan(x / 4), C = 4 / 3 * n * M, E = 4 / 3 * s * M, L = [t, e], F = [t + C * w, e - E * b], X = [o + C * k, r - E * T], tt = [o, r];
  if (F[0] = 2 * L[0] - F[0], F[1] = 2 * L[1] - F[1], c) return [F, X, tt].concat(p);
  {
    p = [F, X, tt].concat(p);
    const et = [];
    for (let ft = 0; ft < p.length; ft += 3) {
      const Ct = Ar(p[ft][0], p[ft][1], a), xt = Ar(p[ft + 1][0], p[ft + 1][1], a), W = Ar(p[ft + 2][0], p[ft + 2][1], a);
      et.push([Ct[0], Ct[1], xt[0], xt[1], W[0], W[1]]);
    }
    return et;
  }
}
const Qh = { randOffset: function(t, e) {
  return jt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return wn(t, e, o);
}, ellipse: function(t, e, o, r, n) {
  const s = cl(o, r, n);
  return Ls(t, e, n, s).opset;
}, doubleLineOps: function(t, e, o, r, n) {
  return To(t, e, o, r, n, !0);
} };
function ll(t, e, o, r, n) {
  return { type: "path", ops: To(t, e, o, r, n) };
}
function mn(t, e, o) {
  const r = (t || []).length;
  if (r > 2) {
    const n = [];
    for (let s = 0; s < r - 1; s++) n.push(...To(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && n.push(...To(t[r - 1][0], t[r - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: n };
  }
  return r === 2 ? ll(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function Jh(t, e, o, r, n) {
  return function(s, i) {
    return mn(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + r], [t, e + r]], n);
}
function ta(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, r = sn(o[0], 1 * (1 + 0.2 * e.roughness), e), n = e.disableMultiStroke ? [] : sn(o[0], 1.5 * (1 + 0.22 * e.roughness), ra(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const l = sn(i, 1 * (1 + 0.2 * e.roughness), e), d = e.disableMultiStroke ? [] : sn(i, 1.5 * (1 + 0.22 * e.roughness), ra(e));
        for (const c of l) c.op !== "move" && r.push(c);
        for (const c of d) c.op !== "move" && n.push(c);
      }
    }
    return { type: "path", ops: r.concat(n) };
  }
  return { type: "path", ops: [] };
}
function cl(t, e, o) {
  const r = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), n = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * r)), s = 2 * Math.PI / n;
  let i = Math.abs(t / 2), l = Math.abs(e / 2);
  const d = 1 - o.curveFitting;
  return i += jt(i * d, o), l += jt(l * d, o), { increment: s, rx: i, ry: l };
}
function Ls(t, e, o, r) {
  const [n, s] = na(r.increment, t, e, r.rx, r.ry, 1, r.increment * wn(0.1, wn(0.4, 1, o), o), o);
  let i = vn(n, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [l] = na(r.increment, t, e, r.rx, r.ry, 1.5, 0, o), d = vn(l, null, o);
    i = i.concat(d);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function ea(t, e, o, r, n, s, i, l, d) {
  const c = t, a = e;
  let f = Math.abs(o / 2), p = Math.abs(r / 2);
  f += jt(0.01 * f, d), p += jt(0.01 * p, d);
  let y = n, u = s;
  for (; y < 0; ) y += 2 * Math.PI, u += 2 * Math.PI;
  u - y > 2 * Math.PI && (y = 0, u = 2 * Math.PI);
  const m = 2 * Math.PI / d.curveStepCount, g = Math.min(m / 2, (u - y) / 2), x = sa(g, c, a, f, p, y, u, 1, d);
  if (!d.disableMultiStroke) {
    const b = sa(g, c, a, f, p, y, u, 1.5, d);
    x.push(...b);
  }
  return i && (l ? x.push(...To(c, a, c + f * Math.cos(y), a + p * Math.sin(y), d), ...To(c, a, c + f * Math.cos(u), a + p * Math.sin(u), d)) : x.push({ op: "lineTo", data: [c, a] }, { op: "lineTo", data: [c + f * Math.cos(y), a + p * Math.sin(y)] })), { type: "path", ops: x };
}
function oa(t, e) {
  const o = il(sl(oi(t))), r = [];
  let n = [0, 0], s = [0, 0];
  for (const { key: i, data: l } of o) switch (i) {
    case "M":
      s = [l[0], l[1]], n = [l[0], l[1]];
      break;
    case "L":
      r.push(...To(s[0], s[1], l[0], l[1], e)), s = [l[0], l[1]];
      break;
    case "C": {
      const [d, c, a, f, p, y] = l;
      r.push(...$h(d, c, a, f, p, y, s, e)), s = [p, y];
      break;
    }
    case "Z":
      r.push(...To(s[0], s[1], n[0], n[1], e)), s = [n[0], n[1]];
  }
  return { type: "path", ops: r };
}
function is(t, e) {
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
function nr(t, e) {
  return function(o, r) {
    let n = o.fillStyle || "hachure";
    if (!Ae[n]) switch (n) {
      case "zigzag":
        Ae[n] || (Ae[n] = new Gh(r));
        break;
      case "cross-hatch":
        Ae[n] || (Ae[n] = new Yh(r));
        break;
      case "dots":
        Ae[n] || (Ae[n] = new jh(r));
        break;
      case "dashed":
        Ae[n] || (Ae[n] = new Zh(r));
        break;
      case "zigzag-line":
        Ae[n] || (Ae[n] = new Kh(r));
        break;
      default:
        n = "hachure", Ae[n] || (Ae[n] = new ei(r));
    }
    return Ae[n];
  }(e, Qh).fillPolygons(t, e);
}
function ra(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function dl(t) {
  return t.randomizer || (t.randomizer = new qh(t.seed || 0)), t.randomizer.next();
}
function wn(t, e, o, r = 1) {
  return o.roughness * r * (dl(o) * (e - t) + t);
}
function jt(t, e, o = 1) {
  return wn(-t, t, e, o);
}
function To(t, e, o, r, n, s = !1) {
  const i = s ? n.disableMultiStrokeFill : n.disableMultiStroke, l = Ds(t, e, o, r, n, !0, !1);
  if (i) return l;
  const d = Ds(t, e, o, r, n, !0, !0);
  return l.concat(d);
}
function Ds(t, e, o, r, n, s, i) {
  const l = Math.pow(t - o, 2) + Math.pow(e - r, 2), d = Math.sqrt(l);
  let c = 1;
  c = d < 200 ? 1 : d > 500 ? 0.4 : -16668e-7 * d + 1.233334;
  let a = n.maxRandomnessOffset || 0;
  a * a * 100 > l && (a = d / 10);
  const f = a / 2, p = 0.2 + 0.2 * dl(n);
  let y = n.bowing * n.maxRandomnessOffset * (r - e) / 200, u = n.bowing * n.maxRandomnessOffset * (t - o) / 200;
  y = jt(y, n, c), u = jt(u, n, c);
  const m = [], g = () => jt(f, n, c), x = () => jt(a, n, c), b = n.preserveVertices;
  return i ? m.push({ op: "move", data: [t + (b ? 0 : g()), e + (b ? 0 : g())] }) : m.push({ op: "move", data: [t + (b ? 0 : jt(a, n, c)), e + (b ? 0 : jt(a, n, c))] }), i ? m.push({ op: "bcurveTo", data: [y + t + (o - t) * p + g(), u + e + (r - e) * p + g(), y + t + 2 * (o - t) * p + g(), u + e + 2 * (r - e) * p + g(), o + (b ? 0 : g()), r + (b ? 0 : g())] }) : m.push({ op: "bcurveTo", data: [y + t + (o - t) * p + x(), u + e + (r - e) * p + x(), y + t + 2 * (o - t) * p + x(), u + e + 2 * (r - e) * p + x(), o + (b ? 0 : x()), r + (b ? 0 : x())] }), m;
}
function sn(t, e, o) {
  if (!t.length) return [];
  const r = [];
  r.push([t[0][0] + jt(e, o), t[0][1] + jt(e, o)]), r.push([t[0][0] + jt(e, o), t[0][1] + jt(e, o)]);
  for (let n = 1; n < t.length; n++) r.push([t[n][0] + jt(e, o), t[n][1] + jt(e, o)]), n === t.length - 1 && r.push([t[n][0] + jt(e, o), t[n][1] + jt(e, o)]);
  return vn(r, null, o);
}
function vn(t, e, o) {
  const r = t.length, n = [];
  if (r > 3) {
    const s = [], i = 1 - o.curveTightness;
    n.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let l = 1; l + 2 < r; l++) {
      const d = t[l];
      s[0] = [d[0], d[1]], s[1] = [d[0] + (i * t[l + 1][0] - i * t[l - 1][0]) / 6, d[1] + (i * t[l + 1][1] - i * t[l - 1][1]) / 6], s[2] = [t[l + 1][0] + (i * t[l][0] - i * t[l + 2][0]) / 6, t[l + 1][1] + (i * t[l][1] - i * t[l + 2][1]) / 6], s[3] = [t[l + 1][0], t[l + 1][1]], n.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else r === 3 ? (n.push({ op: "move", data: [t[1][0], t[1][1]] }), n.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : r === 2 && n.push(...Ds(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return n;
}
function na(t, e, o, r, n, s, i, l) {
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
    for (let p = a; p < f; p += t) {
      const y = [jt(s, l) + e + r * Math.cos(p), jt(s, l) + o + n * Math.sin(p)];
      d.push(y), c.push(y);
    }
    c.push([jt(s, l) + e + r * Math.cos(a + 2 * Math.PI + 0.5 * i), jt(s, l) + o + n * Math.sin(a + 2 * Math.PI + 0.5 * i)]), c.push([jt(s, l) + e + 0.98 * r * Math.cos(a + i), jt(s, l) + o + 0.98 * n * Math.sin(a + i)]), c.push([jt(s, l) + e + 0.9 * r * Math.cos(a + 0.5 * i), jt(s, l) + o + 0.9 * n * Math.sin(a + 0.5 * i)]);
  }
  return [c, d];
}
function sa(t, e, o, r, n, s, i, l, d) {
  const c = s + jt(0.1, d), a = [];
  a.push([jt(l, d) + e + 0.9 * r * Math.cos(c - t), jt(l, d) + o + 0.9 * n * Math.sin(c - t)]);
  for (let f = c; f <= i; f += t) a.push([jt(l, d) + e + r * Math.cos(f), jt(l, d) + o + n * Math.sin(f)]);
  return a.push([e + r * Math.cos(i), o + n * Math.sin(i)]), a.push([e + r * Math.cos(i), o + n * Math.sin(i)]), vn(a, null, d);
}
function $h(t, e, o, r, n, s, i, l) {
  const d = [], c = [l.maxRandomnessOffset || 1, (l.maxRandomnessOffset || 1) + 0.3];
  let a = [0, 0];
  const f = l.disableMultiStroke ? 1 : 2, p = l.preserveVertices;
  for (let y = 0; y < f; y++) y === 0 ? d.push({ op: "move", data: [i[0], i[1]] }) : d.push({ op: "move", data: [i[0] + (p ? 0 : jt(c[0], l)), i[1] + (p ? 0 : jt(c[0], l))] }), a = p ? [n, s] : [n + jt(c[y], l), s + jt(c[y], l)], d.push({ op: "bcurveTo", data: [t + jt(c[y], l), e + jt(c[y], l), o + jt(c[y], l), r + jt(c[y], l), a[0], a[1]] });
  return d;
}
function Er(t) {
  return [...t];
}
function ia(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const r = [];
  if (o === 3) r.push(Er(t[0]), Er(t[1]), Er(t[2]), Er(t[2]));
  else {
    const n = [];
    n.push(t[0], t[0]);
    for (let l = 1; l < t.length; l++) n.push(t[l]), l === t.length - 1 && n.push(t[l]);
    const s = [], i = 1 - e;
    r.push(Er(n[0]));
    for (let l = 1; l + 2 < n.length; l++) {
      const d = n[l];
      s[0] = [d[0], d[1]], s[1] = [d[0] + (i * n[l + 1][0] - i * n[l - 1][0]) / 6, d[1] + (i * n[l + 1][1] - i * n[l - 1][1]) / 6], s[2] = [n[l + 1][0] + (i * n[l][0] - i * n[l + 2][0]) / 6, n[l + 1][1] + (i * n[l][1] - i * n[l + 2][1]) / 6], s[3] = [n[l + 1][0], n[l + 1][1]], r.push(s[1], s[2], s[3]);
    }
  }
  return r;
}
function gn(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function _h(t, e, o) {
  const r = gn(e, o);
  if (r === 0) return gn(t, e);
  let n = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / r;
  return n = Math.max(0, Math.min(1, n)), gn(t, No(e, o, n));
}
function No(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function Rs(t, e, o, r) {
  const n = r || [];
  if (function(l, d) {
    const c = l[d + 0], a = l[d + 1], f = l[d + 2], p = l[d + 3];
    let y = 3 * a[0] - 2 * c[0] - p[0];
    y *= y;
    let u = 3 * a[1] - 2 * c[1] - p[1];
    u *= u;
    let m = 3 * f[0] - 2 * p[0] - c[0];
    m *= m;
    let g = 3 * f[1] - 2 * p[1] - c[1];
    return g *= g, y < m && (y = m), u < g && (u = g), y + u;
  }(t, e) < o) {
    const l = t[e + 0];
    n.length ? (s = n[n.length - 1], i = l, Math.sqrt(gn(s, i)) > 1 && n.push(l)) : n.push(l), n.push(t[e + 3]);
  } else {
    const d = t[e + 0], c = t[e + 1], a = t[e + 2], f = t[e + 3], p = No(d, c, 0.5), y = No(c, a, 0.5), u = No(a, f, 0.5), m = No(p, y, 0.5), g = No(y, u, 0.5), x = No(m, g, 0.5);
    Rs([d, p, m, x], 0, o, n), Rs([x, g, u, f], 0, o, n);
  }
  var s, i;
  return n;
}
function tu(t, e) {
  return kn(t, 0, t.length, e);
}
function kn(t, e, o, r, n) {
  const s = n || [], i = t[e], l = t[o - 1];
  let d = 0, c = 1;
  for (let a = e + 1; a < o - 1; ++a) {
    const f = _h(t[a], i, l);
    f > d && (d = f, c = a);
  }
  return Math.sqrt(d) > r ? (kn(t, e, c + 1, r, s), kn(t, c, o, r, s)) : (s.length || s.push(i), s.push(l)), s;
}
function as(t, e = 0.15, o) {
  const r = [], n = (t.length - 1) / 3;
  for (let s = 0; s < n; s++)
    Rs(t, 3 * s, e, r);
  return o && o > 0 ? kn(r, 0, r.length, o) : r;
}
const Re = "none";
class Sn {
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
    return this._d("line", [ll(e, o, r, n, i)], i);
  }
  rectangle(e, o, r, n, s) {
    const i = this._o(s), l = [], d = Jh(e, o, r, n, i);
    if (i.fill) {
      const c = [[e, o], [e + r, o], [e + r, o + n], [e, o + n]];
      i.fillStyle === "solid" ? l.push(is([c], i)) : l.push(nr([c], i));
    }
    return i.stroke !== Re && l.push(d), this._d("rectangle", l, i);
  }
  ellipse(e, o, r, n, s) {
    const i = this._o(s), l = [], d = cl(r, n, i), c = Ls(e, o, i, d);
    if (i.fill) if (i.fillStyle === "solid") {
      const a = Ls(e, o, i, d).opset;
      a.type = "fillPath", l.push(a);
    } else l.push(nr([c.estimatedPoints], i));
    return i.stroke !== Re && l.push(c.opset), this._d("ellipse", l, i);
  }
  circle(e, o, r, n) {
    const s = this.ellipse(e, o, r, r, n);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const r = this._o(o);
    return this._d("linearPath", [mn(e, !1, r)], r);
  }
  arc(e, o, r, n, s, i, l = !1, d) {
    const c = this._o(d), a = [], f = ea(e, o, r, n, s, i, l, !0, c);
    if (l && c.fill) if (c.fillStyle === "solid") {
      const p = Object.assign({}, c);
      p.disableMultiStroke = !0;
      const y = ea(e, o, r, n, s, i, !0, !1, p);
      y.type = "fillPath", a.push(y);
    } else a.push(function(p, y, u, m, g, x, b) {
      const w = p, T = y;
      let k = Math.abs(u / 2), M = Math.abs(m / 2);
      k += jt(0.01 * k, b), M += jt(0.01 * M, b);
      let C = g, E = x;
      for (; C < 0; ) C += 2 * Math.PI, E += 2 * Math.PI;
      E - C > 2 * Math.PI && (C = 0, E = 2 * Math.PI);
      const L = (E - C) / b.curveStepCount, F = [];
      for (let X = C; X <= E; X += L) F.push([w + k * Math.cos(X), T + M * Math.sin(X)]);
      return F.push([w + k * Math.cos(E), T + M * Math.sin(E)]), F.push([w, T]), nr([F], b);
    }(e, o, r, n, s, i, c));
    return c.stroke !== Re && a.push(f), this._d("arc", a, c);
  }
  curve(e, o) {
    const r = this._o(o), n = [], s = ta(e, r);
    if (r.fill && r.fill !== Re) if (r.fillStyle === "solid") {
      const i = ta(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], l = e;
      if (l.length) {
        const d = typeof l[0][0] == "number" ? [l] : l;
        for (const c of d) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...as(ia([c[0], c[0], c[1], c[2]]), 10, (1 + r.roughness) / 2)) : i.push(...as(ia(c), 10, (1 + r.roughness) / 2));
      }
      i.length && n.push(nr([i], r));
    }
    return r.stroke !== Re && n.push(s), this._d("curve", n, r);
  }
  polygon(e, o) {
    const r = this._o(o), n = [], s = mn(e, !0, r);
    return r.fill && (r.fillStyle === "solid" ? n.push(is([e], r)) : n.push(nr([e], r))), r.stroke !== Re && n.push(s), this._d("polygon", n, r);
  }
  path(e, o) {
    const r = this._o(o), n = [];
    if (!e) return this._d("path", n, r);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = r.fill && r.fill !== "transparent" && r.fill !== Re, i = r.stroke !== Re, l = !!(r.simplification && r.simplification < 1), d = function(a, f, p) {
      const y = il(sl(oi(a))), u = [];
      let m = [], g = [0, 0], x = [];
      const b = () => {
        x.length >= 4 && m.push(...as(x, f)), x = [];
      }, w = () => {
        b(), m.length && (u.push(m), m = []);
      };
      for (const { key: k, data: M } of y) switch (k) {
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
      if (w(), !p) return u;
      const T = [];
      for (const k of u) {
        const M = tu(k, p);
        M.length && T.push(M);
      }
      return T;
    }(e, 1, l ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2), c = oa(e, r);
    if (s) if (r.fillStyle === "solid") if (d.length === 1) {
      const a = oa(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(a.ops) });
    } else n.push(is(d, r));
    else n.push(nr(d, r));
    return i && (l ? d.forEach((a) => {
      n.push(mn(a, !1, r));
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
class eu {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new Sn(o);
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
const an = "http://www.w3.org/2000/svg";
class ou {
  constructor(e, o) {
    this.svg = e, this.gen = new Sn(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, s = n.createElementNS(an, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const l of o) {
      let d = null;
      switch (l.type) {
        case "path":
          d = n.createElementNS(an, "path"), d.setAttribute("d", this.opsToPath(l, i)), d.setAttribute("stroke", r.stroke), d.setAttribute("stroke-width", r.strokeWidth + ""), d.setAttribute("fill", "none"), r.strokeLineDash && d.setAttribute("stroke-dasharray", r.strokeLineDash.join(" ").trim()), r.strokeLineDashOffset && d.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
          break;
        case "fillPath":
          d = n.createElementNS(an, "path"), d.setAttribute("d", this.opsToPath(l, i)), d.setAttribute("stroke", "none"), d.setAttribute("stroke-width", "0"), d.setAttribute("fill", r.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || d.setAttribute("fill-rule", "evenodd");
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
    const s = e.createElementNS(an, "path");
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
var ru = { canvas: (t, e) => new eu(t, e), svg: (t, e) => new ou(t, e), generator: (t) => new Sn(t), newSeed: () => Sn.newSeed() };
const io = ru.generator();
function nu(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t.charCodeAt(o);
    e = (e << 5) - e + r, e |= 0;
  }
  return Math.abs(e);
}
function zo(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? nu(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function Ao(t) {
  var r;
  const e = t.options, o = (r = e == null ? void 0 : e.strokeLineDash) != null && r.length ? e.strokeLineDash.join(" ") : void 0;
  return io.toPaths(t).map((n) => ({
    d: n.d,
    stroke: n.stroke,
    strokeWidth: n.strokeWidth,
    fill: n.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: n.stroke !== "none" && n.strokeWidth > 0 ? o : void 0
  }));
}
function Qo(t, e) {
  return Math.min(t, e) * 0.25;
}
function su(t, e, o, r, n) {
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
function Nr(t, e, o, r, n, s) {
  if (s) {
    const i = Qo(o, r);
    return Ao(io.path(su(t, e, o, r, i), zo(n)));
  }
  return Ao(io.rectangle(t, e, o, r, zo(n)));
}
function En(t, e, o, r, n) {
  return Ao(io.ellipse(t, e, o, r, zo(n)));
}
function iu(t, e, o, r, n) {
  const s = t + o / 2, i = e + r / 2, l = [s, e], d = [t + o, i], c = [s, e + r], a = [t, i], f = Math.hypot(o / 2, r / 2), p = Math.min(n, f / 2) / f, y = (M, C, E) => [
    M[0] + E * (C[0] - M[0]),
    M[1] + E * (C[1] - M[1])
  ], u = y(a, l, 1 - p), m = y(l, d, p), g = y(l, d, 1 - p), x = y(d, c, p), b = y(d, c, 1 - p), w = y(c, a, p), T = y(c, a, 1 - p), k = y(a, l, p);
  return [
    `M${m[0]},${m[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${d[0]},${d[1]} ${x[0]},${x[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${c[0]},${c[1]} ${w[0]},${w[1]}`,
    `L${T[0]},${T[1]}`,
    `Q${a[0]},${a[1]} ${k[0]},${k[1]}`,
    `L${u[0]},${u[1]}`,
    `Q${l[0]},${l[1]} ${m[0]},${m[1]}`,
    "Z"
  ].join(" ");
}
function Pn(t, e, o, r, n, s) {
  if (s) {
    const l = Qo(o, r);
    return Ao(io.path(iu(t, e, o, r, l), zo(n)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + r / 2],
    [t + o / 2, e + r],
    [t, e + r / 2]
  ];
  return Ao(io.polygon(i, zo(n)));
}
function Xo(t, e, o, r, n) {
  return Ao(io.line(t, e, o, r, zo(n)));
}
function Hn(t, e, o, r, n) {
  const s = Xo(t, e, o, r, n), i = Math.atan2(r - e, o - t), l = Math.max(12, n.strokeWidth * 4), d = Math.PI / 6, c = o - l * Math.cos(i - d), a = r - l * Math.sin(i - d), f = o - l * Math.cos(i + d), p = r - l * Math.sin(i + d), y = Xo(o, r, c, a, n), u = Xo(o, r, f, p, n);
  return [...s, ...y, ...u];
}
function aa(t, e) {
  const o = {
    ...zo(e),
    stroke: "none"
  };
  return Ao(io.polygon(t, o));
}
function ls(t, e) {
  return Ao(io.path(t, zo(e)));
}
function ao(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function au(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function lu({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ h(du, { node: o }) : /* @__PURE__ */ h(cu, { node: o });
  }
  return /* @__PURE__ */ h(hu, { node: t, editingLabel: e });
}
const Mn = De(lu), cu = De(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", r = ao(e.data.strokeStyle), n = Kt(
    () => o ? null : ti(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Kt(() => {
    const y = e.data.points;
    if (!y || y.length === 0) return "";
    if (y.length === 1) return `M${y[0][0]},${y[0][1]}L${y[0][0]},${y[0][1]}`;
    const u = [`M${y[0][0]},${y[0][1]}`];
    for (let m = 1; m < y.length; m++)
      u.push(`L${y[m][0]},${y[m][1]}`);
    return u.join("");
  }, [e.data.points]), i = Kt(() => {
    if (!o) return null;
    const y = e.data.points;
    if (!y || y.length < 2) return "";
    const u = ["M", y[0][0], y[0][1]];
    for (let g = 1; g < y.length; g++) {
      const [x, b] = y[g], [w, T] = y[g - 1];
      u.push("Q", w, T, (w + x) / 2, (T + b) / 2);
    }
    const m = y[y.length - 1];
    return u.push("L", m[0], m[1]), u.join(" ");
  }, [e.data.points, o]), l = Kt(() => {
    if (!e.data.fill || !e.data.points || e.data.points.length < 3) return null;
    const y = e.data.points.map((C) => [C[0], C[1]]), u = nl(y), m = u[0], g = u[u.length - 1], x = Math.hypot(m[0] - g[0], m[1] - g[1]);
    let b = 0;
    for (let C = 1; C < u.length; C++)
      b += Math.hypot(u[C][0] - u[C - 1][0], u[C][1] - u[C - 1][1]);
    const w = b >= 1 && x <= Math.max(e.data.strokeWidth * 4, 20) && x <= b * 0.1, T = e.data.fillStyle || "solid";
    if (w) {
      const C = Fh(u, 0);
      return T === "solid" ? { kind: "solid", d: C, fill: e.data.fill } : { kind: "rough", paths: aa(u, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: T,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const k = Oh(u);
    if (k.length === 0) return null;
    if (T === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: k
      };
    const M = [];
    for (const { points: C } of k)
      C.length >= 3 && M.push(
        ...aa(C, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: T,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: M, regions: k };
  }, [e.data.fill, e.data.fillStyle, e.data.points, e.data.strokeWidth]), d = e.h === "auto" ? 0 : e.h, c = Number.isFinite(e.w) ? e.w : 0, a = Number.isFinite(d) ? d : 0, p = (Number.isFinite(e.data.strokeWidth) ? e.data.strokeWidth : 0) * 4;
  return /* @__PURE__ */ h(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - p,
        top: e.y - p,
        width: c + p * 2,
        height: a + p * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ h(
        "svg",
        {
          width: c + p * 2,
          height: a + p * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ S("g", { transform: `translate(${p}, ${p})`, opacity: e.data.opacity ?? 1, children: [
            (l == null ? void 0 : l.kind) === "solid" && (l.regions ? l.regions.map((y, u) => /* @__PURE__ */ h(
              "path",
              {
                d: y.pathD,
                fill: l.fill,
                stroke: "none"
              },
              u
            )) : /* @__PURE__ */ h("path", { d: l.d, fill: l.fill, stroke: "none" })),
            (l == null ? void 0 : l.kind) === "rough" && l.paths.map((y, u) => /* @__PURE__ */ h(
              "path",
              {
                d: y.d,
                stroke: y.stroke,
                strokeWidth: y.strokeWidth,
                fill: y.fill,
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
                strokeDasharray: r == null ? void 0 : r.map((y) => y * Math.max(e.data.strokeWidth, 1)).join(" "),
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
}), du = De(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, r = Number.isFinite(e.w) ? e.w : 0, n = Number.isFinite(o) ? o : 0, i = (Number.isFinite(e.data.strokeWidth) ? e.data.strokeWidth : 0) * 2, l = Kt(() => {
    const a = e.data.points;
    if (!a || a.length === 0) return "";
    const f = [`M${a[0][0]},${a[0][1]}`];
    for (let p = 1; p < a.length; p++)
      f.push(`L${a[p][0]},${a[p][1]}`);
    return f.push("Z"), f.join("");
  }, [e.data.points]), d = ao(e.data.strokeStyle), c = d == null ? void 0 : d.map((a) => a * Math.max(e.data.strokeWidth, 1)).join(" ");
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
}), hu = De(function({ node: e, editingLabel: o }) {
  var w, T, k, M;
  const r = e.h === "auto" ? 100 : e.h, n = Number.isFinite(e.w) ? e.w : 0, s = Number.isFinite(r) ? r : 100, l = (Number.isFinite(e.data.strokeWidth) ? e.data.strokeWidth : 0) * 2, d = ao(e.data.strokeStyle), c = ((w = e.data.startPoint) == null ? void 0 : w[0]) ?? 0, a = ((T = e.data.startPoint) == null ? void 0 : T[1]) ?? s / 2, f = ((k = e.data.endPoint) == null ? void 0 : k[0]) ?? n, p = ((M = e.data.endPoint) == null ? void 0 : M[1]) ?? s / 2, y = Kt(() => {
    if (e.data.roughness === 0) return null;
    const C = {
      stroke: e.data.stroke,
      fill: e.data.fill,
      fillStyle: e.data.fillStyle,
      roughness: e.data.roughness,
      strokeWidth: e.data.strokeWidth,
      strokeLineDash: d,
      seed: e.id
    }, E = e.data.edgeStyle === "round";
    switch (e.data.shape) {
      case "rect":
        return Nr(0, 0, n, s, C, E);
      case "ellipse":
        return En(n / 2, s / 2, n, s, C);
      case "diamond":
        return Pn(0, 0, n, s, C, E);
      case "line":
        return Xo(c, a, f, p, C);
      case "arrow":
        return Hn(c, a, f, p, C);
      default:
        return null;
    }
  }, [e, d, c, a, f, p, n, s]), u = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, m = e.data.opacity ?? 1, g = e.data.shape === "line" || e.data.shape === "arrow", x = e.data.label, b = e.data.labelFontSize ?? 14;
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
                pu,
                {
                  shape: e.data.shape,
                  w: n,
                  h: s,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              y ? y.map((C, E) => u && C.fill && C.fill !== "none" ? null : /* @__PURE__ */ h(
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
                E
              )) : /* @__PURE__ */ h(
                uu,
                {
                  shape: e.data.shape,
                  w: n,
                  h: s,
                  x1: c,
                  y1: a,
                  x2: f,
                  y2: p,
                  stroke: e.data.stroke,
                  fill: e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  dashArray: d,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              /* @__PURE__ */ h(
                fu,
                {
                  shape: e.data.shape,
                  w: n,
                  h: s,
                  x1: c,
                  y1: a,
                  x2: f,
                  y2: p,
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
                  fontFamily: Co(e.data.labelFontFamily ?? Mo),
                  fontSize: b,
                  color: e.data.fill && e.data.fillStyle === "solid" ? au(e.data.fill) : e.data.stroke,
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
function ri(t, e) {
  const o = Qo(t, e), r = t / 2, n = e / 2, s = [r, 0], i = [t, n], l = [r, e], d = [0, n], c = Math.hypot(t / 2, e / 2), a = Math.min(o, c / 2) / c, f = (T, k, M) => [
    T[0] + M * (k[0] - T[0]),
    T[1] + M * (k[1] - T[1])
  ], p = f(s, i, a), y = f(s, i, 1 - a), u = f(i, l, a), m = f(i, l, 1 - a), g = f(l, d, a), x = f(l, d, 1 - a), b = f(d, s, a), w = f(d, s, 1 - a);
  return [
    `M${p[0]},${p[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${i[0]},${i[1]} ${u[0]},${u[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${l[0]},${l[1]} ${g[0]},${g[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${d[0]},${d[1]} ${b[0]},${b[1]}`,
    `L${w[0]},${w[1]}`,
    `Q${s[0]},${s[1]} ${p[0]},${p[1]}`,
    "Z"
  ].join(" ");
}
function uu({
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
  const p = a == null ? void 0 : a.join(",");
  switch (t) {
    case "rect": {
      const y = !!d && d !== "none", u = o <= Math.max(c * 2, 4), m = e <= Math.max(c * 2, 4);
      if (!y && (u || m))
        return u && e >= o ? /* @__PURE__ */ h(
          "line",
          {
            x1: 0,
            y1: o / 2,
            x2: e,
            y2: o / 2,
            stroke: l,
            strokeWidth: Math.max(c, o),
            strokeDasharray: p
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
            strokeDasharray: p
          }
        );
      const g = f ? Qo(e, o) : 0;
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
          strokeDasharray: p
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
          strokeDasharray: p
        }
      );
    case "diamond":
      return f ? /* @__PURE__ */ h(
        "path",
        {
          d: ri(e, o),
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: p
        }
      ) : /* @__PURE__ */ h(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: l,
          fill: d || "none",
          strokeWidth: c,
          strokeDasharray: p
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
          strokeDasharray: p
        }
      );
    case "arrow": {
      const y = Math.atan2(i - n, s - r), u = Math.max(12, c * 4), m = Math.PI / 6, g = s - u * Math.cos(y - m), x = i - u * Math.sin(y - m), b = s - u * Math.cos(y + m), w = i - u * Math.sin(y + m);
      return /* @__PURE__ */ S(Mt, { children: [
        /* @__PURE__ */ h(
          "line",
          {
            x1: r,
            y1: n,
            x2: s,
            y2: i,
            stroke: l,
            strokeWidth: c,
            strokeDasharray: p
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
function fu({
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
      const p = c ? Qo(e, o) : 0;
      return /* @__PURE__ */ h(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: p || void 0,
          ry: p || void 0,
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
          d: ri(e, o),
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
function pu({
  shape: t,
  w: e,
  h: o,
  fill: r,
  rounded: n
}) {
  switch (t) {
    case "rect": {
      const s = n ? Qo(e, o) : 0;
      return /* @__PURE__ */ h("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: r, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ h("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: r, stroke: "none" });
    case "diamond":
      return n ? /* @__PURE__ */ h(
        "path",
        {
          d: ri(e, o),
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
const yu = De(function(e) {
  return /* @__PURE__ */ h(Mn, { node: e.node });
}), mu = {
  type: "draw",
  component: yu,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => Zs(t, e, o, r),
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
}, gu = De(function(e) {
  const o = e.node;
  return /* @__PURE__ */ h(Mn, { node: o, editingLabel: e.editing });
}), bu = {
  type: "shape",
  component: gu,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => Tn(t, e, o, r),
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
function xu(t) {
  return null;
}
const wu = {
  type: "edge",
  component: xu,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, ln = 0.05, cn = 10, vu = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function ku({
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
  const c = t.h, a = t.data.crop, f = pt(!1);
  f.current = !!i;
  const p = pt(null), y = pt(!1), u = pt(null), [m, g] = ot(null), x = ct(() => {
    u.current && u.current.naturalWidth > 0 && g({ w: u.current.naturalWidth, h: u.current.naturalHeight });
  }, []);
  St(() => {
    u.current && u.current.naturalWidth > 0 && g({ w: u.current.naturalWidth, h: u.current.naturalHeight });
  }, [t.data.src]);
  const [b, w] = ot({ x: 0, y: 0, w: 1, h: 1 });
  St(() => {
    i && (p.current = null, w(a ?? { x: 0, y: 0, w: 1, h: 1 }), !m && u.current && u.current.naturalWidth > 0 && g({ w: u.current.naturalWidth, h: u.current.naturalHeight }));
  }, [i]);
  const T = Kt(() => {
    if (m) {
      const j = m.w / m.h, $ = t.w / c;
      let at, rt;
      return j > $ ? (at = t.w, rt = t.w / j) : (rt = c, at = c * j), { x: (t.w - at) / 2, y: (c - rt) / 2, w: at, h: rt };
    }
    return i ? { x: 0, y: 0, w: t.w, h: c } : null;
  }, [m, i, t.w, c]), k = ct(
    (j) => {
      const $ = o.getNode(t.id);
      if (!$ || $.type !== "image") return;
      const at = $.data;
      if (j.x < 1e-3 && j.y < 1e-3 && j.w > 0.999 && j.h > 0.999) {
        o.updateNodeWithHistory(t.id, {
          data: { ...at, crop: void 0 }
        });
        return;
      }
      const _ = $.h === "auto" ? c : $.h, H = $.rotation || 0;
      let it, dt, st, ht;
      if (T)
        if (it = Math.max(cn, j.w * T.w), dt = Math.max(cn, j.h * T.h), !H)
          st = $.x + T.x + j.x * T.w, ht = $.y + T.y + j.y * T.h;
        else {
          const gt = $.x + $.w / 2, vt = $.y + _ / 2;
          st = gt - it / 2, ht = vt - dt / 2;
        }
      else if (it = Math.max(cn, j.w * $.w), dt = Math.max(cn, j.h * _), !H)
        st = $.x + j.x * $.w, ht = $.y + j.y * _;
      else {
        const gt = $.x + $.w / 2, vt = $.y + _ / 2;
        st = gt - it / 2, ht = vt - dt / 2;
      }
      o.updateNodeWithHistory(t.id, {
        x: st,
        y: ht,
        w: it,
        h: dt,
        data: {
          ...at,
          crop: { x: j.x, y: j.y, w: j.w, h: j.h }
        }
      });
    },
    [o, t.id, T, c]
  ), M = ct(() => {
    p.current = "apply", k(b), d == null || d();
  }, [k, b, d]), C = ct(() => {
    p.current = "cancel", d == null || d();
  }, [d]);
  St(() => {
    if (i) {
      y.current = !0;
      return;
    }
    if (!y.current) return;
    y.current = !1;
    const j = p.current;
    p.current = null, !(j === "cancel" || j === "apply") && (k(b), d == null || d());
  }, [i, b, k, d]), St(() => {
    if (!i) return;
    const j = ($) => {
      $.key === "Enter" ? (M(), $.preventDefault(), $.stopPropagation()) : $.key === "Escape" && (C(), $.preventDefault(), $.stopPropagation());
    };
    return document.addEventListener("keydown", j, !0), () => document.removeEventListener("keydown", j, !0);
  }, [i, M, C]);
  const E = ct(
    (j, $) => {
      if ($.stopPropagation(), $.preventDefault(), !T) return;
      const at = $.currentTarget.ownerDocument, rt = $.clientX, _ = $.clientY, H = { ...b }, it = (st) => {
        const ht = (st.clientX - rt) / n / T.w, gt = (st.clientY - _) / n / T.h, vt = { ...H }, Et = H.x + H.w, Rt = H.y + H.h;
        if (j.includes("left")) {
          const At = Math.max(0, Math.min(Et - ln, H.x + ht));
          vt.x = At, vt.w = Et - At;
        }
        if (j.includes("right") && (vt.w = Math.max(
          ln,
          Math.min(1 - H.x, H.w + ht)
        )), j.includes("top")) {
          const At = Math.max(0, Math.min(Rt - ln, H.y + gt));
          vt.y = At, vt.h = Rt - At;
        }
        j.includes("bottom") && (vt.h = Math.max(
          ln,
          Math.min(1 - H.y, H.h + gt)
        )), w(vt);
      }, dt = () => {
        at.removeEventListener("pointermove", it), at.removeEventListener("pointerup", dt);
      };
      at.addEventListener("pointermove", it), at.addEventListener("pointerup", dt);
    },
    [b, T, n]
  ), L = ct(
    (j) => {
      if (j.stopPropagation(), j.preventDefault(), !T) return;
      const $ = j.currentTarget.ownerDocument, at = j.clientX, rt = j.clientY, _ = { ...b }, H = (dt) => {
        const st = (dt.clientX - at) / n / T.w, ht = (dt.clientY - rt) / n / T.h;
        w({
          ..._,
          x: Math.max(0, Math.min(1 - _.w, _.x + st)),
          y: Math.max(0, Math.min(1 - _.h, _.y + ht))
        });
      }, it = () => {
        $.removeEventListener("pointermove", H), $.removeEventListener("pointerup", it);
      };
      $.addEventListener("pointermove", H), $.addEventListener("pointerup", it);
    },
    [b, T, n]
  ), F = ct(
    (j) => {
      if (f.current) {
        j.stopPropagation();
        return;
      }
      const $ = j.currentTarget.ownerDocument;
      if (j.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: At, y: yt } = o.screenToCanvas(
          j.clientX,
          j.clientY
        );
        for (const Lt of o.selection) {
          const Wt = o.getNode(Lt);
          if (!Wt) continue;
          const oe = Wt.h === "auto" ? 100 : Wt.h;
          if (At >= Wt.x && At <= Wt.x + Wt.w && yt >= Wt.y && yt <= Wt.y + oe)
            return;
        }
      }
      j.stopPropagation(), j.preventDefault(), j.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const at = j.clientX, rt = j.clientY, _ = Array.from(o.selection), H = _.map((At) => {
        const yt = o.getNode(At);
        return { id: At, x: yt.x, y: yt.y };
      });
      let it = !1, dt = null, st = at, ht = rt, gt = !1;
      const vt = () => {
        dt = null;
        const At = (st - at) / o.viewport.zoom, yt = (ht - rt) / o.viewport.zoom, { finalDx: Lt, finalDy: Wt } = o.computeDragSnap(
          H,
          _,
          At,
          yt,
          gt
        ), oe = H.map((se) => ({
          id: se.id,
          patch: { x: se.x + Lt, y: se.y + Wt }
        }));
        o.updateMany(oe);
      }, Et = (At) => {
        const yt = (At.clientX - at) / o.viewport.zoom, Lt = (At.clientY - rt) / o.viewport.zoom;
        if (!it)
          if (Math.abs(yt) > 2 || Math.abs(Lt) > 2)
            it = !0, o.pushHistorySnapshot();
          else
            return;
        st = At.clientX, ht = At.clientY, gt = At.metaKey || At.ctrlKey, dt === null && (dt = requestAnimationFrame(vt));
      }, Rt = () => {
        dt !== null && (cancelAnimationFrame(dt), vt()), o.clearAlignGuides(), $.removeEventListener("pointermove", Et), $.removeEventListener("pointerup", Rt);
      };
      $.addEventListener("pointermove", Et), $.addEventListener("pointerup", Rt);
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
  ], tt = 8 / n, et = tt / 2, ft = 25 / n, Ct = e && s && !i, xt = ct(
    (j) => {
      const $ = j.currentTarget.ownerDocument;
      j.stopPropagation(), j.preventDefault();
      const at = t.x + t.w / 2, rt = t.y + c / 2, _ = t.rotation || 0, { x: H, y: it } = o.screenToCanvas(
        j.clientX,
        j.clientY
      ), dt = Math.atan2(it - rt, H - at);
      let st = !1;
      const ht = (vt) => {
        st || (st = !0, o.pushHistorySnapshot());
        const { x: Et, y: Rt } = o.screenToCanvas(
          vt.clientX,
          vt.clientY
        ), At = Math.atan2(Rt - rt, Et - at);
        let yt = _ + (At - dt) * (180 / Math.PI);
        (vt.shiftKey || o.snapToGrid) && !(vt.metaKey || vt.ctrlKey) && (yt = Math.round(yt / 15) * 15), o.updateNode(t.id, { rotation: yt });
      }, gt = () => {
        $.removeEventListener("pointermove", ht), $.removeEventListener("pointerup", gt);
      };
      $.addEventListener("pointermove", ht), $.addEventListener("pointerup", gt);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), W = i && T ? {
    left: T.x + b.x * T.w,
    top: T.y + b.y * T.h,
    width: b.w * T.w,
    height: b.h * T.h
  } : null, R = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, K = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: R
  };
  if (!i && a) {
    const j = a.y * 100, $ = (1 - a.x - a.w) * 100, at = (1 - a.y - a.h) * 100, rt = a.x * 100;
    K.objectViewBox = `inset(${j}% ${$}% ${at}% ${rt}%)`;
  }
  const q = 8 / n, ut = q / 2;
  return /* @__PURE__ */ S(
    "div",
    {
      onPointerDown: F,
      onDoubleClick: !i && r ? (j) => {
        j.stopPropagation(), l == null || l();
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
                  style: K,
                  draggable: !1
                }
              ),
              i && W && /* @__PURE__ */ h(
                "div",
                {
                  onPointerDown: L,
                  style: {
                    position: "absolute",
                    left: W.left,
                    top: W.top,
                    width: W.width,
                    height: W.height,
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
        i && W && vu.map(({ pos: j, edges: $, cx: at, cy: rt, cursor: _ }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (H) => E($, H),
            style: {
              position: "absolute",
              left: W.left + at * W.width - ut,
              top: W.top + rt * W.height - ut,
              width: q,
              height: q,
              background: "white",
              border: `${1.5 / n}px solid #3b82f6`,
              borderRadius: 2,
              cursor: _,
              zIndex: 11
            }
          },
          j
        )),
        e && !i && /* @__PURE__ */ S(Mt, { children: [
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
              onPointerDown: xt,
              style: {
                position: "absolute",
                left: "50%",
                top: -(ft + tt / 2),
                width: tt,
                height: tt,
                marginLeft: -tt / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        Ct && X.map(({ pos: j, cx: $, cy: at }) => /* @__PURE__ */ h(
          "div",
          {
            onPointerDown: (rt) => {
              rt.stopPropagation(), s == null || s(t.id, j, rt);
            },
            style: {
              position: "absolute",
              left: `calc(${$ * 100}% - ${et}px)`,
              top: `calc(${at * 100}% - ${et}px)`,
              width: tt,
              height: tt,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: zn(j, t.rotation || 0)
            }
          },
          j
        ))
      ]
    }
  );
}
const hl = De(ku);
function Su(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    hl,
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
const Mu = {
  type: "image",
  component: Su,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function Cu({
  node: t,
  engine: e,
  editing: o,
  editClickPos: r,
  onStopEdit: n,
  onMeasuredHeight: s
}) {
  const i = pt(null), [l, d] = ot(t.data.text), c = pt(!1), a = pt(t.data.text), f = pt(null), p = pt(e);
  p.current = e;
  const y = pt(t);
  y.current = t;
  const u = pt(!1);
  St(() => {
    o || d(t.data.text);
  }, [t.data.text]), Eo(() => {
    var M, C;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const E = i.current.ownerDocument;
      let L = !1;
      if (r) {
        const F = E.caretRangeFromPoint(r.clientX, r.clientY);
        if (F && i.current.contains(F.startContainer)) {
          const X = (M = E.defaultView) == null ? void 0 : M.getSelection();
          X == null || X.removeAllRanges(), X == null || X.addRange(F), L = !0;
        }
      }
      if (!L) {
        const F = E.createRange(), X = (C = E.defaultView) == null ? void 0 : C.getSelection();
        i.current.childNodes.length > 0 && (F.selectNodeContents(i.current), F.collapse(!1)), X == null || X.removeAllRanges(), X == null || X.addRange(F);
      }
      a.current = t.data.text, c.current = !1, u.current = !1;
    }
  }, [o]), St(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const M = a.current, C = e.getNode(t.id);
        if (C && C.type === "text") {
          const E = C.data;
          M !== E.text && (u.current ? (u.current = !1, e.updateNode(t.id, {
            data: { ...E, text: M }
          })) : e.updateNodeWithHistory(t.id, {
            data: { ...E, text: M }
          }));
        }
      };
  }, [o, e, t.id]), St(() => {
    if (!i.current || !s) return;
    const M = new ResizeObserver(() => {
      var E;
      const C = ((E = i.current) == null ? void 0 : E.offsetHeight) ?? 0;
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
      d(M), a.current = M, M !== y.current.data.text && !u.current && (u.current = !0, p.current.pushHistorySnapshot()), f.current && clearTimeout(f.current), f.current = setTimeout(() => {
        const C = y.current;
        M !== C.data.text && p.current.updateNode(C.id, {
          data: { ...C.data, text: M }
        });
      }, 0);
    }
  }, []), w = t.h === "auto" ? void 0 : t.h, T = t.data.opacity ?? 1, k = {
    fontFamily: Co(t.data.fontFamily),
    fontSize: t.data.fontSize,
    color: t.data.color,
    textAlign: t.data.align,
    opacity: T,
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
const ul = De(Cu);
function Iu(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    ul,
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
const Tu = {
  type: "text",
  component: Iu,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function zu(t) {
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
const Au = {
  type: "frame",
  component: zu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, Eu = 100;
function Pu({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onEditStart: i,
  onEditEnd: l
}) {
  const d = pt(null), c = pt(null), a = pt(""), f = pt(null), p = pt(null), y = pt(t);
  y.current = t;
  const u = pt(o);
  u.current = o;
  const m = pt(!1);
  St(() => {
    var k;
    if (s && c.current) {
      const M = c.current;
      M.innerText = t.data.text || "", a.current = t.data.text || "", M.focus();
      const C = M.ownerDocument, E = (k = C.defaultView) == null ? void 0 : k.getSelection(), L = f.current;
      f.current = null;
      let F = !1;
      if (L && E && C.caretRangeFromPoint) {
        const X = C.caretRangeFromPoint(L.x, L.y);
        X && M.contains(X.startContainer) && (E.removeAllRanges(), E.addRange(X), F = !0);
      }
      if (!F && E) {
        const X = C.createRange();
        M.childNodes.length > 0 && (X.selectNodeContents(M), X.collapse(!1)), E.removeAllRanges(), E.addRange(X);
      }
      m.current = !1;
    }
  }, [s]), St(() => {
    if (s)
      return () => {
        const k = y.current, M = a.current;
        M !== k.data.text && (m.current ? (m.current = !1, u.current.updateNode(k.id, {
          data: { ...k.data, text: M }
        })) : u.current.updateNodeWithHistory(k.id, {
          data: { ...k.data, text: M }
        }));
      };
  }, [s]);
  const g = ct(() => {
    p.current && (clearTimeout(p.current), p.current = null), c.current && (a.current = c.current.innerText), l();
  }, [l]), x = ct(
    (k) => {
      const M = k.currentTarget.ownerDocument;
      if (k.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: K, y: q } = o.screenToCanvas(k.clientX, k.clientY);
        for (const ut of o.selection) {
          const j = o.getNode(ut);
          if (!j) continue;
          const $ = j.h === "auto" ? 100 : j.h;
          if (K >= j.x && K <= j.x + j.w && q >= j.y && q <= j.y + $)
            return;
        }
      }
      if (k.stopPropagation(), s) return;
      k.currentTarget.setPointerCapture(k.pointerId), k.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const C = k.clientX, E = k.clientY, L = Array.from(o.selection), F = [];
      for (const K of L) {
        const q = o.getNode(K);
        q && F.push({ id: K, x: q.x, y: q.y });
      }
      if (F.length === 0) return;
      let X = !1, tt = null, et = C, ft = E, Ct = !1;
      const xt = () => {
        tt = null;
        const K = (et - C) / o.viewport.zoom, q = (ft - E) / o.viewport.zoom, { finalDx: ut, finalDy: j } = o.computeDragSnap(
          F,
          L,
          K,
          q,
          Ct
        ), $ = F.map((at) => ({
          id: at.id,
          patch: { x: at.x + ut, y: at.y + j }
        }));
        o.updateMany($);
      }, W = (K) => {
        const q = (K.clientX - C) / o.viewport.zoom, ut = (K.clientY - E) / o.viewport.zoom;
        if (!X)
          if (Math.abs(q) > 2 || Math.abs(ut) > 2)
            X = !0, o.pushHistorySnapshot();
          else
            return;
        et = K.clientX, ft = K.clientY, Ct = K.metaKey || K.ctrlKey, tt === null && (tt = requestAnimationFrame(xt));
      }, R = () => {
        tt !== null && (cancelAnimationFrame(tt), xt()), o.clearAlignGuides(), M.removeEventListener("pointermove", W), M.removeEventListener("pointerup", R);
      };
      M.addEventListener("pointermove", W), M.addEventListener("pointerup", R);
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
          const E = M.indexOf(o.activeGroupId);
          if (E > 0) {
            o.enterGroup(M[E - 1]), o.select(t.id);
            return;
          }
        }
        s || (f.current = { x: k.clientX, y: k.clientY }, o.select(t.id), i(t.id));
      }
    },
    [r, s, o, t.id, t.groupId, i]
  ), w = t.data.fontSize ?? 16, T = t.h === "auto" ? Eu : t.h;
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
        height: T,
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
                c.current && (a.current = c.current.innerText, a.current !== y.current.data.text && !m.current && (m.current = !0, u.current.pushHistorySnapshot()), p.current && clearTimeout(p.current), p.current = setTimeout(() => {
                  const M = y.current, C = a.current;
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
                fontFamily: Co(Mo),
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
                fontFamily: Co(Mo),
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
const fl = De(Pu);
function Hu(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    fl,
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
const Lu = {
  type: "sticky",
  component: Hu,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, pl = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function Du(t) {
  const e = t.match(pl);
  return e ? e[1] : null;
}
function Ru(t) {
  return pl.test(t);
}
function Wu(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function Fu(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function Bu({
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
  }, f = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", p = Math.max(6, 8 / n), y = [
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
                  src: Wu(c.videoId),
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
        e && r && !s && y.map((u) => /* @__PURE__ */ h(
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
              width: p,
              height: p,
              marginLeft: -p / 2,
              marginTop: -p / 2,
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
const Nu = De(Bu);
function Ou(t) {
  const e = t.node;
  return /* @__PURE__ */ h(
    Nu,
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
const Vu = {
  type: "youtube",
  component: Ou,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, Xu = [
  bh,
  mu,
  bu,
  wu,
  Mu,
  Tu,
  Au,
  Lu,
  Vu
];
class Gu {
  constructor(e, o) {
    wt(this, "spatial");
    wt(this, "registry");
    /** Current resolved port values. */
    wt(this, "values", /* @__PURE__ */ new Map());
    /** Node IDs that need recomputation. */
    wt(this, "dirty", /* @__PURE__ */ new Set());
    /** Whether a microtask flush is already scheduled. */
    wt(this, "scheduled", !1);
    /** Generation counter for canceling stale async results. */
    wt(this, "generation", 0);
    /** Change subscribers. */
    wt(this, "listeners", /* @__PURE__ */ new Set());
    /** Node IDs that are part of a cycle (updated after each topoSort). */
    wt(this, "_cycleNodeIds", /* @__PURE__ */ new Set());
    /** Wall time of the last `compute` run per node (sync or async resolution), in ms. */
    wt(this, "lastComputeMs", /* @__PURE__ */ new Map());
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
    const o = this.spatial.nodes.get(e), r = this.registry.get((o == null ? void 0 : o.type) ?? ""), n = ye(r, o);
    if (!n) return {};
    const s = {}, i = n.filter((l) => l.direction === "input");
    for (const l of i) {
      const d = this.spatial.getEdgesForNode(e);
      let c = !1;
      for (const a of d) {
        const f = a.data;
        if (f.toId === e && f.targetPort === l.id) {
          const p = this.values.get(
            Wo(f.fromId, f.sourcePort ?? "")
          );
          s[l.id] = p ?? l.defaultValue ?? null, c = !0;
          break;
        }
      }
      c || (s[l.id] = l.defaultValue ?? null);
    }
    return s;
  }
  /** Get all output values for a node. */
  getOutputs(e) {
    const o = this.spatial.nodes.get(e), r = this.registry.get((o == null ? void 0 : o.type) ?? ""), n = ye(r, o);
    if (!n) return {};
    const s = {};
    for (const i of n)
      i.direction === "output" && (s[i.id] = this.values.get(Wo(e, i.id)) ?? null);
    return s;
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
    const o = this.spatial.nodes.get(e), r = this.registry.get((o == null ? void 0 : o.type) ?? ""), n = ye(r, o);
    if (!n) return {};
    const s = {};
    for (const i of n)
      if (i.direction === "input") {
        const l = this.spatial.getEdgesForNode(e);
        let d = !1;
        for (const c of l) {
          const a = c.data;
          if (a.toId === e && a.targetPort === i.id) {
            s[i.id] = this.values.get(Wo(a.fromId, a.sourcePort ?? "")) ?? i.defaultValue ?? null, d = !0;
            break;
          }
        }
        d || (s[i.id] = i.defaultValue ?? null);
      } else
        s[i.id] = this.values.get(Wo(e, i.id)) ?? null;
    return s;
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
        const s = this.registry.get(n.type), i = ye(s, n);
        if (i) {
          for (const l of i)
            this.values.delete(Wo(n.id, l.id));
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
    const f = new Set(a), p = /* @__PURE__ */ new Set();
    for (const u of s)
      f.has(u) || p.add(u);
    let y = !1;
    return (p.size !== this._cycleNodeIds.size || [...p].some((u) => !this._cycleNodeIds.has(u))) && (this._cycleNodeIds = p, y = !0), { sorted: a, cyclesChanged: y };
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
    const r = this.registry.get(o.type), n = ye(r, o);
    if (!(r != null && r.compute) || !n) return !1;
    const s = this.getInputs(e), i = typeof performance < "u" ? performance.now() : 0, l = r.compute(s, o.data);
    if (l instanceof Promise) {
      const c = ++this.generation;
      return l.then((a) => {
        if (c !== this.generation) return;
        const f = typeof performance < "u" ? performance.now() : 0;
        this.lastComputeMs.set(e, f - i), this.applyOutputs(e, n, a) && (this.markDownstream(e), this.notifyListeners(), this.dirty.size > 0 && this.scheduleFlush());
      }), !1;
    }
    const d = typeof performance < "u" ? performance.now() : 0;
    return this.lastComputeMs.set(e, d - i), this.applyOutputs(e, n, l);
  }
  /** Apply computed outputs to the values map. Returns true if any value changed. */
  applyOutputs(e, o, r) {
    let n = !1;
    for (const s of o) {
      if (s.direction !== "output") continue;
      const i = Wo(e, s.id), l = r[s.id] ?? null, d = this.values.get(i) ?? null;
      Yu(d, l) || (this.values.set(i, l), n = !0);
    }
    return n && this.markDownstream(e), n;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function Yu(t, e) {
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
const yr = [
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
function Xr(t) {
  return yr.find((e) => e.key === t) ?? yr[1];
}
function ju() {
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
function Zu() {
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
const cs = {
  "japanese-stationery": ju,
  kraft: Zu
};
function Ku(t) {
  var e;
  return ((e = cs[t]) == null ? void 0 : e.call(cs)) ?? {};
}
const yl = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, qu = {
  ...yl,
  willChange: "transform"
}, Uu = De(function({
  background: e
}) {
  const o = Xr(e), { staticDefs: r, staticLayers: n } = Ku(e);
  return /* @__PURE__ */ S("svg", { style: qu, children: [
    r && /* @__PURE__ */ h("defs", { children: r }),
    /* @__PURE__ */ h("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    n
  ] });
});
function Qu({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: r = !0
}) {
  const n = e * t.zoom, s = t.x % n, i = t.y % n, d = Xr(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(Uu, { background: o }),
    r && /* @__PURE__ */ S("svg", { style: yl, children: [
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
const Ws = {
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
}, ml = br(Ws);
function te() {
  return Ke(ml);
}
const Fs = {
  inspectorTitle: "Inspector",
  autoHide: "Auto-hide",
  popOut: "Pop out",
  dockIn: "Dock back into the canvas",
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
}, gl = br({
  dir: "ltr",
  isRTL: !1,
  labels: Fs
});
function Ju(t) {
  var e;
  return t === "rtl" || t === "ltr" ? t : typeof document < "u" && ((e = document.dir) == null ? void 0 : e.toLowerCase()) === "rtl" ? "rtl" : "ltr";
}
function $u(t, e) {
  return Kt(() => {
    const o = Ju(t), { customNodeDocs: r, ...n } = e ?? {};
    return {
      dir: o,
      isRTL: o === "rtl",
      labels: {
        ...Fs,
        ...n,
        customNodeDocs: {
          ...Fs.customNodeDocs,
          ...r ?? {}
        }
      }
    };
  }, [t, e]);
}
function Jt() {
  return Ke(gl);
}
const Hr = 168, Lr = 112, ur = 6, dn = Hr - ur * 2, hn = Lr - ur * 2;
function bl(t, e) {
  return t.h === "auto" ? e[t.id] ?? 100 : t.h;
}
function _u(t, e, o, r, n) {
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
  for (const m of t) {
    if (m.type === "edge") continue;
    const g = bl(m, e);
    s = Math.min(s, m.x), i = Math.min(i, m.y), l = Math.max(l, m.x + m.w), d = Math.max(d, m.y + g);
  }
  const c = o.zoom, a = (0 - o.x) / c, f = (0 - o.y) / c, p = (r - o.x) / c, y = (n - o.y) / c;
  if (!Number.isFinite(s))
    return {
      minX: Math.min(a, p) - 80,
      minY: Math.min(f, y) - 80,
      maxX: Math.max(a, p) + 80,
      maxY: Math.max(f, y) + 80
    };
  const u = 48;
  return s -= u, i -= u, l += u, d += u, s = Math.min(s, a, p), i = Math.min(i, f, y), l = Math.max(l, a, p), d = Math.max(d, f, y), { minX: s, minY: i, maxX: l, maxY: d };
}
function tf({
  engine: t,
  nodes: e,
  viewport: o,
  containerSize: r,
  measuredHeights: n
}) {
  const s = te(), { labels: i } = Jt(), [l, d] = ot(() => t.presentationMode), c = pt(null), a = pt(!1), [f, p] = ot(!1);
  St(() => {
    const _ = () => d(t.presentationMode);
    return t.on("presentation", _), () => t.off("presentation", _);
  }, [t]);
  const { minX: y, minY: u, maxX: m, maxY: g, scale: x, offsetX: b, offsetY: w } = Kt(() => {
    const { w: _, h: H } = r;
    if (_ <= 0 || H <= 0)
      return { minX: 0, minY: 0, maxX: 1, maxY: 1, scale: 1, offsetX: 0, offsetY: 0 };
    const it = _u(e, n, o, _, H), dt = Math.max(it.maxX - it.minX, 1e-6), st = Math.max(it.maxY - it.minY, 1e-6), ht = Math.min(dn / dt, hn / st), gt = dt * ht, vt = st * ht;
    return {
      minX: it.minX,
      minY: it.minY,
      maxX: it.maxX,
      maxY: it.maxY,
      scale: ht,
      offsetX: (dn - gt) / 2,
      offsetY: (hn - vt) / 2
    };
  }, [e, n, o, r]), T = ct(
    (_, H) => {
      const { w: it, h: dt } = r;
      if (it <= 0 || dt <= 0) return;
      const st = t.viewport.zoom, { x: ht, y: gt } = t.viewport, vt = it / 2 - _ * st, Et = dt / 2 - H * st;
      t.pan(vt - ht, Et - gt);
    },
    [r, t]
  ), k = ct((_, H) => {
    const it = c.current;
    if (!it) return null;
    const dt = it.getBoundingClientRect();
    if (dt.width <= 0 || dt.height <= 0) return null;
    const st = (_ - dt.left) / dt.width * Hr, ht = (H - dt.top) / dt.height * Lr, gt = st - ur, vt = ht - ur;
    return gt < -0.5 || vt < -0.5 || gt > dn + 0.5 || vt > hn + 0.5 ? null : { ix: gt, iy: vt };
  }, []), M = ct(
    (_, H) => ({
      wx: y + (_ - b) / x,
      wy: u + (H - w) / x
    }),
    [y, u, b, w, x]
  ), C = ct(
    (_, H) => {
      const it = k(_, H);
      if (!it) return;
      const { wx: dt, wy: st } = M(it.ix, it.iy);
      T(dt, st);
    },
    [k, M, T]
  ), E = ct(
    (_) => {
      _.stopPropagation(), _.button === 0 && (a.current = !0, p(!0), _.currentTarget.setPointerCapture(_.pointerId), C(_.clientX, _.clientY));
    },
    [C]
  ), L = ct(
    (_) => {
      a.current && C(_.clientX, _.clientY);
    },
    [C]
  ), F = ct((_) => {
    a.current = !1, p(!1);
    try {
      _.currentTarget.releasePointerCapture(_.pointerId);
    } catch {
    }
  }, []);
  if (l || r.w <= 0 || r.h <= 0)
    return null;
  const X = o.zoom, tt = r.w, et = r.h, ft = (0 - o.x) / X, Ct = (0 - o.y) / X, xt = (tt - o.x) / X, W = (et - o.y) / X, R = b + (ft - y) * x, K = w + (Ct - u) * x, q = Math.max(2, (xt - ft) * x), ut = Math.max(2, (W - Ct) * x), j = [];
  for (const _ of e) {
    if (_.type === "edge") continue;
    const H = bl(_, n), it = b + (_.x - y) * x, dt = w + (_.y - u) * x, st = Math.max(1.5, _.w * x), ht = Math.max(1.5, H * x);
    j.push(
      /* @__PURE__ */ h(
        "rect",
        {
          x: it,
          y: dt,
          width: st,
          height: ht,
          rx: 1,
          fill: s.accentColor,
          fillOpacity: 0.45,
          stroke: "none"
        },
        _.id
      )
    );
  }
  const $ = s.border, at = s.controlBg, rt = s.accentColor;
  return /* @__PURE__ */ h(
    "div",
    {
      "data-sb-minimap": !0,
      style: {
        position: "absolute",
        insetInlineEnd: 12,
        bottom: 56,
        width: Hr,
        height: Lr,
        zIndex: 9998,
        pointerEvents: "auto",
        touchAction: "none",
        borderRadius: s.controlBorderRadius,
        boxShadow: s.panelShadow
      },
      onPointerDown: (_) => _.stopPropagation(),
      children: /* @__PURE__ */ S(
        "svg",
        {
          ref: c,
          width: Hr,
          height: Lr,
          role: "img",
          "aria-label": i.minimapTitle,
          style: {
            display: "block",
            cursor: f ? "grabbing" : "grab",
            borderRadius: s.controlBorderRadius,
            overflow: "hidden"
          },
          onPointerDown: E,
          onPointerMove: L,
          onPointerUp: F,
          onPointerCancel: F,
          children: [
            /* @__PURE__ */ h("rect", { x: 0, y: 0, width: Hr, height: Lr, fill: at, stroke: $, strokeWidth: 1 }),
            /* @__PURE__ */ S("g", { transform: `translate(${ur}, ${ur})`, children: [
              /* @__PURE__ */ h(
                "rect",
                {
                  x: 0,
                  y: 0,
                  width: dn,
                  height: hn,
                  fill: "rgba(255,255,255,0.04)",
                  stroke: $,
                  strokeOpacity: 0.5,
                  strokeWidth: 0.5
                }
              ),
              j,
              /* @__PURE__ */ h(
                "rect",
                {
                  x: R,
                  y: K,
                  width: q,
                  height: ut,
                  fill: rt,
                  fillOpacity: 0.12,
                  stroke: rt,
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
const xl = "sb-excalib-index", ni = "sb-excalib-";
function Ln() {
  try {
    const t = localStorage.getItem(xl);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function wl(t) {
  localStorage.setItem(xl, JSON.stringify(t));
}
function ef(t) {
  try {
    const e = localStorage.getItem(ni + t);
    return e ? si(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function si(t) {
  if (t.libraryItems)
    return t;
  const o = (t.library ?? []).map((r, n) => ({
    id: Ht(10),
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
function vl() {
  return Ln();
}
function ii(t) {
  const e = ef(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function ai(t, e) {
  const o = si(t), r = Ht(10), n = o.libraryItems.map((l) => l.name || "Untitled"), s = {
    id: r,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: n
  };
  localStorage.setItem(ni + r, JSON.stringify(o));
  const i = Ln();
  return i.push(s), wl(i), s;
}
function of(t) {
  localStorage.removeItem(ni + t);
  const e = Ln().filter((o) => o.id !== t);
  wl(e);
}
function rf(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], r = Ln();
  for (const n of r) {
    if (!n.itemNames.some((l) => l.toLowerCase().includes(e)) && !n.name.toLowerCase().includes(e)) continue;
    const i = ii(n.id);
    for (const l of i)
      ((l.name || "").toLowerCase().includes(e) || n.name.toLowerCase().includes(e)) && o.push({ library: n, item: l });
  }
  return o;
}
async function nf(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const r = await o.json();
  if (r.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const n = si(r);
  return ai(n, { name: e, source: t });
}
function kl(t) {
  const e = t.visualViewport;
  return {
    vw: (e == null ? void 0 : e.width) ?? t.innerWidth,
    vh: (e == null ? void 0 : e.height) ?? t.innerHeight
  };
}
const Sl = 8;
function Ml(t, e, o, r, n, s = Sl) {
  const { vw: i, vh: l } = kl(n);
  let d = t;
  d + o + s > i && (d = t - o), d = Math.max(s, Math.min(d, i - o - s));
  let c = e;
  if (r + s * 2 <= l) {
    if (c + r + s > l) {
      const p = e - r;
      e - s >= r ? c = p : c = l - r - s;
    }
    c < s && (c = s);
  } else
    c = s;
  const f = Math.max(s, l - r - s);
  return c = Math.max(s, Math.min(c, f)), { left: d, top: c };
}
function Cl(t, e, o, r, n) {
  const i = Sl, { vw: l, vh: d } = kl(r);
  let c = t.right + 8;
  c + e + i > l && (c = t.left - e - 8), c < i && (c = i), c = Math.max(i, Math.min(c, l - e - i));
  let a = t.top;
  a + o + i > d && (a = d - o - i), a < i && (a = i);
  const f = Math.max(i, d - o - i);
  return a = Math.max(i, Math.min(a, f)), { left: c, top: a };
}
function Il(t, e, o, r = []) {
  Eo(() => {
    if (!t) return;
    const n = o.current;
    if (!n) return;
    const s = n.ownerDocument.defaultView ?? window, i = () => {
      var f;
      const d = (f = e.current) == null ? void 0 : f.getBoundingClientRect();
      if (!d) return;
      const c = n.getBoundingClientRect(), a = Cl(d, c.width, c.height, s);
      n.style.left = `${a.left}px`, n.style.top = `${a.top}px`;
    };
    i();
    const l = new ResizeObserver(i);
    return l.observe(n), () => l.disconnect();
  }, [t, e, o, ...r]);
}
function li(t, e, o, r = []) {
  Eo(() => {
    if (!t || !e) return;
    const n = o.current;
    if (!n) return;
    const s = n.ownerDocument.defaultView ?? window, i = () => {
      const d = n.getBoundingClientRect(), c = Cl(e, d.width, d.height, s);
      n.style.left = `${c.left}px`, n.style.top = `${c.top}px`;
    };
    i();
    const l = new ResizeObserver(i);
    return l.observe(n), () => l.disconnect();
  }, [t, e, o, ...r]);
}
function Gr(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function jo(t) {
  if (t)
    return t * (180 / Math.PI);
}
function Tl(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function zl(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function Al(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function El(t) {
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
function sf(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function ds(t, e) {
  return {
    id: Ht(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: jo(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: Tl(t.backgroundColor),
      fillStyle: zl(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Al(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: Gr(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? sf(t) : void 0
    }
  };
}
function la(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const r = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Al(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: Gr(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [l, d] = o, c = Math.min(l[0], d[0]), a = Math.min(l[1], d[1]), f = Math.max(l[0], d[0]), p = Math.max(l[1], d[1]), y = Math.max(f - c, 1), u = Math.max(p - a, 1);
    return [
      {
        id: Ht(10),
        type: "shape",
        x: t.x + c,
        y: t.y + a,
        w: y,
        h: u,
        z: 0,
        rotation: jo(t.angle),
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
    const l = af(t);
    if (l) return [l];
  }
  const s = Ht(10), i = [];
  for (let l = 0; l < o.length - 1; l++) {
    const d = o[l], c = o[l + 1], a = Math.min(d[0], c[0]), f = Math.min(d[1], c[1]), p = Math.max(d[0], c[0]), y = Math.max(d[1], c[1]), u = Math.max(p - a, 1), m = Math.max(y - f, 1), g = l === o.length - 2;
    i.push({
      id: Ht(10),
      type: "shape",
      x: t.x + a,
      y: t.y + f,
      w: u,
      h: m,
      z: 0,
      rotation: jo(t.angle),
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
function af(t) {
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
    id: Ht(10),
    type: "draw",
    x: t.x + o,
    y: t.y + r,
    w: Math.max(n - o, 1),
    h: Math.max(s - r, 1),
    z: 0,
    rotation: jo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: Gr(t.opacity ?? 100),
      fill: Tl(t.backgroundColor),
      fillStyle: zl(t.fillStyle)
    }
  };
}
function lf(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, r = t.simulatePressure !== !1, n = e.map((a, f) => {
    const p = !r && o && f < o.length ? o[f] : 0.5;
    return [a[0], a[1], p];
  });
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, d = -1 / 0;
  for (const [a, f] of n)
    a < s && (s = a), f < i && (i = f), a > l && (l = a), f > d && (d = f);
  isFinite(s) || (s = 0, i = 0, l = 0, d = 0);
  const c = n.map(
    ([a, f, p]) => [a - s, f - i, p]
  );
  return {
    id: Ht(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(l - s, 1),
    h: Math.max(d - i, 1),
    z: 0,
    rotation: jo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: Gr(t.opacity ?? 100)
    }
  };
}
function cf(t) {
  return {
    id: Ht(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: jo(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: El(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Pl(t.textAlign),
      opacity: Gr(t.opacity ?? 100)
    }
  };
}
function df(t) {
  return {
    id: Ht(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: jo(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function Hl(t) {
  return hf(t.elements);
}
function hf(t) {
  const e = [], o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && n.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [ds(s, "rect")];
        break;
      case "ellipse":
        i = [ds(s, "ellipse")];
        break;
      case "diamond":
        i = [ds(s, "diamond")];
        break;
      case "arrow":
        i = la(s, !0);
        break;
      case "line":
        i = la(s, !1);
        break;
      case "freedraw": {
        const l = lf(s);
        l && (i = [l]);
        break;
      }
      case "text":
        i = [cf(s)];
        break;
      case "frame":
      case "magicframe":
        i = [df(s)];
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
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = El(i.fontFamily), c.labelAlign = Pl(i.textAlign);
  }
  return uf(t, e, o, r), ff(e), { nodes: e, groupParent: r };
}
function uf(t, e, o, r) {
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
function ff(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const r of t)
    r.x < e && (e = r.x), r.y < o && (o = r.y);
  if (isFinite(e))
    for (const r of t)
      r.x -= e, r.y -= o;
}
function ci(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const f of t) {
    const p = f.h === "auto" ? 40 : f.h;
    o = Math.min(o, f.x), r = Math.min(r, f.y), n = Math.max(n, f.x + f.w), s = Math.max(s, f.y + p);
  }
  const i = n - o || 1, l = s - r || 1, d = 4, c = `${o - d} ${r - d} ${i + d * 2} ${l + d * 2}`, a = [];
  for (const f of t)
    switch (f.type) {
      case "shape":
        a.push(pf(f));
        break;
      case "draw":
        a.push(yf(f));
        break;
      case "text":
        a.push(mf(f));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${a.join("")}</svg>`;
}
function Ll(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function pf(t) {
  var p, y, u, m;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, r = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: ao(e.strokeStyle),
    seed: t.id
  }, n = ((p = e.startPoint) == null ? void 0 : p[0]) ?? 0, s = ((y = e.startPoint) == null ? void 0 : y[1]) ?? o / 2, i = ((u = e.endPoint) == null ? void 0 : u[0]) ?? t.w, l = ((m = e.endPoint) == null ? void 0 : m[1]) ?? o / 2;
  let d;
  switch (e.shape) {
    case "rect":
      d = Nr(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "ellipse":
      d = En(t.x + t.w / 2, t.y + o / 2, t.w, o, r);
      break;
    case "diamond":
      d = Pn(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "line":
      d = Xo(t.x + n, t.y + s, t.x + i, t.y + l, r);
      break;
    case "arrow":
      d = Hn(t.x + n, t.y + s, t.x + i, t.y + l, r);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, a = c < 1 ? `<g opacity="${c}">` : "<g>", f = d.map(
    (g) => `<path d="${Ll(g.d)}" fill="${g.fill || "none"}" stroke="${g.stroke}" stroke-width="${g.strokeWidth}"${g.strokeDasharray ? ` stroke-dasharray="${g.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${a}${f.join("")}</g>`;
}
function yf(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), r = e.opacity ?? 1, n = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${n}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${r < 1 ? ` opacity="${r}"` : ""}/>`;
}
function mf(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), r = e.opacity ?? 1, n = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${r < 1 ? ` opacity="${r}"` : ""}>${Ll(n)}</text>`;
}
const Dl = "sb-personal-library";
function di() {
  try {
    const t = localStorage.getItem(Dl);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Rl(t) {
  localStorage.setItem(Dl, JSON.stringify(t));
}
function Wl() {
  return di();
}
function gf(t, e, o) {
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
    id: Ht(10),
    name: t.trim() || "Untitled",
    nodes: r,
    groupParent: s,
    createdAt: Date.now()
  }, l = di();
  return l.unshift(i), Rl(l), i;
}
function bf(t) {
  const e = di().filter((o) => o.id !== t);
  Rl(e);
}
function Fl(t, e, o, r) {
  const { nodes: n, groupParent: s } = Hl(e);
  if (n.length === 0) return;
  const i = structuredClone(n), l = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map();
  for (const b of i) {
    const w = Ht(10);
    l.set(b.id, w), b.id = w;
  }
  for (const b of i)
    b.groupId && (d.has(b.groupId) || d.set(b.groupId, Ht(10)), b.groupId = d.get(b.groupId));
  let c = 1 / 0, a = 1 / 0, f = -1 / 0, p = -1 / 0;
  for (const b of i) {
    const w = b.h === "auto" ? 100 : b.h;
    c = Math.min(c, b.x), a = Math.min(a, b.y), f = Math.max(f, b.x + b.w), p = Math.max(p, b.y + w);
  }
  const y = o ?? window.innerWidth / 2, u = r ?? window.innerHeight / 2, m = t.screenToCanvas(y, u), g = m.x - (c + f) / 2, x = m.y - (a + p) / 2;
  for (const b of i)
    b.x += g, b.y += x, b.z = t.nextZ();
  t.addNodes(i);
  for (const [b, w] of s) {
    const T = d.get(b) ?? b, k = d.get(w) ?? w;
    t.groupParent.set(T, k);
  }
  t.selectMultiple(i.map((b) => b.id));
}
const Bs = "application/x-spatialboard-library-item", Ns = "application/x-spatialboard-personal-item";
function Bl(t, e, o, r) {
  if (e.nodes.length === 0) return;
  const n = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const g of n) {
    const x = Ht(10);
    s.set(g.id, x), g.id = x;
  }
  for (const g of n)
    g.groupId && (i.has(g.groupId) || i.set(g.groupId, Ht(10)), g.groupId = i.get(g.groupId));
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
  const f = o ?? window.innerWidth / 2, p = r ?? window.innerHeight / 2, y = t.screenToCanvas(f, p), u = y.x - (l + c) / 2, m = y.y - (d + a) / 2;
  for (const g of n)
    g.x += u, g.y += m, g.z = t.nextZ();
  t.addNodes(n);
  for (const [g, x] of e.groupParent) {
    const b = i.get(g) ?? g, w = i.get(x) ?? x;
    t.groupParent.set(b, w);
  }
  t.selectMultiple(n.map((g) => g.id));
}
const mr = /* @__PURE__ */ new Map();
function xf({ item: t }) {
  const e = Kt(() => {
    const o = mr.get(t.id);
    if (o) return o;
    const { nodes: r } = Hl(t), n = ci(r, 56);
    return mr.set(t.id, n), n;
  }, [t.id]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Nl({
  item: t,
  libId: e,
  onClick: o,
  theme: r
}) {
  const { labels: n } = Jt(), s = ct(
    (i) => {
      i.dataTransfer.setData(
        Bs,
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
      children: /* @__PURE__ */ h(xf, { item: t })
    }
  );
}
function wf({ nodes: t }) {
  const e = Kt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), r = mr.get(o);
    if (r) return r;
    const n = ci(t, 56);
    return mr.set(o, n), n;
  }, [t]);
  return /* @__PURE__ */ h("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Ol({
  item: t,
  onClick: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = Jt(), [s, i] = ot(!1), l = ct(
    (d) => {
      d.dataTransfer.setData(
        Ns,
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
            children: /* @__PURE__ */ h(wf, { nodes: t.nodes })
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
function vf({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  onBrowseDirectory: n
}) {
  const s = te(), { labels: i } = Jt(), l = pt(null), d = pt(null), [c, a] = ot([]), [f, p] = ot([]), [y, u] = ot(""), [m, g] = ot(/* @__PURE__ */ new Set());
  li(e && !!r, r, l, [
    c.length,
    f.length,
    y,
    m.size
  ]);
  const x = ct(() => {
    a(vl()), p(Wl());
  }, []);
  St(() => {
    e && x();
  }, [e, x]), St(() => {
    if (!e) return;
    const L = (F) => {
      l.current && !l.current.contains(F.target) && o();
    };
    return document.addEventListener("pointerdown", L), () => document.removeEventListener("pointerdown", L);
  }, [e, o]);
  const b = ct(
    (L) => {
      var tt;
      const F = (tt = L.target.files) == null ? void 0 : tt[0];
      if (!F) return;
      const X = new FileReader();
      X.onload = () => {
        try {
          const et = JSON.parse(X.result);
          if (et.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const ft = F.name.replace(/\.excalidrawlib$/, "");
          ai(et, { name: ft }), x();
        } catch (et) {
          console.error("Failed to parse library file:", et);
        }
      }, X.readAsText(F), L.target.value = "";
    },
    [x]
  ), w = ct(
    (L) => {
      of(L), mr.clear(), x();
    },
    [x]
  ), T = ct(
    (L) => {
      Fl(t, L);
    },
    [t]
  ), k = ct(
    (L) => {
      Bl(t, L);
    },
    [t]
  ), M = ct(
    (L) => {
      bf(L), mr.clear(), x();
    },
    [x]
  ), C = ct((L) => {
    g((F) => {
      const X = new Set(F);
      return X.has(L) ? X.delete(L) : X.add(L), X;
    });
  }, []), E = Kt(() => {
    if (!y.trim()) return null;
    const L = y.toLowerCase(), F = rf(y), X = f.filter(
      (tt) => tt.name.toLowerCase().includes(L)
    );
    return { excalidraw: F, personal: X };
  }, [y, f]);
  return !e || !r ? null : Xe(
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
        onPointerDown: (L) => L.stopPropagation(),
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
                onChange: (L) => u(L.target.value),
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
                    E.personal.map((L) => /* @__PURE__ */ h(
                      Ol,
                      {
                        item: L,
                        onClick: () => k(L),
                        onRemove: () => M(L.id),
                        theme: s
                      },
                      L.id
                    )),
                    E.excalidraw.map(({ library: L, item: F }) => /* @__PURE__ */ h(
                      Nl,
                      {
                        item: F,
                        libId: L.id,
                        onClick: () => T(F),
                        theme: s
                      },
                      F.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ S(Mt, { children: [
                f.length > 0 && /* @__PURE__ */ h(
                  Sf,
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
                ) : c.map((L) => {
                  const F = m.has(L.id);
                  return /* @__PURE__ */ h(
                    kf,
                    {
                      lib: L,
                      expanded: F,
                      onToggle: () => C(L.id),
                      onPlace: T,
                      onUninstall: () => w(L.id),
                      theme: s
                    },
                    L.id
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
                      var L;
                      return (L = d.current) == null ? void 0 : L.click();
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
function kf({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: r,
  onUninstall: n,
  theme: s
}) {
  const { labels: i } = Jt(), [l, d] = ot(null);
  return St(() => {
    e && l === null && d(ii(t.id));
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
          Nl,
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
function Sf({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: r
}) {
  const { labels: n } = Jt(), [s, i] = ot(!0);
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
          Ol,
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
async function Mf(t, e, o = 1, r = 20, n) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${r}`;
  return (await fetch(s, { signal: n, credentials: "include" })).json();
}
async function ca(t, e = 1, o = 20, r) {
  const n = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(n, { signal: r, credentials: "include" })).json();
}
const Os = "application/x-spatialboard-gif-item";
function Vl(t, e, o, r) {
  const n = e.file.hd.gif, s = 400, i = 300;
  let l = n.width, d = n.height;
  const c = Math.min(1, s / l, i / d);
  l = Math.round(l * c), d = Math.round(d * c);
  const a = o ?? window.innerWidth / 2, f = r ?? window.innerHeight / 2, p = t.screenToCanvas(a, f), y = {
    id: Ht(10),
    type: "image",
    x: p.x - l / 2,
    y: p.y - d / 2,
    w: l,
    h: d,
    z: t.nextZ(),
    data: { src: n.url }
  };
  t.addNode(y), t.select(y.id);
}
function Cf({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  baseUrl: n
}) {
  const s = te(), { labels: i } = Jt(), l = pt(null), d = pt(null), [c, a] = ot(""), [f, p] = ot([]), [y, u] = ot(!1), [m, g] = ot(1), [x, b] = ot(!1), w = pt();
  li(e && !!r, r, l, [
    f.length,
    y
  ]), St(() => {
    if (!e) return;
    const E = (L) => {
      l.current && !l.current.contains(L.target) && o();
    };
    return document.addEventListener("pointerdown", E), () => document.removeEventListener("pointerdown", E);
  }, [e, o]), St(() => {
    if (!e || c.trim()) return;
    const E = new AbortController();
    return u(!0), ca(n, 1, 30, E.signal).then((L) => {
      p(L.data.data.filter((F) => F.type !== "ad")), g(1), b(L.data.has_next);
    }).catch(() => {
    }).finally(() => u(!1)), () => E.abort();
  }, [e, n, c]);
  const T = ct(
    (E, L, F) => {
      if (!E.trim()) return;
      const X = new AbortController();
      return u(!0), Mf(n, E, L, 30, X.signal).then((tt) => {
        const et = tt.data.data.filter((ft) => ft.type !== "ad");
        p((ft) => F ? [...ft, ...et] : et), g(L), b(tt.data.has_next);
      }).catch(() => {
      }).finally(() => u(!1)), X;
    },
    [n]
  ), k = ct(
    (E) => {
      if (a(E), w.current && clearTimeout(w.current), !E.trim()) {
        p([]), g(1), b(!1);
        return;
      }
      w.current = setTimeout(() => {
        T(E, 1, !1);
      }, 350);
    },
    [T]
  ), M = ct(() => {
    const E = d.current;
    !E || y || !x || E.scrollTop + E.clientHeight >= E.scrollHeight - 100 && (c.trim() ? T(c, m + 1, !0) : (u(!0), ca(n, m + 1, 30).then((L) => {
      const F = L.data.data.filter((X) => X.type !== "ad");
      p((X) => [...X, ...F]), g(m + 1), b(L.data.has_next);
    }).catch(() => {
    }).finally(() => u(!1))));
  }, [y, x, c, m, T, n]), C = ct(
    (E) => {
      Vl(t, E);
    },
    [t]
  );
  return !e || !r ? null : Xe(
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
                onChange: (E) => k(E.target.value),
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
                f.length === 0 && !y ? /* @__PURE__ */ h(
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
                    children: f.map((E) => /* @__PURE__ */ h(
                      If,
                      {
                        item: E,
                        onClick: () => C(E),
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
function If({
  item: t,
  onClick: e,
  engine: o,
  theme: r
}) {
  const n = t.file.sm.webp, s = n.width / n.height, i = pt(0), l = ct(
    (a) => {
      a.dataTransfer.setData(Os, JSON.stringify(t)), a.dataTransfer.effectAllowed = "copy";
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
function Tf({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [r, n] = ot(""), s = pt(null), i = pt(null);
  St(() => {
    var f;
    (f = s.current) == null || f.focus();
  }, []);
  const l = Kt(() => ci(t, 56), [t]), d = ct(() => {
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
  return Xe(
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
const xr = br(
  null
);
function Dn(t, e) {
  const o = pt(null), r = pt(0), n = ct(() => (o.current || (o.current = `${e}:${++r.current}`), o.current), [e]);
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
  }, [t]), n;
}
function Vs(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function zf(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Xl(t, e, o, r) {
  return new Promise((n) => {
    const s = zf(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, a = i.naturalHeight || 200;
      if (c <= 1 || a <= 1) {
        const f = t.match(/viewBox=["']([^"']+)["']/i);
        if (f) {
          const p = f[1].trim().split(/[\s,]+/).map(Number);
          p.length === 4 && p[2] > 0 && p[3] > 0 && (c = p[2], a = p[3]);
        }
      }
      if (c > 400 || a > 400) {
        const f = Math.min(400 / c, 400 / a);
        c = Math.round(c * f), a = Math.round(a * f);
      }
      n({
        id: Ht(10),
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
async function Af(t, e, o, r) {
  const { x: n, y: s } = t.screenToCanvas(o, r), i = await Xl(e, n, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
function Ef() {
  if (typeof navigator > "u") return !1;
  const t = navigator.userAgent, e = /iPhone|iPad|iPod/i.test(t);
  return /Chrome|Chromium|EdgA?|OPR|Brave/i.test(t) && !e || /Firefox/i.test(t) ? !1 : e ? !0 : /Safari/i.test(t) && !/Chrome|Chromium|Edg/i.test(t);
}
function Pf(t) {
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
function Hf(t) {
  return !Number.isFinite(t) || t < 0 ? "" : t < 0.05 ? "<0.05 ms" : t < 10 ? `${t < 1 ? t.toFixed(2) : t.toFixed(1)} ms` : `${Math.round(t)} ms`;
}
function Lf(t, e, o) {
  if (!t || !o || !e.id) return null;
  const r = t.get(e.type), n = ye(r, e);
  if (!n) return null;
  for (const s of n) {
    if (s.direction !== "output" || s.id !== "error" && s.id !== "err") continue;
    const i = o(e.id, s.id), l = i != null && i !== void 0 ? String(i).trim() : "";
    if (l) return l.length > 200 ? `${l.slice(0, 197)}…` : l;
  }
  return null;
}
function Df(t, e, o, r) {
  if (t.length === 0) return null;
  const n = 13 / r, s = 7 / r, i = 5 / r, l = 6 / r, d = Math.max(...t.map((f) => f.text.length), 1), c = Math.min(d * l + s * 2, 280 / r), a = t.length * n + i * 2;
  return {
    w: c,
    h: a,
    x0: e - c / 2,
    y0: o - a / 2
  };
}
const da = {
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
}, Rf = De(function({
  node: e,
  zoom: o,
  showHandles: r = !0,
  measuredHeights: n,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const l = e.h === "auto" ? (n == null ? void 0 : n[e.id]) ?? 100 : e.h, d = e.rotation || 0, c = e.x + e.w / 2, a = e.y + l / 2, f = 8 / o, p = f / 2, y = 25 / o, u = !!e.locked, m = [
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
        x: x - p,
        y: b - p,
        width: f,
        height: f,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: zn(g, d),
          pointerEvents: "auto"
        },
        onPointerDown: (w) => {
          w.stopPropagation(), s == null || s(e.id, g, w);
        }
      },
      g
    )),
    r && !u && /* @__PURE__ */ S(Mt, { children: [
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
          x: e.x + e.w / 2 - p,
          y: e.y - y - p,
          width: f,
          height: f,
          rx: 1.5 / o,
          transform: `rotate(45, ${e.x + e.w / 2}, ${e.y - y})`,
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
}), Wf = De(function({
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
  cycleNodeIds: p,
  dataFlowEdgeOverlay: y = "off",
  getLastComputeMs: u,
  getDataFlowPortValue: m,
  interactionMode: g
}) {
  const x = e.data.edgeType || "bezier";
  let b, w;
  if (l && e.data.sourcePort) {
    const yt = l.get(o.type), Lt = ye(yt, o);
    Lt && (b = Ee(o, Lt, e.data.sourcePort, n.zoom, i, yt.portAnchor ?? "bbox") ?? void 0);
  }
  if (l && e.data.targetPort) {
    const yt = l.get(r.type), Lt = ye(yt, r);
    Lt && (w = Ee(r, Lt, e.data.targetPort, n.zoom, i, yt.portAnchor ?? "bbox") ?? void 0);
  }
  const T = Pe(
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
  ), { path: k, x1: M, y1: C, x2: E, y2: L, labelX: F, labelY: X, arrowAngle: tt, tailAngle: et, kinkHandle: ft } = T, Ct = s.has(e.id), xt = e.data.strokeWidth, W = e.data.style === "dashed" ? `${8 * xt},${4 * xt}` : e.data.style === "dotted" ? `${2 * xt},${3 * xt}` : void 0, R = Math.max(8, xt * 3), K = e.data.arrowHeadSize ?? R, q = e.data.arrowTailSize ?? R, ut = e.data.animated, j = f == null ? void 0 : f.has(e.id), $ = (a == null ? void 0 : a.edgeId) === e.id, at = !!(p && p.size > 0 && e.data.sourcePort && e.data.targetPort && p.has(e.data.fromId) && p.has(e.data.toId)), rt = at ? "#ef4444" : e.data.color, _ = e.data.roughness ?? 0, H = Kt(() => _ <= 0 ? null : {
    stroke: rt,
    roughness: _,
    strokeWidth: xt,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [rt, _, xt, e.data.style, e.id]);
  let it = null, dt = null, st = null;
  H && (it = ls(k, H), e.data.arrowHead === "arrow" && (dt = ls(wo(E, L, tt, K), { ...H, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (st = ls(wo(M, C, et, q), { ...H, strokeLineDash: void 0 })));
  const ht = Kt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), gt = Kt(() => {
    if (!ut) return;
    const yt = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", Lt = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", Wt = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${yt} ${Lt} ${Wt} infinite` };
  }, [ut, e.data.animatedDirection]), vt = Kt(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), Et = Kt(
    () => j ? { filter: "saturate(0)" } : void 0,
    [j]
  ), Rt = Kt(() => {
    var oe;
    const yt = y ?? "off", Lt = (oe = e.data.label) == null ? void 0 : oe.trim(), Wt = [];
    if (Lt && Wt.push({ text: Lt, primary: !0 }), yt !== "off" && zs(r) && e.data.sourcePort && e.data.targetPort && Wt.push({
      text: `${e.data.sourcePort} → ${e.data.targetPort}`,
      primary: !Lt
    }), yt === "ports+compute" && zs(r) && u && e.data.toId) {
      const se = u(e.data.toId);
      se != null && Number.isFinite(se) && Wt.push({ text: `compute ${Hf(se)}`, primary: !1 });
    }
    return Wt;
  }, [
    y,
    e.data.label,
    e.data.sourcePort,
    e.data.targetPort,
    e.data.toId,
    u,
    r
  ]), At = Kt(
    () => e.data.sourcePort && e.data.targetPort ? Lf(l, r, m) : null,
    [
      l,
      r,
      e.data.sourcePort,
      e.data.targetPort,
      m
    ]
  );
  return /* @__PURE__ */ S("g", { opacity: $ ? 0.15 : j ? 0.25 : void 0, style: Et, children: [
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
    at && /* @__PURE__ */ h(
      "path",
      {
        d: k,
        stroke: "#ef4444",
        strokeWidth: xt + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: ht
      }
    ),
    Ct && /* @__PURE__ */ h(
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
    it ? it.map((yt, Lt) => /* @__PURE__ */ h(
      "path",
      {
        d: yt.d,
        stroke: yt.stroke,
        strokeWidth: yt.strokeWidth,
        strokeDasharray: yt.strokeDasharray,
        strokeLinecap: "round",
        fill: yt.fill ?? "none",
        style: ut ? gt : void 0
      },
      Lt
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: k,
        stroke: rt,
        strokeWidth: xt,
        strokeDasharray: ut ? "12,8" : at ? `${6 * xt},${4 * xt}` : W,
        strokeLinecap: "round",
        fill: "none",
        style: at ? vt : gt
      }
    ),
    e.data.arrowHead === "arrow" && (dt ? dt.map((yt, Lt) => /* @__PURE__ */ h(
      "path",
      {
        d: yt.d,
        stroke: yt.stroke,
        strokeWidth: yt.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: yt.fill ?? "none"
      },
      `ah${Lt}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: wo(E, L, tt, K),
        fill: "none",
        stroke: rt,
        strokeWidth: xt,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: xn(E, L, tt, K),
        fill: rt,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: E,
        cy: L,
        r: K * 0.25,
        fill: rt
      }
    ),
    e.data.arrowTail === "arrow" && (st ? st.map((yt, Lt) => /* @__PURE__ */ h(
      "path",
      {
        d: yt.d,
        stroke: yt.stroke,
        strokeWidth: yt.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: yt.fill ?? "none"
      },
      `at${Lt}`
    )) : /* @__PURE__ */ h(
      "path",
      {
        d: wo(M, C, et, q),
        fill: "none",
        stroke: rt,
        strokeWidth: xt,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ h(
      "path",
      {
        d: xn(M, C, et, q),
        fill: rt,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ h(
      "circle",
      {
        cx: M,
        cy: C,
        r: q * 0.25,
        fill: rt
      }
    ),
    (() => {
      const yt = n.zoom, Lt = 13 / yt, Wt = 5 / yt, oe = 11 / yt, se = 10 / yt, ne = Df(Rt, F, X, yt), mt = 9 / yt, le = !!At, he = ne ? ne.x0 + ne.w + mt + 4 / yt : F + mt + 4 / yt, pe = X;
      return /* @__PURE__ */ S(Mt, { children: [
        ne && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ h(
            "rect",
            {
              x: ne.x0,
              y: ne.y0,
              width: ne.w,
              height: ne.h,
              fill: "white",
              rx: 4 / yt,
              opacity: 0.92
            }
          ),
          Rt.map((me, ge) => /* @__PURE__ */ h(
            "text",
            {
              x: F,
              y: ne.y0 + Wt + (ge + 0.78) * Lt,
              fill: me.primary ? rt : "#64748b",
              fontSize: me.primary ? oe : se,
              textAnchor: "middle",
              style: { pointerEvents: "none" },
              children: me.text
            },
            ge
          ))
        ] }),
        le && /* @__PURE__ */ S("g", { style: { pointerEvents: "auto" }, children: [
          /* @__PURE__ */ h("title", { children: At }),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: he,
              cy: pe,
              r: mt,
              fill: "#ea580c",
              stroke: "#fff",
              strokeWidth: 1.25 / yt
            }
          ),
          /* @__PURE__ */ h(
            "text",
            {
              x: he,
              y: pe + 3.5 / yt,
              fill: "#fff",
              fontSize: 11 / yt,
              fontWeight: 800,
              textAnchor: "middle",
              style: { pointerEvents: "none" },
              children: "!"
            }
          )
        ] })
      ] });
    })(),
    Ct && !$ && /* @__PURE__ */ S(Mt, { children: [
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
          onPointerDown: (yt) => {
            yt.stopPropagation(), d == null || d(e.id, "source", yt);
          }
        }
      ),
      /* @__PURE__ */ h(
        "circle",
        {
          cx: E,
          cy: L,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (yt) => {
            yt.stopPropagation(), d == null || d(e.id, "target", yt);
          }
        }
      )
    ] }),
    Ct && !$ && ft && /* @__PURE__ */ h(
      "circle",
      {
        cx: ft.x,
        cy: ft.y,
        r: 5 / n.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / n.zoom,
        style: {
          cursor: ft.axis === "xy" ? "move" : ft.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (yt) => {
          yt.stopPropagation(), c == null || c(e.id, ft.axis, ft.min, ft.max, yt);
        }
      }
    )
  ] });
});
function Ff({
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
  edgePreview: p,
  edgeReconnect: y,
  eraserMarkedIds: u,
  eraserTrail: m,
  laserTrail: g,
  mode: x,
  freeFormEdges: b,
  hoveredNodeId: w,
  cursorCanvasPos: T,
  registry: k,
  onPortHandleDown: M,
  cycleNodeIds: C,
  dataFlowEdgeOverlay: E = "off",
  getLastComputeMs: L,
  getDataFlowPortValue: F,
  containerTypes: X,
  alignGuides: tt,
  suppressNodeOverlayId: et
}) {
  const ft = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, Ct = t.filter(
    (R) => R.type !== "edge" && R.type !== "content" && R.type !== "image"
  ), xt = t.filter((R) => R.type === "edge").sort((R, K) => R.z - K.z), W = Kt(() => new Map(t.map((R) => [R.id, R])), [t]);
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
      children: /* @__PURE__ */ S("g", { transform: ft, children: [
        xt.map((R) => {
          const K = W.get(R.data.fromId), q = W.get(R.data.toId);
          return !K || !q ? null : /* @__PURE__ */ h(
            Wf,
            {
              edge: R,
              fromNode: K,
              toNode: q,
              viewport: e,
              selection: o,
              measuredHeights: r,
              registry: k,
              onEdgeEndpointDown: a,
              onKinkHandleDown: f,
              edgeReconnect: y,
              eraserMarkedIds: u,
              cycleNodeIds: C,
              dataFlowEdgeOverlay: E,
              getLastComputeMs: L,
              getDataFlowPortValue: F,
              interactionMode: x
            },
            R.id
          );
        }),
        x === "edge" && !p && w && T && (() => {
          const R = W.get(w);
          if (!R || R.type === "edge") return null;
          const K = Fe(R, T.x, T.y, r), q = 4 / e.zoom;
          return /* @__PURE__ */ h("circle", { cx: K.x, cy: K.y, r: q, fill: "#3b82f6", stroke: "white", strokeWidth: 1.5 / e.zoom });
        })(),
        (() => {
          const R = !!p || !!y, K = (p == null ? void 0 : p.cursorX) ?? (y == null ? void 0 : y.cursorX) ?? 0, q = (p == null ? void 0 : p.cursorY) ?? (y == null ? void 0 : y.cursorY) ?? 0, ut = (p == null ? void 0 : p.fromNode.id) ?? (y == null ? void 0 : y.anchorNodeId) ?? null;
          let j = null, $ = null, at = null;
          const rt = /* @__PURE__ */ new Set();
          if (R) {
            let H = 1 / 0, it = !1;
            const dt = 50 / e.zoom;
            for (const st of t) {
              if (st.type === "edge" || st.id === ut || pr(k == null ? void 0 : k.get(st.type))) continue;
              const ht = st.h === "auto" ? (r == null ? void 0 : r[st.id]) ?? 100 : st.h, gt = st.w * 0.2, vt = ht * 0.2;
              K >= st.x - gt && K <= st.x + st.w + gt && q >= st.y - vt && q <= st.y + ht + vt && rt.add(st.id);
              const Et = Is(st, r), Rt = X ? X.has(st.type) : st.type === "frame";
              for (const At of Et) {
                const yt = Math.hypot(At.x - K, At.y - q);
                yt >= dt || Rt && !it && j || (!Rt && it || yt < H) && (H = yt, it = Rt, j = st.id, $ = At.side);
              }
            }
            if (b && j) {
              const st = W.get(j);
              if (st) {
                const ht = Fe(st, K, q, r);
                at = { x: ht.x, y: ht.y };
              }
            }
          }
          const _ = [];
          return b && R && at && _.push(
            /* @__PURE__ */ h(
              "circle",
              {
                cx: at.x,
                cy: at.y,
                r: 5 / e.zoom,
                fill: "#3b82f6",
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              },
              "freeform-snap-dot"
            )
          ), t.filter((H) => H.type === "edge" || et && H.id === et || pr(k == null ? void 0 : k.get(H.type)) || b && H.type === "image" ? !1 : o.size <= 1 && o.has(H.id) || !b && R && (H.id === ut || rt.has(H.id))).forEach((H) => {
            const it = Is(H, r), dt = 4 / e.zoom, st = 26 / e.zoom, ht = H.rotation || 0, gt = H.h === "auto" ? (r == null ? void 0 : r[H.id]) ?? 100 : H.h, vt = H.x + H.w / 2, Et = H.y + gt / 2, Rt = p && p.fromNode.id === H.id || y && y.anchorNodeId === H.id, At = o.has(H.id) && !R;
            b ? At && _.push(
              /* @__PURE__ */ h("g", { transform: ht ? `rotate(${ht}, ${vt}, ${Et})` : void 0, children: it.map(({ side: yt }) => {
                const Lt = {
                  top: [H.x + H.w / 2, H.y],
                  bottom: [H.x + H.w / 2, H.y + gt],
                  left: [H.x, H.y + gt / 2],
                  right: [H.x + H.w, H.y + gt / 2]
                }, [Wt, oe] = Lt[yt];
                return /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: Wt,
                    cy: oe,
                    r: dt,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.8,
                    style: { cursor: "crosshair", pointerEvents: "auto" },
                    onPointerDown: (se) => {
                      se.stopPropagation(), c == null || c(H.id, yt, se);
                    }
                  },
                  `ch-${H.id}-${yt}`
                );
              }) }, `conn-${H.id}`)
            ) : _.push(
              /* @__PURE__ */ h("g", { transform: ht ? `rotate(${ht}, ${vt}, ${Et})` : void 0, children: it.map(({ side: yt }) => {
                const Lt = {
                  top: [H.x + H.w / 2, H.y],
                  bottom: [H.x + H.w / 2, H.y + gt],
                  left: [H.x, H.y + gt / 2],
                  right: [H.x + H.w, H.y + gt / 2]
                }, [Wt, oe] = Lt[yt], se = yt === "top" && o.has(H.id) ? 42 / e.zoom : st;
                let ne = Wt, mt = oe;
                switch (yt) {
                  case "top":
                    mt = oe - se;
                    break;
                  case "bottom":
                    mt = oe + se;
                    break;
                  case "left":
                    ne = Wt - se;
                    break;
                  case "right":
                    ne = Wt + se;
                    break;
                }
                const le = R && j === H.id && $ === yt;
                return /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: ne,
                    cy: mt,
                    r: le ? 5 / e.zoom : dt,
                    fill: Rt || le ? "#3b82f6" : "white",
                    stroke: le ? "white" : R && !Rt ? "#3b82f6" : "#94a3b8",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: le || R && !Rt ? 1 : 0.8,
                    style: {
                      cursor: At ? "crosshair" : "default",
                      pointerEvents: At ? "auto" : "none"
                    },
                    onPointerDown: At ? (he) => {
                      he.stopPropagation(), c == null || c(H.id, yt, he);
                    } : void 0
                  },
                  `ch-${H.id}-${yt}`
                );
              }) }, `conn-${H.id}`)
            );
          }), _;
        })(),
        k && (() => {
          const R = !!p || !!y, K = (p == null ? void 0 : p.cursorX) ?? (y == null ? void 0 : y.cursorX) ?? 0, q = (p == null ? void 0 : p.cursorY) ?? (y == null ? void 0 : y.cursorY) ?? 0, ut = (p == null ? void 0 : p.fromNode.id) ?? null, j = (p == null ? void 0 : p.sourceDirection) === "output" ? "input" : (p == null ? void 0 : p.sourceDirection) === "input" ? "output" : null;
          let $ = null, at = null;
          if (R && j) {
            const rt = Ed / e.zoom;
            let _ = 1 / 0;
            for (const H of t) {
              if (H.type === "edge" || H.id === ut) continue;
              const it = k.get(H.type), dt = ye(it, H);
              if (!(dt != null && dt.length)) continue;
              const st = dt.filter((ht) => ht.direction === j);
              for (const ht of st) {
                const gt = Ee(
                  H,
                  dt,
                  ht.id,
                  e.zoom,
                  r,
                  it.portAnchor ?? "bbox"
                );
                if (!gt) continue;
                const vt = Math.hypot(gt.x - K, gt.y - q);
                vt <= rt && vt < _ && (_ = vt, $ = H.id, at = ht.id);
              }
            }
          }
          return t.filter((rt) => {
            if (rt.type === "edge" || et && rt.id === et) return !1;
            const _ = k.get(rt.type);
            return pr(_);
          }).map((rt) => {
            const _ = k.get(rt.type), H = ye(_, rt), it = rt.h === "auto" ? (r == null ? void 0 : r[rt.id]) ?? 100 : rt.h, dt = rt.rotation || 0, st = rt.x + rt.w / 2, ht = rt.y + it / 2, gt = 6 / e.zoom, vt = _.portAnchor ?? "bbox", Et = H.filter((Wt) => Wt.direction === "input"), Rt = H.filter((Wt) => Wt.direction === "output"), At = !R, yt = (Wt, oe, se, ne) => {
              const mt = Ua(
                rt,
                H,
                Wt.id,
                e.zoom,
                r,
                vt
              );
              if (!mt) return null;
              const { px: le, py: he } = mt, pe = Hd(
                rt,
                ne,
                { x: le, y: he },
                r,
                vt
              ), me = da[Wt.dataType] || da.any, ge = $ === rt.id && at === Wt.id, to = ge ? 8 / e.zoom : gt, Ue = 2.5 / e.zoom, Ho = ne === "input" ? le - gt - Ue : le + gt + Ue;
              return /* @__PURE__ */ S("g", { children: [
                /* @__PURE__ */ h(
                  "line",
                  {
                    x1: le,
                    y1: he,
                    x2: pe.x,
                    y2: pe.y,
                    stroke: me,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                ge && /* @__PURE__ */ h(
                  "circle",
                  {
                    cx: le,
                    cy: he,
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
                    cx: le,
                    cy: he,
                    r: to,
                    fill: ge ? "white" : me,
                    stroke: ge ? me : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: At ? "crosshair" : "default",
                      pointerEvents: At ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: At ? (Ne) => {
                      Ne.stopPropagation(), M == null || M(rt.id, Wt.id, ne, Ne);
                    } : void 0
                  }
                ),
                (() => {
                  const Ne = Wt.label || Wt.id, I = 9 / e.zoom, lt = 5 / e.zoom, ce = 2.5 / e.zoom, we = Ne.length * I * 0.62 + lt * 2, ue = I + ce * 2, Ge = ne === "input" ? Ho - we : Ho, qt = he - ue / 2, Ye = ue / 2, Jo = ge ? me : "#1a1a2e", wr = ge ? me : "#2a2a40", Lo = ge ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ h(
                      "rect",
                      {
                        x: Ge,
                        y: qt,
                        width: we,
                        height: ue,
                        rx: Ye,
                        ry: Ye,
                        fill: Jo,
                        fillOpacity: ge ? 0.9 : 0.85,
                        stroke: wr,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ h(
                      "text",
                      {
                        x: Ge + we / 2,
                        y: he + I * 0.35,
                        fill: Lo,
                        fontSize: I,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: Ne
                      }
                    )
                  ] });
                })()
              ] }, `port-${rt.id}-${Wt.id}`);
            }, Lt = C == null ? void 0 : C.has(rt.id);
            return /* @__PURE__ */ S("g", { transform: dt ? `rotate(${dt}, ${st}, ${ht})` : void 0, children: [
              Et.map((Wt, oe) => yt(Wt, oe, Et, "input")),
              Rt.map((Wt, oe) => yt(Wt, oe, Rt, "output")),
              Lt && (() => {
                const Wt = 10 / e.zoom, oe = rt.x + rt.w + Wt * 0.3, se = rt.y - Wt * 0.3;
                return /* @__PURE__ */ S("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: oe,
                      cy: se,
                      r: Wt,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ h(
                    "text",
                    {
                      x: oe,
                      y: se + 4 / e.zoom,
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
            ] }, `ports-${rt.id}`);
          });
        })(),
        p && (() => {
          const R = p.cursorX, K = p.cursorY, q = p.edgeColor || "#3b82f6", ut = p.edgeStrokeWidth || 2, j = p.edgeStyle || "solid", $ = j === "dashed" ? `${8 * ut},${4 * ut}` : j === "dotted" ? `${2 * ut},${3 * ut}` : void 0, at = Math.max(8, ut * 3), rt = 4 / e.zoom, _ = k == null ? void 0 : k.get(p.fromNode.type), H = ye(_, p.fromNode), it = p.sourcePort && H ? Ee(
            p.fromNode,
            H,
            p.sourcePort,
            e.zoom,
            r,
            _.portAnchor ?? "bbox"
          ) ?? void 0 : void 0, dt = p.sourcePort && H ? H.find((ne) => ne.id === p.sourcePort) : void 0, st = p.sourceDirection === "output" ? "input" : p.sourceDirection === "input" ? "output" : null;
          let ht = null, gt, vt = null;
          if (k && p.sourcePort && st && dt) {
            const ne = Qs / e.zoom;
            let mt = 1 / 0;
            for (const le of t) {
              if (le.type === "edge" || le.id === p.fromNode.id) continue;
              const he = k.get(le.type), pe = ye(he, le);
              if (!(pe != null && pe.length)) continue;
              const me = pe.filter((ge) => ge.direction === st);
              for (const ge of me) {
                if (dt.dataType !== "any" && ge.dataType !== "any" && dt.dataType !== ge.dataType)
                  continue;
                const to = Ee(
                  le,
                  pe,
                  ge.id,
                  e.zoom,
                  r,
                  he.portAnchor ?? "bbox"
                );
                if (!to) continue;
                const Ue = Math.hypot(to.x - R, to.y - K);
                Ue < ne && Ue < mt && (mt = Ue, ht = le, vt = ge.id);
              }
            }
          }
          if (!vt) {
            const ne = 50 / e.zoom;
            for (const mt of t) {
              if (mt.type === "edge" || mt.id === p.fromNode.id) continue;
              const le = mt.h === "auto" ? (r == null ? void 0 : r[mt.id]) ?? 100 : mt.h, he = mt.w * 0.2, pe = le * 0.2;
              if (R >= mt.x - he && R <= mt.x + mt.w + he && K >= mt.y - pe && K <= mt.y + le + pe) {
                const me = Fe(mt, R, K, r);
                if (Math.hypot(me.x - R, me.y - K) < ne) {
                  ht = mt, gt = me.t;
                  break;
                }
              }
            }
          }
          const Et = ht ? k == null ? void 0 : k.get(ht.type) : void 0, Rt = ye(Et, ht ?? void 0), At = ht && vt && Rt ? Ee(
            ht,
            Rt,
            vt,
            e.zoom,
            r,
            Et.portAnchor ?? "bbox"
          ) ?? void 0 : void 0, yt = it ? void 0 : p.sourceT, Lt = At ? void 0 : gt;
          let Wt;
          if (ht)
            Wt = Pe(
              p.fromNode,
              ht,
              p.edgeType || "bezier",
              r,
              p.sourceHandle,
              void 0,
              void 0,
              void 0,
              it,
              At,
              yt,
              Lt,
              p.attachmentGap
            );
          else {
            const ne = {
              id: "__preview__",
              type: "shape",
              x: R,
              y: K,
              w: 0,
              h: 0,
              data: { shape: "rect", stroke: "#000", strokeWidth: 1, roughness: 0 }
            };
            Wt = Pe(
              p.fromNode,
              ne,
              p.edgeType || "bezier",
              r,
              p.sourceHandle,
              void 0,
              void 0,
              void 0,
              it,
              void 0,
              yt,
              void 0,
              p.attachmentGap
            );
          }
          const oe = !it, se = !!(ht && !At);
          return /* @__PURE__ */ S("g", { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: Wt.path,
                stroke: q,
                strokeWidth: ut,
                strokeDasharray: $,
                strokeLinecap: "round",
                fill: "none"
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: wo(Wt.x2, Wt.y2, Wt.arrowAngle, at),
                fill: "none",
                stroke: q,
                strokeWidth: ut,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            oe && /* @__PURE__ */ h(
              "circle",
              {
                cx: Wt.x1,
                cy: Wt.y1,
                r: rt,
                fill: q,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            ),
            se && /* @__PURE__ */ h(
              "circle",
              {
                cx: Wt.x2,
                cy: Wt.y2,
                r: rt,
                fill: q,
                stroke: "white",
                strokeWidth: 1.5 / e.zoom
              }
            )
          ] });
        })(),
        y && (() => {
          const R = W.get(y.anchorNodeId);
          if (!R) return null;
          let K, q;
          if (y.anchorHandle) {
            const ut = R.h === "auto" ? (r == null ? void 0 : r[R.id]) ?? 100 : R.h, j = {
              top: [R.x + R.w / 2, R.y],
              bottom: [R.x + R.w / 2, R.y + ut],
              left: [R.x, R.y + ut / 2],
              right: [R.x + R.w, R.y + ut / 2]
            }, $ = y.anchorHandle, at = $ === "top" ? 42 / e.zoom : 26 / e.zoom, [rt, _] = j[$];
            let H = rt, it = _;
            switch ($) {
              case "top":
                it = _ - at;
                break;
              case "bottom":
                it = _ + at;
                break;
              case "left":
                H = rt - at;
                break;
              case "right":
                H = rt + at;
                break;
            }
            if (R.rotation) {
              const dt = R.x + R.w / 2, st = R.y + ut / 2, ht = R.rotation * Math.PI / 180, gt = Math.cos(ht), vt = Math.sin(ht), Et = H - dt, Rt = it - st;
              K = dt + Et * gt - Rt * vt, q = st + Et * vt + Rt * gt;
            } else
              K = H, q = it;
          } else {
            const ut = Yd(R, y.cursorX, y.cursorY, r);
            K = ut.x, q = ut.y;
          }
          return /* @__PURE__ */ h(
            "line",
            {
              x1: K,
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
        o.size === 1 && x !== "edge" && !p && !y && Ct.filter((R) => o.has(R.id)).map((R) => /* @__PURE__ */ h(
          Rf,
          {
            node: R,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: r,
            onHandlePointerDown: l,
            onRotateStart: d
          },
          `sel-${R.id}`
        )),
        n && n.points.length > 1 && (() => {
          const R = n.strokeStyle === "dashed" || n.strokeStyle === "dotted", K = n.opacity ?? 1;
          if (R) {
            const q = n.points, ut = ["M", q[0][0], q[0][1]];
            for (let at = 1; at < q.length; at++) {
              const [rt, _] = q[at], [H, it] = q[at - 1];
              ut.push("Q", H, it, (H + rt) / 2, (it + _) / 2);
            }
            const j = q[q.length - 1];
            ut.push("L", j[0], j[1]);
            const $ = ao(n.strokeStyle);
            return /* @__PURE__ */ h(
              "path",
              {
                d: ut.join(" "),
                fill: "none",
                stroke: n.color,
                strokeWidth: n.width,
                strokeDasharray: $ == null ? void 0 : $.map((at) => at * Math.max(n.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: K
              }
            );
          }
          return /* @__PURE__ */ h(
            "path",
            {
              d: ti(n.points, {
                size: n.width
              }),
              fill: n.color,
              opacity: K
            }
          );
        })(),
        s && i && (() => {
          const R = Math.min(s.startX, s.endX), K = Math.min(s.startY, s.endY), q = Math.abs(s.endX - s.startX), ut = Math.abs(s.endY - s.startY);
          if (q < 2 && ut < 2) return null;
          const j = i, $ = j.shapeType || "rect", at = j.opacity ?? 1, rt = ao(j.strokeStyle), _ = j.edgeStyle === "round", H = s.startX, it = s.startY, dt = s.endX, st = s.endY, ht = {
            stroke: j.stroke,
            fill: j.fill,
            fillStyle: j.fillStyle,
            roughness: j.roughness,
            strokeWidth: j.strokeWidth,
            strokeLineDash: rt,
            seed: "__preview__"
          };
          let gt = null;
          if (j.roughness > 0)
            switch ($) {
              case "rect":
                gt = Nr(0, 0, q, ut, ht, _);
                break;
              case "ellipse":
                gt = En(q / 2, ut / 2, q, ut, ht);
                break;
              case "diamond":
                gt = Pn(0, 0, q, ut, ht, _);
                break;
              case "line":
                gt = Xo(0, st - it > 0 ? 0 : ut, q, st - it > 0 ? ut : 0, ht);
                break;
              case "arrow":
                gt = Hn(0, st - it > 0 ? 0 : ut, q, st - it > 0 ? ut : 0, ht);
                break;
            }
          if (gt) {
            const At = $ === "line" || $ === "arrow" ? Math.min(H, dt) : R, yt = $ === "line" || $ === "arrow" ? Math.min(it, st) : K;
            return /* @__PURE__ */ h("g", { transform: `translate(${At}, ${yt})`, opacity: at, children: gt.map((Lt, Wt) => /* @__PURE__ */ h(
              "path",
              {
                d: Lt.d,
                stroke: Lt.stroke,
                strokeWidth: Lt.strokeWidth,
                fill: Lt.fill,
                strokeDasharray: Lt.strokeDasharray,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              Wt
            )) });
          }
          const vt = rt == null ? void 0 : rt.join(","), Et = j.fill || "none";
          if ($ === "ellipse")
            return /* @__PURE__ */ h(
              "ellipse",
              {
                cx: R + q / 2,
                cy: K + ut / 2,
                rx: q / 2,
                ry: ut / 2,
                stroke: j.stroke,
                strokeWidth: j.strokeWidth,
                fill: Et,
                strokeDasharray: vt,
                opacity: at
              }
            );
          if ($ === "diamond")
            return /* @__PURE__ */ h(
              "polygon",
              {
                points: `${R + q / 2},${K} ${R + q},${K + ut / 2} ${R + q / 2},${K + ut} ${R},${K + ut / 2}`,
                stroke: j.stroke,
                strokeWidth: j.strokeWidth,
                fill: Et,
                strokeDasharray: vt,
                opacity: at
              }
            );
          if ($ === "line" || $ === "arrow")
            return /* @__PURE__ */ S("g", { opacity: at, children: [
              /* @__PURE__ */ h(
                "line",
                {
                  x1: H,
                  y1: it,
                  x2: dt,
                  y2: st,
                  stroke: j.stroke,
                  strokeWidth: j.strokeWidth,
                  strokeDasharray: vt
                }
              ),
              $ === "arrow" && (() => {
                const At = Math.atan2(st - it, dt - H), yt = Math.max(12, j.strokeWidth * 4), Lt = Math.PI / 6, Wt = dt - yt * Math.cos(At - Lt), oe = st - yt * Math.sin(At - Lt), se = dt - yt * Math.cos(At + Lt), ne = st - yt * Math.sin(At + Lt);
                return /* @__PURE__ */ h(
                  "polyline",
                  {
                    points: `${Wt},${oe} ${dt},${st} ${se},${ne}`,
                    stroke: j.stroke,
                    strokeWidth: j.strokeWidth,
                    fill: "none"
                  }
                );
              })()
            ] });
          const Rt = _ ? Qo(q, ut) : 0;
          return /* @__PURE__ */ h(
            "rect",
            {
              x: R,
              y: K,
              width: q,
              height: ut,
              rx: Rt || void 0,
              ry: Rt || void 0,
              stroke: j.stroke,
              strokeWidth: j.strokeWidth,
              fill: Et,
              strokeDasharray: vt,
              opacity: at
            }
          );
        })(),
        m && m.length > 1 && (() => {
          const R = Date.now(), K = 400, q = 6 / e.zoom, ut = [`M${m[0][0]},${m[0][1]}`];
          if (m.length === 2)
            ut.push(`L${m[1][0]},${m[1][1]}`);
          else {
            for (let dt = 0; dt < m.length - 1; dt++) {
              const st = (m[dt][0] + m[dt + 1][0]) / 2, ht = (m[dt][1] + m[dt + 1][1]) / 2;
              ut.push(`Q${m[dt][0]},${m[dt][1]},${st},${ht}`);
            }
            const it = m[m.length - 1];
            ut.push(`L${it[0]},${it[1]}`);
          }
          const j = ut.join(" "), $ = (R - m[m.length - 1][2]) / K, at = (R - m[0][2]) / K, rt = Math.max(0, 0.85 * (1 - $)), _ = Math.max(0, 0.85 * (1 - at)), H = (rt + _) / 2;
          return H <= 0 ? null : /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: j,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: q * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: H * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: j,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: q,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: H
              }
            )
          ] });
        })(),
        g && g.length > 1 && (() => {
          const R = performance.now(), K = 1560, q = 6 / e.zoom, ut = [];
          let j = !1, $ = !1;
          for (let ht = 0; ht < g.length; ht++) {
            const gt = g[ht];
            if (isNaN(gt[0])) {
              j = !1, $ = !1;
              continue;
            }
            if (!j)
              ut.push(`M${gt[0]},${gt[1]}`), j = !0, $ = !0;
            else if ($) {
              const vt = ht + 1 < g.length && !isNaN(g[ht + 1][0]) ? g[ht + 1] : null;
              if (vt) {
                const Et = (gt[0] + vt[0]) / 2, Rt = (gt[1] + vt[1]) / 2;
                ut.push(`Q${gt[0]},${gt[1]},${Et},${Rt}`);
              } else
                ut.push(`L${gt[0]},${gt[1]}`);
            }
          }
          if (ut.length === 0) return null;
          const at = ut.join(" "), rt = g.filter((ht) => !isNaN(ht[0]));
          if (rt.length === 0) return null;
          const _ = (R - rt[rt.length - 1][2]) / K, H = (R - rt[0][2]) / K, it = Math.max(0, 0.85 * (1 - _)), dt = Math.max(0, 0.85 * (1 - H)), st = (it + dt) / 2;
          return st <= 0 ? null : /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h(
              "path",
              {
                d: at,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: q * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: st * 0.35
              }
            ),
            /* @__PURE__ */ h(
              "path",
              {
                d: at,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: q,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: st
              }
            )
          ] });
        })(),
        tt && tt.length > 0 && tt.map((R, K) => /* @__PURE__ */ h(
          "line",
          {
            x1: R.axis === "x" ? R.position : R.start,
            y1: R.axis === "x" ? R.start : R.position,
            x2: R.axis === "x" ? R.position : R.end,
            y2: R.axis === "x" ? R.end : R.position,
            stroke: "#f472b6",
            strokeWidth: 1 / e.zoom,
            strokeDasharray: `${3 / e.zoom} ${2 / e.zoom}`,
            opacity: 0.8
          },
          `guide-${K}`
        ))
      ] })
    }
  );
}
function Bf({
  x: t,
  y: e,
  sections: o,
  onClose: r
}) {
  const n = pt(null);
  St(() => {
    var g;
    const y = (x) => {
      n.current && !n.current.contains(x.target) && r();
    }, u = (x) => {
      x.key === "Escape" && r();
    }, m = ((g = n.current) == null ? void 0 : g.ownerDocument) ?? document;
    return m.addEventListener("pointerdown", y, !0), m.addEventListener("keydown", u), () => {
      m.removeEventListener("pointerdown", y, !0), m.removeEventListener("keydown", u);
    };
  }, [r]);
  const s = typeof document < "u" ? document : null;
  Eo(() => {
    const y = n.current;
    if (!y) return;
    const u = y.ownerDocument.defaultView ?? window, m = () => {
      const x = y.getBoundingClientRect(), b = Ml(t, e, x.width, x.height, u);
      y.style.left = `${b.left}px`, y.style.top = `${b.top}px`;
    };
    m();
    const g = new ResizeObserver(m);
    return g.observe(y), u.addEventListener("resize", m), () => {
      g.disconnect(), u.removeEventListener("resize", m);
    };
  }, [t, e, o]);
  const i = ct(
    (y) => {
      y.kind === "header" || y.disabled || (y.action(), r());
    },
    [r]
  ), l = navigator.platform.includes("Mac"), d = l ? "⌘" : "Ctrl+", c = l ? "⌥" : "Alt+", a = l ? "⇧" : "Shift+", f = (y) => y.replace("Mod+", d).replace("Alt+", c).replace("Shift+", a), p = /* @__PURE__ */ h(
    "div",
    {
      "data-sb-context-menu": !0,
      ref: n,
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
      children: o.map((y, u) => /* @__PURE__ */ S("div", { children: [
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
        y.items.map(
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
  return s != null && s.body ? Xe(p, s.body) : p;
}
const Nf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M228,216a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,216Zm-92-48V80a20,20,0,0,1,20-20h36a20,20,0,0,1,20,20v88a20,20,0,0,1-20,20H156A20,20,0,0,1,136,168Zm24-4h28V84H160ZM44,168V40A20,20,0,0,1,64,20h36a20,20,0,0,1,20,20V168a20,20,0,0,1-20,20H64A20,20,0,0,1,44,168Zm24-4H96V44H68Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(
      "path",
      {
        d: "M200,80v96a8,8,0,0,1-8,8H152a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h40A8,8,0,0,1,200,80ZM104,32H64a8,8,0,0,0-8,8V176a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V40A8,8,0,0,0,104,32Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ J.createElement("path", { d: "M64,192h40a16,16,0,0,0,16-16V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V176A16,16,0,0,0,64,192ZM64,40h40V176H64ZM224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Zm-72-24h40a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v96A16,16,0,0,0,152,192Zm0-112h40v96H152Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Zm-72-24h40a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v96A16,16,0,0,0,152,192Zm-88,0h40a16,16,0,0,0,16-16V40a16,16,0,0,0-16-16H64A16,16,0,0,0,48,40V176A16,16,0,0,0,64,192Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M222,216a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,216Zm-84-40V80a14,14,0,0,1,14-14h40a14,14,0,0,1,14,14v96a14,14,0,0,1-14,14H152A14,14,0,0,1,138,176Zm12,0a2,2,0,0,0,2,2h40a2,2,0,0,0,2-2V80a2,2,0,0,0-2-2H152a2,2,0,0,0-2,2ZM50,176V40A14,14,0,0,1,64,26h40a14,14,0,0,1,14,14V176a14,14,0,0,1-14,14H64A14,14,0,0,1,50,176Zm12,0a2,2,0,0,0,2,2h40a2,2,0,0,0,2-2V40a2,2,0,0,0-2-2H64a2,2,0,0,0-2,2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,216a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,216Zm-88-40V80a16,16,0,0,1,16-16h40a16,16,0,0,1,16,16v96a16,16,0,0,1-16,16H152A16,16,0,0,1,136,176Zm16,0h40V80H152ZM48,176V40A16,16,0,0,1,64,24h40a16,16,0,0,1,16,16V176a16,16,0,0,1-16,16H64A16,16,0,0,1,48,176Zm16,0h40V40H64Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M220,216a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,216Zm-80-40V80a12,12,0,0,1,12-12h40a12,12,0,0,1,12,12v96a12,12,0,0,1-12,12H152A12,12,0,0,1,140,176Zm8,0a4,4,0,0,0,4,4h40a4,4,0,0,0,4-4V80a4,4,0,0,0-4-4H152a4,4,0,0,0-4,4Zm-96,0V40A12,12,0,0,1,64,28h40a12,12,0,0,1,12,12V176a12,12,0,0,1-12,12H64A12,12,0,0,1,52,176Zm8,0a4,4,0,0,0,4,4h40a4,4,0,0,0,4-4V40a4,4,0,0,0-4-4H64a4,4,0,0,0-4,4Z" }))
  ]
]), Of = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M208,136H140V120h44a20,20,0,0,0,20-20V60a20,20,0,0,0-20-20H140V32a12,12,0,0,0-24,0v8H72A20,20,0,0,0,52,60v40a20,20,0,0,0,20,20h44v16H48a20,20,0,0,0-20,20v40a20,20,0,0,0,20,20h68v8a12,12,0,0,0,24,0v-8h68a20,20,0,0,0,20-20V156A20,20,0,0,0,208,136ZM76,64H180V96H76ZM204,192H52V160H204Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(
      "path",
      {
        d: "M64,104V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H72A8,8,0,0,1,64,104Zm144,40H48a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V152A8,8,0,0,0,208,144Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ J.createElement("path", { d: "M208,136H136V120h48a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H136V32a8,8,0,0,0-16,0V48H72A16,16,0,0,0,56,64v40a16,16,0,0,0,16,16h48v16H48a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16h72v16a8,8,0,0,0,16,0V208h72a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136ZM72,64H184v40H72ZM208,192H48V152H208v40Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,152v40a16,16,0,0,1-16,16H136v16a8,8,0,0,1-16,0V208H48a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16h72V120H72a16,16,0,0,1-16-16V64A16,16,0,0,1,72,48h48V32a8,8,0,0,1,16,0V48h48a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H136v16h72A16,16,0,0,1,224,152Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M208,138H134V118h50a14,14,0,0,0,14-14V64a14,14,0,0,0-14-14H134V32a6,6,0,0,0-12,0V50H72A14,14,0,0,0,58,64v40a14,14,0,0,0,14,14h50v20H48a14,14,0,0,0-14,14v40a14,14,0,0,0,14,14h74v18a6,6,0,0,0,12,0V206h74a14,14,0,0,0,14-14V152A14,14,0,0,0,208,138ZM70,104V64a2,2,0,0,1,2-2H184a2,2,0,0,1,2,2v40a2,2,0,0,1-2,2H72A2,2,0,0,1,70,104Zm140,88a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V152a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M208,136H136V120h48a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H136V32a8,8,0,0,0-16,0V48H72A16,16,0,0,0,56,64v40a16,16,0,0,0,16,16h48v16H48a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16h72v16a8,8,0,0,0,16,0V208h72a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136ZM72,64H184v40H72ZM208,192H48V152H208v40Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M208,140H132V116h52a12,12,0,0,0,12-12V64a12,12,0,0,0-12-12H132V32a4,4,0,0,0-8,0V52H72A12,12,0,0,0,60,64v40a12,12,0,0,0,12,12h52v24H48a12,12,0,0,0-12,12v40a12,12,0,0,0,12,12h76v20a4,4,0,0,0,8,0V204h76a12,12,0,0,0,12-12V152A12,12,0,0,0,208,140ZM68,104V64a4,4,0,0,1,4-4H184a4,4,0,0,1,4,4v40a4,4,0,0,1-4,4H72A4,4,0,0,1,68,104Zm144,88a4,4,0,0,1-4,4H48a4,4,0,0,1-4-4V152a4,4,0,0,1,4-4H208a4,4,0,0,1,4,4Z" }))
  ]
]), Vf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,116h-8V72a20,20,0,0,0-20-20H156a20,20,0,0,0-20,20v44H120V48a20,20,0,0,0-20-20H60A20,20,0,0,0,40,48v68H32a12,12,0,0,0,0,24h8v68a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V140h16v44a20,20,0,0,0,20,20h40a20,20,0,0,0,20-20V140h8a12,12,0,0,0,0-24ZM96,204H64V52H96Zm96-24H160V76h32Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(
      "path",
      {
        d: "M200,72V184a8,8,0,0,1-8,8H152a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8h40A8,8,0,0,1,200,72ZM104,40H64a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V48A8,8,0,0,0,104,40Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ J.createElement("path", { d: "M224,120H208V72a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v48H120V48a16,16,0,0,0-16-16H64A16,16,0,0,0,48,48v72H32a8,8,0,0,0,0,16H48v72a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16v48a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16a8,8,0,0,0,0-16ZM104,208H64V48h40Zm88-24H152V72h40Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M232,128a8,8,0,0,1-8,8H208v48a16,16,0,0,1-16,16H152a16,16,0,0,1-16-16V136H120v72a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V136H32a8,8,0,0,1,0-16H48V48A16,16,0,0,1,64,32h40a16,16,0,0,1,16,16v72h16V72a16,16,0,0,1,16-16h40a16,16,0,0,1,16,16v48h16A8,8,0,0,1,232,128Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,122H206V72a14,14,0,0,0-14-14H152a14,14,0,0,0-14,14v50H118V48a14,14,0,0,0-14-14H64A14,14,0,0,0,50,48v74H32a6,6,0,0,0,0,12H50v74a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V134h20v50a14,14,0,0,0,14,14h40a14,14,0,0,0,14-14V134h18a6,6,0,0,0,0-12ZM106,208a2,2,0,0,1-2,2H64a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2Zm88-24a2,2,0,0,1-2,2H152a2,2,0,0,1-2-2V72a2,2,0,0,1,2-2h40a2,2,0,0,1,2,2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,120H208V72a16,16,0,0,0-16-16H152a16,16,0,0,0-16,16v48H120V48a16,16,0,0,0-16-16H64A16,16,0,0,0,48,48v72H32a8,8,0,0,0,0,16H48v72a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16v48a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V136h16a8,8,0,0,0,0-16ZM104,208H64V48h40Zm88-24H152V72h40Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,124H204V72a12,12,0,0,0-12-12H152a12,12,0,0,0-12,12v52H116V48a12,12,0,0,0-12-12H64A12,12,0,0,0,52,48v76H32a4,4,0,0,0,0,8H52v76a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V132h24v52a12,12,0,0,0,12,12h40a12,12,0,0,0,12-12V132h20a4,4,0,0,0,0-8ZM108,208a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4Zm88-24a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V72a4,4,0,0,1,4-4h40a4,4,0,0,1,4,4Z" }))
  ]
]), Xf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M52,40V216a12,12,0,0,1-24,0V40a12,12,0,0,1,24,0Zm16,60V64A20,20,0,0,1,88,44h88a20,20,0,0,1,20,20v36a20,20,0,0,1-20,20H88A20,20,0,0,1,68,100Zm24-4h80V68H92Zm144,60v36a20,20,0,0,1-20,20H88a20,20,0,0,1-20-20V156a20,20,0,0,1,20-20H216A20,20,0,0,1,236,156Zm-24,4H92v28H212Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(
      "path",
      {
        d: "M72,104V64a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H80A8,8,0,0,1,72,104Zm144,40H80a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V152A8,8,0,0,0,216,144Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ J.createElement("path", { d: "M216,136H80a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V152A16,16,0,0,0,216,136Zm0,56H80V152H216v40ZM48,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm32,80h96a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H80A16,16,0,0,0,64,64v40A16,16,0,0,0,80,120Zm0-56h96v40H80Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M232,152v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H216A16,16,0,0,1,232,152ZM40,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,40,32Zm40,88h96a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H80A16,16,0,0,0,64,64v40A16,16,0,0,0,80,120Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M46,40V216a6,6,0,0,1-12,0V40a6,6,0,0,1,12,0Zm20,64V64A14,14,0,0,1,80,50h96a14,14,0,0,1,14,14v40a14,14,0,0,1-14,14H80A14,14,0,0,1,66,104Zm12,0a2,2,0,0,0,2,2h96a2,2,0,0,0,2-2V64a2,2,0,0,0-2-2H80a2,2,0,0,0-2,2Zm152,48v40a14,14,0,0,1-14,14H80a14,14,0,0,1-14-14V152a14,14,0,0,1,14-14H216A14,14,0,0,1,230,152Zm-12,0a2,2,0,0,0-2-2H80a2,2,0,0,0-2,2v40a2,2,0,0,0,2,2H216a2,2,0,0,0,2-2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M48,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm16,64V64A16,16,0,0,1,80,48h96a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H80A16,16,0,0,1,64,104Zm16,0h96V64H80Zm152,48v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H216A16,16,0,0,1,232,152Zm-16,40V152H80v40H216Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M44,40V216a4,4,0,0,1-8,0V40a4,4,0,0,1,8,0Zm24,64V64A12,12,0,0,1,80,52h96a12,12,0,0,1,12,12v40a12,12,0,0,1-12,12H80A12,12,0,0,1,68,104Zm8,0a4,4,0,0,0,4,4h96a4,4,0,0,0,4-4V64a4,4,0,0,0-4-4H80a4,4,0,0,0-4,4Zm152,48v40a12,12,0,0,1-12,12H80a12,12,0,0,1-12-12V152a12,12,0,0,1,12-12H216A12,12,0,0,1,228,152Zm-8,0a4,4,0,0,0-4-4H80a4,4,0,0,0-4,4v40a4,4,0,0,0,4,4H216a4,4,0,0,0,4-4Z" }))
  ]
]), Gf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M228,40V216a12,12,0,0,1-24,0V40a12,12,0,0,1,24,0ZM188,64v36a20,20,0,0,1-20,20H80a20,20,0,0,1-20-20V64A20,20,0,0,1,80,44h88A20,20,0,0,1,188,64Zm-24,4H84V96h80Zm24,88v36a20,20,0,0,1-20,20H40a20,20,0,0,1-20-20V156a20,20,0,0,1,20-20H168A20,20,0,0,1,188,156Zm-24,4H44v28H164Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(
      "path",
      {
        d: "M184,64v40a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8h96A8,8,0,0,1,184,64Zm-8,80H40a8,8,0,0,0-8,8v40a8,8,0,0,0,8,8H176a8,8,0,0,0,8-8V152A8,8,0,0,0,176,144Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ J.createElement("path", { d: "M224,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM192,64v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V64A16,16,0,0,1,80,48h96A16,16,0,0,1,192,64Zm-16,0H80v40h96Zm16,88v40a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H176A16,16,0,0,1,192,152Zm-16,0H40v40H176Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm-48,8H80A16,16,0,0,0,64,64v40a16,16,0,0,0,16,16h96a16,16,0,0,0,16-16V64A16,16,0,0,0,176,48Zm0,88H40a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V152A16,16,0,0,0,176,136Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M222,40V216a6,6,0,0,1-12,0V40a6,6,0,0,1,12,0ZM190,64v40a14,14,0,0,1-14,14H80a14,14,0,0,1-14-14V64A14,14,0,0,1,80,50h96A14,14,0,0,1,190,64Zm-12,0a2,2,0,0,0-2-2H80a2,2,0,0,0-2,2v40a2,2,0,0,0,2,2h96a2,2,0,0,0,2-2Zm12,88v40a14,14,0,0,1-14,14H40a14,14,0,0,1-14-14V152a14,14,0,0,1,14-14H176A14,14,0,0,1,190,152Zm-12,0a2,2,0,0,0-2-2H40a2,2,0,0,0-2,2v40a2,2,0,0,0,2,2H176a2,2,0,0,0,2-2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM192,64v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V64A16,16,0,0,1,80,48h96A16,16,0,0,1,192,64Zm-16,0H80v40h96Zm16,88v40a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H176A16,16,0,0,1,192,152Zm-16,0H40v40H176Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M220,40V216a4,4,0,0,1-8,0V40a4,4,0,0,1,8,0ZM188,64v40a12,12,0,0,1-12,12H80a12,12,0,0,1-12-12V64A12,12,0,0,1,80,52h96A12,12,0,0,1,188,64Zm-8,0a4,4,0,0,0-4-4H80a4,4,0,0,0-4,4v40a4,4,0,0,0,4,4h96a4,4,0,0,0,4-4Zm8,88v40a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V152a12,12,0,0,1,12-12H176A12,12,0,0,1,188,152Zm-8,0a4,4,0,0,0-4-4H40a4,4,0,0,0-4,4v40a4,4,0,0,0,4,4H176a4,4,0,0,0,4-4Z" }))
  ]
]), Yf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M228,40a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,40ZM212,88v88a20,20,0,0,1-20,20H156a20,20,0,0,1-20-20V88a20,20,0,0,1,20-20h36A20,20,0,0,1,212,88Zm-24,4H160v80h28Zm-68-4V216a20,20,0,0,1-20,20H64a20,20,0,0,1-20-20V88A20,20,0,0,1,64,68h36A20,20,0,0,1,120,88ZM96,92H68V212H96Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(
      "path",
      {
        d: "M200,80v96a8,8,0,0,1-8,8H152a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h40A8,8,0,0,1,200,80Zm-96-8H64a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8h40a8,8,0,0,0,8-8V80A8,8,0,0,0,104,72Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ J.createElement("path", { d: "M224,40a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40ZM208,80v96a16,16,0,0,1-16,16H152a16,16,0,0,1-16-16V80a16,16,0,0,1,16-16h40A16,16,0,0,1,208,80Zm-16,0H152v96h40Zm-72,0V216a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V80A16,16,0,0,1,64,64h40A16,16,0,0,1,120,80Zm-16,0H64V216h40Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,40a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40ZM192,64H152a16,16,0,0,0-16,16v96a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V80A16,16,0,0,0,192,64Zm-88,0H64A16,16,0,0,0,48,80V216a16,16,0,0,0,16,16h40a16,16,0,0,0,16-16V80A16,16,0,0,0,104,64Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M222,40a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,40ZM206,80v96a14,14,0,0,1-14,14H152a14,14,0,0,1-14-14V80a14,14,0,0,1,14-14h40A14,14,0,0,1,206,80Zm-12,0a2,2,0,0,0-2-2H152a2,2,0,0,0-2,2v96a2,2,0,0,0,2,2h40a2,2,0,0,0,2-2Zm-76,0V216a14,14,0,0,1-14,14H64a14,14,0,0,1-14-14V80A14,14,0,0,1,64,66h40A14,14,0,0,1,118,80Zm-12,0a2,2,0,0,0-2-2H64a2,2,0,0,0-2,2V216a2,2,0,0,0,2,2h40a2,2,0,0,0,2-2Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,40a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40ZM208,80v96a16,16,0,0,1-16,16H152a16,16,0,0,1-16-16V80a16,16,0,0,1,16-16h40A16,16,0,0,1,208,80Zm-16,0H152v96h40Zm-72,0V216a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V80A16,16,0,0,1,64,64h40A16,16,0,0,1,120,80Zm-16,0H64V216h40Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M220,40a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,40ZM204,80v96a12,12,0,0,1-12,12H152a12,12,0,0,1-12-12V80a12,12,0,0,1,12-12h40A12,12,0,0,1,204,80Zm-8,0a4,4,0,0,0-4-4H152a4,4,0,0,0-4,4v96a4,4,0,0,0,4,4h40a4,4,0,0,0,4-4Zm-80,0V216a12,12,0,0,1-12,12H64a12,12,0,0,1-12-12V80A12,12,0,0,1,64,68h40A12,12,0,0,1,116,80Zm-8,0a4,4,0,0,0-4-4H64a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4h40a4,4,0,0,0,4-4Z" }))
  ]
]), jf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M140,40V216a12,12,0,0,1-24,0V40a12,12,0,0,1,24,0ZM88,116H45l11.52-11.51a12,12,0,0,0-17-17l-32,32a12,12,0,0,0,0,17l32,32a12,12,0,0,0,17-17L45,140H88a12,12,0,0,0,0-24Zm160.49,3.51-32-32a12,12,0,0,0-17,17L211,116H168a12,12,0,0,0,0,24h43l-11.52,11.51a12,12,0,0,0,17,17l32-32A12,12,0,0,0,248.49,119.51Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(
      "path",
      {
        d: "M240,56V200a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V56A16,16,0,0,1,32,40H224A16,16,0,0,1,240,56Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ J.createElement("path", { d: "M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM96,120H35.31l18.35-18.34A8,8,0,0,0,42.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L35.31,136H96a8,8,0,0,0,0-16Zm149.66,2.34-32-32a8,8,0,0,0-11.32,11.32L220.69,120H160a8,8,0,0,0,0,16h60.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,122.34Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M104,128a8,8,0,0,1-8,8H56v24a8,8,0,0,1-13.66,5.66l-32-32a8,8,0,0,1,0-11.32l32-32A8,8,0,0,1,56,96v24H96A8,8,0,0,1,104,128Zm141.66-5.66-32-32A8,8,0,0,0,200,96v24H160a8,8,0,0,0,0,16h40v24a8,8,0,0,0,13.66,5.66l32-32A8,8,0,0,0,245.66,122.34ZM128,32a8,8,0,0,0-8,8V216a8,8,0,0,0,16,0V40A8,8,0,0,0,128,32Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M134,40V216a6,6,0,0,1-12,0V40a6,6,0,0,1,12,0ZM96,122H30.49l21.75-21.76a6,6,0,0,0-8.48-8.48l-32,32a6,6,0,0,0,0,8.48l32,32a6,6,0,0,0,8.48-8.48L30.49,134H96a6,6,0,0,0,0-12Zm148.24,1.76-32-32a6,6,0,0,0-8.48,8.48L225.51,122H160a6,6,0,0,0,0,12h65.51l-21.75,21.76a6,6,0,1,0,8.48,8.48l32-32A6,6,0,0,0,244.24,123.76Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM96,120H35.31l18.35-18.34A8,8,0,0,0,42.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L35.31,136H96a8,8,0,0,0,0-16Zm149.66,2.34-32-32a8,8,0,0,0-11.32,11.32L220.69,120H160a8,8,0,0,0,0,16h60.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,122.34Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M132,40V216a4,4,0,0,1-8,0V40a4,4,0,0,1,8,0ZM96,124H25.66L50.83,98.83a4,4,0,0,0-5.66-5.66l-32,32a4,4,0,0,0,0,5.66l32,32a4,4,0,1,0,5.66-5.66L25.66,132H96a4,4,0,0,0,0-8Zm146.83,1.17-32-32a4,4,0,0,0-5.66,5.66L230.34,124H160a4,4,0,0,0,0,8h70.34l-25.17,25.17a4,4,0,0,0,5.66,5.66l32-32A4,4,0,0,0,242.83,125.17Z" }))
  ]
]), Zf = /* @__PURE__ */ new Map([
  [
    "bold",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM104.49,56.48,116,45V88a12,12,0,0,0,24,0V45l11.51,11.51a12,12,0,0,0,17-17l-32-32a12,12,0,0,0-17,0l-32,32a12,12,0,0,0,17,17Zm47,143L140,211V168a12,12,0,0,0-24,0v43l-11.51-11.52a12,12,0,0,0-17,17l32,32a12,12,0,0,0,17,0l32-32a12,12,0,0,0-17-17Z" }))
  ],
  [
    "duotone",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement(
      "path",
      {
        d: "M216,32V224a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V32A16,16,0,0,1,56,16H200A16,16,0,0,1,216,32Z",
        opacity: "0.2"
      }
    ), /* @__PURE__ */ J.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM101.66,53.66,120,35.31V96a8,8,0,0,0,16,0V35.31l18.34,18.35a8,8,0,0,0,11.32-11.32l-32-32a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32Zm52.68,148.68L136,220.69V160a8,8,0,0,0-16,0v60.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z" }))
  ],
  [
    "fill",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M88.61,51.06a8,8,0,0,1,1.73-8.72l32-32a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,160,56H136V96a8,8,0,0,1-16,0V56H96A8,8,0,0,1,88.61,51.06ZM216,120H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm-56,80H136V160a8,8,0,0,0-16,0v40H96a8,8,0,0,0-5.66,13.66l32,32a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,160,200Z" }))
  ],
  [
    "light",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M222,128a6,6,0,0,1-6,6H40a6,6,0,0,1,0-12H216A6,6,0,0,1,222,128ZM100.24,52.24,122,30.49V96a6,6,0,0,0,12,0V30.49l21.76,21.75a6,6,0,0,0,8.48-8.48l-32-32a6,6,0,0,0-8.48,0l-32,32a6,6,0,0,0,8.48,8.48Zm55.52,151.52L134,225.51V160a6,6,0,0,0-12,0v65.51l-21.76-21.75a6,6,0,0,0-8.48,8.48l32,32a6,6,0,0,0,8.48,0l32-32a6,6,0,0,0-8.48-8.48Z" }))
  ],
  [
    "regular",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM101.66,53.66,120,35.31V96a8,8,0,0,0,16,0V35.31l18.34,18.35a8,8,0,0,0,11.32-11.32l-32-32a8,8,0,0,0-11.32,0l-32,32a8,8,0,0,0,11.32,11.32Zm52.68,148.68L136,220.69V160a8,8,0,0,0-16,0v60.69l-18.34-18.35a8,8,0,0,0-11.32,11.32l32,32a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z" }))
  ],
  [
    "thin",
    /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("path", { d: "M220,128a4,4,0,0,1-4,4H40a4,4,0,0,1,0-8H216A4,4,0,0,1,220,128ZM98.83,50.83,124,25.66V96a4,4,0,0,0,8,0V25.66l25.17,25.17a4,4,0,1,0,5.66-5.66l-32-32a4,4,0,0,0-5.66,0l-32,32a4,4,0,0,0,5.66,5.66Zm58.34,154.34L132,230.34V160a4,4,0,0,0-8,0v70.34L98.83,205.17a4,4,0,0,0-5.66,5.66l32,32a4,4,0,0,0,5.66,0l32-32a4,4,0,0,0-5.66-5.66Z" }))
  ]
]), Kf = br({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: !1
}), lo = J.forwardRef(
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
      weight: p = "regular",
      mirrored: y = !1,
      ...u
    } = J.useContext(Kf);
    return /* @__PURE__ */ J.createElement(
      "svg",
      {
        ref: e,
        xmlns: "http://www.w3.org/2000/svg",
        width: n ?? f,
        height: n ?? f,
        fill: r ?? a,
        viewBox: "0 0 256 256",
        transform: i || y ? "scale(-1, 1)" : void 0,
        ...u,
        ...c
      },
      !!o && /* @__PURE__ */ J.createElement("title", null, o),
      l,
      d.get(s ?? p)
    );
  }
);
lo.displayName = "IconBase";
const Gl = J.forwardRef((t, e) => /* @__PURE__ */ J.createElement(lo, { ref: e, ...t, weights: Nf }));
Gl.displayName = "AlignBottomIcon";
const qf = Gl, Yl = J.forwardRef((t, e) => /* @__PURE__ */ J.createElement(lo, { ref: e, ...t, weights: Of }));
Yl.displayName = "AlignCenterHorizontalIcon";
const Uf = Yl, jl = J.forwardRef((t, e) => /* @__PURE__ */ J.createElement(lo, { ref: e, ...t, weights: Vf }));
jl.displayName = "AlignCenterVerticalIcon";
const Qf = jl, Zl = J.forwardRef((t, e) => /* @__PURE__ */ J.createElement(lo, { ref: e, ...t, weights: Xf }));
Zl.displayName = "AlignLeftIcon";
const Jf = Zl, Kl = J.forwardRef((t, e) => /* @__PURE__ */ J.createElement(lo, { ref: e, ...t, weights: Gf }));
Kl.displayName = "AlignRightIcon";
const $f = Kl, ql = J.forwardRef((t, e) => /* @__PURE__ */ J.createElement(lo, { ref: e, ...t, weights: Yf }));
ql.displayName = "AlignTopIcon";
const _f = ql, Ul = J.forwardRef((t, e) => /* @__PURE__ */ J.createElement(lo, { ref: e, ...t, weights: jf }));
Ul.displayName = "ArrowsOutLineHorizontalIcon";
const tp = Ul, Ql = J.forwardRef((t, e) => /* @__PURE__ */ J.createElement(lo, { ref: e, ...t, weights: Zf }));
Ql.displayName = "ArrowsOutLineVerticalIcon";
const ep = Ql, mo = {
  size: 16,
  weight: "duotone",
  "aria-hidden": !0
}, go = {
  alignHLeft: /* @__PURE__ */ h(Jf, { ...mo }),
  alignHCenter: /* @__PURE__ */ h(Uf, { ...mo }),
  alignHRight: /* @__PURE__ */ h($f, { ...mo }),
  distributeH: /* @__PURE__ */ h(tp, { ...mo }),
  alignVTop: /* @__PURE__ */ h(_f, { ...mo }),
  alignVCenter: /* @__PURE__ */ h(Qf, { ...mo }),
  alignVBottom: /* @__PURE__ */ h(qf, { ...mo }),
  distributeV: /* @__PURE__ */ h(ep, { ...mo })
}, Xs = "sbd-clipboard", op = "sbd-nodes:";
function Jl(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let r = "";
  for (let n = 0; n < o.length; n++) r += String.fromCharCode(o[n]);
  return btoa(r);
}
function ha(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) o[n] = e.charCodeAt(n);
    const r = new TextDecoder().decode(o);
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function $l(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return ha(e[1]);
  const o = t.match(
    new RegExp(`<!--${op}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? ha(o[1]) : null;
}
function un(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function _l(t) {
  return t.map((e) => {
    var n;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), r = (n = e.children) != null && n.length ? `
` + _l(e.children) : "";
    return o + r;
  }).filter(Boolean).join(`
`);
}
function rp(t) {
  var o;
  const e = [];
  for (const r of t)
    switch (r.type) {
      case "content": {
        const n = r.data;
        (o = n.blocks) != null && o.length ? e.push(_l(n.blocks)) : n.markdown && e.push(n.markdown);
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
function ua(t, e) {
  const o = rp(e), r = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), n = Jl(e);
  return t.setData(
    "text/html",
    `<!--${Xs}--><div data-sbd-nodes="${n}">${r || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function np(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, r = o.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, i = null;
  const l = (g) => {
    n = g.clientX, s = g.clientY;
  }, d = (g) => {
    un(g.target) || t.selection.size !== 0 && (g.preventDefault(), t.copySelected(), i = ua(
      g.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (g) => {
    un(g.target) || t.selection.size !== 0 && (g.preventDefault(), t.copySelected(), i = ua(
      g.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, a = (g) => {
    g.preventDefault(), g.stopImmediatePropagation();
  }, f = async (g) => {
    var L, F, X;
    if (un(g.target)) return;
    const { x, y: b } = t.screenToCanvas(n, s), w = ((L = g.clipboardData) == null ? void 0 : L.getData("text/html")) || "", T = ((F = g.clipboardData) == null ? void 0 : F.getData("text/plain")) || "";
    if (w.includes(Xs) || w.includes("data-sbd-nodes=") || i !== null && T === i) {
      if (i !== null && T === i && t.hasClipboard()) {
        a(g), t.pasteClipboard(x, b);
        return;
      }
      const et = $l(w);
      if (et) {
        a(g), t.setClipboard(et), t.pasteClipboard(x, b);
        return;
      }
      if (w.includes(Xs) || w.includes("data-sbd-nodes=")) {
        a(g), t.hasClipboard() && t.pasteClipboard(x, b);
        return;
      }
    }
    const M = (X = g.clipboardData) == null ? void 0 : X.items;
    if (M) {
      for (const tt of Array.from(M))
        if (tt.type.startsWith("image/")) {
          const et = tt.getAsFile();
          if (!et) continue;
          a(g);
          const ft = new FileReader();
          ft.onload = () => {
            const Ct = ft.result, xt = new Image();
            xt.onload = () => {
              const W = t.screenToCanvas(n, s), R = 400, K = 300, q = xt.naturalWidth / xt.naturalHeight, ut = Math.min(xt.naturalWidth, R), j = Math.min(xt.naturalHeight, K), $ = q >= 1 ? ut : j * q, at = q >= 1 ? ut / q : j;
              let rt = Ct;
              if (w) {
                const H = w.match(/<img[^>]+src=["']([^"']+)["']/i);
                H && /\.(gif|webp|apng)(\?|#|$)/i.test(H[1]) && (rt = H[1].replace(/&amp;/g, "&"));
              }
              const _ = {
                id: Ht(10),
                type: "image",
                x: W.x,
                y: W.y,
                w: $,
                h: at,
                z: t.nextZ(),
                data: { src: rt }
              };
              t.addNode(_), t.select(_.id);
            }, xt.src = Ct;
          }, ft.readAsDataURL(et);
          return;
        }
    }
    const C = Vs(T) ?? Vs(w);
    if (C) {
      a(g);
      const tt = t.screenToCanvas(n, s), et = await Xl(
        C,
        tt.x,
        tt.y,
        t.nextZ()
      );
      et && (t.addNode(et), t.select(et.id));
      return;
    }
    if (Ru(T)) {
      const tt = Du(T);
      if (tt) {
        a(g);
        const et = {
          id: Ht(10),
          type: "youtube",
          x,
          y: b,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: tt, url: T.trim() }
        };
        t.addNode(et), t.select(et.id);
        return;
      }
    }
    const E = w.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (E)
      try {
        const tt = ja(E);
        if (tt.length > 0) {
          a(g);
          const et = {
            id: Ht(10),
            type: "content",
            x,
            y: b,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: tt, markdown: T, borderColor: "#1e1e2e" }
          };
          t.addNode(et), t.select(et.id);
          return;
        }
      } catch {
      }
    if (T.trim()) {
      a(g);
      const tt = await Us(T), et = {
        id: Ht(10),
        type: "content",
        x,
        y: b,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: tt, markdown: T, borderColor: "#1e1e2e" }
      };
      t.addNode(et), t.select(et.id);
      return;
    }
    t.hasClipboard() && (a(g), t.pasteClipboard(x, b));
  }, p = (g) => {
    const x = g.target;
    if (un(x) || e && !e.contains(o.activeElement)) return;
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
  function y(g, x) {
    g.addEventListener("pointermove", l), g.addEventListener("copy", d), g.addEventListener("cut", c), g.addEventListener("paste", f), x.addEventListener("keydown", p);
  }
  function u(g, x) {
    g.removeEventListener("pointermove", l), g.removeEventListener("copy", d), g.removeEventListener("cut", c), g.removeEventListener("paste", f), x.removeEventListener("keydown", p);
  }
  y(o, r);
  const m = setInterval(() => {
    if (!e) return;
    const g = e.ownerDocument;
    g !== o && (u(o, r), o = g, r = g.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, y(o, r));
  }, 500);
  return () => {
    clearInterval(m), u(o, r);
  };
}
async function fa(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const r = t.measuredHeights, n = sp(o, r, t), s = e.padding ?? 40, i = e.background !== !1, l = e.format === "png", d = n.w + s * 2, c = n.h + s * 2, a = n.x - s, f = n.y - s, p = await tc(o, t, r, a, f, l), y = i ? Xr(t.boardBackground).canvasBg : "transparent", u = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${d}" height="${c}" viewBox="0 0 ${d} ${c}">`,
    `<rect width="${d}" height="${c}" fill="${y}"/>`,
    ...p,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    pa(new Blob([u], { type: "image/svg+xml" }), "board.svg");
  else {
    const m = e.scale ?? 4, g = await bp(u, d, c, m);
    pa(g, "board.png");
  }
}
function sp(t, e, o) {
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
    const p = Pe(
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
    r = Math.min(r, p.bounds.x), n = Math.min(n, p.bounds.y), s = Math.max(s, p.bounds.x + p.bounds.w), i = Math.max(i, p.bounds.y + p.bounds.h);
  }
  return isFinite(r) ? { x: r, y: n, w: s - r, h: i - n } : { x: 0, y: 0, w: 100, h: 100 };
}
async function tc(t, e, o, r, n, s) {
  const i = new Map(t.map((c) => [c.id, c])), l = [...t].sort((c, a) => c.z - a.z), d = [];
  for (const c of l) {
    const a = c.x - r, f = c.y - n, p = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        d.push(ip(c, a, f, p));
        break;
      case "content":
        d.push(ap(c, a, f, c.w, p));
        break;
      case "draw":
        d.push(lp(c, r, n));
        break;
      case "shape":
        d.push(dp(c, a, f, c.w, p));
        break;
      case "text":
        d.push(hp(c, a, f, c.w, p));
        break;
      case "sticky":
        d.push(up(c, a, f, c.w, p));
        break;
      case "image":
        d.push(await fp(c, a, f, c.w, p, s));
        break;
      case "youtube":
        d.push(await pp(c, a, f, c.w, p, s));
        break;
      case "edge": {
        const y = c, u = i.get(y.data.fromId), m = i.get(y.data.toId);
        u && m && d.push(mp(y, u, m, o, r, n));
        break;
      }
    }
  }
  return d;
}
function Po(t, e, o, r, n, s, i) {
  const l = [];
  if (s) {
    const d = e + r / 2, c = o + n / 2;
    l.push(`transform="rotate(${s}, ${d}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && l.push(`opacity="${i}"`), `<g ${l.join(" ")}>${t}</g>`;
}
function ip(t, e, o, r) {
  const n = t.data, s = n.backgroundColor || "rgba(0,0,0,0.02)", i = n.borderColor || "#d1d5db", l = n.borderWidth ?? 1, d = Rn(n.borderStyle, l), c = n.label ? gr(n.label) : "";
  let a = `<rect x="${e}" y="${o}" width="${t.w}" height="${r}" rx="4" fill="${s}" stroke="${i}" stroke-width="${l}"` + (d ? ` stroke-dasharray="${d}"` : "") + "/>";
  return c && (a += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), Po(a, e, o, t.w, r, t.rotation, n.opacity);
}
function ap(t, e, o, r, n) {
  var f;
  const s = t.data, i = ((f = s.markdown) == null ? void 0 : f.trim()) || "", l = s.borderColor, d = s.borderWidth ?? 0, c = Rn(s.borderStyle, d);
  let a = "";
  return l && d > 0 ? a += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white" stroke="${l}" stroke-width="${d}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : a += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white"/>`, i && (a += hi(i, e + 12, o + 20, r - 24, 14, 1.6, "#374151", "left", "sans-serif")), Po(a, e, o, r, n, t.rotation, s.opacity);
}
function lp(t, e, o) {
  const r = t.data, n = r.points.map(
    ([l, d, c]) => [l + t.x - e, d + t.y - o, c]
  );
  if (n.length === 0) return "";
  if (r.tool === "vector")
    return cp(n, r, t);
  const s = ao(r.strokeStyle);
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
    const l = ti(n, { size: r.strokeWidth });
    l && (i += `<path d="${l}" fill="${r.color}" stroke="none"/>`);
  }
  return r.opacity !== void 0 && r.opacity !== 1 ? `<g opacity="${r.opacity}">${i}</g>` : i;
}
function cp(t, e, o) {
  const r = t.map((d, c) => `${c === 0 ? "M" : "L"}${d[0].toFixed(2)},${d[1].toFixed(2)}`).join(" ") + " Z", n = ao(e.strokeStyle), s = n ? ` stroke-dasharray="${n.map((d) => d * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${r}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, l = o.h === "auto" ? 0 : o.h;
  return Po(i, o.x, o.y, o.w, l, o.rotation, e.opacity);
}
function dp(t, e, o, r, n) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: ao(s.strokeStyle),
    seed: t.id
  };
  let l;
  const d = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      l = Nr(e, o, r, n, i, d);
      break;
    case "ellipse":
      l = En(e + r / 2, o + n / 2, r, n, i);
      break;
    case "diamond":
      l = Pn(e, o, r, n, i, d);
      break;
    case "line": {
      const a = s.startPoint ?? [0, 0], f = s.endPoint ?? [r, n];
      l = Xo(e + a[0], o + a[1], e + f[0], o + f[1], i);
      break;
    }
    case "arrow": {
      const a = s.startPoint ?? [0, 0], f = s.endPoint ?? [r, n];
      l = Hn(e + a[0], o + a[1], e + f[0], o + f[1], i);
      break;
    }
    default:
      l = Nr(e, o, r, n, i);
  }
  const c = l.map(
    (a) => `<path d="${a.d}" fill="${a.fill || "none"}" stroke="${a.stroke}" stroke-width="${a.strokeWidth}"` + (a.strokeDasharray ? ` stroke-dasharray="${a.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return Po(c, e, o, r, n, t.rotation, s.opacity);
}
function hp(t, e, o, r, n) {
  const s = t.data, i = n || s.text.split(`
`).length * s.fontSize * 1, l = Co(s.fontFamily), d = !!s.borderColor, c = d ? 6 : 0;
  let a = "";
  if (d) {
    const p = s.borderWidth ?? 1, y = Rn(s.borderStyle, p);
    a += `<rect x="${e}" y="${o}" width="${r}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${p}"` + (y ? ` stroke-dasharray="${y}"` : "") + "/>";
  }
  const f = s.align === "center" ? e + r / 2 : s.align === "right" ? e + r - c : e + c;
  return a += hi(
    s.text,
    f,
    o + c + s.fontSize,
    r - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    l
  ), Po(a, e, o, r, i, t.rotation, s.opacity);
}
function up(t, e, o, r, n) {
  const s = t.data, i = s.fontSize ?? 16, l = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="2" fill="${s.color}"/>` + hi(s.text, e + 12, o + 12 + i, r - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return Po(l, e, o, r, n, t.rotation, s.opacity);
}
async function fp(t, e, o, r, n, s) {
  const i = t.data;
  let l = i.src;
  if (s && l && !l.startsWith("data:"))
    try {
      l = await Cn(l);
    } catch {
    }
  const d = i.borderColor, c = i.borderWidth ?? 0, a = Rn(i.borderStyle, c);
  let f = `<image href="${gr(l)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  return d && c > 0 && (f += `<rect x="${e}" y="${o}" width="${r}" height="${n}" fill="none" stroke="${d}" stroke-width="${c}"` + (a ? ` stroke-dasharray="${a}"` : "") + "/>"), Po(f, e, o, r, n, t.rotation, i.opacity);
}
async function pp(t, e, o, r, n, s) {
  const i = t.data;
  let l = Fu(i.videoId);
  if (s)
    try {
      l = await Cn(l);
    } catch {
    }
  let d = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="#1a1a1a"/><image href="${gr(l)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + r / 2, a = o + n / 2, f = Math.min(r, n) * 0.12;
  return d += `<circle cx="${c}" cy="${a}" r="${f}" fill="rgba(0,0,0,0.6)"/><path d="${yp(c, a, f * 0.5)}" fill="white"/>`, Po(d, e, o, r, n, t.rotation, i.opacity);
}
function yp(t, e, o) {
  const r = o * 0.15, n = t - o * 0.7 + r, s = e - o, i = t + o + r, l = e, d = n, c = e + o;
  return `M${n},${s} L${i},${l} L${d},${c} Z`;
}
function mp(t, e, o, r, n, s) {
  const i = t.data, l = Pe(
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
  const p = i.arrowHeadSize ?? Math.max(8, a * 3), y = i.arrowTailSize ?? Math.max(8, a * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      f += `<path d="${wo(l.x2, l.y2, l.arrowAngle, p)}" fill="none" stroke="${i.color}" stroke-width="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      f += `<path d="${xn(l.x2, l.y2, l.arrowAngle, p)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const u = p / 3;
      f += `<circle cx="${l.x2}" cy="${l.y2}" r="${u}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      f += `<path d="${wo(l.x1, l.y1, l.tailAngle, y)}" fill="none" stroke="${i.color}" stroke-width="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      f += `<path d="${xn(l.x1, l.y1, l.tailAngle, y)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const u = y / 3;
      f += `<circle cx="${l.x1}" cy="${l.y1}" r="${u}" fill="${i.color}"/>`;
    }
  }
  return i.label && (f += `<text x="${l.labelX}" y="${l.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${gr(i.label)}</text>`), `<g transform="${d}">${f}</g>`;
}
function hi(t, e, o, r, n, s, i, l, d) {
  if (!t) return "";
  const c = l === "center" ? "middle" : l === "right" ? "end" : "start", a = gp(t, r, n), f = n * s, p = a.map(
    (y, u) => `<tspan x="${e}" dy="${u === 0 ? 0 : f}">${gr(y)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${n}" fill="${i}" font-family="${gr(d)}" text-anchor="${c}">${p}</text>`;
}
function gp(t, e, o) {
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
function Rn(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function gr(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Cn(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((r, n) => {
    const s = new FileReader();
    s.onloadend = () => r(s.result), s.onerror = n, s.readAsDataURL(o);
  });
}
function bp(t, e, o, r) {
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
const xp = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), sr = /* @__PURE__ */ new Map(), wp = 12;
function vp(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const r = o.data.fontFamily;
      r && !xp.has(r) && e.add(r);
    }
  return [...e];
}
async function kp(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (sr.has(o)) {
      e.push(sr.get(o));
      continue;
    }
    try {
      let r;
      if (o === "Excalifont")
        r = await Cn(Za);
      else {
        const l = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!l) continue;
        r = await Cn(l[1]);
      }
      const n = `@font-face { font-family: '${o}'; src: url('${r}') format('woff2'); }`;
      if (sr.size >= wp) {
        const s = sr.keys().next().value;
        s !== void 0 && sr.delete(s);
      }
      sr.set(o, n), e.push(n);
    } catch {
    }
  }
  return e.join(`
`);
}
async function Sp(t, e) {
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
  const p = t.measuredHeights, y = await tc(c, t, p, l, d, !0), u = vp(c), m = await kp(u), g = Xr(t.boardBackground).canvasBg, x = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    m ? `<defs><style>${m}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${g}"/>`,
    ...y,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(x)}`;
}
function pa(t, e) {
  const o = URL.createObjectURL(t), r = document.createElement("a");
  r.href = o, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o);
}
const ya = [
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
], ma = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function ga(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const ec = [
  ...ya,
  ...ga(ya, "phone-landscape"),
  ...ma,
  ...ga(ma, "tablet-landscape"),
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
], Mp = new Map(ec.map((t) => [t.key, t]));
function Gs(t) {
  return Mp.get(t);
}
function oc(t) {
  return t.w / t.h;
}
const Cp = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function Ip() {
  const t = /* @__PURE__ */ new Map();
  for (const e of ec) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: Cp[e] ?? e,
    presets: o
  }));
}
function Tp(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function hs(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const [i, l] = o[n], [d, c] = o[s];
    l > e != c > e && t < (d - i) * (e - l) / (c - l) + i && (r = !r);
  }
  return r;
}
function us(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function zp(t, e, o) {
  try {
    const r = await navigator.clipboard.read();
    let n = null;
    for (const i of r)
      if (i.types.includes("text/html")) {
        const l = await (await i.getType("text/html")).text();
        if (l.includes("sbd-clipboard") || l.includes("data-sbd-nodes=")) {
          const d = $l(l);
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
        const f = a.naturalWidth / a.naturalHeight, p = Math.min(a.naturalWidth, 400), y = Math.min(a.naturalHeight, 300), u = f >= 1 ? p : y * f, m = f >= 1 ? p / f : y;
        let g = c;
        if (n) {
          const b = n.match(/<img[^>]+src=["']([^"']+)["']/i);
          b && /\.(gif|webp|apng)(\?|#|$)/i.test(b[1]) && (g = b[1].replace(/&amp;/g, "&"));
        }
        const x = {
          id: Ht(10),
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
        const l = ja(i);
        if (l.length > 0) {
          const d = {
            id: Ht(10),
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
      const i = await Us(s), l = {
        id: Ht(10),
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
async function ba(t) {
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
`).filter(Boolean).map((l) => `<p>${l}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${Jl(e)}">${n || "<p></p>"}</div>`;
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
function fn(t) {
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
function xa(t, e) {
  const o = e.x - t.x, r = e.y - t.y;
  return { dist: Math.sqrt(o * o + r * r), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const ir = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function Ap({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: r,
  observeElement: n,
  unobserveElement: s,
  isContainer: i,
  children: l
}) {
  const d = pt(null);
  St(() => {
    if (t.h !== "auto") return;
    const f = d.current;
    if (!f) return;
    const p = f.offsetHeight;
    return p > 0 && r(t.id, p), n(f, () => {
      const y = f.offsetHeight;
      y > 0 && r(t.id, y);
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
function Ep({
  node: t,
  engine: e,
  onDone: o
}) {
  const r = pt(null), n = pt(t.data.label ?? ""), s = pt(t);
  s.current = t;
  const i = pt(t.data.label ?? ""), l = pt(!1);
  St(() => () => {
    const f = s.current, p = n.current.trim();
    if (p !== i.current) {
      const u = { data: { ...f.data, label: p || void 0 } }, m = r.current;
      if (m && p) {
        const x = f.h === "auto" ? 100 : f.h, b = m.scrollHeight + 24;
        b > x && (u.h = b);
      }
      l.current ? (l.current = !1, e.updateNode(f.id, u)) : e.updateNodeWithHistory(f.id, u);
    }
  }, []);
  const d = t.h === "auto" ? 100 : t.h, c = t.data.labelFontSize ?? 14, a = t.data.fill && t.data.fillStyle === "solid" ? Tp(t.data.fill) : t.data.stroke;
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
            const p = f.currentTarget;
            l.current || (l.current = !0, e.pushHistorySnapshot()), n.current = p.value;
            const y = s.current;
            e.updateNode(y.id, {
              data: { ...y.data, label: p.value || void 0 }
            }), p.style.height = "auto", p.style.height = p.scrollHeight + "px";
            const m = p.scrollHeight + 24;
            m > d && e.updateNode(t.id, { h: m });
          },
          onPointerDown: (f) => f.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: c,
            fontFamily: Co(t.data.labelFontFamily ?? Mo),
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
const wa = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none"
};
function Pp({
  safariWebKitWorkaround: t,
  viewport: e,
  viewportTransform: o,
  children: r
}) {
  return t ? /* @__PURE__ */ h(
    "div",
    {
      style: {
        ...wa,
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
        ...wa,
        transform: o,
        transformOrigin: "0 0"
      },
      children: r
    }
  );
}
function Hp({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: r,
  dataFlowEdgeOverlay: n = "off",
  minimapVisible: s = !0,
  singleFrameId: i
}) {
  var Ei;
  const { labels: l } = Jt(), d = pt(null), c = pt(null), a = () => {
    var v;
    return ((v = d.current) == null ? void 0 : v.ownerDocument) ?? document;
  }, [f, p] = ot({ w: 0, h: 0 }), [y, u] = ot({ ...t.viewport }), [m, g] = ot(t.getAllNodes()), [x, b] = ot(
    new Set(t.selection)
  ), [w, T] = ot(!1), [k, M] = ot(t.mode), [C, E] = ot(t.activeGroupId), [L, F] = ot(() => t.getSearchState()), [X, tt] = ot([]), [et, ft] = ot(t.snapToGrid), [Ct, xt] = ot(t.gridSize), [W, R] = ot(t.smartGuides), [K, q] = ot([]), [ut, j] = ot(t.boardBackground), $ = Kt(() => x.size === 1 ? Array.from(x)[0] : x.size > 1 ? [...x].sort().join("\0") : "canvas-none", [x]), at = Dn(t, $), rt = pt(!1), _ = pt(!1), H = pt(/* @__PURE__ */ new Map()), it = pt(!1), dt = pt(!1), st = pt(null), ht = pt(null), gt = ct((v) => {
    a().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: v } }));
  }, []);
  St(() => {
    const v = (A) => {
      var O, P;
      if (A.key === " " && !A.repeat && !rt.current) {
        const N = (O = A.target) == null ? void 0 : O.tagName;
        if (N === "INPUT" || N === "TEXTAREA" || (P = A.target) != null && P.isContentEditable) return;
        rt.current = !0;
        const z = d.current;
        z && (z.style.cursor = "grab"), A.preventDefault();
      }
    }, D = (A) => {
      if (A.key === " ") {
        rt.current = !1, _.current = !1;
        const O = d.current;
        O && (O.style.cursor = t.lassoSelect ? ir : fn(t.mode));
      }
    };
    return window.addEventListener("keydown", v), window.addEventListener("keyup", D), () => {
      window.removeEventListener("keydown", v), window.removeEventListener("keyup", D);
    };
  }, []), St(() => {
    const v = (A) => {
      H.current.delete(A.pointerId), A.pointerType === "pen" && (dt.current = !1), H.current.size === 0 && gt(!1), st.current && (clearTimeout(st.current), st.current = null, ht.current = null);
    }, D = a();
    return D.addEventListener("pointerup", v), D.addEventListener("pointercancel", v), () => {
      D.removeEventListener("pointerup", v), D.removeEventListener("pointercancel", v);
    };
  }, [gt]);
  const [vt, Et] = ot(null), [Rt, At] = ot(null), [yt, Lt] = ot(null), Wt = pt(yt);
  St(() => {
    const v = Wt.current;
    Wt.current = yt, yt ? t.notifyEdgeProgress(Pf(yt)) : v && t.notifyEdgeEnd();
  }, [yt, t]);
  const oe = pt(Rt);
  St(() => {
    if (t.mode !== "frame") {
      oe.current && t.notifyRectDragEnd(), oe.current = null;
      return;
    }
    const v = oe.current;
    oe.current = Rt, Rt ? t.notifyRectDragProgress({
      kind: "frame",
      startX: Rt.startX,
      startY: Rt.startY,
      endX: Rt.endX,
      endY: Rt.endY
    }) : v && t.notifyRectDragEnd();
  }, [Rt, t.mode, t]);
  const [se, ne] = ot(null);
  St(() => {
    const v = d.current;
    if (!v) return;
    t.setContainer(v);
    const D = () => {
      const N = v.getBoundingClientRect();
      t.containerOffset = { x: N.left, y: N.top };
    };
    D();
    const A = new ResizeObserver((N) => {
      var Y;
      const { width: z, height: V } = ((Y = N[0]) == null ? void 0 : Y.contentRect) ?? { width: 0, height: 0 };
      p((Q) => Q.w === z && Q.h === V ? Q : { w: z, h: V }), t.setContainerSize(z, V), D();
    });
    A.observe(v);
    const O = () => D();
    window.addEventListener("scroll", O, !0), window.addEventListener("resize", O);
    const P = window.visualViewport;
    return P && (P.addEventListener("resize", O), P.addEventListener("scroll", O)), () => {
      A.disconnect(), window.removeEventListener("scroll", O, !0), window.removeEventListener("resize", O), P && (P.removeEventListener("resize", O), P.removeEventListener("scroll", O));
    };
  }, [t]);
  const [mt, le] = ot({}), he = ct((v, D) => {
    le(
      (A) => A[v] === D ? A : { ...A, [v]: D }
    ), t.updateMeasuredHeight(v, D);
  }, [t]), pe = pt(null), me = pt(/* @__PURE__ */ new Map());
  function ge() {
    return pe.current || (pe.current = new ResizeObserver((v) => {
      var D;
      for (const A of v)
        (D = me.current.get(A.target)) == null || D(A);
    })), pe.current;
  }
  const to = ct((v, D) => {
    me.current.set(v, D), ge().observe(v);
  }, []), Ue = ct((v) => {
    var D;
    me.current.delete(v), (D = pe.current) == null || D.unobserve(v);
  }, []);
  St(() => () => {
    var v;
    (v = pe.current) == null || v.disconnect(), pe.current = null, me.current.clear();
  }, []);
  const Ho = Kt(() => new Set(m.map((v) => v.id)), [m]);
  St(() => {
    le((v) => {
      let D = !1;
      const A = {};
      for (const [O, P] of Object.entries(v))
        Ho.has(O) ? A[O] = P : D = !0;
      return D ? A : v;
    });
  }, [Ho]);
  const Ne = ct(
    (v, D, A) => {
      let O, P;
      if (o && v.data.sourcePort) {
        const N = o.get(D.type), z = ye(N, D);
        z && (O = Ee(D, z, v.data.sourcePort, y.zoom, mt, N.portAnchor ?? "bbox") ?? void 0);
      }
      if (o && v.data.targetPort) {
        const N = o.get(A.type), z = ye(N, A);
        z && (P = Ee(A, z, v.data.targetPort, y.zoom, mt, N.portAnchor ?? "bbox") ?? void 0);
      }
      return { sourcePortPos: O, targetPortPos: P };
    },
    [o, y.zoom, mt]
  );
  ct(
    (v) => t.zoomToNode(v),
    [t, l]
  );
  const I = ct(
    (v, D) => {
      if (!v.rotation)
        return { minX: v.x, minY: v.y, maxX: v.x + v.w, maxY: v.y + D };
      const A = v.x + v.w / 2, O = v.y + D / 2, P = v.rotation * Math.PI / 180, N = Math.cos(P), z = Math.sin(P), V = [
        [v.w / 2, D / 2],
        [-v.w / 2, D / 2],
        [-v.w / 2, -D / 2],
        [v.w / 2, -D / 2]
      ];
      let Y = 1 / 0, Q = 1 / 0, Z = -1 / 0, B = -1 / 0;
      for (const [G, U] of V) {
        const nt = A + G * N - U * z, kt = O + G * z + U * N;
        Y = Math.min(Y, nt), Q = Math.min(Q, kt), Z = Math.max(Z, nt), B = Math.max(B, kt);
      }
      return { minX: Y, minY: Q, maxX: Z, maxY: B };
    },
    []
  ), lt = 8, ce = ct(
    (v, D) => D.filter((A) => {
      if (A.type === "edge") {
        const N = A.data, z = t.getNode(N.fromId), V = t.getNode(N.toId);
        if (!z || !V) return !1;
        const { x1: Y, y1: Q, x2: Z, y2: B } = Ri(z, V, mt);
        return Y >= v.x && Y <= v.x + v.w && Q >= v.y && Q <= v.y + v.h && Z >= v.x && Z <= v.x + v.w && B >= v.y && B <= v.y + v.h;
      }
      const O = A.h === "auto" ? mt[A.id] ?? 100 : A.h, P = I(A, O);
      return P.minX >= v.x && P.maxX <= v.x + v.w && P.minY >= v.y && P.maxY <= v.y + v.h;
    }),
    [I, mt]
  ), we = ct(
    (v, D) => v.length < 3 ? [] : D.filter((A) => {
      if (A.type === "edge") {
        const z = A, V = t.getNode(z.data.fromId), Y = t.getNode(z.data.toId);
        if (!V || !Y) return !1;
        const { x1: Q, y1: Z, x2: B, y2: G } = Ri(V, Y, mt);
        return hs(Q, Z, v) && hs(B, G, v);
      }
      const O = A.h === "auto" ? mt[A.id] ?? 100 : A.h, P = A.x + A.w / 2, N = A.y + O / 2;
      return hs(P, N, v);
    }),
    [t, mt]
  ), ue = Kt(() => {
    if (x.size < 2) return null;
    let v = 1 / 0, D = 1 / 0, A = -1 / 0, O = -1 / 0;
    for (const P of x) {
      const N = m.find((Y) => Y.id === P);
      if (!N || N.type === "edge") continue;
      const z = N.h === "auto" ? mt[N.id] ?? 100 : N.h, V = I(N, z);
      v = Math.min(v, V.minX), D = Math.min(D, V.minY), A = Math.max(A, V.maxX), O = Math.max(O, V.maxY);
    }
    return v === 1 / 0 ? null : {
      x: v - lt,
      y: D - lt,
      w: A - v + lt * 2,
      h: O - D + lt * 2
    };
  }, [x, m, mt, I]), Ge = Kt(() => {
    if (!C) return null;
    const v = t.getAllGroupDescendantNodes(C);
    if (v.length === 0) return null;
    let D = 1 / 0, A = 1 / 0, O = -1 / 0, P = -1 / 0;
    for (const z of v) {
      if (z.type === "edge") continue;
      const V = z.h === "auto" ? mt[z.id] ?? 100 : z.h, Y = I(z, V);
      D = Math.min(D, Y.minX), A = Math.min(A, Y.minY), O = Math.max(O, Y.maxX), P = Math.max(P, Y.maxY);
    }
    if (D === 1 / 0) return null;
    const N = 8;
    return { x: D - N, y: A - N, w: O - D + N * 2, h: P - A + N * 2 };
  }, [C, m, mt, I, t]), qt = Kt(() => {
    const v = performance.now();
    if (m.filter(
      (It) => {
        if (o) {
          const Dt = o.get(It.type);
          return Dt && !Dt.isSVGOnly;
        }
        return It.type === "content" || It.type === "draw" || It.type === "shape" || It.type === "image" || It.type === "text" || It.type === "frame" || It.type === "sticky";
      }
    ), f.w <= 0 || f.h <= 0)
      return null;
    const { zoom: D, x: A, y: O } = y, N = Math.min(500, 280 / Math.max(D, 0.1)), z = {
      x: -A / D - N,
      y: -O / D - N,
      w: f.w / D + N * 2,
      h: f.h / D + N * 2
    }, V = t.getNodesInRect(z), Y = /* @__PURE__ */ new Map(), Q = /* @__PURE__ */ new Set(), Z = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Set();
    let G = 0, U = 0, nt = 0, kt = 0, zt = 0;
    const Bt = (It, Dt = !1) => {
      const bt = t.getNode(It);
      if (!bt) return;
      const Pt = Y.has(bt.id);
      Y.set(bt.id, bt), bt.type === "edge" ? B.add(bt.id) : (Pt || Q.add(bt.id), Dt && Z.add(bt.id));
    };
    for (const It of V) {
      const Dt = Z.size;
      Bt(It.id, !0), Z.size > Dt && (G += 1);
    }
    for (const It of x)
      Bt(It, !0);
    const Tt = se ? { x: se.cursorX, y: se.cursorY } : yt ? { x: yt.cursorX, y: yt.cursorY } : null;
    if (Tt) {
      const It = 200 / Math.max(0.2, y.zoom), Dt = t.getNodesInRect({
        x: Tt.x - It,
        y: Tt.y - It,
        w: It * 2,
        h: It * 2
      });
      for (const bt of Dt)
        bt.type !== "edge" && Bt(bt.id, !0);
    }
    const Ft = Array.from(Z);
    for (const It of Ft) {
      const Dt = t.getEdgesForNode(It);
      for (const bt of Dt) {
        const Pt = bt.data, Zt = B.has(bt.id);
        Y.set(bt.id, bt), B.add(bt.id), Zt || (kt += 1);
        const Ot = Q.size;
        Bt(Pt.fromId, !1), Q.size > Ot && (U += 1);
        const Nt = Q.size;
        Bt(Pt.toId, !1), Q.size > Nt && (U += 1);
      }
    }
    if (!w)
      for (const It of m) {
        if (It.type !== "edge" || B.has(It.id)) continue;
        const Dt = It.data, bt = t.getNode(Dt.fromId), Pt = t.getNode(Dt.toId);
        if (!bt || !Pt) continue;
        let Zt = Z.has(Dt.fromId) || Z.has(Dt.toId);
        if (!Zt) {
          const Ot = Pe(
            bt,
            Pt,
            Dt.edgeType || "bezier",
            mt,
            Dt.sourceHandle,
            Dt.targetHandle,
            Dt.midpointOffset,
            Dt.curveOffset,
            void 0,
            void 0,
            Dt.sourceT,
            Dt.targetT,
            Dt.attachmentGap
          );
          Zt = Ot.bounds.x < z.x + z.w && Ot.bounds.x + Ot.bounds.w > z.x && Ot.bounds.y < z.y + z.h && Ot.bounds.y + Ot.bounds.h > z.y;
        }
        if (Zt) {
          Y.set(It.id, It), B.add(It.id), zt += 1;
          const Ot = Q.size;
          Bt(bt.id, !1), Q.size > Ot && (nt += 1);
          const Nt = Q.size;
          Bt(Pt.id, !1), Q.size > Nt && (nt += 1);
        }
      }
    const ee = Array.from(Y.values());
    return {
      domNodes: ee.filter((It) => {
        if (It.type === "edge" || !Z.has(It.id)) return !1;
        if (o) {
          const Dt = o.get(It.type);
          return !!Dt && !Dt.isSVGOnly;
        }
        return It.type === "content" || It.type === "draw" || It.type === "shape" || It.type === "image" || It.type === "text" || It.type === "frame" || It.type === "sticky";
      }),
      svgNodes: ee,
      visibleNodeCount: Z.size,
      visibleEdgeCount: B.size,
      seedVisibleNodes: G,
      nodesAddedByAdjacency: U,
      nodesAddedByEdgeEndpoints: nt,
      edgesAddedByAdjacency: kt,
      edgesAddedByCrossing: zt,
      cullingMs: performance.now() - v
    };
  }, [y, f, m, x, t, o, mt, yt, se, w]), Ye = Kt(() => {
    if (!i) return null;
    const v = /* @__PURE__ */ new Set();
    v.add(i);
    const D = t.getFrameDescendantIds(i);
    for (const A of D) v.add(A);
    return v;
  }, [i, t, m]), Jo = w ? (qt == null ? void 0 : qt.svgNodes) ?? m : m, wr = Ye ? Jo.filter((v) => Ye.has(v.id)) : Jo;
  St(() => {
    if (!Me.isEnabled()) return;
    const v = m.reduce((A, O) => A + (O.type === "edge" ? 1 : 0), 0), D = m.length - v;
    Me.recordCulling((qt == null ? void 0 : qt.cullingMs) ?? 0), Me.setVisibilityCounts({
      visibleNodes: (qt == null ? void 0 : qt.visibleNodeCount) ?? D,
      totalNodes: D,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: v,
      totalEdges: v,
      virtualizationActive: !!qt,
      seedVisibleNodes: (qt == null ? void 0 : qt.seedVisibleNodes) ?? D,
      nodesAddedByAdjacency: (qt == null ? void 0 : qt.nodesAddedByAdjacency) ?? 0,
      nodesAddedByEdgeEndpoints: (qt == null ? void 0 : qt.nodesAddedByEdgeEndpoints) ?? 0,
      edgesAddedByAdjacency: (qt == null ? void 0 : qt.edgesAddedByAdjacency) ?? 0,
      edgesAddedByCrossing: (qt == null ? void 0 : qt.edgesAddedByCrossing) ?? 0
    });
  }, [m, qt]);
  const Lo = pt(0);
  St(() => {
    if (!Me.isEnabled() || !qt) return;
    const v = performance.now();
    if (v - Lo.current < 1e3) return;
    Lo.current = v;
    const D = m.reduce((O, P) => O + (P.type === "edge" ? 1 : 0), 0), A = m.length - D;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: qt.visibleNodeCount,
      totalNodes: A,
      visibleEdges: qt.visibleEdgeCount,
      totalEdges: D,
      seedVisibleNodes: qt.seedVisibleNodes,
      nodesAddedByAdjacency: qt.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: qt.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: qt.edgesAddedByAdjacency,
      edgesAddedByCrossing: qt.edgesAddedByCrossing,
      cullingMs: qt.cullingMs
    });
  }, [m, qt, y]), St(() => {
    let v = null;
    const D = () => {
      v === null && (v = requestAnimationFrame(() => {
        v = null, g([...t.getAllNodes()]);
      }));
    };
    let A = null;
    const O = () => {
      A === null && (A = requestAnimationFrame(() => {
        A = null, u({ ...t.viewport });
      }));
    }, P = () => {
      b((G) => {
        const U = new Set(t.selection);
        return G.size !== U.size || [...G].some((nt) => !U.has(nt)) ? (Do((nt) => {
          if (!nt || U.has(nt)) return nt;
          const kt = Ur.current;
          return kt && kt.id === nt && performance.now() < kt.until ? nt : null;
        }), tr((nt) => nt && !U.has(nt) ? null : nt), Ro((nt) => nt && !U.has(nt) ? null : nt), er((nt) => nt && !U.has(nt) ? null : nt), or((nt) => nt && !U.has(nt) ? null : nt), Kr(null), U) : G;
      });
    }, N = () => {
      M(t.mode), t.mode === "edge" && t.deselectAll();
    }, z = () => j(t.boardBackground), V = () => {
      q([...t.alignGuides]), ft(t.snapToGrid), xt(t.gridSize), R(t.smartGuides);
    }, Y = () => F(t.getSearchState());
    t.on("change", D), t.on("viewport", O), t.on("selection", P), t.on("mode", N), t.on("background", z), t.on("guides", V), t.on("search", Y);
    const Q = (G) => E(G), Z = () => E(null), B = () => {
      const G = d.current;
      G && (G.style.cursor = t.lassoSelect ? ir : fn(t.mode));
    };
    return t.on("group:enter", Q), t.on("group:exit", Z), t.on("lassoToggle", B), () => {
      v !== null && cancelAnimationFrame(v), A !== null && cancelAnimationFrame(A), t.off("change", D), t.off("viewport", O), t.off("selection", P), t.off("mode", N), t.off("background", z), t.off("guides", V), t.off("search", Y), t.off("group:enter", Q), t.off("group:exit", Z), t.off("lassoToggle", B);
    };
  }, [t]), St(() => {
    const v = d.current;
    if (!v) return;
    const D = (A) => {
      if (!A.ctrlKey && !A.metaKey) {
        const P = A.target.closest(".sb-editor-wrap");
        if (P && P.scrollHeight > P.clientHeight) {
          const N = P.scrollTop <= 0 && A.deltaY < 0, z = P.scrollTop + P.clientHeight >= P.scrollHeight && A.deltaY > 0;
          if (!N && !z) return;
        }
      }
      A.preventDefault(), A.ctrlKey || A.metaKey ? t.zoomByWheel(A.deltaY, A.clientX, A.clientY) : t.pan(-A.deltaX, -A.deltaY);
    };
    return v.addEventListener("wheel", D, { passive: !1 }), () => v.removeEventListener("wheel", D);
  }, [t]);
  const [vr, Fn] = ot(null), [Bn, Nn] = ot(null), [$o, Zr] = ot(null), [kr, Kr] = ot(null), qr = pt({
    x: 0,
    y: 0,
    index: -1
  }), [ve, eo] = ot(null), On = pt(ve);
  St(() => {
    const v = On.current, D = t.mode === "text" ? "text" : t.mode === "note" ? "note" : t.mode === "sticky" ? "sticky" : null;
    if (!D) {
      v && !ve && t.notifyRectDragEnd(), On.current = ve;
      return;
    }
    On.current = ve, ve ? t.notifyRectDragProgress({
      kind: D,
      startX: ve.startX,
      startY: ve.startY,
      endX: ve.endX,
      endY: ve.endY
    }) : v && t.notifyRectDragEnd();
  }, [ve, t.mode, t]);
  const [cc, Vn] = ot(null), [dc, hc] = ot(null), Sr = pt(null), uc = Kt(() => {
    const v = /* @__PURE__ */ new Set();
    for (const D of m) {
      if (D.type !== "edge") continue;
      const A = D;
      A.data.animated && A.data.animatedDirection === "bop" && (v.add(A.data.fromId), v.add(A.data.toId));
    }
    return v;
  }, [m]), [_o, Do] = ot(null), Xn = pt(null), [bi, tr] = ot(null), [xi, Ro] = ot(null), [Mr, er] = ot(null), [oo, or] = ot(null), [fc, wi] = ot(null);
  St(() => {
    const v = (D) => {
      Zc(() => or(D));
    };
    return t.on("image:cropRequest", v), () => t.off("image:cropRequest", v);
  }, [t]);
  const vi = _o || xi || bi || Mr || oo || fc, pc = Kt(() => {
    const v = (qt == null ? void 0 : qt.domNodes) ?? m.filter((A) => {
      if (Ye && (A.id === i || !Ye.has(A.id)))
        return !1;
      if (o) {
        const O = o.get(A.type);
        return !!O && !O.isSVGOnly;
      }
      return A.type === "content" || A.type === "draw" || A.type === "shape" || A.type === "image" || A.type === "text" || A.type === "frame" || A.type === "sticky";
    });
    if (!oo || v.some((A) => A.id === oo)) return v;
    const D = m.find((A) => A.id === oo);
    return D ? [...v, D] : v;
  }, [qt, m, o, oo, Ye]), Gn = pt(null), Ur = pt(null), ki = pt(null), [Yn, jn] = ot(/* @__PURE__ */ new Set()), co = pt(/* @__PURE__ */ new Set()), [Si, Cr] = ot([]), [Qr, Zn] = ot(null), je = pt([]), ho = pt(null), Mi = pt(0), Ir = ct(
    (v = !1) => {
      if (t.mode !== "erase") return;
      const D = performance.now();
      if (!v && D - Mi.current < 48) return;
      Mi.current = D;
      const A = je.current;
      t.notifyEraserProgress({
        trail: A.length > 0 ? [...A] : void 0,
        markedIds: Array.from(co.current)
      });
    },
    [t]
  ), [Ci, Jr] = ot([]), Ce = pt([]), rr = pt(null);
  St(() => {
    if (!_o) return;
    const v = a(), D = (Q) => Q.querySelector(
      `[data-node-id="${_o}"] [contenteditable="true"]`
    ), A = (Q) => !Q || !(Q instanceof HTMLElement) ? !1 : Q.isContentEditable || Q instanceof HTMLInputElement || Q instanceof HTMLTextAreaElement, O = (Q) => Q.metaKey || Q.ctrlKey || Q.altKey ? !1 : Q.key.length === 1 ? !0 : Q.key === "Backspace" || Q.key === "Delete" || Q.key === "Enter" || Q.key === "Tab" || Q.key === " ", P = (Q) => !!(Q.inputType.startsWith("insert") || Q.inputType.startsWith("delete")), N = (Q) => {
      const Z = d.current;
      if (!Z) return;
      const B = Q.target;
      if (B && Z.contains(B)) return;
      Q.preventDefault(), Q.stopPropagation(), "stopImmediatePropagation" in Q && typeof Q.stopImmediatePropagation == "function" && Q.stopImmediatePropagation();
      const G = D(Z);
      G && G.focus();
    }, z = (Q) => {
      O(Q) && N(Q);
    }, V = (Q) => {
      P(Q) && N(Q);
    }, Y = (Q) => {
      const Z = d.current;
      if (!Z) return;
      const B = Q.target;
      if (!B || Z.contains(B) || !A(B)) return;
      const G = D(Z);
      requestAnimationFrame(() => {
        try {
          B.blur();
        } catch {
        }
        G && G.focus();
      });
    };
    return v.addEventListener("keydown", z, !0), v.addEventListener("beforeinput", V, !0), v.addEventListener("focusin", Y, !0), () => {
      v.removeEventListener("keydown", z, !0), v.removeEventListener("beforeinput", V, !0), v.removeEventListener("focusin", Y, !0);
    };
  }, [_o]);
  const Ii = ct(
    (v, D, A, O = "auto") => {
      const P = Ht(10);
      ki.current = P, t.addNode({
        id: P,
        type: "content",
        x: v,
        y: D,
        w: A,
        h: O,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), $r = ct(
    (v, D, A) => {
      const { x: O, y: P } = t.screenToCanvas(v, D);
      if (A) {
        const Z = t.hitTestAll(O, P, mt);
        if (Z.length > 0) {
          const B = qr.current, G = Math.abs(O - B.x) + Math.abs(P - B.y);
          let U = 0;
          G < 5 && (U = (B.index + 1) % Z.length), qr.current = { x: O, y: P, index: U }, t.select(Z[U].id);
        } else
          t.deselectAll();
      } else {
        let Z = !1;
        for (const B of t.selection) {
          const G = t.getNode(B);
          if (!G) continue;
          const U = G.h === "auto" ? 100 : G.h;
          if (O >= G.x && O <= G.x + G.w && P >= G.y && P <= G.y + U) {
            Z = !0;
            break;
          }
        }
        if (!Z && t.selection.size >= 2) {
          let B = 1 / 0, G = 1 / 0, U = -1 / 0, nt = -1 / 0;
          for (const kt of t.selection) {
            const zt = t.getNode(kt);
            if (!zt || zt.type === "edge") continue;
            const Bt = zt.h === "auto" ? 100 : zt.h;
            B = Math.min(B, zt.x), G = Math.min(G, zt.y), U = Math.max(U, zt.x + zt.w), nt = Math.max(nt, zt.y + Bt);
          }
          B !== 1 / 0 && O >= B && O <= U && P >= G && P <= nt && (Z = !0);
        }
        if (!Z) {
          const B = t.hitTest(O, P, mt);
          B ? t.select(B.id) : t.deselectAll();
        }
      }
      const N = Array.from(t.selection), z = N.length > 0, V = [];
      if (V.push({
        items: [
          {
            label: l.actionCut,
            shortcut: "Mod+X",
            disabled: !z,
            action: () => {
              t.cutSelected(), ba(t);
            }
          },
          {
            label: l.actionCopy,
            shortcut: "Mod+C",
            disabled: !z,
            action: () => {
              t.copySelected(), ba(t);
            }
          },
          {
            label: l.actionPaste,
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              zp(t, O, P);
            }
          }
        ]
      }), V.push({
        items: [
          {
            label: l.actionDuplicate,
            shortcut: "Mod+D",
            disabled: !z,
            action: () => t.duplicateSelected()
          }
        ]
      }), N.filter((Z) => {
        const B = t.getNode(Z);
        return !!B && B.type !== "edge" && !B.locked;
      }).length >= 2 && (V.push({
        items: [
          {
            label: l.actionArrangeSelection,
            action: () => t.arrangeSelectedNodes(mt, y.zoom)
          }
        ]
      }), V.push({
        items: [
          {
            kind: "header",
            label: l.alignMenuHorizontal,
            action: () => {
            }
          },
          {
            label: l.alignLeft,
            icon: go.alignHLeft,
            action: () => t.alignSelectedNodes("left", mt)
          },
          {
            label: l.alignCenterHorizontal,
            icon: go.alignHCenter,
            action: () => t.alignSelectedNodes("centerH", mt)
          },
          {
            label: l.alignRight,
            icon: go.alignHRight,
            action: () => t.alignSelectedNodes("right", mt)
          },
          {
            label: l.alignDistributeHorizontal,
            icon: go.distributeH,
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
            icon: go.alignVTop,
            action: () => t.alignSelectedNodes("top", mt)
          },
          {
            label: l.alignCenterVertical,
            icon: go.alignVCenter,
            action: () => t.alignSelectedNodes("centerV", mt)
          },
          {
            label: l.alignBottom,
            icon: go.alignVBottom,
            action: () => t.alignSelectedNodes("bottom", mt)
          },
          {
            label: l.alignDistributeVertical,
            icon: go.distributeV,
            action: () => t.distributeSelectedNodes("vertical", mt)
          }
        ]
      })), z && V.push({
        items: [
          {
            label: l.actionAddToPersonalLibrary,
            action: () => {
              const Z = N.map((U) => t.getNode(U)).filter((U) => !!U).map((U) => structuredClone(U)), B = new Set(
                Z.map((U) => U.groupId).filter(Boolean)
              ), G = /* @__PURE__ */ new Map();
              for (const [U, nt] of t.groupParent)
                B.has(U) && G.set(U, nt);
              Zn({
                nodes: Z,
                groupParent: G
              });
            }
          }
        ]
      }), N.length >= 2 || z && t.selectionHasGroup()) {
        const Z = [];
        N.length >= 2 && Z.push({
          label: l.actionGroupSelection,
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && Z.push({
          label: l.actionUngroupSelection,
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), V.push({ items: Z });
      }
      if (z && N.every((B) => {
        const G = t.getNode(B);
        return G && (G.type === "draw" || G.type === "shape");
      }) && V.push({
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
      }), z && V.push({
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
      }), z) {
        const Z = N.some((U) => {
          var nt;
          return (nt = t.getNode(U)) == null ? void 0 : nt.locked;
        }), B = N.some((U) => {
          var nt;
          return !((nt = t.getNode(U)) != null && nt.locked);
        }), G = [];
        B && G.push({
          label: l.actionLock,
          action: () => {
            for (const U of N) t.updateNode(U, { locked: !0 });
          }
        }), Z && G.push({
          label: l.actionUnlock,
          action: () => {
            for (const U of N) t.updateNode(U, { locked: void 0 });
          }
        }), V.push({ items: G });
      }
      z && V.push({
        items: [
          {
            label: l.actionDelete,
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const Q = [10, 20, 40, 80];
      return V.push({
        items: [
          {
            label: l.actionToggleGrid,
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), ft(t.snapToGrid);
            }
          },
          {
            label: l.actionSmartGuides,
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), R(t.smartGuides);
            }
          },
          ...Q.map((Z) => ({
            label: `${Z}px`,
            checked: t.gridSize === Z,
            action: () => {
              t.setGridSize(Z);
            }
          }))
        ]
      }), V.push({
        items: [
          {
            label: l.actionExportAsPng,
            action: () => fa(t, { format: "png" })
          },
          {
            label: l.actionExportAsSvg,
            action: () => fa(t, { format: "svg" })
          }
        ]
      }), V;
    },
    [t, l, mt, y.zoom]
  ), yc = ct(
    (v) => {
      if (v.preventDefault(), t.presentationMode) return;
      const D = $r(v.clientX, v.clientY, v.altKey);
      Zr({ x: v.clientX, y: v.clientY, sections: D });
    },
    [t, $r]
  ), _r = ct(
    (v, D, A) => {
      const O = () => {
        const z = d.current, V = (z == null ? void 0 : z.ownerDocument) ?? document, Y = Array.from(
          V.querySelectorAll('input, textarea, [contenteditable="true"]')
        );
        for (const Q of Y)
          if (!(z != null && z.contains(Q)))
            try {
              Q.blur();
            } catch {
            }
      };
      O();
      const P = Ht(10);
      t.addNode({
        id: P,
        type: "text",
        x: v,
        y: D,
        w: A,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? Mo,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(P), Gn.current = P, Ur.current = { id: P, until: performance.now() + 1500 }, Do(P);
      const N = (z = 0) => {
        const V = d.current;
        if (!V) return;
        const Y = V.querySelector(
          `[data-node-id="${P}"] [contenteditable="true"]`
        );
        if (Y) {
          O(), Y.focus(), Ur.current = null;
          return;
        }
        z < 12 && requestAnimationFrame(() => N(z + 1));
      };
      requestAnimationFrame(() => N(0));
    },
    [t]
  ), mc = ct(
    (v) => {
      if (t.presentationMode || t.mode !== "select") return;
      const { x: D, y: A } = t.screenToCanvas(v.clientX, v.clientY), O = t.hitTestAll(D, A, mt), P = O.find((N) => !t.isContainerType(N.type)) ?? O[0] ?? null;
      if (P != null && P.groupId) {
        const N = [];
        let z = P.groupId;
        for (; z; )
          N.push(z), z = t.groupParent.get(z);
        if (!t.activeGroupId) {
          t.enterGroup(N[N.length - 1]), t.select(P.id);
          return;
        }
        const V = N.indexOf(t.activeGroupId);
        if (V > 0) {
          t.enterGroup(N[V - 1]), t.select(P.id);
          return;
        }
      }
      if (P && P.type === "text") {
        t.select(P.id), Xn.current = { clientX: v.clientX, clientY: v.clientY }, Do(P.id);
        return;
      }
      if (P && P.type === "sticky") {
        t.select(P.id), Ro(P.id);
        return;
      }
      if (P && P.type === "frame") {
        t.select(P.id), tr(P.id);
        return;
      }
      if (P && P.type === "shape") {
        const N = P.data, z = N.shape === "line" || N.shape === "arrow";
        t.select(P.id), z || er(P.id);
        return;
      }
      if (P && P.type === "draw") {
        t.select(P.id);
        return;
      }
      if (!P || P.type === "draw") {
        const z = t.getAllNodes().filter((V) => V.type === "shape").sort((V, Y) => Y.z - V.z).find((V) => !(V.data.shape === "line" || V.data.shape === "arrow") && Tn(V, D, A, t.viewport.zoom, !0));
        if (z) {
          t.select(z.id), er(z.id);
          return;
        }
      }
      P || (t.deselectAll(), _r(D, A, 300));
    },
    [t, mt, _r]
  ), gc = ct(
    (v) => {
      if (H.current.set(v.pointerId, { x: v.clientX, y: v.clientY }), v.pointerType === "pen" && (dt.current = !0), v.button !== 2 && gt(!0), v.pointerType === "touch" && (H.current.size >= 2 || dt.current)) {
        it.current = !0, st.current && (clearTimeout(st.current), st.current = null, ht.current = null);
        const P = new Map(H.current), N = [...H.current.keys()].find((Z) => Z !== v.pointerId);
        N !== void 0 && a().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: N,
            bubbles: !0,
            clientX: v.clientX,
            clientY: v.clientY
          })
        );
        const z = [...P.values()];
        let V = xa(z[0], z[1] ?? z[0]);
        const Y = (Z) => {
          if (!P.has(Z.pointerId)) return;
          P.set(Z.pointerId, { x: Z.clientX, y: Z.clientY });
          const B = [...P.values()];
          if (B.length < 2) return;
          const G = xa(B[0], B[1]);
          if (t.pan(G.mx - V.mx, G.my - V.my), V.dist > 1) {
            const U = Math.min(Math.max(G.dist / V.dist, 0.9), 1.1);
            t.zoomByFactor(U, G.mx, G.my);
          }
          V = G;
        }, Q = (Z) => {
          H.current.delete(Z.pointerId), P.delete(Z.pointerId), Z.pointerType === "pen" && (dt.current = !1), P.size < 2 && !dt.current && (it.current = !1, a().removeEventListener("pointermove", Y), a().removeEventListener("pointerup", Q), a().removeEventListener("pointercancel", Q));
        };
        a().addEventListener("pointermove", Y), a().addEventListener("pointerup", Q), a().addEventListener("pointercancel", Q);
        return;
      }
      if (it.current || t.presentationMode && !(v.button === 1 || v.button === 0 && rt.current))
        return;
      if ($o && Zr(null), v.pointerType === "touch") {
        const P = v.clientX, N = v.clientY, z = v.pointerId;
        ht.current = { clientX: P, clientY: N }, st.current = setTimeout(() => {
          if (st.current = null, !ht.current || it.current) return;
          const V = $r(P, N, !1);
          Zr({ x: P, y: N, sections: V }), a().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: z,
              bubbles: !0,
              clientX: P,
              clientY: N
            })
          ), ht.current = null;
        }, 500);
      }
      if (v.button === 1 || v.button === 0 && rt.current) {
        v.preventDefault(), _.current = !0;
        const P = t.viewport.x, N = t.viewport.y, z = v.clientX, V = v.clientY, Y = d.current;
        Y && (Y.style.cursor = "grabbing");
        const Q = (B) => {
          t.viewport.x = P + (B.clientX - z), t.viewport.y = N + (B.clientY - V), u({ ...t.viewport });
        }, Z = () => {
          _.current = !1, Y && (Y.style.cursor = rt.current ? "grab" : t.lassoSelect ? ir : ""), a().removeEventListener("pointermove", Q), a().removeEventListener("pointerup", Z);
        };
        a().addEventListener("pointermove", Q), a().addEventListener("pointerup", Z);
        return;
      }
      const { x: A, y: O } = t.screenToCanvas(v.clientX, v.clientY);
      if (v.pointerType === "touch" && st.current && t.hitTest(A, O, mt) && (clearTimeout(st.current), st.current = null, ht.current = null), t.mode === "select") {
        if (v.button !== 0) return;
        if (v.altKey) {
          const z = t.hitTestAll(A, O, mt);
          if (z.length > 0) {
            const V = qr.current, Y = Math.abs(A - V.x) + Math.abs(O - V.y);
            let Q = 0;
            Y < 5 && (Q = (V.index + 1) % z.length), qr.current = { x: A, y: O, index: Q }, t.select(z[Q].id);
          }
          return;
        }
        let P = !1;
        !t.lassoSelect && t.selection.size >= 2 && ue && A >= ue.x && A <= ue.x + ue.w && O >= ue.y && O <= ue.y + ue.h && (P = !0);
        let N = null;
        if (!t.lassoSelect) {
          const z = t.hitTestAll(A, O, mt);
          if (N = z.find((V) => t.selection.has(V.id) && !t.isContainerType(V.type)) ?? z.find((V) => !t.isContainerType(V.type)) ?? z[0] ?? null, !P) {
            const V = Wi(
              t.nodes,
              A,
              O,
              t.viewport.zoom,
              mt,
              Ne
            );
            V && (N ? N.type !== "draw" && N.type !== "shape" && !t.isContainerType(N.type) && V.distance < hd(N, A, O, mt) && (N = V.node) : N = V.node);
          }
        }
        if (N || P) {
          N && (t.activeGroupId && !t.isNodeInActiveGroup(N.id) && t.exitAllGroups(), v.shiftKey ? t.toggleSelect(N.id) : t.selection.has(N.id) || t.select(N.id));
          const z = Array.from(t.selection).filter(
            (Ot) => {
              var Nt;
              return !((Nt = t.getNode(Ot)) != null && Nt.locked);
            }
          );
          if (z.length === 0) return;
          const V = v.clientX, Y = v.clientY, Q = /* @__PURE__ */ new Set(), Z = /* @__PURE__ */ new Set();
          for (const Ot of z) {
            const Nt = t.getNode(Ot);
            if (Nt && t.isContainerType(Nt.type)) {
              Z.add(Ot);
              for (const Vt of t.getFrameDescendantIds(Ot))
                t.selection.has(Vt) || Q.add(Vt);
            }
          }
          const B = [...z, ...Q], G = B.map((Ot) => {
            const Nt = t.getNode(Ot);
            return { id: Ot, x: Nt.x, y: Nt.y };
          }), U = t.selectionGroupId(), nt = U ? t.groupRotations.get(U) : null, kt = nt == null ? void 0 : nt.cx, zt = nt == null ? void 0 : nt.cy;
          Kr(null);
          let Bt = !1, Tt = null, Ft = V, ee = Y, Ut = !1;
          const It = new Set(B), Dt = t.createDragSnapContext(It), bt = () => {
            Tt = null;
            const Ot = (Ft - V) / t.viewport.zoom, Nt = (ee - Y) / t.viewport.zoom, { finalDx: Vt, finalDy: fe } = t.computeDragSnap(
              G,
              It,
              Ot,
              Nt,
              Ut,
              Dt
            ), Yt = G.map((ae) => ({
              id: ae.id,
              patch: { x: ae.x + Vt, y: ae.y + fe }
            }));
            t.updateMany(Yt), nt && U && t.groupRotations.set(U, {
              angle: nt.angle,
              cx: kt + Vt,
              cy: zt + fe
            });
          }, Pt = (Ot) => {
            const Nt = (Ot.clientX - V) / t.viewport.zoom, Vt = (Ot.clientY - Y) / t.viewport.zoom;
            if (!Bt)
              if (Math.abs(Nt) > 2 || Math.abs(Vt) > 2)
                Bt = !0, t.pushHistorySnapshot(), T(!0);
              else
                return;
            Ft = Ot.clientX, ee = Ot.clientY, Ut = Ot.metaKey || Ot.ctrlKey, Tt === null && (Tt = requestAnimationFrame(bt));
          }, Zt = () => {
            if (Tt !== null && (cancelAnimationFrame(Tt), bt()), T(!1), t.clearAlignGuides(), a().removeEventListener("pointermove", Pt), a().removeEventListener("pointerup", Zt), Bt) {
              const Ot = z.filter(
                (Nt) => !Q.has(Nt)
              );
              Ot.length > 0 && t.updateFrameMembership(Ot);
            }
          };
          a().addEventListener("pointermove", Pt), a().addEventListener("pointerup", Zt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          v.shiftKey || t.deselectAll();
          const z = new Set(t.selection);
          if (t.lassoSelect) {
            const V = [[A, O]];
            Nn([...V]);
            let Y = null, Q = 0;
            const Z = (U = !1) => {
              Y = null;
              const nt = U || Q % 2 === 0;
              if (Q++, nt && V.length >= 3) {
                const zt = we(V, t.getAllNodes()).map((Tt) => Tt.id), Bt = v.shiftKey ? [.../* @__PURE__ */ new Set([...z, ...zt])] : zt;
                (Bt.length !== t.selection.size || Bt.some((Tt) => !t.selection.has(Tt))) && t.selectMultiple(Bt);
              }
              Nn([...V]);
            }, B = (U) => {
              const { x: nt, y: kt } = t.screenToCanvas(U.clientX, U.clientY);
              V.push([nt, kt]), Y === null && (Y = requestAnimationFrame(() => Z(!1)));
            }, G = () => {
              Y !== null && cancelAnimationFrame(Y), Z(!0), a().removeEventListener("pointermove", B), a().removeEventListener("pointerup", G), Nn(null), t.toggleLassoSelect();
            };
            a().addEventListener("pointermove", B), a().addEventListener("pointerup", G);
          } else {
            const V = { startX: A, startY: O, endX: A, endY: O };
            Fn(V);
            let Y = null, Q = 0;
            const Z = (U = !1, nt = !1) => {
              Y = null;
              const kt = Math.min(V.startX, V.endX), zt = Math.min(V.startY, V.endY), Bt = Math.abs(V.endX - V.startX), Tt = Math.abs(V.endY - V.startY), Ft = nt || U || Q % 2 === 0;
              if (Q++, Ft) {
                const Ut = ce(
                  { x: kt, y: zt, w: Bt, h: Tt },
                  t.getAllNodes()
                ).map((Dt) => Dt.id), It = v.shiftKey ? [.../* @__PURE__ */ new Set([...z, ...Ut])] : Ut;
                (It.length !== t.selection.size || It.some((Dt) => !t.selection.has(Dt))) && t.selectMultiple(It);
              }
              Fn({ ...V });
            }, B = (U) => {
              const { x: nt, y: kt } = t.screenToCanvas(U.clientX, U.clientY);
              V.endX = nt, V.endY = kt, Y === null && (Y = requestAnimationFrame(() => Z(!1)));
            }, G = () => {
              Y !== null && cancelAnimationFrame(Y), Z(!0), a().removeEventListener("pointermove", B), a().removeEventListener("pointerup", G), Fn(null);
            };
            a().addEventListener("pointermove", B), a().addEventListener("pointerup", G);
          }
        }
      } else if (t.mode === "text") {
        t.deselectAll();
        const P = A, N = O, z = {
          startX: A,
          startY: O,
          endX: A,
          endY: O
        };
        let V = !1;
        eo(z);
        const Y = (Z) => {
          const { x: B, y: G } = t.screenToCanvas(Z.clientX, Z.clientY);
          z.endX = B, z.endY = G;
          const U = Math.abs(z.endX - z.startX), nt = Math.abs(z.endY - z.startY);
          (U > 10 || nt > 10) && (V = !0), eo({ ...z });
        }, Q = () => {
          a().removeEventListener("pointermove", Y), a().removeEventListener("pointerup", Q), eo(null);
          const Z = V ? Math.max(Math.abs(z.endX - z.startX), 60) : 300, B = V ? Math.min(z.startX, z.endX) : P, G = V ? Math.min(z.startY, z.endY) : N;
          _r(B, G, Z);
        };
        a().addEventListener("pointermove", Y), a().addEventListener("pointerup", Q);
      } else if (t.mode === "note") {
        t.deselectAll();
        const P = A, N = O, z = {
          startX: A,
          startY: O,
          endX: A,
          endY: O
        };
        let V = !1;
        eo(z);
        const Y = (Z) => {
          const { x: B, y: G } = t.screenToCanvas(Z.clientX, Z.clientY);
          z.endX = B, z.endY = G;
          const U = Math.abs(z.endX - z.startX), nt = Math.abs(z.endY - z.startY);
          (U > 10 || nt > 10) && (V = !0), eo({ ...z });
        }, Q = () => {
          a().removeEventListener("pointermove", Y), a().removeEventListener("pointerup", Q), eo(null);
          const Z = V ? Math.max(Math.abs(z.endX - z.startX), 100) : 300, B = V ? Math.max(Math.abs(z.endY - z.startY), 40) : "auto", G = V ? Math.min(z.startX, z.endX) : P, U = V ? Math.min(z.startY, z.endY) : N;
          Ii(G, U, Z, B), t.setMode("select");
        };
        a().addEventListener("pointermove", Y), a().addEventListener("pointerup", Q);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const P = A, N = O, z = {
          startX: A,
          startY: O,
          endX: A,
          endY: O
        };
        let V = !1;
        eo(z);
        const Y = (Z) => {
          const { x: B, y: G } = t.screenToCanvas(Z.clientX, Z.clientY);
          z.endX = B, z.endY = G, Math.abs(z.endX - z.startX) > 10 && (V = !0), eo({ ...z });
        }, Q = () => {
          a().removeEventListener("pointermove", Y), a().removeEventListener("pointerup", Q), eo(null);
          const Z = V ? Math.max(Math.abs(z.endX - z.startX), 100) : 200, B = V ? Math.min(z.startX, z.endX) : P, G = V ? Math.min(z.startY, z.endY) : N, U = Ht(10), nt = V ? Math.max(Math.abs(z.endY - z.startY), 100) : 150;
          t.addNode({
            id: U,
            type: "sticky",
            x: B,
            y: G,
            w: Z,
            h: nt,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(U), Ro(U), t.setMode("select");
        };
        a().addEventListener("pointermove", Y), a().addEventListener("pointerup", Q);
      } else if (t.mode === "draw") {
        const P = v.pressure || 0.5, N = {
          points: [[A, O, P]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle,
          opacity: t.activeTool.opacity
        };
        Et(N), t.notifyDrawProgress(N);
        const z = (Y) => {
          const { x: Q, y: Z } = t.screenToCanvas(Y.clientX, Y.clientY), B = Y.pressure || 0.5;
          N.points.push([Q, Z, B]), Et({ ...N, points: [...N.points] }), t.notifyDrawProgress({ ...N, points: [...N.points] });
        }, V = () => {
          if (a().removeEventListener("pointermove", z), a().removeEventListener("pointerup", V), N.points.length < 2) {
            t.notifyDrawEnd(), Et(null);
            return;
          }
          let Y = 1 / 0, Q = 1 / 0, Z = -1 / 0, B = -1 / 0;
          for (const [U, nt] of N.points)
            U < Y && (Y = U), nt < Q && (Q = nt), U > Z && (Z = U), nt > B && (B = nt);
          const G = N.points.map(
            ([U, nt, kt]) => [U - Y, nt - Q, kt]
          );
          t.addNode({
            id: Ht(10),
            type: "draw",
            x: Y,
            y: Q,
            w: Z - Y,
            h: B - Q,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: G,
              color: N.color,
              strokeWidth: N.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => {
            Et(null), requestAnimationFrame(() => {
              t.notifyDrawEnd();
            });
          });
        };
        a().addEventListener("pointermove", z), a().addEventListener("pointerup", V);
      } else if (t.mode === "shape") {
        const P = {
          startX: A,
          startY: O,
          endX: A,
          endY: O
        };
        At(P);
        const N = (V) => {
          const { x: Y, y: Q } = t.screenToCanvas(V.clientX, V.clientY);
          P.endX = Y, P.endY = Q, At({ ...P }), t.notifyShapeProgress({
            ...P,
            shapeType: t.activeTool.shapeType || "rect",
            stroke: t.activeTool.color,
            strokeWidth: t.activeTool.width,
            roughness: t.activeTool.roughness ?? 1,
            fill: t.activeTool.fillColor,
            fillStyle: t.activeTool.fillStyle,
            strokeStyle: t.activeTool.strokeStyle,
            opacity: t.activeTool.opacity ?? 1
          });
        }, z = () => {
          a().removeEventListener("pointermove", N), a().removeEventListener("pointerup", z);
          const V = t.activeTool.shapeType || "rect", Y = V === "line" || V === "arrow", Q = Math.min(P.startX, P.endX);
          let Z = Math.min(P.startY, P.endY);
          const B = Math.abs(P.endX - P.startX), G = Math.abs(P.endY - P.startY);
          let U;
          if (Y) {
            const zt = t.activeTool.width * 2;
            U = Math.max(G, zt), G < zt && (Z -= (zt - G) / 2);
          } else
            U = G;
          if (B < 5 && (Y ? B < 5 && Math.abs(P.endY - P.startY) < 5 : U < 5)) {
            t.notifyShapeEnd(), At(null);
            return;
          }
          const nt = {};
          Y && (nt.startPoint = [
            P.startX - Q,
            P.startY - Z
          ], nt.endPoint = [
            P.endX - Q,
            P.endY - Z
          ]);
          const kt = Ht(10);
          t.addNode({
            id: kt,
            type: "shape",
            x: Q,
            y: Z,
            w: B,
            h: U,
            z: t.nextZ(),
            data: {
              shape: V,
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
            At(null), requestAnimationFrame(() => {
              t.notifyShapeEnd();
            });
          });
        };
        a().addEventListener("pointermove", N), a().addEventListener("pointerup", z);
      } else if (t.mode === "edge") {
        const P = t.hitTest(A, O, mt);
        if (!P || P.type === "edge") return;
        const N = t.freeFormEdges, z = N ? Fe(P, A, O, mt).t : void 0;
        Lt({
          fromNode: P,
          cursorX: A,
          cursorY: O,
          sourceT: z,
          edgeColor: t.activeTool.color,
          edgeStrokeWidth: t.activeTool.width || 2,
          edgeStyle: t.activeTool.strokeStyle || "solid",
          edgeType: t.activeTool.edgeType,
          attachmentGap: t.activeTool.attachmentGap
        });
        const V = (Q) => {
          const { x: Z, y: B } = t.screenToCanvas(Q.clientX, Q.clientY);
          Lt(
            (G) => G ? { ...G, cursorX: Z, cursorY: B } : null
          );
        }, Y = (Q) => {
          a().removeEventListener("pointermove", V), a().removeEventListener("pointerup", Y), Lt(null);
          const { x: Z, y: B } = t.screenToCanvas(Q.clientX, Q.clientY);
          let G = t.hitTest(Z, B, mt);
          if (!G || G.type === "edge" || t.isContainerType(G.type)) {
            const Tt = 50 / t.viewport.zoom;
            let Ft = 1 / 0, ee = !1, Ut = null;
            for (const It of t.getAllNodes()) {
              if (It.type === "edge" || It.id === P.id) continue;
              const Dt = t.isContainerType(It.type), bt = Fe(It, Z, B, mt), Pt = Math.hypot(bt.x - Z, bt.y - B);
              if (Pt < Tt) {
                if (Dt && !ee && Ut) continue;
                (!Dt && ee || Pt < Ft) && (Ft = Pt, ee = Dt, Ut = It);
              }
            }
            Ut && (G = Ut);
          }
          if (!G || G.type === "edge" || G.id === P.id)
            return;
          const U = N ? void 0 : rn(P, A, O, mt), nt = N ? void 0 : rn(G, Z, B, mt), kt = N ? Fe(G, Z, B, mt).t : void 0;
          if (t.getAllNodes().some((Tt) => {
            if (Tt.type !== "edge") return !1;
            const Ft = Tt.data;
            return N ? Ft.fromId === P.id && Ft.toId === G.id && Ft.sourceT !== void 0 && Ft.targetT !== void 0 && Math.abs(Ft.sourceT - z) < 0.02 && Math.abs(Ft.targetT - kt) < 0.02 : us(Ft, {
              fromId: P.id,
              toId: G.id,
              sourceHandle: U,
              targetHandle: nt
            });
          })) return;
          const Bt = {
            id: Ht(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: P.id,
              toId: G.id,
              style: t.activeTool.strokeStyle || "solid",
              color: t.activeTool.color,
              strokeWidth: t.activeTool.width || 2,
              arrowHead: t.activeTool.arrowHead ?? "arrow",
              arrowTail: t.activeTool.arrowTail ?? "none",
              edgeType: t.activeTool.edgeType ?? "bezier",
              roughness: t.activeTool.roughness ?? 0,
              attachmentGap: t.activeTool.attachmentGap,
              sourceHandle: U,
              targetHandle: nt,
              sourceT: z,
              targetT: kt
            }
          };
          t.addNode(Bt);
        };
        a().addEventListener("pointermove", V), a().addEventListener("pointerup", Y);
      } else if (t.mode === "frame") {
        const P = {
          startX: A,
          startY: O,
          endX: A,
          endY: O
        };
        At(P);
        const N = (V) => {
          const { x: Y, y: Q } = t.screenToCanvas(V.clientX, V.clientY);
          P.endX = Y, P.endY = Q, At({ ...P });
        }, z = () => {
          a().removeEventListener("pointermove", N), a().removeEventListener("pointerup", z);
          const V = Math.min(P.startX, P.endX), Y = Math.min(P.startY, P.endY), Q = Math.abs(P.endX - P.startX), Z = Math.abs(P.endY - P.startY);
          if (Q < 20 || Z < 20) {
            At(null);
            return;
          }
          const B = Ht(10);
          t.addNode({
            id: B,
            type: "frame",
            x: V,
            y: Y,
            w: Q,
            h: Z,
            z: t.nextZ(),
            data: {
              label: l.typeFrame,
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(B), At(null), t.select(B), t.setMode("select");
        };
        a().addEventListener("pointermove", N), a().addEventListener("pointerup", z);
      } else if (t.mode === "erase") {
        if (v.button !== 0) return;
        const P = (kt, zt) => {
          const Bt = t.hitTestAll(kt, zt, mt), Tt = jd(
            t.nodes,
            kt,
            zt,
            t.viewport.zoom,
            mt,
            Ne
          );
          let Ft = !1;
          for (const ee of [...Bt, ...Tt])
            co.current.has(ee.id) || (co.current.add(ee.id), Ft = !0);
          Ft && jn(new Set(co.current));
        }, N = 400;
        co.current = /* @__PURE__ */ new Set();
        const z = Date.now();
        je.current = [[A, O, z]], Cr([[A, O, z]]), P(A, O), Ir(!0);
        let V = A, Y = O;
        const Q = () => {
          const kt = Date.now(), zt = je.current.length;
          je.current = je.current.filter(
            (Bt) => kt - Bt[2] < N
          ), je.current.length !== zt && Cr([...je.current]), Ir(), ho.current = requestAnimationFrame(Q);
        };
        ho.current = requestAnimationFrame(Q);
        const Z = (kt) => {
          const { x: zt, y: Bt } = t.screenToCanvas(kt.clientX, kt.clientY);
          V = zt, Y = Bt;
          const Tt = Date.now();
          je.current.push([V, Y, Tt]), Cr([...je.current]), P(V, Y), Ir(!0);
        }, B = () => {
          ho.current !== null && (cancelAnimationFrame(ho.current), ho.current = null), t.notifyEraserEnd(), co.current = /* @__PURE__ */ new Set(), jn(/* @__PURE__ */ new Set()), je.current = [], Cr([]);
        }, G = () => {
          nt();
          const kt = Array.from(co.current);
          Ir(!0), B(), kt.length > 0 && t.deleteNodes(kt);
        }, U = (kt) => {
          kt.key === "Escape" && (nt(), Ir(!0), B());
        }, nt = () => {
          a().removeEventListener("pointermove", Z), a().removeEventListener("pointerup", G), a().removeEventListener("keydown", U);
        };
        a().addEventListener("pointermove", Z), a().addEventListener("pointerup", G), a().addEventListener("keydown", U);
      } else if (t.mode === "laser") {
        if (v.button !== 0) return;
        const P = 1560;
        rr.current !== null && (cancelAnimationFrame(rr.current), rr.current = null);
        const N = performance.now();
        Ce.current.length > 0 && Ce.current.push([NaN, NaN, N]), Ce.current.push([A, O, N]), Jr([...Ce.current]), t.notifyLaserProgress([[A, O]]);
        let z = N;
        const V = () => {
          const Z = performance.now(), B = Ce.current.length;
          Ce.current = Ce.current.filter(
            (G) => Z - G[2] < P
          ), (Ce.current.length !== B || Ce.current.length > 0) && Jr([...Ce.current]), Z - z >= 60 && (z = Z, Ce.current.length > 0 && t.notifyLaserProgress(
            Ce.current.map((G) => [G[0], G[1]])
          )), Ce.current.length > 0 ? rr.current = requestAnimationFrame(V) : (rr.current = null, Jr([]), t.notifyLaserEnd());
        };
        rr.current = requestAnimationFrame(V);
        const Y = (Z) => {
          const { x: B, y: G } = t.screenToCanvas(Z.clientX, Z.clientY), U = performance.now();
          Ce.current.push([B, G, U]), Jr([...Ce.current]), t.notifyLaserProgress(
            Ce.current.map((nt) => [nt[0], nt[1]])
          );
        }, Q = () => {
          a().removeEventListener("pointermove", Y), a().removeEventListener("pointerup", Q);
        };
        a().addEventListener("pointermove", Y), a().addEventListener("pointerup", Q);
      } else if (t.mode === "hand") {
        if (v.button !== 0) return;
        v.preventDefault();
        const P = t.viewport.x, N = t.viewport.y, z = v.clientX, V = v.clientY, Y = d.current;
        Y && (Y.style.cursor = "grabbing");
        const Q = (B) => {
          t.viewport.x = P + (B.clientX - z), t.viewport.y = N + (B.clientY - V), u({ ...t.viewport });
        }, Z = () => {
          Y && (Y.style.cursor = t.lassoSelect ? ir : fn(t.mode)), a().removeEventListener("pointermove", Q), a().removeEventListener("pointerup", Z);
        };
        a().addEventListener("pointermove", Q), a().addEventListener("pointerup", Z);
      }
    },
    [
      t,
      Ii,
      _r,
      $o,
      $r,
      ue,
      mt,
      I,
      ce,
      gt
    ]
  ), Kn = ct(
    (v, D, A) => {
      if (A.preventDefault(), t.presentationMode) return;
      const O = t.getNode(v);
      if (!O || O.locked) return;
      const P = A.clientX, N = A.clientY, z = O.x, V = O.y, Y = O.w, Q = O.h === "auto", Z = Q ? mt[v] ?? 100 : O.h, B = O.type === "draw" ? O.data.points.map(
        (Tt) => [...Tt]
      ) : null, G = O.type === "shape" ? O.data.startPoint : void 0, U = O.type === "shape" ? O.data.endPoint : void 0, nt = O.type === "text" ? O.data.fontSize : 0;
      let kt = !1;
      const zt = (Tt) => {
        const Ft = (Tt.clientX - P) / t.viewport.zoom, ee = (Tt.clientY - N) / t.viewport.zoom;
        kt || (kt = !0, t.pushHistorySnapshot());
        let Ut = z, It = V, Dt = Y, bt = Z;
        if ((D === "nw" || D === "w" || D === "sw") && (Ut = z + Ft, Dt = Y - Ft), (D === "ne" || D === "e" || D === "se") && (Dt = Y + Ft), (D === "nw" || D === "n" || D === "ne") && (It = V + ee, bt = Z - ee), (D === "sw" || D === "s" || D === "se") && (bt = Z + ee), t.snapToGrid && !(Tt.metaKey || Tt.ctrlKey)) {
          const Nt = t.gridSize, Vt = (fe) => Math.round(fe / Nt) * Nt;
          (D === "nw" || D === "w" || D === "sw") && (Ut = Vt(Ut), Dt = z + Y - Ut), (D === "ne" || D === "e" || D === "se") && (Dt = Vt(Ut + Dt) - Ut), (D === "nw" || D === "n" || D === "ne") && (It = Vt(It), bt = V + Z - It), (D === "sw" || D === "s" || D === "se") && (bt = Vt(It + bt) - It);
        }
        let Pt = 10, Zt = 10;
        if (O.type === "legacy-voicenote" ? (Pt = 260, Zt = 120) : O.type === "legacy-canvas-link" && (Pt = 220, Zt = 86), Dt < Pt && (Dt = Pt, (D === "nw" || D === "w" || D === "sw") && (Ut = z + Y - Pt)), bt < Zt && (bt = Zt, (D === "nw" || D === "n" || D === "ne") && (It = V + Z - Zt)), Tt.shiftKey && !(O.type === "frame" && O.data.devicePreset)) {
          const Nt = Ps(
            D,
            z,
            V,
            Y,
            Z,
            Ut,
            It,
            Dt,
            bt
          );
          Ut = Nt.x, It = Nt.y, Dt = Nt.w, bt = Nt.h;
        }
        if (O.type === "frame") {
          const Nt = O.data.devicePreset;
          if (Nt) {
            const Vt = Gs(Nt);
            if (Vt) {
              const fe = oc(Vt);
              if (D === "nw" || D === "ne" || D === "sw" || D === "se" || (D === "e" || D === "w")) {
                const be = Math.round(Dt / fe);
                (D === "nw" || D === "ne") && (It = V + Z - be), bt = be;
              } else
                Dt = Math.round(bt * fe);
            }
          }
        }
        const Ot = {
          x: Ut,
          y: It,
          w: Dt,
          h: Q ? "auto" : bt
        };
        if (B && O.type === "draw") {
          const Nt = Y > 0 ? Dt / Y : 1, Vt = Z > 0 ? bt / Z : 1, fe = B.map(
            ([Yt, ae, be]) => [Yt * Nt, ae * Vt, be]
          );
          Ot.data = { ...O.data, points: fe };
        }
        if (O.type === "shape" && (G || U)) {
          const Nt = Y > 0 ? Dt / Y : 1, Vt = Z > 0 ? bt / Z : 1, fe = { ...O.data };
          G && (fe.startPoint = [
            G[0] * Nt,
            G[1] * Vt
          ]), U && (fe.endPoint = [
            U[0] * Nt,
            U[1] * Vt
          ]), Ot.data = fe;
        }
        if (O.type === "text" && nt > 0 && D !== "e" && D !== "w") {
          const Nt = D === "n" || D === "s" ? Z > 0 ? bt / Z : 1 : Y > 0 ? Dt / Y : 1, Vt = Math.max(8, Math.round(nt * Nt));
          Ot.data = { ...O.data, fontSize: Vt };
        }
        t.updateNode(v, Ot);
      }, Bt = () => {
        a().removeEventListener("pointermove", zt), a().removeEventListener("pointerup", Bt), t.isContainerType(O.type) && t.syncFrameChildrenAfterResize(v);
      };
      a().addEventListener("pointermove", zt), a().addEventListener("pointerup", Bt);
    },
    [t, mt]
  ), bc = ct(
    (v, D) => {
      D.stopPropagation(), D.preventDefault();
      const A = t.getNode(v);
      if (!A || A.locked) return;
      const O = A.h === "auto" ? mt[v] ?? 100 : A.h, P = A.x + A.w / 2, N = A.y + O / 2, z = A.rotation || 0, { x: V, y: Y } = t.screenToCanvas(
        D.clientX,
        D.clientY
      ), Q = Math.atan2(Y - N, V - P);
      let Z = !1;
      const B = (U) => {
        Z || (Z = !0, t.pushHistorySnapshot());
        const { x: nt, y: kt } = t.screenToCanvas(U.clientX, U.clientY), zt = Math.atan2(kt - N, nt - P);
        let Bt = z + (zt - Q) * (180 / Math.PI);
        (U.shiftKey || t.snapToGrid) && !(U.metaKey || U.ctrlKey) && (Bt = Math.round(Bt / 15) * 15), t.updateNode(v, { rotation: Bt });
      }, G = () => {
        a().removeEventListener("pointermove", B), a().removeEventListener("pointerup", G);
      };
      a().addEventListener("pointermove", B), a().addEventListener("pointerup", G);
    },
    [t, mt]
  ), Ti = ct(
    (v, D, A) => {
      A.stopPropagation(), A.preventDefault();
      const O = t.getNode(v);
      if (!O) return;
      const { x: P, y: N } = t.screenToCanvas(A.clientX, A.clientY), z = t.freeFormEdges, V = z ? Fe(O, P, N, mt).t : void 0;
      Lt({
        fromNode: O,
        cursorX: P,
        cursorY: N,
        sourceHandle: z ? void 0 : D,
        sourceT: V,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid",
        edgeType: t.activeTool.edgeType,
        attachmentGap: t.activeTool.attachmentGap
      });
      const Y = (Z) => {
        const { x: B, y: G } = t.screenToCanvas(Z.clientX, Z.clientY);
        Lt(
          (U) => U ? { ...U, cursorX: B, cursorY: G } : null
        );
      }, Q = (Z) => {
        a().removeEventListener("pointermove", Y), a().removeEventListener("pointerup", Q), Lt(null);
        const { x: B, y: G } = t.screenToCanvas(Z.clientX, Z.clientY);
        let U = t.hitTest(B, G, mt);
        if (!U || U.type === "edge" || t.isContainerType(U.type)) {
          const Tt = 50 / t.viewport.zoom;
          let Ft = 1 / 0, ee = !1, Ut = null;
          for (const It of t.getAllNodes()) {
            if (It.type === "edge" || It.id === O.id) continue;
            const Dt = t.isContainerType(It.type), bt = Fe(It, B, G, mt), Pt = Math.hypot(bt.x - B, bt.y - G);
            Pt >= Tt || Dt && !ee && Ut || (!Dt && ee || Pt < Ft) && (Ft = Pt, ee = Dt, Ut = It);
          }
          Ut && (U = Ut);
        }
        if (!U || U.type === "edge" || U.id === O.id)
          return;
        const nt = z ? void 0 : rn(U, B, G, mt), kt = z ? Fe(U, B, G, mt).t : void 0;
        if (t.getAllNodes().some((Tt) => {
          if (Tt.type !== "edge") return !1;
          const Ft = Tt.data;
          return z ? Ft.fromId === O.id && Ft.toId === U.id && Ft.sourceT !== void 0 && Ft.targetT !== void 0 && Math.abs(Ft.sourceT - V) < 0.02 && Math.abs(Ft.targetT - kt) < 0.02 : us(Ft, {
            fromId: O.id,
            toId: U.id,
            sourceHandle: D,
            targetHandle: nt
          });
        })) return;
        const Bt = {
          id: Ht(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: O.id,
            toId: U.id,
            style: t.activeTool.strokeStyle || "solid",
            color: t.activeTool.color,
            strokeWidth: t.activeTool.width || 2,
            arrowHead: t.activeTool.arrowHead ?? "arrow",
            arrowTail: t.activeTool.arrowTail ?? "none",
            edgeType: t.activeTool.edgeType ?? "bezier",
            roughness: t.activeTool.roughness ?? 0,
            attachmentGap: t.activeTool.attachmentGap,
            sourceHandle: z ? void 0 : D,
            targetHandle: nt,
            sourceT: V,
            targetT: kt
          }
        };
        t.addNode(Bt);
      };
      a().addEventListener("pointermove", Y), a().addEventListener("pointerup", Q);
    },
    [t, mt]
  ), xc = ct(
    (v) => {
      let D = null, A = v === "top" || v === "left" ? 1 / 0 : -1 / 0;
      for (const O of t.selection) {
        const P = t.getNode(O);
        if (!P || P.type === "edge") continue;
        const N = P.h === "auto" ? mt[P.id] ?? 100 : P.h;
        let z;
        switch (v) {
          case "top":
            z = P.y;
            break;
          case "bottom":
            z = P.y + N;
            break;
          case "left":
            z = P.x;
            break;
          case "right":
            z = P.x + P.w;
            break;
        }
        (v === "top" || v === "left" ? z < A : z > A) && (A = z, D = O);
      }
      return D;
    },
    [t, mt]
  ), wc = ct(
    (v, D, A, O) => {
      var G;
      O.stopPropagation(), O.preventDefault();
      const P = t.getNode(v);
      if (!P || !o) return;
      const N = o.get(P.type), z = (G = ye(N, P)) == null ? void 0 : G.find((U) => U.id === D);
      if (!z) return;
      const V = A === "input" ? "left" : "right", { x: Y, y: Q } = t.screenToCanvas(O.clientX, O.clientY);
      Lt({
        fromNode: P,
        cursorX: Y,
        cursorY: Q,
        sourceHandle: V,
        sourcePort: D,
        sourceDirection: A,
        edgeColor: t.activeTool.color,
        edgeStrokeWidth: t.activeTool.width || 2,
        edgeStyle: t.activeTool.strokeStyle || "solid",
        edgeType: t.activeTool.edgeType,
        attachmentGap: t.activeTool.attachmentGap
      });
      const Z = (U) => {
        const { x: nt, y: kt } = t.screenToCanvas(U.clientX, U.clientY);
        Lt(
          (zt) => zt ? { ...zt, cursorX: nt, cursorY: kt } : null
        );
      }, B = (U) => {
        a().removeEventListener("pointermove", Z), a().removeEventListener("pointerup", B), Lt(null);
        const { x: nt, y: kt } = t.screenToCanvas(U.clientX, U.clientY), zt = A === "output" ? "input" : "output", Bt = Qs / t.viewport.zoom;
        let Tt = null, Ft = null, ee = 1 / 0;
        for (const ae of t.getAllNodes()) {
          if (ae.type === "edge" || ae.id === P.id) continue;
          const be = o.get(ae.type), ke = ye(be, ae);
          if (ke != null && ke.length)
            for (const Ie of ke) {
              if (Ie.direction !== zt || z.dataType !== "any" && Ie.dataType !== "any" && z.dataType !== Ie.dataType) continue;
              const ze = Ee(
                ae,
                ke,
                Ie.id,
                t.viewport.zoom,
                t.measuredHeights,
                be.portAnchor ?? "bbox"
              );
              if (!ze) continue;
              const ro = Math.hypot(ze.x - nt, ze.y - kt);
              ro < Bt && ro < ee && (ee = ro, Tt = ae, Ft = Ie);
            }
        }
        if (!Tt || !Ft) return;
        const Ut = Ft.id, It = A === "output" ? Tt.id : P.id, Dt = A === "output" ? Ut : D;
        if (t.getAllNodes().some((ae) => {
          if (ae.type !== "edge") return !1;
          const be = ae.data;
          return be.toId === It && be.targetPort === Dt;
        })) return;
        const Pt = A === "output" ? P.id : Tt.id, Zt = A === "output" ? Tt.id : P.id, Ot = A === "output" ? D : Ut, Nt = A === "output" ? Ut : D, Yt = {
          id: Ht(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Pt,
            toId: Zt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: Ot,
            targetPort: Nt
          }
        };
        t.addNode(Yt), t.select(Yt.id);
      };
      a().addEventListener("pointermove", Z), a().addEventListener("pointerup", B);
    },
    [t, o, mt]
  ), [tn, vc] = ot(0);
  St(() => {
    if (r)
      return r.onChange(() => vc((v) => v + 1));
  }, [r]);
  const kc = ct(
    (v) => r == null ? void 0 : r.getLastComputeMs(v),
    [r, tn]
  ), Sc = ct(
    (v, D) => r ? r.getPortValue(v, D) : null,
    [r, tn]
  ), Mc = ct(
    (v, D, A, O, P) => {
      P.stopPropagation(), P.preventDefault();
      const N = t.getNode(v);
      if (!N || N.type !== "edge") return;
      let z = !1;
      const V = (Q) => {
        z || (z = !0, t.pushHistorySnapshot());
        const Z = t.screenToCanvas(Q.clientX, Q.clientY), B = t.getNode(v);
        if (!B) return;
        const G = t.getNode(B.data.fromId), U = t.getNode(B.data.toId);
        if (!(!G || !U))
          if (D === "xy") {
            const nt = Pe(
              G,
              U,
              B.data.edgeType || "bezier",
              mt,
              B.data.sourceHandle,
              B.data.targetHandle,
              void 0,
              void 0,
              // no offsets → natural midpoint
              void 0,
              void 0,
              B.data.sourceT,
              B.data.targetT,
              B.data.attachmentGap
            );
            if (!nt.kinkHandle) return;
            const kt = Z.x - nt.kinkHandle.x, zt = Z.y - nt.kinkHandle.y;
            t.updateNode(v, {
              data: { ...B.data, curveOffset: [kt, zt] }
            });
          } else {
            const nt = D === "x" ? Z.x : Z.y, kt = Pe(
              G,
              U,
              B.data.edgeType || "bezier",
              mt,
              B.data.sourceHandle,
              B.data.targetHandle,
              0.5,
              void 0,
              // default to get range
              void 0,
              void 0,
              B.data.sourceT,
              B.data.targetT,
              B.data.attachmentGap
            );
            if (!kt.kinkHandle) return;
            const zt = kt.kinkHandle.min, Bt = kt.kinkHandle.max, Tt = Bt - zt;
            if (Tt === 0) return;
            const ee = (Math.max(zt, Math.min(Bt, nt)) - zt) / Tt;
            t.updateNode(v, {
              data: { ...B.data, midpointOffset: ee }
            });
          }
      }, Y = () => {
        a().removeEventListener("pointermove", V), a().removeEventListener("pointerup", Y);
      };
      a().addEventListener("pointermove", V), a().addEventListener("pointerup", Y);
    },
    [t, mt]
  ), Cc = ct(
    (v, D, A) => {
      A.stopPropagation(), A.preventDefault();
      const O = t.getNode(v);
      if (!O || O.type !== "edge") return;
      const { fromId: P, toId: N, sourceHandle: z, targetHandle: V } = O.data, Y = D === "source" ? N : P, Q = D === "source" ? V : z, Z = t.getNode(P), B = t.getNode(N);
      if (!Z || !B) return;
      const G = Pe(
        Z,
        B,
        O.data.edgeType || "bezier",
        mt,
        z,
        V,
        void 0,
        void 0,
        void 0,
        void 0,
        O.data.sourceT,
        O.data.targetT,
        O.data.attachmentGap
      ), U = D === "source" ? { x: G.x1, y: G.y1 } : { x: G.x2, y: G.y2 };
      ne({
        edgeId: v,
        endpoint: D,
        anchorNodeId: Y,
        anchorHandle: Q,
        cursorX: U.x,
        cursorY: U.y
      });
      const nt = (zt) => {
        const { x: Bt, y: Tt } = t.screenToCanvas(zt.clientX, zt.clientY);
        ne(
          (Ft) => Ft ? { ...Ft, cursorX: Bt, cursorY: Tt } : null
        );
      }, kt = (zt) => {
        a().removeEventListener("pointermove", nt), a().removeEventListener("pointerup", kt), ne(null);
        const { x: Bt, y: Tt } = t.screenToCanvas(zt.clientX, zt.clientY);
        let Ft = t.hitTest(Bt, Tt, mt);
        if (!Ft || Ft.type === "edge" || t.isContainerType(Ft.type)) {
          const Vt = 50 / t.viewport.zoom;
          let fe = 1 / 0, Yt = !1, ae = null;
          for (const be of t.getAllNodes()) {
            if (be.type === "edge") continue;
            const ke = t.isContainerType(be.type), Ie = Fe(be, Bt, Tt, mt), ze = Math.hypot(Ie.x - Bt, Ie.y - Tt);
            ze >= Vt || ke && !Yt && ae || (!ke && Yt || ze < fe) && (fe = ze, Yt = ke, ae = be);
          }
          ae && (Ft = ae);
        }
        if (!Ft || Ft.type === "edge") return;
        const ee = D === "source" ? Ft.id : P, Ut = D === "target" ? Ft.id : N;
        if (ee === Ut) return;
        const It = D === "source" ? P : N;
        if (Ft.id === It) return;
        const Dt = O.data.sourceT !== void 0 || O.data.targetT !== void 0, bt = Dt ? void 0 : rn(Ft, Bt, Tt, mt), Pt = Dt ? Fe(Ft, Bt, Tt, mt).t : void 0, Zt = D === "source" ? {
          fromId: ee,
          toId: Ut,
          sourceHandle: bt ?? z,
          targetHandle: V,
          sourcePort: O.data.sourcePort,
          targetPort: O.data.targetPort
        } : {
          fromId: ee,
          toId: Ut,
          sourceHandle: z,
          targetHandle: bt ?? V,
          sourcePort: O.data.sourcePort,
          targetPort: O.data.targetPort
        };
        if (t.getAllNodes().some((Vt) => Vt.type !== "edge" || Vt.id === v ? !1 : us(Vt.data, Zt))) return;
        let Nt;
        Dt ? Nt = D === "source" ? { fromId: Ft.id, sourceT: Pt, sourceHandle: void 0 } : { toId: Ft.id, targetT: Pt, targetHandle: void 0 } : Nt = D === "source" ? { fromId: Ft.id, sourceHandle: bt } : { toId: Ft.id, targetHandle: bt }, t.updateNodeWithHistory(v, { data: Nt });
      };
      a().addEventListener("pointermove", nt), a().addEventListener("pointerup", kt);
    },
    [t, mt]
  ), Ic = ct(
    (v) => {
      if (v.stopPropagation(), v.preventDefault(), t.presentationMode) return;
      const D = Array.from(t.selection).map((Pt) => t.getNode(Pt)).filter(Boolean);
      if (D.length < 2) return;
      const O = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, P = O ? t.groupRotations.get(O) : null;
      let N, z;
      if (P)
        N = P.cx, z = P.cy;
      else {
        let Pt = 1 / 0, Zt = 1 / 0, Ot = -1 / 0, Nt = -1 / 0;
        for (const Vt of D) {
          const fe = Vt.h === "auto" ? mt[Vt.id] ?? 100 : Vt.h, Yt = I(Vt, fe);
          Pt = Math.min(Pt, Yt.minX), Zt = Math.min(Zt, Yt.minY), Ot = Math.max(Ot, Yt.maxX), Nt = Math.max(Nt, Yt.maxY);
        }
        N = (Pt + Ot) / 2, z = (Zt + Nt) / 2;
      }
      const V = (P == null ? void 0 : P.angle) ?? 0, Q = D.filter((Pt) => !Pt.locked).map((Pt) => {
        const Zt = Pt.h === "auto" ? mt[Pt.id] ?? 100 : Pt.h;
        return {
          id: Pt.id,
          cx: Pt.x + Pt.w / 2,
          cy: Pt.y + Zt / 2,
          w: Pt.w,
          h: Zt,
          rotation: Pt.rotation || 0
        };
      }), Z = -V * Math.PI / 180, B = Math.cos(Z), G = Math.sin(Z);
      let U = 1 / 0, nt = 1 / 0, kt = -1 / 0, zt = -1 / 0;
      for (const Pt of Q) {
        const Zt = Pt.cx - N, Ot = Pt.cy - z, Nt = N + Zt * B - Ot * G, Vt = z + Zt * G + Ot * B;
        U = Math.min(U, Nt - Pt.w / 2), nt = Math.min(nt, Vt - Pt.h / 2), kt = Math.max(kt, Nt + Pt.w / 2), zt = Math.max(zt, Vt + Pt.h / 2);
      }
      const Bt = {
        x: U - lt,
        y: nt - lt,
        w: kt - U + lt * 2,
        h: zt - nt + lt * 2
      }, { x: Tt, y: Ft } = t.screenToCanvas(v.clientX, v.clientY), ee = Math.atan2(Ft - z, Tt - N);
      let Ut = !1, It = V;
      const Dt = (Pt) => {
        Ut || (Ut = !0, t.pushHistorySnapshot());
        const { x: Zt, y: Ot } = t.screenToCanvas(Pt.clientX, Pt.clientY);
        let Vt = (Math.atan2(Ot - z, Zt - N) - ee) * (180 / Math.PI);
        (Pt.shiftKey || t.snapToGrid) && !(Pt.metaKey || Pt.ctrlKey) && (Vt = Math.round(Vt / 15) * 15), It = V + Vt, Kr({ angle: It, cx: N, cy: z, bounds: Bt });
        const fe = Vt * Math.PI / 180, Yt = Math.cos(fe), ae = Math.sin(fe), be = Q.map((ke) => {
          const Ie = ke.cx - N, ze = ke.cy - z, ro = N + Ie * Yt - ze * ae, Tr = z + Ie * ae + ze * Yt;
          return {
            id: ke.id,
            patch: {
              x: ro - ke.w / 2,
              y: Tr - ke.h / 2,
              rotation: It
            }
          };
        });
        t.updateMany(be);
      }, bt = () => {
        O && t.groupRotations.set(O, { angle: It, cx: N, cy: z }), Kr({ angle: It, cx: N, cy: z, bounds: Bt }), a().removeEventListener("pointermove", Dt), a().removeEventListener("pointerup", bt);
      };
      a().addEventListener("pointermove", Dt), a().addEventListener("pointerup", bt);
    },
    [t, mt, I]
  ), Tc = ct(
    (v, D) => {
      if (D.stopPropagation(), D.preventDefault(), t.presentationMode) return;
      const A = Array.from(t.selection).map((bt) => t.getNode(bt)).filter(Boolean);
      if (A.length < 2) return;
      const O = (bt) => bt.h === "auto" ? mt[bt.id] ?? 100 : bt.h;
      let P = 1 / 0, N = 1 / 0, z = -1 / 0, V = -1 / 0;
      for (const bt of A) {
        const Pt = O(bt), Zt = I(bt, Pt);
        P = Math.min(P, Zt.minX), N = Math.min(N, Zt.minY), z = Math.max(z, Zt.maxX), V = Math.max(V, Zt.maxY);
      }
      const Y = { x: P, y: N, w: z - P, h: V - N }, Q = Y.w || 1, Z = Y.h || 1, G = A.filter((bt) => !bt.locked).map((bt) => {
        const Pt = O(bt);
        return {
          id: bt.id,
          type: bt.type,
          isAutoH: bt.h === "auto",
          relX: (bt.x - Y.x) / Q,
          relY: (bt.y - Y.y) / Z,
          relW: bt.w / Q,
          relH: Pt / Z,
          origW: bt.w,
          origH: Pt,
          origPoints: bt.type === "draw" ? bt.data.points.map((Zt) => [...Zt]) : null,
          drawData: bt.type === "draw" ? { ...bt.data } : null,
          origFontSize: bt.type === "text" ? bt.data.fontSize : 0,
          textData: bt.type === "text" ? { ...bt.data } : null
        };
      }), U = D.clientX, nt = D.clientY;
      let kt = !1, zt = null, Bt = U, Tt = nt, Ft = !1, ee = D.shiftKey;
      const Ut = () => {
        zt = null;
        const bt = (Bt - U) / t.viewport.zoom, Pt = (Tt - nt) / t.viewport.zoom;
        !kt && (bt !== 0 || Pt !== 0) && (kt = !0, t.pushHistorySnapshot());
        let Zt = Y.x, Ot = Y.y, Nt = Y.w, Vt = Y.h;
        if ((v === "nw" || v === "w" || v === "sw") && (Zt = Y.x + bt, Nt = Y.w - bt), (v === "ne" || v === "e" || v === "se") && (Nt = Y.w + bt), (v === "nw" || v === "n" || v === "ne") && (Ot = Y.y + Pt, Vt = Y.h - Pt), (v === "sw" || v === "s" || v === "se") && (Vt = Y.h + Pt), t.snapToGrid && !Ft) {
          const Yt = t.gridSize, ae = (be) => Math.round(be / Yt) * Yt;
          (v === "nw" || v === "w" || v === "sw") && (Zt = ae(Zt), Nt = Y.x + Y.w - Zt), (v === "ne" || v === "e" || v === "se") && (Nt = ae(Zt + Nt) - Zt), (v === "nw" || v === "n" || v === "ne") && (Ot = ae(Ot), Vt = Y.y + Y.h - Ot), (v === "sw" || v === "s" || v === "se") && (Vt = ae(Ot + Vt) - Ot);
        }
        if (Nt < 20 && (Nt = 20, (v === "nw" || v === "w" || v === "sw") && (Zt = Y.x + Y.w - 20)), Vt < 20 && (Vt = 20, (v === "nw" || v === "n" || v === "ne") && (Ot = Y.y + Y.h - 20)), ee && Y.w > 0 && Y.h > 0) {
          const Yt = Ps(
            v,
            Y.x,
            Y.y,
            Y.w,
            Y.h,
            Zt,
            Ot,
            Nt,
            Vt
          );
          Zt = Yt.x, Ot = Yt.y, Nt = Yt.w, Vt = Yt.h;
        }
        const fe = G.map((Yt) => {
          const ae = Zt + Yt.relX * Nt, be = Ot + Yt.relY * Vt, ke = Yt.relW * Nt, Ie = Yt.relH * Vt, ze = {
            x: ae,
            y: be,
            w: ke,
            h: Yt.isAutoH ? "auto" : Ie
          };
          if (Yt.origPoints && Yt.drawData) {
            const ro = Yt.origW > 0 ? ke / Yt.origW : 1, Tr = Yt.origH > 0 ? Ie / Yt.origH : 1;
            ze.data = {
              ...Yt.drawData,
              points: Yt.origPoints.map(
                ([Hc, Lc, Dc]) => [Hc * ro, Lc * Tr, Dc]
              )
            };
          }
          if (Yt.type === "text" && Yt.origFontSize > 0 && Yt.textData && v !== "e" && v !== "w") {
            const ro = v === "n" || v === "s" ? Yt.origH > 0 ? Ie / Yt.origH : 1 : Yt.origW > 0 ? ke / Yt.origW : 1, Tr = Math.max(8, Math.round(Yt.origFontSize * ro));
            ze.data = { ...Yt.textData, fontSize: Tr };
          }
          return { id: Yt.id, patch: ze };
        });
        t.updateMany(fe);
      }, It = (bt) => {
        Bt = bt.clientX, Tt = bt.clientY, Ft = bt.metaKey || bt.ctrlKey, ee = bt.shiftKey, zt === null && (zt = requestAnimationFrame(Ut));
      }, Dt = () => {
        zt !== null && (cancelAnimationFrame(zt), Ut()), a().removeEventListener("pointermove", It), a().removeEventListener("pointerup", Dt);
        for (const bt of A)
          t.isContainerType(bt.type) && t.syncFrameChildrenAfterResize(bt.id);
      };
      a().addEventListener("pointermove", It), a().addEventListener("pointerup", Dt);
    },
    [t, mt, I]
  );
  St(() => {
    d.current && (d.current.style.cursor = t.lassoSelect ? ir : fn(k)), k !== "select" && k !== "edge" && (Sr.current = null, Vn(null)), k !== "erase" && (ho.current !== null && (cancelAnimationFrame(ho.current), ho.current = null), co.current = /* @__PURE__ */ new Set(), jn(/* @__PURE__ */ new Set()), je.current = [], Cr([]), t.notifyEraserEnd());
  }, [k, t]);
  const qn = pt(null), zi = pt(null), zc = ct(
    (v) => {
      if (st.current && v.pointerType === "touch" && ht.current) {
        const D = v.clientX - ht.current.clientX, A = v.clientY - ht.current.clientY;
        Math.sqrt(D * D + A * A) > 8 && (clearTimeout(st.current), st.current = null, ht.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (zi.current = { clientX: v.clientX, clientY: v.clientY }, qn.current === null && (qn.current = requestAnimationFrame(() => {
        qn.current = null;
        const D = d.current, A = zi.current;
        if (!D || !A) return;
        const { x: O, y: P } = t.screenToCanvas(A.clientX, A.clientY);
        if (t.lassoSelect) {
          D.style.cursor = ir;
          return;
        }
        if (t.mode === "edge") {
          const V = 50 / t.viewport.zoom;
          let Y = null, Q = V;
          for (const Z of t.getAllNodes()) {
            if (Z.type === "edge") continue;
            const B = Fe(Z, O, P, mt), G = Math.hypot(B.x - O, B.y - P);
            G < Q && (Q = G, Y = Z.id);
          }
          Y !== Sr.current && (Sr.current = Y, Vn(Y)), hc({ x: O, y: P });
          return;
        }
        if (t.selection.size >= 2 && ue && O >= ue.x && O <= ue.x + ue.w && P >= ue.y && P <= ue.y + ue.h) {
          D.style.cursor = "move";
          return;
        }
        const N = t.hitTest(O, P, mt), z = N ? N.id : null;
        if (z !== Sr.current && (Sr.current = z, Vn(z)), N) {
          D.style.cursor = "move";
          return;
        }
        if (Wi(
          t.nodes,
          O,
          P,
          t.viewport.zoom,
          mt,
          Ne
        )) {
          D.style.cursor = "move";
          return;
        }
        D.style.cursor = "default";
      })));
    },
    [t, ue, mt, I, Ne]
  ), Ac = ct((v) => {
    (v.dataTransfer.types.includes("Files") || v.dataTransfer.types.includes(Bs) || v.dataTransfer.types.includes(Ns) || v.dataTransfer.types.includes(Os)) && (v.preventDefault(), v.dataTransfer.dropEffect = "copy");
  }, []), Ec = ct(
    (v) => {
      if (v.preventDefault(), t.presentationMode) return;
      const D = v.dataTransfer.getData(Os);
      if (D) {
        try {
          const G = JSON.parse(D);
          Vl(t, G, v.clientX, v.clientY);
        } catch (G) {
          console.error("Failed to place GIF:", G);
        }
        return;
      }
      const A = v.dataTransfer.getData(Ns);
      if (A) {
        try {
          const { itemId: G } = JSON.parse(A), nt = Wl().find((kt) => kt.id === G);
          nt && Bl(t, nt, v.clientX, v.clientY);
        } catch (G) {
          console.error("Failed to place personal library item:", G);
        }
        return;
      }
      const O = v.dataTransfer.getData(Bs);
      if (O) {
        try {
          const { libraryId: G, itemId: U } = JSON.parse(O), kt = ii(G).find((zt) => zt.id === U);
          kt && Fl(t, kt, v.clientX, v.clientY);
        } catch (G) {
          console.error("Failed to place library item:", G);
        }
        return;
      }
      const P = v.dataTransfer.files[0];
      if (!P) return;
      const N = `${P.name}|${P.size}|${P.lastModified}|${Math.round(v.clientX)}|${Math.round(v.clientY)}`, z = performance.now(), V = c.current;
      if (V && V.sig === N && z - V.at < 150)
        return;
      c.current = { sig: N, at: z }, v.stopPropagation();
      const Y = v.nativeEvent;
      if (typeof Y.stopImmediatePropagation == "function" && Y.stopImmediatePropagation(), P.name.endsWith(".excalidrawlib") || P.name.endsWith(".excalidrawlib.json")) {
        const G = new FileReader();
        G.onload = () => {
          try {
            const U = JSON.parse(G.result);
            if (U.type === "excalidrawlib") {
              const nt = P.name.replace(/\.excalidrawlib(\.json)?$/, "");
              ai(U, { name: nt });
            }
          } catch (U) {
            console.error("Failed to import library:", U);
          }
        }, G.readAsText(P);
        return;
      }
      if (P.type === "image/svg+xml" || P.name.endsWith(".svg")) {
        const G = new FileReader();
        G.onload = () => {
          const U = G.result, nt = Vs(U);
          nt && Af(t, nt, v.clientX, v.clientY);
        }, G.readAsText(P);
        return;
      }
      if (!P.type.startsWith("image/")) return;
      const { x: Q, y: Z } = t.screenToCanvas(v.clientX, v.clientY), B = new FileReader();
      B.onload = () => {
        const G = B.result, U = new Image();
        U.onload = () => {
          const nt = Math.min(U.naturalWidth, 400), kt = Math.min(U.naturalHeight, 300), zt = U.naturalWidth / U.naturalHeight, Bt = zt >= 1 ? nt : kt * zt, Tt = zt >= 1 ? nt / zt : kt;
          t.addNode({
            id: Ht(10),
            type: "image",
            x: Q,
            y: Z,
            w: Bt,
            h: Tt,
            z: t.nextZ(),
            data: { src: G }
          });
        }, U.src = G;
      }, B.readAsDataURL(P);
    },
    [t]
  ), Pc = `translate(${y.x}px, ${y.y}px) scale(${y.zoom})`, Un = L.activeIndex >= 0 ? ((Ei = L.matches[L.activeIndex]) == null ? void 0 : Ei.nodeId) ?? null : null, Ai = Kt(() => {
    if (!L.query || L.matches.length === 0) return /* @__PURE__ */ new Set();
    const v = /* @__PURE__ */ new Set();
    for (const D of L.matches)
      D.nodeType !== "edge" && v.add(D.nodeId);
    return v;
  }, [L]);
  return Eo(() => {
    const v = d.current;
    if (w || !v || !L.query || L.matches.length === 0) {
      tt((z) => z.length === 0 ? z : []);
      return;
    }
    const D = v.getBoundingClientRect(), A = L.query.toLocaleLowerCase(), O = Array.from(new Set(L.matches.map((z) => z.nodeId))), P = [], N = 900;
    for (const z of O) {
      if (P.length >= N) break;
      const V = z.replace(/\\/g, "\\\\").replace(/"/g, '\\"'), Y = v.querySelector(`[data-node-id="${V}"]`);
      if (!Y) continue;
      const Q = document.createTreeWalker(
        Y,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(B) {
            const G = B.parentElement;
            return !G || G.closest("script,style,textarea,input,[contenteditable='true'],[contenteditable=''],[data-sb-search-ignore='true']") || !B.nodeValue || !B.nodeValue.trim() ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
      let Z = Q.nextNode();
      for (; Z && P.length < N; ) {
        const B = Z, U = (B.nodeValue ?? "").toLocaleLowerCase();
        let nt = 0;
        for (; nt <= U.length - A.length && P.length < N; ) {
          const kt = U.indexOf(A, nt);
          if (kt < 0) break;
          const zt = document.createRange();
          zt.setStart(B, kt), zt.setEnd(B, kt + A.length);
          const Bt = zt.getClientRects();
          for (const Tt of Bt)
            Tt.width <= 0 || Tt.height <= 0 || P.push({
              x: Tt.left - D.left,
              y: Tt.top - D.top,
              w: Tt.width,
              h: Tt.height,
              active: z === Un
            });
          nt = kt + A.length;
        }
        Z = Q.nextNode();
      }
    }
    tt((z) => z.length === P.length && z.every((V, Y) => {
      const Q = P[Y];
      return V.x === Q.x && V.y === Q.y && V.w === Q.w && V.h === Q.h && V.active === Q.active;
    }) ? z : P);
  }, [L, m, y, Un, w]), /* @__PURE__ */ h(xr.Provider, { value: at, children: /* @__PURE__ */ S(
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
        background: Xr(ut).canvasBg
      },
      onPointerDown: gc,
      onPointerMove: zc,
      onDoubleClick: mc,
      onContextMenu: yc,
      onDragOver: Ac,
      onDrop: Ec,
      children: [
        /* @__PURE__ */ h(Qu, { viewport: y, gridSize: Ct, background: ut, gridVisible: et }),
        /* @__PURE__ */ S(
          Pp,
          {
            safariWebKitWorkaround: Ef(),
            viewport: y,
            viewportTransform: Pc,
            children: [
              pc.sort((v, D) => v.z - D.z).map((v) => {
                const D = Yn.has(v.id), A = uc.has(v.id), P = -(v.id.split("").reduce((z, V) => z + V.charCodeAt(0), 0) % 240 / 100);
                let N;
                if (o) {
                  const z = o.get(v.type);
                  if (z) {
                    const V = z.component, Y = x.has(v.id) && k !== "edge", Q = !t.readOnly && (k === "select" || k === "text" || k === "note" || k === "sticky"), Z = /* @__PURE__ */ h(
                      V,
                      {
                        node: v,
                        data: v.data,
                        isSelected: Y,
                        multiSelected: x.size > 1 && Y && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: Q,
                        zoom: y.zoom,
                        editing: vi === v.id,
                        cropping: oo === v.id,
                        editClickPos: vi === v.id ? Xn.current : null,
                        callbacks: {
                          onMeasuredHeight: he,
                          // drop resize-handle starts in readOnly. The
                          // canvas selection-frame is hidden in that mode but a
                          // node-internal resize handle (if any) shouldn't fire
                          // either.
                          onResizeHandleDown: t.readOnly ? void 0 : Kn,
                          onEditStart: (B) => {
                            if (t.readOnly) return;
                            const G = t.getNode(B);
                            G && (G.type === "text" ? Do(B) : G.type === "sticky" ? Ro(B) : G.type === "frame" ? tr(B) : G.type === "shape" ? er(B) : G.type === "image" ? or(B) : G.type === "youtube" && wi(B));
                          },
                          onEditEnd: () => {
                            v.type === "text" ? Do((B) => {
                              if (B !== v.id) return B;
                              const G = Ur.current;
                              return G && G.id === B && performance.now() < G.until ? B : null;
                            }) : v.type === "sticky" ? Ro((B) => B === v.id ? null : B) : v.type === "frame" ? tr((B) => B === v.id ? null : B) : v.type === "shape" ? er((B) => B === v.id ? null : B) : v.type === "image" ? or((B) => B === v.id ? null : B) : v.type === "youtube" && wi((B) => B === v.id ? null : B);
                          }
                        },
                        portValues: r && pr(z) && tn >= 0 ? r.getAllPortValues(v.id) : void 0,
                        updateData: (B) => {
                          const G = at();
                          t.updateNodeWithHistoryCoalesced(
                            v.id,
                            {
                              data: { ...v.data, ...B }
                            },
                            `${G}:registry:${v.id}`
                          );
                        }
                      },
                      z.handlesOwnLayout ? v.id : void 0
                    );
                    z.handlesOwnLayout ? N = Z : N = /* @__PURE__ */ h(
                      Ap,
                      {
                        node: v,
                        isInteractive: Q,
                        measuredH: mt[v.id],
                        onMeasuredHeight: he,
                        observeElement: to,
                        unobserveElement: Ue,
                        isContainer: z.isContainer,
                        children: Z
                      },
                      v.id
                    );
                  }
                } else if (v.type === "content") {
                  const z = v;
                  N = /* @__PURE__ */ h(
                    _a,
                    {
                      node: z,
                      isSelected: x.has(v.id) && k !== "edge",
                      multiSelected: x.size > 1 && x.has(v.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: k === "select" || k === "text" || k === "note",
                      zoom: y.zoom,
                      onMeasuredHeight: he,
                      autoEdit: ki.current === z.id
                    },
                    v.id
                  );
                } else if (v.type === "text")
                  N = /* @__PURE__ */ h(
                    ul,
                    {
                      node: v,
                      engine: t,
                      editing: _o === v.id,
                      editClickPos: _o === v.id ? Xn.current : null,
                      onStopEdit: () => {
                        if (Gn.current === v.id) {
                          Gn.current = null;
                          const z = t.getNode(v.id);
                          if (!z || !z.data.text.trim()) {
                            t.deleteNode(v.id), Do((V) => V === v.id ? null : V);
                            return;
                          }
                        }
                        Do((z) => z === v.id ? null : z);
                      },
                      onMeasuredHeight: he
                    },
                    v.id
                  );
                else if (v.type === "image")
                  N = /* @__PURE__ */ h(
                    hl,
                    {
                      node: v,
                      isSelected: x.has(v.id) && k !== "edge",
                      engine: t,
                      interactive: k === "select",
                      zoom: y.zoom,
                      onResizeHandleDown: Kn,
                      cropping: oo === v.id,
                      onCropStart: () => or(v.id),
                      onCropEnd: () => or(null)
                    },
                    v.id
                  );
                else if (v.type === "sticky")
                  N = /* @__PURE__ */ h(
                    fl,
                    {
                      node: v,
                      isSelected: x.has(v.id) && k !== "edge",
                      engine: t,
                      interactive: k === "select" || k === "sticky",
                      zoom: y.zoom,
                      editing: xi === v.id,
                      onEditStart: Ro,
                      onEditEnd: () => Ro(null)
                    },
                    v.id
                  );
                else if (v.type === "frame") {
                  const z = v, V = z.h === "auto" ? 100 : z.h;
                  N = /* @__PURE__ */ h(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: z.x,
                        top: z.y,
                        width: z.w,
                        height: V,
                        zIndex: z.z,
                        background: z.data.backgroundColor || "rgba(0,0,0,0.02)",
                        border: `${z.data.borderWidth || 1}px ${z.data.borderStyle || "dashed"} ${z.data.borderColor || "#ccc"}`,
                        boxSizing: "border-box",
                        borderRadius: 8,
                        opacity: z.data.opacity ?? 1,
                        pointerEvents: "none",
                        overflow: "visible",
                        transform: z.rotation ? `rotate(${z.rotation}deg)` : void 0,
                        transformOrigin: "center center"
                      },
                      children: bi === v.id ? /* @__PURE__ */ h(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: z.data.label ?? "",
                          placeholder: l.frameLabelPlaceholder,
                          onBlur: (Y) => {
                            const Q = Y.currentTarget.value.trim();
                            t.updateNodeWithHistory(v.id, {
                              data: { ...z.data, label: Q || void 0 }
                            }), tr(null);
                          },
                          onKeyDown: (Y) => {
                            (Y.key === "Enter" || Y.key === "Escape") && Y.currentTarget.blur(), Y.stopPropagation();
                          },
                          onPointerDown: (Y) => Y.stopPropagation(),
                          style: {
                            position: "absolute",
                            top: -24,
                            left: 0,
                            fontSize: 12,
                            color: z.data.borderColor || "#999",
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
                      ) : z.data.label ? /* @__PURE__ */ h(
                        "div",
                        {
                          onDoubleClick: (Y) => {
                            Y.stopPropagation(), t.select(v.id), tr(v.id);
                          },
                          style: {
                            position: "absolute",
                            top: -20,
                            left: 4,
                            fontSize: 12,
                            color: z.data.borderColor || "#999",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            pointerEvents: "auto",
                            cursor: "default"
                          },
                          children: z.data.label
                        }
                      ) : null
                    },
                    v.id
                  );
                } else {
                  const z = v;
                  z.type === "draw" ? N = /* @__PURE__ */ h(Mn, { node: z }, v.id) : N = /* @__PURE__ */ h(Mn, { node: z, editingLabel: Mr === v.id }, v.id);
                }
                return D || A ? /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      opacity: D ? 0.25 : void 0,
                      filter: D ? "saturate(0)" : void 0,
                      animation: A ? "sb-node-bop 3.4s ease-in-out infinite" : void 0,
                      animationDelay: A ? `${P}s` : void 0,
                      transformOrigin: "center center",
                      willChange: A ? "transform" : void 0
                    },
                    children: N
                  },
                  v.id
                ) : N;
              }),
              Ai.size > 0 && Array.from(Ai).map((v) => {
                const D = t.getNode(v);
                if (!D || D.type === "edge") return null;
                const A = D.h === "auto" ? mt[D.id] ?? 100 : D.h, O = Un === v;
                return /* @__PURE__ */ h(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: D.x - 5,
                      top: D.y - 5,
                      width: D.w + 10,
                      height: A + 10,
                      borderRadius: 10,
                      border: `2px solid ${O ? "#f59e0b" : "#60a5fa"}`,
                      boxShadow: O ? "0 0 0 3px rgba(245, 158, 11, 0.25)" : "0 0 0 2px rgba(96, 165, 250, 0.18)",
                      pointerEvents: "none",
                      transform: D.rotation ? `rotate(${D.rotation}deg)` : void 0,
                      transformOrigin: "center center"
                    }
                  },
                  `search-highlight-${v}`
                );
              }),
              Mr && (() => {
                const v = t.getNode(Mr);
                if (!v || v.type !== "shape") return null;
                const D = v.data;
                return D.shape === "line" || D.shape === "arrow" ? null : /* @__PURE__ */ h(
                  Ep,
                  {
                    node: v,
                    engine: t,
                    onDone: () => er(null)
                  },
                  Mr
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ h(
          Ff,
          {
            nodes: wr,
            viewport: y,
            selection: x,
            measuredHeights: mt,
            activeStroke: vt,
            shapePreview: Rt,
            shapePreviewStyle: Rt ? {
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
            onResizeHandleDown: Kn,
            onRotateStart: bc,
            onConnectionHandleDown: Ti,
            onEdgeEndpointDown: Cc,
            onKinkHandleDown: Mc,
            edgePreview: yt,
            edgeReconnect: se,
            eraserMarkedIds: Yn.size > 0 ? Yn : void 0,
            eraserTrail: Si.length > 1 ? Si : void 0,
            laserTrail: Ci.length > 1 ? Ci : void 0,
            mode: k,
            freeFormEdges: t.freeFormEdges,
            hoveredNodeId: cc,
            cursorCanvasPos: dc,
            registry: o,
            onPortHandleDown: wc,
            cycleNodeIds: r && tn >= 0 ? r.cycleNodeIds : void 0,
            dataFlowEdgeOverlay: r ? n : "off",
            getLastComputeMs: r ? kc : void 0,
            getDataFlowPortValue: r ? Sc : void 0,
            containerTypes: t.containerTypes,
            alignGuides: K,
            suppressNodeOverlayId: oo
          }
        ),
        ue && !oo && k !== "edge" && !yt && !se && !t.readOnly && (() => {
          const v = t.selectionGroupId(), D = v ? t.groupRotations.get(v) : void 0;
          let A, O, P, N;
          if (kr)
            A = kr.bounds, O = kr.angle, P = kr.cx, N = kr.cy;
          else if (D && D.angle !== 0) {
            const Z = -D.angle * Math.PI / 180, B = Math.cos(Z), G = Math.sin(Z);
            let U = 1 / 0, nt = 1 / 0, kt = -1 / 0, zt = -1 / 0;
            for (const Bt of t.selection) {
              const Tt = t.getNode(Bt);
              if (!Tt || Tt.type === "edge") continue;
              const Ft = Tt.h === "auto" ? mt[Tt.id] ?? 100 : Tt.h, ee = Tt.x + Tt.w / 2, Ut = Tt.y + Ft / 2, It = ee - D.cx, Dt = Ut - D.cy, bt = D.cx + It * B - Dt * G, Pt = D.cy + It * G + Dt * B;
              U = Math.min(U, bt - Tt.w / 2), nt = Math.min(nt, Pt - Ft / 2), kt = Math.max(kt, bt + Tt.w / 2), zt = Math.max(zt, Pt + Ft / 2);
            }
            A = {
              x: U - lt,
              y: nt - lt,
              w: kt - U + lt * 2,
              h: zt - nt + lt * 2
            }, O = D.angle, P = D.cx, N = D.cy;
          } else
            A = ue, O = 0, P = 0, N = 0;
          const z = 8 / y.zoom, V = z / 2, Y = [
            { pos: "nw", cx: A.x, cy: A.y },
            { pos: "n", cx: A.x + A.w / 2, cy: A.y },
            { pos: "ne", cx: A.x + A.w, cy: A.y },
            { pos: "e", cx: A.x + A.w, cy: A.y + A.h / 2 },
            { pos: "se", cx: A.x + A.w, cy: A.y + A.h },
            { pos: "s", cx: A.x + A.w / 2, cy: A.y + A.h },
            { pos: "sw", cx: A.x, cy: A.y + A.h },
            { pos: "w", cx: A.x, cy: A.y + A.h / 2 }
          ], Q = O !== 0 ? ` rotate(${O}, ${P}, ${N})` : "";
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${y.x}, ${y.y}) scale(${y.zoom})`, children: /* @__PURE__ */ S("g", { transform: Q, children: [
                /* @__PURE__ */ h(
                  "rect",
                  {
                    x: A.x,
                    y: A.y,
                    width: A.w,
                    height: A.h,
                    fill: "none",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / y.zoom
                  }
                ),
                O === 0 && Y.map(({ pos: Z, cx: B, cy: G }) => /* @__PURE__ */ h(
                  "rect",
                  {
                    x: B - V,
                    y: G - V,
                    width: z,
                    height: z,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / y.zoom,
                    style: { cursor: zn(Z, O), pointerEvents: "auto" },
                    onPointerDown: (U) => {
                      U.stopPropagation(), Tc(Z, U);
                    }
                  },
                  Z
                )),
                (() => {
                  const Z = 25 / y.zoom, B = A.x + A.w / 2, G = A.y;
                  return /* @__PURE__ */ S(Mt, { children: [
                    /* @__PURE__ */ h(
                      "line",
                      {
                        x1: B,
                        y1: G,
                        x2: B,
                        y2: G - Z,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / y.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const U = 8 / y.zoom, nt = U / 2;
                      return /* @__PURE__ */ h(
                        "rect",
                        {
                          x: B - nt,
                          y: G - Z - nt,
                          width: U,
                          height: U,
                          rx: 1.5 / y.zoom,
                          transform: `rotate(45, ${B}, ${G - Z})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / y.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (kt) => Ic(kt)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const Z = 26 / y.zoom, B = 42 / y.zoom, G = 4 / y.zoom;
                  return [
                    { side: "top", cx: A.x + A.w / 2, cy: A.y - B },
                    { side: "right", cx: A.x + A.w + Z, cy: A.y + A.h / 2 },
                    { side: "bottom", cx: A.x + A.w / 2, cy: A.y + A.h + Z },
                    { side: "left", cx: A.x - Z, cy: A.y + A.h / 2 }
                  ].map(({ side: nt, cx: kt, cy: zt }) => /* @__PURE__ */ h(
                    "circle",
                    {
                      cx: kt,
                      cy: zt,
                      r: G,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / y.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (Bt) => {
                        Bt.stopPropagation();
                        const Tt = xc(nt);
                        Tt && Ti(Tt, nt, Bt);
                      }
                    },
                    `conn-${nt}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Ge && /* @__PURE__ */ h(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ h("g", { transform: `translate(${y.x}, ${y.y}) scale(${y.zoom})`, children: /* @__PURE__ */ h(
              "rect",
              {
                x: Ge.x,
                y: Ge.y,
                width: Ge.w,
                height: Ge.h,
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
        vr && (() => {
          const v = t.canvasToScreen(vr.startX, vr.startY), D = t.canvasToScreen(vr.endX, vr.endY), A = Math.min(v.x, D.x), O = Math.min(v.y, D.y), P = Math.abs(D.x - v.x), N = Math.abs(D.y - v.y);
          return P < 2 && N < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "rect",
                {
                  x: A,
                  y: O,
                  width: P,
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
        Bn && Bn.length > 2 && (() => {
          const D = Bn.map(([A, O]) => t.canvasToScreen(A, O)).map((A) => `${A.x},${A.y}`).join(" ");
          return /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h(
                "polygon",
                {
                  points: D,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        ve && (() => {
          const v = Math.min(ve.startX, ve.endX), D = Math.min(ve.startY, ve.endY), A = Math.abs(ve.endX - ve.startX), O = Math.abs(ve.endY - ve.startY);
          return A < 2 && O < 2 ? null : /* @__PURE__ */ h(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ h("g", { transform: `translate(${y.x}, ${y.y}) scale(${y.zoom})`, children: /* @__PURE__ */ h(
                "rect",
                {
                  x: v,
                  y: D,
                  width: A,
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
        X.length > 0 && /* @__PURE__ */ h(
          "div",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: X.map((v, D) => /* @__PURE__ */ h(
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
              `search-text-rect-${D}`
            ))
          }
        ),
        s && /* @__PURE__ */ h(
          tf,
          {
            engine: t,
            nodes: m,
            viewport: y,
            containerSize: f,
            measuredHeights: mt
          }
        ),
        $o && /* @__PURE__ */ h(
          Bf,
          {
            x: $o.x,
            y: $o.y,
            sections: $o.sections,
            onClose: () => Zr(null)
          }
        ),
        Qr && /* @__PURE__ */ h(
          Tf,
          {
            nodes: Qr.nodes,
            onSave: (v) => {
              gf(v, Qr.nodes, Qr.groupParent), Zn(null);
            },
            onCancel: () => Zn(null)
          }
        )
      ]
    }
  ) });
}
const so = 52, Oo = 300, Xy = so + Oo, Lp = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], ui = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Dp = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], In = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], rc = [1, 2, 3, 5, 8, 12], fi = [1, 2, 3, 4, 6, 8], nc = [1, 2, 3, 4, 6], Rp = fi, sc = [14, 20, 28, 36], pi = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Wp = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Ve = [
  { name: "Standard", colors: Lp },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], yi = Ve, Fp = [
  { name: "Standard", colors: Wp },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Gt = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Xt = {
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
}, Bp = "https://libraries.excalidraw.com/libraries.json", Ys = "https://libraries.excalidraw.com/libraries";
function Np({
  onClose: t,
  onInstalled: e
}) {
  const o = te(), { labels: r } = Jt(), [n, s] = ot([]), [i, l] = ot(!0), [d, c] = ot(null), [a, f] = ot(""), [p, y] = ot(null), [u, m] = ot(/* @__PURE__ */ new Set()), g = ct(() => {
    const w = vl(), T = new Set(w.map((k) => k.source));
    m(T);
  }, []);
  St(() => {
    let w = !1;
    return (async () => {
      try {
        const T = await fetch(Bp);
        if (!T.ok) throw new Error(`HTTP ${T.status}`);
        const k = await T.json();
        w || (s(k), l(!1));
      } catch (T) {
        w || (c(String(T)), l(!1));
      }
    })(), g(), () => {
      w = !0;
    };
  }, [g]);
  const x = Kt(() => {
    if (!a.trim()) return n;
    const w = a.toLowerCase();
    return n.filter(
      (T) => {
        var k, M;
        return T.name.toLowerCase().includes(w) || ((k = T.description) == null ? void 0 : k.toLowerCase().includes(w)) || ((M = T.itemNames) == null ? void 0 : M.some((C) => C.toLowerCase().includes(w)));
      }
    );
  }, [n, a]), b = ct(
    async (w) => {
      y(w.id);
      try {
        const T = `${Ys}/${w.source}`;
        await nf(T, w.name), g(), e();
      } catch (T) {
        console.error("Failed to install library:", T);
      } finally {
        y(null);
      }
    },
    [e, g]
  );
  return Xe(
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
                    x.map((w, T) => {
                      const k = u.has(
                        `${Ys}/${w.source}`
                      ), M = p === w.id;
                      return /* @__PURE__ */ h(
                        Op,
                        {
                          entry: w,
                          isInstalled: k,
                          isInstalling: M,
                          onInstall: () => b(w),
                          theme: o
                        },
                        w.id || `dir-${T}`
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
function Op({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: r,
  theme: n
}) {
  var l;
  const { labels: s } = Jt(), i = t.preview ? `${Ys}/${t.preview}` : null;
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
const Vp = /^[A-Za-z][A-Za-z0-9_:-]*$/, va = /^[A-Za-z][A-Za-z0-9_]*$/;
function Xp(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function Ze(t) {
  return Xp(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function fs(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function Vo(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: Ze(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: Ze(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: Ze(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: Ze(o[2]), shape: "rect" } : Vp.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function Gp(t) {
  let e = t.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (e) {
    const o = Vo(e[1]), r = Vo(e[3]);
    return !o || !r ? null : { from: o, to: r, label: Ze(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/), e) {
    const o = Vo(e[1]), r = Vo(e[3]);
    return !o || !r ? null : { from: o, to: r, label: Ze(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/), e) {
    const o = Vo(e[1]), r = Vo(e[2]);
    return !o || !r ? null : { from: o, to: r };
  }
  return null;
}
function Yp(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function jp(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return r ? { label: Ze(r[1]) } : { label: Ze(o) };
}
function Zp(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, r = t.replace(/\r\n/g, `
`).split(`
`).map((d) => d.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (r.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const n = r[0];
  /^(flowchart|graph)\b/i.test(n) && (o.direction = Yp(n), r.shift());
  const i = [], l = (d) => {
    for (const c of i) c.nodeKeys.add(d);
  };
  for (const d of r) {
    const c = d.split(";").map((a) => a.trim()).filter(Boolean);
    for (const a of c) {
      const f = jp(a);
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
      const p = Gp(a);
      if (p) {
        const u = fs(o, p.from), m = fs(o, p.to);
        l(u.key), l(m.key), o.edges.push({ fromKey: u.key, toKey: m.key, label: p.label });
        continue;
      }
      const y = Vo(a);
      if (y) {
        const u = fs(o, y);
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
function Kp(t) {
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
    if (!(!va.test(l) || !va.test(d)))
      return {
        from: l,
        arrow: s,
        to: d,
        label: Ze(r)
      };
  }
  return null;
}
function qp(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: Ze(e[3])
  } : null;
}
function Up(t) {
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
function Qp(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const r = o.indexOf(" "), n = r >= 0 ? o.slice(0, r) : o, s = r >= 0 ? o.slice(r + 1).trim() : "";
  return Up(n) ? { color: n, label: s || void 0 } : { label: o };
}
function Jp(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`).map((p) => p.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (e.length === 0)
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  if (!/^sequenceDiagram\b/i.test(e[0]))
    throw new Error("Not a Mermaid sequence diagram.");
  const o = /* @__PURE__ */ new Set(), r = [], n = [], s = [], i = [], l = [], d = [];
  let c = 0;
  const a = (p) => {
    o.has(p) || (o.add(p), r.push(p));
    for (const y of d) y.participants.add(p);
  };
  for (let p = 1; p < e.length; p++) {
    const y = e[p];
    if (/^autonumber\b/i.test(y)) continue;
    const u = Qp(y);
    if (u) {
      d.push({ type: "box", label: u.label, color: u.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const m = y.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (m) {
      d.push({
        type: "loop",
        label: m[1] ? Ze(m[1]) : void 0,
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
    const g = y.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (g) {
      a(g[1]);
      continue;
    }
    const x = qp(y);
    if (x) {
      a(x.of), s.push({ step: c, note: x });
      continue;
    }
    const b = Kp(y);
    if (b) {
      a(b.from), a(b.to), n.push(b), c += 1;
      continue;
    }
  }
  for (; d.length > 0; ) {
    const p = d.pop();
    p.type === "box" ? l.push(p) : i.push({
      label: p.label,
      startStep: p.startStep,
      endStep: c,
      participants: p.participants
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
    loops: i.map((p) => ({
      label: p.label,
      startStep: p.startStep,
      endStep: p.endStep,
      participants: Array.from(p.participants)
    })).filter((p) => p.endStep >= p.startStep),
    groups: l.map((p) => ({
      label: p.label,
      color: p.color,
      participants: Array.from(p.participants)
    })).filter((p) => p.participants.length > 0)
  };
}
function pn(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function $p(t) {
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
      const p = Math.max(s.get(f) ?? 0, a + 1);
      s.set(f, p), o.set(f, (o.get(f) ?? 0) - 1), (o.get(f) ?? 0) <= 0 && i.push(f);
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
function _p(t, e, o, r) {
  const n = Jp(t), s = [], i = [], l = 6, d = "#94a3b8", c = 3, a = "#475569", f = 180, p = 64, y = 270, u = o - 140, m = u + p + 8, g = 88, x = Math.max(1, n.messages.length), b = m + x * g + 40, w = b + 12, T = w + p, k = /* @__PURE__ */ new Map();
  for (const M of n.groups) {
    const C = M.participants.map((et) => k.get(et)).filter((et) => typeof et == "number");
    if (C.length === 0)
      for (const et of M.participants) {
        const ft = n.participants.indexOf(et);
        ft >= 0 && C.push(e + (ft - (n.participants.length - 1) / 2) * y);
      }
    if (C.length === 0) continue;
    const E = Math.min(...C) - f / 2 - 24, L = Math.max(...C) + f / 2 + 24, F = u - 22, X = T - F + 18, tt = {
      id: Ht(10),
      type: "shape",
      x: E,
      y: F,
      w: L - E,
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
    if (s.push(tt), i.push(tt.id), M.label) {
      const et = {
        id: Ht(10),
        type: "text",
        x: E + 10,
        y: F + 8,
        w: Math.max(120, L - E - 20),
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
      s.push(et);
    }
  }
  for (let M = 0; M < n.participants.length; M++) {
    const C = n.participants[M], E = e + (M - (n.participants.length - 1) / 2) * y;
    k.set(C, E);
    const L = {
      id: Ht(10),
      type: "shape",
      x: E - f / 2,
      y: u,
      w: f,
      h: p,
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
    s.push(L), i.push(L.id);
    const F = {
      id: Ht(10),
      type: "shape",
      x: E - l / 2,
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
    s.push(F);
    const X = {
      id: Ht(10),
      type: "shape",
      x: E - f / 2,
      y: w,
      w: f,
      h: p,
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
    const C = M.participants.map((W) => k.get(W)).filter((W) => typeof W == "number");
    if (C.length === 0) continue;
    const E = Math.min(...C) - 130, L = Math.max(...C) + 130, F = M.startStep + 1, X = Math.max(F, M.endStep), tt = m + (F - 1) * g + 16, et = m + X * g + 34, ft = {
      id: Ht(10),
      type: "shape",
      x: E,
      y: tt,
      w: L - E,
      h: Math.max(90, et - tt),
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
    const Ct = `loop${M.label ? ` [${M.label}]` : ""}`, xt = {
      id: Ht(10),
      type: "text",
      x: E + 10,
      y: tt + 8,
      w: L - E - 20,
      h: "auto",
      z: r(),
      data: {
        text: Ct,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#1f2937",
        align: "left"
      }
    };
    s.push(xt);
  }
  for (let M = 0; M < n.messages.length; M++) {
    const C = n.messages[M], E = m + (M + 1) * g, L = k.get(C.from), F = k.get(C.to);
    if (L == null || F == null) continue;
    const X = L === F, tt = Math.min(L, F), et = Math.max(L, F), ft = Math.max(et - tt, 40), Ct = L <= F ? 0 : ft, xt = L <= F ? ft : 0, W = C.arrow.includes("--") || C.arrow === "-.->", R = C.arrow.toLowerCase().includes("x"), K = C.arrow.includes(">") || C.arrow.includes(")");
    if (X) {
      const $ = L + 6, at = E - 16, rt = 92, _ = 48, H = W ? "dashed" : "solid", it = {
        id: Ht(10),
        type: "shape",
        x: $,
        y: at,
        w: rt,
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
      }, dt = {
        id: Ht(10),
        type: "shape",
        x: $ + rt - c,
        y: at,
        w: c,
        h: _,
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
      }, st = {
        id: Ht(10),
        type: "shape",
        x: $,
        y: at + _ - c,
        w: rt,
        h: c,
        z: r(),
        data: {
          shape: K ? "arrow" : "line",
          stroke: a,
          strokeWidth: c,
          strokeStyle: H,
          roughness: 0,
          startPoint: [rt, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(it, dt, st);
    } else {
      const $ = {
        id: Ht(10),
        type: "shape",
        x: tt,
        y: E - 14,
        w: ft,
        h: 28,
        z: r(),
        data: {
          shape: K ? "arrow" : "line",
          stroke: a,
          strokeWidth: c,
          strokeStyle: W ? "dashed" : "solid",
          roughness: 0,
          startPoint: [Ct, 14],
          endPoint: [xt, 14]
        }
      };
      s.push($);
    }
    const q = X ? L + 18 : tt, ut = X ? 170 : ft, j = {
      id: Ht(10),
      type: "text",
      x: q,
      y: E - 46,
      w: ut,
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
    if (s.push(j), R) {
      const $ = L <= F ? tt + ft - 14 : tt + 8, at = {
        id: Ht(10),
        type: "text",
        x: $,
        y: E - 20,
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
      s.push(at);
    }
  }
  for (const M of n.notes) {
    const C = m + (M.step + 1) * g, E = k.get(M.note.of);
    if (E == null) continue;
    let L = E;
    M.note.side === "right" && (L += 130), M.note.side === "left" && (L -= 300), M.note.side === "over" && (L -= 110);
    const F = {
      id: Ht(10),
      type: "text",
      x: L,
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
    s.push(F);
  }
  return { nodes: s, shapeNodeIds: i };
}
function t0(t, e, o, r) {
  const n = t.trimStart();
  if (/^sequenceDiagram\b/i.test(n))
    return _p(t, e, o, r);
  const s = Zp(t), i = $p(s), l = Array.from(s.nodes.values()).map((g) => pn(g.shape)), d = l.length > 0 ? Math.max(...l.map((g) => g.h)) : 96, c = Math.max(d + 130, 260), a = /* @__PURE__ */ new Map(), f = i.length;
  for (let g = 0; g < i.length; g++) {
    const x = i[g], b = x.length, w = (g - (f - 1) / 2) * c, T = x.length > 0 ? Math.max(
      ...x.map((M) => {
        const C = s.nodes.get(M);
        return C ? pn(C.shape).w : 200;
      })
    ) : 200, k = Math.max(T + 90, 260);
    for (let M = 0; M < x.length; M++) {
      const C = x[M], E = (M - (b - 1) / 2) * k;
      if (s.direction === "LR" || s.direction === "RL") {
        const L = s.direction === "LR" ? e + w : e - w, F = o + E;
        a.set(C, { x: L, y: F });
      } else {
        const L = e + E, F = s.direction === "TB" ? o + w : o - w;
        a.set(C, { x: L, y: F });
      }
    }
  }
  const p = /* @__PURE__ */ new Map(), y = [], u = [], m = /* @__PURE__ */ new Map();
  for (const g of s.groups) {
    if (!g.nodeKeys.length) continue;
    const x = g.nodeKeys.map((C) => {
      const E = s.nodes.get(C), L = a.get(C);
      if (!E || !L) return null;
      const F = pn(E.shape);
      return { x: L.x - F.w / 2, y: L.y - F.h / 2, w: F.w, h: F.h };
    }).filter((C) => !!C);
    if (!x.length) continue;
    const b = Math.min(...x.map((C) => C.x)) - 30, w = Math.max(...x.map((C) => C.x + C.w)) + 30, T = Math.min(...x.map((C) => C.y)) - 34, k = Math.max(...x.map((C) => C.y + C.h)) + 24, M = {
      id: Ht(10),
      type: "shape",
      x: b,
      y: T,
      w: w - b,
      h: k - T,
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
    if (y.push(M), u.push(M.id), g.label) {
      const C = {
        id: Ht(10),
        type: "text",
        x: b + 10,
        y: T + 8,
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
      y.push(C);
    }
  }
  for (const [g, x] of s.nodes) {
    const b = a.get(g) ?? { x: e, y: o }, w = pn(x.shape), T = {
      id: Ht(10),
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
    y.push(T), u.push(T.id), p.set(g, T.id), m.set(g, { x: T.x, y: T.y, w: w.w, h: w.h });
  }
  for (const g of s.edges) {
    const x = p.get(g.fromKey), b = p.get(g.toKey);
    if (!x || !b || x === b) continue;
    const w = {
      id: Ht(10),
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
    y.push(w);
  }
  return { nodes: y, shapeNodeIds: u };
}
const ka = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function e0({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r
}) {
  const n = te(), { labels: s } = Jt(), i = pt(null), [l, d] = ot(ka), [c, a] = ot(null), [f, p] = ot(null);
  li(e && !!r, r, i, [
    l.length,
    c,
    f
  ]), St(() => {
    if (!e) return;
    const m = (g) => {
      i.current && !i.current.contains(g.target) && o();
    };
    return document.addEventListener("pointerdown", m), () => document.removeEventListener("pointerdown", m);
  }, [e, o]);
  const y = Kt(
    () => s.mermaidSupportedHint,
    [s.mermaidSupportedHint]
  ), u = ct(() => {
    try {
      const m = window.innerWidth / 2, g = window.innerHeight / 2, x = t.screenToCanvas(m, g), { nodes: b, shapeNodeIds: w } = t0(l, x.x, x.y, () => t.nextZ());
      if (b.length === 0)
        throw new Error(s.mermaidNoNodesParsed);
      t.addNodes(b), w.length > 0 && t.selectMultiple(w), a(null), p(
        s.mermaidInsertedSummary.replace("{nodes}", String(w.length)).replace("{edges}", String(b.length - w.length))
      );
    } catch (m) {
      p(null), a(m instanceof Error ? m.message : s.mermaidParseFailed);
    }
  }, [t, s.mermaidInsertedSummary, s.mermaidNoNodesParsed, s.mermaidParseFailed, l]);
  return !e || !r ? null : Xe(
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
            /* @__PURE__ */ h("div", { style: { marginTop: 4, fontSize: 10, color: n.textMuted, lineHeight: 1.45 }, children: y })
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
                  onClick: () => d(ka),
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
const o0 = [
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
], Zo = {
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
function Ko({ name: t, size: e = 18, textGlyph: o = "T" }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ...Qt })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...Qt }),
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
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...Qt }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...Qt, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...Qt, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...Qt, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...Qt })
    ] }),
    t === "edge" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("circle", { cx: "5", cy: "5", r: "2.5", ...Qt, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ h("circle", { cx: "19", cy: "19", r: "2.5", ...Qt, fill: "currentColor", opacity: 0.3 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "7", x2: "17", y2: "17", ...Qt }),
      /* @__PURE__ */ h("polyline", { points: "14,17 17,17 17,14", ...Qt, fill: "none" })
    ] }),
    t === "erase" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ...Qt })
    ] }),
    t === "laser" && /* @__PURE__ */ h("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ h("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...Qt, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...Qt, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...Qt, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...Qt, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...Qt, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...Qt }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...Qt })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...Qt })
    ] }),
    t === "paper" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...Qt }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...Qt, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...Qt, opacity: 0.4 }),
      /* @__PURE__ */ h("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...Qt, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...Qt }),
      /* @__PURE__ */ h("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...Qt }),
      /* @__PURE__ */ h("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...Qt }),
      /* @__PURE__ */ h("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...Qt })
    ] }),
    t === "library" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M8 7h6", ...Qt, opacity: 0.5 }),
      /* @__PURE__ */ h("path", { d: "M8 11h4", ...Qt, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...Qt }),
      /* @__PURE__ */ h("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ...Qt }),
      /* @__PURE__ */ h("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ...Qt }),
      /* @__PURE__ */ h("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ h("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
function r0({
  engine: t,
  background: e
}) {
  const o = te(), { labels: r } = Jt(), [n, s] = ot(!1), i = {
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
  }, d = pt(null), c = pt(null);
  Il(n, d, c, []), St(() => {
    if (!n) return;
    const p = (y) => {
      c.current && !c.current.contains(y.target) && d.current && !d.current.contains(y.target) && s(!1);
    };
    return document.addEventListener("pointerdown", p), () => document.removeEventListener("pointerdown", p);
  }, [n]);
  const a = yr.find((p) => p.key === e) ?? yr[1], f = n && d.current ? (() => {
    const p = d.current.getBoundingClientRect();
    return Xe(
      /* @__PURE__ */ h(
        "div",
        {
          ref: c,
          style: {
            position: "fixed",
            left: p.right + 8,
            top: p.top,
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
            const u = yr.filter((m) => m.group === y);
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
                  children: i[y]
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
        title: r.paperType,
        onClick: () => s((p) => !p),
        style: {
          ...Zo,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ h(Ko, { name: "paper" }),
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
function n0({ engine: t }) {
  const e = te(), { labels: o } = Jt(), [r, n] = ot(!1), s = pt(null), i = pt(null);
  Il(r, s, i, []), St(() => {
    if (!r) return;
    const d = (c) => {
      i.current && !i.current.contains(c.target) && s.current && !s.current.contains(c.target) && n(!1);
    };
    return document.addEventListener("pointerdown", d), () => document.removeEventListener("pointerdown", d);
  }, [r]);
  const l = r && s.current ? (() => {
    const d = s.current.getBoundingClientRect();
    return Xe(
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
                  const f = a.innerWidth / 2, p = a.innerHeight / 2, y = fr(t.viewport, f, p);
                  t.applyTemplate(c.id, y.x, y.y), n(!1);
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
        onClick: () => n((d) => !d),
        style: {
          ...Zo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Ko, { name: "template" })
      }
    ),
    l
  ] });
}
function s0({ engine: t }) {
  const e = te(), { labels: o } = Jt(), [r, n] = ot(!1), [s, i] = ot(!1), l = pt(null), [d, c] = ot(null), a = ct(() => {
    n((y) => (!y && l.current && c(l.current.getBoundingClientRect()), !y));
  }, []), f = ct(() => n(!1), []), p = ct(() => {
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
          ...Zo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Ko, { name: "library" })
      }
    ),
    /* @__PURE__ */ h(
      vf,
      {
        engine: t,
        open: r,
        onClose: f,
        triggerRect: d,
        onBrowseDirectory: p
      }
    ),
    s && /* @__PURE__ */ h(
      Np,
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
function i0({ engine: t, baseUrl: e }) {
  const o = te(), { labels: r } = Jt(), [n, s] = ot(!1), i = pt(null), [l, d] = ot(null), c = ct(() => {
    s((f) => (!f && i.current && d(i.current.getBoundingClientRect()), !f));
  }, []), a = ct(() => s(!1), []);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: i,
        title: r.gifSearchTitle,
        onClick: c,
        style: {
          ...Zo,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ h(Ko, { name: "gif" })
      }
    ),
    /* @__PURE__ */ h(
      Cf,
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
function a0({ engine: t }) {
  const e = te(), { labels: o } = Jt(), [r, n] = ot(!1), s = pt(null), [i, l] = ot(null), d = ct(() => {
    n((a) => (!a && s.current && l(s.current.getBoundingClientRect()), !a));
  }, []), c = ct(() => n(!1), []);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      "button",
      {
        ref: s,
        title: o.mermaidSketchTitle,
        onClick: d,
        style: {
          ...Zo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: r ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ h(Ko, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ h(
      e0,
      {
        engine: t,
        open: r,
        onClose: c,
        triggerRect: i
      }
    )
  ] });
}
function l0({ engine: t, gifApiBaseUrl: e }) {
  const o = te(), { labels: r } = Jt(), [n, s] = ot(t.mode), [i, l] = ot(t.boardBackground), [d, c] = ot(t.lassoSelect);
  St(() => {
    const f = () => s(t.mode), p = () => l(t.boardBackground), y = () => c(t.lassoSelect);
    return t.on("mode", f), t.on("background", p), t.on("lassoToggle", y), () => {
      t.off("mode", f), t.off("background", p), t.off("lassoToggle", y);
    };
  }, [t]);
  const a = o0.map((f) => ({
    ...f,
    label: f.key === "select" ? r.toolSelect : f.key === "hand" ? r.toolHand : f.key === "draw" ? r.toolDraw : f.key === "shape" ? r.toolShape : f.key === "text" ? r.toolText : f.key === "note" ? r.toolNote : f.key === "sticky" ? r.toolSticky : f.key === "frame" ? r.toolFrame : f.key === "erase" ? r.toolEraser : r.toolLaser
  }));
  return /* @__PURE__ */ S(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: so,
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
          const p = n === f.key && !(f.key === "select" && d);
          return /* @__PURE__ */ S(
            "button",
            {
              title: `${f.label} (${f.shortcut}${f.num ? ` / ${f.num}` : ""})`,
              onClick: () => {
                d && (t.toggleLassoSelect(), c(!1)), t.setMode(f.key);
              },
              style: {
                ...Zo,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: p ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ h(Ko, { name: f.key, textGlyph: r.toolTextGlyph }),
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
              ...Zo,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: d ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ h(Ko, { name: "lasso" }),
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
        /* @__PURE__ */ h(r0, { engine: t, background: i }),
        /* @__PURE__ */ h(n0, { engine: t }),
        /* @__PURE__ */ h(s0, { engine: t }),
        /* @__PURE__ */ h(a0, { engine: t }),
        e && /* @__PURE__ */ h(i0, { engine: t, baseUrl: e })
      ]
    }
  );
}
const c0 = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), d0 = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function Sa(t) {
  return t.data.opacity ?? 1;
}
function ar(t, e) {
  return t.data[e];
}
function h0(t) {
  const e = {}, o = t.filter((n) => c0.has(n.type));
  if (o.length > 0) {
    const n = Sa(o[0]), s = o.every((i) => Sa(i) === n);
    e.opacity = s ? n : "mixed";
  }
  const r = t.filter((n) => d0.has(n.type));
  if (r.length > 0) {
    const n = ar(r[0], "borderColor"), s = r.every(
      (a) => ar(a, "borderColor") === n
    );
    e.borderColor = s ? n ?? null : "mixed";
    const i = ar(r[0], "borderWidth") ?? 1, l = r.every(
      (a) => (ar(a, "borderWidth") ?? 1) === i
    );
    e.borderWidth = l ? i : "mixed";
    const d = ar(r[0], "borderStyle") ?? "solid", c = r.every(
      (a) => (ar(a, "borderStyle") ?? "solid") === d
    );
    e.borderStyle = c ? d : "mixed";
  }
  return e;
}
function u0(t) {
  const [e, o] = ot(t.mode), [r, n] = ot(new Set(t.selection)), [, s] = ot(0);
  if (St(() => {
    const a = () => o(t.mode), f = () => {
      n(new Set(t.selection)), s((y) => y + 1);
    }, p = () => s((y) => y + 1);
    return t.on("mode", a), t.on("selection", f), t.on("change", p), () => {
      t.off("mode", a), t.off("selection", f), t.off("change", p);
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
  const c = h0(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: d },
    commonProps: c
  };
}
const Yr = br(null);
function _e(t, e) {
  const o = Ke(Yr), r = Ke(xr);
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
function qe({
  value: t,
  onChange: e,
  mixed: o
}) {
  const r = te(), { labels: n } = Jt(), s = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ S("div", { style: Gt, children: [
    /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorOpacity }),
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
const f0 = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function He({
  label: t,
  palettes: e,
  value: o,
  onChange: r,
  allowNull: n,
  mixed: s
}) {
  const i = te(), { labels: l } = Jt(), [d, c] = ot(""), [a, f] = ot(0), [p, y] = ot(!1), u = pt(null), m = pt(null), [g, x] = ot(null), [b, w] = ot("bottom"), T = e[a] ?? e[0], k = T.name === "Standard" ? l.paletteStandard : T.name, M = typeof o == "string" ? o : void 0, C = M == null ? void 0 : M.toLowerCase();
  St(() => {
    if (!p) return;
    const F = (X) => {
      u.current && !u.current.contains(X.target) && y(!1);
    };
    return document.addEventListener("mousedown", F), () => document.removeEventListener("mousedown", F);
  }, [p]), St(() => {
    if (!p) return;
    const F = () => {
      const X = m.current;
      if (!X) return;
      const tt = X.getBoundingClientRect(), ft = e.length * 30 + 10, Ct = window.innerHeight - tt.bottom, xt = tt.top, W = Ct < ft && xt > Ct;
      w(W ? "top" : "bottom"), x({
        top: W ? tt.top - 4 : tt.bottom + 4,
        left: tt.right
      });
    };
    return F(), window.addEventListener("resize", F), window.addEventListener("scroll", F, !0), () => {
      window.removeEventListener("resize", F), window.removeEventListener("scroll", F, !0);
    };
  }, [p]);
  const E = () => {
    const F = d.trim();
    if (!F) return;
    const X = F.startsWith("#") ? F : `#${F}`;
    f0.test(X) && (r(X), c(""));
  }, L = e.some(
    (F) => F.colors.some((X) => X.toLowerCase() === C)
  );
  return /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "flex-start", gap: 6 }, children: [
    /* @__PURE__ */ h("span", { style: { ...Xt, color: i.textMuted, paddingTop: 2 }, children: t }),
    /* @__PURE__ */ S("div", { style: { display: "flex", flexDirection: "column", gap: 4, flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ S("div", { style: { display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }, children: [
        n && /* @__PURE__ */ h(
          "button",
          {
            onClick: () => r(null),
            title: l.inspectorNone,
            style: {
              ...re,
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
        T.colors.map((F) => {
          const X = !s && C === F.toLowerCase();
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => r(F),
              style: {
                ...re,
                width: 20,
                height: 20,
                background: F,
                border: X ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
                borderRadius: "50%"
              }
            },
            F
          );
        }),
        M && !L && !s && /* @__PURE__ */ h(
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
            onClick: () => y((F) => !F),
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
              k,
              /* @__PURE__ */ h("span", { style: { fontSize: 7 }, children: p ? "▲" : "▼" })
            ]
          }
        ),
        p && g && Xe(
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
              children: e.map((F, X) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    f(X), y(!1);
                  },
                  style: {
                    ...re,
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
                    /* @__PURE__ */ h("span", { style: { display: "flex", gap: 2 }, children: F.colors.slice(0, 6).map((tt) => /* @__PURE__ */ h(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: tt,
                          display: "inline-block"
                        }
                      },
                      tt
                    )) }),
                    /* @__PURE__ */ h("span", { children: F.name === "Standard" ? l.paletteStandard : F.name })
                  ]
                },
                F.name
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
          onChange: (F) => c(F.target.value),
          onKeyDown: (F) => {
            F.key === "Enter" && E();
          },
          onBlur: E,
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
function qo({
  label: t,
  value: e,
  onChange: o,
  mixed: r
}) {
  const n = te();
  return /* @__PURE__ */ S("div", { style: Gt, children: [
    /* @__PURE__ */ h("span", { style: { ...Xt, color: n.textMuted }, children: t }),
    Dp.map((s) => /* @__PURE__ */ h(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...re,
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
function Uo({
  label: t,
  widths: e = Rp,
  value: o,
  onChange: r,
  mixed: n
}) {
  const s = te();
  return /* @__PURE__ */ S("div", { style: Gt, children: [
    /* @__PURE__ */ h("span", { style: { ...Xt, color: s.textMuted }, children: t }),
    /* @__PURE__ */ h("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }, children: e.map((i) => /* @__PURE__ */ h(
      "button",
      {
        title: `${i}px`,
        onClick: () => r(i),
        style: {
          ...re,
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
function jr({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: r,
  onChange: n
}) {
  const { labels: s } = Jt();
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      He,
      {
        label: s.inspectorBorder,
        palettes: Ve,
        value: t,
        onChange: (i) => n("borderColor", i ?? void 0),
        allowNull: !0,
        mixed: r == null ? void 0 : r.color
      }
    ),
    (t || (r == null ? void 0 : r.color)) && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        qo,
        {
          label: s.inspectorStyle,
          value: e ?? "solid",
          onChange: (i) => n("borderStyle", i),
          mixed: r == null ? void 0 : r.style
        }
      ),
      /* @__PURE__ */ h(
        Uo,
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
const ps = /* @__PURE__ */ new Map();
function Le({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: r,
  onToggle: n,
  persistKey: s,
  children: i
}) {
  const l = te(), [d, c] = ot(() => s && ps.has(s) ? !!ps.get(s) : e), a = r ?? d, f = o === "group", p = pt(null), [y, u] = ot(0);
  return St(() => {
    !s || r !== void 0 || ps.set(s, a);
  }, [s, r, a]), Eo(() => {
    const m = p.current;
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
              maxHeight: a ? y : 0,
              opacity: a ? 1 : 0,
              transition: "max-height 200ms ease, opacity 140ms ease",
              overflow: "hidden",
              pointerEvents: a ? "auto" : "none"
            },
            children: /* @__PURE__ */ h(
              "div",
              {
                ref: p,
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
function mi({ style: t }) {
  const e = te();
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
const p0 = /* @__PURE__ */ S("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ h("path", { d: "m21 21-4.35-4.35" })
] });
function Wn({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: r
}) {
  var x, b;
  const n = te(), [s, i] = ot(!1), [l, d] = ot(""), c = pt(null), a = pt(null), f = pt(null), p = l.trim().toLowerCase(), y = Kt(
    () => o.filter((w) => w.toLowerCase().includes(p)),
    [o, p]
  ), u = Kt(
    () => yn.filter(
      (w) => !o.includes(w.key) && (w.key.toLowerCase().includes(p) || w.label.toLowerCase().includes(p))
    ),
    [o, p]
  );
  Eo(() => {
    if (!s || !f.current) return;
    const w = f.current, T = w.ownerDocument.defaultView ?? window, k = 260, M = 16, C = () => {
      var ft;
      const L = (ft = a.current) == null ? void 0 : ft.getBoundingClientRect();
      if (!L) return;
      let F = L.left;
      F + k > T.innerWidth - M && (F = T.innerWidth - k - M), F < M && (F = M);
      const X = L.bottom + 4, tt = w.getBoundingClientRect(), et = Ml(F, X, tt.width, tt.height, T, M);
      w.style.left = `${et.left}px`, w.style.top = `${et.top}px`;
    };
    C();
    const E = new ResizeObserver(C);
    return E.observe(w), () => E.disconnect();
  }, [s, l, y.length, u.length]), St(() => {
    var k;
    if (!s) return;
    const w = (M) => {
      var F, X;
      const C = M.target;
      if ((F = c.current) != null && F.contains(C)) return;
      const L = (((X = c.current) == null ? void 0 : X.ownerDocument) ?? document).getElementById("font-picker-popover");
      L != null && L.contains(C) || i(!1);
    }, T = ((k = c.current) == null ? void 0 : k.ownerDocument) ?? document;
    return T.addEventListener("mousedown", w), () => T.removeEventListener("mousedown", w);
  }, [s]);
  const m = (w) => {
    e(w), i(!1), d("");
  }, g = (w, T) => {
    const k = (T == null ? void 0 : T.label) ?? w, M = T == null ? void 0 : T.category, C = t === w;
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
          fontFamily: Co(w),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (E) => {
          C || (E.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (E) => {
          C || (E.currentTarget.style.background = "transparent");
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
              children: Md(M)
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
          fontFamily: Co(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...r
        },
        children: [
          /* @__PURE__ */ h("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((x = yn.find((w) => w.key === t)) == null ? void 0 : x.label) ?? t }),
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
    s && Xe(
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
                  /* @__PURE__ */ h("span", { style: { color: "#64748b", display: "flex" }, children: p0 }),
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
                y.map((w) => g(w, yn.find((T) => T.key === w)))
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
function gi({ name: t, size: e = 16 }) {
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
const y0 = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], m0 = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function g0({ name: t, size: e = 16 }) {
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
function Fo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function b0({ engine: t, node: e, fontsInScene: o }) {
  const r = te(), { labels: n } = Jt(), s = _e(t, e), i = Ke(Yr) ?? [e], { data: l } = e, d = l.fill ?? null, c = l.fillStyle ?? "hachure", a = l.strokeStyle ?? "solid", f = Fo(i, (b) => b.data.stroke), p = Fo(i, (b) => b.data.fill ?? null), y = Fo(i, (b) => b.data.fillStyle ?? "hachure"), u = Fo(i, (b) => b.data.strokeStyle ?? "solid"), m = Fo(i, (b) => b.data.strokeWidth), g = Fo(i, (b) => b.data.roughness), x = Fo(i, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S(Le, { title: n.inspectorStructure, persistKey: "shape.structure", children: [
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorShape }),
        m0.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ shape: b.key }),
            style: {
              ...re,
              width: 28,
              height: 28,
              background: l.shape === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(g0, { name: b.key })
          },
          b.key
        ))
      ] }),
      (l.shape === "rect" || l.shape === "diamond") && /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorEdges }),
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
              background: (l.edgeStyle ?? "sharp") === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(gi, { name: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorLabel }),
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
    l.label && /* @__PURE__ */ S(Le, { title: n.inspectorTypography, defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          Wn,
          {
            value: l.labelFontFamily ?? "Excalifont",
            onChange: (b) => s({ labelFontFamily: b === "Excalifont" ? void 0 : b }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorSize }),
        y0.map((b) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ labelFontSize: b.size === 14 ? void 0 : b.size }),
            style: {
              ...re,
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
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorAlign }),
        pi.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.key,
            onClick: () => s({ labelAlign: b.key === "center" ? void 0 : b.key }),
            style: {
              ...re,
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
    /* @__PURE__ */ S(Le, { title: n.inspectorAppearance, persistKey: "shape.appearance", children: [
      /* @__PURE__ */ h(
        He,
        {
          label: n.inspectorStroke,
          palettes: Ve,
          value: f ? void 0 : l.stroke,
          mixed: f,
          onChange: (b) => s({ stroke: b })
        }
      ),
      /* @__PURE__ */ h(
        He,
        {
          label: n.inspectorFill,
          palettes: yi,
          value: p ? void 0 : d,
          mixed: p,
          onChange: (b) => s({ fill: b ?? void 0 }),
          allowNull: !0
        }
      ),
      d && !p && /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorFillPattern }),
        ui.map((b) => /* @__PURE__ */ h(
          "button",
          {
            title: b.label,
            onClick: () => s({ fillStyle: b.key }),
            style: {
              ...re,
              width: 36,
              height: 28,
              background: !y && c === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 9,
              borderRadius: r.controlBorderRadius
            },
            children: /* @__PURE__ */ h(mi, { style: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ h(
        qo,
        {
          label: n.inspectorStrokeStyle,
          value: a,
          mixed: u,
          onChange: (b) => s({ strokeStyle: b })
        }
      ),
      /* @__PURE__ */ h(
        Uo,
        {
          label: n.inspectorStrokeWidth,
          widths: fi,
          value: l.strokeWidth,
          mixed: m,
          onChange: (b) => s({ strokeWidth: b })
        }
      ),
      /* @__PURE__ */ h(
        qe,
        {
          value: l.opacity ?? 1,
          mixed: x,
          onChange: (b) => s({ opacity: b })
        }
      )
    ] }),
    /* @__PURE__ */ h(Le, { title: n.inspectorSketch, defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorRoughness }),
      In.map((b) => {
        const w = b.value === 0 ? n.roughnessArchitect : b.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: w,
            onClick: () => s({ roughness: b.value }),
            style: {
              ...re,
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
function lr(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function x0({ engine: t, node: e }) {
  const o = te(), { labels: r } = Jt(), n = _e(t, e), s = Ke(Yr) ?? [e], { data: i } = e, l = i.fill ?? null, d = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", a = lr(s, (g) => g.data.color), f = lr(s, (g) => g.data.fill ?? null), p = lr(s, (g) => g.data.fillStyle ?? "hachure"), y = lr(s, (g) => g.data.strokeStyle ?? "solid"), u = lr(s, (g) => g.data.strokeWidth), m = lr(s, (g) => g.data.opacity ?? 1);
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      He,
      {
        label: r.inspectorStroke,
        palettes: Ve,
        value: a ? void 0 : i.color,
        mixed: a,
        onChange: (g) => n({ color: g })
      }
    ),
    /* @__PURE__ */ h(
      He,
      {
        label: r.inspectorFill,
        palettes: yi,
        value: f ? void 0 : l,
        mixed: f,
        onChange: (g) => n({ fill: g ?? void 0 }),
        allowNull: !0
      }
    ),
    l && !f && /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.inspectorFillPattern }),
      ui.map((g) => /* @__PURE__ */ h(
        "button",
        {
          title: g.label,
          onClick: () => n({ fillStyle: g.key }),
          style: {
            ...re,
            width: 36,
            height: 28,
            background: !p && d === g.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(mi, { style: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ h(
      qo,
      {
        label: r.inspectorStrokeStyle,
        value: c,
        mixed: y,
        onChange: (g) => n({ strokeStyle: g })
      }
    ),
    /* @__PURE__ */ h(
      Uo,
      {
        label: r.inspectorStrokeWidth,
        widths: rc,
        value: i.strokeWidth,
        mixed: u,
        onChange: (g) => n({ strokeWidth: g })
      }
    ),
    /* @__PURE__ */ h(
      qe,
      {
        value: i.opacity ?? 1,
        mixed: m,
        onChange: (g) => n({ opacity: g })
      }
    )
  ] });
}
function w0({ engine: t, node: e, fontsInScene: o }) {
  const r = te(), { labels: n } = Jt(), s = _e(t, e), { data: i } = e;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S(Le, { title: n.inspectorTypography, persistKey: "text.typography", children: [
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          Wn,
          {
            value: i.fontFamily,
            onChange: (l) => s({ fontFamily: l }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorSize }),
        sc.map((l) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => s({ fontSize: l }),
            style: {
              ...re,
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
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorAlign }),
        pi.map((l) => /* @__PURE__ */ h(
          "button",
          {
            title: l.key,
            onClick: () => s({ align: l.key }),
            style: {
              ...re,
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
    /* @__PURE__ */ S(Le, { title: n.inspectorAppearance, persistKey: "text.appearance", children: [
      /* @__PURE__ */ h(
        He,
        {
          label: n.inspectorStroke,
          palettes: Ve,
          value: i.color,
          onChange: (l) => s({ color: l })
        }
      ),
      /* @__PURE__ */ h(
        jr,
        {
          borderColor: i.borderColor ?? null,
          borderStyle: i.borderStyle,
          borderWidth: i.borderWidth,
          onChange: (l, d) => s({ [l]: d })
        }
      ),
      /* @__PURE__ */ h(
        qe,
        {
          value: i.opacity ?? 1,
          onChange: (l) => s({ opacity: l })
        }
      )
    ] })
  ] });
}
const Ma = { top: 0, right: 0.25, bottom: 0.5, left: 0.75 }, v0 = [[0, "top"], [0.25, "right"], [0.5, "bottom"], [0.75, "left"]];
function Ca(t) {
  let e = "top", o = 1 / 0;
  for (const [r, n] of v0) {
    const s = Math.min(Math.abs(t - r), Math.abs(t - r - 1), Math.abs(t - r + 1));
    s < o && (o = s, e = n);
  }
  return e;
}
const k0 = ["forward"], S0 = ["forward", "reverse", "both", "bop"];
function M0({ engine: t, node: e }) {
  const o = te(), { labels: r } = Jt(), n = _e(t, e), s = Ke(Yr), { data: i } = e, l = !!(i.sourcePort && i.targetPort), d = l ? k0 : S0, c = Kt(() => !(s != null && s.length) || !s.every((a) => a.type === "edge") ? null : [...s].map((a) => a.id).sort().join("|"), [s]);
  return St(() => {
    const a = c !== null ? c.split("|") : [e.id];
    for (const f of a) {
      const p = t.getNode(f);
      if (!p || p.type !== "edge") continue;
      const y = p.data;
      !y.sourcePort || !y.targetPort || !y.animated || (y.animatedDirection ?? "forward") !== "forward" && t.updateNode(f, { data: { ...y, animatedDirection: "forward" } });
    }
  }, [t, c, e.id]), /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S(Le, { title: r.edgeLineSection, persistKey: "edge.line", children: [
      /* @__PURE__ */ h(
        He,
        {
          label: r.edgeColor,
          palettes: Ve,
          value: i.color,
          onChange: (a) => n({ color: a })
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: r.inspectorStyle,
          value: i.style,
          onChange: (a) => n({ style: a })
        }
      ),
      /* @__PURE__ */ h(
        Uo,
        {
          label: r.inspectorWidth,
          widths: nc,
          value: i.strokeWidth,
          onChange: (a) => n({ strokeWidth: a })
        }
      ),
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: "Connect" }),
        ["fixed", "free"].map((a) => {
          const f = i.sourceT !== void 0 || i.targetT !== void 0;
          return /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                a === "free" && !f ? n({
                  sourceT: i.sourceHandle ? Ma[i.sourceHandle] : 0,
                  targetT: i.targetHandle ? Ma[i.targetHandle] : 0.5,
                  sourceHandle: void 0,
                  targetHandle: void 0
                }) : a === "fixed" && f && n({
                  sourceHandle: i.sourceT !== void 0 ? Ca(i.sourceT) : "right",
                  targetHandle: i.targetT !== void 0 ? Ca(i.targetT) : "left",
                  sourceT: void 0,
                  targetT: void 0
                });
              },
              style: {
                ...re,
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
    /* @__PURE__ */ S(Le, { title: r.edgeArrowsSection, persistKey: "edge.arrows", children: [
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((a) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ arrowHead: a }),
            style: {
              ...re,
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
      (i.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.edgeHeadSize }),
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
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((a) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ arrowTail: a }),
            style: {
              ...re,
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
      (i.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.edgeTailSize }),
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
    /* @__PURE__ */ S(Le, { title: r.edgePathMotionSection, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.edgePath }),
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
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.edgeAnimate }),
        /* @__PURE__ */ h(
          "button",
          {
            onClick: () => n({ animated: !i.animated }),
            style: {
              ...re,
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
        /* @__PURE__ */ S("div", { style: Gt, children: [
          /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.edgeDirection }),
          d.map((a) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              onClick: () => n({ animatedDirection: a }),
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
            children: r.edgeAnimationPortHint
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.inspectorRoughness }),
        In.map((a) => {
          const f = a.value === 0 ? r.roughnessArchitect : a.value === 1 ? r.roughnessArtist : r.roughnessCartoonist;
          return /* @__PURE__ */ h(
            "button",
            {
              title: f,
              onClick: () => n({ roughness: a.value }),
              style: {
                ...re,
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
    /* @__PURE__ */ h(Le, { title: r.inspectorLabel, defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.edgeText }),
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
function C0({ engine: t, node: e }) {
  const o = te(), { labels: r } = Jt(), n = _e(t, e), { data: s } = e, i = !!s.crop;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      jr,
      {
        borderColor: s.borderColor ?? null,
        borderStyle: s.borderStyle,
        borderWidth: s.borderWidth,
        onChange: (l, d) => n({ [l]: d })
      }
    ),
    /* @__PURE__ */ S("div", { style: { ...Gt, marginTop: 4 }, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.inspectorCrop }),
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
          children: r.inspectorCrop
        }
      ),
      i && /* @__PURE__ */ h(
        "button",
        {
          onClick: () => n({ crop: void 0 }),
          style: {
            ...re,
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
      qe,
      {
        value: s.opacity ?? 1,
        onChange: (l) => n({ opacity: l })
      }
    )
  ] });
}
function I0({ engine: t, node: e }) {
  const o = te(), r = _e(t, e), { data: n } = e;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      jr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ h(
        "button",
        {
          title: s.label,
          onClick: () => r({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...re,
            width: 28,
            height: 28,
            background: (n.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(gi, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ h(
      qe,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
const Dr = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, T0 = Ip();
function z0({
  value: t,
  onChange: e,
  theme: o,
  durationLabel: r,
  msLabel: n
}) {
  const [s, i] = ot(String(t));
  St(() => i(String(t)), [t]);
  const l = () => {
    const d = parseInt(s, 10);
    !isNaN(d) && d >= 100 && d <= 5e3 ? e(d) : i(String(t));
  };
  return /* @__PURE__ */ S("div", { style: Gt, children: [
    /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r }),
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
function A0({ engine: t, node: e }) {
  const o = te(), { labels: r } = Jt(), n = _e(t, e), s = Ke(xr), { data: i } = e, l = ct(
    (f) => {
      var b;
      if (!f) {
        n({ devicePreset: void 0 });
        return;
      }
      const p = Gs(f);
      if (!p) return;
      const y = oc(p), u = Math.round(e.w / y), m = { devicePreset: f };
      (!i.label || ((b = Gs(i.devicePreset ?? "")) == null ? void 0 : b.label) === i.label) && (m.label = p.label);
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
    const f = t.getAllNodes().filter((g) => g.type === "frame"), p = f.length, y = /* @__PURE__ */ new Set();
    for (const g of f)
      g.id !== e.id && g.data.slideOrder != null && y.add(g.data.slideOrder);
    const u = [];
    for (let g = 1; g <= p; g++)
      y.has(g) || u.push(g);
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
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.inspectorLabel }),
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
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.frameDevice }),
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
            T0.map((f) => /* @__PURE__ */ h("optgroup", { label: a[f.label] ?? f.label, children: f.presets.map((p) => /* @__PURE__ */ S("option", { value: p.key, children: [
              p.label,
              " (",
              p.w,
              "×",
              p.h,
              ")"
            ] }, p.key)) }, f.label))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ h(
      He,
      {
        label: r.inspectorBackground,
        palettes: Ve,
        value: (() => {
          const f = i.backgroundColor;
          if (!f) return null;
          for (const p of Ve) {
            const y = p.colors.find((u) => f === `${u}15`);
            if (y) return y;
          }
          return f.length === 9 && f.endsWith("15") ? f.slice(0, 7) : null;
        })(),
        onChange: (f) => n({ backgroundColor: f ? `${f}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ h(
      He,
      {
        label: r.inspectorBorder,
        palettes: Ve,
        value: i.borderColor,
        onChange: (f) => n({ borderColor: f })
      }
    ),
    /* @__PURE__ */ h(
      qo,
      {
        label: r.inspectorStyle,
        value: i.borderStyle ?? "dashed",
        onChange: (f) => n({ borderStyle: f })
      }
    ),
    /* @__PURE__ */ h(
      Uo,
      {
        label: r.inspectorWidth,
        value: i.borderWidth ?? 1,
        onChange: (f) => n({ borderWidth: f })
      }
    ),
    /* @__PURE__ */ h(
      qe,
      {
        value: i.opacity ?? 1,
        onChange: (f) => n({ opacity: f })
      }
    ),
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.frameSlideNumber }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.slideOrder ?? "",
          onChange: (f) => {
            const p = f.target.value;
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
            d.map((f) => /* @__PURE__ */ h("option", { value: f, children: f }, f))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.frameTransition }),
      /* @__PURE__ */ S(
        "select",
        {
          value: i.transition ?? "pan",
          onChange: (f) => {
            const p = f.target.value;
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
      z0,
      {
        value: i.transitionDuration ?? Dr[i.transition ?? "pan"],
        onChange: (f) => n({ transitionDuration: f === Dr[i.transition ?? "pan"] ? void 0 : f }),
        theme: o,
        durationLabel: r.frameDuration,
        msLabel: r.frameMilliseconds
      }
    )
  ] });
}
function E0({ engine: t, node: e }) {
  const o = te(), { labels: r } = Jt(), n = _e(t, e), { data: s } = e;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ h(
      He,
      {
        label: r.inspectorStroke,
        palettes: Fp,
        value: s.color,
        onChange: (i) => {
          i && n({ color: i });
        }
      }
    ),
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.inspectorSize }),
      [12, 14, 16, 20, 24].map((i) => /* @__PURE__ */ h(
        "button",
        {
          onClick: () => n({ fontSize: i }),
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
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.inspectorEdges }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((i) => /* @__PURE__ */ h(
        "button",
        {
          title: i.label,
          onClick: () => n({ edgeStyle: i.key === "sharp" ? void 0 : i.key }),
          style: {
            ...re,
            width: 28,
            height: 28,
            background: (s.edgeStyle ?? "sharp") === i.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ h(gi, { name: i.key })
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ h(
      qe,
      {
        value: s.opacity ?? 1,
        onChange: (i) => n({ opacity: i })
      }
    )
  ] });
}
function P0({ engine: t, node: e }) {
  const o = te(), r = _e(t, e), { data: n } = e;
  return /* @__PURE__ */ S(Mt, { children: [
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: "URL" }),
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
      jr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ h(
      qe,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function H0({ name: t, size: e = 16 }) {
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
const L0 = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function D0({ engine: t, mode: e, fontsInScene: o }) {
  const r = te(), { labels: n } = Jt(), [, s] = ot(0), i = ct(() => s((m) => m + 1), []), l = t.activeTool;
  if (e === "text") {
    const m = l.fontFamily ?? Mo, g = l.fontSize ?? 20, x = l.textAlign ?? "left", b = l.color;
    return /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorFont }),
        /* @__PURE__ */ h(
          Wn,
          {
            value: m,
            onChange: (w) => {
              l.fontFamily = w, i();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorSize }),
        sc.map((w) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.fontSize = w, i();
            },
            style: {
              ...re,
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
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorAlign }),
        pi.map((w) => /* @__PURE__ */ h(
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
        He,
        {
          label: n.inspectorStroke,
          palettes: Ve,
          value: b,
          onChange: (w) => {
            l.color = w, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        qe,
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
    return /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        He,
        {
          label: n.inspectorStroke,
          palettes: Ve,
          value: l.color,
          onChange: (g) => {
            l.color = g, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        qo,
        {
          label: n.inspectorStrokeStyle,
          value: l.strokeStyle ?? "solid",
          onChange: (g) => {
            l.strokeStyle = g, i();
          }
        }
      ),
      /* @__PURE__ */ h(
        Uo,
        {
          label: n.inspectorStrokeWidth,
          widths: nc,
          value: l.width,
          onChange: (g) => {
            l.width = g, i();
          }
        }
      ),
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.edgeHead }),
        ["none", "arrow", "filled", "dot"].map((g) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.arrowHead = g, i();
            },
            style: {
              ...re,
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
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.edgeTail }),
        ["none", "arrow", "filled", "dot"].map((g) => /* @__PURE__ */ h(
          "button",
          {
            onClick: () => {
              l.arrowTail = g, i();
            },
            style: {
              ...re,
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
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.edgePath }),
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
              ...re,
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
      /* @__PURE__ */ S("div", { style: Gt, children: [
        /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorRoughness }),
        In.map((g) => {
          const x = g.value === 0 ? n.roughnessArchitect : g.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
          return /* @__PURE__ */ h(
            "button",
            {
              title: x,
              onClick: () => {
                l.roughness = g.value, i();
              },
              style: {
                ...re,
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
  const d = e === "shape", c = l.color, a = l.fillColor ?? null, f = l.fillStyle ?? "hachure", p = l.strokeStyle ?? "solid", y = l.width, u = l.roughness ?? 1;
  return /* @__PURE__ */ S(Mt, { children: [
    d && /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorShape }),
      L0.map((m) => /* @__PURE__ */ h(
        "button",
        {
          title: m.label,
          onClick: () => {
            l.shapeType = m.key, i();
          },
          style: {
            ...re,
            width: 28,
            height: 28,
            background: (l.shapeType ?? "rect") === m.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ h(H0, { name: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ h(
      He,
      {
        label: n.inspectorStroke,
        palettes: Ve,
        value: c,
        onChange: (m) => {
          l.color = m, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      He,
      {
        label: n.inspectorFill,
        palettes: yi,
        value: a,
        onChange: (m) => {
          l.fillColor = m ?? void 0, i();
        },
        allowNull: !0
      }
    ),
    a && /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorFillPattern }),
      ui.map((m) => /* @__PURE__ */ h(
        "button",
        {
          title: m.label,
          onClick: () => {
            l.fillStyle = m.key, i();
          },
          style: {
            ...re,
            width: 36,
            height: 28,
            background: f === m.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ h(mi, { style: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ h(
      qo,
      {
        label: n.inspectorStrokeStyle,
        value: p,
        onChange: (m) => {
          l.strokeStyle = m, i();
        }
      }
    ),
    /* @__PURE__ */ h(
      Uo,
      {
        label: n.inspectorStrokeWidth,
        widths: d ? fi : rc,
        value: y,
        onChange: (m) => {
          l.width = m, i();
        }
      }
    ),
    d && /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorRoughness }),
      In.map((m) => {
        const g = m.value === 0 ? n.roughnessArchitect : m.value === 1 ? n.roughnessArtist : n.roughnessCartoonist;
        return /* @__PURE__ */ h(
          "button",
          {
            title: g,
            onClick: () => {
              l.roughness = m.value, i();
            },
            style: {
              ...re,
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
      qe,
      {
        value: l.opacity ?? 1,
        onChange: (m) => {
          l.opacity = m, i();
        }
      }
    )
  ] });
}
function R0(t) {
  return t.split(/[-_]/).filter(Boolean).map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" ");
}
function Ia({
  engine: t,
  node: e,
  PanelComponent: o,
  docs: r
}) {
  const n = _e(t, e), s = te(), { labels: i } = Jt(), [l, d] = ot(!1), c = r ? r.id ?? e.type : null, a = c ? i.customNodeDocs[c] : void 0, f = !!(a != null && a.body), p = Kt(
    () => (a == null ? void 0 : a.title) ?? R0(e.type),
    [a == null ? void 0 : a.title, e.type]
  ), y = r != null && f ? /* @__PURE__ */ S("div", { style: { marginBottom: o ? 10 : 0 }, children: [
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
              children: p
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
  return o ? /* @__PURE__ */ S(Mt, { children: [
    y,
    /* @__PURE__ */ h(o, { node: e, data: e.data, engine: t, updateData: n })
  ] }) : y;
}
const W0 = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), F0 = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function ic(t) {
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
function B0(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t.getAllNodes()) {
    let n;
    r.type === "text" ? n = r.data.fontFamily : r.type === "shape" && (n = r.data.labelFontFamily), n && !e.has(n) && (e.add(n), o.push(n));
  }
  return o;
}
function N0({ label: t }) {
  const e = te();
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
function O0({
  engine: t,
  open: e,
  onToggle: o
}) {
  const r = te(), { labels: n } = Jt(), [s, i] = ot(t.snapToGrid), [l, d] = ot(t.gridSize), [c, a] = ot(t.smartGuides), [f, p] = ot(t.freeFormEdges), [y, u] = ot(t.boardBackground), m = {
    "plain-white": n.paperWhite,
    "dot-grid": n.paperCream,
    engineering: n.paperWarm,
    blueprint: n.paperBlueprint,
    "dark-grid": n.paperNight,
    "japanese-stationery": n.paperJapaneseStationery,
    kraft: n.paperKraftPaper
  };
  St(() => {
    const x = () => {
      i(t.snapToGrid), d(t.gridSize), a(t.smartGuides), p(t.freeFormEdges);
    }, b = () => p(t.freeFormEdges);
    t.on("change", b);
    const w = () => u(t.boardBackground);
    return t.on("guides", x), t.on("background", w), () => {
      t.off("guides", x), t.off("background", w), t.off("change", b);
    };
  }, [t]);
  const g = [10, 20, 40, 80];
  return /* @__PURE__ */ S(Le, { title: n.inspectorCanvas, defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorGrid }),
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
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorGridSize }),
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
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorGuides }),
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
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: "Free edges" }),
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
    /* @__PURE__ */ S("div", { style: Gt, children: [
      /* @__PURE__ */ h("span", { style: { ...Xt, color: r.textMuted }, children: n.inspectorPaper }),
      /* @__PURE__ */ h(
        "select",
        {
          value: y,
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
          children: yr.map((x) => /* @__PURE__ */ h("option", { value: x.key, children: m[x.key] ?? x.label }, x.key))
        }
      )
    ] })
  ] });
}
function ac({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: r
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ h(b0, { engine: t, node: e, fontsInScene: r });
    case "draw":
      return /* @__PURE__ */ h(x0, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ h(w0, { engine: t, node: e, fontsInScene: r });
    case "edge":
      return /* @__PURE__ */ h(M0, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ h(C0, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ h(I0, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ h(A0, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ h(E0, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ h(P0, { engine: t, node: e });
    default: {
      const n = o == null ? void 0 : o.get(e.type);
      return n != null && n.propertiesPanel ? /* @__PURE__ */ h(
        Ia,
        {
          engine: t,
          node: e,
          PanelComponent: n.propertiesPanel,
          docs: n.docs
        }
      ) : n != null && n.docs ? /* @__PURE__ */ h(Ia, { engine: t, node: e, docs: n.docs }) : null;
    }
  }
}
function Ta({
  engine: t,
  nodes: e
}) {
  const o = te(), { labels: r } = Jt(), n = Ke(xr), s = Math.round(e[0].rotation ?? 0), l = e.every(
    (f) => Math.round(f.rotation ?? 0) === s
  ) ? s : null, [d, c] = ot(null), a = ct(
    (f) => {
      c(null);
      const p = parseFloat(f);
      if (isNaN(p)) return;
      const y = Math.max(-360, Math.min(360, p)), u = e.map((g) => ({
        id: g.id,
        patch: { rotation: y }
      })), m = n == null ? void 0 : n();
      m ? t.batchUpdateWithHistoryCoalesced(u, m) : t.batchUpdateWithHistory(u);
    },
    [t, e, n]
  );
  return /* @__PURE__ */ S("div", { style: Gt, children: [
    /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.inspectorRotation }),
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
function za({
  engine: t,
  nodes: e
}) {
  const o = te(), { labels: r } = Jt(), n = e.map((i) => i.id);
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
  return /* @__PURE__ */ S("div", { style: Gt, children: [
    /* @__PURE__ */ h("span", { style: { ...Xt, color: o.textMuted }, children: r.inspectorStack }),
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
function V0({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const r = Ke(xr), n = ct(
    (s, i) => {
      const l = s === "opacity" ? W0 : F0, d = e.filter((a) => l.has(a.type)).map((a) => ({
        id: a.id,
        patch: {
          data: { ...a.data, [s]: i }
        }
      })), c = r == null ? void 0 : r();
      c ? t.batchUpdateWithHistoryCoalesced(d, c) : t.batchUpdateWithHistory(d);
    },
    [t, e, r]
  );
  return /* @__PURE__ */ S(Mt, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ h(
      qe,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (s) => n("opacity", s)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ h(
      jr,
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
function X0({
  engine: t,
  target: e
}) {
  const o = te(), { labels: r } = Jt();
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
  return /* @__PURE__ */ h(Le, { title: r.inspectorActions, defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ h("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: c.map((a) => /* @__PURE__ */ h(
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
function G0({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: r,
  open: n,
  onToggle: s
}) {
  const { labels: i } = Jt(), d = ic(i)[e.type] ?? e.type, c = e.nodes.length, a = e.nodes[0], f = `${d} (${c})`;
  return /* @__PURE__ */ h(Le, { title: f, defaultOpen: !1, variant: "group", open: n, onToggle: s, children: /* @__PURE__ */ h(Yr.Provider, { value: e.nodes, children: /* @__PURE__ */ h(
    ac,
    {
      engine: t,
      node: a,
      registry: o,
      fontsInScene: r
    }
  ) }) });
}
function Y0(t, e) {
  const o = ic(e);
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
function Aa({
  engine: t,
  registry: e,
  target: o,
  commonProps: r
}) {
  const { labels: n } = Jt(), s = Kt(() => B0(t), [t, o]), i = Y0(o, n), [l, d] = ot("shared"), [c, a] = ot(!1), f = Kt(() => {
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
  }, [o]), p = Dn(t, f);
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
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((u) => u.type)])).has(l) || d("shared");
  }, [o, l]), /* @__PURE__ */ S(xr.Provider, { value: p, children: [
    /* @__PURE__ */ h(N0, { label: i }),
    /* @__PURE__ */ h(
      O0,
      {
        engine: t,
        open: o.kind === "multi" ? l === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => d((y) => y === "canvas" ? "" : "canvas") : void 0
      }
    ),
    c && /* @__PURE__ */ h(X0, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ h(D0, { engine: t, mode: o.mode, fontsInScene: s }),
    o.kind === "single" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        ac,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: s
        }
      ),
      /* @__PURE__ */ h(Ta, { engine: t, nodes: [o.node] }),
      /* @__PURE__ */ h(za, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ S(
        Le,
        {
          title: n.inspectorShared,
          defaultOpen: !0,
          variant: "group",
          open: l === "shared",
          onToggle: () => d((y) => y === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ h(V0, { engine: t, nodes: o.nodes, commonProps: r }),
            /* @__PURE__ */ h(Ta, { engine: t, nodes: o.nodes }),
            /* @__PURE__ */ h(za, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((y) => /* @__PURE__ */ h(
        G0,
        {
          engine: t,
          group: y,
          registry: e,
          fontsInScene: s,
          open: l === y.type,
          onToggle: () => d((u) => u === y.type ? "" : y.type)
        },
        y.type
      ))
    ] })
  ] });
}
function j0({ engine: t, registry: e, hostActive: o }) {
  const r = te(), { isRTL: n, labels: s } = Jt(), { target: i, commonProps: l } = u0(t), d = i.kind !== "none";
  ct((H, it) => {
    const dt = H.trim();
    if (dt.startsWith("#")) {
      const st = dt.slice(1), ht = st.length === 3 ? st.split("").map((gt) => gt + gt).join("") : st;
      if (ht.length === 6) {
        const gt = parseInt(ht.slice(0, 2), 16), vt = parseInt(ht.slice(2, 4), 16), Et = parseInt(ht.slice(4, 6), 16);
        return `rgba(${gt}, ${vt}, ${Et}, ${it})`;
      }
    }
    return dt.startsWith("rgb(") ? `rgba(${dt.slice(4, -1)}, ${it})` : (dt.startsWith("rgba("), dt);
  }, []);
  const [c, a] = ot(!1), [f, p] = ot(!1), [y, u] = ot(!1), [m, g] = ot(!1), x = pt(null), b = pt(!1), w = ct(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), T = ct(
    (H) => {
      const it = w() ? 1366 : 1024;
      return H <= it;
    },
    [w]
  ), k = pt(null), [M, C] = ot(null), E = pt(null), [L, F] = ot(!1), [X, tt] = ot(!1), et = ct(() => {
    var dt, st;
    const H = (dt = k.current) == null ? void 0 : dt.offsetParent;
    if (H) return { width: H.clientWidth, height: H.clientHeight };
    const it = ((st = k.current) == null ? void 0 : st.ownerDocument.defaultView) ?? window;
    return { width: it.innerWidth, height: it.innerHeight };
  }, []), ft = ct(() => {
    const { width: H } = et();
    return n ? { x: so + 16, y: 12 } : { x: H - Oo - 16, y: 12 };
  }, [et, n]), Ct = M ?? ft(), xt = pt(!1);
  Eo(() => {
    if (!xt.current && k.current && !M) {
      xt.current = !0;
      const H = k.current.offsetParent;
      H && C(
        n ? { x: so + 16, y: 12 } : { x: H.clientWidth - Oo - 16, y: 12 }
      );
    }
  }, [M, n]), St(() => {
    var st, ht;
    const H = ((st = k.current) == null ? void 0 : st.offsetParent) ?? ((ht = k.current) == null ? void 0 : ht.ownerDocument.body);
    if (!H) return;
    const it = new ResizeObserver((gt) => {
      var Rt;
      const vt = ((Rt = gt[0]) == null ? void 0 : Rt.contentRect.width) ?? H.clientWidth;
      a(vt < 600);
      const Et = T(vt);
      p(Et), b.current || (g(Et), b.current = !0);
    });
    it.observe(H), a(H.clientWidth < 600);
    const dt = T(H.clientWidth);
    return p(dt), b.current || (g(dt), b.current = !0), () => it.disconnect();
  }, [T, X]), St(() => {
    var yt;
    const H = ((yt = k.current) == null ? void 0 : yt.ownerDocument) ?? document, it = () => {
      x.current !== null && window.clearTimeout(x.current), x.current = window.setTimeout(() => {
        u(!1), x.current = null;
      }, 200);
    }, dt = () => {
      x.current !== null && (window.clearTimeout(x.current), x.current = null), u(!0);
    }, st = (Lt) => !!(Lt instanceof Element && Lt.closest("[data-sb-canvas]")), ht = (Lt) => {
      Lt.button !== 2 && st(Lt.target) && dt();
    }, gt = () => it(), vt = () => it(), Et = (Lt) => {
      st(Lt.target) && dt();
    }, Rt = () => it(), At = (Lt) => {
      var oe;
      ((oe = Lt.detail) == null ? void 0 : oe.active) ? dt() : it();
    };
    return H.addEventListener("pointerdown", ht, !0), H.addEventListener("pointerup", gt, !0), H.addEventListener("pointercancel", vt, !0), H.addEventListener("focusin", Et, !0), H.addEventListener("focusout", Rt, !0), H.addEventListener("sb:canvas-interaction", At), () => {
      H.removeEventListener("pointerdown", ht, !0), H.removeEventListener("pointerup", gt, !0), H.removeEventListener("pointercancel", vt, !0), H.removeEventListener("focusin", Et, !0), H.removeEventListener("focusout", Rt, !0), H.removeEventListener("sb:canvas-interaction", At), x.current !== null && (window.clearTimeout(x.current), x.current = null);
    };
  }, []);
  const W = ct(
    (H, it) => {
      F(!0);
      const dt = M ? M.x : ft().x, st = M ? M.y : ft().y;
      E.current = {
        startX: H.clientX,
        startY: H.clientY,
        startLeft: dt,
        startTop: st
      }, (it ?? H.currentTarget).setPointerCapture(H.pointerId);
    },
    [M, ft]
  ), R = ct((H) => H instanceof Element ? !!H.closest(
    'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
  ) : !1, []), K = ct(
    (H) => {
      c || H.button === 0 && (R(H.target) || (H.stopPropagation(), W(H, H.currentTarget)));
    },
    [c, R, W]
  ), q = ct(
    (H) => {
      if (!E.current) return;
      H.stopPropagation();
      const it = H.clientX - E.current.startX, dt = H.clientY - E.current.startY, { width: st, height: ht } = et(), gt = X || n ? 8 : so, vt = X ? st - Oo - 8 : n ? st - Oo - so - 8 : st - Oo - 8, Et = Math.max(
        gt,
        Math.min(vt, E.current.startLeft + it)
      ), Rt = Math.max(
        8,
        Math.min(ht - 100, E.current.startTop + dt)
      );
      C({ x: Et, y: Rt });
    },
    [et, n, X]
  ), ut = ct(() => {
    E.current = null, F(!1);
  }, []), j = ct(() => {
    var it;
    const H = (it = k.current) == null ? void 0 : it.getBoundingClientRect();
    H && C({ x: H.left, y: H.top }), tt(!0);
  }, []), $ = ct(() => {
    tt(!1), C(null), xt.current = !1;
  }, []), at = m && y, rt = r.panelBg;
  if (!d) return null;
  if (c)
    return /* @__PURE__ */ S(
      "div",
      {
        ref: k,
        "data-sb-props-panel": !0,
        onPointerDown: (H) => H.stopPropagation(),
        style: {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45vh",
          minHeight: 200,
          background: rt,
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          color: r.text,
          fontSize: 12,
          backdropFilter: "blur(8px) saturate(120%)",
          WebkitBackdropFilter: "blur(8px) saturate(120%)",
          opacity: at ? 0 : 1,
          transform: at ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 140ms ease, transform 160ms ease",
          pointerEvents: at ? "none" : "auto"
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
                      color: r.textMuted,
                      fontSize: 11,
                      userSelect: "none"
                    },
                    onPointerDown: (H) => H.stopPropagation(),
                    children: [
                      /* @__PURE__ */ h("span", { children: s.autoHide }),
                      /* @__PURE__ */ h(
                        "input",
                        {
                          type: "checkbox",
                          checked: m,
                          onChange: (H) => g(H.target.checked),
                          style: { accentColor: r.accentColor }
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
                      background: r.border
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
                Aa,
                {
                  engine: t,
                  registry: e,
                  target: i,
                  commonProps: l
                }
              )
            }
          )
        ]
      }
    );
  const _ = /* @__PURE__ */ S(
    "div",
    {
      ref: k,
      "data-sb-props-panel": !0,
      style: {
        position: X ? "fixed" : "absolute",
        left: Ct.x,
        top: Ct.y,
        width: Oo,
        background: rt,
        borderRadius: r.panelBorderRadius,
        padding: "0 0 12px",
        display: "flex",
        flexDirection: "column",
        zIndex: X ? 9990 : 99,
        color: r.text,
        fontSize: 11,
        maxHeight: X ? "calc(100vh - 40px)" : "calc(100% - 40px)",
        boxShadow: r.panelShadow,
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        opacity: at ? 0 : 1,
        transform: at ? "translateY(-4px) scale(0.995)" : "translateY(0) scale(1)",
        transformOrigin: n ? "top left" : "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: at ? "none" : "auto",
        cursor: L ? "grabbing" : "grab"
      },
      onPointerDownCapture: K,
      onPointerDown: (H) => H.stopPropagation(),
      onPointerMove: q,
      onPointerUp: ut,
      onPointerCancel: ut,
      children: [
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              cursor: L ? "grabbing" : "grab",
              padding: "8px 16px",
              userSelect: "none",
              touchAction: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${r.border}`,
              color: r.textMuted,
              fontSize: 10,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ h("span", { style: { fontWeight: 600, letterSpacing: "0.02em" }, children: s.inspectorTitle }),
              /* @__PURE__ */ S("span", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                /* @__PURE__ */ S(
                  "label",
                  {
                    "data-no-panel-drag": !0,
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      color: r.textMuted,
                      fontSize: 10,
                      userSelect: "none",
                      cursor: "default"
                    },
                    onPointerDown: (H) => H.stopPropagation(),
                    children: [
                      /* @__PURE__ */ h("span", { children: s.autoHide }),
                      /* @__PURE__ */ h(
                        "input",
                        {
                          type: "checkbox",
                          checked: m,
                          onChange: (H) => g(H.target.checked),
                          style: { accentColor: r.accentColor }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ h(
                  "button",
                  {
                    type: "button",
                    "data-no-panel-drag": !0,
                    title: X ? s.dockIn : s.popOut,
                    "aria-label": X ? s.dockIn : s.popOut,
                    onPointerDown: (H) => H.stopPropagation(),
                    onClick: X ? $ : j,
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 20,
                      height: 20,
                      padding: 0,
                      border: "none",
                      borderRadius: 5,
                      background: "transparent",
                      color: r.textMuted,
                      cursor: "pointer"
                    },
                    children: X ? (
                      /* dock back: arrow into a corner box */
                      /* @__PURE__ */ S("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round", children: [
                        /* @__PURE__ */ h("path", { d: "M4.5 1.5h5a1 1 0 0 1 1 1v5" }),
                        /* @__PURE__ */ h("rect", { x: "1.5", y: "4.5", width: "6", height: "6", rx: "1" })
                      ] })
                    ) : (
                      /* pop out: box + outward arrow */
                      /* @__PURE__ */ S("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round", children: [
                        /* @__PURE__ */ h("path", { d: "M5 1.5H2.5a1 1 0 0 0-1 1V9.5a1 1 0 0 0 1 1H9.5a1 1 0 0 0 1-1V7" }),
                        /* @__PURE__ */ h("path", { d: "M7.5 1.5h3v3" }),
                        /* @__PURE__ */ h("path", { d: "M10.5 1.5 6 6" })
                      ] })
                    )
                  }
                )
              ] })
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
              Aa,
              {
                engine: t,
                registry: e,
                target: i,
                commonProps: l
              }
            )
          }
        )
      ]
    }
  );
  return X && o === !1 ? Xe(/* @__PURE__ */ h("div", { style: { display: "none" }, children: _ }), document.body) : X ? Xe(_, document.body) : _;
}
function Z0({ engine: t, registry: e, gifApiBaseUrl: o, hostActive: r }) {
  const { isRTL: n } = Jt();
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
          width: so,
          zIndex: 100
        },
        onPointerDown: (s) => s.stopPropagation(),
        children: /* @__PURE__ */ h(l0, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ h(j0, { engine: t, registry: e, hostActive: r })
  ] });
}
const Rr = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function K0(t) {
  const e = t.viewport.zoom, o = Rr.find((r) => r > e + 1e-3) ?? Rr[Rr.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function q0(t) {
  const e = t.viewport.zoom, o = [...Rr].reverse().find((r) => r < e - 1e-3) ?? Rr[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const U0 = {
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
}, xe = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Oe({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ h("path", { d: "M5 12h14", ...xe }),
    t === "plus" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M12 5v14", ...xe }),
      /* @__PURE__ */ h("path", { d: "M5 12h14", ...xe })
    ] }),
    t === "undo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...xe, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...xe, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...xe, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...xe, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...xe }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...xe })
    ] }),
    t === "play" && /* @__PURE__ */ h("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...xe }),
      /* @__PURE__ */ h("path", { d: "M6 6V18M18 6V18", ...xe }),
      /* @__PURE__ */ h("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...xe })
    ] }),
    t === "gauge" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 15a8 8 0 1 1 16 0", ...xe }),
      /* @__PURE__ */ h("path", { d: "M12 15l4-4", ...xe }),
      /* @__PURE__ */ h("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "minimap" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3.5", y: "3.5", width: "17", height: "17", rx: "2", ...xe, fill: "none" }),
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
      /* @__PURE__ */ h("circle", { cx: "11", cy: "11", r: "6", ...xe }),
      /* @__PURE__ */ h("path", { d: "M16 16l5 5", ...xe })
    ] }),
    t === "home" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M3 12l9-8 9 8", ...xe, fill: "none" }),
      /* @__PURE__ */ h("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...xe, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...xe, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ h("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function Q0({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showMinimap: r,
  onToggleMinimap: n,
  showPerfOverlay: s,
  onTogglePerfOverlay: i
}) {
  const l = te(), { labels: d } = Jt(), [c, a] = ot(t.viewport.zoom), [f, p] = ot(!1), [y, u] = ot(!1), [m, g] = ot(() => t.originView != null), [x, b] = ot(
    () => t.getAllNodes().filter((C) => C.type === "frame").length
  );
  St(() => {
    const C = () => a(t.viewport.zoom), E = () => {
      p(t.canUndo()), u(t.canRedo());
    }, L = () => {
      b(t.getAllNodes().filter((F) => F.type === "frame").length), g(t.originView != null);
    };
    return t.on("viewport", C), t.on("history", E), t.on("change", L), t.on("node:create", L), t.on("node:delete", L), () => {
      t.off("viewport", C), t.off("history", E), t.off("change", L), t.off("node:create", L), t.off("node:delete", L);
    };
  }, [t]);
  const w = l.panelBg, T = `1px solid ${l.border}`, k = {
    ...U0,
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
        /* @__PURE__ */ S("div", { "data-sb-bar-zoom": !0, style: { ...k, background: w, border: T, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.zoomOut,
              onClick: () => q0(t),
              style: { ...We, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Oe, { name: "minus" })
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
                ...We,
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
              onClick: () => K0(t),
              style: { ...We, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Oe, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-nav": !0, style: { ...k, background: w, border: T, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.fitToContent,
              onClick: () => t.fitToContent(),
              style: { ...We, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Oe, { name: "fit" })
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
                ...We,
                width: 32,
                height: 32,
                color: l.textMuted
              },
              children: /* @__PURE__ */ h(Oe, { name: "search" })
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
              style: { ...We, width: 32, height: 32, color: m ? l.accentColor : l.textFaint },
              children: /* @__PURE__ */ h(Oe, { name: m ? "bookmark-fill" : "bookmark" })
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
              style: { ...We, width: 32, height: 32, color: m ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Oe, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-present": !0, style: { ...k, overflow: "visible", background: w, border: T, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.presentSlides,
              onClick: () => t.enterPresentation(),
              style: { ...We, width: 32, height: 32, color: l.text },
              children: /* @__PURE__ */ h(Oe, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h("div", { style: M }),
            /* @__PURE__ */ S(
              "button",
              {
                title: d.toggleSlidesPanel,
                onClick: o,
                style: {
                  ...We,
                  width: 32,
                  height: 32,
                  color: e ? l.text : l.textMuted,
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ h(Oe, { name: "slides" }),
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
          n && /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h("div", { style: M }),
            /* @__PURE__ */ h(
              "button",
              {
                title: d.toggleMinimap,
                onClick: n,
                style: {
                  ...We,
                  width: 32,
                  height: 32,
                  color: r ? l.accentColor : l.textMuted
                },
                children: /* @__PURE__ */ h(Oe, { name: "minimap" })
              }
            )
          ] }),
          i && /* @__PURE__ */ S(Mt, { children: [
            /* @__PURE__ */ h("div", { style: M }),
            /* @__PURE__ */ h(
              "button",
              {
                title: d.togglePerformanceOverlay,
                onClick: i,
                style: {
                  ...We,
                  width: 32,
                  height: 32,
                  color: s ? l.accentColor : l.textMuted
                },
                children: /* @__PURE__ */ h(Oe, { name: "gauge" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ S("div", { "data-sb-bar-history": !0, style: { ...k, background: w, border: T, boxShadow: l.panelShadow }, children: [
          /* @__PURE__ */ h(
            "button",
            {
              title: d.undo,
              onClick: () => t.undo(),
              disabled: !f,
              style: { ...We, width: 32, height: 32, color: f ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Oe, { name: "undo" })
            }
          ),
          /* @__PURE__ */ h("div", { style: M }),
          /* @__PURE__ */ h(
            "button",
            {
              title: d.redo,
              onClick: () => t.redo(),
              disabled: !y,
              style: { ...We, width: 32, height: 32, color: y ? l.text : l.textFaint },
              children: /* @__PURE__ */ h(Oe, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
function J0(t) {
  return t.matches.length === 0 ? "0/0" : `${t.activeIndex >= 0 ? t.activeIndex + 1 : 0}/${t.matches.length}`;
}
function $0({ engine: t }) {
  const e = te(), { labels: o } = Jt(), [r, n] = ot(!1), [s, i] = ot(() => t.getSearchState()), l = pt(null), d = Kt(() => J0(s), [s]);
  return St(() => {
    const c = () => i(t.getSearchState()), a = () => {
      n(!0), requestAnimationFrame(() => {
        var p;
        return (p = l.current) == null ? void 0 : p.focus();
      });
    }, f = document;
    return t.on("search", c), f.addEventListener("sb:search-open", a), () => {
      t.off("search", c), f.removeEventListener("sb:search-open", a);
    };
  }, [t]), St(() => {
    const c = (a) => {
      (a.ctrlKey || a.metaKey) && a.key.toLowerCase() === "f" && (a.preventDefault(), n(!0), requestAnimationFrame(() => {
        var p;
        return (p = l.current) == null ? void 0 : p.focus();
      }));
    };
    return window.addEventListener("keydown", c), () => window.removeEventListener("keydown", c);
  }, []), St(() => {
    if (!r) return;
    const c = (a) => {
      var p;
      (a.ctrlKey || a.metaKey) && a.key.toLowerCase() === "f" ? (a.preventDefault(), (p = l.current) == null || p.focus()) : a.key === "Escape" && (a.preventDefault(), s.query ? t.clearSearch() : n(!1));
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
const lc = br(!1);
function _0() {
  return Ke(lc);
}
const ys = 240, Ea = 6;
function ms(t) {
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
  const d = l.flatMap((a) => a.sort((f, p) => f.x - p.x));
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
const ty = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function ey() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...ty }) });
}
function oy(t, e, o) {
  const [r, n] = ot("");
  return St(() => {
    let s = !1;
    return Sp(t, e).then((i) => {
      s || n(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), r;
}
function ry({ engine: t, frameId: e, tick: o }) {
  const r = oy(t, e, o);
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
const ny = ["pan", "fade", "dissolve", "zoom", "fold", "cube", "none"];
function Pa({ type: t, size: e = 12 }) {
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
const sy = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function iy({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: r,
  theme: n,
  labels: s
}) {
  const [i, l] = ot(!1), [d, c] = ot(!1), a = pt(null), f = pt(null), p = t !== "none", y = e ?? Dr[t], u = {
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
            /* @__PURE__ */ h(Pa, { type: t }),
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
              children: ny.map((g) => /* @__PURE__ */ S(
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
                    /* @__PURE__ */ h(Pa, { type: g }),
                    u[g]
                  ]
                },
                g
              ))
            }
          )
        ] }),
        p && /* @__PURE__ */ S("div", { ref: f, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ S("button", { onClick: () => {
            c((g) => !g), l(!1);
          }, style: m, children: [
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
              children: sy.map((g) => /* @__PURE__ */ S(
                "button",
                {
                  onClick: () => {
                    r(g === Dr[t] ? void 0 : g), c(!1);
                  },
                  style: {
                    border: "none",
                    background: g === y ? n.controlBgActive : "transparent",
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
                    g === Dr[t] ? " •" : ""
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
function ay({ engine: t, open: e, onClose: o }) {
  const r = te(), { isRTL: n, labels: s } = Jt(), i = _0(), [l, d] = ot(() => ms(t)), [c, a] = ot(() => new Set(t.selection)), [f, p] = ot(0), y = Dn(t, "frames-panel"), u = pt(null), m = pt(null), g = pt(0), x = pt(!1), b = pt(l);
  b.current = l;
  const w = pt(!1), T = pt(!1), [k, M] = ot(null), [C, E] = ot(null), [L, F] = ot(0), X = pt([]), tt = pt(null), et = ct(() => {
    if (w.current) return;
    const K = ms(t);
    d(K);
  }, [t]), ft = ct(() => {
    a(new Set(t.selection));
  }, [t]), Ct = pt(null), xt = ct(() => {
    Ct.current && clearTimeout(Ct.current), Ct.current = setTimeout(() => p((K) => K + 1), 500);
  }, []);
  St(() => {
    et(), ft();
    const K = setTimeout(() => p((ut) => ut + 1), 200), q = () => {
      et(), xt();
    };
    return t.on("change", q), t.on("node:create", q), t.on("node:delete", q), t.on("node:data", q), t.on("selection", ft), t.on("history", q), () => {
      clearTimeout(K), t.off("change", q), t.off("node:create", q), t.off("node:delete", q), t.off("node:data", q), t.off("selection", ft), t.off("history", q), Ct.current && clearTimeout(Ct.current);
    };
  }, [t, et, ft, xt]), St(() => {
    if (!tt.current) return;
    const K = tt.current.querySelectorAll("[data-frame-card]");
    X.current = Array.from(K).map((q) => q.offsetHeight + Ea);
  }, [l]);
  const W = ct(
    (K) => {
      t.select(K), t.zoomToNode(K, 0.8);
    },
    [t]
  ), R = ct(
    (K, q) => {
      K.preventDefault(), K.stopPropagation(), g.current = K.clientY, u.current = q, m.current = q, x.current = !1;
    },
    []
  );
  return St(() => {
    const K = (ut) => {
      if (u.current === null) return;
      const j = ut.clientY - g.current;
      if (!x.current) {
        if (Math.abs(j) < 4) return;
        x.current = !0, M(u.current), E(u.current);
      }
      F(j);
      const $ = X.current, at = u.current;
      let rt = at;
      if (j > 0) {
        let _ = 0;
        for (let H = at + 1; H < b.current.length && (_ += $[H] || 0, j > _ - ($[H] || 0) / 2); H++)
          rt = H;
      } else if (j < 0) {
        let _ = 0;
        for (let H = at - 1; H >= 0 && (_ -= $[H] || 0, j < _ + ($[H] || 0) / 2); H--)
          rt = H;
      }
      m.current = rt, E(rt);
    }, q = () => {
      const ut = u.current, j = m.current;
      if (ut !== null && j !== null && ut !== j) {
        w.current = !0;
        const $ = [...b.current], [at] = $.splice(ut, 1);
        $.splice(j, 0, at);
        let rt = !0;
        for (let _ = 0; _ < $.length; _++) {
          const H = $[_], it = t.getNode(H.id);
          it && (rt ? (t.updateNodeWithHistory(H.id, {
            data: { ...it.data, slideOrder: _ + 1 }
          }), rt = !1) : t.updateNode(H.id, {
            data: { ...it.data, slideOrder: _ + 1 }
          }));
        }
        w.current = !1, T.current = !0, d(ms(t)), p((_) => _ + 1);
      }
      u.current = null, m.current = null, x.current = !1, M(null), E(null), F(0), T.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          T.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", K), document.addEventListener("pointerup", q), document.addEventListener("pointercancel", q), () => {
      document.removeEventListener("pointermove", K), document.removeEventListener("pointerup", q), document.removeEventListener("pointercancel", q);
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
        width: ys,
        background: r.panelBg,
        borderLeft: n ? void 0 : `1px solid ${r.border}`,
        borderRight: n ? `1px solid ${r.border}` : void 0,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : n ? `translateX(-${ys}px)` : `translateX(${ys}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (K) => K.stopPropagation(),
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
                  children: /* @__PURE__ */ h(ey, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ S(
          "div",
          {
            ref: tt,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: Ea
            },
            children: [
              l.length === 0 && /* @__PURE__ */ h("div", { style: { padding: "20px 8px", textAlign: "center", color: r.textMuted, fontSize: 11 }, children: s.noFramesYet }),
              l.map((K, q) => {
                const ut = c.has(K.id), j = k === q;
                let $ = 0;
                if (j)
                  $ = L;
                else if (k !== null && C !== null) {
                  const _ = X.current;
                  k < C ? q > k && q <= C && ($ = -(_[k] || 0)) : k > C && q >= C && q < k && ($ = _[k] || 0);
                }
                const at = (_) => {
                  const H = t.getNode(K.id);
                  if (!H) return;
                  const it = `${y()}:${K.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    K.id,
                    {
                      data: {
                        ...H.data,
                        transition: _ === "pan" ? void 0 : _,
                        transitionDuration: void 0
                      }
                    },
                    it
                  );
                }, rt = (_) => {
                  const H = t.getNode(K.id);
                  if (!H) return;
                  const it = `${y()}:${K.id}`;
                  t.updateNodeWithHistoryCoalesced(
                    K.id,
                    {
                      data: { ...H.data, transitionDuration: _ }
                    },
                    it
                  );
                };
                return /* @__PURE__ */ S(Oc.Fragment, { children: [
                  !i && k === null && /* @__PURE__ */ h(
                    iy,
                    {
                      value: K.transition ?? "pan",
                      durationMs: K.transitionDuration,
                      onChange: at,
                      onDurationChange: rt,
                      theme: r,
                      labels: s
                    }
                  ),
                  /* @__PURE__ */ h(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: i ? void 0 : (_) => R(_, q),
                      onDoubleClick: () => W(K.id),
                      style: {
                        borderRadius: 6,
                        border: ut ? `2px solid ${K.borderColor || r.text}` : `1px solid ${r.border}`,
                        background: ut ? r.controlBgActive : "transparent",
                        cursor: i ? "pointer" : j ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: i ? "auto" : "none",
                        transition: j || T.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${$}px)`,
                        zIndex: j ? 10 : 1,
                        opacity: j ? 0.92 : 1,
                        boxShadow: j ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ h(ry, { engine: t, frameId: K.id, tick: f })
                    }
                  )
                ] }, K.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const Bo = 50, gs = 30, ly = `
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
`, cy = `
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
function Ha(t, e, o) {
  const r = t.createShader(e);
  return r ? (t.shaderSource(r, o), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (t.deleteShader(r), null)) : null;
}
function dy(t, e, o) {
  const r = Ha(t, t.VERTEX_SHADER, e), n = Ha(t, t.FRAGMENT_SHADER, o);
  if (!r || !n) return null;
  const s = t.createProgram();
  return t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function hy() {
  const t = [], e = [];
  for (let o = 0; o <= gs; o++)
    for (let r = 0; r <= Bo; r++)
      t.push(r / Bo, o / gs * 2 - 1);
  for (let o = 0; o < gs; o++)
    for (let r = 0; r < Bo; r++) {
      const n = o * (Bo + 1) + r;
      e.push(n, n + Bo + 1, n + 1, n + 1, n + Bo + 1, n + Bo + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function uy({ phase: t, progress: e }) {
  const o = pt(null), r = pt(null);
  return St(() => {
    const n = o.current;
    if (!n) return;
    const s = window.devicePixelRatio || 1;
    n.width = n.clientWidth * s, n.height = n.clientHeight * s;
    const i = n.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const l = dy(i, ly, cy);
    if (!l) return;
    i.useProgram(l);
    const { vertices: d, indices: c } = hy(), a = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, a), i.bufferData(i.ARRAY_BUFFER, d, i.STATIC_DRAW);
    const f = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, f), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const p = i.getAttribLocation(l, "aUV");
    i.enableVertexAttribArray(p), i.vertexAttribPointer(p, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const y = (u) => i.getUniformLocation(l, u);
    return r.current = {
      gl: i,
      locs: { uLayPos: y("uLayPos"), uRadius: y("uRadius"), uSide: y("uSide"), uColor: y("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(l), i.deleteBuffer(a), i.deleteBuffer(f), r.current = null;
    };
  }, []), St(() => {
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
const fy = {
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
}, bs = {
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
}, js = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function La({ dir: t }) {
  return /* @__PURE__ */ S("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ h("polyline", { points: "15,18 9,12 15,6", ...js }),
    t === "right" && /* @__PURE__ */ h("polyline", { points: "9,6 15,12 9,18", ...js })
  ] });
}
function py() {
  return /* @__PURE__ */ h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ h("path", { d: "M18 6L6 18M6 6l12 12", ...js }) });
}
function Da(t) {
  return 1 - Math.pow(1 - t, 3);
}
function Ra(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Wa(t, e) {
  let r;
  t <= 0.2 ? r = 1 + (0.55 - 1) * Da(t / 0.2) : t >= 0.8 ? r = 0.55 + (1 - 0.55) * Da((t - 0.8) / 0.2) : r = 0.55;
  let n;
  return t <= 0.1 ? n = 0 : t <= 0.5 ? n = -e * 90 * Ra((t - 0.1) / 0.4) : t <= 0.9 ? n = e * 90 * (1 - Ra((t - 0.5) / 0.4)) : n = 0, { zoom: r, angle: n };
}
function yy(t, e, o, r) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${r}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function Fa(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function my({ engine: t }) {
  const [e, o] = ot(t.presentationMode), [r, n] = ot(t.presentationIndex), [s, i] = ot(t.presentationSlides.length), [l, d] = ot(""), [c, a] = ot(t.transitionOverlay), f = pt(null), p = pt(null);
  if (St(() => {
    const u = document.querySelector("[data-sb-canvas]");
    f.current = u, p.current = (u == null ? void 0 : u.parentElement) ?? null;
    const m = () => {
      var w;
      if (o(t.presentationMode), n(t.presentationIndex), i(t.presentationSlides.length), a(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const T = t.presentationSlides[t.presentationIndex], k = t.getNode(T);
        d(((w = k == null ? void 0 : k.data) == null ? void 0 : w.label) || "");
      } else
        d("");
      const g = t.transitionOverlay, x = f.current, b = p.current;
      if (x && b && g && g.type === "cube" && g.t != null) {
        const T = g.direction ?? 1, { zoom: k, angle: M } = Wa(g.t, T);
        yy(x, b, k, M);
      } else x && b && Fa(x, b);
    };
    return t.on("presentation", m), () => {
      t.off("presentation", m);
      const g = f.current, x = p.current;
      g && x && Fa(g, x);
    };
  }, [t]), !e || s === 0) return null;
  const y = c && c.type === "cube" && c.t != null ? (() => {
    const u = c.direction ?? 1, { angle: m } = Wa(c.t, u);
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
        c && c.type === "fold" && /* @__PURE__ */ h(uy, { phase: c.phase, progress: c.progress }),
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
        /* @__PURE__ */ S("div", { style: fy, onPointerDown: (u) => u.stopPropagation(), children: [
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...bs, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ h(py, {})
            }
          ),
          /* @__PURE__ */ h(
            "button",
            {
              style: { ...bs, opacity: r <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: r <= 0,
              children: /* @__PURE__ */ h(La, { dir: "left" })
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
              style: { ...bs, opacity: r >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: r >= s - 1,
              children: /* @__PURE__ */ h(La, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
function bo(t) {
  return `${t.toFixed(2)} ms`;
}
function Te(t, e) {
  return { label: t, value: e };
}
function gy() {
  const t = te(), { labels: e } = Jt(), [o, r] = ot(() => Me.getSnapshot());
  St(() => {
    let s = 0;
    const i = (d) => {
      Me.tick(d), s = requestAnimationFrame(i);
    };
    s = requestAnimationFrame(i);
    const l = Me.subscribe(() => r(Me.getSnapshot()));
    return () => {
      cancelAnimationFrame(s), l();
    };
  }, []);
  const n = Kt(
    () => [
      Te(e.perfVirtualization, o.virtualizationActive ? e.perfOn : e.perfOff),
      Te(e.perfFps, o.fps.toFixed(1)),
      Te(e.perfFrameP50P95, `${bo(o.frameMsP50)} / ${bo(o.frameMsP95)}`),
      Te(e.perfCullingP50P95, `${bo(o.cullingMsP50)} / ${bo(o.cullingMsP95)}`),
      Te(e.perfHitTestP50P95, `${bo(o.hitTestMsP50)} / ${bo(o.hitTestMsP95)}`),
      Te(e.perfEdgeHitP50P95, `${bo(o.edgeHitMsP50)} / ${bo(o.edgeHitMsP95)}`),
      Te(e.perfHitTestCalls, o.hitTestCallsPerSec.toFixed(1)),
      Te(e.perfEdgeHitCalls, o.edgeHitCallsPerSec.toFixed(1)),
      Te(e.perfVisibleNodes, `${o.visibleNodes} / ${o.totalNodes}`),
      Te(e.perfVisibleEdges, `${o.visibleEdges} / ${o.totalEdges}`),
      Te(e.perfSeedVisibleNodes, String(o.seedVisibleNodes)),
      Te(e.perfNodesAdjacency, String(o.nodesAddedByAdjacency)),
      Te(e.perfNodesEdgeEndpoints, String(o.nodesAddedByEdgeEndpoints)),
      Te(e.perfEdgesAdjacency, String(o.edgesAddedByAdjacency)),
      Te(e.perfEdgesCrossing, String(o.edgesAddedByCrossing))
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
const by = Gc(() => import("./DebugPanel-BsRQZ36P.js"));
function Gy({
  nodeTypes: t = Xu,
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
  hostActive: f,
  direction: p,
  localization: y,
  dataFlowEdgeOverlay: u = "off",
  initialFramesPanelOpen: m = !1,
  preview: g = !1,
  readOnly: x = !1,
  singleFrameId: b
}) {
  const w = Kt(
    () => e ?? new Es(),
    [e]
  ), T = Kt(() => new Ud(t), [t]);
  St(() => Cd(), []), St(() => {
    w.setRegistry(T);
  }, [w, T]), St(() => {
    w.setReadOnly(x);
  }, [w, x]), St(() => {
    for (const R of t)
      R.isContainer && w.registerContainerType(R.type);
  }, [w, t]);
  const k = pt(!1);
  St(() => {
    if (!n || k.current) return;
    k.current = !0;
    let R = !1;
    return g || b ? (async () => (await w.fromSBD(n), !R && requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        R || (b ? w.fitToFrame(b) : w.fitToContent());
      });
    })))() : w.fromSBD(n), () => {
      R = !0;
    };
  }, [w, n, g, b]);
  const M = pt(null);
  St(() => {
    if (o)
      return np(w, M.current);
  }, [w, o]);
  const C = Kt(() => t.some((K) => pr(K)) ? new Gu(w, T) : null, [w, T, t]);
  St(() => {
    if (C)
      return C.connect();
  }, [C]);
  const E = Kt(
    () => d ? { ...Ws, ...d } : Ws,
    [d]
  ), L = $u(p, y), [F, X] = ot(!1), [tt, et] = ot(m), [ft, Ct] = ot(!g), [xt, W] = ot(!1);
  return St(() => {
    Me.setEnabled(g ? !1 : xt);
  }, [g, xt]), St(() => {
    const R = () => {
      const K = w.presentationMode;
      X(K), c == null || c(K);
    };
    return w.on("presentation", R), () => w.off("presentation", R);
  }, [w, c]), /* @__PURE__ */ h(gl.Provider, { value: L, children: /* @__PURE__ */ h(ml.Provider, { value: E, children: /* @__PURE__ */ h(lc.Provider, { value: x, children: /* @__PURE__ */ S(
    "div",
    {
      ref: M,
      dir: L.dir,
      tabIndex: o ? 0 : void 0,
      onPointerDownCapture: o ? (R) => {
        if (R.target.closest('input, textarea, [contenteditable="true"]')) return;
        const q = M.current;
        q && !q.contains(q.ownerDocument.activeElement) && q.focus({ preventScroll: !0 });
      } : void 0,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        outline: "none",
        ...r
      },
      children: [
        s && !F && !x && /* @__PURE__ */ h(Z0, { engine: w, registry: T, gifApiBaseUrl: a, hostActive: f }),
        i && /* @__PURE__ */ h(Xc, { fallback: null, children: /* @__PURE__ */ h(by, { engine: w, extraBoards: l }) }),
        /* @__PURE__ */ S(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !F && !x && !L.isRTL ? so : 0,
              top: 0,
              right: s && !F && !x && L.isRTL ? so : 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ h(
                Hp,
                {
                  engine: w,
                  schema: Ks,
                  registry: T,
                  dataFlow: C,
                  dataFlowEdgeOverlay: u,
                  minimapVisible: g ? !1 : ft,
                  singleFrameId: b
                }
              ),
              !g && !F && /* @__PURE__ */ h($0, { engine: w }),
              !g && !F && /* @__PURE__ */ h(
                Q0,
                {
                  engine: w,
                  framesPanelOpen: tt,
                  onToggleFramesPanel: () => et((R) => !R),
                  showMinimap: ft,
                  onToggleMinimap: () => Ct((R) => !R),
                  showPerfOverlay: xt,
                  onTogglePerfOverlay: () => W((R) => !R)
                }
              ),
              !g && !F && xt && /* @__PURE__ */ h(gy, {}),
              !g && !F && /* @__PURE__ */ h(
                ay,
                {
                  engine: w,
                  open: tt,
                  onClose: () => et(!1)
                }
              ),
              !g && /* @__PURE__ */ h(my, { engine: w }),
              x && !F && !g && /* @__PURE__ */ h(
                "div",
                {
                  "data-sb-readonly-pill": !0,
                  style: {
                    position: "absolute",
                    top: 12,
                    [L.isRTL ? "left" : "right"]: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    background: E.panelBg,
                    color: E.textMuted,
                    border: `1px solid ${E.border}`,
                    boxShadow: E.panelShadow,
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 10
                  },
                  children: L.labels.viewOnly ?? "View only"
                }
              )
            ]
          }
        )
      ]
    }
  ) }) }) });
}
const xy = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], cr = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, de = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Pr({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ S("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ h("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...de }),
      /* @__PURE__ */ h("path", { d: "M15 5l4 4", ...de })
    ] }),
    t === "shape" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...de }),
    t === "text" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M7 4h10", ...de }),
      /* @__PURE__ */ h("path", { d: "M12 4v16", ...de })
    ] }),
    t === "note" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 3h16v14l-4 4H4z", ...de }),
      /* @__PURE__ */ h("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...de }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...de, opacity: 0.5 }),
      /* @__PURE__ */ h("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...de, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ h("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...de, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...de }),
      /* @__PURE__ */ h("path", { d: "M12.5 4.5l8 8", ...de })
    ] }),
    t === "rect" && /* @__PURE__ */ h("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...de }),
    t === "ellipse" && /* @__PURE__ */ h("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...de }),
    t === "diamond" && /* @__PURE__ */ h("path", { d: "M12 3l9 9-9 9-9-9z", ...de }),
    t === "line" && /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...de }),
    t === "arrow" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...de }),
      /* @__PURE__ */ h("polyline", { points: "12,5 19,5 19,12", ...de, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...de, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "8,5 4,9 8,13", ...de, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...de, fill: "none" }),
      /* @__PURE__ */ h("polyline", { points: "16,5 20,9 16,13", ...de, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M6 9V3h12v6", ...de }),
      /* @__PURE__ */ h("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...de }),
      /* @__PURE__ */ h("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...de })
    ] }),
    t === "fit" && /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h("path", { d: "M15 3h6v6M9 21H3v-6", ...de }),
      /* @__PURE__ */ h("path", { d: "M21 3l-7 7M3 21l7-7", ...de })
    ] })
  ] });
}
function Yy({ engine: t }) {
  const [e, o] = ot(t.mode), [r, n] = ot(!1), [s, i] = ot(!1), [l, d] = ot(t.boardBackground);
  return St(() => {
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
        xy.map((c) => /* @__PURE__ */ h(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...cr,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(Pr, { name: c.key })
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
              ...cr,
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
              ...cr,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(Pr, { name: "print" })
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
              ...cr,
              width: 36,
              height: 36,
              background: "transparent",
              color: r ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(Pr, { name: "undo" })
          }
        ),
        /* @__PURE__ */ h(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...cr,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ h(Pr, { name: "redo" })
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
              ...cr,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ h(Pr, { name: "fit" })
          }
        )
      ]
    }
  );
}
const xo = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], wy = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], vy = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], dr = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], ky = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], hr = [1, 2.5, 5, 10, 20], Sy = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], My = [14, 20, 28, 36], Cy = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], xs = 300, $t = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, _t = {
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
function jy({
  engine: t,
  registry: e
}) {
  const [o, r] = ot(t.mode), [n, s] = ot(t.selection), [, i] = ot(0), [l, d] = ot(null), c = pt(null), a = pt(null), [f, p] = ot(!1), y = ct(() => {
    var lt;
    return { x: (((lt = c.current) == null ? void 0 : lt.ownerDocument.defaultView) ?? window).innerWidth - xs - 12, y: 12 };
  }, []), u = l ?? y();
  St(() => {
    const I = () => r(t.mode), lt = () => {
      s(new Set(t.selection)), i((we) => we + 1);
    }, ce = () => i((we) => we + 1);
    return t.on("mode", I), t.on("selection", lt), t.on("change", ce), () => {
      t.off("mode", I), t.off("selection", lt), t.off("change", ce);
    };
  }, [t]);
  const m = ct((I) => {
    I.stopPropagation(), p(!0);
    const lt = l ? l.x : y().x, ce = l ? l.y : y().y;
    a.current = { startX: I.clientX, startY: I.clientY, startLeft: lt, startTop: ce }, I.currentTarget.setPointerCapture(I.pointerId);
  }, [l, y]);
  St(() => {
    var we;
    const I = (ue) => {
      var Lo;
      if (!a.current) return;
      const Ge = ue.clientX - a.current.startX, qt = ue.clientY - a.current.startY, Ye = ((Lo = c.current) == null ? void 0 : Lo.ownerDocument.defaultView) ?? window, Jo = Math.max(48, Math.min(Ye.innerWidth - xs - 8, a.current.startLeft + Ge)), wr = Math.max(8, Math.min(Ye.innerHeight - 100, a.current.startTop + qt));
      d({ x: Jo, y: wr });
    }, lt = () => {
      a.current = null, p(!1);
    }, ce = ((we = c.current) == null ? void 0 : we.ownerDocument) ?? document;
    return ce.addEventListener("pointermove", I), ce.addEventListener("pointerup", lt), ce.addEventListener("pointercancel", lt), () => {
      ce.removeEventListener("pointermove", I), ce.removeEventListener("pointerup", lt), ce.removeEventListener("pointercancel", lt);
    };
  }, []);
  const g = Kt(() => n.size === 1 ? Array.from(n)[0] : o === "draw" || o === "shape" || o === "text" || o === "edge" ? "tool" : "none", [n, o]), x = Dn(t, g), b = (() => {
    if (n.size === 1) {
      const I = Array.from(n)[0], lt = t.getNode(I);
      if ((lt == null ? void 0 : lt.type) === "shape") return { kind: "shape", node: lt };
      if ((lt == null ? void 0 : lt.type) === "draw") return { kind: "draw", node: lt };
      if ((lt == null ? void 0 : lt.type) === "text") return { kind: "text", node: lt };
      if ((lt == null ? void 0 : lt.type) === "edge") return { kind: "edge", node: lt };
      if ((lt == null ? void 0 : lt.type) === "image") return { kind: "image", node: lt };
      if ((lt == null ? void 0 : lt.type) === "content") return { kind: "content", node: lt };
      if ((lt == null ? void 0 : lt.type) === "frame") return { kind: "frame", node: lt };
      if ((lt == null ? void 0 : lt.type) === "sticky") return { kind: "sticky", node: lt };
      if (lt && e) {
        const ce = e.get(lt.type);
        if (ce != null && ce.propertiesPanel)
          return { kind: "custom", node: lt, PanelComponent: ce.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" || o === "edge" ? { kind: "tool" } : null;
  })(), w = ct(
    (I) => {
      if (!b || b.kind !== "shape") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  ), T = ct(
    (I) => {
      if (!b || b.kind !== "draw") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  ), k = ct(
    (I) => {
      if (!b || b.kind !== "text") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  ), M = ct(
    (I) => {
      if (!b || b.kind !== "edge") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  ), C = ct(
    (I) => {
      if (!b || b.kind !== "image") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  ), E = ct(
    (I) => {
      if (!b || b.kind !== "content") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  ), L = ct(
    (I) => {
      if (!b || b.kind !== "frame") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  ), F = ct(
    (I) => {
      if (!b || b.kind !== "sticky") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  ), X = ct(
    (I) => {
      if (!b || b.kind !== "custom") return;
      const lt = x();
      t.updateNodeWithHistoryCoalesced(
        b.node.id,
        {
          data: { ...b.node.data, ...I }
        },
        lt
      );
    },
    [t, b, x]
  );
  if (!b) return null;
  const tt = b.kind === "custom", et = b.kind === "shape", ft = b.kind === "draw", Ct = b.kind === "text", xt = b.kind === "edge", W = b.kind === "image", R = b.kind === "content", K = b.kind === "frame", q = b.kind === "sticky", ut = b.kind === "tool", j = ut && o === "shape", $ = ut && o === "text", at = Ct ? b.node.data.fontFamily : t.activeTool.fontFamily ?? Mo, rt = Ct ? b.node.data.fontSize : t.activeTool.fontSize ?? 20, _ = Ct ? b.node.data.align : t.activeTool.textAlign ?? "left", H = Ct ? b.node.data.color : t.activeTool.color, it = et ? b.node.data.stroke : ft ? b.node.data.color : t.activeTool.color, dt = et || ft ? b.node.data.fill ?? null : t.activeTool.fillColor ?? null, st = et || ft ? b.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", ht = et || ft ? b.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", gt = et || ft ? b.node.data.strokeWidth : t.activeTool.width, vt = et ? b.node.data.roughness : t.activeTool.roughness ?? 1, Et = et || ft || Ct || W || R || K || q ? b.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Rt = (() => {
    const I = /* @__PURE__ */ new Set(), lt = [];
    for (const ce of t.getAllNodes())
      if (ce.type === "text") {
        const we = ce.data.fontFamily;
        we && !I.has(we) && (I.add(we), lt.push(we));
      }
    return lt;
  })(), At = !Ct && !$ && !xt && !W && !R && !K && !q && !tt, yt = At, Lt = At, Wt = et || j, oe = Ct || $, se = (I) => {
    et ? w({ stroke: I }) : ft ? T({ color: I }) : (t.activeTool.color = I, i((lt) => lt + 1));
  }, ne = (I) => {
    et ? w({ fill: I ?? void 0 }) : ft ? T({ fill: I ?? void 0 }) : (t.activeTool.fillColor = I ?? void 0, i((lt) => lt + 1));
  }, mt = (I) => {
    et ? w({ fillStyle: I }) : ft ? T({ fillStyle: I }) : (t.activeTool.fillStyle = I, i((lt) => lt + 1));
  }, le = (I) => {
    et ? w({ strokeStyle: I }) : ft ? T({ strokeStyle: I }) : (t.activeTool.strokeStyle = I, i((lt) => lt + 1));
  }, he = (I) => {
    et ? w({ strokeWidth: I }) : ft ? T({ strokeWidth: I }) : (t.activeTool.width = I, i((lt) => lt + 1));
  }, pe = (I) => {
    et ? w({ roughness: I }) : (t.activeTool.roughness = I, i((lt) => lt + 1));
  }, me = (I) => {
    et ? w({ opacity: I }) : ft ? T({ opacity: I }) : Ct ? k({ opacity: I }) : W ? C({ opacity: I }) : R ? E({ opacity: I }) : K ? L({ opacity: I }) : q ? F({ opacity: I }) : (t.activeTool.opacity = I, i((lt) => lt + 1));
  }, ge = (I) => {
    Ct ? k({ fontFamily: I }) : (t.activeTool.fontFamily = I, i((lt) => lt + 1));
  }, to = (I) => {
    Ct ? k({ fontSize: I }) : (t.activeTool.fontSize = I, i((lt) => lt + 1));
  }, Ue = (I) => {
    Ct ? k({ align: I }) : (t.activeTool.textAlign = I, i((lt) => lt + 1));
  }, Ho = (I) => {
    Ct ? k({ color: I }) : (t.activeTool.color = I, i((lt) => lt + 1));
  }, Ne = {
    position: "fixed",
    left: u.x,
    top: u.y,
    width: xs,
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
      style: Ne,
      onPointerDown: (I) => I.stopPropagation(),
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
        oe && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Font" }),
            /* @__PURE__ */ h(
              Wn,
              {
                value: at,
                onChange: ge,
                fontsInScene: Rt
              }
            )
          ] }),
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Size" }),
            My.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => to(I),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: rt === I ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: I
              },
              I
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Align" }),
            Cy.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.key,
                onClick: () => Ue(I.key),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: _ === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: I.label
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Color" }),
            xo.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => Ho(I),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I,
                  border: H === I ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          Ct && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Border" }),
            [null, ...xo].map((I, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => k({ borderColor: I ?? void 0 }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`,
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
              I ?? "none"
            ))
          ] }),
          Ct && b.node.data.borderColor && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Style" }),
            dr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => k({ borderStyle: I.key }),
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
          Ct && b.node.data.borderColor && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Width" }),
            hr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => k({ borderWidth: I }),
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
        At && /* @__PURE__ */ S(Mt, { children: [
          j && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Shape" }),
            Sy.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => {
                  t.activeTool.shapeType = I.key, i((lt) => lt + 1);
                },
                style: {
                  ...ie,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(Iy, { name: I.key })
              },
              I.key
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Stroke" }),
            xo.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => se(I),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I,
                  border: it === I ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              I
            ))
          ] }),
          yt && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Fill" }),
            wy.map((I, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => ne(I),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: dt === I ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`,
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
              I ?? "none"
            ))
          ] }),
          yt && dt && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Fill pattern" }),
            vy.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => mt(I.key),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: st === I.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ h(Ty, { style: I.key })
              },
              I.key
            ))
          ] }),
          Lt && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Stroke style" }),
            dr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => le(I.key),
                style: {
                  ...ie,
                  width: 36,
                  height: 28,
                  background: ht === I.key ? "#3b82f6" : "#2a2a3e",
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Stroke width" }),
            hr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => he(I),
                style: {
                  ...ie,
                  width: 36,
                  height: 24,
                  background: gt === I ? "#3b82f6" : "#2a2a3e",
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
          Wt && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Roughness" }),
            ky.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => pe(I.value),
                style: {
                  ...ie,
                  height: 28,
                  padding: "0 8px",
                  background: vt === I.value ? "#3b82f6" : "#2a2a3e",
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
        xt && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Color" }),
            xo.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ color: I }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Style" }),
            dr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => M({ style: I.key }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Width" }),
            hr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => M({ strokeWidth: I }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ arrowHead: I }),
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
          (b.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Head size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3),
                onChange: (I) => M({ arrowHeadSize: Number(I.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ arrowTail: I }),
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
          (b.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Tail size" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3),
                onChange: (I) => M({ arrowTailSize: Number(I.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ h("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (I) => M({ label: I.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => M({ edgeType: I.key }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Animate" }),
            /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ animated: !b.node.data.animated }),
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
          b.node.data.animated && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Direction" }),
            ["forward", "reverse", "both"].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => M({ animatedDirection: I }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Border" }),
            [null, ...xo].map((I, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => C({ borderColor: I ?? void 0 }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`,
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
              I ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Style" }),
            dr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => C({ borderStyle: I.key }),
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
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Width" }),
            hr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => C({ borderWidth: I }),
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
        R && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Border" }),
            [null, ...xo].map((I, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => E({ borderColor: I ?? void 0 }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === I ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`,
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
              I ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Style" }),
            dr.map((I) => /* @__PURE__ */ h(
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
          b.node.data.borderColor && /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Width" }),
            hr.map((I) => /* @__PURE__ */ h(
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
        K && /* @__PURE__ */ S(Mt, { children: [
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Label" }),
            /* @__PURE__ */ h(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (I) => L({ label: I.target.value || void 0 }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Background" }),
            [null, ...xo].map((I, lt) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => L({ backgroundColor: I ? `${I}15` : void 0 }),
                style: {
                  ...ie,
                  width: 20,
                  height: 20,
                  background: I ?? "transparent",
                  border: (() => {
                    const ce = b.node.data.backgroundColor;
                    return (I === null ? !ce : ce === `${I}15`) ? "2px solid white" : `2px solid ${lt === 0 ? "#555" : "transparent"}`;
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
              I ?? "none"
            ))
          ] }),
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Border" }),
            xo.map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => L({ borderColor: I }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Style" }),
            dr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: I.label,
                onClick: () => L({ borderStyle: I.key }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Width" }),
            hr.map((I) => /* @__PURE__ */ h(
              "button",
              {
                title: `${I}px`,
                onClick: () => L({ borderWidth: I }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Color" }),
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
                onClick: () => F({ color: I }),
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
          /* @__PURE__ */ S("div", { style: $t, children: [
            /* @__PURE__ */ h("span", { style: _t, children: "Size" }),
            [12, 14, 16, 20, 24].map((I) => /* @__PURE__ */ h(
              "button",
              {
                onClick: () => F({ fontSize: I }),
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
        tt && (() => {
          const { node: I, PanelComponent: lt } = b;
          return /* @__PURE__ */ h(lt, { node: I, data: I.data, engine: t, updateData: X });
        })(),
        !xt && !tt && /* @__PURE__ */ S("div", { style: $t, children: [
          /* @__PURE__ */ h("span", { style: _t, children: "Opacity" }),
          /* @__PURE__ */ h(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(Et * 100),
              onChange: (I) => me(parseInt(I.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ h("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(Et * 100) })
        ] })
      ]
    }
  );
}
function Iy({ name: t, size: e = 16 }) {
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
function Ty({ style: t }) {
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
function Zy({
  preview: t,
  engine: e,
  zoom: o
}) {
  const r = e.getNode(t.fromNodeId);
  if (!r) return null;
  const n = e.getRegistry(), s = e.getAllNodes(), i = e.measuredHeights, l = t.cursorX, d = t.cursorY, c = t.edgeColor || "#3b82f6", a = t.edgeStrokeWidth || 2, f = t.edgeStyle || "solid", p = f === "dashed" ? `${8 * a},${4 * a}` : f === "dotted" ? `${2 * a},${3 * a}` : void 0, y = Math.max(8, a * 3), u = 4 / o, m = {
    fromNode: r,
    sourceHandle: t.sourceHandle,
    sourceT: t.sourceT,
    sourcePort: t.sourcePort,
    sourceDirection: t.sourceDirection,
    edgeType: t.edgeType,
    attachmentGap: t.attachmentGap
  }, g = n == null ? void 0 : n.get(m.fromNode.type), x = ye(g, m.fromNode), b = m.sourcePort && x ? Ee(
    m.fromNode,
    x,
    m.sourcePort,
    o,
    i,
    g.portAnchor ?? "bbox"
  ) ?? void 0 : void 0, w = m.sourcePort && x ? x.find((xt) => xt.id === m.sourcePort) : void 0, T = m.sourceDirection === "output" ? "input" : m.sourceDirection === "input" ? "output" : null;
  let k = null, M, C = null;
  if (n && m.sourcePort && T && w) {
    const xt = Qs / o;
    let W = 1 / 0;
    for (const R of s) {
      if (R.type === "edge" || R.id === m.fromNode.id) continue;
      const K = n.get(R.type), q = ye(K, R);
      if (!(q != null && q.length)) continue;
      const ut = q.filter((j) => j.direction === T);
      for (const j of ut) {
        if (w.dataType !== "any" && j.dataType !== "any" && w.dataType !== j.dataType)
          continue;
        const $ = Ee(R, q, j.id, o, i, K.portAnchor ?? "bbox");
        if (!$) continue;
        const at = Math.hypot($.x - l, $.y - d);
        at < xt && at < W && (W = at, k = R, C = j.id);
      }
    }
  }
  if (!C) {
    const xt = 50 / o;
    for (const W of s) {
      if (W.type === "edge" || W.id === m.fromNode.id) continue;
      const R = W.h === "auto" ? (i == null ? void 0 : i[W.id]) ?? 100 : W.h, K = W.w * 0.2, q = R * 0.2;
      if (l >= W.x - K && l <= W.x + W.w + K && d >= W.y - q && d <= W.y + R + q) {
        const ut = Fe(W, l, d, i);
        if (Math.hypot(ut.x - l, ut.y - d) < xt) {
          k = W, M = ut.t;
          break;
        }
      }
    }
  }
  const E = k ? n == null ? void 0 : n.get(k.type) : void 0, L = ye(E, k ?? void 0), F = k && C && L ? Ee(
    k,
    L,
    C,
    o,
    i,
    E.portAnchor ?? "bbox"
  ) ?? void 0 : void 0, X = b ? void 0 : m.sourceT, tt = F ? void 0 : M;
  let et;
  if (k)
    et = Pe(
      m.fromNode,
      k,
      m.edgeType || "bezier",
      i,
      m.sourceHandle,
      void 0,
      void 0,
      void 0,
      b,
      F,
      X,
      tt,
      m.attachmentGap
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
    et = Pe(
      m.fromNode,
      xt,
      m.edgeType || "bezier",
      i,
      m.sourceHandle,
      void 0,
      void 0,
      void 0,
      b,
      void 0,
      X,
      void 0,
      m.attachmentGap
    );
  }
  const ft = !b, Ct = !!(k && !F);
  return /* @__PURE__ */ S("g", { children: [
    /* @__PURE__ */ h(
      "path",
      {
        d: et.path,
        stroke: c,
        strokeWidth: a,
        strokeDasharray: p,
        strokeLinecap: "round",
        fill: "none"
      }
    ),
    /* @__PURE__ */ h(
      "path",
      {
        d: wo(et.x2, et.y2, et.arrowAngle, y),
        fill: "none",
        stroke: c,
        strokeWidth: a,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    ft && /* @__PURE__ */ h(
      "circle",
      {
        cx: et.x1,
        cy: et.y1,
        r: u,
        fill: c,
        stroke: "white",
        strokeWidth: 1.5 / o
      }
    ),
    Ct && /* @__PURE__ */ h(
      "circle",
      {
        cx: et.x2,
        cy: et.y2,
        r: u,
        fill: c,
        stroke: "white",
        strokeWidth: 1.5 / o
      }
    )
  ] });
}
function Ky({
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
const ws = 400;
function zy(t, e) {
  return t.h !== "auto" ? t.h : e[t.id] ?? 100;
}
function qy({
  eraser: t,
  engine: e,
  zoom: o
}) {
  var a;
  const [, r] = ot(0);
  St(() => {
    const f = t.trail && t.trail.length > 0, p = t.markedIds && t.markedIds.length > 0;
    if (!f && !p) return;
    let y = 0;
    const u = () => {
      r(performance.now()), y = requestAnimationFrame(u);
    };
    return y = requestAnimationFrame(u), () => cancelAnimationFrame(y);
  }, [t.trail, t.markedIds]);
  const n = Date.now(), s = ((a = t.trail) == null ? void 0 : a.filter((f) => n - f[2] < ws)) ?? [], i = e.measuredHeights, l = 6 / o;
  let d = null;
  if (s.length > 1) {
    const f = [`M${s[0][0]},${s[0][1]}`];
    if (s.length === 2)
      f.push(`L${s[1][0]},${s[1][1]}`);
    else {
      for (let w = 0; w < s.length - 1; w++) {
        const T = (s[w][0] + s[w + 1][0]) / 2, k = (s[w][1] + s[w + 1][1]) / 2;
        f.push(`Q${s[w][0]},${s[w][1]},${T},${k}`);
      }
      const b = s[s.length - 1];
      f.push(`L${b[0]},${b[1]}`);
    }
    const p = f.join(" "), y = (n - s[s.length - 1][2]) / ws, u = (n - s[0][2]) / ws, m = Math.max(0, 0.85 * (1 - y)), g = Math.max(0, 0.85 * (1 - u)), x = (m + g) / 2;
    x > 0 && (d = /* @__PURE__ */ S(Mt, { children: [
      /* @__PURE__ */ h(
        "path",
        {
          d: p,
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
          d: p,
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
    const p = e.getNode(f);
    if (!p || p.type === "edge") continue;
    const y = zy(p, i);
    if (p.w < 1 || y < 1) continue;
    const u = p.rotation ?? 0, m = p.x + p.w / 2, g = p.y + y / 2;
    c.push(
      /* @__PURE__ */ h("g", { transform: u ? `rotate(${u}, ${m}, ${g})` : void 0, children: /* @__PURE__ */ h(
        "rect",
        {
          x: p.x,
          y: p.y,
          width: p.w,
          height: y,
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
  zs as A,
  pr as B,
  Td as C,
  Mo as D,
  Wo as E,
  Ef as F,
  ye as G,
  Qo as H,
  Pf as I,
  vd as J,
  np as K,
  bu as L,
  Lu as M,
  Ud as N,
  ao as O,
  yr as P,
  Tu as Q,
  Zy as R,
  Xy as S,
  Yy as T,
  Jt as U,
  te as V,
  _0 as W,
  Fs as a,
  Ws as b,
  Gu as c,
  jy as d,
  qy as e,
  Ky as f,
  Z0 as g,
  Gy as h,
  lc as i,
  Hp as j,
  Es as k,
  Xu as l,
  bh as m,
  Ht as n,
  mu as o,
  wu as p,
  Au as q,
  Xr as r,
  Hn as s,
  Pn as t,
  En as u,
  Xo as v,
  Nr as w,
  ti as x,
  Mu as y,
  Us as z
};
