var il = Object.defineProperty;
var al = (t, e, o) => e in t ? il(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var yt = (t, e, o) => al(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as ll, defaultBlockSpecs as cl, BlockNoteEditor as dl } from "@blocknote/core";
import { jsxs as k, jsx as u, Fragment as mt } from "react/jsx-runtime";
import hl, { memo as ge, useRef as lt, useState as tt, useEffect as bt, useCallback as it, Component as ul, useMemo as Kt, useLayoutEffect as qr, useContext as jn, createContext as Bi, Suspense as pl, lazy as fl } from "react";
import { useCreateBlockNote as yl } from "@blocknote/react";
import { BlockNoteView as gl } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as je, flushSync as ml } from "react-dom";
const bl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let kt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += bl[o[t] & 63];
  return e;
};
const xl = {
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
}, wl = {
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
}, kl = {
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
}, vl = {
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
}, Sl = {
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
}, Ml = {
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
}, Cl = {
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
}, zl = {
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
}, Il = {
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
}, Tl = {
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
}, Pl = {
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
}, Al = {
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
}, Fi = [
  xl,
  wl,
  kl,
  vl,
  Sl,
  Ml,
  Cl,
  zl,
  Il,
  Tl,
  Pl,
  Al
];
class El {
  constructor() {
    yt(this, "undoStack", []);
    yt(this, "redoStack", []);
    yt(this, "maxSize", 50);
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
const Ni = 4, Rl = 8, Hi = 6, Oi = 6, Ll = 10, Dl = 14, Wl = 24;
function xo(t, e, o, n) {
  if (!t.rotation) return [e, o];
  const r = t.x + t.w / 2, s = t.y + n / 2, i = -t.rotation * Math.PI / 180, l = Math.cos(i), a = Math.sin(i), c = e - r, h = o - s;
  return [r + c * l - h * a, s + c * a + h * l];
}
function Dn(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function Bl(t) {
  return Math.max(0.01, t);
}
function hn(t, e) {
  return t / Bl(e);
}
function Fl(t, e, o, n = 1, r, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, h) => h.z - c.z);
  let l = null, a = null;
  for (const c of i)
    if (c.type === "draw") {
      if (Ur(c, e, o, n))
        return c;
    } else if (c.type === "shape") {
      if (Vn(c, e, o, n)) return c;
      if (!a && c.data.label) {
        const h = c.h === "auto" ? 100 : c.h, [p, d] = xo(c, e, o, h), f = Gi(c, h);
        f && p >= f.lx && p <= f.rx && d >= f.ly && d <= f.ry && (a = c);
      }
    } else if (s && s.has(c.type)) {
      const h = Dn(c, r);
      Xi(c, e, o, n, h) && (l || (l = c));
    } else {
      const h = Dn(c, r), p = hn(Math.max(Ni, Oi), n), [d, f] = xo(c, e, o, h);
      d >= c.x - p && d <= c.x + c.w + p && f >= c.y - p && f <= c.y + h + p && (a || (a = c));
    }
  return a ?? l;
}
function Xi(t, e, o, n, r) {
  const s = r ?? (t.h === "auto" ? 100 : t.h), [i, l] = xo(t, e, o, s), a = n < 0.8 ? Dl : Ll, c = hn(Math.max(Rl, a), n);
  if (t.data.label && i >= t.x && i <= t.x + t.w && l >= t.y - Wl && l <= t.y)
    return !0;
  if (i < t.x - c || i > t.x + t.w + c || l < t.y - c || l > t.y + s + c)
    return !1;
  const p = Math.abs(i - t.x), d = Math.abs(i - (t.x + t.w)), f = Math.abs(l - t.y), g = Math.abs(l - (t.y + s)), y = i >= t.x - c && i <= t.x + t.w + c;
  return l >= t.y - c && l <= t.y + s + c && (p <= c || d <= c) || y && (f <= c || g <= c);
}
function Yi(t, e, o, n, r, s) {
  const i = r - o, l = s - n, a = i * i + l * l;
  if (a === 0) return (t - o) ** 2 + (e - n) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - n) * l) / a)), h = o + c * i, p = n + c * l;
  return (t - h) ** 2 + (e - p) ** 2;
}
function Gi(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const n = o.labelFontSize ?? 14, r = n * 1.3, s = n * 0.55, l = t.w - 12 * 2, a = o.label.split(`
`);
  let c = 0;
  for (const g of a) {
    const y = g.length * s;
    c += Math.max(1, Math.ceil(y / Math.max(l, 1)));
  }
  const h = c * r, p = Math.min(l, Math.max(...a.map((g) => g.length)) * s), d = t.x + t.w / 2, f = t.y + e / 2;
  return {
    lx: d - p / 2 - 4,
    ly: f - h / 2 - 4,
    rx: d + p / 2 + 4,
    ry: f + h / 2 + 4
  };
}
function Vn(t, e, o, n, r) {
  const s = t.h === "auto" ? 100 : t.h, [i, l] = xo(t, e, o, s), a = t.data, c = a.strokeWidth ?? 2, h = hn(Math.max(c / 2, Hi), n), p = !!a.fill || !!r;
  switch (a.shape) {
    case "rect": {
      if (p)
        return i >= t.x - h && i <= t.x + t.w + h && l >= t.y - h && l <= t.y + s + h;
      const d = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), g = Math.abs(l - t.y), y = Math.abs(l - (t.y + s)), m = i >= t.x - h && i <= t.x + t.w + h;
      return l >= t.y - h && l <= t.y + s + h && (d <= h || f <= h) || m && (g <= h || y <= h);
    }
    case "ellipse": {
      const d = t.x + t.w / 2, f = t.y + s / 2, g = t.w / 2, y = s / 2;
      if (g === 0 || y === 0) return !1;
      const m = (i - d) / g, b = (l - f) / y, x = m * m + b * b;
      if (p) {
        const M = ((g + h) / g) ** 2;
        return x <= M;
      }
      const S = h / Math.min(g, y);
      return Math.abs(Math.sqrt(x) - 1) <= S;
    }
    case "diamond": {
      const d = t.x + t.w / 2, f = t.y + s / 2, g = t.w / 2, y = s / 2;
      if (g === 0 || y === 0) return !1;
      const m = Math.abs(i - d) / g, b = Math.abs(l - f) / y, x = m + b;
      if (p) {
        const M = h / Math.min(g, y);
        return x <= 1 + M;
      }
      const S = h / Math.min(g, y);
      return Math.abs(x - 1) <= S;
    }
    case "line":
    case "arrow": {
      const d = a.startPoint ?? [0, 0], f = a.endPoint ?? [t.w, s], g = t.x + d[0], y = t.y + d[1], m = t.x + f[0], b = t.y + f[1];
      return Yi(i, l, g, y, m, b) <= h * h;
    }
    default:
      return i >= t.x - h && i <= t.x + t.w + h && l >= t.y - h && l <= t.y + s + h;
  }
}
function Nl(t, e, o) {
  let n = !1;
  for (let r = 0, s = o.length - 1; r < o.length; s = r++) {
    const i = o[r][0], l = o[r][1], a = o[s][0], c = o[s][1];
    l > e != c > e && t < (a - i) * (e - l) / (c - l) + i && (n = !n);
  }
  return n;
}
function Ur(t, e, o, n) {
  const r = t.data.strokeWidth, s = hn(Math.max(r / 2, Hi), n), i = s * s, l = t.h === "auto" ? 100 : t.h, [a, c] = xo(t, e, o, l);
  if (a < t.x - s || a > t.x + t.w + s || c < t.y - s || c > t.y + l + s)
    return !1;
  const h = t.data.points;
  if (!h || h.length === 0) return !1;
  const p = a - t.x, d = c - t.y;
  if (h.length === 1) {
    const f = p - h[0][0], g = d - h[0][1];
    return f * f + g * g <= i;
  }
  if (t.data.fill && h.length >= 3 && Nl(p, d, h))
    return !0;
  for (let f = 0; f < h.length - 1; f++)
    if (Yi(p, d, h[f][0], h[f][1], h[f + 1][0], h[f + 1][1]) <= i)
      return !0;
  return !1;
}
function Hl(t, e, o, n = 1, r, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, h) => h.z - c.z), l = [], a = [];
  for (const c of i)
    if (c.type === "draw")
      Ur(c, e, o, n) && l.push(c);
    else if (c.type === "shape") {
      if (Vn(c, e, o, n))
        l.push(c);
      else if (c.data.label) {
        const h = c.h === "auto" ? 100 : c.h, [p, d] = xo(c, e, o, h), f = Gi(c, h);
        f && p >= f.lx && p <= f.rx && d >= f.ly && d <= f.ry && a.push(c);
      }
    } else if (s && s.has(c.type)) {
      const h = Dn(c, r);
      Xi(c, e, o, n, h) && a.push(c);
    } else {
      const h = Dn(c, r), p = hn(Math.max(Ni, Oi), n), [d, f] = xo(c, e, o, h);
      d >= c.x - p && d <= c.x + c.w + p && f >= c.y - p && f <= c.y + h + p && a.push(c);
    }
  return [...l, ...a];
}
function kn(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, n = t.y + e / 2, r = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, l = Math.abs(Math.cos(i)), a = Math.abs(Math.sin(i)), c = r * l + s * a, h = r * a + s * l;
  return {
    x: o - c,
    y: n - h,
    w: c * 2,
    h: h * 2
  };
}
const Le = class Le {
  constructor(e, o = 0, n) {
    // Increased depth for potentially large boards
    yt(this, "level");
    yt(this, "bounds");
    yt(this, "objects");
    yt(this, "nodes");
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    yt(this, "heightMap");
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
    this.nodes[0] = new Le({ x: n + e, y: r, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new Le({ x: n, y: r, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new Le({ x: n, y: r + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new Le({ x: n + e, y: r + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const r = kn(e, n);
    if (this.nodes.length) {
      const s = this.getIndex(r);
      if (s !== -1) {
        this.nodes[s].insert(e, n);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > Le.MAX_OBJECTS && this.level < Le.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], l = this.resolveH(i), a = kn(i, l), c = this.getIndex(a);
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
      const n = this.resolveH(e), r = this.getIndex(kn(e, n));
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
      const s = this.resolveH(r), i = kn(r, s);
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
yt(Le, "MAX_OBJECTS", 10), // Max depth of the tree
yt(Le, "MAX_LEVELS", 8);
let Pr = Le;
function Oo(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function Yo(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function Ol(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function Xl(t, e, o, n) {
  const r = e > 0 ? 0.95 : 1.05, s = Oo(t.zoom * r, 0.1, 5), i = Yo(t, o, n);
  return {
    x: o - i.x * s,
    y: n - i.y * s,
    zoom: s
  };
}
function Yl(t, e, o, n) {
  const r = Oo(t.zoom * e, 0.1, 5), s = Yo(t, o, n);
  return {
    x: o - s.x * r,
    y: n - s.y * r,
    zoom: r
  };
}
const Zr = ll.create({
  blockSpecs: {
    ...cl
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let lr = null;
function Qr() {
  return lr || (lr = dl.create({ schema: Zr })), lr;
}
async function Gl(t) {
  return await Qr().blocksToMarkdownLossy(t);
}
async function Jr(t) {
  return await Qr().tryParseMarkdownToBlocks(t);
}
function ji(t) {
  return Qr().tryParseHTMLToBlocks(t);
}
function jl(t, e, o) {
  const [n, r] = t, [s, i] = e, [l, a] = o, c = l - s, h = a - i, p = c * c + h * h;
  if (p === 0)
    return (n - s) ** 2 + (r - i) ** 2;
  let d = ((n - s) * c + (r - i) * h) / p;
  d = Math.max(0, Math.min(1, d));
  const f = s + d * c, g = i + d * h;
  return (n - f) ** 2 + (r - g) ** 2;
}
function Ar(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, n = 0;
  const r = t[0], s = t[t.length - 1];
  for (let a = 1; a < t.length - 1; a++) {
    const c = jl(t[a], r, s);
    c > o && (o = c, n = a);
  }
  if (o <= e)
    return [r, s];
  const i = Ar(t.slice(0, n + 1), e), l = Ar(t.slice(n), e);
  return [...i.slice(0, -1), ...l];
}
async function Vl(t, e) {
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
    const g = d.data.blocks.length > 0 ? await Gl(d.data.blocks) : "";
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
    const y = Ar([...d.data.points], 1).map(
      ([m, b, x]) => `${(m + d.x).toFixed(1)},${(b + d.y).toFixed(1)},${x.toFixed(2)}`
    ).join(" ");
    o.push(y), o.push("");
  }
  const l = t.filter((d) => d.type === "shape");
  for (const d of l) {
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
  const a = t.filter((d) => d.type === "text");
  for (const d of a) {
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
  const h = t.filter((d) => d.type === "edge");
  for (const d of h) {
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
const Vi = "data:font/woff2;base64,d09GMgABAAAAAMxIAA8AAAAC7dgAAMvmAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGoNAG4GOSByFAgZgAIgKEQgKiYBshtchC5IoAAE2AiQDkiQEIAXzAQegB1veTnIjbLdbehFQ3gC47dfXFsVcELftCZam59bDSCQlLWHbtB4C3QGiXtrfl/3//2cnlSGzDSwpgJ2bql7d/x9TQiFTowtFdwpj9GGzW++z007NWri0WGcTyTgrkbRte+ZmE5LFyWoXu652KxrVJmbBjm84B2zLuzuCh1LPfXV9eV9A1jU0Rne9+oXFL5CuvzOzpZv1BmbxeTE7i+9ELDk9i1ZAHKr9wce3oxeFRPjjf+nfjnV4wMf6ChCHkFiyA9VNFPaH/okkgU/9ZWBsjLR+RHTUrhNPVHyH5+fW+/9vf1F/UWzANsaoGNEumtrG6JIQWrAABRXjCCvAqDPrjOjz1LP6jDq9UwPZdWvlxQXhQf4p1vjP07dnN4AKETSDC7utbwMKWFgCFRVWBPzGltsPV5qmUuYUkYN/nr4O9nb/WeBBGCQUWOMJ5xElnHAgCWTd/7q0VP/Zo2j/3vZ7sjPrzNwVNtgmweBwZI5TgADFIDGSMCHVdNtvUXT7+g0ACGnOXB6bkRFifrpTqAQAS6z3/sU5rb9w6sqO0/KAwcwTSEtUKozH4fLzw+g5HF04nNtko+fx9m6fdRRRwNEoEIion35b//dFK9bAeGZQRxywdpF21yi2sLZgW29wq335lZ89Ma9brm5hJUl+A1Q8kXJ1q44ncIHz+eCWvfl8mckkk0wyySSTJL9a+9y1sxX3geCAobvfAW3FETsd4YGEBRoIqEBrIAtQmecTIxqcW1uOVzMYnBd62ynCxhguT54KwaERHAAown/92tvVif3wJggyyqOTpyIT213THaRFdMsK39Suz6dTcy/b3etmKHFgTrfMzbA4UQmWrdtf/1+lO0cmUIkcmuOUSJX+L1UrYI/E2z0xKHSWLbmtnuwwKdjjTYEkJiRNDNc5VV2rrr/qAyiQVCgAJEFJbotBwanblOTUuYDakOYrnX3d167dW3VVt1oBUGgFgoOEMJrBEwgOMz92mLF/YkOKcDVXSSgTlFqBYCMQIEAOBNvgXF31w2nfff8vp1XV21vV29sHQcOCbDXM3IDOe7it29udJQ9lAcC+OldBSTIERJaceCDUQIMYWFyzoyQtj4weCzUh/4XKMZi2UpSTkiIe7Ty2b+F7iJQWkP6fzbRdnS+MFWDpovVLB02Tplt9SQezBt2Y9kYGaWVco0Z3gdmEBSboQlwx7KxlmD3TbnBl3AvqgjpXAaYuTWmsnKJLmTJlyjyXvsppsW2Tmv236fdiy79g/1T+EUkHJDRB5MwdH1lHV4NXlrU4peH6rj3z5Fd2UVphvAGUAAYC83ked3GLst4i+s5trS3LQj21SxAmweTvl6ZU73527tZV33UFXda18IpSOkAJIdLblq93f+RIbtJaI5emyFVKlzNzX9qbk5TW5YNpsMEg61wrS+mElA5LAyQBrAJiwwSQBNEQmgkE4TQAx6+W32zICovF6BTL48zO6+7p/X8v5CxUz+zlpCArhdMI4fdOnUWCVctlOVKUOEth5cBtE3WISjfFBvIs+Y2T7/+3H62iFjeSKU2l1d1ZFUffe7PyB3XLJEnBpHEIjZTuIJagbSREiPRGiIRKxH9+v1KdpAQ2skBGVy1MKlRthScgBQDvvxf4f/Het/QnwK5AqAgVkw4RuN0t4LkzRfe3QKq2LnWVrCJkhawxFXLlyrQqrZpJ2SGpxMgavYUAp81+m9wzLQ4n8ljVtfIzZcyhxlLI1oFDIiT+sUikQGK2V78sCMnuaEizO8HE767/9Z2I5cuB5P/XspQSymFCF4zxhKcJo9MHEUoIxoSYVqrec2ty2rl0YXE4rBl6wowoil6XxzcxZ4ltSamPV3LFLCYsRhhjhBDDMGfuZz/Na2vS7uS++rVGBl6iIoK8xxAHs7csV53Mmj1eokCBQOszpQIJsgv/8L+pdWZOVDBPIGWi/+MeXtkNAAD9Pgb+/pwNAgCAB4/zlQAAHr6uY0BgdAC6NDNnDlgcJiYcuVgQnVyQBg1w2vWBDJgLssBa7NHvldHWOtEeAIAgEBFAKFBoCDcMZrc5Wd6HHE0Y6RRqyFCnDw10aDKEVmNo8z1MQocebJiCDzOpYRY7zJOGIUVYrgor9WG9NWy2DVsdwg6nsNs97PcOh2jhOCNcIsNVbrjOD7ck4Z4i3FeHR9rwRB/eWeGjHT6L8AMjXRMMIwAKhVEARYaFoHzzBRVUMLiQQsCFFg1KkwaSLj0kY0YQHABgAEA/4O8AFXF6m3FMKhgy5kkBUrejpFeokcWSlVgB96jHBClxesGkW+L9Es1PJOqVzEpiQR4Gfv0oak7nNPKKF2lJON+4OBG/6qSTkjCqiBKs2l4MiEjIKLQfCAQNHQNGxleYOAZJ0uQpU6vFeD1mmmcZGBGs14Wv5HHo+EagN3Tz690q/7DlbZ6y1W3vUfn+Le/wg63u+KzKK7Z80LN3f9hzCb7gI36GwkCPuiYAbseHgDZ79JNikLBoIR6HEzlvgSCck1Q8UcywfQwI64wARHy+Bhnh7fBIKFi4RoD30u1Fs9kXeBjwK40ZfZtfHkb/y2Ir4PGaZo49YoN6+CXYFr1AaN0mq0eBVwgyBAWEAcYEY8GJA8n7gxLnDMk1yW0r0MCjDb6QDz61Uh4FG2AcECGYGMINTA6lAAsGCwELh6NLAgMjMhMGCxI7MgeyNFTZaIoRVYC1JV27DqjOhE3XBzaQsAUWIliaBEOGkS3HsAHZVmR7ofZDHYA6iOAQ2GFkR8COgR1HdgLsNLKzyC5juIrhBtgtsNtgfyG7A3a3kweJHIAHD8BDAOAhATBJZICMpyqhPJE8Z3nhiiJkIqWiZGJUFSuvWFGlVLWiOqkmeS1SHWXWu5mMUtPd9EPZgMxsmWXyVkitVfR7+e5oOxTtU3RA6rDUEXnHpM6XGnCUKLnJG24Iq3HzYPLssS6LxvgbO7oVDZ/UyHw2wqMGDIALNgAcYgByxNjESTCJU2Eqp8E0TofpnAEzUMMMz/ArKIUZA7nIFLIxC1iIo2hJMbI0E4tvn6dQQ50SpWMfY7QJ8l33ApeWYj3n/c6H3gY0j1HBXjBwqqHWOEohTvsKvv73Uv5dYV/jJhF3UcBiqREtSsudGxBtkec5NPy5uLsSDhiAo3iQD5DZ+kGa+7fo8VsIw2ZEHDEjxrVFj6ILfqDJ3bCkDONngWdg6a7WolcKoVALtLI3CjqnKwBiFzsZxeweq0rX8PeW3H7EmSPl89fauU64K+VvmsUsw+oPXDwxQRsj3JIqSTeV3EV2FWspZ8tOMtmbRjS5oedzkVIvDkY7DZrC54vys6eklUQehmYSVcIShG5GDqWD3myH8LAdxY4yiWGLPblWbrGNdN5dWaXRg6KyvmMfD1ybTYsxHOQh0mQKTGtFtOlSq3tjcYCCYNti7W56cwsxtKX43PvV760UHrzz9Z/p4csOzRG4/ViV8SOcOaF4OVa7d2bR/PqBrVu+/aKbi/u93aL23onFw++y/WyAvg5AWmGaaLzTXvwrj8NnV3jsitWg7+Nxa1wd3U9tHd59uth+jci8Iiotfq4UP0B3pj0jZbgm/jApknPYxA6JsBrVsW6RNS8kyVGyBc6BssRAGCznHcIoo8/z9To0jHicskzkmmsLFY4vq7q9C0RS66rCFoqgnQYS6LpgAhqL3HktBzMEwqFxIrXOBsLAoNXt/IoEuCC4Zp8KA461CbB4qCSdXAYosjQQPAC8UV0YD2hyzJIzFHBFBvOai2JNbCvdeqQHAi7iuxiQ9sAoKWXpMkasLOWJz2SpzkivZXBXa+Q6qtSUz0Mi9ZrVebI5YSofjRIKeSo1RTLF23KD3CUPmJxyEiDm9u1Eg51TajpDT73CEhURJUYgwetcg5bLXJd+2jvUpkyXXCXKXHgUyzf1XlGDdIXEpyvoXe1WU4B1hypMRMQCW0ieEKvL1BK6vqhkSNaz9lakengG8dnmiGyxViq3b1Nu4GS/8c0vqE5y75JC+sk0r3sYU34QPQEcDWx3jL9UwQa0K3koRPaSByLWFOhtVn1Ui0a6nlPwgMqnRmzC2IsWolUYQIiCTzPNsCPArIGMWvenZzyW/gQzifrVZcXL1mm62TodYxx4wn9eAQbijsuaO3vCqFExEQdkl5idjQo/8rvs9+VogWxcwbUBwArBqI3aR6rOLEBIIw6mM96jHQnKAyRUoYiozp2JAj7l9Opo8ZTby+eO1gDuO5oEMc0Bo2CbqDhS7NiXywiLgQIpoWcvL8KJGPvHzh6QVws3vtnTTcX5zNaEOLWbe8R9iIfuEwJCbVH/OC3KlJimf+oU2SmeilMA51CgLyPj29MEnXrtEsc0wrXWuluGB+o3YkYe5blD4m5JUBp2w7iO3m3LcV73x/P9+f7+LSpKtBixdPSMTMwSJEpml8IhVaYs2XIUqtCgQ6cuE03Srdc0080w02/6DBg0y2xzzDXP/ErnxIsstsRSsYxPd4WVVlltjbXWWW+DjTbZ3MyR32OfP/DP3yFHHHPCKaedcdY5511w0SWXXXHVNdc98sQzL7zy2htv/eOdDz765LOvvvnhPz9ZA2ggHISHUIgAESESRIYoEBWiQXSIAWEyckQYoApKyipUVXVNW7bpWgwWR9uOXR1dfUN3vvgqV+IqNeFE6mmGNTgb3fuORKExWByZSmdzuDy+QK5QqtQavcFottrZOzg5u7h7+1KoNDoDRjGcZHO4fIFQodJodXqL3eGy3LaH+4RfSvjPAByMwDgYD6MwASbCJJgK02A6zICxWLHjxI0XP0HCnBIVmLKQQovMCBLIE8yACkaG4QEAcgsA0CQ2FmQbACBwvhlbRrRURsNPZ5IdquQLXQALWCENcqAIKqAWmka1S2fUG00PDTw9fP0/MLeRvknXwNrZO2DzxI7Voi5e8t+qf2JBRIgOcRCMZotlxyCxE5ejWx/liZtkE0/iYMlMvlRttHX29Ac4L/GpDDZP4pfW/BkOAPiqAMDXBuDrJE6WZ/6FFJUqQwnZyyivkkYC8GtraWxdTWlms1rQUKtaD8AfBuBPdqBjnelSN7oDwD8B4F8B8B/61PcFyOUIFWGtYF0A5FbrvYGgKQEANCX7xXPVPuHhAA+vgzFHOtXFnfYt6w1XN72/N+Hc/RaZsL3Pw/dhOBGIxO55qBUnvaLHqGrLqdebDaspzUNC1P4zgRbFMlcKTuYdAB9oBY0E3tskFs0NdfNd5xe2gYfXQlHAopiEJCpIk6G74DQAiPbWKZ70/mviOptUo0YloV9hwjwRgEUwT+ZJIrgy90U5GTFz7DwcRqE9hjFARHXSWDtv7HO+4t+bXJVYsrtM/wBay1dEkeMAAOXmWZpIOhWd8pyIo146MPXJEJUs4SRNirKyKMd41KpZPWvEBmib+e7Z85j984eZxZgu2Vfh1vw5twd4QE+MK8ra58l/zH/z//x8JgqTYYph/aYyLWYmt20EuU+cBq93LkwMDZMkDlkKlKnWYLTxJunVZ45FoHo0Tua8UGxjJs6B8FbkSC7C+Wd+cfHbhvkm0EWsEgwrnVgMB/RJHDktKVttnh1zYC7N9bknDcqCYrgyrAUQSKk+AChnkhSZkoZiKiIWwe7C45uBerX2kukK0m3/PBHnwNzLNyid4fC0zNSCVOA2n66Pjbbb65ATzrnilnseA8aeAQCYu90/IAAQRZfe7qNs9/cBYDFgYwE+Dp+Fz8Hn4avwNfgO/Ah+Ab+L/8XoHwIwrAWNySAZnd3it+rlowGaZlRsCvUbMLsYf7Aqk4kC/Rx76nRlo93SEDTbWbqtemYf0IaVjT8YKNZ7ZYUVKdtItnAvOHShBbrnLhuCXKBAjgqtCHdmGb/t9HHqJQT/5xRmffCZrMmZ3Mn7uBOFkige0hUzUmTNgHAyrdM27TNmxs64GT8TpmMmtWKKoVkfd39dF8zCWTSLZ4lF8Wpp0ECkdtRWEgq+gkWII5pKazrse7hA8caFANmMPJNyrMTxSaTCWv2LL56yGTl102YaXMEFfNMw9JaE9rYrxcmCFwie/KkLvnHtezHu6Nd+wv+3+3O+H2DcCOj0E4jEEqlMridElARpchSpUKdFl/5CRUuULlexSvVadcsUlaNIhTotuuQqmx9//Tc6ubh5ePn4GzNjyYY9J648ePNjYNysZZv2nbr26N2vwdyeE1cevPlxmJkhb0Jicmp6ZnZuoBDhosRKkCxNphz5AocMHzV2wuRpM+fMHxyZIFmaTDnyJUFC4LwgyYqq6T4RKQU1HSMLOxcv/6LSiuq6xpb2rt6aUh0jCzsXL11cMeRQUjTDcnwYhsTgSVQGmweAY8lMvlRttHvBcJ5EZbB5hNkXO0vfhsbm1vbO7t5CJcpVqdWgWZtOPfoVLlm+au2Gzdt27tm/uLJBszadevRrAgDHD4BgBMVwHggUAhoOEQUdCxd/UGhEdFxiSnpWbkwoDhEFHQsXTs327Lv/cGllbWNrZ3/YmEkz5i1Z9dmwbc/A8LGTZ85funrj9r2D8XlLVm3Ytmcx3jzuvXDx8tXrN2/fPeiI404564LLrrnpjvsOPvL4U8++8PJrb77z/sMnSC5YtmbTjn3LEGg9iOIkzfJeSFRCWk5RRV1LV//Q6MT03OLK+tbuzGhOUUVdS1dewVqqx2nZjuv5Y5lSozdZHW6fIJ4tN/vT9fH+DeJ5m1Q1tPWMBH4ycAwyA2PwGGKGjOHJ8GeEMKIYKoaBkcCwMzIYeYwSxkhGHaOFMZbRxZjCmMmYxVjAGGKsYqxnbGXsZhxgHGOcwZ4iBLwHANajgJDF5+Lho9e9ugY3QDGA+lhfbf89peAfeBYsvRJ17FS2NxsHz1UxBaiJmj481bC+2NTGU3HLnJr5wZPBr2gQ8fbGPK1hAU0CkBb1WQP+BWCySpz3s7ctrj8kbpaNAKFRJCZEwQ7TkqCeUwTUI1EsQSboFJCBEFC/iL4T3Qqb1ORPaL1UZSCPX/sd4tYyluTf/aKWQK7opxrqGeV+pcu6VKrqE7z2zcPxlfuxNFWp09ZFL6Tc/mCest9za3/WVuTNeJ/roONj2unZQHi+vxcO7JX9OEUt3lN45E5Onni59fMSFNz+YBG33eHZ3pFzG7vd5/TcmWe3W8e0m6yPHK67Gw4akGVJ2JhdzYY0Vfs+IQTbx9mZmXPL9YznOwKpw27lkwOAiXk62vVqzYKwtTaJACTU3ks+WHddimtIUIBHSmDSdLaqRzZOOrAK4mCzE72U3qurdleVNByO55n+WTBmNKr9lvdxd2CSsh/IVAtgIF6rUMp4cFqqTkptDLnzyXnOPIoroxr4QSksqD3ttEJDdN2eQL46EIzFI2ABnK2sD/tqk9fgBbWvEfgy4n6KPClfbLCLeGSa2k5LRiifIPWLDtlWGxcjDZuMD7kVuD2AWXrXSKx/UpL8jP+UlSTWHHEfUEQJSiUwlNqjXCBhm7N0uu814F/tdVxJZ1Ba2e6/5pWTINMNDxdDZ9o6pEv7kv1QmASBCs5RZInKWNfLUgqzGIhA8/Bikw+jnwxngJzOhLMQFs9srJCVsxrYmXe2P65gF0uflpXQPyeif1O/HskY+23z9P35bhvphjseeu6tTzaWAGAcgGAExXAeCBQCGg4RBR0LF39QaER0XGJKelZuTCgOEQUdCxdOZbYHw0SYDnNyOmX4669vwUUUly5L1tLKqaiKamuqvY56mt5A81rSita1uZ3t70inutC1bne/p73uQ9/6uTiEjGDLW/HK1nP9N2SjVrWGTTg8KumP32s+2k4H2TzgXj6ISGuaeIxedaROx8yVAEKb8K4igXAeykewo/lNeKfzL/LbtGoiY2Sr8WSPzMd1KBDJHc9RvLKVQZ1DQcnp2I7qYNFjQS1KZT5M2IxBoNFoC8SX77lwgZyTESfCCX8WfHJUggSEPFGGDMvbTSh0mQo77T2xwKA5nN/cpaSWWcvDepsF2GanEHsdFOGc6+I89IrJG2/YLevTTYnreMtsWFFKj0eN2uenXkd9XKVo18usqXpg79U7ut13o4rt9rcAjaDeOg2dmMKBK95g+0RVblLjWplJYBWdgN2inLi6ztO3cMwi4QJSdAl137eN0gdD5+UP5JCfN0G0SxqwnusQT2WZh3EEaBwosz8oDTOCI5LjOE1G4KUTqkNGJJr2GJN4lwQwp1KRD34Qq26FYpzU4Dvi7yS/cRlv/hM3caKLLErMkbthknbdAmxRy3lLaA9pIP4Q6Ff1Eyt30oK86OwrFG2UsvNQ9hZJyCUnUT6vbuFOw66QIwPBLSCfmNSmXrpiNyo2wBBSxpOlWa2SFWsyN7WwSpNTue+RKRHmszD44hcs5V2hXAQDNBl2Ngk0YIIkcEAWFIwqA0C1bDirdi+PL2z1YmrBDg+88ub8RRjl3dUs96/QYab5Mwh3GcRzQ898xhrxFtA3J+DICXiQRz48XSV7chTcIt7PiA7VkiR0PxwCfeXLakYUr1RFS3wdCy6OeI0uJYm7HGsNMQDxFjCE4QAm+OSEBLxKeVwo+F/Bc1MTqwwFKdIeIdPmWq3WwbZuge10G7nz0+KSQd3AIeM23YGGZIAtiIbovTSTcm8+AIRdxO1xEz0xEztxoZmGO7wRjpMgs8+iYJELkHw9EjSwgHrie3uyjxq1dosuQ0BwJIs/ke4FOR2YWm/EQPjywexZCIdHOS5fCDsmBwjKofOaD7lYJHEosW/4pf1rc7D4rlGp6WmFTl8umI4dLsf0wSPWWwYA4l9pAD0b9/1unHsI/MeHARanrLvtQnKI5L8w0nLRC/y2TMvNgKWQgi7h+BJEnvaTxLclAGaO83czbh4DIIMKnsB4v9tid8LHPONnYH7ZWXj7O9ndxSFUxHPHb+9O38Ed3jV7cW8e+Ufx0Xz0H38eL45/btJdfpQoJIGSKMn6hieVSf1lrB/wLwGQGLLBdnsTOQkzMP8lQPVPdKslTigAkyaeubN3+a47GYB7/tFw9B23jofH25t0lB8k7AtEMnaY+QMq2V/g13Wpw68Ue7RLKxQtNxF5BcewimaAn5f//+x1O+2yCP+9pPu6pQMB+P/0aGCrAODBr/ZgPPDg8MD9IwAAAkAaAEYaL3YOmQCao7bpVUAUKT4PykuVzVyuQqWR6l5JvQaNSZrksQLQ08c+KZFhCgAAtNpgO6jtrGtnfBfg6pm8FIBvEeCWpbfKPUU+YbrT9WPr0Mjgf9QYOjcgYbjr8E8nqfpFX7W0a3HuyMbBxcM/JwIi6XzW6tmlZNzIG6C3ePPh2wYtA4c7Cxn6ijOCipqGti1aGgbfIr45WiRJzsrWIk1pn1tuo3R5rjz5ChRuG6UTdJpo2if64RdaYJElFltq2HLLWqKHrrZK/M58vY173mS7bXbYWZla4WaAb6nefNXX14+p/JOldAAAowBZQ6AMvisAvRVY6/iHO9FWbYro0H1QWYdqrgKi3Ti/hQSRhUUp8XZYWwCwJwEAfIc88xKRyz8BoKEuSfMw1iRjdOsy2RRT9TR+fxaA6WaZLf/mVdRjVBPt6EavMaYxjAYA0CmZX4YfD/ob3DsA3EOBI08Bf79/9NUFpwqHz+T9NAJ6nIO9I7F27+GHyHrHuGooMArnR0llwAj0yDlcuiPLfCWepzjqdDF8Dlo8hVI7JM9q4AoEFW7jESJ5L9B8s7sE3Tqow1VFx2G9GNcj9/jaSufSOopD6CS1pa+rYd2w8FEuo8twh9BTn1yMZe9xMRjz8jkOQUGcx1Si8RWC4V6XNXGKBeyho6eaekk7UloJP4R62HR9GafLCmEQKqgvuEVHkFiUdWkinL5sYN15RzR30rVUTvjh6yffCWZGShjpfF5vLUb1YlZVcOsqXL/dko/auGgghGpZq4K7ffQoF4kTKTf1i5vF2To+jbqPV4X6brltvzs9DnsfVpNnQe3GNKmNNOz2hDo6v/CJLKlzde5DsZFqZdzR7ezw+DaYXdpLG+V6ib+4jEByUsMqfbs7btBM6RtZSgw4OxcqUkl0m14379Xz3qS7lY1EGoksEnkkOpEIJBJx8tfU0w3dsA3fAIlpzGIeAwlrK6dQp4U6K9R5oT49hoDcSOleSEMW8hDIhLXFwEbURsxG3EaOjYDYCCeXYnZBdYHpAtcFILpAKCkTToAsBd+hVcyqmFexU8VAqrgC1BSRRS1mcQtIwGb54L8Ul20k3yRYEiC+RHtT5rIpd/kUXJgqruIXlR4WwtpM2MiyTlsBRP8CH5sqiuGMX/AzuICnR+1CW3Of40cPYoc4sUzkGAj8CEYM8sFpYZfwKVd5pM21LlNZV1O1LlZxV1CFB+MV89lK87WV4it7pUJdlqu43RygjUUZlKniP/kWsu+Yy95prvZOcZVTNmKnfMRfX58qIyXeHCu3+Me3oWM5oWzJIVgQ4qSFkyHKWCjzfP2BH/MJD/gEyDM2Y89gBs+UmbL8laWWTMxKadYzRcROtZF2rN1qKnAFACdLDspQxh0ZAAhOooyiVUq1LJHzAJEowAbWEEOhDn040OU8fOtuprV5tsa4FEf7VKdWEnemu1teHveb8O0qiIH0gRA945EJ0UkjX57Krkk0K+ENJjrN6Z4+bAWZXI8kqkliNLa/G58NPtWBNIBkcqRBBuTT1WxDN0DetNj5aRwDOT1P32YuIubTNhxGYsrJbyn5m18OfR+is8frfvvpcXsZOBo/fOGlSka2Kh5kD7KmjfRiCiRnN11Hd16rBaY98KFYa6TcnaDxTer2wJ7cKBkifVv8dtbL176m37bUHxw2HRHZ+SOpO4nDxAOTtWgAh3viUaIg5uG79OfzcW9bFVTsyy35ex2FYoj8s39tOZA/0GP6gR2zD0COgUxoQLcbJahTkGileaZls9m8lPmDD8pPCe3ZOLWSSuK+B8KcnxP5XD04ZYyU1fKhjXSBVLEV5OsT5ducw1wAXC6nDwYPPczJfGOkZ89iErmo5CaW567y7DjK8vaNyIstvO5f5yK31QzPxMQvpGDAFIhmPOcSOpULJwiE44D0gfAk1IticdJ07uw4qq2iPsOU8pFizC1zVI6w00co1VgSAH77qY/+i40vIMY+q/BUsHNlZTqSRi6O4nE9p8tAP743TDJ1DVWTISnhGdA6S6cRuXLL95INKzjqp+uuYmWld3Pfg8sx97BqdTAVholIKZZjzWReqG76QGNoOtR9EeeNBKoh+dN0UxrF3DnQAQqJEC4MdiKHXgW0IZDJPNSIMsXEOb5RiQkMfDKdUkMy3DAtmWNybUNVHel6tGLGrg09tMWtSXwZmULzGXsiFaIpVC1sGVva8SwEZFssoiIVQhCtpNMxkW6Jrk6qIUISoLKvGmagfd23aN5otths+lzpsTh5DABB5EuFnq8v2/zL10qhKMJ4P8PvYdn6WAbMyGEDxVDjlpcUvX50DG+Yws3JLeE/+iDF5Gri+ciVYOAVSAag3dEQdbiV+XktmVlZdpcrnzWna3Y/U6LJdhp4IdA2WFP22NgBM10ZIIQ7JALRu6mhO2IsXmyKN2DX9JKi6KkScm1Eth9wNXuBaO0F2STdntidf55Sd5exT/GkukBxgG8lQ8loI+s727PpUzk49ltn1mtRIq9rfeA6rWAbP7nrBJEugHTzpqiG4jRaygXo5Go13l/jfXefBVbBLRMw+o6kCv0fstnspW9SBbYBMoEJzRprylCez5nuaCdSRlTOCsYEg/Q5+tB6S1h85EBSTeBf8aav3kNTaBpeDJ9lG+ECd4sXwOqxdCMNLenN9b5Q9plRSkSRqZXS9uRGLq1XevbBtq8XRovJsDmXTYrcXUf9+UradKMe8gRieS8NSDRUFMaZJJaIfkPxLX/CyVXvZO60ICx4XpnoIoUDKbCUR++uOYdBePQyC1yWyKXlS1LgoygIoDJ00+XqiCf1Zznjz9U93hDrZDE5W6qGKL5Pd6XAc4HRWCf7vSGPUsa4ks0Z8zFhLuMcSBQpgwFxmozl39oJPOqPA0Os7iPQjLgQxW7xIpbEBNQOqQKd/Z4OpJ4ezhPnSZENMZzo6xCWyv7vvrYHMDGf8bKnXM1GQgJl+yRoNNGC7aW3MTbk5ptU37ZeUyzwpbW4XgB8C/TjD4xmtPHMmQd0au+1wChcg7RjqEi++WGeIZaWKQ8P/Z3H1eSlT5+4+xiZivkVrfm0/CIrtL6+0AyDWtd7DQ/ZHO+hj/32rcs7zydZZT+vrcBUdRxEOhPQh87e7QeX988DhUQvJc25dSHY/tIKjggsohPbn7ySRJB1FGuHVFrtwt15Rmvne4F5CfOe+hkzscUi0DulR8efiqxFEUVlHxlT1GsjFXhndS+i4njRFZPd04NXG1LQrj+sEJjEJt+K42R3am1qJtSoXo88rku9y/VK2ZK5KB3NZY9F/Dw2kMyCaYD0sCpCNZEKxKiWN7TmeF3XA7ZQvU62YQkJ4G0pkAYu0oYLDFaCjAi5JkQSbK1O0XRSCn6Top0OF4V4tPt0ctGKrJ/QqWGtq6M6OhYYGHr3zRW6HLNCVKHYxQhi7q8VgeJrs1BStIhPwxuaniNnczcDoL0AkmPiLH4+znfv7z65azsNmbC0N/aoxzozZxG89J9PipQRl6cdnyFD+/0XZ0D64PiNzQtGG7weV3GbuaqUNuUhpSQIVr20xDNxd16/Rm8P79xc1efoGNOen5jL/ieQ8aE2pgojAgP3I9g98LnpN643bFG0ISBSs+px/5EU3NGaYdIQR/MscGa9PYblCZUSlX27jd34KK7iaqNAfmw5LU4eXxBtz1BVhJ4YLtr1FSPFfGQuqyRzUUOyWUL1OQeNWyQVYmKLno/vcKQAYjXlhYKgEuRBMNCHbpc5/PcnYD84zvOczr6ODlnikTNnduh1kZ0IZIeMOFzBWuoWMqxWssuyVu6rnAA+bBYsm3THo3odLxkUFkBBYN2STd5OIJALCgCZFZPtUfSS5A3mXUztuC5tcU4kwsR2kpIRr06AtJ+qfJfx2JQnAfTMoxRfIdZAIvkR3Tfax0NR6yG/5yLYb+/6mUtkghruamAFJhDeCG93hH0sd4KBydKN02v5N9c4i6/dvCn8R1IVKu8GVuX5nuDJ5PxlPf7NSsqfQl67NcdtsM+Rgb4pN4hFuJFCe59gxd7xz0/Owuwtks0oTVPH9WzxdVewOMCJLDJLqD7+TIJwBbVZl7Uylb0XCXwDUPmpwmySVlT76veuEUvKtrNgEWor6PveZMMKns4zo5S3E6XtzC7rDJ8a2yYDcfvRfmBMh4J2ne/DmLopwyfvYrYrMurKtkzEFwUXDS38gN0ohZGgIWN+HB58VLXFUyAD8vOUERbVJDp+kPXdHQWxFHwlyMEUgo3fMiRH67JM1CGF2pj4tEBUgaN7AFeQ8d0x/5EbQ7a185ZLVyhXG7xhNWHVwNbqCed/sNQQRRJgIpTU5ryYGIA/4N3qqKq4seK2XSBwRCCkBsxgFKW1hrbVDGjmb7yuQSllHsSrFfbo1cCU5lX5cDGZ2Ge2HSpoi2iQxOKwGLhNNIOs/kG9t3JLSc9pgEXBFgkszjDGqwWfu8SJsUfHz6TgDUanjqk7J92exK56vMoe5jmThSzEt7yJEHZSMNYdilwjYp28DpZguGAhciYs5UwUC9Bfm+rRKIL1I700Edd2fasRyc30jDdd5pYtrtdLu+lQQGItEYv/etEtCpCpTe2tsoK5JtEbN3wL7DPyJ7v0ZKqUihBDWyq4iIYSgdVWigDqsHT4PjLFlSXZ9WC94gnm3eoTjBddEGJXa4Dn17EKyRMoCcg+rJpkBlzGmJpTDgd4JIU+2FNHWtMEwp6KuTdsqb7BGQMliywAHBMfnJ5C6FBriCTv+cWPd+/PWPwZRP1IK2RkiwFelWhJGaYqhlUHFxdvCnABhg6QFAEIXK/52D5UVism65z54K8hnVLXY7Qxt1MlDtgPLRAsbSQb9u3p+daq7uTH+b3gU2h4y56ZsLh1DkkpGubcriq6RYECJEzELj4pGoLtJWy8LRF1lFSFZALFjA4MlW2Pu4dlPm65gWWmZWloSWLLz0LhAgApyCSldeE/H83Spk7ovjoZIRARJ0mKWJ2cQLGWTKBjOEBrPLriZ/PHFFuSAjsqFohSt+z7md97mHd5Lc5ED+txHCI0N4dKHgTjsaKPwQvHlCRf5Kwam6TQjvIq8gVAX6O9kq7M78dgZXV8+vuHcmaRrEQ09CxjryP8AhdYE3aM14/alUtXZL276G4rUvBplasxOubxL7wWuIK9CfaSY+uFzbVTLJk0IaRflZ4i48tyH2BgE/YDUy9lnh3TP1Axnq1Z4AycsTMWhfjAzH9q93OcHNiDic/C0b1H8P3OPyefi2fHKLarWIAWJckHjEKzVo6lzz3bYxY9ptDFiHp4BiSbzCaBkJmCiCVAql0Xy0VYIO8uTih8v4MapZvbFFGHpA6KIqG5fQL70WPUhD4tQyPoRQTpjUjJv0a2xRTFFCZxlDRskcJai4jI8IEp8y3zhqltlPMphgt2weKZKKwec3THcJFxRZ6LYllp6sUxtdAjBNOxXWINRXZA+NLw1c75CsO07O6o2TOJEEiS8IrJxATeDuqAbKZ7tfQR2mYTgszUMir+Q0aNEtb90MuYX9j+J0YnG2ICzWjNCOdyy3nvixeKLe3RyanAz8ASl5Vj6y4+t0IxGB4vrg70Y77JmB0jRUMl6sNTyi/ABPznIrPIhgZGE4fENx6fV+AtYWJtjohkYODuw4ypWB/gGBe5D1vSlAZYLQDJ6YDIHv//R+hMoo8OKdj0CsII3+Thx2hIPV0W+QjoObg/A/IXXFBAJJLdxeKQZAP4McenVBgTwN5hyVWRLCSeibic8YFRbk0FBkE4lyGBTXCa2eI+Q8dfDWn4XYmUKM8YuxfjF92unz/pPpWpQE0Uw0RUXdhixxkc0dixbViJTGxV3LijqEv/QDytcvGqkI+qvcERcL7Sg+6cQOdOTGx/rVbj3OqdTIoG4A+NpOiYT1s8C4nQ0Qy3mfrAEVFUyrR5LfKqBO/q0Kru7msuW+bW50TWiIcBBNPqKjloAk3FyYNTseA3nTGJPg71qGSIUkzLI0eicqQJ8DD6NC0Vu26B3Yp5tfA5MwU7C4lsgJCE9JHHOsoyM26KI5ZuuxwL0qv1gI2Xc/eNLlMow7CFqaPYsGB70in8zJq9e9xJgDB2KzERFKIYBkhuHLQk08QsJDYA1oYWIcPQBC4fEszrPUe6I+ruUofM7VFX2ecHOMHGai0i7rCFbWc428VQAs6OoBkTiRSEQdB1uC75+qmuQd1d3rtd1e/gyF+IwY4cijWBGzhm00pRePxxLzgdckoQlP2xA8+O+ZnP1LlCl3lZ7ViqMhHj4dvSSDMRIO2nUhCEgERpuD4cWqJpaPaDkMx/O0ay1kSq09DQGjXWDesjgPapWL65bad7VdDVnzygCNpS2U1Cg+PHYoKzVjv30I/vVnwedYxAQw5ZHNgj4niBAiqkHDQcoszRK12q87IFl7UojWZU5ihFtKV3xcHjUzkMJXUfGbZAzFtn5Ww+n+kQJxAp0Nne++9Bv/Zz3UUV39Uve6rFyU/rqTCls5XL3qNUPNC62PUX67y+EaJYYh6hkezQDFxSwyE+IoF4cUxLyRjzT76MswFoxGqlooxMmBACY5YWpUanzdinA7ag0R2zkSh5I4WW9zsZvkONO7/9qrm8XZYoUlQ8+SBBJkl2F7s4+I0e2hKRQJfWmJNScc/YVOiMmE/z43Ck4PHU6ZlpwoLPsrBVEFxF/+mx0W2hsePJwyDA5lcBScGv8ydy/GAM8QNV+LksRr4kRt5qilUAnTUl8Fe8hvyel9Q/UGfM5F32hPg5ITo2PBJ4oiyrKAukQ3yssj51SBquy1Zncis5uI8hhKM67uldRSqKNUzCfgLxAyBdVEOoJaKgfLwrMmNXPY6CST0y1K109dn8ozxdwaGzv2oP90cG83Mppcz7inmtRGJXTCTDefw80N2J7Qy3tSHNltXzLmO+gSRCahgeS4ent9gZH1K5tGf2Xtx+wGLZweJqmLUCyCoRdZHcg/H7YVJIMLyb2KovGoKJsc5ayiNVXOv0iS03XvZfxnI2Z8X4lioOMBxsErGrOs2aoNOnC6peGRoPK2ZjLvGxFraAmipWDLbZ1xaNTDw1g1tkWgu8txpwZ/bc5P5aNpfJzsfoBTNmpEQCklSxsaGzvqvurbL9+spCq0mC4rz0PSrzUauDu9zumr2f5gnscmsiChAnJGsgCMgmpVFWoSnRTNEooD1pCqsXuKZoKtDnFB3aMknmrz6VtNY4XdWawjxr+DnOds6x0ALOFWePqXuHJU6AviSQCERyNt1fXgEIyYZs+QSIvVPsuJeM1OodIhmKt58Y+WCeBfaoo6zpK4vA0QQIHJU8cqOYe2ydOnaod0Uux3EYmhTFBRF7wCIDCt2zB4sMoRTTNah9jNKSq3odcSh8Lb74XBTgWzo8RJLSgWMZEzIpJltICkb8A5VSdOzdvw21ESbXQJZLrH+we1Mj3XRV77towzzgQdmhKKLUIVt45CpOt4YPH54wFXtxJRbRRn91nMPziEh+eqdgoWbiQOuPlyKbRHu5Zyn2jR17HsxnMpTkYpcyB/qz68S25ZDbcF0leFTM0m05Yp5tNqSAQiSFLcGdEsKlXSzaAoI+dsicNAqogYvB4KN87jjxJyPOA6bsq5PQm3pQnHICKpQeSp9F2zIVYpVx0BerYAXMrZHkTUVCQzB/MRMqS7JEsqm4Bt5YroEvu4ph6pA8WsjlkKMg2q0VY6vlPI7V3dAuvA2KIiFUemdvD/cu+XKRT8wTIPvLYsAQdPL3Tc6YR+bSqKFSEWrIMbkSZKbCNzD5HpJihCqF0kWGfGKf7mdA5EH8gGIyO6ZTFUK4qodS/yEfszI8nz7UwltHseSP9Wi0eM7c7vs0Vww/le7O3RdtoOpH1r+agqE6mmGx0K4lKG/N2Bguc0PmVE6POTxYO0g8mDufHHDAvsAaVcbBSyMIbdiURTYwwfCLnzjtrnpVlIpVFCmB7mOeT2fF7kHxAZCKeUop6tACKXUT/2TBqxu9zL9OkJ0mO3kOkMEjO1R4aHM7OZ2fhuWTmVuWlTtCGrIOCSnXcoW/MJtruHlsIAtbvJhd1GNXJ84+5CEsWuUlhyMjourjsZbzHSg/puzFTTiyPr0DnQGrlTIVWtlxTmmtiR5QtJ6e84E30ostxl39REXVEXc6IqqhVsTi5R7vKw6EVIEDJ4HxwqmrEwSdpWn4fLTMRV91lSvxcxWP7YIXw+wChUTmr+I2Y+U5iKBfAA6HnP0FWY+dQFDLDrPKSWxuROvbzhLNSeSiUUw1zblAR+kSILRW3FA7rOZ4KkkS3JWFvJa/YArexNu4XPDAifwd76ufYhgCe4qLCbyPTJG5ht5O2evqgNq014UdEsAwqrbiynf02R0JCMv2fYZAbAm/5KdDSHyyUnZZSeQjNbbuAbyH+jeP0B5v9k3FPA+1wPCxES3unCs9IHEgQXBTD487WG+zFVcDIyjmDKNoXzQhg0q8xuQaJANjBb5WyvvljE9YZD3nvQanHXTsMdU6CfW1XcbUxFULhvV7AmH/WADSWt1PVLtqZ2ZEEAisgGDI5DZZZzyQ947pUMSaBkeGFq/0oLgUtzr5vPng2h1Pr/9FBHvV3arSEzG0PE3IcFDEsLHAe9eCOwNXWLgCloHRYLErXok1AUOf1tNDV67MWTm6lDGvdQpiQ7KtmGxY1QXgREb8/95BF6KgMxxYPROfMJ4BsYg6eUD33dtm2bY/SIzd7EqKhiXOpLDpwe37dmfhwohwvltaSEHFS2v7V8QHQSqyt3400jT5QzaZTg2R5AN4OBhPBE1H3V7HyIl6WhWhUGszA0qsrT2rJwNVeDkk5xK9jkjuwrcMbx8pV/dlOvNc3m9xFhKrVpCs1U/fbjA0pbyxznTpujR0S+tAQDjpi5jIzq3A8abPQ87fM8E+OKwJGRdbbXCD8xGr3LvABjqp37K9Q1qdEoHRCtucVz7WedZ31TqZCnSUrfu08ukoklAaaHq8rnfjS9H6uaK22rtsOXnVEEU1FMX2/8RNVNJlWTskVhvncJcT+jkmKOKpwJqaCo0Od/Q0mJ3t7hY6YSATj+TJCBA+6CG8Fbi6A1WoKLpd2vKv9ZYaKYerYXPqkLzP62gJ+np2Gt0s8UQkGaiCrzoer7B0NFZNCYHj4sWaZQZnhbkzVbDNTSn43SuKXIpek0YqYaS4vb7WdccyExHEdffIj9mocwa5jCGTnmXtkIxjjKK9Xl+VTcBLWr7XqaCmAIXh+qX7cmI/cqDsT0p74w67aWGDzcLohQbtYcYY83afnL2lRkl9Qq6L469so7ReVFXIJ9U6M2KcW7BpCVXM5+HOsT8xz6O4AX1yOv2LNOfAPjxW/Mgjktf9rKsVAdvxo9DJy4gRZ93KlzoX1yRFCKwfOoJO2hPdnZc1klpoqX+3Ym6nYVa7Q+30o7KMn/gXX2txIYE565rgTII2VCEDfWdViPme8XVuiwOuhOX5LFyXaFUK/jVKJ1luRj6a/zKNBvZbXU0aFhiYyCWwegMtWAhR2A6RxqEoJFXUC6t3VGOpYZ3Z2+MC95TG7PjURrccTnjMaDgKlyjxESfil0idG4XROoSMa2NykfD5jgTVjCYuY8zgHJWgW4yxzJYXt4KjiSKaBPsBhlIaiE3ep2iWrA7X2B65biOoX0DgbvELoLqWy/kobIFw29XZ9SfMmqBvU70CU6mCyxGP+x6P8OVWGuoc5lbRmV1seYWHBX0zqSyTmPWxTls1WGBVNiV6WmdAXa1LoHpYdCZVgTAdZ0Tg6UPZlGexnPF1rN/ltQyf+DnXHtjBPjThCvXnU3R8s0EZWirHUsojN3d7bA4ZEGMgaSBJDU0OlWag11om61AwBiA5Bvhsk0rg7y5XFhbqrwcIBJth6LjHiTQUGDhF0mvJRb6anH9yR9Dna4vMM/oHoXs6IbOsNi6jaG1ub5Sg74A29JdZUcRdrToidKf3OXNQGJV8Tk5fxpFCJ+gtZPuftcKK3UQejjtTsqZQa9Z6PmaPq814MAgfOzvrOv8vMbcbMYYpX1uVh+WdpiFa16rez2tdrzgKEFjB8ol+wQ58PkOX3aXu1otfsX6UY7uMW4x1bmTVBS7GGa9Sjbld8hkQCLBaZdYSYLuGDYZoaVt655XsaMTG003nM9YNkNkhOB4jhLMWJ/Ky1dohG1ZTVIvIvAa1iF7rUUxL0hB/VUhsZzOWN4nQftdmlbtdFLlK9e2crLyL0ub87rOtycFFsX1yxxrZGVUm0p8ueSBQJhRmTLAAU/ySxz0Jz9w4DRvHQKrpTYk5jOOZ/2IH4sRGnG9L1rHHU1hEk4E4+HzMPG68MfnPpDe3Q9vs9r4p1+eMeDbyqihM7nnvDziZLQqtCzW7wHw5xIU++YU8IVf2tatNxCM7SPY9J47DX2v7lhBg8jNBYUst/kV5NH8SwZ5WKBFr9+5OQk5Mn9kfMCQFe2n9UlULTLdMDAtL9YBq7aRO1TDE+oDvpA4b+LUIhR/z+ERNnD3/SzE1EwYWtrwrObfubRMv810aej/0RhIH14C7fW8kfaKbirDvdI7+GjqebjquD6edDuhAHcraMn2hemuOu5hzPKNF1A90NaCpVJuQFaO67Ja9o099LKneqnGrHrdn+ry78fSLOEaIxf40P4aULsd7plsneIH51V251CKNXRDGxgNqW3jS4Q/HF+sU4Uwztslj+oMRxzorCQ9t9GAstSPBV8zpOOji2R0FXQbpib/Md+e1cUA+Hhus7mdLP/BsiXLhqILbmO3SJhkj7UXPVmfsmXq8skjLwA0/i5+iAULW1IGAwJzT2gEqYHdnBCiW1pP0PgxYL1F7n9QrlcZ0I+z9FTdCHq2HLtZjCb5GCsBTdVobn73TaIsAx+st56sRkkJnC2vw1TBUAqAUlVj/mMiGYj1P+/YYzfkIMO8NOAJoG1xcDHVuznqf9JVHuehjwFBilHjk7gNeNB5c7eIncIuXl3OgkZD40h8dffiSFKG6AFxwdu2h1ozi+CV4CkGgQ2L/Xd+7akeHE+XlF90erjrHgwCuSt0d07D/35Fx4SWlMz4tS9TyRiJB16ORC4LPRRm7lAK0tAY73LCtM/UekK2HmG9+rJN2vxifsYtuXW7SxDXg0psPp32n6NR2kUwNfVhJsR/1zP8C1jf03AwW+kcFHrw5BNK3ixHxBojxOFFHcj9ywtjU5xkhEmQmsMFqXlx7acQEPlccf2pvKpbASzoV3ANNIehwetfFKRZdsWG9AH/AmZfmR2l5qAgPrXvGiu2H3RiAuxPLIojw+qCzQoDRPXJDiNV8A3HtdBV7ZjqjPBJ599nsAuyq27vqU2gz5ZcmnlVmkLSwlcC1CnBHbm6SbU/DZsUI2dK8DIrbeCNS2GnltNLJX05AsnSks56rZskMfv6ycm+xWjebyFklaKiSTs70lQOW2Afyv+OhQSfIny517p21+pyO7HjCGOYNEVGjaEi6aFrki933wwK46v6p9h1fytm2+rzxzrXnJm+iRHq6KaMu7uHZiChuiZ1+QlEEyTIdpzL8wtBbUKOPW739VsvY430Vd9u1w/Y5bdeq+bVsjZqpojk/iemTEu2Z5CCqmI0cpYR7ioO+b4qim3miHEsjeCEmr8TXsVW1PJOh7RcyTRq7WAxuDTRj4luGTf22rQ4lfgOUOGFeGH86YogdE/rWmJfxUELUh05lWdvyDUeSVD7yiXqClBhGHwdCCsuHnSls4GY/zBWXul/6UBFWHIJ9MpjyyDnru/xxn9B/asg8WivnQzh/wqJmm5A7N8K7GjXQAHOcxzgpJioBNVQfCdHrl9WRtjrgaM2zR0aHm7QtwHGTbIJhGQwLy+fgYYH1zeUDyuOHD5iOiqe18IbeHXFCKwYJef/ZeMPmqgnJU5ObbifZkuM0OJ6ZTO2woTdnzO1SeaiQwId+nFlaXi3Sr5uT0fqZYzna8Wf+UyJvjhDVcf5iFc4sZoyYg6D85Tvg1g9J8O54NMUKMzJ50J6FuZn+SRsW5ig9qd3qt9k6NywOTDMCyTIq6di4Q709ipxyiG9DhC2GGyjq7Yr3GcadFWe3OhoQiKzpMNorBmIf/Kd9gr/HtYRF61SRXeNTVGIHYzwPUvQQLAVQ4jw3Gr+eNIx3yV+z5R5FflYJksaG7BkIjLeW18Lpz4L6EM46kb09Wv7lCLSHPJYrn2enu53ZZb7l84bQPxLvVv9QkT+Wm8cf3dGYaj3kxpLur1UWnaNgFfbrpRUeFAUEVtdXs8kfVzwNPq6zImkVcxwdP+IJEiXHWpLLY7BZIyyI7KZ3Rl55+dkTOk4DTHrdrhq4OGgxPYETirSnZuE0cD8wnXRV/MnhtnpendfxNjZxf0jZIyLBvtI8lthRnWY/FK8twuCVvwwHQhIcCURD5cCrRmUrZqyGf0k7sDZsEv+bcQARtWDiVkubI/VKEU2kwKdnIbWi7DHTyz+9t88TTUbNUV/Xtqq2T0fKkc/Rn774Nf0j7UhTmZNf/HvLNd5ORME5DI7n/qtzAvfde2+tPecJEbfnKhpHACkfUNRTJ8cv++fNxhtLzdbf1dZWwVLc2fMNwEQt0/+oFAyqox9MIIAaOvpPUWCgaA4XYt2R/oP9D/0po9PTXMyf6PEojdx1LMFU1qqSBROYcxW4Raw9fx6ze6oA3og5ikPrEnwxLO1ucYTH2e5AG36BsVAEe5DoTntkizj4OqspVvbByD5X/reh38/yDbZHVL2egSUbVOU03PIV0jvilVsOy6rfapsS/JfwQ1YjuiwN4nUEG0Ae+ZZuA8dTQg8FC8pEGabNG+yUfCW9d0v1FEhzQteQ7KBSQybUb8BLTJqgqfekj6Pd+4Upfy0t3aoF1e0Lyjt6OBEHf29vZvGIJYzmwVkbvKVJajptxVfH9Nim8U/EG9avainqd8qOW7Uw8qGCfn7vma/YT6rOpS43fy0B4fAXHpBNiN2Nv51LutfNiDM+Xvk1pIoPp3WsnD7s2Z/xTaX4Jyi48kFOfjQ3GMkxmCh7859Xpquskcmvtxv5Sf4m/8FAl2oCzhhfwc/6Ozs6+MEGFV8yB//5PV2KNP9Omh9bginFBob5kND4EB1cyRh32f+M4LLadez5WO/teWdAIilnsIZXWvOT8jSrACmz7EPaWUblrYp9m1Yn3Lk+t0jLqldr2YGivtiUL0iA0HbPrQNVmYXo1U1XMHmNPS408+97lW6AAn0OmHbO2ybRTz6REjCrITr4InidxU+0ny79EDUwxe7ibclQuuW6RmGbwwFcCPS3/OavTjwGhNqyO7rWK5wnHVJ5kLHi1pKGtRAQSKJAHiHp8R/Vs4Z4ttSB7xcf0Gh/71i/Mi/D/nH+YRm+yHslvt0DWhXRKJDinc+QcwyFK55axN9YFXHhZAiHnDGJQoe80fW70qXjU4ET6PtTd3QhJnpaO4yamVPIp2f+wxYbtM3FELh7CJu6S/esd9jnbIwq8lFl/AmFF6hd3/18KgROmwoGstwx+aJAJm2GNsETcOnkQZp/j61NUJleXw2lnnh/sfJPskgPWvNPsZCTWNqw16RaNWLHq0BpNSc6Gim93ErpNSg0jj8WlUfThmH2Gr2tjTlrm0THb6M7Wnx1RlhLC8DLurYFQaY+9uqqLXXDUEaWGaxEzSxHWTqb4pflRqBWifdoO1+qvdysodjA7pEO6jJgsqnfKklyNXXk8uJIuwG+IxmzkwEx0R772I4ijX6lzfP6+fqy1gLnX8xLJGHRWLtSJA2AutmOu+bvAkdx9kJB8JLcpLf7penE0hXgpRJSlzPigIic4BSnLXak70ls8O656VrS8nM54gFhr8ukb9gssW5mDHxEXG98TROFfBu7LnN+Ps6ohKfC2wQfVWBX2W92CSOk/KDshC3N8cLs0AhGlMDn/x/6SMci2FA2nbVHjFJslbUqsgEsLaCKoieNvxXweDNZmCZlCrqLrFOWRDdZxa7O+jfcRgX2ysaRK36m+5ThaOUh52AWE6kFfqhOINj06IIhx8Pd+6KSS37PPr3nXXHUkXJerM2DFr4r9wWUss0aPtPgj1K6BcqC8ATpKhsCmmT4Rd3afBEIDmm943u7oBbEAnqhLooFhPMxF7fyS95IbNIG4J8SqS/QEY3lq5/rKo5GZhKVaaEZGlHd9Bdu/iTpamH5uwmshWE0mHiSM98HQ00rZ00IbFOKq0wO2kkbXtYZ4zcV37DMliTQ07nZjzldR9MvPp51Te6wTat6pzZY+PnTezY0GFS66Z/KNNXlOnW9Ku97SXaCUDAJBpkuq92o12XOtAPxAn9YX31t8jT1k8myLPuqrqvPip9DSfTrCEVY3fSPI1inQCihSfOFfR9hQTQMLsGaqD84HpKor/4QNpX1KQ/ludJPKZ0aCt4T6QczrcSfsnqAT4ztssBLNQlCxSNFBJV8W96RdN/X3CwTMnnGO4/peBQztu4yvlCs3BeoPdaDm/bMhPs4PiW+ypCHifhDH19bB3TrHSRQph+cne02Eh+oyI6XjjJdHzpLUWmW7mQ78Y6M4uBmPNMbpMUcNtb4g1nmPCQK0CcPWPPdIxZpXCtthiOrO2J8bzF1ohdJDy7JQMLqDE8GwOqyTq4QvJ+JB/y9FZYbq2zQIIFXatTZYOf0I+VB1an+c2OLUhHqbj1zNx85aqTzlcN8j9MlFHceP7aNcP3tdgd18a1X8oXYePNxvZlHmVQ9aF0N2CzQbOioKPaZqkUF6SojzLJmj+6JH07jrizNTnKJLeOlPzkWYQnGVzX16c5+/iFklUDdLH3M8PqRDhd1/V9DFYTljbDApGER65l0/Iw0eZg2I4mWn7Fu1+fLmFRFg1WqBU7UPOOh2OHw/1NDneKFgrjswPV5Ktj7PLxuw9D10TzjRs7YUtzjB2Ly0JZbRFiokUcpnb3mkU/ajspU8XAshqNL/4wx00uyUyQCT6RpAonWPjBzMbR5j0nvn0DfQr3YNKplQiTTjt8pQ2MSnTNvY2bqgIXbjC98KhuzzqSl/1EBHw96bL2wUJjBA0ZP/H2uR7Cl+AFlJmCKlcAJ4ykbi+IARbVA/6++vwYkycTJjK677GpLZ0uJAG5ymi3nzsQyqzUHOAlhtIeAEHJHR0N9kcArjPJF7KxWWmNJpqX/OlAXkzWrMHcDOuevDXPtczRDxULwXelYPLNHariTrdrVv4M8a8xSuYFVTD4pBBVVyG26A5MRRXMA1I0p1kg+Se94YIjTzKFjO3m+UA7bHqtFJPe8uZaFmM/EB5wtLHWk5dAGZRx7esbRBnNFysh/fIbe7wzqQfeiFIkGXDsj65x0Gs/ludZiDC/ZAhpTNCknJS+81YGYECccALkK/Pm8uYN0mdaPAjTavtKT1ZBwFrbPKIXXUz1N9bS5IujHZt4dDBCiPT6HhROx30kppt8zd5jX4rhUhG3dYYtox56e2xsdezCO+nftel48lU0pZUu+dXRS1iiIqzOifZuNlij/GlHez17JBaudc0cQyrNQCxzYpP0IGq0VoMxEtbEqX6cPoyaVMG2gu8mx8Iqi43h6rgdrg5kjPzp52xBIb+yZhhOghMXOD+gJhTFbxUyJKA0PKY8xC/yEjf2Kxi5ebHH8T/ZW2O4+14RwVS+KnWtQKNQg6PNMc4M20r1mT+l0O51Jj+Ida/kqZq7Dy3uQ9dUZzsEcj0n1qPDyl1164mPJfvfVMWMFmVoRxQPnbqb3q8LM8N5qdb7iKQkggzpJtUQn++vSijB91dNZYzKBYMDCFsMjTyO42r8KBrQu28EZxm5n4gxe0sljwxR9i20j2qTUx5qZTLt694PtetOWi8Xdz/rn4SGlBjy1tl+3PhlPDtdvModkTGkg8yArl1fMG3bHdtWeoWAN37Is1tkrSRROoDlMXB0fIEaNrz5Udjq6ydVrsc5qTfom4WC+//4+F0XxVC4YW48QIc/FDhqO7d8S2WQinpIv3g8Z/6N0kgE47Qh9I4RxG8Y4RzLPywvBuWmEmkxgDA1ZuYESZ0eOtZif6x0tKNzrMWhMOP2oMDH6OHmimhtImCZXjceHh/OjoVwFcnE2JkGQrJGg2r2NxWtJXxWfOF0v9U6nDYHvcDQaU2FZmu7kis2bJdTK+c6Ld3GP9+tp/sAwsRQP1waN2wxFBP5fcSPGF3xXoHFMTVIIAmkuXQo4Hncmf1m/vT434T8nYaaRLLtdz0DWaJQSWE9dYRzqIc1XsZ+xRa+rPEJsnXzTHWotV0UKmzfA/wRqCi6Mbr0ol8jU4IYtAs6hJJIXS1lU3BNP4dqyO3V3mbu089YZURPGV0Tzy9aSXDEzwgDxPPipdcVYJAsNggBNY+HbHX8iExiMy1pJQ/oE9716ka29sdtCba2yt/jOQyq/a2/tQuwoILhK8vcWE9toINCFSgRB4eTp++jhtPGyuOwyrYPRSMKcBj60RosdvjlzSuidTTVsAQ2HcvY1tmQp98HelreA2FA34Ml0GVHUCmwNTXshjt4mZmPw5Xp0zpU8yfGJs6f5fI9143b273ls+kyRi9K4LQ2E6kEIhat478XMlFOqpD5wbg6bcSg+5sucoVV+3mptGFgGTfxs+3SSyQ4IWVibosiCydzWgCf9Bd4yY/1Aq7Wau7KZprNoPprL9d8UW+mDctxnL/gndi/9gQMq8OQZW+mWLpW1x/paLC2vvGsp7jGPJj7wjQOyxLT1Ac4u6gxbHkgEVgBqDTJGBCFcSh4ajjzYSLaSU1HY29PybPjQQJXlWsAh9ONzh0w7P6vRaCSjAwbULQ4OOpMDbo48iepDKuRaE7vo2+rML0rCxz+61Bp9KUHsHBUG6IKp7zV3tT5xsa7qetEaSPVatdaxL8mnr763bjefGOcW+cyQPn/93C1LZ452O9U0BBhoJvFJ2Dav1/eu6PHsUOpX1h+IbHiRgt2jZ+04drkB3BVCkXpr682cHe6t7905pNQ3h6VQURSG4x4S+UxuOSmVZv0GtyDZvXYTdt+WIqZORrakgEgn8ZoNjgxDrL4UImVE94dXOa134nmGSuyzfkJOYqRgvyddxth01bP1ZZdqBPRqK0UNudQw1OxI0Zs5vFmBsdQ1VCsN/Rfn1mCrZaEckbIDlCqmwgoQSC86HZdOkALrpyIUQCx2leFpnmbmJ0prvBTt+NiYJlMs+ECxMIOjahqeyjasEbnWU8ZRz88FlOyRH5lRmm2JLs5bHxt2sxUXTrnWBkPKTKXCcAwTe812ieIkwu2fIM1qwEXGBDnoJy51N0zEgcD2ibxrxy1sGUUUCTbLsg1drNZdxQb5omBAcxleNWl7WqsERIq1LfTDdamCjDA6NdychDjTy5Txg/d1vE0+K7j1I2oOeVzGmBbsmspW6m7yipvokNik9iqDhMwo1csBLe+b1hx7+/1ihSoIxvTA3nRuarl5MoZ55VYsGvaWpt/7YN/+jYozVh/uwYapc0Wje0PmoubwmVh3yuF2lx06XY/izfjUSk7AZIyaplO3Z1rem0zfomPqUS0uWByXciZYzG4wSg+V7n1PvDIpXIle9XaW0SjrEDRH7r6asUvW4z2l43rP6anYPbXtmcnxBchkOnQcLszxhrVJyBA2zweUmBbSjbHhsHTZ7YHaZcjeaHFB9UjCpAbwBFe0MumAEVAYasLBhISLlFMNSw04tKzEZXSVrVV6KM/2qKNNgbHL3C2S4dCWC9h/mDlcytfwArh7HANOD7tAVqVTb0L6cvvTw72ZbJUvK6oIE8e6KIhTmYgD83x7x7uiVlatz6sLW7CFHkHvbsIVB/VrhTJ312NYX/hMvfVzZQfmD3NPt3zmcKPyzkqrWgoEmSEWZIp23P5TyDoI5IqIk8BgAsg0qxBD+nPn395kPYlW1kk6XWFXO2t3m+LqEFB28NwMrHY+lXn6YHxORwepVlZSYW2+IaXo0s/jF2OAh14Tpw8w7R1o1/HAp0qIYYx57hi9lz56t/MS/o415ake80TlbSIWbsdpiq/GmZ/r89fUTcskc9mcd9gOwy/n/jMX/iS0l69vWnn9E9WOgo1PNl6zd23m6a3vNZT6xmR4Y0zp0LZ3B1tn/h1tKHB+YWYCZmmg9pvmyFl7YMdtG3GpPrjTdTxDG4yGP5zPP09kWkOTnQsNU5tQP/J1riYXS+LNbsVh5Auw4CzX62f6Mcy+3oLMIy+A4Ckhf3vutiKlydkdR43mTq937D9oBqmpDRLArGhVYZtOL95l7qWp9K7xYRwMs+JM8y0oWj066qy3Dd2zIZKbj2f24xO3XKdfWPjbAaNfHmWssHj/dIb/0T5LzOKl9VLGmMn90g50K4ZIrVeIXhSuNog3mnSO/yCQ4WBWlnKXsf7lA2Zi7+jA7kzo6OgCTz05HIpPZabttrtxSvDsWUlqRq89Lbq7QMtH4Bbpaj1tolLlnSaL3icF7DQ18lhRudE2BVK9luVdrRAk3uHL6TPrvsOniz04mKxnTCUyGquTmkSklkhEfD4cqWXG0vblXGDuQ5KdySLnknQoaUCfw96bbnUKW3ZwVAoOoD2iYz4bu9eWMYwXQAxMGlYsdrgvIK/TlUrrF3xRxt0k49NTX0Ayq0XQwNFhzGhapIeUPlewVeGT7ge7rgUt+isx1/b97EVeIi2R288E8HzjyWAtLCU6KtaK1C1rzzRJu8uaTqSooflr6bbztj6lSq/eGcQKp6jDZ8wECHHT7annjk/pxKHah1Qg8pACR9ego4Vx2sXGaFb6zF+s4xc4a2Gml04i3Rbotfjq6Ck5+t1xe6gd4Q5ZZHyPmylVkTeyyVELuSZWhW5MW504Y63gd7oia0GH5HP0ofyErpzzF1vgebxgCIRp6XrW6shit7jJ0t9zNpix5PoUj0iUGS84MmvcUAk/4KpdpXU8vSjEopq9GPvM8ldMNbG3NJMVwYCQhSuId4d3H9XLFwg3HceuxlOgqdThnEsN6oh4AD2TW2u+rb+07VH61stEMhSdRgYFR14yhcy0dN0v08j0yZOpLN5u2jS3Lc/mqmMvOE0F8pfJfRqCaoYz0nzqpAL3vQUVHJaRZ5zt6skF41VVFXvxAUHEYtUobwX9rKfbMUfXmMuU8qUzeyZF+n4Q7dQcP96yDIX2ms1hfauEtYZhYRCwbcdfomycXGtJES9IRxrHkfNWr9bEG6aqxcuMl6xSq7coJq/DICMyW7ljoOmbIzaKtQGrSXj8cdfDZjvVedPdeXYeCrtqJlM8dxGckHt+0BMb2CFSYHO0L6p2c1HTjTkCRqJmsEjUA7lQi835WsejfVDRhQvarotUMkymYqNn12l5fmMtZDgo8bXNGltT20l9Qix6Lec6D7Iqec/XzDaP22vYEDJOCNu27GOmGI7l2S712jG1f022rGe7AikeQAjaPVlAKW6RvfCotwI1kp3KNJ6GjD5fd2+bmE/oJG0InB8Fsp2bxNSOW9qNb3lybocQqQmZ4KXOhzkJ0k0o/kmXfLGMqjDci6HbVuC003dxo/MmnhPgdbDxYz5DTDE/W+r6Wb2V8XkNXmMkgIyFbO4qgGSpM3wbKCsyCvMIR1G2YAjPR7l+75mr6Dwk3XlfZw5xQpVjpvciRouXopafNJJN4atiuWWq2vmGzRWGm86qIdzsdoimI5lX4uyWHf9h1mtXmYuYfhRYOQZtTYZTkTbYCw8jiB+hfc3R01XHsZ21pWBtahShQHqhA9knZsE25p5FultDRl8c+x9PD5xySnl/yxNY8Oc8cGCvDU4T5BpCZOUq0Mzy6L5AHWaD3RlxhO5QrYCMINX0VTBbYo6unxq5aB5ChbV8QOSaLjrJ7sYHQMxKeb4KPN3bEjUaGrzK4qSV1FXQVOBfD+Slw7qU95VmA7Fr8XyI9yfP5vi7tKYqVv59GTxxj0fvjbDLa5RvzA6k00F7EJeFRLxtw5JYjShIQOLPkfCgmPzcRSeBF5oLr8Ma48pbD2wBEx4rPkNvTDFsWnV9zK3JKInl/DK/cgUwj/tuYeUZ4vvFvXI9scF48I1rMeqT2qbsfDAz++yDS6GpJktR2t/SeqbJHRtYYuP/xd51iA8szxiWyCZGBprXGTPi+DEmhmVfhuHmVvbncYlKulNWobjluHqM1Nm9O3cIQcWTyTwIVJ4o8Y6XvZXH4o/4Xuyfwv1NtQt9Mmx28raaulX/tZpjG+1EEISlWM+zLwTcKVzYagByWS1NZWB5hpbpwiVU2TO5FpJhVCcNG2zva5YEFeRw9O3CGpQ5a/XBYRnR02OHa9lywR2O7eUTC4byX+M/3Tp1XyuPUZfz0OQ0Q5n87jaddm3SuVfVOfejf3d198liZ2160dDYmLExuReV4/Fcppt0DdA4KDrCXr0Mt79a46d1gKueRma2ByYUJd1jkvDhZsIKq+zNCEPFcvvnC8gK46Kanw+S/xZVqSfrhh0BTKin7eRSwjpc83CGuh/i8oF42v8n8FLOmIQxRu1Mt/SmrJv1OdZEO5zp9O59AKoz2bEkVN8AwbYrDN4A4fG19rXfqzgWZSJ16JKa07x9bYgo3t/5fsT4LdiNislFsmCWa2cWeCDWg7RDyMA+orqLK6GvCjOKiSyyEA/A6ibZ+r9rQgw7cxZAuAnb79bTUuZayWxhbIkGhlp1ZHVXZZp9lduTHmMLL/5CNgnX53zA118Al3AqQTgMhoZI8qOblEe+XeTPNRNwXBLWyyJr4UwErdRgGBBDaWQHK4ZXZI57CQQ3iA2kB0sepZQjx8j29D6xM9i6hgbLuBRkyOozrXg5RSeK8eWVt4xu1POThr3rdDUmgVMpLbqDjmSazArLoONc0w/bHvwhs+9zsyiLMxlW4izL7hVOoJ3/OjxOtiB+H9RlRI95/pux/N6vjeyQ5LoEbmTo3dWBwWNm3VjQEeqgmET+BtMeC+bP/Ey4ccVjxreeIyhge/w2fnnUn6Q0IF/vHXYLFaNpxB7nTBVHHpIGBNan8H0Crq87OzRo7NrC6jMkl0w5p5s0NGR6JFsxcYz3bokPMmQNBE/x1C3X86WUckULNuWBcW5tSfJjgbXoCxpvWpzvCgrEBa+JUFMgCEqY6+DdYX8GJhxHXVmgUWnGcs0/D559JbI37ulHM4npCzGU+tHp17ShO3IYRZBmNpalI1/DNP+wPdjY5JawZSGZct8cj8jEZ+PrAyCGPd4AAoP9fTBnr8JKveuQm+Q9aNVdsbh2/GdZaTf3j+kJ0/x12973CGCVImVhc81NJMeoqHyrr+xz2FynQ0Xxhhxa8eFTJb4Gww+VZc/dFXDG8FKTIeaOkLtnYroMgE0cwqmHtVk/A0su233PPylvDxkVG/Vq4OpwiG9yMb/MGvIqGfJXLBmIeeFGdtsz+iFflh9HbwPCCbDC8FGlh58336JhukndnSviC3O3miND1VQKqisbwEbhxFPLy8/tepsZcCoU0Tnt121EaEQYD+KYvI0SOBm9mLvI+ZWuMjLM/z2u0tTOMBAfYDZ/MLTpDgu/q2ax9qyahLZ8OlBpx78Tm64at+sXXdU2B9tPfZM9gtSnE/R/fmYZH9Mtip8g7XMVA7A5+WVZeNPkLzPLm74/ywWPm0u8Kz3vIzFUe+uHsWhxYkaoqPi0c5rPvJO6YOuTetpa1j3ycn9q4+kokM7LfSl8c+ZtX51DzR7YhdKx++Vp1a+Upopot7DZw6N7k60CFO83u+yCeuh+wIArRNGHce6hEFegp3lDooUhofifNlofkvE6O8FAPtzGMa/dZtLIVZwmq54OB7nz62/Vz3fQzF+6EEspSyNyrfkTjyeLrucrq1bcUfcnQOTa7NMYluctl+c8s5x8cRuHezPnjfdf/PfREEtGk+354/PRJAC8HikDO0+lvy3zCnb6SkSW09hCCJc+JoDRGt539Qg/ETe0dRK6lf5Q8IJYaDv8+NCD6jvu5DB8MseP0khqYgiRXGch3DbFeeRUH07d8a1974do3G11dHIuOYGFjmPwETMzMZWyZrh/LD4NKn5k8Eef6lizBZRKnJXPeRd4nd+Jb5Qc0SRTkT6s337lBcFZ5iPscSuWOcpCNW5tZFUmWdY5cTwNhnAoz7154kNSKtm9sCWQhntYpps8Lz6sDp+MY92UtVJXkJ9ccx9Fdh0MY84aKAshgnE9rK3MMHLa+jHpLPFIiOfL+d0SaS4q2D7NUAfhpu4A/aJWYf1gr+eFxJPON8izvZd1MTucvmegsJNEBcg33aeKeThWGX4+g6CNEf3GFhRF310uw0QcsWipkJ0mzCjzBvuYH6IuOrPrmc1UGYQJkHqv8p/3O468HZS5uoi1TvE6+NtcvE/4wi9HtwQOMTy8S77Eo5qtV5VE6nAGOvwwxZ9vYkMVg4VOoGmOEnF8js0nOkhe5RZcBS4S3Y0WSxLSWLnQNvC1luZd5NUp3+LfXcjqKCIWbV0jwl0oAuuiiMlUckPT4eedTQSOyae6id7ttxjspwQsPE8+/UCvtEDxI8N6/hfCJIB0/ah1arN43FngzbUREOaUivZ70r9q3SNYowIROp7ibkrTnuMx4TypjdKw3C+xeVqW+k/BCidOfRkp7H8mmelZbVDqDC0t/+2saisgea4b2FXfIKBzWXgf4V9vv99bmISGgCCrorOaZ+XG5N8ELRpuuHzKRaoDJIgZrXwQ1rKnsPtvoRoNXo72c8m/dU43cR/zLidEzHQdacguNhOGBjdxLm2MYE+65MLA+2RH1aTPuj49pP3R0GV2DU3tQ4i3TUwsyc1hkC5xfLTxxjkMgl5g7thbXyWbNeW4otE+ZQPBXJ0qKitsC//r01yLzrT/FpjvfMrPsRub1lzn9Taxet0PF89bgfKSFXsDJ1TmtJXiSl9JPhp87vsF36f9LPVchYf2jUSTPHM775T+aPrGv1r4nRjc/xlNTCdh/apGR4V7TPF7eN1Cei5iENy+YDp77HIoumWnnrfBcxopFlScpo6SkCGspZpXSgrW+sCIMMffr0rZcxMkndT8+dQ050sqOZ7ZM2K/PWmu2t2dmdcVi8RyTGm6pvzqPXH6aSQNrUC38vNm7EjCOWzO8UlTqZ1g1EnCZ5RNhIy9kHzJyAdrRMMEDXOha1p9Wu8fuv8AE/t7jxCgtZXQqNvKXGddtbRYOIeU4RywfoujHHxDg6TsIOuEEtgjv28TB7fumjN6uuv4gHxe2lx1sHjrf2JR/NxZNLNLEH4nvpmS6d1F2EixS9Bbx3RnL2glsrVMdTDeyhsY3ZXmGAMCucAphlAmU3rSZalID43MUQ3XL7M/dKbeQcK2bu3oRdEcN/e0SJiKwGXIdOb9d8xl1z67XzDmu/9yVpSgdGMFq4W4Gxj++yIjIp4xwpyoiQn4IDGOwvaIcPWkHWuM5SKenDqM3bgMygmvmKQCGKi8xlywzplv+sjnfN1MeFgwtKzoaOaDso4BXoFH3ykdmObesaRGxouH2oqfKgaTKfn5R4Hfqm0HBLnrJ+OW5vXDTjow/UCmcyjT1PBhcCPF9u3GVPd076hmQ2/1kYisS4HBRICKvySa77qNzI2ZQiHzs31bx4TP01CYqiaHHnIn4u3u1l8G6U2pzWfipkXKou2OXNf4S2CN17CTLCDg1Jxtszoiegl5BMdfP44CAZP9CtJBh1zgNA8K6lM+Q+fvM7GR2Dy069/OON+UrSnF30sG8eTQwAHCXYINl0xBjpvbcGAGcc7bdO6GMMNOeFbf8ilg1rT/1DOevhMNr1p8eiDHDeJB7pBSYlerQva5BxQ2RF9Jk0Te3/Hi+JfSzHGFMXu9/7n9Th3RWovvn5Ptwn7KCK7tww3isRMzBwycYloC3GADfjCixxWlVfIeFCHu6Ii0KUVdGbJHNo5ZGHgqP0JzcZmZUKi390YNl1MbqkUW+V/iWhNSJLRsjPN/8DG24MXggw8cM3UZNYtcubciOkIvKDpEaXilb33YUkn0SdPqncB0t+Cbyl8P+VRfSvWIlUPJnPPNfVlOBAB1hpXkTFkz/eHh6cGqfSMScvHDDGrq5uK+RhiCIAxFAr7iGvHDjR6SfDSZ5SJLucGN2CnnlAjNczetxpYeug5j8AyFgtfr44PygsAbKXtVsUC3E1lxI7JkqJD56//Sd9Syq/T6lBQxMc1t9B/v9JZvo1v5wpNXU2MY6n9xAm+4mEJNxOHgvC03mdS5y5LIJk1F1dduoT2F88pTtttmxntguFIa/k+PGIa6DrOQhEVN8+O3Su8UdaVwQdGTgIxUV7sziOZqoEm6r185U/8Q27I79HFBZfq0zrlBHtFmkRsJv36Ta2lQVrUqjZvy6XAgRa62uzXFvHW+5mVosQRnQrdm7Xuje2Xzaj6+mRtu226k2JTXgBsP7JWcAEJfTdlb584T+Zh0+Ki3mMHI7CxHZ7knZsSOSMEUcnerp/8EMsuD+j1rrw4X7JIKO5DDaw83kLY4B/B3RpWddbfPZEe7B1k+zuZmMDyrEQM0GRkLdAJnnSbcwYW1zcmp94GBbclZMS271lgiie4kb7n5fjm7blj8TIw0rXDfiI+7o8gMCNTAUcu56tRg/p3TXWp5coGZcJE1Wm/gQIThdYEy+7PsjkMz4ITg1t5B3JJ/2P7ZAS8IdTklTtePMQeWQXfgMloZId5TWjVLNO8P8ItdMAZqd75PgjRVIWDPypLQ78Obt+eIGORG8oXeLAuWWkHeK5tuIRDRi9PgagjlfcExLYbiGy07c1T7P/xwhiorJIDQ6xmcBMljPdnpYAyxa54w93VHNEZ7WUzwgfRtML3bJXizd4LIZTVDsZ20ngR1Gm91qHgg8ASKD8OjbEr6EgE06WmRL9HRxa5f0XW7IZDG+S97flzengXKoE8aQulXXyUsQYBXOFb8Km2ANY65CkyFDq1yg5jpuV4ZHulWef7RRbTmit13YCYhM3szeeqS/BD5lKmp+r8/jMe/Vt36P/dPncuRiDLCWmCtRD8ucWK7n3zcBLXS5JxopSra5iJC3k7fGrQZK4DqxnCxB3maG1dGLbz+lweMu4a7iPJ5pSzEnYfMDEkFXYTlrysH2XjmJJrNtvpjcuhtEu0vU4gdvp4qC057VLdYg8pbiotgjDI3d6CjrK91/jRxWUlEauJtm/aZ7IfmIth8rbGR4rqdSj69SdZ9ulvWzEw3t67n2nVUmu/wjkEMhlAi39SzQ0ZtonmONxi+VeEjzu3duzdftw8twctclH/SrxK2TpyqG+/eCVE5zlN4vB8zLIPg2XltIqdTUtMVwpr1xnnRlakU2Zd4av3GIq0qy6MWjHraJ8B/ewCFGI6tqnuUmdDwKTYhycen5oXr5jojetD/FsP4vgrFR6AoKYBK+TqCsco3PKuW41/iPDDKITXzHOwBylGx41QCvb5jkPZeR2N5fCPn+8AzcrvGOgVd2BbS93761COLv3HRlOMD52wWn6ExV4BQSdvxqslMvSwmz0mFZumm8OZzKNRHaPDekpLV2Bo3tvVqXvqX5uFPS/z02n85OVAXNKpuM2cfIFQy3FxQCIKLnObTYVb/0cnuEAVa+zRQmcg044kO9oLTK9HPaJ1E03hze0mgP0j3/1eqvROYWbcYaIFGlaBDCXq8Stpcl3DmYAyPNL0NOUI/REFmAAOutsSVe42MsIj3+49p/fBK+J46HrIGN9DasthG18/VDlQ30ZyjdsEUTA1rb4Rj4e46nQZvpWF5nQOeb+XBXExbxmlrNSIy0kIhtiBCzClBxli+dsKD9sBjduGIyVxDc3bU9xFNJIoJ/hPMhmK6PS/v1qQu4VZmD2iy1OLyRgkKt2A4+JFU/612gse4U8nwQacKLRMD0NXt+grHtNzLTHLO63++6LPmJVlD1LXiQYDY0VkIm25IbROOtnXEC4BZ+p64p6fk2lZ4s7Xevm0bimc2f88qJxtgMp94xEg6BgG3BL7VY2vkXRFl+TetZIqCPsWWarAb3FR78v803r/yZ8Hxh2rXEuZ0hrzV8GbMUnJZXDDLkErA24Is6cU92bVigi5sP6SOg7JwGra51qIgpewHQ1TOr9QbK9AZsYRMopZIyEzNVz7Eq3QK0k7MeJn7Ys32wSMbe5yG3MPmzJ13AT8i/OSyIPcto3AG/gotb/v/pYTyujIvXyRPrGNsJm8+pD16vjzstn087mYzP1nkbnfb3WnCXSusV8GuVhQraUbxSYiDce15XPvqvpmMywWnM5d31NhAM7YsgYPmUg//sKAHV0otLXaC5Mo2hmAlf0x69I1jW3evdlh7aBcMxTPhrvnnRiSWkArYBSS4xtlNR6AIw4RBr58V0Otv90jdkQIm4UkqmneWINqwBqR6FZ58z3ROVHlNEWeD5uqwRH1RRI29vKplpGljjE2O1uuecsjLk2BC0/7vk7371zjpinJxJlWKjhnay601yzThR0E+rhivBjvkLvvroMApU1MJAw7EMaCTTCAzKxVmC9HzX7A5rYtkdUcKzBp8u/ycgcwhoqpLjSMq5NwufIWPwDoak+XEZQRQMiE7fAhhr8C+CKsbiHSSUeoC6SDabhZRwwX/+ovHISZ+QHalVR5eIuT9fhJC4PRRIiiZTtKLvJLZTVslIFMYPra/XOjwW8Pco2fUm57QiTpyE525PTGEGOJTOCGBC7C0ui1LfIcdQZf67gvM9+zXy923vkPZiFMwgmkxBNJBXZJXdUQVioNPWatpTGjgSOg6gmdv4e0GDj4QCcRzi1znAG8wcXY6JyBH/kGl/pBamuLir8PqjjwviQsuVtdET+dIpqjdyQRPIh5bDzuYekhSCCXgioOWLRERvE1uC0OYTBaEmWAN2+/QJVI9a5KnOwXXxOfg29hEM1issB65uebu6AvMHerkGJXHFPSWZukV+1JnWLQeXkGej0+ARuhaJlqnjOA7sk0bp74N6XwboF8rjE8jPD9iHclRCBonvtn4SCY/i9NmpKXE/8D6pOt8l3JbrvZj4BtG6qFvKSX2m3D+b8yB8qzQ0VxLkE+eLxHNh17M9aOwl9Msq15nfPLKFbNJmbUv5VIoC00fsk+zjwNMUdl4ElLlD86YLj86a7F+jVjHLpzvR0hrAgQvpEPH1+fXNmbI1GEBURCJkSayxgzLDGCv9DRyI7iA2zmnbTgp3i2FyNXlaNmDBx5RCNeNU07AY+XucY+RhnWu6dlz0QxeHQ/gGvqHsRX6XSQVBLZ0EarCl/JweGM0SPATjX/TO0KQBY+GiQGDk32OuWotVWbr14mQ0RLCbaL+Vsh9mMBtUYyb11Sg0JzKYpsPsjLiuDOJ0149iJ0Jc40IPpHY4jZu+p7YhfkDDxX6y3ufzZRfkDXaeuDeq7x9WSQF3uK2DURDuYP5WKJHj4/D2VQ0ussbyuV1DGbyxKhW56+C/Imz3YTxMlNZbqKf3dWSQVfoLxQ+GM0PuiDSXfZJT+prcwqsU1RBq9ambU705S4ekagIWFHe1nHoIyhj5/pBGnKWRTQz4Smc4rmnLSIi1Im2I3VRKroIrWEXyX/zMeRxt8WDdMO3R6cFJaM08hlKQUI0H0ho6Ij4fhhsmcJqZD5SfT7awu8GFGCwxWxiygcCluPUD0Ld7gOqUxFMFoHX08Wr/IO1hw8+BghO8ulyKt3LffXmkwz1G/8KP1RaVkE0h1duLXHP5AkjdzqCJ3mm8kxjlJUFlFVF7uqUbwjb13bsFeuj9fIHUxmzvlCO8OZ4bApgGb4MFIVWnNUu2eF20jMvOu/5aboLQL2De9aohGtTK9NLgS47JRyMhYjXQ+88rUi1NiYYvrOlx3/OlV6J4Eou/aQNu68LGOd9xzdEzWK/j8qgkmpxK2F8fKhEwuZ+RH4vJDcTN8HGfZBOxmE0pqr/wXkVKneUxeOtblZ8p1uWX6ox9E8xY/22f19OCabc1uA70YyeOKsxVjefBUGSsg485qUvBUK4EU6SrV6X7Yb5P1DMDYLWfVKoIAvpZd/cFH1Qao3HmBjGzcWb662B0Bhk9/1pHUbQMPBdc3h2UY+Kgu/rgXMgK7sicOPYkB2JYjJ6eGG8a2Nf6Iik7rzP6piaUrBFqFWWQkl4Nu60Pz0n0KrDkqHx9S6/ujouI8b5e5HX3BR+DkGFL+1GhuowfB3ZBD2w4HxQg9SVCM3H6obrqCupbLzqkQr/kpAOLhHJpAXLEMEE2T7sOPBHxUeSBOKD7KwCtLcGca9TIF5hyt5/Dn1pCeJqvt0lEchWV0uPe+2Ls16y54PUsNrRZWX3vH5b7jbOwoeTvdlM+BAyzwtXP9VLSE/1L/D1/K15xufyqXTt1hb+DiB2Kpm8wzx6WnBb/1b55NGiV7bwwK+d3wq27zcch2TrZKUjXdIunK4YXXjIJZFnMdMewzsmfPiwF071DY1fty9n93rECnsq/wdzKO5x08xs5/BKXCkvt9LF50uRThfy7xd6dajQGmKQFKwzu08KNKTsSp+xtF/Amnb2gBuzPCGwhfzu+Qjjt2fH5MnzaDCkhFDw8H8+l9YUSvTsLzs000NoEhkiTG7x4aRHl75o04tsujFTFIVJuMmBEZaEGW/PngV+ldDqbhfZvoyKGSxc28KvQanQdg//+0seMqXMB27DoWRqs9ZOcxZ5khLkslbIMd4rL+zjJLrAFli74KLslPA7sj1NWfWLtumo9ELEUrPfBpW8uIENvw3hjZq8Qyn3zHV1dWOBOzGUmkqMzc3mgfJLTKabFqxyWXvCcimcG+/OY+oZFIRcOFdII1kdXgfqj9O7dTHBGrVH0q+Be1/o7+2nT65dV8bxR5r35bMrdl4FB81Im7h+4N8pmG6DrI55zv5wJs1Cy4mty9j3R2ozdHiQlLpENs6puH1WEMo+tLl4kC4h15EfNnSM6LOtOs/Eo7SC0pHv5talxHSXDS5uHO/oVPR0t9W6fdc4mFrC0UI9jKfUFG75hv/wnuZ67UW/V/diPph6sniqAmdU3dLWmFU90/RZJdhmOuod9jSq4piAvWGWctfwN7H2Yz00H/CizQ2v2UtWvtry9DOUImk5jdFD86jH25LqSgLMAqgkFliPfZBn0UbevRxicu3aKC1E8KfKoe6DW8/g0nUrU66qH0H6BrJx90NQgYIgMAfAEMwDaxqDwhJYn1Ivl5+bvFuDfrthNWWdnvpQgn+iCSgSZWv3nF8SRw1iujxZ8oR8b9AW7OfzaDfwq6K2MfnnlFAgXkGR3r/8UXWlk27C4+NLXZbD4VgUNdmCeVFS8THwZ9h8qRL9mEg7hVeAUZcUq14XarTEgCkFxApR7rLdNypBWXBpcLGtgACOoI/UAsWMkbeSU7nekLd+j2+JrN/ESCYwKxdEnMvJnslP4suyBTPoybgfAO9TtMZwVB6ylqf20NY7NLnMm9DYUhMymhBiwSkHM7bV4SqdAJlSYvSy+JNyoJRxqEPEfUvjjrzDnEsWv8MzJosZ0xFrh/y5i2mBq79VFlE3dW5CSFBmGnay/dRJB9P46eUSX3ky6aDhXupZZhbIoR1ysn0oxv76jhpqf+vi5Xs8V52Ull0e4X7yEHLlc+SV2S/633uG7IM10Ss+Bv9IhLZW4RtCCILRuWAVK+j07Y3/orZYAil5YnsS9YHFMw4hIG0ENJBXksTC8uCY3e/sorkhwOpOrZK7JspVhQHpYpHK4vIqlMCpeSusrWUYzUdPhqyo2yHlf033jZ3NHYaNJEepEnikHZOXjYyzJQg+FB+qt41Q4GyZCI+rrL53mr66KGEiu/PkX9oGdxnnYY+VZ0vGabx0blkvW/GNn9VkZzjlsXJmPZdzNrh8GGwh93+b3OXVzmVpO9pXZ3InuLlifVHboCqe0NYrCNnWONhghcesmrjuKwtfHbTl/j+Fx+RDKVBLYFRoAy2JaLpywjyW/fXq3Dgf8JEr0nKHFHxhCxFPjBBPoBDuJAJOC9sQnlWzUCVMKuSz9ukGvsoQcLuLlJjHwtngmWFB0ZOjTOTQjIqvSeFGgKcEUvCtO/XW/z9UGWS66GjzurK9zL/kEg0n35XYshhZ3SMHoohFya6V9FZJycI7vs/Bey5Rcc2ngc/QPt/nVRVirqBRb1D4U2QAwdEClIFwPAvJhnn0/7zY+AhNf8FmCPy6gHeagPs4glBoyKqzK3k8qYnjmrFUnOENhbP09eC3ww//dZaQV3UVsplW+2zVlOB2tzYokpnOnCw4twLQnEUEKyGD4OT8QnH8Irdm1FU/oiwAggO8RoKNS9QGn6D8OVaeq9KhXndIID9Z0yTAuiAt2+tYYlJwZpLJtodH786gQbqwYNcd0zy+0JW0HLppPf3b/QXKgBsCXvKrLLBa9Gexfro68OkqKhMtR1DDtyNN1qMTweuTsQVZZucjGy6P19M1t+EWj8ISmfduCCaicG7QDV/9yck/kSpPFrGN4ByKVEMG8szAnXI8nIxWume7QctMoJPNP3kPGiegEciUU04w5YJvG0/sCk/AI0YyzY+2hzDbDCF6yabltPaToB2sKJAvgT9G8aj92fmhi348yvDa/ZkT3siOTXlwa9MsyyFiJpR+0Hmhgtp6xPGrdn2v31i4mBSUohvNXJy8WJnwZhC+MyKd0ggHgbAEZf40sA0mC1ll5Sx1jmKjiS9DiVJ1eKid7Z9UP6zb72qmzHbGJyIkTPtOcnSkDz0c0m697pY2yu22Srp8ZF/VVhdjKsuGHIacXkoqwB2cd+UB8w9c5Ujvyo1qz3kjLFNGnFQaNoyoGSf+XFoXKIn3TOOZIwwU9VA5JHP4+7oe38t09OuIHj4UiFzzbmsVWNRQV3c77Q+mh5G8mgjKnCB7Dkk34d1ptp5GGGx2CTT9Tx3/tjZOdtseshhHgnukhJFRJQPzw+YciBFxzSaDY6P7F0o8Y+k4ejtYUPQ8fkc2NYvWiCQfT+LvgD0b9kGFKaNd8baIduYzuEt5Lz2BwGajFJgwitQDb48UxhEjHoOzfz5I0/wPiXC4mB+wATfKB6aawwbBb26DdB0Hv0VG5StlNGj5EH/l9OyufA6e5DTDxKGuMY6bSma794IGHm16ZPTKB5dj6YgZ4cE6oNazr7tHBL9yXrFFRRGfGQxt8VuSqEl1Uocaiq6I0JpnOfIUPCxF3gdt07WYuPZuvO3d9uYfN691f/1nW+r7jHBN3kMCs146fjzgRFzOdr+y050yRsExpWmP3CI5byn66742kp1BPRRRvruCt8LfA6krcw+6vUV9eeXvoLPwqwHbws81MCLIyZucfpaGBH60blNP0rdWjjXimjkbD12+a1MVjAlPtNZLxoPbVJQQpZ76fEKpwA7HjWlzlazY2hOqXNMvgPSUVBrq/4UtC+o0IhJ/WO4eFWC/WOR5lOS831ImtnhGnN9AQHAFy+nSAB9FBC6WZvzwHysT3CMwj+45HZErtG5q5Tt3AhkkBXLrZxCMaIVVkyfvXvLx0X8yQfrQYqcb2deepqDztkhwhxIYhPsR6tE6hz53evhd9SpmiVQbqEYJ4AQdkVCuah5UzO0epYyGFsGogsb0kTHTOwgtTEeu8zgDfra3Nj1e3VD2UIGYtdJ41IflfNy/dFFQytbIx9DS1PeFqr6NxvoQi0wTZ7jwgNsqskdVAFPscPKCKlxlfFdymSZiVub70rT7g3681jQirn4Qm/J7TEqhChlqsmsitbPnjONex5h2iZ4VBiGwt25lWXasSs/lmSKYbZKia8rvvk7/HrJ1zfotU/MSI8O8473aVMFfAeBeo2S2u5SaFzlzfezAlVuGSKmw+Loou1pdSDbxOzyZXzuMqM87pIDua7zUPv/+zfT/IpPLcbqYGSljBWJZYntcfchbOMq9TrA5bkNweBQpzs2JDNT8T0pS1JbwUT1TflSsIs8vE3deSH3nKDSe0/QdRvrW5dNaKJ+eDkIxX/y69OrX83JFP/VmBOL/WMFucHmHKTIFUXnXDaRjiAS+ikiQx3HEjyxgv/8w/FZBpzuFFX/v4fu3jgw6NHohfeu3+lmHOZPmeKIef9VhC59fX/eYaX9iHp77mfLigkrMCchWOAKtQ0UXLk99s1+H2OKGvz39Kcv03pb461SA8VBK4n4EhrynPQdTjzfQPMhYJFEoGA9X4xzk2VxiLn5jHH+d5MY1lJjKL5VyJrEhJygVds4k8VE0lfUgM5nHtvzpBjIuBtWidtdQzHtsqH+4XydB/0ybr6wIH+HuG+5jL8WNCTnfWC+azD39N0NITxeCBRffDMzyT7kaXSa88Z8O2+pu0YzbYZg4TRs7Bg3xqLptaxV8Nfva013AnF2+fI+FobtvUwgTb546u16KCr6TXH+xjhVFFW78/7/pD+5e/jBA5P5VW7W+/mERwPkpofYqoK3ytirGX3TabFkkxvsQnJ2gsdUQfuSuNAa7a2AGPrgNp19y6H2jY1vDmgkpR4F0IeZfQPVW7TCP8GEjGWXT7c5kRiWGF26jOrczUVoCm0+cd5L4UjKF4PQcWptDIkyRVP+zp+Vh92EXxnEawSOQmH6l/pcrB16B5/G3QIefHgA1fIy3d/gdpoUE3ZstvMeZuRMlJ9R5tmmwjWQWzHGbQXWVYsFQcJOMRyA6fm/XUfBQNSyeBrctRazneaX2aaUaYgYzOurD/NGLnxNcAvTMgiMNtzTO0r8mr9LW42z0tDkBbj4I1Xx7BbI9nckYjyG/Q69cs6DJki7nI4ck76F6aHMrjSw9sp4ijAk9EAqYbhBwUkCGTaDw6C1b3ycwAubhxaxnGlgHaUkGDqo91MRQuiBU6AO0nLNQPXnrohFpDTWBM1yRCrfflfOtTQ4Y6dtMR/HGJ7APgilVYaix5x2NiIxd7+6SDO/bcxXMMQl+RHqxiaiSQGSRulksFlo/ieUSibr+ppXzBfPEXLmiksdW+DOwCup+nt5jrZIJjnuRgAoky+Q5+JytYNWTjtjSwHXuLI/dKMGuhqF3R5510mlkTTeP4vivdQqH5blrdwabpgzpOxcJ5MNGsLFNOBnMwyduyJYlyqK7OQX0JUO0RqF15PEU0awETemzXGluREwmr4qi0C0slmrwo3mO8jGuKcR6H2ruljwXJNOE12R1++xamTx54pN8t7DQCXsJpKgHNrrTXHIyZ5EL3HSNZeXEDN9/FFsWL2gOBtod9m/ujSH1V7nuPV6yVu3CLuldURccNO0gxg5VZRQx/yYRfqfVNi2LPJpOQYppLeR/yLzpt5e7iWuK73t2ZTcpQiAO6qthizLQoulMoPT6vZGUZQ4ySd5EARa9EZrye7YuuPVn9/PrDe8GmS6fmW/eGI194M0XCtMT+f4u6CGU5vsuhgDN57CvhDDMAAM8JbRqtP5iAnLqSiis4qYn2MqqmPrJnoXkjnetMP5hCP72N4Ctm7zufHgESqItXP4qI2zMNEAUwSLC7yjwb5FI7VBwU5AbipKLz61LoaG2CFu9Yi93Leh3xYI0HIQKV7tXY/+ak/ihShcGKHkRPWPE+G8HYsrgFELDwAyqARlengqlLttaG9R0W1AuSmiuSJZyAxyFLlWBeqKJOaZuuJZsRIutsqwwyD5zUbBe92oCsYveyHf5c1DzycS9fujh3Wuf0sPPhLk4SxBJjTYmloBOEBxILpmGD3UHWy7TdrvhyZHNjW6fCbTrQg0J30KUTRQMd1hxHSSwe/4SjIkC8LgLvWKGSs01zqn4oy0uJE4qZiO7qT19Jfiro0R6QgeRiYi4/mZcOR5NJXkwYh9RoMZCKCBNRWZkMUhYCMu+zQbq+y+wudVUl32uKAeiHecz6utg9w35mK90azihnEsnW8CfW4fr8NHQhAcFGls1PqWikhnORKABuVwT+sAcsHpHoARE8u133V09CMgZjriZGJsZoGETk93G/rEsddv7DAh2qcBZELh/GwEawQiMeefFTa3C5zij59md44h4mDl7tmyYFcjeHVXGx+Jh5K1TRhYM26HxVKwGh4ZxUlktzDkgG9UEUXlaT2elXLt79RZw+kmYpE0yexAP/U2Wjvy6aFp5iCB1/tWh+EFedlRS2nvYSoAnrgF/b99eHIlQ0uO7CRcZrEnMHjmoY/4jzuR6GdW/DVP2v19KeycJiJ/s4WvxJRq4ZCuDyzVPWP9XGGUAHOGjn3fN52ACSkLmgKV8Gl9Iu3HlctpbFuxX5k1pPd7zjEfnytpK7zc8xheElhlqvyJ+XE92SJBNwGUc4qR7O7QFNTCC7HNk+ZHlPolUXxqjWvVvZ4ZHAp10fv67v9YXKmMyotUOkJlMT1WhkqiueaNTy9CUlCl/x5g+gidSZhTzkJSPd8AhR/ZhfSoI19XL18bn6pjYXCW06HnUxc8TNp9u5sQgu3dy3TA81cSmEPEA39Ym8WFBJbPhQ3OohPpu7Xnl/AB7lA0/qApFBS/lnaohhktXAs3CoZgwsfDa+t+30pOdIphoJRleDhFC//lI/SLVcnB5rmn1IFNJ1uioIuA2IPRRZHPOm9nGXK1XpSpr5XZSn3TyrjUbM+HW3BSfWwm2AAd1Hj2SBimm/bka7qxFBd9ITjYQ3He08xXzSxmfSek90vhI/ohGXnl5Xv39LVN+jvGNTiqSWQlBgRyBvq90WKfUYEeLTo2bIsFF/FM0qegq1Cmx875mKg+PHA3r2YrCZo6TCG7aH7f5bjvD1CccbbWRNqDzvvbtRLuFmjeL3169SyFWLip0xdcEaeO3ELecy80IH+XulfkxjGrBhRIJBcuBnpVgphtKpm/J4WVmJIH1YQ2bRJZEoj6mKJ4aOUxhJ4YTXaZ6bXTH975dzi/3YJjcQ/DNKQiu6Oiz3VkkxnzCPqXomeDS8fnvCxoHHlGzv3VXWGHuXJynstWt8McsydrM1e5jUyQoveM5BiZJ9HVHojjcW8w0M6Fpa8eAr1A0tsRqu8R3I3NyJTvF58aC2ByuK42ewbh/KtoCJowCMH1LSGJPRB5nuxNOdjUdfQxklKGeQJCno6Jph08bTh979pSo9hWju0FuLUBXGy+L9hrF20rw9ZL7zLlzpu5PuAyn51d6Vxfjx8LF8CVns+P3/Qk8S2ZM9VxFgv+D3FmptQKYlKxIxtVDuGdujv0lkOkIKlJBnQ23zXAcaOEm/HwpJa0R7JGosEOX/QOzIdVxpuEUW3HokXjMVvlv5QGdio2fkI9jIJ88M87Jl48XtH7Sk68i3/5mFJSvpu2ff6/zpCA5yN/+apNCVGAV/dHtpEjClv5sXVKksR7wrgN1nV7kVtZDf4J1+ko+jJaH+KbB+BotWswdDXvmk9q3j0Z26gySGqo4mv6+GZoLCxBlMhAs1gMuOSKguBfygakDDFMky7OqR4FWy85eP3xAq+ZuGlX/RYPW98f65yX9txSSZ1VuuZ2VLXsRrCEimCRQBil3MyCJk4paufaLLn8fEUYQfUjmeXvqORsh+tQjVJFqS4FgAsGrc+LQxp8C5tNqoZzLBDcfSTNvwQSkCtydUrbVs0ABE8hnPoDtHYkl4W4d0zT3dGf2JDH3tEjZLKxZgMvPmq1yzuVRB5Oan0nmbpj9ZvBIR7fhQaiwWqk11xbu8wJ5rI7lJ5/wZm6c3j1P4KrPEyYLcmnLVqqh63jOJDZkI8ZsWVBrscodwsSI/w1lHV9TUdZFck24Zg26h9q8dpAhV8tzndbXgIWzV5wbbsgSWF9/oJXjUI3S057WQjKVFX8tu9A9MMqzCaPgpYDr+UVJ4IiQLvqOLlIezh8GE2A3mli0oqAzeM3LI5c2k2uXZ9PSnAO0hSO2e9cDHlXFX0b/1wA9c7JxxPeSyF75howchzsEh8eIMTLoXUxlUGPEf5DIVx2srpMbc8oDrAJW8UFE5UvK9PNbUpzCdMYnGm0yWBXbW2wnV1fgTVRj2+hosQZrCtx9+aRbkCYrnPsnFySyJGiNo00+ro8viimRlcQX5XK54IETzXjykfkMK5dt/+6rXvVHnJCf7fFbLHfkWMew7tIV+GvR/pAboSQb6erZXkhT48OzUdA0fvQvWVqwdfJvEJtYT0AFvFU5k+RL+EejE3Zt7C9YFfGkfc0CJY5fdLlPQIm0vmbWyQdLhrRvjw7FUGyaxHY11nVGvVu2MEKwRF/QvQRlUqyfgnw8xm34p/xBEffeQYxTTPczncXUd3a4rj/YRKyJtiTwcVJziZFD1nhWftzyKwCqpKwu0RZ+HDr5Q9YgF8IfehxcphqxivM2GEWL7bzQFgTN3dOKSb1srkUrzDI4dCDtqzk6r7UV3ebsRp64O2jmBC5nT0rqEMgREpjmXYpDvVu7d9t7DX6MWnG7nxUmRXh217XefpDgsWsgVK0Lb6AXTVU3Dx1rUK/RkqnCPfleV+tM9ALxVnYeV3S+WVxYr1Ve4evs40PzoXI/1Neu+vRxbvbcQVdwZf8pKAi7SGLYif/3qyC4homyvfSfTbsgjI+puDfbgZ6wOiOfyxFda0MRqCjHIlEHDjkJSahSkufRRlX/1uC485nhnRwP2LXF7qLF1+qlNNYgLIUMq5fB/SdCDMz+mciJ77LfPzW/+oP1/Ft7obvfzgoOuL1xPpKJhYxlY4APuI8RWMuy/pKlOlK+tWjMQ9dax+gVzmdJp5yvpfyh/hT8v8ujx7JSyn8K7du/Vrn+vRUEaYifffDWf8Ntrqln/p2TWbwm6AVkjFnRwFe4SYujcrNXv5RuL1UizOyP27MudF3WbwvPolScAnhBzp7DeNVOCOPTlJVTsC7scVB6kPJQ+L4QSnduTJGed6ZJ9YpqTK1g/VTJGOFukhX76YIvh0404VUoTRb0JzUbXDoEYI+0Eu/x1wGQJlVkPf2QvQOQ71Fxii+eMALQ4bj+6+dVz5oofXiYHsFgdlFD8uGJZOByepYXsS+VGQlpDKNnr/L0NBNHEwrO9mnSTRs9hb6HSSi0A4beH3s5lc2mWWZirQSm9DxTj7kLdm9ZPrZMb/eEiDBVhPP2IYLhXvRnFIGaxaBN8fHMD3LMXjVHoce3brjbW7GLQEHHoXZffaLf0jDfzJIPQfdmnft0quEh8193zjfnNwSPrIg4RW8qve5DWVvfyT6KJfgfaq30e08WQnMb4A1BniozBcztINUhfeAt4dHxqwkHu+Fktmc62YeUH0CgJbA8zp+X8rzXVl/hxHug7saKRQUITrWs5IzUy51lPhhYcsdB2T4lGuHImjpniJhhy6bf7BVmWFvXnB5nC+8WVot2Lh1lbJZo3kR3x2at6nuHqMqxr7xyb2o8vsOTzi/pU2JMCMYcaOzcK9f+cPsyusw7xSSvmnr1OvW0lz1UZjG6HYRzfGsFptQdy7DYrHg7SQ0eSUy4SvUklF1HKBBaGF6EPIFRrCRDJsi0h4zCPw/YqG5EgnxW4Wwo07SAEVDtj8Q/ogKIVagj1CFFBLySxOMX07Bdk/0du/Bcw/W+cQnsECtpo/Fu6lmmE9BXSdq2lIAfta0c6wPmmFPxm0SJhF+i9bnSaY3OuSoe809QkU93Hc/YM+LHegU7g87KnHBObd4iiCI5LN9HswsvL70qMZV2TT9eVvbUNp14IgK7N0odE5TlChvhxTii010InI5Tff68xZSwpRtrj1MRujAa+Gyk1z6CO2QSO+/KykW/ocgcj3eQZog6eU+fe5vSi1/4kTmibv1QC/7WBrYs4LC9XioIhTb40OHPeBaDrN0lIOuTfsVrhjMePgSpwzCp3IMie3I87n+SPy/j68C2zdfQgnjjyZeSXUIyY77jl1b9ecZcbbjl51hLLOLAnKpXCyWtrWfm/1gt8ZFkB6zAyGuT/jwjYzRR0T+fbxu3QV0a8RZpgpPN2StuxPq/rfTCHT2sBdGQG1tSCq7hl/3wxUMcUp7urmg2zMOT1XsjH59AJ5098pPX/fVWEMZ6b6zINwO1+7wDQFTcfeM5Q5KvCWiVT6fmNOQvLyeyFT5rvw7T/9SWpXdhHC7EblfHzYKWwpyp3eVEvL3tyKdsNstaYDH3pU3O2uaGK58yEOQdMF6Oynis5M2nvboTVfPcVSdOFUzjjQ8EwVXRGiRk6vFeSvgBj30Om4pUSCHCJNTp96ZDbEP4hQZNoiXoT1vzdSrEvvUHlIWCJdyOK66g4UJFEA4SKWW/CCwVWSv7Suf8+jMWIpJxEE8SmVijLxs/+q4dwkc50UoIybkVPveo8zDFKmYQvoeyXWgDGbuR6xC+U3OIZBqhV53TNMw79jlNfj91Cttl+gI9FUTYaY+R3ptNpAGcC80yjaYBwu0kOtUL/IoI86eaqEMALzx5HoL3gkjIBWsoKRWJl2jZGRpCi2vILBnxAF1YVRIBayGtzl7xJny9iNAyphGZaf3F4RC/ujfOunBtqEQKXHrUnfWCMiz6rGNfE6K+651HNeVbquDElzBvD4z97+o44RsfxzT72UlaML5Axi3HfDW3u3uDtTx3eqMLqB0xLExWW9DcV0ojuFxwamXMwRdmGXDsTtwPXDcedmI7jnKHzA2e5wSUGwxfZIzP5Egjaw9bOj5hkMFZyH4vW08+1MbDBRFQPZOh1eOCeOcMea5zsLH1TrPTOd0z4JyG2Rr9ww7zAHPG7DIIVyg0VHgm6/HDB9Bijfy0o8cgW+taZQ0fe+TOEDZTJOV/hpORmETCzOnDlyQLB8hoyco9uXWur8BQeITGel7mVeab3F1BfZIXlVpfo1MM5Tul+uT1RVkuYmFewfQz+RH0+tTKoMrpex2x5fxXBv17bQn0aLkqaFJXrre3Ir3VW8728dcWli8nlDgwHR9H3A+JifDoNgN/dmy8gpWDQXZEDcA4tPn5ZmemXTqHGa8nTMcpeSE9qDtZ2N+jQYWSNQ4mcdBuXZQapCq9LEfDVwZybUPSCm/NuUGDQoPi4XZUJEJrfjSxH8MA5//nNchl6M91frrrhnLP/e1iVQnfUGtuLCRih82RSASPu2j4uGaQXpEUdttw4xBG/LPapQZj7wgqg9ktI87GrC6n5ioM8ruZh933rjjcr/FwZP14DQ0MFBh17PTViFt5yOLZzKoDNXRlePqyVzH/Z7dOcZ40dEuteZSgV4qTUoYR+q+Rhd42UUJYCz9kYqBh/IR9wHz3Y0+HbsCr3BPE23dAQrHxH9G6TRNmOYSJ2sYyX7IlTupEGtJZpKah3B6RaBd/kcT7/W3q3rK5D7te7O98Y+TgCPiaeAg4iYdT7Ohn2ALlRz80SzO5aVtH6lJSTPVNdsD81K6znGRyU2P3wHHc056487FHFmdbbBS3fprC4ppiShfHJZLqDwIrBp8XLT0MSg6S36qw61zVIXG8X5FnmmAhmuix2O0CMPkrRDsW6QpDdns4mXOHlkXHr6LXiy6Szcvah0cxU66Rh6y6Fq07vzLkeGsIPt+ax1y2EZhPrh8FDd1z6w5xRi7Xzls23BFByovy2i/3KWRd+R4PNw9A9OWTWMKAdV79ddOnYt/jlep1xOeHENDaSd1N35a75U1a8ejK33mUS+Mbleu3ryeB3HL/eSUqjeMfG7zGRm2WBf8uQk50jKE0HWgB36P8Ztkm6cunTFMNv3xzxhX98INnQc0iZy/2Rdo2dh+l39b7b2j5DRtB1cdzw0NhsID96+INrG/4uA760Iyzw/krguwph1ffR7oK2L0R57sJR0mkBcNGWVpj782p0GgQqHtXNaqeNAY5WteB4bevJyqIoVrZd4otxlnmOVjFrseqSWPrikwYEUm8+LM05BHuQ/vpyI9y1eW7KlvXKFM6JhkfMW697LfwmZkEDOvwgtAaMnyycd360wxM8pYdLJHhEJXr151mbqmhuxgC32ZkWh/DHEJ8lBFYFiS7cr0hQ7SSsX4dbebOCraLPepdmg9LEisW86huqdgK5tJ8pcdxTcUqWw6mJJSx39IQWN5OS7IQ+gNCfOrVuSpinnx+zrWKcfKBhE1SegpETDt7hREaC/XNTvnoFO0WitqeWGOT9ztNvLojq0W4XyjgJZ1fEYuzBG3Nf+k2cBYg9RCIF/KAs5/cWd2h2YB79JnQCVWZg6LDqmdzkeZxa5y2dAgQow7fcVj2qQmb0Im0GxGg4WNZYuQKXd7utaWn44UsGJ5IDJjo43nrSwFZDeVQJ7EIfZf0s8w63cBTTnNw0CtFKs4Q4Sjcyqrq7Y2ZfTxS2hU3cwtr196BagdV53bRmPfMmyCbVNazN2ZGkxDLzwqab0ZoIWw4/AXhbleUA3/6hKvhGjf4ZrfrQx/4GueDxgVbfQvg5REaXh1Efco2grbo6qEPVGZXCGnEjC6vfWlbgGMDq2f9Kkqq31XdzyVzW6kNzVXFbbXL7sj/SCiZdX39kTjq+mj7BTtNFVbsV9UdBxEWHafV0HC3TdyEo1gkRjpHf1IcTV2qq+mdUyH/QZhrS0vEEWc0Z66Mgttw6mtXCo6tOrXZGytO8VqxAQdP4OajUs7+xb/zgfkCmM1yG0dGKVrNYRgd/V0JEUPgmFzcWwmsHutc90u/ubyKy3OquYkPVsPQ4cE9pRgzFpDrGKGXMna35p13E21CaKrTZd2PEm4B7C0Be1G21aVPzLbXRXaPRRXr4sc4M8cNrVX8dz2QRID08ENIswn7nARGuXbP9I1b8JTfFYX337a2KBOQ2e59S8ODVsJ4UH4fxIali06UL1hQvOUUgydQkVMT48FscdW8VNoNI/NRGIMcXh5OX+Ej6bRoXIw1yQ3dloYfWyQlMp6ay5957I/s669E85JlULXb2gZFwETrsdP/UsyK+ZTQPHgmJGzKcFToP3rO1I7judYYff21xaFeARmSb3rOVPUkp37ODb5vK9YR6JuRJfBNOlhfFVkmi1ulK/Qw41dKO7pDpNVZtOEsQidR4QUGWIhx6EXBoDlOQihzWYCYNnm5il1Irome1VA270IRhsbjeIuZn2Xz1p3l/sJUIs1PnlChmqDor0iIzw4ojylYyoO/0bjYg3RAvKGldjlxmZszKei2VLw6hdL3f4//2gIydIjZ6Bw0koeMIqXQ/kBt9KZrW4PlGQSkZNFwtxB7smI1HiPdS0a0Fd5ZPDFVQnxfHBVeLBoVVdW6P0+nCgoDGVeaCjJ8GAsjf1OJEVclVcRmWwv867kNPvqQYZsTfC86WK6UVjhPmldKwbcVm2pwt0fsdSBvkRkNLAjDnWXO/CJ1WraFuccxt3hWJy6AoeeFo6Bu0XaRt6ROtAI3fKOb3Bq+UdX+S/XRmb77CHNl/YCHHbf5N1iayglsJDKQYUcq3AA8Dox22Am4JxD+ux7vqWxCryDI1hm6aepWu/N7Kw2TDg2vwjlFQWfsx8tEoF0WhXXO8qNwHPq5CcKx/8uQ+neFzhy5cM0VyqHwubRxQy6II1NY7xkT2AdQehl5PpTMnIRaob2kCegbIQRDfAGX+T0+ZjLEeUL14LnNHi1dlcBLhLM7ZFwxNxbFptJARQWOBC/PCCL2cRaTRxBjO3Zfn96+PsXuMiZb6uL4y1glQptHKPcdiZopNaE80W6OlyWcGcKk5PGvbvDdz9wyYFrtKaT/t31o3IiFdwzK1UnwM4qKlAf5/8bFx5P8+YeEtBulWAZcd5VdEkMAGAq48a0JjS1OEkYV5GSEa3xjjeIsQqE/zzFv+ngxGc8QNmQtErIDg4oj1ZS8AkV7LiFB33N0ZeCcw2GsMpA9Ul5GqKdXS7iIhxrBnR7MWOhZFnBEEK8u0JUGZorSPI3FeNPI6swy67Dr1RIVJtSNMf48KixgWkXHRR6xoaNZzt7P4itpbV6zc+vrBBP3tmHEEF45FIfpFcXmFNzBHh9WYXHI21dMJy2P0YUS8hMiYhuJ7V4EV7zY26flWGlzLlYdlnc1rQsCLVg/eS8cotsvauRPC4/VMLSR0wscW+8bwssVoUeHiz3XYQqmSTG+1TD4e/tRN/sW3GB4sjxL4NrwZlbwr2Yy+yi7ILTVzYkfd+DrdFOW/apm8+vvrgXgNTO9NU4fZ1ZMgWwN5emEB+XenffH1DONGeGVY6XLNX7aiO9bCM6fQlwvcg3xHmtLLfxQAzo6Nxh75Iptf6kXFxFJLJAFiRlcuEoo5xGtqIRNk2pGo66mCcIMHop485Tr1Vj8AjK5AHZ3qaKSSVmC4KfylWxPbqNYmxzvLjb97aKGi6NTIhidpDyO91KaILmR+MhwJb2om5omPtN4UAfasCVQHsExKZErG3AiFNIRGlVUM+RB1Td2R2FLPwfpQwTsq9jCpzUyY8XsZEkLSbUPREhtB68UtiolQn81mRYvqfewaLSLCnkPSL/SCmJ8VQ0WUY5LSg4+BW9uqT26rSF6h7/4gFD4Mp3CryeXYJoNlX4xWeGuGv8cj3PTjDNSnJJKseIDRVcDnUckyZP1IlIm+NAUG8etcu0iliWC2PjT9/RzBPGZA+TfetfJtJVe5jD5upnY0TCUwwwPzIgri5vjMsrwF/A7qLXnJ7KOpB8VBRFPlF1MH8mwZYWqPeN0L+wL2PREpvdWW1BXatShSIxxKCpJVt6pK10xoySqzGZ1Lo5gp9hCBCx/VaIMrhPVbpFScqwtwPzJ2MAQhZeTKpM4xaLpXK7WOTQ2YmJW/P/NZ9J5Tbih+T+NNZsLpwO/L+e9BVGopo9ZnWzOrgiqCqUaTinUNE1wotfb4xZ2vby3/0Pff7QxcEbrD3644u03dbOkCuK74iZPclFStl1lQ/6YYenPSrkucWrv3G3yaXaTVymrOJScn3jJont5fRZs56t+3UT7ChuCV0qPtItQs4UtWPdzzh9r6O895AeJ8ZGNsKD5ZzrX1DkxDz+BM/EBKoFzBtMHLcA8Cx1h+JsaBAeh/BQzt6GE3V9F3pdUPCM6QfItbfqcOUs1hzmenIML9jzFCpMmL71BHDF49XQ2vOu7Lo9aexN45ocOdHWNcc4nHnqsn+a0jo8L+yesYKdY0xoWdXa6tPTqEBf2J+VKElhqfrZBSb5UtGjne0l/GIg2Ob8MITkYjSy+C3tDlQtOZ1zodoV3NiQdrFkcejm2QhwVpWla8Y1spKF+c4UqLr3W9meIdPTg1kD/ZKpRe95P0K5yRxk3BH+CP9gUsctqXc5s59xZ8iQU9eWdnPcnUzvXr1mYpNwwv3djxJZnK6MvZpHZjTf2LYU88SMy+p+QQPwfITHhPk/f4hI28QK95RRDVnrczCPJEzipfjXWLo8BbRDl4u5GW8cOu8Eju4PMtQg8lFQ/ujdUPZKwQtfXn4CVGzlJnmVKbjoj0J9p6sCsxtve4CkhvionzhDTMSE9JTqC0B2ZFRHqKG6LCEqJbk4Ikr6V9XMYvz50zk3lidlyO3COY+42TlHTQo2ZjH2qZen+D5ctdsmtBbRWlm02s1X6t/s6V8w9NTKSnWv/w9k472Qnb0lU/SgfJbfJuxcnt9JKOj0mEdk9QKUWHJR99R/HUG0uOJzulFA1zm5q60qMn0CeQT/NmskiGHJPaVcedgoaYQ0ICjb6lAP7+sD1fGo8I1IaqXV9HJiIaHHly8Z0KP28vdCPSHCd6u0budMWQ3VImMoSyqQBOLFcnR1SkBqXbfZy947/Snu3PEY5qipBn85kCoGaAeMh5sQGLEaXaJrXnmVzlAIombpl/2duqrcimdDkXP3EmltSOBqGGV3stNljIneAy8zdsdlC1r3D76WxewT5pAgGgWs0onZzbbCbm/jqshAo0kDIAPZ6GaTH6VkV3gbB0TiLu9H9yigBsWbhkSpXqp28ZJm1eLn1mAN30yUFGV2tEOnotctw6vjxD56QnaqRMjDqT+eko//x1pQEfZQwhTMiqz7GOt/0G+mtufxs7bqQKZ+aT8f+aCXcv7OE5bzuMt/eQtBnelnKPMobU2c71dJ40uCvVVhJSE4hkvnssPF3IA8jUvEEJ77v3GtlPbnkCvf0LZxc7kuEbGLA4pk5TPK13ioWlUsJQSb5NJ0yldLqeatz6/OJQy+CGbnRce5LRQlJ/41nmZgpSzudG7qwxE15HDd0Ajc/LdndsxbfDJawnMbZ1rgTcl16uWo2KxtzNsr7yQVuow8XS42QTzwWX5rEkV0JR3Lcq8JDTRPKw3dCRweFM8my5UyhwRRITm/fnult8hWsdJh5A4CXWE/gQja93Wx7/hNwpnNIBsd9O85QBYY4bUa0/bpICUhsDgB3vwS1e0lEssfBd/s1bNcPaTMFCbuNJpA4/7JlpThZUo0FjHZz5+o3EDd/Op9AYMt39LN5jSO8CGY6Em5qmZihEew5W40QzK7k62c/34lltz3YoCMcojupRRz62CddNhueOUisN69B1kzEAhRUM5IRUZQ69MvQJz9hLV5y1f31KfM61vLAqX2h4hQux+jd9PXu/a4M7fOpxa3Vxo/z7hfW568vFrOWObvYBTf5WDrlIVpBu3Rge3nedj1Flce4hP9Axsog9uFjz4mwLZgahlRC5bBIHpLVnhy+qlvIbf7dLk+cmu4J5YNCUINP+D/LBswbdXuh3DdBx1BDcxV3HGs88pW+JKErUY7EzbvenpJOOVQQxHcXLtoES6eGPX36m4WpUoHKVifz0MmCQqoeLmTu/U7H4cPkzcErpSuhApeiw+04GSzdTDbm5Wtdw5KYLC3nqCr432a3xSFS1O/IpumjFls24pQuo3fgbIRnXFVB0jSv1DcGvwLC5f0bRznlxQIzAjqhXX11FCyE7TESTcWn/p7JzWnsSghXyVWm3YeuKatPx2a7xItnYR2Ysn2aG6SCPIeOX5p1xAm/gS32gv4E7RfGbSsXKq9OzRjn8hEXBINu0DiiFRdZi4O2ZiXjBKoKTJYQJ3QhMsQQzgY/gOFJGCpsj3KjYXg94gc5oMA+Vyt9Ym0NNfl/q05ZHkWo8z55jOgO1AjlZDMaZVBoKoik+9BIKvf6p2sHL7xfHU4HTsIh3bLEcq1adel3Hk+yPSoeq/dMl42Z7s07cI3vvNnX54AUPF+PeNiIEX5Vc3iJ2Bx9Rl6pI6uf/7rzGcdLJv65hrSDJaImcSYIqJrEWS6QCv28cntavUEZ1bI3iLSM3iPxbIItpUEI+2Q1Ll3A9sqd8EgWFIzOEZJ3vuCwAFe4Z7pf4rS0qLohhnFTRuD1K9bHSzbyXCoa84q3/1RO1bgTjSx9imaiervk+gn8Hfu8lMn+I9e72No70q8tGolbOQPftEWkSOQsIPUw/IRQfhjLm5Of/ukX421ACj2puNFc9Q/A/QO1Eq8z959x4tDY4mwokQNaxYT85tpGVqmNPbEZzvMW8Dmj/kj82Fe2IkDjkg0VTEl+fgUrzutnbXe4q8dzMVVg8+IgDluR5XOhqAxSuVJMVDHvFlGiOCfjfSpW5uFwVckEl4ZyJsPOnHQdy+fSkwRqqC0p1pS+YKTBpmfXNTlsfuVQpNlp1+25k51H4v9CLuMyB37Jfzq9jKDkz5mQA5lD/LE/hG9RC8WKWWtjM50tbz5JwGuGMNarqiiYuEJJOa147C1w9tpSEDJQujJAw9/qMgk/EZ8bnyspHeRy4qBM6UiBkoORLBEv+Vgjk+0dnGc/Aad9KzZNPwnfMT8+Zdp85bm0yx6X2OHblLgrHZHXR82ZuXGrdXJaBGihRvuPHbwZfmB60VomF3LEiHDMOn5UWNubqbaQK79/vvgxwyVzrEzjQzxzYNICt/rAgYWMJ08IYLY5MrNc+vxKvBvfzJzGHu1Wpi1r6tZo/UkAUSiSUAv9DHSgm1J/xoD5J0wxGgSmS5I+JhdxpGyHXIvGbC53iK6rhN60jBLyVGa++8YmVnZWio6UQG9lpcIHimjaw6NLUrVpPvFwhctbmjCyomRmGE+COhf18FMBhDudWiZoM8nLao8+b2Tc3fvhjVKBxjH4w3Mdq1Ic91GjsxMxjQqui9M4fogq3JsrPV2HUs4JJNxHjkCsHSpnXiyKjaOB8sq+tGwITTYYgZ5HnoiWAIIGb2bsp4rtOSUGyKFDlsSEKb6PoM/dF2w67fiRlO4CV7B4ztnjwA1GLLyY2IaPD3JphVPQt69aJDdz651vBBLc0+HMZfU5Ng8NXg+LRr+NmDqIuxAqEsAtEDW/0gNM56qcuLEEbAEFJgC9qD5nS69j7UHpdZQkvIWAghmCn5wZU1Gyg8fg2ZyEOKKFHP4bJ4bPbRqPDhIS8CMByQkg+AaggdEkOAvVafnyCc2H2pBUqL6D1bl8Ei4VsYGlOwdKV/prIKoKUgG1jH6kfxx0hdX2QMbmAJCaGk5GR0prYG6g0JvJScCCEMF8sQiUgKSAXUtmTudexNe3ZidCBAu+9uGUMFADoFS8TjXohyEeKECZy2W21uWQyuT8DGckNRuJXGa/hHv6fYxXWpa/nFXMRDsbNeUhlSx8lrjLCUsjxULWefVMevoCz7AsU/raWd8+whpHUSJ+k10njA8yP+IoIr2vdIHVPI9NEgsEzXJiAJqwjvejLon4/ObgjI9HuIXjlnqqRBQSucfDdsTDJG50D6zjHE37YetJNXPj4DJ2PqH8o/zI39iQGZ+Ypsv2I4/MyNaqn7wOjFmhaiGMDPMbV/vi6hVc0LK0EDng+kBZTo5kTxJ5jZiyRDLNLeE0d5yoaYgugjCdbEEc6M4yQ4lqvr89Oyni2x2Jy449Dl5InVNXj/uzpdVDgWxckAWxxQEGNbDS53axTPdIWS3x0NTm8g3UkUiJdWGhZVGlPlfgUvS+L3zAPs7dYVIditRL3oPl4dcN9aWsnLDa9KoUvds8OBmN9zJEp+RMCPv22BRTogDOxjR7wBORyERNQuZUBPc/NXhWzNNRDny0qDymUEbBQC6UvmXxw10ZiA7Sc6lsbM13b8p6AW5MOuoxr5nlwjV76SbidKSd6Ryoq6AaBK6Jbh+hDJSO0qTP9B0bjbhWqkta45Nok9IUOYcOCTu9wNVwnBoyIVbnQQNaJkjnzgkGn+PjXZXhxeTfqvL6aT1jhUVVNKlcH6+fFpFDddtayGScYcD0XkSSDWuc3PFaQhYGdzMjC+bvsfI33F2pVE//VPZ/WomEl3qWcUyOIg2TdMZP6X5XOO3EDTfu+LCEOE8mHocIIc21IojHDjBEmIBYPrsZSiydh9vU13vRNVbK1AQRyfD0RCF0XXoz5UzlgbruaFfbyLSmO9B2I8UGdv7uB4a3E73kKo3CNThRKRUkO7knthT0F4dIPCg6sIDiWUSoDBtJEGVQLfZQ3+stx0p8n2WKKGNKPR+vEFZe2EbFhTUVX+7ECBhs/OrmDGooMnkpmoxygcqb2kKARhqCFrKZcvKw+KEFuD4LdSaxEFPD5ngSVmhd9pVc4YOymQJZlqMN+C7kxGGIvycLS0GnnCg6l08kJpI0iRu8IiT5FGbjRa/lzknr8d4wf1nmvlil5XsmlIZYD1JYaF3Ddls+3Zp7OPPCH1xTuMVBu8Lj6V6wSy7PYqeOW1+8uNyfKveQBuf/JqomJHsxdwZMWKBsuXIzaDGoUY5JXT3xCqGzNYDyYt3r5lEP+YkzpzERWs4RlvOIkuujFtWBVmecinVMlryo2LV4RMHZtGVgJXYokctxz7+vvm8GnfJY6MA7Gwo1Sj5Xop2GmWPCGZWtyFxb9jPvUsFsfjHpg8qjhpJ8oXRYm5yVQ9SrwnGaBVYwXhBBqyWus1f3+wjQhpmehh9lAtFTIWUMMQC5i0rEQWPxichY4/fZ0Zp3f0Wd9hpP53c21HMl8WzxDznJfAM27VrOGAczKIE/LsXBzVQ1BZquCZlbf7N3zt6/68wsWxhmeVM6rSbxeFH7ulkTFWC0DSKATA1SUDRJnUwyJR4ZFlrinTGXF3+ZzVv+u229m0Qfv3Ku3Za7+M2/B8ETSQQhi6OHDAzfAwmmEnPgKHxNNN0km8kgO/ALoUS4JGLTancq1/z+pidbZBh421NzOCU2N5rJzbNzYagQGoejFjRS2eVglVdAmCQzRWiGu1wDfJz9nMMxzkqWP+bPJEAIBsnYnvNgGWqjdK6mBfqLiCT8lA9qcjJF4SxB34ppPmMsFDppBrMbF47gQrIgPDfFyIu/zNBYpHbxRjNah0CFNPpNr0XMseyKcyAVTGf4ky7iUQi2MFzQ3AVY5oSmiqxc5SpNMFwFUK43Xo8GWXj0dw1SUcvvvnwc6eVknGqZ6HjqtEcG/yiYQ0zVqd0aE0cDC8cwXoF8sf3zCpyyKyKoWcxkZt1VLetOuN4H5IxdkSV2QOuZzzHGDvo0WKdJlP02IZBAObKLOIGcF4uvRrlx29MEWDlZNUKlpaAF1N+LXhmDsRVmDMl1gQq0EkgaY5CkZQ64YgsBNa4ENYKzMqFngrPjR9JBNc7qusIN8gA6O6ftpzP/+8jlusq54OEaaKEBj7wFBGeSe0Ttymf9CHQmalwn33QzghoX2lpy/CxEWxVTIhQwJjPEeERm7NWwJjCdlsdGWsfKpmhdcZqM6f90iO6HuhKc57gwYRNJ9L4OM1aITz4BKqOpkEArImFuZAbAXxHsfrNNpIcshWc7E1YehmjTV8yN1q5GTmOofDfaf96DiBUkz7KPzID9ZURwJMJAnEYvoOMsuBISjCOzs2d8G4ImzPcmkkRQymnvm5iIebaKGbiQ+5FIduNTJ3Ggbk50CnR5Kg2GIKEHJILb/ceiJCZzl0QEISCeXmL00vsQMzFKR0uAyo81mlUK9+xwoXMOFnup5FmmBa9LvYgkndWiDpFnzXncsP2wu9UeTCqqwZXrQBSABCq76/i3NI5gouTkSoaCwMyJS/FaZ04eZWHQJ3R+YG2/f46OSO4yCVYhb+UmLs5GzCPjtOD02UOL/KNCQo1ammeFCQAKWZ3mPP+7E8UXKgobw344S0Fx8eT8oU3H6b1TDMXWEOW4smNLy+I+hRo9xRF2BwD7wIjcSh4huLgKT9AKZqG3p/7Fej9roPsYQ+9Ujx1hicokdhQQO5RBMQk9pYhomf/EL+GgtZ05VVYeVGpr6FQdKGyI1XfNrEUN//5VhBVvuQxGM9nlqUQuopFDr0oJEDRC2+6W9m/PeHkQnhZCCh6OJ7iZ6okZbn02fH1VOFIrNu11KMsTKK2VbRCJjhahIiVrEk2jyrq2qze22oLCovFeglXSz/HjSsV5FLbGE3TOXa7isYMtS9RWuEdFSXRN08z1SibMpjEP02LIa+nSOd0/nHBXg+PcZmGVntcSAuiv8zm1CN66H/euLaDAhohehoKrPa7LOmQx43GxcVIJicVT/3qpbd1oF6YhHMcLY7yIwXIfV4RRiIgxL68hWt9QeMC6rHBS8GTZ78wxZUDxdaL/Mp9SpCXGN0jZQQSovVziIzuC1RucGNu7B2a9h/6a+pI3SagkVOEbgwm4rNwRpMtbNpObSumBlosDQomqTQ8TOc7u3PbSieLLjmKhqaEWX1NPZAlm5uit5tCQkaX7dgf8kivTnV1PSa3gLMCTY23iFpIgNY8Lifa37tjhbVls0VbrEbiYzBMLSyllDqWyRLHUbgZZU8+/EHeIAY38om5qOK8ANULBurfKxnVhfDfaucoWHNZAg2Vc8RrjxOGSe6ma5lyxfLK2fqiWvTnPXLGFpQRpgt22h7YnRK7K15NvvOhwq1ZAKeOSHZeuNWHEkt3GaDzuttMoMusKXOxA98/p2pJBMEC6WDKEWAqp8TC2rZYsAr7LjUCpRm53ndKETyXyar6xgKHSR0mU5yyKOW2p3nYeX3waILut0g19Emkqmo97vA/b7Mw3XzvTIobeuBpjxwUHVNDuQvwa6EiOfvFMfCZixcv/SA0MkFxfF6zbot+eQhmCNudNfWXdS/8/tPzOGkKxIbAHYrqBecrRYWYSHgqYX7c5dPl1KGx+6H7r9ilZVDvP7PUKBqkkaVqB0ecq4XEr0032ozWfBAXM3xPg3x6izMHeKLoYO0/XRjHcnEddBRAGM6EP1EfewqBYzN1YilCVeCyhAqOTCfkEJM8TsOCwWTd6PjY6xOmkeOCDFGVnEbFgnh9+4ZplRng8+gBaTNe5sWwAzYG786HkEd3lybjRwqw2kkDVla0FRmgZd2uQ3NsaUUsoQUpiMwK86upcnThS2xNrbYfc9NvRF5PvpqGSIi267GE7I6WjlQ5gXjx+bOSUouIsPXFa0baRcXuvdNXLjh/rCPo/dFs6ouHF7bs8evNsDHUpWBI1jW65mhTcvWzqlu000YCsviwsZYSYda7paKBDjB772OODEb5FZ7w8ZSQpxsqwVp7yZ68ZOfmE6QkcutuVHgGn3/tHENX1ZPpqJHtsHtkRAzRS/9hyQaHNwOofWO4EeTd4HoNXldkgtvOOqwuQd6lofzpR/NcrjDgRj4V9k7VxFxxhbFeomx24zdTxrstdSMjduwR8MOmerJHkAV8GlM3Gv1HIk40MlQWR1JCdWBBSQAQbr3T8huv40xMcoTlG0sDNyKXNsk+XaRD2kEQ6NI22OR23mQ5mbrpf6IdVbI0MFZJVHN8TRyeaSDe53pDWY/8G02rTomceusZ+4hcEaiqZcAOPQMgBSACehOfnxwOa9POloPt7gv2unI/ua8Fx0kJmBR4FpGJYqQSXXgf68aORVui5Z086M+9DRDPTiiv1TJz2+FTqQgahiJLG6f4b3GbmAKGxqh0m+43ipm67DQJ6hhZLqe5O+Z6G1H9RxTofAv60TxfBeCmIM22epwdDkQXBmNvYVhrxOy7nD6HTb6LoD8Ax7q9oN7KSdwaKdKm6NL0stY7wLSQI2rMGZmNakuGOcURR/yTaQ3FQSgUG/xaNI1r8hCQYHxvFLJOlSu1qawHOM9MVvJ14jpKBKFJls7DtQMwiboDWCUzoIIWCljClz55BT3czw7eSWCQ/PMSndOnZZ7zZaHLlJVkZHhXcf8fa8gj3THpG9YweKB2dBadBEA6GIWgSh9nkUQJoiz2sAtukV3XZKMnCGwfD/TEH6l5cCJj1Y8sRWkxkqj9nXOiSLa6H1v/XPFVY/K4KHn8QB9VOQf9PnLac4lSWqnSi9EYHI9AICHGNbrzLR6j4PluDQ/m2WMzf+ZApnAOtZXlvxPUI7XjjsQZNINtljITmvPzZINlIHnn4/z7ABI/mwrhrx5aLrjnZ1mfVQQRsptJw75DSMWIqm6HkCOJYi4JaVoeZcCQC3DImyLpsxQo3r3ow6MkbMd153qi+1RQ+wTCqKUTIQDRX9jSuTqakL9zsEmZZcOjiwW1x1hMhYBix4U2uWYFuieS/2aJsjHWxbd33PLooi4kxX9N456b0ZniPyv7jnUfxtUnnPdPWHTsNHQXBu5uw5H8nD5tb1OciBK0YWHlHSBMwoDBiNbBp6QIhmkHbYbvEozkxcLsxt8dClXuZYzgb1fD6zg3Gj/qZQQRkit/u72AUmhqhoI0O44ZOtmkwFvVCLI6bImL/ipKP9mYoapxi3BN5KEYwzos/ZvbIzLwgKF3FcxPk+x4mMDppCKQ2+SIW15wM/PQKykheoBUOftw1p2KFeJxHi5ddYOGjXInf16HcLNQkPMUM0RP1sxZN2celiyd5kWySj54+vgt736483oUxHQQiK4lAMhB/i2SgfNzMBVJpxVqi5PLH6Q1vWSxhdiPj9dm1t599ZtAKiBPCAG0TVIqfg72zEj5ZVf+HsGXuihz6IPQkaOidy4hVbzhjKc8pnfmsKynuY7NhnDfNaSw4jFt2evvcWWd3Dy0/shW/XItXhxGWSSc7crVtkTP1WnNnxKg0sp6yxHOuPTF9erp4I5EOsnrDTLQuZaNeL484zfrSXtLw19tpoNrV5bBsrXpuxvuqMYwX5xksYyr3pCAPNYv7KJVkK11cjWFwiQlaDYHfBNQOFhwPLHai0oXxTACy5uwZ8ydyrSz9QY5QGvliSLMaR2NP1hrCL40WoVa1mBM1huQ8kOWksyWWgHXAH3dba1kpLTSIvq+UHMVr3N4PVdPB/h0f/aCRIKe1f7HXjE1dqB70NZwosaIp/0Rc2sK29d3f9skpM6SXO1Buzh+u2oOAeTEJzSRjQITEfsGQRwbWNi3u+VxXe9COz7ta338ado8NyWnyUs0nw5kXB/pTIqiPW55gmRHxinH9pXWLhn3cggJuzTs6uyOiF+j+o5TXoVNDwD/XJXobY1inRIb+Soj03sGfduJBFmXNVbohTk+RW5FxnMzpkv45WA0q1jBGqs2tTZ6jlA+dkega+vNc8SRekOTBQL+5wzd7X6HqzaE/toBXWJgenoELTTgkLVd9l4JMKtfuJP1X8lY9JKuqJ8LaAtyr2oRIPM+bAiMGFLC68TcKCD6cdGh4SdqJnf4r/NPCw5ShXv83ekwY/feJVV8U6gmuA8kvzK2d6+E9rO2DvkMCtXzkrDjj63WuyeB3QhjE/LQ3sJjEL0MoDlYDmx/HPTYKphYXpPD2yVVgzsxQy6Z/BHPqxzPLY/nO6xvCsJqHf4ZI2gaPCIztRzOuKIIElepgIt5ITMDqJvYacQxRonswEgtcCOSl+51v8rDrqBefGO9nEPniQ+PKLKU4n+fhzAX1QP0nirzmjS/vP8f8nUhBnv/z7o+zF8fMl0ckAIjgE+ufALb4Mlaio/+r2LIEfvwW0b8Y8eQAb/u77wHcp5F+GMC5y3g7xKMLAtxmyB6+M8AzGnBOwWUgoJiF2MOiaRBc88TM73jtx6uAMDO3RpLUwTV/cGO51ixgiEAdbz4pBKbgmkL0XEHZWIGtAOB/o9SMv1RA66jgZvNa6q9uLJ+kXIpErpR/rmj9xGk0Ub/gtZd6AHDrPktrkTYT1G3+WfGWJaYm8kL4rQp7bgkrEYD+zGN+UrQEuQy7q6LIR+h8IymXV0KieX/+Wx8+hQv1CTamcxuXnwdCmismOogsQ2BC4Yl4zCJBufLMC5RcUDRAawe/kjFiCS6GdL7JjI/kSghbzGVkhPOCXyeQ6xM8PlKbYdxkiZtVxE3l3Hb0evHK0JJFYlPwKMO2TuTmFLcynKgrXiSr33mXsi3hNyehSKuVDtyBmBGxMmBRysYN4FkqlmIF7eAAD7NSsHyqrRJTrOBciMranSGyPM6DWzF82r86hOh70Sd/rDDwiw4iChK49XEU+FUKnP8ot8oig6AihIz+CqBdpYK6sXWgAflDBiztfjkvLCivO6PFasgnULE4bhV+TrJ5GNXA413v014xaH9ojy+4YtDO1DXFwPhHBtEDyCH6YJ0H+xkHErWF6BNf3AJA7yS1D1mtPPix+DYiykrDBMdevJ2HnkKunUHzj4t9hqwHGtCD6AN1yBRw5gMt6vaAHkL/YsGCdro+Ri9VHNfMPRjXyBZyiWxUlILoSkYgbTN8JsoCLIYnsBIyIXfULADshm2QCrnQAovhCYyDlTALyuAGnIhnxlvLQYGji83p0vOHP3fYcMzmmNA8fZNgbIi5cfzOPbGX8RfGEOqwGMm8Fm69ZXOuG4g7P4eLPYaFugV1r+KU0iPQdnCPOn+qoGn4MDTikHOPy1wSMX68gkHw1uo0wmMFcp78l2U2kS5fmxm95s1kgOh5RBSGOndBc4MigcDSuUQEnrOQbzgQOH+D5zuViXznKXK53NouaPzOq09hPY740NKRCxMXNf5tOM2ynxmU68R8nwceAOR1fHsON6WvapoaRJQvAlfuLVTI/BdgbEJ9zh+NWoffcVtbgDgVZEOb8XE+t4h83DaZ39KAegTT6W4CL1dY46jbS7rV/OqgyIrbxgoJAuosj2e84PNioqYImf99FvV3wTw3sxyjFOo6Y1aEPHAbI2btvEDKhUyWwIw4yHwXM//xaoaYhsKMafDtEzr/7zeRwJ7xyJsiLv0c+NYZV758Y0ZhZOJQdigwesQvYlACSkHvtIJAzGJwdSChsOQUF+LFRsPYcnaLqZ80CW98OMWrcUbEhZJdXyrbqk9bHcDd1bhDAQa/7dY/AmYRXdYzhPKA3LlEBll9hJDjjTou/DIWj/nBZcbK6mn4POEOF6IDBxjbLq13cHqQ7Xpyvr2C1GTHYiFk5pw/Y93KkKT4+HKz4DATaWRW4s4q6s7LpXhgplpe5nsx4e9DvaknxgKApiMGdUmGm1Bvw6oLoFWjavMtn552VTZM7dSEkO0zYQQ3TAR3yCYOawwmnuvMF2hM+9sk8ExnEqWNyCRJWxKTgn+sFlRo/5i0a39Fsdykc7rvahNDvu+3tmci3PevABH9IGWrgWsTwrHShNGdMBHe7pk48pGYeHGTKVCr7TEJrPlgEq1vjUmyfhpMCv+jVVChHTRpN3+3RDDpQu5bb2I49z3y48tEv+9PwZuvG9VPWtSNxVkxx9Xj1RPMJ/TuC9aKUrNxiU7b4vFkXgv+AC7OLMqsGqLSeqaYIzzR+3v3ciUieSxH0GAb8YXL76qeeLpzpaQlh6C0CHlCjnidH1rGkmgFlSZkkOnx+8/CazfZha+dig8iTsT/BF7ta1er79cA/VKCkUBvSaLtG3FAPd6KnS1MfZNI4jJKqySPDrDa8nxO8EPYQfp87NqpbwxeLlc4u1ytns+tRVxoi0CxIREMwQLZXC2UvHNAnNArVeW9GnMVsaKlYAjqldI1Yw9HyKkaNEZjiiS2ntN2PUlHsaDNPLsVut5bO3+NV/8dgcuF/3seNHEBcMVDU3onXZ7qrL7zWXQFhegmKpdJbAOLD3GT+pb6CplolFocWbBcDqYnnN0KXYt2/hqv/umiw57/bfgJL9AVD+xOspyomSVHPaV08TtwngB4hoiJ6CX96kJry0DPW4rl8LgT0Z+WSsdZ+QdZmpMbggSLv5IRkIhqoLEKAK8PxbYi8YaCy5zVHLNr4Hq2zX5KOp26Q/X4UMKsp8Hkjm4GBb4LRG21pBAVa28XIqb88UGrxhnFJB2s2FNrpfanc5AIiDlvZ5pHIRtLIHN2bm4+sa8Ase3NpljTq9/Tcphalvo7/fxFtA3g4tlbXOwB/dOjFz6NwnT2N0/8ssQ7mXGxAdSzaRPHR3pgq6VWMf6sPlf3x3CMPeewDjxSMnlLraxOa24y2czigjPzbufI/WCVzLrBu3RxSw0sn9uSH3hA8NPPHM59N69bGcart+Rhmq1xULvHzdFNrzHccTC2pwKmIaF+WrG6QumKPV+T3QBPeFV9AOSWFRs66KdfktMkc9SFYi8GddoHKSTihT4zcZTtZxTmJ1VyCq8TYMGePS2GCCBtg4vWAKumbWm0mXRsmH1yO2B4Y9KulIHCk46P86mvW6xkHrP/sAf/S422BAFEqjIVKUhyyBQDfzMWKdew8MSHpU6JWoYywNY2SFGPgz6zA/Ez5adk9wgXnRWqc2Citdd3R5H7iepOyu6DSAvQMlWpk6gWHjA47u1BlVOoS9FqGJtJzpJyAXQHymmyTVVROYLxPE9KCwMilN8p5cNaEISliwZBGQ2mtPMm5VbY9RIEhHPC+pv7BSS/FwxYWo3SiCNAfgVSUcVUQEROgUiLnr3GmkQQLoQB7EWW4NRHDyT1mrw6xkbkPFKBefUtNHDF4LPo2faD1TjzZuwl6rJ/KpEwU5VYIIJ8wZzUkOqmwmQZIRypvBhmY5QyKtnZQFMFfAaF/XcZBz+c0qAoZ38p/Npb+a8IVM1JLBQCxQf5MVQCzbZsjO69hO9wF9h7AW00e6N7DOSkz4t2rqMmv1ei89ykFGJ7JGMvyinERVKX3xegURichoEL98bei2I2DGb2ZUN+6tfYr6ED8NC5FRaQo+jwwfRehPSmatyFwaEz/jkoPnNwI5ZuMUso26NKAOvYWs/WxA47DkjNSEhSHZHMe/VLTZIbhRchdtvZex2kxvOH3GstbUnjXY8zysIdplSa7LQAjtsnBwqurfS8C5JVmaehE13tKhgV7F+S0sIrR5nsS2shh+V3AwIKVQfyxE6SSEYvIDDOxkp2kjH+GqggckGZRxSMxJSekBmmqXKQqWnSaCA/uDLDClfi/OGY0l73jqV7ChRCvcv39Gp7O+l9LM/KY7p5L2OvDDNDLki+IbUdkSmHH+3A3osPfsgTGMz4ZzDgz7mQ0NGGumjluVJizarzqaW+kZdM1FeEdHZBp7HTjkNe7/gjlVsImw9ugSk2/drWM5uQewLl/nCi9xntOjdH0tsgYcRVEl9UECPWa1uOTqhbvwjLhOtMp68PKR8oa6vu6KpRF9JQ6SvkPviXk155RX/DWCFp0J3tgezkeZ0vLuLuopVxrYZQVKSOUzhfwrxJt7elNNKjpK0KBi1BJq9C8vut5u2O5E7aqhGO/6Ra3IU+44MqcQPD4eCSHMqom7ZASIDbYAqSceI3Gibb1TI8ZlHJAq3RcPQmucdtCy3mlhyV8/in7y3XdY26al8Q+b5cynnzB9BHYCUTsX/vh4lJYoTjbHFPuNi+GTe3f+JltsTnWMyz/ZjmaUD587gOY0f14u1qqLHFmvoax7ugap2rLoxcxVx1HZv+cgpdY0iO+8RGrK9l6ccQxMIGgwEl9N53Eg1HMGNIHFULP+JuexwqJmNqnvKMlHc34NAoKUhn7CMxpz52k24SFTHvsxP3nTtsMBQIUrT3bcB7my44ZTfP/RNPL87JQce5tnV88INXarIaL4+DQq7jEn7D2oFdrC0KsQkT4D1HzuQ1wkylx4xRKaKwxjan2426T7l9D2ZYg07WfMz8fe3uTfJLd22P4l5gxEzghs9TDRKuHVqD8/pgnnn4tI3dNrkJhGo+7oMKEFA7gALohzrApiiAMVeazQuKQIFsEh1Yqa1NK7AqVN4vrrz+X7C9lfhKOJLGPExxtPXYqf4/HYqd+JKmfUiFcULTOeBiPX9dJcfknApu5sr1IWS0cyGHndd7m8CJeqMDAxD+8d6rjU3J0G0/eOPEd6QIa00fRLf+0d7s4n7Wk5B+VZze7OG6vTIcS59jB/e5dyico9d1AeWuh8V7W8/C/rDDLgZJHet1yAd8RIPBnLn+ox2uc02hGet7EMdTkj9Mo4yRUEL1hJRDSZbNPvCBs/axQH2gCF9Cir4dBgeBCrx5kxVZ8UKXLceo2ghUd4kqpL9sYx7ysiOrQ5m0qWDqXfBmt2+cZlHa2VwpF7mpyHh7TcvnkcDwBwi+LKNRmDB1e+vJD+5ToI5pl4CCUOQlcHGXtVd2d+qRLAwdtZeoza5DtezKH4FIK+4iyE907RggsXOQQcnRw7Th/JYVN/vx0j7VVFJ2Fn0XlA/Mc7V4ucmChnUOGKQ1AOp0Y4ndmcrGMID8eJvkIxWlWS+lBdGb1dZ7kBkzK4BARR4VdlyBCZ+r3DMFlohULG3Oypg2cyAO856CeIPreUDOk3zNmPOSLNeYXe4LoN898UjUPccZA9VlIPEDsmm0o3ANNX9ElUgGDkkfNFVlr7NSFdmUkZAaUvFz5xhunZvbsH0FKGeEKfSgES2vl7FoG4D/SNsZhH3g6IVmuCdm8hjcreICV88IHgFz4o559ltOYs85rAMP0gY3nsCbiafhRpxF22COKS8s2ies6Ab5Z1TIwxjClxw5v8pnWHge60sEuRJt8VQRRVw4DwHLIH+xrGfxYJQRhbwvWNMBKgZKAY4w0cCvUwb5NrI6gF6NOAsmkXKf5YLOIKGmom2AAmRpSSRXERIRi1Rki/EikiFUpzUnSgNjIzFyyASocyBKshUIJ02nDDyK8i1Sk3qxkoYRZdqo6lAJD8iyDUQf7/KiXI7DlxSoiQulkWUv3PJK1Hh8pVjtgSQSrBoJqlBBi4eCAlyN8MYak3Mz6DmjWph5zo1avZULk/Abqmk5ISx4S80FJjHj64jg1FdKMsROMcmD+56gjhCQUQhM4l6n0gLvmMCjSFh9x8/Cr3XV3l/x2QgJG6IxozGUzFUhVTth348uLjLzcCPxhBeRygYqw6BRstM1Qalg1MLkGel0JswKQyhbI4BCXwhxADImDb+kEGW3ouQRj3chF7JWUOtGDe2iw8xd9hrU+HrNvopIYBgmo0G8M8oMlNy8tKtF9s+LQPS0sMoIrWVG0jNlFUWlKd2sncKvhkGM371Y6IDUofQrEqEGq+Ai1aRhgHlpX4h+iX42D69HaO+4T4ZVOEf60hcmBIU7BeweVWVCRL0wWWH0PC9dL5qb53GDqUreKIJVwmuubAynBtHKY4MThsdZY25Fu/7sP4m7gGFRhzAYm7rzqcf6AFwVszKVAIu3TOgmwe0amKhA4UscgJonoxLoQkc3awQXdM7Tc3ASCc97VRSQn4IaGmcdnVXaS/DyFTB6K6lEOsZ4BKYBM2DY8rJxRCpdWk4JK8qUKThtFOpWfOMORwt0kpQGTZsLVtv6FwArR+Unprikzca2XSr2o/egtgMekAHRNIL7Z+oJZnwY1HXZkiwdX8ZaQCYeNuBTEh0nW5DlAd8beUVMoMoLGXDokRzjy0G1cj9JK/m2MEEzu5KQaSDAQxxwmJocHMfhae7QCiNvgqabuPPw/hJepqbEzDKRL4DJ7aTCPj9UGbK5OwG1FNbRVYCmQoj1GCqlIkGSEaGeTzoNRUipLFqDSoMSgzcGGkEiH7HV+AeNJDUPOEOrsH0+wrhYdjppDTTLIEtMo97S6mrNdZruFzsFMzQFPtG6WIisprycUNpwdxR3DkrrvpDkrJ0ozj+thQROedSkTBgOhPCi+IYvhSkUtRziWVML3PxmbrrE6jatmeCMeXEgbX66KegzFFRXj/In5/EEnwFxgCRfcGGNtr/CU/JQ2O76IPAuWAt5F5iqkHs3Z/gNnRBugqBlUCLolKgaY61xtGZGu7UScKrfWgKc2acg3Xvfink12K1JL/b/6iTLnl+p4UO6ZFvsZDa8wxQfCaFH9TfDwOXSHcVPRt0K1V0GWDUDuh2HeWdSv3FtC2BtlyFhWfoTKAF4D8RqlydhtaRP7IYwCv1wi8KdpHZPgbXH43ccnT6qTtK0wxzSnSVQ7TTwISSnBjGMjCSSDG3RJVrheJhXpMtcWHsY+Eq1U1AQckq7Jjp8y7UmbmIXCX0rxB47y3CuLT3FE6nDxupJ6dTmu6k0JYQO7YnxxLvJVi6nGZxvpkPSHMLb5YQDt5r7Yb1Jqqfpm3tSg+AXUx8tQ29QN+bjlGYWuwVk32k5XhiwB45sgsj1uZ7Dj8Ndgjn7Xf8yUv6J4pDgxw079ZdxzTBak09+8I3w4//nELirwrPlrDvm53huZvsnF1sbGPS6baJBM0xx1D1LrPPZJ18ss8FpJ21UpFifEmeVOuWMi2w7Fl8oc5VuR68Qm8zu3ul3wzXXVSDKpzPVSJWq1KhWa8go9b/YSzdq5h9Ci1YvjdauzRjjjLXbsAnG69Dptbf2Au/YAP73E3nHemCdX6B3EGSJrAgkQhKRl+8zQXv3cSkoKmHKFBWcSlNVU9fQ7NsQg4cwRdiy0uWh8LhZG9v8OpR9J0MjjnXnh5+VbWVtmD3flWuBQyebI0+PlTv7rjb/XEhlbr3x1jvvfSBIkWpgXSekjw6OWnAtRwqhpPMbPo9jNrI2NTO3MrbE6FEZKkU9gdPjm+YJRBKZQqXRGUwWVw8PM8X9ZXQ9sq2Or4ec0GeIjdDOkkfIHhb/jPU1PQho1H9Ye+zNZAEIRoB7JIQlPctGolGeyuQKJRYNF71H34PRZLZYbQA+ak+r9rUcTBrPU7L+MsDD4aMiLo3qKD6srk+3H6IcZeeBPLrJPO2djy32y7+AAjvN3AH0cUNY4UV0n/77u+hiii2uEalSp0mbzlbb7LTLMdvtcFyXydVn8LsTDjhYY6bMptdivn8ccrjxJZRYUslZs2UvJUeppZVeRplllV1OudZY6ncZesjm+RybnK5vgCwhZmfRyRXnTyG7iyYmUNU0Fp19c3+9UXnUVab9PrqYFqtNOe2c4e1MFHdr0C3YOSq/xBZRWs87eZ79K8KlJ3hFeY6McCc/DILkDgLXcv6lqncBUmtlN1L7kV55kfZb/eyPVJqLyT7nNWm62+jbps8LFFZJftgR0i9EYuFL8WXkX0XiTl+5r9wF/pdKe0hdAcuOvcD2Llyj502yEkGMRXsxCcppT9qrwfAIVU46pp1XKOSilgxukTOczHVBUSxQMhLqXzZqjrHi9Rh6Pnar5gzGvqlaRwwaUcTXQhtM9hOmqpNUmNGUSXtZV3pgYeOZpflgW5nJgYxBZmLoQybxUR+Gz3WbxaRlKCnLLz0UcPXN63GqvlMmg+9jJx4q6n2JUx6M46WTYTwNrkWm562eKsq/XnnjtukMOSdV7+eS4iN7j9H7qTzWH/vrk4/k7/R5uqRtkxQ3gymX5r4Q/rnOy6px2mwpCvlSvblcsWjzn/UlY4Z0vi8aNl6fSnryn68Iz96UvhoPTKSZUnBdNdmOiYqaono9dm6e+yMgS2i53YQdGwYmP3rJ+3UaYwHSZsiSlxW4Nk2UnzFgQ5pzdBiicIjeCvL1F9FRxHEzQSKqgeOUHRSC+fjYRNNN+Hw0jfF9135jND+nWKRrhke1yZuiejsOiyMimJ3bdQ6yL5XEo2M/WFxYW4iTaIMM+WauSA7RvSAVp26si2Dt1iKYiFmWweqtotH3QaVyzYjovRTGmlFZ1DKMqNCn4rEndk19WwMQYYKkuOkMJovNkY+G3wAAAAAAAAAAAIAQQgghhBBCCCFECCGEEEIIIYQQwhhjjDHGGGOMMSYIgiAIgiAIgiAIgtDpF6nrmqIo3cNK1/uaXR7aiKS46ZylB99cLgyOL4o3DZcYZ+Wbaj4rx7HBdzvl05tFp2SbzCkCTE4fnR2n2SzhS+d5svN+QfZcvjE9Zd77+efa4ZpH+zTMW0fksKta8t/+IrbMbiXfdKXafwSrm1Va3TDIadcoWSgUvWfsOM3kDr9TbHXlwz243Hqee6dD9lWZ4Pj/76eHFvG1+7PhMzSUW9/ff3VW84R3LvSrbAWy45pbP8gA", oo = "Excalifont", En = [
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
], Ki = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), Kl = /* @__PURE__ */ new Set(["Excalifont"]), ql = /* @__PURE__ */ new Set([...Ki, ...Kl]);
function Ul(t) {
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
function no(t) {
  return Ki.has(t) ? t : `'${t}', sans-serif`;
}
let Ws = !1;
function Zl(t = document) {
  if (Ws) return;
  Ws = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${Vi}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = En.filter((r) => !ql.has(r.key)).map((r) => "family=" + r.key.replace(/ /g, "+")).join("&"), n = t.createElement("link");
  n.rel = "stylesheet", n.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(n);
}
function Ue(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let n;
  for (; (n = o.exec(t)) !== null; )
    e[n[1]] = n[2];
  return e;
}
const Ql = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function Jl(t) {
  var s, i;
  const e = [], o = {}, n = t.split(`
`);
  let r = 0;
  for (; r < n.length; ) {
    const l = n[r].trim();
    if (l.startsWith("<!--@meta")) {
      const a = Ue(l);
      if (a.background) {
        const c = Ql[a.background] ?? a.background;
        o.background = c;
      }
      if (a.originView) {
        const c = a.originView.split(",").map(Number);
        c.length === 3 && c.every((h) => !isNaN(h)) && (o.originView = { x: c[0], y: c[1], zoom: c[2] });
      }
      r++;
      continue;
    }
    if (l.startsWith("<!--@frame")) {
      const a = Ue(l);
      for (r++; r < n.length && n[r].trim() === ""; ) r++;
      e.push({
        id: a.id || kt(10),
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
    if (l.startsWith("<!--@block")) {
      const a = Ue(l);
      r++;
      const c = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        c.push(n[r]), r++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      const h = c.join(`
`), p = h.trim().length > 0 ? await Jr(h) : [];
      e.push({
        id: a.id || kt(10),
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
          markdown: h,
          borderColor: a.borderColor || void 0,
          borderWidth: a.borderWidth ? parseFloat(a.borderWidth) : void 0,
          borderStyle: a.borderStyle || void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (l.startsWith("<!--@draw")) {
      const a = Ue(l);
      if (r++, a.tool === "shape")
        for (e.push({
          id: a.id || kt(10),
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
        let c = "";
        r < n.length && !n[r].trim().startsWith("<!--@") && (c = n[r].trim(), r++);
        const h = c ? c.split(" ").filter(Boolean).map((m) => {
          const b = m.split(",").map(Number);
          return [
            b[0] || 0,
            b[1] || 0,
            b[2] || 0.5
          ];
        }) : [];
        let p = 1 / 0, d = 1 / 0, f = -1 / 0, g = -1 / 0;
        for (const [m, b] of h)
          m < p && (p = m), b < d && (d = b), m > f && (f = m), b > g && (g = b);
        isFinite(p) || (p = parseFloat(a.x || "0"), d = parseFloat(a.y || "0"), f = p, g = d);
        const y = h.map(
          ([m, b, x]) => [m - p, b - d, x]
        );
        for (e.push({
          id: a.id || kt(10),
          type: "draw",
          x: p,
          y: d,
          w: f - p,
          h: g - d,
          z: parseInt(a.z || "0"),
          rotation: a.rotation ? parseFloat(a.rotation) : void 0,
          locked: a.locked === "true" || void 0,
          groupId: a.group || void 0,
          data: {
            tool: a.tool || "pen",
            points: y,
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
    if (l.startsWith("<!--@image")) {
      const a = Ue(l);
      r++, e.push({
        id: a.id || kt(10),
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
    if (l.startsWith("<!--@edge")) {
      const a = Ue(l);
      for (r++, e.push({
        id: a.id || kt(10),
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
          midpointOffset: a.midpointOffset ? parseFloat(a.midpointOffset) : void 0,
          curveOffset: a.curveOffset ? a.curveOffset.split(",").map(Number) : void 0
        }
      }); r < n.length && n[r].trim() === ""; ) r++;
      continue;
    }
    if (l.startsWith("<!--@text")) {
      const a = Ue(l);
      r++;
      const c = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        c.push(n[r]), r++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      e.push({
        id: a.id || kt(10),
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
          text: c.join(`
`),
          fontSize: parseFloat(a.fontSize || "20"),
          fontFamily: a.fontFamily || oo,
          color: a.color || "#1e1e2e",
          align: a.align || "left",
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (l.startsWith("<!--@sticky")) {
      const a = Ue(l);
      r++;
      const c = [];
      for (; r < n.length && !n[r].trim().startsWith("<!--@"); )
        c.push(n[r]), r++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      e.push({
        id: a.id || kt(10),
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
          text: c.join(`
`),
          color: a.color || "#FEF3C7",
          fontSize: a.fontSize ? parseFloat(a.fontSize) : void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    r++;
  }
  return { nodes: e, meta: o };
}
const $l = 180;
function vn(t, e) {
  t.push(e), t.length > $l && t.shift();
}
function Ze(t, e) {
  if (t.length === 0) return 0;
  const o = [...t].sort((r, s) => r - s), n = Math.min(o.length - 1, Math.max(0, Math.floor((o.length - 1) * e)));
  return o[n];
}
class _l {
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
      const n = e - this.lastTick;
      vn(this.frameMs, n);
    }
    this.lastTick = e, vn(this.cullingMs, this.pendingCullingMs), vn(this.hitTestMs, this.pendingHitTestMs), vn(this.edgeHitMs, this.pendingEdgeHitMs), this.pendingCullingMs = 0, this.pendingHitTestMs = 0, this.pendingEdgeHitMs = 0, this.lastRatesTs === 0 && (this.lastRatesTs = e);
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
      frameMsP50: Ze(this.frameMs, 0.5),
      frameMsP95: Ze(this.frameMs, 0.95),
      cullingMsP50: Ze(this.cullingMs, 0.5),
      cullingMsP95: Ze(this.cullingMs, 0.95),
      hitTestMsP50: Ze(this.hitTestMs, 0.5),
      hitTestMsP95: Ze(this.hitTestMs, 0.95),
      edgeHitMsP50: Ze(this.edgeHitMs, 0.5),
      edgeHitMsP95: Ze(this.edgeHitMs, 0.95),
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
const he = new _l();
function wo(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const tc = 14;
function cn(t, e, o, n, r) {
  const s = e.find((d) => d.id === o);
  if (!s) return null;
  const i = wo(t, r), l = tc / n, a = e.filter((d) => d.direction === s.direction), c = a.indexOf(s);
  if (c < 0) return null;
  const h = t.y + i / (a.length + 1) * (c + 1), p = s.direction === "input" ? t.x - l : t.x + t.w + l;
  if (t.rotation) {
    const d = t.x + t.w / 2, f = t.y + i / 2, g = t.rotation * Math.PI / 180, y = Math.cos(g), m = Math.sin(g), b = p - d, x = h - f;
    return { x: d + b * y - x * m, y: f + b * m + x * y };
  }
  return { x: p, y: h };
}
function Bs(t, e, o, n, r, s, i, l) {
  const a = i - r, c = l - s;
  if (a === 0 && c === 0) return { x: r, y: s, side: "right" };
  let h = 1 / 0, p = r, d = s, f = "right";
  if (a !== 0) {
    const g = (t + o - r) / a;
    if (g > 0 && g < h) {
      const y = s + g * c;
      y >= e && y <= e + n && (h = g, p = t + o, d = y, f = "right");
    }
  }
  if (a !== 0) {
    const g = (t - r) / a;
    if (g > 0 && g < h) {
      const y = s + g * c;
      y >= e && y <= e + n && (h = g, p = t, d = y, f = "left");
    }
  }
  if (c !== 0) {
    const g = (e + n - s) / c;
    if (g > 0 && g < h) {
      const y = r + g * a;
      y >= t && y <= t + o && (h = g, p = y, d = e + n, f = "bottom");
    }
  }
  if (c !== 0) {
    const g = (e - s) / c;
    if (g > 0 && g < h) {
      const y = r + g * a;
      y >= t && y <= t + o && (h = g, p = y, d = e, f = "top");
    }
  }
  return { x: p, y: d, side: f };
}
function De(t, e, o, n, r) {
  const s = Math.cos(r), i = Math.sin(r), l = t - o, a = e - n;
  return [o + l * s - a * i, n + l * i + a * s];
}
function Er(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return Bs(t.x, t.y, t.w, e, r, s, o, n);
  const i = -t.rotation * Math.PI / 180, [l, a] = De(o, n, r, s, i), c = Bs(t.x, t.y, t.w, e, r, s, l, a), [h, p] = De(c.x, c.y, r, s, -i);
  return { x: h, y: p, side: c.side };
}
function $r(t, e, o, n) {
  return Math.abs(t) / o >= Math.abs(e) / n ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function ec(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, h] = t.rotation ? De(o, n, r, s, a) : [o, n], p = c - r, d = h - s;
  if (p === 0 && d === 0)
    return { x: r + i, y: s, side: "right" };
  const f = 1 / Math.sqrt((p / i) ** 2 + (d / l) ** 2);
  let g = r + p * f, y = s + d * f;
  const m = $r(p, d, i, l);
  return t.rotation && ([g, y] = De(g, y, r, s, -a)), { x: g, y, side: m };
}
function oc(t, e, o, n) {
  const r = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, h] = t.rotation ? De(o, n, r, s, a) : [o, n], p = c - r, d = h - s;
  if (p === 0 && d === 0)
    return { x: r + i, y: s, side: "right" };
  const f = 1 / (Math.abs(p) / i + Math.abs(d) / l);
  let g = r + p * f, y = s + d * f;
  const m = $r(p, d, i, l);
  return t.rotation && ([g, y] = De(g, y, r, s, -a)), { x: g, y, side: m };
}
function nc(t, e, o, n) {
  const r = t.data.points;
  if (!r || r.length === 0)
    return Er(t, e, o, n);
  const s = t.x + t.w / 2, i = t.y + e / 2, l = t.rotation ? -t.rotation * Math.PI / 180 : 0, [a, c] = t.rotation ? De(o, n, s, i, l) : [o, n], h = a - s, p = c - i, d = Math.hypot(h, p);
  if (d === 0)
    return Er(t, e, o, n);
  const f = h / d, g = p / d;
  let y = t.x + r[0][0], m = t.y + r[0][1], b = (y - s) * f + (m - i) * g;
  for (let R = 1; R < r.length; R++) {
    const C = t.x + r[R][0], P = t.y + r[R][1], j = (C - s) * f + (P - i) * g;
    j > b && (b = j, y = C, m = P);
  }
  const x = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let S = y + f * x, M = m + g * x;
  const I = $r(h, p, t.w / 2, e / 2);
  return t.rotation && ([S, M] = De(S, M, s, i, -l)), { x: S, y: M, side: I };
}
function Fs(t, e, o) {
  const n = t.data.points;
  if (!n || n.length === 0)
    return Wn(t, e, o);
  const r = t.x + t.w / 2, s = t.y + e / 2, i = ko(o), l = o === "left" || o === "right" ? t.x + (o === "right" ? t.w : 0) : t.x + t.w / 2, a = o === "top" || o === "bottom" ? t.y + (o === "bottom" ? e : 0) : t.y + e / 2, c = (m, b, x, S, M, I) => {
    const R = M - x, C = I - S, P = R * R + C * C;
    if (P === 0) return [x, S];
    const j = Math.max(0, Math.min(1, ((m - x) * R + (b - S) * C) / P));
    return [x + j * R, S + j * C];
  };
  let h = t.x + n[0][0], p = t.y + n[0][1], d = (h - l) ** 2 + (p - a) ** 2;
  if (n.length === 1)
    h = t.x + n[0][0], p = t.y + n[0][1];
  else
    for (let m = 0; m < n.length - 1; m++) {
      const b = t.x + n[m][0], x = t.y + n[m][1], S = t.x + n[m + 1][0], M = t.y + n[m + 1][1], [I, R] = c(l, a, b, x, S, M), C = (I - l) ** 2 + (R - a) ** 2;
      C < d && (d = C, h = I, p = R);
    }
  const f = Math.max(0.5, (t.data.strokeWidth ?? 1) / 2);
  let g = h + i.dx * f, y = p + i.dy * f;
  if (t.rotation) {
    const m = t.rotation * Math.PI / 180;
    [g, y] = De(g, y, r, s, m);
  }
  return { x: g, y };
}
function Rr(t, e, o, n) {
  var r;
  if (t.type === "draw")
    return nc(t, e, o, n);
  if (t.type === "shape") {
    const s = (r = t.data) == null ? void 0 : r.shape;
    if (s === "ellipse") return ec(t, e, o, n);
    if (s === "diamond") return oc(t, e, o, n);
  }
  return Er(t, e, o, n);
}
function Lr(t, e, o, n) {
  const r = Rr(t, e, o, n);
  return { x: r.x, y: r.y };
}
function Wn(t, e, o) {
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
  const l = t.rotation * Math.PI / 180, [a, c] = De(s, i, n, r, l);
  return { x: a, y: c };
}
function ko(t) {
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
function Ns(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Ye(t, e, o = "bezier", n, r, s, i, l, a, c) {
  const h = wo(t, n), p = wo(e, n), d = t.x + t.w / 2, f = t.y + h / 2, g = e.x + e.w / 2, y = e.y + p / 2;
  let m, b, x, S;
  if (a)
    m = a.x, b = a.y, x = r ?? "right";
  else if (r) {
    const P = t.type === "draw" ? Fs(t, h, r) : Wn(t, h, r);
    m = P.x, b = P.y, x = r;
  } else {
    const P = Rr(t, h, g, y);
    if (m = P.x, b = P.y, x = P.side, Ns(t)) {
      const j = Math.hypot(g - d, y - f);
      j > 0 && (S = { dx: (g - d) / j, dy: (y - f) / j });
    }
  }
  let M, I, R, C;
  if (c)
    M = c.x, I = c.y, R = s ?? "left";
  else if (s) {
    const P = e.type === "draw" ? Fs(e, p, s) : Wn(e, p, s);
    M = P.x, I = P.y, R = s;
  } else {
    const P = Rr(e, p, d, f);
    if (M = P.x, I = P.y, R = P.side, Ns(e)) {
      const j = Math.hypot(d - g, f - y);
      j > 0 && (C = { dx: (d - g) / j, dy: (f - y) / j });
    }
  }
  switch (o) {
    case "straight":
      return rc(m, b, M, I, x, R);
    case "bezier":
      return sc(m, b, M, I, x, R, l, S, C);
    case "smoothstep":
      return ic(m, b, M, I, x, R, i);
    case "step":
      return ac(m, b, M, I, x, R, i);
  }
}
function rc(t, e, o, n, r, s) {
  const i = Math.min(t, o), l = Math.min(e, n), a = Math.abs(o - t), c = Math.abs(n - e);
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
    bounds: { x: i, y: l, w: a, h: c }
  };
}
function sc(t, e, o, n, r, s, i, l, a) {
  const c = Math.hypot(o - t, n - e), h = Math.min(c * 0.5, Math.max(50, c * 0.25)), p = l ?? ko(r), d = a ?? ko(s), f = i ? i[0] * (4 / 3) : 0, g = i ? i[1] * (4 / 3) : 0, y = t + p.dx * h + f, m = e + p.dy * h + g, b = o + d.dx * h + f, x = n + d.dy * h + g, S = 0.125 * t + 0.375 * y + 0.375 * b + 0.125 * o, M = 0.125 * e + 0.375 * m + 0.375 * x + 0.125 * n, I = Math.atan2(n - x, o - b), R = Math.atan2(e - m, t - y), C = {
    x: S,
    y: M,
    axis: "xy",
    min: 0,
    max: 0
  }, P = Math.min(t, o, y, b), j = Math.min(e, n, m, x), U = Math.max(t, o, y, b), ct = Math.max(e, n, m, x);
  return {
    path: `M${t},${e} C${y},${m} ${b},${x} ${o},${n}`,
    labelX: S,
    labelY: M,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: I,
    tailAngle: R,
    sourceSide: r,
    targetSide: s,
    kinkHandle: C,
    bounds: { x: P, y: j, w: U - P, h: ct - j }
  };
}
function ic(t, e, o, n, r, s, i) {
  const { points: c, kinkHandle: h } = _r(t, e, o, n, r, s, 20, i), p = lc(c, 8), d = Math.floor(c.length / 2), f = (c[d - 1][0] + c[d][0]) / 2, g = (c[d - 1][1] + c[d][1]) / 2, y = c[c.length - 1], m = c[c.length - 2], b = Math.atan2(y[1] - m[1], y[0] - m[0]), x = c[0], S = c[1], M = Math.atan2(x[1] - S[1], x[0] - S[0]);
  let I = 1 / 0, R = 1 / 0, C = -1 / 0, P = -1 / 0;
  for (const [j, U] of c)
    j < I && (I = j), U < R && (R = U), j > C && (C = j), U > P && (P = U);
  return {
    path: p,
    labelX: f,
    labelY: g,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: b,
    tailAngle: M,
    sourceSide: r,
    targetSide: s,
    kinkHandle: h,
    bounds: { x: I, y: R, w: C - I, h: P - R }
  };
}
function ac(t, e, o, n, r, s, i) {
  const { points: a, kinkHandle: c } = _r(t, e, o, n, r, s, 20, i), h = [`M${a[0][0]},${a[0][1]}`];
  for (let P = 1; P < a.length; P++)
    h.push(`L${a[P][0]},${a[P][1]}`);
  const p = Math.floor(a.length / 2), d = (a[p - 1][0] + a[p][0]) / 2, f = (a[p - 1][1] + a[p][1]) / 2, g = a[a.length - 1], y = a[a.length - 2], m = Math.atan2(g[1] - y[1], g[0] - y[0]), b = a[0], x = a[1], S = Math.atan2(b[1] - x[1], b[0] - x[0]);
  let M = 1 / 0, I = 1 / 0, R = -1 / 0, C = -1 / 0;
  for (const [P, j] of a)
    P < M && (M = P), j < I && (I = j), P > R && (R = P), j > C && (C = j);
  return {
    path: h.join(" "),
    labelX: d,
    labelY: f,
    x1: t,
    y1: e,
    x2: o,
    y2: n,
    arrowAngle: m,
    tailAngle: S,
    sourceSide: r,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: M, y: I, w: R - M, h: C - I }
  };
}
function _r(t, e, o, n, r, s, i, l) {
  const a = ko(r), c = ko(s), h = t + a.dx * i, p = e + a.dy * i, d = o + c.dx * i, f = n + c.dy * i, g = r === "left" || r === "right", y = s === "left" || s === "right", m = [[t, e], [h, p]], b = l ?? 0.5;
  let x;
  if (g && y) {
    const S = h + (d - h) * b;
    m.push([S, p], [S, f]);
    const M = Math.min(h, d), I = Math.max(h, d);
    x = { x: S, y: (p + f) / 2, axis: "x", min: M, max: I };
  } else if (!g && !y) {
    const S = p + (f - p) * b;
    m.push([h, S], [d, S]);
    const M = Math.min(p, f), I = Math.max(p, f);
    x = { x: (h + d) / 2, y: S, axis: "y", min: M, max: I };
  } else g && !y ? m.push([d, p]) : m.push([h, f]);
  return m.push([d, f], [o, n]), { points: m, kinkHandle: x };
}
function lc(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let r = 1; r < t.length - 1; r++) {
    const s = t[r - 1], i = t[r], l = t[r + 1], a = i[0] - s[0], c = i[1] - s[1], h = l[0] - i[0], p = l[1] - i[1], d = Math.hypot(a, c), f = Math.hypot(h, p);
    if (d === 0 || f === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const g = Math.min(e, d / 2, f / 2), y = i[0] - a / d * g, m = i[1] - c / d * g, b = i[0] + h / f * g, x = i[1] + p / f * g;
    o.push(`L${y},${m}`), o.push(`Q${i[0]},${i[1]} ${b},${x}`);
  }
  const n = t[t.length - 1];
  return o.push(`L${n[0]},${n[1]}`), o.join(" ");
}
function cc(t, e, o, n, r, s, i, l, a) {
  const c = 1 - a, h = c * c, p = h * c, d = a * a, f = d * a;
  return [
    p * t + 3 * h * a * o + 3 * c * d * r + f * i,
    p * e + 3 * h * a * n + 3 * c * d * s + f * l
  ];
}
function dc(t, e, o, n, r, s, i, l, a, c, h = 24) {
  let p = 1 / 0, d = o, f = n;
  for (let g = 1; g <= h; g++) {
    const y = g / h, [m, b] = cc(o, n, r, s, i, l, a, c, y), x = ts(t, e, d, f, m, b);
    x < p && (p = x), d = m, f = b;
  }
  return p;
}
function hc(t, e, o) {
  let n = 1 / 0;
  for (let r = 1; r < o.length; r++) {
    const s = ts(t, e, o[r - 1][0], o[r - 1][1], o[r][0], o[r][1]);
    s < n && (n = s);
  }
  return n;
}
function qi(t, e, o, n, r, s, i, l) {
  const a = r.data.edgeType || "bezier", c = Ye(
    o,
    n,
    a,
    s,
    r.data.sourceHandle,
    r.data.targetHandle,
    r.data.midpointOffset,
    r.data.curveOffset,
    i,
    l
  ), { x1: h, y1: p, x2: d, y2: f } = c;
  if (a === "straight")
    return ts(t, e, h, p, d, f);
  if (a === "bezier") {
    const m = Math.hypot(d - h, f - p), b = Math.min(m * 0.5, Math.max(50, m * 0.25)), x = ko(c.sourceSide), S = ko(c.targetSide), M = r.data.curveOffset ? r.data.curveOffset[0] * (4 / 3) : 0, I = r.data.curveOffset ? r.data.curveOffset[1] * (4 / 3) : 0, R = h + x.dx * b + M, C = p + x.dy * b + I, P = d + S.dx * b + M, j = f + S.dy * b + I;
    return dc(t, e, h, p, R, C, P, j, d, f);
  }
  const g = 20, { points: y } = _r(h, p, d, f, c.sourceSide, c.targetSide, g, r.data.midpointOffset);
  return hc(t, e, y);
}
function Hs(t, e, o) {
  const n = wo(t, o), r = wo(e, o), s = t.x + t.w / 2, i = t.y + n / 2, l = e.x + e.w / 2, a = e.y + r / 2, c = Lr(t, n, l, a), h = Lr(e, r, s, i);
  return { x1: c.x, y1: c.y, x2: h.x, y2: h.y };
}
function cr(t, e, o, n) {
  const r = wo(t, n);
  return Lr(t, r, e, o);
}
function ts(t, e, o, n, r, s) {
  const i = r - o, l = s - n, a = i * i + l * l;
  if (a === 0) return Math.hypot(t - o, e - n);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - n) * l) / a)), h = o + c * i, p = n + c * l;
  return Math.hypot(t - h, e - p);
}
function Xo(t, e, o, n) {
  const r = Math.cos(o), s = Math.sin(o), i = -s, l = r, a = n / 2, c = t + r * a, h = e + s * a, p = t - r * a, d = e - s * a, f = n * 0.4;
  return `M${p + i * f},${d + l * f} L${c},${h} L${p - i * f},${d - l * f}`;
}
function Bn(t, e, o, n) {
  const r = Math.cos(o), s = Math.sin(o), i = -s, l = r, a = n / 2, c = t + r * a, h = e + s * a, p = t - r * a, d = e - s * a, f = n * 0.4;
  return `M${c},${h} L${p + i * f},${d + l * f} L${p - i * f},${d - l * f} Z`;
}
function Go(t, e) {
  const o = wo(t, e);
  return ["top", "right", "bottom", "left"].map((r) => {
    const s = Wn(t, o, r);
    return { side: r, x: s.x, y: s.y };
  });
}
function Sn(t, e, o, n) {
  const r = Go(t, n);
  let s = r[0], i = 1 / 0;
  for (const l of r) {
    const a = Math.hypot(l.x - e, l.y - o);
    a < i && (i = a, s = l);
  }
  return s.side;
}
function uc(t, e, o, n, r, s) {
  const i = he.isEnabled(), l = i ? performance.now() : 0, a = 8 / n, c = [];
  for (const h of t.values()) {
    if (h.type !== "edge") continue;
    const p = h, d = t.get(p.data.fromId), f = t.get(p.data.toId);
    if (!d || !f) continue;
    const g = s == null ? void 0 : s(p, d, f);
    qi(e, o, d, f, p, r, g == null ? void 0 : g.sourcePortPos, g == null ? void 0 : g.targetPortPos) < a && c.push(h);
  }
  return i && he.recordEdgeHit(performance.now() - l), c;
}
function pc(t, e, o, n, r, s) {
  const i = he.isEnabled(), l = i ? performance.now() : 0, a = 8 / n;
  let c = null, h = a;
  for (const p of t.values()) {
    if (p.type !== "edge") continue;
    const d = p, f = t.get(d.data.fromId), g = t.get(d.data.toId);
    if (!f || !g) continue;
    const y = s == null ? void 0 : s(d, f, g), m = qi(e, o, f, g, d, r, y == null ? void 0 : y.sourcePortPos, y == null ? void 0 : y.targetPortPos);
    m < h && (h = m, c = p);
  }
  return i && he.recordEdgeHit(performance.now() - l), c;
}
function fc(t, e, o) {
  const n = t.x, r = t.x + t.w / 2, s = t.x + t.w, i = t.y, l = t.y + t.h / 2, a = t.y + t.h, c = [n, r, s], h = [i, l, a];
  let p = 1 / 0, d = 1 / 0;
  const f = [];
  for (const y of e) {
    const m = y.x, b = y.x + y.w / 2, x = y.x + y.w, S = y.y, M = y.y + y.h / 2, I = y.y + y.h, R = [m, b, x], C = [S, M, I];
    for (const P of c)
      for (const j of R) {
        const U = j - P;
        Math.abs(U) <= o && (Math.abs(U) < Math.abs(p) && (p = U), f.push({
          axis: "x",
          position: j,
          start: Math.min(t.y, t.y + t.h, y.y, y.y + y.h),
          end: Math.max(t.y, t.y + t.h, y.y, y.y + y.h)
        }));
      }
    for (const P of h)
      for (const j of C) {
        const U = j - P;
        Math.abs(U) <= o && (Math.abs(U) < Math.abs(d) && (d = U), f.push({
          axis: "y",
          position: j,
          start: Math.min(t.x, t.x + t.w, y.x, y.x + y.w),
          end: Math.max(t.x, t.x + t.w, y.x, y.x + y.w)
        }));
      }
  }
  const g = /* @__PURE__ */ new Map();
  for (const y of f) {
    const m = `${y.axis}:${y.position.toFixed(1)}`, b = g.get(m);
    b ? (b.start = Math.min(b.start, y.start), b.end = Math.max(b.end, y.end)) : g.set(m, { ...y });
  }
  return {
    guides: Array.from(g.values()),
    snapDx: Math.abs(p) <= o ? p : 0,
    snapDy: Math.abs(d) <= o ? d : 0
  };
}
class yc {
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
    yt(this, "history", new El());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yt(this, "listeners", {});
    yt(this, "_suppressEvents", !1);
    yt(this, "_collabMode", !1);
    yt(this, "clipboard", []);
    yt(this, "pasteCount", 0);
    yt(this, "nextZValue", 1);
    yt(this, "_minZ", 0);
    yt(this, "quadTree", new Pr({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    yt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    yt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    yt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    yt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    yt(this, "_measuredHeights", {});
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
    for (const a of this.nodes.values())
      if (a.type === "frame") {
        const c = a.data;
        e.push({ id: a.id, x: a.x, y: a.y, order: c.slideOrder });
      }
    if (e.length === 0) return;
    const o = e.filter((a) => a.order != null).sort((a, c) => a.order - c.order), n = e.filter((a) => a.order == null), r = 100;
    n.sort((a, c) => a.y - c.y);
    const s = [];
    for (const a of n) {
      const c = s[s.length - 1];
      c && Math.abs(a.y - c[0].y) < r ? c.push(a) : s.push([a]);
    }
    const i = s.flatMap((a) => a.sort((c, h) => c.x - h.x)), l = [...o, ...i];
    this.presentationSlides = l.map((a) => a.id), this.presentationIndex = 0, this.presentationMode = !0, this.selection.size > 0 && (this.selection.clear(), this.emit("selection")), this.emit("presentation"), this.presentationGoTo(0);
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
    const s = this._computeSlideViewport(n), i = n.data, l = i.transition ?? "pan", a = i.transitionDuration, c = e >= r ? 1 : -1;
    switch (l) {
      case "none":
        this._transitionNone(s);
        break;
      case "fade":
        this._transitionFade(s, a);
        break;
      case "dissolve":
        this._transitionDissolve(s, a);
        break;
      case "zoom":
        this._transitionZoom(s, a);
        break;
      case "fold":
        this._transitionFold(s, a);
        break;
      case "cube":
        this._transitionCube(s, a, c);
        break;
      case "pan":
      default:
        this._transitionPan(s, a);
        break;
    }
  }
  _computeSlideViewport(e) {
    const o = this.resolveHeight(e), n = 40, r = e.x - n, s = e.y - n, i = e.w + n * 2, l = o + n * 2, a = this._containerWidth, c = this._containerHeight, h = Oo(Math.min(a / i, c / l), 0.1, 5);
    return {
      x: (a - i * h) / 2 - r * h,
      y: (c - l * h) / 2 - s * h,
      zoom: h
    };
  }
  /** Pan transition: smooth viewport interpolation (default). */
  _transitionPan(e, o) {
    const n = o ?? 400, r = performance.now(), s = { ...this.viewport }, i = (l) => {
      const a = Math.min((l - r) / n, 1), c = 1 - Math.pow(1 - a, 3);
      this.viewport.x = s.x + (e.x - s.x) * c, this.viewport.y = s.y + (e.y - s.y) * c, this.viewport.zoom = s.zoom + (e.zoom - s.zoom) * c, this.emit("viewport"), a < 1 ? this._presentationAnimId = requestAnimationFrame(i) : this._presentationAnimId = null;
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
        const a = performance.now(), c = (h) => {
          const p = Math.min((h - a) / n, 1);
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
    const i = (l) => {
      const a = Math.min((l - r) / n, 1);
      a < 0.5 ? this._transitionOverlay = { type: "dissolve", phase: "out", progress: a * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "dissolve", phase: "in", progress: (a - 0.5) * 2 }), this.emit("presentation"), a < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Zoom transition: zoom out from current, zoom into target. */
  _transitionZoom(e, o) {
    const n = o ?? 600, r = performance.now(), s = { ...this.viewport }, i = Math.max(0.1, Math.min(s.zoom, e.zoom) * 0.35), l = (s.x + e.x) / 2, a = (s.y + e.y) / 2, c = (h) => {
      const p = Math.min((h - r) / n, 1);
      if (p < 0.5) {
        const d = p * 2, f = 1 - Math.pow(1 - d, 3);
        this.viewport.x = s.x + (l - s.x) * f, this.viewport.y = s.y + (a - s.y) * f, this.viewport.zoom = s.zoom + (i - s.zoom) * f;
      } else {
        const d = (p - 0.5) * 2, f = 1 - Math.pow(1 - d, 3);
        this.viewport.x = l + (e.x - l) * f, this.viewport.y = a + (e.y - a) * f, this.viewport.zoom = i + (e.zoom - i) * f;
      }
      this.emit("viewport"), p < 1 ? this._presentationAnimId = requestAnimationFrame(c) : this._presentationAnimId = null;
    };
    this._presentationAnimId = requestAnimationFrame(c);
  }
  /** Fold transition: two halves fold shut like a book, snap viewport, unfold to reveal. */
  _transitionFold(e, o) {
    const n = o ?? 700, r = performance.now();
    let s = !1;
    const i = (l) => {
      const a = Math.min((l - r) / n, 1);
      a < 0.5 ? this._transitionOverlay = { type: "fold", phase: "out", progress: a * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "fold", phase: "in", progress: (a - 0.5) * 2 }), this.emit("presentation"), a < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
  _transitionCube(e, o, n = 1) {
    const r = o ?? 1200, s = performance.now();
    let i = !1;
    const l = (a) => {
      const c = Math.min((a - s) / r, 1);
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
   * Compute smart guide alignment + grid snap for a drag operation.
   * Sets `this.alignGuides` and emits `guides` event.
   * Returns the adjusted delta to apply.
   */
  computeDragSnap(e, o, n, r, s) {
    const i = this.snapToGrid && !s, l = this.smartGuides && !s;
    let a = n, c = r, h = [];
    const p = o instanceof Set ? o : new Set(o);
    if (l) {
      let d = 1 / 0, f = 1 / 0, g = -1 / 0, y = -1 / 0;
      for (const P of e) {
        const j = this.getNode(P.id);
        if (!j) continue;
        const U = P.x + n, ct = P.y + r, O = this.resolveHeight(j);
        d = Math.min(d, U), f = Math.min(f, ct), g = Math.max(g, U + j.w), y = Math.max(y, ct + O);
      }
      const m = { x: d, y: f, w: g - d, h: y - f }, b = -this.viewport.x / this.viewport.zoom, x = -this.viewport.y / this.viewport.zoom, S = this._containerWidth / this.viewport.zoom, M = this._containerHeight / this.viewport.zoom, I = [], R = this.quadTree.retrieve([], { x: b, y: x, w: S, h: M });
      for (const P of R) {
        if (P.type === "edge" || p.has(P.id)) continue;
        const j = this.resolveHeight(P);
        I.push({ x: P.x, y: P.y, w: P.w, h: j });
      }
      const C = fc(m, I, 5);
      if (h = C.guides, i) {
        const P = e[0].x + n, j = e[0].y + r, U = this.snap(P, j), ct = U.x - P, O = U.y - j, nt = C.snapDx !== 0 && Math.abs(C.snapDx) <= Math.abs(ct), Q = C.snapDy !== 0 && Math.abs(C.snapDy) <= Math.abs(O);
        a = n + (nt ? C.snapDx : ct), c = r + (Q ? C.snapDy : O), nt || (h = h.filter((J) => J.axis !== "x")), Q || (h = h.filter((J) => J.axis !== "y"));
      } else
        a = n + C.snapDx, c = r + C.snapDy;
    } else if (i) {
      const d = this.snap(e[0].x + n, e[0].y + r);
      a = d.x - e[0].x, c = d.y - e[0].y;
    }
    return this.alignGuides = h, this.emit("guides"), { finalDx: a, finalDy: c };
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
    this.viewport = Xl(
      this.viewport,
      e,
      o - this.containerOffset.x,
      n - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, n) {
    this.viewport = Yl(
      this.viewport,
      e,
      o - this.containerOffset.x,
      n - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const n = Oo(e, 0.1, 5);
    if (o) {
      const r = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = Yo(this.viewport, r, s);
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
    const r = n.h === "auto" ? 100 : n.h, s = n.x + n.w / 2, i = n.y + r / 2, l = this.getWindow(), a = l.innerWidth, c = l.innerHeight, h = Oo(o, 0.2, 5);
    this.viewport = {
      x: a / 2 - s * h,
      y: c / 2 - i * h,
      zoom: h
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
    const i = n - e, l = r - o, a = this._containerWidth, c = this._containerHeight, h = Oo(
      Math.min(a / i, c / l),
      0.1,
      5
    );
    this.viewport = {
      x: (a - i * h) / 2 - e * h,
      y: (c - l * h) / 2 - o * h,
      zoom: h
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
    return Yo(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return Ol(this.viewport, e, o);
  }
  // --- Node CRUD ---
  addNode(e) {
    var o, n, r;
    if (this.history.pushSnapshot(this.nodes, this.groupParent), this.nodes.set(e.id, e), this.quadTree.insert(e), e.z < this._minZ && (this._minZ = e.z), e.type === "edge") {
      const s = e, { fromId: i, toId: l } = s.data;
      this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.has(l) || this.adjacency.set(l, /* @__PURE__ */ new Set()), this.adjacency.get(i).add(e.id), this.adjacency.get(l).add(e.id);
    }
    e.type !== "edge" && this.updateFrameMembership([e.id]), (r = (n = (o = this.registry) == null ? void 0 : o.get(e.type)) == null ? void 0 : n.onCreate) == null || r.call(n, e, this), this.emit("node:create", e), this.emit("change"), this.emit("history");
  }
  addNodes(e) {
    if (e.length === 0) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    for (const n of e)
      if (this.nodes.set(n.id, n), this.quadTree.insert(n), n.type === "edge") {
        const r = n, { fromId: s, toId: i } = r.data;
        this.adjacency.has(s) || this.adjacency.set(s, /* @__PURE__ */ new Set()), this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.get(s).add(n.id), this.adjacency.get(i).add(n.id);
      }
    const o = e.filter((n) => n.type !== "edge").map((n) => n.id);
    o.length > 0 && this.updateFrameMembership(o), this.emit("change"), this.emit("history");
  }
  updateNode(e, o) {
    var s, i, l, a, c, h, p, d, f;
    const n = this.nodes.get(e);
    if (!n) return;
    const r = { ...n, ...o };
    if (o.data && typeof o.data == "object" && n.data && typeof n.data == "object" && (r.data = {
      ...n.data,
      ...o.data
    }), this.nodes.set(e, r), (n.x !== r.x || n.y !== r.y || n.w !== r.w || n.h !== r.h || (n.rotation ?? 0) !== (r.rotation ?? 0)) && (this.quadTree.remove(n), this.quadTree.insert(r), this.updateConnectedEdges(e)), n.x !== r.x || n.y !== r.y) {
      const g = r.x - n.x, y = r.y - n.y;
      (l = (i = (s = this.registry) == null ? void 0 : s.get(r.type)) == null ? void 0 : i.onMove) == null || l.call(i, r, g, y, this), this.emit("node:move", r, g, y);
    }
    if (n.w !== r.w || n.h !== r.h) {
      const g = n.w !== 0 ? r.w / n.w : 1, y = n.h === "auto" ? 0 : n.h, m = r.h === "auto" ? 0 : r.h, b = y !== 0 ? m / y : 1;
      this.emit("node:resize", r, g, b);
    }
    (n.rotation ?? 0) !== (r.rotation ?? 0) && ((h = (c = (a = this.registry) == null ? void 0 : a.get(r.type)) == null ? void 0 : c.onRotate) == null || h.call(c, r, r.rotation ?? 0, this), this.emit("node:rotate", r, r.rotation ?? 0)), o.data && n.data !== r.data && ((f = (d = (p = this.registry) == null ? void 0 : p.get(r.type)) == null ? void 0 : d.onDataChange) == null || f.call(d, r, n.data, r.data, this), this.emit("node:data", r, n.data, r.data)), this.emit("change");
  }
  /**
   * Batch update multiple nodes with a single change emit.
   * Use during drag/resize to avoid N re-renders per frame.
   */
  updateMany(e) {
    let o = !1;
    for (const { id: n, patch: r } of e) {
      const s = this.nodes.get(n);
      if (!s) continue;
      const i = { ...s, ...r };
      r.data && typeof r.data == "object" && s.data && typeof s.data == "object" && (i.data = {
        ...s.data,
        ...r.data
      }), this.nodes.set(n, i), (s.x !== i.x || s.y !== i.y || s.w !== i.w || s.h !== i.h || (s.rotation ?? 0) !== (i.rotation ?? 0)) && (this.quadTree.remove(s), this.quadTree.insert(i), this.updateConnectedEdges(n)), o = !0;
    }
    o && this.emit("change");
  }
  updateConnectedEdges(e) {
    const o = this.adjacency.get(e);
    if (o)
      for (const n of o) {
        const r = this.nodes.get(n);
        if (!r || r.type !== "edge") continue;
        const s = r, i = this.nodes.get(s.data.fromId), l = this.nodes.get(s.data.toId);
        if (i && l) {
          const a = Ye(
            i,
            l,
            s.data.edgeType,
            void 0,
            s.data.sourceHandle,
            s.data.targetHandle,
            s.data.midpointOffset,
            s.data.curveOffset
          ), c = { ...s, ...a.bounds };
          this.nodes.set(n, c), this.quadTree.remove(s), this.quadTree.insert(c);
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
      for (const { id: o, patch: n } of e)
        this.updateNode(o, n);
      this.emit("history");
    }
  }
  deleteNode(e) {
    var n, r, s, i, l;
    if (!this.nodes.has(e) || (n = this.nodes.get(e)) != null && n.locked) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = this.nodes.get(e);
    o && ((i = (s = (r = this.registry) == null ? void 0 : r.get(o.type)) == null ? void 0 : s.onDelete) == null || i.call(s, o, this), this.emit("node:delete", o), this.quadTree.remove(o)), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
    for (const a of this.frameChildren.values()) a.delete(e);
    for (const [a, c] of this.nodes)
      if (c.type === "edge") {
        const h = c.data;
        if (h.fromId === e || h.toId === e) {
          const p = this.nodes.get(a);
          p && this.quadTree.remove(p), this.nodes.delete(a), this.selection.delete(a);
          const d = h.fromId === e ? h.toId : h.fromId;
          (l = this.adjacency.get(d)) == null || l.delete(a);
        }
      }
    this.emit("change"), this.emit("selection"), this.emit("history");
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
    for (const o of e) {
      const n = this.nodes.get(o);
      if (!n || n.type === "edge") continue;
      const r = this.resolveHeight(n);
      for (const [c, h] of this.frameChildren) {
        if (!h.has(o)) continue;
        const p = this.nodes.get(c);
        if (!p) {
          h.delete(o);
          continue;
        }
        const d = this.resolveHeight(p);
        n.x >= p.x && n.y >= p.y && n.x + n.w <= p.x + p.w && n.y + r <= p.y + d || h.delete(o);
      }
      let s;
      this._containerTypes.has(n.type) && (s = this.getFrameDescendantIds(o));
      let i = null, l = 1 / 0;
      const a = this.quadTree.retrieve([], { x: n.x, y: n.y, w: n.w, h: r });
      for (const c of a) {
        if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
        const h = this.resolveHeight(c);
        if (n.x >= c.x && n.y >= c.y && n.x + n.w <= c.x + c.w && n.y + r <= c.y + h) {
          const d = c.w * h;
          d < l && (l = d, i = c);
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
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const n = this.nodes.get(o);
        n && !n.locked && this.nodes.set(o, { ...n, z: this.nextZValue++ });
      }
      this.emit("change"), this.emit("history");
    }
  }
  sendToBack(e) {
    if (e.length !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
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
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const n = this.nodes.get(o);
        if (!n || n.locked) continue;
        const r = n.type === "edge", s = [];
        for (const h of this.nodes.values())
          h.id !== o && (r ? h.type === "edge" : h.type !== "edge") && h.z >= n.z && this._nodesOverlap(n, h) && s.push(h);
        if (s.length === 0) continue;
        s.sort((h, p) => h.z - p.z);
        const i = s[0], l = this.nodes.get(i.id), a = n.z, c = l.z;
        a === c ? this.nodes.set(o, { ...n, z: c + 1 }) : (this.nodes.set(o, { ...n, z: c }), this.nodes.set(i.id, { ...l, z: a }));
      }
      this.emit("change"), this.emit("history");
    }
  }
  sendBackward(e) {
    if (e.length !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
      for (const o of e) {
        const n = this.nodes.get(o);
        if (!n || n.locked) continue;
        const r = n.type === "edge", s = [];
        for (const h of this.nodes.values())
          h.id !== o && (r ? h.type === "edge" : h.type !== "edge") && h.z <= n.z && this._nodesOverlap(n, h) && s.push(h);
        if (s.length === 0) continue;
        s.sort((h, p) => p.z - h.z);
        const i = s[0], l = this.nodes.get(i.id), a = n.z, c = l.z;
        a === c ? this.nodes.set(o, { ...n, z: c - 1 }) : (this.nodes.set(o, { ...n, z: c }), this.nodes.set(i.id, { ...l, z: a }));
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
    const r = he.isEnabled(), s = r ? performance.now() : 0, i = 50, l = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), a = /* @__PURE__ */ new Map();
    for (const h of l) a.set(h.id, h);
    const c = Fl(a, e, o, this.viewport.zoom, n, this._containerTypes);
    return r && he.recordHitTest(performance.now() - s), c;
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, n) {
    const r = he.isEnabled(), s = r ? performance.now() : 0, i = 50, l = this.quadTree.retrieve([], {
      x: e - i,
      y: o - i,
      w: i * 2,
      h: i * 2
    }), a = /* @__PURE__ */ new Map();
    for (const h of l) a.set(h.id, h);
    const c = Hl(a, e, o, this.viewport.zoom, n, this._containerTypes);
    return r && he.recordHitTest(performance.now() - s), c;
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
    for (const a of this.selection) {
      const c = this.nodes.get(a);
      c && ((r = (n = (o = this.registry) == null ? void 0 : o.get(c.type)) == null ? void 0 : n.onDeselect) == null || r.call(n, c, this), this.emit("node:deselect", c));
    }
    this.selection.clear(), this.selection.add(e), this.expandSelectionToGroups();
    for (const a of this.selection) {
      const c = this.nodes.get(a);
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
    if (this.selection.size === 0) return;
    const e = new Set(
      Array.from(this.selection).filter((i) => {
        var l;
        return !((l = this.nodes.get(i)) != null && l.locked);
      })
    );
    if (e.size === 0) return;
    this.activeGroupId && this.getGroupMembers(this.activeGroupId).filter((l) => !e.has(l.id)).length === 0 && (this.activeGroupId = null, this.emit("group:exit")), this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = e;
    for (const i of e) {
      const l = this.nodes.get(i);
      l && ((s = (r = (n = this.registry) == null ? void 0 : n.get(l.type)) == null ? void 0 : r.onDelete) == null || s.call(r, l, this), this.emit("node:delete", l), this.quadTree.remove(l), this.nodes.delete(i));
    }
    for (const [i, l] of this.nodes)
      if (l.type === "edge") {
        const a = l.data;
        if (o.has(a.fromId) || o.has(a.toId)) {
          const c = this.nodes.get(i);
          c && this.quadTree.remove(c), this.nodes.delete(i);
        }
      }
    this.cleanupEmptyGroups();
    for (const i of e) this.selection.delete(i);
    this.emit("change"), this.emit("selection"), this.emit("history");
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
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = new Set(e);
    for (const i of e) {
      const l = this.nodes.get(i);
      if (l) {
        (s = (r = (n = this.registry) == null ? void 0 : n.get(l.type)) == null ? void 0 : r.onDelete) == null || s.call(r, l, this), this.emit("node:delete", l), this.quadTree.remove(l), this.nodes.delete(i), this.frameChildren.delete(i);
        for (const a of this.frameChildren.values()) a.delete(i);
      }
    }
    for (const [i, l] of this.nodes)
      if (l.type === "edge") {
        const a = l.data;
        if (o.has(a.fromId) || o.has(a.toId)) {
          const c = this.nodes.get(i);
          c && this.quadTree.remove(c), this.nodes.delete(i);
        }
      }
    this.selection.clear(), this.emit("change"), this.emit("selection"), this.emit("history");
  }
  // --- Flip ---
  flipSelected(e) {
    var o;
    if (this.selection.size !== 0) {
      this.history.pushSnapshot(this.nodes, this.groupParent);
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
            const a = l.data.points.map(
              ([c, h, p]) => [l.w - c, h, p]
            );
            s = { ...l, data: { ...l.data, points: a } };
          } else {
            const a = l.h === "auto" ? 0 : l.h, c = l.data.points.map(
              ([h, p, d]) => [h, a - p, d]
            );
            s = { ...l, data: { ...l.data, points: c } };
          }
        } else if (r.type === "shape") {
          const l = r;
          if (l.data.shape === "arrow" || l.data.shape === "line")
            if (l.data.startPoint && l.data.endPoint)
              if (e === "h") {
                const a = [l.w - l.data.startPoint[0], l.data.startPoint[1]], c = [l.w - l.data.endPoint[0], l.data.endPoint[1]];
                s = { ...l, data: { ...l.data, startPoint: a, endPoint: c } };
              } else {
                const a = l.h === "auto" ? 0 : l.h, c = [l.data.startPoint[0], a - l.data.startPoint[1]], h = [l.data.endPoint[0], a - l.data.endPoint[1]];
                s = { ...l, data: { ...l.data, startPoint: c, endPoint: h } };
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
  // --- Grouping ---
  groupSelected() {
    if (this.selection.size < 2 || this.activeGroupId) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = kt(10), o = /* @__PURE__ */ new Set();
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
      this.activeGroupId && e.has(this.activeGroupId) && (this.activeGroupId = null, this.emit("group:exit")), this.history.pushSnapshot(this.nodes, this.groupParent);
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
    if (this.selection.size === 0) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = 20, o = /* @__PURE__ */ new Map(), n = [];
    for (const s of this.selection) {
      const i = this.nodes.get(s);
      if (!i) continue;
      const l = kt();
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
      s.groupId && (r.has(s.groupId) || r.set(s.groupId, kt(10)), s.groupId = r.get(s.groupId));
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
    for (const b of this.clipboard) {
      const x = b.h === "auto" ? 100 : b.h;
      b.x < n && (n = b.x), b.y < r && (r = b.y), b.x + b.w > s && (s = b.x + b.w), b.y + x > i && (i = b.y + x);
    }
    const l = (n + s) / 2, a = (r + i) / 2;
    let c, h;
    if (e !== void 0 && o !== void 0)
      c = e, h = o;
    else {
      const b = this.getWindow(), x = b.innerWidth / 2, S = b.innerHeight / 2, M = Yo(this.viewport, x, S);
      c = M.x, h = M.y;
    }
    const p = this.pasteCount * 20, d = c - l + p, f = h - a + p, g = /* @__PURE__ */ new Map(), y = this.clipboard.map((b) => {
      const x = kt();
      return g.set(b.id, x), {
        ...structuredClone(b),
        id: x,
        x: b.x + d,
        y: b.y + f,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const b of y)
      if (b.type === "edge" && b.data) {
        const x = b.data;
        g.has(x.fromId) && (x.fromId = g.get(x.fromId)), g.has(x.toId) && (x.toId = g.get(x.toId));
      }
    const m = /* @__PURE__ */ new Map();
    for (const b of y)
      b.groupId && (m.has(b.groupId) || m.set(b.groupId, kt(10)), b.groupId = m.get(b.groupId));
    for (const [b, x] of this.groupParent)
      m.has(b) && m.has(x) && this.linkGroupParent(m.get(b), m.get(x));
    this.addNodes(y), this.selectMultiple(y.map((b) => b.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, n) {
    const r = Fi.find((f) => f.id === e);
    if (!r) return;
    const s = structuredClone(r.nodes), i = /* @__PURE__ */ new Map();
    for (const f of s) {
      const g = kt(10);
      i.set(f.id, g), f.id = g;
    }
    for (const f of s) {
      if (f.type === "edge" && f.data) {
        const g = f.data;
        i.has(g.fromId) && (g.fromId = i.get(g.fromId)), i.has(g.toId) && (g.toId = i.get(g.toId));
      }
      f.groupId && i.has(f.groupId) && (f.groupId = i.get(f.groupId));
    }
    let l = 1 / 0, a = 1 / 0, c = -1 / 0, h = -1 / 0;
    for (const f of s) {
      if (f.type === "edge") continue;
      const g = f.h === "auto" ? 100 : f.h;
      l = Math.min(l, f.x), a = Math.min(a, f.y), c = Math.max(c, f.x + f.w), h = Math.max(h, f.y + g);
    }
    const p = o - (l + c) / 2, d = n - (a + h) / 2;
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
  pushHistorySnapshot() {
    this.history.pushSnapshot(this.nodes, this.groupParent), this.emit("history");
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
    e && (this.nodes = e.nodes, this.groupParent = e.groupParent, this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), this.selection.clear(), this.emit("change"), this.emit("selection"), this.emit("history"));
  }
  redo() {
    const e = this.history.redo(this.nodes, this.groupParent);
    e && (this.nodes = e.nodes, this.groupParent = e.groupParent, this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), this.selection.clear(), this.emit("change"), this.emit("selection"), this.emit("history"));
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
    e.z >= this.nextZValue && (this.nextZValue = e.z + 1), e.z < this._minZ && (this._minZ = e.z), this._suppressEvents = !1;
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
            const a = i.fromId === e ? i.toId : i.fromId;
            (n = this.adjacency.get(a)) == null || n.delete(r);
          }
        }
    }
    this._suppressEvents = !1;
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
      }), this.nodes.set(e, r), (n.x !== r.x || n.y !== r.y || n.w !== r.w || n.h !== r.h) && (this.quadTree.remove(n), this.quadTree.insert(r), this.updateConnectedEdges(e)), r.z >= this.nextZValue && (this.nextZValue = r.z + 1);
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
    return Vl(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: n } = await Jl(e);
    n.background && (this.boardBackground = n.background, this.emit("background")), n.originView ? this.originView = n.originView : this.originView = null;
    let r = 0, s = 0;
    for (const i of o)
      this.nodes.set(i.id, i), i.z > r && (r = i.z), i.z < s && (s = i.z);
    this.rebuildQuadTree(), this.rebuildFrameChildren(), this.nextZValue = r + 1, this._minZ = s, this.selection.clear(), this.goToOriginView(), this.emit("change"), this.emit("selection"), this.emit("history");
  }
  toJSON() {
    const e = {
      nodes: Array.from(this.nodes.entries()),
      viewport: this.viewport
    };
    return this.groupParent.size > 0 && (e.groupParent = Array.from(this.groupParent.entries())), e;
  }
  fromJSON(e) {
    this.history.clear(), this.nodes = new Map(e.nodes), this.groupParent = new Map(e.groupParent ?? []), this.rebuildGroupChildren(), this.rebuildQuadTree(), this.rebuildFrameChildren(), e.viewport && (this.viewport = e.viewport), this.selection.clear(), this.emit("change"), this.emit("viewport"), this.emit("selection"), this.emit("history");
  }
}
class gc {
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
const Os = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], mc = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function Kn(t, e) {
  const o = Os.indexOf(t);
  if (o === -1) return "default";
  const n = (e % 360 + 360) % 360, r = Math.round(n / 45) % 8, s = (o + r) % 8;
  return mc[Os[s]];
}
class bc extends ul {
  constructor() {
    super(...arguments);
    yt(this, "state", { hasError: !1 });
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
function Xs({ markdown: t }) {
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
const xc = 0, wc = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function kc(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function vc({
  node: t,
  isSelected: e,
  multiSelected: o,
  engine: n,
  schema: r,
  interactive: s,
  zoom: i,
  onMeasuredHeight: l,
  autoEdit: a
}) {
  const c = lt(null), h = lt(a === !0), p = lt(!1), d = lt(!1), f = lt(!1), g = lt(!1), y = lt(t.data.blocks), [m, b] = tt(!1), [x, S] = tt(!1), M = lt(null), I = yl({ schema: r }), R = lt(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  bt(() => {
    const E = R.current;
    if (!E) return;
    R.current = null;
    const G = requestAnimationFrame(() => {
      try {
        I.replaceBlocks(I.document, E);
        return;
      } catch {
      }
      try {
        const X = I.blocksToHTMLLossy(E);
        I._tiptapEditor.commands.setContent(X);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), S(!0);
    });
    return () => cancelAnimationFrame(G);
  }, [I]), bt(() => {
    (!e || o) && b(!1);
  }, [e, o]), bt(() => {
    h.current && (h.current = !1, p.current = !0, b(!0));
  }, [I]), bt(() => {
    if (!m || !p.current && !M.current) return;
    const E = M.current;
    M.current = null, p.current = !1;
    const G = requestAnimationFrame(() => {
      if (I.focus(), E)
        try {
          const X = I._tiptapEditor, V = X.view.posAtCoords({ left: E.x, top: E.y });
          V && X.commands.setTextSelection(V.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(G);
  }, [m, I]);
  const C = it(() => {
    if (d.current || f.current) return;
    const E = n.getNode(t.id), G = I.document;
    y.current = G, n.updateNode(t.id, {
      data: { ...E == null ? void 0 : E.data, blocks: G }
    });
  }, [I, n, t.id]);
  bt(() => {
    if (!I) return;
    const E = () => {
      var et, ot;
      if (d.current || f.current || g.current) return;
      const N = I.document.length, V = n.getNode(t.id), H = ((ot = (et = V == null ? void 0 : V.data) == null ? void 0 : et.blocks) == null ? void 0 : ot.length) ?? 0;
      if (N < H) return;
      const _ = setTimeout(C, 100);
      return () => clearTimeout(_);
    };
    let G;
    const X = I.onChange(() => {
      G == null || G(), G = E();
    });
    return () => {
      X == null || X(), G == null || G();
    };
  }, [I, C]), bt(() => {
    const E = c.current;
    if (!E) return;
    const G = (X) => {
      const N = X.relatedTarget;
      N && E.contains(N) || C();
    };
    return E.addEventListener("focusout", G), () => E.removeEventListener("focusout", G);
  }, [C]), bt(() => {
    if (m || t.data.blocks === y.current) return;
    const E = JSON.stringify(t.data.blocks), G = JSON.stringify(y.current);
    if (E !== G) {
      if (t.data.blocks.length > 0 && I.document.length > 0) {
        g.current = !0;
        try {
          I.replaceBlocks(I.document, t.data.blocks);
        } catch {
          try {
            const X = I.blocksToHTMLLossy(t.data.blocks);
            I._tiptapEditor.commands.setContent(X);
          } catch {
          }
        }
        g.current = !1;
      }
      y.current = t.data.blocks;
    }
  }, [t.data.blocks, m, I]), bt(() => {
    if (t.h !== "auto" || !l) return;
    const E = c.current;
    if (!E) return;
    const G = () => {
      const N = E.offsetHeight;
      N > 0 && l(t.id, N);
    };
    G();
    const X = new ResizeObserver(G);
    return X.observe(E), () => X.disconnect();
  }, [t.id, t.h, l]);
  const P = it(() => {
    const E = n.getNode(t.id);
    if (!E || E.h === "auto" || !I || !c.current)
      return;
    const G = E.h - xc, X = c.current.querySelector(".bn-editor");
    if (!X) return;
    const N = I.document;
    if (N.length === 0) return;
    let V = 0;
    for (let ot = N.length - 1; ot >= 1 && kc(N[ot]); ot--)
      V++;
    const H = X.scrollHeight, _ = N.length > 0 ? H / N.length : 36;
    if (d.current = !0, H < G) {
      const ot = G - H, ut = Math.max(0, Math.floor(ot / _));
      if (ut > 0) {
        const pt = N[N.length - 1];
        I.insertBlocks(
          Array.from({ length: ut }, () => ({
            type: "paragraph",
            content: []
          })),
          pt,
          "after"
        );
      }
    } else if (H > G && V > 0) {
      const ot = H - G, ut = Math.min(V, Math.ceil(ot / _));
      if (ut > 0) {
        const pt = N.slice(N.length - ut);
        I.removeBlocks(pt);
      }
    }
    const et = n.getNode(t.id);
    et && n.updateNode(t.id, {
      data: { ...et.data, blocks: I.document }
    }), d.current = !1;
  }, [I, n, t.id]), j = lt(P);
  j.current = P, bt(() => {
    if (t.h === "auto") return;
    const E = setTimeout(() => j.current(), 60);
    return () => clearTimeout(E);
  }, []);
  const U = it(
    (E) => {
      const G = E.currentTarget.ownerDocument;
      if (E.altKey) return;
      if (!n.selection.has(t.id) && n.selection.size > 0) {
        const { x: Mt, y: ht } = n.screenToCanvas(E.clientX, E.clientY);
        for (const Wt of n.selection) {
          const Pt = n.getNode(Wt);
          if (!Pt) continue;
          const Et = Pt.h === "auto" ? 100 : Pt.h;
          if (Mt >= Pt.x && Mt <= Pt.x + Pt.w && ht >= Pt.y && ht <= Pt.y + Et)
            return;
        }
      }
      E.stopPropagation(), E.preventDefault(), E.currentTarget.setPointerCapture(E.pointerId), E.shiftKey ? n.toggleSelect(t.id) : n.selection.has(t.id) || n.select(t.id);
      const X = E.clientX, N = E.clientY, V = Array.from(n.selection), H = V.map((Mt) => {
        const ht = n.getNode(Mt);
        return { id: Mt, x: ht.x, y: ht.y };
      });
      let _ = !1, et = null, ot = X, ut = N, pt = !1;
      const Tt = () => {
        et = null;
        const Mt = (ot - X) / n.viewport.zoom, ht = (ut - N) / n.viewport.zoom, { finalDx: Wt, finalDy: Pt } = n.computeDragSnap(
          H,
          V,
          Mt,
          ht,
          pt
        ), Et = H.map((Jt) => ({
          id: Jt.id,
          patch: { x: Jt.x + Wt, y: Jt.y + Pt }
        }));
        n.updateMany(Et);
      }, rt = (Mt) => {
        const ht = (Mt.clientX - X) / n.viewport.zoom, Wt = (Mt.clientY - N) / n.viewport.zoom;
        if (!_)
          if (Math.abs(ht) > 2 || Math.abs(Wt) > 2)
            _ = !0, f.current = !0, n.pushHistorySnapshot();
          else
            return;
        ot = Mt.clientX, ut = Mt.clientY, pt = Mt.metaKey || Mt.ctrlKey, et === null && (et = requestAnimationFrame(Tt));
      }, St = () => {
        f.current = !1, et !== null && (cancelAnimationFrame(et), Tt()), n.clearAlignGuides(), G.removeEventListener("pointermove", rt), G.removeEventListener("pointerup", St);
      };
      G.addEventListener("pointermove", rt), G.addEventListener("pointerup", St);
    },
    [n, t.id]
  ), ct = it(
    (E) => {
      var Tt;
      const G = E.currentTarget.ownerDocument;
      E.stopPropagation(), E.preventDefault();
      const X = t.h === "auto" ? (((Tt = c.current) == null ? void 0 : Tt.getBoundingClientRect().height) ?? 60) / n.viewport.zoom : t.h, N = t.x + t.w / 2, V = t.y + X / 2, H = t.rotation || 0, { x: _, y: et } = n.screenToCanvas(
        E.clientX,
        E.clientY
      ), ot = Math.atan2(et - V, _ - N);
      n.pushHistorySnapshot();
      const ut = (rt) => {
        const { x: St, y: Mt } = n.screenToCanvas(rt.clientX, rt.clientY), ht = Math.atan2(Mt - V, St - N);
        let Wt = H + (ht - ot) * (180 / Math.PI);
        (rt.shiftKey || n.snapToGrid) && !(rt.metaKey || rt.ctrlKey) && (Wt = Math.round(Wt / 15) * 15), n.updateNode(t.id, { rotation: Wt });
      }, pt = () => {
        G.removeEventListener("pointermove", ut), G.removeEventListener("pointerup", pt);
      };
      G.addEventListener("pointermove", ut), G.addEventListener("pointerup", pt);
    },
    [n, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), O = it(
    (E, G) => {
      var Tt;
      const X = G.currentTarget.ownerDocument;
      G.stopPropagation(), G.preventDefault();
      const N = G.clientX, V = G.clientY, H = t.x, _ = t.y, et = t.w, ot = t.h === "auto" ? (((Tt = c.current) == null ? void 0 : Tt.getBoundingClientRect().height) ?? 60) / n.viewport.zoom : t.h;
      n.pushHistorySnapshot();
      const ut = (rt) => {
        const St = (rt.clientX - N) / n.viewport.zoom, Mt = (rt.clientY - V) / n.viewport.zoom;
        let ht = H, Wt = _, Pt = et, Et = ot;
        if ((E === "nw" || E === "w" || E === "sw") && (ht = H + St, Pt = et - St), (E === "ne" || E === "e" || E === "se") && (Pt = et + St), (E === "nw" || E === "n" || E === "ne") && (Wt = _ + Mt, Et = ot - Mt), (E === "sw" || E === "s" || E === "se") && (Et = ot + Mt), n.snapToGrid && !(rt.metaKey || rt.ctrlKey)) {
          const Jt = n.gridSize, Zt = (re) => Math.round(re / Jt) * Jt;
          (E === "nw" || E === "w" || E === "sw") && (ht = Zt(ht), Pt = H + et - ht), (E === "ne" || E === "e" || E === "se") && (Pt = Zt(ht + Pt) - ht), (E === "nw" || E === "n" || E === "ne") && (Wt = Zt(Wt), Et = _ + ot - Wt), (E === "sw" || E === "s" || E === "se") && (Et = Zt(Wt + Et) - Wt);
        }
        Pt < 100 && (Pt = 100, (E === "nw" || E === "w" || E === "sw") && (ht = H + et - 100)), Et < 60 && (Et = 60, (E === "nw" || E === "n" || E === "ne") && (Wt = _ + ot - 60)), n.updateNode(t.id, { x: ht, y: Wt, w: Pt, h: Et });
      }, pt = () => {
        X.removeEventListener("pointermove", ut), X.removeEventListener("pointerup", pt), requestAnimationFrame(() => j.current());
      };
      X.addEventListener("pointermove", ut), X.addEventListener("pointerup", pt);
    },
    [n, t.id, t.x, t.y, t.w, t.h]
  ), nt = it(
    (E) => {
      if (!E.altKey) {
        if (m) {
          E.stopPropagation();
          return;
        }
        if (e) {
          U(E);
          return;
        }
        U(E);
      }
    },
    [m, e, U, n, t.id]
  ), Q = it(
    (E) => {
      if (E.stopPropagation(), !m) {
        if (t.groupId) {
          const G = [];
          let X = t.groupId;
          for (; X; )
            G.push(X), X = n.groupParent.get(X);
          if (!n.activeGroupId) {
            n.enterGroup(G[G.length - 1]), n.select(t.id);
            return;
          }
          const N = G.indexOf(n.activeGroupId);
          if (N > 0) {
            n.enterGroup(G[N - 1]), n.select(t.id);
            return;
          }
        }
        n.select(t.id), M.current = { x: E.clientX, y: E.clientY }, b(!0);
      }
    },
    [m, n, t.id, t.groupId, I]
  ), J = e && !o;
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
            onDoubleClick: Q,
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
                onPointerDown: nt,
                onKeyDown: m ? (E) => {
                  E.key === "Escape" && (E.stopPropagation(), b(!1));
                } : void 0,
                style: m ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: x ? /* @__PURE__ */ u(Xs, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ u(bc, { fallback: /* @__PURE__ */ u(Xs, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ u(
                  gl,
                  {
                    editor: I,
                    theme: "light",
                    editable: s && m
                  }
                ) })
              }
            )
          }
        ),
        J && wc.map(({ pos: E, top: G, left: X }) => {
          const N = 8 / i;
          return /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: (V) => O(E, V),
              style: {
                position: "absolute",
                top: G,
                left: X,
                width: N,
                height: N,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: Kn(E, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            E
          );
        }),
        J && (() => {
          const E = 25 / i, G = 10 / i;
          return /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ u(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -E,
                  left: "50%",
                  width: 1.5 / i,
                  height: E,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ u(
              "div",
              {
                onPointerDown: ct,
                style: {
                  position: "absolute",
                  top: -(E + G / 2),
                  left: "50%",
                  width: G,
                  height: G,
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
const Ui = ge(vc);
function Sc(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    Ui,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: Zr,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const Mc = {
  type: "content",
  component: Sc,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: Cc } = Math, dn = Cc + 1e-4, Ys = 0.5, Gs = [1, 1];
function js(t, e, o, n = (r) => r) {
  return t * n(0.5 - e * (0.5 - o));
}
const { min: dr } = Math;
function Zi(t, e, o) {
  let n = dr(1, e / o);
  return dr(1, t + (dr(1, 1 - n) - t) * (n * 0.275));
}
function zc(t) {
  return [-t[0], -t[1]];
}
function We(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function Vs(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function eo(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function Dr(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function to(t, e) {
  return [t[0] * e, t[1] * e];
}
function hr(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function Ic(t, e) {
  return [t[0] / e, t[1] / e];
}
function Qi(t) {
  return [t[1], -t[0]];
}
function ur(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function Ks(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function Tc(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Pc(t) {
  return Math.hypot(t[0], t[1]);
}
function qs(t, e) {
  let o = t[0] - e[0], n = t[1] - e[1];
  return o * o + n * n;
}
function Ji(t) {
  return Ic(t, Pc(t));
}
function Ac(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function es(t, e, o) {
  let n = Math.sin(o), r = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], l = s * r - i * n, a = s * n + i * r;
  return [l + e[0], a + e[1]];
}
function Us(t, e, o, n) {
  let r = Math.sin(n), s = Math.cos(n), i = e[0] - o[0], l = e[1] - o[1], a = i * s - l * r, c = i * r + l * s;
  return t[0] = a + o[0], t[1] = c + o[1], t;
}
function Zs(t, e, o) {
  return We(t, to(eo(e, t), o));
}
function Ec(t, e, o, n) {
  let r = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + r * n, t[1] = e[1] + s * n, t;
}
function $i(t, e, o) {
  return We(t, to(e, o));
}
const ce = [0, 0], Qe = [0, 0], Je = [0, 0];
function Rc(t, e) {
  let o = $i(t, Ji(Qi(eo(t, We(t, [1, 1])))), -e), n = [], r = 1 / 13;
  for (let s = r; s <= 1; s += r) n.push(es(o, t, dn * 2 * s));
  return n;
}
function Lc(t, e, o) {
  let n = [], r = 1 / o;
  for (let s = r; s <= 1; s += r) n.push(es(e, t, dn * s));
  return n;
}
function Dc(t, e, o) {
  let n = eo(e, o), r = to(n, 0.5), s = to(n, 0.51);
  return [eo(t, r), eo(t, s), We(t, s), We(t, r)];
}
function Wc(t, e, o, n) {
  let r = [], s = $i(t, e, o), i = 1 / n;
  for (let l = i; l < 1; l += i) r.push(es(s, t, dn * 3 * l));
  return r;
}
function Bc(t, e, o) {
  return [We(t, to(e, o)), We(t, to(e, o * 0.99)), eo(t, to(e, o * 0.99)), eo(t, to(e, o))];
}
function Qs(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function Fc(t, e, o) {
  return t.slice(0, 10).reduce((n, r) => {
    let s = r.pressure;
    return e && (s = Zi(n, r.distance, o)), (n + s) / 2;
  }, t[0].pressure);
}
function Nc(t, e = {}) {
  let { size: o = 16, smoothing: n = 0.5, thinning: r = 0.5, simulatePressure: s = !0, easing: i = (G) => G, start: l = {}, end: a = {}, last: c = !1 } = e, { cap: h = !0, easing: p = (G) => G * (2 - G) } = l, { cap: d = !0, easing: f = (G) => --G * G * G + 1 } = a;
  if (t.length === 0 || o <= 0) return [];
  let g = t[t.length - 1].runningLength, y = Qs(l.taper, o, g), m = Qs(a.taper, o, g), b = (o * n) ** 2, x = [], S = [], M = Fc(t, s, o), I = js(o, r, t[t.length - 1].pressure, i), R, C = t[0].vector, P = t[0].point, j = P, U = P, ct = j, O = !1;
  for (let G = 0; G < t.length; G++) {
    let { pressure: X } = t[G], { point: N, vector: V, distance: H, runningLength: _ } = t[G], et = G === t.length - 1;
    if (!et && g - _ < 3) continue;
    r ? (s && (X = Zi(M, H, o)), I = js(o, r, X, i)) : I = o / 2, R === void 0 && (R = I);
    let ot = _ < y ? p(_ / y) : 1, ut = g - _ < m ? f((g - _) / m) : 1;
    I = Math.max(0.01, I * Math.min(ot, ut));
    let pt = (et ? t[G] : t[G + 1]).vector, Tt = et ? 1 : Ks(V, pt), rt = Ks(V, C) < 0 && !O, St = Tt !== null && Tt < 0;
    if (rt || St) {
      ur(ce, C), hr(ce, ce, I);
      for (let Mt = 0; Mt <= 1; Mt += 0.07692307692307693) Dr(Qe, N, ce), Us(Qe, Qe, N, dn * Mt), U = [Qe[0], Qe[1]], x.push(U), Vs(Je, N, ce), Us(Je, Je, N, dn * -Mt), ct = [Je[0], Je[1]], S.push(ct);
      P = U, j = ct, St && (O = !0);
      continue;
    }
    if (O = !1, et) {
      ur(ce, V), hr(ce, ce, I), x.push(eo(N, ce)), S.push(We(N, ce));
      continue;
    }
    Ec(ce, pt, V, Tt), ur(ce, ce), hr(ce, ce, I), Dr(Qe, N, ce), U = [Qe[0], Qe[1]], (G <= 1 || qs(P, U) > b) && (x.push(U), P = U), Vs(Je, N, ce), ct = [Je[0], Je[1]], (G <= 1 || qs(j, ct) > b) && (S.push(ct), j = ct), M = X, C = V;
  }
  let nt = [t[0].point[0], t[0].point[1]], Q = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : We(t[0].point, [1, 1]), J = [], E = [];
  if (t.length === 1) {
    if (!(y || m) || c) return Rc(nt, R || I);
  } else {
    y || m && t.length === 1 || (h ? J.push(...Lc(nt, S[0], 13)) : J.push(...Dc(nt, x[0], S[0])));
    let G = Qi(zc(t[t.length - 1].vector));
    m || y && t.length === 1 ? E.push(Q) : d ? E.push(...Wc(Q, G, I, 29)) : E.push(...Bc(Q, G, I));
  }
  return x.concat(E, S.reverse(), J);
}
const Js = [0, 0];
function $s(t) {
  return t != null && t >= 0;
}
function Hc(t, e = {}) {
  var d;
  let { streamline: o = 0.5, size: n = 16, last: r = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: f, y: g, pressure: y = Ys }) => [f, g, y]);
  if (i.length === 2) {
    let f = i[1];
    i = i.slice(0, -1);
    for (let g = 1; g < 5; g++) i.push(Zs(i[0], f, g / 4));
  }
  i.length === 1 && (i = [...i, [...We(i[0], Gs), ...i[0].slice(2)]]);
  let l = [{ point: [i[0][0], i[0][1]], pressure: $s(i[0][2]) ? i[0][2] : 0.25, vector: [...Gs], distance: 0, runningLength: 0 }], a = !1, c = 0, h = l[0], p = i.length - 1;
  for (let f = 1; f < i.length; f++) {
    let g = r && f === p ? [i[f][0], i[f][1]] : Zs(h.point, i[f], s);
    if (Tc(h.point, g)) continue;
    let y = Ac(g, h.point);
    if (c += y, f < p && !a) {
      if (c < n) continue;
      a = !0;
    }
    Dr(Js, h.point, g), h = { point: g, pressure: $s(i[f][2]) ? i[f][2] : Ys, vector: Ji(Js), distance: y, runningLength: c }, l.push(h);
  }
  return l[0].vector = ((d = l[1]) == null ? void 0 : d.vector) || [0, 0], l;
}
function Oc(t, e = {}) {
  return Nc(Hc(t, e), e);
}
var Xc = Oc;
function os(t, e = {}) {
  const o = Xc(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return Yc(o);
}
function Yc(t) {
  if (!t.length) return "";
  const e = [], [o, n] = t[0];
  e.push("M", o, n);
  for (let r = 0; r < t.length; r++) {
    const [s, i] = t[r], [l, a] = t[(r + 1) % t.length];
    e.push("Q", s, i, (s + l) / 2, (i + a) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function _i(t, e = 0.5) {
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
function Gc(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = _i(t, e), n = o.length, r = [];
  r.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < n; s++) {
    const [i, l] = o[s], [a, c] = o[(s + 1) % n];
    r.push("Q", i, l, (i + a) / 2, (l + c) / 2);
  }
  return r.push("Z"), r.join(" ");
}
function jc(t, e, o, n) {
  const r = e[0] - t[0], s = e[1] - t[1], i = n[0] - o[0], l = n[1] - o[1], a = r * l - s * i;
  if (Math.abs(a) < 1e-10) return null;
  const c = ((o[0] - t[0]) * l - (o[1] - t[1]) * i) / a, h = ((o[0] - t[0]) * s - (o[1] - t[1]) * r) / a;
  return c <= 0 || c >= 1 || h <= 0 || h >= 1 ? null : [t[0] + c * r, t[1] + c * s];
}
function Vc(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function _s(t) {
  let e = 0;
  for (let o = 0, n = t.length - 1; o < t.length; n = o++)
    e += (t[n][0] + t[o][0]) * (t[n][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function Kc(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let l = i + 2; l < e - 1; l++) {
      const a = jc(
        t[i],
        t[i + 1],
        t[l],
        t[l + 1]
      );
      if (!a) continue;
      const c = [a];
      for (let h = i + 1; h <= l; h++)
        c.push(t[h]);
      _s(c) < 100 || o.push({
        pathD: Vc(c),
        points: c.map((h) => [h[0], h[1]])
      });
    }
  if (o.length === 0) return [];
  const n = o.map((i) => _s(i.points)), s = Math.max(...n) * 0.05;
  return o.filter((i, l) => n[l] >= s);
}
function pr(t, e, o) {
  if (t && t.length) {
    const [n, r] = e, s = Math.PI / 180 * o, i = Math.cos(s), l = Math.sin(s);
    for (const a of t) {
      const [c, h] = a;
      a[0] = (c - n) * i - (h - r) * l + n, a[1] = (c - n) * l + (h - r) * i + r;
    }
  }
}
function qc(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Uc(t, e, o, n = 1) {
  const r = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, l = [0, 0];
  if (r) for (const c of i) pr(c, l, r);
  const a = function(c, h, p) {
    const d = [];
    for (const x of c) {
      const S = [...x];
      qc(S[0], S[S.length - 1]) || S.push([S[0][0], S[0][1]]), S.length > 2 && d.push(S);
    }
    const f = [];
    h = Math.max(h, 0.1);
    const g = [];
    for (const x of d) for (let S = 0; S < x.length - 1; S++) {
      const M = x[S], I = x[S + 1];
      if (M[1] !== I[1]) {
        const R = Math.min(M[1], I[1]);
        g.push({ ymin: R, ymax: Math.max(M[1], I[1]), x: R === M[1] ? M[0] : I[0], islope: (I[0] - M[0]) / (I[1] - M[1]) });
      }
    }
    if (g.sort((x, S) => x.ymin < S.ymin ? -1 : x.ymin > S.ymin ? 1 : x.x < S.x ? -1 : x.x > S.x ? 1 : x.ymax === S.ymax ? 0 : (x.ymax - S.ymax) / Math.abs(x.ymax - S.ymax)), !g.length) return f;
    let y = [], m = g[0].ymin, b = 0;
    for (; y.length || g.length; ) {
      if (g.length) {
        let x = -1;
        for (let S = 0; S < g.length && !(g[S].ymin > m); S++) x = S;
        g.splice(0, x + 1).forEach((S) => {
          y.push({ s: m, edge: S });
        });
      }
      if (y = y.filter((x) => !(x.edge.ymax <= m)), y.sort((x, S) => x.edge.x === S.edge.x ? 0 : (x.edge.x - S.edge.x) / Math.abs(x.edge.x - S.edge.x)), (p !== 1 || b % h == 0) && y.length > 1) for (let x = 0; x < y.length; x += 2) {
        const S = x + 1;
        if (S >= y.length) break;
        const M = y[x].edge, I = y[S].edge;
        f.push([[Math.round(M.x), m], [Math.round(I.x), m]]);
      }
      m += p, y.forEach((x) => {
        x.edge.x = x.edge.x + p * x.edge.islope;
      }), b++;
    }
    return f;
  }(i, s, n);
  if (r) {
    for (const c of i) pr(c, l, -r);
    (function(c, h, p) {
      const d = [];
      c.forEach((f) => d.push(...f)), pr(d, h, p);
    })(a, l, -r);
  }
  return a;
}
function un(t, e) {
  var o;
  const n = e.hachureAngle + 90;
  let r = e.hachureGap;
  r < 0 && (r = 4 * e.strokeWidth), r = Math.round(Math.max(r, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = r), Uc(t, r, n, s || 1);
}
class ns {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const n = un(e, o);
    return { type: "fillSketch", ops: this.renderLines(n, o) };
  }
  renderLines(e, o) {
    const n = [];
    for (const r of e) n.push(...this.helper.doubleLineOps(r[0][0], r[0][1], r[1][0], r[1][1], o));
    return n;
  }
}
function qn(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class Zc extends ns {
  fillPolygons(e, o) {
    let n = o.hachureGap;
    n < 0 && (n = 4 * o.strokeWidth), n = Math.max(n, 0.1);
    const r = un(e, Object.assign({}, o, { hachureGap: n })), s = Math.PI / 180 * o.hachureAngle, i = [], l = 0.5 * n * Math.cos(s), a = 0.5 * n * Math.sin(s);
    for (const [c, h] of r) qn([c, h]) && i.push([[c[0] - l, c[1] + a], [...h]], [[c[0] + l, c[1] - a], [...h]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class Qc extends ns {
  fillPolygons(e, o) {
    const n = this._fillPolygons(e, o), r = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, r);
    return n.ops = n.ops.concat(s.ops), n;
  }
}
class Jc {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = un(e, o = Object.assign({}, o, { hachureAngle: 0 }));
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
      const a = qn(l), c = a / r, h = Math.ceil(c) - 1, p = a - h * r, d = (l[0][0] + l[1][0]) / 2 - r / 4, f = Math.min(l[0][1], l[1][1]);
      for (let g = 0; g < h; g++) {
        const y = f + p + g * r, m = d - i + 2 * Math.random() * i, b = y - i + 2 * Math.random() * i, x = this.helper.ellipse(m, b, s, s, o);
        n.push(...x.ops);
      }
    }
    return { type: "fillSketch", ops: n };
  }
}
class $c {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = un(e, o);
    return { type: "fillSketch", ops: this.dashedLine(n, o) };
  }
  dashedLine(e, o) {
    const n = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, r = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const l = qn(i), a = Math.floor(l / (n + r)), c = (l + r - a * (n + r)) / 2;
      let h = i[0], p = i[1];
      h[0] > p[0] && (h = i[1], p = i[0]);
      const d = Math.atan((p[1] - h[1]) / (p[0] - h[0]));
      for (let f = 0; f < a; f++) {
        const g = f * (n + r), y = g + n, m = [h[0] + g * Math.cos(d) + c * Math.cos(d), h[1] + g * Math.sin(d) + c * Math.sin(d)], b = [h[0] + y * Math.cos(d) + c * Math.cos(d), h[1] + y * Math.sin(d) + c * Math.sin(d)];
        s.push(...this.helper.doubleLineOps(m[0], m[1], b[0], b[1], o));
      }
    }), s;
  }
}
class _c {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const n = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, r = o.zigzagOffset < 0 ? n : o.zigzagOffset, s = un(e, o = Object.assign({}, o, { hachureGap: n + r }));
    return { type: "fillSketch", ops: this.zigzagLines(s, r, o) };
  }
  zigzagLines(e, o, n) {
    const r = [];
    return e.forEach((s) => {
      const i = qn(s), l = Math.round(i / (2 * o));
      let a = s[0], c = s[1];
      a[0] > c[0] && (a = s[1], c = s[0]);
      const h = Math.atan((c[1] - a[1]) / (c[0] - a[0]));
      for (let p = 0; p < l; p++) {
        const d = 2 * p * o, f = 2 * (p + 1) * o, g = Math.sqrt(2 * Math.pow(o, 2)), y = [a[0] + d * Math.cos(h), a[1] + d * Math.sin(h)], m = [a[0] + f * Math.cos(h), a[1] + f * Math.sin(h)], b = [y[0] + g * Math.cos(h + Math.PI / 4), y[1] + g * Math.sin(h + Math.PI / 4)];
        r.push(...this.helper.doubleLineOps(y[0], y[1], b[0], b[1], n), ...this.helper.doubleLineOps(b[0], b[1], m[0], m[1], n));
      }
    }), r;
  }
}
const fe = {};
class td {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const ed = 0, fr = 1, ti = 2, Mn = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function yr(t, e) {
  return t.type === e;
}
function rs(t) {
  const e = [], o = function(i) {
    const l = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) l[l.length] = { type: ed, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      l[l.length] = { type: fr, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return l[l.length] = { type: ti, text: "" }, l;
  }(t);
  let n = "BOD", r = 0, s = o[r];
  for (; !yr(s, ti); ) {
    let i = 0;
    const l = [];
    if (n === "BOD") {
      if (s.text !== "M" && s.text !== "m") return rs("M0,0" + t);
      r++, i = Mn[s.text], n = s.text;
    } else yr(s, fr) ? i = Mn[n] : (r++, i = Mn[s.text], n = s.text);
    if (!(r + i < o.length)) throw new Error("Path data ended short");
    for (let a = r; a < r + i; a++) {
      const c = o[a];
      if (!yr(c, fr)) throw new Error("Param not a number: " + n + "," + c.text);
      l[l.length] = +c.text;
    }
    if (typeof Mn[n] != "number") throw new Error("Bad segment: " + n);
    {
      const a = { key: n, data: l };
      e.push(a), r += i, s = o[r], n === "M" && (n = "L"), n === "m" && (n = "l");
    }
  }
  return e;
}
function ta(t) {
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
      const a = l.map((c, h) => h % 2 ? c + o : c + e);
      s.push({ key: "C", data: a }), e = a[4], o = a[5];
      break;
    }
    case "Q":
      s.push({ key: "Q", data: [...l] }), e = l[2], o = l[3];
      break;
    case "q": {
      const a = l.map((c, h) => h % 2 ? c + o : c + e);
      s.push({ key: "Q", data: a }), e = a[2], o = a[3];
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
      const a = l.map((c, h) => h % 2 ? c + o : c + e);
      s.push({ key: "S", data: a }), e = a[2], o = a[3];
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
function ea(t) {
  const e = [];
  let o = "", n = 0, r = 0, s = 0, i = 0, l = 0, a = 0;
  for (const { key: c, data: h } of t) {
    switch (c) {
      case "M":
        e.push({ key: "M", data: [...h] }), [n, r] = h, [s, i] = h;
        break;
      case "C":
        e.push({ key: "C", data: [...h] }), n = h[4], r = h[5], l = h[2], a = h[3];
        break;
      case "L":
        e.push({ key: "L", data: [...h] }), [n, r] = h;
        break;
      case "H":
        n = h[0], e.push({ key: "L", data: [n, r] });
        break;
      case "V":
        r = h[0], e.push({ key: "L", data: [n, r] });
        break;
      case "S": {
        let p = 0, d = 0;
        o === "C" || o === "S" ? (p = n + (n - l), d = r + (r - a)) : (p = n, d = r), e.push({ key: "C", data: [p, d, ...h] }), l = h[0], a = h[1], n = h[2], r = h[3];
        break;
      }
      case "T": {
        const [p, d] = h;
        let f = 0, g = 0;
        o === "Q" || o === "T" ? (f = n + (n - l), g = r + (r - a)) : (f = n, g = r);
        const y = n + 2 * (f - n) / 3, m = r + 2 * (g - r) / 3, b = p + 2 * (f - p) / 3, x = d + 2 * (g - d) / 3;
        e.push({ key: "C", data: [y, m, b, x, p, d] }), l = f, a = g, n = p, r = d;
        break;
      }
      case "Q": {
        const [p, d, f, g] = h, y = n + 2 * (p - n) / 3, m = r + 2 * (d - r) / 3, b = f + 2 * (p - f) / 3, x = g + 2 * (d - g) / 3;
        e.push({ key: "C", data: [y, m, b, x, f, g] }), l = p, a = d, n = f, r = g;
        break;
      }
      case "A": {
        const p = Math.abs(h[0]), d = Math.abs(h[1]), f = h[2], g = h[3], y = h[4], m = h[5], b = h[6];
        p === 0 || d === 0 ? (e.push({ key: "C", data: [n, r, m, b, m, b] }), n = m, r = b) : (n !== m || r !== b) && (oa(n, r, m, b, p, d, f, g, y).forEach(function(x) {
          e.push({ key: "C", data: x });
        }), n = m, r = b);
        break;
      }
      case "Z":
        e.push({ key: "Z", data: [] }), n = s, r = i;
    }
    o = c;
  }
  return e;
}
function on(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function oa(t, e, o, n, r, s, i, l, a, c) {
  const h = (p = i, Math.PI * p / 180);
  var p;
  let d = [], f = 0, g = 0, y = 0, m = 0;
  if (c) [f, g, y, m] = c;
  else {
    [t, e] = on(t, e, -h), [o, n] = on(o, n, -h);
    const nt = (t - o) / 2, Q = (e - n) / 2;
    let J = nt * nt / (r * r) + Q * Q / (s * s);
    J > 1 && (J = Math.sqrt(J), r *= J, s *= J);
    const E = r * r, G = s * s, X = E * G - E * Q * Q - G * nt * nt, N = E * Q * Q + G * nt * nt, V = (l === a ? -1 : 1) * Math.sqrt(Math.abs(X / N));
    y = V * r * Q / s + (t + o) / 2, m = V * -s * nt / r + (e + n) / 2, f = Math.asin(parseFloat(((e - m) / s).toFixed(9))), g = Math.asin(parseFloat(((n - m) / s).toFixed(9))), t < y && (f = Math.PI - f), o < y && (g = Math.PI - g), f < 0 && (f = 2 * Math.PI + f), g < 0 && (g = 2 * Math.PI + g), a && f > g && (f -= 2 * Math.PI), !a && g > f && (g -= 2 * Math.PI);
  }
  let b = g - f;
  if (Math.abs(b) > 120 * Math.PI / 180) {
    const nt = g, Q = o, J = n;
    g = a && g > f ? f + 120 * Math.PI / 180 * 1 : f + 120 * Math.PI / 180 * -1, d = oa(o = y + r * Math.cos(g), n = m + s * Math.sin(g), Q, J, r, s, i, 0, a, [g, nt, y, m]);
  }
  b = g - f;
  const x = Math.cos(f), S = Math.sin(f), M = Math.cos(g), I = Math.sin(g), R = Math.tan(b / 4), C = 4 / 3 * r * R, P = 4 / 3 * s * R, j = [t, e], U = [t + C * S, e - P * x], ct = [o + C * I, n - P * M], O = [o, n];
  if (U[0] = 2 * j[0] - U[0], U[1] = 2 * j[1] - U[1], c) return [U, ct, O].concat(d);
  {
    d = [U, ct, O].concat(d);
    const nt = [];
    for (let Q = 0; Q < d.length; Q += 3) {
      const J = on(d[Q][0], d[Q][1], h), E = on(d[Q + 1][0], d[Q + 1][1], h), G = on(d[Q + 2][0], d[Q + 2][1], h);
      nt.push([J[0], J[1], E[0], E[1], G[0], G[1]]);
    }
    return nt;
  }
}
const od = { randOffset: function(t, e) {
  return Rt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return Fn(t, e, o);
}, ellipse: function(t, e, o, n, r) {
  const s = ra(o, n, r);
  return Wr(t, e, r, s).opset;
}, doubleLineOps: function(t, e, o, n, r) {
  return ro(t, e, o, n, r, !0);
} };
function na(t, e, o, n, r) {
  return { type: "path", ops: ro(t, e, o, n, r) };
}
function Rn(t, e, o) {
  const n = (t || []).length;
  if (n > 2) {
    const r = [];
    for (let s = 0; s < n - 1; s++) r.push(...ro(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && r.push(...ro(t[n - 1][0], t[n - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: r };
  }
  return n === 2 ? na(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function nd(t, e, o, n, r) {
  return function(s, i) {
    return Rn(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + n], [t, e + n]], r);
}
function ei(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, n = Cn(o[0], 1 * (1 + 0.2 * e.roughness), e), r = e.disableMultiStroke ? [] : Cn(o[0], 1.5 * (1 + 0.22 * e.roughness), ri(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const l = Cn(i, 1 * (1 + 0.2 * e.roughness), e), a = e.disableMultiStroke ? [] : Cn(i, 1.5 * (1 + 0.22 * e.roughness), ri(e));
        for (const c of l) c.op !== "move" && n.push(c);
        for (const c of a) c.op !== "move" && r.push(c);
      }
    }
    return { type: "path", ops: n.concat(r) };
  }
  return { type: "path", ops: [] };
}
function ra(t, e, o) {
  const n = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), r = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * n)), s = 2 * Math.PI / r;
  let i = Math.abs(t / 2), l = Math.abs(e / 2);
  const a = 1 - o.curveFitting;
  return i += Rt(i * a, o), l += Rt(l * a, o), { increment: s, rx: i, ry: l };
}
function Wr(t, e, o, n) {
  const [r, s] = si(n.increment, t, e, n.rx, n.ry, 1, n.increment * Fn(0.1, Fn(0.4, 1, o), o), o);
  let i = Nn(r, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [l] = si(n.increment, t, e, n.rx, n.ry, 1.5, 0, o), a = Nn(l, null, o);
    i = i.concat(a);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function oi(t, e, o, n, r, s, i, l, a) {
  const c = t, h = e;
  let p = Math.abs(o / 2), d = Math.abs(n / 2);
  p += Rt(0.01 * p, a), d += Rt(0.01 * d, a);
  let f = r, g = s;
  for (; f < 0; ) f += 2 * Math.PI, g += 2 * Math.PI;
  g - f > 2 * Math.PI && (f = 0, g = 2 * Math.PI);
  const y = 2 * Math.PI / a.curveStepCount, m = Math.min(y / 2, (g - f) / 2), b = ii(m, c, h, p, d, f, g, 1, a);
  if (!a.disableMultiStroke) {
    const x = ii(m, c, h, p, d, f, g, 1.5, a);
    b.push(...x);
  }
  return i && (l ? b.push(...ro(c, h, c + p * Math.cos(f), h + d * Math.sin(f), a), ...ro(c, h, c + p * Math.cos(g), h + d * Math.sin(g), a)) : b.push({ op: "lineTo", data: [c, h] }, { op: "lineTo", data: [c + p * Math.cos(f), h + d * Math.sin(f)] })), { type: "path", ops: b };
}
function ni(t, e) {
  const o = ea(ta(rs(t))), n = [];
  let r = [0, 0], s = [0, 0];
  for (const { key: i, data: l } of o) switch (i) {
    case "M":
      s = [l[0], l[1]], r = [l[0], l[1]];
      break;
    case "L":
      n.push(...ro(s[0], s[1], l[0], l[1], e)), s = [l[0], l[1]];
      break;
    case "C": {
      const [a, c, h, p, d, f] = l;
      n.push(...rd(a, c, h, p, d, f, s, e)), s = [d, f];
      break;
    }
    case "Z":
      n.push(...ro(s[0], s[1], r[0], r[1], e)), s = [r[0], r[1]];
  }
  return { type: "path", ops: n };
}
function gr(t, e) {
  const o = [];
  for (const n of t) if (n.length) {
    const r = e.maxRandomnessOffset || 0, s = n.length;
    if (s > 2) {
      o.push({ op: "move", data: [n[0][0] + Rt(r, e), n[0][1] + Rt(r, e)] });
      for (let i = 1; i < s; i++) o.push({ op: "lineTo", data: [n[i][0] + Rt(r, e), n[i][1] + Rt(r, e)] });
    }
  }
  return { type: "fillPath", ops: o };
}
function Ro(t, e) {
  return function(o, n) {
    let r = o.fillStyle || "hachure";
    if (!fe[r]) switch (r) {
      case "zigzag":
        fe[r] || (fe[r] = new Zc(n));
        break;
      case "cross-hatch":
        fe[r] || (fe[r] = new Qc(n));
        break;
      case "dots":
        fe[r] || (fe[r] = new Jc(n));
        break;
      case "dashed":
        fe[r] || (fe[r] = new $c(n));
        break;
      case "zigzag-line":
        fe[r] || (fe[r] = new _c(n));
        break;
      default:
        r = "hachure", fe[r] || (fe[r] = new ns(n));
    }
    return fe[r];
  }(e, od).fillPolygons(t, e);
}
function ri(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function sa(t) {
  return t.randomizer || (t.randomizer = new td(t.seed || 0)), t.randomizer.next();
}
function Fn(t, e, o, n = 1) {
  return o.roughness * n * (sa(o) * (e - t) + t);
}
function Rt(t, e, o = 1) {
  return Fn(-t, t, e, o);
}
function ro(t, e, o, n, r, s = !1) {
  const i = s ? r.disableMultiStrokeFill : r.disableMultiStroke, l = Br(t, e, o, n, r, !0, !1);
  if (i) return l;
  const a = Br(t, e, o, n, r, !0, !0);
  return l.concat(a);
}
function Br(t, e, o, n, r, s, i) {
  const l = Math.pow(t - o, 2) + Math.pow(e - n, 2), a = Math.sqrt(l);
  let c = 1;
  c = a < 200 ? 1 : a > 500 ? 0.4 : -16668e-7 * a + 1.233334;
  let h = r.maxRandomnessOffset || 0;
  h * h * 100 > l && (h = a / 10);
  const p = h / 2, d = 0.2 + 0.2 * sa(r);
  let f = r.bowing * r.maxRandomnessOffset * (n - e) / 200, g = r.bowing * r.maxRandomnessOffset * (t - o) / 200;
  f = Rt(f, r, c), g = Rt(g, r, c);
  const y = [], m = () => Rt(p, r, c), b = () => Rt(h, r, c), x = r.preserveVertices;
  return i ? y.push({ op: "move", data: [t + (x ? 0 : m()), e + (x ? 0 : m())] }) : y.push({ op: "move", data: [t + (x ? 0 : Rt(h, r, c)), e + (x ? 0 : Rt(h, r, c))] }), i ? y.push({ op: "bcurveTo", data: [f + t + (o - t) * d + m(), g + e + (n - e) * d + m(), f + t + 2 * (o - t) * d + m(), g + e + 2 * (n - e) * d + m(), o + (x ? 0 : m()), n + (x ? 0 : m())] }) : y.push({ op: "bcurveTo", data: [f + t + (o - t) * d + b(), g + e + (n - e) * d + b(), f + t + 2 * (o - t) * d + b(), g + e + 2 * (n - e) * d + b(), o + (x ? 0 : b()), n + (x ? 0 : b())] }), y;
}
function Cn(t, e, o) {
  if (!t.length) return [];
  const n = [];
  n.push([t[0][0] + Rt(e, o), t[0][1] + Rt(e, o)]), n.push([t[0][0] + Rt(e, o), t[0][1] + Rt(e, o)]);
  for (let r = 1; r < t.length; r++) n.push([t[r][0] + Rt(e, o), t[r][1] + Rt(e, o)]), r === t.length - 1 && n.push([t[r][0] + Rt(e, o), t[r][1] + Rt(e, o)]);
  return Nn(n, null, o);
}
function Nn(t, e, o) {
  const n = t.length, r = [];
  if (n > 3) {
    const s = [], i = 1 - o.curveTightness;
    r.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let l = 1; l + 2 < n; l++) {
      const a = t[l];
      s[0] = [a[0], a[1]], s[1] = [a[0] + (i * t[l + 1][0] - i * t[l - 1][0]) / 6, a[1] + (i * t[l + 1][1] - i * t[l - 1][1]) / 6], s[2] = [t[l + 1][0] + (i * t[l][0] - i * t[l + 2][0]) / 6, t[l + 1][1] + (i * t[l][1] - i * t[l + 2][1]) / 6], s[3] = [t[l + 1][0], t[l + 1][1]], r.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else n === 3 ? (r.push({ op: "move", data: [t[1][0], t[1][1]] }), r.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : n === 2 && r.push(...Br(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return r;
}
function si(t, e, o, n, r, s, i, l) {
  const a = [], c = [];
  if (l.roughness === 0) {
    t /= 4, c.push([e + n * Math.cos(-t), o + r * Math.sin(-t)]);
    for (let h = 0; h <= 2 * Math.PI; h += t) {
      const p = [e + n * Math.cos(h), o + r * Math.sin(h)];
      a.push(p), c.push(p);
    }
    c.push([e + n * Math.cos(0), o + r * Math.sin(0)]), c.push([e + n * Math.cos(t), o + r * Math.sin(t)]);
  } else {
    const h = Rt(0.5, l) - Math.PI / 2;
    c.push([Rt(s, l) + e + 0.9 * n * Math.cos(h - t), Rt(s, l) + o + 0.9 * r * Math.sin(h - t)]);
    const p = 2 * Math.PI + h - 0.01;
    for (let d = h; d < p; d += t) {
      const f = [Rt(s, l) + e + n * Math.cos(d), Rt(s, l) + o + r * Math.sin(d)];
      a.push(f), c.push(f);
    }
    c.push([Rt(s, l) + e + n * Math.cos(h + 2 * Math.PI + 0.5 * i), Rt(s, l) + o + r * Math.sin(h + 2 * Math.PI + 0.5 * i)]), c.push([Rt(s, l) + e + 0.98 * n * Math.cos(h + i), Rt(s, l) + o + 0.98 * r * Math.sin(h + i)]), c.push([Rt(s, l) + e + 0.9 * n * Math.cos(h + 0.5 * i), Rt(s, l) + o + 0.9 * r * Math.sin(h + 0.5 * i)]);
  }
  return [c, a];
}
function ii(t, e, o, n, r, s, i, l, a) {
  const c = s + Rt(0.1, a), h = [];
  h.push([Rt(l, a) + e + 0.9 * n * Math.cos(c - t), Rt(l, a) + o + 0.9 * r * Math.sin(c - t)]);
  for (let p = c; p <= i; p += t) h.push([Rt(l, a) + e + n * Math.cos(p), Rt(l, a) + o + r * Math.sin(p)]);
  return h.push([e + n * Math.cos(i), o + r * Math.sin(i)]), h.push([e + n * Math.cos(i), o + r * Math.sin(i)]), Nn(h, null, a);
}
function rd(t, e, o, n, r, s, i, l) {
  const a = [], c = [l.maxRandomnessOffset || 1, (l.maxRandomnessOffset || 1) + 0.3];
  let h = [0, 0];
  const p = l.disableMultiStroke ? 1 : 2, d = l.preserveVertices;
  for (let f = 0; f < p; f++) f === 0 ? a.push({ op: "move", data: [i[0], i[1]] }) : a.push({ op: "move", data: [i[0] + (d ? 0 : Rt(c[0], l)), i[1] + (d ? 0 : Rt(c[0], l))] }), h = d ? [r, s] : [r + Rt(c[f], l), s + Rt(c[f], l)], a.push({ op: "bcurveTo", data: [t + Rt(c[f], l), e + Rt(c[f], l), o + Rt(c[f], l), n + Rt(c[f], l), h[0], h[1]] });
  return a;
}
function nn(t) {
  return [...t];
}
function ai(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const n = [];
  if (o === 3) n.push(nn(t[0]), nn(t[1]), nn(t[2]), nn(t[2]));
  else {
    const r = [];
    r.push(t[0], t[0]);
    for (let l = 1; l < t.length; l++) r.push(t[l]), l === t.length - 1 && r.push(t[l]);
    const s = [], i = 1 - e;
    n.push(nn(r[0]));
    for (let l = 1; l + 2 < r.length; l++) {
      const a = r[l];
      s[0] = [a[0], a[1]], s[1] = [a[0] + (i * r[l + 1][0] - i * r[l - 1][0]) / 6, a[1] + (i * r[l + 1][1] - i * r[l - 1][1]) / 6], s[2] = [r[l + 1][0] + (i * r[l][0] - i * r[l + 2][0]) / 6, r[l + 1][1] + (i * r[l][1] - i * r[l + 2][1]) / 6], s[3] = [r[l + 1][0], r[l + 1][1]], n.push(s[1], s[2], s[3]);
    }
  }
  return n;
}
function Ln(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function sd(t, e, o) {
  const n = Ln(e, o);
  if (n === 0) return Ln(t, e);
  let r = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / n;
  return r = Math.max(0, Math.min(1, r)), Ln(t, mo(e, o, r));
}
function mo(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function Fr(t, e, o, n) {
  const r = n || [];
  if (function(l, a) {
    const c = l[a + 0], h = l[a + 1], p = l[a + 2], d = l[a + 3];
    let f = 3 * h[0] - 2 * c[0] - d[0];
    f *= f;
    let g = 3 * h[1] - 2 * c[1] - d[1];
    g *= g;
    let y = 3 * p[0] - 2 * d[0] - c[0];
    y *= y;
    let m = 3 * p[1] - 2 * d[1] - c[1];
    return m *= m, f < y && (f = y), g < m && (g = m), f + g;
  }(t, e) < o) {
    const l = t[e + 0];
    r.length ? (s = r[r.length - 1], i = l, Math.sqrt(Ln(s, i)) > 1 && r.push(l)) : r.push(l), r.push(t[e + 3]);
  } else {
    const a = t[e + 0], c = t[e + 1], h = t[e + 2], p = t[e + 3], d = mo(a, c, 0.5), f = mo(c, h, 0.5), g = mo(h, p, 0.5), y = mo(d, f, 0.5), m = mo(f, g, 0.5), b = mo(y, m, 0.5);
    Fr([a, d, y, b], 0, o, r), Fr([b, m, g, p], 0, o, r);
  }
  var s, i;
  return r;
}
function id(t, e) {
  return Hn(t, 0, t.length, e);
}
function Hn(t, e, o, n, r) {
  const s = r || [], i = t[e], l = t[o - 1];
  let a = 0, c = 1;
  for (let h = e + 1; h < o - 1; ++h) {
    const p = sd(t[h], i, l);
    p > a && (a = p, c = h);
  }
  return Math.sqrt(a) > n ? (Hn(t, e, c + 1, n, s), Hn(t, c, o, n, s)) : (s.length || s.push(i), s.push(l)), s;
}
function mr(t, e = 0.15, o) {
  const n = [], r = (t.length - 1) / 3;
  for (let s = 0; s < r; s++)
    Fr(t, 3 * s, e, n);
  return o && o > 0 ? Hn(n, 0, n.length, o) : n;
}
const be = "none";
class On {
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
    return this._d("line", [na(e, o, n, r, i)], i);
  }
  rectangle(e, o, n, r, s) {
    const i = this._o(s), l = [], a = nd(e, o, n, r, i);
    if (i.fill) {
      const c = [[e, o], [e + n, o], [e + n, o + r], [e, o + r]];
      i.fillStyle === "solid" ? l.push(gr([c], i)) : l.push(Ro([c], i));
    }
    return i.stroke !== be && l.push(a), this._d("rectangle", l, i);
  }
  ellipse(e, o, n, r, s) {
    const i = this._o(s), l = [], a = ra(n, r, i), c = Wr(e, o, i, a);
    if (i.fill) if (i.fillStyle === "solid") {
      const h = Wr(e, o, i, a).opset;
      h.type = "fillPath", l.push(h);
    } else l.push(Ro([c.estimatedPoints], i));
    return i.stroke !== be && l.push(c.opset), this._d("ellipse", l, i);
  }
  circle(e, o, n, r) {
    const s = this.ellipse(e, o, n, n, r);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const n = this._o(o);
    return this._d("linearPath", [Rn(e, !1, n)], n);
  }
  arc(e, o, n, r, s, i, l = !1, a) {
    const c = this._o(a), h = [], p = oi(e, o, n, r, s, i, l, !0, c);
    if (l && c.fill) if (c.fillStyle === "solid") {
      const d = Object.assign({}, c);
      d.disableMultiStroke = !0;
      const f = oi(e, o, n, r, s, i, !0, !1, d);
      f.type = "fillPath", h.push(f);
    } else h.push(function(d, f, g, y, m, b, x) {
      const S = d, M = f;
      let I = Math.abs(g / 2), R = Math.abs(y / 2);
      I += Rt(0.01 * I, x), R += Rt(0.01 * R, x);
      let C = m, P = b;
      for (; C < 0; ) C += 2 * Math.PI, P += 2 * Math.PI;
      P - C > 2 * Math.PI && (C = 0, P = 2 * Math.PI);
      const j = (P - C) / x.curveStepCount, U = [];
      for (let ct = C; ct <= P; ct += j) U.push([S + I * Math.cos(ct), M + R * Math.sin(ct)]);
      return U.push([S + I * Math.cos(P), M + R * Math.sin(P)]), U.push([S, M]), Ro([U], x);
    }(e, o, n, r, s, i, c));
    return c.stroke !== be && h.push(p), this._d("arc", h, c);
  }
  curve(e, o) {
    const n = this._o(o), r = [], s = ei(e, n);
    if (n.fill && n.fill !== be) if (n.fillStyle === "solid") {
      const i = ei(e, Object.assign(Object.assign({}, n), { disableMultiStroke: !0, roughness: n.roughness ? n.roughness + n.fillShapeRoughnessGain : 0 }));
      r.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], l = e;
      if (l.length) {
        const a = typeof l[0][0] == "number" ? [l] : l;
        for (const c of a) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...mr(ai([c[0], c[0], c[1], c[2]]), 10, (1 + n.roughness) / 2)) : i.push(...mr(ai(c), 10, (1 + n.roughness) / 2));
      }
      i.length && r.push(Ro([i], n));
    }
    return n.stroke !== be && r.push(s), this._d("curve", r, n);
  }
  polygon(e, o) {
    const n = this._o(o), r = [], s = Rn(e, !0, n);
    return n.fill && (n.fillStyle === "solid" ? r.push(gr([e], n)) : r.push(Ro([e], n))), n.stroke !== be && r.push(s), this._d("polygon", r, n);
  }
  path(e, o) {
    const n = this._o(o), r = [];
    if (!e) return this._d("path", r, n);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = n.fill && n.fill !== "transparent" && n.fill !== be, i = n.stroke !== be, l = !!(n.simplification && n.simplification < 1), a = function(h, p, d) {
      const f = ea(ta(rs(h))), g = [];
      let y = [], m = [0, 0], b = [];
      const x = () => {
        b.length >= 4 && y.push(...mr(b, p)), b = [];
      }, S = () => {
        x(), y.length && (g.push(y), y = []);
      };
      for (const { key: I, data: R } of f) switch (I) {
        case "M":
          S(), m = [R[0], R[1]], y.push(m);
          break;
        case "L":
          x(), y.push([R[0], R[1]]);
          break;
        case "C":
          if (!b.length) {
            const C = y.length ? y[y.length - 1] : m;
            b.push([C[0], C[1]]);
          }
          b.push([R[0], R[1]]), b.push([R[2], R[3]]), b.push([R[4], R[5]]);
          break;
        case "Z":
          x(), y.push([m[0], m[1]]);
      }
      if (S(), !d) return g;
      const M = [];
      for (const I of g) {
        const R = id(I, d);
        R.length && M.push(R);
      }
      return M;
    }(e, 1, l ? 4 - 4 * (n.simplification || 1) : (1 + n.roughness) / 2), c = ni(e, n);
    if (s) if (n.fillStyle === "solid") if (a.length === 1) {
      const h = ni(e, Object.assign(Object.assign({}, n), { disableMultiStroke: !0, roughness: n.roughness ? n.roughness + n.fillShapeRoughnessGain : 0 }));
      r.push({ type: "fillPath", ops: this._mergedShape(h.ops) });
    } else r.push(gr(a, n));
    else r.push(Ro(a, n));
    return i && (l ? a.forEach((h) => {
      r.push(Rn(h, !1, n));
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
          i = { d: this.opsToPath(s), stroke: n.stroke, strokeWidth: n.strokeWidth, fill: be };
          break;
        case "fillPath":
          i = { d: this.opsToPath(s), stroke: be, strokeWidth: 0, fill: n.fill || be };
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
    return n < 0 && (n = o.strokeWidth / 2), { d: this.opsToPath(e), stroke: o.fill || be, strokeWidth: n, fill: be };
  }
  _mergedShape(e) {
    return e.filter((o, n) => n === 0 || o.op !== "move");
  }
}
class ad {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new On(o);
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
  arc(e, o, n, r, s, i, l = !1, a) {
    const c = this.gen.arc(e, o, n, r, s, i, l, a);
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
const zn = "http://www.w3.org/2000/svg";
class ld {
  constructor(e, o) {
    this.svg = e, this.gen = new On(o);
  }
  draw(e) {
    const o = e.sets || [], n = e.options || this.getDefaultOptions(), r = this.svg.ownerDocument || window.document, s = r.createElementNS(zn, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const l of o) {
      let a = null;
      switch (l.type) {
        case "path":
          a = r.createElementNS(zn, "path"), a.setAttribute("d", this.opsToPath(l, i)), a.setAttribute("stroke", n.stroke), a.setAttribute("stroke-width", n.strokeWidth + ""), a.setAttribute("fill", "none"), n.strokeLineDash && a.setAttribute("stroke-dasharray", n.strokeLineDash.join(" ").trim()), n.strokeLineDashOffset && a.setAttribute("stroke-dashoffset", `${n.strokeLineDashOffset}`);
          break;
        case "fillPath":
          a = r.createElementNS(zn, "path"), a.setAttribute("d", this.opsToPath(l, i)), a.setAttribute("stroke", "none"), a.setAttribute("stroke-width", "0"), a.setAttribute("fill", n.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || a.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          a = this.fillSketch(r, l, n);
      }
      a && s.appendChild(a);
    }
    return s;
  }
  fillSketch(e, o, n) {
    let r = n.fillWeight;
    r < 0 && (r = n.strokeWidth / 2);
    const s = e.createElementNS(zn, "path");
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
  arc(e, o, n, r, s, i, l = !1, a) {
    const c = this.gen.arc(e, o, n, r, s, i, l, a);
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
var cd = { canvas: (t, e) => new ad(t, e), svg: (t, e) => new ld(t, e), generator: (t) => new On(t), newSeed: () => On.newSeed() };
const Ge = cd.generator();
function dd(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const n = t.charCodeAt(o);
    e = (e << 5) - e + n, e |= 0;
  }
  return Math.abs(e);
}
function so(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? dd(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function io(t) {
  var n;
  const e = t.options, o = (n = e == null ? void 0 : e.strokeLineDash) != null && n.length ? e.strokeLineDash.join(" ") : void 0;
  return Ge.toPaths(t).map((r) => ({
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
function hd(t, e, o, n, r) {
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
function Xn(t, e, o, n, r, s) {
  if (s) {
    const i = Uo(o, n);
    return io(Ge.path(hd(t, e, o, n, i), so(r)));
  }
  return io(Ge.rectangle(t, e, o, n, so(r)));
}
function ss(t, e, o, n, r) {
  return io(Ge.ellipse(t, e, o, n, so(r)));
}
function ud(t, e, o, n, r) {
  const s = t + o / 2, i = e + n / 2, l = [s, e], a = [t + o, i], c = [s, e + n], h = [t, i], p = Math.hypot(o / 2, n / 2), d = Math.min(r, p / 2) / p, f = (R, C, P) => [
    R[0] + P * (C[0] - R[0]),
    R[1] + P * (C[1] - R[1])
  ], g = f(h, l, 1 - d), y = f(l, a, d), m = f(l, a, 1 - d), b = f(a, c, d), x = f(a, c, 1 - d), S = f(c, h, d), M = f(c, h, 1 - d), I = f(h, l, d);
  return [
    `M${y[0]},${y[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${a[0]},${a[1]} ${b[0]},${b[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${c[0]},${c[1]} ${S[0]},${S[1]}`,
    `L${M[0]},${M[1]}`,
    `Q${h[0]},${h[1]} ${I[0]},${I[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${l[0]},${l[1]} ${y[0]},${y[1]}`,
    "Z"
  ].join(" ");
}
function is(t, e, o, n, r, s) {
  if (s) {
    const l = Uo(o, n);
    return io(Ge.path(ud(t, e, o, n, l), so(r)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + n / 2],
    [t + o / 2, e + n],
    [t, e + n / 2]
  ];
  return io(Ge.polygon(i, so(r)));
}
function jo(t, e, o, n, r) {
  return io(Ge.line(t, e, o, n, so(r)));
}
function as(t, e, o, n, r) {
  const s = jo(t, e, o, n, r), i = Math.atan2(n - e, o - t), l = Math.max(12, r.strokeWidth * 4), a = Math.PI / 6, c = o - l * Math.cos(i - a), h = n - l * Math.sin(i - a), p = o - l * Math.cos(i + a), d = n - l * Math.sin(i + a), f = jo(o, n, c, h, r), g = jo(o, n, p, d, r);
  return [...s, ...f, ...g];
}
function li(t, e) {
  const o = {
    ...so(e),
    stroke: "none"
  };
  return io(Ge.polygon(t, o));
}
function br(t, e) {
  return io(Ge.path(t, so(e)));
}
function ao(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function pd(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, n = parseInt(e.substring(2, 4), 16) || 0, r = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * n + 0.114 * r) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function fd({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ u(gd, { node: o }) : /* @__PURE__ */ u(yd, { node: o });
  }
  return /* @__PURE__ */ u(md, { node: t, editingLabel: e });
}
const Yn = ge(fd), yd = ge(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", n = ao(e.data.strokeStyle), r = Kt(
    () => o ? null : os(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = Kt(() => {
    const h = e.data.points;
    if (!h || h.length === 0) return "";
    if (h.length === 1) return `M${h[0][0]},${h[0][1]}L${h[0][0]},${h[0][1]}`;
    const p = [`M${h[0][0]},${h[0][1]}`];
    for (let d = 1; d < h.length; d++)
      p.push(`L${h[d][0]},${h[d][1]}`);
    return p.join("");
  }, [e.data.points]), i = Kt(() => {
    if (!o) return null;
    const h = e.data.points;
    if (h.length < 2) return "";
    const p = ["M", h[0][0], h[0][1]];
    for (let f = 1; f < h.length; f++) {
      const [g, y] = h[f], [m, b] = h[f - 1];
      p.push("Q", m, b, (m + g) / 2, (b + y) / 2);
    }
    const d = h[h.length - 1];
    return p.push("L", d[0], d[1]), p.join(" ");
  }, [e.data.points, o]), l = Kt(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const h = e.data.points.map((M) => [M[0], M[1]]), p = _i(h), d = p[0], f = p[p.length - 1], g = Math.hypot(d[0] - f[0], d[1] - f[1]);
    let y = 0;
    for (let M = 1; M < p.length; M++)
      y += Math.hypot(p[M][0] - p[M - 1][0], p[M][1] - p[M - 1][1]);
    const m = y >= 1 && g <= Math.max(e.data.strokeWidth * 4, 20) && g <= y * 0.1, b = e.data.fillStyle || "solid";
    if (m) {
      const M = Gc(p, 0);
      return b === "solid" ? { kind: "solid", d: M, fill: e.data.fill } : { kind: "rough", paths: li(p, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: b,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const x = Kc(p);
    if (x.length === 0) return null;
    if (b === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: x
      };
    const S = [];
    for (const { points: M } of x)
      M.length >= 3 && S.push(
        ...li(M, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: b,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: S, regions: x };
  }, [e.data.fill, e.data.fillStyle, e.data.points, e.data.strokeWidth]), a = e.h === "auto" ? 0 : e.h, c = e.data.strokeWidth * 4;
  return /* @__PURE__ */ u(
    "div",
    {
      style: {
        position: "absolute",
        left: e.x - c,
        top: e.y - c,
        width: e.w + c * 2,
        height: a + c * 2,
        zIndex: e.z,
        pointerEvents: "none",
        transform: e.rotation ? `rotate(${e.rotation}deg)` : void 0,
        transformOrigin: "center center"
      },
      children: /* @__PURE__ */ u(
        "svg",
        {
          width: e.w + c * 2,
          height: a + c * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ k("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
            (l == null ? void 0 : l.kind) === "solid" && (l.regions ? l.regions.map((h, p) => /* @__PURE__ */ u(
              "path",
              {
                d: h.pathD,
                fill: l.fill,
                stroke: "none"
              },
              p
            )) : /* @__PURE__ */ u("path", { d: l.d, fill: l.fill, stroke: "none" })),
            (l == null ? void 0 : l.kind) === "rough" && l.paths.map((h, p) => /* @__PURE__ */ u(
              "path",
              {
                d: h.d,
                stroke: h.stroke,
                strokeWidth: h.strokeWidth,
                fill: h.fill,
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
                strokeDasharray: n == null ? void 0 : n.map((h) => h * Math.max(e.data.strokeWidth, 1)).join(" "),
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
}), gd = ge(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, n = e.data.strokeWidth * 2, r = Kt(() => {
    const l = e.data.points;
    if (!l || l.length === 0) return "";
    const a = [`M${l[0][0]},${l[0][1]}`];
    for (let c = 1; c < l.length; c++)
      a.push(`L${l[c][0]},${l[c][1]}`);
    return a.push("Z"), a.join("");
  }, [e.data.points]), s = ao(e.data.strokeStyle), i = s == null ? void 0 : s.map((l) => l * Math.max(e.data.strokeWidth, 1)).join(" ");
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
          children: /* @__PURE__ */ k("g", { transform: `translate(${n}, ${n})`, opacity: e.data.opacity ?? 1, children: [
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
}), md = ge(function({ node: e, editingLabel: o }) {
  var m, b, x, S;
  const n = e.h === "auto" ? 100 : e.h, r = e.data.strokeWidth * 2, s = ao(e.data.strokeStyle), i = ((m = e.data.startPoint) == null ? void 0 : m[0]) ?? 0, l = ((b = e.data.startPoint) == null ? void 0 : b[1]) ?? n / 2, a = ((x = e.data.endPoint) == null ? void 0 : x[0]) ?? e.w, c = ((S = e.data.endPoint) == null ? void 0 : S[1]) ?? n / 2, h = Kt(() => {
    if (e.data.roughness === 0) return null;
    const M = {
      stroke: e.data.stroke,
      fill: e.data.fill,
      fillStyle: e.data.fillStyle,
      roughness: e.data.roughness,
      strokeWidth: e.data.strokeWidth,
      strokeLineDash: s,
      seed: e.id
    }, I = e.data.edgeStyle === "round";
    switch (e.data.shape) {
      case "rect":
        return Xn(0, 0, e.w, n, M, I);
      case "ellipse":
        return ss(e.w / 2, n / 2, e.w, n, M);
      case "diamond":
        return is(0, 0, e.w, n, M, I);
      case "line":
        return jo(i, l, a, c, M);
      case "arrow":
        return as(i, l, a, c, M);
      default:
        return null;
    }
  }, [e, s, i, l, a, c, n]), p = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, d = e.data.opacity ?? 1, f = e.data.shape === "line" || e.data.shape === "arrow", g = e.data.label, y = e.data.labelFontSize ?? 14;
  return /* @__PURE__ */ k(
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
            children: /* @__PURE__ */ k("g", { transform: `translate(${r}, ${r})`, opacity: d, children: [
              p && /* @__PURE__ */ u(
                wd,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              h ? h.map((M, I) => p && M.fill && M.fill !== "none" ? null : /* @__PURE__ */ u(
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
                I
              )) : /* @__PURE__ */ u(
                bd,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  x1: i,
                  y1: l,
                  x2: a,
                  y2: c,
                  stroke: e.data.stroke,
                  fill: e.data.fill,
                  strokeWidth: e.data.strokeWidth,
                  dashArray: s,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              /* @__PURE__ */ u(
                xd,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: n,
                  x1: i,
                  y1: l,
                  x2: a,
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
                  fontFamily: no(e.data.labelFontFamily ?? oo),
                  fontSize: y,
                  color: e.data.fill && e.data.fillStyle === "solid" ? pd(e.data.fill) : e.data.stroke,
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
function ls(t, e) {
  const o = Uo(t, e), n = t / 2, r = e / 2, s = [n, 0], i = [t, r], l = [n, e], a = [0, r], c = Math.hypot(t / 2, e / 2), h = Math.min(o, c / 2) / c, p = (M, I, R) => [
    M[0] + R * (I[0] - M[0]),
    M[1] + R * (I[1] - M[1])
  ], d = p(s, i, h), f = p(s, i, 1 - h), g = p(i, l, h), y = p(i, l, 1 - h), m = p(l, a, h), b = p(l, a, 1 - h), x = p(a, s, h), S = p(a, s, 1 - h);
  return [
    `M${d[0]},${d[1]}`,
    `L${f[0]},${f[1]}`,
    `Q${i[0]},${i[1]} ${g[0]},${g[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${l[0]},${l[1]} ${m[0]},${m[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${a[0]},${a[1]} ${x[0]},${x[1]}`,
    `L${S[0]},${S[1]}`,
    `Q${s[0]},${s[1]} ${d[0]},${d[1]}`,
    "Z"
  ].join(" ");
}
function bd({
  shape: t,
  w: e,
  h: o,
  x1: n,
  y1: r,
  x2: s,
  y2: i,
  stroke: l,
  fill: a,
  strokeWidth: c,
  dashArray: h,
  rounded: p
}) {
  const d = h == null ? void 0 : h.join(",");
  switch (t) {
    case "rect": {
      const f = !!a && a !== "none", g = o <= Math.max(c * 2, 4), y = e <= Math.max(c * 2, 4);
      if (!f && (g || y))
        return g && e >= o ? /* @__PURE__ */ u(
          "line",
          {
            x1: 0,
            y1: o / 2,
            x2: e,
            y2: o / 2,
            stroke: l,
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
            stroke: l,
            strokeWidth: Math.max(c, e),
            strokeDasharray: d
          }
        );
      const m = p ? Uo(e, o) : 0;
      return /* @__PURE__ */ u(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: m || void 0,
          ry: m || void 0,
          stroke: l,
          fill: a || "none",
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
          stroke: l,
          fill: a || "none",
          strokeWidth: c,
          strokeDasharray: d
        }
      );
    case "diamond":
      return p ? /* @__PURE__ */ u(
        "path",
        {
          d: ls(e, o),
          stroke: l,
          fill: a || "none",
          strokeWidth: c,
          strokeDasharray: d
        }
      ) : /* @__PURE__ */ u(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: l,
          fill: a || "none",
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
          stroke: l,
          strokeWidth: c,
          strokeDasharray: d
        }
      );
    case "arrow": {
      const f = Math.atan2(i - r, s - n), g = Math.max(12, c * 4), y = Math.PI / 6, m = s - g * Math.cos(f - y), b = i - g * Math.sin(f - y), x = s - g * Math.cos(f + y), S = i - g * Math.sin(f + y);
      return /* @__PURE__ */ k(mt, { children: [
        /* @__PURE__ */ u(
          "line",
          {
            x1: n,
            y1: r,
            x2: s,
            y2: i,
            stroke: l,
            strokeWidth: c,
            strokeDasharray: d
          }
        ),
        /* @__PURE__ */ u(
          "polyline",
          {
            points: `${m},${b} ${s},${i} ${x},${S}`,
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
function xd({
  shape: t,
  w: e,
  h: o,
  x1: n,
  y1: r,
  x2: s,
  y2: i,
  hasFill: l,
  strokeWidth: a,
  rounded: c
}) {
  const h = l ? "painted" : "stroke", p = l ? "transparent" : "none";
  switch (t) {
    case "rect": {
      const d = c ? Uo(e, o) : 0;
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
          strokeWidth: a,
          pointerEvents: h
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
          strokeWidth: a,
          pointerEvents: h
        }
      );
    case "diamond":
      return c ? /* @__PURE__ */ u(
        "path",
        {
          d: ls(e, o),
          fill: p,
          stroke: "transparent",
          strokeWidth: a,
          pointerEvents: h
        }
      ) : /* @__PURE__ */ u(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: p,
          stroke: "transparent",
          strokeWidth: a,
          pointerEvents: h
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
          strokeWidth: a,
          pointerEvents: "stroke"
        }
      );
    default:
      return null;
  }
}
function wd({
  shape: t,
  w: e,
  h: o,
  fill: n,
  rounded: r
}) {
  switch (t) {
    case "rect": {
      const s = r ? Uo(e, o) : 0;
      return /* @__PURE__ */ u("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: n, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ u("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: n, stroke: "none" });
    case "diamond":
      return r ? /* @__PURE__ */ u(
        "path",
        {
          d: ls(e, o),
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
const kd = ge(function(e) {
  return /* @__PURE__ */ u(Yn, { node: e.node });
}), vd = {
  type: "draw",
  component: kd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, n) => Ur(t, e, o, n),
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
}, Sd = ge(function(e) {
  const o = e.node;
  return /* @__PURE__ */ u(Yn, { node: o, editingLabel: e.editing });
}), Md = {
  type: "shape",
  component: Sd,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, n) => Vn(t, e, o, n),
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
function Cd(t) {
  return null;
}
const zd = {
  type: "edge",
  component: Cd,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, In = 0.05, Id = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function Td({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  onResizeHandleDown: s,
  cropping: i,
  onCropStart: l,
  onCropEnd: a
}) {
  const c = t.h, h = t.data.crop, p = lt(!1);
  p.current = !!i;
  const d = lt(null), [f, g] = tt(null), y = it(() => {
    d.current && d.current.naturalWidth > 0 && g({ w: d.current.naturalWidth, h: d.current.naturalHeight });
  }, []);
  bt(() => {
    d.current && d.current.naturalWidth > 0 && g({ w: d.current.naturalWidth, h: d.current.naturalHeight });
  }, [t.data.src]);
  const [m, b] = tt({ x: 0, y: 0, w: 1, h: 1 });
  bt(() => {
    i && (b(h ?? { x: 0, y: 0, w: 1, h: 1 }), !f && d.current && d.current.naturalWidth > 0 && g({ w: d.current.naturalWidth, h: d.current.naturalHeight }));
  }, [i]);
  const x = Kt(() => {
    if (!f) return null;
    const N = f.w / f.h, V = t.w / c;
    let H, _;
    return N > V ? (H = t.w, _ = t.w / N) : (_ = c, H = c * N), { x: (t.w - H) / 2, y: (c - _) / 2, w: H, h: _ };
  }, [f, t.w, c]), S = it(() => {
    const N = m.x < 1e-3 && m.y < 1e-3 && m.w > 0.999 && m.h > 0.999;
    o.updateNodeWithHistory(t.id, {
      data: {
        ...t.data,
        crop: N ? void 0 : { x: m.x, y: m.y, w: m.w, h: m.h }
      }
    }), a == null || a();
  }, [o, t, m, a]), M = it(() => {
    a == null || a();
  }, [a]);
  bt(() => {
    if (!i) return;
    const N = (V) => {
      V.key === "Enter" ? (S(), V.preventDefault(), V.stopPropagation()) : V.key === "Escape" && (M(), V.preventDefault(), V.stopPropagation());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [i, S, M]);
  const I = it(
    (N, V) => {
      if (V.stopPropagation(), V.preventDefault(), !x) return;
      const H = V.currentTarget.ownerDocument, _ = V.clientX, et = V.clientY, ot = { ...m }, ut = (Tt) => {
        const rt = (Tt.clientX - _) / r / x.w, St = (Tt.clientY - et) / r / x.h, Mt = { ...ot }, ht = ot.x + ot.w, Wt = ot.y + ot.h;
        if (N.includes("left")) {
          const Pt = Math.max(0, Math.min(ht - In, ot.x + rt));
          Mt.x = Pt, Mt.w = ht - Pt;
        }
        if (N.includes("right") && (Mt.w = Math.max(
          In,
          Math.min(1 - ot.x, ot.w + rt)
        )), N.includes("top")) {
          const Pt = Math.max(0, Math.min(Wt - In, ot.y + St));
          Mt.y = Pt, Mt.h = Wt - Pt;
        }
        N.includes("bottom") && (Mt.h = Math.max(
          In,
          Math.min(1 - ot.y, ot.h + St)
        )), b(Mt);
      }, pt = () => {
        H.removeEventListener("pointermove", ut), H.removeEventListener("pointerup", pt);
      };
      H.addEventListener("pointermove", ut), H.addEventListener("pointerup", pt);
    },
    [m, x, r]
  ), R = it(
    (N) => {
      if (N.stopPropagation(), N.preventDefault(), !x) return;
      const V = N.currentTarget.ownerDocument, H = N.clientX, _ = N.clientY, et = { ...m }, ot = (pt) => {
        const Tt = (pt.clientX - H) / r / x.w, rt = (pt.clientY - _) / r / x.h;
        b({
          ...et,
          x: Math.max(0, Math.min(1 - et.w, et.x + Tt)),
          y: Math.max(0, Math.min(1 - et.h, et.y + rt))
        });
      }, ut = () => {
        V.removeEventListener("pointermove", ot), V.removeEventListener("pointerup", ut);
      };
      V.addEventListener("pointermove", ot), V.addEventListener("pointerup", ut);
    },
    [m, x, r]
  ), C = it(
    (N) => {
      if (p.current) return;
      const V = N.currentTarget.ownerDocument;
      if (N.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: Pt, y: Et } = o.screenToCanvas(
          N.clientX,
          N.clientY
        );
        for (const Jt of o.selection) {
          const Zt = o.getNode(Jt);
          if (!Zt) continue;
          const re = Zt.h === "auto" ? 100 : Zt.h;
          if (Pt >= Zt.x && Pt <= Zt.x + Zt.w && Et >= Zt.y && Et <= Zt.y + re)
            return;
        }
      }
      N.stopPropagation(), N.preventDefault(), N.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const H = N.clientX, _ = N.clientY, et = Array.from(o.selection), ot = et.map((Pt) => {
        const Et = o.getNode(Pt);
        return { id: Pt, x: Et.x, y: Et.y };
      });
      let ut = !1, pt = null, Tt = H, rt = _, St = !1;
      const Mt = () => {
        pt = null;
        const Pt = (Tt - H) / o.viewport.zoom, Et = (rt - _) / o.viewport.zoom, { finalDx: Jt, finalDy: Zt } = o.computeDragSnap(
          ot,
          et,
          Pt,
          Et,
          St
        ), re = ot.map(($t) => ({
          id: $t.id,
          patch: { x: $t.x + Jt, y: $t.y + Zt }
        }));
        o.updateMany(re);
      }, ht = (Pt) => {
        const Et = (Pt.clientX - H) / o.viewport.zoom, Jt = (Pt.clientY - _) / o.viewport.zoom;
        if (!ut)
          if (Math.abs(Et) > 2 || Math.abs(Jt) > 2)
            ut = !0, o.pushHistorySnapshot();
          else
            return;
        Tt = Pt.clientX, rt = Pt.clientY, St = Pt.metaKey || Pt.ctrlKey, pt === null && (pt = requestAnimationFrame(Mt));
      }, Wt = () => {
        pt !== null && (cancelAnimationFrame(pt), Mt()), o.clearAlignGuides(), V.removeEventListener("pointermove", ht), V.removeEventListener("pointerup", Wt);
      };
      V.addEventListener("pointermove", ht), V.addEventListener("pointerup", Wt);
    },
    [o, t.id]
  ), P = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], j = 8 / r, U = j / 2, ct = 25 / r, O = e && s && !i, nt = it(
    (N) => {
      const V = N.currentTarget.ownerDocument;
      N.stopPropagation(), N.preventDefault();
      const H = t.x + t.w / 2, _ = t.y + c / 2, et = t.rotation || 0, { x: ot, y: ut } = o.screenToCanvas(
        N.clientX,
        N.clientY
      ), pt = Math.atan2(ut - _, ot - H);
      o.pushHistorySnapshot();
      const Tt = (St) => {
        const { x: Mt, y: ht } = o.screenToCanvas(
          St.clientX,
          St.clientY
        ), Wt = Math.atan2(ht - _, Mt - H);
        let Pt = et + (Wt - pt) * (180 / Math.PI);
        (St.shiftKey || o.snapToGrid) && !(St.metaKey || St.ctrlKey) && (Pt = Math.round(Pt / 15) * 15), o.updateNode(t.id, { rotation: Pt });
      }, rt = () => {
        V.removeEventListener("pointermove", Tt), V.removeEventListener("pointerup", rt);
      };
      V.addEventListener("pointermove", Tt), V.addEventListener("pointerup", rt);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), Q = i && x ? {
    left: x.x + m.x * x.w,
    top: x.y + m.y * x.h,
    width: m.w * x.w,
    height: m.h * x.h
  } : null, J = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, E = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: J
  };
  if (!i && h) {
    const N = h.y * 100, V = (1 - h.x - h.w) * 100, H = (1 - h.y - h.h) * 100, _ = h.x * 100;
    E.objectViewBox = `inset(${N}% ${V}% ${H}% ${_}%)`;
  }
  const G = 8 / r, X = G / 2;
  return /* @__PURE__ */ k(
    "div",
    {
      onPointerDown: C,
      onDoubleClick: !i && n ? (N) => {
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
        border: e ? "2px dashed #3b82f6" : "none",
        borderRadius: 6,
        overflow: "visible",
        pointerEvents: n ? "auto" : "none",
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
                  ref: d,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: y,
                  style: E,
                  draggable: !1
                }
              ),
              i && Q && /* @__PURE__ */ u(
                "div",
                {
                  onPointerDown: R,
                  style: {
                    position: "absolute",
                    left: Q.left,
                    top: Q.top,
                    width: Q.width,
                    height: Q.height,
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
        i && Q && Id.map(({ pos: N, edges: V, cx: H, cy: _, cursor: et }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (ot) => I(V, ot),
            style: {
              position: "absolute",
              left: Q.left + H * Q.width - X,
              top: Q.top + _ * Q.height - X,
              width: G,
              height: G,
              background: "white",
              border: `${1.5 / r}px solid #3b82f6`,
              borderRadius: 2,
              cursor: et,
              zIndex: 11
            }
          },
          N
        )),
        e && !i && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ u(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: -ct,
                width: 1,
                height: ct,
                background: "#3b82f6",
                marginLeft: -0.5,
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: nt,
              style: {
                position: "absolute",
                left: "50%",
                top: -(ct + j / 2),
                width: j,
                height: j,
                marginLeft: -j / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        O && P.map(({ pos: N, cx: V, cy: H }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (_) => {
              _.stopPropagation(), s == null || s(t.id, N, _);
            },
            style: {
              position: "absolute",
              left: `calc(${V * 100}% - ${U}px)`,
              top: `calc(${H * 100}% - ${U}px)`,
              width: j,
              height: j,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: Kn(N, t.rotation || 0)
            }
          },
          N
        ))
      ]
    }
  );
}
const ia = ge(Td);
function Pd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    ia,
    {
      node: e,
      isSelected: t.isSelected,
      engine: t.engine,
      interactive: t.interactive,
      zoom: t.zoom,
      onResizeHandleDown: t.callbacks.onResizeHandleDown,
      cropping: t.editing,
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
const Ad = {
  type: "image",
  component: Pd,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function Ed({
  node: t,
  engine: e,
  editing: o,
  editClickPos: n,
  onStopEdit: r,
  onMeasuredHeight: s
}) {
  const i = lt(null), [l, a] = tt(t.data.text), c = lt(!1), h = lt(t.data.text), p = lt(null), d = lt(e);
  d.current = e;
  const f = lt(t);
  f.current = t, bt(() => {
    o || a(t.data.text);
  }, [t.data.text]), qr(() => {
    var I, R;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const C = i.current.ownerDocument;
      let P = !1;
      if (n) {
        const j = C.caretRangeFromPoint(n.clientX, n.clientY);
        if (j && i.current.contains(j.startContainer)) {
          const U = (I = C.defaultView) == null ? void 0 : I.getSelection();
          U == null || U.removeAllRanges(), U == null || U.addRange(j), P = !0;
        }
      }
      if (!P) {
        const j = C.createRange(), U = (R = C.defaultView) == null ? void 0 : R.getSelection();
        i.current.childNodes.length > 0 && (j.selectNodeContents(i.current), j.collapse(!1)), U == null || U.removeAllRanges(), U == null || U.addRange(j);
      }
      h.current = t.data.text, c.current = !1;
    }
  }, [o]), bt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const I = h.current, R = e.getNode(t.id);
        if (R && R.type === "text") {
          const C = R.data;
          I !== C.text && e.updateNodeWithHistory(t.id, {
            data: { ...C, text: I }
          });
        }
      };
  }, [o, e, t.id]), bt(() => {
    if (!i.current || !s) return;
    const I = new ResizeObserver(() => {
      var C;
      const R = ((C = i.current) == null ? void 0 : C.offsetHeight) ?? 0;
      R > 0 && s(t.id, R);
    });
    return I.observe(i.current), () => I.disconnect();
  }, [t.id, s, o]);
  const g = it(() => {
    var R;
    if (c.current) return;
    c.current = !0, p.current && (clearTimeout(p.current), p.current = null);
    const I = ((R = i.current) == null ? void 0 : R.innerText) ?? "";
    a(I), h.current = I, I !== t.data.text && e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: I }
    }), r();
  }, [e, t, r]), y = it(
    (I) => {
      var R;
      I.key === "Escape" && (I.preventDefault(), g(), (R = i.current) == null || R.blur()), I.stopPropagation();
    },
    [g]
  ), m = it(() => {
    g();
  }, [g]), b = it(() => {
    if (i.current) {
      const I = i.current.innerText;
      a(I), h.current = I, p.current && clearTimeout(p.current), p.current = setTimeout(() => {
        const R = f.current;
        I !== R.data.text && d.current.updateNode(R.id, {
          data: { ...R.data, text: I }
        });
      }, 0);
    }
  }, []), x = t.h === "auto" ? void 0 : t.h, S = t.data.opacity ?? 1, M = {
    fontFamily: no(t.data.fontFamily),
    fontSize: t.data.fontSize,
    color: t.data.color,
    textAlign: t.data.align,
    opacity: S,
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
        height: x,
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
          onBlur: m,
          onInput: b,
          onPointerDown: (I) => I.stopPropagation(),
          style: { ...M, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ u("div", { ref: i, style: M, children: l || " " })
    }
  );
}
const aa = ge(Ed);
function Rd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    aa,
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
const Ld = {
  type: "text",
  component: Rd,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function Dd(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, n = it(
    (s) => {
      var l, a;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (a = (l = t.callbacks).onEditEnd) == null || a.call(l);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), r = it(
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
const Wd = {
  type: "frame",
  component: Dd,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, Bd = 100;
function Fd({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  editing: s,
  onEditStart: i,
  onEditEnd: l
}) {
  const a = lt(null), c = lt(null), h = lt(""), p = lt(null), d = lt(null), f = lt(t);
  f.current = t;
  const g = lt(o);
  g.current = o, bt(() => {
    var M;
    if (s && c.current) {
      const I = c.current;
      I.innerText = t.data.text || "", h.current = t.data.text || "", I.focus();
      const R = I.ownerDocument, C = (M = R.defaultView) == null ? void 0 : M.getSelection(), P = p.current;
      p.current = null;
      let j = !1;
      if (P && C && R.caretRangeFromPoint) {
        const U = R.caretRangeFromPoint(P.x, P.y);
        U && I.contains(U.startContainer) && (C.removeAllRanges(), C.addRange(U), j = !0);
      }
      if (!j && C) {
        const U = R.createRange();
        I.childNodes.length > 0 && (U.selectNodeContents(I), U.collapse(!1)), C.removeAllRanges(), C.addRange(U);
      }
    }
  }, [s]), bt(() => {
    if (s)
      return () => {
        const M = f.current, I = h.current;
        I !== M.data.text && g.current.updateNodeWithHistory(M.id, {
          data: { ...M.data, text: I }
        });
      };
  }, [s]);
  const y = it(() => {
    d.current && (clearTimeout(d.current), d.current = null), c.current && (h.current = c.current.innerText), l();
  }, [l]), m = it(
    (M) => {
      const I = M.currentTarget.ownerDocument;
      if (M.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: X, y: N } = o.screenToCanvas(M.clientX, M.clientY);
        for (const V of o.selection) {
          const H = o.getNode(V);
          if (!H) continue;
          const _ = H.h === "auto" ? 100 : H.h;
          if (X >= H.x && X <= H.x + H.w && N >= H.y && N <= H.y + _)
            return;
        }
      }
      if (M.stopPropagation(), s) return;
      M.currentTarget.setPointerCapture(M.pointerId), M.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const R = M.clientX, C = M.clientY, P = Array.from(o.selection), j = [];
      for (const X of P) {
        const N = o.getNode(X);
        N && j.push({ id: X, x: N.x, y: N.y });
      }
      if (j.length === 0) return;
      let U = !1, ct = null, O = R, nt = C, Q = !1;
      const J = () => {
        ct = null;
        const X = (O - R) / o.viewport.zoom, N = (nt - C) / o.viewport.zoom, { finalDx: V, finalDy: H } = o.computeDragSnap(
          j,
          P,
          X,
          N,
          Q
        ), _ = j.map((et) => ({
          id: et.id,
          patch: { x: et.x + V, y: et.y + H }
        }));
        o.updateMany(_);
      }, E = (X) => {
        const N = (X.clientX - R) / o.viewport.zoom, V = (X.clientY - C) / o.viewport.zoom;
        if (!U)
          if (Math.abs(N) > 2 || Math.abs(V) > 2)
            U = !0, o.pushHistorySnapshot();
          else
            return;
        O = X.clientX, nt = X.clientY, Q = X.metaKey || X.ctrlKey, ct === null && (ct = requestAnimationFrame(J));
      }, G = () => {
        ct !== null && (cancelAnimationFrame(ct), J()), o.clearAlignGuides(), I.removeEventListener("pointermove", E), I.removeEventListener("pointerup", G);
      };
      I.addEventListener("pointermove", E), I.addEventListener("pointerup", G);
    },
    [o, t.id, s]
  ), b = it(
    (M) => {
      if (n) {
        if (M.stopPropagation(), t.groupId) {
          const I = [];
          let R = t.groupId;
          for (; R; )
            I.push(R), R = o.groupParent.get(R);
          if (!o.activeGroupId) {
            o.enterGroup(I[I.length - 1]), o.select(t.id);
            return;
          }
          const C = I.indexOf(o.activeGroupId);
          if (C > 0) {
            o.enterGroup(I[C - 1]), o.select(t.id);
            return;
          }
        }
        s || (p.current = { x: M.clientX, y: M.clientY }, o.select(t.id), i(t.id));
      }
    },
    [n, s, o, t.id, t.groupId, i]
  ), x = t.data.fontSize ?? 16, S = t.h === "auto" ? Bd : t.h;
  return /* @__PURE__ */ u(
    "div",
    {
      ref: a,
      "data-node-id": t.id,
      className: n ? void 0 : "sb-block-inert",
      onPointerDown: n ? m : void 0,
      onDoubleClick: b,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: S,
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
                c.current && (h.current = c.current.innerText, d.current && clearTimeout(d.current), d.current = setTimeout(() => {
                  const M = f.current, I = h.current;
                  I !== M.data.text && g.current.updateNode(M.id, {
                    data: { ...M.data, text: I }
                  });
                }, 0));
              },
              onKeyDown: (M) => {
                M.key === "Escape" && (M.stopPropagation(), y()), M.stopPropagation();
              },
              onPointerDown: (M) => M.stopPropagation(),
              style: {
                fontSize: x,
                fontFamily: no(oo),
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
                fontSize: x,
                fontFamily: no(oo),
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
const la = ge(Fd);
function Nd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    la,
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
const Hd = {
  type: "sticky",
  component: Nd,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, ca = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function Od(t) {
  const e = t.match(ca);
  return e ? e[1] : null;
}
function Xd(t) {
  return ca.test(t);
}
function Yd(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function Gd(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function jd({
  node: t,
  isSelected: e,
  engine: o,
  interactive: n,
  zoom: r,
  editing: s,
  onResizeHandleDown: i,
  onEditStart: l
}) {
  const a = t.h, { data: c } = t, h = (g) => {
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
  return /* @__PURE__ */ k(
    "div",
    {
      onPointerDown: h,
      onDoubleClick: !s && n ? (g) => {
        g.stopPropagation(), l == null || l();
      } : void 0,
      style: {
        position: "absolute",
        left: t.x + t.w / 2,
        top: t.y + a / 2,
        width: t.w,
        height: a,
        marginLeft: -t.w / 2,
        marginTop: -a / 2,
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
                  src: Yd(c.videoId),
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
            onPointerDown: (y) => {
              y.stopPropagation(), i == null || i(t.id, g.key, y);
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
const Vd = ge(jd);
function Kd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    Vd,
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
const qd = {
  type: "youtube",
  component: Kd,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, Ud = [
  Mc,
  vd,
  Md,
  zd,
  Ad,
  Ld,
  Wd,
  Hd,
  qd
];
function fo(t, e) {
  return `${t}:${e}`;
}
class Zd {
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
    return this.values.get(fo(e, o)) ?? null;
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
      let a = !1;
      for (const c of l) {
        const h = c.data;
        if (h.toId === e && h.targetPort === i.id) {
          const p = this.values.get(
            fo(h.fromId, h.sourcePort ?? "")
          );
          n[i.id] = p ?? i.defaultValue ?? null, a = !0;
          break;
        }
      }
      a || (n[i.id] = i.defaultValue ?? null);
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
      s.direction === "output" && (n[s.id] = this.values.get(fo(e, s.id)) ?? null);
    return n;
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
        for (const a of i) {
          const c = a.data;
          if (c.toId === e && c.targetPort === s.id) {
            n[s.id] = this.values.get(fo(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, l = !0;
            break;
          }
        }
        l || (n[s.id] = s.defaultValue ?? null);
      } else
        n[s.id] = this.values.get(fo(e, s.id)) ?? null;
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
            this.values.delete(fo(r.id, i.id));
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
    for (const n of o) {
      const r = n.data;
      r.fromId === e && r.targetPort && this.dirty.add(r.toId);
    }
  }
  /** Topological sort of dirty nodes + their downstream dependents. */
  topoSort() {
    const e = /* @__PURE__ */ new Set();
    for (const g of this.spatial.nodes.values()) {
      const y = this.registry.get(g.type);
      y != null && y.ports && y.compute && e.add(g.id);
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
      const y = g.data;
      y.sourcePort && y.targetPort && e.has(y.fromId) && e.has(y.toId) && (o.get(y.fromId).add(y.toId), n.set(y.toId, (n.get(y.toId) ?? 0) + 1));
    }
    const s = new Set(this.dirty), i = /* @__PURE__ */ new Set(), l = (g) => {
      if (i.has(g)) return;
      i.add(g);
      const y = o.get(g);
      if (y)
        for (const m of y)
          s.add(m), l(m);
    };
    for (const g of [...this.dirty])
      l(g);
    const a = /* @__PURE__ */ new Map();
    for (const g of s)
      a.set(g, 0);
    for (const g of r) {
      const y = g.data;
      y.sourcePort && y.targetPort && s.has(y.fromId) && s.has(y.toId) && a.set(
        y.toId,
        (a.get(y.toId) ?? 0) + 1
      );
    }
    const c = [];
    for (const [g, y] of a)
      y === 0 && c.push(g);
    const h = [];
    for (; c.length > 0; ) {
      const g = c.shift();
      h.push(g);
      const y = o.get(g);
      if (y)
        for (const m of y) {
          if (!s.has(m)) continue;
          const b = (a.get(m) ?? 1) - 1;
          a.set(m, b), b === 0 && c.push(m);
        }
    }
    const p = new Set(h), d = /* @__PURE__ */ new Set();
    for (const g of s)
      p.has(g) || d.add(g);
    let f = !1;
    return (d.size !== this._cycleNodeIds.size || [...d].some((g) => !this._cycleNodeIds.has(g))) && (this._cycleNodeIds = d, f = !0), { sorted: h, cyclesChanged: f };
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
    const r = this.getInputs(e), s = n.compute(r, o.data);
    if (s instanceof Promise) {
      const i = ++this.generation;
      return s.then((l) => {
        if (i !== this.generation) return;
        this.applyOutputs(e, n.ports, l) && (this.markDownstream(e), this.notifyListeners(), this.dirty.size > 0 && this.scheduleFlush());
      }), !1;
    }
    return this.applyOutputs(e, n.ports, s);
  }
  /** Apply computed outputs to the values map. Returns true if any value changed. */
  applyOutputs(e, o, n) {
    let r = !1;
    for (const s of o) {
      if (s.direction !== "output") continue;
      const i = fo(e, s.id), l = n[s.id] ?? null, a = this.values.get(i) ?? null;
      Qd(a, l) || (this.values.set(i, l), r = !0);
    }
    return r && this.markDownstream(e), r;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function Qd(t, e) {
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
const Vo = [
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
function pn(t) {
  return Vo.find((e) => e.key === t) ?? Vo[1];
}
function Jd() {
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
function $d() {
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
const xr = {
  "japanese-stationery": Jd,
  kraft: $d
};
function _d(t) {
  var e;
  return ((e = xr[t]) == null ? void 0 : e.call(xr)) ?? {};
}
const da = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, th = {
  ...da,
  willChange: "transform"
}, eh = ge(function({
  background: e
}) {
  const o = pn(e), { staticDefs: n, staticLayers: r } = _d(e);
  return /* @__PURE__ */ k("svg", { style: th, children: [
    n && /* @__PURE__ */ u("defs", { children: n }),
    /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    r
  ] });
});
function oh({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: n = !0
}) {
  const r = e * t.zoom, s = t.x % r, i = t.y % r, a = pn(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(eh, { background: o }),
    n && /* @__PURE__ */ k("svg", { style: da, children: [
      /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ u(
        "pattern",
        {
          id: "grid-dots",
          x: s,
          y: i,
          width: r,
          height: r,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ u("circle", { cx: r / 2, cy: r / 2, r: 1.5, fill: a })
        }
      ) }),
      /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: "url(#grid-dots)" })
    ] })
  ] });
}
const ha = "sb-excalib-index", cs = "sb-excalib-";
function Un() {
  try {
    const t = localStorage.getItem(ha);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function ua(t) {
  localStorage.setItem(ha, JSON.stringify(t));
}
function nh(t) {
  try {
    const e = localStorage.getItem(cs + t);
    return e ? ds(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function ds(t) {
  if (t.libraryItems)
    return t;
  const o = (t.library ?? []).map((n, r) => ({
    id: kt(10),
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
function pa() {
  return Un();
}
function hs(t) {
  const e = nh(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function us(t, e) {
  const o = ds(t), n = kt(10), r = o.libraryItems.map((l) => l.name || "Untitled"), s = {
    id: n,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: r
  };
  localStorage.setItem(cs + n, JSON.stringify(o));
  const i = Un();
  return i.push(s), ua(i), s;
}
function rh(t) {
  localStorage.removeItem(cs + t);
  const e = Un().filter((o) => o.id !== t);
  ua(e);
}
function sh(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], n = Un();
  for (const r of n) {
    if (!r.itemNames.some((l) => l.toLowerCase().includes(e)) && !r.name.toLowerCase().includes(e)) continue;
    const i = hs(r.id);
    for (const l of i)
      ((l.name || "").toLowerCase().includes(e) || r.name.toLowerCase().includes(e)) && o.push({ library: r, item: l });
  }
  return o;
}
async function ih(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const n = await o.json();
  if (n.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const r = ds(n);
  return us(r, { name: e, source: t });
}
const Nr = {
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
}, fa = Bi(Nr);
function jt() {
  return jn(fa);
}
function fn(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function vo(t) {
  if (t)
    return t * (180 / Math.PI);
}
function ya(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function ga(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function ma(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function ba(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function xa(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function ah(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function wr(t, e) {
  return {
    id: kt(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: vo(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: ya(t.backgroundColor),
      fillStyle: ga(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: ma(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: fn(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? ah(t) : void 0
    }
  };
}
function ci(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const n = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: ma(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: fn(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [l, a] = o, c = Math.min(l[0], a[0]), h = Math.min(l[1], a[1]), p = Math.max(l[0], a[0]), d = Math.max(l[1], a[1]), f = Math.max(p - c, 1), g = Math.max(d - h, 1);
    return [
      {
        id: kt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + h,
        w: f,
        h: g,
        z: 0,
        rotation: vo(t.angle),
        locked: t.locked || void 0,
        data: {
          ...n,
          shape: e ? "arrow" : "line",
          startPoint: [l[0] - c, l[1] - h],
          endPoint: [a[0] - c, a[1] - h]
        }
      }
    ];
  }
  if (t.backgroundColor && t.backgroundColor !== "transparent") {
    const l = lh(t);
    if (l) return [l];
  }
  const s = kt(10), i = [];
  for (let l = 0; l < o.length - 1; l++) {
    const a = o[l], c = o[l + 1], h = Math.min(a[0], c[0]), p = Math.min(a[1], c[1]), d = Math.max(a[0], c[0]), f = Math.max(a[1], c[1]), g = Math.max(d - h, 1), y = Math.max(f - p, 1), m = l === o.length - 2;
    i.push({
      id: kt(10),
      type: "shape",
      x: t.x + h,
      y: t.y + p,
      w: g,
      h: y,
      z: 0,
      rotation: vo(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...n,
        shape: e && m ? "arrow" : "line",
        startPoint: [a[0] - h, a[1] - p],
        endPoint: [c[0] - h, c[1] - p]
      }
    });
  }
  return i;
}
function lh(t) {
  const e = t.points ?? [];
  if (e.length < 3) return null;
  let o = 1 / 0, n = 1 / 0, r = -1 / 0, s = -1 / 0;
  for (const [l, a] of e)
    l < o && (o = l), a < n && (n = a), l > r && (r = l), a > s && (s = a);
  if (!isFinite(o)) return null;
  const i = e.map(([l, a]) => [
    l - o,
    a - n,
    0.5
  ]);
  return {
    id: kt(10),
    type: "draw",
    x: t.x + o,
    y: t.y + n,
    w: Math.max(r - o, 1),
    h: Math.max(s - n, 1),
    z: 0,
    rotation: vo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: fn(t.opacity ?? 100),
      fill: ya(t.backgroundColor),
      fillStyle: ga(t.fillStyle)
    }
  };
}
function ch(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, n = t.simulatePressure !== !1, r = e.map((h, p) => {
    const d = !n && o && p < o.length ? o[p] : 0.5;
    return [h[0], h[1], d];
  });
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, a = -1 / 0;
  for (const [h, p] of r)
    h < s && (s = h), p < i && (i = p), h > l && (l = h), p > a && (a = p);
  isFinite(s) || (s = 0, i = 0, l = 0, a = 0);
  const c = r.map(
    ([h, p, d]) => [h - s, p - i, d]
  );
  return {
    id: kt(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(l - s, 1),
    h: Math.max(a - i, 1),
    z: 0,
    rotation: vo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: fn(t.opacity ?? 100)
    }
  };
}
function dh(t) {
  return {
    id: kt(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: vo(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: ba(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: xa(t.textAlign),
      opacity: fn(t.opacity ?? 100)
    }
  };
}
function hh(t) {
  return {
    id: kt(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: vo(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function wa(t) {
  return uh(t.elements);
}
function uh(t) {
  const e = [], o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && r.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [wr(s, "rect")];
        break;
      case "ellipse":
        i = [wr(s, "ellipse")];
        break;
      case "diamond":
        i = [wr(s, "diamond")];
        break;
      case "arrow":
        i = ci(s, !0);
        break;
      case "line":
        i = ci(s, !1);
        break;
      case "freedraw": {
        const l = ch(s);
        l && (i = [l]);
        break;
      }
      case "text":
        i = [dh(s)];
        break;
      case "frame":
      case "magicframe":
        i = [hh(s)];
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
    const a = e.find((h) => h.id === l);
    if (!a || a.type !== "shape") continue;
    const c = a.data;
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = ba(i.fontFamily), c.labelAlign = xa(i.textAlign);
  }
  return ph(t, e, o, n), fh(e), { nodes: e, groupParent: n };
}
function ph(t, e, o, n) {
  var s;
  const r = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (i.isDeleted || !((s = i.groupIds) != null && s.length)) continue;
    for (let a = 0; a < i.groupIds.length - 1; a++) {
      const c = i.groupIds[a], h = i.groupIds[a + 1];
      r.has(c) || r.set(c, h);
    }
    const l = o.get(i.id);
    if (l) {
      const a = e.find((c) => c.id === l);
      a && (a.groupId = i.groupIds[0]);
    }
  }
  for (const [i, l] of r)
    n.set(i, l);
}
function fh(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const n of t)
    n.x < e && (e = n.x), n.y < o && (o = n.y);
  if (isFinite(e))
    for (const n of t)
      n.x -= e, n.y -= o;
}
function ps(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, n = 1 / 0, r = -1 / 0, s = -1 / 0;
  for (const p of t) {
    const d = p.h === "auto" ? 40 : p.h;
    o = Math.min(o, p.x), n = Math.min(n, p.y), r = Math.max(r, p.x + p.w), s = Math.max(s, p.y + d);
  }
  const i = r - o || 1, l = s - n || 1, a = 4, c = `${o - a} ${n - a} ${i + a * 2} ${l + a * 2}`, h = [];
  for (const p of t)
    switch (p.type) {
      case "shape":
        h.push(yh(p));
        break;
      case "draw":
        h.push(gh(p));
        break;
      case "text":
        h.push(mh(p));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${h.join("")}</svg>`;
}
function ka(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function yh(t) {
  var d, f, g, y;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, n = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: ao(e.strokeStyle),
    seed: t.id
  }, r = ((d = e.startPoint) == null ? void 0 : d[0]) ?? 0, s = ((f = e.startPoint) == null ? void 0 : f[1]) ?? o / 2, i = ((g = e.endPoint) == null ? void 0 : g[0]) ?? t.w, l = ((y = e.endPoint) == null ? void 0 : y[1]) ?? o / 2;
  let a;
  switch (e.shape) {
    case "rect":
      a = Xn(t.x, t.y, t.w, o, n, e.edgeStyle === "round");
      break;
    case "ellipse":
      a = ss(t.x + t.w / 2, t.y + o / 2, t.w, o, n);
      break;
    case "diamond":
      a = is(t.x, t.y, t.w, o, n, e.edgeStyle === "round");
      break;
    case "line":
      a = jo(t.x + r, t.y + s, t.x + i, t.y + l, n);
      break;
    case "arrow":
      a = as(t.x + r, t.y + s, t.x + i, t.y + l, n);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, h = c < 1 ? `<g opacity="${c}">` : "<g>", p = a.map(
    (m) => `<path d="${ka(m.d)}" fill="${m.fill || "none"}" stroke="${m.stroke}" stroke-width="${m.strokeWidth}"${m.strokeDasharray ? ` stroke-dasharray="${m.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${h}${p.join("")}</g>`;
}
function gh(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), n = e.opacity ?? 1, r = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${r}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${n < 1 ? ` opacity="${n}"` : ""}/>`;
}
function mh(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), n = e.opacity ?? 1, r = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${n < 1 ? ` opacity="${n}"` : ""}>${ka(r)}</text>`;
}
const va = "sb-personal-library";
function fs() {
  try {
    const t = localStorage.getItem(va);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Sa(t) {
  localStorage.setItem(va, JSON.stringify(t));
}
function Ma() {
  return fs();
}
function bh(t, e, o) {
  const n = structuredClone(e);
  if (n.length > 0) {
    let a = 1 / 0, c = 1 / 0;
    for (const h of n)
      h.x < a && (a = h.x), h.y < c && (c = h.y);
    if (isFinite(a))
      for (const h of n)
        h.x -= a, h.y -= c;
  }
  const r = new Set(
    n.map((a) => a.groupId).filter(Boolean)
  ), s = [];
  for (const [a, c] of o)
    r.has(a) && s.push([a, c]);
  const i = {
    id: kt(10),
    name: t.trim() || "Untitled",
    nodes: n,
    groupParent: s,
    createdAt: Date.now()
  }, l = fs();
  return l.unshift(i), Sa(l), i;
}
function xh(t) {
  const e = fs().filter((o) => o.id !== t);
  Sa(e);
}
function Ca(t, e, o, n) {
  const { nodes: r, groupParent: s } = wa(e);
  if (r.length === 0) return;
  const i = structuredClone(r), l = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const x of i) {
    const S = kt(10);
    l.set(x.id, S), x.id = S;
  }
  for (const x of i)
    x.groupId && (a.has(x.groupId) || a.set(x.groupId, kt(10)), x.groupId = a.get(x.groupId));
  let c = 1 / 0, h = 1 / 0, p = -1 / 0, d = -1 / 0;
  for (const x of i) {
    const S = x.h === "auto" ? 100 : x.h;
    c = Math.min(c, x.x), h = Math.min(h, x.y), p = Math.max(p, x.x + x.w), d = Math.max(d, x.y + S);
  }
  const f = o ?? window.innerWidth / 2, g = n ?? window.innerHeight / 2, y = t.screenToCanvas(f, g), m = y.x - (c + p) / 2, b = y.y - (h + d) / 2;
  for (const x of i)
    x.x += m, x.y += b, x.z = t.nextZ();
  t.addNodes(i);
  for (const [x, S] of s) {
    const M = a.get(x) ?? x, I = a.get(S) ?? S;
    t.groupParent.set(M, I);
  }
  t.selectMultiple(i.map((x) => x.id));
}
const Hr = "application/x-spatialboard-library-item", Or = "application/x-spatialboard-personal-item";
function za(t, e, o, n) {
  if (e.nodes.length === 0) return;
  const r = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const m of r) {
    const b = kt(10);
    s.set(m.id, b), m.id = b;
  }
  for (const m of r)
    m.groupId && (i.has(m.groupId) || i.set(m.groupId, kt(10)), m.groupId = i.get(m.groupId));
  for (const m of r)
    if (m.type === "edge") {
      const b = m.data;
      b.fromId && s.has(b.fromId) && (b.fromId = s.get(b.fromId)), b.toId && s.has(b.toId) && (b.toId = s.get(b.toId));
    }
  let l = 1 / 0, a = 1 / 0, c = -1 / 0, h = -1 / 0;
  for (const m of r) {
    const b = m.h === "auto" ? 100 : m.h;
    l = Math.min(l, m.x), a = Math.min(a, m.y), c = Math.max(c, m.x + m.w), h = Math.max(h, m.y + b);
  }
  const p = o ?? window.innerWidth / 2, d = n ?? window.innerHeight / 2, f = t.screenToCanvas(p, d), g = f.x - (l + c) / 2, y = f.y - (a + h) / 2;
  for (const m of r)
    m.x += g, m.y += y, m.z = t.nextZ();
  t.addNodes(r);
  for (const [m, b] of e.groupParent) {
    const x = i.get(m) ?? m, S = i.get(b) ?? b;
    t.groupParent.set(x, S);
  }
  t.selectMultiple(r.map((m) => m.id));
}
const Ko = /* @__PURE__ */ new Map();
function wh({ item: t }) {
  const e = Kt(() => {
    const o = Ko.get(t.id);
    if (o) return o;
    const { nodes: n } = wa(t), r = ps(n, 56);
    return Ko.set(t.id, r), r;
  }, [t.id]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Ia({
  item: t,
  libId: e,
  onClick: o,
  theme: n
}) {
  const r = it(
    (s) => {
      s.dataTransfer.setData(
        Hr,
        JSON.stringify({ libraryId: e, itemId: t.id })
      ), s.dataTransfer.effectAllowed = "copy";
    },
    [e, t.id]
  );
  return /* @__PURE__ */ u(
    "button",
    {
      title: t.name || "Untitled",
      onClick: o,
      draggable: !0,
      onDragStart: r,
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
      children: /* @__PURE__ */ u(wh, { item: t })
    }
  );
}
function kh({ nodes: t }) {
  const e = Kt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), n = Ko.get(o);
    if (n) return n;
    const r = ps(t, 56);
    return Ko.set(o, r), r;
  }, [t]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Ta({
  item: t,
  onClick: e,
  onRemove: o,
  theme: n
}) {
  const [r, s] = tt(!1), i = it(
    (l) => {
      l.dataTransfer.setData(
        Or,
        JSON.stringify({ itemId: t.id })
      ), l.dataTransfer.effectAllowed = "copy";
    },
    [t.id]
  );
  return /* @__PURE__ */ k(
    "div",
    {
      style: { position: "relative", aspectRatio: "1" },
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      children: [
        /* @__PURE__ */ u(
          "button",
          {
            title: t.name,
            onClick: e,
            draggable: !0,
            onDragStart: i,
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
            children: /* @__PURE__ */ u(kh, { nodes: t.nodes })
          }
        ),
        r && /* @__PURE__ */ u(
          "button",
          {
            title: "Remove from Personal Library",
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
function vh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n,
  onBrowseDirectory: r
}) {
  const s = jt(), i = lt(null), l = lt(null), [a, c] = tt([]), [h, p] = tt([]), [d, f] = tt(""), [g, y] = tt(/* @__PURE__ */ new Set()), m = it(() => {
    c(pa()), p(Ma());
  }, []);
  bt(() => {
    e && m();
  }, [e, m]), bt(() => {
    if (!e) return;
    const P = (j) => {
      i.current && !i.current.contains(j.target) && o();
    };
    return document.addEventListener("pointerdown", P), () => document.removeEventListener("pointerdown", P);
  }, [e, o]);
  const b = it(
    (P) => {
      var ct;
      const j = (ct = P.target.files) == null ? void 0 : ct[0];
      if (!j) return;
      const U = new FileReader();
      U.onload = () => {
        try {
          const O = JSON.parse(U.result);
          if (O.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const nt = j.name.replace(/\.excalidrawlib$/, "");
          us(O, { name: nt }), m();
        } catch (O) {
          console.error("Failed to parse library file:", O);
        }
      }, U.readAsText(j), P.target.value = "";
    },
    [m]
  ), x = it(
    (P) => {
      rh(P), Ko.clear(), m();
    },
    [m]
  ), S = it(
    (P) => {
      Ca(t, P);
    },
    [t]
  ), M = it(
    (P) => {
      za(t, P);
    },
    [t]
  ), I = it(
    (P) => {
      xh(P), Ko.clear(), m();
    },
    [m]
  ), R = it((P) => {
    y((j) => {
      const U = new Set(j);
      return U.has(P) ? U.delete(P) : U.add(P), U;
    });
  }, []), C = Kt(() => {
    if (!d.trim()) return null;
    const P = d.toLowerCase(), j = sh(d), U = h.filter(
      (ct) => ct.name.toLowerCase().includes(P)
    );
    return { excalidraw: j, personal: U };
  }, [d, h]);
  return !e || !n ? null : je(
    /* @__PURE__ */ k(
      "div",
      {
        ref: i,
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
          maxHeight: `calc(100vh - ${n.top + 20}px)`,
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
                children: "Libraries"
              }
            ),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                placeholder: "Search library...",
                value: d,
                onChange: (P) => f(P.target.value),
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
              children: C !== null ? C.excalidraw.length === 0 && C.personal.length === 0 ? /* @__PURE__ */ u(
                "div",
                {
                  style: {
                    color: s.textDisabled,
                    fontSize: 11,
                    textAlign: "center",
                    padding: 20
                  },
                  children: "No matching items"
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
                    C.personal.map((P) => /* @__PURE__ */ u(
                      Ta,
                      {
                        item: P,
                        onClick: () => M(P),
                        onRemove: () => I(P.id),
                        theme: s
                      },
                      P.id
                    )),
                    C.excalidraw.map(({ library: P, item: j }) => /* @__PURE__ */ u(
                      Ia,
                      {
                        item: j,
                        libId: P.id,
                        onClick: () => S(j),
                        theme: s
                      },
                      j.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ k(mt, { children: [
                h.length > 0 && /* @__PURE__ */ u(
                  Mh,
                  {
                    items: h,
                    onPlace: M,
                    onRemove: I,
                    theme: s
                  }
                ),
                a.length === 0 && h.length === 0 ? /* @__PURE__ */ k(
                  "div",
                  {
                    style: {
                      color: s.textDisabled,
                      fontSize: 11,
                      textAlign: "center",
                      padding: "20px 10px"
                    },
                    children: [
                      "No libraries installed.",
                      /* @__PURE__ */ u("br", {}),
                      "Import an .excalidrawlib file",
                      /* @__PURE__ */ u("br", {}),
                      "or browse the community directory."
                    ]
                  }
                ) : a.map((P) => {
                  const j = g.has(P.id);
                  return /* @__PURE__ */ u(
                    Sh,
                    {
                      lib: P,
                      expanded: j,
                      onToggle: () => R(P.id),
                      onPlace: S,
                      onUninstall: () => x(P.id),
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
                    children: "Import file"
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
                    children: "Browse libraries"
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
function Sh({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: n,
  onUninstall: r,
  theme: s
}) {
  const [i, l] = tt(null);
  return bt(() => {
    e && i === null && l(hs(t.id));
  }, [e, i, t.id]), /* @__PURE__ */ k("div", { style: { marginBottom: 4 }, children: [
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
              title: "Uninstall library",
              onClick: (a) => {
                a.stopPropagation(), r();
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
    e && i && /* @__PURE__ */ u(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: i.map((a) => /* @__PURE__ */ u(
          Ia,
          {
            item: a,
            libId: t.id,
            onClick: () => n(a),
            theme: s
          },
          a.id
        ))
      }
    )
  ] });
}
function Mh({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: n
}) {
  const [r, s] = tt(!0);
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
        onClick: () => s((i) => !i),
        children: [
          /* @__PURE__ */ u(
            "svg",
            {
              width: 12,
              height: 12,
              viewBox: "0 0 12 12",
              fill: "none",
              style: {
                transform: r ? "rotate(90deg)" : "rotate(0deg)",
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
              children: "Personal"
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
    r && /* @__PURE__ */ u(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: t.map((i) => /* @__PURE__ */ u(
          Ta,
          {
            item: i,
            onClick: () => e(i),
            onRemove: () => o(i.id),
            theme: n
          },
          i.id
        ))
      }
    )
  ] });
}
async function Ch(t, e, o = 1, n = 20, r) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${n}`;
  return (await fetch(s, { signal: r, credentials: "include" })).json();
}
async function di(t, e = 1, o = 20, n) {
  const r = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(r, { signal: n, credentials: "include" })).json();
}
const Xr = "application/x-spatialboard-gif-item";
function Pa(t, e, o, n) {
  const r = e.file.hd.gif, s = 400, i = 300;
  let l = r.width, a = r.height;
  const c = Math.min(1, s / l, i / a);
  l = Math.round(l * c), a = Math.round(a * c);
  const h = o ?? window.innerWidth / 2, p = n ?? window.innerHeight / 2, d = t.screenToCanvas(h, p), f = {
    id: kt(10),
    type: "image",
    x: d.x - l / 2,
    y: d.y - a / 2,
    w: l,
    h: a,
    z: t.nextZ(),
    data: { src: r.url }
  };
  t.addNode(f), t.select(f.id);
}
function zh({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n,
  baseUrl: r
}) {
  const s = jt(), i = lt(null), l = lt(null), [a, c] = tt(""), [h, p] = tt([]), [d, f] = tt(!1), [g, y] = tt(1), [m, b] = tt(!1), x = lt();
  bt(() => {
    if (!e) return;
    const C = (P) => {
      i.current && !i.current.contains(P.target) && o();
    };
    return document.addEventListener("pointerdown", C), () => document.removeEventListener("pointerdown", C);
  }, [e, o]), bt(() => {
    if (!e || a.trim()) return;
    const C = new AbortController();
    return f(!0), di(r, 1, 30, C.signal).then((P) => {
      p(P.data.data.filter((j) => j.type !== "ad")), y(1), b(P.data.has_next);
    }).catch(() => {
    }).finally(() => f(!1)), () => C.abort();
  }, [e, r, a]);
  const S = it(
    (C, P, j) => {
      if (!C.trim()) return;
      const U = new AbortController();
      return f(!0), Ch(r, C, P, 30, U.signal).then((ct) => {
        const O = ct.data.data.filter((nt) => nt.type !== "ad");
        p((nt) => j ? [...nt, ...O] : O), y(P), b(ct.data.has_next);
      }).catch(() => {
      }).finally(() => f(!1)), U;
    },
    [r]
  ), M = it(
    (C) => {
      if (c(C), x.current && clearTimeout(x.current), !C.trim()) {
        p([]), y(1), b(!1);
        return;
      }
      x.current = setTimeout(() => {
        S(C, 1, !1);
      }, 350);
    },
    [S]
  ), I = it(() => {
    const C = l.current;
    !C || d || !m || C.scrollTop + C.clientHeight >= C.scrollHeight - 100 && (a.trim() ? S(a, g + 1, !0) : (f(!0), di(r, g + 1, 30).then((P) => {
      const j = P.data.data.filter((U) => U.type !== "ad");
      p((U) => [...U, ...j]), y(g + 1), b(P.data.has_next);
    }).catch(() => {
    }).finally(() => f(!1))));
  }, [d, m, a, g, S, r]), R = it(
    (C) => {
      Pa(t, C);
    },
    [t]
  );
  return !e || !n ? null : je(
    /* @__PURE__ */ k(
      "div",
      {
        ref: i,
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
          maxHeight: `calc(100vh - ${n.top + 20}px)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (C) => C.stopPropagation(),
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
                children: "GIFs"
              }
            ),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                placeholder: "Search KLIPY",
                value: a,
                onChange: (C) => M(C.target.value),
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
              onScroll: I,
              style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "4px 12px",
                minHeight: 200
              },
              children: [
                h.length === 0 && !d ? /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      color: s.textDisabled,
                      fontSize: 11,
                      textAlign: "center",
                      padding: 20
                    },
                    children: a.trim() ? "No results" : "Loading..."
                  }
                ) : /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 4
                    },
                    children: h.map((C) => /* @__PURE__ */ u(
                      Ih,
                      {
                        item: C,
                        onClick: () => R(C),
                        engine: t,
                        theme: s
                      },
                      C.id
                    ))
                  }
                ),
                d && /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      color: s.textMuted,
                      fontSize: 10,
                      textAlign: "center",
                      padding: 12
                    },
                    children: "Loading..."
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
              children: "Powered by KLIPY"
            }
          )
        ]
      }
    ),
    document.body
  );
}
function Ih({
  item: t,
  onClick: e,
  engine: o,
  theme: n
}) {
  const r = t.file.sm.webp, s = r.width / r.height, i = it(
    (l) => {
      l.dataTransfer.setData(Xr, JSON.stringify(t)), l.dataTransfer.effectAllowed = "copy";
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
function Th({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [n, r] = tt(""), s = lt(null), i = lt(null);
  bt(() => {
    var p;
    (p = s.current) == null || p.focus();
  }, []);
  const l = Kt(() => ps(t, 56), [t]), a = it(() => {
    e(n.trim() || "Untitled");
  }, [n, e]), c = it(
    (p) => {
      p.key === "Enter" ? (p.preventDefault(), a()) : p.key === "Escape" && (p.preventDefault(), o());
    },
    [a, o]
  ), h = it(
    (p) => {
      i.current && !i.current.contains(p.target) && o();
    },
    [o]
  );
  return je(
    /* @__PURE__ */ u(
      "div",
      {
        onClick: h,
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
                  children: /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: l } })
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
                    onClick: a,
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
function Yr(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function Ph(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Aa(t, e, o, n) {
  return new Promise((r) => {
    const s = Ph(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, h = i.naturalHeight || 200;
      if (c <= 1 || h <= 1) {
        const p = t.match(/viewBox=["']([^"']+)["']/i);
        if (p) {
          const d = p[1].trim().split(/[\s,]+/).map(Number);
          d.length === 4 && d[2] > 0 && d[3] > 0 && (c = d[2], h = d[3]);
        }
      }
      if (c > 400 || h > 400) {
        const p = Math.min(400 / c, 400 / h);
        c = Math.round(c * p), h = Math.round(h * p);
      }
      r({
        id: kt(10),
        type: "image",
        x: e,
        y: o,
        w: c,
        h,
        z: n,
        data: { src: s }
      });
    }, i.onerror = () => r(null), i.src = s;
  });
}
async function Ah(t, e, o, n) {
  const { x: r, y: s } = t.screenToCanvas(o, n), i = await Aa(e, r, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
const hi = {
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
}, Eh = ge(function({
  node: e,
  zoom: o,
  showHandles: n = !0,
  measuredHeights: r,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const l = e.h === "auto" ? (r == null ? void 0 : r[e.id]) ?? 100 : e.h, a = e.rotation || 0, c = e.x + e.w / 2, h = e.y + l / 2, p = 8 / o, d = p / 2, f = 25 / o, g = !!e.locked, y = [
    { pos: "nw", cx: e.x, cy: e.y },
    { pos: "n", cx: e.x + e.w / 2, cy: e.y },
    { pos: "ne", cx: e.x + e.w, cy: e.y },
    { pos: "e", cx: e.x + e.w, cy: e.y + l / 2 },
    { pos: "se", cx: e.x + e.w, cy: e.y + l },
    { pos: "s", cx: e.x + e.w / 2, cy: e.y + l },
    { pos: "sw", cx: e.x, cy: e.y + l },
    { pos: "w", cx: e.x, cy: e.y + l / 2 }
  ];
  return /* @__PURE__ */ k("g", { transform: `rotate(${a}, ${c}, ${h})`, children: [
    /* @__PURE__ */ u(
      "rect",
      {
        x: e.x,
        y: e.y,
        width: e.w,
        height: l,
        fill: "none",
        stroke: g ? "#f59e0b" : "#3b82f6",
        strokeWidth: 1.5 / o,
        strokeDasharray: `${4 / o} ${3 / o}`
      }
    ),
    g && (() => {
      const m = 16 / o, b = e.x + e.w - m - 4 / o, x = e.y - m - 4 / o;
      return /* @__PURE__ */ k("g", { transform: `translate(${b}, ${x})`, children: [
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ k("g", { transform: `scale(${m / 24})`, children: [
          /* @__PURE__ */ u("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ u("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    n && !g && y.map(({ pos: m, cx: b, cy: x }) => /* @__PURE__ */ u(
      "rect",
      {
        x: b - d,
        y: x - d,
        width: p,
        height: p,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: Kn(m, a),
          pointerEvents: "auto"
        },
        onPointerDown: (S) => {
          S.stopPropagation(), s == null || s(e.id, m, S);
        }
      },
      m
    )),
    n && !g && /* @__PURE__ */ k(mt, { children: [
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
          onPointerDown: (m) => {
            m.stopPropagation(), i == null || i(e.id, m);
          }
        }
      )
    ] })
  ] });
}), Rh = ge(function({
  edge: e,
  fromNode: o,
  toNode: n,
  viewport: r,
  selection: s,
  measuredHeights: i,
  registry: l,
  onEdgeEndpointDown: a,
  onKinkHandleDown: c,
  edgeReconnect: h,
  eraserMarkedIds: p,
  cycleNodeIds: d
}) {
  const f = e.data.edgeType || "bezier";
  let g, y;
  if (l && e.data.sourcePort) {
    const ht = l.get(o.type);
    ht != null && ht.ports && (g = cn(o, ht.ports, e.data.sourcePort, r.zoom, i) ?? void 0);
  }
  if (l && e.data.targetPort) {
    const ht = l.get(n.type);
    ht != null && ht.ports && (y = cn(n, ht.ports, e.data.targetPort, r.zoom, i) ?? void 0);
  }
  const m = Ye(
    o,
    n,
    f,
    i,
    e.data.sourceHandle,
    e.data.targetHandle,
    e.data.midpointOffset,
    e.data.curveOffset,
    g,
    y
  ), { path: b, x1: x, y1: S, x2: M, y2: I, labelX: R, labelY: C, arrowAngle: P, tailAngle: j, kinkHandle: U } = m, ct = s.has(e.id), O = e.data.strokeWidth, nt = e.data.style === "dashed" ? `${8 * O},${4 * O}` : e.data.style === "dotted" ? `${2 * O},${3 * O}` : void 0, Q = Math.max(8, O * 3), J = e.data.arrowHeadSize ?? Q, E = e.data.arrowTailSize ?? Q, G = e.data.animated, X = p == null ? void 0 : p.has(e.id), N = (h == null ? void 0 : h.edgeId) === e.id, V = !!(d && d.size > 0 && e.data.sourcePort && e.data.targetPort && d.has(e.data.fromId) && d.has(e.data.toId)), H = V ? "#ef4444" : e.data.color, _ = e.data.roughness ?? 0, et = Kt(() => _ <= 0 ? null : {
    stroke: H,
    roughness: _,
    strokeWidth: O,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [H, _, O, e.data.style, e.id]);
  let ot = null, ut = null, pt = null;
  et && (ot = br(b, et), e.data.arrowHead === "arrow" && (ut = br(Xo(M, I, P, J), { ...et, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (pt = br(Xo(x, S, j, E), { ...et, strokeLineDash: void 0 })));
  const Tt = Kt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), rt = Kt(() => {
    if (!G) return;
    const ht = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : e.data.animatedDirection === "bop" ? "edge-flow-bop" : "edge-flow", Wt = e.data.animatedDirection === "both" ? "2s" : e.data.animatedDirection === "bop" ? "3.4s" : "1s", Pt = e.data.animatedDirection === "bop" ? "ease-in-out" : "linear";
    return { animation: `${ht} ${Wt} ${Pt} infinite` };
  }, [G, e.data.animatedDirection]), St = Kt(
    () => ({
      animation: e.data.animatedDirection === "bop" ? "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow-bop 3.4s ease-in-out infinite" : "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite"
    }),
    [e.data.animatedDirection]
  ), Mt = Kt(
    () => X ? { filter: "saturate(0)" } : void 0,
    [X]
  );
  return /* @__PURE__ */ k("g", { opacity: N ? 0.15 : X ? 0.25 : void 0, style: Mt, children: [
    V && /* @__PURE__ */ u(
      "path",
      {
        d: b,
        stroke: "#ef4444",
        strokeWidth: O + 6 / r.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: Tt
      }
    ),
    ct && /* @__PURE__ */ u(
      "path",
      {
        d: b,
        stroke: "#3b82f6",
        strokeWidth: O + 6 / r.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    ot ? ot.map((ht, Wt) => /* @__PURE__ */ u(
      "path",
      {
        d: ht.d,
        stroke: ht.stroke,
        strokeWidth: ht.strokeWidth,
        strokeDasharray: ht.strokeDasharray,
        strokeLinecap: "round",
        fill: ht.fill ?? "none",
        style: G ? rt : void 0
      },
      Wt
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: b,
        stroke: H,
        strokeWidth: O,
        strokeDasharray: G ? "12,8" : V ? `${6 * O},${4 * O}` : nt,
        strokeLinecap: "round",
        fill: "none",
        style: V ? St : rt
      }
    ),
    e.data.arrowHead === "arrow" && (ut ? ut.map((ht, Wt) => /* @__PURE__ */ u(
      "path",
      {
        d: ht.d,
        stroke: ht.stroke,
        strokeWidth: ht.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ht.fill ?? "none"
      },
      `ah${Wt}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: Xo(M, I, P, J),
        fill: "none",
        stroke: H,
        strokeWidth: O,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: Bn(M, I, P, J),
        fill: H,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: M,
        cy: I,
        r: J * 0.25,
        fill: H
      }
    ),
    e.data.arrowTail === "arrow" && (pt ? pt.map((ht, Wt) => /* @__PURE__ */ u(
      "path",
      {
        d: ht.d,
        stroke: ht.stroke,
        strokeWidth: ht.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ht.fill ?? "none"
      },
      `at${Wt}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: Xo(x, S, j, E),
        fill: "none",
        stroke: H,
        strokeWidth: O,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: Bn(x, S, j, E),
        fill: H,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: x,
        cy: S,
        r: E * 0.25,
        fill: H
      }
    ),
    e.data.label && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u(
        "rect",
        {
          x: R - (e.data.label.length * 3.5 + 6) / r.zoom,
          y: C - 8 / r.zoom,
          width: (e.data.label.length * 7 + 12) / r.zoom,
          height: 16 / r.zoom,
          fill: "white",
          rx: 4 / r.zoom,
          opacity: 0.9
        }
      ),
      /* @__PURE__ */ u(
        "text",
        {
          x: R,
          y: C + 4 / r.zoom,
          fill: H,
          fontSize: 12 / r.zoom,
          textAnchor: "middle",
          style: { pointerEvents: "none" },
          children: e.data.label
        }
      )
    ] }),
    ct && !N && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u(
        "circle",
        {
          cx: x,
          cy: S,
          r: 5 / r.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / r.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ht) => {
            ht.stopPropagation(), a == null || a(e.id, "source", ht);
          }
        }
      ),
      /* @__PURE__ */ u(
        "circle",
        {
          cx: M,
          cy: I,
          r: 5 / r.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / r.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ht) => {
            ht.stopPropagation(), a == null || a(e.id, "target", ht);
          }
        }
      )
    ] }),
    ct && !N && U && /* @__PURE__ */ u(
      "circle",
      {
        cx: U.x,
        cy: U.y,
        r: 5 / r.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / r.zoom,
        style: {
          cursor: U.axis === "xy" ? "move" : U.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (ht) => {
          ht.stopPropagation(), c == null || c(e.id, U.axis, U.min, U.max, ht);
        }
      }
    )
  ] });
});
function Lh({
  nodes: t,
  viewport: e,
  selection: o,
  measuredHeights: n,
  activeStroke: r,
  shapePreview: s,
  shapePreviewStyle: i,
  onResizeHandleDown: l,
  onRotateStart: a,
  onConnectionHandleDown: c,
  onEdgeEndpointDown: h,
  onKinkHandleDown: p,
  edgePreview: d,
  edgeReconnect: f,
  eraserMarkedIds: g,
  eraserTrail: y,
  laserTrail: m,
  mode: b,
  hoveredNodeId: x,
  registry: S,
  onPortHandleDown: M,
  cycleNodeIds: I,
  containerTypes: R,
  alignGuides: C
}) {
  const P = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, j = t.filter(
    (O) => O.type !== "edge" && O.type !== "content" && O.type !== "image"
  ), U = t.filter((O) => O.type === "edge").sort((O, nt) => O.z - nt.z), ct = Kt(() => new Map(t.map((O) => [O.id, O])), [t]);
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
      children: /* @__PURE__ */ k("g", { transform: P, children: [
        U.map((O) => {
          const nt = ct.get(O.data.fromId), Q = ct.get(O.data.toId);
          return !nt || !Q ? null : /* @__PURE__ */ u(
            Rh,
            {
              edge: O,
              fromNode: nt,
              toNode: Q,
              viewport: e,
              selection: o,
              measuredHeights: n,
              registry: S,
              onEdgeEndpointDown: h,
              onKinkHandleDown: p,
              edgeReconnect: f,
              eraserMarkedIds: g,
              cycleNodeIds: I
            },
            O.id
          );
        }),
        (() => {
          var N, V;
          const O = !!d || !!f, nt = (d == null ? void 0 : d.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, Q = (d == null ? void 0 : d.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, J = (d == null ? void 0 : d.fromNode.id) ?? (f == null ? void 0 : f.anchorNodeId) ?? null;
          let E = null, G = null;
          const X = /* @__PURE__ */ new Set();
          if (O) {
            let H = 1 / 0, _ = !1;
            const et = 50 / e.zoom;
            for (const ot of t) {
              if (ot.type === "edge" || ot.id === J || (V = (N = S == null ? void 0 : S.get(ot.type)) == null ? void 0 : N.ports) != null && V.length) continue;
              const ut = ot.h === "auto" ? (n == null ? void 0 : n[ot.id]) ?? 100 : ot.h, pt = ot.w * 0.2, Tt = ut * 0.2;
              nt >= ot.x - pt && nt <= ot.x + ot.w + pt && Q >= ot.y - Tt && Q <= ot.y + ut + Tt && X.add(ot.id);
              const rt = Go(ot, n), St = R ? R.has(ot.type) : ot.type === "frame";
              for (const Mt of rt) {
                const ht = Math.hypot(Mt.x - nt, Mt.y - Q);
                ht >= et || St && !_ && E || (!St && _ || ht < H) && (H = ht, _ = St, E = ot.id, G = Mt.side);
              }
            }
          }
          return t.filter((H) => {
            var _, et;
            return H.type === "edge" || (et = (_ = S == null ? void 0 : S.get(H.type)) == null ? void 0 : _.ports) != null && et.length ? !1 : o.size <= 1 && o.has(H.id) || O && (H.id === J || X.has(H.id));
          }).map((H) => {
            const _ = Go(H, n), et = 4 / e.zoom, ot = 26 / e.zoom, ut = H.rotation || 0, pt = H.h === "auto" ? (n == null ? void 0 : n[H.id]) ?? 100 : H.h, Tt = H.x + H.w / 2, rt = H.y + pt / 2, St = d && d.fromNode.id === H.id || f && f.anchorNodeId === H.id, Mt = o.has(H.id) && !O;
            return /* @__PURE__ */ u("g", { transform: ut ? `rotate(${ut}, ${Tt}, ${rt})` : void 0, children: _.map(({ side: ht }) => {
              const Wt = {
                top: [H.x + H.w / 2, H.y],
                bottom: [H.x + H.w / 2, H.y + pt],
                left: [H.x, H.y + pt / 2],
                right: [H.x + H.w, H.y + pt / 2]
              }, [Pt, Et] = Wt[ht], Jt = ht === "top" && o.has(H.id) ? 42 / e.zoom : ot;
              let Zt = Pt, re = Et;
              switch (ht) {
                case "top":
                  re = Et - Jt;
                  break;
                case "bottom":
                  re = Et + Jt;
                  break;
                case "left":
                  Zt = Pt - Jt;
                  break;
                case "right":
                  Zt = Pt + Jt;
                  break;
              }
              const $t = O && E === H.id && G === ht;
              return /* @__PURE__ */ u(
                "circle",
                {
                  cx: Zt,
                  cy: re,
                  r: $t ? 5 / e.zoom : et,
                  fill: St || $t ? "#3b82f6" : "white",
                  stroke: $t ? "white" : O && !St ? "#3b82f6" : "#94a3b8",
                  strokeWidth: 1.5 / e.zoom,
                  opacity: $t || O && !St ? 1 : 0.8,
                  style: {
                    cursor: Mt ? "crosshair" : "default",
                    pointerEvents: Mt ? "auto" : "none"
                  },
                  onPointerDown: Mt ? (ne) => {
                    ne.stopPropagation(), c == null || c(H.id, ht, ne);
                  } : void 0
                },
                `ch-${H.id}-${ht}`
              );
            }) }, `conn-${H.id}`);
          });
        })(),
        S && (() => {
          var N;
          const O = !!d || !!f, nt = (d == null ? void 0 : d.cursorX) ?? (f == null ? void 0 : f.cursorX) ?? 0, Q = (d == null ? void 0 : d.cursorY) ?? (f == null ? void 0 : f.cursorY) ?? 0, J = (d == null ? void 0 : d.fromNode.id) ?? null, E = (d == null ? void 0 : d.sourceDirection) === "output" ? "input" : (d == null ? void 0 : d.sourceDirection) === "input" ? "output" : null;
          let G = null, X = null;
          if (O && E) {
            let V = 40 / e.zoom;
            for (const H of t) {
              if (H.type === "edge" || H.id === J) continue;
              const _ = S.get(H.type);
              if (!((N = _ == null ? void 0 : _.ports) != null && N.length)) continue;
              const et = H.h === "auto" ? (n == null ? void 0 : n[H.id]) ?? 100 : H.h, ot = 14 / e.zoom, ut = _.ports.filter((pt) => pt.direction === E);
              for (let pt = 0; pt < ut.length; pt++) {
                const Tt = ut[pt], rt = H.y + et / (ut.length + 1) * (pt + 1), St = Tt.direction === "input" ? H.x - ot : H.x + H.w + ot, Mt = Math.hypot(St - nt, rt - Q);
                Mt < V && (V = Mt, G = H.id, X = Tt.id);
              }
            }
          }
          return t.filter((V) => {
            var _;
            if (V.type === "edge") return !1;
            const H = S.get(V.type);
            return !!((_ = H == null ? void 0 : H.ports) != null && _.length);
          }).map((V) => {
            const _ = S.get(V.type).ports, et = V.h === "auto" ? (n == null ? void 0 : n[V.id]) ?? 100 : V.h, ot = V.rotation || 0, ut = V.x + V.w / 2, pt = V.y + et / 2, Tt = 6 / e.zoom, rt = 14 / e.zoom, St = _.filter((Et) => Et.direction === "input"), Mt = _.filter((Et) => Et.direction === "output"), ht = !O, Wt = (Et, Jt, Zt, re) => {
              const $t = V.y + et / (Zt.length + 1) * (Jt + 1), ne = re === "input" ? V.x - rt : V.x + V.w + rt, Ie = hi[Et.dataType] || hi.any, we = G === V.id && X === Et.id, se = we ? 8 / e.zoom : Tt, Fe = re === "input" ? V.x : V.x + V.w, Nt = re === "input" ? ne - Tt - 4 / e.zoom : ne + Tt + 4 / e.zoom;
              return /* @__PURE__ */ k("g", { children: [
                /* @__PURE__ */ u(
                  "line",
                  {
                    x1: ne,
                    y1: $t,
                    x2: Fe,
                    y2: $t,
                    stroke: Ie,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                we && /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: ne,
                    cy: $t,
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
                    cx: ne,
                    cy: $t,
                    r: se,
                    fill: we ? "white" : Ie,
                    stroke: we ? Ie : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: ht ? "crosshair" : "default",
                      pointerEvents: ht ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: ht ? (Ne) => {
                      Ne.stopPropagation(), M == null || M(V.id, Et.id, re, Ne);
                    } : void 0
                  }
                ),
                (() => {
                  const Ne = Et.label || Et.id, Ve = 9 / e.zoom, Co = 5 / e.zoom, He = 2.5 / e.zoom, Te = Ne.length * Ve * 0.62 + Co * 2, Oe = Ve + He * 2, Xe = re === "input" ? Nt - Te : Nt, Pe = $t - Oe / 2, v = Oe / 2, at = we ? Ie : "#1a1a2e", Qt = we ? Ie : "#2a2a40", ie = we ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ k("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ u(
                      "rect",
                      {
                        x: Xe,
                        y: Pe,
                        width: Te,
                        height: Oe,
                        rx: v,
                        ry: v,
                        fill: at,
                        fillOpacity: we ? 0.9 : 0.85,
                        stroke: Qt,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ u(
                      "text",
                      {
                        x: Xe + Te / 2,
                        y: $t + Ve * 0.35,
                        fill: ie,
                        fontSize: Ve,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: Ne
                      }
                    )
                  ] });
                })()
              ] }, `port-${V.id}-${Et.id}`);
            }, Pt = I == null ? void 0 : I.has(V.id);
            return /* @__PURE__ */ k("g", { transform: ot ? `rotate(${ot}, ${ut}, ${pt})` : void 0, children: [
              St.map((Et, Jt) => Wt(Et, Jt, St, "input")),
              Mt.map((Et, Jt) => Wt(Et, Jt, Mt, "output")),
              Pt && (() => {
                const Et = 10 / e.zoom, Jt = V.x + V.w + Et * 0.3, Zt = V.y - Et * 0.3;
                return /* @__PURE__ */ k("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: Jt,
                      cy: Zt,
                      r: Et,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ u(
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
            ] }, `ports-${V.id}`);
          });
        })(),
        d && (() => {
          let O, nt;
          if (d.sourcePort && S) {
            const Q = d.fromNode, J = S.get(Q.type), E = J != null && J.ports ? cn(Q, J.ports, d.sourcePort, e.zoom, n) : null;
            if (E)
              O = E.x, nt = E.y;
            else {
              const G = cr(Q, d.cursorX, d.cursorY, n);
              O = G.x, nt = G.y;
            }
          } else if (d.sourceHandle) {
            const Q = d.fromNode, J = Q.h === "auto" ? (n == null ? void 0 : n[Q.id]) ?? 100 : Q.h, E = {
              top: [Q.x + Q.w / 2, Q.y],
              bottom: [Q.x + Q.w / 2, Q.y + J],
              left: [Q.x, Q.y + J / 2],
              right: [Q.x + Q.w, Q.y + J / 2]
            }, G = d.sourceHandle, X = G === "top" ? 42 / e.zoom : 26 / e.zoom, [N, V] = E[G];
            let H = N, _ = V;
            switch (G) {
              case "top":
                _ = V - X;
                break;
              case "bottom":
                _ = V + X;
                break;
              case "left":
                H = N - X;
                break;
              case "right":
                H = N + X;
                break;
            }
            if (Q.rotation) {
              const et = Q.x + Q.w / 2, ot = Q.y + J / 2, ut = Q.rotation * Math.PI / 180, pt = Math.cos(ut), Tt = Math.sin(ut), rt = H - et, St = _ - ot;
              O = et + rt * pt - St * Tt, nt = ot + rt * Tt + St * pt;
            } else
              O = H, nt = _;
          } else {
            const Q = cr(d.fromNode, d.cursorX, d.cursorY, n);
            O = Q.x, nt = Q.y;
          }
          return /* @__PURE__ */ u(
            "line",
            {
              x1: O,
              y1: nt,
              x2: d.cursorX,
              y2: d.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        f && (() => {
          const O = ct.get(f.anchorNodeId);
          if (!O) return null;
          let nt, Q;
          if (f.anchorHandle) {
            const J = O.h === "auto" ? (n == null ? void 0 : n[O.id]) ?? 100 : O.h, E = {
              top: [O.x + O.w / 2, O.y],
              bottom: [O.x + O.w / 2, O.y + J],
              left: [O.x, O.y + J / 2],
              right: [O.x + O.w, O.y + J / 2]
            }, G = f.anchorHandle, X = G === "top" ? 42 / e.zoom : 26 / e.zoom, [N, V] = E[G];
            let H = N, _ = V;
            switch (G) {
              case "top":
                _ = V - X;
                break;
              case "bottom":
                _ = V + X;
                break;
              case "left":
                H = N - X;
                break;
              case "right":
                H = N + X;
                break;
            }
            if (O.rotation) {
              const et = O.x + O.w / 2, ot = O.y + J / 2, ut = O.rotation * Math.PI / 180, pt = Math.cos(ut), Tt = Math.sin(ut), rt = H - et, St = _ - ot;
              nt = et + rt * pt - St * Tt, Q = ot + rt * Tt + St * pt;
            } else
              nt = H, Q = _;
          } else {
            const J = cr(O, f.cursorX, f.cursorY, n);
            nt = J.x, Q = J.y;
          }
          return /* @__PURE__ */ u(
            "line",
            {
              x1: nt,
              y1: Q,
              x2: f.cursorX,
              y2: f.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && j.filter((O) => o.has(O.id)).map((O) => /* @__PURE__ */ u(
          Eh,
          {
            node: O,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: n,
            onHandlePointerDown: l,
            onRotateStart: a
          },
          `sel-${O.id}`
        )),
        r && r.points.length > 1 && (() => {
          if (r.strokeStyle === "dashed" || r.strokeStyle === "dotted") {
            const nt = r.points, Q = ["M", nt[0][0], nt[0][1]];
            for (let G = 1; G < nt.length; G++) {
              const [X, N] = nt[G], [V, H] = nt[G - 1];
              Q.push("Q", V, H, (V + X) / 2, (H + N) / 2);
            }
            const J = nt[nt.length - 1];
            Q.push("L", J[0], J[1]);
            const E = ao(r.strokeStyle);
            return /* @__PURE__ */ u(
              "path",
              {
                d: Q.join(" "),
                fill: "none",
                stroke: r.color,
                strokeWidth: r.width,
                strokeDasharray: E == null ? void 0 : E.map((G) => G * Math.max(r.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            );
          }
          return /* @__PURE__ */ u(
            "path",
            {
              d: os(r.points, {
                size: r.width
              }),
              fill: r.color
            }
          );
        })(),
        s && i && (() => {
          const O = Math.min(s.startX, s.endX), nt = Math.min(s.startY, s.endY), Q = Math.abs(s.endX - s.startX), J = Math.abs(s.endY - s.startY);
          if (Q < 2 && J < 2) return null;
          const E = i, G = E.shapeType || "rect";
          if (G === "ellipse")
            return /* @__PURE__ */ u(
              "ellipse",
              {
                cx: O + Q / 2,
                cy: nt + J / 2,
                rx: Q / 2,
                ry: J / 2,
                stroke: E.stroke,
                strokeWidth: E.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (G === "diamond")
            return /* @__PURE__ */ u(
              "polygon",
              {
                points: `${O + Q / 2},${nt} ${O + Q},${nt + J / 2} ${O + Q / 2},${nt + J} ${O},${nt + J / 2}`,
                stroke: E.stroke,
                strokeWidth: E.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (G === "line" || G === "arrow") {
            const X = s.startX, N = s.startY, V = s.endX, H = s.endY;
            return /* @__PURE__ */ k(mt, { children: [
              /* @__PURE__ */ u(
                "line",
                {
                  x1: X,
                  y1: N,
                  x2: V,
                  y2: H,
                  stroke: E.stroke,
                  strokeWidth: E.strokeWidth,
                  strokeDasharray: "4"
                }
              ),
              G === "arrow" && (() => {
                const _ = Math.atan2(H - N, V - X), et = Math.max(12, E.strokeWidth * 4), ot = Math.PI / 6, ut = V - et * Math.cos(_ - ot), pt = H - et * Math.sin(_ - ot), Tt = V - et * Math.cos(_ + ot), rt = H - et * Math.sin(_ + ot);
                return /* @__PURE__ */ u(
                  "polyline",
                  {
                    points: `${ut},${pt} ${V},${H} ${Tt},${rt}`,
                    stroke: E.stroke,
                    strokeWidth: E.strokeWidth,
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
              x: O,
              y: nt,
              width: Q,
              height: J,
              stroke: E.stroke,
              strokeWidth: E.strokeWidth,
              fill: "none",
              strokeDasharray: "4"
            }
          );
        })(),
        y && y.length > 1 && (() => {
          const O = performance.now(), nt = 400, Q = 6 / e.zoom, J = [`M${y[0][0]},${y[0][1]}`];
          if (y.length === 2)
            J.push(`L${y[1][0]},${y[1][1]}`);
          else {
            for (let et = 0; et < y.length - 1; et++) {
              const ot = (y[et][0] + y[et + 1][0]) / 2, ut = (y[et][1] + y[et + 1][1]) / 2;
              J.push(`Q${y[et][0]},${y[et][1]},${ot},${ut}`);
            }
            const _ = y[y.length - 1];
            J.push(`L${_[0]},${_[1]}`);
          }
          const E = J.join(" "), G = (O - y[y.length - 1][2]) / nt, X = (O - y[0][2]) / nt, N = Math.max(0, 0.85 * (1 - G)), V = Math.max(0, 0.85 * (1 - X)), H = (N + V) / 2;
          return H <= 0 ? null : /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: E,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: Q * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: H * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: E,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: Q,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: H
              }
            )
          ] });
        })(),
        m && m.length > 1 && (() => {
          const O = performance.now(), nt = 1560, Q = 6 / e.zoom, J = [];
          let E = !1, G = !1;
          for (let ut = 0; ut < m.length; ut++) {
            const pt = m[ut];
            if (isNaN(pt[0])) {
              E = !1, G = !1;
              continue;
            }
            if (!E)
              J.push(`M${pt[0]},${pt[1]}`), E = !0, G = !0;
            else if (G) {
              const Tt = ut + 1 < m.length && !isNaN(m[ut + 1][0]) ? m[ut + 1] : null;
              if (Tt) {
                const rt = (pt[0] + Tt[0]) / 2, St = (pt[1] + Tt[1]) / 2;
                J.push(`Q${pt[0]},${pt[1]},${rt},${St}`);
              } else
                J.push(`L${pt[0]},${pt[1]}`);
            }
          }
          if (J.length === 0) return null;
          const X = J.join(" "), N = m.filter((ut) => !isNaN(ut[0]));
          if (N.length === 0) return null;
          const V = (O - N[N.length - 1][2]) / nt, H = (O - N[0][2]) / nt, _ = Math.max(0, 0.85 * (1 - V)), et = Math.max(0, 0.85 * (1 - H)), ot = (_ + et) / 2;
          return ot <= 0 ? null : /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: X,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: Q * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ot * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: X,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: Q,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: ot
              }
            )
          ] });
        })(),
        C && C.length > 0 && C.map((O, nt) => /* @__PURE__ */ u(
          "line",
          {
            x1: O.axis === "x" ? O.position : O.start,
            y1: O.axis === "x" ? O.start : O.position,
            x2: O.axis === "x" ? O.position : O.end,
            y2: O.axis === "x" ? O.end : O.position,
            stroke: "#f472b6",
            strokeWidth: 1 / e.zoom,
            strokeDasharray: `${3 / e.zoom} ${2 / e.zoom}`,
            opacity: 0.8
          },
          `guide-${nt}`
        ))
      ] })
    }
  );
}
function Dh({
  x: t,
  y: e,
  sections: o,
  onClose: n
}) {
  const r = lt(null);
  bt(() => {
    var g;
    const p = (y) => {
      r.current && !r.current.contains(y.target) && n();
    }, d = (y) => {
      y.key === "Escape" && n();
    }, f = ((g = r.current) == null ? void 0 : g.ownerDocument) ?? document;
    return f.addEventListener("pointerdown", p, !0), f.addEventListener("keydown", d), () => {
      f.removeEventListener("pointerdown", p, !0), f.removeEventListener("keydown", d);
    };
  }, [n]), bt(() => {
    const p = r.current;
    if (!p) return;
    const d = p.getBoundingClientRect(), f = p.ownerDocument.defaultView ?? window;
    let g = t, y = e;
    d.right > f.innerWidth && (g = t - d.width), d.bottom > f.innerHeight && (y = e - d.height), g = Math.max(0, g), y = Math.max(0, y), p.style.left = `${g}px`, p.style.top = `${y}px`;
  }, [t, e]);
  const s = it(
    (p) => {
      p.disabled || (p.action(), n());
    },
    [n]
  ), i = navigator.platform.includes("Mac"), l = i ? "⌘" : "Ctrl+", a = i ? "⌥" : "Alt+", c = i ? "⇧" : "Shift+", h = (p) => p.replace("Mod+", l).replace("Alt+", a).replace("Shift+", c);
  return /* @__PURE__ */ u(
    "div",
    {
      "data-sb-context-menu": !0,
      ref: r,
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
      children: o.map((p, d) => /* @__PURE__ */ k("div", { children: [
        d > 0 && /* @__PURE__ */ u(
          "div",
          {
            style: {
              height: 1,
              background: "#333",
              margin: "4px 0"
            }
          }
        ),
        p.items.map((f, g) => /* @__PURE__ */ k(
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
                  children: h(f.shortcut)
                }
              )
            ]
          },
          g
        ))
      ] }, d))
    }
  );
}
const Ea = "sbd-clipboard", Wh = "sbd-nodes:";
function Ra(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let n = "";
  for (let r = 0; r < o.length; r++) n += String.fromCharCode(o[r]);
  return btoa(n);
}
function ui(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let r = 0; r < e.length; r++) o[r] = e.charCodeAt(r);
    const n = new TextDecoder().decode(o);
    return JSON.parse(n);
  } catch {
    return null;
  }
}
function La(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return ui(e[1]);
  const o = t.match(
    new RegExp(`<!--${Wh}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? ui(o[1]) : null;
}
function Tn(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function Da(t) {
  return t.map((e) => {
    var r;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), n = (r = e.children) != null && r.length ? `
` + Da(e.children) : "";
    return o + n;
  }).filter(Boolean).join(`
`);
}
function Bh(t) {
  var o;
  const e = [];
  for (const n of t)
    switch (n.type) {
      case "content": {
        const r = n.data;
        (o = r.blocks) != null && o.length ? e.push(Da(r.blocks)) : r.markdown && e.push(r.markdown);
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
function pi(t, e) {
  const o = Bh(e), n = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), r = Ra(e);
  return t.setData(
    "text/html",
    `<!--${Ea}--><div data-sbd-nodes="${r}">${n || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function Fh(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, n = o.defaultView ?? window, r = n.innerWidth / 2, s = n.innerHeight / 2, i = null;
  const l = (y) => {
    r = y.clientX, s = y.clientY;
  }, a = (y) => {
    Tn(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = pi(
      y.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (y) => {
    Tn(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = pi(
      y.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, h = async (y) => {
    var P, j, U;
    if (Tn(y.target)) return;
    const { x: m, y: b } = t.screenToCanvas(r, s), x = ((P = y.clipboardData) == null ? void 0 : P.getData("text/html")) || "", S = ((j = y.clipboardData) == null ? void 0 : j.getData("text/plain")) || "";
    if (x.includes(Ea) || x.includes("data-sbd-nodes=") || i !== null && S === i) {
      if (i !== null && S === i && t.hasClipboard()) {
        y.preventDefault(), t.pasteClipboard(m, b);
        return;
      }
      const O = La(x);
      if (O) {
        y.preventDefault(), t.setClipboard(O), t.pasteClipboard(m, b);
        return;
      }
    }
    const I = (U = y.clipboardData) == null ? void 0 : U.items;
    if (I) {
      for (const ct of Array.from(I))
        if (ct.type.startsWith("image/")) {
          y.preventDefault();
          const O = ct.getAsFile();
          if (!O) continue;
          const nt = new FileReader();
          nt.onload = () => {
            const Q = nt.result, J = new Image();
            J.onload = () => {
              const E = t.screenToCanvas(r, s), G = 400, X = 300, N = J.naturalWidth / J.naturalHeight, V = Math.min(J.naturalWidth, G), H = Math.min(J.naturalHeight, X), _ = N >= 1 ? V : H * N, et = N >= 1 ? V / N : H;
              let ot = Q;
              if (x) {
                const pt = x.match(/<img[^>]+src=["']([^"']+)["']/i);
                pt && /\.(gif|webp|apng)(\?|#|$)/i.test(pt[1]) && (ot = pt[1].replace(/&amp;/g, "&"));
              }
              const ut = {
                id: kt(10),
                type: "image",
                x: E.x,
                y: E.y,
                w: _,
                h: et,
                z: t.nextZ(),
                data: { src: ot }
              };
              t.addNode(ut), t.select(ut.id);
            }, J.src = Q;
          }, nt.readAsDataURL(O);
          return;
        }
    }
    const R = Yr(S) ?? Yr(x);
    if (R) {
      y.preventDefault();
      const ct = t.screenToCanvas(r, s), O = await Aa(
        R,
        ct.x,
        ct.y,
        t.nextZ()
      );
      O && (t.addNode(O), t.select(O.id));
      return;
    }
    if (Xd(S)) {
      const ct = Od(S);
      if (ct) {
        y.preventDefault();
        const O = {
          id: kt(10),
          type: "youtube",
          x: m,
          y: b,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: ct, url: S.trim() }
        };
        t.addNode(O), t.select(O.id);
        return;
      }
    }
    const C = x.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (C)
      try {
        const ct = ji(C);
        if (ct.length > 0) {
          y.preventDefault();
          const O = {
            id: kt(10),
            type: "content",
            x: m,
            y: b,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: ct, markdown: S, borderColor: "#1e1e2e" }
          };
          t.addNode(O), t.select(O.id);
          return;
        }
      } catch {
      }
    if (S.trim()) {
      y.preventDefault();
      const ct = await Jr(S), O = {
        id: kt(10),
        type: "content",
        x: m,
        y: b,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: ct, markdown: S, borderColor: "#1e1e2e" }
      };
      t.addNode(O), t.select(O.id);
      return;
    }
    t.hasClipboard() && (y.preventDefault(), t.pasteClipboard(m, b));
  }, p = (y) => {
    const m = y.target;
    if (Tn(m)) return;
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
      const x = Array.from(t.selection);
      y.altKey ? t.bringToFront(x) : t.bringForward(x);
      return;
    }
    if (b && y.key === "[") {
      y.preventDefault();
      const x = Array.from(t.selection);
      y.altKey ? t.sendToBack(x) : t.sendBackward(x);
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
      y.preventDefault(), t.selectMultiple(t.getAllNodes().map((x) => x.id));
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
  function d(y, m) {
    y.addEventListener("pointermove", l), y.addEventListener("copy", a), y.addEventListener("cut", c), y.addEventListener("paste", h), m.addEventListener("keydown", p);
  }
  function f(y, m) {
    y.removeEventListener("pointermove", l), y.removeEventListener("copy", a), y.removeEventListener("cut", c), y.removeEventListener("paste", h), m.removeEventListener("keydown", p);
  }
  d(o, n);
  const g = setInterval(() => {
    if (!e) return;
    const y = e.ownerDocument;
    y !== o && (f(o, n), o = y, n = y.defaultView ?? window, r = n.innerWidth / 2, s = n.innerHeight / 2, d(o, n));
  }, 500);
  return () => {
    clearInterval(g), f(o, n);
  };
}
async function fi(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const n = t.measuredHeights, r = Nh(o, n, t), s = e.padding ?? 40, i = e.background !== !1, l = e.format === "png", a = r.w + s * 2, c = r.h + s * 2, h = r.x - s, p = r.y - s, d = await Wa(o, t, n, h, p, l), f = i ? pn(t.boardBackground).canvasBg : "transparent", g = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${a}" height="${c}" viewBox="0 0 ${a} ${c}">`,
    `<rect width="${a}" height="${c}" fill="${f}"/>`,
    ...d,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    yi(new Blob([g], { type: "image/svg+xml" }), "board.svg");
  else {
    const y = e.scale ?? 4, m = await Jh(g, a, c, y);
    yi(m, "board.png");
  }
}
function Nh(t, e, o) {
  let n = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const a of t) {
    if (a.type === "edge") continue;
    const c = o.resolveHeight(a);
    n = Math.min(n, a.x), r = Math.min(r, a.y), s = Math.max(s, a.x + a.w), i = Math.max(i, a.y + c);
  }
  const l = new Map(t.map((a) => [a.id, a]));
  for (const a of t) {
    if (a.type !== "edge") continue;
    const c = a, h = l.get(c.data.fromId), p = l.get(c.data.toId);
    if (!h || !p) continue;
    const d = Ye(
      h,
      p,
      c.data.edgeType,
      e,
      c.data.sourceHandle,
      c.data.targetHandle,
      c.data.midpointOffset,
      c.data.curveOffset
    );
    n = Math.min(n, d.bounds.x), r = Math.min(r, d.bounds.y), s = Math.max(s, d.bounds.x + d.bounds.w), i = Math.max(i, d.bounds.y + d.bounds.h);
  }
  return isFinite(n) ? { x: n, y: r, w: s - n, h: i - r } : { x: 0, y: 0, w: 100, h: 100 };
}
async function Wa(t, e, o, n, r, s) {
  const i = new Map(t.map((c) => [c.id, c])), l = [...t].sort((c, h) => c.z - h.z), a = [];
  for (const c of l) {
    const h = c.x - n, p = c.y - r, d = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        a.push(Hh(c, h, p, d));
        break;
      case "content":
        a.push(Oh(c, h, p, c.w, d));
        break;
      case "draw":
        a.push(Xh(c, n, r));
        break;
      case "shape":
        a.push(Gh(c, h, p, c.w, d));
        break;
      case "text":
        a.push(jh(c, h, p, c.w, d));
        break;
      case "sticky":
        a.push(Vh(c, h, p, c.w, d));
        break;
      case "image":
        a.push(await Kh(c, h, p, c.w, d, s));
        break;
      case "youtube":
        a.push(await qh(c, h, p, c.w, d, s));
        break;
      case "edge": {
        const f = c, g = i.get(f.data.fromId), y = i.get(f.data.toId);
        g && y && a.push(Zh(f, g, y, o, n, r));
        break;
      }
    }
  }
  return a;
}
function lo(t, e, o, n, r, s, i) {
  const l = [];
  if (s) {
    const a = e + n / 2, c = o + r / 2;
    l.push(`transform="rotate(${s}, ${a}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && l.push(`opacity="${i}"`), `<g ${l.join(" ")}>${t}</g>`;
}
function Hh(t, e, o, n) {
  const r = t.data, s = r.backgroundColor || "rgba(0,0,0,0.02)", i = r.borderColor || "#d1d5db", l = r.borderWidth ?? 1, a = Zn(r.borderStyle, l), c = r.label ? qo(r.label) : "";
  let h = `<rect x="${e}" y="${o}" width="${t.w}" height="${n}" rx="4" fill="${s}" stroke="${i}" stroke-width="${l}"` + (a ? ` stroke-dasharray="${a}"` : "") + "/>";
  return c && (h += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), lo(h, e, o, t.w, n, t.rotation, r.opacity);
}
function Oh(t, e, o, n, r) {
  var p;
  const s = t.data, i = ((p = s.markdown) == null ? void 0 : p.trim()) || "", l = s.borderColor, a = s.borderWidth ?? 0, c = Zn(s.borderStyle, a);
  let h = "";
  return l && a > 0 ? h += `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="white" stroke="${l}" stroke-width="${a}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : h += `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="white"/>`, i && (h += ys(i, e + 12, o + 20, n - 24, 14, 1.6, "#374151", "left", "sans-serif")), lo(h, e, o, n, r, t.rotation, s.opacity);
}
function Xh(t, e, o) {
  const n = t.data, r = n.points.map(
    ([l, a, c]) => [l + t.x - e, a + t.y - o, c]
  );
  if (r.length === 0) return "";
  if (n.tool === "vector")
    return Yh(r, n, t);
  const s = ao(n.strokeStyle);
  let i = "";
  if (n.fill) {
    const l = r.map(([a, c]) => [a, c]);
    if (l.length > 2) {
      const a = l.map((c, h) => `${h === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ") + " Z";
      i += `<path d="${a}" fill="${n.fill}" fill-opacity="0.4" stroke="none"/>`;
    }
  }
  if (s) {
    const l = r.map((c, h) => `${h === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" "), a = s.map((c) => c * Math.max(n.strokeWidth, 1)).join(" ");
    i += `<path d="${l}" fill="none" stroke="${n.color}" stroke-width="${n.strokeWidth}" stroke-dasharray="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const l = os(r, { size: n.strokeWidth });
    l && (i += `<path d="${l}" fill="${n.color}" stroke="none"/>`);
  }
  return n.opacity !== void 0 && n.opacity !== 1 ? `<g opacity="${n.opacity}">${i}</g>` : i;
}
function Yh(t, e, o) {
  const n = t.map((a, c) => `${c === 0 ? "M" : "L"}${a[0].toFixed(2)},${a[1].toFixed(2)}`).join(" ") + " Z", r = ao(e.strokeStyle), s = r ? ` stroke-dasharray="${r.map((a) => a * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${n}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, l = o.h === "auto" ? 0 : o.h;
  return lo(i, o.x, o.y, o.w, l, o.rotation, e.opacity);
}
function Gh(t, e, o, n, r) {
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
  const a = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      l = Xn(e, o, n, r, i, a);
      break;
    case "ellipse":
      l = ss(e + n / 2, o + r / 2, n, r, i);
      break;
    case "diamond":
      l = is(e, o, n, r, i, a);
      break;
    case "line": {
      const h = s.startPoint ?? [0, 0], p = s.endPoint ?? [n, r];
      l = jo(e + h[0], o + h[1], e + p[0], o + p[1], i);
      break;
    }
    case "arrow": {
      const h = s.startPoint ?? [0, 0], p = s.endPoint ?? [n, r];
      l = as(e + h[0], o + h[1], e + p[0], o + p[1], i);
      break;
    }
    default:
      l = Xn(e, o, n, r, i);
  }
  const c = l.map(
    (h) => `<path d="${h.d}" fill="${h.fill || "none"}" stroke="${h.stroke}" stroke-width="${h.strokeWidth}"` + (h.strokeDasharray ? ` stroke-dasharray="${h.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return lo(c, e, o, n, r, t.rotation, s.opacity);
}
function jh(t, e, o, n, r) {
  const s = t.data, i = r || s.text.split(`
`).length * s.fontSize * 1, l = no(s.fontFamily), a = !!s.borderColor, c = a ? 6 : 0;
  let h = "";
  if (a) {
    const d = s.borderWidth ?? 1, f = Zn(s.borderStyle, d);
    h += `<rect x="${e}" y="${o}" width="${n}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${d}"` + (f ? ` stroke-dasharray="${f}"` : "") + "/>";
  }
  const p = s.align === "center" ? e + n / 2 : s.align === "right" ? e + n - c : e + c;
  return h += ys(
    s.text,
    p,
    o + c + s.fontSize,
    n - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    l
  ), lo(h, e, o, n, i, t.rotation, s.opacity);
}
function Vh(t, e, o, n, r) {
  const s = t.data, i = s.fontSize ?? 16, l = `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="2" fill="${s.color}"/>` + ys(s.text, e + 12, o + 12 + i, n - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return lo(l, e, o, n, r, t.rotation, s.opacity);
}
async function Kh(t, e, o, n, r, s) {
  const i = t.data;
  let l = i.src;
  if (s && l && !l.startsWith("data:"))
    try {
      l = await Gn(l);
    } catch {
    }
  const a = i.borderColor, c = i.borderWidth ?? 0, h = Zn(i.borderStyle, c);
  let p = `<image href="${qo(l)}" x="${e}" y="${o}" width="${n}" height="${r}" preserveAspectRatio="xMidYMid slice"/>`;
  return a && c > 0 && (p += `<rect x="${e}" y="${o}" width="${n}" height="${r}" fill="none" stroke="${a}" stroke-width="${c}"` + (h ? ` stroke-dasharray="${h}"` : "") + "/>"), lo(p, e, o, n, r, t.rotation, i.opacity);
}
async function qh(t, e, o, n, r, s) {
  const i = t.data;
  let l = Gd(i.videoId);
  if (s)
    try {
      l = await Gn(l);
    } catch {
    }
  let a = `<rect x="${e}" y="${o}" width="${n}" height="${r}" rx="4" fill="#1a1a1a"/><image href="${qo(l)}" x="${e}" y="${o}" width="${n}" height="${r}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + n / 2, h = o + r / 2, p = Math.min(n, r) * 0.12;
  return a += `<circle cx="${c}" cy="${h}" r="${p}" fill="rgba(0,0,0,0.6)"/><path d="${Uh(c, h, p * 0.5)}" fill="white"/>`, lo(a, e, o, n, r, t.rotation, i.opacity);
}
function Uh(t, e, o) {
  const n = o * 0.15, r = t - o * 0.7 + n, s = e - o, i = t + o + n, l = e, a = r, c = e + o;
  return `M${r},${s} L${i},${l} L${a},${c} Z`;
}
function Zh(t, e, o, n, r, s) {
  const i = t.data, l = Ye(
    e,
    o,
    i.edgeType,
    n,
    i.sourceHandle,
    i.targetHandle,
    i.midpointOffset,
    i.curveOffset
  ), a = `translate(${-r}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, h = i.strokeWidth;
  let p = `<path d="${l.path}" fill="none" stroke="${i.color}" stroke-width="${h}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const d = i.arrowHeadSize ?? Math.max(8, h * 3), f = i.arrowTailSize ?? Math.max(8, h * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      p += `<path d="${Xo(l.x2, l.y2, l.arrowAngle, d)}" fill="none" stroke="${i.color}" stroke-width="${h}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      p += `<path d="${Bn(l.x2, l.y2, l.arrowAngle, d)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const g = d / 3;
      p += `<circle cx="${l.x2}" cy="${l.y2}" r="${g}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      p += `<path d="${Xo(l.x1, l.y1, l.tailAngle, f)}" fill="none" stroke="${i.color}" stroke-width="${h}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      p += `<path d="${Bn(l.x1, l.y1, l.tailAngle, f)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const g = f / 3;
      p += `<circle cx="${l.x1}" cy="${l.y1}" r="${g}" fill="${i.color}"/>`;
    }
  }
  return i.label && (p += `<text x="${l.labelX}" y="${l.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${qo(i.label)}</text>`), `<g transform="${a}">${p}</g>`;
}
function ys(t, e, o, n, r, s, i, l, a) {
  if (!t) return "";
  const c = l === "center" ? "middle" : l === "right" ? "end" : "start", h = Qh(t, n, r), p = r * s, d = h.map(
    (f, g) => `<tspan x="${e}" dy="${g === 0 ? 0 : p}">${qo(f)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${r}" fill="${i}" font-family="${qo(a)}" text-anchor="${c}">${d}</text>`;
}
function Qh(t, e, o) {
  const n = o * 0.55, r = Math.max(1, Math.floor(e / n)), s = [];
  for (const i of t.split(`
`)) {
    if (!i.trim()) {
      s.push("");
      continue;
    }
    const l = i.split(/\s+/);
    let a = "";
    for (const c of l) {
      const h = a ? a + " " + c : c;
      h.length > r && a ? (s.push(a), a = c) : a = h;
    }
    a && s.push(a);
  }
  return s;
}
function Zn(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function qo(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Gn(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((n, r) => {
    const s = new FileReader();
    s.onloadend = () => n(s.result), s.onerror = r, s.readAsDataURL(o);
  });
}
function Jh(t, e, o, n) {
  return new Promise((r, s) => {
    const i = new Image(), l = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l);
    i.onload = () => {
      const c = document.createElement("canvas");
      c.width = e * n, c.height = o * n;
      const h = c.getContext("2d");
      h.scale(n, n), h.drawImage(i, 0, 0, e, o), URL.revokeObjectURL(a), c.toBlob((p) => {
        p ? r(p) : s(new Error("Canvas toBlob failed"));
      }, "image/png");
    }, i.onerror = () => {
      URL.revokeObjectURL(a), s(new Error("Failed to load SVG as image"));
    }, i.src = a;
  });
}
const $h = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), Lo = /* @__PURE__ */ new Map(), _h = 12;
function tu(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const n = o.data.fontFamily;
      n && !$h.has(n) && e.add(n);
    }
  return [...e];
}
async function eu(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (Lo.has(o)) {
      e.push(Lo.get(o));
      continue;
    }
    try {
      let n;
      if (o === "Excalifont")
        n = await Gn(Vi);
      else {
        const l = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!l) continue;
        n = await Gn(l[1]);
      }
      const r = `@font-face { font-family: '${o}'; src: url('${n}') format('woff2'); }`;
      if (Lo.size >= _h) {
        const s = Lo.keys().next().value;
        s !== void 0 && Lo.delete(s);
      }
      Lo.set(o, r), e.push(r);
    } catch {
    }
  }
  return e.join(`
`);
}
async function ou(t, e) {
  const o = t.getNode(e);
  if (!o || o.type !== "frame") return "";
  const n = t.resolveHeight(o), r = 0, s = o.w + r * 2, i = n + r * 2, l = o.x - r, a = o.y - r, c = [o], h = /* @__PURE__ */ new Set([e]), p = (x) => {
    h.has(x.id) || x.type === "edge" || (h.add(x.id), c.push(x));
  };
  for (const x of t.getNodesInRect({ x: o.x, y: o.y, w: o.w, h: n }))
    p(x);
  for (const x of t.getFrameChildren(e))
    p(x);
  for (const x of t.getAllNodes())
    if (x.type === "edge") {
      const S = x;
      h.has(S.data.fromId) && h.has(S.data.toId) && c.push(x);
    }
  const d = t.measuredHeights, f = await Wa(c, t, d, l, a, !0), g = tu(c), y = await eu(g), m = pn(t.boardBackground).canvasBg, b = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    y ? `<defs><style>${y}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${m}"/>`,
    ...f,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(b)}`;
}
function yi(t, e) {
  const o = URL.createObjectURL(t), n = document.createElement("a");
  n.href = o, n.download = e, document.body.appendChild(n), n.click(), document.body.removeChild(n), URL.revokeObjectURL(o);
}
const gi = [
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
], mi = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function bi(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const Ba = [
  ...gi,
  ...bi(gi, "phone-landscape"),
  ...mi,
  ...bi(mi, "tablet-landscape"),
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
], nu = new Map(Ba.map((t) => [t.key, t]));
function Gr(t) {
  return nu.get(t);
}
function Fa(t) {
  return t.w / t.h;
}
const ru = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function su() {
  const t = /* @__PURE__ */ new Map();
  for (const e of Ba) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: ru[e] ?? e,
    presets: o
  }));
}
function iu(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, n = parseInt(e.substring(2, 4), 16) || 0, r = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * n + 0.114 * r) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function kr(t, e, o) {
  let n = !1;
  for (let r = 0, s = o.length - 1; r < o.length; s = r++) {
    const [i, l] = o[r], [a, c] = o[s];
    l > e != c > e && t < (a - i) * (e - l) / (c - l) + i && (n = !n);
  }
  return n;
}
function vr(t, e) {
  return t.fromId === e.fromId && t.toId === e.toId && (t.sourceHandle ?? null) === (e.sourceHandle ?? null) && (t.targetHandle ?? null) === (e.targetHandle ?? null) && (t.sourcePort ?? null) === (e.sourcePort ?? null) && (t.targetPort ?? null) === (e.targetPort ?? null);
}
async function au(t, e, o) {
  try {
    const n = await navigator.clipboard.read();
    let r = null;
    for (const i of n)
      if (i.types.includes("text/html")) {
        const l = await (await i.getType("text/html")).text();
        if (l.includes("sbd-clipboard") || l.includes("data-sbd-nodes=")) {
          const a = La(l);
          if (a) {
            t.setClipboard(a), t.pasteClipboard(e, o);
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
      const l = i.types.find((a) => a.startsWith("image/"));
      if (l) {
        const a = await i.getType(l), c = await new Promise((x) => {
          const S = new FileReader();
          S.onload = () => x(S.result), S.readAsDataURL(a);
        }), h = new Image();
        await new Promise((x) => {
          h.onload = () => x(), h.src = c;
        });
        const p = h.naturalWidth / h.naturalHeight, d = Math.min(h.naturalWidth, 400), f = Math.min(h.naturalHeight, 300), g = p >= 1 ? d : f * p, y = p >= 1 ? d / p : f;
        let m = c;
        if (r) {
          const x = r.match(/<img[^>]+src=["']([^"']+)["']/i);
          x && /\.(gif|webp|apng)(\?|#|$)/i.test(x[1]) && (m = x[1].replace(/&amp;/g, "&"));
        }
        const b = {
          id: kt(10),
          type: "image",
          x: e,
          y: o,
          w: g,
          h: y,
          z: t.nextZ(),
          data: { src: m }
        };
        t.addNode(b), t.select(b.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (r) {
      const i = r.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const l = ji(i);
        if (l.length > 0) {
          const a = {
            id: kt(10),
            type: "content",
            x: e,
            y: o,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: l, markdown: s || "", borderColor: "#1e1e2e" }
          };
          t.addNode(a), t.select(a.id);
          return;
        }
      } catch {
      }
    }
    if (s != null && s.trim()) {
      const i = await Jr(s), l = {
        id: kt(10),
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
async function xi(t) {
  const e = t.getClipboardNodes();
  if (e.length === 0) return;
  const o = [];
  for (const l of e)
    if (l.type === "content") {
      const a = l.data;
      a.markdown && o.push(a.markdown);
    } else if (l.type === "text") {
      const a = l.data;
      a.text && o.push(a.text);
    } else if (l.type === "image") {
      const a = l.data;
      o.push(a.src.startsWith("http") ? a.src : a.alt || "[Image]");
    } else if (l.type === "shape") {
      const a = l.data;
      a.label && o.push(a.label);
    } else if (l.type === "sticky") {
      const a = l.data;
      a.text && o.push(a.text);
    } else if (l.type === "edge") {
      const a = l.data;
      a.label && o.push(a.label);
    }
  const n = o.join(`

`), r = n.split(`
`).filter(Boolean).map((l) => `<p>${l}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${Ra(e)}">${r || "<p></p>"}</div>`;
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
function Pn(t) {
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
function wi(t, e) {
  const o = e.x - t.x, n = e.y - t.y;
  return { dist: Math.sqrt(o * o + n * n), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const Do = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function lu({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: n,
  observeElement: r,
  unobserveElement: s,
  isContainer: i,
  children: l
}) {
  const a = lt(null);
  bt(() => {
    if (t.h !== "auto") return;
    const p = a.current;
    if (!p) return;
    const d = p.offsetHeight;
    return d > 0 && n(t.id, d), r(p, () => {
      const f = p.offsetHeight;
      f > 0 && n(t.id, f);
    }), () => s(p);
  }, [t.id, t.h, n, r, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, h = Kt(() => ({
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
      ref: a,
      "data-node-id": t.id,
      className: e ? void 0 : "sb-block-inert",
      style: h,
      children: l
    }
  );
}
function cu({
  node: t,
  engine: e,
  onDone: o
}) {
  const n = lt(null), r = lt(t.data.label ?? ""), s = lt(t);
  s.current = t;
  const i = lt(t.data.label ?? "");
  bt(() => () => {
    const h = s.current, p = r.current.trim();
    if (p !== i.current) {
      const f = { data: { ...h.data, label: p || void 0 } }, g = n.current;
      if (g && p) {
        const m = h.h === "auto" ? 100 : h.h, b = g.scrollHeight + 24;
        b > m && (f.h = b);
      }
      e.updateNodeWithHistory(h.id, f);
    }
  }, []);
  const l = t.h === "auto" ? 100 : t.h, a = t.data.labelFontSize ?? 14, c = t.data.fill && t.data.fillStyle === "solid" ? iu(t.data.fill) : t.data.stroke;
  return /* @__PURE__ */ u(
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
      children: /* @__PURE__ */ u(
        "textarea",
        {
          ref: n,
          autoFocus: !0,
          defaultValue: t.data.label ?? "",
          placeholder: "",
          rows: 1,
          onBlur: () => o(),
          onKeyDown: (h) => {
            h.key === "Escape" && h.currentTarget.blur(), h.stopPropagation();
          },
          onInput: (h) => {
            const p = h.currentTarget;
            r.current = p.value;
            const d = s.current;
            e.updateNode(d.id, {
              data: { ...d.data, label: p.value || void 0 }
            }), p.style.height = "auto", p.style.height = p.scrollHeight + "px";
            const g = p.scrollHeight + 24;
            g > l && e.updateNode(t.id, { h: g });
          },
          onPointerDown: (h) => h.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: a,
            fontFamily: no(t.data.labelFontFamily ?? oo),
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
function du({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: n
}) {
  const r = lt(null), s = () => {
    var w;
    return ((w = r.current) == null ? void 0 : w.ownerDocument) ?? document;
  }, [i, l] = tt({ w: 0, h: 0 }), [a, c] = tt({ ...t.viewport }), [h, p] = tt(t.getAllNodes()), [d, f] = tt(
    new Set(t.selection)
  ), [g, y] = tt(t.mode), [m, b] = tt(t.activeGroupId), [x, S] = tt(t.snapToGrid), [M, I] = tt(t.gridSize), [R, C] = tt(t.smartGuides), [P, j] = tt([]), [U, ct] = tt(t.boardBackground), O = lt(!1), nt = lt(!1), Q = lt(/* @__PURE__ */ new Map()), J = lt(!1), E = lt(!1), G = lt(null), X = lt(null), N = it((w) => {
    s().dispatchEvent(new CustomEvent("sb:canvas-interaction", { detail: { active: w } }));
  }, []);
  bt(() => {
    const w = (z) => {
      var Y, T;
      if (z.key === " " && !z.repeat && !O.current) {
        const B = (Y = z.target) == null ? void 0 : Y.tagName;
        if (B === "INPUT" || B === "TEXTAREA" || (T = z.target) != null && T.isContentEditable) return;
        O.current = !0;
        const D = r.current;
        D && (D.style.cursor = "grab"), z.preventDefault();
      }
    }, A = (z) => {
      if (z.key === " ") {
        O.current = !1, nt.current = !1;
        const Y = r.current;
        Y && (Y.style.cursor = t.lassoSelect ? Do : Pn(t.mode));
      }
    };
    return window.addEventListener("keydown", w), window.addEventListener("keyup", A), () => {
      window.removeEventListener("keydown", w), window.removeEventListener("keyup", A);
    };
  }, []), bt(() => {
    const w = (z) => {
      Q.current.delete(z.pointerId), z.pointerType === "pen" && (E.current = !1), Q.current.size === 0 && N(!1), G.current && (clearTimeout(G.current), G.current = null, X.current = null);
    }, A = s();
    return A.addEventListener("pointerup", w), A.addEventListener("pointercancel", w), () => {
      A.removeEventListener("pointerup", w), A.removeEventListener("pointercancel", w);
    };
  }, [N]);
  const [V, H] = tt(null), [_, et] = tt(null), [ot, ut] = tt(null), [pt, Tt] = tt(null);
  bt(() => {
    const w = r.current;
    if (!w) return;
    t.setContainer(w);
    const A = () => {
      const Y = w.getBoundingClientRect();
      t.containerOffset = { x: Y.left, y: Y.top };
    };
    A();
    const z = new ResizeObserver((Y) => {
      var D;
      const { width: T, height: B } = ((D = Y[0]) == null ? void 0 : D.contentRect) ?? { width: 0, height: 0 };
      l((L) => L.w === T && L.h === B ? L : { w: T, h: B }), t.setContainerSize(T, B), A();
    });
    return z.observe(w), () => z.disconnect();
  }, [t]);
  const [rt, St] = tt({}), Mt = it((w, A) => {
    St(
      (z) => z[w] === A ? z : { ...z, [w]: A }
    ), t.updateMeasuredHeight(w, A);
  }, [t]), ht = lt(null), Wt = lt(/* @__PURE__ */ new Map());
  function Pt() {
    return ht.current || (ht.current = new ResizeObserver((w) => {
      var A;
      for (const z of w)
        (A = Wt.current.get(z.target)) == null || A(z);
    })), ht.current;
  }
  const Et = it((w, A) => {
    Wt.current.set(w, A), Pt().observe(w);
  }, []), Jt = it((w) => {
    var A;
    Wt.current.delete(w), (A = ht.current) == null || A.unobserve(w);
  }, []);
  bt(() => () => {
    var w;
    (w = ht.current) == null || w.disconnect(), ht.current = null, Wt.current.clear();
  }, []);
  const Zt = Kt(() => new Set(h.map((w) => w.id)), [h]);
  bt(() => {
    St((w) => {
      let A = !1;
      const z = {};
      for (const [Y, T] of Object.entries(w))
        Zt.has(Y) ? z[Y] = T : A = !0;
      return A ? z : w;
    });
  }, [Zt]);
  const re = it(
    (w, A, z) => {
      let Y, T;
      if (o && w.data.sourcePort) {
        const B = o.get(A.type);
        B != null && B.ports && (Y = cn(A, B.ports, w.data.sourcePort, a.zoom, rt) ?? void 0);
      }
      if (o && w.data.targetPort) {
        const B = o.get(z.type);
        B != null && B.ports && (T = cn(z, B.ports, w.data.targetPort, a.zoom, rt) ?? void 0);
      }
      return { sourcePortPos: Y, targetPortPos: T };
    },
    [o, a.zoom, rt]
  );
  it(
    (w) => t.zoomToNode(w),
    [t]
  );
  const $t = it(
    (w, A) => {
      if (!w.rotation)
        return { minX: w.x, minY: w.y, maxX: w.x + w.w, maxY: w.y + A };
      const z = w.x + w.w / 2, Y = w.y + A / 2, T = w.rotation * Math.PI / 180, B = Math.cos(T), D = Math.sin(T), L = [
        [w.w / 2, A / 2],
        [-w.w / 2, A / 2],
        [-w.w / 2, -A / 2],
        [w.w / 2, -A / 2]
      ];
      let F = 1 / 0, K = 1 / 0, W = -1 / 0, q = -1 / 0;
      for (const [Z, $] of L) {
        const dt = z + Z * B - $ * D, ft = Y + Z * D + $ * B;
        F = Math.min(F, dt), K = Math.min(K, ft), W = Math.max(W, dt), q = Math.max(q, ft);
      }
      return { minX: F, minY: K, maxX: W, maxY: q };
    },
    []
  ), ne = 8, Ie = it(
    (w, A) => A.filter((z) => {
      if (z.type === "edge") {
        const B = z.data, D = t.getNode(B.fromId), L = t.getNode(B.toId);
        if (!D || !L) return !1;
        const { x1: F, y1: K, x2: W, y2: q } = Hs(D, L, rt);
        return F >= w.x && F <= w.x + w.w && K >= w.y && K <= w.y + w.h && W >= w.x && W <= w.x + w.w && q >= w.y && q <= w.y + w.h;
      }
      const Y = z.h === "auto" ? rt[z.id] ?? 100 : z.h, T = $t(z, Y);
      return T.minX >= w.x && T.maxX <= w.x + w.w && T.minY >= w.y && T.maxY <= w.y + w.h;
    }),
    [$t, rt]
  ), we = it(
    (w, A) => w.length < 3 ? [] : A.filter((z) => {
      if (z.type === "edge") {
        const D = z, L = t.getNode(D.data.fromId), F = t.getNode(D.data.toId);
        if (!L || !F) return !1;
        const { x1: K, y1: W, x2: q, y2: Z } = Hs(L, F, rt);
        return kr(K, W, w) && kr(q, Z, w);
      }
      const Y = z.h === "auto" ? rt[z.id] ?? 100 : z.h, T = z.x + z.w / 2, B = z.y + Y / 2;
      return kr(T, B, w);
    }),
    [t, rt]
  ), se = Kt(() => {
    if (d.size < 2) return null;
    let w = 1 / 0, A = 1 / 0, z = -1 / 0, Y = -1 / 0;
    for (const T of d) {
      const B = h.find((F) => F.id === T);
      if (!B || B.type === "edge") continue;
      const D = B.h === "auto" ? rt[B.id] ?? 100 : B.h, L = $t(B, D);
      w = Math.min(w, L.minX), A = Math.min(A, L.minY), z = Math.max(z, L.maxX), Y = Math.max(Y, L.maxY);
    }
    return w === 1 / 0 ? null : {
      x: w - ne,
      y: A - ne,
      w: z - w + ne * 2,
      h: Y - A + ne * 2
    };
  }, [d, h, rt, $t]), Fe = Kt(() => {
    if (!m) return null;
    const w = t.getAllGroupDescendantNodes(m);
    if (w.length === 0) return null;
    let A = 1 / 0, z = 1 / 0, Y = -1 / 0, T = -1 / 0;
    for (const D of w) {
      if (D.type === "edge") continue;
      const L = D.h === "auto" ? rt[D.id] ?? 100 : D.h, F = $t(D, L);
      A = Math.min(A, F.minX), z = Math.min(z, F.minY), Y = Math.max(Y, F.maxX), T = Math.max(T, F.maxY);
    }
    if (A === 1 / 0) return null;
    const B = 8;
    return { x: A - B, y: z - B, w: Y - A + B * 2, h: T - z + B * 2 };
  }, [m, h, rt, $t, t]), Nt = Kt(() => {
    const w = performance.now();
    if (h.filter(
      (st) => {
        if (o) {
          const xt = o.get(st.type);
          return xt && !xt.isSVGOnly;
        }
        return st.type === "content" || st.type === "draw" || st.type === "shape" || st.type === "image" || st.type === "text" || st.type === "frame" || st.type === "sticky";
      }
    ), i.w <= 0 || i.h <= 0)
      return null;
    const { zoom: A, x: z, y: Y } = a, B = Math.min(500, 280 / Math.max(A, 0.1)), D = {
      x: -z / A - B,
      y: -Y / A - B,
      w: i.w / A + B * 2,
      h: i.h / A + B * 2
    }, L = t.getNodesInRect(D), F = /* @__PURE__ */ new Map(), K = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set();
    let Z = 0, $ = 0, dt = 0, ft = 0, It = 0;
    const Ct = (st, xt = !1) => {
      const gt = t.getNode(st);
      if (!gt) return;
      const Bt = F.has(gt.id);
      F.set(gt.id, gt), gt.type === "edge" ? q.add(gt.id) : (Bt || K.add(gt.id), xt && W.add(gt.id));
    };
    for (const st of L) {
      const xt = W.size;
      Ct(st.id, !0), W.size > xt && (Z += 1);
    }
    for (const st of d)
      Ct(st, !0);
    const vt = pt ? { x: pt.cursorX, y: pt.cursorY } : ot ? { x: ot.cursorX, y: ot.cursorY } : null;
    if (vt) {
      const st = 200 / Math.max(0.2, a.zoom), xt = t.getNodesInRect({
        x: vt.x - st,
        y: vt.y - st,
        w: st * 2,
        h: st * 2
      });
      for (const gt of xt)
        gt.type !== "edge" && Ct(gt.id, !0);
    }
    const At = Array.from(W);
    for (const st of At) {
      const xt = t.getEdgesForNode(st);
      for (const gt of xt) {
        const Bt = gt.data, zt = q.has(gt.id);
        F.set(gt.id, gt), q.add(gt.id), zt || (ft += 1);
        const wt = K.size;
        Ct(Bt.fromId, !1), K.size > wt && ($ += 1);
        const Ft = K.size;
        Ct(Bt.toId, !1), K.size > Ft && ($ += 1);
      }
    }
    for (const st of h) {
      if (st.type !== "edge" || q.has(st.id)) continue;
      const xt = st.data, gt = t.getNode(xt.fromId), Bt = t.getNode(xt.toId);
      if (!gt || !Bt) continue;
      let zt = W.has(xt.fromId) || W.has(xt.toId);
      if (!zt) {
        const wt = Ye(
          gt,
          Bt,
          xt.edgeType || "bezier",
          rt,
          xt.sourceHandle,
          xt.targetHandle,
          xt.midpointOffset,
          xt.curveOffset
        );
        zt = wt.bounds.x < D.x + D.w && wt.bounds.x + wt.bounds.w > D.x && wt.bounds.y < D.y + D.h && wt.bounds.y + wt.bounds.h > D.y;
      }
      if (zt) {
        F.set(st.id, st), q.add(st.id), It += 1;
        const wt = K.size;
        Ct(gt.id, !1), K.size > wt && (dt += 1);
        const Ft = K.size;
        Ct(Bt.id, !1), K.size > Ft && (dt += 1);
      }
    }
    const Ht = Array.from(F.values());
    return {
      domNodes: Ht.filter((st) => {
        if (st.type === "edge" || !W.has(st.id)) return !1;
        if (o) {
          const xt = o.get(st.type);
          return !!xt && !xt.isSVGOnly;
        }
        return st.type === "content" || st.type === "draw" || st.type === "shape" || st.type === "image" || st.type === "text" || st.type === "frame" || st.type === "sticky";
      }),
      svgNodes: Ht,
      visibleNodeCount: W.size,
      visibleEdgeCount: q.size,
      seedVisibleNodes: Z,
      nodesAddedByAdjacency: $,
      nodesAddedByEdgeEndpoints: dt,
      edgesAddedByAdjacency: ft,
      edgesAddedByCrossing: It,
      cullingMs: performance.now() - w
    };
  }, [a, i, h, d, t, o, rt, ot, pt]), Ne = (Nt == null ? void 0 : Nt.domNodes) ?? h.filter((w) => {
    if (o) {
      const A = o.get(w.type);
      return !!A && !A.isSVGOnly;
    }
    return w.type === "content" || w.type === "draw" || w.type === "shape" || w.type === "image" || w.type === "text" || w.type === "frame" || w.type === "sticky";
  }), Ve = h;
  bt(() => {
    if (!he.isEnabled()) return;
    const w = h.reduce((z, Y) => z + (Y.type === "edge" ? 1 : 0), 0), A = h.length - w;
    he.recordCulling((Nt == null ? void 0 : Nt.cullingMs) ?? 0), he.setVisibilityCounts({
      visibleNodes: (Nt == null ? void 0 : Nt.visibleNodeCount) ?? A,
      totalNodes: A,
      // SVG layer currently renders all edges for correctness.
      visibleEdges: w,
      totalEdges: w,
      virtualizationActive: !!Nt,
      seedVisibleNodes: (Nt == null ? void 0 : Nt.seedVisibleNodes) ?? A,
      nodesAddedByAdjacency: (Nt == null ? void 0 : Nt.nodesAddedByAdjacency) ?? 0,
      nodesAddedByEdgeEndpoints: (Nt == null ? void 0 : Nt.nodesAddedByEdgeEndpoints) ?? 0,
      edgesAddedByAdjacency: (Nt == null ? void 0 : Nt.edgesAddedByAdjacency) ?? 0,
      edgesAddedByCrossing: (Nt == null ? void 0 : Nt.edgesAddedByCrossing) ?? 0
    });
  }, [h, Nt]);
  const Co = lt(0);
  bt(() => {
    if (!he.isEnabled() || !Nt) return;
    const w = performance.now();
    if (w - Co.current < 1e3) return;
    Co.current = w;
    const A = h.reduce((Y, T) => Y + (T.type === "edge" ? 1 : 0), 0), z = h.length - A;
    console.debug("[SpatialBoard.Virtualization]", {
      visibleNodes: Nt.visibleNodeCount,
      totalNodes: z,
      visibleEdges: Nt.visibleEdgeCount,
      totalEdges: A,
      seedVisibleNodes: Nt.seedVisibleNodes,
      nodesAddedByAdjacency: Nt.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: Nt.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: Nt.edgesAddedByAdjacency,
      edgesAddedByCrossing: Nt.edgesAddedByCrossing,
      cullingMs: Nt.cullingMs
    });
  }, [h, Nt, a]), bt(() => {
    let w = null;
    const A = () => {
      w === null && (w = requestAnimationFrame(() => {
        w = null, p([...t.getAllNodes()]);
      }));
    };
    let z = null;
    const Y = () => {
      z === null && (z = requestAnimationFrame(() => {
        z = null, c({ ...t.viewport });
      }));
    }, T = () => {
      f((q) => {
        const Z = new Set(t.selection);
        return q.size !== Z.size || [...q].some(($) => !Z.has($)) ? (ho(($) => $ && !Z.has($) ? null : $), Io(($) => $ && !Z.has($) ? null : $), uo(($) => $ && !Z.has($) ? null : $), To(($) => $ && !Z.has($) ? null : $), Po(($) => $ && !Z.has($) ? null : $), Qt(null), Z) : q;
      });
    }, B = () => {
      y(t.mode), t.mode === "text" && (tn.current = !1);
    }, D = () => ct(t.boardBackground), L = () => {
      j([...t.alignGuides]), S(t.snapToGrid), I(t.gridSize), C(t.smartGuides);
    };
    t.on("change", A), t.on("viewport", Y), t.on("selection", T), t.on("mode", B), t.on("background", D), t.on("guides", L);
    const F = (q) => b(q), K = () => b(null), W = () => {
      const q = r.current;
      q && (q.style.cursor = t.lassoSelect ? Do : Pn(t.mode));
    };
    return t.on("group:enter", F), t.on("group:exit", K), t.on("lassoToggle", W), () => {
      w !== null && cancelAnimationFrame(w), z !== null && cancelAnimationFrame(z), t.off("change", A), t.off("viewport", Y), t.off("selection", T), t.off("mode", B), t.off("background", D), t.off("guides", L), t.off("group:enter", F), t.off("group:exit", K), t.off("lassoToggle", W);
    };
  }, [t]), bt(() => {
    const w = r.current;
    if (!w) return;
    const A = (z) => {
      if (!z.ctrlKey && !z.metaKey) {
        const T = z.target.closest(".sb-editor-wrap");
        if (T && T.scrollHeight > T.clientHeight) {
          const B = T.scrollTop <= 0 && z.deltaY < 0, D = T.scrollTop + T.clientHeight >= T.scrollHeight && z.deltaY > 0;
          if (!B && !D) return;
        }
      }
      z.preventDefault(), z.ctrlKey || z.metaKey ? t.zoomByWheel(z.deltaY, z.clientX, z.clientY) : t.pan(-z.deltaX, -z.deltaY);
    };
    return w.addEventListener("wheel", A, { passive: !1 }), () => w.removeEventListener("wheel", A);
  }, [t]);
  const [He, Te] = tt(null), [Oe, Xe] = tt(null), [Pe, v] = tt(null), [at, Qt] = tt(null), ie = lt({
    x: 0,
    y: 0,
    index: -1
  }), [ae, me] = tt(null), [Jo, Ke] = tt(null), co = lt(null), $n = Kt(() => {
    const w = /* @__PURE__ */ new Set();
    for (const A of h) {
      if (A.type !== "edge") continue;
      const z = A;
      z.data.animated && z.data.animatedDirection === "bop" && (w.add(z.data.fromId), w.add(z.data.toId));
    }
    return w;
  }, [h]), [zo, ho] = tt(null), _n = lt(null), [Ss, Io] = tt(null), [Ms, uo] = tt(null), [$o, To] = tt(null), [Cs, Po] = tt(null), [Xa, zs] = tt(null);
  bt(() => {
    const w = (A) => {
      ml(() => Po(A));
    };
    return t.on("image:cropRequest", w), () => t.off("image:cropRequest", w);
  }, [t]);
  const Is = zo || Ms || Ss || $o || Cs || Xa, tr = lt(null), Ts = lt(null), [er, or] = tt(/* @__PURE__ */ new Set()), po = lt(/* @__PURE__ */ new Set()), [Ps, _o] = tt([]), [mn, nr] = tt(null), Ae = lt([]), qe = lt(null), [As, bn] = tt([]), ue = lt([]), Ao = lt(null), tn = lt(!1), Es = it(
    (w, A, z, Y = "auto") => {
      const T = kt(10);
      Ts.current = T, t.addNode({
        id: T,
        type: "content",
        x: w,
        y: A,
        w: z,
        h: Y,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), xn = it(
    (w, A, z) => {
      const { x: Y, y: T } = t.screenToCanvas(w, A);
      if (z) {
        const K = t.hitTestAll(Y, T, rt);
        if (K.length > 0) {
          const W = ie.current, q = Math.abs(Y - W.x) + Math.abs(T - W.y);
          let Z = 0;
          q < 5 && (Z = (W.index + 1) % K.length), ie.current = { x: Y, y: T, index: Z }, t.select(K[Z].id);
        } else
          t.deselectAll();
      } else {
        let K = !1;
        for (const W of t.selection) {
          const q = t.getNode(W);
          if (!q) continue;
          const Z = q.h === "auto" ? 100 : q.h;
          if (Y >= q.x && Y <= q.x + q.w && T >= q.y && T <= q.y + Z) {
            K = !0;
            break;
          }
        }
        if (!K && t.selection.size >= 2) {
          let W = 1 / 0, q = 1 / 0, Z = -1 / 0, $ = -1 / 0;
          for (const dt of t.selection) {
            const ft = t.getNode(dt);
            if (!ft || ft.type === "edge") continue;
            const It = ft.h === "auto" ? 100 : ft.h;
            W = Math.min(W, ft.x), q = Math.min(q, ft.y), Z = Math.max(Z, ft.x + ft.w), $ = Math.max($, ft.y + It);
          }
          W !== 1 / 0 && Y >= W && Y <= Z && T >= q && T <= $ && (K = !0);
        }
        if (!K) {
          const W = t.hitTest(Y, T, rt);
          W ? t.select(W.id) : t.deselectAll();
        }
      }
      const B = Array.from(t.selection), D = B.length > 0, L = [];
      if (L.push({
        items: [
          {
            label: "Cut",
            shortcut: "Mod+X",
            disabled: !D,
            action: () => {
              t.cutSelected(), xi(t);
            }
          },
          {
            label: "Copy",
            shortcut: "Mod+C",
            disabled: !D,
            action: () => {
              t.copySelected(), xi(t);
            }
          },
          {
            label: "Paste",
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              au(t, Y, T);
            }
          }
        ]
      }), L.push({
        items: [
          {
            label: "Duplicate",
            shortcut: "Mod+D",
            disabled: !D,
            action: () => t.duplicateSelected()
          }
        ]
      }), D && L.push({
        items: [
          {
            label: "Add to Personal Library",
            action: () => {
              const K = B.map((Z) => t.getNode(Z)).filter((Z) => !!Z).map((Z) => structuredClone(Z)), W = new Set(
                K.map((Z) => Z.groupId).filter(Boolean)
              ), q = /* @__PURE__ */ new Map();
              for (const [Z, $] of t.groupParent)
                W.has(Z) && q.set(Z, $);
              nr({
                nodes: K,
                groupParent: q
              });
            }
          }
        ]
      }), B.length >= 2 || D && t.selectionHasGroup()) {
        const K = [];
        B.length >= 2 && K.push({
          label: "Group selection",
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && K.push({
          label: "Ungroup selection",
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), L.push({ items: K });
      }
      if (D && B.every((W) => {
        const q = t.getNode(W);
        return q && (q.type === "draw" || q.type === "shape");
      }) && L.push({
        items: [
          {
            label: "Flip horizontal",
            shortcut: "Shift+H",
            action: () => t.flipSelectedHorizontal()
          },
          {
            label: "Flip vertical",
            shortcut: "Shift+V",
            action: () => t.flipSelectedVertical()
          }
        ]
      }), D && L.push({
        items: [
          {
            label: "Bring forward",
            shortcut: "Mod+]",
            action: () => t.bringForward(B)
          },
          {
            label: "Send backward",
            shortcut: "Mod+[",
            action: () => t.sendBackward(B)
          },
          {
            label: "Bring to front",
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(B)
          },
          {
            label: "Send to back",
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(B)
          }
        ]
      }), D) {
        const K = B.some((Z) => {
          var $;
          return ($ = t.getNode(Z)) == null ? void 0 : $.locked;
        }), W = B.some((Z) => {
          var $;
          return !(($ = t.getNode(Z)) != null && $.locked);
        }), q = [];
        W && q.push({
          label: "Lock",
          action: () => {
            for (const Z of B) t.updateNode(Z, { locked: !0 });
          }
        }), K && q.push({
          label: "Unlock",
          action: () => {
            for (const Z of B) t.updateNode(Z, { locked: void 0 });
          }
        }), L.push({ items: q });
      }
      D && L.push({
        items: [
          {
            label: "Delete",
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const F = [10, 20, 40, 80];
      return L.push({
        items: [
          {
            label: "Toggle Grid",
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), S(t.snapToGrid);
            }
          },
          {
            label: "Smart Guides",
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), C(t.smartGuides);
            }
          },
          ...F.map((K) => ({
            label: `${K}px`,
            checked: t.gridSize === K,
            action: () => {
              t.setGridSize(K);
            }
          }))
        ]
      }), L.push({
        items: [
          {
            label: "Export as PNG",
            action: () => fi(t, { format: "png" })
          },
          {
            label: "Export as SVG",
            action: () => fi(t, { format: "svg" })
          }
        ]
      }), L;
    },
    [t]
  ), Ya = it(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const A = xn(w.clientX, w.clientY, w.altKey);
      v({ x: w.clientX, y: w.clientY, sections: A });
    },
    [t, xn]
  ), en = it(
    (w, A, z) => {
      const Y = kt(10);
      t.addNode({
        id: Y,
        type: "text",
        x: w,
        y: A,
        w: z,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? oo,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(Y), tr.current = Y, ho(Y);
    },
    [t]
  ), Ga = it(
    (w) => {
      if (t.presentationMode) return;
      if (t.mode === "text" && tn.current) {
        tn.current = !1, r.current && (r.current.style.cursor = "text"), t.deselectAll();
        const { x: B, y: D } = t.screenToCanvas(w.clientX, w.clientY);
        en(B, D, 300);
        return;
      }
      if (t.mode !== "select") return;
      const { x: A, y: z } = t.screenToCanvas(w.clientX, w.clientY), Y = t.hitTestAll(A, z, rt), T = Y.find((B) => !t.isContainerType(B.type)) ?? Y[0] ?? null;
      if (T != null && T.groupId) {
        const B = [];
        let D = T.groupId;
        for (; D; )
          B.push(D), D = t.groupParent.get(D);
        if (!t.activeGroupId) {
          t.enterGroup(B[B.length - 1]), t.select(T.id);
          return;
        }
        const L = B.indexOf(t.activeGroupId);
        if (L > 0) {
          t.enterGroup(B[L - 1]), t.select(T.id);
          return;
        }
      }
      if (T && T.type === "text") {
        t.select(T.id), _n.current = { clientX: w.clientX, clientY: w.clientY }, ho(T.id);
        return;
      }
      if (T && T.type === "sticky") {
        t.select(T.id), uo(T.id);
        return;
      }
      if (T && T.type === "frame") {
        t.select(T.id), Io(T.id);
        return;
      }
      if (T && T.type === "shape") {
        const B = T.data, D = B.shape === "line" || B.shape === "arrow";
        t.select(T.id), D || To(T.id);
        return;
      }
      if (T && T.type === "draw") {
        t.select(T.id);
        return;
      }
      if (!T || T.type === "draw") {
        const D = t.getAllNodes().filter((L) => L.type === "shape").sort((L, F) => F.z - L.z).find((L) => !(L.data.shape === "line" || L.data.shape === "arrow") && Vn(L, A, z, t.viewport.zoom, !0));
        if (D) {
          t.select(D.id), To(D.id);
          return;
        }
      }
      T || (t.deselectAll(), en(A, z, 300));
    },
    [t, rt, en]
  ), ja = it(
    (w) => {
      if (Q.current.set(w.pointerId, { x: w.clientX, y: w.clientY }), w.pointerType === "pen" && (E.current = !0), w.button !== 2 && N(!0), w.pointerType === "touch" && (Q.current.size >= 2 || E.current)) {
        J.current = !0, G.current && (clearTimeout(G.current), G.current = null, X.current = null);
        const T = new Map(Q.current), B = [...Q.current.keys()].find((W) => W !== w.pointerId);
        B !== void 0 && s().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: B,
            bubbles: !0,
            clientX: w.clientX,
            clientY: w.clientY
          })
        );
        const D = [...T.values()];
        let L = wi(D[0], D[1] ?? D[0]);
        const F = (W) => {
          if (!T.has(W.pointerId)) return;
          T.set(W.pointerId, { x: W.clientX, y: W.clientY });
          const q = [...T.values()];
          if (q.length < 2) return;
          const Z = wi(q[0], q[1]);
          if (t.pan(Z.mx - L.mx, Z.my - L.my), L.dist > 1) {
            const $ = Math.min(Math.max(Z.dist / L.dist, 0.9), 1.1);
            t.zoomByFactor($, Z.mx, Z.my);
          }
          L = Z;
        }, K = (W) => {
          Q.current.delete(W.pointerId), T.delete(W.pointerId), W.pointerType === "pen" && (E.current = !1), T.size < 2 && !E.current && (J.current = !1, s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", K), s().removeEventListener("pointercancel", K));
        };
        s().addEventListener("pointermove", F), s().addEventListener("pointerup", K), s().addEventListener("pointercancel", K);
        return;
      }
      if (J.current || t.presentationMode && !(w.button === 1 || w.button === 0 && O.current))
        return;
      if (Pe && v(null), w.pointerType === "touch") {
        const T = w.clientX, B = w.clientY, D = w.pointerId;
        X.current = { clientX: T, clientY: B }, G.current = setTimeout(() => {
          if (G.current = null, !X.current || J.current) return;
          const L = xn(T, B, !1);
          v({ x: T, y: B, sections: L }), s().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: D,
              bubbles: !0,
              clientX: T,
              clientY: B
            })
          ), X.current = null;
        }, 500);
      }
      if (w.button === 1 || w.button === 0 && O.current) {
        w.preventDefault(), nt.current = !0;
        const T = t.viewport.x, B = t.viewport.y, D = w.clientX, L = w.clientY, F = r.current;
        F && (F.style.cursor = "grabbing");
        const K = (q) => {
          t.viewport.x = T + (q.clientX - D), t.viewport.y = B + (q.clientY - L), c({ ...t.viewport });
        }, W = () => {
          nt.current = !1, F && (F.style.cursor = O.current ? "grab" : t.lassoSelect ? Do : ""), s().removeEventListener("pointermove", K), s().removeEventListener("pointerup", W);
        };
        s().addEventListener("pointermove", K), s().addEventListener("pointerup", W);
        return;
      }
      const { x: z, y: Y } = t.screenToCanvas(w.clientX, w.clientY);
      if (w.pointerType === "touch" && G.current && t.hitTest(z, Y, rt) && (clearTimeout(G.current), G.current = null, X.current = null), t.mode === "select") {
        if (w.button !== 0) return;
        if (w.altKey) {
          const D = t.hitTestAll(z, Y, rt);
          if (D.length > 0) {
            const L = ie.current, F = Math.abs(z - L.x) + Math.abs(Y - L.y);
            let K = 0;
            F < 5 && (K = (L.index + 1) % D.length), ie.current = { x: z, y: Y, index: K }, t.select(D[K].id);
          }
          return;
        }
        let T = !1;
        !t.lassoSelect && t.selection.size >= 2 && se && z >= se.x && z <= se.x + se.w && Y >= se.y && Y <= se.y + se.h && (T = !0);
        let B = null;
        if (!t.lassoSelect) {
          const D = t.hitTestAll(z, Y, rt);
          B = D.find((L) => t.selection.has(L.id) && !t.isContainerType(L.type)) ?? D.find((L) => !t.isContainerType(L.type)) ?? D[0] ?? null, !B && !T && (B = pc(t.nodes, z, Y, t.viewport.zoom, rt, re));
        }
        if (B || T) {
          B && (t.activeGroupId && !t.isNodeInActiveGroup(B.id) && t.exitAllGroups(), w.shiftKey ? t.toggleSelect(B.id) : t.selection.has(B.id) || t.select(B.id));
          const D = Array.from(t.selection).filter(
            (zt) => {
              var wt;
              return !((wt = t.getNode(zt)) != null && wt.locked);
            }
          );
          if (D.length === 0) return;
          const L = w.clientX, F = w.clientY, K = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set();
          for (const zt of D) {
            const wt = t.getNode(zt);
            if (wt && t.isContainerType(wt.type)) {
              W.add(zt);
              for (const Ft of t.getFrameDescendantIds(zt))
                t.selection.has(Ft) || K.add(Ft);
            }
          }
          const q = [...D, ...K], Z = q.map((zt) => {
            const wt = t.getNode(zt);
            return { id: zt, x: wt.x, y: wt.y };
          }), $ = t.selectionGroupId(), dt = $ ? t.groupRotations.get($) : null, ft = dt == null ? void 0 : dt.cx, It = dt == null ? void 0 : dt.cy;
          Qt(null);
          let Ct = !1, vt = null, At = L, Ht = F, Gt = !1;
          const st = new Set(q), xt = () => {
            vt = null;
            const zt = (At - L) / t.viewport.zoom, wt = (Ht - F) / t.viewport.zoom, { finalDx: Ft, finalDy: qt } = t.computeDragSnap(
              Z,
              st,
              zt,
              wt,
              Gt
            ), te = Z.map((oe) => ({
              id: oe.id,
              patch: { x: oe.x + Ft, y: oe.y + qt }
            }));
            t.updateMany(te), dt && $ && t.groupRotations.set($, {
              angle: dt.angle,
              cx: ft + Ft,
              cy: It + qt
            });
          }, gt = (zt) => {
            const wt = (zt.clientX - L) / t.viewport.zoom, Ft = (zt.clientY - F) / t.viewport.zoom;
            if (!Ct)
              if (Math.abs(wt) > 2 || Math.abs(Ft) > 2)
                Ct = !0, t.pushHistorySnapshot();
              else
                return;
            At = zt.clientX, Ht = zt.clientY, Gt = zt.metaKey || zt.ctrlKey, vt === null && (vt = requestAnimationFrame(xt));
          }, Bt = () => {
            if (vt !== null && (cancelAnimationFrame(vt), xt()), t.clearAlignGuides(), s().removeEventListener("pointermove", gt), s().removeEventListener("pointerup", Bt), Ct) {
              const zt = D.filter(
                (wt) => !K.has(wt)
              );
              zt.length > 0 && t.updateFrameMembership(zt);
            }
          };
          s().addEventListener("pointermove", gt), s().addEventListener("pointerup", Bt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          w.shiftKey || t.deselectAll();
          const D = new Set(t.selection);
          if (t.lassoSelect) {
            const L = [[z, Y]];
            Xe([...L]);
            let F = null, K = 0;
            const W = ($ = !1) => {
              F = null;
              const dt = $ || K % 2 === 0;
              if (K++, dt && L.length >= 3) {
                const It = we(L, t.getAllNodes()).map((vt) => vt.id), Ct = w.shiftKey ? [.../* @__PURE__ */ new Set([...D, ...It])] : It;
                (Ct.length !== t.selection.size || Ct.some((vt) => !t.selection.has(vt))) && t.selectMultiple(Ct);
              }
              Xe([...L]);
            }, q = ($) => {
              const { x: dt, y: ft } = t.screenToCanvas($.clientX, $.clientY);
              L.push([dt, ft]), F === null && (F = requestAnimationFrame(() => W(!1)));
            }, Z = () => {
              F !== null && cancelAnimationFrame(F), W(!0), s().removeEventListener("pointermove", q), s().removeEventListener("pointerup", Z), Xe(null), t.toggleLassoSelect();
            };
            s().addEventListener("pointermove", q), s().addEventListener("pointerup", Z);
          } else {
            const L = { startX: z, startY: Y, endX: z, endY: Y };
            Te(L);
            let F = null, K = 0;
            const W = ($ = !1, dt = !1) => {
              F = null;
              const ft = Math.min(L.startX, L.endX), It = Math.min(L.startY, L.endY), Ct = Math.abs(L.endX - L.startX), vt = Math.abs(L.endY - L.startY), At = dt || $ || K % 2 === 0;
              if (K++, At) {
                const Gt = Ie(
                  { x: ft, y: It, w: Ct, h: vt },
                  t.getAllNodes()
                ).map((xt) => xt.id), st = w.shiftKey ? [.../* @__PURE__ */ new Set([...D, ...Gt])] : Gt;
                (st.length !== t.selection.size || st.some((xt) => !t.selection.has(xt))) && t.selectMultiple(st);
              }
              Te({ ...L });
            }, q = ($) => {
              const { x: dt, y: ft } = t.screenToCanvas($.clientX, $.clientY);
              L.endX = dt, L.endY = ft, F === null && (F = requestAnimationFrame(() => W(!1)));
            }, Z = () => {
              F !== null && cancelAnimationFrame(F), W(!0), s().removeEventListener("pointermove", q), s().removeEventListener("pointerup", Z), Te(null);
            };
            s().addEventListener("pointermove", q), s().addEventListener("pointerup", Z);
          }
        }
      } else if (t.mode === "text") {
        if (tn.current) return;
        t.deselectAll();
        const T = z, B = Y, D = {
          startX: z,
          startY: Y,
          endX: z,
          endY: Y
        };
        let L = !1;
        me(D);
        const F = (W) => {
          const { x: q, y: Z } = t.screenToCanvas(W.clientX, W.clientY);
          D.endX = q, D.endY = Z;
          const $ = Math.abs(D.endX - D.startX), dt = Math.abs(D.endY - D.startY);
          ($ > 10 || dt > 10) && (L = !0), me({ ...D });
        }, K = () => {
          s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", K), me(null);
          const W = L ? Math.max(Math.abs(D.endX - D.startX), 60) : 300, q = L ? Math.min(D.startX, D.endX) : T, Z = L ? Math.min(D.startY, D.endY) : B;
          en(q, Z, W), tn.current = !0, r.current && (r.current.style.cursor = "crosshair");
        };
        s().addEventListener("pointermove", F), s().addEventListener("pointerup", K);
      } else if (t.mode === "note") {
        t.deselectAll();
        const T = z, B = Y, D = {
          startX: z,
          startY: Y,
          endX: z,
          endY: Y
        };
        let L = !1;
        me(D);
        const F = (W) => {
          const { x: q, y: Z } = t.screenToCanvas(W.clientX, W.clientY);
          D.endX = q, D.endY = Z;
          const $ = Math.abs(D.endX - D.startX), dt = Math.abs(D.endY - D.startY);
          ($ > 10 || dt > 10) && (L = !0), me({ ...D });
        }, K = () => {
          s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", K), me(null);
          const W = L ? Math.max(Math.abs(D.endX - D.startX), 100) : 300, q = L ? Math.max(Math.abs(D.endY - D.startY), 40) : "auto", Z = L ? Math.min(D.startX, D.endX) : T, $ = L ? Math.min(D.startY, D.endY) : B;
          Es(Z, $, W, q), t.setMode("select");
        };
        s().addEventListener("pointermove", F), s().addEventListener("pointerup", K);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const T = z, B = Y, D = {
          startX: z,
          startY: Y,
          endX: z,
          endY: Y
        };
        let L = !1;
        me(D);
        const F = (W) => {
          const { x: q, y: Z } = t.screenToCanvas(W.clientX, W.clientY);
          D.endX = q, D.endY = Z, Math.abs(D.endX - D.startX) > 10 && (L = !0), me({ ...D });
        }, K = () => {
          s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", K), me(null);
          const W = L ? Math.max(Math.abs(D.endX - D.startX), 100) : 200, q = L ? Math.min(D.startX, D.endX) : T, Z = L ? Math.min(D.startY, D.endY) : B, $ = kt(10), dt = L ? Math.max(Math.abs(D.endY - D.startY), 100) : 150;
          t.addNode({
            id: $,
            type: "sticky",
            x: q,
            y: Z,
            w: W,
            h: dt,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select($), uo($), t.setMode("select");
        };
        s().addEventListener("pointermove", F), s().addEventListener("pointerup", K);
      } else if (t.mode === "draw") {
        const T = w.pressure || 0.5, B = {
          points: [[z, Y, T]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle
        };
        H(B), t.notifyDrawProgress(B);
        const D = (F) => {
          const { x: K, y: W } = t.screenToCanvas(F.clientX, F.clientY), q = F.pressure || 0.5;
          B.points.push([K, W, q]), H({ ...B, points: [...B.points] }), t.notifyDrawProgress({ ...B, points: [...B.points] });
        }, L = () => {
          if (s().removeEventListener("pointermove", D), s().removeEventListener("pointerup", L), t.notifyDrawEnd(), B.points.length < 2) {
            H(null);
            return;
          }
          let F = 1 / 0, K = 1 / 0, W = -1 / 0, q = -1 / 0;
          for (const [$, dt] of B.points)
            $ < F && (F = $), dt < K && (K = dt), $ > W && (W = $), dt > q && (q = dt);
          const Z = B.points.map(
            ([$, dt, ft]) => [$ - F, dt - K, ft]
          );
          t.addNode({
            id: kt(10),
            type: "draw",
            x: F,
            y: K,
            w: W - F,
            h: q - K,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: Z,
              color: B.color,
              strokeWidth: B.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => H(null));
        };
        s().addEventListener("pointermove", D), s().addEventListener("pointerup", L);
      } else if (t.mode === "shape") {
        const T = {
          startX: z,
          startY: Y,
          endX: z,
          endY: Y
        };
        et(T);
        const B = {
          shapeType: t.activeTool.shapeType || "rect",
          stroke: t.activeTool.color,
          strokeWidth: t.activeTool.width
        }, D = (F) => {
          const { x: K, y: W } = t.screenToCanvas(F.clientX, F.clientY);
          T.endX = K, T.endY = W, et({ ...T }), t.notifyShapeProgress({ ...T, ...B });
        }, L = () => {
          s().removeEventListener("pointermove", D), s().removeEventListener("pointerup", L), t.notifyShapeEnd();
          const F = t.activeTool.shapeType || "rect", K = F === "line" || F === "arrow", W = Math.min(T.startX, T.endX);
          let q = Math.min(T.startY, T.endY);
          const Z = Math.abs(T.endX - T.startX), $ = Math.abs(T.endY - T.startY);
          let dt;
          if (K) {
            const Ct = t.activeTool.width * 2;
            dt = Math.max($, Ct), $ < Ct && (q -= (Ct - $) / 2);
          } else
            dt = $;
          if (Z < 5 && (K ? Z < 5 && Math.abs(T.endY - T.startY) < 5 : dt < 5)) {
            et(null);
            return;
          }
          const ft = {};
          K && (ft.startPoint = [
            T.startX - W,
            T.startY - q
          ], ft.endPoint = [
            T.endX - W,
            T.endY - q
          ]);
          const It = kt(10);
          t.addNode({
            id: It,
            type: "shape",
            x: W,
            y: q,
            w: Z,
            h: dt,
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
              ...ft
            }
          }), et(null), t.setMode("select"), t.select(It);
        };
        s().addEventListener("pointermove", D), s().addEventListener("pointerup", L);
      } else if (t.mode === "edge") {
        const T = t.hitTest(z, Y, rt);
        if (!T || T.type === "edge") return;
        ut({ fromNode: T, cursorX: z, cursorY: Y });
        const B = (L) => {
          const { x: F, y: K } = t.screenToCanvas(L.clientX, L.clientY);
          ut(
            (W) => W ? { ...W, cursorX: F, cursorY: K } : null
          );
        }, D = (L) => {
          s().removeEventListener("pointermove", B), s().removeEventListener("pointerup", D), ut(null);
          const { x: F, y: K } = t.screenToCanvas(L.clientX, L.clientY);
          let W = t.hitTest(F, K, rt);
          if (!W || W.type === "edge" || t.isContainerType(W.type)) {
            const ft = 50 / t.viewport.zoom;
            let It = 1 / 0, Ct = !1, vt = null;
            for (const At of t.getAllNodes()) {
              if (At.type === "edge" || At.id === T.id) continue;
              const Ht = t.isContainerType(At.type), Gt = Go(At, rt);
              for (const st of Gt) {
                const xt = Math.hypot(st.x - F, st.y - K);
                xt >= ft || Ht && !Ct && vt || (!Ht && Ct || xt < It) && (It = xt, Ct = Ht, vt = At);
              }
            }
            vt && (W = vt);
          }
          if (!W || W.type === "edge" || W.id === T.id)
            return;
          const q = Sn(T, z, Y, rt), Z = Sn(W, F, K, rt);
          if (t.getAllNodes().some((ft) => ft.type !== "edge" ? !1 : vr(ft.data, {
            fromId: T.id,
            toId: W.id,
            sourceHandle: q,
            targetHandle: Z
          }))) return;
          const dt = {
            id: kt(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: T.id,
              toId: W.id,
              style: "solid",
              color: t.activeTool.color,
              strokeWidth: 2,
              arrowHead: "arrow",
              arrowTail: "none",
              edgeType: "bezier",
              sourceHandle: q,
              targetHandle: Z
            }
          };
          t.addNode(dt), t.select(dt.id);
        };
        s().addEventListener("pointermove", B), s().addEventListener("pointerup", D);
      } else if (t.mode === "frame") {
        const T = {
          startX: z,
          startY: Y,
          endX: z,
          endY: Y
        };
        et(T);
        const B = (L) => {
          const { x: F, y: K } = t.screenToCanvas(L.clientX, L.clientY);
          T.endX = F, T.endY = K, et({ ...T });
        }, D = () => {
          s().removeEventListener("pointermove", B), s().removeEventListener("pointerup", D);
          const L = Math.min(T.startX, T.endX), F = Math.min(T.startY, T.endY), K = Math.abs(T.endX - T.startX), W = Math.abs(T.endY - T.startY);
          if (K < 20 || W < 20) {
            et(null);
            return;
          }
          const q = kt(10);
          t.addNode({
            id: q,
            type: "frame",
            x: L,
            y: F,
            w: K,
            h: W,
            z: t.nextZ(),
            data: {
              label: "Frame",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(q), et(null), t.select(q), t.setMode("select");
        };
        s().addEventListener("pointermove", B), s().addEventListener("pointerup", D);
      } else if (t.mode === "erase") {
        if (w.button !== 0) return;
        const T = (ft, It) => {
          const Ct = t.hitTestAll(ft, It, rt), vt = uc(
            t.nodes,
            ft,
            It,
            t.viewport.zoom,
            rt,
            re
          );
          let At = !1;
          for (const Ht of [...Ct, ...vt])
            po.current.has(Ht.id) || (po.current.add(Ht.id), At = !0);
          At && or(new Set(po.current));
        }, B = 400;
        po.current = /* @__PURE__ */ new Set();
        const D = performance.now();
        Ae.current = [[z, Y, D]], _o([[z, Y, D]]), T(z, Y);
        let L = z, F = Y;
        const K = () => {
          const ft = performance.now(), It = Ae.current.length;
          Ae.current = Ae.current.filter(
            (Ct) => ft - Ct[2] < B
          ), Ae.current.length !== It && _o([...Ae.current]), qe.current = requestAnimationFrame(K);
        };
        qe.current = requestAnimationFrame(K);
        const W = (ft) => {
          const { x: It, y: Ct } = t.screenToCanvas(ft.clientX, ft.clientY);
          L = It, F = Ct;
          const vt = performance.now();
          Ae.current.push([L, F, vt]), _o([...Ae.current]), T(L, F);
        }, q = () => {
          qe.current !== null && (cancelAnimationFrame(qe.current), qe.current = null), po.current = /* @__PURE__ */ new Set(), or(/* @__PURE__ */ new Set()), Ae.current = [], _o([]);
        }, Z = () => {
          dt();
          const ft = Array.from(po.current);
          q(), ft.length > 0 && t.deleteNodes(ft);
        }, $ = (ft) => {
          ft.key === "Escape" && (dt(), q());
        }, dt = () => {
          s().removeEventListener("pointermove", W), s().removeEventListener("pointerup", Z), s().removeEventListener("keydown", $);
        };
        s().addEventListener("pointermove", W), s().addEventListener("pointerup", Z), s().addEventListener("keydown", $);
      } else if (t.mode === "laser") {
        if (w.button !== 0) return;
        const T = 1560;
        Ao.current !== null && (cancelAnimationFrame(Ao.current), Ao.current = null);
        const B = performance.now();
        ue.current.length > 0 && ue.current.push([NaN, NaN, B]), ue.current.push([z, Y, B]), bn([...ue.current]), t.notifyLaserProgress([[z, Y]]);
        let D = B;
        const L = () => {
          const W = performance.now(), q = ue.current.length;
          ue.current = ue.current.filter(
            (Z) => W - Z[2] < T
          ), (ue.current.length !== q || ue.current.length > 0) && bn([...ue.current]), W - D >= 60 && (D = W, ue.current.length > 0 && t.notifyLaserProgress(
            ue.current.map((Z) => [Z[0], Z[1]])
          )), ue.current.length > 0 ? Ao.current = requestAnimationFrame(L) : (Ao.current = null, bn([]), t.notifyLaserEnd());
        };
        Ao.current = requestAnimationFrame(L);
        const F = (W) => {
          const { x: q, y: Z } = t.screenToCanvas(W.clientX, W.clientY), $ = performance.now();
          ue.current.push([q, Z, $]), bn([...ue.current]), t.notifyLaserProgress(
            ue.current.map((dt) => [dt[0], dt[1]])
          );
        }, K = () => {
          s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", K);
        };
        s().addEventListener("pointermove", F), s().addEventListener("pointerup", K);
      } else if (t.mode === "hand") {
        if (w.button !== 0) return;
        w.preventDefault();
        const T = t.viewport.x, B = t.viewport.y, D = w.clientX, L = w.clientY, F = r.current;
        F && (F.style.cursor = "grabbing");
        const K = (q) => {
          t.viewport.x = T + (q.clientX - D), t.viewport.y = B + (q.clientY - L), c({ ...t.viewport });
        }, W = () => {
          F && (F.style.cursor = t.lassoSelect ? Do : Pn(t.mode)), s().removeEventListener("pointermove", K), s().removeEventListener("pointerup", W);
        };
        s().addEventListener("pointermove", K), s().addEventListener("pointerup", W);
      }
    },
    [
      t,
      Es,
      en,
      Pe,
      xn,
      se,
      rt,
      $t,
      Ie,
      N
    ]
  ), rr = it(
    (w, A, z) => {
      if (z.preventDefault(), t.presentationMode) return;
      const Y = t.getNode(w);
      if (!Y || Y.locked) return;
      const T = z.clientX, B = z.clientY, D = Y.x, L = Y.y, F = Y.w, K = Y.h === "auto", W = K ? rt[w] ?? 100 : Y.h, q = Y.type === "draw" ? Y.data.points.map(
        (Ct) => [...Ct]
      ) : null, Z = Y.type === "shape" ? Y.data.startPoint : void 0, $ = Y.type === "shape" ? Y.data.endPoint : void 0, dt = Y.type === "text" ? Y.data.fontSize : 0;
      t.pushHistorySnapshot();
      const ft = (Ct) => {
        const vt = (Ct.clientX - T) / t.viewport.zoom, At = (Ct.clientY - B) / t.viewport.zoom;
        let Ht = D, Gt = L, st = F, xt = W;
        if ((A === "nw" || A === "w" || A === "sw") && (Ht = D + vt, st = F - vt), (A === "ne" || A === "e" || A === "se") && (st = F + vt), (A === "nw" || A === "n" || A === "ne") && (Gt = L + At, xt = W - At), (A === "sw" || A === "s" || A === "se") && (xt = W + At), t.snapToGrid && !(Ct.metaKey || Ct.ctrlKey)) {
          const zt = t.gridSize, wt = (Ft) => Math.round(Ft / zt) * zt;
          (A === "nw" || A === "w" || A === "sw") && (Ht = wt(Ht), st = D + F - Ht), (A === "ne" || A === "e" || A === "se") && (st = wt(Ht + st) - Ht), (A === "nw" || A === "n" || A === "ne") && (Gt = wt(Gt), xt = L + W - Gt), (A === "sw" || A === "s" || A === "se") && (xt = wt(Gt + xt) - Gt);
        }
        const gt = 10;
        if (st < gt && (st = gt, (A === "nw" || A === "w" || A === "sw") && (Ht = D + F - gt)), xt < gt && (xt = gt, (A === "nw" || A === "n" || A === "ne") && (Gt = L + W - gt)), Y.type === "frame") {
          const zt = Y.data.devicePreset;
          if (zt) {
            const wt = Gr(zt);
            if (wt) {
              const Ft = Fa(wt);
              if (A === "nw" || A === "ne" || A === "sw" || A === "se" || (A === "e" || A === "w")) {
                const oe = Math.round(st / Ft);
                (A === "nw" || A === "ne") && (Gt = L + W - oe), xt = oe;
              } else
                st = Math.round(xt * Ft);
            }
          }
        }
        const Bt = {
          x: Ht,
          y: Gt,
          w: st,
          h: K ? "auto" : xt
        };
        if (q && Y.type === "draw") {
          const zt = F > 0 ? st / F : 1, wt = W > 0 ? xt / W : 1, Ft = q.map(
            ([qt, te, oe]) => [qt * zt, te * wt, oe]
          );
          Bt.data = { ...Y.data, points: Ft };
        }
        if (Y.type === "shape" && (Z || $)) {
          const zt = F > 0 ? st / F : 1, wt = W > 0 ? xt / W : 1, Ft = { ...Y.data };
          Z && (Ft.startPoint = [
            Z[0] * zt,
            Z[1] * wt
          ]), $ && (Ft.endPoint = [
            $[0] * zt,
            $[1] * wt
          ]), Bt.data = Ft;
        }
        if (Y.type === "text" && dt > 0 && A !== "e" && A !== "w") {
          const zt = A === "n" || A === "s" ? W > 0 ? xt / W : 1 : F > 0 ? st / F : 1, wt = Math.max(8, Math.round(dt * zt));
          Bt.data = { ...Y.data, fontSize: wt };
        }
        t.updateNode(w, Bt);
      }, It = () => {
        s().removeEventListener("pointermove", ft), s().removeEventListener("pointerup", It), t.isContainerType(Y.type) && t.syncFrameChildrenAfterResize(w);
      };
      s().addEventListener("pointermove", ft), s().addEventListener("pointerup", It);
    },
    [t, rt]
  ), Va = it(
    (w, A) => {
      A.stopPropagation(), A.preventDefault();
      const z = t.getNode(w);
      if (!z || z.locked) return;
      const Y = z.h === "auto" ? rt[w] ?? 100 : z.h, T = z.x + z.w / 2, B = z.y + Y / 2, D = z.rotation || 0, { x: L, y: F } = t.screenToCanvas(
        A.clientX,
        A.clientY
      ), K = Math.atan2(F - B, L - T);
      t.pushHistorySnapshot();
      const W = (Z) => {
        const { x: $, y: dt } = t.screenToCanvas(Z.clientX, Z.clientY), ft = Math.atan2(dt - B, $ - T);
        let It = D + (ft - K) * (180 / Math.PI);
        (Z.shiftKey || t.snapToGrid) && !(Z.metaKey || Z.ctrlKey) && (It = Math.round(It / 15) * 15), t.updateNode(w, { rotation: It });
      }, q = () => {
        s().removeEventListener("pointermove", W), s().removeEventListener("pointerup", q);
      };
      s().addEventListener("pointermove", W), s().addEventListener("pointerup", q);
    },
    [t, rt]
  ), Rs = it(
    (w, A, z) => {
      z.stopPropagation(), z.preventDefault();
      const Y = t.getNode(w);
      if (!Y) return;
      const { x: T, y: B } = t.screenToCanvas(z.clientX, z.clientY);
      ut({ fromNode: Y, cursorX: T, cursorY: B, sourceHandle: A });
      const D = (F) => {
        const { x: K, y: W } = t.screenToCanvas(F.clientX, F.clientY);
        ut(
          (q) => q ? { ...q, cursorX: K, cursorY: W } : null
        );
      }, L = (F) => {
        s().removeEventListener("pointermove", D), s().removeEventListener("pointerup", L), ut(null);
        const { x: K, y: W } = t.screenToCanvas(F.clientX, F.clientY);
        let q = t.hitTest(K, W, rt);
        if (!q || q.type === "edge" || t.isContainerType(q.type)) {
          const ft = 50 / t.viewport.zoom;
          let It = 1 / 0, Ct = !1, vt = null;
          for (const At of t.getAllNodes()) {
            if (At.type === "edge" || At.id === Y.id) continue;
            const Ht = t.isContainerType(At.type), Gt = Go(At, rt);
            for (const st of Gt) {
              const xt = Math.hypot(st.x - K, st.y - W);
              xt >= ft || Ht && !Ct && vt || (!Ht && Ct || xt < It) && (It = xt, Ct = Ht, vt = At);
            }
          }
          vt && (q = vt);
        }
        if (!q || q.type === "edge" || q.id === Y.id)
          return;
        const Z = Sn(q, K, W, rt);
        if (t.getAllNodes().some((ft) => ft.type !== "edge" ? !1 : vr(ft.data, {
          fromId: Y.id,
          toId: q.id,
          sourceHandle: A,
          targetHandle: Z
        }))) return;
        const dt = {
          id: kt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Y.id,
            toId: q.id,
            style: "solid",
            color: t.activeTool.color,
            strokeWidth: 2,
            arrowHead: "arrow",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: A,
            targetHandle: Z
          }
        };
        t.addNode(dt), t.select(dt.id);
      };
      s().addEventListener("pointermove", D), s().addEventListener("pointerup", L);
    },
    [t, rt]
  ), Ka = it(
    (w) => {
      let A = null, z = w === "top" || w === "left" ? 1 / 0 : -1 / 0;
      for (const Y of t.selection) {
        const T = t.getNode(Y);
        if (!T || T.type === "edge") continue;
        const B = T.h === "auto" ? rt[T.id] ?? 100 : T.h;
        let D;
        switch (w) {
          case "top":
            D = T.y;
            break;
          case "bottom":
            D = T.y + B;
            break;
          case "left":
            D = T.x;
            break;
          case "right":
            D = T.x + T.w;
            break;
        }
        (w === "top" || w === "left" ? D < z : D > z) && (z = D, A = Y);
      }
      return A;
    },
    [t, rt]
  ), qa = it(
    (w, A, z, Y) => {
      var Z;
      Y.stopPropagation(), Y.preventDefault();
      const T = t.getNode(w);
      if (!T || !o) return;
      const B = o.get(T.type), D = (Z = B == null ? void 0 : B.ports) == null ? void 0 : Z.find(($) => $.id === A);
      if (!D) return;
      const L = z === "input" ? "left" : "right", { x: F, y: K } = t.screenToCanvas(Y.clientX, Y.clientY);
      ut({
        fromNode: T,
        cursorX: F,
        cursorY: K,
        sourceHandle: L,
        sourcePort: A,
        sourceDirection: z
      });
      const W = ($) => {
        const { x: dt, y: ft } = t.screenToCanvas($.clientX, $.clientY);
        ut(
          (It) => It ? { ...It, cursorX: dt, cursorY: ft } : null
        );
      }, q = ($) => {
        var ke;
        s().removeEventListener("pointermove", W), s().removeEventListener("pointerup", q), ut(null);
        const { x: dt, y: ft } = t.screenToCanvas($.clientX, $.clientY), It = z === "output" ? "input" : "output", Ct = 40 / t.viewport.zoom;
        let vt = null, At = null, Ht = 1 / 0;
        for (const ee of t.getAllNodes()) {
          if (ee.type === "edge" || ee.id === T.id) continue;
          const le = o.get(ee.type);
          if (!((ke = le == null ? void 0 : le.ports) != null && ke.length)) continue;
          const Ee = ee.h === "auto" ? t.measuredHeights[ee.id] ?? 100 : ee.h;
          for (const ve of le.ports) {
            if (ve.direction !== It || D.dataType !== "any" && ve.dataType !== "any" && D.dataType !== ve.dataType) continue;
            const Eo = le.ports.filter((sl) => sl.direction === ve.direction), ir = Eo.indexOf(ve), wn = 14 / t.viewport.zoom, nl = ee.y + Ee / (Eo.length + 1) * (ir + 1), rl = ve.direction === "input" ? ee.x - wn : ee.x + ee.w + wn, ar = Math.hypot(rl - dt, nl - ft);
            ar < Ct && ar < Ht && (Ht = ar, vt = ee, At = ve);
          }
        }
        if (!vt || !At) return;
        const Gt = At.id, st = z === "output" ? vt.id : T.id, xt = z === "output" ? Gt : A;
        if (t.getAllNodes().some((ee) => {
          if (ee.type !== "edge") return !1;
          const le = ee.data;
          return le.toId === st && le.targetPort === xt;
        })) return;
        const Bt = z === "output" ? T.id : vt.id, zt = z === "output" ? vt.id : T.id, wt = z === "output" ? A : Gt, Ft = z === "output" ? Gt : A, oe = {
          id: kt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Bt,
            toId: zt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: wt,
            targetPort: Ft
          }
        };
        t.addNode(oe), t.select(oe.id);
      };
      s().addEventListener("pointermove", W), s().addEventListener("pointerup", q);
    },
    [t, o, rt]
  ), [Ls, Ua] = tt(0);
  bt(() => {
    if (n)
      return n.onChange(() => Ua((w) => w + 1));
  }, [n]);
  const Za = it(
    (w, A, z, Y, T) => {
      T.stopPropagation(), T.preventDefault();
      const B = t.getNode(w);
      if (!B || B.type !== "edge") return;
      t.pushHistorySnapshot();
      const D = (F) => {
        const K = t.screenToCanvas(F.clientX, F.clientY), W = t.getNode(w);
        if (!W) return;
        const q = t.getNode(W.data.fromId), Z = t.getNode(W.data.toId);
        if (!(!q || !Z))
          if (A === "xy") {
            const $ = Ye(
              q,
              Z,
              W.data.edgeType || "bezier",
              rt,
              W.data.sourceHandle,
              W.data.targetHandle,
              void 0,
              void 0
              // no offsets → natural midpoint
            );
            if (!$.kinkHandle) return;
            const dt = K.x - $.kinkHandle.x, ft = K.y - $.kinkHandle.y;
            t.updateNode(w, {
              data: { ...W.data, curveOffset: [dt, ft] }
            });
          } else {
            const $ = A === "x" ? K.x : K.y, dt = Ye(
              q,
              Z,
              W.data.edgeType || "bezier",
              rt,
              W.data.sourceHandle,
              W.data.targetHandle,
              0.5
              // default to get range
            );
            if (!dt.kinkHandle) return;
            const ft = dt.kinkHandle.min, It = dt.kinkHandle.max, Ct = It - ft;
            if (Ct === 0) return;
            const At = (Math.max(ft, Math.min(It, $)) - ft) / Ct;
            t.updateNode(w, {
              data: { ...W.data, midpointOffset: At }
            });
          }
      }, L = () => {
        s().removeEventListener("pointermove", D), s().removeEventListener("pointerup", L);
      };
      s().addEventListener("pointermove", D), s().addEventListener("pointerup", L);
    },
    [t, rt]
  ), Qa = it(
    (w, A, z) => {
      z.stopPropagation(), z.preventDefault();
      const Y = t.getNode(w);
      if (!Y || Y.type !== "edge") return;
      const { fromId: T, toId: B, sourceHandle: D, targetHandle: L } = Y.data, F = A === "source" ? B : T, K = A === "source" ? L : D, W = t.getNode(T), q = t.getNode(B);
      if (!W || !q) return;
      const Z = Ye(
        W,
        q,
        Y.data.edgeType || "bezier",
        rt,
        D,
        L
      ), $ = A === "source" ? { x: Z.x1, y: Z.y1 } : { x: Z.x2, y: Z.y2 };
      Tt({
        edgeId: w,
        endpoint: A,
        anchorNodeId: F,
        anchorHandle: K,
        cursorX: $.x,
        cursorY: $.y
      });
      const dt = (It) => {
        const { x: Ct, y: vt } = t.screenToCanvas(It.clientX, It.clientY);
        Tt(
          (At) => At ? { ...At, cursorX: Ct, cursorY: vt } : null
        );
      }, ft = (It) => {
        s().removeEventListener("pointermove", dt), s().removeEventListener("pointerup", ft), Tt(null);
        const { x: Ct, y: vt } = t.screenToCanvas(It.clientX, It.clientY);
        let At = t.hitTest(Ct, vt, rt);
        if (!At || At.type === "edge" || t.isContainerType(At.type)) {
          const wt = 50 / t.viewport.zoom;
          let Ft = 1 / 0, qt = !1, te = null;
          for (const oe of t.getAllNodes()) {
            if (oe.type === "edge") continue;
            const ke = t.isContainerType(oe.type), ee = Go(oe, rt);
            for (const le of ee) {
              const Ee = Math.hypot(le.x - Ct, le.y - vt);
              Ee >= wt || ke && !qt && te || (!ke && qt || Ee < Ft) && (Ft = Ee, qt = ke, te = oe);
            }
          }
          te && (At = te);
        }
        if (!At || At.type === "edge") return;
        const Ht = A === "source" ? At.id : T, Gt = A === "target" ? At.id : B;
        if (Ht === Gt) return;
        const st = A === "source" ? T : B;
        if (At.id === st) return;
        const xt = Sn(At, Ct, vt, rt), gt = A === "source" ? {
          fromId: Ht,
          toId: Gt,
          sourceHandle: xt,
          targetHandle: L,
          sourcePort: Y.data.sourcePort,
          targetPort: Y.data.targetPort
        } : {
          fromId: Ht,
          toId: Gt,
          sourceHandle: D,
          targetHandle: xt,
          sourcePort: Y.data.sourcePort,
          targetPort: Y.data.targetPort
        };
        if (t.getAllNodes().some((wt) => wt.type !== "edge" || wt.id === w ? !1 : vr(wt.data, gt))) return;
        const zt = A === "source" ? { fromId: At.id, sourceHandle: xt } : { toId: At.id, targetHandle: xt };
        t.updateNodeWithHistory(w, { data: zt });
      };
      s().addEventListener("pointermove", dt), s().addEventListener("pointerup", ft);
    },
    [t, rt]
  ), Ja = it(
    (w) => {
      if (w.stopPropagation(), w.preventDefault(), t.presentationMode) return;
      const A = Array.from(t.selection).map((gt) => t.getNode(gt)).filter(Boolean);
      if (A.length < 2) return;
      const Y = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, T = Y ? t.groupRotations.get(Y) : null;
      let B, D;
      if (T)
        B = T.cx, D = T.cy;
      else {
        let gt = 1 / 0, Bt = 1 / 0, zt = -1 / 0, wt = -1 / 0;
        for (const Ft of A) {
          const qt = Ft.h === "auto" ? rt[Ft.id] ?? 100 : Ft.h, te = $t(Ft, qt);
          gt = Math.min(gt, te.minX), Bt = Math.min(Bt, te.minY), zt = Math.max(zt, te.maxX), wt = Math.max(wt, te.maxY);
        }
        B = (gt + zt) / 2, D = (Bt + wt) / 2;
      }
      const L = (T == null ? void 0 : T.angle) ?? 0, K = A.filter((gt) => !gt.locked).map((gt) => {
        const Bt = gt.h === "auto" ? rt[gt.id] ?? 100 : gt.h;
        return {
          id: gt.id,
          cx: gt.x + gt.w / 2,
          cy: gt.y + Bt / 2,
          w: gt.w,
          h: Bt,
          rotation: gt.rotation || 0
        };
      }), W = -L * Math.PI / 180, q = Math.cos(W), Z = Math.sin(W);
      let $ = 1 / 0, dt = 1 / 0, ft = -1 / 0, It = -1 / 0;
      for (const gt of K) {
        const Bt = gt.cx - B, zt = gt.cy - D, wt = B + Bt * q - zt * Z, Ft = D + Bt * Z + zt * q;
        $ = Math.min($, wt - gt.w / 2), dt = Math.min(dt, Ft - gt.h / 2), ft = Math.max(ft, wt + gt.w / 2), It = Math.max(It, Ft + gt.h / 2);
      }
      const Ct = {
        x: $ - ne,
        y: dt - ne,
        w: ft - $ + ne * 2,
        h: It - dt + ne * 2
      }, { x: vt, y: At } = t.screenToCanvas(w.clientX, w.clientY), Ht = Math.atan2(At - D, vt - B);
      t.pushHistorySnapshot();
      let Gt = L;
      const st = (gt) => {
        const { x: Bt, y: zt } = t.screenToCanvas(gt.clientX, gt.clientY);
        let Ft = (Math.atan2(zt - D, Bt - B) - Ht) * (180 / Math.PI);
        (gt.shiftKey || t.snapToGrid) && !(gt.metaKey || gt.ctrlKey) && (Ft = Math.round(Ft / 15) * 15), Gt = L + Ft, Qt({ angle: Gt, cx: B, cy: D, bounds: Ct });
        const qt = Ft * Math.PI / 180, te = Math.cos(qt), oe = Math.sin(qt), ke = K.map((ee) => {
          const le = ee.cx - B, Ee = ee.cy - D, ve = B + le * te - Ee * oe, Eo = D + le * oe + Ee * te;
          return {
            id: ee.id,
            patch: {
              x: ve - ee.w / 2,
              y: Eo - ee.h / 2,
              rotation: Gt
            }
          };
        });
        t.updateMany(ke);
      }, xt = () => {
        Y && t.groupRotations.set(Y, { angle: Gt, cx: B, cy: D }), Qt({ angle: Gt, cx: B, cy: D, bounds: Ct }), s().removeEventListener("pointermove", st), s().removeEventListener("pointerup", xt);
      };
      s().addEventListener("pointermove", st), s().addEventListener("pointerup", xt);
    },
    [t, rt, $t]
  ), $a = it(
    (w, A) => {
      if (A.stopPropagation(), A.preventDefault(), t.presentationMode) return;
      const z = Array.from(t.selection).map((st) => t.getNode(st)).filter(Boolean);
      if (z.length < 2) return;
      const Y = (st) => st.h === "auto" ? rt[st.id] ?? 100 : st.h;
      let T = 1 / 0, B = 1 / 0, D = -1 / 0, L = -1 / 0;
      for (const st of z) {
        const xt = Y(st), gt = $t(st, xt);
        T = Math.min(T, gt.minX), B = Math.min(B, gt.minY), D = Math.max(D, gt.maxX), L = Math.max(L, gt.maxY);
      }
      const F = { x: T, y: B, w: D - T, h: L - B }, K = F.w || 1, W = F.h || 1, Z = z.filter((st) => !st.locked).map((st) => {
        const xt = Y(st);
        return {
          id: st.id,
          type: st.type,
          isAutoH: st.h === "auto",
          relX: (st.x - F.x) / K,
          relY: (st.y - F.y) / W,
          relW: st.w / K,
          relH: xt / W,
          origW: st.w,
          origH: xt,
          origPoints: st.type === "draw" ? st.data.points.map((gt) => [...gt]) : null,
          drawData: st.type === "draw" ? { ...st.data } : null
        };
      }), $ = A.clientX, dt = A.clientY;
      t.pushHistorySnapshot();
      let ft = null, It = $, Ct = dt, vt = !1;
      const At = () => {
        ft = null;
        const st = (It - $) / t.viewport.zoom, xt = (Ct - dt) / t.viewport.zoom;
        let gt = F.x, Bt = F.y, zt = F.w, wt = F.h;
        if ((w === "nw" || w === "w" || w === "sw") && (gt = F.x + st, zt = F.w - st), (w === "ne" || w === "e" || w === "se") && (zt = F.w + st), (w === "nw" || w === "n" || w === "ne") && (Bt = F.y + xt, wt = F.h - xt), (w === "sw" || w === "s" || w === "se") && (wt = F.h + xt), t.snapToGrid && !vt) {
          const qt = t.gridSize, te = (oe) => Math.round(oe / qt) * qt;
          (w === "nw" || w === "w" || w === "sw") && (gt = te(gt), zt = F.x + F.w - gt), (w === "ne" || w === "e" || w === "se") && (zt = te(gt + zt) - gt), (w === "nw" || w === "n" || w === "ne") && (Bt = te(Bt), wt = F.y + F.h - Bt), (w === "sw" || w === "s" || w === "se") && (wt = te(Bt + wt) - Bt);
        }
        zt < 20 && (zt = 20, (w === "nw" || w === "w" || w === "sw") && (gt = F.x + F.w - 20)), wt < 20 && (wt = 20, (w === "nw" || w === "n" || w === "ne") && (Bt = F.y + F.h - 20));
        const Ft = Z.map((qt) => {
          const te = gt + qt.relX * zt, oe = Bt + qt.relY * wt, ke = qt.relW * zt, ee = qt.relH * wt, le = {
            x: te,
            y: oe,
            w: ke,
            h: qt.isAutoH ? "auto" : ee
          };
          if (qt.origPoints && qt.drawData) {
            const Ee = qt.origW > 0 ? ke / qt.origW : 1, ve = qt.origH > 0 ? ee / qt.origH : 1;
            le.data = {
              ...qt.drawData,
              points: qt.origPoints.map(
                ([Eo, ir, wn]) => [Eo * Ee, ir * ve, wn]
              )
            };
          }
          return { id: qt.id, patch: le };
        });
        t.updateMany(Ft);
      }, Ht = (st) => {
        It = st.clientX, Ct = st.clientY, vt = st.metaKey || st.ctrlKey, ft === null && (ft = requestAnimationFrame(At));
      }, Gt = () => {
        ft !== null && (cancelAnimationFrame(ft), At()), s().removeEventListener("pointermove", Ht), s().removeEventListener("pointerup", Gt);
        for (const st of z)
          t.isContainerType(st.type) && t.syncFrameChildrenAfterResize(st.id);
      };
      s().addEventListener("pointermove", Ht), s().addEventListener("pointerup", Gt);
    },
    [t, rt, $t]
  );
  bt(() => {
    r.current && (r.current.style.cursor = t.lassoSelect ? Do : Pn(g)), g !== "select" && g !== "edge" && (co.current = null, Ke(null)), g !== "erase" && (qe.current !== null && (cancelAnimationFrame(qe.current), qe.current = null), po.current = /* @__PURE__ */ new Set(), or(/* @__PURE__ */ new Set()), Ae.current = [], _o([]));
  }, [g]);
  const sr = lt(null), Ds = lt(null), _a = it(
    (w) => {
      if (G.current && w.pointerType === "touch" && X.current) {
        const A = w.clientX - X.current.clientX, z = w.clientY - X.current.clientY;
        Math.sqrt(A * A + z * z) > 8 && (clearTimeout(G.current), G.current = null, X.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (Ds.current = { clientX: w.clientX, clientY: w.clientY }, sr.current === null && (sr.current = requestAnimationFrame(() => {
        sr.current = null;
        const A = r.current, z = Ds.current;
        if (!A || !z) return;
        const { x: Y, y: T } = t.screenToCanvas(z.clientX, z.clientY);
        if (t.lassoSelect) {
          A.style.cursor = Do;
          return;
        }
        if (t.mode === "edge") {
          const L = t.hitTest(Y, T, rt), F = L && L.type !== "edge" ? L.id : null;
          F !== co.current && (co.current = F, Ke(F));
          return;
        }
        if (t.selection.size >= 2 && se && Y >= se.x && Y <= se.x + se.w && T >= se.y && T <= se.y + se.h) {
          A.style.cursor = "move";
          return;
        }
        const B = t.hitTest(Y, T, rt), D = B ? B.id : null;
        if (D !== co.current && (co.current = D, Ke(D)), B) {
          A.style.cursor = "move";
          return;
        }
        A.style.cursor = "default";
      })));
    },
    [t, se, rt, $t]
  ), tl = it((w) => {
    (w.dataTransfer.types.includes("Files") || w.dataTransfer.types.includes(Hr) || w.dataTransfer.types.includes(Or) || w.dataTransfer.types.includes(Xr)) && (w.preventDefault(), w.dataTransfer.dropEffect = "copy");
  }, []), el = it(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const A = w.dataTransfer.getData(Xr);
      if (A) {
        try {
          const F = JSON.parse(A);
          Pa(t, F, w.clientX, w.clientY);
        } catch (F) {
          console.error("Failed to place GIF:", F);
        }
        return;
      }
      const z = w.dataTransfer.getData(Or);
      if (z) {
        try {
          const { itemId: F } = JSON.parse(z), W = Ma().find((q) => q.id === F);
          W && za(t, W, w.clientX, w.clientY);
        } catch (F) {
          console.error("Failed to place personal library item:", F);
        }
        return;
      }
      const Y = w.dataTransfer.getData(Hr);
      if (Y) {
        try {
          const { libraryId: F, itemId: K } = JSON.parse(Y), q = hs(F).find((Z) => Z.id === K);
          q && Ca(t, q, w.clientX, w.clientY);
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
            const K = JSON.parse(F.result);
            if (K.type === "excalidrawlib") {
              const W = T.name.replace(/\.excalidrawlib(\.json)?$/, "");
              us(K, { name: W });
            }
          } catch (K) {
            console.error("Failed to import library:", K);
          }
        }, F.readAsText(T);
        return;
      }
      if (T.type === "image/svg+xml" || T.name.endsWith(".svg")) {
        const F = new FileReader();
        F.onload = () => {
          const K = F.result, W = Yr(K);
          W && Ah(t, W, w.clientX, w.clientY);
        }, F.readAsText(T);
        return;
      }
      if (!T.type.startsWith("image/")) return;
      const { x: B, y: D } = t.screenToCanvas(w.clientX, w.clientY), L = new FileReader();
      L.onload = () => {
        const F = L.result, K = new Image();
        K.onload = () => {
          const W = Math.min(K.naturalWidth, 400), q = Math.min(K.naturalHeight, 300), Z = K.naturalWidth / K.naturalHeight, $ = Z >= 1 ? W : q * Z, dt = Z >= 1 ? W / Z : q;
          t.addNode({
            id: kt(10),
            type: "image",
            x: B,
            y: D,
            w: $,
            h: dt,
            z: t.nextZ(),
            data: { src: F }
          });
        }, K.src = F;
      }, L.readAsDataURL(T);
    },
    [t]
  ), ol = `translate(${a.x}px, ${a.y}px) scale(${a.zoom})`;
  return /* @__PURE__ */ k(
    "div",
    {
      ref: r,
      "data-sb-canvas": !0,
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        touchAction: "none",
        background: pn(U).canvasBg
      },
      onPointerDown: ja,
      onPointerMove: _a,
      onDoubleClick: Ga,
      onContextMenu: Ya,
      onDragOver: tl,
      onDrop: el,
      children: [
        /* @__PURE__ */ u(oh, { viewport: a, gridSize: M, background: U, gridVisible: x }),
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              transform: ol,
              transformOrigin: "0 0",
              pointerEvents: "none"
            },
            children: [
              Ne.sort((w, A) => w.z - A.z).map((w) => {
                var D;
                const A = er.has(w.id), z = $n.has(w.id), T = -(w.id.split("").reduce((L, F) => L + F.charCodeAt(0), 0) % 240 / 100);
                let B;
                if (o) {
                  const L = o.get(w.type);
                  if (L) {
                    const F = L.component, K = d.has(w.id), W = g === "select" || g === "text" || g === "note" || g === "sticky", q = /* @__PURE__ */ u(
                      F,
                      {
                        node: w,
                        data: w.data,
                        isSelected: K,
                        multiSelected: d.size > 1 && K && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: W,
                        zoom: a.zoom,
                        editing: Is === w.id,
                        editClickPos: Is === w.id ? _n.current : null,
                        callbacks: {
                          onMeasuredHeight: Mt,
                          onResizeHandleDown: rr,
                          onEditStart: (Z) => {
                            const $ = t.getNode(Z);
                            $ && ($.type === "text" ? ho(Z) : $.type === "sticky" ? uo(Z) : $.type === "frame" ? Io(Z) : $.type === "shape" ? To(Z) : $.type === "image" ? Po(Z) : $.type === "youtube" && zs(Z));
                          },
                          onEditEnd: () => {
                            ho(null), uo(null), Io(null), To(null), Po(null), zs(null);
                          }
                        },
                        portValues: n && ((D = L.ports) != null && D.length) && Ls >= 0 ? n.getAllPortValues(w.id) : void 0,
                        updateData: (Z) => {
                          t.updateNodeWithHistory(w.id, {
                            data: { ...w.data, ...Z }
                          });
                        }
                      },
                      L.handlesOwnLayout ? w.id : void 0
                    );
                    L.handlesOwnLayout ? B = q : B = /* @__PURE__ */ u(
                      lu,
                      {
                        node: w,
                        isInteractive: W,
                        measuredH: rt[w.id],
                        onMeasuredHeight: Mt,
                        observeElement: Et,
                        unobserveElement: Jt,
                        isContainer: L.isContainer,
                        children: q
                      },
                      w.id
                    );
                  }
                } else if (w.type === "content") {
                  const L = w;
                  B = /* @__PURE__ */ u(
                    Ui,
                    {
                      node: L,
                      isSelected: d.has(w.id),
                      multiSelected: d.size > 1 && d.has(w.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: g === "select" || g === "text" || g === "note",
                      zoom: a.zoom,
                      onMeasuredHeight: Mt,
                      autoEdit: Ts.current === L.id
                    },
                    w.id
                  );
                } else if (w.type === "text")
                  B = /* @__PURE__ */ u(
                    aa,
                    {
                      node: w,
                      engine: t,
                      editing: zo === w.id,
                      editClickPos: zo === w.id ? _n.current : null,
                      onStopEdit: () => {
                        if (tr.current === w.id) {
                          tr.current = null;
                          const L = t.getNode(w.id);
                          if (!L || !L.data.text.trim()) {
                            t.deleteNode(w.id), ho(null);
                            return;
                          }
                          t.pushHistorySnapshot();
                        }
                        ho(null);
                      },
                      onMeasuredHeight: Mt
                    },
                    w.id
                  );
                else if (w.type === "image")
                  B = /* @__PURE__ */ u(
                    ia,
                    {
                      node: w,
                      isSelected: d.has(w.id),
                      engine: t,
                      interactive: g === "select",
                      zoom: a.zoom,
                      onResizeHandleDown: rr,
                      cropping: Cs === w.id,
                      onCropStart: () => Po(w.id),
                      onCropEnd: () => Po(null)
                    },
                    w.id
                  );
                else if (w.type === "sticky")
                  B = /* @__PURE__ */ u(
                    la,
                    {
                      node: w,
                      isSelected: d.has(w.id),
                      engine: t,
                      interactive: g === "select" || g === "sticky",
                      zoom: a.zoom,
                      editing: Ms === w.id,
                      onEditStart: uo,
                      onEditEnd: () => uo(null)
                    },
                    w.id
                  );
                else if (w.type === "frame") {
                  const L = w, F = L.h === "auto" ? 100 : L.h;
                  B = /* @__PURE__ */ u(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: L.x,
                        top: L.y,
                        width: L.w,
                        height: F,
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
                      children: Ss === w.id ? /* @__PURE__ */ u(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: L.data.label ?? "",
                          placeholder: "Frame label...",
                          onBlur: (K) => {
                            const W = K.currentTarget.value.trim();
                            t.updateNodeWithHistory(w.id, {
                              data: { ...L.data, label: W || void 0 }
                            }), Io(null);
                          },
                          onKeyDown: (K) => {
                            (K.key === "Enter" || K.key === "Escape") && K.currentTarget.blur(), K.stopPropagation();
                          },
                          onPointerDown: (K) => K.stopPropagation(),
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
                          onDoubleClick: (K) => {
                            K.stopPropagation(), t.select(w.id), Io(w.id);
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
                  L.type === "draw" ? B = /* @__PURE__ */ u(Yn, { node: L }, w.id) : B = /* @__PURE__ */ u(Yn, { node: L, editingLabel: $o === w.id }, w.id);
                }
                return A || z ? /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      opacity: A ? 0.25 : void 0,
                      filter: A ? "saturate(0)" : void 0,
                      animation: z ? "sb-node-bop 3.4s ease-in-out infinite" : void 0,
                      animationDelay: z ? `${T}s` : void 0,
                      transformOrigin: "center center",
                      willChange: z ? "transform" : void 0
                    },
                    children: B
                  },
                  w.id
                ) : B;
              }),
              $o && (() => {
                const w = t.getNode($o);
                if (!w || w.type !== "shape") return null;
                const A = w.data;
                return A.shape === "line" || A.shape === "arrow" ? null : /* @__PURE__ */ u(
                  cu,
                  {
                    node: w,
                    engine: t,
                    onDone: () => To(null)
                  },
                  $o
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ u(
          Lh,
          {
            nodes: Ve,
            viewport: a,
            selection: d,
            measuredHeights: rt,
            activeStroke: V,
            shapePreview: _,
            shapePreviewStyle: _ ? {
              stroke: t.mode === "frame" ? "#1e1e2e" : t.activeTool.color,
              strokeWidth: t.mode === "frame" ? 1 : t.activeTool.width,
              roughness: t.mode === "frame" ? 0 : t.activeTool.roughness ?? 1,
              shapeType: t.mode === "frame" ? "rect" : t.activeTool.shapeType || "rect"
            } : null,
            onResizeHandleDown: rr,
            onRotateStart: Va,
            onConnectionHandleDown: Rs,
            onEdgeEndpointDown: Qa,
            onKinkHandleDown: Za,
            edgePreview: ot,
            edgeReconnect: pt,
            eraserMarkedIds: er.size > 0 ? er : void 0,
            eraserTrail: Ps.length > 1 ? Ps : void 0,
            laserTrail: As.length > 1 ? As : void 0,
            mode: g,
            hoveredNodeId: Jo,
            registry: o,
            onPortHandleDown: qa,
            cycleNodeIds: n && Ls >= 0 ? n.cycleNodeIds : void 0,
            containerTypes: t.containerTypes,
            alignGuides: P
          }
        ),
        se && (() => {
          const w = t.selectionGroupId(), A = w ? t.groupRotations.get(w) : void 0;
          let z, Y, T, B;
          if (at)
            z = at.bounds, Y = at.angle, T = at.cx, B = at.cy;
          else if (A && A.angle !== 0) {
            const W = -A.angle * Math.PI / 180, q = Math.cos(W), Z = Math.sin(W);
            let $ = 1 / 0, dt = 1 / 0, ft = -1 / 0, It = -1 / 0;
            for (const Ct of t.selection) {
              const vt = t.getNode(Ct);
              if (!vt || vt.type === "edge") continue;
              const At = vt.h === "auto" ? rt[vt.id] ?? 100 : vt.h, Ht = vt.x + vt.w / 2, Gt = vt.y + At / 2, st = Ht - A.cx, xt = Gt - A.cy, gt = A.cx + st * q - xt * Z, Bt = A.cy + st * Z + xt * q;
              $ = Math.min($, gt - vt.w / 2), dt = Math.min(dt, Bt - At / 2), ft = Math.max(ft, gt + vt.w / 2), It = Math.max(It, Bt + At / 2);
            }
            z = {
              x: $ - ne,
              y: dt - ne,
              w: ft - $ + ne * 2,
              h: It - dt + ne * 2
            }, Y = A.angle, T = A.cx, B = A.cy;
          } else
            z = se, Y = 0, T = 0, B = 0;
          const D = 8 / a.zoom, L = D / 2, F = [
            { pos: "nw", cx: z.x, cy: z.y },
            { pos: "n", cx: z.x + z.w / 2, cy: z.y },
            { pos: "ne", cx: z.x + z.w, cy: z.y },
            { pos: "e", cx: z.x + z.w, cy: z.y + z.h / 2 },
            { pos: "se", cx: z.x + z.w, cy: z.y + z.h },
            { pos: "s", cx: z.x + z.w / 2, cy: z.y + z.h },
            { pos: "sw", cx: z.x, cy: z.y + z.h },
            { pos: "w", cx: z.x, cy: z.y + z.h / 2 }
          ], K = Y !== 0 ? ` rotate(${Y}, ${T}, ${B})` : "";
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ k("g", { transform: K, children: [
                /* @__PURE__ */ u(
                  "rect",
                  {
                    x: z.x,
                    y: z.y,
                    width: z.w,
                    height: z.h,
                    fill: "none",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / a.zoom
                  }
                ),
                Y === 0 && F.map(({ pos: W, cx: q, cy: Z }) => /* @__PURE__ */ u(
                  "rect",
                  {
                    x: q - L,
                    y: Z - L,
                    width: D,
                    height: D,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / a.zoom,
                    style: { cursor: Kn(W, Y), pointerEvents: "auto" },
                    onPointerDown: ($) => {
                      $.stopPropagation(), $a(W, $);
                    }
                  },
                  W
                )),
                (() => {
                  const W = 25 / a.zoom, q = z.x + z.w / 2, Z = z.y;
                  return /* @__PURE__ */ k(mt, { children: [
                    /* @__PURE__ */ u(
                      "line",
                      {
                        x1: q,
                        y1: Z,
                        x2: q,
                        y2: Z - W,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / a.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const $ = 8 / a.zoom, dt = $ / 2;
                      return /* @__PURE__ */ u(
                        "rect",
                        {
                          x: q - dt,
                          y: Z - W - dt,
                          width: $,
                          height: $,
                          rx: 1.5 / a.zoom,
                          transform: `rotate(45, ${q}, ${Z - W})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / a.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (ft) => Ja(ft)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const W = 26 / a.zoom, q = 42 / a.zoom, Z = 4 / a.zoom;
                  return [
                    { side: "top", cx: z.x + z.w / 2, cy: z.y - q },
                    { side: "right", cx: z.x + z.w + W, cy: z.y + z.h / 2 },
                    { side: "bottom", cx: z.x + z.w / 2, cy: z.y + z.h + W },
                    { side: "left", cx: z.x - W, cy: z.y + z.h / 2 }
                  ].map(({ side: dt, cx: ft, cy: It }) => /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: ft,
                      cy: It,
                      r: Z,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / a.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (Ct) => {
                        Ct.stopPropagation();
                        const vt = Ka(dt);
                        vt && Rs(vt, dt, Ct);
                      }
                    },
                    `conn-${dt}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        Fe && /* @__PURE__ */ u(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ u("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ u(
              "rect",
              {
                x: Fe.x,
                y: Fe.y,
                width: Fe.w,
                height: Fe.h,
                fill: "none",
                stroke: "#6366f1",
                strokeWidth: 1.5 / a.zoom,
                strokeDasharray: `${5 / a.zoom} ${3 / a.zoom}`,
                rx: 4 / a.zoom,
                opacity: 0.5
              }
            ) })
          }
        ),
        He && (() => {
          const w = t.canvasToScreen(He.startX, He.startY), A = t.canvasToScreen(He.endX, He.endY), z = Math.min(w.x, A.x), Y = Math.min(w.y, A.y), T = Math.abs(A.x - w.x), B = Math.abs(A.y - w.y);
          return T < 2 && B < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
                "rect",
                {
                  x: z,
                  y: Y,
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
        Oe && Oe.length > 2 && (() => {
          const A = Oe.map(([z, Y]) => t.canvasToScreen(z, Y)).map((z) => `${z.x},${z.y}`).join(" ");
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
                "polygon",
                {
                  points: A,
                  fill: "rgba(59,130,246,0.08)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5,
                  strokeDasharray: "4"
                }
              )
            }
          );
        })(),
        ae && (() => {
          const w = Math.min(ae.startX, ae.endX), A = Math.min(ae.startY, ae.endY), z = Math.abs(ae.endX - ae.startX), Y = Math.abs(ae.endY - ae.startY);
          return z < 2 && Y < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ u(
                "rect",
                {
                  x: w,
                  y: A,
                  width: z,
                  height: Y,
                  fill: "rgba(59,130,246,0.06)",
                  stroke: "#3b82f6",
                  strokeWidth: 1.5 / a.zoom,
                  strokeDasharray: `${4 / a.zoom}`,
                  rx: 8 / a.zoom
                }
              ) })
            }
          );
        })(),
        Pe && /* @__PURE__ */ u(
          Dh,
          {
            x: Pe.x,
            y: Pe.y,
            sections: Pe.sections,
            onClose: () => v(null)
          }
        ),
        mn && /* @__PURE__ */ u(
          Th,
          {
            nodes: mn.nodes,
            onSave: (w) => {
              bh(w, mn.nodes, mn.groupParent), nr(null);
            },
            onCancel: () => nr(null)
          }
        )
      ]
    }
  );
}
const yn = 52, sn = 300, df = yn + sn, hu = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], gs = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], uu = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], ms = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Na = [1, 2, 3, 5, 8, 12], bs = [1, 2, 3, 4, 6, 8], pu = [1, 2, 3, 4, 6], fu = bs, Ha = [14, 20, 28, 36], xs = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], yu = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Ce = [
  { name: "Standard", colors: hu },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], ws = Ce, gu = [
  { name: "Standard", colors: yu },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Lt = {
  display: "flex",
  alignItems: "center",
  gap: 6
}, Dt = {
  width: 64,
  fontSize: 10,
  flexShrink: 0
}, Ut = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
}, mu = "https://libraries.excalidraw.com/libraries.json", jr = "https://libraries.excalidraw.com/libraries";
function bu({
  onClose: t,
  onInstalled: e
}) {
  const o = jt(), [n, r] = tt([]), [s, i] = tt(!0), [l, a] = tt(null), [c, h] = tt(""), [p, d] = tt(null), [f, g] = tt(/* @__PURE__ */ new Set()), y = it(() => {
    const x = pa(), S = new Set(x.map((M) => M.source));
    g(S);
  }, []);
  bt(() => {
    let x = !1;
    return (async () => {
      try {
        const S = await fetch(mu);
        if (!S.ok) throw new Error(`HTTP ${S.status}`);
        const M = await S.json();
        x || (r(M), i(!1));
      } catch (S) {
        x || (a(String(S)), i(!1));
      }
    })(), y(), () => {
      x = !0;
    };
  }, [y]);
  const m = Kt(() => {
    if (!c.trim()) return n;
    const x = c.toLowerCase();
    return n.filter(
      (S) => {
        var M, I;
        return S.name.toLowerCase().includes(x) || ((M = S.description) == null ? void 0 : M.toLowerCase().includes(x)) || ((I = S.itemNames) == null ? void 0 : I.some((R) => R.toLowerCase().includes(x)));
      }
    );
  }, [n, c]), b = it(
    async (x) => {
      d(x.id);
      try {
        const S = `${jr}/${x.source}`;
        await ih(S, x.name), y(), e();
      } catch (S) {
        console.error("Failed to install library:", S);
      } finally {
        d(null);
      }
    },
    [e, y]
  );
  return je(
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
        onPointerDown: (x) => {
          x.target === x.currentTarget && t();
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
            onPointerDown: (x) => x.stopPropagation(),
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
                              children: "Excalidraw Libraries"
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
                        placeholder: "Search libraries...",
                        value: c,
                        onChange: (x) => h(x.target.value),
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
                    s && /* @__PURE__ */ u(
                      "div",
                      {
                        style: {
                          textAlign: "center",
                          padding: 40,
                          color: o.textMuted,
                          fontSize: 12
                        },
                        children: "Loading libraries..."
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
                          "Failed to load directory: ",
                          l
                        ]
                      }
                    ),
                    !s && !l && m.length === 0 && /* @__PURE__ */ u(
                      "div",
                      {
                        style: {
                          textAlign: "center",
                          padding: 40,
                          color: o.textDisabled,
                          fontSize: 12
                        },
                        children: "No libraries match your search."
                      }
                    ),
                    m.map((x, S) => {
                      const M = f.has(
                        `${jr}/${x.source}`
                      ), I = p === x.id;
                      return /* @__PURE__ */ u(
                        xu,
                        {
                          entry: x,
                          isInstalled: M,
                          isInstalling: I,
                          onInstall: () => b(x),
                          theme: o
                        },
                        x.id || `dir-${S}`
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
                    m.length,
                    " libraries • Powered by Excalidraw Libraries"
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
function xu({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: n,
  theme: r
}) {
  var i;
  const s = t.preview ? `${jr}/${t.preview}` : null;
  return /* @__PURE__ */ k(
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
        s && /* @__PURE__ */ u(
          "img",
          {
            src: s,
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
        /* @__PURE__ */ k("div", { style: { flex: 1, minWidth: 0 }, children: [
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
          ((i = t.authors) == null ? void 0 : i.length) > 0 && /* @__PURE__ */ k(
            "div",
            {
              style: {
                fontSize: 10,
                color: r.textMuted,
                marginBottom: 4
              },
              children: [
                "by ",
                t.authors.map((l) => l.name).join(", ")
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
            children: e ? "Installed" : o ? "Installing..." : "Install"
          }
        )
      ]
    }
  );
}
const wu = /^[A-Za-z][A-Za-z0-9_:-]*$/, ki = /^[A-Za-z][A-Za-z0-9_]*$/;
function ku(t) {
  const e = t.trim();
  return e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'") ? e.slice(1, -1).trim() : e;
}
function Me(t) {
  return ku(t).replace(/<br\s*\/?>/gi, `
`).replace(/\\n/g, `
`);
}
function Sr(t, e) {
  const o = t.nodes.get(e.key);
  return o ? (o.label === o.key && e.label !== e.key && (o.label = e.label), o.shape === "rect" && e.shape !== "rect" && (o.shape = e.shape), o) : (t.nodes.set(e.key, e), e);
}
function bo(t) {
  const e = t.trim();
  if (!e) return null;
  let o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(\(([\s\S]+)\)\)$/);
  return o ? { key: o[1], label: Me(o[2]), shape: "circle" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\(([\s\S]+)\)$/), o ? { key: o[1], label: Me(o[2]), shape: "round" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\{([\s\S]+)\}$/), o ? { key: o[1], label: Me(o[2]), shape: "diamond" } : (o = e.match(/^([A-Za-z][A-Za-z0-9_:-]*)\s*\[([\s\S]+)\]$/), o ? { key: o[1], label: Me(o[2]), shape: "rect" } : wu.test(e) ? { key: e, label: e, shape: "rect" } : null)));
}
function vu(t) {
  let e = t.match(/^(.*?)\s*--\s*\|([^|]+)\|\s*-->\s*(.*?)$/);
  if (e) {
    const o = bo(e[1]), n = bo(e[3]);
    return !o || !n ? null : { from: o, to: n, label: Me(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*--\s*([^>-][\s\S]*?)\s*-->\s*(.*?)$/), e) {
    const o = bo(e[1]), n = bo(e[3]);
    return !o || !n ? null : { from: o, to: n, label: Me(e[2]) };
  }
  if (e = t.match(/^(.*?)\s*(?:-->|==>|-\.->|---)\s*(.*?)$/), e) {
    const o = bo(e[1]), n = bo(e[2]);
    return !o || !n ? null : { from: o, to: n };
  }
  return null;
}
function Su(t) {
  const e = t.match(/\b(TB|TD|BT|LR|RL)\b/i);
  if (!e) return "TB";
  const o = e[1].toUpperCase();
  return o === "TD" ? "TB" : o === "TB" || o === "BT" || o === "LR" || o === "RL" ? o : "TB";
}
function Mu(t) {
  const e = t.match(/^subgraph(?:\s+([\s\S]+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const n = o.match(/^[A-Za-z][A-Za-z0-9_:-]*\s*\[([\s\S]+)\]$/);
  return n ? { label: Me(n[1]) } : { label: Me(o) };
}
function Cu(t) {
  const o = { direction: "TB", nodes: /* @__PURE__ */ new Map(), edges: [], groups: [] }, n = t.replace(/\r\n/g, `
`).split(`
`).map((a) => a.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (n.length === 0)
    throw new Error("Paste a Mermaid flowchart first.");
  const r = n[0];
  /^(flowchart|graph)\b/i.test(r) && (o.direction = Su(r), n.shift());
  const i = [], l = (a) => {
    for (const c of i) c.nodeKeys.add(a);
  };
  for (const a of n) {
    const c = a.split(";").map((h) => h.trim()).filter(Boolean);
    for (const h of c) {
      const p = Mu(h);
      if (p) {
        i.push({ label: p.label, nodeKeys: /* @__PURE__ */ new Set() });
        continue;
      }
      if (/^end\b/i.test(h)) {
        const g = i.pop();
        g && o.groups.push({
          label: g.label,
          nodeKeys: Array.from(g.nodeKeys)
        });
        continue;
      }
      const d = vu(h);
      if (d) {
        const g = Sr(o, d.from), y = Sr(o, d.to);
        l(g.key), l(y.key), o.edges.push({ fromKey: g.key, toKey: y.key, label: d.label });
        continue;
      }
      const f = bo(h);
      if (f) {
        const g = Sr(o, f);
        l(g.key);
      }
    }
  }
  for (; i.length > 0; ) {
    const a = i.pop();
    o.groups.push({
      label: a.label,
      nodeKeys: Array.from(a.nodeKeys)
    });
  }
  if (o.nodes.size === 0)
    throw new Error("Could not parse Mermaid nodes. Try simple flowchart syntax like A-->B.");
  return o;
}
function zu(t) {
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
    const l = o.slice(0, i).trim(), a = o.slice(i + s.length).trim();
    if (!(!ki.test(l) || !ki.test(a)))
      return {
        from: l,
        arrow: s,
        to: a,
        label: Me(n)
      };
  }
  return null;
}
function Iu(t) {
  const e = t.match(/^Note\s+(left|right|over)\s+of\s+([A-Za-z][A-Za-z0-9_:-]*)\s*:\s*([\s\S]+)$/i);
  return e ? {
    side: e[1].toLowerCase(),
    of: e[2],
    text: Me(e[3])
  } : null;
}
function Tu(t) {
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
function Pu(t) {
  const e = t.match(/^box(?:\s+(.+))?$/i);
  if (!e) return null;
  const o = (e[1] ?? "").trim();
  if (!o) return {};
  const n = o.indexOf(" "), r = n >= 0 ? o.slice(0, n) : o, s = n >= 0 ? o.slice(n + 1).trim() : "";
  return Tu(r) ? { color: r, label: s || void 0 } : { label: o };
}
function Au(t) {
  const e = t.replace(/\r\n/g, `
`).split(`
`).map((d) => d.replace(/%%.*$/, "").trim()).filter(Boolean);
  if (e.length === 0)
    throw new Error("Paste Mermaid sequenceDiagram text first.");
  if (!/^sequenceDiagram\b/i.test(e[0]))
    throw new Error("Not a Mermaid sequence diagram.");
  const o = /* @__PURE__ */ new Set(), n = [], r = [], s = [], i = [], l = [], a = [];
  let c = 0;
  const h = (d) => {
    o.has(d) || (o.add(d), n.push(d));
    for (const f of a) f.participants.add(d);
  };
  for (let d = 1; d < e.length; d++) {
    const f = e[d];
    if (/^autonumber\b/i.test(f)) continue;
    const g = Pu(f);
    if (g) {
      a.push({ type: "box", label: g.label, color: g.color, participants: /* @__PURE__ */ new Set() });
      continue;
    }
    const y = f.match(/^loop(?:\s+([\s\S]+))?$/i);
    if (y) {
      a.push({
        type: "loop",
        label: y[1] ? Me(y[1]) : void 0,
        startStep: c,
        participants: /* @__PURE__ */ new Set()
      });
      continue;
    }
    if (/^end\b/i.test(f)) {
      const S = a.pop();
      (S == null ? void 0 : S.type) === "box" ? l.push(S) : (S == null ? void 0 : S.type) === "loop" && i.push({
        label: S.label,
        startStep: S.startStep,
        endStep: c,
        participants: S.participants
      });
      continue;
    }
    const m = f.match(/^participant\s+([A-Za-z][A-Za-z0-9_]*)(?:\s+as\s+[\s\S]+)?$/i);
    if (m) {
      h(m[1]);
      continue;
    }
    const b = Iu(f);
    if (b) {
      h(b.of), s.push({ step: c, note: b });
      continue;
    }
    const x = zu(f);
    if (x) {
      h(x.from), h(x.to), r.push(x), c += 1;
      continue;
    }
  }
  for (; a.length > 0; ) {
    const d = a.pop();
    d.type === "box" ? l.push(d) : i.push({
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
    groups: l.map((d) => ({
      label: d.label,
      color: d.color,
      participants: Array.from(d.participants)
    })).filter((d) => d.participants.length > 0)
  };
}
function An(t) {
  return t === "diamond" ? { w: 200, h: 120 } : t === "circle" ? { w: 140, h: 140 } : { w: 200, h: 96 };
}
function Eu(t) {
  const e = Array.from(t.nodes.keys()).sort(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const c of e)
    o.set(c, 0), n.set(c, []);
  for (const c of t.edges)
    !o.has(c.fromKey) || !o.has(c.toKey) || (n.get(c.fromKey).push(c.toKey), o.set(c.toKey, (o.get(c.toKey) ?? 0) + 1));
  const r = e.filter((c) => (o.get(c) ?? 0) === 0), s = /* @__PURE__ */ new Map();
  for (const c of r) s.set(c, 0);
  const i = [...r];
  for (; i.length > 0; ) {
    const c = i.shift(), h = s.get(c) ?? 0;
    for (const p of n.get(c) ?? []) {
      const d = Math.max(s.get(p) ?? 0, h + 1);
      s.set(p, d), o.set(p, (o.get(p) ?? 0) - 1), (o.get(p) ?? 0) <= 0 && i.push(p);
    }
  }
  let l = 0;
  for (const c of s.values()) l = Math.max(l, c);
  for (const c of e)
    s.has(c) || (l += 1, s.set(c, l));
  const a = /* @__PURE__ */ new Map();
  for (const c of e) {
    const h = s.get(c) ?? 0;
    a.has(h) || a.set(h, []), a.get(h).push(c);
  }
  return Array.from(a.entries()).sort((c, h) => c[0] - h[0]).map(([, c]) => c.sort());
}
function Ru(t, e, o, n) {
  const r = Au(t), s = [], i = [], l = 6, a = "#94a3b8", c = 3, h = "#475569", p = 180, d = 64, f = 270, g = o - 140, y = g + d + 8, m = 88, b = Math.max(1, r.messages.length), x = y + b * m + 40, S = x + 12, M = S + d, I = /* @__PURE__ */ new Map();
  for (const R of r.groups) {
    const C = R.participants.map((nt) => I.get(nt)).filter((nt) => typeof nt == "number");
    if (C.length === 0)
      for (const nt of R.participants) {
        const Q = r.participants.indexOf(nt);
        Q >= 0 && C.push(e + (Q - (r.participants.length - 1) / 2) * f);
      }
    if (C.length === 0) continue;
    const P = Math.min(...C) - p / 2 - 24, j = Math.max(...C) + p / 2 + 24, U = g - 22, ct = M - U + 18, O = {
      id: kt(10),
      type: "shape",
      x: P,
      y: U,
      w: j - P,
      h: ct,
      z: n(),
      data: {
        shape: "rect",
        stroke: R.color ? R.color : "#475569",
        strokeWidth: 1.5,
        strokeStyle: "solid",
        roughness: 0,
        fill: R.color ? R.color : "#334155",
        fillStyle: "solid",
        opacity: R.color ? 0.2 : 0.08,
        edgeStyle: "sharp"
      }
    };
    if (s.push(O), i.push(O.id), R.label) {
      const nt = {
        id: kt(10),
        type: "text",
        x: P + 10,
        y: U + 8,
        w: Math.max(120, j - P - 20),
        h: "auto",
        z: n(),
        data: {
          text: R.label,
          fontSize: 14,
          fontFamily: "sans-serif",
          color: "#475569",
          align: "left"
        }
      };
      s.push(nt);
    }
  }
  for (let R = 0; R < r.participants.length; R++) {
    const C = r.participants[R], P = e + (R - (r.participants.length - 1) / 2) * f;
    I.set(C, P);
    const j = {
      id: kt(10),
      type: "shape",
      x: P - p / 2,
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
        label: C,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(j), i.push(j.id);
    const U = {
      id: kt(10),
      type: "shape",
      x: P - l / 2,
      y,
      w: l,
      h: x - y,
      z: n(),
      data: {
        shape: "rect",
        stroke: a,
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 0,
        fill: a,
        fillStyle: "solid",
        opacity: 0.3,
        edgeStyle: "round"
      }
    };
    s.push(U);
    const ct = {
      id: kt(10),
      type: "shape",
      x: P - p / 2,
      y: S,
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
        label: C,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    s.push(ct), i.push(ct.id);
  }
  for (const R of r.loops) {
    const C = R.participants.map((G) => I.get(G)).filter((G) => typeof G == "number");
    if (C.length === 0) continue;
    const P = Math.min(...C) - 130, j = Math.max(...C) + 130, U = R.startStep + 1, ct = Math.max(U, R.endStep), O = y + (U - 1) * m + 16, nt = y + ct * m + 34, Q = {
      id: kt(10),
      type: "shape",
      x: P,
      y: O,
      w: j - P,
      h: Math.max(90, nt - O),
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
    s.push(Q);
    const J = `loop${R.label ? ` [${R.label}]` : ""}`, E = {
      id: kt(10),
      type: "text",
      x: P + 10,
      y: O + 8,
      w: j - P - 20,
      h: "auto",
      z: n(),
      data: {
        text: J,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#1f2937",
        align: "left"
      }
    };
    s.push(E);
  }
  for (let R = 0; R < r.messages.length; R++) {
    const C = r.messages[R], P = y + (R + 1) * m, j = I.get(C.from), U = I.get(C.to);
    if (j == null || U == null) continue;
    const ct = j === U, O = Math.min(j, U), nt = Math.max(j, U), Q = Math.max(nt - O, 40), J = j <= U ? 0 : Q, E = j <= U ? Q : 0, G = C.arrow.includes("--") || C.arrow === "-.->", X = C.arrow.toLowerCase().includes("x"), N = C.arrow.includes(">") || C.arrow.includes(")");
    if (ct) {
      const et = j + 6, ot = P - 16, ut = 92, pt = 48, Tt = G ? "dashed" : "solid", rt = {
        id: kt(10),
        type: "shape",
        x: et,
        y: ot,
        w: ut,
        h: c,
        z: n(),
        data: {
          shape: "rect",
          stroke: h,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: h,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, St = {
        id: kt(10),
        type: "shape",
        x: et + ut - c,
        y: ot,
        w: c,
        h: pt,
        z: n(),
        data: {
          shape: "rect",
          stroke: h,
          strokeWidth: 0,
          strokeStyle: "solid",
          roughness: 0,
          fill: h,
          fillStyle: "solid",
          opacity: 1,
          edgeStyle: "sharp"
        }
      }, Mt = {
        id: kt(10),
        type: "shape",
        x: et,
        y: ot + pt - c,
        w: ut,
        h: c,
        z: n(),
        data: {
          shape: N ? "arrow" : "line",
          stroke: h,
          strokeWidth: c,
          strokeStyle: Tt,
          roughness: 0,
          startPoint: [ut, c / 2],
          endPoint: [8, c / 2]
        }
      };
      s.push(rt, St, Mt);
    } else {
      const et = {
        id: kt(10),
        type: "shape",
        x: O,
        y: P - 14,
        w: Q,
        h: 28,
        z: n(),
        data: {
          shape: N ? "arrow" : "line",
          stroke: h,
          strokeWidth: c,
          strokeStyle: G ? "dashed" : "solid",
          roughness: 0,
          startPoint: [J, 14],
          endPoint: [E, 14]
        }
      };
      s.push(et);
    }
    const V = ct ? j + 18 : O, H = ct ? 170 : Q, _ = {
      id: kt(10),
      type: "text",
      x: V,
      y: P - 46,
      w: H,
      h: "auto",
      z: n(),
      data: {
        text: C.label,
        fontSize: 14,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "center"
      }
    };
    if (s.push(_), X) {
      const et = j <= U ? O + Q - 14 : O + 8, ot = {
        id: kt(10),
        type: "text",
        x: et,
        y: P - 20,
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
  for (const R of r.notes) {
    const C = y + (R.step + 1) * m, P = I.get(R.note.of);
    if (P == null) continue;
    let j = P;
    R.note.side === "right" && (j += 130), R.note.side === "left" && (j -= 300), R.note.side === "over" && (j -= 110);
    const U = {
      id: kt(10),
      type: "text",
      x: j,
      y: C - 8,
      w: 260,
      h: "auto",
      z: n(),
      data: {
        text: R.note.text,
        fontSize: 13,
        fontFamily: "sans-serif",
        color: "#0f172a",
        align: "left"
      }
    };
    s.push(U);
  }
  return { nodes: s, shapeNodeIds: i };
}
function Lu(t, e, o, n) {
  const r = t.trimStart();
  if (/^sequenceDiagram\b/i.test(r))
    return Ru(t, e, o, n);
  const s = Cu(t), i = Eu(s), l = Array.from(s.nodes.values()).map((m) => An(m.shape)), a = l.length > 0 ? Math.max(...l.map((m) => m.h)) : 96, c = Math.max(a + 130, 260), h = /* @__PURE__ */ new Map(), p = i.length;
  for (let m = 0; m < i.length; m++) {
    const b = i[m], x = b.length, S = (m - (p - 1) / 2) * c, M = b.length > 0 ? Math.max(
      ...b.map((R) => {
        const C = s.nodes.get(R);
        return C ? An(C.shape).w : 200;
      })
    ) : 200, I = Math.max(M + 90, 260);
    for (let R = 0; R < b.length; R++) {
      const C = b[R], P = (R - (x - 1) / 2) * I;
      if (s.direction === "LR" || s.direction === "RL") {
        const j = s.direction === "LR" ? e + S : e - S, U = o + P;
        h.set(C, { x: j, y: U });
      } else {
        const j = e + P, U = s.direction === "TB" ? o + S : o - S;
        h.set(C, { x: j, y: U });
      }
    }
  }
  const d = /* @__PURE__ */ new Map(), f = [], g = [], y = /* @__PURE__ */ new Map();
  for (const m of s.groups) {
    if (!m.nodeKeys.length) continue;
    const b = m.nodeKeys.map((C) => {
      const P = s.nodes.get(C), j = h.get(C);
      if (!P || !j) return null;
      const U = An(P.shape);
      return { x: j.x - U.w / 2, y: j.y - U.h / 2, w: U.w, h: U.h };
    }).filter((C) => !!C);
    if (!b.length) continue;
    const x = Math.min(...b.map((C) => C.x)) - 30, S = Math.max(...b.map((C) => C.x + C.w)) + 30, M = Math.min(...b.map((C) => C.y)) - 34, I = Math.max(...b.map((C) => C.y + C.h)) + 24, R = {
      id: kt(10),
      type: "shape",
      x,
      y: M,
      w: S - x,
      h: I - M,
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
    if (f.push(R), g.push(R.id), m.label) {
      const C = {
        id: kt(10),
        type: "text",
        x: x + 10,
        y: M + 8,
        w: Math.max(120, S - x - 20),
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
      f.push(C);
    }
  }
  for (const [m, b] of s.nodes) {
    const x = h.get(m) ?? { x: e, y: o }, S = An(b.shape), M = {
      id: kt(10),
      type: "shape",
      x: x.x - S.w / 2,
      y: x.y - S.h / 2,
      w: S.w,
      h: S.h,
      z: n(),
      data: {
        shape: b.shape === "diamond" ? "diamond" : b.shape === "circle" ? "ellipse" : (b.shape === "round", "rect"),
        stroke: "#334155",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        fill: "#f8fafc",
        fillStyle: "solid",
        edgeStyle: b.shape === "round" ? "round" : "sharp",
        label: b.label,
        labelAlign: "center",
        labelFontSize: 14
      }
    };
    f.push(M), g.push(M.id), d.set(m, M.id), y.set(m, { x: M.x, y: M.y, w: S.w, h: S.h });
  }
  for (const m of s.edges) {
    const b = d.get(m.fromKey), x = d.get(m.toKey);
    if (!b || !x || b === x) continue;
    const S = {
      id: kt(10),
      type: "edge",
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      z: n(),
      data: {
        fromId: b,
        toId: x,
        label: m.label,
        style: "solid",
        color: "#64748b",
        strokeWidth: 2,
        arrowHead: "arrow",
        edgeType: "bezier"
      }
    };
    f.push(S);
  }
  return { nodes: f, shapeNodeIds: g };
}
const vi = `flowchart LR
  A[Idea] --> B{Decision}
  B -- Yes --> C[Ship]
  B -- No --> D[Refine]
  D --> B`;
function Du({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: n
}) {
  const r = jt(), s = lt(null), [i, l] = tt(vi), [a, c] = tt(null), [h, p] = tt(null);
  bt(() => {
    if (!e) return;
    const g = (y) => {
      s.current && !s.current.contains(y.target) && o();
    };
    return document.addEventListener("pointerdown", g), () => document.removeEventListener("pointerdown", g);
  }, [e, o]);
  const d = Kt(
    () => "Supported: flowchart/graph (TB/BT/LR/RL) and sequenceDiagram. Flowchart nodes: A[Text], A{Decision}, A((Start)). Edges: A-->B, A -- label --> B.",
    []
  ), f = it(() => {
    try {
      const g = window.innerWidth / 2, y = window.innerHeight / 2, m = t.screenToCanvas(g, y), { nodes: b, shapeNodeIds: x } = Lu(i, m.x, m.y, () => t.nextZ());
      if (b.length === 0)
        throw new Error("No nodes were parsed.");
      t.addNodes(b), x.length > 0 && t.selectMultiple(x), c(null), p(`Inserted ${x.length} nodes and ${b.length - x.length} edges.`);
    } catch (g) {
      p(null), c(g instanceof Error ? g.message : "Failed to parse Mermaid graph.");
    }
  }, [t, i]);
  return !e || !n ? null : je(
    /* @__PURE__ */ k(
      "div",
      {
        ref: s,
        style: {
          position: "fixed",
          left: n.right + 8,
          top: n.top,
          background: r.panelBg,
          border: `1px solid ${r.border}`,
          borderRadius: r.panelBorderRadius,
          boxShadow: r.panelShadow,
          width: 340,
          maxHeight: `calc(100vh - ${n.top + 20}px)`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          zIndex: 99999
        },
        onPointerDown: (g) => g.stopPropagation(),
        children: [
          /* @__PURE__ */ k("div", { style: { padding: "10px 12px 8px", borderBottom: `1px solid ${r.border}` }, children: [
            /* @__PURE__ */ u("div", { style: { fontSize: 12, fontWeight: 700, color: r.text }, children: "Mermaid Sketch" }),
            /* @__PURE__ */ u("div", { style: { marginTop: 4, fontSize: 10, color: r.textMuted, lineHeight: 1.45 }, children: d })
          ] }),
          /* @__PURE__ */ k("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ u(
              "textarea",
              {
                value: i,
                onChange: (g) => l(g.target.value),
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
            a && /* @__PURE__ */ u("div", { style: { fontSize: 10, color: "#ef4444" }, children: a }),
            h && /* @__PURE__ */ u("div", { style: { fontSize: 10, color: "#16a34a" }, children: h }),
            /* @__PURE__ */ k("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: () => l(vi),
                  style: {
                    border: `1px solid ${r.border}`,
                    background: "transparent",
                    color: r.text,
                    borderRadius: r.controlBorderRadius,
                    padding: "6px 10px",
                    fontSize: 11,
                    cursor: "pointer"
                  },
                  children: "Reset Example"
                }
              ),
              /* @__PURE__ */ u(
                "button",
                {
                  onClick: f,
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
                  children: "Insert Diagram"
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
const Wu = [
  { key: "select", label: "Select", shortcut: "S", num: "" },
  { key: "hand", label: "Hand", shortcut: "P", num: "" },
  { key: "draw", label: "Draw", shortcut: "D", num: "" },
  { key: "shape", label: "Shape", shortcut: "G", num: "" },
  { key: "text", label: "Text", shortcut: "T", num: "" },
  { key: "note", label: "Note", shortcut: "B", num: "" },
  { key: "sticky", label: "Sticky", shortcut: "Y", num: "" },
  { key: "frame", label: "Frame", shortcut: "F", num: "" },
  { key: "erase", label: "Eraser", shortcut: "E", num: "" },
  { key: "laser", label: "Laser", shortcut: "Z", num: "" }
], So = {
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, Ot = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Mo({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ...Ot })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...Ot }),
    t === "text" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M7 4h10", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M12 4v16", ...Ot })
    ] }),
    t === "note" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...Ot }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...Ot, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...Ot, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...Ot, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...Ot })
    ] }),
    t === "erase" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ...Ot })
    ] }),
    t === "laser" && /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ u("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...Ot, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...Ot, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...Ot, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...Ot, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...Ot, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...Ot }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...Ot })
    ] }),
    t === "fit" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...Ot })
    ] }),
    t === "paper" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...Ot }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...Ot, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...Ot, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...Ot, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...Ot }),
      /* @__PURE__ */ u("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...Ot }),
      /* @__PURE__ */ u("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...Ot }),
      /* @__PURE__ */ u("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...Ot })
    ] }),
    t === "library" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M8 7h6", ...Ot, opacity: 0.5 }),
      /* @__PURE__ */ u("path", { d: "M8 11h4", ...Ot, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...Ot }),
      /* @__PURE__ */ u("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] }),
    t === "mermaid" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "4", width: "18", height: "14", rx: "2", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M6 8l2.6 3 2.1-2 2.2 3 2.2-2.5L18 13", ...Ot }),
      /* @__PURE__ */ u("circle", { cx: "6", cy: "8", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "10.7", cy: "9", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "14.9", cy: "9.5", r: "1.1", fill: "currentColor", stroke: "none" }),
      /* @__PURE__ */ u("circle", { cx: "18", cy: "13", r: "1.1", fill: "currentColor", stroke: "none" })
    ] })
  ] });
}
const Bu = {
  light: "Light",
  dark: "Dark",
  textured: "Textured"
};
function Fu({
  engine: t,
  background: e
}) {
  const o = jt(), [n, r] = tt(!1), s = lt(null), i = lt(null);
  bt(() => {
    if (!n) return;
    const c = (h) => {
      i.current && !i.current.contains(h.target) && s.current && !s.current.contains(h.target) && r(!1);
    };
    return document.addEventListener("pointerdown", c), () => document.removeEventListener("pointerdown", c);
  }, [n]);
  const l = Vo.find((c) => c.key === e) ?? Vo[1], a = n && s.current ? (() => {
    const c = s.current.getBoundingClientRect();
    return je(
      /* @__PURE__ */ u(
        "div",
        {
          ref: i,
          style: {
            position: "fixed",
            left: c.right + 8,
            top: c.top,
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
          onPointerDown: (h) => h.stopPropagation(),
          children: ["light", "dark", "textured"].map((h) => {
            const p = Vo.filter((d) => d.group === h);
            return p.length === 0 ? null : /* @__PURE__ */ k("div", { style: { marginBottom: 6 }, children: [
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
                  children: Bu[h]
                }
              ),
              p.map((d) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    t.setBoardBackground(d.key), r(!1);
                  },
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "5px 6px",
                    border: "none",
                    borderRadius: o.controlBorderRadius,
                    background: e === d.key ? o.controlBgActive : "transparent",
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
                          background: d.swatchColor,
                          border: `1.5px solid ${o.border}`,
                          flexShrink: 0
                        }
                      }
                    ),
                    d.label
                  ]
                },
                d.key
              ))
            ] }, h);
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
        ref: s,
        title: "Paper type",
        onClick: () => r((c) => !c),
        style: {
          ...So,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ u(Mo, { name: "paper" }),
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
    a
  ] });
}
function Nu({ engine: t }) {
  const e = jt(), [o, n] = tt(!1), r = lt(null), s = lt(null);
  bt(() => {
    if (!o) return;
    const l = (a) => {
      s.current && !s.current.contains(a.target) && r.current && !r.current.contains(a.target) && n(!1);
    };
    return document.addEventListener("pointerdown", l), () => document.removeEventListener("pointerdown", l);
  }, [o]);
  const i = o && r.current ? (() => {
    const l = r.current.getBoundingClientRect();
    return je(
      /* @__PURE__ */ k(
        "div",
        {
          ref: s,
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
          onPointerDown: (a) => a.stopPropagation(),
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
                children: "Templates"
              }
            ),
            Fi.map((a) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => {
                  const c = typeof window < "u" ? window : void 0;
                  if (!c) return;
                  const h = c.innerWidth / 2, p = c.innerHeight / 2, d = Yo(t.viewport, h, p);
                  t.applyTemplate(a.id, d.x, d.y), n(!1);
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
                onMouseEnter: (c) => {
                  c.currentTarget.style.background = e.controlBgActive;
                },
                onMouseLeave: (c) => {
                  c.currentTarget.style.background = "transparent";
                },
                children: a.label
              },
              a.id
            ))
          ]
        }
      ),
      document.body
    );
  })() : null;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: r,
        title: "Templates",
        onClick: () => n((l) => !l),
        style: {
          ...So,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: o ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(Mo, { name: "template" })
      }
    ),
    i
  ] });
}
function Hu({ engine: t }) {
  const e = jt(), [o, n] = tt(!1), [r, s] = tt(!1), i = lt(null), [l, a] = tt(null), c = it(() => {
    n((d) => (!d && i.current && a(i.current.getBoundingClientRect()), !d));
  }, []), h = it(() => n(!1), []), p = it(() => {
    s(!0);
  }, []);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: i,
        title: "Libraries",
        onClick: c,
        style: {
          ...So,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: o ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(Mo, { name: "library" })
      }
    ),
    /* @__PURE__ */ u(
      vh,
      {
        engine: t,
        open: o,
        onClose: h,
        triggerRect: l,
        onBrowseDirectory: p
      }
    ),
    r && /* @__PURE__ */ u(
      bu,
      {
        onClose: () => s(!1),
        onInstalled: () => {
          n(!1), setTimeout(() => {
            i.current && a(i.current.getBoundingClientRect()), n(!0);
          }, 100);
        }
      }
    )
  ] });
}
function Ou({ engine: t, baseUrl: e }) {
  const o = jt(), [n, r] = tt(!1), s = lt(null), [i, l] = tt(null), a = it(() => {
    r((h) => (!h && s.current && l(s.current.getBoundingClientRect()), !h));
  }, []), c = it(() => r(!1), []);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: s,
        title: "GIF Search",
        onClick: a,
        style: {
          ...So,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: n ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ u(Mo, { name: "gif" })
      }
    ),
    /* @__PURE__ */ u(
      zh,
      {
        engine: t,
        open: n,
        onClose: c,
        triggerRect: i,
        baseUrl: e
      }
    )
  ] });
}
function Xu({ engine: t }) {
  const e = jt(), [o, n] = tt(!1), r = lt(null), [s, i] = tt(null), l = it(() => {
    n((c) => (!c && r.current && i(r.current.getBoundingClientRect()), !c));
  }, []), a = it(() => n(!1), []);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: r,
        title: "Mermaid Sketch",
        onClick: l,
        style: {
          ...So,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: o ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(Mo, { name: "mermaid" })
      }
    ),
    /* @__PURE__ */ u(
      Du,
      {
        engine: t,
        open: o,
        onClose: a,
        triggerRect: s
      }
    )
  ] });
}
function Yu({ engine: t, gifApiBaseUrl: e }) {
  const o = jt(), [n, r] = tt(t.mode), [s, i] = tt(t.boardBackground), [l, a] = tt(t.lassoSelect);
  return bt(() => {
    const c = () => r(t.mode), h = () => i(t.boardBackground), p = () => a(t.lassoSelect);
    return t.on("mode", c), t.on("background", h), t.on("lassoToggle", p), () => {
      t.off("mode", c), t.off("background", h), t.off("lassoToggle", p);
    };
  }, [t]), /* @__PURE__ */ k(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: yn,
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
        Wu.map((c) => {
          const h = n === c.key && !(c.key === "select" && l);
          return /* @__PURE__ */ k(
            "button",
            {
              title: `${c.label} (${c.shortcut}${c.num ? ` / ${c.num}` : ""})`,
              onClick: () => {
                l && (t.toggleLassoSelect(), a(!1)), t.setMode(c.key);
              },
              style: {
                ...So,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: h ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ u(Mo, { name: c.key }),
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
                    children: c.num || c.shortcut
                  }
                )
              ]
            },
            c.key
          );
        }),
        /* @__PURE__ */ u("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ k(
          "button",
          {
            title: "Lasso Select (L)",
            onClick: () => {
              l ? (t.toggleLassoSelect(), a(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), a(!0));
            },
            style: {
              ...So,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: l ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ u(Mo, { name: "lasso" }),
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
        /* @__PURE__ */ u(Fu, { engine: t, background: s }),
        /* @__PURE__ */ u(Nu, { engine: t }),
        /* @__PURE__ */ u(Hu, { engine: t }),
        /* @__PURE__ */ u(Xu, { engine: t }),
        e && /* @__PURE__ */ u(Ou, { engine: t, baseUrl: e })
      ]
    }
  );
}
const Gu = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), ju = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function Si(t) {
  return t.data.opacity ?? 1;
}
function Wo(t, e) {
  return t.data[e];
}
function Vu(t) {
  const e = {}, o = t.filter((r) => Gu.has(r.type));
  if (o.length > 0) {
    const r = Si(o[0]), s = o.every((i) => Si(i) === r);
    e.opacity = s ? r : "mixed";
  }
  const n = t.filter((r) => ju.has(r.type));
  if (n.length > 0) {
    const r = Wo(n[0], "borderColor"), s = n.every(
      (h) => Wo(h, "borderColor") === r
    );
    e.borderColor = s ? r ?? null : "mixed";
    const i = Wo(n[0], "borderWidth") ?? 1, l = n.every(
      (h) => (Wo(h, "borderWidth") ?? 1) === i
    );
    e.borderWidth = l ? i : "mixed";
    const a = Wo(n[0], "borderStyle") ?? "solid", c = n.every(
      (h) => (Wo(h, "borderStyle") ?? "solid") === a
    );
    e.borderStyle = c ? a : "mixed";
  }
  return e;
}
function Ku(t) {
  const [e, o] = tt(t.mode), [n, r] = tt(new Set(t.selection)), [, s] = tt(0);
  if (bt(() => {
    const h = () => o(t.mode), p = () => {
      r(new Set(t.selection)), s((f) => f + 1);
    }, d = () => s((f) => f + 1);
    return t.on("mode", h), t.on("selection", p), t.on("change", d), () => {
      t.off("mode", h), t.off("selection", p), t.off("change", d);
    };
  }, [t]), n.size === 0)
    return e === "draw" || e === "shape" || e === "text" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
  const i = [];
  for (const h of n) {
    const p = t.getNode(h);
    p && i.push(p);
  }
  if (i.length === 0)
    return { target: { kind: "none" }, commonProps: {} };
  if (i.length === 1)
    return { target: { kind: "single", node: i[0] }, commonProps: {} };
  const l = /* @__PURE__ */ new Map();
  for (const h of i) {
    const p = l.get(h.type);
    p ? p.push(h) : l.set(h.type, [h]);
  }
  const a = [];
  for (const [h, p] of l)
    a.push({ type: h, nodes: p });
  const c = Vu(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: a },
    commonProps: c
  };
}
const Qn = Bi(null);
function Be(t, e) {
  const o = jn(Qn);
  return it(
    (n) => {
      if (o && o.length > 1) {
        const r = o.map((s) => ({
          id: s.id,
          patch: {
            data: { ...s.data, ...n }
          }
        }));
        t.batchUpdateWithHistory(r);
      } else
        t.updateNodeWithHistory(e.id, {
          data: { ...e.data, ...n }
        });
    },
    [t, e, o]
  );
}
function ze({
  value: t,
  onChange: e,
  mixed: o
}) {
  const n = jt(), r = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ k("div", { style: Lt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Opacity" }),
    /* @__PURE__ */ u(
      "input",
      {
        type: "range",
        min: 0,
        max: 100,
        value: r,
        onChange: (s) => e(parseInt(s.target.value) / 100),
        style: { flex: 1, accentColor: n.accentColor }
      }
    ),
    /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10, color: o ? n.textFaint : n.text }, children: o ? "--" : r })
  ] });
}
const qu = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function xe({
  label: t,
  palettes: e,
  value: o,
  onChange: n,
  allowNull: r,
  mixed: s
}) {
  const i = jt(), [l, a] = tt(""), [c, h] = tt(0), [p, d] = tt(!1), f = lt(null), g = lt(null), [y, m] = tt(null), [b, x] = tt("bottom"), S = e[c] ?? e[0], M = o == null ? void 0 : o.toLowerCase();
  bt(() => {
    if (!p) return;
    const C = (P) => {
      f.current && !f.current.contains(P.target) && d(!1);
    };
    return document.addEventListener("mousedown", C), () => document.removeEventListener("mousedown", C);
  }, [p]), bt(() => {
    if (!p) return;
    const C = () => {
      const P = g.current;
      if (!P) return;
      const j = P.getBoundingClientRect(), ct = e.length * 30 + 10, O = window.innerHeight - j.bottom, nt = j.top, Q = O < ct && nt > O;
      x(Q ? "top" : "bottom"), m({
        top: Q ? j.top - 4 : j.bottom + 4,
        left: j.right
      });
    };
    return C(), window.addEventListener("resize", C), window.addEventListener("scroll", C, !0), () => {
      window.removeEventListener("resize", C), window.removeEventListener("scroll", C, !0);
    };
  }, [p]);
  const I = () => {
    const C = l.trim();
    if (!C) return;
    const P = C.startsWith("#") ? C : `#${C}`;
    qu.test(P) && (n(P), a(""));
  }, R = e.some(
    (C) => C.colors.some((P) => P.toLowerCase() === M)
  );
  return /* @__PURE__ */ k("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: [
    /* @__PURE__ */ k("div", { style: { ...Lt, margin: 0, flexWrap: "wrap", gap: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: i.textMuted }, children: t }),
      r && /* @__PURE__ */ u(
        "button",
        {
          onClick: () => n(null),
          title: "None",
          style: {
            ...Ut,
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
      S.colors.map((C) => {
        const P = !s && M === C.toLowerCase();
        return /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n(C),
            style: {
              ...Ut,
              width: 20,
              height: 20,
              background: C,
              border: P ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
              borderRadius: "50%"
            }
          },
          C
        );
      }),
      o && !R && !s && /* @__PURE__ */ u(
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
      s && /* @__PURE__ */ u("span", { style: { fontSize: 9, color: i.textMuted, fontStyle: "italic" }, children: "Mixed" }),
      e.length > 1 && /* @__PURE__ */ k("div", { ref: g, style: { position: "relative", marginLeft: "auto" }, children: [
        /* @__PURE__ */ k(
          "button",
          {
            onClick: () => d((C) => !C),
            title: "Switch palette",
            style: {
              ...Ut,
              height: 20,
              padding: "0 5px",
              background: i.controlBg,
              color: i.textMuted,
              fontSize: 9,
              borderRadius: i.controlBorderRadius,
              display: "flex",
              alignItems: "center",
              gap: 2
            },
            children: [
              S.name,
              /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: p ? "▲" : "▼" })
            ]
          }
        ),
        p && y && je(
          /* @__PURE__ */ u(
            "div",
            {
              ref: f,
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
              children: e.map((C, P) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    h(P), d(!1);
                  },
                  style: {
                    ...Ut,
                    height: 28,
                    padding: "0 8px",
                    background: P === c ? i.controlBgActive : "transparent",
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
                    /* @__PURE__ */ u("span", { style: { display: "flex", gap: 2 }, children: C.colors.slice(0, 6).map((j) => /* @__PURE__ */ u(
                      "span",
                      {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: j,
                          display: "inline-block"
                        }
                      },
                      j
                    )) }),
                    /* @__PURE__ */ u("span", { children: C.name })
                  ]
                },
                C.name
              ))
            }
          ),
          document.body
        )
      ] })
    ] }),
    /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "center", gap: 4, paddingLeft: 52 }, children: /* @__PURE__ */ u(
      "input",
      {
        type: "text",
        value: l,
        onChange: (C) => a(C.target.value),
        onKeyDown: (C) => {
          C.key === "Enter" && I();
        },
        onBlur: I,
        placeholder: o ?? "#000000",
        style: {
          width: 72,
          height: 20,
          background: i.controlBg,
          border: `1px solid ${i.border}`,
          borderRadius: i.controlBorderRadius,
          color: i.text,
          fontSize: 10,
          fontFamily: "monospace",
          padding: "0 6px",
          outline: "none"
        }
      }
    ) })
  ] });
}
function Zo({
  label: t,
  value: e,
  onChange: o,
  mixed: n
}) {
  const r = jt();
  return /* @__PURE__ */ k("div", { style: Lt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: r.textMuted }, children: t }),
    uu.map((s) => /* @__PURE__ */ u(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...Ut,
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
function Qo({
  label: t,
  widths: e = fu,
  value: o,
  onChange: n,
  mixed: r
}) {
  const s = jt();
  return /* @__PURE__ */ k("div", { style: Lt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: s.textMuted }, children: t }),
    /* @__PURE__ */ u("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1, minWidth: 0 }, children: e.map((i) => /* @__PURE__ */ u(
      "button",
      {
        title: `${i}px`,
        onClick: () => n(i),
        style: {
          ...Ut,
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
function gn({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: n,
  onChange: r
}) {
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      xe,
      {
        label: "Border",
        palettes: Ce,
        value: t,
        onChange: (s) => r("borderColor", s ?? void 0),
        allowNull: !0,
        mixed: n == null ? void 0 : n.color
      }
    ),
    (t || (n == null ? void 0 : n.color)) && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u(
        Zo,
        {
          label: "Style",
          value: e ?? "solid",
          onChange: (s) => r("borderStyle", s),
          mixed: n == null ? void 0 : n.style
        }
      ),
      /* @__PURE__ */ u(
        Qo,
        {
          label: "Width",
          value: o ?? 1,
          onChange: (s) => r("borderWidth", s),
          mixed: n == null ? void 0 : n.width
        }
      )
    ] })
  ] });
}
const Mr = /* @__PURE__ */ new Map();
function ye({
  title: t,
  defaultOpen: e = !0,
  variant: o = "sub",
  open: n,
  onToggle: r,
  persistKey: s,
  children: i
}) {
  const l = jt(), [a, c] = tt(() => s && Mr.has(s) ? !!Mr.get(s) : e), h = n ?? a, p = o === "group", d = lt(null), [f, g] = tt(0);
  return bt(() => {
    !s || n !== void 0 || Mr.set(s, h);
  }, [s, n, h]), qr(() => {
    const y = d.current;
    if (!y) return;
    const m = () => g(y.scrollHeight);
    m();
    const b = new ResizeObserver(() => m());
    return b.observe(y), () => b.disconnect();
  }, [i]), /* @__PURE__ */ k(
    "section",
    {
      style: {
        border: `1px solid ${l.border}`,
        borderRadius: l.controlBorderRadius,
        background: p ? l.panelBg : l.controlBg,
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
              r ? r() : c((y) => !y);
            },
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "transparent",
              border: "none",
              color: p ? l.textMuted : l.textSecondary,
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
                    color: l.textMuted,
                    display: "inline-block",
                    transform: h ? "rotate(90deg)" : "rotate(0deg)",
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
              maxHeight: h ? f : 0,
              opacity: h ? 1 : 0,
              transition: "max-height 200ms ease, opacity 140ms ease",
              overflow: "hidden",
              pointerEvents: h ? "auto" : "none"
            },
            children: /* @__PURE__ */ u(
              "div",
              {
                ref: d,
                style: {
                  padding: "8px 10px 10px",
                  borderTop: `1px solid ${l.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: p ? "transparent" : l.controlBg
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
function ks({ style: t }) {
  const e = jt();
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
const Uu = /* @__PURE__ */ k("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ u("path", { d: "m21 21-4.35-4.35" })
] });
function Jn({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: n
}) {
  var x, S;
  const r = jt(), [s, i] = tt(!1), [l, a] = tt(""), c = lt(null), h = lt(null), [p, d] = tt(null), f = l.trim().toLowerCase(), g = Kt(
    () => o.filter((M) => M.toLowerCase().includes(f)),
    [o, f]
  ), y = Kt(
    () => En.filter(
      (M) => !o.includes(M.key) && (M.key.toLowerCase().includes(f) || M.label.toLowerCase().includes(f))
    ),
    [o, f]
  );
  bt(() => {
    if (!s || !h.current) return;
    const M = h.current.getBoundingClientRect(), I = 260, R = 16;
    let C = M.left;
    C + I > window.innerWidth - R && (C = window.innerWidth - I - R), C < R && (C = R), d({ top: M.bottom + 4, left: C });
  }, [s]), bt(() => {
    var R;
    if (!s) return;
    const M = (C) => {
      var ct, O;
      const P = C.target;
      if ((ct = c.current) != null && ct.contains(P)) return;
      const U = (((O = c.current) == null ? void 0 : O.ownerDocument) ?? document).getElementById("font-picker-popover");
      U != null && U.contains(P) || i(!1);
    }, I = ((R = c.current) == null ? void 0 : R.ownerDocument) ?? document;
    return I.addEventListener("mousedown", M), () => I.removeEventListener("mousedown", M);
  }, [s]);
  const m = (M) => {
    e(M), i(!1), a("");
  }, b = (M, I) => {
    const R = (I == null ? void 0 : I.label) ?? M, C = I == null ? void 0 : I.category, P = t === M;
    return /* @__PURE__ */ k(
      "button",
      {
        type: "button",
        onClick: () => m(M),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: P ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: no(M),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (j) => {
          P || (j.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (j) => {
          P || (j.currentTarget.style.background = "transparent");
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
              children: Ul(C)
            }
          ),
          /* @__PURE__ */ u("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: R })
        ]
      },
      M
    );
  };
  return /* @__PURE__ */ k("div", { ref: c, style: { position: "relative", flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ k(
      "button",
      {
        ref: h,
        type: "button",
        onClick: () => i((M) => !M),
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
          fontFamily: no(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...n
        },
        children: [
          /* @__PURE__ */ u("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((x = En.find((M) => M.key === t)) == null ? void 0 : x.label) ?? t }),
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
    s && p && je(
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
                  /* @__PURE__ */ u("span", { style: { color: "#64748b", display: "flex" }, children: Uu }),
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "text",
                      placeholder: "Quick search",
                      value: l,
                      onChange: (M) => a(M.target.value),
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
              g.length > 0 && /* @__PURE__ */ k("div", { style: { marginBottom: 12 }, children: [
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
                g.map((M) => b(M, En.find((I) => I.key === M)))
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
                y.length > 0 ? y.map((M) => b(M.key, M)) : /* @__PURE__ */ u(
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
      (((S = c.current) == null ? void 0 : S.ownerDocument) ?? document).body
    )
  ] });
}
function vs({ name: t, size: e = 16 }) {
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
const Zu = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], Qu = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Ju({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function yo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((n) => e(n) === o);
}
function $u({ engine: t, node: e, fontsInScene: o }) {
  const n = jt(), r = Be(t, e), s = jn(Qn) ?? [e], { data: i } = e, l = i.fill ?? null, a = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", h = yo(s, (b) => b.data.stroke), p = yo(s, (b) => b.data.fill ?? null), d = yo(s, (b) => b.data.fillStyle ?? "hachure"), f = yo(s, (b) => b.data.strokeStyle ?? "solid"), g = yo(s, (b) => b.data.strokeWidth), y = yo(s, (b) => b.data.roughness), m = yo(s, (b) => b.data.opacity ?? 1);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k(ye, { title: "Structure", persistKey: "shape.structure", children: [
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Shape" }),
        Qu.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => r({ shape: b.key }),
            style: {
              ...Ut,
              width: 28,
              height: 28,
              background: i.shape === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ u(Ju, { name: b.key })
          },
          b.key
        ))
      ] }),
      (i.shape === "rect" || i.shape === "diamond") && /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Edges" }),
        [
          { key: "sharp", label: "Sharp" },
          { key: "round", label: "Round" }
        ].map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => r({ edgeStyle: b.key === "sharp" ? void 0 : b.key }),
            style: {
              ...Ut,
              width: 28,
              height: 28,
              background: (i.edgeStyle ?? "sharp") === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ u(vs, { name: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Label" }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "text",
            value: i.label ?? "",
            placeholder: "Add label...",
            onChange: (b) => r({ label: b.target.value || void 0 }),
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
    i.label && /* @__PURE__ */ k(ye, { title: "Typography", defaultOpen: !1, persistKey: "shape.typography", children: [
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Font" }),
        /* @__PURE__ */ u(
          Jn,
          {
            value: i.labelFontFamily ?? "Excalifont",
            onChange: (b) => r({ labelFontFamily: b === "Excalifont" ? void 0 : b }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Size" }),
        Zu.map((b) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => r({ labelFontSize: b.size === 14 ? void 0 : b.size }),
            style: {
              ...Ut,
              width: 36,
              height: 28,
              background: (i.labelFontSize ?? 14) === b.size ? n.controlBgActive : n.controlBg,
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
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Align" }),
        xs.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.key,
            onClick: () => r({ labelAlign: b.key === "center" ? void 0 : b.key }),
            style: {
              ...Ut,
              width: 36,
              height: 28,
              background: (i.labelAlign ?? "center") === b.key ? n.controlBgActive : n.controlBg,
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
    /* @__PURE__ */ k(ye, { title: "Appearance", persistKey: "shape.appearance", children: [
      /* @__PURE__ */ u(
        xe,
        {
          label: "Stroke",
          palettes: Ce,
          value: h ? void 0 : i.stroke,
          mixed: h,
          onChange: (b) => r({ stroke: b })
        }
      ),
      /* @__PURE__ */ u(
        xe,
        {
          label: "Fill",
          palettes: ws,
          value: p ? void 0 : l,
          mixed: p,
          onChange: (b) => r({ fill: b ?? void 0 }),
          allowNull: !0
        }
      ),
      l && !p && /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Fill pattern" }),
        gs.map((b) => /* @__PURE__ */ u(
          "button",
          {
            title: b.label,
            onClick: () => r({ fillStyle: b.key }),
            style: {
              ...Ut,
              width: 36,
              height: 28,
              background: !d && a === b.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 9,
              borderRadius: n.controlBorderRadius
            },
            children: /* @__PURE__ */ u(ks, { style: b.key })
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ u(
        Zo,
        {
          label: "Stroke style",
          value: c,
          mixed: f,
          onChange: (b) => r({ strokeStyle: b })
        }
      ),
      /* @__PURE__ */ u(
        Qo,
        {
          label: "Stroke width",
          widths: bs,
          value: i.strokeWidth,
          mixed: g,
          onChange: (b) => r({ strokeWidth: b })
        }
      ),
      /* @__PURE__ */ u(
        ze,
        {
          value: i.opacity ?? 1,
          mixed: m,
          onChange: (b) => r({ opacity: b })
        }
      )
    ] }),
    /* @__PURE__ */ u(ye, { title: "Sketch", defaultOpen: !1, persistKey: "shape.sketch", children: /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Roughness" }),
      ms.map((b) => /* @__PURE__ */ u(
        "button",
        {
          title: b.label,
          onClick: () => r({ roughness: b.value }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 8px",
            background: !y && i.roughness === b.value ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 9,
            borderRadius: n.controlBorderRadius
          },
          children: b.label
        },
        b.value
      ))
    ] }) })
  ] });
}
function Bo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((n) => e(n) === o);
}
function _u({ engine: t, node: e }) {
  const o = jt(), n = Be(t, e), r = jn(Qn) ?? [e], { data: s } = e, i = s.fill ?? null, l = s.fillStyle ?? "hachure", a = s.strokeStyle ?? "solid", c = Bo(r, (y) => y.data.color), h = Bo(r, (y) => y.data.fill ?? null), p = Bo(r, (y) => y.data.fillStyle ?? "hachure"), d = Bo(r, (y) => y.data.strokeStyle ?? "solid"), f = Bo(r, (y) => y.data.strokeWidth), g = Bo(r, (y) => y.data.opacity ?? 1);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      xe,
      {
        label: "Stroke",
        palettes: Ce,
        value: c ? void 0 : s.color,
        mixed: c,
        onChange: (y) => n({ color: y })
      }
    ),
    /* @__PURE__ */ u(
      xe,
      {
        label: "Fill",
        palettes: ws,
        value: h ? void 0 : i,
        mixed: h,
        onChange: (y) => n({ fill: y ?? void 0 }),
        allowNull: !0
      }
    ),
    i && !h && /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Fill pattern" }),
      gs.map((y) => /* @__PURE__ */ u(
        "button",
        {
          title: y.label,
          onClick: () => n({ fillStyle: y.key }),
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: !p && l === y.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(ks, { style: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Zo,
      {
        label: "Stroke style",
        value: a,
        mixed: d,
        onChange: (y) => n({ strokeStyle: y })
      }
    ),
    /* @__PURE__ */ u(
      Qo,
      {
        label: "Stroke width",
        widths: Na,
        value: s.strokeWidth,
        mixed: f,
        onChange: (y) => n({ strokeWidth: y })
      }
    ),
    /* @__PURE__ */ u(
      ze,
      {
        value: s.opacity ?? 1,
        mixed: g,
        onChange: (y) => n({ opacity: y })
      }
    )
  ] });
}
function tp({ engine: t, node: e, fontsInScene: o }) {
  const n = jt(), r = Be(t, e), { data: s } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k(ye, { title: "Typography", persistKey: "text.typography", children: [
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Font" }),
        /* @__PURE__ */ u(
          Jn,
          {
            value: s.fontFamily,
            onChange: (i) => r({ fontFamily: i }),
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Size" }),
        Ha.map((i) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => r({ fontSize: i }),
            style: {
              ...Ut,
              width: 36,
              height: 28,
              background: s.fontSize === i ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 10,
              borderRadius: n.controlBorderRadius
            },
            children: i
          },
          i
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Align" }),
        xs.map((i) => /* @__PURE__ */ u(
          "button",
          {
            title: i.key,
            onClick: () => r({ align: i.key }),
            style: {
              ...Ut,
              width: 36,
              height: 28,
              background: s.align === i.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 12,
              borderRadius: n.controlBorderRadius
            },
            children: i.label
          },
          i.key
        ))
      ] })
    ] }),
    /* @__PURE__ */ k(ye, { title: "Appearance", persistKey: "text.appearance", children: [
      /* @__PURE__ */ u(
        xe,
        {
          label: "Color",
          palettes: Ce,
          value: s.color,
          onChange: (i) => r({ color: i })
        }
      ),
      /* @__PURE__ */ u(
        gn,
        {
          borderColor: s.borderColor ?? null,
          borderStyle: s.borderStyle,
          borderWidth: s.borderWidth,
          onChange: (i, l) => r({ [i]: l })
        }
      ),
      /* @__PURE__ */ u(
        ze,
        {
          value: s.opacity ?? 1,
          onChange: (i) => r({ opacity: i })
        }
      )
    ] })
  ] });
}
function ep({ engine: t, node: e }) {
  const o = jt(), n = Be(t, e), { data: r } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k(ye, { title: "Line", persistKey: "edge.line", children: [
      /* @__PURE__ */ u(
        xe,
        {
          label: "Color",
          palettes: Ce,
          value: r.color,
          onChange: (s) => n({ color: s })
        }
      ),
      /* @__PURE__ */ u(
        Zo,
        {
          label: "Style",
          value: r.style,
          onChange: (s) => n({ style: s })
        }
      ),
      /* @__PURE__ */ u(
        Qo,
        {
          label: "Width",
          widths: pu,
          value: r.strokeWidth,
          onChange: (s) => n({ strokeWidth: s })
        }
      )
    ] }),
    /* @__PURE__ */ k(ye, { title: "Arrows", persistKey: "edge.arrows", children: [
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Head" }),
        ["none", "arrow", "filled", "dot"].map((s) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n({ arrowHead: s }),
            style: {
              ...Ut,
              height: 28,
              padding: "0 6px",
              background: (r.arrowHead ?? "none") === s ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: s === "none" ? "None" : s === "arrow" ? "▷" : s === "filled" ? "▶" : "●"
          },
          s
        ))
      ] }),
      (r.arrowHead ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Head size" }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: r.arrowHeadSize ?? Math.max(8, r.strokeWidth * 3),
            onChange: (s) => n({ arrowHeadSize: Number(s.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ u("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: r.arrowHeadSize ?? Math.max(8, r.strokeWidth * 3) })
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Tail" }),
        ["none", "arrow", "filled", "dot"].map((s) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n({ arrowTail: s }),
            style: {
              ...Ut,
              height: 28,
              padding: "0 6px",
              background: (r.arrowTail ?? "none") === s ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: s === "none" ? "None" : s === "arrow" ? "◁" : s === "filled" ? "◀" : "●"
          },
          s
        ))
      ] }),
      (r.arrowTail ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Tail size" }),
        /* @__PURE__ */ u(
          "input",
          {
            type: "range",
            min: 4,
            max: 40,
            step: 1,
            value: r.arrowTailSize ?? Math.max(8, r.strokeWidth * 3),
            onChange: (s) => n({ arrowTailSize: Number(s.target.value) }),
            style: { flex: 1, accentColor: o.accentColor }
          }
        ),
        /* @__PURE__ */ u("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: r.arrowTailSize ?? Math.max(8, r.strokeWidth * 3) })
      ] })
    ] }),
    /* @__PURE__ */ k(ye, { title: "Path & Motion", defaultOpen: !1, persistKey: "edge.path-motion", children: [
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Path" }),
        [
          { key: "bezier", label: "Bezier" },
          { key: "straight", label: "Straight" },
          { key: "smoothstep", label: "Smooth" },
          { key: "step", label: "Step" }
        ].map((s) => /* @__PURE__ */ u(
          "button",
          {
            title: s.label,
            onClick: () => n({ edgeType: s.key }),
            style: {
              ...Ut,
              height: 28,
              padding: "0 6px",
              background: (r.edgeType ?? "bezier") === s.key ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 9,
              borderRadius: o.controlBorderRadius
            },
            children: s.label
          },
          s.key
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Animate" }),
        /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n({ animated: !r.animated }),
            style: {
              ...Ut,
              height: 28,
              padding: "0 12px",
              background: r.animated ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 11,
              borderRadius: o.controlBorderRadius
            },
            children: r.animated ? "On" : "Off"
          }
        )
      ] }),
      r.animated && /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Direction" }),
        ["forward", "reverse", "both", "bop"].map((s) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => n({ animatedDirection: s }),
            style: {
              ...Ut,
              height: 28,
              padding: "0 6px",
              background: (r.animatedDirection ?? "forward") === s ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 10,
              borderRadius: o.controlBorderRadius
            },
            children: s === "forward" ? "→" : s === "reverse" ? "←" : s === "both" ? "⇆" : "~"
          },
          s
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Roughness" }),
        ms.map((s) => /* @__PURE__ */ u(
          "button",
          {
            title: s.label,
            onClick: () => n({ roughness: s.value }),
            style: {
              ...Ut,
              height: 28,
              padding: "0 8px",
              background: (r.roughness ?? 0) === s.value ? o.controlBgActive : o.controlBg,
              color: o.text,
              fontSize: 9,
              borderRadius: o.controlBorderRadius
            },
            children: s.label
          },
          s.value
        ))
      ] })
    ] }),
    /* @__PURE__ */ u(ye, { title: "Label", defaultOpen: !1, persistKey: "edge.label", children: /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Text" }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          value: r.label ?? "",
          onChange: (s) => n({ label: s.target.value || void 0 }),
          placeholder: "Edge label...",
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
function op({ engine: t, node: e }) {
  const o = jt(), [n, r] = tt("idle"), s = Be(t, e), { data: i } = e, l = !!i.crop;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      gn,
      {
        borderColor: i.borderColor ?? null,
        borderStyle: i.borderStyle,
        borderWidth: i.borderWidth,
        onChange: (a, c) => s({ [a]: c })
      }
    ),
    /* @__PURE__ */ k("div", { style: { ...Lt, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Crop" }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => t.requestImageCrop(e.id),
          style: {
            ...Ut,
            height: 28,
            padding: "0 10px",
            background: o.controlBg,
            color: o.text,
            fontSize: 10,
            borderRadius: o.controlBorderRadius
          },
          children: "Crop"
        }
      ),
      l && /* @__PURE__ */ u(
        "button",
        {
          onClick: () => s({ crop: void 0 }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 10px",
            background: o.controlBg,
            color: o.textMuted,
            fontSize: 10,
            borderRadius: o.controlBorderRadius
          },
          children: "Reset"
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: { ...Lt, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Background" }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: async () => {
            if (n !== "loading") {
              r("loading");
              try {
                const { removeBackground: a } = await import("@imgly/background-removal"), h = await (await fetch(i.src)).blob(), p = await a(h), d = new FileReader(), f = await new Promise((g, y) => {
                  d.onload = () => g(d.result), d.onerror = y, d.readAsDataURL(p);
                });
                s({ src: f }), r("idle");
              } catch (a) {
                console.error("Background removal failed:", a), r("error"), setTimeout(() => r("idle"), 3e3);
              }
            }
          },
          disabled: n === "loading",
          style: {
            ...Ut,
            height: 28,
            padding: "0 10px",
            background: n === "error" ? o.error : o.controlBg,
            color: o.text,
            fontSize: 10,
            borderRadius: o.controlBorderRadius,
            gap: 4,
            opacity: n === "loading" ? 0.6 : 1
          },
          children: n === "loading" ? "Removing..." : n === "error" ? "Failed" : "Remove BG"
        }
      )
    ] }),
    /* @__PURE__ */ u(
      ze,
      {
        value: i.opacity ?? 1,
        onChange: (a) => s({ opacity: a })
      }
    )
  ] });
}
function np({ engine: t, node: e }) {
  const o = jt(), n = Be(t, e), { data: r } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      gn,
      {
        borderColor: r.borderColor ?? null,
        borderStyle: r.borderStyle,
        borderWidth: r.borderWidth,
        onChange: (s, i) => n({ [s]: i })
      }
    ),
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ u(
        "button",
        {
          title: s.label,
          onClick: () => n({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...Ut,
            width: 28,
            height: 28,
            background: (r.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(vs, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ze,
      {
        value: r.opacity ?? 1,
        onChange: (s) => n({ opacity: s })
      }
    )
  ] });
}
const an = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, rp = su();
function sp({
  value: t,
  onChange: e,
  theme: o
}) {
  const [n, r] = tt(String(t));
  bt(() => r(String(t)), [t]);
  const s = () => {
    const i = parseInt(n, 10);
    !isNaN(i) && i >= 100 && i <= 5e3 ? e(i) : r(String(t));
  };
  return /* @__PURE__ */ k("div", { style: Lt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Duration" }),
    /* @__PURE__ */ u(
      "input",
      {
        type: "number",
        min: 100,
        max: 5e3,
        step: 50,
        value: n,
        onChange: (i) => r(i.target.value),
        onBlur: s,
        onKeyDown: (i) => {
          i.key === "Enter" && s();
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
    /* @__PURE__ */ u("span", { style: { fontSize: 10, color: o.textMuted }, children: "ms" })
  ] });
}
function ip({ engine: t, node: e }) {
  const o = jt(), n = Be(t, e), { data: r } = e, s = it(
    (l) => {
      var d;
      if (!l) {
        n({ devicePreset: void 0 });
        return;
      }
      const a = Gr(l);
      if (!a) return;
      const c = Fa(a), h = Math.round(e.w / c), p = { devicePreset: l };
      (!r.label || ((d = Gr(r.devicePreset ?? "")) == null ? void 0 : d.label) === r.label) && (p.label = a.label), n(p), t.updateNodeWithHistory(e.id, { h });
    },
    [t, e, r.label, r.devicePreset, n]
  ), i = Kt(() => {
    const l = t.getAllNodes().filter((d) => d.type === "frame"), a = l.length, c = /* @__PURE__ */ new Set();
    for (const d of l)
      d.id !== e.id && d.data.slideOrder != null && c.add(d.data.slideOrder);
    const h = [];
    for (let d = 1; d <= a; d++)
      c.has(d) || h.push(d);
    const p = e.data.slideOrder;
    return p != null && !h.includes(p) && (h.push(p), h.sort((d, f) => d - f)), h;
  }, [t, e]);
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Label" }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          value: r.label ?? "",
          onChange: (l) => n({ label: l.target.value || void 0 }),
          placeholder: "Frame label...",
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
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Device" }),
      /* @__PURE__ */ k(
        "select",
        {
          value: r.devicePreset ?? "",
          onChange: (l) => s(l.target.value),
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
            /* @__PURE__ */ u("option", { value: "", children: "Freeform" }),
            rp.map((l) => /* @__PURE__ */ u("optgroup", { label: l.label, children: l.presets.map((a) => /* @__PURE__ */ k("option", { value: a.key, children: [
              a.label,
              " (",
              a.w,
              "×",
              a.h,
              ")"
            ] }, a.key)) }, l.label))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ u(
      xe,
      {
        label: "Background",
        palettes: Ce,
        value: (() => {
          const l = r.backgroundColor;
          if (!l) return null;
          for (const a of Ce) {
            const c = a.colors.find((h) => l === `${h}15`);
            if (c) return c;
          }
          return l.length === 9 && l.endsWith("15") ? l.slice(0, 7) : null;
        })(),
        onChange: (l) => n({ backgroundColor: l ? `${l}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ u(
      xe,
      {
        label: "Border",
        palettes: Ce,
        value: r.borderColor,
        onChange: (l) => n({ borderColor: l })
      }
    ),
    /* @__PURE__ */ u(
      Zo,
      {
        label: "Style",
        value: r.borderStyle ?? "dashed",
        onChange: (l) => n({ borderStyle: l })
      }
    ),
    /* @__PURE__ */ u(
      Qo,
      {
        label: "Width",
        value: r.borderWidth ?? 1,
        onChange: (l) => n({ borderWidth: l })
      }
    ),
    /* @__PURE__ */ u(
      ze,
      {
        value: r.opacity ?? 1,
        onChange: (l) => n({ opacity: l })
      }
    ),
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Slide #" }),
      /* @__PURE__ */ k(
        "select",
        {
          value: r.slideOrder ?? "",
          onChange: (l) => {
            const a = l.target.value;
            n({ slideOrder: a ? parseInt(a, 10) : void 0 });
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
            /* @__PURE__ */ u("option", { value: "", children: "Auto" }),
            i.map((l) => /* @__PURE__ */ u("option", { value: l, children: l }, l))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Transition" }),
      /* @__PURE__ */ k(
        "select",
        {
          value: r.transition ?? "pan",
          onChange: (l) => {
            const a = l.target.value;
            n({ transition: a === "pan" ? void 0 : a, transitionDuration: void 0 });
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
            /* @__PURE__ */ u("option", { value: "pan", children: "Pan" }),
            /* @__PURE__ */ u("option", { value: "fade", children: "Fade to Black" }),
            /* @__PURE__ */ u("option", { value: "dissolve", children: "Dissolve" }),
            /* @__PURE__ */ u("option", { value: "zoom", children: "Zoom" }),
            /* @__PURE__ */ u("option", { value: "fold", children: "Fold" }),
            /* @__PURE__ */ u("option", { value: "cube", children: "Cube" }),
            /* @__PURE__ */ u("option", { value: "none", children: "None (instant)" })
          ]
        }
      )
    ] }),
    (r.transition ?? "pan") !== "none" && /* @__PURE__ */ u(
      sp,
      {
        value: r.transitionDuration ?? an[r.transition ?? "pan"],
        onChange: (l) => n({ transitionDuration: l === an[r.transition ?? "pan"] ? void 0 : l }),
        theme: o
      }
    )
  ] });
}
function ap({ engine: t, node: e }) {
  const o = jt(), n = Be(t, e), { data: r } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      xe,
      {
        label: "Color",
        palettes: gu,
        value: r.color,
        onChange: (s) => {
          s && n({ color: s });
        }
      }
    ),
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Size" }),
      [12, 14, 16, 20, 24].map((s) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => n({ fontSize: s }),
          style: {
            ...Ut,
            width: 32,
            height: 24,
            background: (r.fontSize ?? 16) === s ? o.controlBgActive : o.controlBg,
            borderRadius: o.controlBorderRadius,
            fontSize: 10,
            color: o.text
          },
          children: s
        },
        s
      ))
    ] }),
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ u(
        "button",
        {
          title: s.label,
          onClick: () => n({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...Ut,
            width: 28,
            height: 28,
            background: (r.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(vs, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ze,
      {
        value: r.opacity ?? 1,
        onChange: (s) => n({ opacity: s })
      }
    )
  ] });
}
function lp({ engine: t, node: e }) {
  const o = jt(), n = Be(t, e), { data: r } = e;
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "URL" }),
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
      gn,
      {
        borderColor: r.borderColor ?? null,
        borderStyle: r.borderStyle,
        borderWidth: r.borderWidth,
        onChange: (s, i) => n({ [s]: i })
      }
    ),
    /* @__PURE__ */ u(
      ze,
      {
        value: r.opacity ?? 1,
        onChange: (s) => n({ opacity: s })
      }
    )
  ] });
}
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
    t === "arrow" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const dp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function hp({ engine: t, mode: e, fontsInScene: o }) {
  const n = jt(), [, r] = tt(0), s = it(() => r((g) => g + 1), []), i = t.activeTool;
  if (e === "text") {
    const g = i.fontFamily ?? oo, y = i.fontSize ?? 20, m = i.textAlign ?? "left", b = i.color;
    return /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Font" }),
        /* @__PURE__ */ u(
          Jn,
          {
            value: g,
            onChange: (x) => {
              i.fontFamily = x, s();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Size" }),
        Ha.map((x) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => {
              i.fontSize = x, s();
            },
            style: {
              ...Ut,
              width: 36,
              height: 28,
              background: y === x ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 10,
              borderRadius: n.controlBorderRadius
            },
            children: x
          },
          x
        ))
      ] }),
      /* @__PURE__ */ k("div", { style: Lt, children: [
        /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Align" }),
        xs.map((x) => /* @__PURE__ */ u(
          "button",
          {
            title: x.key,
            onClick: () => {
              i.textAlign = x.key, s();
            },
            style: {
              ...Ut,
              width: 36,
              height: 28,
              background: m === x.key ? n.controlBgActive : n.controlBg,
              color: n.text,
              fontSize: 12,
              borderRadius: n.controlBorderRadius
            },
            children: x.label
          },
          x.key
        ))
      ] }),
      /* @__PURE__ */ u(
        xe,
        {
          label: "Color",
          palettes: Ce,
          value: b,
          onChange: (x) => {
            i.color = x, s();
          }
        }
      ),
      /* @__PURE__ */ u(
        ze,
        {
          value: i.opacity ?? 1,
          onChange: (x) => {
            i.opacity = x, s();
          }
        }
      )
    ] });
  }
  const l = e === "shape", a = i.color, c = i.fillColor ?? null, h = i.fillStyle ?? "hachure", p = i.strokeStyle ?? "solid", d = i.width, f = i.roughness ?? 1;
  return /* @__PURE__ */ k(mt, { children: [
    l && /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Shape" }),
      dp.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => {
            i.shapeType = g.key, s();
          },
          style: {
            ...Ut,
            width: 28,
            height: 28,
            background: (i.shapeType ?? "rect") === g.key ? n.controlBgActive : n.controlBg,
            color: n.text,
            borderRadius: n.controlBorderRadius
          },
          children: /* @__PURE__ */ u(cp, { name: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ u(
      xe,
      {
        label: "Stroke",
        palettes: Ce,
        value: a,
        onChange: (g) => {
          i.color = g, s();
        }
      }
    ),
    /* @__PURE__ */ u(
      xe,
      {
        label: "Fill",
        palettes: ws,
        value: c,
        onChange: (g) => {
          i.fillColor = g ?? void 0, s();
        },
        allowNull: !0
      }
    ),
    c && /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Fill pattern" }),
      gs.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => {
            i.fillStyle = g.key, s();
          },
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: h === g.key ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 9,
            borderRadius: n.controlBorderRadius
          },
          children: /* @__PURE__ */ u(ks, { style: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Zo,
      {
        label: "Stroke style",
        value: p,
        onChange: (g) => {
          i.strokeStyle = g, s();
        }
      }
    ),
    /* @__PURE__ */ u(
      Qo,
      {
        label: "Stroke width",
        widths: l ? bs : Na,
        value: d,
        onChange: (g) => {
          i.width = g, s();
        }
      }
    ),
    l && /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Roughness" }),
      ms.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => {
            i.roughness = g.value, s();
          },
          style: {
            ...Ut,
            height: 28,
            padding: "0 8px",
            background: f === g.value ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 9,
            borderRadius: n.controlBorderRadius
          },
          children: g.label
        },
        g.value
      ))
    ] }),
    /* @__PURE__ */ u(
      ze,
      {
        value: i.opacity ?? 1,
        onChange: (g) => {
          i.opacity = g, s();
        }
      }
    )
  ] });
}
function up({ engine: t, node: e, PanelComponent: o }) {
  const n = Be(t, e);
  return /* @__PURE__ */ u(o, { node: e, data: e.data, engine: t, updateData: n });
}
const Vr = {
  shape: "Shape",
  draw: "Drawing",
  text: "Text",
  edge: "Edge",
  image: "Image",
  content: "Content",
  frame: "Frame",
  sticky: "Sticky Note",
  youtube: "YouTube"
}, pp = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), fp = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function yp(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const n of t.getAllNodes()) {
    let r;
    n.type === "text" ? r = n.data.fontFamily : n.type === "shape" && (r = n.data.labelFontFamily), r && !e.has(r) && (e.add(r), o.push(r));
  }
  return o;
}
function gp({ label: t }) {
  const e = jt();
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
function mp({
  engine: t,
  open: e,
  onToggle: o
}) {
  const n = jt(), [r, s] = tt(t.snapToGrid), [i, l] = tt(t.gridSize), [a, c] = tt(t.smartGuides), [h, p] = tt(t.boardBackground);
  bt(() => {
    const f = () => {
      s(t.snapToGrid), l(t.gridSize), c(t.smartGuides);
    }, g = () => p(t.boardBackground);
    return t.on("guides", f), t.on("background", g), () => {
      t.off("guides", f), t.off("background", g);
    };
  }, [t]);
  const d = [10, 20, 40, 80];
  return /* @__PURE__ */ k(ye, { title: "Canvas", defaultOpen: !1, variant: "group", open: e, onToggle: o, children: [
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Grid" }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => t.toggleSnapToGrid(),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: r ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: r ? "On" : "Off"
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Grid size" }),
      /* @__PURE__ */ u("div", { style: { display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }, children: d.map((f) => /* @__PURE__ */ k(
        "button",
        {
          onClick: () => t.setGridSize(f),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: i === f ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 10,
            padding: "4px 8px",
            cursor: "pointer"
          },
          children: [
            f,
            "px"
          ]
        },
        f
      )) })
    ] }),
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Guides" }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => t.toggleSmartGuides(),
          style: {
            border: "none",
            borderRadius: n.controlBorderRadius,
            background: a ? n.controlBgActive : n.controlBg,
            color: n.text,
            fontSize: 10,
            padding: "4px 10px",
            cursor: "pointer"
          },
          children: a ? "On" : "Off"
        }
      )
    ] }),
    /* @__PURE__ */ k("div", { style: Lt, children: [
      /* @__PURE__ */ u("span", { style: { ...Dt, color: n.textMuted }, children: "Paper" }),
      /* @__PURE__ */ u(
        "select",
        {
          value: h,
          onChange: (f) => t.setBoardBackground(f.target.value),
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
          children: Vo.map((f) => /* @__PURE__ */ u("option", { value: f.key, children: f.label }, f.key))
        }
      )
    ] })
  ] });
}
function Oa({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: n
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ u($u, { engine: t, node: e, fontsInScene: n });
    case "draw":
      return /* @__PURE__ */ u(_u, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ u(tp, { engine: t, node: e, fontsInScene: n });
    case "edge":
      return /* @__PURE__ */ u(ep, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ u(op, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ u(np, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ u(ip, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ u(ap, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ u(lp, { engine: t, node: e });
    default: {
      const r = o == null ? void 0 : o.get(e.type);
      return r != null && r.propertiesPanel ? /* @__PURE__ */ u(up, { engine: t, node: e, PanelComponent: r.propertiesPanel }) : null;
    }
  }
}
function Mi({
  engine: t,
  nodes: e
}) {
  const o = jt(), n = Math.round(e[0].rotation ?? 0), s = e.every(
    (c) => Math.round(c.rotation ?? 0) === n
  ) ? n : null, [i, l] = tt(null), a = it(
    (c) => {
      l(null);
      const h = parseFloat(c);
      if (isNaN(h)) return;
      const p = Math.max(-360, Math.min(360, h)), d = e.map((f) => ({
        id: f.id,
        patch: { rotation: p }
      }));
      t.batchUpdateWithHistory(d);
    },
    [t, e]
  );
  return /* @__PURE__ */ k("div", { style: Lt, children: [
    /* @__PURE__ */ u("span", { style: { ...Dt, color: o.textMuted }, children: "Rotation" }),
    /* @__PURE__ */ u(
      "input",
      {
        type: "number",
        min: -360,
        max: 360,
        value: i ?? (s !== null ? String(s) : ""),
        placeholder: s === null ? "Mixed" : void 0,
        onChange: (c) => l(c.target.value),
        onBlur: (c) => a(c.target.value),
        onKeyDown: (c) => {
          c.key === "Enter" && a(c.target.value), c.key === "Escape" && l(null);
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
function bp({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const n = it(
    (r, s) => {
      const i = r === "opacity" ? pp : fp, l = e.filter((a) => i.has(a.type)).map((a) => ({
        id: a.id,
        patch: {
          data: { ...a.data, [r]: s }
        }
      }));
      t.batchUpdateWithHistory(l);
    },
    [t, e]
  );
  return /* @__PURE__ */ k(mt, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ u(
      ze,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (r) => n("opacity", r)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ u(
      gn,
      {
        borderColor: o.borderColor === "mixed" ? void 0 : o.borderColor,
        borderStyle: o.borderStyle === "mixed" ? void 0 : o.borderStyle,
        borderWidth: o.borderWidth === "mixed" ? void 0 : o.borderWidth,
        mixed: {
          color: o.borderColor === "mixed",
          style: o.borderStyle === "mixed",
          width: o.borderWidth === "mixed"
        },
        onChange: (r, s) => n(r, s)
      }
    )
  ] });
}
function xp({
  engine: t,
  target: e
}) {
  const o = jt();
  if (e.kind !== "single" && e.kind !== "multi") return null;
  const n = Array.from(t.selection), r = n.length > 0, s = n.length >= 2 || t.selectionHasGroup(), i = n.some((c) => {
    var h;
    return (h = t.getNode(c)) == null ? void 0 : h.locked;
  }), l = n.some((c) => {
    var h;
    return !((h = t.getNode(c)) != null && h.locked);
  }), a = [
    {
      label: "Cut",
      disabled: !r,
      action: () => t.cutSelected()
    },
    {
      label: "Copy",
      disabled: !r,
      action: () => t.copySelected()
    },
    {
      label: "Paste",
      disabled: !t.hasClipboard(),
      action: () => t.pasteClipboard()
    },
    {
      label: "Duplicate",
      disabled: !r,
      action: () => t.duplicateSelected()
    },
    {
      label: "Group",
      disabled: !s || n.length < 2,
      action: () => t.groupSelected()
    },
    {
      label: "Ungroup",
      disabled: !s || !t.selectionHasGroup(),
      action: () => t.ungroupSelected()
    },
    {
      label: "Lock",
      disabled: !l,
      action: () => {
        for (const c of n) t.updateNode(c, { locked: !0 });
      }
    },
    {
      label: "Unlock",
      disabled: !i,
      action: () => {
        for (const c of n) t.updateNode(c, { locked: void 0 });
      }
    },
    {
      label: "Delete",
      disabled: !r,
      danger: !0,
      action: () => t.deleteSelected()
    }
  ];
  return /* @__PURE__ */ u(ye, { title: "Actions", defaultOpen: !0, variant: "group", persistKey: "touch-actions", children: /* @__PURE__ */ u("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: a.map((c) => /* @__PURE__ */ u(
    "button",
    {
      type: "button",
      disabled: c.disabled,
      onClick: c.action,
      style: {
        border: `1px solid ${o.border}`,
        borderRadius: 999,
        background: c.disabled ? o.controlBg : o.controlBgActive,
        color: c.danger ? "#fecaca" : o.text,
        opacity: c.disabled ? 0.45 : 0.95,
        padding: "5px 10px",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.01em",
        cursor: c.disabled ? "default" : "pointer",
        whiteSpace: "nowrap"
      },
      children: c.label
    },
    c.label
  )) }) });
}
function wp({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: n,
  open: r,
  onToggle: s
}) {
  const i = Vr[e.type] ?? e.type, l = e.nodes.length, a = e.nodes[0], c = `${i} (${l})`;
  return /* @__PURE__ */ u(ye, { title: c, defaultOpen: !1, variant: "group", open: r, onToggle: s, children: /* @__PURE__ */ u(Qn.Provider, { value: e.nodes, children: /* @__PURE__ */ u(
    Oa,
    {
      engine: t,
      node: a,
      registry: o,
      fontsInScene: n
    }
  ) }) });
}
function kp(t) {
  switch (t.kind) {
    case "none":
      return "No selection";
    case "tool":
      return `${t.mode.charAt(0).toUpperCase() + t.mode.slice(1)} tool`;
    case "single":
      return Vr[t.node.type] ?? t.node.type;
    case "multi":
      return t.typeGroups.map(
        (o) => `${o.nodes.length} ${(Vr[o.type] ?? o.type).toLowerCase()}${o.nodes.length > 1 ? "s" : ""}`
      ).join(", ");
  }
}
function Ci({
  engine: t,
  registry: e,
  target: o,
  commonProps: n
}) {
  const r = Kt(() => yp(t), [t, o]), s = kp(o), [i, l] = tt("shared"), [a, c] = tt(!1);
  return bt(() => {
    const h = () => {
      c(
        window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0
      );
    };
    return h(), window.addEventListener("resize", h), () => window.removeEventListener("resize", h);
  }, []), bt(() => {
    if (o.kind !== "multi") {
      l("shared");
      return;
    }
    (/* @__PURE__ */ new Set(["canvas", "shared", ...o.typeGroups.map((p) => p.type)])).has(i) || l("shared");
  }, [o, i]), /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(gp, { label: s }),
    /* @__PURE__ */ u(
      mp,
      {
        engine: t,
        open: o.kind === "multi" ? i === "canvas" : void 0,
        onToggle: o.kind === "multi" ? () => l((h) => h === "canvas" ? "" : "canvas") : void 0
      }
    ),
    a && /* @__PURE__ */ u(xp, { engine: t, target: o }),
    o.kind === "tool" && /* @__PURE__ */ u(hp, { engine: t, mode: o.mode, fontsInScene: r }),
    o.kind === "single" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u(
        Oa,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: r
        }
      ),
      /* @__PURE__ */ u(Mi, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ k(
        ye,
        {
          title: "Shared",
          defaultOpen: !0,
          variant: "group",
          open: i === "shared",
          onToggle: () => l((h) => h === "shared" ? "" : "shared"),
          children: [
            /* @__PURE__ */ u(bp, { engine: t, nodes: o.nodes, commonProps: n }),
            /* @__PURE__ */ u(Mi, { engine: t, nodes: o.nodes })
          ]
        }
      ),
      o.typeGroups.map((h) => /* @__PURE__ */ u(
        wp,
        {
          engine: t,
          group: h,
          registry: e,
          fontsInScene: r,
          open: i === h.type,
          onToggle: () => l((p) => p === h.type ? "" : h.type)
        },
        h.type
      ))
    ] })
  ] });
}
function vp({ engine: t, registry: e }) {
  const o = jt(), { target: n, commonProps: r } = Ku(t), s = n.kind !== "none", i = it((X, N) => {
    const V = X.trim();
    if (V.startsWith("#")) {
      const H = V.slice(1), _ = H.length === 3 ? H.split("").map((et) => et + et).join("") : H;
      if (_.length === 6) {
        const et = parseInt(_.slice(0, 2), 16), ot = parseInt(_.slice(2, 4), 16), ut = parseInt(_.slice(4, 6), 16);
        return `rgba(${et}, ${ot}, ${ut}, ${N})`;
      }
    }
    return V.startsWith("rgb(") ? `rgba(${V.slice(4, -1)}, ${N})` : (V.startsWith("rgba("), V);
  }, []), [l, a] = tt(!1), [c, h] = tt(!1), [p, d] = tt(!1), [f, g] = tt(!1), y = lt(null), m = lt(!1), b = it(() => typeof window > "u" ? !1 : window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0, []), x = it(
    (X) => {
      const N = b() ? 1366 : 1024;
      return X <= N;
    },
    [b]
  ), S = lt(null), [M, I] = tt(null), R = lt(null), [C, P] = tt(!1), j = it(() => {
    var V, H;
    const X = (V = S.current) == null ? void 0 : V.offsetParent;
    if (X) return { width: X.clientWidth, height: X.clientHeight };
    const N = ((H = S.current) == null ? void 0 : H.ownerDocument.defaultView) ?? window;
    return { width: N.innerWidth, height: N.innerHeight };
  }, []), U = it(() => {
    const { width: X } = j();
    return { x: X - sn - 16, y: 12 };
  }, [j]), ct = M ?? U(), O = lt(!1);
  qr(() => {
    if (!O.current && S.current && !M) {
      O.current = !0;
      const X = S.current.offsetParent;
      X && I({ x: X.clientWidth - sn - 16, y: 12 });
    }
  }), bt(() => {
    var H, _;
    const X = ((H = S.current) == null ? void 0 : H.offsetParent) ?? ((_ = S.current) == null ? void 0 : _.ownerDocument.body);
    if (!X) return;
    const N = new ResizeObserver((et) => {
      var pt;
      const ot = ((pt = et[0]) == null ? void 0 : pt.contentRect.width) ?? X.clientWidth;
      a(ot < 600);
      const ut = x(ot);
      h(ut), m.current || (g(ut), m.current = !0);
    });
    N.observe(X), a(X.clientWidth < 600);
    const V = x(X.clientWidth);
    return h(V), m.current || (g(V), m.current = !0), () => N.disconnect();
  }, [x]), bt(() => {
    var rt;
    const X = ((rt = S.current) == null ? void 0 : rt.ownerDocument) ?? document, N = () => {
      y.current !== null && window.clearTimeout(y.current), y.current = window.setTimeout(() => {
        d(!1), y.current = null;
      }, 200);
    }, V = () => {
      y.current !== null && (window.clearTimeout(y.current), y.current = null), d(!0);
    }, H = (St) => !!(St instanceof Element && St.closest("[data-sb-canvas]")), _ = (St) => {
      St.button !== 2 && H(St.target) && V();
    }, et = () => N(), ot = () => N(), ut = (St) => {
      H(St.target) && V();
    }, pt = () => N(), Tt = (St) => {
      var ht;
      ((ht = St.detail) == null ? void 0 : ht.active) ? V() : N();
    };
    return X.addEventListener("pointerdown", _, !0), X.addEventListener("pointerup", et, !0), X.addEventListener("pointercancel", ot, !0), X.addEventListener("focusin", ut, !0), X.addEventListener("focusout", pt, !0), X.addEventListener("sb:canvas-interaction", Tt), () => {
      X.removeEventListener("pointerdown", _, !0), X.removeEventListener("pointerup", et, !0), X.removeEventListener("pointercancel", ot, !0), X.removeEventListener("focusin", ut, !0), X.removeEventListener("focusout", pt, !0), X.removeEventListener("sb:canvas-interaction", Tt), y.current !== null && (window.clearTimeout(y.current), y.current = null);
    };
  }, []);
  const nt = it(
    (X) => {
      X.stopPropagation(), P(!0);
      const N = M ? M.x : U().x, V = M ? M.y : U().y;
      R.current = {
        startX: X.clientX,
        startY: X.clientY,
        startLeft: N,
        startTop: V
      }, X.currentTarget.setPointerCapture(X.pointerId);
    },
    [M, U]
  ), Q = it(
    (X) => {
      if (!R.current) return;
      X.stopPropagation();
      const N = X.clientX - R.current.startX, V = X.clientY - R.current.startY, { width: H, height: _ } = j(), et = Math.max(
        yn,
        Math.min(H - sn - 8, R.current.startLeft + N)
      ), ot = Math.max(
        8,
        Math.min(_ - 100, R.current.startTop + V)
      );
      I({ x: et, y: ot });
    },
    [j]
  ), J = it(() => {
    R.current = null, P(!1);
  }, []), E = f && p, G = i(o.panelBg, 0.9);
  return s ? l ? /* @__PURE__ */ k(
    "div",
    {
      ref: S,
      "data-sb-props-panel": !0,
      onPointerDown: (X) => X.stopPropagation(),
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
        opacity: E ? 0 : 1,
        transform: E ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: E ? "none" : "auto"
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
                    /* @__PURE__ */ u("span", { children: "Auto-hide" }),
                    /* @__PURE__ */ u(
                      "input",
                      {
                        type: "checkbox",
                        checked: f,
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
              Ci,
              {
                engine: t,
                registry: e,
                target: n,
                commonProps: r
              }
            )
          }
        )
      ]
    }
  ) : /* @__PURE__ */ k(
    "div",
    {
      ref: S,
      "data-sb-props-panel": !0,
      style: {
        position: "absolute",
        left: ct.x,
        top: ct.y,
        width: sn,
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
        opacity: E ? 0 : 1,
        transform: E ? "translateY(-4px) scale(0.995)" : "translateY(0) scale(1)",
        transformOrigin: "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: E ? "none" : "auto"
      },
      onPointerDown: (X) => X.stopPropagation(),
      onPointerMove: Q,
      onPointerUp: J,
      onPointerCancel: J,
      children: [
        /* @__PURE__ */ k(
          "div",
          {
            onPointerDown: nt,
            style: {
              cursor: C ? "grabbing" : "grab",
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
              /* @__PURE__ */ u("span", { style: { fontWeight: 600, letterSpacing: "0.02em" }, children: "Inspector" }),
              /* @__PURE__ */ k(
                "label",
                {
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
                    /* @__PURE__ */ u("span", { children: "Auto-hide" }),
                    /* @__PURE__ */ u(
                      "input",
                      {
                        type: "checkbox",
                        checked: f,
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
              Ci,
              {
                engine: t,
                registry: e,
                target: n,
                commonProps: r
              }
            )
          }
        )
      ]
    }
  ) : null;
}
function Sp({ engine: t, registry: e, gifApiBaseUrl: o }) {
  return /* @__PURE__ */ k(mt, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        "data-sb-sidebar": !0,
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: yn,
          zIndex: 100
        },
        onPointerDown: (n) => n.stopPropagation(),
        children: /* @__PURE__ */ u(Yu, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ u(vp, { engine: t, registry: e })
  ] });
}
const ln = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function Mp(t) {
  const e = t.viewport.zoom, o = ln.find((n) => n > e + 1e-3) ?? ln[ln.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function Cp(t) {
  const e = t.viewport.zoom, o = [...ln].reverse().find((n) => n < e - 1e-3) ?? ln[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const zp = {
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
}, de = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Re({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ u("path", { d: "M5 12h14", ...de }),
    t === "plus" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M12 5v14", ...de }),
      /* @__PURE__ */ u("path", { d: "M5 12h14", ...de })
    ] }),
    t === "undo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...de, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...de, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...de, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...de, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...de }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...de })
    ] }),
    t === "play" && /* @__PURE__ */ u("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...de }),
      /* @__PURE__ */ u("path", { d: "M6 6V18M18 6V18", ...de }),
      /* @__PURE__ */ u("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...de })
    ] }),
    t === "gauge" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 15a8 8 0 1 1 16 0", ...de }),
      /* @__PURE__ */ u("path", { d: "M12 15l4-4", ...de }),
      /* @__PURE__ */ u("circle", { cx: "12", cy: "15", r: "1.5", fill: "currentColor" })
    ] }),
    t === "home" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M3 12l9-8 9 8", ...de, fill: "none" }),
      /* @__PURE__ */ u("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...de, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...de, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function Ip({
  engine: t,
  framesPanelOpen: e,
  onToggleFramesPanel: o,
  showPerfOverlay: n,
  onTogglePerfOverlay: r
}) {
  const s = jt(), [i, l] = tt(t.viewport.zoom), [a, c] = tt(!1), [h, p] = tt(!1), [d, f] = tt(() => t.originView != null), [g, y] = tt(
    () => t.getAllNodes().filter((M) => M.type === "frame").length
  );
  bt(() => {
    const M = () => l(t.viewport.zoom), I = () => {
      c(t.canUndo()), p(t.canRedo());
    }, R = () => {
      y(t.getAllNodes().filter((C) => C.type === "frame").length), f(t.originView != null);
    };
    return t.on("viewport", M), t.on("history", I), t.on("change", R), t.on("node:create", R), t.on("node:delete", R), () => {
      t.off("viewport", M), t.off("history", I), t.off("change", R), t.off("node:create", R), t.off("node:delete", R);
    };
  }, [t]);
  const m = s.panelBg, b = `1px solid ${s.border}`, x = {
    ...zp,
    borderRadius: s.panelBorderRadius
  }, S = {
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
      onPointerDown: (M) => M.stopPropagation(),
      children: [
        /* @__PURE__ */ k("div", { style: { ...x, background: m, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: "Zoom out",
              onClick: () => Cp(t),
              style: { ...Se, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Re, { name: "minus" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ k(
            "button",
            {
              title: "Reset zoom to 100%",
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
                Math.round(i * 100),
                "%"
              ]
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: "Zoom in",
              onClick: () => Mp(t),
              style: { ...Se, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Re, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ k("div", { style: { ...x, background: m, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: "Fit to content (Ctrl+0)",
              onClick: () => t.fitToContent(),
              style: { ...Se, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Re, { name: "fit" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: d ? "Clear saved view" : "Save current view as origin",
              onClick: () => {
                d ? (t.clearOriginView(), f(!1)) : (t.setOriginView(), f(!0));
              },
              style: { ...Se, width: 32, height: 32, color: d ? s.accentColor : s.textFaint },
              children: /* @__PURE__ */ u(Re, { name: d ? "bookmark-fill" : "bookmark" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: "Go to saved view",
              onClick: () => {
                d && t.goToOriginView();
              },
              disabled: !d,
              style: { ...Se, width: 32, height: 32, color: d ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Re, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ k("div", { style: { ...x, overflow: "visible", background: m, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: "Present (frames as slides)",
              onClick: () => t.enterPresentation(),
              style: { ...Se, width: 32, height: 32, color: s.text },
              children: /* @__PURE__ */ u(Re, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ u("div", { style: S }),
            /* @__PURE__ */ k(
              "button",
              {
                title: "Toggle slides panel",
                onClick: o,
                style: {
                  ...Se,
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
          r && /* @__PURE__ */ k(mt, { children: [
            /* @__PURE__ */ u("div", { style: S }),
            /* @__PURE__ */ u(
              "button",
              {
                title: "Toggle performance overlay",
                onClick: r,
                style: {
                  ...Se,
                  width: 32,
                  height: 32,
                  color: n ? s.accentColor : s.textMuted
                },
                children: /* @__PURE__ */ u(Re, { name: "gauge" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ k("div", { style: { ...x, background: m, border: b, boxShadow: s.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: "Undo (Ctrl+Z)",
              onClick: () => t.undo(),
              disabled: !a,
              style: { ...Se, width: 32, height: 32, color: a ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Re, { name: "undo" })
            }
          ),
          /* @__PURE__ */ u("div", { style: S }),
          /* @__PURE__ */ u(
            "button",
            {
              title: "Redo (Ctrl+Shift+Z)",
              onClick: () => t.redo(),
              disabled: !h,
              style: { ...Se, width: 32, height: 32, color: h ? s.text : s.textFaint },
              children: /* @__PURE__ */ u(Re, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
const zi = 240, Ii = 6;
function Cr(t) {
  const o = t.getAllNodes().filter((h) => h.type === "frame");
  if (o.length === 0) return [];
  const n = o.map((h) => ({
    id: h.id,
    x: h.x,
    y: h.y,
    slideOrder: h.data.slideOrder,
    label: h.data.label || "",
    borderColor: h.data.borderColor,
    transition: h.data.transition,
    transitionDuration: h.data.transitionDuration
  })), r = n.filter((h) => h.slideOrder != null).sort((h, p) => h.slideOrder - p.slideOrder), s = n.filter((h) => h.slideOrder == null), i = 100;
  s.sort((h, p) => h.y - p.y);
  const l = [];
  for (const h of s) {
    const p = l[l.length - 1];
    p && Math.abs(h.y - p[0].y) < i ? p.push(h) : l.push([h]);
  }
  const a = l.flatMap((h) => h.sort((p, d) => p.x - d.x));
  return [...r, ...a].map((h, p) => ({
    id: h.id,
    label: h.label || `Frame ${p + 1}`,
    order: p + 1,
    slideOrder: h.slideOrder,
    borderColor: h.borderColor,
    transition: h.transition,
    transitionDuration: h.transitionDuration
  }));
}
const Tp = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Pp() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...Tp }) });
}
function Ap(t, e, o) {
  const [n, r] = tt("");
  return bt(() => {
    let s = !1;
    return ou(t, e).then((i) => {
      s || r(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), n;
}
function Ep({ engine: t, frameId: e, tick: o }) {
  const n = Ap(t, e, o);
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
const Ti = [
  { key: "pan", label: "Pan" },
  { key: "fade", label: "Fade" },
  { key: "dissolve", label: "Dissolve" },
  { key: "zoom", label: "Zoom" },
  { key: "fold", label: "Fold" },
  { key: "cube", label: "Cube" },
  { key: "none", label: "Cut" }
];
function Pi({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ u("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ u("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ u("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ u("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ u("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ u("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const Rp = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function Lp({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: n,
  theme: r
}) {
  var g;
  const [s, i] = tt(!1), [l, a] = tt(!1), c = lt(null), h = lt(null), p = t !== "none", d = e ?? an[t];
  bt(() => {
    if (!s && !l) return;
    const y = (m) => {
      s && c.current && !c.current.contains(m.target) && i(!1), l && h.current && !h.current.contains(m.target) && a(!1);
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [s, l]);
  const f = {
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
        zIndex: s || l ? 50 : void 0
      },
      children: [
        /* @__PURE__ */ u("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: r.border } }),
        /* @__PURE__ */ k("div", { ref: c, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ k("button", { onClick: () => {
            i((y) => !y), a(!1);
          }, style: f, children: [
            /* @__PURE__ */ u(Pi, { type: t }),
            /* @__PURE__ */ u("span", { children: ((g = Ti.find((y) => y.key === t)) == null ? void 0 : g.label) ?? "Pan" }),
            /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: s ? "▲" : "▼" })
          ] }),
          s && /* @__PURE__ */ u(
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
              children: Ti.map((y) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    o(y.key), i(!1);
                  },
                  style: {
                    border: "none",
                    background: y.key === t ? r.controlBgActive : "transparent",
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
                    /* @__PURE__ */ u(Pi, { type: y.key }),
                    y.label
                  ]
                },
                y.key
              ))
            }
          )
        ] }),
        p && /* @__PURE__ */ k("div", { ref: h, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ k("button", { onClick: () => {
            a((y) => !y), i(!1);
          }, style: f, children: [
            /* @__PURE__ */ k("span", { children: [
              d,
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
              children: Rp.map((y) => /* @__PURE__ */ k(
                "button",
                {
                  onClick: () => {
                    n(y === an[t] ? void 0 : y), a(!1);
                  },
                  style: {
                    border: "none",
                    background: y === d ? r.controlBgActive : "transparent",
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
                    y === an[t] ? " •" : ""
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
function Dp({ engine: t, open: e, onClose: o }) {
  const n = jt(), [r, s] = tt(() => Cr(t)), [i, l] = tt(() => new Set(t.selection)), [a, c] = tt(0), h = lt(null), p = lt(null), d = lt(0), f = lt(!1), g = lt(r);
  g.current = r;
  const y = lt(!1), m = lt(!1), [b, x] = tt(null), [S, M] = tt(null), [I, R] = tt(0), C = lt([]), P = lt(null), j = it(() => {
    if (y.current) return;
    const J = Cr(t);
    s(J);
  }, [t]), U = it(() => {
    l(new Set(t.selection));
  }, [t]), ct = lt(null), O = it(() => {
    ct.current && clearTimeout(ct.current), ct.current = setTimeout(() => c((J) => J + 1), 500);
  }, []);
  bt(() => {
    j(), U();
    const J = setTimeout(() => c((G) => G + 1), 200), E = () => {
      j(), O();
    };
    return t.on("change", E), t.on("node:create", E), t.on("node:delete", E), t.on("node:data", E), t.on("selection", U), t.on("history", E), () => {
      clearTimeout(J), t.off("change", E), t.off("node:create", E), t.off("node:delete", E), t.off("node:data", E), t.off("selection", U), t.off("history", E), ct.current && clearTimeout(ct.current);
    };
  }, [t, j, U, O]), bt(() => {
    if (!P.current) return;
    const J = P.current.querySelectorAll("[data-frame-card]");
    C.current = Array.from(J).map((E) => E.offsetHeight + Ii);
  }, [r]);
  const nt = it(
    (J) => {
      t.select(J), t.zoomToNode(J, 0.8);
    },
    [t]
  ), Q = it(
    (J, E) => {
      J.preventDefault(), J.stopPropagation(), d.current = J.clientY, h.current = E, p.current = E, f.current = !1;
    },
    []
  );
  return bt(() => {
    const J = (G) => {
      if (h.current === null) return;
      const X = G.clientY - d.current;
      if (!f.current) {
        if (Math.abs(X) < 4) return;
        f.current = !0, x(h.current), M(h.current);
      }
      R(X);
      const N = C.current, V = h.current;
      let H = V;
      if (X > 0) {
        let _ = 0;
        for (let et = V + 1; et < g.current.length && (_ += N[et] || 0, X > _ - (N[et] || 0) / 2); et++)
          H = et;
      } else if (X < 0) {
        let _ = 0;
        for (let et = V - 1; et >= 0 && (_ -= N[et] || 0, X < _ + (N[et] || 0) / 2); et--)
          H = et;
      }
      p.current = H, M(H);
    }, E = () => {
      const G = h.current, X = p.current;
      if (G !== null && X !== null && G !== X) {
        y.current = !0;
        const N = [...g.current], [V] = N.splice(G, 1);
        N.splice(X, 0, V);
        let H = !0;
        for (let _ = 0; _ < N.length; _++) {
          const et = N[_], ot = t.getNode(et.id);
          ot && (H ? (t.updateNodeWithHistory(et.id, {
            data: { ...ot.data, slideOrder: _ + 1 }
          }), H = !1) : t.updateNode(et.id, {
            data: { ...ot.data, slideOrder: _ + 1 }
          }));
        }
        y.current = !1, m.current = !0, s(Cr(t)), c((_) => _ + 1);
      }
      h.current = null, p.current = null, f.current = !1, x(null), M(null), R(0), m.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", J), document.addEventListener("pointerup", E), document.addEventListener("pointercancel", E), () => {
      document.removeEventListener("pointermove", J), document.removeEventListener("pointerup", E), document.removeEventListener("pointercancel", E);
    };
  }, [t]), /* @__PURE__ */ k(
    "div",
    {
      "data-sb-frames-panel": !0,
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: zi,
        background: n.panelBg,
        borderLeft: `1px solid ${n.border}`,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : `translateX(${zi}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (J) => J.stopPropagation(),
      children: [
        /* @__PURE__ */ k(
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
              /* @__PURE__ */ k("span", { style: { fontSize: 12, fontWeight: 600, color: n.text, letterSpacing: "0.02em" }, children: [
                "Slides (",
                r.length,
                ")"
              ] }),
              /* @__PURE__ */ u(
                "button",
                {
                  title: "Close slides panel",
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
                  children: /* @__PURE__ */ u(Pp, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ k(
          "div",
          {
            ref: P,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: Ii
            },
            children: [
              r.length === 0 && /* @__PURE__ */ u("div", { style: { padding: "20px 8px", textAlign: "center", color: n.textMuted, fontSize: 11 }, children: "No frames yet. Use the Frame tool (F) to create slides." }),
              r.map((J, E) => {
                const G = i.has(J.id), X = b === E;
                let N = 0;
                if (X)
                  N = I;
                else if (b !== null && S !== null) {
                  const _ = C.current;
                  b < S ? E > b && E <= S && (N = -(_[b] || 0)) : b > S && E >= S && E < b && (N = _[b] || 0);
                }
                const V = (_) => {
                  t.updateNodeWithHistory(J.id, {
                    data: { transition: _ === "pan" ? void 0 : _, transitionDuration: void 0 }
                  });
                }, H = (_) => {
                  t.updateNodeWithHistory(J.id, {
                    data: { transitionDuration: _ }
                  });
                };
                return /* @__PURE__ */ k(hl.Fragment, { children: [
                  b === null && /* @__PURE__ */ u(
                    Lp,
                    {
                      value: J.transition ?? "pan",
                      durationMs: J.transitionDuration,
                      onChange: V,
                      onDurationChange: H,
                      theme: n
                    }
                  ),
                  /* @__PURE__ */ u(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: (_) => Q(_, E),
                      onDoubleClick: () => nt(J.id),
                      style: {
                        borderRadius: 6,
                        border: G ? `2px solid ${J.borderColor || n.text}` : `1px solid ${n.border}`,
                        background: G ? n.controlBgActive : "transparent",
                        cursor: X ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transition: X || m.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${N}px)`,
                        zIndex: X ? 10 : 1,
                        opacity: X ? 0.92 : 1,
                        boxShadow: X ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ u(Ep, { engine: t, frameId: J.id, tick: a })
                    }
                  )
                ] }, J.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const go = 50, zr = 30, Wp = `
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
`, Bp = `
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
function Ai(t, e, o) {
  const n = t.createShader(e);
  return n ? (t.shaderSource(n, o), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) ? n : (t.deleteShader(n), null)) : null;
}
function Fp(t, e, o) {
  const n = Ai(t, t.VERTEX_SHADER, e), r = Ai(t, t.FRAGMENT_SHADER, o);
  if (!n || !r) return null;
  const s = t.createProgram();
  return t.attachShader(s, n), t.attachShader(s, r), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function Np() {
  const t = [], e = [];
  for (let o = 0; o <= zr; o++)
    for (let n = 0; n <= go; n++)
      t.push(n / go, o / zr * 2 - 1);
  for (let o = 0; o < zr; o++)
    for (let n = 0; n < go; n++) {
      const r = o * (go + 1) + n;
      e.push(r, r + go + 1, r + 1, r + 1, r + go + 1, r + go + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function Hp({ phase: t, progress: e }) {
  const o = lt(null), n = lt(null);
  return bt(() => {
    const r = o.current;
    if (!r) return;
    const s = window.devicePixelRatio || 1;
    r.width = r.clientWidth * s, r.height = r.clientHeight * s;
    const i = r.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const l = Fp(i, Wp, Bp);
    if (!l) return;
    i.useProgram(l);
    const { vertices: a, indices: c } = Np(), h = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, h), i.bufferData(i.ARRAY_BUFFER, a, i.STATIC_DRAW);
    const p = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, p), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const d = i.getAttribLocation(l, "aUV");
    i.enableVertexAttribArray(d), i.vertexAttribPointer(d, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const f = (g) => i.getUniformLocation(l, g);
    return n.current = {
      gl: i,
      locs: { uLayPos: f("uLayPos"), uRadius: f("uRadius"), uSide: f("uSide"), uColor: f("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(l), i.deleteBuffer(h), i.deleteBuffer(p), n.current = null;
    };
  }, []), bt(() => {
    const r = n.current;
    if (!r) return;
    const { gl: s, locs: i, count: l } = r, a = t === "out" ? 1 - Math.pow(1 - e, 3) : Math.pow(e, 3), c = t === "out" ? 1 - a : a, h = 0.07 + 0.16 * c;
    s.viewport(0, 0, s.canvas.width, s.canvas.height), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.uniform1f(i.uLayPos, c), s.uniform1f(i.uRadius, h), s.uniform1f(i.uSide, 1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, l, s.UNSIGNED_SHORT, 0), s.uniform1f(i.uSide, -1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, l, s.UNSIGNED_SHORT, 0);
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
const Op = {
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
}, Ir = {
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
}, Kr = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Ei({ dir: t }) {
  return /* @__PURE__ */ k("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ u("polyline", { points: "15,18 9,12 15,6", ...Kr }),
    t === "right" && /* @__PURE__ */ u("polyline", { points: "9,6 15,12 9,18", ...Kr })
  ] });
}
function Xp() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...Kr }) });
}
function Ri(t) {
  return 1 - Math.pow(1 - t, 3);
}
function Li(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function Di(t, e) {
  let n;
  t <= 0.2 ? n = 1 + (0.55 - 1) * Ri(t / 0.2) : t >= 0.8 ? n = 0.55 + (1 - 0.55) * Ri((t - 0.8) / 0.2) : n = 0.55;
  let r;
  return t <= 0.1 ? r = 0 : t <= 0.5 ? r = -e * 90 * Li((t - 0.1) / 0.4) : t <= 0.9 ? r = e * 90 * (1 - Li((t - 0.5) / 0.4)) : r = 0, { zoom: n, angle: r };
}
function Yp(t, e, o, n) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${n}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function Wi(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function Gp({ engine: t }) {
  const [e, o] = tt(t.presentationMode), [n, r] = tt(t.presentationIndex), [s, i] = tt(t.presentationSlides.length), [l, a] = tt(""), [c, h] = tt(t.transitionOverlay), p = lt(null), d = lt(null);
  if (bt(() => {
    const g = document.querySelector("[data-sb-canvas]");
    p.current = g, d.current = (g == null ? void 0 : g.parentElement) ?? null;
    const y = () => {
      var S;
      if (o(t.presentationMode), r(t.presentationIndex), i(t.presentationSlides.length), h(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const M = t.presentationSlides[t.presentationIndex], I = t.getNode(M);
        a(((S = I == null ? void 0 : I.data) == null ? void 0 : S.label) || "");
      } else
        a("");
      const m = t.transitionOverlay, b = p.current, x = d.current;
      if (b && x && m && m.type === "cube" && m.t != null) {
        const M = m.direction ?? 1, { zoom: I, angle: R } = Di(m.t, M);
        Yp(b, x, I, R);
      } else b && x && Wi(b, x);
    };
    return t.on("presentation", y), () => {
      t.off("presentation", y);
      const m = p.current, b = d.current;
      m && b && Wi(m, b);
    };
  }, [t]), !e || s === 0) return null;
  const f = c && c.type === "cube" && c.t != null ? (() => {
    const g = c.direction ?? 1, { angle: y } = Di(c.t, g);
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
        c && c.type === "fold" && /* @__PURE__ */ u(Hp, { phase: c.phase, progress: c.progress }),
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
        /* @__PURE__ */ k("div", { style: Op, onPointerDown: (g) => g.stopPropagation(), children: [
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Ir, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ u(Xp, {})
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Ir, opacity: n <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: n <= 0,
              children: /* @__PURE__ */ u(Ei, { dir: "left" })
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
                n + 1,
                " / ",
                s,
                l && /* @__PURE__ */ k("span", { style: { opacity: 0.6, marginLeft: 8 }, children: [
                  "— ",
                  l
                ] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...Ir, opacity: n >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: n >= s - 1,
              children: /* @__PURE__ */ u(Ei, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
function $e(t) {
  return `${t.toFixed(2)} ms`;
}
function pe(t, e) {
  return { label: t, value: e };
}
function jp() {
  const t = jt(), [e, o] = tt(() => he.getSnapshot());
  bt(() => {
    let r = 0;
    const s = (l) => {
      he.tick(l), r = requestAnimationFrame(s);
    };
    r = requestAnimationFrame(s);
    const i = he.subscribe(() => o(he.getSnapshot()));
    return () => {
      cancelAnimationFrame(r), i();
    };
  }, []);
  const n = Kt(
    () => [
      pe("Virtualization", e.virtualizationActive ? "on" : "off"),
      pe("FPS", e.fps.toFixed(1)),
      pe("Frame (p50/p95)", `${$e(e.frameMsP50)} / ${$e(e.frameMsP95)}`),
      pe("Culling (p50/p95)", `${$e(e.cullingMsP50)} / ${$e(e.cullingMsP95)}`),
      pe("Hit-test (p50/p95)", `${$e(e.hitTestMsP50)} / ${$e(e.hitTestMsP95)}`),
      pe("Edge-hit (p50/p95)", `${$e(e.edgeHitMsP50)} / ${$e(e.edgeHitMsP95)}`),
      pe("Hit-test calls/s", e.hitTestCallsPerSec.toFixed(1)),
      pe("Edge-hit calls/s", e.edgeHitCallsPerSec.toFixed(1)),
      pe("Visible nodes", `${e.visibleNodes} / ${e.totalNodes}`),
      pe("Visible edges", `${e.visibleEdges} / ${e.totalEdges}`),
      pe("Seed visible nodes", String(e.seedVisibleNodes)),
      pe("Nodes +adjacency", String(e.nodesAddedByAdjacency)),
      pe("Nodes +edge-endpoints", String(e.nodesAddedByEdgeEndpoints)),
      pe("Edges +adjacency", String(e.edgesAddedByAdjacency)),
      pe("Edges +crossing", String(e.edgesAddedByCrossing))
    ],
    [e]
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
            children: "Performance"
          }
        ),
        /* @__PURE__ */ u("div", { style: { padding: "8px 10px", display: "grid", rowGap: 4 }, children: n.map((r) => /* @__PURE__ */ k("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
          /* @__PURE__ */ u("span", { style: { color: t.textMuted }, children: r.label }),
          /* @__PURE__ */ u("span", { children: r.value })
        ] }, r.label)) })
      ]
    }
  );
}
const Vp = fl(() => import("./DebugPanel-BiEvJfL9.js"));
function hf({
  nodeTypes: t = Ud,
  engine: e,
  keyboardShortcuts: o = !0,
  style: n,
  initialData: r,
  toolbar: s = !0,
  debugPanel: i = !1,
  debugBoards: l,
  theme: a,
  onPresentationChange: c,
  gifApiBaseUrl: h
}) {
  const p = Kt(
    () => e ?? new yc(),
    [e]
  ), d = Kt(() => new gc(t), [t]);
  bt(() => Zl(), []), bt(() => {
    p.setRegistry(d);
  }, [p, d]), bt(() => {
    for (const C of t)
      C.isContainer && p.registerContainerType(C.type);
  }, [p, t]);
  const f = lt(!1);
  bt(() => {
    r && !f.current && (f.current = !0, p.fromSBD(r));
  }, [p, r]);
  const g = lt(null);
  bt(() => {
    if (o)
      return Fh(p, g.current);
  }, [p, o]);
  const y = Kt(() => t.some((P) => {
    var j;
    return (j = P.ports) == null ? void 0 : j.length;
  }) ? new Zd(p, d) : null, [p, d, t]);
  bt(() => {
    if (y)
      return y.connect();
  }, [y]);
  const m = Kt(
    () => a ? { ...Nr, ...a } : Nr,
    [a]
  ), [b, x] = tt(!1), [S, M] = tt(!1), [I, R] = tt(!1);
  return bt(() => {
    he.setEnabled(I);
  }, [I]), bt(() => {
    const C = () => {
      const P = p.presentationMode;
      x(P), c == null || c(P);
    };
    return p.on("presentation", C), () => p.off("presentation", C);
  }, [p, c]), /* @__PURE__ */ u(fa.Provider, { value: m, children: /* @__PURE__ */ k(
    "div",
    {
      ref: g,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        ...n
      },
      children: [
        s && !b && /* @__PURE__ */ u(Sp, { engine: p, registry: d, gifApiBaseUrl: h }),
        i && /* @__PURE__ */ u(pl, { fallback: null, children: /* @__PURE__ */ u(Vp, { engine: p, extraBoards: l }) }),
        /* @__PURE__ */ k(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !b ? yn : 0,
              top: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ u(du, { engine: p, schema: Zr, registry: d, dataFlow: y }),
              !b && /* @__PURE__ */ u(
                Ip,
                {
                  engine: p,
                  framesPanelOpen: S,
                  onToggleFramesPanel: () => M((C) => !C),
                  showPerfOverlay: I,
                  onTogglePerfOverlay: () => R((C) => !C)
                }
              ),
              !b && I && /* @__PURE__ */ u(jp, {}),
              !b && /* @__PURE__ */ u(
                Dp,
                {
                  engine: p,
                  open: S,
                  onClose: () => M(!1)
                }
              ),
              /* @__PURE__ */ u(Gp, { engine: p })
            ]
          }
        )
      ]
    }
  ) });
}
const Kp = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], Fo = {
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
function rn({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ k("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ..._t }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ..._t })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ..._t }),
    t === "text" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M7 4h10", ..._t }),
      /* @__PURE__ */ u("path", { d: "M12 4v16", ..._t })
    ] }),
    t === "note" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ..._t }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ..._t }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ..._t, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ..._t, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ..._t, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ..._t }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ..._t })
    ] }),
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ..._t }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ..._t }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ..._t }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ..._t }),
    t === "arrow" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ..._t }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ..._t, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ..._t, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ..._t, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ..._t, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ..._t, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ..._t }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ..._t }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ..._t })
    ] }),
    t === "fit" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ..._t }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ..._t })
    ] })
  ] });
}
function uf({ engine: t }) {
  const [e, o] = tt(t.mode), [n, r] = tt(!1), [s, i] = tt(!1), [l, a] = tt(t.boardBackground);
  return bt(() => {
    const c = () => o(t.mode), h = () => {
      r(t.canUndo()), i(t.canRedo());
    }, p = () => a(t.boardBackground);
    return t.on("mode", c), t.on("history", h), t.on("background", p), () => {
      t.off("mode", c), t.off("history", h), t.off("background", p);
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
        Kp.map((c) => /* @__PURE__ */ u(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...Fo,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(rn, { name: c.key })
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
              ...Fo,
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
              ...Fo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(rn, { name: "print" })
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
              ...Fo,
              width: 36,
              height: 36,
              background: "transparent",
              color: n ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(rn, { name: "undo" })
          }
        ),
        /* @__PURE__ */ u(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...Fo,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(rn, { name: "redo" })
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
              ...Fo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(rn, { name: "fit" })
          }
        )
      ]
    }
  );
}
const _e = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], qp = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], Up = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], No = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], Zp = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Ho = [1, 2.5, 5, 10, 20], Qp = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], Jp = [14, 20, 28, 36], $p = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Tr = 300, Xt = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, Yt = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0
}, Vt = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  flexShrink: 0
};
function pf({
  engine: t,
  registry: e
}) {
  const [o, n] = tt(t.mode), [r, s] = tt(t.selection), [, i] = tt(0), [l, a] = tt(null), c = lt(null), h = lt(null), [p, d] = tt(!1), f = it(() => {
    var at;
    return { x: (((at = c.current) == null ? void 0 : at.ownerDocument.defaultView) ?? window).innerWidth - Tr - 12, y: 12 };
  }, []), g = l ?? f();
  bt(() => {
    const v = () => n(t.mode), at = () => {
      s(new Set(t.selection)), i((ie) => ie + 1);
    }, Qt = () => i((ie) => ie + 1);
    return t.on("mode", v), t.on("selection", at), t.on("change", Qt), () => {
      t.off("mode", v), t.off("selection", at), t.off("change", Qt);
    };
  }, [t]);
  const y = it((v) => {
    v.stopPropagation(), d(!0);
    const at = l ? l.x : f().x, Qt = l ? l.y : f().y;
    h.current = { startX: v.clientX, startY: v.clientY, startLeft: at, startTop: Qt }, v.currentTarget.setPointerCapture(v.pointerId);
  }, [l, f]);
  bt(() => {
    var ie;
    const v = (ae) => {
      var zo;
      if (!h.current) return;
      const me = ae.clientX - h.current.startX, Jo = ae.clientY - h.current.startY, Ke = ((zo = c.current) == null ? void 0 : zo.ownerDocument.defaultView) ?? window, co = Math.max(48, Math.min(Ke.innerWidth - Tr - 8, h.current.startLeft + me)), $n = Math.max(8, Math.min(Ke.innerHeight - 100, h.current.startTop + Jo));
      a({ x: co, y: $n });
    }, at = () => {
      h.current = null, d(!1);
    }, Qt = ((ie = c.current) == null ? void 0 : ie.ownerDocument) ?? document;
    return Qt.addEventListener("pointermove", v), Qt.addEventListener("pointerup", at), Qt.addEventListener("pointercancel", at), () => {
      Qt.removeEventListener("pointermove", v), Qt.removeEventListener("pointerup", at), Qt.removeEventListener("pointercancel", at);
    };
  }, []);
  const m = (() => {
    if (r.size === 1) {
      const v = Array.from(r)[0], at = t.getNode(v);
      if ((at == null ? void 0 : at.type) === "shape") return { kind: "shape", node: at };
      if ((at == null ? void 0 : at.type) === "draw") return { kind: "draw", node: at };
      if ((at == null ? void 0 : at.type) === "text") return { kind: "text", node: at };
      if ((at == null ? void 0 : at.type) === "edge") return { kind: "edge", node: at };
      if ((at == null ? void 0 : at.type) === "image") return { kind: "image", node: at };
      if ((at == null ? void 0 : at.type) === "content") return { kind: "content", node: at };
      if ((at == null ? void 0 : at.type) === "frame") return { kind: "frame", node: at };
      if ((at == null ? void 0 : at.type) === "sticky") return { kind: "sticky", node: at };
      if (at && e) {
        const Qt = e.get(at.type);
        if (Qt != null && Qt.propertiesPanel)
          return { kind: "custom", node: at, PanelComponent: Qt.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" ? { kind: "tool" } : null;
  })(), b = it(
    (v) => {
      !m || m.kind !== "shape" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), x = it(
    (v) => {
      !m || m.kind !== "draw" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), S = it(
    (v) => {
      !m || m.kind !== "text" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), M = it(
    (v) => {
      !m || m.kind !== "edge" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), I = it(
    (v) => {
      !m || m.kind !== "image" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), R = it(
    (v) => {
      !m || m.kind !== "content" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), C = it(
    (v) => {
      !m || m.kind !== "frame" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), P = it(
    (v) => {
      !m || m.kind !== "sticky" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), j = it(
    (v) => {
      !m || m.kind !== "custom" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...v }
      });
    },
    [t, m]
  ), [U, ct] = tt("idle");
  if (!m) return null;
  const O = m.kind === "custom", nt = m.kind === "shape", Q = m.kind === "draw", J = m.kind === "text", E = m.kind === "edge", G = m.kind === "image", X = m.kind === "content", N = m.kind === "frame", V = m.kind === "sticky", H = m.kind === "tool", _ = H && o === "shape", et = H && o === "text", ot = J ? m.node.data.fontFamily : t.activeTool.fontFamily ?? oo, ut = J ? m.node.data.fontSize : t.activeTool.fontSize ?? 20, pt = J ? m.node.data.align : t.activeTool.textAlign ?? "left", Tt = J ? m.node.data.color : t.activeTool.color, rt = nt ? m.node.data.stroke : Q ? m.node.data.color : t.activeTool.color, St = nt || Q ? m.node.data.fill ?? null : t.activeTool.fillColor ?? null, Mt = nt || Q ? m.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", ht = nt || Q ? m.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", Wt = nt || Q ? m.node.data.strokeWidth : t.activeTool.width, Pt = nt ? m.node.data.roughness : t.activeTool.roughness ?? 1, Et = nt || Q || J || G || X || N || V ? m.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Jt = (() => {
    const v = /* @__PURE__ */ new Set(), at = [];
    for (const Qt of t.getAllNodes())
      if (Qt.type === "text") {
        const ie = Qt.data.fontFamily;
        ie && !v.has(ie) && (v.add(ie), at.push(ie));
      }
    return at;
  })(), Zt = !J && !et && !E && !G && !X && !N && !V && !O, re = Zt, $t = Zt, ne = nt || _, Ie = J || et, we = (v) => {
    nt ? b({ stroke: v }) : Q ? x({ color: v }) : (t.activeTool.color = v, i((at) => at + 1));
  }, se = (v) => {
    nt ? b({ fill: v ?? void 0 }) : Q ? x({ fill: v ?? void 0 }) : (t.activeTool.fillColor = v ?? void 0, i((at) => at + 1));
  }, Fe = (v) => {
    nt ? b({ fillStyle: v }) : Q ? x({ fillStyle: v }) : (t.activeTool.fillStyle = v, i((at) => at + 1));
  }, Nt = (v) => {
    nt ? b({ strokeStyle: v }) : Q ? x({ strokeStyle: v }) : (t.activeTool.strokeStyle = v, i((at) => at + 1));
  }, Ne = (v) => {
    nt ? b({ strokeWidth: v }) : Q ? x({ strokeWidth: v }) : (t.activeTool.width = v, i((at) => at + 1));
  }, Ve = (v) => {
    nt ? b({ roughness: v }) : (t.activeTool.roughness = v, i((at) => at + 1));
  }, Co = (v) => {
    nt ? b({ opacity: v }) : Q ? x({ opacity: v }) : J ? S({ opacity: v }) : G ? I({ opacity: v }) : X ? R({ opacity: v }) : N ? C({ opacity: v }) : V ? P({ opacity: v }) : (t.activeTool.opacity = v, i((at) => at + 1));
  }, He = (v) => {
    J ? S({ fontFamily: v }) : (t.activeTool.fontFamily = v, i((at) => at + 1));
  }, Te = (v) => {
    J ? S({ fontSize: v }) : (t.activeTool.fontSize = v, i((at) => at + 1));
  }, Oe = (v) => {
    J ? S({ align: v }) : (t.activeTool.textAlign = v, i((at) => at + 1));
  }, Xe = (v) => {
    J ? S({ color: v }) : (t.activeTool.color = v, i((at) => at + 1));
  }, Pe = {
    position: "fixed",
    left: g.x,
    top: g.y,
    width: Tr,
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
      style: Pe,
      onPointerDown: (v) => v.stopPropagation(),
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
        Ie && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Font" }),
            /* @__PURE__ */ u(
              Jn,
              {
                value: ot,
                onChange: He,
                fontsInScene: Jt
              }
            )
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Size" }),
            Jp.map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Te(v),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: ut === v ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: v
              },
              v
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Align" }),
            $p.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.key,
                onClick: () => Oe(v.key),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: pt === v.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: v.label
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Color" }),
            _e.map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Xe(v),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v,
                  border: Tt === v ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          J && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Border" }),
            [null, ..._e].map((v, at) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => S({ borderColor: v ?? void 0 }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: (m.node.data.borderColor ?? null) === v ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ u(
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
          J && m.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Style" }),
            No.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => S({ borderStyle: v.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: (m.node.data.borderStyle ?? "solid") === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          J && m.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Width" }),
            Ho.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: `${v}px`,
                onClick: () => S({ borderWidth: v }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: (m.node.data.borderWidth ?? 1) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
        Zt && /* @__PURE__ */ k(mt, { children: [
          _ && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Shape" }),
            Qp.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => {
                  t.activeTool.shapeType = v.key, i((at) => at + 1);
                },
                style: {
                  ...Vt,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === v.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(_p, { name: v.key })
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Stroke" }),
            _e.map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => we(v),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v,
                  border: rt === v ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          re && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Fill" }),
            qp.map((v, at) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => se(v),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: St === v ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ u(
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
          re && St && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Fill pattern" }),
            Up.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => Fe(v.key),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: Mt === v.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(tf, { style: v.key })
              },
              v.key
            ))
          ] }),
          $t && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Stroke style" }),
            No.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => Nt(v.key),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: ht === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Stroke width" }),
            Ho.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: `${v}px`,
                onClick: () => Ne(v),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: Wt === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
          ne && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Roughness" }),
            Zp.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => Ve(v.value),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: Pt === v.value ? "#3b82f6" : "#2a2a3e",
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
        E && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Color" }),
            _e.map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => M({ color: v }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v,
                  border: m.node.data.color === v ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Style" }),
            No.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => M({ style: v.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: m.node.data.style === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Width" }),
            Ho.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: `${v}px`,
                onClick: () => M({ strokeWidth: v }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: m.node.data.strokeWidth === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => M({ arrowHead: v }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: (m.node.data.arrowHead ?? "none") === v ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: v === "none" ? "None" : v === "arrow" ? "▷" : v === "filled" ? "▶" : "●"
              },
              v
            ))
          ] }),
          (m.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Head size" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: m.node.data.arrowHeadSize ?? Math.max(8, m.node.data.strokeWidth * 3),
                onChange: (v) => M({ arrowHeadSize: Number(v.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: m.node.data.arrowHeadSize ?? Math.max(8, m.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => M({ arrowTail: v }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: (m.node.data.arrowTail ?? "none") === v ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: v === "none" ? "None" : v === "arrow" ? "◁" : v === "filled" ? "◀" : "●"
              },
              v
            ))
          ] }),
          (m.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Tail size" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: m.node.data.arrowTailSize ?? Math.max(8, m.node.data.strokeWidth * 3),
                onChange: (v) => M({ arrowTailSize: Number(v.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: m.node.data.arrowTailSize ?? Math.max(8, m.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Label" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: m.node.data.label ?? "",
                onChange: (v) => M({ label: v.target.value || void 0 }),
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
            /* @__PURE__ */ u("span", { style: Yt, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => M({ edgeType: v.key }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: (m.node.data.edgeType ?? "bezier") === v.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: v.label
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Animate" }),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: () => M({ animated: !m.node.data.animated }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 12px",
                  background: m.node.data.animated ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: m.node.data.animated ? "On" : "Off"
              }
            )
          ] }),
          m.node.data.animated && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Direction" }),
            ["forward", "reverse", "both"].map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => M({ animatedDirection: v }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: (m.node.data.animatedDirection ?? "forward") === v ? "#3b82f6" : "#2a2a3e",
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
        G && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Border" }),
            [null, ..._e].map((v, at) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => I({ borderColor: v ?? void 0 }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: (m.node.data.borderColor ?? null) === v ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ u(
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
          m.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Style" }),
            No.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => I({ borderStyle: v.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: (m.node.data.borderStyle ?? "solid") === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          m.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Width" }),
            Ho.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: `${v}px`,
                onClick: () => I({ borderWidth: v }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: (m.node.data.borderWidth ?? 1) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: { ...Xt, marginTop: 4 }, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Background" }),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: async () => {
                  if (!(U === "loading" || m.kind !== "image")) {
                    ct("loading");
                    try {
                      const { removeBackground: v } = await import("@imgly/background-removal"), Qt = await (await fetch(m.node.data.src)).blob(), ie = await v(Qt), ae = new FileReader(), me = await new Promise((Jo, Ke) => {
                        ae.onload = () => Jo(ae.result), ae.onerror = Ke, ae.readAsDataURL(ie);
                      });
                      I({ src: me }), ct("idle");
                    } catch (v) {
                      console.error("Background removal failed:", v), ct("error"), setTimeout(() => ct("idle"), 3e3);
                    }
                  }
                },
                disabled: U === "loading",
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 10px",
                  background: U === "error" ? "#e74c3c" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6,
                  gap: 4,
                  opacity: U === "loading" ? 0.6 : 1
                },
                children: U === "loading" ? "Removing..." : U === "error" ? "Failed" : "Remove BG"
              }
            )
          ] })
        ] }),
        X && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Border" }),
            [null, ..._e].map((v, at) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => R({ borderColor: v ?? void 0 }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: (m.node.data.borderColor ?? null) === v ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ u(
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
          m.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Style" }),
            No.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => R({ borderStyle: v.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: (m.node.data.borderStyle ?? "solid") === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          m.node.data.borderColor && /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Width" }),
            Ho.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: `${v}px`,
                onClick: () => R({ borderWidth: v }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: (m.node.data.borderWidth ?? 1) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
        N && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Label" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: m.node.data.label ?? "",
                onChange: (v) => C({ label: v.target.value || void 0 }),
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
            /* @__PURE__ */ u("span", { style: Yt, children: "Background" }),
            [null, ..._e].map((v, at) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => C({ backgroundColor: v ? `${v}15` : void 0 }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v ?? "transparent",
                  border: (() => {
                    const Qt = m.node.data.backgroundColor;
                    return (v === null ? !Qt : Qt === `${v}15`) ? "2px solid white" : `2px solid ${at === 0 ? "#555" : "transparent"}`;
                  })(),
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: at === 0 && /* @__PURE__ */ u(
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
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Border" }),
            _e.map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => C({ borderColor: v }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v,
                  border: m.node.data.borderColor === v ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Style" }),
            No.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: v.label,
                onClick: () => C({ borderStyle: v.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: (m.node.data.borderStyle ?? "dashed") === v.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: v.dash
                  }
                ) })
              },
              v.key
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Width" }),
            Ho.map((v) => /* @__PURE__ */ u(
              "button",
              {
                title: `${v}px`,
                onClick: () => C({ borderWidth: v }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: (m.node.data.borderWidth ?? 1) === v ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
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
        V && /* @__PURE__ */ k(mt, { children: [
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => P({ color: v }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: v,
                  border: m.node.data.color === v ? "2px solid #1e1e2e" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              v
            ))
          ] }),
          /* @__PURE__ */ k("div", { style: Xt, children: [
            /* @__PURE__ */ u("span", { style: Yt, children: "Size" }),
            [12, 14, 16, 20, 24].map((v) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => P({ fontSize: v }),
                style: {
                  ...Vt,
                  width: 32,
                  height: 24,
                  background: (m.node.data.fontSize ?? 16) === v ? "#3b82f6" : "#2a2a3e",
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
        O && (() => {
          const { node: v, PanelComponent: at } = m;
          return /* @__PURE__ */ u(at, { node: v, data: v.data, engine: t, updateData: j });
        })(),
        !E && !O && /* @__PURE__ */ k("div", { style: Xt, children: [
          /* @__PURE__ */ u("span", { style: Yt, children: "Opacity" }),
          /* @__PURE__ */ u(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(Et * 100),
              onChange: (v) => Co(parseInt(v.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(Et * 100) })
        ] })
      ]
    }
  );
}
function _p({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ k(mt, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function tf({ style: t }) {
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
  oo as D,
  gc as N,
  Vo as P,
  df as S,
  uf as T,
  Nr as a,
  Zd as b,
  pf as c,
  Sp as d,
  hf as e,
  du as f,
  yc as g,
  Ud as h,
  Mc as i,
  vd as j,
  zd as k,
  Wd as l,
  pn as m,
  kt as n,
  os as o,
  Ad as p,
  Jr as q,
  Jl as r,
  fo as s,
  Vl as t,
  Fh as u,
  Md as v,
  Hd as w,
  Ld as x,
  jt as y
};
